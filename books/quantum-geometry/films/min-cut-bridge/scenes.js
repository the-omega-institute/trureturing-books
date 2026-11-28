/* Film · The narrowest waist · 最窄的腰
   (book quantum-geometry, part V: chapter 19). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hourglass  a road of 6, 12 and 6 lanes; six streams of cars pass side by side however wide the middle is
                (analogy; argued).
     bridge     the width-three bridge graph: node M (legs a out, b in) and node N (legs d out, c in) joined by three
                bridges, drawn as strands; flow(M, N) = Σ_r M_r ⊗ N_r has ad rows and bc columns, its rank counts the
                independent signals, the best rank is QMaxFlow (definitions of chapter 19.1; computed).
     cuts       (a, b, c, d) = (2, 3, 2, 3): exits ad = 6, entrances bc = 6, bridges 3ac = 12; QMinCut = 6 (computed).
     bound      QuantumMaxFlowBound.QMaxFlow_le_QMinCut (LEAN): for all natural a, b, c, d,
                QMaxFlow ≤ QMinCut = min(3ac, min(ad, bc)).
     fill       the explicit routing of example 19 (ex-bridge-two-three): bridge 0 sends (j, l) ↦ (j, l) for j < 2,
                bridge 1 sends (2, 0) ↦ (0, 2), bridge 2 sends (2, 1) ↦ (1, 2); six distinct outputs, rank 6 (computed)
                ..... QuantumMaxFlowMinCut.result (LEAN): 0 < a ≤ b, 0 < c ≤ d, a² + b² ≤ 3ab, c² + d² ≤ 3cd ⟹
                QMaxFlow = QMinCut ∧ QMinCut = min(ad, bc); here 4 + 9 = 13 ≤ 18 (computed).
     edge       outside the cone no equality is claimed, e.g. (1, 5, 1, 5) has cuts 5, 5, 3 (computed); rank is not
                spectrum flatness (chapter 19.4); one small graph, not a tensor network; the Ryu–Takayanagi formula
                is a literature result (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen by an
   independent route: the flow matrix of the routing example built entry by entry from the six slices, its rank by
   elimination, the rank bound on random integer slices for all small sizes, and the cone simplification of the cut.
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const MC_LEAN = {
  QMaxFlow_le_QMinCut: 'D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut',
  result: 'D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result'
};
const MC_A = 2, MC_B = 3, MC_C = 2, MC_D = 3;
const mcCut = (a, b, c, d) => Math.min(3 * a * c, Math.min(a * d, b * c));
const mcCone = (a, b, c, d) => 0 < a && a <= b && 0 < c && c <= d && a * a + b * b <= 3 * a * b && c * c + d * d <= 3 * c * d;
/* the six slices of the routing example: M_r is a × b (entry [i][j]), N_r is d × c (entry [k][l]) */
const mcZero = (r, c) => Array.from({ length: r }, () => new Array(c).fill(0));
function mcSlices() {
  const M = [0, 1, 2].map(() => mcZero(2, 3)), N = [0, 1, 2].map(() => mcZero(3, 2));
  M[0][0][0] = M[0][1][1] = 1; N[0][0][0] = N[0][1][1] = 1;
  M[1][0][2] = 1; N[1][2][0] = 1;
  M[2][1][2] = 1; N[2][2][1] = 1;
  return { M, N };
}
/* flow(M, N): rows (i, k) ∈ Fin a × Fin d, columns (j, l) ∈ Fin b × Fin c */
function mcFlow(M, N, a, b, c, d) {
  const F = mcZero(a * d, b * c);
  for (let r = 0; r < M.length; r++) for (let i = 0; i < a; i++) for (let k = 0; k < d; k++) for (let j = 0; j < b; j++) for (let l = 0; l < c; l++)
    F[i * d + k][j * c + l] += M[r][i][j] * N[r][k][l];
  return F;
}
function mcRank(F0) {
  const F = F0.map(r => r.slice()), m = F.length, n = m ? F[0].length : 0;
  let rank = 0;
  for (let col = 0; col < n && rank < m; col++) {
    let p = rank; for (let r = rank + 1; r < m; r++) if (Math.abs(F[r][col]) > Math.abs(F[p][col])) p = r;
    if (Math.abs(F[p][col]) < 1e-9) continue;
    [F[p], F[rank]] = [F[rank], F[p]];
    for (let r = 0; r < m; r++) if (r !== rank) { const f = F[r][col] / F[rank][col]; for (let q = col; q < n; q++) F[r][q] -= f * F[rank][q]; }
    rank++;
  }
  return rank;
}
/* the routing as drawn: input (j, l) ↦ output (i, k) through bridge r */
const MC_ROUTES = [
  { r: 0, inp: [0, 0], out: [0, 0] }, { r: 0, inp: [0, 1], out: [0, 1] }, { r: 0, inp: [1, 0], out: [1, 0] }, { r: 0, inp: [1, 1], out: [1, 1] },
  { r: 1, inp: [2, 0], out: [0, 2] }, { r: 2, inp: [2, 1], out: [1, 2] }
];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('min-cut-bridge film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(MC_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(MC_LEAN).length}`);
  for (const [short, gid] of Object.entries(MC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the cuts of (2, 3, 2, 3) */
  check(MC_A * MC_D === 6 && MC_B * MC_C === 6 && 3 * MC_A * MC_C === 12 && mcCut(MC_A, MC_B, MC_C, MC_D) === 6, 'cuts 6, 6, 12 and min 6');
  check(MC_A * MC_A + MC_B * MC_B === 13 && 3 * MC_A * MC_B === 18 && mcCone(MC_A, MC_B, MC_C, MC_D), 'cone 13 ≤ 18');

  /* 2. the routing example: built from the slices, compared with the routes drawn, rank 6 */
  const { M, N } = mcSlices(), F = mcFlow(M, N, 2, 3, 2, 3);
  let nz = 0;
  for (let row = 0; row < 6; row++) for (let col = 0; col < 6; col++) if (F[row][col] !== 0) { nz++; check(F[row][col] === 1, 'entries are 0 or 1'); }
  check(nz === 6, 'six nonzero entries');
  for (const R of MC_ROUTES) {
    check(F[R.out[0] * 3 + R.out[1]][R.inp[0] * 2 + R.inp[1]] === 1, `route ${R.inp} ↦ ${R.out}`);
    check(M[R.r][R.out[0]][R.inp[0]] * N[R.r][R.out[1]][R.inp[1]] === 1, `route ${R.inp} uses bridge ${R.r}`);
  }
  check(new Set(MC_ROUTES.map(R => R.out.join())).size === 6 && new Set(MC_ROUTES.map(R => R.inp.join())).size === 6, 'six distinct inputs and outputs');
  check(mcRank(F) === 6, 'rank 6');
  /* each bridge alone: ranks 4, 1, 1, each at most ac = 4 */
  [4, 1, 1].forEach((want, r) => check(mcRank(mcFlow([M[r]], [N[r]], 2, 3, 2, 3)) === want, `bridge ${r} alone has rank ${want}`));

  /* 3. the bound on random integer slices for all sizes up to 3 (an illustration, not the proof) */
  let s = 0;
  for (let a = 0; a <= 3; a++) for (let b = 0; b <= 3; b++) for (let c = 0; c <= 3; c++) for (let d = 0; d <= 3; d++) for (let t = 0; t < 2; t++) {
    const Mr = [0, 1, 2].map(r => Array.from({ length: a }, (_, i) => Array.from({ length: b }, (_, j) => Math.floor(5 * rnd(s + r, i * 7 + j)) - 2)));
    const Nr = [0, 1, 2].map(r => Array.from({ length: d }, (_, k) => Array.from({ length: c }, (_, l) => Math.floor(5 * rnd(s + 9 + r, k * 7 + l + 50)) - 2)));
    s += 17;
    check(mcRank(mcFlow(Mr, Nr, a, b, c, d)) <= mcCut(a, b, c, d), `rank ≤ cut at ${[a, b, c, d]}`);
  }
  /* 4. on the cone the cut is the smaller outer cut */
  for (let a = 1; a <= 30; a++) for (let b = a; b <= 3 * a; b++) for (let c = 1; c <= 12; c++) for (let d = c; d <= 3 * c; d++)
    if (mcCone(a, b, c, d)) check(mcCut(a, b, c, d) === Math.min(a * d, b * c), `cone cut ${[a, b, c, d]}`);

  /* 5. the edge example (1, 5, 1, 5): outside the cone, bridge cut 3 */
  check(!mcCone(1, 5, 1, 5) && 1 + 25 === 26 && 26 > 15 && mcCut(1, 5, 1, 5) === 3, '(1, 5, 1, 5) has cut 3');
});
Object.assign(FILM.speed, { hourglass: 0.02, bridge: 0.014, cuts: 0.016, bound: 0.014, fill: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const mcFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function mcRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
const MC_MISSING = new Set();
function mcLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!MC_MISSING.has(gid)) { MC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(o.label || r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
function mcDash(x1, y1, x2, y2, col, a, w = 3, dash = [12, 9]) {
  if (a <= 0.003) return;
  ctx.save(); ctx.setLineDash(dash); line(x1, y1, x2, y2, col, a, w); ctx.restore();
}
function mcTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('THE NARROWEST WAIST', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('LANES · BRIDGES · CUTS · RANK · ROUTING · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ---------- the bridge graph, drawn as strands ---------- */
/* node M at (mx, cy), node N at (nx, cy); legs a (up from M), b (down from M), d (up from N), c (down from N);
   three bridges between them. o.dims = [a, b, c, d]; o.hi = {a, b, c, d, bridges} highlights (0..1); o.pulse = time */
const BG = { mx: 520, nx: 940, cy: 500, node: 64, leg: 220, gap: 16 };
function bgStrands(x, y0, y1, n, col, a, w = 3) {
  for (let s = 0; s < n; s++) { const dx = (s - (n - 1) / 2) * BG.gap; line(x + dx, y0, x + dx, y1, col, a, w); }
}
function bgDraw(a, o = {}) {
  if (a <= 0.003) return;
  const [da, db, dc, dd] = o.dims || [MC_A, MC_B, MC_C, MC_D], hi = o.hi || {};
  const { mx, nx, cy, node, leg } = BG, h = node / 2;
  const col = k => mix(C.white, C.now, clamp(hi[k] || 0));
  /* bridges */
  const bw = clamp(hi.bridges || 0);
  for (let r = 0; r < 3; r++) {
    const y = cy - 22 + r * 22;
    line(mx + h, y, nx - h, y, mix(C.cyan, C.now, bw), a, 5);
    if (o.pulse != null) {
      const ph = ((o.pulse * 0.6 + r * 0.33) % 1);
      dot(lerp(mx + h, nx - h, ph), y, 7, bw > 0.5 ? 'g' : 'c', a * 0.9);
    }
  }
  /* legs */
  bgStrands(mx, cy - h, cy - h - leg, da, col('a'), a);
  bgStrands(mx, cy + h, cy + h + leg, db, col('b'), a);
  bgStrands(nx, cy - h, cy - h - leg, dd, col('d'), a);
  bgStrands(nx, cy + h, cy + h + leg, dc, col('c'), a);
  /* arrows: in at the bottom, out at the top */
  for (const x of [mx, nx]) {
    arrow(x + 70, cy + h + leg, x + 70, cy + h + 40, C.dim, a * 0.7, 2);
    arrow(x + 70, cy - h - 40, x + 70, cy - h - leg, C.dim, a * 0.7, 2);
  }
  /* nodes */
  for (const [x, s] of [[mx, 'M'], [nx, 'N']]) {
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.bg; ctx.fillRect(x - h, cy - h, node, node); ctx.restore();
    box(x - h, cy - h, node, node, C.cyan, a, 3);
    txt(s, x, cy + 14, { size: 40, fam: F.math, w: 700, align: 'center', c: C.white, a });
  }
  const lab = (s, x, y, k) => txt(s, x, y, { size: 30, fam: F.math, w: 700, align: 'center', c: col(k), a });
  lab(`a = ${da}`, mx - 92, cy - h - leg + 30, 'a'); lab(`b = ${db}`, mx - 92, cy + h + leg - 10, 'b');
  lab(`d = ${dd}`, nx + 120, cy - h - leg + 30, 'd'); lab(`c = ${dc}`, nx + 120, cy + h + leg - 10, 'c');
  txt('out · 出', (mx + nx) / 2, cy - h - leg - 12, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  txt('in · 进', (mx + nx) / 2, cy + h + leg + 36, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  txt('3 bridges · 三座桥', (mx + nx) / 2, cy + 64, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * 0.9 });
}

/* ======================================================================= */
/*                              scene 1 · THE NECK                           */
/* ======================================================================= */
const HG = { x0: 180, x1: 1740, cy: 520, lw: 26 };
/* lanes along the road: 6, ramp to 12, 12, ramp to 6 */
const hgLanes = x => {
  const f = clamp((x - 620) / 180) - clamp((x - 1120) / 180);
  return 6 + 6 * (f < 0 ? 0 : ease(f));
};
SCENES.hourglass = S => {
  const u = S.u;
  mcTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const { x0, x1, cy, lw } = HG;
  /* the road edges and lane dividers */
  const half = x => hgLanes(x) * lw / 2;
  curve(t => { const x = lerp(x0, x1, t); return [x, cy - half(x)]; }, 160, C.white, a * 0.9, 3);
  curve(t => { const x = lerp(x0, x1, t); return [x, cy + half(x)]; }, 160, C.white, a * 0.9, 3);
  ctx.save(); ctx.setLineDash([10, 12]);
  for (let k = 1; k < 12; k++) {
    const pts = [];
    for (let i = 0; i <= 160; i++) { const x = lerp(x0, x1, i / 160), n = hgLanes(x); if (k < n - 0.02) pts.push([x, cy - half(x) + k * lw]); else pts.push(null); }
    ctx.globalAlpha = a * 0.35; ctx.strokeStyle = C.dim; ctx.lineWidth = 1.2; ctx.beginPath();
    let pen = false;
    for (const p of pts) { if (!p) { pen = false; continue; } if (!pen) { ctx.moveTo(p[0], p[1]); pen = true; } else ctx.lineTo(p[0], p[1]); }
    ctx.stroke();
  }
  ctx.restore(); ctx.globalAlpha = 1;
  /* six streams of cars: side by side they spread in the middle, but there are only six abreast */
  const ca = a * Q(S, 1, 'Side by side', 0.8);
  for (let s = 0; s < 6; s++) for (let q = 0; q < 7; q++) {
    const x = x0 + ((S.t * 130 + q * 230 + s * 37) % (x1 - x0));
    const y = cy + (s - 2.5) * (half(x) * 2 / 6);
    dot(x, y, 9, 'g', ca * clamp((x - x0) / 60) * clamp((x1 - x) / 60));
  }
  /* lane counts */
  const counts = [[380, 6, 'six in · 进来六条'], [960, 12, 'twelve · 中间十二条'], [1540, 6, 'six out · 出去六条']];
  counts.forEach(([x, n, s], i) => {
    const ka = a * at(S, 0, 0.5, 0.9 * i);
    const narrow = n === 6 ? Q(S, 1, 'narrowest stretch', 0.6) : 0;
    chip(x, cy - half(x) - 60, 300, 48, s, n === 6 && narrow > 0.5 ? C.mag : C.cyan, ka, 22, F.zh);
  });
  txt('analogy · 比方：车道数 ≈ 维数（各腿维数相乘），并排的车 = 独立信号', W / 2, 820, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * at(S, 1, 0.6, 1.2) });
  const na = a * at(S, 2, 0.6);
  if (na > 0.003) txt('tensor networks have necks too · 张量网络也有窄处', W / 2, 250, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: na });
};

/* ======================================================================= */
/*                            scene 2 · THE BRIDGE GRAPH                     */
/* ======================================================================= */
SCENES.bridge = S => {
  const a = mcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const legIn = Q(S, 0, 'enter on legs', 0.6), legOut = Q(S, 0, 'leave on a', 0.6);
  bgDraw(a, { hi: { b: legIn * (1 - legOut), c: legIn * (1 - legOut), a: legOut * (1 - at(S, 1, 0.5)), d: legOut * (1 - at(S, 1, 0.5)) }, pulse: S.t });
  /* the matrix */
  const ma = a * at(S, 1, 0.6);
  if (ma > 0.003) {
    panel(1180, 220, 640, 300, ma, C.cyan, 'ONE MATRIX · 一个矩阵');
    mcRich([['flow(M, N) = ', C.white], ['Σ', C.cyan], ['ᵣ M', C.white], ['ᵣ', C.white], [' ⊗ ', C.cyan], ['Nᵣ', C.white]], 1210, 300, { size: 34, a: ma });
    txt('r = 0, 1, 2 · one term per bridge · 每座桥一项', 1210, 350, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ma });
    mcRich([['rows · 行  a·d = ', C.white], ['6', C.cyan]], 1210, 412, { size: 28, a: ma, fam: F.zh });
    mcRich([['columns · 列  b·c = ', C.white], ['6', C.cyan]], 1210, 462, { size: 28, a: ma, fam: F.zh });
  }
  const ra = a * at(S, 2, 0.6);
  if (ra > 0.003) {
    panel(1180, 560, 640, 230, ra, C.now, 'RANK · 秩');
    txt('rank = independent signals · 独立信号的路数', 1210, 632, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra });
    mcRich([['QMaxFlow(a, b, c, d)', C.now], [' = best rank · 最大秩', C.white]], 1210, 694, { size: 28, a: ra * Q(S, 2, 'max flow', 0.5), fam: F.zh });
    txt('over all choices of M, N · 遍历所有 M、N', 1210, 744, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra * Q(S, 2, 'max flow', 0.5) });
  }
};

/* ======================================================================= */
/*                              scene 3 · THREE CUTS                         */
/* ======================================================================= */
/* the sweeping cut: 0 exits, 1 entrances, 2 bridges */
function cuGeom(k) {
  const { mx, nx, cy, node, leg } = BG, h = node / 2;
  if (k === 0) return [[mx - 150, cy - h - leg / 2], [nx + 150, cy - h - leg / 2]];
  if (k === 1) return [[mx - 150, cy + h + leg / 2], [nx + 150, cy + h + leg / 2]];
  /* slantwise: through leg a above M, the three bridges, and leg c below N (M on the input side, N on the output side) */
  return [[mx - 120, cy - h - 110], [nx + 120, cy + h + 110]];
}
SCENES.cuts = S => {
  const a = mcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [4, null, 'argued']]);
  const ex = Q(S, 1, 'Cut the exits', 0.5), en = Q(S, 1, 'Cut the entrances', 0.5), br = Q(S, 2, 'Cut slantwise', 0.5);
  const cur = br > 0 ? 2 : en > 0 ? 1 : ex > 0 ? 0 : -1;
  const fin = at(S, 3, 0.6), on = 1 - fin;
  bgDraw(a * at(S, 0, 0.5), { hi: { a: (cur === 0 || cur === 2) ? on : 0, d: cur === 0 ? on : 0, b: cur === 1 ? on : 0, c: (cur === 1 || cur === 2) ? on : 0, bridges: cur === 2 ? on : 0 } });
  [ex, en, br].forEach((p, k) => {
    if (p <= 0.003) return;
    const [P0, P1] = cuGeom(k);
    const minimal = k < 2;
    const col = k === cur && fin < 0.5 ? C.now : minimal ? C.mag : C.dim;
    mcDash(P0[0], P0[1], lerp(P0[0], P1[0], ease(p)), lerp(P0[1], P1[1], ease(p)), col, a, 4);
  });
  /* the ledger of cuts */
  panel(1180, 200, 640, 470, a, C.cyan, 'THE CUTS · 三道割');
  const rows = [
    [ex, 'exits · 出口', 'a·d = 2 × 3 = ', '6', true],
    [en, 'entrances · 入口', 'b·c = 3 × 2 = ', '6', true],
    [br, 'leg a, bridges, leg c · 腿 a、三座桥、腿 c', '3·a·c = 3 × 2 × 2 = ', '12', false]
  ];
  rows.forEach(([p, nm, f, v, minimal], i) => {
    const ra = a * p;
    if (ra <= 0.003) return;
    const y = 280 + i * 92, col = minimal ? (fin > 0.5 ? C.mag : C.white) : (fin > 0.5 ? C.dim : C.white);
    txt(nm, 1210, y, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
    mcRich([[f, col], [v, minimal ? C.mag : col]], 1210, y + 40, { size: 30, a: ra });
    fillBox(1640, y + 12, 140 * Number(v) / 12, 28, minimal ? C.mag : C.dim, ra * 0.6);
  });
  const fa = a * fin;
  if (fa > 0.003) {
    line(1210, 562, 1790, 562, C.cyan, fa * 0.5, 1);
    mcRich([['QMinCut = min(12, 6, 6) = ', C.white], ['6', C.mag]], 1210, 604, { size: 30, a: fa });
  }
  txt('dimensions multiply, not add: 2 × 3, not 2 + 3 · 维数相乘，不相加', 1210, 648, { size: 19, fam: F.zh, w: 700, c: C.cyan, a: a * ex });
  stamp('NECK = 6', 730, 270, Q(S, 3, 'narrowest cut', 0.5, 0.2) * (1 - at(S, 4, 0.5, 1.0)), C.mag, 40, -0.06);
  const ia = a * at(S, 4, 0.6);
  if (ia > 0.003) {
    panel(1180, 690, 640, 120, ia, C.argued);
    txt('the neck decides, not the middle', 1210, 738, { size: 30, fam: F.disp, w: 700, c: C.argued, a: ia });
    txt('说了算的是腰，不是肚子', 1210, 786, { size: 26, fam: F.zh, w: 700, c: C.white, a: ia });
  }
};

/* ======================================================================= */
/*                              scene 4 · NEVER WIDER                        */
/* ======================================================================= */
SCENES.bound = S => {
  const a = mcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean']]);
  const la = a * Q(S, 0, 'Lean checks', 0.6);
  panel(200, 220, 1520, 280, a, C.lean, 'FOR ALL a, b, c, d ∈ ℕ · 一切自然数，含零');
  mcRich([['QMaxFlow(a, b, c, d)', C.white], ['  ≤  ', C.lean], ['QMinCut(a, b, c, d) = min(3ac, min(ad, bc))', C.mag]], 960, 340, { size: 36, a: la, align: 'center' });
  mcLean(240, 440, MC_LEAN.QMaxFlow_le_QMinCut, la, { size: 20 });
  /* the meter: a rank bar trying to rise past the lid at 6 */
  const ma = a * at(S, 1, 0.6);
  const bx = 560, by = 760, bh = 34, unit = 70;
  txt('rank of flow(M, N) at (2, 3, 2, 3) · 秩', bx, by - 120, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a });
  for (let k = 0; k <= 12; k++) { line(bx + k * unit, by - 70, bx + k * unit, by - 62, C.dim, a * 0.6, 1.5); if (k % 2 === 0) txt(String(k), bx + k * unit, by - 78, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a }); }
  const push = 6 * (0.5 + 0.5 * Math.min(1, ease(at(S, 1, 1.6)) + 0.0)) + 0.35 * Math.sin(S.u * 5) * ma;
  const val = Math.min(6, push);
  fillBox(bx, by - 50, unit * val, bh, C.now, a * 0.7);
  box(bx, by - 50, unit * 12, bh, C.dim, a * 0.5, 1.2);
  line(bx + 6 * unit, by - 70, bx + 6 * unit, by + 4, C.mag, a, 5);
  txt('min cut 6 · 最小割', bx + 6 * unit + 14, by + 30, { size: 22, fam: F.zh, w: 700, c: C.mag, a });
  txt('bridges 12 · 桥', bx + 12 * unit, by + 30, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  if (ma > 0.003) txt('no choice of matrices passes the lid · 怎么挑矩阵都过不去', W / 2, 840, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: ma });
  stamp('MAX FLOW ≤ MIN CUT', 1380, 568, Q(S, 0, 'never exceeds', 0.5, 0.2), C.lean, 30, -0.06);
};

/* ======================================================================= */
/*                            scene 5 · FILLING THE NECK                     */
/* ======================================================================= */
const FL = { x0: 260, x1: 1060, yIn: 760, yOut: 280, yChip: [470, 520, 570] };
/* screen slots: bridge 0 runs straight up slots 0–3, bridges 1 and 2 straight up slots 4 and 5 */
const FL_IN_SLOT = { '0,0': 0, '0,1': 1, '1,0': 2, '1,1': 3, '2,0': 4, '2,1': 5 };
const FL_OUT_SLOT = { '0,0': 0, '0,1': 1, '1,0': 2, '1,1': 3, '0,2': 4, '1,2': 5 };
/* inputs (j, l) in Fin 3 × Fin 2 along the bottom; outputs (i, k) in Fin 2 × Fin 3 along the top */
const flIn = ([j, l]) => [FL.x0 + FL_IN_SLOT[`${j},${l}`] * (FL.x1 - FL.x0) / 5, FL.yIn];
const flOut = ([i, k]) => [FL.x0 + FL_OUT_SLOT[`${i},${k}`] * (FL.x1 - FL.x0) / 5, FL.yOut];
const FL_COL = r => (r === 0 ? C.cyan : C.white);
function flPath(R, p) {
  const P0 = flIn(R.inp), P2 = flOut(R.out), mid = [(P0[0] + P2[0]) / 2, FL.yChip[R.r]];
  const q = p < 0.5 ? [lerp(P0[0], mid[0], p * 2), lerp(P0[1], mid[1], p * 2)] : [lerp(mid[0], P2[0], (p - 0.5) * 2), lerp(mid[1], P2[1], (p - 0.5) * 2)];
  return { P0, mid, P2, q };
}
SCENES.fill = S => {
  const a = mcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [6, null, 'computed'], [7, null, 'argued']]);
  /* the lower half of the scene: routing, fading back as the theorem enters */
  const back = 1 - at(S, 3, 0.8);
  const ra = a * back, gone = 1 - at(S, 3, 0.5);
  /* bridge rails */
  for (const R of MC_ROUTES) {
    const P = flIn(R.inp); dot(P[0], P[1], 12, 'w', ra);
    txt(`(${R.inp[0]},${R.inp[1]})`, P[0], P[1] + 44, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
  }
  const outsHit = new Set();
  const t1 = phraseAt(S, 1, 'Bridge zero'), t2 = phraseAt(S, 1, 'Bridges one and two');
  MC_ROUTES.forEach((R, idx) => {
    const st = R.r === 0 ? t1 + 0.25 * idx : t2 + 0.6 * (R.r - 1);
    const p = clamp((S.u - st) / 1.4);
    if (p <= 0) return;
    const G = flPath(R, ease(p)), live = p < 1;
    const col = live ? C.now : FL_COL(R.r);
    ctx.save(); ctx.globalAlpha = ra; ctx.strokeStyle = col; ctx.lineWidth = live ? 4 : 3; ctx.beginPath();
    ctx.moveTo(G.P0[0], G.P0[1]);
    const e = ease(p);
    if (e < 0.5) ctx.lineTo(G.q[0], G.q[1]); else { ctx.lineTo(G.mid[0], G.mid[1]); ctx.lineTo(G.q[0], G.q[1]); }
    ctx.stroke(); ctx.restore();
    dot(G.q[0], G.q[1], 9, live ? 'g' : (R.r === 0 ? 'c' : 'w'), ra);
    if (e >= 0.5) chip(G.mid[0], G.mid[1], 92, 36, `r = ${R.r}`, FL_COL(R.r), ra, 20);
    if (p >= 1) outsHit.add(R.out.join());
  });
  for (let i = 0; i < 2; i++) for (let k = 0; k < 3; k++) {
    const P = flOut([i, k]), hit = outsHit.has(`${i},${k}`);
    ring(P[0], P[1], 16, hit ? C.cyan : C.dim, ra, 2.5);
    if (hit) dot(P[0], P[1], 11, 'c', ra);
    txt(`(${i},${k})`, P[0], P[1] - 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
  }
  txt('inputs (j, l) · 输入', FL.x0 - 40, FL.yIn + 90, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  txt('outputs (i, k) · 输出', FL.x0 - 40, FL.yOut - 70, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra });
  txt('r = the bridge it crosses · 经过的桥', FL.x0 + 380, FL.yIn + 90, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ra * at(S, 1, 0.6) });
  /* the counter */
  const ca = a * at(S, 0, 0.6);
  panel(1260, 200, 560, 230, ca * gone, C.cyan, 'RANK · 秩  (2, 3, 2, 3)');
  mcRich([['distinct outputs · 不同输出  ', C.white], [`${outsHit.size}`, C.cyan], [' / 6', C.white]], 1290, 280, { size: 28, a: ca * gone, fam: F.zh });
  mcRich([['bridges alone · 单桥  4, 1, 1', C.dim]], 1290, 330, { size: 22, a: ca * gone * at(S, 1, 0.6, 2.4), fam: F.zh });
  mcRich([['rank = ', C.white], ['6', C.cyan], [' = min cut', C.mag]], 1290, 392, { size: 30, a: ca * gone * Q(S, 2, 'Rank six', 0.5) });
  stamp('FULL', 660, 640, Q(S, 2, 'the neck is full', 0.5) * (1 - at(S, 3, 0.4)), C.cyan, 56, -0.06);
  /* the theorem */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 200, 820, 540, la, C.lean, 'EQUALITY IN THE CONE · 锥内取等');
    mcRich([['0 < a ≤ b,   0 < c ≤ d', C.white]], 1030, 280, { size: 30, a: la });
    const ca2 = la * Q(S, 4, 'sits in a cone', 0.5);
    mcRich([['a² + b² ≤ 3ab,   c² + d² ≤ 3cd', C.white]], 1030, 336, { size: 30, a: ca2 });
    line(1030, 368, 1790, 368, C.lean, la * 0.5, 1);
    const ea = la * at(S, 5, 0.5);
    mcRich([['⟹  QMaxFlow = QMinCut', C.lean]], 1030, 420, { size: 32, a: ea });
    mcRich([['     QMinCut = min(ad, bc)', C.lean]], 1030, 470, { size: 32, a: ea });
    mcLean(1030, 532, MC_LEAN.result, la, { size: 20, label: 'QuantumMaxFlowMinCut.result' });
    const na = la * at(S, 6, 0.5);
    if (na > 0.003) {
      line(1030, 568, 1790, 568, C.cyan, na * 0.5, 1);
      mcRich([['here · 这里  2² + 3² = ', C.white], ['13', C.cyan], [' ≤ 3·2·3 = ', C.white], ['18', C.cyan]], 1030, 616, { size: 28, a: na, fam: F.zh });
      mcRich([['QMaxFlow(2, 3, 2, 3) = ', C.white], ['6', C.cyan]], 1030, 672, { size: 30, a: na });
      txt('NUM · 屏幕上的计算', 1030, 714, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: na * 0.9 });
    }
  }
  const qa = a * Q(S, 7, 'Inside the cone', 0.6);
  if (qa > 0.003) {
    panel(200, 760, 1420, 76, qa, C.argued);
    txt('inside the cone, this graph carries what its narrowest waist allows · 在锥里，这张图能过多少由最窄的腰说了算', 228, 808, { size: 26, fam: F.zh, w: 700, c: C.argued, a: qa });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = mcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: '(1, 5, 1, 5): cuts 5, 5, 3', zh: '出了锥（1 + 25 = 26 > 15），三座桥本身成了瓶颈', note: 'the theorem claims no equality here · 这里定理不说相等' },
    { k: 1, col: C.argued, en: 'rank ≠ even load', zh: '秩只数路数，不管分得是否均匀', note: 'flat entanglement needs more than rank (19.4) · 纠缠熵拉满要的更多' },
    { k: 2, col: C.argued, en: 'general networks: flow < cut possible', zh: '一般张量网络：最大流可能小于最小割', note: 'literature result (19.1), not formalized here · 文献结果，本书未形式化' },
    { k: 3, col: C.argued, en: 'Ryu–Takayanagi: S(A) = Area(γ_A) / 4G_N', zh: '熵 = 极小曲面的面积', note: 'literature result, not derived here · 文献结果，本片未推出' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 160;
    panel(200, y, 1520, 140, ra, rw.col);
    txt(rw.en, 230, y + 52, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 1000, y + 52, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 230, y + 108, { size: 22, fam: F.zh, w: 700, c: rw.col === C.argued ? C.argued : C.dim, a: ra * 0.95 });
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
  const sc = TL.scenes[2], t = sc.end - 1.0;
  background(t, sc, 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  bgDraw(1, { pulse: t });
  for (const k of [0, 1]) { const [P0, P1] = cuGeom(k); mcDash(P0[0], P0[1], P1[0], P1[1], C.mag, 1, 4); }
  const [B0, B1] = cuGeom(2); mcDash(B0[0], B0[1], B1[0], B1[1], C.dim, 1, 4);
  txt(DATA.film.title_zh, 1440, 420, { size: 96, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('THE NARROWEST', 1440, 520, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('WAIST', 1440, 582, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 5 });
  mcRich([['max flow ', C.cyan], ['≤', C.white], [' min cut', C.mag]], 1440, 680, { size: 44, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1440, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
