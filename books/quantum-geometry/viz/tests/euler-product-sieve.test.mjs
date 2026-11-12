#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/euler-product-sieve (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/euler-product-sieve.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery come the checks of this page. Every claim is recomputed here independently: primes by
// trial division, ζ(s) from the alternating series accelerated by the Cohen–Villegas–Zagier weights (not
// Euler–Maclaurin), the product both as a product and as a sum over the integers it expands into, membership in the
// expansion by dividing out the listed primes, and the remainder as a brute-force sum over the other integers.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'euler-product-sieve');

const page = await T.goto('quantum-geometry', 'euler-product-sieve', '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.EULER_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.EULER_DEBUG.seek(v), t); return state(); };
const setS = async (v) => { await page.evaluate((x) => window.EULER_DEBUG.setS(x), v); return state(); };
/** Click a card. It starts playing toward its K; `full` waits for the playback to stop by itself, otherwise the suite
    checks where it is heading and jumps there (long playback crawls on a slow runner). */
const heading = {};
async function card(id, full = false) {
  await page.click(`[data-preset="${id}"]`); await settle(page);
  const st = await page.evaluate(() => window.EULER_DEBUG.state);
  heading[id] = st.playing ? st.target : st.K;
  if (full) await until(page, () => { const d = window.EULER_DEBUG.state; return !d.playing && d.target === null; });
  else if (st.playing) await page.evaluate((k) => window.EULER_DEBUG.seek(k), st.target);
  const s = await state();
  check(`${id}: the card starts on itself and heads for K = ${heading[id]}`, s.preset === id && heading[id] === s.K, JSON.stringify([s.preset, heading[id], s.K]));
  return s;
}

/* ---------- independent arithmetic ---------- */
const isPrime = (n) => { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; };
const PRIMES = []; for (let n = 2; PRIMES.length < 40; n++) if (isPrime(n)) PRIMES.push(n);
/** ζ(s) = η(s) / (1 − 2^{1−s}), η summed with the Cohen–Villegas–Zagier acceleration. */
function zeta(s) {
  const n = 60; let d = Math.pow(3 + Math.sqrt(8), n); d = (d + 1 / d) / 2;
  let b = -1, c = -d, acc = 0;
  for (let k = 0; k < n; k++) { c = b - c; acc += c * Math.pow(k + 1, -s); b = (k + n) * (k - n) * b / ((k + 0.5) * (k + 1)); }
  return acc / d / (1 - Math.pow(2, 1 - s));
}
const product = (K, s) => PRIMES.slice(0, K).reduce((a, p) => a * (1 / (1 - Math.pow(p, -s))), 1);
/** n is in the expansion of the product over the first K primes: divide those primes out and see whether 1 is left. */
const smooth = (n, K) => { for (const p of PRIMES.slice(0, K)) while (n % p === 0) n /= p; return n === 1; };
/** Σ n^−s over the integers n ≤ X that are smooth (sum side of the product). */
const smoothSum = (K, s, X) => { let a = 0; for (let n = 1; n <= X; n++) if (smooth(n, K)) a += Math.pow(n, -s); return a; };
/** Σ n^−s over the integers n ≤ X that are not smooth (the remainder, without its tail beyond X). */
const roughSum = (K, s, X) => { let a = 0; for (let n = 2; n <= X; n++) if (!smooth(n, K)) a += Math.pow(n, -s); return a; };
const near = (a, b, tol) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(b));

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === 'euler-product-sieve');
check('opens on the UP-TO-5 card, paused, K = 3, s = 2', s.preset === 'five' && s.K === 3 && Math.abs(s.s - 2) < 1e-9 && !s.playing, JSON.stringify([s.preset, s.K, s.s]));

/* ---------- ζ and the products against independent computations ---------- */
let worst = 0;
for (const x of [1.05, 1.1, 1.3, 1.5, 2, 2.7, 3, 4]) { const p = await page.evaluate((v) => window.EULER_DEBUG.zeta(v), x); worst = Math.max(worst, Math.abs(p - zeta(x)) / zeta(x)); }
check('ζ(s) on the page agrees with the accelerated alternating series to 1e-10', worst < 1e-10, `${worst}`);
check('ζ(2) = π²/6 and ζ(4) = π⁴/90 (independent series)', near(zeta(2), Math.PI ** 2 / 6, 1e-12) && near(zeta(4), Math.PI ** 4 / 90, 1e-12));
const eps = 1e-4, res = await page.evaluate((e) => e * window.EULER_DEBUG.zeta(1 + e), eps);
check('the residue: (s − 1)·ζ(s) is within 1e-3 of 1 at s = 1 + 10⁻⁴', Math.abs(res - 1) < 1e-3 && Math.abs(eps * zeta(1 + eps) - 1) < 1e-3, `${res}`);

/* ---------- UP-TO-5: the worked example of the chapter ---------- */
s = await card('five', true);
check('UP-TO-5 clicked: K = 3 (2, 3, 5) and the sweep ends at s = 1.3', s.K === 3 && JSON.stringify(s.primes) === '[2,3,5]' && Math.abs(s.s - 1.3) < 1e-9);
s = await setS(2);
check('UP-TO-5 at s = 2 (its still): K = 3', s.K === 3 && Math.abs(s.s - 2) < 1e-9);
check('UP-TO-5: the product is 25/16 = 1.5625', Math.abs(s.product - 25 / 16) < 1e-12, `${s.product}`);
check('UP-TO-5: the product equals the sum over 5-smooth integers (exponent expansion)', (() => {
  let a = 0; for (let i = 0; i < 60; i++) for (let j = 0; j < 40; j++) for (let k = 0; k < 30; k++) a += Math.pow(2, -2 * i) * Math.pow(3, -2 * j) * Math.pow(5, -2 * k);
  return Math.abs(a - s.product) < 1e-12;
})());
check('UP-TO-5: the gap is 0.082434 (to six places)', Math.abs(s.gap - (zeta(2) - 25 / 16)) < 1e-10 && s.gap.toFixed(6) === '0.082434', `${s.gap}`);
const rough5 = roughSum(3, 2, 200000);
check('UP-TO-5: the gap is the sum of n⁻² over the integers with a prime factor above 5 (tail < 5·10⁻⁶)', s.gap - rough5 > 0 && s.gap - rough5 < 5e-6, `${s.gap - rough5}`);
check('UP-TO-5: cyan cells are exactly the 5-smooth integers ≤ 96', s.cyan.every((c, i) => c === smooth(i + 1, 3)));
check('UP-TO-5: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 are cyan and 7 is the first magenta', [1, 2, 3, 4, 5, 6, 8, 9, 10, 12].every((n) => s.cyan[n - 1]) && s.cyan.indexOf(false) === 6 && s.next === 7);
check('UP-TO-5: the magnifier stacks 7, 11, 13, 14 … from the bottom, each n⁻²', s.slices.slice(0, 4).map((q) => q[0]).join() === '7,11,13,14' && s.slices.every(([n, w]) => !smooth(n, 3) && Math.abs(w - n ** -2) < 1e-15));
check('UP-TO-5: the slices are the magenta integers in order, and slices + rest = gap', s.slices.every(([n], i) => i === 0 || n > s.slices[i - 1][0]) && (() => { const ns = s.slices.map((q) => q[0]); let k = 0; for (let n = 2; n <= ns[ns.length - 1]; n++) if (!smooth(n, 3) && ns[k++] !== n) return false; return true; })() && Math.abs(s.slices.reduce((a, q) => a + q[1], 0) + s.rest - s.gap) < 1e-12);
check('UP-TO-5: the HUD shows the product, ζ and the gap', /1\.5625/.test(s.hud) && /1\.6449/.test(s.hud) && /0\.0824/.test(s.hud), s.hud);

/* ---------- ONLY-TWO ---------- */
s = await card('two');
check('ONLY-TWO: K = 1, product 4/3 at s = 2', s.K === 1 && Math.abs(s.product - 4 / 3) < 1e-12);
check('ONLY-TWO: the product is the geometric series 1 + 4⁻¹ + 4⁻² + …', Math.abs(smoothSum(1, 2, 1 << 26) - s.product) < 1e-12);
check('ONLY-TWO: the cyan cells are the powers of 2 and the first magenta is 3', s.cyan.map((c, i) => (c ? i + 1 : 0)).filter(Boolean).join() === '1,2,4,8,16,32,64' && s.next === 3);

/* ---------- NEAR-ONE ---------- */
s = await card('near');
check('NEAR-ONE: 11 primes up to 31 at s = 1.1', s.K === 11 && s.primes[10] === 31 && Math.abs(s.s - 1.1) < 1e-9);
check('NEAR-ONE: product 4.93 against ζ 10.58: the gap is larger than the product', s.product.toFixed(2) === '4.93' && zeta(1.1).toFixed(2) === '10.58' && near(s.product, product(11, 1.1), 1e-12) && s.gap > s.product);
check('NEAR-ONE: at s = 1 the product stops at 6.54 = ∏ p/(p − 1)', near(s.productAt1, PRIMES.slice(0, 11).reduce((a, p) => a * p / (p - 1), 1), 1e-12) && s.productAt1.toFixed(2) === '6.54');
check('NEAR-ONE: 1% is out of reach of the sieve’s primes at s = 1.1', s.need === null && s.sieved === 148933);
let wide = true, last = 0;
for (const x of [3, 2, 1.6, 1.3, 1.15, 1.06]) { const g = zeta(x) - product(11, x); if (g <= last) wide = false; last = g; }
check('NEAR-ONE: with 11 primes the gap widens steadily as s goes down to 1 (independent)', wide);

/* ---------- UP-TO-31 and UP-TO-97 ---------- */
s = await card('thirtyone');
check('UP-TO-31: K = 11 at s = 2, gap 0.0102, first magenta 37', s.K === 11 && s.gap.toFixed(4) === '0.0102' && near(s.gap, zeta(2) - product(11, 2), 1e-9) && s.cyan.indexOf(false) === 36 && s.next === 37);
check('UP-TO-31: the gap still exceeds 37⁻²', s.gap > 37 ** -2 && s.slices[0][0] === 37);
s = await card('all');
check('UP-TO-97: K = 25 up to 97 at s = 1.2, every cell 1 … 96 cyan', s.K === 25 && s.primes[24] === 97 && s.cyan.every(Boolean) && Math.abs(s.s - 1.2) < 1e-9);
check('UP-TO-97 at s = 1.2: product 4.37, ζ 5.59, gap 1.23 (more than a fifth of ζ), lowest slice 101⁻ˢ', s.product.toFixed(2) === '4.37' && zeta(1.2).toFixed(2) === '5.59'
  && s.gap.toFixed(2) === '1.23' && near(s.gap, zeta(1.2) - product(25, 1.2), 1e-8) && s.gap / zeta(1.2) > 0.2 && s.slices[0][0] === 101 && s.gap > 101 ** -1.2, `${s.product} ${s.gap}`);
s = await setS(2);
check('UP-TO-97 at s = 2 (the figure ch22-euler-staircase): the gap is 0.0030', s.gap.toFixed(4) === '0.0030' && near(s.gap, zeta(2) - product(25, 2), 1e-8));

/* ---------- UP-TO-5 clicked: the sweep of the remainder floor p_{K+1}^−s ---------- */
await page.click('[data-preset="five"]');
check('UP-TO-5 clicked: the amber line sweeps down to s = 1.3', await until(page, () => Math.abs(window.EULER_DEBUG.state.s - 1.3) < 1e-9));
s = await state();
check('UP-TO-5 sweep: K = 3 throughout, the lowest slice is 7⁻ˢ', s.K === 3 && s.slices[0][0] === 7 && Math.abs(s.slices[0][1] - 7 ** -1.3) < 1e-14);
let floorOk = true;
for (const x of [4, 3.3, 2.5, 2, 1.7, 1.5, 1.3, 1.1, 1.05]) { const r = await setS(x); if (!(r.gap > r.floor && Math.abs(r.floor - 7 ** -x) < 1e-14 && near(r.gap, zeta(x) - product(3, x), 1e-9))) floorOk = false; }
check('UP-TO-5 sweep: at every s tried, gap = ζ − product > 7⁻ˢ (independent values)', floorOk);
s = await setS(1.5);
check('UP-TO-5 sweep: at s = 1.5 the gap matches the sum over non-5-smooth n (tail bound ∫ x⁻¹·⁵ beyond 10⁶)', (() => { const r = roughSum(3, 1.5, 1000000); const tail = 2 / Math.sqrt(1e6); return s.gap >= r && s.gap - r <= tail; })());

/* ---------- primes needed for 1% ---------- */
s = await setS(2);
const needAt = (x) => { const zz = zeta(x); let p = 1; for (let k = 1; k <= PRIMES.length; k++) { p = product(k, x); if (p >= 0.99 * zz) return k; } return null; };
check('primes needed for 1% at s = 2 is 9 (p ≤ 23), recomputed here', s.need === 9 && needAt(2) === 9);
s = await setS(3); check('primes needed for 1% at s = 3 is 3', s.need === 3 && needAt(3) === 3);
s = await setS(1.7); check('primes needed for 1% at s = 1.7 is 25', s.need === 25 && needAt(1.7) === 25);

/* ---------- controls ---------- */
await page.evaluate(() => { const r = document.getElementById('sval'); r.value = '2.5'; r.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the s slider sets s and leaves the card', Math.abs(s.s - 2.5) < 1e-9 && s.preset === null);
let pt = await page.evaluate(() => window.EULER_DEBUG.plotPoint(1.6));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down();
pt = await page.evaluate(() => window.EULER_DEBUG.plotPoint(3.2)); await page.mouse.move(pt[0], pt[1]); await page.mouse.up();
s = await state();
check('dragging on the plot moves the amber line to the pointer', Math.abs(s.s - 3.2) < 0.03, `${s.s}`);
s = await seek(2);
pt = await page.evaluate(() => window.EULER_DEBUG.cellAt(77)); await page.mouse.click(pt[0], pt[1]);
s = await state();
check('clicking cell 77 = 7·11 puts 11 on the list (K = 5) and turns it cyan', s.K === 5 && s.cyan[76] && smooth(77, 5));
await page.locator('header.top .tagline').click();
await page.keyboard.press('ArrowRight'); s = await state();
check('→ adds one prime', s.K === 6);
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); s = await state();
check('← drops one prime', s.K === 4);
await page.click('#rew'); s = await state();
check('⏮ empties the list: product 1, every cell but 1 magenta', s.K === 0 && s.product === 1 && s.cyan.filter(Boolean).length === 1 && s.next === 2);
await page.locator('header.top .tagline').click();
await page.keyboard.press('Space');
check('Space plays: primes join the list', await until(page, () => window.EULER_DEBUG.state.K >= 2));
await page.keyboard.press('Space'); s = await state();
check('Space pauses', !s.playing);
let mono = true; let prev = -1;
for (let k = 0; k <= 25; k++) { const r = await seek(k); if (!(r.product > prev) || !(r.gap > r.floor)) mono = false; prev = r.product; }
check('along the rail the product grows with every prime and the gap stays above the next prime’s p⁻ˢ', mono);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
