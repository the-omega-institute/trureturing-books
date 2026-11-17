/* Film · One Plane Is Not Enough: Three Axes, One Sphere · 一张面装不下：三根轴与一颗球
   (book quantum-geometry, the prelude, §0.3 “以球为面”; prelude series 3/5). Scenes for theme/film/engine.js.

   One question carries the film: we lifted our eyes and saw a turning plane; is one flat plane enough for a qubit?
   The picture is one orthographic camera (yaw −55°, elevation 22°; x towards the viewer on the right, y away on the
   right, z up, right-handed) that first looks edge-on at the turning disc of film 2/5, lifts to look straight down,
   then tilts down to 22° so the disc becomes the xy plane of three axes. Every frame is a pure function of the scene
   time; nothing is random.

   What each scene shows, and on what footing:
     PLANE    the disc of film 2/5, edge-on (a segment) opening into a turning disc; the question ..... picture, no claim
     AXES     three axes at right angles, the three coordinate planes (pairwise perpendicular), and unit arrows whose tips
              trace the sphere x² + y² + z² = 1 ......................................................... picture
              “standard quantum theory puts every pure qubit state on this sphere” is a literature result, not
              formalized in this book (rem-prelude-sphere-literature) ............................... badged ARGUED
     TABLE    B(x, y, z) = [[z, x − iy], [x + iy, −z]] .............................. LEAN ✓ QubitBloch.B_formula_core
              (the Lean statement: B a = !![a 2, a 0 − I·a 1; a 0 + I·a 1, −a 2], here x = a 0, y = a 1, z = a 2);
              B(0, 0, 1) = [[1, 0], [0, −1]] = Z, B(1, 0, 0) = [[0, 1], [1, 0]] = X, and for v = (2/3, 1/3, 2/3):
              x² + y² + z² = 1 and B(v)·B(v) = I, in exact Gaussian-rational arithmetic ....... computed here (NUM)
     ADDRESS  two angles: tilt θ from the north, turn φ about the vertical axis. θ = 50° fixed, φ swept: a latitude of
              radius sin 50° ≈ 0.77 at height cos 50° ≈ 0.64, its plane missing the centre; θ = 90°: the equator, whose
              plane passes through the centre (the colours and θ of figure prelude-latitude and lab card latitude)
              ................................................................................ computed here (NUM)
     ORDER    from N = (0, 0, 1), quarter turns (right-hand rule): A = x then z: N → (0, −1, 0) → (1, 0, 0);
              B = z then x: N → N → (0, −1, 0); the two ends are 90° apart, (1, 0, 0)·(0, −1, 0) = 0 .... computed here;
              Z·X = [[0, 1], [−1, 0]] and X·Z = [[0, −1], [1, 0]] are computed here; Z·X = −(X·Z)
              ......................................................... LEAN ✓ FiniteDimensional.qubit_weyl_star
              (the tables are shown as “order shows up in the readout tables too”, not as a derivation of the turns)
     RECAP    three takeaways, each tagged with its footing (ARGUED; NUM; NUM for the turns and LEAN ✓ for ZX = −XZ),
              the next film's question, the card
   Colours: cyan = lines, the latitude, what stays inside; magenta = planes, the equator, areas; violet = axes;
   amber = only the current point or step; green = only the two cited Lean results; white/dim for the rest.
   On load, FILM.init recomputes every number printed on screen and checks the geometry drawn; any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

const PT_DEG = Math.PI / 180;
const PT = {
  yaw: -55 * PT_DEG,          // the camera: orthographic, turned −55° about z …
  el: 22 * PT_DEG,            // … and looking down 22° (figure prelude-latitude uses 22° too)
  omega: TAU / 9,             // PLANE and AXES: the disc turns once every 9 s of film time
  rot0: 40 * PT_DEG,
  lat: 50,                    // ADDRESS: the fixed tilt, in degrees (figure prelude-latitude, lab card latitude)
  phi0: 0,                    // ADDRESS: the first tilt is along the meridian of the x axis; φ is counted from x
  spiral: 260,                // AXES: unit arrows sampled along the sweep
  turns: 8,                   // AXES: turns of the sweep from north to south
  sweep: 3.4                  // ADDRESS: seconds for one turn along the 50° latitude
};
const PT_LABEL = mix(C.dim, C.white, 0.45);
const PT_VIO = mix(C.vio, C.white, 0.35);      // violet text, readable on the dark ground
/* labels with θ, φ, ², −: the self-hosted Noto Sans SC draws them the same on every machine */
const PT_MATH = F.zh;
const ptRun = t => PT.rot0 + PT.omega * t;

/* ======================================================================= */
/*                exact arithmetic: rationals, Gaussian rationals            */
/* ======================================================================= */
const PTX = (() => {
  const ab = x => (x < 0n ? -x : x);
  const gcd = (a, b) => { a = ab(a); b = ab(b); while (b) { const r = a % b; a = b; b = r; } return a; };
  const q = (n, d = 1) => {
    n = BigInt(n); d = BigInt(d);
    if (d === 0n) throw new Error('rational with zero denominator');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d);
    return g > 1n ? { n: n / g, d: d / g } : { n, d };
  };
  const add = (a, b) => q(a.n * b.d + b.n * a.d, a.d * b.d);
  const neg = a => ({ n: -a.n, d: a.d });
  const sub = (a, b) => add(a, neg(b));
  const mul = (a, b) => q(a.n * b.n, a.d * b.d);
  const eq = (a, b) => a.n === b.n && a.d === b.d;
  const O = q(0), ONE = q(1);
  const c = (re, im = O) => ({ re, im });
  const cadd = (a, b) => c(add(a.re, b.re), add(a.im, b.im));
  const cneg = a => c(neg(a.re), neg(a.im));
  const cmul = (a, b) => c(sub(mul(a.re, b.re), mul(a.im, b.im)), add(mul(a.re, b.im), mul(a.im, b.re)));
  const ceq = (a, b) => eq(a.re, b.re) && eq(a.im, b.im);
  /* 2×2 complex matrices [m00, m01, m10, m11] */
  const mmul = (A, B) => [
    cadd(cmul(A[0], B[0]), cmul(A[1], B[2])), cadd(cmul(A[0], B[1]), cmul(A[1], B[3])),
    cadd(cmul(A[2], B[0]), cmul(A[3], B[2])), cadd(cmul(A[2], B[1]), cmul(A[3], B[3]))];
  const mneg = A => A.map(cneg);
  const msc = (s, A) => A.map(x => cmul(c(s), x));
  const meq = (A, B) => A.every((x, i) => ceq(x, B[i]));
  const C0 = c(O), C1 = c(ONE);
  const I2 = [C1, C0, C0, C1];
  const X = [C0, C1, C1, C0], Z = [C1, C0, C0, cneg(C1)];        // qubitX, qubitZ of trureturing
  /* the right-hand side of B_formula_core: B (x, y, z) = [[z, x − i y], [x + i y, −z]] */
  const B = v => [c(v[2]), c(v[0], neg(v[1])), c(v[0], v[1]), c(neg(v[2]))];
  const vec = (...xs) => xs.map(x => (Array.isArray(x) ? q(x[0], x[1]) : q(x)));
  const dot = (u, v) => add(add(mul(u[0], v[0]), mul(u[1], v[1])), mul(u[2], v[2]));
  const veq = (u, v) => u.every((x, i) => eq(x, v[i]));
  /* exact quarter turns (right-hand rule), integer matrices acting on rational 3-vectors */
  const RX = [[1, 0, 0], [0, 0, -1], [0, 1, 0]], RZ = [[0, -1, 0], [1, 0, 0], [0, 0, 1]];
  const app = (M, v) => M.map(r => r.reduce((s, m, j) => add(s, mul(q(m), v[j])), O));
  /* printing: a true minus sign, fractions as a/b */
  const fq = x => (x.n < 0n ? '−' : '') + ab(x.n) + (x.d === 1n ? '' : '/' + x.d);
  const fim = x => {                                    // the imaginary part x · i, written i, 2i, i/3, 2i/3
    const s = x.n < 0n ? '−' : '', n = ab(x.n), d = x.d;
    return s + (n === 1n ? '' : String(n)) + 'i' + (d === 1n ? '' : '/' + d);
  };
  const fc = z => {
    if (z.im.n === 0n) return fq(z.re);
    if (z.re.n === 0n) return fim(z.im);
    return fq(z.re) + (z.im.n < 0n ? ' − ' : ' + ') + fim({ n: ab(z.im.n), d: z.im.d });
  };
  const fv = v => '(' + v.map(fq).join(', ') + ')';
  return { q, add, sub, mul, neg, eq, O, ONE, c, cneg, ceq, mmul, mneg, msc, meq, I2, X, Z, B, vec, dot, veq, RX, RZ,
    app, fq, fc, fv };
})();

/* the exact data printed on screen (FILM.init re-derives each of them) */
const PT_N = PTX.vec(0, 0, 1), PT_EX = PTX.vec(1, 0, 0), PT_MY = PTX.vec(0, -1, 0);
const PT_V3 = PTX.vec([2, 3], [1, 3], [2, 3]);
const PT_SHOW = {
  bN: PTX.B(PT_N).map(PTX.fc),                  // [[1, 0], [0, −1]]
  bX: PTX.B(PT_EX).map(PTX.fc),                 // [[0, 1], [1, 0]]
  bV: PTX.B(PT_V3).map(PTX.fc),                 // [[2/3, 2/3 − i/3], [2/3 + i/3, −2/3]]
  bV2: PTX.mmul(PTX.B(PT_V3), PTX.B(PT_V3)).map(PTX.fc),
  zx: PTX.mmul(PTX.Z, PTX.X).map(PTX.fc),       // [[0, 1], [−1, 0]]
  xz: PTX.mmul(PTX.X, PTX.Z).map(PTX.fc),       // [[0, −1], [1, 0]]
  v: PTX.fv(PT_V3),
  sq: PT_V3.map(x => PTX.fq(PTX.mul(x, x))).join(' + ') + ' = ' + PTX.fq(PTX.dot(PT_V3, PT_V3)),
  aEnd: PTX.fv(PTX.app(PTX.RZ, PTX.app(PTX.RX, PT_N))),     // x first, then z
  bEnd: PTX.fv(PTX.app(PTX.RX, PTX.app(PTX.RZ, PT_N))),     // z first, then x
  dotAB: PTX.fq(PTX.dot(PTX.app(PTX.RZ, PTX.app(PTX.RX, PT_N)), PTX.app(PTX.RX, PTX.app(PTX.RZ, PT_N))))
};

/* ======================================================================= */
/*                 floating point: 3-vectors and the camera                  */
/* ======================================================================= */
const pt3 = {
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  sc: (s, a) => [s * a[0], s * a[1], s * a[2]],
  /* the turn by angle a about the unit axis n, counterclockwise seen from the tip of n (right-hand rule) */
  rot: (n, a, v) => {
    const c = Math.cos(a), s = Math.sin(a), d = pt3.dot(n, v), x = pt3.cross(n, v);
    return [v[0] * c + x[0] * s + n[0] * d * (1 - c), v[1] * c + x[1] * s + n[1] * d * (1 - c), v[2] * c + x[2] * s + n[2] * d * (1 - c)];
  }
};
const PT_E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
/* a point at tilt th from the north and turn ph about the vertical axis (radians) */
const ptSph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
/* the camera: centre (cx, cy) in frame pixels, R pixels per unit, elevation el */
function ptView(cx, cy, R, el = PT.el) {
  return { cx, cy, R, c: Math.cos(PT.yaw), s: Math.sin(PT.yaw), ce: Math.cos(el), se: Math.sin(el) };
}
/* world point → [x, y, depth] (depth > 0: towards the viewer) */
function ptP(V, p) {
  const x1 = p[0] * V.c - p[1] * V.s, y1 = p[0] * V.s + p[1] * V.c, z1 = p[2];
  return [V.cx + V.R * x1, V.cy - V.R * (y1 * V.se + z1 * V.ce), -y1 * V.ce + z1 * V.se];
}
/* how visible a point is through the glass ball: 1, or `back` when the ball stands in front of it */
function ptVis(V, p, back = 0.35) {
  const q = ptP(V, p), sx = (q[0] - V.cx) / V.R, sy = (q[1] - V.cy) / V.R;
  if (pt3.dot(p, p) > 1.0005 && sx * sx + sy * sy < 1 && q[2] < 0) return back;
  return 1;
}

/* ---------- drawing helpers ---------- */
/* a 3D polyline; o.surface: the curve lies on the sphere, its far half dashed and fainter */
function ptPath(V, pts, col, a, w = 2, o = {}) {
  if (a <= 0.003 || pts.length < 2) return;
  const P = pts.map(p => ptP(V, p)), back = o.back == null ? 0.38 : o.back;
  const vis = i => {
    if (o.flat) return 1;
    if (o.surface) return (P[i][2] + P[i + 1][2]) / 2 >= -1e-6 ? 1 : back;
    return ptVis(V, pt3.sc(0.5, pt3.add(pts[i], pts[i + 1])), back);
  };
  let i = 0;
  while (i < P.length - 1) {
    const v = vis(i); let j = i;
    while (j < P.length - 1 && vis(j) === v) j++;
    ctx.save(); ctx.globalAlpha = a * v; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    if (v < 1 && !o.solidBack) ctx.setLineDash([7, 8]);
    ctx.beginPath(); ctx.moveTo(P[i][0], P[i][1]);
    for (let k = i + 1; k <= j; k++) ctx.lineTo(P[k][0], P[k][1]);
    ctx.stroke(); ctx.restore();
    i = j;
  }
}
/* points of a circle: centre c, orthonormal directions u, v, radius r */
function ptCircle(c, u, v, r, n = 96, t0 = 0, t1 = TAU) {
  const out = [];
  for (let i = 0; i <= n; i++) {
    const t = t0 + (t1 - t0) * i / n;
    out.push([c[0] + r * (Math.cos(t) * u[0] + Math.sin(t) * v[0]), c[1] + r * (Math.cos(t) * u[1] + Math.sin(t) * v[1]),
      c[2] + r * (Math.cos(t) * u[2] + Math.sin(t) * v[2])]);
  }
  return out;
}
/* a filled disc (projected ellipse) with its rim */
function ptDisc(V, c, u, v, r, col, a, o = {}) {
  if (a <= 0.003) return;
  const pts = ptCircle(c, u, v, r, 96), P = pts.map(p => ptP(V, p));
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(col, o.fill == null ? 0.1 : o.fill);
  ctx.beginPath(); P.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
  if (o.rim !== 0) ptPath(V, pts, o.rimCol || col, a * (o.rim == null ? 0.85 : o.rim), o.w || 2.4, { surface: o.surface });
}
/* a point: soft glow, solid fill, white core */
function ptDot(x, y, r, col, a) {
  if (a <= 0.003) return;
  ctx.save();
  ctx.globalAlpha = a * 0.22; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * 2.1, 0, TAU); ctx.fill();
  ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.bg; ctx.lineWidth = 2; ctx.stroke();
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r * 0.36, 0, TAU); ctx.fill();
  ctx.restore();
}
/* an arrow whose head scales with its length */
function ptVec(x1, y1, x2, y2, col, a, w = 4, head = 18) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  if (a <= 0.003 || L < 1) return;
  const h = Math.min(head, L * 0.45), ux = dx / L, uy = dy / L, bx = x2 - ux * h, by = y2 - uy * h;
  line(x1, y1, bx, by, col, a, w);
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
  ctx.moveTo(x2, y2); ctx.lineTo(bx - uy * h * 0.55, by + ux * h * 0.55); ctx.lineTo(bx + uy * h * 0.55, by - ux * h * 0.55);
  ctx.closePath(); ctx.fill(); ctx.restore();
}
function ptVec3(V, p0, p1, col, a, w = 4, head = 18) {
  const q0 = ptP(V, p0), q1 = ptP(V, p1);
  ptVec(q0[0], q0[1], q1[0], q1[1], col, a * ptVis(V, p1), w, head);
}
function ptTag(s, x, y, col, a, align = 'left', size = 22, fam = F.mono) {
  txt(s, x, y, { size, fam, w: 700, c: col, a, align, ls: fam === F.mono ? 2 : 0 });
}
/* a signed value to two decimals with a true minus sign */
function ptFmt(v) {
  const s = Math.abs(v).toFixed(2);
  return (v < 0 && s !== '0.00' ? '−' : '') + s;
}
const ptDegs = d => `${Math.round(((d % 360) + 360) % 360)}°`;
/* the glass ball: a faint fill, a wireframe (far half dashed) and the cyan silhouette */
function ptBall(V, a, o = {}) {
  if (a <= 0.003) return;
  const g = ctx.createRadialGradient(V.cx - 0.35 * V.R, V.cy - 0.4 * V.R, V.R * 0.05, V.cx, V.cy, V.R);
  g.addColorStop(0, rgba(C.cyan, 0.13)); g.addColorStop(0.7, rgba(C.cyan, 0.035)); g.addColorStop(1, rgba(C.cyan, 0.09));
  ctx.save(); ctx.globalAlpha = a * (o.fill == null ? 1 : o.fill); ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(V.cx, V.cy, V.R, 0, TAU); ctx.fill(); ctx.restore();
  const wa = a * (o.wire == null ? 1 : o.wire);
  if (wa > 0.003) {
    const col = rgba(C.white, 1);
    for (const lat of (o.lats || [30, 60, 90, 120, 150])) {
      const th = lat * PT_DEG;
      ptPath(V, ptCircle([0, 0, Math.cos(th)], PT_E[0], PT_E[1], Math.sin(th), 72), col, 0.16 * wa, 1.3, { surface: true, back: 0.45 });
    }
    for (let k = 0; k < 6; k++) {
      const ph = k * 30 * PT_DEG;
      ptPath(V, ptCircle([0, 0, 0], [Math.cos(ph), Math.sin(ph), 0], PT_E[2], 1, 96), col, 0.16 * wa, 1.3, { surface: true, back: 0.45 });
    }
  }
  ring(V.cx, V.cy, V.R, C.cyan, a * (o.rim == null ? 0.6 : o.rim), 2.4);
}
/* the three axes; k = [kx, ky, kz] grow 0 → 1; o.alpha = per-axis brightness; labels x, y, z at the tips */
const PT_AX = 1.32, PT_AXN = 1.15;
function ptAxes(V, k, o = {}) {
  ['x', 'y', 'z'].forEach((name, i) => {
    const g = eo(k[i]), a = clamp(k[i] * 3) * (o.alpha ? o.alpha[i] : 1) * (o.a == null ? 1 : o.a);
    if (a <= 0.003) return;
    const e = PT_E[i], w = o.w || 3.4;
    ptPath(V, [pt3.sc(-PT_AXN * g, e), [0, 0, 0]], C.vio, a * 0.55, w);
    ptPath(V, [[0, 0, 0], pt3.sc(PT_AX * g * 0.97, e)], C.vio, a, w);
    ptVec3(V, pt3.sc(PT_AX * g * 0.8, e), pt3.sc(PT_AX * g, e), C.vio, a, w, 18);
    if (o.labels !== false && g > 0.6) {
      const q = ptP(V, pt3.sc(PT_AX * g, e)), q0 = ptP(V, [0, 0, 0]);
      const dx = q[0] - q0[0], dy = q[1] - q0[1], L = Math.hypot(dx, dy) || 1, up = Math.abs(dx) < 0.35 * L;
      /* an axis that points up is labelled beside its tip, clear of the banner above */
      const lx = up ? q[0] + 22 : q[0] + 24 * dx / L, ly = up ? q[1] + 14 : q[1] + 24 * dy / L + 11;
      txt(name, lx, ly, { size: o.size || 34, fam: PT_MATH, w: 700, align: up ? 'left' : 'center', c: PT_VIO, a: a * clamp((g - 0.6) / 0.3) });
    }
  });
}
/* the small square at the origin between two axes: they meet at a right angle */
function ptRight(V, e1, e2, s, col, a) {
  if (a <= 0.003) return;
  const quad = [[0, 0, 0], pt3.sc(s, e1), pt3.add(pt3.sc(s, e1), pt3.sc(s, e2)), pt3.sc(s, e2)].map(p => ptP(V, p));
  ctx.save(); ctx.globalAlpha = a * 0.16; ctx.fillStyle = col; ctx.beginPath();
  quad.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore();
  ptPath(V, [pt3.sc(s, e1), pt3.add(pt3.sc(s, e1), pt3.sc(s, e2)), pt3.sc(s, e2)], col, a, 2.2, { flat: true });
}
/* a 2×2 table of strings with square brackets; (x, y) = left edge, vertical centre. Returns the cell centres. */
function ptMat(x, y, ents, o = {}) {
  const size = o.size || 32, fam = o.fam || PT_MATH, a = o.a == null ? 1 : o.a;
  const W0 = Math.max(tw(ents[0], size, fam, 700), tw(ents[2], size, fam, 700), size * 0.7);
  const W1 = Math.max(tw(ents[1], size, fam, 700), tw(ents[3], size, fam, 700), size * 0.7);
  const pad = size * 0.55, gap = size * 1.0, row = o.row || size * 1.45, h = row + size * 1.3, bw = size * 0.3;
  const xR = x + 2 * pad + W0 + gap + W1;
  const cells = [[x + pad + W0 / 2, y - row / 2], [x + pad + W0 + gap + W1 / 2, y - row / 2],
    [x + pad + W0 / 2, y + row / 2], [x + pad + W0 + gap + W1 / 2, y + row / 2]];
  if (a > 0.003) {
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.bracket || C.white; ctx.lineWidth = Math.max(2.5, size * 0.08);
    ctx.beginPath();
    ctx.moveTo(x + bw, y - h / 2); ctx.lineTo(x, y - h / 2); ctx.lineTo(x, y + h / 2); ctx.lineTo(x + bw, y + h / 2);
    ctx.moveTo(xR - bw, y - h / 2); ctx.lineTo(xR, y - h / 2); ctx.lineTo(xR, y + h / 2); ctx.lineTo(xR - bw, y + h / 2);
    ctx.stroke(); ctx.restore();
    ents.forEach((s, i) => txt(s, cells[i][0], cells[i][1] + size * 0.36, { size, fam, w: 700, align: 'center', c: (o.cols && o.cols[i]) || o.c || C.white, a }));
  }
  return { cells, w: xR - x, h };
}
/* the series marker of the prelude films, under the HUD */
function ptSeries(a) {
  if (a <= 0.003) return;
  const col = mix(C.cyan, C.dim, 0.45), s = 'PRELUDE · 3/5 · ';
  txt(s, SAFE.x0, 192, { size: 18, fam: F.mono, w: 700, c: col, a: 0.95 * a, ls: 3 });
  txt('序曲', SAFE.x0 + tw(s, 18, F.mono, 700, 3), 193, { size: 18, fam: F.zh, w: 700, c: col, a: 0.95 * a, ls: 2 });
}
/* a small coloured tag: kind head on a filled block, then a label */
function ptKind(x, y, kind, a, align = 'left') {
  if (a <= 0.003) return;
  const K = { argued: [C.argued, 'ARGUED', '文献结果'], computed: [C.cyan, 'NUM', '屏幕上的计算'], lean: [C.lean, 'LEAN ✓', '内核检验'] }[kind];
  const wh = tw(K[1], 16, F.mono, 700, 2) + 20, wz = tw(K[2], 18, F.zh, 700), w = wh + 12 + wz + 14;
  const x0 = align === 'right' ? x - w : x;
  fillBox(x0, y - 22, wh, 30, K[0], a * 0.95);
  txt(K[1], x0 + 10, y - 1, { size: 16, fam: F.mono, w: 700, c: C.bg, a, ls: 2 });
  txt(K[2], x0 + wh + 12, y, { size: 18, fam: F.zh, w: 700, c: K[0], a });
}

/* ---------- the turning disc of film 2/5, as the xy plane ---------- */
function ptPlaneDisc(V, rot, a, o = {}) {
  if (a <= 0.003) return;
  const sp = o.spokes == null ? 1 : o.spokes, rimCol = o.rimCol || C.white;
  ptDisc(V, [0, 0, 0], PT_E[0], PT_E[1], 1, C.mag, a, { fill: 0.08 + 0.12 * (o.face || 0), rim: 0 });
  if (sp > 0.003) {
    const sp3 = [];
    for (let k = 0; k < 12; k++) {
      const th = rot + k * TAU / 12, u = [Math.cos(th), Math.sin(th), 0];
      sp3.push([pt3.sc(0.09, u), u]);
    }
    sp3.forEach(([p, q]) => ptPath(V, [p, q], C.white, 0.17 * a * sp, 1.5, { flat: true }));
    ptPath(V, ptCircle([0, 0, 0], PT_E[0], PT_E[1], 0.55, 72), C.white, 0.17 * a * sp, 1.5, { flat: true });
  }
  ptPath(V, ptCircle([0, 0, 0], PT_E[0], PT_E[1], 1, 96), rimCol, 0.7 * a, 2.6, { surface: o.surface });
}

/* ======================================================================= */
/*  PLANE · last time: a line opened into a turning disc. Is one plane enough? */
/* ======================================================================= */
SCENES.plane = S => {
  const u = S.u, L0 = lineAt(S, 0);
  ptSeries(1);
  /* title card during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.5) / 0.7));
  if (ta > 0) {
    const p = clamp(u / 1.4);
    txt(`${DATA.book.code} · FILM`, W / 2, 390, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 510, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 3 });
    const en = DATA.film.title.toUpperCase(), es = Math.min(40, 40 * 1500 / Math.max(1, tw(en, 40, F.orb, 900, 4)));
    txt(scramble(en, p, 13), W / 2, 596, { size: es, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  }
  const da = clamp((u - L0.s + 0.1) / 0.9);
  if (da <= 0) return;
  /* edge-on first (a segment, as at the end of film 2/5's edge view), then the eye lifts to look straight down */
  const lift = ease(Q(S, 0, 'lifting our eyes', 2.4));
  const V = ptView(960, 515, 250, lift * 90 * PT_DEG);
  const rot = ptRun(S.t);
  const face = Q(S, 1, 'one flat plane', 0.6);
  line(V.cx - V.R, V.cy, V.cx + V.R, V.cy, C.cyan, da * (1 - lift), 6);
  ptPlaneDisc(V, rot, da * clamp(lift * 4), { face });
  /* the amber arrow turning in the disc (its tip is the peg of film 2/5) */
  const tip = [Math.cos(rot), Math.sin(rot), 0], q0 = ptP(V, [0, 0, 0]), q1 = ptP(V, tip);
  ptVec(q0[0], q0[1], q1[0], q1[1], C.now, da * clamp(lift * 3), 4.5);
  ptDot(q1[0], q1[1], 13, C.now, da);
  /* labels */
  const back = Q(S, 0, 'a turning disc', 0.6) * da;
  ptTag('PRELUDE 2/5 · 以面为线', V.cx - V.R - 50, V.cy - V.R + 40, PT_LABEL, back, 'right', 20, F.zh);
  ptTag('a turning disc', V.cx - V.R - 50, V.cy - V.R + 72, PT_LABEL, back, 'right', 20);
  ptTag('one plane · 一张平面', V.cx - V.R - 50, V.cy + 10, C.mag, face, 'right', 28, F.zh);
  const qa = Q(S, 1, 'enough for a qubit', 0.7);
  if (qa > 0) {
    txt('?', V.cx + V.R + 170, V.cy + 60, { size: 190, fam: F.orb, w: 900, align: 'center', c: C.white, a: qa, ab: 3 });
    chip(V.cx + V.R + 170, V.cy + 170, 380, 54, 'a qubit? · 一个量子比特？', C.white, qa, 24, F.zh);
  }
};

/* ======================================================================= */
/*  AXES · three axes, three planes, and every unit arrow ending on a sphere  */
/* ======================================================================= */
/* the sweep of AXES: a spiral from north to south whose samples are spread evenly over the sphere */
const PT_SPIRAL = [];
for (let i = 0; i < PT.spiral; i++) {
  const s = (i + 0.5) / PT.spiral;
  PT_SPIRAL.push({ s, p: ptSph(Math.acos(1 - 2 * s), PT.turns * TAU * s) });
}
const ptSweep = s => ptSph(Math.acos(1 - 2 * s), PT.turns * TAU * s);
SCENES.axes = S => {
  const u = S.u, fade = clamp((S.d - u) / 0.5);
  ptSeries(1);
  const k = ease(clamp((u - 0.1) / 2.6));                     // the eye tilts from straight down to 22°
  const V = ptView(lerp(960, 700, k), lerp(515, 532, k), lerp(250, 265, k), lerp(90 * PT_DEG, PT.el, k));
  const rot = ptRun(S.t);
  const kx = Q(S, 0, 'measured', 0.9), ky = Q(S, 0, 'three directions', 0.9), kz = Q(S, 0, 'all at right angles', 0.9);
  const sweep0 = phraseAt(S, 2, 'Every arrow'), sweepT = Math.max(3.4, lineAt(S, 2).e - sweep0 + 0.5);
  const sw = clamp((u - sweep0) / sweepT);
  const dimP = 1 - 0.65 * Q(S, 2, 'Every arrow', 0.8);       // the planes step back for the sphere
  const ballA = clamp((sw - 0.55) / 0.45) * fade;
  /* the sphere, once the sweep has covered it */
  ptBall(V, ballA, { wire: 1 });
  /* the three coordinate planes: xy is the disc we came with; yz and zx join it */
  const pyz = Q(S, 1, 'three planes', 0.7), pzx = Q(S, 1, 'three planes', 0.7, 0.5);
  const cross = Q(S, 1, 'all crossing', 0.5) * (1 - Q(S, 2, 'Every arrow', 0.6));
  ptDisc(V, [0, 0, 0], PT_E[1], PT_E[2], 1, C.mag, pyz * fade * dimP, { fill: 0.09, surface: true, w: 2 });
  ptDisc(V, [0, 0, 0], PT_E[2], PT_E[0], 1, C.mag, pzx * fade * dimP, { fill: 0.09, surface: true, w: 2 });
  ptPlaneDisc(V, rot, fade * dimP, { spokes: 1 - k, rimCol: mix(C.white, C.mag, k), surface: true, face: 0 });
  /* the arrow of film 2/5 hands over to the axes */
  const arr = (1 - kx) * fade;
  if (arr > 0) {
    const q0 = ptP(V, [0, 0, 0]), q1 = ptP(V, [Math.cos(rot), Math.sin(rot), 0]);
    ptVec(q0[0], q0[1], q1[0], q1[1], C.now, arr, 4.5);
    ptDot(q1[0], q1[1], 13, C.now, arr);
  }
  ptAxes(V, [kx, ky, kz], { a: fade, w: 3.4 + 3 * cross });
  const ra = Q(S, 0, 'all at right angles', 0.6, 0.5) * (1 - Q(S, 2, 'Every arrow', 0.6)) * fade;
  ptRight(V, PT_E[0], PT_E[1], 0.2, C.white, 0.85 * ra);
  ptRight(V, PT_E[1], PT_E[2], 0.2, C.white, 0.85 * ra);
  ptRight(V, PT_E[2], PT_E[0], 0.2, C.white, 0.85 * ra);
  /* the sweep: one amber unit arrow, its tip leaving white dots */
  if (sw > 0) {
    for (const d of PT_SPIRAL) {
      if (d.s > sw) break;
      const q = ptP(V, d.p), front = q[2] >= 0;
      ctx.save(); ctx.globalAlpha = fade * (front ? 0.85 : 0.3) * (1 - 0.6 * ballA); ctx.fillStyle = C.white;
      ctx.beginPath(); ctx.arc(q[0], q[1], front ? 3.2 : 2.2, 0, TAU); ctx.fill(); ctx.restore();
    }
    const live = (1 - clamp((sw - 0.98) / 0.02)) * fade;
    if (live > 0) {
      const p = ptSweep(sw), q0 = ptP(V, [0, 0, 0]), q1 = ptP(V, p);
      ptVec(q0[0], q0[1], q1[0], q1[1], C.now, live * (q1[2] >= 0 ? 1 : 0.55), 4);
      ptDot(q1[0], q1[1], 10, C.now, live);
    }
  }
  /* the sphere is lit while the literature sentence is on screen */
  const lit = Q(S, 3, 'pure qubit state', 0.8) * fade;
  if (lit > 0) {
    ctx.save(); ctx.globalAlpha = 0.1 * lit; ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(V.cx, V.cy, V.R, 0, TAU); ctx.fill(); ctx.restore();
    ring(V.cx, V.cy, V.R, C.cyan, 0.5 * lit, 5);
  }
  /* the right column: three axes, three planes, one sphere */
  const X0 = 1480;
  chip(X0, 262, 360, 52, '3 axes · 三根轴', PT_VIO, kz * fade, 26, F.zh);
  chip(X0, 336, 360, 52, '3 planes · 三张平面', C.mag, pzx * fade, 26, F.zh);
  const qs = Q(S, 2, 'ends on a sphere', 0.6) * fade;
  chip(X0, 410, 360, 52, '1 sphere · 一颗球', C.cyan, qs, 26, F.zh);
  txt('x² + y² + z² = 1', X0, 492, { size: 40, fam: PT_MATH, w: 700, align: 'center', c: C.cyan, a: qs });
  ptTag('length one · 长度为 1', X0, 530, PT_LABEL, qs, 'center', 20, F.zh);
  /* the literature sentence, badged ARGUED */
  const ql = Q(S, 3, 'Standard theory', 0.6) * fade;
  badge(ql, 'argued');
  const qr = Q(S, 3, 'a literature result', 0.6) * fade;
  if (ql > 0) {
    const x = 1170, y = 580;
    panel(x, y, 620, 210, ql, C.argued, 'LITERATURE · 文献');
    txt('single qubit: pure states ↔ points of this sphere', x + 24, y + 76, { size: 24, fam: F.disp, w: 700, c: C.white, a: ql });
    txt('单量子比特的纯态 ↔ 这颗球面上的点', x + 24, y + 114, { size: 24, fam: F.zh, w: 700, c: C.white, a: ql });
    txt('literature result · not formalized in this book', x + 24, y + 156, { size: 22, fam: F.disp, w: 700, c: PT_VIO, a: qr });
    txt('文献结果 · 未在本书形式化', x + 24, y + 190, { size: 21, fam: F.zh, w: 700, c: PT_VIO, a: qr });
  }
};

/* ======================================================================= */
/*  TABLE · each point has its own 2×2 readout table B(v)                    */
/* ======================================================================= */
SCENES.table = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  ptSeries(1);
  const V = ptView(560, 532, 240);
  ptBall(V, fade, { wire: 0.9 });
  ptAxes(V, [1, 1, 1], { a: fade * 0.9, size: 30 });
  /* top banner: green while the cited formula is the new thing on screen, then NUM for the arithmetic */
  const qf = Q(S, 0, 'two-by-two table', 0.6) * fade;
  badge(qf * (1 - Q(S, 1, 'The north pole', 0.3)), 'lean');
  badge(Q(S, 1, 'The north pole', 0.4, 0.35) * fade, 'computed');
  /* the formula of B_formula_core */
  const fx = 950, fy = 190;
  if (qf > 0) {
    panel(fx, fy, 840, 222, qf, C.lean, 'LEAN ✓ · B_formula_core');
    txt('B(x, y, z) =', fx + 34, fy + 128, { size: 40, fam: PT_MATH, w: 700, c: C.white, a: qf });
    ptMat(fx + 300, fy + 116, ['z', 'x − iy', 'x + iy', '−z'], { size: 38, a: qf, c: C.lean, bracket: C.lean, row: 52 });
    txt('x = a₀ · y = a₁ · z = a₂ in the Lean statement', fx + 34, fy + 204, { size: 17, fam: PT_MATH, w: 700, c: PT_LABEL, a: qf });
  }
  /* a point wandering over the sphere: each point has its own table */
  const tN = phraseAt(S, 1, 'The north pole');
  const wa = Q(S, 0, 'Each point', 0.6) * (1 - clamp((u - tN) / 0.5)) * fade;
  if (wa > 0) {
    const p = ptSph(1.0 + 0.32 * Math.sin(0.9 * u), -0.6 + 0.85 * Math.sin(0.5 * u)), q = ptP(V, p);
    ptDot(q[0], q[1], 12, C.now, wa);
    ctx.save(); ctx.setLineDash([6, 8]); line(q[0] + 14, q[1], fx - 8, fy + 116, C.white, 0.4 * wa * qf, 1.6); ctx.restore();
    ptTag('v', q[0] + 18, q[1] - 14, C.now, wa, 'left', 28, PT_MATH);
  }
  /* the north pole and the point on the x axis */
  const tX = phraseAt(S, 1, 'the point on the x axis'), tM = phraseAt(S, 2, 'Multiply');
  const aN = Q(S, 1, 'The north pole', 0.5) * fade, aX = Q(S, 1, 'the point on the x axis', 0.5) * fade;
  const off = 1 - 0.75 * clamp((u - tM) / 0.6);
  const qN = ptP(V, [0, 0, 1]), qX = ptP(V, [1, 0, 0]);
  const nowN = u < tX ? 1 : 0;
  if (aN > 0) {
    ptDot(qN[0], qN[1], 12, nowN ? C.now : C.white, aN * off);
    const pop = Q(S, 1, 'The north pole', 0.9);
    ring(qN[0], qN[1], 14 + 30 * pop, C.now, (1 - pop) * aN, 2.5);
    ptTag('N', qN[0] - 22, qN[1] - 14, nowN ? C.now : C.white, aN * off, 'right', 26, PT_MATH);
    ptTag('Z', qN[0] + 26, qN[1] + 12, nowN ? C.now : C.white, Q(S, 1, 'called Z', 0.5) * off * fade, 'left', 32, PT_MATH);
  }
  if (aX > 0) {
    ptDot(qX[0], qX[1], 12, C.now, aX * off);
    const pop = Q(S, 1, 'the point on the x axis', 0.9);
    ring(qX[0], qX[1], 14 + 30 * pop, C.now, (1 - pop) * aX, 2.5);
    ptTag('X', qX[0] - 22, qX[1] + 34, C.now, Q(S, 1, 'gives X', 0.5) * off * fade, 'right', 32, PT_MATH);
  }
  /* the two tables, computed from the formula */
  const p1 = Math.max(aN, 0) * (1 - clamp((u - tM) / 0.5));
  const lx = 950, ly = 440;
  if (p1 > 0) {
    panel(lx, ly, 840, 400, p1, C.cyan, 'TWO POINTS · 两个点');
    const r1 = aN * (1 - clamp((u - tM) / 0.5)), r2 = aX * (1 - clamp((u - tM) / 0.5));
    ptDot(lx + 40, ly + 128, 10, nowN ? C.now : C.white, r1);
    txt('N = (0, 0, 1)', lx + 66, ly + 140, { size: 32, fam: PT_MATH, w: 700, c: C.white, a: r1 });
    txt('→', lx + 330, ly + 140, { size: 34, fam: PT_MATH, w: 700, c: PT_LABEL, a: r1 });
    const m1 = ptMat(lx + 400, ly + 128, PT_SHOW.bN, { size: 34, a: r1, row: 48 });
    txt('= Z', lx + 428 + m1.w, ly + 141, { size: 40, fam: PT_MATH, w: 900, c: nowN ? C.now : C.white, a: Q(S, 1, 'called Z', 0.5) * r1 / Math.max(aN, 1e-6) });
    ptDot(lx + 40, ly + 298, 10, C.now, r2);
    txt('(1, 0, 0)', lx + 66, ly + 310, { size: 32, fam: PT_MATH, w: 700, c: C.white, a: r2 });
    txt('→', lx + 330, ly + 310, { size: 34, fam: PT_MATH, w: 700, c: PT_LABEL, a: r2 });
    const m2 = ptMat(lx + 400, ly + 298, PT_SHOW.bX, { size: 34, a: r2, row: 48 });
    txt('= X', lx + 428 + m2.w, ly + 311, { size: 40, fam: PT_MATH, w: 900, c: C.now, a: Q(S, 1, 'gives X', 0.5) * r2 / Math.max(aX, 1e-6) });
  }
  /* one table squared: v = (2/3, 1/3, 2/3) */
  const p2 = Q(S, 2, 'Multiply', 0.6) * fade;
  if (p2 > 0) {
    const qv = ptP(V, [2 / 3, 1 / 3, 2 / 3]);
    ptDot(qv[0], qv[1], 12, C.now, p2);
    ptTag('v', qv[0] + 18, qv[1] - 12, C.now, p2, 'left', 30, PT_MATH);
    panel(lx, ly, 840, 400, p2, C.cyan, 'ONE TABLE, TIMES ITSELF · 自己乘自己');
    txt(`v = ${PT_SHOW.v}`, lx + 30, ly + 82, { size: 30, fam: PT_MATH, w: 700, c: C.now, a: p2 });
    txt(`x² + y² + z² = ${PT_SHOW.sq}`, lx + 30, ly + 128, { size: 26, fam: PT_MATH, w: 700, c: C.white, a: p2 });
    txt('B(v) =', lx + 30, ly + 222, { size: 30, fam: PT_MATH, w: 700, c: C.white, a: p2 });
    ptMat(lx + 150, ly + 211, PT_SHOW.bV, { size: 28, a: p2, row: 44 });
    const p3 = Q(S, 2, 'by itself', 0.6) * fade;
    txt('B(v) · B(v) =', lx + 30, ly + 335, { size: 30, fam: PT_MATH, w: 700, c: C.white, a: p3 });
    const mI = ptMat(lx + 260, ly + 324, PT_SHOW.bV2, { size: 30, a: p3, row: 44 });
    const p4 = Q(S, 2, 'the identity', 0.6) * fade;
    txt('= I', lx + 284 + mI.w, ly + 335, { size: 38, fam: PT_MATH, w: 900, c: C.white, a: p4 });
    ptTag('identity · 单位表', lx + 360 + mI.w, ly + 334, PT_LABEL, p4, 'left', 20, F.zh);
    const p5 = Q(S, 2, 'ones on the diagonal', 0.6) * fade;
    for (const i of [0, 3]) ring(mI.cells[i][0], mI.cells[i][1], 24, C.cyan, p5, 2.5);
  }
};

/* ======================================================================= */
/*  ADDRESS · two angles; a fixed tilt walks a latitude; 90° is the equator */
/* ======================================================================= */
/* the tilt θ and turn φ (degrees) as functions of the scene time */
function ptAddress(S) {
  const u = S.u;
  const tTilt = phraseAt(S, 0, 'tilt down from the north');
  const tTurn = Math.max(phraseAt(S, 0, 'then turn around'), tTilt + 1.7);
  const tSweep = Math.max(phraseAt(S, 1, 'only turn'), tTurn + 1.5);
  const tRaise = Math.max(phraseAt(S, 2, 'Only at ninety degrees'), tSweep + PT.sweep + 0.2);
  const tOnce = Math.max(phraseAt(S, 3, 'Going around once'), tRaise + 2.2);
  const raise = ease(clamp((u - tRaise) / 2.0));
  const th = PT.lat * ease(clamp((u - tTilt) / 1.6)) + (90 - PT.lat) * raise;
  const sweep = ease(clamp((u - tSweep) / PT.sweep));
  const once = ease(clamp((u - tOnce) / 4.0));
  const ph = PT.phi0 + 40 * ease(clamp((u - tTurn) / 1.4)) + 360 * sweep + 360 * once;
  return { th, ph, sweep, raise, once, tSweep, tRaise };
}
SCENES.address = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  ptSeries(1);
  badgeQ(S, [[0, null, 'computed']]);
  const V = ptView(700, 540, 270);
  const A = ptAddress(S), th = A.th * PT_DEG, ph = A.ph * PT_DEG, lat = PT.lat * PT_DEG;
  ptBall(V, fade, { wire: 0.75, lats: [30, 60, 120, 150] });
  ptAxes(V, [1, 1, 1], { a: fade, alpha: [0.35, 0.35, 1], size: 30 });
  /* the latitude at 50°: drawn as the point sweeps it, then whole; its plane and its centre on the axis */
  const latPts = ptCircle([0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), 120);
  if (A.sweep > 0) {
    const a0 = (PT.phi0 + 40) * PT_DEG, n = Math.max(2, Math.round(120 * A.sweep));
    const done = ptCircle([0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), n, a0, a0 + TAU * A.sweep);
    ptPath(V, done, C.cyan, fade * (A.sweep >= 1 ? 0 : 1), 4, { surface: true });
    if (A.sweep >= 1) ptPath(V, latPts, C.cyan, fade * (1 - 0.45 * A.raise), 4, { surface: true });
  }
  const qPlane = Q(S, 1, 'a latitude', 0.8) * fade;
  ptDisc(V, [0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), C.cyan, qPlane * (1 - 0.6 * A.raise), { fill: 0.1, rim: 0 });
  /* the circle at the current tilt while it rises; at 90° it is the magenta equator */
  if (A.raise > 0) {
    const k = clamp((A.th - PT.lat) / (90 - PT.lat)), col = mix(C.cyan, C.mag, k);
    ptPath(V, ptCircle([0, 0, Math.cos(th)], PT_E[0], PT_E[1], Math.sin(th), 120), col, fade, 4, { surface: true });
  }
  const qEq = Q(S, 2, 'its plane', 0.8) * clamp(A.raise * 50 - 49) * fade;
  ptDisc(V, [0, 0, 0], PT_E[0], PT_E[1], 1, C.mag, qEq, { fill: 0.13, rim: 0 });
  /* the centre of the sphere: the latitude's plane misses it, the equator's plane holds it */
  const qc = Q(S, 1, 'a latitude', 0.6) * fade, q0 = ptP(V, [0, 0, 0]);
  ptDot(q0[0], q0[1], 7, C.white, qc);
  ptTag('centre · 球心', q0[0] - 16, q0[1] + 34, C.white, qc * (1 - 0.4 * A.raise), 'right', 20, F.zh);
  /* radius and height of the current circle */
  const qr = Q(S, 1, 'a small circle', 0.6) * fade;
  const P = ptSph(th, ph), Hc = [0, 0, Math.cos(th)];
  if (qr > 0) {
    ptPath(V, [[0, 0, 0], Hc], C.cyan, qr, 7, { flat: true });
    const qh = ptP(V, Hc), qp = ptP(V, P);
    ctx.save(); ctx.setLineDash([7, 7]); line(qh[0], qh[1], qp[0], qp[1], C.cyan, 0.9 * qr, 2.4); ctx.restore();
    ptDot(qh[0], qh[1], 6, C.cyan, qr);
    const lab = qr * (1 - Q(S, 2, 'Only at ninety degrees', 0.5));
    ptTag('height', q0[0] + 16, (q0[1] + qh[1]) / 2 + 6, C.cyan, lab, 'left', 18);
    ptTag('radius', (qh[0] + qp[0]) / 2, (qh[1] + qp[1]) / 2 - 14, C.cyan, lab, 'center', 18);
  }
  /* the tilt θ: an arc from the vertical axis down to the point */
  const qt = Q(S, 0, 'tilt down from the north', 0.5) * (1 - Q(S, 1, 'only turn', 0.6)) * fade;
  if (qt > 0 && th > 2 * PT_DEG) {
    const arc = [];
    for (let i = 0; i <= 30; i++) arc.push(pt3.sc(0.3, ptSph(th * i / 30, ph)));
    ptPath(V, [[0, 0, 0], P], C.now, 0.7 * qt, 2, { flat: true });
    ptPath(V, arc, C.now, qt, 3, { flat: true });
    const ql = ptP(V, pt3.sc(0.46, ptSph(th / 2, ph)));
    txt('θ', ql[0], ql[1] + 10, { size: 32, fam: PT_MATH, w: 700, align: 'center', c: C.now, a: qt });
  }
  /* the turn φ: counted from the x axis, an arc in the xy plane out to the foot of the point */
  const qph = Q(S, 0, 'then turn around', 0.5) * (1 - Q(S, 1, 'only turn', 0.6)) * fade;
  if (qph > 0) {
    const foot = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), 0];
    const qf0 = ptP(V, [0, 0, 0]), qf1 = ptP(V, foot), qpp = ptP(V, P);
    ctx.save(); ctx.setLineDash([6, 7]);
    line(qf0[0], qf0[1], qf1[0], qf1[1], C.white, 0.55 * qph, 1.8); line(qf1[0], qf1[1], qpp[0], qpp[1], C.white, 0.55 * qph, 1.8);
    ctx.restore();
    const arc = [], f0 = PT.phi0 * PT_DEG;
    for (let i = 0; i <= 24; i++) { const f = f0 + (ph - f0) * i / 24; arc.push([0.42 * Math.cos(f), 0.42 * Math.sin(f), 0]); }
    if (ph - f0 > 2 * PT_DEG) {
      ptPath(V, arc, C.now, qph, 3, { flat: true });
      const qm = ptP(V, [0.6 * Math.cos((f0 + ph) / 2), 0.6 * Math.sin((f0 + ph) / 2), 0]);
      txt('φ', qm[0], qm[1] + 12, { size: 30, fam: PT_MATH, w: 700, align: 'center', c: C.now, a: qph });
    }
  }
  /* the north pole and the current point */
  const qN = ptP(V, [0, 0, 1]);
  ptTag('N', qN[0] - 18, qN[1] - 12, C.white, fade, 'right', 26, PT_MATH);
  const pa = Q(S, 0, 'two angles', 0.5) * fade, qp = ptP(V, P);
  ptDot(qp[0], qp[1], 13, C.now, pa * (qp[2] >= -1e-6 ? 1 : 0.55));
  /* labels of the two circles */
  const ll = Q(S, 1, 'a latitude', 0.6) * fade * (1 - 0.5 * A.raise);
  const lq = ptP(V, ptSph(lat, 200 * PT_DEG));
  ptTag('latitude · 纬圈', lq[0] - 20, lq[1] - 14, C.cyan, ll, 'right', 24, F.zh);
  const le = Q(S, 2, 'the equator', 0.6) * fade, eq = ptP(V, ptSph(Math.PI / 2, -100 * PT_DEG));
  ptTag('equator · 赤道', eq[0] - 26, eq[1] + 58, C.mag, le, 'right', 24, F.zh);
  /* readout */
  const x = 1190, y = 215, ra = pa;
  if (ra > 0) {
    panel(x, y, 600, 300, ra, C.cyan, 'ADDRESS · 地址');
    const exact90 = Math.abs(A.th - 90) < 1e-9;
    txt(`θ = ${Math.round(A.th)}°`, x + 28, y + 86, { size: 36, fam: PT_MATH, w: 700, c: C.now, a: ra });
    ptTag('tilt from north · 下倾', x + 572, y + 84, PT_LABEL, ra, 'right', 19, F.zh);
    const qphi = Q(S, 0, 'then turn around', 0.5) * fade;
    txt(`φ = ${ptDegs(A.ph)}`, x + 28, y + 144, { size: 36, fam: PT_MATH, w: 700, c: C.now, a: qphi });
    ptTag('turn about z · 绕竖轴', x + 572, y + 142, PT_LABEL, qphi, 'right', 19, F.zh);
    const col = exact90 ? C.mag : C.cyan;
    txt(exact90 ? 'radius = sin θ = 1' : `radius = sin θ ≈ ${ptFmt(Math.sin(th))}`, x + 28, y + 210, { size: 30, fam: PT_MATH, w: 700, c: col, a: qr });
    txt(exact90 ? 'height = cos θ = 0' : `height = cos θ ≈ ${ptFmt(Math.cos(th))}`, x + 28, y + 262, { size: 30, fam: PT_MATH, w: 700, c: col, a: qr });
  }
  /* the two statements of the scene */
  const qs = Q(S, 2, 'through the centre', 0.6) * fade;
  if (qs > 0) {
    panel(x, 560, 600, 104, qs, C.mag);
    txt('θ = 90°: plane through the centre', x + 26, 600, { size: 23, fam: PT_MATH, w: 700, c: C.mag, a: qs });
    txt('赤道是大圆：所在平面经过球心', x + 26, 642, { size: 24, fam: F.zh, w: 700, c: C.white, a: qs });
  }
  const qo = Q(S, 3, 'Going around once', 0.6) * fade;
  chip(x + 300, 728, 600, 58, 'one turn ≠ the whole sphere · 绕一圈 ≠ 走遍球面', C.white, qo, 24, F.zh);
};

/* ======================================================================= */
/*  ORDER · two quarter turns in either order end 90° apart; ZX = −XZ        */
/* ======================================================================= */
function ptOrder(S) {
  const u = S.u;
  const tA1 = phraseAt(S, 1, 'A quarter turn about x'), tA2 = Math.max(phraseAt(S, 1, 'then about z'), tA1 + 1.5);
  const tB1 = phraseAt(S, 2, 'Swap the order'), tB2 = tB1 + 1.3;
  return {
    a1: ease(clamp((u - tA1) / 1.4)), a2: ease(clamp((u - tA2) / 1.4)),
    b1: ease(clamp((u - tB1) / 1.2)), b2: ease(clamp((u - tB2) / 1.4)), tA2, tB1
  };
}
const PT_NP = [0, 0, 1];
/* path A: x first, then z; path B: z first (N stays put), then x */
const ptLegA1 = t => pt3.rot(PT_E[0], t * Math.PI / 2, PT_NP);
const ptLegA2 = t => pt3.rot(PT_E[2], t * Math.PI / 2, ptLegA1(1));
const ptLegB2 = t => pt3.rot(PT_E[0], t * Math.PI / 2, pt3.rot(PT_E[2], Math.PI / 2, PT_NP));
const ptTrack = (f, t, n = 40) => { const out = []; for (let i = 0; i <= n; i++) out.push(f(t * i / n)); return out; };
/* a small turning arrow round an axis near its tip: the right-hand sense of a positive turn */
function ptTurnGlyph(V, e, col, a, spin = 0, at = 1.2) {
  if (a <= 0.003) return;
  const c = pt3.sc(at, e), u0 = e[2] ? PT_E[0] : PT_E[2], v0 = pt3.cross(e, u0);
  const pts = ptCircle(c, u0, v0, 0.13, 40, spin, spin + 1.6 * Math.PI);
  ptPath(V, pts, col, a, 3, { flat: true });
  const q1 = ptP(V, pts[pts.length - 3]), q2 = ptP(V, pts[pts.length - 1]);
  ptVec(q1[0], q1[1], q2[0], q2[1], col, a, 3, 14);
}
SCENES.order = S => {
  const u = S.u, fade = clamp(u / 0.4) * clamp((S.d - u) / 0.5);
  ptSeries(1);
  badge(fade * clamp(u / 0.8) * (1 - Q(S, 3, 'minus X times Z', 0.3)), 'computed');
  badge(Q(S, 3, 'minus X times Z', 0.5, 0.35) * fade, 'lean');
  const V = ptView(640, 536, 260);
  const O = ptOrder(S);
  ptBall(V, fade, { wire: 0.8 });
  const qa = Q(S, 0, 'two turns', 0.6);
  ptAxes(V, [1, 1, 1], { a: fade, alpha: [lerp(0.6, 1, qa), 0.4, lerp(0.6, 1, qa)], size: 30, w: 3.4 + qa * 1.2 });
  const qg = qa * (1 - Q(S, 3, 'The readout tables', 0.5)) * fade;
  ptTurnGlyph(V, PT_E[0], PT_VIO, qg, 0.8, 1.24);
  ptTurnGlyph(V, PT_E[2], PT_VIO, qg, 0.4, 1.14);
  const qN = ptP(V, PT_NP), qX = ptP(V, [1, 0, 0]), qY = ptP(V, [0, -1, 0]), q0 = ptP(V, [0, 0, 0]);
  /* path A (amber while it is the current step, white once B starts) */
  const aCol = mix(C.now, C.white, clamp((u - O.tB1) / 0.6)), aA = fade * (1 - 0.35 * clamp((u - O.tB1) / 0.6));
  if (O.a1 > 0) ptPath(V, ptTrack(ptLegA1, O.a1), aCol, aA, 5, { surface: true, solidBack: true });
  if (O.a2 > 0) ptPath(V, ptTrack(ptLegA2, O.a2), aCol, aA, 5, { surface: true, solidBack: true });
  const stepA = Q(S, 1, 'A quarter turn about x', 0.5) * (1 - clamp((u - O.tB1) / 0.6)) * fade;
  const m1 = ptP(V, ptLegA1(0.5)), m2 = ptP(V, ptLegA2(0.5));
  ptTag('① about x', m1[0] - 26, m1[1], C.white, stepA * clamp(O.a1 * 3), 'right', 20);
  ptTag('② about z', m2[0], m2[1] + 40, C.white, stepA * clamp(O.a2 * 3), 'center', 20);
  /* path B: the turn about z leaves N where it is, then the turn about x */
  if (O.b1 > 0) {
    const sa = Math.sin(Math.PI * O.b1) * fade;
    ring(qN[0], qN[1], 26, C.now, 0.9 * sa, 3);
    ptVec(qN[0] + 26 * Math.cos(-0.3 + 5 * O.b1), qN[1] + 26 * Math.sin(-0.3 + 5 * O.b1), qN[0] + 26 * Math.cos(0.1 + 5 * O.b1), qN[1] + 26 * Math.sin(0.1 + 5 * O.b1), C.now, sa, 3, 12);
    ptTag('① about z: N stays', qN[0] + 40, qN[1] - 30, C.white, Q(S, 2, 'Swap the order', 0.4) * (1 - Q(S, 3, 'The readout tables', 0.5)) * fade, 'left', 20);
  }
  if (O.b2 > 0) ptPath(V, ptTrack(ptLegB2, O.b2), C.now, fade, 5, { surface: true, solidBack: true });
  const stepB = Q(S, 2, 'Swap the order', 0.5) * clamp(O.b2 * 3) * (1 - Q(S, 3, 'The readout tables', 0.5)) * fade;
  const m3 = ptP(V, ptLegB2(0.55));
  ptTag('② about x', m3[0] - 26, m3[1] + 6, C.white, stepB, 'right', 20);
  /* the right angle between the two ends */
  const qr = Q(S, 2, 'a right angle away', 0.6) * fade;
  if (qr > 0) {
    const eq = []; for (let i = 0; i <= 30; i++) eq.push(ptSph(Math.PI / 2, -Math.PI / 2 * (1 - i / 30)));
    ptPath(V, eq, C.white, qr, 3.5, { surface: true });
    ctx.save(); ctx.setLineDash([7, 7]);
    line(q0[0], q0[1], qX[0], qX[1], C.white, 0.7 * qr, 2); line(q0[0], q0[1], qY[0], qY[1], C.white, 0.7 * qr, 2);
    ctx.restore();
    ptRight(V, PT_E[0], [0, -1, 0], 0.15, C.white, qr);
    const qm = ptP(V, ptSph(Math.PI / 2, -Math.PI / 4));
    ptTag('90°', qm[0], qm[1] + 44, C.white, qr, 'center', 28, PT_MATH);
  }
  /* the points: N and the two ends; amber marks only the current point */
  const curN = O.a1 === 0 || (u >= O.tB1 && O.b2 === 0);
  ptDot(qN[0], qN[1], 12, curN ? C.now : C.white, fade);
  ptTag('N', qN[0] - 28, qN[1] + 9, C.white, fade, 'right', 26, PT_MATH);
  if (O.a1 > 0 && O.a2 < 1) {
    const q = ptP(V, O.a2 > 0 ? ptLegA2(O.a2) : ptLegA1(O.a1));
    ptDot(q[0], q[1], 13, C.now, fade);
  }
  const endA = clamp((u - Math.max(phraseAt(S, 1, 'lands on the x axis'), O.tA2 + 1.4)) / 0.5) * fade, ca = u >= O.tB1 ? C.white : C.now;
  if (O.a2 >= 1) ptDot(qX[0], qX[1], 13, ca, fade);
  if (endA > 0) {
    ring(qX[0], qX[1], 24, ca, endA * 0.9, 2.5);
    ptTag('A', qX[0] - 26, qX[1] + 46, ca, endA, 'right', 32, F.orb);
  }
  if (O.b2 > 0) {
    const q = ptP(V, ptLegB2(O.b2));
    ptDot(q[0], q[1], 13, C.now, fade);
  }
  const endB = Q(S, 2, 'somewhere else', 0.5) * clamp((O.b2 - 0.95) * 20) * fade;
  if (endB > 0) {
    ring(qY[0], qY[1], 24, C.now, endB * 0.9, 2.5);
    ptTag('B', qY[0] - 26, qY[1] + 46, C.now, endB, 'right', 32, F.orb);
  }
  /* the readout tables on the sphere: Z at N, X at the x axis */
  const qt = Q(S, 3, 'The readout tables', 0.6) * fade;
  ptTag('Z', qN[0] + 26, qN[1] + 12, C.white, qt, 'left', 30, PT_MATH);
  ptTag('X', qX[0] + 30, qX[1] - 18, C.white, qt, 'left', 30, PT_MATH);
  /* right column: the two orders, then the readout tables */
  const x = 1120, y = 215;
  const swap = Q(S, 3, 'feel the order', 0.4), p1 = Q(S, 1, 'A quarter turn about x', 0.6) * (1 - swap) * fade;
  if (p1 > 0) {
    panel(x, y, 670, 330, p1, C.cyan, 'TWO ORDERS · 两种顺序');
    txt('A', x + 28, y + 92, { size: 34, fam: F.orb, w: 900, c: O.b1 > 0 ? C.white : C.now, a: p1 });
    txt(`x, then z  →  ${PT_SHOW.aEnd}`, x + 80, y + 90, { size: 28, fam: PT_MATH, w: 700, c: C.white, a: p1 * Q(S, 1, 'lands on the x axis', 0.5) });
    txt('先绕 x，再绕 z', x + 80, y + 126, { size: 21, fam: F.zh, w: 700, c: PT_LABEL, a: p1 });
    const pb = Q(S, 2, 'Swap the order', 0.5) * p1;
    txt('B', x + 28, y + 192, { size: 34, fam: F.orb, w: 900, c: C.now, a: pb });
    txt(`z, then x  →  ${PT_SHOW.bEnd}`, x + 80, y + 190, { size: 28, fam: PT_MATH, w: 700, c: C.white, a: endB > 0 ? pb : 0 });
    txt('先绕 z，再绕 x', x + 80, y + 226, { size: 21, fam: F.zh, w: 700, c: PT_LABEL, a: pb });
    txt(`${PT_SHOW.aEnd} · ${PT_SHOW.bEnd} = ${PT_SHOW.dotAB}  →  90°`, x + 28, y + 296, { size: 25, fam: PT_MATH, w: 700, c: C.white, a: qr * p1 });
  }
  const p2 = Q(S, 3, 'feel the order', 0.5, 0.4) * fade;
  if (p2 > 0) {
    panel(x, y, 670, 430, p2, C.cyan, 'READOUT TABLES · 读数表');
    txt('Z = table at N · X = table at (1, 0, 0)', x + 28, y + 70, { size: 19, fam: PT_MATH, w: 700, c: PT_LABEL, a: p2 });
    const pz = Q(S, 3, 'Z times X', 0.6) * fade;
    txt('Z · X =', x + 28, y + 156, { size: 34, fam: PT_MATH, w: 700, c: C.white, a: pz });
    ptMat(x + 190, y + 144, PT_SHOW.zx, { size: 32, a: pz, row: 46 });
    txt('X · Z =', x + 360, y + 156, { size: 34, fam: PT_MATH, w: 700, c: C.white, a: pz });
    ptMat(x + 522, y + 144, PT_SHOW.xz, { size: 32, a: pz, row: 46 });
    ptKind(x + 28, y + 252, 'computed', pz * 0.9);
    const pm = Q(S, 3, 'minus X times Z', 0.6) * fade;
    if (pm > 0) {
      ctx.save(); ctx.globalAlpha = pm; cutPath(x + 24, y + 290, 622, 110, 12); ctx.fillStyle = rgba(C.lean, 0.1); ctx.fill();
      ctx.strokeStyle = C.lean; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
      txt('Z · X = −(X · Z)', x + 52, y + 362, { size: 44, fam: PT_MATH, w: 900, c: C.lean, a: pm });
      ptKind(x + 630, y + 336, 'lean', pm, 'right');
      ptTag('qubit_weyl_star', x + 628, y + 382, C.lean, pm * 0.85, 'right', 17);
    }
  }
  /* the one Lean sentence of the film: both green results, by their names at the pinned commit */
  const ql = Q(S, 4, 'The green results', 0.7) * fade;
  leanList(x - 20, 712, ql, { size: 17, gap: 40 });
};

/* ======================================================================= */
/*  RECAP · three takeaways, the next question, the card                     */
/* ======================================================================= */
function ptIcon(i, cx, cy, a) {
  if (a <= 0.003) return;
  const V = ptView(cx, cy, 52);
  ring(cx, cy, 52, C.cyan, 0.6 * a, 2);
  if (i === 0) {
    ptDisc(V, [0, 0, 0], PT_E[0], PT_E[1], 1, C.mag, a, { fill: 0.15, rim: 0.7, w: 1.6 });
    ptAxes(V, [1, 1, 1], { a, labels: false, w: 2.4 });
  } else if (i === 1) {
    const lat = PT.lat * PT_DEG;
    ptPath(V, ptCircle([0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), 60), C.cyan, a, 2.6, { surface: true });
    ptPath(V, ptCircle([0, 0, 0], PT_E[0], PT_E[1], 1, 60), C.mag, a, 2.2, { surface: true });
    const q = ptP(V, ptSph(lat, 5 * PT_DEG));
    ptDot(q[0], q[1], 6, C.now, a);
  } else {
    ptAxes(V, [1, 0, 1], { a, labels: false, w: 2.4 });
    ptPath(V, ptTrack(ptLegA1, 1, 20), C.white, 0.8 * a, 2.4, { surface: true });
    ptPath(V, ptTrack(ptLegA2, 1, 20), C.white, 0.8 * a, 2.4, { surface: true });
    const qx = ptP(V, [1, 0, 0]), qy = ptP(V, [0, -1, 0]);
    ptDot(qx[0], qx[1], 5, C.white, a); ptDot(qy[0], qy[1], 5, C.now, a);
  }
}
const PT_TAKE = [
  ['One plane holds one turn; a qubit needs three axes and a sphere.', '一张面只装得下一种转动；量子比特要三根轴、一颗球。', 'argued'],
  ['Two angles give an address; a fixed tilt walks only a latitude.', '两个角给出地址；固定倾角只走一圈纬线。', 'computed'],
  ['On a sphere, order matters: ZX = −XZ.', '在球上，顺序有讲究：ZX = −XZ。', ['computed', 'lean']]
];
SCENES.recap = S => {
  const u = S.u;
  ptSeries(clamp((S.d - u) / 0.8));
  const tNext = phraseAt(S, 3, 'Next'), out = 1 - clamp((u - tNext + 0.2) / 0.6);
  const x0 = 250, w = 1420;
  PT_TAKE.forEach(([en, zh, kind], i) => {
    const a = clamp((u - lineAt(S, i).s + 0.15) / 0.6) * out;
    if (a <= 0) return;
    const y = 220 + i * 178;
    panel(x0, y, w, 150, a, i === 0 ? C.argued : i === 1 ? C.cyan : C.lean);
    ptIcon(i, x0 + 100, y + 75, a);
    txt(en, x0 + 196, y + 64, { size: 33, fam: F.disp, w: 700, c: C.white, a });
    txt(zh, x0 + 196, y + 114, { size: 30, fam: F.zh, w: 700, c: C.white, a: a * 0.9 });
    /* the footing of each takeaway; the third has two: the turns were computed, ZX = −XZ is the Lean result */
    const kinds = Array.isArray(kind) ? kind : [kind];
    kinds.forEach((k, j) => ptKind(x0 + w - 26, y + 112 - 40 * (kinds.length - 1 - j), k, a, 'right'));
  });
  /* the next film's question */
  const from = lineAt(S, 3).e + 0.5;
  const na = Q(S, 3, 'Next', 0.6) * (1 - clamp((u - from + 0.3) / 0.6));
  if (na > 0) {
    txt('NEXT · 下一部 · PRELUDE 4/5', W / 2, 300, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: na, ls: 4 });
    txt('Who can point outside the sphere?', W / 2, 392, { size: 54, fam: F.disp, w: 700, align: 'center', c: C.white, a: na });
    txt('谁能指向球的外面？', W / 2, 470, { size: 50, fam: F.zh, w: 900, align: 'center', c: C.white, a: na });
    const V = ptView(W / 2, 712, 82);
    ptBall(V, na, { wire: 0.7 });
    const q0 = ptP(V, [0, 0, 1]);
    ctx.save(); ctx.setLineDash([8, 8]); line(q0[0], q0[1], q0[0], q0[1] - 62, C.vio, na, 4); ctx.restore();
    ptVec(q0[0], q0[1] - 56, q0[0], q0[1] - 80, C.vio, na, 4, 16);
    txt('?', q0[0] + 26, q0[1] - 44, { size: 50, fam: F.orb, w: 900, align: 'left', c: PT_VIO, a: na });
  }
  closingCard(S, { from, y: 330, hyper: false });
};

/* ======================================================================= */
/*                      checks of everything drawn                          */
/* ======================================================================= */
FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const check = (ok, msg) => { if (!ok && bad++ < 16) E.push('prelude-three-axes: ' + msg); };
  const X = PTX;
  /* the two Lean citations, and nothing else marked green */
  const want = ['D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core', 'D5/S3/Quantum/FiniteDimensional.qubit_weyl_star'];
  check((DATA.lean || []).length === want.length, 'film.json "lean" is not exactly the two cited theorems');
  want.forEach(g => { const r = leanCite(g); check(r && r.kind === 'theorem', `${g} is not a cited theorem at the pinned commit`); });
  /* TABLE: B at the north pole is Z, at (1, 0, 0) it is X; the printed entries */
  check(X.meq(X.B(PT_N), X.Z) && PT_SHOW.bN.join('|') === '1|0|0|−1', 'B(0, 0, 1) is not Z = [[1, 0], [0, −1]]');
  check(X.meq(X.B(PT_EX), X.X) && PT_SHOW.bX.join('|') === '0|1|1|0', 'B(1, 0, 0) is not X = [[0, 1], [1, 0]]');
  /* TABLE: v = (2/3, 1/3, 2/3) is a unit vector, its table and its square */
  check(PT_SHOW.v === '(2/3, 1/3, 2/3)', 'v does not print as (2/3, 1/3, 2/3)');
  check(X.eq(X.dot(PT_V3, PT_V3), X.ONE) && PT_SHOW.sq === '4/9 + 1/9 + 4/9 = 1', 'x² + y² + z² for v is not 4/9 + 1/9 + 4/9 = 1');
  check(PT_SHOW.bV.join('|') === '2/3|2/3 − i/3|2/3 + i/3|−2/3', 'B(v) does not print as [[2/3, 2/3 − i/3], [2/3 + i/3, −2/3]]');
  check(X.meq(X.mmul(X.B(PT_V3), X.B(PT_V3)), X.I2) && PT_SHOW.bV2.join('|') === '1|0|0|1', 'B(v)·B(v) is not the identity');
  /* B(w)·B(w) = (x² + y² + z²)·I for a grid of rational w (the general fact behind the worked case, computed here) */
  for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) for (let c = -2; c <= 2; c++) {
    const w = X.vec([a, 2], [b, 3], [c, 1]), s = X.dot(w, w);
    check(X.meq(X.mmul(X.B(w), X.B(w)), X.msc(s, X.I2)), `B(w)·B(w) ≠ |w|² I at w = ${X.fv(w)}`);
  }
  /* ORDER: the exact quarter turns, the two ends, the right angle, and the tables */
  const aMid = X.app(X.RX, PT_N), aEnd = X.app(X.RZ, aMid), bMid = X.app(X.RZ, PT_N), bEnd = X.app(X.RX, bMid);
  check(X.veq(aMid, PT_MY) && X.veq(aEnd, PT_EX), 'path A is not N → (0, −1, 0) → (1, 0, 0)');
  check(X.veq(bMid, PT_N) && X.veq(bEnd, PT_MY), 'path B is not N → N → (0, −1, 0)');
  check(PT_SHOW.aEnd === '(1, 0, 0)' && PT_SHOW.bEnd === '(0, −1, 0)' && PT_SHOW.dotAB === '0', 'the printed ends or their dot product are wrong');
  /* the exact matrices are the quarter turns of the right-hand rule (columns are the images of e1, e2, e3) */
  const rxCols = [[1, 0, 0], [0, 0, 1], [0, -1, 0]], rzCols = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]];
  [0, 1, 2].forEach(j => {
    const fx = pt3.rot(PT_E[0], Math.PI / 2, PT_E[j]), fz = pt3.rot(PT_E[2], Math.PI / 2, PT_E[j]);
    check(fx.every((v, i) => Math.abs(v - X.RX[i][j]) < 1e-12 && X.RX[i][j] === rxCols[j][i]), `RX column ${j} is not the quarter turn about x`);
    check(fz.every((v, i) => Math.abs(v - X.RZ[i][j]) < 1e-12 && X.RZ[i][j] === rzCols[j][i]), `RZ column ${j} is not the quarter turn about z`);
  });
  /* the drawn tracks: on the unit sphere, starting at N and ending at the exact ends */
  const near = (p, q, t = 1e-12) => Math.abs(p[0] - q[0]) < t && Math.abs(p[1] - q[1]) < t && Math.abs(p[2] - q[2]) < t;
  check(near(ptLegA1(0), [0, 0, 1]) && near(ptLegA1(1), [0, -1, 0]) && near(ptLegA2(1), [1, 0, 0]), 'the drawn path A does not end at (1, 0, 0)');
  check(near(ptLegB2(0), [0, 0, 1]) && near(ptLegB2(1), [0, -1, 0]), 'the drawn path B does not end at (0, −1, 0)');
  for (let i = 0; i <= 40; i++) {
    for (const f of [ptLegA1, ptLegA2, ptLegB2]) check(Math.abs(Math.hypot(...f(i / 40)) - 1) < 1e-12, 'a drawn track leaves the sphere');
  }
  check(Math.abs(Math.acos(pt3.dot(ptLegA2(1), ptLegB2(1))) - Math.PI / 2) < 1e-12, 'the two ends are not 90° apart');
  /* Z·X and X·Z, as printed; Z·X = −(X·Z), X² = Z² = I (the content of qubit_weyl_star, re-derived) */
  check(PT_SHOW.zx.join('|') === '0|1|−1|0' && PT_SHOW.xz.join('|') === '0|−1|1|0', 'Z·X or X·Z does not print as shown');
  check(X.meq(X.mmul(X.Z, X.X), X.mneg(X.mmul(X.X, X.Z))), 'Z·X ≠ −(X·Z)');
  check(X.meq(X.mmul(X.X, X.X), X.I2) && X.meq(X.mmul(X.Z, X.Z), X.I2), 'X² or Z² is not the identity');
  /* ADDRESS: the numbers of the 50° latitude and of the equator */
  const lat = PT.lat * PT_DEG;
  check(ptFmt(Math.sin(lat)) === '0.77' && ptFmt(Math.cos(lat)) === '0.64', 'sin 50° / cos 50° do not print 0.77 / 0.64');
  check(Math.cos(lat) > 0.6 && Math.abs(Math.cos(Math.PI / 2)) < 1e-15 && Math.sin(Math.PI / 2) === 1, 'the latitude plane or the equator plane is misplaced');
  check(Math.sin(lat) < 1, 'the latitude is not smaller than the equator');
  for (let k = 0; k <= 36; k++) {
    const p = ptCircle([0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), 36)[k];
    check(Math.abs(Math.hypot(...p) - 1) < 1e-12 && Math.abs(p[2] - Math.cos(lat)) < 1e-12, 'the drawn latitude is not on the sphere at height cos 50°');
    const q = ptSph(lat, k * 10 * PT_DEG);
    check(Math.abs(q[2] - Math.cos(lat)) < 1e-12 && Math.abs(Math.hypot(q[0], q[1]) - Math.sin(lat)) < 1e-12, 'a fixed tilt does not keep the point on its latitude');
  }
  /* the address reaches 50° and 90° exactly in the scene's own timing */
  const ad = TL.scenes.find(s => s.id === 'address');
  if (ad) {
    const Sd = { id: 'address', u: 0, L: SC.address.lines };
    Sd.u = phraseAt(Sd, 1, 'only turn') + 0.1;
    check(Math.abs(ptAddress(Sd).th - PT.lat) < 1e-9, 'the tilt is not exactly 50° while the point sweeps its latitude');
    Sd.u = ad.end - ad.start - 0.01;
    check(Math.abs(ptAddress(Sd).th - 90) < 1e-9, 'the tilt does not reach exactly 90° by the end of ADDRESS');
    const A1 = ptAddress(Object.assign({}, Sd, { u: phraseAt(Sd, 2, 'Only at ninety degrees') - 0.05 }));
    check(Math.abs(A1.sweep - 1) < 1e-9, 'the latitude sweep is not finished before the tilt rises');
  }
  /* AXES: three orthonormal axes, three pairwise perpendicular planes, the sweep on the unit sphere */
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) check(pt3.dot(PT_E[i], PT_E[j]) === (i === j ? 1 : 0), 'the axes are not orthonormal');
  const normals = [pt3.cross(PT_E[0], PT_E[1]), pt3.cross(PT_E[1], PT_E[2]), pt3.cross(PT_E[2], PT_E[0])];
  check(pt3.dot(normals[0], normals[1]) === 0 && pt3.dot(normals[1], normals[2]) === 0 && pt3.dot(normals[2], normals[0]) === 0, 'the coordinate planes are not pairwise perpendicular');
  PT_SPIRAL.forEach(d => check(Math.abs(Math.hypot(...d.p) - 1) < 1e-12, 'a sweep arrow does not have length one'));
  check(Math.abs(ptSweep(0)[2] - 1) < 1e-12 && Math.abs(ptSweep(1)[2] + 1) < 1e-12, 'the sweep does not run from north to south');
  /* the camera: orthographic and length-preserving (screen offset² + depth² = |p|²), x to the front right */
  for (let i = 0; i < 20; i++) {
    const p = [Math.sin(i * 1.3), Math.cos(i * 0.7), Math.sin(i * 2.1 + 0.4)], V = ptView(0, 0, 1);
    const q = ptP(V, p);
    check(Math.abs(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] - pt3.dot(p, p)) < 1e-12, 'the camera does not preserve lengths');
  }
  const V0 = ptView(0, 0, 1), qx = ptP(V0, [1, 0, 0]), qmy = ptP(V0, [0, -1, 0]);
  check(qx[2] > 0 && qmy[2] > 0, 'the two ends of ORDER are not both on the front of the sphere');
  /* right-handed on screen: x × y = z */
  const c3 = pt3.cross(PT_E[0], PT_E[1]);
  check(c3[2] === 1, 'the axes are not right-handed');
});
Object.assign(FILM.speed, { plane: 0.008, axes: 0.01, table: 0.01, address: 0.012, order: 0.014, recap: 0.016 });

/* ---------- poster: three axes, three planes, the sphere, a latitude, over the title ---------- */
FILM.poster = () => {
  const t = 60;
  background(t, TL.scenes[1], 1, 4);
  ptSeries(1);
  const V = ptView(600, 520, 300), lat = PT.lat * PT_DEG;
  ptBall(V, 1, { wire: 0.8, lats: [30, 60, 120, 150] });
  ptDisc(V, [0, 0, 0], PT_E[1], PT_E[2], 1, C.mag, 0.6, { fill: 0.07, surface: true, w: 1.8 });
  ptDisc(V, [0, 0, 0], PT_E[2], PT_E[0], 1, C.mag, 0.6, { fill: 0.07, surface: true, w: 1.8 });
  ptDisc(V, [0, 0, 0], PT_E[0], PT_E[1], 1, C.mag, 1, { fill: 0.12, surface: true, w: 2.6 });
  ptPath(V, ptCircle([0, 0, Math.cos(lat)], PT_E[0], PT_E[1], Math.sin(lat), 120), C.cyan, 1, 4, { surface: true });
  ptAxes(V, [1, 1, 1], { size: 34 });
  const q = ptP(V, ptSph(lat, 5 * PT_DEG)), q0 = ptP(V, [0, 0, 0]);
  ptVec(q0[0], q0[1], q[0], q[1], C.now, 1, 4);
  ptDot(q[0], q[1], 14, C.now, 1);
  const tx = 1370;
  txt('一张面装不下', tx, 400, { size: 110, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('三根轴与一颗球', tx, 510, { size: 70, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 3 });
  bloom(0.55);
  txt('ONE PLANE IS NOT ENOUGH', tx, 612, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ls: 4, ab: 2 });
  txt('THREE AXES, ONE SPHERE', tx, 672, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.cyan, ls: 5 });
  txt(`${DATA.book.code} · FILM`, tx, 784, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, tx, 834, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * FPS), 1, TL.scenes[1]);
  post(3);
};
