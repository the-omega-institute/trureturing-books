// Browser regression suite for ORTHO//HORIZON (books/quantum-geometry/viz/eth-horizon-crossover/).
//   node books/quantum-geometry/viz/tests/eth-horizon-crossover.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.HORIZON_DEBUG and checks it against independent computations written here: the
// crossover by walking down the curve, the flow matrix rebuilt from the page's M and N, its rank by Gaussian elimination
// over a prime field (and over the rationals for the exact probes), its singular values through the trace of the Gram
// matrix, the cuts of the whole bridge graph by putting each inner tensor on either side, the cuts drawn on the stage by
// intersecting their dashed lines with the legs and bridges, the PPSZ rate of k-SAT by a closed form and by its series, and
// the counts by direct summation.
import { readFileSync } from 'node:fs';
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
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 30000 }).catch(() => {});
const seek = async (t) => { await D((v) => window.HORIZON_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

/* ---------- the exponent rate ---------- */
const rate = (c, l) => c * (Math.log(Math.log(2 ** l) / Math.LN2) / Math.LN2) / Math.sqrt(l);   // c·log₂log₂n/√log₂n with n = 2^l (l ≤ 1000)
const r2 = (c, l) => c * (Math.log(l) / Math.LN2) / Math.sqrt(l);
/* The PPSZ rate for unique k-SAT is 1 − μ_k/(k−1), μ_k = Σ_{j≥1} 1/(j(j + x)), x = 1/(k−1). Two independent routes here:
   (1) Gauss's digamma theorem: μ_k/(k−1) = ψ(1 + 1/q) + γ with q = k − 1, and
       ψ(1/q) + γ = −ln(2q) − (π/2)·cot(π/q) + 2·Σ_{n=1}^{⌊(q−1)/2⌋} cos(2πn/q)·ln sin(πn/q),  ψ(1 + 1/q) = ψ(1/q) + q;
   (2) the series μ_k summed forward to N terms, with the tail Σ_{j>N} 1/(j(j+x)) bounded between 1/(N+1+x) and 1/(N+x). */
const ppszClosed = (k) => { const q = k - 1; let s = 0; for (let n = 1; n <= Math.floor((q - 1) / 2); n++) s += Math.cos(2 * Math.PI * n / q) * Math.log(Math.sin(Math.PI * n / q)); const cot = q === 2 ? 0 : 1 / Math.tan(Math.PI / q); return 1 - (q - Math.log(2 * q) - Math.PI / 2 * cot + 2 * s); };
const ppszSeries = (k, N = 1000000) => { const x = 1 / (k - 1); let mu = 0; for (let j = 1; j <= N; j++) mu += 1 / (j * (j + x)); mu += 0.5 * (1 / (N + 1 + x) + 1 / (N + x)); return 1 - mu / (k - 1); };
const PPSZ = ppszClosed(3);   // = 2 ln 2 − 1 = 0.38629…, and 2^0.38629 = 1.307
/** Where c·log₂(l)/√l falls to the rate of PPSZ: walk down the falling branch from its top at l = e², then interpolate. */
function crossoverAt(c, P) {
  if (c * (2 / Math.LN2) / Math.E <= P) return null;
  let l = Math.E ** 2; const h = 0.01; while (r2(c, l + h) > P) l += h;
  return l + h * (r2(c, l) - P) / (r2(c, l) - r2(c, l + h));
}
const crossover = (c) => crossoverAt(c, PPSZ);
let s = await state();
check('opens on ATOMS: c = 1 at log₂ n = 266', s.preset === 'atoms' && s.scene === 'rates' && s.c === 1 && s.l === 266);
check('at the atoms of the universe the schematic rate is 0.494, above 0.386', near(s.rate, r2(1, 266), 1e-12) && near(s.rate, rate(1, 266), 1e-9) && s.rate.toFixed(3) === '0.494' && s.rate > PPSZ && near(s.ppsz, PPSZ, 1e-11) && PPSZ.toFixed(3) === '0.386' && /PPSZ 更低/.test(await page.textContent('#hudSub')));
check('the crossover for c = 1 is beyond the horizon, at n ≈ 2⁵⁵⁸', near(s.crossover, crossover(1), 1e-4) && Math.round(s.crossover) === 558 && s.crossover > s.atoms && r2(1, 557) > PPSZ && r2(1, 559) < PPSZ && /视界之外/.test(await page.textContent('#ro4')));
await pick('human'); s = await state();
check('HUMAN: at n = 2¹⁶ the rate is exactly 1, the rate of brute force', s.l === 16 && near(s.rate, 1, 1e-12));
await pick('cross'); s = await state();
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

/* ---------- the clause width k: the PPSZ table ---------- */
const TABLE = { 3: '0.3863', 4: '0.5548', 5: '0.6502', 6: '0.7118' };
check('PPSZ rates by two independent routes (digamma closed form, direct series): k = 3, 4 give the literature values 0.3863 and 0.5548; k = 5, 6 give 0.6502 and 0.7118',
  [3, 4, 5, 6].every((k) => near(ppszClosed(k), ppszSeries(k), 1e-9) && ppszClosed(k).toFixed(4) === TABLE[k]) && near(PPSZ, 2 * Math.LN2 - 1, 1e-13) && 2 ** PPSZ > 1.3065 && 2 ** PPSZ < 1.3075,
  [3, 4, 5, 6].map((k) => `${k}: ${ppszClosed(k)} / ${ppszSeries(k)}`).join(' | '));
const big = [100, 1000, 4000].map((k) => k * (1 - ppszSeries(k, 400000)));
check('for large k the rate tends to 1 − π²/(6k): k·(1 − r_k) → π²/6 = 1.645 (not π²/(6 ln 2) = 2.373)', Math.abs(big[2] - Math.PI ** 2 / 6) < 5e-4 && Math.abs(big[1] - Math.PI ** 2 / 6) < 2e-3 && big[0] > big[1] && big[1] > big[2] && big[2] > Math.PI ** 2 / 6 && Math.abs(big[2] - Math.PI ** 2 / (6 * Math.LN2)) > 0.5, big.join(' '));
const pageRates = await D(() => [3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((k) => window.HORIZON_DEBUG.ppszOf(k)));
check('the page’s PPSZ rates for k = 3 … 12 agree with the digamma closed form to 1e-10', pageRates.every((v, i) => near(v, ppszClosed(i + 3), 1e-10)), pageRates.join(' '));
await pick('atoms');
let kOK = true, kBad = '';
for (const k of [4, 5, 6, 3]) {
  await page.click(`#kChips [data-k="${k}"]`); s = await state();
  const p = ppszClosed(k), mine = crossoverAt(1, p), ro2 = await page.textContent('#ro2');
  if (!(s.k === k && near(s.ppsz, p, 1e-10) && ro2.trim() === TABLE[k] && near(s.crossover, mine, 1e-4) && s.c === 1 && near(s.rate, r2(1, 266), 1e-12) && (k === 3 ? s.preset === null : true))) { kOK = false; kBad = JSON.stringify([k, s.k, s.ppsz, ro2, s.crossover, mine]); }
}
check('the k chips move only the PPSZ baseline: its rate, the readout and the crossover follow k; the schematic curve stays', kOK, kBad);
s = await state();
check('choosing k leaves the card; with k = 6 the crossover for c = 1 is near 2⁷⁸, well inside the horizon', s.preset === null && crossoverAt(1, ppszClosed(6)) < 90 && crossoverAt(1, ppszClosed(6)) > 70 && s.k === 3 && near(s.crossover, crossover(1), 1e-4));
await page.click('#kChips [data-k="5"]'); await pick('atoms'); s = await state();
check('a card of the rates scene resets k to 3', s.k === 3 && near(s.ppsz, PPSZ, 1e-10) && (await page.getAttribute('#kChips [data-k="3"]', 'aria-pressed')) === 'true');

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
/** Exact rank over ℚ by Gaussian elimination on BigInt fractions (independent of the page's fraction-free elimination). */
function rankQ(F) {
  const gcd = (x, y) => { x = x < 0n ? -x : x; y = y < 0n ? -y : y; while (y) [x, y] = [y, x % y]; return x; };
  const fr = (n, d = 1n) => { if (d < 0n) { n = -n; d = -d; } const g = gcd(n, d) || 1n; return [n / g, d / g]; };
  const A = F.map((row) => row.map((v) => fr(BigInt(v)))), rows = A.length, cols = A[0].length; let rank = 0;
  for (let col = 0; col < cols && rank < rows; col++) {
    const p = A.findIndex((row, i) => i >= rank && row[col][0] !== 0n); if (p < 0) continue;
    [A[rank], A[p]] = [A[p], A[rank]];
    for (let i = 0; i < rows; i++) {
      if (i === rank || A[i][col][0] === 0n) continue;
      const [fn, fd] = fr(A[i][col][0] * A[rank][col][1], A[i][col][1] * A[rank][col][0]);
      for (let j = col; j < cols; j++) { const [an, ad] = A[i][j], [bn, bd] = A[rank][j]; A[i][j] = fr(an * fd * bd - fn * bn * ad, ad * fd * bd); }
    }
    rank++;
  }
  return rank;
}
const flowOf = (st) => { const [a, b, c, d] = st.dims, F = Array.from({ length: a * d }, () => new Array(b * c).fill(0)); for (let r = 0; r < 3; r++) for (let i = 0; i < a; i++) for (let l = 0; l < d; l++) for (let j = 0; j < b; j++) for (let k = 0; k < c; k++) F[i * d + l][j * c + k] += st.M[r][i][j] * st.N[r][l][k]; return F; };
/* The whole bridge graph: terminals IN (the far ends of b and c) and OUT (of a and d), inner tensors M and N, and five
   edges with their dimensions; the bond of the three bridges has dimension 3. A cut puts each inner tensor on the IN or
   the OUT side: two tensors, two sides, so these four placements are all the cuts there are. */
const EDGES = (a, b, c, d) => [['a', 'M', 'OUT', a], ['b', 'M', 'IN', b], ['d', 'N', 'OUT', d], ['c', 'N', 'IN', c], ['bond', 'M', 'N', 3]];
function placements(a, b, c, d) {
  const out = [];
  for (const sM of ['IN', 'OUT']) for (const sN of ['IN', 'OUT']) {
    const side = { IN: 'IN', OUT: 'OUT', M: sM, N: sN }, cut = EDGES(a, b, c, d).filter(([, u, v]) => side[u] !== side[v]);
    out.push({ M: sM, N: sN, edges: cut.map((e) => e[0]).sort().join(','), cap: cut.reduce((t, e) => t * e[3], 1) });
  }
  return out;
}
const graphMin = (a, b, c, d) => Math.min(...placements(a, b, c, d).map((x) => x.cap));
/* The cuts as drawn: which legs and bridges each dashed line crosses (proper segment intersections), on which side of it
   the two tensors and the four leg ends lie (the lines run left to right, x-monotone, so "above" is well defined), and
   whether it keeps clear of both tensor discs. */
const orient = (a, b, c) => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
const meets = (p1, p2, q1, q2) => orient(p1, p2, q1) * orient(p1, p2, q2) < 0 && orient(q1, q2, p1) * orient(q1, q2, p2) < 0;
const hits = (pts, seg) => { let n = 0; for (let i = 0; i + 1 < pts.length; i++) if (meets(pts[i], pts[i + 1], seg[0], seg[1])) n++; return n; };
const yOn = (pts, x) => { for (let i = 0; i + 1 < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1]; if (x >= x1 && x <= x2) return y1 + (y2 - y1) * (x - x1) / (x2 - x1); } return null; };
const gapTo = (p, pts) => { let best = Infinity; for (let i = 0; i + 1 < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[i + 1], L2 = (bx - ax) ** 2 + (by - ay) ** 2, t = Math.max(0, Math.min(1, ((p[0] - ax) * (bx - ax) + (p[1] - ay) * (by - ay)) / L2)); best = Math.min(best, Math.hypot(p[0] - ax - t * (bx - ax), p[1] - ay - t * (by - ay))); } return best; };
function drawnCuts(G, dims) {
  const [a, b, c, d] = dims, plc = placements(a, b, c, d), lo = graphMin(a, b, c, d), bad = [], seen = new Set();
  for (const cut of G.cuts) {
    const mono = cut.pts.every((p, i) => !i || p[0] > cut.pts[i - 1][0]);
    const side = (p) => { const y = yOn(cut.pts, p[0]); return y == null ? '?' : p[1] < y ? 'OUT' : 'IN'; };
    const ends = ['a', 'd', 'b', 'c'].map((e) => side(G.legs[e][1])).join(',');
    const want = plc.find((x) => x.M === side(G.M) && x.N === side(G.N));
    const legHits = Object.fromEntries(Object.entries(G.legs).map(([e, sg]) => [e, hits(cut.pts, sg)])), bondHits = G.bridges.map((sg) => hits(cut.pts, sg));
    const crossed = Object.keys(legHits).filter((e) => legHits[e] === 1).concat(bondHits.every((n) => n === 1) ? ['bond'] : []).sort().join(',');
    const once = Object.values(legHits).every((n) => n <= 1) && (bondHits.every((n) => n === 0) || bondHits.every((n) => n === 1));
    const clear = [G.M, G.N].every((cn) => gapTo(cn, cut.pts) > G.r);
    const ok = mono && ends === 'OUT,OUT,IN,IN' && want && crossed === want.edges && once && clear && cut.value === want.cap && cut.label.endsWith(`= ${want.cap}`) && cut.hot === (want.cap === lo);
    if (!ok) bad.push(JSON.stringify({ id: cut.id, mono, ends, want, crossed, legHits, bondHits, clear, value: cut.value, hot: cut.hot }));
    if (want) seen.add(want.edges);
  }
  return { ok: bad.length === 0 && seen.size === 4 && G.cuts.length === 4, bad, lo };
}
await pick('bridge'); s = await state(); let q = checkInstance(s);
check('BRIDGE: (2, 3, 2, 3), flow = Σ M_r ⊗ N_r rebuilt here from the page’s matrices, 6 × 6', s.scene === 'cut' && s.dims.join() === '2,3,2,3' && q.same && q.shape && q.small);
check('BRIDGE: the three cuts are 6, 6 and 12; draw 0 has rank 6, reaching the minimal cut, the greatest rank the theorem gives inside the cone', s.cuts.rows === 6 && s.cuts.cols === 6 && s.cuts.bridges === 12 && s.cuts.min === 6 && q.minCut === 6 && s.rank === 6 && q.rank === 6 && s.cone && q.svOK);
await pick('narrow'); s = await state(); q = checkInstance(s);
check('NARROW: (1, 5, 1, 5), the bridges carry only 3 and the rank of the 5 × 5 flow matrix is 3', s.dims.join() === '1,5,1,5' && s.cuts.min === 3 && s.cuts.bridges === 3 && s.rank === 3 && q.rank === 3 && !s.cone && q.svOK && s.sv.length === 5 && s.sv[3] < 1e-6 * s.sv[0]);
let gq = drawnCuts(await D(() => window.HORIZON_DEBUG.geometry), s.dims);
check('NARROW: the four cuts of the whole graph are a·d = 5, b·c = 5, 3·a·c = 3 and 3·b·d = 75 (one per placement of M and N); the amber one crosses leg a, the three bridges and leg c', s.cuts.bridgesBD === 75 && s.cuts.full === 3 && gq.lo === 3 && gq.ok
  && placements(1, 5, 1, 5).map((x) => `${x.edges}:${x.cap}`).sort().join(' ') === 'a,bond,c:3 a,d:5 b,bond,d:75 b,c:5' && (await D(() => window.HORIZON_DEBUG.geometry)).cuts.filter((z) => z.hot).map((z) => z.id).join() === 'ac', gq.bad.join(' | '));
// the theorem is about the greatest rank: on the same dimensions draw 0 reaches 3 and draw 10 has only 2 (exact, over ℚ)
const n0 = s; s = await seek(10); q = checkInstance(s);
check('NARROW, draw 10 against draw 0, both by exact elimination over ℚ: rank 2 against rank 3, under the minimal cut 3', n0.seed === 0 && rankQ(flowOf(n0)) === 3 && s.seed === 10 && s.dims.join() === '1,5,1,5' && rankQ(flowOf(s)) === 2 && s.rank === 2 && q.rank === 2 && q.same && s.cuts.full === 3
  && /这一次抽样的秩是 2，比最小割低/.test(await page.textContent('#roNote')) && /实例的秩 2，最小割 3：秩更小/.test(await page.textContent('#hudSub')), JSON.stringify([n0.rank, s.rank]));
await seek(0);
let allOK = true, bad = '', coneEq = true, seen = 0, cones = 0;
for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) for (let c = 1; c <= 3; c++) for (let d = 1; d <= 4; d += (a + b + c) % 2 + 1) {
  await setRange('da', a); await setRange('db', b); await setRange('dc', c); await setRange('dd', d);
  const cone = a <= b && c <= d && a * a + b * b <= 3 * a * b && c * c + d * d <= 3 * c * d; let best = 0;
  for (const draw of [0, 3, 7]) {
    const st = await seek(draw), r = checkInstance(st); seen++; best = Math.max(best, st.rank);
    if (!(r.same && r.shape && r.svOK && st.rank === r.rank && st.rank <= r.minCut && st.cuts.min === r.minCut && st.rank <= graphMin(a, b, c, d) && st.cuts.full === graphMin(a, b, c, d) && st.cone === cone)) { allOK = false; bad = JSON.stringify([a, b, c, d, draw, st.rank, r.rank, r.minCut]); }
  }
  // a single random integer instance can be degenerate (tiny matrices contain zeros); the theorem is about the greatest rank
  if (cone) { cones++; if (best !== Math.min(a * d, b * c)) coneEq = false; }
}
check(`${seen} instances: the page’s exact rank equals the rank found here, never exceeds min(3ac, ad, bc) nor the least of the four cuts, and the cone test is right`, allOK, bad);
check(`inside the cone (${cones} sets of dimensions) the best of three draws attains min(a·d, b·c)`, coneEq && cones > 8);
// every setting the four sliders allow (1 … 6 each), entered through the sliders themselves, at draw 0
const range = await D(() => ['da', 'db', 'dc', 'dd'].map((i) => { const el = document.getElementById(i); return [+el.min, +el.max, +el.step]; }));
await seek(0);
let domOK = true, domBad = '', settings = 0, apart = 0, geoOK = true, geoBad = '';
for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) for (let c = 1; c <= 6; c++) for (let d = 1; d <= 6; d++) {
  await D((v) => ['da', 'db', 'dc', 'dd'].forEach((i, k) => { const el = document.getElementById(i); el.value = String(v[k]); el.dispatchEvent(new Event('input', { bubbles: true })); }), [a, b, c, d]);
  const st = await state(), q3 = Math.min(3 * a * c, a * d, b * c), lo = graphMin(a, b, c, d); settings++; if (lo < q3) apart++;
  const w = await D(() => ({ out: ['oDA', 'oDB', 'oDC', 'oDD'].map((i) => document.getElementById(i).textContent).join(), ro3: document.getElementById('ro3').textContent, sub: document.getElementById('roKeySub').textContent, hud: document.getElementById('hudSub').textContent, key: document.getElementById('roKey').textContent }));
  const ok = st.dims.join() === [a, b, c, d].join() && w.out === [a, b, c, d].join() && st.cuts.min === q3 && st.cuts.full === lo && st.cuts.bridgesBD === 3 * b * d && st.rank <= lo
    && w.ro3 === `${3 * a * c}、${3 * b * d}` && w.sub.includes(`QMinCut = min(3ac, ad, bc) = ${q3}`) && w.sub.includes(`四道割最小 ${lo}`) && w.hud.includes(`最小割 ${lo}：`) && w.key.includes(`≤ ${q3} ✓`);
  if (!ok) { domOK = false; domBad = JSON.stringify([a, b, c, d, st.cuts, st.rank, w]); }
  const g = drawnCuts(await D(() => window.HORIZON_DEBUG.geometry), [a, b, c, d]); if (!g.ok) { geoOK = false; geoBad = `${[a, b, c, d]}: ${g.bad[0] || 'cuts missing'}`; }
}
check(`all ${settings} settings of the sliders (${range.map((x) => x.join('…')).join(', ')}): the page’s cuts are the four placements counted here, QMinCut keeps its three terms, the readouts say so, and the rank stays under the least cut`, domOK && settings === 1296 && range.every((x) => x.join() === '1,6,1'), domBad);
check(`…on ${apart} of those settings the fourth cut 3·b·d is smaller than QMinCut, so the minimal cut of the whole graph is not QMinCut there`, apart > 0 && apart < settings);
check('…and on every one of them each dashed line crosses exactly the legs and bridges of its placement, keeps clear of both tensors, carries that capacity, and is amber exactly when it is a minimal cut', geoOK, geoBad);
// the supported setting where the two minima part: (5, 1, 5, 1), draw 0
await setRange('da', 5); await setRange('db', 1); await setRange('dc', 5); await setRange('dd', 1); s = await seek(0);
const G5 = await D(() => window.HORIZON_DEBUG.geometry);
let w5 = { sub: await page.textContent('#hudSub'), note: await page.textContent('#roNote'), key: await page.textContent('#roKey'), keySub: await page.textContent('#roKeySub'), title: await page.textContent('#pATitle'), meta: await page.textContent('#pAMeta') };
check('(5, 1, 5, 1), draw 0: QMinCut = min(75, 5, 5) = 5, but the whole graph has the cut 3·b·d = 3, and this draw has rank 3 (exact, over ℚ)', s.cuts.min === 5 && s.cuts.full === 3 && graphMin(5, 1, 5, 1) === 3 && s.rank === 3 && rankQ(flowOf(s)) === 3 && !s.cone
  && G5.cuts.filter((z) => z.hot).map((z) => z.id).join() === 'bd' && drawnCuts(G5, [5, 1, 5, 1]).ok, JSON.stringify([s.cuts, s.rank]));
check('(5, 1, 5, 1): the readouts compare the rank with the minimal cut 3, keep the green mark for Lean’s QMinCut 5, and do not credit Lean with the fourth cut', /实例的秩 3，最小割 3：相等/.test(w5.sub) && /≤ 5 ✓/.test(w5.key) && /QMinCut = min\(3ac, ad, bc\) = 5/.test(w5.keySub)
  && /Lean 只保证秩不超过 QMinCut = min\(3ac, ad, bc\) = 5/.test(w5.note) && /第四道 3bd = 3（初等的矩阵分解，不在冻结定理里）/.test(w5.note) && /等号只是对这个实例的观察/.test(w5.note) && /四道割/.test(w5.title) && /min = 3 · QMinCut = 5/.test(w5.meta), JSON.stringify(w5));
await page.click('[data-lang-set="en"]'); await settle(page, 60);
w5 = { sub: await page.textContent('#hudSub'), note: await page.textContent('#roNote'), keySub: await page.textContent('#roKeySub') };
check('…and in English', /rank of this instance 3, minimal cut 3: equal/.test(w5.sub) && /Lean's QMinCut = min\(3ac, ad, bc\) = 5/.test(w5.keySub) && /the fourth, 3bd = 3 \(an elementary matrix factorization, not in the frozen theorem\)/.test(w5.note), JSON.stringify(w5));
await page.click('[data-lang-set="zh"]'); await settle(page, 60);
const boxes = await D(() => [...document.querySelectorAll('.lean[data-scenes~="cut"]')].map((b) => ({ cls: b.className, text: b.textContent })));
check('the fourth cut is labelled ARGUED (by hand, not formalized) in both languages, and no green Lean box claims it', boxes.some((b) => /argued/.test(b.cls) && /3·b·d/.test(b.text) && /未在本书形式化/.test(b.text) && /not formalized/.test(b.text)) && boxes.filter((b) => !/(num|model|argued|open)/.test(b.cls)).every((b) => !/3·b·d|3bd/.test(b.text)), JSON.stringify(boxes.map((b) => b.cls)));
// outside the cone the three bridges need not be the bottleneck: (1, 1, 1, 5) has the four cuts a·d = 5, b·c = 1, 3·a·c = 3, 3·b·d = 15
await setRange('da', 1); await setRange('db', 1); await setRange('dc', 1); await setRange('dd', 5); s = await seek(0);
const G1 = await D(() => window.HORIZON_DEBUG.geometry), caps1 = placements(1, 1, 1, 5).map((x) => x.cap).sort((x, y) => x - y);
const w1 = { note: await page.textContent('#roNote'), sub: await page.textContent('#hudSub'), keySub: await page.textContent('#roKeySub') };
check('(1, 1, 1, 5), outside the cone: the four placements give 1, 3, 5, 15, the least is b·c = 1 (not the three bridges, 3), it is the amber line, and this draw’s exact rank stays under it',
  s.dims.join() === '1,1,1,5' && !s.cone && caps1.join() === '1,3,5,15' && graphMin(1, 1, 1, 5) === 1 && s.cuts.rows === 5 && s.cuts.cols === 1 && s.cuts.bridges === 3 && s.cuts.bridgesBD === 15 && s.cuts.min === 1 && s.cuts.full === 1
  && rankQ(flowOf(s)) === s.rank && s.rank <= 1 && G1.cuts.filter((z) => z.hot).map((z) => z.id).join() === 'bc' && drawnCuts(G1, [1, 1, 1, 5]).ok, JSON.stringify([s.cuts, s.rank]));
check('(1, 1, 1, 5): the readouts name the minimal cut 1 and Lean’s QMinCut 1 and call no bridge a bottleneck', /最小割 1：/.test(w1.sub) && /QMinCut = min\(3ac, ad, bc\) = 1/.test(w1.keySub) && /Lean 只保证秩不超过 QMinCut = min\(3ac, ad, bc\) = 1/.test(w1.note) && !/瓶颈/.test(w1.note + w1.sub) && !/第四道/.test(w1.note), JSON.stringify(w1));
// the drawn cuts at a phone width, where the diagram sits above the flow matrix
const vp = page.viewportSize(); await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
let phone = []; for (const dims of [[5, 1, 5, 1], [1, 5, 1, 5], [2, 3, 2, 3], [6, 6, 6, 6]]) { await D((v) => ['da', 'db', 'dc', 'dd'].forEach((i, k) => { const el = document.getElementById(i); el.value = String(v[k]); el.dispatchEvent(new Event('input', { bubbles: true })); }), dims); await settle(page); phone.push(drawnCuts(await D(() => window.HORIZON_DEBUG.geometry), dims)); }
check('at 390 px wide the dashed lines still cross exactly the legs and bridges of their placements', phone.every((g) => g.ok), phone.map((g) => g.bad.join(' ')).join(' | '));
await page.setViewportSize(vp); await settle(page, 120);
await pick('bridge'); const b0 = await state(); await page.click('body', { position: { x: 5, y: 5 } }); await page.keyboard.press('ArrowRight'); s = await state();
check('→ draws another instance: other matrices; this draw happens to reach the same rank', s.seed === 1 && JSON.stringify(s.flow) !== JSON.stringify(b0.flow) && s.rank === b0.rank && checkInstance(s).rank === s.rank && /第 1 次抽样/.test(await page.textContent('#hudBig')));
// an ordinary draw below the theorem's maximum: (1, 1, 1, 1) lies in the cone, where the greatest rank is 1, yet draw 4 has rank 0
await setRange('da', 1); await setRange('db', 1); await setRange('dc', 1); await setRange('dd', 1); await setRange('now', 4); s = await state(); q = checkInstance(s);
const m4 = s.M.map((m) => m[0][0]), n4 = s.N.map((n) => n[0][0]), f4 = m4.reduce((t, v, r) => t + v * n4[r], 0);
check('(1, 1, 1, 1), draw 4, set with the dimension sliders and the rail: M = (0, 1, 2), N = (−1, 2, −1), flow = 0·(−1) + 1·2 + 2·(−1) = 0, rank 0', s.dims.join() === '1,1,1,1' && s.seed === 4 && s.preset === null
  && m4.join() === '0,1,2' && n4.join() === '-1,2,-1' && f4 === 0 && q.same && q.shape && q.rank === 0 && s.rank === 0 && q.svOK, JSON.stringify([m4, n4, s.flow, s.rank]));
check('(1, 1, 1, 1) lies in the cone with minimal cut min(3, 1, 1) = 1: the theorem’s greatest rank is 1, and this draw falls short of it', s.cone && s.cuts.min === 1 && q.minCut === 1 && s.rank < s.cuts.min);
let w = { sub: await page.textContent('#hudSub'), note: await page.textContent('#roNote'), key: await page.textContent('#roKeyL') };
check('the readouts keep this draw apart from the theorem (zh): instance rank 0, greatest attainable rank 1', /实例的秩 0/.test(w.sub) && /最小割 1/.test(w.sub) && /秩更小/.test(w.sub) && /随机实例/.test(w.key)
  && /最大秩恰好是 min\(a·d, b·c\) = 1/.test(w.note) && /这一次抽样的秩是 0，没有达到它/.test(w.note), JSON.stringify(w));
await page.click('[data-lang-set="en"]'); await settle(page, 60);
w = { sub: await page.textContent('#hudSub'), note: await page.textContent('#roNote') };
check('…and in English', /rank of this instance 0/.test(w.sub) && /minimal cut 1/.test(w.sub) && /greatest attainable rank is exactly min\(a·d, b·c\) = 1/.test(w.note) && /this draw has rank 0, short of it/.test(w.note), JSON.stringify(w));
await page.click('[data-lang-set="zh"]'); await settle(page, 60);
const cutNote = await D(() => document.querySelector('[data-scenes="cut"] .note').textContent);
check('the bridge controls do not claim one rank for every draw (both languages)', !/不随抽样改变/.test(cutNote) && !/does not change with the draw/.test(cutNote) && /不会超过最小割/.test(cutNote) && /never exceeds the minimal cut/.test(cutNote), cutNote);

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
await pick('tail'); s = await state();
check('TAIL plays the threshold downward on the power law', s.prof === 'power' && (s.playing || s.t > 0));
s = await seek(1); check('at θ = 0.02 thirteen modes of the power law reach the threshold, far below the wall at 129', s.count === 13 && near(s.wall, 4 * (Math.PI ** 2 / 6 - 1) / 0.02, 0.05));
await page.click('#profChips [data-prof="plateau"]'); await seek(0.2);
const pt = await D(() => window.HORIZON_DEBUG.at(25, 0.3));
await page.mouse.click(pt[0], pt[1]); s = await state();
check('clicking the stage sets the threshold there', near(s.theta, 0.3, 0.01), String(s.theta));

/* ---------- keyboard, language, labels ---------- */
await page.click('body', { position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'rates'], ['2', 'cut'], ['3', 'modes']]) { await page.keyboard.press(key); check(`key ${key} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('1'); await page.keyboard.press('Home'); await page.keyboard.press('Space'); await until(() => { const d = window.HORIZON_DEBUG.state; return d.playing && d.t > 0; }); s = await state();
check('Space plays the scale', s.playing && s.t > 0); await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
/* ---------- the epistemic red line: ETH stays open ---------- */
const RED_ZH = /(证伪|推翻|否定|驳倒|驳斥|打破|攻破)(了)?\s*(指数时间假设|ETH)|(指数时间假设|ETH)[^。；;]{0,6}(被|已被|已经被|遭)?(证伪|推翻|否定|驳倒|攻破)|(指数时间假设|ETH)\s*(是错|为假|不成立|已破)/;
const RED_EN = /\b(falsif\w*|refut\w*|disprov\w*|overturn\w*|debunk\w*|break\w*|broke)\s+(the\s+)?(ETH|exponential[- ]time hypothesis)\b|\b(ETH|exponential[- ]time hypothesis)\s+(is|was|has been|had been|been|are)\s+(now\s+)?(false|refuted|disproved|disproven|falsified|wrong|broken|overturned)\b/i;
const here = (f) => readFileSync(new URL(`../${ID}/${f}`, import.meta.url), 'utf8');
const entry = JSON.parse(readFileSync(new URL('../visualizations.json', import.meta.url), 'utf8')).visualizations.find((v) => v.id === ID);
const sources = [here('index.html'), here('main.js'), JSON.stringify(entry)].join('\n');
const shown = {};
for (const lang of ['zh', 'en']) { await page.click(`[data-lang-set="${lang}"]`); await settle(page); shown[lang] = await D(() => document.body.innerText + ' ' + [...document.querySelectorAll('[aria-label],[data-aria-en],[title]')].map((e) => [e.getAttribute('aria-label'), e.getAttribute('data-aria-en'), e.getAttribute('title')].join(' ')).join(' ') + ' ' + document.getElementById('drawer').textContent); }
check('red line (中文): nothing on the page, in its sources or in its registry entry says ETH is falsified', !RED_ZH.test(sources) && !RED_ZH.test(shown.zh) && !RED_ZH.test(shown.en) && RED_ZH.test('预印本证伪了 ETH') && RED_ZH.test('ETH 已被推翻'), (sources.match(RED_ZH) || shown.zh.match(RED_ZH) || [''])[0]);
check('red line (English): nothing on the page, in its sources or in its registry entry says ETH is false', !RED_EN.test(sources) && !RED_EN.test(shown.zh) && !RED_EN.test(shown.en) && RED_EN.test('the preprints refute the ETH') && RED_EN.test('The Exponential Time Hypothesis Is False'), (sources.match(RED_EN) || shown.en.match(RED_EN) || [''])[0]);
check('ETH is marked OPEN in both languages; the candidate curve is the schematic upper bound reported in chapter 30 (MODEL); the PPSZ table is ARGUED for the uniquely satisfiable case', await D(() => {
  const open = document.querySelector('#evidence .lean.open'), model = document.querySelector('.lean.model[data-scenes="rates"]'), argued = document.querySelector('.lean.argued[data-scenes="rates"]');
  return !!open && /指数时间假设/.test(open.querySelector('.zh').textContent) && /ETH/.test(open.querySelector('.zh').textContent) && /exponential time hypothesis/.test(open.querySelector('.en').textContent) && /开放问题/.test(open.textContent) && /Open problems/.test(open.textContent)
    && !!model && /第 30 章所转述的亚指数候选上界示意曲线/.test(model.textContent) && /candidate subexponential upper bound reported in chapter 30/.test(model.textContent)
    && !!argued && /文献结果，未在本书形式化/.test(argued.textContent) && /唯一可满足/.test(argued.textContent) && /uniquely satisfiable/.test(argued.textContent) && /0\.3863、0\.5548、0\.6502、0\.7118/.test(argued.textContent);
}));
await page.click('[data-lang-set="zh"]'); await settle(page);
check('the schematic curve is labelled as a model and the preprints as unaudited', await D(() => { const m = document.querySelector('.lean.model[data-scenes="rates"]'); return !!m && /审计/.test(m.textContent) && /不是定理/.test(m.textContent) && !!document.querySelector('.lean.open'); }));
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const sc of ['rates', 'cut', 'modes']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
