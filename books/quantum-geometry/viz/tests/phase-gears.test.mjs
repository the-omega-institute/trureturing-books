#!/usr/bin/env node
// Browser regression suite for PHASE//GEARS (books/quantum-geometry/viz/phase-gears/).
//   node books/quantum-geometry/viz/tests/phase-gears.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page sums phase arrows directly. The suite builds the Q × Q unitary QFT matrix F₊ and multiplies the comb state
// by it; checks the gears against the tensor product of one equatorial qubit per binary digit, expanded to a 2^q
// vector and compared with the matrix column; reads orders by brute force over all fractions with denominator ≤ √Q;
// and sums characters over annihilators enumerated by brute force. For r ∤ Q and combs cut short by the register
// boundary it uses a second independent model, the finite geometric sum over the cells the comb actually has, and
// checks every place that explains that case (note, drawer, evidence, meta, registry, Chapter 15 caption) against it.
// It reads the page through window.PHASE_DEBUG.
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

/* ---------- r ∤ Q and combs cut short by the boundary, reached with the ordinary controls ----------
   A second independent model, the finite geometric sum (not the matrix above): the comb {x₀ + jr < Q} has
   n = ⌊(Q − 1 − x₀)/r⌋ + 1 cells, m of them swept; p(k) = m²/(Qn) when kr ≡ 0 (mod Q), otherwise
   sin²(mπkr/Q) / (Qn sin²(πkr/Q)). The marks sQ/r are integers exactly when sQ ≡ 0 (mod r). */
const cellsOf = (Q, r, x0) => Math.floor((Q - 1 - x0) / r) + 1;
const sweptOf = (Q, r, x0, t) => (t < x0 ? 0 : Math.min(cellsOf(Q, r, x0), Math.floor((t - x0) / r) + 1));
function kernel(Q, r, x0, t = Q - 1) {
  const n = cellsOf(Q, r, x0), m = sweptOf(Q, r, x0, t);
  return Array.from({ length: Q }, (_, k) => { const a = (k * r) % Q; if (!a) return m * m / (Q * n); const u = Math.sin(m * PI * a / Q), v = Math.sin(PI * a / Q); return u * u / (Q * n * v * v); });
}
const nearestInts = (Q, r) => [...new Set(Array.from({ length: r }, (_, s) => Math.round(s * Q / r) % Q))];
const marks = (Q, r) => Array.from({ length: r }, (_, s) => ({ s, at: s * Q / r, integer: (s * Q) % r === 0 }));
const f4 = (v) => v.toFixed(4);
const reading = async () => page.evaluate(() => ({ note: document.getElementById('roNote').textContent.trim(), near: document.querySelector('#ro .m dd').textContent.trim(), nearLabel: document.querySelector('#ro .m dt').textContent.trim(), cells: document.querySelector('#ro .c dd').textContent.trim() }));
/** One state reached with the controls, checked against the kernel and against what the page says about it. */
function judge(st, txt, Q, r, x0, lang) {
  const n = cellsOf(Q, r, x0), sp = kernel(Q, r, x0), near = nearestInts(Q, r), nearSum = near.reduce((a, k) => a + sp[k], 0), flat = near.length / Q;
  const mk = marks(Q, r), ints = mk.filter((m) => m.integer).length, zh = lang === 'zh', note = txt.note;
  const fail = [];
  if (st.Q !== Q || st.r !== r || st.x0 !== x0) fail.push(`state ${st.Q}/${st.r}/${st.x0}`);
  if (st.comb.join() !== Array.from({ length: n }, (_, j) => x0 + j * r).join()) fail.push(`comb ${st.comb.join()}`);
  if (worst(st.finalProbs, sp) > 1e-12) fail.push(`kernel ${worst(st.finalProbs, sp)}`);
  if (txt.cells !== String(n) || txt.near !== f4(nearSum)) fail.push(`readouts ${txt.cells} ${txt.near} vs ${n} ${f4(nearSum)}`);
  // the total and the note are computed from the spectrum after the full sweep, so both must say so
  const after = zh ? /扫完后/ : /after the full sweep/i;
  if (!after.test(txt.nearLabel)) fail.push(`readout label lacks “${after.source}”: ${txt.nearLabel}`);
  if (!after.test(note)) fail.push(`note lacks “${after.source}”`);
  if (!(ints >= 1 && mk[0].integer && ints < r)) fail.push('r ∤ Q should give s = 0 on an integer and at least one mark between integers');
  if (n === 1) {
    if (!st.finalProbs.every((p) => close(p, 1 / Q, 1e-12))) fail.push('one cell but not flat');
    if (!close(nearSum, flat, 1e-12)) fail.push('one cell: the nearest cells should carry exactly their flat share');
    const want = zh ? ['只剩一格', `x = ${x0}`, '谱是平的', `1/${Q}`, `${near.length}/${Q} = ${f4(flat)}`] : ['single cell', `x = ${x0}`, 'flat spectrum', `1/${Q}`, `${near.length}/${Q} = ${f4(flat)}`];
    want.forEach((w) => { if (!note.includes(w)) fail.push(`note lacks “${w}”`); });
  } else {
    if (!(nearSum > flat + 1e-9)) fail.push('several cells should beat the flat share');
    const want = zh ? [`实际 ${n} 格`, f4(nearSum), f4(flat), ints === 1 ? '只有 s = 0 落在整数上' : `${ints} 个落在整数上`, `${r - ints} 个落在整数之间`]
      : [`actual ${n} cells`, f4(nearSum), f4(flat), ints === 1 ? 'only s = 0 falls on an integer' : `${ints} fall on integers`, `${r - ints} fall between integers`];
    want.forEach((w) => { if (!note.includes(w)) fail.push(`note lacks “${w}”`); });
  }
  if (/大部分|most of the|peaks spread\.|落在整数之间，峰摊开/.test(note)) fail.push('note claims a universal concentration');
  if (!zh && /[㐀-鿿]/.test(note)) fail.push('Chinese left in the English note');
  return { fail, n, nearSum, flat, ints };
}
const FAMILIES = [[64, 3], [64, 12], [32, 7], [16, 3], [8, 6]];
let sweepLog = [], sweepFail = [];
for (const [Q, r] of FAMILIES) {
  await page.click(`#qChips [data-q="${Q}"]`); await setRange('r', r);
  for (let x0 = 0; x0 < Q; x0++) {
    await setRange('x0', x0); const st = await state(), txt = await reading(), j = judge(st, txt, Q, r, x0, 'zh');
    sweepLog.push({ Q, r, x0, n: j.n, nearSum: j.nearSum, flat: j.flat }); if (j.fail.length) sweepFail.push(`${Q}/${r}/${x0}: ${j.fail.join('; ')}`);
  }
}
check(`r ∤ Q, every offset of ${FAMILIES.map(([Q, r]) => `Q = ${Q}, r = ${r}`).join('; ')} (${sweepLog.length} states, sliders): the spectrum is the finite sum over the comb's actual cells, and the note and readouts give the measured total against the flat share`,
  sweepFail.length === 0 && sweepLog.length === 184, sweepFail.slice(0, 3).join(' | '));
const fam = (Q, r) => sweepLog.filter((o) => o.Q === Q && o.r === r);
const halfOrLess = fam(64, 3).filter((o) => o.nearSum <= 0.5).map((o) => o.x0), single = fam(64, 3).filter((o) => o.n === 1).map((o) => o.x0);
check('Q = 64, r = 3: cutting the comb short takes the nearest three cells from 0.80 (22 cells, x₀ = 0) to at most 1/2 for x₀ ≥ 31 and to the flat 3/64 for x₀ ≥ 61',
  close(fam(64, 3)[0].nearSum, 0.8026, 1e-4) && fam(64, 3)[0].n === 22 && halfOrLess.join() === Array.from({ length: 33 }, (_, i) => 31 + i).join() && single.join() === '61,62,63'
  && fam(64, 3).filter((o) => o.n === 1).every((o) => close(o.nearSum, 3 / 64, 1e-12)), `${halfOrLess[0]}…, ${single.join()}`);
check('severe truncations with several cells also fall to at most 1/2 on the nearest cells (Q = 32, r = 7, x₀ = 18: two cells; Q = 16, r = 3, x₀ = 10: two cells)',
  fam(32, 7)[18].n === 2 && fam(32, 7)[18].nearSum <= 0.5 && fam(16, 3)[10].n === 2 && fam(16, 3)[10].nearSum <= 0.5 && fam(32, 7)[0].nearSum > 0.5);
check('marks sQ/r for r ∤ Q: Q = 64, r = 12 has four on integers (0, 16, 32, 48) and eight between; Q = 64, r = 3 only 0',
  marks(64, 12).filter((m) => m.integer).map((m) => m.at).join() === '0,16,32,48' && marks(64, 12).filter((m) => !m.integer).length === 8 && marks(64, 3).filter((m) => m.integer).map((m) => m.at).join() === '0');

// the one-cell counterexample: Q = 64, r = 3, x₀ = 63
await page.click('#qChips [data-q="64"]'); await setRange('r', 3); await setRange('x0', 63); await setRange('k', 21); s = await state();
let txt = await reading();
check('Q = 64, r = 3, x₀ = 63: the comb is the single cell 63, every bar is 1/64, and the nearest integers 0, 21, 43 to sQ/r carry 3/64 — exactly a flat share',
  s.comb.join() === '63' && s.finalProbs.every((p) => close(p, 1 / 64, 1e-12)) && nearestInts(64, 3).join() === '0,21,43' && txt.near === f4(3 / 64)
  && close([0, 21, 43].reduce((a, k) => a + s.finalProbs[k], 0), 3 / 64, 1e-12) && marks(64, 3).map((m) => m.at.toFixed(2)).join() === '0.00,21.33,42.67', JSON.stringify(txt));
const flatPeaks = s.peaks, flatReads = await page.evaluate((ks) => ks.map((k) => window.PHASE_DEBUG.readOrder(k).d), flatPeaks);
check('Q = 64, one cell: every bar counts as a peak, and the readings at those peaks give other denominators than 3 (only candidates)',
  flatPeaks.length === 64 && flatReads.some((d) => d !== 3) && flatReads.every((d) => d * d <= 64), JSON.stringify([...new Set(flatReads)]));
// a partial sweep of a truncated comb, the rail set by its own slider at integer and fractional positions
await setRange('x0', 40); let sweepErr = 0, sweepOk = true;
const railTxt = [];
for (const t of [39, 40, 42.5, 43 - 1e-6, 43, 50, 52.5, 63]) { await setRange('now', t); const st = await state(); sweepErr = Math.max(sweepErr, worst(st.probs, kernel(64, 3, 40, t))); sweepOk = sweepOk && Math.abs(st.probs.reduce((a, p) => a + p, 0) - sweptOf(64, 3, 40, t) / 8) < 1e-12; railTxt.push({ t, swept: sweptOf(64, 3, 40, t), live: st.probs.reduce((a, p) => a + p, 0), ...(await reading()) }); }
check('Q = 64, r = 3, x₀ = 40 (8 cells): along the rail, at integer and fractional positions, the bars are the kernel of the cells swept so far and add up to m/n', sweepOk && sweepErr < 1e-12, String(sweepErr));
// before the first cell (t = 39: no arrow, every bar 0) and part-way, the note and the total describe the full sweep
const finalNear = f4(nearestInts(64, 3).reduce((a, k) => a + kernel(64, 3, 40)[k], 0)), railBad = railTxt.filter((o) => o.near !== finalNear || o.note !== railTxt[railTxt.length - 1].note || !o.note.includes('扫完后') || !o.nearLabel.includes('扫完后'));
check(`Q = 64, r = 3, x₀ = 40: with 0, 1, 2, … of 8 cells swept the total stays the full-sweep ${finalNear} and the note says it is after the full sweep`,
  railTxt[0].swept === 0 && railTxt[0].live === 0 && railTxt[2].swept === 1 && railBad.length === 0, JSON.stringify(railBad.slice(0, 2)));
await setRange('now', 63);
// r > √Q: a denominator at most √Q never returns r
await page.click('#qChips [data-q="16"]'); await setRange('r', 5); await setRange('x0', 0); s = await state();
const reads5 = await page.evaluate((ks) => ks.map((k) => window.PHASE_DEBUG.readOrder(k).d), s.peaks);
check('Q = 16, r = 5 > √16: no peak reads the order 5 (every reading has a denominator ≤ 4)', s.peaks.length > 1 && reads5.every((d) => d <= 4 && d !== 5), JSON.stringify(reads5));

// the leak card still says what it says, and the marks it names are the integer and fractional ones
await pick('leak'); await seek(63); s = await state(); txt = await reading();
const leakNoteZh = (await page.textContent('#presetNote')).trim(), mk6 = marks(64, 6);
check('NOT DIVIDING: the marks are 0 and 32 on integers, 10.67, 21.33, 42.67, 53.33 between (brute force), and the card note names both kinds',
  mk6.filter((m) => m.integer).map((m) => m.at).join() === '0,32' && mk6.filter((m) => !m.integer).map((m) => m.at.toFixed(2)).join() === '10.67,21.33,42.67,53.33'
  && leakNoteZh.includes('除 0 与 32 外') && leakNoteZh.includes('10.67') && leakNoteZh.includes('21.33') && leakNoteZh.includes('扫完后') && leakNoteZh.includes('0.80'), leakNoteZh);
const jl = judge(s, txt, 64, 6, 0, 'zh');
check('NOT DIVIDING: the readout note gives 11 cells, two integer marks, 0.8037 on the nearest six against 0.0938 flat (kernel)', jl.fail.length === 0 && f4(jl.nearSum) === '0.8037' && f4(jl.flat) === '0.0938' && jl.ints === 2, jl.fail.join('; '));

/* ---------- every place that explains r ∤ Q states the same conditions ---------- */
const nearSum = (Q, r, x0) => nearestInts(Q, r).reduce((a, k) => a + kernel(Q, r, x0)[k], 0);
const EX = { leak: nearSum(64, 6, 0).toFixed(2), long3: nearSum(64, 3, 0).toFixed(2), n6: cellsOf(64, 6, 0), n3: cellsOf(64, 3, 0), one: `${nearestInts(64, 3).length}/64`, int6: marks(64, 6).filter((m) => m.integer && m.s > 0).map((m) => m.at) };
const has = (t, ws) => ws.filter((w) => !t.includes(w));
const exZh = await page.textContent('#drawer .sheet > div.zh'), exEn = await page.textContent('#drawer .sheet > div.en');
const miss = [
  ...has(exZh, ['x₀ < r', `0.80`, '例如 Q = 64、r = 6、x₀ = 0', '例如 Q = 64、r = 3', `（${EX.n6} 格）`, `（${EX.n3} 格）`, `x₀ = 63 只剩一格，谱是平的`, EX.one, `还有 ${EX.int6[0]}`, '不超过 n/Q', '只是阶的候选', 'r > √Q 时这种读法读不到 r']).map((w) => `zh: ${w}`),
  ...has(exEn, ['x₀ < r', `0.80`, 'For example, at Q = 64, r = 6, x₀ = 0', 'for example, at Q = 64, r = 3', `(${EX.n6} cells)`, `(${EX.n3} cells)`, 'x₀ = 63 leaves a single cell, the spectrum is flat', EX.one, `so does ${EX.int6[0]}`, 'no bar exceeds n/Q', 'only a candidate for the order', 'when r > √Q this reading cannot return r']).map((w) => `en: ${w}`)
];
check(`drawer: r ∤ Q gives a finite sum over the actual cells, with 0.80 at Q = 64 only as examples (${EX.leak}, ${EX.long3} by the kernel), one cell flat at ${EX.one}, integer mark ${EX.int6[0]}, and readings only as candidates (both languages)`,
  EX.leak === '0.80' && EX.long3 === '0.80' && miss.length === 0 && !/大部分概率|most of the probability|长梳子|long comb/i.test(exZh + exEn), miss.slice(0, 4).join(' | '));
const argZh = await page.textContent('#evidence .lean.argued .zh'), argEn = await page.textContent('#evidence .lean.argued .en');
const argMiss = [...has(argZh, ['Shor', 'Q ≥ N² > r²', 'x₀ < r', '常数下界', '仍要检验', '截短的梳子可以没有这种集中', '只剩一格时谱是平的', '文献结果，未在本书形式化']),
  ...has(argEn, ["Shor's setting", 'Q ≥ N² > r²', 'x₀ < r', 'bounded below by a constant', 'must still be checked', 'a truncated comb can lose the concentration', 'a single cell gives a flat spectrum', 'not formalized in this book'])];
check('evidence: the ARGUED box ties the concentration to Shor’s setting (x₀ < r, Q ≥ N² > r²) and says a truncated or one-cell comb need not concentrate (both languages)',
  argMiss.length === 0 && !/r 不整除 Q 时谱集中在|when r does not divide Q the spectrum concentrates/.test(argZh + argEn), argMiss.join(' | '));
const meta = await page.getAttribute('meta[name="description"]', 'content');
const metaMiss = has(meta, ['完整陪集（起点 x₀ < r）', '只有一部分 sQ/r 落在整数上', '有限和', '截短的梳子未必集中在 sQ/r 附近', '只剩一格时谱是平的', '只是候选', 'complete coset (offset x₀ < r)', 'only some of the values sQ/r are integers', 'finite sum', 'a truncated comb need not concentrate near sQ/r', 'a single cell gives a flat spectrum', 'only a candidate']);
check('meta description: the same conditions in both languages, no unconditional peaks near sQ/r', metaMiss.length === 0 && !/peaks sit on the integers near sQ\/r|不整除时峰落在 sQ\/r 附近的整数上|长梳子|long comb/i.test(meta), metaMiss.join(' | '));
const { readFileSync } = await import('node:fs');
const BOOKDIR = new URL('../../', import.meta.url);
const entry = JSON.parse(readFileSync(new URL('viz/visualizations.json', BOOKDIR), 'utf8')).visualizations.find((v) => v.id === ID);
const regMiss = [...has(entry.summary, ['完整陪集（x₀ < r）', '只有一部分 sQ/r 落在整数上', '有限和', '例如 Q = 64、r = 6、x₀ = 0', '截短的梳子未必集中在 sQ/r 附近', '只剩一格时谱是平的', '只是候选']),
  ...has(entry.summary_en, ['complete coset (x₀ < r)', 'only some of the values sQ/r are integers', 'finite sum', 'for example, at Q = 64, r = 6, x₀ = 0', 'a truncated comb need not concentrate near sQ/r', 'a single cell gives a flat spectrum', 'only a candidate'])];
check('registry: summary and summary_en state the same conditions', regMiss.length === 0 && !/r 不整除 Q 时峰摊在 sQ\/r 附近，用连分数|when r does not divide Q the peaks spread near sQ\/r, and continued|长梳子|long comb/i.test(entry.summary + entry.summary_en), regMiss.join(' | '));
const lab = (lang) => { const md = readFileSync(new URL(`${lang}/ch15-grover-qft-and-period-finding.md`, BOOKDIR), 'utf8'), i = md.indexOf('::: {.viz src="phase-gears" height="560"}'); return i < 0 ? '' : md.slice(i, md.indexOf('\n:::', i + 10)); };
const capZh = lab('zh'), capEn = lab('en');
const capMiss = [...has(capZh, ['完整陪集（起点 $x_0<r$）', '[@prop-finite-character-cancellation]', '有限和', 'Shor 的设定', '起点 $x_0<r$、梳子铺到寄存器末端', '$Q \\ge N^2 > r^2$', '仍要检验', '文献结果，未在本书形式化', '截短的梳子可以没有这种集中', '只剩一格时谱是平的']),
  ...has(capEn, ['complete coset (offset $x_0<r$)', '[@prop-finite-character-cancellation]', 'finite sum', "Shor's setting", 'offset $x_0<r$, the comb running to the end of the register', '$Q \\ge N^2 > r^2$', 'must still be checked', 'not formalized in this book', 'a truncated comb can lose that concentration', 'a single cell gives a flat spectrum'])];
check('Chapter 15 full-lab caption: the same conditions in both languages', capZh && capEn && capMiss.length === 0 && !/峰摊在 \$sQ\/r\$ 附近（文献结果|the peaks spread near \$sQ\/r\$ \(a literature/.test(capZh + capEn), capMiss.join(' | '));

// English
await page.click('[data-lang-set="en"]'); await pick('four'); await seek(15);
check('English: the HUD reads “Q = 16 · period 4 · swept to x = 15”', (await page.textContent('#hudBig')).trim() === 'Q = 16 · period 4 · swept to x = 15');
await setRange('x0', 3);
let noteEn = (await page.textContent('#roNote')).trim();
check('English, offset 3 < r: the note speaks of a common phase at each frequency', noteEn.includes('Translating a complete coset changes only a common phase at each frequency'), noteEn);
await setRange('x0', 4);
noteEn = (await page.textContent('#roNote')).trim();
check('English, offset 4 ≥ r: the note says truncation changes the heights', noteEn.includes('truncating the comb at the register boundary also changes the heights'), noteEn);
const enFail = [];
await page.click('#qChips [data-q="64"]');
for (const [r, x0s] of [[3, [0, 31, 58, 63]], [12, [0, 50, 60]]]) {
  await setRange('r', r);
  for (const x0 of x0s) { await setRange('x0', x0); const j = judge(await state(), await reading(), 64, r, x0, 'en'); if (j.fail.length) enFail.push(`${r}/${x0}: ${j.fail.join('; ')}`); }
}
check('English, r ∤ Q (Q = 64; r = 3 at x₀ = 0, 31, 58, 63 and r = 12 at x₀ = 0, 50, 60): the note gives the integer marks, the actual cells, the measured total against the flat share, and one cell as flat', enFail.length === 0, enFail.slice(0, 3).join(' | '));
await pick('leak'); await seek(63);
const jle = judge(await state(), await reading(), 64, 6, 0, 'en'), leakNoteEn = (await page.textContent('#presetNote')).trim();
check('English, NOT DIVIDING: the card note names 0 and 32 as the integer marks and keeps 0.115, 0.026 and 0.80; the readout note agrees with the kernel',
  jle.fail.length === 0 && leakNoteEn.includes('Apart from 0 and 32') && ['10.67', '21.33', 'after the full sweep', '0.115', '0.026', '0.80'].every((w) => leakNoteEn.includes(w)), `${jle.fail.join('; ')} ${leakNoteEn}`);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
