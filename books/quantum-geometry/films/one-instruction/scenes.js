/* Film · One instruction, paid step by step · 一条指令，一步一付
   (book quantum-geometry, part VIII: chapter 28, section 28.2). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook      a wall of instruction mnemonics folds into one; that one instruction suffices for any computation given
               unbounded memory is the OISC literature result (Mavaddat & Parhami 1988; argued); the book's reading of
               the universe as the single comparison CMP(A, B) = A·B + A∧B is a MODEL (argued).
     cards     compareMachine replayed step by step on a = 1011, b = 1001: pop both tops into the aside piles while
               folding the equality flag, continue to the bottom after the mismatch, restore a then b, push the flag:
               16 steps, output false (computed: a step interpreter of the Lean machine, below).
     bill      BinaryNameComparison.name_compare_run (LEAN): for any a, b, output and frame the machine halts within
               2(|a| + |b|) + 4 steps with decide (a = b) on top of the output and a, b, frame restored, scratch empty;
               here 2·8 + 4 = 20 ≥ 16; other runs 14 ≤ 16 (10 vs 1011) and 4 ≤ 4 (two empty names) (computed).
     dict      dictionaryMachine replayed on names 011, 101, 110, 000 (stream: each name reversed, every bit as
               [1, b], then 0; 4 × 7 = 28 cells) and query 110: two misses, a hit, rewind; index stack
               true :: [true, true]; 104 steps (computed).
     dictbill  BinaryNameDictionary.dictionary_lookup_run (LEAN): within (2|q| + 12)|names| + 4|stream| + 3 steps the index
               stack is decide (q ∈ names) :: replicate (idxOf q) true and q, stream, frame are restored;
               here 18·4 + 4·28 + 3 = 187; runs 104 (110) and 139 (111: false :: four tallies) (computed).
     edge      the bounds are upper bounds for these two constructions (this compare machine never stops early); a
               lower bound for every comparison method needs a separate cost model and proof (not claimed); the
               one-instruction universe stays a MODEL (argued).

   On load, FILM.init checks DATA.lean against the two theorems, replays both machines on many inputs against the
   output, restoration and step ceiling the theorems state, and re-derives every number on screen. Any disagreement is
   pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                       the two machines, step by step                     */
/* ======================================================================= */
const OI_LEAN = {
  name_compare_run: 'D5/S0/Computability/BinaryNameComparison.name_compare_run',
  dictionary_lookup_run: 'D5/S0/Computability/BinaryNameDictionary.dictionary_lookup_run'
};
/* values on the stacks are cards { id, b }; the head of an array is the top of the stack */
let OI_ID = 0;
const oiCard = b => ({ id: OI_ID++, b });
const oiCards = s => [...s].map(c => oiCard(c === '1'));
const oiBits = st => st.map(c => (c.b ? '1' : '0')).join('');
/* one step of compareMachine (one label: its statement runs to the next goto or halt). P renames the stacks, so the
   same routine also runs inside the dictionary machine (liftComparison). Returns the next label, or 'halt'. */
function oiCmpStep(L, s, S, P = k => k) {
  const pop = k => { const v = S[P(k)].length ? S[P(k)][0] : null; S[P(k)] = S[P(k)].slice(1); return v; };
  const push = (k, v) => { S[P(k)] = [v, ...S[P(k)]]; };
  const clear = () => { s.left = null; s.right = null; };
  if (L === 'compare') {
    s.left = pop('left'); s.right = pop('right');
    if (s.left === null && s.right === null) { clear(); return 'restoreLeft'; }
    s.equal = s.equal && !!s.left && !!s.right && s.left.b === s.right.b;
    if (s.left !== null) { push('savedLeft', s.left); if (s.right !== null) push('savedRight', s.right); clear(); return 'compare'; }
    push('savedRight', s.right); clear(); return 'compare';
  }
  if (L === 'restoreLeft') { s.left = pop('savedLeft'); if (s.left === null) { clear(); return 'restoreRight'; } push('left', s.left); clear(); return 'restoreLeft'; }
  if (L === 'restoreRight') { s.right = pop('savedRight'); if (s.right === null) { clear(); return 'finish'; } push('right', s.right); clear(); return 'restoreRight'; }
  if (L === 'finish') { push('output', oiCard(s.equal)); s.left = null; s.right = null; s.equal = true; return 'halt'; }
  throw new Error('compareMachine: no label ' + L);
}
const oiCopy = S => Object.fromEntries(Object.entries(S).map(([k, v]) => [k, v.slice()]));
/* run compareMachine from (compare, ⟨none, none, true⟩, a, b, [], [], output, frame); states[i] is the configuration
   after i steps */
function oiRunCompare(a, b, output = [], frame = []) {
  const S = { left: a.slice(), right: b.slice(), savedLeft: [], savedRight: [], output: output.slice(), frame: frame.slice() };
  const s = { left: null, right: null, equal: true };
  const states = [{ L: 'compare', S: oiCopy(S), eq: true }];
  let L = 'compare';
  while (L !== 'halt') { L = oiCmpStep(L, s, S); states.push({ L, S: oiCopy(S), eq: s.equal }); }
  return { steps: states.length - 1, states, S };
}
/* the dictionary stream: every name reversed, each bit as [1, b], then 0 (Conventional.nameWord) */
const oiNameWord = nm => [...nm.flatMap(c => [oiCard(true), c]), oiCard(false)];
const oiStream = names => names.flatMap(nm => oiNameWord(nm.slice().reverse().map(c => oiCard(c.b))));
/* run dictionaryMachine from lookupCfg .start query [] [] [] frame (dictionaryStream names) [] []; snaps[i] after i steps */
function oiRunDict(query, names, frame = []) {
  const S = { op_left: query.slice(), op_right: [], op_savedLeft: [], op_savedRight: [], op_output: [], op_frame: frame.slice(), stream: oiStream(names), history: [], index: [] };
  const c = { left: null, right: null, equal: true }, P = k => 'op_' + k;
  let found = false, L = 'start';
  const pop = k => { const v = S[k].length ? S[k][0] : null; S[k] = S[k].slice(1); return v; };
  const push = (k, v) => { S[k] = [v, ...S[k]]; };
  const snap = () => ({ L, S: oiCopy(S), found });
  const snaps = [snap()], stream0 = S.stream.slice();
  while (L !== 'halt') {
    if (L.startsWith('C:')) { const r = oiCmpStep(L.slice(2), c, S, P); L = r === 'halt' ? 'dispatch' : 'C:' + r; snaps.push(snap()); continue; }
    let v;
    switch (L) {
      case 'start': L = S.stream.length ? 'tag' : 'rewind'; break;                    // peek, branch on none
      case 'tag': v = pop('stream'); if (v === null) { L = 'clearRight'; break; } push('history', v); L = v.b ? 'bit' : 'ready'; break;
      case 'bit': v = pop('stream'); if (v === null) { L = 'clearRight'; break; } push('history', v); push('op_right', oiCard(v.b)); L = 'tag'; break;
      case 'ready': c.left = null; c.right = null; c.equal = true; L = 'C:compare'; break;
      case 'dispatch': v = pop('op_output'); found = v === null ? false : v.b; L = 'clearRight'; break;
      case 'clearRight': v = pop('op_right'); if (v === null) { if (found) L = 'rewind'; else { push('index', oiCard(true)); L = 'start'; } } break;
      case 'rewind': v = pop('history'); if (v === null) L = 'finish'; else push('stream', v); break;
      case 'finish': push('index', oiCard(found)); found = false; L = 'halt'; break;
      default: throw new Error('dictionaryMachine: no label ' + L);
    }
    snaps.push(snap());
  }
  return { steps: snaps.length - 1, snaps, S, stream0 };
}
const oiBoundCmp = (a, b) => 2 * (a.length + b.length) + 4;
/* names as strings; the stream holds 2|name| + 1 cells per name */
const oiBoundDict = (q, names) => (2 * q.length + 12) * names.length + 4 * names.reduce((s, nm) => s + 2 * nm.length + 1, 0) + 3;

/* the runs shown on screen */
const OI_A = oiCards('1011'), OI_B = oiCards('1001');
const OI_CMP = oiRunCompare(OI_A, OI_B);
const OI_NAMES = ['011', '101', '110', '000'].map(oiCards);
const OI_Q = oiCards('110'), OI_MISS = oiCards('111');
const OI_DICT = oiRunDict(OI_Q, OI_NAMES);
const OI_DMISS = oiRunDict(OI_MISS, OI_NAMES);
const OI_RUNS = [['1011', '1001'], ['10', '1011'], ['', '']].map(([x, y]) => {
  const r = oiRunCompare(oiCards(x), oiCards(y));
  return { a: x, b: y, steps: r.steps, bound: oiBoundCmp(x, y) };
});

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('one-instruction film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(OI_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(OI_LEAN).length}`);
  for (const [short, gid] of Object.entries(OI_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. name_compare_run on every pair of names up to length 5, with a nonempty output and frame */
  const all = n => { const o = ['']; for (let k = 1; k <= n; k++) for (let m = 0; m < 1 << k; m++) o.push(m.toString(2).padStart(k, '0')); return o; };
  const W5 = all(5);
  for (const x of W5) for (const y of W5) {
    const out0 = oiCards('01'), fr = oiCards('110');
    const r = oiRunCompare(oiCards(x), oiCards(y), out0, fr);
    const tag = `compare ${x || 'ε'} ${y || 'ε'}`;
    check(r.steps <= oiBoundCmp(x, y), `${tag}: ${r.steps} steps > ${oiBoundCmp(x, y)}`);
    check(r.steps === Math.max(x.length, y.length) + x.length + y.length + 4, `${tag}: exact count`);
    check(oiBits(r.S.left) === x && oiBits(r.S.right) === y && !r.S.savedLeft.length && !r.S.savedRight.length, `${tag}: restoration`);
    check(oiBits(r.S.output) === (x === y ? '1' : '0') + '01' && oiBits(r.S.frame) === '110', `${tag}: output and frame`);
  }
  /* 2. dictionary_lookup_run on dictionaries of up to five names of length ≤ 3, every query of length ≤ 3 */
  const W3 = all(3);
  for (let k = 0; k < 160; k++) {
    const m = Math.floor(rnd(k, 1) * 6), names = [];
    for (let i = 0; i < m; i++) names.push(W3[Math.floor(rnd(k, 10 + i) * W3.length)]);
    const q = W3[Math.floor(rnd(k, 2) * W3.length)];
    const r = oiRunDict(oiCards(q), names.map(oiCards), oiCards('10'));
    const idx = names.indexOf(q), at = idx < 0 ? names.length : idx, hit = idx >= 0;
    const tag = `dictionary [${names.join(',')}] ? ${q || 'ε'}`;
    check(r.steps <= oiBoundDict(q, names), `${tag}: ${r.steps} steps > ${oiBoundDict(q, names)}`);
    check(oiBits(r.S.index) === (hit ? '1' : '0') + '1'.repeat(at), `${tag}: index ${oiBits(r.S.index)}`);
    check(oiBits(r.S.stream) === oiBits(oiStream(names.map(oiCards))) && oiBits(r.S.op_left) === q && oiBits(r.S.op_frame) === '10', `${tag}: restoration`);
    check(!r.S.op_right.length && !r.S.op_savedLeft.length && !r.S.op_savedRight.length && !r.S.op_output.length && !r.S.history.length, `${tag}: scratch empty`);
  }

  /* 3. the numbers on screen */
  check(OI_CMP.steps === 16 && oiBits(OI_CMP.S.output) === '0' && oiBoundCmp('1011', '1001') === 20, 'cards: 16 steps, not equal, ceiling 20');
  check(OI_CMP.states.filter(z => z.L === 'compare').length === 5, 'cards: five compare steps');  // states before steps 1..5
  check(JSON.stringify(OI_RUNS.map(r => [r.steps, r.bound])) === '[[16,20],[14,16],[4,4]]', 'bill: the three runs');
  check(oiStream(OI_NAMES).length === 28, 'dict: 28 tape cells');
  check(OI_DICT.steps === 104 && oiBits(OI_DICT.S.index) === '111', 'dict: 110 found at entry 2 in 104 steps');
  check(OI_DMISS.steps === 139 && oiBits(OI_DMISS.S.index) === '01111', 'dictbill: 111 not found in 139 steps');
  check(oiBoundDict('110', ['011', '101', '110', '000']) === 187 && (2 * 3 + 12) * 4 === 72 && 4 * 28 === 112, 'dictbill: 72 + 112 + 3 = 187');
});
Object.assign(FILM.speed, { hook: 0.02, cards: 0.012, bill: 0.014, dict: 0.012, dictbill: 0.014, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const oiFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function oiRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col, al] of parts) { txt(s, cx, y, { size, fam, w, c: col, a: a * (al == null ? 1 : al), ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const OI_MISSING = new Set();
function oiLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!OI_MISSING.has(gid)) { OI_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the step of a replay at scene time: segs = [[step0, step1, t0, t1], …] */
function oiStep(S, segs) {
  let k = segs[0][0];
  for (const [k0, k1, t0, t1] of segs) if (S.u >= t0) k = lerp(k0, k1, clamp((S.u - t0) / Math.max(0.01, t1 - t0)));
  return k;
}
/* a playing card holding one bit */
const OI_CW = 116, OI_CH = 52;
function oiCardDraw(x, y, bit, a, o = {}) {
  if (a <= 0.003) return;
  const col = o.col || C.white;
  box(x - OI_CW / 2, y - OI_CH / 2, OI_CW, OI_CH, col, a, o.lw || 2, 'rgba(4,10,24,0.88)');
  txt(bit ? '1' : '0', x, y + 13, { size: 36, fam: F.mono, w: 700, align: 'center', c: o.tc || C.white, a });
}
/* a bar of length v on a scale where `full` is w pixels */
function oiBar(x, y, w, h, v, full, col, a, lab) {
  if (a <= 0.003) return;
  fillBox(x, y, w * v / full, h, col, a * 0.55); box(x, y, w * v / full, h, col, a, 1.5);
  if (lab) txt(lab, x + w * v / full + 14, y + h / 2 + 9, { size: 24, fam: F.mono, w: 700, c: col, a });
}
/* opening title */
function oiTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('ONE INSTRUCTION, PAID STEP BY STEP', p, 5), W / 2, 580, { size: 42, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 4, ab: 2 });
  txt('COMPARE · RESTORE · LOOK UP · THE BILL · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                            scene 1 · ONE INSTRUCTION                      */
/* ======================================================================= */
const HK_OPS = ['ADD', 'SUB', 'MUL', 'DIV', 'MOD', 'AND', 'OR', 'XOR', 'NOT', 'SHL', 'SHR', 'ROL', 'LOAD', 'STORE', 'MOV', 'PUSH',
  'POP', 'CALL', 'RET', 'JMP', 'JZ', 'JNZ', 'CMP', 'TEST', 'INC', 'DEC', 'NEG', 'LEA', 'FADD', 'FMUL', 'FDIV', 'SQRT',
  'NOP', 'HALT', 'IN', 'OUT', 'SWAP', 'BSWAP', 'CLZ', 'POPCNT'];
SCENES.hook = S => {
  const u = S.u;
  oiTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  /* line 0: the wall of instructions; line 1: it folds into one tile */
  const fold = ease(Q(S, 1, 'one well-chosen', 1.6));
  const cx = 560, cy = 470;
  HK_OPS.forEach((op, i) => {
    const col = i % 5, row = Math.floor(i / 5);
    const x0 = 250 + col * 132, y0 = 250 + row * 64;
    const x = lerp(x0, cx, fold), y = lerp(y0, cy, fold);
    const ta = a * clamp((u - lineAt(S, 0).s - 0.04 * i) / 0.4) * (1 - fold);
    chip(x, y, 116, 46, op, C.dim, ta, 20);
  });
  const oa = a * Q(S, 1, 'one well-chosen', 0.6, 1.0);
  if (oa > 0.003) {
    txt('e.g. · 例如', cx, cy - 52, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: oa * 0.9 });
    chip(cx, cy, 250, 74, 'SUBLEQ', C.argued, oa, 36);
    txt('subtract, then jump if ≤ 0', cx, cy + 74, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: oa });
    txt('相减，非正则跳转', cx, cy + 108, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: oa * 0.9 });
    txt('one instruction suffices: literature result · Mavaddat & Parhami 1988', cx, cy + 160, { size: 19, fam: F.mono, w: 700, align: 'center', c: C.argued, a: oa });
    txt('单指令即可图灵完备（内存不设上限）：文献结果', cx, cy + 190, { size: 19, fam: F.zh, w: 700, align: 'center', c: C.argued, a: oa });
  }
  /* line 2: the book's reading, CMP(A, B) as a line plus an area */
  const ma = a * Q(S, 2, 'reads the universe', 0.7);
  if (ma > 0.003) {
    panel(1060, 220, 660, 420, ma, C.argued, 'MODEL · 本书的读法');
    const O = [1180, 570], R = 220, th = 52 * Math.PI / 180;
    const B = [O[0] + R * Math.cos(th), O[1] - R * Math.sin(th)], A = [O[0] + R, O[1]], foot = [O[0] + R * Math.cos(th), O[1]];
    ctx.save(); ctx.globalAlpha = ma * 0.9; ctx.beginPath(); ctx.moveTo(O[0], O[1]); ctx.lineTo(A[0], A[1]); ctx.lineTo(A[0] + B[0] - O[0], B[1]); ctx.lineTo(B[0], B[1]); ctx.closePath();
    ctx.fillStyle = rgba(C.mag, 0.22); ctx.fill(); ctx.strokeStyle = C.mag; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
    line(O[0], O[1], foot[0], foot[1], C.cyan, ma, 8);
    arrow(O[0], O[1], A[0], A[1], C.white, ma, 4);
    arrow(O[0], O[1], B[0], B[1], C.white, ma, 4);
    txt('A', A[0] + 12, A[1] + 10, { size: 30, fam: F.math, w: 700, c: C.white, a: ma });
    txt('B', B[0] - 34, B[1] + 6, { size: 30, fam: F.math, w: 700, c: C.white, a: ma });
    oiRich([['CMP(A, B) = ', C.white], ['A·B', C.cyan], [' + ', C.white], ['A∧B', C.mag]], 1090, 290, { size: 34, a: ma });
    oiRich([['line · 线', C.cyan], ['   +   ', C.white], ['area · 面积', C.mag]], 1090, 336, { size: 22, fam: F.zh, a: ma * 0.9 });
    txt('one comparison, nothing else · 只此一条比较', 1390, 610, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.argued, a: ma });
  }
  /* line 3: free? */
  const fa = a * at(S, 3, 0.5, 0.5);
  stamp('FREE?', 1430, 760, fa, C.mag, 60, -0.07);
};

/* ======================================================================= */
/*                           scene 2 · TWO STACKS OF CARDS                   */
/* ======================================================================= */
/* columns: the two names, the two aside piles and the output */
const CD_COL = { left: 250, right: 410, savedLeft: 680, savedRight: 840, output: 1110 };
const CD_BOT = 730, CD_GAP = 62;
function cdLayout(st) {
  const pos = new Map();
  for (const k of Object.keys(CD_COL)) {
    const arr = st.S[k], n = arr.length;
    arr.forEach((c, j) => pos.set(c.id, { x: CD_COL[k], y: CD_BOT - (n - 1 - j) * CD_GAP, k, b: c.b }));
  }
  return pos;
}
/* the compared pairs, bottom up, of the state after step i (only in the compare phase) */
function cdPairs(st) {
  const L = st.S.savedLeft.slice().reverse(), R = st.S.savedRight.slice().reverse();
  return L.map((c, j) => [c.b, R[j] ? R[j].b : null]);
}
SCENES.cards = S => {
  const u = S.u, a = oiFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const T = OI_CMP.states;
  /* steps: compare 0→5 over lines 1–2, restore 5→15 over line 3, finish 15→16 in line 4 */
  const k = oiStep(S, [[0, 5, phraseAt(S, 1, 'turns over'), lineAt(S, 2).e - 0.4], [5, 15, lineAt(S, 3).s + 0.3, lineAt(S, 3).e], [15, 16, phraseAt(S, 4, 'writes one bit'), phraseAt(S, 4, 'writes one bit') + 0.7]]);
  const i = Math.min(T.length - 1, Math.floor(k)), f = ease(clamp((k - i) / 0.55));
  const P0 = cdLayout(T[i]), P1 = cdLayout(T[Math.min(T.length - 1, i + 1)]);
  /* column labels */
  const la = a * at(S, 0, 0.6);
  const labs = [['left', 'a', '名字 a'], ['right', 'b', '名字 b'], ['savedLeft', 'aside a', '一旁 a'], ['savedRight', 'aside b', '一旁 b'], ['output', 'output', '输出']];
  for (const [kk, en, zh] of labs) {
    line(CD_COL[kk] - 66, CD_BOT + 36, CD_COL[kk] + 66, CD_BOT + 36, C.dim, la * 0.8, 2);
    txt(en, CD_COL[kk], CD_BOT + 68, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: la });
    txt(zh, CD_COL[kk], CD_BOT + 96, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: la });
  }
  txt('1011', CD_COL.left, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: la * (1 - at(S, 1, 0.6)) });
  txt('1001', CD_COL.right, 470, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.dim, a: la * (1 - at(S, 1, 0.6)) });
  /* the cards, moving between the configuration after step i and after step i + 1 */
  const ids = new Set([...P0.keys(), ...P1.keys()]);
  for (const id of ids) {
    const p = P0.get(id), q = P1.get(id);
    if (p && q) {
      const moving = p.x !== q.x || p.y !== q.y;
      const x = lerp(p.x, q.x, f), y = lerp(p.y, q.y, f) - (moving ? 46 * Math.sin(Math.PI * f) : 0);
      oiCardDraw(x, y, p.b, a * la, { col: moving && f > 0 && f < 1 ? C.now : (q.k === 'output' ? C.now : C.dim) });
    } else if (q) oiCardDraw(q.x, q.y, q.b, a * f, { col: C.now, tc: C.now });          // the output bit appears
    else if (p) oiCardDraw(p.x, p.y, p.b, a * (1 - f), { col: C.dim });
  }
  /* the verdict of each compared pair, beside the aside piles (compare phase) */
  const iv = Math.min(T.length - 1, Math.floor(k + 0.45));                 // the counter's step: cards have landed
  const st = T[iv], pairs = iv <= 5 ? cdPairs(st) : [];
  const pa = a * (1 - clamp((k - 5) / 0.6));
  pairs.forEach(([x, y], j) => {
    const yy = CD_BOT - j * CD_GAP;                                         // pair j is the j-th card from the bottom
    const same = x === y;
    txt(same ? '=' : '≠', (CD_COL.savedLeft + CD_COL.savedRight) / 2, yy + 14, { size: 40, fam: F.math, w: 700, align: 'center', c: same ? C.cyan : C.mag, a: pa });
  });
  const mo = a * at(S, 0, 0.6);
  txt('standing in for CMP(A, B): the book\'s MODEL', 180, 236, { size: 20, fam: F.mono, w: 700, c: C.argued, a: mo });
  txt('以比特机代表比较的成本：本书的模型', 180, 268, { size: 20, fam: F.zh, w: 700, c: C.argued, a: mo });
  /* the readout */
  panel(1260, 200, 460, 500, a, C.cyan, 'THE MACHINE · 机器');
  const phase = st.L === 'compare' ? ['compare', '比对'] : st.L === 'restoreLeft' ? ['restore a', '复原 a'] : st.L === 'restoreRight' ? ['restore b', '复原 b'] : st.L === 'finish' ? ['write the bit', '写下结果'] : ['halted', '停机'];
  txt('STEP · 步', 1290, 268, { size: 22, fam: F.zh, w: 700, c: C.dim, a });
  txt(String(iv), 1290, 360, { size: 88, fam: F.mono, w: 700, c: C.now, a });
  txt(`${phase[0]} · ${phase[1]}`, 1290, 420, { size: 26, fam: F.zh, w: 700, c: C.white, a });
  const eq = T[iv].eq;
  txt('equal so far · 目前相同', 1290, 486, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 1, 0.6) });
  txt(iv <= 5 ? (eq ? 'yes · 是' : 'no · 否') : '—', 1290, 528, { size: 30, fam: F.zh, w: 700, c: iv <= 5 ? (eq ? C.cyan : C.mag) : C.dim, a: a * at(S, 1, 0.6) });
  const ra = a * Q(S, 2, 'even after a mismatch', 0.5) * (1 - at(S, 3, 0.5));
  txt('keeps reading to the bottom', 1290, 590, { size: 20, fam: F.mono, w: 700, c: C.white, a: ra });
  txt('不提前收工', 1290, 620, { size: 20, fam: F.zh, w: 700, c: C.white, a: ra });
  const ea = a * Q(S, 4, 'not equal', 0.5);
  if (ea > 0.003) {
    txt('output 0 = not equal', 1290, 590, { size: 22, fam: F.mono, w: 700, c: C.now, a: ea });
    txt('输出 0：不同 · 16 步', 1290, 624, { size: 22, fam: F.zh, w: 700, c: C.now, a: ea });
    txt('step-by-step replay (computed)', 1290, 672, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: ea * 0.9 });
  }
};

/* ======================================================================= */
/*                                scene 3 · THE BILL                         */
/* ======================================================================= */
SCENES.bill = S => {
  const u = S.u, a = oiFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [3, null, 'computed']]);
  /* the theorem */
  panel(140, 200, 1000, 400, a, C.lean, 'ANY TWO NAMES · 任意两个名字');
  txt('a, b : List Bool    any lengths · 长度任意', 172, 268, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  const fa = a * Q(S, 1, 'At most', 0.6);
  oiRich([['steps ≤ 2(|a| + |b|) + 4', C.white]], 172, 340, { size: 40, a: fa });
  oiRich([['2(4 + 4) + 4 = ', C.white], ['20', C.white]], 172, 400, { size: 32, a: a * Q(S, 1, 'twice eight', 0.6) });
  const ra = a * at(S, 2, 0.6);
  txt('halts with · 停机时：', 172, 464, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
  txt('output ← decide (a = b) :: output', 172, 504, { size: 24, fam: F.mono, w: 700, c: C.white, a: ra });
  txt('a, b, frame restored · scratch empty · 原样复原，暂存清空', 172, 542, { size: 22, fam: F.zh, w: 700, c: C.white, a: ra });
  oiLean(172, 584, OI_LEAN.name_compare_run, a * Q(S, 0, 'Lean checks', 0.6), { size: 20 });
  /* the run against the ceiling */
  panel(1180, 200, 540, 400, a * Q(S, 1, 'twice eight', 0.6), C.cyan, 'RUN VS CEILING · 实跑与上限');
  const bw = 300;
  OI_RUNS.forEach((r, j) => {
    const ja = a * (j === 0 ? Q(S, 1, 'twice eight', 0.6) : at(S, 3, 0.6, 1.2 + 0.6 * j));
    if (ja <= 0.003) return;
    const y = 262 + j * 112;
    txt(`${r.a || 'ε'} vs ${r.b || 'ε'}`, 1208, y, { size: 22, fam: F.mono, w: 700, c: C.white, a: ja });
    fillBox(1208, y + 14, bw * r.bound / 20, 34, C.dim, ja * 0.25); box(1208, y + 14, bw * r.bound / 20, 34, C.lean, ja, 1.5);
    fillBox(1208, y + 14, bw * r.steps / 20, 34, C.cyan, ja * 0.6);
    txt(`${r.steps} ≤ ${r.bound}`, 1208 + bw + 26, y + 41, { size: 26, fam: F.mono, w: 700, c: C.white, a: ja });
  });
  const la = a * at(S, 3, 0.6, 1.2);
  txt('cyan bar: replay (computed)', 1208, 556, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: la });
  txt('green frame: Lean ceiling', 1208, 586, { size: 20, fam: F.mono, w: 700, c: C.lean, a: la });
  /* the aphorism */
  const ca = a * Q(S, 3, 'The bound is', 0.6);
  if (ca > 0.003) {
    txt('a ceiling, not a stopwatch', W / 2, 720, { size: 44, fam: F.disp, w: 700, align: 'center', c: C.white, a: ca });
    txt('是天花板，不是秒表', W / 2, 780, { size: 34, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca * 0.9 });
  }
  stamp('≤ 20', 560, 700, Q(S, 0, 'Lean checks', 0.5, 0.8) * (1 - at(S, 2, 0.5)), C.lean, 54, -0.06);
};

/* ======================================================================= */
/*                               scene 4 · LOOK IT UP                        */
/* ======================================================================= */
const DT = { x0: 232, y: 420, cw: 52, ch: 64 };
const DT_REW = OI_DICT.snaps.findIndex(z => z.L === 'rewind');
function dtTape(S, snap, a, opts = {}) {
  /* the tape: cells already read (history) on the left of the head, the rest of the stream on its right */
  const read = snap.S.history.slice().reverse(), rest = snap.S.stream;
  const cells = [...read, ...rest], head = read.length;
  const total = OI_DICT.stream0.length;
  /* the four entries */
  let x = DT.x0;
  OI_NAMES.forEach((nm, e) => {
    const w = 7 * DT.cw;
    const ea = a * (opts.entry ? opts.entry(e) : 1);
    box(x + 2, DT.y - 78, w - 4, 40, C.dim, a * 0.7, 1.2);
    txt(`#${e}  ${oiBits(nm)}`, x + w / 2, DT.y - 49, { size: 22, fam: F.mono, w: 700, align: 'center', c: opts.hit === e ? C.cyan : C.white, a: ea });
    x += w;
  });
  for (let j = 0; j < total; j++) {
    const c = cells[j]; if (!c) continue;
    const pos = j % 7, isTag = pos === 6 || pos % 2 === 0;
    const cx = DT.x0 + j * DT.cw;
    const isRead = j < head;
    fillBox(cx + 2, DT.y - 28, DT.cw - 4, DT.ch - 4, isRead ? C.cyan : C.white, a * (isRead ? 0.18 : 0.05));
    box(cx + 2, DT.y - 28, DT.cw - 4, DT.ch - 4, isRead ? C.cyan : C.dim, a * 0.8, 1.2);
    txt(c.b ? '1' : '0', cx + DT.cw / 2, DT.y + 14, { size: isTag ? 24 : 30, fam: F.mono, w: 700, align: 'center', c: isTag ? C.dim : C.white, a });
  }
  /* the head */
  const hx = DT.x0 + Math.min(head, total) * DT.cw;
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.now;
  ctx.beginPath(); ctx.moveTo(hx, DT.y + 44); ctx.lineTo(hx - 13, DT.y + 68); ctx.lineTo(hx + 13, DT.y + 68); ctx.closePath(); ctx.fill(); ctx.restore();
  line(hx, DT.y - 32, hx, DT.y + 40, C.now, a, 3);
}
SCENES.dict = S => {
  const u = S.u, a = oiFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  const N = OI_DICT.steps;
  const k = oiStep(S, [[0, DT_REW, phraseAt(S, 1, 'copies out'), phraseAt(S, 2, 'then a hit') + 0.6], [DT_REW, N, phraseAt(S, 3, 'winds the tape'), lineAt(S, 3).e]]);
  const i = Math.min(N, Math.floor(k)), snap = OI_DICT.snaps[i];
  const tallies = snap.S.index.length - (snap.L === 'halt' ? 1 : 0);
  const hit = i >= DT_REW ? 2 : -1;
  dtTape(S, snap, a, { hit, entry: e => (i >= DT_REW ? (e === 2 ? 1 : 0.55) : 1) });
  txt('tape · 纸带：each name stored back to front, every bit after a marker 1, a 0 ends it', DT.x0, DT.y + 108, { size: 20, fam: F.zh, w: 700, c: C.white, a: a * at(S, 0, 0.6) });
  /* query, candidate, tally */
  const qa = a * at(S, 1, 0.6);
  panel(232, 580, 980, 220, qa, C.cyan, 'QUERY · CANDIDATE · TALLY');
  txt('query · 查询', 262, 650, { size: 20, fam: F.zh, w: 700, c: C.dim, a: qa });
  txt(oiBits([...snap.S.op_savedLeft.slice().reverse(), ...snap.S.op_left]), 262, 700, { size: 40, fam: F.mono, w: 700, c: C.now, a: qa });
  txt('candidate · 抄出的词条', 520, 650, { size: 20, fam: F.zh, w: 700, c: C.dim, a: qa });
  const cand = oiBits([...snap.S.op_savedRight.slice().reverse(), ...snap.S.op_right]);
  txt(cand || '—', 520, 700, { size: 40, fam: F.mono, w: 700, c: C.white, a: qa });
  txt('tally · 计数', 860, 650, { size: 20, fam: F.zh, w: 700, c: C.dim, a: qa });
  for (let t = 0; t < tallies; t++) line(870 + t * 26, 668, 870 + t * 26, 716, C.white, qa, 5);
  if (snap.L === 'halt') chip(870 + tallies * 26 + 70, 694, 110, 46, 'found', C.cyan, qa, 22);
  const la = a * Q(S, 2, 'The answer', 0.6);
  if (la > 0.003) {
    txt('at the end · 结束时:  1 :: 1 1', 262, 772, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: la });
    txt('found · then entry #2 in unary · 找到，第 2 号（一元计数）', 640, 772, { size: 20, fam: F.zh, w: 700, c: C.white, a: la });
  }
  /* the step counter */
  panel(1300, 580, 420, 220, a, C.cyan, 'STEP · 步');
  txt(String(i), 1330, 712, { size: 80, fam: F.mono, w: 700, c: C.now, a });
  const ph = i === DT_REW ? 'hit · 命中' : snap.L === 'rewind' || snap.L === 'finish' ? 'rewind · 倒卷' : snap.L === 'halt' ? 'halted · 停机' : snap.L.startsWith('C:') ? 'compare · 比对' : 'read · 读带';
  txt(ph, 1480, 700, { size: 24, fam: F.zh, w: 700, c: C.white, a });
  txt('replay (computed)', 1480, 740, { size: 20, fam: F.mono, w: 700, c: C.cyan, a: a * 0.9 });
};

/* ======================================================================= */
/*                           scene 5 · THE DICTIONARY BILL                   */
/* ======================================================================= */
SCENES.dictbill = S => {
  const u = S.u, a = oiFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'lean'], [2, null, 'computed']]);
  panel(140, 200, 1580, 300, a, C.lean, 'EVERY DICTIONARY, EVERY QUERY · 任何字典、任何查询词');
  const fa = a * Q(S, 1, 'Per entry', 0.6);
  oiRich([['steps ≤ ', C.white], ['(2|q| + 12)·|names|', C.white, Q(S, 1, 'Per entry', 0.5)], [' + ', C.white], ['4·|tape|', C.white, Q(S, 1, 'per tape cell', 0.5)], [' + 3', C.white, Q(S, 1, 'then three', 0.5)]], 172, 290, { size: 40, a: fa });
  txt('index ← (q ∈ names ? 1 : 0) :: one tally per entry before q · query, tape, frame restored', 172, 352, { size: 22, fam: F.mono, w: 700, c: C.white, a: a * at(S, 0, 0.6, 0.8) });
  txt('下标栈：命中位 :: q 之前每个词条一道杠（查不到时为全部词条数）；查询词、纸带、上下文原样复原', 172, 392, { size: 20, fam: F.zh, w: 700, c: C.dim, a: a * at(S, 0, 0.6, 0.8) });
  oiLean(172, 462, OI_LEAN.dictionary_lookup_run, a * Q(S, 0, 'Lean checks', 0.6), { size: 20 });
  /* the arithmetic */
  const ha = a * at(S, 2, 0.6);
  oiRich([['(2·3 + 12)·4 + 4·28 + 3 = 72 + 112 + 3 = ', C.white], ['187', C.white]], 172, 580, { size: 32, a: ha });
  txt('|tape| = 4 names × 7 cells · 4 个名字 × 7 格', 172, 620, { size: 20, fam: F.zh, w: 700, c: C.dim, a: ha });
  const bw = 900, full = 187, bx = 560;
  const r1 = a * Q(S, 2, 'The run took', 0.6), r2 = a * Q(S, 3, 'the missing word', 0.6);
  if (ha > 0.003) {
    txt('ceiling · 上限', 172, 690, { size: 22, fam: F.zh, w: 700, c: C.lean, a: ha });
    box(bx, 664, bw, 36, C.lean, ha, 1.5); txt('187', bx + bw + 16, 692, { size: 26, fam: F.mono, w: 700, c: C.lean, a: ha });
  }
  if (r1 > 0.003) { txt('110 · found at #2', 172, 750, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: r1 }); oiBar(bx, 724, bw, 36, OI_DICT.steps, full, C.cyan, r1, String(OI_DICT.steps)); }
  if (r2 > 0.003) { txt('111 · not found', 172, 810, { size: 22, fam: F.mono, w: 700, c: C.mag, a: r2 }); oiBar(bx, 784, bw, 36, OI_DMISS.steps, full, C.mag, r2, `${OI_DMISS.steps}   index 0 :: 1111`); }
  stamp('≤ 187', 1480, 600, Q(S, 2, 'one hundred eighty-seven', 0.5, 0.4) * (1 - at(S, 3, 0.5)), C.lean, 54, -0.06);
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = oiFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'argued']]);
  const rows = [
    { k: 0, col: C.lean, en: 'step ceilings for these two machines', zh: '这两台机器的步数上限', note: 'upper bounds, not the fastest way · 是上界，不是最快做法', lean: true },
    { k: 1, col: C.dim, en: 'a floor for every way of comparing', zh: '“任何比较方法都至少这么贵”', note: 'not claimed here: needs its own cost model and proof · 本片不主张，需另立成本模型与证明' },
    { k: 2, col: C.argued, en: 'one instruction suffices (OISC)', zh: '一条指令即图灵完备', note: 'literature result, given unbounded memory · 文献结果' },
    { k: 2, col: C.argued, en: 'the universe runs CMP(A, B)', zh: '宇宙只跑一条比较指令', note: 'MODEL, and so is reading these bit machines as its bill · 模型；以这两台比特机作 CMP 的账单，也是模型' }
  ];
  rows.forEach((rw, j) => {
    const ra = a * at(S, rw.k, 0.6, rw.k === 2 && j === 3 ? 0.8 : 0);
    if (ra <= 0.003) return;
    const y = 190 + j * 150, foc = rw.k === (u >= lineAt(S, 2).s ? 2 : u >= lineAt(S, 1).s ? 1 : 0) ? 1 : 0.55;
    panel(220, y, 1480, 130, ra * foc, rw.col === C.dim ? C.white : rw.col);
    txt(rw.en, 252, y + 50, { size: 30, fam: F.disp, w: 700, c: rw.col === C.dim ? C.white : rw.col, a: ra * foc });
    txt(rw.zh, 1000, y + 50, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra * foc });
    txt(rw.note, 252, y + 98, { size: 20, fam: F.zh, w: 700, c: rw.col === C.dim ? C.dim : rw.col, a: ra * foc * 0.95 });
    if (rw.lean) { oiLean(1370, y + 50, OI_LEAN.name_compare_run, ra * foc, { size: 18 }); oiLean(1370, y + 98, OI_LEAN.dictionary_lookup_run, ra * foc, { size: 18 }); }
  });
  const ga = a * at(S, 3, 0.7);
  if (ga > 0.003) {
    fillBox(0, 180, W, 640, C.bg, ga * 0.82);
    txt('Even this simplest machine', W / 2, 470, { size: 58, fam: F.disp, w: 700, align: 'center', c: C.white, a: ga });
    txt('pays for every look.', W / 2, 550, { size: 58, fam: F.disp, w: 700, align: 'center', c: C.white, a: ga });
    txt('连这台最简单的机器，每看一眼都要付账。', W / 2, 640, { size: 40, fam: F.zh, w: 700, align: 'center', c: C.white, a: ga * 0.9 });
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
  const sc = TL.scenes[1], t = sc.end - 1.0;
  background(t, sc, 1, 6);
  /* the halfway point of the compare run: the aside piles full, the verdicts beside them */
  const st = OI_CMP.states[4], P = cdLayout(st);
  for (const [, p] of P) oiCardDraw(p.x - 60, p.y + 20, p.b, 1, { col: C.dim });
  cdPairs(st).forEach(([x, y], j, arr) => {
    const yy = CD_BOT + 20 - j * CD_GAP;
    txt(x === y ? '=' : '≠', (CD_COL.savedLeft + CD_COL.savedRight) / 2 - 60, yy + 14, { size: 40, fam: F.math, w: 700, align: 'center', c: x === y ? C.cyan : C.mag });
  });
  txt(DATA.film.title_zh, 1460, 420, { size: 80, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('ONE INSTRUCTION', 1460, 520, { size: 50, fam: F.orb, w: 900, align: 'center', c: C.cyan, ab: 3, ls: 5 });
  txt('PAID STEP BY STEP', 1460, 584, { size: 40, fam: F.orb, w: 900, align: 'center', c: C.mag, ab: 2, ls: 4 });
  oiRich([['steps ≤ 2(|a| + |b|) + 4', C.white]], 1460, 680, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1460, 760, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 1, sc);
  post(0);
};
