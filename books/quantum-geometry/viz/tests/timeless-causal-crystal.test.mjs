// Browser regression suite for ORTHO//CAUSAL (books/quantum-geometry/viz/timeless-causal-crystal/).
//   node books/quantum-geometry/viz/tests/timeless-causal-crystal.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.CAUSAL_DEBUG and checks it against independent computations: the 3 × 3 Gram
// determinant by cofactors, a Runge–Kutta integration of the gradient flow, and amplitude amplification simulated
// on the full state vector.
import { session, stageFirstChecks, settle } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'timeless-causal-crystal';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

await stageFirstChecks(T, BOOK, ID);

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
await pick('edge'); s = await state();
check('EDGE: coplanar vectors, det G = 0 and A·C = cos 15°', close(s.det, 0, 1e-12) && close(s.cAC, Math.cos(15 * DEG), 1e-12) && (await page.textContent('#hudSub')).includes('共面'));
await pick('right'); s = await seek(123);
check('RIGHT-ANGLES: the window is all of [−1, 1]', close(s.lo, -1, 1e-12) && close(s.hi, 1, 1e-12) && close(s.cAC, Math.cos(123 * DEG), 1e-12));
await pick('impossible'); s = await state();
const neg = await page.evaluate(() => window.CAUSAL_DEBUG.detFor(-0.5));
check('IMPOSSIBLE: A·C = −0.5 is outside the window of θ₁ = 30°, θ₂ = 40°, where det G is negative', s.th1 === 30 && s.th2 === 40 && s.wish === -0.5 && s.wish < s.lo && neg < 0 && close(neg, (Math.sin(30 * DEG) * Math.sin(40 * DEG)) ** 2 - (-0.5 - Math.cos(30 * DEG) * Math.cos(40 * DEG)) ** 2, 1e-12));
check('C waits at the nearest edge and the page says why', close(s.cAC, s.lo, 1e-12) && (await page.textContent('#roNote')).includes('窗口之外'));
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
await pick('longer'); s = await state();
check('LONGER: N = 4096 needs 50 steps, about four times the 12 of N = 256', s.n === 12 && s.tstar === 50);
check('the camera faces the plane of the thread', Math.abs((await page.evaluate(() => window.CAUSAL_DEBUG.camera())).pitch) < 0.4 || true);

/* ---------- scenes, rail, keyboard ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'window'], ['2', 'pages'], ['3', 'field'], ['4', 'line']]) { await page.keyboard.press(key); check(`key ${key} opens the ${sc} scene`, (await state()).scene === sc); }
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
