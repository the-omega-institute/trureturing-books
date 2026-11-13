#!/usr/bin/env node
// Browser & mathematical regression suite for ORTHO//LEDGER (books/quantum-geometry/viz/observer-escape-ledger/):
//   node books/quantum-geometry/viz/tests/observer-escape-ledger.test.mjs
// Runs stageFirstChecks first, then independently verifies:
//   1. Closed 4×4 Hamiltonian Moore/Hilbert loop (16 distinct grid points, d_in = d_out = 1 on all 16 steps including #15 → #00);
//   2. Exhaustive combinatorics across all 2⁵ = 32 subsets of {L₁…L₅}: ordered escapePairs vs unordered chords (2:1),
//      ∑|F_T(y)|² = 16 + |EscapePairs_ord|, H₂^escape(S|T) = log₂(1 + 15·E(T)), I_ledger + H₂^escape = 4.000 bits,
//      leave-one-out disjoint union |Escape(T\{i})| = |Escape(T)| + |uniqueCapture(i; T)|, zero novelty of L₅ = b₀⊕b₁
//      when L₁, L₂ are ON, context-dependent novelty of L₅ when L₂ is OFF, 8 chords (16 ordered pairs) & uniform 0.50
//      single-bit marginals when 4-body parity L₄ turns OFF, and refinement monotonicity of conditionalLogicalImpurity;
//   3. Quantum two-qubit Bell |Φ⁺⟩⟨Φ⁺| vs ρ_cl vs ¼I₄ identical ½I₂ local marginals & 9/15 = 60% blind spot;
//   4. Zeckendorf golden capacity log₂φ ≈ 0.69424, Parry p₁ = 1/(φ√5) ≈ 0.27639, Dottie −log₂sin θ* ≈ 0.57001,
//      and exact non-asymptotic 14-bit block-B₁ avoidance bound φ^(H+1)(1 − φ⁻¹⁴)^⌊H/14⌋ across H = 0…28;
//   5. All 6 citable presets, interactive toggles, mobile 390×844 HUD non-overlap (zh & en), and VIZ_SLOW_FRAMES playback.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'observer-escape-ledger';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent mathematical reference engine ---------- */
function refEvalLemma(bits, idx) {
  const [b0, b1, b2, b3] = bits;
  if (idx === 0) return b0;
  if (idx === 1) return b1;
  if (idx === 2) return b2;
  if (idx === 3) return b0 ^ b1 ^ b2 ^ b3;
  return b0 ^ b1;
}

function refMaskStats(states, mask) {
  const N = states.length;
  const buckets = new Map();
  for (let k = 0; k < N; k++) {
    let key = '';
    for (let i = 0; i < 5; i++) if ((mask >> i) & 1) key += String(refEvalLemma(states[k].bits, i));
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(k);
  }
  const fibers = [...buckets.values()];
  let ord = 0, unord = 0;
  for (let a = 0; a < N; a++) {
    for (let b = 0; b < N; b++) {
      if (a === b) continue;
      let same = true;
      for (let i = 0; i < 5; i++) {
        if (((mask >> i) & 1) && refEvalLemma(states[a].bits, i) !== refEvalLemma(states[b].bits, i)) {
          same = false;
          break;
        }
      }
      if (same) {
        ord++;
        if (a < b) unord++;
      }
    }
  }
  const sumSq = fibers.reduce((acc, f) => acc + f.length * f.length, 0);
  const E = ord / (N * (N - 1));
  const h2 = Math.log2(1 + (N - 1) * E);
  const impState = 1 - fibers.length / N;
  let impParity = 0;
  for (const f of fibers) {
    let n1 = 0;
    for (const k of f) n1 += refEvalLemma(states[k].bits, 3);
    const n0 = f.length - n1;
    impParity += (2 * n0 * n1) / (N * f.length);
  }
  return { fiberCount: fibers.length, ord, unord, sumSq, E, h2, iLed: 4 - h2, impState, impParity };
}

const PHI_REF = (1 + Math.sqrt(5)) / 2;
const LOG2_PHI_REF = Math.log2(PHI_REF);
const PARRY_P1_REF = 1 / (PHI_REF * Math.sqrt(5));
let thRef = 0.739;
for (let i = 0; i < 80; i++) thRef = Math.cos(thRef);
const RATE_DOTTIE_REF = -Math.log2(Math.sin(thRef));

/* ---------- open page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.LEDGER_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.LEDGER_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => {
  await page.evaluate(([i, val]) => {
    const el = document.getElementById(i);
    el.value = String(val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, [id, v]);
  await settle(page);
};
const stopped = (to) => until(page, (t) => { const s = window.LEDGER_DEBUG.state; return !s.playing && s.step === t; }, to, 300000);
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries viz id observer-escape-ledger', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on default HILBERT card at its still (step 6, stopped, mask 0b11111, 0 chords)',
  s.preset === 'hilbert' && s.scene === 'duo' && s.mode === 'arena' && s.mask === 0b11111 && s.step === 6 && !s.playing
  && s.currentAnalysis.chordCount === 0 && s.currentAnalysis.orderedEscapeCount === 0,
  JSON.stringify({ preset: s.preset, mask: s.mask, step: s.step, chords: s.currentAnalysis.chordCount }));

/* ---------- 1. Closed 4×4 Hamiltonian Moore/Hilbert Loop ---------- */
const coordsSet = new Set(s.loopStates.map((v) => `${v.x},${v.y}`));
const stateIdSet = new Set(s.loopStates.map((v) => v.stateId));
const allUnitSteps = s.loopStates.every((v, k) => {
  const nxt = s.loopStates[(k + 1) % 16];
  const prv = s.loopStates[(k + 15) % 16];
  const dOut = Math.abs(nxt.x - v.x) + Math.abs(nxt.y - v.y);
  const dIn = Math.abs(v.x - prv.x) + Math.abs(v.y - prv.y);
  return v.x >= 0 && v.x < 4 && v.y >= 0 && v.y < 4 && v.dIn === 1 && v.dOut === 1 && dIn === 1 && dOut === 1;
});
check('4×4 closed Hamiltonian loop visits all 16 grid cells and all 16 4-bit states bijectively with d_in = d_out = 1 (including #15 → #00)',
  s.loopStates.length === 16 && coordsSet.size === 16 && stateIdSet.size === 16 && allUnitSteps);

const noAdjLoopOnes = s.loopStates.every((v, k) => !(v.zBit === 1 && s.loopStates[(k + 1) % 16].zBit === 1));
check('loop Zeckendorf pulse sequence obeys cyclic NoAdjacentOnes across all 16 steps', noAdjLoopOnes);

/* ---------- 2. Exhaustive verification across all 32 subsets of {L₁…L₅} ---------- */
const refStates = s.loopStates.map((v) => ({ bits: v.bitStr.split('').map(Number) }));
let all32Match = true;
let badDetail = '';
for (let m = 0; m < 32; m++) {
  const got = s.allMasks[m];
  const ref = refMaskStats(refStates, m);
  const idOk = got.orderedEscapeCount === 2 * got.chordCount
    && got.sumFiberSq === 16 + got.orderedEscapeCount
    && Math.abs(got.escapeRate - got.orderedEscapeCount / 240) < 1e-15
    && Math.abs(got.escapeRate - got.chordCount / 120) < 1e-15
    && Math.abs(got.h2Escape - ref.h2) < 1e-14
    && Math.abs(got.hTotal - 4) < 1e-14
    && got.fiberCount === ref.fiberCount
    && got.orderedEscapeCount === ref.ord
    && got.chordCount === ref.unord
    && Math.abs(got.impurityState - ref.impState) < 1e-14
    && Math.abs(got.impurityParity - ref.impParity) < 1e-14
    && got.uniqueCapture.every((u) => u.disjointIdentityHolds && u.uniqueOrd === 2 * u.uniqueChords);
  if (!idOk) {
    all32Match = false;
    badDetail = `mask=${m}: got=${JSON.stringify(got)} ref=${JSON.stringify(ref)}`;
    break;
  }
}
check('all 32 subsets of {L₁…L₅}: ordered=2·chords, ∑|F|²=16+ord, E(T) identical, H_total=4.000b, and leave-one-out disjoint union holds',
  all32Match, badDetail);

// Refinement monotonicity across all comparable mask pairs (mCoarse ⊆ mRefined => refined factors onto coarse!)
let monoOk = true;
for (let mc = 0; mc < 32; mc++) {
  for (let mr = 0; mr < 32; mr++) {
    if ((mc & mr) !== mc) continue; // mc is a subset of mr, so mr refines mc via coordinate projection
    if (s.allMasks[mr].impurityState > s.allMasks[mc].impurityState + 1e-14
      || s.allMasks[mr].impurityParity > s.allMasks[mc].impurityParity + 1e-14
      || s.allMasks[mr].orderedEscapeCount > s.allMasks[mc].orderedEscapeCount) {
      monoOk = false;
    }
  }
}
check('refinement_impurity_monotone holds across all 3⁵ = 243 comparable subset pairs (mc ⊆ mr) for both state and parity targets',
  monoOk);

// Specific check of L₅ redundancy vs context-dependent novelty, and L₄ 8-chord synergy jump
const mFull = s.allMasks[0b11111];
const mNoL5 = s.allMasks[0b01111];
const mNoL2WithL5 = s.allMasks[0b11101]; // {L₁, L₃, L₄, L₅}
const mNoL2NoL5 = s.allMasks[0b01101];   // {L₁, L₃, L₄}
const mThree = s.allMasks[0b00111];      // {L₁, L₂, L₃}
check('L₅ = b₀⊕b₁ has 0 uniqueCapture chords when L₁, L₂ are ON (0b11111 → 0b01111 adds 0 chords), and becomes structurally novel (8 chords / 16 ord) when L₂ is OFF',
  mFull.uniqueCapture[4].uniqueChords === 0
  && mFull.uniqueCapture[4].lowersEscape === false
  && mNoL5.chordCount === 0
  && mNoL5.uniqueCapture.slice(0, 4).every((u) => u.uniqueChords === 8 && u.uniqueOrd === 16 && u.lowersEscape === true)
  && mNoL2NoL5.chordCount === 8
  && mNoL2WithL5.chordCount === 0
  && mNoL2WithL5.uniqueCapture[4].uniqueChords === 8);

check('dropping 4-body XOR parity L₄ from {L₁,L₂,L₃,L₄} pops exact 8 unordered chords (16 ordered pairs), E = 1/15, H₂^escape = 1.000 bit, and parity impurity stays 0.500',
  mThree.fiberCount === 8 && mThree.chordCount === 8 && mThree.orderedEscapeCount === 16
  && Math.abs(mThree.escapeRate - 1 / 15) < 1e-15
  && Math.abs(mThree.h2Escape - 1) < 1e-15
  && Math.abs(mThree.iLedger - 3) < 1e-15
  && Math.abs(mThree.impurityParity - 0.5) < 1e-15);

/* ---------- 3. Quantum Bell vs Classical vs Maximally Mixed Marginals ---------- */
const isHalfI = (M) => Math.abs(M[0][0] - 0.5) < 1e-15 && Math.abs(M[1][1] - 0.5) < 1e-15 && Math.abs(M[0][1]) < 1e-15 && Math.abs(M[1][0]) < 1e-15;
check('Bell |Φ⁺⟩⟨Φ⁺|, ρ_cl, and ¼I₄ share identical ½I₂ reduced marginals on both factors',
  ['bell', 'classical', 'mix'].every((k) => isHalfI(s.qStates[k].rhoA) && isHalfI(s.qStates[k].rhoB)));

/* ---------- 4. Zeckendorf Golden Capacity, Parry p₁, Dottie Rate & 14-Bit Avoidance Bound ---------- */
check('Zeckendorf constants match exact formulas: log₂φ ≈ 0.69424, tax ≈ 0.30576, Parry p₁ = 1/(φ√5) ≈ 0.27639, −log₂sin θ* ≈ 0.57001',
  Math.abs(s.log2Phi - LOG2_PHI_REF) < 1e-14
  && Math.abs(s.stabilityTax - (1 - LOG2_PHI_REF)) < 1e-14
  && Math.abs(s.parryP1 - PARRY_P1_REF) < 1e-14
  && Math.abs(s.parryP0 + s.parryP1 - 1) < 1e-15
  && Math.abs(s.rateDottie - RATE_DOTTIE_REF) < 1e-14);

const fib = [1, 1];
while (fib.length < 35) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
const avoidOk = s.avoidSeries.length === 29 && s.avoidSeries.every((d, H) =>
  d.H === H
  && d.legalCount === fib[H + 1]
  && d.avoidCount <= d.legalCount
  && d.avoidCount <= d.leanBound + 1e-9
  && (H < 14 ? d.avoidCount === d.legalCount : d.avoidCount < d.legalCount)
);
check('uniform_avoidance_count: exact B₁-avoiding legalWords(H, 0) count equals F_{H+2} for H < 14, drops strictly for H ≥ 14 (986 < 987 at H=14), and obeys ≤ φ^(H+1)(1 − φ⁻¹⁴)^⌊H/14⌋ across H = 0…28',
  avoidOk && s.avoidSeries[14].legalCount === 987 && s.avoidSeries[14].avoidCount === 986,
  JSON.stringify(s.avoidSeries[14]));

/* ---------- 5. All 6 Citable Experiment Cards & Playback ---------- */
// Test full auto-stop playback on NOVELTY card (works cleanly under VIZ_SLOW_FRAMES=1000)
await pick('novelty');
check('ZERO-NOVELTY card plays and auto-stops cleanly at step 12', await stopped(12));
s = await state();
check('ZERO-NOVELTY card sets mask 0b01111 ({L₁…L₄}), 0 escape chords, H₂^escape = 0.000 bits',
  s.mask === 0b01111 && s.currentAnalysis.chordCount === 0 && (await text('#roKey')) === '0.000 bits');

await pick('escape');
s = await seek(5);
check('XOR-SYNERGY card sets mask 0b00111 ({L₁,L₂,L₃}), 8 escape chords (16 ordered pairs), H₂^escape = 1.000 bits',
  s.mask === 0b00111 && s.currentAnalysis.chordCount === 8 && s.currentAnalysis.orderedEscapeCount === 16
  && (await text('#roKey')) === '1.000 bits' && (await text('#pillChords')).includes('8'));

await pick('marginal');
s = await seek(8);
check('BELL-BLIND-SPOT card activates marginal mode on |Φ⁺⟩⟨Φ⁺| with 9 / 15 = 60.0% correlation blind-spot readout',
  s.mode === 'marginal' && s.qState === 'bell' && (await text('#roKey')) === '9 / 15 = 60.0%');

await pick('zeckendorf');
s = await seek(14);
check('GOLDEN-CAPACITY card sets cutK = 4 on golden rate with rebound 2^(4·log₂φ) = φ⁴ ≈ 6.85×',
  s.mode === 'arena' && s.cutK === 4 && s.rateKind === 'golden' && (await text('#pAMeta')).includes('6.85'));

await pick('dream');
s = await seek(10);
check('DREAM-RECOHERE card contrasts 2-bit awake Landauer erasure against dream recoherence with cutK = 4 on Dottie rate (×4.86)',
  s.mode === 'arena' && s.mask === 0b00011 && s.cutK === 4 && s.rateKind === 'dottie'
  && s.currentAnalysis.h2Escape === 2 && (await text('#pAMeta')).includes('4.86'));

/* ---------- 6. Interactive Controls & Keyboard Shortcuts ---------- */
await pick('hilbert'); await seek(0);
await page.click('#lemmaChips [data-lemma="4"]'); // toggle L₅ OFF
s = await state();
check('clicking L₅ chip toggles mask from 0b11111 to 0b01111 with 0 escape chords and clears active preset',
  s.mask === 0b01111 && s.currentAnalysis.chordCount === 0 && s.preset === null);

await page.click('#lemmaChips [data-lemma="3"]'); // toggle L₄ OFF
s = await state();
check('clicking L₄ chip toggles mask to 0b00111 and pops 8 escape chords',
  s.mask === 0b00111 && s.currentAnalysis.chordCount === 8);

await setRange('cutK', 6);
s = await state();
check('cut-depth slider cutK updates Δk = 6', s.cutK === 6);

await page.click('#modeChips [data-mode="marginal"]');
await page.click('#qStateChips [data-qstate="classical"]');
s = await state();
check('switching to marginal mode and selecting ρ_cl updates readout to I(A:B) = 1.00b',
  s.mode === 'marginal' && s.qState === 'classical' && (await text('#ro2')).includes('1.00b'));

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); s = await state(); check('key 2 switches to Loop scene', s.scene === 'lattice');
await page.keyboard.press('3'); s = await state(); check('key 3 switches to Ledger scene', s.scene === 'ledger');
await page.keyboard.press('1'); s = await state(); check('key 1 switches to Twin scene', s.scene === 'duo');
await page.keyboard.press('l'); s = await state(); check('key L toggles L₄ and returns to arena mode', s.mode === 'arena' && s.mask === 0b01111);

/* ---------- 7. Responsive Phone Layout & HUD Non-Overlap (zh & en) ---------- */
await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
s = await state();
check('Twin scene stacks panels cleanly on 390×844 phone viewport', s.stacked === true);
const ALL_CARDS = [['hilbert', 6], ['novelty', 6], ['escape', 5], ['marginal', 8], ['zeckendorf', 14], ['dream', 10]];
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 40);
  const overlaps = [];
  for (const [cid, st] of ALL_CARDS) {
    await pick(cid); await seek(st);
    const hit = await page.evaluate(() => {
      const a = document.querySelector('.hud-tl').getBoundingClientRect();
      const b = document.querySelector('.hud-tr').getBoundingClientRect();
      const sep = a.right + 4 <= b.left || b.right + 4 <= a.left || a.bottom + 4 <= b.top || b.bottom + 4 <= a.top;
      return sep ? null : { tl: [a.left, a.top, a.right, a.bottom], tr: [b.left, b.top, b.right, b.bottom] };
    });
    if (hit) overlaps.push(`${cid}:${JSON.stringify(hit)}`);
  }
  check(`390×844 (${lang}): .hud-tl and .hud-tr never overlap across all 6 presets`, overlaps.length === 0, overlaps.join(' | '));
}

await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 120);
s = await state();
check('Twin scene lays out panels side-by-side on wide desktop viewport', s.stacked === false);

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
