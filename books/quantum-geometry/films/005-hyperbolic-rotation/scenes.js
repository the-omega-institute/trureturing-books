/* Film 005 · Hyperbolic rotation: the light cone stays · 双曲旋转：光锥不动
   (book quantum-geometry, part V, chapter 17). Scenes for theme/film/engine.js.

   Events are (t, x) with c = 1; the boost of the chapter's example is
   B(η) = [[cosh η, −sinh η], [−sinh η, cosh η]], and the moving frame's time axis passes through (cosh η, sinh η).

   Lean citations (film.json "lean", at the pinned trureturing commit):
     BogoliubovNormConservation.bogoliubov_norm_conservation   |cosh r|² − |sinh r|² = 1 for every real r
     MinkowskiNullConeRigidity.eq_smul_minkowski_of_null       S vanishes on the null cone ⇒ S = S(1, 0) • minkowski d
   Computed here, not cited: the turn along t² + x² = 34, the boost of (5, 3) to (4, 0), the beads on the cone,
   the scale k = 1.5, B(ln 2)·B(ln 2) = B(ln 4), the hyperbolic sector areas η/2, the composed velocity 15/17,
   and the proper times 4 + 4 = 8 and 10 before and after the boost by ln 2. Reading B(η) as the frame moving at
   β = tanh η is the chapter's literature remark (rem-lorentz-rotor-literature) and is badged ARGUED.

   On load, FILM.init checks DATA.lean against the two theorems, re-derives every fraction shown on screen in exact
   rational arithmetic (e^η = 2 and e^η = 4 give cosh, sinh as rationals), and compares the floating-point curves
   the animation draws with them. Any disagreement goes to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                  exact rationals and 2×2 rational matrices               */
/* ======================================================================= */
const HQ = (() => {
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a; };
  const q = (n, d = 1) => {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error(`bad rational ${n}/${d}`);
    if (d < 0) { n = -n; d = -d; }
    const g = gcd(n, d) || 1;
    return [n / g + 0, d / g];
  };
  const add = (a, b) => q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
  const neg = a => q(-a[0], a[1]);
  const sub = (a, b) => add(a, neg(b));
  const mul = (a, b) => q(a[0] * b[0], a[1] * b[1]);
  const div = (a, b) => q(a[0] * b[1], a[1] * b[0]);
  const eq = (a, b) => a[0] === b[0] && a[1] === b[1];
  const lt = (a, b) => a[0] * b[1] < b[0] * a[1];
  const val = a => a[0] / a[1];
  const str = a => (a[0] < 0 ? '−' : '') + Math.abs(a[0]) + (a[1] === 1 ? '' : '/' + a[1]);
  /* the exact square root of a rational square, or null */
  const sqrt = a => {
    const n = Math.round(Math.sqrt(a[0])), d = Math.round(Math.sqrt(a[1]));
    return a[0] >= 0 && n * n === a[0] && d * d === a[1] ? q(n, d) : null;
  };
  /* e^η = E rational: cosh η = (E + 1/E)/2, sinh η = (E − 1/E)/2 */
  const ONE = q(1), TWO = q(2);
  const ch = E => div(add(E, div(ONE, E)), TWO);
  const sh = E => div(sub(E, div(ONE, E)), TWO);
  const B = E => { const c = ch(E), s = sh(E); return [[c, neg(s)], [neg(s), c]]; };
  const mv = (M, v) => [add(mul(M[0][0], v[0]), mul(M[0][1], v[1])), add(mul(M[1][0], v[0]), mul(M[1][1], v[1]))];
  const mm = (A, C2) => [0, 1].map(i => [0, 1].map(j => add(mul(A[i][0], C2[0][j]), mul(A[i][1], C2[1][j]))));
  const meq = (A, C2) => [0, 1].every(i => [0, 1].every(j => eq(A[i][j], C2[i][j])));
  const veq = (u, v) => eq(u[0], v[0]) && eq(u[1], v[1]);
  const mink = v => sub(mul(v[0], v[0]), mul(v[1], v[1]));
  const eucl = v => add(mul(v[0], v[0]), mul(v[1], v[1]));
  const vec = (t, x) => [q(t), q(x)];
  return { q, add, neg, sub, mul, div, eq, lt, val, str, sqrt, ONE, TWO, ch, sh, B, mv, mm, meq, veq, mink, eucl, vec };
})();

/* the exact data of the film */
const HX = (() => {
  const X = HQ, E2 = X.q(2), E4 = X.q(4);
  const ch2 = X.ch(E2), sh2 = X.sh(E2), ch4 = X.ch(E4), sh4 = X.sh(E4);
  const B2 = X.B(E2), B4 = X.B(E4), B22 = X.mm(B2, B2);
  const v = X.vec(5, 3), Bv = X.mv(B2, v);
  const beta2 = X.div(sh2, ch2), beta4 = X.div(sh4, ch4);
  const naive = X.add(beta2, beta2), comp = X.div(naive, X.add(X.ONE, X.mul(beta2, beta2)));
  const O = X.vec(0, 0), A = X.vec(5, 3), P = X.vec(10, 0), out = A, back = [X.sub(P[0], A[0]), X.sub(P[1], A[1])];
  const rest = P, outB = X.mv(B2, out), backB = X.mv(B2, back), restB = X.mv(B2, rest);
  const tau = d => X.sqrt(X.mink(d));
  const k = X.q(3, 2), k2 = X.mul(k, k);
  return { E2, E4, ch2, sh2, ch4, sh4, B2, B4, B22, v, Bv, beta2, beta4, naive, comp, O, A, P, out, back, rest, outB, backB, restB, tau, k, k2 };
})();
const RS = HQ.str;
const LN2 = Math.log(2), LN4 = Math.log(4), R34 = Math.sqrt(34), KSC = HQ.val(HX.k);

/* floating point: the boost B(η) acting on (t, x), and the frame axis map Λ(η) = B(−η) */
const bst = (eta, v) => { const c = Math.cosh(eta), s = Math.sinh(eta); return [c * v[0] - s * v[1], -s * v[0] + c * v[1]]; };
const mink = v => v[0] * v[0] - v[1] * v[1];
const legEta = d => 0.5 * Math.log((d[0] + d[1]) / (d[0] - d[1]));   // rapidity of a timelike leg Δv = (Δt, Δx)
/* hyperbolic sector O → (cosh φ, sinh φ), φ ∈ [f0, f1], area by the shoelace formula */
function sectorArea(f0, f1, n = 4000) {
  let s = 0;
  const pts = [[0, 0]];
  for (let i = 0; i <= n; i++) { const f = f0 + (f1 - f0) * i / n; pts.push([Math.cosh(f), Math.sinh(f)]); }
  for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; s += a[0] * b[1] - b[0] * a[1]; }
  return Math.abs(s) / 2;
}

/* the two cited theorems, by short name (film.json "lean") */
const HR_LEAN = {
  bogoliubov_norm_conservation: 'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
  eq_smul_minkowski_of_null: 'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null'
};
const BEADS = [1, 2, 3, 4, 5, 6, 7];

FILM.init.push(() => {
  const E = window.FILM_ERRORS, X = HQ, H = HX;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('hyperbolic film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(HR_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(HR_LEAN).length}`);
  for (const [short, gid] of Object.entries(HR_LEAN)) {
    const r = lean.find(z => z.gid === gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. η = ln 2 and ln 4 as rationals; cosh² − sinh² = 1 */
  check(X.eq(H.ch2, X.q(5, 4)) && X.eq(H.sh2, X.q(3, 4)), 'cosh, sinh of ln 2 ≠ 5/4, 3/4');
  check(X.eq(H.ch4, X.q(17, 8)) && X.eq(H.sh4, X.q(15, 8)), 'cosh, sinh of ln 4 ≠ 17/8, 15/8');
  for (const [c, s] of [[H.ch2, H.sh2], [H.ch4, H.sh4]]) check(X.eq(X.sub(X.mul(c, c), X.mul(s, s)), X.ONE), 'cosh² − sinh² ≠ 1');
  check(near(Math.cosh(LN2), X.val(H.ch2)) && near(Math.sinh(LN2), X.val(H.sh2)), 'float cosh/sinh(ln 2) off');
  check(near(Math.cosh(LN4), X.val(H.ch4)) && near(Math.sinh(LN4), X.val(H.sh4)), 'float cosh/sinh(ln 4) off');
  for (let k = -40; k <= 40; k++) { const r = k / 10; check(near(Math.cosh(r) ** 2 - Math.sinh(r) ** 2, 1, 1e-7), `float cosh² − sinh² ≠ 1 at ${r}`); }

  /* 2. the boost of (5, 3): (4, 0), interval 16 kept; the turn keeps 34 and leaves the cone */
  check(X.veq(H.Bv, X.vec(4, 0)), 'B(ln 2)(5, 3) ≠ (4, 0)');
  check(X.eq(X.mink(H.v), X.q(16)) && X.eq(X.mink(H.Bv), X.q(16)) && X.eq(X.eucl(H.v), X.q(34)), 'intervals of (5, 3) wrong');
  check(X.eq(X.sqrt(X.mink(H.Bv)), X.q(4)), 'τ ≠ 4');
  for (let k = -30; k <= 30; k++) {
    const e = k / 25, w = bst(e, [5, 3]);
    check(near(mink(w), 16, 1e-9), `boosted interval ≠ 16 at η = ${e}`);
  }
  check(Math.atan2(3, 5) < Math.PI / 4 && Math.atan2(3, 5) + TURN_SPAN > Math.PI / 4, 'the turn does not cross the cone');
  check(near(R34 * R34, 34, 1e-12), 'radius √34');
  check(X.eq(X.div(H.v[1], H.v[0]), H.beta2), 'the slope of (5, 3) is not β = 3/5');

  /* 3. beads on the cone stay on it; the scale k multiplies the interval by k² */
  for (const e of [-0.6, -0.2, 0, 0.4, LN2, 1]) for (const u of BEADS) for (const sg of [1, -1]) {
    const b = bst(e, [u, sg * u]);
    check(near(mink(b), 0, 1e-9), `bead ${sg * u} left the cone at η = ${e}`);
    check(near(b[0], u * Math.exp(-sg * e), 1e-9), `bead ${sg * u} not scaled by e^∓η at η = ${e}`);
  }
  check(X.eq(H.k2, X.q(9, 4)) && X.eq(X.mul(H.k2, X.mink(H.Bv)), X.q(36)), 'k² · 16 ≠ 36');
  for (const v of [[5, 3], [2, 1], [1, 2], [3, -1], [1, 1]]) {
    const w = bst(LN2, v).map(z => KSC * z);
    check(near(mink(w), KSC * KSC * mink(v), 1e-9), 'minkowski(kBv) ≠ k² minkowski(v)');
  }

  /* 4. composition: B(ln 2)² = B(ln 4); velocities 3/5 ⊕ 3/5 = 15/17; sector areas η/2 */
  check(X.meq(H.B22, H.B4), 'B(ln 2)·B(ln 2) ≠ B(ln 4)');
  check(X.eq(H.beta2, X.q(3, 5)) && X.eq(H.beta4, X.q(15, 17)) && X.eq(H.comp, H.beta4), '3/5 ⊕ 3/5 ≠ 15/17');
  check(X.eq(H.naive, X.q(6, 5)) && X.lt(X.ONE, H.naive) && X.lt(H.comp, X.ONE), '6/5 vs 15/17 ordering');
  for (const [a, b] of [[0.3, 0.5], [LN2, LN2], [-0.4, 1.1], [1.2, -0.7]]) {
    const Ma = [[Math.cosh(a), -Math.sinh(a)], [-Math.sinh(a), Math.cosh(a)]], Mb = [[Math.cosh(b), -Math.sinh(b)], [-Math.sinh(b), Math.cosh(b)]];
    const p00 = Ma[0][0] * Mb[0][0] + Ma[0][1] * Mb[1][0], p01 = Ma[0][0] * Mb[0][1] + Ma[0][1] * Mb[1][1];
    check(near(p00, Math.cosh(a + b), 1e-9) && near(p01, -Math.sinh(a + b), 1e-9), `B(${a})B(${b}) ≠ B(${a + b})`);
  }
  check(near(sectorArea(0, LN2), LN2 / 2, 1e-6) && near(sectorArea(LN2, LN4), LN2 / 2, 1e-6) && near(sectorArea(0, LN4), LN4 / 2, 1e-6), 'sector area ≠ η/2');
  check(near(Math.tanh(LN4), X.val(H.beta4), 1e-12), 'tanh(ln 4) ≠ 15/17');

  /* 5. the two worldlines: 4 + 4 = 8 and 10, in the lab and after the boost by ln 2 */
  check(X.veq(H.back, X.vec(5, -3)) && X.veq(H.outB, X.vec(4, 0)) && X.veq(H.backB, [X.q(17, 2), X.q(-15, 2)]), 'boosted legs wrong');
  check(X.veq(H.restB, [X.q(25, 2), X.q(-15, 2)]) && X.veq(X.vec(0, 0).map((z, i) => X.add(H.outB[i], H.backB[i])), H.restB), 'boosted rest line wrong');
  for (const [d, t] of [[H.out, 4], [H.back, 4], [H.rest, 10], [H.outB, 4], [H.backB, 4], [H.restB, 10]]) check(X.eq(H.tau(d), X.q(t)), `τ ≠ ${t}`);
  check(near(legEta([5, 3]), LN2, 1e-12) && near(legEta([5, -3]), -LN2, 1e-12) && near(legEta([8.5, -7.5]), -LN4, 1e-12), 'leg rapidities');
  check(X.eq(X.div(H.backB[1], H.backB[0]), X.neg(H.beta4)), 'boosted return velocity ≠ −15/17');
  for (let k = 0; k <= 20; k++) {
    const e = LN2 * k / 20;
    for (const [d, t] of [[[5, 3], 16], [[5, -3], 16], [[10, 0], 100]]) check(near(mink(bst(e, d)), t, 1e-9), `leg interval moved at η = ${e}`);
  }
});
const TURN_SPAN = 0.78;   // the turn of the CIRCLE scene, radians beyond atan2(3, 5)
Object.assign(FILM.speed, { circle: 0.02, boost: 0.014, cone: 0.018, add: 0.022, twins: 0.016, close: 0.025 });

/* ======================================================================= */
/*                              drawing helpers                              */
/* ======================================================================= */
const fmt = (x, d = 3) => { const v = Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x; return (v < 0 ? '−' : '') + Math.abs(v).toFixed(d); };
/* spacetime stage: v = [t, x] → screen, time up */
function stg(ox, oy, s, clip) { const P = v => [ox + v[1] * s, oy - v[0] * s]; P.ox = ox; P.oy = oy; P.s = s; P.clip = clip; return P; }
function clipped(P, fn) { const c = P.clip; ctx.save(); ctx.beginPath(); ctx.rect(c[0], c[1], c[2] - c[0], c[3] - c[1]); ctx.clip(); fn(); ctx.restore(); }
function segTX(P, a, b, col, al, w = 2, dash = false) { const p = P(a), q = P(b); (dash ? dashed : line)(p[0], p[1], q[0], q[1], col, al, w); }
function pathTX(P, fn, n, col, al, w = 2.5) { curve(k => P(fn(k)), n, col, al, w); }
function stageAxes(P, a, o) {
  const T = P([o.tmax, 0]), O = P([0, 0]), X0 = P([0, o.xmin]), X1 = P([0, o.xmax]);
  if (o.tmin) { const Tm = P([o.tmin, 0]); line(Tm[0], Tm[1], O[0], O[1], C.dim, 0.5 * a, 1.4); }
  arrow(O[0], O[1], T[0], T[1], C.dim, 0.8 * a, 1.8);
  arrow(X0[0], X0[1], X1[0], X1[1], C.dim, 0.8 * a, 1.8);
  txt('t', T[0] + 16, T[1] + 14, { size: 28, fam: F.math, w: 700, c: C.dim, a });
  txt('x', X1[0] - 6, X1[1] + 38, { size: 28, fam: F.math, w: 700, c: C.dim, a });
}
/* the future light cone t = |x| (white) */
function lightCone(P, a, tmax, o = {}) {
  segTX(P, [0, 0], [tmax, tmax], C.white, 0.85 * a, 2.4);
  segTX(P, [0, 0], [tmax, -tmax], C.white, 0.85 * a, 2.4);
}
/* a legend in the stage's top-left corner: items = [[label, colour, dashed?, alpha], …] */
function legend(items, a, x = 140, y = 204) {
  items.forEach(([s, col, dash, al], i) => {
    const k = a * (al == null ? 1 : al), yy = y + 34 * i;
    if (i === 0) fillBox(x - 14, y - 30, 70 + Math.max(...items.map(it => tw(it[0], 21, F.math, 700))), 34 * items.length + 12, C.bg, 0.72 * a);
    if (k <= 0.003) return;
    (dash ? dashed : line)(x, yy - 7, x + 40, yy - 7, col, k, 3);
    txt(s, x + 54, yy, { size: 21, fam: F.math, w: 700, c: col, a: k });
  });
}
/* the branch t = √(τ² + x²) of the hyperbola of proper time τ */
function hyper(P, tau, x0, x1, col, a, w = 2.5, dash = false) {
  if (a <= 0.003) return;
  if (dash) { ctx.save(); ctx.setLineDash([12, 10]); }
  pathTX(P, k => { const x = x0 + (x1 - x0) * k; return [Math.sqrt(tau * tau + x * x), x]; }, 160, col, a, w);
  if (dash) ctx.restore();
}
/* coloured runs of text on one baseline */
function rich(parts, x, y, o = {}) {
  const size = o.size || 28, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* a 2×2 matrix with bracket rails; y is the baseline of the first row; returns the right edge */
function mat2(x, y, cells, a, o = {}) {
  if (a <= 0.003) return x;
  const size = o.size || 26, cw = o.cw || 120, rh = o.rh || 44, col = o.c || C.white;
  const top = y - size * 1.05, bot = y + rh + size * 0.45, xr = x + 16 + cw * 2;
  for (const [x0, d] of [[x, 1], [xr, -1]]) {
    line(x0, top, x0, bot, col, a * 0.85, 2);
    line(x0, top, x0 + 10 * d, top, col, a * 0.85, 2);
    line(x0, bot, x0 + 10 * d, bot, col, a * 0.85, 2);
  }
  cells.forEach((row, i) => row.forEach((s, j) => txt(s, x + 8 + cw * j + cw / 2, y + rh * i,
    { size, fam: F.math, w: 700, align: 'center', c: (o.cols && o.cols[i][j]) || col, a })));
  return xr;
}
/* LEAN ✓ chip for one cited theorem, by short name */
const HR_MISSING = new Set();
function leanChip(x, y, short, a, o = {}) {
  if (a <= 0.003) return;
  const r = (DATA.lean || []).find(z => z.short === short && z.kind === 'theorem');
  if (!r) {
    if (!HR_MISSING.has(short)) { HR_MISSING.add(short); window.FILM_ERRORS.push(`film.json does not cite the theorem ${short}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  txt(r.gid.split('.')[0], x + wh + 12, y + size * 1.15, { size: size * 0.72, fam: F.mono, c: C.dim, a: a * 0.9 });
}
/* small kind tags inside panels */
function numTag(x, y, a) { chip(x + 32, y - 9, 64, 26, 'NUM', C.cyan, a * 0.9, 14); }
function arguedTag(x, y, a) { chip(x + 46, y - 9, 92, 26, 'ARGUED', C.argued, a * 0.9, 14); }
/* a tick mark across the segment p → q at fraction f, in screen space */
function tick(p, q, f, len, col, a, w = 3) {
  const x = lerp(p[0], q[0], f), y = lerp(p[1], q[1], f), dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L * len / 2, ny = dx / L * len / 2;
  line(x - nx, y - ny, x + nx, y + ny, col, a, w);
}
const STAGE_CLIP = [120, 168, 1090, 842];
const PX = 1150, PW = 650;   // the right-hand panel column

/* ======================================================================= */
/*                     scene 1 · CIRCLE VS HYPERBOLA                         */
/* ======================================================================= */
const P1 = () => stg(600, 800, 68, STAGE_CLIP);
function turnAngle(S) {
  const t0 = phraseAt(S, 1, 'Turn it'), L1 = lineAt(S, 1);
  return Math.atan2(3, 5) + TURN_SPAN * ease(clamp((S.u - t0 - 0.2) / Math.max(1, L1.e - t0)));
}
function boostSweep(S) {
  const t0 = phraseAt(S, 2, 'Boost it'), L2 = lineAt(S, 2);
  const p = clamp((S.u - t0 - 0.2) / Math.max(1, L2.e - t0 + 0.3));
  return p < 0.5 ? -0.55 * Math.sin(TAU * p) : -0.62 * Math.sin(TAU * p);
}
SCENES.circle = S => {
  const u = S.u, L0 = lineAt(S, 0);
  /* opening title during the lead */
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta > 0) {
    const p = clamp(u / 1.3), [en1, en2] = DATA.film.title.toUpperCase().split(': ');
    txt(`${DATA.book.code} · FILM ${DATA.film.number}`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
    txt(DATA.film.title_zh, W / 2, 480, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
    txt(scramble(en1, p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
    txt(scramble(en2 || '', p, 7), W / 2, 640, { size: 30, fam: F.orb, w: 700, align: 'center', c: C.white, a: ta * 0.9, ls: 4 });
    txt('TURN · BOOST · CONE · ADD · CLOCKS', W / 2, 712, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 8 });
  }
  const a = at(S, 0, 0.8, -0.15) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  if (u >= L0.s) badgeQ(S, [[0, null, 'computed']]);
  const P = P1();
  const ca = Q(S, 1, 'Turn it', 0.6) * a, ha = Q(S, 2, 'Boost it', 0.6) * a;
  const th = turnAngle(S), tv = [R34 * Math.cos(th), R34 * Math.sin(th)];
  const eta = boostSweep(S), bv = bst(eta, [5, 3]);
  clipped(P, () => {
    stageAxes(P, a, { tmax: 9.2, xmin: -7, xmax: 7 });
    lightCone(P, a, 7);
    /* the circle t² + x² = 34 and the turned point (magenta) */
    pathTX(P, k => { const f = -Math.PI / 2 + Math.PI * k; return [R34 * Math.cos(f), R34 * Math.sin(f)]; }, 160, C.mag, 0.7 * ca, 2.2);
    if (ca > 0) {
      pathTX(P, k => { const f = Math.atan2(3, 5) + (th - Math.atan2(3, 5)) * k; return [R34 * Math.cos(f), R34 * Math.sin(f)]; }, 60, C.mag, ca, 5);
      const cross = Q(S, 1, 'straight out', 0.4) * (th > Math.PI / 4 ? 1 : 0);
      const X0 = P([R34 / Math.SQRT2, R34 / Math.SQRT2]);
      ring(X0[0], X0[1], 16, C.white, ca * cross, 2.5);
      const tp = P(tv);
      dot(tp[0], tp[1], 15, 'm', ca);
      txt('turned', tp[0] + 20, tp[1] + 34, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ca * clamp((th - Math.atan2(3, 5) - 0.15) / 0.2) });
    }
    /* the hyperbola t² − x² = 16 and the boosted point (cyan) */
    hyper(P, 4, -7, 7, C.cyan, 0.9 * ha, 2.6);
    if (ha > 0) {
      const bp = P(bv);
      dot(bp[0], bp[1], 15, 'c', ha);
      txt('boosted', bp[0] - 22, bp[1] - 22, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ha });
    }
    /* the event v = (5, 3) (amber), with its coordinates */
    const va = at(S, 0, 0.6, 0.2) * a, vp = P([5, 3]), t5 = P([5, 0]), x3 = P([0, 3]);
    dashed(vp[0], vp[1], t5[0], t5[1], C.dim, 0.8 * va, 1.6);
    dashed(vp[0], vp[1], x3[0], x3[1], C.dim, 0.8 * va, 1.6);
    txt('5', t5[0] - 14, t5[1] + 9, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a: va });
    txt('3', x3[0], x3[1] + 32, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: va });
    dot(vp[0], vp[1], 13, 'g', va);
    txt('v = (5, 3)', vp[0] - 18, vp[1] - 20, { size: 28, fam: F.math, w: 700, align: 'right', c: C.now, a: va });
  });
  legend([['light cone  t² − x² = 0', C.white], ['t² + x² = 34', C.mag, false, ca / a], ['t² − x² = 16', C.cyan, false, ha / a]], a);
  /* the ledger */
  const pa = at(S, 0, 0.6, 0.4) * a;
  if (pa <= 0) return;
  const y = 190;
  panel(PX, y, PW, 620, pa, C.cyan, 'TWO METRICS · 两种度规');
  rich([['t² + x² = ', C.white], ['25 + 9 = 34', C.mag]], PX + 28, y + 82, { size: 30, a: pa });
  rich([['t² − x² = ', C.white], ['25 − 9 = 16', C.cyan]], PX + 28, y + 128, { size: 30, a: pa });
  numTag(PX + PW - 110, y + 25, pa);
  /* turn row */
  if (ca > 0) {
    const ry = y + 210, q = mink(tv);
    txt('TURN · 转动', PX + 28, ry, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ca, ls: 2 });
    rich([['t² + x² = ', C.white], [fmt(tv[0] ** 2 + tv[1] ** 2), C.mag], ['   kept', C.dim]], PX + 28, ry + 44, { size: 26, fam: F.mono, a: ca });
    rich([['t² − x² = ', C.white], [fmt(q), q < -0.05 ? C.mag : C.white]], PX + 28, ry + 84, { size: 26, fam: F.mono, a: ca });
    const where = q > 0.05 ? 'inside the cone' : q < -0.05 ? 'outside the cone' : 'on the cone';
    txt(where, PX + 400, ry + 84, { size: 22, fam: F.mono, w: 700, c: q < -0.05 ? C.mag : C.white, a: ca });
    txt('cos²θ + sin²θ = 1', PX + 28, ry + 126, { size: 24, fam: F.math, w: 700, c: C.mag, a: ca * 0.9 });
  }
  /* boost row */
  if (ha > 0) {
    const ry = y + 410;
    txt('BOOST · 推动', PX + 28, ry, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: ha, ls: 2 });
    rich([['t² − x² = ', C.white], [fmt(mink(bv)), C.cyan], ['   kept', C.dim]], PX + 28, ry + 44, { size: 26, fam: F.mono, a: ha });
    rich([['t² + x² = ', C.white], [fmt(bv[0] ** 2 + bv[1] ** 2), C.white]], PX + 28, ry + 84, { size: 26, fam: F.mono, a: ha });
    txt(`η = ${fmt(eta, 2)}  inside the cone`, PX + 300, ry + 84, { size: 21, fam: F.mono, w: 700, c: C.white, a: ha });
    txt('cosh²η − sinh²η = 1', PX + 28, ry + 126, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ha * 0.9 });
  }
};

/* ======================================================================= */
/*                          scene 2 · BOOST BY LN 2                          */
/* ======================================================================= */
function boostEta(S) { const L0 = lineAt(S, 0); return LN2 * ease(clamp((S.u - L0.s - 0.3) / Math.max(1.2, L0.e - L0.s + 0.6))); }
function axesEta(S) { return LN2 * ease(clamp((S.u - phraseAt(S, 3, 'axes') - 0.1) / 2.2)); }
SCENES.boost = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'their squares', 'lean'], [2, null, 'computed'], [3, 'moving frame', 'argued']]);
  const P = P1(), eta = boostEta(S), pt = bst(eta, [5, 3]), ea = axesEta(S), sc = Q(S, 3, 'axes', 0.5);
  clipped(P, () => {
    /* the lab axes, dashed once the moving axes leave them */
    if (sc > 0) {
      segTX(P, [0, 0], [9.2, 0], C.dim, 0.7 * a, 1.6, true);
      segTX(P, [0, -7], [0, 7], C.dim, 0.7 * a, 1.6, true);
      txt('t', P([9.2, 0])[0] + 16, P([9.2, 0])[1] + 14, { size: 28, fam: F.math, w: 700, c: C.dim, a });
    } else stageAxes(P, a, { tmax: 9.2, xmin: -7, xmax: 7 });
    lightCone(P, a, 7);
    hyper(P, 4, -7, 7, C.cyan, 0.9 * a, 2.6);
    /* the moving frame's axes t′ ∝ (cosh η, sinh η), x′ ∝ (sinh η, cosh η) (amber) */
    if (sc > 0) {
      const c = Math.cosh(ea), s = Math.sinh(ea);
      segTX(P, [0, 0], [9.6 * c, 9.6 * s], C.now, sc * a, 3);
      segTX(P, [-7.5 * s, -7.5 * c], [7.5 * s, 7.5 * c], C.now, sc * a, 3);
      const tl = P([8.6, 8.6 * Math.tanh(ea)]), xl = P([5.4 * s, 5.4 * c]);
      txt('t′', tl[0] + 18, tl[1] + 8, { size: 30, fam: F.math, w: 700, c: C.now, a: sc * a });
      txt('x′', xl[0] - 4, xl[1] - 18, { size: 30, fam: F.math, w: 700, c: C.now, a: sc * a });
    }
    /* the event: ghost at (5, 3), trail along the hyperbola, current point (amber) */
    const g = P([5, 3]);
    ring(g[0], g[1], 12, C.dim, 0.8 * a, 1.6);
    txt('(5, 3)', g[0] + 20, g[1] + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a });
    if (eta > 0.002) pathTX(P, k => bst(eta * k, [5, 3]), 60, C.now, 0.9 * a, 5);
    const p = P(pt);
    dot(p[0], p[1], 15, 'g', a);
    /* (4, 0) and τ = 4 on the t axis */
    const fa = Q(S, 2, 'four, zero', 0.6) * a;
    if (fa > 0) {
      for (let k = 1; k <= 4; k++) { const tk = P([k, 0]); line(tk[0] - 10, tk[1], tk[0] + 10, tk[1], C.cyan, fa, 3); }
      txt('(4, 0)', p[0] - 24, p[1] + 10, { size: 28, fam: F.math, w: 700, align: 'right', c: C.now, a: fa });
      txt('τ = 4', p[0] - 24, p[1] + 48, { size: 26, fam: F.math, w: 700, align: 'right', c: C.cyan, a: fa });
    }
  });
  legend([['light cone  t² − x² = 0', C.white], ['t² − x² = 16', C.cyan]], a);
  /* the boost panel */
  const y = 190, c = Math.cosh(eta), s = Math.sinh(eta);
  panel(PX, y, PW, 640, a, C.cyan, 'BOOST · 推动 B(η)');
  rich([['η = ', C.white], [fmt(eta), C.now], [eta > LN2 - 1e-9 ? '  = ln 2' : '', C.now]], PX + 28, y + 80, { size: 30, fam: F.math, a });
  txt('B(η) =', PX + 28, y + 160, { size: 28, fam: F.math, w: 700, c: C.white, a });
  mat2(PX + 140, y + 150, [[fmt(c), fmt(-s)], [fmt(-s), fmt(c)]], a, { size: 26, cw: 130 });
  txt('[[cosh η, −sinh η], [−sinh η, cosh η]]', PX + 140, y + 230, { size: 16, fam: F.mono, c: C.dim, a });
  numTag(PX + PW - 110, y + 25, a);
  /* exact values at ln 2 */
  const q1 = Q(S, 1, 'Cosh is', 0.6) * a;
  rich([['e^η = 2:  cosh η = ', C.white], [RS(HX.ch2), C.cyan], ['   sinh η = ', C.white], [RS(HX.sh2), C.cyan]], PX + 28, y + 268, { size: 28, a: q1 });
  const q2 = Q(S, 1, 'their squares', 0.6) * a;
  rich([[`(${RS(HX.ch2)})² − (${RS(HX.sh2)})² = 16/16 = `, C.white], ['1', C.lean]], PX + 28, y + 320, { size: 28, a: q2 });
  txt('|cosh r|² − |sinh r|² = 1    ∀ r : ℝ', PX + 28, y + 370, { size: 22, fam: F.math, w: 700, c: C.white, a: q2 });
  leanChip(PX + 28, y + 412, 'bogoliubov_norm_conservation', q2, { size: 19 });
  const q3 = Q(S, 2, 'slides', 0.6) * a;
  rich([['B(5, 3) = ', C.white], [`(${RS(HX.Bv[0])}, ${RS(HX.Bv[1])})`, C.now], ['   τ² = 16 − 0 = 16', C.cyan]], PX + 28, y + 492, { size: 28, a: q3 });
  const q4 = Q(S, 3, 'moving frame', 0.6) * a;
  rich([['β = tanh η = ', C.white], [RS(HX.beta2), C.now], ['   axis t′ ∝ ', C.white], [`(${RS(HX.ch2)}, ${RS(HX.sh2)})`, C.now]], PX + 28, y + 566, { size: 26, a: q4 });
  arguedTag(PX + PW - 130, y + 604, q4);
};

/* ======================================================================= */
/*                          scene 3 · THE CONE STAYS                         */
/* ======================================================================= */
function coneEta(S) {
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  const p = clamp((S.u - L0.s - 0.2) / Math.max(1, L1.e - L0.s));
  const sweep = p < 0.5 ? Math.sin(TAU * p) : 0.6 * Math.sin(TAU * p);
  return sweep + LN2 * ease(clamp((S.u - lineAt(S, 2).s) / 1.6));
}
function coneK(S) { return 1 + (KSC - 1) * ease(clamp((S.u - lineAt(S, 3).s - 0.4) / 1.8)); }
SCENES.cone = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const P = P1(), eta = coneEta(S), k = coneK(S);
  const M = v => bst(eta, v).map(z => k * z);
  const ka = clamp((k - 1) / (KSC - 1));
  clipped(P, () => {
    /* the lab grid carried by k·B(η) */
    for (let j = 1; j <= 12; j++) segTX(P, M([j, -14]), M([j, 14]), C.dim, 0.22 * a, 1.1);
    for (let j = -12; j <= 12; j++) segTX(P, M([0, j]), M([16, j]), C.dim, 0.22 * a, 1.1);
    stageAxes(P, a, { tmax: 9.2, xmin: -7, xmax: 7 });
    lightCone(P, a, 7);
    hyper(P, 4, -7, 7, C.cyan, 0.9 * a, 2.6);
    hyper(P, 6, -7, 7, C.cyan, 0.85 * a * ka, 2.2, true);
    /* the beads on both branches of the cone (white) */
    for (const v of BEADS) for (const sg of [1, -1]) {
      const b = P(M([v, sg * v]));
      dot(b[0], b[1], 11, 'w', a);
    }
    /* the event and the unit tick (amber) */
    const p = P(M([5, 3]));
    dot(p[0], p[1], 15, 'g', a);
    if (ka > 0) {
      const t1 = P([k, 0]), t0 = P([1, 0]);
      line(t0[0] - 10, t0[1], t0[0] + 10, t0[1], C.dim, a * ka, 2);
      line(t1[0] - 14, t1[1], t1[0] + 14, t1[1], C.now, a * ka, 4);
      txt(fmt(k, 2), t1[0] - 22, t1[1] + 8, { size: 21, fam: F.mono, w: 700, align: 'right', c: C.now, a: a * ka });
      txt(`(${fmt(k * 4, 2)}, 0)`, p[0] - 24, p[1] + 44, { size: 24, fam: F.math, w: 700, align: 'right', c: C.now, a: a * ka });
    }
  });
  legend([['light cone  t² − x² = 0', C.white], ['t² − x² = 16   τ = 4', C.cyan], ['t² − x² = 36   τ = 6', C.cyan, true, ka]], a);
  /* the panel: beads (lines 0–1), then the Lean theorem and the scale (lines 2–3) */
  const y = 190, A1 = a * (1 - Q(S, 2, 'Lean checks', 0.5, -0.4)), A2 = a * Q(S, 2, 'Lean checks', 0.6);
  panel(PX, y, PW, 640, a, C.cyan, 'THE LIGHT CONE · 光锥');
  rich([['η = ', C.white], [fmt(eta), C.now]], PX + 28, y + 80, { size: 30, fam: F.math, a: A1 });
  numTag(PX + PW - 110, y + 25, A1);
  if (A1 > 0.003) {
    let worst = 0, n = 0;
    for (const v of BEADS) for (const sg of [1, -1]) { const b = M([v, sg * v]); worst = Math.max(worst, Math.abs(mink(b))); n++; }
    rich([['right branch  × e^−η = ', C.white], [fmt(Math.exp(-eta)), C.white]], PX + 28, y + 150, { size: 25, fam: F.mono, a: A1 });
    rich([['left branch   × e^η  = ', C.white], [fmt(Math.exp(eta)), C.white]], PX + 28, y + 196, { size: 25, fam: F.mono, a: A1 });
    rich([['beads on the cone   ', C.white], [`${n} / ${n}`, C.white]], PX + 28, y + 262, { size: 25, fam: F.mono, a: A1 });
    rich([['max |t² − x²|       ', C.white], [fmt(worst, 6), C.white]], PX + 28, y + 306, { size: 25, fam: F.mono, a: A1 });
    rich([['event  t² − x² = ', C.white], [fmt(mink(bst(eta, [5, 3]))), C.cyan]], PX + 28, y + 372, { size: 25, fam: F.mono, a: A1 });
  }
  if (A2 > 0.003) {
    txt('hnull : ∀ v, minkowski d v = 0 → S v = 0', PX + 28, y + 86, { size: 23, fam: F.mono, w: 700, c: C.white, a: A2 });
    rich([['⊢ S = ', C.white], ['S (1, 0)', C.now], [' • minkowski d', C.white]], PX + 28, y + 130, { size: 26, fam: F.mono, a: A2 });
    leanChip(PX + 28, y + 186, 'eq_smul_minkowski_of_null', A2, { size: 19 });
    stamp('SHAPE LOCKED', PX + 330, y + 290, Q(S, 2, 'is a multiple', 0.4, 0.2) * a, C.lean, 30, -0.05);
    const s3 = a * at(S, 3, 0.6, 0.3);
    numTag(PX + PW - 110, y + 372, s3);
    rich([['S(v) = minkowski(k·B·v) = ', C.white], ['k²', C.now], [' · minkowski(v)', C.white]], PX + 28, y + 420, { size: 24, a: s3 });
    rich([['k = ', C.white], [RS(HX.k), C.now], ['  ⇒  S(1, 0) = ', C.white], [RS(HX.k2), C.now], [' ≠ 1', C.white]], PX + 28, y + 470, { size: 26, a: s3 });
    rich([['τ: 4 → 6', C.cyan], ['   unit tick: 1 → ', C.white], [RS(HX.k), C.now]], PX + 28, y + 520, { size: 24, a: s3 });
    txt('cone kept · scale not', PX + 28, y + 580, { size: 24, fam: F.mono, w: 700, c: C.now, a: s3, ls: 2 });
  }
};

/* ======================================================================= */
/*                          scene 4 · RAPIDITIES ADD                         */
/* ======================================================================= */
const P4 = () => stg(420, 800, 200, STAGE_CLIP);
function sector(P, f0, f1, col, af, al) {
  if (af <= 0.003 && al <= 0.003) return;
  ctx.save();
  ctx.beginPath();
  const O = P([0, 0]); ctx.moveTo(O[0], O[1]);
  const n = Math.max(8, Math.ceil(Math.abs(f1 - f0) * 60));
  for (let i = 0; i <= n; i++) { const f = f0 + (f1 - f0) * i / n, p = P([Math.cosh(f), Math.sinh(f)]); ctx.lineTo(p[0], p[1]); }
  ctx.closePath();
  ctx.globalAlpha = af; ctx.fillStyle = col; ctx.fill();
  ctx.globalAlpha = al; ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.stroke();
  ctx.restore();
}
function addPhases(S) {
  const t1 = phraseAt(S, 0, 'Push by'), t2 = phraseAt(S, 0, 'again');
  return { f1: LN2 * ease(clamp((S.u - t1) / 1.4)), f2: LN2 * ease(clamp((S.u - t2 + 0.3) / 1.8)) };
}
function drawAdd(P, f1, f2, a, o = {}) {
  clipped(P, () => {
    stageAxes(P, a, { tmax: 3.0, xmin: -1.5, xmax: 3.0 });
    lightCone(P, a, 3.1);
    hyper(P, 1, -1.5, 2.9, C.cyan, 0.9 * a, 2.6);
    /* the first sector, and its image under the second push sliding into place (magenta: area) */
    sector(P, 0, f1, C.mag, 0.3 * a, 0.9 * a);
    if (f2 > 0.002) sector(P, f2, LN2 + f2, C.mag, 0.22 * a, 0.9 * a);
    /* past rays (cyan) and the current frame axis t′ through (cosh φ, sinh φ) (amber) */
    const cur = f1 + f2, pc = [Math.cosh(cur), Math.sinh(cur)];
    if (f2 > 0.002) segTX(P, [0, 0], [2.3, 2.3 * Math.tanh(LN2)], C.cyan, 0.8 * a, 2);
    segTX(P, [0, 0], [2.9, 2.9 * Math.tanh(cur)], C.now, a, 3);
    const p = P(pc);
    dot(p[0], p[1], 15, 'g', a);
    if (o.labels) o.labels(P, pc);
  });
  legend([['light cone  t² − x² = 0', C.white], ['t² − x² = 1', C.cyan], ['sector area', C.mag]], a, o.lx || 730, o.ly || 650);
}
SCENES.add = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Velocities', 'argued']]);
  const P = P4(), { f1, f2 } = addPhases(S);
  const aa = Q(S, 2, 'same sector', 0.6) * a, va = Q(S, 3, 'Velocities', 0.6) * a;
  drawAdd(P, f1, f2, a, {
    labels: (P, pc) => {
      const e1 = P([1, 0]);
      dot(e1[0], e1[1], 9, 'w', a);
      txt('(1, 0)', e1[0] - 16, e1[1] + 8, { size: 22, fam: F.math, w: 700, align: 'right', c: C.white, a });
      const p1 = P([HQ.val(HX.ch2), HQ.val(HX.sh2)]);
      if (f1 > LN2 - 1e-6) {
        dot(p1[0], p1[1], 9, 'c', a);
        txt(`(${RS(HX.ch2)}, ${RS(HX.sh2)})`, p1[0] - 14, p1[1] - 22, { size: 22, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
      }
      const p2 = P(pc);
      if (f2 > LN2 - 1e-6) txt(`(${RS(HX.ch4)}, ${RS(HX.sh4)})`, p2[0] + 64, p2[1] + 10, { size: 26, fam: F.math, w: 700, c: C.now, a });
      /* the sector areas */
      const m1 = P([0.75 * Math.cosh(LN2 / 4), 0.75 * Math.sinh(LN2 / 4)]), m2 = P([0.8 * Math.cosh(1.5 * LN2), 0.8 * Math.sinh(1.5 * LN2)]), l2 = P([1.9, 0.9]);
      txt('ln 2 / 2', m1[0] + 16, m1[1] + 8, { size: 20, fam: F.math, w: 700, align: 'center', c: C.mag, a: aa });
      line(l2[0] + 4, l2[1] + 4, m2[0], m2[1], C.mag, 0.8 * aa, 1.5);
      dot(m2[0], m2[1], 6, 'm', aa);
      txt('ln 2 / 2', l2[0], l2[1], { size: 22, fam: F.math, w: 700, align: 'right', c: C.mag, a: aa });
      /* the slopes β of the two frame axes */
      const r1 = P([2.3, 2.3 * Math.tanh(LN2)]), r2 = P([2.9, 2.9 * Math.tanh(LN4)]);
      txt(`β = ${RS(HX.beta2)}`, r1[0] + 14, r1[1] + 4, { size: 24, fam: F.math, w: 700, c: C.cyan, a: va });
      txt(`β = ${RS(HX.beta4)}`, r2[0] - 10, r2[1] - 14, { size: 24, fam: F.math, w: 700, align: 'right', c: C.now, a: va });
    }
  });
  /* the panel */
  const y = 190;
  panel(PX, y, PW, 640, a, C.cyan, 'COMPOSITION · 合成');
  const cur = f1 + f2;
  rich([['η = ', C.white], [fmt(f1), C.cyan], [' + ', C.white], [fmt(f2), C.cyan], [' = ', C.white], [fmt(cur), C.now]], PX + 28, y + 80, { size: 28, fam: F.math, a });
  numTag(PX + PW - 110, y + 25, a);
  const q1 = Q(S, 1, 'multiply', 0.6) * a;
  if (q1 > 0) {
    const M = r => [[RS(r[0][0]), RS(r[0][1])], [RS(r[1][0]), RS(r[1][1])]];
    let x = mat2(PX + 28, y + 160, M(HX.B2), q1, { size: 24, cw: 74 });
    x = mat2(x + 18, y + 160, M(HX.B2), q1, { size: 24, cw: 74 });
    txt('=', x + 16, y + 182, { size: 30, fam: F.math, w: 700, c: C.white, a: q1 });
    mat2(x + 50, y + 160, M(HX.B22), q1, { size: 24, cw: 86, c: C.now });
    rich([['B(ln 2) · B(ln 2) = B(ln 4):  e^η = 4,  ', C.white]], PX + 28, y + 262, { size: 22, a: q1 });
    rich([['cosh = (4 + 1/4)/2 = ', C.white], [RS(HX.ch4), C.now], ['   sinh = ', C.white], [RS(HX.sh4), C.now]], PX + 28, y + 302, { size: 24, a: q1 });
  }
  if (aa > 0) {
    rich([['sector area = η/2:  ', C.white], [fmt(LN2 / 2), C.mag], [' + ', C.white], [fmt(LN2 / 2), C.mag], [' = ', C.white], [fmt(sectorArea(0, LN4)), C.mag]], PX + 28, y + 372, { size: 24, a: aa });
    txt('det B = cosh² − sinh² = 1: each push keeps areas', PX + 28, y + 410, { size: 20, fam: F.mono, w: 700, c: C.dim, a: aa });
  }
  if (va > 0) {
    rich([[`${RS(HX.beta2)} + ${RS(HX.beta2)} = ${RS(HX.naive)} > 1`, C.dim]], PX + 28, y + 480, { size: 26, a: va });
    const xs = PX + 28, ws = tw(`${RS(HX.beta2)} + ${RS(HX.beta2)} = ${RS(HX.naive)} > 1`, 26, F.math, 700);
    line(xs - 4, y + 471, xs + ws + 4, y + 471, C.dim, va, 2);
    rich([[`(${RS(HX.beta2)} + ${RS(HX.beta2)}) / (1 + ${RS(HX.beta2)}·${RS(HX.beta2)}) = `, C.white], [RS(HX.comp), C.now], [' < 1', C.white]], PX + 28, y + 532, { size: 26, a: va });
    rich([['= tanh(ln 4)', C.white]], PX + 28, y + 576, { size: 24, a: va });
    arguedTag(PX + PW - 130, y + 604, va);
  }
};

/* ======================================================================= */
/*                      scene 5 · SAME COUNT, ANY FRAME                      */
/* ======================================================================= */
const P5 = () => stg(760, 815, 45, STAGE_CLIP);
function twinsEta(S) { return LN2 * ease(clamp((S.u - phraseAt(S, 2, 'Boost into') - 0.2) / 3.2)); }
SCENES.twins = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const P = P5(), eta = twinsEta(S);
  const O = [0, 0], A = bst(eta, [5, 3]), Pp = bst(eta, [10, 0]);
  const draw = clamp((u - lineAt(S, 0).s - 0.3) / 2.6);
  const tk = Q(S, 1, 'Each bent leg', 2.4);
  clipped(P, () => {
    stageAxes(P, a, { tmax: 13, xmin: -8.5, xmax: 8.5 });
    lightCone(P, a * 0.9, 10.5);
    /* the hyperbolas t² − x² = k² through the outbound ticks (faint cyan): they do not move */
    for (let k = 1; k <= 4; k++) hyper(P, k, -8.5, 8.5, C.cyan, 0.22 * a, 1.4);
    /* the rest worldline O → P (white, thick) and the bent one O → A → P (cyan) */
    const o = P(O), ap = P(A), pp = P(Pp);
    const d1 = clamp(draw * 2), d2 = clamp(draw * 2 - 1);
    line(o[0], o[1], lerp(o[0], pp[0], draw), lerp(o[1], pp[1], draw), C.white, a, 6);
    line(o[0], o[1], lerp(o[0], ap[0], d1), lerp(o[1], ap[1], d1), C.cyan, a, 4);
    if (d2 > 0) line(ap[0], ap[1], lerp(ap[0], pp[0], d2), lerp(ap[1], pp[1], d2), C.cyan, a, 4);
    /* proper-time ticks, appearing one by one */
    for (let k = 1; k <= 10; k++) if (tk * 10 >= k) tick(o, pp, k / 10, 26, C.white, a, 3);
    for (let k = 1; k <= 4; k++) {
      if (tk * 8 >= k) tick(o, ap, k / 4, 22, C.cyan, a, 3);
      if (tk * 8 >= k + 4) tick(ap, pp, k / 4, 22, C.cyan, a, 3);
    }
    dot(o[0], o[1], 9, 'w', a);
    txt('O', o[0] - 18, o[1] + 30, { size: 26, fam: F.math, w: 700, c: C.white, a });
    dot(pp[0], pp[1], 11, 'w', a * clamp(draw * 3 - 2));
    txt(`P (${fmt(Pp[0], 1)}, ${fmt(Pp[1], 1)})`, pp[0] - 22, pp[1] - 4, { size: 24, fam: F.math, w: 700, align: 'right', c: C.white, a: a * clamp(draw * 3 - 2) });
    dot(ap[0], ap[1], 14, 'g', a * d1);
    txt(`A (${fmt(A[0], 1)}, ${fmt(A[1], 1)})`, ap[0] + 22, ap[1] + 10, { size: 24, fam: F.math, w: 700, c: C.now, a: a * d1 });
  });
  legend([['light cone', C.white], ['t² − x² = 1, 4, 9, 16', C.cyan, false, 0.6], ['rest worldline', C.white], ['bent worldline', C.cyan]], a, 830, 204);
  /* the ledger of the three legs */
  const y = 190, pa = at(S, 0, 0.6, 0.3) * a;
  if (pa <= 0) return;
  panel(PX, y, PW, 640, pa, C.cyan, 'PROPER TIME · 固有时');
  const ea = Q(S, 2, 'Boost into', 0.6) * pa;
  rich([['frame η = ', C.white], [fmt(eta), C.now], [eta > LN2 - 1e-9 ? '  = ln 2' : '', C.now]], PX + 28, y + 78, { size: 26, fam: F.math, a: ea });
  numTag(PX + PW - 110, y + 25, pa);
  const cols = [PX + 28, PX + 120, PX + 340, PX + 470, PX + 530];
  ['leg', 'Δv = (Δt, Δx)', 't² − x²', 'τ', 'η'].forEach((h, i) => txt(h, cols[i], y + 140, { size: 19, fam: F.mono, w: 700, c: C.dim, a: pa }));
  const legs = [['out', O, A, C.cyan], ['back', A, Pp, C.cyan], ['rest', O, Pp, C.white]];
  legs.forEach(([nm, p, q, col], i) => {
    const d = [q[0] - p[0], q[1] - p[1]], ry = y + 190 + i * 48, la = pa * at(S, 0, 0.5, 0.6 + 0.4 * i);
    txt(nm, cols[0], ry, { size: 23, fam: F.mono, w: 700, c: col, a: la });
    txt(`(${fmt(d[0], 1)}, ${fmt(d[1], 1)})`, cols[1], ry, { size: 23, fam: F.mono, w: 700, c: C.white, a: la });
    txt(fmt(mink(d), 2), cols[2], ry, { size: 23, fam: F.mono, w: 700, c: C.cyan, a: la });
    txt(String(Math.round(Math.sqrt(mink(d)))), cols[3], ry, { size: 23, fam: F.mono, w: 700, c: col, a: la * Q(S, 1, 'Each bent leg', 0.5) });
    txt(fmt(legEta(d)), cols[4], ry, { size: 23, fam: F.mono, w: 700, c: i === 1 ? C.now : C.white, a: la });
  });
  const ta = Q(S, 1, 'eight in all', 0.6) * pa;
  rich([['τ(bent) = ', C.white], [`${RS(HX.tau(HX.out))} + ${RS(HX.tau(HX.back))} = `, C.cyan], [RS(HQ.add(HX.tau(HX.out), HX.tau(HX.back))), C.cyan],
    ['    τ(rest) = ', C.white], [RS(HX.tau(HX.rest)), C.white]], PX + 28, y + 370, { size: 28, a: ta });
  txt('√q(Δv₁ + Δv₂) = 10  >  4 + 4 = √q(Δv₁) + √q(Δv₂)', PX + 28, y + 414, { size: 20, fam: F.math, w: 700, c: C.dim, a: ta });
  const ba = Q(S, 2, 'minus log four', 0.6) * pa;
  rich([['back:  ', C.white], ['−ln 2 − ln 2 = −ln 4', C.now]], PX + 28, y + 490, { size: 26, a: ba });
  rich([['Δv = ', C.white], [`(${RS(HX.backB[0])}, ${RS(HX.backB[1])})`, C.now], ['   β = ', C.white], [RS(HQ.div(HX.backB[1], HX.backB[0])), C.now]], PX + 28, y + 536, { size: 26, a: ba });
  stamp('STILL 8 AND 10', PX + PW / 2, y + 588, at(S, 3, 0.4, 1.2) * pa, C.cyan, 28, -0.04);
};

/* ======================================================================= */
/*                              scene 6 · LEDGER                             */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 300 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const t = 60.0;
  background(t, TL.scenes[1], 1, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.3, a: 0.2, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the boost of the chapter's example: (5, 3) slides along τ = 4 to (4, 0); the traveller's axes close on the cone */
  const P = stg(600, 860, 66, [60, 120, 1110, 880]), c = Math.cosh(LN2), s = Math.sinh(LN2);
  clipped(P, () => {
    segTX(P, [0, 0], [9.6, 0], C.dim, 0.7, 1.6, true);
    segTX(P, [0, -7.5], [0, 7.5], C.dim, 0.7, 1.6, true);
    lightCone(P, 1, 9);
    hyper(P, 4, -7.5, 7.5, C.cyan, 0.9, 2.6);
    segTX(P, [0, 0], [10.2 * c, 10.2 * s], C.now, 1, 3);
    segTX(P, [-8 * s, -8 * c], [8 * s, 8 * c], C.now, 1, 3);
    const tl = P([9.2, 9.2 * Math.tanh(LN2)]), xl = P([5.6 * s, 5.6 * c]);
    txt('t′', tl[0] + 18, tl[1] + 8, { size: 32, fam: F.math, w: 700, c: C.now });
    txt('x′', xl[0] - 4, xl[1] - 18, { size: 32, fam: F.math, w: 700, c: C.now });
    const g = P([5, 3]);
    ring(g[0], g[1], 12, C.dim, 0.8, 1.6);
    txt('(5, 3)', g[0] + 20, g[1] + 8, { size: 28, fam: F.math, w: 700, c: C.dim });
    pathTX(P, k => bst(LN2 * k, [5, 3]), 60, C.now, 0.9, 5);
    const p = P(bst(LN2, [5, 3]));
    dot(p[0], p[1], 15, 'g', 1);
    txt('(4, 0)', p[0] - 24, p[1] + 10, { size: 30, fam: F.math, w: 700, align: 'right', c: C.now });
    txt('τ = 4', p[0] - 24, p[1] + 50, { size: 28, fam: F.math, w: 700, align: 'right', c: C.cyan });
  });
  legend([['light cone  t² − x² = 0', C.white], ['t² − x² = 16', C.cyan]], 1, 140, 204);
  txt('双曲旋转', 1440, 300, { size: 128, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('光锥不动', 1440, 400, { size: 60, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 2 });
  txt('HYPERBOLIC ROTATION', 1440, 490, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 6 });
  txt('THE LIGHT CONE STAYS', 1440, 540, { size: 26, fam: F.orb, w: 700, align: 'center', c: C.white, ls: 4 });
  rich([['η = ln 2:  ', C.white], ['(5, 3) → (4, 0)', C.now], ['   ·   ', C.dim], ['τ = 4', C.cyan]], 1440, 630, { size: 38, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM ${DATA.film.number}`, 1440, 700, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  leanList(W / 2, 922, 1, { align: 'center', size: 18, gap: 36 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1018, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, TL.scenes[1]);
  post(3);
};
