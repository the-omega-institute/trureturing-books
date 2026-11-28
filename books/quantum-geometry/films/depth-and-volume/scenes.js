/* Film · Twelve gates in four ticks · 十二道门，四拍走完
   (book quantum-geometry, part VI: chapter 20). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook   the open-boundary circuit circuit(11, {4, 8}) of chapter 20.1: 12 gates on a chain of 11 sites run in
            4 layers; the layer of every gate is the explicit schedule [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 3, 3] of the
            Lean refutation module (computed).
     touch  gate supports (U j on {j, j + 1}, K1 on {1}, KN on {N}); gates that share a site sit on different layers
            in list order; a layer is a set of pairwise disjoint gates; the depth is the least number of layers
            (the definitions RunsIn / depth of the module; the doorknob is an analogy, argued).
     teams  the turning points S cut the path of N + 1 gates into |S| + 1 blocks; inside a block every gate waits for
            its neighbour; with S = {4, 8} the blocks have 4 gates and the schedule has 4 layers; ⌊11/3⌋ + 1 = 4;
            N = 8, S = {3, 6}: 3 blocks of 3, 3 layers, ⌊8/3⌋ + 1 = 3 (computed; the relay is an analogy, argued).
     floor  OpenIntegrableCircuitMinDepth.result (LEAN): 1 ≤ κ, 2κ ≤ N ⟹ minDepth N κ = N / (κ + 1) + 1; the
            biggest block has at least ⌈(N + 1)/(κ + 1)⌉ gates (the chapter's proof sketch); placements {2, 3} and
            {4, 8} of N = 11 have depths 9 and 4 (computed here by brute force).
     guess  conjectureOne (odd N: (N + 3)/2 − κ) and conjectureTwo (even N: (N + 4)/2 − κ) of arXiv:2607.02093v1
            against N / (κ + 1) + 1 for κ = 1 (they agree) and κ = 2 (computed);
            OpenIntegrableCircuitDepthRefutation.result (LEAN): ¬(conjectureOne ∨ conjectureTwo), witnessed at
            N = 8 (4 predicted, 3 layers) and N = 11 (5 predicted, 4 layers).
     edge   Complexity = Volume and ER = EPR are the open conjectures of chapter 20.2–20.3 (open); the depth here is
            the depth of one circuit family, not the least gate count of an arbitrary target nor physical time.

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number on screen from the Lean
   definitions: the circuit list, the layer constraints, the depth of each list by longest chain, minDepth by brute
   force over every placement for N ≤ 12, the closed form, the two conjectured formulas and the two explicit
   schedules of the Lean proof. Any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                     the Lean definitions, re-implemented                  */
/* ======================================================================= */
const DV_LEAN = {
  minDepth: 'D5/S3/Quantum/Dynamics/OpenIntegrableCircuitMinDepth.result',
  refute: 'D5/S3/Quantum/Dynamics/OpenIntegrableCircuitDepthRefutation.result'
};
/* circuit N S of OpenIntegrableCircuitDepthRefutation, in time order: gates {t: 'U', j} | {t: 'K1'} | {t: 'KN'} */
function dvCircuit(N, S) {
  const inS = j => S.includes(j), rest = [], up = [];
  for (let j = N - 1; j >= 1; j--) if (!inS(j)) rest.push({ t: 'U', j });
  if (inS(N)) {
    for (let j = 1; j <= N - 1; j++) if (inS(j)) up.push({ t: 'U', j });
    return [...rest, { t: 'K1' }, ...up, { t: 'KN' }];
  }
  for (let j = 1; j <= N; j++) if (inS(j)) up.push({ t: 'U', j });
  return [{ t: 'KN' }, ...rest, { t: 'K1' }, ...up];
}
const dvSites = (N, g) => (g.t === 'U' ? [g.j, g.j + 1] : g.t === 'K1' ? [1] : [N]);
const dvMeet = (N, a, b) => dvSites(N, a).some(s => dvSites(N, b).includes(s));
/* the least L with RunsIn N w L: the longest chain of overlapping gates in list order */
function dvDepth(N, w) {
  const f = [];
  for (let j = 0; j < w.length; j++) { f[j] = 1; for (let i = 0; i < j; i++) if (dvMeet(N, w[i], w[j])) f[j] = Math.max(f[j], f[i] + 1); }
  return f.length ? Math.max(...f) : 0;
}
/* RunsIn N w L for an explicit layer map */
function dvRuns(N, w, lay, L) {
  for (let j = 0; j < w.length; j++) {
    if (!(lay[j] < L)) return false;
    for (let i = 0; i < j; i++) if (dvMeet(N, w[i], w[j]) && !(lay[i] < lay[j])) return false;
  }
  return true;
}
function dvSubsets(n, k, from = 1, acc = [], out = []) {
  if (acc.length === k) { out.push(acc.slice()); return out; }
  for (let j = from; j <= n; j++) { acc.push(j); dvSubsets(n, k, j + 1, acc, out); acc.pop(); }
  return out;
}
const dvMinDepth = (N, k) => Math.min(...dvSubsets(N, k).map(S => dvDepth(N, dvCircuit(N, S))));
const dvFloor = (N, k) => Math.floor(N / (k + 1)) + 1;
/* the two conjectured formulas, in natural-number arithmetic as in Lean */
const dvGuess = (N, k) => (N % 2 ? Math.max(0, Math.floor((N + 3) / 2) - k) : Math.max(0, Math.floor((N + 4) / 2) - k));
const dvGuessApplies = (N, k) => k > 0 && (N % 2 ? k <= Math.floor((N - 1) / 2) : k <= N / 2);
/* the path index of a gate (K1 = 0, U j = j, KN = N) and the layer of path gate k: inside each block between cuts
   (k + 1 ∈ S cuts the path between k and k + 1) the layer counts down to 0 at the block's right end */
const dvPath = (N, g) => (g.t === 'K1' ? 0 : g.t === 'KN' ? N : g.j);
function dvLayers(N, S) {
  const g = [];
  let end = N;
  for (let k = N; k >= 0; k--) { g[k] = end - k; if (S.includes(k)) end = k - 1; }
  return g;
}
function dvBlocks(N, S) {
  const b = []; let s = 0;
  for (let k = 0; k <= N; k++) if (k === N || S.includes(k + 1)) { b.push([s, k]); s = k + 1; }
  return b;
}
const DV_A = { N: 11, S: [4, 8], lay: [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 3, 3] };
const DV_B = { N: 8, S: [3, 6], lay: [0, 1, 0, 1, 0, 1, 2, 2, 2] };

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('depth-and-volume film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === 2, `film.json cites ${lean.length} declarations, expected 2`);
  for (const gid of Object.values(DV_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
  }
  /* 1. the two explicit schedules of the Lean proof, and our block layering agrees with them */
  for (const X of [DV_A, DV_B]) {
    const w = dvCircuit(X.N, X.S), L = Math.max(...X.lay) + 1, g = dvLayers(X.N, X.S);
    check(w.length === X.N + 1, `${X.N}: ${X.N + 1} gates`);
    check(dvRuns(X.N, w, X.lay, L), `${X.N}: the Lean schedule runs in ${L}`);
    check(w.every((gt, i) => g[dvPath(X.N, gt)] === X.lay[i]), `${X.N}: block layers equal the Lean schedule`);
    check(dvDepth(X.N, w) === L, `${X.N}: depth ${L}`);
    check(dvBlocks(X.N, X.S).every(([s, e]) => e - s + 1 === L), `${X.N}: blocks of ${L}`);
  }
  check(DV_A.lay.length === 12 && Math.max(...DV_A.lay) + 1 === 4, '12 gates, 4 layers');
  /* 2. the closed form against brute force over every placement */
  for (let N = 2; N <= 12; N++) for (let k = 1; 2 * k <= N; k++) check(dvMinDepth(N, k) === dvFloor(N, k), `minDepth ${N} ${k}`);
  check(dvFloor(11, 2) === 4 && dvFloor(8, 2) === 3, '⌊11/3⌋ + 1 = 4, ⌊8/3⌋ + 1 = 3');
  /* 3. the biggest block bounds every placement from below; placements {2, 3} and {4, 8} of N = 11 */
  for (let N = 2; N <= 12; N++) for (let k = 1; 2 * k <= N; k++) for (const S of dvSubsets(N, k)) {
    const big = Math.max(...dvBlocks(N, S).map(([s, e]) => e - s + 1));
    check(dvDepth(N, dvCircuit(N, S)) >= big, `block bound ${N} ${S}`);
    check(big >= Math.ceil((N + 1) / (k + 1)), `pigeonhole ${N} ${S}`);
  }
  check(dvDepth(11, dvCircuit(11, [2, 3])) === 9 && dvDepth(11, dvCircuit(11, [4, 8])) === 4, 'depths 9 and 4');
  check(JSON.stringify(dvBlocks(11, [2, 3]).map(([s, e]) => e - s + 1)) === '[2,1,9]', 'blocks 2, 1, 9');
  /* 4. the two guesses: equal to the true rule at κ = 1, wrong at the two witnesses */
  for (let N = 2; N <= 14; N++) if (dvGuessApplies(N, 1)) check(dvGuess(N, 1) === dvFloor(N, 1), `κ = 1 agrees at ${N}`);
  check(dvGuess(8, 2) === 4 && dvGuess(11, 2) === 5 && dvGuessApplies(8, 2) && dvGuessApplies(11, 2), 'guesses 4 and 5');
  check(dvMinDepth(8, 2) === 3 && dvMinDepth(11, 2) === 4, 'true 3 and 4');
});
Object.assign(FILM.speed, { hook: 0.02, touch: 0.016, teams: 0.016, floor: 0.014, guess: 0.016, edge: 0.012, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const dvFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function dvRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const DV_MISSING = new Set();
function dvLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!DV_MISSING.has(gid)) { DV_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  const name = o.short ? (r.name || r.label).split('.').slice(-2).join('.') : (r.label || r.name);
  txt(name, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* an analogy tag: violet, so it reads as a ladder and not as a theorem */
function dvAnalogy(x, y, w, en, zh, a, note = null) {
  if (a <= 0.003) return;
  panel(x, y, w, note ? 196 : 150, a, C.argued, 'ANALOGY · 比方');
  txt(en, x + 22, y + 78, { size: 26, fam: F.disp, w: 700, c: C.white, a });
  txt(zh, x + 22, y + 122, { size: 26, fam: F.zh, w: 700, c: C.argued, a });
  if (note) txt(note, x + 22, y + 168, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
}
const dvGateName = (N, k) => (k === 0 ? 'K1' : k === N ? 'KN' : `U${k}`);
/* the chain: sites 1..N on a line, path gate k (K1 = 0, U k, KN = N) as a bar above them.
   o: { cx, y, dx, a, tick (layers done so far, float) | null, hi: Set of k (amber outline), cut (alpha),
        blocks (alpha), names (alpha), fs } */
function dvChain(N, S, o) {
  const a = o.a;
  const dx = o.dx, x0 = o.cx - (N - 1) * dx / 2, yc = o.y, X = j => x0 + (j - 1) * dx;
  const g = dvLayers(N, S);
  const gx = k => (k === 0 ? [X(1) - dx * 0.3, X(1) + dx * 0.3] : k === N ? [X(N) - dx * 0.3, X(N) + dx * 0.3] : [X(k) - dx * 0.1, X(k + 1) + dx * 0.1]);
  const gy = k => yc - 34 - (k % 2 ? 2 : 1) * 46;
  const res = { X, g, gx, gy, x0 };
  if (a <= 0.003) return res;
  const bh = 36, fs = o.fs || 20;
  line(X(1) - dx * 0.5, yc, X(N) + dx * 0.5, yc, C.dim, a * 0.55, 2);
  for (let j = 1; j <= N; j++) {
    dot(X(j), yc, 11, 'c', a);
    txt(String(j), X(j), yc + 40, { size: fs, fam: F.mono, w: 700, align: 'center', c: C.dim, a });
  }
  /* gate states */
  const st = [];
  for (let k = 0; k <= N; k++) {
    let col = C.cyan, fill = 0.18, lw = 2, ta = 1;
    if (o.tick != null) {
      const T = o.tick;
      if (T >= g[k] + 1) { col = C.cyan; fill = 0.55; }
      else if (T >= g[k]) { col = C.now; fill = 0.6; lw = 3; }
      else { col = C.dim; fill = 0.06; ta = 0.7; }
    }
    if (o.hi && o.hi.has(k)) { col = C.now; fill = 0.45; lw = 3.5; }
    st.push({ col, fill, lw, ta });
  }
  const ga = a * (o.gate == null ? 1 : o.gate);
  /* pass 1: the legs down to the sites each gate grips, and the turning-point cuts */
  if (ga > 0.003) for (let k = 0; k <= N; k++) {
    const y = gy(k), sites = k === 0 ? [1] : k === N ? [N] : [k, k + 1];
    for (const s2 of sites) line(X(s2), y + bh, X(s2), yc - 12, st[k].col, ga * 0.45, 1.5);
  }
  const ca = a * (o.cut || 0);
  if (ca > 0.003) for (const s2 of S) { ctx.save(); ctx.setLineDash([7, 6]); line(X(s2), yc - 150, X(s2), yc + 12, C.mag, ca, 3); ctx.restore(); }
  /* pass 2: the bars, opaque underneath so legs and cuts do not cross the labels */
  if (ga > 0.003) for (let k = 0; k <= N; k++) {
    const [xa, xb] = gx(k), y = gy(k), { col, fill, lw, ta } = st[k];
    ctx.save(); ctx.globalAlpha = ga; ctx.fillStyle = 'rgba(6,12,30,0.92)'; ctx.fillRect(xa, y, xb - xa, bh); ctx.restore();
    fillBox(xa, y, xb - xa, bh, col, ga * fill);
    ctx.save(); ctx.globalAlpha = ga; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(xa, y, xb - xa, bh); ctx.restore();
    const isTick = o.tick != null && o.tick >= g[k];
    const label = isTick ? String(g[k]) : (o.names == null || o.names > 0) ? dvGateName(N, k) : '';
    txt(label, (xa + xb) / 2, y + bh / 2 + fs * 0.36, { size: isTick ? fs + 4 : fs - 2, fam: F.mono, w: 700, align: 'center', c: isTick ? C.white : col, a: ga * ta * (isTick ? 1 : (o.names == null ? 1 : o.names)) });
  }
  /* the turning-point markers on top */
  if (ca > 0.003) for (const s2 of S) {
    ctx.save(); ctx.globalAlpha = ca; ctx.fillStyle = C.mag; ctx.beginPath();
    ctx.moveTo(X(s2), yc - 150); ctx.lineTo(X(s2) - 12, yc - 172); ctx.lineTo(X(s2) + 12, yc - 172); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  /* blocks: brackets under the chain */
  const ba = a * (o.blocks || 0);
  if (ba > 0.003) dvBlocks(N, S).forEach(([s, e], i) => {
    const xa = gx(s)[0], xb = gx(e)[1], y = yc + 66;
    line(xa, y, xb, y, C.cyan, ba, 2.5); line(xa, y - 10, xa, y, C.cyan, ba, 2.5); line(xb, y - 10, xb, y, C.cyan, ba, 2.5);
    txt(`${e - s + 1}`, (xa + xb) / 2, y + 34, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ba });
  });
  return res;
}
/* a tick counter */
function dvClock(x, y, T, L, a, label = 'TICK · 拍') {
  if (a <= 0.003) return;
  panel(x, y, 260, 130, a, C.now, label);
  const n = T <= 1e-9 ? 0 : Math.min(L, Math.ceil(T - 1e-9));   /* the tick now firing */
  txt(`${n} / ${L}`, x + 130, y + 104, { size: 52, fam: F.orb, w: 900, align: 'center', c: n >= L ? C.cyan : C.now, a });
}
/* opening title */
function dvTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('TWELVE GATES IN FOUR TICKS', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('GATES · LAYERS · TURNING POINTS · DEPTH · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                              scene 1 · TWELVE GATES                       */
/* ======================================================================= */
SCENES.hook = S => {
  dvTitle(S);
  const a = clamp((S.u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - S.u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const T = 4 * ease(Q(S, 1, 'Count the ticks', 3.0));
  dvChain(DV_A.N, DV_A.S, { cx: W / 2, y: 740, dx: 118, a, tick: Q(S, 1, 'Count the ticks', 0.01) > 0 ? T : null, cut: 0.35 * Q(S, 1, 'Count the ticks', 0.6) });
  const ga = a * Q(S, 1, 'Count the gates', 0.5);
  if (ga > 0.003) {
    panel(330, 220, 420, 150, ga, C.white, 'GATES · 门');
    txt('12', 540, 335, { size: 84, fam: F.orb, w: 900, align: 'center', c: C.white, a: ga });
  }
  dvClock(1170, 220, T, 4, a * Q(S, 1, 'Count the ticks', 0.5), 'TICKS · 拍');
  const qa = a * at(S, 2, 0.6);
  if (qa > 0.003) {
    dvRich([['more gates ', C.white], ['⟹', C.dim], [' more time', C.white], [' ?', C.now]], W / 2, 450, { size: 40, align: 'center', a: qa, fam: F.disp });
    txt('门越多 ⟹ 时间越长？', W / 2, 500, { size: 30, fam: F.zh, w: 700, align: 'center', c: C.dim, a: qa });
  }
};

/* ======================================================================= */
/*                            scene 2 · WHO TOUCHES WHOM                     */
/* ======================================================================= */
SCENES.touch = S => {
  const a = dvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'two hands', 'argued'], [2, null, 'computed']]);
  const N = 5;
  const p1 = at(S, 1, 0.5) * (1 - at(S, 2, 0.4)), p2 = at(S, 2, 0.5) * (1 - at(S, 3, 0.4));
  const hi = p2 > 0.5 ? new Set([0, 2, 4]) : p1 > 0.5 ? new Set([2, 3]) : null;
  const R = dvChain(N, [], { cx: 620, y: 560, dx: 200, a, gate: Q(S, 0, 'Each gate', 0.8), hi, fs: 24 });
  txt('sites · 格点', 620, 660, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.dim, a: a * at(S, 0, 0.5) });
  /* line 0: who grips what */
  const la = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.4));
  if (la > 0.003) {
    panel(1200, 240, 600, 220, la, C.cyan, 'GATES · 门');
    txt('U j  grips  j, j + 1', 1228, 320, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: la });
    txt('K1  grips  1      KN  grips  N', 1228, 370, { size: 28, fam: F.mono, w: 700, c: C.cyan, a: la * Q(S, 0, 'two end gates', 0.5) });
    txt('U j 抓 j、j+1；边界门只抓一个', 1228, 420, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la });
  }
  /* line 1: the shared site 3 */
  if (p1 > 0.003) {
    ring(R.X(3), 560, 19, C.now, a * p1, 3);
    txt('shared site · 共用格点', R.X(3), 720, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.now, a: a * p1 });
    panel(1200, 240, 600, 150, a * p1, C.now, 'RULE · 规则');
    txt('share a site ⟹ different ticks', 1228, 318, { size: 26, fam: F.mono, w: 700, c: C.white, a: a * p1 });
    txt('共用格点 ⟹ 不同的拍', 1228, 360, { size: 24, fam: F.zh, w: 700, c: C.dim, a: a * p1 });
    dvAnalogy(1200, 420, 600, 'two hands, one doorknob', '两只手，一个门把手', a * p1 * Q(S, 1, 'two hands', 0.6));
  }
  /* line 2: a layer */
  if (p2 > 0.003) {
    panel(1200, 240, 600, 190, a * p2, C.now, 'ONE LAYER · 一层');
    txt('K1,  U2,  U4  touch nothing', 1228, 318, { size: 26, fam: F.mono, w: 700, c: C.white, a: a * p2 });
    txt('互不相碰 → 同一拍动作', 1228, 362, { size: 24, fam: F.zh, w: 700, c: C.dim, a: a * p2 });
    txt('layer = gates that never touch', 1228, 404, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: a * p2 });
  }
  /* line 3: depth */
  const da = a * at(S, 3, 0.6);
  if (da > 0.003) {
    panel(1180, 240, 640, 260, da, C.cyan, 'DEPTH · 深度');
    txt('depth = fewest layers', 1208, 320, { size: 32, fam: F.mono, w: 700, c: C.cyan, a: da });
    txt('touching gates keep their order', 1208, 370, { size: 24, fam: F.mono, w: 700, c: C.white, a: da });
    txt('深度 = 最少层数', 1208, 424, { size: 28, fam: F.zh, w: 700, c: C.white, a: da });
    txt('相碰的门保持先后', 1208, 466, { size: 24, fam: F.zh, w: 700, c: C.dim, a: da });
  }
};

/* ======================================================================= */
/*                           scene 3 · THREE RELAY TEAMS                     */
/* ======================================================================= */
SCENES.teams = S => {
  const a = dvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'like a relay', 'argued'], [3, null, 'computed']]);
  const swap = Q(S, 4, 'With eight sites', 0.8);
  const aA = a * (1 - swap), aB = a * swap;
  const TA = 4 * ease(Q(S, 3, 'side by side', 3.0)), runA = at(S, 3, 0.01) > 0;
  const R = dvChain(DV_A.N, DV_A.S, { cx: W / 2, y: 480, dx: 118, a: aA, tick: runA ? TA : null, cut: Q(S, 1, 'Put turning points', 0.6), blocks: Q(S, 1, 'three pieces', 0.6) });
  /* line 0: the order runs one way: leftward arrows over each block */
  const oa = aA * at(S, 0, 0.6) * (1 - at(S, 3, 0.5));
  if (oa > 0.003) dvBlocks(DV_A.N, DV_A.S).forEach(([s, e]) => {
    const xa = R.gx(s)[0], xb = R.gx(e)[1];
    arrow(xb - 24, 252, xa + 24, 252, C.cyan, oa, 3);
  });
  if (oa > 0.003) txt('order · 先后', R.gx(DV_A.N)[1] + 10, 258, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: oa });
  const ta = aA * Q(S, 1, 'Put turning points', 0.6);
  if (ta > 0.003) for (const s of DV_A.S) txt(`turn · 折返 ${s}`, R.X(s), 298, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.mag, a: ta });
  dvAnalogy(100, 650, 700, 'relay: one leg per gate, baton = shared site', '接力：一棒一道门，接力棒 = 共用格点', aA * Q(S, 2, 'like a relay', 0.6), 'at each turn the hand-off is already in order · 折返处交棒先后已排好');
  dvClock(860, 660, TA, 4, aA * at(S, 3, 0.5));
  const fa = aA * Q(S, 3, 'four ticks in all', 0.5);
  if (fa > 0.003) {
    panel(1180, 650, 640, 140, fa, C.cyan, 'HAND COUNT · 手算');
    dvRich([['⌊11 / 3⌋ + 1 = 3 + 1 = ', C.white], ['4', C.cyan]], 1208, 740, { size: 40, a: fa });
  }
  /* line 5: N = 8 */
  if (aB > 0.003) {
    const TB = 3 * ease(Q(S, 4, 'three teams', 2.0));
    dvChain(DV_B.N, DV_B.S, { cx: W / 2, y: 480, dx: 150, a: aB, tick: TB, cut: 1, blocks: 1 });
    dvClock(860, 660, TB, 3, aB);
    panel(1180, 650, 640, 140, aB, C.cyan, 'HAND COUNT · 手算');
    dvRich([['⌊8 / 3⌋ + 1 = 2 + 1 = ', C.white], ['3', C.cyan]], 1208, 740, { size: 40, a: aB });
    txt('N = 8 · S = {3, 6}', W / 2, 205, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: aB });
  }
  if (aA > 0.003 && at(S, 1, 0.01) > 0) txt('N = 11 · S = {4, 8}', W / 2, 205, { size: 28, fam: F.mono, w: 700, align: 'center', c: C.white, a: aA * at(S, 1, 0.5) });
};

/* ======================================================================= */
/*                                scene 4 · THE FLOOR                        */
/* ======================================================================= */
/* a row of N + 1 cells cut into blocks, the biggest block marked */
function dvCells(x, y, N, S, cw, a, lab) {
  if (a <= 0.003) return;
  const bl = dvBlocks(N, S), big = Math.max(...bl.map(([s, e]) => e - s + 1));
  bl.forEach(([s, e]) => {
    const isBig = e - s + 1 === big;
    for (let k = s; k <= e; k++) { fillBox(x + k * cw + 3, y, cw - 6, 46, C.cyan, a * (isBig ? 0.55 : 0.22)); box(x + k * cw + 3, y, cw - 6, 46, isBig ? C.white : C.cyan, a, isBig ? 3 : 1.5); }
  });
  for (const s of S) { ctx.save(); ctx.setLineDash([6, 5]); line(x + s * cw, y - 16, x + s * cw, y + 62, C.mag, a, 3); ctx.restore(); }
  txt(lab, x, y - 26, { size: 24, fam: F.mono, w: 700, c: C.white, a });
  txt(`pieces ${bl.map(([s, e]) => e - s + 1).join(' · ')}   biggest ${big}   depth ${dvDepth(N, dvCircuit(N, S))}`, x, y + 96, { size: 24, fam: F.mono, w: 700, c: C.white, a });
}
SCENES.floor = S => {
  const a = dvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [2, null, 'argued']]);
  const la = a * at(S, 0, 0.6);
  panel(240, 190, 1440, 270, la, C.lean, 'ANY N, ANY κ · 任意 N 与 κ');
  dvRich([['1 ≤ κ,  2κ ≤ N', C.white]], 290, 280, { size: 36, a: la * Q(S, 0, 'Take N sites', 0.5) });
  dvRich([['⟹   minDepth(N, κ) = ', C.white], ['⌊N / (κ + 1)⌋ + 1', C.lean]], 290, 352, { size: 38, a: la * at(S, 1, 0.6) });
  txt('least depth over all placements · 对折返点的一切摆法取最小', 1640, 280, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.dim, a: la * at(S, 1, 0.6) });
  dvLean(290, 422, DV_LEAN.minDepth, la * Q(S, 0, 'Lean checks', 0.5), { size: 20 });
  stamp('⌊N/(κ+1)⌋ + 1', 1420, 400, Q(S, 0, 'Lean checks', 0.5, 0.6) * (1 - at(S, 1, 0.5, 3)), C.lean, 30, -0.06);
  /* lines 0–1: the worked instance underneath, N = 11, κ = 2 */
  const ia = a * at(S, 0, 0.8, 1.5) * (1 - at(S, 2, 0.5));
  dvChain(DV_A.N, DV_A.S, { cx: W / 2, y: 720, dx: 96, a: ia, tick: 4, cut: 1, fs: 18 });
  if (ia > 0.003) dvRich([['N = 11,  κ = 2:   ⌊11 / 3⌋ + 1 = ', C.white], ['4', C.cyan]], W / 2, 505, { size: 30, align: 'center', a: ia * at(S, 1, 0.6) });
  /* line 2: the pieces */
  const pa = a * at(S, 2, 0.6) * (1 - at(S, 3, 0.5));
  dvCells(260, 560, 11, [2, 3], 58, pa, 'N = 11 · S = {2, 3}');
  dvCells(1050, 560, 11, [4, 8], 58, pa * Q(S, 2, 'biggest piece', 0.5), 'N = 11 · S = {4, 8}');
  txt('12 gates into 3 pieces: the biggest has at least ⌈12 / 3⌉ = 4 · 最长一段至少 4 道门', W / 2, 760, { size: 24, fam: F.zh, w: 700, align: 'center', c: C.white, a: pa * Q(S, 2, 'biggest piece', 0.6) });
  txt('NUM · strips computed on screen · 格子条是屏幕上的计算     depth ≥ biggest piece · 深度 ≥ 最长段', W / 2, 806, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: pa * 0.9 });
  /* line 3: the aphorism */
  const qa = a * at(S, 3, 0.7);
  if (qa > 0.003) {
    txt("A circuit's time is not the number of steps.", W / 2, 600, { size: 50, fam: F.disp, w: 700, align: 'center', c: C.white, a: qa, ab: 2 });
    txt('It is the longest line that has to wait.', W / 2, 670, { size: 50, fam: F.disp, w: 700, align: 'center', c: C.cyan, a: qa * Q(S, 3, 'It is the longest', 0.6), ab: 2 });
  }
};

/* ======================================================================= */
/*                              scene 5 · TWO GUESSES FAIL                   */
/* ======================================================================= */
const GP = { x0: 190, y0: 730, w: 880, h: 470, nMin: 1, nMax: 14, dMax: 8 };
const gpX = N => GP.x0 + (N - GP.nMin) / (GP.nMax - GP.nMin) * GP.w;
const gpY = d => GP.y0 - d / GP.dMax * GP.h;
SCENES.guess = S => {
  const a = dvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean'], [3, 'Their slope', 'computed']]);
  const k = at(S, 2, 0.01) > 0 ? 2 : 1, sw = k === 2 ? at(S, 2, 0.6) : at(S, 1, 0.6) + (1 - at(S, 0, 0.01));
  /* axes */
  arrow(GP.x0, GP.y0, GP.x0 + GP.w + 40, GP.y0, C.dim, a, 2);
  arrow(GP.x0, GP.y0, GP.x0, GP.y0 - GP.h - 30, C.dim, a, 2);
  for (let N = GP.nMin; N <= GP.nMax; N++) txt(String(N), gpX(N), GP.y0 + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: N === 8 || N === 11 ? C.white : C.dim, a });
  for (let d = 1; d <= GP.dMax; d++) txt(String(d), GP.x0 - 20, gpY(d) + 7, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a });
  txt('N', GP.x0 + GP.w + 56, GP.y0 + 8, { size: 26, fam: F.math, w: 700, c: C.white, a });
  txt('depth · 深度', GP.x0 + 10, GP.y0 - GP.h - 40, { size: 22, fam: F.zh, w: 700, c: C.white, a });
  const pa = a * clamp(sw);
  /* the guess (white, dashed) and the true rule (cyan) */
  const ga = pa * at(S, 0, 0.6);
  for (let N = GP.nMin; N <= GP.nMax; N++) {
    if (2 * k > N) continue;
    const t = dvFloor(N, k);
    dot(gpX(N), gpY(t), 13, 'c', pa);
    if (dvGuessApplies(N, k) && ga > 0.003) {
      const gv = dvGuess(N, k);
      ring(gpX(N), gpY(gv), 14, C.white, ga, 2.5);
      if (gv !== t) { ctx.save(); ctx.setLineDash([4, 5]); line(gpX(N), gpY(gv) + 14, gpX(N), gpY(t) - 12, C.white, ga * 0.5, 1.5); ctx.restore(); }
    }
  }
  /* legend */
  dot(1200, 220, 12, 'c', pa); txt('⌊N/(κ+1)⌋ + 1  true · 真值', 1226, 228, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: pa });
  ring(1200, 268, 13, C.white, ga, 2.5); txt('guess · 猜想   odd N 奇: (N+3)/2 − κ', 1226, 276, { size: 22, fam: F.zh, w: 700, c: C.white, a: ga });
  txt('even N 偶: (N+4)/2 − κ', 1366, 308, { size: 22, fam: F.zh, w: 700, c: C.white, a: ga });
  chip(1300, 356, 200, 52, `κ = ${k}`, C.now, pa, 30);
  if (k === 1) txt('they agree · 完全吻合', 1420, 366, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: a * at(S, 1, 0.6) * (1 - at(S, 2, 0.01)) });
  /* the two witnesses */
  const w8 = a * Q(S, 2, 'At eight sites', 0.5), w11 = a * Q(S, 2, 'At eleven', 0.5);
  if (k === 2) {
    ring(gpX(8), gpY(3), 26, C.white, w8, 4); ring(gpX(11), gpY(4), 26, C.white, w11, 4);
    panel(1170, 400, 660, 200, Math.max(w8, w11), C.cyan, 'TWO COUNTEREXAMPLES · 两个反例');
    txt('N = 8:   guess 4   runs in 3', 1198, 470, { size: 28, fam: F.mono, w: 700, c: C.white, a: w8 });
    txt('N = 11:  guess 5   runs in 4', 1198, 520, { size: 28, fam: F.mono, w: 700, c: C.white, a: w11 });
  }
  /* line 4: Lean and the slopes */
  const la = a * Q(S, 3, 'Lean checks', 0.5);
  if (la > 0.003) {
    panel(1170, 630, 660, 150, la, C.lean, 'BOTH FORMULAS FAIL · 两条都不成立');
    txt('¬ (conjectureOne ∨ conjectureTwo)', 1198, 696, { size: 24, fam: F.mono, w: 700, c: C.white, a: la });
    dvLean(1198, 756, DV_LEAN.refute, la, { size: 20, short: true });
    const sa = a * Q(S, 3, 'Their slope', 0.6);
    dvRich([['κ = 2  slope · 斜率   guess ', C.white], ['1/2', C.white], ['   true ', C.cyan], ['1/3', C.cyan]], 1198, 572, { size: 26, a: sa, fam: F.zh });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
SCENES.edge = S => {
  const a = dvFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'open'], [2, null, 'argued']]);
  /* left: what we counted */
  panel(100, 200, 720, 300, a, C.cyan, 'COUNTED · 数出来的');
  dvChain(DV_A.N, DV_A.S, { cx: 460, y: 410, dx: 54, a, tick: 4, fs: 14, cut: 0.6 });
  txt('4 ticks · 4 拍', 460, 480, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.cyan, a });
  /* right: the conjectures */
  const ca = a * at(S, 0, 0.6);
  panel(1100, 200, 720, 300, ca, C.open, 'CONJECTURED · 猜想');
  if (ca > 0.003) {
    txt('Complexity = Volume', 1130, 290, { size: 34, fam: F.disp, w: 700, c: C.open, a: ca });
    txt('复杂度等于体积 · OPEN', 1130, 334, { size: 26, fam: F.zh, w: 700, c: C.open, a: ca * Q(S, 1, 'it is open', 0.5) });
    const ea = a * Q(S, 1, 'So is ER equals EPR', 0.5);
    txt('ER = EPR', 1130, 410, { size: 34, fam: F.disp, w: 700, c: C.open, a: ea });
    txt('纠缠 ↔ 虫洞 · OPEN', 1130, 454, { size: 26, fam: F.zh, w: 700, c: C.open, a: ea });
  }
  /* the broken bridge between them */
  const ba = a * at(S, 0, 0.6, 1.5);
  if (ba > 0.003) {
    ctx.save(); ctx.setLineDash([10, 10]); line(840, 350, 1080, 350, C.open, ba, 3); ctx.restore();
    txt('?', 960, 330, { size: 56, fam: F.orb, w: 900, align: 'center', c: C.open, a: ba });
  }
  /* line 2: the scope */
  const rows = [
    ['one family of circuits', '只在一族电路里'],
    ['not the fewest gates for any target', '不是任意目标的最少门数'],
    ['not physical time', '不是物理时间']
  ];
  rows.forEach(([en, zh], i) => {
    const ra = a * at(S, 2, 0.5, 0.9 * i);
    if (ra <= 0.003) return;
    const y = 580 + i * 62;
    txt(en, 140, y, { size: 28, fam: F.disp, w: 700, c: i ? C.white : C.cyan, a: ra });
    txt(zh, 720, y, { size: 26, fam: F.zh, w: 700, c: C.dim, a: ra });
  });
  const qa = a * at(S, 3, 0.6);
  if (qa > 0.003) {
    panel(1100, 540, 720, 230, qa, C.argued, 'SCOPE · 边界');
    txt('ticks counted ≠ volume measured', 1130, 620, { size: 30, fam: F.disp, w: 700, c: C.white, a: qa });
    txt('数出来的拍数 ≠ 量出来的体积', 1130, 670, { size: 28, fam: F.zh, w: 700, c: C.argued, a: qa });
    txt('refuting two depth formulas ≠ a black-hole result', 1130, 730, { size: 20, fam: F.mono, w: 700, c: C.dim, a: qa });
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
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.12, cx: 1500, cy: 360, camZ: 7, lw: 1.3, dots: false });
  txt(DATA.film.title_zh, W / 2, 300, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('TWELVE GATES IN FOUR TICKS', W / 2, 390, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 2, ls: 5 });
  dvChain(DV_A.N, DV_A.S, { cx: W / 2, y: 700, dx: 118, a: 1, tick: 4, cut: 1, blocks: 1 });
  dvRich([['depth = ', C.white], ['⌊N / (κ + 1)⌋ + 1', C.lean]], W / 2, 490, { size: 44, align: 'center', ab: 1 });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, W / 2, 900, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
