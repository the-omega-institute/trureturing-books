// Browser regression suite for ORTHO//ESCAPE (books/quantum-geometry/viz/sphere-escape/).
//   node books/quantum-geometry/viz/tests/sphere-escape.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.ESCAPE_DEBUG and recomputes every claim independently: the flipped diagonal, the
// polygon gap, the verified Taylor bound, the cosine orbit and Euclid's numbers (with BigInt).
import { session, stageFirstChecks, settle } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'sphere-escape';
const T = await session();
const { check } = T;
const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-300);

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.ESCAPE_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.ESCAPE_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const scene = async (sc) => { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 40); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const flipped = (rows) => rows.map((r, i) => (r[i] === '1' ? '0' : '1')).join('');
const dist = (a, b) => [...a].reduce((s, ch, i) => s + (ch !== b[i] ? 1 : 0), 0);

/* ---------- diagonal ---------- */
let s = await state();
check('starts on the DIAGONAL card: 6 rows of 6 bits', s.scene === 'diag' && s.N === 6 && s.rows.length === 6 && s.rows.every((r) => /^[01]{6}$/.test(r)));
let ok = true, minH = 99;
for (const N of [3, 5, 8, 10]) for (const seed of [1, 11, 42, 99]) {
  await setRange('size', N); await setRange('seed', seed); s = await state();
  const d = flipped(s.rows);
  ok = ok && s.d === d && !s.rows.includes(d) && s.rows.every((r, i) => r[i] !== d[i]) && s.hamming.every((h, i) => h === dist(s.rows[i], d) && h >= 1);
  minH = Math.min(minH, ...s.hamming);
}
check('for 16 lists (N = 3 … 10): d is the flipped diagonal, differs from row k in place k, and is on no row', ok);
check('every Hamming distance from d to a row is at least 1', minH >= 1, `min ${minH}`);
check('changing the list leaves the experiment card', s.preset === null);
await setRange('size', 6); await setRange('seed', 11); s = await seek(6);
const before = s;
const at = await page.evaluate(() => window.ESCAPE_DEBUG.cell(2, 4));
await page.mouse.click(at[0], at[1]); s = await state();
check('clicking an off-diagonal cell flips that bit and leaves d alone', s.rows[2][4] !== before.rows[2][4] && s.d === before.d && !s.rows.includes(s.d));
const dg = await page.evaluate(() => window.ESCAPE_DEBUG.cell(3, 3));
await page.mouse.click(dg[0], dg[1]); s = await state();
check('clicking a diagonal cell flips the matching bit of d, and d is still off the list', s.d[3] !== before.d[3] && s.d === flipped(s.rows) && !s.rows.includes(s.d));
// make row 1 equal to the current d except for the diagonal bit: the nearest it can get
await page.click('#identity'); s = await state();
check('Identity: the unit matrix gives d = 000000', s.rows.every((r, i) => [...r].every((ch, j) => ch === (i === j ? '1' : '0'))) && s.d === '000000' && s.hamming.every((h) => h === 1));
s = await seek(3);
check('the rail reads the diagonal bit by bit', s.step === 3 && (await page.textContent('#ro2')) === '000···');
check('the HUD names the next bit to read', (await page.textContent('#hudSub')).includes('第 4 行第 4 位'));
// absorb d again and again
await pick('diagonal'); await seek(6);
let grew = true, old = (await state());
for (let n = 7; n <= 10; n++) {
  await page.click('#absorb'); await settle(page, 30); s = await seek(n);
  grew = grew && s.N === n && s.rows.length === n && s.rows[n - 1].slice(0, n - 1) === old.d && s.rows.slice(0, n - 1).every((r, i) => r.slice(0, n - 1) === old.rows[i]) && !s.rows.includes(s.d) && s.d === flipped(s.rows);
  old = s;
}
check('absorbing d four times: d becomes the new row, the old table is kept, and the new d escapes each time', grew && s.N === 10);
await page.click('#absorb'); await settle(page, 30);
check('a full list (N = 10) refuses another row and says so', (await state()).N === 10 && (await page.textContent('#toast')).includes('10'));
await pick('absorb'); s = await seek(7);
check('ABSORB card: seven rows, the seventh is the escaped string of the first six', s.N === 7 && s.rows[6].slice(0, 6) === flipped(s.rows.slice(0, 6).map((r) => r.slice(0, 6))) && !s.rows.includes(s.d));

/* ---------- polygon and Taylor ---------- */
await pick('zu'); s = await state();
check('ZU-24576: the last step has 24576 sides', s.scene === 'poly' && s.step === 12 && s.n === 24576);
let gapErr = 0, mono = true, prev = Infinity, quarter = 0;
for (let k = 0; k <= 12; k++) {
  s = await seek(k); const n = 6 * 2 ** k, exact = 2 * Math.sin(Math.PI / (2 * n)) ** 2;
  gapErr = Math.max(gapErr, rel(s.gap, exact)); mono = mono && s.gap > 0 && s.gap < prev && s.n === n;
  if (k > 2) quarter = Math.max(quarter, Math.abs(s.gap / prev - 0.25)); prev = s.gap;
}
check('the gap is 1 − cos(π/n) for n = 6 · 2ᵏ, k = 0 … 12', gapErr < 1e-12, `max relative error ${gapErr}`);
check('the gap shrinks at every doubling and stays positive', mono);
check('each doubling shrinks it to about a quarter', quarter < 0.01, `max deviation ${quarter}`);
s = await seek(4);
check('step 4 is the 96-gon, whose half-perimeter 3.1410… is Liu Hui\'s area of the 192-gon', s.n === 96 && (await page.textContent('#ro2')).startsWith('3.1410'));
s = await seek(5);
check('step 5 is the 192-gon', s.n === 192 && (await page.textContent('#ro2')).startsWith('3.1414'));
check('the key readout says the gap is positive', (await page.textContent('#roKey')).includes('> 0'));
const tay = await page.evaluate(() => { const out = []; for (const th of [0.2, 1, 2, 3]) for (let m = 1; m <= 10; m++) { const t = window.ESCAPE_DEBUG.taylor(th, m); out.push([th, m, t.actual, t.lagrange, t.bound]); } return out; });
let tOk = true, tIndep = 0;
for (const [th, m, actual, lagrange, bound] of tay) {
  let sum = 0; for (let j = 0; j < m; j++) { let term = 1; for (let i = 1; i <= 2 * j; i++) term *= th / i; sum += (j % 2 ? -1 : 1) * term; }
  let b = 1; for (let i = 1; i <= 2 * m; i++) b *= th / i;
  tIndep = Math.max(tIndep, Math.abs(actual - Math.abs(Math.cos(th) - sum)), rel(lagrange, b), rel(bound, b * Math.exp(th)));
  tOk = tOk && actual <= bound + 4e-16;   // the remainder itself is only known to a few ulps of cos θ
}
check('the Taylor remainder never exceeds the verified bound θ²ᵐ/(2m)!·e^θ (40 cases)', tOk);
check('remainder and bound agree with an independent computation', tIndep < 1e-12, `max error ${tIndep}`);
await setRange('tpoint', 2.5);
check('the Taylor angle slider drives the second plot', (await page.textContent('#pBMeta')).includes('2.50'));

/* ---------- cosine ---------- */
await pick('dottie'); s = await seek(0);
check('COSINE card starts the iteration at x₀ = 0 with the following camera', s.scene === 'cos' && s.x0 === 0 && s.zoom === 'follow');
let x = 0, orbitErr = 0, positive = true, shrink = true, lastRes = Infinity;
for (let k = 0; k <= 40; k++) {
  s = await seek(k); orbitErr = Math.max(orbitErr, Math.abs(s.xk - x));
  const res = Math.abs(Math.cos(x) - x); positive = positive && res > 0; shrink = shrink && res < lastRes; lastRes = res; x = Math.cos(x);
}
check('the orbit matches an independent iteration for 40 steps', orbitErr < 1e-15, `max error ${orbitErr}`);
check('the residual |cos xₖ − xₖ| shrinks at every step and is still positive at step 40', positive && shrink, `last ${lastRes}`);
check('x* is the fixed point to machine precision', Math.abs(Math.cos(s.xstar) - s.xstar) < 1e-15 && Math.abs(s.xstar - 0.7390851332151607) < 1e-15);
check('the error factor readout is near sin x*', Math.abs(parseFloat(await page.textContent('#ro3')) - Math.sin(s.xstar)) < 0.01);
await pick('far'); s = await state();
check('FAR-START uses x₀ = 3 and the whole-path camera', s.x0 === 3 && s.zoom === 'whole');
s = await seek(40);
check('from x₀ = 3 the orbit heads for the same x*', Math.abs(s.xk - s.xstar) < 1e-6 && Math.abs(s.xk - s.xstar) > 0);
await page.click('#zoomChips [data-zoom="follow"]'); check('the camera chips switch the view', (await state()).zoom === 'follow');

/* ---------- primes ---------- */
await pick('thirteen'); s = await state();
check('30031 card: Q = 2·3·5·7·11·13 + 1 = 30031 = 59 × 509', s.scene === 'prime' && s.step === 6 && s.euclid.Q === 30031 && s.euclid.factors.join('×') === '59×509');
const LIST = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const isPrime = (n) => { if (n < 2n) return false; for (let p = 2n; p * p <= n; p++) if (n % p === 0n) return false; return true; };
let eOk = true, euler = true, prevGap = Infinity;
for (let k = 0; k <= 12; k++) {
  s = await seek(k); const e = s.euclid, prod = LIST.slice(0, k).reduce((a, p) => a * BigInt(p), 1n), Q = prod + 1n;
  eOk = eOk && BigInt(e.Q) === Q && e.factors.reduce((a, f) => a * BigInt(f), 1n) === Q && e.factors.every((f) => isPrime(BigInt(f)) && !LIST.slice(0, k).includes(f))
    && LIST.slice(0, k).every((p) => Q % BigInt(p) === 1n) && e.factors[0] === Math.min(...e.factors);
  const product = LIST.slice(0, k).reduce((a, p) => a / (1 - 1 / (p * p)), 1), g = Math.PI ** 2 / 6 - product;
  euler = euler && rel(e.euler, product) < 1e-14 && g > 0 && g < prevGap; prevGap = g;
}
check('for k = 0 … 12: Q = p₁⋯pₖ + 1 leaves remainder 1 on every listed prime and factors into primes off the list', eOk);
check('the finite Euler product rises towards π²/6 and stays below it', euler, `last gap ${prevGap}`);
s = await seek(0);
check('with an empty list Q = 2', s.euclid.Q === 2 && s.euclid.factors.join() === '2');
check('the key readout names the least prime factor', (await page.textContent('#roKey')).trim().startsWith('2'));

/* ---------- scenes, rail, keyboard ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['2', 'poly'], ['3', 'cos'], ['4', 'prime'], ['1', 'diag']]) { await page.keyboard.press(key); check(`key ${key} opens the ${sc} scene`, (await state()).scene === sc); }
const vis = await page.evaluate(() => [...document.querySelectorAll('[data-scenes]')].map((el) => [el.dataset.scenes, !el.hidden]));
check('only the controls and evidence of the current scene are shown', vis.every(([sc, shown]) => shown === sc.split(' ').includes('diag')));
await scene('prime'); s = await seek(3);
await page.locator('body').click({ position: { x: 5, y: 5 } });   // keys act on the page, not on the focused chip
await page.keyboard.press('ArrowRight'); check('→ adds one prime', (await state()).step === 4);
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('Home'); check('Home goes back to step 0', (await state()).step === 0);
await page.keyboard.press('End'); check('End goes to the last step', (await state()).step === 12);
await page.keyboard.press('Home'); await page.keyboard.press('Space'); await page.waitForTimeout(900); s = await state();
check('Space plays the scene forward', s.playing && s.t > 0);
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the pills follow the scene', (await page.textContent('#pillScene strong')) === 'PRIMES');
await scene('cos'); check('the scene chips switch scenes and reset the rail length', (await state()).max === 40);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
