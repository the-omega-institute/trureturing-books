/* Film · Two mirrors make a turn · 两面镜子，一次转动
   (book quantum-geometry, chapter 15.1). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     mirrors  two mirror lines through one point at 0° and 30°; a shape at −50° is reflected in the first line (to
              +50°) and then in the second (to +10°): the net map is the rotation by 2 × 30° = 60° (computed, plane
              geometry: the product of two line reflections at angle α is the rotation by 2α).
     plane    N = 4 boxes, one marked; the uniform start (½, ½, ½, ½) = sin θ · W + cos θ · B with W the marked box,
              B = (0, 1, 1, 1)/√3, sin θ = ½, θ = 30° (computed); mirror 1 = the line of B (I − 2P),
              mirror 2 = the line of U (2UU* − I), the iterate of the chapter (computed).
     count    one step on the amplitudes: (½, ½, ½, ½) → (−½, ½, ½, ½) → about the average ¼ → (1, 0, 0, 0); the
              state turns from 30° to 90° (computed).
     rule     W*W = 1, B*B = 1, W*B = 0 and iterate^n U = sin((2n+1)θ) W + cos((2n+1)θ) B for every n, also after
              ⊗ₖ R for any square matrix R, when 0 < p < 1; U = W when p = 1
              ..... CoherentUniformAmplification.uniform_operator_rotation (LEAN).
     over     N = 4: angles 30°, 90°, 150°, 210°, 270° and success 1/4, 1, 1/4, 1/4, 1 (computed); the aphorism
              "search is turning" (argued).
     edge     the p = 1 branch (LEAN, the same theorem); N = 100: θ = arcsin 0.1, best whole step n = 7 at 15θ,
              (π/4)√100 (computed, not part of the theorem); the Ω(√N) query lower bound is a literature result
              (argued).

   On load, FILM.init checks DATA.lean against the theorem and re-derives every number on screen independently
   (reflections as 2×2 matrices, the iterate as a 4×4 matrix on the boxes, the n-step formula for random p).
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const GR_DEG = Math.PI / 180;
const GR_GID = 'D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation';
const GR_TH = 30 * GR_DEG;                       // θ = arcsin √(1/4)
const GR_HINGE = 30 * GR_DEG;                    // the mirror angle of scene 1
const GR_SHAPE_AT = -50 * GR_DEG;                // where the shape of scene 1 starts
/* reflection of a plane vector in the line through 0 at angle α */
const grRefl = (p, al) => [p[0] * Math.cos(2 * al) + p[1] * Math.sin(2 * al), p[0] * Math.sin(2 * al) - p[1] * Math.cos(2 * al)];
const grRot = (p, al) => [p[0] * Math.cos(al) - p[1] * Math.sin(al), p[0] * Math.sin(al) + p[1] * Math.cos(al)];
/* the iterate on the four boxes: Q = (2UUᵀ − I)(I − 2P) */
const GR_U4 = [0.5, 0.5, 0.5, 0.5];
const grOracle = v => v.map((x, i) => (i === 0 ? -x : x));
const grAvg = v => v.reduce((s, x) => s + x, 0) / v.length;
const grDiffuse = v => { const m = grAvg(v); return v.map(x => 2 * m - x); };   // 2UUᵀ − I = inversion about the average
const grStep = v => grDiffuse(grOracle(v));
/* the N = 100 example of scene edge */
const GR_N100 = (() => {
  const th = Math.asin(0.1);
  let best = 0, bp = -1;
  /* the first peak: angles below 180° */
  for (let n = 0; (2 * n + 1) * th < Math.PI; n++) { const pr = Math.pow(Math.sin((2 * n + 1) * th), 2); if (pr > bp) { bp = pr; best = n; } }
  return { th, n: best, ang: (2 * best + 1) * th, pr: bp, est: Math.PI / 4 * 10 };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('grover-two-mirrors film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorem at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 1, `film.json cites ${lean.length} declarations, expected 1`);
  const r = leanCite(GR_GID);
  if (!r) fail(`film.json does not cite ${GR_GID}`);
  else {
    check(r.kind === 'theorem', `${GR_GID} is not a theorem at the pinned commit`);
    check(r.short === 'uniform_operator_rotation', `${GR_GID} resolves to ${r.name}`);
  }

  /* 1. MIRRORS: two reflections at angle α make the rotation by 2α */
  for (let k = 0; k < 40; k++) {
    const al = (k * 7 - 100) * GR_DEG, p = [Math.cos(k), Math.sin(3 * k) + 0.3];
    const q = grRefl(grRefl(p, 0), al), w = grRot(p, 2 * al);
    check(near(q[0], w[0], 1e-12) && near(q[1], w[1], 1e-12), `two reflections ${k}`);
  }
  const s1 = grRefl([Math.cos(GR_SHAPE_AT), Math.sin(GR_SHAPE_AT)], 0), s2 = grRefl(s1, GR_HINGE);
  check(near(Math.atan2(s1[1], s1[0]) / GR_DEG, 50, 1e-9) && near(Math.atan2(s2[1], s2[0]) / GR_DEG, 10, 1e-9), 'shape at −50° → 50° → 10°');

  /* 2. PLANE: the uniform start of four boxes */
  const W = [1, 0, 0, 0], B = [0, 1, 1, 1].map(x => x / Math.sqrt(3));
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  check(near(dot(GR_U4, W), 0.5) && near(dot(GR_U4, B), Math.sqrt(3) / 2) && near(Math.asin(0.5), GR_TH), 'U = ½ W + (√3/2) B, θ = 30°');
  check(near(dot(W, B), 0) && near(dot(B, B), 1), 'W ⟂ B, |B| = 1');
  /* the iterate as an explicit matrix (2UUᵀ − I)(I − 2P) applied to vectors */
  const Qm = v => { const a = v.map((x, i) => (i === 0 ? -x : x)), uu = dot(GR_U4, a); return GR_U4.map((x, i) => 2 * uu * x - a[i]); };

  /* 3. COUNT: the numbers on screen */
  const o = grOracle(GR_U4), d = grStep(GR_U4);
  check(o.join() === '-0.5,0.5,0.5,0.5' && grAvg(o) === 0.25 && d.join() === '1,0,0,0', '(−½, ½, ½, ½), average ¼, (1, 0, 0, 0)');
  check(Qm(GR_U4).every((x, i) => near(x, d[i])), 'inversion about the average is 2UUᵀ − I');

  /* 4. RULE and OVER: iterate^n U = sin((2n+1)θ) W + cos((2n+1)θ) B; success 1/4, 1, 1/4, 1/4, 1 */
  let v = GR_U4.slice();
  const want = [0.25, 1, 0.25, 0.25, 1, 0.25];
  for (let n = 0; n < 6; n++) {
    const ang = (2 * n + 1) * GR_TH;
    check(v.every((x, i) => near(x, Math.sin(ang) * W[i] + Math.cos(ang) * B[i], 1e-12)), `n-step formula at n = ${n}`);
    check(near(v[0] * v[0], want[n], 1e-12), `success after ${n} steps`);
    v = Qm(v);
  }
  /* the n-step formula for random uniform starts on N boxes with one marked box */
  for (let k = 0; k < 30; k++) {
    const N = 2 + (k % 9), p = 1 / N, th = Math.asin(Math.sqrt(p));
    const U = Array(N).fill(1 / Math.sqrt(N)), Wn = U.map((_, i) => (i === 0 ? 1 : 0)), Bn = U.map((_, i) => (i === 0 ? 0 : 1 / Math.sqrt(N - 1)));
    let x = U.slice();
    for (let n = 0; n < 12; n++) {
      const ang = (2 * n + 1) * th;
      check(x.every((y, i) => near(y, Math.sin(ang) * Wn[i] + Math.cos(ang) * Bn[i], 1e-9)), `random N = ${N}, n = ${n}`);
      const a = x.map((y, i) => (i === 0 ? -y : y)), uu = dot(U, a);
      x = U.map((y, i) => 2 * uu * y - a[i]);
    }
  }

  /* 5. EDGE: N = 100 */
  check(GR_N100.n === 7 && Math.abs(GR_N100.ang / GR_DEG - 86.09) < 0.005 && Math.abs(GR_N100.pr - 0.9953) < 0.0001, 'N = 100: n = 7, 86.1°, 0.995');
  check(Math.abs(GR_N100.th / GR_DEG - 5.74) < 0.005 && Math.abs(GR_N100.est - 7.85) < 0.005, 'θ ≈ 5.74°, (π/4)·10 ≈ 7.85');
});
Object.assign(FILM.speed, { mirrors: 0.02, plane: 0.016, count: 0.016, rule: 0.014, over: 0.018, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const grFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function grRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for the cited theorem, looked up by its whole GID */
let GR_MISSING = false;
function grLean(x, y, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(GR_GID);
  if (!r || r.kind !== 'theorem') {
    if (!GR_MISSING) { GR_MISSING = true; window.FILM_ERRORS.push(`film.json does not cite the theorem ${GR_GID}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function grPoly(pts, col, a, fill = 0.25, lw = 2.5) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
  if (lw) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
}
/* an arc of radius r about O from angle a0 to a1 (math angles, counter-clockwise) */
function grArc(O, r, a0, a1, col, a, lw = 4) {
  if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(O[0], O[1], r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
/* a mirror: a cyan line through O at angle al with short hatching on one side */
function grMirror(O, R, al, a, label) {
  if (a <= 0.003) return;
  const d = [Math.cos(al), -Math.sin(al)], nrm = [Math.sin(al), Math.cos(al)];
  line(O[0] - d[0] * R, O[1] - d[1] * R, O[0] + d[0] * R, O[1] + d[1] * R, C.cyan, a, 4);
  for (let s = -R; s <= R; s += 26) {
    const p = [O[0] + d[0] * s, O[1] + d[1] * s];
    line(p[0], p[1], p[0] + 12 * (d[0] * 0.6 + nrm[0]), p[1] + 12 * (d[1] * 0.6 + nrm[1]), C.cyan, a * 0.35, 1.5);
  }
  if (label) txt(label, O[0] + d[0] * (R + 20), O[1] + d[1] * (R + 20) + 10, { size: 24, fam: F.zh, w: 700, c: C.cyan, a });
}
/* the plane of success W (up) and failure B (right) about O, radius R; returns a projector */
function grAxes(O, R, a, o = {}) {
  const P = v => [O[0] + R * v[0], O[1] - R * v[1]];
  if (a <= 0.003) return P;
  const e = P([1.12, 0]), n = P([0, 1.12]);
  arrow(O[0], O[1], e[0], e[1], C.white, a * 0.75, 2.5);
  arrow(O[0], O[1], n[0], n[1], C.white, a * 0.75, 2.5);
  txt(o.bl || 'B  failure · 失败', e[0] + 16, e[1] + 9, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  txt(o.wl || 'W  success · 成功', n[0] + 18, n[1] + 12, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  return P;
}
/* opening title */
function grTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TWO MIRRORS MAKE A TURN', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('MIRRORS · FOUR BOXES · ONE STEP · THE RULE · PAST THE TOP', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.argued, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · TWO MIRRORS                       */
/* ======================================================================= */
const MI_O = [560, 600];
/* an asymmetric flag, in world units (pixels, y up), pointing along +x before it is turned to angle φ */
const MI_FLAG = [[210, -16], [330, -16], [330, 70], [270, 70], [270, 40], [300, 40], [300, 16], [210, 16]];
function miFlag(map, col, a, fill) {
  grPoly(MI_FLAG.map(map).map(p => [MI_O[0] + p[0], MI_O[1] - p[1]]), col, a, fill, 3);
}
SCENES.mirrors = S => {
  const u = S.u;
  grTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  grMirror(MI_O, 420, 0, a, 'mirror 1 · 镜 1');
  grMirror(MI_O, 420, GR_HINGE, a * Q(S, 0, 'that cross', 0.6), 'mirror 2 · 镜 2');
  grArc(MI_O, 120, 0, GR_HINGE, C.cyan, a * Q(S, 0, 'that cross', 0.6), 3);
  txt('30°', MI_O[0] + 140, MI_O[1] - 30, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * Q(S, 0, 'that cross', 0.6) });
  /* the shape, its first image (dashed, dim) and its second image (amber) */
  const turn = p => grRot(p, GR_SHAPE_AT);
  miFlag(turn, C.white, a * Q(S, 0, 'bounce a shape', 0.6), 0.18);
  const f1 = Q(S, 1, 'first bounce', 0.9), f2 = Q(S, 1, 'second flips', 0.9);
  miFlag(p => grRefl(turn(p), 0), C.dim, a * f1 * (1 - 0.6 * f2), 0.08);
  miFlag(p => grRefl(grRefl(turn(p), 0), GR_HINGE), C.now, a * f2, 0.25);
  /* the net turn, 2α */
  const ta = a * Q(S, 2, 'turned sixty', 0.8);
  grArc(MI_O, 380, GR_SHAPE_AT, GR_SHAPE_AT + 2 * GR_HINGE * ease(clamp(ta * 1.2)), C.argued, ta, 5);
  if (ta > 0.003) {
    const m = GR_SHAPE_AT + GR_HINGE, q = [MI_O[0] + 420 * Math.cos(m), MI_O[1] - 420 * Math.sin(m)];
    txt('60°', q[0] + 12, q[1] + 10, { size: 30, fam: F.mono, w: 700, c: C.argued, a: ta });
  }
  /* readout */
  const ra = a * Q(S, 1, 'first bounce', 0.6);
  if (ra > 0.003) {
    panel(1260, 230, 560, 400, ra, C.cyan, 'TWO FLIPS · 两次翻折');
    grRich([['flip · 翻 1', C.dim]], 1290, 310, { size: 26, fam: F.zh, a: ra * f1 });
    grRich([['flip · 翻 2', C.now]], 1290, 360, { size: 26, fam: F.zh, a: ra * f2 });
    grRich([['= turn · 转', C.argued]], 1290, 410, { size: 30, fam: F.zh, a: ra * at(S, 1, 0.5, 2.6) });
    grRich([['turn = 2 × angle', C.white]], 1290, 500, { size: 32, a: ra * Q(S, 2, 'Always twice', 0.5) });
    grRich([['60° = 2 × 30°', C.argued]], 1290, 556, { size: 32, a: ra * Q(S, 2, 'Always twice', 0.5) });
    txt('plane geometry · 平面几何', 1290, 604, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
};

/* ======================================================================= */
/*                               scene 2 · FOUR BOXES                        */
/* ======================================================================= */
const PL_O = [260, 760], PL_R = 440;
function plBoxes(x, y, a, amps, hi) {
  /* four boxes, the first holding the prize; the amplitude written inside */
  for (let i = 0; i < 4; i++) {
    const bx = x + i * 150;
    box(bx, y, 120, 100, i === 0 ? C.mag : C.white, a, i === hi ? 3 : 1.5, i === 0 ? rgba(C.mag, 0.12) : null);
    txt(amps[i], bx + 60, y + 64, { size: 32, fam: F.math, w: 700, align: 'center', c: C.white, a });
    txt(i === 0 ? '★ prize · 奖品' : `box ${i + 1}`, bx + 60, y + 136, { size: 18, fam: F.zh, w: 700, align: 'center', c: i === 0 ? C.mag : C.dim, a });
  }
}
SCENES.plane = S => {
  const u = S.u, a = grFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  plBoxes(1060, 190, a * at(S, 0, 0.6), ['½', '½', '½', '½']);
  /* the plane */
  const pa = a * Q(S, 1, 'two arrows', 0.8);
  const P = grAxes(PL_O, PL_R, pa);
  if (pa > 0.003) {
    /* the start U at θ, with its two shadows */
    const sa = pa * Q(S, 2, 'thirty degrees off', 0.6);
    const U = P([Math.cos(GR_TH), Math.sin(GR_TH)]);
    line(PL_O[0], PL_O[1], PL_O[0] + PL_R * 1.05, PL_O[1], C.cyan, a * Q(S, 3, 'first mirror', 0.6), 4);   // mirror 1, drawn as a ray like mirror 2
    if (Q(S, 3, 'second mirror', 0.6) > 0) {
      const ma = a * Q(S, 3, 'second mirror', 0.6), d = PL_R * 1.1;
      line(PL_O[0], PL_O[1], PL_O[0] + d * Math.cos(GR_TH), PL_O[1] - d * Math.sin(GR_TH), C.cyan, ma, 4);
      txt('mirror 2 · 镜 2', PL_O[0] + d * Math.cos(GR_TH) + 14, PL_O[1] - d * Math.sin(GR_TH) - 6, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ma });
      txt('mirror 1 · 镜 1', 700, PL_O[1] + 40, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 3, 'first mirror', 0.6) });
    }
    grArc(PL_O, 150, 0, GR_TH, C.argued, sa, 3);
    txt('θ = 30°', PL_O[0] + 170, PL_O[1] - 26, { size: 26, fam: F.mono, w: 700, c: C.white, a: sa });
    ctx.save(); ctx.setLineDash([6, 6]);
    line(U[0], U[1], U[0], PL_O[1], C.white, sa * 0.5, 1.5); line(U[0], U[1], PL_O[0], U[1], C.white, sa * 0.5, 1.5); ctx.restore();
    arrow(PL_O[0], PL_O[1], U[0], U[1], C.now, pa, 6);
    txt('U  start · 起点', U[0] + 26, U[1] + 34, { size: 26, fam: F.zh, w: 700, c: C.now, a: pa });
    txt('½', PL_O[0] - 30, U[1] + 10, { size: 28, fam: F.math, w: 700, align: 'right', c: C.white, a: sa });
    txt('√3/2', U[0], PL_O[1] + 40, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: sa });
  }
  /* the ledger */
  const la = a * Q(S, 1, 'two arrows', 0.6);
  if (la > 0.003) {
    panel(1060, 400, 760, 400, la, C.cyan, 'THE SPLIT · 拆成两支');
    grRich([['W = (1, 0, 0, 0)', C.white]], 1090, 470, { size: 28, a: la * Q(S, 1, 'success, toward', 0.5) });
    grRich([['B = (0, 1, 1, 1) / √3', C.white]], 1090, 520, { size: 28, a: la * Q(S, 1, 'failure, toward', 0.5) });
    grRich([['U = ', C.now], ['½', C.white], [' W + ', C.now], ['√3/2', C.white], [' B', C.now]], 1090, 580, { size: 30, a: la * at(S, 2, 0.5) });
    grRich([['sin θ = ½   θ = 30°', C.white]], 1090, 630, { size: 28, a: la * Q(S, 2, 'the sine of', 0.5) });
    grRich([['mirror 1:  I − 2P', C.cyan]], 1090, 700, { size: 26, a: la * Q(S, 3, 'first mirror', 0.5) });
    grRich([['mirror 2:  2UU* − I', C.cyan]], 1090, 750, { size: 26, a: la * Q(S, 3, 'second mirror', 0.5) });
  }
};

/* ======================================================================= */
/*                             scene 3 · ONE STEP BY HAND                    */
/* ======================================================================= */
const CO = { x: 1000, y0: 600, k: 260, bw: 120, gap: 70 };
const grFrac = x => (Math.abs(x) < 1e-9 ? '0' : Math.abs(x - 1) < 1e-9 ? '1' : Math.abs(x - 0.5) < 1e-9 ? '½' : Math.abs(x + 0.5) < 1e-9 ? '−½' : x.toFixed(2));
SCENES.count = S => {
  const u = S.u, a = grFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the amplitudes through the step */
  const p1 = ease(Q(S, 0, 'flips the sign', 0.9)), p2 = ease(Q(S, 2, 'becomes one', 1.1));
  const o = grOracle(GR_U4), d = grStep(GR_U4);
  const amps = GR_U4.map((x, i) => lerp(lerp(x, o[i], p1), d[i], p2));
  /* axis */
  const xr = CO.x + 4 * (CO.bw + CO.gap) - CO.gap + 30;
  line(CO.x - 30, CO.y0, xr, CO.y0, C.white, a * 0.7, 2);
  txt('0', CO.x - 44, CO.y0 + 9, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  txt('1', CO.x - 44, CO.y0 - CO.k + 9, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  ctx.save(); ctx.setLineDash([3, 8]); line(CO.x - 30, CO.y0 - CO.k, xr, CO.y0 - CO.k, C.dim, a * 0.5, 1); ctx.restore();
  amps.forEach((v, i) => {
    const bx = CO.x + i * (CO.bw + CO.gap), h = v * CO.k, col = i === 0 ? C.mag : C.cyan;
    if (Math.abs(h) > 0.5) { fillBox(bx, h > 0 ? CO.y0 - h : CO.y0, CO.bw, Math.abs(h), col, a * 0.55); box(bx, h > 0 ? CO.y0 - h : CO.y0, CO.bw, Math.abs(h), col, a, 2); }
    txt(grFrac(v), bx + CO.bw / 2, (h >= 0 ? CO.y0 - h - 16 : CO.y0 - h + 40), { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a });
    txt(i === 0 ? '★ prize' : `box ${i + 1}`, bx + CO.bw / 2, CO.y0 + 200, { size: 20, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.mag : C.dim, a });
  });
  /* the average mirror */
  const ma = a * Q(S, 1, 'about the average', 0.6) * (1 - 0.7 * p2);
  if (ma > 0.003) {
    const y = CO.y0 - 0.25 * CO.k;
    ctx.save(); ctx.setLineDash([10, 8]); line(CO.x - 30, y, xr, y, C.cyan, ma, 3); ctx.restore();
    txt('average ¼ · 平均值 ¼', CO.x - 70, y - 4, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ma });
    txt('a mirror · 一面镜子', CO.x - 70, y + 26, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ma });
  }
  /* the left: a small dial of the state in the plane */
  const O = [300, 700], R = 300;
  const P = grAxes(O, R, a, { bl: 'B', wl: 'W' });
  /* the angle: 30° → −30° (mirror 1) → 90° (mirror 2) */
  const ang = lerp(lerp(GR_TH, -GR_TH, p1), 3 * GR_TH, p2);
  ctx.save(); ctx.setLineDash([5, 7]); line(O[0], O[1], O[0] + R * 1.05 * Math.cos(GR_TH), O[1] - R * 1.05 * Math.sin(GR_TH), C.cyan, a * 0.6, 2); ctx.restore();
  const tip = P([Math.cos(ang), Math.sin(ang)]);
  arrow(O[0], O[1], tip[0], tip[1], C.now, a, 6);
  const ta = a * Q(S, 3, 'turned sixty', 0.8);
  grArc(O, 110, GR_TH, 3 * GR_TH, C.argued, ta, 4);
  txt('+60°', O[0] + 100, O[1] - 150, { size: 26, fam: F.mono, w: 700, c: C.argued, a: ta });
  txt(`${Math.round(ang / GR_DEG) < 0 ? '−' : ''}${Math.abs(Math.round(ang / GR_DEG))}°`, tip[0] + 22, tip[1] + 34, { size: 26, fam: F.mono, w: 700, c: C.now, a });
  /* ledger line at the top */
  const rows = [
    [0, 'mirror 1 · 镜 1:  (½, ½, ½, ½) → (−½, ½, ½, ½)', 'flips the sign'],
    [1, 'mirror 2 · 镜 2:  x → 2·¼ − x', 'about the average'],
    [2, '−½ → 1     ½ → 0', 'becomes one']
  ];
  rows.forEach(([k, s, q], i) => txt(s, 1000, 200 + i * 44, { size: 26, fam: F.zh, w: 700, c: i === 2 ? C.white : C.cyan, a: a * Q(S, k, q, 0.5) }));
  const ca = a * Q(S, 3, 'prize is certain', 0.6);
  stamp('success 1 · 必中', 1400, 690, ca * (1 - at(S, 3, 0.5, 4.5)), C.now, 34, -0.06);
};

/* ======================================================================= */
/*                                scene 4 · THE RULE                         */
/* ======================================================================= */
const RU_O = [260, 760], RU_R = 400;
SCENES.rule = S => {
  const u = S.u, a = grFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean']]);
  const P = grAxes(RU_O, RU_R, a * Q(S, 1, 'perpendicular unit arrows', 0.6));
  const pa = a * Q(S, 1, 'perpendicular unit arrows', 0.6);
  if (pa > 0.003) {
    /* the right angle */
    const c = 26;
    ctx.save(); ctx.globalAlpha = pa; ctx.strokeStyle = C.white; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(RU_O[0] + c, RU_O[1]); ctx.lineTo(RU_O[0] + c, RU_O[1] - c); ctx.lineTo(RU_O[0], RU_O[1] - c); ctx.stroke(); ctx.restore();
    /* ticks at (2n+1)θ for a general small θ: the orbit of the start, step by step */
    const th = 11 * GR_DEG, na = a * Q(S, 2, 'After n steps', 0.6);
    const shown = Math.min(3, Math.floor(clamp((u - phraseAt(S, 2, 'After n steps')) / 3.2) * 4));
    for (let n = 0; n <= 3; n++) {
      const g = (2 * n + 1) * th, q = P([Math.cos(g), Math.sin(g)]);
      const da = na * (n <= shown ? 1 : 0.25);
      dot(q[0], q[1], 9, 'w', da);
      txt(`n = ${n}`, q[0] + 16, q[1] - 6, { size: 22, fam: F.mono, w: 700, c: C.white, a: da });
    }
    const g = (2 * shown + 1) * th, q = P([Math.cos(g), Math.sin(g)]);
    if (na > 0.003) { grArc(RU_O, 140, th, g, C.argued, na, 4); arrow(RU_O[0], RU_O[1], q[0], q[1], C.now, na, 6); }
    txt('same angle 2θ every step · 每步同转 2θ', RU_O[0], RU_O[1] + 60, { size: 22, fam: F.zh, w: 700, c: C.argued, a: na });
    txt('schematic θ = 11° · 示意角', RU_O[0], RU_O[1] + 92, { size: 18, fam: F.zh, w: 700, c: C.dim, a: na });
  }
  /* the theorem panel */
  panel(960, 180, 860, 600, a, C.lean, 'ANY MARKED SET · 任意标记集合');
  grRich([['0 < p ≤ 1,   sin θ = √p', C.white]], 990, 250, { size: 28, a: a * Q(S, 0, 'success chance', 0.6) });
  txt('U = CJ an isometry, P a projector · U 为等距，P 为投影', 990, 284, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'any marked set', 0.6) });
  txt('(PU)*(PU) = p · I: same p, orthogonal success parts · 各列成功率相同且互相正交', 990, 312, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'success chance', 0.6) });
  grRich([['p < 1:   W*W = 1,  B*B = 1,  W*B = 0', C.white]], 990, 360, { size: 28, a: a * at(S, 1, 0.6) });
  grRich([['Qⁿ U = ', C.now], ['sin((2n+1)θ)', C.white], [' W + ', C.now], ['cos((2n+1)θ)', C.white], [' B', C.now]], 990, 440, { size: 28, a: a * at(S, 2, 0.6) });
  txt('Q = (2UU* − I)(I − 2P),   every n ∈ ℕ', 990, 484, { size: 22, fam: F.math, w: 700, c: C.cyan, a: a * at(S, 2, 0.6) });
  const sp = a * Q(S, 3, 'any spectator', 0.6);
  grRich([['(Qⁿ U) ⊗ R = sin((2n+1)θ) (W ⊗ R) + cos((2n+1)θ) (B ⊗ R)', C.white]], 990, 560, { size: 22, a: sp });
  txt('any square matrix R · 任意方阵 R', 990, 598, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sp });
  txt('p = 1:   U = W', 990, 660, { size: 24, fam: F.math, w: 700, c: C.white, a: a * at(S, 1, 0.6) });
  grLean(990, 740, a * Q(S, 0, 'Lean checks', 0.6), { size: 20 });
  stamp('LEAN ✓', 1500, 690, Q(S, 0, 'Lean checks', 0.5, 0.6) * (1 - at(S, 0, 0.5, 3.6)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                               scene 5 · PAST THE TOP                      */
/* ======================================================================= */
const OV_O = [480, 510], OV_R = 290;
SCENES.over = S => {
  const u = S.u, a = grFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  /* step index n as a function of the narration */
  /* nF − 1 is the step count n shown: 0 at the start, then 1, 2, 3, 4 as the narration names them */
  const prog = [Q(S, 0, 'Keep turning', 0.9), Q(S, 1, 'second step', 0.9), Q(S, 2, 'Third step', 0.9), Q(S, 2, 'Fourth', 0.9)].map(ease);
  const nF = prog.reduce((s, x) => s + x, 0) + 1;
  /* full circle of the plane, with both axes (both directions) */
  ctx.save(); ctx.globalAlpha = a * 0.4; ctx.strokeStyle = C.white; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(OV_O[0], OV_O[1], OV_R, 0, TAU); ctx.stroke(); ctx.restore();
  line(OV_O[0] - OV_R - 30, OV_O[1], OV_O[0] + OV_R + 30, OV_O[1], C.white, a * 0.6, 2);
  line(OV_O[0], OV_O[1] + OV_R + 30, OV_O[0], OV_O[1] - OV_R - 30, C.white, a * 0.6, 2);
  txt('W', OV_O[0] - 16, OV_O[1] - OV_R - 12, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  txt('−W', OV_O[0] - 16, OV_O[1] + OV_R + 34, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a });
  txt('B', OV_O[0] + OV_R + 40, OV_O[1] + 9, { size: 26, fam: F.math, w: 700, c: C.white, a });
  /* the positions (2k+1)·30° for k = 0..4 */
  for (let k = 0; k <= 4; k++) {
    const g = (2 * k + 1) * GR_TH, q = [OV_O[0] + OV_R * Math.cos(g), OV_O[1] - OV_R * Math.sin(g)];
    const da = a * clamp(nF - k + 0.2);
    dot(q[0], q[1], 8, 'w', da * 0.8);
    const off = [Math.cos(g) * 64 + (Math.abs(Math.cos(g)) < 0.2 ? 56 : 0), -Math.sin(g) * 34 + 8];
    txt(`${(2 * k + 1) * 30}°`, q[0] + off[0], q[1] + off[1], { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: da });
  }
  const g = (2 * (nF - 1) + 1) * GR_TH, tip = [OV_O[0] + OV_R * Math.cos(g), OV_O[1] - OV_R * Math.sin(g)];
  grArc(OV_O, 90, GR_TH, g, C.argued, a, 4);
  arrow(OV_O[0], OV_O[1], tip[0], tip[1], C.now, a, 6);
  /* the success shadow: the W component, sin g, drawn on the W axis */
  const sy = OV_O[1] - OV_R * Math.sin(g);
  ctx.save(); ctx.setLineDash([5, 6]); line(tip[0], tip[1], OV_O[0], sy, C.white, a * 0.4, 1.5); ctx.restore();
  line(OV_O[0], OV_O[1], OV_O[0], sy, C.mag, a, 7);
  /* the bars: success after n steps */
  panel(1120, 190, 700, 520, a, C.cyan, 'SUCCESS · 命中率  sin²((2n+1)θ)');
  const pr = [0.25, 1, 0.25, 0.25, 1], lab = ['¼', '1', '¼', '¼', '1'];
  for (let k = 0; k <= 4; k++) {
    const bx = 1170 + k * 125, by = 620, h = 330 * pr[k], ba = a * clamp(nF - k + 0.2);
    if (ba <= 0.003) continue;
    const cur = Math.abs(nF - 1 - k) < 0.5;
    fillBox(bx, by - h, 80, h, cur ? C.now : C.mag, ba * 0.55); box(bx, by - h, 80, h, cur ? C.now : C.mag, ba, 2);
    txt(lab[k], bx + 40, by - h - 14, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: ba });
    txt(`n=${k}`, bx + 40, by + 40, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba });
  }
  txt('N = 4,  θ = 30°', 1150, 690, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  /* the aphorism */
  const fa = a * Q(S, 3, 'Search is not', 0.8);
  if (fa > 0.003) {
    chip(1470, 790, 700, 80, 'search is turning · 搜索是转动', C.argued, fa, 34, F.zh);
  }
};

/* ======================================================================= */
/*                            scene 6 · WHAT IT DOES NOT SAY                 */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = grFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [1, null, 'computed'], [3, null, 'argued']]);
  const N = GR_N100;
  const rows = [
    { k: 0, col: C.lean, en: 'p = 1:   U = W', zh: '起点就是奖品：只说起点与成功箭头重合', note: 'the p = 1 branch of the theorem · 定理里 p = 1 的那一支', lean: true },
    { k: 1, col: C.cyan, en: `N = 100:  θ = ${(N.th / GR_DEG).toFixed(2)}°,  best n = ${N.n}:  angle ≈${(N.ang / GR_DEG).toFixed(1)}°,  success ≈ ${N.pr.toFixed(3)}`, zh: '除 N = 4 外，整数步只能逼近顶点', note: 'N = 100 computed on screen; every other N by Niven\'s theorem, a literature result · 数字是屏幕上的计算；其余 N 据 Niven 定理（文献结果）' },
    { k: 2, col: C.cyan, en: `(π/4)√N:   (π/4)·√100 ≈ ${N.est.toFixed(2)}`, zh: '步数估计是在定理之上算出来的', note: 'arithmetic, not part of the theorem · 不属于定理本身' },
    { k: 3, col: C.argued, en: 'unstructured search needs Ω(√N) oracle queries', zh: '无结构搜索至少要 Ω(√N) 次查询', note: 'literature result, not formalized in this book · 文献结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 170 + i * 172;
    panel(160, y, 1600, 152, ra, rw.col);
    txt(rw.en, 200, y + 54, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 200, y + 98, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 200, y + 134, { size: 18, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : rw.col, a: ra * 0.95 });
    if (rw.lean) grLean(1180, y + 54, ra, { size: 20 });
  });
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
  const O = [620, 640];
  grMirror(O, 420, 0, 1);
  grMirror(O, 420, GR_HINGE, 1);
  const turn = p => grRot(p, GR_SHAPE_AT);
  const map = f => MI_FLAG.map(f).map(p => [O[0] + p[0], O[1] - p[1]]);
  grPoly(map(turn), C.white, 1, 0.18, 3);
  grPoly(map(p => grRefl(turn(p), 0)), C.dim, 0.5, 0.08, 3);
  grPoly(map(p => grRefl(grRefl(turn(p), 0), GR_HINGE)), C.now, 1, 0.25, 3);
  grArc(O, 380, GR_SHAPE_AT, GR_SHAPE_AT + 2 * GR_HINGE, C.argued, 1, 5);
  txt(DATA.film.title_zh, 1420, 420, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TWO MIRRORS', 1420, 520, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('MAKE A TURN', 1420, 586, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.argued, ab: 2, ls: 4 });
  grRich([['flip · flip = turn 2θ', C.white]], 1420, 680, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1420, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
