/* Film · Three pairs of caps leak, six cover · 三对冰盖漏缝，六对盖满
   (book quantum-geometry, chapter 9, §9.4). Scenes for theme/film/engine.js.

   A "color" of an axis a (a unit vector) is the pair of antipodal open caps { x on the unit sphere : (x·a)² > 1/2 },
   every point within 45° of +a or −a. For the whole-number axis a_i of RationalSixAxisCover (|a_i|² = 5) this is
   exactly the Lean set color i = { x : 5 < 2 (x·a_i)² }.

   What each scene shows, and where it rests:
     caps   one axis, its two caps (the shape of one color); two points in one cap are less than 90° apart, one from each
            cap more than 90° (angles computed on screen); the circle at 90° from the axis (overlap 0, the blind spot
            of chapter 1) is in no cap.
     three  the coordinate axes e1, e2, e3: on the diagonal d = (1, 1, 1)/√3, (d·e_j)² = 1/3 < 1/2 (computed); the
            uncovered part of the sphere (magenta) opens round all eight diagonals; the six caps are tangent and do not
            overlap, so the uncovered share is exactly 1 − 3(1 − 1/√2) = 3/√2 − 2 ≈ 12.1 % (computed).
     six    each coordinate axis splits into two unit axes at angle s from it, s from 0 to arctan 2; at s = arctan 2
            they are the six axes (1, ±2, 0), (0, 1, ±2), (±2, 0, 1) of the Lean module (computed: the grid shows no
            uncovered point for s from 15° on, see below); on the diagonal (d·a_0)² = 3, 3/5 > 1/2, i.e. 2 · 3 = 6 > 5 (computed);
            open, orthogonality-free and covering ..... RationalSixAxisCover.rational_six_axis_open_cover (LEAN).
            The diagonal is covered iff sin 2s > 1/2 (s > 15°); at s = 45° the six points ±e_j score exactly 1/2, so
            the sphere is covered for s ∈ (15°, arctan 2] except s = 45° (zero-area gaps at 15° and 45°). The
            uncovered-share readout comes from a midpoint (z, φ) grid of one octant (all axis sets used here are
            symmetric under the coordinate sign flips), tabulated every 0.5° (computed).
     five   the point x = (√6/4, √6/4, 1/2) of the chapter's example lies in colors 0, 2, 4 and in no other; its circle
            at right angles meets only colors 1, 3, 5, and each of them is alone on some arc (computed);
            the two steps of the proof — every point misses at least three colors (via the circle), some point lies in
            at least three (the sphere is not contractible) — are the proof outline of the corollary (argued); the
            countries picture is an analogy (argued); 6 ≤ k for every open orthogonality-free cover
            ..... SphereOrthogonalityCover.sphere_two_open_orthogonality_free_cover_lower_six (LEAN); "exactly six" is
            the two Lean results put together.
     edge   other axes also cover (s = 30°: worst squared overlap (1 + sin 60°)/3 ≈ 0.622 > 1/2, computed); the
            statements are about orthogonality-free open covers, not smooth frames or the hairy ball (chapter 10);
            the six-axis construction gives the upper-bound half of Question 3 of Feldman & Wilce, arXiv:2608.13320v1,
            with classical antecedents in antipodal coverings (provenance, as the Lean module states).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen; any
   disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const SX_LEAN = {
  rational_six_axis_open_cover: 'D5/S3/Geometry/Orthogonality/RationalSixAxisCover.rational_six_axis_open_cover',
  sphere_two_open_orthogonality_free_cover_lower_six: 'D5/S3/Topology/SphereOrthogonalityCover.sphere_two_open_orthogonality_free_cover_lower_six'
};
const sxDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sxUnit = a => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; };
const sxSph = (t, f) => [Math.sin(t) * Math.cos(f), Math.sin(t) * Math.sin(f), Math.cos(t)];
const sxDeg = d => d * Math.PI / 180;
/* the whole-number axes of the Lean module, in its order, and the coordinate axes */
const SX_INT = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]];
const SX_E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const SX_S = Math.atan(2);
/* the six unit axes: each coordinate axis split into two at angle s from it (s = arctan 2: the Lean axes / √5) */
function sxAxes(s) {
  const c = Math.cos(s), n = Math.sin(s);
  return [[c, n, 0], [c, -n, 0], [0, c, n], [0, c, -n], [n, 0, c], [-n, 0, c]];
}
/* the largest squared overlap of x with the axes (x is in some color iff this exceeds 1/2) */
const sxScore = (x, ax) => ax.reduce((m, a) => Math.max(m, sxDot(x, a) * sxDot(x, a)), 0);
const SX_D = sxUnit([1, 1, 1]);
const SX_X = [Math.sqrt(6) / 4, Math.sqrt(6) / 4, 0.5];
/* the scene-1 points: two in the north cap, one in the south cap */
const SX_P = sxSph(sxDeg(22), sxDeg(-40)), SX_Qp = sxSph(sxDeg(36), sxDeg(-150)), SX_R = sxSph(sxDeg(148), sxDeg(-70));
const sxAng = (p, q) => Math.acos(Math.max(-1, Math.min(1, sxDot(p, q)))) * 180 / Math.PI;
/* a Fibonacci grid of the sphere (quadrature for the uncovered share) */
const SX_GRID = (() => {
  const M = 20000, g = Math.PI * (3 - Math.sqrt(5)), pts = [];
  for (let k = 0; k < M; k++) { const z = 1 - 2 * (k + 0.5) / M, r = Math.sqrt(1 - z * z); pts.push([r * Math.cos(g * k), r * Math.sin(g * k), z]); }
  return pts;
})();
const sxUncovered = ax => SX_GRID.reduce((n, p) => n + (sxScore(p, ax) <= 0.5 ? 1 : 0), 0) / SX_GRID.length;
/* the exact uncovered share of the three coordinate axes: six tangent caps, each (1 − cos 45°)/2 of the sphere */
const SX_U3 = 3 / Math.SQRT2 - 2;
/* the uncovered share of sxAxes(s) on a midpoint (z, φ) grid of one octant (area-uniform in z), every 0.5° */
function sxOctant(ax, N = 260) {
  let u = 0;
  for (let i = 0; i < N; i++) {
    const z = (i + 0.5) / N, r = Math.sqrt(1 - z * z);
    for (let j = 0; j < N; j++) { const f = (j + 0.5) / N * Math.PI / 2; if (sxScore([r * Math.cos(f), r * Math.sin(f), z], ax) <= 0.5) u++; }
  }
  return u / (N * N);
}
const SX_UTAB = Array.from({ length: Math.floor(64 / 0.5) + 1 }, (_, k) => sxOctant(sxAxes(sxDeg(k * 0.5))));
const sxUncoveredAt = s => {
  if (s <= 1e-9) return SX_U3;
  const x = s * 180 / Math.PI / 0.5, k = Math.min(SX_UTAB.length - 2, Math.floor(x));
  return lerp(SX_UTAB[k], SX_UTAB[k + 1], x - k);
};
/* the circle at right angles to x: arcs of the colors 1, 3, 5 (degrees of the angle t round the circle) */
const SX_CF = (() => {
  const e = sxUnit([1, -1, 0]), x = SX_X;
  const f = [x[1] * e[2] - x[2] * e[1], x[2] * e[0] - x[0] * e[2], x[0] * e[1] - x[1] * e[0]];
  return { e, f, at: t => [Math.cos(t) * e[0] + Math.sin(t) * f[0], Math.cos(t) * e[1] + Math.sin(t) * f[1], Math.cos(t) * e[2] + Math.sin(t) * f[2]] };
})();
const sxIn = (y, i) => 5 < 2 * Math.pow(sxDot(y, SX_INT[i]), 2);
const SX_ARCS = (() => {   // per color, the list of [start, end] in degrees (0…360) where the circle is inside it
  const N = 3600, arcs = [[], [], [], [], [], []];
  for (let i = 0; i < 6; i++) {
    let open = null;
    for (let k = 0; k <= N; k++) {
      const t = 360 * k / N, inside = k < N && sxIn(SX_CF.at(sxDeg(t)), i);
      if (inside && open === null) open = t;
      if (!inside && open !== null) { arcs[i].push([open, t]); open = null; }
    }
  }
  return arcs;
})();
/* the degree marks where exactly one of 1, 3, 5 covers the circle (the middle of each solo stretch) */
const SX_SOLO = (() => {
  const N = 3600, out = {};
  for (const i of [1, 3, 5]) {
    let best = null, run = 0, start = 0;
    for (let k = 0; k <= N; k++) {
      const y = SX_CF.at(sxDeg(360 * k / N));
      const solo = k < N && sxIn(y, i) && [1, 3, 5].filter(j => j !== i).every(j => !sxIn(y, j));
      if (solo) { if (!run) start = k; run++; } else if (run) { if (!best || run > best[1]) best = [start, run]; run = 0; }
    }
    out[i] = best ? 360 * (best[0] + best[1] / 2) / N : null;
  }
  return out;
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('six-axes film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit, and the shared model */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(SX_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(SX_LEAN).length}`);
  for (const [short, gid] of Object.entries(SX_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  check(typeof QG_SPHERE === 'object' && typeof QG_SPHERE.ball === 'function', 'QG_SPHERE (viz/two-angle-addressing/model.js) is missing');

  /* 1. CAPS: one color is the set (x·a)² > 1/2; the angles of the three points */
  check(near(Math.cos(sxDeg(45)) ** 2, 0.5), 'a 45° cap is (x·a)² > 1/2');
  const pq = sxAng(SX_P, SX_Qp), pr = sxAng(SX_P, SX_R);
  check(pq < 90 && pr > 90, 'one cap: under 90°, across the caps: over 90°');
  check(pq.toFixed(1) === '47.6' && pr.toFixed(1) === '127.9', `the angles on screen ${pq.toFixed(1)} ${pr.toFixed(1)}`);
  for (let k = 0; k < 400; k++) {   // within one cap: < 90°; across the two caps: > 90° (the reason: |x·a|, |y·a| > 1/√2)
    const p = sxSph(sxDeg(45) * Math.sqrt(rnd(k, 1)), TAU * rnd(k, 2)), q = sxSph(sxDeg(45) * Math.sqrt(rnd(k, 3)), TAU * rnd(k, 4));
    const qs = [-q[0], -q[1], -q[2]];
    check(sxDot(p, q) > 0 && sxDot(p, qs) < 0, `cap angles ${k}`);
  }

  /* 2. THREE: the diagonal, and the uncovered share */
  SX_E.forEach((e, j) => check(near(sxDot(SX_D, e) ** 2, 1 / 3), `(d·e${j})² = 1/3`));
  check(near(Math.acos(1 / Math.sqrt(3)) * 180 / Math.PI, 54.735610317245346, 1e-9), 'the diagonal is 54.7° from each axis');
  check(near(SX_U3, 1 - 6 * (1 - Math.cos(sxDeg(45))) / 2) && (100 * SX_U3).toFixed(1) === '12.1', 'three axes: 3/√2 − 2 = 12.1 %');
  check(sxDot(SX_E[0], SX_E[1]) === 0 && near(Math.acos(0), 2 * sxDeg(45)), 'the caps of the coordinate axes are tangent (90° = 45° + 45°)');
  check(Math.abs(SX_UTAB[0] - SX_U3) < 0.002 && Math.abs(sxUncovered(SX_E) - SX_U3) < 0.002, `octant grid ${SX_UTAB[0]} and sphere grid agree with 3/√2 − 2`);
  /* each of the eight diagonals is uncovered */
  for (let k = 0; k < 8; k++) { const d = sxUnit([k & 1 ? -1 : 1, k & 2 ? -1 : 1, k & 4 ? -1 : 1]); check(sxScore(d, SX_E) <= 0.5 + 1e-12, `diagonal ${k} uncovered`); }

  /* 3. SIX: the split axes at arctan 2 are the Lean axes; the diagonal; the whole sphere */
  sxAxes(SX_S).forEach((a, i) => { const b = sxUnit(SX_INT[i]); check(near(a[0], b[0]) && near(a[1], b[1]) && near(a[2], b[2]), `split axis ${i} = a${i}/√5`); });
  SX_INT.forEach((a, i) => check(sxDot(a, a) === 5, `|a${i}|² = 5`));
  check(near(sxDot(SX_D, SX_INT[0]) ** 2, 3) && near(sxDot(SX_D, SX_INT[0]) ** 2 / 5, 0.6) && 2 * 3 > 5, 'diagonal: 3, 3/5, 6 > 5');
  check(near(sxScore(SX_D, sxAxes(SX_S)), 0.6), 'the diagonal scores 3/5 against the six axes');
  check(Math.atan(2) * 180 / Math.PI > 63.43 && Math.atan(2) * 180 / Math.PI < 63.44, 'arctan 2 = 63.4°');
  let worst = Infinity;
  for (const p of SX_GRID) worst = Math.min(worst, sxScore(p, sxAxes(SX_S)));
  check(worst >= 0.6 - 1e-12 && worst < 0.605, `worst point of the six-axis cover ${worst}`);
  for (const p of SX_GRID) { const m = [0, 1, 2, 3, 4, 5].filter(i => sxIn(p, i)).length; if (m < 1 || m > 3) { fail(`multiplicity ${m}`); break; } }
  /* the holes: the diagonal is covered iff sin 2s > 1/2; at 15° and 45° there are zero-area gaps */
  check(near(sxScore(SX_D, sxAxes(sxDeg(15))), 0.5) && near(sxScore([1, 0, 0], sxAxes(sxDeg(45))), 0.5), 'gaps at exactly 15° and 45°');
  for (let d = 16; d <= 63; d += 1) if (d !== 45) check(sxUncovered(sxAxes(sxDeg(d))) === 0 && SX_UTAB[2 * d] === 0, `tilt ${d}° leaves no grid point uncovered`);
  for (let d = 0; d <= 14; d += 1) check(sxScore(SX_D, sxAxes(sxDeg(d))) < 0.5, `tilt ${d}° leaves the diagonal uncovered`);
  check(sxUncovered(sxAxes(sxDeg(5))) > 0 && sxUncovered(sxAxes(sxDeg(10))) > 0, 'small splits still leak');

  /* 4. FIVE: the point of the example and its circle */
  check(near(sxDot(SX_X, SX_X), 1), '|x| = 1');
  const two = SX_INT.map(a => 2 * sxDot(SX_X, a) ** 2);
  const show = ['6.750', '0.750', '5.199', '0.301', '5.949', '1.051'];
  two.forEach((v, i) => check(v.toFixed(3) === show[i], `2(x·a${i})² = ${v}`));
  check([0, 2, 4].every(i => sxIn(SX_X, i)) && [1, 3, 5].every(i => !sxIn(SX_X, i)), 'x is in 0, 2, 4 only');
  check(near(sxDot(SX_CF.e, SX_X), 0) && near(sxDot(SX_CF.f, SX_X), 0) && near(sxDot(SX_CF.f, SX_CF.f), 1), 'the circle frame');
  check([0, 2, 4].every(i => SX_ARCS[i].length === 0), 'the circle avoids 0, 2, 4');
  check([1, 3, 5].every(i => SX_ARCS[i].length > 0 && SX_SOLO[i] != null), 'each of 1, 3, 5 is alone somewhere on the circle');
  for (let k = 0; k < 3600; k++) { const y = SX_CF.at(TAU * k / 3600); if (![1, 3, 5].some(i => sxIn(y, i))) { fail(`circle point ${k} uncovered`); break; } }

  /* 5. EDGE: a 30° split also covers */
  let w30 = Infinity;
  for (const p of SX_GRID) w30 = Math.min(w30, sxScore(p, sxAxes(sxDeg(30))));
  check(w30 > 0.5 && near(sxScore(SX_D, sxAxes(sxDeg(30))), (1 + Math.sin(sxDeg(60))) / 3) && ((1 + Math.sin(sxDeg(60))) / 3).toFixed(3) === '0.622', `30° split ${w30}`);
});
Object.assign(FILM.speed, { caps: 0.02, three: 0.014, six: 0.016, five: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const sxFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function sxRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const SX_MISSING = new Set();
function sxLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!SX_MISSING.has(gid)) { SX_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view of the ball (z up) and a solid shot with the same camera */
function sxView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => { const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2]; return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se]; };
  Object.assign(V, { cx, cy, R, yaw, el });
  return V;
}
const sxShot = (key, V, r) => solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
const SX_UNPAINTED = mix(C.dim, C.bg, 0.45);
/* the painted ball: value 0 (painted, cyan) where the largest squared overlap with the axes exceeds 1/2, value 1
   (the second colour: unpainted grey, or magenta for a hole) where it does not; a thin ramp smooths the rim */
const SX_SHADE = [mix(C.cyan, C.bg, 0.5), mix(C.cyan, C.white, 0.35)];
/* covered points take one shade of cyan per color (the axis of largest overlap); holes take the colour `hole` */
function sxGlobeValue(x, ax) {
  let m = 0, k = 0;
  ax.forEach((a, i) => { const d = sxDot(x, a) * sxDot(x, a); if (d > m) { m = d; k = i; } });
  const shade = 0.5 * (ax.length > 1 ? k / (ax.length - 1) : 0), t = clamp(0.5 + (0.5 - m) / 0.035);
  return lerp(shade, 1, t);
}
function sxGlobe(sh, ax, hole, o = {}) {
  sh.surface('globe', (u, v) => sxSph(Math.PI * v, TAU * u), {
    u: [0, 1], v: [0, 1], nu: o.nu || 132, nv: o.nv || 66, colors: [SX_SHADE[0], SX_SHADE[1], hole], range: [0, 1],
    value: (u, v) => sxGlobeValue(sxSph(Math.PI * v, TAU * u), ax),
    grid: { every: [11, 11], color: C.white, alpha: 0.1 }, pick: false
  });
}
/* an axis through the ball, poking out at both ends */
function sxAxis(sh, a, col, al, len = 1.32, w = 3) {
  if (al <= 0.003) return;
  sh.line([[-a[0] * len, -a[1] * len, -a[2] * len], [a[0] * len, a[1] * len, a[2] * len]], { color: col, width: w, alpha: al });
}
/* a great-circle arc from p to q (both unit), drawn in the shot */
function sxArc(p, q, n = 48) {
  const w = Math.acos(Math.max(-1, Math.min(1, sxDot(p, q)))), s = Math.sin(w), pts = [];
  for (let i = 0; i <= n; i++) { const t = i / n, A = Math.sin((1 - t) * w) / s, B = Math.sin(t * w) / s; pts.push([1.012 * (A * p[0] + B * q[0]), 1.012 * (A * p[1] + B * q[1]), 1.012 * (A * p[2] + B * q[2])]); }
  return pts;
}
const sxScale = (p, k) => [p[0] * k, p[1] * k, p[2] * k];
/* a label at a 3D point of the shot, fainter when the ball hides it */
function sxTag(sh, p, s, dx, dy, col, a, o = {}) {
  const q = sh.anchor(p);
  if (q.hidden) return;
  txt(s, q.x + dx, q.y + dy, Object.assign({ size: 26, fam: F.math, w: 700, c: col, a }, o));
}
/* opening title */
function sxTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THREE PAIRS OF CAPS LEAK, SIX COVER', p, 5), W / 2, 580, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('CAPS · THREE · SIX · WHY NOT FIVE · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}
const SX_GV = { cx: 640, cy: 520, R: 265, el: 0.3 };
const SX_RECT = [240, 170, 800, 710];

/* ======================================================================= */
/*                               scene 1 · ICE CAPS                          */
/* ======================================================================= */
SCENES.caps = S => {
  const u = S.u;
  sxTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'blind spot', 'argued'], [3, 'How many', 'computed']]);
  const V = sxView(SX_GV.cx, SX_GV.cy, SX_GV.R, -0.75 + 0.012 * u, 0.22);
  /* the caps grow to 45° as the line says "Paint every point" */
  const grow = ease(Q(S, 0, 'Paint every point', 2.0));
  const capC = Math.cos(sxDeg(45) * grow), z = [0, 0, 1];
  const pa = Q(S, 2, 'Inside one cap', 0.6), ra = Q(S, 2, 'Across the caps', 0.6);
  const ea = Q(S, 3, 'right angle', 0.7);
  const sh = sxShot('globe', V, SX_RECT);
  sh.begin();
  sh.surface('globe', (uu, vv) => sxSph(Math.PI * vv, TAU * uu), {
    u: [0, 1], v: [0, 1], nu: 132, nv: 66, colors: [C.cyan, SX_UNPAINTED], range: [0, 1],
    value: (uu, vv) => (grow < 0.01 ? 1 : clamp(0.5 + (capC - Math.abs(Math.cos(Math.PI * vv))) / 0.025)),
    grid: { every: [11, 11], color: C.white, alpha: 0.1 }, pick: false
  });
  sxAxis(sh, z, C.vio, Q(S, 0, 'Push an axis', 0.8), 1.25, 4);
  if (pa > 0.01) {
    sh.bead(sxScale(SX_P, 1.012), { color: C.now, r: 9, alpha: pa });
    sh.bead(sxScale(SX_Qp, 1.012), { color: C.white, r: 9, alpha: pa });
    sh.line(sxArc(SX_P, SX_Qp), { color: C.white, width: 3, alpha: pa });
  }
  if (ra > 0.01) {
    sh.bead(sxScale(SX_R, 1.012), { color: C.white, r: 9, alpha: ra });
    sh.line(sxArc(SX_P, SX_R, 96), { color: C.white, width: 3, alpha: ra, dash: [10, 8] });
  }
  if (ea > 0.01) sh.line(Array.from({ length: 121 }, (_, i) => [1.012 * Math.cos(TAU * i / 120), 1.012 * Math.sin(TAU * i / 120), 0]), { color: C.white, width: 3, alpha: ea, dash: [12, 9] });
  sh.end(a);
  sxTag(sh, [0, 0, 1.25], '+a', 14, -6, C.vio, a * Q(S, 0, 'Push an axis', 0.8));
  sxTag(sh, [0, 0, -1.25], '−a', 14, 4, C.vio, a * Q(S, 0, 'Push an axis', 0.8));
  if (pa > 0.01) { sxTag(sh, SX_P, 'p', 14, -14, C.now, a * pa); sxTag(sh, SX_Qp, 'q', -34, -10, C.white, a * pa); }
  if (ra > 0.01) sxTag(sh, SX_R, 'r', -34, 30, C.white, a * ra);
  if (ea > 0.01) { const eq = sh.anchor([0, 0, 0]); txt('overlap 0 · 内积为 0', V.cx - V.R - 24, eq.y + 8, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.white, a: a * ea }); }

  /* right side: the rule of one color */
  const ca = a * Q(S, 0, 'forty-five degrees', 0.6);
  panel(1160, 200, 640, 210, ca, C.cyan, 'ONE COLOR · 一种颜色');
  sxRich([['(x·a)² > 1/2', C.cyan]], 1186, 275, { size: 34, a: ca });
  txt('within 45° of +a or −a · 离 ±a 不到 45°', 1186, 325, { size: 22, fam: F.zh, w: 700, c: C.white, a: ca });
  txt('two polar caps = one color · 两块冰盖算一种颜色', 1186, 375, { size: 22, fam: F.zh, w: 700, c: C.white, a: ca * Q(S, 1, 'one color', 0.6) });
  const ga = a * pa;
  if (ga > 0.003) {
    panel(1160, 440, 640, 210, ga, C.cyan, 'ANGLES · 夹角  (computed)');
    sxRich([['∠(p, q) = ', C.white], [`${sxAng(SX_P, SX_Qp).toFixed(1)}°`, C.cyan], ['  < 90°', C.white]], 1186, 515, { size: 32, a: ga });
    txt('same cap · 同一块冰盖', 1186, 552, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ga });
    sxRich([['∠(p, r) = ', C.white], [`${sxAng(SX_P, SX_R).toFixed(1)}°`, C.cyan], ['  > 90°', C.white]], 1186, 605, { size: 32, a: a * ra });
    txt('opposite caps · 分处两块', 1186, 638, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * ra });
  }
  if (ea > 0.01) {
    const qa = a * Q(S, 3, 'How many', 0.6);
    txt('90° · the blind spot of comparison · 比较的盲点', 1160, 712, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * ea });
    chip(1370, 785, 420, 66, 'how many colors ?', C.now, qa, 28, F.mono);
    txt('要几种颜色？', 1640, 795, { size: 28, fam: F.zh, w: 700, c: C.now, a: qa });
  }
};

/* ======================================================================= */
/*                              scene 2 · THREE LEAK                         */
/* ======================================================================= */
/* the walk of the amber point: from inside the e1 cap out to the diagonal (1, 1, 1)/√3 */
const sxWalk = k => { const p0 = sxUnit([1, 0.15, 0.25]); return sxUnit([lerp(p0[0], SX_D[0], k), lerp(p0[1], SX_D[1], k), lerp(p0[2], SX_D[2], k)]); };
SCENES.three = S => {
  const u = S.u, a = sxFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'The leak', 'argued']]);
  const V = sxView(SX_GV.cx, SX_GV.cy, SX_GV.R, -2.1 + 0.01 * u, SX_GV.el);
  const ha = ease(at(S, 0, 1.4));                                 // the holes turn magenta
  const wk = ease(Q(S, 1, 'Walk out', 2.6));
  const P = sxWalk(wk);
  const sh = sxShot('globe', V, SX_RECT);
  sh.begin();
  sxGlobe(sh, SX_E, mix(SX_UNPAINTED, C.mag, ha));
  SX_E.forEach(e => sxAxis(sh, e, C.vio, 1, 1.25, 3.5));
  const pa = Q(S, 1, 'diagonal', 0.5);
  if (pa > 0.01) {
    sh.line([sxScale(SX_D, 1.0), sxScale(SX_D, 1.3)], { color: C.white, width: 2, alpha: 0.6 * pa, dash: [8, 8] });
    sh.bead(sxScale(P, 1.015), { color: C.now, r: 11, alpha: pa });
  }
  sh.end(a);
  ['e₁', 'e₂', 'e₃'].forEach((s, j) => sxTag(sh, sxScale(SX_E[j], 1.27), s, 10, -8, C.vio, a));
  if (pa > 0.01) sxTag(sh, sxScale(SX_D, 1.32), '(1, 1, 1)/√3', 12, -4, C.white, a * pa, { size: 22, fam: F.mono });
  /* readout: the three squared overlaps of the amber point against the bar 1/2 */
  const ra = a * at(S, 1, 0.6);
  if (ra > 0.003) {
    panel(1140, 200, 660, 420, ra, C.cyan, 'SQUARED OVERLAP · 内积平方  (computed)');
    const x0 = 1260, x1 = 1740, base = 560, top = 300, sc = (base - top);
    const yHalf = base - 0.5 * sc;
    SX_E.forEach((e, j) => {
      const v = sxDot(P, e) ** 2, x = 1300 + j * 150, h = v * sc;
      fillBox(x - 34, base - h, 68, h, v > 0.5 ? C.cyan : C.mag, ra * 0.85);
      txt(['e₁', 'e₂', 'e₃'][j], x, base + 34, { size: 24, fam: F.math, w: 700, align: 'center', c: C.vio, a: ra });
      txt(v.toFixed(3), x, base - h - 12, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
    });
    ctx.save(); ctx.setLineDash([10, 8]); line(x0 - 50, yHalf, x1, yHalf, C.white, ra * 0.8, 2); ctx.restore();
    txt('1/2', x0 - 60, yHalf + 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra });
    const ka = a * Q(S, 2, 'one third', 0.6);
    sxRich([['at the diagonal · 对角线上:  ', C.white], ['1/3 < 1/2', C.mag]], 1166, 660, { size: 28, a: ka, fam: F.zh });
    txt('54.7° from every axis > 45° · 离每根轴都是 54.7°', 1166, 700, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ka });
  }
  const la = a * at(S, 3, 0.6);
  if (la > 0.003) {
    sxRich([['uncovered · 没盖住  ', C.white], ['3/√2 − 2', C.mag], [` ≈ ${(100 * SX_U3).toFixed(1)} %`, C.mag]], 1166, 760, { size: 28, a: la, fam: F.zh });
    txt('6 caps touch, never overlap · 六块冰盖只相切、不重叠', 1166, 800, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
    txt('holes round all 8 diagonals · 8 条对角线周围都漏', 1166, 836, { size: 22, fam: F.zh, w: 700, c: C.mag, a: la });
  }
  stamp('THE FRAME LEAKS', 1470, 888, Q(S, 3, 'The leak is', 0.5), C.mag, 34, -0.05);
};

/* ======================================================================= */
/*                               scene 3 · SIX COVER                         */
/* ======================================================================= */
SCENES.six = S => {
  const u = S.u, a = sxFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const V = sxView(SX_GV.cx, SX_GV.cy, SX_GV.R, -2.1 + 0.01 * (u + 25), SX_GV.el);
  /* the tilt of each half from its old axis: 0 → 20° on line 0 (the holes close), on to arctan 2 on line 1 */
  const s = sxDeg(20) * ease(Q(S, 0, 'swing the halves', 2.4)) + (SX_S - sxDeg(20)) * ease(Q(S, 1, 'We stop', 2.4));
  const ax = sxAxes(s), done = Q(S, 1, 'whole numbers', 0.6);
  const da = Q(S, 2, 'Back on the diagonal', 0.5);
  const sh = sxShot('globe', V, SX_RECT);
  sh.begin();
  sxGlobe(sh, ax, C.mag);
  ax.forEach(e => sxAxis(sh, e, C.vio, 1, 1.25, 3.5));
  const rk = 0.7071 * 1.006;   // the twelve cap rims: 45° round ±a
  ax.forEach(e => [1, -1].forEach(sg => sh.line(QG_SPHERE.circlePts(sxScale(e, sg * rk), sxScale(e, sg), rk, 72), { color: C.white, width: 1.5, alpha: 0.4 })));
  if (da > 0.01) {
    sh.line([sxScale(SX_D, 1.0), sxScale(SX_D, 1.3)], { color: C.white, width: 2, alpha: 0.6 * da, dash: [8, 8] });
    sh.bead(sxScale(SX_D, 1.015), { color: C.now, r: 11, alpha: da });
  }
  sh.end(a);
  ax.forEach((e, i) => sxTag(sh, sxScale(e, 1.27), `a${'₀₁₂₃₄₅'[i]}`, 8, -6, C.vio, a * (0.35 + 0.65 * done), { size: 22 }));
  /* readout */
  panel(1140, 200, 660, 250, a, C.cyan, 'SPLIT · 劈开  (computed)');
  sxRich([['tilt from the old axis · 偏角  s = ', C.white], [`${(s * 180 / Math.PI).toFixed(1)}°`, C.now]], 1166, 270, { size: 28, a, fam: F.zh });
  const unc = sxUncoveredAt(s);
  sxRich([['uncovered · 没盖住  ≈ ', C.white], [`${(100 * unc).toFixed(1)} %`, unc > 0 ? C.mag : C.cyan]], 1166, 320, { size: 28, a, fam: F.zh });
  const wa = a * done;
  if (wa > 0.003) {
    txt('tan s = 2: along 1, sideways 2 · 沿原轴 1、侧移 2', 1166, 370, { size: 22, fam: F.zh, fam: F.mono, w: 700, c: C.white, a: wa });
    txt('(1, ±2, 0)  (0, 1, ±2)  (±2, 0, 1)', 1166, 414, { size: 24, fam: F.mono, w: 700, c: C.vio, a: wa });
  }
  if (da > 0.01) {
    const qa = a * da;
    panel(1140, 470, 660, 170, qa, C.cyan, 'DIAGONAL · 对角线  d = (1, 1, 1)/√3');
    sxRich([['(d·(1, 2, 0))² = ', C.white], ['3', C.cyan]], 1166, 540, { size: 28, a: qa });
    sxRich([['3/5', C.cyan], [' > 1/2', C.white], ['   ⟺   2 · 3 = 6 > 5', C.white, 0.85]], 1166, 595, { size: 28, a: a * Q(S, 2, 'three fifths', 0.6) });
  }
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1140, 660, 660, 190, la, C.lean, 'SIX COLORS · 六种颜色');
    txt('open · 开集     no right angle inside · 内部无直角', 1166, 712, { size: 21, fam: F.zh, w: 700, c: C.white, a: la * Q(S, 3, 'six open colors', 0.5) });
    txt('together they cover the sphere · 合起来盖满球面', 1166, 752, { size: 21, fam: F.zh, w: 700, c: C.white, a: la * Q(S, 3, 'cover the sphere', 0.5) });
    sxLean(1166, 806, SX_LEAN.rational_six_axis_open_cover, la, { size: 21 });
  }
  stamp('COVERED', 1470, 888, Q(S, 3, 'cover the sphere', 0.5), C.lean, 34, -0.05);
};

/* ======================================================================= */
/*                              scene 4 · WHY NOT FIVE                       */
/* ======================================================================= */
const SX_FV = { cx: 500, cy: 520, R: 270, yaw: -0.25, el: 0.42 };
const SX_RIB = { x0: 1060, x1: 1780, y0: 300, rh: 46 };
SCENES.five = S => {
  const u = S.u, a = sxFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued'], [4, 'Lean checks', 'lean']]);
  const V = sxView(SX_FV.cx, SX_FV.cy, SX_FV.R, SX_FV.yaw + 0.03 * u, SX_FV.el);
  const ca = Q(S, 0, 'The circle', 0.8);
  /* the amber cursor that sweeps the circle (line 1) */
  const sweep = 360 * ease(clamp((u - phraseAt(S, 1, 'Its circle')) / 3.2));
  const sh = sxShot('circle', V, [140, 170, 720, 700]);
  sh.begin();
  QG_SPHERE.ball(sh, { glass: C.cyan, ink: C.blue, width: 1.4, alpha: 0.45, back: 0.35, shell: { alpha: 0.07, rim: 0.5 } });
  sh.bead(SX_X, { color: C.now, r: 12 });
  sh.line([[0, 0, 0], sxScale(SX_X, 1.3)], { color: C.now, width: 2.5, alpha: 0.7, dash: [8, 7] });
  if (ca > 0.01) {
    const pts = Array.from({ length: 181 }, (_, i) => SX_CF.at(TAU * i / 180));
    QG_SPHERE.seg(sh, pts, { color: C.white, width: 4, alpha: ca, back: 0.4 });
    if (sweep > 0.5 && sweep < 359.5) sh.bead(SX_CF.at(sxDeg(sweep)), { color: C.now, r: 8 });
  }
  sh.end(a);
  sxTag(sh, sxScale(SX_X, 1.3), 'x', 12, -10, C.now, a, { size: 30 });
  const la1 = a * at(S, 1, 0.6);
  if (la1 > 0.003) for (const i of [1, 3, 5]) {
    const t = SX_SOLO[i];
    if (t == null || sweep < t) continue;
    sxTag(sh, sxScale(SX_CF.at(sxDeg(t)), 1.1), String(i), -8, 10, C.white, la1, { size: 30, fam: F.mono });
  }
  if (Q(S, 0, 'The circle', 0.6) > 0) txt('the circle at 90° to x · 与 x 成直角的圆', 160, 860 - 40, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * ca * (1 - at(S, 3, 0.5)) });

  /* right side, lines 0–2: the circle unrolled, one row per color */
  const ra = a * at(S, 0, 0.8) * (1 - at(S, 3, 0.5));
  if (ra > 0.003) {
    const { x0, x1, y0, rh } = SX_RIB, sc = (x1 - x0) / 360;
    panel(990, 190, 830, 470, ra, C.cyan, 'THE CIRCLE, UNROLLED · 把直角圈拉直  (computed)');
    for (let i = 0; i < 6; i++) {
      const y = y0 + i * rh, holds = [0, 2, 4].includes(i);
      txt(String(i), x0 - 30, y + 30, { size: 26, fam: F.mono, w: 700, align: 'center', c: holds ? C.cyan : C.white, a: ra });
      line(x0, y + 22, x1, y + 22, C.dim, ra * 0.4, 1);
      for (const [p, q] of SX_ARCS[i]) {
        const e = Math.min(q, sweep);
        if (e > p) fillBox(x0 + p * sc, y + 8, (e - p) * sc, 28, C.white, ra * 0.85 * at(S, 1, 0.6));
      }
      if (holds) txt('holds x · 含 x → stays off · 不能碰', x1 - 4, y + 30, { size: 21, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ra * Q(S, 1, 'zero, two and four', 0.6) });
    }
    if (sweep > 0.5 && sweep < 359.5) line(x0 + sweep * sc, y0, x0 + sweep * sc, y0 + 6 * rh, C.now, ra, 2.5);
    txt('x: 2(x·aᵢ)² = 6.750, 0.750, 5.199, 0.301, 5.949, 1.051', 1016, 610, { size: 23, fam: F.mono, w: 700, c: C.white, a: ra * at(S, 1, 0.6) });
    const ta = ra * at(S, 2, 0.6);
    txt('1, 3, 5 each stand alone somewhere · 1、3、5 各有独占的一段', 1016, 645, { size: 23, fam: F.zh, w: 700, c: C.white, a: ta });
  }
  const pa = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  if (pa > 0.003) {
    panel(990, 690, 830, 140, pa, C.argued, 'PROOF OUTLINE · 证明骨架');
    txt('a circle needs 3 right-angle-free colors → each point misses ≥ 3', 1016, 752, { size: 19, fam: F.mono, w: 700, c: C.white, a: pa });
    txt('无直角的颜色，一个圆也要三种 → 每点至少缺三种', 1016, 796, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
  }
  /* line 3: the countries picture */
  const ka = a * at(S, 3, 0.6) * (1 - at(S, 4, 0.5));
  if (ka > 0.003) {
    panel(990, 190, 830, 470, ka, C.argued, 'A PICTURE, NOT THE PROOF · 比方，不是证明');
    const cx = 1405, cy = 425, R = 170;
    ring(cx, cy, R, C.white, ka * 0.6, 2);
    const blobs = [[-55, -30, 95], [60, -35, 100], [0, 60, 100]];
    blobs.forEach(([dx, dy, r]) => {
      ctx.save(); ctx.globalAlpha = ka * 0.22; ctx.fillStyle = C.argued; ctx.beginPath(); ctx.arc(cx + dx, cy + dy, r, 0, TAU); ctx.fill(); ctx.restore();
      ring(cx + dx, cy + dy, r, C.argued, ka * 0.9, 2.5);
    });
    const ta = ka * Q(S, 3, 'three overlap', 0.6);
    dot(cx + 2, cy - 4, 12, 'g', ta);
    txt('three at once · 三国重叠', cx + 24, cy - 14, { size: 22, fam: F.zh, w: 700, c: C.now, a: ta });
    txt('pieces too small to wrap the globe · 每块都绕不了球一圈', 1016, 630, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ka });
  }
  /* line 4: the tally and the theorem */
  const ta = a * at(S, 4, 0.6);
  if (ta > 0.003) {
    panel(990, 190, 830, 300, ta, C.argued, 'THE COUNT · 清点');
    sxRich([['somewhere: ≥ 3 present · 某处至少三种在', C.white]], 1016, 262, { size: 24, a: ta, fam: F.zh });
    sxRich([['everywhere: ≥ 3 missing · 处处至少缺三种', C.white]], 1016, 312, { size: 24, a: ta * Q(S, 4, 'three missing', 0.5), fam: F.zh });
    sxRich([['k ≥ 3 + 3 = ', C.white], ['6', C.now]], 1016, 386, { size: 40, a: ta * Q(S, 4, 'six', 0.5) });
    txt('at x here: 3 present, 3 missing · 这里的 x：恰三种在、三种缺', 1016, 444, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ta * Q(S, 4, 'six', 0.5) });
    const la = a * Q(S, 4, 'Lean checks', 0.6);
    panel(990, 520, 830, 230, la, C.lean, 'EVERY OPEN COVER OF THE SPHERE · 球面的任意开覆盖');
    sxRich([['no right angle in any piece  ⟹  ', C.white], ['6 ≤ k', C.lean]], 1016, 590, { size: 28, a: la });
    sxLean(1016, 640, SX_LEAN.sphere_two_open_orthogonality_free_cover_lower_six, la, { size: 19 });
    txt('with the six axes: fewest is exactly 6 · 与六轴合起来：最少恰为 6', 1016, 700, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
    txt('two Lean results combined · 两条 Lean 结论合起来', 1016, 734, { size: 19, fam: F.zh, w: 700, c: C.dim, a: la });
  }
  stamp('6 ≤ k', 500, 820, Q(S, 4, 'at least six', 0.5), C.lean, 36, -0.05);
};

/* ======================================================================= */
/*                         scene 5 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = sxFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'fewest ≠ only', zh: '最少，不等于唯一', note: 'a 30° tilt also covers: worst 0.622 > 1/2 (computed) · 偏角 30° 也盖得满' },
    { k: 1, col: C.argued, en: 'right-angle-free patches ≠ hairy ball', zh: '无直角的开块，不是毛球定理', note: 'smooth frames and the hairy ball: chapter 10 · 见第十章' },
    { k: 2, col: C.argued, en: 'Feldman & Wilce, Question 3 · upper bound', zh: '问题 3 的上界部分，对跖覆盖早有先例', note: 'arXiv:2608.13320 · source note, no claim of discovery · 出处说明，本书不主张发现权' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 210 + i * 210;
    panel(300, y, 1320, 180, ra, rw.col);
    txt(rw.en, 340, y + 58, { size: 32, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 340, y + 106, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 340, y + 150, { size: 24, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 6 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.end - 1.0;
  background(t, sc, 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const V = sxView(560, 540, 300, -2.1 + 0.01 * 40, SX_GV.el), ax = sxAxes(SX_S);
  const sh = sxShot('globe', V, [180, 160, 760, 760]);
  sh.begin();
  sxGlobe(sh, ax, C.mag);
  ax.forEach(e => sxAxis(sh, e, C.vio, 1, 1.25, 4));
  ax.forEach(e => [1, -1].forEach(sg => sh.line(QG_SPHERE.circlePts(sxScale(e, sg * 0.7114), sxScale(e, sg), 0.7114, 72), { color: C.white, width: 1.5, alpha: 0.4 })));
  sh.end(1);
  txt(DATA.film.title_zh, 1340, 430, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THREE PAIRS OF CAPS LEAK,', 1340, 528, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 4 });
  txt('SIX COVER', 1340, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  sxRich([['fewest = ', C.white], ['6', C.now]], 1340, 690, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
