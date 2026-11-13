#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/observer-consensus-decoherence (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/observer-consensus-decoherence.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then every card, the rail ends, the controls, and every property the page claims, checked
// against computations written here: 2 × 2 Kraus channels and Pauli traces instead of the page's 3 × 3 matrices,
// dense state vectors with real partial traces and Jacobi diagonalization for the record entropies, actual controlled
// rotations and their inverses for the erasure, 4 × 4 complex traces and a vertex enumeration for Local Friendliness,
// and closed forms (quadratic formula, determinants) for the pioneer. The page's own functions are never called.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'observer-consensus-decoherence';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (expr, arg) => page.evaluate(([e, a]) => { const f = new Function('D', 'a', `return (${e});`); return f(window.ORTHO_CONSENSUS_DEBUG, a); }, [expr, arg]);
const state = async () => { await settle(page); return page.evaluate(() => JSON.parse(JSON.stringify(window.ORTHO_CONSENSUS_DEBUG.state))); };
const pick = async (id, s) => { await D('D.pickPreset(a)', id); await settle(page); if (s != null) await D('D.setRail(a)', s); return state(); };
const opts = async (o) => { await D('D.setOptions(a)', o); return state(); };
const rail = async (s) => { await D('D.setRail(a)', s); return state(); };
const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;
const nearV = (a, b, tol = 1e-12) => a.length === b.length && a.every((x, i) => Array.isArray(x) ? nearV(x, b[i], tol) : near(x, b[i], tol));

/* ---------- independent references ---------- */
// complex numbers [re, im] and small complex matrices
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], ca = (a, b) => [a[0] + b[0], a[1] + b[1]], cj = (a) => [a[0], -a[1]];
const Mmul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => ca(s, cm(x, B[k][j])), [0, 0])));
const Madd = (A, B) => A.map((r, i) => r.map((x, j) => ca(x, B[i][j])));
const Msc = (A, k) => A.map((r) => r.map((x) => [x[0] * k, x[1] * k]));
const Mdag = (A) => A[0].map((_, j) => A.map((r) => cj(r[j])));
const Mtr = (A) => A.reduce((s, r, i) => ca(s, r[i]), [0, 0]);
const kron = (A, B) => { const n = A.length, m = B.length, R = []; for (let i = 0; i < n * m; i++) { R.push([]); for (let j = 0; j < n * m; j++) R[i].push(cm(A[Math.floor(i / m)][Math.floor(j / m)], B[i % m][j % m])); } return R; };
const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]], SX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], SY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], SZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
const ndot = (n) => Madd(Madd(Msc(SX, n[0]), Msc(SY, n[1])), Msc(SZ, n[2]));
const rhoOf = (r) => Msc(Madd(I2, ndot(r)), 0.5);
const blochOf = (rho) => [SX, SY, SZ].map((P) => Mtr(Mmul(rho, P))[0] / Mtr(rho)[0]);
/** One encounter as an actual 2 × 2 Kraus channel: cos²(α/2)ρ + sin²(α/2)(n·σ)ρ(n·σ). */
const kraus = (rho, n, a) => { const A = ndot(n); return Madd(Msc(rho, Math.cos(a / 2) ** 2), Msc(Mmul(Mmul(A, rho), A), Math.sin(a / 2) ** 2)); };
const hs2 = (A) => A.reduce((s, r) => s + r.reduce((t, x) => t + x[0] * x[0] + x[1] * x[1], 0), 0);
const pinch = (A) => A.map((r, i) => r.map((x, j) => (i === j ? x : [0, 0])));
/** Real symmetric eigenvalues by cyclic Jacobi (any size). */
function jacobiEig(S) {
  const n = S.length, a = S.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += a[p][q] * a[p][q];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(a[p][q]) < 1e-300) continue;
      const th = (a[q][q] - a[p][p]) / (2 * a[p][q]), t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const x = a[k][p], y = a[k][q]; a[k][p] = c * x - s * y; a[k][q] = s * x + c * y; }
      for (let k = 0; k < n; k++) { const x = a[p][k], y = a[q][k]; a[p][k] = c * x - s * y; a[q][k] = s * x + c * y; }
    }
  }
  return a.map((r, i) => r[i]).sort((x, y) => y - x);
}
const entropyBits = (vals) => -vals.filter((v) => v > 1e-15).reduce((s, v) => s + v * Math.log2(v), 0);
const H2 = (p) => (p <= 0 || p >= 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p));

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the isotropic-fog card at its still frame (k = 16, not playing)', s.preset === 'isotropic-fog' && s.scene === 'tensor' && s.k === 16 && !s.playing, JSON.stringify({ p: s.preset, k: s.k, playing: s.playing }));
check('exactly six cards with the slugs of the specification', JSON.stringify(await page.$$eval('.presets.cards button.preset[data-preset]', (b) => b.map((x) => x.dataset.preset))) === JSON.stringify(['isotropic-fog', 'axis-consensus', 'phase-gauge', 'darwinism-plateau', 'dual-wigner-bubbles', 'new-axis-pioneers']));

/* ---------- 1. isotropic fog ---------- */
s = await pick('isotropic-fog', 1);
const c04 = Math.cos(0.4), fogFinite = ((1 + 2 * c04) / 3) ** 16, fogWeak = Math.exp(-16 * 0.16 / 3);
check('fog: six axes ±x, ±y, ±z with weights 1/6, N = 16, α = 0.4, mean channel', s.axes.length === 6 && s.weights.every((w) => near(w, 1 / 6)) && s.N === 16 && s.alpha === 0.4 && s.channelMode === 'mean' && s.modelKind === 'axis-channel');
check('fog: M = I/3, λ = (⅓, ⅓, ⅓), κ = 0, gap = 0, pointerAxis = null', nearV(s.M, [[1 / 3, 0, 0], [0, 1 / 3, 0], [0, 0, 1 / 3]], 1e-15) && nearV(s.lambdaDesc, [1 / 3, 1 / 3, 1 / 3], 1e-15) && near(s.kappa, 0, 1e-15) && near(s.gap, 0, 1e-15) && s.pointerAxis === null);
check('fog: exact mean scale [(1 + 2cos 0.4)/3]¹⁶ = 0.421059390195005, K̄¹⁶ = scale·I', near(s.meanScale, fogFinite) && near(fogFinite, 0.421059390195005, 1e-14) && nearV(s.Ktotal, [[fogFinite, 0, 0], [0, fogFinite, 0], [0, 0, fogFinite]], 1e-14));
check('fog: weak limit e^(−16·0.16/3) = 0.42599258740013063 is reported apart and differs from the finite value', near(s.weakLimitScale, fogWeak) && near(fogWeak, 0.42599258740013063, 1e-14) && Math.abs(fogWeak - fogFinite) > 1e-3);
// the mean channel, from actual 2 × 2 Kraus channels averaged over the six axes at every encounter
{
  const axes6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  let rho = rhoOf(s.r0);
  for (let k = 0; k < 16; k++) rho = axes6.reduce((acc, n) => Madd(acc, Msc(kraus(rho, n, 0.4), 1 / 6)), Msc(I2, 0));
  check('fog: the averaged Kraus channels give the page\'s state r', nearV(blochOf(rho), s.r, 1e-13), `${blochOf(rho)} vs ${s.r}`);
}
await page.click('[data-lang-set="en"]'); await settle(page);
check('fog: the stage says "No unique pointer axis" in English', await page.evaluate(() => { const t = document.querySelector('.stage .tags .k-nopt'); return !!t && !t.hidden && /No unique pointer axis/.test(t.textContent); }));
await page.click('[data-lang-set="zh"]'); await settle(page);
check('fog: the stage says 无唯一指针主轴 in Chinese', await page.evaluate(() => { const t = document.querySelector('.stage .tags .k-nopt'); return !!t && !t.hidden && /无唯一指针主轴/.test(t.textContent); }));
s = await opts({ channelMode: 'ordered' });
check('fog, ordered product: an isotropic M does not make the finite history isotropic (diag(c¹⁰, c¹⁰, c¹²))', nearV(s.Ktotal, [[c04 ** 10, 0, 0], [0, c04 ** 10, 0], [0, 0, c04 ** 12]], 1e-14) && Math.abs(c04 ** 10 - c04 ** 12) > 0.05);
s = await opts({ channelMode: 'weak-limit' });
check('fog, weak limit: exp[−t(I − M)] = e^(−kα²/3)·I', nearV(s.Ktotal, [[fogWeak, 0, 0], [0, fogWeak, 0], [0, 0, fogWeak]], 1e-14));

/* ---------- 2. one shared axis ---------- */
s = await pick('axis-consensus', 1);
check('consensus: sixteen equal axes alternating +z / −z, ordered product, r₀ = (1, 0, 1)/√2', s.axes.length === 16 && s.axes.every((n, j) => nearV(n, [0, 0, j % 2 ? -1 : 1], 0)) && s.channelMode === 'ordered' && nearV(s.r0, [Math.SQRT1_2, 0, Math.SQRT1_2], 1e-15));
check('consensus: λ = (1, 0, 0), κ = 1, gap = 1, pointer axis ±z', nearV(s.lambdaDesc, [1, 0, 0], 1e-15) && near(s.kappa, 1, 1e-15) && near(s.gap, 1, 1e-15) && s.pointerAxis && near(Math.abs(s.pointerAxis[2]), 1, 1e-15));
{
  let rho = rhoOf(s.r0);
  for (let k = 0; k < 16; k++) rho = kraus(rho, [0, 0, k % 2 ? -1 : 1], 0.4);
  const r = blochOf(rho);
  check('consensus: sixteen actual Kraus channels give the page\'s state', nearV(r, s.r, 1e-13), `${r} vs ${s.r}`);
  check('consensus: r_z = 1/√2 survives exactly; the transverse part is (cos 0.4)¹⁶/√2 = 0.18972', near(s.r[2], Math.SQRT1_2, 1e-15) && near(s.r[0], c04 ** 16 * Math.SQRT1_2, 1e-14) && near(c04 ** 16, 0.2682960335759362, 1e-14));
  // T04's identity on the page's state, in the computational (pointer) basis, from the 2 × 2 matrix itself
  const off = hs2(Madd(rho, Msc(pinch(rho), -1)));
  check('consensus: ‖ρ‖² = ‖Pρ‖² + ‖ρ − Pρ‖² and the off-diagonal HS mass is |ρ₀₁|² + |ρ₁₀|²', near(hs2(rho), hs2(pinch(rho)) + off, 1e-15) && near(s.hs.offDiagonal, off, 1e-14) && near(s.hs.total, hs2(rho), 1e-14));
  check('consensus: the weak-limit transverse factor e^(−16·0.16/2) = 0.27804 is kept apart from the finite 0.26830', near(s.modeDampingWeakLimit[1], Math.exp(-16 * 0.16 / 2), 1e-14) && Math.abs(Math.exp(-1.28) - c04 ** 16) > 5e-3);
}
s = await rail(0);
check('consensus: rail start k = 0 leaves the state at r₀', s.k === 0 && nearV(s.r, s.r0, 1e-15));
s = await rail(1);
check('consensus: rail end k = 16', s.k === 16);
// full pinching: T05's entropy production and T06's fixed points
s = await opts({ fullPinching: true, keepCard: true });
check('full pinching switch sets α = π/2 exactly', s.alpha === Math.PI / 2 && s.fullPinching === true);
s = await rail(1 / 16);
{
  const rho0 = rhoOf(s.r0), rho1 = kraus(rho0, [0, 0, 1], Math.PI / 2);
  const S0 = entropyBits(jacobiEig([[rho0[0][0][0], rho0[0][1][0]], [rho0[1][0][0], rho0[1][1][0]]])), S1 = entropyBits(jacobiEig([[rho1[0][0][0], rho1[0][1][0]], [rho1[1][0][0], rho1[1][1][0]]]));
  // relative entropy D(ρ‖Pρ) = Tr ρ log ρ − Tr ρ log Pρ, with the log of the pinched matrix taken on its diagonal
  const p = [rho0[0][0][0], rho0[1][1][0]], D0 = -S0 - (p[0] * Math.log2(p[0]) + p[1] * Math.log2(p[1]));
  check('full pinching: one step lands on the z axis (r = (0, 0, 1/√2))', nearV(s.r, [0, 0, Math.SQRT1_2], 1e-15) && nearV(blochOf(rho1), s.r, 1e-14));
  check('full pinching: the entropy gained in step 1 equals D(ρ‖Pρ) (≈ 0.6009 bits)', s.entropy && near(s.entropy.gainBits[0], S1 - S0, 1e-12) && near(s.entropy.relativeEntropyBits[0], D0, 1e-12) && near(D0, S1 - S0, 1e-12) && near(D0, 0.6008760, 1e-6), JSON.stringify(s.entropy && s.entropy.gainBits.slice(0, 2)));
  check('full pinching: later steps gain nothing and the totals agree', s.entropy.gainBits.slice(1).every((g) => near(g, 0, 1e-15)) && near(s.entropy.totalGainBits, s.entropy.sumRelativeEntropyBits, 1e-12));
  const unread = Madd(Mmul(Mmul(Msc(Madd(I2, SZ), 0.5), rho1), Msc(Madd(I2, SZ), 0.5)), Mmul(Mmul(Msc(Madd(I2, Msc(SZ, -1)), 0.5), rho1), Msc(Madd(I2, Msc(SZ, -1)), 0.5)));
  check('full pinching: the state is a fixed point of the unread state (T06: cross blocks vanish)', s.fixedPoint === true && hs2(Madd(unread, Msc(rho1, -1))) < 1e-30);
}
s = await opts({ fullPinching: false, keepCard: true });
check('the full pinching switch turns off again (α back to 0.4, no entropy claim)', s.alpha === 0.4 && s.entropy === null);

/* ---------- 3. flipping axis ends ---------- */
s = await pick('phase-gauge', 0);
const Mg = [[0.25, 0, 0], [0, 0.15, 0], [0, 0, 0.6]];
const naiveRef = (f) => { const base = [[0, 0, 1, 0.15], [1, 0, 0, 0.125], [0, 0, 1, 0.15], [0, 1, 0, 0.075], [0, 0, 1, 0.15], [1, 0, 0, 0.125], [0, 0, 1, 0.15], [0, 1, 0, 0.075]]; return base.reduce((acc, [x, y, z, w], j) => { const sg = j < f ? -1 : 1; return [acc[0] + sg * w * x, acc[1] + sg * w * y, acc[2] + sg * w * z]; }, [0, 0, 0]); };
let gaugeOk = true, naiveOk = true, ketOk = true, detail = '';
for (let f = 0; f <= 8; f++) {
  s = await rail(f / 8);
  const ok = s.gauge.flips === f && nearV(s.M, Mg, 1e-15) && nearV(s.lambdaDesc, [0.6, 0.25, 0.15], 1e-15) && near(s.kappa, 0.4, 1e-15) && near(s.gap, 0.35, 1e-15) && s.k === 16;
  if (!ok) { gaugeOk = false; detail = `f ${f}: ${JSON.stringify(s.M)}`; }
  if (!nearV(s.gauge.naiveSum, naiveRef(f), 1e-15)) naiveOk = false;
  // the ket inset: |ψ⟩⟨ψ| under a common phase, from the amplitudes the page shows
  const k0 = s.gauge.ket[0], k1 = s.gauge.ket[1], r01 = cm(k0, cj(k1));
  if (!near(r01[0], Math.sqrt(0.8) * 0.4, 1e-15) || !near(r01[1], -Math.sqrt(0.8) * 0.2, 1e-15)) ketOk = false;
}
check('gauge: M = diag(0.25, 0.15, 0.6), λ = (0.6, 0.25, 0.15), κ = 0.4, gap = 0.35 at every one of the 9 flip counts', gaugeOk, detail);
check('gauge: the naive signed sum Σwⱼnⱼ matches an independent sum, swings to zero at f = 4 and reverses at f = 8', naiveOk && nearV(naiveRef(4), [0, 0, 0], 1e-15) && nearV(naiveRef(8), [-0.25, -0.15, -0.6], 1e-15));
check('gauge: the ket under a common phase keeps ρ₀₁ = √0.8·(0.4 − 0.2i)', ketOk);
{
  const Kref = Mg.map((r, i) => r.map((x, j) => (i === j ? (c04 + (1 - c04) * x) ** 16 : 0)));
  check('gauge: the exact mean channel K̄¹⁶ is the same for every flip count', nearV(s.Ktotal, Kref, 1e-14));
  // Gram factorization M = BᵀB with B[j, a] = √wⱼ nⱼ[a], symmetry, trace 1, positivity
  const B = s.axes.map((n, j) => n.map((x) => Math.sqrt(s.weights[j]) * x));
  const BtB = [0, 1, 2].map((a) => [0, 1, 2].map((b) => B.reduce((t, r) => t + r[a] * r[b], 0)));
  check('gauge: M = BᵀB, symmetric, trace 1, positive semidefinite', nearV(BtB, s.M, 1e-15) && near(s.M[0][1], s.M[1][0], 0) && near(s.M[0][0] + s.M[1][1] + s.M[2][2], 1, 1e-15) && Math.min(...jacobiEig(s.M)) >= -1e-15);
}
check('gauge: the ordered product is not offered with unequal weights', await page.evaluate(() => document.querySelector('#modeChips [data-mode="ordered"]').disabled));

/* ---------- the ε policy on both sides of the threshold ---------- */
s = await opts({ scene: 'tensor', axes: [[1, 0, 0], [0, 1, 0]], weights: [0.5, 0.5] });
check('ε policy: diag(½, ½, 0) has κ = ¼ and no unique pointer axis, shown on the stage', near(s.kappa, 0.25, 1e-15) && s.pointerAxis === null && await page.evaluate(() => { const t = document.querySelector('.stage .tags .k-nopt'); return !!t && !t.hidden; }));
s = await opts({ axes: [[1, 0, 0], [0, 1, 0]], weights: [0.500000002, 0.499999998] });
check('ε policy: a gap of 4·10⁻⁹ < ε is an unresolved axis', s.gap < 1e-8 && s.gap > 0 && s.pointerAxis === null, `${s.gap}`);
s = await opts({ axes: [[1, 0, 0], [0, 1, 0]], weights: [0.50000001, 0.49999999] });
check('ε policy: a gap of 2·10⁻⁸ ≥ ε resolves the x axis', s.gap >= 1e-8 && s.pointerAxis && near(Math.abs(s.pointerAxis[0]), 1, 1e-12), `${s.gap}`);
check('validation: a zero axis is rejected', await page.evaluate(() => { try { window.ORTHO_CONSENSUS_DEBUG.setOptions({ axes: [[0, 0, 0]] }); return false; } catch (e) { return true; } }));
check('validation: a negative weight is rejected', await page.evaluate(() => { try { window.ORTHO_CONSENSUS_DEBUG.setOptions({ axes: [[1, 0, 0], [0, 1, 0]], weights: [1.2, -0.2] }); return false; } catch (e) { return true; } }));
// an oblique ordered schedule: order matters (actual Kraus channels in both orders)
{
  s = await opts({ axes: [[0, 0, 1], [1, 0, 1]], weights: [1, 1], channelMode: 'ordered', alpha: 0.6 });
  s = await rail(2 / 16);
  const o = [Math.SQRT1_2, 0, Math.SQRT1_2];
  let a = rhoOf(s.r0); a = kraus(a, [0, 0, 1], 0.6); a = kraus(a, o, 0.6);
  let b = rhoOf(s.r0); b = kraus(b, o, 0.6); b = kraus(b, [0, 0, 1], 0.6);
  check('ordered schedule: the page applies the first observer first, and the other order differs', nearV(blochOf(a), s.r, 1e-13) && Math.hypot(...blochOf(a).map((x, i) => x - blochOf(b)[i])) > 1e-3, `${blochOf(a)} vs ${s.r}`);
}

/* ---------- 4. redundant records ---------- */
s = await pick('darwinism-plateau', 0.5);
const hProd = (p0, q) => { const d = Math.sqrt(1 - 4 * p0 * (1 - p0) * (1 - q * q)); return H2((1 - d) / 2); };
const miRef = (p0, cs, m) => { const all = cs.reduce((a, c) => a * c, 1), F = cs.slice(0, m).reduce((a, c) => a * c, 1), Fc = cs.slice(m).reduce((a, c) => a * c, 1); return hProd(p0, all) + hProd(p0, F) - hProd(p0, Fc); };
check('records: branching-qnd, N = 16, p₀ = ½, every c = 0.3, m = 8 at the still frame', s.modelKind === 'branching-qnd' && s.p0 === 0.5 && s.overlaps.length === 16 && s.overlaps.every((c) => c === 0.3) && s.m === 8);
{
  const cs = Array(16).fill(0.3), ref = Array.from({ length: 17 }, (_, m) => miRef(0.5, cs, m));
  check('records: I(S : O_m) for m = 0…16 matches the closed form with direct products (≤ 1e-12)', s.mutualInformationBits.every((x, m) => near(x, ref[m], 1e-12)), JSON.stringify(s.mutualInformationBits.map((x, m) => x - ref[m]).filter((d) => Math.abs(d) > 1e-12)));
  const spec = [0.0, 0.9340680553754911, 0.994149171480895, 0.9994740737467016, 0.9999526718718466, 0.9999957405130984, 0.9999996166714702, 0.9999999657776363, 1.0, 1.0000000342223636, 1.0000003833285298, 1.0000042594869016, 1.0000473281281534, 1.0005259262532984, 1.005850828519105, 1.065931944624509, 2.0];
  check('records: the curve equals the specification\'s executed reference values', s.mutualInformationBits.every((x, m) => near(x, spec[m], 1e-12)));
  check('records: I(0) = 0, I(8) = S(ρ_S), I(16) = 2S(ρ_S), plateau within 0.000526 bits for m = 3…13', near(s.mutualInformationBits[0], 0, 1e-15) && near(s.mutualInformationBits[8], s.entropiesBits.system, 1e-12) && near(s.mutualInformationBits[16], 2 * s.entropiesBits.system, 1e-12) && s.plateauMaxDeviation < 0.000526);
  check('records: prefix and suffix products are the products of the first m and of the rest', s.prefixProducts.every((p, m) => near(p, 0.3 ** m, 1e-15)) && s.suffixProducts.every((p, m) => near(p, 0.3 ** (16 - m), 1e-15)));
}
// dense check: erase ten records so that six remain (an erased record is blank in both branches), then compare every
// entropy with the actual 2⁷-dimensional state, its partial traces and a Jacobi diagonalization
async function denseCompare(p0, c, label) {
  const erased = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  s = await opts({ p0, overlap: c, access: erased });
  const n = 6, sn = Math.sqrt(1 - c * c), dim = 1 << (n + 1), psi = new Float64Array(dim);
  // |0⟩|0…0⟩·√p₀ + |1⟩⊗ⱼ(c|0⟩ + s|1⟩)·√p₁ ; bit 0 (most significant) is the system, bits 1…6 the records
  psi[0] = Math.sqrt(p0);
  for (let b = 0; b < (1 << n); b++) { let amp = Math.sqrt(1 - p0); for (let j = 0; j < n; j++) amp *= ((b >> (n - 1 - j)) & 1) ? sn : c; psi[(1 << n) | b] = amp; }
  const reduced = (keep) => {
    const others = [...Array(n + 1).keys()].filter((q) => !keep.includes(q)), d = 1 << keep.length, R = Array.from({ length: d }, () => new Array(d).fill(0));
    const idx = (a, b) => { let i = 0; for (let q = 0; q <= n; q++) { const kpos = keep.indexOf(q); const bit = kpos >= 0 ? (a >> (keep.length - 1 - kpos)) & 1 : (b >> (others.length - 1 - others.indexOf(q))) & 1; i |= bit << (n - q); } return i; };
    for (let a = 0; a < d; a++) for (let a2 = 0; a2 < d; a2++) { let t = 0; for (let b = 0; b < (1 << others.length); b++) t += psi[idx(a, b)] * psi[idx(a2, b)]; R[a][a2] = t; }
    return entropyBits(jacobiEig(R));
  };
  const SS = reduced([0]);
  let worst = 0;
  for (let m = 0; m <= 16; m++) {
    const recs = [...Array(Math.min(m, n)).keys()].map((j) => j + 1);
    const SF = recs.length ? reduced(recs) : 0, SJ = reduced([0, ...recs]);
    worst = Math.max(worst, Math.abs(s.entropiesBits.fragment[m] - SF), Math.abs(s.entropiesBits.joint[m] - SJ), Math.abs(s.mutualInformationBits[m] - (SS + SF - SJ)));
  }
  worst = Math.max(worst, Math.abs(s.entropiesBits.system - SS));
  check(`records, dense (${label}): every entropy and I(S : O_m) against the 128-dimensional state (≤ 1e-11)`, worst < 1e-11, `${worst}`);
}
await denseCompare(0.36, 0.6, 'p₀ = 0.36, c = 0.6');
await denseCompare(0.36, -0.6, 'negative overlap c = −0.6');
await denseCompare(0.7, 0, 'perfectly distinguishable c = 0');
s = await opts({ p0: 0.5, overlap: 0.3, access: [] });
s = await opts({ p0: 0, access: [] });
check('records: p₀ = 0 leaves everything unentangled (all entropies 0)', s.mutualInformationBits.every((x) => x === 0) && s.entropiesBits.system === 0);
s = await opts({ p0: 0.5, overlap: 1 });
check('records: c = 1 carries no branch information (I = 0 everywhere)', s.mutualInformationBits.every((x) => Math.abs(x) < 1e-15));
s = await opts({ overlap: -1 });
check('records: c = −1 carries none either', s.mutualInformationBits.every((x) => Math.abs(x) < 1e-15));
// erasure with actual controlled rotations and their inverses, on three records (the other thirteen erased)
{
  s = await opts({ p0: 0.4, overlap: 0.3, access: [] });
  const n = 3, c = 0.3, sn = Math.sqrt(1 - c * c), dim = 1 << (n + 1);
  const apply = (psi, j, inv) => { const out = psi.slice(); for (let i = 0; i < dim; i++) { if (!(i >> n & 1)) continue; const bit = (i >> (n - 1 - j)) & 1; if (bit) continue; const i1 = i | (1 << (n - 1 - j)), a0 = psi[i], a1 = psi[i1]; out[i] = c * a0 + (inv ? sn : -sn) * a1; out[i1] = (inv ? -sn : sn) * a0 + c * a1; } return out; };
  let psi = new Float64Array(dim); psi[0] = Math.sqrt(0.4); psi[1 << n] = Math.sqrt(0.6);
  for (let j = 0; j < n; j++) psi = apply(psi, j, false);
  let ok = true, why = '';
  for (let mask = 0; mask < 8; mask++) {
    let ph = psi; for (let j = n - 1; j >= 0; j--) if (mask >> j & 1) ph = apply(ph, j, true);
    let r01 = 0; for (let b = 0; b < (1 << n); b++) r01 += ph[b] * ph[(1 << n) | b];
    const access = [...Array(13).keys()].map((x) => x + 3).concat([0, 1, 2].filter((j) => mask >> j & 1));
    s = await opts({ access });
    if (!near(s.residualCoherence, Math.abs(r01), 1e-13)) { ok = false; why = `mask ${mask}: ${s.residualCoherence} vs ${r01}`; }
  }
  check('erasure: for all 8 access masks the residual coherence equals the actual joint-state reversal', ok, why);
  s = await opts({ access: [...Array(16).keys()] });
  check('erasure: erasing every record restores |ρ₀₁| = √(p₀p₁) and a pure system', near(s.residualCoherence, Math.sqrt(0.24), 1e-15) && s.entropiesBits.system < 1e-12 && s.uncontrolled === 0);
  s = await opts({ access: [...Array(15).keys()] });
  check('erasure: one inaccessible record with c = 0.3 leaves 0.3·√(p₀p₁), not the c̄c = 0.09 of a conjugate-overlap channel', near(s.residualCoherence, 0.3 * Math.sqrt(0.24), 1e-15) && !near(s.residualCoherence, 0.09 * Math.sqrt(0.24), 1e-3));
}
check('T08 inset: the four exact values 1/2 → −1/2 → −i/2 → 1/2', (() => { const c = [0, -1]; const v0 = [0.5, 0], v1 = cm(cm(c, c), v0), v2 = cm(cj(c), v1), v3 = cm(cj(c), v2); return nearV([v0, v1, v2, v3], s.phaseCertificate, 1e-15); })());
// the access buttons and the records on the stage
s = await pick('darwinism-plateau', 0.5);
await page.click('#access [data-rec="3"]'); s = await state();
check('access button 4 erases record 4 (and releases the card)', s.accessMask[3] === true && s.accessMask.filter(Boolean).length === 1 && s.preset === null);
const rp = await D('D.recordPoint(a)', 3); await page.mouse.click(rp[0], rp[1]); s = await state();
check('pressing record 4 on the stage toggles it back', s.accessMask[3] === false);
await page.click('#eraseAll'); s = await state();
check('“erase all” erases all sixteen records', s.accessMask.every(Boolean) && s.uncontrolled === 0);

/* ---------- 5. two bubbles and Local Friendliness ---------- */
s = await pick('dual-wigner-bubbles', 1);
check('bubbles: logical-lf at v = 1, α = π/2', s.modelKind === 'logical-lf' && s.s === 1 && s.alpha === Math.PI / 2);
check('bubbles: the joint tensor λ = (½, ½, 0), gap 0, no unique pointer axis', nearV(s.lambdaDesc, [0.5, 0.5, 0], 1e-15) && near(s.gap, 0, 1e-15) && s.pointerAxis === null);
{
  // Bloch matrices of the unread pinchings, extracted from 2 × 2 channels acting on Pauli inputs
  const unread = (n, rho) => { const O = ndot(n); return Msc(Madd(rho, Mmul(Mmul(O, rho), O)), 0.5); };
  const blochMat = (n) => [0, 1, 2].map((i) => [SX, SY, SZ].map((P, j) => Mtr(Mmul(unread(n, Msc(Madd(I2, [SX, SY, SZ][j]), 0.5)), [SX, SY, SZ][i]))[0]));
  const mul3 = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const comm = (A, B) => Math.sqrt(mul3(A, B).reduce((t, r, i) => t + r.reduce((u, x, j) => u + (x - mul3(B, A)[i][j]) ** 2, 0), 0));
  const KZ = blochMat([0, 0, 1]), KX = blochMat([1, 0, 0]), KO = blochMat([Math.SQRT1_2, 0, Math.SQRT1_2]);
  check('bubbles: unread Z and X pinchings commute (‖[K_Z, K_X]‖ = 0)', s.bubbles.commZX === 0 && comm(KZ, KX) < 1e-15);
  check('bubbles: the 45° control does not commute, ‖[K_Z, K_O]‖ = √2·sin45°·cos45° = 0.7071', near(s.bubbles.commZO, comm(KZ, KO), 1e-12) && near(s.bubbles.commZO, Math.SQRT1_2, 1e-12));
  const P = (n) => Msc(Madd(I2, ndot(n)), 0.5), sel = (n, r) => Mmul(Mmul(P(n), r), P(n)), half = Msc(I2, 0.5);
  const zx = sel([1, 0, 0], sel([0, 0, 1], half)), xz = sel([0, 0, 1], sel([1, 0, 0], half));
  check('bubbles: selected Z⁺ then X⁺ gives P_X+/4, X⁺ then Z⁺ gives P_Z+/4 (traces ¼, endpoints |+x⟩ and |+z⟩)', near(s.bubbles.traceZX, 0.25, 1e-15) && near(s.bubbles.traceXZ, 0.25, 1e-15) && nearV(s.bubbles.endZX, [1, 0, 0], 1e-15) && nearV(s.bubbles.endXZ, [0, 0, 1], 1e-15) && near(Mtr(zx)[0], 0.25, 1e-15) && nearV(blochOf(xz), [0, 0, 1], 1e-15));
  check('bubbles: the subnormalized HS distance of the two selected results is ¼', near(s.bubbles.hsDiff, Math.sqrt(hs2(Madd(zx, Msc(xz, -1)))), 1e-15) && near(s.bubbles.hsDiff, 0.25, 1e-15));
  const rev = (Pset, A) => { const i = A.filter((x) => Pset.includes(x)); return i.length ? i : Pset.slice(); };
  check('bubbles: T11 sets, P then Q = {1}, Q then P = {1, 2}', JSON.stringify(s.bubbles.sets.PthenQ) === JSON.stringify(rev([0, 1], rev([1, 2], [0]))) && JSON.stringify(s.bubbles.sets.QthenP) === JSON.stringify(rev([1, 2], rev([0, 1], [0]))) && JSON.stringify(s.bubbles.sets.PthenQ) === '[1]' && JSON.stringify(s.bubbles.sets.QthenP) === '[1,2]');
}
{
  // Local Friendliness: our own state, observables and traces
  const r2 = Math.SQRT2, X = [1, 0, 0], Z = [0, 0, 1];
  const A = [Z, X, [1 / r2, 0, 1 / r2]];
  const B = [[-2 / Math.sqrt(5), 0, -1 / Math.sqrt(5)], [-(-2 + 1 / r2) / 3, 0, -(2 + 1 / r2) / 3], [-(1 + 1 / r2) / Math.sqrt(2 + r2), 0, -(1 / r2) / Math.sqrt(2 + r2)]];
  const th = Math.atan2(-1, -2), Rb = (v) => [Math.cos(th) * v[0] + Math.sin(th) * v[2], v[1], -Math.sin(th) * v[0] + Math.cos(th) * v[2]];
  const U = Madd(Msc(I2, Math.cos(th / 2)), Mmul([[[0, -Math.sin(th / 2)], [0, 0]], [[0, 0], [0, -Math.sin(th / 2)]]], SY));
  const phi = [[[1 / r2, 0]], [[0, 0]], [[0, 0]], [[1 / r2, 0]]], psi = Mmul(kron(I2, U), phi), rhoP = Mmul(psi, Mdag(psi));
  const Bp = B.map(Rb);
  const corr = (rho, a, b) => Mtr(Mmul(rho, kron(ndot(a), ndot(b))))[0];
  const Eref = A.map((a) => Bp.map((b) => corr(rhoP, a, b)));
  const specE = [[-0.4472135954999578, -0.9023689270621823, -0.3826834323650896], [-0.8944271909999156, 0.43096440627115074, -0.9238795325112865], [-0.9486832980505134, -0.33333333333333326, -0.9238795325112864]];
  const rhoPhi = Mmul(phi, Mdag(phi)), Eun = A.map((a) => B.map((b) => corr(rhoPhi, a, b)));
  check('LF: B′₁ = X exactly after Bob\'s frame rotation, and A₁ = Z', nearV(s.LF.B[0], X, 1e-15) && nearV(Bp[0], X, 1e-15) && nearV(s.LF.A[0], Z, 0));
  check('LF: local frame covariance — rotating state and observables together leaves every correlation unchanged', nearV(Eref, Eun, 1e-14));
  check('LF: the page\'s E matrix equals our traces and the specification\'s values', nearV(s.LF.E, Eref, 1e-13) && nearV(Eref, specE, 1e-13));
  const coef = [[-1, -2, 0], [-2, 2, -1], [0, -1, -1]];
  const score = coef.reduce((t, row, i) => t + row.reduce((u, x, j) => u + x * Eref[i][j], 0), 0);
  const exact = Math.sqrt(5) + 3 + Math.sqrt(2 + r2);
  check('LF: F = √5 + 3 + √(2 + √2) = 7.08382704252236 > 6 at v = 1', near(s.LF.score, exact, 1e-12) && near(score, exact, 1e-12) && near(exact, 7.08382704252236, 1e-13));
  // all 36 probabilities from projectors on the actual 4 × 4 state, for several visibilities
  let ok = true, why = '';
  for (const v of [1, 0.85, 0.5, 0]) {
    const st = await rail(v), rho = Madd(Msc(rhoP, v), Msc(kron(I2, I2), (1 - v) / 4));
    for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (const [ia, a] of [[0, -1], [1, 1]]) for (const [ib, b] of [[0, -1], [1, 1]]) {
      const p = Mtr(Mmul(rho, kron(Msc(Madd(I2, Msc(ndot(A[x]), a)), 0.5), Msc(Madd(I2, Msc(ndot(Bp[y]), b)), 0.5))))[0];
      if (!near(st.LF.probabilities[x][y][ia][ib], p, 1e-13) || p < -1e-12) { ok = false; why = `v ${v} x ${x} y ${y}: ${p}`; }
    }
    if (st.LF.normalizationError > 1e-13 || st.LF.noSignallingError > 1e-13 || !near(st.LF.score, v * exact, 1e-12)) { ok = false; why = `v ${v}: norm ${st.LF.normalizationError} nosig ${st.LF.noSignallingError}`; }
  }
  check('LF: the 36 probabilities equal our projector traces, are ≥ 0, normalized, no-signalling, and F = v·7.0838…', ok, why);
  const lo = await rail(0.846), hi = await rail(0.848);
  check('LF: the score crosses 6 between v = 0.846 and 0.848 (threshold 6/7.0838… = 0.8469997875)', lo.LF.score < 6 && hi.LF.score > 6 && near(lo.LF.threshold, 6 / exact, 1e-15) && near(6 / exact, 0.8469997875418989, 1e-13));
  // the 96 vertices of the LF polytope, enumerated here
  const lfScore = (ar, br, E) => -ar[0] - ar[1] - br[0] - br[1] + coef.reduce((t, row, i) => t + row.reduce((u, x, j) => u + x * E[i][j], 0), 0);
  let count = 0, vmax = -Infinity;
  for (const cf of [-1, 1]) for (const df of [-1, 1]) {
    for (const a2 of [-1, 1]) for (const a3 of [-1, 1]) for (const b2 of [-1, 1]) for (const b3 of [-1, 1]) { const ar = [cf, a2, a3], br = [df, b2, b3]; vmax = Math.max(vmax, lfScore(ar, br, ar.map((x) => br.map((y) => x * y)))); count++; }
    for (let u = 0; u < 2; u++) for (let w = 0; w < 2; w++) for (let z = 0; z < 2; z++) {
      const E = [[cf * df, 0, 0], [0, 0, 0], [0, 0, 0]];
      for (let p = 0; p < 2; p++) for (let q = 0; q < 2; q++) E[p + 1][q + 1] = (-1) ** ((p * q) ^ (u * p) ^ (w * q) ^ z);
      vmax = Math.max(vmax, lfScore([cf, 0, 0], [df, 0, 0], E)); count++;
    }
  }
  check('LF: 96 vertices of the LF polytope, maximum exactly 6 (enumerated here and on the page)', count === 96 && vmax === 6 && s.LF.vertices === 96 && s.LF.vertexMax === 6);
}
await page.click('#obliqueBtn'); s = await state();
check('the 45° control toggles on, and the unread outputs from |+x⟩ differ (Z∘O → (0, 0, ½), O∘Z → centre)', s.bubbles.oblique === true && nearV(s.bubbles.unreadZO, [0, 0, 0.5], 1e-15) && nearV(s.bubbles.unreadOZ, [0, 0, 0], 1e-15));

/* ---------- 6. the pioneer ---------- */
s = await pick('new-axis-pioneers', 0.5);
{
  const eta = 0.15, b = Math.PI / 4, n = [Math.cos(b), 0, Math.sin(b)];
  const resid = Math.hypot(n[0] - n[0], n[1] - n[1], n[2] - 0);
  // M_η = [[(1−η)·0.7 + η cos²β, 0, η cos β sin β], [0, (1−η)·0.3, 0], [η cos β sin β, 0, η sin²β]]: the xz block by the quadratic formula
  const a11 = (1 - eta) * 0.7 + eta * n[0] ** 2, a13 = eta * n[0] * n[2], a33 = eta * n[2] ** 2, tr = a11 + a33, dt = a11 * a33 - a13 * a13;
  const l1 = tr / 2 + Math.sqrt(tr * tr / 4 - dt), l3 = tr / 2 - Math.sqrt(tr * tr / 4 - dt), l2 = (1 - eta) * 0.3;
  check('pioneer: linear-escape, β = π/4, η = 0.15, P_S = diag(1, 1, 0) apart from M₀ = diag(0.7, 0.3, 0)', s.modelKind === 'linear-escape' && near(s.pioneer.beta, b, 1e-15) && s.pioneer.eta === 0.15 && nearV(s.pioneer.S, [[1, 0, 0], [0, 1, 0], [0, 0, 0]], 0) && nearV(s.pioneer.M0, [[0.7, 0, 0], [0, 0.3, 0], [0, 0, 0]], 0));
  check('pioneer: residual ‖(I − P_S)n‖ = sin β = 1/√2', near(s.pioneer.residual, resid, 1e-15) && near(resid, Math.SQRT1_2, 1e-15));
  check('pioneer: eigenvalues (0.6793081648196475, 0.255, 0.06569183518035243)', nearV(s.pioneer.eigenvalues, [l1, l2, l3], 1e-14) && nearV([l1, l2, l3], [0.6793081648196475, 0.255, 0.06569183518035243], 1e-14));
  check('pioneer: det M_η = (1 − η)²·0.7·0.3·η·sin²β = 0.011379375 and rank 3', near(s.pioneer.det, dt * l2, 1e-15) && near(s.pioneer.det, 0.011379375, 1e-14) && near(s.pioneer.detFormula, 0.011379375, 1e-14) && s.pioneer.rank === 3);
  check('pioneer: the old z mode decays as e^(−t) (e⁻¹ = 0.3679 at t = 1)', near(s.pioneer.oldZDampingAt1, Math.exp(-1), 1e-15) && s.pioneer.oldGeneratorEigen.z === 1);
}
s = await rail(0);
check('pioneer: at β = 0 it stays in the old plane (residual 0, rank 2, det 0)', s.pioneer.residual === 0 && s.pioneer.rank === 2 && s.pioneer.det === 0);
s = await rail(1);
check('pioneer: at β = π/2 the residual is 1 (T12: distance 1 from S)', near(s.pioneer.residual, 1, 1e-15) && s.pioneer.rank === 3);
s = await opts({ eta: 1, keepCard: true });
check('pioneer: η = 1 leaves only the pioneer axis (rank 1)', s.pioneer.rank === 1);
s = await opts({ eta: 0 });
check('pioneer: η = 0 keeps the old tensor (rank 2)', s.pioneer.rank === 2);
s = await pick('new-axis-pioneers', 0.5);
{
  const tip = await D('D.worldPoint(a)', s.pioneer.n), to = await D('D.worldPoint(a)', [Math.cos(1.2), 0, Math.sin(1.2)]);
  await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 6 }); await page.mouse.up();
  s = await state();
  check('pioneer: dragging the amber end tilts the axis (β follows the pointer)', Math.abs(s.pioneer.beta - 1.2) < 0.08 && s.preset === null, `${s.pioneer.beta}`);
}

/* ---------- 7. controls, rail, playback, stills ---------- */
await page.click('[data-preset="axis-consensus"]');
check('clicking a card plays it from the start', await until(page, () => window.ORTHO_CONSENSUS_DEBUG.state.playing && window.ORTHO_CONSENSUS_DEBUG.state.s > 0));
await D('D.setRail(a)', 0);
await page.click('#sceneChips [data-scene="records"]'); s = await state();
check('scene chip “records” switches the scene and releases the card', s.scene === 'records' && s.preset === null);
await page.keyboard.press('1'); s = await state();
check('key 1 returns to the tensor scene', s.scene === 'tensor');
await page.click('#setChips [data-axisset="fog"]'); s = await state();
check('axis-set chip “six-axis fog” installs the fog', s.axes.length === 6 && s.pointerAxis === null);
await page.click('#modeChips [data-mode="weak-limit"]'); s = await state();
check('channel chip “weak limit” switches the construction', s.channelMode === 'weak-limit');
await page.evaluate(() => { const el = document.getElementById('alpha'); el.value = '0.9'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('the strength slider sets α', near(s.alpha, 0.9, 1e-12));
await page.click('#pinchBtn'); s = await state();
check('the full-pinching chip sets α = π/2', s.alpha === Math.PI / 2 && (await page.getAttribute('#pinchBtn', 'aria-pressed')) === 'true');
for (const [card, still, key] of [['isotropic-fog', 1, (x) => x.k === 16], ['axis-consensus', 1, (x) => x.k === 16], ['phase-gauge', 1, (x) => x.gauge.flips === 8], ['darwinism-plateau', 0.5, (x) => x.m === 8], ['dual-wigner-bubbles', 1, (x) => x.s === 1 && x.bubbles.trace === 1], ['new-axis-pioneers', 0.5, (x) => near(x.pioneer.beta, Math.PI / 4, 1e-15)]]) {
  const shot = await T.open(BOOK, ID, `?shot=1&lang=en&preset=${card}`, { viewport: { width: 800, height: 450 }, reducedMotion: 'reduce' });
  await settle(shot, 300);
  const st = await shot.evaluate(() => JSON.parse(JSON.stringify(window.ORTHO_CONSENSUS_DEBUG.state)));
  check(`still of ${card}: opens on that card at its still frame (s = ${still})`, st.preset === card && near(st.s, still, 1e-12) && !st.playing && key(st), JSON.stringify({ p: st.preset, s: st.s }));
  await shot.context().close();
}
{
  const fig = await T.open(BOOK, ID, '?embed=1&lang=zh&preset=phase-gauge', { viewport: { width: 740, height: 500 } });
  await settle(fig, 300);
  check('a cited figure (?embed=1&preset=phase-gauge) opens on its card and plays when seen', await until(fig, () => { const st = window.ORTHO_CONSENSUS_DEBUG.state; return st.preset === 'phase-gauge' && st.s > 0; }));
  await fig.context().close();
}

/* ---------- 8. colour, typography and touch contracts ---------- */
const src = fs.readFileSync(path.join(HERE, '..', ID, 'main.js'), 'utf8'), css = fs.readFileSync(path.join(HERE, '..', ID, 'style.css'), 'utf8'), html = fs.readFileSync(path.join(HERE, '..', ID, 'index.html'), 'utf8');
check('no literal colour values in main.js or style.css', !/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/.test(src.replace(/\/\*[\s\S]*?\*\//g, '')) && !/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/.test(css.replace(/\/\*[\s\S]*?\*\//g, '')));
check('green (the ok token) is never used on the stage or in the page style', !/\bP\.ok\b|palette\.ok|--ok\b|--tr-ok\b/.test(src) && !/--ok\b|--tr-ok\b/.test(css));
check('the page loads only the shared theme, its style, the shared runtime, the kit and main.js', (() => { const local = [...html.matchAll(/(?:src|href)="(?!https:|#|\.\.\/\.\.\/)([^"]+)"/g)].map((m) => m[1]).filter((u) => /\.(css|js)$/.test(u)); return JSON.stringify(local) === JSON.stringify(['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js']); })());
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`);
  let bad = [];
  for (const c of ['isotropic-fog', 'phase-gauge', 'darwinism-plateau', 'dual-wigner-bubbles', 'new-axis-pioneers']) {
    await page.click(`[data-preset="${c}"]`); await settle(page);
    bad = bad.concat(await page.evaluate(() => {
      const out = [], walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const el = n.parentElement; if (!el || !/[α-ωΑ-Ωϕ∂∑]/.test(n.textContent) || !el.getClientRects().length) continue;
        if (getComputedStyle(el).textTransform === 'uppercase') out.push(n.textContent.trim().slice(0, 30));
      }
      return out;
    }));
  }
  check(`typography (${lang}): no Greek or math letter is set through an uppercase transform`, bad.length === 0, bad.slice(0, 4).join(' | '));
}
{
  const phone = await T.open(BOOK, ID, '?lang=en', { viewport: { width: 390, height: 844 } });
  await settle(phone, 300);
  const small = await phone.evaluate(() => [...document.querySelectorAll('button, input[type=range]')].filter((b) => b.getClientRects().length && getComputedStyle(b).visibility !== 'hidden' && !b.closest('[hidden]')).map((b) => [b.id || b.dataset.preset || b.dataset.scene || b.dataset.rec || b.textContent.trim().slice(0, 12), b.getBoundingClientRect().height]).filter(([, h]) => h < 43.5));
  check('phone: every button and slider is at least 44 px tall', small.length === 0, JSON.stringify(small.slice(0, 6)));
  await phone.context().close();
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
