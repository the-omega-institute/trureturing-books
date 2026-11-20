/* Film · The line and the area · 线与面积
   (book quantum-geometry, part II: chapter 6). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     meet     two unit arrows A, B at angle θ: the shadow of B on A has length cos θ (the line), the parallelogram they
              span has area sin θ (the area); θ turns from 35° to 90° (computed).
     squares  u = (1, 2, 2), v = (1, 1, 0): |u|²|v|² = 18, u·v = 3, 9; the parallelogram's shadows on the coordinate
              planes have areas |u_i v_j − u_j v_i| = 1, 2, 2 and 1 + 4 + 4 = 9 = 18 − 9 (computed)
              ..... LagrangeGramIdentity.lagrange_gram_identity (LEAN); the Cauchy–Schwarz gap is the area squared
              and, for unit arrows, cos²θ + sin²θ = 1 (chapter 6, read off the identity).
     slits    two slits whose paths leave unit marks r_L, r_R; in the chapter's model (equal weights, balanced
              combining, scanned reference phase) the screen goes as 1 + V cos(φ + arg c) with V = |⟨r_L, r_R⟩|
              (schematic envelope; argued); α = 0, 90°, arccos 0.8 (computed).
     circle   D = √(1 − V²) = 0.6, D² + V² = 0.36 + 0.64 = 1 and the two ends
              ..... RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity (LEAN);
              for the marks V is the shadow of r_R on r_L and D the area they span (computed); the roles of line and
              area swap with respect to the qubit of chapter 6.1 (chapter 6.3).
     edge     D is defined from V (the circle follows at once; Cauchy–Schwarz keeps V ≤ 1); D as the trace distance
              of the two marks and Englert's D² + V² ≤ 1 for noisy marks are literature results (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen by an
   independent route (the identity on random real lists, the plane shadows as 2D determinants of projected arrows,
   random complex unit records, the fringe contrast of the two-path model, the trace distance of two pure marks).
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const LA_DEG = Math.PI / 180;
const LA_LEAN = {
  lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  pure_record_distinguishability_coherence_complementarity: 'D5/S3/Quantum/PureState/RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity'
};
const LA_U = [1, 2, 2], LA_V = [1, 1, 0];
const laDot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
const laN2 = u => laDot(u, u);
/* the plane areas u_i v_j − u_j v_i for i < j: (x, y), (x, z), (y, z) */
const LA_PLANES = [[0, 1, 'xy'], [0, 2, 'xz'], [1, 2, 'yz']];
const laMinor = (u, v, i, j) => u[i] * v[j] - u[j] * v[i];
/* the right side of the Lean statement: ½ Σ_i Σ_j (u_i v_j − u_j v_i)² */
const laHalfDouble = (u, v) => { let s = 0; for (let i = 0; i < u.length; i++) for (let j = 0; j < u.length; j++) s += Math.pow(laMinor(u, v, i, j), 2); return s / 2; };
/* the marks of scene slits: r_L = (1, 0), r_R = (cos α, sin α); V = cos α, D = sin α */
const LA_ALPHA = Math.acos(0.8);
/* complex vectors as arrays of [re, im] */
const laC = {
  ip: (a, b) => a.reduce((s, z, k) => [s[0] + z[0] * b[k][0] + z[1] * b[k][1], s[1] + z[0] * b[k][1] - z[1] * b[k][0]], [0, 0]),   // ⟨a, b⟩, conjugate-linear in a
  norm: a => Math.sqrt(a.reduce((s, z) => s + z[0] * z[0] + z[1] * z[1], 0)),
  unit: a => { const n = laC.norm(a); return a.map(z => [z[0] / n, z[1] / n]); },
  abs: z => Math.hypot(z[0], z[1])
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('line-and-area film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(LA_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(LA_LEAN).length}`);
  for (const [short, gid] of Object.entries(LA_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. SQUARES: the numbers on screen */
  check(laN2(LA_U) === 9 && laN2(LA_V) === 2 && laDot(LA_U, LA_V) === 3, '|u|² = 9, |v|² = 2, u·v = 3');
  check(laN2(LA_U) * laN2(LA_V) === 18 && 3 * 3 === 9 && 18 - 9 === 9, '18 − 9 = 9');
  const mins = LA_PLANES.map(([i, j]) => laMinor(LA_U, LA_V, i, j));
  check(mins[0] === -1 && mins[1] === -2 && mins[2] === -2 && mins.reduce((s, m) => s + m * m, 0) === 9, 'plane areas 1, 2, 2 and 1 + 4 + 4 = 9');
  check(laHalfDouble(LA_U, LA_V) === 9, 'half the double sum is 9');
  check(Math.abs(Math.acos(3 / Math.sqrt(18)) / LA_DEG - 45) < 1e-9, 'the angle is 45°');
  /* the shadows: the parallelogram projected on a coordinate plane is spanned by the two projected arrows */
  LA_PLANES.forEach(([i, j], k) => check(Math.abs(LA_U[i] * LA_V[j] - LA_U[j] * LA_V[i]) === [1, 2, 2][k], `shadow on ${LA_PLANES[k][2]}`));
  const cr = [LA_U[1] * LA_V[2] - LA_U[2] * LA_V[1], LA_U[2] * LA_V[0] - LA_U[0] * LA_V[2], LA_U[0] * LA_V[1] - LA_U[1] * LA_V[0]];
  check(laN2(cr) === 9, 'the cross product has squared length 9');
  /* the identity on random real lists of every length 1..7 */
  for (let k = 0; k < 60; k++) {
    const n = 1 + (k % 7), u = [], v = [];
    for (let i = 0; i < n; i++) { u.push(4 * rnd(k, i) - 2); v.push(4 * rnd(k, i + 20) - 2); }
    const lhs = laN2(u) * laN2(v) - Math.pow(laDot(u, v), 2), rhs = laHalfDouble(u, v);
    check(Math.abs(lhs - rhs) < 1e-9, `Lagrange identity ${k}`);
    check(lhs >= -1e-12, `Cauchy–Schwarz ${k}`);
  }
  /* unit arrows: the line cos θ and the area sin θ */
  for (let d = 0; d <= 180; d += 5) { const t = d * LA_DEG, a = [1, 0], b = [Math.cos(t), Math.sin(t)]; check(near(laDot(a, b), Math.cos(t)) && near(Math.abs(a[0] * b[1] - a[1] * b[0]), Math.sin(t)) && near(Math.pow(laDot(a, b), 2) + Math.pow(a[0] * b[1] - a[1] * b[0], 2), 1), `unit arrows at ${d}°`); }

  /* 2. SLITS and CIRCLE: complex unit records, the fringe contrast of the two-path model, the two ends */
  for (let k = 0; k < 60; k++) {
    const n = 2 + (k % 3);
    const rl = laC.unit(Array.from({ length: n }, (_, i) => [2 * rnd(k, 40 + i) - 1, 2 * rnd(k, 50 + i) - 1]));
    const rr = laC.unit(Array.from({ length: n }, (_, i) => [2 * rnd(k, 60 + i) - 1, 2 * rnd(k, 70 + i) - 1]));
    const c = laC.ip(rl, rr), V = laC.abs(c), D = Math.sqrt(1 - V * V);
    check(V <= 1 + 1e-12 && near(D * D + V * V, 1, 1e-12), `D² + V² = 1 for random records ${k}`);
    /* screen: ½(1 + Re(e^{iφ} c)) from the amplitude (r_L + e^{iφ} r_R)/2; its contrast over φ is |c| */
    let lo = Infinity, hi = -Infinity;
    for (let s = 0; s < 720; s++) {
      const ph = s * TAU / 720, amp = rl.map((z, i) => [(z[0] + Math.cos(ph) * rr[i][0] - Math.sin(ph) * rr[i][1]) / 2, (z[1] + Math.sin(ph) * rr[i][0] + Math.cos(ph) * rr[i][1]) / 2]);
      const I = amp.reduce((t, z) => t + z[0] * z[0] + z[1] * z[1], 0);
      check(near(I, 0.5 * (1 + Math.cos(ph) * c[0] - Math.sin(ph) * c[1]), 1e-12), `screen intensity ${k}`);
      lo = Math.min(lo, I); hi = Math.max(hi, I);
    }
    check(Math.abs((hi - lo) / (hi + lo) - V) < 1e-4, `fringe contrast is |c| ${k}`);
    /* the trace distance of the two pure marks is √(1 − |c|²) (shown as a literature result) */
    const tr = Math.sqrt(Math.max(0, 1 - V * V));
    check(near(tr, D, 1e-12), `trace distance of pure marks ${k}`);
  }
  const rl = [[1, 0], [0, 0]], rr = [[0.8, 0], [0.6, 0]], c = laC.ip(rl, rr);
  check(near(laC.abs(c), 0.8) && near(Math.sqrt(1 - 0.64), 0.6) && near(0.36 + 0.64, 1) && near(Math.cos(LA_ALPHA), 0.8) && near(Math.sin(LA_ALPHA), 0.6), 'V = 0.8, D = 0.6');
  check(near(laC.abs(laC.ip(rl, [[0, 0], [1, 0]])), 0) && near(laC.abs(laC.ip(rl, rl)), 1), 'the two ends');
  check(Math.abs(LA_ALPHA / LA_DEG - 36.87) < 0.005, 'α ≈ 36.87°');
});
Object.assign(FILM.speed, { meet: 0.02, squares: 0.014, slits: 0.018, circle: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const laFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const laNum = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function laRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const LA_MISSING = new Set();
function laLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!LA_MISSING.has(gid)) { LA_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a filled polygon through screen points */
function laPoly(pts, col, a, fill = 0.25, lw = 2.5, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
/* a horizontal bar of total width w split into coloured parts [[value, colour, label]], scaled by total */
function laBar(x, y, w, h, total, parts, a, o = {}) {
  if (a <= 0.003) return;
  let cx = x;
  for (const [v, col, lab, al] of parts) {
    const pw = w * v / total, pa = a * (al == null ? 1 : al);
    if (pa > 0.003 && pw > 0.5) {
      fillBox(cx, y, pw, h, col, pa * 0.55);
      box(cx, y, pw, h, col, pa, 1.5);
      if (lab) txt(lab, cx + pw / 2, y + h / 2 + (o.size || 24) * 0.36, { size: o.size || 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: pa });
    }
    cx += pw;
  }
}
/* two unit arrows from O at angles a0, a1 (radians, counter-clockwise from +x), R pixels: the shadow of the second on
   the first (cyan line) and the parallelogram they span (magenta area) */
function laPair(O, R, a0, a1, a, o = {}) {
  const A = [Math.cos(a0), Math.sin(a0)], B = [Math.cos(a1), Math.sin(a1)], d = A[0] * B[0] + A[1] * B[1];
  const P = p => [O[0] + R * p[0], O[1] - R * p[1]];
  const pa = P(A), pb = P(B), pab = P([A[0] + B[0], A[1] + B[1]]), foot = P([A[0] * d, A[1] * d]);
  if (a <= 0.003) return { A: pa, B: pb, foot };
  laPoly([P([0, 0]), pa, pab, pb], C.mag, a * (o.area == null ? 1 : o.area), 0.22, 2);
  if ((o.line == null ? 1 : o.line) > 0.003) {
    line(O[0], O[1], foot[0], foot[1], C.cyan, a * (o.line == null ? 1 : o.line), 8);
    ctx.save(); ctx.setLineDash([6, 6]); line(pb[0], pb[1], foot[0], foot[1], C.white, a * 0.45 * (o.line == null ? 1 : o.line), 1.5); ctx.restore();
  }
  arrow(O[0], O[1], pa[0], pa[1], o.colA || C.white, a, 5);
  arrow(O[0], O[1], pb[0], pb[1], o.colB || C.now, a, 5);
  return { A: pa, B: pb, foot };
}
/* opening title */
function laTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE LINE AND THE AREA', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('SHADOW · PARALLELOGRAM · SQUARES · SLITS · MARKS · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · TWO ARROWS                        */
/* ======================================================================= */
const MT_O = [380, 690], MT_R = 400;
SCENES.meet = S => {
  const u = S.u;
  laTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const th = (35 + 55 * ease(Q(S, 2, 'Turn one arrow', 2.6))) * LA_DEG;
  const la = Q(S, 1, 'The line is', 0.8), aa = Q(S, 1, 'The area is', 0.8);
  const P = laPair(MT_O, MT_R, 0, th, a, { line: la, area: aa });
  txt('A', P.A[0] + 16, P.A[1] + 10, { size: 34, fam: F.math, w: 700, c: C.white, a });
  txt('B', P.B[0] + 12, P.B[1] - 12, { size: 34, fam: F.math, w: 700, c: C.now, a });
  txt(`θ = ${Math.round(th / LA_DEG)}°`, MT_O[0] + 70, MT_O[1] - 22, { size: 26, fam: F.mono, w: 700, c: C.white, a: a * 0.9 });
  if (la > 0.01) txt('line · 线', (MT_O[0] + P.foot[0]) / 2, MT_O[1] + 46, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * la * clamp((P.foot[0] - MT_O[0]) / 80) });
  if (aa > 0.01) txt('area · 面积', MT_O[0] + MT_R * 0.75 * (1 + Math.cos(th)) / 2 + 10, MT_O[1] - MT_R * 0.5 * Math.sin(th), { size: 28, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * aa });
  /* readouts: two bars */
  const ra = a * la;
  if (ra > 0.003) {
    panel(1180, 240, 620, 360, ra, C.cyan, 'LINE AND AREA · 线与面积');
    const c = Math.cos(th), s = Math.sin(th), bw = 420;
    txt('line  A·B = cos θ', 1210, 318, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: ra });
    fillBox(1210, 336, bw * c, 34, C.cyan, ra * 0.6); box(1210, 336, bw, 34, C.cyan, ra * 0.5, 1.2);
    txt(laNum(c), 1210 + bw + 20, 362, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ra });
    const ab = ra * aa;
    txt('area  |A∧B| = sin θ', 1210, 438, { size: 24, fam: F.mono, w: 700, c: C.mag, a: ab });
    fillBox(1210, 456, bw * s, 34, C.mag, ab * 0.6); box(1210, 456, bw, 34, C.mag, ab * 0.5, 1.2);
    txt(laNum(s), 1210 + bw + 20, 482, { size: 28, fam: F.mono, w: 700, c: C.mag, a: ab });
    txt('unit arrows · 单位箭头', 1210, 560, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
};

/* ======================================================================= */
/*                             scene 2 · SQUARES ADD UP                      */
/* ======================================================================= */
/* an oblique view of 3D space: world (x, y, z) → screen */
function sqView(cx, cy, k, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw; return [cx + X * k, cy - (p[2] * ce + Y * se) * k]; };
  return V;
}
const SQ_PROJ = [p => [p[0], p[1], 0], p => [p[0], 0, p[2]], p => [0, p[1], p[2]]];
SCENES.squares = S => {
  const u = S.u, a = laFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean'], [6, null, 'computed']]);
  const V = sqView(430, 730, 130, -0.30 + 0.04 * u, 0.34);
  const O = [0, 0, 0], UV = [LA_U[0] + LA_V[0], LA_U[1] + LA_V[1], LA_U[2] + LA_V[2]];
  /* the axes */
  for (const [e, l] of [[[3.0, 0, 0], 'x'], [[0, 3.4, 0], 'y'], [[0, 0, 3.0], 'z']]) {
    const p0 = V(O), p1 = V(e);
    arrow(p0[0], p0[1], p1[0], p1[1], C.dim, a * 0.8, 2);
    txt(l, p1[0] + 10, p1[1] + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
  }
  /* the shadows on the three coordinate planes (line 3) */
  const t3 = phraseAt(S, 3, 'casts shadows'), sh = Q(S, 3, 'casts shadows', 0.9);
  if (sh > 0.003) LA_PLANES.forEach(([i, j, nm], k) => {
    const f = SQ_PROJ[k], pts = [O, LA_U, UV, LA_V].map(p => V(f(p)));
    const ka = a * clamp((u - t3 - 0.6 * k) / 0.5);
    if (ka <= 0.003) return;
    laPoly(pts, C.mag, ka, 0.12, 1.8, [7, 6]);
    const cx = pts.reduce((s, p) => s + p[0], 0) / 4, cy = pts.reduce((s, p) => s + p[1], 0) / 4;
    chip(cx, cy, 92, 40, `${nm} ${Math.abs(laMinor(LA_U, LA_V, i, j))}`, C.mag, ka, 22);
    [LA_U, UV, LA_V].forEach(p => { const q = V(p), r = V(f(p)); ctx.save(); ctx.setLineDash([3, 6]); line(q[0], q[1], r[0], r[1], C.mag, ka * 0.35, 1.2); ctx.restore(); });
  });
  /* the parallelogram (line 2) and the two arrows */
  const pa = Q(S, 0, 'whole-number', 0.8);
  laPoly([O, LA_U, UV, LA_V].map(V), C.mag, a * Q(S, 2, 'missing nine', 0.8), 0.3, 2.5);
  const pu = V(LA_U), pv = V(LA_V), po = V(O);
  arrow(po[0], po[1], pu[0], pu[1], C.white, a * pa, 5);
  arrow(po[0], po[1], pv[0], pv[1], C.now, a * pa, 5);
  txt('u = (1, 2, 2)', pu[0] - 18, pu[1] - 18, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: a * pa });
  txt('v = (1, 1, 0)', pv[0] + 40, pv[1] + 6, { size: 26, fam: F.math, w: 700, c: C.now, a: a * pa });
  /* the ledger */
  panel(1000, 180, 820, 390, a, C.cyan, 'THE LEDGER · 账本');
  const l1 = at(S, 1, 0.5);
  laRich([['|u|² |v|² = 9 × 2 = ', C.white], ['18', C.white]], 1028, 250, { size: 30, a: a * l1 });
  laRich([['u·v = 1 + 2 + 0 = 3     (u·v)² = ', C.cyan], ['9', C.cyan]], 1028, 304, { size: 30, a: a * Q(S, 1, 'dot product is', 0.5) });
  laRich([['shadows · 影子   xy −1   xz −2   yz −2', C.mag]], 1028, 360, { size: 24, a: a * Q(S, 3, 'casts shadows', 0.5), fam: F.zh });
  laRich([['area² = 1 + 4 + 4 = ', C.mag], ['9', C.mag]], 1028, 414, { size: 30, a: a * Q(S, 3, 'one plus four', 0.5) });
  /* the bar: 18 = 9 + 9 */
  laBar(1028, 448, 720, 56, 18, [[9, C.cyan, 'line² 9', l1 * Q(S, 1, 'three squared', 0.5)], [9, C.mag, 'area² 9', at(S, 2, 0.5)]], a);
  txt('18', 1028 + 732, 486, { size: 26, fam: F.mono, w: 700, c: C.white, a: a * l1 });
  txt('45° · line and area are equal here · 这里线与面积一样大', 1028, 544, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 3, 0.5, 3) });
  /* lines 4–5: Lean */
  const la = a * Q(S, 4, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 590, 820, 230, la, C.lean, 'ANY TWO LISTS OF REAL NUMBERS · 任意两组实数');
    laRich([['(Σuᵢ²)(Σvᵢ²) − (Σuᵢvᵢ)² = ½ ΣᵢΣⱼ (uᵢvⱼ − uⱼvᵢ)²', C.white]], 1024, 668, { size: 27, a: la * Q(S, 5, 'Squared lengths', 0.6) });
    laLean(1024, 722, LA_LEAN.lagrange_gram_identity, la, { size: 19 });
    /* line 6: the Cauchy–Schwarz gap */
    laRich([['(u·v)² ≤ |u|²|v|²   gap · 差 = area²', C.cyan]], 1024, 786, { size: 24, a: la * at(S, 6, 0.6), fam: F.zh });
  }
  const ua = a * Q(S, 7, 'For unit arrows', 0.6);
  if (ua > 0.003) {
    chip(470, 250, 470, 72, 'cos²θ + sin²θ = 1', C.white, ua, 34, F.math);
    txt('unit arrows · 单位箭头', 470, 322, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ua });
  }
  stamp('18 = 9 + 9', 470, 260, Q(S, 4, 'Lean checks', 0.5, 0.8) * (1 - at(S, 5, 0.5, 2.2)), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                           scene 3 · TWO SLITS, TWO MARKS                  */
/* ======================================================================= */
const SL = { src: [170, 470], bx: 470, y0: 210, y1: 730, ys: [410, 530], gap: 26, sx: 1060, k: 140 };
/* the angle of the marks: 0 on line 1, 90° on line 2, arccos 0.8 on line 3 */
function slAlpha(S) {
  const p2 = ease(Q(S, 2, 'perpendicular', 1.2)), p3 = ease(Q(S, 3, 'In between', 1.4));
  return lerp(lerp(0, 90 * LA_DEG, p2), LA_ALPHA, p3);
}
/* the screen of the chapter's model: a schematic envelope times 1 + V cos φ, φ running along the screen */
const slEnv = y => Math.exp(-Math.pow((y - 470) / 230, 2));
const slI = (y, V) => slEnv(y) * (1 + V * Math.cos((y - 470) / 26));
function slScene(S, alpha, a) {
  const V = Math.cos(alpha);
  /* barrier with two slits and the marks behind them */
  const { bx, y0, y1, ys, gap, sx, k } = SL;
  let y = y0;
  for (let j = 0; j < 2; j++) { line(bx, y, bx, ys[j] - gap / 2, C.white, a * 0.85, 6); y = ys[j] + gap / 2; }
  line(bx, y, bx, y1, C.white, a * 0.85, 6);
  dot(SL.src[0], SL.src[1], 16, 'w', a);
  ctx.save();
  ctx.beginPath(); ctx.rect(bx + 4, y0 - 20, sx - bx - 8, y1 - y0 + 40); ctx.clip();
  for (let j = 0; j < 2; j++) for (let q = 0; q < 8; q++) {
    const r = (S.t * 110 + q * 75) % 600;
    ctx.globalAlpha = a * 0.28 * clamp(r / 40) * clamp((600 - r) / 120); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(bx, ys[j], r, -1.1, 1.1); ctx.stroke();
  }
  ctx.restore();
  txt('L', bx - 26, ys[0] + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  txt('R', bx - 26, ys[1] + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  /* the marks: small arrows at each slit, r_L fixed, r_R turned by α */
  const ma = a * Q(S, 0, 'leave a mark', 0.8);
  if (ma > 0.003) {
    const mR = 46;
    for (const [j, ang, col, nm] of [[0, 0, C.white, 'r_L'], [1, alpha, C.now, 'r_R']]) {
      const cx = bx + 70, cy = ys[j];
      ring(cx, cy, mR + 6, C.dim, ma * 0.4, 1);
      arrow(cx, cy, cx + mR * Math.cos(ang), cy - mR * Math.sin(ang), col, ma, 3.5);
      txt(nm, cx + mR + 16, cy + (j ? 26 : -12), { size: 22, fam: F.mono, w: 700, c: col, a: ma });
    }
  }
  /* the screen */
  line(sx, y0, sx, y1, C.white, a * 0.5, 2);
  for (let yy = y0; yy < y1; yy += 3) fillBox(sx - 7, yy, 14, 3, C.white, a * clamp(slI(yy + 1.5, V) / 2) * 0.95);
  curve(s => { const yy = lerp(y0, y1, s); return [sx + 14 + k * slI(yy, V), yy]; }, 260, C.cyan, a, 3.5);
  return V;
}
SCENES.slits = S => {
  const u = S.u, a = laFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Here it is', 'computed']]);
  const alpha = slAlpha(S);
  const V = slScene(S, alpha, a);
  /* the readout */
  panel(1400, 200, 420, 330, a, C.cyan, 'MARKS · 记号');
  const ma = a * Q(S, 0, 'leave a mark', 0.8);
  laRich([['α = ', C.white], [`${laNum(alpha / LA_DEG, 1)}°`, C.now]], 1424, 270, { size: 30, a: ma });
  laRich([['V = |⟨r_L, r_R⟩| = ', C.white], [laNum(V), C.cyan]], 1424, 330, { size: 26, a: ma * at(S, 1, 0.6) });
  const words = [
    [1, 'same marks · 记号相同', 'full stripes · 满条纹'],
    [2, 'perpendicular · 记号垂直', 'no stripes · 无条纹'],
    [3, 'in between · 介于之间', 'contrast 0.80 · 对比度 0.80']
  ];
  let cur = null;
  for (const w of words) if (at(S, w[0], 0.01) > 0) cur = w;
  if (cur) {
    const wa = a * at(S, cur[0], 0.6);
    txt(cur[1], 1424, 400, { size: 24, fam: F.zh, w: 700, c: C.white, a: wa });
    txt(cur[2], 1424, 444, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: wa });
  }
  txt('schematic · equal weights, phase scanned', 1424, 494, { size: 16, fam: F.mono, w: 700, c: C.argued, a: a * 0.9 });
  txt('示意模型 · 等权、扫描参考相位', 1424, 516, { size: 16, fam: F.zh, w: 700, c: C.argued, a: a * 0.9 });
  txt('screen · 屏', SL.sx, SL.y1 + 40, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
};

/* ======================================================================= */
/*                          scene 4 · LINE AND AREA AGAIN                    */
/* ======================================================================= */
const CI_O = [230, 700], CI_R = 360;
SCENES.circle = S => {
  const u = S.u, a = laFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* the two marks as two arrows: the shadow of r_R on r_L is V, the area they span is D */
  const P = laPair(CI_O, CI_R, 0, LA_ALPHA, a, { line: 1, area: Q(S, 0, 'square root', 0.8) });
  txt('r_L', P.A[0] + 14, P.A[1] + 10, { size: 28, fam: F.mono, w: 700, c: C.white, a });
  txt('r_R', P.B[0] + 12, P.B[1] - 10, { size: 28, fam: F.mono, w: 700, c: C.now, a });
  txt('V = 0.80  line · 线', (CI_O[0] + P.foot[0]) / 2, CI_O[1] + 50, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a });
  const da = a * Q(S, 0, 'square root', 0.8);
  if (da > 0.003) {
    ctx.save(); ctx.setLineDash([]); line(P.foot[0], P.foot[1], P.B[0], P.B[1], C.mag, da, 5); ctx.restore();
    txt('D = 0.60', P.foot[0] + 16, (P.foot[1] + P.B[1]) / 2 + 10, { size: 28, fam: F.mono, w: 700, c: C.mag, a: da });
    txt('area · 面积', CI_O[0] + CI_R * 1.05, CI_O[1] - CI_R * 0.08, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: da });
  }
  /* the readout */
  panel(1000, 180, 820, 300, a, C.cyan, 'PATH AND STRIPES · 路径与条纹');
  laRich([['D = √(1 − V²) = √(1 − 0.64) = ', C.white], ['0.60', C.mag]], 1024, 250, { size: 28, a: a * Q(S, 0, 'square root', 0.6) });
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  laRich([['D² + V² = ', C.white], ['0.36', C.mag], [' + ', C.white], ['0.64', C.cyan], [' = 1', C.white]], 1024, 310, { size: 30, a: a * Q(S, 1, 'zero point three six', 0.5) });
  laBar(1024, 336, 700, 48, 1, [[0.36, C.mag, 'D² 0.36'], [0.64, C.cyan, 'V² 0.64']], a * Q(S, 1, 'zero point three six', 0.5), { size: 20 });
  laLean(1024, 440, LA_LEAN.pure_record_distinguishability_coherence_complementarity, la, { size: 16 });
  if (la > 0.003) txt('any two unit records · 任意两条单位记录', 1024, 404, { size: 20, fam: F.zh, w: 700, c: C.lean, a: la });
  /* line 2: the two ends, as two small dials */
  const ea = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  if (ea > 0.003) {
    panel(1000, 500, 820, 300, ea, C.lean, 'THE TWO ENDS · 两端');
    laPair([1110, 720], 130, 0, 90 * LA_DEG, ea * Q(S, 2, 'perpendicular marks', 0.5), { line: 1, area: 1 });
    txt('D = 1, V = 0', 1290, 640, { size: 28, fam: F.mono, w: 700, c: C.mag, a: ea * Q(S, 2, 'perpendicular marks', 0.5) });
    txt('no stripes · 无条纹', 1290, 680, { size: 22, fam: F.zh, w: 700, c: C.white, a: ea * Q(S, 2, 'perpendicular marks', 0.5) });
    laPair([1530, 720], 130, 0, 0, ea * Q(S, 2, 'full overlap', 0.5), { line: 1, area: 1 });
    txt('V = 1, D = 0', 1530, 640, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: ea * Q(S, 2, 'full overlap', 0.5) });
    txt('full stripes · 满条纹', 1530, 680, { size: 22, fam: F.zh, w: 700, c: C.white, a: ea * Q(S, 2, 'full overlap', 0.5) });
  }
  /* line 3: the swap */
  const wa = a * at(S, 3, 0.6);
  if (wa > 0.003) {
    panel(1000, 500, 820, 300, wa, C.cyan, 'NOTICE THE SWAP · 角色互换');
    txt('two qubit arrows · 两支量子比特箭头 (6.1)', 1024, 566, { size: 22, fam: F.zh, w: 700, c: C.dim, a: wa });
    laRich([['line', C.cyan], [' = click · 粒子   ', C.white], ['area', C.mag], [' = wave · 波', C.white]], 1024, 608, { size: 26, a: wa, fam: F.zh });
    txt('two marks · 两支记号 (6.3)', 1024, 680, { size: 22, fam: F.zh, w: 700, c: C.dim, a: wa });
    laRich([['line', C.cyan], [' = stripes · 条纹   ', C.white], ['area', C.mag], [' = path · 路径', C.white]], 1024, 722, { size: 26, a: wa * Q(S, 3, 'their shared line', 0.6), fam: F.zh });
  }
  stamp('D² + V² = 1', 520, 300, Q(S, 1, 'Lean checks', 0.5, 0.8) * (1 - at(S, 1, 0.5, 4.6)), C.lean, 28, -0.06);
};

/* ======================================================================= */
/*                         scene 5 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
const ED_O = [300, 760], ED_R = 480;
SCENES.edge = S => {
  const u = S.u, a = laFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the quarter circle D² + V² = 1 with V across and D up */
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(ED_O[0], ED_O[1], ED_R, -Math.PI / 2, 0); ctx.stroke(); ctx.restore();
  arrow(ED_O[0], ED_O[1], ED_O[0] + ED_R + 60, ED_O[1], C.dim, a, 2);
  arrow(ED_O[0], ED_O[1], ED_O[0], ED_O[1] - ED_R - 50, C.dim, a, 2);
  txt('V', ED_O[0] + ED_R + 70, ED_O[1] + 8, { size: 28, fam: F.math, w: 700, c: C.cyan, a });
  txt('D', ED_O[0] - 14, ED_O[1] - ED_R - 60, { size: 28, fam: F.math, w: 700, align: 'right', c: C.mag, a });
  const p = [ED_O[0] + 0.8 * ED_R, ED_O[1] - 0.6 * ED_R];
  ctx.save(); ctx.setLineDash([6, 6]);
  line(p[0], p[1], p[0], ED_O[1], C.cyan, a * 0.5, 1.5); line(p[0], p[1], ED_O[0], p[1], C.mag, a * 0.5, 1.5); ctx.restore();
  dot(p[0], p[1], 14, 'g', a);
  txt('pure marks · 纯记号  (0.80, 0.60)', p[0] - 20, p[1] - 16, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a });
  /* line 2: a noisy mark falls inside (schematic) */
  const na = a * Q(S, 2, 'noisy marks', 0.8);
  if (na > 0.003) {
    const q = [ED_O[0] + 0.8 * ED_R, ED_O[1] - 0.6 * ED_R * lerp(1, 0.55, ease(Q(S, 2, 'falls inside', 1.2)))];
    ctx.save(); ctx.setLineDash([5, 6]); line(p[0], p[1], q[0], q[1], C.argued, na * 0.8, 2); ctx.restore();
    dot(q[0], q[1], 12, 'v', na);
    txt('noisy · 带噪声（示意）', q[0] - 20, q[1] + 8, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.argued, a: na });
  }
  /* the three limits */
  const rows = [
    { k: 0, col: C.white, en: 'D := √(1 − V²)', zh: 'D 由 V 定义，圆直接推出', note: 'Cauchy–Schwarz only keeps V ≤ 1 · 柯西—施瓦茨只保证 V ≤ 1' },
    { k: 1, col: C.argued, en: 'D = trace distance of the marks', zh: 'D 等于两支记号的迹距离', note: 'literature result · 文献结果' },
    { k: 2, col: C.argued, en: 'noisy marks: D² + V² ≤ 1', zh: '记号带噪声：点落进圆内', note: "Englert's inequality, not formalized here · 本书未形式化" }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(900, y, 920, 180, ra, rw.col === C.white ? C.cyan : rw.col);
    txt(rw.en, 930, y + 58, { size: 30, fam: F.math, w: 700, c: rw.col === C.white ? C.cyan : rw.col, a: ra });
    txt(rw.zh, 930, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 930, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.white ? C.dim : C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
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
  const P = laPair([260, 760], 520, 0, 52 * LA_DEG, 1, { line: 1, area: 1 });
  txt('A', P.A[0] + 16, P.A[1] + 10, { size: 40, fam: F.math, w: 700, c: C.white });
  txt('B', P.B[0] + 12, P.B[1] - 14, { size: 40, fam: F.math, w: 700, c: C.now });
  txt(DATA.film.title_zh, 1380, 420, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE LINE', 1380, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('AND THE AREA', 1380, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  laRich([['line² ', C.cyan], ['+', C.white], [' area²', C.mag], [' = 1', C.white]], 1380, 680, { size: 44, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
