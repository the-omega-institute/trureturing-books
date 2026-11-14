#!/usr/bin/env node
// Browser regression suite for ORTHO//TABLE (books/quantum-geometry/viz/self-referential-table/).
//   node books/quantum-geometry/viz/tests/self-referential-table.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// The page builds T = Σ vₐvₐᵀ from discrete cosine vectors, iterates 3T² − 2T³ and finds eigenvalues by Jacobi
// rotations. The suite checks it another way: its own matrix product (i-j-k loop order with Kahan-free plain sums),
// Gram–Schmidt orthonormality of the basis, the rank by Gaussian elimination with partial pivoting, the null space
// from that elimination, the spectral norm by power iteration on Δ², and the number of eigenvalues above ½ by
// Sylvester's law of inertia (signs of the LDLᵀ pivots of T₀ − ½I). It reads the page through window.TABLE_DEBUG.
// The solid (a glass ball of a 3D slice of ℝᴺ with the image of its unit ball inside) is checked against the same
// independent algebra: the slice is orthonormal and mapped into itself, the semi-axes are |qᵀAq| of the matrix on the
// stage (the healing steps recomputed here from T + Δ), the rank of the 3 × 3 compression QᵀAQ by elimination matches
// the shape drawn, the arrows are the rows, ψ and Tψ in slice coordinates, the lower pole is behind the plane by a
// ray–plane intersection; then solidChecks of the testkit (a lit, shaded body; turning; hidden marks; resting).
// The healing iteration is checked as a finite computation: the page may call a step "approximately idempotent" only
// when its error is ≤ 10⁻¹², and may predict a same-rank projection only under ‖Δ‖₂ < (√3 − 1)/2 (strict); the suite
// verifies both with its own products, power iteration and Sturm counts, including the counterexamples that refute a
// uniform few-step promise (N = r = 8, ε = −0.36 on (6, 7)) and the old ‖Δ‖₂ < ½ guarantee (T = I, Δ = aEᵢᵢ).
import { session, stageFirstChecks, solidChecks, solidPixels, settle, until, openStill } from '../../../../tools/node/viz-testkit.mjs';
import { withReadySolid } from './solid-readiness.mjs';
import { transitionChecks } from './self-referential-table-transitions.mjs';

const BOOK = 'quantum-geometry', ID = 'self-referential-table';
const part = process.env.VIZ_TEST_PART || 'all';
if (!['all', 'checks', 'transitions'].includes(part)) throw new Error(`unknown execution part: ${part}`);
const T = await session();
if (part === 'transitions') {
  // Fresh-session prerequisites: the same Chinese page, fonts, solid and settled controls.
  const page = await T.goto(BOOK, ID, '?lang=zh');
  await page.evaluate(() => document.fonts.ready);
  await until(page, () => window.TRV.solids?.[0]?.contexts > 0, null, 120000);
  await page.evaluate(async () => { await window.TRV.solids[0].ready; window.TRV.kit.flush(); });
  await settle(page);
  // Recreate the original sweep's preceding size-regression state, without repeating its assertions.
  await page.click('[data-size="12"]'); await page.click('[data-scene="read"]'); await settle(page);
  const last = await page.evaluate(() => window.TABLE_DEBUG.point.cell(11, 11));
  await page.mouse.click(last.x, last.y); await settle(page);
  await page.click('[data-preset="reset"]'); await settle(page);
  await page.click('[data-scene="read"]'); await settle(page);
  const start = await page.evaluate(() => window.TABLE_DEBUG.state);
  if (start.N !== 8 || start.r !== 1 || start.i !== 7 || start.j !== 7 || start.scene !== 'read') throw new Error('transition bootstrap differs from the original sweep');
  await transitionChecks(T, page);
  if (T.errors.length) throw new Error(T.errors.join(' | '));
  await T.finish();
}
const { check } = T;

/* ---------- independent linear algebra ---------- */
const matmul = (A, B) => A.map((_, i) => B[0].map((__, j) => { let s = 0; for (let k = 0; k < B.length; k++) s += A[i][k] * B[k][j]; return s; }));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const apply = (A, v) => A.map((r) => r.reduce((s, x, k) => s + x * v[k], 0));
const dot = (a, b) => a.reduce((s, x, k) => s + x * b[k], 0);
const vnorm = (v) => Math.sqrt(dot(v, v));
/** Rank and a basis of the null space by Gaussian elimination with partial pivoting (tolerance tol). */
function rref(A0, tol = 1e-9) {
  const A = A0.map((r) => r.slice()), n = A.length, m = A[0].length, piv = [];
  let row = 0;
  for (let col = 0; col < m && row < n; col++) {
    let best = row; for (let i = row + 1; i < n; i++) if (Math.abs(A[i][col]) > Math.abs(A[best][col])) best = i;
    if (Math.abs(A[best][col]) < tol) continue;
    [A[row], A[best]] = [A[best], A[row]];
    const p = A[row][col]; for (let j = 0; j < m; j++) A[row][j] /= p;
    for (let i = 0; i < n; i++) if (i !== row) { const f = A[i][col]; if (f) for (let j = 0; j < m; j++) A[i][j] -= f * A[row][j]; }
    piv.push(col); row++;
  }
  const free = [...Array(m).keys()].filter((c) => !piv.includes(c));
  const nulls = free.map((f) => { const v = new Array(m).fill(0); v[f] = 1; piv.forEach((c, r) => { v[c] = -A[r][f]; }); return v; });
  return { rank: piv.length, nulls };
}
/** Spectral norm of a symmetric matrix by power iteration on its square. */
function specNorm(D) {
  let v = D.map((_, i) => 1 + 0.37 * i), lam = 0;
  const D2 = matmul(D, D);
  for (let it = 0; it < 2000; it++) { const w = apply(D2, v), n = vnorm(w); if (n < 1e-300) return 0; v = w.map((x) => x / n); lam = n; }
  return Math.sqrt(lam);
}
/** Number of eigenvalues of symmetric A above s: Householder tridiagonalization, then a Sturm sequence count. */
function countAbove(A0, s) {
  const n = A0.length, A = A0.map((r) => r.slice());
  for (let k = 0; k < n - 2; k++) {
    const x = A.slice(k + 1).map((r) => r[k]), alpha = -Math.sign(x[0] || 1) * vnorm(x);
    const v = x.slice(); v[0] -= alpha; const vn = vnorm(v); if (vn < 1e-300) continue;
    const u = v.map((t) => t / vn), H = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => (i === j ? 1 : 0) - (i > k && j > k ? 2 * u[i - k - 1] * u[j - k - 1] : 0)));
    const B = matmul(matmul(H, A), H); for (let i = 0; i < n; i++) A[i] = B[i];
  }
  let below = 0, q = 1;
  for (let i = 0; i < n; i++) {
    q = A[i][i] - s - (i ? (A[i][i - 1] ** 2) / q : 0);
    if (q === 0) q = 1e-300;
    if (q < 0) below++;
  }
  return n - below;
}

const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (__, j) => (i === j ? 1 : 0)));
const zerosM = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const fro = (A) => Math.sqrt(A.flat().reduce((t, x) => t + x * x, 0));
const outer = (v) => v.map((x) => v.map((y) => x * y));
const tr = (A) => A.reduce((t, row, i) => t + row[i], 0);
/** m steps of X ↦ 3X² − 2X³ with this suite's own product. */
function mcweeny(X0, m) { let X = X0; for (let q = 0; q < m; q++) { const X2 = matmul(X, X); X = sub(X2.map((r) => r.map((x) => 3 * x)), matmul(X2, X).map((r) => r.map((x) => 2 * x))); } return X; }
const residual = (X) => fro(sub(matmul(X, X), X));
/** Δ of a list of clicks, built here from the clicks themselves (ε on (i, j) and on (j, i)). */
function knock(n, clicks) { const D = zerosM(n); for (const [i, j, e] of clicks) { D[i][j] += e; if (i !== j) D[j][i] += e; } return D; }
const A_SAFE = (Math.sqrt(3) - 1) / 2, TOL = 1e-12;

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.TABLE_DEBUG.state); };
const dbg = async (fn, arg) => { await settle(page); return page.evaluate(fn, arg); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seekEnd = () => page.evaluate(() => window.TABLE_DEBUG.seek(1e9));
/** Move a range control as a reader does (value + input event), then let the page settle. */
const slide = async (sel, v) => { await page.evaluate(([q, x]) => { const el = document.querySelector(q); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, [sel, v]); await settle(page); };
const clickCell = async (i, j) => { const p = await dbg((a) => window.TABLE_DEBUG.point.cell(a[0], a[1]), [i, j]); await page.mouse.click(p.x, p.y); await settle(page); };
const text = (sel) => page.evaluate((q) => document.querySelector(q).textContent, sel);

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on ROW · COL: N = 4, r = 2, cell (1, 4), read to the end', s.preset === 'dual_read' && s.scene === 'read' && s.N === 4 && s.r === 2 && s.i === 0 && s.j === 3 && s.k === 4 && !s.playing);
const unchangedText = await page.evaluate(() => {
  const observer = new MutationObserver(() => {});
  for (const id of ['readouts', 'pillSize', 'pillErr', 'plotMeta', 'oRank']) observer.observe(document.getElementById(id), { subtree: true, childList: true, characterData: true });
  for (let i = 0; i < 10; i++) window.TRV.kit.flush();
  const count = observer.takeRecords().length; observer.disconnect();
  return count;
});
check('a stationary redraw preserves unchanged readout text nodes', unchangedText === 0, `${unchangedText} text mutations`);

// T is symmetric, idempotent, of rank r with trace r, for every N and r the page offers
let worstSym = 0, worstIdem = 0, worstTrace = 0, rankOk = true, nullOk = true, basisOk = true;
for (const N of [4, 8, 12]) {
  await page.click(`[data-size="${N}"]`);
  for (const r of [1, 2, Math.floor(N / 2), N - 1, N]) {
    await page.evaluate((v) => window.TABLE_DEBUG.setR(v), r);
    const M = await dbg(() => window.TABLE_DEBUG.T()), B = await dbg(() => window.TABLE_DEBUG.basis());
    worstSym = Math.max(worstSym, maxAbs(sub(M, transpose(M))));
    worstIdem = Math.max(worstIdem, maxAbs(sub(matmul(M, M), M)));
    worstTrace = Math.max(worstTrace, Math.abs(M.reduce((t, row, i) => t + row[i], 0) - r));
    const R = rref(M);
    if (R.rank !== r) rankOk = false;
    for (const w of R.nulls) if (vnorm(apply(M, w)) > 1e-9 * vnorm(w)) nullOk = false;
    if (R.nulls.length !== N - r) nullOk = false;
    // the basis is orthonormal and each vector is fixed by T
    for (let a = 0; a < B.length; a++) {
      for (let b = 0; b < B.length; b++) if (Math.abs(dot(B[a], B[b]) - (a === b ? 1 : 0)) > 1e-12) basisOk = false;
      if (vnorm(sub([apply(M, B[a])], [B[a]])[0]) > 1e-12) basisOk = false;
    }
  }
}
check('Tᵀ = T for N ∈ {4, 8, 12} and five ranks each', worstSym < 1e-15, `max ${worstSym}`);
check('T² = T by an independent matrix product', worstIdem < 1e-13, `max ${worstIdem}`);
check('trace = r', worstTrace < 1e-12, `max ${worstTrace}`);
check('rank by Gaussian elimination equals r', rankOk);
check('the null space has dimension N − r and Tw = 0 on it', nullOk);
check('the basis is orthonormal and Tvₐ = vₐ', basisOk);

// the N slider and chips
s = await state();
check('size chips set N and the rank slider follows (N = 12, r = 12)', s.N === 12 && s.r === 12 && (await page.evaluate(() => document.getElementById('rank').max)) === '12');
await page.evaluate(() => { const el = document.getElementById('rank'); el.value = '5'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the rank slider sets r and leaves the card', s.r === 5 && s.preset === null);

// READ: row i reads column j, term by term
await pick('dual_read'); await seekEnd();
s = await state();
let M = await dbg(() => window.TABLE_DEBUG.T()), prods = await dbg(() => window.TABLE_DEBUG.products());
const M2 = matmul(M, M);
check('ROW · COL: the four products are TᵢₖTₖⱼ', s.N === 4 && prods.length === 4 && prods.every((p, k) => Math.abs(p - M[0][k] * M[k][3]) < 1e-15));
check('ROW · COL: they add up to (T²)₁₄ = T₁₄', Math.abs(s.partial - M2[0][3]) < 1e-15 && Math.abs(M2[0][3] - M[0][3]) < 1e-15, `${s.partial} vs ${M[0][3]}`);
check('ROW · COL: some products are negative (magenta) and T₁₄ < 0', prods.some((p) => p < 0) && prods.some((p) => p > 0) && M[0][3] < 0);
await page.evaluate(() => window.TABLE_DEBUG.seek(3));
s = await state();
check('the rail adds terms one at a time (3 of 4)', s.k === 3 && Math.abs(s.partial - (prods[0] + prods[1] + prods[2])) < 1e-15);
// ROW · COL, a diagonal cell: the card note says a click there makes every product a square that adds up to Tₖₖ
let pt = await dbg(() => window.TABLE_DEBUG.point.cell(2, 2));
await page.mouse.click(pt.x, pt.y); await seekEnd(); s = await state(); prods = await dbg(() => window.TABLE_DEBUG.products());
check('ROW · COL, diagonal cell (3, 3): every product is a square ≥ 0', s.i === 2 && s.j === 2 && prods.every((p, k) => p >= 0 && Math.abs(p - M[2][k] ** 2) < 1e-15));
check('ROW · COL, diagonal cell (3, 3): the squares add up to T₃₃ (|row 3|² = T₃₃)', Math.abs(prods.reduce((a, b) => a + b, 0) - M[2][2]) < 1e-14 && Math.abs(vnorm(M[2]) ** 2 - M[2][2]) < 1e-14);
check('the DIAGONAL card is gone (merged into ROW · COL)', (await page.locator('[data-preset="diagonal"]').count()) === 0);
// a click on a cell selects it in the read scene
pt = await dbg(() => window.TABLE_DEBUG.point.cell(3, 1));
await page.mouse.click(pt.x, pt.y); s = await state();
check('clicking a cell in READ selects it', s.i === 3 && s.j === 1 && s.scene === 'read' && s.preset === null);

// RANK cards
await pick('reset'); s = await state(); M = await dbg(() => window.TABLE_DEBUG.T());
check('RANK 1: r = 1, every cell is 1/8, trace 1', s.scene === 'rank' && s.r === 1 && M.flat().every((x) => Math.abs(x - 1 / 8) < 1e-15) && Math.abs(s.trace - 1) < 1e-14);
await pick('full'); s = await state(); M = await dbg(() => window.TABLE_DEBUG.T());
check('FULL: r = N = 8, T is the identity', s.r === 8 && M.every((row, i) => row.every((x, j) => Math.abs(x - (i === j ? 1 : 0)) < 1e-14)));
check('FULL: no null vector left (rank 8 by elimination)', rref(M).rank === 8);
check('FULL: the LEAN ✓ box of the rank scene is shown', await page.evaluate(() => !document.querySelector('[data-scenes="rank"]').hidden));
await pick('expand_table'); s = await state();
check('EXPAND: starts at r = 1 and plays', s.r === 1 && s.playing);
check('EXPAND: the rail writes in more rows as it plays', await until(page, () => window.TABLE_DEBUG.state.r >= 2));
await seekEnd(); s = await state();
check('EXPAND: the rail ends at r = N = 8', s.r === 8 && Math.abs(s.trace - 8) < 1e-12);

// RANK: the capacity theorem is about density states and effects; the N rows of T are not r orthogonal states.
// For every N and r the reader can set, the suite builds Pₐ = vₐvₐᵀ from the page's generators and the same number r
// of effects E₁ = P₁ + (I − T), Eₐ = Pₐ, and checks the theorem's hypotheses with its own arithmetic.
let rowsOk = true, rank1Ok = true, gensOk = true, povmOk = true, rPlus1Ok = true;
const capDetail = [];
for (const N of [4, 8, 12]) {
  await page.click(`[data-size="${N}"]`); await page.click('[data-scene="rank"]'); await settle(page);
  for (let r = 1; r <= N; r++) {
    await slide('#rank', r);
    const M0 = await dbg(() => window.TABLE_DEBUG.T()), B = await dbg(() => window.TABLE_DEBUG.basis()), st = await state();
    if (st.r !== r || st.N !== N) { gensOk = false; capDetail.push(`N ${N} r ${r}: page at ${st.N}/${st.r}`); continue; }
    // the N rows: their Gram matrix is T·Tᵀ = T, the identity only when r = N
    const G = matmul(M0, transpose(M0));
    if (maxAbs(sub(G, M0)) > 1e-13 || (r < N) !== (maxAbs(sub(G, eye(N))) > 1e-3)) { rowsOk = false; capDetail.push(`rows N ${N} r ${r}`); }
    if (r === 1) for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) if (Math.abs(dot(M0[a], M0[b]) - 1 / N) > 1e-14 || Math.abs(M0[a][b] - 1 / N) > 1e-15) rank1Ok = false;
    // the r generators: orthonormal, and they build T
    const Ps = B.map(outer);
    if (B.length !== r || maxAbs(sub(matmul(B, transpose(B)), eye(r))) > 1e-12 || maxAbs(sub(Ps.reduce(add, zerosM(N)), M0)) > 1e-12) { gensOk = false; capDetail.push(`gens N ${N} r ${r}`); }
    // same-count effects: E₁ = P₁ + (I − T), Eₐ = Pₐ (a ≥ 2)
    const Es = Ps.map((P, a) => (a === 0 ? add(P, sub(eye(N), M0)) : P));
    const psd = (X) => countAbove(X, -1e-10) === N, density = (X) => psd(X) && Math.abs(tr(X) - 1) < 1e-12;
    let ok = Es.length === Ps.length && maxAbs(sub(Es.reduce(add, zerosM(N)), eye(N))) < 1e-12 && Es.every(psd) && Ps.every(density);
    for (let q = 0; q < r && ok; q++) for (let a = 0; a < r; a++) if (Math.abs(tr(matmul(Es[q], Ps[a])) - (q === a ? 1 : 0)) > 1e-12) ok = false;
    if (!ok) { povmOk = false; capDetail.push(`povm N ${N} r ${r}`); }
    // the r + 1 effects P₁ … P_r, I − T also add up to I, but they are one more than the states: not the theorem's shape
    const extra = [...Ps, sub(eye(N), M0)];
    if (extra.length !== r + 1 || maxAbs(sub(extra.reduce(add, zerosM(N)), eye(N))) > 1e-12 || Ps.some((P) => Math.abs(tr(matmul(extra[r], P))) > 1e-12)) rPlus1Ok = false;
  }
}
check('RANK: for every N and r the N rows of T have Gram matrix T, orthonormal only at r = N', rowsOk, capDetail.slice(0, 3).join(' | '));
check('RANK 1: every row is (1/N, …, 1/N) and any two rows have dot product 1/N (rows are not orthogonal states)', rank1Ok);
check('RANK: the page’s r generators are orthonormal and Σ vₐvₐᵀ = T, for every N and r', gensOk, capDetail.slice(0, 3).join(' | '));
check('RANK: Pₐ = vₐvₐᵀ are density states and E₁ = P₁ + (I − T), Eₐ = Pₐ are r PSD effects with Σ E = I and Tr(EₛPₐ) = δₐₛ', povmOk, capDetail.slice(0, 3).join(' | '));
check('RANK: P₁ … P_r and I − T also add up to I but are r + 1 effects (I − T reads 0 on every state)', rPlus1Ok);
const capBoxes = async () => page.evaluate(() => [...document.querySelectorAll('#readouts .lean')].filter((b) => !b.hidden).map((b) => ({ green: !/(num|model|argued|open)/.test(b.className), link: !!b.querySelector('a[data-lean-gid]'), zh: b.querySelector('.zh') ? b.querySelector('.zh').textContent : '', en: b.querySelector('.en') ? b.querySelector('.en').textContent : '' })));
let cb = await capBoxes();
check('RANK scene: the green box states only the frozen theorem; the hand application to this table is a separate ARGUED box',
  cb.filter((b) => b.green).length === 1 && cb.find((b) => b.green).link && !/这张表|this table/.test(cb.find((b) => b.green).zh + cb.find((b) => b.green).en)
  && cb.some((b) => !b.green && !b.link && /E₁ = P₁ \+ \(I − T\)/.test(b.zh) && /E₁ = P₁ \+ \(I − T\)/.test(b.en)), JSON.stringify(cb.map((b) => [b.green, b.zh.slice(0, 20)])));
await page.click('[data-scene="read"]'); cb = await capBoxes();
check('the capacity boxes belong to the rank scene only', cb.every((b) => !/E₁ = P₁/.test(b.zh)) && cb.filter((b) => b.green).length === 0);

// HEAL: knock, iterate 3T² − 2T³
await pick('heal');
await seekEnd(); s = await state();
const its = await dbg(() => window.TABLE_DEBUG.iterates()), T0 = its[0], Tc = await dbg(() => window.TABLE_DEBUG.T()), D = await dbg(() => window.TABLE_DEBUG.delta());
check('HEAL: the knock is +0.3 on (2, 5) and (5, 2) and nowhere else', D.flat().filter((x) => x !== 0).length === 2 && D[1][4] === 0.3 && D[4][1] === 0.3);
check('HEAL: T₀ = T + Δ', maxAbs(sub(T0, Tc.map((r, i) => r.map((x, j) => x + D[i][j])))) < 1e-15);
let iterOk = true, mine = T0;
for (let m = 1; m < its.length; m++) { const X2 = matmul(mine, mine); mine = sub(X2.map((r) => r.map((x) => 3 * x)), matmul(X2, mine).map((r) => r.map((x) => 2 * x))); if (maxAbs(sub(mine, its[m])) > 1e-12) iterOk = false; }
check('HEAL: each step is 3Tₘ² − 2Tₘ³ (independent product)', iterOk);
const dn = specNorm(D);
check('HEAL: ‖Δ‖₂ = 0.3 by power iteration, below (√3 − 1)/2', Math.abs(dn - s.dnorm) < 1e-9 && Math.abs(dn - 0.3) < 1e-9 && dn < (Math.sqrt(3) - 1) / 2);
const Tinf = its[its.length - 1];
check('HEAL card: the 8th step is idempotent to 1e−12 and symmetric', maxAbs(sub(matmul(Tinf, Tinf), Tinf)) < 1e-12 && maxAbs(sub(Tinf, transpose(Tinf))) < 1e-15);
check('HEAL card: the 8th step is, to 1e−6, a projection of rank r = 3 (elimination and trace)', rref(Tinf, 1e-6).rank === 3 && Math.abs(Tinf.reduce((t, r, i) => t + r[i], 0) - 3) < 1e-10);
check('HEAL card: that rank = number of eigenvalues of T₀ above ½ (Sylvester inertia)', countAbove(T0, 0.5) === 3);
check('HEAL card: the 8th step commutes with T₀ (it is a polynomial in T₀)', maxAbs(sub(matmul(Tinf, T0), matmul(T0, Tinf))) < 1e-10);
check('HEAL card: the 8th step is not the original T (largest entry difference between 10⁻³ and 0.3)', maxAbs(sub(Tinf, Tc)) > 1e-3 && maxAbs(sub(Tinf, Tc)) < 0.3);
const e = its.map((X) => Math.sqrt(sub(matmul(X, X), X).flat().reduce((a, x) => a + x * x, 0)));
check('HEAL: the page’s idempotency errors match an independent computation', e.every((x, m) => Math.abs(x - s.errs[m]) <= 1e-12 + 1e-9 * x));
const quad = e.slice(0, -1).map((x, m) => (x < 0.05 && e[m + 1] > 1e-14 ? e[m + 1] / (x * x) : null)).filter((x) => x != null);
check('HEAL: once small, the error is squared each step (eₘ₊₁ ≤ 10·eₘ²)', quad.length >= 1 && quad.every((q) => q < 10), quad.join(', '));
const eg = await dbg(() => window.TABLE_DEBUG.eigs());
check('HEAL card: the eigenvalues of the 8th step are within 1e−9 of 0 or 1, three of them near 1', eg.every((x) => Math.min(Math.abs(x), Math.abs(x - 1)) < 1e-9) && eg.filter((x) => x > 0.5).length === 3);
// the card note says “below 10⁻¹² by step 7” for this one knock: step 6 is above the tolerance, step 7 at or below it
check('HEAL card: its own error crosses 10⁻¹² at step 7 (independent iteration), and the page says so only from step 7', e[6] > TOL && e[7] <= TOL && s.heal === 'tol' && s.safe === true);
await page.evaluate(() => window.TABLE_DEBUG.seek(6)); s = await state();
check('HEAL card at step 6: not yet called approximately idempotent', s.heal === 'open' && /还不幂等/.test(await text('#roNote')) && !/近似幂等/.test(await text('#hudSub')));
await seekEnd(); s = await state();
const eg0 = await dbg(() => window.TABLE_DEBUG.eigs(0));
check('HEAL: the Jacobi eigenvalues of T₀ add up to its trace and match the inertia count', Math.abs(eg0.reduce((a, b) => a + b, 0) - T0.reduce((t, r, i) => t + r[i], 0)) < 1e-12 && eg0.filter((x) => x > 0.5).length === countAbove(T0, 0.5));
// a big negative knock on a free direction: still some projection, rank may change
await page.evaluate(() => { document.getElementById('clearBtn').click(); });
await page.evaluate(() => { const el = document.getElementById('kick'); el.value = '-0.45'; el.dispatchEvent(new Event('input', { bubbles: true })); });
await settle(page);
pt = await dbg(() => window.TABLE_DEBUG.point.cell(7, 7));
await page.mouse.click(pt.x, pt.y); await seekEnd(); s = await state();
const its2 = await dbg(() => window.TABLE_DEBUG.iterates()), L2 = its2[its2.length - 1];
check('clicking a cell in HEAL adds ε there (−0.45 on (8, 8))', s.kicks.length === 1 && s.kicks[0].i === 7 && s.kicks[0].j === 7 && s.kicks[0].eps === -0.45);
check('ε = −0.45 on (8, 8): ‖Δ‖₂ = 0.45 is outside the sufficient condition and the page says so (no predicted limit or rank)', !s.safe && Math.abs(specNorm(knock(8, [[7, 7, -0.45]])) - 0.45) < 1e-12 && /不小于/.test(await text('#roNote')) && !/渐近趋向/.test(await text('#roNote')));
check('ε = −0.45 on (8, 8): this run’s 8th step happens to be idempotent to 1e−9, of rank = eigenvalues of T₀ above ½ (an observation, not a guarantee)', maxAbs(sub(matmul(L2, L2), L2)) < 1e-9 && rref(L2, 1e-6).rank === countAbove(its2[0], 0.5));
await page.click('#clearBtn'); s = await state();
check('“remove the knocks” clears Δ', s.kicks.length === 0 && s.errs.every((x) => x < 1e-13));

// HEAL, a finite counterexample to a uniform few-step promise (real controls): FULL (N = r = 8), ε = −0.36 on (6, 7).
// ‖Δ‖₂ = 0.36 is inside the sufficient condition, yet the 8th step is far from idempotent.
await pick('full'); await page.click('[data-scene="heal"]'); await settle(page);
await slide('#kick', -0.36); await clickCell(5, 6); await slide('#now', 8); s = await state();
const D8 = knock(8, [[5, 6, -0.36]]), X0f = add(eye(8), D8), X8f = mcweeny(X0f, 8), res8 = residual(X8f);
check('counterexample: the page table is I₈ and its Δ is −0.36 on (6, 7) and (7, 6) only', maxAbs(sub(await dbg(() => window.TABLE_DEBUG.T()), eye(8))) < 1e-14 && maxAbs(sub(await dbg(() => window.TABLE_DEBUG.delta()), D8)) === 0 && s.m === 8);
check('counterexample: independent 8th-step residual ‖X² − X‖_F = 0.17279310603227, and the page reports the same', Math.abs(res8 - 0.17279310603227) < 5e-14 && Math.abs(s.errs[8] - res8) < 1e-12, `${res8} vs ${s.errs[8]}`);
const lamMin = 1 - specNorm(sub(eye(8), X8f));
check('counterexample: the 8th step has an eigenvalue 0.7778612854784 (power iteration on I − X₈; page Jacobi agrees)', Math.abs(lamMin - 0.7778612854784) < 1e-12 && Math.abs((await dbg(() => window.TABLE_DEBUG.eigs(8)))[0] - lamMin) < 1e-9, String(lamMin));
check('counterexample: ‖Δ‖₂ = 0.36 < (√3 − 1)/2, and the page marks it safe but not idempotent at step 8', Math.abs(specNorm(D8) - 0.36) < 1e-12 && specNorm(D8) < A_SAFE && s.safe === true && s.heal === 'open' && s.safeBound === A_SAFE && s.tol === TOL);
let note = await text('#roNote'), hudSub = await text('#hudSub');
check('counterexample: the words report the computed error and “not idempotent yet”, never an idempotent table', note.includes('1.7e−1') && /还不幂等/.test(note) && /还不幂等/.test(hudSub) && !/回到一张.{0,8}幂等/.test(note + hudSub) && !/近似幂等。/.test(note), note.slice(0, 120));
const X16 = mcweeny(X8f, 8);
check('counterexample: continuing (independently) the iterates do reach a rank-8 projection: the sufficient condition is asymptotic', residual(X16) < 1e-12 && countAbove(X16, 0.5) === 8 && countAbove(X0f, 0.5) === 8);
await page.click('[data-lang-set="en"]'); await settle(page);
note = await text('#roNote'); hudSub = await text('#hudSub');
check('counterexample (English): the same finite report', /not idempotent yet/.test(note) && /not idempotent yet/.test(hudSub) && !/back to an idempotent/.test(note), note.slice(0, 120));
await page.click('[data-lang-set="zh"]'); await settle(page);

// HEAL, the equality case refutes the old “‖Δ‖₂ < ½ ⇒ some projection”: T = I, Δ = aEᵢᵢ, a = (√3 − 1)/2 < ½.
// Scalar algebra, independent of the page: λ₀ = 1 + a = (1 + √3)/2 and f(λ₀) = λ₀²(3 − 2λ₀) = ((2 + √3)/2)(2 − √3) = ½,
// a fixed point of f; the residual of ½ is ½² − ½ = −¼ for ever.
const fS = (x) => 3 * x * x - 2 * x ** 3, lam0 = 1 + A_SAFE;
check('scalar: a = (√3 − 1)/2 < ½, f((1 + √3)/2) = ½ = f(½), residual ¼', A_SAFE < 0.5 && Math.abs(lam0 - (1 + Math.sqrt(3)) / 2) < 1e-15 && Math.abs(fS(lam0) - 0.5) < 2e-15 && fS(0.5) === 0.5 && Math.abs((((2 + Math.sqrt(3)) / 2) * (2 - Math.sqrt(3))) - 0.5) < 1e-15 && 0.5 * 0.5 - 0.5 === -0.25);
await page.click('#clearBtn'); await settle(page);
await page.evaluate((a) => window.TABLE_DEBUG.kick(3, 3, a), A_SAFE); await slide('#now', 8); s = await state();
const Xa = mcweeny(add(eye(8), knock(8, [[3, 3, A_SAFE]])), 8);
check('equality case on the page: ‖Δ‖₂ = (√3 − 1)/2 exactly is not marked safe (the condition is strict)', s.dnorm === A_SAFE && s.safe === false && s.heal === 'open');
check('equality case: the 8th-step residual stays ¼ (independent iteration and page)', Math.abs(residual(Xa) - 0.25) < 1e-9 && Math.abs(s.errs[8] - 0.25) < 1e-9, `${residual(Xa)} / ${s.errs[8]}`);
note = await text('#roNote');
check('equality case: the words predict neither limit nor rank, and say ‖Δ‖₂ < ½ is not enough', /不小于/.test(note) && /‖Δ‖₂ < ½ 也不够/.test(note) && !/渐近趋向/.test(note), note.slice(0, 100));

// HEAL across the controls: N ∈ {4, 8, 12}, three ranks, the slider's ε at its ends and around the threshold, a diagonal
// and an off-diagonal cell. Each click goes through the cell click handler; the suite rebuilds Δ from the click.
const EPS = [-0.45, -0.37, -0.36, -0.01, 0.01, 0.36, 0.37, 0.45];
let flagOk = true, weylOk = true, asymOk = true, tolOk = true, nSafe = 0, nOut = 0;
const healDetail = [];
for (const N of [4, 8, 12]) {
  await page.click(`[data-size="${N}"]`); await settle(page);
  for (const r of [1, Math.floor(N / 2), N]) {
    await slide('#rank', r); await page.click('[data-scene="heal"]'); await settle(page);
    const Tr = await dbg(() => window.TABLE_DEBUG.T());
    const runs = await page.evaluate(([n, eps]) => {
      const dbg = window.TABLE_DEBUG, kit = window.TRV.kit, out = [];
      const set = (q, v) => { const el = document.querySelector(q); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); kit.flush(); };
      for (const [i, j] of [[0, 0], [0, n - 1]]) for (const e of eps) {
        document.getElementById('clearBtn').click(); set('#kick', e); kit.flush();
        const p = dbg.point.cell(i, j); document.getElementById('cv').dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: p.x, clientY: p.y }));
        set('#now', 8);
        const st = dbg.state;
        out.push({ i, j, e, kicks: st.kicks, safe: st.safe, heal: st.heal, err8: st.errs[8], T0: dbg.iterates()[0] });
      }
      return out;
    }, [N, EPS]);
    for (const u of runs) {
      const eUsed = u.kicks.length ? u.kicks[0].eps : NaN, Dk = knock(N, [[u.i, u.j, eUsed]]), T0k = u.T0, dn = specNorm(Dk);
      if (u.kicks.length !== 1 || Math.abs(eUsed - u.e) > 1e-12 || maxAbs(sub(T0k, add(Tr, Dk))) > 1e-15) { flagOk = false; healDetail.push(`click N${N} r${r} ${u.i},${u.j} ${u.e}`); continue; }
      if (u.safe !== (dn < A_SAFE)) { flagOk = false; healDetail.push(`safe N${N} r${r} ε${u.e}: page ${u.safe}, ‖Δ‖ ${dn}`); }
      if (dn < A_SAFE) {
        nSafe++;
        // Weyl: eigenvalues of T₀ = T + Δ lie in (−a, a) ∪ (1 − a, 1 + a), r of them in the high cluster
        if (!(countAbove(T0k, 1 + A_SAFE) === 0 && countAbove(T0k, A_SAFE) === r && countAbove(T0k, 1 - A_SAFE) === r && countAbove(T0k, -A_SAFE) === N)) { weylOk = false; healDetail.push(`weyl N${N} r${r} ε${u.e}`); }
        const Xinf = mcweeny(T0k, 60);
        if (!(residual(Xinf) < 1e-12 && countAbove(Xinf, 0.5) === r)) { asymOk = false; healDetail.push(`asym N${N} r${r} ε${u.e}`); }
      } else nOut++;
      const res = residual(mcweeny(T0k, 8));
      if (Math.abs(res - TOL) > 0.5 * TOL && u.heal !== (res <= TOL ? 'tol' : 'open')) { tolOk = false; healDetail.push(`tol N${N} r${r} ε${u.e}: ${res} ${u.heal}`); }
      if (Math.abs(u.err8 - res) > 1e-12 + 1e-9 * res) { tolOk = false; healDetail.push(`err N${N} r${r} ε${u.e}: ${res} vs ${u.err8}`); }
    }
  }
}
check('HEAL sweep: the page’s “safe” flag is exactly ‖Δ‖₂ < (√3 − 1)/2 by power iteration (144 single clicks)', flagOk && nSafe > 0 && nOut > 0, `${nSafe} safe, ${nOut} outside · ${healDetail.slice(0, 3).join(' | ')}`);
check('HEAL sweep: under the condition, T₀ has r eigenvalues in (1 − a, 1 + a) and N − r in (−a, a) (Sturm counts)', weylOk, healDetail.slice(0, 3).join(' | '));
check('HEAL sweep: under the condition, continued iteration (independent, 60 steps) reaches a projection of rank r', asymOk, healDetail.slice(0, 3).join(' | '));
check('HEAL sweep: “approximately idempotent” at step 8 exactly when the independent residual is ≤ 10⁻¹²', tolOk, healDetail.slice(0, 3).join(' | '));

// HEAL: clicks accumulate, and a large accumulated knock is reported as it is (real mouse clicks)
await page.click('[data-size="8"]'); await slide('#rank', 3); await page.click('[data-scene="heal"]'); await page.click('#clearBtn'); await settle(page);
await slide('#kick', 0.15);
const accum = [];
for (let q = 1; q <= 3; q++) { await clickCell(2, 2); await slide('#now', 8); const st = await state(); accum.push([st.kicks.length, st.dnorm, st.safe]); }
check('accumulated clicks: 0.15 three times on (3, 3) gives ‖Δ‖₂ = 0.15, 0.30, 0.45; safe, safe, outside', accum.every(([k, d], q) => k === q + 1 && Math.abs(d - 0.15 * (q + 1)) < 1e-12 && Math.abs(specNorm(knock(8, Array(q + 1).fill([2, 2, 0.15]))) - d) < 1e-12) && accum.map((a) => a[2]).join() === 'true,true,false', JSON.stringify(accum));
await page.click('#clearBtn'); await slide('#kick', -0.45);
for (let q = 0; q < 10; q++) await clickCell(0, 0);
await slide('#now', 8); s = await state();
const Xbig = mcweeny(add(await dbg(() => window.TABLE_DEBUG.T()), knock(8, Array(10).fill([0, 0, -0.45]))), 8);
hudSub = await text('#hudSub');
const T8b = await dbg(() => window.TABLE_DEBUG.T()), bigRes = Array.from({ length: 9 }, (_, q) => residual(mcweeny(add(T8b, knock(8, Array(10).fill([0, 0, -0.45]))), q)));
const k0 = s.errs.findIndex((x) => !Number.isFinite(x));
check('ten clicks of −0.45 on (1, 1): the iterates leave double precision (independently too) and the page reports overflow, not a limit', s.kicks.length === 10 && !s.safe && !Number.isFinite(residual(Xbig)) && s.heal === 'overflow' && /溢出/.test(hudSub), JSON.stringify([s.kicks.length, s.safe, s.heal, s.m, residual(Xbig), s.errs, hudSub]));
check('ten clicks of −0.45 on (1, 1): once a step overflows every later step stays non-finite (never a spurious 0), at the same step as the independent iteration', k0 > 0 && s.errs.slice(k0).every((x) => !Number.isFinite(x)) && k0 === bigRes.findIndex((x) => !Number.isFinite(x)), JSON.stringify([k0, s.errs, bigRes]));
await slide('#now', 2); s = await state();
check('ten clicks of −0.45 on (1, 1): at step 2 the finite error is reported with the condition not met', s.heal === 'open' && Number.isFinite(s.errs[2]) && Math.abs(s.errs[2] - residual(mcweeny(add(await dbg(() => window.TABLE_DEBUG.T()), knock(8, Array(10).fill([0, 0, -0.45]))), 2))) <= 1e-9 * s.errs[2]);
// the solid of those runaway steps: |λ| reaches ~10⁷ at step 2 and overflows later; what is drawn stays finite and on the
// stage (semi-axes at most 2 ball radii), and a slice direction that overflowed is said, not drawn
{ const g2 = await page.evaluate(() => window.TABLE_DEBUG.solid()); await slide('#now', 8); const g8 = await page.evaluate(() => window.TABLE_DEBUG.solid());
  check('ten clicks of −0.45 on (1, 1), solid: every drawn semi-axis is finite and ≤ 2 ball radii at steps 2 and 8; an overflowed slice direction is named in the caption; no page error',
    [g2, g8].every((g) => g && g.semi.length === 3 && g.semi.every((x) => Number.isFinite(x) && x >= 0 && x <= 2) && Number.isFinite(g.scale) && g.scale >= 1 && g.scale <= 2)
      && (g8.lam.every(Number.isFinite) || /双精度/.test(g8.caption.join(' '))) && T.errors.length === 0,
    JSON.stringify([g2 && g2.semi, g8 && g8.semi, g8 && g8.lam, g8 && g8.caption, T.errors.slice(0, 2)]));
}
await page.click('#clearBtn'); await settle(page);

// PERP: ψ(θ) turns into the complement
await pick('orthogonal_zero'); await seekEnd();
s = await state(); let V = await dbg(() => window.TABLE_DEBUG.perp()); M = await dbg(() => window.TABLE_DEBUG.T());
check('90°: ends at θ = 90° with Tψ = 0 (independent product)', Math.abs(s.theta - 90) < 1e-9 && vnorm(apply(M, V.psi)) < 1e-12);
check('90°: w is orthogonal to every basis vector and Tw = 0', (await dbg(() => window.TABLE_DEBUG.basis())).every((b) => Math.abs(dot(b, V.w)) < 1e-12) && vnorm(apply(M, V.w)) < 1e-12);
let worstCos = 0;
for (const th of [0, 20, 45, 60, 89]) {
  await page.evaluate((t) => window.TABLE_DEBUG.seek(t), th);
  V = await dbg(() => window.TABLE_DEBUG.perp());
  worstCos = Math.max(worstCos, Math.abs(vnorm(apply(M, V.psi)) - Math.cos(th * Math.PI / 180)), Math.abs(vnorm(V.psi) - 1));
}
check('‖Tψ‖ = cos θ and ‖ψ‖ = 1 at five angles', worstCos < 1e-12, `max ${worstCos}`);

// 90° at full rank: FULL, then the 90° scene (real controls). T = I has no nonzero complement: ψ stays the unit v₁.
await pick('full'); await page.click('[data-scene="perp"]'); s = await state(); V = await dbg(() => window.TABLE_DEBUG.perp());
check('FULL → 90°: at θ = 90° the input ψ is still a unit vector and Tψ = ψ (no complement is invented)', s.r === 8 && s.N === 8 && Math.abs(s.theta - 90) < 1e-9 && Math.abs(vnorm(V.psi) - 1) < 1e-12 && maxAbs([sub([apply(eye(8), V.psi)], [V.Tpsi])[0]]) < 1e-15 && V.w === null && V.Tw === null && V.has === false);
note = await text('#roNote');
check('FULL → 90°: the words say T = I reads every unit state back, not that the reading vanishes at 90°', /没有非零的正交补/.test(note) && /r < N/.test(note) && !/一个字也读不出/.test(note) && (await text('#roKey')) === '1.000000', note.slice(0, 80));
// …and the solid says the same (the full-rank 90° slice holds v₁): ψ and its reading Tψ are one arrow v₁ in the plane of a
// whole ball, with no w and no magenta piece; checked against the suite's own product and v₁ = (1/√N, …)
{ await settle(page);
  const Gf = await page.evaluate(() => window.TABLE_DEBUG.solid()), Mf = await dbg(() => window.TABLE_DEBUG.T()), Vf = await dbg(() => window.TABLE_DEBUG.perp());
  const v1 = new Array(8).fill(1 / Math.sqrt(8)), back = (c) => Gf.Q[0].map((_, n) => c[0] * Gf.Q[0][n] + c[1] * Gf.Q[1][n] + c[2] * Gf.Q[2][n]);
  const orthoQ = Gf.Q.length === 3 && Gf.Q.every((a, i) => Gf.Q.every((b, j) => Math.abs(dot(a, b) - (i === j ? 1 : 0)) < 1e-12));
  check('FULL → 90°, solid: an orthonormal slice through v₁, kept whole by T = I (the ball); ψ and Tψ are both v₁ there (independent product), no w, no magenta piece',
    Gf.scene === 'perp' && Gf.shape === 'ball' && Gf.kept.every(Boolean) && orthoQ && !!Gf.perp && Gf.perp.full === true && Gf.perp.w === null && Gf.perp.tube === null
      && vnorm(sub([back(Gf.perp.ps)], [v1])[0]) < 1e-12 && vnorm(sub([back(Gf.perp.tp)], [apply(Mf, Vf.psi)])[0]) < 1e-12 && vnorm(sub([Gf.perp.ps], [Gf.perp.tp])[0]) < 1e-12 && Math.abs(vnorm(Gf.perp.tp) - 1) < 1e-12,
    JSON.stringify(Gf.perp));
  const legendF = await text('#legend'), capF = Gf.caption.join(' ');
  check('FULL → 90°: the legend names Tψ = ψ and no sin θ; the caption under the ball says T = I and no complement', /Tψ = ψ/.test(legendF) && !/sin θ/.test(legendF) && /T = I/.test(capF) && /没有正交补/.test(capF), `${legendF} · ${capF}`);
}
// every N, every rank, the rail's angle boundaries: ψ is a unit vector; ‖Tψ‖ = cos θ below full rank, ψ = v₁ and Tψ = ψ at it
const ANG = [0, 15, 45, 60, 89, 89.999, 90];
let unitOk = true, readOk = true, fullOk = true, compOk = true, legendOk = true, nFull = 0, nPart = 0;
const perpDetail = [];
for (const N of [4, 8, 12]) {
  await page.click(`[data-size="${N}"]`); await page.click('[data-scene="perp"]'); await settle(page);
  const runs = await page.evaluate(([n, angs]) => {
    const dbg = window.TABLE_DEBUG, kit = window.TRV.kit, out = [];
    const set = (q, v) => { const el = document.querySelector(q); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); kit.flush(); };
    for (let r = 1; r <= n; r++) {
      set('#rank', r);
      const T = dbg.T(), B = dbg.basis();
      for (const th of angs) { set('#now', th); const V = dbg.perp(), st = dbg.state; out.push({ r, th, theta: st.theta, T, B, V, legend: document.getElementById('legend').innerHTML, key: document.getElementById('roKey').textContent }); }
    }
    return out;
  }, [N, ANG]);
  for (const u of runs) {
    const { V } = u, Tpsi = apply(u.T, V.psi), c = Math.cos(u.th * Math.PI / 180), tag = `N${N} r${u.r} θ${u.th}`;
    if (Math.abs(u.theta - u.th) > 1e-9 || Math.abs(vnorm(V.psi) - 1) > 1e-12) { unitOk = false; perpDetail.push(`unit ${tag}`); }
    if (maxAbs([sub([Tpsi], [V.Tpsi])[0]]) > 1e-12) { readOk = false; perpDetail.push(`Tψ ${tag}`); }
    if (u.r === N) {
      nFull++;
      const v1 = new Array(N).fill(1 / Math.sqrt(N));
      if (V.has !== false || V.w !== null || V.Tw !== null || maxAbs([sub([V.psi], [v1])[0]]) > 1e-12 || maxAbs([sub([Tpsi], [V.psi])[0]]) > 1e-12 || Math.abs(vnorm(Tpsi) - 1) > 1e-12 || u.key !== '1.000000') { fullOk = false; perpDetail.push(`full ${tag}`); }
      if (/sw mg/.test(u.legend)) { legendOk = false; perpDetail.push(`legend ${tag}`); }
    } else {
      nPart++;
      if (V.has !== true || Math.abs(vnorm(Tpsi) - c) > 1e-12 || Math.abs(vnorm(V.w) - 1) > 1e-12 || u.B.some((b) => Math.abs(dot(b, V.w)) > 1e-12) || vnorm(apply(u.T, V.w)) > 1e-12) { compOk = false; perpDetail.push(`comp ${tag}`); }
      if (!/sw mg/.test(u.legend)) { legendOk = false; perpDetail.push(`legend ${tag}`); }
    }
  }
}
check('90°: ‖ψ‖ = 1 for every N, every rank and θ ∈ {0, 15, 45, 60, 89, 89.999, 90}°', unitOk && nFull === 3 * ANG.length && nPart === 21 * ANG.length, `${nFull} full, ${nPart} partial · ${perpDetail.slice(0, 3).join(' | ')}`);
check('90°: the page’s Tψ is T applied to its ψ (independent product) everywhere', readOk, perpDetail.slice(0, 3).join(' | '));
check('90°, r < N: ‖Tψ‖ = cos θ, w is a unit vector orthogonal to every generator and Tw = 0', compOk, perpDetail.slice(0, 3).join(' | '));
check('90°, r = N: no complement vector, ψ = v₁ = (1/√N, …), Tψ = ψ and the key readout is 1.000000', fullOk, perpDetail.slice(0, 3).join(' | '));
check('90°: the magenta “sin θ in the complement” legend appears exactly when r < N', legendOk, perpDetail.slice(0, 3).join(' | '));

// Size changes by card: the reported crash (real mouse) — N = 12, Read, click (12, 12), the RANK 1 card (N = 8), Read.
await page.click('[data-size="12"]'); await page.click('[data-scene="read"]'); await settle(page);
await clickCell(11, 11); s = await state();
check('N = 12, Read: clicking (12, 12) selects it', s.N === 12 && s.i === 11 && s.j === 11);
await pick('reset'); await page.click('[data-scene="read"]');
const readAfter = await (async () => { try { return { s: await state(), p: await dbg(() => window.TABLE_DEBUG.products()), M: await dbg(() => window.TABLE_DEBUG.T()) }; } catch (err) { return { err: String(err.message || err).split('\n')[0] }; } })();
check('…then RANK 1 and Read: the selection is moved inside the 8 × 8 table, and reading works',
  !readAfter.err && readAfter.s.N === 8 && readAfter.s.i === 7 && readAfter.s.j === 7 && readAfter.p.length === 8 && Math.abs(readAfter.s.partial - readAfter.M[7][7]) < 1e-15 && T.errors.length === 0, readAfter.err || T.errors.slice(0, 2).join(' | '));
if (part === 'all') await transitionChecks(T, page);
// the cover sets N = 12 through the same owner; cards after it keep or move its selection like any other
await page.evaluate(() => window.TRV_THUMB()); s = await state();
check('cover state: N = 12, r = 5, cell (3, 8), the size chip and rank slider follow', s.N === 12 && s.r === 5 && s.i === 2 && s.j === 7 && (await page.evaluate(() => document.getElementById('rank').max)) === '12' && (await page.evaluate(() => document.querySelector('#sizeChips [aria-pressed="true"]').dataset.size)) === '12');
await pick('reset'); await page.click('[data-scene="read"]'); s = await state();
check('cover → RANK 1 → Read: the cell (3, 8) still fits N = 8 and is kept', s.N === 8 && s.i === 2 && s.j === 7 && Math.abs(s.partial - (await dbg(() => window.TABLE_DEBUG.T()))[2][7]) < 1e-15);
await page.evaluate(() => window.TRV_THUMB()); await pick('orthogonal_zero'); await page.click('[data-size="4"]'); await page.click('[data-scene="read"]'); s = await state();
check('cover → 90° card → N = 4 chip → Read: the cell moves to (3, 4) and reads', s.N === 4 && s.i === 2 && s.j === 3 && (await dbg(() => window.TABLE_DEBUG.products())).length === 4);

// scenes by key, playback, ← →
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('3'); s = await state(); check('key 3 opens the healing scene', s.scene === 'heal');
await page.keyboard.press('1'); s = await state(); check('key 1 opens the rank scene', s.scene === 'rank');
await page.keyboard.press('2'); s = await state(); check('key 2 opens the read scene', s.scene === 'read');
await page.click('[data-scene="perp"]'); s = await state(); check('scene chip opens 90°', s.scene === 'perp');
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps 15° in the 90° scene', Math.abs(s.theta - 15) < 1e-9);
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.TABLE_DEBUG.state; return d.theta > 15; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

// English
const en = await T.goto(BOOK, ID, '?lang=en&preset=heal');
await settle(en);
const hud = await en.textContent('#hudBig');
check('English: the heal card opens with an English HUD', /Step|Untouched/.test(hud) && !/[一-鿿]/.test(hud));

// the labels of the read arrows in the ball say “row i = column j” only when the two are the same N numbers. T is
// rebuilt here from its cosine rows; row i and column j are compared entry by entry over all of ℝᴺ.
const tableHere = (N, r) => {
  const v = Array.from({ length: r }, (_, k) => Array.from({ length: N }, (__, n) => Math.sqrt((k ? 2 : 1) / N) * Math.cos(Math.PI * (n + 0.5) * k / N)));
  return Array.from({ length: N }, (_, i) => Array.from({ length: N }, (__, j) => v.reduce((s, b) => s + b[i] * b[j], 0)));
};
const rowColGap = (A, i, j) => Math.max(...A.map((_, k) => Math.abs(A[i][k] - A[k][j])));
await page.evaluate(() => window.TRV.kit.pause());
{ const ep = await T.open(BOOK, ID, '?lang=en', { locale: 'en-US' });
  await settle(ep);
  const labels = () => ep.evaluate(() => [...document.querySelectorAll('#stage .tags .tag')].filter((t) => !t.hidden && t.textContent.trim() && t.getClientRects().length).map((t) => t.textContent.trim()));
  const clickCell = async (i, j) => { const p = await ep.evaluate(([a, b]) => window.TABLE_DEBUG.point.cell(a, b), [i, j]); await ep.mouse.click(p.x, p.y); await settle(ep); return ep.evaluate(() => window.TABLE_DEBUG.state); };
  await ep.click('[data-size="12"]'); await settle(ep);
  let es = await clickCell(0, 1), A = tableHere(12, 2), lab = await labels(), G2 = await ep.evaluate(() => window.TABLE_DEBUG.solid());
  const d3 = Math.hypot(...G2.read.rc.map((x, k) => x - G2.read.cc[k]));
  check('read labels (en, N = 12, r = 2, clicked row 1 / column 2): row 1 ≠ column 2 (first entries 0.2472 vs 0.2360), the near arrows share one label without “=”',
    es.N === 12 && es.r === 2 && es.i === 0 && es.j === 1 && es.scene === 'read' && Math.abs(A[0][0] - 0.24716) < 1e-5 && Math.abs(A[0][1] - 0.23600) < 1e-5 && rowColGap(A, 0, 1) > 1e-3 && d3 < 0.15
      && lab.length === 1 && lab[0] === 'row 1 ≠ column 2' && G2.read.equal === false, `${JSON.stringify(lab)} · gap ${rowColGap(A, 0, 1)} · arrows ${d3}`);
  es = await clickCell(2, 2); lab = await labels();
  check('read labels (en, N = 12, r = 2, clicked the diagonal cell (3, 3)): row 3 = column 3 is said, and it is true', es.i === 2 && es.j === 2 && rowColGap(A, 2, 2) === 0 && lab.length === 1 && lab[0] === 'row 3 = column 3', JSON.stringify(lab));
  await ep.evaluate(() => { const el = document.getElementById('rank'); el.value = '1'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await settle(ep);
  es = await clickCell(0, 4); A = tableHere(12, 1); lab = await labels();
  check('read labels (en, N = 12, rank 1, clicked row 1 / column 5): every cell is 1/12, so row 1 = column 5 is said, and it is true',
    es.r === 1 && es.i === 0 && es.j === 4 && A.flat().every((x) => Math.abs(x - 1 / 12) < 1e-15) && rowColGap(A, 0, 4) < 1e-15 && lab.length === 1 && lab[0] === 'row 1 = column 5', JSON.stringify(lab));
  // every allowed state: N = 4, 8, 12, every rank, every cell
  const sweep = await ep.evaluate(async () => {
    const D = window.TABLE_DEBUG, out = [], seen = () => [...document.querySelectorAll('#stage .tags .tag')].filter((t) => !t.hidden && t.textContent.trim() && t.getClientRects().length).map((t) => t.textContent.trim());
    for (const N of [4, 8, 12]) for (let r = 1; r <= N; r++) for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      if (D.state.N !== N) D.setN(N);
      if (D.state.r !== r) D.setR(r);
      D.select(i, j); window.TRV.kit.flush();
      const s = D.state; out.push([N, r, i, j, s.N === N && s.r === r && s.i === i && s.j === j && s.scene === 'read', seen()]);
      // Let rendering and DOM observers finish between rows of this exhaustive sweep.
      if (j === N - 1) await new Promise((resolve) => setTimeout(resolve, 0));
    }
    return out;
  });
  const wrong = [];
  let eq = 0, shared = 0, minGap = Infinity;
  for (const [N, r, i, j, at, lb] of sweep) {
    const g = rowColGap(tableHere(N, r), i, j), same = g < 1e-12, R = `row ${i + 1}`, C = `column ${j + 1}`;
    if (!same) minGap = Math.min(minGap, g);
    const good = at && (same ? lb.length === 1 && lb[0] === `${R} = ${C}` : lb.every((t) => !t.includes('=')) && (lb.length === 1 ? lb[0] === `${R} ≠ ${C}` : lb.length === 2 && lb.includes(R) && lb.includes(C)));
    if (same) eq++; else if (lb.length === 1) shared++;
    if (!good) wrong.push(`N ${N} r ${r} (${i + 1}, ${j + 1}) gap ${g.toExponential(1)}: ${JSON.stringify(lb)}`);
  }
  check(`read labels (en), all ${sweep.length} states N ∈ {4, 8, 12} × r × cell: “=” exactly where row i and column j agree in every entry (${eq}), near unequal arrows share a “≠” label (${shared}), otherwise two labels`,
    sweep.length === 4 * 4 * 4 + 8 * 8 * 8 + 12 * 12 * 12 && !wrong.length && minGap > 1e-4 && eq > 0 && shared > 0, wrong.slice(0, 3).join(' | ') + ` · smallest unequal gap ${minGap}`);
  await ep.context().close(); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));

{   // the solid part keeps its own names (residual, readOk, lam0) apart from the healing and 90° checks above
/* ---------- the solid: a 3D slice of ℝᴺ and the image of its unit ball ---------- */
// Start this independent section on a fresh, foreground page after the long rendering sweep.
await page.bringToFront();
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
const sol = async () => { await settle(page); return page.evaluate(() => window.TABLE_DEBUG.solid()); };
const orthonormal = (Q) => Q.every((a, i) => Q.every((b, j) => Math.abs(dot(a, b) - (i === j ? 1 : 0)) < 1e-12));
/** max ‖Aq − λq‖ over the slice: zero exactly when A maps each q of the slice to λq. */
const residual = (A, Q, lam) => Math.max(...Q.map((q, k) => vnorm(apply(A, q).map((x, n) => x - lam[k] * q[n]))));
const rayleigh = (A, q) => dot(q, apply(A, q));
/** The 3 × 3 compression QᵀAQ (rows of Q are the slice vectors). */
const compress = (A, Q) => Q.map((a) => Q.map((b) => dot(a, apply(A, b))));
const fromSlice = (Q, c) => Q[0].map((_, n) => c[0] * Q[0][n] + c[1] * Q[1][n] + c[2] * Q[2][n]);
const shapeByRank = (k) => ['point', 'rod', 'disk', 'ball'][k];
let G, Mt, ok;

// RANK: the slice of basis vectors; the image of its ball is a rod, a disc, or the whole ball only when r = N
for (const [card, seek, r, shape] of [['reset', null, 1, 'rod'], ['expand_table', 1, 2, 'disk'], ['expand_table', 3, 4, 'disk'], ['full', null, 8, 'ball']]) {
  await pick(card); if (seek != null) await page.evaluate((t) => window.TABLE_DEBUG.seek(t), seek);
  s = await state(); G = await sol(); Mt = await dbg(() => window.TABLE_DEBUG.T());
  const lam = G.Q.map((q) => rayleigh(Mt, q)), rk = rref(compress(Mt, G.Q), 1e-9).rank;
  check(`solid, rank r = ${r}: the slice is orthonormal and T maps it into itself (Tq = λq by an independent product)`, s.r === r && orthonormal(G.Q) && residual(Mt, G.Q, lam) < 1e-12);
  check(`solid, rank r = ${r}: the semi-axes drawn are |qᵀTq| ∈ {0, 1}, and the compression QᵀTQ has rank ${rk} = the ${shape} drawn`,
    G.kind === 'proj' && G.semi.every((x, k) => Math.abs(x - Math.abs(lam[k])) < 1e-12) && G.lam.every((x, k) => Math.abs(x - lam[k]) < 1e-12) && G.shape === shape && shapeByRank(rk) === shape, `${G.shape} · rank ${rk}`);
}
// the kept directions are written rows (in the basis), the free one is orthogonal to all of them
await pick('expand_table'); await page.evaluate(() => window.TABLE_DEBUG.seek(3));
G = await sol(); let Bs = await dbg(() => window.TABLE_DEBUG.basis());
check('solid, rank r = 4: the plane holds two written rows, the normal is orthogonal to all four rows (read as 0)',
  G.kept.join() === 'true,true,false' && [0, 1].every((k) => Bs.some((b) => Math.abs(Math.abs(dot(b, G.Q[k])) - 1) < 1e-12)) && Bs.every((b) => Math.abs(dot(b, G.Q[2])) < 1e-12));
const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
check('solid: the frame of the slice in the world is orthonormal and right-handed', orthonormal(G.frame) && vnorm(sub([cross3(G.frame[0], G.frame[1])], [G.frame[2]])[0]) < 1e-12);

// READ: row i and column j are arrows in the slice; their dot product, and the shadow times the row's length, is Tᵢⱼ
await pick('dual_read'); await seekEnd();
G = await sol(); Mt = await dbg(() => window.TABLE_DEBUG.T());
const rowOf = (A, i) => A[i], colOf = (A, j) => A.map((r) => r[j]);
const readOk = (G, A, i, j) => {
  const ri = rowOf(A, i), cj = colOf(A, j), rc = G.Q.map((q) => dot(q, ri)), cc = G.Q.map((q) => dot(q, cj));
  const inSlice = vnorm(sub([fromSlice(G.Q, rc)], [ri])[0]) < 1e-12 && vnorm(sub([fromSlice(G.Q, cc)], [cj])[0]) < 1e-12;
  const arrows = rc.every((x, k) => Math.abs(x - G.read.rc[k]) < 1e-12) && cc.every((x, k) => Math.abs(x - G.read.cc[k]) < 1e-12);
  const shadow = Math.abs(vnorm(G.read.shadow) * vnorm(rc) - Math.abs(A[i][j])) < 1e-12 && Math.abs(dot(G.read.shadow, rc) - A[i][j]) < 1e-12 && vnorm(G.read.shadow.map((x, k) => x * vnorm(rc) ** 2 - A[i][j] * rc[k])) < 1e-12;
  return { inSlice, arrows, dotOk: Math.abs(dot(rc, cc) - A[i][j]) < 1e-12, shadow, proj: residual(A, G.Q, G.Q.map((q) => rayleigh(A, q))) < 1e-12 };
};
ok = readOk(G, Mt, 0, 3);
check('solid, ROW · COL: row 1 and column 4 lie in the slice, which T maps into itself', ok.inSlice && ok.proj && G.shape === 'disk');
check('solid, ROW · COL: the two arrows are row 1 and column 4 in slice coordinates; their dot product is T₁₄', ok.arrows && ok.dotOk && G.read.i === 0 && G.read.j === 3);
check('solid, ROW · COL: the amber shadow of column 4 on row 1, times the length of row 1, is T₁₄ (signed)', ok.shadow && Math.abs(G.read.tij - Mt[0][3]) < 1e-15);
// rank ≥ 3: the slice follows the plane of the chosen row and column, plus a free direction
await page.evaluate(() => { window.TABLE_DEBUG.setN(8); window.TABLE_DEBUG.setR(5); window.TABLE_DEBUG.select(1, 6); });
G = await sol(); Mt = await dbg(() => window.TABLE_DEBUG.T()); ok = readOk(G, Mt, 1, 6);
check('solid, read at N = 8, r = 5: the plane of row 2 and column 7 is in the image, the normal in the kernel; arrows and shadow give T₂₇',
  ok.inSlice && ok.proj && ok.arrows && ok.dotOk && ok.shadow && G.kept.join() === 'true,true,false' && vnorm(apply(Mt, G.Q[2])) < 1e-12);
await page.evaluate(() => window.TABLE_DEBUG.select(2, 2));
G = await sol(); ok = readOk(G, Mt, 2, 2);
check('solid, read on a diagonal cell: row 3 = column 3, its shadow is itself and |row 3|² = T₃₃', ok.inSlice && ok.arrows && ok.dotOk && ok.shadow && vnorm(sub([G.read.shadow], [G.read.rc])[0]) < 1e-12);
await page.evaluate(() => window.TABLE_DEBUG.setR(8));
G = await sol(); Mt = await dbg(() => window.TABLE_DEBUG.T()); ok = readOk(G, Mt, 2, 2);
check('solid, read at r = N: T = I, the image is the whole ball (cut open along the plane of the rows)', G.shape === 'ball' && G.kept.every(Boolean) && ok.inSlice && ok.proj);

// HEAL: the ellipsoid's semi-axes are |λ| of Tₘ along three eigenvectors of T₀, recomputed here from T + Δ
await pick('heal');
const Tt = await dbg(() => window.TABLE_DEBUG.T()), Dd = await dbg(() => window.TABLE_DEBUG.delta());
const mine2 = [Tt.map((r, i) => r.map((x, j) => x + Dd[i][j]))];
for (let m = 1; m <= 8; m++) { const X = mine2[m - 1], X2 = matmul(X, X); mine2.push(sub(X2.map((r) => r.map((x) => 3 * x)), matmul(X2, X).map((r) => r.map((x) => 2 * x)))); }
const healed = [];
for (const m of [0, 1, 2, 3, 8]) {
  await page.evaluate((t) => window.TABLE_DEBUG.seek(t), m);
  G = await sol();
  const lam = G.Q.map((q) => rayleigh(mine2[m], q));
  healed.push({ m, G, lam, res: residual(mine2[m], G.Q, lam), res0: residual(mine2[0], G.Q, G.Q.map((q) => rayleigh(mine2[0], q))) });
}
check('solid, HEAL: the slice is three orthonormal eigenvectors of T₀, and of every Tₘ (m = 0, 1, 2, 3, 8)', healed.every((h) => orthonormal(h.G.Q) && h.res < 1e-9 && h.res0 < 1e-9 && h.G.kind === 'heal'));
check('solid, HEAL: the semi-axes drawn are |qᵀTₘq| of the independently iterated Tₘ', healed.every((h) => h.G.semi.every((x, k) => Math.abs(x - Math.abs(h.lam[k])) < 1e-9)), healed.map((h) => h.G.semi.map((x) => x.toFixed(4)).join('/')).join(' · '));
const lam0 = healed[0].lam;
check('solid, HEAL: from one step to the next each semi-axis follows x ↦ 3x² − 2x³', [1, 2, 3].every((k) => healed[k].lam.every((x, a) => { const y = healed[k - 1].lam[a]; return Math.abs(x - (3 * y * y - 2 * y ** 3)) < 1e-9; })));
check('solid, HEAL: two directions above ½ in the plane, one below ½ along the normal (step 0: a knocked eigenvalue of T₀ below ½)',
  healed.every((h) => h.G.kept.join() === 'true,true,false') && lam0[0] > 0.5 && lam0[1] > 0.5 && lam0[2] < 0.5 && Math.abs(lam0[2]) > 0.1);
check('solid, HEAL: step 0 is a true ellipsoid (|λ| = 1.12, 0.91, 0.21), step 8 a flat disc (the dropped |λ| < 10⁻⁹)',
  healed[0].G.shape === 'ellipsoid' && healed[0].G.semi.every((x) => x > 0.1) && healed[4].G.shape === 'disk' && Math.abs(healed[4].lam[2]) < 1e-9, `${healed[0].G.shape} → ${healed[4].G.shape}`);
check('solid, HEAL: the ball is drawn at a scale that holds the largest |λ| along the rail', healed.every((h) => h.G.scale >= Math.max(...healed.flatMap((k) => k.lam.map(Math.abs))) - 1e-12));

// HEAL, FULL with one knock of +0.45 on the diagonal (1, 1) (real controls): each λ label takes the colour of the step
// shown, as the spectrum and the legend do (cyan above ½, magenta below). Independently, by x ↦ 3x² − 2x³ alone,
// λ₀ = 1.45 (cyan) and λ₈ ≈ 2.69454 × 10⁻³² (magenta) along the same knocked direction e₁.
{ const fx = (x) => 3 * x * x - 2 * x * x * x, lamAt = (m) => { let x = 1.45; for (let q = 0; q < m; q++) x = fx(x); return x; };
  await pick('full'); await page.click('[data-scene="heal"]'); await settle(page);
  await slide('#kick', 0.45); await clickCell(0, 0);
  const seen = [];
  for (const m of [0, 8]) {
    await slide('#now', m); const st = await state(), g = await sol(), spec = await dbg((q) => window.TABLE_DEBUG.eigs(q), m);
    const k = g.Q.findIndex((q) => Math.abs(Math.abs(q[0]) - 1) < 1e-9);   // the slice direction along e₁
    const tags = await page.evaluate(() => [...document.querySelectorAll('#stage .tags .tag span.c-cy, #stage .tags .tag span.c-mg')]
      .filter((t) => !t.closest('.tag').hidden && /^λ = /.test(t.textContent.trim())).map((t) => [t.textContent.trim(), t.className]));
    seen.push({ m, st, k, lam: g.lam.slice(), kept: g.kept.slice(), spec, tags });
  }
  const want = [lamAt(0), lamAt(8)], text3 = (x) => `λ = ${(Math.abs(x) < 5e-4 ? 0 : x).toFixed(3)}`;
  const good = seen.every((u, q) => {
    const x = u.lam[u.k], cls = want[q] > 0.5 ? 'c-cy' : 'c-mg', mine = u.tags.filter(([t]) => t === text3(want[q]));
    return u.st.m === u.m && u.st.kicks.length === 1 && u.st.kicks[0].i === 0 && u.st.kicks[0].j === 0 && u.st.kicks[0].eps === 0.45 && u.k >= 0
      && Math.abs(x - want[q]) < 1e-9 && u.kept[u.k] === (want[q] > 0.5) && u.lam.every((y, a) => u.kept[a] === (y > 0.5))
      && u.spec.some((y) => Math.abs(y - want[q]) < 1e-9) && mine.length === 1 && mine[0][1] === cls
      && u.tags.length === 3 && u.tags.every(([t, c]) => c === (Number(t.slice(4).replace('−', '-')) > 0.5 ? 'c-cy' : 'c-mg'));
  });
  check('HEAL, FULL + 0.45 on (1, 1): λ₀ = 1.45 is cyan and λ₈ ≈ 2.69 × 10⁻³² magenta along e₁ (independent x ↦ 3x² − 2x³); every λ label, kept flag and spectrum value agree at the step shown',
    good && want[0] === 1.45 && Math.abs(want[1] - 2.69454e-32) < 1e-36, JSON.stringify(seen.map((u) => [u.m, u.k, u.lam, u.kept, u.tags]).concat([want])));
}

// PERP: ψ, its reading Tψ (in the disc) and the magenta part sin θ along the normal
await pick('orthogonal_zero');
let perpOk = true, perpMsg = '';
Mt = await dbg(() => window.TABLE_DEBUG.T());
for (const th of [0, 30, 60, 90]) {
  await page.evaluate((t) => window.TABLE_DEBUG.seek(t), th);
  G = await sol(); const V2 = await dbg(() => window.TABLE_DEBUG.perp()), c = Math.cos(th * Math.PI / 180), sn = Math.sin(th * Math.PI / 180);
  const psiBack = fromSlice(G.Q, G.perp.ps), tpBack = fromSlice(G.Q, G.perp.tp), Tpsi = apply(Mt, V2.psi), tube = G.perp.ps.map((x, k) => x - G.perp.tp[k]);
  const good = vnorm(sub([psiBack], [V2.psi])[0]) < 1e-12 && vnorm(sub([tpBack], [Tpsi])[0]) < 1e-12 && Math.abs(vnorm(G.perp.tp) - c) < 1e-12
    && Math.abs(vnorm(tube) - sn) < 1e-12 && Math.abs(G.perp.tp[2]) < 1e-12 && Math.abs(tube[0]) < 1e-12 && Math.abs(tube[1]) < 1e-12 && G.shape === 'disk';
  if (!good) { perpOk = false; perpMsg = `θ = ${th}`; }
}
check('solid, 90°: the arrows are ψ and Tψ (independent product), |Tψ| = cos θ in the disc, the magenta part is sin θ along the normal (0°, 30°, 60°, 90°)', perpOk, perpMsg);

// the lower pole is behind the plane: a ray from it towards the viewer meets the plane inside the unit disc
await page.evaluate(() => window.TABLE_DEBUG.seek(45));
G = await sol();
const cam = await page.evaluate(() => { const s = window.TRV.solids[0]; return { D: s.facing(), marks: s.marks().map((m) => ({ key: m.key, hidden: m.hidden })) }; });
const dnv = dot(cam.D, G.frame[2]), meet = Math.sqrt(Math.max(0, 1 / (dnv * dnv) - 1));
const mk = Object.fromEntries(cam.marks.map((m) => [m.key, m.hidden]));
check('solid: from the default view the ray from the lower pole meets the disc (expected hidden), the upper pole is in front', dnv > 0 && meet < 1 && mk['pole-'] === true && mk['pole+'] === false, `D·n = ${dnv.toFixed(3)}, meets at ${meet.toFixed(3)}`);

// the ball keeps to its own box, apart from the table and the side panel; the table stays fully on the stage
const boxesOk = (Lb, G) => {
  const r = G.unit * Math.max(1, G.scale), inside = (a, b) => a.x >= b.x - 0.5 && a.y >= b.y - 0.5 && a.x + a.w <= b.x + b.w + 0.5 && a.y + a.h <= b.y + b.h + 0.5;
  const apart = (a, b) => a.x + a.w <= b.x + 0.5 || b.x + b.w <= a.x + 0.5 || a.y + a.h <= b.y + 0.5 || b.y + b.h <= a.y + 0.5;
  const ball = { x: G.center[0] - r, y: G.center[1] - r, w: 2 * r, h: 2 * r }, c = Lb.cells, grid = { x: c.ox, y: c.oy, w: c.n * c.c, h: c.n * c.c }, stageBox = { x: 0, y: 0, w: Lb.W, h: Lb.H };
  return inside(ball, Lb.solid) && apart(Lb.solid, Lb.table) && apart(Lb.solid, Lb.panel) && apart(Lb.table, Lb.panel) && inside(grid, Lb.table) && inside(Lb.panel, stageBox);
};
check('solid, desktop: the ball stays in its own box, apart from the table and the side panel', boxesOk(await page.evaluate(() => window.TABLE_DEBUG.layout()), G));
for (const [tag, q, vp] of [['phone 390', '?lang=zh&preset=heal', { width: 390, height: 844 }], ['book frame 740', '?embed=1&lang=zh&preset=dual_read', { width: 740, height: 620 }], ['still 800 × 450', '?shot=1&lang=en&preset=expand_table', { width: 800, height: 450 }]]) {
  const pg = await T.open(BOOK, ID, q, { viewport: vp, reducedMotion: 'reduce' });
  await settle(pg, 300);
  const [Lb, Gp] = await pg.evaluate(() => [window.TABLE_DEBUG.layout(), window.TABLE_DEBUG.solid()]);
  if (!q.includes('shot=1')) {   // the scene chips are shown: the words of the HUD title stay clear of them
    const hb = await pg.evaluate(() => { const rg = document.createRange(); rg.selectNodeContents(document.getElementById('hudBig')); const a = rg.getBoundingClientRect(), b = document.getElementById('sceneChips').getBoundingClientRect(); return [a.left, a.top, a.right, a.bottom, b.left, b.top, b.right, b.bottom]; });
    check(`${tag}: the HUD title does not run under the scene chips`, hb[2] <= hb[4] || hb[0] >= hb[6] || hb[3] <= hb[5] || hb[1] >= hb[7], hb.map(Math.round).join(', '));
  }
  const cellPt = await pg.evaluate(() => window.TABLE_DEBUG.point.cell(1, 2));
  await pg.mouse.click(cellPt.x, cellPt.y); await settle(pg);
  const st2 = await pg.evaluate(() => window.TABLE_DEBUG.state);
  check(`solid, ${tag}: the ball, the table and the side panel each keep to their own box; a cell is still clickable`, boxesOk(Lb, Gp) && Gp.unit > 60 && st2.i === 1 && st2.j === 2, `${Lb.mode}, unit ${Gp.unit.toFixed(0)}`);
  await pg.context().close();
}

// a press on a cell belongs to the table (it does not turn the ball); a drag elsewhere turns the ball and selects nothing
await pick('dual_read');
const yaw0 = await page.evaluate(() => window.TRV.solids[0].cam.yaw);
pt = await dbg(() => window.TABLE_DEBUG.point.cell(1, 1));
await page.mouse.move(pt.x, pt.y); await page.mouse.down(); await page.mouse.move(pt.x + 40, pt.y + 5, { steps: 4 }); await page.mouse.up(); await settle(page);
s = await state();
check('solid: a drag that starts on a cell does not turn the ball, and its release selects nothing', Math.abs((await page.evaluate(() => window.TRV.solids[0].cam.yaw)) - yaw0) < 1e-12 && s.i === 0 && s.j === 3);
const sb = await page.evaluate(() => { const r = window.TRV.solids[0].el.getBoundingClientRect(); const g = window.TABLE_DEBUG.solid(); return [r.left + g.center[0], r.top + g.center[1]]; });
await page.mouse.move(sb[0], sb[1]); await page.mouse.down(); await page.mouse.move(sb[0] + 60, sb[1], { steps: 4 }); await page.mouse.up(); await settle(page);
s = await state();
check('solid: a drag across the ball turns it and leaves the chosen cell alone', Math.abs((await page.evaluate(() => window.TRV.solids[0].cam.yaw)) - yaw0) > 0.2 && s.i === 0 && s.j === 3);

// last: the testkit's solid gates on the 90° card at 45° (they turn the camera, so they come after every check above)
await pick('orthogonal_zero'); await page.evaluate(() => window.TABLE_DEBUG.seek(45));
await solidChecks(withReadySolid(T), BOOK, ID, page);
/* ---------- cited figures at the size a chapter shows them ----------
   A chapter cites a card in an iframe 500 px high: about 334 px wide on a 390 px phone, 760 px in a book page. In the
   phone's frame a long note once took ~180 px of the 500 and left the stage ~210 px: the 8 × 8 table and its side panel dropped out, and the ball, its caption and the legend ran into each other collided with the
   captions and the legend, and the lit solid shrank to a few per cent of the stage. These checks look at the frame
   itself: nothing scrolls; the complete note stays short and needs no internal scrolling; the stage keeps most of
   the frame; no ink of the flat canvas or the WebGL canvas and no label lies under the title, its second line or the
   legend; the solid draws nothing inside the flat drawings; labels stay on the stage and apart; the lit solid covers
   ≥ 12 % of the stage at the card's first and last frame; and the table keeps cells ≥ 11 px, the ball a radius ≥ 60 px and the side panel ≥ 90 × 70 px. */
{
  const FIG = ['full', 'reset', 'expand_table', 'dual_read', 'heal', 'orthogonal_zero'];
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
    const panels = (() => { const L = window.TABLE_DEBUG.layout(); return [['the table', L.table], ['the side panel', L.panel]]; })().map(([what, b]) => [what, { x: fb.left + b.x, y: fb.top + b.y, w: b.w, h: b.h }]);
    const what = document.querySelector('.tour .tour-note'), note = document.getElementById('presetNote'), tour = document.getElementById('tour');
    const full = what.textContent.trim().endsWith(note.textContent.trim()) && note.textContent.trim().length > 20;
    const scrolls = what.scrollHeight > what.clientHeight + 1, oy = getComputedStyle(what).overflowY;
    what.scrollTop = what.scrollHeight; const reached = what.scrollTop + what.clientHeight >= what.scrollHeight - 1; what.scrollTop = 0;
    const btns = [...tour.querySelectorAll('[data-tour]')].map((b) => b.getBoundingClientRect()).every((b) => b.width > 0 && b.top >= 0 && b.bottom <= vp.h + 0.5 && b.left >= 0 && b.right <= vp.w + 0.5);
    const out = {
      vp, docScroll: document.documentElement.scrollHeight - innerHeight, docWide: document.documentElement.scrollWidth - innerWidth,
      stageH: sr.height, tourH: tour.getBoundingClientRect().height, noteH: what.clientHeight, note: { full, scrolls, scrollable: !scrolls || oy === 'auto' || oy === 'scroll', reached, btns },
      under: [], solidIn: [], tagOut: [], tagHit: [], read: (() => { const L = window.TABLE_DEBUG.layout(), G = window.TABLE_DEBUG.solid(); return { cell: L.cells.c, n: L.cells.n, unit: G.unit, panel: [L.panel.w, L.panel.h] }; })()
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
  const share = async (pg, t) => { await pg.evaluate(([d, x]) => window[d].seek(x), ['TABLE_DEBUG', t]); await settle(pg); return solidPixels(pg); };
  for (const [tag, vp, lang, cards] of [['phone frame 334 × 500', { width: 334, height: 500 }, 'en', FIG], ['phone frame 334 × 500', { width: 334, height: 500 }, 'zh', ['dual_read', 'heal']], ['book page 760 × 500', { width: 760, height: 500 }, 'en', FIG]]) {
    const bad = { frame: [], note: [], words: [], solid: [], labels: [], share: [], read: [] };
    for (const card of cards) {
      const pg = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: vp, locale: lang === 'en' ? 'en-US' : 'zh-CN', reducedMotion: 'reduce' });
      await until(pg, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000);
      // Inspect the ending frame directly; the card controls have separate playback checks.
      await pg.evaluate((d) => window[d].seek(window[d].state.max), 'TABLE_DEBUG');
      await settle(pg);
      const f = await facts(pg), id = `${card} (${lang})`;
      if (f.docScroll > 0 || f.docWide > 0 || f.stageH < 0.72 * f.vp.h) bad.frame.push(`${id}: scroll ${f.docScroll}/${f.docWide}, stage ${Math.round(f.stageH)} px`);
      if (f.tourH > 84 || !f.note.full || f.note.scrolls || !f.note.reached || !f.note.btns) bad.note.push(`${id}: ${Math.round(f.tourH)} px ${JSON.stringify(f.note)}`);
      if (f.under.length) bad.words.push(`${id}: ${f.under.slice(0, 3).join(', ')}`);
      if (f.solidIn.length) bad.solid.push(`${id}: ${f.solidIn.join(', ')}`);
      if (f.tagOut.length || f.tagHit.length) bad.labels.push(`${id}: ${[...f.tagOut.map((t) => `off stage: ${t}`), ...f.tagHit].slice(0, 3).join(', ')}`);
      if (!(f.read.cell >= 11 && f.read.unit >= 60 && f.read.panel[0] >= 90 && f.read.panel[1] >= 70)) bad.read.push(`${id}: ${JSON.stringify(f.read)}`);
      const max = await pg.evaluate((d) => window[d].state.max, 'TABLE_DEBUG');
      for (const t of [0, max]) { const px = await share(pg, t); if (!(px && px.share >= 0.12 && px.spread >= 0.04)) bad.share.push(`${id} at ${+t.toFixed(2)}: ${px ? (px.share * 100).toFixed(1) : '—'} %`); }
      await pg.context().close();
    }
    const what = `${tag}, ${lang}, ${cards.length === FIG.length ? 'every cited card' : cards.join(' + ')}`;
    check(`cited figure, ${what}: nothing scrolls and the stage keeps ≥ 72 % of the frame`, !bad.frame.length, bad.frame.join(' | '));
    check(`cited figure, ${what}: the note bar stays ≤ 84 px, holds the card's complete note without internal scrolling, ◀ ▶ in the frame`, !bad.note.length, bad.note.join(' | '));
    check(`cited figure, ${what}: no flat drawing, no solid and no label under the title, its second line or the legend`, !bad.words.length, bad.words.join(' | '));
    check(`cited figure, ${what}: the solid draws nothing inside the table or its side panel`, !bad.solid.length, bad.solid.join(' | '));
    check(`cited figure, ${what}: every label stays on the stage, and no two labels sit on each other`, !bad.labels.length, bad.labels.join(' | '));
    check(`cited figure, ${what}: the lit solid covers ≥ 12 % of the stage at the card's first and last frame`, !bad.share.length, bad.share.join(' | '));
    check(`cited figure, ${what}: the table keeps cells ≥ 11 px, the ball a radius ≥ 60 px and the side panel ≥ 90 × 70 px`, !bad.read.length, bad.read.join(' | '));
  }
  // the full-rank 90° state in a phone's cited figure (compact layout, short legends): the legend still names Tψ = ψ
  // (T = I) and no sin θ, the caption under the ball says there is no complement, and nothing lies under the words
  { const pg = await T.open(BOOK, ID, '?embed=1&lang=en&preset=full', { viewport: { width: 334, height: 500 }, locale: 'en-US', reducedMotion: 'reduce' });
    await until(pg, () => window.TRV.solids && window.TRV.solids[0] && window.TRV.solids[0].contexts > 0, null, 120000);
    await pg.evaluate((d) => window[d].scene('perp', 90), 'TABLE_DEBUG');
    await settle(pg);
    const f = await facts(pg);
    const g = await pg.evaluate((d) => { const D = window[d], G = D.solid(); return { s: D.state, has: D.perp().has, mode: (D.layout() || {}).mode, cap: G ? G.caption.join(' ') : '', legend: document.getElementById('legend').textContent, items: document.querySelectorAll('#legend > span').length }; }, 'TABLE_DEBUG');
    check('cited figure, phone frame 334 × 500, en, FULL → 90°: compact layout; the short legend names Tψ = ψ (T = I) and no sin θ, the caption says no complement, nothing under the words',
      g.mode === 'compact' && g.s.N === 8 && g.s.r === 8 && g.s.scene === 'perp' && g.has === false && g.items === 2 && /Tψ = ψ/.test(g.legend) && /T = I/.test(g.legend) && !/sin θ/.test(g.legend) && /no complement/.test(g.cap) && !f.under.length,
      JSON.stringify({ mode: g.mode, legend: g.legend, cap: g.cap, under: f.under.slice(0, 3) }));
    await pg.context().close();
  }
}

}


// Publication stills use clock coordinates and retain the values the captions describe.
for (const lang of ['zh', 'en']) for (const [card, time] of [['expand_table', 3], ['orthogonal_zero', 90]]) {
  const pg = await openStill(T, BOOK, ID, card, lang);
  const q = await pg.evaluate(() => window.TABLE_DEBUG.state);
  const declared = await pg.getAttribute(`[data-preset="${card}"]`, 'data-still');
  check(`still ${card} (${lang}): its declared frame matches the clock and caption`,
    !q.playing && Math.abs(q.t - time) < 1e-9 && (declared === 'end' ? q.t === q.max : Number(declared) === q.t) && (q.r === (card === 'expand_table' ? 4 : 3)), JSON.stringify({ q, declared }));
  await pg.context().close();
}

check('no page error, console error or failed request (solid part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
