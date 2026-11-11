// Browser regression suite for NETWORK//CUT (books/quantum-geometry/viz/layered-network-cut/).
//   node books/quantum-geometry/viz/tests/layered-network-cut.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.NETCUT_DEBUG and checks it against computations written here: the network rebuilt
// layer by layer from slot arithmetic, minimal cuts by depth-first Ford–Fulkerson with an explicit source and sink
// (the page uses breadth-first augmenting paths from the chosen legs), and every cut the page draws by deleting its
// bonds and searching for a remaining path.
import { session, stageFirstChecks, settle, until, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'layered-network-cut', N = 32;
const T = await session();
const { check } = T;

await stageFirstChecks(T, BOOK, ID);

/* ---------- the network, rebuilt here ---------- */
// Layer l works on n = N / 2^l slots. Disentanglers u{l}.{i} take the slots i, i + 1 for odd i < n − 1; isometries
// w{l}.{j} take the slots 2j, 2j + 1 after the disentanglers. Slot s of layer l is held by the node that last touched it.
function rebuild() {
  const edges = []; let holder = Array.from({ length: N }, (_, i) => 'b' + i);
  for (let l = 0, n = N; n > 1; l++, n /= 2) {
    const after = holder.slice();
    for (let i = 1; i + 1 < n; i += 2) { const u = `u${l}.${i}`; edges.push([holder[i], u], [holder[i + 1], u]); after[i] = u; after[i + 1] = u; }
    const next = [];
    for (let j = 0; j < n / 2; j++) { const w = `w${l}.${j}`; edges.push([after[2 * j], w], [after[2 * j + 1], w]); next.push(w); }
    holder = next;
  }
  return edges;
}
const MINE = rebuild();
const norm = (es) => es.map(([a, b]) => (a < b ? `${a}|${b}` : `${b}|${a}`)).sort();

/** Minimal number of unit bonds separating the legs `sites` from the other boundary legs: DFS Ford–Fulkerson. */
function fordFulkerson(edges, sites) {
  const cap = new Map(), adj = new Map(), put = (a, b, c) => { cap.set(a + '>' + b, (cap.get(a + '>' + b) || 0) + c); if (!adj.has(a)) adj.set(a, new Set()); adj.get(a).add(b); };
  for (const [a, b] of edges) { put(a, b, 1); put(b, a, 1); }
  const inA = new Set(sites.map((s) => 'b' + s));
  for (let s = 0; s < N; s++) { if (inA.has('b' + s)) { put('S', 'b' + s, 1e9); put('b' + s, 'S', 0); } else { put('b' + s, 'T', 1e9); put('T', 'b' + s, 0); } }
  let flow = 0;
  for (;;) {
    const seen = new Set(['S']), path = [];
    const dfs = (v) => { if (v === 'T') return true; for (const w of adj.get(v) || []) { if (seen.has(w) || cap.get(v + '>' + w) <= 0) continue; seen.add(w); path.push([v, w]); if (dfs(w)) return true; path.pop(); } return false; };
    if (!dfs('S')) return flow;
    for (const [v, w] of path) { cap.set(v + '>' + w, cap.get(v + '>' + w) - 1); cap.set(w + '>' + v, cap.get(w + '>' + v) + 1); }
    flow++;
  }
}
const range = (l, r) => Array.from({ length: r - l }, (_, i) => l + i);
/** Does deleting `cut` leave any path from a leg of `sites` to another boundary leg? */
function separates(edges, cut, sites) {
  const gone = new Set(norm(cut)), adj = new Map(), inA = new Set(sites.map((s) => 'b' + s));
  for (const [a, b] of edges) { if (gone.has(norm([[a, b]])[0])) continue; for (const [x, y] of [[a, b], [b, a]]) { if (!adj.has(x)) adj.set(x, []); adj.get(x).push(y); } }
  const seen = new Set(inA), q = [...inA];
  for (let h = 0; h < q.length; h++) for (const w of adj.get(q[h]) || []) { if (seen.has(w)) continue; if (/^b\d+$/.test(w) && !inA.has(w)) return false; seen.add(w); q.push(w); }
  return true;
}

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.NETCUT_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const seek = async (l) => { await D((v) => window.NETCUT_DEBUG.seek(v), l); return state(); };
const G = await D(() => window.NETCUT_DEBUG.graph());

const ids = G.nodes.map((n) => n.id), kinds = (k) => G.nodes.filter((n) => n.kind === k).length;
check('the network: 32 legs, 26 disentanglers, 31 isometries, 114 bonds', kinds('b') === 32 && kinds('u') === 26 && kinds('w') === 31 && G.edges.length === 114 && MINE.length === 114 && new Set(ids).size === ids.length);
check('the page’s bonds are exactly the binary MERA rebuilt here from slot arithmetic', JSON.stringify(norm(G.edges)) === JSON.stringify(norm(MINE)));
const deg = {}; for (const [a, b] of MINE) { deg[a] = (deg[a] || 0) + 1; deg[b] = (deg[b] || 0) + 1; }
check('every leg has one bond, every disentangler four, every isometry three, the top two', Object.entries(deg).every(([v, d]) => (v[0] === 'b' ? d === 1 : v[0] === 'u' ? d === 4 : v === 'w4.0' ? d === 2 : d === 3)));

const table = await D(() => window.NETCUT_DEBUG.table());
let tabOK = true, tabBad = '', refOK = true, refBad = '', count = 0;
for (let l = 0; l < N; l++) for (let r = l + 1; r <= N; r++) {
  if (r - l === N) continue; count++;
  const k = fordFulkerson(MINE, range(l, r));
  if (table[`${l},${r}`] !== k) { tabOK = false; tabBad = `[${l}, ${r}) page ${table[`${l},${r}`]} here ${k}`; }
  if (k > 2 * Math.log2(r - l) + 1 + 1e-9 || k > r - l || k > N - (r - l)) { refOK = false; refBad = `[${l}, ${r}) k = ${k}`; }
}
check(`all ${count} intervals: the page’s minimal cut equals depth-first Ford–Fulkerson here`, count === 527 && tabOK, tabBad);
check('every interval needs at most 2·log₂L + 1 bonds, at most L and at most 32 − L (the page says so)', refOK && (await state()).refOK, refBad);
const tight = [1, 16].every((len) => range(0, N - len + 1).some((l) => table[`${l},${l + len}`] === 2 * Math.log2(len) + 1));
check('the dashed line 2·log₂L + 1 is reached at L = 1 and L = 16, so it cannot be lowered', tight);

/** Check a state's drawn cut: its size is k, it separates, it is minimal by Ford–Fulkerson here. */
const cutOK = (s) => { const sites = range(s.A[0], s.A[1]).concat(s.B ? range(s.B[0], s.B[1]) : []); return s.cut.length === s.k && separates(MINE, s.cut, sites) && fordFulkerson(MINE, sites) === s.k; };

/* ---------- the cards ---------- */
// Playing a whole card takes up to fifteen units of the rail; at one frame a second (VIZ_SLOW_FRAMES=1000) each frame
// advances at most 0.1 s of rail time, so the suite plays at 2.5× and waits for the page's own state up to two minutes.
const PLAY_WAIT = 120000;
await page.click('#speedChips [data-speed="2.5"]'); await settle(page);
let s = await state();
check('opens on FOUR SITES: sites 13–16, the minimal cut severs 3 bonds, fewer than the 4 legs', s.preset === 'four' && s.mode === 'one' && s.A.join() === '13,17' && s.k === 3 && cutOK(s) && !s.cut.some(([a, b]) => /^b/.test(a) || /^b/.test(b)));
check('FOUR SITES: three tensors lie inside the cut', s.side.filter((v) => !/^b/.test(v)).length === 3 && /3 条键/.test(await page.textContent('#hudSub')));
await pick('one'); s = await state();
check('ONE SITE: the interval is site 16 and the minimal cut is its own leg', s.A.join() === '16,17' && s.k === 1 && s.cut.length === 1 && s.cut[0].includes('b16') && cutOK(s));
await pick('grow');
check('GROW plays the length of A upward', await until(page, () => { const d = window.NETCUT_DEBUG.state; return d.playing || d.L > 1; }));
check('GROW ends at L = 16 by itself', await until(page, () => { const d = window.NETCUT_DEBUG.state; return !d.playing && d.L === 16; }, null, PLAY_WAIT));
s = await state();
const growSeq = range(1, 17).map((len) => fordFulkerson(MINE, range(24 - len, 24)));
check('GROW: A = sites 8–23, the cut severs 8 bonds against 16 legs; along the way 1, 2, 3, 4, 4, 5, 5, 6, 6, 7, 6, 7, 7, 8, 7, 8', s.A.join() === '8,24' && s.k === 8 && cutOK(s) && growSeq.join() === '1,2,3,4,4,5,5,6,6,7,6,7,7,8,7,8');
let seqOK = true; for (const len of [1, 2, 4, 8, 12]) { const st = await seek(len); if (!(st.k === growSeq[len - 1] && cutOK(st))) seqOK = false; }
check('GROW: the rail sets L and each drawn cut is a minimal cut', seqOK);
await pick('two');
check('TWO plays and stops by itself at L = 10', await until(page, () => { const d = window.NETCUT_DEBUG.state; return !d.playing && d.L === 10 && d.preset === 'two'; }, null, PLAY_WAIT));
s = await state();
check('TWO at L = 10: A = sites 6–15, B = sites 18–25; together 10 bonds, apart 7 + 6 = 13', s.mode === 'two' && s.A.join() === '6,16' && s.B.join() === '18,26' && s.k === 10 && s.kA === 7 && s.kB === 6 && s.sum === 13 && cutOK(s)
  && fordFulkerson(MINE, range(6, 16)) === 7 && fordFulkerson(MINE, range(18, 26)) === 6);
check('TWO at L = 10: the cut includes the two legs of the gap (sites 16 and 17)', ['b16', 'b17'].every((b) => s.cut.some((e) => e.includes(b))));
let switchOK = true, swBad = '';
for (let len = 1; len <= 16; len++) {
  const st = await seek(len), here = fordFulkerson(MINE, range(16 - len, 16).concat(range(18, 26))), apart = fordFulkerson(MINE, range(16 - len, 16)) + 6;
  if (!(st.k === here && st.sum === apart && cutOK(st) && (len <= 6 ? here === apart : here < apart))) { switchOK = false; swBad = `L ${len}: page ${st.k}/${st.sum}, here ${here}/${apart}`; }
}
check('TWO: up to L = 6 together equals apart; from L = 7 on together is strictly cheaper', switchOK, swBad);

/* ---------- controls ---------- */
await page.click('body', { position: { x: 5, y: 5 } });
await page.keyboard.press('1'); s = await state(); check('key 1: one interval', s.mode === 'one' && s.B === null);
await page.keyboard.press('2'); s = await state(); check('key 2: two intervals, B = sites 18–25', s.mode === 'two' && s.B.join() === '18,26' && s.A[1] < s.B[0]);
await page.click('#modeChips [data-mode="one"]'); s = await state(); check('the chip “one” removes B', s.mode === 'one' && s.B === null);
await page.click('#modeChips [data-mode="two"]'); s = await state(); check('the chip “two” adds B', s.mode === 'two' && !!s.B);
await page.click('#modeChips [data-mode="one"]'); await settle(page);
await page.click('body', { position: { x: 5, y: 5 } });
await page.keyboard.press('Home'); s = await state(); check('Home: L = 1', s.L === 1);
await page.keyboard.press('ArrowRight'); s = await state(); check('→ lengthens A by one site, right end fixed', s.L === 2 && s.A[1] - s.A[0] === 2);
await page.keyboard.press('End'); s = await state(); check('End: the longest A the rail allows', s.L === s.lmax && s.lmax <= 16);
await page.click('#rew'); s = await state(); check('⏮ goes back to one site', s.L === 1);
await page.click('body', { position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays the length', await until(page, () => { const d = window.NETCUT_DEBUG.state; return d.playing && d.L > 1; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await D(() => { const el = document.getElementById('now'); el.value = '5'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('the rail sets L = 6', s.L === 6 && s.preset === null && cutOK(s));

// pointer: an empty site moves A there; the right end lengthens it; B slides
await pick('four');
const at = (site) => D((v) => window.NETCUT_DEBUG.site(v), site);
let p = await at(5); await page.mouse.click(p[0], p[1]); s = await state();
check('pressing on an empty site moves A over it, keeping its length', s.A[1] - s.A[0] === 4 && s.A[0] <= 5 && 5 < s.A[1] && s.preset === null && cutOK(s));
const a0 = s.A;
p = await at(a0[1] - 1); const q = await at(a0[1] + 3);
await page.mouse.move(p[0], p[1]); await page.mouse.down(); await page.mouse.move(q[0], q[1], { steps: 4 }); await page.mouse.up(); s = await state();
check('dragging the right end of A lengthens it to the pointer', s.A[0] === a0[0] && s.A[1] === a0[1] + 4 && s.L === 8 && cutOK(s));
await page.click('#modeChips [data-mode="two"]'); s = await state();
const b0 = s.B; p = await at(b0[0] + 3); const r = await at(b0[0] + 5);
await page.mouse.move(p[0], p[1]); await page.mouse.down(); await page.mouse.move(r[0], r[1], { steps: 3 }); await page.mouse.up(); s = await state();
check('dragging the middle of B slides it', s.B[0] === Math.min(b0[0] + 2, N - (b0[1] - b0[0])) && s.B[1] - s.B[0] === b0[1] - b0[0] && cutOK(s) && s.k <= s.sum);
let subOK = true;
for (const [a, b] of [[[2, 6], [9, 14]], [[0, 10], [12, 28]], [[20, 23], [4, 18]], [[14, 15], [16, 17]]]) {
  const together = fordFulkerson(MINE, range(...a).concat(range(...b))), apart = fordFulkerson(MINE, range(...a)) + fordFulkerson(MINE, range(...b));
  if (together > apart) subOK = false;
}
check('together never needs more than apart (four more pairs, by Ford–Fulkerson here)', subOK);

/* ---------- labels, language ---------- */
check('the evidence: MERA and RT as literature, the network as a model, the bridge-graph bound in green', await D(() => {
  const argued = [...document.querySelectorAll('.lean.argued')].map((b) => b.textContent).join(' ');
  return /Ryu/.test(argued) && /Swingle/.test(argued) && /未在本书形式化/.test(argued) && !!document.querySelector('.lean.model') && /QMaxFlow_le_QMinCut/.test(document.querySelector('.lean:not(.num):not(.model):not(.argued):not(.open)').textContent);
}));
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const m of ['one', 'two']) { await page.click(`#modeChips [data-mode="${m}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left with ${m} interval${m === 'one' ? '' : 's'} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
