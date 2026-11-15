#!/usr/bin/env node
// ARITH//SCHUR browser regression: the shared stage-first gate first, then every control and every property the page
// claims, against independent mathematics written here: the divisor graph rebuilt from divisibility, the terminal
// Schur complement from the block formula G_TT − G_TE G_EE⁻¹ G_ET (Gauss–Jordan inverse), the direct solution of the
// original system, the fill, order and operation counts from a symbolic elimination of our own, the dropped system
// solved by block back-substitution, and powers of P by sequential multiplication (never by squaring). The DROP card
// must remove a real coupling (visible discarded mass and residual), the resource readouts must state what they count,
// and orbiting the camera must change no number.
//   node books/quantum-geometry/viz/tests/arithmetic-schur-lab.test.mjs   (VIZ_SLOW_FRAMES=1000 for slow frames)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'arithmetic-schur-lab';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const ALPHA = 0.25;

/* ---------- own linear algebra ---------- */
const sub = (A, rows, cols) => rows.map((i) => cols.map((j) => A[i][j]));
const matmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => s + a * B[k][j], 0)));
const matvec = (A, x) => A.map((r) => r.reduce((s, a, k) => s + a * x[k], 0));
function inverse(A) {
  const n = A.length, M = A.map((r, i) => [...r, ...Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; for (let j = 0; j < 2 * n; j++) M[c][j] /= d;
    for (let i = 0; i < n; i++) if (i !== c) { const f = M[i][c]; if (f) for (let j = 0; j < 2 * n; j++) M[i][j] -= f * M[c][j]; }
  }
  return M.map((r) => r.slice(n));
}
const solve = (A, b) => matvec(inverse(A), b);
const norm = (v) => Math.hypot(...v);
const maxDiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((v, j) => Math.abs(v - B[i][j]))));

/* ---------- own graph, Schur complement and symbolic elimination ---------- */
function graph(N) {
  const labels = []; for (let n = 2; n <= N; n++) labels.push(n);
  const m = labels.length, W = labels.map((a) => labels.map((b) => (a !== b && (b % a === 0 || a % b === 0) ? 1 : 0)));
  const deg = W.map((r) => r.reduce((s, x) => s + x, 0)), G = W.map((r, i) => r.map((w, j) => (i === j ? deg[i] + ALPHA : -w)));
  const T = labels.map((n, i) => i).filter((i) => 4 * labels[i] > 3 * N), E = labels.map((n, i) => i).filter((i) => 4 * labels[i] <= 3 * N);
  return { N, labels, m, W, deg, G, T, E };
}
function schurRef(g) {
  const { G, T, E } = g, Ei = inverse(sub(G, E, E));
  return { S: sub(G, T, T).map((r, a) => r.map((v, c) => v - matmul(matmul(sub(G, [T[a]], E), Ei), sub(G, E, [T[c]]))[0][0])), Ei };
}
/** Symbolic elimination on the pattern of G: the order, the fill pairs and the counts of a dense-on-pattern update. */
function symbolic(g, rule) {
  const m = g.m, adj = g.W.map((r) => r.map((w) => w === 1)), alive = new Array(m).fill(true), order = [], fill = [];
  let mul = 0, add = 0, div = 0;
  const left = g.E.slice();
  while (left.length) {
    let p;
    if (rule === 'natural') p = left[0];
    else {
      const degOf = (i) => adj[i].filter((x, j) => x && alive[j] && j !== i).length;
      p = left.slice().sort((a, b) => degOf(a) - degOf(b) || g.labels[b] - g.labels[a])[0];
    }
    left.splice(left.indexOf(p), 1);
    const nb = adj[p].map((x, j) => (x && alive[j] && j !== p ? j : -1)).filter((j) => j >= 0);
    mul += nb.length ** 2; add += nb.length ** 2; div += nb.length;
    for (let a = 0; a < nb.length; a++) for (let b = a + 1; b < nb.length; b++) if (!adj[nb[a]][nb[b]]) { adj[nb[a]][nb[b]] = adj[nb[b]][nb[a]] = true; fill.push([g.labels[nb[a]], g.labels[nb[b]]].sort((x, y) => x - y)); }
    alive[p] = false; order.push(g.labels[p]);
  }
  return { order, fill, mul, add, div };
}

const T = await session();
const { page, check } = T;
await stageFirstChecks(T, BOOK, ID);

const state = async (p = page) => { await settle(p); return p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state); };
const setParams = async (o, p = page) => { await p.evaluate((x) => window.ARITHMETIC_SCHUR_DEBUG.setParams(x), o); return state(p); };
async function input(sel, v, p = page) { await p.locator(sel).evaluate((el, x) => { el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); return state(p); }
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); }); return state(p); }

function checkElim(s, tag) {
  const g = graph(s.params.N), ref = schurRef(g), b = new Array(g.m).fill(0); b[g.m - 1] = 1;
  check(`${tag}: G = L + αI of the divisor graph on 2…N`, maxDiff(s.graph.G, g.G) === 0 && JSON.stringify(s.graph.terminals) === JSON.stringify(g.T.map((i) => g.labels[i])));
  for (const rule of ['natural', 'leaf']) {
    const X = s.elim[rule], sym = symbolic(g, rule);
    check(`${tag} (${rule}): the terminal Schur complement equals G_TT − G_TE G_EE⁻¹ G_ET`, maxDiff(X.S, ref.S) < 1e-12, `${maxDiff(X.S, ref.S)}`);
    check(`${tag} (${rule}): the order, the fill and the counted operations`, JSON.stringify(X.order) === JSON.stringify(sym.order) && X.fill === sym.fill.length
      && X.mul === sym.mul && X.add === sym.add && X.div === sym.div, JSON.stringify({ page: [X.order, X.fill, X.mul, X.div], own: [sym.order, sym.fill.length, sym.mul, sym.div] }));
    check(`${tag} (${rule}): the fill edges`, JSON.stringify(X.fillEdges.map(([a, c]) => [a, c].sort((x, y) => x - y)).sort()) === JSON.stringify(sym.fill.slice().sort()));
    const xd = solve(g.G, b);
    check(`${tag} (${rule}): x agrees with the direct solution; ‖Gx − b‖ at rounding level`, Math.max(...X.x.map((v, i) => Math.abs(v - xd[i]))) < 1e-12 && X.residual < 1e-12
      && norm(matvec(g.G, X.x).map((v, i) => v - b[i])) < 1e-12);
    check(`${tag} (${rule}): every pivot is positive`, X.minPivot === null || X.minPivot >= ALPHA - 1e-12);
  }
  check(`${tag}: natural and leaf give the same S`, maxDiff(s.elim.natural.S, s.elim.leaf.S) < 1e-12);
}
function checkDrop(s, tag) {
  const g = graph(s.params.N), ref = schurRef(g), eps = s.params.eps, b = new Array(g.m).fill(0); b[g.m - 1] = 1;
  const Se = ref.S.map((r) => r.slice()), dropped = [];
  let fro = 0;
  for (let a = 0; a < g.T.length; a++) for (let c = a + 1; c < g.T.length; c++) if (ref.S[a][c] !== 0 && Math.abs(ref.S[a][c]) < eps) { fro += 2 * ref.S[a][c] ** 2; Se[a][c] = Se[c][a] = 0; dropped.push([g.labels[g.T[a]], g.labels[g.T[c]]]); }
  // block solve: x_T from the reduced right-hand side, then x_E from the eliminated block
  const bE = g.E.map((i) => b[i]), bT = g.T.map((i) => b[i]), GTE = sub(g.G, g.T, g.E), GET = sub(g.G, g.E, g.T);
  const rhs = bT.map((v, a) => v - matvec(GTE, matvec(ref.Ei, bE))[a]);
  const xT = solve(Se, rhs), xE = matvec(ref.Ei, bE.map((v, a) => v - matvec(GET, xT)[a])), x = new Array(g.m).fill(0);
  g.T.forEach((i, a) => { x[i] = xT[a]; }); g.E.forEach((i, a) => { x[i] = xE[a]; });
  const res = norm(matvec(g.G, x).map((v, i) => v - b[i]));
  const D = s.elim.drop;
  check(`${tag}: the dropped pairs, the discarded Frobenius norm`, JSON.stringify(D.dropped) === JSON.stringify(dropped) && Math.abs(D.discarded - Math.sqrt(fro)) < 1e-12, JSON.stringify({ page: D.dropped, own: dropped }));
  check(`${tag}: the residual of the dropped solve on the original system`, Math.abs(D.residual - res) < 1e-10 && maxDiff([D.x], [x]) < 1e-10, `${D.residual} vs ${res}`);
  return { dropped, res };
}
function checkSquare(s, tag) {
  const g = graph(s.params.N), n = g.m, tau = 1 / (1 + Math.max(...g.deg)), Q = s.square;
  const P0 = g.W.map((r, i) => r.map((w, j) => (i === j ? 1 - tau * g.deg[i] : tau * w)));
  check(`${tag}: P = I − τL with τ = 1/(1 + max deg)`, maxDiff(Q.P, P0) < 1e-15 && Math.abs(Q.tau - tau) < 1e-15);
  const d = Q.d;
  if (d <= 3) {
    let M = P0; for (let k = 1; k < 2 ** d; k++) M = matmul(M, P0);       // sequential products, 2^d − 1 of them
    check(`${tag}: P^${2 ** d} equals ${2 ** d - 1} sequential multiplications`, maxDiff(Q.M, M) < 1e-12, `${maxDiff(Q.M, M)}`);
  }
  let nnz = 0, rowErr = 0, minE = Infinity;
  for (const r of Q.M) { let sum = 0; for (const v of r) { if (v > 0) nnz++; sum += v; minE = Math.min(minE, v); } rowErr = Math.max(rowErr, Math.abs(sum - 1)); }
  check(`${tag}: nnz, row sums 1, nonnegative`, Q.nnz === nnz && rowErr < 1e-12 && Q.rowErr < 1e-12 && minE >= -1e-15 && Math.abs(Q.infNorm - 1) < 1e-12);
  check(`${tag}: the d dense products of the displayed algorithm take d·n³ and d·n²(n − 1); one output matrix has n² entries`, Q.mul === d * n ** 3 && Q.add === d * n * n * (n - 1)
    && Q.outputEntries === n * n && Q.exponent === 2 ** d && Q.cachedLevels === 7);
}
/** The nonzero off-diagonal couplings of the terminal Schur complement, from our own block formula: [a, b, S_ab]. */
function couplings(N) {
  const g = graph(N), S = schurRef(g).S, out = [];
  for (let a = 0; a < g.T.length; a++) for (let c = a + 1; c < g.T.length; c++) if (Math.abs(S[a][c]) > 1e-12) out.push([g.labels[g.T[a]], g.labels[g.T[c]], S[a][c]]);
  return out;
}
/** A viewport point over the bare canvas of the stage (not a button, chip or label host), at least 60 px from the handle. */
async function emptyPoint(p) {
  return p.evaluate(() => {
    const st = document.getElementById('stage'), r = st.getBoundingClientRect(), h = document.getElementById('handle');
    const hb = h && !h.hidden ? h.getBoundingClientRect() : null;
    for (const [fx, fy] of [[0.5, 0.55], [0.3, 0.55], [0.7, 0.55], [0.5, 0.42], [0.25, 0.4], [0.75, 0.4], [0.3, 0.7], [0.7, 0.7], [0.15, 0.55], [0.85, 0.55]]) {
      const x = r.left + fx * r.width, y = r.top + fy * r.height;
      if (hb && Math.hypot(x - hb.left - hb.width / 2, y - hb.top - hb.height / 2) < 60) continue;
      const el = document.elementFromPoint(x, y);
      if (el && el.id === 'cv') return { x, y };
    }
    return null;
  });
}

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [f, src] of Object.entries(sources)) check(`source ${f}: no literal colour, no palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src.replace(/href="[^"]*"/g, '')) && !/data-tr-palette|trPalette/.test(src));
check('source: no override of the lab grid', !/grid-template-columns/.test(sources['style.css']));
check('source: the four cards in order', JSON.stringify([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1])) === '["natural","leaf","drop","square"]');
check('source: only the shared runtime and the page script', JSON.stringify([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])) === '["../assets/shell.js","../assets/kit.js","main.js"]');
check('source: no green Lean box', !/class="lean"|class="lean frozen"|data-lean-gid/.test(sources['index.html']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live entry, no Lean list, theory link to §34.18', entry.status === 'live' && Array.isArray(entry.lean) && entry.lean.length === 0 && entry.code === 'ARITH//SCHUR'
  && (entry.theory || []).some((t) => /ch34-s18-gram-window-and-consensus\.html#sec-ch34-18-5$/.test(t.href)));

/* ---------- opening and the cards ---------- */
await T.goto(BOOK, ID, '?lang=zh');
let s = await state();
check('opens on NATURAL at its still frame k = 1 without playing', s.preset === 'natural' && s.scene === 'elim' && !s.playing && s.params.k === 1 && s.params.N === 6 && s.params.order === 'natural');
checkElim(s, 'NATURAL');
check('NATURAL: terminals {5, 6}; 2 goes first and joins 4 and 6 by the only fill edge', JSON.stringify(s.graph.terminals) === '[5,6]' && s.elim.pivot === 2
  && JSON.stringify(s.elim.natural.fillEdges) === '[[4,6,1]]' && s.elim.fill === 1 && s.elim.natural.fill === 1);
check('NATURAL: positions (v₂, v₃, log cofactor) are distinct', new Set(s.graph.raw.map((r) => r.join(','))).size === s.graph.labels.length
  && s.graph.labels.every((n, i) => Math.abs(2 ** s.graph.raw[i][0] * 3 ** s.graph.raw[i][1] * Math.exp(s.graph.raw[i][2]) - n) < 1e-9));
check('NATURAL: clicking the card plays the elimination', await playsAfter(page, () => page.click('[data-preset="natural"]')));
s = await pick('leaf');
await input('#now', s.max); s = await state();
checkElim(s, 'LEAF');
check('LEAF: order 4, 3, 2 and no fill at all', JSON.stringify(s.elim.leaf.order) === '[4,3,2]' && s.elim.leaf.fill === 0 && s.elim.fill === 0 && s.params.k === 3);
check('LEAF: the same S on {5, 6} as NATURAL', s.elim.S.length === 2 && maxDiff(s.elim.leaf.S, s.elim.natural.S) < 1e-12);
s = await pick('drop');
await input('#now', s.max); s = await state();
checkElim(s, 'DROP');
{
  const { dropped, res } = checkDrop(s, 'DROP');
  check('DROP: N = 16, ε = 0.2 drops exactly the entry between 14 and 15; the residual leaves rounding level', s.params.N === 16 && s.params.eps === 0.2
    && JSON.stringify(dropped) === '[[14,15]]' && res > 1e-6 && s.elim.residual < 1e-12);
  // the couplings behind it, from our own block formula: N = 16 (terminals 13…16) has three, and only the one between
  // 14 and 15 is below 0.2; N = 12 (terminals 10, 11, 12) has one of size ≈ 0.541877, beyond every ε ≤ 0.5
  const c16 = couplings(16), c12 = couplings(12), mags = c16.map((x) => -x[2]).sort((a, b) => a - b), want = [0.1250135, 0.2849153, 0.4169889];
  check('N = 16: the final S has three couplings ≈ −0.1250135, −0.2849153, −0.4169889, the smallest between 14 and 15', c16.length === 3 && c16.every((x) => x[2] < 0)
    && mags.every((m, i) => Math.abs(m - want[i]) < 1e-6) && c16.some((x) => x[0] === 14 && x[1] === 15 && Math.abs(-x[2] - want[0]) < 1e-6), JSON.stringify(c16));
  check('N = 12: the only coupling is ≈ −0.541877 between 10 and 12, so no ε ≤ 0.5 drops anything', c12.length === 1 && c12[0][0] === 10 && c12[0][1] === 12
    && Math.abs(c12[0][2] + 0.541877) < 1e-6 && -c12[0][2] > 0.5, JSON.stringify(c12));
  const D = s.elim.drop;
  check('DROP: the discarded Frobenius mass √2·|S₁₄,₁₅| ≈ 0.177 and the residual of the original system are visibly nonzero', Math.abs(D.discarded - Math.SQRT2 * want[0]) < 2e-6
    && D.discarded > 0.1 && D.residual > 1e-3, `${D.discarded} · ${D.residual}`);
  check('DROP: the readout names the dropped pair 14–15 and the residual of the original system', /14–15/.test(await page.textContent('#roList')) && /‖Gx̃ − b‖/.test(await page.textContent('#roList')));
  const ro = await page.textContent('#roList'), note = await page.textContent('#roNote');
  check('DROP: the operation counts are labelled as the Schur updates only, with what they leave out', /舒尔更新的标量运算/.test(ro) && /只计舒尔更新本身/.test(note)
    && /不含建 G、约化 b、终端求解、回代、残差、缓存与绘制/.test(note) && /丢掉的质量与原方程残差都离开零/.test(note));
}
s = await pick('square');
await input('#now', 3); s = await state();
checkSquare(s, 'SQUARE d = 3');
check('SQUARE: P⁸ is denser than P and its row sums stay 1', s.square.nnz > s.square.nnzP && s.square.rowErr < 1e-12);
{
  // the resource readouts say what they count: the d dense products of the displayed algorithm, one output matrix of
  // n² entries, all levels cached at once; no "storage n²" and no total-work claim
  const zh = { ro: await page.textContent('#roList'), note: await page.textContent('#roNote') };
  check('SQUARE (zh): counts of the displayed algorithm, entries of one output matrix, the cache named', /所示算法 d 次稠密乘积/.test(zh.ro) && /一个输出矩阵的元数 n²/.test(zh.ro) && !/存储 n²/.test(zh.ro)
    && /缓存了 d = 0…6 的全部层/.test(zh.note) && /不是页面的总工作量/.test(zh.note));
  await page.click('[data-lang-set="en"]'); await settle(page);
  const en = { ro: await page.textContent('#roList'), note: await page.textContent('#roNote') };
  check('SQUARE (en): the same scope in English', /d dense products of the displayed algorithm/.test(en.ro) && /Entries of one output matrix, n²/.test(en.ro) && !/Storage n²/.test(en.ro)
    && /caches all levels d = 0…6/.test(en.note) && /not the total work or storage of the page/.test(en.note) && !/[Dd]ense scalar work performed/.test(en.ro));
  await page.click('[data-lang-set="zh"]'); await settle(page);
}

/* ---------- sweeps (programmatic, checked independently) ---------- */
for (const N of [6, 7, 9, 12, 16, 20, 24]) { s = await setParams({ scene: 'elim', N, eps: 0, k: 0 }); checkElim(s, `N = ${N}`); }
for (const [N, eps] of [[12, 0.1], [16, 0.3], [20, 0.15], [24, 0.5]]) { s = await setParams({ scene: 'elim', N, order: 'leaf', eps }); checkDrop(s, `N = ${N}, ε = ${eps}`); }
s = await setParams({ scene: 'elim', N: 12, order: 'leaf', eps: 0.5 });
check('N = 12, ε = 0.5: nothing is dropped, the discarded mass is 0 and the residual stays at rounding level', s.elim.drop.dropped.length === 0 && s.elim.drop.discarded === 0
  && s.elim.drop.residual < 1e-12);
s = await setParams({ scene: 'elim', N: 16, order: 'leaf', eps: 0.3 });
check('N = 16, ε = 0.3: the two couplings below 0.3 (≈ 0.125 and ≈ 0.285) are dropped; the residual is visibly nonzero', s.elim.drop.dropped.length === 2
  && JSON.stringify(s.elim.drop.dropped.map((p) => p.join('–')).sort()).includes('14–15') && s.elim.drop.residual > 1e-3);
for (const N of [6, 12, 17]) for (const d of [0, 1, 2, 3, 6]) { s = await setParams({ scene: 'square', N, d }); checkSquare(s, `N = ${N}, d = ${d}`); }
{
  // the current Schur block after k steps equals the Schur complement of G onto the vertices still alive
  s = await setParams({ scene: 'elim', N: 12, order: 'leaf', k: 4 });
  const g = graph(12), gone = s.elim.eliminated.map((n) => g.labels.indexOf(n)), keep = s.elim.remaining.map((n) => g.labels.indexOf(n));
  const Ci = inverse(sub(g.G, gone, gone)), Sk = sub(g.G, keep, keep).map((r, a) => r.map((v, c) => v - matmul(matmul(sub(g.G, [keep[a]], gone), Ci), sub(g.G, gone, [keep[c]]))[0][0]));
  check('k = 4: the current block is the Schur complement onto the remaining vertices', maxDiff(s.elim.current, Sk) < 1e-12 && s.elim.eliminated.length === 4);
}

/* ---------- controls ---------- */
await pick('natural');
s = await input('#size', 10); check('N slider rebuilds the graph and the rail', s.params.N === 10 && s.graph.labels.length === 9 && s.preset === null && s.max === s.graph.free.length);
await page.click('#orderChips [data-order="leaf"]'); s = await state(); check('order chips switch to leaf first', s.params.order === 'leaf');
s = await input('#now', s.max); s = await input('#eps', 0.12); check('ε slider', Math.abs(s.params.eps - 0.12) < 1e-12);
checkDrop(s, 'after the ε slider');
await page.click('#sceneChips [data-scene="square"]'); s = await state();
check('scene chip: square, rail 0…6', s.scene === 'square' && s.max === 6);
s = await input('#depth', 5); check('depth slider moves the rail', s.params.d === 5 && Math.floor(s.t) === 5);
checkSquare(s, 'after the depth slider');

/* ---------- the handles ---------- */
await page.click('#sceneChips [data-scene="elim"]'); await setParams({ N: 12, order: 'natural', k: 1 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 4 }));
  const cam0 = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('handle k: dropping the ring on the pivot of step 4 sets k = 4, camera unchanged', s.params.k === 4 && s.elim.pivot === s.elim.order[3] && JSON.stringify(s.camera) === JSON.stringify(cam0), `k = ${s.params.k}`);
  await page.focus('#handle'); await page.keyboard.press('ArrowRight'); s = await state();
  check('handle keys: → one step', s.params.k === 5 && !s.playing);
}
await page.click('#sceneChips [data-scene="square"]'); await setParams({ N: 12, d: 1 });
{
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ d: 4 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  s = await state();
  check('handle d: dragging along the gauge sets d = 4, slider follows', s.params.d === 4 && Number(await page.inputValue('#depth')) === 4);
  await page.focus('#handle'); await page.keyboard.press('ArrowLeft'); s = await state();
  check('handle keys: ← one squaring less', s.params.d === 3);
  checkSquare(s, 'after the gauge');
}

/* ---------- orbiting the camera: drag empty canvas; no number moves, the handle re-projects, a drag still lands ---------- */
await page.click('#sceneChips [data-scene="elim"]'); await setParams({ N: 12, order: 'leaf', eps: 0, k: 4 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const e = await emptyPoint(page), before = await state();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await page.mouse.up(); }
  const after = await state();
  check('orbit (elimination): dragging empty canvas turns the camera', !!e && after.camera.yaw < before.camera.yaw - 0.2 && after.camera.pitch > before.camera.pitch + 0.05,
    JSON.stringify([before.camera, after.camera]));
  check('orbit (elimination): no parameter, step or card changes', JSON.stringify(after.params) === JSON.stringify(before.params) && after.preset === before.preset && after.elim.pivot === before.elim.pivot);
  checkElim(after, 'after the orbit');
  const off = await page.evaluate(() => { const h = window.ARITHMETIC_SCHUR_DEBUG.handleBox(), t = window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 4 }); return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity; });
  check('orbit (elimination): the handle is re-projected onto the pivot of step 4', off < 1.5, `${off}`);
  const h = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.handleBox()), to = await page.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ k: 7 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 6 }); await page.mouse.up();
  const s2 = await state();
  check('orbit then drag: dropping the ring on the pivot of step 7 sets k = 7 under the turned camera, which the drag leaves alone', s2.params.k === 7 && s2.elim.pivot === s2.elim.order[6]
    && JSON.stringify(s2.camera) === JSON.stringify(after.camera), `k = ${s2.params.k}`);
  checkElim(s2, 'after the orbit and the drag');
}
await page.click('#sceneChips [data-scene="square"]'); await setParams({ N: 12, d: 2 });
{
  const e = await emptyPoint(page), before = await state();
  if (e) { await page.mouse.move(e.x, e.y); await page.mouse.down(); await page.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await page.mouse.up(); }
  const after = await state();
  check('orbit (squaring): dragging empty canvas turns the camera and changes no number', !!e && after.camera.yaw < before.camera.yaw - 0.2 && after.params.d === 2
    && JSON.stringify(after.square.M) === JSON.stringify(before.square.M));
  checkSquare(after, 'after the orbit (squaring)');
  const off = await page.evaluate(() => { const h = window.ARITHMETIC_SCHUR_DEBUG.handleBox(), t = window.ARITHMETIC_SCHUR_DEBUG.dragTarget({ d: 2 }); return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity; });
  check('orbit (squaring): the handle is re-projected onto the gauge tick d = 2', off < 1.5, `${off}`);
}

/* ---------- playback and drawer ---------- */
await page.locator('body').click({ position: { x: 4, y: 4 } });
await setParams({ d: 0 });
await page.keyboard.press('Space');
check('Space plays the rail', await until(page, () => { const d = window.ARITHMETIC_SCHUR_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#infoBtn');
check('drawer: not a proof in both languages; Burnol and arXiv:1207.6583v3 linked; §34.18', await page.evaluate(() => {
  const d = document.getElementById('drawer'), hrefs = [...d.querySelectorAll('a')].map((a) => a.getAttribute('href'));
  return !d.hidden && /不是证明/.test(d.textContent) && /not a proof/.test(d.textContent) && hrefs.includes('https://arxiv.org/abs/math/0103058v2') && hrefs.includes('https://arxiv.org/abs/1207.6583v3')
    && hrefs.includes('../../zh/ch34-s18-gram-window-and-consensus.html#sec-ch34-18-5') && /liminf/.test(d.textContent);
}));
await page.keyboard.press('Escape');

/* ---------- the stills the chapter prints ---------- */
for (const lang of ['zh', 'en']) {
  let p = await openStill(T, BOOK, ID, 'natural', lang); let x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still natural (${lang}): k = 1, pivot 2, fill 4–6`, x.preset === 'natural' && x.params.k === 1 && x.elim.pivot === 2 && x.elim.fill === 1);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'leaf', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still leaf (${lang}): all three steps, no fill`, x.preset === 'leaf' && x.params.k === 3 && x.elim.fill === 0);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'drop', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still drop (${lang}): the end of the elimination, 14–15 dropped`, x.preset === 'drop' && x.params.k === x.graph.free.length && JSON.stringify(x.elim.drop.dropped) === '[[14,15]]');
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'square', lang); x = await p.evaluate(() => window.ARITHMETIC_SCHUR_DEBUG.state);
  check(`still square (${lang}): d = 3`, x.preset === 'square' && x.params.d === 3);
  checkSquare(x, `still square (${lang})`);
  {
    // the HTML handle is hidden in a still, so the caption's amber current-d marker must be the canvas dot: it sits on
    // the gauge point of d = 3 (where a drag would land) and no label box covers it
    const mk = await p.evaluate(() => {
      const el = document.getElementById('stage'), b = el.getBoundingClientRect(), D = window.ARITHMETIC_SCHUR_DEBUG, s = D.state, t = D.dragTarget({ d: s.params.d });
      return { m: s.frame && s.frame.marker, at: t ? [t.x - b.left - el.clientLeft, t.y - b.top - el.clientTop] : null, handle: s.handle, box: D.handleBox(), labels: s.labels || [] };
    });
    const gap = (r, q) => Math.hypot(Math.max(r.x - q[0], 0, q[0] - r.x - r.w), Math.max(r.y - q[1], 0, q[1] - r.y - r.h));
    check(`still square (${lang}): the HTML handle is hidden`, mk.handle === null && mk.box === null);
    check(`still square (${lang}): the amber current-d marker is drawn at the gauge point of d = 3, clear of every label (≥ 6 px)`, !!mk.m && !!mk.at
      && Math.hypot(mk.m.x - mk.at[0], mk.m.y - mk.at[1]) < 0.5 && mk.labels.every((r) => gap(r, [mk.m.x, mk.m.y]) >= 6), JSON.stringify(mk));
  }
  await p.context().close();
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
