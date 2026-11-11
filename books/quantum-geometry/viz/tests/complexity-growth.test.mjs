#!/usr/bin/env node
// Browser regression suite for COMPLEXITY//GROWTH (books/quantum-geometry/viz/complexity-growth/).
//   node books/quantum-geometry/viz/tests/complexity-growth.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// Independent checks:
//   growth  the suite re-runs the page's gate list with its own update rule (each new amplitude summed from the four
//           amplitudes it mixes with), compares the states, builds ρ_A itself and checks the page's 16 eigenvalues
//           through the power sums Tr ρ_A^k = Σ λ^k, k = 1 … 16 (which fix the spectrum); the cut bound and the gate
//           counts are counted from the gate list.
//   depth   the suite builds circuit(N, S) as the chapter writes it (indices not in S descending, then those in S
//           ascending), schedules it greedily (each gate one layer after the last earlier gate it shares a site with)
//           and finds the minimum over |S| = κ by trying every S.
// It reads the page through window.GROWTH_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'complexity-growth';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model: the depth side ---------- */
const support = (N, k) => (k === 0 ? [1] : k === N ? [N] : [k, k + 1]);
const listOf = (N, S) => { const s = new Set(S), out = []; for (let k = N; k >= 0; k--) if (!s.has(k)) out.push(k); for (let k = 0; k <= N; k++) if (s.has(k)) out.push(k); return out; };
/** Greedy schedule of the list: layer of each list entry, and the depth. */
function asap(N, S) {
  const list = listOf(N, S), lay = [];
  list.forEach((k, i) => { let l = 0; for (let j = 0; j < i; j++) if (support(N, list[j]).some((x) => support(N, k).includes(x))) l = Math.max(l, lay[j] + 1); lay.push(l); });
  return { list, lay, D: Math.max(...lay) + 1 };
}
function bruteMin(N, k) {
  let best = Infinity; const rec = (start, pick) => { if (pick.length === k) { best = Math.min(best, asap(N, pick).D); return; } for (let s = start; s <= N; s++) rec(s + 1, [...pick, s]); };
  rec(1, []); return best;
}
const formula = (N, k) => Math.floor(N / (k + 1)) + 1;
const gname = (N, k) => (k === 0 ? 'K1' : k === N ? 'KN' : `U${k}`);

/* ---------- independent model: the growth side ---------- */
function rerun(list, upto) {
  let re = new Float64Array(256), im = new Float64Array(256); re[0] = 1;
  const states = [{ re: Array.from(re), im: Array.from(im) }];
  let layer = 1;
  for (const g of list) {
    if (g.layer > upto) break;
    while (g.layer > layer) { states.push({ re: Array.from(re), im: Array.from(im) }); layer++; }
    const nr = new Float64Array(256), ni = new Float64Array(256), a = g.a;
    for (let i = 0; i < 256; i++) {
      const r = 2 * ((i >> a) & 1) + ((i >> (a + 1)) & 1), base = i & ~((1 << a) | (1 << (a + 1)));
      for (let c = 0; c < 4; c++) {
        const j = base | ((c >> 1) << a) | ((c & 1) << (a + 1)), ur = g.re[r * 4 + c], ui = g.im[r * 4 + c];
        nr[i] += ur * re[j] - ui * im[j]; ni[i] += ur * im[j] + ui * re[j];
      }
    }
    re = nr; im = ni;
  }
  while (layer <= upto) { states.push({ re: Array.from(re), im: Array.from(im) }); layer++; }
  return states;
}
/** ρ_A over the low four bits as complex 16 × 16 [re, im]. */
function rhoA(st) {
  const R = [], I = [];
  for (let a = 0; a < 16; a++) { R.push(new Array(16).fill(0)); I.push(new Array(16).fill(0)); }
  for (let b = 0; b < 16; b++) for (let a = 0; a < 16; a++) for (let c = 0; c < 16; c++) {
    const x = a + 16 * b, y = c + 16 * b; // ψ_x conj(ψ_y)
    R[a][c] += st.re[x] * st.re[y] + st.im[x] * st.im[y]; I[a][c] += st.im[x] * st.re[y] - st.re[x] * st.im[y];
  }
  return [R, I];
}
const cmul = ([A, B], [C, D]) => { const n = 16, R = [], I = []; for (let i = 0; i < n; i++) { R.push(new Array(n).fill(0)); I.push(new Array(n).fill(0)); for (let k = 0; k < n; k++) { const ar = A[i][k], ai = B[i][k]; for (let j = 0; j < n; j++) { R[i][j] += ar * C[k][j] - ai * D[k][j]; I[i][j] += ar * D[k][j] + ai * C[k][j]; } } } return [R, I]; };
const trace = ([R]) => R.reduce((s, r, i) => s + r[i], 0);

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.GROWTH_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.GROWTH_DEBUG.seek(x), t); return state(); };
const stopped = (id) => until(page, (c) => { const s = window.GROWTH_DEBUG.state; return s.preset === c && !s.playing; }, id, 180000);
const plays = () => until(page, () => window.GROWTH_DEBUG.state.playing);

let s = await state();
check('opens on ENTROPY CAPS in the growth scene at layer 14', s.preset === 'saturate' && s.scene === 'growth' && close(s.t, 14, 1e-9));

// the run itself
const run = await page.evaluate(() => window.GROWTH_DEBUG.run());
check('the run has 8 qubits and 90 layers', run.NQ === 8 && run.TMAX === 90 && run.entropy.length === 91);
const unitary = run.list.every((g) => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let r = 0, m = 0; for (let k = 0; k < 4; k++) { r += g.re[k * 4 + i] * g.re[k * 4 + j] + g.im[k * 4 + i] * g.im[k * 4 + j]; m += g.re[k * 4 + i] * g.im[k * 4 + j] - g.im[k * 4 + i] * g.re[k * 4 + j]; } if (!close(r, i === j ? 1 : 0, 1e-12) || !close(m, 0, 1e-12)) return false; } return true; });
check(`every one of the ${run.list.length} gates is unitary (U†U = I)`, unitary);
const layersOk = run.list.every((g) => (g.layer % 2 ? g.a % 2 === 1 : g.a % 2 === 0) && g.a + 1 < 8);
let gcount = 0, xcount = 0, countsOk = true;
for (let t = 1; t <= 90; t++) { const L = run.list.filter((g) => g.layer === t); gcount += L.length; xcount += L.filter((g) => g.a === 3).length; countsOk = countsOk && run.gates[t] === gcount && run.cross[t] === xcount && gcount === 3 * Math.ceil(t / 2) + 4 * Math.floor(t / 2); }
check('brick wall: odd layers on (1,2)(3,4)(5,6), even on (0,1)…(6,7); gate count 3⌈t/2⌉ + 4⌊t/2⌋ and cut crossings match the list', layersOk && countsOk);
const states = rerun(run.list, 90);
let worstState = 0;
for (const t of [0, 1, 7, 14, 45, 90]) { const p = await page.evaluate((x) => window.GROWTH_DEBUG.stateAt(x), t); for (let i = 0; i < 256; i++) worstState = Math.max(worstState, Math.abs(p.re[i] - states[t].re[i]), Math.abs(p.im[i] - states[t].im[i])); }
check('the suite\'s own update rule reproduces the page\'s state at six layers', worstState < 1e-10, String(worstState));
let worstPow = 0;
for (const t of [1, 3, 14, 60, 90]) {
  const rho = rhoA(states[t]); let P = rho;
  for (let k = 1; k <= 16; k++) { const want = trace(P), got = run.spectra[t].reduce((a, l) => a + l ** k, 0); worstPow = Math.max(worstPow, Math.abs(want - got) / Math.max(1e-12, Math.abs(want))); P = cmul(P, rho); }
}
check('the page\'s 16 eigenvalues match Tr ρ_A^k for k = 1 … 16 at five layers (relative)', worstPow < 1e-6, String(worstPow));
const H = (sp) => sp.reduce((a, l) => (l > 1e-15 ? a - l * Math.log2(l) : a), 0);
check('the entropy curve is −Σ λ log₂ λ of those eigenvalues at every layer', run.entropy.every((v, t) => close(v, H(run.spectra[t]), 1e-9)));
check('the entropy never passes min(2 × gates across the cut, 4 bits) — the grey staircase and the white line', run.entropy.every((v, t) => v <= Math.min(2 * run.cross[t], 4) + 1e-9));

// ENTROPY CAPS
const tail = run.entropy.slice(40), mean = tail.reduce((a, b) => a + b, 0) / tail.length, lo = Math.min(...tail), hi = Math.max(...tail);
let t0 = 0; while (t0 < 90 && run.entropy[t0] < mean - 0.25) t0++;
await pick('saturate');
check('ENTROPY CAPS plays by itself', await plays());
check('ENTROPY CAPS stops at layer 14', await stopped('saturate'));
s = await state();
check('ENTROPY CAPS: settles at the layer the note names, inside the band it names, with 49 gates at layer 14', s.growth.late.t0 === t0 && close(s.growth.late.min, lo) && close(s.growth.late.max, hi) && t0 <= 14 && s.growth.gates === 49 && run.entropy[14] >= lo - 0.3, `t0 ${t0}, band ${lo.toFixed(2)}–${hi.toFixed(2)}`);
check('ENTROPY CAPS: the settled band is under 4 bits and well above half of it', hi < 4 && lo > 3);
const note = await page.textContent('#presetNote');
check('ENTROPY CAPS: the note quotes the band and the gate count', note.includes(lo.toFixed(2)) && note.includes(hi.toFixed(2)) && note.includes('49'));

// 2^N CEILING
await pick('ceiling');
check('2^N CEILING plays by itself', await plays());
check('2^N CEILING stops at layer 90', await stopped('ceiling'));
s = await state();
const tCeil = run.gates.findIndex((g) => g >= 256);
check('2^N CEILING: the model meets 2^8 = 256 at the first layer whose gate count reaches 256, and the gate count ends at 315', s.growth.tCeil === tCeil && run.gates[90] === 315 && run.gates[tCeil - 1] < 256 && (await page.textContent('#presetNote')).includes(String(tCeil)));
check('2^N CEILING: the readout shows the model at 256 while 315 gates were used', /315/.test(s.key) && (await page.textContent('#ro')).includes('256'));

// CV · OPEN
await pick('cv');
check('CV plays by itself', await plays());
check('CV stops at layer 60 with the CV reading on', await stopped('cv') && (await state()).cv === true && close((await state()).t, 60, 1e-9));
check('CV: the red mark is on the stage and an OPEN box stands beside it', await page.evaluate(() => [...document.querySelectorAll('.stage .tag')].some((t) => /OPEN/.test(t.textContent) && t.offsetParent) && !!document.querySelector('.lean.open:not([hidden])')));
await page.click('#cvBtn'); s = await state();
check('the CV button turns the reading off and leaves the card', s.cv === false && s.preset === null);

// rail and stage in the growth scene
s = await seek(30);
check('the rail moves the growth scene to layer 30', s.growth.layer === 30 && s.growth.gates === run.gates[30] && close(s.growth.entropy, run.entropy[30]));
const box = await page.evaluate(() => { const r = document.getElementById('cv').getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
await page.mouse.click(box[0] + box[2] * 0.15, box[1] + box[3] * 0.6); s = await state();
check('clicking the growth stage moves the rail to that layer', s.growth.layer < 30 && s.growth.layer >= 0, String(s.growth.layer));
await page.keyboard.press('Home'); await page.keyboard.press('Space');
check('Space plays the rail', await until(page, () => window.GROWTH_DEBUG.state.t > 0));
await page.keyboard.press('Space');

// N 8 · κ 2
await pick('eight');
check('N 8 · κ 2 plays by itself (layer by layer)', await plays());
check('N 8 · κ 2 stops at the end of layer 3', await stopped('eight'));
s = await state();
const a8 = asap(8, [3, 6]);
check('N 8 · κ 2: the list is KN, U7, U5, U4, U2, U1, K1, U3, U6 (as in the chapter)', a8.list.map((k) => gname(8, k)).join(',') === 'KN,U7,U5,U4,U2,U1,K1,U3,U6' && s.depth.order.join(',') === a8.list.join(','));
check('N 8 · κ 2: greedy layers [0,1,0,1,0,1,2,2,2] equal the page\'s, 3 layers = ⌊8/3⌋ + 1, old formula 4', a8.lay.join(',') === '0,1,0,1,0,1,2,2,2' && a8.list.every((k, i) => s.depth.layers[k] === a8.lay[i]) && s.depth.D === 3 && s.depth.floor === 3 && formula(8, 2) === 3 && s.depth.guess === (8 + 4) / 2 - 2);
check('N 8 · κ 2: exhaustive minimum over all 28 two-element S is 3', bruteMin(8, 2) === 3 && s.depth.brute === 3);

// N 11 · κ 2
await pick('eleven');
check('N 11 · κ 2 stops at the end of layer 4', await stopped('eleven'));
s = await state();
const a11 = asap(11, [4, 8]);
check('N 11 · κ 2: greedy layers [0,1,2,0,1,2,0,1,2,3,3,3], 4 layers, old formula 5', a11.lay.join(',') === '0,1,2,0,1,2,0,1,2,3,3,3' && a11.list.every((k, i) => s.depth.layers[k] === a11.lay[i]) && s.depth.D === 4 && s.depth.guess === Math.floor((11 + 3) / 2) - 2 && s.depth.guess === 5);
check('N 11 · κ 2: exhaustive minimum is 4', bruteMin(11, 2) === 4 && s.depth.brute === 4);

// DEPTH FLOOR
await page.click('[data-preset="floor"]');
check('DEPTH FLOOR plays by itself', await plays());
check('DEPTH FLOOR stops', await stopped('floor'));
s = await state();
const seq = [[2, 3], [2, 4], [3, 5], [3, 6], [4, 7], [4, 8]].map((c) => asap(11, c).D);
check('DEPTH FLOOR: the cut sets of the note give 9, 8, 7, 6, 5, 4 layers', seq.join(',') === '9,8,7,6,5,4');
check('DEPTH FLOOR: it ends on {4, 8} with 4 layers, on the white line', s.depth.cuts.join(',') === '4,8' && s.depth.D === 4 && s.depth.floor === 4);

// the theorem, by exhaustion
let thmOk = true, bad = '';
for (let N = 4; N <= 14; N++) for (let k = 1; 2 * k <= N && k <= 4; k++) { const b = bruteMin(N, k); if (b !== formula(N, k)) { thmOk = false; bad = `${N},${k}`; } }
check('exhaustion agrees with ⌊N/(κ+1)⌋ + 1 for every N ≤ 14, κ ≤ 4 with 2κ ≤ N', thmOk, bad);

// controls: κ chips and N slider place the cuts so that the floor is reached
await page.click('[data-scene="depth"]'); await settle(page);
let ctrlOk = true; const tried = [];
for (const N of [6, 13, 20, 24]) {
  await page.evaluate((v) => { const el = document.getElementById('nSites'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, N); await settle(page);
  for (const k of [1, 2, 3, 4]) {
    if (2 * k > N) continue;
    await page.click(`[data-kappa="${k}"]`); s = await state();
    const d = asap(N, s.depth.cuts).D;
    tried.push(`${N}/${k}:${d}`);
    ctrlOk = ctrlOk && s.depth.N === N && s.depth.cuts.length === k && d === formula(N, k) && s.depth.D === d;
  }
}
check('the N slider and κ chips place cuts whose greedy depth is exactly ⌊N/(κ+1)⌋ + 1', ctrlOk, tried.join(' '));
await page.evaluate(() => { const el = document.getElementById('nSites'); el.value = '8'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
await page.click('[data-kappa="2"]'); s = await state();
check('N = 8, κ = 2 from the controls gives the chapter\'s S = {3, 6}', s.depth.cuts.join(',') === '3,6');
// clicking sites
let p = await page.evaluate(() => window.GROWTH_DEBUG.point(4, -0.6));
await page.mouse.click(p[0], p[1]); s = await state();
check('clicking site 4 adds it to S: {3, 4, 6}, greedy depth agrees, floor now ⌊8/4⌋ + 1 = 3', s.depth.cuts.join(',') === '3,4,6' && s.depth.D === asap(8, [3, 4, 6]).D && s.depth.floor === 3 && s.preset === null);
p = await page.evaluate(() => window.GROWTH_DEBUG.point(3, -0.6));
await page.mouse.click(p[0], p[1]); s = await state();
check('clicking site 3 takes it out: {4, 6}, and the depth never drops below the floor', s.depth.cuts.join(',') === '4,6' && s.depth.D === asap(8, [4, 6]).D && s.depth.D >= formula(8, 2));
// the rail in the depth scene
s = await seek(1.5);
check('the rail in the depth scene runs the layers (1.5 of ' + s.depth.D + ')', close(s.depth.lt, 1.5, 1e-9) && close(s.max, s.depth.D, 1e-9));
await page.click('[data-scene="growth"]'); s = await state();
check('the scene chips switch back to growth', s.scene === 'growth' && close(s.max, 90, 1e-9));

check('no page error during the page-specific checks', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));
await T.finish();
