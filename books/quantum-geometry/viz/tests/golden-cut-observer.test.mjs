// Browser regression suite for ORTHO//CUT (books/quantum-geometry/viz/golden-cut-observer/).
//   node books/quantum-geometry/viz/tests/golden-cut-observer.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.CUT_DEBUG and checks it against independent computations written here: the golden
// lattice enumerated over integer pairs with exact integer norms, the natural-number expansions by two other routes,
// the admissible shifts of a fixed patch by brute force over a grid, Fibonacci numbers with their own BigInt recurrence,
// the golden rotation by repeated addition, and the triacontahedron as a zonotope through its support function.
import { session, stageFirstChecks, settle, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'golden-cut-observer';
const T = await session();
const { check } = T;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const R5 = Math.sqrt(5), PHI = (1 + R5) / 2, PSI = (1 - R5) / 2, LO = PHI - 2, HI = PHI - 1;
const key = (p) => `${p.a},${p.b}`;
// every golden integer a + bφ with |a + bφ| ≤ 55 whose conjugate is within 2 of the origin, from integer pairs
const LATTICE = [];
for (let a = -90; a <= 90; a++) for (let b = -60; b <= 60; b++) { const x = a + b * PHI, c = a + b * PSI; if (Math.abs(x) <= 55 && Math.abs(c) <= 2) LATTICE.push({ a, b, x, c, norm: a * a + a * b - b * b }); }
const chosen = (u) => LATTICE.filter((p) => p.c >= LO + u - 1e-12 && p.c <= HI + u + 1e-12).sort((p, q) => p.x - q.x);

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.CUT_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 30000 }).catch(() => {});
const seek = async (t) => { await D((v) => window.CUT_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await page.$eval(`#${id}`, (el, val) => { el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); await settle(page, 30); };
const inRange = (list) => list.filter((p) => Math.abs(p.x) <= 55);
const sameSet = (a, b) => a.length === b.length && new Set(a.map(key)).size === a.length && b.every((p) => a.some((q) => key(q) === key(p)));

/* ---------- cut and project ---------- */
let s = await state();
check('opens on PHASON: the cut scene with the window shifted by u = +0.3, not playing', s.preset === 'phason' && s.scene === 'cut' && near(s.u, 0.3) && !s.playing && !s.patch);
const pageLattice = await D(() => window.CUT_DEBUG.lattice());
check('the page’s lattice is the set of golden integers a + bφ drawn at (a + bφ, a + bψ)', pageLattice.length > 200 && pageLattice.every((p) => Number.isInteger(p.a) && Number.isInteger(p.b) && near(p.x, p.a + p.b * PHI, 1e-9) && near(p.c, p.a + p.b * PSI, 1e-9)) && LATTICE.every((p) => pageLattice.some((q) => key(q) === key(p))));
check('the embedding is injective: no two lattice points share a first coordinate', new Set(pageLattice.map((p) => p.x.toFixed(9))).size === pageLattice.length);
let selOK = true, gapOK = true, sepOK = true, bad = '';
for (const u of [-0.5, -0.37, -0.2, -0.05, 0.11, 0.3, 0.42, 0.5]) {
  const q = await seek(u + 0.5), mine = chosen(u);
  if (!near(q.u, u) || !sameSet(inRange(q.selected), mine) || !near(q.window[0], LO + u) || !near(q.window[1], HI + u)) { selOK = false; bad = `u=${u}`; }
  for (let i = 1; i < mine.length; i++) { const d = mine[i].x - mine[i - 1].x; if (!near(d, PHI, 1e-9) && !near(d, PHI * PHI, 1e-9)) { gapOK = false; bad = `u=${u} gap ${d}`; } if (d < 1 - 1e-9) sepOK = false; }
  if (q.kinds.length !== 2 || !near(q.kinds[0], PHI, 1e-6) || !near(q.kinds[1], PHI * PHI, 1e-6)) { gapOK = false; bad = `u=${u} kinds ${q.kinds}`; }
}
check('at eight shifts, the selected points are exactly the lattice points whose conjugate lies in [φ − 2, φ − 1] + u', selOK, bad);
check('at each of them the gaps between neighbouring selected points are φ and φ² and nothing else', gapOK, bad);
await pick('cut'); s = await state();
const zero = chosen(0), unit = []; for (let i = 1; i < zero.length; i++) if (near(zero[i].x - zero[i - 1].x, 1, 1e-9)) unit.push([zero[i - 1], zero[i]]);
check('CUT: u = 0, the closed window [φ − 2, φ − 1]', s.preset === 'cut' && s.u === 0 && sameSet(inRange(s.selected), zero));
check('at u = 0 both ends of the window carry a lattice point (−φ² below, −φ above) and exactly one gap of length 1 appears between them', unit.length === 1 && key(unit[0][0]) === '-1,-1' && key(unit[0][1]) === '0,-1' && near(unit[0][0].c, LO, 1e-12) && near(unit[0][1].c, HI, 1e-12) && s.kinds.length === 3 && near(s.kinds[0], 1, 1e-6) && near(s.minGap, 1, 1e-9));
check('the readouts say so: gaps 1, φ, φ² and the smallest gap ≥ 1 ✓', (await page.textContent('#roKey')).replace(/\s/g, '') === '1、φ、φ²' && /≥ 1 ✓/.test(await page.textContent('#ro2')));
let normOK = true, sepAll = true;
for (const p of LATTICE) if (!near(p.x * p.c, p.norm, 1e-7) || ((p.a || p.b) && Math.abs(p.norm) < 1)) normOK = false;
const sample = LATTICE.filter((p) => Math.abs(p.x) <= 30);
for (let i = 0; i < sample.length; i++) for (let j = i + 1; j < sample.length; j++) { const B = Math.abs(sample[i].c - sample[j].c); if (Math.abs(sample[i].x - sample[j].x) * B < 1 - 1e-9) sepAll = false; }
check('itself × conjugate is the integer norm a² + ab − b², never 0 for a nonzero golden integer', normOK);
check(`reciprocal separation: for all ${sample.length * (sample.length - 1) / 2} pairs u ≠ v with |x| ≤ 30, |u − v| · |conj u − conj v| ≥ 1, so two points of one window of length 1 are at least 1 apart`, sepAll && sepOK);
// the natural-number expansions β(n): Zeckendorf digits read in base φ, by two routes that are not the page's
const fibs = [1, 2]; while (fibs.length < 30) fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);
let betaOK = true, betaIn = true, stepOK = true, prev = null;
for (let n = 0; n < 40; n++) {
  let r = n, val = 0; for (let i = fibs.length - 1; i >= 0; i--) if (fibs[i] <= r) { r -= fibs[i]; val += Math.pow(PHI, i + 2); }
  const a = Math.floor(HI - n * PSI + 1e-12), [pa, pb] = s.beta[n], x = pa + pb * PHI, c = pa + pb * PSI;
  if (pb !== n || pa !== a || !near(x, val, 1e-7)) betaOK = false;
  if (!(c >= LO - 1e-12 && c <= HI + 1e-12) || (x <= 55 && !zero.some((p) => p.a === pa && p.b === pb))) betaIn = false;
  if (prev != null && !near(x - prev, PHI, 1e-9) && !near(x - prev, PHI * PHI, 1e-9)) stepOK = false;
  prev = x;
}
check('β(n) for n < 40: the page’s golden integers have b = n, equal the sum of the powers of φ at the Zeckendorf digits, and a is the one integer that puts the conjugate in (φ − 2, φ − 1]', betaOK);
check('every β(n) is selected by the window at u = 0, and consecutive ones are φ or φ² apart', betaIn && stepOK);
check('−φ is selected at u = 0 but is no β(n): the inclusion is proper', zero.some((p) => p.a === 0 && p.b === -1) && !s.beta.some(([a, b]) => a === 0 && b === -1));
check('the green rings are announced at u = 0 only', /β\(n\)/.test(await page.textContent('#legend')) && !/β\(n\)/.test((await seek(0.8), await page.textContent('#legend'))));
// a point withstands exactly the shifts smaller than its distance to the edge
s = await seek(0.6); const u0 = s.u, here = chosen(u0).filter((p) => Math.abs(p.x) <= s.half), marg = (p, u) => Math.min(p.c - LO - u, HI + u - p.c);
const deepest = here.reduce((m, p) => (marg(p, u0) > marg(m, u0) ? p : m));
check('the deepest point in view is the one farthest from both edges, and no point is farther than 0.5', key(s.deep) === key(deepest) && near(s.deep.margin, marg(deepest, u0)) && s.deep.margin < 0.5 && s.seen === here.length);
let stayOK = true, flipOK = true;
for (const p of here) {
  const m = marg(p, u0), up = p.c - LO - u0 < HI + u0 - p.c;       // nearer to the lower edge: moving the window up drops it
  for (const du of [0.8 * m, -0.8 * m]) { const u = u0 + du; if (Math.abs(u) <= 0.5) { const q = await seek(u + 0.5); if (!q.selected.some((r) => key(r) === key(p))) stayOK = false; } }
  const u = u0 + (up ? 1 : -1) * (m + 0.01); if (Math.abs(u) <= 0.5) { const q = await seek(u + 0.5); if (q.selected.some((r) => key(r) === key(p))) flipOK = false; }
}
check('every selected point stays under shifts smaller than its distance to the edge', stayOK);
check('and leaves once the window has moved past it', flipOK);
let swapOK = true, flips = 0, before = chosen(-0.45);
for (let u = -0.43; u <= 0.4501; u += 0.02) {
  const now = chosen(u), out = before.filter((p) => !now.some((r) => key(r) === key(p))), inn = now.filter((p) => !before.some((r) => key(r) === key(p)));
  if (out.length !== inn.length || !out.every((p) => inn.some((r) => r.a === p.a + 1 && r.b === p.b))) swapOK = false;
  flips += out.length; before = now;
}
check(`as the window moves up, each point that leaves is replaced by the point one unit to its right (${flips} flips): a long and a short tile swap`, swapOK && flips > 20);
const stage = await page.$eval('#stage', (el) => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
await pick('cut'); await page.mouse.move(stage[0], stage[1]); await page.mouse.down(); await page.mouse.move(stage[0], stage[1] - 30, { steps: 4 }); await page.mouse.up(); s = await state();
check('dragging on the stage moves the window (and leaves the card)', s.u !== 0 && s.preset === null && s.scene === 'cut');

/* ---------- a fixed patch ---------- */
await pick('empire'); s = await seek(0.5);
const P0 = s.patch, patchSel = (u) => chosen(u).filter((p) => Math.abs(p.x) <= P0.radius).map(key).join(' '), ref = patchSel(P0.ref), ok = [];
for (let i = -1000; i <= 1000; i++) { const u = i / 2000; if (patchSel(u) === ref) ok.push(u); }
check('EMPIRE: the middle patch |x| ≤ 4 is fixed at u = 0.15 and the shifts are confined to an interval around it', s.preset === 'empire' && P0 && P0.radius === 4 && near(P0.ref, 0.15) && P0.lo < 0.15 && P0.hi > 0.15 && s.u > P0.lo && s.u < P0.hi);
check('brute force over 2001 shifts: the ones that leave the patch unchanged form exactly that interval', ok.length > 20 && ok.every((u, i) => !i || near(u - ok[i - 1], 0.0005, 1e-12)) && Math.abs(ok[0] - Math.max(P0.lo, -0.5)) <= 0.00051 && Math.abs(ok[ok.length - 1] - Math.min(P0.hi, 0.5)) <= 0.00051, JSON.stringify([ok[0], ok[ok.length - 1], P0.lo, P0.hi]));
const inner = ok.filter((u) => u > P0.lo + 1e-6 && u < P0.hi - 1e-6), sels = inner.map((u) => new Set(chosen(u).map(key))), far = LATTICE.filter((p) => Math.abs(p.x) > P0.radius && Math.abs(p.x) <= s.half);
const always = far.filter((p) => sels.every((S) => S.has(key(p)))), sometimes = far.filter((p) => sels.some((S) => S.has(key(p))) && !sels.every((S) => S.has(key(p))));
check(`beyond the patch, the points selected at every admissible shift are the ones the page rings (${always.length}), and those selected at some but not all are the ones it leaves undecided (${sometimes.length})`, sameSet(P0.forced, always) && sameSet(P0.free, sometimes) && always.length >= 2 && sometimes.length >= 1);
check('the intersection window is [φ − 2 + hi, φ − 1 + lo]', near(P0.emp[0], LO + P0.hi) && near(P0.emp[1], HI + P0.lo) && always.every((p) => p.c >= P0.emp[0] - 1e-9 && p.c <= P0.emp[1] + 1e-9));
const a0 = await seek(0), a1 = await seek(1);
check('with the patch fixed the rail runs over the admissible interval only, and the patch is the same at both ends', a0.u > P0.lo && a0.u < P0.lo + 0.02 * (P0.hi - P0.lo) && a1.u < P0.hi && a1.u > P0.hi - 0.02 * (P0.hi - P0.lo) && patchSel(a0.u) === ref && patchSel(a1.u) === ref);
check('the stage says how many points are fixed', new RegExp(`另有 ${always.length} 个点被定住`).test(await page.textContent('#hudSub')) && (await page.textContent('#ro4')).replace(/\s/g, '') === `${always.length}/${sometimes.length}`);
await seek(0.5); const uKeep = (await state()).u; await page.click('#patchChips [data-patch="off"]'); s = await state();
check('releasing the patch keeps the window where it is', !s.patch && near(s.u, uKeep, 1e-9) && s.preset === null);
await page.click('#patchChips [data-patch="on"]'); s = await state();
check('fixing it again at that shift gives an interval that contains the shift', s.patch && s.patch.lo < s.u && s.u < s.patch.hi && near(s.u, uKeep, 1e-6));

/* ---------- Cassini ---------- */
const F = [0n, 1n]; for (let i = 2; i < 320; i++) F.push(F[i - 1] + F[i - 2]);
let casAll = true; for (let n = 0; n < 300; n++) if (F[n] * F[n + 2] - F[n + 1] * F[n + 1] !== (n % 2 ? 1n : -1n) || F[n] * F[n] + F[n] * F[n + 1] - F[n + 1] * F[n + 1] !== (n % 2 ? 1n : -1n)) casAll = false;
check('Fₙ·Fₙ₊₂ − Fₙ₊₁² = (−1)ⁿ⁺¹ for n < 300 with big integers, and it is the norm of Fₙ + Fₙ₊₁φ', casAll);
await pick('cassini'); let casOK = true, casBad = '';
for (let k = 1; k <= 6; k++) {
  const q = await seek(k - 1), want = k % 2 ? 1 : -1;
  if (q.k !== k || q.fib.join() !== [F[k], F[k + 1], F[k + 2]].map(String).join() || q.value !== want || !near(q.point[0], Math.pow(PHI, k + 1), 1e-9) || !near(q.point[1], Math.pow(PSI, k + 1), 1e-9) || !near(q.point[0] * q.point[1], want, 1e-9) || Math.sign(q.point[1]) !== want) { casOK = false; casBad = JSON.stringify(q); }
  if (!(await page.textContent('#hudSub')).includes(`= ${F[k]}·${F[k + 2]} − ${F[k + 1]}² = ${want > 0 ? '+1' : '−1'}`) || (await page.textContent('#roKey')).trim() !== (want > 0 ? '+1' : '−1')) { casOK = false; casBad = `text k=${k}`; }
}
check('CASSINI, k = 1…6: the point is (φᵏ⁺¹, ψᵏ⁺¹) = Fₖ + Fₖ₊₁φ, the product of its coordinates is (−1)ᵏ⁺¹, it lies above the axis exactly when that is +1, and the stage prints the identity with its numbers', casOK, casBad);
s = await state();
check('the strip of twelve values is +1, −1, +1, …, as computed here with big integers', s.all.length === 12 && s.all.every((v, i) => v === Number(F[i + 1] * F[i + 3] - F[i + 2] * F[i + 2])) && s.all[0] === 1 && s.all[1] === -1);
const onCurve = pageLattice.filter((p) => Math.abs(Math.abs(p.x * p.c) - 1) < 1e-7), inside = pageLattice.filter((p) => (p.a || p.b) && Math.abs(p.x * p.c) < 1 - 1e-7);
check(`between the hyperbolas x·x′ = ±1 there is no lattice point but the origin, and the ${onCurve.length} points on them are ± powers of φ`, inside.length === 0 && onCurve.length >= 10 && onCurve.every((p) => { const t = Math.log(Math.abs(p.x)) / Math.log(PHI); return near(t, Math.round(t), 1e-7); }));
let ratioOK = true; for (let k = 1; k <= 12; k++) { const e = Number(F[k + 1]) / Number(F[k]) - PHI; if (Math.sign(e) !== (k % 2 ? -1 : 1) || !near(Math.abs(e), Math.pow(PHI, -k) / Number(F[k]), 1e-12)) ratioOK = false; }
check('Fₖ₊₁/Fₖ − φ alternates in sign and equals ±φ⁻ᵏ/Fₖ', ratioOK);

/* ---------- returns ---------- */
await pick('returns'); s = await seek(88);
const orbit = [0]; for (let n = 1; n <= 233; n++) { let x = orbit[n - 1] + (PHI - 1); if (x >= 1) x -= 1; orbit.push(x); }
const hitsOf = (N, u1, u2) => { const h = []; for (let n = 1; n <= N; n++) { const e = Math.cos(2 * Math.PI * orbit[n]); if (e > u1 && e < u2) h.push(n); } return h; };
const gapOf = (h) => { let best = null; for (let i = 1; i < h.length; i++) best = Math.max(best ?? 0, h[i] - h[i - 1]); return best; };   // longest completed gap between two visits, null before the second
const txt = async (sel) => (await page.textContent(sel)).replace(/\s+/g, ' ').trim();
let orbOK = true; for (const n of [1, 2, 34, 89, 144, 233]) { const [x, e] = await D((m) => window.CUT_DEBUG.orbit(m), n); if (!near(x, orbit[n], 1e-9) || !near(e, Math.cos(2 * Math.PI * orbit[n]), 1e-8)) orbOK = false; }
check('the orbit is the rotation by φ of a turn (compared with repeated addition) and the observed value is the cosine', orbOK);
let h = hitsOf(89, 0.2, 0.8);
check('RETURNS: N = 89, window (0.2, 0.8); the visits are the steps whose value lies in the open window', s.scene === 'returns' && s.N === 89 && near(s.u1, 0.2) && near(s.u2, 0.8) && s.hits.join() === h.join() && h.length > 10);
check('the longest gap is the longest completed gap between two consecutive visits, and its reciprocal is reported as a description', s.longest === gapOf(h) && s.longest === 7 && near(s.ratio, 1 / 7) && s.waits.join() === h.slice(1).map((v, i) => v - h[i]).join());
check('the share of steps inside is the plain count over N', near(s.share, h.length / 89));
check('the readouts call the longest gap a sample and the reciprocal descriptive, with no tick and no inequality', /样本/.test(await txt('#roKeyL')) && /描述/.test(await txt('#roL3')) && !/[✓✗≥≤]/.test(await txt('#readouts .ro')) && !/M \+ 1/.test(await txt('#roKeyL') + await txt('#roL3')) && /没有算出 n₀ 或 M/.test(await txt('#roNote')));
check('the strip title states the share of the first N steps, not an inequality against the sample gap', !/≥/.test(await txt('#pBMeta')) && (await txt('#pBMeta')).includes((h.length / 89).toFixed(3)) && !/1\/\(M \+ 1\)/.test(await txt('.strip')));
let arc = 0; for (let i = 0; i < 400000; i++) { const e = Math.cos(2 * Math.PI * (i + 0.5) / 400000); if (e > 0.2 && e < 0.8) arc++; }
check('the window’s share of the circle is the measure of { cos 2πx ∈ (0.2, 0.8) }', near(s.measure, arc / 400000, 1e-4), `${s.measure} ${arc / 400000}`);
// the sample gap is not a bound: controls at N = 3, 4 and 10 with the default window (0.2, 0.8)
s = await seek(2); h = hitsOf(3, 0.2, 0.8);
const h10 = hitsOf(10, 0.2, 0.8), nextAfter3 = hitsOf(233, 0.2, 0.8).find((n) => n > 3);
check('N = 3: one visit (step 3), no completed gap; independently the next visit is step 10, a gap of 7 that no 3-step sample could bound', s.N === 3 && h.join() === '3' && s.hits.join() === '3' && s.longest === null && s.ratio === null && s.open === 0 && nextAfter3 === 10 && nextAfter3 - 3 === 7);
check('N = 3 readouts: the key and the reciprocal are “—”, the stage says there is no completed gap, and nothing claims a visit in every block of steps', (await txt('#roKey')) === '—' && (await txt('#ro3')) === '—' && /还没有完整的间隔/.test(await txt('#hudSub')) && !/任何连续/.test(await txt('#hudSub')) && (await txt('#ro1')) === '1');
s = await seek(3);
check('N = 4: share 1/4, still no completed gap; independently 1/4 < 1/3, so a sample reciprocal 1/3 would be no lower bound, and the page shows none', s.N === 4 && near(s.share, 0.25) && s.longest === null && (await txt('#ro2')) === '0.2500' && (await txt('#ro3')) === '—' && 1 / 4 < 1 / 3 && !/[✓≥]/.test(await txt('#readouts .ro')) && /上次进入后已过 1 步/.test(await txt('#hudSub')));
s = await seek(9);
check('N = 10: the second visit completes the first gap, 7 steps', s.N === 10 && s.hits.join() === h10.join() && h10.join() === '3,10' && s.longest === 7 && (await txt('#roKey')).startsWith('7') && (await txt('#ro3')) === (1 / 7).toFixed(4));
s = await seek(232); h = hitsOf(233, 0.2, 0.8);
check('at N = 233 the share of visits is within 0.01 of that measure, and the longest completed gap is still 7', s.N === 233 && s.hits.join() === h.join() && Math.abs(s.share - s.measure) < 0.01 && s.longest === gapOf(h) && s.longest === gapOf(hitsOf(89, 0.2, 0.8)), JSON.stringify([s.share, s.measure, s.longest]));
const wide = s.longest;
await pick('narrow'); s = await seek(232); h = hitsOf(233, 0.45, 0.55);
check('NARROW: window (0.45, 0.55); fewer visits and a longer longest gap, computed from the visits alone', near(s.u1, 0.45) && near(s.u2, 0.55) && s.hits.join() === h.join() && h.length >= 3 && s.longest === gapOf(h) && s.longest > wide && near(s.ratio, 1 / s.longest));
s = await seek(10); h = hitsOf(11, 0.45, 0.55);
check('NARROW with no visit yet (N = 11): no hits, no gap, and the page says so instead of inventing a bound', h.length === 0 && s.hits.length === 0 && s.longest === null && s.ratio === null && (await txt('#roKey')) === '—' && (await txt('#ro3')) === '—' && /还没有进入过/.test(await txt('#hudSub')) && (await txt('#ro1')) === '0');
await page.click('[data-lang-set="en"]'); await settle(page, 60);
check('English, narrow and no visit: the readouts say “no completed gap yet” and “not entered”, with no bound', /not entered in the first 11 steps/.test(await txt('#hudSub')) && /no completed gap yet/.test(await txt('#roKeySub')) && /sample/.test(await txt('#roKeyL')) && /descriptive/.test(await txt('#roL3')) && /neither n₀ nor M/.test(await txt('#roNote')));
await pick('returns'); s = await seek(3);
check('English, N = 4 with the default window: “no completed gap yet, 1 step since that visit”, share 0.2500, no inequality', /no completed gap yet/.test(await txt('#hudSub')) && (await txt('#ro2')) === '0.2500' && !/[✓≥]/.test(await txt('#readouts .ro')) && /1 step since that visit/.test(await txt('#hudSub')) && !/at least once in any/.test(await txt('#hudSub')));
await page.click('[data-lang-set="zh"]'); await settle(page, 60);
await pick('narrow'); s = await seek(232);
await setRange('wc', -0.5); await setRange('ww', 0.3); s = await state(); h = hitsOf(s.N, -0.65, -0.35);
check('the sliders move the window (here to (−0.65, −0.35)) and the visits follow', near(s.u1, -0.65) && near(s.u2, -0.35) && s.hits.join() === h.join() && s.preset === null && (await page.textContent('#oWC')).trim() === '−0.50');
await setRange('wc', 0.9); await setRange('ww', 0.05); s = await state();
check('at the extreme settings the window still meets the range [−1, 1] of the observable', s.u1 < 1 && s.u2 > -1 && s.u1 > -1);
await page.mouse.move(stage[0], stage[1]); await page.mouse.down(); await page.mouse.move(stage[0], stage[1] + 40, { steps: 4 }); await page.mouse.up(); s = await state();
check('dragging on the stage moves the band', s.scene === 'returns' && s.u1 < 0.875);

/* ---------- the acceptance window ---------- */
await pick('window'); s = await state();
const solid = await D(() => window.CUT_DEBUG.solid());
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], len = (a) => Math.hypot(a[0], a[1], a[2]), cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const V = solid.verts.map((v) => v.p), nV = V.length, nE = solid.edges.length, nF = solid.faces.length;
check('WINDOW: 30 faces, 60 edges, 32 vertices, and V − E + F = 2', nF === 30 && nE === 60 && nV === 32 && nV - nE + nF === 2 && s.counts.join() === '30,60,32' && (await page.textContent('#ro1')).replace(/\s/g, '') === '30·60·32');
let rhombi = true; for (const f of solid.faces) { const q = f.i.map((i) => V[i]), sides = [0, 1, 2, 3].map((m) => len(sub(q[(m + 1) % 4], q[m]))), d1 = len(sub(q[2], q[0])), d2 = len(sub(q[3], q[1])); if (!sides.every((x) => near(x, 1, 1e-9)) || !near(Math.max(d1, d2) / Math.min(d1, d2), PHI, 1e-9) || !q.every((p) => near(dot(p, f.n), s.rin, 1e-9))) rhombi = false; }
check('every face is a golden rhombus of side 1 (diagonals in the ratio φ), in a plane at the same distance from the centre', rhombi);
const uses = new Map(); for (const f of solid.faces) f.i.forEach((a, m) => { const b = f.i[(m + 1) % 4], e = a < b ? `${a}-${b}` : `${b}-${a}`; uses.set(e, (uses.get(e) || 0) + 1); });
check('the surface is closed: each of the 60 edges belongs to exactly two faces', uses.size === 60 && [...uses.values()].every((n) => n === 2) && solid.edges.every(([a, b]) => uses.has(a < b ? `${a}-${b}` : `${b}-${a}`)));
check('it is convex: every vertex lies on or behind every face plane', solid.faces.every((f) => V.every((p) => dot(p, f.n) <= s.rin + 1e-9)));
const five = solid.verts.filter((v) => v.deg === 5), three = solid.verts.filter((v) => v.deg === 3), shape = (p) => p.map((x) => Math.abs(x) / len(p)).sort((a, b) => a - b), like = (p, w) => shape(p).every((x, i) => near(x, shape(w)[i], 1e-9));
check('12 vertices where five faces meet, in the directions (0, ±1, ±φ) of an icosahedron; 20 where three meet, in the directions (±1, ±1, ±1) and (0, ±φ, ±1/φ) of a dodecahedron', five.length === 12 && three.length === 20 && five.every((v) => like(v.p, [0, 1, PHI]) && near(len(v.p), len(five[0].p))) && three.every((v) => (like(v.p, [1, 1, 1]) || like(v.p, [0, PHI, 1 / PHI])) && near(len(v.p), len(three[0].p))) && (await page.textContent('#ro2')).replace(/\s/g, '') === '12·20');
// independently: the zonotope Σ tᵢ gᵢ, |tᵢ| ≤ ½, of the six fivefold axes, through its support function h(w) = ½ Σ |gᵢ·w|
const G = [[0, 1, PHI], [0, -1, PHI], [1, PHI, 0], [-1, PHI, 0], [PHI, 0, 1], [PHI, 0, -1]].map((g) => g.map((x) => x / len(g)));
const support = (w) => G.reduce((t, g) => t + Math.abs(dot(g, w)) / 2, 0);
const rnd = (() => { let a = 12345; return () => { a = (a * 1103515245 + 12345) % 2147483648; return a / 2147483648; }; })();
const dirs = []; while (dirs.length < 60000) { const w = [2 * rnd() - 1, 2 * rnd() - 1, 2 * rnd() - 1], n = len(w); if (n > 0.05 && n <= 1) dirs.push(w.map((x) => x / n)); }
const extreme = new Map(); for (const w of dirs) { const p = [0, 0, 0]; for (const g of G) { const sg = Math.sign(dot(g, w)) / 2; p[0] += sg * g[0]; p[1] += sg * g[1]; p[2] += sg * g[2]; } extreme.set(p.map((x) => x.toFixed(6)).join(), p); }
check('the vertices are exactly the extreme points of the zonotope of the six fivefold axes (found here from 60000 random directions)', extreme.size === 32 && [...extreme.values()].every((p) => V.some((q) => len(sub(p, q)) < 1e-6)));
const normals = []; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const n = cross(G[i], G[j]); normals.push(n.map((x) => x / len(n))); }
const depthOf = (p) => Math.min(...normals.map((n) => support(n) - Math.abs(dot(n, p))));
check('the inradius is φ²/√(1 + φ²) ≈ 1.3764 edge lengths, the same for all fifteen pairs of faces', near(s.rin, PHI * PHI / Math.sqrt(1 + PHI * PHI), 1e-9) && normals.every((n) => near(support(n), s.rin, 1e-9)) && (await page.textContent('#ro3')).trim() === '1.3764');
let sup = Infinity, best = null; for (const w of dirs) { const v = support(w) - dot(w, s.p); if (v < sup) { sup = v; best = w; } }
for (let i = 0, r = 0.05; i < 30000; i++) { const w = best.map((x) => x + r * (2 * rnd() - 1)), n = len(w), u = w.map((x) => x / n), v = support(u) - dot(u, s.p); if (v < sup) { sup = v; best = u; } else if (i % 40 === 39) r *= 0.96; }   // a random search that narrows around the best direction
check('the page’s d∂ is the distance to the boundary: the least of h(w) − w·p over all directions (60000 random ones, then a narrowing search) comes down to it and not below', near(s.d, depthOf(s.p), 1e-9) && sup >= s.d - 1e-9 && sup < s.d + 1e-4 && s.inside && near(s.s, 0.15), `${s.d} ${sup}`);
// the part at least d from the boundary is the window shrunk by 1 − d/r: Monte Carlo over points of the window
const box = Math.max(...V.map(len)), pts = []; while (pts.length < 120000) { const p = [box * (2 * rnd() - 1), box * (2 * rnd() - 1), box * (2 * rnd() - 1)]; if (depthOf(p) >= 0) pts.push(depthOf(p)); }
let mcOK = true, mcBad = '';
for (const t of [0.15, 0.4, 0.7, 0.9]) { const q = await seek(t), mc = pts.filter((d) => d >= q.d).length / pts.length, want = Math.pow(1 - q.d / q.rin, 3); if (!near(q.share, want, 1e-12) || Math.abs(mc - want) > 0.006) { mcOK = false; mcBad = `${t} ${mc} ${want}`; } }
check('the share of the window at least d∂ deep is (1 − d∂/r)³ (Monte Carlo over 120000 points of the window, four positions)', mcOK, mcBad);
s = await seek(0); check('at the centre d∂ is the inradius', near(s.d, s.rin, 1e-12) && near(s.share, 0, 1e-12));
s = await seek(1); check('at s = 1 the point is on the boundary: d∂ = 0', Math.abs(s.d) < 1e-9);
s = await seek(1.1); check('beyond it the point is outside and the page says so', !s.inside && s.d < 0 && depthOf(s.p) < 0 && /窗外/.test(await page.textContent('#roKey')) && /不在窗口里/.test(await page.textContent('#hudSub')));
await pick('edge'); await page.waitForTimeout(250); s = await state();
check('EDGE plays the point outwards from the centre', s.preset === 'edge' && (s.playing || s.s > 0)); s = await seek(0.93);
check('at s = 0.93 the point is still inside, a short distance from the nearest face', s.inside && s.d > 0 && s.d < 0.12 * s.rin);

/* ---------- camera, keyboard, evidence, language ---------- */
const shot0 = await D(() => document.getElementById('cv').toDataURL().length);
await page.mouse.move(stage[0], stage[1]); await page.mouse.down(); await page.mouse.move(stage[0] + 140, stage[1] + 30, { steps: 5 }); await page.mouse.up(); await settle(page);
check('dragging the stage turns the triacontahedron (the picture changes, the point stays)', (await D(() => document.getElementById('cv').toDataURL().length)) !== shot0 && near((await state()).s, 0.93));
await page.click('body', { position: { x: 5, y: 5 } });
for (const [k, sc] of [['2', 'cassini'], ['3', 'returns'], ['4', 'window3'], ['1', 'cut']]) { await page.keyboard.press(k); check(`key ${k} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); check('Home and → step the rail (u from −0.5 to −0.45)', near((await state()).u, -0.45));
await page.keyboard.press('Space'); await until(() => { const d = window.CUT_DEBUG.state; return d.playing && d.u > -0.45; }); s = await state(); check('Space plays', s.playing && s.u > -0.45); await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
const shown = async () => D(() => [...document.querySelectorAll('#readouts a[data-lean-gid]')].filter((a) => !a.closest('[hidden]')).map((a) => a.dataset.leanGid.split('.').pop()).join());
const perScene = {}; for (const sc of ['cut', 'cassini', 'returns', 'window3']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 40); perScene[sc] = await shown(); }
check('each scene shows the theorem it rests on beside the readouts, and the window scene, which rests on the literature, shows none', perScene.cut === 'minkowski_model_set_spec,golden_model_set_subset_cut_and_project' && perScene.cassini === 'fib_cassini_from_golden_norm' && perScene.returns === 'result' && perScene.window3 === '', JSON.stringify(perScene));
check('the soul-and-ruin reading is labelled as a model, the empire and the triacontahedron as literature', /诠释模型，不是定理/.test(await page.textContent('#evidence')) && (await D(() => [...document.querySelectorAll('.lean.argued')].every((el) => /文献结果，未在本书形式化/.test(el.textContent)))));
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const sc of ['cut', 'cassini', 'returns', 'window3']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }
await page.click('#sceneChips [data-scene="cut"]'); await page.click('#patchChips [data-patch="on"]'); await settle(page, 60); { const left = await cjkLeftovers(page); check('English: no Chinese left with a patch fixed', left.length === 0, left.slice(0, 4).join(' | ')); }

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
