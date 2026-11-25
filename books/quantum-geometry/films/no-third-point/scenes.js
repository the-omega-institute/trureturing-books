/* Long film · No Third Point · 不借第三点 (book quantum-geometry).
   One act per part of the book, spliced in order; each act keeps its own namespace and scene prefix,
   and the shared SPINE draws the act title cards, the position rail and the hand-over questions. */
/* ==== SPINE:BEGIN — shared by every act of this film. Copy verbatim; never edit inside an act. ==== */
const SPINE = (() => {
  /* the rungs of the ladder: index 0 = prelude, 1..10 = Parts I–X, 11 = coda */
  const PARTS = [
    { tag: 'PRELUDE', zh: '序曲', key_en: 'a point that measures', key_zh: '会丈量的点' },
    { tag: 'PART I', zh: '第一部', key_en: 'point → line', key_zh: '点 → 线' },
    { tag: 'PART II', zh: '第二部', key_en: 'line → plane', key_zh: '线 → 面' },
    { tag: 'PART III', zh: '第三部', key_en: 'plane → sphere', key_zh: '面 → 球' },
    { tag: 'PART IV', zh: '第四部', key_en: 'many spheres', key_zh: '多球' },
    { tag: 'PART V', zh: '第五部', key_en: 'the spacetime sphere', key_zh: '时空之球' },
    { tag: 'PART VI', zh: '第六部', key_en: 'beyond the sphere', key_zh: '球外之球' },
    { tag: 'PART VII', zh: '第七部', key_en: 'comparison as the ground', key_zh: '以比较立极' },
    { tag: 'PART VIII', zh: '第八部', key_en: 'back to the arc', key_zh: '归于圆弧' },
    { tag: 'PART IX', zh: '第九部', key_en: 'observers in the field', key_zh: '场内观察者' },
    { tag: 'PART X', zh: '第十部', key_en: 'the observer is the field', key_zh: '观察者即本体' },
    { tag: 'CODA', zh: '终章', key_en: 'outside every sphere', key_zh: '在所有的球之外' }
  ];
  const X0 = 60, Y = 128, STEP = 24;
  /* the position rail, top left under the SEQ line (dots on y = 128, the label on a second line just above the safe area,
     clear of the centred evidence badge): passed rungs cyan, the current one amber, later ones dim */
  function rail(S, idx, a = 1) {
    if (a <= 0.003) return;
    for (let i = 0; i < PARTS.length; i++) {
      const x = X0 + i * STEP;
      if (i === idx) { ring(x, Y, 9, C.now, a, 2); dot(x, Y, 7, 'g', a); }
      else if (i < idx) dot(x, Y, 5, 'c', a * 0.7);
      else ring(x, Y, 4, C.dim, a * 0.5, 1.2);
      if (i + 1 < PARTS.length) line(x + 8, Y, x + STEP - 8, Y, i < idx ? C.cyan : C.dim, a * (i < idx ? 0.5 : 0.25), 1);
    }
    const p = PARTS[idx];
    txt(`${p.tag} · ${p.zh} · ${p.key_en} · ${p.key_zh}`, X0 - 6, Y + 28,
      { size: 13, fam: F.mono, w: 700, c: C.now, a: a * 0.9, ls: 1.5 });
  }
  /* the act's title card, shown during the lead of the act's first scene (before its first line) */
  function title(S, idx, title_zh, title_en, o = {}) {
    const u = S.u, end = o.until != null ? o.until : Math.max(1.6, lineAt(S, 0).s - 0.05);
    const a = clamp(u / 0.45) * (1 - clamp((u - (end - 0.55)) / 0.55));
    if (a <= 0.003) return;
    const p = PARTS[idx], k = clamp(u / 1.2);
    fillBox(0, 0, W, H, C.bg, a * 0.55);
    txt(`${p.tag} · ${p.zh}`, W / 2, 380, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a, ls: 10 });
    txt(title_zh, W / 2, 500, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: a * clamp(k * 1.6), ab: 3 });
    txt(scramble(title_en.toUpperCase(), k, idx + 7), W / 2, 590, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.white, a, ls: 6, ab: 1.5 });
    txt(`${p.key_en} · ${p.key_zh}`, W / 2, 660, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: a * 0.9, ls: 3 });
  }
  /* the question an act hands to the next one, from the start of line k to the end of the scene */
  function ask(S, k, en, zh, o = {}) {
    const a = at(S, k, 0.6) * (o.a == null ? 1 : o.a);
    if (a <= 0.003) return;
    const y = o.y || 668, w = 1280, x = W / 2 - w / 2;
    panel(x, y, w, 132, a, C.cyan, 'NEXT QUESTION · 下一问');
    txt(en, W / 2, y + 72, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a });
    txt(zh, W / 2, y + 114, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * 0.9 });
  }
  return { PARTS, rail, title, ask };
})();
/* ==== SPINE:END ==== */
'use strict';

/* ---- a00 · A point that measures · 会丈量的点 ---- */
/* Act a00 of the film No Third Point · 不借第三点: the prelude, A point that measures · 会丈量的点
   (book quantum-geometry, prelude). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     a00_title    the act card, then one amber dot alone in the dark: no distance, size or direction to read off.
     a00_ruler    the habit of a ruler outside: a grid and a third point C; who measured the ruler? A stack of rulers,
                  each needing the next (the book's critique; argued).
     a00_liang    the character 量: liàng, an amount; liáng, to measure. The book reads a quantum as two states that
                  measure each other (argued).
     a00_overlap  unit arrows a = (1, 0), b = (4/5, 3/5): one step along b goes 4/5 down the road a and 3/5 sideways;
                  16/25 + 9/25 = 1 (computed); the road and the step are an analogy.
                  ..... BornReduction.rank_one_pure_state_modulus_square_reduction (LEAN): for a pure state ψψ* and a
                  shutter φφ*, the record weight is |φ*·ψ|²; here φ = a, ψ = b, so the weight is 16/25.
     a00_ladder   the twelve stops of the film (SPINE.PARTS) as a string of beads: the book's way of reading (argued).
     a00_ask      the grid we used was brought from outside; the question handed to Part I.

   On load, FILM.init checks the citation at the pinned commit and re-derives every number on screen by a second
   route (integer fractions, and the trace of the matrix product ρP for the record weight). */
const A00 = (() => {
  const GID = 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction';
  /* the two unit arrows of scene a00_overlap, as exact fractions over 5 */
  const A = [5, 0], B = [4, 3], DEN = 5;
  const dotI = (u, v) => u[0] * v[0] + u[1] * v[1];               // over DEN²
  const OVER = dotI(A, B) / (DEN * DEN);                            // a·b = 4/5
  const SIDE = (A[0] * B[1] - A[1] * B[0]) / (DEN * DEN);           // the sideways part, 3/5
  /* stage of the arrows */
  function stage(o) { return { ox: o.ox, oy: o.oy, U: o.U, p: (x, y) => [o.ox + o.U * x, o.oy - o.U * y] }; }
  /* the two arrows a (cyan, the road and the ruler) and b (amber, the state measured); k: draw-in progress */
  function arrows(g, a, k = 1, labels = true) {
    const [ax, ay] = g.p(1, 0), [bx, by] = g.p(B[0] / DEN * k, B[1] / DEN * k);
    arrow(g.ox, g.oy, lerp(g.ox, ax, k), ay, C.cyan, a, 5);
    arrow(g.ox, g.oy, bx, by, C.now, a * clamp(k * 2 - 0.4), 5);
    dot(g.ox, g.oy, 7, 'w', a);
    if (labels) {
      txt('a', ax + 14, ay + 10, { size: 40, fam: F.math, w: 700, c: C.cyan, a });
      txt('b', bx + 10, by - 14, { size: 40, fam: F.math, w: 700, c: C.now, a: a * clamp(k * 2 - 0.4) });
    }
  }
  /* a faint coordinate grid around the stage (the ruler brought from outside) */
  function grid(g, a, col = C.cyan, n = 4, glitch = 0) {
    if (a <= 0.003) return;
    for (let i = -n; i <= n; i++) {
      const j = glitch ? Math.sin(i * 7.3 + glitch * 9) * 6 * glitch : 0;
      const [x0, y0] = g.p(i / 4, -n / 4 * 0.75), [x1, y1] = g.p(i / 4, n / 4 * 0.75);
      line(x0 + j, y0, x1 + j, y1, col, a * (i === 0 ? 0.55 : 0.22), i === 0 ? 1.6 : 1);
    }
    for (let i = -3; i <= 3; i++) {
      const j = glitch ? Math.cos(i * 5.1 + glitch * 7) * 6 * glitch : 0;
      const [x0, y0] = g.p(-n / 4, i / 4), [x1, y1] = g.p(n / 4, i / 4);
      line(x0, y0 + j, x1, y1 + j, col, a * (i === 0 ? 0.55 : 0.22), i === 0 ? 1.6 : 1);
    }
  }
  /* a stacked fraction n/d centred at x with baseline y */
  function frac(n, d, x, y, col, a, size = 40) {
    const w = Math.max(tw(String(n), size, F.math, 700), tw(String(d), size, F.math, 700)) + 10;
    txt(String(n), x, y - size * 0.55, { size, fam: F.math, w: 700, align: 'center', c: col, a });
    line(x - w / 2, y - size * 0.38, x + w / 2, y - size * 0.38, col, a, 2.5);
    txt(String(d), x, y + size * 0.62, { size, fam: F.math, w: 700, align: 'center', c: col, a });
  }
  /* a small violet tag that marks a picture as an analogy or a reading, not a theorem */
  function tag(s, x, y, a, align = 'left') {
    if (a <= 0.003) return;
    const w = tw(s, 15, F.mono, 700, 2) + 20, x0 = align === 'center' ? x - w / 2 : x;
    box(x0, y - 20, w, 28, C.argued, a, 1.2, 'rgba(0,0,0,0.45)');
    txt(s, x0 + 10, y - 1, { size: 15, fam: F.mono, w: 700, c: C.argued, a, ls: 2 });
  }
  /* the twelve beads of the film, on a rising string; idx: the current one; shown(i) → 0..1 */
  const BEAD = i => [260 + i * 126, 760 - i * 44];
  function ladder(a, shown, cur = 0) {
    const P = SPINE.PARTS;
    for (let i = 0; i + 1 < P.length; i++) {
      const [x0, y0] = BEAD(i), [x1, y1] = BEAD(i + 1), k = shown(i + 1);
      if (k > 0) line(x0, y0, lerp(x0, x1, k), lerp(y0, y1, k), C.argued, a * 0.7, 3);
    }
    for (let i = 0; i < P.length; i++) {
      const k = shown(i); if (k <= 0.003) continue;
      const [x, y] = BEAD(i), up = i % 2 === 1, b = a * k;
      if (i === cur) { ring(x, y, 17, C.now, b, 2.5); dot(x, y, 13, 'g', b); }
      else dot(x, y, 11, 'v', b);
      const ty = up ? y - 80 : y + 42;
      txt(P[i].tag, x, ty, { size: 15, fam: F.mono, w: 700, align: 'center', c: i === cur ? C.now : C.argued, a: b, ls: 2 });
      txt(P[i].key_en, x, ty + 22, { size: 18, fam: F.disp, w: 700, align: 'center', c: C.white, a: b * 0.95 });
      txt(P[i].key_zh, x, ty + 46, { size: 19, fam: F.zh, w: 700, align: 'center', c: C.white, a: b * 0.8 });
    }
  }
  /* the LEAN ✓ chip of this act's one citation only (leanList would list every act's citations once the acts are joined) */
  function chip(x, y, a, size = 13) {
    const r = leanCite(GID);
    if (!r || r.kind !== 'theorem' || a <= 0.003) return;
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.72, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 0.95, wh, size * 1.25, C.lean, a * 0.95);
    txt(head, x + 9, y - size * 0.12, { size: size * 0.72, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.label || r.name, x + wh + 14, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  return { GID, A, B, DEN, OVER, SIDE, dotI, stage, arrows, grid, frac, tag, ladder, BEAD, chip };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  const check = (ok, m) => { if (!ok) E.push('no-third-point-a00: ' + m); };
  /* the citation at the pinned commit */
  const r = leanCite(A00.GID);
  check(!!r, `film.json does not cite ${A00.GID}`);
  if (r) check(r.kind === 'theorem' && r.short === 'rank_one_pure_state_modulus_square_reduction', `${A00.GID} is not the expected theorem`);
  /* the arrows are unit arrows: 5² + 0² = 4² + 3² = 25 */
  check(A00.dotI(A00.A, A00.A) === 25 && A00.dotI(A00.B, A00.B) === 25, 'a and b have length one');
  /* overlap 4/5, sideways 3/5, as integers over 25 */
  check(A00.dotI(A00.A, A00.B) === 20 && Math.abs(A00.OVER - 0.8) < 1e-15, 'a·b = 4/5');
  check(A00.A[0] * A00.B[1] - A00.A[1] * A00.B[0] === 15 && Math.abs(A00.SIDE - 0.6) < 1e-15, 'sideways part = 3/5');
  /* 16/25 + 9/25 = 1 in integers */
  check(16 + 9 === 25 && 4 * 4 === 16 && 3 * 3 === 9, '16/25 + 9/25 = 1');
  /* second route: record weight Tr(ρ P) with ρ = b bᵀ, P = a aᵀ, entries over 5⁴ */
  const outer = (u, v) => [[u[0] * v[0], u[0] * v[1]], [u[1] * v[0], u[1] * v[1]]];
  const mul = (X, Y) => [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]],
    [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]];
  const rho = outer(A00.B, A00.B), P = outer(A00.A, A00.A), M = mul(rho, P);
  check((M[0][0] + M[1][1]) * 25 === 16 * 625, 'Tr(ρP) = 16/25');
  /* P is a projection: P² = 25 P over 5⁴ (that is, P² = P for the unit arrow) */
  const P2 = mul(P, P);
  check(P2.every((row, i) => row.every((v, j) => v === 25 * P[i][j])), 'P² = P');
  /* the shared spine has twelve stops and this act is stop 0 */
  check(SPINE.PARTS.length === 12 && SPINE.PARTS[0].key_zh === '会丈量的点', 'spine: twelve stops, the prelude first');
});

SCENES.a00_title = S => {
  SPINE.title(S, 0, '会丈量的点', 'A point that measures');
  const a = at(S, 0, 0.6);
  SPINE.rail(S, 0, a);
  const cx = W / 2, cy = 470;
  const pulse = 1 + 0.12 * Math.sin(S.u * 2.4);
  dot(cx, cy, 20 * pulse, 'g', clamp(S.u / 1.0));
  ring(cx, cy, 34 * pulse, C.now, 0.35 * a, 1.5);
  /* three questions the dot cannot answer */
  const qs = [['distance ?', '多远？', Q(S, 0, 'How far away'), -330, -150], ['size ?', '多大？', Q(S, 0, 'How big'), 330, -150],
    ['direction ?', '指向？', Q(S, 0, 'Which way'), 0, 190]];
  for (const [en, zh, k, dx, dy] of qs) {
    if (k <= 0) continue;
    dashed(cx + dx * 0.25, cy + dy * 0.25, cx + dx * 0.78, cy + dy * 0.78, C.dim, k * 0.6, 1.5);
    txt(en, cx + dx, cy + dy, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a: k * 0.9 });
    txt(zh, cx + dx, cy + dy + 38, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: k * 0.7 });
  }
  /* nothing to hold it against */
  const n = at(S, 1, 0.8);
  if (n > 0) {
    ctx.save(); ctx.setLineDash([6, 10]); ring(cx, cy, 250, C.dim, n * 0.6, 1.5); ctx.restore();
    txt('nothing to compare it with · 无物可比', cx, cy + 300, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: n });
  }
};

SCENES.a00_ruler = S => {
  SPINE.rail(S, 0, clamp(S.u / 0.4));
  badgeQ(S, [[0, null, 'argued']]);
  const g = A00.stage({ ox: 760, oy: 520, U: 300 });
  const gk = at(S, 0, 1.2), gl = Q(S, 1, 'who measured', 0.4);
  A00.grid(g, gk, C.cyan, 4, gl > 0 ? Math.sin(S.u * 11) * (1 - at(S, 1, 0.6, 3.2)) * gl : 0);
  dot(760 + 75, 520 - 60, 16, 'g', 1);
  /* the third point C */
  const ck = Q(S, 0, 'a third point', 0.6);
  if (ck > 0) {
    const [x, y] = g.p(-0.9, -0.55);
    dot(x, y, 11, 'w', ck);
    txt('C', x - 44, y + 8, { size: 36, fam: F.math, w: 700, c: C.white, a: ck });
    txt('a third point · 第三点', x + 20, y + 44, { size: 22, fam: F.mono, w: 700, c: C.white, a: ck * 0.85 });
    dashed(x, y, 760 + 75, 520 - 60, C.dim, ck * 0.6, 1.5);
  }
  /* the regress: every ruler needs another ruler */
  const rk = at(S, 1, 0.6);
  for (let i = 0; i < 4; i++) {
    const k = rk * clamp((S.u - lineAt(S, 1).s - 0.3 - i * 0.4) / 0.4);
    if (k <= 0) continue;
    const x = 1270, y = 300 + i * 120, w = 400 - i * 70;
    box(x, y, w, 34, C.cyan, k * (1 - i * 0.18), 1.5);
    for (let t = 0; t <= 10; t++) line(x + w * t / 10, y, x + w * t / 10, y + (t % 5 ? 10 : 20), C.cyan, k * 0.7, 1.2);
    txt('?', x + w + 26, y + 28, { size: 34, fam: F.disp, w: 700, c: C.white, a: k });
  }
  const qk = Q(S, 1, 'who measured', 0.6);
  txt('who measured the ruler?', 1270, 790, { size: 34, fam: F.disp, w: 700, c: C.white, a: qk });
  txt('尺子又是谁量的？', 1270, 834, { size: 30, fam: F.zh, w: 700, c: C.white, a: qk * 0.85 });
};

SCENES.a00_liang = S => {
  SPINE.rail(S, 0, 1);
  badgeQ(S, [[0, null, 'argued']]);
  const ck = clamp(S.u / 0.6), cx = W / 2;
  txt('量', cx, 470, { size: 230, fam: F.zh, w: 900, align: 'center', c: C.white, a: ck, ab: 2 });
  /* liàng, the noun: an amount */
  const n = Q(S, 0, 'an amount', 0.6);
  panel(250, 300, 430, 210, n, C.cyan, 'NOUN · 名词');
  txt('liàng', 465, 390, { size: 54, fam: F.disp, w: 700, align: 'center', c: C.cyan, a: n });
  txt('an amount · 一份数量', 465, 450, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: n * 0.9 });
  /* liáng, the verb: to measure */
  const v = Q(S, 1, 'rising tone', 0.6);
  panel(1240, 300, 430, 210, v, C.argued, 'VERB · 动词');
  txt('liáng', 1455, 390, { size: 54, fam: F.disp, w: 700, align: 'center', c: C.argued, a: v });
  txt('to measure · 丈量', 1455, 450, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: v * 0.9 });
  /* two that measure each other */
  const t = Q(S, 1, 'it means to measure', 0.8, 0.6);
  if (t > 0) {
    const y = 680, x0 = cx - 230, x1 = cx + 230;
    dot(lerp(cx, x0, eo(t)), y, 14, 'g', t);
    dot(lerp(cx, x1, eo(t)), y, 14, 'c', t);
    line(x0 + 20, y, x1 - 20, y, C.cyan, t * 0.8, 2.5);
    txt('two that measure each other · 两子，彼此丈量', cx, y + 64, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: t });
    A00.tag("THE BOOK'S READING · 本书的读法", cx, y - 40, t, 'center');
  }
};

SCENES.a00_overlap = S => {
  SPINE.rail(S, 0, 1);
  badgeQ(S, [[0, null, 'computed'], [4, 'Lean checks', 'lean'], [5, null, 'argued']]);
  const g = A00.stage({ ox: 300, oy: 640, U: 520 });
  /* the road along a (analogy) */
  const rk = Q(S, 1, 'a road', 0.6);
  if (rk > 0) {
    line(g.ox - 90, g.oy, g.ox + g.U * 1.15, g.oy, C.cyan, rk * 0.25, 30);
    txt('road · 路', g.ox + g.U * 1.02, g.oy + 56, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: rk });
    A00.tag('ANALOGY · 比方', g.ox - 60, g.oy + 110, rk);
  }
  const k = eo(at(S, 0, 1.4));
  A00.arrows(g, clamp(S.u / 0.5), k);
  const [bx, by] = g.p(0.8, 0.6), [fx, fy] = g.p(0.8, 0);
  if (rk > 0) txt('one step · 一步', bx - 230, by - 20, { size: 22, fam: F.mono, w: 700, c: C.now, a: rk });
  /* the shadow: 4/5 along, 3/5 aside */
  const sk = Q(S, 2, 'Four fifths', 0.8), dk = Q(S, 2, 'three fifths', 0.6);
  if (sk > 0) {
    line(g.ox, g.oy, lerp(g.ox, fx, eo(sk)), fy, C.cyan, sk, 12);
    dashed(bx, by, fx, fy, C.dim, sk * 0.8, 2);
    txt('4/5', (g.ox + fx) / 2, g.oy + 52, { size: 36, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sk });
  }
  if (dk > 0) {
    line(fx, fy, fx, lerp(fy, by, eo(dk)), C.mag, dk, 8);
    txt('3/5', fx + 22, (fy + by) / 2 + 12, { size: 36, fam: F.math, w: 700, c: C.mag, a: dk });
  }
  /* the ledger on the right */
  const px = 1000, pk = at(S, 0, 0.6, 0.4);
  panel(px, 200, 740, 300, pk, C.cyan, 'TWO UNIT ARROWS · 两支单位箭头');
  txt('a = (1, 0)', px + 40, 280, { size: 34, fam: F.math, w: 700, c: C.cyan, a: pk });
  txt('b = (4/5, 3/5)', px + 360, 280, { size: 34, fam: F.math, w: 700, c: C.now, a: pk });
  const ok = Q(S, 2, 'the overlap', 0.6);
  txt('a · b = 4/5', px + 40, 350, { size: 34, fam: F.math, w: 700, c: C.cyan, a: ok });
  txt('overlap · 重叠', px + 360, 348, { size: 22, fam: F.mono, w: 700, c: C.white, a: ok * 0.8 });
  const qk = at(S, 3, 0.8);
  if (qk > 0) {
    const y = 450;
    A00.frac(16, 25, px + 80, y, C.cyan, qk, 32);
    txt('+', px + 150, y, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: qk });
    A00.frac(9, 25, px + 220, y, C.mag, qk, 32);
    txt('=', px + 290, y, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: qk });
    txt('1', px + 350, y + 12, { size: 48, fam: F.math, w: 700, align: 'center', c: C.white, a: Q(S, 3, 'Exactly one', 0.4) });
    txt('(4/5)² + (3/5)²', px + 430, y + 10, { size: 26, fam: F.math, w: 700, c: C.dim, a: qk });
  }
  /* the rule, checked by Lean */
  const lk = Q(S, 4, 'Lean checks', 0.6);
  if (lk > 0) {
    panel(px, 540, 740, 250, lk, C.lean, 'THE RULE · 规则');
    txt('P = |a⟩⟨a| ,  ρ = |b⟩⟨b|', px + 40, 620, { size: 30, fam: F.math, w: 700, c: C.white, a: lk });
    const rule = 'recordWeight(P, ρ) = |⟨a|b⟩|²', rw = tw(rule, 30, F.math, 700);
    txt(rule, px + 40, 680, { size: 30, fam: F.math, w: 700, c: C.lean, a: lk });
    txt('= 16/25', px + 56 + rw, 680, { size: 30, fam: F.math, w: 700, c: C.cyan, a: lk });
    A00.chip(px + 24, 750, lk, 13);
  }
};

SCENES.a00_ladder = S => {
  SPINE.rail(S, 0, 1);
  badgeQ(S, [[0, null, 'argued']]);
  /* when each bead appears: 0 with line 0; 1–3 with line 1; 4–6 with line 2; 7–10 with line 3; the coda at its end */
  const when = [[0, 0.2], [1, 'point'], [1, 'a line'], [1, 'a sphere'], [2, 'many spheres'], [2, 'spacetime'],
    [2, 'outside the sphere'], [3, 'comparison'], [3, 'the arc'], [3, 'observers in the field'], [3, 'the observer as'], [4, 'map']];
  const shown = i => {
    const [k, w] = when[i];
    return typeof w === 'number' ? at(S, k, 0.6, w) : Q(S, k, w, 0.6);
  };
  A00.ladder(1, shown, 0);
  /* the seed: a tiny copy of the two arrows at the first bead */
  const [x0, y0] = A00.BEAD(0), sk = at(S, 0, 0.8);
  if (sk > 0) {
    arrow(x0, y0, x0 + 60, y0, C.cyan, sk, 3);
    arrow(x0, y0, x0 + 48, y0 - 36, C.now, sk, 3);
    txt('the seed · 种子', x0 - 205, y0 + 7, { size: 20, fam: F.mono, w: 700, c: C.now, a: sk });
  }
  A00.tag('A MAP, NOT A THEOREM · 地图，不是定理', 1300, 820, Q(S, 4, 'a map', 0.6));
};

SCENES.a00_ask = S => {
  SPINE.rail(S, 0, 1);
  const g = A00.stage({ ox: 760, oy: 470, U: 240 });
  const gl = at(S, 0, 0.6, 0.3);
  A00.grid(g, gl, C.cyan, 4, gl * (1 - at(S, 0, 0.8, 1.6)));
  A00.arrows(g, clamp(S.u / 0.4), 1);
  if (gl > 0) {
    txt('a grid brought from outside', 1150, 330, { size: 30, fam: F.disp, w: 700, c: C.white, a: gl });
    txt('外面带来的网格', 1150, 372, { size: 28, fam: F.zh, w: 700, c: C.white, a: gl * 0.85 });
    txt('(1, 0)', 1150, 440, { size: 28, fam: F.math, w: 700, c: C.cyan, a: gl * 0.8 });
    txt('(4/5, 3/5)', 1270, 440, { size: 28, fam: F.math, w: 700, c: C.now, a: gl * 0.8 });
  }
  SPINE.ask(S, 1, 'With no ruler outside, how can one state measure another?', '外面没有尺子，一个态怎么丈量另一个态？');
};

/* ---- a01 · Breaking illusions: from point to line · 破妄·从点到线 ---- */
/* Act a01 of the long film "No Third Point" · Part I (chapters 1–4) · 破妄·从点到线.
   One running example: the ruler a = (1, 0) and the state b = 0.6 a + 0.8 a⊥, written in the basis of a itself.
     a01_title   two arrows turned together: their coordinates in an outside frame C change, a·b = 0.6 does not
                 (computed for the frames shown); "the angle belongs to the pair" is the book's reading (argued).
     a01_shadow  the shadow of b on a is c = (a·b) a, |c| = cos θ = 0.6, θ = 53.13° (computed).
     a01_born    weights 0.6² = 0.36 and 0.8² = 0.64 add to 1 (computed); "why squares" (argued);
                 Tr(ψψ* φφ*) = |φ*ψ|² for a rank-one record on a pure state
                 ..... BornReduction.rank_one_pure_state_modulus_square_reduction (LEAN);
                 "a probability is a meeting of two" (argued).
     a01_sieve   P = diag(1, 0): P b = (0.6, 0), rescaled to a; P a = a; P² = P (computed); the sieve (argued).
     a01_away    ρ = b b* = [[0.36, 0.48], [0.48, 0.64]] → unread [[0.36, 0], [0, 0.64]] (computed);
                 Tr ρ² = 1 = 0.5392 + 0.4608 ..... PinchingProjection.pinching_hilbert_schmidt_pythagorean (LEAN);
                 unread ∘ unread = unread ..... FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent (LEAN);
                 Bloch vector (0.96, 0, −0.28) → (0, 0, −0.28), length 1 → 0.28 (computed).
     a01_next    recap; the hand-off question to Part II.
   FILM.init re-derives every number by an independent route and checks the cited theorems. */
const A01 = (() => {
  const LEAN = {
    born: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
    split: 'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
    twice: 'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent'
  };
  const SHORT = {
    born: 'rank_one_pure_state_modulus_square_reduction',
    split: 'pinching_hilbert_schmidt_pythagorean',
    twice: 'finite_record_pinching_idempotent'
  };
  /* the running example, exact: b = 0.6 a + 0.8 a⊥ */
  const B = [0.6, 0.8];
  const ALPHA = Math.atan2(B[1], B[0]);                       // θ, the angle between a and b
  const DEG = ALPHA * 180 / Math.PI;                            // 53.130…°
  const OV = B[0];                                              // a·b = cos θ = 0.6
  const WY = B[0] * B[0], WN = B[1] * B[1];                     // 0.36, 0.64
  const RHO = [[B[0] * B[0], B[0] * B[1]], [B[1] * B[0], B[1] * B[1]]];   // [[0.36, 0.48], [0.48, 0.64]]
  const PIN = [[RHO[0][0], 0], [0, RHO[1][1]]];
  const HS = m => m[0][0] * m[0][0] + m[0][1] * m[0][1] + m[1][0] * m[1][0] + m[1][1] * m[1][1];
  const MASS = HS(RHO), KEEP = HS(PIN), WIPE = HS([[0, RHO[0][1]], [RHO[1][0], 0]]);   // 1, 0.5392, 0.4608
  /* Bloch vector of a real qubit density matrix: (2 Re ρ01, 2 Im ρ10, ρ00 − ρ11) */
  const BLOCH = [2 * RHO[0][1], 0, RHO[0][0] - RHO[1][1]];      // (0.96, 0, −0.28)
  const BLOCH_PIN = [0, 0, PIN[0][0] - PIN[1][1]];              // (0, 0, −0.28)
  const blen = v => Math.hypot(v[0], v[1], v[2]);

  const fmt = (v, n = 2) => (v < -0.5 * Math.pow(10, -n) ? '−' : '') + Math.abs(v).toFixed(n);
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const tip = (o, ang, len) => [o[0] + len * Math.cos(ang), o[1] - len * Math.sin(ang)];

  /* one LEAN ✓ chip, looked up by the whole GID */
  const MISSING = new Set();
  function lean(x, y, key, a, size = 19) {
    if (a <= 0.003) return;
    const gid = LEAN[key], r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`a01: film.json does not cite the theorem ${gid}`); }
      return;
    }
    const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* a 2 × 2 matrix: cells [[text, colour, alpha], …] row by row */
  function mat(x, y, cell, cells, a, size) {
    if (a <= 0.003) return;
    const h = cell * 2, w = cell * 2, br = 12;
    for (const [x0, s] of [[x, 1], [x + w, -1]]) {
      line(x0, y, x0, y + h, C.white, a * 0.85, 3);
      line(x0, y, x0 + s * br, y, C.white, a * 0.85, 3); line(x0, y + h, x0 + s * br, y + h, C.white, a * 0.85, 3);
    }
    cells.forEach((c, i) => {
      if (!c) return;
      const cx = x + cell * (0.5 + (i % 2)), cy = y + cell * (0.5 + Math.floor(i / 2));
      txt(c[0], cx, cy + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: c[1], a: a * (c[2] == null ? 1 : c[2]) });
    });
  }
  /* a column vector (two entries) */
  function vec(x, y, cell, cells, a, size) {
    if (a <= 0.003) return;
    const h = cell * 2, w = cell * 1.9, br = 10;
    for (const [x0, s] of [[x, 1], [x + w, -1]]) {
      line(x0, y, x0, y + h, C.white, a * 0.85, 3);
      line(x0, y, x0 + s * br, y, C.white, a * 0.85, 3); line(x0, y + h, x0 + s * br, y + h, C.white, a * 0.85, 3);
    }
    cells.forEach((c, i) => txt(c[0], x + w / 2, y + cell * (0.5 + i) + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: c[1], a: a * (c[2] == null ? 1 : c[2]) }));
  }
  /* a thick segment with round caps */
  function seg(p, q, col, a, w) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); ctx.stroke(); ctx.restore();
  }
  /* the angle arc between two directions at o */
  function arc(o, a0, a1, r, col, a, lw = 2.5) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.arc(o[0], o[1], r, -a1, -a0); ctx.stroke(); ctx.restore();
  }
  function fillRect(x, y, w, h, col, a) { fillBox(x, y, w, h, col, a); }
  /* a horizontal bar of width w split into [[value, colour, label]] */
  function bar(x, y, w, h, parts, a, size = 24) {
    if (a <= 0.003) return;
    let cx = x;
    for (const [v, col, lab, al] of parts) {
      const pw = w * v, pa = a * (al == null ? 1 : al);
      if (pa > 0.003 && pw > 0.5) {
        fillBox(cx, y, pw, h, col, pa * 0.4);
        box(cx, y, pw, h, col, pa, 1.5);
        if (lab && pw > 70) txt(lab, cx + pw / 2, y + h / 2 + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: C.white, a: pa });
      }
      cx += pw;
    }
  }
  /* a little sieve: mesh, rim and caught lumps (analogy) */
  function sieve(cx, cy, wd, a, lumps) {
    if (a <= 0.003) return;
    const x0 = cx - wd / 2, x1 = cx + wd / 2;
    line(x0 - 22, cy - 48, x0, cy, C.white, a * 0.8, 3); line(x1 + 22, cy - 48, x1, cy, C.white, a * 0.8, 3);
    line(x0, cy, x1, cy, C.dim, a, 2);
    for (let k = 0; k <= 12; k++) line(x0 + wd * k / 12, cy - 3, x0 + wd * k / 12, cy + 3, C.dim, a * 0.8, 1.2);
    for (let k = 0; k < 3; k++) dot(x0 + wd * (0.25 + 0.25 * k), cy - 10, 10, 'm', a * lumps);
  }
  return {
    LEAN, SHORT, B, ALPHA, DEG, OV, WY, WN, RHO, PIN, HS, MASS, KEEP, WIPE, BLOCH, BLOCH_PIN, blen,
    fmt, fade, tip, lean, mat, vec, seg, arc, fillRect, bar, sieve
  };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('no-third-point-a01: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (x, y, eps = 1e-12) => Math.abs(x - y) < eps;

  /* 0. the cited theorems at the pinned commit */
  for (const [k, gid] of Object.entries(A01.LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem`);
    check(r.short === A01.SHORT[k], `${gid} resolves to ${r.short}`);
  }

  /* 1. the example, from the 3-4-5 triangle */
  check(near(Math.hypot(A01.B[0], A01.B[1]), 1), 'b is a unit vector');
  check(near(Math.cos(A01.ALPHA), 0.6) && near(A01.OV, 0.6) && A01.DEG.toFixed(2) === '53.13', 'cos θ = 0.6, θ = 53.13°');
  check(near(A01.WY, 0.36) && near(A01.WN, 0.64) && near(A01.WY + A01.WN, 1), '0.36 + 0.64 = 1');

  /* 2. turning both arrows (rotations at the angles shown) keeps a·b */
  for (let k = 0; k <= 40; k++) {
    const ph = -Math.PI + 2 * Math.PI * k / 40, c = Math.cos(ph), s = Math.sin(ph);
    const a = [c, s], b = [c * 0.6 - s * 0.8, s * 0.6 + c * 0.8];
    check(near(a[0] * b[0] + a[1] * b[1], 0.6, 1e-14), `rotation ${k} keeps a·b`);
  }

  /* 3. complex arithmetic: Born weight of a rank-one record on a pure state, Tr(ψψ* φφ*) = |φ*ψ|² */
  const cmul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const conj = x => [x[0], -x[1]];
  const outer = (u, v) => u.map(ui => v.map(vj => cmul(ui, conj(vj))));
  const mm = (X, Y) => X.map((row, i) => Y[0].map((_, j) => row.reduce((s, z, k) => { const p = cmul(z, Y[k][j]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0])));
  const tr = X => X.reduce((s, row, i) => [s[0] + row[i][0], s[1] + row[i][1]], [0, 0]);
  for (let k = 0; k < 30; k++) {
    const n = 2 + (k % 3);
    const phi = Array.from({ length: n }, (_, i) => [2 * rnd(k, i) - 1, 2 * rnd(k, 20 + i) - 1]);
    const psi = Array.from({ length: n }, (_, i) => [2 * rnd(k, 40 + i) - 1, 2 * rnd(k, 60 + i) - 1]);
    const w = tr(mm(outer(psi, psi), outer(phi, phi)));
    const ip = phi.reduce((s, z, i) => { const p = cmul(conj(z), psi[i]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0]);
    check(near(w[0], ip[0] * ip[0] + ip[1] * ip[1], 1e-12) && near(w[1], 0, 1e-12), `rank-one Born weight ${k}`);
  }
  const wr = tr(mm(outer([[0.6, 0], [0.8, 0]], [[0.6, 0], [0.8, 0]]), outer([[1, 0], [0, 0]], [[1, 0], [0, 0]])));
  check(near(wr[0], 0.36) && near(wr[1], 0), 'Tr(ρ P) = 0.36');

  /* 4. P = diag(1, 0): P b = (0.6, 0), P a = a, P² = P */
  const P = [[1, 0], [0, 0]];
  const mv = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
  const Pb = mv(P, A01.B), Pa = mv(P, [1, 0]);
  check(near(Pb[0], 0.6) && Pb[1] === 0 && Pa[0] === 1 && Pa[1] === 0, 'P b, P a');
  check(near(Pb[0] / Math.hypot(Pb[0], Pb[1]), 1), 'rescaled to a');
  const P2 = [[P[0][0] * P[0][0] + P[0][1] * P[1][0], 0], [0, P[1][1] * P[1][1]]];
  check(P2[0][0] === 1 && P2[1][1] === 0, 'P² = P');

  /* 5. pinching: ρ, unread once and twice, Hilbert–Schmidt split, Bloch length */
  const rho = outer([[0.6, 0], [0.8, 0]], [[0.6, 0], [0.8, 0]]);
  check(near(rho[0][0][0], 0.36) && near(rho[0][1][0], 0.48) && near(rho[1][0][0], 0.48) && near(rho[1][1][0], 0.64), 'ρ = [[0.36, 0.48], [0.48, 0.64]]');
  const E0 = [[[1, 0], [0, 0]], [[0, 0], [0, 0]]], E1 = [[[0, 0], [0, 0]], [[0, 0], [1, 0]]];
  const add = (X, Y) => X.map((row, i) => row.map((z, j) => [z[0] + Y[i][j][0], z[1] + Y[i][j][1]]));
  const pin = X => add(mm(mm(E0, X), E0), mm(mm(E1, X), E1));
  const hs = X => tr(mm(X.map((row, i) => row.map((_, j) => conj(X[j][i]))), X))[0];
  const r1 = pin(rho), r2 = pin(r1);
  check(near(r1[0][1][0], 0) && near(r1[0][0][0], 0.36) && near(r1[1][1][0], 0.64), 'unread once');
  check(JSON.stringify(r1) === JSON.stringify(r2), 'unread twice = unread once');
  const diff = rho.map((row, i) => row.map((z, j) => [z[0] - r1[i][j][0], z[1] - r1[i][j][1]]));
  check(near(hs(rho), 1) && near(hs(r1), 0.5392) && near(hs(diff), 0.4608), 'Tr ρ² = 0.5392 + 0.4608');
  check(near(A01.MASS, hs(rho)) && near(A01.KEEP, hs(r1)) && near(A01.WIPE, hs(diff)), 'ledger numbers');
  for (let k = 0; k < 30; k++) {
    const v = [[2 * rnd(k, 101) - 1, 2 * rnd(k, 102) - 1], [2 * rnd(k, 103) - 1, 2 * rnd(k, 104) - 1]];
    const X = outer(v, v), Y = pin(X), Z = X.map((row, i) => row.map((z, j) => [z[0] - Y[i][j][0], z[1] - Y[i][j][1]]));
    check(near(hs(X), hs(Y) + hs(Z), 1e-12), `HS split ${k}`);
    check(JSON.stringify(pin(Y)) === JSON.stringify(Y), `idempotent ${k}`);
  }
  /* Bloch components as traces with the Pauli matrices */
  const PX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], PZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
  const bx = tr(mm(rho, PX))[0], bz = tr(mm(rho, PZ))[0], bz1 = tr(mm(r1, PZ))[0], bx1 = tr(mm(r1, PX))[0];
  check(near(bx, 0.96) && near(bz, -0.28) && near(bx1, 0) && near(bz1, -0.28), 'Bloch (0.96, −0.28) → (0, −0.28)');
  check(near(A01.blen(A01.BLOCH), 1) && near(A01.blen(A01.BLOCH_PIN), 0.28), 'Bloch lengths 1 and 0.28');
});

/* ======================================================================= */
/*                    scene 1 · ONE RULER  (title, then the pair)            */
/* ======================================================================= */
SCENES.a01_title = S => {
  const a = at(S, 0, 0.6) * clamp((S.d - S.u) / 0.5);
  SPINE.rail(S, 1, a);
  if (a > 0.003) {
    badgeQ(S, [[0, null, 'computed'], [2, 'The angle belongs', 'argued']]);
    const O = [640, 560], R = 330;
    /* the outside frame C: dashed axes and grid, crossed out at line 2 */
    const fa = a * (1 - 0.75 * Q(S, 2, 'no third point', 0.8));
    for (let k = -3; k <= 3; k++) {
      if (Math.abs(k) <= 2) dashed(O[0] - 440, O[1] + k * 120, O[0] + 440, O[1] + k * 120, C.dim, fa * (k === 0 ? 0.55 : 0.18), k === 0 ? 2 : 1);
      dashed(O[0] + k * 140, O[1] - 340, O[0] + k * 140, O[1] + 240, C.dim, fa * (k === 0 ? 0.55 : 0.18), k === 0 ? 2 : 1);
    }
    const lw = tw('C · outside frame · 外部坐标架', 22, F.zh, 700);
    const ly = O[1] + 225;
    txt('C · outside frame · 外部坐标架', O[0] - 430, ly, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a });
    const xa = a * Q(S, 2, 'no third point', 0.6);
    line(O[0] - 436, ly - 7, O[0] - 436 + (lw + 12) * xa, ly - 7, C.white, a * 0.9, 3);
    txt('not needed · 用不着', O[0] - 430 + lw + 24, ly, { size: 22, fam: F.zh, w: 700, c: C.white, a: xa });
    /* the pair, turned together */
    const ph = 0.8 * (0.5 - 0.5 * Math.cos(1.25 * Math.max(0, S.u - lineAt(S, 1).s)));
    const pa = A01.tip(O, ph, R), pb = A01.tip(O, ph + A01.ALPHA, R);
    A01.arc(O, ph, ph + A01.ALPHA, 92, C.cyan, a * 0.9);
    txt('θ', ...A01.tip(O, ph + A01.ALPHA / 2, 122), { size: 34, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
    arrow(O[0], O[1], pa[0], pa[1], C.cyan, a, 5);
    arrow(O[0], O[1], pb[0], pb[1], C.now, a, 5);
    txt('a', pa[0] + 22 * Math.cos(ph), pa[1] - 22 * Math.sin(ph) + 10, { size: 32, fam: F.math, w: 700, c: C.cyan, a, align: Math.cos(ph) < -0.2 ? 'right' : 'left' });
    txt('ruler · 尺子', pa[0] + 24, pa[1] + 44, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * 0.8 });
    txt('b', pb[0] + 20 * Math.cos(ph + A01.ALPHA), pb[1] - 20 * Math.sin(ph + A01.ALPHA) + 10, { size: 32, fam: F.math, w: 700, c: C.now, a, align: Math.cos(ph + A01.ALPHA) < -0.2 ? 'right' : 'left' });
    dot(O[0], O[1], 8, 'w', a);
    /* readout: coordinates in C move, the overlap does not */
    const px = 1250, py = 300;
    panel(px, py, 560, 400, a, C.cyan, 'READOUT · 读数');
    const ca = [Math.cos(ph), Math.sin(ph)], cb = [Math.cos(ph + A01.ALPHA), Math.sin(ph + A01.ALPHA)];
    const ra = a * at(S, 1, 0.6) * (1 - 0.7 * Q(S, 2, 'no third point', 0.8));
    txt('turn · 转角', px + 30, py + 80, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
    txt(`${A01.fmt(ph * 180 / Math.PI, 1)}°`, px + 530, py + 80, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra });
    txt('a in C', px + 30, py + 130, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(`(${A01.fmt(ca[0], 3)}, ${A01.fmt(ca[1], 3)})`, px + 530, py + 130, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ra });
    txt('b in C', px + 30, py + 180, { size: 22, fam: F.mono, w: 700, c: C.dim, a: ra });
    txt(`(${A01.fmt(cb[0], 3)}, ${A01.fmt(cb[1], 3)})`, px + 530, py + 180, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.now, a: ra });
    line(px + 30, py + 220, px + 530, py + 220, C.dim, a * 0.5, 1);
    txt('a · b = cos θ', px + 30, py + 285, { size: 30, fam: F.math, w: 700, c: C.cyan, a });
    txt(A01.fmt(ca[0] * cb[0] + ca[1] * cb[1], 3), px + 530, py + 285, { size: 40, fam: F.mono, w: 700, align: 'right', c: C.cyan, a });
    txt(`θ = ${A01.DEG.toFixed(2)}°`, px + 530, py + 345, { size: 26, fam: F.mono, w: 700, align: 'right', c: C.white, a: a * 0.9 });
    const ga = a * Q(S, 2, 'The angle belongs', 0.6);
    txt('the angle belongs to the pair · 夹角只属于这一对', px + 280, py + 450, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ga });
  }
  SPINE.title(S, 1, '破妄·从点到线', 'Breaking illusions: from point to line');
};

/* ======================================================================= */
/*                              scene 2 · THE SHADOW                         */
/* ======================================================================= */
SCENES.a01_shadow = S => {
  const a = A01.fade(S);
  SPINE.rail(S, 1, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed']]);
  const O = [520, 660], R = 460;
  const pa = A01.tip(O, 0, R), pb = A01.tip(O, A01.ALPHA, R), pc = A01.tip(O, 0, R * A01.OV);
  /* light from straight above the ruler */
  const la = a * Q(S, 0, 'Shine a light', 0.8);
  for (let k = 0; k < 7; k++) {
    const x = O[0] + 20 + (pc[0] - O[0] - 40) * k / 6;
    dashed(x, 210, x, O[1] - 6, C.white, la * 0.22, 1.5);
  }
  txt('light · 光', O[0] + 140, 196, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: la * 0.7 });
  line(O[0] - 60, O[1], O[0] + R + 80, O[1], C.cyan, a * 0.35, 1.5);
  arrow(O[0], O[1], pa[0], pa[1], C.cyan, a, 5);
  arrow(O[0], O[1], pb[0], pb[1], C.now, a, 5);
  A01.arc(O, 0, A01.ALPHA, 80, C.cyan, a * 0.85);
  txt('θ', ...A01.tip(O, A01.ALPHA / 2, 108), { size: 32, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  txt('a', pa[0] + 18, pa[1] + 10, { size: 32, fam: F.math, w: 700, c: C.cyan, a });
  txt('b', pb[0] + 14, pb[1] - 6, { size: 32, fam: F.math, w: 700, c: C.now, a });
  /* the drop and the shadow c = (a·b) a */
  const sa = a * Q(S, 0, 'casts a shadow', 0.8);
  dashed(pb[0], pb[1], pc[0], pc[1], C.white, sa * 0.6, 2);
  A01.seg([O[0], O[1]], [lerp(O[0], pc[0], sa), pc[1]], C.cyan, sa, 12);
  txt('c = (a·b) a', (O[0] + pc[0]) / 2, O[1] + 52, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa });
  dot(O[0], O[1], 8, 'w', a);
  /* readout */
  const px = 1180, py = 280, ra = a * at(S, 1, 0.6);
  panel(px, py, 620, 420, a, C.cyan, 'IN THE BASIS OF a · 以 a 自身为基');
  txt('b = 0.6 a + 0.8 a⊥', px + 30, py + 100, { size: 34, fam: F.math, w: 700, c: C.now, a });
  txt('no outside frame used · 不借外部坐标', px + 30, py + 145, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  txt('|c| = a·b = cos θ', px + 30, py + 230, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ra });
  txt(A01.fmt(A01.OV, 1), px + 590, py + 230, { size: 52, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: a * Q(S, 1, 'exactly zero point six', 0.6) });
  txt(`θ = ${A01.DEG.toFixed(2)}°`, px + 30, py + 300, { size: 26, fam: F.mono, w: 700, c: C.white, a: ra * 0.9 });
  txt('the 3 · 4 · 5 triangle · 勾三股四弦五', px + 30, py + 360, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
};

/* ======================================================================= */
/*                           scene 3 · SQUARE THE SHADOW                     */
/* ======================================================================= */
SCENES.a01_born = S => {
  const a = A01.fade(S);
  SPINE.rail(S, 1, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Why squares', 'argued'], [3, 'Lean checks', 'lean'], [4, 'We like to think', 'argued']]);
  const O = [640, 540], R = 300;
  const pb = A01.tip(O, A01.ALPHA, R), x6 = O[0] + 0.6 * R, y8 = O[1] - 0.8 * R;
  /* two answers: the line of a and the line at right angles */
  line(O[0] - 40, O[1], O[0] + R + 60, O[1], C.cyan, a * 0.35, 1.5);
  line(O[0], O[1] + 40, O[0], O[1] - R - 60, C.dim, a * 0.5, 1.5);
  txt('yes · 是 · a', O[0] + R + 20, O[1] + 40, { size: 24, fam: F.zh, w: 700, c: C.cyan, a });
  txt('no · 否 · a⊥', O[0] - 14, O[1] - 0.8 * R - 22, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.white, a: a * 0.85 });
  const qa = a * Q(S, 0, 'are you a', 0.6);
  txt('are you a? · 你是 a 吗？', O[0] + 280, 215, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.now, a: qa });
  /* shadows and their squares */
  const s1 = a * Q(S, 1, 'the shadow squared', 0.8), s2 = a * Q(S, 1, 'No gets', 0.8);
  A01.seg(O, [x6, O[1]], C.cyan, a, 10);
  A01.seg(O, [O[0], y8], C.cyan, a * 0.75, 10);
  dashed(pb[0], pb[1], x6, O[1], C.white, a * 0.45, 1.5);
  dashed(pb[0], pb[1], O[0], y8, C.white, a * 0.45, 1.5);
  txt('0.6', (O[0] + x6) / 2, O[1] - 18, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a });
  txt('0.8', O[0] + 18, (O[1] + y8) / 2 + 8, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * 0.9 });
  A01.fillRect(O[0], O[1], 0.6 * R * ease(s1 / Math.max(a, 1e-6)), 0.6 * R * ease(s1 / Math.max(a, 1e-6)), C.cyan, s1 * 0.16);
  box(O[0], O[1], 0.6 * R, 0.6 * R, C.cyan, s1 * 0.8, 1.5);
  txt('0.6² = 0.36', O[0] + 0.3 * R, O[1] + 0.3 * R + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: s1 });
  box(O[0] - 0.8 * R, y8, 0.8 * R, 0.8 * R, C.cyan, s2 * 0.6, 1.5);
  A01.fillRect(O[0] - 0.8 * R, y8, 0.8 * R, 0.8 * R, C.cyan, s2 * 0.1);
  txt('0.8² = 0.64', O[0] - 0.4 * R, O[1] - 0.4 * R + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.white, a: s2 });
  txt('squares here are weights, not oriented areas', O[0] - 14, O[1] + 36, { size: 17, fam: F.disp, w: 700, align: 'right', c: C.dim, a: s2 });
  txt('这里的平方是权重，不是有向面积', O[0] - 14, O[1] + 62, { size: 17, fam: F.zh, w: 700, align: 'right', c: C.dim, a: s2 });
  arrow(O[0], O[1], pb[0], pb[1], C.now, a, 5);
  txt('b', pb[0] + 14, pb[1] - 6, { size: 32, fam: F.math, w: 700, c: C.now, a });
  dot(O[0], O[1], 8, 'w', a);
  /* right: the weights */
  const px = 1180, py = 260;
  panel(px, py, 620, 250, a * Q(S, 1, 'Yes gets weight', 0.6), C.cyan, 'WEIGHTS · 权重');
  A01.bar(px + 30, py + 70, 560, 64, [[A01.WY, C.cyan, 'yes 0.36', s1 / Math.max(a, 1e-6)], [A01.WN, C.white, 'no 0.64', s2 / Math.max(a, 1e-6)]], a * Q(S, 1, 'Yes gets weight', 0.6));
  const pyth = a * Q(S, 2, 'adds up to one', 0.6);
  txt('0.36 + 0.64 = 1', px + 310, py + 200, { size: 34, fam: F.mono, w: 700, align: 'center', c: C.white, a: pyth });
  txt('Pythagoras keeps the books · 勾股定理记账', px + 310, py + 238, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: a * Q(S, 2, 'only the square', 0.6) });
  /* Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6) * (1 - 0.0);
  panel(px, py + 290, 620, 190, la, C.lean, 'RANK-ONE RECORD · 单线记录');
  txt('P = φφ*,  ρ = ψψ*', px + 30, py + 375, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
  txt('Tr(ρP) = |φ*ψ|²', px + 30, py + 425, { size: 32, fam: F.math, w: 700, c: C.lean, a: la });
  A01.lean(px, py + 530, 'born', la, 17);
  /* the aphorism */
  const ma = a * Q(S, 4, 'A probability is', 0.7);
  if (ma > 0.003) {
    panel(260, 748, 760, 92, ma, C.argued);
    txt('A probability is a meeting of two.', 640, 788, { size: 28, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma });
    txt('概率是两者的相遇', 640, 824, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma });
  }
};

/* ======================================================================= */
/*                              scene 4 · SIFT TWICE                         */
/* ======================================================================= */
SCENES.a01_sieve = S => {
  const a = A01.fade(S);
  SPINE.rail(S, 1, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Like a sieve', 'argued'], [2, 'In symbols', 'computed'], [3, 'How do we know', 'argued']]);
  const O = [460, 640], R = 420;
  const k0 = Q(S, 0, 'drops the rest', 1.0), k1 = clamp((S.u - phraseAt(S, 0, 'drops the rest') - 1.2) / 0.8);
  const pb = A01.tip(O, A01.ALPHA, R), x6 = O[0] + 0.6 * R;
  line(O[0] - 40, O[1], O[0] + R + 80, O[1], C.cyan, a * 0.35, 1.5);
  arrow(O[0], O[1], O[0] + R, O[1], C.cyan, a * 0.5, 3);
  txt('a', O[0] + R + 16, O[1] + 34, { size: 30, fam: F.math, w: 700, c: C.cyan, a });
  /* the dropped part (the a⊥ component) leaves */
  const sh = a * Q(S, 0, 'keeps the shadow', 0.6);
  A01.seg(O, [x6, O[1]], C.cyan, sh, 10);
  line(x6, O[1], pb[0], pb[1] - 60 * k0, C.mag, a * (1 - k0) * 0.9, 3);
  if (k0 > 0 && k0 < 1) txt('dropped · 扔掉', x6 + 20, O[1] - 0.4 * R - 60 * k0, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * Math.sin(Math.PI * k0) });
  /* the current state: b, then (once read) rescaled onto a */
  const cur = 1 - k0;
  arrow(O[0], O[1], pb[0], pb[1], C.now, a * cur, 5);
  if (k1 > 0) {
    const len = lerp(0.6, 1, ease(k1)) * R;
    arrow(O[0], O[1], O[0] + len, O[1], C.now, a * clamp(k1 * 3), 5);
    txt('after: a · 读后态', O[0] + len - 10, O[1] - 44, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.now, a: a * clamp(k1 * 3) });
  }
  txt('b', pb[0] + 14, pb[1] - 6, { size: 32, fam: F.math, w: 700, c: C.now, a: a * cur });
  dot(O[0], O[1], 8, 'w', a);
  /* right: P acting twice */
  const px = 1080, py = 230, cell = 66;
  panel(px, py, 720, 440, a, C.cyan, 'THE RECORD · 记录 · P = diag(1, 0)');
  const r1 = a * Q(S, 0, 'Suppose the answer', 0.6);
  txt('P', px + 40, py + 125, { size: 40, fam: F.math, w: 700, c: C.white, a: r1 });
  A01.vec(px + 85, py + 70, cell * 0.6, [['0.6', C.now], ['0.8', C.now]], r1, 24);
  txt('=', px + 190, py + 125, { size: 36, fam: F.math, w: 700, c: C.white, a: r1 });
  A01.vec(px + 235, py + 70, cell * 0.6, [['0.6', C.cyan], ['0', C.dim]], r1 * sh, 24);
  txt('→ ÷ 0.6 →', px + 350, py + 125, { size: 24, fam: F.mono, w: 700, c: C.dim, a: a * k1 });
  A01.vec(px + 510, py + 70, cell * 0.6, [['1', C.now], ['0', C.dim]], a * k1, 24);
  const r2 = a * Q(S, 1, 'Ask again', 0.6);
  txt('P', px + 40, py + 265, { size: 40, fam: F.math, w: 700, c: C.white, a: r2 });
  A01.vec(px + 85, py + 210, cell * 0.6, [['1', C.now], ['0', C.dim]], r2, 24);
  txt('=', px + 190, py + 265, { size: 36, fam: F.math, w: 700, c: C.white, a: r2 });
  A01.vec(px + 235, py + 210, cell * 0.6, [['1', C.now], ['0', C.dim]], r2, 24);
  txt('nothing dropped · 无可再扔', px + 350, py + 265, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 1, 'nothing more is dropped', 0.6) });
  const r3 = a * Q(S, 2, 'In symbols', 0.6);
  txt('P² = P', px + 360, py + 390, { size: 60, fam: F.math, w: 700, align: 'center', c: C.white, a: r3, ab: 1 });
  /* the sieve (analogy) */
  const sv = a * Q(S, 2, 'Like a sieve', 0.6);
  if (sv > 0.003) {
    txt('analogy · 比方：what passed once passes again', 560, 196, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: sv });
    for (const [cx, lumps, lab, zh] of [[400, 1, 'pass 1', '第一遍：拦下疙瘩'], [720, 0, 'pass 2', '第二遍：一粒不拦']]) {
      A01.sieve(cx, 330, 220, sv, lumps);
      for (let k = 0; k < 14; k++) {
        const gx = cx - 95 + 190 * rnd(k, 3), yy = 230 + ((S.t * (120 + 60 * rnd(k, 4)) + 260 * rnd(k, 5)) % 260);
        dot(gx, yy, 3.5, 'c', sv * 0.85 * clamp((yy - 230) / 30) * clamp((490 - yy) / 40));
      }
      txt(`${lab} · ${zh}`, cx, 530, { size: 20, fam: F.zh, w: 700, align: 'center', c: lumps ? C.mag : C.cyan, a: sv });
    }
  }
  /* the aphorism */
  const ma = a * Q(S, 3, 'Because asking twice', 0.7);
  if (ma > 0.003) {
    panel(1080, 710, 720, 100, ma, C.argued);
    txt('A thing is there if asking twice agrees.', 1440, 755, { size: 26, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma });
    txt('问两遍答案一样，东西才算“在那里”', 1440, 790, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma });
  }
};

/* ======================================================================= */
/*                              scene 5 · LOOK AWAY                          */
/* ======================================================================= */
SCENES.a01_away = S => {
  const a = A01.fade(S);
  SPINE.rail(S, 1, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, 'On the Bloch disk', 'computed']]);
  /* the matrix of b, then its corners wiped */
  const wipe = Q(S, 2, 'are wiped to zero', 0.9);
  const cell = 96, mx = 170, my = 250;
  txt('ρ = b b*', mx, my - 22, { size: 30, fam: F.math, w: 700, c: C.white, a });
  const corner = v => [wipe < 0.5 ? A01.fmt(v) : '0', C.mag, wipe < 0.5 ? 1 - 2 * wipe * 0.6 : 0.5 + (wipe - 0.5)];
  A01.mat(mx, my, cell, [['0.36', C.cyan], corner(A01.RHO[0][1]), corner(A01.RHO[1][0]), ['0.64', C.cyan]], a, 28);
  const ca = a * Q(S, 2, 'the two corners', 0.6) * (1 - wipe);
  ring(mx + cell * 1.5, my + cell * 0.5, 44, C.mag, ca, 2.5); ring(mx + cell * 0.5, my + cell * 1.5, 44, C.mag, ca, 2.5);
  /* the blend */
  const ba = a * Q(S, 1, 'becomes a blend', 0.6);
  txt('unread · 未读：ρ ↦ P₀ρP₀ + P₁ρP₁', mx + 260, my + 60, { size: 26, fam: F.zh, w: 700, c: C.white, a: ba });
  A01.bar(mx + 260, my + 100, 470, 56, [[A01.WY, C.cyan, 'yes 0.36'], [A01.WN, C.white, 'no 0.64']], ba, 22);
  txt('the diagonal stays · 对角不动', mx + 260, my + 190, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ba * 0.9 });
  /* the ledger: Tr ρ² = kept + wiped */
  const la = a * Q(S, 3, 'the total splits', 0.6);
  const lx = 170, ly = 520;
  txt('Tr ρ²  =  Tr (𝒫ρ)²  +  Tr (ρ − 𝒫ρ)²', lx, ly, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
  A01.bar(lx, ly + 24, 800, 56, [[A01.KEEP, C.cyan, `stays ${A01.KEEP.toFixed(4)}`], [A01.WIPE, C.mag, `wiped ${A01.WIPE.toFixed(4)}`]], la, 22);
  txt(`= ${A01.MASS.toFixed(0)}`, lx + 820, ly + 62, { size: 30, fam: F.mono, w: 700, c: C.white, a: la });
  A01.lean(lx, ly + 145, 'split', la, 18);
  const ta = a * Q(S, 3, 'Unread twice', 0.6);
  txt('𝒫 ∘ 𝒫 = 𝒫', lx, ly + 205, { size: 30, fam: F.math, w: 700, c: C.lean, a: ta });
  A01.lean(lx + 200, ly + 205, 'twice', ta, 18);
  /* the Bloch disk (x–z slice) */
  const bc = [1500, 470], BR = 230, sk = Q(S, 4, 'pulls in off the rim', 1.4);
  const da = a * Q(S, 4, 'On the Bloch disk', 0.6);
  ring(bc[0], bc[1], BR, C.white, da * 0.5, 2);
  line(bc[0] - BR - 20, bc[1], bc[0] + BR + 20, bc[1], C.dim, da * 0.5, 1);
  line(bc[0], bc[1] - BR - 20, bc[0], bc[1] + BR + 20, C.dim, da * 0.5, 1);
  txt('z · yes', bc[0] + 10, bc[1] - BR - 26, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: da });
  txt('x', bc[0] + BR + 26, bc[1] + 6, { size: 20, fam: F.math, w: 700, c: C.dim, a: da });
  txt('Bloch disk · 布洛赫圆盘', bc[0], bc[1] + BR + 50, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: da });
  txt('angles double here · 圆盘上角度加倍', bc[0], bc[1] + BR + 80, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: da });
  /* the state before it was left unread: a dashed ghost; the unread state: the amber arrow, pulled in onto the z axis */
  const rx = A01.BLOCH[0] * (1 - ease(sk)), rz = A01.BLOCH[2];
  const tipB = [bc[0] + BR * rx, bc[1] - BR * rz];
  dashed(bc[0], bc[1], bc[0] + BR * A01.BLOCH[0], bc[1] - BR * rz, C.white, da * 0.45, 2);
  arrow(bc[0], bc[1], tipB[0], tipB[1], C.now, da, 5);
  txt('before · 读前', bc[0] - BR - 16, bc[1] + 170, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.white, a: da * 0.75 });
  txt(`r = (${A01.fmt(A01.BLOCH[0])}, ${A01.fmt(rz)}) · |r| = ${A01.blen(A01.BLOCH).toFixed(2)}`, bc[0] - BR - 16, bc[1] + 196, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.white, a: da * 0.75 });
  const fa = da * clamp((sk - 0.85) / 0.15);
  txt('unread · 未读', bc[0] - BR - 16, bc[1] + 236, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.now, a: fa });
  txt(`r = (${A01.fmt(A01.BLOCH_PIN[0])}, ${A01.fmt(A01.BLOCH_PIN[2])}) · |r| = ${A01.blen(A01.BLOCH_PIN).toFixed(2)}`, bc[0] - BR - 16, bc[1] + 264, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.now, a: fa });
};

/* ======================================================================= */
/*                              scene 6 · NEXT QUESTION                      */
/* ======================================================================= */
SCENES.a01_next = S => {
  const a = A01.fade(S);
  SPINE.rail(S, 1, a);
  if (a <= 0.003) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'But each number', 'argued']]);
  const steps = [['a pair', '一对', 'a'], ['a shadow', '影子', '0.6'], ['a square', '平方', '0.36'], ['a sieve', '筛子', 'P² = P'], ['a fade', '淡出', '0.28']];
  const ks = ['a pair', 'a shadow', 'a square', 'a sieve', 'a fade'];
  steps.forEach((s, i) => {
    const ca = a * Q(S, 0, ks[i], 0.5);
    const x = 360 + i * 300, y = 300;
    chip(x, y, 250, 80, '', C.cyan, ca);
    txt(`${s[0]} · ${s[1]}`, x, y - 4, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca });
    txt(s[2], x, y + 26, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca });
    if (i < 4) arrow(x + 130, y, x + 168, y, C.dim, ca * 0.8, 2);
  });
  /* every number says how much, on one line; the turning is missing */
  const la = a * Q(S, 1, 'each number', 0.6);
  const y0 = 500, x0 = 360, L = 1200;
  line(x0, y0, x0 + L, y0, C.cyan, la, 3);
  [[0.28, '0.28'], [0.36, '0.36'], [0.6, '0.6'], [1, '1']].forEach(([v, s]) => {
    line(x0 + L * v, y0 - 14, x0 + L * v, y0 + 14, C.cyan, la, 2);
    txt(s, x0 + L * v, y0 + 46, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: la });
  });
  txt('0', x0, y0 + 46, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: la });
  const ra = a * Q(S, 1, 'None of them can turn', 0.6);
  if (ra > 0.003) {
    const c = [x0 + L + 130, y0 - 10], r = 46, sp = S.u * 1.4;
    ctx.save(); ctx.globalAlpha = ra * 0.85; ctx.strokeStyle = C.argued; ctx.lineWidth = 3; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.arc(c[0], c[1], r, sp, sp + 4.6); ctx.stroke(); ctx.restore();
    txt('?', c[0], c[1] + 14, { size: 40, fam: F.disp, w: 700, align: 'center', c: C.argued, a: ra });
  }
  SPINE.ask(S, 2, 'A line can tell how much. Where does the turning live?', '线只说得出“有多少”。转动藏在哪里？');
};

/* ---- a02 · Unfolding wings: from line to plane · 展翼·从线到面 ---- */
/* Act a02 of the long film No Third Point · 不借第三点 — Part II (chapters 5–8), Unfolding wings: from line to plane.

   What each scene shows, and where it rests:
     a02_title    one arrow casts a shadow (a line); a pencil turning on a tabletop (analogy, argued); two arrows span a
                  parallelogram, a plane and an area (schematic).
     a02_quarter  a clock hand e₁ → e₂ → −e₁ by two quarter turns, e₁I = e₂, e₂I = −e₁, I² = −1 (computed); "nothing
                  imaginary" (the book's reading, argued); J := 2AB*, AB* + BA* = 0, AA* = ½I, B*B = ½I ⟹ J² = −I
                  ..... BalancedUnitaryComplexStructure.relativeComplexStructure_square (LEAN); example A = I/√2,
                  B = R/√2 gives J = [[0, −1], [1, 0]] (computed).
     a02_product  A = (3, 1), B = (1, 3): A·B = 6, A∧B = 8I, |A|²|B|² = 100 = 36 + 64 (computed)
                  ..... LagrangeGramIdentity.lagrange_gram_identity (LEAN); AB = A·B + A∧B = 6 + 8I (computed);
                  line = particle, area = wave (the book's reading, argued).
     a02_time     a swept area as quantum time and records as classical ticks (the book's reading, argued); a revolving
                  door (analogy, argued); anchor a at 45° from two perpendicular records, 45° + 45° = 90°
                  ..... FubiniStudyRecordTime.record_time_lower_bound (LEAN).
     a02_erase    a turn undone; |+⟩ squashed onto the record line, S = h((1 + r)/2) from 0 to ln 2 ≈ 0.693 (computed);
                  a reset with one bath qubit (p = 0.9) brings the arrow back to r = 0.8, S: ln 2 → 0.325 (computed); an eraser
                  (analogy, argued); βQ = −ΔS + I + D, I, D ≥ 0 ⟹ −ΔS ≤ βQ
                  ..... LandauerBound.landauer_bound_of_balance (LEAN); one bath qubit at p = 0.9 (chapter 8's
                  worked example): −ΔS = 0.368, I = 0, D = 0.511, βQ = 0.879 (computed); the arrow of time (argued).
     a02_ask      the four strokes of Part II; in a plane one perpendicular partner only; the next question.

   On load, FILM.init looks up each of this act's four GIDs with leanCite (never counting or walking DATA.lean) and re-derives every number shown by an independent
   route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
const A02 = (() => {
  const DEG = Math.PI / 180;
  const GID = {
    relativeComplexStructure_square: 'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.relativeComplexStructure_square',
    lagrange_gram_identity: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
    record_time_lower_bound: 'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
    landauer_bound_of_balance: 'D5/S3/DivergenceSupport/LandauerBound.landauer_bound_of_balance'
  };
  /* ---- exact quantities ---- */
  const VA = [3, 1], VB = [1, 3];
  const dot2 = (u, v) => u[0] * v[0] + u[1] * v[1];
  const wedge2 = (u, v) => u[0] * v[1] - u[1] * v[0];
  const DOT = dot2(VA, VB), WEDGE = wedge2(VA, VB), N2A = dot2(VA, VA), N2B = dot2(VB, VB);
  /* 2×2 real matrices as [[a, b], [c, d]] */
  const mm = (X, Y) => [[X[0][0] * Y[0][0] + X[0][1] * Y[1][0], X[0][0] * Y[0][1] + X[0][1] * Y[1][1]],
                        [X[1][0] * Y[0][0] + X[1][1] * Y[1][0], X[1][0] * Y[0][1] + X[1][1] * Y[1][1]]];
  const tr = X => [[X[0][0], X[1][0]], [X[0][1], X[1][1]]];
  const add = (X, Y) => X.map((r, i) => r.map((x, j) => x + Y[i][j]));
  const sc = (k, X) => X.map(r => r.map(x => k * x));
  const R2 = Math.SQRT1_2;
  const MA = [[R2, 0], [0, R2]], MB = [[0, R2], [-R2, 0]];
  const MJ = sc(2, mm(MA, tr(MB)));
  /* entropy (nats) of a qubit whose Bloch arrow has length r */
  const hb = p => (p <= 0 || p >= 1 ? 0 : -p * Math.log(p) - (1 - p) * Math.log(1 - p));
  const Sr = r => hb((1 + r) / 2);
  /* chapter 8's one-bath-qubit swap at ground population p */
  const bath = p => {
    const drop = Math.LN2 - hb(p), D = -Math.LN2 - 0.5 * Math.log(p * (1 - p)), bQ = (p - 0.5) * Math.log(p / (1 - p));
    return { drop, I: 0, D, bQ };
  };
  const BATH = bath(0.9);
  const BATH_R = 2 * 0.9 - 1;   /* the system after the swap is diag(0.9, 0.1): Bloch length 0.8 */

  /* ---- drawing helpers ---- */
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const num = (v, n = 3) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(n);
  function rich(parts, x, y, o = {}) {
    const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
    for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
    return cx;
  }
  const MISSING = new Set();
  function lean(x, y, gid, a, o = {}) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return;
    }
    const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  function poly(pts, col, a, fill = 0.25, lw = 2.5, dash = null) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath();
    if (fill) { ctx.fillStyle = rgba(col, fill); ctx.fill(); }
    if (lw) { if (dash) ctx.setLineDash(dash); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
    ctx.restore();
  }
  /* an arc of radius r about (cx, cy), from math angle a0 to a1 (radians, counter-clockwise, y up) */
  function arc(cx, cy, r, a0, a1, col, a, lw = 3, dash = null) {
    if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.stroke(); ctx.restore();
  }
  function fan(cx, cy, r, a0, a1, col, a, fill = 0.22) {
    if (a <= 0.003 || Math.abs(a1 - a0) < 1e-4) return;
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(col, fill);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -a0, -a1, a1 > a0); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  /* an arrowhead at the end of an arc (direction of travel) */
  function arcHead(cx, cy, r, ang, dir, col, a) {
    if (a <= 0.003) return;
    const x = cx + r * Math.cos(ang), y = cy - r * Math.sin(ang);
    const tx = -Math.sin(ang) * dir, ty = -Math.cos(ang) * dir, L = 14;
    const an = Math.atan2(ty, tx);
    line(x, y, x - L * Math.cos(an - 0.45), y - L * Math.sin(an - 0.45), col, a, 3);
    line(x, y, x - L * Math.cos(an + 0.45), y - L * Math.sin(an + 0.45), col, a, 3);
  }
  const P = (O, k, v) => [O[0] + k * v[0], O[1] - k * v[1]];
  return { DEG, GID, VA, VB, DOT, WEDGE, N2A, N2B, mm, tr, add, sc, MA, MB, MJ, hb, Sr, bath, BATH, BATH_R,
           fade, num, rich, lean, poly, arc, fan, arcHead, P };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('no-third-point a02: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
  /* 0. the cited theorems at the pinned commit */
  for (const [short, gid] of Object.entries(A02.GID)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }
  /* 1. quarter turns: e₁ → e₂ → −e₁ under the matrix J, and the balanced halves of the example */
  const { MA, MB, MJ, mm, tr, add, sc } = A02;
  const eq = (X, Y) => X.every((r, i) => r.every((x, j) => near(x, Y[i][j], 1e-12)));
  check(eq(MJ, [[0, -1], [1, 0]]), 'J = [[0, −1], [1, 0]]');
  check(eq(add(mm(MA, tr(MB)), mm(MB, tr(MA))), [[0, 0], [0, 0]]), 'AB* + BA* = 0');
  check(eq(mm(MA, tr(MA)), [[0.5, 0], [0, 0.5]]) && eq(mm(tr(MB), MB), [[0.5, 0], [0, 0.5]]), 'AA* = B*B = ½I');
  check(eq(mm(MJ, MJ), [[-1, 0], [0, -1]]), 'J² = −I');
  const S = add(MA, MB);
  check(eq(mm(S, tr(S)), [[1, 0], [0, 1]]), 'S = A + B is unitary');
  const Je1 = [MJ[0][0], MJ[1][0]], Je2 = [MJ[0][1], MJ[1][1]];
  check(near(Je1[0], 0) && near(Je1[1], 1) && near(Je2[0], -1) && near(Je2[1], 0), 'J sends e₁ → e₂ → −e₁');
  /* 2. the two arrows (3, 1), (1, 3) */
  check(A02.DOT === 6 && A02.WEDGE === 8 && A02.N2A === 10 && A02.N2B === 10, 'A·B = 6, A∧B = 8, |A|² = |B|² = 10');
  check(A02.N2A * A02.N2B === 100 && 36 + 64 === 100 && A02.DOT * A02.DOT + A02.WEDGE * A02.WEDGE === 100, '100 = 36 + 64');
  const th = Math.atan2(A02.WEDGE, A02.DOT);
  check(near(Math.cos(th) * 10, 6, 1e-12) && near(Math.sin(th) * 10, 8, 1e-12), 'cos θ = 0.6, sin θ = 0.8');
  /* the Lagrange identity on random real lists, by the double sum */
  for (let k = 0; k < 40; k++) {
    const n = 1 + (k % 6), u = [], v = [];
    for (let i = 0; i < n; i++) { u.push(4 * rnd(k, i) - 2); v.push(4 * rnd(k, i + 30) - 2); }
    const d = u.reduce((s, x, i) => s + x * v[i], 0), nu = u.reduce((s, x) => s + x * x, 0), nv = v.reduce((s, x) => s + x * x, 0);
    let half = 0; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) half += Math.pow(u[i] * v[j] - u[j] * v[i], 2);
    check(Math.abs(nu * nv - d * d - half / 2) < 1e-9, `Lagrange identity ${k}`);
  }
  /* 3. the speed limit: an anchor at 45° between perpendicular records, Fubini–Study angles */
  const fs = (x, y) => Math.acos(Math.min(1, Math.abs(x[0] * y[0] + x[1] * y[1])));
  const m0 = [1, 0], m1 = [0, 1], an = [Math.SQRT1_2, Math.SQRT1_2];
  check(near(fs(m0, m1), Math.PI / 2) && near(fs(an, m0) + fs(an, m1), Math.PI / 2), '45° + 45° = 90°');
  /* with E = ħ = 1 the smallest τ with both angles ≤ Eτ/ħ is π/4 = πħ/(4E) */
  check(near(Math.max(fs(an, m0), fs(an, m1)), Math.PI / 4), 'τ_min = π/4 at the 45° anchor');
  for (let k = 0; k < 40; k++) {   /* any anchor on the circle: the larger angle is at least π/4 */
    const t = TAU * rnd(k, 90), a = [Math.cos(t), Math.sin(t)];
    check(Math.max(fs(a, m0), fs(a, m1)) >= Math.PI / 4 - 1e-12, `record time bound ${k}`);
  }
  /* 4. erasure: S(r) from 0 to ln 2, and chapter 8's bath row p = 0.9 */
  check(near(A02.Sr(1), 0) && near(A02.Sr(0), Math.LN2) && Math.LN2.toFixed(3) === '0.693', 'S: 0 → ln 2 ≈ 0.693');
  const B = A02.BATH;
  check(B.drop.toFixed(3) === '0.368' && B.D.toFixed(3) === '0.511' && B.bQ.toFixed(3) === '0.879', 'bath row 0.368, 0.511, 0.879');
  check(near(B.bQ, B.drop + B.I + B.D, 1e-12), 'βQ = −ΔS + I + D');
  check(B.drop <= B.bQ && B.D > 0, 'the Landauer bound holds, strictly');
  check(near(A02.BATH_R, 0.8) && A02.Sr(A02.BATH_R).toFixed(3) === '0.325' && near(Math.LN2 - A02.Sr(A02.BATH_R), B.drop, 1e-12), 'reset to r = 0.8: S = 0.325, drop 0.368');
  check((6 / Math.sqrt(10)).toFixed(2) === '1.90' && near(Math.sqrt(10) * 6 / Math.sqrt(10), 6), 'the shadow of B on A is 6/√10 ≈ 1.90');
  /* the same row from the bath's populations: Gibbs (0.9, 0.1) → (½, ½), βE = ln 9 */
  const D2 = 0.5 * Math.log(0.5 / 0.9) + 0.5 * Math.log(0.5 / 0.1), bQ2 = Math.log(9) * (0.5 - 0.1);
  check(near(D2, B.D, 1e-12) && near(bQ2, B.bQ, 1e-12), 'bath row from populations');
});

/* ======================================================================= */
/*                          scene 1 · WHICH WAY TO TURN                      */
/* ======================================================================= */
SCENES.a02_title = S => {
  const u = S.u, end = clamp((S.d - u) / 0.5);
  SPINE.rail(S, 2, at(S, 0, 0.6));
  const a = clamp((u - lineAt(S, 0).s + 0.2) / 0.7) * end;
  if (a > 0.003) {
    badgeQ(S, [[0, 'A shadow', 'argued']]);
    const O = [420, 700], R = 430, tA = 8 * A02.DEG, tB = 58 * A02.DEG;
    const A = [Math.cos(tA), Math.sin(tA)], B = [Math.cos(tB), Math.sin(tB)], d = A[0] * B[0] + A[1] * B[1];
    const pa = A02.P(O, R, A), pb = A02.P(O, R, B), pab = A02.P(O, R, [A[0] + B[0], A[1] + B[1]]), foot = A02.P(O, R, [A[0] * d, A[1] * d]);
    /* the area (line 2) */
    const ar = Q(S, 2, 'Two arrows that disagree', 0.9);
    A02.poly([O, pa, pab, pb], C.mag, a * ar, 0.24, 2.5);
    if (ar > 0.01) {
      txt('area · 面积', (O[0] + pab[0]) / 2 + 10, (O[1] + pab[1]) / 2 + 10, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * Q(S, 2, 'an area between them', 0.6) });
      txt('plane · 面', pab[0] + 18, pab[1] + 6, { size: 26, fam: F.zh, w: 700, c: C.mag, a: a * ar * 0.9 });
    }
    /* the shadow (line 0) */
    const sh = Q(S, 0, 'A shadow', 0.8);
    line(O[0], O[1], foot[0], foot[1], C.cyan, a * sh, 8);
    dashed(pb[0], pb[1], foot[0], foot[1], C.white, a * 0.45 * sh, 1.5);
    txt('how much · 有多少', (O[0] + foot[0]) / 2 + 10, (O[1] + foot[1]) / 2 + 46, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * sh });
    arrow(O[0], O[1], pa[0], pa[1], C.white, a, 5);
    arrow(O[0], O[1], pb[0], pb[1], C.now, a * Q(S, 0, 'A shadow', 0.5), 5);
    txt('A', pa[0] + 16, pa[1] + 10, { size: 34, fam: F.math, w: 700, c: C.white, a });
    txt('B', pb[0] + 12, pb[1] - 12, { size: 34, fam: F.math, w: 700, c: C.now, a: a * Q(S, 0, 'A shadow', 0.5) });
    /* which way? two candidate turns, before the plane appears */
    const wq = a * Q(S, 0, 'which way to turn', 0.6) * (1 - ar);
    if (wq > 0.003) {
      A02.arc(O[0], O[1], R + 40, tB + 0.05, tB + 0.32, C.dim, wq, 2.5, [6, 6]);
      A02.arc(O[0], O[1], R + 40, tB - 0.05, tB - 0.32, C.dim, wq, 2.5, [6, 6]);
      txt('which way? · 往哪转？', pb[0] + 70, pb[1] - 70, { size: 26, fam: F.zh, w: 700, c: C.white, a: wq });
    }
    /* the analogy (line 1): a pencil turning on a tabletop */
    const pa1 = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.6));
    if (pa1 > 0.003) {
      panel(1180, 220, 640, 400, pa1, C.argued, 'ANALOGY · 比方');
      const c = [1500, 450];
      A02.poly([[c[0] - 260, c[1] + 70], [c[0] + 180, c[1] + 70], [c[0] + 260, c[1] - 70], [c[0] - 180, c[1] - 70]], C.argued, pa1, 0.12, 2);
      const ang = 0.4 + 1.6 * ease(at(S, 1, 3.2, 0.4)), L = 150;
      const dx = L * Math.cos(ang), dy = 0.38 * L * Math.sin(ang);
      line(c[0] - dx, c[1] + dy, c[0] + dx, c[1] - dy, C.white, pa1, 7);
      dot(c[0] + dx, c[1] - dy, 7, 'w', pa1);
      txt('a pencil turns on the tabletop', 1210, 588, { size: 20, fam: F.mono, w: 700, c: C.argued, a: pa1 });
      txt('铅笔在桌面上转', 1210, 280, { size: 24, fam: F.zh, w: 700, c: C.white, a: pa1 });
    }
    /* line 2 caption */
    const ca = a * at(S, 2, 0.6, 1.2);
    if (ca > 0.003) {
      A02.rich([['one arrow → ', C.white], ['line', C.cyan], ['    two arrows → ', C.white], ['plane', C.mag]], 1180, 700, { size: 28, a: ca, fam: F.disp });
      A02.rich([['一支 → ', C.white], ['线', C.cyan], ['        两支 → ', C.white], ['面', C.mag]], 1180, 750, { size: 28, a: ca, fam: F.zh });
    }
  }
  SPINE.title(S, 2, '展翼·从线到面', 'Unfolding wings: from line to plane');
};

/* ======================================================================= */
/*                           scene 2 · THE QUARTER TURN                      */
/* ======================================================================= */
SCENES.a02_quarter = S => {
  SPINE.rail(S, 2, 1);
  const a = A02.fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued'], [3, 'Lean checks', 'lean']]);
  const O = [520, 500], R = 250, D = A02.DEG;
  const q1 = ease(Q(S, 0, 'Give it a quarter turn', 1.1)), q2 = ease(Q(S, 0, 'Another quarter turn', 1.1));
  const th = 90 * D * (q1 + q2);
  /* the dial */
  ring(O[0], O[1], R, C.dim, a * 0.6, 2);
  for (let k = 0; k < 12; k++) { const t = k * 30 * D; line(O[0] + (R - 14) * Math.cos(t), O[1] - (R - 14) * Math.sin(t), O[0] + R * Math.cos(t), O[1] - R * Math.sin(t), C.dim, a * 0.7, 2); }
  for (const [t, l] of [[0, 'E · 东'], [90, 'N · 北'], [180, 'W · 西'], [270, 'S · 南']]) {
    const x = O[0] + (R + 48) * Math.cos(t * D), y = O[1] - (R + 48) * Math.sin(t * D) + 9;
    txt(l, x, y, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  }
  /* the turns, violet */
  if (q1 > 0.001) { A02.arc(O[0], O[1], 0.55 * R, 0, Math.min(th, 90 * D), C.vio, a, 4); A02.arcHead(O[0], O[1], 0.55 * R, Math.min(th, 90 * D), 1, C.vio, a); }
  if (q2 > 0.001) { A02.arc(O[0], O[1], 0.72 * R, 90 * D, th, C.vio, a, 4); A02.arcHead(O[0], O[1], 0.72 * R, th, 1, C.vio, a); }
  const ia = a * Q(S, 1, 'Call one quarter turn I', 0.6);
  if (ia > 0.003) {
    txt('×I', O[0] + 0.55 * R * Math.cos(45 * D) + 16, O[1] - 0.55 * R * Math.sin(45 * D) - 8, { size: 28, fam: F.math, w: 700, c: C.vio, a: ia });
    txt('×I', O[0] + 0.72 * R * Math.cos(135 * D) - 16, O[1] - 0.72 * R * Math.sin(135 * D) - 8, { size: 28, fam: F.math, w: 700, align: 'right', c: C.vio, a: ia });
    fillBox(O[0] + 14, O[1] + 14, 40, 40, C.mag, ia * 0.4); box(O[0] + 14, O[1] + 14, 40, 40, C.mag, ia, 1.5);
    txt('I', O[0] + 34, O[1] + 42, { size: 24, fam: F.math, w: 700, align: 'center', c: C.white, a: ia });
  }
  /* the hand, amber: the current state */
  const tip = [O[0] + (R - 30) * Math.cos(th), O[1] - (R - 30) * Math.sin(th)];
  arrow(O[0], O[1], tip[0], tip[1], C.now, a, 7);
  dot(O[0], O[1], 9, 'w', a);
  /* the ledger of the turns */
  panel(1000, 190, 820, 280, a * at(S, 1, 0.6), C.cyan, 'TWO QUARTER TURNS · 两次四分之一圈');
  A02.rich([['e₁ I = ', C.white], ['e₂', C.white], ['      east → north', C.dim]], 1030, 270, { size: 32, a: a * Q(S, 1, 'Call one quarter turn I', 0.5) });
  A02.rich([['e₂ I = ', C.white], ['−e₁', C.white], ['     north → west', C.dim]], 1030, 330, { size: 32, a: a * Q(S, 1, 'Two of them', 0.5) });
  A02.rich([['I · I = ', C.vio], ['−1', C.now]], 1030, 420, { size: 48, a: a * Q(S, 1, 'I times I', 0.5) });
  /* line 2: the aphorism */
  const pa = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  if (pa > 0.003) {
    panel(1000, 500, 820, 230, pa, C.argued, 'THE IDOL · 偶像');
    txt('“imaginary” only because', 1030, 580, { size: 30, fam: F.disp, w: 700, c: C.white, a: pa });
    txt('we never drew the plane', 1030, 622, { size: 30, fam: F.disp, w: 700, c: C.white, a: pa });
    txt('i 不虚：它是平面的四分之一圈', 1030, 690, { size: 32, fam: F.zh, w: 700, c: C.argued, a: pa * Q(S, 2, 'never drew the plane', 0.6) });
  }
  /* line 3: Lean, J² = −I */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 500, 820, 330, la, C.lean, 'BALANCED HALVES · 平衡半分量');
    A02.rich([['J := 2AB*', C.white]], 1030, 572, { size: 32, a: la });
    A02.rich([['AB* + BA* = 0    AA* = ½I    B*B = ½I', C.white]], 1030, 622, { size: 26, a: la * Q(S, 3, 'balanced halves', 0.5) });
    A02.rich([['⟹  J · J = ', C.white], ['−I', C.lean]], 1030, 682, { size: 36, a: la * Q(S, 3, 'balanced halves', 0.5, 1.4) });
    A02.lean(1030, 738, A02.GID.relativeComplexStructure_square, la, { size: 18 });
    A02.rich([['example · 例   A = I/√2,  B = [0 1; −1 0]/√2  →  J = [0 −1; 1 0]', C.cyan]], 1030, 800, { size: 19, a: la * Q(S, 3, 'balanced halves', 0.6, 2.2), fam: F.zh });
  }
  stamp('J² = −I', 520, 860 - 120, Q(S, 3, 'J squared', 0.5) * (1 - clamp((S.u - phraseAt(S, 3, 'J squared') - 2.4) / 0.6)), C.lean, 34, -0.06);
};

/* ======================================================================= */
/*                            scene 3 · LINE PLUS AREA                       */
/* ======================================================================= */
SCENES.a02_product = S => {
  SPINE.rail(S, 2, 1);
  const a = A02.fade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [4, null, 'argued']]);
  const O = [250, 770], k = 105, V = v => A02.P(O, k, v);
  /* the integer lattice and axes */
  for (let i = 0; i <= 4; i++) for (let j = 0; j <= 4; j++) { const p = V([i, j]); dot(p[0], p[1], 3, 'w', a * 0.35); }
  const x1 = V([4.4, 0]), y1 = V([0, 4.2]);
  arrow(O[0], O[1], x1[0], x1[1], C.dim, a * 0.7, 2); arrow(O[0], O[1], y1[0], y1[1], C.dim, a * 0.7, 2);
  const VA = A02.VA, VB = A02.VB, pa = V(VA), pb = V(VB), pab = V([VA[0] + VB[0], VA[1] + VB[1]]);
  const s = A02.DOT / A02.N2A, foot = V([VA[0] * s, VA[1] * s]);
  const ar = Q(S, 0, 'The parallelogram', 0.8);
  A02.poly([O, pa, pab, pb], C.mag, a * ar, 0.26, 2.5);
  const sh = Q(S, 0, 'Dot product', 0.8);
  line(O[0], O[1], foot[0], foot[1], C.cyan, a * sh, 9);
  dashed(pb[0], pb[1], foot[0], foot[1], C.white, a * 0.45 * sh, 1.5);
  const ap = Q(S, 0, 'Take arrows', 0.6);
  arrow(O[0], O[1], pa[0], pa[1], C.white, a * ap, 5);
  arrow(O[0], O[1], pb[0], pb[1], C.now, a * ap, 5);
  txt('A = (3, 1)', pa[0] + 18, pa[1] + 14, { size: 26, fam: F.math, w: 700, c: C.white, a: a * ap });
  txt('B = (1, 3)', pb[0] - 18, pb[1] - 14, { size: 26, fam: F.math, w: 700, align: 'right', c: C.now, a: a * ap });
  txt('shadow ≈ 1.90 · 影长', (O[0] + foot[0]) / 2 - 10, (O[1] + foot[1]) / 2 + 44, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * sh });
  txt('8', (O[0] + pab[0]) / 2, (O[1] + pab[1]) / 2 + 12, { size: 44, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * ar });
  /* the ledger */
  panel(960, 175, 860, 300, a, C.cyan, 'TWO ARROWS · 两支箭头');
  A02.rich([['A·B = 3·1 + 1·3 = ', C.cyan], ['6', C.cyan], ['   ≈ √10 × 1.90', C.dim]], 990, 245, { size: 30, a: a * sh });
  A02.rich([['A∧B = (3·3 − 1·1) I = ', C.mag], ['8I', C.mag]], 990, 297, { size: 30, a: a * ar });
  A02.rich([['|A|² |B|² = 10 × 10 = 100', C.white]], 990, 360, { size: 30, a: a * Q(S, 1, 'ten times ten', 0.5) });
  A02.rich([['6² + 8² = 36 + 64 = 100', C.white]], 990, 420, { size: 30, a: a * Q(S, 1, 'six squared', 0.5) });
  /* the 6–8–10 right triangle */
  const ta = a * Q(S, 1, 'six squared', 0.6);
  if (ta > 0.003) {
    const t0 = [1600, 440], u = 20;
    const t1 = [t0[0] + 6 * u, t0[1]], t2 = [t1[0], t1[1] - 8 * u];
    line(t0[0], t0[1], t1[0], t1[1], C.cyan, ta, 6); line(t1[0], t1[1], t2[0], t2[1], C.mag, ta, 6); line(t0[0], t0[1], t2[0], t2[1], C.white, ta, 3);
    txt('6', (t0[0] + t1[0]) / 2, t0[1] + 28, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta });
    txt('8', t1[0] + 14, (t1[1] + t2[1]) / 2 + 8, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ta });
    txt('|A||B| = 10', (t0[0] + t2[0]) / 2 - 18, (t0[1] + t2[1]) / 2, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.white, a: ta });
  }
  /* Lean: any two lists of reals */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(960, 495, 860, 180, la, C.lean, 'ANY TWO LISTS OF REALS · 任意两组实数');
    A02.rich([['(Σuᵢ²)(Σvᵢ²) − (Σuᵢvᵢ)² = ½ ΣᵢΣⱼ (uᵢvⱼ − uⱼvᵢ)²', C.white]], 984, 572, { size: 27, a: la * Q(S, 2, 'squared lengths multiplied', 0.6) });
    A02.lean(984, 630, A02.GID.lagrange_gram_identity, la, { size: 19 });
  }
  /* line 3: the product */
  const pa3 = a * Q(S, 3, 'So one product', 0.6);
  if (pa3 > 0.003) {
    A02.rich([['AB = ', C.white], ['A·B', C.cyan], [' + ', C.white], ['A∧B', C.mag]], 470, 235, { size: 40, a: pa3, align: 'center' });
    A02.rich([['= ', C.white], ['6', C.cyan], [' + ', C.white], ['8I', C.mag]], 470, 295, { size: 40, a: a * Q(S, 3, 'six plus eight I', 0.5), align: 'center' });
  }
  /* line 4: the reading */
  const ra = a * at(S, 4, 0.6);
  if (ra > 0.003) {
    panel(960, 695, 860, 140, ra, C.argued, "THE BOOK'S READING · 本书读法");
    A02.rich([['line', C.cyan], [' → the particle you count · 被计数的粒子', C.white]], 984, 765, { size: 24, a: ra * Q(S, 4, 'the line is', 0.5), fam: F.zh });
    A02.rich([['area', C.mag], [' → the wave that turns · 会转动的波', C.white]], 984, 810, { size: 24, a: ra * Q(S, 4, 'the area is', 0.5), fam: F.zh });
  }
  stamp('36 + 64 = 100', 470, 150 + 110, Q(S, 2, 'Lean checks', 0.5, 0.2) * (1 - clamp((S.u - phraseAt(S, 2, 'Lean checks') - 2.6) / 0.6)), C.cyan, 30, -0.06);
};

/* ======================================================================= */
/*                           scene 4 · TWO KINDS OF TIME                     */
/* ======================================================================= */
SCENES.a02_time = S => {
  SPINE.rail(S, 2, 1);
  const a = A02.fade(S), u = S.u, D = A02.DEG;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [3, 'Lean checks', 'lean']]);
  const O = [470, 520], R = 250;
  /* the arrow sweeps forward and back, then settles at the 45° anchor for Lean */
  const t0 = lineAt(S, 0).s, sweep = 90 * D * (0.5 - 0.5 * Math.cos(Math.max(0, u - t0) * 1.15));
  const settle = ease(at(S, 3, 1.2));
  const ph = lerp(sweep, 45 * D, settle);
  ring(O[0], O[1], R, C.dim, a * 0.5, 1.5);
  /* the swept area: quantum time */
  A02.fan(O[0], O[1], R, 0, ph, C.mag, a * (1 - 0.6 * settle), 0.25);
  /* the records m₀, m₁: classical ticks (line 1) */
  const ra = a * Q(S, 1, 'A clock tick', 0.6);
  if (ra > 0.003) {
    for (const [t, l] of [[0, 'm₀ · tick 1'], [90, 'm₁ · tick 2']]) {
      const p = [O[0] + R * Math.cos(t * D), O[1] - R * Math.sin(t * D)];
      line(O[0], O[1], p[0], p[1], C.cyan, ra, 4);
      dot(p[0], p[1], 12, 'c', ra);
      txt(l, p[0] + (t ? -22 : 18), p[1] + (t ? -14 : 44), { size: 24, fam: F.mono, w: 700, align: t ? 'right' : 'left', c: C.cyan, a: ra });
    }
    const pq = a * Q(S, 1, 'perpendicular', 0.5);
    line(O[0] + 30, O[1], O[0] + 30, O[1] - 30, C.white, pq, 2); line(O[0], O[1] - 30, O[0] + 30, O[1] - 30, C.white, pq, 2);
    txt('⟨m₀, m₁⟩ = 0', O[0] - 40, O[1] + 60, { size: 26, fam: F.math, w: 700, align: 'right', c: C.white, a: pq });
  }
  /* the 90° wall (line 2) */
  const wa = a * Q(S, 2, 'ninety-degree wall', 0.6);
  A02.arc(O[0], O[1], R + 26, 0, 90 * D, C.mag, wa, 7);
  if (wa > 0.003) txt('90° wall · 墙', O[0] + (R + 70) * Math.cos(45 * D) + 10, O[1] - (R + 70) * Math.sin(45 * D) - 6, { size: 26, fam: F.zh, w: 700, c: C.mag, a: wa });
  /* the anchor a and its two legs (line 3) */
  const sa = a * settle;
  if (sa > 0.003) {
    A02.arc(O[0], O[1], R - 40, 0, 44 * D, C.cyan, sa, 4);
    A02.arc(O[0], O[1], R - 40, 46 * D, 90 * D, C.cyan, sa, 4);
    txt('≤ Eτ/ħ', O[0] + (R - 100) * Math.cos(22 * D), O[1] - (R - 100) * Math.sin(22 * D) + 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa });
    txt('≤ Eτ/ħ', O[0] + (R - 100) * Math.cos(68 * D), O[1] - (R - 100) * Math.sin(68 * D) + 8, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa });
  }
  const tip = [O[0] + R * Math.cos(ph), O[1] - R * Math.sin(ph)];
  arrow(O[0], O[1], tip[0], tip[1], C.now, a, 6);
  txt(settle > 0.5 ? 'a' : 'ψ(t)', settle > 0.5 ? tip[0] - 40 : tip[0] + 16, settle > 0.5 ? tip[1] + 8 : tip[1] - 12, { size: 30, fam: F.math, w: 700, c: C.now, a });
  dot(O[0], O[1], 8, 'w', a);
  /* the reading */
  panel(1000, 180, 820, 210, a, C.argued, "THE BOOK'S READING · 本书读法");
  A02.rich([['area swept', C.mag], [' → quantum time · 量子时间', C.white]], 1028, 250, { size: 26, a: a * Q(S, 0, 'A turning arrow', 0.5), fam: F.zh });
  A02.rich([['a record, a line', C.cyan], [' → a classical tick · 经典滴答', C.white]], 1028, 300, { size: 26, a: ra, fam: F.zh });
  txt('reversible both ways · 可以倒着走', 1028, 356, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * Q(S, 0, 'able to run backwards', 0.5) });
  /* the revolving door (line 2) */
  const da = a * Q(S, 2, 'like a revolving door', 0.6) * (1 - 0.65 * at(S, 3, 0.6));
  if (da > 0.003) {
    panel(1000, 405, 820, 185, da, C.argued, 'ANALOGY · 比方');
    const c = [1120, 505], r = 60, st = Q(S, 2, 'like a revolving door', 2.4, 0.4);
    const g = (45 + 90 * ease(st)) * D;
    ring(c[0], c[1], r + 6, C.argued, da * 0.6, 2);
    for (let w = 0; w < 4; w++) { const t = g + w * 90 * D; line(c[0], c[1], c[0] + r * Math.cos(t), c[1] - r * Math.sin(t), C.white, da, 5); }
    dot(c[0] + lerp(-30, 140, ease(st)), c[1] + lerp(30, 10, ease(st)), 9, 'w', da);
    txt('one person through', 1230, 488, { size: 24, fam: F.disp, w: 700, c: C.white, a: da });
    txt('= one quarter turn', 1230, 522, { size: 24, fam: F.disp, w: 700, c: C.argued, a: da });
    txt('过一个人 = 转四分之一圈', 1230, 562, { size: 22, fam: F.zh, w: 700, c: C.white, a: da });
  }
  /* Lean: the record time (lines 3–4) */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 605, 820, 232, la, C.lean, 'RECORD TIME · 记录时间');
    const pa3 = la * Q(S, 3, 'within E tau', 0.5);
    A02.rich([['‖a‖ = ‖m₀‖ = ‖m₁‖ = 1,  ⟨m₀, m₁⟩ = 0,  E > 0,  ħ > 0', C.white]], 1024, 668, { size: 23, a: pa3 });
    const xt = A02.rich([['if  θ', C.white]], 1024, 708, { size: 23, a: pa3 });
    txt('FS', xt + 1, 716, { size: 14, fam: F.math, w: 700, c: C.white, a: pa3 });
    A02.rich([['(a, mₖ) ≤ Eτ/ħ   (k = 0, 1)', C.white]], xt + 22, 708, { size: 23, a: pa3 });
    A02.rich([['⟹  τ ≥ ', C.white], ['πħ / (4E)', C.lean]], 1024, 766, { size: 36, a: la * Q(S, 3, 'forces tau', 0.5) });
    A02.lean(1024, 816, A02.GID.record_time_lower_bound, la, { size: 18 });
  }
  stamp('45° + 45° = 90°', 830, 712, Q(S, 3, 'forces tau', 0.5) * (1 - clamp((S.u - phraseAt(S, 3, 'forces tau') - 3.0) / 0.6)), C.cyan, 20, -0.06);
};

/* ======================================================================= */
/*                          scene 5 · THE PRICE OF WIPING                    */
/* ======================================================================= */
SCENES.a02_erase = S => {
  SPINE.rail(S, 2, 1);
  const a = A02.fade(S), u = S.u, D = A02.DEG;
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  const O = [470, 480], R = 220;
  ring(O[0], O[1], R, C.dim, a * 0.5, 1.5);
  /* the record line (vertical) */
  line(O[0], O[1] - R - 30, O[0], O[1] + R + 30, C.cyan, a * 0.8, 3);
  txt('record line · 记录线', O[0] + 14, O[1] - R - 34, { size: 22, fam: F.zh, w: 700, c: C.cyan, a });
  /* the Bloch picture: the two perpendicular records of the last scene are the two ends of this line */
  txt('|0⟩', O[0] - 16, O[1] - R - 6, { size: 24, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
  txt('|1⟩', O[0] - 16, O[1] + R + 20, { size: 24, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
  txt('Bloch picture · 布洛赫图', 130, 190, { size: 18, fam: F.zh, w: 700, c: C.dim, a });
  txt('records = the two ends · 记录 = 两端', 130, 214, { size: 17, fam: F.zh, w: 700, c: C.dim, a });
  /* line 0: a turn and its undoing, then the squash */
  const t0 = lineAt(S, 0).s, sp = phraseAt(S, 0, 'Flattening cannot');
  const rp = clamp((u - t0) / Math.max(0.8, sp - t0 - 0.2));
  const turn = 50 * D * Math.sin(Math.PI * rp);
  const sq = ease(Q(S, 0, 'squash the arrow', 1.8));
  const r = 1 - sq;
  /* the arrow |+⟩: x-component r, turned by `turn` (only before the squash) */
  const dir = [Math.cos(turn), Math.sin(turn)];
  const tip = [O[0] + R * r * dir[0], O[1] - R * r * dir[1]];
  if (rp > 0 && rp < 1) {
    const up = rp < 0.5;
    A02.arc(O[0], O[1], R * 0.45, 0, turn, C.vio, a, 4);
    A02.arcHead(O[0], O[1], R * 0.45, turn, up ? 1 : -1, C.vio, a);
    txt(up ? 'R(θ)' : 'R(−θ)', O[0] + R * 0.5, O[1] - R * 0.5, { size: 26, fam: F.math, w: 700, c: C.vio, a });
  }
  /* the sideways part, magenta, wiped by the squash */
  if (r > 0.01) { line(O[0], O[1] + 1, tip[0], O[1] + 1, C.mag, a * 0.8 * r, 10); }
  /* line 2: reset with one bath qubit at p = 0.9 — the arrow grows back up the record line to r = 0.8 */
  const rs = ease(Q(S, 2, 'reset it', 2.2)), rz = A02.BATH_R * rs;
  if (r > 0.04 && rs <= 0) arrow(O[0], O[1], tip[0], tip[1], C.now, a, 6);
  if (rs <= 0) txt('|+⟩', tip[0] + 14, tip[1] - 14, { size: 30, fam: F.math, w: 700, c: C.now, a: a * clamp(r * 3) });
  if (rz > 0.04) {
    arrow(O[0], O[1], O[0], O[1] - R * rz, C.now, a, 6);
    txt('reset · 复位', O[0] + 22, O[1] - R * rz + 10, { size: 24, fam: F.zh, w: 700, c: C.now, a: a * rs });
    txt('r = 0.8', O[0] + 22, O[1] - R * rz + 40, { size: 22, fam: F.mono, w: 700, c: C.now, a: a * rs });
  }
  dot(O[0], O[1], 10 + 6 * sq * (1 - rs), sq > 0.5 && rs < 0.5 ? 'c' : 'w', a);
  if (sq > 0.3) txt('sideways area wiped · 横向面积被抹掉', O[0], O[1] + R + 74, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * clamp((sq - 0.3) / 0.4) * (1 - at(S, 2, 0.5)) });
  /* the entropy meter */
  const Sv = rs > 0 ? A02.Sr(rz) : A02.Sr(r), mx = 0.8, bx = 780, by0 = 720, bh = 420;
  box(bx, by0 - bh, 56, bh, C.dim, a * 0.8, 1.5);
  fillBox(bx, by0 - bh * Sv / mx, 56, bh * Sv / mx, C.cyan, a * 0.6);
  const yl = by0 - bh * Math.LN2 / mx;
  dashed(bx - 14, yl, bx + 70, yl, C.white, a * 0.6, 1.5);
  txt('ln 2', bx + 78, yl + 8, { size: 22, fam: F.math, w: 700, c: C.white, a });
  txt('S', bx + 28, by0 + 34, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  const ea = a * Q(S, 1, 'zero to log two', 0.5);
  if (ea > 0.003 && rs < 0.5) A02.rich([['S: 0 → ln 2 ≈ ', C.white], ['0.693', C.cyan]], bx + 28, by0 - bh - 22, { size: 28, a: ea * (1 - 2 * rs), align: 'center' });
  if (rs >= 0.5) A02.rich([['S: ln 2 → ', C.white], ['0.325', C.cyan], ['   drop ', C.white], ['0.368', C.now]], bx - 20, by0 - bh - 22, { size: 26, a: a * (2 * rs - 1), align: 'center' });
  if (rs > 0.003) {   /* the entropy drop, bracketed on the meter */
    const y0 = by0 - bh * Math.LN2 / mx, y1 = by0 - bh * Sv / mx;
    line(bx - 22, y0, bx - 22, y1, C.now, a * rs, 3); line(bx - 30, y0, bx - 14, y0, C.now, a * rs, 3); line(bx - 30, y1, bx - 14, y1, C.now, a * rs, 3);
  }
  /* line 2: the eraser */
  const pa = a * Q(S, 2, 'as an eraser', 0.6) * (1 - 0.6 * at(S, 3, 0.6));
  if (pa > 0.003) {
    panel(1000, 180, 820, 240, pa, C.argued, 'ANALOGY · 比方');
    const e = ease(Q(S, 2, 'as an eraser', 3.0, 0.2)), ex = lerp(1050, 1420, e);
    for (let k = 0; k < 6; k++) { const x = 1050 + k * 70; const keep = clamp((x + 30 - ex) / 40); line(x, 260, x + 50, 320, C.white, pa * 0.9 * keep, 4); }
    for (let k = 0; k < 14; k++) { const x = 1050 + rnd(k, 3) * 400; if (x < ex - 20) dot(x, 360 + 22 * rnd(k, 5), 4, 'o', pa * 0.8); }
    fillBox(ex - 34, 248, 68, 84, C.argued, pa * 0.55); box(ex - 34, 248, 68, 84, C.argued, pa, 2);
    txt('marks → crumbs + warmth', 1500, 280, { size: 22, fam: F.disp, w: 700, c: C.white, a: pa });
    txt('印记 → 碎屑 + 热', 1500, 320, { size: 22, fam: F.zh, w: 700, c: C.white, a: pa });
  }
  /* line 3: Lean, the Landauer bound from the balance */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 440, 820, 230, la, C.lean, 'THE BOOKKEEPING · 记账');
    A02.rich([['βQ = −ΔS + I + D,    I ≥ 0,   D ≥ 0', C.white]], 1028, 510, { size: 28, a: la * Q(S, 3, 'if heat equals', 0.5) });
    A02.rich([['⟹  −ΔS ≤ βQ', C.lean]], 1028, 572, { size: 38, a: la * Q(S, 3, 'heat is at least', 0.5) });
    A02.lean(1028, 630, A02.GID.landauer_bound_of_balance, la, { size: 19 });
    /* chapter 8's worked row, p = 0.9 (computed) */
    const ba = la * Q(S, 3, 'heat is at least', 0.6, 0.6);
    if (ba > 0.003) {
      panel(1000, 690, 820, 145, ba, C.cyan, 'RESET WITH ONE BATH QUBIT, p = 0.9 · 用一个热浴比特复位（数值）');
      const B = A02.BATH, x0 = 1028, wsc = 680 / 1.0, y = 742;
      fillBox(x0, y, wsc * B.drop, 36, C.white, ba * 0.35); box(x0, y, wsc * B.drop, 36, C.white, ba, 1.5);
      ctx.save(); ctx.setLineDash([6, 5]); box(x0 + wsc * B.drop, y, wsc * B.D, 36, C.mag, ba, 1.5); ctx.restore();
      fillBox(x0 + wsc * B.drop, y, wsc * B.D, 36, C.mag, ba * 0.2);
      txt(`−ΔS ${A02.num(B.drop)}`, x0 + 8, y + 26, { size: 20, fam: F.mono, w: 700, c: C.white, a: ba });
      txt(`D ${A02.num(B.D)}`, x0 + wsc * B.drop + 10, y + 26, { size: 20, fam: F.mono, w: 700, c: C.mag, a: ba });
      txt(`βQ = ${A02.num(B.bQ)}`, x0 + wsc * B.bQ + 12, y + 26, { size: 20, fam: F.mono, w: 700, c: C.white, a: ba });
      txt('heat paid · 付出的热 βQ  ≥  entropy drop · 熵减 −ΔS      I = 0', x0, y + 70, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ba });
    }
  }
  /* line 4: the arrow of time (argued) */
  const ta = a * at(S, 4, 0.6);
  if (ta > 0.003) {
    A02.rich([['turning ', C.white], ['⇄', C.vio], [' both ways · 双向', C.white]], O[0], O[1] + R + 64, { size: 26, a: ta, align: 'center', fam: F.zh });
    A02.rich([['resetting ', C.white], ['→', C.mag], [' sends a bill · 复位寄来账单', C.white]], O[0], O[1] + R + 104, { size: 26, a: ta * Q(S, 4, 'but resetting', 0.5), align: 'center', fam: F.zh });
  }
};

/* ======================================================================= */
/*                          scene 6 · ONE TURN TOO FEW                       */
/* ======================================================================= */
SCENES.a02_ask = S => {
  SPINE.rail(S, 2, 1);
  const a = clamp(S.u / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the four strokes (line 0) */
  const dim = 1 - 0.55 * at(S, 1, 0.6);
  const strokes = [
    ['i is a quarter turn', 'i = ¼ turn', 'i 是四分之一圈', C.vio],
    ['the product is line plus area', 'AB = A·B + A∧B', '几何积 = 线 + 面积', C.white],
    ['area is quantum time', 'area = quantum time', '面积 = 量子时间（本书读法）', C.mag],
    ['resetting costs heat', 'reset → heat', '复位 → 付热', C.cyan]
  ];
  strokes.forEach(([ph, en, zh, col], i) => {
    const sa = a * Q(S, 0, ph, 0.5) * dim;
    if (sa <= 0.003) return;
    const x = 360 + i * 400, y = lerp(430, 235, ease(at(S, 1, 0.9)));
    chip(x, y, 370, 64, en, col, sa, 28, F.math);
    txt(zh, x, y + 65, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa * 0.9 });
  });
  /* the plane and its one perpendicular partner (line 1) */
  const pa = a * at(S, 1, 0.8);
  if (pa > 0.003) {
    const c = [960, 520], rx = 330, ry = 105;
    ctx.save(); ctx.globalAlpha = pa; ctx.fillStyle = rgba(C.mag, 0.12); ctx.strokeStyle = rgba(C.mag, 0.7); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(c[0], c[1], rx, ry, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore();
    const q = Math.SQRT1_2 * 0.85, e1 = [c[0] + rx * q, c[1] + ry * q], e2 = [c[0] + rx * q, c[1] - ry * q];
    arrow(c[0], c[1], e1[0], e1[1], C.white, pa, 5);
    arrow(c[0], c[1], e2[0], e2[1], C.now, pa * Q(S, 1, 'one perpendicular partner', 0.5), 5);
    txt('e₁', e1[0] + 14, e1[1] + 10, { size: 28, fam: F.math, w: 700, c: C.white, a: pa });
    txt('e₂', e2[0] + 16, e2[1] - 4, { size: 28, fam: F.math, w: 700, c: C.now, a: pa * Q(S, 1, 'one perpendicular partner', 0.5) });
    /* the quarter turn from e₁ to e₂ along the ellipse, cyan */
    const qa = pa * Q(S, 1, 'one perpendicular partner', 0.8);
    if (qa > 0.003) { ctx.save(); ctx.globalAlpha = qa; ctx.strokeStyle = C.vio; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(c[0], c[1], rx * 0.45, ry * 0.45, 0, Math.PI / 4, -Math.PI / 4, true); ctx.stroke(); ctx.restore(); }
    txt('in the plane: one perpendicular partner only · 面内只有一个垂直伙伴', c[0], c[1] + ry + 46, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: pa * (1 - at(S, 2, 0.5)) });
    /* line 2: a third direction would have to leave the plane */
    const ta = a * at(S, 2, 0.8);
    if (ta > 0.003) {
      ctx.save(); ctx.setLineDash([8, 8]); arrow(c[0], c[1], c[0], c[1] - 190, C.mag, ta, 4); ctx.restore();
      txt('?', c[0] + 22, c[1] - 170, { size: 48, fam: F.orb, w: 900, c: C.mag, a: ta });
    }
  }
  SPINE.ask(S, 2, 'Two directions make a plane. What do three make?', '两个方向张成一个面。三个呢？');
};

/* ---- a03 · Closing the sphere · 合拢·从面到球 ---- */
/* Long film No Third Point · act a03 · Part III (chapters 9–12) · 合拢·从面到球 · Closing the sphere.

   What each scene shows, and where it rests:
     a03_title    three pairwise perpendicular axes e₁, e₂, e₃ and the three planes they span, I_x = e₂∧e₃,
                  I_y = e₃∧e₁, I_z = e₁∧e₂ (ch. 9 §9.1; computed); "one plane a circle, three planes a sphere" is the
                  author's image (ARGUED).
     a03_address  R_y(60°) N = (√3/2, 0, 1/2), R_z(45°) R_y(60°) N = (√6/4, √6/4, 1/2) (ch. 9 §9.2; computed here by
                  rotation); any two axes not on one line give every rotation as a finite word
                  ..... TwoAxisFiniteRotation.two_axis_finite_word (LEAN; existence only, no shortest word).
     a03_order    R_x(90°) R_y(90°) N = +X, R_y(90°) R_x(90°) N = −Y, 90° apart (ch. 10 §10.1; computed); the aphorism
                  is an interpretation (ARGUED).
     a03_table    spinors of N, +X and the addressed point x: G(N,+X) = 1/√2, G(N,x) = √3/2, G(+X,x) = (1 + √6)/4 + i/4;
                  Born weights 1/2, 3/4, (4 + √6)/8 ≈ 0.806, unchanged under any relabelling P*GP (computed); equal
                  complex Gram tables give one common unitary
                  ..... GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq (LEAN); the common turn on
                  screen is U = diag(1, i), checked here; the distance table of towns is a comparison (ARGUED).
     a03_pulse    pulse-area law and the virtual Z schedule are literature results (ARGUED, ch. 11 remarks); the area
                  2π · 10 MHz · 25 ns = π/2 and the readouts P(0) = 1/4 with and without the virtual Z are computed;
                  push forward = pull back after any number of steps, given trace duality
                  ..... ObserverPullbackTraceIdentity.observer_pullback_trace_identity (LEAN); the dials show the
                  one-step unitary special case, P(0) = 3/4 both ways (computed).
     a03_glance   MBQC on a two-qubit link is a literature result (ARGUED, ch. 12 remark); with ψ the addressed state and
                  α = 60°, the branch of result s on qubit 2 is X^s H diag(1, e^{−iα}) ψ / √2 with weight 1/2 each
                  (computed); branch weights of a record measurement sum to the trace
                  ..... Conditioning.recordWeight_sum (LEAN).
     a03_next     recap and the question handed to the next act.

   On load, FILM.init looks up the four theorems of this act with leanCite and re-derives every number on screen by an
   independent route; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */

const A03 = (() => {
  const DEG = Math.PI / 180;
  /* ---------- vectors ---------- */
  const V = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
    sc: (k, a) => [k * a[0], k * a[1], k * a[2]],
    dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
    cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
    norm: a => Math.hypot(a[0], a[1], a[2]),
    unit: a => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; },
    /* right-handed rotation of v about the unit axis k by ang (Rodrigues) */
    rot: (v, k, ang) => {
      const c = Math.cos(ang), s = Math.sin(ang), kv = k[0] * v[0] + k[1] * v[1] + k[2] * v[2];
      const x = [k[1] * v[2] - k[2] * v[1], k[2] * v[0] - k[0] * v[2], k[0] * v[1] - k[1] * v[0]];
      return [0, 1, 2].map(i => v[i] * c + x[i] * s + k[i] * kv * (1 - c));
    },
    ang: (a, b) => Math.atan2(Math.hypot(...[a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]),
      a[0] * b[0] + a[1] * b[1] + a[2] * b[2])
  };
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1], N = E3;
  /* ---------- complex numbers [re, im] and spinors ---------- */
  const Z = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    conj: a => [a[0], -a[1]],
    sc: (k, a) => [k * a[0], k * a[1]],
    expi: t => [Math.cos(t), Math.sin(t)],
    abs2: a => a[0] * a[0] + a[1] * a[1],
    /* ⟨u, v⟩ = Σ conj(u_k) v_k */
    inner: (u, v) => u.reduce((s, uk, k) => [s[0] + uk[0] * v[k][0] + uk[1] * v[k][1], s[1] + uk[0] * v[k][1] - uk[1] * v[k][0]], [0, 0])
  };
  /* spinor of the Bloch direction (θ, φ): (cos θ/2, e^{iφ} sin θ/2) */
  const spinor = (th, ph) => [[Math.cos(th / 2), 0], Z.sc(Math.sin(th / 2), Z.expi(ph))];
  /* Bloch vector of a unit spinor (u, v): (2 Re ūv, 2 Im ūv, |u|² − |v|²) */
  const bloch = s => { const p = Z.mul(Z.conj(s[0]), s[1]); return [2 * p[0], 2 * p[1], Z.abs2(s[0]) - Z.abs2(s[1])]; };
  const nrm = s => { const n = Math.sqrt(Z.abs2(s[0]) + Z.abs2(s[1])); return [Z.sc(1 / n, s[0]), Z.sc(1 / n, s[1])]; };

  /* ---------- the numbers on screen ---------- */
  const ADDR = { th: 60 * DEG, ph: 45 * DEG };
  ADDR.tilt = V.rot(N, E2, ADDR.th);                     // (√3/2, 0, 1/2)
  ADDR.x = V.rot(ADDR.tilt, E3, ADDR.ph);                // (√6/4, √6/4, 1/2)
  /* the skew pair of the Lean card: a = e₃ and b 30° from it */
  const SKEW = { a: E3, b: [Math.sin(30 * DEG) * Math.cos(-40 * DEG), Math.sin(30 * DEG) * Math.sin(-40 * DEG), Math.cos(30 * DEG)] };
  /* a two-letter word to the addressed point: half a turn about b lifts N to colatitude 60° at b's azimuth (−40°),
     then 85° about a brings it to azimuth 45° */
  SKEW.word = [[SKEW.b, Math.PI], [SKEW.a, 85 * DEG]];
  SKEW.end = SKEW.word.reduce((p, [ax, an]) => V.rot(p, ax, an), N);
  /* the two orders of two quarter turns */
  const ORDER = (() => {
    const q = Math.PI / 2;
    const A1 = V.rot(N, E2, q), A2 = V.rot(A1, E1, q);    // about Y, then about X: +X
    const B1 = V.rot(N, E1, q), B2 = V.rot(B1, E2, q);    // about X, then about Y: −Y
    return { A1, A2, B1, B2, gap: V.ang(A2, B2) };
  })();
  /* the table: N, +X and the addressed point x */
  const TABLE = (() => {
    const psi = [spinor(0, 0), spinor(90 * DEG, 0), spinor(ADDR.th, ADDR.ph)];
    const labels = ['N', '+X', 'x'];
    const G = psi.map(u => psi.map(v => Z.inner(u, v)));
    const w = G.map(r => r.map(Z.abs2));
    /* the common turn U = diag(1, i): about the vertical by 90° */
    const U = s => [s[0], Z.mul([0, 1], s[1])];
    const psiB = psi.map(U);
    const GB = psiB.map(u => psiB.map(v => Z.inner(u, v)));
    return { psi, labels, G, w, psiB, GB, dirs: psi.map(bloch), dirsB: psiB.map(bloch) };
  })();
  /* pulse area and the virtual Z readouts */
  const PULSE = (() => {
    const fMHz = 10, tns = 25;
    const area = 2 * Math.PI * fMHz * 1e6 * tns * 1e-9;     // π/2
    const lam = 60 * DEG;
    const lit = V.rot(V.rot(V.rot(N, E1, Math.PI / 2), E3, lam), E1, Math.PI / 2);    // X, Z(60°), X
    const phys = V.rot(V.rot(N, E1, Math.PI / 2), [Math.cos(-lam), Math.sin(-lam), 0], Math.PI / 2);   // X, X at phase −60°
    const p0 = v => (1 + v[2]) / 2;
    /* the push / pull dials: one unitary step of 60° about e₂ */
    const pushed = V.rot(N, E2, lam), pulled = V.rot(N, E2, -lam);
    return { fMHz, tns, area, lam, lit, phys, p0, pushRead: (1 + V.dot(pushed, N)) / 2, pullRead: (1 + V.dot(N, pulled)) / 2 };
  })();
  /* measurement on a two-qubit link */
  const MBQC = (() => {
    const al = 60 * DEG, psi = spinor(ADDR.th, ADDR.ph), a = psi[0], b = psi[1];
    const r2 = Math.SQRT1_2;
    /* CZ(ψ ⊗ |+⟩) = a|0⟩|+⟩ + b|1⟩|−⟩ as a 4-vector over |q1 q2⟩ */
    const plus = [[r2, 0], [r2, 0]], minus = [[r2, 0], [-r2, 0]];
    const st = [Z.mul(a, plus[0]), Z.mul(a, plus[1]), Z.mul(b, minus[0]), Z.mul(b, minus[1])];
    /* ⟨s_α| on qubit 1: (⟨0| + (−1)^s e^{−iα} ⟨1|)/√2 */
    const branch = s => {
      const c = Z.sc((s ? -1 : 1) * r2, Z.expi(-al)), c0 = [r2, 0];
      return [Z.add(Z.mul(c0, st[0]), Z.mul(c, st[2])), Z.add(Z.mul(c0, st[1]), Z.mul(c, st[3]))];
    };
    const br = [branch(0), branch(1)];
    const weight = br.map(v => Z.abs2(v[0]) + Z.abs2(v[1]));
    /* the gate: X^s H diag(1, e^{−iα}) ψ / √2 */
    const gate = s => {
      const d = [a, Z.mul(Z.expi(-al), b)];
      const h = [Z.sc(r2, Z.add(d[0], d[1])), Z.sc(r2, Z.sub(d[0], d[1]))];
      const out = s ? [h[1], h[0]] : h;
      return [Z.sc(r2, out[0]), Z.sc(r2, out[1])];
    };
    return { al, psi, br, weight, gate, out: br.map(v => bloch(nrm(v))), inDir: bloch(psi) };
  })();

  const GID = {
    word: 'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
    gram: 'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
    pull: 'D5/S3/Quantum/Dynamics/ObserverPullbackTraceIdentity.observer_pullback_trace_identity',
    branch: 'D5/S3/Observer/Conditioning.recordWeight_sum'
  };
  const SHORT = {
    word: 'two_axis_finite_word',
    gram: 'exists_unitary_mul_eq_of_conjTranspose_mul_eq',
    pull: 'observer_pullback_trace_identity',
    branch: 'recordWeight_sum'
  };

  /* ---------- independent checks ---------- */
  function verify() {
    const E = window.FILM_ERRORS;
    let bad = 0;
    const fail = m => { if (bad++ < 12) E.push('no-third-point a03: ' + m); };
    const ok = (c, m) => { if (!c) fail(m); };
    const near = (x, y, e = 1e-12) => Math.abs(x - y) < e;
    const nearV = (x, y, e = 1e-12) => V.norm(V.sub(x, y)) < e;
    const nearZ = (x, y, e = 1e-12) => Math.hypot(x[0] - y[0], x[1] - y[1]) < e;
    /* 0. the cited theorems */
    /* look up each of this act's four theorems by its GID; the assembled film cites more, which is not checked here */
    for (const k of Object.keys(GID)) {
      const r = leanCite(GID[k]);
      if (!r) { fail(`film.json does not cite ${GID[k]}`); continue; }
      ok(r.kind === 'theorem', `${GID[k]} is not a theorem at the pinned commit`);
      ok(r.short === SHORT[k], `${GID[k]} resolves to ${r.short}`);
    }
    /* 1. address: closed forms */
    ok(nearV(ADDR.tilt, [Math.sqrt(3) / 2, 0, 0.5]), 'R_y(60°) N');
    ok(nearV(ADDR.x, [Math.sqrt(6) / 4, Math.sqrt(6) / 4, 0.5]), 'R_z(45°) R_y(60°) N');
    ok(nearV(ADDR.x, [Math.sin(ADDR.th) * Math.cos(ADDR.ph), Math.sin(ADDR.th) * Math.sin(ADDR.ph), Math.cos(ADDR.th)]), 'r(θ, φ)');
    ok(near(V.ang(SKEW.a, SKEW.b), 30 * DEG), 'skew axes are not 30° apart');
    ok(V.dot(SKEW.a, SKEW.b) ** 2 < V.dot(SKEW.a, SKEW.a) * V.dot(SKEW.b, SKEW.b), 'skew axes fail strict Cauchy–Schwarz');
    ok(nearV(SKEW.end, ADDR.x, 1e-12), 'the word b·a does not land on the addressed point');
    /* 2. order, against 3×3 matrices */
    const Ry = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]], Rx = [[1, 0, 0], [0, 0, -1], [0, 1, 0]];
    const mv = (M, v) => M.map(r => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
    ok(nearV(ORDER.A2, mv(Rx, mv(Ry, N))) && nearV(ORDER.A2, E1), 'Y then X does not end at +X');
    ok(nearV(ORDER.B2, mv(Ry, mv(Rx, N))) && nearV(ORDER.B2, [0, -1, 0]), 'X then Y does not end at −Y');
    ok(near(ORDER.gap, Math.PI / 2), 'the two ends are not 90° apart');
    /* 3. table: closed forms, Born half-angle rule, relabelling, the common turn */
    const T = TABLE, G = T.G;
    ok(nearZ(G[0][1], [Math.SQRT1_2, 0]) && nearZ(G[0][2], [Math.sqrt(3) / 2, 0]), 'G(N, ·)');
    ok(nearZ(G[1][2], [(1 + Math.sqrt(6)) / 4, 0.25]), 'G(+X, x) ≠ (1 + √6)/4 + i/4');
    ok(near(T.w[0][1], 0.5) && near(T.w[0][2], 0.75) && near(T.w[1][2], (4 + Math.sqrt(6)) / 8), 'Born weights');
    ok((4 + Math.sqrt(6)) / 8 > 0.805 && (4 + Math.sqrt(6)) / 8 < 0.81, '(4 + √6)/8 does not round to 0.81');
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      ok(near(T.w[i][j], (1 + V.dot(T.dirs[i], T.dirs[j])) / 2), `half-angle rule at ${i}, ${j}`);
      ok(nearZ(G[i][j], Z.conj(G[j][i])), `G not Hermitian at ${i}, ${j}`);
      ok(nearZ(T.GB[i][j], G[i][j]), `the common turn changes G at ${i}, ${j}`);
    }
    for (const perm of [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]) {
      /* P*GP: entry (i, j) is G(perm i, perm j); the same pair always reads the same number */
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        const pi = perm[i], pj = perm[j];
        ok(nearZ(Z.inner(T.psi[pi], T.psi[pj]), G[pi][pj]), 'relabelled table');
      }
    }
    ok(nearV(T.dirs[2], ADDR.x) && nearV(T.dirs[1], E1) && nearV(T.dirs[0], N), 'spinors of N, +X, x');
    ok(nearV(T.dirsB[1], E2) && nearV(T.dirsB[2], V.rot(ADDR.x, E3, Math.PI / 2)), 'diag(1, i) is not a 90° turn about z');
    /* 4. pulse and virtual Z */
    ok(near(PULSE.area, Math.PI / 2, 1e-12), 'pulse area is not π/2');
    ok(near(PULSE.lit[2], -0.5) && near(PULSE.phys[2], -0.5), 'virtual Z heights');
    ok(near(PULSE.p0(PULSE.lit), 0.25) && near(PULSE.p0(PULSE.phys), 0.25), 'virtual Z readouts are not 1/4');
    ok(nearV(PULSE.phys, V.rot(PULSE.lit, E3, -PULSE.lam)), 'virtual Z end is not the literal end turned by −λ');
    ok(near(PULSE.pushRead, 0.75) && near(PULSE.pullRead, 0.75), 'push / pull readouts are not 3/4');
    /* 5. MBQC branches against the gate formula and the weights */
    const M = MBQC;
    ok(near(M.weight[0], 0.5) && near(M.weight[1], 0.5) && near(M.weight[0] + M.weight[1], 1), 'branch weights');
    for (const s of [0, 1]) {
      const g = M.gate(s), b = M.br[s];
      ok(nearZ(g[0], b[0]) && nearZ(g[1], b[1]), `branch ${s} is not X^s H diag(1, e^{−iα}) ψ / √2`);
    }
    ok(nearV(M.out[1], [M.out[0][0], -M.out[0][1], -M.out[0][2]]), 'the s = 1 branch is not X of the s = 0 branch');
    ok(nearV(M.inDir, ADDR.x), 'the input is not the addressed state');
  }

  /* ---------- drawing ---------- */
  const fade = S => clamp(S.u / 0.4) * clamp((S.d - S.u) / 0.4);
  /* window from line k (−lead) to line k1 (or the end) */
  const win = (S, k, k1) => {
    const s0 = lineAt(S, k).s - 0.35, s1 = k1 == null || k1 >= S.L.length ? S.d + 1 : lineAt(S, k1).s - 0.2;
    return clamp((S.u - s0) / 0.45) * clamp((s1 - S.u) / 0.35);
  };
  /* orthographic view: [x, y, depth] (depth > 0 faces the viewer) */
  const view = (cx, cy, R, yaw = -2.1, el = 0.32) => {
    const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
    const f = p => {
      const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw;
      return [cx + R * X, cy - R * (p[2] * ce + Y * se), -Y * ce + p[2] * se];
    };
    f.cx = cx; f.cy = cy; f.R = R;
    return f;
  };
  function path(vw, pts, col, a, lw = 3, o = {}) {
    if (a <= 0.003 || pts.length < 2) return;
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = lw;
    if (o.dash) ctx.setLineDash(o.dash);
    const q = pts.map(vw);
    for (let i = 1; i < q.length; i++) {
      const back = (q[i - 1][2] + q[i][2]) / 2 < -0.02;
      if (o.front && back) continue;
      ctx.globalAlpha = a * (back ? (o.backA == null ? 0.28 : o.backA) : 1);
      ctx.beginPath(); ctx.moveTo(q[i - 1][0], q[i - 1][1]); ctx.lineTo(q[i][0], q[i][1]); ctx.stroke();
    }
    ctx.restore();
  }
  const circle = (u, v, n = 120, c = [0, 0, 0], r = 1) => {
    const out = [];
    for (let i = 0; i <= n; i++) { const t = TAU * i / n; out.push([0, 1, 2].map(k => c[k] + r * (u[k] * Math.cos(t) + v[k] * Math.sin(t)))); }
    return out;
  };
  const arc = (p, axis, ang, n = 60) => { const out = []; for (let i = 0; i <= n; i++) out.push(V.rot(p, axis, ang * i / n)); return out; };
  /* great-circle arc from p to q */
  const geo = (p, q, n = 50) => { const ax = V.unit(V.cross(p, q)); return arc(p, ax, V.ang(p, q), n); };
  function disc(vw, u, v, col, a, fill = 0.13) {
    if (a <= 0.003) return;
    const q = circle(u, v, 90).map(vw);
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
    q.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.closePath(); ctx.fillStyle = rgba(col, fill); ctx.fill(); ctx.restore();
  }
  function fan(vw, p, axis, ang, col, a, fill = 0.22) {
    if (a <= 0.003 || Math.abs(ang) < 1e-4) return;
    const o = vw([0, 0, 0]), q = arc(p, axis, ang, 40).map(vw);
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.moveTo(o[0], o[1]);
    q.forEach(r => ctx.lineTo(r[0], r[1])); ctx.closePath(); ctx.fillStyle = rgba(col, fill); ctx.fill(); ctx.restore();
  }
  /* the ball: outline, a faint fill, the equator and (optionally) a few meridians and parallels */
  function ball(vw, a, o = {}) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(vw.cx, vw.cy, vw.R, 0, TAU);
    const g = ctx.createRadialGradient(vw.cx - vw.R * 0.35, vw.cy - vw.R * 0.4, vw.R * 0.1, vw.cx, vw.cy, vw.R);
    g.addColorStop(0, rgba(C.cyan, 0.10)); g.addColorStop(1, rgba(C.blue, 0.03));
    ctx.fillStyle = g; ctx.fill(); ctx.restore();
    ring(vw.cx, vw.cy, vw.R, o.rim || C.dim, a * (o.rimA || 0.7), o.rimW || 1.6);
    if (o.grid) {
      const ga = a * o.grid;
      for (let k = 0; k < 6; k++) { const t = k * Math.PI / 6; path(vw, circle([Math.cos(t), Math.sin(t), 0], E3, 90), C.dim, ga * 0.5, 1, { backA: 0.15 }); }
      for (const z of [-0.5, 0.5]) path(vw, circle(E1, E2, 90, [0, 0, z], Math.sqrt(1 - z * z)), C.dim, ga * 0.5, 1, { backA: 0.15 });
    }
    if (o.equator !== false) path(vw, circle(E1, E2, 120), C.dim, a * 0.8, 1.4, { backA: 0.25 });
  }
  function axisLine(vw, d, col, a, label, o = {}) {
    if (a <= 0.003) return;
    const L = o.len || 1.32, p = vw(V.sc(L, d)), m = vw(V.sc(-L, d)), c = vw([0, 0, 0]);
    line(m[0], m[1], c[0], c[1], col, a * 0.4, o.w || 2.5);
    arrow(c[0], c[1], p[0], p[1], col, a, o.w || 3.5);
    if (label) txt(label, p[0] + (o.dx || 12), p[1] + (o.dy || -8), { size: o.size || 28, fam: F.math, w: 700, c: col, a });
  }
  function pt(vw, p, col, a, r = 10, label = null, o = {}) {
    if (a <= 0.003) return;
    const q = vw(p), back = q[2] < -0.02;
    dot(q[0], q[1], r, col, a * (back ? 0.45 : 1));
    if (label) txt(label, q[0] + (o.dx || 14), q[1] + (o.dy || -12), { size: o.size || 26, fam: o.fam || F.math, w: 700, c: o.c || C.white, a, align: o.align || 'left' });
  }
  /* coloured runs of text: parts = [[s, colour, family?], …] */
  /* "_xy" inside a run is drawn as a subscript */
  const runs = s => s.split(/_([A-Za-z]+)/).map((r, i) => [r, i % 2 === 1]).filter(r => r[0]);
  function rich(parts, x, y, o = {}) {
    const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    if (a <= 0.003) return x;
    const wid = (s, f) => runs(s).reduce((t, [r, sub]) => t + tw(r, sub ? size * 0.66 : size, f, w), 0);
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + wid(p[0], p[2] || fam), 0) / 2;
    for (const [s, col, f] of parts) {
      for (const [r, sub] of runs(s)) {
        const sz = sub ? size * 0.66 : size;
        txt(r, cx, y + (sub ? size * 0.22 : 0), { size: sz, fam: f || fam, w, c: col, a });
        cx += tw(r, sz, f || fam, w);
      }
    }
    return cx;
  }
  /* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
  const MISSING = new Set();
  function lean(x, y, key, a, o = {}) {
    if (a <= 0.003) return;
    const gid = GID[key], r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return;
    }
    const size = o.size || 18, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* a small violet tag for comparisons, images and literature results */
  function tag(s, x, y, a, o = {}) {
    if (a <= 0.003) return;
    txt(s, x, y, { size: o.size || 20, fam: F.zh, w: 700, c: o.c || C.argued, a, align: o.align || 'left' });
  }
  const f3 = v => (v < -0.0005 ? '−' : '') + Math.abs(v).toFixed(3);

  return { DEG, V, Z, E1, E2, E3, N, ADDR, SKEW, ORDER, TABLE, PULSE, MBQC, GID, verify,
    fade, win, view, path, circle, arc, geo, disc, fan, ball, axisLine, pt, rich, lean, tag, f3 };
})();

FILM.init.push(() => A03.verify());
FILM.init.push(() => Object.assign(FILM.speed, { a03_title: 0.02, a03_address: 0.014, a03_order: 0.016, a03_table: 0.012,
  a03_pulse: 0.018, a03_glance: 0.016, a03_next: 0.02 }));

/* ======================================================================= */
/*  1 · THREE AXES: a third direction, three planes, a sphere                */
/* ======================================================================= */
SCENES.a03_title = S => {
  const { view, ball, axisLine, disc, path, circle, pt, rich, tag, E1, E2, E3, V } = A03;
  const u = S.u, L0 = lineAt(S, 0);
  SPINE.title(S, 3, '合拢·从面到球', 'Closing the sphere');
  const ra = at(S, 0, 0.6) * clamp((S.d - u) / 0.4);
  SPINE.rail(S, 3, ra);
  const a = clamp((u - L0.s + 0.1) / 0.7) * clamp((S.d - u) / 0.4);
  if (a <= 0.003) return;
  badgeQ(S, [[0, 'Stand', 'computed'], [1, 'Three planes', 'argued']]);
  const vw = view(620, 500, 260, -2.1, 0.34);
  const close = Q(S, 1, 'Three planes', 1.2);
  ball(vw, a * (0.35 + 0.65 * close), { equator: false, grid: close, rim: close > 0.5 ? C.white : C.dim, rimA: 0.5 + 0.4 * close, rimW: 1.6 + 1.4 * close });
  /* the three planes */
  const pa = Q(S, 0, 'every pair', 1.2);
  const planes = [[E1, E2, 'I_z = e₁∧e₂'], [E2, E3, 'I_x = e₂∧e₃'], [E3, E1, 'I_y = e₃∧e₁']];
  planes.forEach(([p, q], k) => {
    const pk = a * clamp(pa * 3 - k);
    disc(vw, p, q, C.mag, pk, 0.1 + 0.05 * close);
    path(vw, circle(p, q, 120), C.mag, pk * (0.75 - 0.3 * close), 2, { backA: 0.3 });
  });
  /* the axes: two already there, the third arrives */
  const third = Q(S, 0, 'third pencil', 0.8);
  axisLine(vw, E1, C.vio, a, 'e₁', { dx: -34, dy: 26 });
  axisLine(vw, E2, C.vio, a, 'e₂', { dx: 10, dy: 8 });
  axisLine(vw, E3, C.vio, a * third, 'e₃', { dx: 12, dy: 4 });
  /* one plane: one circle; the amber state runs once round the equator */
  const one = Q(S, 1, 'One plane', 0.5) * (1 - Q(S, 1, 'Three planes', 0.5));
  if (one > 0.003) {
    path(vw, circle(E1, E2, 120), C.mag, a * one, 4, { backA: 0.45 });
    const t = clamp((u - (lineAt(S, 1).s + 0.2)) / 2.4);
    pt(vw, V.rot(E1, E3, TAU * t), 'g', a * one, 12);
  }
  /* the card */
  const px = 1080, py = 250;
  panel(px, py, 700, 470, a, C.cyan, 'PART III · THREE AXES · 三根轴');
  rich([['e₁ ⊥ e₂ ⊥ e₃', C.vio]], px + 30, py + 90, { size: 34, a: a * clamp(third * 2) });
  const r1 = a * pa;
  rich([['I_z = e₁∧e₂', C.mag]], px + 30, py + 155, { size: 30, a: r1 * clamp(pa * 3) });
  rich([['I_x = e₂∧e₃', C.mag]], px + 30, py + 205, { size: 30, a: r1 * clamp(pa * 3 - 1) });
  rich([['I_y = e₃∧e₁', C.mag]], px + 30, py + 255, { size: 30, a: r1 * clamp(pa * 3 - 2) });
  rich([['each squares to −1', C.white]], px + 270, py + 255, { size: 24, fam: F.mono, a: r1 * clamp(pa * 3 - 2) * 0.85 });
  const im = a * Q(S, 1, 'Three planes', 0.8);
  line(px + 30, py + 300, px + 670, py + 300, C.dim, im * 0.6, 1);
  txt('one plane: a circle · three planes: a sphere', px + 30, py + 350, { size: 24, fam: F.mono, w: 700, c: C.argued, a: im });
  txt('单面成圆，三面成球', px + 30, py + 395, { size: 30, fam: F.zh, w: 900, c: C.argued, a: im });
  txt("the author's image", px + 30, py + 440, { size: 18, fam: F.mono, w: 700, c: C.argued, a: im * 0.9 });
  tag('· 作者的意象', px + 252, py + 440, im * 0.9, { size: 18 });
};

/* ======================================================================= */
/*  2 · TWO ANGLES: tilt once, twist once; any two axes suffice             */
/* ======================================================================= */
SCENES.a03_address = S => {
  const { view, ball, axisLine, path, circle, arc, pt, rich, lean, tag, fan, E1, E2, E3, N, V, ADDR, SKEW, win } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  badgeQ(S, [[0, 'From', 'computed'], [3, 'Lean checks', 'lean']]);
  const vw = view(600, 505, 265, -2.1, 0.34);
  ball(vw, a, { grid: 0.5 + 0.5 * Q(S, 2, 'Latitude', 0.8) * (1 - at(S, 3, 0.6)) });
  const sk = at(S, 3, 0.7, 0.1);
  axisLine(vw, E2, C.vio, a * (1 - sk) * (0.5 + 0.5 * (1 - Q(S, 1, 'twist', 0.5))), 'e₂', { dx: 10, dy: 8 });
  axisLine(vw, E3, C.vio, a * (1 - sk) * (0.4 + 0.6 * Q(S, 1, 'twist', 0.5)), 'e₃', { dx: 12, dy: 4 });
  pt(vw, N, 'w', a, 9, 'N', { dx: -40, dy: -10 });
  /* step 1: the tilt down the meridian */
  const t1 = clamp((u - phraseAt(S, 0, 'tilt sixty') - 0.1) / 2.2);
  const t2 = clamp((u - phraseAt(S, 1, 'twist') - 0.1) / 2.0);
  const showPath = a * (1 - sk * 0.75);
  if (t1 > 0) {
    fan(vw, N, E2, ADDR.th * t1, C.mag, showPath, 0.16);
    path(vw, arc(N, E2, ADDR.th * t1, 50), C.now, showPath, 4);
  }
  /* height: a cyan drop to the vertical axis once the tilt is done */
  const hz = a * Q(S, 0, 'height', 0.6) * (1 - sk);
  if (hz > 0.003) {
    const p = vw(ADDR.tilt), q = vw([0, 0, 0.5]), o = vw([0, 0, 0]);
    dashed(p[0], p[1], q[0], q[1], C.cyan, hz * 0.8, 2);
    line(o[0], o[1], q[0], q[1], C.cyan, hz, 7);
    txt('z = cos 60° = 1/2', q[0] + 22, q[1] - 22, { size: 24, fam: F.math, w: 700, c: C.cyan, a: hz });
  }
  /* step 2: the latitude circle and the twist along it */
  const lat = a * clamp(Q(S, 1, 'twist', 0.6) + Q(S, 2, 'Latitude', 0.6)) * (1 - sk);
  path(vw, circle(E1, E2, 120, [0, 0, 0.5], Math.sqrt(3) / 2), C.vio, lat * 0.85, 2, { dash: [8, 8], backA: 0.3 });
  if (t2 > 0) path(vw, arc(ADDR.tilt, E3, ADDR.ph * t2, 30), C.now, showPath, 4);
  const cur = t2 > 0 ? V.rot(ADDR.tilt, E3, ADDR.ph * t2) : V.rot(N, E2, ADDR.th * t1);
  if (t1 > 0) pt(vw, cur, 'g', a * (1 - sk * 0.7), 12);
  txt('60°', vw(V.rot(N, E2, 0.5))[0] + 14, vw(V.rot(N, E2, 0.5))[1] - 4, { size: 24, fam: F.mono, w: 700, c: C.now, a: a * clamp(t1 * 3) * (1 - sk) });
  const lx = vw(ADDR.x);
  txt('45°', lx[0] + 4, lx[1] + 36, { size: 24, fam: F.mono, w: 700, c: C.now, a: a * clamp(t2 * 3) * (1 - sk) });
  /* latitude / longitude */
  const ll = a * Q(S, 2, 'one right angle', 0.6) * (1 - sk);
  if (ll > 0.003) {
    const mer = []; for (let i = 0; i <= 60; i++) { const th = Math.PI * i / 60; mer.push([Math.sin(th) * Math.cos(ADDR.ph), Math.sin(th) * Math.sin(ADDR.ph), Math.cos(th)]); }
    path(vw, mer, C.now, ll * Q(S, 2, 'the second', 0.6) * 0.7, 2, { dash: [4, 7], backA: 0.3 });
  }
  /* step 3: the skew pair */
  if (sk > 0.003) {
    axisLine(vw, SKEW.a, C.vio, a * sk, 'a', { dx: 12, dy: 4 });
    axisLine(vw, SKEW.b, C.vio, a * sk, 'b', { dx: 12, dy: -4 });
    const o = vw([0, 0, 0]);
    txt('30°', o[0] + 22, o[1] - 150, { size: 24, fam: F.mono, w: 700, c: C.vio, a: a * sk });
    /* the word b, then a: back on the addressed point */
    let p = N, cur2 = N;
    SKEW.word.forEach(([ax, an], k) => {
      const w = clamp(Q(S, 3, 'any two', 2.4) * 2 - k);
      if (w > 0) { path(vw, arc(p, ax, an * w, 50), k ? C.white : C.now, a * sk * 0.95, 3.5); cur2 = V.rot(p, ax, an * w); }
      p = V.rot(p, ax, an);
    });
    pt(vw, cur2, 'g', a * sk, 11);
    const ex = vw(SKEW.end);
    txt('x', ex[0] + 14, ex[1] - 12, { size: 26, fam: F.math, w: 700, c: C.now, a: a * sk * clamp(Q(S, 3, 'any two', 2.4) * 2 - 1.6) });
    txt('turn 1 about b · turn 2 about a', 160, 800, { size: 20, fam: F.mono, w: 700, c: C.white, a: a * sk * 0.85 });
  }
  /* the card */
  const px = 1060, py = 230, cw = 740;
  const c1 = a * win(S, 0, 3);
  panel(px, py, cw, 520, c1, C.cyan, 'TWO ANGLES · 两角寻址');
  rich([['tilt  ', C.white, F.mono], ['R_y(60°) N = (√3/2, 0, ', C.white], ['1/2', C.cyan], [')', C.white]], px + 30, py + 95, { size: 30, a: c1 * clamp(t1 * 2) });
  rich([['twist  ', C.white, F.mono], ['R_z(45°) R_y(60°) N', C.white]], px + 30, py + 165, { size: 30, a: c1 * clamp(t2 * 2) });
  rich([['= (√6/4, √6/4, 1/2)', C.now]], px + 140, py + 222, { size: 34, a: c1 * clamp(t2 * 2 - 1) });
  rich([['≈ (0.612, 0.612, 0.500)', C.dim]], px + 140, py + 266, { size: 24, fam: F.mono, a: c1 * clamp(t2 * 2 - 1) });
  const l2 = c1 * Q(S, 2, 'Latitude', 0.6);
  line(px + 30, py + 310, px + cw - 30, py + 310, C.dim, l2 * 0.6, 1);
  rich([['θ', C.now], [' picks the latitude circle', C.white, F.mono]], px + 30, py + 362, { size: 26, a: l2 });
  rich([['φ', C.now], [' picks the place on it', C.white, F.mono]], px + 30, py + 408, { size: 26, a: c1 * Q(S, 2, 'the second', 0.6) });
  txt('正交一次定纬度圈，正交两次定圈上的位置', px + 30, py + 460, { size: 22, fam: F.zh, w: 700, c: C.white, a: c1 * Q(S, 2, 'the second', 0.6) * 0.85 });
  /* the Lean card */
  const c2 = a * win(S, 3);
  panel(px, py, cw, 520, c2, C.lean, 'ANY TWO AXES · 任意两根轴');
  rich([['⟨a, b⟩² < ‖a‖² ‖b‖²', C.white]], px + 30, py + 95, { size: 32, a: c2 });
  txt('a, b not on one line · a、b 不共线', px + 30, py + 138, { size: 20, fam: F.zh, w: 700, c: C.dim, a: c2 });
  const c3 = c2 * Q(S, 3, 'build every rotation', 0.6);
  rich([['every R with det R = 1', C.white]], px + 30, py + 208, { size: 30, a: c3 });
  rich([['= a finite product of turns', C.white]], px + 30, py + 254, { size: 30, a: c3 });
  rich([['   about a or about b', C.vio]], px + 30, py + 300, { size: 30, a: c3 });
  lean(px + 30, py + 380, 'word', c3, { size: 20 });
  txt('existence only: no shortest word, no recipe · 只保证存在，不给最短字', px + 30, py + 430, { size: 19, fam: F.zh, w: 700, c: C.lean, a: c3 * 0.9 });
  tag('on the ball: one such word, b then a, reaching x · 球上：先绕 b、再绕 a，到达 x', px + 30, py + 475, c3 * 0.85, { size: 18, c: C.dim });
};

/* ======================================================================= */
/*  3 · ORDER: the doing depends on order                                    */
/* ======================================================================= */
SCENES.a03_order = S => {
  const { view, ball, axisLine, path, arc, pt, rich, tag, E1, E2, N, V, ORDER } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  badgeQ(S, [[0, 'But', 'computed'], [1, 'Order belongs', 'argued']]);
  const vw = view(560, 510, 255, -2.1, 0.34);
  const dim1 = 1 - 0.55 * Q(S, 1, 'Order belongs', 0.8);
  ball(vw, a * dim1, { grid: 0.4 });
  axisLine(vw, E1, C.vio, a * 0.55 * dim1, 'X', { dx: -30, dy: 24, size: 26, w: 2.5 });
  axisLine(vw, E2, C.vio, a * 0.55 * dim1, 'Y', { dx: 10, dy: 8, size: 26, w: 2.5 });
  pt(vw, N, 'w', a * dim1, 9, 'N', { dx: -40, dy: -10 });
  /* route A: about Y, then about X (amber); route B: about X, then about Y (white) */
  const tA = clamp((u - phraseAt(S, 0, 'quarter turn') - 0.1) / 1.8);
  const tB = clamp((u - phraseAt(S, 0, 'Swap') - 0.1) / 1.6);
  const q = Math.PI / 2;
  if (tA > 0) {
    path(vw, arc(N, E2, q * clamp(tA * 1.6), 40), C.now, a * dim1, 4);
    pt(vw, tA < 0.63 ? V.rot(N, E2, q * clamp(tA * 1.6)) : ORDER.A2, 'g', a * dim1, 12);
    const st = clamp(tA * 2.7 - 1.7);
    if (st > 0) { const e = vw(ORDER.A2); ring(e[0], e[1], 16 + 22 * st, C.now, a * dim1 * (1 - st), 2); }
    if (tA >= 1) { const e = vw(ORDER.A2); txt('+X', e[0] + 22, e[1] + 40, { size: 28, fam: F.math, w: 700, c: C.now, a: a * dim1 }); }
  }
  if (tB > 0) {
    path(vw, arc(N, E1, q * clamp(tB * 1.6), 40), C.white, a * dim1, 4);
    pt(vw, tB < 0.63 ? V.rot(N, E1, q * clamp(tB * 1.6)) : ORDER.B2, 'w', a * dim1, 12);
    const sb = clamp(tB * 2.7 - 1.7);
    if (sb > 0) { const e = vw(ORDER.B2); ring(e[0], e[1], 16 + 22 * sb, C.white, a * dim1 * (1 - sb), 2); }
    if (tB >= 1) { const e = vw(ORDER.B2); txt('−Y', e[0] - 20, e[1] - 18, { size: 28, fam: F.math, w: 700, c: C.white, a: a * dim1, align: 'right' }); }
  }
  /* the card */
  const px = 1040, py = 240, cw = 760;
  rich([['R_x(90°) R_y(90°) N = ', C.white], ['+X', C.now]], px + 20, py + 60, { size: 34, a: a * clamp(tA * 2 - 0.6) });
  rich([['R_y(90°) R_x(90°) N = ', C.white], ['−Y', C.white]], px + 20, py + 120, { size: 34, a: a * clamp(tB * 2 - 0.6) });
  txt('2nd turn: in place, on its own axis (rings) · 第二次转动在原地（圆环）', px + 20, py + 205, { size: 19, fam: F.zh, w: 700, c: C.dim, a: a * clamp(tB * 2 - 1) * (1 - Q(S, 1, 'why do we believe', 0.5)) });
  txt('same two turns, ends 90° apart · 同样两次转动，终点相隔 90°', px + 20, py + 170, { size: 21, fam: F.zh, w: 700, c: C.dim, a: a * clamp(tB * 2 - 1) });
  const q1 = a * Q(S, 1, 'why do we believe', 0.6);
  txt('Why believe order rules the quantum?', px + 20, py + 270, { size: 36, fam: F.disp, w: 700, c: C.white, a: q1 * (1 - 0.6 * Q(S, 1, 'Order belongs', 0.6)) });
  const q2 = a * Q(S, 1, 'Order belongs', 0.7);
  panel(px, py + 320, cw, 220, q2, C.argued, 'APHORISM · 格言');
  txt('Order belongs to the doing,', px + 34, py + 400, { size: 38, fam: F.disp, w: 700, c: C.white, a: q2 });
  txt('not to the comparing.', px + 34, py + 448, { size: 38, fam: F.disp, w: 700, c: C.white, a: q2 * Q(S, 1, 'not to the comparing', 0.6) });
  txt('顺序属于动作，不属于比较。', px + 34, py + 505, { size: 30, fam: F.zh, w: 900, c: C.argued, a: q2 * Q(S, 1, 'not to the comparing', 0.6) });
};

/* ======================================================================= */
/*  4 · THE TABLE: pairwise overlaps, read in any order                     */
/* ======================================================================= */
SCENES.a03_table = S => {
  const { view, ball, path, geo, arc, pt, rich, lean, tag, E3, V, Z, TABLE, f3 } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  badgeQ(S, [[0, 'Take', 'computed'], [2, 'Lean checks', 'lean'], [3, 'Like distances', 'argued']]);
  const vw = view(420, 500, 235, -2.1, 0.34);
  ball(vw, a, { grid: 0.35 });
  const T = TABLE, D = T.dirs;
  /* the second family B = UA, turned by 90° about the vertical (line 2) */
  const tb = Q(S, 2, 'common turn', 1.6);
  const turnA = a * Q(S, 2, 'families with', 0.6);
  if (turnA > 0.003) {
    const Db = D.map(d => V.rot(d, E3, (Math.PI / 2) * tb));
    [[0, 1], [1, 2], [2, 0]].forEach(([i, j]) => path(vw, geo(Db[i], Db[j], 40), C.white, turnA * 0.55, 2, { dash: [6, 6], backA: 0.25 }));
    Db.forEach((d, i) => pt(vw, d, 'w', turnA * 0.7, 7));
    path(vw, arc([0.62, 0, 1.15], E3, (Math.PI / 2) * tb, 30), C.vio, turnA, 3);
    if (tb > 0.2) { const e = vw(V.rot([0.62, 0, 1.15], E3, (Math.PI / 2) * tb)); txt('U', e[0] + 10, e[1] - 6, { size: 28, fam: F.math, w: 700, c: C.vio, a: turnA }); }
  }
  /* the three states and the three comparisons */
  const ed = Q(S, 0, 'Compare each pair', 1.5);
  [[0, 1], [0, 2], [1, 2]].forEach(([i, j], k) => path(vw, geo(D[i], D[j], 40), C.cyan, a * clamp(ed * 3 - k), 4, { backA: 0.35 }));
  pt(vw, D[0], 'w', a, 10, 'N', { dx: -40, dy: -10 });
  pt(vw, D[1], 'w', a, 10, '+X', { dx: -56, dy: 28 });
  pt(vw, D[2], 'g', a, 12, 'x', { dx: 14, dy: -10, c: C.now });
  /* the table: relabelled to (x, N, +X) while "any order" is spoken */
  const px = 790, py = 220, cw = 1010;
  panel(px, py, cw, 420, a, C.cyan, 'PAIRWISE OVERLAPS ⟨ψᵢ, ψⱼ⟩ · 两两内积');
  const sh = Q(S, 1, 'any order', 1.2);
  const perm = [1, 2, 0];                     // display slot of each state after the shuffle: N → 1, +X → 2, x → 0
  const slot = i => lerp(i, perm[i], ease(sh));
  const cx0 = px + 180, cy0 = py + 120, cwid = 260, rh = 92;
  const xs = i => cx0 + cwid * slot(i), ys = i => cy0 + rh * slot(i);
  const wa = a * Q(S, 1, 'Born weights', 0.8);
  for (let i = 0; i < 3; i++) {
    const lc = i === 2 ? C.now : C.white;
    txt(T.labels[i], xs(i) + cwid / 2 - 10, py + 70, { size: 28, fam: F.math, w: 700, c: lc, a, align: 'center' });
    txt(T.labels[i], px + 60, ys(i) + 40, { size: 28, fam: F.math, w: 700, c: lc, a, align: 'center' });
    for (let j = 0; j < 3; j++) {
      const g = T.G[i][j], x = xs(j), y = ys(i), on = i !== j;
      const ca = a * (on ? clamp(ed * 3 - [0, 0, 1, 0, 0, 2, 1, 2, 0][i * 3 + j]) : 0.6);
      box(x, y, cwid - 20, rh - 12, on ? C.cyan : C.dim, ca * 0.6, 1.2);
      const s = Math.abs(g[1]) < 1e-12 ? f3(g[0]) : `${f3(g[0])} ${g[1] < 0 ? '−' : '+'} ${Math.abs(g[1]).toFixed(3)}i`;
      txt(s, x + (cwid - 20) / 2, y + 36, { size: 25, fam: F.mono, w: 700, c: on ? C.white : C.dim, a: ca, align: 'center' });
      if (on) {
        const wv = T.w[i][j], ws = Math.abs(wv - 0.5) < 1e-12 ? '1/2' : Math.abs(wv - 0.75) < 1e-12 ? '3/4' : '≈ 0.81';
        txt(`weight ${ws}`, x + (cwid - 20) / 2, y + 66, { size: 19, fam: F.mono, w: 700, c: C.cyan, a: ca * wa, align: 'center' });
      }
    }
  }
  txt('rows and columns reordered, every pair reads the same · 换次序读，每一对都不变', px + 30, py + 405, { size: 19, fam: F.zh, w: 700, c: C.dim, a: a * sh * (1 - Q(S, 2, 'Lean', 0.5)) });
  /* the Lean card */
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  panel(px, py + 440, cw, 190, la, C.lean, 'SAME TABLE ⇒ ONE COMMON TURN');
  rich([['B*B = A*A', C.white], ['   ⇒   ', C.dim], ['∃ U unitary,  B = U A', C.white]], px + 30, py + 512, { size: 32, a: la });
  lean(px + 30, py + 568, 'gram', la * Q(S, 2, 'common turn', 0.5), { size: 18 });
  txt('the complex table, phases kept · 保留相位的复内积表', px + 30, py + 608, { size: 19, fam: F.zh, w: 700, c: C.lean, a: la * Q(S, 2, 'common turn', 0.5) * 0.9 });
  /* the towns */
  const tw3 = a * Q(S, 3, 'Like distances', 0.6);
  txt('comparison: distances between towns', 130, 790, { size: 20, fam: F.mono, w: 700, c: C.argued, a: tw3 });
  txt('fix a map, up to sliding and turning it', 130, 818, { size: 20, fam: F.mono, w: 700, c: C.argued, a: tw3 });
  tag('比方：距离表定死地图，只差挪到哪、转多少；保留相位，不许翻面', 130, 850, tw3, { size: 20 });
  /* the turn on the ball */
  txt('dashed: B = U A, U = diag(1, i), 90° about the vertical', 130, 760, { size: 18, fam: F.mono, w: 700, c: C.dim, a: turnA * (1 - tw3) });
};

/* ======================================================================= */
/*  5 · PULSE AND PHASE: area, zero-time Z, push or pull                    */
/* ======================================================================= */
SCENES.a03_pulse = S => {
  const { view, ball, axisLine, path, arc, fan, pt, rich, lean, tag, E1, E2, E3, N, V, PULSE, win } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  badgeQ(S, [[0, 'In the lab', 'argued'], [1, 'Ten', 'computed'], [2, 'A turn', 'argued'], [3, 'Lean checks', 'lean']]);
  /* left: the envelope (lines 0–1), then the schedule (line 2), then push / pull (line 3) */
  const w1 = a * win(S, 0, 2), w2 = a * win(S, 2, 3), w3 = a * win(S, 3);
  const gx = 170, gy = 640, gw = 700, gh = 330;
  if (w1 > 0.003) {
    panel(gx - 50, 210, gw + 100, 540, w1, C.cyan, 'ENVELOPE · 包络');
    line(gx, gy, gx + gw, gy, C.dim, w1, 1.6); line(gx, gy, gx, gy - gh, C.dim, w1, 1.6);
    txt('t (ns)', gx + gw, gy + 40, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w1, align: 'right' });
    txt('Ω/2π (MHz)', gx + 8, gy - gh - 12, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w1 });
    const k = clamp((u - phraseAt(S, 0, 'area under it')) / 1.4) ;
    const x0 = gx + 60, x1 = gx + 60 + 500, yT = gy - 250;
    const xf = lerp(x0, x1, k);
    fillBox(x0, yT, xf - x0, gy - yT, C.mag, w1 * 0.3);
    line(x0, gy, x0, yT, C.mag, w1, 3); line(x0, yT, x1, yT, C.mag, w1 * clamp(k * 3), 3); line(x1, yT, x1, gy, C.mag, w1 * (k >= 1 ? 1 : 0), 3);
    txt('10', gx - 14, yT + 8, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w1, align: 'right' });
    txt('0', x0, gy + 32, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w1, align: 'center' });
    txt('25', x1, gy + 32, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w1, align: 'center' });
    const ar = w1 * Q(S, 1, 'pi over two', 0.6);
    rich([['area = 2π · 10 MHz · 25 ns = ', C.white], ['π/2', C.mag]], gx, gy + 92, { size: 28, a: w1 * Q(S, 1, 'Ten', 0.6) });
    tag('area law: literature result, not formalized in the book · 面积律：文献结果', gx, gy + 132, ar * 0.95, { size: 18 });
  }
  /* right: the quarter turn on the ball */
  const vw = view(1390, 470, 230, -2.1, 0.34);
  if (w1 > 0.003) {
    ball(vw, w1, { grid: 0.35 });
    axisLine(vw, E1, C.vio, w1, 'X', { dx: -30, dy: 24, size: 26 });
    const k = clamp((u - phraseAt(S, 1, 'pole to equator')) / 1.3);
    fan(vw, N, E1, (Math.PI / 2) * k, C.mag, w1, 0.25);
    path(vw, arc(N, E1, (Math.PI / 2) * k, 40), C.now, w1, 4);
    pt(vw, V.rot(N, E1, (Math.PI / 2) * k), 'g', w1, 12);
    pt(vw, N, 'w', w1 * 0.8, 7, 'N', { dx: -36, dy: -10 });
    txt('pole → equator · 极点 → 赤道', 1390, 760, { size: 22, fam: F.zh, w: 700, c: C.white, a: w1 * k, align: 'center' });
  }
  /* line 2: the schedule, with a 0 ns Z */
  if (w2 > 0.003) {
    panel(120, 230, 1680, 470, w2, C.cyan, 'SCHEDULE · 脉冲时序');
    const ty = 470, x0 = 220;
    line(x0, ty + 70, x0 + 1480, ty + 70, C.dim, w2, 1.6);
    txt('time →', x0 + 1480, ty + 108, { size: 20, fam: F.mono, w: 700, c: C.dim, a: w2, align: 'right' });
    const blk = (x, s, sub, a2) => {
      fillBox(x, ty - 60, 380, 120, C.mag, a2 * 0.22); box(x, ty - 60, 380, 120, C.mag, a2, 2);
      txt(s, x + 190, ty - 6, { size: 30, fam: F.math, w: 700, c: C.white, a: a2, align: 'center' });
      txt(sub, x + 190, ty + 36, { size: 20, fam: F.mono, w: 700, c: C.mag, a: a2, align: 'center' });
    };
    blk(x0 + 60, 'X(π/2)', 'phase 0° · 25 ns', w2);
    const z = w2 * Q(S, 2, 'vertical', 0.6);
    line(x0 + 560, ty - 110, x0 + 560, ty + 70, C.vio, z, 4);
    txt('Z(60°)', x0 + 560, ty - 124, { size: 28, fam: F.math, w: 700, c: C.vio, a: z, align: 'center' });
    txt('0 ns', x0 + 560, ty + 108, { size: 22, fam: F.mono, w: 700, c: C.vio, a: z, align: 'center' });
    const ph = w2 * Q(S, 2, 'shifts the phase', 0.6);
    blk(x0 + 700, 'X(π/2)', ph > 0.5 ? 'phase −60° · 25 ns' : 'phase 0° · 25 ns', w2);
    rich([['φ_phys = φ − λ', C.now]], x0 + 890, ty - 90, { size: 26, a: ph, align: 'center' });
    rich([['P(0) = 1/4', C.cyan], ['  with the Z, or with only the phase shift · 两种做法读数相同', C.white, F.zh]], x0 + 60, ty + 170, { size: 26, a: ph });
    tag('virtual Z: literature result, not formalized in the book · 虚拟 Z：文献结果', x0 + 60, ty + 206, w2 * 0.95, { size: 18 });
  }
  /* line 3: push or pull */
  if (w3 > 0.003) {
    const dial = (cx, push, lab, labZh) => {
      const R = 150, cy = 450;
      ring(cx, cy, R, C.dim, w3 * 0.7, 1.6);
      const st = push ? -60 * A03.DEG : 0, rd = push ? 0 : 60 * A03.DEG;     // screen angles from straight up
      const k = Q(S, 3, push ? 'push' : 'pull', 1.0);
      const sA = st * k, rA = rd * k;
      /* readout direction (white) and state (amber) */
      arrow(cx, cy, cx + R * Math.sin(rA), cy - R * Math.cos(rA), C.white, w3, 3);
      arrow(cx, cy, cx + R * Math.sin(sA), cy - R * Math.cos(sA), C.now, w3, 4);
      ctx.save(); ctx.globalAlpha = w3 * clamp(k * 2); ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.beginPath();
      const a0 = -Math.PI / 2 + Math.min(sA, rA), a1 = -Math.PI / 2 + Math.max(sA, rA);
      ctx.arc(cx, cy, 60, a0, a1); ctx.stroke(); ctx.restore();
      txt(lab, cx, cy + R + 48, { size: 24, fam: F.mono, w: 700, c: C.white, a: w3, align: 'center' });
      txt(labZh, cx, cy + R + 80, { size: 22, fam: F.zh, w: 700, c: C.white, a: w3 * 0.85, align: 'center' });
      txt('P(0) = 3/4', cx, cy - R - 22, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: w3 * clamp(k * 2 - 1), align: 'center' });
    };
    dial(330, true, 'push the state', '推态');
    dial(760, false, 'pull the readout back', '拉回读出方向');
    tag('one unitary step of 60°, a special case · 幺正一步，是特例', 545, 760, w3 * 0.9, { size: 19, c: C.dim, align: 'center' });
    const px = 1040, py = 240, cw = 760;
    const la = w3 * Q(S, 3, 'Lean checks', 0.6);
    panel(px, py, cw, 470, la, C.lean, 'PUSH = PULL · 推与拉');
    txt('given  Tr(Φ(X)·E) = Tr(X·Φ*(E))', px + 30, py + 90, { size: 26, fam: F.math, w: 700, c: C.dim, a: la });
    txt('for every step count t:', px + 30, py + 150, { size: 24, fam: F.mono, w: 700, c: C.white, a: la });
    rich([['Tr(Φᵗ(ρ) · E)', C.now], ['  =  ', C.white], ['Tr(ρ · (Φ*)ᵗ(E))', C.white]], px + 30, py + 220, { size: 32, a: la });
    txt('Φ: any quantum channel · Φ*: a CP map dual to it', px + 30, py + 275, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
    lean(px + 30, py + 350, 'pull', la * Q(S, 3, 'same reading', 0.5), { size: 18 });
    txt('a trace identity, not a pulse time or error rate · 迹恒等式，不是脉冲时长或误差', px + 30, py + 400, { size: 18, fam: F.zh, w: 700, c: C.lean, a: la * Q(S, 3, 'same reading', 0.5) * 0.9 });
    tag('comparison: turn the map instead of walking · 比方：转地图，而不是走路', px + 30, py + 445, w3 * Q(S, 3, 'Like turning', 0.6) * 0.95, { size: 18 });
  }
};

/* ======================================================================= */
/*  6 · MEASURING COMPUTES: one glance, one gate                            */
/* ======================================================================= */
SCENES.a03_glance = S => {
  const { view, ball, path, circle, pt, rich, lean, tag, E1, E2, E3, V, MBQC, win } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  badgeQ(S, [[0, 'The boldest', 'argued'], [1, 'The second', 'computed'], [2, 'Lean checks', 'lean'], [3, 'The links', 'argued']]);
  const v1 = view(400, 450, 165, -2.1, 0.34), v2 = view(880, 450, 165, -2.1, 0.34);
  ball(v1, a, { grid: 0.3 }); ball(v2, a, { grid: 0.3 });
  txt('qubit 1 · 比特 1', 400, 690, { size: 22, fam: F.zh, w: 700, c: C.white, a, align: 'center' });
  txt('qubit 2 · 比特 2', 880, 690, { size: 22, fam: F.zh, w: 700, c: C.white, a, align: 'center' });
  /* the link */
  const lk = a * Q(S, 0, 'link two qubits', 0.8);
  line(400 + 170, 450, 400 + 170 + 140 * lk, 450, C.white, lk, 5);
  txt('CZ', 640, 432, { size: 24, fam: F.mono, w: 700, c: C.white, a: lk, align: 'center' });
  /* the input on qubit 1 and the measurement pointer at α = 60° on its equator */
  pt(v1, MBQC.inDir, 'g', a * (1 - Q(S, 1, 'receives', 0.6) * 0.6), 10, 'ψ', { dx: 12, dy: -10, c: C.now });
  pt(v2, [1, 0, 0], 'w', lk * (1 - Q(S, 1, 'receives', 0.6)), 8, '|+⟩', { dx: -60, dy: 30, fam: F.math });
  const ma = a * Q(S, 0, 'an angle alpha', 0.8);
  if (ma > 0.003) {
    const o = v1([0, 0, 0]), m = [Math.cos(MBQC.al), Math.sin(MBQC.al), 0];
    const sweep = []; for (let i = 0; i <= 30; i++) sweep.push([Math.cos(MBQC.al * i / 30) * 0.45, Math.sin(MBQC.al * i / 30) * 0.45, 0]);
    path(v1, sweep, C.now, ma, 2.5);
    const p = v1(m); arrow(o[0], o[1], p[0], p[1], C.now, ma, 4);
    txt('α = 60°', p[0] + 16, p[1] + 8, { size: 24, fam: F.math, w: 700, c: C.now, a: ma });
  }
  /* the result s travels to qubit 2; its state moves to the branch */
  const ff = a * Q(S, 1, 'receives a gate', 1.0);
  if (ff > 0.003) {
    ctx.save(); ctx.globalAlpha = ff; ctx.strokeStyle = C.white; ctx.lineWidth = 2; ctx.setLineDash([8, 8]);
    ctx.beginPath(); ctx.moveTo(400, 250); ctx.quadraticCurveTo(640, 170, 880, 250); ctx.stroke(); ctx.restore();
    txt('s', 640, 196, { size: 30, fam: F.math, w: 700, c: C.white, a: ff, align: 'center' });
    pt(v2, MBQC.out[0], 'g', ff, 12, 's = 0', { dx: 14, dy: -12, fam: F.mono, size: 20, c: C.now });
    const f1 = a * Q(S, 1, 'known flip', 0.6);
    pt(v2, MBQC.out[1], 'w', f1 * 0.85, 9, 's = 1', { dx: 14, dy: 28, fam: F.mono, size: 20, c: C.white });
    if (f1 > 0.003) path(v2, A03.arc(MBQC.out[1], E1, Math.PI * clamp((u - phraseAt(S, 1, 'known flip')) / 1.2), 40), C.vio, f1 * 0.8, 2.5, { dash: [6, 6] });
  }
  /* the card */
  const px = 1140, py = 220, cw = 660;
  panel(px, py, cw, 560, a * Q(S, 1, 'The second', 0.6), C.cyan, 'ONE GLANCE, ONE GATE · 一瞥即一门');
  const g1 = a * Q(S, 1, 'a turn set by alpha', 0.6);
  txt('qubit 2 receives', px + 30, py + 80, { size: 24, fam: F.mono, w: 700, c: C.white, a: g1 });
  rich([['Xˢ', C.white], [' H ', C.white], ['R_z(−α)', C.now], [' |ψ⟩', C.white]], px + 30, py + 140, { size: 38, a: g1 });
  txt('up to a global phase · 差一个全局相位', px + 30, py + 180, { size: 18, fam: F.zh, w: 700, c: C.dim, a: g1 });
  /* the branch weights */
  const b = a * Q(S, 2, 'weighs one half', 0.6);
  const bx = px + 30, by = py + 250, bw = 600;
  for (let s = 0; s < 2; s++) {
    const w = MBQC.weight[s];
    fillBox(bx + bw * 0.5 * s, by, bw * w * clamp(b * 2 - s * 0.5) - 6, 34, C.cyan, b * 0.45);
    box(bx + bw * 0.5 * s, by, bw * w - 6, 34, C.cyan, b, 1.5);
    txt(`s = ${s} · 1/2`, bx + bw * 0.5 * s + bw * 0.25, by + 25, { size: 20, fam: F.mono, w: 700, c: C.white, a: b, align: 'center' });
  }
  const la = a * Q(S, 2, 'Lean checks', 0.6);
  rich([['Σₖ Tr(ρ Pₖ) = Tr ρ', C.white]], px + 30, by + 100, { size: 32, a: la });
  txt('(= 1 for a state)', px + 380, by + 100, { size: 22, fam: F.mono, w: 700, c: C.dim, a: la });
  txt('Pₖ self-adjoint, idempotent, orthogonal, complete', px + 30, by + 140, { size: 18, fam: F.mono, w: 700, c: C.dim, a: la });
  lean(px + 30, by + 200, 'branch', la * Q(S, 2, 'add up', 0.5), { size: 18 });
  tag('measurement-based computing: a literature result', px + 30, by + 250, a * Q(S, 1, 'The second', 0.6) * 0.95, { size: 17 });
  tag('基于测量的计算：文献结果，未在本书形式化', px + 30, by + 276, a * Q(S, 1, 'The second', 0.6) * 0.95, { size: 17 });
  /* rails and switches, and the aphorism */
  const rl = a * Q(S, 3, 'like rails', 0.6);
  tag('comparison: links laid in advance = rails · each measurement = a switch', 160, 790, rl, { size: 20 });
  const ap = a * Q(S, 3, 'Where you look', 0.6);
  txt('Where you look is what you compute. · 你往哪里看，就算了什么。', 160, 830, { size: 26, fam: F.zh, w: 900, c: C.argued, a: ap });
};

/* ======================================================================= */
/*  7 · ONE SPHERE CLOSED, and the question for Part IV                     */
/* ======================================================================= */
SCENES.a03_next = S => {
  const { view, ball, path, circle, pt, E1, E2, E3, ADDR } = A03;
  const u = S.u, a = A03.fade(S);
  SPINE.rail(S, 3, a);
  /* recap: four small panels, one per chapter */
  const items = [
    ['ch. 9', 'every state an address', '每个态都有地址', 'address'],
    ['ch. 10', 'every comparison agrees', '每次比较都一致', 'comparison'],
    ['ch. 11', 'a pulse, or a phase', '一个脉冲、一个相位', 'pulse'],
    ['ch. 12', 'or a glance', '或一次注视', 'glance']
  ];
  const ra = a * (1 - at(S, 1, 0.8));
  items.forEach(([ch, en, zh], k) => {
    const ka = ra * clamp((u - lineAt(S, 0).s - 0.9 * k) / 0.6);
    const x = 170 + k * 410;
    panel(x, 220, 370, 170, ka, C.cyan, ch.toUpperCase());
    txt(en, x + 24, 300, { size: 24, fam: F.mono, w: 700, c: C.white, a: ka });
    txt(zh, x + 24, 350, { size: 26, fam: F.zh, w: 700, c: C.white, a: ka * 0.9 });
  });
  /* one closed sphere under the recap; then it moves left and the second sphere of the glance scene fades in on the
     right, joined by the same white CZ link; on the question the link turns into an amber "?" */
  const one = a * clamp((u - lineAt(S, 0).s - 0.4) / 0.8);
  const mv = ease(at(S, 1, 1.0));
  const cxA = lerp(W / 2, W / 2 - 300, mv), cyA = lerp(615, 420, mv), rA = lerp(150, 170, mv);
  const vA = view(cxA, cyA, rA, -2.1, 0.34), vB = view(W / 2 + 300, 420, 170, -2.1, 0.34);
  if (one > 0.003) {
    ball(vA, one, { grid: 0.5, rim: C.white });
    pt(vA, ADDR.x, 'g', one, 12);
  }
  const two = a * at(S, 1, 0.8, 0.5);
  if (two > 0.003) ball(vB, two, { grid: 0.5, rim: C.white });
  const lk = a * Q(S, 1, 'linked two spheres', 0.7);
  const ask = at(S, 2, 0.8);
  if (lk > 0.003) {
    const x0 = W / 2 - 300 + 175, x1 = W / 2 + 300 - 175;
    line(x0, 420, x0 + (x1 - x0) * clamp(lk * 1.4), 420, C.white, lk * (1 - ask), 5);
    txt('CZ', W / 2, 402, { size: 24, fam: F.mono, w: 700, c: C.white, a: lk * (1 - ask), align: 'center' });
    txt('what is the link? · 链接是什么？', W / 2, 630, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * Q(S, 1, 'never asked', 0.6) * (1 - ask), align: 'center' });
    if (ask > 0.003) {
      ctx.save(); ctx.globalAlpha = a * ask * 0.9; ctx.strokeStyle = C.now; ctx.lineWidth = 3; ctx.setLineDash([10, 9]);
      ctx.beginPath(); ctx.moveTo(x0, 420); ctx.lineTo(x1, 420); ctx.stroke(); ctx.restore();
      txt('?', W / 2, 404, { size: 56, fam: F.orb, w: 900, c: C.now, a: a * ask, align: 'center' });
    }
  }
  SPINE.ask(S, 2, 'What happens when two spheres share one state?', '两个球共享一个态时，会发生什么？');
};

/* ---- a04 · Entangled spheres · 交织·多球共振 ---- */
/* No Third Point · act a04 · Part IV (chapters 13–16) · Entangled spheres · 交织·多球共振.
   Everything on screen is computed inside A04 from definitions, and re-derived by an independent route in
   FILM.init (any disagreement goes to window.FILM_ERRORS and stops the render).
     a04_title   Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2: ρ² = ρ, rank 1, Tr_B ρ = ½ I
                 ..... BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal (LEAN);
                 ⟨Z⊗Z⟩ = ⟨X⊗X⟩ = +1 (computed); the handshake is an analogy (argued).
     a04_bell    A₀ = Z, A₁ = X, B₀ = (Z + X)/√2, B₁ = (Z − X)/√2; pair angles 45°, 45°, 45°, 135°;
                 S = 2√2 (computed); finite deterministic local models |S| ≤ 2, attained
                 ..... ClassicalFiberBound.classical_chsh_bound_is_exact (LEAN); the fixed operator's greatest
                 expectation over two-qubit states is 2√2 ..... TsirelsonTightness.bell_chsh_state_expectation_is_greatest
                 (LEAN); the toy straight line 1 − 2θ/π is a toy model only (argued).
     a04_clone   overlap z = 0.6 kept by a unitary, copies need z² = 0.36 (computed); z = z², identical or orthogonal
                 ..... NoCloningInnerProductCriterion.no_cloning_inner_product_criterion (LEAN); the three-qubit
                 bit-flip code: 8 = 4 perpendicular planes, X_i carries the code plane whole (computed).
     a04_grover  four boxes, (½,½,½,½) → (−½,½,½,½) → (1,0,0,0); θ = 30° (computed); n-step rotation
                 sin((2n+1)θ) W + cos((2n+1)θ) B ..... CoherentUniformAmplification.uniform_operator_rotation (LEAN).
     a04_block   W(x) = [[x, i√(1−x²)], [i√(1−x²), x]], corner of W(x)^m = T_m(x) (computed); ab = 1 ⇒
                 power-sum recurrence ..... NormOneTraceAddition.trace_recurrence (LEAN); algorithms as polynomial
                 transformations (QSVT) is a literature result, not formalized in the book (argued). */

const A04 = (() => {
  const DEG = Math.PI / 180, R2 = Math.SQRT2;
  const GID = {
    marg: 'D5/S3/Quantum/Entanglement/BellPureStateMixedMarginal.bell_pure_state_has_maximally_mixed_marginal',
    cls: 'D5/S3/QuantumBounds/ClassicalFiberBound.classical_chsh_bound_is_exact',
    tsi: 'D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest',
    clone: 'D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion',
    grov: 'D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation',
    cheb: 'D5/S1/Recurrence/NormOneTraceAddition.trace_recurrence',
    phase: 'D5/S3/ContinuousObservables/PhaseSynthesis.exists_phases'
  };
  const f3 = v => (v < 0 ? '−' : '+') + Math.abs(v).toFixed(3);
  const fx = (v, d) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(d);
  const fs = v => String(parseFloat(v.toFixed(4))).replace('-', '−');   // shortest exact decimal of a reading

  /* ---------- Bell / CHSH: directions in the ZX plane, angle from Z towards X ---------- */
  const ANG = { A: [0, 90], B: [45, -45] };
  const PAIRS = [[0, 0, 1], [0, 1, 1], [1, 0, 1], [1, 1, -1]].map(([i, j, g]) => {
    const th = Math.abs(ANG.A[i] - ANG.B[j]);
    return { i, j, g, th, c: Math.cos(th * DEG) };
  });
  const S_Q = PAIRS.reduce((s, p) => s + p.g * p.c, 0);
  /* sixteen deterministic answer tables */
  const TABLES = [];
  for (let k = 0; k < 16; k++) {
    const a0 = k & 8 ? 1 : -1, a1 = k & 4 ? 1 : -1, b0 = k & 2 ? 1 : -1, b1 = k & 1 ? 1 : -1;
    TABLES.push(a0 * b0 + a0 * b1 + a1 * b0 - a1 * b1);
  }
  /* ---------- cloning ---------- */
  const Z = 0.6, Z2 = Z * Z, TH1 = Math.acos(Z) / DEG, TH2 = Math.acos(Z2) / DEG;
  /* ---------- Grover with four boxes ---------- */
  const G0 = [0.5, 0.5, 0.5, 0.5];
  const oracle = v => v.map((x, i) => (i === 0 ? -x : x));
  const diffuse = v => { const m = v.reduce((s, x) => s + x, 0) / v.length; return v.map(x => 2 * m - x); };
  const G1 = oracle(G0), G2 = diffuse(G1);
  const GTH = Math.asin(0.5) / DEG;              // sin θ = √(1/4)
  /* ---------- Chebyshev block at x = 0.6 ---------- */
  const X = 0.6, CH = [1, X];
  while (CH.length < 6) CH.push(2 * X * CH[CH.length - 1] - CH[CH.length - 2]);
  const BTH = Math.acos(X) / DEG;

  /* ---------- drawing helpers ---------- */
  function ellipse(x, y, rx, ry, col, a, lw = 1.5, dash) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU); ctx.stroke(); ctx.restore();
  }
  /* a Bloch ball drawn flat: outline, equator, axis */
  function ball(x, y, r, a, label) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a * 0.35;
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
    g.addColorStop(0, rgba(C.cyan, 0.28)); g.addColorStop(1, rgba(C.cyan, 0.02));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.restore();
    ring(x, y, r, C.cyan, a * 0.8, 2);
    ellipse(x, y, r, r * 0.28, C.cyan, a * 0.4, 1.4, [8, 7]);
    line(x, y - r, x, y + r, C.dim, a * 0.5, 1);
    if (label) txt(label, x, y - r - 26, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * 0.9, ls: 4 });
  }
  /* LEAN ✓ chip + the declaration's label, looked up by the full GID */
  function leanRef(x, y, gid, a, size = 18, maxW = 1e9) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r) { window.FILM_ERRORS.push(`film.json does not cite ${gid}`); return; }
    const head = STR.en.lean || 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.05, wh, size * 1.4, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    const name = r.label || r.name, cut = name.lastIndexOf('.');
    if (tw(name, size, F.mono, 700) <= maxW || cut < 0) { txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a }); return; }
    txt(name.slice(0, cut + 1), x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
    txt(name.slice(cut + 1), x + wh + 12, y + size * 1.35, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* a small grounds tag: kind = argued (violet) | computed (cyan) */
  function tag(x, y, s, kind, a, size = 16) {
    if (a <= 0.003) return;
    const col = kind === 'argued' ? C.argued : C.cyan, w = tw(s, size, F.mono, 700, 1.5) + 24;
    box(x, y - size - 6, w, size + 16, col, a, 1.4, 'rgba(0,0,0,0.5)');
    txt(s, x + 12, y + 2, { size, fam: F.mono, w: 700, c: col, a, ls: 1.5 });
  }
  function arc(x, y, r, a0, a1, col, a, lw = 2) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.arc(x, y, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
  }
  /* a curved thread between two points, sagging by s */
  function thread(x1, y1, x2, y2, s, col, a, lw = 3) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + s, x2, y2); ctx.stroke(); ctx.restore();
  }
  /* direction in the ZX dial: angle from Z (up) towards X (right), in degrees */
  const dir = (cx, cy, R, deg) => [cx + R * Math.sin(deg * DEG), cy - R * Math.cos(deg * DEG)];
  function dashArrow(x1, y1, x2, y2, col, a, w = 2.5) {
    if (a <= 0.003) return;
    ctx.save(); ctx.setLineDash([12, 9]); line(x1, y1, x2, y2, col, a, w); ctx.restore();
    const an = Math.atan2(y2 - y1, x2 - x1), L = 14;
    line(x2, y2, x2 - L * Math.cos(an - 0.4), y2 - L * Math.sin(an - 0.4), col, a, w);
    line(x2, y2, x2 - L * Math.cos(an + 0.4), y2 - L * Math.sin(an + 0.4), col, a, w);
  }
  /* the rail for scenes after the first: visible from the cut */
  const railIn = S => SPINE.rail(S, 4, clamp(S.u / 0.4));
  /* fade a whole scene out over its last half second */
  const out = S => clamp((S.d - S.u) / 0.5);

  /* ---------- independent checks, run once on load ---------- */
  function verify() {
    const err = m => window.FILM_ERRORS.push('a04: ' + m), near = (a, b, e = 1e-9) => Math.abs(a - b) < e;
    Object.values(GID).forEach(g => { const r = leanCite(g); if (!r || r.kind !== 'theorem') err(`not a cited theorem: ${g}`); });
    /* Bell state by 4 × 4 matrices: ρ² = ρ, Tr ρ = 1, partial trace over the second qubit = ½ I, ⟨ZZ⟩ = ⟨XX⟩ = 1 */
    const v = [1, 0, 0, 1].map(t => t / R2);
    const rho = v.map(p => v.map(q => p * q));
    const mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
    const rr = mul(rho, rho);
    rho.forEach((r, i) => r.forEach((x, j) => { if (!near(x, rr[i][j])) err('Bell density not idempotent'); }));
    const tr = rho.reduce((s, r, i) => s + r[i], 0); if (!near(tr, 1)) err('Bell trace');
    const pt = [[0, 0], [0, 0]];
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let b = 0; b < 2; b++) pt[i][j] += rho[2 * i + b][2 * j + b];
    if (!near(pt[0][0], 0.5) || !near(pt[1][1], 0.5) || !near(pt[0][1], 0) || !near(pt[1][0], 0)) err('partial trace is not ½ I');
    const pa = [[0, 0], [0, 0]];                                   // Bob's half: trace over the first qubit
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let b = 0; b < 2; b++) pa[i][j] += rho[2 * b + i][2 * b + j];
    if (!near(pa[0][0], 0.5) || !near(pa[1][1], 0.5) || !near(pa[0][1], 0) || !near(pa[1][0], 0)) err('Bob half is not ½ I');
    const kron = (A, B) => { const n = A.length, m = B.length, K = []; for (let i = 0; i < n * m; i++) { K.push([]); for (let j = 0; j < n * m; j++) K[i].push(A[Math.floor(i / m)][Math.floor(j / m)] * B[i % m][j % m]); } return K; };
    const PZ = [[1, 0], [0, -1]], PX = [[0, 1], [1, 0]];
    const ex = M => v.reduce((s, p, i) => s + p * M[i].reduce((t, x, j) => t + x * v[j], 0), 0);
    if (!near(ex(kron(PZ, PZ)), 1) || !near(ex(kron(PX, PX)), 1)) err('ZZ or XX correlation is not +1');
    /* CHSH by matrices, against the cosine sum */
    const n = d => [[Math.cos(d * DEG), Math.sin(d * DEG)], [Math.sin(d * DEG), -Math.cos(d * DEG)]];
    let S = 0; PAIRS.forEach(p => {
      const e = ex(kron(n(ANG.A[p.i]), n(ANG.B[p.j])));
      if (!near(e, p.c, 1e-12)) err(`pair correlation ${p.i}${p.j}`);
      S += p.g * e;
    });
    if (!near(S, 2 * R2, 1e-12) || !near(S_Q, 2 * R2, 1e-12)) err('CHSH value is not 2√2');
    if (PAIRS.map(p => p.th).join() !== '45,45,45,135') err('pair angles changed');
    if (!TABLES.every(s => Math.abs(s) === 2) || TABLES.filter(s => s === 2).length !== 8) err('answer tables are not ±2, eight each');
    /* cloning numbers */
    if (!near(Z2, 0.36) || TH1.toFixed(2) !== '53.13' || TH2.toFixed(2) !== '68.90') err('cloning numbers changed');
    /* three-qubit bit-flip code: code plane span{000, 111}; X_k moves it to span{e_(0 xor m), e_(7 xor m)} */
    const rooms = [0, 4, 2, 1].map(m => [0 ^ m, 7 ^ m].sort((a, b) => a - b));
    const all = rooms.flat().sort((a, b) => a - b);
    if (all.join() !== '0,1,2,3,4,5,6,7') err('the four planes do not split eight dimensions');
    /* X on the middle qubit (bit value 2) sends |000⟩, |111⟩ to |010⟩, |101⟩ and back */
    if ([0, 7].map(b => b ^ 2).join() !== '2,5' || [2, 5].map(b => b ^ 2).join() !== '0,7') err('X₂ does not move the code plane');
    /* Grover: brute-force amplitudes and the Lean rotation formula, n = 0 … 4 */
    if (G1.join() !== '-0.5,0.5,0.5,0.5' || G2.map(x => Math.round(x * 1e12) / 1e12).join() !== '1,0,0,0') err('Grover step changed');
    let g = G0.slice();
    for (let k = 0; k < 5; k++) {
      if (!near(g[0], Math.sin((2 * k + 1) * GTH * DEG), 1e-12)) err(`Grover amplitude at n = ${k}`);
      const rest = Math.sqrt(g[1] * g[1] + g[2] * g[2] + g[3] * g[3]) * Math.sign(g[1] || 1);
      if (!near(rest, Math.cos((2 * k + 1) * GTH * DEG), 1e-12)) err(`Grover failure part at n = ${k}`);
      g = diffuse(oracle(g));
    }
    if (!near(GTH, 30, 1e-12)) err('θ is not 30°');
    /* Chebyshev: corners of complex powers of W(x) against the recurrence and cos mθ */
    const s = Math.sqrt(1 - X * X);
    const cm = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]], ca = (p, q) => [p[0] + q[0], p[1] + q[1]];
    const Wm = [[[X, 0], [0, s]], [[0, s], [X, 0]]];
    const mm = (A, B) => A.map((r, i) => B[0].map((_, j) => ca(cm(r[0], B[0][j]), cm(r[1], B[1][j]))));
    let P = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
    for (let m = 0; m < CH.length; m++) {
      if (!near(P[0][0][0], CH[m], 1e-12) || !near(P[0][0][1], 0, 1e-12) || !near(CH[m], Math.cos(m * BTH * DEG), 1e-12)) err(`corner of W^${m}`);
      P = mm(P, Wm);
    }
    if (CH.slice(0, 5).map(v => fx(v, 4)).join() !== '1.0000,0.6000,−0.2800,−0.9360,−0.8432') err('Chebyshev readings changed');
  }

  return { DEG, R2, GID, f3, fx, fs, PAIRS, S_Q, TABLES, Z, Z2, TH1, TH2, G0, G1, G2, GTH, X, CH, BTH,
    ellipse, ball, leanRef, tag, arc, thread, dir, dashArrow, railIn, out, verify };
})();

FILM.init.push(() => A04.verify());

/* ======================= a04_title · two spheres, one state ======================= */
SCENES.a04_title = S => {
  const u = S.u, L0 = lineAt(S, 0), fo = A04.out(S);
  SPINE.title(S, 4, '交织·多球共振', 'Entangled spheres');
  SPINE.rail(S, 4, at(S, 0, 0.6));
  if (u > L0.s - 0.1) badgeQ(S, [[0, 'Give', 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed'], [3, null, 'argued']]);
  const a = at(S, 0, 0.8, -0.2) * fo;
  if (a <= 0.003) return;
  const ax = 600, bx = 1320, y = 410, r = 165;
  A04.ball(ax, y, r, a, 'ALICE');
  A04.ball(bx, y, r, a, 'BOB');
  /* the arrows shrink into the centres while line 0 is spoken */
  const sh = ease(Q(S, 0, 'both arrows shrink', 1.6));
  const len = r * 0.92 * (1 - sh);
  if (len > 4) {
    arrow(ax, y, ax + len * Math.sin(0.6), y - len * Math.cos(0.6), C.now, a, 3.5);
    arrow(bx, y, bx - len * Math.sin(0.9), y - len * Math.cos(0.9), C.now, a, 3.5);
  }
  dot(ax, y, 9, 'g', a); dot(bx, y, 9, 'g', a);
  txt('r = 0', ax, y + r + 46, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a: a * sh });
  txt('s = 0', bx, y + r + 46, { size: 26, fam: F.math, w: 700, align: 'center', c: C.now, a: a * sh });
  A04.tag(bx + 60, y + r + 44, 'COMPUTED · same by symmetry', 'computed', a * sh * (1 - at(S, 1, 0.4)), 14);
  /* the shared thread between the two balls: from line 2 on */
  const th = Q(S, 2, 'lives in agreement', 0.8), th0 = 0.25 * at(S, 0, 1.0, 0.6);
  if (th0 > 0 && th <= 0) A04.thread(ax + 12, y, bx - 12, y, 0, C.mag, a * th0, 2);
  if (th > 0) {
    A04.thread(ax + 12, y, bx - 12, y, 0, C.mag, a * th * 0.9, 3);
    A04.thread(ax + 12, y, bx - 12, y, -60, C.mag, a * th * 0.4, 1.5);
    A04.thread(ax + 12, y, bx - 12, y, 60, C.mag, a * th * 0.4, 1.5);
    const k = Q(S, 2, 'both along Z', 0.5), k2 = Q(S, 2, 'or both along X', 0.5);
    txt('⟨Z ⊗ Z⟩ = +1', 960, y - 92, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * k });
    txt('⟨X ⊗ X⟩ = +1', 960, y + 118, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: a * k2 });
    if (k > 0) A04.tag(890, y + 172, 'COMPUTED', 'computed', a * k * (1 - at(S, 3, 0.4)), 14);
  }
  /* the formula strip: line 1 (Lean), then line 3 (the aphorism) */
  const p1 = at(S, 1, 0.6) * (1 - Q(S, 2, 'both along Z', 0.5));
  if (p1 > 0.003) {
    panel(390, 676, 1140, 150, a * p1, C.lean, 'BELL STATE · 贝尔态');
    txt('|Φ⁺⟩ = (|00⟩ + |11⟩)/√2     ρ² = ρ  ·  rank ρ = 1', 420, 742, { size: 30, fam: F.math, w: 700, c: C.white, a: a * p1 * Q(S, 1, 'is pure', 0.5) });
    txt('Tr_Bob ρ = ½ I', 1500, 742, { size: 30, fam: F.math, w: 700, align: 'right', c: C.now, a: a * p1 * Q(S, 1, 'one half', 0.5) });
    A04.leanRef(420, 800, A04.GID.marg, a * p1 * Q(S, 1, 'Lean checks', 0.5), 17);
  }
  const p3 = at(S, 3, 0.6);
  if (p3 > 0.003) {
    A04.tag(500, 720, 'ANALOGY · 比方 · a handshake', 'argued', a * p3);
    txt('the parts point nowhere · the whole is pure', 960, 790, { size: 38, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * at(S, 3, 0.6, 0.3), ab: 1.5 });
    /* the handshake: two hands meeting on the thread, nothing in either */
    const hk = Q(S, 3, 'in neither hand', 0.6);
    ring(960, y, 26, C.argued, a * hk, 2.5);
    txt('in neither hand', 960, y + 58, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: a * hk });
  }
};

/* ======================= a04_bell · Bell at 45° ======================= */
SCENES.a04_bell = S => {
  const u = S.u, fo = A04.out(S);
  A04.railIn(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [4, 'Lean checks', 'lean'], [5, null, 'lean'], [5, 'The arc beats', 'argued']]);
  /* the ZX dial */
  const cx = 500, cy = 430, R = 200, a = clamp(u / 0.5) * fo;
  const dial = a * (1 - 0.6 * at(S, 3, 0.6, 0.6));
  ring(cx, cy, R, C.cyan, dial * 0.4, 1.5);
  line(cx - R - 20, cy, cx + R + 20, cy, C.dim, dial * 0.4, 1);
  line(cx, cy - R - 20, cx, cy + R + 20, C.dim, dial * 0.4, 1);
  txt('Z', cx, cy - R - 30, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: dial });
  txt('X', cx + R + 40, cy + 9, { size: 26, fam: F.math, w: 700, align: 'center', c: C.dim, a: dial });
  const qa = at(S, 1, 0.6), qb = Q(S, 1, 'Bob turns', 0.9);
  ['A₀', 'A₁'].forEach((l, i) => {
    const [x, y] = A04.dir(cx, cy, R, [0, 90][i]);
    arrow(cx, cy, x, y, C.cyan, dial * qa, 3.5);
    const [lx, ly] = A04.dir(cx, cy, R + 34, [0, 90][i] + 8);
    txt(l, lx, ly + 8, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: dial * qa });
  });
  const turn = 45 * ease(qb);
  ['B₀', 'B₁'].forEach((l, i) => {
    const d = [0, -90][i] + turn;
    const [x, y] = A04.dir(cx, cy, R * 0.86, d);
    A04.dashArrow(cx, cy, x, y, C.white, dial * qa, 3);
    const [lx, ly] = A04.dir(cx, cy, R * 0.86 + 34, d + (i ? -6 : 6));
    txt(l, lx, ly + 8, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: dial * qa });
  });
  if (qb > 0.5) txt('45°', cx + 52, cy - 120, { size: 24, fam: F.mono, w: 700, c: C.now, a: dial * clamp((qb - 0.5) * 2) });
  if (qb > 0) A04.arc(cx, cy, 90, -Math.PI / 2, -Math.PI / 2 + turn * A04.DEG, C.now, dial * qb, 2.5);
  /* the score sheet */
  const px = 880, pw = 900, pa = at(S, 2, 0.6, -0.2) * fo;
  panel(px, 200, pw, 620, pa, C.cyan, 'CHSH · 四个关联');
  const rows = [['A₀B₀', 'cos 45°'], ['A₀B₁', 'cos 45°'], ['A₁B₀', 'cos 45°'], ['A₁B₁', 'cos 135°']];
  const L2 = lineAt(S, 2);
  A04.PAIRS.forEach((p, k) => {
    const ra = pa * clamp((u - L2.s - 0.4 - k * 0.9) / 0.4);
    const y = 268 + k * 52, now = k === 3 ? at(S, 3, 0.4) : 0;
    txt(`${p.g > 0 ? '+' : '−'}  ${rows[k][0]}`, px + 40, y, { size: 28, fam: F.math, w: 700, c: C.white, a: ra });
    txt(rows[k][1], px + 260, y, { size: 28, fam: F.math, w: 700, c: C.dim, a: ra });
    txt(A04.f3(p.c), px + 520, y, { size: 28, fam: F.mono, w: 700, c: p.c < 0 ? C.mag : C.cyan, a: ra });
    if (k === 3) txt('−(−0.707) = +0.707', px + 640, y, { size: 20, fam: F.mono, w: 700, c: C.now, a: ra * now });
  });
  const sa = pa * Q(S, 3, 'two root two', 0.5);
  line(px + 40, 470, px + pw - 40, 470, C.dim, sa, 1.5);
  txt('S = 3 × 0.707 + 0.707 = 2√2 ≈ 2.828', px + 40, 520, { size: 34, fam: F.math, w: 700, c: C.white, a: sa, ab: 1.5 });
  A04.tag(px + pw - 150, 452, 'COMPUTED', 'computed', sa * (1 - at(S, 4, 0.4)), 14);
  /* the ruler: amber bar = this score; marks at 2 and 2√2 */
  const rx = px + 60, rw = 760, sc = rw / 3, ry = 650, ra = pa * at(S, 3, 0.6);
  line(rx, ry, rx + rw, ry, C.dim, ra, 2);
  [0, 1, 2, 3].forEach(t => { line(rx + t * sc, ry - 8, rx + t * sc, ry + 8, C.dim, ra, 1.5); txt(String(t), rx + t * sc, ry + 34, { size: 20, fam: F.mono, align: 'center', c: C.dim, a: ra }); });
  const bar = ease(Q(S, 3, 'two root two', 1.0));
  fillBox(rx, ry - 26, sc * A04.S_Q * bar, 16, C.now, ra * 0.85);
  const c2 = Q(S, 4, 'scores at most two', 0.5), ct = Q(S, 5, 'no state beats', 0.5);
  line(rx + 2 * sc, ry - 56, rx + 2 * sc, ry + 12, C.white, ra * c2, 3);
  txt('every script ≤ 2', rx + 2 * sc - 12, ry - 64, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.white, a: ra * c2 });
  line(rx + A04.S_Q * sc, ry - 56, rx + A04.S_Q * sc, ry + 12, C.mag, ra * ct, 3);
  txt('≤ 2√2', rx + A04.S_Q * sc + 10, ry - 64, { size: 20, fam: F.mono, w: 700, c: C.mag, a: ra * ct });
  A04.leanRef(px + 40, 740, A04.GID.cls, pa * Q(S, 4, 'Lean checks', 0.5), 16);
  A04.leanRef(px + 40, 790, A04.GID.tsi, pa * ct, 16);
  /* the toy line against the cosine arc (line 5) */
  const ga = a * at(S, 3, 0.6, 0.6);
  if (ga > 0.003) {
    const gx = 170, gy = 560, gw = 640, gh = 230, X = t => gx + gw * t / Math.PI, Y = v => gy + gh / 2 - (gh / 2) * v;
    panel(gx - 30, gy - 50, gw + 60, gh + 90, ga, C.argued, 'TOY LOCAL MODEL · 玩具局域模型 · 示意');
    line(gx, Y(0), gx + gw, Y(0), C.dim, ga * 0.6, 1);
    curve(i => [X(i * Math.PI), Y(1 - 2 * i)], 2, C.dim, ga, 2.5);
    curve(i => [X(i * Math.PI), Y(Math.cos(i * Math.PI))], 80, C.cyan, ga, 3.5);
    line(X(Math.PI / 4), Y(0.5), X(Math.PI / 4), Y(Math.SQRT1_2), C.mag, ga, 4);
    txt('45°', X(Math.PI / 4) + 10, Y(0.15), { size: 18, fam: F.mono, w: 700, c: C.mag, a: ga });
    txt('toy line at 45°: 0.5 · four terms → exactly 2', gx, gy + gh + 30, { size: 18, fam: F.mono, w: 700, c: C.white, a: ga });
    txt('cos θ', X(0.25) + 30, Y(0.95), { size: 20, fam: F.math, w: 700, c: C.cyan, a: ga });
    txt('toy line 1 − 2θ/π', X(2.0), Y(-0.15), { size: 18, fam: F.mono, w: 700, c: C.dim, a: ga });
  }
};

/* ======================= a04_clone · hide, don't copy ======================= */
SCENES.a04_clone = S => {
  const u = S.u, fo = A04.out(S);
  A04.railIn(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed']]);
  const swap = at(S, 3, 0.7, -0.2);
  /* part A: the angle picture and the overlap arithmetic */
  const aA = clamp(u / 0.5) * (1 - swap) * fo;
  if (aA > 0.003) {
    const pc = aA * (1 - Q(S, 0, 'rigid turn', 0.6));
    A04.tag(190, 230, 'ANALOGY · 比方 · a photocopier', 'argued', pc);
    if (pc > 0.003) {
      /* page → copier → two pages: what a quantum machine cannot do */
      const page = (x, y, k) => { box(x, y, 70, 92, C.argued, pc * k, 1.5, 'rgba(20,8,40,0.6)'); for (let i = 0; i < 4; i++) line(x + 12, y + 22 + i * 16, x + 58, y + 22 + i * 16, C.argued, pc * k * 0.6, 1.5); };
      page(1000, 380, 1);
      arrow(1090, 426, 1170, 426, C.argued, pc, 2.5);
      box(1180, 370, 180, 112, C.argued, pc, 2, 'rgba(20,8,40,0.6)');
      txt('COPY', 1270, 438, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.argued, a: pc });
      const cp = Q(S, 0, 'back them up', 0.6);
      arrow(1370, 426, 1450, 426, C.argued, pc * cp, 2.5);
      page(1470, 360, cp); page(1560, 400, cp);
      txt('ψ', 1035, 520, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: pc });
      txt('ψ ⊗ ψ ?', 1555, 540, { size: 30, fam: F.math, w: 700, align: 'center', c: C.mag, a: pc * cp });
    }
    const cx = 500, cy = 640, R = 330, k1 = clamp(u / 0.8), k2 = Q(S, 1, 'the copies', 0.6);
    A04.arc(cx, cy, R, -Math.PI, 0, C.dim, aA * 0.4, 1.2);
    line(cx - R, cy, cx + R, cy, C.dim, aA * 0.4, 1);
    const P = d => [cx + R * Math.cos((90 + d) * A04.DEG), cy - R * Math.sin((90 + d) * A04.DEG)];
    const half1 = A04.TH1 / 2, half2 = A04.TH2 / 2;
    const [p1x, p1y] = P(half1), [q1x, q1y] = P(-half1);
    arrow(cx, cy, p1x, p1y, C.cyan, aA * k1, 3.5); arrow(cx, cy, q1x, q1y, C.cyan, aA * k1, 3.5);
    txt('ψ', p1x - 30, p1y - 10, { size: 30, fam: F.math, w: 700, c: C.cyan, a: aA * k1 });
    txt('φ', q1x + 12, q1y - 10, { size: 30, fam: F.math, w: 700, c: C.cyan, a: aA * k1 });
    A04.arc(cx, cy, 110, -Math.PI / 2 - half1 * A04.DEG, -Math.PI / 2 + half1 * A04.DEG, C.cyan, aA * k1, 2.5);
    txt(`${A04.TH1.toFixed(2)}°`, cx, cy - 128, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: aA * k1 });
    const [p2x, p2y] = P(half2), [q2x, q2y] = P(-half2);
    A04.dashArrow(cx, cy, p2x, p2y, C.mag, aA * k2, 3); A04.dashArrow(cx, cy, q2x, q2y, C.mag, aA * k2, 3);
    A04.arc(cx, cy, 200, -Math.PI / 2 - half2 * A04.DEG, -Math.PI / 2 + half2 * A04.DEG, C.mag, aA * k2, 2.5);
    txt(`copies would need ${A04.TH2.toFixed(2)}°`, cx, cy + 48, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: aA * k2 });
    /* the panel */
    const px = 960, pa = aA * Q(S, 0, 'rigid turn', 0.6);
    panel(px, 220, 800, 560, pa, C.cyan, 'OVERLAPS · 内积');
    txt('rigid turn U keeps every overlap', px + 36, 290, { size: 24, fam: F.mono, w: 700, c: C.dim, a: pa });
    txt(`⟨φ⊗b, ψ⊗b⟩ = z · 1 = ${A04.Z.toFixed(1)}`, px + 36, 360, { size: 32, fam: F.math, w: 700, c: C.cyan, a: pa * Q(S, 1, 'Overlap point six', 0.5) });
    txt(`⟨φ⊗φ, ψ⊗ψ⟩ = z² = ${A04.Z2.toFixed(2)}`, px + 36, 420, { size: 32, fam: F.math, w: 700, c: C.mag, a: pa * k2 });
    const k3 = at(S, 2, 0.6);
    txt('z = z²  ⇒  z = 0  or  z = 1', px + 36, 510, { size: 36, fam: F.math, w: 700, c: C.white, a: pa * k3, ab: 1.5 });
    /* z against z²: they meet only at 0 and 1 */
    const gx = px + 570, gy = 500, gs = 190, gk = pa * k3;
    if (gk > 0.003) {
      box(gx, gy - gs, gs, gs, C.dim, gk * 0.5, 1);
      line(gx, gy, gx + gs, gy - gs, C.cyan, gk, 2.5);
      curve(i => [gx + gs * i, gy - gs * i * i], 40, C.mag, gk, 2.5);
      dot(gx, gy, 6, 'g', gk); dot(gx + gs, gy - gs, 6, 'g', gk);
      txt('z', gx + gs - 60, gy - gs + 70, { size: 18, fam: F.math, w: 700, c: C.cyan, a: gk });
      txt('z²', gx + gs - 30, gy - 40, { size: 18, fam: F.math, w: 700, c: C.mag, a: gk });
    }
    txt('one machine, two states: identical or ⊥', px + 36, 580, { size: 30, fam: F.disp, w: 700, c: C.white, a: pa * Q(S, 2, 'one machine copies', 0.5) });
    A04.leanRef(px + 36, 640, A04.GID.clone, pa * Q(S, 2, 'Lean checks', 0.5), 16, 640);
    txt('what cannot be copied must be hidden', px + 36, 730, { size: 28, fam: F.disp, w: 700, c: C.white, a: pa * Q(S, 2, 'are identical or perpendicular', 0.6, 0.5) });
  }
  /* part B: four perpendicular planes in eight dimensions */
  const aB = swap * fo;
  if (aB > 0.003) {
    const rooms = [['C', '000', '111'], ['X₁C', '100', '011'], ['X₂C', '010', '101'], ['X₃C', '001', '110']];
    const flip = Q(S, 4, 'A bit flip', 0.8), ask = Q(S, 4, 'We ask which plane', 0.5), back = Q(S, 4, 'move it back', 0.8);
    const where = back > 0 ? 1 - ease(back) : ease(flip);           // 0 = code plane, 1 = X₂C
    const bw = 360, gap = 40, x0 = 960 - (4 * bw + 3 * gap) / 2, y0 = 260, bh = 300;
    rooms.forEach(([n, p, q], k) => {
      const x = x0 + k * (bw + gap), lit = k === 0 ? 1 - where : k === 2 ? where : 0;
      box(x, y0, bw, bh, lit > 0.5 ? C.now : C.cyan, aB * (0.45 + 0.55 * lit), 1.6 + lit, 'rgba(4,10,24,0.6)');
      /* the plane, drawn as a parallelogram */
      ctx.save(); ctx.globalAlpha = aB * 0.5; ctx.fillStyle = rgba(C.cyan, 0.12); ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(x + 60, y0 + 210); ctx.lineTo(x + 140, y0 + 110); ctx.lineTo(x + 310, y0 + 110); ctx.lineTo(x + 230, y0 + 210); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
      txt(n, x + 20, y0 + 50, { size: 30, fam: F.math, w: 700, c: C.white, a: aB });
      txt(`span{|${p}⟩, |${q}⟩}`, x + 20, y0 + 270, { size: 22, fam: F.math, w: 700, c: C.dim, a: aB });
      if (lit > 0.02) dot(x + 185, y0 + 160, 11, 'g', aB * lit);
    });
    txt('3 qubits · 8 dimensions = 4 perpendicular planes × 2', 960, 620, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a: aB * at(S, 3, 0.6, 1.0) });
    if (flip > 0 && back < 1) {
      const fx0 = x0 + 185, fx1 = x0 + 2 * (bw + gap) + 185;
      A04.thread(fx0, y0 - 10, fx1, y0 - 10, -60, C.mag, aB * flip * (1 - back), 2.5);
      txt('bit flip X₂', (fx0 + fx1) / 2, y0 - 50, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: aB * flip * (1 - back) });
    }
    txt('ask: which plane?  →  X₂C', 960, 690, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a: aB * ask * (1 - back) });
    txt('never: what is inside', 960, 738, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.dim, a: aB * ask });
    txt('carry it back with X₂', 960, 690, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.now, a: aB * back });
  }
};

/* ======================= a04_grover · two mirrors ======================= */
SCENES.a04_grover = S => {
  const u = S.u, fo = A04.out(S), a = clamp(u / 0.5) * fo;
  A04.railIn(S);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean']]);
  /* four boxes, amplitudes as bars */
  const m1 = Q(S, 1, 'Mirror one', 0.7), m2 = Q(S, 1, 'Mirror two', 0.9), done = Q(S, 2, 'becomes one', 0.9);
  const step2 = done;
  /* the labels show the exact amplitudes of the stage a bar is moving to */
  const stage = done > 0.5 ? A04.G2 : m1 > 0.5 ? A04.G1 : A04.G0;
  const amp = A04.G0.map((v, i) => {
    const v1 = lerp(v, A04.G1[i], ease(m1));
    return lerp(v1, A04.G2[i], ease(step2));
  });
  const bx = 190, by = 530, bw = 120, gap = 40, sc = 200;
  A04.tag(190, 230, 'ANALOGY · 比方 · a prize in a box', 'argued', a * (1 - at(S, 1, 0.5)));
  for (let i = 0; i < 4; i++) {
    const x = bx + i * (bw + gap), v = amp[i], h = v * sc;
    box(x, 300, bw, 440, i === 0 ? C.white : C.cyan, a * (i === 0 ? 0.7 : 0.35), 1.2);
    fillBox(x + 20, h >= 0 ? by - h : by, bw - 40, Math.abs(h), C.now, a * 0.8);
    txt(A04.fx(stage[i], 2), x + bw / 2, 290 - 12, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a });
    txt(i === 0 ? 'prize' : 'empty', x + bw / 2, 774, { size: 20, fam: F.mono, w: 700, align: 'center', c: i === 0 ? C.white : C.dim, a });
  }
  line(bx - 10, by, bx + 4 * bw + 3 * gap + 10, by, C.dim, a, 1.5);
  const mean = amp.reduce((s, v) => s + v, 0) / 4, ma = a * m2 * (1 - done);
  dashed(bx - 10, by - mean * sc, bx + 4 * bw + 3 * gap + 10, by - mean * sc, C.mag, ma, 2);
  txt('average', bx + 4 * bw + 3 * gap + 16, by - mean * sc + 6, { size: 18, fam: F.mono, w: 700, c: C.mag, a: ma });
  /* the invariant plane: failure line B horizontal, prize W vertical */
  const cx = 1060, cy = 640, R = 370, pa = a * at(S, 0, 0.6, 1.2);
  line(cx, cy, cx + R + 40, cy, C.dim, pa, 2);
  line(cx, cy, cx, cy - R - 40, C.dim, pa, 2);
  txt('failure B', cx + R + 40, cy + 34, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: pa });
  txt('prize W', cx + 14, cy - R - 20, { size: 20, fam: F.mono, w: 700, c: C.white, a: pa });
  A04.arc(cx, cy, R, -Math.PI / 2 - 0.15, 0.6, C.dim, pa * 0.35, 1.2);
  /* the start arrow at 30°, the mirrors, the turn */
  const ang = 30 - 60 * ease(m1) + 120 * ease(step2);                        // 30 → −30 → 90
  const rad = ang * A04.DEG, ex = cx + R * Math.cos(rad), ey = cy - R * Math.sin(rad);
  const m1a = pa * Q(S, 1, 'Mirror one', 0.4) * (1 - done), m2a = pa * Q(S, 1, 'Mirror two', 0.4) * (1 - done);
  dashed(cx - 60, cy, cx + R + 40, cy, C.argued, m1a, 3);
  const sx = Math.cos(30 * A04.DEG), sy = Math.sin(30 * A04.DEG);
  dashed(cx - 40 * sx, cy + 40 * sy, cx + (R + 40) * sx, cy - (R + 40) * sy, C.argued, m2a, 3);
  if (m1a > 0) txt('mirror 1', cx + R - 60, cy - 14, { size: 18, fam: F.mono, w: 700, c: C.argued, a: m1a });
  if (m2a > 0) txt('mirror 2', cx + (R + 20) * sx - 40, cy - (R + 20) * sy - 14, { size: 18, fam: F.mono, w: 700, c: C.argued, a: m2a });
  const sa = pa * at(S, 0, 0.5, 2.2);
  if (ang < 60) A04.arc(cx, cy, 130, 0, -rad, C.now, sa * (1 - done), 2);
  txt('30°', cx + 150, cy - 30, { size: 22, fam: F.mono, w: 700, c: C.now, a: sa * (1 - m1) });
  arrow(cx, cy, ex, ey, C.now, pa, 4);
  dot(ex, ey, 9, 'g', pa);
  txt('one step: 30° → 90°', cx + 140, cy - R + 70, { size: 26, fam: F.disp, w: 700, c: C.now, a: pa * done });
  /* the Lean rotation formula */
  const la = a * at(S, 3, 0.6);
  if (la > 0.003) {
    panel(920, 712, 860, 120, la, C.lean, 'n STEPS · n 步');
    txt('prize part = sin((2n + 1)θ),  sin θ = ½ → θ = 30°', 946, 768, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    A04.leanRef(946, 812, A04.GID.grov, la * Q(S, 3, 'Lean checks', 0.5), 15);
  }
};

/* ======================= a04_block · one polynomial ======================= */
SCENES.a04_block = S => {
  const u = S.u, fo = A04.out(S), a = clamp(u / 0.5) * fo;
  A04.railIn(S);
  badgeQ(S, [[0, null, 'computed'], [2, 'power-sum rule', 'lean'], [3, null, 'lean'], [3, 'Search and simulation', 'argued']]);
  /* the dial: hand at m·θ, its shadow on the horizontal axis reads cos mθ */
  const cx = 460, cy = 470, R = 230;
  const L1 = lineAt(S, 1);
  /* reading k is shown from the moment it is spoken; the hand turns one more θ for each new reading */
  const TK = [phraseAt(S, 1, 'reads one'), phraseAt(S, 1, 'point six'), phraseAt(S, 1, 'minus point two eight'), phraseAt(S, 1, 'minus point nine three six')];
  const m = Math.max(0, TK.filter(t => u >= t).length - 1);
  const mf = TK.slice(1).reduce((s, t) => s + ease(clamp((u - t) / 0.6)), 0);
  const rad = mf * A04.BTH * A04.DEG;
  ring(cx, cy, R, C.cyan, a * 0.45, 1.5);
  line(cx - R - 20, cy, cx + R + 20, cy, C.dim, a * 0.5, 1);
  line(cx, cy - R - 20, cx, cy + R + 20, C.dim, a * 0.3, 1);
  const hx = cx + R * Math.cos(rad), hy = cy - R * Math.sin(rad);
  A04.arc(cx, cy, 70, 0, -A04.BTH * A04.DEG, C.argued, a, 3);
  txt('θ', cx + 84, cy - 30, { size: 24, fam: F.math, w: 700, c: C.argued, a });
  arrow(cx, cy, hx, hy, C.now, a, 3.5);
  dashed(hx, hy, hx, cy, C.dim, a * 0.7, 1.5);
  dot(hx, cy, 10, 'g', a);
  txt('x = cos θ', cx - R, cy + R + 50, { size: 26, fam: F.math, w: 700, c: C.cyan, a: a * at(S, 0, 0.6) });
  txt(`m = ${m}   ·   corner = ${A04.fs(A04.CH[m])}`, cx - R, cy + R + 92, { size: 24, fam: F.mono, w: 700, c: C.now, a: a * clamp((u - L1.s) / 0.5) });
  A04.tag(cx - R, 205, 'ANALOGY · 比方 · a dial and its shadow', 'argued', a);
  /* the block and the readings */
  const px = 900, pa = a * at(S, 0, 0.6, 0.8);
  panel(px, 200, 880, 620, pa, C.cyan, 'TURN THE BLOCK · 转动的块');
  txt('W(x) = [ x   i√(1−x²) ; i√(1−x²)   x ]', px + 36, 270, { size: 28, fam: F.math, w: 700, c: C.white, a: pa });
  txt('corner of W(x)ᵐ = Tₘ(x) = cos mθ', px + 36, 322, { size: 28, fam: F.math, w: 700, c: C.cyan, a: pa * at(S, 1, 0.6) });
  for (let k = 0; k < 4; k++) {
    const ka = pa * clamp((u - TK[k]) / 0.4);
    const x = px + 36 + k * 200;
    txt(`T${'₀₁₂₃'[k]}`, x, 392, { size: 24, fam: F.math, w: 700, c: C.dim, a: ka });
    txt(A04.fs(A04.CH[k]), x, 436, { size: 34, fam: F.mono, w: 700, c: k === m ? C.now : C.white, a: ka });
  }
  const r3 = pa * at(S, 2, 0.6);
  txt('Tₘ₊₂ = 2x · Tₘ₊₁ − Tₘ', px + 36, 494, { size: 30, fam: F.math, w: 700, c: C.white, a: r3, ab: 1.2 });
  txt('2 × 0.6 × (−0.28) − 0.6 = −0.936', px + 470, 494, { size: 20, fam: F.mono, w: 700, c: C.dim, a: r3 });
  /* the hand step between the Chebyshev rule and the Lean power-sum rule */
  const hs = pa * Q(S, 2, 'power-sum rule', 0.5);
  txt('a = e^(iθ), b = e^(−iθ):  a + b = 2x,  aᵐ + bᵐ = 2Tₘ', px + 36, 546, { size: 20, fam: F.math, w: 700, c: C.white, a: hs });
  A04.tag(px + 680, 548, 'HAND STEP · 手算', 'computed', hs, 14);
  txt('ab = 1  ⇒  aᵐ⁺² + bᵐ⁺² = (a + b)(aᵐ⁺¹ + bᵐ⁺¹) − (aᵐ + bᵐ)', px + 36, 596, { size: 21, fam: F.math, w: 700, c: C.lean, a: hs });
  A04.leanRef(px + 36, 636, A04.GID.cheb, hs, 15);
  /* phase synthesis (Lean, existence only) and the unification of algorithms (literature) */
  const q4 = pa * at(S, 3, 0.6);
  if (q4 > 0.003) {
    line(px + 24, 666, px + 856, 666, C.dim, q4 * 0.6, 1);
    const ql = Q(S, 3, 'Lean checks the right polynomials', 0.5);
    txt('right degree, parity, PP# + (1−x²)QQ# = 1  ⇒  ∃ φ₀, Φ (|Φ| = k)', px + 36, 704, { size: 18, fam: F.math, w: 700, c: C.lean, a: q4 * ql });
    A04.leanRef(px + 36, 742, A04.GID.phase, q4 * ql, 15);
    txt('exists · no recipe · not unique', px + 640, 742, { size: 12, fam: F.mono, w: 700, c: C.dim, a: q4 * ql });
    const qa = Q(S, 3, 'Search and simulation', 0.5);
    box(px + 24, 762, 832, 46, C.argued, q4 * qa, 1.4, 'rgba(20,8,40,0.6)');
    txt('search · simulation as one recipe (QSVT) — literature result, not formalized', px + 40, 792, { size: 16, fam: F.mono, w: 700, c: C.argued, a: q4 * qa });
  }
};

/* ======================= a04_next · woven ======================= */
SCENES.a04_next = S => {
  const u = S.u, a = clamp(u / 0.5) * clamp((S.d - S.u) / 0.6);
  A04.railIn(S);
  badgeQ(S, [[0, null, 'argued']]);
  /* a woven net of small spheres */
  const pts = [];
  for (let i = 0; i < 7; i++) pts.push([360 + i * 200, 330 + 70 * Math.sin(i * 1.3 + 0.4)]);
  const k0 = at(S, 0, 1.6);
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    if (j - i > 2) continue;
    const ka = a * clamp(k0 * 3 - (i + j) * 0.15);
    A04.thread(pts[i][0], pts[i][1], pts[j][0], pts[j][1], (j - i) * 40 * (i % 2 ? 1 : -1), C.mag, ka * (j - i === 1 ? 0.8 : 0.45), j - i === 1 ? 2.5 : 1.5);
  }
  pts.forEach(([x, y]) => { A04.ball(x, y, 46, a * 0.9); dot(x, y, 6, 'g', a); });
  A04.tag(300, 205, 'INTERPRETATION · 诠释', 'argued', a * at(S, 0, 0.6));
  txt('the whole is not stored in the parts — it is woven between them', 960, 500, { size: 34, fam: F.disp, w: 700, align: 'center', c: C.white, a: a * Q(S, 0, 'The whole is not stored', 0.6), ab: 1.2 });
  /* one shared clock, one fixed space: the rail under the net */
  const k1 = a * at(S, 1, 0.6) * (1 - 0.6 * at(S, 2, 0.6));
  line(300, 600, 1620, 600, C.dim, k1, 2);
  for (let i = 0; i < pts.length; i++) {
    dashed(pts[i][0], pts[i][1] + 50, pts[i][0], 600, C.dim, k1 * 0.6, 1.2);
    const tick = (u * 1.6) % 1;
    ring(pts[i][0], 600, 6 + 10 * tick, C.dim, k1 * (1 - tick), 1.5);
  }
  txt('t  ·  one shared clock, one fixed space', 1620, 636, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: k1 });
  SPINE.ask(S, 2, 'If spheres can be woven together, can space and time be woven too?', '球能彼此编织，时间与空间也能吗？');
};

/* ---- a05 · The spacetime sphere · 显影·时空之球 ---- */
/* Act a05 of the long film No Third Point · 第五部《显影·时空之球》 (book quantum-geometry, chapters 17–20).
   Scenes for theme/film/engine.js. Everything this act defines lives in the one namespace A05.

     a05_title  turn vs push: the event (t, x) = (5, 3) on the circle t² + x² = 34 and on the hyperbola t² − x² = 16
     a05_cone   a form that vanishes on light is S(1,0)·(t² − |w|²) ..... MinkowskiNullConeRigidity.eq_smul_minkowski_of_null
     a05_boost  η = ln 2: cosh 5/4, sinh 3/4, β = 3/5; (5/4)² − (3/4)² = 1 ..... BogoliubovNormConservation
                two pushes: η = ln 4, cosh 17/8, sinh 15/8, β = 15/17 (computed)
     a05_loop   one square, edges (1, 1, 1, i), gauge g = (1, i, −1, −i) → (i, i, i, −1), loop product i
                ..... AnchoredPhaseClassification.anchored_phase_classification; force as curvature is argued
     a05_waist  bridge graph (a, b, c, d) = (2, 3, 2, 3): cuts ad = 6, bc = 6, 3ac = 12 (through leg a, the bridges, leg c)
                ..... QuantumMaxFlowBound.QMaxFlow_le_QMinCut, QuantumMaxFlowMinCut.result; RT is literature
     a05_depth  N = 11, κ = 2, S = {4, 8}: 12 gates in 4 layers ..... OpenIntegrableCircuitMinDepth.result;
                complexity = volume is open
     a05_ask    the next question.

   FILM.init re-derives every number on screen by a second route and stops the render on any disagreement. */
const A05 = (() => {
  const LEAN = {
    cone: 'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
    norm: 'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
    loop: 'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
    cutLe: 'D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut',
    cutEq: 'D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowMinCut.result',
    depth: 'D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result'
  };

  /* ---- exact rationals [p, q] ---- */
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const R = (p, q = 1) => { const g = gcd(p, q) * (q < 0 ? -1 : 1); return [p / g, q / g]; };
  const add = (x, y) => R(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
  const sub = (x, y) => R(x[0] * y[1] - y[0] * x[1], x[1] * y[1]);
  const mul = (x, y) => R(x[0] * y[0], x[1] * y[1]);
  const div = (x, y) => R(x[0] * y[1], x[1] * y[0]);
  const eq = (x, y) => x[0] === y[0] && x[1] === y[1];
  const fs = x => (x[1] === 1 ? String(x[0]) : `${x[0]}/${x[1]}`);
  /* boost by rapidity ln k: e^η = k, cosh = (k + 1/k)/2, sinh = (k − 1/k)/2 */
  const boost = k => { const e = R(k), ie = R(1, k); return { ch: div(add(e, ie), R(2)), sh: div(sub(e, ie), R(2)) }; };
  const B2 = boost(2), B4 = boost(4);
  const beta2 = div(B2.sh, B2.ch), beta4 = div(B4.sh, B4.ch);
  const unit2 = sub(mul(B2.ch, B2.ch), mul(B2.sh, B2.sh));

  /* ---- the square: vertices 0..3, edges e_i : i → i+1 (mod 4), phases as multiples of 90° ---- */
  const U0 = [0, 0, 0, 1];          // 1, 1, 1, i
  const G = [0, 1, 2, 3];           // g = 1, i, −1, −i  (anchor 0 fixed)
  const gauged = k => U0.map((u, i) => u + G[(i + 1) % 4] * k - G[i] * k);
  const quarter = n => ['1', 'i', '−1', '−i'][((Math.round(n) % 4) + 4) % 4];
  /* complex integers for the independent check */
  const cpow = n => [[1, 0], [0, 1], [-1, 0], [0, -1]][((n % 4) + 4) % 4];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cinv = a => [a[0], -a[1]];

  /* ---- the bridge graph ---- */
  const BG = { a: 2, b: 3, c: 2, d: 3 };
  const cuts = { exits: BG.a * BG.d, entrances: BG.b * BG.c, bridges: 3 * BG.a * BG.c };
  const minCut = Math.min(cuts.exits, cuts.entrances, cuts.bridges);
  const cone = (x, y) => x > 0 && x <= y && x * x + y * y <= 3 * x * y;

  /* ---- the open-boundary circuit: N = 11, S = {4, 8} ---- */
  const N = 11, KAP = 2, SS = [4, 8];
  const gateSites = k => (k === 0 ? [1] : k === N ? [N] : [k, k + 1]);
  const gateName = k => (k === 0 ? 'K1' : k === N ? 'KN' : 'U' + k);
  const order = (n, S) => { const out = []; for (let k = n; k >= 0; k--) if (!S.includes(k)) out.push(k); for (let k = 0; k <= n; k++) if (S.includes(k)) out.push(k); return out; };
  const LIST = order(N, SS);
  const LAYERS = [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 3, 3];
  /* the least layer count of one configuration: along the path 0..n, an edge k → k+1 rises when k+1 ∈ S, else falls;
     the layers are a longest run of falls, plus one */
  const depthOf = (n, S) => { let best = 1, run = 1; for (let k = 0; k < n; k++) { if (S.includes(k + 1)) run = 1; else { run++; best = Math.max(best, run); } } return best; };
  const subsets = (n, k, from = 1) => (k === 0 ? [[]] : from > n ? [] : [...subsets(n, k - 1, from + 1).map(s => [from, ...s]), ...subsets(n, k, from + 1)]);
  const minDepthBrute = (n, k) => Math.min(...subsets(n, k).map(S => depthOf(n, S)));

  /* ---- drawing helpers ---- */
  /* spacetime diagram: t up, x right */
  const P = (o, t, x) => [o.cx + x * o.s, o.cy - t * o.s];
  function cone2(o, a, ext, extL = ext) {
    const [x0, y0] = P(o, 0, 0), [x1, y1] = P(o, ext, ext), [x2, y2] = P(o, extL, -extL);
    dashed(x0, y0, x1, y1, C.white, a * 0.75, 2); dashed(x0, y0, x2, y2, C.white, a * 0.75, 2);
  }
  function axes(o, a, tmax, xmax, xmin = xmax) {
    const [x0, y0] = P(o, 0, 0);
    line(x0 - xmin * o.s, y0, x0 + xmax * o.s, y0, C.dim, a * 0.6, 1.2);
    line(x0, y0, x0, y0 - tmax * o.s, C.dim, a * 0.6, 1.2);
    txt('t', x0 + 12, y0 - tmax * o.s + 14, { size: 26, fam: F.math, c: C.dim, a });
    txt('x', x0 + xmax * o.s - 6, y0 - 12, { size: 26, fam: F.math, c: C.dim, a });
  }
  function hyper(o, tau, xmax, col, a, lw = 3, xmin = xmax) {
    curve(p => { const x = -xmin + (xmax + xmin) * p; return P(o, Math.sqrt(tau * tau + x * x), x); }, 120, col, a, lw);
  }
  function circleArc(o, r, col, a, lw = 3) {
    curve(p => { const th = Math.PI * p; return P(o, r * Math.sin(th), r * Math.cos(th)); }, 120, col, a, lw);
  }
  function dial(x, y, r, ang, col, a, o = {}) {
    if (a <= 0.003) return;
    ring(x, y, r, col, a * 0.55, 1.5);
    const c = Math.cos(ang), s = Math.sin(ang);
    line(x, y, x + c * r * 0.86, y - s * r * 0.86, col, a, o.w || 3.5);
    dot(x + c * r * 0.86, y - s * r * 0.86, 5, o.pearl || 'c', a);
  }
  /* small violet "analogy" card: rows of [left, right] */
  function analogy(x, y, w, rows, a) {
    if (a <= 0.003) return;
    const h = 46 + rows.length * 38;
    panel(x, y, w, h, a, C.argued, 'ANALOGY · 比方');
    rows.forEach((r, i) => {
      txt(r[0], x + 20, y + 72 + i * 38, { size: 22, fam: F.disp, w: 600, c: C.white, a });
      txt('↔', x + w * 0.5, y + 72 + i * 38, { size: 22, fam: F.math, c: C.argued, a, align: 'center' });
      txt(r[1], x + w * 0.5 + 24, y + 72 + i * 38, { size: 22, fam: F.disp, w: 600, c: C.white, a });
    });
  }
  function greenTag(x, y, s, a, size = 20) {
    if (a <= 0.003) return;
    const head = 'LEAN ✓', wh = tw(head, size * 0.8, F.mono, 700, 1) + 16;
    fillBox(x, y - size, wh, size * 1.3, C.lean, a * 0.95);
    txt(head, x + 8, y - size * 0.12, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(s, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* fade a scene's content in after its start and out before its end */
  const life = (S, inn = 0.5, out = 0.45) => clamp(S.u / inn) * clamp((S.d - S.u) / out);

  return { LEAN, R, add, sub, mul, div, eq, fs, boost, B2, B4, beta2, beta4, unit2, U0, G, gauged, quarter, cpow, cmul, cinv,
    BG, cuts, minCut, cone, N, KAP, SS, gateSites, gateName, order, LIST, LAYERS, depthOf, minDepthBrute,
    P, cone2, axes, hyper, circleArc, dial, analogy, greenTag, life };
})();

FILM.init.push(() => {
  const err = m => window.FILM_ERRORS.push('a05: ' + m);
  /* the cited theorems are present and are theorems */
  Object.values(A05.LEAN).forEach(g => { const r = leanCite(g); if (!r || r.kind !== 'theorem') err('missing Lean citation ' + g); });
  /* rapidity ln 2 and ln 4, by floating point and by the velocity-addition rule */
  const close = (x, y) => Math.abs(x - y) < 1e-12;
  const v = q => q[0] / q[1];
  if (!close(v(A05.B2.ch), Math.cosh(Math.log(2))) || !close(v(A05.B2.sh), Math.sinh(Math.log(2)))) err('cosh/sinh ln 2');
  if (!close(v(A05.B4.ch), Math.cosh(Math.log(4))) || !close(v(A05.B4.sh), Math.sinh(Math.log(4)))) err('cosh/sinh ln 4');
  if (A05.fs(A05.B2.ch) !== '5/4' || A05.fs(A05.B2.sh) !== '3/4' || A05.fs(A05.beta2) !== '3/5') err('ln 2 values');
  if (A05.fs(A05.B4.ch) !== '17/8' || A05.fs(A05.B4.sh) !== '15/8' || A05.fs(A05.beta4) !== '15/17') err('ln 4 values');
  if (A05.fs(A05.unit2) !== '1') err('cosh² − sinh² at ln 2');
  const b = A05.beta2, comp = A05.div(A05.add(b, b), A05.add(A05.R(1), A05.mul(b, b)));
  if (!A05.eq(comp, A05.beta4)) err('velocity addition 3/5 ⊕ 3/5');
  if (A05.fs(A05.add(b, b)) !== '6/5') err('naive sum 6/5');
  /* the event (5, 3): circle 34, hyperbola 16, and the boost by ln 2 takes (4, 0) to (5, 3) */
  if (5 * 5 + 3 * 3 !== 34 || 5 * 5 - 3 * 3 !== 16 || !close(4 * Math.cosh(Math.log(2)), 5) || !close(4 * Math.sinh(Math.log(2)), 3)) err('event (5, 3)');
  /* the square: gauge with complex integers, loop product both times */
  const u0 = A05.U0.map(A05.cpow), g = A05.G.map(A05.cpow);
  const u1 = u0.map((u, i) => A05.cmul(A05.cmul(g[(i + 1) % 4], u), A05.cinv(g[i])));
  const want = [[0, 1], [0, 1], [0, 1], [-1, 0]];
  if (u1.some((z, i) => z[0] !== want[i][0] || z[1] !== want[i][1])) err('gauged edges');
  if (A05.gauged(1).map(A05.quarter).join(',') !== 'i,i,i,−1' || A05.U0.map(A05.quarter).join(',') !== '1,1,1,i') err('edge labels');
  const prod = us => us.reduce((p, z) => A05.cmul(p, z), [1, 0]);
  if (prod(u0).join() !== '0,1' || prod(u1).join() !== '0,1') err('loop product');
  if (g[0][0] !== 1 || g[0][1] !== 0) err('anchor not fixed');
  /* the bridge graph: cuts, cone conditions, min(ad, bc) */
  const { a, b: bb, c, d } = A05.BG;
  if (A05.cuts.exits !== 6 || A05.cuts.entrances !== 6 || A05.cuts.bridges !== 12 || A05.minCut !== 6) err('cuts');
  if (!A05.cone(a, bb) || !A05.cone(c, d) || Math.min(a * d, bb * c) !== 6) err('cone hypotheses');
  /* the circuit: list, layer schedule valid, least depth by brute force equals the formula */
  const names = A05.LIST.map(A05.gateName).join(' ');
  if (names !== 'KN U10 U9 U7 U6 U5 U3 U2 U1 K1 U4 U8') err('circuit list ' + names);
  const L = A05.LAYERS, Lst = A05.LIST;
  for (let i = 0; i < Lst.length; i++) for (let j = i + 1; j < Lst.length; j++) {
    const si = A05.gateSites(Lst[i]), sj = A05.gateSites(Lst[j]);
    if (si.some(x => sj.includes(x)) && !(L[i] < L[j])) err(`layers ${i} ${j}`);
  }
  if (Math.max(...L) + 1 !== 4 || Lst.length !== 12) err('12 gates in 4 layers');
  const f = (n, k) => Math.floor(n / (k + 1)) + 1;
  for (const [n, k] of [[11, 2], [8, 2], [11, 1], [9, 3]]) if (A05.minDepthBrute(n, k) !== f(n, k)) err(`minDepth ${n} ${k}`);
  if (A05.depthOf(11, A05.SS) !== 4 || f(11, 2) !== 4) err('depth of {4, 8}');
});

SCENES.a05_title = S => {
  SPINE.title(S, 5, '显影·时空之球', 'The spacetime sphere');
  SPINE.rail(S, 5, at(S, 0, 0.6));
  if (S.u >= lineAt(S, 0).s) badgeQ(S, [[0, 'So far', 'argued'], [1, null, 'computed']]);
  const a = at(S, 0, 0.8) * clamp((S.d - S.u) / 0.45);
  if (a <= 0.003) return;
  const o = { cx: 760, cy: 800, s: 62 };
  A05.axes(o, a, 9.6, 7.4);
  A05.cone2(o, a, 9.2);
  txt('light cone · t² − x² = 0', 205, 212, { size: 22, fam: F.mono, c: C.white, a: a * 0.85 });
  /* turn: the circle t² + x² = 34 (magenta); push: the hyperbola t² − x² = 16 (cyan) */
  const qt = Q(S, 1, 'Turn an event', 0.8), qp = Q(S, 1, 'Push it', 0.8);
  A05.circleArc(o, Math.sqrt(34), C.mag, a * qt * 0.9, 3);
  A05.hyper(o, 4, 7.2, C.cyan, a * qp, 3);
  const [ex, ey] = A05.P(o, 5, 3);
  dot(ex, ey, 11, 'g', a);
  fillBox(ex + 12, ey - 20, 222, 38, C.bg, a * 0.8);
  txt('(t, x) = (5, 3)', ex + 18, ey + 8, { size: 24, fam: F.mono, w: 700, c: C.now, a });
  /* the turned copy rides the circle across the cone; the pushed copy rides the hyperbola and stays inside */
  const r = Math.sqrt(34), ph0 = Math.atan2(3, 5);
  const ph = ph0 + 0.62 * ease(clamp((S.u - phraseAt(S, 1, 'Turn an event')) / 2.2));
  const [rx, ry] = A05.P(o, r * Math.cos(ph), r * Math.sin(ph));
  dot(rx, ry, 14, 'm', a * qt);
  const et = Math.log(2) + 0.6 * ease(clamp((S.u - phraseAt(S, 1, 'Push it')) / 2.4));
  const [bx, by] = A05.P(o, 4 * Math.cosh(et), 4 * Math.sinh(et));
  dot(bx, by, 14, 'c', a * qp);
  /* side panel */
  const pa = a * at(S, 1, 0.7);
  panel(1260, 300, 520, 300, pa, C.cyan, 'TWO WAYS TO MOVE · 两种移动');
  txt('turn', 1290, 380, { size: 30, fam: F.disp, w: 700, c: C.mag, a: pa * qt });
  txt('t² + x² = 34', 1440, 380, { size: 32, fam: F.math, w: 700, c: C.white, a: pa * qt });
  txt('crosses the cone', 1440, 418, { size: 20, fam: F.mono, c: C.mag, a: pa * qt });
  txt('push', 1290, 490, { size: 30, fam: F.disp, w: 700, c: C.cyan, a: pa * qp });
  txt('t² − x² = 16', 1440, 490, { size: 32, fam: F.math, w: 700, c: C.white, a: pa * qp });
  txt('never crosses it', 1440, 528, { size: 20, fam: F.mono, c: C.cyan, a: pa * qp });
};

SCENES.a05_cone = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'argued'], [1, 'Lean checks', 'lean']]);
  const a = A05.life(S);
  const o = { cx: 620, cy: 780, s: 64 };
  A05.axes(o, a, 9.2, 7.2);
  A05.cone2(o, a, 7.6);
  /* beads on the light cone: a push slides them along the cone, one branch stretched by e^η, the other squeezed */
  const eta = 0.42 * Math.sin(1.1 * Math.max(0, S.u - 0.6));
  for (let k = 1; k <= 6; k++) {
    const R1 = k * Math.exp(eta), R2 = k * Math.exp(-eta);
    if (R1 < 7.4) { const [x, y] = A05.P(o, R1, R1); dot(x, y, 8, 'w', a * 0.95); }
    if (R2 < 7.4) { const [x, y] = A05.P(o, R2, -R2); dot(x, y, 8, 'w', a * 0.95); }
  }
  A05.hyper(o, 4, 7.0, C.cyan, a * 0.8, 2.5);
  const [ex, ey] = A05.P(o, 4 * Math.cosh(Math.log(2) + eta), 4 * Math.sinh(Math.log(2) + eta));
  dot(ex, ey, 10, 'g', a);
  txt('a push slides the beads along the cone', 620, 245, { size: 22, fam: F.mono, c: C.white, a: a * 0.85, align: 'center' });
  /* the panel */
  const p0 = a * at(S, 0, 0.7);
  panel(1130, 250, 650, 520, p0, C.cyan, 'WHY TIME SUBTRACTS · 时间为何相减');
  txt('space', 1160, 335, { size: 26, fam: F.disp, w: 700, c: C.dim, a: p0 });
  txt('x² + y²', 1330, 335, { size: 34, fam: F.math, w: 700, c: C.white, a: p0 });
  txt('adds', 1560, 335, { size: 22, fam: F.mono, c: C.dim, a: p0 });
  txt('spacetime', 1160, 400, { size: 26, fam: F.disp, w: 700, c: C.cyan, a: p0 });
  txt('t² − x²', 1330, 400, { size: 34, fam: F.math, w: 700, c: C.white, a: p0 });
  txt('subtracts', 1560, 400, { size: 22, fam: F.mono, c: C.cyan, a: p0 });
  txt('light: x = ±t  ⇒  t² − x² = 0', 1160, 462, { size: 26, fam: F.math, w: 700, c: C.white, a: p0 * Q(S, 0, 'light must', 0.6) });
  const q = Q(S, 1, 'any quadratic rule', 0.7);
  line(1160, 500, 1750, 500, C.lean, a * q * 0.5, 1);
  txt('S(v) = 0 on every light ray', 1160, 552, { size: 28, fam: F.math, w: 700, c: C.white, a: a * q });
  txt('⇒  S = S(1, 0) · (t² − |w|²)', 1160, 604, { size: 32, fam: F.math, w: 700, c: C.lean, a: a * Q(S, 1, 'zero on every', 0.7) });
  txt('any dimension · the number S(1, 0) is not fixed by light', 1160, 646, { size: 16, fam: F.mono, c: C.dim, a: a * Q(S, 1, 'times one number', 0.7) });
  A05.greenTag(1160, 730, 'eq_smul_minkowski_of_null', a * Q(S, 1, 'Lean checks', 0.6), 20);
};

SCENES.a05_boost = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed']]);
  const a = A05.life(S);
  /* the unit hyperbola t² − x² = 1 with the points of rapidity ln 2 and ln 4 */
  const o = { cx: 300, cy: 790, s: 190 };
  A05.axes(o, a, 2.6, 2.35, 1.4);
  A05.cone2(o, a, 2.5, 1.45);
  A05.hyper(o, 1, 2.05, C.cyan, a, 3, 1.3);
  const pts = [[A05.B2, 'ln 2', 0], [A05.B4, 'ln 4', 2]];
  pts.forEach(([B, lab, k]) => {
    const t = B.ch[0] / B.ch[1], x = B.sh[0] / B.sh[1];
    const al = a * (k === 0 ? at(S, 0, 0.7) : Q(S, 2, 'Push twice', 0.7));
    if (al <= 0.003) return;
    const [x0, y0] = A05.P(o, 0, 0), [px, py] = A05.P(o, t, x);
    const cur = k === 0 ? (S.u < lineAt(S, 2).s) : true;
    line(x0, y0, px, py, cur ? C.now : C.dim, al, 2.5);
    const [fx, fy] = A05.P(o, t, 0);
    dashed(px, py, fx, fy, C.white, al * 0.5, 1.5);
    dot(px, py, 10, cur ? 'g' : 'w', al);
    txt(lab, k === 0 ? px - 16 : px + 18, k === 0 ? py - 14 : py + 8, { size: 24, fam: F.mono, w: 700, c: cur ? C.now : C.white, a: al, align: k === 0 ? 'right' : 'left' });
  });
  txt('t² − x² = 1', 90, 462, { size: 24, fam: F.math, w: 700, c: C.cyan, a: a * 0.9 });
  /* the arithmetic */
  const X = 990, p0 = a * at(S, 0, 0.6);
  panel(X - 30, 240, 820, 580, p0, C.cyan, 'RAPIDITY BY HAND · 手算快度');
  txt('η = ln 2,  so  exp η = 2', X, 320, { size: 30, fam: F.math, w: 700, c: C.white, a: p0 });
  txt(`cosh η = (2 + ½)/2 = ${A05.fs(A05.B2.ch)}`, X, 372, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 0, 'Cosh is', 0.6) });
  txt(`sinh η = (2 − ½)/2 = ${A05.fs(A05.B2.sh)}`, X, 420, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 0, 'sinh three', 0.6) });
  txt(`β = sinh/cosh = ${A05.fs(A05.beta2)}`, X, 468, { size: 30, fam: F.math, w: 700, c: C.now, a: a * Q(S, 0, 'the speed', 0.6) });
  const q1 = Q(S, 1, 'Twenty-five', 0.6), qL = Q(S, 1, 'Lean checks', 0.6);
  txt('25/16 − 9/16 = 1', X, 530, { size: 32, fam: F.math, w: 700, c: C.white, a: a * q1 });
  txt('|cosh r|² − |sinh r|² = 1   for every real r', X, 578, { size: 26, fam: F.math, w: 700, c: C.lean, a: a * qL });
  A05.greenTag(X, 622, 'bogoliubov_norm_conservation', a * qL, 18);
  const q2 = Q(S, 2, 'Push twice', 0.6);
  line(X, 650, X + 770, 650, C.cyan, a * q2 * 0.4, 1);
  txt(`ln 2 + ln 2 = ln 4:  cosh ${A05.fs(A05.B4.ch)}, sinh ${A05.fs(A05.B4.sh)}`, X, 696, { size: 26, fam: F.math, w: 700, c: C.white, a: a * q2 });
  txt(`β = ${A05.fs(A05.beta4)}`, X, 746, { size: 30, fam: F.math, w: 700, c: C.now, a: a * Q(S, 2, 'fifteen seventeenths', 0.6) });
  txt('≠ 3/5 + 3/5 = 6/5', X + 170, 746, { size: 30, fam: F.math, w: 700, c: C.mag, a: a * Q(S, 2, 'not six fifths', 0.6) });
  txt('speeds do not add · rapidities do', X, 796, { size: 24, fam: F.disp, w: 700, c: C.cyan, a: a * Q(S, 2, 'Speeds do not add', 0.6), ls: 1 });
};

SCENES.a05_loop = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  const a = A05.life(S);
  const V = [[360, 720], [800, 720], [800, 300], [360, 300]];
  /* the rename: k runs 0 → 1 while line 1 names it */
  const k = ease(clamp((S.u - phraseAt(S, 1, 'Rename three corners')) / 2.2));
  const ph = A05.gauged(k);
  for (let i = 0; i < 4; i++) {
    const [x1, y1] = V[i], [x2, y2] = V[(i + 1) % 4];
    arrow(x1 + (x2 - x1) * 0.12, y1 + (y2 - y1) * 0.12, x1 + (x2 - x1) * 0.88, y1 + (y2 - y1) * 0.88, C.cyan, a * 0.7, 2.5);
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    A05.dial(mx, my, 34, ph[i] * Math.PI / 2, C.cyan, a, { pearl: 'c' });
    const lx = mx + (i === 1 ? 62 : i === 3 ? -62 : 0), ly = my + (i === 0 ? 72 : i === 2 ? -52 : 10);
    const lab0 = A05.quarter(A05.U0[i]), lab1 = A05.quarter(A05.gauged(1)[i]);
    txt(lab0, lx, ly, { size: 30, fam: F.math, w: 700, c: C.white, a: a * (1 - k), align: 'center' });
    txt(lab1, lx, ly, { size: 30, fam: F.math, w: 700, c: C.white, a: a * k, align: 'center' });
  }
  /* corners: violet gauge dials; corner 0 is the anchor, a locked square */
  V.forEach(([x, y], i) => {
    if (i === 0) { box(x - 18, y - 18, 36, 36, C.white, a, 2.5, 'rgba(0,0,0,0.6)'); txt('anchor', x, y + 52, { size: 18, fam: F.mono, c: C.dim, a, align: 'center' }); return; }
    A05.dial(x, y, 26, A05.G[i] * k * Math.PI / 2, C.argued, a * Q(S, 1, 'Rename three corners', 0.5), { pearl: 'v', w: 3 });
  });
  /* the loop phase in the middle: magenta, it never moves */
  const ql = Q(S, 2, 'Around the block', 0.6);
  A05.dial(580, 510, 58, Math.PI / 2, C.mag, a * Math.max(0.35, ql), { pearl: 'm', w: 4.5 });
  txt('loop = i', 580, 610, { size: 28, fam: F.math, w: 700, c: C.mag, a: a * ql, align: 'center' });
  /* the analogy, then the arithmetic, then the theorem */
  A05.analogy(1000, 250, 780, [['a town', 'a street corner'], ['renaming its currency', 'turning a dial'], ['profit of a round trip', 'the loop phase']], a * at(S, 0, 0.7) * (1 - at(S, 1, 0.5)));
  const p1 = a * at(S, 1, 0.6);
  panel(1000, 250, 780, 300, p1, C.cyan, 'ONE BLOCK, TWO NAMINGS · 一个街区，两种叫法');
  txt('edges   1 · 1 · 1 · i', 1030, 330, { size: 30, fam: F.math, w: 700, c: C.white, a: p1 });
  txt('g = (1, i, −1, −i)', 1030, 380, { size: 30, fam: F.math, w: 700, c: C.argued, a: a * Q(S, 1, 'Rename', 0.6) });
  txt('edges   i · i · i · −1', 1030, 430, { size: 30, fam: F.math, w: 700, c: C.white, a: a * Q(S, 1, 'they read', 0.6) });
  txt('product   i  =  i', 1030, 500, { size: 34, fam: F.math, w: 700, c: C.mag, a: a * ql });
  const qL = Q(S, 3, 'Lean checks', 0.6);
  txt('anchored rename: loop phases unchanged', 1000, 610, { size: 24, fam: F.mono, w: 700, c: C.lean, a: a * qL });
  txt('same loop phases  ⇔  one rename apart', 1000, 650, { size: 24, fam: F.mono, w: 700, c: C.lean, a: a * Q(S, 3, 'exactly when', 0.6) });
  A05.greenTag(1000, 700, 'anchored_phase_classification', a * qL, 18);
  const q4 = Q(S, 4, 'Physicists', 0.6);
  txt('leftover turn = curvature = force · interpretation', 1000, 770, { size: 20, fam: F.mono, w: 700, c: C.argued, a: a * q4 });
  txt('A force is what a loop cannot forget.', 580, 830, { size: 30, fam: F.disp, w: 700, c: C.white, a: a * Q(S, 4, 'A force is', 0.6), align: 'center' });
};

SCENES.a05_waist = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const a = A05.life(S);
  const M = [500, 520], Nn = [860, 520];
  /* three bridges */
  for (let r = -1; r <= 1; r++) {
    curve(p => [lerp(M[0], Nn[0], p), M[1] + r * 70 * Math.sin(Math.PI * p)], 40, C.cyan, a * 0.9, 3);
  }
  /* legs: in at the bottom (b, c), out at the top (a, d) */
  const legs = [[M, [380, 300], 'a = 2', 'out'], [M, [380, 740], 'b = 3', 'in'], [Nn, [980, 300], 'd = 3', 'out'], [Nn, [980, 740], 'c = 2', 'in']];
  legs.forEach(([p, q, lab, io]) => {
    if (io === 'in') arrow(q[0], q[1], lerp(q[0], p[0], 0.75), lerp(q[1], p[1], 0.75), C.cyan, a, 3);
    else arrow(p[0], p[1], lerp(p[0], q[0], 0.85), lerp(p[1], q[1], 0.85), C.cyan, a, 3);
    txt(lab, q[0] + (q[0] < 600 ? -16 : 16), q[1] + (io === 'in' ? 34 : -14), { size: 28, fam: F.math, w: 700, c: C.white, a, align: q[0] < 600 ? 'right' : 'left' });
  });
  dot(M[0], M[1], 16, 'w', a); dot(Nn[0], Nn[1], 16, 'w', a);
  txt('M', M[0] - 34, M[1] + 10, { size: 28, fam: F.math, w: 700, c: C.white, a, align: 'right' });
  txt('N', Nn[0] + 34, Nn[1] + 10, { size: 28, fam: F.math, w: 700, c: C.white, a });
  /* the three cuts, magenta; the narrowest glows amber */
  const qe = Q(S, 1, 'exits six', 0.6), qi = Q(S, 1, 'entrances six', 0.6), qb = Q(S, 1, 'leg a, the bridges', 0.6);
  const hot = at(S, 2, 0.6);
  const lw = 3 + 1.5 * hot;
  dashed(330, 380, 1040, 380, C.mag, a * qe, lw);
  txt('exits', 315, 362, { size: 18, fam: F.mono, w: 700, c: C.mag, a: a * qe, align: 'right' });
  txt(`ad = 2·3 = ${A05.cuts.exits}`, 315, 394, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a * qe, align: 'right' });
  dashed(330, 660, 1040, 660, C.mag, a * qi, lw);
  txt('entrances', 315, 642, { size: 18, fam: F.mono, w: 700, c: C.mag, a: a * qi, align: 'right' });
  txt(`bc = 3·2 = ${A05.cuts.entrances}`, 315, 674, { size: 24, fam: F.mono, w: 700, c: C.mag, a: a * qi, align: 'right' });
  /* the third cut runs through leg a, all three bridges and leg c */
  dashed(420, 401, 930, 635, C.mag, a * qb, 3);
  txt('a · 3 bridges · c', 958, 588, { size: 16, fam: F.mono, w: 700, c: C.mag, a: a * qb });
  txt(`3ac = 2·3·2 = ${A05.cuts.bridges}`, 958, 616, { size: 20, fam: F.mono, w: 700, c: C.mag, a: a * qb });
  /* the stadium analogy, then the theorem */
  A05.analogy(1180, 240, 600, [['people', 'signals'], ['gates of the stadium', 'cuts'], ['narrowest gate', 'smallest cut'], ['but widths add', 'leg sizes multiply']], a * at(S, 0, 0.7) * (1 - at(S, 2, 0.5)));
  const qL = Q(S, 2, 'Lean checks', 0.6);
  panel(1180, 450, 600, 330, a * qL, C.lean, 'RANK ≤ SMALLEST CUT · 秩不超过最小割');
  txt('max rank ≤ min(3ac, ad, bc)', 1205, 530, { size: 28, fam: F.math, w: 700, c: C.lean, a: a * qL });
  txt('for all a, b, c, d', 1205, 566, { size: 20, fam: F.mono, c: C.lean, a: a * qL });
  A05.greenTag(1205, 610, 'QMaxFlow_le_QMinCut', a * qL, 18);
  const qr = Q(S, 2, 'here it reaches it', 0.6);
  txt(`here: max rank = ${A05.minCut}`, 1205, 670, { size: 30, fam: F.math, w: 700, c: C.lean, a: a * qr });
  txt('0 < a ≤ b, 0 < c ≤ d, a² + b² ≤ 3ab, c² + d² ≤ 3cd', 1205, 704, { size: 15, fam: F.mono, c: C.lean, a: a * qr });
  A05.greenTag(1205, 750, 'QuantumMaxFlowMinCut.result', a * qr, 18);
  txt('Ryu–Takayanagi: entropy as minimal area · literature, not formalized here', 680, 830, { size: 20, fam: F.mono, w: 700, c: C.argued, a: a * Q(S, 3, 'Holography', 0.6), align: 'center' });
};

SCENES.a05_depth = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'open']]);
  const a = A05.life(S);
  const sx = i => 250 + (i - 1) * 82, ly = l => 360 + l * 86;
  const fadeGrid = 1;
  /* sites */
  for (let i = 1; i <= A05.N; i++) {
    txt(String(i), sx(i), 300, { size: 22, fam: F.mono, w: 700, c: C.dim, a: a * fadeGrid, align: 'center' });
    line(sx(i), 316, sx(i), 700, C.dim, a * 0.25 * fadeGrid, 1);
  }
  txt('site', sx(1) - 40, 300, { size: 18, fam: F.mono, c: C.dim, a: a * fadeGrid, align: 'right' });
  /* layers appear one tick after another during line 1 */
  const t1 = phraseAt(S, 1, 'side by side');
  A05.LIST.forEach((kk, idx) => {
    const L = A05.LAYERS[idx], sites = A05.gateSites(kk);
    const al = a * fadeGrid * (S.u < lineAt(S, 1).s ? at(S, 0, 0.8) * 0.35 : clamp((S.u - t1 - L * 0.5) / 0.4));
    const show = Math.max(al, a * fadeGrid * at(S, 0, 0.8) * 0.3 * (S.u < t1 + L * 0.5 ? 1 : 0));
    if (show <= 0.003) return;
    const x0 = sx(sites[0]) - 30, x1 = sx(sites[sites.length - 1]) + 30, y = ly(L);
    const turn = A05.SS.includes(kk);
    box(x0, y - 28, x1 - x0, 56, turn ? C.mag : C.cyan, show, 2, rgba(turn ? C.mag : C.cyan, 0.16));
    txt(A05.gateName(kk), (x0 + x1) / 2, y + 9, { size: 22, fam: F.mono, w: 700, c: C.white, a: show, align: 'center' });
  });
  for (let l = 0; l < 4; l++) {
    const al = a * fadeGrid * clamp((S.u - t1 - l * 0.5) / 0.4);
    txt(`tick ${l + 1}`, sx(1) - 46, ly(l) + 8, { size: 20, fam: F.mono, w: 700, c: l === 3 ? C.now : C.cyan, a: al, align: 'right' });
  }
  txt('turning points U4, U8', sx(6), 760, { size: 22, fam: F.mono, w: 700, c: C.mag, a: a * fadeGrid * Q(S, 1, 'Two turning points', 0.6), align: 'center' });
  /* the analogy, then the rule */
  A05.analogy(1220, 240, 560, [['cooks', 'gates'], ['a burner', 'a site'], ['dinner time', 'depth']], a * at(S, 0, 0.7) * (1 - at(S, 1, 0.5)));
  const p1 = a * at(S, 1, 0.6);
  panel(1220, 240, 560, 320, p1, C.cyan, 'GATES VS TICKS · 门数与拍数');
  txt('12 gates', 1250, 320, { size: 34, fam: F.math, w: 700, c: C.white, a: p1 });
  txt('4 ticks', 1520, 320, { size: 34, fam: F.math, w: 700, c: C.now, a: a * Q(S, 1, 'four ticks', 0.5) });
  const qL = Q(S, 2, 'Lean checks', 0.6);
  txt('minDepth(N, κ) = ⌊N/(κ+1)⌋ + 1', 1250, 400, { size: 28, fam: F.math, w: 700, c: C.lean, a: a * qL });
  txt('1 ≤ κ, 2κ ≤ N · this circuit family', 1250, 436, { size: 18, fam: F.mono, c: C.lean, a: a * qL });
  txt('⌊11/3⌋ + 1 = 4', 1250, 484, { size: 28, fam: F.math, w: 700, c: C.white, a: a * Q(S, 2, 'rounded down', 0.6) });
  A05.greenTag(1250, 532, 'OpenIntegrableCircuitMinDepth.result', a * qL, 18);
  /* the open conjecture: a toy picture */
  const qo = at(S, 3, 0.7);
  if (qo > 0.003) {
    const x0 = 1250, y0 = 820, w = 500, h = 190;
    panel(x0 - 30, y0 - h - 54, w + 60, h + 84, a * qo, C.open, 'COMPLEXITY = VOLUME · OPEN · 复杂度＝体积 · 未决');
    line(x0, y0, x0 + w, y0, C.dim, a * qo, 1.2); line(x0, y0, x0, y0 - h + 20, C.dim, a * qo, 1.2);
    const grow = clamp((S.u - lineAt(S, 3).s) / 3.5);
    curve(p => { const t = 4 * p * grow; return [x0 + t / 4 * w, y0 - Math.min(2 * t, 4) / 8 * (h - 30)]; }, 80, C.cyan, a * qo, 3);
    curve(p => { const t = 4 * p * grow; return [x0 + t / 4 * w, y0 - (2 * t) / 8 * (h - 30)]; }, 80, C.mag, a * qo, 3);
    txt('entanglement stops', x0 + w * 0.5, y0 - (h - 30) * 0.5 + 30, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a * qo * clamp(grow * 2 - 0.8) });
    txt('complexity keeps growing?', x0 + w * 0.22, y0 - h + 30, { size: 20, fam: F.mono, w: 700, c: C.mag, a: a * qo * clamp(grow * 2 - 1.2) });
    txt('toy curves', x0 + w - 6, y0 - 12, { size: 16, fam: F.mono, c: C.argued, a: a * qo, align: 'right' });
  }
};

SCENES.a05_ask = S => {
  SPINE.rail(S, 5, 1);
  badgeQ(S, [[0, null, 'argued']]);
  const a = A05.life(S, 0.5, 0.01);
  const cx = W / 2, cy = 380, r = 215;
  const dim = 1 - 0.5 * at(S, 1, 0.8);
  ring(cx, cy, r, C.cyan, a * 0.8 * dim, 2.5);
  ring(cx, cy, r - 8, C.cyan, a * 0.25 * dim, 1);
  /* four keepsakes inside the sphere: hyperbola, loop, waist, ticks */
  const ic = [[cx - 105, cy - 75], [cx + 105, cy - 75], [cx - 105, cy + 62], [cx + 105, cy + 62]];
  const ai = k => a * dim * clamp((S.u - lineAt(S, 0).s - 0.6 * k) / 0.5);
  curve(p => { const x = -1.4 + 2.8 * p; return [ic[0][0] + x * 34, ic[0][1] + 40 - Math.sqrt(1 + x * x) * 34]; }, 40, C.cyan, ai(0), 3);
  box(ic[1][0] - 38, ic[1][1] - 38, 76, 76, C.cyan, ai(1), 2);
  A05.dial(ic[1][0], ic[1][1], 20, Math.PI / 2, C.mag, ai(1), { pearl: 'm', w: 3 });
  line(ic[2][0] - 50, ic[2][1] - 30, ic[2][0] + 50, ic[2][1] - 30, C.cyan, ai(2), 3);
  line(ic[2][0] - 50, ic[2][1] + 30, ic[2][0] + 50, ic[2][1] + 30, C.cyan, ai(2), 3);
  line(ic[2][0] - 14, ic[2][1] - 30, ic[2][0] - 14, ic[2][1] + 30, C.mag, ai(2), 3);
  line(ic[2][0] + 14, ic[2][1] - 30, ic[2][0] + 14, ic[2][1] + 30, C.mag, ai(2), 3);
  for (let l = 0; l < 4; l++) box(ic[3][0] - 48 + (l % 2) * 20, ic[3][1] - 40 + l * 20, 56, 16, C.cyan, ai(3), 1.5, rgba(C.cyan, 0.15));
  const labs = ['clocks', 'loops', 'waists', 'ticks'];
  ic.forEach(([x, y], i) => txt(labs[i], x, y + 58, { size: 20, fam: F.mono, w: 700, c: C.white, a: ai(i), align: 'center' }));
  txt('measured from inside', cx, cy + r + 44, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: a * at(S, 0, 0.8) * dim, align: 'center', ls: 2 });
  SPINE.ask(S, 1, 'Can a sphere ever see itself from outside?', '一个球能从外面看见自己吗？');
};

/* ---- a06 · Beyond the sphere · 越界·球外之球 ---- */
/* Act VI of "No Third Point" · Beyond the sphere · 越界·球外之球 (book quantum-geometry, Part VI, chapters 21–24).

   What each scene shows, and where it rests:
     a06_title     a list of endless bit rows drawn inside a circle; "the list = the whole sphere" is a picture (ARGUED).
     a06_diagonal  Cantor's diagonal on a 12 × 12 corner of the list (rows from a fixed pseudo-random rule, computed):
                   flip the diagonal, the new row d differs from row k in place k (NUM) ..... LEAN
                   RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode: for a twist with no fixed
                   point, the twisted diagonal differs from every listed decoder (latent = id, twist = bit flip here).
                   Put d on top of the list, flip the new diagonal: escapes again (NUM). Gödel: literature (ARGUED).
     a06_crack     the regular N-gon in the unit circle leaves the sagitta 1 − cos(π/N) > 0 (NUM): N = 6, 12, 24 give
                   0.1340, 0.0341, 0.0086; from 6 to 24 the gap shrinks by 15.66. Flat tiles on a dome: analogy.
     a06_primes    the lattice 2^a 3^b (NUM); 2^19 = 524288, 3^12 = 531441 (NUM) ..... LEAN
                   PrimeLogIndependence.prime_log_indep (an integer combination of logs of distinct primes vanishes
                   only with every coefficient 0). 1..30: the numbers reached by 2, 3, 5; the first one off is 7 (NUM).
                   Euclid: literature (ARGUED). The Riemann hypothesis: proved by an external Lean 4 project and
                   replayed by independent kernels, not frozen in the pinned library (PROJECT.md §14): neither green
                   nor red.
     a06_fixed     θ_{k+1} = cos θ_k from θ_0 = 0 (NUM) ..... LEAN DottieInverseSeries.rational_inverse_endpoint (there
                   is exactly one θ > 0 with cos θ = θ, and 0 < θ < 1; the series parts are not said on screen).
                   "No finite press lands on θ*": hand derivation (cos is one-to-one on [0, 1], θ_0 = 0 ≠ θ*; ARGUED).
     a06_psi       EscapeCount.diagonal_landing_fixed (LEAN: g a₀ = diagonal f g ⇒ f (g a₀ a₀) = g a₀ a₀); a 2 × 2
                   list with the twist cos that catches its own diagonal (NUM); ψ = ψ(ψ) is the book's reading (ARGUED).

   On load, FILM.init re-derives every number on screen by an independent route and looks up this act's own GIDs with leanCite;
   any disagreement goes to window.FILM_ERRORS, which stops the render. */

const A06 = (() => {
  const GID = {
    diag: 'D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode',
    logs: 'D5/S3/Factorization/PrimeLogIndependence.prime_log_indep',
    dottie: 'D5/S3/Analytic/PowerSeries/DottieInverseSeries.rational_inverse_endpoint',
    land: 'D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed'
  };
  const short = gid => gid.split('.').pop();

  /* ---- the bit list: a fixed 12 × 12 corner of an endless list ---- */
  const NB = 12;
  const rows = [];
  for (let i = 0; i < NB; i++) { const r = []; for (let j = 0; j < NB; j++) r.push(rnd(i + 3, j + 11) < 0.5 ? 0 : 1); rows.push(r); }
  const flip = b => 1 - b;
  const d = rows.map((r, k) => flip(r[k]));                          // the flipped diagonal
  const rows2 = [d].concat(rows.slice(0, NB - 1));                    // d put on top of the list
  const d2 = rows2.map((r, k) => flip(r[k]));                         // the new flipped diagonal

  /* ---- the polygon gap: sagitta of the regular N-gon in the unit circle ---- */
  const GAP_N = [6, 12, 24];
  const gap = N => 1 - Math.cos(Math.PI / N);

  /* ---- the prime lattice ---- */
  const smooth5 = n => { for (const p of [2, 3, 5]) while (n % p === 0) n /= p; return n === 1; };
  const strip = Array.from({ length: 30 }, (_, i) => i + 1);
  const firstOff = strip.find(n => !smooth5(n));
  const P219 = 2 ** 19, P312 = 3 ** 12;

  /* ---- the cosine chase ---- */
  const iters = [0];
  for (let k = 0; k < 80; k++) iters.push(Math.cos(iters[k]));
  let ts = 0.75;                                                     // Newton on cos t − t: an independent route to θ*
  for (let k = 0; k < 40; k++) ts = ts - (Math.cos(ts) - ts) / (-Math.sin(ts) - 1);
  const THETA = ts;

  /* ---- a 2 × 2 list with the twist cos that catches its own twisted diagonal ---- */
  const G2 = [[THETA, 1], [0.5, 0]];                                  // g a0 = (θ*, 1), g a1 = (0.5, 0)
  const diag2 = [Math.cos(G2[0][0]), Math.cos(G2[1][1])];             // (cos θ*, cos 0) = (θ*, 1) = g a0

  const fmt = (x, n) => x.toFixed(n);
  const group = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  /* an evidence tag drawn beside the sentence it supports: a filled head (LEAN ✓, NUM, ARGUED, EXTERNAL) and a short text */
  const KIND = {
    lean: () => ['LEAN ✓', C.lean], num: () => ['NUM', C.cyan], argued: () => ['ARGUED', C.argued],
    ext: () => ['EXTERNAL', C.white], open: () => ['OPEN', C.open]
  };
  function tag(x, y, kind, s, a, o = {}) {
    if (a <= 0.003) return 0;
    const [head, col] = KIND[kind](), size = o.size || 18;
    const wh = tw(head, size * 0.8, F.mono, 700, 1.5) + 18, ws = tw(s, size, o.fam || F.mono, 700), w = wh + 12 + ws + 14;
    const x0 = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x, h = size * 1.6;
    fillBox(x0, y - h / 2, w, h, mix(col, C.bg, 0.86), a * 0.85);
    box(x0, y - h / 2, w, h, col, a * 0.9, 1.2);
    fillBox(x0, y - h / 2, wh, h, col, a * 0.95);
    txt(head, x0 + 9, y + size * 0.28, { size: size * 0.8, fam: F.mono, w: 700, c: C.bg, a, ls: 1.5 });
    txt(s, x0 + wh + 12, y + size * 0.33, { size, fam: o.fam || F.mono, w: 700, c: col, a });
    return w;
  }
  /* the Lean name under a LEAN tag, small and dim green */
  function leanName(x, y, gid, a, align = 'left') {
    const r = leanCite(gid);
    txt(r ? short(gid) : gid, x, y, { size: 14, fam: F.mono, w: 400, c: C.lean, a: a * 0.75, align });
  }

  /* a grid of bits; hi(i, j) returns { col, a } overrides */
  function bitGrid(R, x0, y0, cs, nr, nc, a, hi) {
    if (a <= 0.003) return;
    for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) {
      const h = hi ? hi(i, j) : null;
      txt(String(R[i][j]), x0 + j * cs + cs / 2, y0 + i * cs + cs * 0.68,
        { size: cs * 0.56, fam: F.mono, w: 700, align: 'center', c: h ? h.col : C.cyan, a: a * (h ? h.a : 0.55) });
    }
  }

  return { GID, short, NB, rows, d, rows2, d2, flip, GAP_N, gap, smooth5, strip, firstOff, P219, P312,
    iters, THETA, G2, diag2, fmt, group, tag, leanName, bitGrid };
})();

FILM.init.push(() => {
  const err = s => window.FILM_ERRORS.push('a06: ' + s);
  Object.values(A06.GID).forEach(g => { const r = leanCite(g); if (!r || r.kind !== 'theorem') err(`${g} not cited as a theorem`); });
  /* the flipped diagonal differs from row k in place k, for both lists */
  for (let k = 0; k < A06.NB; k++) {
    if (A06.d[k] === A06.rows[k][k]) err(`d agrees with row ${k}`);
    if (A06.d2[k] === A06.rows2[k][k]) err(`d2 agrees with row ${k}`);
  }
  if (A06.rows2[0].some((b, j) => b !== 1 - A06.rows[j][j])) err('row 0 of the second list is not d');
  if (!A06.rows.every(r => r.some((b, j) => b !== A06.d[j]))) err('d equals a listed row');
  /* polygon gaps by the half-angle route 2 sin²(π/2N) */
  const want = { 6: '0.1340', 12: '0.0341', 24: '0.0086' };
  A06.GAP_N.forEach(N => { const g = 2 * Math.sin(Math.PI / (2 * N)) ** 2; if (Math.abs(g - A06.gap(N)) > 1e-12 || g.toFixed(4) !== want[N] || !(g > 0)) err(`gap ${N}`); });
  if ((A06.gap(6) / A06.gap(24)).toFixed(2) !== '15.66') err('gap ratio');
  /* primes: the lattice values, the near miss and the first number off the 2-3-5 map */
  let p2 = 1; for (let i = 0; i < 19; i++) p2 *= 2; let p3 = 1; for (let i = 0; i < 12; i++) p3 *= 3;
  if (p2 !== 524288 || p3 !== 531441 || p2 !== A06.P219 || p3 !== A06.P312) err('2^19 or 3^12');
  if (A06.firstOff !== 7) err('first number off the 2-3-5 map');
  for (let n = 1; n <= 6; n++) if (!A06.smooth5(n)) err(`${n} should be 5-smooth`);
  /* the cosine chase: iterates, the fixed point by bisection, the displayed digits */
  let lo = 0, hi = 1; for (let k = 0; k < 200; k++) { const m = (lo + hi) / 2; if (Math.cos(m) > m) lo = m; else hi = m; }
  if (Math.abs(lo - A06.THETA) > 1e-14) err('theta* by bisection');
  if (A06.THETA.toFixed(10) !== '0.7390851332') err('theta* digits');
  const shown = ['0.0000', '1.0000', '0.5403', '0.8576', '0.6543', '0.7935'];
  shown.forEach((s, k) => { if (A06.iters[k].toFixed(4) !== s) err(`iterate ${k}`); });
  for (let k = 0; k < 40; k++) if (A06.iters[k] === A06.THETA) err(`iterate ${k} hits theta*`);
  /* the 2 × 2 list catches its own twisted diagonal; its landing value is fixed by cos */
  if (Math.abs(A06.diag2[0] - A06.G2[0][0]) > 1e-15 || A06.diag2[1] !== A06.G2[0][1]) err('2 × 2 list does not land on row a0');
  if (Math.abs(Math.cos(A06.G2[0][0]) - A06.G2[0][0]) > 1e-15) err('landing value not fixed');
});

SCENES.a06_title = S => {
  const a = at(S, 0, 0.6);
  SPINE.title(S, 6, '越界·球外之球', 'Beyond the sphere');
  SPINE.rail(S, 6, a);
  if (a <= 0.003) return;
  const cx = 820, cy = 500, R = 300;
  ring(cx, cy, R, C.cyan, a * 0.7, 2.5);
  ring(cx, cy, R + 10, C.cyan, a * 0.18, 1);
  const n = Math.min(7, Math.floor(1 + 7 * clamp((S.u - lineAt(S, 0).s) / 3.2)));
  for (let i = 0; i < n; i++) {
    const s = A06.rows[i].join(' ') + '  …';
    txt(s, cx, 352 + i * 42, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * 0.8 * clamp((S.u - lineAt(S, 0).s - i * 0.45) / 0.4) });
  }
  txt('⋮', cx, 636, { size: 34, fam: F.math, align: 'center', c: C.cyan, a: a * 0.6 * clamp((S.u - lineAt(S, 0).s - 3.0) / 0.5) });
  const q = Q(S, 0, 'call that list', 0.6);
  txt('every endless row of bits', 1180, 380, { size: 30, fam: F.disp, w: 700, c: C.white, a: q });
  txt('所有无穷长的比特行', 1180, 424, { size: 28, fam: F.zh, w: 700, c: C.white, a: q * 0.85 });
  txt('= the whole sphere?', 1180, 488, { size: 40, fam: F.disp, w: 700, c: C.cyan, a: q });
  A06.tag(1180, 548, 'argued', 'a picture, not a theorem', q, { size: 17 });
  const b = at(S, 1, 0.6);
  /* "hold itself": a dashed slot for the list's own row, magenta, inside the circle */
  ctx.save(); ctx.setLineDash([8, 7]); box(cx - 200, 656, 400, 60, C.mag, b * 0.9, 1.5); ctx.restore();
  txt('a row built from the list itself?', cx, 680, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.mag, a: b });
  txt('由清单自己造出的一行？', cx, 706, { size: 17, fam: F.zh, w: 700, align: 'center', c: C.mag, a: b });
};

SCENES.a06_diagonal = S => {
  SPINE.rail(S, 6, clamp(S.u / 0.5));
  const cs = 50, x0 = 300, y0 = 205, nr = 7, nc = 10;
  const swap = at(S, 3, 0.9);                                     // table A → table B (d put on top)
  const L0 = lineAt(S, 0), walk = clamp((S.u - L0.s - 0.4) / Math.max(0.5, L0.e - L0.s - 0.4));
  const kNow = Math.min(nr - 1, Math.floor(walk * nr));
  const aIn = clamp(S.u / 0.6);
  /* table A: the original list */
  const aA = aIn * (1 - swap);
  if (aA > 0.003) {
    A06.bitGrid(A06.rows, x0, y0, cs, nr, nc, aA, (i, j) => {
      if (i === j && i <= kNow && walk > 0) return { col: i === kNow && at(S, 1) < 1 ? C.now : C.white, a: 1 };
      return null;
    });
    for (let i = 0; i < nr; i++) txt(`row ${i + 1}`, x0 - 18, y0 + i * cs + cs * 0.66, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: aA });
    txt('…', x0 + nc * cs + 16, y0 + 3.5 * cs, { size: 28, fam: F.mono, c: C.cyan, a: aA * 0.5 });
    txt('⋮', x0 - 50, y0 + nr * cs + 26, { size: 28, fam: F.math, c: C.cyan, a: aA * 0.5 });
    if (walk > 0 && at(S, 1) < 1) ring(x0 + kNow * cs + cs / 2, y0 + kNow * cs + cs / 2, cs * 0.46, C.now, aA * (1 - at(S, 1)), 2.5);
    /* the flipped row d */
    const yd = y0 + nr * cs + 70;
    txt('d', x0 - 18, yd + cs * 0.66, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.mag, a: aA * clamp(walk * 4) });
    for (let j = 0; j < nc; j++) {
      const shown = j < nr ? (j <= kNow && walk > 0 ? 1 : 0) : at(S, 1, 0.6);
      txt(String(A06.d[j]), x0 + j * cs + cs / 2, yd + cs * 0.68, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: aA * shown });
    }
    /* line 1: d differs from row k in place k */
    const b = at(S, 1, 0.5);
    for (let k = 0; k < nr; k++) {
      const bk = clamp((S.u - lineAt(S, 1).s - k * 0.22) / 0.3) * aA;
      if (bk <= 0.003) continue;
      ring(x0 + k * cs + cs / 2, y0 + k * cs + cs / 2, cs * 0.44, C.mag, bk * 0.9, 2);
      dashed(x0 + k * cs + cs / 2, y0 + k * cs + cs * 0.92, x0 + k * cs + cs / 2, yd + cs * 0.15, C.mag, bk * 0.35, 1.2);
    }
    txt('d ≠ row k  in place k', x0 + nc * cs / 2, yd + cs + 42, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: b * aA });
  }
  /* table B: d on top, the new diagonal */
  if (swap > 0.003) {
    const w2 = clamp((S.u - lineAt(S, 3).s - 0.8) / 2.2);
    const k2 = Math.min(nr - 1, Math.floor(w2 * nr));
    A06.bitGrid(A06.rows2, x0, y0, cs, nr, nc, swap, (i, j) => {
      if (i === j && i <= k2 && w2 > 0) return { col: C.white, a: 1 };
      if (i === 0) return { col: C.mag, a: 0.75 };
      return null;
    });
    txt('d', x0 - 18, y0 + cs * 0.66, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.mag, a: swap });
    for (let i = 1; i < nr; i++) txt(`row ${i}`, x0 - 18, y0 + i * cs + cs * 0.66, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: swap });
    txt('…', x0 + nc * cs + 16, y0 + 3.5 * cs, { size: 28, fam: F.mono, c: C.cyan, a: swap * 0.5 });
    const yd = y0 + nr * cs + 70;
    txt('d′', x0 - 18, yd + cs * 0.66, { size: 24, fam: F.mono, w: 700, align: 'right', c: C.mag, a: swap * clamp(w2 * 4) });
    for (let j = 0; j < nr; j++) if (j <= k2 && w2 > 0) txt(String(A06.d2[j]), x0 + j * cs + cs / 2, yd + cs * 0.68, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.mag, a: swap });
    txt('escapes again · 又逃出去', x0 + nc * cs / 2, yd + cs + 42, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a: swap * clamp((w2 - 0.9) / 0.1) });
  }
  /* right: what Lean checks (line 2), Gödel (line 3), the aphorism (line 4) */
  const px = 1010, pw = 720;
  const l2 = at(S, 2, 0.6);
  panel(px, 205, pw, 230, l2, C.lean, 'WHAT LEAN CHECKS');
  txt('twist(o) ≠ o  for every value o', px + 36, 290, { size: 28, fam: F.math, w: 700, c: C.white, a: l2 });
  txt('⇒  twisted diagonal ≠ row a,  for every a', px + 36, 340, { size: 28, fam: F.math, w: 700, c: C.white, a: Q(S, 2, 'Lean checks', 0.6) });
  A06.tag(px + 36, 388, 'lean', 'the diagonal is in no row', Q(S, 2, 'Lean checks', 0.6));
  A06.leanName(px + 36, 424, A06.GID.diag, Q(S, 2, 'Lean checks', 0.6));
  const l3 = Q(S, 3, 'Gödel', 0.6);
  A06.tag(px, 480, 'argued', 'Gödel 1931: the same kind of move, under different hypotheses', l3, { size: 17 });
  txt('literature result, not formalized in this book · 文献结果', px + 10, 518, { size: 16, fam: F.mono, c: C.argued, a: l3 * 0.8 });
  const l4 = at(S, 4, 0.7);
  txt('However full the list, it does not seal the sphere.', px, 610, { size: 30, fam: F.disp, w: 700, c: C.white, a: l4 });
  txt('It pushes the diagonal out.', px, 656, { size: 30, fam: F.disp, w: 700, c: C.mag, a: l4 });
  txt('再满的清单也封不住球，只会把对角线顶出去。', px, 704, { size: 26, fam: F.zh, w: 700, c: C.white, a: l4 * 0.85 });
};

SCENES.a06_crack = S => {
  SPINE.rail(S, 6, clamp(S.u / 0.5));
  const a = clamp(S.u / 0.6), cx = 560, cy = 500, R = 280;
  const L1 = lineAt(S, 1), p1 = clamp((S.u - L1.s) / Math.max(0.5, L1.e - L1.s));
  const idx = Q(S, 1, 'sixteen-fold', 0.01) > 0 ? 2 : Q(S, 1, 'gap shrinks', 0.01) > 0 ? 1 : 0;
  void p1;
  const N = A06.GAP_N[idx];
  ring(cx, cy, R, C.cyan, a * 0.8, 2.5);
  /* the inscribed N-gon, one edge on top */
  const ang = i => -Math.PI / 2 - Math.PI / N + i * 2 * Math.PI / N;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 2; ctx.beginPath();
  for (let i = 0; i <= N; i++) { const x = cx + R * Math.cos(ang(i)), y = cy + R * Math.sin(ang(i)); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
  ctx.stroke();
  /* the gap between the top edge and the arc, magenta */
  ctx.beginPath(); ctx.arc(cx, cy, R, ang(0), ang(1)); ctx.closePath();
  ctx.fillStyle = rgba(C.mag, 0.55); ctx.fill(); ctx.restore();
  const yTop = cy - R, yEdge = cy - R * Math.cos(Math.PI / N);
  line(cx, yTop, cx, yEdge, C.mag, a, 3);
  arrow(cx + 150, yTop - 40, cx + 20, (yTop + yEdge) / 2, C.mag, a * 0.8, 2);
  txt('gap', cx + 160, yTop - 34, { size: 24, fam: F.mono, w: 700, c: C.mag, a });
  /* zoom on the gap: magnified (N/6)² times so that it stays visible */
  const zoom = (N / 6) ** 2, zx = 130, zy = 300, zw = 220, sag = A06.gap(N) * R * zoom;
  box(zx, zy - 120, zw, 150, C.mag, a * 0.7, 1.2, 'rgba(0,0,0,0.45)');
  line(zx + 20, zy, zx + zw - 20, zy, C.white, a, 2);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 2.5; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const t = i / 40, x = zx + 20 + t * (zw - 40), y = zy - sag * 4 * t * (1 - t); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
  ctx.stroke(); ctx.restore();
  line(zx + zw / 2, zy, zx + zw / 2, zy - sag, C.mag, a, 3);
  txt(`zoom × ${zoom}`, zx + 12, zy - 96, { size: 18, fam: F.mono, w: 700, c: C.mag, a });
  txt(`true gap ${A06.fmt(A06.gap(N), 4)} > 0`, zx + 10, zy + 24, { size: 15, fam: F.mono, w: 700, c: C.mag, a });
  txt(`N = ${N}`, cx, cy + 12, { size: 40, fam: F.orb, w: 700, align: 'center', c: C.now, a });
  A06.tag(cx, cy + R + 50, 'argued', 'flat tiles on a round dome: an analogy', Q(S, 0, 'flat tiles', 0.6), { align: 'center', size: 17 });
  /* the table of gaps */
  const px = 1040, pw = 700, ta = at(S, 0, 0.6, 1.0);
  panel(px, 215, pw, 400, ta, C.cyan, 'GAP OF THE N-GON IN THE UNIT CIRCLE');
  txt('gap = 1 − cos(π / N)', px + 36, 290, { size: 30, fam: F.math, w: 700, c: C.white, a: ta });
  A06.GAP_N.forEach((n, i) => {
    const ra = i === 0 ? ta : (i === 1 ? Q(S, 1, 'gap shrinks', 0.4) : Q(S, 1, 'sixteen-fold', 0.4));
    const cur = i === idx;
    txt(`N = ${String(n).padStart(2, ' ')}`, px + 60, 368 + i * 62, { size: 32, fam: F.mono, w: 700, c: cur ? C.now : C.cyan, a: ra });
    txt(A06.fmt(A06.gap(n), 4), px + 330, 368 + i * 62, { size: 32, fam: F.mono, w: 700, c: cur ? C.now : C.mag, a: ra });
  });
  const ra = Q(S, 1, 'sixteen-fold', 0.6);
  txt(`6 → 24 sides:  gap ÷ ${(A06.gap(6) / A06.gap(24)).toFixed(2)}`, px + 60, 570, { size: 26, fam: F.mono, w: 700, c: C.white, a: ra });
  A06.tag(px, 660, 'num', 'computed on screen; the gap is > 0 for every N', ta, { size: 17 });
  const nv = Q(S, 1, 'never closes', 0.6);
  txt('never closes · 永远合不上', px + 10, 730, { size: 34, fam: F.disp, w: 700, c: C.mag, a: nv });
};

SCENES.a06_primes = S => {
  SPINE.rail(S, 6, clamp(S.u / 0.5));
  const a = clamp(S.u / 0.6);
  const X = i => 240 + i * 145, Y = j => 580 - j * 155;
  const path = [[0, 0], [1, 0], [2, 0], [2, 1]];                      // 1 → 2 → 4 → 12
  const pp = clamp((S.u - lineAt(S, 1).s - 0.3) / Math.max(0.5, lineAt(S, 1).e - lineAt(S, 1).s - 0.3));
  const steps = at(S, 1) <= 0 ? 0 : Math.min(3, Math.floor(pp * 4));
  /* grid lines (streets) */
  for (let j = 0; j < 3; j++) line(X(0), Y(j), X(4), Y(j), C.cyan, a * 0.25, 1.2);
  for (let i = 0; i < 5; i++) line(X(i), Y(0), X(i), Y(2), C.cyan, a * 0.25, 1.2);
  for (let s = 0; s < steps; s++) arrow(X(path[s][0]), Y(path[s][1]), X(path[s + 1][0]), Y(path[s + 1][1]), C.cyan, a, 4);
  for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) {
    const v = 2 ** i * 3 ** j, cur = at(S, 1) > 0 && path[steps][0] === i && path[steps][1] === j;
    fillBox(X(i) - 32, Y(j) - 24, 64, 48, C.bg, a * 0.85);
    box(X(i) - 32, Y(j) - 24, 64, 48, cur ? C.now : C.cyan, a * (cur ? 1 : 0.5), cur ? 2.5 : 1.2);
    txt(String(v), X(i), Y(j) + 10, { size: 26, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.white, a });
  }
  arrow(X(0), Y(0) + 58, X(1) - 10, Y(0) + 58, C.cyan, a, 2.5);
  txt('× 2', X(0) + 72, Y(0) + 92, { size: 24, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  arrow(X(0) - 64, Y(0), X(0) - 64, Y(1) + 10, C.cyan, a, 2.5);
  txt('× 3', X(0) - 76, Y(0) - 70, { size: 24, fam: F.math, w: 700, align: 'right', c: C.cyan, a });
  txt('12 = 2² · 3', X(2) + 60, Y(1) - 44, { size: 30, fam: F.math, w: 700, c: C.now, a: Q(S, 1, 'Twelve', 0.5) });
  A06.tag(X(0) - 40, 205, 'argued', 'each prime as a street: a picture', Q(S, 0, 'own street', 0.6), { size: 16 });
  /* right: the near miss and the Lean line */
  const px = 1010, pw = 730, l2 = at(S, 2, 0.6);
  panel(px, 205, pw, 250, l2, C.cyan, 'TWOS NEVER MAKE THREES');
  txt(`2¹⁹ = ${A06.group(A06.P219)}`, px + 36, 278, { size: 32, fam: F.mono, w: 700, c: C.white, a: l2 });
  txt(`3¹² = ${A06.group(A06.P312)}`, px + 36, 322, { size: 32, fam: F.mono, w: 700, c: C.white, a: l2 });
  txt('close, never equal', px + 470, 300, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: l2 });
  const ll = Q(S, 2, 'Lean checks', 0.6);
  txt('Σ kₚ · log p = 0  (kₚ ∈ ℤ)  ⇒  every kₚ = 0', px + 36, 376, { size: 26, fam: F.math, w: 700, c: C.white, a: ll });
  A06.tag(px + 36, 414, 'lean', 'prime logs are independent over the integers', ll, { size: 17 });
  A06.leanName(px + 36 + 4, 446, A06.GID.logs, ll);
  /* line 4: the Riemann hypothesis — external, neither green nor red */
  const l4 = at(S, 4, 0.6);
  panel(px, 470, pw, 214, l4, C.white, 'THE RIEMANN HYPOTHESIS · 黎曼猜想');
  A06.tag(px + 30, 522, 'argued', 'primes ↔ zeros: the explicit formula · literature', l4, { size: 14 });
  txt('every nontrivial zero of ζ lies on Re s = 1/2', px + 30, 566, { size: 23, fam: F.math, w: 700, c: C.white, a: l4 });
  A06.tag(px + 30, 604, 'ext', 'proved in an external Lean 4 formalization (2026)', l4, { size: 15 });
  txt('replayed by independent kernels · not frozen in this book’s pinned library', px + 30, 643, { size: 15, fam: F.mono, c: C.white, a: l4 * 0.75 });
  txt('外部已核验 · 本书所钉的库中未冻结', px + 30, 668, { size: 16, fam: F.zh, c: C.white, a: l4 * 0.75 });
  /* line 3: 1 … 30 — reached by 2, 3, 5 or not */
  const l3 = at(S, 3, 0.6), sx = 210, sw = 50;
  txt('1 … 30 · cyan: reached by 2, 3, 5 · magenta: off the map', sx, 722, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: l3 });
  A06.tag(sx + 1500, 716, 'argued', 'Euclid: the primes never run out · literature', Q(S, 3, 'never run out', 0.6), { size: 15, align: 'right' });
  A06.strip.forEach((n, i) => {
    const ok = A06.smooth5(n), ai = l3 * clamp((S.u - lineAt(S, 3).s - i * 0.04) / 0.3);
    box(sx + i * sw, 740, sw - 6, 40, ok ? C.cyan : C.mag, ai * 0.8, 1.2, ok ? rgba(C.cyan, 0.14) : rgba(C.mag, 0.22));
    txt(String(n), sx + i * sw + (sw - 6) / 2, 768, { size: 18, fam: F.mono, w: 700, align: 'center', c: ok ? C.cyan : C.mag, a: ai });
  });
  const s7 = Q(S, 3, 'Seven', 0.5) * l3;
  ring(sx + (A06.firstOff - 1) * sw + (sw - 6) / 2, 760, 30, C.now, s7, 2.5);
};

SCENES.a06_fixed = S => {
  SPINE.rail(S, 6, clamp(S.u / 0.5));
  const a = clamp(S.u / 0.6);
  const gx = 230, gy = 800, sc = 545;
  const P = (x, y) => [gx + x * sc, gy - y * sc];
  /* axes, the diagonal y = x and the cosine curve */
  line(gx, gy, gx + 1.1 * sc, gy, C.dim, a, 1.5); line(gx, gy, gx, gy - 1.1 * sc, C.dim, a, 1.5);
  [0, 0.5, 1].forEach(v => {
    txt(String(v), P(v, 0)[0], gy + 30, { size: 18, fam: F.mono, align: 'center', c: C.dim, a });
    if (v) txt(String(v), gx - 12, P(0, v)[1] + 6, { size: 18, fam: F.mono, align: 'right', c: C.dim, a });
  });
  ctx.save(); ctx.setLineDash([8, 8]); line(...P(0, 0), ...P(1.1, 1.1), C.dim, a * 0.8, 1.5); ctx.restore();
  curve(t => P(t * 1.1, Math.cos(t * 1.1)), 120, C.cyan, a, 3);
  txt('y = cos θ', gx + 24, P(0, 1)[1] - 18, { size: 22, fam: F.math, c: C.cyan, a });
  txt('y = θ', P(1.05, 1.05)[0] - 66, P(1.05, 1.05)[1], { size: 22, fam: F.math, c: C.dim, a });
  /* the cobweb: step k goes up to the curve and across to the diagonal */
  const L0 = lineAt(S, 0), L1 = lineAt(S, 1), L2 = lineAt(S, 2);
  let k = 0;
  if (Q(S, 0, 'press cosine', 0.01) > 0) k = 1;
  if (S.u > L1.s) k = 1 + Math.min(4, Math.floor(4 * clamp((S.u - L1.s) / Math.max(0.5, L1.e - L1.s - 0.8)) + 1));
  if (S.u > L2.s) k = Math.min(40, 5 + Math.floor(35 * clamp((S.u - L2.s) / 2.2)));
  const it = A06.iters;
  ctx.save(); ctx.globalAlpha = a * 0.85; ctx.strokeStyle = C.white; ctx.lineWidth = 1.6; ctx.beginPath();
  ctx.moveTo(...P(it[0], 0));
  for (let i = 0; i < k; i++) { ctx.lineTo(...P(it[i], it[i + 1])); ctx.lineTo(...P(it[i + 1], it[i + 1])); }
  ctx.stroke(); ctx.restore();
  if (k > 0 && k < 40) { const [x, y] = P(it[k], it[k]); ring(x, y, 11, C.now, a, 2.5); dot(x, y, 6, 'g', a); }
  /* θ*: green ring (the Lean statement: one positive fixed point, in (0, 1)); the value 0.739 is computed, so white */
  const [fx, fy] = P(A06.THETA, A06.THETA);
  const lq = Q(S, 3, 'exactly one', 0.6);
  ring(fx, fy, 20, C.lean, lq, 3);
  dashed(fx, fy + 24, fx, fy + 140, C.white, at(S, 2, 0.6) * 0.6, 1.5);
  txt('θ* ≈ 0.739', fx, fy + 172, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: at(S, 2, 0.6) });
  A06.tag(fx, fy + 210, 'num', 'value computed here', at(S, 2, 0.6), { align: 'center', size: 14 });
  /* right: the calculator and the readings */
  const px = 1010, pw = 720, ca = clamp((S.u - L0.s - 1.2) / 0.6);
  panel(px, 205, pw, 170, ca, C.cyan, 'CALCULATOR · RAD');
  const shownK = Math.max(0, Math.min(k, 40));
  txt(`cos × ${shownK}`, px + 36, 300, { size: 24, fam: F.mono, w: 700, c: C.dim, a: ca });
  txt(A06.fmt(it[shownK], 7), px + pw - 40, 318, { size: 64, fam: F.mono, w: 700, align: 'right', c: C.now, a: ca });
  const ra = at(S, 1, 0.5);
  for (let i = 1; i <= 5; i++) {
    const ai = ra * clamp((S.u - L1.s - (i - 1) * 0.55) / 0.3);
    txt(`θ${'₀₁₂₃₄₅'[i]} = ${A06.fmt(it[i], 4)}`, px + 40 + ((i - 1) % 3) * 250, 432 + Math.floor((i - 1) / 3) * 44, { size: 26, fam: F.mono, w: 700, c: i % 2 ? C.cyan : C.mag, a: ai });
  }
  A06.tag(px + 40, 528, 'num', 'iterates computed on screen; left, right, left …', ra, { size: 16 });
  const l3 = at(S, 3, 0.6);
  txt('exactly one θ > 0 with cos θ = θ,  and 0 < θ < 1', px + 40, 600, { size: 24, fam: F.math, w: 700, c: C.white, a: lq });
  A06.tag(px + 40, 640, 'lean', 'unique positive fixed point of cos', lq, { size: 17 });
  A06.leanName(px + 44, 672, A06.GID.dottie, lq * l3);
  const l4 = at(S, 4, 0.6);
  txt('θₖ ≠ θ*  for every finite k', px + 40, 732, { size: 28, fam: F.math, w: 700, c: C.mag, a: l4 });
  A06.tag(px + 40, 772, 'argued', 'hand derivation: cos is one-to-one on [0, 1], and θ₀ = 0 ≠ θ*', l4, { size: 15 });
};

SCENES.a06_psi = S => {
  SPINE.rail(S, 6, clamp(S.u / 0.5));
  const out = 1 - 0.75 * at(S, 5, 0.6);
  /* right: the Lean line and a 2 × 2 list with the twist cos */
  const px = 1000, pw = 750, l1 = at(S, 1, 0.6) * out;
  panel(px, 190, pw, 330, l1, C.lean, 'LANDING · 落点');
  txt('g a₀ = diagonal f g   ⇒   f (g a₀ a₀) = g a₀ a₀', px + 36, 252, { size: 27, fam: F.math, w: 700, c: C.white, a: l1 });
  A06.tag(px + 36, 292, 'lean', 'a list catches its twisted diagonal only at a fixed point', l1, { size: 16 });
  A06.leanName(px + 40, 322, A06.GID.land, l1);
  const ex = Q(S, 1, 'leaves a value alone', 0.6) * out;
  const tx = px + 120, ty = 370, cw = 140;
  txt('a₀', tx + cw / 2, ty, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ex });
  txt('a₁', tx + cw * 1.5, ty, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ex });
  ['g a₀', 'g a₁'].forEach((r, i) => {
    txt(r, tx - 20, ty + 40 + i * 40, { size: 20, fam: F.mono, w: 700, align: 'right', c: i ? C.dim : C.cyan, a: ex });
    A06.G2[i].forEach((v, j) => txt(i === 0 && j === 0 ? '0.739…' : String(v), tx + cw * (j + 0.5), ty + 40 + i * 40,
      { size: 24, fam: F.mono, w: 700, align: 'center', c: i === j ? C.white : C.cyan, a: ex * (i === 0 ? 1 : 0.7) }));
  });
  box(tx + 12, ty + 12, cw - 24, 40, C.now, ex, 2);
  txt('cos down the diagonal:', tx + cw * 2 + 20, ty + 36, { size: 19, fam: F.mono, w: 700, c: C.cyan, a: ex });
  txt('(0.739…, 1) = g a₀', tx + cw * 2 + 20, ty + 72, { size: 22, fam: F.mono, w: 700, c: C.now, a: ex });
  A06.tag(tx - 60, ty + 118, 'num', 'this list catches its own twisted diagonal', ex, { size: 15 });
  /* left: the flip has no fixed point, so it never lands */
  const lx = 140, lw = 780, l2 = at(S, 2, 0.6) * out;
  const l0 = at(S, 0, 0.6) * out;
  panel(lx, 190, lw, 330, l0, C.cyan, 'TWO CHASES · 两场追逐');
  txt('flip the diagonal  →  escapes every time', lx + 40, 262, { size: 24, fam: F.mono, w: 700, c: C.mag, a: l0 });
  txt('press cos          →  closes in on 0.739…', lx + 40, 306, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: l0 });
  txt('flip:  0 → 1,  1 → 0', lx + 40, 378, { size: 26, fam: F.mono, w: 700, c: C.mag, a: l2 });
  txt('no value left alone ⇒ it never lands', lx + 40, 414, { size: 22, fam: F.mono, w: 700, c: C.mag, a: l2 * 0.9 });
  const cA = Q(S, 2, 'Cosine leaves', 0.6) * out;
  txt('cos:  cos θ* = θ*', lx + 40, 464, { size: 26, fam: F.math, w: 700, c: C.cyan, a: cA });
  txt('one angle left alone ⇒ a list can land', lx + 40, 498, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: cA * 0.9 });
  /* line 3: the reading ψ = ψ(ψ), violet */
  const l3 = at(S, 3, 0.8) * (1 - 0.6 * at(S, 5, 0.6));
  txt('ψ = ψ(ψ)', W / 2, 610, { size: 78, fam: F.math, w: 700, align: 'center', c: C.argued, a: l3, ab: 1.5 });
  A06.tag(W / 2, 650, 'argued', "the book's reading of the landing lemma, not a theorem", Q(S, 3, 'The book writes', 0.6) * (1 - 0.6 * at(S, 5, 0.6)), { align: 'center', size: 16 });
  /* line 4: the aphorism */
  const l4 = at(S, 4, 0.6) * (1 - at(S, 5, 0.4));
  txt('A chase stops only where the twist leaves something alone.', W / 2, 718, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a: l4 });
  txt('追逐只停在扭转放过的地方。', W / 2, 764, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: l4 * 0.85 });
  SPINE.ask(S, 5, 'If every escape lands on a new sphere, what can we stand on?', '每次逃出都落在新的球上，那我们还能站在什么上面？');
};

/* ---- a07 · Foundations: comparison as the ground · 立极·以比较为地基 ---- */
/* Act a07 of the long film No Third Point · 不借第三点: Part VII (chapters 25–28), comparison as the ground.
   Everything on screen is computed below, exactly, and re-checked independently in FILM.init:
     the overlap table G(c) with A·B = B·C = 1/2 and A·C = c has det G = 1/2 + c/2 − c², so for c = −1 the
     combination A − B + C has squared length 3 − 1 − 2 − 1 = −1; G(c) is positive semidefinite exactly for
     −1/2 ≤ c ≤ 1, at c = −1/2 the three vectors are coplanar and B = A + C;
     the 5-ring coloured 1, 2, 1, 2, 3 with every edge pointed toward the higher colour has longest directed path
     of 3 vertices, and the ring has no 2-colouring;
     a reversible copier would have to keep a table entry c that copying turns into c², and (1/2)² = 1/4;
     two planar families related by one rotation have the same overlap table.
   Lean theorems cited (film.json "lean"): gram_realizability, colorable_iff_exists_orientation,
   no_cloning_inner_product_criterion, exists_unitary_mul_eq_of_conjTranspose_mul_eq. */
const A07 = (() => {
  const GID = {
    gram: 'D5/S3/QuantumBounds/GramRealizability.gram_realizability',
    roy: 'D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation',
    clone: 'D5/S3/Quantum/PureState/NoCloningInnerProductCriterion.no_cloning_inner_product_criterion',
    unit: 'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq'
  };
  /* ---------- the overlap table ---------- */
  const gram = c => [[1, 0.5, c], [0.5, 1, 0.5], [c, 0.5, 1]];
  const detFormula = c => 0.5 + c / 2 - c * c;
  const quad = (G, x) => { let s = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += G[i][j] * x[i] * x[j]; return s; };
  /* unit vectors realizing the table for c in [−1/2, 1]: A on x, B at 60° in the xy-plane, C lifted out by the volume */
  function vecs(c) {
    const A = [1, 0, 0], B = [0.5, Math.sqrt(3) / 2, 0];
    const y = (1 - c) / Math.sqrt(3), z2 = 1 - c * c - y * y;
    return { A, B, C: [c, y, Math.sqrt(Math.max(0, z2))], z2 };
  }
  const fmt = (x, d = 2) => (Math.abs(x) < 5e-13 ? 0 : x).toFixed(d).replace('-', '−');
  const frac = x => ({ '-1': '−1', '-0.5': '−1/2', '0.5': '1/2', '1': '1', '0': '0' }[String(x)] || fmt(x));
  /* ---------- the ring of five ---------- */
  const RING = 5, COLOR = [1, 2, 1, 2, 3];
  const EDGES = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]];
  /* every edge points from the lower colour to the higher one */
  const ARCS = EDGES.map(([i, j]) => (COLOR[i] < COLOR[j] ? [i, j] : [j, i]));
  function longestChain() {
    let best = [];
    const go = path => {
      if (path.length > best.length) best = path.slice();
      const last = path[path.length - 1];
      ARCS.forEach(([i, j]) => { if (i === last && !path.includes(j)) go(path.concat([j])); });
    };
    for (let v = 0; v < RING; v++) go([v]);
    return best;
  }
  const CHAIN = longestChain();
  /* ---------- the copier ---------- */
  const OVER = 0.5, OVER2 = OVER * OVER;
  /* ---------- two worlds, one turn apart ---------- */
  const ANG = [0, 70, 150].map(d => d * Math.PI / 180), TURN = 50 * Math.PI / 180;
  const fam = (t0) => ANG.map(q => [Math.cos(q + t0), Math.sin(q + t0)]);
  const dot2 = (p, q) => p[0] * q[0] + p[1] * q[1];
  const table = F2 => F2.map(p => F2.map(q => dot2(p, q)));

  /* ---------- drawing helpers ---------- */
  const KIND = () => ({ lean: C.lean, argued: C.argued, computed: C.cyan, open: C.open, now: C.now });
  /* a small inline evidence tag, left-aligned at (x, y) */
  function tag(x, y, kind, label, a, size = 15) {
    if (a <= 0.003) return 0;
    const col = KIND()[kind] || C.cyan, ls = size < 15 ? 0.5 : 1.5, w = tw(label, size, F.mono, 700, ls) + 24;
    box(x, y - 15, w, 30, col, a, 1.6, 'rgba(0,0,0,0.55)');
    txt(label, x + 12, y + size * 0.33, { size, fam: F.mono, w: 700, c: col, a, ls });
    return w;
  }
  /* a bracketed 3×3 (or n×n) matrix; cell(i, j) returns { s, c } */
  function matrix(x, y, cw, ch, n, cell, a, size = 34) {
    if (a <= 0.003) return;
    const w = cw * n, h = ch * n;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.white; ctx.lineWidth = 2.5; ctx.beginPath();
    ctx.moveTo(x + 14, y); ctx.lineTo(x, y); ctx.lineTo(x, y + h); ctx.lineTo(x + 14, y + h);
    ctx.moveTo(x + w - 14, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x + w - 14, y + h);
    ctx.stroke(); ctx.restore();
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const e = cell(i, j); if (!e) continue;
      txt(e.s, x + cw * (j + 0.5), y + ch * (i + 0.5) + size * 0.36, { size, fam: F.math, w: 700, align: 'center', c: e.c || C.white, a: a * (e.a == null ? 1 : e.a) });
    }
  }
  /* oblique view of a 3D point for the inset */
  function view(v, cx, cy, s, yaw) {
    const x1 = v[0] * Math.cos(yaw) - v[1] * Math.sin(yaw), y1 = v[0] * Math.sin(yaw) + v[1] * Math.cos(yaw);
    return [cx + s * x1, cy - s * (v[2] * 0.6 + y1 * 0.8)];
  }
  /* the three named points on a triangle, joined by comparison chords */
  function triad(cx, cy, r, a, chord, o = {}) {
    if (a <= 0.003) return;
    const P = [0, 1, 2].map(i => [cx + r * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 3 + Math.PI / 3), cy + r * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 3 + Math.PI / 3)]);
    const pts = [P[2], P[0], P[1]];  // A bottom left, B top, C bottom right
    const names = ['A', 'B', 'C'], lab = o.labels || ['A·B', 'B·C', 'A·C'];
    [[0, 1], [1, 2], [0, 2]].forEach(([i, j], k) => {
      line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.cyan, a * chord * 0.8, 2.5);
      const mx = (pts[i][0] + pts[j][0]) / 2, my = (pts[i][1] + pts[j][1]) / 2, ox = (mx - cx) * 0.28, oy = (my - cy) * 0.28;
      txt(lab[k], mx + ox, my + oy + 9, { size: 26, fam: F.math, w: 700, align: 'center', c: C.cyan, a: a * chord });
    });
    pts.forEach((p, i) => { dot(p[0], p[1], 14, 'w', a); txt(names[i], p[0], p[1] - 26, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, a }); });
  }
  return { GID, gram, detFormula, quad, vecs, fmt, frac, RING, COLOR, EDGES, ARCS, CHAIN, OVER, OVER2, ANG, TURN, fam, dot2, table, tag, matrix, view, triad };
})();

FILM.init.push(() => {
  const bad = m => { throw new Error('a07 check failed: ' + m); };
  /* the determinant by cofactors, independent of the closed form */
  const det3 = M => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  [-1, -0.75, -0.5, 0, 0.5, 1].forEach(c => { if (Math.abs(det3(A07.gram(c)) - A07.detFormula(c)) > 1e-12) bad('det at ' + c); });
  if (det3(A07.gram(-1)) !== -1 || det3(A07.gram(-0.5)) !== 0 || det3(A07.gram(1)) !== 0) bad('det values');
  if (A07.quad(A07.gram(-1), [1, -1, 1]) !== -1) bad('|A − B + C|² at c = −1');
  if (3 - 2 * 0.5 + 2 * -1 - 2 * 0.5 !== -1) bad('3 − 1 − 2 − 1');
  /* semidefiniteness by brute minimum of xᵀGx over a sphere grid */
  const minQ = c => { let m = Infinity; for (let i = 0; i <= 60; i++) for (let j = 0; j < 120; j++) { const th = Math.PI * i / 60, ph = 2 * Math.PI * j / 120; m = Math.min(m, A07.quad(A07.gram(c), [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)])); } return m; };
  if (!(minQ(-1) < -0.1) || !(minQ(-0.6) < 0) || !(minQ(-0.4) > 0) || !(minQ(0.9) > 0) || !(minQ(1) > -1e-9)) bad('window by quadratic form');
  [-0.5, -0.2, 0.3, 0.8, 1].forEach(c => { const v = A07.vecs(c), d = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
    if (Math.abs(d(v.A, v.B) - 0.5) > 1e-12 || Math.abs(d(v.B, v.C) - 0.5) > 1e-12 || Math.abs(d(v.A, v.C) - c) > 1e-12 || Math.abs(d(v.C, v.C) - 1) > 1e-12) bad('vectors at ' + c);
    if (Math.abs(v.z2 - 4 / 3 * A07.detFormula(c)) > 1e-12) bad('height vs det at ' + c); });
  const v = A07.vecs(-0.5);
  if (v.A.some((x, i) => Math.abs(x + v.C[i] - v.B[i]) > 1e-12)) bad('B = A + C');
  /* ring: proper 3-colouring, no 2-colouring, longest chain of 3 points */
  if (A07.EDGES.some(([i, j]) => A07.COLOR[i] === A07.COLOR[j])) bad('colouring');
  for (let m = 0; m < 32; m++) if (A07.EDGES.every(([i, j]) => ((m >> i) & 1) !== ((m >> j) & 1))) bad('ring 2-colourable');
  if (A07.CHAIN.length !== 3) bad('longest chain ' + A07.CHAIN.length);
  if (A07.CHAIN.some((x, i) => i && A07.COLOR[x] <= A07.COLOR[A07.CHAIN[i - 1]])) bad('chain climbs');
  if (A07.OVER2 !== 0.25) bad('(1/2)²');
  const T1 = A07.table(A07.fam(0)), T2 = A07.table(A07.fam(A07.TURN));
  if (T1.some((r, i) => r.some((x, j) => Math.abs(x - T2[i][j]) > 1e-12))) bad('turned table');
  Object.values(A07.GID).forEach(g => { if (!leanCite(g)) bad('missing citation ' + g); });
});

SCENES.a07_title = S => {
  const u = S.u, a0 = at(S, 0, 0.8);
  SPINE.rail(S, 7, at(S, 0, 0.6));
  /* spheres beyond spheres, shrinking to the background as the act chooses comparisons instead */
  const fade = 1 - 0.7 * Q(S, 0, 'comparisons', 1.4);
  for (let i = 0; i < 6; i++) {
    const r = 70 + i * 52 + 14 * Math.sin(u * 0.6 + i);
    ring(560, 520, r, i % 2 ? C.mag : C.cyan, a0 * fade * (0.85 - i * 0.1), 2);
    ctx.save(); ctx.globalAlpha = a0 * fade * 0.4; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.ellipse(560, 520, r, r * 0.28, 0, 0, TAU); ctx.stroke(); ctx.restore();
  }
  txt('no last floor · 没有最后一层地板', 560, 810, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: a0 * fade * 0.7 });
  /* what every sphere keeps: three states and their pairwise chords */
  const ta = Q(S, 0, 'comparisons', 0.7);
  A07.triad(560, 520, 200, ta, Q(S, 1, 'each pair', 0.8));
  /* the table, and nothing else */
  const tb = at(S, 1, 0.8);
  panel(1060, 290, 640, 330, tb, C.cyan, 'OVERLAP TABLE · 内积表');
  const nm = ['A', 'B', 'C'], ent = [['1', 'A·B', 'A·C'], ['A·B', '1', 'B·C'], ['A·C', 'B·C', '1']];
  nm.forEach((n, i) => { txt(n, 1190 + i * 150, 362, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.dim, a: tb });
    txt(n, 1090, 422 + i * 62 + 10, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.dim, a: tb }); });
  A07.matrix(1120, 388, 150, 62, 3, (i, j) => ({ s: ent[i][j], c: i === j ? C.white : C.cyan }), tb, 30);
  /* no clock, no outside frame */
  const nc = Q(S, 1, 'No clock', 0.5), nf = Q(S, 1, 'outside frame', 0.5);
  [[nc, 'NO CLOCK · 无钟', 1240], [nf, 'NO OUTSIDE FRAME · 无外部坐标', 1520]].forEach(([k, s, x]) => {
    chip(x, 690, x === 1240 ? 240 : 330, 50, s, C.dim, k, 18, F.mono);
    line(x - (x === 1240 ? 110 : 150), 690, x - (x === 1240 ? 110 : 150) + (x === 1240 ? 220 : 300) * eo(k), 690, C.white, k * 0.8, 2);
  });
  SPINE.title(S, 7, '立极·以比较为地基', 'Foundations: comparison as the ground');
};

SCENES.a07_chart = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed']]);
  /* the analogy: a chart of three towns, no map */
  const a0 = at(S, 0, 0.7);
  panel(150, 210, 640, 400, a0, C.argued, 'ANALOGY · 比方');
  txt('MILEAGE CHART · 里程表', 180, 290, { size: 26, fam: F.mono, w: 700, c: C.white, a: a0 });
  const towns = ['A', 'B', 'C'];
  towns.forEach((n, i) => {
    txt(n, 260 + i * 90, 350, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.dim, a: a0 });
    txt(n, 200, 400 + i * 50, { size: 24, fam: F.orb, w: 900, align: 'center', c: C.dim, a: a0 });
    for (let j = 0; j < 3; j++) box(225 + j * 90, 372 + i * 50, 70, 40, C.cyan, a0 * 0.6, 1.2);
  });
  /* the missing map */
  const mx = 560, my = 330, mw = 200, mh = 200;
  ctx.save(); ctx.setLineDash([8, 8]); box(mx, my, mw, mh, C.dim, a0, 1.6); ctx.restore();
  txt('MAP ?', mx + mw / 2, my + mh / 2 + 10, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.dim, a: a0 });
  txt('地图？', mx + mw / 2, my + mh / 2 + 50, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a0 });
  const kill = at(S, 3, 0.6);
  line(mx, my, mx + mw * eo(kill), my + mh * eo(kill), C.white, kill, 3);
  line(mx + mw, my, mx + mw - mw * eo(kill), my + mh * eo(kill), C.white, kill, 3);
  txt('entries = comparisons · map = states that realize them', 470, 588, { size: 16, fam: F.mono, align: 'center', c: C.argued, a: a0 * 0.9 });
  /* the table of agreements */
  const t1 = at(S, 1, 0.7), ab = Q(S, 1, 'A and B', 0.4), bc = Q(S, 1, 'B and C', 0.4), ac = Q(S, 1, 'opposites', 0.4);
  const G = A07.gram(-1), show = (i, j) => (i === j ? t1 : (i + j === 1 ? ab : i + j === 3 ? bc : ac));
  txt('G =', 1000, 430, { size: 40, fam: F.math, w: 700, c: C.white, a: t1 });
  A07.matrix(1100, 300, 160, 70, 3, (i, j) => ({ s: A07.frac(G[i][j]), c: i + j === 2 && i !== j ? C.now : (i === j ? C.white : C.cyan), a: show(i, j) }), t1, 40);
  ['A', 'B', 'C'].forEach((n, i) => { txt(n, 1180 + i * 160, 285, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.dim, a: t1 });
    txt(n, 1620, 345 + i * 70, { size: 22, fam: F.orb, w: 900, align: 'center', c: C.dim, a: t1 }); });
  /* measure A − B + C */
  const t2 = at(S, 2, 0.6), t3 = Q(S, 2, 'three', 0.5), t4 = at(S, 3, 0.5);
  panel(880, 560, 900, 230, t2, C.cyan, 'MEASURE · 量一量');
  txt('|A − B + C|² = 3 − 2 A·B + 2 A·C − 2 B·C', 910, 630, { size: 34, fam: F.math, w: 700, c: C.white, a: t2 });
  txt('= 3 − 1 − 2 − 1', 1135, 690, { size: 38, fam: F.math, w: 700, c: C.white, a: t3 });
  txt('= −1', 1500, 690, { size: 42, fam: F.math, w: 900, c: C.white, a: t4, ab: 1.5 });
  txt('a squared length below zero: no three states fit · 无解', 910, 760, { size: 22, fam: F.mono, w: 700, c: C.white, a: Q(S, 3, 'no three states', 0.5) });
};

SCENES.a07_window = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'computed'], [2, null, 'lean'], [3, null, 'argued']]);
  const u = S.u, L0 = lineAt(S, 0), L1 = lineAt(S, 1);
  /* the slider: −1 → 1 during line 0, then back to −1/2 for line 1 */
  let c;
  if (u < L0.s + 0.3) c = -1;
  else if (u < L0.e) c = -1 + 2 * ease((u - L0.s - 0.3) / Math.max(0.5, L0.e - L0.s - 0.3));
  else c = 1 - 1.5 * ease((u - L0.e) / Math.max(0.4, L1.s + 0.6 - L0.e));
  if (u > L1.s + 0.6) c = -0.5;
  /* the plot of det G against the A–C entry */
  const pa = at(S, 0, 0.6), X = cc => 210 + (cc + 1) * 330, Y = d => 470 - d * 220;
  panel(140, 200, 820, 580, pa, C.cyan, 'det G  as  A·C  slides · 滑动 A·C');
  ctx.save(); ctx.globalAlpha = pa * 0.10; ctx.fillStyle = C.cyan; ctx.fillRect(X(-0.5), 250, X(1) - X(-0.5), 450); ctx.restore();
  txt('window · 窗口', (X(-0.5) + X(1)) / 2, 280, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: pa });
  line(X(-1), Y(0), X(1), Y(0), C.dim, pa, 1.5);
  line(X(-1), 250, X(-1), 700, C.dim, pa * 0.6, 1);
  [-1, -0.5, 0, 0.5, 1].forEach(t => { line(X(t), Y(0) - 6, X(t), Y(0) + 6, C.dim, pa, 1.5); txt(A07.frac(t), X(t) + (t === -0.5 ? 34 : 0), Y(0) + (t === -0.5 ? 40 : 32), { size: 20, fam: F.math, align: 'center', c: C.dim, a: pa }); });
  txt('0', X(-1) - 12, Y(0) + 6, { size: 18, fam: F.math, align: 'right', c: C.dim, a: pa });
  txt('−1', X(-1) - 12, Y(-1) + 6, { size: 18, fam: F.math, align: 'right', c: C.dim, a: pa });
  curve(k => { const cc = -1 + 2 * k; return [X(cc), Y(A07.detFormula(cc))]; }, 120, C.cyan, pa, 3);
  txt('A·C →', X(1) + 6, Y(0) + 62, { size: 20, fam: F.math, align: 'right', c: C.dim, a: pa });
  txt('det G = 1/2 + c/2 − c²', 170, 750, { size: 22, fam: F.math, c: C.white, a: pa * 0.9 });
  const d = A07.detFormula(c);
  dot(X(c), Y(d), 11, 'g', pa);
  txt(`A·C = ${A07.fmt(c)}   det G = ${A07.fmt(d)}`, 935, 750, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.now, a: pa });
  /* the inset: the three states themselves (inside the window) */
  const ia = pa, cin = Math.max(-0.5, c), V = A07.vecs(cin), yaw = -0.5 + 0.08 * u, cx = 1360, cy = 470, s = 200;
  panel(1010, 200, 760, 420, ia, C.cyan, 'THE STATES · 三个态');
  const O = A07.view([0, 0, 0], cx, cy, s, yaw);
  const names = ['A', 'B', 'C'], vs = [V.A, V.B, V.C];
  vs.forEach((p, i) => { const q = A07.view(p, cx, cy, s, yaw); arrow(O[0], O[1], q[0], q[1], i === 2 ? C.now : C.cyan, ia, 3.5);
    txt(names[i], q[0] + 14, q[1] - 10, { size: 28, fam: F.orb, w: 900, c: i === 2 ? C.now : C.white, a: ia }); });
  /* the height of C off the A–B plane: the volume, which vanishes at the window's edges */
  const foot = A07.view([V.C[0], V.C[1], 0], cx, cy, s, yaw), tip = A07.view(V.C, cx, cy, s, yaw);
  ctx.save(); ctx.setLineDash([6, 6]); line(foot[0], foot[1], tip[0], tip[1], C.vio, ia * 0.9, 2.5); ctx.restore();
  txt(`height² = (4/3) det G = ${A07.fmt(V.z2)}`, 1040, 600, { size: 20, fam: F.mono, w: 700, c: C.vio, a: ia });
  if (c < -0.5 - 1e-9) txt('outside the window: no C exists · 窗外：没有这样的 C', 1390, 260, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ia });
  /* at −1/2: flat, and B = A + C */
  const fl = Q(S, 1, 'B is exactly', 0.6);
  if (fl > 0) {
    const pA = A07.view(V.A, cx, cy, s, yaw), pC = A07.view(V.C, cx, cy, s, yaw), pB = A07.view(V.B, cx, cy, s, yaw);
    ctx.save(); ctx.setLineDash([8, 7]); line(pA[0], pA[1], pB[0], pB[1], C.now, fl, 2); line(pC[0], pC[1], pB[0], pB[1], C.now, fl, 2); ctx.restore();
    txt('B = A + C', 1550, 300, { size: 34, fam: F.math, w: 900, c: C.now, a: fl });
  }
  /* the general rule */
  const la = at(S, 2, 0.6), cite = leanCite(A07.GID.gram);
  panel(1010, 640, 760, 150, la, C.lean, 'GENERAL RULE · 一般规律');
  txt('0 ≤ Q  ⇔  ∃ O : Q = O†O,  ∀ x y, ⟨Qx, y⟩ = ⟨Ox, Oy⟩', 1035, 712, { size: 25, fam: F.math, w: 700, c: C.white, a: la });
  A07.tag(1035, 758, 'lean', 'LEAN ✓ ' + A07.GID.gram, la, 14);
  /* the reading */
  const ra = at(S, 3, 0.6);
  txt('Causes do not push; they fit. · 因果不是推，是嵌合。', 150, 830, { size: 28, fam: F.disp, w: 700, c: C.argued, a: ra });
};

SCENES.a07_field = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, null, 'lean'], [4, null, 'open']]);
  /* check vs find */
  const a0 = at(S, 0, 0.6);
  chip(330, 230, 300, 50, 'CHECK · 验 : fast', C.cyan, a0, 20);
  chip(700, 230, 300, 50, 'FIND · 找 : ?', C.white, Q(S, 0, 'Coloring one', 0.5), 20);
  /* the ring */
  const cx = 520, cy = 530, R = 210, ra = at(S, 1, 0.6);
  const P = Array.from({ length: A07.RING }, (_, i) => [cx + R * Math.cos(-Math.PI / 2 + i * TAU / A07.RING), cy + R * Math.sin(-Math.PI / 2 + i * TAU / A07.RING)]);
  const col = [null, C.blue, C.cyan, C.white], fillA = Q(S, 1, 'Three colors', 0.5), arr = Q(S, 2, 'Point each edge', 0.8), ch = Q(S, 2, 'every arrow chain', 0.6);
  const onChain = (i, j) => { const k = A07.CHAIN.indexOf(i); return k >= 0 && A07.CHAIN[k + 1] === j; };
  A07.ARCS.forEach(([i, j]) => {
    const [x1, y1] = P[i], [x2, y2] = P[j], L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    line(x1, y1, x2, y2, C.dim, ra * (1 - arr * 0.6), 2);
    if (arr > 0) arrow(x1 + ux * 36, y1 + uy * 36, x1 + ux * (36 + (L - 76) * eo(arr)), y1 + uy * (36 + (L - 76) * eo(arr)), onChain(i, j) && ch > 0 ? C.now : C.cyan, arr, onChain(i, j) && ch > 0 ? 4 : 2.5);
  });
  P.forEach((p, i) => {
    const k = A07.COLOR[i], on = A07.CHAIN.includes(i) && ch > 0;
    ring(p[0], p[1], 30, on ? C.now : C.dim, ra, on ? 3 : 1.5);
    ctx.save(); ctx.globalAlpha = ra * fillA * 0.85; ctx.fillStyle = col[k]; ctx.beginPath(); ctx.arc(p[0], p[1], 24, 0, TAU); ctx.fill(); ctx.restore();
    txt(String(k), p[0], p[1] + 11, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.bg, a: ra * fillA });
    const ox = (p[0] - cx) / R, oy = (p[1] - cy) / R;
    txt('v' + i, p[0] + ox * 62, p[1] + oy * 62 + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: on ? C.now : C.dim, a: ra });
  });
  txt('neighbors differ · 相邻不同色', cx, 800, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
  /* field and line, side by side */
  const fa = fillA, la = ch;
  panel(900, 300, 420, 190, fa, C.cyan, 'FIELD · 场');
  A07.tag(900, 276, 'argued', "FIELD AND LINE: THE BOOK'S READING · 场与线：本书的读法", fa, 14);
  txt('a color at every point,', 925, 380, { size: 24, fam: F.disp, w: 700, c: C.white, a: fa });
  txt('set all at once', 925, 415, { size: 24, fam: F.disp, w: 700, c: C.white, a: fa });
  txt('1 2 1 2 3', 925, 462, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: fa, ls: 4 });
  panel(1360, 300, 420, 190, la, C.now, 'LINE · 线');
  txt('a chain you can follow,', 1385, 380, { size: 24, fam: F.disp, w: 700, c: C.white, a: la });
  txt(`at most ${A07.CHAIN.length} points`, 1385, 415, { size: 24, fam: F.disp, w: 700, c: C.white, a: la });
  txt(A07.CHAIN.map(i => 'v' + i).join(' → '), 1385, 462, { size: 26, fam: F.mono, w: 700, c: C.now, a: la });
  /* the theorem */
  const ta = at(S, 3, 0.6), cite = leanCite(A07.GID.roy);
  panel(900, 520, 880, 140, ta, C.lean, 'FIELD ⇔ LINE · 场 ⇔ 线');
  txt('k colors  ⇔  some orientation keeps every directed path ≤ k points', 925, 590, { size: 21, fam: F.math, w: 700, c: C.white, a: ta });
  A07.tag(925, 634, 'lean', 'LEAN ✓ ' + A07.GID.roy, ta, 13);
  /* the open question */
  const oa = at(S, 4, 0.6);
  panel(900, 690, 880, 110, oa, C.open, 'OPEN · 未解决');
  txt('P vs NP : is finding ever as easy as checking?', 925, 760, { size: 28, fam: F.disp, w: 700, c: C.open, a: oa });
};

SCENES.a07_fair = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, null, 'lean']]);
  /* five ledgers */
  const a0 = at(S, 0, 0.6), cur = Q(S, 1, 'copy ledger', 0.5);
  const books = [['SEAT', '席位'], ['BUDGET', '预算'], ['COPIES', '复印'], ['SHORTCUTS', '捷径'], ['STARLIGHT', '星光']];
  books.forEach(([en, zh], i) => {
    const x = 170 + i * 324, on = i === 2, k = a0 * clamp((S.u - lineAt(S, 0).s - i * 0.18) / 0.5);
    const c = on && cur > 0 ? C.now : C.argued;
    panel(x, 200, 290, 110, k * (on ? 1 : 1 - 0.5 * cur), c, `LEDGER ${i + 1}`);
    txt(en, x + 145, 268, { size: 26, fam: F.orb, w: 900, align: 'center', c: on && cur > 0 ? C.now : C.white, a: k * (on ? 1 : 1 - 0.5 * cur) });
    txt(zh, x + 145, 300, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: k * (on ? 1 : 1 - 0.5 * cur) });
  });
  A07.tag(170, 345, 'argued', "THE BOOK'S READING · 本书的诠释", a0);
  /* the copier */
  const m = at(S, 1, 0.6), sq = Q(S, 1, 'squares each entry', 0.5);
  const yA = 450, yB = 560;
  txt('φ ⊗ blank', 300, yA, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: m });
  txt('ψ ⊗ blank', 300, yB, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: m });
  txt('entry  ⟨φ,ψ⟩ = c', 300, 640, { size: 22, fam: F.math, w: 700, align: 'center', c: C.cyan, a: m });
  arrow(460, 505, 640, 505, C.cyan, m, 3);
  box(650, 430, 260, 150, C.cyan, m, 2, 'rgba(0,0,0,0.5)');
  txt('U', 780, 512, { size: 54, fam: F.orb, w: 900, align: 'center', c: C.cyan, a: m });
  txt('reversible · 可逆', 780, 560, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: m });
  arrow(920, 505, 1100, 505, C.cyan, m, 3);
  txt('φ ⊗ φ', 1230, yA, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: m });
  txt('ψ ⊗ ψ', 1230, yB, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: m });
  txt('entry  ⟨φ⊗φ, ψ⊗ψ⟩ = c²', 1195, 640, { size: 22, fam: F.math, w: 700, align: 'center', c: C.mag, a: sq });
  txt('leaves every entry alone · 每格不动', 780, 410, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: Q(S, 1, 'leave every entry', 0.5) });
  /* one table entry, before and after the copier */
  const na = at(S, 2, 0.5), nb = Q(S, 2, 'one quarter after', 0.5), nc = Q(S, 2, 'cannot stand', 0.5);
  panel(150, 670, 820, 150, na, C.cyan, 'ONE ENTRY OF THE TABLE · 表里的同一格');
  txt('before U :  ⟨φ,ψ⟩ = 1/2', 180, 735, { size: 30, fam: F.math, w: 700, c: C.cyan, a: na });
  txt('after U :  (1/2)² = 1/4', 180, 785, { size: 30, fam: F.math, w: 700, c: C.mag, a: nb });
  txt('1/2 ≠ 1/4', 760, 760, { size: 34, fam: F.math, w: 900, c: C.white, a: nc });
  txt('the table cannot stand · 表站不住', 860, 800, { size: 16, fam: F.mono, w: 700, align: 'right', c: C.white, a: nc });
  /* the theorem, with its premise */
  const ta = at(S, 3, 0.6);
  panel(1010, 670, 770, 150, ta, C.lean, 'NO COPIES · 不可克隆');
  txt('one reversible U clones both unit states φ, ψ  ⇒', 1035, 728, { size: 22, fam: F.math, w: 700, c: C.white, a: ta });
  txt('⟨φ,ψ⟩ = ⟨φ,ψ⟩²  ∧  (φ = ψ ∨ ⟨φ,ψ⟩ = 0)', 1035, 770, { size: 26, fam: F.math, w: 700, c: C.white, a: ta });
  A07.tag(1035, 801, 'lean', 'LEAN ✓ ' + A07.GID.clone, ta, 11);
  const gx = 1460, gy = 615, gs = 190, ga = ta;
  panel(1405, 360, 375, 290, ga, C.cyan, 'c  vs  c²');
  line(gx, gy - 10, gx + gs, gy - 10, C.dim, ga, 1.2); line(gx, gy - 10, gx, gy - 10 - gs, C.dim, ga, 1.2);
  curve(k => [gx + gs * k, gy - 10 - gs * k], 2, C.cyan, ga, 2.5);
  curve(k => [gx + gs * k, gy - 10 - gs * k * k], 60, C.mag, ga, 2.5);
  dot(gx, gy - 10, 8, 'g', ga); dot(gx + gs, gy - 10 - gs, 8, 'g', ga);
  txt('0', gx - 12, gy - 4, { size: 18, fam: F.math, align: 'right', c: C.now, a: ga });
  txt('1', gx + gs + 16, gy - 10 - gs + 6, { size: 18, fam: F.math, c: C.now, a: ga });
  txt('meet only at 0 and 1', gx + gs / 2, gy + 20, { size: 16, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ga });
};

SCENES.a07_axiom = S => {
  SPINE.rail(S, 7, 1);
  badgeQ(S, [[0, null, 'argued'], [2, null, 'lean'], [3, null, 'argued']]);
  const u = S.u;
  /* the stone and what this part stood on it */
  const a0 = at(S, 0, 0.7), gone = at(S, 1, 0.8);
  const sa = a0 * (1 - gone);
  [['TABLE · 表', 'G ≥ 0'], ['FIELD · LINE · 场与线', 'colors ⇔ chains'], ['LEDGERS · 账', 'c = c²']].forEach(([s, f], i) => {
    const x = 495 + i * 330, k = sa * clamp((u - lineAt(S, 0).s - 0.4 - i * 0.25) / 0.5);
    box(x, 300, 270, 220, C.cyan, k, 1.6, 'rgba(4,10,24,0.6)');
    txt(f, x + 135, 420, { size: 28, fam: F.math, w: 700, align: 'center', c: C.cyan, a: k });
    txt(s, x + 135, 495, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.white, a: k });
  });
  panel(440, 540, 1040, 100, sa, C.argued, 'THE STONE AT THE BOTTOM · 基石');
  txt('A₀ : all is pairwise comparison — no third point', 960, 600, { size: 32, fam: F.disp, w: 700, align: 'center', c: C.white, a: sa });
  txt('一切都是两两比较，不借第三点', 960, 680, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.argued, a: sa });
  /* two worlds, one turn apart, both turning */
  const wa = gone, spin = at(S, 3, 1) * (u - lineAt(S, 3).s) * 0.5;
  const worlds = [[420, 400, 0], [1500, 400, A07.TURN]];
  worlds.forEach(([x, y, t0], w) => {
    ring(x, y, 150, C.dim, wa * 0.6, 1.2);
    txt(w ? 'WORLD 2 · 世界二' : 'WORLD 1 · 世界一', x, 210, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: wa });
    A07.fam(t0 + Math.max(0, spin)).forEach((p, i) => {
      arrow(x, y, x + 140 * p[0], y - 140 * p[1], C.cyan, wa, 3);
      txt(['A', 'B', 'C'][i], x + 168 * p[0], y - 168 * p[1] + 10, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: wa });
    });
  });
  const T = A07.table(A07.fam(0));
  txt('same table · 同一张表', 960, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: wa });
  A07.matrix(760, 300, 135, 60, 3, (i, j) => ({ s: A07.fmt(T[i][j]), c: i === j ? C.white : C.cyan }), wa, 28);
  /* one unitary between them */
  const ua = Q(S, 2, 'one unitary', 0.6);
  arrow(620, 560, 1300, 560, C.now, ua, 3);
  txt('U', 960, 548, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.now, a: ua });
  const ta = at(S, 2, 0.6) * (1 - at(S, 4, 0.6)), cite = leanCite(A07.GID.unit);
  panel(620, 580, 680, 72, ta, C.lean, null);
  txt('BᴴB = AᴴA  ⇒  B = U·A, U unitary', 645, 627, { size: 28, fam: F.math, w: 700, c: C.white, a: ta });
  A07.tag(1180, 616, 'lean', 'LEAN ✓', ta);
  txt('LEAN ✓ ' + A07.GID.unit, 960, 680, { size: 17, fam: F.mono, w: 700, align: 'center', c: C.lean, a: ta });
  /* the invisible turn */
  const ia = at(S, 3, 0.6);
  txt('one rigid move of everything · 整体一次刚性移动', 420, 600, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: ia * (1 - at(S, 4, 0.4) * 0.3) });
  txt('invisible from inside · 身在其中看不见', 1500, 600, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.argued, a: ia * (1 - at(S, 4, 0.4) * 0.3) });
  SPINE.ask(S, 4, 'If comparing is all there is, what is the smallest thing it can see?', '如果只剩比较，它能看见的最小单位是什么？');
};

/* ---- a08 · Down to the smallest arc · 造微与归弧 ---- */
/* Act a08 of the long film "No Third Point" · Part VIII (chapters 29–33) · 造微与归弧 / Down to the smallest arc.

   What each scene shows, and where it rests:
     a08_title    the cell: centre O and three unit directions A, B, C closed into three flat walls and a curved cap
                  (ch. 29); the orange-corner analogy (argued).
     a08_cell     A = (0, 0, 1), B = (s, 0, s), C = (1/2, s, 1/2) with s = √2/2: two 45° steps with a square turn at B,
                  or one 60° step A → C. Pairwise overlaps A·B = B·C = s ≈ 0.707, A·C = 1/2 = s² (spherical
                  Pythagoras, computed); det[A B C] = 1/2. The trace of the three qubit projectors is
                  (1 + A·B + B·C + C·A)/4 + i det/4 ..... C129QubitBargmann.triple_bargmann_bloch (LEAN, any real
                  vectors); here 0.729 + 0.125 i (computed). The overlaps fix |det| (Gram determinant) but not its sign.
     a08_sagitta  turning by θ: sideways sin θ, drop 1 − cos θ (the sagitta). N equal turns θ_N = σ (T/N)^α,
                  accumulated drop N (1 − cos θ_N); with σ = T = 1: N = 100, α = 1/2 gives 0.4996 (computed);
                  limits 0 (α > 1/2), σ² T / 2 (α = 1/2), +∞ (σ ≠ 0, 0 < α < 1/2) ..... AccumulatedSagittaPhases.
                  accumulated_sagitta_phases (LEAN).
     a08_primes   Σ n^(−s) = Π_p (1 − p^(−s))^(−1) for Re s > 1 ..... ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product
                  (LEAN); at s = 2 the primes 2, 3 alone give 4/3 · 9/8 = 3/2 (computed); p^(−it) turns at speed
                  ln p (computed). RH: external Lean proof, independently replayed, not frozen in this book's
                  repository (PROJECT.md §14: neither green nor red).
     a08_ternion  a = (1, 2, 2), b = (0, 3, 4): a × b = (2, −4, 3), |a × b|² = 29, a·b = 14, 196 + 29 = 225 = 15²
                  (computed) ..... LagrangeGramIdentity.lagrange_gram_identity (LEAN); as quaternions
                  a b = (−14; 2, −4, 3), |a b| = 15 (computed; Hamilton's product is literature).
     a08_forces   gauge forces as the turn a loop leaves inside one cell, gravity as a shared comparison rhythm that
                  runs slower where cells are crowded: the book's model (argued, ch. 33); Einstein's constant and the
                  three generations: open.
     a08_ask      recap, and the question handed to Part IX.

   On load, FILM.init re-derives every number on screen by an independent route and checks the citations. */

const A08 = (() => {
  const LEAN = {
    bargmann: 'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
    sagitta: 'D5/S3/Analytic/Asymptotics/AccumulatedSagittaPhases.accumulated_sagitta_phases',
    euler: 'D5/S3/Zeros/ZetaUpgrade.riemann_zeta_dirichlet_sum_eq_euler_product',
    lagrange: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity'
  };
  const SHORT = {
    bargmann: 'triple_bargmann_bloch', sagitta: 'accumulated_sagitta_phases',
    euler: 'riemann_zeta_dirichlet_sum_eq_euler_product', lagrange: 'lagrange_gram_identity'
  };

  /* ---------- vectors ---------- */
  const dot3 = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const cross3 = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const norm3 = u => Math.sqrt(dot3(u, u));
  const unit3 = u => { const n = norm3(u); return u.map(x => x / n); };
  const s = Math.SQRT1_2;
  /* the cell: two 45° steps A → B → C with a square turn at B */
  const A = [0, 0, 1], B = [s, 0, s];
  const C3 = [s * B[0] + s * 0, s * B[1] + s * 1, s * B[2] + s * 0];     // cos45 · B + sin45 · ŷ  (ŷ ⊥ A, B)
  const O = [0, 0, 0];
  const AB = dot3(A, B), BC = dot3(B, C3), CA = dot3(C3, A);
  const DET = dot3(A, cross3(B, C3));
  const TR_RE = (1 + AB + BC + CA) / 4, TR_IM = DET / 4;
  function slerp(u, v, t) {
    const w = Math.acos(clamp(dot3(u, v), -1, 1)), sw = Math.sin(w);
    if (sw < 1e-9) return u.slice();
    const a = Math.sin((1 - t) * w) / sw, b = Math.sin(t * w) / sw;
    return [a * u[0] + b * v[0], a * u[1] + b * v[1], a * u[2] + b * v[2]];
  }
  const arcPts = (u, v, n = 28) => { const r = []; for (let i = 0; i <= n; i++) r.push(slerp(u, v, i / n)); return r; };

  /* ---------- sagitta ledger ---------- */
  const sag = th => 2 * Math.pow(Math.sin(th / 2), 2);               // 1 − cos θ without cancellation
  const ledger = (N, al) => N * sag(Math.pow(1 / N, al));           // σ = T = 1
  const SAG100 = ledger(100, 0.5);                                    // 0.4995835…

  /* ---------- primes ---------- */
  const EULER2 = (4 / 3) * (9 / 8);                                   // primes 2 and 3 at s = 2

  /* ---------- ternions ---------- */
  const TA = [1, 2, 2], TB = [0, 3, 4];
  const TCR = cross3(TA, TB), TDOT = dot3(TA, TB);
  const qmul = (p, q) => {
    const v = p.slice(1), w = q.slice(1), c = cross3(v, w);
    return [p[0] * q[0] - dot3(v, w), p[0] * w[0] + q[0] * v[0] + c[0], p[0] * w[1] + q[0] * v[1] + c[1], p[0] * w[2] + q[0] * v[2] + c[2]];
  };
  const TQ = qmul([0, ...TA], [0, ...TB]);

  /* ---------- drawing helpers ---------- */
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const fmt = (x, d) => (x < 0 ? '−' : '') + Math.abs(x).toFixed(d);
  function view(cx, cy, R, yaw, pitch) {
    return v => {
      const p = rotX(rotZ(v, yaw), pitch);
      return { x: cx + R * p[0], y: cy - R * p[2], d: p[1] };
    };
  }
  function polyFill(pts, col, a) {
    if (a <= 0.003 || pts.length < 3) return;
    ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
  }
  function polyLine(pts, col, a, lw = 2.5, closed = false) {
    if (a <= 0.003 || pts.length < 2) return;
    ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    if (closed) ctx.closePath();
    ctx.stroke(); ctx.globalAlpha = 1;
  }
  /* the cell O, A, B, C in one view; o: { walls, cap, two, one, tet, labels, bead } alphas, bead = [route, t] */
  function cell(P, a, o = {}) {
    if (a <= 0.003) return;
    const oP = P(O), aP = P(A), bP = P(B), cP = P(C3);
    const ab = arcPts(A, B).map(P), bc = arcPts(B, C3).map(P), ca = arcPts(C3, A).map(P), ac = arcPts(A, C3).map(P);
    const wal = (o.walls == null ? 1 : o.walls) * a;
    polyFill([oP, ...ab], C.cyan, wal * 0.10);
    polyFill([oP, ...bc], C.cyan, wal * 0.14);
    polyFill([oP, ...ca], C.cyan, wal * 0.07);
    [aP, bP, cP].forEach(q => line(oP.x, oP.y, q.x, q.y, C.cyan, wal * 0.55, 1.6));
    const cap = (o.cap == null ? 1 : o.cap) * a;
    polyFill([...ab, ...bc.slice(1), ...ca.slice(1)], C.mag, cap * 0.22);
    if (o.tet) {
      const ta = o.tet * a;
      polyFill([aP, bP, cP], C.vio, ta * 0.28);
      polyLine([aP, bP, cP], C.vio, ta * 0.9, 1.6, true);
      [aP, bP, cP].forEach(q => dashed(oP.x, oP.y, q.x, q.y, C.vio, ta * 0.7, 1.4));
    }
    const two = (o.two == null ? 1 : o.two) * a, one = (o.one == null ? 1 : o.one) * a;
    polyLine(ab, C.cyan, two, 4); polyLine(bc, C.cyan, two, 4);
    polyLine(ac, C.mag, one * 0.95, 3);
    if (o.bead) {
      const [route, t] = o.bead;
      let v;
      if (route === 2) v = t < 0.5 ? slerp(A, B, t * 2) : slerp(B, C3, (t - 0.5) * 2);
      else v = slerp(A, C3, t);
      const q = P(v);
      ring(q.x, q.y, 15, C.now, a, 2); dot(q.x, q.y, 10, 'g', a);
    }
    dot(oP.x, oP.y, 7, 'w', a);
    [aP, bP, cP].forEach(q => dot(q.x, q.y, 8, 'w', a));
    const la = (o.labels == null ? 1 : o.labels) * a;
    /* each label pushed away from the middle of the four points */
    const mx = (oP.x + aP.x + bP.x + cP.x) / 4, my = (oP.y + aP.y + bP.y + cP.y) / 4;
    [['O', oP], ['A', aP], ['B', bP], ['C', cP]].forEach(([n, q]) => {
      const dx = q.x - mx, dy = q.y - my, d = Math.hypot(dx, dy) || 1;
      txt(n, q.x + 38 * dx / d, q.y + 38 * dy / d + 11, { size: 30, fam: F.math, w: 700, align: 'center', c: C.white, a: la });
    });
  }
  /* a small coloured tag: what kind of statement this is */
  function tag(x, y, en, zh, col, a, size = 18) {
    if (a <= 0.003) return;
    const t = `${en} · `;
    txt(t, x, y, { size, fam: F.mono, w: 700, c: col, a, ls: 1 });
    txt(zh, x + tw(t, size, F.mono, 700, 1), y + 1, { size: size + 1, fam: F.zh, w: 700, c: col, a });
  }
  /* the LEAN ✓ chip of one cited theorem, looked up by its whole GID */
  const MISSING = new Set();
  function lean(x, y, key, a, size = 20) {
    if (a <= 0.003) return;
    const gid = LEAN[key], r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!MISSING.has(gid)) { MISSING.add(gid); window.FILM_ERRORS.push(`a08: film.json does not cite the theorem ${gid}`); }
      return;
    }
    const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* rich text: [[string, colour, font?], …] */
  function rich(parts, x, y, o = {}) {
    const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((t, p) => t + tw(p[0], size, p[2] || fam, w), 0) / 2;
    for (const [str, col, fm] of parts) { txt(str, cx, y, { size, fam: fm || fam, w, c: col, a }); cx += tw(str, size, fm || fam, w); }
    return cx;
  }
  /* a row of slot cells */
  function slots(x, y, cw, ch, cells, a) {
    if (a <= 0.003) return;
    cells.forEach((c, i) => {
      const ca = a * (c.a == null ? 1 : c.a);
      if (ca <= 0.003) return;
      const cx = x + i * (cw + 12);
      fillBox(cx, y, cw, ch, c.col, ca * 0.16);
      box(cx, y, cw, ch, c.col, ca, 2);
      if (c.v != null) txt(c.v, cx + cw / 2, y + ch / 2 + 14, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: ca });
    });
  }
  /* a clock face with one hand */
  function clock(x, y, r, ang, col, a, label) {
    if (a <= 0.003) return;
    ring(x, y, r, col, a * 0.8, 2);
    for (let k = 0; k < 12; k++) {
      const t = k * TAU / 12;
      line(x + Math.cos(t) * r * 0.84, y + Math.sin(t) * r * 0.84, x + Math.cos(t) * r * 0.96, y + Math.sin(t) * r * 0.96, col, a * 0.5, 1.4);
    }
    const hx = x + Math.cos(ang - Math.PI / 2) * r * 0.78, hy = y + Math.sin(ang - Math.PI / 2) * r * 0.78;
    line(x, y, hx, hy, C.now, a, 3.5); dot(hx, hy, 6, 'g', a);
    dot(x, y, 4, 'w', a);
    if (label) txt(label, x, y + r + 34, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a });
  }

  return { LEAN, SHORT, A, B, C3, O, AB, BC, CA, DET, TR_RE, TR_IM, dot3, cross3, norm3, unit3, slerp, arcPts,
    sag, ledger, SAG100, EULER2, TA, TB, TCR, TDOT, TQ, qmul,
    fade, fmt, view, polyFill, polyLine, cell, tag, lean, rich, slots, clock };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 16) E.push('no-third-point-a08: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit (other acts may add theirs when the acts are joined) */
  for (const [k, gid] of Object.entries(A08.LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === A08.SHORT[k], `${gid} resolves to ${r.short}`);
  }

  /* 1. the cell, by an independent route: angles and spherical Pythagoras, then 2×2 Pauli matrices */
  const deg = x => Math.acos(x) * 180 / Math.PI;
  check(near(deg(A08.AB), 45, 1e-9) && near(deg(A08.BC), 45, 1e-9) && near(deg(A08.CA), 60, 1e-9), 'steps 45°, 45°, direct 60°');
  const tA = A08.cross3(A08.A, A08.B), tC = A08.cross3(A08.C3, A08.B);           // the two great-circle planes at B
  check(near(A08.dot3(tA, tC), 0, 1e-12), 'the turn at B is square');
  check(near(A08.CA, A08.AB * A08.BC, 1e-12), 'cos c = cos a cos b');
  check(A08.AB.toFixed(3) === '0.707' && A08.CA.toFixed(4) === '0.5000', '0.707 and 1/2');
  check(near(A08.DET, 0.5, 1e-12), 'det[A B C] = 1/2');
  const gram = 1 + 2 * A08.AB * A08.BC * A08.CA - A08.AB ** 2 - A08.BC ** 2 - A08.CA ** 2;
  check(near(gram, A08.DET ** 2, 1e-12), 'Gram determinant = det² (overlaps fix |volume|)');
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cad = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const proj = r => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
  const mm = (X, Y) => [0, 1].map(i => [0, 1].map(j => cad(cm(X[i][0], Y[0][j]), cm(X[i][1], Y[1][j]))));
  const M = mm(mm(proj(A08.A), proj(A08.B)), proj(A08.C3));
  const tr = cad(M[0][0], M[1][1]);
  check(near(tr[0], A08.TR_RE, 1e-12) && near(tr[1], A08.TR_IM, 1e-12), 'trace by matrices = Bloch formula');
  check(near(A08.TR_RE, (1.5 + Math.SQRT2) / 4, 1e-12), 'Re trace = (3/2 + √2)/4');
  check(A08.TR_RE.toFixed(3) === '0.729' && A08.TR_IM.toFixed(3) === '0.125', '0.729 + 0.125 i');
  const Mr = mm(mm(proj(A08.A), proj(A08.C3)), proj(A08.B));                        // the mirror order flips the volume
  check(near(Mr[0][0][1] + Mr[1][1][1], -A08.TR_IM, 1e-12), 'reversed order flips the imaginary part');

  /* 2. the sagitta ledger, by the cosine directly and by its Taylor series */
  check(near(A08.SAG100, 100 * (1 - Math.cos(0.1)), 1e-12) && A08.SAG100.toFixed(4) === '0.4996', 'N = 100, θ = 0.1: 0.4996');
  const series = th => th * th / 2 - th ** 4 / 24 + th ** 6 / 720 - th ** 8 / 40320 + th ** 10 / 3628800 - th ** 12 / 479001600;
  for (const N of [10, 100, 1e3, 1e4, 1e6]) for (const al of [1, 0.5, 0.25]) {
    const th = Math.pow(N, -al);
    check(near(A08.ledger(N, al), N * series(th), 1e-9 * Math.max(1, N * th * th)), `ledger N=${N} α=${al}`);
    check(A08.ledger(N, al) <= N * th * th / 2 + 1e-15 && A08.ledger(N, al) >= N * (th * th / 2 - th ** 4 / 24) - 1e-15, `bounds N=${N} α=${al}`);
  }
  check(A08.ledger(1e4, 1) < 1e-4 && near(A08.ledger(1e6, 0.5), 0.5, 1e-6) && A08.ledger(1e4, 0.25) > 49, 'three fates');

  /* 3. primes: s = 2, the factors of 2 and 3 against the finite sum over 2^a 3^b */
  check(near(A08.EULER2, 1.5, 1e-15), '4/3 · 9/8 = 3/2');
  let sum = 0; for (let a = 0; a < 60; a++) for (let b = 0; b < 40; b++) sum += Math.pow(4, -a) * Math.pow(9, -b);
  check(near(sum, 1.5, 1e-12), 'Σ over 2^a 3^b of 1/n² = 3/2');
  check(Math.log(2).toFixed(3) === '0.693' && Math.log(3).toFixed(3) === '1.099' && Math.log(5).toFixed(3) === '1.609', 'ln 2, ln 3, ln 5');

  /* 4. ternions: minors, receipt, quaternion product by 2×2 complex matrices */
  check(A08.TCR.join() === '2,-4,3' && A08.TDOT === 14, 'a × b = (2, −4, 3), a·b = 14');
  check(A08.dot3(A08.TCR, A08.TCR) === 29 && 196 + 29 === 225 && 15 * 15 === 225, '196 + 29 = 225');
  let half = 0;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) half += (A08.TA[i] * A08.TB[j] - A08.TA[j] * A08.TB[i]) ** 2;
  check(half / 2 === 29 && A08.dot3(A08.TA, A08.TA) * A08.dot3(A08.TB, A08.TB) - 14 * 14 === 29, 'Lagrange identity on (a, b)');
  check(A08.TQ.join() === '-14,2,-4,3' && A08.TQ.reduce((t, x) => t + x * x, 0) === 225, 'a b = (−14; 2, −4, 3), |a b| = 15');
  const qm = q => [[[q[0], -q[3]], [-q[2], -q[1]]], [[q[2], -q[1]], [q[0], q[3]]]];
  const L = mm(qm([0, ...A08.TA]), qm([0, ...A08.TB])), R = qm(A08.TQ);
  let ok = true; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let c = 0; c < 2; c++) ok = ok && near(L[i][j][c], R[i][j][c]);
  check(ok, 'quaternion product matches 2×2 matrices');
});

/* ======================================================================= */
/*                          scene 1 · THE SMALLEST CELL                     */
/* ======================================================================= */
SCENES.a08_title = S => {
  const u = S.u, L0 = lineAt(S, 0);
  SPINE.title(S, 8, '造微与归弧', 'Down to the smallest arc');
  SPINE.rail(S, 8, clamp((u - L0.s + 0.2) / 0.6) * clamp((S.d - u) / 0.5));
  const a = clamp((u - L0.s + 0.1) / 0.8) * clamp((S.d - u) / 0.5);
  if (a <= 0.003) return;
  /* the question from Part VII, made concrete */
  const qa = a * (1 - Q(S, 0, 'one small cell', 0.6));
  A08.rich([['finest grain of comparison  →  ', C.white, F.disp], ['a dot ?', C.dim, F.disp]], W / 2, 260, { size: 40, align: 'center', a: qa });
  /* the cell grows */
  const g = Q(S, 0, 'one small cell', 1.4);
  const P = A08.view(900, 750, 480, 2.72 + 0.02 * u, 0.8);
  A08.cell(P, a * g, { walls: g, cap: Q(S, 0, 'one small cell', 1.0, 1.0), labels: g, two: 0.8, one: 0.0 });
  const la = a * Q(S, 0, 'one small cell', 0.8, 1.4);
  A08.tag(250, 260, 'CELL', '小胞：三面平墙 + 一片弯顶', C.cyan, la, 20);
  txt('O · A · B · C', 250, 300, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
  /* analogy: an orange corner */
  const oa = a * at(S, 1, 0.8);
  if (oa > 0.003) {
    panel(1170, 230, 620, 520, oa, C.argued, 'ANALOGY · 比方');
    const ox = 1330, oy = 715, r = 265;
    /* peel: a quarter arc; cut faces: two radii, the third face drawn as a ridge to the centre */
    ctx.globalAlpha = oa * 0.18; ctx.fillStyle = C.argued; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.arc(ox, oy, r, -Math.PI / 2, -Math.PI / 14); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    ctx.globalAlpha = oa; ctx.strokeStyle = C.argued; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(ox, oy, r, -Math.PI / 2, -Math.PI / 14); ctx.stroke(); ctx.globalAlpha = 1;
    line(ox, oy, ox, oy - r, C.white, oa * 0.8, 2); line(ox, oy, ox + r * Math.cos(-Math.PI / 14), oy + r * Math.sin(-Math.PI / 14), C.white, oa * 0.8, 2);
    line(ox, oy, ox + r * Math.cos(-0.82), oy + r * Math.sin(-0.82), C.white, oa * 0.5, 1.5);
    dot(ox, oy, 7, 'w', oa);
    const rows = [['peel', '橙皮', 'curved cap', '弯顶'], ['cut faces', '切面', 'flat walls', '平墙'], ['centre', '中心', 'O', '球心']];
    rows.forEach((rw, i) => {
      const y = 300 + i * 46;
      txt(`${rw[0]} → ${rw[2]}`, 1200, y, { size: 22, fam: F.mono, w: 700, c: C.white, a: oa });
      txt(`${rw[1]} → ${rw[3]}`, 1760, y, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.argued, a: oa });
    });
  }
};

/* ======================================================================= */
/*                          scene 2 · ONE STEP OR TWO                       */
/* ======================================================================= */
SCENES.a08_cell = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  const P = A08.view(840, 740, 470, 2.7 + 0.012 * u, 0.8);
  /* the walk: two steps first, then one */
  const w = at(S, 0, 2.0), w1 = Q(S, 0, 'or two', 2.6);
  const bead = u < lineAt(S, 1).s ? (w1 > 0 ? [2, w1] : [1, w]) : null;
  A08.cell(P, a, { walls: 0.6, cap: 0.6, two: Q(S, 0, 'or two', 0.5), one: 1, tet: Q(S, 2, 'the volume hiding', 0.8), bead });
  txt('one step · 一步', 200, 250, { size: 24, fam: F.zh, w: 700, c: C.mag, a: a * at(S, 0, 0.5) });
  txt('two steps · 两步 (45° + 45°, square turn at B)', 200, 284, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: a * Q(S, 0, 'or two', 0.5) });

  /* pairwise overlaps */
  const pa = a * at(S, 1, 0.6);
  panel(1060, 200, 740, 300, pa, C.cyan, 'PAIRWISE ONLY · 只做两两比较');
  const rows = [['A · B', A08.AB, 'A with B'], ['B · C', A08.BC, 'B with C'], ['A · C', A08.CA, 'A with C']];
  rows.forEach(([lab, v, ph], i) => {
    const ra = pa * Q(S, 1, ph, 0.4);
    txt(lab, 1100, 280 + i * 58, { size: 32, fam: F.math, w: 700, c: C.white, a: ra });
    txt('= ' + v.toFixed(3), 1260, 280 + i * 58, { size: 32, fam: F.mono, w: 700, c: i === 2 ? C.mag : C.cyan, a: ra });
  });
  const sq = pa * Q(S, 1, 'squared', 0.6);
  A08.rich([['0.707² = 0.500', C.white, F.mono], ['   cos c = cos a · cos b', C.dim, F.math]], 1100, 466, { size: 26, a: sq });
  A08.tag(1460, 280, 'NUM', '屏幕计算', C.cyan, pa * 0.9, 16);

  /* the Lean ledger */
  const la = a * at(S, 2, 0.6);
  panel(1060, 530, 740, 290, la, C.lean, 'ONE LEDGER · 一本账');
  txt('Tr( P(A) P(B) P(C) ) =', 1090, 600, { size: 28, fam: F.math, w: 700, c: C.white, a: la });
  A08.rich([['(1 + ', C.white], ['A·B + B·C + C·A', C.cyan], [' + i ', C.white], ['det[A B C]', C.vio], [') / 4', C.white]], 1090, 648, { size: 28, a: la });
  A08.lean(1090, 702, 'bargmann', la * Q(S, 2, 'Lean checks', 0.5), 19);
  txt('any real vectors · 任意实向量', 1090, 738, { size: 18, fam: F.zh, w: 700, c: C.lean, a: la * Q(S, 2, 'Lean checks', 0.5) * 0.9 });
  const ha = a * Q(S, 2, 'Here it reads', 0.6);
  A08.rich([['here: ', C.dim, F.mono], [A08.TR_RE.toFixed(3), C.cyan, F.mono], [' + ', C.white, F.mono], [A08.TR_IM.toFixed(3) + ' i', C.vio, F.mono]], 1090, 790, { size: 30, a: ha });
  A08.tag(1520, 790, 'NUM', '屏幕计算', C.cyan, ha * 0.9, 16);
  /* volume: size fixed, handedness not */
  const va = a * Q(S, 2, 'the volume hiding', 0.5);
  txt('det[A B C] = 0.5', 200, 350, { size: 30, fam: F.mono, w: 700, c: C.vio, a: va });
  A08.tag(530, 350, 'NUM', '屏幕计算', C.cyan, va * 0.9, 16);
  txt('重叠只定下 |det|，定不下朝向', 200, 386, { size: 22, fam: F.zh, w: 700, c: C.vio, a: va * 0.9 });
};

/* ======================================================================= */
/*                          scene 3 · TURN, DON'T SUBTRACT                  */
/* ======================================================================= */
SCENES.a08_sagitta = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  /* the aphorism-question */
  const qa = a * (1 - at(S, 1, 0.5));
  txt('a small enough step is straight?', W / 2, 300, { size: 52, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa * at(S, 0, 0.6) });
  txt('步子够小，就是直的？', W / 2, 370, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa * at(S, 0, 0.6, 0.4) * 0.9 });
  /* the old picture: a circle traced by ever more straight chords */
  const pa0 = qa * at(S, 0, 0.6, 0.6);
  if (pa0 > 0.003) {
    ring(W / 2, 630, 170, C.cyan, pa0 * 0.8, 2.5);
    const n = 6 + 2 * Math.floor(10 * clamp((S.u - lineAt(S, 0).s - 0.6) / 2.2));
    const pts = [];
    for (let k = 0; k <= n; k++) pts.push({ x: W / 2 + 170 * Math.cos(k * TAU / n), y: 630 + 170 * Math.sin(k * TAU / n) });
    A08.polyLine(pts, C.white, pa0 * 0.7, 1.6);
    txt(`${n} straight steps · ${n} 段直线`, W / 2, 850, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: pa0 });
  }

  /* the circle: turn the top point by θ */
  const ga = a * at(S, 1, 0.6);
  if (ga > 0.003) {
    const cx = 640, cy = 860, R = 540;
    const th = 0.7 * ease(at(S, 1, 1.6));
    ctx.globalAlpha = ga * 0.6; ctx.strokeStyle = C.dim; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2 - 0.12, -Math.PI / 2 + 0.85); ctx.stroke(); ctx.globalAlpha = 1;
    const px = cx + R * Math.sin(th), py = cy - R * Math.cos(th), ty = cy - R;
    /* the turn itself */
    ctx.globalAlpha = ga; ctx.strokeStyle = C.cyan; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + th); ctx.stroke(); ctx.globalAlpha = 1;
    line(cx, cy, cx, ty, C.dim, ga * 0.5, 1.2); line(cx, cy, px, py, C.dim, ga * 0.5, 1.2);
    txt('θ', cx + 34, cy - 150, { size: 30, fam: F.math, w: 700, c: C.white, a: ga });
    /* sideways sin θ (cyan, along the chord level) and drop 1 − cos θ (magenta) */
    const sa = ga * Q(S, 1, 'slides', 0.5), da = ga * Q(S, 1, 'drops', 0.5);
    line(cx, py, px, py, C.cyan, sa, 4);
    txt('sin θ', (cx + px) / 2, py + 42, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a: sa });
    line(cx - 8, ty, cx - 8, py, C.mag, da, 6);
    txt('1 − cos θ', cx - 28, (ty + py) / 2 + 10, { size: 30, fam: F.math, w: 700, align: 'right', c: C.mag, a: da });
    const sg = ga * Q(S, 1, 'the sagitta', 0.6);
    txt('= sagitta · 矢高', cx - 28, (ty + py) / 2 + 48, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.mag, a: sg });
    dot(cx, ty, 7, 'w', ga * 0.8);
    ring(px, py, 14, C.now, ga, 2); dot(px, py, 9, 'g', ga);
    /* analogy: a bow, its string, and the arrow resting between them */
    const ba = ga * Q(S, 1, 'the arrow inside', 0.7);
    if (ba > 0.003) {
      panel(140, 560, 380, 270, ba, C.argued, 'ANALOGY · 比方');
      const bx = 330, bcy = 880, br = 220, bt = 0.8;
      ctx.globalAlpha = ba; ctx.strokeStyle = C.argued; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(bx, bcy, br, -Math.PI / 2 - bt, -Math.PI / 2 + bt); ctx.stroke(); ctx.globalAlpha = 1;
      const sy = bcy - br * Math.cos(bt), topy = bcy - br;
      line(bx - br * Math.sin(bt), sy, bx + br * Math.sin(bt), sy, C.white, ba * 0.8, 1.5);
      arrow(bx, sy + 30, bx, topy - 8, C.mag, ba, 3);
      txt('bow · 弓背', bx, topy - 22, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ba });
      txt('string · 弓弦', bx + 110, sy + 26, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.white, a: ba });
      txt('arrow = sagitta', bx - 100, sy + 26, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ba });
    }
    const ta = ga * Q(S, 2, 'Old calculus', 0.5);
    txt('old calculus: drop it · 旧微积分：扔掉它', 160, 240, { size: 26, fam: F.zh, w: 700, c: C.dim, a: ta });
  }

  /* the ledger */
  const pa = a * at(S, 2, 0.6);
  panel(1080, 200, 720, 640, pa, C.cyan, 'SAGITTA LEDGER · 矢高账本');
  A08.rich([['Σ(N)', C.mag], [' = N (1 − cos θ(N))', C.white]], 1110, 270, { size: 28, a: pa });
  txt('θ(N) = σ (T/N)^α  ·  here σ = T = 1', 1110, 312, { size: 24, fam: F.math, w: 700, c: C.dim, a: pa });
  const h1 = pa * Q(S, 2, 'A hundred', 0.5);
  A08.rich([['N = 100, θ = 0.1:  ', C.white, F.mono], [A08.SAG100.toFixed(4), C.mag, F.mono]], 1110, 372, { size: 28, a: h1 });
  A08.tag(1560, 372, 'NUM', '计算', C.cyan, h1 * 0.9, 16);
  /* three fates as N grows */
  const ra = pa * at(S, 3, 0.6);
  const grow = at(S, 3, 5.0, 0.4);
  const logN = 2 + 4 * ease(grow), N = Math.round(Math.pow(10, logN));
  txt(`N = ${N.toLocaleString('en-US')}`, 1110, 440, { size: 28, fam: F.mono, w: 700, c: C.now, a: ra });
  const fates = [
    [1, 'α = 1', 'faster · 更快', '→ 0', C.cyan, 'faster than'],
    [0.5, 'α = ½', 'exactly 1/√N · 恰好', '→ σ²T/2 = 0.5', C.lean, null],
    [0.25, 'α = ¼', 'slower · 更慢', '→ ∞', C.mag, 'half of sigma']
  ];
  fates.forEach(([al, lab, note, lim, col, ph], i) => {
    const y = 510 + i * 76, fa = ra * (ph ? Q(S, 3, ph, 0.5) : 1);
    txt(lab, 1110, y, { size: 28, fam: F.math, w: 700, c: C.white, a: fa });
    txt(note, 1110, y + 30, { size: 18, fam: F.zh, w: 700, c: C.dim, a: fa });
    const v = A08.ledger(N, al);
    txt(v < 1e-3 ? v.toExponential(2) : v.toFixed(4), 1440, y, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: fa });
    txt(lim, 1480, y, { size: 26, fam: F.math, w: 700, c: col === C.lean ? C.white : col, a: fa });
  });
  A08.lean(1110, 768, 'sagitta', pa * Q(S, 3, 'Lean checks', 0.5), 19);
  txt('limits: any σ, T > 0 (→ ∞ needs σ ≠ 0) · 对一般 σ、T 成立', 1110, 806, { size: 17, fam: F.zh, w: 700, c: C.lean, a: pa * Q(S, 3, 'Lean checks', 0.5) * 0.9 });
  /* the aphorism */
  const fa = a * Q(S, 2, 'throws that away', 0.6);
  txt('A turn keeps what a difference throws away.', 160, 290, { size: 30, fam: F.disp, w: 700, c: C.white, a: fa });
};

/* ======================================================================= */
/*                          scene 4 · PRIMES AS ARCS                        */
/* ======================================================================= */
SCENES.a08_primes = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  /* the Euler product */
  const ea = a * at(S, 0, 0.6, 0.8);
  panel(140, 200, 920, 300, ea, C.cyan, 'ADD OVER n = MULTIPLY OVER PRIMES · 求和 = 连乘');
  A08.rich([['Σ', C.cyan], [' n⁻ˢ', C.white], ['   =   ', C.white], ['Π', C.mag], [' (1 − p⁻ˢ)⁻¹', C.white]], 180, 290, { size: 40, a: ea });
  txt('n = 2ᵃ · 3ᵇ · 5ᶜ · …   one way only · 唯一分解', 180, 344, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ea });
  const la = ea * Q(S, 1, 'Lean checks', 0.5);
  A08.lean(180, 400, 'euler', la, 18);
  txt('Re s > 1', 180, 440, { size: 22, fam: F.math, w: 700, c: C.lean, a: la });
  const ca = ea * Q(S, 1, 'Lean checks', 0.5, 1.4);
  A08.rich([['s = 2, primes 2 and 3 only:  ', C.dim, F.mono], ['4/3 · 9/8 = 3/2', C.mag, F.mono]], 420, 440, { size: 22, a: ca });
  A08.tag(420, 476, 'NUM', '屏幕计算 · 只取 2、3 两个因子', C.cyan, ca * 0.9, 16);
  /* prime clocks */
  const ka = a * Q(S, 2, 'Add an imaginary part', 0.6);
  const t = 2.2 * Math.max(0, u - phraseAt(S, 2, 'Add an imaginary part'));
  [[2, 1190], [3, 1420], [5, 1650]].forEach(([p, x], i) => {
    const kk = ka * Q(S, 2, 'Add an imaginary part', 0.5, 0.25 * i);
    A08.clock(x - 20, 330, 90, -t * Math.log(p), C.cyan, kk, `p = ${p}`);
    txt(`ln ${p} = ${Math.log(p).toFixed(3)}`, x - 20, 492, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: kk });
  });
  txt('p^(−it) = e^(−it · ln p)', 1400, 218, { size: 26, fam: F.math, w: 700, align: 'center', c: C.white, a: ka });
  A08.tag(1180, 540, 'CLOCK', '比方：每个素数一只钟', C.argued, ka * 0.9, 18);
  /* the critical strip and the line Re s = 1/2 (external fact: neither green nor red) */
  const ra = a * at(S, 3, 0.6);
  if (ra > 0.003) {
    const x0 = 220, x1 = 620, y0 = 580, y1 = 830;
    fillBox(x0, y0, x1 - x0, y1 - y0, C.cyan, ra * 0.06);
    line(x0, y0, x0, y1, C.dim, ra, 1.5); line(x1, y0, x1, y1, C.dim, ra, 1.5);
    txt('Re s = 0', x0, y1 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    txt('1', x1, y1 + 30, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra });
    const xm = (x0 + x1) / 2;
    line(xm, y0 - 10, xm, y1 + 10, C.white, ra, 3);
    txt('½', xm, y1 + 30, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: ra });
    [0.16, 0.36, 0.52, 0.78, 0.92].forEach(k => dot(xm, y1 - k * (y1 - y0), 7, 'w', ra));
    A08.tag(x0, y0 - 14, 'SKETCH', '示意：零点高度不按比例', C.dim, ra * 0.9, 16);
  }
  const xa = a * at(S, 4, 0.6);
  panel(760, 600, 1040, 230, Math.max(ra, xa) * 0.999, C.white, 'RIEMANN HYPOTHESIS · 黎曼猜想');
  txt('every nontrivial zero: Re s = ½', 790, 680, { size: 30, fam: F.math, w: 700, c: C.white, a: ra });
  txt('每个非平凡零点都在实部 ½ 的线上', 790, 720, { size: 24, fam: F.zh, w: 700, c: C.white, a: ra * 0.9 });
  A08.tag(790, 780, 'EXTERNAL LEAN PROOF · REPLAYED', '外部形式化事实', C.white, xa, 18);
  txt('not frozen in this book\'s library · 未在本书库冻结', 790, 812, { size: 18, fam: F.zh, w: 700, c: C.dim, a: xa });
};

/* ======================================================================= */
/*                          scene 5 · THREE WON'T CLOSE                     */
/* ======================================================================= */
SCENES.a08_ternion = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  /* the plane: turns multiply */
  const pa = a * (1 - Q(S, 1, 'cross product', 0.6) * 0.75);
  A08.rich([['plane · 平面:  ', C.dim, F.zh], ['e^(iα) · e^(iβ) = ', C.white], ['e^(i(α+β))', C.cyan], ['   ✓', C.cyan]], 160, 240, { size: 32, a: pa * at(S, 0, 0.6) });
  A08.rich([['space · 空间:  ', C.dim, F.zh], ['(x, y, z) · (x′, y′, z′) = ?', C.white]], 160, 296, { size: 32, a: pa * Q(S, 0, 'In space', 0.6) });
  /* the two arrows and the slots */
  const va = a * Q(S, 0, 'take a', 0.6);
  A08.rich([['a = (1, 2, 2)', C.white, F.mono], ['   |a| = 3', C.dim, F.mono]], 160, 380, { size: 30, a: va });
  A08.rich([['b = (0, 3, 4)', C.white, F.mono], ['   |b| = 5', C.dim, F.mono]], 160, 428, { size: 30, a: va });
  const xa = a * Q(S, 1, 'cross product', 0.6);
  txt('a × b  →  three drawers · 三个抽屉', 160, 500, { size: 22, fam: F.zh, w: 700, c: C.mag, a: xa });
  A08.slots(160, 516, 120, 80, A08.TCR.map(v => ({ v: A08.fmt(v, 0), col: C.mag })), xa);
  txt('|a × b|² = 29', 600, 570, { size: 30, fam: F.mono, w: 700, c: C.mag, a: xa });
  const oa = a * Q(S, 1, 'The missing', 0.6);
  txt('a · b = 14  →  no drawer · 没有抽屉', 160, 652, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: oa });
  txt('the same pairwise overlap as A · B in the cell · 即小胞里 A·B 那种两两重叠', 400, 700, { size: 18, fam: F.zh, w: 700, c: C.cyan, a: oa * 0.9 });
  A08.tag(400, 732, 'LITERATURE', '文献结果：没有三维的保范乘法（Hurwitz 1898），本书未形式化', C.argued, oa * 0.9, 15);
  A08.slots(160, 668, 120, 80, [{ v: '14', col: C.cyan }], oa);
  txt('?', 320, 724, { size: 52, fam: F.orb, w: 900, c: C.cyan, a: oa });
  /* the fourth drawer */
  const fa = a * at(S, 3, 0.6);
  if (fa > 0.003) {
    txt('a b (quaternion · 四元数) = ', 160, 790 - 2, { size: 22, fam: F.zh, w: 700, c: C.white, a: fa });
    A08.slots(500, 744, 110, 76, A08.TQ.map((v, i) => ({ v: A08.fmt(v, 0), col: i ? C.mag : C.cyan })), fa);
    txt('|a b| = 15', 1010, 795, { size: 30, fam: F.mono, w: 700, c: C.white, a: fa * Q(S, 3, 'length fifteen', 0.5) });
  }
  /* the right triangle receipt */
  const ta = a * Q(S, 1, 'cross product', 0.6, 0.3);
  if (ta > 0.003) {
    const k = 30, x0 = 1180, y0 = 740;
    const lx = 14 * k * 0.8, ly = Math.sqrt(29) * k * 0.8 * 2.2;       // drawn to a common scale on each leg is unreadable; legs labelled exactly
    const ox = x0, oy = y0;
    line(ox, oy, ox + lx, oy, C.cyan, ta * Q(S, 1, 'The missing', 0.6), 6);
    line(ox + lx, oy, ox + lx, oy - ly, C.mag, ta, 6);
    line(ox, oy, ox + lx, oy - ly, C.white, ta * at(S, 2, 0.6), 3);
    box(ox + lx - 18, oy - 18, 18, 18, C.dim, ta * 0.6, 1);
    txt('14', ox + lx / 2, oy + 40, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta * Q(S, 1, 'The missing', 0.6) });
    txt('√29', ox + lx + 18, oy - ly / 2, { size: 30, fam: F.mono, w: 700, c: C.mag, a: ta });
    txt('15 = 3 × 5', ox + lx / 2 - 60, oy - ly / 2 - 30, { size: 30, fam: F.mono, w: 700, align: 'right', c: C.white, a: ta * at(S, 2, 0.6) });
    A08.tag(1560, 790, 'SKETCH', '示意，非比例', C.dim, ta * 0.8, 16);
  }
  const ra = a * at(S, 2, 0.6);
  panel(1080, 200, 720, 230, ra, C.lean, 'RECEIPT · 收据');
  A08.rich([['196', C.cyan, F.mono], [' + ', C.white, F.mono], ['29', C.mag, F.mono], [' = 225 = 15²', C.white, F.mono]], 1110, 280, { size: 34, a: ra });
  A08.tag(1560, 280, 'NUM', '计算', C.cyan, ra * 0.9, 16);
  txt('|u|² |v|² = (u·v)² + Σ areas² · 任意两组数', 1110, 330, { size: 21, fam: F.zh, w: 700, c: C.white, a: ra });
  A08.lean(1110, 392, 'lagrange', ra * Q(S, 2, 'Lean checks', 0.5), 20);
};

/* ======================================================================= */
/*                          scene 6 · EVERY FORCE, AN ARC                   */
/* ======================================================================= */
SCENES.a08_forces = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  const ma = a * at(S, 0, 0.6);
  A08.tag(160, 220, 'MODEL', '本书的诠释模型，不是定理', C.argued, ma, 24);
  /* a sheet of small cells: a triangular lattice */
  const ga = a * at(S, 0, 0.8, 0.5);
  const x0 = 180, y0 = 300, e = 92, rows = 5, cols = 9;
  const pt = (i, j) => [x0 + j * e + (i % 2) * e / 2, y0 + i * e * 0.866];
  if (ga > 0.003) {
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
      const p = pt(i, j);
      if (j + 1 < cols) { const q = pt(i, j + 1); line(p[0], p[1], q[0], q[1], C.cyan, ga * 0.35, 1.2); }
      if (i + 1 < rows) {
        /* row i + 1 is shifted by half a cell against row i: each node meets two nodes below it */
        const jl = j - (i % 2 ? 0 : 1), jr = j + (i % 2 ? 1 : 0);
        if (jl >= 0) { const q = pt(i + 1, jl); line(p[0], p[1], q[0], q[1], C.cyan, ga * 0.35, 1.2); }
        if (jr < cols) { const q = pt(i + 1, jr); line(p[0], p[1], q[0], q[1], C.cyan, ga * 0.35, 1.2); }
      }
      dot(p[0], p[1], 3, 'c', ga * 0.6);
    }
  }
  /* inside one cell: a loop that comes back turned */
  const ia = a * Q(S, 0, 'a gauge force is', 0.6);
  if (ia > 0.003) {
    const p1 = pt(1, 2), p2 = pt(1, 3), p3 = pt(2, 2);
    const cx = (p1[0] + p2[0] + p3[0]) / 3, cy = (p1[1] + p2[1] + p3[1]) / 3;
    A08.polyFill([{ x: p1[0], y: p1[1] }, { x: p2[0], y: p2[1] }, { x: p3[0], y: p3[1] }], C.argued, ia * 0.25);
    const run = clamp((u - phraseAt(S, 0, 'a gauge force is')) / 2.4);
    ctx.globalAlpha = ia; ctx.strokeStyle = C.argued; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(cx, cy, 20, -Math.PI / 2, -Math.PI / 2 + TAU * 0.92 * run); ctx.stroke(); ctx.globalAlpha = 1;
    const turn = 0.9 * clamp((u - phraseAt(S, 0, 'a gauge force is') - 2.4) / 0.8);
    arrow(cx, cy - 20, cx + 46 * Math.cos(-turn), cy - 20 + 46 * Math.sin(-turn) * 1, C.now, ia, 3);
    if (turn > 0) arrow(cx, cy - 20, cx + 46, cy - 20, C.dim, ia * 0.6, 2);
    txt('inside a cell: a loop returns turned', 160, 840 - 90, { size: 24, fam: F.disp, w: 700, c: C.argued, a: ia });
    txt('胞内：绕一圈回来，转了一个角 → 规范力', 160, 840 - 56, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ia });
  }
  /* between cells: metronomes ticking slower where crowded */
  const ba = a * at(S, 1, 0.6);
  if (ba > 0.003) {
    const t = Math.max(0, u - lineAt(S, 1).s);
    const mets = [[pt(3, 1), 1.0], [pt(3, 4), 0.7], [pt(3, 7), 0.45]];
    mets.forEach(([p, f], i) => {
      const sw = 0.55 * Math.sin(t * 4.2 * f);
      const bx = p[0], by = p[1] + 40;
      line(bx - 18, by, bx + 18, by, C.argued, ba, 3);
      line(bx, by, bx + 52 * Math.sin(sw), by - 52 * Math.cos(sw), C.argued, ba, 3);
      dot(bx + 52 * Math.sin(sw), by - 52 * Math.cos(sw), 6, 'v', ba);
      for (let k = 0; k < i * 2; k++) dot(bx - 40 + 16 * k, by + 26, 5, 'v', ba * 0.8);
    });
    txt('between cells: one shared rhythm, slower where crowded', 1000, 840 - 90, { size: 24, fam: F.disp, w: 700, c: C.argued, a: ba });
    txt('胞间：共用一只节拍器，越拥挤越慢 → 引力', 1000, 840 - 56, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ba });
  }
  /* the aphorism (model) and what stays open */
  const fa = a * Q(S, 0, 'a gauge force is', 0.6, 2.6);
  txt('A gauge force is a loop that does not come home unchanged.', 1020, 300, { size: 24, fam: F.disp, w: 700, c: C.argued, a: fa * (1 - Q(S, 1, 'Einstein', 0.5) * 0.6) });
  const oa = a * Q(S, 1, 'Einstein', 0.6);
  chip(1300, 420, 420, 56, 'OPEN · Einstein’s constant', C.open, oa, 22);
  chip(1300, 500, 420, 56, 'OPEN · three generations', C.open, oa * Q(S, 1, 'three generations', 0.5), 22);
  txt('爱因斯坦常数 · 三代粒子：仍开放', 1300, 570, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.open, a: oa });
};

/* ======================================================================= */
/*                          scene 7 · WHO COMPARES                          */
/* ======================================================================= */
SCENES.a08_ask = S => {
  const u = S.u, a = A08.fade(S);
  SPINE.rail(S, 8, a);
  const steps = [
    ['ONE CELL', '一个小胞', C.cyan],
    ['SAGITTA LEDGER', '矢高账本', C.mag],
    ['PRIME CLOCKS', '素数之钟', C.cyan],
    ['FOURTH DRAWER', '第四格', C.mag],
    ['FORCES AS ARCS', '万力归弧', C.argued]
  ];
  const ca = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.6) * 0.5);
  const w = 280, gap = 26, x0 = W / 2 - (steps.length * w + (steps.length - 1) * gap) / 2;
  steps.forEach(([en, zh, col], i) => {
    const sa = ca * clamp(at(S, 0, 0.4, 0.45 * i));
    const x = x0 + i * (w + gap);
    chip(x + w / 2, 300, w, 66, en, col, sa, 22);
    txt(zh, x + w / 2, 370, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: sa * 0.9 });
    if (i + 1 < steps.length) arrow(x + w + 4, 300, x + w + gap - 4, 300, C.dim, sa * 0.8, 2);
  });
  /* the cell, small, with no outside: a ring of dashes where the outside used to be */
  const oa = a * Q(S, 0, 'comparing needs', 0.6) * (1 - at(S, 1, 0.6));
  const P = A08.view(W / 2 + 80, 640, 230, 2.75 + 0.01 * u, 0.8);
  A08.cell(P, oa, { walls: 0.7, cap: 0.7, labels: 0, one: 0.6 });
  ctx.save(); ctx.setLineDash([6, 12]); ring(W / 2, 560, 175, C.dim, oa * 0.6, 1.5); ctx.restore();
  txt('no outside left · 外面已无立足之地', W / 2, 790, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: oa });
  SPINE.ask(S, 1, 'Who does the comparing, from inside the field?', '在场的里面，是谁在比较？');
};

/* ---- a09 · Observers inside the field · 互照与破执·场内观察者 ---- */
/* Act a09 of the long film No Third Point · Part IX · Observers inside the field
   (book quantum-geometry, chapters 34–37). Scenes for theme/film/engine.js; every name of this act lives in A09.

   One thread runs through the act: a record is made by two things comparing (title), it is held by many hands and
   cannot be unmade while one hand still holds it (copies), the held past sits still in memory cells, one per moment,
   and is fetched by an address (router), and the pointer walks from one moment's state to the next along the
   shortest arc (arc).

   What each scene shows, and where it rests:
     a09_title   a raindrop and a pebble compare each other and the pebble keeps a dent; a photon compares and passes
                 the phase on, keeping nothing (M = 0); a mind keeps much (M >> 1). Reading everything that compares as
                 an observer, differing only in memory order M, is the book's model (section 34.1, argued).
     a09_copies  equalSuperpositionDensity has rho01 = 1/2; the phase record (1, i) has overlap -i; two copies give
                 -1/2, letting copy 0 go gives -i/2, letting both go gives 1/2
                 ..... JointCoherentReversal.two_copy_joint_reversal_certificate (LEAN);
                 eight holders, seven of unit overlap and a survivor of overlap 3/10: 1/2 -> 3i/20 -> 3/20 (computed);
                 unit overlaps off k, c_k != 1, rho_ij != 0 => not restored
                 ..... JointCoherentReversal.surviving_copy_blocks_reversal (LEAN); the hands are a reading (argued).
     a09_router  eight cells, one per moment t0..t7, holding 2 7 1 8 2 8 1 8; address bits 0 1 1 -> cell 3, D(3) = 8
                 (computed); with clean wires routing lights exactly the addressed leaf and a query adds D a; a query
                 keeps the address and any wires ..... ReversibleQram.correctness (LEAN, every depth);
                 the sluice gates are a picture, time as a pointer over still memory is the book's model (argued).
     a09_arc     unit vectors a, c at 80 degrees, b 50 degrees off the arc's midpoint: 80.0 direct, 60.5 + 60.5 = 121.0;
                 the chord's midpoint has length cos 40 = 0.766 (computed);
                 fsAngle a c <= fsAngle a b + fsAngle b c ..... FubiniStudyRecordTime.fs_angle_triangle (LEAN);
                 record weight = |<phi, psi>|^2 = Tr(rho P) ..... RankOneBornPairingWeight.rank_one_born_pairing_weight
                 (LEAN); reading the weight as a filter's share is the Born rule (argued); four 20-degree steps keep
                 cos^8 20 = 0.608, one 80-degree leap keeps cos^2 80 = 0.030 (computed); the taut string is a picture
                 and even steps as good reasoning (section 37.2) is a model (argued).
     a09_ask     the four pieces inside one field, and the question handed to Part X.

   On load, FILM.init checks the cited theorems and recomputes every number on screen by a second route. */
const A09 = (() => {
  const DEG = Math.PI / 180;
  /* ---------- exact quantities ---------- */
  const cMul = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
  const cConj = p => [p[0], -p[1]];
  const cNear = (p, q, e = 1e-12) => Math.abs(p[0] - q[0]) < e && Math.abs(p[1] - q[1]) < e;
  const cProd = zs => zs.reduce(cMul, [1, 0]);
  const fmtC = z => {
    const r = Math.abs(z[0]) < 1e-12, i = Math.abs(z[1]) < 1e-12;
    const fr = x => ({ '0.5': '1/2', '-0.5': '−1/2', '0.15': '3/20', '-0.15': '−3/20' }[String(+x.toFixed(10))] || String(x));
    if (i) return fr(z[0]);
    if (r) return { '0.5': 'i/2', '-0.5': '−i/2', '0.15': '3i/20', '-0.15': '−3i/20' }[String(+z[1].toFixed(10))] || `${z[1]}i`;
    return `${z[0]} + ${z[1]}i`;
  };
  /* the phase record: amplitude 1 on branch 0 and i on branch 1; its overlap is 1 · conj(i) = −i */
  const PHASE = [0, -1];
  const RHO01 = [0.5, 0];
  const twoCopy = (() => {
    const w = cMul(cMul(PHASE, PHASE), RHO01);            // both copies written
    const u0 = cMul(cConj(PHASE), w);                      // copy 0 let go
    const u1 = cMul(cConj(PHASE), u0);                     // copy 1 let go as well
    return { start: RHO01, w, u0, u1 };
  })();
  /* the survivor row: seven unit overlaps and the survivor k = 5 of overlap 3/10 */
  const ROW = [[0, 1], [0, -1], [-1, 0], [0, 1], [0, -1], [0.3, 0], [-1, 0], [0, 1]];
  const ROW_LABEL = ['i', '−i', '−1', 'i', '−i', '3/10', '−1', 'i'];
  const K = 5;
  const survivor = (() => {
    const written = cMul(cProd(ROW), RHO01);
    const left = cMul(cProd(ROW.filter((_, l) => l !== K).map(cConj)), written);
    return { written, left };
  })();
  /* routing: address bits, most significant first, choose left (0) or right (1) at each level */
  const DATA8 = [2, 7, 1, 8, 2, 8, 1, 8];
  const BITS = [0, 1, 1];
  const leafOf = bits => bits.reduce((n, b) => 2 * n + b, 0);
  const LEAF = leafOf(BITS);
  /* one-hot of the routed enable signal over the leaves (the first clause of correctness, depth 3) */
  const oneHot = bits => Array.from({ length: 1 << bits.length }, (_, i) => (i === leafOf(bits) ? 1 : 0));
  const readout = bits => oneHot(bits).reduce((s, e, i) => s + e * DATA8[i], 0);
  /* the sphere: unit vectors a, c at 80°, b lifted 50° above the arc's midpoint */
  const vA = [1, 0, 0], vC = [Math.cos(80 * DEG), Math.sin(80 * DEG), 0];
  const vB = [Math.cos(40 * DEG) * Math.cos(50 * DEG), Math.sin(40 * DEG) * Math.cos(50 * DEG), Math.sin(50 * DEG)];
  const dot3 = (p, q) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
  const fsAngle = (p, q) => Math.acos(Math.min(1, Math.abs(dot3(p, q)))) / DEG;
  const ANG = { ac: fsAngle(vA, vC), ab: fsAngle(vA, vB), bc: fsAngle(vB, vC) };
  ANG.detour = ANG.ab + ANG.bc;
  const CHORD_MID = Math.hypot((vA[0] + vC[0]) / 2, (vA[1] + vC[1]) / 2, 0);
  /* filters: each keeps cos² of its turn */
  const passRow = angles => { let prev = 0, I = 1; return angles.map(t => { I *= Math.cos((t - prev) * DEG) ** 2; prev = t; return I; }); };
  const EVEN = [20, 40, 60, 80], LEAP = [80];
  const PEVEN = passRow(EVEN), PLEAP = passRow(LEAP);
  /* ---------- citations ---------- */
  const LEAN = {
    two: 'D5/S3/ObserverMemory/JointCoherentReversal.two_copy_joint_reversal_certificate',
    survivor: 'D5/S3/ObserverMemory/JointCoherentReversal.surviving_copy_blocks_reversal',
    qram: 'D5/S3/Quantum/Routing/ReversibleQram.correctness',
    triangle: 'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
    born: 'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight'
  };
  const missing = new Set();
  /* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
  function lean(x, y, gid, a, o = {}) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!missing.has(gid)) { missing.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return;
    }
    const size = o.size || 19, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(o.name || r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  /* coloured runs of text on one baseline */
  function rich(parts, x, y, o = {}) {
    const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
    for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al) }); cx += tw(s, size, fam, w); }
    return cx;
  }
  function ellipse(x, y, rx, ry, col, a, lw = 2, fill = null) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, TAU);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); ctx.restore();
  }
  function dashedEllipse(x, y, rx, ry, col, a, lw = 2) {
    if (a <= 0.003) return;
    ctx.save(); ctx.setLineDash([14, 10]); ellipse(x, y, rx, ry, col, a, lw); ctx.restore();
  }
  function dashedBox(x, y, w, h, col, a, lw = 1.6) {
    if (a <= 0.003) return;
    ctx.save(); ctx.setLineDash([8, 7]); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(x, y, w, h); ctx.restore();
  }
  /* a dial: the overlap z as an arrow of length |z| in a unit ring */
  function dial(cx, cy, R, z, col, a) {
    if (a <= 0.003) return;
    ring(cx, cy, R, C.dim, a * 0.6, 1.4);
    line(cx - R - 6, cy, cx + R + 6, cy, C.dim, a * 0.3, 1);
    line(cx, cy - R - 6, cx, cy + R + 6, C.dim, a * 0.3, 1);
    const x2 = cx + R * z[0], y2 = cy - R * z[1];
    if (Math.hypot(x2 - cx, y2 - cy) > 3) arrow(cx, cy, x2, y2, col, a, 4);
  }
  /* a held record: a hand (open as it lets go), a dial, the overlap; gone ∈ [0, 1] turns the arrow back to 1 */
  function card(x, y, w, h, title, z, label, a, o = {}) {
    if (a <= 0.003) return;
    const ud = o.undone || 0, col = o.focus ? C.now : C.white;
    box(x, y, w, h, col, a * (0.8 - 0.4 * ud), o.focus ? 2.4 : 1.4, 'rgba(4,10,24,0.65)');
    txt(title, x + w / 2, y + 32, { size: o.ts || 21, fam: F.zh, w: 700, align: 'center', c: col, a: a * (1 - 0.5 * ud) });
    const zz = [lerp(z[0], 1, ease(ud)), lerp(z[1], 0, ease(ud))];
    dial(x + w / 2, y + h * 0.52, o.R || Math.min(w, h) * 0.26, zz, col, a * (1 - 0.5 * ud));
    txt(label, x + w / 2, y + h - 20, { size: o.ls || 24, fam: F.math, w: 700, align: 'center', c: col, a: a * (1 - 0.5 * ud) });
    if (ud > 0.02) txt('let go · 已松手', x + w / 2, y + h + 28, { size: o.us || 18, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * ud });
    else if (o.hold) txt('held · 握着', x + w / 2, y + h + 28, { size: o.us || 18, fam: F.zh, w: 700, align: 'center', c: C.now, a });
  }
  /* a ledger tape of [operation, value, colour, alpha] */
  function tape(x, y, steps, a, size = 32) {
    let cx = x;
    for (const [op, val, col, al] of steps) {
      if (al <= 0.003) continue;
      if (op) { txt(op, cx, y, { size: size * 0.6, fam: F.zh, w: 700, c: C.dim, a: a * al }); cx += tw(op, size * 0.6, F.zh, 700) + 12; }
      txt(val, cx, y, { size, fam: F.math, w: 700, c: col, a: a * al }); cx += tw(val, size, F.math, 700) + 20;
    }
    return cx;
  }
  /* ---------- the comparers on the memory-order axis ---------- */
  const KEEP = [
    { x: 360, en: 'photon', zh: '光子', keeps: 'keeps nothing', kzh: '只传相位，不留', m: 'M = 0', empty: true },
    { x: 720, en: 'atom', zh: '原子', keeps: 'spin ↑', kzh: '自旋', m: 'M = 1' },
    { x: 1080, en: 'pebble', zh: '石子', keeps: 'a dent', kzh: '凹痕', m: '' },
    { x: 1500, en: 'you', zh: '你', keeps: 'years', kzh: '许多年', m: 'M ≫ 1' }
  ];
  function keeper(i, a, o = {}) {
    if (a <= 0.003) return;
    const k = KEEP[i], x = k.x, y = 470;
    if (i === 0) {
      curve(s => [x - 70 + 140 * s, y + 18 * Math.sin(s * TAU * 2.5)], 60, C.white, a, 3);
      arrow(x + 70, y, x + 130, y, C.cyan, a * (o.pass == null ? 1 : o.pass), 2.5);
    } else if (i === 1) {
      dot(x, y, 12, 'w', a); ellipse(x, y, 62, 22, C.white, a * 0.8, 2);
    } else if (i === 2) {
      ellipse(x, y + 8, 82, 40, C.white, a, 2.5, 'rgba(120,130,150,0.25)');
      if (o.dent > 0) ellipse(x + 10, y - 22, 16 * o.dent, 5 * o.dent, C.cyan, a, 2);
      if (o.drop > 0 && o.drop < 1) dot(x + 10, lerp(y - 210, y - 26, ei(o.drop)), 8, 'c', a);
      else if (o.drop >= 1 && o.splash > 0) dot(x + 10, y - 26, 6, 'c', a * (1 - o.splash));
    } else {
      ring(x, y - 10, 46, C.white, a, 2.5); ring(x, y - 10, 28, C.white, a * 0.6, 1.6); ring(x, y - 10, 12, C.white, a * 0.4, 1.4);
    }
    txt(`${k.en} · ${k.zh}`, x, y + 92, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a });
    /* what it keeps: a cyan notebook above it, an empty dashed one for the photon, a thick one for the mind */
    const na = a * (o.note == null ? 1 : o.note);
    if (na > 0.003) {
      if (k.empty) {
        dashedBox(x - 95, y - 150, 190, 62, C.dim, na);
        txt(k.keeps, x, y - 124, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.dim, a: na });
        txt(k.kzh, x, y - 99, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: na });
        return;
      }
      const pages = Math.round(5 * (o.thick || 0));
      for (let p = pages; p >= 1; p--) {
        ctx.save(); ctx.globalAlpha = na * 0.7; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.2;
        ctx.strokeRect(x - 85 + 6 * p, y - 150 - 6 * p, 170, 62); ctx.restore();
      }
      box(x - 85, y - 150, 170, 62, C.cyan, na, 1.6, 'rgba(4,10,24,0.92)');
      txt(k.keeps, x, y - 124, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: na });
      txt(k.kzh, x, y - 99, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: na });
    }
  }
  /* ---------- the routing tree ---------- */
  const TR = { cx: 800, y: [260, 350, 440], leafY: 520, dx: 124 };
  const leafX = i => TR.cx + (i - 3.5) * TR.dx;
  const nodeX = (lvl, j) => TR.cx + ((j + 0.5) * (8 >> lvl) - 4) * TR.dx;
  /* the water's way down for the address bits: points from the source to the cell */
  function trainPath(bits) {
    const pts = [[TR.cx, TR.y[0] - 60]]; let j = 0;
    for (let l = 0; l < 3; l++) { pts.push([nodeX(l, j), TR.y[l]]); j = 2 * j + bits[l]; }
    pts.push([leafX(j), TR.leafY]);
    return pts;
  }
  function alongPath(pts, s) {
    const n = pts.length - 1, f = clamp(s) * n, i = Math.min(n - 1, Math.floor(f)), r = f - i;
    return [lerp(pts[i][0], pts[i + 1][0], r), lerp(pts[i][1], pts[i + 1][1], r)];
  }
  /* ---------- the sphere ---------- */
  const SPH = { cx: 520, cy: 520, R: 270, E: 22 * DEG };
  const ex = [-Math.sin(40 * DEG), Math.cos(40 * DEG), 0];
  const ey = [-Math.cos(40 * DEG) * Math.sin(SPH.E), -Math.sin(40 * DEG) * Math.sin(SPH.E), Math.cos(SPH.E)];
  const sp = v => [SPH.cx + SPH.R * dot3(v, ex), SPH.cy - SPH.R * dot3(v, ey)];
  /* the great-circle arc from p to q (unit vectors), drawn on screen */
  function arc3(p, q, col, a, lw, s1 = 1) {
    if (a <= 0.003 || s1 <= 0) return;
    const th = Math.acos(dot3(p, q));
    curve(s => {
      const t = s * s1 * th, k1 = Math.sin(th - t) / Math.sin(th), k2 = Math.sin(t) / Math.sin(th);
      return sp([k1 * p[0] + k2 * q[0], k1 * p[1] + k2 * q[1], k1 * p[2] + k2 * q[2]]);
    }, 48, col, a, lw);
  }
  /* star-field speeds of this act's scenes (read by the engine before FILM.init runs) */
  Object.assign(FILM.speed, { a09_title: 0.02, a09_copies: 0.014, a09_router: 0.016, a09_arc: 0.014, a09_ask: 0.02 });
  return {
    DEG, cMul, cConj, cNear, cProd, fmtC, PHASE, RHO01, twoCopy, ROW, ROW_LABEL, K, survivor,
    DATA8, BITS, LEAF, leafOf, oneHot, readout, vA, vB, vC, dot3, fsAngle, ANG, CHORD_MID, passRow, EVEN, LEAP, PEVEN, PLEAP,
    LEAN, lean, fade, rich, ellipse, dashedEllipse, dashedBox, dial, card, tape, KEEP, keeper,
    TR, leafX, nodeX, trainPath, alongPath, SPH, sp, arc3
  };
})();

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('no-third-point-a09: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (x, y, e = 1e-12) => Math.abs(x - y) < e;
  /* 0. the cited theorems */
  for (const gid of Object.values(A09.LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. two copies, by the record amplitudes: overlap Σ_a rec(0, a) · conj(rec(1, a)) with rec(0) = (1, 0), rec(1) = (i, 0) */
  const ov = A09.cMul([1, 0], A09.cConj([0, 1]));
  check(A09.cNear(ov, A09.PHASE), 'phase record overlap −i');
  const T = A09.twoCopy;
  check(A09.cNear(T.w, [-0.5, 0]) && A09.cNear(T.u0, [0, -0.5]) && A09.cNear(T.u1, [0.5, 0]), 'the four values 1/2, −1/2, −i/2, 1/2');
  check(A09.fmtC(T.w) === '−1/2' && A09.fmtC(T.u0) === '−i/2' && A09.fmtC(T.u1) === '1/2', 'labels of the four values');
  /* 2. the survivor: |c_l| = 1 off k, c_k = 3/10 ≠ 1; written 3i/20, left 3/20 = c_k · 1/2 */
  A09.ROW.forEach((z, l) => check(l === A09.K ? near(z[0], 0.3) && near(z[1], 0) : near(Math.hypot(z[0], z[1]), 1), `overlap of copy ${l}`));
  check(A09.cNear(A09.survivor.written, [0, 0.15]), 'written entry 3i/20');
  check(A09.cNear(A09.survivor.left, A09.cMul(A09.ROW[A09.K], A09.RHO01)) && A09.cNear(A09.survivor.left, [0.15, 0]), 'survivor entry 3/20');
  check(A09.fmtC(A09.survivor.written) === '3i/20' && A09.fmtC(A09.survivor.left) === '3/20', 'survivor labels');
  /* 3. routing: 011 → cell 3, one-hot, readout 8; every address lights exactly its own cell */
  check(A09.LEAF === 3 && A09.DATA8[3] === 8 && A09.readout(A09.BITS) === 8, 'address 011 reads 8');
  for (let n = 0; n < 8; n++) {
    const bits = [(n >> 2) & 1, (n >> 1) & 1, n & 1], h = A09.oneHot(bits);
    check(h.reduce((s, x) => s + x, 0) === 1 && h[n] === 1 && A09.readout(bits) === A09.DATA8[n], `address ${n}`);
    const p = A09.trainPath(bits);
    check(near(p[p.length - 1][0], A09.leafX(n)), `path to cell ${n}`);
  }
  /* 4. the sphere: unit vectors, angles 80°, 60.5° twice, 121.0°, the triangle inequality, the chord's midpoint */
  [A09.vA, A09.vB, A09.vC].forEach((v, i) => check(near(Math.hypot(...v), 1), `unit vector ${i}`));
  check(near(A09.ANG.ac, 80, 1e-9) && A09.ANG.ac.toFixed(1) === '80.0', 'direct angle 80.0°');
  const ab = Math.acos(Math.cos(40 * A09.DEG) * Math.cos(50 * A09.DEG)) / A09.DEG;
  check(near(A09.ANG.ab, ab, 1e-9) && near(A09.ANG.bc, ab, 1e-9) && A09.ANG.ab.toFixed(1) === '60.5', 'legs 60.5°');
  check(A09.ANG.detour.toFixed(1) === '121.0' && Math.round(A09.ANG.detour) === 121 && A09.ANG.ac <= A09.ANG.detour, 'detour 121.0° ≥ 80°');
  check(A09.CHORD_MID.toFixed(3) === '0.766' && near(A09.CHORD_MID, Math.cos(40 * A09.DEG)), 'chord midpoint 0.766');
  /* 5. filters: (cos² 20°)⁴ and cos² 80°, by the half-angle form (1 + cos 2θ)/2 */
  const c20 = (1 + Math.cos(40 * A09.DEG)) / 2, c80 = (1 + Math.cos(160 * A09.DEG)) / 2;
  check(near(A09.PEVEN[3], c20 ** 4) && A09.PEVEN[3].toFixed(3) === '0.608' && Math.round(100 * A09.PEVEN[3]) === 61, 'even steps 0.608');
  check(A09.PEVEN.map(x => x.toFixed(3)).join() === '0.883,0.780,0.689,0.608', 'even-step readouts');
  check(near(A09.PLEAP[0], c80) && A09.PLEAP[0].toFixed(3) === '0.030' && Math.round(100 * A09.PLEAP[0]) === 3, 'the leap keeps 0.030');
});

SCENES.a09_title = S => {
  const u = S.u;
  SPINE.title(S, 9, '互照与破执·场内观察者', 'Observers inside the field');
  SPINE.rail(S, 9, at(S, 0, 0.6));
  const a = at(S, 0, 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the memory-order axis, drawn from the first line on */
  const axA = a * at(S, 0, 0.8, 0.3);
  line(260, 640, 1660, 640, C.dim, axA, 2); arrow(1600, 640, 1680, 640, C.dim, axA, 2);
  txt('memory order M · 记忆阶数', 1680, 612, { size: 22, fam: F.zh, w: 700, align: 'right', c: C.dim, a: axA });
  A09.KEEP.forEach(k => { if (k.m) txt(k.m, k.x, 690, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: axA }); line(k.x, 630, k.x, 650, C.dim, axA, 2); });
  /* lines 0–1: the raindrop meets the pebble; they compare each other; the pebble keeps the dent */
  const pa = a * at(S, 0, 0.6);
  const drop = clamp((u - lineAt(S, 0).s - 0.6) / 1.4);
  const hit = lineAt(S, 0).s + 2.0;
  A09.keeper(2, pa, { drop, splash: clamp((u - hit) / 0.6), dent: clamp((u - hit) / 0.3), note: Q(S, 1, 'keeps the dent', 0.6) });
  const ma0 = a * Q(S, 1, 'compare each other', 0.6) * (1 - at(S, 4, 0.5));
  if (ma0 > 0) {
    const x = A09.KEEP[2].x;
    curve(s => [x - 150 + 50 * Math.sin(Math.PI * s), lerp(300, 430, s)], 30, C.argued, ma0, 2);
    curve(s => [x + 170 - 50 * Math.sin(Math.PI * s), lerp(430, 300, s)], 30, C.argued, ma0, 2);
    arrow(x - 104, 420, x - 100, 432, C.argued, ma0, 2); arrow(x + 124, 310, x + 120, 298, C.argued, ma0, 2);
    txt('drop ⇄ pebble · 互照', x + 200, 300, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ma0 });
  }
  /* line 2: the photon compares but keeps nothing; you keep years */
  A09.keeper(0, a * Q(S, 2, 'A photon compares', 0.5), { pass: Q(S, 2, 'passes the phase on', 0.5) });
  A09.keeper(1, a * Q(S, 2, 'A photon compares', 0.5, 0.6));
  A09.keeper(3, a * Q(S, 2, 'you keep years', 0.5), { thick: Q(S, 3, 'a deeper memory', 0.8) });
  /* line 3: the idol */
  const ia = a * Q(S, 3, 'needs a brain', 0.5) * (1 - at(S, 4, 0.5));
  if (ia > 0) {
    txt('observer = brain ?  观察者 = 大脑？', W / 2, 250, { size: 36, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ia });
    const st = Q(S, 3, 'only a deeper', 0.6);
    if (st > 0) line(W / 2 - 320, 238, W / 2 - 320 + 640 * st, 238, C.white, ia, 3);
  }
  /* line 4: the book's reading */
  const ma = a * at(S, 4, 0.6);
  if (ma > 0) {
    for (let i = 0; i < 3; i++) {
      const x1 = A09.KEEP[i].x, x2 = A09.KEEP[i + 1].x;
      curve(s => [lerp(x1 + 100, x2 - 90, s), 330 - 46 * Math.sin(Math.PI * s)], 40, C.argued, ma * 0.8, 2);
    }
    txt('everything that compares observes · 会比较的，都是观察者', W / 2, 250, { size: 32, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma });
    txt('MODEL · only the memory order M differs · 模型诠释：差别只在记忆阶数', W / 2, 760, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma * 0.9 });
  }
};

SCENES.a09_copies = S => {
  const u = S.u, a = A09.fade(S), T = A09.twoCopy;
  SPINE.rail(S, 9, 1);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'argued']]);
  /* phase A: two holders (lines 0–2) */
  const aA = a * (1 - at(S, 3, 0.5));
  if (aA > 0.003) {
    const w0 = Q(S, 1, 'Two holders', 0.6), w1 = Q(S, 1, 'becomes minus', 0.6);
    const d0 = Q(S, 2, 'One lets go', 0.8), d1 = Q(S, 2, 'Both let go', 0.8);
    const val = d1 > 0.5 ? T.u1 : d0 > 0.5 ? T.u0 : w1 > 0.5 ? T.w : w0 > 0.5 ? A09.cMul(A09.PHASE, T.start) : T.start;
    /* the qubit's link between branches */
    const sx = 140, sy = 200;
    panel(sx, sy, 520, 330, aA, C.cyan, 'QUBIT · 系统');
    const cx = sx + 260, cy = sy + 180;
    [-1, 1].forEach(s => {
      line(cx + 170 * s, cy - 90, cx + 170 * s, cy + 90, C.white, aA, 3);
      line(cx + 170 * s, cy - 90, cx + 150 * s, cy - 90, C.white, aA, 3);
      line(cx + 170 * s, cy + 90, cx + 150 * s, cy + 90, C.white, aA, 3);
    });
    txt('1/2', cx - 90, cy - 30, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: aA * 0.7 });
    txt('1/2', cx + 90, cy + 62, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: aA * 0.7 });
    txt(A09.fmtC(val), cx + 90, cy - 30, { size: 36, fam: F.math, w: 700, align: 'center', c: C.now, a: aA });
    txt(A09.fmtC(A09.cConj(val)), cx - 90, cy + 62, { size: 34, fam: F.math, w: 700, align: 'center', c: C.white, a: aA * 0.5 });
    txt('the link ρ₀₁ · 两分支的连接', cx, sy + 312, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.now, a: aA * Q(S, 0, 'links its two branches', 0.6) });
    /* two holders: the pebble and you, from the first scene */
    [0, 1].forEach(j => {
      const ca = aA * (j ? w1 : w0), ud = j ? d1 : d0;
      A09.card(760 + 320 * j, 200, 280, 330, j ? 'held by you · 你' : 'held by the pebble · 石子', A09.PHASE, 'c = −i', ca, { undone: ud, hold: ud < 0.02, focus: (j ? w1 > 0.5 && d0 > 0.5 && d1 < 0.5 : w0 > 0.5 && d0 < 0.5 && w1 < 0.5) });
    });
    txt('a quarter turn each · 各转四分之一圈', 1060, 620, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: aA * w0 * (1 - d0) });
    /* the ledger tape */
    A09.tape(140, 660, [
      ['', A09.fmtC(T.start), C.white, at(S, 0, 0.6)],
      ['both hold ×(−i)² →', A09.fmtC(T.w), w1 > 0.5 && d0 < 0.5 ? C.now : C.white, w1],
      ['one lets go →', A09.fmtC(T.u0), d0 > 0.5 && d1 < 0.5 ? C.now : C.white, d0],
      ['both let go →', A09.fmtC(T.u1), d1 > 0.5 ? C.now : C.white, d1]
    ], aA, 34);
    const la = aA * Q(S, 2, 'Lean checks', 0.6);
    A09.lean(140, 740, A09.LEAN.two, la);
    txt('four values · 四个值：1/2, −1/2, −i/2, 1/2', 140, 784, { size: 22, fam: F.zh, w: 700, c: C.lean, a: la });
  }
  /* phase B: one hand among eight still holds (lines 3–4) */
  const aB = a * at(S, 3, 0.6, 0.3);
  if (aB > 0.003) {
    const t0 = phraseAt(S, 3, 'let the pure phase copies go');
    A09.ROW.forEach((z, l) => {
      const isK = l === A09.K, ud = isK ? 0 : clamp((u - t0 - 0.15 * l) / 0.5);
      A09.card(140 + l * 200, 200, 180, 210, isK ? 'holder k = 5' : `holder ${l}`, z, A09.ROW_LABEL[l], aB, { undone: ud, hold: isK, focus: isK, R: 46, ts: 19, ls: 22, us: 16 });
    });
    const back = Q(S, 3, 'never returns', 0.5);
    A09.tape(150, 540, [
      ['ρ₀₁', A09.fmtC(A09.RHO01), C.white, 1],
      ['all eight hold →', A09.fmtC(A09.survivor.written), C.white, Q(S, 3, 'Keep one copy', 0.5)],
      ['seven let go →', A09.fmtC(A09.survivor.left), C.now, clamp((u - t0 - 1.4) / 0.5)],
      ['', '≠ 1/2', C.white, back]
    ], aB, 32);
    const la = aB * Q(S, 3, 'Lean checks', 0.6);
    A09.lean(150, 620, A09.LEAN.survivor, la);
    A09.rich([['others |c| = 1,  ', C.white], ['c(k) ≠ 1', C.now], [',  ρ(i, j) ≠ 0  ⟹  not restored · 回不到原值', C.white]], 150, 670, { size: 24, fam: F.zh, a: la });
    /* line 4: the aphorism, matched to the picture: one hand still holding is enough */
    const ap = aB * at(S, 4, 0.6);
    txt('“To unmake a fact, every hand must let go.”  要抹去一个事实，得让每一只手都松开。', W / 2, 770, { size: 30, fam: F.zh, w: 900, align: 'center', c: C.argued, a: ap });
    txt('a reading · 诠释：hand ↔ copy · letting go ↔ conjugating', W / 2, 812, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ap * 0.85 });
  }
};

SCENES.a09_router = S => {
  const u = S.u, a = A09.fade(S), TR = A09.TR;
  SPINE.rail(S, 9, 1);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [4, 'Lean checks', 'lean'], [4, 'Time as a pointer', 'argued']]);
  /* line 0: the held past, eight still cells, one per moment, shown from the start */
  txt('the past stays put · 过去留在原地', TR.cx, 210, { size: 28, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5)) });
  const set = [Q(S, 2, 'zero', 0.4), Q(S, 2, 'one, one', 0.4), Q(S, 2, 'one turns', 0.4)];
  const run = clamp((u - phraseAt(S, 2, 'turns three gates')) / 1.6);
  const arrived = run >= 1;
  for (let i = 0; i < 8; i++) {
    const x = A09.leafX(i), hot = arrived && i === A09.LEAF;
    const ci = a * clamp((u - 0.3 - 0.1 * i) / 0.4);
    box(x - 48, TR.leafY, 96, 80, hot ? C.now : C.cyan, ci, hot ? 2.6 : 1.4, 'rgba(4,10,24,0.7)');
    txt(String(A09.DATA8[i]), x, TR.leafY + 54, { size: 40, fam: F.orb, w: 900, align: 'center', c: hot ? C.now : C.white, a: ci });
    txt(`t${'₀₁₂₃₄₅₆₇'[i]}`, x, TR.leafY + 114, { size: 22, fam: F.math, w: 700, align: 'center', c: hot ? C.now : C.dim, a: ci });
  }
  txt('one cell per moment · 每个时刻一格', TR.cx, TR.leafY + 156, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.6, 0.6) * (1 - at(S, 3, 0.5)) });
  /* line 1: the channels and gates */
  const ta = a * Q(S, 1, 'Picture eight fields', 0.6);
  let jPath = 0;
  for (let l = 0; l < 3; l++) {
    const n = 1 << l;
    for (let j = 0; j < n; j++) {
      const x = A09.nodeX(l, j), y = TR.y[l];
      const kids = l < 2 ? [A09.nodeX(l + 1, 2 * j), A09.nodeX(l + 1, 2 * j + 1)] : [A09.leafX(2 * j), A09.leafX(2 * j + 1)];
      const ky = l < 2 ? TR.y[l + 1] : TR.leafY;
      const onPath = j === jPath, s = onPath ? set[l] : 0, b = A09.BITS[l];
      kids.forEach((kx, c) => {
        const open = onPath && s > 0.5 && c === b;
        line(x, y, kx, ky, open ? C.now : C.dim, ta * (open ? 1 : 0.6), open ? 3 : 1.6);
      });
      /* the gate: a bar across the closed branch */
      dot(x, y, 8, onPath && s > 0.5 ? 'g' : 'w', ta);
      if (onPath && s > 0) {
        const kx = kids[1 - b], d = Math.hypot(kx - x, ky - y), mx = x + 40 * (kx - x) / d, my = y + 40 * (ky - y) / d;
        const nx = -(ky - y) / d, ny = (kx - x) / d;
        line(mx - 16 * nx * s, my - 16 * ny * s, mx + 16 * nx * s, my + 16 * ny * s, C.now, ta, 5);
      }
    }
    jPath = 2 * jPath + A09.BITS[l];
  }
  txt('source · 水源', TR.cx, TR.y[0] - 70, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ta });
  line(TR.cx, TR.y[0] - 58, TR.cx, TR.y[0], C.dim, ta, 1.6);
  /* the address */
  const aa = a * Q(S, 2, 'The address', 0.5);
  if (aa > 0) {
    panel(1340, 200, 440, 150, aa, C.cyan, 'ADDRESS · 地址');
    A09.BITS.forEach((b, l) => txt(String(b), 1440 + 90 * l, 300, { size: 56, fam: F.orb, w: 900, align: 'center', c: set[l] > 0.5 ? C.now : C.white, a: aa }));
    txt(`= ${A09.LEAF}`, 1700, 300, { size: 36, fam: F.math, w: 700, align: 'center', c: C.white, a: aa * clamp(run * 2) });
  }
  /* the water front */
  if (run > 0 && run < 1.0) { const [x, y] = A09.alongPath(A09.trainPath(A09.BITS), run); dot(x, y, 13, 'g', a); }
  /* the picture */
  txt('picture · 比方：water ↔ enable signal · gate ↔ address bit · field ↔ cell', TR.cx, 720, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ta * (1 - at(S, 4, 0.5)) });
  /* line 3: the register; with clean wires the cell is added, the address and wires stay */
  const ra = a * at(S, 3, 0.6);
  if (ra > 0) {
    panel(1340, 380, 440, 260, ra, C.cyan, 'READ · 读出');
    const add = Q(S, 3, 'adds that field', 0.6);
    txt('wires clean · 线路干净', 1366, 446, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ra });
    A09.rich([['r ', C.white], [add > 0.5 ? `→ r + ${A09.readout(A09.BITS)}` : '', C.now]], 1366, 500, { size: 34, a: ra });
    const kept = Q(S, 3, 'as they were', 0.6);
    txt('address 011 → 011', 1366, 560, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ra * kept });
    txt('wires → unchanged · 原样不动', 1366, 604, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: ra * kept });
  }
  /* line 4: the theorem and the model */
  const la = a * Q(S, 4, 'Lean checks', 0.6);
  A09.lean(300, 740, A09.LEAN.qram, la, { name: 'ReversibleQram.correctness' });
  txt('every depth n · clean wires: only cell a lit, query adds D(a) · any wires: a query keeps a and the wires', 300, 780, { size: 18, fam: F.mono, w: 700, c: C.lean, a: la });
  const ma = a * Q(S, 4, 'Time as a pointer', 0.6);
  txt('MODEL · time = a pointer over still memory · 时间即静止存储上的指针', 300, 820, { size: 21, fam: F.zh, w: 700, c: C.argued, a: ma });
};

SCENES.a09_arc = S => {
  const u = S.u, a = A09.fade(S), P = A09.SPH, sp = A09.sp, AN = A09.ANG;
  SPINE.rail(S, 9, 1);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed'], [5, 'the record weight', 'lean'], [5, 'Even steps', 'argued']]);
  /* the sphere of unit states: a softly lit ball */
  const sa = a * at(S, 0, 0.6);
  if (sa > 0.003) {
    ctx.save(); ctx.globalAlpha = sa;
    const g = ctx.createRadialGradient(P.cx - 0.35 * P.R, P.cy - 0.4 * P.R, 0.1 * P.R, P.cx, P.cy, P.R);
    g.addColorStop(0, rgba(C.cyan, 0.16)); g.addColorStop(1, rgba(C.bg, 0.05));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P.cx, P.cy, P.R, 0, TAU); ctx.fill(); ctx.restore();
  }
  ring(P.cx, P.cy, P.R, C.dim, sa * 0.8, 1.6);
  const pa = A09.sp(A09.vA), pc = sp(A09.vC), pb = sp(A09.vB);
  dot(pa[0], pa[1], 10, 'w', sa); dot(pc[0], pc[1], 10, 'w', sa);
  txt('a', pa[0] - 34, pa[1] + 8, { size: 30, fam: F.math, w: 700, c: C.white, a: sa });
  txt('c', pc[0] + 20, pc[1] + 8, { size: 30, fam: F.math, w: 700, c: C.white, a: sa });
  /* the thread from the last scene: a is the state at moment 3, c the state at moment 4 (the book's model) */
  const tA = a * Q(S, 0, 'from moment three', 0.6);
  txt('t₃', pa[0] - 30, pa[1] + 44, { size: 24, fam: F.math, w: 700, c: C.argued, a: tA });
  txt('t₄', pc[0] + 18, pc[1] + 44, { size: 24, fam: F.math, w: 700, c: C.argued, a: tA });
  txt('unit states · 单位态', P.cx, P.cy + P.R + 40, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.dim, a: sa });
  /* line 1: the taut string lies on the arc; the chord cuts through the inside */
  const ch = a * Q(S, 1, 'never through the inside', 0.6);
  dashed(pa[0], pa[1], pc[0], pc[1], C.mag, ch * 0.9, 2);
  const mid = [(pa[0] + pc[0]) / 2, (pa[1] + pc[1]) / 2];
  dot(mid[0], mid[1], 7, 'm', ch);
  const arA = a * Q(S, 1, 'shortest arc', 0.6);
  A09.arc3(A09.vA, A09.vC, C.cyan, arA, 4, arA);
  /* right column: the picture, then the angles */
  const pic = a * Q(S, 1, 'Stretch a string', 0.6) * (1 - at(S, 2, 0.5));
  if (pic > 0) {
    panel(1000, 200, 800, 150, pic, C.argued, 'PICTURE · 比方');
    txt('taut string ↔ path between states', 1030, 262, { size: 26, fam: F.disp, w: 700, c: C.argued, a: pic });
    txt('ball surface ↔ states of length one · 球面 ↔ 单位态', 1030, 310, { size: 22, fam: F.zh, w: 700, c: C.argued, a: pic });
  }
  const out = 1 - at(S, 4, 0.6);
  const ra = a * at(S, 2, 0.6) * out;
  if (ra > 0) {
    panel(1000, 200, 800, 200, ra, C.cyan, 'ANGLES BETWEEN STATES · 态之间的夹角');
    A09.rich([['a → c:  ', C.white], [`${AN.ac.toFixed(1)}°`, C.cyan]], 1030, 268, { size: 30, a: ra });
    A09.rich([['a → b → c:  ', C.white], [`${AN.ab.toFixed(1)}° + ${AN.bc.toFixed(1)}° = ${AN.detour.toFixed(1)}°`, C.white]], 1030, 318, { size: 30, a: ra * Q(S, 2, 'makes the trip', 0.5) });
    A09.rich([['chord midpoint |m| = ', C.white], [`${A09.CHORD_MID.toFixed(3)} < 1`, C.mag], ['  not a state · 不是态', C.mag]], 1030, 370, { size: 22, fam: F.zh, a: ra });
  }
  /* line 2: the detour, white: still a path between states */
  const da = a * Q(S, 2, 'a stop fifty degrees', 0.6);
  A09.arc3(A09.vA, A09.vB, C.white, da * 0.85, 2.5, da); A09.arc3(A09.vB, A09.vC, C.white, da * 0.85, 2.5, clamp(da * 2 - 1));
  dot(pb[0], pb[1], 9, 'w', da);
  txt('b', pb[0] + 14, pb[1] - 16, { size: 30, fam: F.math, w: 700, c: C.white, a: da });
  /* line 3: the triangle inequality */
  const la = a * Q(S, 3, 'Lean checks', 0.6) * out;
  A09.lean(1000, 460, A09.LEAN.triangle, la);
  txt('∠(a, c) ≤ ∠(a, b) + ∠(b, c)   ∠ = arccos |⟨u, v⟩|', 1000, 500, { size: 22, fam: F.math, w: 700, c: C.lean, a: la });
  /* line 4: the filters, a one-line landmark */
  const fa = a * at(S, 4, 0.6, 0.4);
  if (fa > 0) {
    panel(1000, 200, 800, 230, fa, C.cyan, 'FILTERS ALONG THE ARC · 沿弧放滤片');
    const r1 = Q(S, 4, 'four even steps', 0.6), r2 = Q(S, 4, 'one eighty-degree leap', 0.6);
    txt('4 × 20°', 1030, 280, { size: 28, fam: F.math, w: 700, c: C.white, a: fa * r1 });
    fillBox(1180, 258, 440 * A09.PEVEN[3] * r1, 26, C.cyan, fa * 0.8);
    txt(`(cos² 20°)⁴ = ${A09.PEVEN[3].toFixed(3)}`, 1180, 320, { size: 22, fam: F.math, w: 700, c: C.cyan, a: fa * r1 });
    txt('1 × 80°', 1030, 370, { size: 28, fam: F.math, w: 700, c: C.white, a: fa * r2 });
    fillBox(1180, 348, Math.max(3, 440 * A09.PLEAP[0]) * r2, 26, C.now, fa);
    txt(`cos² 80° = ${A09.PLEAP[0].toFixed(3)}`, 1240, 370, { size: 22, fam: F.math, w: 700, c: C.now, a: fa * r2 });
  }
  /* line 5: the record weight (Lean) and its reading as a filter's share (the Born rule) */
  const ba = a * Q(S, 5, 'the record weight', 0.6);
  A09.lean(1000, 520, A09.LEAN.born, ba);
  txt('record weight = |⟨φ, ψ⟩|² = Tr(ρ P)', 1000, 564, { size: 24, fam: F.math, w: 700, c: C.lean, a: ba });
  txt('weight read as a filter\'s share: Born rule · 玻恩规则（物理假说）', 1000, 606, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ba });
  const ma = a * Q(S, 5, 'Even steps', 0.6);
  txt('MODEL · even steps ↔ good reasoning · 模型诠释', 1000, 660, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ma });
};

SCENES.a09_ask = S => {
  const a = A09.fade(S);
  SPINE.rail(S, 9, 1);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* one field, four pieces inside it */
  const fa = a * at(S, 0, 0.8);
  A09.dashedEllipse(W / 2, 420, 700, 200, C.cyan, fa, 2);
  txt('the field · 场', W / 2, 250, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: fa });
  const items = [
    ['comparers keep records', '比较即留记录', null],
    ['copies pin the past', '副本钉住过去', 'Records pin the past'],
    ['a pointer walks it', '指针在其中行走', 'a pointer walks it'],
    ['the shortest arc', '最短的弧', 'the shortest arc']
  ];
  items.forEach(([en, zh, ph], i) => {
    const x = W / 2 + (i - 1.5) * 330;
    const ia = a * (ph ? Q(S, 0, ph, 0.5) : at(S, 0, 0.5));
    if (ia <= 0) return;
    box(x - 150, 360, 300, 110, C.white, ia, 1.6, 'rgba(4,10,24,0.7)');
    txt(en, x, 408, { size: 22, fam: F.disp, w: 700, align: 'center', c: C.white, a: ia });
    txt(zh, x, 446, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: ia });
    if (i) arrow(x - 178, 415, x - 154, 415, C.dim, ia, 2);
  });
  /* the point outside, asked about */
  const oa = a * Q(S, 0, 'all from inside', 0.6);
  ring(170, 250, 14, C.argued, oa, 2);
  txt('C ?', 200, 258, { size: 26, fam: F.math, w: 700, c: C.argued, a: oa });
  SPINE.ask(S, 1, 'If every observer is part of the field, is anything left outside?', '如果每个观察者都是场的一部分，外面还剩什么？');
};

/* ---- a10 · The observer is the field · 不二与归元 ---- */
/* Film · No Third Point, act a10 · Part X (chapters 38–39) · 不二与归元 · The observer is the field.
   Scenes for theme/film/engine.js. What is on screen, and on what footing:
     a10_title  one turn of a point round a circle; "no watcher outside" is the chapter's model (argued).
     a10_lift   z = w² on the unit circle, read as two wheels geared 2 : 1 (the gears are an analogy).
                The table w = e^{iθ/2}, w² = e^{iθ} at θ = 0°, 90°, …, 360°, 720° is computed here.
                CircleDoubleCoverHistoryLift.circle_double_cover_history_lift (LEAN): the lift of any base path from a
                given start is unique, and the lift of the full turn from 1 ends at −1. The second turn is a hand step.
     a10_sheet  the arrow J returns after 360° while Re w = cos(θ/2) has flipped sign (computed); reading the arrow as
                the world and the sign as the turner is the chapter's model (argued).
     a10_net    three unit vectors at 0°, 60°, 120°: Gram entries 1, 1/2, −1/2 (computed); turning all three by 40°
                leaves every entry unchanged (computed). GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq
                (LEAN): Bᴴ B = Aᴴ A ⟹ B = U A for some unitary U. Indra's net and "nobody inside can see the turn" are
                the chapter's model (argued).
     a10_axiom  AXIOM-Ω: transfer [x, y, z] = x y⁻¹ z and reading κ; on unit quaternions κ(p, q) = (1 + ⟨p, q⟩)/2,
                κ(1, i) = 1/2, κ(1, −1) = 0, i j = k, j i = −k (computed).
                TernaryComparisonIsomorphism.exists_unitQuaternion_equiv (LEAN): noncommutative, chain-connected,
                touches zero, feature rank 5 and reading-complete ⟹ a bijection onto the unit quaternions sending o to 1
                and keeping transfer and reading. The axiom as a description of nature is a model (argued).
     a10_ask    the rotor at 360°, cos 180° + i sin 180° = −1, is a point of the unit-quaternion sphere (computed);
                "the observer is the field" is the chapter's model (argued); the next question.
   On load, FILM.init recomputes every number printed on screen and checks the citations against the pinned lock;
   any disagreement is pushed to window.FILM_ERRORS, which stops the render. */

const A10 = (() => {
  const DEG = Math.PI / 180;
  const GID = {
    lift: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
    gram: 'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
    quat: 'D5/S3/Quantum/AURICOmega/TernaryComparisonIsomorphism.exists_unitQuaternion_equiv'
  };
  const R2 = Math.SQRT1_2;

  /* ---- the half turn: base angle θ (degrees), lift w = e^{iθ/2}, w² = e^{iθ} ---- */
  const LIFT = [
    { th: 0, w: '1', w2: '1', wv: [1, 0], w2v: [1, 0] },
    { th: 90, w: '(1 + i)/√2', w2: 'i', wv: [R2, R2], w2v: [0, 1] },
    { th: 180, w: 'i', w2: '−1', wv: [0, 1], w2v: [-1, 0] },
    { th: 270, w: '(−1 + i)/√2', w2: '−i', wv: [-R2, R2], w2v: [0, -1] },
    { th: 360, w: '−1', w2: '1', wv: [-1, 0], w2v: [1, 0] },
    { th: 720, w: '1', w2: '1', wv: [1, 0], w2v: [1, 0] }
  ];
  const cexp = t => [Math.cos(t), Math.sin(t)];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];

  /* ---- the net: three unit vectors in the plane, and the same three turned by 40° ---- */
  const NET = [0, 60, 120];
  const TURN = 40;
  const vec = d => [Math.cos(d * DEG), Math.sin(d * DEG)];
  const dotp = (a, b) => a[0] * b[0] + a[1] * b[1];
  const gram = ds => ds.map(a => ds.map(b => dotp(vec(a), vec(b))));
  const fmt2 = v => { const r = Math.abs(v) < 0.005 ? 0 : v; return (r < 0 ? '−' : '') + Math.abs(r).toFixed(2); };

  /* ---- unit quaternions [w, x, y, z] = w + x i + y j + z k ---- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const qinv = a => [a[0], -a[1], -a[2], -a[3]];
  const qdot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  const kappa = (p, q) => (1 + qdot(p, q)) / 2;
  const tri = (x, y, z) => qmul(qmul(x, qinv(y)), z);
  const Q1 = [1, 0, 0, 0], QI = [0, 1, 0, 0], QJ = [0, 0, 1, 0], QK = [0, 0, 0, 1], QM = [-1, 0, 0, 0];

  /* ---- drawing helpers ---- */
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const P = (cx, cy, r, t) => [cx + r * Math.cos(t), cy - r * Math.sin(t)];
  function arcPath(cx, cy, r, t0, t1, col, a, lw = 3, dash = null) {
    if (a <= 0.003 || Math.abs(t1 - t0) < 1e-4) return;
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = lw;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath();
    const n = Math.max(8, Math.ceil(Math.abs(t1 - t0) / 0.04));
    for (let i = 0; i <= n; i++) { const [x, y] = P(cx, cy, r, t0 + (t1 - t0) * i / n); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
    ctx.stroke(); ctx.restore();
  }
  /* an outlined footing tag: MODEL / NUM / ANALOGY …, colour by footing */
  function tag(x, y, s, col, a, o = {}) {
    if (a <= 0.003) return 0;
    const size = o.size || 16, w = tw(s, size, F.mono, 700, 2) + 24;
    const x0 = o.align === 'right' ? x - w : x;
    box(x0, y - size - 8, w, size + 16, col, a, 1.5, 'rgba(0,0,0,0.5)');
    txt(s, x0 + 12, y + 1, { size, fam: F.mono, w: 700, c: col, a, ls: 2 });
    return w;
  }
  /* LEAN ✓ chip for a cited theorem, by full GID */
  function lean(x, y, gid, a, size = 20) {
    if (a <= 0.003) return;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') return;
    const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
    fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
    txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
  }
  /* a gear-like ring: n ticks turning with angle t */
  function gear(cx, cy, r, t, n, col, a) {
    ring(cx, cy, r, col, a * 0.8, 2);
    for (let k = 0; k < n; k++) {
      const s = t + k * TAU / n, [x0, y0] = P(cx, cy, r, s), [x1, y1] = P(cx, cy, r + 16, s);
      line(x0, y0, x1, y1, col, a * 0.55, 4);
    }
  }
  /* coloured runs on one baseline */
  function rich(parts, x, y, o = {}) {
    const size = o.size || 28, fam = o.fam || F.mono, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
    for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
  }
  /* base angle θ (radians) of the lift scene at scene time u */
  function liftTheta(S) {
    const L1 = lineAt(S, 1), L2 = lineAt(S, 2), L4 = lineAt(S, 4);
    const q1 = ease(clamp((S.u - phraseAt(S, 1, 'a quarter')) / 1.6));
    const q2 = ease(clamp((S.u - L2.s - 0.3) / Math.max(0.5, L2.e - L2.s - 1.4)));
    const q4 = ease(clamp((S.u - L4.s - 0.2) / Math.max(0.5, L4.e - L4.s - 1.6)));
    if (S.u < L1.s) return 0;
    return (90 * q1 + 270 * q2 + 360 * q4) * DEG;
  }
  return { DEG, GID, LIFT, cexp, cmul, NET, TURN, vec, dotp, gram, fmt2, qmul, qinv, qdot, kappa, tri,
    Q1, QI, QJ, QK, QM, fade, P, arcPath, tag, lean, gear, rich, liftTheta };
})();

FILM.init.push(() => {
  Object.assign(FILM.speed, { a10_title: 0.02, a10_lift: 0.014, a10_sheet: 0.016, a10_net: 0.014, a10_axiom: 0.016, a10_ask: 0.02 });
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('act a10: ' + m); };
  const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;

  /* 0. this act's cited theorems at the pinned commit, looked up one GID at a time */
  for (const gid of Object.values(A10.GID)) {
    const r = leanCite(gid);
    if (!r) fail(`film.json does not cite ${gid}`);
    else if (r.kind !== 'theorem') fail(`${gid} is not a theorem at the pinned commit`);
  }

  /* 1. the lift table: w = e^{iθ/2} (the unique lift from 1), w² = e^{iθ} */
  for (const row of A10.LIFT) {
    const th = row.th * A10.DEG, w = A10.cexp(th / 2), z = A10.cexp(th), w2 = A10.cmul(w, w);
    if (!near(w[0], row.wv[0]) || !near(w[1], row.wv[1])) fail(`w at ${row.th}°`);
    if (!near(w2[0], z[0]) || !near(w2[1], z[1]) || !near(z[0], row.w2v[0]) || !near(z[1], row.w2v[1])) fail(`w² at ${row.th}°`);
  }
  /* the step of line 1: ((1 + i)/√2)² = i exactly in the printed sense */
  const e8 = A10.cmul([Math.SQRT1_2, Math.SQRT1_2], [Math.SQRT1_2, Math.SQRT1_2]);
  if (!near(e8[0], 0, 1e-15) || !near(e8[1], 1, 1e-15)) fail('((1 + i)/√2)² ≠ i');
  /* continuity of the lift along the whole 720°: consecutive samples within a small step */
  for (let k = 1; k <= 720; k++) {
    const a = A10.cexp((k - 1) * A10.DEG / 2), b = A10.cexp(k * A10.DEG / 2);
    if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 0.01) fail('lift jumps');
  }
  if (!near(Math.cos(180 * A10.DEG), -1) || !near(Math.cos(360 * A10.DEG), 1)) fail('signs of Re w');

  /* 2. the net: Gram entries 1, 1/2, −1/2 before and after the turn */
  const want = [[1, 0.5, -0.5], [0.5, 1, 0.5], [-0.5, 0.5, 1]];
  const G0 = A10.gram(A10.NET), G1 = A10.gram(A10.NET.map(d => d + A10.TURN));
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    if (!near(G0[i][j], want[i][j])) fail(`Gram (${i}, ${j}) = ${G0[i][j]}`);
    if (!near(G1[i][j], want[i][j])) fail(`turned Gram (${i}, ${j}) = ${G1[i][j]}`);
    if (A10.fmt2(G0[i][j]) !== A10.fmt2(want[i][j])) fail('printed Gram');
  }
  /* the turn is the unitary carrying A onto B: B = U A with U the 40° rotation */
  const c = Math.cos(A10.TURN * A10.DEG), s = Math.sin(A10.TURN * A10.DEG);
  A10.NET.forEach(d => {
    const a = A10.vec(d), b = A10.vec(d + A10.TURN), ua = [c * a[0] - s * a[1], s * a[0] + c * a[1]];
    if (!near(ua[0], b[0]) || !near(ua[1], b[1])) fail('U A ≠ B');
  });
  if (!near(c * c + s * s, 1)) fail('U is not unitary');

  /* 3. quaternions: readings, products and the transfer */
  const { kappa, qmul, tri, Q1, QI, QJ, QK, QM } = A10;
  if (!near(kappa(Q1, QI), 0.5) || !near(kappa(Q1, QM), 0) || !near(kappa(QI, QI), 1)) fail('readings');
  const ij = qmul(QI, QJ), ji = qmul(QJ, QI);
  if (ij.join() !== QK.join() || ji.map(v => v + 0).join() !== [0, 0, 0, -1].join()) fail('i j = k, j i = −k');
  /* the transfer: [x, y, x] gives x y⁻¹ x; [x, x, z] = z; and readings are kept by left multiplication */
  const r = [0.5, 0.5, 0.5, 0.5];
  if (tri(QI, QI, QJ).some((v, k) => !near(v, QJ[k]))) fail('[x, x, z] ≠ z');
  if (!near(kappa(qmul(r, QI), qmul(r, QJ)), kappa(QI, QJ))) fail('reading not kept');
  /* 4. the rotor at 360°: cos 180° + i sin 180° = −1, a unit quaternion */
  const rot = [Math.cos(Math.PI), Math.sin(Math.PI), 0, 0];
  if (!near(rot[0], -1) || !near(rot[1], 0, 1e-15) || !near(A10.qdot(rot, rot), 1)) fail('rotor at 360°');
});

/* ======================================================================= */
/*                          scene 1 · ONE TURN (title)                       */
/* ======================================================================= */
SCENES.a10_title = S => {
  SPINE.title(S, 10, '不二与归元', 'The observer is the field');
  const u = S.u, a = at(S, 0, 0.6) * clamp((S.d - u) / 0.5);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  const cx = 700, cy = 500, r = 230;
  const t = TAU * ease(clamp((u - phraseAt(S, 0, 'turn around once')) / 2.6));
  ring(cx, cy, r, C.cyan, a * 0.5, 2);
  A10.arcPath(cx, cy, r, 0, t, C.cyan, a, 4);
  const [px, py] = A10.P(cx, cy, r, t);
  dot(px, py, 14, 'g', a);
  txt('one turn · 一整圈', cx, cy + 10, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: a * 0.85 });
  /* the missing watcher: a ghost point C outside, struck through */
  const gx = 1260, gy = 330;
  const qa = Q(S, 0, 'nobody stands outside', 0.6) * a;
  ring(gx, gy, 16, C.dim, qa * 0.8, 2);
  txt('C', gx + 30, gy + 10, { size: 32, fam: F.orb, w: 900, c: C.dim, a: qa });
  line(gx - 40, gy + 40, gx + 70, gy - 40, C.white, qa * 0.8, 3);
  txt('no watcher outside', gx - 40, gy + 90, { size: 24, fam: F.mono, w: 700, c: C.dim, a: qa });
  txt('外面没有旁观者', gx - 40, gy + 130, { size: 28, fam: F.zh, w: 700, c: C.dim, a: qa });
  A10.tag(gx - 40, gy + 190, 'MODEL · 模型诠释', C.argued, qa);
  const qr = Q(S, 0, 'what comes back', 0.6) * a;
  txt('what comes back?', gx - 40, 640, { size: 40, fam: F.disp, w: 700, c: C.white, a: qr });
  txt('回来的是什么？', gx - 40, 700, { size: 40, fam: F.zh, w: 900, c: C.white, a: qr });
};

/* ======================================================================= */
/*                         scene 2 · HALF A TURN                             */
/* ======================================================================= */
SCENES.a10_lift = S => {
  const u = S.u, a = A10.fade(S);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  const th = A10.liftTheta(S), half = th / 2;
  const cx = 470, wy = 350, zy = 690, r = 110;
  /* the two wheels: w above, z = w² below */
  A10.gear(cx, wy, r, half, 8, C.argued, a);
  A10.gear(cx, zy, r, th, 8, C.cyan, a);
  txt('w', cx - r - 90, wy - 50, { size: 40, fam: F.math, w: 700, c: C.argued, a });
  txt('z = w²', cx - r - 160, zy + 12, { size: 36, fam: F.math, w: 700, c: C.cyan, a });
  arrow(cx, wy + r + 30, cx, zy - r - 30, C.white, a * 0.6, 2);
  txt('square · 平方', cx + 16, (wy + zy) / 2 + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * 0.7 });
  A10.tag(150, 200, 'ANALOGY · 2:1 DRIVE · 比方：二比一联动', C.argued, a * at(S, 0, 0.6));
  /* traces: the base path (cyan, may wrap twice) and the unique lift (violet) */
  A10.arcPath(cx, zy, r, 0, Math.min(th, TAU), C.cyan, a, 5);
  A10.arcPath(cx, wy, r, 0, half, C.argued, a, 6);
  const [zx, zyy] = A10.P(cx, zy, r, th), [wx, wyy] = A10.P(cx, wy, r, half);
  line(cx, zy, zx, zyy, C.cyan, a * 0.8, 2);
  line(cx, wy, wx, wyy, C.argued, a * 0.8, 2);
  dot(zx, zyy, 13, 'g', a); dot(wx, wyy, 13, 'g', a);
  /* the start and the end of the first turn on the upper wheel */
  txt('+1', cx + r + 18, wy + 10, { size: 26, fam: F.mono, w: 700, c: C.white, a: a * 0.8 });
  const qm = Q(S, 2, 'minus one', 0.5) * a;
  const back = at(S, 4, 0.6);
  txt('−1', cx - r - 70, wy + 52, { size: 30, fam: F.mono, w: 700, c: back > 0.5 ? C.white : C.now, a: qm * (1 - 0.3 * back) });

  /* the table */
  const x = 900, y = 190, w = 830, h = 470;
  panel(x, y, w, h, a, C.cyan, 'HALF A TURN · 半圈  ·  w = e^(iθ/2)');
  A10.tag(x + w - 24, y + 70, 'NUM · 屏幕计算', C.cyan, a, { align: 'right' });
  const cols = [x + 40, x + 240, x + 600];
  txt('θ of z', cols[0], y + 120, { size: 22, fam: F.mono, w: 700, c: C.dim, a });
  txt('w', cols[1], y + 120, { size: 22, fam: F.mono, w: 700, c: C.argued, a });
  txt('w²', cols[2], y + 120, { size: 22, fam: F.mono, w: 700, c: C.cyan, a });
  const deg = th / A10.DEG;
  let cur = -1;
  A10.LIFT.forEach((row, k) => { if (deg >= row.th - 0.01 && (k < 5 || u > lineAt(S, 4).s)) cur = k; });
  A10.LIFT.forEach((row, k) => {
    const show = k <= cur ? 1 : 0, ry = y + 170 + k * 52;
    if (!show) return;
    const now = k === cur, col = now ? C.now : C.white;
    if (now) fillBox(x + 20, ry - 36, w - 40, 48, C.now, 0.12 * a);
    txt(`${row.th}°`, cols[0], ry, { size: 28, fam: F.mono, w: 700, c: col, a });
    txt(row.w, cols[1], ry, { size: 28, fam: F.mono, w: 700, c: now ? C.now : C.argued, a });
    txt(row.w2, cols[2], ry, { size: 28, fam: F.mono, w: 700, c: now ? C.now : C.cyan, a });
  });
  /* the Lean statement */
  const ql = at(S, 3, 0.6) * a;
  if (ql > 0) {
    panel(x, y + h + 24, w, 140, ql, C.lean);
    A10.lean(x + 24, y + h + 70, A10.GID.lift, ql);
    txt('lift of one full turn from 1: unique, continuous, ends at −1', x + 24, y + h + 108, { size: 21, fam: F.mono, w: 700, c: C.white, a: ql });
    txt('从 1 出发提升一整圈：唯一、连续，终点 −1', x + 24, y + h + 142, { size: 24, fam: F.zh, w: 700, c: C.white, a: ql * 0.9 });
  }
  const q4 = Q(S, 4, 'It takes', 0.6) * a;
  txt('720°', cx + r + 50, zy - 30, { size: 64, fam: F.orb, w: 900, c: C.now, a: q4, ab: 2 });
  txt('hand step · 手算', cx + r + 54, zy + 14, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: q4 * 0.85 });
};

/* ======================================================================= */
/*                        scene 3 · THE OTHER SHEET                          */
/* ======================================================================= */
SCENES.a10_sheet = S => {
  const u = S.u, a = A10.fade(S);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  /* one turn during line 1 */
  /* one full turn while line 0 asks why we thought it changes nothing */
  const th = TAU * ease(clamp((u - phraseAt(S, 0, 'a full turn') - 0.2) / 3.2));
  const cx = 560, cy = 700, R = 300, k = 0.22, hh = 110;
  /* base circle seen in perspective, and the lifted curve over it: height ∝ Re w = cos(θ/2) */
  const base = s => [cx + R * Math.cos(s), cy + R * k * Math.sin(s)];
  const lift = s => [cx + R * Math.cos(s), cy + R * k * Math.sin(s) - 250 - hh * Math.cos(s / 2)];
  curve(q => base(q * TAU), 120, C.cyan, a * 0.5, 2);
  curve(q => lift(q * 2 * TAU), 240, C.argued, a * 0.35, 2);
  curve(q => lift(q * th), Math.max(2, Math.ceil(120 * th / TAU)), C.argued, a, 5);
  /* the arrow (the world) at the base point, and the sign of w (the turner) */
  const [bx, by] = base(th), [lx, ly] = lift(th);
  arrow(bx, by, bx + 70 * Math.cos(th), by + 70 * k * Math.sin(th) - 60, C.cyan, a, 3);
  dashed(bx, by, lx, ly, C.dim, a * 0.6, 1.5);
  dot(lx, ly, 14, 'g', a);
  const sgn = Math.cos(th / 2);
  const [sx, sy] = lift(0);
  txt('+1 sheet · 正叶', sx + 30, sy + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * 0.7 });
  const [mx, my] = lift(TAU);
  txt('−1 sheet · 负叶', mx + 30, my + 8, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * 0.7 });

  /* the two readings */
  const x = 1120, y = 200, w = 610, h = 330;
  panel(x, y, w, h, a, C.argued, 'AFTER ONE TURN · 转满一圈之后');
  A10.tag(x + w - 24, y + 70, 'MODEL · 模型诠释', C.argued, a, { align: 'right' });
  const done = clamp((th - TAU + 0.02) / 0.02) * Q(S, 1, 'is back', 0.5);
  const q1 = Q(S, 1, 'The arrow', 0.5) * a;
  A10.rich([['arrow · 世界   ', C.cyan], [done > 0.5 ? 'back · 回来了' : '…', C.white]], x + 30, y + 140, { size: 25, fam: F.mono, a: q1 });
  const q2 = Q(S, 1, 'The turner', 0.5) * a;
  A10.rich([['turner · 转动者   ', C.argued], ['sign flipped · 变号', C.now]], x + 30, y + 210, { size: 25, fam: F.mono, a: q2 });
  txt(`Re w = cos(θ/2) = ${sgn < 0 ? '−' : '+'}${Math.abs(sgn).toFixed(2)}`, x + 30, y + 270, { size: 22, fam: F.mono, w: 700, c: C.now, a: a * at(S, 0, 0.6) });
  txt('computed · 屏幕计算', x + 30, y + 306, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: a * at(S, 0, 0.6) * 0.85 });
  /* the aphorism */
  const qa = at(S, 2, 0.8);
  if (qa > 0) {
    stamp('ONE TURN · THE WORLD', 1460, 640, qa, C.argued, 36, -0.05);
    txt('TWO TURNS · THE ONE WHO TURNS', 1460, 740, { size: 30, fam: F.orb, w: 900, align: 'center', c: C.argued, a: a * at(S, 2, 0.6, 1.2) });
    txt('一圈，世界回来；两圈，转动的人才回来', 1460, 790, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * at(S, 2, 0.6, 1.4) });
  }
};

/* ======================================================================= */
/*                           scene 4 · INDRA'S NET                           */
/* ======================================================================= */
SCENES.a10_net = S => {
  const u = S.u, a = A10.fade(S);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  const cx = 540, cy = 520, r = 250;
  /* the metaphor: a faint lattice of jewels (Indra's net), brightest during line 0 */
  const qn = (0.25 + 0.75 * (1 - at(S, 1, 1.0))) * at(S, 0, 0.8) * a;
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) {
    const x = cx + i * 118 + (j % 2 ? 59 : 0), y = cy + j * 102;
    if (x < 160 || x > 940 || y < 190 || y > 830) continue;
    dot(x, y, 6, 'v', qn * 0.7);
    if (i < 3) line(x, y, x + 118, y, C.argued, qn * 0.18, 1);
    if (j < 3) line(x, y, x + 59, y + 102, C.argued, qn * 0.18, 1);
  }
  A10.tag(170, 200, "INDRA'S NET · MODEL · 因陀罗网", C.argued, at(S, 0, 0.6) * a);
  /* three jewels as unit vectors; the turn of all three together during line 2 */
  const qv = Q(S, 1, 'no addresses', 0.6) * a;
  const rho = A10.TURN * ease(clamp((u - lineAt(S, 2).s - 0.3) / 2.2));
  const turned = rho > 0.01;
  if (qv > 0) {
    ring(cx, cy, r, C.cyan, qv * 0.25, 1.5);
    if (turned) A10.NET.forEach(d => { const [x, y] = A10.P(cx, cy, r, d * A10.DEG); dashed(cx, cy, x, y, C.dim, qv * 0.6, 1.5); dot(x, y, 7, 'w', qv * 0.4); });
    const pts = A10.NET.map(d => A10.P(cx, cy, r, (d + rho) * A10.DEG));
    const G = A10.gram(A10.NET.map(d => d + rho));
    const qo = Q(S, 1, 'how much each pair overlaps', 0.6) * a;
    [[0, 1], [1, 2], [0, 2]].forEach(([i, j]) => {
      line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], C.cyan, qo * 0.55, 1.5);
      const mx = (pts[i][0] + pts[j][0]) / 2, my = (pts[i][1] + pts[j][1]) / 2;
      const ox = mx - cx, oy = my - cy, n = Math.hypot(ox, oy) || 1;
      const far = i === 0 && j === 2;
      const lx = far ? cx - (ox / n) * 70 : mx + (ox / n) * 44, ly = far ? cy - (oy / n) * 70 : my + (oy / n) * 44;
      if (far) dashed(mx, my, lx, ly, C.cyan, qo * 0.5, 1.2);
      chip(lx, ly, 96, 40, A10.fmt2(G[i][j]), C.cyan, qo, 22);
    });
    pts.forEach(([x, y], k) => {
      line(cx, cy, x, y, C.cyan, qv, 3);
      dot(x, y, 15, 'c', qv);
      const ox = x - cx, oy = y - cy, n = Math.hypot(ox, oy) || 1;
      txt(`v${'₁₂₃'[k]}`, x + (ox / n) * 34 - 14, y + (oy / n) * 34 + 10, { size: 28, fam: F.math, w: 700, c: C.white, a: qv });
    });
    if (turned) txt(`turned ${rho.toFixed(0)}° · 整体转 ${rho.toFixed(0)}°`, cx - 160, cy + r + 50, { size: 24, fam: F.mono, w: 700, c: C.now, a: qv });
  }
  /* the overlap table, read live from the drawn vectors */
  const x = 1040, y = 190, w = 690, h = 350;
  const qt = Q(S, 1, 'how much each pair overlaps', 0.6) * a;
  panel(x, y, w, h, qt, C.cyan, 'OVERLAPS ⟨vᵢ, vⱼ⟩ · 两两重叠');
  A10.tag(x + w - 24, y + 70, 'NUM · 屏幕计算', C.cyan, qt, { align: 'right' });
  if (qt > 0) {
    const G = A10.gram(A10.NET.map(d => d + rho));
    for (let i = 0; i < 3; i++) {
      txt(`v${'₁₂₃'[i]}`, x + 60, y + 170 + i * 52, { size: 26, fam: F.math, w: 700, c: C.dim, a: qt });
      txt(`v${'₁₂₃'[i]}`, x + 200 + i * 150, y + 120, { size: 26, fam: F.math, w: 700, c: C.dim, a: qt });
      for (let j = 0; j < 3; j++) txt(A10.fmt2(G[i][j]), x + 300 + j * 150, y + 170 + i * 52, { size: 28, fam: F.mono, w: 700, align: 'right', c: C.white, a: qt });
    }
    const qs = Q(S, 2, 'stays the same', 0.5) * a;
    txt('after the turn: unchanged · 转后不变', x + 30, y + h - 22, { size: 22, fam: F.mono, w: 700, c: C.now, a: qs });
  }
  /* the Lean statement */
  const ql = at(S, 3, 0.6) * a;
  if (ql > 0) {
    panel(x, y + h + 24, w, 170, ql, C.lean);
    A10.lean(x + 24, y + h + 70, A10.GID.gram, ql, 17);
    txt('Bᴴ B = Aᴴ A   ⟹   B = U A,  U unitary', x + 24, y + h + 120, { size: 26, fam: F.math, w: 700, c: C.white, a: ql });
    txt('重叠表相同 ⟹ 只差一个幺正变换', x + 24, y + h + 160, { size: 24, fam: F.zh, w: 700, c: C.white, a: ql * 0.9 });
  }
  const qm = at(S, 4, 0.6) * a;
  if (qm > 0) {
    A10.tag(x, y + h + 250, 'MODEL · 模型诠释', C.argued, qm);
    txt('left over: one unitary move of all, unseen inside', x, y + h + 296, { size: 22, fam: F.mono, w: 700, c: C.argued, a: qm });
  }
};

/* ======================================================================= */
/*                             scene 5 · NO RULER                            */
/* ======================================================================= */
SCENES.a10_axiom = S => {
  const u = S.u, a = A10.fade(S);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  /* the ruler, thrown away */
  const qr = a * (1 - 0.75 * at(S, 1, 0.8));
  const rx = 150, ry = 210, rw = 720;
  box(rx, ry, rw, 56, C.white, qr * 0.6, 1.5, 'rgba(0,0,0,0.3)');
  for (let k = 0; k <= 24; k++) line(rx + k * rw / 24, ry, rx + k * rw / 24, ry + (k % 6 ? 14 : 28), C.white, qr * 0.6, 1.5);
  txt('0', rx + 4, ry + 50, { size: 18, fam: F.mono, w: 700, c: C.white, a: qr * 0.7 });
  const qx = Q(S, 0, 'throws away the ruler', 0.5) * a;
  line(rx - 10, ry + 70, rx + rw + 10, ry - 14, C.white, qx * 0.85, 4);
  txt('no ruler, no origin · 无尺，无原点', rx, ry + 110, { size: 24, fam: F.mono, w: 700, c: C.dim, a: qx });

  /* the two moves */
  const x = 130, y = 360, w = 780, h = 470;
  const qm = at(S, 1, 0.6) * a;
  panel(x, y, w, h, qm, C.cyan, 'TWO MOVES · 两个动作');
  if (qm > 0) {
    /* carry: the step from y to x, copied onto z */
    const Y = [x + 70, y + 190], X = [x + 230, y + 100], Z = [x + 110, y + 270], T = [Z[0] + X[0] - Y[0], Z[1] + X[1] - Y[1]];
    const qc = Q(S, 1, 'carry the step', 0.5) * a;
    arrow(Y[0], Y[1], X[0], X[1], C.cyan, qc, 3);
    const qd = Q(S, 1, 'onto z', 0.5) * a;
    ctx.save(); ctx.setLineDash([9, 8]); arrow(Z[0], Z[1], T[0], T[1], C.cyan, qd, 3); ctx.restore();
    [[Y, 'y'], [X, 'x'], [Z, 'z']].forEach(([p, s]) => { dot(p[0], p[1], 10, 'w', qc); txt(s, p[0] - 30, p[1] + 8, { size: 26, fam: F.math, w: 700, c: C.white, a: qc }); });
    dot(T[0], T[1], 10, 'c', qd);
    txt('[x, y, z] = x y⁻¹ z', x + 340, y + 170, { size: 32, fam: F.math, w: 700, c: C.cyan, a: qd });
    txt('carry · 搬运', x + 340, y + 215, { size: 22, fam: F.mono, w: 700, c: C.dim, a: qd });
    const qp = Q(S, 1, 'a few rules', 0.5) * a;
    txt('+ rules · 规矩: [x,x,z]=z  [x,z,z]=x', x + 340, y + 246, { size: 15, fam: F.mono, w: 700, c: C.white, a: qp * 0.8 });
    txt('associative · κ symmetric · κ=1 ⟺ same', x + 340, y + 266, { size: 15, fam: F.mono, w: 700, c: C.white, a: qp * 0.8 });
    txt('κ≥0 · carrying keeps κ · Gram ≥ 0', x + 340, y + 286, { size: 15, fam: F.mono, w: 700, c: C.white, a: qp * 0.8 });
    /* the reading */
    const qk = Q(S, 1, 'read how alike', 0.5) * a;
    const bx = x + 40, by = y + 320, bw = 300;
    line(bx, by, bx + bw, by, C.cyan, qk, 3);
    txt('0', bx - 6, by + 34, { size: 22, fam: F.mono, w: 700, c: C.white, a: qk });
    txt('1', bx + bw - 6, by + 34, { size: 22, fam: F.mono, w: 700, c: C.white, a: qk });
    txt('κ(x, y)', bx + bw + 30, by + 10, { size: 32, fam: F.math, w: 700, c: C.cyan, a: qk });
    txt('read · 读数   1 = same · 同一点', bx + bw + 30, by + 50, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qk });
    /* the readings on unit quaternions */
    const q2 = at(S, 2, 0.6) * a;
    A10.tag(x + w - 24, y + 70, 'NUM · 屏幕计算', C.cyan, q2, { align: 'right' });
    txt('κ(p, q) = (1 + ⟨p, q⟩)/2', bx, y + 395, { size: 26, fam: F.math, w: 700, c: C.white, a: q2 });
    const q3 = Q(S, 2, 'one and i', 0.5) * a;
    A10.rich([['κ(1, i) = ', C.white], [A10.kappa(A10.Q1, A10.QI) === 0.5 ? '1/2' : '?', C.cyan], ['   κ(1, −1) = ', C.white], [`${A10.kappa(A10.Q1, A10.QM)}`, C.cyan]], bx, y + 445, { size: 26, fam: F.math, a: q3 });
  }

  /* the five asks */
  const rx2 = 980, ry2 = 190, rw2 = 750, rh2 = 360;
  const qf = at(S, 3, 0.6) * a;
  panel(rx2, ry2, rw2, rh2, qf, C.cyan, 'FIVE ASKS · 五条要求');
  txt('on top of the rules of a ternary comparison · 在三元比较结构的规矩之上', rx2 + 30, ry2 + 64, { size: 17, fam: F.zh, w: 700, c: C.dim, a: qf });
  const asks = [
    [3, 'Order matters', 'order matters', 'Noncommutative', '次序有关'],
    [3, 'small steps', 'small steps join', 'ChainConnected', '小步连通'],
    [4, 'as near zero', 'readings near 0', 'TouchesZero', '读数近零'],
    [4, 'five numbers', 'κ = dot of 5 numbers', 'HasFeatureRank 5', '五数点积'],
    [5, 'no limit is missing', 'no gaps', 'ReadingComplete', '没有缺口']
  ];
  asks.forEach(([k, ph, en, ln, zh], i) => {
    const q = Q(S, k, ph, 0.5) * a;
    const yy = ry2 + 112 + i * 50;
    txt(`${i + 1}`, rx2 + 30, yy, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: q });
    txt(en, rx2 + 64, yy, { size: 24, fam: F.mono, w: 700, c: C.white, a: q });
    txt(zh, rx2 + 380, yy, { size: 24, fam: F.zh, w: 700, c: C.white, a: q * 0.9 });
    txt(ln, rx2 + rw2 - 30, yy, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: q });
  });
  /* the conclusion */
  const ql = Q(S, 5, 'Then Lean checks', 0.6) * a;
  if (ql > 0) {
    panel(rx2, ry2 + rh2 + 24, rw2, 180, ql, C.lean);
    A10.lean(rx2 + 24, ry2 + rh2 + 72, A10.GID.quat, ql);
    txt('rules + five asks  ⟹  ≅ unit quaternions,  o ↦ 1', rx2 + 24, ry2 + rh2 + 124, { size: 26, fam: F.math, w: 700, c: C.white, a: ql });
    txt('keeps [x, y, z] and κ · 保持搬运与读数，一点对一点', rx2 + 24, ry2 + rh2 + 166, { size: 22, fam: F.zh, w: 700, c: C.white, a: ql * 0.9 });
  }
  const qa = at(S, 6, 0.6) * a;
  if (qa > 0) {
    A10.tag(rx2, ry2 + rh2 + 260, 'AXIOM-Ω AS NATURE · MODEL', C.argued, qa);
    txt('公理本身：模型，不是证明', rx2 + 390, ry2 + rh2 + 260, { size: 26, fam: F.zh, w: 700, c: C.argued, a: qa });
  }
};

/* ======================================================================= */
/*                          scene 6 · NO SEAT OUTSIDE                        */
/* ======================================================================= */
SCENES.a10_ask = S => {
  const u = S.u, a = A10.fade(S);
  SPINE.rail(S, 10, a);
  if (a <= 0.003) return;
  const cx = 960, cy = 400, R = 190;
  /* the unit-quaternion sphere, drawn as a glowing ball with a few meridians */
  ctx.save(); ctx.globalAlpha = a * 0.5;
  const g = ctx.createRadialGradient(cx - 60, cy - 70, 10, cx, cy, R);
  g.addColorStop(0, rgba(C.cyan, 0.35)); g.addColorStop(1, rgba(C.cyan, 0.03));
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fill(); ctx.restore();
  ring(cx, cy, R, C.cyan, a * 0.8, 2);
  for (let m = 0; m < 6; m++) {
    const sx = Math.cos((m * 30 + 12 * u) * A10.DEG);
    curve(q => { const s = -Math.PI / 2 + q * Math.PI; return [cx + R * Math.cos(s) * sx, cy + R * Math.sin(s)]; }, 48, C.cyan, a * 0.22, 1);
  }
  curve(q => [cx + R * Math.cos(q * TAU), cy + R * 0.28 * Math.sin(q * TAU)], 80, C.cyan, a * 0.22, 1);
  txt('S³, drawn as a ball · 示意', cx - R - 30, cy + R - 10, { size: 18, fam: F.mono, w: 700, align: 'right', c: C.dim, a: a * 0.8 });
  txt('Sp(1) · unit quaternions · 单位四元数', cx, cy + R + 50, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: a * 0.85 });
  /* the half turn from 1 to −1, along the front meridian */
  const qh = ease(clamp(u / 2.2));
  curve(q => { const s = -Math.PI / 2 + q * qh * Math.PI; return [cx + R * 0.55 * Math.cos(s), cy + R * Math.sin(s)]; }, 60, C.argued, a, 5);
  dot(cx, cy - R, 12, 'w', a); txt('1', cx + 18, cy - R - 10, { size: 28, fam: F.mono, w: 700, c: C.white, a });
  const qe = clamp((qh - 0.98) / 0.02) * a;
  dot(cx, cy + R, 14, 'g', qe); txt('−1', cx - 84, cy + R + 14, { size: 30, fam: F.mono, w: 700, c: C.now, a: qe });
  const q0 = Q(S, 0, 'is a point', 0.5) * a;
  A10.tag(cx + R + 60, cy + 120, 'NUM · 屏幕计算', C.cyan, q0);
  txt('cos 180° + i sin 180° = −1', cx + R + 60, cy + 170, { size: 26, fam: F.math, w: 700, c: C.white, a: q0 });
  /* no seat outside: the ghost watcher C, struck */
  const qs = Q(S, 0, "No watcher's seat", 0.5) * a;
  const gx = 520, gy = 300;
  ring(gx, gy, 16, C.dim, qs * 0.8, 2);
  txt('C', gx + 30, gy + 10, { size: 32, fam: F.orb, w: 900, c: C.dim, a: qs });
  line(gx - 40, gy + 40, gx + 70, gy - 40, C.white, qs * 0.8, 3);
  txt('no watcher\'s seat outside', gx - 160, gy + 90, { size: 24, fam: F.mono, w: 700, c: C.dim, a: qs });
  txt('球外没有旁观者的座位', gx - 160, gy + 128, { size: 26, fam: F.zh, w: 700, c: C.dim, a: qs });
  A10.tag(gx - 160, gy + 186, 'MODEL · 模型诠释', C.argued, qs);
  /* the aphorism, marked as the chapter's model */
  const qa = at(S, 1, 0.6) * a * (1 - 0.6 * at(S, 2, 0.6));
  A10.tag(cx + R + 60, cy - 120, 'MODEL · 模型诠释', C.argued, qa);
  txt('THE OBSERVER', cx + R + 60, cy - 66, { size: 34, fam: F.orb, w: 900, c: C.argued, a: qa, ab: 1.5 });
  txt('IS THE FIELD', cx + R + 60, cy - 22, { size: 34, fam: F.orb, w: 900, c: C.argued, a: qa, ab: 1.5 });
  txt('观察者就是场', cx + R + 60, cy + 34, { size: 40, fam: F.zh, w: 900, c: C.white, a: qa });
  SPINE.ask(S, 2, 'Then what lies outside every sphere?', '那么，在所有的球之外，是什么？');
};

/* ---- a11 · Outside every sphere · 在所有的球之外 ---- */
/* Act a11 · the coda · Outside every sphere · 在所有的球之外.
   Every name of this act lives in A11; the scenes are SCENES.a11_*. */
const A11 = (() => {
  const IDX = 11;
  const fade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
  const GID = {
    born: 'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction',
    lagrange: 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
    twoAxis: 'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
    chsh: 'D5/S3/QuantumBounds/TsirelsonTightness.bell_chsh_state_expectation_is_greatest',
    null: 'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
    golden: 'D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique',
    gram: 'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
    tail: 'D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le',
    diag: 'D5/S0/Diagonal/EscapeCount.diagonal_landing_fixed',
    lift: 'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
    stop: 'D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize'
  };

  /* coloured runs of text: [[string, colour, font?], …] */
  function rich(parts, x, y, o = {}) {
    const size = o.size || 28, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
    let cx = x;
    if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, p[2] || fam, w), 0) / 2;
    for (const [s, col, f] of parts) { txt(s, cx, y, { size, fam: f || fam, w, c: col, a }); cx += tw(s, size, f || fam, w); }
    return cx;
  }
  /* green LEAN ✓ head for one cited theorem (looked up by its whole GID); o.name: also show its short name */
  const missing = new Set();
  function lean(x, y, gid, a, o = {}) {
    if (a <= 0.003) return x;
    const r = leanCite(gid);
    if (!r || r.kind !== 'theorem') {
      if (!missing.has(gid)) { missing.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
      return x;
    }
    const size = o.size || 16, head = STR.en.lean || 'LEAN ✓', wh = tw(head, size, F.mono, 700, 1) + 16;
    fillBox(x, y - size * 1.05, wh, size * 1.45, C.lean, a);
    txt(head, x + 8, y - size * 0.05, { size, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
    if (o.name) txt(r.short, x + wh + 12, y, { size: size * 1.05, fam: F.mono, w: 700, c: C.lean, a });
    return x + wh + 12;
  }
  /* a small tier tag: READING (violet), NUM (cyan), OPEN (red), ANALOGY (violet) */
  function tag(x, y, s, col, a, size = 16) {
    if (a <= 0.003) return x;
    const w = tw(s, size, F.zh, 700, 1) + 20;
    box(x, y - size * 1.05, w, size * 1.5, col, a, 1.5, 'rgba(0,0,0,0.55)');
    txt(s, x + 10, y, { size, fam: F.zh, w: 700, c: col, a, ls: 1 });
    return x + w + 10;
  }
  function arcPath(cx, cy, r, a0, a1, col, a, lw = 2, dash = null) {
    if (a <= 0.003) return;
    ctx.save(); ctx.globalAlpha = a; if (dash) ctx.setLineDash(dash);
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.arc(cx, cy, r, a0, a1, a1 < a0); ctx.stroke(); ctx.restore();
  }

  /* ---- the bag of cards: a take-only rule on the finite set {2, …, 9} ---- */
  const CARDS = [2, 3, 4, 5, 6, 7, 8, 9];
  /* U(A): remove the largest card a that some smaller card b of A divides; otherwise leave A alone. U(A) ⊆ A. */
  function U(A) {
    const off = A.filter(a => A.some(b => b < a && a % b === 0));
    if (!off.length) return A.slice();
    const m = Math.max(...off);
    return A.filter(a => a !== m);
  }
  const RUN = (() => { const r = [CARDS.slice()]; for (let k = 0; k < 6; k++) r.push(U(r[r.length - 1])); return r; })();
  const SIZES = RUN.map(r => r.length);
  /* the round in which each card leaves (1-based), or 0 if it stays */
  const LEAVES = Object.fromEntries(CARDS.map(c => [c, RUN.findIndex(r => !r.includes(c))]).map(([c, k]) => [c, k < 0 ? 0 : k]));
  const CHANGES = RUN.slice(0, -1).filter((r, k) => r.join() !== RUN[k + 1].join()).length;
  const N = RUN.findIndex((r, k) => RUN.slice(k).every(q => q.join() === r.join()));

  /* ---- the ledger: one row per rung of the position rail ---- */
  /* key: the rung's reading (violet, from SPINE.PARTS); st: the row's statement; g: LEAN gid or null; red: open item */
  const ROWS = [
    { st: [['no ruler outside: a state is measured by a state', 'v'], ['  态只由态来丈量', 'v', 'zh']], g: null },
    { st: [['pure state, rank-one record: weight = |⟨φ|ψ⟩|²', 'g']], g: GID.born },
    { st: [['|u|²|v|² − (u·v)² = area²', 'g'], ['  线² + 面² = 长度平方之积', 'g', 'zh']], g: GID.lagrange },
    { st: [['two non-parallel axes: any det-1 R is a finite word', 'g']], g: GID.twoAxis },
    { st: [['fixed CHSH settings: max over all states = 2√2', 'g'], ['  可达', 'g', 'zh']], g: GID.chsh },
    { st: [['S = 0 on every light ray ⟹ S = S(1,0) · interval', 'g']], g: GID.null },
    { st: [['x ↦ 1 + 1/x: φ is the only positive fixed point', 'g']], g: GID.golden },
    { st: [['unit records: ⟨a, b⟩ = 1 ⟺ a = b', 'g']], g: GID.gram, red: 'P vs NP · OPEN' },
    { st: [['‖z‖ ≤ r ⟹ ‖eᶻ − first n terms‖ ≤ rⁿ/n! · eʳ', 'g']], g: GID.tail },
    { st: [['a row = the twisted diagonal ⟹ a fixed point', 'g']], g: GID.diag },
    { st: [['z ↦ z²: one turn below lifts from 1 to −1', 'g']], g: GID.lift },
    { st: [['U(A) ⊆ A on a finite set ⟹ it stops', 'g'], ['  只删不添，终将停下', 'g', 'zh']], g: GID.stop }
  ];
  const TALLY = ROWS.map(r => ({ g: r.g ? 1 : 0, v: 1, r: r.red ? 1 : 0 }));
  const TOTAL = TALLY.reduce((s, t) => ({ g: s.g + t.g, v: s.v + t.v, r: s.r + t.r }), { g: 0, v: 0, r: 0 });

  return { IDX, fade, GID, rich, lean, tag, arcPath, CARDS, U, RUN, SIZES, LEAVES, CHANGES, N, ROWS, TALLY, TOTAL };
})();

/* independent checks of every number the act shows */
FILM.init.push(() => {
  const fail = m => { throw new Error(`a11: ${m}`); };
  /* re-run the take-only rule by a second route: count divisors directly */
  let A = [2, 3, 4, 5, 6, 7, 8, 9]; const sizes = [A.length], gone = [];
  for (let step = 0; step < 10; step++) {
    let pick = -1;
    for (const a of A) { let hit = false; for (const b of A) if (b < a && a % b === 0) hit = true; if (hit && a > pick) pick = a; }
    if (pick < 0) break;
    A = A.filter(x => x !== pick); gone.push(pick); sizes.push(A.length);
  }
  if (gone.join() !== '9,8,6,4') fail('cards leave as 9, 8, 6, 4');
  if (A.join() !== '2,3,5,7') fail('2, 3, 5, 7 stay');
  if (A11.SIZES.slice(0, 6).join() !== '8,7,6,5,4,4') fail('sizes 8, 7, 6, 5, 4, 4');
  if (A11.N !== 4 || A11.CHANGES !== 4 || A11.N > 8 || A11.CHANGES > 8) fail('N = 4, four changes, both ≤ 8');
  if (A11.RUN[4].join() !== '2,3,5,7' || A11.RUN[6].join() !== '2,3,5,7') fail('the run rests at the primes');
  for (const r of A11.RUN.slice(1)) if (!r.every(x => A11.RUN[0].includes(x))) fail('U(A) ⊆ A');
  if (A11.ROWS.length !== SPINE.PARTS.length) fail('one ledger row per rung');
  const T = A11.TOTAL;
  if (T.g !== 11 || T.v !== 12 || T.r !== 1) fail('tally 11 green, 12 violet, 1 red');
  const gids = A11.ROWS.filter(r => r.g).map(r => r.g);
  if (new Set(gids).size !== 11) fail('eleven distinct anchors');
  for (const g of gids) { const r = leanCite(g); if (!r || r.kind !== 'theorem') fail(`film.json must cite the theorem ${g}`); }
});

/* ======================================================================= */
/*                     a11_title · the next nesting doll?                   */
/* ======================================================================= */
SCENES.a11_title = S => {
  SPINE.title(S, 11, '在所有的球之外', 'Outside every sphere');
  const a = at(S, 0, 0.6) * clamp((S.d - S.u) / 0.5);
  SPINE.rail(S, 11, a);
  if (a <= 0.003) return;
  const cx = 600, cy = 520;
  /* the climb so far, drawn nested: point, line, plane, sphere, and the doll that seems to wait outside */
  const z = lerp(1.25, 1.0, ease(at(S, 0, 3.5)));
  const R = [40, 110, 210].map(r => r * z), Rq = 280 * z;
  dot(cx, cy, 9, 'c', a);
  line(cx - R[0], cy, cx + R[0], cy, C.cyan, a, 3);
  ctx.save(); ctx.globalAlpha = a * 0.2; ctx.fillStyle = C.mag; ctx.beginPath(); ctx.arc(cx, cy, R[1], 0, TAU); ctx.fill(); ctx.restore();
  ring(cx, cy, R[1], C.mag, a * 0.8, 2);
  ring(cx, cy, R[2], C.white, a * 0.8, 2.5);
  ctx.save(); ctx.globalAlpha = a * 0.45; ctx.strokeStyle = C.white; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.ellipse(cx, cy, R[2], R[2] * 0.3, 0, 0, TAU); ctx.stroke(); ctx.restore();
  A11.rich([['point → line → plane → sphere', C.dim, F.mono], ['  点 → 线 → 面 → 球', C.dim, F.zh]], cx, 200, { size: 20, a: a * 0.95, align: 'center' });
  /* line 0: the next doll, dashed, with a question mark */
  const qa = a * Q(S, 0, 'nesting doll', 0.6);
  A11.arcPath(cx, cy, Rq, 0, TAU, C.argued, qa, 2.5, [12, 10]);
  txt('?', cx + Rq * 0.78, cy - Rq * 0.78, { size: 64, fam: F.orb, w: 900, align: 'center', c: C.argued, a: qa });
  /* right column: the analogy */
  const pa = a * at(S, 0, 0.8);
  panel(1060, 210, 760, 230, pa, C.argued, 'ANALOGY · 比方');
  txt('every doll sits inside a bigger one', 1088, 292, { size: 28, fam: F.math, w: 700, c: C.white, a: pa });
  txt('套娃：每个娃娃外面，都还套着更大的一个', 1088, 338, { size: 28, fam: F.zh, w: 700, c: C.white, a: pa });
  txt('shell ↔ sphere  ·  壳 ↔ 球', 1088, 398, { size: 24, fam: F.zh, w: 700, c: C.argued, a: pa * Q(S, 0, 'nesting doll', 0.6) });
  /* line 1: a finite sphere is faceted; its gaps point further out */
  const fa = a * at(S, 1, 0.8);
  if (fa > 0.003) {
    const n = 10, r = R[2];
    const pts = []; for (let i = 0; i <= n; i++) { const t = -Math.PI / 2 + TAU * i / n; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
    ctx.save(); ctx.globalAlpha = fa; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
    ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke();
    /* the slivers between each flat face and the round sphere */
    for (let i = 0; i < n; i++) {
      const t0 = -Math.PI / 2 + TAU * i / n, t1 = t0 + TAU / n;
      ctx.fillStyle = rgba(C.mag, 0.45); ctx.beginPath(); ctx.arc(cx, cy, r, t0, t1); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
    const ga = fa * Q(S, 1, 'pointing further out', 0.6);
    const tm = -Math.PI / 2 + TAU * 1.5 / n;
    arrow(cx + (r + 8) * Math.cos(tm), cy + (r + 8) * Math.sin(tm), cx + (Rq + 40) * Math.cos(tm), cy + (Rq + 40) * Math.sin(tm), C.mag, ga, 3.5);
    panel(1060, 480, 740, 250, fa, C.argued, 'READING · 读法 · coda C.1');
    txt('a sphere closed from finitely many flat faces', 1088, 560, { size: 26, fam: F.math, w: 700, c: C.white, a: fa });
    txt('keeps a gap: the remainder points outward', 1088, 600, { size: 26, fam: F.math, w: 700, c: C.mag, a: fa });
    txt('有限个平面拼成的球留着缝，余项指向更外', 1088, 650, { size: 26, fam: F.zh, w: 700, c: C.white, a: fa });
    A11.tag(1088, 702, 'interpretation, not a theorem · 诠释，不是定理', C.argued, fa);
  }
};

/* ======================================================================= */
/*                     a11_compare · the one who compares                   */
/* ======================================================================= */
SCENES.a11_compare = S => {
  const a = A11.fade(S);
  SPINE.rail(S, 11, a);
  if (a <= 0.003) return;
  const cx = 560, cy = 500, r = 250;
  /* the sphere, seen in section */
  ring(cx, cy, r, C.cyan, a * 0.75, 2.5);
  ctx.save(); ctx.globalAlpha = a * 0.4; ctx.strokeStyle = C.cyan; ctx.lineWidth = 1.2;
  ctx.beginPath(); ctx.ellipse(cx, cy, r, r * 0.28, 0, 0, TAU); ctx.stroke(); ctx.restore();
  /* line 0: "one more thing to look at": another shell, then crossed out */
  const oa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  A11.arcPath(cx, cy, r + 70, 0, TAU, C.argued, oa, 2.5, [12, 10]);
  txt('one more thing to look at?', cx, cy + r + 60, { size: 26, fam: F.math, w: 700, align: 'center', c: C.argued, a: oa });
  txt('又一件可看的东西？', cx, cy + r + 98, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: oa });
  /* line 1: two arrows and their overlap, the move every act made */
  const ta = a * at(S, 1, 0.8);
  const th = 52 * Math.PI / 180, ua = -Math.PI / 2 + 0.35, va = ua + th;
  const A = [cx + r * Math.cos(ua), cy + r * Math.sin(ua)], B = [cx + r * Math.cos(va), cy + r * Math.sin(va)];
  if (ta > 0.003) {
    arrow(cx, cy, A[0], A[1], C.cyan, ta, 4);
    arrow(cx, cy, B[0], B[1], C.cyan, ta, 4);
    txt('a', A[0] + 14, A[1] - 8, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ta });
    txt('b', B[0] + 18, B[1] + 34, { size: 32, fam: F.math, w: 700, c: C.cyan, a: ta });
    /* projection of b onto a: the overlap, a length along a */
    const pr = r * Math.cos(th), P = [cx + pr * Math.cos(ua), cy + pr * Math.sin(ua)];
    dashed(B[0], B[1], P[0], P[1], C.cyan, ta * 0.8, 2);
    dot(P[0], P[1], 8, 'c', ta);
    A11.arcPath(cx, cy, 70, ua, va, C.white, ta * 0.7, 2);
    txt('θ', cx + 92 * Math.cos(ua + th / 2), cy + 92 * Math.sin(ua + th / 2) + 10, { size: 28, fam: F.math, w: 700, align: 'center', c: C.white, a: ta });
    txt('a · b = cos θ', cx, cy + r + 52, { size: 32, fam: F.math, w: 700, align: 'center', c: C.cyan, a: ta });
    txt('act after act: two arrows, compared · 一幕又一幕：两支箭头，彼此比较', cx, cy + r + 92, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ta });
  }
  /* line 2: the camera analogy */
  const ca = a * at(S, 2, 0.7);
  if (ca > 0.003) {
    panel(1100, 200, 720, 300, ca, C.argued, 'ANALOGY · 比方');
    const kx = 1130, ky = 290;
    box(kx, ky, 120, 80, C.white, ca, 2, 'rgba(0,0,0,0.4)');
    ring(kx + 60, ky + 40, 26, C.white, ca, 2.5);
    fillBox(kx + 18, ky - 14, 30, 14, C.white, ca * 0.8);
    txt('photographs the whole room,', 1300, 300, { size: 25, fam: F.math, w: 700, c: C.white, a: ca });
    txt('except the camera', 1300, 336, { size: 25, fam: F.math, w: 700, c: C.mag, a: ca * Q(S, 2, 'except itself', 0.5) });
    txt('拍得下整个房间，拍不到自己', 1300, 378, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca });
    txt('room ↔ spheres compared · 房间 ↔ 被比较的球', 1128, 440, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ca });
    txt('camera ↔ the one comparing · 相机 ↔ 比较者', 1128, 476, { size: 22, fam: F.zh, w: 700, c: C.argued, a: ca });
  }
  /* line 3: the comparer is not a point out there; it is the comparing itself, at the shared start of a and b */
  const ea = a * at(S, 3, 0.8);
  if (ea > 0.003) {
    /* the would-be third point outside, struck out */
    const O = [cx + r + 130, cy - r + 70];
    A11.arcPath(O[0], O[1], 20, 0, TAU, C.dim, ea * 0.8, 2, [5, 5]);
    line(O[0] - 26, O[1] + 26, O[0] + 26, O[1] - 26, C.white, ea * 0.8, 2.5);
    txt('no third point out here', O[0], O[1] + 56, { size: 22, fam: F.math, w: 700, align: 'center', c: C.dim, a: ea });
    txt('外面没有第三点', O[0], O[1] + 88, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ea });
    /* the comparing: the angle between a and b, at their common start */
    A11.arcPath(cx, cy, 70, ua, va, C.argued, ea, 5);
    ring(cx, cy, 16, C.argued, ea, 3);
    txt('the comparing itself', cx, cy + 92, { size: 24, fam: F.math, w: 700, align: 'center', c: C.argued, a: ea });
    txt('比较本身', cx, cy + 124, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ea });
    panel(1100, 540, 720, 220, ea, C.argued, 'READING · 读法');
    txt('not a third point to stand on,', 1128, 618, { size: 28, fam: F.math, w: 700, c: C.white, a: ea });
    txt('but the comparing itself', 1128, 656, { size: 28, fam: F.math, w: 700, c: C.argued, a: ea });
    txt('不是可以站上去的第三点，而是比较本身', 1128, 702, { size: 26, fam: F.zh, w: 900, c: C.white, a: ea });
    A11.tag(1128, 744, 'a reading of the book, not a theorem · 本书的读法，不是定理', C.argued, ea * Q(S, 3, 'A reading', 0.5));
  }
};

/* ======================================================================= */
/*                     a11_rest · a bag you only take from                  */
/* ======================================================================= */
SCENES.a11_rest = S => {
  const a = A11.fade(S), u = S.u;
  SPINE.rail(S, 11, a);
  if (a <= 0.003) return;
  /* line 0: the question */
  const qa = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.6));
  txt('does the climbing ever end?', 960, 470, { size: 44, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa });
  txt('攀登会有尽头吗？', 960, 530, { size: 36, fam: F.zh, w: 900, align: 'center', c: C.white, a: qa });
  txt('try a bag you only take from · 试试只拿不放的袋子', 960, 590, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa * Q(S, 0, 'Try a bag', 0.5) });
  /* the bag and its cards */
  const ba = a * at(S, 1, 0.6);
  if (ba > 0.003) {
    const bx = 150, by = 260, bw = 600, bh = 340;
    ctx.save(); ctx.globalAlpha = ba; ctx.strokeStyle = C.white; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by); ctx.stroke(); ctx.restore();
    txt('bag · 袋', bx + bw - 6, by + bh + 34, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.dim, a: ba });
    const leaveAt = { 9: Q(S, 2, 'Nine', 1.0), 8: Q(S, 2, 'eight', 1.0), 6: Q(S, 2, 'six', 1.0), 4: Q(S, 2, 'four', 1.0) };
    A11.CARDS.forEach((c, i) => {
      const col = i % 4, row = Math.floor(i / 4);
      let x = bx + 40 + col * 140, y = by + 30 + row * 150, ca = ba, edge = C.cyan;
      const f = leaveAt[c] == null ? 0 : ease(leaveAt[c]);
      if (f > 0) { y -= 24 * f; ca = ba * (1 - 0.85 * f); edge = C.mag; }
      const stay = A11.LEAVES[c] === 0, glow = stay ? Q(S, 2, 'Two, three', 0.6) : 0;
      box(x, y, 110, 120, glow > 0 ? C.now : edge, ca, 2.5, 'rgba(0,0,0,0.6)');
      txt(String(c), x + 55, y + 80, { size: 56, fam: F.mono, w: 900, align: 'center', c: glow > 0 ? C.now : C.white, a: ca });
    });
    /* the rule */
    const ra = a * Q(S, 1, 'Each round', 0.6);
    panel(1000, 200, 820, 200, ra, C.cyan, 'THE RULE · 规则 · take only 只拿不放');
    txt('remove the largest card that a smaller card divides', 1028, 272, { size: 23, fam: F.math, w: 700, c: C.white, a: ra });
    txt('拿走能被更小卡片整除的最大那张', 1028, 314, { size: 25, fam: F.zh, w: 700, c: C.white, a: ra });
    txt('U(A) ⊆ A', 1028, 364, { size: 28, fam: F.math, w: 700, c: C.cyan, a: ra });
    /* the log of rounds: cards left, and which card left */
    const sa = a * Q(S, 2, 'Nine', 0.6);
    if (sa > 0.003) {
      const x0 = 190, y0 = 712, dx = 104;
      txt('cards left each round · 每轮剩几张', 150, 660, { size: 20, fam: F.zh, w: 700, c: C.dim, a: sa });
      const shown = [1, Q(S, 2, 'Nine', 0.3), Q(S, 2, 'eight', 0.3), Q(S, 2, 'six', 0.3), Q(S, 2, 'four', 0.3), Q(S, 2, 'nothing moves', 0.3)];
      const gone = A11.RUN.slice(0, 5).map((r, k) => r.find(c => !A11.RUN[k + 1].includes(c)));
      for (let k = 0; k < 6; k++) {
        const ka = sa * shown[k];
        if (ka <= 0.003) continue;
        const x = x0 + k * dx, last = k === 5;
        chip(x, y0, 56, 48, String(A11.SIZES[k]), last ? C.now : C.cyan, ka, 26);
        if (k > 0) {
          txt('→', x - dx / 2, y0 + 9, { size: 24, fam: F.math, w: 700, align: 'center', c: C.dim, a: ka });
          const g = gone[k - 1];
          txt(g == null ? '—' : `−${g}`, x - dx / 2, y0 + 58, { size: 22, fam: F.mono, w: 700, align: 'center', c: g == null ? C.dim : C.mag, a: ka });
        }
      }
      txt('stopped, not empty · 停下，不是清空', 450, 236, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: sa * Q(S, 2, 'nothing moves', 0.6) });
    }
  }
  /* line 3: the general statement, checked by Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1000, 430, 820, 300, la, C.lean, 'THE GENERAL CASE · 一般情形');
    txt('U(A) ⊆ A,  S(n+1) = U(S(n))  ⟹', 1028, 500, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    txt('∃ N ≤ |S(0)| :  S(n) = S(N) for all n ≥ N', 1028, 546, { size: 26, fam: F.math, w: 700, c: C.white, a: la * Q(S, 3, 'stops within', 0.5) });
    txt('#{ n : S(n+1) ≠ S(n) } ≤ |S(0)|', 1028, 592, { size: 26, fam: F.math, w: 700, c: C.white, a: la * Q(S, 3, 'stops within', 0.5, 0.6) });
    A11.lean(1028, 648, A11.GID.stop, la, { size: 16, name: true });
    const na = la * Q(S, 3, 'had elements', 0.5);
    const nx = A11.tag(1028, 706, 'NUM', C.cyan, na);
    txt(`here · 这里：N = ${A11.N} ≤ 8，changes · 改变 ${A11.CHANGES} ≤ 8`, nx, 706, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: na });
  }
  /* line 4: the maxim */
  const ma = a * at(S, 4, 0.6);
  txt('Take only from a finite bag, and it must come to rest.', 1410, 782, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma * Q(S, 4, 'Take only', 0.6) });
  txt('有限的袋子只拿不放，终将停下。', 1410, 826, { size: 28, fam: F.zh, w: 900, align: 'center', c: C.white, a: ma * Q(S, 4, 'Take only', 0.6) });
};

/* ======================================================================= */
/*                   a11_ledger · twelve stops, one ledger                  */
/* ======================================================================= */
SCENES.a11_ledger = S => {
  const a = clamp(S.u / 0.5) * clamp((S.d - S.u) / 1.2);
  SPINE.rail(S, 11, a);
  if (a <= 0.003) return;
  const COL = { g: C.lean, v: C.argued, r: C.open };
  const y0 = 230, step = 46, X = { tag: 140, key: 300, st: 720, g: 1580, v: 1640, r: 1700 };
  /* rows dim when the closing line begins */
  const dim = 1 - at(S, 3, 0.8);
  /* column heads */
  const ha = a * at(S, 0, 0.6) * dim;
  txt('reading · 读法', X.key, y0 - 34, { size: 18, fam: F.zh, w: 700, c: C.argued, a: ha });
  txt('where it lands · 落在哪条结论上', X.st, y0 - 34, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ha });
  [['g', '✓'], ['v', '◆'], ['r', '●']].forEach(([k, s]) => txt(s, X[k], y0 - 34, { size: 20, fam: F.math, w: 700, align: 'center', c: COL[k], a: ha }));
  /* the rows arrive across lines 0 and 1 */
  const s0 = lineAt(S, 0).s + 0.3, s1 = lineAt(S, 1).e - 0.3;
  A11.ROWS.forEach((rw, i) => {
    const ra = a * dim * clamp((S.u - lerp(s0, s1, i / 11)) / 0.5);
    if (ra <= 0.003) return;
    const y = y0 + i * step, p = SPINE.PARTS[i], cur = i === A11.IDX;
    if (i % 2 === 0) fillBox(120, y - 31, 1630, step, C.white, ra * 0.03);
    txt(p.tag, X.tag, y, { size: 20, fam: F.mono, w: 700, c: cur ? C.now : C.cyan, a: ra, ls: 1 });
    A11.rich([[p.key_en, C.argued, F.mono], [' · ' + p.key_zh, C.argued, F.zh]], X.key, y, { size: 18, a: ra });
    let x = X.st;
    if (rw.g) x = A11.lean(x, y, rw.g, ra, { size: 14 });
    x = A11.rich(rw.st.map(([s, c, f]) => [s, COL[c], f === 'zh' ? F.zh : F.math]), x, y, { size: 22, a: ra });
    if (rw.red) A11.tag(x + 18, y, rw.red, C.open, ra, 15);
    const t = A11.TALLY[i];
    ['g', 'v', 'r'].forEach(k => txt(String(t[k]), X[k], y, { size: 22, fam: F.mono, w: 700, align: 'center', c: t[k] ? COL[k] : C.dim, a: ra * (t[k] ? 1 : 0.5) }));
  });
  /* line 2: the totals */
  const ta = a * dim * at(S, 2, 0.6);
  if (ta > 0.003) {
    const y = y0 + 12 * step + 14;
    line(X.st, y - 34, 1740, y - 34, C.dim, ta, 1.2);
    txt('on this page · 这一页上', X.st, y, { size: 22, fam: F.zh, w: 700, c: C.white, a: ta });
    const T = A11.TOTAL;
    ['g', 'v', 'r'].forEach(k => txt(String(T[k]), X[k], y, { size: 30, fam: F.mono, w: 900, align: 'center', c: COL[k], a: ta }));
  }
  /* line 3: the closing maxim of the whole film */
  const ma = a * at(S, 3, 0.9);
  if (ma > 0.003) {
    panel(260, 340, 1400, 300, ma, C.argued, 'NO THIRD POINT · 不借第三点');
    txt('No ruler outside, no third point.', 960, 438, { size: 46, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma, ab: 1.5 });
    txt('Only two things compared, and the one who compares.', 960, 500, { size: 38, fam: F.disp, w: 700, align: 'center', c: C.white, a: ma * Q(S, 3, 'Only two', 0.6) });
    txt('外面没有尺子，不借第三点：只有被比较的两样，和比较者。', 960, 572, { size: 32, fam: F.zh, w: 900, align: 'center', c: C.argued, a: ma * Q(S, 3, 'Only two', 0.6) });
    A11.tag(960 - 104, 618, 'a reading · 一种读法', C.argued, ma * Q(S, 3, 'Only two', 0.6, 0.5));
  }
};

const LONG_POSTER = { en: 'TEN PARTS AND A CODA', zh: '十部与终章' };

/* ---- poster: the whole ladder of the long film, one bead per act ---- */
FILM.poster = () => {
  const sc = TL.scenes[0], t = 23.7, P = SPINE.PARTS, n = P.length;
  background(t, sc, 0, 6);
  drawHyper(CUBE5, [[0, 4, t * 0.21], [1, 3, t * 0.17], [2, 4, t * 0.13]], { scale: 1.6, a: 0.16, cx: W / 2, cy: 470, camZ: 7, lw: 1.2, dots: false });
  grid(t, 0.45);
  txt(DATA.film.title_zh, W / 2, 270, { size: 112, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt(DATA.film.title.toUpperCase(), W / 2, 380, { size: 62, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 5, ls: 8 });
  bloom(0.6);
  txt(`${LONG_POSTER.en} · ${LONG_POSTER.zh}`, W / 2, 462, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 6 });
  /* the ladder: every act a bead on one line, its tag above, its key below (two staggered rows) */
  const x0 = 250, x1 = W - 250, y = 640, step = (x1 - x0) / (n - 1);
  line(x0, y, x1, y, C.cyan, 0.55, 2);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * step;
    ring(x, y, 15, C.cyan, 0.9, 2); dot(x, y, 9, 'c', 1);
    txt(P[i].tag, x, y - 34, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: 0.85, ls: 1.5 });
    const ky = y + (i % 2 ? 92 : 52);
    if (i % 2) line(x, y + 18, x, ky - 22, C.cyan, 0.3, 1);
    txt(P[i].key_zh, x, ky, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.92 });
  }
  txt(`${DATA.book.code} · LONG FILM`, W / 2, 850, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, 711, 0, sc);
  post(0);
};
