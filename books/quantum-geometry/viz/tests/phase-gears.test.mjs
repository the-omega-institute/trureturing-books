#!/usr/bin/env node
// Browser regression suite for PHASE//GEARS (books/quantum-geometry/viz/phase-gears/).
//   node books/quantum-geometry/viz/tests/phase-gears.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page sums phase arrows directly. The suite builds the Q × Q unitary QFT matrix F₊ and multiplies the comb state
// by it; checks the gears against the tensor product of one equatorial qubit per binary digit, expanded to a 2^q
// vector and compared with the matrix column; reads orders by brute force over all fractions with denominator ≤ √Q;
// and sums characters over annihilators enumerated by brute force. It reads the page through window.PHASE_DEBUG.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'phase-gears';
const T = await session();
const { check } = T;
const PI = Math.PI, TAU = 2 * PI;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model ---------- */
const cexp = (a) => [Math.cos(a), Math.sin(a)];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
/** The unitary QFT matrix F₊[k][x] = e^{2πikx/Q}/√Q. */
const qft = (Q) => Array.from({ length: Q }, (_, k) => Array.from({ length: Q }, (_, x) => cexp(TAU * k * x / Q).map((v) => v / Math.sqrt(Q))));
/** |α_k|² of F₊ applied to the comb state, keeping only cells ≤ t but normalizing by the whole comb. */
function spectrum(Q, r, x0, t = Q - 1) {
  const cells = []; for (let x = x0; x < Q; x += r) cells.push(x);
  const v = Array.from({ length: Q }, (_, x) => (cells.includes(x) && x <= t ? 1 / Math.sqrt(cells.length) : 0));
  const F = qft(Q);
  return F.map((row) => { let re = 0, im = 0; row.forEach((f, x) => { re += f[0] * v[x]; im += f[1] * v[x]; }); return re * re + im * im; });
}
/** F₊|x⟩ as the tensor product ⊗ (|0⟩ + e^{2πi·2^j x/Q}|1⟩)/√2, first factor = most significant output bit. */
function tensor(Q, x) {
  const q = Math.round(Math.log2(Q)); let v = [[1, 0]];
  for (let i = 0; i < q; i++) { const j = q - 1 - i, ph = cexp(TAU * Math.pow(2, j) * x / Q), out = []; for (const a of v) { out.push(a.map((c) => c / Math.SQRT2)); out.push(cmul(a, ph).map((c) => c / Math.SQRT2)); } v = out; }
  return v; // index = binary k with the first factor as the highest bit
}
/** The fraction s/d with d ≤ √Q closest to k/Q (ties: the smaller d), by brute force. */
function closest(k, Q) { let best = [0, 1], err = Infinity; for (let d = 1; d * d <= Q; d++) for (let s = 0; s <= d; s++) { const e = Math.abs(k / Q - s / d); if (e < err - 1e-12) { err = e; best = [s, d]; } } const g = (a, b) => (b ? g(b, a % b) : a), c = g(best[0], best[1]) || 1; return [best[0] / c, best[1] / c]; }
const worst = (a, b) => a.reduce((m, x, i) => Math.max(m, Math.abs(x - b[i])), 0);

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.PHASE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const plays = () => until(page, () => { const s = window.PHASE_DEBUG.state; return s.playing && s.t > 0; });
// a sweep runs up to 63 cells at Q/6 cells a second, at most 0.1 s per frame: allow for a frame a second
const stopsAt = (n) => until(page, (k) => { const s = window.PHASE_DEBUG.state; return !s.playing && Math.abs(s.t - k) < 1e-9; }, n, 150000);
const seek = async (t) => { await page.evaluate((x) => window.PHASE_DEBUG.seek(x), t); await settle(page); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// ONE CELL: Q = 8, x = 5
let s = await state();
check('opens on ONE CELL: Q = 8, the single cell 5, k = 7, rail at x = 5', s.preset === 'basis' && s.Q === 8 && s.comb.join() === '5' && s.k === 7 && s.cell === 5);
check('ONE CELL: three gears resting at π, π/2, 5π/4 (weights 4, 2, 1)', s.gears.length === 3 && s.gears.map((g) => g.weight).join() === '4,2,1'
  && close(s.gears[0].angle, PI) && close(s.gears[1].angle, PI / 2) && close(s.gears[2].angle, 5 * PI / 4) && s.gears.every((g) => g.lit));
const col = qft(8).map((row) => row[5]), tp = tensor(8, 5);
check('the gears are the QFT: the tensor product of the three equatorial qubits equals column 5 of F₊ (8 × 8 matrix)', worst(col.flat(), tp.flat()) < 1e-12);
let worstGear = 0;
for (let x = 0; x < 8; x++) { await seek(x); const g = (await state()).gears, t8 = tensor(8, x), c8 = qft(8).map((row) => row[x]); worstGear = Math.max(worstGear, worst(t8.flat(), c8.flat()));
  g.forEach((gg) => { const want = (TAU * gg.weight * x / 8) % TAU; worstGear = Math.max(worstGear, Math.abs(gg.angle - want)); }); }
check('every cell x = 0 … 7: the gear angles are 2π·2ʲx/8 and the tensor product matches the matrix', worstGear < 1e-12, String(worstGear));
await seek(5); s = await state();
check('ONE CELL: the chain is one arrow at 3π/4, the sum of the three gear angles', s.chain.length === 2 && close(Math.atan2(s.chain[1][1], s.chain[1][0]), 3 * PI / 4, 1e-12));
check('ONE CELL: the spectrum is flat, every bar 1/8 (matrix)', worst(s.probs, spectrum(8, 8, 5)) < 1e-12 && s.probs.every((p) => close(p, 1 / 8, 1e-12)));
await pick('basis');
check('ONE CELL plays by itself when clicked', await plays());
check('ONE CELL stops at x = 5', await stopsAt(5));

// ONE CELL, the cited still: the chain is one cyan arrow (no ink sum drawn over it), at the angle the caption names
{
  const shot = await T.newPage();
  for (const lang of ['zh', 'en']) {
    await T.goto(BOOK, ID, `?shot=1&lang=${lang}&preset=basis`, shot); await settle(shot);
    const b = await shot.evaluate(() => window.PHASE_DEBUG.state);
    const ang = Math.atan2(b.chain[1][1], b.chain[1][0]), want = (TAU * b.k * b.comb[0] / b.Q) % TAU;
    // the angle as a reduced fraction of π, written the way the caption writes it
    let p = Math.round(ang / PI * b.Q), q = b.Q; const gcd = (u, v) => (v ? gcd(v, u % v) : u); const d = gcd(p, q); p /= d; q /= d;
    const tex = q === 1 ? `${p === 1 ? '' : p}\\pi` : `\\frac{${p === 1 ? '' : p}\\pi}{${q}}`;
    const md = fs.readFileSync(new URL(`../../${lang}/ch15-grover-qft-and-period-finding.md`, import.meta.url), 'utf8');
    const cap = (/::: \{\.viz src="phase-gears" preset="basis"[^}]*\}\n([\s\S]*?)\n:::/.exec(md) || [, ''])[1];
    check(`ONE CELL still (${lang}): one cyan arrow on the chain and no ink sum over it`, b.chain.length === 2 && b.chainInk === false && close(ang, want, 1e-12));
    check(`ONE CELL still (${lang}): the caption names the arrow's angle ${tex} and the flat bars 1/${b.Q}`, cap.includes(tex) && cap.includes(`\\frac{1}{${b.Q}}`) && b.probs.every((x) => close(x, 1 / b.Q, 1e-12)), tex);
  }
  await shot.close();
}

// CANCEL: Q = 16, comb {0, 4, 8, 12}, k = 1
await pick('cancel'); check('CANCEL plays by itself', await plays());
await seek(4); s = await state();
check('CANCEL halfway (x = 4): two arrows 1 and i, bar 1 at 2/64 (matrix on the swept cells)', s.chain.length === 3 && close(s.chain[2][0], 1, 1e-12) && close(s.chain[2][1], 1, 1e-12) && close(s.probs[1], 2 / 64, 1e-12) && worst(s.probs, spectrum(16, 4, 0, 4)) < 1e-12);
await seek(15); s = await state();
check('CANCEL: 1 + i − 1 − i = 0, the chain closes and bar 1 is 0', s.comb.join() === '0,4,8,12' && Math.hypot(...s.sum) < 1e-12 && Math.hypot(...s.chain[4]) < 1e-12 && s.probs[1] < 1e-24);
check('CANCEL: only the slowest gear (weight 1) is lit', s.gears.filter((g) => g.lit).map((g) => g.weight).join() === '1');
// the frozen proposition, by brute force on ZMod 16 with H = {0, 4, 8, 12}
const H = [0, 4, 8, 12], ann = []; for (let k = 0; k < 16; k++) if (H.every((h) => close(Math.cos(TAU * k * h / 16), 1, 1e-12))) ann.push(k);
let chiOk = ann.join() === '0,4,8,12';
for (let x = 0; x < 16; x++) { let re = 0, im = 0; for (const k of ann) { re += Math.cos(TAU * k * x / 16); im += Math.sin(TAU * k * x / 16); } chiOk = chiOk && close(re, H.includes(x) ? 4 : 0, 1e-12) && close(im, 0, 1e-12); }
check('the character sum over annihilator(H) is 4 on H and 0 off H (ZMod 16, brute force)', chiOk);

// PERIOD 4: four equal peaks
await pick('four'); check('PERIOD 4 plays by itself', await plays()); check('PERIOD 4 stops at the last cell', await stopsAt(15)); s = await state();
const sp4 = spectrum(16, 4, 0);
check('PERIOD 4: the spectrum is 1/4 at 0, 4, 8, 12 and 0 elsewhere (16 × 16 matrix)', worst(s.probs, sp4) < 1e-12 && [0, 4, 8, 12].every((k) => close(s.probs[k], 0.25, 1e-12)) && s.probs.filter((p) => p > 1e-12).length === 4);
check('PERIOD 4: k = 4, the four arrows all point right, chain of length 4', close(s.sum[0], 4, 1e-12) && close(s.sum[1], 0, 1e-12));
let worstSweep = 0; for (const t of [0, 3, 7, 11, 14]) { await seek(t); worstSweep = Math.max(worstSweep, worst((await state()).probs, spectrum(16, 4, 0, t))); }
check('during the sweep every bar matches the matrix applied to the swept cells (5 positions)', worstSweep < 1e-12, String(worstSweep));

// READ r: reading the order
await pick('read'); check('READ r plays by itself', await plays()); check('READ r stops at the last cell', await stopsAt(15)); s = await state();
const reads = await page.evaluate(() => [0, 4, 8, 12].map((k) => window.PHASE_DEBUG.readOrder(k)));
check('READ r: 4 → 1/4, 8 → 1/2, 12 → 3/4 (brute-force closest fractions with d ≤ 4)', [4, 8, 12].every((k, i) => { const [a, b] = closest(k, 16); return reads[i + 1].s === a && reads[i + 1].d === b; }) && reads[2].d === 2 && reads[1].d === 4 && reads[3].d === 4);
check('READ r: the peaks are 0, 4, 8, 12 and the reading labels are on the stage', s.peaks.join() === '0,4,8,12' && s.read && (await page.$$eval('.stage .tag', (ts) => ts.filter((t) => !t.hidden && /→/.test(t.textContent)).length)) === 3);
check('READ r: 2⁴ ≡ 1 but 2² ≢ 1 (mod 15): 2 is only a divisor of the order', (2 ** 4) % 15 === 1 && (2 ** 2) % 15 !== 1);

// NOT DIVIDING: Q = 64, r = 6
await pick('leak'); check('NOT DIVIDING plays by itself', await plays()); check('NOT DIVIDING stops at the last cell', await stopsAt(63)); s = await state();
const sp64 = spectrum(64, 6, 0);
check('NOT DIVIDING: the spectrum matches the 64 × 64 matrix, k = 11 at 0.115 and k = 10 at 0.026', worst(s.probs, sp64) < 1e-12 && close(s.probs[11], 0.115, 5e-4) && close(s.probs[10], 0.0258, 5e-4));
const nearest = [0, 1, 2, 3, 4, 5].map((j) => Math.round(j * 64 / 6));
check('NOT DIVIDING: the six integers nearest sQ/r carry 0.80, and no bar is exactly 0 in their neighbourhood', close(nearest.reduce((a, k) => a + sp64[k], 0), 0.8037, 1e-4) && sp64[10] > 1e-3);
const [s11, d11] = closest(11, 64);
check('NOT DIVIDING: k = 11 reads 1/6 (continued fraction and brute force agree)', s.readOrder.s === 1 && s.readOrder.d === 6 && s11 === 1 && d11 === 6);
const pkReads = await page.evaluate((ks) => ks.map((k) => window.PHASE_DEBUG.readOrder(k)), s.peaks);
check('NOT DIVIDING: at every peak the page\'s reading equals the brute-force closest fraction', s.peaks.length >= 6 && s.peaks.every((k, i) => { const [a, b] = closest(k, 64); return pkReads[i].s === a && pkReads[i].d === b; }), JSON.stringify(s.peaks));

// controls
await page.click('#qChips [data-q="32"]'); s = await state();
check('the Q chips: Q = 32 leaves the card and gives five gears', s.Q === 32 && s.gears.length === 5 && s.preset === null);
await setRange('r', 8); await setRange('x0', 3); await setRange('k', 4); s = await state();
check('the sliders: r = 8, x₀ = 3, k = 4 give the comb {3, 11, 19, 27} and the matrix spectrum', s.r === 8 && s.x0 === 3 && s.k === 4 && s.comb.join() === '3,11,19,27' && worst(s.finalProbs, spectrum(32, 8, 3)) < 1e-12);
check('an offset only changes phases: the bar heights equal those of offset 0', worst(s.finalProbs, spectrum(32, 8, 0)) < 1e-12);
let pt = await page.evaluate(() => window.PHASE_DEBUG.barPoint(12));
await page.mouse.click(pt[0], pt[1]); s = await state(); check('clicking bar 12 chooses k = 12', s.k === 12);
pt = await page.evaluate(() => window.PHASE_DEBUG.cellPoint(13));
await page.mouse.click(pt[0], pt[1]); s = await state(); check('clicking cell 13 moves the offset to 13 mod 8 = 5', s.x0 === 5 && s.comb[0] === 5);
const wasRead = s.read; await page.click('#readBtn'); s = await state(); check('the read button toggles the reading', s.read === !wasRead && (await page.getAttribute('#readBtn', 'aria-pressed')) === String(!wasRead));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('k'); s = await state(); check('key K steps to the next frequency', s.k === 13);
await page.keyboard.press('Home'); check('Home goes to x = 0', (await state()).t === 0);
await page.keyboard.press('ArrowRight'); check('→ steps one cell', (await state()).cell === 1);
await page.keyboard.press('End'); check('End goes to the last cell', (await state()).t === 31);
await page.click('#rew'); check('⏮ goes back to x = 0', (await state()).t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.PHASE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

// English
await page.click('[data-lang-set="en"]'); await pick('four'); await seek(15);
check('English: the HUD reads “Q = 16 · period 4 · swept to x = 15”', (await page.textContent('#hudBig')).trim() === 'Q = 16 · period 4 · swept to x = 15');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
