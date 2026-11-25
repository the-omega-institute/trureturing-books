/* Film · The second sift catches nothing · 第二遍筛，什么也筛不掉
   (book quantum-geometry, part I: chapter 3). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     sift     a sieve: the first pass catches the lumps, the second catches none (analogy; argued); P² = P.
     drawers  P0 = diag(1, 0), P1 = diag(0, 1): P0² = P0, P1² = P1, P0 P1 = 0, P0 + P1 = I (computed); the book's
              record measurement (definition def-record-measurement, chapter 3.1).
     pinch    the qubit with Bloch vector r = (0.6, 0, 0.8): ρ = ½(I + r·σ) = [[0.9, 0.3], [0.3, 0.1]]; one unread Z
              measurement P0 ρ P0 + P1 ρ P1 wipes the corners, a second changes nothing (computed).
     theorem  unreadState P ∘ unreadState P = unreadState P for any finite record measurement on n × n matrices
              ..... FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent (LEAN); proof skeleton
              P_k (Σ_l P_l ρ P_l) P_k = P_k ρ P_k; three-drawer block picture (schematic); the reading of
              "existence" as what survives two checks is the book's interpretation (argued).
     ledger   purity surplus Tr ρ² − ½ = 0.5 = 0.32 (Z deviations, the line) + 0.18 (2|ρ01|², the perpendicular
              plane) (computed); after one and two pinches 0.32 + 0 (computed)
              ..... ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras (LEAN):
              under the two bookkeeping hypotheses, surplus = visible squared deviations + residual mass.
     edge     not reading is not collapse (Lüders update conditioned on an outcome, chapter 3 opening); the lost
              0.18 is chapter 4's question; existence-as-a-line is interpretation (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route (Pauli matrices, complex matrix products, random record measurements in dimensions 2–4,
   random qubit states for the ledger split). Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const PT_LEAN = {
  finite_record_pinching_idempotent: 'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  complementary_context_probability_pythagoras: 'D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras'
};
const PT_R = [0.6, 0, 0.8];
/* complex matrices: arrays of rows of [re, im] */
const cm = {
  mul: (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, z, k) => [s[0] + z[0] * B[k][j][0] - z[1] * B[k][j][1], s[1] + z[0] * B[k][j][1] + z[1] * B[k][j][0]], [0, 0]))),
  add: (A, B) => A.map((row, i) => row.map((z, j) => [z[0] + B[i][j][0], z[1] + B[i][j][1]])),
  adj: A => A[0].map((_, j) => A.map(row => [row[j][0], -row[j][1]])),
  zero: n => Array.from({ length: n }, () => Array.from({ length: n }, () => [0, 0])),
  eye: n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [i === j ? 1 : 0, 0])),
  dist: (A, B) => A.reduce((s, row, i) => Math.max(s, ...row.map((z, j) => Math.hypot(z[0] - B[i][j][0], z[1] - B[i][j][1]))), 0),
  trRe: A => A.reduce((s, row, i) => s + row[i][0], 0)
};
const ptUnread = (P, rho) => P.reduce((s, Pk) => cm.add(s, cm.mul(cm.mul(Pk, rho), Pk)), cm.zero(rho.length));
/* ρ = ½(I + r_x X + r_y Y + r_z Z) */
const ptRho = r => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
const PT_P = [[[[1, 0], [0, 0]], [[0, 0], [0, 0]]], [[[0, 0], [0, 0]], [[0, 0], [1, 0]]]];
/* the ledger of one qubit measured along Z: [surplus, line share, plane share] */
function ptLedger(rho) {
  const pur = cm.trRe(cm.mul(rho, rho)), p0 = rho[0][0][0], p1 = rho[1][1][0];
  return [pur - 0.5, Math.pow(p0 - 0.5, 2) + Math.pow(p1 - 0.5, 2), 2 * (rho[0][1][0] * rho[0][1][0] + rho[0][1][1] * rho[0][1][1])];
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('project-twice film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(PT_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(PT_LEAN).length}`);
  for (const [short, gid] of Object.entries(PT_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. DRAWERS: P0² = P0, P1² = P1, P0 P1 = 0, P0 + P1 = I */
  const [P0, P1] = PT_P;
  check(cm.dist(cm.mul(P0, P0), P0) === 0 && cm.dist(cm.mul(P1, P1), P1) === 0, 'P² = P');
  check(cm.dist(cm.mul(P0, P1), cm.zero(2)) === 0 && cm.dist(cm.add(P0, P1), cm.eye(2)) === 0, 'P0 P1 = 0, P0 + P1 = I');

  /* 2. PINCH: ρ from the Pauli matrices, one and two unread passes */
  const X = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], Y = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], Z = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
  const sc = (k, A) => A.map(row => row.map(z => [k * z[0], k * z[1]]));
  const rho = sc(0.5, cm.add(cm.add(cm.eye(2), sc(PT_R[0], X)), cm.add(sc(PT_R[1], Y), sc(PT_R[2], Z))));
  check(cm.dist(rho, ptRho(PT_R)) < 1e-15, 'ρ from Pauli matrices');
  check(near(rho[0][0][0], 0.9) && near(rho[1][1][0], 0.1) && near(rho[0][1][0], 0.3) && near(rho[1][0][0], 0.3), 'ρ = [[0.9, 0.3], [0.3, 0.1]]');
  const r1 = ptUnread(PT_P, rho), r2 = ptUnread(PT_P, r1);
  check(near(r1[0][0][0], 0.9) && near(r1[1][1][0], 0.1) && cm.dist(r1, [[[0.9, 0], [0, 0]], [[0, 0], [0.1, 0]]]) < 1e-15, 'one pass wipes the corners');
  check(cm.dist(r2, r1) === 0, 'the second pass changes nothing');

  /* 3. THEOREM: random record measurements (permuted coordinate blocks, rotated by a unitary) in dimension 2..4 */
  for (let k = 0; k < 30; k++) {
    const n = 2 + (k % 3);
    /* a random unitary via Gram–Schmidt on a random complex matrix */
    const cols = [];
    for (let j = 0; j < n; j++) {
      let v = Array.from({ length: n }, (_, i) => [2 * rnd(k, 10 * j + i) - 1, 2 * rnd(k + 50, 10 * j + i) - 1]);
      for (const c of cols) {
        const ip = c.reduce((s, z, i) => [s[0] + z[0] * v[i][0] + z[1] * v[i][1], s[1] + z[0] * v[i][1] - z[1] * v[i][0]], [0, 0]);
        v = v.map((z, i) => [z[0] - ip[0] * c[i][0] + ip[1] * c[i][1], z[1] - ip[0] * c[i][1] - ip[1] * c[i][0]]);
      }
      const nn = Math.sqrt(v.reduce((s, z) => s + z[0] * z[0] + z[1] * z[1], 0));
      cols.push(v.map(z => [z[0] / nn, z[1] / nn]));
    }
    const U = Array.from({ length: n }, (_, i) => cols.map(c => c[i]));
    /* group the n basis vectors into 1..n drawers */
    const g = Array.from({ length: n }, (_, i) => Math.floor(rnd(k, 90 + i) * Math.min(n, 1 + (k % 3))));
    const labels = [...new Set(g)];
    const P = labels.map(lb => { const D = cm.zero(n); g.forEach((x, i) => { if (x === lb) D[i][i] = [1, 0]; }); return cm.mul(cm.mul(U, D), cm.adj(U)); });
    check(cm.dist(P.reduce((s, Pk) => cm.add(s, Pk), cm.zero(n)), cm.eye(n)) < 1e-12, `complete record ${k}`);
    const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => [2 * rnd(k, 200 + 7 * i + j) - 1, 2 * rnd(k, 300 + 7 * i + j) - 1]));
    const once = ptUnread(P, M), twice = ptUnread(P, once);
    check(cm.dist(once, twice) < 1e-12, `unread twice = unread once ${k}`);
  }

  /* 4. LEDGER: 0.5 = 0.32 + 0.18 before, 0.32 + 0 after one and two passes; the split on random qubit states */
  const L0 = ptLedger(rho), L1 = ptLedger(r1), L2 = ptLedger(r2);
  check(near(L0[0], 0.5) && near(L0[1], 0.32) && near(L0[2], 0.18) && near(L0[1] + L0[2], L0[0]), '0.5 = 0.32 + 0.18');
  check(near(Math.pow(0.4, 2) * 2, 0.32) && near(2 * 0.09, 0.18), '0.4² + 0.4², 2 × 0.3²');
  check(near(L1[0], 0.32) && near(L1[1], 0.32) && near(L1[2], 0) && near(L2[0], 0.32) && near(L2[2], 0), 'after the pinch');
  for (let k = 0; k < 40; k++) {
    const th = Math.PI * rnd(k, 1), ph = 2 * Math.PI * rnd(k, 2), len = rnd(k, 3);
    const r = [len * Math.sin(th) * Math.cos(ph), len * Math.sin(th) * Math.sin(ph), len * Math.cos(th)];
    const Lk = ptLedger(ptRho(r));
    check(near(Lk[0], Lk[1] + Lk[2], 1e-12) && near(Lk[1], r[2] * r[2] / 2, 1e-12) && near(Lk[2], (r[0] * r[0] + r[1] * r[1]) / 2, 1e-12), `qubit ledger ${k}`);
  }
});
Object.assign(FILM.speed, { sift: 0.02, drawers: 0.014, pinch: 0.014, theorem: 0.016, ledger: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const ptFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const ptNum = (v, n = 1) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
function ptRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const PT_MISSING = new Set();
function ptLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!PT_MISSING.has(gid)) { PT_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a 2 × 2 matrix with brackets: cells [[text, colour, alpha], …] row by row; returns the cell centres */
function ptMat(x, y, cell, cells, a, o = {}) {
  const size = o.size || cell * 0.36, h = cell * 2, w = cell * 2;
  if (a > 0.003) {
    const br = 14;
    line(x, y, x, y + h, C.white, a * 0.85, 3); line(x, y, x + br, y, C.white, a * 0.85, 3); line(x, y + h, x + br, y + h, C.white, a * 0.85, 3);
    line(x + w, y, x + w, y + h, C.white, a * 0.85, 3); line(x + w, y, x + w - br, y, C.white, a * 0.85, 3); line(x + w, y + h, x + w - br, y + h, C.white, a * 0.85, 3);
  }
  const cs = [];
  cells.forEach((c, i) => {
    const cx = x + cell * (0.5 + (i % 2)), cy = y + cell * (0.5 + Math.floor(i / 2));
    cs.push([cx, cy]);
    if (c && a > 0.003) {
      if (c[3]) fillBox(cx - cell * 0.42, cy - cell * 0.42, cell * 0.84, cell * 0.84, c[1], a * c[3]);
      txt(c[0], cx, cy + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: c[1], a: a * (c[2] == null ? 1 : c[2]) });
    }
  });
  return cs;
}
/* a horizontal bar of total width w split into coloured parts [[value, colour, label]], scaled by total */
function ptBar(x, y, w, h, total, parts, a, o = {}) {
  if (a <= 0.003) return;
  box(x, y, w, h, C.dim, a * 0.5, 1.2);
  let cx = x;
  for (const [v, col, lab, al] of parts) {
    const pw = w * v / total, pa = a * (al == null ? 1 : al);
    if (pa > 0.003 && pw > 0.5) {
      fillBox(cx, y, pw, h, col, pa * 0.55);
      box(cx, y, pw, h, col, pa, 1.5);
      if (lab && pw > 60) txt(lab, cx + pw / 2, y + h / 2 + (o.size || 24) * 0.36, { size: o.size || 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: pa });
    }
    cx += pw;
  }
}
/* the sieve: a mesh across (x0, x1) at height y, grains falling through; lumps (magenta) caught on pass 1 */
function ptSieve(S, cx, y, wd, a, o = {}) {
  if (a <= 0.003) return;
  const x0 = cx - wd / 2, x1 = cx + wd / 2;
  /* rim and mesh */
  line(x0 - 30, y - 70, x0, y, C.white, a * 0.8, 4); line(x1 + 30, y - 70, x1, y, C.white, a * 0.8, 4);
  for (let k = 0; k <= 16; k++) line(x0 + wd * k / 16, y - 3, x0 + wd * k / 16, y + 3, C.dim, a * 0.8, 1.5);
  line(x0, y, x1, y, C.dim, a * 0.9, 2);
  /* fine flour: cyan grains falling straight through */
  const flow = o.flow == null ? 1 : o.flow;
  for (let k = 0; k < 40; k++) {
    const gx = x0 + 20 + (wd - 40) * rnd(k, 3), sp = 160 + 80 * rnd(k, 4);
    const yy = y - 220 + ((S.t * sp + 380 * rnd(k, 5)) % 440);
    dot(gx, yy, 3.5, 'c', a * flow * 0.8 * clamp((yy - y + 230) / 40) * clamp((y + 220 - yy) / 60));
  }
  /* lumps resting on the mesh */
  const caught = o.caught == null ? 0 : o.caught;
  for (let k = 0; k < 4; k++) {
    const lx = x0 + wd * (0.18 + 0.21 * k);
    dot(lx, y - 13, 15, 'm', a * caught);
  }
  /* the bowl below */
  ctx.save(); ctx.globalAlpha = a * 0.7; ctx.strokeStyle = C.white; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(cx, y + 230, wd * 0.55, 60, 0, 0, Math.PI); ctx.stroke(); ctx.restore();
}
/* opening title */
function ptTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE SECOND SIFT CATCHES NOTHING', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('SIEVE · DRAWERS · CORNERS · UNREAD TWICE · LEDGER · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                               scene 1 · SIFT TWICE                        */
/* ======================================================================= */
SCENES.sift = S => {
  const u = S.u;
  ptTitle(S);
  const a = clamp((u - lineAt(S, 0).s - 0.35) / 0.6) * clamp((S.d - u) / 0.5);   // after the title has gone
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* pass 1 on the left, pass 2 on the right */
  const p1 = Q(S, 0, 'catches the lumps', 0.8), p2 = at(S, 1, 0.6);
  ptSieve(S, 500, 520, 560, a, { caught: p1 });
  txt('pass 1 · 第一遍', 500, 300, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a });
  txt(p1 > 0.5 ? 'caught 4 lumps · 拦下 4 个疙瘩' : 'caught 0 lumps · 拦下 0 个疙瘩', 500, 860, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * p1 });
  ptSieve(S, 1420, 520, 560, a * p2, { caught: 0 });
  txt('pass 2 · 第二遍', 1420, 300, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * p2 });
  txt('caught 0 lumps · 拦下 0 个疙瘩', 1420, 860, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * Q(S, 1, 'catches nothing', 0.6) });
  /* line 2: P² = P */
  const pa = a * Q(S, 2, 'In symbols', 0.6);
  if (pa > 0.003) {
    panel(W / 2 - 300, 170, 600, 110, pa, C.cyan);
    ptRich([['P', C.white], ['²', C.white], [' = ', C.white], ['P', C.white]], W / 2, 245, { size: 58, a: pa, align: 'center', ab: 1 });
  }
  txt('analogy · 比方', 960, 210, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * (1 - pa) });
};

/* ======================================================================= */
/*                               scene 2 · TWO DRAWERS                       */
/* ======================================================================= */
SCENES.drawers = S => {
  const a = ptFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const cell = 92;
  const c1 = C.cyan, c0 = C.dim;
  const P0 = [['1', c1], ['0', c0], ['0', c0], ['0', c0]], P1 = [['0', c0], ['0', c0], ['0', c0], ['1', C.mag]];
  /* line 0: P0 */
  const a0 = a * Q(S, 0, 'smallest projector', 0.6);
  txt('P₀', 150, 330, { size: 40, fam: F.math, w: 700, c: C.cyan, a: a0 });
  ptMat(230, 240, cell, P0, a0);
  /* line 1: P0 P0 = P0 */
  const a1 = a * Q(S, 1, 'Square it', 0.6);
  if (a1 > 0.003) {
    ptMat(500, 240, cell, P0, a1);
    txt('=', 735, 340, { size: 48, fam: F.math, w: 700, align: 'center', c: C.white, a: a1 });
    ptMat(790, 240, cell, P0, a1 * Q(S, 1, 'P squared is P', 0.5));
    txt('×', 465, 340, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a: a1 });
    ptRich([['P₀² = P₀', C.cyan]], 1100, 340, { size: 40, a: a1 * Q(S, 1, 'P squared is P', 0.5) });
  }
  /* line 2: the partner P1, P0 P1 = 0, P0 + P1 = I */
  const a2 = a * Q(S, 2, 'Its partner', 0.6);
  if (a2 > 0.003) {
    txt('P₁', 150, 600, { size: 40, fam: F.math, w: 700, c: C.mag, a: a2 });
    ptMat(230, 510, cell, P1, a2);
    const b1 = a2 * Q(S, 2, 'multiply to zero', 0.5), b2 = a2 * Q(S, 2, 'add up to the identity', 0.5);
    ptRich([['P₁² = P₁', C.mag]], 500, 560, { size: 34, a: a2 });
    ptRich([['P₀ P₁ = 0', C.white]], 500, 620, { size: 34, a: b1 });
    ptRich([['P₀ + P₁ = I', C.white]], 500, 680, { size: 34, a: b2 });
    /* the drawers */
    const d = a2 * Q(S, 2, 'two drawers', 0.6);
    if (d > 0.003) {
      panel(1080, 470, 720, 330, d, C.argued, 'TWO DRAWERS · 两只抽屉 (analogy · 比方)');
      for (const [k, col, nm] of [[0, C.cyan, 'drawer 0 · P₀'], [1, C.mag, 'drawer 1 · P₁']]) {
        const x = 1130 + k * 330, y = 550;
        box(x, y, 260, 140, col, d, 2.5);
        line(x + 100, y + 70, x + 160, y + 70, col, d, 5);
        txt(nm, x + 130, y + 190, { size: 24, fam: F.mono, w: 700, align: 'center', c: col, a: d });
      }
      txt('no overlap · 不重叠    nothing left out · 不遗漏', 1440, 780, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: d });
    }
  }
  txt('record measurement · 记录测量 (chapter 3.1)', 1440, 230, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * Q(S, 2, 'nothing left out', 0.6) });
};

/* ======================================================================= */
/*                               scene 3 · WIPE THE CORNERS                  */
/* ======================================================================= */
SCENES.pinch = S => {
  const u = S.u, a = ptFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the Bloch arrow, a small static inset (the arrow is not projected here) */
  const wipe0 = Q(S, 3, 'corners are wiped', 0.6);
  const ia = a * at(S, 0, 0.6) * (1 - 0.6 * wipe0);
  const O = [330, 520], R = 200;
  txt('before the pass · 测之前', O[0], O[1] - R - 70, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * wipe0 });
  if (ia > 0.003) {
    ring(O[0], O[1], R, C.dim, ia * 0.7, 2);
    line(O[0], O[1] - R - 30, O[0], O[1] + R + 30, C.cyan, ia * 0.6, 2);
    line(O[0] - R - 30, O[1], O[0] + R + 30, O[1], C.mag, ia * 0.35, 1.5);
    txt('Z', O[0] + 12, O[1] - R - 30, { size: 26, fam: F.math, w: 700, c: C.cyan, a: ia });
    arrow(O[0], O[1], O[0] + 0.6 * R, O[1] - 0.8 * R, C.now, ia, 5);
    txt('r = (0.6, 0, 0.8)', O[0], O[1] + R + 70, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.now, a: ia });
    txt('Bloch arrow · 布洛赫箭头', O[0], O[1] + R + 108, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ia });
  }
  /* the density matrix and its passes */
  const ma = a * Q(S, 1, 'density matrix', 0.6);
  const wipe = ease(Q(S, 3, 'corners are wiped', 1.0));
  const pass2 = Q(S, 4, 'Do it again', 0.6);
  const cornerA = 1 - wipe;
  const cnum = wipe > 0.98 ? '0' : ptNum(0.3 * (1 - wipe));
  const cells = [['0.9', C.cyan, 1, 0.16], [cnum, wipe > 0.98 ? C.dim : C.mag, 1, 0.16 * cornerA], [cnum, wipe > 0.98 ? C.dim : C.mag, 1, 0.16 * cornerA], ['0.1', C.cyan, 1, 0.16]];
  const mx = 780, my = 300, cell = 150;
  txt('ρ =', mx - 30, my + cell + 16, { size: 48, fam: F.math, w: 700, align: 'right', c: C.now, a: ma });
  ptMat(mx, my, cell, cells, ma, { size: 50 });
  /* labels: diagonal = Z readings, corners = coherence */
  const la = a * Q(S, 2, 'The diagonal', 0.6), lb = a * Q(S, 2, 'The corners', 0.6);
  txt('diagonal: Z readings · 对角线：Z 读数', mx + cell, my - 34, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
  txt('corners: coherence · 角：相干', mx + cell, my + 2 * cell + 60, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: lb * (1 - wipe * 0.5) });
  /* the sweep of a pass */
  const sweep = (p, col) => { if (p > 0 && p < 1) { const x = mx - 20 + (2 * cell + 40) * p; line(x, my - 10, x, my + 2 * cell + 10, col, a * 0.9, 4); } };
  sweep(Q(S, 3, 'Measure along Z', 1.6), C.now);
  sweep(Q(S, 4, 'Do it again', 1.6), C.now);
  /* the pass log */
  const pa = a * Q(S, 3, 'Measure along Z', 0.6);
  if (pa > 0.003) {
    panel(1260, 270, 560, 360, pa, C.cyan, 'UNREAD Z · 沿 Z 测、不看');
    ptRich([['P₀ρP₀ + P₁ρP₁', C.white]], 1290, 350, { size: 32, a: pa });
    ptRich([['pass 1  corner change  ', C.white], ['0.3 → 0', C.mag]], 1290, 430, { size: 26, a: pa * wipe, fam: F.mono });
    ptRich([['pass 2  corner change  ', C.white], ['0', C.now]], 1290, 490, { size: 26, a: pa * pass2, fam: F.mono });
    ptRich([['pass 2  diagonal change  ', C.white], ['0', C.now]], 1290, 540, { size: 26, a: pa * Q(S, 4, 'nothing moves', 0.5), fam: F.mono });
    txt('corners ↔ lumps · 角对应疙瘩 (analogy · 比方)', 1290, 600, { size: 18, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
  stamp('NOTHING MOVES', 1080, 760, Q(S, 4, 'nothing moves', 0.5), C.now, 44, -0.05);
};

/* ======================================================================= */
/*                               scene 4 · UNREAD TWICE                      */
/* ======================================================================= */
SCENES.theorem = S => {
  const a = ptFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [2, null, 'argued']]);
  const ta = a * at(S, 0, 0.6) * (1 - 0.45 * at(S, 2, 0.6));
  panel(120, 190, 1000, 300, ta, C.lean, 'ANY FINITE RECORD MEASUREMENT · 任意有限记录测量');
  ptRich([['unread(P) ∘ unread(P) = unread(P)', C.white]], 150, 290, { size: 40, a: ta });
  txt('any n × n matrix ρ · 任意 n × n 方阵', 150, 350, { size: 24, fam: F.zh, w: 700, c: C.dim, a: ta });
  ptLean(150, 420, PT_LEAN.finite_record_pinching_idempotent, ta, { size: 20 });
  /* line 1: the proof skeleton */
  const pa = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.6) * 0.6);
  if (pa > 0.003) {
    ptRich([['P', C.white], ['ₖ', C.white], [' (Σₗ PₗρPₗ) ', C.white], ['P', C.white], ['ₖ', C.white], [' = PₖρPₖ', C.cyan]], 150, 560, { size: 34, a: pa });
    ptRich([['PₖPₗ = 0  (k ≠ l)', C.white], ['     Pₖ² = Pₖ', C.cyan]], 150, 620, { size: 28, a: pa * Q(S, 1, 'multiply to zero', 0.5) });
  }
  /* three-drawer block picture: off-diagonal blocks gone, second pass sorts nothing (schematic) */
  const ba = a * Q(S, 1, 'Different drawers', 0.6);
  if (ba > 0.003) {
    const bx = 1340, by = 200, bs = 124;
    const cols = [C.cyan, C.mag, C.white];
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      const diag = i === j;
      fillBox(bx + j * bs + 4, by + i * bs + 4, bs - 8, bs - 8, diag ? cols[i] : C.dim, ba * (diag ? 0.35 : 0.06));
      box(bx + j * bs + 4, by + i * bs + 4, bs - 8, bs - 8, diag ? cols[i] : C.dim, ba * (diag ? 0.9 : 0.4), 1.5);
      if (!diag) txt('0', bx + j * bs + bs / 2, by + i * bs + bs / 2 + 12, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ba });
    }
    txt('three drawers, sorted · 三只抽屉，已分好', bx + 1.5 * bs, by + 3 * bs + 38, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ba });
    txt('schematic · 示意', bx + 1.5 * bs, by + 3 * bs + 70, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ba });
  }
  /* lines 2–3: the question and the aphorism (interpretation) */
  const qa = a * at(S, 2, 0.7);
  if (qa > 0.003) {
    panel(120, 690, 1700, 150, qa, C.argued, "THE BOOK'S READING · 本书的诠释");
    txt('Why trust that something is there?  Because asking twice gives the same answer.', 150, 770, { size: 28, fam: F.disp, w: 700, c: C.white, a: qa * (1 - at(S, 3, 0.5)) });
    txt('凭什么相信它在那里？因为问两遍，答案一样。', 150, 812, { size: 24, fam: F.zh, w: 700, c: C.argued, a: qa * (1 - at(S, 3, 0.5)) });
    const aa = a * at(S, 3, 0.6);
    txt('A thing is whatever the same ruler can measure twice without a change.', 150, 770, { size: 30, fam: F.disp, w: 700, c: C.white, a: aa });
    txt('所谓实体，就是同一把尺子连量两次而不走样的东西。', 150, 812, { size: 24, fam: F.zh, w: 700, c: C.argued, a: aa });
  }
  stamp('ONCE = TWICE', 640, 540, Q(S, 0, 'unread twice', 0.5, 0.4) * (1 - at(S, 1, 0.5)), C.lean, 40, -0.05);
};

/* ======================================================================= */
/*                               scene 5 · LINE AND PLANE                    */
/* ======================================================================= */
SCENES.ledger = S => {
  const a = ptFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean'], [5, null, 'computed']]);
  const bx = 520, bw = 900, bh = 56;
  panel(120, 180, 1700, 470, a, C.cyan, 'PURITY LEDGER · 纯度账本 · one qubit, measured along Z');
  /* line 1: the surplus */
  const s1 = a * Q(S, 1, 'surplus of one half', 0.6);
  ptRich([['Tr ρ² − ½ = 1 − ½ = ', C.white], ['0.5', C.now]], 150, 260, { size: 30, a: a * at(S, 1, 0.6) });
  /* line 2 and 3: the two shares */
  const lineA = Q(S, 2, 'Square both and add', 0.6), planeA = Q(S, 3, 'other zero point one eight', 0.6);
  ptRich([['line · 线  (0.9 − ½)² + (0.1 − ½)² = 0.4² + 0.4² = ', C.cyan], ['0.32', C.cyan]], 150, 320, { size: 26, a: a * lineA, fam: F.zh });
  ptRich([['plane · 面  2 × 0.3² = ', C.mag], ['0.18', C.mag]], 150, 370, { size: 26, a: a * planeA, fam: F.zh });
  /* the three rows: before, after one pass, after two */
  const rows = [
    ['before · 捏合前', 0.32, 0.18, 1],
    ['pass 1 · 一遍后', 0.32, 0, Q(S, 5, 'After one pass', 0.6)],
    ['pass 2 · 两遍后', 0.32, 0, Q(S, 5, 'After two', 0.6)]
  ];
  rows.forEach(([nm, l, p, ra], i) => {
    const y = 420 + i * 74, ra2 = a * ra * s1;
    if (ra2 <= 0.003) return;
    txt(nm, 150, y + 38, { size: 24, fam: F.zh, w: 700, c: i ? C.now : C.white, a: ra2 });
    ptBar(bx, y, bw, bh, 0.5, [[l, C.cyan, 'line 0.32', i ? 1 : lineA], [p, C.mag, 'plane 0.18', planeA]], ra2, { size: 22 });
    txt(i ? '0.32 + 0' : '0.32 + 0.18', bx + bw + 24, y + 38, { size: 24, fam: F.mono, w: 700, c: C.white, a: ra2 * (i ? 1 : planeA) });
  });
  /* line 4: Lean */
  const la = a * Q(S, 4, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(120, 676, 1700, 190, la, C.lean, 'ANY FINITE DIMENSION, ANY SET OF CONTEXTS · 一般情形');
    ptRich([['Re Tr ρ² − 1/|d| = Σₗ Σⱼ (pₗⱼ − 1/|d|)² + residualMass(V, s)', C.white]], 150, 752, { size: 30, a: la });
    txt('if |s|² is the surplus and |P_V s|² the visible deviations · 前提：|s|² 为盈余，|P_V s|² 为可见偏离', 150, 798, { size: 24, fam: F.zh, w: 700, c: C.white, a: la * 0.92 });
    ptLean(150, 846, PT_LEAN.complementary_context_probability_pythagoras, la, { size: 21 });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const a = ptFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'not looking ≠ collapse', zh: '不看，不等于坍缩', note: 'reading keeps one drawer: PₖρPₖ / Tr(ρPₖ) · 读出：留下一只抽屉再归一（第 3 章开篇）' },
    { k: 1, col: C.mag, en: 'the lost 0.18 does not come back', zh: '丢掉的 0.18 不会靠再捏回来', note: 'where it went: chapter 4 · 它去了哪儿：第四章' },
    { k: 2, col: C.argued, en: 'existence = a line you can check twice', zh: '“存在”即能连查两次的线', note: "the book's interpretation, not a theorem · 本书的诠释，不是定理" }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 215;
    panel(240, y, 1440, 185, ra, rw.col);
    txt(rw.en, 280, y + 60, { size: 34, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 280, y + 108, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 280, y + 152, { size: 20, fam: F.zh, w: 700, c: rw.col === C.argued ? C.argued : C.dim, a: ra * 0.95 });
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const cell = 150;
  txt('ρ =', 210, 470, { size: 52, fam: F.math, w: 700, align: 'right', c: C.now });
  ptMat(240, 300, cell, [['0.9', C.cyan, 1, 0.16], ['0', C.dim, 1, 0], ['0', C.dim, 1, 0], ['0.1', C.cyan, 1, 0.16]], 1, { size: 52 });
  txt('pass 2: nothing moves', 390, 690, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now });
  txt(DATA.film.title_zh, 1250, 420, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE SECOND SIFT', 1250, 520, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('CATCHES NOTHING', 1250, 582, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  ptRich([['P² = P', C.white]], 1250, 680, { size: 48, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1250, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
