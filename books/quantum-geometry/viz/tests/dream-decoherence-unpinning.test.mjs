#!/usr/bin/env node
// Browser regression suite for ORTHO//DREAM (books/quantum-geometry/viz/dream-decoherence-unpinning/):
//   node books/quantum-geometry/viz/tests/dream-decoherence-unpinning.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check for every control and one for each property the page claims, against
// computations written here and never by calling the page's functions: ρ(λ) built from Ψ and explicit projection
// matrices, eigenvalues by an unshifted QR iteration (the page uses Jacobi rotations), entropies from those, the record
// channel from record vectors and the overlap of the Lean definition, the screen from the pure-state amplitude.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'dream-decoherence-unpinning';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.DREAM_DEBUG.state); };
const seek = async (t) => { await D((v) => window.DREAM_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ---------- independent linear algebra ---------- */
const matmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, v, k) => s + v * B[k][j], 0)));
const outer = (u, v) => u.map((x) => v.map((y) => x * y));
const add = (A, B, a = 1, b = 1) => A.map((r, i) => r.map((v, j) => a * v + b * B[i][j]));
const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
const tr = (A) => A.reduce((s, r, i) => s + r[i], 0);
const maxDiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((v, j) => Math.abs(v - B[i][j]))));
/** Eigenvalues of a symmetric PSD matrix by 4000 steps of unshifted QR (modified Gram–Schmidt) on M + I, which is
    non-singular, then shifted back. */
function qrEig(M) {
  let A = M.map((r, i) => r.map((v, j) => v + (i === j ? 1 : 0))); const n = A.length;
  for (let it = 0; it < 4000; it++) {
    const Q = zeros(n), R = zeros(n);
    for (let j = 0; j < n; j++) {
      const v = A.map((r) => r[j]);
      for (let k = 0; k < j; k++) { const q = Q.map((r) => r[k]); const d = q.reduce((s, x, i) => s + x * v[i], 0); R[k][j] = d; for (let i = 0; i < n; i++) v[i] -= d * q[i]; }
      const nv = Math.hypot(...v); R[j][j] = nv; for (let i = 0; i < n; i++) Q[i][j] = nv > 1e-300 ? v[i] / nv : (i === j ? 1 : 0);
    }
    A = matmul(R, Q);
  }
  return A.map((r, i) => r[i] - 1).sort((a, b) => b - a);
}
const entropy = (ev) => ev.reduce((s, x) => (x > 1e-12 ? s - x * Math.log(x) : s), 0);
const proj = (idx, n) => { const P = zeros(n); idx.forEach((i) => { P[i][i] = 1; }); return P; };
const FAM = { fine: [[0], [1], [2], [3]], body: [[0], [1, 2, 3]] };
const psi = (w) => { const o = Math.sqrt((1 - w) / 3); return [Math.sqrt(w), o, o, o]; };
const pinch = (rho, fam) => FAM[fam].reduce((acc, b) => { const Pk = proj(b, 4); return add(acc, matmul(matmul(Pk, rho), Pk)); }, zeros(4));
const rhoOf = (w, lam, fam) => { const pure = outer(psi(w), psi(w)); return add(pure, pinch(pure, fam), 1 - lam, lam); };
const realPart = (rho) => rho.map((r) => r.map((v) => v[0]));
const crossNorm = (A, fam) => { const blk = (i) => FAM[fam].findIndex((b) => b.includes(i)); let s = 0; A.forEach((r, i) => r.forEach((v, j) => { if (blk(i) !== blk(j)) s += v * v; })); return Math.sqrt(s); };

/* ---------- opening ---------- */
let s = await state();
check('page carries its id', (await D(() => document.body.dataset.vizId)) === ID);
check('opens on WAKING at λ = 1, not playing', s.preset === 'waking' && s.scene === 'anchor' && close(s.lam, 1) && !s.playing, JSON.stringify([s.preset, s.lam, s.playing]));

/* ---------- ρ(λ): trace 1, Hermitian, PSD, matches the independent construction; coherence linear in 1 − λ ---------- */
let worst = 0, okPSD = true, okLin = true, okHerm = true, okEnt = true, okIdem = true, okMono = true;
for (const fam of ['fine', 'body']) {
  await page.click(`[data-fam="${fam}"]`); await settle(page);
  for (const w of [0.4, 0.15, 0.7]) {
    await setRange('w', w);
    let c0 = null;
    for (const lam of [0, 0.1, 0.37, 0.5, 0.82, 1]) {
      await setRange('lam', lam); s = await state();
      const R = rhoOf(w, lam, fam), pg = realPart(s.rho);
      worst = Math.max(worst, maxDiff(pg, R), Math.abs(s.trace - 1), Math.abs(s.lam - lam));
      okHerm = okHerm && s.rho.every((r, i) => r.every((v, j) => close(v[0], s.rho[j][i][0], 1e-14) && close(v[1], -s.rho[j][i][1], 1e-14)));
      const ev = qrEig(R);
      okPSD = okPSD && Math.min(...ev) > -1e-10 && close(ev.reduce((a, b) => a + b, 0), 1, 1e-9);
      const pev = s.eig.slice().sort((a, b) => b - a);
      okEnt = okEnt && pev.every((x, i) => close(x, ev[i], 1e-7)) && close(s.entropy, entropy(ev), 1e-6);
      const cn = crossNorm(R, fam); if (lam === 0) c0 = cn;
      okLin = okLin && close(s.cross, (1 - lam) * c0, 1e-12) && close(s.cross, cn, 1e-12);
      const P1 = pinch(R, fam); okIdem = okIdem && maxDiff(pinch(P1, fam), P1) < 1e-14;
      okMono = okMono && entropy(qrEig(P1)) >= entropy(ev) - 1e-9;
    }
  }
}
check('ρ(λ) equals (1 − λ)|Ψ⟩⟨Ψ| + λ Σ PₖΨΨᵀPₖ for both families, three weights, six λ; trace 1', worst < 1e-12, `max error ${worst}`);
check('ρ(λ) is Hermitian', okHerm);
check('ρ(λ) is positive semidefinite (eigenvalues by an independent QR iteration)', okPSD);
check('the page eigenvalues and entropy match the QR eigenvalues', okEnt);
check('the cross-block coherence is (1 − λ) times its value at λ = 0', okLin);
check('pinching is idempotent: 𝒫(𝒫(ρ)) = 𝒫(ρ)', okIdem);
check('pinching never lowers the von Neumann entropy: S(𝒫(ρ)) ≥ S(ρ)', okMono);

// λ = 1, every place: a fixed point (cross cells zero) and the entropy equals D(Ψ‖𝒫Ψ) = −Σ pᵢ ln pᵢ
await page.click('[data-fam="fine"]'); await setRange('w', 0.4); await setRange('lam', 1); s = await state();
const p = psi(0.4).map((x) => x * x), dExp = -p.reduce((a, x) => a + x * Math.log(x), 0);
check('λ = 1, every place: every off-diagonal entry is zero (a pinching fixed point)', s.rho.every((r, i) => r.every((v, j) => i === j || (v[0] === 0 && v[1] === 0))));
check('λ = 1, every place: entropy = D(Ψ‖𝒫Ψ) = −Σ pᵢ ln pᵢ ≈ 1.332', close(s.entropy, dExp, 1e-9) && close(s.relEntropy, dExp, 1e-9) && close(dExp, 1.3322, 1e-4), `${s.entropy} ${dExp}`);
check('the λ slider leaves the card and drives the rail', s.preset === null && close(s.t, 1));

/* ---------- the screen ---------- */
await setRange('lam', 0); s = await state();
const SIG = 0.5, K = 2 * Math.PI / 0.8, d4 = [-1.5, -0.5, 0.5, 1.5], us = [-0.83, -0.4, -0.05, 0, 0.21, 0.6, 0.97];
let scr = await D((u) => window.DREAM_DEBUG.screen(u), us), errS = 0;
us.forEach((u, k) => { const a = psi(0.4); let re = 0, im = 0; a.forEach((x, i) => { re += x * Math.cos(K * d4[i] * u); im += x * Math.sin(K * d4[i] * u); }); const env = Math.exp(-u * u / (2 * SIG * SIG)); errS = Math.max(errS, Math.abs(scr[k].all - env * (re * re + im * im)), Math.abs(scr[k].diag - env)); });
check('λ = 0: the screen is env·|Σ aᵢ e^{iKdᵢu}|², the diagonal part is env', errS < 1e-12, `${errS}`);
await setRange('lam', 1); scr = await D((u) => window.DREAM_DEBUG.screen(u), us);
check('λ = 1, every place: the fringes are gone, the screen equals its diagonal envelope', scr.every((v) => close(v.all, v.diag, 1e-12)));

/* ---------- cards in the anchor scene ---------- */
await pick('waking');
check('WAKING: the card plays by itself', await until(page, () => { const d = window.DREAM_DEBUG.state; return d.preset === 'waking' && (d.playing || d.t > 0); }));
s = await seek(1);
check('WAKING: every place, λ runs 0 → 1', s.fam === 'fine' && close(s.lam, 1) && s.path[0] === 0 && s.path[1] === 1);
await pick('blocks'); s = await seek(1);
const RB = rhoOf(0.4, 1, 'body');
check('TWO-BLOCKS: at λ = 1 the body–rest coherence is zero and the coherence among x₁…x₃ stays', s.fam === 'body' && maxDiff(realPart(s.rho), RB) < 1e-12 && s.rho[0][1][0] === 0 && close(s.rho[1][2][0], (0.6 / 3), 1e-12));
check('TWO-BLOCKS: a fixed point of the two-block pinching', maxDiff(pinch(realPart(s.rho), 'body'), realPart(s.rho)) < 1e-14);
scr = await D((u) => window.DREAM_DEBUG.screen(u), us);
check('TWO-BLOCKS: every fringe left on the screen comes from in-block coherence (drawn cyan), none from cut coherence', scr.every((v) => close(v.all, v.kept, 1e-12)) && scr.some((v) => Math.abs(v.all - v.diag) > 0.05));
await pick('unpin_body'); s = await seek(0);
check('UNPIN: starts at λ = 1', close(s.lam, 1));
s = await seek(1);
check('UNPIN: ends at λ = 0.1 with the off-diagonal entries 0.9 aᵢaⱼ and the diagonal unchanged', close(s.lam, 0.1, 1e-12) && s.rho.every((r, i) => r.every((v, j) => close(v[0], psi(0.4)[i] * psi(0.4)[j] * (i === j ? 1 : 0.9), 1e-12))));

/* ---------- the record scene: Lean's channel, rebuilt from record vectors ---------- */
const C = (re, im = 0) => [re, im], cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], cj = (a) => [a[0], -a[1]];
/** record(i, a): address 0 writes (1, 0), address 1 writes (r e^{iφ}, √(1 − r²)). */
const record = (r, phiDeg) => { const ph = phiDeg * Math.PI / 180; return [[C(1), C(0)], [C(r * Math.cos(ph), r * Math.sin(ph)), C(Math.sqrt(Math.max(0, 1 - r * r)))]]; };
const overlapL = (rec, i, j) => rec[i].reduce((s2, x, a) => { const t = cm(x, cj(rec[j][a])); return [s2[0] + t[0], s2[1] + t[1]]; }, C(0));
const reverseRec = (rec) => rec.map((row) => row.map(cj));
/** multiRecordChannel(records, ρ)ᵢⱼ = (Πₖ overlap(recordsₖ, i, j)) ρᵢⱼ. */
const channel = (recs, rho) => rho.map((row, i) => row.map((v, j) => recs.reduce((acc, rec) => cm(acc, overlapL(rec, i, j)), v)));
const eq = [[C(0.5), C(0.5)], [C(0.5), C(0.5)]];
function expected(r, phi, step) {
  const rec = record(r, phi); let rho = eq;
  if (step >= 1) rho = channel([rec], rho); if (step >= 2) rho = channel([rec], rho);
  if (step >= 3) rho = channel([reverseRec(rec)], rho); if (step >= 4) rho = channel([reverseRec(rec)], rho);
  return rho;
}
await page.click('[data-scene="record"]'); await settle(page);
s = await state();
check('the scene chip switches to the record scene (2 × 2, rail of four steps)', s.scene === 'record' && s.n === 2 && s.max === 4);
let errR = 0;
for (const [r, phi] of [[1, 90], [1, 35], [0.6, 90], [0.3, 150], [0, 90]]) {
  await setRange('r', r); await setRange('phi', phi);
  for (let k = 0; k <= 4; k++) { s = await seek(k); const E = expected(r, phi, k); s.rho.forEach((row, i) => row.forEach((v, j) => { errR = Math.max(errR, Math.hypot(v[0] - E[i][j][0], v[1] - E[i][j][1])); })); }
}
check('every step equals the record channel built from record vectors (five records, five steps)', errR < 1e-12, `${errR}`);
const cPhase = overlapL(record(1, 90), 0, 1);
check('the phase record of the Lean certificate has overlap c = −i, c̄·c = 1', close(cPhase[0], 0, 1e-15) && close(cPhase[1], -1, 1e-15));
await pick('half_erase');
check('HALF-ERASE: the card plays by itself', await until(page, () => { const d = window.DREAM_DEBUG.state; return d.preset === 'half_erase' && d.playing && d.t > 0; }));
await D(() => window.DREAM_DEBUG.jump(2.9));
check('HALF-ERASE: the play stops by itself at step 3', await until(page, () => { const d = window.DREAM_DEBUG.state; return !d.playing && d.t === 3; }));
s = await state();
check('HALF-ERASE: ρ₀₁ = −i/2 (certificate)', close(s.z[0], 0, 1e-12) && close(s.z[1], -0.5, 1e-12));
s = await seek(2);
check('two copies written: ρ₀₁ = −1/2 (certificate)', close(s.z[0], -0.5, 1e-12) && close(s.z[1], 0, 1e-12));
await pick('quantum_eraser'); s = await seek(4);
check('JOINT-REVERSAL: both reversed, ρ₀₁ = 1/2, the whole matrix restored', maxDiff(s.rho.map((r) => r.map((v) => v[0])), [[0.5, 0.5], [0.5, 0.5]]) < 1e-12 && Math.abs(s.z[1]) < 1e-12);
scr = await D((u) => window.DREAM_DEBUG.screen(u), us);
const KB = 2 * Math.PI / 0.5, SB = 0.55;
check('JOINT-REVERSAL: the screen is back to env·(1 + cos Ku)', scr.every((v, k) => close(v.all, Math.exp(-(us[k] ** 2) / (2 * SB * SB)) * (1 + Math.cos(KB * us[k])), 1e-12)));
check('coherence mass = |ρ₀₁|² + |ρ₁₀|² = 1/2', close(s.mass, 0.5, 1e-12));
await pick('zero_overlap_fail'); s = await seek(1);
check('ZERO-OVERLAP: one record with c = 0 kills ρ₀₁', s.r === 0 && Math.hypot(...s.z) === 0);
s = await seek(4);
check('ZERO-OVERLAP: reversing both copies does not restore it (ρ₀₁ = 0, fringes gone)', Math.hypot(...s.z) === 0 && (await D((u) => window.DREAM_DEBUG.screen(u), us)).every((v) => close(v.all, v.diag, 1e-15)));
await setRange('r', 0.6); s = await seek(4);
check('|c| = 0.6: reversing both leaves |c|⁴ = 0.1296 of ρ₀₁', close(Math.hypot(...s.z), 0.5 * 0.6 ** 4, 1e-12) && s.preset === null);

/* ---------- waking ---------- */
await pick('wake_snap'); s = await seek(1);
check('WAKE-SNAP: only the body cell is left after the readout', s.scene === 'wake' && s.rho.every((r, i) => r.every((v, j) => (i === 0 && j === 0 ? close(v[0], 0.4, 1e-12) : v[0] === 0 && v[1] === 0))));
const P0 = proj([0], 4), pf = (lam) => 1 - tr(matmul(P0, rhoOf(0.4, lam, 'fine')));
check('WAKE-SNAP: p_forget = 1 − Tr(P₀ρ_dream) = 0.6', close(s.forget, 0.6, 1e-12) && close(pf(0.1), 0.6, 1e-12));
let okF = true;
for (const lam of [0, 0.3, 0.75, 1]) { await setRange('lam', lam); s = await state(); okF = okF && close(s.lamDream, lam) && close(s.forget, pf(lam), 1e-12) && close(s.forget, 0.6, 1e-12); }
check('waking: the forgotten weight does not depend on the dream λ', okF);
await setRange('w', 0.25); s = await state();
check('the body-weight slider sets |⟨x₀|Ψ⟩|² and the forgotten weight follows (0.75)', close(s.w, 0.25) && close(s.forget, 0.75, 1e-12));
s = await seek(0.5);
check('half way through the readout the other cells are halved', close(s.rho[1][1][0], 0.25 * 0.5, 1e-12) && close(s.rho[0][0][0], 0.25, 1e-12));

/* ---------- keys, drag, rewind, play, language ---------- */
await page.keyboard.press('1'); s = await state();
check('key 1 switches to the anchor scene', s.scene === 'anchor');
await page.keyboard.press('3'); s = await state();
check('key 3 switches to the waking scene', s.scene === 'wake');
await page.keyboard.press('1'); await settle(page);
const at = await D(() => window.DREAM_DEBUG.gridAt(0.25));
await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('dragging sideways on the grid scrubs the rail', close(s.t, 0.25, 0.02), `${s.t}`);
await page.click('#rew'); s = await state();
check('⏮ returns to the start', s.t === 0);
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press(' ');
check('Space plays', await until(page, () => { const d = window.DREAM_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press(' ');
await page.click('[data-lang-set="en"]'); await settle(page);
check('the key readout is rewritten in English', /cross-block/.test(await page.textContent('#roKeyL')));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
