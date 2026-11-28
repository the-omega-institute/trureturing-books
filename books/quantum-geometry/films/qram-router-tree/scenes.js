/* Film · Set the switches, fetch the cell · 拨好道岔，取回一格
   (book quantum-geometry, chapter 36.2 with appendix P.1–P.2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     still    a still grid of memory cells and an amber address cursor; the observer-as-pointer reading of chapter 36.2
              is the book's MODEL (argued).
     yard     a depth-3 routing tree over eight cells holding the digits D = 3 1 4 1 5 9 2 6; the address bits 1 0 1
              set the three levels (0 left, 1 right) and the enable ends at cell 5 only (computed on screen; the
              one-hot leaf is clause 1 of ReversibleQram.correctness). The rail yard is a picture (argued).
     read     the bus is a dial in Z/10; the tally passes every leaf and adds D(i) where the leaf is on: 0 + 9 = 9;
              the routing is then undone and the wires are clean again (computed)
              ..... ReversibleQram.correctness, clauses 2 and 3 (LEAN).
     both     the address (|010⟩ + |101⟩)/√2 with bus 0 becomes (|010, 4⟩ + |101, 9⟩)/√2, weights 1/2 each (computed)
              ..... ReversibleQram.correctness, clause 4: the permutation matrix is unitary and sends initialized ψ to
              initialized (a, r) ↦ ψ(a, r − D a) (LEAN).
     listen   each router leaves an environment mark when active (q < 1); the loaded labels λ_a on the seven routers;
              silencing the bottom router under prefix 11 makes 110 and 111 agree on every active router (computed)
              ..... HannRouterProfiles.profile_separation_iff (LEAN): the active labels separate all addresses iff every
              deepest router is active; with only the bottom row active the eight addresses still separate (computed).
     edge     fixed classical data, ideal reversible circuit, no gate/depth/noise bound, the tally passes every leaf
              (chapter P.1 after the theorem); the per-branch three-switch path of the bucket-brigade QRAM is a
              literature result and observer = pointer is a MODEL (argued).

   On load, FILM.init checks DATA.lean against the two theorems and re-derives every number shown on screen with an
   independent model of the Toffoli/CNOT routing network and of the loaded router labels. Any disagreement is pushed to
   window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const QR_LEAN = {
  correctness: 'D5/S3/Quantum/Routing/ReversibleQram.correctness',
  profile_separation_iff: 'D5/S3/Quantum/Routing/HannRouterProfiles.profile_separation_iff'
};
const QR_D = [3, 1, 4, 1, 5, 9, 2, 6];          // the stored digits, cells 0..7
const QR_M = 10;                                  // the bus is Z/10
const QR_DEPTH = 3;
const qrBits = (i, n) => Array.from({ length: n }, (_, k) => ((i >> (n - 1 - k)) & 1) === 1);   // first bit = top level
const qrStr = (i, n) => qrBits(i, n).map(b => (b ? '1' : '0')).join('');
const qrIdx = bits => bits.reduce((s, b) => 2 * s + (b ? 1 : 0), 0);

/* the Boolean routing network of ReversibleQram (Toffoli then CNOT at each split), on nested wire pairs */
const qrClean = (n, e) => (n === 0 ? e : [qrClean(n - 1, e), qrClean(n - 1, false)]);
const qrRoot = (n, w) => (n === 0 ? w : qrRoot(n - 1, w[0]));
const qrSetRoot = (n, w, v) => (n === 0 ? v : [qrSetRoot(n - 1, w[0], v), w[1]]);
function qrSplit(n, b, w) {                       // n ≥ 1: act on the roots of the two halves
  const x = qrRoot(n - 1, w[0]), y = qrRoot(n - 1, w[1]);
  const y1 = y !== (b && x), x1 = x !== y1;
  return [qrSetRoot(n - 1, w[0], x1), qrSetRoot(n - 1, w[1], y1)];
}
function qrUnsplit(n, b, w) {
  const x1 = qrRoot(n - 1, w[0]), y1 = qrRoot(n - 1, w[1]);
  const x = x1 !== y1, y = y1 !== (b && x);
  return [qrSetRoot(n - 1, w[0], x), qrSetRoot(n - 1, w[1], y)];
}
function qrRoute(n, a, w) {
  if (n === 0) return w;
  const s = qrSplit(n, a[0], w), r = a.slice(1);
  return [qrRoute(n - 1, r, s[0]), qrRoute(n - 1, r, s[1])];
}
function qrUnroute(n, a, w) {
  if (n === 0) return w;
  const r = a.slice(1);
  return qrUnsplit(n, a[0], [qrUnroute(n - 1, r, w[0]), qrUnroute(n - 1, r, w[1])]);
}
const qrLeaf = (n, w, i) => (n === 0 ? w : qrLeaf(n - 1, w[i[0] ? 1 : 0], i.slice(1)));
function qrReadAmount(n, D, w, m) {
  let s = 0;
  for (let i = 0; i < (1 << n); i++) if (qrLeaf(n, w, qrBits(i, n))) s += D[i];
  return ((s % m) + m) % m;
}
function qrQuery(n, D, a, w, r, m) {
  const rw = qrRoute(n, a, w);
  return { a, w: qrUnroute(n, a, rw), r: (r + qrReadAmount(n, D, rw, m)) % m };
}
const qrWireList = (n, w) => (n === 0 ? [w] : [...qrWireList(n - 1, w[0]), ...qrWireList(n - 1, w[1])]);
const qrWireFrom = (n, bits) => (n === 0 ? bits[0] : [qrWireFrom(n - 1, bits.slice(0, bits.length / 2)), qrWireFrom(n - 1, bits.slice(bits.length / 2))]);
const qrSame = (n, u, v) => qrWireList(n, u).every((b, i) => b === qrWireList(n, v)[i]);

/* the loaded router labels of HannRouterProfiles: a router is a prefix p (|p| < n); on the address path it holds the
   next bit, elsewhere W */
const qrRouters = n => { const out = []; for (let k = 0; k < n; k++) for (let v = 0; v < (1 << k); v++) out.push(k ? qrStr(v, k) : ''); return out; };
const qrLabel = (a, p) => (a.startsWith(p) ? a[p.length] : 'W');
function qrSeparates(n, active) {
  const rs = qrRouters(n).filter(p => active.has(p));
  for (let i = 0; i < (1 << n); i++) for (let j = i + 1; j < (1 << n); j++) {
    const a = qrStr(i, n), b = qrStr(j, n);
    if (rs.every(p => qrLabel(a, p) === qrLabel(b, p))) return false;
  }
  return true;
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('qram-router-tree film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(QR_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(QR_LEAN).length}`);
  for (const [short, gid] of Object.entries(QR_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. the routing network, clauses 1–3, at depths 0..4 with random data, wires and bus */
  for (let n = 0; n <= 4; n++) {
    const N = 1 << n;
    for (let k = 0; k < 24; k++) {
      const D = Array.from({ length: N }, (_, i) => Math.floor(QR_M * rnd(k + 31 * n, i)));
      for (let ai = 0; ai < N; ai++) {
        const a = qrBits(ai, n);
        for (const e of [false, true]) {
          const w = qrRoute(n, a, qrClean(n, e));
          for (let i = 0; i < N; i++) check(qrLeaf(n, w, qrBits(i, n)) === (i === ai ? e : false), `one-hot n=${n} a=${ai} i=${i}`);
        }
        const bits = Array.from({ length: N }, (_, i) => rnd(k + 7, i + 13 * ai) < 0.5);   // Wires n has 2^n bits
        const w = qrWireFrom(n, bits), r = Math.floor(QR_M * rnd(k, 99 + ai));
        const q = qrQuery(n, D, a, w, r, QR_M);
        check(qrSame(n, q.w, w) && q.r === (r + qrReadAmount(n, D, qrRoute(n, a, w), QR_M)) % QR_M, `dirty query n=${n} a=${ai}`);
        const c = qrQuery(n, D, a, qrClean(n, true), r, QR_M);
        check(qrSame(n, c.w, qrClean(n, true)) && c.r === (r + D[ai]) % QR_M, `clean query n=${n} a=${ai}`);
      }
    }
  }
  /* 2. clause 4 at depth 2 over Z/3: the query permutes the whole basis and moves initialized amplitudes */
  {
    const n = 2, N = 4, m = 3, D = [2, 0, 1, 2], key = (a, w, r) => `${a}|${qrWireList(n, w).map(Number).join('')}|${r}`;
    const states = [];
    for (let a = 0; a < N; a++) for (let wb = 0; wb < 16; wb++) for (let r = 0; r < m; r++) states.push([a, qrWireFrom(n, qrBits(wb, 4)), r]);
    const img = new Map();
    for (const [a, w, r] of states) { const q = qrQuery(n, D, qrBits(a, n), w, r, m); img.set(key(a, w, r), key(a, q.w, q.r)); }
    check(new Set(img.values()).size === states.length, 'the query is a permutation of the basis');
    const psi = (a, r) => [Math.cos(a + 2 * r + 0.3), Math.sin(3 * a - r)];
    const cl = qrClean(n, true), out = new Map();
    for (const [a, w, r] of states) {
      const amp = qrSame(n, w, cl) ? psi(a, r) : [0, 0];
      out.set(img.get(key(a, w, r)), amp);
    }
    for (const [a, w, r] of states) {
      const want = qrSame(n, w, cl) ? psi(a, ((r - D[a]) % m + m) % m) : [0, 0], got = out.get(key(a, w, r));
      check(Math.abs(got[0] - want[0]) < 1e-12 && Math.abs(got[1] - want[1]) < 1e-12, `amplitude action at ${key(a, w, r)}`);
    }
  }
  /* 3. the numbers on screen */
  check(qrStr(5, 3) === '101' && QR_D[5] === 9 && QR_D[2] === 4 && qrStr(2, 3) === '010', 'cells 5 and 2 hold 9 and 4');
  check(qrQuery(3, QR_D, qrBits(5, 3), qrClean(3, true), 0, QR_M).r === 9, '0 + 9 = 9');
  check(qrQuery(3, QR_D, qrBits(2, 3), qrClean(3, true), 0, QR_M).r === 4, '0 + 4 = 4');
  check(Math.abs(Math.pow(Math.SQRT1_2, 2) - 0.5) < 1e-15, 'weights one half');
  /* 4. the router labels: separation iff every deepest router is active, all subsets at depths 1..3 */
  for (let n = 1; n <= 3; n++) {
    const rs = qrRouters(n);
    for (let s = 0; s < (1 << rs.length); s++) {
      const act = new Set(rs.filter((_, i) => (s >> i) & 1));
      const deep = rs.filter(p => p.length === n - 1).every(p => act.has(p));
      check(qrSeparates(n, act) === deep, `separation iff deepest active, n=${n} s=${s}`);
    }
  }
  const allBut11 = new Set(qrRouters(3).filter(p => p !== '11'));
  check(qrRouters(3).filter(p => allBut11.has(p)).every(p => qrLabel('110', p) === qrLabel('111', p)), '110 and 111 agree when router 11 is silent');
  check(qrSeparates(3, new Set(['00', '01', '10', '11'])), 'the bottom row alone separates');
});
Object.assign(FILM.speed, { still: 0.02, yard: 0.014, read: 0.016, both: 0.014, listen: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const qrFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function qrRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
const QR_MISSING = new Set();
function qrLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!QR_MISSING.has(gid)) { QR_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}

/* the tree: G = { x0, w, top, h } → node position of prefix p */
function qrNode(G, p) {
  const k = p.length, v = k ? parseInt(p, 2) : 0;
  return [G.x0 + (v + 0.5) * G.w / (1 << k), G.top + k * G.h];
}
/* draw the tree. o.paths: [{ addr, p (levels set, 0..3, continuous), a, train }], o.silent: Set of silenced routers,
   o.marks: alpha of environment marks on active routers, o.cells: alpha of the cells, o.hi: Set of highlighted cells */
function qrTree(G, a, o = {}) {
  if (a <= 0.003) return;
  const n = QR_DEPTH, paths = o.paths || [], t = o.t || 0;
  /* which edges are set: for router p, the bit chosen by each path that has reached it */
  const setBit = (p, path) => {
    if (!path.addr.startsWith(p)) return null;
    return path.p > p.length ? path.addr[p.length] : null;
  };
  /* edges */
  for (const p of qrRouters(n)) {
    const P = qrNode(G, p);
    for (const c of ['0', '1']) {
      const Q2 = qrNode(G, p + c);
      line(P[0], P[1], Q2[0], Q2[1], C.dim, a * 0.55, 2);
      for (const path of paths) {
        if (setBit(p, path) !== c) continue;
        const f = clamp(path.p - p.length);
        line(P[0], P[1], lerp(P[0], Q2[0], f), lerp(P[1], Q2[1], f), C.cyan, a * path.a, 7);
      }
    }
  }
  /* trains, drawn under the routers so that a train standing at a router never hides its label */
  for (const path of paths) {
    if (!path.train || path.a <= 0.003) continue;
    const k = Math.min(n - 0.0001, Math.max(0, path.p)), j = Math.floor(k), f = k - j;
    const A = qrNode(G, path.addr.slice(0, j)), B = qrNode(G, path.addr.slice(0, j + 1));
    const pos = path.p >= n ? qrNode(G, path.addr) : [lerp(A[0], B[0], f), lerp(A[1], B[1], f)];
    dot(pos[0], pos[1], 22, 'g', a * path.a * path.train);
    if (path.tag) txt(path.tag, pos[0] + 30, pos[1] - 18, { size: 22, fam: F.math, w: 700, c: C.now, a: a * path.a * path.train });
  }
  /* routers. Two circuits, kept apart:
     · default (ReversibleQram, Boolean Toffoli/CNOT network): address bit k controls every split of level k, so each
       router of a reached level shows that bit (faint off the enable path, cyan on it); an unreached level is blank.
       There is no wait state here.
     · o.tri (HannRouterProfiles, three-state bucket-brigade routers): a router holds W (wait) unless loaded. */
  for (const p of qrRouters(n)) {
    const [x, y] = qrNode(G, p), silent = o.silent && o.silent.has(p);
    let lab = o.tri ? 'W' : '', col = C.dim, la = 1;
    const got = new Set();
    if (o.tri) {
      for (const path of paths) { const b = setBit(p, path); if (b != null) { got.add(b); col = C.cyan; } }
    } else {
      let onPath = false;
      for (const path of paths) {
        if (path.p > p.length) { got.add(path.addr[p.length]); if (path.addr.startsWith(p)) onPath = true; }
      }
      col = onPath ? C.cyan : C.dim; la = onPath ? 1 : 0.55;
    }
    if (got.size === 1) lab = [...got][0];
    else if (got.size > 1) lab = '0,1';               // superposed branches set this level both ways
    if (o.labels) { lab = o.labels(p); col = lab === 'W' ? C.dim : C.cyan; }
    if (o.marks && !silent) for (let q = 0; q < 3; q++) {
      const rr = 30 + ((t * 26 + q * 14) % 42);
      ring(x, y, rr, C.mag, a * o.marks * 0.55 * clamp((72 - rr) / 30), 2);
    }
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(4,10,24,0.92)'; ctx.beginPath(); ctx.arc(x, y, 26, 0, TAU); ctx.fill(); ctx.restore();
    ring(x, y, 26, silent ? C.dim : col, a, 2.5);
    txt(lab, x, y + (lab.length > 1 ? 7 : 10), { size: lab.length > 1 ? 19 : 28, fam: F.mono, w: 700, align: 'center', c: silent ? C.dim : col, a: a * la * (silent ? 0.5 : 1) });
    if (silent) { line(x - 30, y - 30, x + 30, y + 30, C.white, a * 0.7, 3); }
  }
  /* cells */
  const ca = a * (o.cells == null ? 1 : o.cells), cw = Math.min(96, G.w / 8 - 16);
  for (let i = 0; i < 8; i++) {
    const [x, y] = qrNode(G, qrStr(i, n)), hi = o.hi && o.hi.has(i);
    line(x, y - G.h * 0.05, x, y + 22, C.dim, ca * 0.6, 2);
    box(x - cw / 2, y + 22, cw, 74, hi ? C.now : C.white, ca, hi ? 3 : 1.5, 'rgba(4,10,24,0.8)');
    txt(String(QR_D[i]), x, y + 74, { size: 40, fam: F.mono, w: 700, align: 'center', c: hi ? C.now : C.white, a: ca });
    txt(String(i), x, y + 124, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca });
  }
}
/* opening title */
function qrTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 88, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('SET THE SWITCHES, FETCH THE CELL', p, 5), W / 2, 580, { size: 44, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('ADDRESS · SWITCHES · TALLY · UNDO · SUPERPOSITION · MARKS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 5 });
}

/* ======================================================================= */
/*                              scene 1 · STILL MEMORY                       */
/* ======================================================================= */
const ST = { x0: 170, y0: 250, cw: 100, ch: 92, cols: 8, rows: 4 };
const stDigit = (i, j) => Math.floor(10 * rnd(i * 8 + j, 17));
/* the sequence of addresses the cursor visits (fixed, not counting up) */
const ST_JUMPS = [[1, 5], [3, 2], [0, 7], [2, 0], [1, 1], [3, 6], [0, 3], [2, 5]];
SCENES.still = S => {
  const u = S.u;
  qrTitle(S);
  /* the grid fades in only after the title has gone (qrTitle ends at L0.s + 0.35) */
  const a = clamp((u - lineAt(S, 0).s - 0.4) / 0.6) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const ga =a * (1 - 0.55 * at(S, 2, 0.8));
  /* the grid: digits never change */
  for (let i = 0; i < ST.rows; i++) for (let j = 0; j < ST.cols; j++) {
    const x = ST.x0 + j * ST.cw, y = ST.y0 + i * ST.ch;
    box(x + 4, y + 4, ST.cw - 8, ST.ch - 8, C.white, ga * 0.55, 1.2, 'rgba(4,10,24,0.7)');
    txt(String(stDigit(i, j)), x + ST.cw / 2, y + ST.ch / 2 + 14, { size: 38, fam: F.mono, w: 700, align: 'center', c: C.white, a: ga * 0.9 });
  }
  /* the cursor jumps by address */
  const k = Math.floor(Math.max(0, u - lineAt(S, 0).s) / 0.9) % ST_JUMPS.length, [ci, cj] = ST_JUMPS[k];
  const cx = ST.x0 + cj * ST.cw, cy = ST.y0 + ci * ST.ch;
  box(cx, cy, ST.cw, ST.ch, C.now, ga, 4);
  txt(`address ${ci * 8 + cj}`, ST.x0, ST.y0 - 26, { size: 24, fam: F.mono, w: 700, c: C.now, a: ga });
  txt('memory · 存储', ST.x0 + ST.cols * ST.cw, ST.y0 - 26, { size: 24, fam: F.zh, w: 700, align: 'right', c: C.white, a: ga });
  txt('the digits never move · 数字从不移动', ST.x0, ST.y0 + ST.rows * ST.ch + 44, { size: 24, fam: F.zh, w: 700, c: C.cyan, a: ga * at(S, 0, 0.6, 1.5) });
  /* line 1: the idol */
  const ia = a * at(S, 1, 0.6) * (1 - at(S, 2, 0.6));
  if (ia > 0.003) {
    panel(1130, 300, 640, 260, ia, C.white, 'THE HABIT · 习惯');
    txt('read = carry the data away?', 1160, 400, { size: 32, fam: F.math, w: 700, c: C.white, a: ia });
    txt('读数据 = 把数据搬走？', 1160, 460, { size: 32, fam: F.zh, w: 700, c: C.white, a: ia });
    line(1150, 410, 1660, 380, C.mag, ia * Q(S, 1, 'somewhere', 0.6), 4);
  }
  /* line 2: a small tree preview, address sets switches */
  const ta = a * at(S, 2, 0.8);
  if (ta > 0.003) {
    const G = { x0: 1110, w: 680, top: 260, h: 110 };
    qrTree(G, ta, { paths: [{ addr: '101', p: 3 * ease(Q(S, 2, 'sets the switches', 1.6)), a: 1, train: 1 }], cells: 0.9 });
    txt('address 101 → switches · 地址拨道岔', 1450, 230, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.now, a: ta });
  }
  /* line 3: the model */
  const ma = a * at(S, 3, 0.6);
  if (ma > 0.003) {
    panel(170, 720, 860, 110, ma, C.argued, 'MODEL · 模型诠释');
    qrRich([['observer = pointer ', C.now], ['ptr', C.now], ['  ·  memory = still ', C.white], ['mem', C.white]], 196, 790, { size: 28, a: ma });
  }
};

/* ======================================================================= */
/*                              scene 2 · THE SWITCH YARD                    */
/* ======================================================================= */
const YG = { x0: 150, w: 1000, top: 230, h: 140 };
SCENES.yard = S => {
  const u = S.u, a = qrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Think of', 'argued'], [3, null, 'computed']]);
  const p = 3 * ease(Q(S, 3, 'right, left, right', 2.6));
  const done = Q(S, 3, 'cell five', 0.6);
  qrTree(YG, a, { paths: [{ addr: '101', p, a: 1, train: at(S, 3, 0.5) }], cells: at(S, 0, 0.8), hi: done > 0.5 ? new Set([5]) : null });
  /* line 0: levels */
  const la = a * at(S, 0, 0.6, 1.2);
  ['level 1', 'level 2', 'level 3'].forEach((s, k) => txt(s, YG.x0 - 10, YG.top + k * YG.h + 8, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la }));
  /* right panel: address register and rule */
  panel(1240, 210, 560, 250, a * at(S, 1, 0.6), C.cyan, 'ADDRESS · 地址');
  const ra = a * at(S, 1, 0.6);
  for (let k = 0; k < 3; k++) {
    const cur = p > k && p < k + 1.05, setk = p >= k + 1;
    chip(1330 + k * 110, 300, 86, 78, '101'[k], cur ? C.now : setk ? C.cyan : C.white, ra * Q(S, 1, 'each address bit', 0.6), 46);
    txt(`L${k + 1}`, 1330 + k * 110, 362, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ra * Q(S, 1, 'each address bit', 0.6) });
  }
  const ba = a * at(S, 2, 0.6);
  qrRich([['0', C.cyan], [' → left · 左    ', C.white], ['1', C.cyan], [' → right · 右', C.white]], 1270, 420, { size: 26, fam: F.zh, a: ba });
  /* the picture label */
  const pa = a * Q(S, 1, 'Think of', 0.6);
  if (pa > 0.003) {
    panel(1240, 490, 560, 130, pa, C.argued, 'PICTURE · 比方');
    txt('fork = points · 岔口 = 道岔', 1268, 552, { size: 24, fam: F.zh, w: 700, c: C.argued, a: pa });
    txt('enable signal = the train · 使能信号 = 火车', 1268, 594, { size: 24, fam: F.zh, w: 700, c: C.argued, a: pa });
  }
  /* line 3: the one-hot leaves */
  const oa = a * done;
  if (oa > 0.003) {
    panel(1240, 650, 560, 170, oa, C.cyan, 'LEAVES · 叶');
    for (let i = 0; i < 8; i++) txt(i === 5 ? '1' : '0', 1280 + i * 62, 730, { size: 38, fam: F.mono, w: 700, align: 'center', c: i === 5 ? C.now : C.dim, a: oa });
    txt('one leaf lit, the rest off · 只亮一格，其余全灭', 1268, 792, { size: 21, fam: F.zh, w: 700, c: C.white, a: oa });
  }
};

/* ======================================================================= */
/*                              scene 3 · READ, THEN UNDO                    */
/* ======================================================================= */
const RG = { x0: 150, w: 1000, top: 200, h: 130 };
SCENES.read = S => {
  const u = S.u, a = qrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [5, 'Lean checks', 'lean']]);
  const back = ease(Q(S, 3, 'runs backwards', 2.4));
  const p = 3 * (1 - back);
  const walk = ease(Q(S, 1, 'A tally walks', 3.4));
  qrTree(RG, a, { paths: [{ addr: '101', p, a: 1, train: 1 - back }], hi: new Set([5]) });
  /* the bus and the tally */
  const by = RG.top + 3 * RG.h + 150, x0 = RG.x0 + 20, x1 = RG.x0 + RG.w - 20;
  const ba = a * at(S, 0, 0.6, 1.4);
  line(x0, by, x1, by, C.white, ba * 0.7, 3);
  txt('bus · 总线', x0 - 14, by + 8, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.white, a: ba });
  const tx = lerp(x0, x1, walk), wa = a * at(S, 1, 0.5) * (1 - at(S, 3, 0.6));
  if (wa > 0.003) {
    ctx.save(); ctx.globalAlpha = wa; ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(tx, by - 6); ctx.lineTo(tx - 14, by + 20); ctx.lineTo(tx + 14, by + 20); ctx.closePath(); ctx.fill(); ctx.restore();
    txt('tally · 计数员', tx, by + 46, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: wa });
  }
  const x5 = qrNode(RG, '101')[0], passed5 = tx >= x5 - 4 && walk > 0;
  /* the dial */
  panel(1240, 200, 560, 270, a * at(S, 0, 0.6), C.cyan, 'BUS DIAL · 总线转盘 (mod 10)');
  const da = a * at(S, 0, 0.6);
  const val = passed5 ? 9 : 0;
  const cx = 1380, cy = 345, R = 92;
  ring(cx, cy, R, C.white, da * 0.6, 2);
  for (let d = 0; d < 10; d++) {
    const th = -Math.PI / 2 + d * TAU / 10;
    txt(String(d), cx + (R - 24) * Math.cos(th), cy + (R - 24) * Math.sin(th) + 8, { size: 22, fam: F.mono, w: 700, align: 'center', c: d === val ? C.now : C.dim, a: da });
  }
  const th = -Math.PI / 2 + val * TAU / 10;
  arrow(cx, cy, cx + (R - 46) * Math.cos(th), cy + (R - 46) * Math.sin(th), C.now, da, 4);
  qrRich([['r = 0 + ', C.white], ['9', C.now], [' = ', C.white], ['9', C.now]], 1510, 330, { size: 34, a: a * Q(S, 2, 'Zero plus nine', 0.5) });
  txt('cell 5 holds 9 · 第 5 格存 9', 1510, 390, { size: 22, fam: F.zh, w: 700, c: C.white, a: da });
  /* undo: wires panel */
  const ua = a * at(S, 3, 0.6) * (1 - at(S, 5, 0.3));
  if (ua > 0.003) {
    panel(1240, 500, 560, 260, ua, C.cyan, 'WIRES · 线路');
    const routed = qrWireList(3, qrRoute(3, qrBits(5, 3), qrClean(3, true))).map(Number);
    const cleanW = qrWireList(3, qrClean(3, true)).map(Number);
    const show = back > 0.5 ? cleanW : routed;
    show.forEach((b, i) => chip(1290 + i * 64, 590, 50, 56, String(b), b ? (back > 0.5 ? C.cyan : C.now) : C.dim, ua, 30));
    txt(back > 0.5 ? 'clean again · 恢复干净' : 'after routing · 路由之后', 1268, 670, { size: 24, fam: F.zh, w: 700, c: C.white, a: ua });
    txt('address 101 kept · 地址保留', 1268, 716, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ua });
  }
  /* line 4: the aphorism */
  stamp('READ · UNDO', 650, 830, Q(S, 4, 'Read the cell', 0.5, 0.2) * (1 - at(S, 5, 0.5, 0.2)), C.cyan, 34, -0.04);
  /* line 5: Lean (after the wires panel has gone) */
  const la = a * Q(S, 5, 'Lean checks', 0.6, 0.35);
  if (la > 0.003) {
    panel(1240, 500, 560, 320, la, C.lean, 'EVERY DEPTH n · 任意深度');
    qrRich([['query(a, clean, r)', C.white]], 1264, 572, { size: 26, a: la });
    qrRich([['  = (a, clean, r + D(a))', C.cyan]], 1264, 612, { size: 26, a: la * Q(S, 5, 'the bus gains', 0.5) });
    qrRich([['any wires w come back as w', C.white]], 1264, 666, { size: 22, a: la * Q(S, 5, 'the address and wires', 0.5) });
    txt('任意线路 w 原样复原', 1264, 700, { size: 22, fam: F.zh, w: 700, c: C.white, a: la * Q(S, 5, 'the address and wires', 0.5) });
    txt('D : address → any commutative additive group', 1264, 744, { size: 18, fam: F.mono, w: 700, c: C.dim, a: la });
    qrLean(1264, 796, QR_LEAN.correctness, la, { size: 19 });
  }
};

/* ======================================================================= */
/*                           scene 4 · TWO ADDRESSES AT ONCE                 */
/* ======================================================================= */
SCENES.both = S => {
  const u = S.u, a = qrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Lean checks', 'lean']]);
  const p = 3 * ease(Q(S, 1, 'its own path', 2.2));
  const hi = Q(S, 1, 'Cell two holds', 0.3) > 0.5 ? new Set([2, 5]) : null;
  qrTree(RG, a, { paths: [{ addr: '010', p, a: 0.85, train: at(S, 0, 0.6), tag: '1/√2' }, { addr: '101', p, a: 0.85, train: at(S, 0, 0.6), tag: '1/√2' }], hi });
  /* the ledger */
  panel(1200, 200, 600, 300, a, C.cyan, 'IN → OUT · 进 → 出');
  const ia = a * at(S, 0, 0.6);
  qrRich([['in   ', C.dim], ['(|010, 0⟩ + |101, 0⟩) / √2', C.now]], 1224, 270, { size: 26, a: ia });
  const oa = a * Q(S, 2, 'Out comes', 0.6);
  qrRich([['out  ', C.dim], ['(|010, ', C.white], ['4', C.cyan], ['⟩ + |101, ', C.white], ['9', C.cyan], ['⟩) / √2', C.white]], 1224, 330, { size: 26, a: oa });
  /* weights */
  const wa = a * Q(S, 2, 'each with weight', 0.6);
  if (wa > 0.003) {
    for (const [k, lab] of [[0, '2 ↔ 4'], [1, '5 ↔ 9']]) {
      const x = 1224 + k * 280;
      fillBox(x, 380, 240 * 0.5, 40, C.cyan, wa * 0.55); box(x, 380, 240, 40, C.cyan, wa * 0.5, 1.2);
      txt(`${lab}   (1/√2)² = 0.5`, x, 450, { size: 22, fam: F.math, w: 700, c: C.white, a: wa });
    }
  }
  /* Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1200, 530, 600, 290, la, C.lean, 'ANY AMPLITUDES ψ · 任意振幅');
    qrRich([['Q†Q = 1,   QQ† = 1', C.white]], 1224, 602, { size: 28, a: la * Q(S, 3, 'unitary', 0.5) });
    qrRich([['Q · init ψ = init ((a, r) ↦ ψ(a, r − D a))', C.cyan]], 1224, 656, { size: 23, a: la * Q(S, 3, 'moves any amplitudes', 0.5) });
    txt('values in a finite commutative group · 有限交换群', 1224, 706, { size: 19, fam: F.zh, w: 700, c: C.dim, a: la });
    qrLean(1224, 774, QR_LEAN.correctness, la, { size: 19 });
  }
  txt('|010⟩ = address 2   |101⟩ = address 5', RG.x0, 170, { size: 22, fam: F.math, w: 700, c: C.now, a: ia });
};

/* ======================================================================= */
/*                           scene 5 · WHO ELSE IS LISTENING                 */
/* ======================================================================= */
const LG = { x0: 130, w: 780, top: 260, h: 140 };
const LS_COLS = ['', '0', '1', '00', '01', '10', '11'];
SCENES.listen = S => {
  const u = S.u, a = qrFade(S);
  if (a <= 0) return;
  /* line 0 announces the change of circuit: from here on the routers are HannRouterProfiles' three-state routers */
  badgeQ(S, [[0, null, 'argued'], [2, null, 'computed'], [3, 'Lean checks', 'lean'], [4, null, 'computed']]);
  const phase3 = at(S, 4, 0.6);
  const silentA = Q(S, 2, 'Silence one bottom router', 0.4) > 0.5 && phase3 < 0.5;
  const silent = phase3 >= 0.5 ? new Set(['', '0', '1']) : silentA ? new Set(['11']) : new Set();
  const showAddr = phase3 >= 0.5 ? null : Q(S, 2, 'the neighbours', 0.3) > 0.5 ? '11' : null;
  const marks = Q(S, 1, 'leak a mark', 0.8);
  qrTree(LG, a, {
    t: S.t, marks, silent, cells: 0.8, tri: true,
    paths: showAddr ? [{ addr: '110', p: 3, a: 0.7, train: 0 }, { addr: '111', p: 3, a: 0.7, train: 0 }] : [],
    labels: showAddr ? (p => (p === '11' ? '?' : p === '' || p === '1' ? '1' : 'W')) : null
  });
  txt('three-state routers · 三态路由器', LG.x0, LG.top - 72, { size: 22, fam: F.zh, w: 700, c: C.white, a: a * 0.85 });
  txt('mark · 痕迹', LG.x0 + LG.w / 2 + 70, LG.top - 40, { size: 22, fam: F.zh, w: 700, c: C.mag, a: a * marks });
  /* lines 0–1: the new circuit and what "active" means */
  const ca = a * (1 - at(S, 2, 0.5));
  if (ca > 0.003) {
    panel(990, 200, 820, 330, ca, C.argued, 'A DIFFERENT CIRCUIT · 换一种电路');
    txt('bucket-brigade routers', 1014, 272, { size: 28, fam: F.math, w: 700, c: C.white, a: ca });
    qrRich([['W', C.dim], [' = wait   ', C.white], ['0', C.cyan], [' = left   ', C.white], ['1', C.cyan], [' = right', C.white]], 1014, 324, { size: 28, a: ca });
    txt('桶链式三态路由器：W 等待，0 左，1 右', 1014, 372, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca });
    const ma = ca * marks;
    txt('active · 活跃: leaves a mark, q(v) < 1', 1014, 436, { size: 24, fam: F.mono, w: 700, c: C.mag, a: ma });
    txt('noise model · 噪声模型的设定', 1014, 482, { size: 20, fam: F.zh, w: 700, c: C.argued, a: ma });
  }
  /* the table for 110 and 111 */
  const tA = a * at(S, 2, 0.6) * (1 - phase3);
  if (tA > 0.003) {
    panel(990, 200, 820, 270, tA, C.mag, 'ROUTER LABELS · 路由器标签');
    const cx0 = 1150, dx = 92;
    LS_COLS.forEach((c, k) => {
      const sil = silent.has(c);
      txt(c === '' ? 'root' : c, cx0 + k * dx, 270, { size: 20, fam: F.mono, w: 700, align: 'center', c: sil ? C.dim : C.mag, a: tA });
    });
    ['110', '111'].forEach((ad, r) => {
      const y = 330 + r * 60;
      txt(ad, 1014, y, { size: 28, fam: F.mono, w: 700, c: C.now, a: tA });
      LS_COLS.forEach((c, k) => {
        const lab = qrLabel(ad, c), sil = silent.has(c);
        txt(lab, cx0 + k * dx, y, { size: 28, fam: F.mono, w: 700, align: 'center', c: sil ? C.dim : lab === 'W' ? C.white : C.cyan, a: tA * (sil ? 0.35 : 1) });
      });
    });
    const sa = tA * Q(S, 2, 'look the same', 0.5);
    txt('silent column hidden → rows identical · 去掉沉默的一列，两行一样', 1014, 446, { size: 21, fam: F.zh, w: 700, c: C.white, a: sa });
  }
  /* Lean */
  const la = a * Q(S, 3, 'Lean checks', 0.6) * (1 - phase3);
  if (la > 0.003) {
    panel(990, 500, 820, 320, la, C.lean, 'EXACT RULE · 精确条件  (depth ≥ 1)');
    txt('active labels tell all addresses apart', 1014, 572, { size: 26, fam: F.math, w: 700, c: C.white, a: la });
    txt('⟺  every deepest router is active', 1014, 616, { size: 26, fam: F.math, w: 700, c: C.cyan, a: la * (0.3 + 0.7 * Q(S, 3, 'if and only if', 0.5)) });
    txt('活跃标签分清所有地址 ⟺ 最底层路由器全部活跃', 1014, 664, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
    txt('active · 活跃:  q(v) < 1', 1014, 708, { size: 20, fam: F.mono, w: 700, c: C.dim, a: la });
    qrLean(1014, 776, QR_LEAN.profile_separation_iff, la, { size: 18 });
  }
  /* line 3: the bottom row alone */
  if (phase3 > 0.003) {
    const ba = a * phase3;
    panel(990, 200, 820, 620, ba, C.mag, 'BOTTOM ROW ONLY · 只看底层');
    const cols = ['00', '01', '10', '11'], cx0 = 1200, dx = 140;
    cols.forEach((c, k) => txt(c, cx0 + k * dx, 270, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ba }));
    for (let i = 0; i < 8; i++) {
      const ad = qrStr(i, 3), y = 324 + i * 52;
      txt(ad, 1030, y, { size: 26, fam: F.mono, w: 700, c: C.now, a: ba });
      cols.forEach((c, k) => { const lab = qrLabel(ad, c); txt(lab, cx0 + k * dx, y, { size: 26, fam: F.mono, w: 700, align: 'center', c: lab === 'W' ? C.dim : C.cyan, a: ba }); });
    }
    txt('8 rows, 8 different patterns · 八行各不相同', 1030, 774, { size: 22, fam: F.zh, w: 700, c: C.white, a: ba * Q(S, 4, 'bottom row alone', 0.5) });
  }
};

/* ======================================================================= */
/*                          scene 6 · WHAT IT DOES NOT SAY                   */
/* ======================================================================= */
const EG = { x0: 130, w: 640, top: 250, h: 120 };
SCENES.edge = S => {
  const u = S.u, a = qrFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  qrTree(EG, a * 0.85, { paths: [{ addr: '101', p: 3, a: 0.8, train: 1 }], hi: new Set([5]) });
  /* the tally passes every leaf */
  const by = EG.top + 3 * EG.h + 150, x0 = EG.x0 + 10, x1 = EG.x0 + EG.w - 10;
  const tA = a * Q(S, 0, 'no gate, depth', 0.6);
  line(x0, by, x1, by, C.white, tA * 0.6, 2);
  const tx = lerp(x0, x1, Math.max(0, S.u - phraseAt(S, 0, 'no gate, depth')) / 4 % 1);
  if (tA > 0.003) { ctx.save(); ctx.globalAlpha = tA; ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(tx, by - 6); ctx.lineTo(tx - 12, by + 16); ctx.lineTo(tx + 12, by + 16); ctx.closePath(); ctx.fill(); ctx.restore(); }
  const rows = [
    { k: 0, ph: null, col: C.cyan, en: 'fixed classical data D, ideal circuits', zh: '固定的经典数据，理想的电路', note: 'no copying of unknown quantum data · 不复制未知量子数据' },
    { k: 0, ph: 'no gate, depth', col: C.cyan, en: 'no gate count, depth or noise bound', zh: '不给门数、深度、噪声的界', note: 'the Boolean tally walks past all cells · 计数员走过每一格' },
    { k: 1, ph: null, col: C.argued, en: 'three switches per branch: literature', zh: '每支三副道岔：桶链式文献结果', note: 'observer = pointer: MODEL · 观察者即指针：模型诠释' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * (rw.ph ? Q(S, rw.k, rw.ph, 0.6) : at(S, rw.k, 0.6));
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(880, y, 940, 180, ra, rw.col);
    txt(rw.en, 910, y + 58, { size: 30, fam: F.math, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 910, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 910, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
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
  qrTree({ x0: 120, w: 880, top: 220, h: 150 }, 1, { paths: [{ addr: '010', p: 3, a: 0.85, train: 1 }, { addr: '101', p: 3, a: 0.85, train: 1 }], hi: new Set([2, 5]) });
  txt(DATA.film.title_zh, 1440, 420, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('SET THE SWITCHES,', 1440, 520, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 4 });
  txt('FETCH THE CELL', 1440, 582, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.now, ab: 2, ls: 4 });
  qrRich([['|010⟩ + |101⟩ → |010, 4⟩ + |101, 9⟩', C.white]], 1440, 680, { size: 32, align: 'center' });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1440, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
