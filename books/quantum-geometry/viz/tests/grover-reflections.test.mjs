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

// opening card N = 8; its states also show the two mirrors of the first step
let s = await state();
check('opens on N = 8 at step 2', s.preset === 'eight' && close(s.N, 8, 1e-9) && s.n === 2 && s.phase === 0);
let ag = agree(s, 8);
check('N = 8: every state and mirror image matches the 8-dimensional oracle + diffusion run, which never leaves the plane', ag.worst < 1e-12 && ag.off < 1e-12, JSON.stringify(ag));
check('two mirrors: mirror 1 flips W and keeps B; mirror 2 brings the arrow 2θ ≈ 41.41° above the start', close(s.mids[0][0], s.states[0][0], 1e-12) && close(s.mids[0][1], -s.states[0][1], 1e-12)
  && close((Math.atan2(s.states[1][1], s.states[1][0]) - Math.atan2(s.states[0][1], s.states[0][0])) / DEG, 2 * Math.asin(1 / Math.sqrt(8)) / DEG, 1e-9) && close(2 * s.theta / DEG, 41.4096, 1e-4));
check('two mirrors: the cyan shadow grows from 0.354 to 0.884 in the first step', close(s.states[0][1], 1 / Math.sqrt(8), 1e-12) && close(s.states[1][1], 5 / Math.sqrt(32), 1e-12));
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
// past the first peak the success oscillates: the N = 8 rail runs on to step 5, where it climbs back
const r85 = run(8, 5);
check('N = 8: the rail runs to step 5', s.nMax === 5 && s.max === 5);
await seek(4); s = await state();
check('N = 8, step 4: the success nearly vanishes, 25/2048 = 0.01220703125 (8-dimensional run)', s.n === 4 && close(s.success, r85.states[4][0] ** 2, 1e-12) && close(s.success, 0.01220703125, 1e-12), String(s.success));
await seek(5); s = await state();
check('N = 8, step 5: the success climbs back to 4489/8192 = 0.5479736328125 (8-dimensional run)', s.n === 5 && close(s.success, r85.states[5][0] ** 2, 1e-12) && close(s.success, 0.5479736328125, 1e-12) && s.success > 40 * s.probs[4], String(s.success));
const overNote = (await page.textContent('#roNote')).trim();
check('N = 8, step 5: the note calls step 2 the first peak and says further iterations oscillate', overNote.includes('转过了头') && overNote.includes('第一个峰在第 2 步') && overNote.includes('继续迭代，成功概率会振荡'), overNote);
check('the readout and the strip call step 2 the first peak, not the best of all steps', s.best === 2 && (await page.textContent('#ro')).includes('第一个峰的步数与成功概率') && (await page.textContent('#plotTitle')).includes('第一个峰'));
const drawerZh = await page.textContent('#drawer .sheet > div.zh'), drawerEn = await page.textContent('#drawer .sheet > div.en');
check('the drawer says further iterations oscillate and defines the first peak within the first half turn (both languages)', drawerZh.includes('继续迭代，成功概率会振荡') && drawerZh.includes('第一个半圈 (2n + 1)θ ≤ π 里成功概率最高的那一步')
  && drawerEn.includes('Further iterations make the success probability oscillate') && drawerEn.includes('the highest success within the first half turn, (2n + 1)θ ≤ π'));

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

/* ---------- the first peak over the whole range of θ the reader can drag to (0.5° … 80°) ---------- */
// Independent of the page's search over n: after n steps the arrow sits at the angle (2n + 1)θ, and sin² of an angle
// in [0, π] is largest where the angle is nearest the vertical π/2. As (2n + 1)θ − π/2 = 2θ(n − x) with
// x = (π/(2θ) − 1)/2, the first peak is the whole number nearest x, the earlier one on an exact tie (x a half-integer).
const TMIN = 0.5 * DEG, TMAX = 80 * DEG;
const peakX = (th) => (PI / (2 * th) - 1) / 2;
const nearest = (th) => { const x = peakX(th), lo = Math.floor(x); return x - lo > 0.5 + 1e-9 ? lo + 1 : lo; };
const tieGap = (th) => { const x = peakX(th); return Math.abs(x - Math.floor(x) - 0.5); };   // 0 on an exact tie
// the steps drawn: the usual span, ceil(π/(2θ)) held to 3 … 52, lengthened only to reach one step past the first peak
const usual = (th) => Math.min(52, Math.max(3, Math.ceil(PI / (2 * th))));
const spans = (ths) => page.evaluate((ts) => ts.map((t) => window.GROVER_DEBUG.span(t)), ths);

const grid = []; for (let i = 0; i <= 3180; i++) grid.push(TMIN + (TMAX - TMIN) * i / 3180);
const gridSpans = await spans(grid);
let skipped = 0; const bad = [];
grid.forEach((th, i) => {
  const { best, nMax } = gridSpans[i];
  if (tieGap(th) < 1e-6 && tieGap(th) > 1e-12) { skipped++; return; }   // a hair from a tie: the ties are checked exactly below
  if (best !== nearest(th) || (2 * best + 1) * th > PI + 1e-12 || best + 1 > nMax || nMax !== Math.max(usual(th), best + 1)) bad.push(`${(th / DEG).toFixed(4)}°: ${best}/${nMax} vs ${nearest(th)}`);
});
check(`θ = 0.5° … 80° (${grid.length - skipped} angles): the first peak is the odd multiple of θ nearest π/2, inside the first half turn, and the steps drawn reach one past it`, bad.length === 0 && skipped <= 3, bad.slice(0, 4).join(' | '));
const ties = []; for (let k = 0; k < 90; k++) ties.push(PI / (4 * (k + 1)));   // (2k + 1)θ and (2k + 3)θ straddle π/2 evenly: 45°, 22.5°, 15°, … 0.5°
const tieSpans = await spans(ties.flatMap((th) => [th, th * (1 + 1e-8), th * (1 - 1e-8)]));
const tieBad = [];
ties.forEach((th, k) => {
  const [at, above, below] = tieSpans.slice(3 * k, 3 * k + 3), lower = th * (1 - 1e-8) >= TMIN;
  if (at.best !== k || above.best !== k || (lower && below.best !== k + 1) || [at, above].concat(lower ? [below] : []).some((sp) => sp.best + 1 > sp.nMax)) tieBad.push(`k = ${k}: ${at.best} ${above.best} ${lower ? below.best : '—'}`);
});
check('every tie θ = 45°/(k + 1), k = 0 … 89: the first peak is step k on the tie and just above it, step k + 1 just below it (inside 0.5° … 80°)', tieBad.length === 0, tieBad.slice(0, 4).join(' | '));
const [capAt, capBelow, atMin, atMax] = await spans([PI / 208, PI / 208 * (1 - 1e-8), TMIN, TMAX]);
check('the old 52-step end, θ = 45°/52: peak 51 within the usual 52 steps; just below it, peak 52 and the rail lengthens to 53', capAt.best === 51 && capAt.nMax === 52 && capBelow.best === 52 && capBelow.nMax === 53, JSON.stringify([capAt, capBelow]));
check('the ends of the drag: 0.5° gives peak 89 and 90 steps drawn, 80° gives peak 0 and the usual 3', atMin.best === 89 && atMin.nMax === 90 && atMax.best === 0 && atMax.nMax === 3, JSON.stringify([atMin, atMax]));
const ordN = []; for (let N = 2; N <= 1024; N++) ordN.push(N);
const ordSpans = await spans(ordN.map((N) => Math.asin(1 / Math.sqrt(N))));
check('N = 2 … 1024 (the slider and the chips): the steps drawn keep their usual span, and the first peak is the nearest odd multiple', ordSpans.every((sp, i) => { const th = Math.asin(1 / Math.sqrt(ordN[i])), g = tieGap(th); return sp.nMax === usual(th) && (g > 1e-12 && g < 1e-6 || sp.best === nearest(th)); }));

/** The steps drawn hold the first peak and the next one, and past 52 steps the bar labels are no denser than at 52. */
const railFits = (s) => s.probs.length === s.nMax + 1 && s.best + 1 <= s.nMax && s.max === s.nMax && s.barTicks[s.barTicks.length - 1] <= s.nMax
  && (s.nMax <= 52 || s.barTicks.every((v, i) => i === 0 || (v - s.barTicks[i - 1]) / (s.nMax + 1.2) >= 5 / 53.2));
/** The small plot: the usual window while N = 2 … 1024, otherwise widened (never clamped) to the power of two past N;
    the plotted point is the current N and its first peak; the labels lie inside the window and stay few. */
const plotFits = (s) => {
  const p = s.plot, [lo, hi] = p.x, N = s.N, inc = (a) => a.every((v, i) => i === 0 || v > a[i - 1]);
  const win = N >= 2 * (1 - 1e-9) && N <= 1024 * (1 + 1e-9) ? lo === 2 && hi === 1024 && p.y[1] === 27
    : N < 2 ? lo === 1 && hi === 1024 && p.y[1] === 27
      : lo === 2 && Number.isInteger(Math.log2(hi)) && hi / 2 < N && N <= hi && p.y[1] >= Math.max(nearest(Math.asin(1 / Math.sqrt(hi))), PI * Math.sqrt(hi) / 4) + 1;
  return win && p.y[0] === 0 && lo <= N && N <= hi && close(p.point[0], N, 1e-9 * N) && p.point[1] === s.best && s.best <= p.y[1]
    && p.xTicks.length >= 3 && p.xTicks.length <= 7 && p.yTicks.length <= 7 && inc(p.xTicks) && inc(p.yTicks)
    && p.xTicks.every((v) => v >= lo && v <= hi) && p.yTicks.every((v) => v >= 0 && v <= p.y[1]);
};
const firstPeakRow = () => page.evaluate(() => { const d = [...document.querySelectorAll('#ro > div')].find((r) => r.querySelector('dt').textContent.includes('第一个峰')); return d ? d.querySelector('dd').textContent.trim() : ''; });
const plotMeta = async () => (await page.textContent('#plotMeta')).trim();
const setLogN = async (v) => { await page.evaluate((x) => { const el = document.getElementById('logN'); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); return state(); };
/** Drag the open circle |s⟩ towards the direction b of the plane, releasing as far out on the canvas as it allows. */
const dragTo = async (b) => {
  const [from, dest] = await page.evaluate((a) => {
    const D = window.GROVER_DEBUG, th = D.state.theta, o = D.planePoint(0, 0), unit = D.planePoint(1, 0)[0] - o[0], r = document.getElementById('cv').getBoundingClientRect();
    const c = Math.cos(a), sn = Math.sin(a), L = Math.max(r.left, 0) + 8, R = Math.min(r.right, innerWidth) - 8, T = Math.max(r.top, 0) + 8, B = Math.min(r.bottom, innerHeight) - 8;
    let k = 1.2 * unit;   // the farther out, the finer the angle a pixel sets
    k = Math.max(k, Math.min(c > 1e-9 ? (R - o[0]) / c : Infinity, c < -1e-9 ? (L - o[0]) / c : Infinity, sn > 1e-9 ? (o[1] - T) / sn : Infinity, sn < -1e-9 ? (o[1] - B) / sn : Infinity));
    return [D.planePoint(Math.cos(th), Math.sin(th)), [o[0] + k * c, o[1] - k * sn]];
  }, b);
  await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(dest[0], dest[1], { steps: 8 }); await page.mouse.up();
  return state();
};

// the N slider at both ends
s = await setLogN(1);
check('the N slider at its minimum, N = 2 (θ = 45°): steps 0 and 1 tie at 1/2 and the first peak is the earlier, step 0 (nearest angle; 2-dimensional run)', close(s.N, 2, 1e-9) && s.best === 0 && tieGap(s.theta) < 1e-9 && nearest(s.theta) === 0 && bestBrute(2) === 0 && close(s.probs[0], 0.5, 1e-12) && close(s.probs[1], 0.5, 1e-12), JSON.stringify({ best: s.best, x: peakX(s.theta) }));
check('N = 2: the usual 3 steps, the usual plot window, and the readout, the plot label and the plotted point all say step 0', s.nMax === 3 && railFits(s) && plotFits(s) && (await firstPeakRow()) === '0 · 0.500000' && (await plotMeta()).endsWith('n* = 0'), JSON.stringify(s.plot));
s = await setLogN(10);
check('the N slider at its maximum, N = 1024: first peak 25 (nearest angle; 1024-dimensional run), the usual 51 steps and the usual plot window', close(s.N, 1024, 1e-6) && s.best === 25 && nearest(s.theta) === 25 && bestBrute(1024) === 25 && s.nMax === 51 && railFits(s) && plotFits(s) && s.plot.x[1] === 1024 && s.plot.y[1] === 27
  && (await firstPeakRow()) === `25 · ${s.probs[25].toFixed(6)}` && (await plotMeta()).endsWith('n* = 25'), JSON.stringify(s.plot));

// both sides of the tie at 45°, and the upper end of the drag
s = await dragTo(47 * DEG);
check('dragging θ just above 45° (N < 2): the first peak is step 0, and the plot widens left to show N instead of pinning it at 2', s.theta > PI / 4 && s.N < 2 && s.best === 0 && nearest(s.theta) === 0 && railFits(s) && plotFits(s) && s.plot.x[0] === 1 && s.plot.xTicks[0] === 1 && (await plotMeta()).endsWith('n* = 0'), `θ = ${s.theta / DEG}°, ${JSON.stringify(s.plot)}`);
s = await dragTo(43 * DEG);
check('dragging θ just below 45°: 3θ is now nearer the vertical than θ, step 1 is the first peak, and the plot is back in its usual window', s.theta < PI / 4 && s.best === 1 && nearest(s.theta) === 1 && railFits(s) && plotFits(s) && s.plot.x[0] === 2 && (await firstPeakRow()) === `1 · ${s.probs[1].toFixed(6)}`, `θ = ${s.theta / DEG}°`);
s = await dragTo(85 * DEG);
check('dragging θ past 80° stops at exactly 80° (N ≈ 1.031): first peak 0, the usual 3 steps, the plotted point at the true N', s.theta === TMAX && close(s.N, 1 / Math.sin(TMAX) ** 2, 1e-12) && s.best === 0 && nearest(s.theta) === 0 && s.nMax === 3 && railFits(s) && plotFits(s), `θ = ${s.theta / DEG}°, ${JSON.stringify(s.plot)}`);

// the lower end of the drag: 0.5°, an exact tie between steps 89 and 90, beyond the usual 52 steps
s = await dragTo(-5 * DEG);
const p89 = s.probs[89];
check('dragging θ below 0.5° stops at exactly 0.5°: 179θ = 89.5° and 181θ = 90.5° straddle the vertical evenly and the first peak is the earlier, step 89 (nearest angle)', s.theta === TMIN && tieGap(s.theta) < 1e-9 && nearest(s.theta) === 89 && s.best === 89
  && close(p89, 0.999923847578, 1e-12) && close(p89, Math.cos(TMIN) ** 2, 1e-12) && close(s.probs[90], p89, 1e-12), JSON.stringify({ best: s.best, p89, p90: s.probs[90] }));
check('0.5°: the peak lies past the usual 52 steps (step 52 gives 0.629409522551 < step 53), and the rail and the bars run to step 90, one past it', s.nMax === 90 && s.max === 90 && s.probs.length === 91 && railFits(s) && close(s.probs[52], 0.629409522551, 1e-12) && s.probs[52] < s.probs[53] && 179 * s.theta <= PI, `${s.nMax} ${s.probs[52]}`);
check('0.5°: the bar labels thin to every 10 steps', s.barTicks.join() === '0,10,20,30,40,50,60,70,80,90', s.barTicks.join());
check('0.5°: the small plot widens to N ≤ 16384 and n* ≤ 103 and puts the point at the true N ≈ 13131.6, n* = 89', plotFits(s) && s.plot.x[1] === 16384 && close(s.N, 1 / Math.sin(TMIN) ** 2, 1e-6) && s.plot.point[1] === 89 && s.plot.y[1] > 100, JSON.stringify(s.plot));
check('0.5°: the readout and the plot label name step 89 at 0.999924', (await firstPeakRow()) === '89 · 0.999924' && (await plotMeta()) === `N = ${s.N.toFixed(2)} · n* = 89`, `${await firstPeakRow()} / ${await plotMeta()}`);
const shownTags = () => page.evaluate(() => [...document.querySelectorAll('#stage .tags .tag')].filter((t) => !t.hidden).map((t) => t.textContent).join(' | '));
pt = await page.evaluate(() => window.GROVER_DEBUG.barPoint(52));
await page.mouse.click(pt[0], pt[1]); s = await state();
check('0.5°, clicking bar 52: the bars mark the first peak at n = 89 and the note does not call step 52 past it', s.t === 52 && s.theta === TMIN && (await shownTags()).includes('第一个峰 n = 89') && !(await page.textContent('#roNote')).includes('转过了头'), await shownTags());
pt = await page.evaluate(() => window.GROVER_DEBUG.barPoint(89));
await page.mouse.click(pt[0], pt[1]); s = await state();
const note89 = (await page.textContent('#roNote')).trim();
check('0.5°, clicking bar 89: the arrow is at 89.5°, the key readout is the peak 0.999924 and the note counts 0.500° to the vertical', s.t === 89 && s.n === 89 && s.success === p89 && (await page.textContent('#ro .key')).includes('0.999924') && note89.includes('0.500°') && !note89.includes('转过了头'), note89);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await settle(page); await page.keyboard.press('ArrowRight'); s = await state();
const note90 = (await page.textContent('#roNote')).trim();
check('0.5°, two mirrors on: step 90 at 90.5° has the same success, and the note says the first peak was step 89', s.t === 90 && s.n === 90 && close(s.success, p89, 1e-12) && note90.includes('转过了头') && note90.includes('第一个峰在第 89 步'), note90);
await page.keyboard.press('End'); s = await state();
check('0.5°: End stops at step 90, one past the first peak', s.t === 90 && s.nMax === 90);
await page.evaluate(() => { const el = document.getElementById('now'); el.value = '89'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('0.5°: the rail slider at 89 is back on the first peak', s.t === 89 && s.n === 89 && s.success === p89 && (await page.textContent('#ro .key')).includes('0.999924'));

// above the tie at 0.5°: the rail lengthens only while the peak lies past 52 steps
s = await dragTo(0.67 * DEG);
check('dragging θ to about 0.67°: the first peak (nearest angle) lies past 52 steps and the rail runs exactly one step past it', s.theta > TMIN && s.best === nearest(s.theta) && s.best > 52 && s.nMax === s.best + 1 && railFits(s) && plotFits(s)
  && (await firstPeakRow()) === `${s.best} · ${s.probs[s.best].toFixed(6)}` && (await plotMeta()).endsWith(`n* = ${s.best}`), `θ = ${s.theta / DEG}°, peak ${s.best}, steps ${s.nMax}`);
s = await dragTo(1.2 * DEG);
check('dragging θ to about 1.2° (N > 1024): the first peak fits in the usual 52 steps, which stay as they are, and the plot widens right to show N', s.best === nearest(s.theta) && s.best + 1 <= 52 && s.nMax === 52 && railFits(s) && plotFits(s) && s.plot.x[1] > 1024 && (await plotMeta()).endsWith(`n* = ${s.best}`), `θ = ${s.theta / DEG}°, peak ${s.best}, ${JSON.stringify(s.plot)}`);
const numZh = await page.textContent('#evidence .lean.num span.zh'), numEn = await page.textContent('#evidence .lean.num span.en');
check('the evidence and the drawer: the peak is sought over the whole first half turn, ties go to the earlier step, the rail runs one past it (both languages)', numZh.includes('不受画出的步数限制') && numZh.includes('至少画到第一个峰的下一步') && numEn.includes('however many steps are drawn') && numEn.includes('at least one step past the first peak')
  && drawerZh.includes('两步一样高时取前一步') && drawerEn.includes('the earlier one when two steps tie'));

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
await pick('over'); await seek(5);
const overEn = (await page.textContent('#roNote')).trim();
check('English, N = 8 step 5: the note names step 2 the first peak and says further iterations oscillate', overEn.includes('first peak was step 2') && overEn.includes('Further iterations make the success probability oscillate'), overEn);
check('English: the readout names the first peak', (await page.textContent('#ro')).includes('First peak: step count and success'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
