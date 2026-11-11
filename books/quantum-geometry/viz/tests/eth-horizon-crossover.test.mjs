// Browser regression suite for ORTHO//HORIZON (books/quantum-geometry/viz/eth-horizon-crossover/).
//   node books/quantum-geometry/viz/tests/eth-horizon-crossover.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.HORIZON_DEBUG and checks it against independent computations written here: the
// crossover by walking down the curve, the flow matrix rebuilt from the page's M and N, its rank by Gaussian elimination
// over a prime field, its singular values through the trace of the Gram matrix, and the counts by direct summation.
import { session, stageFirstChecks, settle, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'eth-horizon-crossover';
const T = await session();
const { check } = T;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.HORIZON_DEBUG.state); };
const seek = async (t) => { await D((v) => window.HORIZON_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

/* ---------- the exponent rate ---------- */
const rate = (c, l) => c * (Math.log(Math.log(2 ** l) / Math.LN2) / Math.LN2) / Math.sqrt(l);   // c·log₂log₂n/√log₂n with n = 2^l (l ≤ 1000)
const r2 = (c, l) => c * (Math.log(l) / Math.LN2) / Math.sqrt(l);
const PPSZ = Math.log(1.307) / Math.LN2;   // 1.307ⁿ = 2^(0.38626 n)
/** Where c·log₂(l)/√l falls to the rate of PPSZ: walk down the falling branch from its top at l = e², then interpolate. */
function crossover(c) {
  if (c * (2 / Math.LN2) / Math.E <= PPSZ) return null;
  let l = Math.E ** 2; const h = 0.01; while (r2(c, l + h) > PPSZ) l += h;
  return l + h * (r2(c, l) - PPSZ) / (r2(c, l) - r2(c, l + h));
}
let s = await state();
check('opens on ATOMS: c = 1 at log₂ n = 266', s.preset === 'atoms' && s.scene === 'rates' && s.c === 1 && s.l === 266);
check('at the atoms of the universe the schematic rate is 0.494, above 0.386', near(s.rate, r2(1, 266), 1e-12) && near(s.rate, rate(1, 266), 1e-9) && s.rate.toFixed(3) === '0.494' && s.rate > PPSZ && near(s.ppsz, PPSZ, 1e-12) && PPSZ.toFixed(3) === '0.386' && /PPSZ 更低/.test(await page.textContent('#hudSub')));
check('the crossover for c = 1 is beyond the horizon, at n ≈ 2⁵⁵⁸', near(s.crossover, crossover(1), 1e-4) && Math.round(s.crossover) === 558 && s.crossover > s.atoms && r2(1, 557) > PPSZ && r2(1, 559) < PPSZ && /视界之外/.test(await page.textContent('#ro4')));
await pick('human'); s = await state();
check('HUMAN: at n = 2¹⁶ the rate is exactly 1, the rate of brute force', s.l === 16 && near(s.rate, 1, 1e-12));
await pick('cross'); await page.waitForTimeout(400); s = await state();
check('CROSSOVER plays the scale upward', s.playing || s.t > 2);
s = await seek(600); check('past the crossover the schematic curve is the lower one', s.rate < PPSZ && /示意曲线更低/.test(await page.textContent('#hudSub')));
await pick('constant'); s = await state();
check('CONSTANT: with c = ½ the crossover is near 2⁵⁷, inside the horizon', s.c === 0.5 && near(s.crossover, crossover(0.5), 1e-4) && s.crossover > 55 && s.crossover < 59 && s.crossover < s.atoms && /视界之内/.test(await page.textContent('#ro4')));
let crossOK = true; for (let c = 0.3; c <= 2.001; c += 0.05) { const mine = crossover(c), theirs = await D((v) => window.HORIZON_DEBUG.crossoverOf(v), c); if ((mine == null) !== (theirs == null) || (mine != null && !near(mine, theirs, 1e-5 * mine))) crossOK = false; }
check('the crossover agrees with a walk down the curve for every c of the slider; below c ≈ 0.364 there is none', crossOK && crossover(0.36) === null && crossover(0.37) !== null);
const c0 = PPSZ * Math.sqrt(266) / (Math.log(266) / Math.LN2);
check('the crossover sits exactly at the horizon for c ≈ 0.78', near(c0, 0.782, 1e-3) && crossover(c0 + 0.01) > 266 && crossover(c0 - 0.01) < 266);
await setRange('cc', 0.35); s = await state();
check('the slider sets c; at c = 0.35 the curve is below 0.386 everywhere', s.c === 0.35 && s.crossover === null && s.preset === null && /无/.test(await page.textContent('#ro3')));

/* ---------- the bridge graph ---------- */
const MOD = 1000003n;
const inv = (a) => { let r = 1n, b = ((a % MOD) + MOD) % MOD, e = MOD - 2n; while (e > 0n) { if (e & 1n) r = r * b % MOD; b = b * b % MOD; e >>= 1n; } return r; };
/** Rank modulo a prime (a lower bound of the rank over ℚ; equal to it unless the prime divides every maximal minor). */
function rankMod(F) {
  const A = F.map((row) => row.map((v) => ((BigInt(v) % MOD) + MOD) % MOD)), rows = A.length, cols = A[0].length; let rank = 0;
  for (let col = 0; col < cols && rank < rows; col++) {
    let p = -1; for (let i = rank; i < rows; i++) if (A[i][col] !== 0n) { p = i; break; }
    if (p < 0) continue; [A[rank], A[p]] = [A[p], A[rank]];
    const iv = inv(A[rank][col]);
    for (let i = rank + 1; i < rows; i++) { const f = A[i][col] * iv % MOD; if (f !== 0n) for (let j = col; j < cols; j++) A[i][j] = ((A[i][j] - f * A[rank][j]) % MOD + MOD) % MOD; }
    rank++;
  }
  return rank;
}
const checkInstance = (st) => {
  const [a, b, c, d] = st.dims, F = Array.from({ length: a * d }, () => new Array(b * c).fill(0));
  for (let r = 0; r < 3; r++) for (let i = 0; i < a; i++) for (let l = 0; l < d; l++) for (let j = 0; j < b; j++) for (let k = 0; k < c; k++) F[i * d + l][j * c + k] += st.M[r][i][j] * st.N[r][l][k];
  const same = JSON.stringify(F) === JSON.stringify(st.flow), minCut = Math.min(3 * a * c, a * d, b * c);
  let fro = 0; for (const row of F) for (const v of row) fro += v * v;
  const svOK = near(st.sv.reduce((t, v) => t + v * v, 0), fro, 1e-6 * Math.max(1, fro)) && st.sv.filter((v) => v > 1e-6 * (st.sv[0] || 1)).length === st.rank;
  return { same, rank: rankMod(F), minCut, svOK, shape: F.length === a * d && F[0].length === b * c, small: st.M.flat(2).concat(st.N.flat(2)).every((v) => Number.isInteger(v) && Math.abs(v) <= 2) };
};
await pick('bridge'); s = await state(); let q = checkInstance(s);
check('BRIDGE: (2, 3, 2, 3), flow = Σ M_r ⊗ N_r rebuilt here from the page’s matrices, 6 × 6', s.scene === 'cut' && s.dims.join() === '2,3,2,3' && q.same && q.shape && q.small);
check('BRIDGE: the three cuts are 6, 6 and 12; the rank is 6 = the minimal cut, as the theorem says inside the cone', s.cuts.rows === 6 && s.cuts.cols === 6 && s.cuts.bridges === 12 && s.cuts.min === 6 && q.minCut === 6 && s.rank === 6 && q.rank === 6 && s.cone && q.svOK);
await pick('narrow'); s = await state(); q = checkInstance(s);
check('NARROW: (1, 5, 1, 5), the bridges carry only 3 and the rank of the 5 × 5 flow matrix is 3', s.dims.join() === '1,5,1,5' && s.cuts.min === 3 && s.cuts.bridges === 3 && s.rank === 3 && q.rank === 3 && !s.cone && q.svOK && s.sv.length === 5 && s.sv[3] < 1e-6 * s.sv[0]);
let allOK = true, bad = '', coneEq = true, seen = 0, cones = 0;
for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) for (let c = 1; c <= 3; c++) for (let d = 1; d <= 4; d += (a + b + c) % 2 + 1) {
  await setRange('da', a); await setRange('db', b); await setRange('dc', c); await setRange('dd', d);
  const cone = a <= b && c <= d && a * a + b * b <= 3 * a * b && c * c + d * d <= 3 * c * d; let best = 0;
  for (const draw of [0, 3, 7]) {
    const st = await seek(draw), r = checkInstance(st); seen++; best = Math.max(best, st.rank);
    if (!(r.same && r.shape && r.svOK && st.rank === r.rank && st.rank <= r.minCut && st.cuts.min === r.minCut && st.cone === cone)) { allOK = false; bad = JSON.stringify([a, b, c, d, draw, st.rank, r.rank, r.minCut]); }
  }
  // a single random integer instance can be degenerate (tiny matrices contain zeros); the theorem is about the greatest rank
  if (cone) { cones++; if (best !== Math.min(a * d, b * c)) coneEq = false; }
}
check(`${seen} instances: the page’s exact rank equals the rank found here, never exceeds min(3ac, ad, bc), and the cone test is right`, allOK, bad);
check(`inside the cone (${cones} sets of dimensions) the best of three draws attains min(a·d, b·c)`, coneEq && cones > 8);
await pick('bridge'); const r0 = (await state()).rank; await page.click('body', { position: { x: 5, y: 5 } }); await page.keyboard.press('ArrowRight'); s = await state();
check('→ draws another instance: other matrices, the same rank', s.seed === 1 && s.rank === r0 && /第 1 次抽样/.test(await page.textContent('#hudBig')));

/* ---------- the modes ---------- */
await pick('plateau'); s = await state();
const spec = { plateau: (j) => 1 / (1 + Math.exp((j - 7.5) / 0.55)), geometric: (j) => 0.82 ** j, power: (j) => 1 / (1 + j * 0.5) ** 2 };
const lamOK = await D((fns) => Object.keys(fns).every((k) => [0, 1, 5, 12, 39].every((j) => Math.abs(window.HORIZON_DEBUG.lambda(k, j) - fns[k][j]) < 1e-12)), Object.fromEntries(Object.entries(spec).map(([k, f]) => [k, Object.fromEntries([0, 1, 5, 12, 39].map((j) => [j, f(j)]))])));
const sum = (f) => { let t = 0; for (let j = 0; j < 400000; j++) t += f(j); return t; }, cnt = (f, th) => { let n = 0; for (let j = 0; j < 400000; j++) if (f(j) >= th) n++; return n; };
check('PLATEAU: θ = 0.5, eight modes reach it and the wall stands at T/θ = 16', s.scene === 'modes' && near(s.theta, 0.5, 1e-9) && s.count === 8 && cnt(spec.plateau, 0.5) === 8 && near(s.total, sum(spec.plateau), 1e-6) && near(s.wall, 16, 0.01) && lamOK);
let modeOK = true, modeBad = '';
for (const prof of ['plateau', 'geometric', 'power']) {
  await page.click(`#profChips [data-prof="${prof}"]`); await settle(page, 40);
  const T0 = sum(spec[prof]);
  for (const t of [0, 0.2, 0.5, 0.8, 0.95, 1]) {
    const st = await seek(t), th = Math.max(0.02, 1 - 0.98 * t), n = cnt(spec[prof], th);
    if (!(near(st.theta, th, 1e-12) && st.count === n && Math.abs(st.total - T0) < 2e-4 && n * th <= T0 + 1e-9 && n <= st.wall + 1e-9)) { modeOK = false; modeBad = JSON.stringify([prof, t, st.count, n, st.total, T0]); }
  }
}
check('three spectra × six thresholds: the count and the total match direct summation, and count × θ ≤ T every time', modeOK, modeBad);
check('the geometric spectrum sums to 1/(1 − 0.82) and the power law to 4(π²/6 − 1)', near(sum(spec.geometric), 1 / 0.18, 1e-9) && Math.abs(sum(spec.power) - 4 * (Math.PI ** 2 / 6 - 1)) < 1e-4);
await pick('tail'); await page.waitForTimeout(400); s = await state();
check('TAIL plays the threshold downward on the power law', s.prof === 'power' && (s.playing || s.t > 0));
s = await seek(1); check('at θ = 0.02 thirteen modes of the power law reach the threshold, far below the wall at 129', s.count === 13 && near(s.wall, 4 * (Math.PI ** 2 / 6 - 1) / 0.02, 0.05));
await page.click('#profChips [data-prof="plateau"]'); await seek(0.2);
const pt = await D(() => window.HORIZON_DEBUG.at(25, 0.3));
await page.mouse.click(pt[0], pt[1]); s = await state();
check('clicking the stage sets the threshold there', near(s.theta, 0.3, 0.01), String(s.theta));

/* ---------- keyboard, language, labels ---------- */
await page.click('body', { position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'rates'], ['2', 'cut'], ['3', 'modes']]) { await page.keyboard.press(key); check(`key ${key} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('1'); await page.keyboard.press('Home'); await page.keyboard.press('Space'); await page.waitForTimeout(500); s = await state();
check('Space plays the scale', s.playing && s.t > 0); await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the schematic curve is labelled as a model and the preprints as unaudited', await D(() => { const m = document.querySelector('.lean.model[data-scenes="rates"]'); return !!m && /审计/.test(m.textContent) && /不是定理/.test(m.textContent) && !!document.querySelector('.lean.open'); }));
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const sc of ['rates', 'cut', 'modes']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
