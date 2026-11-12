#!/usr/bin/env node
// Browser regression suite for SYNDROME//DECODE (books/quantum-geometry/viz/syndrome-decoding/):
//   node books/quantum-geometry/viz/tests/syndrome-decoding.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first. Then every control and every claim of the page against a model written here with dense
// matrices: X and Z on three qubits as 8 × 8 Kronecker products, the checks g₁ = Z₁Z₂ and g₂ = Z₂Z₃ as matrices whose
// expectation value on the damaged state gives the syndrome, commutation read off from g·E ∓ E·g, the rooms as 8 × 2
// embeddings S_j = E_j V, and decoding as Σ_i S_iᵀ ρ' S_i (the page uses bit arithmetic and symplectic parities).
// The page is read through window.SYNDROME_DEBUG.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'syndrome-decoding';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent model ---------- */
const close = (a, b, eps = 1e-12) => Math.abs(a - b) <= eps;
const I2 = [[1, 0], [0, 1]], X = [[0, 1], [1, 0]], Z = [[1, 0], [0, -1]];
const kron = (A, B) => { const n = A.length, m = B.length, K = []; for (let i = 0; i < n * m; i++) { K.push([]); for (let j = 0; j < n * m; j++) K[i].push(A[Math.floor(i / m)][Math.floor(j / m)] * B[i % m][j % m]); } return K; };
const mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((s, _v, k) => s + A[i][k] * B[k][j], 0)));
const tp = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const add = (A, B) => A.map((r, i) => r.map((v, j) => v + B[i][j]));
const scale = (A, s) => A.map((r) => r.map((v) => v * s));
const mv = (A, v) => A.map((r) => r.reduce((s, x, k) => s + x * v[k], 0));
const on = (k, M) => [0, 1, 2].map((j) => (j === k ? M : I2)).reduce((a, b) => kron(a, b));
const ID8 = on(0, I2);
/** The Pauli operator X^x Z^z (Z acts first) as an 8 × 8 matrix. */
const op = (e) => [0, 1, 2].reduce((M, k) => { let f = ID8; if (e.z[k]) f = mul(on(k, Z), f); if (e.x[k]) f = mul(on(k, X), f); return mul(f, M); }, ID8);
const G = [mul(on(0, Z), on(1, Z)), mul(on(1, Z), on(2, Z))];
const e8 = (i) => { const v = new Array(8).fill(0); v[i] = 1; return v; };
const V = tp([e8(0), e8(7)]);                                     // 8 × 2: |0⟩ ↦ |000⟩, |1⟩ ↦ |111⟩
const ROOMS = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]].map((x) => mul(op({ x, z: [0, 0, 0] }), V));
const anticommutes = (g, E) => { const d = add(mul(g, E), mul(E, g)); return d.every((r) => r.every((v) => close(v, 0))); };
const outer = (v) => v.map((a) => v.map((b) => a * b));
const decode = (rho8) => ROOMS.reduce((acc, S) => add(acc, mul(tp(S), mul(rho8, S))), [[0, 0], [0, 0]]);
const logical = (th) => [Math.cos(th * Math.PI / 360), Math.sin(th * Math.PI / 360)];
/** Expected outcome of one error on logical angle θ: damaged state, syndrome, decoded matrix, overlap. */
function model(e, th) {
  const [a, b] = logical(th), psi = mv(V, [a, b]), dam = mv(op(e), psi);
  const syn = G.map((g) => { const ex = dam.reduce((s, v, i) => s + v * mv(g, dam)[i], 0); return ex < 0 ? 1 : 0; });
  const D = decode(outer(dam)), fid = a * a * D[0][0] + 2 * a * b * D[0][1] + b * b * D[1][1];
  return { psi, dam, syn, D, fid, comm: G.map((g) => (anticommutes(g, op(e)) ? 1 : 0)) };
}
const vecEq = (u, v, eps = 1e-12) => u.length === v.length && u.every((x, i) => close(x, v[i], eps));
const matEq = (A, B, eps = 1e-12) => A.every((r, i) => r.every((x, j) => close(x, B[i][j], eps)));

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.SYNDROME_DEBUG.state); };
const seek = async (t) => { await D((v) => window.SYNDROME_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const played = async () => {
  const ok = await until(page, () => { const s = window.SYNDROME_DEBUG.state; return s.preset !== null && s.t > 0; });
  await D(() => window.SYNDROME_DEBUG.seek(3)); await settle(page);
  return ok;
};
/** The page's branch against the matrix model at every step. */
function agrees(br, e, th) {
  const m = model(e, th), fixE = { x: br.fix, z: [0, 0, 0] }, fixed = mv(op(fixE), m.dam);
  return vecEq(br.amps[0], m.psi) && vecEq(br.amps[1], m.dam) && vecEq(br.amps[2], m.dam) && vecEq(br.amps[3], fixed)
    && br.syn.join() === m.syn.join() && br.syn.join() === m.comm.join();
}

let s = await state();
check('opens on ONE FLIP at the corrected step', s.preset === 'single' && s.step === 3 && !s.playing);
let m = model({ x: [1, 0, 0], z: [0, 0, 0] }, 90);
check('ONE FLIP: X₁ on |+⟩, amplitudes at every step match the 8 × 8 matrices', agrees(s.branches[0], { x: [1, 0, 0], z: [0, 0, 0] }, 90));
check('ONE FLIP: only g₁ lights (⟨g₁⟩ = −1, ⟨g₂⟩ = +1) and g₁ anticommutes with X₁', s.branches[0].syn.join() === '1,0' && m.comm.join() === '1,0');
check('ONE FLIP: the decoder flips qubit 1 back and the state is back on |+⟩ exactly', s.branches[0].fix.join() === '1,0,0' && vecEq(s.branches[0].amps[3], m.psi));
check('ONE FLIP: decoded matrix = ρ, overlap 1, trace 1', matEq(s.decoded, outer(logical(90))) && matEq(m.D, s.decoded) && close(s.fidelity, 1) && close(s.trace, 1));
check('the key readout prints the overlap', (await page.textContent('#roKey')).trim() === '1.0000');

// all single X errors: the syndrome table of step 2
let table = true;
for (const [x, syn] of [[[0, 0, 0], '0,0'], [[1, 0, 0], '1,0'], [[0, 1, 0], '1,1'], [[0, 0, 1], '0,1']]) {
  const mm = model({ x, z: [0, 0, 0] }, 90);
  if (mm.syn.join() !== syn || mm.comm.join() !== syn || !close(mm.fid, 1)) table = false;
}
check('model: the four single-flip syndromes are (+,+), (−,+), (−,−), (+,−) and all are recovered', table);
check('model: the four rooms are pairwise orthogonal, S_iᵀS_j = δ_ij I₂', ROOMS.every((A, i) => ROOMS.every((B, j) => matEq(mul(tp(A), B), i === j ? I2 : [[0, 0], [0, 0]]))));

// clicking qubits and the error kinds, against the matrices
await D(() => window.SYNDROME_DEBUG.seek(0));
let q = await D(() => window.SYNDROME_DEBUG.qubit(1));
await page.mouse.click(q[0], q[1]);
check('clicking a qubit plays from the error step', await until(page, () => window.SYNDROME_DEBUG.state.t > 1));
s = await seek(3);
check('clicking qubit 2 adds X₂ on top of X₁ and leaves the card', s.preset === null && s.err.x.join() === '1,1,0');
check('X₁X₂: page agrees with the matrices at every step', agrees(s.branches[0], { x: [1, 1, 0], z: [0, 0, 0] }, s.theta));
await page.click('#kindChips [data-kind="Z"]');
q = await D(() => window.SYNDROME_DEBUG.qubit(2));
await page.mouse.click(q[0], q[1]); s = await seek(3);
check('the Z chip makes a click add a phase error', s.kind === 'Z' && s.err.z.join() === '0,0,1');
check('X₁X₂Z₃: page agrees with the matrices, decoded matrix too', agrees(s.branches[0], { x: [1, 1, 0], z: [0, 0, 1] }, s.theta) && matEq(s.decoded, model({ x: [1, 1, 0], z: [0, 0, 1] }, s.theta).D));
await page.click('#clear'); s = await state();
check('“clear errors” removes every error', s.err.x.join() === '0,0,0' && s.err.z.join() === '0,0,0' && s.t === 0);
await page.click('#kindChips [data-kind="X"]');
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('3'); s = await seek(3);
check('key 3 flips qubit 3, syndrome (+,−), recovered', s.err.x.join() === '0,0,1' && s.branches[0].syn.join() === '0,1' && close(s.fidelity, 1));
await D(() => { const el = document.getElementById('theta'); el.value = '200'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('the θ slider sets α = cos(θ/2), β = sin(θ/2)', s.theta === 200 && close(s.alpha, Math.cos(100 * Math.PI / 180)) && close(s.beta, Math.sin(100 * Math.PI / 180)) && agrees(s.branches[0], { x: [0, 0, 1], z: [0, 0, 0] }, 200));
// the rail
await page.keyboard.press('Home'); s = await state();
check('Home: step 0, the encoded state', s.step === 0 && s.t === 0);
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps one step', s.step === 1 && close(s.t, 1));
await page.keyboard.press('Home'); await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.SYNDROME_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ goes back to step 0', (await state()).t === 0);

// ROOMS: X₂, the bars move whole into one room
await pick('rooms'); check('ROOMS plays', await played()); s = await seek(2);
m = model({ x: [0, 1, 0], z: [0, 0, 0] }, 60);
const inRoom = (v, S) => { const p = mv(tp(S), v); return p[0] * p[0] + p[1] * p[1]; };
check('ROOMS: X₂ on θ = 60°, page agrees with the matrices', s.err.x.join() === '0,1,0' && agrees(s.branches[0], { x: [0, 1, 0], z: [0, 0, 0] }, 60));
check('ROOMS: the whole state lies in room X₂ and nothing in the other three', close(inRoom(m.dam, ROOMS[2]), 1) && [0, 1, 3].every((j) => close(inRoom(m.dam, ROOMS[j]), 0)) && s.branches[0].room === 2);
check('ROOMS: α, β ride along unchanged (S₂ᵀ of the damaged state is (α, β))', vecEq(mv(tp(ROOMS[2]), m.dam), logical(60)));

// ROOMS, the cited still: the checks are read and the bars stand in the room, the decoder has not flipped anything yet
{
  const KET = ['000', '001', '010', '011', '100', '101', '110', '111'];
  const shot = await T.newPage();
  for (const lang of ['zh', 'en']) {
    await T.goto(BOOK, ID, `?shot=1&lang=${lang}&preset=rooms`, shot); await settle(shot);
    const r = await shot.evaluate(() => ({
      s: window.SYNDROME_DEBUG.state,
      amber: [...document.querySelectorAll('.tags .tag')].filter((e) => !e.hidden && e.querySelector('.c-am')).length,
      sub: document.getElementById('hudSub').textContent, big: document.getElementById('hudBig').textContent
    }));
    const b = r.s.branches[0], mod = model(b.err, r.s.theta);
    const on = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => Math.abs(mod.dam[i]) > 1e-9), syn = `(${mod.syn.map((v) => (v ? '−1' : '+1')).join(',')})`;
    const md = fs.readFileSync(new URL(`../../${lang}/ch14-cloning-codes-and-braids.md`, import.meta.url), 'utf8');
    const cap = (/::: \{\.viz src="syndrome-decoding" preset="rooms"[^}]*\}\n([\s\S]*?)\n:::/.exec(md) || [, ''])[1];
    check(`ROOMS still (${lang}): stops after the checks are read, before the decoder acts (no amber flip on the stage)`, r.s.t === 2 && r.amber === 0 && !r.sub.includes(lang === 'zh' ? '翻回' : 'flip'), JSON.stringify([r.s.t, r.amber, r.sub]));
    check(`ROOMS still (${lang}): both lights on and the bars in room ${syn}, the other three empty (matrices)`, mod.syn.join() === '1,1' && b.syn.join() === mod.syn.join() && r.big.includes(syn.replace(',', ', ')) && vecEq(b.amps[2], mod.dam));
    const want = ['$(-1,-1)$', ...on.map((i) => `\\lvert ${KET[i]}\\rangle`)];
    check(`ROOMS still (${lang}): the caption names room (−1,−1) and the kets ${on.map((i) => KET[i]).join(', ')} that carry the bars`, on.length === 2 && want.every((x) => cap.includes(x)), want.filter((x) => !cap.includes(x)).join(' '));
  }
  await shot.close();
}

// MIX: σ = diag(½, ¼, ⅛, ⅛), decoding gives Tr σ · ρ
await pick('mix'); check('σ MIX plays', await played()); s = await state();
const sig = [0.5, 0.25, 0.125, 0.125];
check('σ MIX: four branches with weights ½, ¼, ⅛, ⅛ on I, X₁, X₂, X₃', s.noise === 'mix' && s.branches.length === 4 && s.branches.every((b, j) => close(b.w, sig[j]) && b.room === j));
let rho8 = [...Array(8)].map(() => new Array(8).fill(0));
const psiP = mv(V, logical(90));
sig.forEach((w, j) => { const d = mv(ROOMS[j], logical(90)); rho8 = add(rho8, scale(outer(d), w)); });
const Dm = decode(rho8);
check('σ MIX: Σ_i S_iᵀ(Σ_j σ_j S_j ρ S_jᵀ)S_i = Tr σ · ρ (matrices) and the page agrees', matEq(Dm, outer(logical(90))) && matEq(s.decoded, Dm) && close(s.trace, 1) && close(s.fidelity, 1));
let rhoC = rho8.map((r) => r.slice());
const cross = scale(add(mul(mul(ROOMS[0], outer(logical(90))), tp(ROOMS[1])), mul(mul(ROOMS[1], outer(logical(90))), tp(ROOMS[0]))), 0.3);
rhoC = add(rhoC, cross);
check('model: off-diagonal σ₀₁ coherences are cut by decoding as well', matEq(decode(rhoC), Dm));
check('σ MIX: every branch is brought back to the encoded state', s.branches.every((b) => vecEq(b.amps[3], psiP)));

// TWO FLIPS: X₁X₂ on |000⟩ → |111⟩
await pick('two'); check('TWO FLIPS plays', await played()); s = await state();
m = model({ x: [1, 1, 0], z: [0, 0, 0] }, 0);
check('TWO FLIPS: X₁X₂ lights exactly what X₃ lights', s.branches[0].syn.join() === m.syn.join() && m.syn.join() === model({ x: [0, 0, 1], z: [0, 0, 0] }, 0).syn.join() && m.syn.join() === '0,1');
check('TWO FLIPS: the decoder flips qubit 3 and the state ends on |111⟩, overlap 0', s.branches[0].fix.join() === '0,0,1' && vecEq(s.branches[0].amps[3], e8(7)) && close(s.fidelity, 0) && close(m.fid, 0));
check('TWO FLIPS: the readout names a logical X', (await page.textContent('#roNet')).includes('逻辑 X'));

// PHASE: Z₁ on |+⟩ → |−⟩, no light
await pick('phase'); check('PHASE plays', await played()); s = await state();
m = model({ x: [0, 0, 0], z: [1, 0, 0] }, 90);
check('PHASE: Z₁ commutes with both checks, no light, no correction', s.branches[0].syn.join() === '0,0' && m.comm.join() === '0,0' && s.branches[0].fix.join() === '0,0,0');
check('PHASE: the state stays in the code room but becomes |−_L⟩, overlap 0', vecEq(s.branches[0].amps[3], [Math.SQRT1_2, 0, 0, 0, 0, 0, 0, -Math.SQRT1_2]) && close(inRoom(m.dam, ROOMS[0]), 1) && close(s.fidelity, 0) && close(m.fid, 0));

// noise chips
await page.click('#noiseChips [data-noise="mix"]'); s = await state();
check('the mixture chip switches to the four branches and leaves the card', s.noise === 'mix' && s.preset === null && s.branches.length === 4);
await page.click('#noiseChips [data-noise="one"]'); s = await state();
check('the one-error chip switches back', s.noise === 'one' && s.branches.length === 1);

// English
await page.click('[data-lang-set="en"]'); await pick('single'); await played();
check('English: the HUD names the step and the syndrome', (await page.textContent('#hudBig')).startsWith('correct · syndrome'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
