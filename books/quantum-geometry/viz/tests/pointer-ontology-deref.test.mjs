#!/usr/bin/env node
// Browser regression suite for ORTHO//ONTOLOGY (books/quantum-geometry/viz/pointer-ontology-deref/).
//   node books/quantum-geometry/viz/tests/pointer-ontology-deref.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first. Then every count the page shows is redone here another way: N, log₂N and N − 1 by building
// the heap-numbered binary tree recursively (node h has children 2h and 2h + 1, leaves 64 … 127), the switches an
// address sets by descending that heap from the root by its bits, the scan by walking a list cell by cell, and the
// page walk from Chapter 38's own definitions (P[0] = b₀, P[i] = addr(Tᵢ), Tᵢ[j] = addr(Dᵢ,ⱼ); b₀ = 0x1000,
// addr(T₁) = 0x2000, addr(D₁,₂) = 0x9000 and the three rows of the chapter's table). Read through window.POINTER_DEBUG.
// The same state is also built as a lit solid (kit.solid, a schematic die): its cells and switches are checked against an
// H-tree built here by recursive halving, its pillars, beads, paths and dereference beam against the counts above, and
// its pixels against the flat panels it must stay out of; solidChecks runs last, so its camera turn moves nothing the
// earlier checks read.
import { session, stageFirstChecks, solidChecks, solidPixels, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pointer-ontology-deref';
const T = await session();
const { check } = T;

/* ---------- independent counts ---------- */
const NCELLS = 64;
/** The routing tree as a heap: internal nodes are those with children; count them and the depth recursively. */
function buildTree(leaves) {
  const internal = [];
  const grow = (h, lo, hi, depth) => { if (hi - lo === 1) return depth; internal.push({ h, depth }); const mid = (lo + hi) >> 1; return Math.max(grow(2 * h, lo, mid, depth + 1), grow(2 * h + 1, mid, hi, depth + 1)); };
  const depth = grow(1, 0, leaves, 0);
  return { internal, depth };
}
const TREE = buildTree(NCELLS);
/** The heap nodes visited from the root to leaf `a`, choosing left/right by searching the leaf range (no bit tricks). */
function heapPath(a) {
  const out = []; let h = 1, lo = 0, hi = NCELLS;
  while (hi - lo > 1) { const mid = (lo + hi) / 2, right = a >= mid; out.push({ h, dir: right ? 1 : 0 }); h = 2 * h + (right ? 1 : 0); if (right) lo = mid; else hi = mid; }
  return out;
}
/** heap index → [level, prefix] as the page numbers switches. */
const toLP = (h) => { let l = 0; while ((1 << (l + 1)) <= h) l++; return [l, h - (1 << l)]; };
const keyOf = (lp) => `${lp[0]}:${lp[1]}`;
/** A linear scan: walk the list until the cell holding `a`, counting steps. */
const scanCount = (a) => { const cells = Array.from({ length: NCELLS }, (_, i) => i); let steps = 0; for (const c of cells) { steps++; if (c === a) return steps; } return -1; };
/** Chapter 38's page memory, built from its definitions, and Walk_L. */
const CH = { b0: 0x1000, T1: 0x2000, D12: 0x9000 };
const walkCh = (mem, idx) => { let b = CH.b0; const vals = []; for (const i of idx) { b = mem[b][i]; vals.push(b); } return vals; };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.POINTER_DEBUG.state); };
const dbg = async (fn, arg) => { await settle(page); return page.evaluate(fn, arg); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seekEnd = async () => { await page.evaluate(() => window.POINTER_DEBUG.seek(1e9)); return state(); };
const seek = async (t) => { await page.evaluate((v) => window.POINTER_DEBUG.seek(v), t); return state(); };

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on TREE · 6 / 63 at the end of its walk', s.preset === 'qram_tree' && s.scene === 'tree' && s.a === 41 && s.step === 6 && !s.playing);

// N, log₂N, N − 1 against the recursively built tree
check('N = 64 cells', s.N === NCELLS);
check('depth log₂N = 6 = depth of the recursively built tree', s.depth === TREE.depth && TREE.depth === 6 && 2 ** s.depth === s.N);
check('N − 1 = 63 switches = internal nodes of the tree', s.switches === TREE.internal.length && TREE.internal.length === 63);
const sw = await dbg(() => window.POINTER_DEBUG.switches());
const swKeys = new Set(sw.map(keyOf)), heapKeys = new Set(TREE.internal.map((x) => keyOf(toLP(x.h))));
check('the page’s 63 switches are exactly the internal heap nodes', swKeys.size === 63 && [...heapKeys].every((k) => swKeys.has(k)));

// (b) every address sets exactly the 6 switches its bits pick, and turns each by the right bit
let pathOk = true, dirOk = true, firstBad = '';
for (let a = 0; a < NCELLS; a++) {
  await page.evaluate((v) => window.POINTER_DEBUG.setAddr(v), a);
  const st = await state(), mine = heapPath(a), got = st.active.map(keyOf), want = mine.map((x) => keyOf(toLP(x.h)));
  if (got.length !== 6 || want.some((k) => !got.includes(k))) { pathOk = false; firstBad = firstBad || `a=${a}: ${got}`; }
  const p = await page.evaluate((v) => window.POINTER_DEBUG.path(v), a);
  if (p.some((x, l) => x.bit !== mine[l].dir || keyOf([x.l, x.p]) !== want[l])) dirOk = false;
}
check('each of the 64 addresses lights exactly the 6 switches of its root-to-leaf path (heap descent)', pathOk, firstBad);
check('each switch on the path turns by the matching bit of the address (0 left, 1 right)', dirOk);
// distinct addresses share switches only on their common prefix, never after the fork
let forkOk = true, forkWhy = '';
for (let a = 0; a < NCELLS; a += 3) for (let b = a + 1; b < NCELLS; b += 5) {
  const A = heapPath(a).map((x) => x.h), B = heapPath(b).map((x) => x.h);
  let lcp = 0; const as = a.toString(2).padStart(6, '0'), bs = b.toString(2).padStart(6, '0'); while (lcp < 6 && as[lcp] === bs[lcp]) lcp++;
  const shared = A.filter((h, l) => B[l] === h);
  const ok = shared.length === Math.min(6, lcp + 1) && A.every((h, l) => (B[l] === h) === (l <= lcp));
  if (!ok) { forkOk = false; forkWhy = forkWhy || `${a} vs ${b}`; }
}
check('two addresses share exactly the switches above their fork (common prefix + 1) and none below', forkOk, forkWhy);

// the rail sets one level per tick
await pick('qram_tree');
s = await seek(3);
check('TREE: at step 3, 3 switches are lit, all on the path of 41', s.active.length === 3 && s.active.every((x) => heapPath(41).slice(0, 3).map((y) => keyOf(toLP(y.h))).includes(keyOf(x))));
s = await seek(6);
check('TREE: at step 6 the leaf is reached with 6 of 63 switches', s.active.length === 6 && s.levels === 6);
check('TREE: the HUD names address 41 in binary', (await page.textContent('#hudSub')).includes('101001'));

// superposition: several paths at once, union counted independently
await pick('superpose');
s = await seekEnd();
const br = s.branches, union = new Set(br.flatMap((a) => heapPath(a).map((x) => x.h)));
check('SUPERPOSE: four branches 41, 9, 33, 1', JSON.stringify(br) === JSON.stringify([41, 9, 33, 1]));
check('SUPERPOSE: the lit switches are the union of the four paths (17)', s.active.length === union.size && union.size === 17 && s.active.every((x) => union.has((1 << x[0]) + x[1])));
s = await seek(2);
const u2 = new Set(br.flatMap((a) => heapPath(a).slice(0, 2).map((x) => x.h)));
check('SUPERPOSE: at step 2 the paths have only reached the second level (union of the first two)', s.active.length === u2.size);
for (const k of [1, 2, 8]) {
  await page.click(`[data-branches="${k}"]`); s = await state();
  const U = new Set(s.branches.flatMap((a) => heapPath(a).map((x) => x.h)));
  check(`branch chip ${k}: ${k} distinct branches and the union of their paths`, s.k === k && new Set(s.branches).size === k && s.pathSwitches === U.size && (await seek(6)).active.length === U.size);
}

// (a) the scan reads cell k in exactly k steps
await pick('linear64');
s = await state();
check('SCAN · 64: address 63, the rail runs to step 64', s.scene === 'scan' && s.a === 63 && Math.abs(s.max - 64) < 1e-9);
check('SCAN · 64: the card plays', s.playing || (await until(page, () => window.POINTER_DEBUG.state.t > 0)));
s = await seek(64);
check('SCAN · 64: 64 cells read at step 64 and the last cell is reached', s.scanRead === 64 && s.hit && scanCount(63) === 64);
let scanOk = true, scanWhy = '';
for (const a of [0, 1, 5, 17, 41, 62, 63]) {
  await page.evaluate((v) => window.POINTER_DEBUG.setAddr(v), a);
  const k = scanCount(a);
  let st = await seek(k - 1);
  const before = !st.hit && st.scanRead === k - 1;
  st = await seek(k);
  if (!(before && st.hit && st.scanSteps === k && st.scanRead === k)) { scanOk = false; scanWhy = scanWhy || `a=${a}`; }
}
check('scanning to cell k (address k − 1) takes exactly k steps: not at k − 1, yes at k', scanOk, scanWhy);

// the scan note compares the two schedules as they are: the list walk reaches address a at scanCount(a), the heap
// descent reaches its leaf at TREE.depth; earlier, equal and later are decided here, for all 64 addresses and every
// branch count (the scan note does not depend on the branches), at the end of the scan's own rail
const relOf = (a) => (a === NCELLS - 1 ? 'last' : scanCount(a) < TREE.depth ? 'early' : scanCount(a) === TREE.depth ? 'tie' : 'late');
const NOTE_RE = {
  zh: { early: (k, d) => [`只要 ${k} 步`, `比路由树的 ${d} 层还早`, `最坏要 N = ${NCELLS} 步`], tie: (k, d) => [`要 ${k} 步`, `与路由树的 ${d} 层同时到达`], late: (k, d) => [`要 ${k} 步`, `在第 ${d} 步就已走到叶子`, `早 ${k - d} 步`], last: () => [`N = ${NCELLS} 步`] },
  en: { early: (k, d) => [`in ${k} steps`, `before the tree's ${d} levels`, `up to N = ${NCELLS}`], tie: (k, d) => [`in ${k} steps`, `at the same step as the tree's ${d} levels`], late: (k, d) => [`takes ${k} steps`, `leaf at step ${d}`, `${k - d} steps earlier`], last: () => [`N = ${NCELLS} steps`] }
};
const FORBID = { zh: ['早已走到叶子'], en: ['long reached its leaf'] };
const noteFor = async (pg, a, k) => {
  await pg.evaluate(([v, kk]) => { const D = window.POINTER_DEBUG; D.setK(kk); D.scene('scan'); D.setAddr(v); }, [a, k]);
  await settle(pg);
  return { text: await pg.textContent('#roNote'), st: await pg.evaluate(() => window.POINTER_DEBUG.state) };
};
let schedOk = true, schedWhy = '';
const counts = { early: 0, tie: 0, late: 0, last: 0 };
for (let a = 0; a < NCELLS; a++) {
  const kBr = [1, 2, 4, 8][a % 4], { text, st } = await noteFor(page, a, kBr), rel = relOf(a), k = scanCount(a);
  counts[rel]++;
  const ok = NOTE_RE.zh[rel](k, TREE.depth).every((w) => text.includes(w)) && !FORBID.zh.some((w) => text.includes(w))
    && st.scanSteps === k && Math.abs(st.max - k) < 1e-9 && st.hit && st.levels === Math.min(k, TREE.depth)
    && (rel === 'early' ? st.levels < TREE.depth : st.levels === TREE.depth);
  if (!ok) { schedOk = false; schedWhy = schedWhy || `a=${a} (${rel}, branches ${kBr}): ${text}`; }
}
check('scan note, all 64 addresses (branches 1/2/4/8 in turn): addresses 0–4 the scan is first, 5 a tie, 6–62 the tree is first by k − 6 steps, 63 the whole table; rail ends at the scan step', schedOk && counts.early === 5 && counts.tie === 1 && counts.late === 57 && counts.last === 1, schedWhy || JSON.stringify(counts));
{
  const enPage = await T.goto(BOOK, ID, '?lang=en', await T.newPage());
  await settle(enPage);
  let langOk = true, langWhy = '';
  for (const a of [0, 3, 4, 5, 6, 41, 62, 63]) {
    for (const [pg, lang] of [[page, 'zh'], [enPage, 'en']]) {
      const { text } = await noteFor(pg, a, 1), rel = relOf(a), k = scanCount(a);
      if (!NOTE_RE[lang][rel](k, TREE.depth).every((w) => text.includes(w)) || FORBID[lang].some((w) => text.includes(w)) || (lang === 'en' && /[一-鿿]/.test(text))) { langOk = false; langWhy = langWhy || `${lang} a=${a}: ${text}`; }
    }
  }
  check('scan note in both languages for early (0, 3, 4), equal (5) and later (6, 41, 62, 63) addresses names the true steps and never says the tree is always first', langOk, langWhy);
  await enPage.close();
}
await page.evaluate(() => window.POINTER_DEBUG.setK(1));

// the address slider and clicking a cell
await page.evaluate(() => { const el = document.getElementById('addr'); el.value = '12'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the address slider sets a and leaves the card', s.a === 12 && s.preset === null);
const pt = await dbg(() => window.POINTER_DEBUG.point.cell(50));
await page.mouse.click(pt.x, pt.y); s = await state();
check('clicking a memory cell sets the address', s.a === 50);

// (c) the page-table walk against the chapter
const mem = await dbg(() => window.POINTER_DEBUG.mem());
check('P[0] holds the directory’s own address 0x1000', mem[CH.b0][0] === CH.b0);
check('P[1] = addr(T₁) = 0x2000 and T₁[2] = addr(D₁,₂) = 0x9000 as in the chapter', mem[CH.b0][1] === CH.T1 && mem[CH.T1][2] === CH.D12);
const chapterRows = [[[1, 2], [0x2000, 0x9000]], [[0, 1], [0x1000, 0x2000]], [[0, 0], [0x1000, 0x1000]]];
let rowsOk = true;
for (const [idx, want] of chapterRows) {
  const mine = walkCh(mem, idx), got = (await page.evaluate((i) => window.POINTER_DEBUG.walk(i), idx)).map((h) => h.value);
  if (JSON.stringify(mine) !== JSON.stringify(want) || JSON.stringify(got) !== JSON.stringify(want)) rowsOk = false;
}
check('the three rows of the chapter’s table: first and second hop match ([1,2] → 0x9000, [0,1] → 0x2000, [0,0] → 0x1000)', rowsOk);
let zerosOk = true;
for (let Lz = 1; Lz <= 6; Lz++) { const v = walkCh(mem, new Array(Lz).fill(0)); if (v.some((x) => x !== CH.b0)) zerosOk = false; }
check('Walk_L(b₀, [0, …, 0]) = b₀ for L = 1 … 6 (each leading 0 keeps the base)', zerosOk);

await pick('diagonal_hit'); s = await seekEnd();
check('p = *p: one hop, Mem[0x1000][0] = 0x1000, the result is the address itself', s.scene === 'table' && s.idx.length === 1 && s.result === CH.b0 && s.hops.length === 1 && s.hops[0].base === s.hops[0].value);
// the register beside the table: p and *p side by side, and an ordinary pointer for contrast (T₁[0] from the chapter's
// definition Tᵢ[j] = addr(Dᵢ,ⱼ) = 0x1000·(4i + j + 3), i.e. 0x7000), each pair looked up here in the page's memory
const regWant = [[CH.b0, mem[CH.b0][0]], [CH.T1, 0x1000 * (4 * 1 + 0 + 3)]];
check('p = *p: the register shows p = 0x1000 = *p with “=”, and the ordinary pointer 0x2000 → 0x7000 with “≠”',
  Array.isArray(s.register) && s.register.length === 2 && regWant[1][1] === mem[CH.T1][0]
  && s.register.every((r, q) => r.p === regWant[q][0] && r.star === regWant[q][1] && r.sign === (regWant[q][0] === regWant[q][1] ? '=' : '≠')));
check('table cards fold the routing tree away and keep a single amber “now”', !s.treeShown && s.amberMarks === 1);
check('p = *p: the LEAN ✓ box of the table scene is shown', await page.evaluate(() => !document.querySelector('.lean[data-scenes="table"]').hidden));
await pick('self_map'); s = await seekEnd();
check('[0, 1] at the end: no tree, exactly one amber mark', !s.treeShown && s.amberMarks === 1);
check('[0, 1]: two hops, the leaf table T₁ (0x2000) is read out', s.hops.length === 2 && s.hops[0].value === CH.b0 && s.result === CH.T1);
s = await seek(1);
check('[0, 1]: after one hop the walk is back at 0x1000 and no result yet', s.hops.length === 1 && s.hops[0].value === CH.b0 && s.result === null);
await pick('four_loops'); s = await seek(2);
check('[0, 0, 0, 0] mid-walk: no tree, exactly one amber mark (the slot being read)', !s.treeShown && s.amberMarks === 1 && s.register === null);
s = await seekEnd();
check('[0, 0, 0, 0] at the end: no tree, exactly one amber mark (P, the value read)', !s.treeShown && s.amberMarks === 1);
check('[0, 0, 0, 0]: four hops, every one through slot 0, ends at 0x1000', s.hops.length === 4 && s.hops.every((h) => h.base === CH.b0 && h.slot === 0 && h.value === CH.b0) && s.result === CH.b0);
await page.click('[data-idx="1,2"]'); s = await seekEnd();
check('index chip [1, 2]: two ordinary hops reach the data frame 0x9000', s.scene === 'table' && s.result === CH.D12 && s.hops[0].value === CH.T1);

// the readout of the three step counts
await pick('qram_tree');
check('the key readout gives 42 · 6 · 2 for address 41 and index [1, 2]', (await page.textContent('#roKey')).trim() === `${scanCount(41)} · ${TREE.depth} · 2`);

// scenes by key, playback, ← →
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); s = await state(); check('key 1 follows the scan', s.scene === 'scan');
await page.keyboard.press('3'); s = await state(); check('key 3 follows the page table', s.scene === 'table');
await page.keyboard.press('2'); s = await state(); check('key 2 follows the tree', s.scene === 'tree');
await page.click('[data-scene="scan"]'); s = await state(); check('scene chip opens the scan', s.scene === 'scan');
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps one tick', s.step === 1 && s.scanRead === 1);
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.POINTER_DEBUG.state.step > 1));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

/* ---------- the die: the same state as a lit solid (a schematic MODEL) ---------- */
// The H-tree, built here by recursive halving of the array's rectangle (read from the probe): even depths split it
// left/right, odd depths back/front, bit 0 taking the left (smaller x) or the back (larger y) half. A heap node sits
// at the centre of its rectangle; leaf 64 + a is the cell of address a.
const sol = async (pg = page) => { await settle(pg); return pg.evaluate(() => window.POINTER_DEBUG.solid()); };
let d3 = await sol();
const HT = new Map();
(function build(h, x0, x1, y0, y1, depth) {
  HT.set(h, [(x0 + x1) / 2, (y0 + y1) / 2]);
  if (depth === 6) return;
  if (depth % 2 === 0) { const xm = (x0 + x1) / 2; build(2 * h, x0, xm, y0, y1, depth + 1); build(2 * h + 1, xm, x1, y0, y1, depth + 1); }
  else { const ym = (y0 + y1) / 2; build(2 * h, x0, x1, ym, y1, depth + 1); build(2 * h + 1, x0, x1, y0, ym, depth + 1); }
})(1, d3.arr.x0, d3.arr.x0 + 8 * d3.arr.pitch, d3.arr.y1 - 8 * d3.arr.pitch, d3.arr.y1, 0);
const near2 = (p, q, eps = 1e-9) => Math.abs(p[0] - q[0]) <= eps && Math.abs(p[1] - q[1]) <= eps;
const heapOfLP = (l, p) => (1 << l) + p;
check('die: the 64 cells sit at the leaves of the H-tree built by halving (consecutive addresses in Z-order)',
  d3.cells.length === NCELLS && d3.cells.every((c) => near2([c.x, c.y], HT.get(64 + c.a))));
await pick('qram_tree'); d3 = await (async () => { await seekEnd(); return sol(); })();
{
  const want = heapPath(41).map((x) => x.h), lit = d3.switches.map((w) => heapOfLP(w.l, w.p));
  check('die · TREE at its end: the 6 cyan beads are the switches of 41’s path, each at the centre of its H-tree block',
    lit.length === 6 && want.every((h) => lit.includes(h)) && d3.switches.every((w) => near2(w.at, HT.get(heapOfLP(w.l, w.p)))));
  const pillars = d3.cells.filter((c) => c.kind === 'delivered').map((c) => c.a), tallest = Math.max(...d3.cells.map((c) => c.z)), idle = d3.cells.find((c) => c.kind === 'idle');
  check('die · TREE at its end: exactly one cyan pillar, on cell 41, standing well above the idle cells', JSON.stringify(pillars) === '[41]' && d3.cells.find((c) => c.a === 41).z === tallest && tallest > 3 * idle.z);
  const path = d3.paths[0].nodes, chain = [1, ...want.slice(1)].map((h) => HT.get(h)).concat([HT.get(64 + 41)]);
  check('die · TREE: the cyan tube runs root → 6 switches → cell 41 through the H-tree centres, in order', d3.paths.length === 1 && path.length === 7 && path.every((q, i) => near2(q, chain[i])));
  check('die · TREE at its end: no routing front left', d3.fronts.length === 0);
}
await page.evaluate(() => window.POINTER_DEBUG.seek(3.5)); d3 = await sol();
{
  const hp = heapPath(41).map((x) => x.h), A = HT.get(hp[3]), B = HT.get(hp[4]), f = d3.fronts[0];
  check('die · TREE at step 3.5: 3 beads on the first three switches, no pillar, and the amber front halfway from switch 3 to switch 4',
    d3.switches.length === 3 && d3.switches.every((w) => hp.slice(0, 3).includes(heapOfLP(w.l, w.p))) && !d3.cells.some((c) => c.kind === 'delivered')
    && d3.fronts.length === 1 && near2(f.at, [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], 1e-9));
}
await pick('superpose'); await seekEnd(); d3 = await sol();
{
  const br = [41, 9, 33, 1], U = new Set(br.flatMap((a) => heapPath(a).map((x) => x.h))), lit = d3.switches.map((w) => heapOfLP(w.l, w.p));
  const pil = d3.cells.filter((c) => c.kind === 'delivered').map((c) => c.a).sort((a, b) => a - b);
  check('die · SUPERPOSE: four cyan pillars on 1, 9, 33, 41 and 17 beads, the union of the four paths, at their H-tree centres',
    JSON.stringify(pil) === JSON.stringify([1, 9, 33, 41]) && lit.length === U.size && U.size === 17 && lit.every((h) => U.has(h)) && d3.switches.every((w) => near2(w.at, HT.get(heapOfLP(w.l, w.p)))));
  check('die · SUPERPOSE: four fan-out tubes, each ending on its own branch’s cell', d3.paths.length === 4 && d3.paths.every((q) => near2(q.nodes[q.nodes.length - 1], HT.get(64 + q.a))) && JSON.stringify(d3.paths.map((q) => q.a)) === JSON.stringify(br));
}
await pick('linear64');
{
  let ok = true, why = '';
  for (const k of [1, 7, 30, 63]) {
    await page.evaluate((v) => window.POINTER_DEBUG.seek(v), k); const q = await sol();
    const read = q.cells.filter((c) => c.kind === 'read').map((c) => c.a), want = []; for (let a = 0; a < k; a++) want.push(a);   // the list walk's first k cells
    const c63 = q.cells.find((c) => c.a === 63), tree = Math.min(k, TREE.depth) === TREE.depth;   // the tree reaches its leaf at step 6
    if (JSON.stringify(read) !== JSON.stringify(want) || !near2(q.head.at, HT.get(64 + (k - 1))) || c63.kind !== (tree ? 'delivered' : 'asked')) { ok = false; why = why || `k=${k}: ${read.length} read, head ${q.head.at}, cell 63 ${c63.kind}`; }
  }
  check('die · SCAN: after k steps the raised ink cells are addresses 0 … k − 1, the amber head sits over cell k − 1, and cell 63 is the ink cell asked for until the tree delivers it as a cyan pillar at step 6', ok, why);
  await page.evaluate(() => window.POINTER_DEBUG.seek(64)); const q = await sol(), read = q.cells.filter((c) => c.kind === 'read').length;
  check('die · SCAN at step 64: 63 ink cells, the head over cell 63', read === 63 && near2(q.head.at, HT.get(64 + 63)) && q.head.cell === 63);
}
// the page tables on the die: the walked pointers, the loop of slot 0 and the amber landing, against the walk redone here
{
  const inBlock = (q, b) => { const t = q.tables[b], r = t.slots ? t.slots[0] : t.box; return q.landing.at[0] >= r.x0 && q.landing.at[0] <= r.x1 && q.landing.at[1] >= r.y0 && q.landing.at[1] <= r.y1 && Math.abs(q.landing.at[2] - r.z1 - 0.04) < 1e-9; };
  const walkedArcs = (q) => q.arcs.filter((a) => a.walked).map((a) => `${a.base}:${a.slot}`).sort();
  await pick('four_loops'); await seek(2); let q = await sol();
  check('die · [0, 0, 0, 0] mid-walk: the amber beam lands on slot 0 of P (the hop being read) and the loop has been walked twice',
    q.landing.base === CH.b0 && q.landing.slot === 0 && inBlock(q, String(CH.b0)) && q.loopWalks === 2 && JSON.stringify(walkedArcs(q)) === JSON.stringify([`${CH.b0}:0`]));
  await seekEnd(); q = await sol();
  check('die · [0, 0, 0, 0] at the end: four walks round the loop and the beam lands on P itself', q.loopWalks === 4 && q.landing.block === walkCh(mem, [0, 0, 0, 0])[3] && inBlock(q, String(CH.b0)));
  await pick('self_map'); await seekEnd(); q = await sol();
  check('die · [0, 1] at the end: P[0] and P[1] walked, the beam lands on the leaf table T₁', JSON.stringify(walkedArcs(q)) === JSON.stringify([`${CH.b0}:0`, `${CH.b0}:1`].sort()) && q.landing.block === walkCh(mem, [0, 1])[1] && q.landing.block === CH.T1 && inBlock(q, String(CH.T1)));
  await page.click('[data-idx="1,2"]'); await seekEnd(); q = await sol();
  check('die · [1, 2] at the end: P[1] and T₁[2] walked, the loop untouched, the beam lands on the data frame D₁,₂', JSON.stringify(walkedArcs(q)) === JSON.stringify([`${CH.b0}:1`, `${CH.T1}:2`].sort()) && q.loopWalks === 0 && q.landing.block === CH.D12 && inBlock(q, String(CH.D12)));
  await pick('diagonal_hit'); await seekEnd(); q = await sol();
  const port = q.marks.find((m) => m.key === 'port'), now = q.marks.find((m) => m.key === 'now');
  check('die · p = *p: the read port under the register is hidden by it, the amber landing on P is in view', port && port.hidden && now && !now.hidden && q.landing.block === CH.b0);
}
// the solid covers a real share of the stage in every scene, with light and shade, at the default camera
{
  let ok = true, why = '';
  for (const c of ['qram_tree', 'linear64', 'diagonal_hit']) {
    await pick(c); await seekEnd(); const px = await solidPixels(page);
    if (!(px.share >= 0.15 && px.share <= 0.3 && px.spread >= 0.04)) { ok = false; why = why || `${c}: ${(px.share * 100).toFixed(1)}%, σ ${px.spread.toFixed(3)}`; }
  }
  check('die: in the tree, scan and table scenes the opaque solid covers 15–30% of the stage, with shading', ok, why);
}
// it stays out of the flat drawings: no opaque pixel of the WebGL canvas inside a flat panel, the title or the legend
const glInside = (pg) => pg.evaluate(async () => {
  const sc = window.TRV.solids[0]; await sc.ready; window.TRV.kit.flush();
  const cv = sc.el.querySelector('canvas.solid-gl'); if (!cv) return null;
  const o = cv.getBoundingClientRect(), k = cv.width / o.width, cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height;
  const c = cp.getContext('2d'); c.drawImage(cv, 0, 0); const px = c.getImageData(0, 0, cp.width, cp.height).data;
  const rects = window.POINTER_DEBUG.solid().panels.map((p) => [p.what, p.x, p.y, p.w, p.h]);
  for (const el of [document.querySelector('.hud-tl'), ...document.querySelectorAll('#legend > span')]) { const r = el.getBoundingClientRect(); if (r.width) rects.push(['text', r.left - o.left, r.top - o.top, r.width, r.height]); }
  let n = 0; const where = [];
  for (const [what, x, y, w, h] of rects) {
    let m = 0;
    for (let yy = Math.max(0, Math.floor(y * k)); yy < Math.min(cp.height, Math.ceil((y + h) * k)); yy++) for (let xx = Math.max(0, Math.floor(x * k)); xx < Math.min(cp.width, Math.ceil((x + w) * k)); xx++) if (px[4 * (yy * cp.width + xx) + 3] > 8) m++;
    if (m) where.push(`${what}: ${m}`); n += m;
  }
  return { n, rects: rects.length, where };
});
{
  let ok = true, why = '';
  for (const c of ['qram_tree', 'linear64', 'diagonal_hit', 'four_loops']) { await pick(c); await seekEnd(); const g = await glInside(page); if (!g || g.n || g.rects < 3) { ok = false; why = why || `${c}: ${JSON.stringify(g)}`; } }
  check('die (desktop): no opaque pixel of the solid under a flat panel, the title or the legend', ok, why);
  for (const [name, q, vp] of [['cited figure 740 × 500', '?embed=1&lang=zh&preset=linear64', { width: 740, height: 500 }], ['still 800 × 450', '?shot=1&lang=en&preset=superpose', { width: 800, height: 450 }], ['phone 390', '?lang=zh&preset=diagonal_hit', { width: 390, height: 844 }], ['phone 390, tree', '?lang=en&preset=qram_tree', { width: 390, height: 844 }]]) {
    const pg = await T.open(BOOK, ID, q, { viewport: vp, reducedMotion: 'reduce' });
    await settle(pg);
    // inside a book the WebGL context is made once the stage is reported on screen (and given back after a rest)
    await until(pg, () => { const sc = window.TRV.solids && window.TRV.solids[0]; if (!sc) return false; if (sc.parked()) window.TRV.kit.flush(); return !sc.parked(); });
    const g = await glInside(pg), q3 = await sol(pg), px = await solidPixels(pg);
    check(`die (${name}): the solid stays out of the flat panels, the title and the legend, and still covers ≥ 10% of the stage`, !!g && g.n === 0 && g.rects >= 3 && px.share >= 0.1, JSON.stringify({ g, share: px.share, mode: q3.mode }));
    await pg.context().close();
  }
}
// a click on a cell of the die reads that address, as a click on the flat row does
await pick('linear64'); await seekEnd();
{
  const q = await sol(), c = q.cells.find((x) => x.a === 50);
  const pt = await page.evaluate(([x, y, z]) => { const sc = window.TRV.solids[0], b = sc.el.getBoundingClientRect(), p = sc.p([x, y, z]); return { x: b.left + p[0], y: b.top + p[1] }; }, [c.x + 0.05, c.y, c.z]);
  await page.mouse.click(pt.x, pt.y); s = await state();
  check('die: clicking cell 50 on the die sets the address to 50 and scans to it', s.a === 50 && s.scene === 'scan' && s.preset === null);
}

// English
const en = await T.goto(BOOK, ID, '?lang=en&preset=self_map');
await settle(en);
const hud = await en.textContent('#hudBig');
check('English: the self-map card opens with an English HUD', /Table/.test(hud) && !/[一-鿿]/.test(hud));

/* ---------- the lit solid: drawn, shaded, turning, hiding what is behind it, resting inside a book ---------- */
await pick('qram_tree'); await seekEnd();
await solidChecks(T, BOOK, ID, page);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
