// Browser regression suite for ORTHO//CAUSAL (books/quantum-geometry/viz/timeless-causal-crystal/).
//   node books/quantum-geometry/viz/tests/timeless-causal-crystal.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.CAUSAL_DEBUG and checks it against independent computations: the 3 × 3 Gram
// determinant by cofactors, a Runge–Kutta integration of the gradient flow, amplitude amplification simulated
// on the full state vector, 2-SAT decided by strongly connected components and by brute force, a pairwise
// resolution fixpoint, and a separately written RK4 integration of the wilderness field.
import { session, stageFirstChecks, settle } from '../../../../tools/node/viz-testkit.mjs';
import { plotBudgetChecks } from './plot-budget.mjs';

const BOOK = 'quantum-geometry', ID = 'timeless-causal-crystal';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

await stageFirstChecks(T, BOOK, ID);
// every chart drawn with kit.plot keeps its readable height in each cited figure, still, cover and lab viewport.
// Five cited cards are a sphere of kit.stage3 alone (the PAGES, WINDOW, FIELD and THREAD scenes): their cited figures
// show no strip, and 334 px wide the tour bar takes the place of the scene buttons (style.css), so they draw no chart.
// There each state must show the sphere instead, read from the pixels of #cv: one of those scenes, #cv filling the
// stage, the drawing over ≥ 12% of it, and its ink a disc (the sphere is filled with a faint shade and outlined): the
// box around the ink nearly square (0.8 … 1.25) and ≥ 80% of the disc inscribed in that box inked.
const sphereStage = (page) => page.evaluate(() => {
  const scene = window.CAUSAL_DEBUG.state.scene, cv = document.getElementById('cv'), st = cv.closest('.stage');
  const sr = st.getBoundingClientRect(), r = cv.getBoundingClientRect(), cover = (r.width * r.height) / (sr.width * sr.height);
  const shown = getComputedStyle(cv).visibility !== 'hidden' && !cv.hidden && r.width > 0 && r.height > 0;
  const W = cv.width, H = cv.height, d = cv.getContext('2d').getImageData(0, 0, W, H).data;
  let n = 0, x0 = W, y0 = H, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!d[(y * W + x) * 4 + 3]) continue;
    n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
  }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2, rad = Math.min(bw, bh) / 2 - 2;
  let disc = 0, inked = 0;
  for (let y = Math.max(0, Math.floor(cy - rad)); y <= Math.min(H - 1, cy + rad); y++) for (let x = Math.max(0, Math.floor(cx - rad)); x <= Math.min(W - 1, cx + rad); x++) {
    if ((x - cx) ** 2 + (y - cy) ** 2 > rad * rad) continue;
    disc++; if (d[(y * W + x) * 4 + 3]) inked++;
  }
  const share = n / (W * H), aspect = n ? bw / bh : 0, fill = disc ? inked / disc : 0;
  return { ok: ['pages', 'window', 'field', 'line'].includes(scene) && shown && cover >= 0.95 && share >= 0.12 && aspect >= 0.8 && aspect <= 1.25 && fill >= 0.8,
    detail: `scene ${scene}, #cv ${shown ? 'shown' : 'hidden'} over ${(cover * 100).toFixed(1)}% of the stage, ink ${(share * 100).toFixed(1)}%, box ${bw} × ${bh}, disc ${(fill * 100).toFixed(1)}% inked` };
});
await plotBudgetChecks(T, BOOK, ID, { stageOnly: { crystal: sphereStage, impossible: sphereStage, right: sphereStage, thread: sphereStage, field: sphereStage } });

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.CAUSAL_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 30000 }).catch(() => {});
const seek = async (t) => { await page.evaluate((v) => window.CAUSAL_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const scene = async (sc) => { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 40); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

/* ---------- the Gram window ---------- */
let s = await state();
check('opens on WINDOW: θ₁ = 60°, θ₂ = 45°, C at 70° about B', s.scene === 'window' && s.th1 === 60 && s.th2 === 45 && close(s.t, 70) && !s.playing);
check('the key readout shows det G ≥ 0', (await page.textContent('#roKey')).includes('≥ 0'));
let gramErr = 0, inWindow = true, edges = 0;
for (const [a, b] of [[60, 45], [30, 40], [90, 90], [120, 75], [10, 170], [0, 50], [137, 23]]) {
  await setRange('th1', a); await setRange('th2', b);
  for (const phi of [0, 37, 90, 180, 251, 360]) {
    s = await seek(phi);
    const c1 = Math.cos(a * DEG), c2 = Math.cos(b * DEG), s1 = Math.sin(a * DEG), s2 = Math.sin(b * DEG), cAC = c1 * c2 + s1 * s2 * Math.cos(phi * DEG);
    const det = 1 * (1 - c2 * c2) - c1 * (c1 - c2 * cAC) + cAC * (c1 * c2 - cAC);   // cofactor expansion of [[1,c1,cAC],[c1,1,c2],[cAC,c2,1]]
    gramErr = Math.max(gramErr, Math.abs(s.cAC - cAC), Math.abs(s.det - det), Math.abs(s.det - (s1 * s2 * Math.sin(phi * DEG)) ** 2), Math.abs(s.vol * s.vol - s.det), Math.abs(dot(s.A, s.C) - cAC),
      Math.abs(s.lo - Math.cos((a + b) * DEG)), Math.abs(s.hi - Math.cos((a - b) * DEG)));
    inWindow = inWindow && s.det > -1e-12 && s.cAC >= s.lo - 1e-12 && s.cAC <= s.hi + 1e-12;
    if (phi === 0) edges += close(s.cAC, s.hi, 1e-12) && close(s.det, 0, 1e-12) ? 1 : 0;
    if (phi === 180) edges += close(s.cAC, s.lo, 1e-12) && close(s.det, 0, 1e-12) ? 1 : 0;
  }
}
check('A·C, det G, the volume and the window agree with independent formulas (42 configurations)', gramErr < 1e-12, `max error ${gramErr}`);
check('A·C always lies in the window and det G is never negative', inWindow);
check('at φ = 0° and 180° A·C sits on an edge of the window and the volume is zero', edges === 14, `${edges} of 14`);
check('moving a slider leaves the experiment card', s.preset === null);
await pick('window'); s = await seek(0);
check('WINDOW at φ = 0: coplanar vectors, det G = 0 and A·C = cos 15°', close(s.det, 0, 1e-12) && close(s.cAC, Math.cos(15 * DEG), 1e-12) && (await page.textContent('#hudSub')).includes('共面'));
check('the WINDOW card states the real section and the Bargmann phase', (await page.textContent('#presetNote')).includes('Bargmann') && (await page.textContent('#presetNote')).includes('2|c_AB||c_BC||c_AC| cos Φ'));
// the half-width of the window is the product of the two wedge areas sin θ₁ sin θ₂; each 2 × 2 minor 1 − c² is the square of one of them
const minorAB = 1 - Math.cos(60 * DEG) ** 2, minorBC = 1 - Math.cos(45 * DEG) ** 2, halfW = (s.hi - s.lo) / 2;
const gramBox = await page.evaluate(() => [...document.querySelectorAll('.lean')].filter((b) => b.querySelector('[data-lean-gid$="lagrange_gram_identity"]') && /主子式/.test(b.textContent)).map((b) => b.textContent).join(' '));
check('θ₁ = 60°, θ₂ = 45°: the half-width of the window is sin θ₁ sin θ₂ = √(minor_AB · minor_BC), the product of the two wedge areas, and the evidence calls each 2 × 2 minor a squared area (zh and en)',
  close(halfW, Math.sin(60 * DEG) * Math.sin(45 * DEG), 1e-12) && close(halfW, Math.sqrt(minorAB * minorBC), 1e-12) && close(minorAB, Math.sin(60 * DEG) ** 2, 1e-12)
  && /主子式都是面积平方/.test(gramBox) && /两块楔积面积的乘积/.test(gramBox) && /principal minor of the Gram matrix is a squared area/.test(gramBox) && /product of the wedge areas/.test(gramBox) && !/主子式都是面积，/.test(gramBox) && !/is an area, hence/.test(gramBox), gramBox.slice(0, 160));
await pick('right'); s = await seek(123);
check('RIGHT-ANGLES: the window is all of [−1, 1]', close(s.lo, -1, 1e-12) && close(s.hi, 1, 1e-12) && close(s.cAC, Math.cos(123 * DEG), 1e-12));
await pick('impossible'); s = await state();
const neg = await page.evaluate(() => window.CAUSAL_DEBUG.detFor(-0.5));
check('IMPOSSIBLE: A·C = −0.5 is outside the window of θ₁ = 30°, θ₂ = 40°, where det G is negative', s.th1 === 30 && s.th2 === 40 && s.wish === -0.5 && s.wish < s.lo && neg < 0 && close(neg, (Math.sin(30 * DEG) * Math.sin(40 * DEG)) ** 2 - (-0.5 - Math.cos(30 * DEG) * Math.cos(40 * DEG)) ** 2, 1e-12));
check('C waits at the nearest edge and the page says why', close(s.cAC, s.lo, 1e-12) && (await page.textContent('#roNote')).includes('窗口之外'));
{
  // the angle labels and the vertex labels near B do not overlap one another on the IMPOSSIBLE still
  const boxes = await page.evaluate(() => [...document.querySelectorAll('#stage .tags .tag')].filter((t) => !t.hidden && t.textContent.trim())
    .map((t) => { const r = t.getBoundingClientRect(); return { txt: t.textContent, l: r.left, r: r.right, t: r.top, b: r.bottom }; }));
  const hits = []; for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) { const p = boxes[i], q = boxes[j]; if (p.l < q.r - 1 && q.l < p.r - 1 && p.t < q.b - 1 && q.t < p.b - 1) hits.push(`${p.txt} × ${q.txt}`); }
  check('IMPOSSIBLE: no two stage labels overlap', boxes.length >= 6 && hits.length === 0, hits.join(' | '));
}
await setRange('wish', 0.6); s = await state();
check('asking for a value inside the window moves C there', close(s.cAC, 0.6, 1e-9) && s.det > 0 && !(await page.textContent('#roNote')).includes('窗口之外'));
await setRange('wish', 0.99); s = await state();
check('asking for a value above the window is refused too', s.wish === 0.99 && s.wish > s.hi && close(s.cAC, s.hi, 1e-12) && (await page.textContent('#toast')).includes('det G'));
await pick('window'); await seek(70);
const tip = await page.evaluate(() => window.CAUSAL_DEBUG.tip());
await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(tip[0] + 40, tip[1] + 60, { steps: 4 }); await page.mouse.up();
s = await state(); const tip2 = await page.evaluate(() => window.CAUSAL_DEBUG.tip());
check('dragging C on the sphere moves it (to the nearest whole degree of θ₂)', Math.hypot(tip2[0] - tip[0] - 40, tip2[1] - tip[1] - 60) < 6 && s.preset === null && s.cAC >= s.lo - 1e-12 && s.cAC <= s.hi + 1e-12, JSON.stringify(tip2));

/* ---------- pages ---------- */
await pick('crystal'); s = await seek(3);
check('PAGES: twelve pages, head on page 3', s.scene === 'pages' && s.N === 12 && s.pages.length === 12);
let bookOk = true, circ = 0, vsSpinor = 0;
for (const [N, tilt] of [[12, 35], [4, 0], [7, 80], [24, 50]]) {
  await setRange('npages', N); await setRange('tilt', tilt); s = await state();
  bookOk = bookOk && s.pages.length === N && s.residual < 1e-12 && s.pages.every((r) => close(dot(r, r), 1, 1e-12));
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) circ = Math.max(circ, Math.abs(dot(s.pages[i], s.pages[j]) - dot(s.pages[0], s.pages[(j - i + N) % N])));
  for (let i = 0; i < N; i++) vsSpinor = Math.max(vsSpinor, ...s.pages[i].map((x, k) => Math.abs(x - s.bloch[i][k])));
}
check('the book is unchanged by one tick of clock and system: ‖(T ⊗ U − 1)Ψ‖ < 10⁻¹² (four books)', bookOk);
check('the overlap of two pages depends only on the difference of their numbers', circ < 1e-12, `max error ${circ}`);
check('the pages as rotations agree with the pages as spinors', vsSpinor < 1e-12, `max error ${vsSpinor}`);
check('the key readout reports the invariance', (await page.textContent('#roKey')).includes('= 0'));

/* ---------- field ---------- */
await pick('field'); s = await seek(1.5);
check('FIELD: starts 150° from the target', s.scene === 'field' && s.alpha0 === 150);
check('FIELD: the zero opposite the target is not drawn in the open-problem red, and the card note speaks only of the sphere',
  !(await page.$('#legend .sw.wn')) && !(await page.textContent('#presetNote')).includes('图') && (await page.evaluate(() => !document.querySelector('#stage .tags .tag.c-wn:not([hidden])'))));
let flowErr = 0, dissErr = 0;
for (const a0 of [20, 90, 150, 175]) {
  await setRange('alpha0', a0);
  for (const t of [0.5, 1.5, 4]) {
    s = await seek(t);
    let a = a0 * DEG, d = 0; const n = 4000, h = t / n;   // RK4 for α' = −sin α, with the dissipation ∫ sin²α
    for (let i = 0; i < n; i++) { const f = (x) => -Math.sin(x), k1 = f(a), k2 = f(a + h * k1 / 2), k3 = f(a + h * k2 / 2), k4 = f(a + h * k3); const mid = a + h * (k1 + 2 * k2 + 2 * k3 + k4) / 6; d += h * (Math.sin(a) ** 2 + 4 * Math.sin(a + h * k1 / 2) ** 2 + Math.sin(mid) ** 2) / 6; a = mid; }
    flowErr = Math.max(flowErr, Math.abs(s.alpha - a), Math.abs(s.speed - Math.sin(a)), Math.abs(s.V - (1 - Math.cos(a))));
    dissErr = Math.max(dissErr, Math.abs((s.V0 - s.V) - s.diss), Math.abs(s.diss - d));
  }
}
check('the flow follows α′ = −sin α (against a Runge–Kutta integration)', flowErr < 1e-9, `max error ${flowErr}`);
check('potential lost equals dissipation paid: V(0) − V(t) = ∫|ẋ|² (12 cases)', dissErr < 1e-6, `max error ${dissErr}`);
s = await seek(6); check('after t = 6 the flow from 175° is close to the target', s.alpha < 10 * DEG && s.alpha > 0);

/* ---------- thread ---------- */
await pick('thread'); s = await seek(0);
check('THREAD: N = 256, sin θ = 1/16, about 12 steps', s.scene === 'line' && s.n === 8 && close(Math.sin(s.theta), 1 / 16, 1e-12) && s.tstar === 12);
let ampErr = 0, bestOk = true;
for (const n of [2, 4, 6, 8]) {
  await setRange('qubits', n); s = await state();
  const N = 2 ** n; let v = new Array(N).fill(1 / Math.sqrt(N)); const probs = [v[0] ** 2];
  for (let t = 1; t <= s.tmax; t++) { v[0] = -v[0]; const mean = v.reduce((a, x) => a + x, 0) / N; v = v.map((x) => 2 * mean - x); probs.push(v[0] ** 2); }   // oracle, then inversion about the mean
  for (let t = 0; t <= s.tmax; t++) { const st = await seek(t); ampErr = Math.max(ampErr, Math.abs(st.prob - probs[t])); }
  bestOk = bestOk && probs[s.tstar] >= Math.max(...probs.slice(0, Math.min(probs.length, 2 * s.tstar + 1))) - 1e-12;
}
check('the success probability matches a simulation on the full state vector (n = 2, 4, 6, 8)', ampErr < 1e-9, `max error ${ampErr}`);
check('t* is the step where the simulated probability peaks', bestOk);
await setRange('qubits', 12); s = await state();
check('N = 4096 needs 50 steps, about four times the 12 of N = 256', s.n === 12 && s.tstar === 50);

/* ---------- order: the resolution closure of 2-CNF ---------- */
await pick('sos'); s = await seek(60);
check('SOS: the order scene at n = 60 with the observer at M = 8', s.scene === 'sos' && s.ordN === 60 && s.M === 8);
/** Satisfiability of a 2-CNF by the implication graph: unsatisfiable iff some x and ¬x share a strongly connected component. */
function sccUnsat(n, clauses) {
  const V = 2 * n, adj = Array.from({ length: V }, () => []), radj = Array.from({ length: V }, () => []);
  for (const c of clauses) { const [a, b] = c.length === 1 ? [c[0], c[0]] : c; adj[a ^ 1].push(b); adj[b ^ 1].push(a); radj[b].push(a ^ 1); radj[a].push(b ^ 1); }
  const order = [], vis = new Array(V).fill(false), comp = new Array(V).fill(-1);
  const dfs1 = (u) => { vis[u] = true; for (const w of adj[u]) if (!vis[w]) dfs1(w); order.push(u); };
  for (let u = 0; u < V; u++) if (!vis[u]) dfs1(u);
  let c = 0; const dfs2 = (u) => { comp[u] = c; for (const w of radj[u]) if (comp[w] < 0) dfs2(w); };
  for (let i = V - 1; i >= 0; i--) if (comp[order[i]] < 0) { dfs2(order[i]); c++; }
  for (let v = 0; v < n; v++) if (comp[2 * v] === comp[2 * v + 1]) return true;
  return false;
}
const bruteUnsat = (n, clauses) => { for (let m = 0; m < 1 << n; m++) { const val = (l) => (((m >> (l >> 1)) & 1) ^ (l & 1)) === 1; if (clauses.every((c) => c.some(val))) return false; } return true; };
/** Resolution closure by repeated passes over all pairs (a different algorithm from the page's worklist). */
function pairClosure(clauses) {
  const key = (c) => c.slice().sort((a, b) => a - b).join(',');
  const set = new Map(clauses.map((c) => [key(c), c.slice().sort((a, b) => a - b)])); let grew = true, widest = 0;
  while (grew) {
    grew = false; const all = [...set.values()];
    for (const c of all) for (const d of all) for (const l of c) if (d.includes(l ^ 1)) {
      const r = [...new Set([...c.filter((x) => x !== l), ...d.filter((x) => x !== (l ^ 1))])].sort((a, b) => a - b);
      if (r.some((x) => r.includes(x ^ 1))) continue;
      widest = Math.max(widest, r.length); const k = key(r); if (!set.has(k)) { set.set(k, r); grew = true; }
    }
  }
  return { size: set.size, widest, empty: set.has('') };
}
let decideOk = true, widthOk = true, sizeOk = true, unsatSeen = 0, satSeen = 0;
for (let n = 4; n <= 60; n += 4) {
  const o = await page.evaluate((m) => window.CAUSAL_DEBUG.order(m), n);
  const unsat = sccUnsat(n, o.clauses);
  decideOk = decideOk && o.clauses.length === 2 * n && o.empty === unsat && (n > 16 || bruteUnsat(n, o.clauses) === unsat);
  widthOk = widthOk && o.widest === 2 && o.width[3] === 0 && o.clauses.every((c) => c.length === 2 && c[0] >> 1 !== c[1] >> 1);
  if (n <= 24) { const pc = pairClosure(o.clauses); sizeOk = sizeOk && pc.size === o.size && pc.widest <= 2 && pc.empty === o.empty; }
  if (unsat) unsatSeen++; else satSeen++;
}
check('the closure decides every formula as the implication graph does (n = 4 … 60; brute force for n ≤ 16)', decideOk);
check('no derived clause is wider than two literals', widthOk);
check('the closure has the same clauses as a pairwise resolution fixpoint (n ≤ 24)', sizeOk);
check('the sample contains both satisfiable and unsatisfiable formulas', unsatSeen > 0 && satSeen > 0, `${unsatSeen} unsat, ${satSeen} sat`);
await setRange('order', 12); s = await state();
check('the M slider sets the observer\'s order and leaves the card', s.M === 12 && s.preset === null && (await page.textContent('#hudBig')).includes('M = 12'));
const pageText = await page.evaluate(() => document.body.innerText + ' ' + document.documentElement.innerHTML);
const zhBad = [...pageText.matchAll(/(证明|推出)\s*P\s*[=≠]\s*NP/g)].filter((m) => !/不/.test(pageText.slice(Math.max(0, m.index - 16), m.index)));
const enBad = [...pageText.matchAll(/(prove[sd]?|implies|imply|settles?)\s+(that\s+)?P\s*[=≠]\s*NP/g)].filter((m) => !/\b(not|nor)\b/.test(pageText.slice(Math.max(0, m.index - 48), m.index)));
check('no sentence on the page says that a picture proves P = NP or P ≠ NP (every such phrase is negated)', zhBad.length === 0 && enBad.length === 0, [...zhBad, ...enBad].map((m) => m[0]).join(' | '));
check('the page shows an OPEN badge for P ≠ NP in the order scene', await page.evaluate(() => [...document.querySelectorAll('.lean.open')].some((el) => !el.hidden && el.offsetParent !== null && /P ≠ NP/.test(el.textContent))));

/* ---------- wilderness: one field, one RK4 ---------- */
await pick('wilderness'); s = await seek(6.4);
const W = await page.evaluate(() => window.CAUSAL_DEBUG.wild());
check('WILDERNESS: ε = 0.15, the witness probe has reached S*', s.scene === 'wild' && close(W.eps, 0.15, 1e-12) && (await page.textContent('#hudBig')).includes('6.00'));
// the field, written again from the formula F = g(ỹ)(1, h′) + (1 − g(ỹ)) F_swirl with ψ = U sin(k(x + shift)) sin²(qỹ)
const makeField = (P, eps) => (z) => {
  const h = P.A * Math.sin(P.w * z[0]), hp = P.A * P.w * Math.cos(P.w * z[0]), yt = z[1] - h, g = Math.exp(-((yt / eps) ** 2));
  const sw = [P.U * P.q * Math.sin(P.k * (z[0] + P.shift)) * Math.sin(2 * P.q * yt), -P.U * P.k * Math.cos(P.k * (z[0] + P.shift)) * Math.sin(P.q * yt) ** 2];   // (ψ_ỹ, −ψ_x)
  return [g + (1 - g) * sw[0], g * hp + (1 - g) * (hp * sw[0] + sw[1])];
};
const integrate = (P, eps, x0, yt0, dt) => {
  const f = makeField(P, eps), ax = (a, b, c) => [a[0] + c * b[0], a[1] + c * b[1]];
  let z = [x0, P.A * Math.sin(P.w * x0) + yt0], maxYt = Math.abs(yt0), minYt = Math.abs(yt0), arrive = null; const path = [z];
  for (let i = 1; i <= Math.round(P.T / dt); i++) {
    const k1 = f(z), k2 = f(ax(z, k1, dt / 2)), k3 = f(ax(z, k2, dt / 2)), k4 = f(ax(z, k3, dt));
    z = [z[0] + dt * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]) / 6, z[1] + dt * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]) / 6]; path.push(z);
    const yt = Math.abs(z[1] - P.A * Math.sin(P.w * z[0])); maxYt = Math.max(maxYt, yt); minYt = Math.min(minYt, yt);
    if (z[0] >= P.L) { arrive = i * dt; break; }
  }
  return { path, maxYt, minYt, arrive };
};
let fieldOk = true;
for (let x = -0.4; x <= 6.4; x += 0.37) { const f = makeField(W, 0.15)([x, W.A * Math.sin(W.w * x)]), hp = W.A * W.w * Math.cos(W.w * x); fieldOk = fieldOk && close(f[0], 1, 1e-12) && close(f[1] - hp * f[0], 0, 1e-12); }
check('on the thread the field is its tangent (1, h′(x)), so dỹ/dt = 0', fieldOk);
const prs = await page.evaluate(() => window.CAUSAL_DEBUG.probes(1));
const wit = integrate(W, 0.15, 0, 0, W.dt), witHalf = integrate(W, 0.15, 0, 0, W.dt / 2);
let pathErr = 0; prs.forEach((pr) => { const mine = integrate(W, 0.15, pr.x0, pr.yt0, W.dt).path; pathErr = Math.max(pathErr, pr.pts.length === mine.length ? 0 : 1, ...pr.pts.map((q, i) => Math.hypot(q[0] - mine[i][0], q[1] - mine[i][1]))); });
check('every probe follows the same RK4 integration of the same field (independent integrator)', pathErr < 1e-9, `max error ${pathErr}`);
check('the probe started on the thread keeps |ỹ| within rounding and reaches S* at t ≈ 6 (also with half the step)', prs[0].on && wit.maxYt < 1e-9 && witHalf.maxYt < 1e-9 && wit.arrive != null && Math.abs(wit.arrive - 6) < 0.03 && Math.abs(witHalf.arrive - 6) < 0.03 && Math.abs(prs[0].arrive - wit.arrive) < 1e-9, `${wit.maxYt} ${wit.arrive}`);
let caught = true; const starts = [...prs.slice(1).map((pr) => [pr.x0, pr.yt0]), [1.5, 0.3], [1.5, -0.5], [3, 0.35], [4.5, -0.25], [3, -0.7]];
for (const [x0, yt0] of starts) { for (const dt of [W.dt, W.dt / 2]) { const r = integrate(W, 0.15, x0, yt0, dt); caught = caught && Math.abs(yt0) > 0.15 && r.arrive == null && r.minYt > 0.15 && Math.max(...r.path.map((q) => q[0])) < W.L - 0.5; } }
check('probes started outside the channel (|ỹ| > ε) circle in their vortex and never reach S* (9 starts, two step sizes)', caught && prs.slice(1).every((pr) => pr.arrive == null));
check('the readout reports 0 of 3 probes outside the channel reaching S*', (await page.textContent('#ro3')).includes('0 / 3'));
const plane = await page.evaluate(() => window.CAUSAL_DEBUG.plane());
const toPx = (x, y) => [plane.rect[0] + plane.pl + (x - plane.x0) / (plane.x1 - plane.x0) * plane.iw, plane.rect[1] + plane.pt + plane.ih - (y - plane.y0) / (plane.y1 - plane.y0) * plane.ih];
let at = toPx(3, W.A * Math.sin(W.w * 3) + 0.5); await page.mouse.click(at[0], at[1]); s = await state();
let mine = await page.evaluate(() => window.CAUSAL_DEBUG.probes(1));
check('clicking off the thread drops a probe that the vortex catches', s.user && mine.length === 5 && mine[4].user && Math.abs(mine[4].yt0 - 0.5) < 0.05 && mine[4].arrive == null && s.preset === null);
at = toPx(2, W.A * Math.sin(W.w * 2)); await page.mouse.click(at[0], at[1]); s = await state(); mine = await page.evaluate(() => window.CAUSAL_DEBUG.probes(1));
const mineRef = integrate(W, 0.15, mine[4].x0, 0, W.dt);
check('clicking on the thread snaps the probe onto it, and it runs to S*', mine[4].yt0 === 0 && mine[4].on && mine[4].arrive != null && Math.abs(mine[4].arrive - mineRef.arrive) < 1e-9 && mineRef.maxYt < 1e-9);
await setRange('eps', 0.25); s = await state(); const wide = integrate(W, 0.25, 0, 0, W.dt);
check('the ε slider widens the channel; the thread stays invariant', close(s.eps, 0.25, 1e-12) && wide.maxYt < 1e-9 && (await page.evaluate(() => window.CAUSAL_DEBUG.probes(1)))[0].arrive != null);

/* ---------- scenes, rail, keyboard ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'window'], ['2', 'pages'], ['3', 'field'], ['5', 'sos'], ['6', 'wild'], ['4', 'line']]) { await page.keyboard.press(key); check(`key ${key} opens the ${sc} scene`, (await state()).scene === sc); }
const vis = await page.evaluate(() => [...document.querySelectorAll('[data-scenes]')].map((el) => [el.dataset.scenes, !el.hidden]));
check('only the controls and evidence of the current scene are shown', vis.every(([sc, shown]) => shown === sc.split(' ').includes('line')));
await scene('window'); await page.locator('body').click({ position: { x: 5, y: 5 } });
s = await seek(30); await page.keyboard.press('ArrowRight'); check('→ turns C by one 15° step', close((await state()).t, 45));
await page.keyboard.press('End'); check('End completes the turn', close((await state()).t, 360));
await page.keyboard.press('Home'); await page.keyboard.press('Space'); await until(() => { const d = window.CAUSAL_DEBUG.state; return d.playing && d.t > 0; }); s = await state();
check('Space plays', s.playing && s.t > 0);
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the pills follow the scene', (await page.textContent('#pillScene strong')) === 'WINDOW');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
