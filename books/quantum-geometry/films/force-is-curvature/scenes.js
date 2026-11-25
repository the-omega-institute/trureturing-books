/* Film · What a loop leaves behind · 绕一圈差多少
   (book quantum-geometry, chapter 18). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook   an arrow carried around a city block; the idea of one dial on the wall of the universe, taken away
            (picture only; argued).
     order  two houses, the swap U = [[0, 1], [1, 0]], the field f = diag(2, 5) and its shift f′ = diag(5, 2):
            U f = f′ U, U f − f U = [[0, 3], [−3, 0]] = (f′ − f) U (computed)
            ..... CovariantCommutator.covariant_commutator_formula (LEAN): in any ring, U f = f′ U implies
            U f − f U = (f′ − f) U.
     towns  five towns, six roads with unit complex turns u(e); a vertex rename g acts as g(t e) u(e) g(s e)⁻¹;
            the exchange-rate picture (argued); renaming one town moves its roads (computed).
     tree   capital r = town 0, tree T = {e0, e1, e3, e4}; root phases 1, i, i, −i, i (computed)
            ..... NamedTreePhaseTransport.selected_tree_transport (LEAN): conjuncts 1–3 (root gets 1, tree-edge
            reconstruction, endpoint covariance) are shown; the telescoping is the proof idea.
     loop   renaming each town by its inverse root phase sets the four tree roads to 1 and leaves the loop
            coordinates rp(s e) u(e) rp(t e)⁻¹ on the chords: e5 → i, e2 → −1 (computed); under further renames
            the dials turn while the loop products, recomputed from the current dials, stay i (the square read
            along e5) and −1 (one line from conjunct 3; computed); “curvature” for the smallest loops and
            “holonomy” for bigger ones are the physics names (argued).
     edge   exact abelian phases on a graph only; the field-strength reading and non-abelian/continuum versions are
            literature results (argued); the exchange-rate story is a picture.

   On load, FILM.init checks DATA.lean and re-derives every number on screen with complex arithmetic. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const FC_LEAN = {
  covariant_commutator_formula: 'D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula',
  selected_tree_transport: 'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport'
};
const FC_DEG = Math.PI / 180;
/* the colour of a rename (a vertex gauge, a definition): blue, kept apart from the violet of argued claims */
const FC_RN = mix(C.blue, C.white, 0.3);
/* the map: towns and roads; ang = the turn u(e) in degrees */
const FC_P = [[330, 780], [880, 780], [880, 450], [605, 250], [330, 450]];
const FC_E = [
  { s: 0, t: 1, ang: 90, tree: true }, { s: 1, t: 2, ang: 0, tree: true }, { s: 2, t: 3, ang: 0, tree: false },
  { s: 3, t: 4, ang: 180, tree: true }, { s: 4, t: 0, ang: 270, tree: true }, { s: 4, t: 2, ang: 90, tree: false }
];
/* root phases (degrees) along the unique tree path from r = 0, and the loop coordinates of the chords */
const FC_RP = [0, 90, 90, 270, 90];
const fcMod = d => ((Math.round(d) % 360) + 360) % 360;
const fcName = d => ({ 0: '1', 90: 'i', 180: '−1', 270: '−i' })[fcMod(d)];
const fcChi = e => fcMod(FC_RP[FC_E[e].s] + FC_E[e].ang - FC_RP[FC_E[e].t]);
/* 2 × 2 real matrices */
const fcMul = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
const fcSub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const FC_U = [[0, 1], [1, 0]], FC_F = [[2, 0], [0, 5]], FC_F2 = [[5, 0], [0, 2]];

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('force-is-curvature film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const eq = (A, B) => JSON.stringify(A) === JSON.stringify(B);
  /* 0. the cited theorems */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const [short, gid] of Object.entries(FC_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem`);
    check(r.short === short, `${gid} resolves to ${r.name}`);
  }
  /* 1. ORDER */
  const Uf = fcMul(FC_U, FC_F), fU = fcMul(FC_F, FC_U);
  check(eq(Uf, [[0, 5], [2, 0]]) && eq(fU, [[0, 2], [5, 0]]), 'U f and f U');
  check(eq(Uf, fcMul(FC_F2, FC_U)), 'U f = f′ U');
  check(eq(fcSub(Uf, fU), [[0, 3], [-3, 0]]) && eq(fcMul(fcSub(FC_F2, FC_F), FC_U), [[0, 3], [-3, 0]]), 'U f − f U = (f′ − f) U');
  /* 2. TREE and LOOP with complex numbers, independently of the degree bookkeeping */
  const cx = d => [Math.cos(d * FC_DEG), Math.sin(d * FC_DEG)];
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ci = a => [a[0], -a[1]];
  const near = (a, b) => Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) < 1e-12;
  const u = FC_E.map(e => cx(e.ang));
  /* the tree paths from r: walk T by breadth-first search */
  const rp = [[1, 0], null, null, null, null], seen = [true, false, false, false, false], q = [0];
  while (q.length) {
    const v = q.shift();
    FC_E.forEach((e, k) => {
      if (!e.tree) return;
      if (e.s === v && !seen[e.t]) { rp[e.t] = cm(u[k], rp[v]); seen[e.t] = true; q.push(e.t); }
      else if (e.t === v && !seen[e.s]) { rp[e.s] = cm(ci(u[k]), rp[v]); seen[e.s] = true; q.push(e.s); }
    });
  }
  check(seen.every(Boolean) && FC_E.filter(e => e.tree).length === 4, 'T spans the five towns with four roads');
  rp.forEach((z, v) => check(near(z, cx(FC_RP[v])), `root phase of town ${v}`));
  /* conjunct 2 on every tree road */
  FC_E.forEach((e, k) => { if (e.tree) check(near(rp[e.t], cm(u[k], rp[e.s])), `tree road e${k}`); });
  /* combing: g(v) = rp(v)⁻¹ makes tree roads 1 and chords their loop coordinates */
  const gauge = (g, k) => cm(cm(g[FC_E[k].t], u[k]), ci(g[FC_E[k].s]));
  const gc = rp.map(ci);
  FC_E.forEach((e, k) => check(near(gauge(gc, k), e.tree ? [1, 0] : cx(fcChi(k))), `combed road e${k}`));
  check(fcChi(5) === 90 && fcChi(2) === 180, 'the chords carry i and −1');
  /* conjunct 3 and loop invariance under arbitrary renames */
  for (let n = 0; n < 40; n++) {
    const g = [0, 1, 2, 3, 4].map(v => cx(360 * rnd(n, v)));
    const u2 = FC_E.map((_, k) => gauge(g, k));
    const rp2 = [[1, 0], null, null, null, null];
    [[0, 1, 0], [1, 2, 1], [4, 4, 0], [3, 3, 4]].forEach(([k, a, b]) => {
      const e = FC_E[k];
      rp2[a] = e.s === b ? cm(u2[k], rp2[b]) : cm(ci(u2[k]), rp2[b]);
    });
    /* rule 3 transports from r: here r = 0 and rp2(0) = 1 by definition, so compare g(a) rp(a) g(r)⁻¹ */
    for (let v = 0; v < 5; v++) check(near(rp2[v], cm(cm(g[v], rp[v]), ci(g[0]))), `rule 3 at town ${v}, sample ${n}`);
    for (const k of [2, 5]) {
      const e = FC_E[k], chi = cm(cm(rp2[e.s], u2[k]), ci(rp2[e.t]));
      check(near(chi, cx(fcChi(k))), `loop coordinate of e${k} is gauge invariant, sample ${n}`);
    }
  }
  check(5 + 1 - 5 === 1 && 6 + 1 - 5 === 2, 'two chords: m + 1 − n = 2');
});
Object.assign(FILM.speed, { hook: 0.02, order: 0.014, towns: 0.016, tree: 0.014, loop: 0.018, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const fcFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function fcRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al) }); cx += tw(s, size, fam, w); }
  return cx;
}
const FC_MISSING = new Set();
function fcLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!FC_MISSING.has(gid)) { FC_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* a 2 × 2 matrix with brackets; returns the right edge */
function fcMat(x, y, M, col, a, size = 30, cw = 64) {
  if (a <= 0.003) return x + 2 * cw + 24;
  const h = size * 2.4, top = y - size * 1.55;
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.lineWidth = 2.5;
  ctx.beginPath(); ctx.moveTo(x + 10, top); ctx.lineTo(x, top); ctx.lineTo(x, top + h); ctx.lineTo(x + 10, top + h);
  const xr = x + 2 * cw + 24; ctx.moveTo(xr - 10, top); ctx.lineTo(xr, top); ctx.lineTo(xr, top + h); ctx.lineTo(xr - 10, top + h); ctx.stroke(); ctx.restore();
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
    const v = M[i][j];
    txt(v < 0 ? '−' + (-v) : String(v), x + 12 + cw * (j + 0.5), y - size * 0.55 + i * size * 1.15 + size * 0.36, { size, fam: F.mono, w: 700, align: 'center', c: v === 0 ? C.dim : col, a });
  }
  return xr;
}
/* the map */
function fcRoad(k, a, o = {}) {
  const e = FC_E[k], A = FC_P[e.s], B = FC_P[e.t];
  const col = o.col || C.white, lw = o.lw || 3;
  if (o.dash) { ctx.save(); ctx.setLineDash([12, 10]); line(A[0], A[1], B[0], B[1], col, a, lw); ctx.restore(); }
  else line(A[0], A[1], B[0], B[1], col, a, lw);
  /* direction: a small arrowhead three quarters of the way */
  const m = [lerp(A[0], B[0], 0.78), lerp(A[1], B[1], 0.78)], an = Math.atan2(B[1] - A[1], B[0] - A[0]);
  arrow(m[0] - 20 * Math.cos(an), m[1] - 20 * Math.sin(an), m[0], m[1], col, a, lw);
}
const FC_TAG = [[0, 0], [0, 0], [26, -26], [-26, -26], [0, 0], [0, 0]];
function fcDial(k, deg, a, o = {}) {
  if (a <= 0.003) return;
  const e = FC_E[k], A = FC_P[e.s], B = FC_P[e.t];
  const x = (A[0] + B[0]) / 2 + FC_TAG[k][0], y = (A[1] + B[1]) / 2 + FC_TAG[k][1], R = 30, col = o.col || C.white;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(4,10,24,0.92)'; ctx.beginPath(); ctx.arc(x, y, R + 4, 0, TAU); ctx.fill(); ctx.restore();
  ring(x, y, R, col, a * 0.8, 2);
  line(x, y, x + R * 0.85 * Math.cos(deg * FC_DEG), y - R * 0.85 * Math.sin(deg * FC_DEG), col, a, 4);
  dot(x, y, 5, 'w', a);
  const nm = fcName(deg);
  const lab = o.label != null ? o.label : (nm != null && Math.abs(deg - Math.round(deg)) < 1e-6 ? nm : '');
  if (lab) {
    if (k === 0 || k === 5) txt(lab, x, y - R - 14, { size: 28, fam: F.math, w: 700, align: 'center', c: col, a });
    else if (k === 3) txt(lab, x - R - 12, y + 10, { size: 28, fam: F.math, w: 700, align: 'right', c: col, a });
    else txt(lab, x + R + 12, y + 10, { size: 28, fam: F.math, w: 700, c: col, a });
  }
  if (k === 0 || k === 5) txt(`e${k}`, x - R - 8, y + R + 18, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a: a * 0.9 });
  else txt(`e${k}`, k === 3 ? x + R + 10 : x - R - 10, y - R + 2, { size: 22, fam: F.mono, w: 700, align: k === 3 ? 'left' : 'right', c: C.dim, a: a * 0.9 });
}
function fcTown(v, a, o = {}) {
  if (a <= 0.003) return;
  const [x, y] = FC_P[v];
  dot(x, y, v === 0 && o.capital ? 22 : 16, v === 0 && o.capital ? 'w' : 'c', a);
  ring(x, y, 24, C.white, a * 0.5, 1.5);
  const lab = v === 0 && o.capital ? 'r' : String(v);
  const off = v === 3 ? [0, -52] : v === 2 || v === 1 ? [52, 10] : [-52, 10];
  txt(lab, x + off[0], y + off[1], { size: 30, fam: F.math, w: 700, align: v === 3 ? 'center' : v === 2 || v === 1 ? 'left' : 'right', c: v === 0 && o.capital ? C.white : C.cyan, a });
}
/* a purple rename dial at a town, turned by deg */
function fcRename(v, deg, a) {
  if (a <= 0.003) return;
  const [x, y] = FC_P[v], R = 40;
  ring(x, y, R, FC_RN, a, 3);
  line(x, y, x + R * Math.cos(deg * FC_DEG), y - R * Math.sin(deg * FC_DEG), FC_RN, a, 4);
}
/* the whole map with turns u′(e) = g(t) u(e) g(s)⁻¹ for the rename g (degrees per town) */
function fcMap(a, g, o = {}) {
  const ga = o.roads || [];
  FC_E.forEach((e, k) => {
    const st = ga[k] || {};
    fcRoad(k, a * (st.a == null ? 0.75 : st.a), { col: st.col || C.white, lw: st.lw || 3, dash: st.dash });
  });
  for (let v = 0; v < 5; v++) fcTown(v, a, o);
  FC_E.forEach((e, k) => {
    const st = ga[k] || {};
    fcDial(k, e.ang + g[e.t] - g[e.s], a * (st.dial == null ? 1 : st.dial), { col: st.dcol || st.col || C.white });
  });
}
function fcTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('WHAT A LOOP LEAVES BEHIND', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('BLOCK · COMMUTATOR · TOWNS · TREE · LOOP · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · AROUND THE BLOCK                     */
/* ======================================================================= */
const HK = { x0: 300, y0: 300, x1: 860, y1: 720 };
/* the walk: door at the bottom middle, counter-clockwise; the arrow picks up 0° (bottom, right half), 30° (right), 0° (top), 60° (left), 0° (bottom, left half) */
const HK_PATH = [[580, 760], [900, 760], [900, 260], [260, 260], [260, 760], [580, 760]];
const HK_TURN = [0, 30, 0, 60, 0];
function hkWalk(p) {
  const seg = [];
  let L = 0;
  for (let i = 0; i < HK_PATH.length - 1; i++) { const d = Math.hypot(HK_PATH[i + 1][0] - HK_PATH[i][0], HK_PATH[i + 1][1] - HK_PATH[i][1]); seg.push(d); L += d; }
  let s = p * L, i = 0, turn = 0;
  while (i < seg.length - 1 && s > seg[i]) { s -= seg[i]; turn += HK_TURN[i]; i++; }
  const f = clamp(s / seg[i]);
  turn += HK_TURN[i] * f;
  return { x: lerp(HK_PATH[i][0], HK_PATH[i + 1][0], f), y: lerp(HK_PATH[i][1], HK_PATH[i + 1][1], f), turn };
}
SCENES.hook = S => {
  const u = S.u;
  fcTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* the block */
  fillBox(HK.x0, HK.y0, HK.x1 - HK.x0, HK.y1 - HK.y0, C.blue, a * 0.12);
  box(HK.x0, HK.y0, HK.x1 - HK.x0, HK.y1 - HK.y0, C.dim, a * 0.8, 2);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) fillBox(HK.x0 + 50 + i * 130, HK.y0 + 60 + j * 120, 70, 60, C.dim, a * 0.18);
  ctx.save(); ctx.setLineDash([8, 10]);
  for (let i = 0; i < HK_PATH.length - 1; i++) line(HK_PATH[i][0], HK_PATH[i][1], HK_PATH[i + 1][0], HK_PATH[i + 1][1], C.dim, a * 0.6, 2);
  ctx.restore();
  txt('door · 家门', 580, 812, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  /* the walk */
  const p = ease(Q(S, 0, 'around a block', 4.2));
  const w = hkWalk(p);
  const L = 70;
  ctx.save(); ctx.setLineDash([5, 6]); arrow(580, 760, 580, 760 - L, C.white, a * 0.5 * clamp(p * 8), 2.5); ctx.restore();
  arrow(w.x, w.y, w.x + L * Math.cos((90 - w.turn) * FC_DEG), w.y - L * Math.sin((90 - w.turn) * FC_DEG), C.now, a, 5);
  dot(w.x, w.y, 12, 'g', a);
  if (p > 0.98) txt(`turned ${Math.round(w.turn)}°? · 转了 ${Math.round(w.turn)}°？`, 940, 770, { size: 26, fam: F.zh, w: 700, c: C.now, a: a * clamp((p - 0.98) * 50) * (1 - at(S, 2, 0.6)) });
  /* line 1: the dial on the wall of the universe; line 2: taken away */
  const da = a * Q(S, 1, 'one big dial', 0.8), gone = Q(S, 2, 'Take that dial away', 0.9);
  if (da > 0.003) {
    const x = 1420, y = 460, R = 170, al = da * (1 - 0.75 * gone);
    ring(x, y, R, C.argued, al, 4);
    for (let k = 0; k < 12; k++) { const t = k * 30 * FC_DEG; line(x + (R - 18) * Math.cos(t), y - (R - 18) * Math.sin(t), x + R * Math.cos(t), y - R * Math.sin(t), C.argued, al, 3); }
    line(x, y, x, y - R + 30, C.argued, al, 6);
    txt('ZERO', x, y - R - 20, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.argued, a: al });
    txt('one dial for every place? · 一只表盘管所有地方？', x, y + R + 60, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.argued, a: al });
    if (gone > 0) { line(x - R - 20, y - R - 20, x - R - 20 + 2 * (R + 20) * gone, y - R - 20 + 2 * (R + 20) * gone, C.white, da * 0.9, 6); }
  }
  /* line 2: street signs */
  const sa = a * Q(S, 2, 'street only tells you', 0.8);
  if (sa > 0.003) {
    /* one sign per stretch of the walk, in the order walked: the same turns as HK_TURN */
    const signs = [[740, 760, '+0°'], [900, 510, '+30°'], [580, 260, '+0°'], [260, 510, '+60°'], [420, 760, '+0°']];
    signs.forEach(([x, y, s], i) => chip(x, y, 108, 46, s, C.cyan, sa * clamp((u - phraseAt(S, 2, 'street only tells you') - 0.25 * i) / 0.4), 24));
    txt('each street: how to carry · 每条街：怎么搬', 1420, 800, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: sa });
    txt('the streets, not the ground, set the turn · 转角由街规定，不由地面', 1420, 840, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.argued, a: sa });
  }
};

/* ======================================================================= */
/*                              scene 2 · ORDER MATTERS                      */
/* ======================================================================= */
function odHouse(x, y, v, a, col) {
  const w = 170, h = 140;
  box(x - w / 2, y - h / 2, w, h, C.white, a * 0.8, 2);
  ctx.save(); ctx.globalAlpha = a * 0.8; ctx.strokeStyle = C.white; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x - w / 2 - 12, y - h / 2); ctx.lineTo(x, y - h / 2 - 70); ctx.lineTo(x + w / 2 + 12, y - h / 2); ctx.stroke(); ctx.restore();
  if (v != null) txt(String(v), x, y + 26, { size: 70, fam: F.mono, w: 700, align: 'center', c: col, a });
}
SCENES.order = S => {
  const u = S.u, a = fcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  /* the two houses and the swap */
  const fa = a * Q(S, 1, 'A field f', 0.7);
  odHouse(270, 470, fa > 0.01 ? 2 : null, a * clamp(fa + at(S, 0, 0.6)), C.cyan);
  odHouse(700, 470, fa > 0.01 ? 5 : null, a * clamp(fa + at(S, 0, 0.6)), C.cyan);
  txt('house 1 · 房子 1', 270, 600, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  txt('house 2 · 房子 2', 700, 600, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.dim, a });
  const ua = a * Q(S, 0, 'that swaps them', 0.6);
  if (ua > 0.003) {
    ctx.save(); ctx.globalAlpha = ua; ctx.strokeStyle = C.now; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(330, 330); ctx.quadraticCurveTo(485, 250, 640, 330); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(640, 600 + 40); ctx.quadraticCurveTo(485, 720, 330, 640); ctx.stroke(); ctx.restore();
    arrow(600, 314, 640, 330, C.now, ua, 4); arrow(370, 656, 330, 640, C.now, ua, 4);
    txt('U: swap · 对调', 485, 262, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.now, a: ua });
  }
  if (fa > 0.003) txt('f = two thermometers · 两支温度计（比方）', 485, 780, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.argued, a: fa });
  /* the matrices */
  panel(940, 170, 900, 400, a * clamp(at(S, 0, 0.6)), C.cyan, 'TWO HOUSES · 两座房子');
  let x = fcRich([['U = ', C.now]], 970, 280, { size: 28, a: a * at(S, 0, 0.6) });
  x = fcMat(x + 6, 280, FC_U, C.now, a * at(S, 0, 0.6), 26, 50);
  x = fcRich([['   f = ', C.cyan]], x, 280, { size: 28, a: fa });
  x = fcMat(x + 6, 280, FC_F, C.cyan, fa, 26, 50);
  x = fcRich([['   f′ = ', C.cyan]], x, 280, { size: 28, a: fa });
  fcMat(x + 6, 280, FC_F2, C.cyan, fa, 26, 50);
  txt('f′ : f shifted by the step · f 走一步后的样子', 970, 352, { size: 20, fam: F.zh, w: 700, c: C.dim, a: fa });
  const ra = a * Q(S, 2, 'Read, then step', 0.6), sa = a * Q(S, 2, 'step, then read', 0.6);
  x = fcRich([['read, then step  U f = ', C.white]], 970, 440, { size: 24, a: ra, fam: F.mono });
  fcMat(x + 6, 440, fcMul(FC_U, FC_F), C.white, ra, 24, 44);
  x = fcRich([['step, then read  f U = ', C.white]], 970, 530, { size: 24, a: sa, fam: F.mono });
  fcMat(x + 6, 530, fcMul(FC_F, FC_U), C.white, sa, 24, 44);
  const da = a * Q(S, 2, 'differ by', 0.6);
  if (da > 0.003) {
    txt('U f − f U =', 1560, 440, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: da });
    fcMat(1490, 520, fcSub(fcMul(FC_U, FC_F), fcMul(FC_F, FC_U)), C.now, da, 28, 54);
  }
  /* line 3: Lean, any ring */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(940, 600, 900, 250, la, C.lean, 'ANY RING · 任意环');
    fcRich([['if  U f = f′ U  then  U f − f U = (f′ − f) U', C.white]], 970, 690, { size: 30, a: la * Q(S, 3, 'If f, carried', 0.6) });
    fcLean(970, 750, FC_LEAN.covariant_commutator_formula, la, { size: 20 });
    x = fcRich([['here  (f′ − f) U = ', C.cyan]], 970, 818, { size: 24, a: la * Q(S, 3, 'that shift times', 0.6), fam: F.mono });
    fcMat(x + 4, 818, fcMul(fcSub(FC_F2, FC_F), FC_U), C.now, la * Q(S, 3, 'that shift times', 0.6), 24, 46);
  }
  const ma = a * at(S, 4, 0.6);
  if (ma > 0.003) chip(485, 860, 640, 56, 'gap = (change of f) × step · 差 = 场的变化 × 这一步', C.now, ma, 22, F.zh);
};

/* ======================================================================= */
/*                              scene 3 · EXCHANGE RATES                     */
/* ======================================================================= */
SCENES.towns = S => {
  const u = S.u, a = fcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Think of exchange rates', 'argued'], [2, null, 'computed']]);
  /* rename: town 2 turns by +90° on line 1 and back on line 2; town 1 turns a full circle on line 2 */
  const g = [0, 0, 0, 0, 0];
  const r2 = Q(S, 1, 'rename its own coin', 1.6), back = Q(S, 2, 'renaming its ends', 1.0);
  g[2] = 90 * ease(r2) * (1 - ease(back));
  const spin = Q(S, 2, 'set it to anything', 3.0, 0.2);
  g[1] = 360 * ease(spin);
  const roads = FC_E.map((e, k) => {
    const hot2 = r2 > 0 && back < 1 && (e.s === 2 || e.t === 2);
    const hot1 = spin > 0 && spin < 1 && (e.s === 1 || e.t === 1);
    return { col: k === 0 && spin > 0 && spin < 1 ? C.now : hot2 || hot1 ? FC_RN : C.white, dial: 1 };
  });
  fcMap(a * at(S, 0, 0.8), g, { roads });
  fcRename(2, g[2], a * clamp(r2 * 3) * (1 - back));
  fcRename(1, g[1], a * clamp(spin * 6) * clamp((1 - spin) * 6 + (spin < 1 ? 0 : 0)));
  /* the panel */
  panel(1080, 180, 760, 300, a * at(S, 0, 0.6), C.cyan, 'ROADS AND TURNS · 路与转角');
  txt('u(e): a unit complex number per road', 1110, 252, { size: 24, fam: F.mono, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  txt('每条路一个单位复数 |u(e)| = 1', 1110, 292, { size: 24, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  const ra = a * Q(S, 1, 'rename its own coin', 0.6);
  fcRich([["rename g:  u′(e) = g(end)·u(e)·g(start)⁻¹", FC_RN]], 1110, 360, { size: 25, a: ra, fam: F.mono });
  txt('town 2 renamed by i · 小镇 2 改名乘 i', 1110, 412, { size: 22, fam: F.zh, w: 700, c: FC_RN, a: ra * (1 - back) });
  txt('e1: 1 → i    e2: 1 → −i    e5: i → −1', 1110, 450, { size: 22, fam: F.mono, w: 700, c: FC_RN, a: a * Q(S, 1, 're-quote', 0.6) * (1 - back) });
  /* the analogy, labelled as such */
  const aa = a * Q(S, 1, 'Think of exchange rates', 0.6);
  if (aa > 0.003) {
    panel(1080, 510, 760, 190, aa, C.argued, 'PICTURE, NOT PROOF · 比方，不是证明');
    txt('town = currency · road = exchange rate', 1110, 580, { size: 22, fam: F.mono, w: 700, c: C.argued, a: aa });
    txt('小镇 = 一种货币 · 路 = 汇率 · 改名 = 换币值单位', 1110, 620, { size: 22, fam: F.zh, w: 700, c: C.argued, a: aa });
    txt('(here a rate is a turn on a circle · 这里的“汇率”是转角)', 1110, 660, { size: 18, fam: F.zh, w: 700, c: C.dim, a: aa });
  }
  const na = a * Q(S, 2, 'means nothing', 0.6);
  if (na > 0.003) chip(1460, 770, 700, 60, 'one road alone: any value · 单独一条路：任意值', C.now, na, 24, F.zh);
};

/* ======================================================================= */
/*                          scene 4 · ONE ROUTE TO EACH TOWN                 */
/* ======================================================================= */
/* the route from r to town 3: r → 4 against e4, 4 → 3 against e3 */
const TR_ROUTE = [0, 4, 3];
SCENES.tree = S => {
  const u = S.u, a = fcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Lean checks', 'lean'], [3, null, 'argued']]);
  const ta = Q(S, 0, 'a tree of official roads', 0.8);
  const roads = FC_E.map(e => e.tree ? { col: mix(C.white, C.cyan, ta), lw: 3 + 4 * ta, a: 0.85 } : { col: C.dim, dash: ta > 0.2, a: 0.7, dial: 1 - 0.5 * ta });
  /* line 1: walk the route r → 4 → 3 */
  const wp = ease(Q(S, 1, 'Multiply the turns', 3.0));
  if (wp > 0) [4, 3].forEach(k => { roads[k].col = C.now; });
  fcMap(a, [0, 0, 0, 0, 0], { roads, capital: true });
  if (ta > 0.01) txt('capital · 首都', FC_P[0][0], FC_P[0][1] + 60, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: a * ta });
  if (wp > 0 && wp < 1) {
    const seg = wp * 2, i = Math.min(1, Math.floor(seg)), f = seg - i, A = FC_P[TR_ROUTE[i]], B = FC_P[TR_ROUTE[i + 1]];
    dot(lerp(A[0], B[0], f), lerp(A[1], B[1], f), 14, 'g', a);
  }
  const ca = a * Q(S, 1, 'Multiply the turns', 0.6);
  if (ca > 0.003) {
    const t1 = clamp(wp * 2), t2 = clamp(wp * 2 - 1);
    fcRich([['rp(3) = ', C.white], ['(−i)⁻¹', C.now, t1 > 0.5 ? 1 : 0.3], [' · ', C.white], ['(−1)⁻¹', C.now, t2 > 0.5 ? 1 : 0.3], [' = i · (−1) = −i', C.white, t2 > 0.95 ? 1 : 0]], 470, 872, { size: 26, a: ca, fam: F.mono });
  }
  /* the table of root phases */
  panel(1080, 180, 760, 290, a * ta, C.cyan, 'ROOT PHASE · 根相位');
  txt('one tree route from r, multiplied · 沿唯一树路线连乘', 1110, 248, { size: 21, fam: F.zh, w: 700, c: C.dim, a: a * ta });
  const show = Q(S, 1, "that is the town's root phase", 0.8);
  ['r', '1', '2', '3', '4'].forEach((nm, v) => {
    const x = 1130 + v * 140;
    txt(nm, x, 316, { size: 28, fam: F.math, w: 700, align: 'center', c: v ? C.cyan : C.white, a: a * ta });
    const vis = v === 3 ? clamp(wp * 2 - 1) : show;
    txt(fcName(FC_RP[v]), x, 380, { size: 34, fam: F.mono, w: 700, align: 'center', c: v === 3 && wp < 1 ? C.now : C.white, a: a * ta * (v === 0 ? at(S, 1, 0.5) : vis) });
  });
  txt('computed · 屏上计算', 1110, 440, { size: 18, fam: F.mono, w: 700, c: C.cyan, a: a * show });
  /* line 2: Lean, three of the six conjuncts */
  const la = a * Q(S, 2, 'Lean checks', 0.6) * (1 - at(S, 3, 0.5));
  if (la > 0.003) {
    panel(1080, 500, 760, 300, la, C.lean, 'ANY GRAPH, ANY TREE · 任意图、任意树');
    const rows = [['1  rp(r) = 1', 'the capital gets one'], ['2  tree road e:  rp(t e) = u(e)·rp(s e)', 'each tree road adds'], ['3  rename g:  rp(a) ↦ g(a)·rp(a)·g(r)⁻¹', 'renaming touches only the two ends']];
    rows.forEach(([f, en], i) => txt(f, 1104, 568 + i * 52, { size: 23, fam: F.mono, w: 700, c: C.white, a: la * Q(S, 2, en, 0.5) }));
    txt('(+ 3 more: continuous, multiplicative, u ≡ 1 ⇒ rp ≡ 1)', 1104, 718, { size: 19, fam: F.mono, w: 700, c: C.dim, a: la });
    fcLean(1104, 770, FC_LEAN.selected_tree_transport, la, { size: 19 });
  }
  /* line 3: telescoping */
  const za = a * at(S, 3, 0.6);
  if (za > 0.003) {
    panel(1080, 500, 760, 300, za, C.now, 'TOWNS IN BETWEEN CANCEL · 中间相消');
    txt('rule 3, along a route r → v₁ → v₂ → a', 1104, 566, { size: 20, fam: F.mono, w: 700, c: C.dim, a: za });
    const parts = [['g(a)', C.now], [' u ', C.white], ['g(v₂)⁻¹', FC_RN], [' · ', C.dim], ['g(v₂)', FC_RN], [' u ', C.white], ['g(v₁)⁻¹', FC_RN], [' · ', C.dim], ['g(v₁)', FC_RN], [' u ', C.white], ['g(r)⁻¹', C.now]];
    const size = 26;
    let x = 1104; const y = 650, strike = Q(S, 3, 'takes back', 0.8);
    parts.forEach(([s, col]) => {
      const w = tw(s, size, F.math, 700);
      txt(s, x, y, { size, fam: F.math, w: 700, c: col, a: za });
      if (col === FC_RN && strike > 0) line(x - 2, y - 8, x - 2 + (w + 4) * strike, y - 8, C.white, za, 3);
      x += w + 6;
    });
    fcRich([['→  ', C.white], ['g(a)', C.now], [' · (u u u) · ', C.white], ['g(r)⁻¹', C.now]], 1104, 740, { size: 28, a: za * strike });
  }
};

/* ======================================================================= */
/*                             scene 5 · WHAT THE LOOP KEEPS                 */
/* ======================================================================= */
const LP_SQUARE = [0, 1, 2, 4], LP_PENT = [0, 1, 2, 3, 4];
function lpPoly(vs, a, fill, dash) {
  if (a <= 0.003) return;
  ctx.save(); ctx.globalAlpha = a; ctx.beginPath();
  vs.forEach((v, i) => (i ? ctx.lineTo(FC_P[v][0], FC_P[v][1]) : ctx.moveTo(FC_P[v][0], FC_P[v][1]))); ctx.closePath();
  if (fill) { ctx.fillStyle = rgba(C.mag, fill); ctx.fill(); }
  if (dash) { ctx.setLineDash([10, 8]); ctx.strokeStyle = C.mag; ctx.lineWidth = 2.5; ctx.stroke(); }
  ctx.restore();
}
/* the direction in which the square's loop reads i: along e5, 4 → 2 → 1 → 0 → 4 (clockwise on screen) */
function lpLoopArrow(a) {
  if (a <= 0.003) return;
  const cx = 605, cy = 610, rx = 200, ry = 92, a0 = -2.5, a1 = 2.2;
  ctx.save(); ctx.globalAlpha = a * 0.8; ctx.strokeStyle = C.mag; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, a0, a1, false); ctx.stroke(); ctx.restore();
  const ex = cx + rx * Math.cos(a1), ey = cy + ry * Math.sin(a1), tx = -rx * Math.sin(a1), ty = ry * Math.cos(a1), tn = Math.hypot(tx, ty);
  arrow(ex - 20 * tx / tn, ey - 20 * ty / tn, ex, ey, C.mag, a * 0.8, 3);
}
SCENES.loop = S => {
  const u = S.u, a = fcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  /* line 0: comb — rename each town by rp(v)⁻¹, gradually; line 2: arbitrary renames wobble */
  const cmb = ease(Q(S, 0, 'rename every town', 2.6));
  const wob = Q(S, 2, 'Rename however you like', 0.6) * (1 - at(S, 3, 0.8));
  const g = FC_RP.map((d, v) => -(d === 270 ? -90 : d) * cmb + wob * 70 * Math.sin(1.7 * S.u + 1.3 * v) * (v ? 1 : 0.6));
  const la = Q(S, 1, 'outside the tree', 0.8);
  /* the loops behind the map */
  lpPoly(LP_SQUARE, a * la, 0.18, false);
  lpPoly(LP_PENT, a * la * Q(S, 1, 'minus one', 0.6), 0, true);
  const roads = FC_E.map(e => e.tree ? { col: C.cyan, lw: 6, a: 0.85 } : { col: la > 0 ? C.mag : C.dim, dash: true, a: 0.85, lw: 4 });
  fcMap(a, g, { roads, capital: true });
  for (let v = 1; v < 5; v++) fcRename(v, g[v], a * clamp(Q(S, 0, 'rename every town', 0.5)) * 0.85);
  /* the loop chips */
  if (la > 0.003) {
    lpLoopArrow(a * la);
    chip(605, 615, 260, 54, 'loop along e5 · i', C.mag, a * la, 24, F.mono);
    ctx.save(); ctx.setLineDash([4, 6]); line(322, 252, 372, 420, C.mag, a * la * Q(S, 1, 'minus one', 0.6) * 0.7, 2); ctx.restore();
    chip(190, 240, 260, 54, 'outer loop · −1', C.mag, a * la * Q(S, 1, 'minus one', 0.6), 26, F.mono);
  }
  /* the panel */
  panel(1080, 180, 760, 330, a, C.cyan, 'COMBED FLAT · 梳平');
  txt('rename g(v) = rp(v)⁻¹ · 按根相位倒数改名', 1110, 250, { size: 22, fam: F.zh, w: 700, c: FC_RN, a });
  txt('tree roads e0 e1 e3 e4 → 1', 1110, 300, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: a * Q(S, 0, 'Every tree road reads one', 0.6) });
  const ka = a * la;
  txt('chord = rp(start)·u·rp(end)⁻¹', 1110, 356, { size: 22, fam: F.mono, w: 700, c: C.mag, a: ka });
  txt('e5: i · i · (i)⁻¹ = i', 1110, 404, { size: 26, fam: F.mono, w: 700, c: C.mag, a: ka });
  txt('e2: i · 1 · (−i)⁻¹ = −1', 1110, 450, { size: 26, fam: F.mono, w: 700, c: C.mag, a: ka * Q(S, 1, 'minus one', 0.6) });
  txt('c = m + 1 − n = 6 + 1 − 5 = 2 loops · 2 个回路', 1110, 492, { size: 19, fam: F.zh, w: 700, c: C.dim, a: ka * Q(S, 1, 'one per loop', 0.6) });
  /* line 2: the dials move, the loop products, recomputed from the current dials, do not */
  const ia = a * Q(S, 2, 'Rename however you like', 0.6);
  if (ia > 0.003) {
    const dial = k => FC_E[k].ang + g[FC_E[k].t] - g[FC_E[k].s];
    const sq = dial(5) - dial(1) - dial(0) - dial(4), outer = dial(2) + dial(3) + dial(4) + dial(0) + dial(1);
    panel(1080, 540, 760, 250, ia, C.mag, 'DIALS TURN, LOOPS STAY · 表盘在转，回路不动');
    txt(`dials now · 表盘现在   e5 ${fcMod(dial(5))}°   e2 ${fcMod(dial(2))}°`, 1110, 600, { size: 22, fam: F.zh, w: 700, c: C.white, a: ia });
    txt(`∏ square along e5 = ${fcName(sq)}    ∏ outer = ${fcName(outer)}`, 1110, 642, { size: 25, fam: F.mono, w: 700, c: C.mag, a: ia });
    txt('rule 3: the renames cancel around a loop · 由第 3 条一步推出', 1110, 680, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ia });
    const na = a * at(S, 3, 0.6);
    txt('smallest loop: “curvature” · 最小的圈：曲率', 1110, 730, { size: 22, fam: F.zh, w: 700, c: C.argued, a: na });
    txt('bigger loop: “holonomy” · 大圈：和乐（物理叫法）', 1110, 766, { size: 20, fam: F.zh, w: 700, c: C.argued, a: na });
  }
  stamp('THE LOOP IS THE FACT', 1460, 840, Q(S, 4, 'The loop is the fact', 0.5), C.mag, 34, -0.05);
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = fcFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, null, 'argued']]);
  /* the map, small and faded */
  ctx.save(); ctx.translate(120, 200); ctx.scale(0.75, 0.75);
  lpPoly(LP_SQUARE, a * 0.6, 0.15, false);
  fcMap(a * 0.55, FC_RP.map(d => -(d === 270 ? -90 : d)), { roads: FC_E.map(e => e.tree ? { col: C.cyan, lw: 6 } : { col: C.mag, dash: true, lw: 4 }), capital: true });
  ctx.restore();
  const rows = [
    { k: 0, col: C.cyan, en: 'tree theorem: exact U(1) phases on a graph', zh: '树定理：图上精确的 U(1) 相位，转角可交换', note: 'commutator rule: any ring · 交换子：任意环 · no limit, no smooth space · 没有极限' },
    { k: 1, col: C.argued, en: 'small loop ↔ field strength F; SU(N) loops', zh: '小回路对上场强；不可交换的矩阵版本', note: 'literature results, not formalized here · 文献结果，本书未形式化' },
    { k: 2, col: C.argued, en: 'exchange rates = a picture', zh: '汇率只是比方', note: 'a ladder for intuition, not a proof · 梯子，不是证明' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 190 + i * 215;
    panel(900, y, 940, 185, ra, rw.col);
    txt(rw.en, 930, y + 58, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 930, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 930, y + 150, { size: 20, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
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
  ctx.save(); ctx.translate(60, 60);
  lpPoly(LP_SQUARE, 1, 0.22, false);
  lpPoly(LP_PENT, 1, 0, true);
  fcMap(1, FC_RP.map(d => -(d === 270 ? -90 : d)), { roads: FC_E.map(e => e.tree ? { col: C.cyan, lw: 6, a: 0.9 } : { col: C.mag, dash: true, lw: 4, a: 0.9 }), capital: true });
  lpLoopArrow(1);
  chip(605, 615, 260, 54, 'loop along e5 · i', C.mag, 1, 24, F.mono);
  ctx.restore();
  txt(DATA.film.title_zh, 1420, 420, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('WHAT A LOOP', 1420, 520, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('LEAVES BEHIND', 1420, 582, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  txt('roads: bookkeeping · loops: the fact', 1420, 670, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1420, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
