/* Film · Three slits, only pairs interfere · 三条缝，只有两两干涉
   (book quantum-geometry, part I: chapter 2). Scenes for theme/film/engine.js.

   The slits are the schematic far-field model of the chapter's three-slit example: at a point of the screen slit j
   sends the unit arrow v_j = e^{i j δ} (j = 0, 1, 2 for A, B, C), δ being the phase step between neighbouring slits,
   and the weight of a set S of open slits is W(S) = |Σ_{j∈S} v_j|² (unnormalized, like the 9, 4, 1 of the text).

   What each scene shows, and where it rests:
     slits    W(A) = 1, W(AB) = 2 + 2 cos δ, W(ABC) = 3 + 4 cos δ + 2 cos 2δ along the screen; with two slits the
              pattern lies above 1 + 1 in some places and below it in others (computed in the model).
     square   At δ = 60° the arrows sum to 1 + i√3, of length 2, weight 4; |Σ v|² = Σ_{i,j} v_i v_j*: three diagonal
              tiles 1 and the pair sums 2 cos 60° = +1, 2 cos 120° = −1, 2 cos 60° = +1 (computed).
     count    I₃ = W(ABC) − W(AB) − W(AC) − W(BC) + W(A) + W(B) + W(C): every diagonal tile is counted 1 − 2 + 1, every
              mixed tile 1 − 1 (enumerated); 4 − 3 − 1 − 3 + 1 + 1 + 1 = 0 at 60° and 9 − 4 − 4 − 4 + 1 + 1 + 1 = 0
              for equal arrows (chapter 2, the three-slit example; computed).
     sweep    For −360° ≤ δ ≤ 360°, W(ABC) = W(AB) + W(AC) + W(BC) − W(A) − W(B) − W(C) while the pair terms
              4 cos δ + 2 cos 2δ swing between −3 and 6 (computed).
     theorem  recordWeight P ρ k = ‖⟨φ|ψ⟩‖² for P k = φφ*, ρ = ψψ*
              ..... BornReduction.rank_one_pure_state_modulus_square_reduction (LEAN);
              linearity of the inner product makes the amplitude a sum over paths; the seven-term sum of
              amplitudeWeight v S = (Σ_{x∈S} v x)(Σ_{x∈S} v x)* vanishes for pairwise disjoint A, B, C over a commutative
              star ring ..... SorkinThirdOrder.sorkin_third_order_cancellation (LEAN); three bundles of nine fixed arrows
              give I₃ = 0 on screen (computed).
     edge     |·|⁴: 81 − 48 + 3 = 36 and a nonzero I₃ along the screen (computed); the square forces I₃ = 0
              (the theorem above); additive weights Σ |v|² also give I₃ = 0, so I₃ = 0 alone does not single out the
              Born rule (computed); real slits and their crosstalk lie outside the identity (chapter 2's boundary
              remark; argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen by an
   independent route (tile expansions against direct sums, the closed forms against the arrows on a grid of δ, the
   inclusion–exclusion counts by enumeration, random bundles of complex arrows). Any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const TS_DEG = Math.PI / 180;
const tsAdd = (p, q) => [p[0] + q[0], p[1] + q[1]];
const tsMul = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
const tsConj = p => [p[0], -p[1]];
const tsAbs2 = p => p[0] * p[0] + p[1] * p[1];
const tsExpi = th => [Math.cos(th), Math.sin(th)];
/* the arrows of slits A, B, C at phase step δ */
const tsArrows = d => [tsExpi(0), tsExpi(d), tsExpi(2 * d)];
const tsSum = (vs, mask) => mask.reduce((s, j) => tsAdd(s, vs[j]), [0, 0]);
/* weight of a set of open slits, with power p of the length (p = 2: the square) */
const tsW = (vs, mask, p = 2) => Math.pow(tsAbs2(tsSum(vs, mask)), p / 2);
/* the seven weights of Sorkin's combination, in the order of the formula */
const TS_SETS = [
  { n: 'ABC', m: [0, 1, 2], s: 1 }, { n: 'AB', m: [0, 1], s: -1 }, { n: 'AC', m: [0, 2], s: -1 }, { n: 'BC', m: [1, 2], s: -1 },
  { n: 'A', m: [0], s: 1 }, { n: 'B', m: [1], s: 1 }, { n: 'C', m: [2], s: 1 }
];
const tsI3 = (vs, p = 2) => TS_SETS.reduce((t, S) => t + S.s * tsW(vs, S.m, p), 0);
/* closed forms in δ */
const tsW3 = d => 3 + 4 * Math.cos(d) + 2 * Math.cos(2 * d);
const tsCross = d => 4 * Math.cos(d) + 2 * Math.cos(2 * d);
const tsI3four = d => tsI3(tsArrows(d), 4);
/* nine fixed path arrows, curling like a path sum, split into three disjoint bundles (scene theorem): [length, angle°] */
const TS_BUNDLES = [
  { n: 'A', v: [[0.55, -20], [0.45, 10], [0.40, 45]] },
  { n: 'B', v: [[0.50, 80], [0.42, 115]] },
  { n: 'C', v: [[0.45, 150], [0.38, 185], [0.32, 220], [0.30, 255]] }
].map(b => Object.assign(b, { z: b.v.map(([r, a]) => [r * Math.cos(a * TS_DEG), r * Math.sin(a * TS_DEG)]) }));
const tsBundleSum = mask => mask.reduce((s, j) => TS_BUNDLES[j].z.reduce(tsAdd, s), [0, 0]);
const tsBundleW = mask => tsAbs2(tsBundleSum(mask));
const tsBundleI3 = () => TS_SETS.reduce((t, S) => t + S.s * tsBundleW(S.m), 0);
/* additive (no interference) weights: Σ |v|² over the open arrows */
const tsAdditiveW = (vs, mask) => mask.reduce((s, j) => s + tsAbs2(vs[j]), 0);

const TS_LEAN = {
  rank_one_pure_state_modulus_square_reduction: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
  sorkin_third_order_cancellation: 'D5/S3/Quantum/SorkinThirdOrder.sorkin_third_order_cancellation'
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('three-slits film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(TS_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(TS_LEAN).length}`);
  for (const [short, gid] of Object.entries(TS_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the nine tiles: |Σ v|² = Σ_{i,j} v_i v_j*, whose imaginary parts cancel in mirror pairs (random complex arrows) */
  for (let k = 0; k < 60; k++) {
    const vs = [0, 1, 2].map(j => [2 * rnd(k, j) - 1, 2 * rnd(k, j + 7) - 1]);
    let re = 0, im = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { const z = tsMul(vs[i], tsConj(vs[j])); re += z[0]; im += z[1]; }
    check(near(re, tsAbs2(tsSum(vs, [0, 1, 2]))) && near(im, 0), `tile expansion ${k}`);
    check(Math.abs(tsI3(vs)) < 1e-12, `I3 of random arrows ${k}`);
  }
  /* 2. the inclusion–exclusion count of every tile is zero: 1 − 2 + 1 on the diagonal, 1 − 1 off it */
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const hits = TS_SETS.filter(S => S.m.includes(i) && S.m.includes(j));
    const c = hits.reduce((t, S) => t + S.s, 0);
    check(c === 0, `tile (${i}, ${j}) counted ${c}`);
    check(hits.length === (i === j ? 4 : 2), `tile (${i}, ${j}) appears ${hits.length} times`);
  }
  /* 3. SQUARE and COUNT at δ = 60°: sum 1 + i√3, weights 4, 3, 1, 3, 1, 1, 1; pair sums +1, −1, +1 */
  const v60 = tsArrows(60 * TS_DEG), s60 = tsSum(v60, [0, 1, 2]);
  check(near(s60[0], 1) && near(s60[1], Math.sqrt(3)), 'sum of the three arrows at 60°');
  const w60 = TS_SETS.map(S => tsW(v60, S.m));
  [4, 3, 1, 3, 1, 1, 1].forEach((v, k) => check(near(w60[k], v), `weight ${TS_SETS[k].n} at 60° is ${w60[k]}`));
  const pair = (vs, i, j) => 2 * tsMul(vs[i], tsConj(vs[j]))[0];
  check(near(pair(v60, 0, 1), 1) && near(pair(v60, 0, 2), -1) && near(pair(v60, 1, 2), 1), 'pair sums at 60°');
  check(near(3 + pair(v60, 0, 1) + pair(v60, 0, 2) + pair(v60, 1, 2), 4), 'tiles at 60° add to 4');
  /* equal arrows: 9, 4, 4, 4, 1, 1, 1 */
  const v0 = tsArrows(0), w0 = TS_SETS.map(S => tsW(v0, S.m));
  [9, 4, 4, 4, 1, 1, 1].forEach((v, k) => check(near(w0[k], v), `weight ${TS_SETS[k].n} for equal arrows`));
  /* 4. SLITS and SWEEP: closed forms against the arrows; I3 = 0 along the whole screen */
  for (let d = -400; d <= 400; d += 0.5) {
    const vs = tsArrows(d * TS_DEG);
    check(near(tsW(vs, [0, 1, 2]), tsW3(d * TS_DEG), 1e-11), `W(ABC) closed form at ${d}°`);
    check(near(tsW(vs, [0, 1]), 2 + 2 * Math.cos(d * TS_DEG), 1e-11) && near(tsW(vs, [1, 2]), 2 + 2 * Math.cos(d * TS_DEG), 1e-11), `W(AB), W(BC) at ${d}°`);
    check(near(tsW(vs, [0, 2]), 2 + 2 * Math.cos(2 * d * TS_DEG), 1e-11), `W(AC) at ${d}°`);
    check(near(tsW(vs, [0]), 1) && near(tsW(vs, [1]), 1) && near(tsW(vs, [2]), 1), `single slits at ${d}°`);
    check(Math.abs(tsI3(vs)) < 1e-11, `I3 at ${d}°`);
    const cr = tsCross(d * TS_DEG);
    check(near(tsW3(d * TS_DEG), 3 + cr, 1e-11) && cr >= -3 - 1e-12 && cr <= 6 + 1e-12, `pair terms at ${d}°`);
  }
  /* 5. THEOREM: three disjoint bundles of fixed arrows */
  check(Math.abs(tsBundleI3()) < 1e-12, `bundle I3 = ${tsBundleI3()}`);
  for (let k = 0; k < 40; k++) {
    const sizes = [1 + (k % 3), 1 + ((k >> 1) % 4), 1 + ((k >> 2) % 3)];
    const bundles = sizes.map((n, j) => Array.from({ length: n }, (_, i) => [2 * rnd(k + 0.3 * i, j) - 1, 2 * rnd(k, j + 3 * i + 11) - 1]));
    const sum = mask => mask.reduce((s, j) => bundles[j].reduce(tsAdd, s), [0, 0]);
    const I = TS_SETS.reduce((t, S) => t + S.s * tsAbs2(sum(S.m)), 0);
    check(Math.abs(I) < 1e-12, `random bundles ${k}: I3 = ${I}`);
  }
  /* 6. EDGE: the fourth power leaves 81 − 48 + 3 = 36 for equal arrows and is nonzero along the screen */
  check(near(tsI3(v0, 4), 36) && near(81 - 48 + 3, 36), 'fourth-power I3 for equal arrows');
  check(near(tsI3four(Math.PI), -12), 'fourth-power I3 at 180°');
  let lo = Infinity, hi = -Infinity;
  for (let d = -360; d <= 360; d += 0.25) { const v = tsI3four(d * TS_DEG); lo = Math.min(lo, v); hi = Math.max(hi, v); }
  check(lo > -16 && hi < 40 && near(hi, 36), `fourth-power I3 range [${lo}, ${hi}]`);
  /* additive weights: no pair term and no third-order term */
  for (let k = 0; k < 20; k++) {
    const vs = [0, 1, 2].map(j => [2 * rnd(k, j + 40) - 1, 2 * rnd(k, j + 47) - 1]);
    const I3a = TS_SETS.reduce((t, S) => t + S.s * tsAdditiveW(vs, S.m), 0);
    const I2a = tsAdditiveW(vs, [0, 1]) - tsAdditiveW(vs, [0]) - tsAdditiveW(vs, [1]);
    check(Math.abs(I3a) < 1e-12 && Math.abs(I2a) < 1e-12, `additive weights ${k}`);
  }
});
Object.assign(FILM.speed, { slits: 0.02, square: 0.014, count: 0.014, sweep: 0.018, theorem: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const tsFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const tsNum = (v, n = 3, plus = false) => (v < -0.5 * Math.pow(10, -n) ? '−' : plus ? '+' : '') + Math.abs(v).toFixed(n);
function tsRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* e raised to a small exponent */
function tsExp(exp, x, y, size, col, a, align = 'center') {
  const we = tw('e', size, F.math, 700), wx = tw(exp, size * 0.62, F.math, 700), x0 = align === 'center' ? x - (we + wx) / 2 : x;
  txt('e', x0, y, { size, fam: F.math, w: 700, c: col, a });
  txt(exp, x0 + we + 1, y - size * 0.42, { size: size * 0.62, fam: F.math, w: 700, c: col, a });
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const TS_MISSING = new Set();
function tsLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!TS_MISSING.has(gid)) { TS_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* an arrow in the complex plane: z (complex) from screen point (x, y), R px per unit */
function tsPhasor(x, y, z, R, col, a, w = 4) {
  if (a <= 0.003) return [x, y];
  const x2 = x + R * z[0], y2 = y - R * z[1];
  if (Math.hypot(x2 - x, y2 - y) > 3) arrow(x, y, x2, y2, col, a, w);
  return [x2, y2];
}
/* the three slit arrows head to tail from (x, y), the sum in cyan; k: 0 = fanned from the origin, 1 = head to tail */
function tsChain(x, y, vs, R, a, o = {}) {
  const k = o.k == null ? 1 : o.k, labels = o.labels || ['a', 'b', 'c'];
  let px = x, py = y;
  const tips = [];
  vs.forEach((v, j) => {
    const sx = lerp(x, px, k), sy = lerp(y, py, k);
    const col = o.hl === j ? C.now : C.white;
    const [tx, ty] = tsPhasor(sx, sy, v, R, col, a * (o.al ? o.al[j] : 1), o.w || 4);
    tips.push([tx, ty]);
    if (labels[j] && (o.al ? o.al[j] : 1) > 0.01) {
      const mx = (sx + tx) / 2, my = (sy + ty) / 2, nx = -v[1], ny = -v[0];
      txt(labels[j], mx + 22 * nx, my + 22 * ny + 9, { size: o.ls || 28, fam: F.math, w: 700, align: 'center', c: col, a: a * (o.al ? o.al[j] : 1) });
    }
    px += R * v[0]; py -= R * v[1];
  });
  if (o.sum) tsPhasor(x, y, tsSum(vs, [0, 1, 2]), R, C.cyan, a * o.sum, 6);
  return { end: [px, py], tips };
}
/* opening title */
function tsTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THREE SLITS, ONLY PAIRS INTERFERE', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('SLITS · TILES · SEVEN WEIGHTS · SWEEP · SQUARE · ONE WAY', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                             scene 1 · THREE SLITS                         */
/* ======================================================================= */
const SL = { src: [230, 500], bx: 560, y0: 190, y1: 810, ys: [410, 500, 590], gap: 30, sx: 1190, k: 56 };
const slDelta = y => (y - 500) / 310 * 2.2 * Math.PI;
const slX = w => SL.sx + 14 + SL.k * w;
/* the screen pattern: one slit (1), blended into two (2 + 2 cos δ) by p2, into three by p3 */
function slPattern(y, p2, p3) {
  const d = slDelta(y), w1 = 1, w2 = 2 + 2 * Math.cos(d), w3 = tsW3(d);
  return lerp(w1, lerp(w2, w3, p3), p2);
}
function slBarrier(open, a) {
  const { bx, y0, y1, ys, gap } = SL;
  let y = y0;
  for (let j = 0; j < 3; j++) { line(bx, y, bx, ys[j] - gap / 2, C.white, a * 0.85, 6); y = ys[j] + gap / 2; }
  line(bx, y, bx, y1, C.white, a * 0.85, 6);
  for (let j = 0; j < 3; j++) {
    /* a shutter slides out of the gap as the slit opens */
    const s = 1 - open[j];
    if (s > 0.01) fillBox(bx - 8, ys[j] - gap / 2, 16, gap * s, C.dim, a * 0.9);
    txt('ABC'[j], bx - 30, ys[j] + 9, { size: 26, fam: F.math, w: 700, align: 'right', c: open[j] > 0.5 ? C.white : C.dim, a });
  }
}
function slWaves(t, open, a) {
  const [sx0, sy0] = SL.src;
  ctx.save();
  ctx.beginPath(); ctx.rect(0, SL.y0 - 30, SL.bx - 4, SL.y1 - SL.y0 + 60); ctx.clip();
  for (let k = 0; k < 7; k++) {
    const r = (t * 120 + k * 50) % 350;
    ctx.globalAlpha = a * 0.5 * clamp(r / 60) * clamp((350 - r) / 60); ctx.strokeStyle = C.cyan; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(sx0, sy0, r, -0.55, 0.55); ctx.stroke();
  }
  ctx.restore();
  ctx.save();
  ctx.beginPath(); ctx.rect(SL.bx + 4, SL.y0 - 30, SL.sx - SL.bx - 8, SL.y1 - SL.y0 + 60); ctx.clip();
  for (let j = 0; j < 3; j++) {
    if (open[j] <= 0.01) continue;
    for (let k = 0; k < 9; k++) {
      const r = (t * 120 + k * 72) % 650;
      ctx.globalAlpha = a * open[j] * 0.32 * clamp(r / 40) * clamp((650 - r) / 120); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(SL.bx, SL.ys[j], r, -1.05, 1.05); ctx.stroke();
    }
  }
  ctx.restore();
  dot(sx0, sy0, 16, 'w', a);
}
function slScreen(p2, p3, o1, a) {
  line(SL.sx, SL.y0, SL.sx, SL.y1, C.white, a * 0.5, 2);
  for (let y = SL.y0; y < SL.y1; y += 3) {
    const w = slPattern(y + 1.5, p2, p3) * o1;
    fillBox(SL.sx - 7, y, 14, 3, C.white, a * clamp(w / 9) * 0.95);
  }
  curve(s => { const y = lerp(SL.y0, SL.y1, s); return [slX(slPattern(y, p2, p3) * o1), y]; }, 260, C.cyan, a, 3.5);
}
SCENES.slits = S => {
  const u = S.u;
  tsTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L0 = lineAt(S, 0);
  const o1 = clamp((u - L0.s) / 0.6), p2 = ease(Q(S, 0, 'Open two', 0.9)), p3 = ease(Q(S, 2, 'open a third', 0.9));
  const open = [o1, p2, p3];
  slWaves(S.t, open, a);
  slBarrier(open, a);
  /* line 1: where two slits give more (cyan) or less (magenta) than the two alone, 1 + 1 */
  const da = a * at(S, 1, 0.6) * (1 - p3);
  if (da > 0) {
    for (let y = SL.y0; y < SL.y1; y += 2) {
      const w = slPattern(y + 1, p2, p3);
      const x1 = slX(2), x2 = slX(w);
      line(Math.min(x1, x2), y + 1, Math.max(x1, x2), y + 1, w > 2 ? C.cyan : C.mag, da * 0.35, 2);
    }
    dashed(slX(2), SL.y0, slX(2), SL.y1, C.white, da * 0.8, 2);
    txt('1 + 1', slX(2), SL.y1 + 32, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: da });
    txt('more · 多', slX(4) + 18, 508, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: da });
    txt('less · 少', slX(2) + 16, 368, { size: 26, fam: F.zh, w: 700, c: C.mag, a: da });
  }
  slScreen(p2, p3, o1, a);
  /* the open slits and the current formula */
  const px = 110, py = 690;
  panel(px, py, 430, 150, a, C.cyan, 'OPEN SLITS · 开着的缝');
  const n = p3 > 0.5 ? 3 : p2 > 0.5 ? 2 : 1;
  const f = ['W(A) = 1', 'W(AB) = 2 + 2 cos δ', 'W(ABC) = 3 + 4 cos δ + 2 cos 2δ'][n - 1];
  txt(f, px + 18, py + 76, { size: n === 3 ? 22 : 26, fam: F.math, w: 700, c: C.cyan, a });
  txt('schematic · equal arrows, far field', px + 18, py + 114, { size: 17, fam: F.mono, w: 700, c: C.argued, a: a * 0.9 });
  txt('示意模型', px + 18, py + 138, { size: 17, fam: F.zh, w: 700, c: C.argued, a: a * 0.9 });
  /* line 2: the question */
  const qa = a * Q(S, 2, 'Does it bring', 0.6);
  if (qa > 0) {
    chip(875, 232, 330, 64, 'A · B · C  ?', C.now, qa, 32, F.math);
    txt('a term that needs all three?', 875, 300, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: qa });
  }
};

/* ======================================================================= */
/*                           scene 2 · SQUARE OF A SUM                       */
/* ======================================================================= */
const SQ = { ox: 270, oy: 690, R: 200 };
const SG = { x0: 860, y0: 300, cw: 150, ch: 100 };
const SQ_V = tsArrows(60 * TS_DEG);
const sqPairName = (i, j) => 'ABC'[Math.min(i, j)] + 'ABC'[Math.max(i, j)];
/* a small copy of the three-slit pattern with the detector at δ = 60° */
function sqInset(a) {
  if (a <= 0.003) return;
  const x0 = 140, x1 = 600, yb = 300, k = 9, X = d => lerp(x0, x1, (d + 2.2 * Math.PI) / (4.4 * Math.PI));
  line(x0, yb, x1, yb, C.white, a * 0.5, 2);
  curve(s => { const d = lerp(-2.2 * Math.PI, 2.2 * Math.PI, s); return [X(d), yb - k * tsW3(d)]; }, 200, C.cyan, a * 0.9, 2.5);
  const xd = X(60 * TS_DEG);
  dashed(xd, yb + 10, xd, yb - 9 * k - 6, C.now, a * 0.8, 1.5);
  dot(xd, yb - k * tsW3(60 * TS_DEG), 10, 'g', a);
  txt('detector · δ = 60°', xd + 14, yb + 30, { size: 20, fam: F.mono, w: 700, c: C.now, a });
  txt('screen · 屏', x0, yb + 30, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
}
function sqGrid(S, a, o = {}) {
  const { x0, y0, cw, ch } = SG, lab = ['a', 'b', 'c'];
  for (let j = 0; j < 3; j++) txt(lab[j] + '*', x0 + cw * (j + 0.5), y0 - 16, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: a * 0.85 });
  for (let i = 0; i < 3; i++) txt(lab[i], x0 - 22, y0 + ch * (i + 0.5) + 10, { size: 28, fam: F.math, w: 700, align: 'right', c: C.white, a: a * 0.85 });
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const ta = a * (o.tile ? o.tile(i, j) : 1);
    if (ta <= 0.003) continue;
    const x = x0 + j * cw, y = y0 + i * ch, diag = i === j;
    const col = diag ? C.cyan : C.white;
    box(x + 4, y + 4, cw - 8, ch - 8, col, ta * (diag ? 0.9 : 0.6), 1.4, rgba(diag ? C.cyan : C.white, diag ? 0.12 * (o.split || 0) + 0.05 : 0.04));
    txt(`${lab[i]} ${lab[j]}*`, x + cw / 2, y + 44, { size: 30, fam: F.math, w: 700, align: 'center', c: col, a: ta });
    if (diag) txt('1', x + cw / 2, y + 80, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta * 0.9 });
    else tsExp(`${i > j ? '' : '−'}i${Math.abs(i - j) * 60}°`, x + cw / 2, y + 80, 22, C.white, ta * 0.75);
    if (!diag && o.split) txt(sqPairName(i, j), x + cw - 12, y + 26, { size: 16, fam: F.mono, w: 700, align: 'right', c: C.mag, a: ta * o.split });
  }
}
SCENES.square = S => {
  const u = S.u, a = tsFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  sqInset(a * (1 - 0.6 * at(S, 2, 0.8)));
  /* the arrows: fanned from the origin (line 0), head to tail (line 1) */
  const al = [0, 1, 2].map(j => Q(S, 0, 'each open slit', 0.5, 0.35 * j));
  const k = ease(Q(S, 1, 'head to tail', 1.4));
  const sumA = Q(S, 1, 'Here they sum', 0.6);
  const { ox, oy, R } = SQ;
  line(ox - 40, oy, ox + R + 140, oy, C.dim, a * 0.35, 1);
  line(ox, oy + 30, ox, oy - 2 * R - 20, C.dim, a * 0.35, 1);
  tsChain(ox, oy, SQ_V, R, a, { k, al, sum: sumA, ls: 30 });
  if (k > 0.95) {
    /* the 60° turn at each joint */
    const j1 = [ox + R, oy], j2 = [ox + R + R * SQ_V[1][0], oy - R * SQ_V[1][1]];
    for (const [jx, jy, t0] of [[j1[0], j1[1], 0], [j2[0], j2[1], 60]]) {
      dashed(jx, jy, jx + 70 * Math.cos(t0 * TS_DEG), jy - 70 * Math.sin(t0 * TS_DEG), C.dim, a * 0.6, 1.5);
      curve(s => { const t = (t0 + 60 * s) * TS_DEG; return [jx + 46 * Math.cos(t), jy - 46 * Math.sin(t)]; }, 20, C.now, a * 0.9, 2);
    }
    txt('60°', j1[0] + 58, j1[1] - 20, { size: 22, fam: F.mono, w: 700, c: C.now, a: a * 0.9 });
    txt('60°', j2[0] + 34, j2[1] - 46, { size: 22, fam: F.mono, w: 700, c: C.now, a: a * 0.9 });
  }
  tsRich([['|a + b + c| = ', C.white], ['2', C.cyan]], ox - 130, 770, { size: 32, a: a * sumA });
  const hc = a * sumA * (1 - at(S, 2, 0.5));
  if (hc > 0) {
    tsRich([['a + b + c = (1 + ½ − ½) + i(√3/2 + √3/2) = ', C.white], ['1 + i√3', C.cyan]], 760, 330, { size: 30, a: hc });
    tsRich([['|1 + i√3|² = 1² + (√3)² = 1 + 3 = ', C.white], ['4', C.cyan]], 760, 392, { size: 30, a: a * Q(S, 1, 'the weight is four', 0.5) * (1 - at(S, 2, 0.5)) });
    txt('a = 1,   b = ½ + i√3/2,   c = −½ + i√3/2', 760, 270, { size: 24, fam: F.math, w: 700, c: C.white, a: hc * 0.75 });
  }
  tsRich([['W = 2² = ', C.white], ['4', C.cyan]], ox - 130, 818, { size: 32, a: a * Q(S, 1, 'the weight is four', 0.5) });
  /* the nine tiles (line 2), split into the diagonal and the pairs (line 3) */
  const ga = a * Q(S, 2, 'Multiply the sum', 0.5);
  if (ga > 0) {
    tsRich([['W = (a + b + c)(a + b + c)*', C.white]], SG.x0 - 40, 226, { size: 32, a: ga });
    const t0 = phraseAt(S, 2, 'nine tiles');
    const split = Q(S, 3, 'three on the diagonal', 0.6);
    sqGrid(S, ga, { tile: (i, j) => clamp((u - t0 + 0.4 - 0.12 * (3 * i + j)) / 0.3), split });
    /* the hand computation of the tiles at 60° */
    const lx = 1400, ly = 330, ra = (s, d = 0) => a * Q(S, 3, s, 0.5, d);
    tsRich([['aa* + bb* + cc* = ', C.white], ['3', C.cyan]], lx, ly, { size: 26, a: ra('three on the diagonal') });
    tsRich([['ab* + ba* = 2 cos 60° = ', C.white], ['+1', C.white]], lx, ly + 52, { size: 24, a: ra('six that mix') });
    tsRich([['ac* + ca* = 2 cos 120° = ', C.white], ['−1', C.mag]], lx, ly + 96, { size: 24, a: ra('six that mix', 0.4) });
    tsRich([['bc* + cb* = 2 cos 60° = ', C.white], ['+1', C.white]], lx, ly + 140, { size: 24, a: ra('six that mix', 0.8) });
    const ta = ra('six that mix', 1.3);
    line(lx, ly + 166, lx + 360, ly + 166, C.dim, ta, 1.4);
    tsRich([['3 + 1 − 1 + 1 = ', C.white], ['4', C.cyan]], lx, ly + 206, { size: 28, a: ta });
    /* line 4: no tile holds three */
    const na = a * Q(S, 4, 'No tile', 0.6);
    if (na > 0) {
      const gx = SG.x0 + 1.5 * SG.cw - 80, gy = SG.y0 + 3 * SG.ch + 34;
      box(gx, gy, 160, 76, C.dim, na * 0.8, 1.4, 'rgba(4,10,24,0.6)');
      txt('a b c', gx + 80, gy + 48, { size: 30, fam: F.math, w: 700, align: 'center', c: C.dim, a: na });
      line(gx + 12, gy + 66, gx + 148, gy + 10, C.white, na, 3);
      txt('no such tile · 没有这一块', gx + 80, gy + 108, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: na });
      stamp('PAIRS ONLY', 1500, 660, Q(S, 4, 'all three slits', 0.6), C.cyan, 34);
      txt('只有两两', 1500, 744, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.cyan, a: a * Q(S, 4, 'all three slits', 0.6, 0.3) });
    }
  }
};

/* ======================================================================= */
/*                            scene 3 · SEVEN WEIGHTS                        */
/* ======================================================================= */
const CG = { cy: 300, cell: 26, xs: [330, 540, 750, 960, 1170, 1380, 1590] };
function cgMini(cx, y, set, a, hl) {
  const c = CG.cell, x0 = cx - 1.5 * c;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const on = set.m.includes(i) && set.m.includes(j), h = hl && hl[0] === i && hl[1] === j && on;
    const col = h ? C.now : on ? (set.s > 0 ? C.cyan : C.mag) : C.dim;
    fillBox(x0 + j * c + 2, y + i * c + 2, c - 4, c - 4, col, a * (h ? 0.95 : on ? 0.6 : 0.12));
  }
  box(x0, y, 3 * c, 3 * c, C.dim, a * 0.6, 1);
}
SCENES.count = S => {
  const u = S.u, a = tsFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the formula and the seven grids (line 0) */
  tsRich([['I₃ = ', C.white], ['W(ABC)', C.cyan], [' − W(AB) − W(AC) − W(BC)', C.mag], [' + W(A) + W(B) + W(C)', C.cyan]], W / 2, 232, { size: 36, align: 'center', a: a * at(S, 0, 0.6) });
  const L1 = lineAt(S, 1), L2 = lineAt(S, 2), L3 = lineAt(S, 3);
  /* the tile in focus: a diagonal tile (line 1), a mixed tile (line 2) */
  const focus = u >= L2.s && u < L3.s ? [0, 1] : u >= L1.s && u < L2.s ? [0, 0] : null;
  TS_SETS.forEach((set, k) => {
    const ma = a * Q(S, 0, 'seven weights', 0.4, 0.15 * k);
    cgMini(CG.xs[k], CG.cy + 20, set, ma, focus);
    txt(set.s > 0 ? '+' : '−', CG.xs[k] - 70, CG.cy + 72, { size: 34, fam: F.math, w: 700, align: 'center', c: set.s > 0 ? C.cyan : C.mag, a: ma });
    txt(set.n, CG.xs[k], CG.cy + 130, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ma * 0.85 });
  });
  /* line 0: how to read the small grids */
  const ha = a * Q(S, 0, 'minus each pair', 0.6) * (1 - at(S, 1, 0.5, -0.3));
  txt('each small grid lights the tiles inside that weight', W / 2, 590, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: ha * 0.9 });
  txt('每个小格子点亮这一项包含的块：青色记 +，品红记 −', W / 2, 636, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: ha * 0.9 });
  /* the weights under the grids: δ = 60° (line 3), then equal arrows (line 4) */
  const n3 = Q(S, 3, 'At sixty degrees', 0.5), n4 = Q(S, 4, 'every arrow equal to one', 0.5);
  const vals = n4 > 0 ? [9, 4, 4, 4, 1, 1, 1] : [4, 3, 1, 3, 1, 1, 1];
  const na = a * (n4 > 0 ? n4 : n3 * (1 - clamp((u - phraseAt(S, 4, 'every arrow equal to one') + 0.3) / 0.3)));
  const nt = n4 > 0 ? phraseAt(S, 4, 'nine') : phraseAt(S, 3, 'four');
  TS_SETS.forEach((set, k) => txt(String(vals[k]), CG.xs[k], CG.cy + 176, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.now, a: na * clamp((u - nt - 0.25 * k + 0.2) / 0.3) }));
  /* the tally grid: how often each tile is counted */
  const tx = 250, ty = 540, tc = 96, ta = a * at(S, 1, 0.6, -0.3);
  if (ta > 0) {
    txt('times counted · 每块计入几次', tx, ty - 22, { size: 20, fam: F.zh, w: 700, c: C.white, a: ta * 0.85 });
    const allZero = Q(S, 2, 'Zero again', 0.6);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const x = tx + j * tc, y = ty + i * tc, f = focus && focus[0] === i && focus[1] === j;
      box(x + 3, y + 3, tc - 6, tc - 6, f ? C.now : i === j ? C.cyan : C.white, ta * (f ? 1 : 0.55), 1.4, 'rgba(4,10,24,0.55)');
      txt(`${'abc'[i]}${'abc'[j]}*`, x + tc / 2, y + 30, { size: 18, fam: F.math, w: 700, align: 'center', c: f ? C.now : C.dim, a: ta });
      const za = f ? Q(S, focus[1] === 0 ? 1 : 2, focus[1] === 0 ? 'Zero.' : 'Zero again', 0.4) : (i === 0 && j === 0 && u >= L2.s) ? 1 : allZero;
      if (za > 0) txt('0', x + tc / 2, y + 74, { size: 34, fam: F.mono, w: 700, align: 'center', c: f ? C.now : C.white, a: ta * za });
    }
  }
  /* the count of the tile in focus */
  if (focus) {
    const kL = focus[1] === 0 ? 1 : 2;
    const hits = TS_SETS.filter(set => set.m.includes(focus[0]) && set.m.includes(focus[1]));
    const phr = kL === 1 ? ['plus one with all three', 'minus two in the pairs', 'minus two in the pairs', 'plus one alone'] : ['only with all three', 'plus one, minus one'];
    const fx = 620, fy = 560;
    panel(fx, fy - 40, 460, 290, a, C.now, kL === 1 ? 'DIAGONAL TILE · 对角块 aa*' : 'MIXED TILE · 交叉块 ab*');
    hits.forEach((set, h) => {
      const hA = a * Q(S, kL, phr[h], 0.4, h === 2 ? 0.5 : 0);
      tsRich([[set.s > 0 ? '+1' : '−1', set.s > 0 ? C.cyan : C.mag], [`   in W(${set.n})`, C.white]], fx + 30, fy + 34 + 44 * h, { size: 26, fam: F.mono, a: hA });
    });
    const za = a * Q(S, kL, kL === 1 ? 'Zero.' : 'Zero again', 0.4);
    tsRich([[kL === 1 ? '1 − 2 + 1 = ' : '1 − 1 = ', C.white], ['0', C.now]], fx + 30, fy + 34 + 44 * hits.length + 14, { size: 30, fam: F.math, a: za });
  }
  /* the two checks (lines 3 and 4) */
  const ex = 620, ey = 520, e1 = a * n3, e2 = a * n4;
  if (e1 > 0) {
    panel(ex, ey, 1180, 300, e1, C.cyan, 'TWO CHECKS · 两次验算');
    tsChain(ex + 80, ey + 150, tsArrows(60 * TS_DEG), 48, e1, { labels: [null, null, null], w: 3, sum: 1 });
    txt('60° apart', ex + 60, ey + 186, { size: 20, fam: F.mono, w: 700, c: C.dim, a: e1 });
    const z3 = Q(S, 3, 'Zero.', 0.4);
    tsRich([['4 − 3 − 1 − 3 + 1 + 1 + 1 = ', C.white], ['0', C.now]], ex + 290, ey + 118, { size: 38, fam: F.mono, a: e1 * (0.55 + 0.45 * z3) });
    if (e2 > 0) {
      tsChain(ex + 60, ey + 250, tsArrows(0), 48, e2, { labels: [null, null, null], w: 3, sum: 1 });
      txt('equal', ex + 60, ey + 284, { size: 20, fam: F.mono, w: 700, c: C.dim, a: e2 });
      const z4 = Q(S, 4, 'Zero.', 0.4);
      tsRich([['9 − 4 − 4 − 4 + 1 + 1 + 1 = ', C.white], ['0', C.now]], ex + 290, ey + 240, { size: 38, fam: F.mono, a: e2 * (0.55 + 0.45 * z4) });
    }
  }
};

/* ======================================================================= */
/*                          scene 4 · SLIDE THE DETECTOR                     */
/* ======================================================================= */
const PX = { x0: 860, x1: 1760, y0: 690, k: 42 };
const pxX = d => lerp(PX.x0, PX.x1, (d + 2 * Math.PI) / (4 * Math.PI));
const pxY = v => PX.y0 - PX.k * v;
function pxAxes(a) {
  line(PX.x0, PX.y0, PX.x1 + 20, PX.y0, C.dim, a * 0.6, 1.4);
  line(PX.x0, pxY(-3.3), PX.x0, pxY(9.4), C.dim, a * 0.6, 1.4);
  for (const v of [-3, 0, 3, 6, 9]) {
    line(PX.x0 - 8, pxY(v), PX.x0, pxY(v), C.dim, a * 0.6, 1.4);
    txt(v < 0 ? '−' + Math.abs(v) : String(v), PX.x0 - 16, pxY(v) + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  }
  for (const d of [-360, -180, 0, 180, 360]) {
    const x = pxX(d * TS_DEG);
    if (d !== -360) line(x, pxY(-3.3), x, pxY(9.4), C.dim, a * 0.15, 1);
    txt(`${d < 0 ? '−' : ''}${Math.abs(d)}°`, x, pxY(-3.3) + 28, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  txt('δ', PX.x1 + 30, PX.y0 + 8, { size: 26, fam: F.math, w: 700, c: C.dim, a });
}
/* one legend row: a short sample of the curve and its name */
function pxLegend(y, col, dash, s, a) {
  if (a <= 0.003) return;
  if (dash) dashed(130, y - 8, 180, y - 8, col, a, 3); else line(130, y - 8, 180, y - 8, col, a, 4);
  txt(s, 196, y, { size: 21, fam: F.math, w: 700, c: col, a });
}
SCENES.sweep = S => {
  const u = S.u, a = tsFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  /* the detector: −360° → 360° through lines 0 and 1, back through line 2 */
  const t0 = L0.s + 0.4, t1 = L1.e, t2 = L2.s + 0.2, t3 = Math.max(L2.e + 0.3, t2 + 2);
  const f1 = clamp((u - t0) / (t1 - t0)), f2 = ease(clamp((u - t2) / (t3 - t2)));
  const d = u < t2 ? lerp(-2 * Math.PI, 2 * Math.PI, f1) : lerp(2 * Math.PI, -2 * Math.PI, f2);
  const vs = tsArrows(d);
  /* the arrows at the detector */
  line(440 - 60, 500, 440 + 3 * 95 + 30, 500, C.dim, a * 0.3, 1);
  tsChain(440, 500, vs, 95, a, { labels: ['a', 'b', 'c'], ls: 26, sum: 1, w: 4 });
  dot(440, 500, 7, 'w', a);
  /* the plot */
  pxAxes(a);
  const traced = u < t2 ? d : 2 * Math.PI;
  curve(s => { const e = lerp(-2 * Math.PI, traced, s); return [pxX(e), pxY(tsW3(e))]; }, 360, C.cyan, a, 4);
  pxLegend(770, C.cyan, false, 'W(ABC)', a);
  const ra = a * Q(S, 1, 'the three pair patterns', 0.8);
  if (ra > 0) {
    ctx.save(); ctx.setLineDash([12, 10]);
    curve(s => { const e = lerp(-2 * Math.PI, 2 * Math.PI, s); const v = tsArrows(e); return [pxX(e), pxY(tsW(v, [0, 1]) + tsW(v, [0, 2]) + tsW(v, [1, 2]) - 3)]; }, 360, C.white, ra * 0.85, 2.5);
    ctx.restore();
    pxLegend(806, C.white, true, 'W(AB) + W(AC) + W(BC) − W(A) − W(B) − W(C)', ra);
  }
  /* line 2: the pair terms swing, the third-order term stays at zero */
  const ca = a * Q(S, 2, 'The pair terms', 0.6);
  if (ca > 0) curve(s => { const e = lerp(-2 * Math.PI, 2 * Math.PI, s); return [pxX(e), pxY(tsCross(e))]; }, 360, C.mag, ca * 0.9, 3);
  pxLegend(842, C.mag, false, 'pair terms · 4 cos δ + 2 cos 2δ', ca);
  const za = a * Q(S, 2, 'stays flat at zero', 0.6);
  if (za > 0) {
    line(PX.x0, PX.y0, PX.x1, PX.y0, C.now, za, 5);
    txt('I₃ = 0', PX.x1 + 14, PX.y0 - 14, { size: 26, fam: F.math, w: 700, c: C.now, a: za });
  }
  const x = pxX(d);
  dashed(x, pxY(-3.3), x, pxY(9.4), C.now, a * 0.55, 1.5);
  dot(x, pxY(tsW3(d)), 13, 'c', a);
  if (ca > 0) dot(x, pxY(tsCross(d)), 11, 'm', ca);
  if (za > 0) dot(x, PX.y0, 11, 'g', za);
  /* readouts */
  tsRich([['δ = ', C.white], [`${tsNum(d / TS_DEG, 1)}°`, C.now], ['    W(ABC) = ', C.white], [tsNum(tsW3(d), 3), C.cyan], ['    I₃ = ', C.white], [tsNum(tsI3(vs), 3), C.now]], PX.x0 + 20, 220, { size: 24, fam: F.mono, a });
};

/* ======================================================================= */
/*                             scene 5 · WHY A SQUARE                        */
/* ======================================================================= */
/* the complex plane on the right: the amplitude z = Σ of the nine path arrows (three bundles) */
const ZP = { ox: 1300, oy: 600, R: 260 };
const ZP_MID = [0.66, 0.55];
const ZP_ALL = TS_BUNDLES.flatMap(b => b.z);
const ZP_Z = ZP_ALL.reduce(tsAdd, [0, 0]);
const zpP = z => [ZP.ox + ZP.R * z[0], ZP.oy - ZP.R * z[1]];
function zpAxes(a) {
  line(ZP.ox - 160, ZP.oy, ZP.ox + 420, ZP.oy, C.dim, a * 0.5, 1.4);
  line(ZP.ox, ZP.oy + 60, ZP.ox, ZP.oy - 360, C.dim, a * 0.5, 1.4);
  txt('Re', ZP.ox + 426, ZP.oy + 8, { size: 20, fam: F.mono, w: 700, c: C.dim, a });
  txt('Im', ZP.ox + 10, ZP.oy - 364, { size: 20, fam: F.mono, w: 700, c: C.dim, a });
}
SCENES.theorem = S => {
  const u = S.u, a = tsFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [0, 'Lean checks', 'lean'], [1, null, 'computed'], [2, 'Lean checks', 'lean']]);
  /* line 0: the record weight of a pure state on a one-line shutter */
  const a0 = a * at(S, 0, 0.6);
  txt('Why a square? · 为什么是平方？', 140, 214, { size: 30, fam: F.zh, w: 900, c: C.white, a: a0 });
  const l0 = a * Q(S, 0, 'Lean checks', 0.6);
  tsLean(140, 272, TS_LEAN.rank_one_pure_state_modulus_square_reduction, l0, { size: 19 });
  tsRich([['P k = |φ⟩⟨φ| ,  ρ = |ψ⟩⟨ψ|', C.white]], 140, 330, { size: 28, a: l0 });
  tsRich([['⟹  recordWeight(P, ρ, k) = ', C.white], ['‖⟨φ|ψ⟩‖²', C.cyan]], 140, 378, { size: 30, a: a * Q(S, 0, 'the squared modulus', 0.6) });
  /* right: z and its mirror z*, whose product lies on the real axis (line 0); the nine path arrows (lines 1, 2) */
  zpAxes(a);
  const m0 = a * Q(S, 0, 'the squared modulus', 0.6) * (1 - at(S, 1, 0.6));
  if (m0 > 0) {
    const zc = tsConj(ZP_Z), [zx, zy] = zpP(ZP_Z), [cx, cy] = zpP(zc);
    arrow(ZP.ox, ZP.oy, zx, zy, C.cyan, m0, 5);
    ctx.save(); ctx.setLineDash([10, 8]); arrow(ZP.ox, ZP.oy, cx, cy, C.cyan, m0 * 0.8, 3); ctx.restore();
    txt('z = ⟨φ|ψ⟩', zx + 16, zy + 6, { size: 24, fam: F.math, w: 700, c: C.cyan, a: m0 });
    txt('z*', cx + 16, cy + 6, { size: 24, fam: F.math, w: 700, c: C.cyan, a: m0 * 0.85 });
    const w = tsAbs2(ZP_Z), [wx, wy] = zpP([w, 0]);
    dot(wx, wy, 14, 'c', m0);
    txt(`z · z* = |z|² = ${w.toFixed(3)}`, wx + 20, wy + 44, { size: 24, fam: F.math, w: 700, c: C.cyan, a: m0 });
  }
  /* line 1: linearity, the amplitude as a sum over paths */
  const l1 = a * at(S, 1, 0.6);
  tsRich([['⟨φ | Σₓ ψₓ⟩ = Σₓ ⟨φ | ψₓ⟩ = ', C.white], ['Σₓ v(x)', C.cyan]], 140, 460, { size: 30, a: l1 });
  txt('linear: the amplitude is a sum of path arrows · 振幅是路径箭头之和', 140, 500, { size: 20, fam: F.zh, w: 700, c: C.dim, a: l1 });
  if (l1 > 0) {
    const n = ZP_ALL.length, grow = clamp((u - lineAt(S, 1).s - 0.3) / 2.2);
    let p = [0, 0];
    ZP_ALL.forEach((z, i) => {
      const ia = l1 * clamp(grow * n - i);
      const q = tsAdd(p, z), [x1, y1] = zpP(p), [x2, y2] = zpP(q);
      if (ia > 0) arrow(x1, y1, x2, y2, C.white, ia * 0.9, 3);
      p = q;
    });
    const sa = l1 * clamp(grow * n - n + 1);
    const [zx, zy] = zpP(ZP_Z);
    arrow(ZP.ox, ZP.oy, zx, zy, C.cyan, sa, 5);
    txt('Σₓ v(x)', zx - 18, zy + 6, { size: 24, fam: F.math, w: 700, align: 'right', c: C.cyan, a: sa });
    /* line 2: the arrows fall into three disjoint bundles */
    const ba = a * Q(S, 2, 'whole bundle', 0.6);
    if (ba > 0) {
      let q0 = [0, 0];
      TS_BUNDLES.forEach((b, j) => {
        const q1 = b.z.reduce(tsAdd, q0), [x0, y0] = zpP(q0), [x1, y1] = zpP(q1);
        ctx.save(); ctx.setLineDash([8, 7]); arrow(x0, y0, x1, y1, C.now, ba * 0.9, 3); ctx.restore();
        /* the bundle's letter sits outside the curl, away from its middle */
        const mid = [(q0[0] + q1[0]) / 2, (q0[1] + q1[1]) / 2], dv = [mid[0] - ZP_MID[0], mid[1] - ZP_MID[1]], dl = Math.hypot(dv[0], dv[1]) || 1;
        const [lx, ly] = zpP([mid[0] + 0.3 * dv[0] / dl, mid[1] + 0.3 * dv[1] / dl]);
        txt(b.n, lx, ly + 12, { size: 34, fam: F.math, w: 900, align: 'center', c: C.now, a: ba });
        q0 = q1;
      });
      txt(`A: ${TS_BUNDLES[0].z.length} paths · B: ${TS_BUNDLES[1].z.length} · C: ${TS_BUNDLES[2].z.length}`, ZP.ox + 180, ZP.oy - 380, { size: 20, fam: F.mono, w: 700, c: C.now, a: ba });
    }
  }
  /* the identity, with its Lean chip, and the seven terms of these bundles */
  const l3 = a * Q(S, 2, 'Lean checks', 0.6);
  tsLean(140, 616, TS_LEAN.sorkin_third_order_cancellation, l3, { size: 19 });
  tsRich([['W(A∪B∪C) − W(A∪B) − W(A∪C) − W(B∪C) + W(A) + W(B) + W(C) = ', C.white], ['0', C.lean]], 140, 672, { size: 24, a: l3 });
  tsRich([['W(S) = (Σₓ∈S v(x)) · (Σₓ∈S v(x))*', C.cyan], ['    A, B, C pairwise disjoint', C.white, 0.85]], 140, 720, { size: 24, a: l3 });
  const wa = a * Q(S, 2, 'the seven terms cancel', 0.6);
  if (wa > 0) {
    const ws = TS_SETS.map(set => tsBundleW(set.m)), t0 = phraseAt(S, 2, 'the seven terms cancel');
    TS_SETS.forEach((set, k) => {
      const ka = wa * clamp((u - t0 - 0.1 * k) / 0.3), x = 1120 + k * 94;
      txt(`${set.s > 0 ? '+' : '−'}W(${set.n})`, x, 700, { size: 17, fam: F.mono, w: 700, c: set.s > 0 ? C.cyan : C.mag, a: ka });
      txt(tsNum(set.s * ws[k], 3, true), x, 730, { size: 19, fam: F.mono, w: 700, c: C.white, a: ka });
    });
    tsRich([['Σ = ', C.white], [tsNum(tsBundleI3(), 3), C.now], ['   computed here · 屏幕计算', C.dim]], 1120, 774, { size: 22, fam: F.mono, a: wa * clamp((u - t0 - 0.9) / 0.4) });
  }
  /* line 3: any commutative ring with a conjugation; the proof expands the square */
  const l4 = a * at(S, 3, 0.6);
  txt('R: any commutative ring with a star · the proof expands the square', 140, 790, { size: 19, fam: F.mono, w: 700, c: C.white, a: l4 * 0.75 });
  txt('任何带共轭的交换环 · 证明只是展开平方、逐项相消', 140, 824, { size: 21, fam: F.zh, w: 700, c: C.white, a: l4 * 0.75 });
};

/* ======================================================================= */
/*                              scene 6 · ONE WAY ONLY                       */
/* ======================================================================= */
const EP = { x0: 160, x1: 860, y0: 640, k: 6.4 };
const epX = d => lerp(EP.x0, EP.x1, (d + 2 * Math.PI) / (4 * Math.PI));
const epY = v => EP.y0 - EP.k * v;
SCENES.edge = S => {
  const u = S.u, a = tsFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'A square weight forces', 'lean'], [3, 'ignores leaks', 'argued']]);
  /* line 0: the square against the fourth power, by hand */
  const f0 = a * at(S, 0, 0.6);
  tsRich([['|·|² :  ', C.cyan], ['3² − 3·2² + 3·1² = 9 − 12 + 3 = ', C.white], ['0', C.cyan]], 140, 236, { size: 30, fam: F.math, a: f0 });
  tsRich([['|·|⁴ :  ', C.mag], ['3⁴ − 3·2⁴ + 3·1⁴', C.white]], 140, 290, { size: 30, fam: F.math, a: a * Q(S, 0, 'fourth power', 0.5) });
  tsRich([[' = 81 − 48 + 3 = ', C.white], ['36', C.mag]], 140 + tw('|·|⁴ :  3⁴ − 3·2⁴ + 3·1⁴', 30, F.math, 700), 290, { size: 30, fam: F.math, a: a * Q(S, 0, 'eighty-one', 0.5) });
  /* line 1: the fourth-power I₃ along the screen against the flat square */
  const pa = a * Q(S, 0, 'fourth power', 0.6);
  if (pa > 0) {
    line(EP.x0, EP.y0, EP.x1 + 16, EP.y0, C.dim, pa * 0.6, 1.4);
    line(EP.x0, epY(-14), EP.x0, epY(38), C.dim, pa * 0.6, 1.4);
    for (const v of [-12, 0, 12, 24, 36]) { line(EP.x0 - 8, epY(v), EP.x0, epY(v), C.dim, pa * 0.6, 1.4); txt(v < 0 ? '−' + Math.abs(v) : String(v), EP.x0 - 16, epY(v) + 7, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa }); }
    for (const d of [-360, 0, 360]) txt(`${d < 0 ? '−' : ''}${Math.abs(d)}°`, epX(d * TS_DEG), epY(-14) + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
    const tr = clamp((u - phraseAt(S, 0, 'eighty-one')) / (lineAt(S, 1).e - phraseAt(S, 0, 'eighty-one')));
    curve(s => { const e = lerp(-2 * Math.PI, -2 * Math.PI + 4 * Math.PI * tr, s); return [epX(e), epY(tsI3four(e))]; }, 300, C.mag, pa, 3.5);
    line(EP.x0, EP.y0, EP.x1, EP.y0, C.cyan, pa, 4);
    txt('I₃ with |·|⁴', epX(-1.5 * Math.PI), epY(31), { size: 21, fam: F.math, w: 700, align: 'center', c: C.mag, a: pa });
    txt('I₃ with |·|²', EP.x1 + 22, EP.y0 - 2, { size: 21, fam: F.math, w: 700, c: C.cyan, a: pa });
    txt('= 0', EP.x1 + 22, EP.y0 + 26, { size: 21, fam: F.math, w: 700, c: C.cyan, a: pa });
    txt('a true three-way term · 真正的三方项', 140, 820, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * Q(S, 1, 'three-way term', 0.6) });
  }
  /* line 2: the one-way street */
  const ow = a * at(S, 2, 0.6);
  if (ow > 0) {
    const bx = 1060, by = 230;
    box(bx, by, 330, 92, C.cyan, ow, 1.6, 'rgba(4,10,24,0.6)');
    txt('W(S) = |Σₓ∈S v(x)|²', bx + 165, by + 56, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ow });
    box(bx + 480, by, 260, 92, C.white, ow, 1.6, 'rgba(4,10,24,0.6)');
    txt('I₃ = 0', bx + 610, by + 58, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a: ow });
    const la = a * Q(S, 2, 'A square weight forces', 0.6);
    arrow(bx + 344, by + 46, bx + 466, by + 46, C.lean, la, 5);
    tsLean(bx, by + 140, TS_LEAN.sorkin_third_order_cancellation, la, { size: 18 });
  }
  /* line 3: the reverse does not hold */
  const rv = a * at(S, 3, 0.6);
  if (rv > 0) {
    const bx = 1060, by = 450;
    box(bx, by, 260, 80, C.white, rv * 0.8, 1.4, 'rgba(4,10,24,0.6)');
    txt('I₃ = 0', bx + 130, by + 52, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: rv });
    box(bx + 410, by, 330, 80, C.dim, rv * 0.8, 1.4, 'rgba(4,10,24,0.6)');
    txt('Born rule |·|² ?', bx + 575, by + 52, { size: 28, fam: F.math, w: 700, align: 'center', c: C.dim, a: rv });
    arrow(bx + 274, by + 40, bx + 396, by + 40, C.dim, rv, 4);
    line(bx + 316, by + 14, bx + 352, by + 66, C.white, rv, 4);
    /* additive weights also give zero: no pair term at all */
    const ca = a * Q(S, 3, 'single out the Born rule', 0.6);
    tsRich([['W(S) = Σₓ∈S |v(x)|²', C.white], ['  →  I₂ = 0, I₃ = 0', C.cyan]], bx, by + 130, { size: 24, a: ca });
    txt('additive weights, no stripes at all · 没有条纹的可加权重', bx, by + 166, { size: 19, fam: F.zh, w: 700, c: C.dim, a: ca });
    const la = a * Q(S, 3, 'ignores leaks', 0.6);
    txt('real slits: leaks, crosstalk · outside the identity', bx, by + 238, { size: 21, fam: F.mono, w: 700, c: C.argued, a: la });
    txt('真实狭缝的串扰不在这条恒等式之内', bx, by + 272, { size: 22, fam: F.zh, w: 700, c: C.argued, a: la });
  }
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 520, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the slits and the three-slit pattern */
  slWaves(t, [1, 1, 1], 0.4);
  slBarrier([1, 1, 1], 1);
  slScreen(1, 1, 1, 1);
  txt(DATA.film.title_zh, 875, 400, { size: 54, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THREE SLITS', 875, 488, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('ONLY PAIRS INTERFERE', 875, 542, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 4 });
  tsRich([['I₃ = ', C.white], ['0', C.lean]], 875, 640, { size: 52, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 875, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
