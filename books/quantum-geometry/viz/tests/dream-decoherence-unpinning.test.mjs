#!/usr/bin/env node
// Browser regression suite for ORTHO//DREAM (books/quantum-geometry/viz/dream-decoherence-unpinning/):
//   node books/quantum-geometry/viz/tests/dream-decoherence-unpinning.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check for every control and one for each property the page claims, against
// computations written here and never by calling the page's functions: ρ(λ) built from Ψ and explicit projection
// matrices, eigenvalues by an unshifted QR iteration (the page uses Jacobi rotations), entropies from those, the record
// channel from record vectors and the overlap of the Lean definition, the screen from the pure-state amplitude. The
// solid apparatus (kit.solid) is checked against the same independent ρ: column heights, arch thickness and colour,
// the relief of its screen; then the pixels of the WebGL picture against the flat panels; then solidChecks.
import { session, stageFirstChecks, settle, until, solidChecks, solidPixels } from '../../../../tools/node/viz-testkit.mjs';

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
check('WAKING: the still names the entropy at λ = 1, D(Ψ‖𝒫Ψ) = −Σ pᵢ ln pᵢ, to two places', (await page.textContent('#hudSub')).includes(`S = ${dExp.toFixed(2)}`), await page.textContent('#hudSub'));
await pick('blocks'); s = await seek(1);
const RB = rhoOf(0.4, 1, 'body');
check('TWO-BLOCKS: at λ = 1 the body–rest coherence is zero and the coherence among x₁…x₃ stays', s.fam === 'body' && maxDiff(realPart(s.rho), RB) < 1e-12 && s.rho[0][1][0] === 0 && close(s.rho[1][2][0], (0.6 / 3), 1e-12));
check('TWO-BLOCKS: a fixed point of the two-block pinching', maxDiff(pinch(realPart(s.rho), 'body'), realPart(s.rho)) < 1e-14);
scr = await D((u) => window.DREAM_DEBUG.screen(u), us);
check('TWO-BLOCKS: every fringe left on the screen comes from in-block coherence (drawn cyan), none from cut coherence', scr.every((v) => close(v.all, v.kept, 1e-12)) && scr.some((v) => Math.abs(v.all - v.diag) > 0.05));
await pick('unpin_body'); s = await seek(0);
check('UNPIN: the body | rest family, starting at λ = 1 with the body links cut and the links among the rest full', s.fam === 'body' && close(s.lam, 1) && maxDiff(realPart(s.rho), rhoOf(0.4, 1, 'body')) < 1e-12 && s.rho[0][2][0] === 0 && close(s.rho[2][3][0], 0.2, 1e-12));
s = await seek(1);
/** Expected after unpinning to λ = 0.1 with blocks {x₀}, {x₁, x₂, x₃}: links touching x₀ (once) are 0.9 aᵢaⱼ, the rest aᵢaⱼ. */
const unpinExp = (i, j) => psi(0.4)[i] * psi(0.4)[j] * ((i === 0) !== (j === 0) ? 0.9 : 1);
check('UNPIN: ends at λ = 0.1; only the body links come back (0.9 aᵢaⱼ), the links among the rest and the diagonal never moved', close(s.lam, 0.1, 1e-12) && s.rho.every((r, i) => r.every((v, j) => close(v[0], unpinExp(i, j), 1e-12))));

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
check('the record scene draws the phase disc beside the grid', s.disc && s.disc.rad > 20 && s.disc.cx > s.grid.x0 + s.grid.size, JSON.stringify([s.disc, s.grid]));
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
/** The phase path of ρ₀₁ through the whole steps 0 … k of the record channel: total turn and where it ends (unwrapped). */
const phasePath = (r, phi, k) => { let prev = 0, sweep = 0; for (let q = 1; q <= k; q++) { const z = expected(r, phi, q)[0][1]; let a = Math.atan2(z[1], z[0]); while (a - prev > Math.PI) a -= 2 * Math.PI; while (a - prev < -Math.PI) a += 2 * Math.PI; sweep += Math.abs(a - prev); prev = a; } return { sweep, end: prev }; };
const ph3 = phasePath(1, 90, 3);
check('HALF-ERASE: the trail in the ρ₀₁ square has turned 3π/2 and ends at −π/2', close(s.trail.sweep, ph3.sweep, 1e-6) && close(s.trail.end, ph3.end, 1e-9) && close(ph3.sweep, 1.5 * Math.PI, 1e-12), JSON.stringify(s.trail));
check('HALF-ERASE: the arrow on the phase disc ends at −i/2, a quarter turn below the centre', close(s.arrow[0], 0, 1e-9) && close(s.arrow[1], -s.disc.rad, 1e-9), JSON.stringify(s.arrow));
check('HALF-ERASE: ρ₀₁ = −i/2 (certificate)', close(s.z[0], 0, 1e-12) && close(s.z[1], -0.5, 1e-12));
s = await seek(2);
check('two copies written: ρ₀₁ = −1/2 (certificate)', close(s.z[0], -0.5, 1e-12) && close(s.z[1], 0, 1e-12));
await pick('quantum_eraser'); s = await seek(0);
check('JOINT-REVERSAL at step 0: no trail yet', s.trail.points === 0 && s.trail.sweep === 0);
s = await seek(4);
const ph4 = phasePath(1, 90, 4);
check('JOINT-REVERSAL: the still is told apart from the start by its trail: out half a turn and back (sweep 2π, ends at 0)', close(s.trail.sweep, ph4.sweep, 1e-6) && close(ph4.sweep, 2 * Math.PI, 1e-12) && Math.abs(s.trail.end) < 1e-9 && s.trail.points > 2, JSON.stringify(s.trail));
check('JOINT-REVERSAL: the arrow on the phase disc is back at 1/2, on the dashed circle to the right', close(s.arrow[0], s.disc.rad, 1e-9) && close(s.arrow[1], 0, 1e-9));
check('JOINT-REVERSAL: both reversed, ρ₀₁ = 1/2, the whole matrix restored', maxDiff(s.rho.map((r) => r.map((v) => v[0])), [[0.5, 0.5], [0.5, 0.5]]) < 1e-12 && Math.abs(s.z[1]) < 1e-12);
scr = await D((u) => window.DREAM_DEBUG.screen(u), us);
const KB = 2 * Math.PI / 0.5, SB = 0.55;
check('JOINT-REVERSAL: the screen is back to env·(1 + cos Ku)', scr.every((v, k) => close(v.all, Math.exp(-(us[k] ** 2) / (2 * SB * SB)) * (1 + Math.cos(KB * us[k])), 1e-12)));
check('coherence mass = |ρ₀₁|² + |ρ₁₀|² = 1/2', close(s.mass, 0.5, 1e-12));
await pick('zero_overlap_fail'); s = await seek(1);
check('ZERO-OVERLAP: one record with c = 0 kills ρ₀₁', s.r === 0 && Math.hypot(...s.z) === 0);
check('ZERO-OVERLAP: c = 0 has no phase, so no trail is drawn', s.trail.points === 0);
s = await seek(4);
check('ZERO-OVERLAP: the arrow on the phase disc has shrunk to the centre', Math.hypot(...s.arrow) < 1e-12);
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

/* ---------- attribution: green boxes state the general theorems; the page's own instances sit with NUM ---------- */
{
  const boxes = await D(() => [...document.querySelectorAll('#evidence .lean')].map((b) => ({ cls: b.className, gids: [...b.querySelectorAll('[data-lean-gid]')].map((a) => a.dataset.leanGid.split('.').pop()),
    zh: (b.querySelector('.zh') || {}).textContent || '', en: (b.querySelector('.en') || {}).textContent || '' })));
  const green = boxes.filter((b) => b.cls.trim() === 'lean'), num = boxes.find((b) => /\bnum\b/.test(b.cls));
  const APPLIED = { zh: ['舞台上', '“逐个位置”', '“记录”场景', '读数'], en: ['on the stage', '“every place”', 'Records scene', 'readout'] };
  const general = green.slice(0, 3);
  check('the first three green boxes cite the general pinching, fixed-point, entropy-production and coherence-mass theorems',
    JSON.stringify(general.map((b) => b.gids)) === JSON.stringify([['finite_record_pinching_idempotent', 'unreadState_fixed_iff'], ['entropy_production_coherence_deletion_identity'], ['pinching_discarded_coherence_mass']]));
  check('those green boxes carry no sentence about the page’s own stage or readout (both languages)',
    general.every((b) => APPLIED.zh.every((w) => !b.zh.includes(w)) && APPLIED.en.every((w) => !b.en.includes(w))), JSON.stringify(general.map((b) => [b.zh.slice(0, 40), b.en.slice(0, 40)])));
  check('the NUM box names the three applications as the page’s numbers, in both languages',
    !!num && ['跨块方格全空', 'D(Ψ ‖ 𝒫(Ψ))', '相干质量', 'Lean 没有对这些具体的数作证明'].every((w) => num.zh.includes(w))
    && ['cross-block cells are empty', 'D(Ψ ‖ 𝒫(Ψ))', 'coherence mass', 'Lean proves nothing about these particular numbers'].every((w) => num.en.includes(w)));
  const cert = green[3];
  check('the exact two-copy certificate stays green with its frozen values 1/2, −1/2, −i/2, 1/2',
    !!cert && cert.gids.includes('two_copy_joint_reversal_certificate') && ['1/2', '−1/2', '−i/2'].every((w) => cert.zh.includes(w) && cert.en.includes(w)));
}

/* ---------- layout: the stage title clears the scene buttons on a phone; the English legend of a still is one line ---------- */
/** The box of the text itself (a range over the element's contents), not of the element, which a flex column stretches. */
const box = (pg, sel) => pg.evaluate((q) => { const rg = document.createRange(); rg.selectNodeContents(document.querySelector(q)); const r = rg.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom, h: r.height }; }, sel);
const apart = (a, b) => a.r <= b.l || b.r <= a.l || a.b <= b.t || b.b <= a.t;
for (const card of ['half_erase', 'waking', 'wake_snap']) {
  const ph = await T.open(BOOK, ID, `?lang=en&preset=${card}`, { viewport: { width: 390, height: 844 } });
  await settle(ph, 60);
  const a = await box(ph, '#hudBig'), b = await box(ph, '#sceneChips');
  check(`phone, English, ${card}: the stage title does not run under the scene buttons`, apart(a, b), JSON.stringify([a, b]));
  await ph.context().close();
}
for (const card of ['blocks', 'waking', 'half_erase', 'wake_snap']) {
  const fg = await T.open(BOOK, ID, `?lang=en&embed=1&shot=1&preset=${card}`, { viewport: { width: 740, height: 500 } });
  await settle(fg, 60);
  const lh = await fg.evaluate(() => { const el = document.getElementById('legend'), items = [...el.children].map((c) => c.getBoundingClientRect().top); return Math.max(...items) - Math.min(...items); });
  check(`the English still of ${card} keeps its legend on one line`, lh < 4, `${lh}`);
  await fg.context().close();
}
/* the whole lab in a chapter's frame on a phone (334 × 620, English): where the title's second line meets the scene
   buttons, the theme puts the title block under them (.hud-stack); the box the layout gives the apparatus and the flat
   panels then starts below the last line of the title block as it is shown, and no canvas draws under its words */
{
  const fr = await T.open(BOOK, ID, '?embed=1&lang=en', { viewport: { width: 334, height: 620 }, locale: 'en-US' });
  await settle(fr, 120);
  for (const card of ['blocks', 'half_erase', 'wake_snap']) {
    await fr.click(`[data-preset="${card}"]`);
    await fr.evaluate(() => { window.TRV.kit.pause(); window.TRV.kit.flush(); });
    const r = await fr.evaluate(() => {
      const st = document.getElementById('stage'), sr = st.getBoundingClientRect(), P = window.DREAM_DEBUG.panels;
      const text = (id) => { const rg = document.createRange(); rg.selectNodeContents(document.getElementById(id)); return rg.getBoundingClientRect(); };
      const ink = (cv, b) => {
        if (!cv || cv.style.visibility === 'hidden') return 0;
        const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height; const c = cp.getContext('2d'); c.drawImage(cv, 0, 0);
        const d = c.getImageData(0, 0, cp.width, cp.height).data, cb = cv.getBoundingClientRect(), k = cv.width / cb.width;
        let n = 0;
        for (let y = Math.max(0, Math.floor((b.top - cb.top) * k)); y < Math.min(cp.height, Math.ceil((b.bottom - cb.top) * k)); y++)
          for (let x = Math.max(0, Math.floor((b.left - cb.left) * k)); x < Math.min(cp.width, Math.ceil((b.right - cb.left) * k)); x++) if (d[4 * (y * cp.width + x) + 3] > 8) n++;
        return n;
      };
      const cvs = [document.getElementById('flat'), st.querySelector('canvas.solid-gl'), document.getElementById('cv')];
      const under = ['hudBig', 'hudSub'].reduce((s, id) => s + cvs.reduce((t, cv) => t + ink(cv, text(id)), 0), 0);
      return { stacked: st.classList.contains('hud-stack'), words: Math.round(Math.max(text('hudBig').bottom, text('hudSub').bottom) - sr.top), top: Math.round(Math.min(P.r3.y, P.region.y, P.fit.t)), under };
    });
    check(`lab in a 334 × 620 frame, English, ${card}: the apparatus and the panels start below the title block as shown, nothing drawn under its words`,
      r.top >= r.words && r.under === 0, JSON.stringify(r));
  }
  await fr.context().close();
}

/* ---------- the solid apparatus: the same state as geometry, against the independent ρ ---------- */
{
  const solid = async () => { await settle(page); return D(() => window.DREAM_DEBUG.solid); };
  const scrAt = (uv) => D((q) => q.map(([u, v]) => window.DREAM_DEBUG.solidScreenAt(u, v)), uv);
  const UV = [];
  for (const u of [-0.93, -0.5, -0.12, 0, 0.27, 0.66, 1]) for (const v of [0, 0.5, 1]) UV.push([u, v]);
  /** The brightness at u of a matrix given as rows of [re, im] (independent of the page): env·Σᵢⱼ Re(ρᵢⱼ e^{iK(dᵢ − dⱼ)u}). */
  const bright = (rho, u) => {
    const n = rho.length, d = n === 4 ? d4 : [-0.5, 0.5], k = n === 4 ? K : KB, sg = n === 4 ? SIG : SB;
    let all = 0; rho.forEach((row, i) => row.forEach((z, j) => { const th = k * (d[i] - d[j]) * u; all += z[0] * Math.cos(th) - z[1] * Math.sin(th); }));
    return Math.exp(-u * u / (2 * sg * sg)) * all;
  };
  /** Largest gap between the apparatus screen and the screen built here from ρ and the published constants. */
  const reliefErr = async (g, rho) => {
    const pts = await scrAt(UV), c = g.consts.SCR;
    return Math.max(...UV.map(([u, v], k) => { const I = bright(rho, u) / g.ymax, e = [c.x * u, c.y - c.bow * u * u + c.lean * v - c.rel * I, c.h * v - g.consts.Z0]; return Math.max(...e.map((x, q) => Math.abs(x - pts[k][q]))); }));
  };
  const cplx = (R) => R.map((r) => r.map((x) => [x, 0]));
  const a4 = psi(0.4), p4 = a4.map((x) => x * x);
  const colsOk = (g, hs, colors) => g.columns.length === hs.length && g.columns.every((c, i) => close(c.h, g.consts.COL * hs[i], 1e-12) && c.color === colors[i]);
  const archOf = (g, i, j) => g.arches.find((a) => a.i === i && a.j === j);

  await pick('waking'); s = await seek(0); let g = await solid();
  check('apparatus, WAKING at λ = 0: four slits; the column on xᵢ stands COL·|aᵢ|² high, cyan', g.n === 4 && g.slits.length === 4 && colsOk(g, p4, ['cyan', 'cyan', 'cyan', 'cyan']), JSON.stringify(g.columns));
  check('apparatus, WAKING at λ = 0: six arches, each ARCH·aᵢaⱼ thick and magenta (every link crosses a block)',
    g.arches.length === 6 && g.arches.every((a) => a.shown && a.color === 'magenta' && close(a.r, g.consts.ARCH * a4[a.i] * a4[a.j], 1e-12)), JSON.stringify(g.arches));
  let rerr = await reliefErr(g, cplx(rhoOf(0.4, 0, 'fine')));
  check('apparatus, WAKING at λ = 0: the screen\'s relief is the brightness of |Ψ⟩⟨Ψ| (computed here) at every u', rerr < 1e-9, `${rerr}`);
  s = await seek(1); g = await solid();
  check('apparatus, WAKING at λ = 1: every arch is gone (thickness 0), the columns have not moved', g.arches.every((a) => a.r === 0 && !a.shown) && colsOk(g, p4, ['cyan', 'cyan', 'cyan', 'cyan']));
  rerr = await reliefErr(g, cplx(rhoOf(0.4, 1, 'fine')));
  check('apparatus, WAKING at λ = 1: the screen\'s relief is the smooth envelope alone', rerr < 1e-9, `${rerr}`);
  await pick('blocks'); s = await seek(1); g = await solid();
  check('apparatus, TWO-BLOCKS at λ = 1: the arches from x₀ are gone; those among x₁…x₃ stay ARCH·0.2 thick, cyan',
    [1, 2, 3].every((j) => archOf(g, 0, j).r === 0 && !archOf(g, 0, j).shown) && [[1, 2], [1, 3], [2, 3]].every(([i, j]) => { const a = archOf(g, i, j); return a.shown && a.color === 'cyan' && close(a.r, g.consts.ARCH * 0.2, 1e-12); }), JSON.stringify(g.arches));
  rerr = await reliefErr(g, cplx(rhoOf(0.4, 1, 'body')));
  check('apparatus, TWO-BLOCKS at λ = 1: the screen\'s relief keeps the in-block fringes', rerr < 1e-9, `${rerr}`);
  await pick('unpin_body'); s = await seek(1); g = await solid();
  check('apparatus, UNPIN at λ = 0.1: the body arches are back, 0.9·ARCH·a₀aⱼ thick and magenta; the rest unchanged and cyan',
    g.arches.every((a) => a.shown && (a.i === 0 ? a.color === 'magenta' && close(a.r, 0.9 * g.consts.ARCH * a4[0] * a4[a.j], 1e-12) : a.color === 'cyan' && close(a.r, g.consts.ARCH * a4[a.i] * a4[a.j], 1e-12))), JSON.stringify(g.arches));

  await pick('half_erase'); s = await seek(3); g = await solid();
  let E = expected(1, 90, 3);
  check('apparatus, HALF-ERASE at step 3: two slits, two cyan columns of COL·1/2, one magenta arch ARCH·|ρ₀₁| = ARCH/2 thick',
    g.n === 2 && g.slits.length === 2 && colsOk(g, [0.5, 0.5], ['cyan', 'cyan']) && g.arches.length === 1 && g.arches[0].shown && g.arches[0].color === 'magenta' && close(g.arches[0].r, g.consts.ARCH * Math.hypot(...E[0][1]), 1e-12));
  rerr = await reliefErr(g, E);
  check('apparatus, HALF-ERASE at step 3: the screen\'s relief is the quarter-shifted fringe of ρ₀₁ = −i/2', rerr < 1e-9, `${rerr}`);
  await pick('quantum_eraser'); s = await seek(4); g = await solid();
  rerr = await reliefErr(g, expected(1, 90, 4));
  check('apparatus, JOINT-REVERSAL at step 4: the arch is back at ARCH/2 and the relief is env·(1 + cos Ku) again', close(g.arches[0].r, g.consts.ARCH * 0.5, 1e-12) && rerr < 1e-9, `${rerr}`);
  await pick('zero_overlap_fail'); s = await seek(1); g = await solid();
  check('apparatus, ZERO-OVERLAP: once a record with c = 0 is written the arch is gone; reversing does not bring it back',
    g.arches[0].r === 0 && !g.arches[0].shown && (await seek(4), (await solid()).arches[0].r === 0));

  await pick('wake_snap'); s = await seek(0.5); g = await solid();
  check('apparatus, waking half way: the body column stays COL·0.4, the others are halved; every column stays cyan', colsOk(g, [0.4, 0.1, 0.1, 0.1], ['cyan', 'cyan', 'cyan', 'cyan']), JSON.stringify(g.columns));
  s = await seek(1); g = await solid();
  const ring = await D(() => window.TRV.solids[0].marks().some((m) => m.key === 'read' && m.kind === 'ring'));
  check('apparatus, WAKE-SNAP: only the body column is left, every arch is gone, an amber ring reads x₀', colsOk(g, [0.4, 0, 0, 0], ['cyan', 'cyan', 'cyan', 'cyan']) && g.arches.every((a) => !a.shown) && ring);

  /* the WebGL picture never runs under the flat panels or the stage's words, in the default view */
  const clearOfPanels = (pg) => pg.evaluate(() => {
    const sc = window.TRV.solids[0], st = sc.el, cv = st.querySelector('canvas.solid-gl') || document.getElementById('cv');
    const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height; const c = cp.getContext('2d'); c.drawImage(cv, 0, 0);
    const d = c.getImageData(0, 0, cp.width, cp.height).data, k = cv.width / st.clientWidth, sr = st.getBoundingClientRect();
    const count = (r) => { let n = 0, all = 0; for (let y = Math.max(0, Math.floor(r.y * k)); y < Math.min(cp.height, Math.ceil((r.y + r.h) * k)); y++) for (let x = Math.max(0, Math.floor(r.x * k)); x < Math.min(cp.width, Math.ceil((r.x + r.w) * k)); x++) { all++; if (d[4 * (y * cp.width + x) + 3] > 8) n++; } return { n, all }; };
    const P = window.DREAM_DEBUG.panels, el = (id) => { const b = document.getElementById(id).getBoundingClientRect(); return { x: b.left - sr.left, y: b.top - sr.top, w: b.width, h: b.height }; };
    const words = (q) => { const rg = document.createRange(); rg.selectNodeContents(document.querySelector(q)); const b = rg.getBoundingClientRect(); return { x: b.left - sr.left, y: b.top - sr.top, w: b.width, h: b.height }; };
    const under = { matrix: count(P.mat).n, screen: count(P.screen).n, disc: P.disc ? count(P.disc).n : 0, title: count(words('#hudBig')).n, sub: count(words('#hudSub')).n, chips: document.getElementById('sceneChips').offsetParent ? count(el('sceneChips')).n : 0, legend: count(el('legend')).n };
    const f = P.fit, body = count({ x: f.l, y: f.t, w: f.r - f.l, h: f.b - f.t });
    return { under, body: body.n / Math.max(1, body.all) };
  });
  const clear = (r) => Object.values(r.under).every((v) => v === 0) && r.body > 0.3;
  await pick('waking'); await seek(0);
  let cr = await clearOfPanels(page);
  check('desktop, anchor scene: the apparatus fills its own box and is drawn under no panel, title, button or legend', clear(cr), JSON.stringify(cr));
  await pick('quantum_eraser'); await seek(4);
  cr = await clearOfPanels(page);
  check('desktop, record scene: the apparatus is drawn under no panel (matrix, phase disc, screen) and no words', clear(cr), JSON.stringify(cr));
  for (const [what, q, vp] of [['740 × 500 cited figure', '?embed=1&lang=en&preset=blocks', { width: 740, height: 500 }], ['800 × 450 still', '?shot=1&lang=en&preset=half_erase', { width: 800, height: 450 }],
    ['390 phone', '?lang=en&preset=unpin_body', { width: 390, height: 844 }], ['390 phone, records', '?lang=en&preset=quantum_eraser', { width: 390, height: 844 }]]) {
    const pg = await T.open(BOOK, ID, q, { viewport: vp });
    await settle(pg, 120);
    const r = await clearOfPanels(pg), lab = await pg.evaluate(() => window.DREAM_DEBUG.panels.grid.size);
    check(`${what}: the apparatus fills its box, runs under no flat panel or words, and the grid stays ≥ 80 px`, clear(r) && lab >= 80, JSON.stringify([r, lab]));
    await pg.context().close();
  }

  /* marks on both faces of the plate: the plate hides one face's beads, whichever way the camera turns */
  await pick('waking'); await seek(0);
  const faces = () => D(() => { const ms = window.TRV.solids[0].marks(), k = (p) => ms.filter((m) => m.key && m.key.startsWith(p)); return { front: k('front').map((m) => m.hidden), back: k('back').map((m) => m.hidden), top: k('top').map((m) => m.hidden) }; });
  let fc = await faces();
  check('default view: the beads on the front face and on the columns are visible, those on the back face are hidden by the plate', fc.front.every((h) => !h) && fc.back.every((h) => h) && fc.top.every((h) => !h), JSON.stringify(fc));
  const sh = await solidPixels(page);
  check('the apparatus covers 16–22 % of the stage with opaque, lit surfaces', sh && sh.share >= 0.16 && sh.share <= 0.22 && sh.spread >= 0.04, sh && `${(sh.share * 100).toFixed(1)}% σ ${sh.spread.toFixed(3)}`);
  await solidChecks(T, BOOK, ID, page);
  // the testkit's gate turns the camera with drags of its own and then puts it back where it was; the page's own
  // gesture is checked here: a drag sideways across the top of the stage, above the apparatus and the flat panels
  const before = await D(() => ({ t: window.DREAM_DEBUG.state.t, yaw: window.TRV.solids[0].cam.yaw }));
  {
    const b = await D(() => { const r = window.TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    const y = b[1] + b[3] * 0.08;
    await page.mouse.move(b[0] + b[2] * 0.06, y); await page.mouse.down();
    for (let k = 1; k <= 6; k++) await page.mouse.move(b[0] + b[2] * (0.06 + 0.05 * k), y);
    await page.mouse.up(); await settle(page);
  }
  const after = await D(() => ({ t: window.DREAM_DEBUG.state.t, yaw: window.TRV.solids[0].cam.yaw }));
  check('a drag across the top of the stage turns the apparatus and leaves the rail alone (onPick is false there)', Math.abs(after.yaw - before.yaw) > 0.5 && after.t === before.t, JSON.stringify([before, after]));
  fc = await faces();
  check('turned round: the plate now hides every front bead, a back bead is in sight (the screen may hide the middle ones), so do the column tops', fc.front.every((h) => h) && fc.back.some((h) => !h) && fc.top.some((h) => !h), JSON.stringify(fc));
  await pick('blocks');
  check('a card brings the camera back to the default view', await until(page, ([y, p]) => { const c = window.TRV.solids[0].cam; return Math.abs(c.yaw - y) < 1e-6 && Math.abs(c.pitch - p) < 1e-6; }, await D(() => window.DREAM_DEBUG.home)));
}

/* ---------- cited figures at the size a chapter shows them ----------
   A chapter cites a card in an iframe 500 px high: about 334 px wide on a 390 px phone, 760 px in a book page. In the
   phone's frame a long note once took ~180 px of the 500 and left the stage ~210 px: the grid, the screen and the record boxes ran under the legend collided with the
   captions and the legend, and the lit solid shrank to a few per cent of the stage. These checks look at the frame
   itself: nothing scrolls; the note bar stays short and its full note scrolls to the last line; the stage keeps most of
   the frame; no ink of the flat canvas or the WebGL canvas and no label lies under the title, its second line or the
   legend; the solid draws nothing inside the flat drawings; labels stay on the stage and apart; the lit solid covers
   ≥ 12 % of the stage at the card's first and last frame; and the grid stays ≥ 80 px and the phase disc keeps a box ≥ 80 px. */
{
  const FIG = ['waking', 'blocks', 'half_erase', 'zero_overlap_fail', 'quantum_eraser', 'unpin_body', 'wake_snap'];
  /** Everything about the frame, in viewport pixels; `panels` and `read` come from the page's own probe. */
  const facts = (pg) => pg.evaluate(async () => {
    const sc = window.TRV.solids[0]; await sc.ready; window.TRV.kit.flush();
    const st = sc.el, sr = st.getBoundingClientRect(), vp = { w: innerWidth, h: innerHeight };
    const box = (b) => ({ x: b.left, y: b.top, w: b.width, h: b.height });
    const textBox = (el) => { const rg = document.createRange(); rg.selectNodeContents(el); return box(rg.getBoundingClientRect()); };
    const words = [];
    for (const id of ['hudBig', 'hudSub']) { const el = document.getElementById(id); if (el && el.textContent.trim()) words.push([id, textBox(el)]); }
    document.querySelectorAll('#legend > span').forEach((el, k) => words.push([`legend ${k + 1}`, box(el.getBoundingClientRect())]));
    const image = (cv) => {
      if (!cv) return null;
      const cp = document.createElement('canvas'); cp.width = cv.width; cp.height = cv.height; const c = cp.getContext('2d'); c.drawImage(cv, 0, 0);
      const r = cv.getBoundingClientRect(); return { d: c.getImageData(0, 0, cp.width, cp.height).data, w: cp.width, h: cp.height, k: cv.width / r.width, x: r.left, y: r.top };
    };
    const flat = image(document.getElementById('flat')), gl = image(st.querySelector('canvas.solid-gl'));
    const ink = (im, b) => {
      if (!im) return 0;
      let n = 0;
      for (let y = Math.max(0, Math.floor((b.y - im.y) * im.k)); y < Math.min(im.h, Math.ceil((b.y + b.h - im.y) * im.k)); y++)
        for (let x = Math.max(0, Math.floor((b.x - im.x) * im.k)); x < Math.min(im.w, Math.ceil((b.x + b.w - im.x) * im.k)); x++) if (im.d[4 * (y * im.w + x) + 3] > 8) n++;
      return n;
    };
    const cut = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    const tags = [...st.querySelectorAll('.tags .tag')].filter((t) => !t.hidden && t.textContent.trim() && t.getClientRects().length).map((t) => [t.textContent.trim(), box(t.getBoundingClientRect())]);
    const fb = document.getElementById('flat').getBoundingClientRect();
    const panels = (() => { const p = window.DREAM_DEBUG.panels; return [['the grid', p.mat], ['the screen', p.screen]].concat(p.disc ? [['the phase disc', p.disc]] : []); })().map(([what, b]) => [what, { x: fb.left + b.x, y: fb.top + b.y, w: b.w, h: b.h }]);
    const what = document.querySelector('.tour .what'), note = document.getElementById('presetNote'), tour = document.getElementById('tour');
    const full = what.textContent.trim().endsWith(note.textContent.trim()) && note.textContent.trim().length > 20;
    const scrolls = what.scrollHeight > what.clientHeight + 1, oy = getComputedStyle(what).overflowY;
    what.scrollTop = what.scrollHeight; const reached = what.scrollTop + what.clientHeight >= what.scrollHeight - 1; what.scrollTop = 0;
    const btns = [...tour.querySelectorAll('[data-tour]')].map((b) => b.getBoundingClientRect()).every((b) => b.width > 0 && b.top >= 0 && b.bottom <= vp.h + 0.5 && b.left >= 0 && b.right <= vp.w + 0.5);
    const out = {
      vp, docScroll: document.documentElement.scrollHeight - innerHeight, docWide: document.documentElement.scrollWidth - innerWidth,
      stageH: sr.height, tourH: tour.getBoundingClientRect().height, noteH: what.clientHeight, note: { full, scrolls, scrollable: !scrolls || oy === 'auto' || oy === 'scroll', reached, btns },
      under: [], solidIn: [], tagOut: [], tagHit: [], read: (() => { const p = window.DREAM_DEBUG.panels; return { grid: p.grid.size, disc: p.disc ? Math.min(p.disc.w, p.disc.h) : null }; })()
    };
    for (const [w, b] of words) {
      const f = ink(flat, b), g = ink(gl, b);
      if (f) out.under.push(`flat ink under ${w}: ${f}`);
      if (g) out.under.push(`solid under ${w}: ${g}`);
      for (const [t, tb] of tags) if (cut(tb, b) > 1) out.under.push(`label “${t}” on ${w}`);
    }
    for (const [w, b] of panels) { const g = ink(gl, b); if (g) out.solidIn.push(`${w}: ${g}`); }
    for (const [t, b] of tags) if (b.x < sr.left - 1 || b.y < sr.top - 1 || b.x + b.w > sr.right + 1 || b.y + b.h > sr.bottom + 1) out.tagOut.push(t);
    for (let i = 0; i < tags.length; i++) for (let j = i + 1; j < tags.length; j++) {
      const a = tags[i][1], b = tags[j][1], c = cut(a, b);
      if (c > 0.3 * Math.min(a.w * a.h, b.w * b.h)) out.tagHit.push(`${tags[i][0]} / ${tags[j][0]}`);
    }
    return out;
  });
  const share = async (pg, t) => { await pg.evaluate(([d, x]) => window[d].seek(x), ['DREAM_DEBUG', t]); await settle(pg); return solidPixels(pg); };
  for (const [tag, vp, lang, cards] of [['phone frame 334 × 500', { width: 334, height: 500 }, 'en', FIG], ['phone frame 334 × 500', { width: 334, height: 500 }, 'zh', ['half_erase', 'unpin_body']], ['book page 760 × 500', { width: 760, height: 500 }, 'en', FIG]]) {
    const bad = { frame: [], note: [], words: [], solid: [], labels: [], share: [], read: [] };
    for (const card of cards) {
      const pg = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: vp, locale: lang === 'en' ? 'en-US' : 'zh-CN' });
      await until(pg, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000);
      await until(pg, (d) => !window[d].state.playing, 'DREAM_DEBUG', 120000);
      await settle(pg);
      const f = await facts(pg), id = `${card} (${lang})`;
      if (f.docScroll > 0 || f.docWide > 0 || f.stageH < 0.72 * f.vp.h) bad.frame.push(`${id}: scroll ${f.docScroll}/${f.docWide}, stage ${Math.round(f.stageH)} px`);
      if (f.tourH > 84 || !f.note.full || !f.note.scrollable || !f.note.reached || !f.note.btns) bad.note.push(`${id}: ${Math.round(f.tourH)} px ${JSON.stringify(f.note)}`);
      if (f.under.length) bad.words.push(`${id}: ${f.under.slice(0, 3).join(', ')}`);
      if (f.solidIn.length) bad.solid.push(`${id}: ${f.solidIn.join(', ')}`);
      if (f.tagOut.length || f.tagHit.length) bad.labels.push(`${id}: ${[...f.tagOut.map((t) => `off stage: ${t}`), ...f.tagHit].slice(0, 3).join(', ')}`);
      if (!(f.read.grid >= 80 && (f.read.disc == null || f.read.disc >= 80))) bad.read.push(`${id}: ${JSON.stringify(f.read)}`);
      const max = await pg.evaluate((d) => window[d].state.max, 'DREAM_DEBUG');
      for (const t of [0, max]) { const px = await share(pg, t); if (!(px && px.share >= 0.12 && px.spread >= 0.04)) bad.share.push(`${id} at ${+t.toFixed(2)}: ${px ? (px.share * 100).toFixed(1) : '—'} %`); }
      await pg.context().close();
    }
    const what = `${tag}, ${lang}, ${cards.length === FIG.length ? 'every cited card' : cards.join(' + ')}`;
    check(`cited figure, ${what}: nothing scrolls and the stage keeps ≥ 72 % of the frame`, !bad.frame.length, bad.frame.join(' | '));
    check(`cited figure, ${what}: the note bar stays ≤ 84 px, holds the card's whole note and scrolls to its last line, ◀ ▶ in the frame`, !bad.note.length, bad.note.join(' | '));
    check(`cited figure, ${what}: no flat drawing, no solid and no label under the title, its second line or the legend`, !bad.words.length, bad.words.join(' | '));
    check(`cited figure, ${what}: the solid draws nothing inside the grid, the phase disc or the screen`, !bad.solid.length, bad.solid.join(' | '));
    check(`cited figure, ${what}: every label stays on the stage, and no two labels sit on each other`, !bad.labels.length, bad.labels.join(' | '));
    check(`cited figure, ${what}: the lit solid covers ≥ 12 % of the stage at the card's first and last frame`, !bad.share.length, bad.share.join(' | '));
    check(`cited figure, ${what}: the grid stays ≥ 80 px and the phase disc keeps a box ≥ 80 px`, !bad.read.length, bad.read.join(' | '));
  }
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
