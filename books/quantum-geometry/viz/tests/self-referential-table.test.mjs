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
import { session, stageFirstChecks, solidChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

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

/* ---------- the solid: a 3D slice of ℝᴺ and the image of its unit ball ---------- */
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
await solidChecks(T, BOOK, ID, page);
check('no page error, console error or failed request (solid part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
