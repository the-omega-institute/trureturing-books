/* Film 009 · From the mutual lock to the rapidity staircase · 从互指锁死到快度阶梯
   (book quantum-geometry, part IX, chapters 33–36). Scenes for theme/film/engine.js.

   The mathematics, as in the chapters and the lab pages mutual-observer-attractors (cards "alone", "round")
   and forgetting-rebirth-attractor (cards "erase_reset", "staircase", "cayley"):
     ch. 33, ex-ch33-mutual-cosine-monotonic-lock (an application of known results: the Dottie endpoint theorem of
       chapter 24 with real analysis, items 14, 17, 20, 21, 24; the decimals are independent numerics, computed here):
       alone   x_{k+1} = cos x_k, fixed point θ* = cos θ* ≈ 0.739085, slope f'(θ*) = −sin θ* ≈ −0.674,
               so the error changes sign at every step;
       mutual  ψ_A = cos ψ_B, ψ_B = cos ψ_A; one round of two readings is g = cos ∘ cos, g'(x) = sin(cos x) sin x > 0
               on (0, π/2), g'(θ*) = sin²θ* ≈ 0.454; with the same start, y_k = x_{2k} approaches θ* from one side.
     ch. 36, ex-ch36-inverse-gudermannian-discrete-staircase (literature result; the reading is the book's MODEL):
       the outside angle ruler θ ↦ θ + Δθ with Δθ = θ₁ − θ* hits 90° in finitely many steps;
       the rapidity dη = dθ / cos θ gives η(θ) = ln tan(θ/2 + π/4), sin θ = tanh η, cos θ = sech η, η(θ*) ≈ 0.817;
       the staircase η_k = η(θ*) + k (Δη = 1) has θ_k = 2 arctan(e^{η_k}) − π/2 < 90° and gap 1 − tanh η_k > 0.
     ch. 36, thm-ch36-taylor-tail-and-cayley-boundary (Lean, film.json "lean"):
       CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line: ‖(s − 1)/s‖ = 1 ↔ Re s = 1/2.
       On screen (computed): the line Re s = c goes to the circle with centre 1 − 1/(2c) and radius 1/(2c), tangent
       to the unit circle at w = 1; its far point is 1 − 1/c, at distance 2 − 1/c from −1.

   On load, FILM.init re-derives every relation above and checks every number printed or spoken against its
   formula, and checks the Lean citation; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const RS_DEG = Math.PI / 180, RS_HALF = Math.PI / 2;
const RS_X0 = 0.1;                                        // the chapter's start value for both observers
const RS_LEAN = { cayley_ratio_norm_one_iff_critical_line: 'D5/S3/Midline/CayleyCriticalLine.cayley_ratio_norm_one_iff_critical_line' };

const RM = (() => {
  /* the Dottie number by Newton's method on cos θ − θ */
  let th = 0.7;
  for (let i = 0; i < 60; i++) th -= (Math.cos(th) - th) / (-Math.sin(th) - 1);
  const orbit = n => { const xs = [RS_X0]; for (let i = 0; i < n; i++) xs.push(Math.cos(xs[i])); return xs; };
  const eta = t => Math.log(Math.tan(t / 2 + Math.PI / 4));            // ∫₀^θ sec α dα
  const gd = e => 2 * Math.atan(Math.exp(e)) - RS_HALF;                   // its inverse
  const gap = e => 2 / (Math.exp(2 * e) + 1);                             // 1 − tanh η without cancellation
  const sech = e => 2 / (Math.exp(e) + Math.exp(-e));
  const eta0 = eta(th);
  const step = k => { const e = eta0 + k; return { k, e, th: gd(e), cos: sech(e), sin: Math.tanh(e), gap: gap(e) }; };
  /* the outside angle ruler: Δθ is the staircase's own first step; reaching 90° is recorded as exactly 90° */
  const dth = gd(eta0 + 1) - th;
  function walk(from, n) { const t = [from]; for (let i = 0; i < n; i++) { const v = t[i] + dth; t.push(v >= RS_HALF ? RS_HALF : v); if (v >= RS_HALF) break; } return t; }
  /* the Cayley ratio w = (s − 1)/s for s = (re, im) */
  function cay(re, im) { const n = re * re + im * im; return [1 - re / n, im / n]; }
  const circ = c => ({ cx: 1 - 1 / (2 * c), r: 1 / (2 * c), far: 1 - 1 / c, gap: 2 - 1 / c });
  return { th, orbit, eta, gd, gap, sech, eta0, step, dth, walk, cay, circ };
})();

/* number formatting: true minus sign, fixed decimals */
const rsN = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '') + Math.abs(v).toFixed(d); };
const RS_SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
/* a × 10ⁿ with one decimal */
const rsSci = x => { let n = Math.floor(Math.log10(x)), m = x / Math.pow(10, n); if (m.toFixed(1) === '10.0') { n += 1; m = x / Math.pow(10, n); } return `${m.toFixed(1)} × 10${String(n).split('').map(ch => RS_SUP[ch]).join('')}`; };
const RS_ORBIT = RM.orbit(16);
const RS_ROUND = RS_ORBIT.filter((_, i) => i % 2 === 0);  // y_k = x_{2k}
const RS_STEPS = Array.from({ length: 9 }, (_, k) => RM.step(k));
const RS_WALK1 = RM.walk(RM.th, 4), RS_WALK2 = RM.walk(0, 6);
const RS_CS = [1, 0.75, 0.625, 0.5625, 0.53125];   // c = ½ + 2^{−j−1}
const RS_CEND = 0.51;

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('rapidity film: ' + m); };
  const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

  /* 0. the cited theorem at the pinned commit */
  const lean = DATA.lean || [];
  if (lean.length !== Object.keys(RS_LEAN).length) fail(`film.json cites ${lean.length} declarations, expected ${Object.keys(RS_LEAN).length}`);
  for (const [short, gid] of Object.entries(RS_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    if (r.kind !== 'theorem') fail(`${gid} is not a theorem at the pinned commit`);
    if (r.short !== short) fail(`${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the cosine iterations (chapter 33) */
  const th = RM.th;
  if (!near(Math.cos(th), th) || th.toFixed(3) !== '0.739') fail('θ*');
  if (rsN(-Math.sin(th)) !== '−0.674') fail('the slope at θ*');
  for (let k = 0; k < 10; k++) {
    const e0 = RS_ORBIT[k] - th, e1 = RS_ORBIT[k + 1] - th;
    if (!(e0 * e1 < 0)) fail(`alone: the error does not change sign at step ${k}`);
  }
  /* the round map g = cos∘cos: positive slope on (0, π/2), g'(θ*) = sin²θ*, monotone from below */
  for (let x = 0.01; x < RS_HALF; x += 0.01) {
    const gp = Math.sin(Math.cos(x)) * Math.sin(x);
    const num = (Math.cos(Math.cos(x + 1e-6)) - Math.cos(Math.cos(x - 1e-6))) / 2e-6;
    if (!(gp > 0) || !near(gp, num, 1e-8)) fail(`g' at ${x}`);
  }
  if (!near(Math.sin(Math.cos(th)) * Math.sin(th), Math.sin(th) ** 2) || (Math.sin(th) ** 2).toFixed(3) !== '0.454') fail('g\'(θ*)');
  for (let k = 0; k < RS_ROUND.length - 1; k++) {
    if (!near(RS_ROUND[k + 1], Math.cos(Math.cos(RS_ROUND[k])))) fail(`y_${k + 1} ≠ g(y_${k})`);
    if (!(RS_ROUND[k] < RS_ROUND[k + 1] && RS_ROUND[k + 1] < th)) fail(`round ${k} is not monotone from below`);
  }
  if (RS_ROUND.slice(1, 4).map(v => v.toFixed(3)).join(' ') !== '0.544 0.656 0.702') fail('round values');

  /* 2. the rapidity (chapter 36) */
  for (let d = 0; d < 90; d += 0.5) {
    const t = d * RS_DEG, e = RM.eta(t);
    if (!near(Math.tanh(e), Math.sin(t), 1e-12) || !near(RM.sech(e), Math.cos(t), 1e-12) || !near(RM.gd(e), t, 1e-12)) fail(`tanh/sech/gd at ${d}°`);
    /* dη/dθ = sec θ, by a central difference */
    const h = 1e-6, de = (RM.eta(t + h) - RM.eta(t - h)) / (2 * h);
    if (d > 0 && !near(de, 1 / Math.cos(t), 1e-5 / Math.cos(t) ** 2)) fail(`dη/dθ ≠ sec θ at ${d}°`);
  }
  if (RM.eta0.toFixed(3) !== '0.817' || (RM.th / RS_DEG).toFixed(1) !== '42.3') fail('η(θ*)');
  const degs = RS_STEPS.map(s => s.th / RS_DEG);
  if (degs.slice(0, 4).map(v => v.toFixed(1)).join(' ') !== '42.3 71.5 83.2 87.5') fail(`staircase angles ${degs.slice(0, 4)}`);
  for (const s of RS_STEPS) {
    if (!(s.th < RS_HALF) || !(s.cos > 0) || !(s.gap > 0)) fail(`step ${s.k} reaches the wall`);
    if (!near(s.cos, Math.cos(s.th), 1e-12) || !near(s.gap, 1 - Math.sin(s.th), 1e-12) || !near(s.sin * s.sin + s.cos * s.cos, 1)) fail(`step ${s.k} identities`);
  }
  if (rsSci(RS_STEPS[8].gap) !== '4.4 × 10⁻⁸') fail(`gap at k = 8: ${RS_STEPS[8].gap}`);
  /* the outside angle ruler */
  if ((RM.dth / RS_DEG).toFixed(1) !== '29.2') fail('Δθ');
  if (RS_WALK1.length !== 3 || RS_WALK1[2] !== RS_HALF || !(RM.th + 2 * RM.dth > RS_HALF)) fail('the angle ruler does not hit 90° on the second step');
  if (RS_WALK2.length !== 5 || RS_WALK2[4] !== RS_HALF) fail('the restart does not hit 90° after 4 steps');

  /* 3. the Cayley ratio */
  for (const c of [0.5, RS_CEND, ...RS_CS]) {
    const q = RM.circ(c);
    for (let t = -40; t <= 40; t += 0.37) {
      const [u, v] = RM.cay(c, t), n2 = u * u + v * v;
      if (!near(Math.hypot(u - q.cx, v), q.r, 1e-12)) fail(`the image of Re s = ${c} is not the stated circle`);
      if (!near(n2 - 1, (1 - 2 * c) / (c * c + t * t), 1e-12)) fail('the deficit identity');
      if (c > 0.5 && !(n2 < 1)) fail(`c = ${c} reaches the unit circle`);
      if (c === 0.5 && !near(n2, 1)) fail('Re s = ½ is not on the unit circle');
    }
    if (!near(q.cx + q.r, 1) || !near(q.far + 1, q.gap)) fail(`circle ${c}: tangency or far gap`);
  }
  if (RM.circ(RS_CEND).gap.toFixed(3) !== '0.039') fail('far gap at c = 0.51');
});
Object.assign(FILM.speed, { alone: 0.02, round: 0.016, wall: 0.02, ruler: 0.018, stairs: 0.014, cayley: 0.016, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
/* a plot frame: data box [x0, x1] × [y0, y1] onto the screen rectangle (px, py, pw, ph) */
function rsPlot(px, py, pw, ph, x0, x1, y0, y1) {
  return { X: x => px + (x - x0) / (x1 - x0) * pw, Y: y => py + ph - (y - y0) / (y1 - y0) * ph, px, py, pw, ph, x0, x1, y0, y1 };
}
function rsFrame(P, a, xt, yt, xl, yl) {
  line(P.px, P.py + P.ph, P.px + P.pw, P.py + P.ph, C.dim, a * 0.8, 1.5);
  line(P.px, P.py, P.px, P.py + P.ph, C.dim, a * 0.8, 1.5);
  for (const [v, l] of xt) { line(P.X(v), P.py + P.ph, P.X(v), P.py + P.ph + 8, C.dim, a, 1.5); txt(l, P.X(v), P.py + P.ph + 32, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  for (const [v, l] of yt) { line(P.px - 8, P.Y(v), P.px, P.Y(v), C.dim, a, 1.5); txt(l, P.px - 14, P.Y(v) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  if (xl) txt(xl, P.px + P.pw, P.py + P.ph + 62, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a });
  if (yl) txt(yl, P.px, P.py - 18, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a });
}
function rsDash(x1, y1, x2, y2, col, a, w = 1.5, d = [6, 6]) { if (a <= 0) return; ctx.save(); ctx.setLineDash(d); line(x1, y1, x2, y2, col, a, w); ctx.restore(); }
function rsNumTag(x, y, a) { chip(x, y, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }
/* LEAN ✓ chip for the cited theorem */
function rsLean(x, y, short, a, size = 20) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
const RS_PX = 1010, RS_PY = 190, RS_PW = 790;           // the right-hand panel

/* ---- chapter 33: the cobweb of x ↦ cos x ---- */
const RS_WEB = () => rsPlot(200, 210, 600, 560, 0, 1.1, 0, 1.1);
function rsWeb(P, a, n) {
  /* n steps drawn, the fractional part animating the current one: (x_k, x_k) → (x_k, x_{k+1}) → (x_{k+1}, x_{k+1}) */
  const pts = [[RS_X0, 0]];
  for (let k = 0; k < 14; k++) { pts.push([RS_ORBIT[k], RS_ORBIT[k + 1]]); pts.push([RS_ORBIT[k + 1], RS_ORBIT[k + 1]]); }
  const m = 2 * n + 1, mi = Math.floor(m);
  for (let i = 0; i < Math.min(mi, pts.length - 1); i++) {
    const p = pts[i], q = pts[i + 1];
    line(P.X(p[0]), P.Y(p[1]), P.X(q[0]), P.Y(q[1]), i >= mi - 2 ? C.now : C.dim, a * (i >= mi - 2 ? 0.9 : 0.75), i >= mi - 2 ? 2.6 : 1.6);
  }
  let cur = pts[Math.min(mi, pts.length - 1)];
  if (mi < pts.length - 1) {
    const f = ease(m - mi), p = pts[mi], q = pts[mi + 1];
    cur = [lerp(p[0], q[0], f), lerp(p[1], q[1], f)];
    line(P.X(p[0]), P.Y(p[1]), P.X(cur[0]), P.Y(cur[1]), C.now, a, 2.6);
  }
  dot(P.X(cur[0]), P.Y(cur[1]), 14, 'g', a);
}
function rsWebBase(P, a) {
  rsFrame(P, a, [[0, '0'], [0.5, '0.5'], [1, '1']], [[0, '0'], [0.5, '0.5'], [1, '1']], 'x', 'y');
  rsDash(P.X(0), P.Y(0), P.X(1.1), P.Y(1.1), C.dim, a * 0.8);
  txt('y = x', P.X(1.02), P.Y(1.07), { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a });
  curve(s => [P.X(1.1 * s), P.Y(Math.cos(1.1 * s))], 80, C.cyan, a, 3.5);
  txt('y = cos x', P.X(0.08), P.Y(1.04), { size: 24, fam: F.math, w: 700, c: C.cyan, a });
  ring(P.X(RM.th), P.Y(RM.th), 9, C.white, a, 2);
  txt('θ*', P.X(RM.th) + 16, P.Y(RM.th) - 14, { size: 26, fam: F.math, w: 700, c: C.white, a });
}

/* ---- chapter 36: the curve θ = gd(η) with its wall at 90° ---- */
/* The staircase as a solid, with the objects of the lab page forgetting-rebirth-attractor (viz/forgetting-rebirth-
   attractor/model.js, QG_SAMSARA): the lit hyperboloid t² − x² − y² = 1 of unit rapidity vectors, cut open towards the
   viewer, inside the glass light cone t = √(x² + y²). The steps η_k = η(θ*) + k walk out along one meridian of the
   hyperboloid; seen from the apex, step k crosses the slice t = 1 (the page's Klein disk) at radius tanh η_k = sin θ_k,
   and the rim of that slice, where the cone crosses it, is the wall θ = 90°. The gap 1 − tanh η_k is the distance from
   that crossing to the rim (magenta). Only η ≤ RS_ETA_TOP is drawn: the later steps leave the top of the picture, and
   only their crossings of the slice stay in view, crowding toward the rim. */
const RS_ETA_TOP = 1.86, RS_T_TOP = Math.cosh(1.86);
const RS_VIEW = { yaw: -0.5, pitch: 0.55 };
/* the bearing that faces the viewer (the horizontal part of the camera's direction); the steps walk along the meridian a
   quarter turn from it, the hyperboloid's right-hand outline, so that the hyperbola and the cone's generator beside it
   are seen side on, and the surface is cut open over the front so that the slice t = 1 inside shows */
const RS_OPEN = Math.atan2(-Math.cos(RS_VIEW.yaw), -Math.sin(RS_VIEW.yaw)), RS_PATH = RS_OPEN + Math.PI / 2;
function rsStairShot(key, r, a, kN, o = {}) {
  const M = QG_SAMSARA, sh = solid(key, Object.assign({ x: r[0], y: r[1], w: r[2], h: r[3], unit: r[4], cy: r[5] == null ? 0.5 : r[5] }, RS_VIEW));
  const open = RS_OPEN, half = 1.2;   // the half-width of the cut
  sh.begin();
  /* the hyperboloid, cut open over the bearings facing the viewer, and the glass light cone */
  sh.surface('sheet', (u, v) => M.hyperboloid(v, u), { u: [open + half, open - half + TAU], v: [0, RS_ETA_TOP], nu: 72, nv: 26, color: C.blue, grid: { every: [6, 2], color: C.cyan, alpha: 0.3 } });
  sh.surface('cone', (u, v) => M.cone(v, u), { u: [0, TAU], v: [0, RS_T_TOP], nu: 72, nv: 6, color: C.cyan, alpha: 0.11, pick: false, occlude: false });
  sh.line(Array.from({ length: 97 }, (_, i) => M.cone(RS_T_TOP, TAU * i / 96)), { color: C.cyan, width: 1.2, alpha: 0.45 });
  sh.line([[0, 0, 0], [0, 0, RS_T_TOP + 0.3]], { color: C.dim, width: 1.2, alpha: 0.7, dash: [6, 6] });
  /* the slice t = 1 and its rim, the wall θ = 90° */
  const rim = Array.from({ length: 121 }, (_, i) => [Math.cos(TAU * i / 120), Math.sin(TAU * i / 120), 1]);
  sh.fan(rim.slice(0, 120), { fill: C.cyan, alpha: 0.08 });
  sh.line(rim, { color: C.white, width: 2.6, alpha: 0.95 });
  /* the cone's generator beside the path, the wall the hyperbola hugs */
  sh.line([[0, 0, 0], M.cone(RS_T_TOP, RS_PATH)], { color: C.white, width: 1.6, alpha: 0.6 });
  /* the meridian the steps walk along, and the steps so far */
  const ki = Math.floor(kN + 1e-9), mer = [];
  for (let i = 0; i <= 60; i++) mer.push(M.hyperboloid(RS_ETA_TOP * i / 60, RS_PATH));
  sh.tube('meridian', mer, { color: C.cyan, width: 3, alpha: 0.85, glow: 0.4 });
  for (let k = 0; k <= ki; k++) {
    const e = RS_STEPS[k].e, cur = k === ki, col = cur ? C.now : C.cyan, kp = M.klein(e, RS_PATH);
    if (e <= RS_ETA_TOP) sh.bead(M.hyperboloid(e, RS_PATH), { color: col, r: cur ? 9 : 6 });
    sh.bead(kp, { color: col, r: cur ? 7 : 4.5 });
    if (cur) {
      /* the ray from the apex through the step, and the gap from its crossing to the rim */
      const top = e > RS_ETA_TOP ? RS_T_TOP : Math.cosh(e);
      sh.line([[0, 0, 0], kp.map(v => v * top)], { color: C.now, width: 1.6, alpha: 0.8, dash: [6, 5] });
      sh.line([kp, [Math.cos(RS_PATH), Math.sin(RS_PATH), 1]], { color: C.mag, width: 4, alpha: o.gap == null ? 1 : o.gap });
    }
  }
  sh.end(a);
  const st = RS_STEPS[ki], front = [Math.cos(open), Math.sin(open), 1];
  return {
    sh, now: sh.anchor(st.e <= RS_ETA_TOP ? M.hyperboloid(st.e, RS_PATH) : M.klein(st.e, RS_PATH)), k0: sh.anchor(M.hyperboloid(RS_STEPS[0].e, RS_PATH)),
    rim: sh.anchor(front), cone: sh.anchor(M.cone(2.3, RS_PATH + Math.PI)), sheet: sh.anchor(M.hyperboloid(1.3, RS_PATH))
  };
}
function rsStairLabels(b, a, kN) {
  if (a <= 0.003) return;
  const ki = Math.floor(kN + 1e-9), s = RS_STEPS[ki];
  txt(`k = ${ki} · θ = ${(s.th / RS_DEG).toFixed(ki > 3 ? 3 : 1)}°`, b.now.x + 18, b.now.y - 16, { size: 22, fam: F.mono, w: 700, c: C.now, a });
  if (ki > 0) txt('k = 0 · θ*', b.k0.x - 18, b.k0.y - 12, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: a * (b.k0.hidden ? 0.4 : 1) });
  txt('θ = 90° · 墙 wall', b.rim.x + 10, b.rim.y + 34, { size: 20, fam: F.zh, w: 700, c: C.white, a });
  txt('light cone · 光锥', b.cone.x - 14, b.cone.y, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: a * 0.9 });
  txt('t² − x² − y² = 1', b.sheet.x + 18, b.sheet.y + 8, { size: 22, fam: F.math, w: 700, c: C.white, a: a * 0.85 });
}

/* ======================================================================= */
/*                               scene 1 · ALONE                             */
/* ======================================================================= */
SCENES.alone = S => {
  const u = S.u, L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.3) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 490, { size: 100, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble(DATA.film.title.toUpperCase(), p, 9), W / 2, 590, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 3, ab: 2 });
    txt('cos θ* = θ*  ·  sin θ = tanh η', W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
  }
  const a = at(S, 0, 0.8, 0.1) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const P = RS_WEB();
  rsWebBase(P, a);
  const n = clamp((u - L1.s - 0.2) / 0.85, 0, 9);
  rsWeb(P, a, n);

  /* the panel: the rule, the ledger with the sign of each error, the slope */
  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 640, a, C.cyan, 'ALONE · 独自内省');
  rsNumTag(x + w - 60, y + 16, a);
  txt('xₖ₊₁ = cos xₖ', x + 32, y + 86, { size: 34, fam: F.math, w: 700, c: C.cyan, a: a * Q(S, 0, 'one rule', 0.6) });
  txt(`x₀ = ${RS_X0.toFixed(1)}   θ* = cos θ* = ${RM.th.toFixed(6)}`, x + 32, y + 136, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * at(S, 1, 0.6) });
  const kNow = Math.floor(n + 1e-9);
  const qa = at(S, 1, 0.6) * a;
  txt('k', x + 50, y + 192, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: qa });
  txt('xₖ', x + 150, y + 192, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a: qa });
  txt('xₖ − θ*', x + 310, y + 192, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a: qa });
  for (let k = 0; k <= Math.min(kNow + (n > 0 ? 1 : 0), 9) && k <= 9; k++) {
    if (k > kNow + 1 || (k === kNow + 1 && n - kNow < 0.5)) break;
    const yy = y + 230 + k * 36, cur = k === Math.min(kNow + (n - kNow >= 0.5 ? 1 : 0), 9), col = cur ? C.now : C.white;
    txt(String(k), x + 50, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qa });
    txt(RS_ORBIT[k].toFixed(4), x + 150, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qa });
    txt((RS_ORBIT[k] > RM.th ? '+' : '') + rsN(RS_ORBIT[k] - RM.th, 4), x + 310, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qa });
  }
  const qs = Q(S, 2, 'The slope there', 0.6) * a;
  txt('slope at θ*', x + 400, y + 240, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qs });
  txt(`f′(θ*) = −sin θ* = ${rsN(-Math.sin(RM.th))}`, x + 400, y + 282, { size: 26, fam: F.math, w: 700, c: C.white, a: qs });
  const qf = Q(S, 2, 'flips the sign', 0.6) * a;
  txt('every step flips the sign', x + 400, y + 350, { size: 22, fam: F.mono, w: 700, c: C.now, a: qf });
  txt('+  −  +  −  +  −', x + 400, y + 400, { size: 30, fam: F.mono, w: 700, c: C.now, a: qf, ls: 4 });
  txt('误差每步变号，左右来回越过 θ*', x + 400, y + 460, { size: 24, fam: F.zh, w: 700, c: C.white, a: qf * 0.9 });
  txt('example clauses 17, 20 · 例第 17、20 项', x + 400, y + 510, { size: 17, fam: F.zh, w: 700, c: C.argued, a: qf });
};

/* ======================================================================= */
/*                             scene 2 · TWO MIRRORS                         */
/* ======================================================================= */
SCENES.round = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'apply existing results', 'argued']]);
  /* the readings against the beat number; every second beat is one round (a ring) */
  const P = rsPlot(200, 230, 680, 520, 0, 12, 0, 1.1);
  rsFrame(P, a, [[0, '0'], [2, '2'], [4, '4'], [6, '6'], [8, '8'], [10, '10'], [12, '12']], [[0, '0'], [0.5, '0.5'], [1, '1']], 'beat', null);
  txt('reading · 读数', P.px, P.py - 18, { size: 22, fam: F.zh, w: 700, c: C.white, a });
  rsDash(P.X(0), P.Y(RM.th), P.X(12), P.Y(RM.th), C.white, a * 0.8, 1.5);
  txt('θ*', P.X(12) + 12, P.Y(RM.th) + 8, { size: 26, fam: F.math, w: 700, c: C.white, a });
  const nb = clamp((u - 0.4) / Math.max(1, lineAt(S, 0).e - 0.4) * 12, 0, 12);
  const pts = RS_ORBIT.slice(0, 13).map((v, i) => [P.X(i), P.Y(v)]);
  const nbi = Math.floor(nb);
  for (let i = 0; i < Math.min(nbi, 12); i++) line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.dim, a * 0.8, 1.6);
  if (nbi < 12) { const f = nb - nbi; line(pts[nbi][0], pts[nbi][1], lerp(pts[nbi][0], pts[nbi + 1][0], f), lerp(pts[nbi][1], pts[nbi + 1][1], f), C.dim, a * 0.8, 1.6); }
  for (let i = 0; i <= nbi && i <= 12; i++) if (i % 2) dot(pts[i][0], pts[i][1], 6, 'w', a * 0.6);
  /* rounds: rings at the even beats, from line 1; the current round is amber */
  const nr = clamp((u - phraseAt(S, 1, 'one round') - 0.3) / 1.5, 0, 6);
  const nri = Math.floor(nr);
  for (let j = 0; j <= Math.min(nri, 6); j++) {
    const p = pts[2 * j], cur = j === nri;
    if (j > 0) line(pts[2 * j - 2][0], pts[2 * j - 2][1], p[0], p[1], C.white, a * 0.85, 2.2);
    ring(p[0], p[1], cur ? 13 : 10, cur ? C.now : C.white, a, 2.6);
  }
  if (nr > 0) {
    const below = Q(S, 2, 'always from below', 0.6) * a;
    txt('every ring below θ* · 环全在 θ* 下方', P.X(4.4), P.Y(0.2), { size: 22, fam: F.zh, w: 700, c: C.now, a: below });
  }

  /* the panel */
  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 640, a, C.cyan, 'TWO MIRRORS · 互指');
  rsNumTag(x + w - 60, y + 16, a);
  const q0 = Q(S, 0, 'A takes', 0.6) * a;
  txt('ψ_A ← cos ψ_B     ψ_B ← cos ψ_A'.replace(/_A/g, 'ₐ').replace(/_B/g, 'ʙ'), x + 32, y + 84, { size: 1, a: 0 });
  txt('A ← cos B,   B ← cos A', x + 32, y + 86, { size: 32, fam: F.math, w: 700, c: C.cyan, a: q0 });
  const q1 = Q(S, 1, 'cosine of the cosine', 0.6) * a;
  txt('one round = two readings:', x + 32, y + 146, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q1 });
  txt('g(x) = cos(cos x)', x + 32, y + 190, { size: 30, fam: F.math, w: 700, c: C.white, a: q1 });
  const q1b = Q(S, 1, 'slope is positive', 0.6) * a;
  txt('g′(x) = sin(cos x) · sin x > 0', x + 32, y + 238, { size: 26, fam: F.math, w: 700, c: C.white, a: q1b });
  /* the round ledger */
  const qr = Q(S, 2, 'Round by round', 0.6) * a;
  txt('k', x + 50, y + 296, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: qr });
  txt('yₖ = x₂ₖ', x + 190, y + 296, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a: qr });
  txt('yₖ − θ*', x + 350, y + 296, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a: qr });
  const q3 = Q(S, 3, 'shrinks the error', 0.6) * a;
  txt('ratio', x + 480, y + 296, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q3 });
  for (let k = 0; k <= Math.min(nri, 6); k++) {
    const yy = y + 332 + k * 34, col = k === nri ? C.now : C.white;
    txt(String(k), x + 50, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qr });
    txt(RS_ROUND[k].toFixed(4), x + 190, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qr });
    txt(rsN(RS_ROUND[k] - RM.th, 4), x + 350, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qr });
    if (k > 0) txt(((RS_ROUND[k] - RM.th) / (RS_ROUND[k - 1] - RM.th)).toFixed(3), x + 480, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: q3 });
  }
  txt('g′(θ*) = sin²θ*', x + 530, y + 340, { size: 24, fam: F.math, w: 700, c: C.white, a: q3 });
  txt(`= ${(Math.sin(RM.th) ** 2).toFixed(3)}`, x + 530, y + 382, { size: 28, fam: F.math, w: 700, c: C.now, a: q3 });
  txt(`= ${Math.sin(RM.th).toFixed(3)}²`, x + 530, y + 424, { size: 28, fam: F.math, w: 700, c: C.now, a: q3 * Q(S, 3, 'the square', 0.6) });
  const q4 = Q(S, 4, 'two readings', 0.6) * a;
  txt('一轮 = 两次求值：', x + 530, y + 500, { size: 22, fam: F.zh, w: 700, c: C.white, a: q4 });
  txt('平稳，不是更快', x + 530, y + 534, { size: 22, fam: F.zh, w: 700, c: C.white, a: q4 });
  const q5 = Q(S, 4, 'apply existing results', 0.6) * a;
  txt('application of existing results: example clauses 14, 21, 24', x + 32, y + 590, { size: 17, fam: F.mono, w: 700, c: C.argued, a: q5 });
  txt('既有结果的应用：例 ex-ch33 第 14、21、24 项；小数为屏幕计算', x + 32, y + 620, { size: 17, fam: F.zh, w: 700, c: C.argued, a: q5 });
};

/* ======================================================================= */
/*                             scene 3 · ANGLE RULER                         */
/* ======================================================================= */
/* the walk on the outside ruler: θ*, then one step per 1.1 s from line 1; the rim hit; the fall back; the restart */
function rsWallState(S) {
  const u = S.u, t1 = phraseAt(S, 1, 'every step adds') + 0.8, tHit = lineAt(S, 2).s + 0.2, tFall = phraseAt(S, 2, 'is zero') + 0.6;
  if (u < t1) return { th: RM.th, hit: 0, seq: RS_WALK1.slice(0, 1), round: 0 };
  if (u < tHit) { const f = ease(clamp((u - t1) / 0.7)); return { th: lerp(RS_WALK1[0], RS_WALK1[1], f), hit: 0, seq: RS_WALK1.slice(0, f >= 1 ? 2 : 1), round: 0 }; }
  if (u < tFall) { const f = ease(clamp((u - tHit) / 0.7)); return { th: lerp(RS_WALK1[1], RS_WALK1[2], f), hit: clamp((u - tHit - 0.6) / 0.3), seq: RS_WALK1.slice(0, f >= 1 ? 3 : 2), round: 0 }; }
  const tF = u - tFall;
  if (tF < 0.8) return { th: RS_HALF, fall: ease(tF / 0.8), hit: 1, seq: RS_WALK1, round: 0 };
  const n = clamp((tF - 0.8) / 0.6, 0, RS_WALK2.length - 1), ni = Math.floor(n), f = ease(clamp((n - ni) / 0.8));
  const th = ni >= RS_WALK2.length - 1 ? RS_HALF : lerp(RS_WALK2[ni], RS_WALK2[ni + 1], f);
  return { th, hit: ni >= RS_WALK2.length - 1 ? 1 : 0, seq: RS_WALK2.slice(0, ni + 1), round: 1, prev: RS_WALK1 };
}
SCENES.wall = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'axial anchor', 'argued']]);
  /* the dial: θ from the vertical (the axial anchor) toward the horizontal (90°) */
  const O = [230, 800], R = 560, Pt = t => [O[0] + R * Math.sin(t), O[1] - R * Math.cos(t)];
  curve(s => Pt(RS_HALF * s), 80, C.white, a * 0.8, 2.5);
  line(O[0], O[1], O[0], O[1] - R - 20, C.dim, a * 0.8, 1.5);
  line(O[0], O[1], O[0] + R + 30, O[1], C.dim, a * 0.8, 1.5);
  line(O[0] + R, O[1] - 70, O[0] + R, O[1] + 40, C.mag, a, 6);
  txt('90° · 墙 wall', O[0] + R + 18, O[1] - 44, { size: 22, fam: F.zh, w: 700, c: C.mag, a });
  for (const d of [0, 30, 60]) { const p = Pt(d * RS_DEG), q = [O[0] + (R + 14) * Math.sin(d * RS_DEG), O[1] - (R + 14) * Math.cos(d * RS_DEG)]; line(p[0], p[1], q[0], q[1], C.dim, a, 2); txt(`${d}°`, q[0] + 8, q[1] - 6, { size: 20, fam: F.mono, w: 700, c: C.dim, a }); }
  const st = rsWallState(S);
  /* the earlier stops, and the first round faded after the fall */
  const stops = (seq, al) => seq.forEach(t => { const p = Pt(t); dot(p[0], p[1], 8, t >= RS_HALF ? 'm' : 'c', al); });
  if (st.prev) stops(st.prev, a * 0.3);
  stops(st.seq, a);
  ring(Pt(RM.th)[0], Pt(RM.th)[1], 12, C.white, a * (st.round ? 0.3 : 1), 2);
  txt('θ*', Pt(RM.th)[0] - 18, Pt(RM.th)[1] - 18, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: a * (st.round ? 0.3 : 1) });
  /* the current state, its two projections: cos θ (the anchor, cyan) and sin θ (magenta) */
  let p = Pt(st.th);
  if (st.fall != null) p = [lerp(Pt(RS_HALF)[0], O[0], st.fall), lerp(Pt(RS_HALF)[1], O[1], st.fall)];
  if (st.fall != null) rsDash(Pt(RS_HALF)[0], Pt(RS_HALF)[1], O[0], O[1], C.dim, a, 2);
  if (st.fall == null) {
    line(O[0], O[1], p[0], p[1], C.now, a, 3.5);
    line(O[0] - 18, O[1], O[0] - 18, O[1] - R * Math.cos(st.th), C.cyan, a, 7);
    line(O[0], O[1] + 18, O[0] + R * Math.sin(st.th), O[1] + 18, C.mag, a * 0.8, 5);
    txt('cos θ', O[0] - 32, O[1] - R * Math.cos(st.th) / 2, { size: 22, fam: F.math, w: 700, align: 'right', c: C.cyan, a: a * clamp(Math.cos(st.th) * 8) });
  }
  dot(p[0], p[1], 15, 'g', a);
  if (st.hit > 0) { const q = Pt(RS_HALF); ring(q[0], q[1], 18 + 18 * (1 - st.hit), C.mag, a * st.hit, 3); }

  /* the panel */
  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 640, a, C.cyan, 'ANGLE RULER · 外部角度尺');
  rsNumTag(x + w - 60, y + 16, a);
  txt(`θ* = ${(RM.th / RS_DEG).toFixed(1)}°   cos θ* = ${RM.th.toFixed(3)}`, x + 32, y + 86, { size: 26, fam: F.math, w: 700, c: C.white, a });
  const q1 = Q(S, 1, 'every step adds', 0.6) * a;
  txt('θ ↦ θ + Δθ', x + 32, y + 150, { size: 32, fam: F.math, w: 700, c: C.now, a: q1 });
  txt(`Δθ = θ₁ − θ* = ${(RM.dth / RS_DEG).toFixed(1)}°`, x + 32, y + 200, { size: 26, fam: F.math, w: 700, c: C.white, a: q1 });
  txt('(the staircase\'s own first step · 与阶梯的第一步相同)', x + 32, y + 236, { size: 18, fam: F.zh, w: 700, c: C.dim, a: q1 });
  /* the live reading */
  const qv = at(S, 0, 0.6) * a;
  txt(`θ = ${(st.fall != null ? 90 : st.th / RS_DEG).toFixed(1)}°`, x + 32, y + 310, { size: 30, fam: F.mono, w: 700, c: C.now, a: qv });
  const cv0 = st.fall != null ? 0 : Math.cos(st.th);
  txt(`cos θ = ${rsN(cv0)}`, x + 300, y + 310, { size: 30, fam: F.mono, w: 700, c: C.cyan, a: qv });
  /* the steps, as a ledger */
  const ledger = (seq, y0, al) => seq.forEach((t, i) => {
    const raw = (i === 0 ? seq[0] : seq[0] + i * RM.dth) / RS_DEG;
    const s = t >= RS_HALF ? `${raw.toFixed(1)}° → 90°` : `${raw.toFixed(1)}°`;
    txt(s, x + 32 + i * 136, y0, { size: 22, fam: F.mono, w: 700, c: t >= RS_HALF ? C.mag : C.white, a: al });
  });
  ledger(RS_WALK1.slice(0, st.round ? RS_WALK1.length : st.seq.length), y + 390, a * (st.round ? 0.45 : 1) * q1);
  if (st.round) ledger(st.seq, y + 440, a);
  const q2 = Q(S, 2, 'axial anchor', 0.6) * a;
  txt('cos 90° = 0：轴向锚点归零', x + 32, y + 520, { size: 26, fam: F.zh, w: 700, c: C.mag, a: q2 });
  txt('回到 0，再走一圈 · back to 0, round again', x + 32, y + 568, { size: 22, fam: F.zh, w: 700, c: C.white, a: Q(S, 2, 'starts over', 0.6) * a });
};

/* ======================================================================= */
/*                              scene 4 · RAPIDITY                           */
/* ======================================================================= */
SCENES.ruler = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* η against θ: equal 10° steps on the angle axis spread ever wider on the η axis */
  const P = rsPlot(200, 210, 680, 560, 0, 90, 0, 5);
  rsFrame(P, a, [[0, '0°'], [30, '30°'], [60, '60°'], [90, '90°']], [[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5']], 'θ', 'η');
  rsDash(P.X(90), P.Y(0), P.X(90), P.Y(5.2), C.mag, a, 3, [10, 8]);
  txt('η → ∞', P.X(90) - 12, P.Y(5) + 4, { size: 24, fam: F.math, w: 700, align: 'right', c: C.mag, a });
  const dmax = 89.95;
  curve(s => { const d = dmax * s; return [P.X(d), P.Y(Math.min(5.15, RM.eta(d * RS_DEG)))]; }, 200, C.cyan, a, 3.5);
  const qt = Q(S, 0, 'Measure each step', 0.6) * a * (1 - Q(S, 2, 'Theta star sits', 0.6) * 0.6);
  for (let d = 10; d <= 80; d += 10) {
    const e = RM.eta(d * RS_DEG);
    rsDash(P.X(d), P.Y(0), P.X(d), P.Y(e), C.dim, qt * 0.7, 1.2, [3, 5]);
    rsDash(P.X(0), P.Y(e), P.X(d), P.Y(e), C.dim, qt * 0.7, 1.2, [3, 5]);
    line(P.X(0) - 8, P.Y(e), P.X(0) + 8, P.Y(e), C.cyan, qt, 2.5);
  }
  /* the sweeping point, then parked at θ* */
  const qs = Q(S, 2, 'Theta star sits', 0.8);
  const sweep = 88.5 * (0.5 - 0.5 * Math.cos(Math.min(1, (u - 0.6) / Math.max(1, phraseAt(S, 2, 'Theta star sits') - 0.6)) * Math.PI));
  const d = lerp(Math.max(0, sweep), RM.th / RS_DEG, ease(qs)), e = RM.eta(d * RS_DEG);
  rsDash(P.X(d), P.Y(0), P.X(d), P.Y(e), C.now, a * 0.8, 1.5);
  rsDash(P.X(0), P.Y(e), P.X(d), P.Y(e), C.now, a * 0.8, 1.5);
  dot(P.X(d), P.Y(e), 14, 'g', a);
  if (qs > 0) txt('θ*', P.X(d) + 14, P.Y(e) + 30, { size: 26, fam: F.math, w: 700, c: C.white, a: a * qs });

  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 640, a, C.cyan, 'RAPIDITY · 内禀快度');
  rsNumTag(x + w - 60, y + 16, a);
  const q0 = Q(S, 0, 'd eta equals', 0.6) * a;
  txt('dη = dθ / cos θ', x + 32, y + 92, { size: 36, fam: F.math, w: 700, c: C.cyan, a: q0 });
  txt('每一步按剩下的锚点 cos θ 来量', x + 32, y + 140, { size: 22, fam: F.zh, w: 700, c: C.white, a: q0 * 0.9 });
  const q1 = Q(S, 1, 'Integrated', 0.6) * a;
  txt('η(θ) = ∫[0, θ] sec α dα = ln tan(θ/2 + π/4)', x + 32, y + 206, { size: 25, fam: F.math, w: 700, c: C.white, a: q1 });
  txt('sin θ = tanh η     cos θ = sech η', x + 32, y + 256, { size: 30, fam: F.math, w: 700, c: C.white, a: q1 * Q(S, 1, 'hyperbolic tangent', 0.6) });
  /* the live reading, with tanh η checked against sin θ */
  const qv = at(S, 0, 0.6) * a;
  txt(`θ = ${d.toFixed(2)}°`, x + 32, y + 340, { size: 26, fam: F.mono, w: 700, c: C.now, a: qv });
  txt(`η = ${e.toFixed(3)}`, x + 300, y + 340, { size: 26, fam: F.mono, w: 700, c: C.now, a: qv });
  txt(`tanh η = ${Math.tanh(e).toFixed(4)}   sin θ = ${Math.sin(d * RS_DEG).toFixed(4)}`, x + 32, y + 386, { size: 22, fam: F.mono, w: 700, c: C.white, a: qv * Q(S, 1, 'hyperbolic tangent', 0.6) });
  const q2 = Q(S, 2, 'Theta star sits', 0.6) * a;
  txt(`η(θ*) = ${RM.eta0.toFixed(3)}`, x + 32, y + 466, { size: 32, fam: F.math, w: 700, c: C.white, a: q2 });
  const q3 = Q(S, 2, 'Ninety degrees sits', 0.6) * a;
  txt('η(90°) = ∞', x + 360, y + 466, { size: 32, fam: F.math, w: 700, c: C.mag, a: q3 });
  txt('角度尺上近在眼前的 90°，在快度尺上远在无穷', x + 32, y + 536, { size: 22, fam: F.zh, w: 700, c: C.white, a: q3 * 0.9 });
  txt('Gudermannian: literature result, not formalized in this book', x + 32, y + 600, { size: 17, fam: F.mono, w: 700, c: C.argued, a: a * 0.9 });
};

/* ======================================================================= */
/*                             scene 5 · STAIRCASE                           */
/* ======================================================================= */
function rsStairK(S) { const L0 = lineAt(S, 0), L2 = lineAt(S, 2); return clamp((S.u - L0.s - 1.2) / Math.max(1, L2.e - L0.s - 1.2) * 8, 0, 8); }
function rsGapPlot() { return rsPlot(200, 640, 680, 170, -0.5, 8.5, -8, 0); }
function rsStairs(G, a, kN) {
  /* the gap 1 − tanh η_k on a log scale: a bar that keeps going down and never reaches the bottom */
  const ki = Math.floor(kN + 1e-9);
  for (let k = 0; k <= ki; k++) {
    const s = RS_STEPS[k], cur = k === ki, g = Math.log10(s.gap), bx = G.X(k);
    fillBox(bx - 16, G.Y(0), 32, G.Y(g) - G.Y(0), C.mag, a * (cur ? 0.85 : 0.45));
  }
}
function rsGapFrame(G, a) {
  line(G.px, G.Y(0), G.px + G.pw, G.Y(0), C.dim, a * 0.8, 1.5);
  line(G.px, G.py, G.px, G.py + G.ph, C.dim, a * 0.8, 1.5);
  for (const v of [0, -4, -8]) txt(v === 0 ? '10⁰' : `10${String(v).split('').map(ch => RS_SUP[ch]).join('')}`, G.px - 12, G.Y(v) + 7, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  for (let k = 0; k <= 8; k += 2) txt(`k = ${k}`, G.X(k), G.py + G.ph + 28, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  txt('gap 1 − tanh ηₖ · 缝 (log scale)', G.px + 24, G.py - 14, { size: 20, fam: F.zh, w: 700, c: C.mag, a });
}
SCENES.stairs = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const G = rsGapPlot(), kN = rsStairK(S);
  /* the solid first: the hyperboloid, the cone and the steps; the 2D plot, labels and panel go on top */
  rsStairLabels(rsStairShot('stairs', [120, 170, 820, 440, 90, 0.95], a, kN, { gap: Math.max(0.35, Q(S, 3, 'the gap', 0.6)) }), a, kN);
  const qg = Q(S, 3, 'the gap', 0.6) * a;
  rsGapFrame(G, Math.max(qg, at(S, 2, 0.6) * a));
  rsStairs(G, a, at(S, 2, 0.6) > 0 ? kN : -1);
  const ki = Math.floor(kN + 1e-9), s8 = RS_STEPS[8];
  if (qg > 0) {
    txt(rsSci(s8.gap), G.X(8) - 30, G.Y(Math.log10(s8.gap)) + 4, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: qg });
    stamp('STILL OPEN', 640, 520, Q(S, 3, 'still open', 0.5) * a * (1 - clamp((u - S.d + 0.9) / 0.5)), C.mag, 30, -0.05);
  }

  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 640, a, C.cyan, 'STAIRCASE · 快度阶梯  Δη = 1');
  rsNumTag(x + w - 60, y + 16, a);
  txt('ηₖ = η(θ*) + k     θₖ = 2 arctan(exp ηₖ) − π/2', x + 32, y + 80, { size: 23, fam: F.math, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  const cols = [[60, 'k'], [180, 'ηₖ'], [330, 'θₖ'], [520, 'cos θₖ = sech ηₖ'], [740, '1 − tanh ηₖ']];
  const qh = at(S, 0, 0.6) * a;
  for (const [cx, l] of cols) txt(l, x + cx, y + 136, { size: 19, fam: F.math, w: 700, align: 'right', c: C.dim, a: qh });
  const qc = at(S, 2, 0.6), qgap = Q(S, 3, 'one minus tanh', 0.6);
  for (let k = 0; k <= ki; k++) {
    const s = RS_STEPS[k], yy = y + 176 + k * 40, col = k === ki ? C.now : C.white;
    txt(String(k), x + 60, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qh });
    txt(s.e.toFixed(3), x + 180, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qh });
    txt(`${(s.th / RS_DEG).toFixed(k > 3 ? 3 : 1)}°`, x + 330, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: col, a: qh });
    txt(s.cos < 0.01 ? rsSci(s.cos) : s.cos.toFixed(4), x + 520, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: k === ki ? C.now : C.cyan, a: a * qc });
    txt(rsSci(s.gap), x + 740, yy, { size: 22, fam: F.mono, w: 700, align: 'right', c: k === ki ? C.now : C.mag, a: a * qgap });
  }
  txt('cos θₖ > 0 for every finite k · 每个有限步都为正', x + 32, y + 560, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 2, 'positive at every', 0.6) });
  txt('numbers computed on screen; the staircase is the book\'s model', x + 32, y + 612, { size: 17, fam: F.mono, w: 700, c: C.dim, a: a * 0.9 });
};

/* ======================================================================= */
/*                             scene 6 · UNIT CIRCLE                         */
/* ======================================================================= */
/* c runs down the list during lines 0–1, holds in line 2, and creeps to RS_CEND in line 3 */
function rsCayC(S) {
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  const j = clamp((S.u - L0.s - 1.0) / Math.max(1, L1.e - L0.s - 1.0) * (RS_CS.length - 1), 0, RS_CS.length - 1);
  const ji = Math.floor(j), cj = ji >= RS_CS.length - 1 ? RS_CS[ji] : lerp(RS_CS[ji], RS_CS[ji + 1], ease(j - ji));
  const k = Q(S, 3, 'no c above', 1.6);
  return { c: lerp(cj, RS_CEND, ease(k)), j: ji };
}
SCENES.cayley = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean has checked', 'lean'], [3, 'So no c', 'computed']]);
  const st = rsCayC(S), c = st.c, q = RM.circ(c);
  /* the w-plane */
  const O = [610, 500], R = 280, X = v => O[0] + R * v, Y = v => O[1] - R * v;
  line(X(-1.25), Y(0), X(1.25), Y(0), C.dim, a * 0.5, 1.2);
  line(X(0), Y(-1.2), X(0), Y(1.2), C.dim, a * 0.5, 1.2);
  txt('Re w', X(1.25), Y(0) + 30, { size: 20, fam: F.math, w: 700, align: 'right', c: C.dim, a });
  txt('Im w', X(0) + 10, Y(1.2) + 6, { size: 20, fam: F.math, w: 700, c: C.dim, a });
  ring(O[0], O[1], R, C.white, a, 3);
  ring(O[0], O[1], R + 6, C.white, a * 0.15, 6);
  txt('|w| = 1  ↔  Re s = ½', X(-0.72), Y(0.78), { size: 22, fam: F.math, w: 700, align: 'right', c: C.white, a: a * Q(S, 2, 'when, and only when', 0.6) });
  /* earlier circles, faint cyan; the current one amber */
  for (let i = 0; i < RS_CS.length; i++) {
    if (RS_CS[i] < c - 1e-9) break;
    const qi = RM.circ(RS_CS[i]);
    ring(X(qi.cx), Y(0), R * qi.r, C.cyan, a * 0.55, 2);
  }
  ring(X(q.cx), Y(0), R * q.r, C.now, a, 3.2);
  /* a point travelling on the image of the line: s = c + i t */
  const tt = 2.2 * Math.tan(0.9 * Math.sin(u * 0.8)), wv = RM.cay(c, tt);
  dot(X(wv[0]), Y(wv[1]), 11, 'g', a);
  ring(X(1), Y(0), 9, C.white, a, 2.4);
  txt('w = 1', X(1) + 16, Y(0) - 14, { size: 22, fam: F.math, w: 700, c: C.white, a: a * Q(S, 1, 'touches the unit circle', 0.6) });
  /* the far gap */
  const qg = Q(S, 3, 'the far gap', 0.6) * a;
  if (qg > 0) {
    line(X(-1), Y(0), X(q.far), Y(0), C.mag, qg, 6);
    line(X(-1), Y(0) - 12, X(-1), Y(0) + 12, C.mag, qg, 2);
    line(X(q.far), Y(0) - 12, X(q.far), Y(0) + 12, C.mag, qg, 2);
    txt(`2 − 1/c = ${q.gap.toFixed(3)}`, X(-1) - 14, Y(0) + 40, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.mag, a: qg });
  }

  const x = RS_PX, y = RS_PY, w = RS_PW;
  panel(x, y, w, 360, a, C.cyan, 'w = (s − 1)/s · 分式变换');
  rsNumTag(x + w - 60, y + 16, a);
  /* the s-plane: the vertical line Re s = c and the critical line */
  const sx = v => x + 60 + (v - 0.4) * 520, sy0 = y + 70, sy1 = y + 330;
  line(sx(0.4), (sy0 + sy1) / 2, sx(1.08), (sy0 + sy1) / 2, C.dim, a * 0.6, 1.2);
  for (const v of [0.5, 1]) txt(v === 1 ? '1' : '½', sx(v), (sy0 + sy1) / 2 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  rsDash(sx(0.5), sy0, sx(0.5), sy1, C.white, a, 2, [8, 6]);
  txt('Re s = ½', sx(0.5) - 10, sy0 + 16, { size: 20, fam: F.math, w: 700, align: 'right', c: C.white, a });
  line(sx(c), sy0, sx(c), sy1, C.now, a, 3);
  txt(`Re s = c = ${c.toFixed(3)}`, sx(c) + 12, sy1 - 14, { size: 20, fam: F.mono, w: 700, c: C.now, a });
  txt('s-plane', sx(1.08), sy0 + 16, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  const qc = Q(S, 1, 'becomes a circle', 0.6) * a;
  txt('centre 1 − 1/(2c)', x + 470, y + 230, { size: 21, fam: F.math, w: 700, c: C.white, a: qc });
  txt(`radius 1/(2c) = ${q.r.toFixed(3)}`, x + 470, y + 266, { size: 21, fam: F.math, w: 700, c: C.white, a: qc });
  txt('tangent at w = 1', x + 470, y + 302, { size: 21, fam: F.math, w: 700, c: C.white, a: qc });
  /* the Lean statement */
  const ql = Q(S, 2, 'Lean has checked', 0.6) * a;
  panel(x, y + 390, w, 250, ql, C.lean, 'CAYLEY CRITICAL LINE · 单位圆临界判据');
  txt('for every s ∈ ℂ:', x + 28, y + 462, { size: 22, fam: F.math, w: 700, c: C.white, a: ql });
  txt('‖(s − 1)/s‖ = 1   ↔   Re s = 1/2', x + 28, y + 516, { size: 32, fam: F.math, w: 700, c: C.white, a: ql });
  rsLean(x + 28, y + 600, 'cayley_ratio_norm_one_iff_critical_line', ql, 19);
};

/* ======================================================================= */
/*                               scene 7 · LEDGER                            */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const t = 60.0, si = 4;
  background(t, TL.scenes[si], si, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.16, cx: 1380, cy: 420, camZ: 7, lw: 1.3, dots: false });
  rsStairLabels(rsStairShot('poster', [40, 260, 800, 540, 98, 0.92], 1, 8), 1, 8);
  const cx = 1340;
  txt('从互指锁死', cx, 250, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('到快度阶梯', cx, 360, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.cyan, ab: 3 });
  txt('FROM THE MUTUAL LOCK', cx, 446, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  txt('TO THE RAPIDITY STAIRCASE', cx, 496, { size: 36, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  txt('cos θ* = θ*  ·  sin θ = tanh η  ·  cos θₖ = sech ηₖ > 0', 920, 606, { size: 28, fam: F.math, w: 700, c: C.white });
  txt(`1 − tanh η₈ ≈ ${rsSci(RS_STEPS[8].gap)}`, 920, 662, { size: 28, fam: F.math, w: 700, c: C.mag });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 920, 750, { size: 22, fam: F.mono, w: 700, c: C.cyan, ls: 6 });
  rsLean(920, 812, 'cayley_ratio_norm_one_iff_critical_line', 1, 20);
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1000, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, TL.scenes[si]);
  post(3);
};
