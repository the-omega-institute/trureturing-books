/* Film · The Line That Closes · 闭合的直线 (book omega-math, chapter 2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests (all in chapter 2 of the book):
     ruler    the affine slope t = P/Q for the pairs (1, 2), (1, 1), (2, 1), (5, 1), (10, 1), then Q = 0 (computed); the
              glued-on symbol ∞ is the chapter's opening diagnosis.
     pair     homogeneous pairs [P : Q] up to nonzero scale (definition def-ch02-qp1-kappa-spread); the multiples
              2 : 4, 3 : 6, −1 : −2 of [1 : 2]; normSq = P² + Q² ≥ 1 off (0, 0); κ(2, 4) = 16/20 ≡ 4/5 (computed);
              LEAN: thm-ch02-nat-kappa-scale (ProjectiveOverlapScaling.kappa_scale, positive natural scale k + 1) and
              thm-ch02-int-kappa-scale (OmegaCircleClosure.kappa_scale, any signed k ≠ 0).
     shares   spread s = P²/(P² + Q²): [1 : 2] → 4/5 + 1/5, [2 : 3] → 9/13 + 4/13 (computed);
              LEAN: thm-ch02-kappa-add-spread (kappa_add_spread_eq_one, every nonzero pair).
     circle   the rational Cayley map X = (Q² − P²)/(P² + Q²), Y = 2PQ/(P² + Q²); [1 : 2] ↦ (3/5, 4/5),
              [2 : 3] ↦ (5/13, 12/13), 9 + 16 = 25, 25 + 144 = 169 (computed); the line drawn is the vertical diameter,
              onto which the pin (−1, 0) projects the circle point of [P : Q] at height P/Q (schematic placement, the
              coordinates are exact); LEAN: thm-ch02-cayley-unit (cayley_circle_unit).
     anchors  the three causal anchors of 2.2 with the chapter's readouts (table, NUM): [0 : 1] ↦ (1, 0), κ = 1, s = 0;
              [1 : 1] ↦ (0, 1), κ = s = 1/2 from κ = 1 − κ; [−1 : 1] ↦ (0, −1); [1 : 0] ↦ (−1, 0), κ = 0, s = 1;
              LEAN: thm-ch02-antipodal-closure (cayley_antipodal_closure, every p ≠ 0).
     turns    projectiveMul(p₁, q₁, p₂, q₂) = (p₁q₂ + q₁p₂, q₁q₂ − p₁p₂) of 2.3 and example ex-ch02-hand-calculations:
              (1, 2) ⊙ (1, 3) = (5, 5) ~ [1 : 1], 5 · 10 = 50 = 5² + 5², (1, 1) ⊙ (1, 1) = (2, 0) ~ [1 : 0],
              (1, 0) ⊙ (1, 0) = (0, −1) ~ [0 : 1] (computed); LEAN: thm-ch02-circle-mul-normsq
              (projective_circle_mul_normSq, all integers). The arctan relation is the chapter's classical comparison.
     horizon  finite horizons: canonical coprime pairs with |P| ≤ M, 0 ≤ Q ≤ M, counted here as 4, 8, 184 for
              M = 1, 2, 12 (computed, matching the chapter's lists); the general count 4Φ(M) is the chapter's ARGUED
              statement; the commutativity limit is remark rem-ch02-abelian-limit (ARGUED).
   On load, FILM.init recomputes every number on screen by a second route and pushes any disagreement to
   window.FILM_ERRORS, which stops the render. */
'use strict';

const LC_LEAN = {
  natScale: 'D5/S3/Quantum/AURICOmega/ProjectiveOverlapScaling.kappa_scale',
  intScale: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_scale',
  share: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.kappa_add_spread_eq_one',
  unit: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_circle_unit',
  pole: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.cayley_antipodal_closure',
  norm: 'D5/S3/Quantum/AURICOmega/OmegaCircleClosure.projective_circle_mul_normSq'
};

/* ---------------- exact integer arithmetic of chapter 2 ---------------- */
const lcGcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const lcFr = (n, d) => { const g = lcGcd(n, d) || 1, s = d < 0 ? -1 : 1; return [s * n / g, s * d / g]; };
const lcStr = x => { const n = x[0] < 0 ? '−' + -x[0] : String(x[0]); return x[1] === 1 ? n : `${n}/${x[1]}`; };
const lcAdd = (x, y) => lcFr(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
const lcSq = x => lcFr(x[0] * x[0], x[1] * x[1]);
const normSq = (p, q) => p * p + q * q;
const kappa = (p, q) => lcFr(q * q, normSq(p, q));
const spread = (p, q) => lcFr(p * p, normSq(p, q));
const cayley = (p, q) => [lcFr(q * q - p * p, normSq(p, q)), lcFr(2 * p * q, normSq(p, q))];
const pmul = (p1, q1, p2, q2) => [p1 * q2 + q1 * p2, q1 * q2 - p1 * p2];
/* canonical representative: coprime, Q > 0, or Q = 0 and P = 1 */
function canon(p, q) {
  const g = lcGcd(p, q); p /= g; q /= g;
  if (q < 0 || (q === 0 && p < 0)) { p = -p; q = -q; }
  return [p + 0, q + 0];
}
/* the finite horizon: canonical pairs with |P| ≤ M and 0 ≤ Q ≤ M */
function horizon(M) {
  const out = [];
  for (let q = 0; q <= M; q++) for (let p = -M; p <= M; p++) {
    if (lcGcd(p, q) !== 1) continue;
    const c = canon(p, q);
    if (c[0] === p && c[1] === q) out.push([p, q]);
  }
  return out;
}
const sgn = n => (n < 0 ? '−' + -n : String(n));
const pt = (p, q) => `[${sgn(p)} : ${sgn(q)}]`;
const LC = {
  k24: kappa(2, 4), raw24: [16, 20],
  s12: [kappa(1, 2), spread(1, 2)], s23: [kappa(2, 3), spread(2, 3)],
  c12: cayley(1, 2), c23: cayley(2, 3),
  prod: pmul(1, 2, 1, 3), sq11: pmul(1, 1, 1, 1), sq10: pmul(1, 0, 1, 0),
  H1: horizon(1), H2: horizon(2), H12: horizon(12), H5: horizon(5)
};

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('the-line-that-closes film: ' + m); };
  const lean = DATA.lean || [];
  check(lean.length === 6, `film.json cites ${lean.length} declarations, expected 6`);
  for (const gid of Object.values(LC_LEAN)) { const r = leanCite(gid); check(r && r.kind === 'theorem', `${gid} is not a cited theorem`); }
  /* pair: multiples are one point, κ invariant (also by floating point) */
  for (const [p, q] of [[2, 4], [3, 6], [-1, -2], [1, 2]]) check(canon(p, q).join() === '1,2', `canon ${p}, ${q}`);
  check(lcStr(LC.k24) === '4/5' && LC.raw24[0] === 4 * 4 && LC.raw24[1] === normSq(2, 4), 'κ(2, 4) = 16/20 = 4/5');
  for (let k = -5; k <= 5; k++) if (k) check(Math.abs((k * 4) ** 2 / normSq(2 * k, 4 * k) - 0.8) < 1e-12, `κ scale ${k}`);
  /* shares: κ + s = 1 and the cell counts */
  check(lcStr(LC.s12[0]) === '4/5' && lcStr(LC.s12[1]) === '1/5' && lcStr(lcAdd(...LC.s12)) === '1', 'shares of [1 : 2]');
  check(lcStr(LC.s23[0]) === '9/13' && lcStr(LC.s23[1]) === '4/13' && lcStr(lcAdd(...LC.s23)) === '1', 'shares of [2 : 3]');
  /* circle: the two worked points and X² + Y² = 1 for the whole horizon M = 12, exactly and in floating point */
  check(lcStr(LC.c12[0]) === '3/5' && lcStr(LC.c12[1]) === '4/5', 'C[1 : 2]');
  check(lcStr(LC.c23[0]) === '5/13' && lcStr(LC.c23[1]) === '12/13', 'C[2 : 3]');
  check(9 + 16 === 25 && 25 + 144 === 169 && 13 * 13 === 169, 'sums of squares');
  for (const [p, q] of LC.H12) {
    const [X, Y] = cayley(p, q);
    check(lcStr(lcAdd(lcSq(X), lcSq(Y))) === '1', `X² + Y² at ${p}, ${q}`);
    const a = 2 * Math.atan2(p, q);
    check(Math.abs(X[0] / X[1] - Math.cos(a)) < 1e-12 && Math.abs(Y[0] / Y[1] - Math.sin(a)) < 1e-12, `angle at ${p}, ${q}`);
  }
  /* anchors (the chapter's table) */
  const tab = [[0, 1, '1', '0', '1', '0'], [1, 2, '4/5', '1/5', '3/5', '4/5'], [1, 1, '1/2', '1/2', '0', '1'], [1, 0, '0', '1', '−1', '0'], [-1, 1, '1/2', '1/2', '0', '−1']];
  for (const [p, q, k, s, x, y] of tab) {
    const c = cayley(p, q);
    check(lcStr(kappa(p, q)) === k && lcStr(spread(p, q)) === s && lcStr(c[0]) === x && lcStr(c[1]) === y, `anchor ${p}, ${q}`);
  }
  for (const p of [1, -1, 2, -7]) { const c = cayley(p, 0); check(lcStr(kappa(p, 0)) === '0' && lcStr(c[0]) === '−1' && lcStr(c[1]) === '0', `pole ${p}`); }
  /* turns: products, norms, the round trip; the classical comparison numerically */
  check(LC.prod.join() === '5,5' && canon(...LC.prod).join() === '1,1', '(1, 2)(1, 3)');
  check(normSq(1, 2) * normSq(1, 3) === 50 && normSq(...LC.prod) === 50, '5 · 10 = 50');
  check(LC.sq11.join() === '2,0' && canon(...LC.sq11).join() === '1,0', '(1, 1)²');
  check(LC.sq10.join() === '0,-1' && canon(...LC.sq10).join() === '0,1', '(1, 0)²');
  check(Math.abs(Math.atan(1 / 2) + Math.atan(1 / 3) - Math.PI / 4) < 1e-12, 'arctan comparison');
  check(pmul(1, 3, 1, 2).join() === LC.prod.join(), 'commutative');
  for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++) for (let c = -3; c <= 3; c++) for (let d = -3; d <= 3; d++)
    if (normSq(a, b) * normSq(c, d) !== normSq(...pmul(a, b, c, d))) check(false, `norm identity ${a} ${b} ${c} ${d}`);
  /* horizon: counts against 4Φ(M) by the totient, and the chapter's lists */
  const phi = n => { let c = 0; for (let j = 1; j <= n; j++) if (lcGcd(j, n) === 1) c++; return c; };
  const Phi = M => { let s = 0; for (let j = 1; j <= M; j++) s += phi(j); return s; };
  check(LC.H1.length === 4 && LC.H2.length === 8 && LC.H12.length === 184, `horizon counts ${LC.H1.length}, ${LC.H2.length}, ${LC.H12.length}`);
  for (const M of [1, 2, 3, 5, 12]) check(horizon(M).length === 4 * Phi(M), `4Φ(${M})`);
  check(Phi(12) === 46, 'Φ(12) = 46');
  const list2 = '[0:1] [1:2] [1:1] [2:1] [1:0] [-2:1] [-1:1] [-1:2]'.split(' ').map(s => s.slice(1, -1).split(':').map(Number).join());
  check(list2.every(k => LC.H2.some(x => x.join() === k)), 'the chapter list at M = 2');
});
Object.assign(FILM.speed, { ruler: 0.02, pair: 0.016, shares: 0.016, circle: 0.014, anchors: 0.014, turns: 0.014, horizon: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function leanChip(x, y, gid, a, size = 20, full = false) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r) return;
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  const parts = (r.name || r.label).split('.');
  txt(full ? parts.slice(-2).join('.') : parts[parts.length - 1], x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the shared circle stage */
const CX = 540, CY = 500, R = 290;
const onC = (X, Y) => [CX + R * X, CY - R * Y];
const cpt = (p, q) => { const [X, Y] = cayley(p, q); return onC(X[0] / X[1], Y[0] / Y[1]); };
function axes(a) {
  if (a <= 0) return;
  line(CX - R - 50, CY, CX + R + 50, CY, C.dim, a * 0.5, 1.2);
  line(CX, CY - R - 40, CX, CY + R + 40, C.dim, a * 0.5, 1.2);
  ring(CX, CY, R, C.cyan, a * 0.85, 2.5);
}
function label(s, x, y, col, a, size = 26, align = 'left', fam = F.math) { txt(s, x, y, { size, fam, w: 700, c: col, a, align }); }

/* opening title */
function title(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.2) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE LINE THAT CLOSES', p, 5), W / 2, 580, { size: 52, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 6, ab: 2 });
  txt('[P : Q] · P² + Q² · κ + s = 1 · X² + Y² = 1', W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 4 });
}

/* ======================================================================= */
/*                          scene 1 · THE BROKEN RULER                       */
/* ======================================================================= */
const RU = { ox: 300, oy: 790, d: 62, unit: 60, len: 640 };
const RU_KEYS = [[1, 2, 'one half'], [1, 1, 'one, two'], [2, 1, 'two, five'], [5, 1, 'five, ten'], [10, 1, 'ten.']];
SCENES.ruler = S => {
  title(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.6) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* key times: each slope when it is spoken, then upright on "Q is zero" */
  const times = RU_KEYS.map(k => phraseAt(S, 0, k[2]) - 0.15).concat([phraseAt(S, 1, 'Q is zero') - 0.2]);
  const angs = RU_KEYS.map(k => Math.atan2(k[0], k[1])).concat([Math.PI / 2]);
  let idx = 0;
  times.forEach((t, i) => { if (S.u >= t) idx = i; });
  let ang = angs[0];
  for (let i = 1; i < times.length; i++) ang = lerp(ang, angs[i], ease(clamp((S.u - times[i]) / 0.45)));
  const { ox, oy, d, unit, len } = RU, rx = ox + d;
  /* the ruler x = 1 with slope ticks */
  line(rx, oy, rx, 172, C.cyan, a * 0.8, 2);
  line(ox - 40, oy, ox + 620, oy, C.dim, a * 0.6, 1.5);
  [[1, '1'], [2, '2'], [5, '5'], [10, '10']].forEach(([t, s]) => {
    const y = oy - t * unit; line(rx - 8, y, rx + 8, y, C.cyan, a, 2);
    label(s, rx + 18, y + 8, C.dim, a, 22, 'left', F.mono);
  });
  label('slope ruler · 斜率尺', rx + 18, oy + 36, C.dim, a * 0.8, 18, 'left', F.zh);
  /* the ray */
  const ex = ox + len * Math.cos(ang), ey = oy - len * Math.sin(ang);
  const upright = idx === RU_KEYS.length;
  line(ox, oy, ex, ey, upright ? C.mag : C.white, a, 3.5);
  dot(ox, oy, 12, 'c', a);
  /* the intersection with the ruler */
  const tanv = Math.tan(ang), hy = oy - unit * tanv;
  if (!upright && hy > 176) {
    dashed(rx, hy, rx + 300, hy, C.now, a * 0.6, 1.5);
    dot(rx, hy, 14, 'o', a);
    const K = RU_KEYS[Math.min(idx, RU_KEYS.length - 1)];
    label(`t = ${K[1] === 1 ? K[0] : K[0] + '/' + K[1]}`, rx + 320, hy + 14, C.now, a, 40);
  }
  if (upright) label('t = 1 / 0 = ?', rx + 120, 480, C.mag, a * Q(S, 1, 'crashes', 0.4), 48);
  /* the readout table */
  const px = 1000, py = 200;
  panel(px, py, 780, 610, a, C.cyan, 'SLOPE t = P / Q · 斜率');
  label('P', px + 70, py + 90, C.dim, a, 26, 'center', F.mono);
  label('Q', px + 200, py + 90, C.dim, a, 26, 'center', F.mono);
  label('t = P / Q', px + 470, py + 90, C.dim, a, 26, 'center', F.mono);
  const rows = RU_KEYS.map(k => [k[0], k[1], k[1] === 1 ? String(k[0]) : `${k[0]}/${k[1]}`]).concat([[1, 0, '1 / 0']]);
  rows.forEach((r, i) => {
    const ra = a * clamp((S.u - times[i]) / 0.3);
    if (ra <= 0) return;
    const y = py + 150 + i * 56, cur = i === idx, bad = i === rows.length - 1;
    const col = bad ? C.mag : cur ? C.now : C.white;
    label(String(r[0]), px + 70, y, col, ra, 32, 'center', F.mono);
    label(String(r[1]), px + 200, y, col, ra, 32, 'center', F.mono);
    label(r[2], px + 470, y, col, ra, 36, 'center', F.math);
    if (bad) label('÷ 0  ERROR', px + 620, y, C.mag, ra * Q(S, 1, 'crashes', 0.4), 24, 'left', F.mono);
  });
  /* the glued-on symbol */
  const g = a * at(S, 2, 0.6);
  if (g > 0) {
    label('∞', px + 130, py + 560, C.dim, g, 72, 'center');
    line(px + 92, py + 545, px + 170, py + 505, C.mag, g, 3);
    label('∞ + 1 = ?    ∞ − ∞ = ?    0 · ∞ = ?', px + 230, py + 545, C.dim, g, 26, 'left');
  }
};

/* ======================================================================= */
/*                            scene 2 · KEEP THE PAIR                        */
/* ======================================================================= */
const LT = { x: 470, y: 500, step: 44, n: 6 };
const lxy = (p, q) => [LT.x + q * LT.step, LT.y - p * LT.step];
SCENES.pair = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [4, null, 'lean']]);
  const la = a * at(S, 0, 0.6);
  /* lattice of integer pairs, Q to the right and P up */
  for (let p = -LT.n; p <= LT.n; p++) for (let q = -LT.n; q <= LT.n; q++) {
    const [x, y] = lxy(p, q); dot(x, y, 4, 'b', la * 0.6);
  }
  line(LT.x - 290, LT.y, LT.x + 290, LT.y, C.dim, la * 0.6, 1.2);
  line(LT.x, LT.y - 290, LT.x, LT.y + 290, C.dim, la * 0.6, 1.2);
  label('Q', LT.x + 300, LT.y + 8, C.dim, la, 26);
  label('P', LT.x - 8, LT.y - 300, C.dim, la, 26, 'center');
  /* the line through [1 : 2] */
  const lp = a * at(S, 0, 0.8, 1.4);
  const [x0, y0] = lxy(-3.3, -6.6), [x1, y1] = lxy(3.3, 6.6);
  dashed(x0, y0, x1, y1, C.cyan, lp * 0.9, 2.2);
  /* multiples light up as spoken */
  const m = [[2, 4, 'Two to four'], [3, 6, 'three to six'], [-1, -2, 'minus one to minus two']];
  const all = Q(S, 1, 'one point', 0.5);
  [[1, 2], [2, 4], [3, 6], [-1, -2], [-2, -4], [-3, -6]].forEach(([p, q]) => {
    const [x, y] = lxy(p, q); dot(x, y, 11, 'c', a * all);
  });
  m.forEach(([p, q, ph]) => {
    const k = a * Q(S, 1, ph, 0.4), [x, y] = lxy(p, q);
    dot(x, y, 14, 'o', k * (1 - all * 0.6));
    label(`${sgn(p)} : ${sgn(q)}`, x + (p < 0 ? 18 : -16), y + (p < 0 ? 36 : -18), C.now, k * (1 - all * 0.5), 22, p < 0 ? 'left' : 'right');
  });
  const one = lxy(1, 2);
  dot(one[0], one[1], 15, 'o', a * all);
  label('[1 : 2]', one[0] + 14, one[1] + 42, C.now, a * all, 28);
  /* the excluded origin */
  const z = a * at(S, 2, 0.5);
  ring(LT.x, LT.y, 13, C.mag, z, 2.5);
  label('(0, 0) excluded', LT.x + 22, LT.y + 44, C.mag, z, 20, 'left', F.mono);
  /* the right panel */
  const px = 900, py = 200, pw = 880;
  panel(px, py, pw, 620, a * at(S, 0, 0.6), C.cyan, 'HOMOGENEOUS PAIR · 齐次整数对');
  label('[P : Q] = [kP : kQ],  k ≠ 0', px + 40, py + 90, C.white, a * at(S, 0, 0.6, 0.8), 34);
  label('[2 : 4] = [3 : 6] = [−1 : −2] = [1 : 2]', px + 40, py + 160, C.white, a * all, 34);
  const r2 = a * at(S, 2, 0.6);
  label('P² + Q²  ≥  1', px + 40, py + 250, C.white, r2, 46);
  label('for (P, Q) ≠ (0, 0) · 分母永不为零', px + 400, py + 250, C.dim, r2, 20, 'left', F.zh);
  const r3 = a * Q(S, 2, 'fidelity kappa', 0.6);
  label('κ(P, Q) = Q² / (P² + Q²)', px + 40, py + 340, C.white, r3, 40);
  label('κ(2, 4) = 16/20', px + 40, py + 410, C.white, a * Q(S, 3, 'sixteen', 0.5), 40);
  label('≡ 4/5', px + 390, py + 410, C.now, a * Q(S, 3, 'four fifths', 0.5), 44);
  const r4 = a * at(S, 4, 0.6);
  label('κ(kP, kQ) ≡ κ(P, Q)', px + 40, py + 490, C.lean, r4, 38);
  label('natural k ≥ 1 · signed k ≠ 0', px + 460, py + 490, C.dim, r4, 20, 'left', F.mono);
  leanChip(px + 40, py + 545, LC_LEAN.natScale, r4, 18, true);
  leanChip(px + 40, py + 592, LC_LEAN.intScale, a * at(S, 4, 0.6, 0.4), 18, true);
  stamp('LEAN ✓', 1600, 760, a * Q(S, 4, 'leaves kappa', 0.5), C.lean, 28, -0.06);
};

/* ======================================================================= */
/*                             scene 3 · TWO SHARES                          */
/* ======================================================================= */
function shareBar(x, y, w, h, kN, sN, a, grow, lab) {
  if (a <= 0) return;
  const n = kN + sN, cw = w / n;
  label(lab, x, y - 22, C.white, a, 30);
  label(`P² + Q² = ${n}`, x + w, y - 22, C.dim, a, 24, 'right', F.mono);
  for (let i = 0; i < n; i++) {
    const ca = a * clamp(grow * n - i);
    if (ca <= 0) continue;
    const isK = i < kN, col = isK ? C.cyan : C.mag;
    fillBox(x + i * cw + 2, y, cw - 4, h, col, ca * 0.32);
    box(x + i * cw + 2, y, cw - 4, h, col, ca, 1.5);
  }
  const ta = a * clamp(grow * 1.2 - 0.2);
  label(`κ = ${kN}/${n}`, x + (kN * cw) / 2, y + h + 44, C.cyan, ta, 32, 'center');
  label(`s = ${sN}/${n}`, x + kN * cw + (sN * cw) / 2, y + h + 44, C.mag, ta, 32, 'center');
}
SCENES.shares = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean']]);
  const x = 310, w = 1300;
  label('κ = Q² / (P² + Q²)', 310, 215, C.cyan, a * at(S, 0, 0.5), 30);
  label('s = P² / (P² + Q²)', 1610, 215, C.mag, a * at(S, 0, 0.5, 0.3), 30, 'right');
  const [k12, s12] = LC.s12, [k23, s23] = LC.s23;
  shareBar(x, 320, w, 86, k12[0] * (5 / k12[1]), s12[0] * (5 / s12[1]), a * at(S, 0, 0.5, 0.6), at(S, 0, 1.6, 1.4), '[1 : 2]');
  shareBar(x, 560, w, 86, k23[0], s23[0], a * at(S, 1, 0.5), at(S, 1, 1.6, 0.2), '[2 : 3]');
  const r = a * at(S, 2, 0.6);
  label('κ + s ≡ 1', W / 2, 790, C.lean, r, 60, 'center');
  leanChip(310, 790, LC_LEAN.share, r, 20);
  label('no θ · no √ · no π', 1610, 790, C.dim, a * Q(S, 2, 'no angle', 0.5), 26, 'right', F.mono);
  stamp('LEAN ✓', 1180, 480, a * Q(S, 2, 'is one', 0.5), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                          scene 4 · THE CAYLEY CIRCLE                      */
/* ======================================================================= */
SCENES.circle = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'lean']]);
  axes(a);
  /* the line (vertical diameter) and the pin (−1, 0) */
  const lineA = a * (1 - 0.6 * at(S, 0, 2.0, 2.0));
  line(CX, 175, CX, 825, C.white, lineA * 0.8, 3);
  const pin = onC(-1, 0);
  /* every point of the horizon M = 5 slides from its spot P/Q on the line to its Cayley point */
  const bend = ease(at(S, 0, 2.6, 1.2));
  for (const [p, q] of LC.H5) {
    if (q === 0) continue;
    const ly = clamp(CY - R * p / q, 165, 835), [tx, ty] = cpt(p, q);
    const x = lerp(CX, tx, bend), y = lerp(ly, ty, bend);
    dot(x, y, 7, 'c', a * at(S, 0, 0.5, 0.4) * (Math.abs(R * p / q) > 335 ? bend : 1));
  }
  const pa = a * at(S, 0, 0.5, 3.4);
  dot(pin[0], pin[1], 10, 'm', pa);
  label('[1 : 0]', pin[0] - 18, pin[1] - 18, C.mag, pa, 22, 'right');
  /* the two worked points with their strings from the pin */
  const pts = [[1, 2, 'One to two', '(3/5, 4/5)'], [2, 3, 'two to three', '(5/13, 12/13)']];
  pts.forEach(([p, q, ph, s], i) => {
    const k = a * Q(S, 1, ph, 0.5), [tx, ty] = cpt(p, q);
    dashed(pin[0], pin[1], tx, ty, C.now, k * 0.7, 1.6);
    dot(tx, ty, 14, 'o', k);
    label(pt(p, q), tx + 18, ty - 14 - i * 6, C.now, k, 24);
  });
  /* the right panel */
  const px = 960, py = 200;
  panel(px, py, 820, 620, a * at(S, 0, 0.5), C.cyan, 'RATIONAL CAYLEY CIRCLE · 有理凯莱圆');
  const r0 = a * Q(S, 0, 'Cayley point', 0.5);
  label('X = (Q² − P²) / (P² + Q²)', px + 40, py + 95, C.white, r0, 38);
  label('Y = 2PQ / (P² + Q²)', px + 40, py + 150, C.white, r0, 38);
  label(`[1 : 2]  ↦  (${lcStr(LC.c12[0])}, ${lcStr(LC.c12[1])})`, px + 40, py + 245, C.now, a * Q(S, 1, 'One to two', 0.5), 38);
  label(`[2 : 3]  ↦  (${lcStr(LC.c23[0])}, ${lcStr(LC.c23[1])})`, px + 40, py + 305, C.now, a * Q(S, 1, 'two to three', 0.5), 38);
  label('3² + 4² = 9 + 16 = 25 = 5²', px + 40, py + 400, C.white, a * at(S, 2, 0.5), 34);
  label('5² + 12² = 25 + 144 = 169 = 13²', px + 40, py + 455, C.white, a * Q(S, 2, 'twenty-five plus', 0.5), 34);
  const r3 = a * at(S, 3, 0.6);
  label('X² + Y² ≡ 1', px + 40, py + 545, C.lean, r3, 46);
  leanChip(px + 360, py + 540, LC_LEAN.unit, r3, 20);
  label('every nonzero pair · no √', px + 360, py + 590, C.dim, r3, 20, 'left', F.mono);
  stamp('LEAN ✓', 1660, 540, a * Q(S, 3, 'lands exactly', 0.5), C.lean, 28, -0.06);
};

/* ======================================================================= */
/*                           scene 5 · THREE ANCHORS                         */
/* ======================================================================= */
const ANCH = [
  { p: 0, q: 1, name: 'PAST', zh: '过去', k: 0, ph: null, dx: -26, dy: -16, al: 'right' },
  { p: 1, q: 1, name: 'PRESENT', zh: '现在', k: 1, ph: null, dx: 0, dy: 60, al: 'center' },
  { p: 1, q: 0, name: 'FUTURE', zh: '未来', k: 2, ph: null, dx: 26, dy: -16, al: 'left' }
];
SCENES.anchors = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [3, null, 'lean']]);
  axes(a);
  for (const [p, q] of LC.H5) { const [x, y] = cpt(p, q); dot(x, y, 5, 'c', a * 0.45); }
  /* the anchors on the circle */
  const cur = S.u >= lineAt(S, 2).s ? 2 : S.u >= lineAt(S, 1).s ? 1 : 0;
  ANCH.forEach((A, i) => {
    const k = a * at(S, i, 0.5, i === 0 ? 1.2 : 0.2), [x, y] = cpt(A.p, A.q);
    const col = i === cur && S.u < lineAt(S, 3).s ? C.now : C.white;
    dot(x, y, 16, i === cur ? 'o' : 'w', k);
    label(`${pt(A.p, A.q)} ${A.name}`, x + A.dx, y + A.dy - 6, col, k, 24, A.al, F.mono);
  });
  const mir = a * Q(S, 1, 'one half', 0.5), [mx, my] = cpt(-1, 1);
  dot(mx, my, 12, 'w', mir * 0.8);
  label('[−1 : 1]', mx + 20, my + 30, C.dim, mir, 22, 'left', F.mono);
  /* infinity opposite home */
  const h = a * Q(S, 2, 'old infinity', 0.6);
  if (h > 0) {
    const home = onC(1, 0), opp = onC(-1, 0);
    ctx.save(); ctx.globalAlpha = h; ctx.strokeStyle = C.mag; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(CX, CY, R + 30, -0.02, -Math.PI * ease(Q(S, 2, 'old infinity', 1.6, 0.2)) + 0.02, true); ctx.stroke(); ctx.restore();
    label('home', home[0] - 26, home[1] + 40, C.cyan, h, 22, 'right', F.mono);
    label('∞ = [1 : 0]', opp[0] + 26, opp[1] + 44, C.mag, h * Q(S, 2, 'old infinity', 0.5, 0.8), 30, 'left');
  }
  /* readouts */
  const px = 960, py = 200;
  panel(px, py, 820, 620, a * at(S, 0, 0.5), C.cyan, 'THREE ANCHORS · 三枚因果锚点');
  const row = (i, y, head, rd, sub) => {
    const k = a * at(S, i, 0.5, i === 0 ? 1.2 : 0.2), col = i === cur && S.u < lineAt(S, 3).s ? C.now : C.white;
    label(head, px + 40, y, col, k, 26, 'left', F.mono);
    label(rd, px + 40, y + 50, col, k, 34);
    if (sub) label(sub[0], px + 40, y + 95, sub[1], a * sub[2], 26);
  };
  row(0, py + 85, 'PAST · 过去   [0 : 1]', `κ = ${lcStr(kappa(0, 1))}   s = ${lcStr(spread(0, 1))}   ↦ (1, 0)`);
  row(1, py + 215, 'PRESENT · 现在   [1 : 1]', `κ = ${lcStr(kappa(1, 1))}   s = ${lcStr(spread(1, 1))}   ↦ (0, 1)`,
    ['κ = 1 − κ  ⇒  κ = 1/2   (no π/2)', C.cyan, Q(S, 1, 'kappa equals one minus kappa', 0.5)]);
  row(2, py + 390, 'FUTURE · 未来   [1 : 0]', `κ = ${lcStr(kappa(1, 0))}   s = ${lcStr(spread(1, 0))}   ↦ (−1, 0)`,
    ['P² + Q² = 1 + 0 = 1,  not 0', C.cyan, Q(S, 2, 'denominator', 0.5)]);
  const r3 = a * at(S, 3, 0.6);
  label('[p : 0], p ≠ 0:  κ ≡ 0,  s ≡ 1,  C ≡ (−1, 0)', px + 40, py + 560, C.lean, r3, 30);
  leanChip(px + 40, py + 605, LC_LEAN.pole, r3, 18);
  stamp('LEAN ✓', 1610, 690, a * Q(S, 3, 'kappa is zero', 0.5), C.lean, 28, -0.06);
};

/* ======================================================================= */
/*                           scene 6 · INTEGER TURNS                         */
/* ======================================================================= */
function arcAt(r, a0, a1, col, a, lw = 5) {
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.arc(CX, CY, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
}
SCENES.turns = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed']]);
  axes(a);
  const angOf = (p, q) => { const [X, Y] = cayley(p, q); return Math.atan2(Y[0] / Y[1], X[0] / X[1]); };
  const tA = angOf(1, 2), tB = angOf(1, 3);
  const home = onC(1, 0);
  dot(home[0], home[1], 11, 'c', a);
  /* part 1: the two arcs and their sum */
  const p1 = a * (1 - at(S, 3, 0.5));
  const gA = ease(at(S, 0, 0.9, 0.6)), gB = ease(Q(S, 0, 'one to three', 0.9));
  arcAt(R + 26, 0, tA * gA, C.cyan, p1 * at(S, 0, 0.4, 0.6));
  arcAt(R + 26, tA, tA + tB * gB, C.mag, p1 * Q(S, 0, 'one to three', 0.4));
  const [ax, ay] = cpt(1, 2), [bx, by] = cpt(1, 3), [sx, sy] = cpt(1, 1);
  dot(bx, by, 12, 'm', p1 * Q(S, 0, 'one to three', 0.5));
  label('[1 : 3]', bx - 22, by + 26, C.mag, p1 * Q(S, 0, 'one to three', 0.5), 24, 'right');
  dot(ax, ay, 12, 'c', p1 * at(S, 0, 0.5, 0.6));
  label('[1 : 2]', ax - 22, ay + 26, C.cyan, p1 * at(S, 0, 0.5, 0.6), 24, 'right');
  const g = p1 * Q(S, 0, 'five to five', 0.5);
  dot(sx, sy, 16, 'o', g);
  label('(5, 5) ~ [1 : 1]', sx, sy + 150, C.now, g, 26, 'center');
  /* part 2: squaring walks present → future → home */
  const p2 = a * at(S, 3, 0.5);
  if (p2 > 0) {
    const s1 = ease(Q(S, 3, 'two to zero', 0.9)), s2 = ease(Q(S, 3, 'Square again', 0.9));
    const ang = s2 > 0 ? lerp(Math.PI, 2 * Math.PI, s2) : lerp(Math.PI / 2, Math.PI, s1);
    arcAt(R + 26, Math.PI / 2, Math.PI / 2 + (Math.PI / 2) * s1, C.now, p2 * 0.8);
    if (s2 > 0) arcAt(R + 26, Math.PI, Math.PI + Math.PI * s2, C.now, p2 * 0.8);
    const [x, y] = onC(Math.cos(ang), Math.sin(ang));
    dot(x, y, 18, 'o', p2);
    label('[1 : 1]', sx, sy + 60, C.white, p2, 26, 'center');
    const [fx, fy] = onC(-1, 0);
    label('[1 : 0]', fx + 28, fy - 18, C.white, p2 * Q(S, 3, 'two to zero', 0.5), 26);
    label('[0 : 1]', home[0] - 28, home[1] - 18, C.white, p2 * Q(S, 3, 'back home', 0.5), 26, 'right');
  }
  /* the right panel */
  const px = 940, py = 200, pa = a * (1 - at(S, 2, 0.5));
  panel(px, py, 840, 620, a, C.cyan, 'CIRCLE MULTIPLICATION · 齐次圆群乘法');
  label('(p₁, q₁) ⊙ (p₂, q₂) = (p₁q₂ + q₁p₂,  q₁q₂ − p₁p₂)', px + 30, py + 85, C.dim, a, 28);
  const [P, Qv] = LC.prod;
  label('(1, 2) ⊙ (1, 3)', px + 30, py + 165, C.white, pa * at(S, 0, 0.5, 0.4), 38);
  label('= (1·3 + 2·1,  2·3 − 1·1)', px + 30, py + 220, C.white, pa * Q(S, 0, 'one to three is', 0.5), 34);
  label(`= (${P}, ${Qv})`, px + 50 + tw('(1, 2) ⊙ (1, 3)', 38, F.math, 700), py + 165, C.now, pa * Q(S, 0, 'five to five', 0.5), 38);
  label('(5, 5) = 5 · (1, 1)  ~  [1 : 1]', px + 30, py + 300, C.now, pa * Q(S, 0, 'or one to one', 0.5), 34);
  label(`${normSq(1, 2)} × ${normSq(1, 3)} = ${normSq(P, Qv)} = 5² + 5²`, px + 30, py + 385, C.white, pa * at(S, 1, 0.5), 38);
  const r3 = pa * Q(S, 1, 'Lean checks', 0.6);
  label('normSq(z₁) · normSq(z₂) = normSq(z₁ ⊙ z₂)', px + 30, py + 480, C.lean, r3, 32);
  leanChip(px + 30, py + 540, LC_LEAN.norm, r3, 18);
  stamp('LEAN ✓', 1600, 330, pa * Q(S, 1, 'for all integers', 0.5), C.lean, 28, -0.06);
  /* block 2 */
  const q4 = a * at(S, 2, 0.5, 0.2);
  label('arctan ½ + arctan ⅓ = π/4', px + 30, py + 175, C.dim, q4, 36);
  line(px + 24, py + 163, px + 30 + tw('arctan ½ + arctan ⅓ = π/4', 36, F.math, 700) + 6, py + 163, C.mag, q4 * Q(S, 2, 'here, one', 0.4), 3);
  label('[1 : 2] ⊙ [1 : 3] = [1 : 1]', px + 30, py + 250, C.cyan, a * Q(S, 2, 'here, one', 0.5), 40);
  const s = LC.sq11, t = LC.sq10;
  label(`(1, 1) ⊙ (1, 1) = (${s[0]}, ${s[1]})  ~  [1 : 0]`, px + 30, py + 370, C.white, a * at(S, 3, 0.5), 34);
  label(`(1, 0) ⊙ (1, 0) = (${t[0]}, ${sgn(t[1])})  ~  [0 : 1]`, px + 30, py + 440, C.white, a * Q(S, 3, 'Square again', 0.5), 34);
  label('norms 2 × 2 = 4 = 2² + 0²', px + 30, py + 520, C.dim, a * Q(S, 3, 'two to zero', 0.5, 0.6), 26, 'left', F.mono);
};

/* ======================================================================= */
/*                           scene 7 · FINITE HORIZON                        */
/* ======================================================================= */
SCENES.horizon = S => {
  const a = fade(S);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  axes(a);
  const m2 = Q(S, 0, 'at two', 0.5), m12 = at(S, 1, 0.6);
  const set = m12 > 0 ? LC.H12 : m2 > 0 ? LC.H2 : LC.H1;
  const M = m12 > 0 ? 12 : m2 > 0 ? 2 : 1;
  const grow = m12 > 0 ? m12 : m2 > 0 ? m2 : at(S, 0, 0.5, 0.8);
  const r = M === 12 ? 6 : M === 2 ? 12 : 16;
  set.forEach(([p, q], i) => {
    const [x, y] = cpt(p, q);
    dot(x, y, r, M === 1 ? 'o' : 'c', a * clamp(grow * 1.4 - (i / set.length) * 0.4));
  });
  if (M <= 2) set.forEach(([p, q]) => {
    const [x, y] = cpt(p, q), dx = x - CX, dy = y - CY, l = Math.hypot(dx, dy);
    label(pt(p, q), x - dx / l * 70, y - dy / l * 44 + 8, M === 1 ? C.now : C.white, a * grow, 20, 'center', F.mono);
  });
  /* the right panel */
  const px = 960, py = 200;
  panel(px, py, 820, 620, a, C.cyan, 'FINITE HORIZON · 有限法雷视界');
  label('precision 1/M:  |P| ≤ M,  0 ≤ Q ≤ M', px + 40, py + 85, C.dim, a * at(S, 0, 0.5), 28, 'left', F.mono);
  const rows = [[1, LC.H1.length, at(S, 0, 0.5, 0.8)], [2, LC.H2.length, m2], [12, LC.H12.length, m12]];
  rows.forEach(([m, n, k], i) => {
    const col = m === M ? C.now : C.white;
    label(`M = ${m}`, px + 40, py + 170 + i * 75, col, a * k, 40, 'left', F.mono);
    label(`${n} points`, px + 330, py + 170 + i * 75, col, a * k, 40, 'left', F.mono);
  });
  const r2 = a * at(S, 2, 0.6);
  label('in general  4 · Φ(M),   Φ(M) = φ(1) + … + φ(M)', px + 40, py + 410, C.argued, r2, 28);
  label('4 · Φ(12) = 4 · 46 = 184', px + 40, py + 460, C.dim, r2, 26, 'left', F.mono);
  const r3 = a * at(S, 3, 0.6);
  label('(1, 2) ⊙ (1, 3) = (1, 3) ⊙ (1, 2) = (5, 5)', px + 40, py + 540, C.white, r3, 30);
  label('one plane · order leaves no mark → chapter 3', px + 40, py + 590, C.argued, a * Q(S, 3, 'Order needs', 0.5), 24, 'left', F.mono);
};

/* ======================================================================= */
/*                                 close                                    */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 250 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const si = 4, sc = TL.scenes[si], t = sc.start + 5;
  background(t, sc, si, 6);
  axes(1);
  for (const [p, q] of LC.H12) { const [x, y] = cpt(p, q); dot(x, y, 6, 'c', 0.8); }
  ANCH.forEach(A => { const [x, y] = cpt(A.p, A.q); dot(x, y, 18, 'o', 1); label(pt(A.p, A.q), x + A.dx, y + A.dy - 6, C.now, 1, 26, A.al, F.mono); });
  txt(DATA.film.title_zh, 1360, 400, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE LINE THAT CLOSES', 1360, 490, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 4 });
  txt('[1 : 0] ↦ (−1, 0) · κ + s = 1 · X² + Y² = 1', 1360, 570, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.mag });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), si, sc);
  post(0);
};
