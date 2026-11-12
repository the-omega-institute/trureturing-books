#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/lattice-gauge-loop (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/lattice-gauge-loop.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery come the checks of this page. Every claim is recomputed here independently: phases
// become unit complex numbers, squares are found from the corner coordinates (not from the page's loop lists), the
// tree is checked with union–find and walked by a depth-first search of its own, and loop products are complex
// multiplications rather than sums of angles.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'lattice-gauge-loop');

const page = await T.goto('quantum-geometry', 'lattice-gauge-loop', '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.GAUGE_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.GAUGE_DEBUG.seek(v), t); return state(); };
const card = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); await page.evaluate(() => window.GAUGE_DEBUG.seek(0)); return state(); };

/* ---------- independent arithmetic on unit complex numbers ---------- */
const cx = (deg) => [Math.cos(deg * Math.PI / 180), Math.sin(deg * Math.PI / 180)];
const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const conj = (a) => [a[0], -a[1]];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
/** The phase of the edge from corner p to corner q (conjugated when the edge points the other way), or null. */
function step(s, p, q) {
  for (let e = 0; e < s.E.length; e++) {
    if (s.E[e][0] === p && s.E[e][1] === q) return cx(s.phi[e]);
    if (s.E[e][0] === q && s.E[e][1] === p) return conj(cx(s.phi[e]));
  }
  return null;
}
const at = (s, i, j) => s.V.findIndex((v) => v[0] === i && v[1] === j);
/** Every unit square of the lattice, from the coordinates: its counter-clockwise product, keyed "i,j". */
function squares(s) {
  const out = new Map();
  for (const [i, j] of s.V) {
    const a = at(s, i, j), b = at(s, i + 1, j), c = at(s, i + 1, j + 1), d = at(s, i, j + 1);
    if (b < 0 || c < 0 || d < 0) continue;
    const parts = [step(s, a, b), step(s, b, c), step(s, c, d), step(s, d, a)];
    if (parts.some((x) => !x)) continue;
    out.set(`${i},${j}`, parts.reduce(mul, [1, 0]));
  }
  return out;
}
/** Tree check with union–find: n − 1 edges, no cycle. */
function isSpanningTree(s) {
  const up = s.V.map((_, i) => i), find = (x) => (up[x] === x ? x : (up[x] = find(up[x])));
  let used = 0;
  for (let e = 0; e < s.E.length; e++) { if (!s.tree[e]) continue; const a = find(s.E[e][0]), b = find(s.E[e][1]); if (a === b) return false; up[a] = b; used++; }
  return used === s.V.length - 1;
}
/** Transport phase from the root to every corner by a depth-first walk over the tree edges. */
function transport(s) {
  const out = s.V.map(() => null); out[s.root] = [1, 0];
  const stack = [s.root];
  while (stack.length) {
    const v = stack.pop();
    s.E.forEach(([a, b], e) => {
      if (!s.tree[e]) return;
      if (a === v && !out[b]) { out[b] = mul(out[a], cx(s.phi[e])); stack.push(b); }
      if (b === v && !out[a]) { out[a] = mul(out[b], conj(cx(s.phi[e]))); stack.push(a); }
    });
  }
  return out;
}
const pageLoops = (s) => s.loops.map(cx);
const sameLoops = (s0, s1) => { const a = squares(s0), b = squares(s1); let w = 0; for (const [k, v] of a) w = Math.max(w, dist(v, b.get(k))); return w; };

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === 'lattice-gauge-loop');
check('opens on the PLAQUETTE card, paused, on the single square', s.preset === 'plaquette' && s.lattice === '1' && !s.playing);

/* ---------- PLAQUETTE: the worked example of the chapter ---------- */
s = await card('plaquette');
const want0 = [[1, 0], [1, 0], [1, 0], [0, 1]];
check('PLAQUETTE: s = 0 shows u = (1, 1, 1, i)', s.phi.every((p, e) => dist(cx(p), want0[e]) < 1e-9), JSON.stringify(s.phi));
check('PLAQUETTE: edges run 0 → 1 → 2 → 3 → 0, tree {e₀, e₁, e₂}', JSON.stringify(s.E) === '[[0,1],[1,2],[2,3],[3,0]]' && JSON.stringify(s.tree) === '[true,true,true,false]');
s = await seek(1);
const want1 = [[0, 1], [0, 1], [0, 1], [-1, 0]];
check('PLAQUETTE: s = 1 shows u′ = (i, i, i, −1)', s.phi.every((p, e) => dist(cx(p), want1[e]) < 1e-9), JSON.stringify(s.phi));
check('PLAQUETTE: the gauge is g = (1, i, −1, −i)', [[1, 0], [0, 1], [-1, 0], [0, -1]].every((g, v) => dist(cx(s.gauge[v]), g) < 1e-9), JSON.stringify(s.gauge));
let worst = 0;
for (const t of [0, 0.2, 0.37, 0.5, 0.81, 1]) { const x = await seek(t); const q = squares(x).get('0,0'); worst = Math.max(worst, dist(q, [0, 1]), dist(pageLoops(x)[0], q)); }
check('PLAQUETTE: the loop product is i all along the rail (and the page agrees)', worst < 1e-9, `${worst}`);
s = await seek(1);
const rp = transport(s), chi3 = mul(mul(rp[3], cx(s.phi[3])), conj(rp[0]));
check('PLAQUETTE: rootPhase(u′, 3) = −i and χ(u′)(e₃) = i, as in the example', dist(rp[3], [0, -1]) < 1e-9 && dist(chi3, [0, 1]) < 1e-9 && dist(cx(s.chi[3]), chi3) < 1e-9);
check('PLAQUETTE: counts n = m = 4, k = 1, c = 1, a = 0', s.counts.n === 4 && s.counts.m === 4 && s.counts.k === 1 && s.counts.c === 1 && s.counts.a === 0 && s.counts.inv === 1);
check('PLAQUETTE: the key readout says i', (await page.textContent('#roLoop')).trim() === 'i');

/* ---------- TWIST: one corner turns a full circle ---------- */
s = await card('twist');
const e0 = [], loopT = [];
for (const t of [0, 0.25, 0.5, 0.75, 1]) { const x = await seek(t); e0.push(cx(x.phi[0])); loopT.push(squares(x).get('0,0')); }
check('TWIST: e₀ passes through 1, i, −1, −i and back', [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 0]].every((w, i) => dist(e0[i], w) < 1e-9));
check('TWIST: the loop stays at i throughout', loopT.every((q) => dist(q, [0, 1]) < 1e-9));
s = await seek(0.25);
check('TWIST: e₁ turns the opposite way (−i at a quarter)', dist(cx(s.phi[1]), [0, -1]) < 1e-9 && s.hot && s.hot.kind === 'v' && s.hot.i === 1);
// the still of TWIST stops at s = 0.875: the arcs on e₀ and e₁ cover ±315° (= the gauge angle 0.875 · 360° at corner 1), the loop none
s = await seek(0.875);
check('TWIST still: e₀ and e₁ have swept +315° and −315° (corner 1 turned 0.875 · 360°), the loop dial 0°', Math.abs(s.swept.phi[0] - 0.875 * 360) < 1e-9 && Math.abs(s.swept.phi[1] + 0.875 * 360) < 1e-9 && Math.abs(s.swept.phi[2]) < 1e-9 && Math.abs(s.swept.phi[3]) < 1e-9 && Math.abs(s.swept.loops[0]) < 1e-9);

/* ---------- CHORD: two squares, gauge on every corner but the root ---------- */
s = await card('chord'); const c0 = s; const c1 = await seek(1);
check('CHORD: two squares, n = 6, m = 7, c = 2, the tree is spanning', c0.lattice === '2' && c0.counts.n === 6 && c0.counts.m === 7 && c0.counts.c === 2 && isSpanningTree(c0));
check('CHORD: every edge but the root\'s neighbours moves, and some move a lot', c0.phi.filter((p, e) => dist(cx(p), cx(c1.phi[e])) > 0.1).length >= 6);
check('CHORD: both squares keep their loop phase', sameLoops(c0, c1) < 1e-9);
const outer = (x) => [step(x, 0, 1), step(x, 1, 2), step(x, 2, 5), step(x, 5, 4), step(x, 4, 3), step(x, 3, 0)].reduce(mul, [1, 0]);
check('CHORD: the outer loop keeps its phase and equals the product of the two squares', dist(outer(c0), outer(c1)) < 1e-9 && dist(outer(c1), mul(squares(c1).get('0,0'), squares(c1).get('1,0'))) < 1e-9);
check('CHORD: the page\'s outer dial is the χ of the right chord and equals the outer loop', c1.sel === 6 && dist(cx(c1.chi[6]), outer(c1)) < 1e-9 && dist(cx(c0.chi[6]), outer(c0)) < 1e-9);
check('CHORD: the root is not turned', Math.abs(c1.gauge[c1.root]) < 1e-9);
check('CHORD still: the title gives every loop in degrees, and the subtitle says left, right and outer moved 0°', /回路 -?−?\d+° · -?−?\d+°$/.test(c1.hud.trim()) && !/[i]$/.test(c1.hud.trim()) && c1.hudSub.includes('左格 0°') && c1.hudSub.includes('右格 0°') && c1.hudSub.includes('外圈 0°'), c1.hud + ' | ' + c1.hudSub);
check('CHORD still: every edge has an arc, no loop dial has one', c1.swept.phi.filter((d) => Math.abs(d) > 0.5).length >= 6 && c1.swept.loops.every((d) => Math.abs(d) < 1e-9));

/* ---------- ANCHOR: the tree path from r to the far anchor ---------- */
s = await card('anchor'); const a0 = s; const a1 = await seek(1);
check('ANCHOR: four squares with anchors {r, a}, k = 2, a = 1, c + a = m + k − n = 5', a0.lattice === '4' && a0.anchors.length === 2 && a0.counts.k === 2 && a0.counts.a === 1 && a0.counts.inv === a0.counts.m + 2 - a0.counts.n && a0.counts.inv === 5);
check('ANCHOR: the gauge at both anchors stays 1', a1.anchors.every((v) => Math.abs(a1.gauge[v]) < 1e-9) && a1.gauge.some((g) => Math.abs(g) > 1));
const ta0 = transport(a0)[a0.far], ta1 = transport(a1)[a1.far];
check('ANCHOR: the tree-path phase r → a does not move, while edges on that path do', dist(ta0, ta1) < 1e-9 && dist(cx(a1.rootPhase[a1.far]), ta1) < 1e-9 && a0.phi.some((p, e) => a0.tree[e] && dist(cx(p), cx(a1.phi[e])) > 0.1));
check('ANCHOR: the four squares keep their loop phases', sameLoops(a0, a1) < 1e-9);

/* ---------- TREE: iron the tree flat ---------- */
s = await card('tree'); const r0 = s; const r1 = await seek(1);
check('TREE: the tree is spanning (union–find) with 8 edges, 4 chords', isSpanningTree(r1) && r1.tree.filter(Boolean).length === 8 && r1.counts.c === 4);
check('TREE: at the end every tree edge reads 1', r1.phi.every((p, e) => !r1.tree[e] || dist(cx(p), [1, 0]) < 1e-9));
const tsq = squares(r1);
const chordWant = (x, e) => { const [a, b] = x.E[e], [i, j] = x.V[a]; if (x.V[b][0] !== i) return null; let q = [1, 0]; for (let k = 0; k < i; k++) q = mul(q, tsq.get(`${k},${j}`)); return q; };
const chords = r1.E.map((_, e) => e).filter((e) => !r1.tree[e]);
check('TREE: each chord keeps the product of the squares to its left in its row', chords.length === 4 && chords.every((e) => { const w = chordWant(r1, e); return w && dist(cx(r1.phi[e]), w) < 1e-9; }));
check('TREE: those chord values are the χ coordinates, before and after', chords.every((e) => dist(cx(r1.phi[e]), cx(r0.chi[e])) < 1e-9 && dist(cx(r1.chi[e]), cx(r0.chi[e])) < 1e-9));
check('TREE: the squares keep their loop phases', sameLoops(r0, r1) < 1e-9);

/* ---------- TWO: only the shared edge turns ---------- */
s = await card('two'); const w0 = s; const w1 = await seek(1);
const sq0 = squares(w0), sq1 = squares(w1);
check('TWO: only the shared middle edge changes', w0.phi.every((p, e) => (e === 5) === (dist(cx(p), cx(w1.phi[e])) > 1e-6)) && w1.hot && w1.hot.i === 5);
check('TWO: the left square turns by +150°, the right by −150°', dist(mul(sq1.get('0,0'), conj(sq0.get('0,0'))), cx(150)) < 1e-9 && dist(mul(sq1.get('1,0'), conj(sq0.get('1,0'))), cx(-150)) < 1e-9);
check('TWO: the outer loop does not move', dist(outer(w0), outer(w1)) < 1e-9 && dist(cx(w1.chi[6]), outer(w1)) < 1e-9);
{ // the subtitle of the still lists the three loop changes, read off the independent products above
  const ang = (z) => Math.round(Math.atan2(z[1], z[0]) / (Math.PI / 180)), fmt = (d) => `${d > 0 ? '+' : d < 0 ? '−' : ''}${Math.abs(d)}°`;
  const dl = ang(mul(sq1.get('0,0'), conj(sq0.get('0,0')))), dr = ang(mul(sq1.get('1,0'), conj(sq0.get('1,0')))), dc = ang(mul(outer(w1), conj(outer(w0))));
  check('TWO still: the subtitle reads left +150°, right −150°, outer 0° (from the square products)', w1.hudSub.includes(`左格 ${fmt(dl)}、右格 ${fmt(dr)}、外圈 ${fmt(dc)}`) && dl === 150 && dr === -150 && dc === 0, w1.hudSub);
}
check('TWO: the page says this is not a gauge transformation', (await page.textContent('#roNote')).includes('不是规范变换'));

/* ---------- controls ---------- */
await page.click('[data-lat="4"]'); s = await state();
check('lattice chips: 4 squares gives n = 9, m = 12, c = 4, a spanning tree', s.lattice === '4' && s.counts.n === 9 && s.counts.m === 12 && s.counts.c === 4 && isSpanningTree(s) && s.preset === null);
check('every lattice: the page\'s loop phases are the counter-clockwise products', [...squares(s).values()].every((q, i) => dist(q, pageLoops(s)[i]) < 1e-9));
const before = s;
await page.click('#btnGauge');
check('random gauge plays to the end', await until(page, () => { const d = window.GAUGE_DEBUG.state; return !d.playing && d.s === 1; }, null, 120000));
s = await state();
check('random gauge: edges moved, loops did not', s.phi.some((p, e) => dist(cx(p), cx(before.phi[e])) > 0.1) && sameLoops(before, s) < 1e-9);
await page.click('#btnTree');
check('iron the tree plays to the end', await until(page, () => { const d = window.GAUGE_DEBUG.state; return !d.playing && d.s === 1; }, null, 120000));
s = await state();
check('iron the tree: every tree edge reads 1, loops unchanged', s.phi.every((p, e) => !s.tree[e] || dist(cx(p), [1, 0]) < 1e-9) && sameLoops(before, s) < 1e-9);
const fb = s;
await page.click('#btnField'); s = await state();
check('random edges changes the loops themselves', sameLoops(fb, s) > 1e-3);
await page.click('[data-anc="far"]'); s = await state();
check('anchor chips: locking corner a gives k = 2', s.anc === 'far' && s.counts.k === 2 && s.counts.inv === s.counts.m + 2 - s.counts.n);
// drag an edge hand: point the hand of edge 0 straight down
let d = await page.evaluate(() => window.GAUGE_DEBUG.edgeAt(0));
await page.mouse.move(d[0], d[1] + d[2] * 0.6); await page.mouse.down(); await page.mouse.move(d[0] + 1, d[1] + d[2] * 0.7); await page.mouse.up(); s = await state();
check('dragging an edge hand sets that edge\'s phase', Math.abs(s.phi[0] - (-90)) < 6 && s.hot && s.hot.kind === 'e' && s.hot.i === 0, `${s.phi[0]}`);
// drag a corner's violet hand: corner 4 (the centre) a quarter turn
const pre = s;
d = await page.evaluate(() => window.GAUGE_DEBUG.vertexAt(4));
await page.mouse.move(d[0] + d[2], d[1]); await page.mouse.down();
for (let k = 1; k <= 6; k++) { const a = (k / 6) * Math.PI / 2; await page.mouse.move(d[0] + d[2] * Math.cos(a), d[1] - d[2] * Math.sin(a)); }
await page.mouse.up(); s = await state();
check('dragging a corner turns its gauge and keeps every loop', Math.abs(s.gauge[4] - 90) < 6 && sameLoops(pre, s) < 1e-9 && s.phi.some((p, e) => dist(cx(p), cx(pre.phi[e])) > 0.5), `${s.gauge[4]}`);
// an anchor refuses to turn
const pa = s;
d = await page.evaluate((v) => window.GAUGE_DEBUG.vertexAt(v), s.far);
await page.mouse.move(d[0] + d[2], d[1]); await page.mouse.down(); await page.mouse.move(d[0], d[1] - d[2]); await page.mouse.up(); s = await state();
check('an anchor does not turn', s.phi.every((p, e) => dist(cx(p), cx(pa.phi[e])) < 1e-9) && Math.abs(s.gauge[s.far]) < 1e-9);
await page.click('[data-preset="chord"]'); await settle(page); await page.evaluate(() => window.GAUGE_DEBUG.seek(0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps a quarter', Math.abs(s.s - 0.25) < 1e-9);
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.GAUGE_DEBUG.state.s > 0.25));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
