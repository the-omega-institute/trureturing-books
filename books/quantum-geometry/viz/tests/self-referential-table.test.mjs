#!/usr/bin/env node
// Browser regression suite for ORTHO//TABLE (books/quantum-geometry/viz/self-referential-table/).
//   node books/quantum-geometry/viz/tests/self-referential-table.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// The page builds T = Σ vₐvₐᵀ from discrete cosine vectors, iterates 3T² − 2T³ and finds eigenvalues by Jacobi
// rotations. The suite checks it another way: its own matrix product (i-j-k loop order with Kahan-free plain sums),
// Gram–Schmidt orthonormality of the basis, the rank by Gaussian elimination with partial pivoting, the null space
// from that elimination, the spectral norm by power iteration on Δ², and the number of eigenvalues above ½ by
// Sylvester's law of inertia (signs of the LDLᵀ pivots of T₀ − ½I). It reads the page through window.TABLE_DEBUG.
// The healing iteration is checked as a finite computation: the page may call a step "approximately idempotent" only
// when its error is ≤ 10⁻¹², and may predict a same-rank projection only under ‖Δ‖₂ < (√3 − 1)/2 (strict); the suite
// verifies both with its own products, power iteration and Sturm counts, including the counterexamples that refute a
// uniform few-step promise (N = r = 8, ε = −0.36 on (6, 7)) and the old ‖Δ‖₂ < ½ guarantee (T = I, Δ = aEᵢᵢ).
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'self-referential-table';
const T = await session();
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
// Every transition the controls offer: 3 sizes × 4 scenes × 6 cards, with a selection on each side of each card size
// (coordinates 0, 3, 4, 7, 8, 11 that exist in the source table: valid or not in rows and columns independently).
// Expected: a card that names its own cell selects it; any other card keeps the selection when it still fits and
// otherwise moves each coordinate to the last row or column; then Read reads exactly that cell.
const CARD_N = { reset: 8, expand_table: 8, full: 8, dual_read: 4, heal: 8, orthogonal_zero: 8 }, CARD_CELL = { dual_read: [0, 3], heal: [1, 4] };
const sweep = await page.evaluate(() => {
  const dbg = window.TABLE_DEBUG, kit = window.TRV.kit, q = (sel) => document.querySelector(sel), errs = [];
  const onErr = (e) => errs.push(String(e.message || e)); window.addEventListener('error', onErr);
  const press = (sel) => { q(sel).click(); kit.flush(); };
  const cell = (i, j) => { const p = dbg.point.cell(i, j); q('#cv').dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: p.x, clientY: p.y })); kit.flush(); };
  const sizes = [...document.querySelectorAll('#sizeChips [data-size]')].map((b) => +b.dataset.size);
  const scenes = [...document.querySelectorAll('#sceneChips [data-scene]')].map((b) => b.dataset.scene);
  const cards = [...document.querySelectorAll('#presets [data-preset]')].map((b) => b.dataset.preset);
  const rows = [];
  for (const n of sizes) for (const sc of scenes) for (const id of cards) for (const i of [0, 3, 4, 7, 8, 11].filter((x) => x < n)) for (const j of [0, 3, 4, 7, 8, 11].filter((x) => x < n)) {
    const row = { n, sc, id, i, j };
    try {
      press(`[data-size="${n}"]`); press('[data-scene="read"]'); cell(i, j);
      const a = dbg.state; row.before = [a.N, a.i, a.j];
      press(`[data-scene="${sc}"]`); press(`[data-preset="${id}"]`);
      const b = dbg.state;
      row.after = { N: b.N, r: b.r, i: b.i, j: b.j, kicks: b.kicks, rankMax: +q('#rank').max, rankVal: +q('#rank').value, chip: +q('#sizeChips [aria-pressed="true"]').dataset.size };
      press('[data-scene="read"]');
      const c = dbg.state, p = dbg.products(), T = dbg.T();
      row.read = { N: c.N, i: c.i, j: c.j, len: p.length, partial: c.partial, Tij: T[c.i] ? T[c.i][c.j] : NaN };
    } catch (e) { row.error = String((e && e.message) || e); }
    rows.push(row);
  }
  window.removeEventListener('error', onErr);
  return { rows, errs, sizes, scenes, cards };
});
check('transition domain from the controls: sizes 4/8/12, four scenes, six cards (card sizes 4 and 8)', sweep.sizes.join() === '4,8,12' && sweep.scenes.length === 4 && sweep.cards.length === 6 && sweep.cards.every((c) => CARD_N[c]));
let transOk = true, keptOk = true, movedOk = true, nKept = 0, nMoved = 0;
const transDetail = [];
for (const u of sweep.rows) {
  const tag = `${u.n}/${u.sc}/${u.id}/(${u.i + 1}, ${u.j + 1})`;
  if (u.error || !u.after || !u.read) { transOk = false; transDetail.push(`${tag}: ${u.error}`); continue; }
  const N2 = CARD_N[u.id], want = CARD_CELL[u.id] || [Math.min(u.i, N2 - 1), Math.min(u.j, N2 - 1)], a = u.after;
  const valid = a.N === N2 && a.i === want[0] && a.j === want[1] && a.i < a.N && a.j < a.N && a.r >= 1 && a.r <= a.N && a.rankMax === a.N && a.rankVal === a.r && a.chip === a.N && a.kicks.every((k) => k.i < a.N && k.j < a.N);
  const read = u.read.N === N2 && u.read.i === want[0] && u.read.j === want[1] && u.read.len === N2 && Math.abs(u.read.partial - u.read.Tij) < 1e-12;
  if (u.before.join() !== [u.n, u.i, u.j].join() || !valid || !read) { transOk = false; transDetail.push(`${tag}: ${JSON.stringify([u.before, a.N, a.i, a.j, u.read])}`); }
  if (!CARD_CELL[u.id]) {
    if (u.i < N2 && u.j < N2) { nKept++; if (a.i !== u.i || a.j !== u.j) keptOk = false; } else { nMoved++; if (!(a.i < N2 && a.j < N2)) movedOk = false; }
  }
}
check(`every size × scene × card × selection transition leaves a valid selection, and Read reads it (${sweep.rows.length} transitions)`, transOk && sweep.rows.length === 4 * 6 * (4 + 16 + 36) && sweep.errs.length === 0, `${transDetail.slice(0, 3).join(' | ')} ${sweep.errs.slice(0, 2).join(' | ')}`);
check('a selection that still fits the card’s table is kept as it was', keptOk && nKept > 0, `${nKept} kept`);
check('a selection outside the card’s table is moved inside it (row and column independently)', movedOk && nMoved > 0, `${nMoved} moved`);
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

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
