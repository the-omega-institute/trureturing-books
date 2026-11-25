/* Film · One step or two, one tiny cell · 一步与两步，同一枚小弧面体
   (book quantum-geometry, chapter 29, §29.5). Scenes for theme/film/engine.js.

   The cell of §29.5: on the unit sphere, B = e2, A(ε) = sin ε e1 + cos ε e2, C(ε) = sin ε e3 + cos ε e2. With the
   centre O the three rays and three flat walls OBA, OBC, OAC close into a solid capped by the spherical triangle ABC.

   What each scene shows, and where it rests:
     hook    one step A → C along the great arc, two steps A → B → C along the walls (ε = 45°, exact geometry).
     cell    the solid cell; seen straight down OB, B falls on O and only the arc AC is left; the walls show the two
             steps and the right angle at B. "Two shadows of one cell" is the book's MODEL (argued).
     count   ε = 45°: A·B = B·C = cos ε = 0.707, A·C = cos²ε = 0.500 = 0.707² (the right angle at B), the oriented
             volume A·(B×C) = sin²ε = 0.500, six times the violet tetrahedron OABC (computed); the three dot
             products fix its size (Gram determinant), not its sign (a mirror keeps them and flips it).
     trace   Tr(P(A)P(B)P(C)) = (1 + A·B + B·C + C·A)/4 + i A·(B×C)/4 for any real vectors
             ..... C129QubitBargmann.triple_bargmann_bloch (LEAN); here (1 + cos ε)²/4 + i sin²ε/4 = 0.729 + 0.125 i
             (computed); writing P(A) = |A⟩⟨A| for the spinor of A is a hand step (computed); for spinors the
             trace of the ket-bra chain is ⟨A|B⟩⟨B|C⟩⟨C|A⟩ ..... BargmannImaginaryMaximizers.bargmann_path_product
             (LEAN); sizes 0.924 · 0.924 · 0.866 = 0.739 =
             |0.729 + 0.125 i| (computed).
     angle   arg Tr = atan(sin²ε/(1 + cos ε)²) = atan(tan²(ε/2)) = Ω/2, where Ω = α + β + γ − π is the angle excess
             of the cap (Girard's theorem: literature, argued; the half-angle match is algebra, computed):
             ε = 45°: 9.74°, Ω = 19.47°; ε = 90°: Tr = (1 + i)/4, 45°, Ω = 90°; ε = 15°: 0.99°, Ω = 1.99°.
             "Flatness is curvature measured with too coarse a ruler" is a maxim (argued).
     edge    what Lean checks, what is literature, what is computed, what is the book's model.

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route (2×2 complex matrices for the trace, spinors for the overlaps, the spherical right-triangle
   angles for the excess). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const MT_LEAN = {
  triple_bargmann_bloch: 'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  bargmann_path_product: 'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product'
};
const DEG = Math.PI / 180;
const v3 = {
  add: (p, q) => [p[0] + q[0], p[1] + q[1], p[2] + q[2]],
  sub: (p, q) => [p[0] - q[0], p[1] - q[1], p[2] - q[2]],
  sc: (p, k) => [p[0] * k, p[1] * k, p[2] * k],
  dot: (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2],
  cross: (p, q) => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]],
  len: p => Math.hypot(p[0], p[1], p[2]),
  unit: p => { const l = Math.hypot(p[0], p[1], p[2]); return [p[0] / l, p[1] / l, p[2] / l]; },
  lerp: (p, q, k) => [p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k, p[2] + (q[2] - p[2]) * k]
};
const MT_O = [0, 0, 0];
/* the three rays of the cell at step e (radians) */
function mtCell(e) {
  const s = Math.sin(e), c = Math.cos(e);
  return { A: [s, c, 0], B: [0, 1, 0], C: [0, c, s] };
}
/* the great arc from p to q (unit vectors, less than half a turn apart) */
const mtArc = (p, q, n = 40) => { const out = []; for (let i = 0; i <= n; i++) out.push(v3.unit(v3.lerp(p, q, i / n))); return out; };
/* the trace in closed form: (1 + cos e)²/4 + i sin²e/4 */
const mtTrace = e => [Math.pow(1 + Math.cos(e), 2) / 4, Math.pow(Math.sin(e), 2) / 4];
/* the angle excess of the cap: 2 atan(tan²(e/2)) (§29.5.2) */
const mtExcess = e => 2 * Math.atan(Math.pow(Math.tan(e / 2), 2));
/* a base angle of the cap, atan2(1, cos e) (Napier; continuous up to e = 90°) */
const mtBase = e => Math.atan2(1, Math.cos(e));
const mtArg = e => { const t = mtTrace(e); return Math.atan2(t[1], t[0]); };
/* sizes of the spinor overlaps: |⟨a|b⟩| = √((1 + a·b)/2) */
const mtOv = (p, q) => Math.sqrt((1 + v3.dot(p, q)) / 2);
const E45 = 45 * DEG, E90 = 90 * DEG, E15 = 15 * DEG;

/* complex numbers [re, im] and 2×2 complex matrices [m00, m01, m10, m11] (the checks only) */
const cx = {
  add: (p, q) => [p[0] + q[0], p[1] + q[1]],
  mul: (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]],
  conj: p => [p[0], -p[1]],
  abs: p => Math.hypot(p[0], p[1])
};
const cm = {
  mul: (A, B) => [0, 1, 2, 3].map(q => { const i = q >> 1, j = q & 1; return cx.add(cx.mul(A[2 * i], B[j]), cx.mul(A[2 * i + 1], B[2 + j])); }),
  tr: A => cx.add(A[0], A[3]),
  /* the projector (I + r·σ)/2 written as Lean's qubitProjector: [[1 + z, x − iy], [x + iy, 1 − z]] / 2 */
  proj: r => [[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2], [r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]],
  /* |ψ⟩⟨ψ| for a spinor ψ = [ψ0, ψ1] */
  ket: v => [cx.mul(v[0], cx.conj(v[0])), cx.mul(v[0], cx.conj(v[1])), cx.mul(v[1], cx.conj(v[0])), cx.mul(v[1], cx.conj(v[1]))]
};
/* the spinor of a unit Bloch vector: (cos θ/2, e^{iφ} sin θ/2) */
function mtSpinor(r) {
  const th = Math.acos(Math.max(-1, Math.min(1, r[2]))), ph = Math.atan2(r[1], r[0]);
  return [[Math.cos(th / 2), 0], [Math.cos(ph) * Math.sin(th / 2), Math.sin(ph) * Math.sin(th / 2)]];
}
const mtInner = (u, v) => cx.add(cx.mul(cx.conj(u[0]), v[0]), cx.mul(cx.conj(u[1]), v[1]));

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('trihedron film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(MT_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(MT_LEAN).length}`);
  for (const [short, gid] of Object.entries(MT_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the trace identity against 2×2 complex matrices, for arbitrary real vectors (not only unit ones) */
  const rv = (k, j) => [4 * rnd(k, j) - 2, 4 * rnd(k, j + 1) - 2, 4 * rnd(k, j + 2) - 2];
  for (let k = 0; k < 40; k++) {
    const a = rv(k, 0), b = rv(k, 3), c = rv(k, 6);
    const T = cm.tr(cm.mul(cm.mul(cm.proj(a), cm.proj(b)), cm.proj(c)));
    const re = (1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a)) / 4, im = v3.dot(a, v3.cross(b, c)) / 4;
    check(near(T[0], re, 1e-10) && near(T[1], im, 1e-10), `triple trace identity ${k}`);
  }
  /* 2. the path product against spinors: Tr(|a⟩⟨a| |b⟩⟨b| |c⟩⟨c|) = ⟨a|b⟩⟨b|c⟩⟨c|a⟩, unnormalized too */
  for (let k = 0; k < 40; k++) {
    const sp = j => [[2 * rnd(k, j) - 1, 2 * rnd(k, j + 1) - 1], [2 * rnd(k, j + 2) - 1, 2 * rnd(k, j + 3) - 1]];
    const a = sp(20), b = sp(24), c = sp(28);
    const T = cm.tr(cm.mul(cm.mul(cm.ket(a), cm.ket(b)), cm.ket(c)));
    const P = cx.mul(cx.mul(mtInner(a, b), mtInner(b, c)), mtInner(c, a));
    check(near(T[0], P[0], 1e-10) && near(T[1], P[1], 1e-10), `path product ${k}`);
  }
  /* 3. the cell: dot products, volume, trace, spinors, excess, for many steps */
  for (let i = 1; i <= 90; i++) {
    const e = i * DEG, { A, B, C } = mtCell(e);
    check(near(v3.len(A), 1) && near(v3.len(C), 1), `unit rays at ${i}°`);
    check(near(v3.dot(A, B), Math.cos(e)) && near(v3.dot(B, C), Math.cos(e)) && near(v3.dot(A, C), Math.cos(e) * Math.cos(e)), `dot products at ${i}°`);
    check(near(v3.dot(A, v3.cross(B, C)), Math.pow(Math.sin(e), 2)), `volume at ${i}°`);
    /* the right angle at B: the tangents towards A and C are perpendicular */
    const tA = v3.sub(A, v3.sc(B, v3.dot(A, B))), tC = v3.sub(C, v3.sc(B, v3.dot(C, B)));
    check(near(v3.dot(tA, tC), 0), `right angle at B at ${i}°`);
    const T = cm.tr(cm.mul(cm.mul(cm.proj(A), cm.proj(B)), cm.proj(C))), t = mtTrace(e);
    check(near(T[0], t[0]) && near(T[1], t[1]), `closed-form trace at ${i}°`);
    const sA = mtSpinor(A), sB = mtSpinor(B), sC = mtSpinor(C);
    const P = cx.mul(cx.mul(mtInner(sA, sB), mtInner(sB, sC)), mtInner(sC, sA));
    check(near(P[0], t[0], 1e-10) && near(P[1], t[1], 1e-10), `spinor loop at ${i}°`);
    check(near(cx.abs(mtInner(sA, sB)), mtOv(A, B), 1e-10) && near(cx.abs(mtInner(sC, sA)), mtOv(C, A), 1e-10), `overlap sizes at ${i}°`);
    /* Girard: α + β + γ − π with β = 90° and α = γ = atan2(1, cos e) (spherical right triangle) */
    const girard = 2 * mtBase(e) + Math.PI / 2 - Math.PI;
    check(near(girard, mtExcess(e), 1e-12), `excess at ${i}°`);
    check(near(mtArg(e), mtExcess(e) / 2, 1e-12), `angle of the trace is half the excess at ${i}°`);
  }
  /* the base angle against a direct measurement: the angle at A between the arcs towards B and towards C */
  for (const d of [15, 45, 75]) {
    const { A, B, C } = mtCell(d * DEG), tg = q => v3.unit(v3.sub(q, v3.sc(A, v3.dot(q, A))));
    check(near(Math.acos(v3.dot(tg(B), tg(C))), mtBase(d * DEG), 1e-12), `measured base angle at ${d}°`);
  }
  /* 4. the readouts on screen */
  const f3 = x => x.toFixed(3), f2 = x => x.toFixed(2);
  check(f3(Math.cos(E45)) === '0.707' && f3(Math.cos(E45) ** 2) === '0.500' && f3(Math.sin(E45) ** 2) === '0.500', 'count readouts');
  /* the three dot products fix the size of the volume (Gram determinant), not its sign: mirror C fixes the dots */
  for (let i = 1; i <= 90; i++) {
    const { A, B, C } = mtCell(i * DEG), ab = v3.dot(A, B), bc = v3.dot(B, C), ca = v3.dot(C, A);
    const g = 1 + 2 * ab * bc * ca - ab * ab - bc * bc - ca * ca, vol = v3.dot(A, v3.cross(B, C));
    check(near(g, vol * vol, 1e-12), `Gram determinant = volume² at ${i}°`);
    const Cm = [C[0], C[1], -C[2]], Am = [A[0], A[1], -A[2]];
    check(near(v3.dot(Am, B), ab) && near(v3.dot(B, Cm), bc) && near(v3.dot(Cm, Am), ca) && near(v3.dot(Am, v3.cross(B, Cm)), -vol), `mirror keeps the dots, flips the sign at ${i}°`);
  }
  const t45 = mtTrace(E45), t90 = mtTrace(E90), t15 = mtTrace(E15);
  check(f3(t45[0]) === '0.729' && f3(t45[1]) === '0.125', 'trace at 45°');
  check(near(t90[0], 0.25) && near(t90[1], 0.25), 'trace at 90° is (1 + i)/4');
  check(f3(mtOv(mtCell(E45).A, mtCell(E45).B)) === '0.924' && f3(mtOv(mtCell(E45).C, mtCell(E45).A)) === '0.866', 'overlap sizes at 45°');
  check(f3(mtOv(mtCell(E45).A, mtCell(E45).B) ** 2 * mtOv(mtCell(E45).C, mtCell(E45).A)) === '0.739' && f3(cx.abs(t45)) === '0.739', '|trace| at 45°');
  check(f2(mtArg(E45) / DEG) === '9.74' && f2(mtExcess(E45) / DEG) === '19.47' && f2(mtBase(E45) / DEG) === '54.74', 'angles at 45°');
  check(near(Math.sin(mtExcess(E45)), 1 / 3, 1e-12), 'excess at 45° is arcsin(1/3)');
  check(near(mtArg(E90), Math.PI / 4) && near(mtExcess(E90), Math.PI / 2) && near(mtBase(E90), Math.PI / 2), 'angles at 90°');
  check(f2(mtArg(E15) / DEG) === '0.99' && f2(mtExcess(E15) / DEG) === '1.99', 'angles at 15°');
  /* "fades like the square of the step": excess / ε² → 1/2 */
  check(near(mtExcess(1e-3) / 1e-6, 0.5, 1e-6), 'excess ~ ε²/2');
});
Object.assign(FILM.speed, { hook: 0.02, cell: 0.014, count: 0.014, trace: 0.016, angle: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const mtFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function mtRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx0 = x;
  if (o.align === 'center') cx0 = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx0, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx0 += tw(s, size, fam, w); }
  return cx0;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const MT_MISSING = new Set();
function mtLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!MT_MISSING.has(gid)) { MT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view (same camera as a solid shot): world (x, y, z), z up → [screen x, screen y, depth] */
function mtView(cx0, cy0, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const D = [-sw * ce, -cw * ce, se];
  const V = p => [cx0 + R * (p[0] * cw - p[1] * sw), cy0 - R * (p[0] * sw * se + p[1] * cw * se + p[2] * ce), v3.dot(p, D)];
  Object.assign(V, { cx: cx0, cy: cy0, R, yaw, el });
  return V;
}
function mtPath(V, pts, col, a, w = 3, dash = null) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (dash) ctx.setLineDash(dash);
  ctx.beginPath();
  pts.forEach((p, i) => { const q = V(p); if (i) ctx.lineTo(q[0], q[1]); else ctx.moveTo(q[0], q[1]); });
  ctx.stroke(); ctx.restore();
}
/* a point partway along a polyline of world points (k in [0, 1]) */
function mtAlong(pts, k) {
  const n = pts.length - 1, x = clamp(k) * n, i = Math.min(n - 1, Math.floor(x));
  return v3.lerp(pts[i], pts[i + 1], x - i);
}
/* the cap: the flat triangle ABC pushed out radially onto the sphere */
const mtCap = (A, B, C) => (u, v) => v3.unit(v3.add(B, v3.sc(v3.sub(v3.lerp(A, C, v), B), u)));
/* a flat circular sector from the centre: O and the arc p → q */
const mtSector = (p, q, n = 24) => [MT_O].concat(mtArc(p, q, n));

/* the cell as a solid: walls, cap, rays, arcs. o: once (cyan wall OAC and arc AC), twice (the two walls and the
   two-step path), cap (alpha of the cap), tetra (violet tetrahedron OABC), walk (amber bead: [path, k]) */
function mtSolidCell(sh, e, o = {}) {
  const { A, B, C: Cp } = mtCell(e);
  const once = o.once == null ? 1 : o.once, twice = o.twice == null ? 1 : o.twice, wh = o.wallHi || 0, oh = o.onceHi || 0;
  sh.fan(mtSector(B, A), { fill: C.white, alpha: 0.06 + 0.16 * wh, color: C.white, width: 1.4, strokeAlpha: 0.35 + 0.5 * wh });
  sh.fan(mtSector(B, Cp), { fill: C.white, alpha: 0.06 + 0.16 * wh, color: C.white, width: 1.4, strokeAlpha: 0.35 + 0.5 * wh });
  sh.fan(mtSector(A, Cp), { fill: C.cyan, alpha: 0.05 + 0.18 * oh, color: C.cyan, width: 1.4, strokeAlpha: 0.3 + 0.5 * oh });
  if ((o.cap == null ? 1 : o.cap) > 0.01) sh.surface('cap', mtCap(A, B, Cp), { u: [0, 1], v: [0, 1], nu: 18, nv: 18, color: C.mag, alpha: 0.62 * (o.cap == null ? 1 : o.cap), grid: { every: [3, 3], color: C.mag, alpha: 0.5 }, pick: false });
  if (o.tetra > 0.01) sh.poly('tetra', { vertices: [MT_O, A, B, Cp], faces: [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 2, 3]] }, { color: C.vio, alpha: 0.42 * o.tetra, edges: C.vio });
  for (const P of [A, B, Cp]) sh.line([MT_O, P], { color: C.white, width: 1.6, alpha: 0.55 });
  if (once > 0.01) sh.tube('once', mtArc(A, Cp), { color: C.cyan, width: 5, alpha: once });
  if (twice > 0.01) {
    sh.tube('ab', mtArc(A, B), { color: C.white, width: 4.5, alpha: twice });
    sh.tube('bc', mtArc(B, Cp), { color: C.white, width: 4.5, alpha: twice });
    const k = 0.11 * Math.min(1, e / E45 + 0.3);
    sh.line([v3.unit(v3.add(B, [k, 0, 0])), v3.unit(v3.add(B, [k, 0, k])), v3.unit(v3.add(B, [0, 0, k]))], { color: C.white, width: 2, alpha: twice * 0.9 });
  }
  sh.bead(MT_O, { color: C.white, r: 7 });
  for (const P of [A, B, Cp]) sh.bead(P, { color: C.white, r: 7 });
  if (o.walk) sh.bead(o.walk, { color: C.now, r: 10 });
  return { A, B, Cp };
}
function mtLabel(sh, p, s, dx, dy, col, a, size = 34) {
  if (a <= 0.003) return;
  const q = sh.anchor(p);
  txt(s, q.x + dx, q.y + dy, { size, fam: F.math, w: 700, c: col, a: a * (q.hidden ? 0.45 : 1), align: 'center' });
}
/* opening title */
function mtTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble(DATA.film.title.toUpperCase(), p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('ROUTES · CELL · COUNT · TRACE · HALF THE CAP · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                              scene 1 · TWO ROUTES                         */
/* ======================================================================= */
SCENES.hook = S => {
  const u = S.u;
  mtTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  const { A, B, C: Cp } = mtCell(E45);
  /* the view: the patch ABC sits near the middle of the frame, the sphere runs off it */
  const yaw = -2.45 + 0.03 * u, el = 0.42, RR = 560, V0 = mtView(0, 0, RR, yaw, el), mid = V0(v3.unit(v3.add(v3.add(A, B), Cp)));
  const V = mtView(820 - mid[0], 540 - mid[1], RR, yaw, el);
  /* the sphere: its outline and a few faint great circles */
  ring(V.cx, V.cy, V.R, C.white, a * 0.35, 1.6);
  const circ = (n, f) => { const pts = []; for (let i = 0; i <= n; i++) pts.push(f(TAU * i / n)); return pts; };
  for (const f of [t => [Math.cos(t), Math.sin(t), 0], t => [0, Math.cos(t), Math.sin(t)], t => [Math.cos(t), 0, Math.sin(t)]])
    mtPath(V, circ(120, f), C.dim, a * 0.18, 1.4, [6, 8]);
  /* line 0: one step along the great arc; line 1: two steps along the walls */
  const oa = Q(S, 0, 'one step', 0.6), ta = Q(S, 1, 'two steps', 0.6);
  const arcAC = mtArc(A, Cp, 60), arcAB = mtArc(A, B, 40), arcBC = mtArc(B, Cp, 40), twoPath = arcAB.concat(arcBC.slice(1));
  const k1 = ease(Q(S, 0, 'great circle', 1.6)), k2 = ease(clamp((u - phraseAt(S, 1, 'along one wall')) / 3.4));
  mtPath(V, arcAC.slice(0, Math.max(2, Math.round(60 * k1) + 1)), C.cyan, a * oa, 6);
  if (ta > 0.003) mtPath(V, twoPath.slice(0, Math.max(2, Math.round(80 * k2) + 1)), C.white, a * ta, 5);
  /* the right angle at B */
  const ra = a * Q(S, 1, 'right-angle', 0.5);
  if (ra > 0.003) { const k = 0.1; mtPath(V, [v3.unit(v3.add(B, [k, 0, 0])), v3.unit(v3.add(B, [k, 0, k])), v3.unit(v3.add(B, [0, 0, k]))], C.white, ra, 2.5); }
  /* the walker: amber, on the route being described */
  const onTwo = u >= phraseAt(S, 1, 'along one wall');
  const wk = onTwo ? mtAlong(twoPath, k2) : mtAlong(arcAC, k1);
  for (const [P, s, dx, dy] of [[A, 'A', -34, 14], [B, 'B', 30, 14], [Cp, 'C', 30, -8]]) {
    const q = V(P);
    dot(q[0], q[1], 10, 'w', a * (s === 'B' ? Math.max(0.25, ta) : 1));
    txt(s, q[0] + dx, q[1] + dy, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: a * (s === 'B' ? Math.max(0.25, ta) : 1) });
  }
  const qw = V(wk);
  if (oa > 0.003) dot(qw[0], qw[1], 13, 'g', a);
  /* the two labels */
  const la = a * oa;
  if (la > 0.003) {
    panel(1340, 260, 460, 128, la, C.cyan, 'ONCE · 一次');
    txt('one step · 一步到位', 1362, 336, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: la });
  }
  if (ta > 0.003) {
    panel(1340, 420, 460, 128, a * ta, C.white, 'TWICE · 两次');
    txt('two steps, one corner · 两步一拐', 1362, 496, { size: 26, fam: F.zh, w: 700, c: C.white, a: a * ta });
  }
  /* line 2: rivals? */
  const qa = a * Q(S, 2, 'rival routes', 0.6);
  if (qa > 0.003) {
    chip(1570, 620, 340, 66, 'rivals ?', C.now, qa, 30, F.mono);
    txt('对手？', 1570, 706, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.now, a: qa * Q(S, 2, 'Why should', 0.5) });
  }
};

/* ======================================================================= */
/*                               scene 2 · ONE CELL                          */
/* ======================================================================= */
/* camera stops: the generic view, straight down OB (B falls on O), and a view across the walls */
const CL_GEN = { yaw: -2.42, el: 0.42 }, CL_DOWN = { yaw: -Math.PI, el: 0.0 }, CL_WALL = { yaw: -1.75, el: 0.62 };
SCENES.cell = S => {
  const u = S.u, a = mtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'two shadows', 'argued']]);
  const k1 = ease(Q(S, 1, 'straight down', 1.8)) * (1 - ease(Q(S, 2, 'walls instead', 1.6)));
  const k2 = ease(Q(S, 2, 'walls instead', 1.6)) * (1 - ease(at(S, 3, 1.6)));
  let yaw = CL_GEN.yaw + 0.05 * u, el = CL_GEN.el;
  yaw = lerp(yaw, CL_DOWN.yaw, k1); el = lerp(el, CL_DOWN.el, k1);
  yaw = lerp(yaw, CL_WALL.yaw, k2); el = lerp(el, CL_WALL.el, k2);
  const R = 430, ox = 620, oy = 580;
  const sh = solid('cell', { x: 120, y: 170, w: 1180, h: 680, yaw, pitch: el, unit: R, cx: ox - 120, cy: oy - 170, px: true });
  const grow = ease(at(S, 0, 1.6));
  const once = 1 - 0.75 * k2, twice = Math.max(0.25, 1 - 0.75 * k1);
  sh.begin();
  const { A, B, Cp } = mtSolidCell(sh, E45, { cap: grow * (1 - 0.6 * k1), once, twice, onceHi: k1, wallHi: k2 });
  sh.end(a);
  mtLabel(sh, MT_O, 'O', -26, 30, C.white, a);
  mtLabel(sh, A, 'A', -30, 10, C.white, a);
  mtLabel(sh, B, 'B', k1 > 0.5 ? 30 : 26, k1 > 0.5 ? -26 : -18, C.white, a);
  mtLabel(sh, Cp, 'C', 28, -10, C.white, a);
  /* line 0: what the solid is */
  const pa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5));
  if (pa > 0.003) {
    panel(1330, 230, 470, 250, pa, C.mag, 'THE CELL · 小胞');
    txt('3 flat walls · 三面平墙', 1352, 306, { size: 24, fam: F.zh, w: 700, c: C.white, a: pa });
    txt('+ a bulging cap · 一块鼓起的帽', 1352, 352, { size: 24, fam: F.zh, w: 700, c: C.mag, a: pa * Q(S, 0, 'bulging', 0.5) });
    txt('ε = 45° per step · 每步 45°', 1352, 420, { size: 22, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
  /* line 1: shadow one */
  const s1 = a * Q(S, 1, 'B hides behind O', 0.6) * (1 - at(S, 2, 0.5));
  if (s1 > 0.003) {
    panel(1330, 230, 470, 270, s1, C.cyan, 'SHADOW 1 · 影子一');
    txt('down the edge OB · 顺棱看', 1352, 306, { size: 24, fam: F.zh, w: 700, c: C.white, a: s1 });
    txt('B behind O · B 藏在 O 后', 1352, 352, { size: 24, fam: F.zh, w: 700, c: C.white, a: s1 });
    txt('walls → 2 legs · 墙压成两条腿', 1352, 398, { size: 24, fam: F.zh, w: 700, c: C.white, a: s1 * Q(S, 1, 'two legs', 0.5) });
    txt('one arc A→C = once · 一次', 1352, 452, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: s1 * Q(S, 1, 'one arc', 0.5) });
  }
  /* line 2: shadow two */
  const s2 = a * Q(S, 2, 'two steps', 0.6) * (1 - at(S, 3, 0.5));
  if (s2 > 0.003) {
    panel(1330, 230, 470, 220, s2, C.white, 'SHADOW 2 · 影子二');
    txt('along the walls · 贴墙看', 1352, 306, { size: 24, fam: F.zh, w: 700, c: C.white, a: s2 });
    txt('A→B, 90°, B→C', 1352, 352, { size: 26, fam: F.mono, w: 700, c: C.white, a: s2 });
    txt('= twice · 两次', 1352, 404, { size: 26, fam: F.zh, w: 700, c: C.white, a: s2 });
  }
  /* line 3: one cell, two shadows (the book's reading) */
  const m = a * at(S, 3, 0.6, 0.5);
  if (m > 0.003) {
    panel(1330, 230, 470, 300, m, C.argued, 'ONE CELL, TWO SHADOWS');
    txt('一体双影', 1352, 310, { size: 34, fam: F.zh, w: 900, c: C.white, a: m });
    txt('once · 一次  ←  cell  →  twice · 两次', 1352, 372, { size: 22, fam: F.zh, w: 700, c: C.white, a: m });
    txt("the book's reading · 本书的诠释", 1352, 440, { size: 22, fam: F.zh, w: 700, c: C.argued, a: m * Q(S, 3, "book's reading", 0.5) });
    txt('MODEL, not a theorem · 不是定理', 1352, 480, { size: 22, fam: F.zh, w: 700, c: C.argued, a: m * Q(S, 3, 'not a theorem', 0.5) });
  }
};

/* ======================================================================= */
/*                             scene 3 · COUNT BY HAND                       */
/* ======================================================================= */
SCENES.count = S => {
  const u = S.u, a = mtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const R = 360, ox = 470, oy = 700;
  const sh = solid('cell', { x: 100, y: 170, w: 820, h: 680, yaw: CL_GEN.yaw + 0.04 * u, pitch: CL_GEN.el, unit: R, cx: ox - 100, cy: oy - 170, px: true });
  const tet = Q(S, 3, 'volume', 0.8);
  const hiTwo = Q(S, 1, 'two steps', 0.5) * (1 - at(S, 2, 0.5)), hiOne = Q(S, 2, 'direct step', 0.5) * (1 - at(S, 3, 0.5));
  sh.begin();
  const { A, B, Cp } = mtSolidCell(sh, E45, { cap: 1 - 0.65 * tet, once: 0.35 + 0.65 * hiOne + 0.3 * (1 - hiTwo) * (1 - tet), twice: 0.35 + 0.65 * hiTwo, tetra: tet });
  sh.end(a);
  mtLabel(sh, MT_O, 'O', -24, 30, C.white, a, 30);
  mtLabel(sh, A, 'A', -28, 10, C.white, a, 30);
  mtLabel(sh, B, 'B', 24, -16, C.white, a, 30);
  mtLabel(sh, Cp, 'C', 26, -10, C.white, a, 30);
  /* the ledger */
  panel(960, 200, 840, 610, a, C.cyan, 'BY HAND · 手算   ε = 45°');
  const x = 990, c = Math.cos(E45);
  const r1 = a * Q(S, 1, 'two steps', 0.5);
  mtRich([['A·B', C.white], [' = cos 45° = ', C.white], [c.toFixed(3), C.white]], x, 290, { size: 34, a: r1 });
  mtRich([['B·C', C.white], [' = cos 45° = ', C.white], [c.toFixed(3), C.white]], x, 344, { size: 34, a: r1 });
  txt('twice · 两次', 1640, 318, { size: 24, fam: F.zh, w: 700, c: C.white, a: r1 * 0.9 });
  const r2 = a * Q(S, 2, 'direct step', 0.5);
  mtRich([['A·C', C.cyan], [' = cos²45° = ', C.cyan], [(c * c).toFixed(3), C.cyan]], x, 430, { size: 34, a: r2 });
  txt('once · 一次', 1640, 430, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: r2 * 0.9 });
  const r3 = a * Q(S, 2, 'squared', 0.5);
  mtRich([['= ', C.white], [c.toFixed(3), C.white], [' × ', C.white], [c.toFixed(3), C.white], ['   (90° at B · B 处直角)', C.dim]], x + 70, 484, { size: 28, a: r3, fam: F.zh });
  const r4 = a * Q(S, 3, 'once and twice agree', 0.5);
  txt('dot products: once = twice · 点积里一次 = 两次', x, 552, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: r4 });
  const r5 = a * Q(S, 3, 'volume', 0.5);
  if (r5 > 0.003) {
    line(x, 590, x + 780, 590, C.dim, r5 * 0.6, 1.2);
    mtRich([['A·(B×C)', C.vio], [' = sin²45° = ', C.vio], [Math.pow(Math.sin(E45), 2).toFixed(3), C.vio]], x, 642, { size: 34, a: r5 });
    txt('= 6 × violet tetrahedron OABC · 紫色四面体的 6 倍', x, 684, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r5 });
    txt('size 0.5: fixed by the three dot products · 大小由点积定出', x, 730, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 3, 'size of the volume', 0.5) });
    txt('which way it turns: NOT in dot products · 朝向：点积定不出', x, 776, { size: 24, fam: F.zh, w: 700, c: C.vio, a: a * Q(S, 3, 'which way', 0.5) });
  }
};

/* ======================================================================= */
/*                               scene 4 · ONE NUMBER                        */
/* ======================================================================= */
/* the complex plane: origin (x0, y0), k pixels per unit; Re right (cyan), Im up (violet) */
function mtPlane(x0, y0, k, a, o = {}) {
  if (a <= 0.003) return;
  const xr = o.xr || 1.0, yr = o.yr || 0.6;
  line(x0 - 30, y0, x0 + k * xr, y0, C.cyan, a * 0.7, 2);
  line(x0, y0 + 30, x0, y0 - k * yr, C.vio, a * 0.7, 2);
  txt('Re', x0 + k * xr + 10, y0 + 8, { size: 24, fam: F.mono, w: 700, c: C.cyan, a });
  txt('Im', x0 - 10, y0 - k * yr - 14, { size: 24, fam: F.mono, w: 700, c: C.vio, a, align: 'center' });
  for (const t of o.ticks || [0.25, 0.5, 0.75, 1]) if (t <= xr) {
    line(x0 + k * t, y0 - 6, x0 + k * t, y0 + 6, C.cyan, a * 0.6, 1.5);
    txt(String(t), x0 + k * t, y0 + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  for (const t of o.yticks || [0.25, 0.5]) if (t <= yr) {
    line(x0 - 6, y0 - k * t, x0 + 6, y0 - k * t, C.vio, a * 0.6, 1.5);
    txt(String(t), x0 - 14, y0 - k * t + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  }
}
/* the trace as a point of the plane, with its real (cyan) and imaginary (violet) legs */
function mtPoint(x0, y0, k, z, a, o = {}) {
  if (a <= 0.003) return [x0, y0];
  const px = x0 + k * z[0], py = y0 - k * z[1];
  line(x0, y0, px, y0, C.cyan, a * (o.re == null ? 1 : o.re), 6);
  line(px, y0, px, py, C.vio, a * (o.im == null ? 1 : o.im), 6);
  line(x0, y0, px, py, C.white, a * 0.8, 2.5);
  dot(px, py, 12, 'w', a);
  return [px, py];
}
SCENES.trace = S => {
  const u = S.u, a = mtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed'], [3, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* line 0: the definition */
  const da = a * at(S, 0, 0.6);
  panel(120, 190, 1100, 160, da, C.cyan, 'ONE NUMBER · 一个数');
  mtRich([['Tr( P(A) · P(B) · P(C) )', C.white]], 150, 268, { size: 40, a: da });
  txt('P = (I + r·σ)/2 : the projector of a Bloch vector · 布洛赫矢的投影算子', 150, 326, { size: 22, fam: F.zh, w: 700, c: C.dim, a: da });
  /* line 1: Lean's identity */
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(120, 380, 1100, 220, la, C.lean, 'FOR ANY REAL VECTORS · 对任意实向量');
    mtRich([['Tr = ', C.white], ['(1 + A·B + B·C + C·A)/4', C.cyan]], 150, 456, { size: 36, a: la });
    mtRich([['     + i ', C.white], ['A·(B×C)/4', C.vio]], 150, 510, { size: 36, a: la * Q(S, 1, 'imaginary part', 0.5) });
    mtLean(150, 570, MT_LEAN.triple_bargmann_bloch, la, { size: 22 });
  }
  /* line 2: the numbers */
  const na = a * at(S, 2, 0.6);
  const t = mtTrace(E45), c = Math.cos(E45);
  if (na > 0.003) {
    panel(120, 628, 1100, 190, na, C.cyan, 'ε = 45°');
    mtRich([['(1 + 0.707 + 0.707 + 0.500)/4 = ', C.white], [t[0].toFixed(3), C.cyan]], 150, 700, { size: 32, a: na });
    mtRich([['i · 0.500/4 = ', C.white], [t[1].toFixed(3) + ' i', C.vio]], 150, 756, { size: 32, a: na * Q(S, 2, 'plus zero point one', 0.5) });
    txt(`= (1 + cos ε)²/4 + i sin²ε/4`, 860, 756, { size: 22, fam: F.math, w: 700, c: C.dim, a: na * 0.9 });
  }
  /* the plane */
  const pa = a * at(S, 1, 0.8, 0.6);
  const x0 = 1300, y0 = 760, k = 440;
  mtPlane(x0, y0, k, pa, { xr: 0.85, yr: 0.3, ticks: [0.25, 0.5, 0.75], yticks: [0.25] });
  const grow = ease(at(S, 2, 1.0));
  if (pa > 0.003 && grow > 0.003) {
    const [px, py] = mtPoint(x0, y0, k, [t[0] * grow, t[1] * grow], pa);
    txt(`${t[0].toFixed(3)} + ${t[1].toFixed(3)} i`, px - 10, py - 26, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: pa * grow });
    txt('dot products · 点积', x0 + k * t[0] / 2, y0 + 64, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: pa * grow });
    txt('oriented volume', px + 12, py + 10, { size: 20, fam: F.zh, w: 700, c: C.vio, a: pa * grow });
    txt('有向体积', px + 12, py + 36, { size: 22, fam: F.zh, w: 700, c: C.vio, a: pa * grow });
  }
  /* line 3: the loop of spinor overlaps. P(A) = |A⟩⟨A| is a hand step (NUM); the chain trace is Lean's */
  const oa = a * at(S, 3, 0.6);
  if (oa > 0.003) {
    const { A, B, C: Cc } = mtCell(E45), ab = mtOv(A, B), ca = mtOv(Cc, A);
    panel(1270, 190, 540, 360, oa, C.cyan, 'AROUND THE LOOP · 绕一圈');
    mtRich([['P(A) = |A⟩⟨A|', C.cyan]], 1295, 258, { size: 28, a: oa });
    txt('hand step · 手算', 1580, 256, { size: 22, fam: F.zh, w: 700, c: C.dim, a: oa });
    const la2 = oa * Q(S, 3, 'Lean checks', 0.5);
    mtRich([['Tr = ⟨A|B⟩⟨B|C⟩⟨C|A⟩', C.white]], 1295, 312, { size: 30, a: la2 });
    mtLean(1295, 360, MT_LEAN.bargmann_path_product, la2, { size: 22 });
    mtRich([[ab.toFixed(3), C.white], [' × ', C.dim], [ab.toFixed(3), C.white], [' × ', C.dim], [ca.toFixed(3), C.white]], 1295, 418, { size: 28, a: oa, fam: F.mono });
    mtRich([['= ', C.dim], [(ab * ab * ca).toFixed(3), C.white], ['  = |Tr|', C.dim]], 1295, 464, { size: 28, a: oa, fam: F.mono });
    txt('sizes of the overlaps · 重叠的大小（屏上计算）', 1295, 512, { size: 22, fam: F.zh, w: 700, c: C.dim, a: oa });
  }
  if (la > 0.003) stamp('DOT PRODUCTS + ORIENTED VOLUME', 900, 456, Q(S, 1, 'volume, over four', 0.4) * (1 - at(S, 2, 0.4, 0.6)), C.lean, 22, -0.06);
};

/* ======================================================================= */
/*                              scene 5 · HALF THE CAP                       */
/* ======================================================================= */
SCENES.angle = S => {
  const u = S.u, a = mtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'three angles', 'argued'], [1, 'Half of that', 'computed'], [4, null, 'argued']]);
  /* the step: 45° → 90° on line 2 → 15° on line 3 */
  const up = ease(Q(S, 2, 'ninety degrees', 1.6)), dn = ease(Q(S, 3, 'fifteen degrees', 1.8));
  const eDeg = lerp(lerp(45, 90, up), 15, dn), e = eDeg * DEG;
  const t = mtTrace(e), arg = Math.atan2(t[1], t[0]), Om = mtExcess(e), base = mtBase(e);
  /* the cell, live */
  const R = 330, ox = 360, oy = 690;
  const sh = solid('grow', { x: 100, y: 180, w: 700, h: 660, yaw: -2.42 + 0.03 * u, pitch: 0.42, unit: R, cx: ox - 100, cy: oy - 180, px: true });
  sh.begin();
  const { A, B, Cp: Cc } = mtSolidCell(sh, e, { once: 0.6, twice: 0.6 });
  sh.end(a);
  mtLabel(sh, A, 'A', -26, 10, C.white, a, 28);
  mtLabel(sh, B, 'B', 22, -14, C.white, a, 28);
  mtLabel(sh, Cc, 'C', 24, -10, C.white, a, 28);
  /* the step readout (amber: the current choice) */
  chip(450, 230, 280, 58, `ε = ${eDeg.toFixed(1)}°`, C.now, a, 30, F.mono);
  /* the plane and the angle */
  const x0 = 870, y0 = 700, k = 600;
  mtPlane(x0, y0, k, a, { xr: 1.05, yr: 0.4, ticks: [0.25, 0.5, 0.75, 1], yticks: [0.25] });
  const [px, py] = mtPoint(x0, y0, k, t, a, { re: 0.6, im: 0.6 });
  const ga = a * Q(S, 0, 'angle', 0.6);
  if (ga > 0.003) {
    ctx.save(); ctx.globalAlpha = ga; ctx.strokeStyle = C.mag; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(x0, y0, 150, -arg, 0); ctx.stroke(); ctx.restore();
    txt(`arg = ${(arg / DEG).toFixed(2)}°`, x0 + 20, y0 + 84, { size: 30, fam: F.mono, w: 700, c: C.mag, a: ga });
    txt(`${t[0].toFixed(3)} + ${t[1].toFixed(3)} i`, px - 16, py - 22, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a });
  }
  /* the cap's angle ledger */
  const ca = a * Q(S, 1, 'three angles', 0.6) * (1 - at(S, 4, 0.5));
  if (ca > 0.003) {
    panel(1230, 200, 570, 330, ca, C.mag, 'THE CAP · 球面帽');
    mtRich([['α = γ = ', C.white], [(base / DEG).toFixed(2) + '°', C.white], ['   β = 90°', C.white]], 1255, 270, { size: 28, a: ca, fam: F.mono });
    mtRich([['Ω = α + β + γ − 180° = ', C.white], [(Om / DEG).toFixed(2) + '°', C.mag]], 1255, 326, { size: 26, a: ca, fam: F.mono });
    txt('Girard: classical · 吉拉尔定理（文献结果）', 1255, 370, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ca });
    const ha = ca * Q(S, 1, 'Half of that', 0.5);
    mtRich([['Ω/2 = ', C.white], [(Om / 2 / DEG).toFixed(2) + '°', C.mag], ['  = arg Tr', C.white]], 1255, 430, { size: 30, a: ha, fam: F.mono });
    txt('tan(arg) = tan²(ε/2) · 屏上代数', 1255, 482, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ha });
  }
  /* line 2: the octant; line 3: the small step */
  const oa = a * Q(S, 2, 'eighth of the sphere', 0.6) * (1 - at(S, 3, 0.5));
  if (oa > 0.003) txt('Tr = (1 + i)/4 · octant · 八分之一球面', 1230, 580, { size: 26, fam: F.zh, w: 700, c: C.mag, a: oa });
  const sa = a * Q(S, 3, 'like the square', 0.6);
  if (sa > 0.003) txt('Ω ≈ ε²/2 for small ε · 小步长时', 1230, 580, { size: 26, fam: F.zh, w: 700, c: C.mag, a: sa });
  /* line 4: the maxim */
  const ma = a * at(S, 4, 0.6, 0.4);
  if (ma > 0.003) {
    panel(1230, 200, 570, 170, ma, C.argued, 'MAXIM · 格言');
    txt('flat = curved, coarse ruler', 1255, 270, { size: 26, fam: F.mono, w: 700, c: C.white, a: ma });
    txt('平直，是尺子太粗时的弯曲', 1255, 320, { size: 28, fam: F.zh, w: 700, c: C.white, a: ma });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = mtFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [0, 'Girard', 'argued'], [0, 'numbers', 'computed'], [1, null, 'argued']]);
  const rows = [
    { k: 0, p: 'Lean checks', col: C.lean, en: 'two trace identities, any vectors', zh: '两条迹恒等式，对任意向量成立', lean: true },
    { k: 0, p: 'Girard', col: C.argued, en: "cap's angle sum: Girard", zh: '球面帽内角和：吉拉尔定理', note: 'classical, not formalized here · 经典结果，本书未形式化' },
    { k: 0, p: 'numbers', col: C.cyan, en: 'every number: computed on screen', zh: '片中数字：屏幕上算出', note: '0.707 · 0.729 + 0.125 i · 9.74° · 19.47°' },
    { k: 1, p: null, col: C.argued, en: 'one cell, two shadows', zh: '一体双影：两条路线是同一小胞的两个影子', note: "the book's model, not a proof · 本书的模型，不是证明" }
  ];
  rows.forEach((rw, i) => {
    const ra = a * (rw.p ? Q(S, rw.k, rw.p, 0.6) : at(S, rw.k, 0.6));
    if (ra <= 0.003) return;
    const y = 190 + i * 162;
    panel(260, y, 1400, 144, ra, rw.col);
    txt(rw.en, 290, y + 50, { size: 30, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 290, y + 94, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    if (rw.lean) {
      mtLean(1000, y + 52, MT_LEAN.triple_bargmann_bloch, ra, { size: 22 });
      mtLean(1000, y + 100, MT_LEAN.bargmann_path_product, ra, { size: 22 });
    } else txt(rw.note, 290, y + 130, { size: 22, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
  });
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 1, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.12, cx: 1450, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const R = 470, ox = 520, oy = 760;
  const sh = solid('cell', { x: 60, y: 120, w: 980, h: 860, yaw: CL_GEN.yaw, pitch: CL_GEN.el, unit: R, cx: ox - 60, cy: oy - 120, px: true });
  sh.begin();
  const { A, B, Cp: Cc } = mtSolidCell(sh, E45, { tetra: 0.5 });
  sh.end(1);
  mtLabel(sh, A, 'A', -32, 10, C.white, 1, 38);
  mtLabel(sh, B, 'B', 28, -18, C.white, 1, 38);
  mtLabel(sh, Cc, 'C', 30, -10, C.white, 1, 38);
  txt(DATA.film.title_zh, 1400, 400, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ONE STEP OR TWO,', 1400, 500, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 4 });
  txt('ONE TINY CELL', 1400, 560, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  mtRich([['Tr = ', C.white], ['(1 + A·B + B·C + C·A)/4', C.cyan], [' + i ', C.white], ['A·(B×C)/4', C.vio]], 1400, 660, { size: 34, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1400, 750, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
