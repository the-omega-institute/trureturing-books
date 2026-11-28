/* Film · Two turns measure a slope · 转两下，量出斜率
   (book quantum-geometry, part III: chapter 12). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     dial    a qubit as an arrow on a dial; the detector reads its height f = cos θ (the expectation of Z for
             R_y(θ)|0⟩); a small nudge of the knob is the usual recipe (computed).
     turns   θ = 60°: f = 0.5; a quarter turn back and forward read f(−30°) = 0.866 and f(150°) = −0.866; half the
             difference −0.866 equals the tangent slope −sin 60° (computed); θ then sweeps and the half difference
             stays on the tangent (computed).
     why     the shadow of a uniformly turning arrow: the shadow a quarter turn ahead is the shadow's velocity now
             (analogy, argued); for one involutory Pauli rotation f = c + a cos θ + b sin θ and the two-point rule
             is exact (literature, rem-parameter-shift-rule-literature, argued); the ±30° chord has slope
             −sin 60° · sin 30°/(π/6) = −0.827, 4.5 % too shallow (computed).
     lean    ProjectionProbabilityFlow.projection_probability_flow (LEAN): for Hermitian H, a star projection P and a
             density state ρ, t ↦ Re Tr(ρ_t P) has derivative Re(i Tr(ρ_t (HP − PH))), the bracket is real, and
             HP = PH makes the probability constant. On the dial H = Y/2, P = |0⟩⟨0|, ρ = |0⟩⟨0|, t = π/3:
             the rate is −√3/4 = −0.433 and the height f = 2p − 1 has slope −0.866 (computed from 2 × 2 matrices);
             H = Z/2 commutes with P, and the arrow precessing about the measured axis keeps p = 0.75 (computed).
     budget  one dollar split among people, a dime or more each: at most ten (analogy, argued);
             FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound (LEAN): λ ≥ 0 summable with
             Σλ = RW/π and τ > 0 give a finite set {j | τ ≤ λ_j} with at most RW/(πτ) elements; λ_j = 2^−(j+1),
             R = π, W = 1, τ sliding to 1/8: three terms, wall 8 (computed).
     edge    the two-point rule needs a single use of one involutory Pauli rotation (literature); the mode count is a
             ceiling and does not keep slopes from vanishing; barren plateaus of random circuits are literature
             results (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route (finite differences of the curve, 2 × 2 complex matrices for the commutator rate, the
   partial sums of the geometric spectrum). Any disagreement is pushed to window.FILM_ERRORS. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const ST_DEG = Math.PI / 180;
const ST_LEAN = {
  projection_probability_flow: 'D5/S3/Quantum/Dynamics/ProjectionProbabilityFlow.projection_probability_flow',
  finite_rank_concentration_mode_bound: 'D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound'
};
const stF = d => Math.cos(d * ST_DEG);                          // the height at θ = d degrees
const stHalf = d => (stF(d + 90) - stF(d - 90)) / 2;            // half the difference of the two quarter turns
const stTan = d => -Math.sin(d * ST_DEG);                       // the slope of the tangent, per radian
const stChord = (d, h) => (stF(d + h) - stF(d - h)) / (2 * h * ST_DEG);
const stLam = j => Math.pow(2, -(j + 1));                       // the geometric spectrum of example step 5
const stCount = tau => { let n = 0; for (let j = 0; j < 80; j++) if (stLam(j) >= tau - 1e-15) n++; return n; };

/* complex 2 × 2 matrices as [[a, b], [c, d]] of [re, im] */
const cx = {
  add: (p, q) => [p[0] + q[0], p[1] + q[1]],
  mul: (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]],
  mm: (A, B) => [0, 1].map(i => [0, 1].map(j => cx.add(cx.mul(A[i][0], B[0][j]), cx.mul(A[i][1], B[1][j])))),
  sub: (A, B) => A.map((r, i) => r.map((z, j) => [z[0] - B[i][j][0], z[1] - B[i][j][1]])),
  dag: A => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]],
  tr: A => cx.add(A[0][0], A[1][1]),
  scale: (A, z) => A.map(r => r.map(w => cx.mul(w, z))),
  /* exp(−i t H) for H = (h · σ)/2 with |h| = 1: cos(t/2) I − i sin(t/2) (h · σ) */
  U: (h, t) => {
    const c = Math.cos(t / 2), s = Math.sin(t / 2), [x, y, z] = h;
    const sig = [[[z, 0], [x, -y]], [[x, y], [-z, 0]]];
    return [0, 1].map(i => [0, 1].map(j => [(i === j ? c : 0) + s * sig[i][j][1], -s * sig[i][j][0]]));
  },
  half: h => { const [x, y, z] = h; return [[[z / 2, 0], [x / 2, -y / 2]], [[x / 2, y / 2], [-z / 2, 0]]]; }
};
const ST_P0 = [[[1, 0], [0, 0]], [[0, 0], [0, 0]]];
const stRho = (h, rho, t) => { const U = cx.U(h, t); return cx.mm(cx.mm(U, rho), cx.dag(U)); };
const stProb = (h, rho, t) => cx.tr(cx.mm(stRho(h, rho, t), ST_P0))[0];
/* the Lean rate Re(i Tr(ρ_t (HP − PH))) */
const stRate = (h, rho, t) => { const H = cx.half(h), K = cx.sub(cx.mm(H, ST_P0), cx.mm(ST_P0, H)); const z = cx.mul([0, 1], cx.tr(cx.mm(stRho(h, rho, t), K))); return z; };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('slope-from-two-turns film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(ST_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(ST_LEAN).length}`);
  for (const [short, gid] of Object.entries(ST_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. TURNS: the numbers on screen */
  check(near(stF(60), 0.5) && near(stF(-30), Math.sqrt(3) / 2) && near(stF(150), -Math.sqrt(3) / 2), 'f(60°) = 0.5, f(−30°) = 0.866, f(150°) = −0.866');
  check(near(stHalf(60), -Math.sqrt(3) / 2) && near(stTan(60), -Math.sqrt(3) / 2), 'half difference = tangent slope = −0.866 at 60°');
  /* the half difference against a central difference of the curve, everywhere */
  for (let d = -180; d <= 360; d += 7.5) {
    const num = (stF(d + 1e-4 / ST_DEG) - stF(d - 1e-4 / ST_DEG)) / 2e-4;
    check(Math.abs(stHalf(d) - num) < 1e-7, `half difference is the slope at ${d}°`);
    /* the rule on a general first harmonic c + a cos θ + b sin θ */
    const c = 0.3, a = 0.5, b = -0.4, g = x => c + a * Math.cos(x * ST_DEG) + b * Math.sin(x * ST_DEG);
    check(near((g(d + 90) - g(d - 90)) / 2, -a * Math.sin(d * ST_DEG) + b * Math.cos(d * ST_DEG)), `first harmonic at ${d}°`);
    /* the shadow a quarter turn ahead is the shadow's velocity */
    check(near(stF(d + 90), -Math.sin(d * ST_DEG)), `shadow ahead at ${d}°`);
  }
  /* 2. WHY: the ±30° chord */
  check(Math.abs(stChord(60, 30) - (-0.8270)) < 5e-5 && Math.abs(stChord(60, 30) / stTan(60) - 0.9549) < 5e-5, 'chord −0.827, ratio 0.955');
  check(Math.abs(Math.round((1 - stChord(60, 30) / stTan(60)) * 1000) / 10 - 4.5) < 1e-9, '4.5 % short');

  /* 3. LEAN: H = Y/2, P = |0⟩⟨0|, ρ = |0⟩⟨0| on 2 × 2 complex matrices */
  const Y = [0, 1, 0], Z = [0, 0, 1], t = Math.PI / 3;
  const r = stRate(Y, ST_P0, t);
  check(near(r[1], 0) && near(r[0], -Math.sqrt(3) / 4), 'rate −√3/4 and real');
  check(Math.abs(r[0] - (-0.433)) < 5e-4, 'rate −0.433');
  const fd = (stProb(Y, ST_P0, t + 1e-5) - stProb(Y, ST_P0, t - 1e-5)) / 2e-5;
  check(Math.abs(fd - r[0]) < 1e-8, 'rate equals the finite difference of the probability');
  check(near(2 * stProb(Y, ST_P0, t) - 1, stF(60)) && near(2 * r[0], stTan(60)), 'height = 2p − 1, slope = 2 × rate');
  /* random Hermitian directions and random states: the bracket is real and matches the difference */
  for (let k = 0; k < 30; k++) {
    const v = [2 * rnd(k, 1) - 1, 2 * rnd(k, 2) - 1, 2 * rnd(k, 3) - 1], n = Math.hypot(...v), h = v.map(x => x / n);
    const s = [2 * rnd(k, 4) - 1, 2 * rnd(k, 5) - 1, 2 * rnd(k, 6) - 1], m = Math.hypot(...s) * (1 + rnd(k, 7)), b = s.map(x => x / m);
    const rho = [[[(1 + b[2]) / 2, 0], [b[0] / 2, -b[1] / 2]], [[b[0] / 2, b[1] / 2], [(1 - b[2]) / 2, 0]]];
    const tt = 4 * rnd(k, 8) - 2, z = stRate(h, rho, tt);
    const df = (stProb(h, rho, tt + 1e-5) - stProb(h, rho, tt - 1e-5)) / 2e-5;
    check(Math.abs(z[1]) < 1e-12 && Math.abs(z[0] - df) < 1e-8, `random rate ${k}`);
  }
  /* commuting: H = Z/2, ρ the 60° state; p stays 0.75 */
  const rho60 = [[[0.75, 0], [Math.sqrt(3) / 4, 0]], [[Math.sqrt(3) / 4, 0], [0.25, 0]]];
  for (let k = 0; k <= 12; k++) check(near(stProb(Z, rho60, k * 0.5), 0.75) && near(stRate(Z, rho60, k * 0.5)[0], 0), `commuting ${k}`);

  /* 4. BUDGET: λ_j = 2^−(j+1), R = π, W = 1 */
  let sum = 0; for (let j = 0; j < 60; j++) sum += stLam(j);
  check(Math.abs(sum - 1) < 1e-15, 'Σ 2^−(j+1) = 1 = RW/π');
  check(stCount(1 / 8) === 3 && Math.PI * 1 / (Math.PI * (1 / 8)) === 8, 'three terms, wall 8');
  for (const [tau, n] of [[1 / 2, 1], [1 / 4, 2], [1 / 8, 3], [0.3, 1], [0.2, 2]]) check(stCount(tau) === n && n <= 1 / tau, `count at τ = ${tau}`);
  check(Math.floor(1 / 0.1 + 1e-12) === 10, 'a dollar, dimes: ten');
});
Object.assign(FILM.speed, { dial: 0.02, turns: 0.014, why: 0.016, lean: 0.014, budget: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const stFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const stNum = (v, n = 3) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function stRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx0 = x;
  if (o.align === 'center') cx0 = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx0, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx0 += tw(s, size, fam, w); }
  return cx0;
}
const ST_MISSING = new Set();
function stLeanChip(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!ST_MISSING.has(gid)) { ST_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a small tag that says what kind of statement this is: analogy, literature, computed */
function stTag(s, x, y, col, a, size = 18) {
  if (a <= 0.003) return;
  const w0 = tw(s, size, F.zh, 700) + 22;
  box(x, y - size * 1.05, w0, size * 1.5, col, a, 1.5);
  txt(s, x + 11, y, { size, fam: F.zh, w: 700, c: col, a });
}
function stDash(x1, y1, x2, y2, col, a, lw = 1.5, d = [6, 6]) { if (a <= 0.003) return; ctx.save(); ctx.setLineDash(d); line(x1, y1, x2, y2, col, a, lw); ctx.restore(); }

/* the dial: the measured axis points up; the arrow at θ has tip (sin θ, cos θ); its height is cos θ */
function stDial(O, R, a, o = {}) {
  if (a <= 0.003) return;
  ring(O[0], O[1], R, C.white, a * 0.35, 2);
  for (let k = 0; k < 24; k++) {
    const t = k * 15 * ST_DEG, r0 = R - (k % 6 ? 8 : 18);
    line(O[0] + r0 * Math.sin(t), O[1] - r0 * Math.cos(t), O[0] + R * Math.sin(t), O[1] - R * Math.cos(t), C.dim, a * 0.6, 1.5);
  }
  /* the measured axis */
  stDash(O[0], O[1] + R + 30, O[0], O[1] - R - 40, C.dim, a * 0.8, 1.5, [4, 6]);
  txt('measured axis · 测量轴', O[0], O[1] - R - 54, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
}
/* one arrow on the dial with its height marked on the measured axis */
function stArm(O, R, deg, col, a, o = {}) {
  if (a <= 0.003) return null;
  const t = deg * ST_DEG, tip = [O[0] + R * Math.sin(t), O[1] - R * Math.cos(t)], hy = O[1] - R * Math.cos(t);
  if (o.dashed) stDash(O[0], O[1], tip[0], tip[1], col, a, 4, [10, 8]); else arrow(O[0], O[1], tip[0], tip[1], col, a, o.lw || 5);
  if (o.dashed) dot(tip[0], tip[1], 10, o.pearl || 'c', a);
  if (o.height !== false) {
    stDash(tip[0], tip[1], O[0], hy, col, a * 0.6, 1.5);
    fillBox(O[0] - 14, hy - 3, 28, 6, col, a);
  }
  return { tip, hy };
}
/* the plot of f(θ) = cos θ: θ in degrees across, f from −1 to 1 up */
function stPlot(B, a, o = {}) {
  const X = d => B.x + (d - B.d0) / (B.d1 - B.d0) * B.w, Y = f => B.y + B.h / 2 - f * B.h * 0.42;
  const pxPerRad = B.w / ((B.d1 - B.d0) * ST_DEG), pyPerUnit = B.h * 0.42;
  if (a <= 0.003) return { X, Y, pxPerRad, pyPerUnit, B };
  line(B.x, Y(0), B.x + B.w, Y(0), C.dim, a * 0.6, 1.5);
  for (let d = Math.ceil(B.d0 / 90) * 90; d <= B.d1; d += 90) {
    line(X(d), Y(0) - 6, X(d), Y(0) + 6, C.dim, a * 0.8, 1.5);
    txt(`${d}°`, X(d), Y(0) + 46, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  for (const v of [1, -1]) { stDash(B.x, Y(v), B.x + B.w, Y(v), C.dim, a * 0.35, 1, [3, 8]); txt(v > 0 ? '1' : '−1', B.x - 12, Y(v) + 7, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a }); }
  const span = o.upto == null ? 1 : o.upto;
  if (span > 0.003) curve(s => { const d = lerp(B.d0, lerp(B.d0, B.d1, span), s); return [X(d), Y(stF(d))]; }, 220, C.cyan, a, 3.5);
  txt('height f(θ) = cos θ · 高度', B.x + 8, B.y - 10, { size: 20, fam: F.zh, w: 700, c: C.cyan, a });
  return { X, Y, pxPerRad, pyPerUnit, B };
}
/* the tangent at d degrees, drawn with the true slope −sin θ (per radian) */
function stTangent(P, d, half, col, a) {
  if (a <= 0.003) return;
  const s = stTan(d), x0 = P.X(d), y0 = P.Y(stF(d)), k = -s * P.pyPerUnit / P.pxPerRad;
  ctx.save(); ctx.beginPath(); ctx.rect(P.B.x, P.B.y, P.B.w, P.B.h); ctx.clip();
  stDash(x0 - half, y0 - k * half, x0 + half, y0 + k * half, col, a, 2.5, [9, 7]);
  ctx.restore();
}
/* opening title */
function stTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TWO TURNS MEASURE A SLOPE', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('DIAL · QUARTER TURNS · TANGENT · COMMUTATOR · BUDGET · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                          scene 1 · A DIAL YOU CANNOT TOUCH                */
/* ======================================================================= */
const DL_O = [520, 560], DL_R = 280;
const DL_B = { x: 1000, y: 230, w: 800, h: 440, d0: -90, d1: 270 };
SCENES.dial = S => {
  const u = S.u;
  stTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the knob turns back and forth: θ = 70° + 30° sin */
  const deg = 70 + 30 * Math.sin((u - lineAt(S, 0).s) * 0.9);
  stDial(DL_O, DL_R, a);
  const arm = stArm(DL_O, DL_R, deg, C.now, a);
  txt(`θ = ${Math.round(deg)}°`, DL_O[0] + 40, DL_O[1] + 60, { size: 28, fam: F.mono, w: 700, c: C.now, a });
  const ha = a * Q(S, 0, 'average gives only its height', 0.6);
  if (ha > 0.003) {
    chip(DL_O[0] - 150, arm.hy, 170, 44, stNum(stF(deg), 2), C.cyan, ha, 24);
    txt('detector · 探测器', DL_O[0] - 150, arm.hy + 66, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ha });
    txt('height · 高度', DL_O[0] - 150, arm.hy - 40, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ha });
  }
  /* line 1: the curve of heights is drawn as the knob turns */
  const pa = a * at(S, 1, 0.6);
  if (pa > 0.003) {
    const P = stPlot(DL_B, pa, { upto: at(S, 1, 2.4) });
    dot(P.X(deg), P.Y(stF(deg)), 13, 'g', pa);
    txt('slope? · 斜率？', P.X(deg) + 20, P.Y(stF(deg)) - 26, { size: 26, fam: F.zh, w: 700, c: C.now, a: pa * Q(S, 1, 'the slope', 0.5) });
    /* line 2: the nudge, a tiny magenta chord */
    const na = pa * Q(S, 2, 'nudge the knob', 0.5);
    if (na > 0.003) {
      const h = 8;
      const x1 = P.X(deg - h), y1 = P.Y(stF(deg - h)), x2 = P.X(deg + h), y2 = P.Y(stF(deg + h));
      line(x1, y1, x2, y2, C.mag, na, 4); dot(x1, y1, 9, 'm', na); dot(x2, y2, 9, 'm', na);
      txt('nudge · 拧一点点', x1 - 20, y1 - 24, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.mag, a: na });
    }
  }
  const qa = a * Q(S, 2, 'But why', 0.6);
  if (qa > 0.003) txt('why a nudge? · 凭什么非得拧一点点？', 1400, 790, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa });
};

/* ======================================================================= */
/*                           scene 2 · TWO QUARTER TURNS                     */
/* ======================================================================= */
const TT_O = [420, 560], TT_R = 260;
const TT_B = { x: 840, y: 200, w: 980, h: 420, d0: -180, d1: 300 };
SCENES.turns = S => {
  const u = S.u, a = stFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* line 4: the arrow sweeps; before that it rests at 60° */
  const sw = Q(S, 4, 'Move the arrow', 0), t4 = phraseAt(S, 4, 'Move the arrow');
  const deg = 60 + (sw > 0 ? 100 * Math.sin((u - t4) * 0.85) * clamp((u - t4) / 0.8) : 0);
  stDial(TT_O, TT_R, a);
  const P = stPlot(TT_B, a);
  /* the two helpers turn out of the arrow: back on line 1, forward on line 2 */
  const bk = ease(Q(S, 1, 'Turn back', 1.2)), fw = ease(Q(S, 2, 'quarter turn forward', 1.2));
  const dB = deg - 90 * bk, dF = deg + 90 * fw;
  if (bk > 0.003) {
    stArm(TT_O, TT_R, dB, C.cyan, a, { dashed: true, pearl: 'c' });
    dot(P.X(dB), P.Y(stF(dB)), 12, 'c', a);
  }
  if (fw > 0.003) {
    stArm(TT_O, TT_R, dF, C.cyan, a, { dashed: true, pearl: 'c' });
    dot(P.X(dF), P.Y(stF(dF)), 12, 'c', a);
  }
  stArm(TT_O, TT_R, deg, C.now, a);
  dot(P.X(deg), P.Y(stF(deg)), 14, 'g', a);
  txt(`θ = ${Math.round(deg)}°`, TT_O[0], TT_O[1] + TT_R + 52, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.now, a });
  /* line 3: the tangent */
  const ta = a * Q(S, 3, 'slope of the tangent', 0.6);
  stTangent(P, deg, 150, C.white, ta);
  /* the ledger */
  const ly = 680;
  panel(840, ly - 20, 980, 190, a, C.cyan, 'THE LEDGER · 账本');
  stRich([['f(θ) = ', C.white], [stNum(stF(deg)), C.now]], 864, ly + 40, { size: 28, a: a * at(S, 0, 0.5) });
  stRich([['f(θ − 90°) = ', C.white], [stNum(stF(deg - 90)), C.cyan]], 1150, ly + 40, { size: 28, a: a * Q(S, 1, 'the height reads', 0.5) });
  stRich([['f(θ + 90°) = ', C.white], [stNum(stF(deg + 90)), C.cyan]], 1490, ly + 40, { size: 28, a: a * Q(S, 2, 'minus zero', 0.5) });
  const ha = a * Q(S, 3, 'Half the difference', 0.5);
  stRich([['½ [f(θ + 90°) − f(θ − 90°)] = ', C.white], [stNum(stHalf(deg)), C.cyan]], 864, ly + 100, { size: 28, a: ha });
  stRich([['tangent · 切线  −sin θ = ', C.white], [stNum(stTan(deg)), C.white]], 864, ly + 150, { size: 26, a: a * Q(S, 3, 'slope of the tangent', 0.5), fam: F.zh });
  /* a gauge: the half difference (cyan) against the tangent slope (white tick) */
  const ga = a * Q(S, 3, 'slope of the tangent', 0.5);
  if (ga > 0.003) {
    const gx = 1460, gw = 320, gy = ly + 118, gc = gx + gw / 2;
    line(gx, gy, gx + gw, gy, C.dim, ga, 1.5);
    fillBox(Math.min(gc, gc + stHalf(deg) * gw / 2), gy - 12, Math.abs(stHalf(deg)) * gw / 2, 24, C.cyan, ga * 0.6);
    line(gc + stTan(deg) * gw / 2, gy - 22, gc + stTan(deg) * gw / 2, gy + 22, C.white, ga, 3);
    txt('−1', gx, gy + 34, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
    txt('0', gc, gy + 34, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
    txt('1', gx + gw, gy + 34, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
  }
  stamp('½ difference = slope', 1330, 300, Q(S, 3, 'exactly the slope', 0.5, 0.8) * (1 - at(S, 4, 0.5)), C.cyan, 30, -0.06);
};

/* ======================================================================= */
/*                           scene 3 · WHY A QUARTER TURN                    */
/* ======================================================================= */
const WY_O = [440, 610], WY_R = 240;
const WY_B = { x: 1000, y: 490, w: 820, h: 250, d0: -60, d1: 180 };
SCENES.why = S => {
  const u = S.u, a = stFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, null, 'argued']]);
  /* the analogy: an arrow turning at a steady rate, its shadow on the wall (the measured axis) */
  const deg = 20 + 30 * u;
  stDial(WY_O, WY_R, a);
  const arm = stArm(WY_O, WY_R, deg, C.now, a);
  const ga = a * Q(S, 0, 'a quarter turn ahead', 0.6);
  if (ga > 0.003) {
    const g = stArm(WY_O, WY_R, deg + 90, C.argued, ga, { dashed: true, pearl: 'v', height: false });
    /* the ghost's height, carried to the shadow as its velocity */
    const v = stF(deg + 90), k = WY_R * 0.55;
    stDash(g.tip[0], g.tip[1], WY_O[0] + 60, g.hy, C.argued, ga * 0.6, 1.5);
    arrow(WY_O[0] + 34, arm.hy, WY_O[0] + 34, arm.hy - v * k, C.argued, ga, 4);
    txt('velocity · 速度', WY_O[0] + 54, arm.hy - v * k / 2 + 8, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ga });
    txt('dashed: the arrow a quarter turn ahead · 虚线：前方四分之一圈的箭头', 80, 256, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ga });
  }
  txt('amber tick on the axis: the shadow · 轴上的琥珀刻度：影子', 80, 228, { size: 20, fam: F.zh, w: 700, c: C.now, a });
  stTag('analogy · 比方', 80, 188, C.argued, a * at(S, 0, 0.6));
  /* line 1: one Pauli turn gives one pure wave */
  const la = a * at(S, 1, 0.6);
  if (la > 0.003) {
    panel(1000, 200, 820, 230, la, C.argued, 'ONE PAULI TURN · 一扇泡利门');
    stRich([['f(θ) = c + a cos θ + b sin θ', C.white]], 1028, 280, { size: 32, a: la });
    stRich([['∂f/∂θ = ½ [f(θ + 90°) − f(θ − 90°)]', C.cyan]], 1028, 340, { size: 30, a: la * Q(S, 1, 'the rule is exact', 0.5) });
    txt('parameter-shift rule · literature result, not formalized here', 1028, 392, { size: 18, fam: F.mono, w: 700, c: C.argued, a: la });
    txt('参数位移律 · 文献结果，本书未形式化', 1028, 416, { size: 18, fam: F.zh, w: 700, c: C.argued, a: la });
  }
  /* line 2: the ±30° chord against the tangent, at 60° */
  const ca = a * at(S, 2, 0.6);
  if (ca > 0.003) {
    const P = stPlot(WY_B, ca);
    stTangent(P, 60, 170, C.white, ca);
    const x1 = P.X(30), y1 = P.Y(stF(30)), x2 = P.X(90), y2 = P.Y(stF(90)), k = (y2 - y1) / (x2 - x1);
    line(x1 - 90, y1 - 90 * k, x2 + 90, y2 + 90 * k, C.mag, ca, 3);
    dot(x1, y1, 10, 'm', ca); dot(x2, y2, 10, 'm', ca); dot(P.X(60), P.Y(stF(60)), 12, 'g', ca);
    txt(`chord ±30° · 弦  ${stNum(stChord(60, 30))}`, 1010, 800, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ca });
    txt(`tangent · 切线  ${stNum(stTan(60))}`, 1010, 832, { size: 22, fam: F.zh, w: 700, c: C.white, a: ca });
    txt(`ratio sin h / h = ${stNum(stChord(60, 30) / stTan(60))}`, 1010, 864, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ca * Q(S, 2, 'four and a half percent', 0.5) });
  }
  /* line 3: the aphorism */
  const sa = a * at(S, 3, 0.5);
  if (sa > 0.003) {
  }
};

/* ======================================================================= */
/*                            scene 4 · WHAT LEAN CHECKS                     */
/* ======================================================================= */
const LN_O = [400, 560], LN_R = 230;
SCENES.lean = S => {
  const u = S.u, a = stFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'computed'], [4, null, 'lean'], [4, 'spin around', 'computed']]);
  /* the general rule */
  panel(860, 190, 960, 330, a, C.lean, 'ANY FINITE SYSTEM · 任意有限维系统');
  stRich([['H* = H,  P* = P = P²,  ρ a density state', C.white]], 884, 260, { size: 26, a: a * Q(S, 1, 'Hermitian generator', 0.6) });
  stRich([['ρₜ = e^(−itH) ρ e^(itH),   p(t) = Re Tr(ρₜ P)', C.white]], 884, 312, { size: 26, a: a * Q(S, 1, 'differentiable', 0.6) });
  stRich([['p′(t) = Re( i Tr(ρₜ (HP − PH)) )', C.cyan], ['   real · 实数', C.white]], 884, 372, { size: 28, a: a * Q(S, 2, 'commutator', 0.6), fam: F.zh });
  stRich([['HP = PH  ⇒  p(t) = p(0)', C.white]], 884, 430, { size: 26, a: a * Q(S, 4, 'commutes', 0.6) });
  stLeanChip(884, 490, ST_LEAN.projection_probability_flow, a * Q(S, 0, 'Lean checks', 0.6), { size: 18 });
  /* lines 0–3: the dial, turned by H = Y/2 */
  const cm = Q(S, 4, 'commutes', 0.8);
  const da = a * (1 - cm);
  if (da > 0.003) {
    const deg = 60;
    stDial(LN_O, LN_R, da);
    stArm(LN_O, LN_R, deg, C.now, da);
    txt('H = Y/2 · P = |0⟩⟨0| · ρ = |0⟩⟨0| · t = 60°', LN_O[0], LN_O[1] + LN_R + 52, { size: 22, fam: F.math, w: 700, align: 'center', c: C.white, a: da });
    /* the turning direction of the arrow (purple: the turn) */
    ctx.save(); ctx.globalAlpha = da * 0.9; ctx.strokeStyle = C.argued; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(LN_O[0], LN_O[1], LN_R * 0.45, -Math.PI / 2 + 20 * ST_DEG, -Math.PI / 2 + 80 * ST_DEG); ctx.stroke(); ctx.restore();
  }
  const ra = a * at(S, 3, 0.6) * (1 - cm);
  if (ra > 0.003) {
    panel(860, 560, 960, 230, ra, C.cyan, 'ON OUR DIAL · 在表盘上');
    const r = stRate([0, 1, 0], ST_P0, Math.PI / 3)[0];
    stRich([['p = cos²(θ/2) = ', C.white], [stNum(stProb([0, 1, 0], ST_P0, Math.PI / 3), 2), C.now], ['    p′ = ', C.white], [stNum(r), C.cyan]], 884, 630, { size: 28, a: ra });
    stRich([['f = 2p − 1,   f′ = 2p′ = ', C.white], [stNum(2 * r), C.cyan], ['  = −sin 60°', C.white]], 884, 690, { size: 28, a: ra * Q(S, 3, 'Twice that', 0.5) });
    txt('computed from 2 × 2 matrices · 由 2 × 2 矩阵算出', 884, 750, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
  }
  /* line 4: H = Z/2 commutes with P; the arrow precesses about the measured axis at a fixed height */
  const ka = a * cm;
  if (ka > 0.003) {
    const O = [LN_O[0], LN_O[1] + 20], R = 250, tilt = 0.32, h = 0.5;
    ring(O[0], O[1], R, C.white, ka * 0.35, 2);
    ctx.save(); ctx.globalAlpha = ka * 0.35; ctx.strokeStyle = C.white; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(O[0], O[1], R, R * tilt, 0, 0, TAU); ctx.stroke(); ctx.restore();
    const ry = O[1] - R * h, rr = R * Math.sqrt(1 - h * h);
    ctx.save(); ctx.globalAlpha = ka * 0.6; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.5; ctx.setLineDash([5, 6]);
    ctx.beginPath(); ctx.ellipse(O[0], ry, rr, rr * tilt, 0, 0, TAU); ctx.stroke(); ctx.restore();
    arrow(O[0], O[1] + R + 20, O[0], O[1] - R - 40, C.argued, ka, 3);
    txt('turn axis = measured axis · 转轴 = 测量轴', O[0], O[1] - R - 56, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ka });
    const ph = (u - phraseAt(S, 4, 'commutes')) * 1.6;
    const tip = [O[0] + rr * Math.sin(ph), ry + rr * tilt * Math.cos(ph)];
    arrow(O[0], O[1], tip[0], tip[1], C.now, ka, 5);
    stDash(O[0] - R - 30, ry, O[0] + R + 30, ry, C.cyan, ka * 0.5, 1.5);
    txt('p = 0.75 · 始终', O[0] + R + 40, ry + 8, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ka });
    txt('H = Z/2,  HP − PH = 0', O[0], O[1] + R + 40, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ka });
    panel(860, 560, 960, 230, ka, C.cyan, 'NOTHING MOVES · 一动不动');
    stRich([['p(t) = ', C.white], [stNum(stProb([0, 0, 1], [[[0.75, 0], [Math.sqrt(3) / 4, 0]], [[Math.sqrt(3) / 4, 0], [0.25, 0]]], ph), 2), C.cyan], ['   p′(t) = 0', C.white]], 884, 640, { size: 30, a: ka });
    txt('spin about the measured axis · 绕被测的轴转', 884, 700, { size: 22, fam: F.zh, w: 700, c: C.white, a: ka });
  }
  stamp('p′ = Re i Tr(ρ_t [H, P])', 1340, 640, Q(S, 0, 'Lean checks', 0.5, 0.8) * (1 - at(S, 1, 0.5, 1.5)), C.lean, 26, -0.06);
};

/* ======================================================================= */
/*                           scene 5 · A BUDGET OF MODES                     */
/* ======================================================================= */
SCENES.budget = S => {
  const u = S.u, a = stFade(S);
  if (a <= 0) return;
  badgeQ(S, [[1, null, 'argued'], [2, 'Lean checks', 'lean'], [4, 'Halves', 'computed']]);
  const qa = a * at(S, 0, 0.6) * (1 - at(S, 2, 0.6));
  if (qa > 0.003) {
    txt('how many modes can be big at once?', 1000, 300, { size: 32, fam: F.disp, w: 700, c: C.white, a: qa });
    txt('有多少个模式能同时很大？', 1000, 352, { size: 30, fam: F.zh, w: 700, c: C.white, a: qa });
  }
  /* lines 0–1: the dollar, ten dimes */
  const da = a * (1 - at(S, 2, 0.6) * 0.75);
  stTag('analogy · 比方', 120, 232, C.argued, da * at(S, 1, 0.6));
  const bx = 120, by = 270, bw = 700, bh = 60;
  txt('one dollar · 一块钱', bx + bw, by - 14, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.white, a: da * Q(S, 1, 'Split one dollar', 0.6) });
  box(bx, by, bw, bh, C.white, da * 0.6 * at(S, 1, 0.6), 1.5);
  const nd = Math.floor(clamp(Q(S, 1, 'Each winner', 2.0)) * 10 + 1e-9);
  for (let k = 0; k < 10; k++) {
    const sa = da * Q(S, 1, 'Split one dollar', 0.6) * (k < nd ? 1 : 0.25);
    fillBox(bx + k * bw / 10 + 3, by + 3, bw / 10 - 6, bh - 6, k < nd ? C.white : C.dim, sa * 0.6);
  }
  txt(`${nd} × 0.10 ≤ 1.00`, bx, by + bh + 42, { size: 26, fam: F.mono, w: 700, c: C.white, a: da * Q(S, 1, 'Each winner', 0.5) });
  txt('a dime or more each · 每人至少一角  ⇒  at most 10', bx, by + bh + 82, { size: 22, fam: F.zh, w: 700, c: C.white, a: da * Q(S, 1, 'at most ten win', 0.5) });
  /* lines 2–3: the geometric spectrum λ_j = 2^−(j+1) and a threshold sliding down to 1/8 */
  const ga = a * at(S, 2, 0.6);
  if (ga > 0.003) {
    const X0 = 120, Y0 = 820, bwj = 62, H0 = 520;   // bar j sits at X0 + j·bwj, height H0·λ_j
    const tau = Math.pow(2, -lerp(1, 3, ease(Q(S, 4, 'Halves', 2.4))));
    const n = stCount(tau), wall = 1 / tau;
    for (let j = 0; j < 12; j++) {
      const hgt = H0 * stLam(j), x = X0 + j * bwj, over = stLam(j) >= tau - 1e-12;
      fillBox(x + 6, Y0 - hgt, bwj - 12, hgt, over ? C.cyan : C.dim, ga * (over ? 0.7 : 0.45));
      if (over) line(x + 6, Y0 - H0 * tau, x + bwj - 6, Y0 - H0 * tau, C.now, ga, 3);
      txt(`${j}`, x + bwj / 2, Y0 + 28, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
    }
    line(X0, Y0, X0 + 12 * bwj, Y0, C.dim, ga, 1.5);
    stDash(X0, Y0 - H0 * tau, X0 + 12 * bwj, Y0 - H0 * tau, C.now, ga * 0.8, 2);
    txt(`τ = ${stNum(tau)}`, X0 + 12 * bwj + 14, Y0 - H0 * tau + 8, { size: 22, fam: F.mono, w: 700, c: C.now, a: ga });
    /* the wall RW/(πτ) on the same index axis, when it fits */
    const wx = X0 + wall * bwj;
    if (wx <= X0 + 12 * bwj) {
      line(wx, Y0 + 10, wx, Y0 - H0 * 0.6, C.mag, ga, 4);
      txt(`wall · 墙 ${stNum(wall, 2).replace(/\.00$/, '')}`, wx + 10, Y0 - H0 * 0.6 + 4, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ga });
    }
    txt(`over the line · 过线 ${n}   wall · 墙 RW/(πτ) = ${stNum(wall, 2).replace(/\.00$/, '')}`, X0, Y0 + 70, { size: 24, fam: F.zh, w: 700, c: C.white, a: ga * Q(S, 4, 'Halves', 0.5) });
  }
  /* the Lean statement */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 190, 820, 330, la, C.lean, 'ANY NONNEGATIVE LIST · 任意非负数列');
    stRich([['λⱼ ≥ 0,  summable · 可和,  Σ λⱼ = RW/π,  τ > 0', C.white]], 1024, 262, { size: 26, a: la, fam: F.zh });
    stRich([['{ j : λⱼ ≥ τ } is finite', C.cyan]], 1024, 320, { size: 28, a: la * Q(S, 3, 'finitely many', 0.5) });
    stRich([['#{ j : λⱼ ≥ τ } ≤ RW/(πτ)', C.mag]], 1024, 378, { size: 28, a: la * Q(S, 3, 'the total over the threshold', 0.5) });
    stLeanChip(1024, 450, ST_LEAN.finite_rank_concentration_mode_bound, la, { size: 16 });
    const ea = a * Q(S, 4, 'Halves', 0.6);
    panel(1000, 550, 820, 200, ea, C.cyan, 'EXAMPLE · 例');
    stRich([['λⱼ = 2^−(j+1),  R = π,  W = 1,  Σ λⱼ = 1', C.white]], 1024, 620, { size: 26, a: ea });
    stRich([['τ = 1/8:  3 ≤ 8', C.cyan]], 1024, 686, { size: 30, a: a * Q(S, 4, 'three terms', 0.5) });
  }
};

/* ======================================================================= */
/*                           scene 6 · WHAT IT DOES NOT SAY                  */
/* ======================================================================= */
SCENES.edge = S => {
  const a = stFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, en: '∂f = ½ [f(θ + 90°) − f(θ − 90°)]', zh: '要求角度只在一扇泡利门里出现一次', note: 'literature result, not formalized here · 文献结果，本书未形式化' },
    { k: 1, en: '#{ λⱼ ≥ τ } ≤ RW/(πτ) is a ceiling', zh: '模式计数只是天花板，拦不住斜率消失', note: 'a constant cost has slope zero under any budget · 常数目标的斜率恒为零' },
    { k: 2, en: 'barren plateaus in random circuits', zh: '随机电路的平坦地貌：需要 2-设计等更多假设', note: 'literature result, not formalized here · 文献结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210, col = rw.k === 1 ? C.cyan : C.argued;
    panel(240, y, 1440, 180, ra, col);
    txt(rw.en, 270, y + 58, { size: 32, fam: F.math, w: 700, c: col, a: ra });
    txt(rw.zh, 270, y + 106, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 270, y + 150, { size: 20, fam: F.zh, w: 700, c: rw.k === 1 ? C.dim : C.argued, a: ra * 0.95 });
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
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const O = [470, 600], R = 330;
  stDial(O, R, 1);
  stArm(O, R, -30, C.cyan, 1, { dashed: true, pearl: 'c' });
  stArm(O, R, 150, C.cyan, 1, { dashed: true, pearl: 'c' });
  stArm(O, R, 60, C.now, 1);
  txt(DATA.film.title_zh, 1380, 420, { size: 84, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TWO TURNS', 1380, 520, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('MEASURE A SLOPE', 1380, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.now, ab: 2, ls: 4 });
  stRich([['½ [f(θ + 90°) − f(θ − 90°)] = f′(θ)', C.white]], 1380, 680, { size: 36, align: 'center', ab: 1 });
  txt('for one Pauli turn · 单扇泡利门', 1380, 730, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 800, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
