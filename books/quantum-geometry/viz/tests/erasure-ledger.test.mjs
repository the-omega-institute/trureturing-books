// Browser regression suite for ERASURE//LEDGER (books/quantum-geometry/viz/erasure-ledger/).
//   node books/quantum-geometry/viz/tests/erasure-ledger.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page applies its operations to a 4 × 4 density matrix and takes entropies and relative entropies through Jacobi
// eigendecompositions. The suite recomputes everything another way: qubit entropies from the length of the Bloch arrow,
// relative entropies from the closed form of ln σ for a qubit (½ ln((1 − s²)/4) I + ½ ln((1 + s)/(1 − s)) ŝ·σ), turns
// and pinches as plain geometry on the Bloch arrow, the copy as a state vector, and the bath swap from the formulas of
// Chapter 8 and its table. It reads the page through window.ERASE_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'erasure-ledger';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const LN2 = Math.log(2), DEG = Math.PI / 180;

/* ---------- independent model ---------- */
const xl = (x) => (x > 0 ? x * Math.log(x) : 0);
/** Entropy of the qubit with Bloch arrow (x, z): binary entropy of (1 ± |r|)/2. */
const Sq = ([x, z]) => { const r = Math.min(1, Math.hypot(x, z)); return -xl((1 + r) / 2) - xl((1 - r) / 2); };
/** D(ρ ‖ σ) for qubits with Bloch arrows r and s (|s| < 1), from the closed form of ln σ. */
function Dq(r, s) {
  const sl = Math.hypot(s[0], s[1]), dot = sl > 0 ? (r[0] * s[0] + r[1] * s[1]) / sl : 0;
  const trRhoLnSigma = 0.5 * Math.log((1 - sl * sl) / 4) + (sl > 0 ? 0.5 * Math.log((1 + sl) / (1 - sl)) * dot : 0);
  return -Sq(r) - trRhoLnSigma;
}
const turn = ([x, z], a) => [x * Math.cos(a) + z * Math.sin(a), -x * Math.sin(a) + z * Math.cos(a)];
const pinch = ([, z]) => [0, z];
const h2 = (p) => -xl(p) - xl(1 - p);
/** Chapter 8's one-qubit swap erasure of ½I with a bath at ground population p. */
const swapRow = (p) => ({ drop: LN2 - h2(p), D: -LN2 - 0.5 * Math.log(p * (1 - p)), Q: (p - 0.5) * Math.log(p / (1 - p)) });

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.ERASE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
// a card plays by itself: wait until the page reports that it moved, then jump to the card's last step (playback runs
// on animation frames, and under VIZ_SLOW_FRAMES six steps would outlast any timeout)
const played = async (n) => { const ok = await until(page, (k) => { const s = window.ERASE_DEBUG.state; return s.n === k && (s.playing || s.t > 0); }, n); await page.evaluate((k) => window.ERASE_DEBUG.seek(k), n); await settle(page); return ok; };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const op = async (name) => { await page.click(`#ops [data-op="${name}"]`); await settle(page); };

// opening view: the A · B card at its telling frame
let s = await state();
check('opens on the A · B card with its three steps done', s.preset === 'cycle' && s.n === 3 && close(s.t, 3));

// TURN · PINCH
await pick('pinch');
check('TURN · PINCH plays by itself (two steps)', await played(2));
s = await state();
let [h0, h1, h2s] = s.hist;
check('TURN · PINCH: the turn by 90° takes |0⟩ to the flat arrow and leaves the entropy at 0', close(h1.bloch[0], 1, 1e-12) && close(h1.bloch[1], 0, 1e-12) && close(h1.S, 0, 1e-9) && close(h0.S, 0, 1e-9));
check('TURN · PINCH: the pinch takes the arrow to the centre', close(h2s.bloch[0], 0, 1e-12) && close(h2s.bloch[1], 0, 1e-12));
check('TURN · PINCH: entropy rise = D = ln 2 (closed form), no heat', close(h2s.step.dS, LN2, 1e-9) && close(h2s.step.D, LN2, 1e-9) && close(Dq(h1.bloch, pinch(h1.bloch)), LN2, 1e-12) && h2s.heat === 0);

// STEPS: theorem of Chapter 8, step by step and summed
await pick('steps');
check('STEPS plays its six operations', await played(6));
s = await state();
let r = [0, 1], sum = 0, worst = 0;
for (let k = 1; k <= 6; k++) {
  const h = s.hist[k], prev = s.hist[k - 1];
  if (h.step.op === 'rot') { r = turn(r, 50 * DEG); worst = Math.max(worst, Math.abs(h.S - prev.S)); }
  else { const D = Dq(r, pinch(r)); sum += D; worst = Math.max(worst, Math.abs(h.step.D - D), Math.abs(h.step.dS - D), Math.abs((Sq(pinch(r)) - Sq(r)) - D)); r = pinch(r); }
  worst = Math.max(worst, Math.abs(h.bloch[0] - r[0]), Math.abs(h.bloch[1] - r[1]));
}
check('STEPS: each pinch raises the entropy by its own D, turns raise nothing, the arrow follows z → z cos 50°', worst < 1e-9, `max error ${worst}`);
check('STEPS: the total entropy is the sum of the three blocks', close(s.hist[6].S, sum, 1e-9) && s.hist[6].seg.blocks.length === 3 && close(s.hist[6].seg.blocks.reduce((a, b) => a + b, 0), sum, 1e-9));
check('STEPS: the blocks are positive and the arrow ends at height cos³ 50°', s.hist[6].seg.blocks.every((d) => d > 0) && close(s.hist[6].bloch[1], Math.cos(50 * DEG) ** 3, 1e-12));

// A · B: stage A then the ideal reset
await pick('cycle');
check('A · B plays its three steps', await played(3));
s = await state();
let e = s.hist[3];
check('A · B: stage A leaves ln 2 in the system, no heat', close(s.hist[2].S, LN2, 1e-9) && s.hist[2].heat === 0);
check('A · B: the ideal reset brings |0⟩ back, entropy 0', close(e.bloch[1], 1, 1e-12) && close(e.S, 0, 1e-9));
check('A · B: heat paid = floor = ln 2, extra 0 (equality: I = D = 0)', close(e.heat, LN2, 1e-9) && close(e.floor, LN2, 1e-9) && e.extra === 0);
check('A · B: the key readout prints heat = floor + extra', (await page.textContent('#roKey')).replace(/\s+/g, ' ').includes('0.693 = 0.693 + 0.000'));

// ONE-QUBIT BATH: Chapter 8's table
await pick('bath');
check('ONE-QUBIT BATH plays its three steps', await played(3));
s = await state();
e = s.hist[3];
const row = swapRow(0.9);
check('ONE-QUBIT BATH at p = 0.9: the table row 0.3681 · 0 · 0.5108 · 0.8789', close(e.step.floor, 0.3681, 6e-5) && close(e.step.I, 0, 1e-9) && close(e.step.D, 0.5108, 6e-5) && close(e.step.Q, 0.8789, 6e-5));
check('ONE-QUBIT BATH: the page agrees with the closed forms of the chapter', close(e.step.floor, row.drop, 1e-9) && close(e.step.D, row.D, 1e-9) && close(e.step.Q, row.Q, 1e-9));
check('ONE-QUBIT BATH: D is the bath qubit pushed from diag(p, 1 − p) to ½I', close(Dq([0, 0], [0, 0.8]), e.step.D, 1e-9) && close(e.step.bathBefore[1], 0.8, 1e-12) && close(Math.hypot(...e.step.bathAfter), 0, 1e-12));
check('ONE-QUBIT BATH: both balances hold and βQ = −ΔS + I + D', close(e.step.reservoirBalance, 0, 1e-9) && close(e.step.unitaryBalance, 0, 1e-9) && close(e.step.Q, -e.step.dSsys + e.step.I + e.step.D, 1e-12));
check('ONE-QUBIT BATH: strictly above the floor, by I + D', e.heat > e.floor && close(e.heat - e.floor, e.extra, 1e-9) && e.extra > 0);
check('ONE-QUBIT BATH: the system climbs back only to height 2p − 1', close(e.bloch[1], 0.8, 1e-12) && close(e.bloch[0], 0, 1e-12));
let rowsBad = '';
for (const [p, drop, D, Q] of [[0.6, 0.0201, 0.0204, 0.0405], [0.75, 0.1308, 0.1438, 0.2747], [0.99, 0.6371, 1.6145, 2.2516], [0.999, 0.6852, 2.7612, 3.4465]]) {
  await setRange('pop', p); s = await state(); const st = s.hist[3].step;
  if (!(close(st.floor, drop, 6e-5) && close(st.D, D, 6e-5) && close(st.Q, Q, 6e-5) && close(st.I, 0, 1e-9))) rowsBad += ` p=${p}: ${st.floor} ${st.D} ${st.Q}`;
}
check('the population slider reproduces the other four rows of the chapter\'s table', !rowsBad, rowsBad);
check('moving a slider leaves the card', s.preset === null && close(s.p, 0.999));

// COPY · UNDO
await pick('copy');
check('COPY · UNDO plays its three steps', await played(3));
s = await state();
const c2 = s.hist[2], c3 = s.hist[3];
// the copy as a state vector: (|0⟩ + |1⟩)/√2 ⊗ |0⟩ → (|00⟩ + |11⟩)/√2
const psi = [Math.SQRT1_2, 0, 0, Math.SQRT1_2], Jv = psi.map((a) => psi.map((b) => a * b));
check('COPY: the joint state is (|00⟩ + |11⟩)/√2', c2.J.every((row, i) => row.every((x, j) => close(x, Jv[i][j], 1e-12))));
check('COPY: local entropy ln 2, the whole is pure (entropy 0), no heat', close(c2.S, LN2, 1e-9) && close(c2.Sglob, 0, 1e-7) && c2.heat === 0 && c2.linked);
check('COPY: the system\'s reduced state equals the pinched one, and so does the reduced state of a copied ½I', close(c2.bloch[0], 0, 1e-12) && close(c2.bloch[1], 0, 1e-12));
check('UNDO: the arrow is flat again, the record bit blank, entropy 0', close(c3.bloch[0], 1, 1e-12) && !c3.linked && close(c3.S, 0, 1e-9) && c3.heat === 0);
await page.evaluate(() => window.ERASE_DEBUG.seek(2)); await settle(page);
check('while linked, both resets and a second copy are unavailable, undo is', await page.evaluate(() => ['reset', 'swap', 'copy'].every((o) => document.querySelector(`#ops [data-op="${o}"]`).disabled) && !document.querySelector('#ops [data-op="uncopy"]').disabled));

// operations and the rail
await page.click('#restart'); s = await state();
check('Clear the ledger: no steps, the rail disabled, undo copy unavailable', s.n === 0 && await page.evaluate(() => document.getElementById('play').disabled && document.querySelector('#ops [data-op="uncopy"]').disabled));
await setRange('alpha', 90);
await op('rot'); await op('pinch'); await op('swap'); s = await state();
check('three presses write three steps and end on the last', s.n === 3 && close(s.t, 3) && s.ops.join() === 'rot,pinch,swap');
await page.evaluate(() => window.ERASE_DEBUG.seek(2)); await settle(page);
await op('reset'); s = await state();
check('a press with the rail part-way replaces the later steps', s.ops.join() === 'rot,pinch,reset' && close(s.hist[3].heat, LN2, 1e-9));
await setRange('alpha', 60); s = await state();
check('the turn slider changes every turn of the ledger', close(s.hist[1].bloch[0], Math.sin(60 * DEG), 1e-12) && close(s.hist[2].S, Sq(pinch(turn([0, 1], 60 * DEG))), 1e-9));

// random ledgers of turns and pinches against the arrow geometry
let worstR = 0;
for (const seq of [['rot', 'pinch', 'pinch', 'rot', 'pinch'], ['rot', 'rot', 'pinch', 'rot', 'pinch', 'rot', 'pinch']]) {
  for (const a of [30, 75, 140]) {
    await page.click('#restart'); await setRange('alpha', a);
    for (const o of seq) await op(o);
    s = await state(); let v = [0, 1];
    seq.forEach((o, k) => {
      const h = s.hist[k + 1];
      if (o === 'rot') v = turn(v, a * DEG); else { worstR = Math.max(worstR, Math.abs(h.step.D - Dq(v, pinch(v)))); v = pinch(v); }
      worstR = Math.max(worstR, Math.abs(h.bloch[0] - v[0]), Math.abs(h.bloch[1] - v[1]), Math.abs(h.S - Sq(v)));
    });
  }
}
check('six ledgers × turns and pinches: arrows, entropies and every D agree with the independent geometry', worstR < 1e-9, `max error ${worstR}`);

// rail and keyboard
await pick('cycle'); await played(3);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Home'); s = await state();
check('Home returns to the start', close(s.t, 0) && close(s.now.bloch[1], 1, 1e-12));
await page.keyboard.press('ArrowRight'); check('→ steps one step forward', close((await state()).t, 1));
await page.keyboard.press('End'); check('End goes to the last step', close((await state()).t, 3));
await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).t, 2));
await setRange('now', 2.5); s = await state();
check('half-way through the reset the ledger is half-way too', close(s.now.heat, LN2 / 2, 1e-9) && close(s.now.S, LN2 / 2, 1e-9));
await page.keyboard.press('Home'); await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.ERASE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ goes back to the start', close((await state()).t, 0));

// English
await page.click('[data-lang-set="en"]'); await pick('pinch'); await played(2); await settle(page);
check('English: the HUD reads “Step 2 · pinch Π”', (await page.textContent('#hudBig')).trim() === 'Step 2 · pinch Π');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
