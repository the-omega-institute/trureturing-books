#!/usr/bin/env node
// Browser regression suite for PHASE//GEARS (books/quantum-geometry/viz/phase-gears/).
//   node books/quantum-geometry/viz/tests/phase-gears.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page sums phase arrows directly. The suite builds the Q × Q unitary QFT matrix F₊ and multiplies the comb state
// by it; checks the gears against the tensor product of one equatorial qubit per binary digit, expanded to a 2^q
// vector and compared with the matrix column; reads orders by brute force over all fractions with denominator ≤ √Q;
// and sums characters over annihilators enumerated by brute force. It reads the page through window.PHASE_DEBUG.
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
/** The complex amplitudes α_k of F₊ applied to the whole comb state {x₀ + jr < Q}. */
function amplitudes(Q, r, x0) {
  const cells = []; for (let x = x0; x < Q; x += r) cells.push(x);
  const F = qft(Q), a = 1 / Math.sqrt(cells.length);
  return F.map((row) => cells.reduce((s, x) => [s[0] + row[x][0] * a, s[1] + row[x][1] * a], [0, 0]));
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
check('a complete-coset offset (x₀ = 3 < r = 8) only changes phases: the bar heights equal those of offset 0', worst(s.finalProbs, spectrum(32, 8, 0)) < 1e-12);
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

// the offset slider at Q = 16, r = 4: a complete coset (x₀ < r) against a comb cut short at its start (x₀ ≥ r)
await page.click('#qChips [data-q="16"]'); await setRange('r', 4); await setRange('k', 4);
const offs = {};
for (const x0 of [0, 3, 4]) { await setRange('x0', x0); offs[x0] = { s: await state(), note: (await page.textContent('#roNote')).trim() }; }
const a0 = amplitudes(16, 4, 0), a3 = amplitudes(16, 4, 3), a4 = amplitudes(16, 4, 4);
s = offs[0].s;
check('offset 0 (Q = 16, r = 4): the comb {0, 4, 8, 12}, 1/4 at 0, 4, 8, 12 and 0 elsewhere (16 × 16 matrix)', s.Q === 16 && s.r === 4 && s.x0 === 0 && s.comb.join() === '0,4,8,12'
  && worst(s.finalProbs, spectrum(16, 4, 0)) < 1e-12 && s.finalProbs.every((p, k) => close(p, k % 4 === 0 ? 0.25 : 0, 1e-12)));
s = offs[3].s;
let phaseGap = 0; a3.forEach((z, k) => { const w = cmul(cexp(TAU * k * 3 / 16), a0[k]); phaseGap = Math.max(phaseGap, Math.abs(z[0] - w[0]), Math.abs(z[1] - w[1])); });
check('offset 3 < r: the complete coset {3, 7, 11, 15}; each α_k is α_k of offset 0 times e^(2πik·3/16) (matrix), so the bars are those of offset 0', s.comb.join() === '3,7,11,15'
  && phaseGap < 1e-12 && worst(s.finalProbs, spectrum(16, 4, 3)) < 1e-12 && worst(s.finalProbs, offs[0].s.finalProbs) < 1e-12, String(phaseGap));
const turned = cmul(cexp(TAU * 4 * 3 / 16), offs[0].s.sum);
check('offset 3 < r, k = 4: the page\'s chain is the offset-0 chain turned by the common phase 3π/2 (4 → −4i)', close(s.sum[0], turned[0], 1e-12) && close(s.sum[1], turned[1], 1e-12) && close(s.sum[1], -4, 1e-12), JSON.stringify(s.sum));
const OFFSET_NOTE = '完整陪集的平移只改变每个频率的公共相位，谱高不变；梳子在边界被截短时，谱高会改变。';
check('offset 3 < r: the note says translating a complete coset changes only a common phase', offs[3].note === OFFSET_NOTE, offs[3].note);
s = offs[4].s;
check('offset 4 ≥ r: the comb is cut to {4, 8, 12}; peaks 3/16 at 0, 4, 8, 12 and 1/48 on every other bar (matrix)', s.comb.join() === '4,8,12'
  && worst(s.finalProbs, spectrum(16, 4, 4)) < 1e-12 && a4.every((z, k) => close(z[0] ** 2 + z[1] ** 2, k % 4 === 0 ? 3 / 16 : 1 / 48, 1e-12))
  && s.finalProbs.every((p, k) => close(p, k % 4 === 0 ? 3 / 16 : 1 / 48, 1e-12)) && s.peaks.join() === '0,4,8,12' && worst(s.finalProbs, offs[0].s.finalProbs) > 0.05);
check('offset 4 ≥ r: the note says truncating the comb changes the heights', offs[4].note === OFFSET_NOTE && offs[4].note.includes('截短时，谱高会改变'), offs[4].note);
const drawerZh = await page.textContent('#drawer .sheet > div.zh'), drawerEn = await page.textContent('#drawer .sheet > div.en');
check('the drawer gives peaks of 1/r only for r | Q and a complete coset (x₀ < r), and says truncation changes the heights (both languages)',
  drawerZh.includes('r 整除 Q 时它们都落在整数上；此时若梳子是完整的陪集（起点 x₀ < r），每根峰高 1/r') && drawerZh.includes('截短时，谱高会改变') && drawerZh.includes('r 不整除 Q 时')
  && drawerEn.includes('if the comb is then a complete coset (offset x₀ < r), each peak has height 1/r') && drawerEn.includes('Truncating the comb at the register boundary changes the heights') && drawerEn.includes('When r does not divide Q'));

// English
await page.click('[data-lang-set="en"]'); await pick('four'); await seek(15);
check('English: the HUD reads “Q = 16 · period 4 · swept to x = 15”', (await page.textContent('#hudBig')).trim() === 'Q = 16 · period 4 · swept to x = 15');
await setRange('x0', 3);
let noteEn = (await page.textContent('#roNote')).trim();
check('English, offset 3 < r: the note speaks of a common phase at each frequency', noteEn.includes('Translating a complete coset changes only a common phase at each frequency'), noteEn);
await setRange('x0', 4);
noteEn = (await page.textContent('#roNote')).trim();
check('English, offset 4 ≥ r: the note says truncation changes the heights', noteEn.includes('truncating the comb at the register boundary also changes the heights'), noteEn);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
