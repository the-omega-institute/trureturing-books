/* Film · Who goes first: a coloring is an orientation · 谁先考：着色就是定向
   (book quantum-geometry, chapter 26.2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     exams   five exams A–E, a line for every pair that shares a student (the "house" graph: square A B C D, roof E
             over A and B); slots 1, 2, 3 = a proper 3-coloring c = (1, 2, 1, 2, 3); A, B, E pairwise clash, so two
             slots are not enough (computed).
     first   every line points from the earlier slot to the later one; along an arrow the slot rises, so a directed
             path holds at most 3 exams; the longest ones are A → B → E and C → B → E (computed); flipping A → D to D → A gives the path
             C → D → A → B → E through all five (computed).
     back    keep the good arrows, forget the slots; h(v) = most steps along the arrows from v = (2, 1, 2, 0, 0);
             every arrow lowers h, so h is a proper coloring with 3 values; as slots 3 − h = (1, 2, 1, 3, 3), D moves
             (computed; the step that h drops along every arc is the one the chapter's proof uses).
     rule    GallaiRoy.colorable_iff_exists_orientation (LEAN): for finite V, G is k-colorable iff some orientation
             (arcs only on edges, every edge at least one way, both ways allowed) has every directed path (injective)
             with at most k vertices; the proof drops arcs to a maximal acyclic subrelation; χ(G) = min_o L(o) is a
             hand derivation from it (argued).
     field   the chapter's reading: a coloring is a field, a directed path a line (MODEL, argued); checking a coloring
             is one look per edge (computed: 6 edges); the theorem trades one witness for another and finds neither.
     edge    2-coloring in linear time (Kőnig 1936, literature, argued); 3-coloring NP-complete (Karp 1972; Garey,
             Johnson & Stockmeyer 1976, literature), so a fast 3-coloring algorithm exists iff P = NP; P ≠ NP and the
             regularity of unforced 3D Navier–Stokes flow are open (the book's conjectures; open).

   On load, FILM.init checks DATA.lean against the theorem and re-derives every number shown by brute force: all
   colorings with k = 0..5 colors, all 3^6 orientations (one way or both ways per edge), their longest directed
   paths, the counts h and the new timetable. Any disagreement is pushed to window.FILM_ERRORS, which stops the
   render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const WL_GID = 'D5/S3/Combinatorics/Graph/Walks/GallaiRoy.colorable_iff_exists_orientation';
const WL_N = ['A', 'B', 'C', 'D', 'E'];
const WL_E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 0], [4, 1]];
const WL_SLOT = [1, 2, 1, 2, 3];                       // the timetable c (slots 1..3)
/* arcs as [from, to]; a relation as a list of arcs */
const wlFromSlots = s => WL_E.map(([u, v]) => (s[u] < s[v] ? [u, v] : [v, u]));
const WL_GOOD = wlFromSlots(WL_SLOT);
const WL_BAD = WL_GOOD.map(([u, v]) => (u === 0 && v === 3 ? [3, 0] : [u, v]));
/* the longest directed path (vertices pairwise distinct), by exhaustive search; returns [length, path] */
function wlLongest(arcs) {
  const out = WL_N.map((_, v) => arcs.filter(r => r[0] === v).map(r => r[1]));
  let best = [0, []];
  const go = (p) => {
    if (p.length > best[0]) best = [p.length, p.slice()];
    for (const w of out[p[p.length - 1]]) if (!p.includes(w)) { p.push(w); go(p); p.pop(); }
  };
  for (let v = 0; v < WL_N.length; v++) go([v]);
  return best;
}
/* h(v): the most steps along the arcs from v (the arcs here have no cycle) */
function wlSteps(arcs) {
  const out = WL_N.map((_, v) => arcs.filter(r => r[0] === v).map(r => r[1]));
  const memo = {};
  const h = v => (v in memo ? memo[v] : (memo[v] = out[v].reduce((m, w) => Math.max(m, 1 + h(w)), 0)));
  return WL_N.map((_, v) => h(v));
}
/* every directed path of the greatest length, as vertex lists */
function wlAllLongest(arcs) {
  const out = WL_N.map((_, v) => arcs.filter(r => r[0] === v).map(r => r[1]));
  const L = wlLongest(arcs)[0], all = [];
  const go = p => { if (p.length === L) all.push(p.slice()); for (const w of out[p[p.length - 1]]) if (!p.includes(w)) { p.push(w); go(p); p.pop(); } };
  for (let v = 0; v < WL_N.length; v++) go([v]);
  return all;
}
const WL_H = wlSteps(WL_GOOD);
const WL_NEW = WL_H.map(x => 3 - x);
const WL_LG = wlLongest(WL_GOOD), WL_LB = wlLongest(WL_BAD);

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('witness-line-and-field film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the cited theorem at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 1, `film.json cites ${lean.length} declarations, expected 1`);
  const r = leanCite(WL_GID);
  if (!r) fail(`film.json does not cite ${WL_GID}`);
  else {
    check(r.kind === 'theorem', `${WL_GID} is not a theorem at the pinned commit`);
    check(r.short === 'colorable_iff_exists_orientation', `${WL_GID} resolves to ${r.name}`);
  }
  /* 1. the graph and the timetable */
  const proper = c => WL_E.every(([u, v]) => c[u] !== c[v]);
  check(proper(WL_SLOT) && WL_E.length === 6, 'c = (1, 2, 1, 2, 3) is proper; six clashes');
  const tri = [[0, 1], [0, 4], [1, 4]].every(([u, v]) => WL_E.some(([x, y]) => (x === u && y === v) || (x === v && y === u)));
  check(tri, 'A, B, E pairwise clash');
  /* all colorings with k colors, k = 0..5 */
  const colorable = k => {
    const n = WL_N.length, tot = Math.pow(k, n);
    for (let m = 0; m < tot; m++) { const c = []; let x = m; for (let i = 0; i < n; i++) { c.push(x % k); x = Math.floor(x / k); } if (proper(c)) return true; }
    return n === 0;
  };
  check(!colorable(2) && colorable(3), 'the chromatic number is 3');
  /* 2. the orientations shown */
  check(WL_LG[0] === 3 && WL_LG[1].join() === '0,1,4', 'A → B → E is a longest chain of the good arrows');
  check(wlAllLongest(WL_GOOD).join(' ') === '0,1,4 2,1,4', 'the good arrows have exactly two longest chains, A → B → E and C → B → E');
  check(wlAllLongest(WL_BAD).join(' ') === '2,3,0,1,4', 'after the flip the longest chain is unique');
  check(WL_GOOD.every(([u, v]) => WL_SLOT[u] < WL_SLOT[v]), 'good arrows point to the later slot');
  check(WL_LB[0] === 5 && WL_LB[1].join() === '2,3,0,1,4', 'after the flip, C → D → A → B → E');
  /* 3. the counts and the new timetable */
  check(WL_H.join() === '2,1,2,0,0', 'h = (2, 1, 2, 0, 0)');
  check(WL_GOOD.every(([u, v]) => WL_H[u] > WL_H[v]), 'h drops along every arrow');
  check(proper(WL_NEW) && WL_NEW.join() === '1,2,1,3,3' && Math.max(...WL_NEW) === 3, 'new timetable (1, 2, 1, 3, 3)');
  check(WL_NEW.filter((x, i) => x !== WL_SLOT[i]).length === 1 && WL_NEW[3] !== WL_SLOT[3], 'only D moves');
  /* 4. both sides of the theorem for k = 0..5, over all 3^6 orientations (one way, other way, both ways) */
  let minL = Infinity, minOne = Infinity;
  const Ls = [];
  for (let m = 0; m < 729; m++) {
    const arcs = []; let x = m, one = true;
    for (const [u, v] of WL_E) { const s = x % 3; x = Math.floor(x / 3); if (s !== 1) arcs.push([u, v]); if (s !== 0) arcs.push([v, u]); if (s === 2) one = false; }
    const L = wlLongest(arcs)[0];
    Ls.push(L); minL = Math.min(minL, L); if (one) minOne = Math.min(minOne, L);
  }
  for (let k = 0; k <= 5; k++) check(colorable(k) === Ls.some(L => L <= k), `both sides agree at k = ${k}`);
  check(minL === 3 && minOne === 3, 'min over orientations of the longest path is 3 = χ');
});
Object.assign(FILM.speed, { exams: 0.02, first: 0.016, back: 0.016, rule: 0.012, field: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const wlFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const WL_R = 40;
/* the two layouts: the "house" and the timetable (column = slot) */
const WL_HOUSE = [[330, 470], [630, 470], [630, 740], [330, 740], [480, 280]];
const WL_COLX = [0, 210, 480, 750];
const wlTable = s => WL_N.map((_, v) => {
  const same = WL_N.map((__, w) => w).filter(w => s[w] === s[v]);
  const k = same.indexOf(v), n = same.length;
  return [WL_COLX[s[v]], n === 1 ? 560 : 400 + 300 * k / (n - 1)];
});
const WL_T1 = wlTable(WL_SLOT), WL_T2 = wlTable(WL_NEW).map((p, v) => (v === 1 ? [p[0], 650] : p));   // B lowered: no two arcs collinear
const wlMix = (P, Q2, t) => P.map((p, i) => [lerp(p[0], Q2[i][0], t), lerp(p[1], Q2[i][1], t)]);
function wlNode(p, name, a, o = {}) {
  if (a <= 0.003) return;
  const col = o.col || C.white;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = rgba(C.bg, 0.92); ctx.beginPath(); ctx.arc(p[0], p[1], WL_R, 0, TAU); ctx.fill(); ctx.restore();
  if (o.glow) ring(p[0], p[1], WL_R + 10, o.glow, a * 0.55, 6);
  ring(p[0], p[1], WL_R, col, a, o.lw || 3);
  txt(name, p[0], p[1] + 13, { size: 38, fam: F.disp, w: 700, align: 'center', c: col, a });
}
/* an edge u–v, plain or as an arc from u to v, trimmed to the node rims */
function wlEdge(P, u, v, col, a, w = 3, arc = false) {
  if (a <= 0.003) return;
  const [x1, y1] = P[u], [x2, y2] = P[v], d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
  const s = [x1 + ux * (WL_R + 6), y1 + uy * (WL_R + 6)], e = [x2 - ux * (WL_R + 8), y2 - uy * (WL_R + 8)];
  if (arc) arrow(s[0], s[1], e[0], e[1], col, a, w); else line(s[0], s[1], e[0], e[1], col, a, w);
}
/* the slot columns of a timetable */
function wlColumns(a, o = {}) {
  if (a <= 0.003) return;
  for (let s = 1; s <= 3; s++) {
    const x = WL_COLX[s];
    fillBox(x - 95, 300, 190, 560, C.white, a * 0.035);
    box(x - 95, 300, 190, 560, C.dim, a * 0.5, 1);
    txt(`SLOT ${s}`, x, 340, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, a, ls: 3 });
  }
  txt('time · 时间 →', 480, 900, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * (o.arrowA == null ? 1 : o.arrowA) });
}
function wlRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a }); cx += tw(s, size, fam, w); }
}
/* LEAN ✓ chip for the cited theorem, looked up by its whole GID */
let WL_MISSING = false;
function wlLean(x, y, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(WL_GID);
  if (!r || r.kind !== 'theorem') { if (!WL_MISSING) { WL_MISSING = true; window.FILM_ERRORS.push(`film.json does not cite the theorem ${WL_GID}`); } return; }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* is arc [u, v] on the path p (consecutive)? */
const wlOn = (p, u, v) => p.some((x, i) => i + 1 < p.length && x === u && p[i + 1] === v);
/* opening title */
function wlTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('WHO GOES FIRST', p, 5), W / 2, 580, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('EXAMS · SLOTS · ARROWS · CHAINS · COUNTS · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                             scene 1 · CLASHING EXAMS                      */
/* ======================================================================= */
SCENES.exams = S => {
  const u = S.u;
  wlTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const m = ease(Q(S, 1, 'Give each exam', 1.6));
  const P = wlMix(WL_HOUSE, WL_T1, m);
  wlColumns(a * m);
  const tri = Q(S, 2, 'all clash', 0.6);
  WL_E.forEach(([x, y], i) => {
    const ea = a * clamp((u - lineAt(S, 0).s - 1.2 - 0.25 * i) / 0.4);
    const hot = [x, y].every(v => v === 0 || v === 1 || v === 4);
    wlEdge(P, x, y, hot && tri > 0 ? C.now : C.white, ea * (hot ? 1 : lerp(0.75, 0.4, tri)), hot && tri > 0 ? 4 : 3);
  });
  WL_N.forEach((nm, v) => wlNode(P[v], nm, a * clamp((u - lineAt(S, 0).s - 0.2 * v) / 0.4), { col: (v === 0 || v === 1 || v === 4) && tri > 0 ? C.now : C.white }));
  /* the slot number under each node */
  const sa = a * Q(S, 1, 'call the slot', 0.6);
  WL_N.forEach((_, v) => txt(`${WL_SLOT[v]}`, P[v][0] + 46, P[v][1] - 34, { size: 26, fam: F.mono, w: 700, c: C.white, a: sa }));
  /* the readout */
  panel(1060, 240, 760, 470, a, C.cyan, 'THE TIMETABLE · 考表');
  txt('exam · 考试', 1090, 310, { size: 22, fam: F.zh, w: 700, c: C.dim, a });
  txt('slot · 时段', 1090, 360, { size: 22, fam: F.zh, w: 700, c: C.dim, a: a * sa / Math.max(a, 1e-6) });
  WL_N.forEach((nm, v) => {
    txt(nm, 1290 + 100 * v, 310, { size: 30, fam: F.disp, w: 700, align: 'center', c: C.white, a });
    txt(`${WL_SLOT[v]}`, 1290 + 100 * v, 362, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: sa });
  });
  wlRich([['6 clashes · 6 处冲突', C.white]], 1090, 440, { size: 24, fam: F.zh, a: a * at(S, 0, 0.6, 2.4) });
  wlRich([['every line: two different slots · 每条线两端时段不同', C.cyan]], 1090, 490, { size: 22, fam: F.zh, a: sa });
  const ta = a * tri;
  wlRich([['A, B, E clash pairwise · 两两冲突', C.now]], 1090, 570, { size: 26, fam: F.zh, a: ta });
  wlRich([['2 slots: impossible · 两个时段不可能', C.white]], 1090, 620, { size: 26, fam: F.zh, a: ta * Q(S, 2, 'Two are not', 0.5, 1.2) });
  wlRich([['fewest slots = 3 · 最少 3 个时段', C.cyan]], 1090, 672, { size: 26, fam: F.zh, a: ta * Q(S, 2, 'each other', 0.5) });
};

/* ======================================================================= */
/*                             scene 2 · WHO GOES FIRST                      */
/* ======================================================================= */
SCENES.first = S => {
  const u = S.u, a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const P = WL_T1;
  wlColumns(a);
  const ar = Q(S, 1, 'Point each line', 1.4);
  const flip = ease(Q(S, 4, 'Flip one arrow', 0.9));
  const chainA = Q(S, 3, 'One longest chain', 0.6) * (1 - flip);
  const badA = Q(S, 4, 'a chain runs', 0.6);
  /* the edges, then the arcs (A–D turns round on line 4) */
  WL_E.forEach(([x, y], i) => {
    const g = WL_GOOD[i], isAD = (x === 3 && y === 0);
    let arc = g;
    if (isAD && flip > 0.5) arc = WL_BAD[i];
    const ia = clamp((u - phraseAt(S, 1, 'Point each line') - 0.25 * i) / 0.4);
    let col = C.white, lw = 3;
    if (chainA > 0 && wlOn(WL_LG[1], arc[0], arc[1])) { col = C.cyan; lw = 6; }
    if (badA > 0 && wlOn(WL_LB[1], arc[0], arc[1])) { col = C.mag; lw = 6; }
    if (isAD && flip > 0 && flip < 1) { col = C.now; lw = 5; }
    const fa = isAD ? Math.abs(1 - 2 * flip) : 1;
    wlEdge(P, x, y, C.white, a * 0.45 * (1 - ia), 3);
    wlEdge(P, arc[0], arc[1], col, a * ia * (isAD ? Math.max(fa, 0.15) : 1), lw, true);
  });
  WL_N.forEach((nm, v) => wlNode(P[v], nm, a, { col: badA > 0 ? C.mag : chainA > 0 && WL_LG[1].includes(v) ? C.cyan : C.white }));
  /* line 2: an amber walker climbs C → B → E */
  const wk = at(S, 2, 3.2, 1.0) * (1 - at(S, 3, 0.4));
  if (wk > 0 && wk < 1) {
    const path = [2, 1, 4], t = wk * (path.length - 1), k = Math.min(path.length - 2, Math.floor(t)), f = t - k;
    const p = [lerp(P[path[k]][0], P[path[k + 1]][0], f), lerp(P[path[k]][1], P[path[k + 1]][1], f)];
    ring(p[0], p[1], 18, C.now, a, 5); dot(p[0], p[1], 14, 'g', a);
  }
  /* the readout */
  panel(1060, 240, 760, 560, a, C.cyan, 'WHO GOES FIRST · 谁先考');
  wlRich([['clash  →  earlier slot ⟶ later slot', C.white]], 1090, 310, { size: 26, a: a * ar });
  wlRich([['冲突 → 早的时段指向晚的时段', C.dim]], 1090, 350, { size: 22, fam: F.zh, a: a * ar });
  const dim = 1 - 0.65 * badA;
  wlRich([['along an arrow the slot rises · 顺箭头，时段只增', C.white]], 1090, 420, { size: 22, fam: F.zh, a: a * dim * at(S, 2, 0.6) });
  wlRich([['a chain holds ≤ 3 exams · 一串至多 3 门', C.white]], 1090, 462, { size: 26, fam: F.zh, a: a * dim * Q(S, 2, 'at most three', 0.5) });
  wlRich([['a longest:  A → B → E   ', C.cyan], [`${WL_LG[0]} exams`, C.cyan]], 1090, 525, { size: 28, a: a * chainA });
  wlRich([['(C → B → E is another · 另一串)', C.dim]], 1090, 562, { size: 20, fam: F.zh, a: a * chainA });
  if (badA > 0) {
    wlRich([['flip A → D  to  D → A', C.now]], 1090, 620, { size: 26, a: a * Q(S, 4, 'Flip one arrow', 0.5) });
    wlRich([['C → D → A → B → E   ', C.mag], [`${WL_LB[0]} exams`, C.mag]], 1090, 680, { size: 28, a: a * badA });
    wlRich([['D → A runs back in time: not this timetable · 逆着时间，已不是这张考表', C.now]], 1090, 722, { size: 20, fam: F.zh, a: a * badA });
    wlRich([['any timetable that follows it needs 5 slots · 照它排要 5 个时段', C.white]], 1090, 760, { size: 20, fam: F.zh, a: a * badA * at(S, 4, 0.5, 2.6) });
  } else {
    wlRich([['flip A → D  to  D → A', C.now]], 1090, 620, { size: 26, a: a * Q(S, 4, 'Flip one arrow', 0.5) });
  }
};

/* ======================================================================= */
/*                             scene 3 · BACK FROM ARROWS                    */
/* ======================================================================= */
/* where the step labels sit once the nodes stand in the new timetable: clear of every arc and of the slot titles */
const WL_LAB2 = [[-56, 10, 'right'], [0, 82, 'center'], [-56, 10, 'right'], [56, 10, 'left'], [56, 10, 'left']];
SCENES.back = S => {
  const u = S.u, a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const forget = ease(Q(S, 0, 'forget the slots', 1.2));
  const back2 = ease(Q(S, 4, 'three-slot timetable', 1.6));
  const P = back2 > 0 ? wlMix(WL_HOUSE, WL_T2, back2) : wlMix(WL_T1, WL_HOUSE, forget);
  wlColumns(a * Math.max(1 - forget, back2));
  const chk = Q(S, 3, 'Every arrow runs', 0.5);
  WL_GOOD.forEach(([x, y], i) => {
    const ca = chk * clamp((u - phraseAt(S, 3, 'Every arrow runs') - 0.3 * i) / 0.3);
    wlEdge(P, x, y, ca > 0.5 ? C.cyan : C.white, a, ca > 0.5 ? 4 : 3, true);
    if (ca > 0 && back2 < 0.05) {
      const m = [(P[x][0] + P[y][0]) / 2, (P[x][1] + P[y][1]) / 2];
      chip(m[0], m[1], 92, 36, `${WL_H[x]} > ${WL_H[y]}`, C.cyan, a * ca * (1 - back2), 20);
    }
  });
  /* the counts: computed from the sinks up (D, E first, then B, then A, C) */
  const order = [3, 4, 1, 0, 2], t0 = phraseAt(S, 1, 'count the most steps');
  const moved = back2 > 0.5;
  WL_N.forEach((nm, v) => {
    const ca = a * clamp((u - t0 - 0.9 - 0.55 * order.indexOf(v)) / 0.4);
    wlNode(P[v], nm, a, { col: moved && v === 3 ? C.now : C.white });
    if (ca > 0.003) {
      const cur = at(S, 2, 0.01) === 0 && ca < a;
      const o = moved ? WL_LAB2[v] : [46, -34, 'left'];
      txt(`${WL_H[v]}`, P[v][0] + o[0], P[v][1] + o[1], { size: 30, fam: F.mono, w: 700, align: o[2], c: cur ? C.now : C.cyan, a: ca });
    }
  });
  /* the readout table */
  panel(1060, 240, 760, 560, a, C.cyan, 'COUNTS · 数步数');
  const rows = [['exam · 考试', null], ['old slot · 原时段', WL_SLOT], ['steps h · 步数', WL_H], ['new slot 3 − h · 新时段', WL_NEW]];
  const ra = [1, 1 - 0.6 * forget, Q(S, 1, 'count the most steps', 0.6), Q(S, 4, 'three-slot timetable', 0.6)];
  rows.forEach(([lab, vals], i) => {
    const y = 320 + 80 * i, al = a * ra[i];
    txt(lab, 1090, y, { size: 22, fam: F.zh, w: 700, c: C.dim, a: al });
    WL_N.forEach((nm, v) => {
      const s = vals ? `${vals[v]}` : nm;
      const col = i === 2 ? C.cyan : i === 3 && v === 3 ? C.now : C.white;
      txt(s, 1420 + 72 * v, y, { size: 30, fam: vals ? F.mono : F.disp, w: 700, align: 'center', c: col, a: al * (i === 2 ? clamp((u - t0 - 0.9 - 0.55 * order.indexOf(v)) / 0.4) : 1) });
    });
  });
  wlRich([['each arrow: bigger → smaller · 大数指向小数', C.cyan]], 1090, 670, { size: 22, fam: F.zh, a: a * chk });
  wlRich([['D moves · D 换了时段 · no clash · 无冲突', C.now]], 1090, 740, { size: 24, fam: F.zh, a: a * Q(S, 4, 'D has moved', 0.5) });
};

/* ======================================================================= */
/*                             scene 4 · ANY FINITE GRAPH                    */
/* ======================================================================= */
SCENES.rule = S => {
  const u = S.u, a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const la = a * Q(S, 0, 'Lean checks', 0.6);
  panel(170, 220, 1580, 330, la, C.lean, 'ANY FINITE GRAPH, ANY k · 任意有限图、任意 k');
  wlRich([['G can be colored with k colors', C.white]], 220, 320, { size: 36, a: la * Q(S, 1, 'can be colored', 0.5) });
  wlRich([['⟺', C.lean]], 850, 320, { size: 40, a: la * Q(S, 1, 'exactly when', 0.5) });
  wlRich([['some orientation: every directed path has ≤ k vertices', C.cyan]], 220, 372, { size: 34, a: la * Q(S, 1, 'given directions', 0.5) });
  wlRich([['G 可 k 着色  ⟺  存在一种定向，使每条有向路至多 k 个顶点', C.white]], 220, 428, { size: 26, fam: F.zh, a: la * Q(S, 1, 'longer than', 0.5) });
  wlRich([['a directed path never repeats a vertex · 有向路的顶点互不相同', C.dim]], 220, 468, { size: 21, fam: F.zh, a: la * Q(S, 1, 'longer than', 0.5) });
  wlLean(220, 518, la, 21);
  /* line 2: both ways and a circle; the proof drops one arc */
  const ba = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  if (ba > 0.003) {
    panel(170, 580, 1100, 290, ba, C.cyan, 'ALLOWED · 允许');
    const p1 = [[260, 760], [460, 760]];
    wlNode(p1[0], 'u', ba); wlNode(p1[1], 'v', ba);
    wlEdge(p1.map(p => [p[0], p[1] - 14]), 0, 1, C.white, ba, 3, true);
    wlEdge(p1.map(p => [p[0], p[1] + 14]), 1, 0, C.white, ba, 3, true);
    txt('both ways · 双向', 360, 840, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: ba });
    const cyc = [[620, 680], [800, 680], [710, 810]], drop = Q(S, 2, 'drops arrows', 0.8);
    [[0, 1], [1, 2], [2, 0]].forEach(([x, y], i) => {
      if (i === 2 && drop > 0) { ctx.save(); ctx.setLineDash([8, 8]); wlEdge(cyc, x, y, C.dim, ba * (1 - 0.6 * drop), 3, true); ctx.restore(); }
      else wlEdge(cyc, x, y, C.white, ba, 3, true);
    });
    cyc.forEach((p, i) => wlNode(p, ['x', 'y', 'z'][i], ba));
    txt('a circle · 绕圈', 880, 760, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ba });
    txt('proof drops one · 证明删去一支', 880, 810, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ba * drop });
  }
  /* line 3: χ(G) = min over orientations of the longest path (a hand derivation) */
  const ca = a * at(S, 3, 0.6);
  if (ca > 0.003) {
    panel(170, 580, 1580, 290, ca, C.argued, 'READ OFF THE RULE · 由规律推出（手工推导）');
    wlRich([['χ(G)  =  minₒ ', C.white], ['L(o)', C.cyan]], 220, 690, { size: 44, a: ca });
    txt('fewest colors = shortest possible longest chain · 最少颜色数 = 最长有向路最短能压到的顶点数', 220, 760, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca });
    txt('the five exams: min L = 3 = χ, checked over all 3⁶ orientations here · 五门考试：屏幕上逐一枚举 3⁶ 种定向', 220, 810, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  stamp('k COLORS ⟺ PATHS ≤ k VERTICES', 960, 420, Q(S, 0, 'Lean checks', 0.5, 0.6) * (1 - at(S, 1, 0.4)), C.lean, 30, -0.04);
};

/* ======================================================================= */
/*                              scene 5 · FIELD AND LINE                     */
/* ======================================================================= */
SCENES.field = S => {
  const u = S.u, a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [1, null, 'computed'], [2, null, 'argued']]);
  const P = WL_HOUSE;
  /* the field: a soft violet halo with its value on every vertex */
  const fa = a * Q(S, 0, 'as a field', 0.6);
  WL_N.forEach((_, v) => {
    if (fa > 0.003) {
      const g = ctx.createRadialGradient(P[v][0], P[v][1], WL_R, P[v][0], P[v][1], WL_R + 70);
      g.addColorStop(0, rgba(C.argued, 0.35 * fa)); g.addColorStop(1, rgba(C.argued, 0));
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(P[v][0], P[v][1], WL_R + 70, 0, TAU); ctx.fill();
    }
  });
  /* the line: a directed path, A → B → E */
  const lnA = Q(S, 0, 'as a line', 0.6);
  /* line 1: one look per edge, in turn */
  const t1 = phraseAt(S, 1, 'one look'), per = 0.55;
  WL_GOOD.forEach(([x, y], i) => {
    const on = wlOn(WL_LG[1], x, y);
    const lk = clamp((u - t1 - per * i) / 0.3);
    const cur = lk > 0 && u < t1 + per * (i + 1) && at(S, 2, 0.01) === 0;
    wlEdge(P, x, y, cur ? C.now : on && lnA > 0 ? C.cyan : C.white, a * (on && lnA > 0 ? 1 : 0.6), on && lnA > 0 ? 6 : 3, true);
    if (lk > 0) {
      const m = [(P[x][0] + P[y][0]) / 2, (P[x][1] + P[y][1]) / 2];
      txt(`${WL_SLOT[x]} ≠ ${WL_SLOT[y]} ✓`, m[0] + (x === 4 || y === 4 ? (P[x][0] + P[y][0] < 900 ? -10 : 10) : 0), m[1] - 14, { size: 20, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.white, a: a * lk * (1 - at(S, 2, 0.6)) });
    }
  });
  WL_N.forEach((nm, v) => {
    wlNode(P[v], nm, a);
    txt(`${WL_SLOT[v]}`, P[v][0] + 46, P[v][1] - 34, { size: 30, fam: F.mono, w: 700, c: C.argued, a: fa });
  });
  /* the reading */
  panel(1000, 220, 820, 300, a, C.argued, 'THE CHAPTER’S READING · 本章的读法（MODEL）');
  wlRich([['coloring = field', C.argued], ['  · a value on every vertex', C.white]], 1030, 300, { size: 26, a: fa });
  wlRich([['着色 = 场 · 每个顶点一个值', C.dim]], 1030, 340, { size: 22, fam: F.zh, a: fa });
  wlRich([['directed path = line', C.cyan], ['  · a chain of arrows', C.white]], 1030, 410, { size: 26, a: a * lnA });
  wlRich([['有向路 = 线 · 一串箭头', C.dim]], 1030, 450, { size: 22, fam: F.zh, a: a * lnA });
  wlRich([['check: 6 lines, 6 looks · 验真：6 条线看 6 眼', C.white]], 1030, 496, { size: 22, fam: F.zh, a: a * Q(S, 1, 'one look', 0.6) });
  /* lines 2–3: the question and the aphorism */
  const qa = a * at(S, 2, 0.6);
  if (qa > 0.003) {
    panel(1000, 560, 820, 280, qa, C.argued);
    wlRich([['field ⟺ line', C.white]], 1410, 630, { size: 34, a: qa, align: 'center' });
    txt('an equivalence, not a search method · 是等价，不是搜寻方法', 1410, 680, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
    const ga = a * at(S, 3, 0.5);
    txt('SWAPPING WITNESSES IS NOT FINDING THEM', 1410, 750, { size: 26, fam: F.orb, w: 900, align: 'center', c: C.white, a: ga, ls: 2, ab: 1 });
    txt('交换见证，不等于找到见证', 1410, 800, { size: 30, fam: F.zh, w: 900, align: 'center', c: C.white, a: ga });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = wlFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued'], [2, null, 'open']]);
  const rows = [
    { k: 0, col: C.argued, en: 'are 2 colors enough? decided in linear time', zh: '2 种颜色够不够：线性时间可判定，向外逐层交替涂色', note: 'Kőnig 1936 · literature result · 文献结果，本书未形式化' },
    { k: 1, col: C.argued, en: '3-coloring is NP-complete', zh: '所以 3 着色有多项式时间算法 ⟺ P = NP', note: 'Karp 1972; Garey–Johnson–Stockmeyer 1976 · literature result · 文献结果' },
    { k: 2, col: C.open, en: 'P ≠ NP  ·  3D Navier–Stokes regularity', zh: 'P ≠ NP；无外力三维纳维—斯托克斯整体光滑性', note: 'open problems · 开放问题 · Navier–Stokes: the analogy of section 26.4 · 本章 26.4 的类比' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 225;
    panel(240, y, 1440, 195, ra, rw.col);
    txt(rw.en, 280, y + 62, { size: 34, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 280, y + 112, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 280, y + 160, { size: 20, fam: F.zh, w: 700, c: rw.col === C.open ? C.open : C.argued, a: ra * 0.95 });
  });
  stamp('OPEN', 1540, 700, Q(S, 2, 'is open', 0.5), C.open, 44, -0.08);
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
  background(t, sc, 1, 6);
  const P = WL_T1.map(p => [p[0] + 60, p[1] + 40]);
  WL_GOOD.forEach(([x, y]) => wlEdge(P, x, y, wlOn(WL_LG[1], x, y) ? C.cyan : C.white, 1, wlOn(WL_LG[1], x, y) ? 6 : 3, true));
  WL_N.forEach((nm, v) => wlNode(P[v], nm, 1, { col: WL_LG[1].includes(v) ? C.cyan : C.white }));
  for (let s = 1; s <= 3; s++) txt(`SLOT ${s}`, WL_COLX[s] + 60, 380, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.dim, ls: 3 });
  txt(DATA.film.title_zh, 1380, 420, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WHO GOES FIRST', 1380, 520, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('k COLORS ⟺ PATHS OF ≤ k', 1380, 590, { size: 34, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 3 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1380, 680, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
