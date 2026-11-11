/* Film 008 · Two cosines lock the third: the Gram window · 两条余弦锁住第三条：格拉姆窗口
   (book quantum-geometry, part VIII, chapter 29). Scenes for theme/film/engine.js.

   The geometry, as in the chapter and the lab page timeless-causal-crystal (card "window"):
     B = (0, 0, 1) at the north pole, A = (sin θ₁, 0, cos θ₁), C = (sin θ₂ cos φ, sin θ₂ sin φ, cos θ₂),
     so A·B = cos θ₁, B·C = cos θ₂, and φ is the dihedral angle between the planes of A, B and of B, C.
     A·C = cos θ₁ cos θ₂ + cos φ · sin θ₁ sin θ₂ ∈ [cos(θ₁ + θ₂), cos(θ₁ − θ₂)]          (the Gram window)
     det G = 1 − c_AB² − c_BC² − c_AC² + 2 c_AB c_BC c_AC
           = sin²θ₁ sin²θ₂ − (c_AC − cos θ₁ cos θ₂)²  =  (A · (B × C))²  =  (sin θ₁ sin θ₂ sin φ)²
     For a third cosine x outside the window, sin²θ₁ sin²θ₂ − (x − cos θ₁ cos θ₂)² < 0: no unit vectors.
     The slice c_AB = cos θ₁ of the region det G ≥ 0, drawn in the (c_BC, c_AC) plane, is the ellipse whose rim is
     (cos θ₂, cos(θ₁ ∓ θ₂)); its top touches 1 at θ₂ = θ₁, where C = A.

   Lean (film.json "lean", at the pinned commit): UnitGramIndistinguishability.unit_gram_overlap_characterization:
     for a family of unit vectors, ⟪record i, record j⟫ = 1 ↔ record i = record j, and "overlap 1" is an
     Equivalence. Every other number on screen is computed here (badge NUM), not cited.

   On load, FILM.init re-derives every identity above on a grid of angles, checks every number printed on
   screen against its formula, and checks the Lean citation; any disagreement is pushed to window.FILM_ERRORS,
   which stops the render. */
'use strict';

const GW_DEG = Math.PI / 180;
const GW_T1 = 60, GW_T2 = 45, GW_WISH = -0.5;           // the chapter's angles; the wished-for third cosine
const GW_LEAN = { unit_gram_overlap_characterization: 'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization' };

const GV = (() => {
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sc = (s, a) => [s * a[0], s * a[1], s * a[2]];
  const norm = a => Math.hypot(a[0], a[1], a[2]);
  const unit = a => sc(1 / norm(a), a);
  const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  /* the configuration for angles in degrees (θ₁, θ₂, φ) */
  function gram(t1d, t2d, phd) {
    const t1 = t1d * GW_DEG, t2 = t2d * GW_DEG, ph = phd * GW_DEG;
    const c1 = Math.cos(t1), s1 = Math.sin(t1), c2 = Math.cos(t2), s2 = Math.sin(t2);
    const A = sph(t1, 0), B = [0, 0, 1], C = sph(t2, ph), cAC = dot(A, C);
    return {
      A, B, C, c1, s1, c2, s2, cAC, mid: c1 * c2, half: s1 * s2,
      lo: Math.cos(t1 + t2), hi: Math.cos(t1 - t2),
      det: 1 - c1 * c1 - c2 * c2 - cAC * cAC + 2 * c1 * c2 * cAC,
      vol: dot(A, cross(B, C))
    };
  }
  /* det G as a function of a third cosine x (with c_AB = cos θ₁, c_BC = cos θ₂) */
  const detAt = (t1d, t2d, x) => { const c1 = Math.cos(t1d * GW_DEG), c2 = Math.cos(t2d * GW_DEG); return 1 - c1 * c1 - c2 * c2 - x * x + 2 * c1 * c2 * x; };
  /* the 3×3 determinant by cofactors */
  const det3 = m => m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  return { dot, cross, add, sc, norm, unit, sph, gram, detAt, det3 };
})();

/* number formatting: true minus sign, fixed decimals */
const gwN = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '') + Math.abs(v).toFixed(d); };
const GW0 = GV.gram(GW_T1, GW_T2, 0);                    // the chapter's window: θ₁ = 60°, θ₂ = 45°
const GW_WISH_DET = GV.detAt(GW_T1, GW_T2, GW_WISH);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('gram film: ' + m); };
  const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

  /* 0. the cited theorem at the pinned commit */
  const lean = DATA.lean || [];
  if (lean.length !== Object.keys(GW_LEAN).length) fail(`film.json cites ${lean.length} declarations, expected ${Object.keys(GW_LEAN).length}`);
  for (const [short, gid] of Object.entries(GW_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    if (r.kind !== 'theorem') fail(`${gid} is not a theorem at the pinned commit`);
    if (r.short !== short) fail(`${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the identities on a grid of angles */
  for (let t1 = 0; t1 <= 180; t1 += 15) for (let t2 = 0; t2 <= 180; t2 += 15) {
    for (let ph = 0; ph < 360; ph += 20) {
      const g = GV.gram(t1, t2, ph);
      for (const v of [g.A, g.B, g.C]) if (!near(GV.norm(v), 1)) fail('a vector is not a unit vector');
      if (!near(GV.dot(g.A, g.B), g.c1) || !near(GV.dot(g.B, g.C), g.c2)) fail(`A·B or B·C wrong at ${t1}, ${t2}`);
      if (!near(g.cAC, g.mid + Math.cos(ph * GW_DEG) * g.half)) fail(`A·C ≠ c₁c₂ + cos φ s₁s₂ at ${t1}, ${t2}, ${ph}`);
      if (g.cAC < g.lo - 1e-12 || g.cAC > g.hi + 1e-12) fail(`A·C outside the window at ${t1}, ${t2}, ${ph}`);
      const G = [[1, g.c1, g.cAC], [g.c1, 1, g.c2], [g.cAC, g.c2, 1]];
      const d3 = GV.det3(G);
      if (!near(d3, g.det) || !near(d3, g.half * g.half - (g.cAC - g.mid) ** 2) || !near(d3, g.vol * g.vol) ||
          !near(d3, (g.half * Math.sin(ph * GW_DEG)) ** 2)) fail(`det G identities fail at ${t1}, ${t2}, ${ph}`);
      /* symmetric in the three letters: every permutation of (A, B, C) gives the same determinant */
      const P = [[g.A, g.B, g.C], [g.B, g.A, g.C], [g.C, g.B, g.A], [g.A, g.C, g.B], [g.B, g.C, g.A], [g.C, g.A, g.B]];
      for (const [x, y, z] of P) {
        const xy = GV.dot(x, y), yz = GV.dot(y, z), xz = GV.dot(x, z);
        if (!near(1 - xy * xy - yz * yz - xz * xz + 2 * xy * yz * xz, d3)) fail('det G is not symmetric');
      }
    }
    /* the edges are attained at φ = 0 and φ = 180°, where det G = 0 */
    const e0 = GV.gram(t1, t2, 0), e1 = GV.gram(t1, t2, 180);
    if (!near(e0.cAC, e0.hi) || !near(e1.cAC, e0.lo) || !near(e0.det, 0) || !near(e1.det, 0)) fail(`edges wrong at ${t1}, ${t2}`);
    /* outside the window det G < 0 */
    if (e0.half > 1e-6) for (const x of [e0.hi + 0.01, e0.lo - 0.01]) if (x <= 1 && x >= -1 && !(GV.detAt(t1, t2, x) < 0)) fail(`det G ≥ 0 outside at ${t1}, ${t2}`);
  }

  /* 2. the numbers printed on screen */
  const g = GW0;
  if (!near(g.c1, 0.5, 1e-15) || g.c2.toFixed(3) !== '0.707') fail('cos 60° or cos 45°');
  if (g.mid.toFixed(3) !== '0.354' || g.half.toFixed(3) !== '0.612') fail('middle or half-width');
  if (!near(g.hi, Math.cos(15 * GW_DEG)) || !near(g.lo, Math.cos(105 * GW_DEG)) || g.hi.toFixed(3) !== '0.966' || gwN(g.lo) !== '−0.259') fail('window ends');
  if (gwN(GW_WISH_DET) !== '−0.354') fail(`det G at the wished cosine is ${GW_WISH_DET}`);
  if (!near(g.half * g.half, 0.375, 1e-12)) fail('max det G');
  /* 3. the lock: θ₂ = θ₁ and φ = 0 put C on A, with A·C = 1 */
  const L = GV.gram(GW_T1, GW_T1, 0);
  if (!near(L.cAC, 1) || GV.norm(GV.add(L.A, GV.sc(-1, L.C))) > 1e-12) fail('the lock C = A');
});
Object.assign(FILM.speed, { fix: 0.02, window: 0.014, volume: 0.016, ellipse: 0.02, lock: 0.014, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
/* orthographic view of the unit sphere: world z up → [screen x, screen y, depth] (depth > 0 behind) */
function gwView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2]; return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se]; };
  V.cx = cx; V.cy = cy; V.R = R;
  return V;
}
/* a parametric 3-D curve: the front runs bright, the back runs faint */
function gwPath(V, fn, n, col, aF, aB, lw = 2, dash = null) {
  if (aF <= 0.003 && aB <= 0.003) return;
  const pts = [];
  for (let i = 0; i <= n; i++) pts.push(V(fn(i / n)));
  let run = [pts[0]], back = pts[0][2] > 0;
  const flush = () => {
    if (run.length < 2) return;
    const r = run;
    ctx.save(); if (dash) ctx.setLineDash(dash);
    curve(k => r[Math.round(k * (r.length - 1))], r.length - 1, col, back ? aB : aF, back ? lw * 0.7 : lw);
    ctx.restore();
  };
  for (let i = 1; i < pts.length; i++) {
    const b = pts[i][2] > 0;
    run.push(pts[i]);
    if (b !== back) { flush(); run = [pts[i]]; back = b; }
  }
  flush();
}
/* great-circle arc between unit vectors u and v (scaled by r) */
function gwArc(V, u, v, col, a, lw = 3, r = 1) {
  const om = Math.acos(clamp(GV.dot(u, v), -1, 1));
  if (om < 1e-4) return;
  const so = Math.sin(om);
  gwPath(V, s => GV.sc(r, GV.add(GV.sc(Math.sin((1 - s) * om) / so, u), GV.sc(Math.sin(s * om) / so, v))), 48, col, a, a * 0.45, lw);
}
function gwSphere(V, a) {
  if (a <= 0.003) return;
  dot(V.cx - V.R * 0.18, V.cy - V.R * 0.22, V.R * 1.25, 'b', 0.07 * a);
  ring(V.cx, V.cy, V.R, C.cyan, 0.7 * a, 2.2);
  ring(V.cx, V.cy, V.R + 8, C.cyan, 0.14 * a, 1);
  for (const lat of [-60, -30, 0, 30, 60]) {
    const r = Math.cos(lat * GW_DEG), z = Math.sin(lat * GW_DEG);
    gwPath(V, s => [r * Math.cos(TAU * s), r * Math.sin(TAU * s), z], 72, C.blue, a * 0.3, a * 0.08, 1.2);
  }
  for (let k = 0; k < 6; k++) {
    const ph = k * Math.PI / 6;
    gwPath(V, s => [Math.sin(TAU * s) * Math.cos(ph), Math.sin(TAU * s) * Math.sin(ph), Math.cos(TAU * s)], 72, C.blue, a * 0.25, a * 0.07, 1.1);
  }
}
function gwVec(V, v, col, a, pearlName, label, o = {}) {
  if (a <= 0.003) return;
  const c0 = V([0, 0, 0]), p = V(v);
  arrow(c0[0], c0[1], p[0], p[1], col, a, o.lw || 4);
  dot(p[0], p[1], o.r || 14, pearlName, a);
  if (label) {
    const q = V(GV.sc(1.16, v));
    txt(label, q[0] + (o.dx || 0), q[1] + 12 + (o.dy || 0), { size: o.size || 36, fam: F.math, w: 700, align: 'center', c: col, a });
  }
}
function gwPoly(pts, col, a, stroke = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.closePath(); ctx.fill();
  if (stroke) { ctx.globalAlpha = Math.min(1, a * 3); ctx.strokeStyle = stroke; ctx.lineWidth = 2; ctx.stroke(); }
  ctx.restore();
}
/* coloured runs on one baseline: parts = [[text, colour, 'sub'?], …]; returns the end x */
function gwRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  const wid = p => tw(p[0], p[2] === 'sub' ? size * 0.62 : size, fam, w);
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + wid(p), 0) / 2;
  if (o.align === 'right') cx = x - parts.reduce((s, p) => s + wid(p), 0);
  for (const p of parts) {
    const sub = p[2] === 'sub';
    txt(p[0], cx, y + (sub ? size * 0.24 : 0), { size: sub ? size * 0.62 : size, fam, w, c: p[1], a, ab: o.ab });
    cx += wid(p);
  }
  return cx;
}
/* c with a two-letter subscript, as a list of rich parts */
const gwC = (pair, col) => [['c', col], [pair, col, 'sub']];
/* the three vectors, the arcs between them and the circle C may travel on */
function gwFigure(V, g, a, o = {}) {
  if (a <= 0.003) return;
  const aC = o.aC == null ? a : o.aC, aCirc = o.aCirc == null ? 0 : o.aCirc;
  let aVol = o.aVol || 0;
  /* the circle about B on which C may go */
  if (aCirc > 0) gwPath(V, s => [g.s2 * Math.cos(TAU * s), g.s2 * Math.sin(TAU * s), g.c2], 96, C.now, 0.8 * aCirc, 0.35 * aCirc, 2, [8, 8]);
  /* the solid the three arrows span */
  if (aVol > 0) {
    aVol *= clamp(Math.abs(g.vol) / 0.12);   // the solid flattens to nothing when the three are coplanar
    const O = V([0, 0, 0]), pA = V(g.A), pB = V(g.B), pC = V(g.C);
    for (const [p, q] of [[pA, pB], [pB, pC], [pA, pC]]) gwPoly([O, p, q], C.vio, 0.12 * aVol);
    gwPoly([pA, pB, pC], C.vio, 0.24 * aVol, C.vio);
  }
  /* A·B and B·C are meridians from the pole B (exact even when C = −B); A·C is a great-circle arc */
  const t1 = Math.acos(clamp(g.c1, -1, 1)), t2 = Math.acos(clamp(g.c2, -1, 1)), phC = Math.atan2(g.C[1], g.C[0]);
  gwPath(V, s => GV.sph(t1 * s, 0), 40, C.cyan, a, 0.45 * a, 4);
  if (aC > 0) { gwPath(V, s => GV.sph(t2 * s, phC), 60, C.mag, aC, 0.45 * aC, 4); if (o.aAC) gwArc(V, g.A, g.C, C.now, o.aAC * aC, 3.5); }
  /* labels give way when C sits on A, or when C's label would land on B's */
  const dCA = GV.norm(GV.add(g.C, GV.sc(-1, g.A))), pB = V(GV.sc(1.16, g.B)), pCl = V(GV.sc(1.16, g.C));
  const sep = clamp((dCA - 0.12) / 0.2), sepB = clamp((Math.hypot(pCl[0] - pB[0], pCl[1] - pB[1]) - 40) / 40);
  gwVec(V, g.B, C.white, a, 'w', 'B', { dy: -6 });
  gwVec(V, g.A, C.cyan, a, 'c', 'A', { dx: -8 });
  if (aC > 0) gwVec(V, g.C, C.now, aC, 'g', null, { r: 16 });
  if (aC > 0) txt('C', pCl[0], pCl[1] + 12, { size: 36, fam: F.math, w: 700, align: 'center', c: C.now, a: aC * sep * sepB });
  /* angle labels at the arc midpoints */
  if (o.labels !== false) {
    const mAB = V(GV.sc(1.13, GV.sph(t1 / 2, 0)));
    txt('θ₁', mAB[0] - 6, mAB[1] + 4, { size: 30, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
    if (aC > 0 && g.s2 > 0.05) {
      const mBC = V(GV.sc(1.13, GV.sph(t2 / 2, phC))), dl = Math.hypot(mBC[0] - mAB[0], mBC[1] - mAB[1]), dB = Math.hypot(mBC[0] - pB[0], mBC[1] - pB[1]);
      txt('θ₂', mBC[0] + 8, mBC[1] + 4, { size: 30, fam: F.math, w: 700, c: C.mag, a: aC * clamp((dl - 50) / 40) * clamp((dB - 50) / 30) });
    }
  }
}
/* a plot frame: data box [x0, x1] × [y0, y1] onto the screen rectangle (px, py, pw, ph) */
function gwPlot(px, py, pw, ph, x0, x1, y0, y1) {
  return { X: x => px + (x - x0) / (x1 - x0) * pw, Y: y => py + ph - (y - y0) / (y1 - y0) * ph, px, py, pw, ph };
}
/* LEAN ✓ chip for the cited theorem */
function gwLean(x, y, short, a, size = 20) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function gwNumTag(x, y, a) { chip(x, y, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }

const GW_V = () => gwView(520, 530, 268, Math.PI + 0.42, 0.4);

/* ======================================================================= */
/*                            scene 1 · TWO COSINES                          */
/* ======================================================================= */
SCENES.fix = S => {
  const u = S.u, L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.3);
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 340, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 490, { size: 104, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble(DATA.film.title.toUpperCase(), p, 8), W / 2, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
    txt('A · B · C  ·  det G ≥ 0', W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
  }
  const ma = at(S, 0, 0.8, 0.1) * clamp((S.d - u) / 0.5);
  if (ma <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* C appears at φ = 0, then from line 1 travels round the circle about B */
  const go = clamp((u - L1.s - 0.4) / Math.max(1, L1.e - L1.s + 0.2));
  const ph = 360 * ease(go) + 30 * clamp((u - L0.s) / (L1.s - L0.s + 0.01)) ;
  const g = GV.gram(GW_T1, GW_T2, ph);
  const V = GW_V();
  gwSphere(V, ma);
  const aC = Q(S, 0, 'and B with C', 0.6) * ma, aCirc = Q(S, 1, 'circle around B', 0.6, -0.4) * ma;
  gwFigure(V, g, ma * Q(S, 0, 'fix two cosines', 0.6, -0.8), { aC, aCirc, aAC: Q(S, 1, 'no longer free', 0.6) });

  /* the panel */
  const x = 1010, y = 190, w = 790;
  panel(x, y, w, 620, ma, C.cyan, 'TWO COSINES · 两条余弦');
  const q1 = Q(S, 0, 'fix two cosines', 0.6) * ma, q2 = aC;
  gwRich([...gwC('AB', C.cyan), [' = A·B = cos θ₁ = cos 60° = ', C.white], [gwN(g.c1), C.cyan]], x + 32, y + 100, { size: 32, a: q1 });
  gwRich([...gwC('BC', C.mag), [' = B·C = cos θ₂ = cos 45° = ', C.white], [gwN(g.c2), C.mag]], x + 32, y + 168, { size: 32, a: q2 });
  const q3 = Q(S, 1, 'no longer free', 0.6) * ma;
  gwRich([...gwC('AC', C.now), [' = A·C = ', C.white], ['?', C.now]], x + 32, y + 256, { size: 36, a: q3 * (1 - Q(S, 1, 'It can only', 0.6)) });
  gwRich([...gwC('AC', C.now), [' = A·C = ', C.white], [gwN(g.cAC), C.now]], x + 32, y + 256, { size: 36, a: q3 * Q(S, 1, 'It can only', 0.6) });
  const q4 = aCirc;
  txt('C stays on the circle about B:', x + 32, y + 350, { size: 24, fam: F.mono, w: 700, c: C.white, a: q4 });
  txt(`height cos θ₂ = ${gwN(g.c2)}  ·  radius sin θ₂ = ${gwN(g.s2)}`, x + 32, y + 392, { size: 24, fam: F.mono, w: 700, c: C.now, a: q4 });
  txt(`φ = ${(((ph % 360) + 360) % 360).toFixed(0)}°   (the angle between the planes AB and BC)`, x + 32, y + 450, { size: 22, fam: F.mono, w: 700, c: C.dim, a: q4 });
  txt('C 只能绕 B 转：二面角 φ 是唯一的自由度', x + 32, y + 520, { size: 26, fam: F.zh, w: 700, c: C.white, a: q4 * 0.9 });
  gwNumTag(x + w - 60, y + 16, q1);
};

/* ======================================================================= */
/*                             scene 2 · GRAM WINDOW                         */
/* ======================================================================= */
SCENES.window = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* C goes round once per 6 s; the trail on the gauge accumulates the values seen so far */
  const rate = 60, ph = rate * u;
  const g = GV.gram(GW_T1, GW_T2, ph);
  const V = GW_V();
  gwSphere(V, a);
  gwFigure(V, g, a, { aCirc: a, aAC: 1 });

  const x = 1010, y = 190, w = 790, h = 640;
  panel(x, y, w, h, a, C.cyan, 'GRAM WINDOW · 格拉姆窗口');
  gwNumTag(x + w - 60, y + 16, a);
  /* formula across the top */
  gwRich([...gwC('AC', C.now), [' = ', C.white], ['cos θ₁ cos θ₂', C.white], [' + ', C.white], ['cos φ', C.now], [' · ', C.white], ['sin θ₁ sin θ₂', C.white]], x + 32, y + 86, { size: 30, a });
  /* the gauge: c_AC from −1 (bottom) to 1 (top) */
  const gx = 1110, gt = 350, gb = 790, Y = c => gb - (c + 1) / 2 * (gb - gt);
  line(gx, gt, gx, gb, C.dim, a * 0.8, 2);
  for (const [c, l] of [[1, '1'], [0, '0'], [-1, '−1']]) { line(gx - 10, Y(c), gx + 10, Y(c), C.dim, a, 2); txt(l, gx - 62, Y(c) + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  gwRich(gwC('AC', C.now), gx - 16, gt - 22, { size: 26, a });
  /* trail: everything C has reached so far (a full turn covers the window) */
  const seen = Math.min(360, ph), lo = seen >= 180 ? g.lo : GV.gram(GW_T1, GW_T2, seen).cAC;
  fillBox(gx - 7, Y(g.hi), 14, Y(lo) - Y(g.hi), C.now, 0.45 * a);
  /* the edges, once the trail reaches them */
  const eTop = a, eBot = a * clamp((ph - 170) / 20);
  line(gx - 26, Y(g.hi), gx + 26, Y(g.hi), C.now, eTop, 3);
  line(gx - 26, Y(g.lo), gx + 26, Y(g.lo), C.now, eBot, 3);
  txt('cos(θ₁ − θ₂)', gx + 40, Y(g.hi) + 8, { size: 22, fam: F.math, w: 700, c: C.now, a: eTop });
  txt('cos(θ₁ + θ₂)', gx + 40, Y(g.lo) + 8, { size: 22, fam: F.math, w: 700, c: C.now, a: eBot });
  /* the middle and the half-width */
  const qm = Q(S, 1, 'The middle', 0.6) * a, qh = Q(S, 1, 'the half-width', 0.6) * a;
  line(gx - 18, Y(g.mid), gx + 18, Y(g.mid), C.white, qm, 3);
  if (qh > 0) {
    const bx = gx - 34;
    line(bx, Y(g.mid), bx, Y(g.mid + g.half), C.white, qh, 2); line(bx, Y(g.mid + g.half), bx + 10, Y(g.mid + g.half), C.white, qh, 2);
    line(bx, Y(g.mid), bx + 10, Y(g.mid), C.white, qh, 2);
  }
  dot(gx, Y(g.cAC), 15, 'g', a);
  /* live values and the two products */
  const fx = 1340;
  txt(`φ = ${(((ph % 360) + 360) % 360).toFixed(0)}°`, fx, 380, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  txt(`cos φ = ${gwN(Math.cos(ph * GW_DEG))}`, fx + 180, 380, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  gwRich([...gwC('AC', C.now), [' = ' + gwN(g.cAC), C.now]], fx, 428, { size: 28, fam: F.mono, a });
  txt('middle', fx, 500, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qm });
  txt(`cos θ₁ cos θ₂ = ${gwN(g.mid)}`, fx, 534, { size: 26, fam: F.math, w: 700, c: C.white, a: qm });
  txt('half-width', fx, 578, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qh });
  txt(`sin θ₁ sin θ₂ = ${gwN(g.half)}`, fx, 612, { size: 26, fam: F.math, w: 700, c: C.white, a: qh });
  const qw = Q(S, 2, 'the window runs', 0.6) * a;
  txt('window  ·  θ₁ = 60°, θ₂ = 45°', fx, 670, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qw });
  txt('[cos 105°, cos 15°]', fx, 710, { size: 30, fam: F.math, w: 700, c: C.now, a: qw });
  txt(`= [${gwN(g.lo)}, ${gwN(g.hi)}]`, fx, 756, { size: 30, fam: F.math, w: 700, c: C.now, a: qw * Q(S, 2, 'the cosine of fifteen', 0.6) });
};

/* ======================================================================= */
/*                               scene 3 · VOLUME                            */
/* ======================================================================= */
/* φ: round and round during lines 0–1; to 90° (largest volume) in line 2, then to the edge 180°; parked there in line 3 */
function gwVolumePhi(S) {
  const u = S.u, L2 = lineAt(S, 2);
  const sway = v => 90 + 60 * Math.sin(0.7 * v);
  if (u < L2.s) return sway(u);
  const k1 = ease(clamp((u - L2.s) / 1.2)), k2 = ease(Q(S, 2, 'At an edge', 1.0, -0.3));
  return lerp(lerp(sway(L2.s), 90, k1), 180, k2);
}
SCENES.volume = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const ph = gwVolumePhi(S), g = GV.gram(GW_T1, GW_T2, ph), V = GW_V();
  gwSphere(V, a);
  const flat = Q(S, 2, 'lie in one plane', 0.5);
  /* the great circle through A and B when they are coplanar */
  if (flat > 0) {
    gwPath(V, s => [Math.sin(TAU * s), 0, Math.cos(TAU * s)], 120, C.vio, 0.7 * flat * a, 0.35 * flat * a, 2.5);
    txt('one plane · 共面', 600, 700, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.vio, a: flat * a });
  }

  gwFigure(V, g, a, { aCirc: 0.5 * a, aAC: 1, aVol: a });

  const x = 1010, y = 190, w = 790, h = 640;
  panel(x, y, w, h, a, C.cyan, 'GRAM DETERMINANT · 格拉姆行列式');
  gwNumTag(x + w - 60, y + 16, a);
  const fx = x + 28;
  gwRich([['det G = 1 − ', C.white], ...gwC('AB', C.cyan), ['² − ', C.white], ...gwC('BC', C.mag), ['² − ', C.white], ...gwC('AC', C.now), ['² + 2', C.white], ...gwC('AB', C.cyan), ...gwC('BC', C.mag), ...gwC('AC', C.now)], fx, y + 84, { size: 27, a });
  gwRich([['= (volume of A, B, C)² = ', C.vio], [`${gwN(g.det)}`, C.vio]], fx, y + 132, { size: 27, a: a * Q(S, 0, 'Its volume squared', 0.6) });
  /* symmetric in the letters */
  const qs = Q(S, 1, 'Swap the letters', 0.6) * a * (1 - Q(S, 2, 'Inside', 0.5));
  if (qs > 0) {
    const perms = ['A B C', 'B A C', 'C B A', 'A C B', 'B C A', 'C A B'], k = Math.floor(clamp((u - phraseAt(S, 1, 'Swap the letters')) / 0.45, 0, 5.999));
    perms.forEach((p, i) => txt(p, fx + 20 + i * 122, y + 200, { size: 26, fam: F.math, w: 700, c: i === k ? C.now : C.white, a: qs * (i <= k ? 1 : 0.25) }));
    txt(`det G = ${gwN(g.det)} for every order · 无先后`, fx + 20, y + 246, { size: 24, fam: F.mono, w: 700, c: C.vio, a: qs * Q(S, 1, 'no vector comes first', 0.6) });
  }
  /* the parabola det G(x) = sin²θ₁ sin²θ₂ − (x − cos θ₁ cos θ₂)² over x = c_AC ∈ [−1, 1] */
  const pa = Q(S, 2, 'Inside', 0.6, -0.6) * a;
  if (pa > 0) {
    const P = gwPlot(fx + 80, y + 300, 600, 240, -1, 1, -1.5, 0.5);
    line(P.X(-1), P.Y(0), P.X(1), P.Y(0), C.dim, pa, 1.5);
    line(P.X(-1), P.Y(-1.5), P.X(-1), P.Y(0.5), C.dim, pa * 0.6, 1.2);
    for (const t of [-1, 0, 1]) txt(t === -1 ? '−1' : String(t), P.X(t), P.Y(-1.5) + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
    gwRich(gwC('AC', C.now), P.X(1) + 14, P.Y(0) + 8, { size: 24, a: pa });
    txt('det G', P.X(-1) - 12, P.Y(0.5) + 6, { size: 22, fam: F.math, w: 700, align: 'right', c: C.vio, a: pa });
    txt('0', P.X(-1) - 12, P.Y(0) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa });
    const fdet = xx => GV.detAt(GW_T1, GW_T2, xx);
    /* outside the window: dashed magenta (negative) */
    ctx.save(); ctx.setLineDash([9, 8]);
    curve(s => { const xx = lerp(-1, g.lo, s); return [P.X(xx), P.Y(fdet(xx))]; }, 40, C.mag, pa * 0.9, 2.5);
    curve(s => { const xx = lerp(g.hi, 1, s); return [P.X(xx), P.Y(fdet(xx))]; }, 10, C.mag, pa * 0.9, 2.5);
    ctx.restore();
    /* inside: violet, filled down to zero */
    const pts = [[P.X(g.lo), P.Y(0)]];
    for (let i = 0; i <= 60; i++) { const xx = lerp(g.lo, g.hi, i / 60); pts.push([P.X(xx), P.Y(fdet(xx))]); }
    pts.push([P.X(g.hi), P.Y(0)]);
    gwPoly(pts, C.vio, 0.22 * pa);
    curve(s => { const xx = lerp(g.lo, g.hi, s); return [P.X(xx), P.Y(fdet(xx))]; }, 60, C.vio, pa, 3.5);
    txt('det G > 0', P.X(g.mid), P.Y(0.12), { size: 22, fam: F.math, w: 700, align: 'center', c: C.vio, a: pa });
    for (const e of [g.lo, g.hi]) line(P.X(e), P.Y(0) - 12, P.X(e), P.Y(0) + 12, C.now, pa, 3);
    /* the current value; in line 3 a wished-for value slides out of the window */
    const wish = Q(S, 3, 'Ask for a cosine outside', 1.6);
    const xx = lerp(g.cAC, GW_WISH, ease(wish)), yy = fdet(xx);
    if (wish > 0) {
      dot(P.X(g.cAC), P.Y(g.det), 11, 'g', pa);
      dot(P.X(xx), P.Y(yy), 14, 'm', pa);
      gwRich([...gwC('AC', C.mag), [` = ${gwN(xx, 2)}  →  det G = ${gwN(yy)}`, C.mag]], fx, y + 612, { size: 26, fam: F.mono, a: pa });
    } else {
      dot(P.X(g.cAC), P.Y(g.det), 15, 'g', pa);
      gwRich([...gwC('AC', C.now), [` = ${gwN(g.cAC)}  →  det G = ${gwN(g.det)}`, C.now]], fx, y + 612, { size: 26, fam: F.mono, a: pa });
    }
    stamp('NO SUCH VECTORS', fx + 520, y + 440, Q(S, 3, 'No three unit vectors', 0.5) * pa, C.mag, 30, -0.05);
  }
};

/* ======================================================================= */
/*                               scene 4 · ELLIPSE                           */
/* ======================================================================= */
/* θ₂ from 0° to 180° over lines 0–1, C spinning on its circle all the while */
function gwSweep(S) { const L0 = lineAt(S, 0), L1 = lineAt(S, 1); return 180 * ease(clamp((S.u - L0.s - 0.6) / Math.max(1, L1.e - L0.s - 0.4))); }
function gwEllipse(P, t2, a, o = {}) {
  /* the region swept so far (θ₂ ∈ [0, t2]) */
  if (t2 > 0.2) {
    const pts = [];
    for (let i = 0; i <= 90; i++) { const t = t2 * i / 90; pts.push([P.X(Math.cos(t * GW_DEG)), P.Y(Math.cos((GW_T1 - t) * GW_DEG))]); }
    for (let i = 90; i >= 0; i--) { const t = t2 * i / 90; pts.push([P.X(Math.cos(t * GW_DEG)), P.Y(Math.cos((GW_T1 + t) * GW_DEG))]); }
    gwPoly(pts, C.vio, 0.3 * a);
  }
  if (o.rim > 0) {
    curve(s => { const t = 180 * s; return [P.X(Math.cos(t * GW_DEG)), P.Y(Math.cos((GW_T1 - t) * GW_DEG))]; }, 90, C.white, a * o.rim, 3);
    curve(s => { const t = 180 * s; return [P.X(Math.cos(t * GW_DEG)), P.Y(Math.cos((GW_T1 + t) * GW_DEG))]; }, 90, C.white, a * o.rim, 3);
  }
}
function gwAxes(P, a) {
  box(P.px, P.py, P.pw, P.ph, C.dim, a * 0.7, 1.2);
  line(P.X(0), P.py, P.X(0), P.py + P.ph, C.dim, a * 0.35, 1);
  line(P.px, P.Y(0), P.px + P.pw, P.Y(0), C.dim, a * 0.35, 1);
  for (const t of [-1, 0, 1]) {
    txt(t === -1 ? '−1' : String(t), P.X(t), P.py + P.ph + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
    txt(t === -1 ? '−1' : String(t), P.px - 12, P.Y(t) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  }
  gwRich(gwC('BC', C.mag), P.px + P.pw - 10, P.py + P.ph + 62, { size: 26, a });
  gwRich(gwC('AC', C.now), P.px - 70, P.py - 14, { size: 26, a });
}
SCENES.ellipse = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const t2 = gwSweep(S), ph = 150 * u + 20, g = GV.gram(GW_T1, t2, ph), V = GW_V();
  gwSphere(V, a);
  gwFigure(V, g, a, { aCirc: a, aAC: 1 });

  const x = 1010, y = 190, w = 790, h = 640;
  panel(x, y, w, h, a, C.cyan, 'THE SLICE c_AB = cos 60° · 椭圆切片');
  gwNumTag(x + w - 60, y + 16, a);
  const P = gwPlot(x + 130, y + 110, 430, 430, -1, 1, -1, 1);
  gwAxes(P, a);
  const rim = Q(S, 2, 'Its rim', 0.8, -0.3);
  gwEllipse(P, t2, a, { rim });
  /* the current slit */
  const sx = P.X(g.c2);
  line(sx, P.Y(g.lo), sx, P.Y(g.hi), C.now, a, 5);
  dot(sx, P.Y(g.cAC), 13, 'g', a);
  /* live numbers */
  const tx = x + 590;
  txt(`θ₂ = ${t2.toFixed(0)}°`, tx, y + 150, { size: 28, fam: F.mono, w: 700, c: C.mag, a });
  gwRich([...gwC('BC', C.mag), [` = ${gwN(g.c2, 2)}`, C.mag]], tx, y + 200, { size: 26, fam: F.mono, a });
  txt('window', tx, y + 270, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  txt(`top    ${gwN(g.hi, 2)}`, tx, y + 310, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  txt(`bottom ${gwN(g.lo, 2)}`, tx, y + 350, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  txt('det G > 0', P.X(0.05), P.Y(0.0) + 8, { size: 24, fam: F.math, w: 700, align: 'center', c: C.vio, a: a * clamp((t2 - 90) / 20) });
  const qr = rim * a;
  txt('cos(θ₁ − θ₂)', P.X(-0.95), P.Y(0.86), { size: 24, fam: F.math, w: 700, c: C.white, a: qr });
  txt('cos(θ₁ + θ₂)', P.X(0.22), P.Y(-0.9), { size: 24, fam: F.math, w: 700, c: C.white, a: qr });
  txt('rim: det G = 0', tx, y + 450, { size: 20, fam: F.mono, w: 700, c: C.white, a: qr });
  txt('A, B, C coplanar', tx, y + 484, { size: 20, fam: F.mono, w: 700, c: C.white, a: qr });
  txt('边上三根共面', tx, y + 522, { size: 24, fam: F.zh, w: 700, c: C.white, a: qr * 0.9 });
};

/* ======================================================================= */
/*                            scene 5 · OVERLAP ONE                          */
/* ======================================================================= */
SCENES.lock = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean has checked', 'lean']]);
  /* θ₂ runs 120° → 60° and φ → 0 during line 0, then C sits on A */
  const k = ease(clamp((u - 0.2) / Math.max(1, lineAt(S, 1).s + 0.6)));
  const t2 = lerp(120, GW_T1, k), ph = lerp(140, 0, k), g = GV.gram(GW_T1, t2, ph), V = GW_V();
  gwSphere(V, a);
  gwFigure(V, g, a, { aCirc: a * (1 - k * 0.6), aAC: 1 });
  const hit = Q(S, 1, 'C lands on A', 0.5);
  if (hit > 0) { const pA = V(g.A); ring(pA[0], pA[1], 30 + 30 * (1 - hit), C.now, a * hit, 3); txt('C = A', pA[0] - 30, pA[1] - 72, { size: 30, fam: F.math, w: 700, align: 'right', c: C.now, a: a * hit }); }

  const x = 1010, y = 190, w = 790;
  panel(x, y, w, 390, a, C.cyan, 'TOP EDGE · 上沿');
  gwNumTag(x + w - 60, y + 16, a);
  const P = gwPlot(x + 100, y + 70, 260, 260, -1, 1, -1, 1);
  gwAxes(P, a);
  gwEllipse(P, 180, a, { rim: 1 });
  const sx = P.X(g.c2);
  line(sx, P.Y(Math.cos((GW_T1 + t2) * GW_DEG)), sx, P.Y(Math.cos((GW_T1 - t2) * GW_DEG)), C.now, a, 4);
  dot(sx, P.Y(Math.cos((GW_T1 - t2) * GW_DEG)), 13, 'g', a);
  const tx = x + 440;
  txt(`θ₂ = ${t2.toFixed(1)}°`, tx, y + 110, { size: 26, fam: F.mono, w: 700, c: C.mag, a });
  txt(`φ  = ${ph.toFixed(1)}°`, tx, y + 152, { size: 26, fam: F.mono, w: 700, c: C.now, a });
  gwRich([...gwC('AC', C.now), [` = ${gwN(g.cAC)}`, C.now]], tx, y + 210, { size: 30, fam: F.mono, a });
  gwRich([['θ₂ = θ₁:  cos 0 = ', C.white], ['1', C.now]], tx, y + 290, { size: 28, a: a * Q(S, 0, 'touches one', 0.6) });

  /* the Lean statement */
  const qa = Q(S, 1, 'An overlap of one', 0.6) * a;
  panel(x, y + 410, w, 230, qa, C.lean, 'UNIT GRAM OVERLAP · 单位内积');
  txt('‖record i‖ = 1 for all i  ⟹', x + 28, y + 480, { size: 24, fam: F.math, w: 700, c: C.white, a: qa });
  txt('⟨record i, record j⟩ = 1  ↔  record i = record j', x + 28, y + 524, { size: 26, fam: F.math, w: 700, c: C.white, a: qa });
  txt('and  (i, j) ↦ ⟨record i, record j⟩ = 1  is an Equivalence', x + 28, y + 564, { size: 22, fam: F.math, w: 700, c: C.white, a: qa * Q(S, 2, 'equivalence relation', 0.6) });
  gwLean(x + 28, y + 616, 'unit_gram_overlap_characterization', Q(S, 2, 'Lean has checked', 0.6) * a, 20);
  stamp('NO CLOCK', 780, 215, Q(S, 3, 'no clock', 0.5) * a * (1 - clamp((u - S.d + 0.9) / 0.5)), C.cyan, 34, -0.05);
};

/* ======================================================================= */
/*                               scene 6 · LEDGER                            */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const t = 40.0, si = 3;
  background(t, TL.scenes[si], si, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.18, cx: 1360, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const V = gwView(450, 580, 285, Math.PI + 0.42, 0.4), g = GV.gram(GW_T1, GW_T2, 115);
  gwSphere(V, 1);
  gwFigure(V, g, 1, { aCirc: 1, aAC: 1, aVol: 1 });
  const P = gwPlot(1530, 560, 230, 230, -1, 1, -1, 1);
  gwAxes(P, 1);
  gwEllipse(P, 180, 1, { rim: 1 });
  line(P.X(GW0.c2), P.Y(GW0.lo), P.X(GW0.c2), P.Y(GW0.hi), C.now, 1, 5);
  dot(P.X(GW0.c2), P.Y(g.cAC), 13, 'g', 1);
  const cx = 1300;
  txt('两条余弦锁住第三条', cx, 250, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('格拉姆窗口', cx, 362, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.cyan, ab: 3 });
  txt('TWO COSINES LOCK THE THIRD', cx, 448, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  txt('THE GRAM WINDOW', cx, 500, { size: 38, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  gwRich([...gwC('AC', C.now), [' ∈ [cos(θ₁ + θ₂), cos(θ₁ − θ₂)]', C.white]], 860, 610, { size: 32 });
  gwRich([['det G = (', C.white], ['volume', C.vio], [')² ≥ 0', C.white]], 860, 672, { size: 32 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 860, 750, { size: 22, fam: F.mono, w: 700, c: C.cyan, ls: 6 });
  gwLean(860, 812, 'unit_gram_overlap_characterization', 1, 20);
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1000, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, TL.scenes[si]);
  post(3);
};
