#!/usr/bin/env node
// Browser regression suite for ORTHO//ONTOLOGY (books/quantum-geometry/viz/pointer-ontology-deref/).
//   node books/quantum-geometry/viz/tests/pointer-ontology-deref.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first. Then every count the page shows is redone here another way: N, log₂N and N − 1 by building
// the heap-numbered binary tree recursively (node h has children 2h and 2h + 1, leaves 64 … 127), the switches an
// address sets by descending that heap from the root by its bits, the scan by walking a list cell by cell, and the
// page walk from Chapter 38's own definitions (P[0] = b₀, P[i] = addr(Tᵢ), Tᵢ[j] = addr(Dᵢ,ⱼ); b₀ = 0x1000,
// addr(T₁) = 0x2000, addr(D₁,₂) = 0x9000 and the three rows of the chapter's table). Read through window.POINTER_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

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
check('p = *p: the LEAN ✓ box of the table scene is shown', await page.evaluate(() => !document.querySelector('.lean[data-scenes="table"]').hidden));
await pick('self_map'); s = await seekEnd();
check('[0, 1]: two hops, the leaf table T₁ (0x2000) is read out', s.hops.length === 2 && s.hops[0].value === CH.b0 && s.result === CH.T1);
s = await seek(1);
check('[0, 1]: after one hop the walk is back at 0x1000 and no result yet', s.hops.length === 1 && s.hops[0].value === CH.b0 && s.result === null);
await pick('four_loops'); s = await seekEnd();
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

// English
const en = await T.goto(BOOK, ID, '?lang=en&preset=self_map');
await settle(en);
const hud = await en.textContent('#hudBig');
check('English: the self-map card opens with an English HUD', /Table/.test(hud) && !/[一-鿿]/.test(hud));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
