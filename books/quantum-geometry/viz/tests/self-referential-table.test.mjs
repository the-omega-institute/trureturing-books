#!/usr/bin/env node
// Browser regression suite for ORTHO//TABLE (books/quantum-geometry/viz/self-referential-table/).
//   node books/quantum-geometry/viz/tests/self-referential-table.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// The page builds T = Σ vₐvₐᵀ from discrete cosine vectors, iterates 3T² − 2T³ and finds eigenvalues by Jacobi
// rotations. The suite checks it another way: its own matrix product (i-j-k loop order with Kahan-free plain sums),
// Gram–Schmidt orthonormality of the basis, the rank by Gaussian elimination with partial pivoting, the null space
// from that elimination, the spectral norm by power iteration on Δ², and the number of eigenvalues above ½ by
// Sylvester's law of inertia (signs of the LDLᵀ pivots of T₀ − ½I). It reads the page through window.TABLE_DEBUG.
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

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.TABLE_DEBUG.state); };
const dbg = async (fn, arg) => { await settle(page); return page.evaluate(fn, arg); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seekEnd = () => page.evaluate(() => window.TABLE_DEBUG.seek(1e9));

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
check('HEAL: the limit is idempotent and symmetric', maxAbs(sub(matmul(Tinf, Tinf), Tinf)) < 1e-12 && maxAbs(sub(Tinf, transpose(Tinf))) < 1e-15);
check('HEAL: the limit is a projection of rank r = 3 (elimination and trace)', rref(Tinf, 1e-6).rank === 3 && Math.abs(Tinf.reduce((t, r, i) => t + r[i], 0) - 3) < 1e-10);
check('HEAL: the rank of the limit = number of eigenvalues of T₀ above ½ (Sylvester inertia)', countAbove(T0, 0.5) === 3);
check('HEAL: the limit commutes with T₀ (a spectral projection of T₀)', maxAbs(sub(matmul(Tinf, T0), matmul(T0, Tinf))) < 1e-10);
check('HEAL: the limit is close to, but not equal to, the original T', maxAbs(sub(Tinf, Tc)) > 1e-3 && maxAbs(sub(Tinf, Tc)) < 0.3);
const e = its.map((X) => Math.sqrt(sub(matmul(X, X), X).flat().reduce((a, x) => a + x * x, 0)));
check('HEAL: the page’s idempotency errors match an independent computation', e.every((x, m) => Math.abs(x - s.errs[m]) <= 1e-12 + 1e-9 * x));
const quad = e.slice(0, -1).map((x, m) => (x < 0.05 && e[m + 1] > 1e-14 ? e[m + 1] / (x * x) : null)).filter((x) => x != null);
check('HEAL: once small, the error is squared each step (eₘ₊₁ ≤ 10·eₘ²)', quad.length >= 1 && quad.every((q) => q < 10), quad.join(', '));
const eg = await dbg(() => window.TABLE_DEBUG.eigs());
check('HEAL: the eigenvalues of the last step are 0 or 1, three of them 1', eg.every((x) => Math.min(Math.abs(x), Math.abs(x - 1)) < 1e-9) && eg.filter((x) => x > 0.5).length === 3);
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
check('a knock with ‖Δ‖₂ < ½ still ends in a projection, of rank = eigenvalues of T₀ above ½', maxAbs(sub(matmul(L2, L2), L2)) < 1e-9 && rref(L2, 1e-6).rank === countAbove(its2[0], 0.5));
await page.click('#clearBtn'); s = await state();
check('“remove the knocks” clears Δ', s.kicks.length === 0 && s.errs.every((x) => x < 1e-13));

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
