#!/usr/bin/env node
// Browser regression suite for GROVER//REFLECT (books/quantum-geometry/viz/grover-reflections/).
//   node books/quantum-geometry/viz/tests/grover-reflections.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page reflects a 2D arrow in two mirror lines. The suite works in the full N-dimensional space instead: the
// uniform vector of N amplitudes, the oracle I − 2P flipping the sign of the marked item 0, the diffusion 2|s⟩⟨s| − I
// as "twice the mean minus each amplitude"; the plane coordinates are the inner products with W = e₀ and with the
// normalized uniform vector B on the other N − 1 items. It reads the page through window.GROVER_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'grover-reflections';
const T = await session();
const { check } = T;
const PI = Math.PI, DEG = PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model: N amplitudes ---------- */
const oracle = (a) => a.map((x, i) => (i === 0 ? -x : x));
const diffuse = (a) => { const m = a.reduce((s, x) => s + x, 0) / a.length; return a.map((x) => 2 * m - x); };
/** The amplitude vectors after 0 … n whole steps, and the image in the first mirror at each step. */
function run(N, n) {
  let a = Array(N).fill(1 / Math.sqrt(N));
  const states = [a], mids = [];
  for (let k = 0; k < n; k++) { const o = oracle(a); mids.push(o); a = diffuse(o); states.push(a); }
  return { states, mids };
}
/** Coordinates (B, W) in the plane: W = e₀, B = uniform on items 1 … N − 1. */
const plane = (a) => [a.slice(1).reduce((s, x) => s + x, 0) / Math.sqrt(a.length - 1), a[0]];
/** Whatever is left outside the plane (must be 0). */
const offPlane = (a) => { const [b] = plane(a), o = b / Math.sqrt(a.length - 1); return Math.sqrt(a.slice(1).reduce((s, x) => s + (x - o) ** 2, 0)); };
/** The best step count of the first half turn: try every n while the success amplitude a₀ has not turned negative. */
const bestBrute = (N) => { let a = Array(N).fill(1 / Math.sqrt(N)), b = 0, pb = a[0] ** 2, n = 0; for (;;) { a = diffuse(oracle(a)); n++; if (a[0] < -1e-12 || n > 4 * N) break; if (a[0] ** 2 > pb + 1e-12) { pb = a[0] ** 2; b = n; } } return b; };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.GROVER_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const plays = () => until(page, () => { const s = window.GROVER_DEBUG.state; return s.playing && s.t > 0; });
// a card plays up to 12 steps at one rail unit per 10 frames at most: allow for a frame a second (VIZ_SLOW_FRAMES=1000)
const stopsAt = (n) => until(page, (k) => { const s = window.GROVER_DEBUG.state; return !s.playing && Math.abs(s.t - k) < 1e-9; }, n, 150000);
const seek = async (t) => { await page.evaluate((x) => window.GROVER_DEBUG.seek(x), t); await settle(page); };
const agree = (s, N) => {
  const { states, mids } = run(N, s.nMax);
  let worst = 0, off = 0;
  states.forEach((a, n) => { const q = plane(a); worst = Math.max(worst, Math.abs(q[0] - s.states[n][0]), Math.abs(q[1] - s.states[n][1]), Math.abs(a[0] ** 2 - s.probs[n])); off = Math.max(off, offPlane(a)); });
  mids.forEach((a, n) => { const q = plane(a); worst = Math.max(worst, Math.abs(q[0] - s.mids[n][0]), Math.abs(q[1] - s.mids[n][1])); });
  return { worst, off };
};

// TWO MIRRORS: N = 8, one step
let s = await state();
check('opens on TWO MIRRORS at N = 8, step 1', s.preset === 'mirrors' && close(s.N, 8, 1e-9) && s.n === 1 && s.phase === 0);
let ag = agree(s, 8);
check('N = 8: every state and mirror image matches the 8-dimensional oracle + diffusion run, which never leaves the plane', ag.worst < 1e-12 && ag.off < 1e-12, JSON.stringify(ag));
check('TWO MIRRORS: mirror 1 flips W and keeps B; mirror 2 brings the arrow 2θ ≈ 41.41° above the start', close(s.mids[0][0], s.states[0][0], 1e-12) && close(s.mids[0][1], -s.states[0][1], 1e-12)
  && close((Math.atan2(s.states[1][1], s.states[1][0]) - Math.atan2(s.states[0][1], s.states[0][0])) / DEG, 2 * Math.asin(1 / Math.sqrt(8)) / DEG, 1e-9) && close(2 * s.theta / DEG, 41.4096, 1e-4));
check('TWO MIRRORS: the cyan shadow grows from 0.354 to 0.884', close(s.states[0][1], 1 / Math.sqrt(8), 1e-12) && close(s.states[1][1], 5 / Math.sqrt(32), 1e-12));
await pick('mirrors');
check('TWO MIRRORS plays by itself when clicked', await plays());
check('TWO MIRRORS stops at step 1 by itself', await stopsAt(1));
await seek(0.5); s = await state();
check('half a step is the image in mirror 1: the arrow at (cos θ, −sin θ)', s.phase === 1 && close(s.arrow[0], Math.cos(s.theta), 1e-12) && close(s.arrow[1], -Math.sin(s.theta), 1e-12));
check('the HUD names the mirror', (await page.textContent('#hudBig')).includes('镜 1 之后'));

// N = 4: exact in one step
await pick('four'); check('N = 4 plays by itself', await plays()); check('N = 4 stops at step 1', await stopsAt(1)); s = await state();
const r4 = run(4, 1);
check('N = 4: θ = 30°, and after one step the 4-dimensional state is exactly |0⟩ (success 1)', close(s.theta, PI / 6, 1e-12) && close(r4.states[1][0], 1, 1e-12) && close(s.success, 1, 1e-12) && close(s.arrow[0], 0, 1e-12));
check('N = 4: the key readout prints 1.000000', (await page.textContent('#ro .key')).includes('1.000000'));

// N = 8: 25/32 and 121/128
await pick('eight'); check('N = 8 plays by itself', await plays()); check('N = 8 stops at step 2', await stopsAt(2)); s = await state();
check('N = 8: success 25/32 after step 1 and 121/128 after step 2', close(s.probs[1], 25 / 32, 1e-12) && close(s.probs[2], 121 / 128, 1e-12) && close(s.success, 121 / 128, 1e-12));
check('N = 8: the arrow sits at 5θ ≈ 103.5° with a failure amplitude −0.234', close(Math.atan2(s.arrow[1], s.arrow[0]) / DEG, 5 * Math.asin(1 / Math.sqrt(8)) / DEG, 1e-9) && close(s.arrow[0], -Math.sqrt(7 / 128), 1e-12));

// OVERSHOOT: step 3
await pick('over'); check('OVERSHOOT plays by itself', await plays()); check('OVERSHOOT stops at step 3', await stopsAt(3)); s = await state();
const r8 = run(8, 3);
check('OVERSHOOT: success drops to 0.330 at step 3; step 2 is the best', close(s.success, r8.states[3][0] ** 2, 1e-12) && close(s.success, 0.3301, 1e-4) && s.best === 2 && bestBrute(8) === 2);
check('OVERSHOOT: the note says the arrow is past the target', (await page.textContent('#roNote')).includes('转过了头'));

// ROOT N: N = 256, twelve steps
await pick('sqrt'); check('ROOT N plays by itself', await plays()); check('ROOT N stops at step 12', await stopsAt(12)); s = await state();
ag = agree(s, 256);
check('N = 256: every state matches the 256-dimensional run', ag.worst < 1e-11 && ag.off < 1e-11, JSON.stringify(ag));
check('N = 256: twelve steps reach success 0.99995, and 12 is the best step count (brute force)', s.n === 12 && close(s.success, 0.99995, 5e-6) && s.best === 12 && bestBrute(256) === 12 && Math.abs(PI * 16 / 4 - 12) < 1);
const sample = [2, 3, 5, 10, 16, 37, 64, 100, 300, 1024];
const bestPage = await page.evaluate((ns) => ns.map((n) => window.GROVER_DEBUG.bestOf(n)), sample);
check('the strip: the page\'s best step count equals the brute-force one for N = 2 … 1024 (10 values)', bestPage.every((b, i) => b === bestBrute(sample[i])), JSON.stringify(bestPage));

// controls
await page.click('#nChips [data-n="16"]'); s = await state();
ag = agree(s, 16);
check('the N chips: N = 16 leaves the card, restarts at step 0 and matches the 16-dimensional run', close(s.N, 16, 1e-9) && s.preset === null && s.t === 0 && ag.worst < 1e-12);
await page.evaluate(() => { const el = document.getElementById('logN'); el.value = '6'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('the N slider: 2⁶ gives N = 64', close(s.N, 64, 1e-9) && close(s.theta, Math.asin(1 / 8), 1e-12));
await page.click('#nChips [data-n="8"]'); await settle(page);
let pt = await page.evaluate(() => window.GROVER_DEBUG.barPoint(2));
await page.mouse.click(pt[0], pt[1]); s = await state();
check('clicking bar 2 jumps to step 2', s.t === 2 && s.n === 2);
pt = await page.evaluate(() => { const th = window.GROVER_DEBUG.state.theta; return window.GROVER_DEBUG.planePoint(Math.cos(th), Math.sin(th)); });
const to = await page.evaluate(() => window.GROVER_DEBUG.planePoint(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6)));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 4 }); await page.mouse.up(); s = await state();
check('dragging the initial state to 30° sets θ = 30° (N = 4)', Math.abs(s.theta - PI / 6) < 0.01 && Math.abs(s.N - 4) < 0.1, String(s.theta / DEG));

// rail and keyboard
await page.click('#nChips [data-n="8"]'); await settle(page);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); s = await state();
check('→ applies one mirror (half a step)', s.t === 0.5 && s.phase === 1);
await page.keyboard.press('ArrowRight'); s = await state();
check('→ again applies the second mirror: step 1', s.t === 1 && s.n === 1 && close(s.success, 25 / 32, 1e-12));
await page.keyboard.press('End'); s = await state(); check('End goes to the last step', s.t === s.nMax);
await page.click('#rew'); check('⏮ goes back to step 0', (await state()).t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.GROVER_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

// English
await page.click('[data-lang-set="en"]'); await pick('four'); await seek(1);
check('English: the HUD reads “N = 4 · step 1”', (await page.textContent('#hudBig')).trim() === 'N = 4 · step 1');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
