/* Film · Every Square Flat, the Loop Still Flips · 每格都平，绕一圈却翻了
   (book quantum-geometry, chapter 33, §33.8.4). Scenes for theme/film/engine.js.

   Notation of the chapter: an edge label y on the M × N periodic grid is two families of bits y.h(i, j), y.v(i, j);
   y.h(i, j) is the edge from vertex (i, j) to (i, j + 1), y.v(i, j) the edge from (i, j) to (i + 1, j), indices mod M, N.
   plaquette(y, i, j) = h(i, j) + v(i, j + 1) + h(i + 1, j) + v(i, j) (mod 2); Flat: every plaquette is 0;
   gradient(x) of a vertex label x: h(i, j) = x(i, j + 1) + x(i, j), v(i, j) = x(i + 1, j) + x(i, j);
   seam(h, v): h on the horizontal edges with j = N − 1, v on the vertical edges with i = M − 1, 0 elsewhere.

   What each scene shows, and where it rests:
     torus   a 6 × 12 grid on a lit torus (solid shot) with seam(1, 0) in magenta; every square lights up flat and an
             amber walker along one row crosses the seam once (computed).
     paint   one square with painted corners: the gradient bits, an even number of colour changes, flat (computed);
             the question "flat ⇒ painted?" is asked, not answered.
     seam    the 3 × 3 torus drawn as a square with a ghost row and column; seam(1, 0) is flat, and painting row 0 from
             black runs into white at home (computed); the parking-garage ramp is an analogy (argued).
     test    the torus again with row loop 0 and column loop 0 in amber
             ..... PeriodicGridHolonomy.flat_exact_iff, PeriodicGridHolonomy.horizontal_seam_counterexample (LEAN).
     count   on the 3 × 3 torus: 2^18 = 262144 labels, 1024 flat, 256 gradients, four seam classes of 256 each
             (counted here by brute force, computed); the ratios for every M, N
             ..... PeriodicGridHolonomy.periodic_grid_linear_statistics (LEAN); the only plaquette relation is the
             constant one ..... PeriodicGridHolonomy.plaquette_relation_rank_one (LEAN).
     edge    the lattice-gauge dictionary (bits = links, flat = zero action, gradient = pure gauge) is the chapter's
             reading (argued); the four-dimensional area law and mass gap are open (prob-ch39-four-dimensional-area-law-
             and-mass-gap, OPEN).

   On load, FILM.init checks DATA.lean against the four theorems and recounts every number on screen: it enumerates
   all 2^18 edge labels of the 3 × 3 torus and all 2^9 vertex labels, and checks the seam on grids up to 6 × 12.
   Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const FN_LEAN = {
  flat_exact_iff: 'D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.flat_exact_iff',
  horizontal_seam_counterexample: 'D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.horizontal_seam_counterexample',
  periodic_grid_linear_statistics: 'D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.periodic_grid_linear_statistics',
  plaquette_relation_rank_one: 'D5/S3/Fourier/CharacterSelection/PeriodicGridHolonomy.plaquette_relation_rank_one'
};
/* labels as { M, N, h: [[…]], v: [[…]] } with bits 0/1 */
const fnZero = (M, N) => ({ M, N, h: Array.from({ length: M }, () => Array(N).fill(0)), v: Array.from({ length: M }, () => Array(N).fill(0)) });
const fnSeam = (M, N, hb, vb) => {
  const y = fnZero(M, N);
  for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) { y.h[i][j] = j === N - 1 ? hb : 0; y.v[i][j] = i === M - 1 ? vb : 0; }
  return y;
};
const fnPlq = (y, i, j) => (y.h[i][j] + y.v[i][(j + 1) % y.N] + y.h[(i + 1) % y.M][j] + y.v[i][j]) & 1;
const fnFlat = y => { for (let i = 0; i < y.M; i++) for (let j = 0; j < y.N; j++) if (fnPlq(y, i, j)) return false; return true; };
const fnRow = (y, i) => y.h[i].reduce((s, b) => s ^ b, 0);
const fnCol = (y, j) => y.v.reduce((s, r) => s ^ r[j], 0);
const fnGrad = x => {
  const M = x.length, N = x[0].length, y = fnZero(M, N);
  for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) { y.h[i][j] = x[i][(j + 1) % N] ^ x[i][j]; y.v[i][j] = x[(i + 1) % M][j] ^ x[i][j]; }
  return y;
};
/* the counts on screen (3 × 3 torus) */
const FN_COUNT = { all: 262144, flat: 1024, exact: 256, cls: 256 };
const FN_SEAM3 = fnSeam(3, 3, 1, 0);
/* the painting of scene paint: corners TL, TR, BR, BL (0 black, 1 white) */
const FN_SQ = [0, 1, 1, 0];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('flat-not-exact film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(FN_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(FN_LEAN).length}`);
  for (const [short, gid] of Object.entries(FN_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. brute force on the 3 × 3 torus: every edge label as an 18-bit word (bits 0..8 horizontal, 9..17 vertical) */
  const M = 3, N = 3, n = M * N;
  const exact = new Set();
  for (let w = 0; w < (1 << n); w++) {
    const x = Array.from({ length: M }, (_, i) => Array.from({ length: N }, (_, j) => (w >> (i * N + j)) & 1));
    const y = fnGrad(x);
    let code = 0;
    for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) { code |= y.h[i][j] << (i * N + j); code |= y.v[i][j] << (n + i * N + j); }
    exact.add(code);
  }
  let all = 0, flat = 0, exactFlat = 0;
  const cls = [0, 0, 0, 0];
  const y = fnZero(M, N);
  for (let code = 0; code < (1 << (2 * n)); code++) {
    all++;
    for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) { y.h[i][j] = (code >> (i * N + j)) & 1; y.v[i][j] = (code >> (n + i * N + j)) & 1; }
    /* the relation: the sum of all plaquettes is zero for every label */
    let tot = 0; for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) tot ^= fnPlq(y, i, j);
    if (tot) fail(`plaquette sum ${code}`);
    if (!fnFlat(y)) { if (exact.has(code)) fail(`gradient not flat ${code}`); continue; }
    flat++;
    const r = fnRow(y, 0), c = fnCol(y, 0);
    cls[r + 2 * c]++;
    const isExact = exact.has(code);
    if (isExact) exactFlat++;
    if (isExact !== (r === 0 && c === 0)) fail(`flat_exact_iff on 3 × 3 fails at ${code}`);
  }
  check(all === FN_COUNT.all && all === Math.pow(2, 18), 'all labels: 262144');
  check(flat === FN_COUNT.flat && flat === Math.pow(2, n + 1), 'flat labels: 1024');
  check(exact.size === FN_COUNT.exact && exactFlat === exact.size && exact.size === Math.pow(2, n - 1), 'gradients: 256');
  check(cls.every(k => k === FN_COUNT.cls), `four classes of 256: ${cls}`);
  check(exact.size * 4 === flat && flat * 256 === all && exact.size * 1024 === all, 'ratios 1/4, 1/2^(MN−1), 1/2^(MN+1) at 3 × 3');
  /* 2. the only plaquette relation is the constant one (3 × 3): a coefficient pattern kills every plaquette vector
        exactly when it is constant; test all 2^9 patterns against the unit labels */
  let relations = 0;
  for (let w = 0; w < (1 << n); w++) {
    const co = (i, j) => (w >> (i * N + j)) & 1;
    let ok = true;
    for (let e = 0; e < 2 * n && ok; e++) {
      const u = fnZero(M, N); const k = e % n, i0 = Math.floor(k / N), j0 = k % N;
      if (e < n) u.h[i0][j0] = 1; else u.v[i0][j0] = 1;
      let s = 0; for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) s ^= co(i, j) & fnPlq(u, i, j);
      if (s) ok = false;
    }
    if (ok) { relations++; const c0 = co(0, 0); for (let i = 0; i < M; i++) for (let j = 0; j < N; j++) if (co(i, j) !== c0) fail(`non-constant relation ${w}`); }
  }
  check(relations === 2, `relations: ${relations}, expected 2 (zero and all-ones)`);
  /* 3. the seam on every grid from 3 × 3 to 6 × 12: flat, row 1, column 0 */
  for (let a = 3; a <= 6; a++) for (let b = 3; b <= 12; b++) {
    const s = fnSeam(a, b, 1, 0);
    check(fnFlat(s) && fnRow(s, 0) === 1 && fnCol(s, 0) === 0, `seam on ${a} × ${b}`);
    for (let i = 0; i < a; i++) check(fnRow(s, i) === 1, `every row of the seam adds to 1 (${a} × ${b})`);
  }
  check(fnFlat(FN_SEAM3) && fnRow(FN_SEAM3, 0) === 1, 'the 3 × 3 seam');
  /* 4. the painted square: edges TL–TR, TR–BR, BR–BL, BL–TL */
  const sq = [0, 1, 2, 3].map(k => FN_SQ[k] ^ FN_SQ[(k + 1) % 4]);
  check(sq.join('') === '1010' && sq.reduce((s, b) => s ^ b, 0) === 0, 'the painted square: bits 1, 0, 1, 0');
});
Object.assign(FILM.speed, { torus: 0.018, paint: 0.014, seam: 0.014, test: 0.016, count: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fnFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const fnFmt = k => String(k).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function fnRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
  for (const [s, col, f] of parts) { txt(s, cx, y, { size, fam: f || fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, f || fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const FN_MISSING = new Set();
function fnLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!FN_MISSING.has(gid)) { FN_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a painted vertex: 0 black (dark disc, white rim), 1 white */
function fnVertex(x, y, colr, a, r = 17) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
  ctx.fillStyle = colr === 1 ? C.white : colr === 0 ? '#05070c' : 'rgba(0,0,0,0)'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = colr == null ? C.dim : C.white; ctx.stroke();
  ctx.restore();
}
/* an edge carrying a bit: 1 magenta and thick, 0 cyan and thin */
function fnEdge(p, q, bit, a, o = {}) {
  if (a <= 0.003) return;
  const col = bit ? C.mag : C.cyan, w = bit ? 8 : 3.5;
  if (o.ghost) { ctx.save(); ctx.setLineDash([12, 10]); line(p[0], p[1], q[0], q[1], col, a * 0.55, w); ctx.restore(); }
  else line(p[0], p[1], q[0], q[1], col, a * (bit ? 1 : 0.75), w);
  if (o.label && (bit || !o.onesOnly)) {
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2, horiz = Math.abs(q[1] - p[1]) < 1;
    const lx = mx + (horiz ? 0 : 22), ly = my + (horiz ? -14 : 9);
    txt(String(bit), lx, ly, { size: o.size || 26, fam: F.mono, w: 700, align: horiz ? 'center' : 'left', c: col, a: a * (o.ghost ? 0.6 : 1) });
  }
}
/* the 3 × 3 torus as a square: vertices (i, j), 0 ≤ i, j ≤ 3, row 3 and column 3 are ghost copies of row 0 and column 0.
   o: paint (3 × 3 vertex colours or null), plq (alpha of the plaquette readouts), labels (edge bits), hl (set of edge
   keys 'h:i:j' / 'v:i:j' drawn amber) */
function fnTorus3(G, y, a, o = {}) {
  if (a <= 0.003) return;
  const P = (i, j) => [G.x + j * G.s, G.y + i * G.s];
  /* plaquette readouts */
  const pa = a * (o.plq || 0);
  if (pa > 0.003) for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    const v = fnPlq(y, i, j), c = P(i + 0.5, j + 0.5);
    fillBox(c[0] - G.s / 2 + 6, c[1] - G.s / 2 + 6, G.s - 12, G.s - 12, v ? C.mag : C.cyan, pa * (o.plqHi && o.plqHi(i, j) ? 0.28 : 0.1));
    txt(v ? '1' : '0', c[0], c[1] + 12, { size: 34, fam: F.mono, w: 700, align: 'center', c: v ? C.mag : C.cyan, a: pa * 0.9 });
  }
  for (let i = 0; i <= 3; i++) for (let j = 0; j < 3; j++) {
    fnEdge(P(i, j), P(i, j + 1), y.h[i % 3][j], a, { ghost: i === 3, label: o.labels && i < 3, onesOnly: true });
  }
  for (let i = 0; i < 3; i++) for (let j = 0; j <= 3; j++) fnEdge(P(i, j), P(i + 1, j), y.v[i][j % 3], a, { ghost: j === 3, label: o.labels && j < 3, onesOnly: true });
  for (let i = 0; i <= 3; i++) for (let j = 0; j <= 3; j++) {
    const ghost = i === 3 || j === 3, c = P(i, j);
    const colr = o.paint ? o.paint[i % 3][j % 3] : null;
    fnVertex(c[0], c[1], colr, a * (ghost ? 0.45 : 1), ghost ? 13 : 16);
  }
  /* glue notes */
  const na = a * (o.notes == null ? 1 : o.notes);
  txt('= column 0', P(0, 3)[0] + 28, P(0, 3)[1] - 26, { size: 22, fam: F.mono, w: 700, c: C.dim, a: na });
  txt('即第 0 列', P(0, 3)[0] + 28, P(0, 3)[1] + 2, { size: 22, fam: F.zh, w: 700, c: C.dim, a: na });
  txt('= row 0 · 即第 0 行', P(3, 0)[0] - 10, P(3, 0)[1] + 50, { size: 22, fam: F.zh, w: 700, c: C.dim, a: na });
}

/* the torus of the solid shots: R = 1, r = 0.45; u around the hole (the j direction), v around the tube (i) */
const TR_R = 1, TR_r = 0.45, TR_M = 6, TR_N = 12;
let TR_OFF = 0;   // turns the grid about the axis of the torus so that the seam faces the viewer (set per shot)
const trPt = (u, v, lift = 0) => { const rr = TR_r + lift, c = TR_R + rr * Math.cos(TAU * v), w = TAU * (u + TR_OFF); return [c * Math.cos(w), c * Math.sin(w), rr * Math.sin(TAU * v)]; };
/* put the middle of the seam (u = (N − ½)/N) at the point of the outer equator nearest the viewer, plus `shift` */
function trFace(sh, shift = 0) {
  let best = 0, by = -Infinity;
  for (let k = 0; k < 96; k++) { const w = TAU * k / 96, q = sh.p([(TR_R + TR_r) * Math.cos(w), (TR_R + TR_r) * Math.sin(w), 0]); if (q[1] > by) { by = q[1]; best = k / 96; } }
  TR_OFF = best - (TR_N - 0.5) / TR_N + shift;
}
function trSurface(sh, o = {}) {
  sh.surface('torus', (u, v) => trPt(u, v), { u: [0, 1], v: [0, 1], nu: TR_N * 6, nv: TR_M * 6, color: C.blue, back: C.bg,
    grid: { every: [6, 6], color: C.cyan, alpha: o.gridA == null ? 0.75 : o.gridA } });
}
/* the seam: the horizontal edges with j = N − 1, one per row i, as magenta tubes */
function trSeam(sh, a) {
  if (a <= 0.003) return;
  for (let i = 0; i < TR_M; i++) {
    const pts = []; for (let k = 0; k <= 8; k++) pts.push(trPt((TR_N - 1 + k / 8) / TR_N, i / TR_M, 0.012));
    sh.tube('seam' + i, pts, { color: C.mag, width: 7, alpha: a, glow: 0.45 });
  }
}
/* a loop of the grid, from parameter 0 to s: kind 'row' (v fixed) or 'col' (u fixed) */
function trLoop(sh, key, kind, idx, s, col, a, w = 6) {
  if (a <= 0.003 || s <= 0.002) return;
  const pts = [], n = Math.max(2, Math.ceil(96 * s));
  for (let k = 0; k <= n; k++) { const t = s * k / n; pts.push(kind === 'row' ? trPt(t, idx / TR_M, 0.02) : trPt(idx / TR_N, t, 0.02)); }
  sh.tube(key, pts, { color: col, width: w, alpha: a, glow: 0.5 });
}

/* opening title */
function fnTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('EVERY SQUARE FLAT, THE LOOP STILL FLIPS', p, 5), W / 2, 580, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('DOUGHNUT · CORNERS · SEAM · TWO LOOPS · ONE IN FOUR · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                             scene 1 · THE DOUGHNUT                        */
/* ======================================================================= */
const TO_WALK_I = 1;   // the row the walker follows: v = 1/6, on the upper outer side
SCENES.torus = S => {
  const u = S.u, a = fnFade(S);
  fnTitle(S);
  const sa = a * at(S, 0, 1.0);
  if (sa <= 0.003) return;
  badgeQ(S, [[0, null, 'computed']]);
  const seamA = Q(S, 1, 'one means flip', 0.6);
  const sweep = Q(S, 2, 'Every small square', 2.4);
  const walk = ease(Q(S, 2, 'walk once', 1.8));
  const sh = solid('torus', { x: 160, y: 150, w: 1100, h: 700, yaw: -0.9, pitch: 0.62, zoom: 1.12 });
  trFace(sh, 0.03 - 0.01 * u);
  sh.begin();
  trSurface(sh);
  trSeam(sh, seamA);
  /* the squares light up one after another, the seam column included */
  if (sweep > 0) for (let i = 0; i < TR_M; i++) for (let j = 0; j < TR_N; j++) {
    const k = (j * TR_M + i) / (TR_M * TR_N), on = clamp((sweep - k) * 6);
    if (on <= 0.01) continue;
    const q = [[i, j], [i, j + 1], [i + 1, j + 1], [i + 1, j]].map(([ii, jj]) => trPt(jj / TR_N, ii / TR_M, 0.006));
    sh.fan(q, { fill: C.cyan, alpha: 0.2 * on * (1 - 0.5 * walk) });
  }
  trLoop(sh, 'walk', 'row', TO_WALK_I, walk, C.now, a, 6);
  const bp = trPt(walk, TO_WALK_I / TR_M, 0.03);
  if (Q(S, 2, 'walk once', 0.4) > 0) sh.bead(bp, { color: C.now, r: 11 });
  sh.end(sa);
  /* readouts */
  const ka = a * at(S, 1, 0.6);
  panel(1290, 230, 500, 240, ka, C.cyan, 'ONE BIT PER EDGE · 每条边一个比特');
  txt('0', 1330, 330, { size: 52, fam: F.mono, w: 700, c: C.cyan, a: ka });
  txt('stay · 不变', 1390, 326, { size: 30, fam: F.zh, w: 700, c: C.white, a: ka });
  txt('1', 1330, 420, { size: 52, fam: F.mono, w: 700, c: C.mag, a: ka * clamp(seamA * 2) });
  txt('flip · 翻转', 1390, 416, { size: 30, fam: F.zh, w: 700, c: C.white, a: ka * clamp(seamA * 2) });
  const fa = a * Q(S, 2, 'Every small square', 0.6);
  panel(1290, 500, 500, 120, fa, C.cyan);
  txt('every square: 0 ✓', 1320, 552, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: fa });
  txt('每个方格的和都是 0', 1320, 596, { size: 26, fam: F.zh, w: 700, c: C.white, a: fa });
  const wa = a * Q(S, 2, 'walk once', 0.6);
  if (wa > 0.003) {
    const crossed = walk > (TR_N - 1) / TR_N + 0.04 / TR_N;
    panel(1290, 650, 500, 140, wa, C.now);
    txt('one lap · 绕一圈', 1320, 696, { size: 26, fam: F.zh, w: 700, c: C.now, a: wa });
    txt(`flips so far: ${crossed ? 1 : 0}`, 1320, 750, { size: 32, fam: F.mono, w: 700, c: crossed ? C.mag : C.white, a: wa });
    const an = sh.anchor(bp);
    if (walk < 0.995) chip(an.x, an.y - 46, 64, 40, crossed ? '1' : '0', crossed ? C.mag : C.now, wa * (an.hidden ? 0.4 : 1), 26);
  }
};

/* ======================================================================= */
/*                           scene 2 · PAINT THE CORNERS                     */
/* ======================================================================= */
const PA_Q = [[380, 300], [780, 300], [780, 700], [380, 700]];   // TL, TR, BR, BL
SCENES.paint = S => {
  const a = fnFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Around any square', 'argued']]);
  const pc = at(S, 0, 1.2, 1.2);
  const ea = at(S, 1, 0.8, 0.6);
  /* corners painted one after another */
  const bits = [0, 1, 2, 3].map(k => FN_SQ[k] ^ FN_SQ[(k + 1) % 4]);
  for (let k = 0; k < 4; k++) fnEdge(PA_Q[k], PA_Q[(k + 1) % 4], bits[k], a * (0.35 + 0.65 * ea), { label: ea > 0.05, size: 34 });
  for (let k = 0; k < 4; k++) fnVertex(PA_Q[k][0], PA_Q[k][1], pc > k / 4 + 0.05 ? FN_SQ[k] : null, a, 26);
  txt('black · 黑', PA_Q[0][0] - 40, PA_Q[0][1] - 48, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6, 1.4) });
  txt('white · 白', PA_Q[1][0] - 60, PA_Q[1][1] - 48, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6, 1.8) });
  /* walking around the square: the colour changes twice */
  const wk = at(S, 2, 3.4, 0.2);
  let changes = 0;
  if (wk > 0) {
    const seg = Math.min(3, Math.floor(wk * 4)), f = wk * 4 - seg;
    for (let k = 0; k < seg + (wk >= 1 ? 1 : 0) && k < 4; k++) changes += bits[k];
    const p = PA_Q[seg], q = PA_Q[(seg + 1) % 4], e = wk >= 1 ? 1 : ease(f);
    const x = lerp(p[0], q[0], e), y = lerp(p[1], q[1], e);
    for (let k = 0; k < seg; k++) line(PA_Q[k][0], PA_Q[k][1], PA_Q[k + 1][0], PA_Q[k + 1][1], C.now, a * 0.7, 3);
    line(p[0], p[1], x, y, C.now, a * 0.9, 3);
    dot(x, y, 18, 'g', a);
  }
  /* definitions */
  const d1 = a * at(S, 1, 0.6);
  panel(960, 220, 840, 150, d1, C.cyan, 'GRADIENT · 梯度');
  txt('bit = 1  ⇔  the two ends differ', 990, 300, { size: 30, fam: F.math, w: 700, c: C.cyan, a: d1 });
  txt('两端颜色不同才写 1', 990, 344, { size: 26, fam: F.zh, w: 700, c: C.white, a: d1 });
  const d2 = a * at(S, 2, 0.6);
  panel(960, 400, 840, 170, d2, C.cyan, 'FLAT · 平坦');
  fnRich([['1 + 0 + 1 + 0 = ', C.white], ['0', C.cyan], ['  (mod 2)', C.dim]], 990, 482, { size: 32, a: d2 });
  txt(`color changes so far: ${changes}`, 990, 534, { size: 26, fam: F.mono, w: 700, c: C.now, a: d2 * clamp(wk * 3) });
  const d3 = a * Q(S, 2, 'That is flat', 0.6);
  txt('every gradient is flat · 梯度一定平坦（奇偶论证）', 990, 610, { size: 28, fam: F.zh, w: 700, c: C.argued, a: d3 });
  /* the question */
  const qa = a * at(S, 3, 0.6);
  if (qa > 0.003) {
    panel(960, 650, 840, 160, qa, C.white, 'THE HABIT · 习惯');
    fnRich([['flat  ⇒  painted ', C.white], ['?', C.white]], 990, 735, { size: 40, a: qa, ab: 2 });
    txt('每格都平，就一定涂过色？', 990, 785, { size: 28, fam: F.zh, w: 700, c: C.white, a: qa * Q(S, 3, 'Why should', 0.5) });
  }
};

/* ======================================================================= */
/*                               scene 3 · ONE SEAM                          */
/* ======================================================================= */
const SE_G = { x: 250, y: 240, s: 150 };
SCENES.seam = S => {
  const a = fnFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [5, null, 'argued']]);
  const seamOn = at(S, 1, 0.6, 0.8);
  const y = seamOn > 0.5 ? FN_SEAM3 : fnZero(3, 3);
  /* the walk along row 0, painting as it goes: black, black, black, and home must be white */
  const wk = at(S, 3, 3.2, 0.8), home = at(S, 4, 0.5);
  const paint = [[null, null, null], [null, null, null], [null, null, null]];
  if (wk > 0) paint[0][0] = 0;
  if (wk > 0.34) paint[0][1] = 0;
  if (wk > 0.67) paint[0][2] = 0;
  const plqA = at(S, 2, 0.8);
  fnTorus3(SE_G, y, a, { labels: at(S, 1) > 0.2, plq: plqA * (1 - 0.6 * clamp(wk * 3)), paint, notes: 1 - clamp(wk * 3),
    plqHi: (i, j) => j === 2 && Q(S, 2, 'two ones', 0.4) > 0 });
  /* the glue arrows */
  const ga = a * at(S, 0, 0.8, 1.2);
  const P = (i, j) => [SE_G.x + j * SE_G.s, SE_G.y + i * SE_G.s];
  arrow(P(1.5, 3)[0] + 18, P(1.5, 3)[1], P(1.5, 3)[0] + 82, P(1.5, 3)[1], C.dim, ga, 2.5);
  arrow(P(3, 1.5)[0], P(3, 1.5)[1] + 18, P(3, 1.5)[0], P(3, 1.5)[1] + 72, C.dim, ga, 2.5);
  /* the walker */
  if (wk > 0) {
    const s3 = Math.min(2, Math.floor(wk * 3)), f = wk * 3 - s3, e = wk >= 1 ? 1 : ease(f);
    const p = P(0, s3), q = P(0, s3 + 1);
    const x = lerp(p[0], q[0], e), yy = lerp(p[1], q[1], e);
    for (let k = 0; k < s3; k++) line(P(0, k)[0], P(0, k)[1], P(0, k + 1)[0], P(0, k + 1)[1], C.now, a * 0.8, 4);
    line(p[0], p[1], x, yy, C.now, a, 4);
    dot(x, yy, 18, 'g', a);
    if (home > 0) {
      const h = P(0, 3);
      ring(h[0], h[1], 30 + 10 * Math.sin(S.u * 8), C.now, a * home, 4);
      fnVertex(h[0] + 70, h[1], 1, a * home, 18);
      txt('?', h[0] + 70, h[1] - 32, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * home });
    }
  }
  /* right column: the readouts */
  const r1 = a * at(S, 1, 0.6, 0.8);
  panel(1040, 200, 760, 150, r1, C.mag, 'THE SEAM · 缝');
  txt('three edges cross the glue line: 1', 1070, 280, { size: 28, fam: F.mono, w: 700, c: C.mag, a: r1 });
  txt('跨过粘合线的三条边写 1，其余为 0', 1070, 324, { size: 26, fam: F.zh, w: 700, c: C.white, a: r1 });
  const r2 = a * at(S, 2, 0.6);
  panel(1040, 370, 760, 136, r2, C.cyan, 'THE SQUARES · 方格');
  fnRich([['on the seam: 1 + 0 + 1 + 0 = ', C.white], ['0', C.cyan]], 1070, 430, { size: 26, a: r2 });
  fnRich([['others: 0 + 0 + 0 + 0 = ', C.white], ['0', C.cyan], ['   all flat ✓ 每格都平', C.cyan, F.zh]], 1070, 480, { size: 26, a: r2 });
  const r3 = a * at(S, 3, 0.6);
  if (r3 > 0.003) {
    panel(1040, 520, 760, 150, r3, C.now, 'ROW 0 · 第 0 行');
    const steps = [['stay 0', C.cyan], ['stay 0', C.cyan], ['flip 1', C.mag]];
    steps.forEach(([s, col], k) => { const ka = r3 * clamp((wk - k / 3) * 6); txt(s, 1070 + k * 200, 604, { size: 30, fam: F.mono, w: 700, c: col, a: ka }); });
    fnRich([['sum = ', C.white], ['1', C.mag], ['  ≠ 0', C.white]], 1070, 650, { size: 30, a: r3 * home });
    txt('home needs white, is black ✗', 1330, 646, { size: 24, fam: F.mono, w: 700, c: C.now, a: r3 * home });
  }
  const r4 = a * at(S, 5, 0.6);
  if (r4 > 0.003) {
    panel(1040, 690, 760, 130, r4, C.argued, 'ANALOGY · 比方');
    txt('spiral ramp: each step fine, one lap = one floor', 1070, 744, { size: 22, fam: F.mono, w: 700, c: C.argued, a: r4 });
    txt('螺旋坡道：步步都平，绕一圈换一层', 1070, 790, { size: 26, fam: F.zh, w: 700, c: C.white, a: r4 });
  }
};

/* ======================================================================= */
/*                            scene 4 · TWO LOOPS DECIDE                     */
/* ======================================================================= */
SCENES.test = S => {
  const u = S.u, a = fnFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean']]);
  const rowA = Q(S, 1, 'first row', 1.4), colA = Q(S, 1, 'first column', 1.4);
  const sh = solid('test', { x: 90, y: 170, w: 900, h: 640, yaw: -1.25, pitch: 0.7, zoom: 1.02 });
  trFace(sh, 0.06 - 0.008 * u);
  sh.begin();
  trSurface(sh, { gridA: 0.55 });
  trSeam(sh, 1);
  trLoop(sh, 'row0', 'row', 0, ease(rowA), C.now, 1, 7);
  trLoop(sh, 'col0', 'col', 0, ease(colA), C.now, 1, 7);
  sh.end(a);
  /* readouts with leader lines to the lowest visible point of each loop */
  const lowest = f => { let b = null; for (let k = 0; k < 48; k++) { const an = sh.anchor(f(k / 48)); if (!an.hidden && (!b || an.y > b.y)) b = an; } return b; };
  const ra = a * clamp((rowA - 0.3) * 3), ca = a * clamp((colA - 0.3) * 3);
  const rp = lowest(s => trPt(s, 0, 0.02)), cp = lowest(s => trPt(0, s, 0.02));
  if (rp && ra > 0.003) { dashed(rp.x, rp.y, 330, 800, C.now, ra * 0.8, 2); chip(330, 800, 300, 46, 'row 0 adds to 1', C.mag, ra, 24); }
  if (cp && ca > 0.003) { dashed(cp.x, cp.y, 820, 220, C.now, ca * 0.8, 2); chip(820, 220, 320, 46, 'column 0 adds to 0', C.cyan, ca, 24); }
  /* the theorem, in its own words */
  const t1 = a * at(S, 0, 0.7, 0.4);
  panel(1030, 190, 790, 300, t1, C.lean, 'THEOREM · 定理');
  fnLean(1060, 260, FN_LEAN.flat_exact_iff, t1, { size: 20 });
  txt('if y is flat:', 1060, 310, { size: 26, fam: F.mono, w: 700, c: C.white, a: t1 });
  fnRich([['y = gradient(x) for some x', C.lean]], 1060, 356, { size: 28, a: t1 });
  fnRich([['⇔  row 0 adds to 0 ∧ column 0 adds to 0', C.lean]], 1060, 402, { size: 28, a: t1 });
  txt('平坦标号是梯度 ⇔ 第 0 行与第 0 列的和都为 0', 1060, 452, { size: 24, fam: F.zh, w: 700, c: C.white, a: t1 });
  const t2 = a * at(S, 2, 0.7);
  panel(1030, 520, 790, 290, t2, C.lean, 'COUNTEREXAMPLE · 反例');
  fnLean(1060, 590, FN_LEAN.horizontal_seam_counterexample, t2, { size: 20 });
  txt('every grid with M ≥ 3 and N ≥ 3:', 1060, 640, { size: 26, fam: F.mono, w: 700, c: C.white, a: t2 });
  fnRich([['seam is flat, row 0 adds to 1,', C.lean]], 1060, 686, { size: 28, a: t2 });
  fnRich([['column 0 adds to 0, no gradient', C.lean]], 1060, 730, { size: 28, a: t2 });
  txt('单条缝：平坦、行和为 1、列和为 0，且不是任何梯度', 1060, 778, { size: 24, fam: F.zh, w: 700, c: C.white, a: t2 });
};

/* ======================================================================= */
/*                              scene 5 · ONE IN FOUR                        */
/* ======================================================================= */
/* a tiny 3 × 3 torus sketch with the seam pattern (r, c) */
function coMini(x, y, s, r, c, a) {
  if (a <= 0.003) return;
  const yl = fnSeam(3, 3, r, c);
  for (let i = 0; i <= 3; i++) for (let j = 0; j < 3; j++) line(x + j * s, y + i * s, x + (j + 1) * s, y + i * s, yl.h[i % 3][j] ? C.mag : C.cyan, a * (yl.h[i % 3][j] ? 1 : 0.45), yl.h[i % 3][j] ? 5 : 2);
  for (let i = 0; i < 3; i++) for (let j = 0; j <= 3; j++) line(x + j * s, y + i * s, x + j * s, y + (i + 1) * s, yl.v[i][j % 3] ? C.mag : C.cyan, a * (yl.v[i][j % 3] ? 1 : 0.45), yl.v[i][j % 3] ? 5 : 2);
}
SCENES.count = S => {
  const a = fnFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'lean']]);
  /* left: the three counts */
  const rows = [
    { k: 0, en: 'all labelings', zh: '全部标号', pow: '2¹⁸', n: FN_COUNT.all, col: C.white },
    { k: 1, en: 'flat', zh: '平坦', pow: '2¹⁰', n: FN_COUNT.flat, col: C.cyan },
    { k: 1, en: 'from paintings', zh: '来自涂色', pow: '2⁸', n: FN_COUNT.exact, col: C.cyan, ph: 'two hundred fifty-six' }
  ];
  const fl = 1 - at(S, 3, 0.6);
  rows.forEach((rw, i) => {
    const ra = a * (rw.ph ? Q(S, rw.k, rw.ph, 0.6) : at(S, rw.k, 0.6, i === 1 ? 0.2 : 0.6)) * fl;
    if (ra <= 0.003) return;
    const yy = 230 + i * 150;
    panel(130, yy, 760, 130, ra, rw.col === C.white ? C.dim : C.cyan);
    txt(fnFmt(rw.n), 160, yy + 84, { size: 60, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(`= ${rw.pow}`, 480, yy + 80, { size: 40, fam: F.math, w: 700, c: C.dim, a: ra });
    txt(rw.en, 640, yy + 58, { size: 26, fam: F.mono, w: 700, c: C.white, a: ra });
    txt(rw.zh, 640, yy + 98, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
  });
  txt('3 × 3 torus · counted here, one by one · 逐个数出', 130, 712, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * at(S, 0, 0.6, 0.4) * fl });
  /* right: the four seam classes of 256 each */
  const ta = a * at(S, 2, 0.6) * (1 - at(S, 4, 0.6));
  const cls = [[0, 0, 'painted', '涂色', C.cyan], [1, 0, 'row seam', '横缝', C.mag], [0, 1, 'column seam', '纵缝', C.mag], [1, 1, 'both', '两缝', C.mag]];
  cls.forEach(([r, c, en, zh, col], k) => {
    const ka = ta * clamp((at(S, 2, 2.4, 0.3) - k * 0.2) * 3);
    if (ka <= 0.003) return;
    const x = 980 + (k % 2) * 420, yy = 220 + Math.floor(k / 2) * 290;
    panel(x, yy, 390, 260, ka, col);
    coMini(x + 30, yy + 50, 52, r, c, ka);
    txt('256', x + 230, yy + 110, { size: 44, fam: F.mono, w: 700, c: col, a: ka });
    txt(en, x + 230, yy + 156, { size: 22, fam: F.mono, w: 700, c: C.white, a: ka });
    txt(zh, x + 230, yy + 194, { size: 24, fam: F.zh, w: 700, c: C.white, a: ka });
    txt(`行和 ${r} · 列和 ${c}`, x + 210, yy + 234, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ka });
  });
  stamp('1 / 4', 510, 785, Q(S, 2, 'one flat labeling in four', 0.5) * fl, C.cyan, 52, -0.06);
  /* Lean: the ratios for every grid */
  const la = a * at(S, 3, 0.6, 0.2);
  if (la > 0.003) {
    panel(130, 260, 760, 330, la, C.lean, 'EVERY M × N GRID · 任意 M × N 网格');
    fnLean(160, 340, FN_LEAN.periodic_grid_linear_statistics, la, { size: 20 });
    fnRich([['painted / flat = 1/4', C.lean]], 160, 410, { size: 36, a: la });
    fnRich([['flat / all = 1/2^(MN−1)', C.lean]], 160, 470, { size: 36, a: la });
    fnRich([['painted / all = 1/2^(MN+1)', C.lean]], 160, 530, { size: 36, a: la });
    txt('3 × 3: 1/4 · 1/256 · 1/1024', 160, 640, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: la * 0.9 });
  }
  /* the one relation among the squares */
  const ra = a * at(S, 4, 0.6);
  if (ra > 0.003) {
    const G = { x: 1060, y: 240, s: 120 };
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      fillBox(G.x + j * G.s + 6, G.y + i * G.s + 6, G.s - 12, G.s - 12, C.cyan, ra * 0.12);
      txt('+', G.x + j * G.s + G.s / 2, G.y + i * G.s + G.s / 2 + 14, { size: 40, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ra });
    }
    /* one edge and its two squares */
    const hk = Q(S, 4, 'each edge borders two squares', 0.6);
    fillBox(G.x + G.s + 6, G.y + 6, G.s - 12, G.s - 12, C.now, ra * hk * 0.22);
    fillBox(G.x + G.s + 6, G.y + G.s + 6, G.s - 12, G.s - 12, C.now, ra * hk * 0.22);
    line(G.x + G.s, G.y + G.s, G.x + 2 * G.s, G.y + G.s, C.now, ra * hk, 7);
    for (let k = 0; k <= 3; k++) { line(G.x, G.y + k * G.s, G.x + 3 * G.s, G.y + k * G.s, C.cyan, ra * 0.5, 2); line(G.x + k * G.s, G.y, G.x + k * G.s, G.y + 3 * G.s, C.cyan, ra * 0.5, 2); }
    fnRich([['Σ all 9 squares = ', C.white], ['0', C.cyan]], 1060, 650, { size: 32, a: ra * Q(S, 4, 'all of them add to zero', 0.5) });
    fnLean(1060, 712, FN_LEAN.plaquette_relation_rank_one, ra, { size: 18 });
    txt('the only relation: equal weights on all squares', 1060, 760, { size: 22, fam: F.mono, w: 700, c: C.lean, a: ra });
    txt('唯一的关系：所有方格权重相同', 1060, 798, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = fnFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, 'Whether', 'open']]);
  const rows = [
    { a: at(S, 0, 0.6), col: C.argued, head: 'READING · 读法（MODEL）', en: 'bit = link · flat = zero action · painting = pure gauge', zh: '比特 = 链变量，平坦 = 零作用量，涂色 = 纯规范' },
    { a: Q(S, 2, 'This is about bits', 0.6), col: C.cyan, head: 'SCOPE · 范围', en: 'bits (the group Z/2) on a two-dimensional periodic grid', zh: '只讲二维周期网格上的比特（Z/2）' },
    { a: Q(S, 2, 'Whether', 0.6), col: C.open, head: 'OPEN · 开放问题', en: '4D SU(N) Yang–Mills: area law at every coupling, mass gap', zh: '四维杨—米尔斯：一切耦合下的面积律与质量间隙' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * rw.a;
    if (ra <= 0.003) return;
    const yy = 190 + i * 160;
    panel(160, yy, 1600, 140, ra, rw.col, rw.head);
    txt(rw.en, 190, yy + 80, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 190, yy + 122, { size: 26, fam: F.zh, w: 700, c: C.white, a: ra });
  });
  /* the aphorism */
  const ma = a * at(S, 1, 0.8) * (1 - 0.35 * Q(S, 2, 'This is about bits', 0.6));
  txt('every square checks out; the loop still flips', W / 2, 735, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma, ab: 2 });
  txt('每格都对得上账，绕一圈照样翻', W / 2, 800, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.white, a: ma * 0.9 });
};

/* ======================================================================= */
/*                                  scene 7 · LEDGER                         */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 6;
  background(t, sc, 2, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1420, cy: 420, camZ: 7, lw: 1.3, dots: false });
  const paint = [[0, 0, 0], [null, null, null], [null, null, null]];
  fnTorus3({ x: 200, y: 260, s: 160 }, FN_SEAM3, 1, { labels: true, plq: 0.8, paint, notes: 0 });
  for (let k = 0; k < 3; k++) line(200 + k * 160, 260, 200 + (k + 1) * 160, 260, C.now, 0.9, 4);
  ring(200 + 3 * 160, 260, 32, C.now, 1, 4);
  txt(DATA.film.title_zh, 1360, 430, { size: 72, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('EVERY SQUARE FLAT,', 1360, 530, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 4 });
  txt('THE LOOP STILL FLIPS', 1360, 592, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  fnRich([['flat ', C.cyan], ['⇏', C.white], [' painted', C.white]], 1360, 690, { size: 44, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1360, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
