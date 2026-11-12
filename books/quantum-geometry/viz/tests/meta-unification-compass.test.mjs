#!/usr/bin/env node
// Browser regression suite for ORTHO//COMPASS (books/quantum-geometry/viz/meta-unification-compass/):
//   node books/quantum-geometry/viz/tests/meta-unification-compass.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per claim, each against an independent computation here:
//   2I       generated as a group from two generators by closure (not from the page's list of 120), in the basis
//            {1, √5} of ℚ(√5) (the page works in the basis {1, φ}), with an independently written quaternion product;
//   E₈       Q = 2(a + b) recomputed from Nrd in the √5 basis; the 240 vectors of Q = 2 found by scanning ±2I and ±φ⁻¹·2I;
//            B between all pairs; a ℤ-basis by incremental gcd insertion and the Gram determinant over rationals (BigInt);
//   E∥ ⊕ E⊥  the weighted coordinates from the Galois conjugate √5 ↦ −√5.
//   compass  the bands of §32.4 restated here as the specification of the coding.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'meta-unification-compass';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

await stageFirstChecks(T, BOOK, ID);

/* ---------- independent model: ℚ(√5) with coordinates (u + v√5)/4, u, v integers ---------- */
const S5 = Math.sqrt(5), PHI = (1 + S5) / 2;
// x = (u + v√5)/4; products of two such are (us + 5vt + (ut + vs)√5)/16 = ((us + 5vt)/4 + (ut + vs)/4 √5)/4
const m = ([u, v], [s, t]) => [u * s + 5 * v * t, u * t + v * s];              // numerator over 16
const div4 = ([a, b]) => (a % 4 === 0 && b % 4 === 0 ? [a / 4, b / 4] : null); // back to quarters
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
// a quaternion is [w, x, y, z], each [u, v]
function qmul(a, b) {
  const [a0, a1, a2, a3] = a, [b0, b1, b2, b3] = b;
  const raw = [
    sub(sub(sub(m(a0, b0), m(a1, b1)), m(a2, b2)), m(a3, b3)),
    sub(add(add(m(a0, b1), m(a1, b0)), m(a2, b3)), m(a3, b2)),
    add(add(sub(m(a0, b2), m(a1, b3)), m(a2, b0)), m(a3, b1)),
    add(sub(add(m(a0, b3), m(a1, b2)), m(a2, b1)), m(a3, b0))
  ].map(div4);
  return raw.some((c) => c == null) ? null : raw;
}
const K = (q) => q.map((c) => c.join(':')).join('|');
// generators: s = (1 + i + j + k)/2 (order 6) and t = (φ + φ⁻¹ i + j)/2 (order 10); φ = (1 + √5)/2 → (2 + 2√5)/4 ·…
const half = (u, v) => [2 * u, 2 * v];                     // (u + v√5)/2 in quarters
const ONE = [4, 0], ZERO = [0, 0];
const phiHalf = [1, 1], phiInvHalf = [-1, 1];               // φ/2 = (1 + √5)/4, φ⁻¹/2 = (−1 + √5)/4
const gens = [[half(1, 0), half(1, 0), half(1, 0), half(1, 0)], [phiHalf, phiInvHalf, half(1, 0), ZERO]];
const group = new Map([[K([ONE, ZERO, ZERO, ZERO]), [ONE, ZERO, ZERO, ZERO]]]);
for (let frontier = [...group.values()]; frontier.length;) {
  const next = [];
  for (const a of frontier) for (const g of gens) { const c = qmul(a, g); if (c && !group.has(K(c))) { group.set(K(c), c); next.push(c); } }
  frontier = next;
}
const G = [...group.values()];
const val = ([u, v]) => (u + v * S5) / 4;
const conj = ([u, v]) => [u, -v];
const dotq = (x, y) => x.reduce((acc, c, k) => add(acc, m(c, y[k])), [0, 0]);   // over 16
/** Q = 2(a + b) where Nrd = a + bφ; Nrd = (X + Y√5)/16 = (X − Y)/16 + (2Y/16)φ. */
const Bq = (x, y) => { const [X, Y] = dotq(x, y); return 2 * ((X - Y) / 16 + (2 * Y) / 16); };
// φ⁻¹ = (−1 + √5)/2 = [−2, 2] in quarters
const PHI_INV = [-2, 2];
const timesPhiInv = (q) => q.map((c) => div4(m(c, PHI_INV)));

/* ---------- page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.COMPASS_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.COMPASS_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const ended = (max) => until(page, (mx) => { const d = window.COMPASS_DEBUG.state; return !d.playing && d.t >= mx - 1e-6; }, max, 90000);

await page.click('#speedChips [data-speed="2.5"]');
check('the speed chips pick 2.5×', (await page.getAttribute('#speedChips [data-speed="2.5"]', 'aria-pressed')) === 'true');
let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the CUBE card in the compass scene at the start of the rail, not playing', s.preset === 'cube' && s.scene === 'compass' && s.compass.t === 0 && !s.playing);

/* ---------- 2I against the independent group ---------- */
const toQ = (q8) => [0, 1, 2, 3].map((k) => [2 * q8[2 * k] + q8[2 * k + 1], q8[2 * k + 1]]);   // (p + rφ)/2 → quarters in √5
const units = s.roots.filter((R) => !R.gold), golds = s.roots.filter((R) => R.gold);
const pageSet = new Set(units.map((R) => K(toQ(R.q))));
check('2I: closure of ⟨(1+i+j+k)/2, (φ+φ⁻¹i+j)/2⟩ has exactly 120 elements', G.length === 120, `${G.length}`);
check('2I: the page lists the same 120 elements', pageSet.size === 120 && G.every((q) => pageSet.has(K(q))));
check('2I: every element is a unit quaternion', G.every((q) => close(q.reduce((a, c) => a + val(c) ** 2, 0), 1, 1e-12)));
let closed = 0; for (const a of G) for (const b of G) { const c = qmul(a, b); if (c && group.has(K(c))) closed++; }
check('2I: closed under multiplication (14400 products, independent product)', closed === 14400 && s.facts.closed === 14400 && s.facts.products === 14400);
const hur = G.filter((q) => q.every(([u, v]) => v === 0 && u % 2 === 0)).length;
check('2I: 24 Hurwitz units (coordinates in ½ℤ)', hur === 24 && s.facts.hurwitz === 24);
const shells = {}; for (const q of G) { const w = val(q[0]).toFixed(9); shells[w] = (shells[w] || 0) + 1; }
const order = Object.keys(shells).sort((a, b) => b - a).map((w) => shells[w]);
check('2I: shells by real part hold 1, 12, 20, 12, 30, 12, 20, 12, 1', order.join(',') === '1,12,20,12,30,12,20,12,1', order.join(','));

/* ---------- E₈ ---------- */
const all = [...G, ...G.map(timesPhiInv)];
check('E₈: every element of 2I ∪ φ⁻¹·2I has Q = 2', all.every((q) => Bq(q, q) === 2));
// no other small icosians: scan the icosian ring near the origin, i.e. all sums q₁ + q₂ of two elements of 2I ∪ φ⁻¹2I ∪ {0}
const cand = new Map(); for (const q of all) cand.set(K(q), q);
for (const a of all) for (const b of all) { const c = a.map((x, k) => add(x, b[k])); if (Bq(c, c) === 2) cand.set(K(c), c); }
check('E₈: among sums of two such vectors, Q = 2 gives no vector outside the 240', cand.size === 240, `${cand.size}`);
const pageRoots = new Set(s.roots.map((R) => K(toQ(R.q))));
check('E₈: the page lists exactly these 240 vectors, 120 + 120', pageRoots.size === 240 && all.every((q) => pageRoots.has(K(q))) && units.length === 120 && golds.length === 120);
check('E₈: the page reads Q = 2 and Nrd 1 / 2 − φ', s.roots.every((R) => R.Q === 2) && units.every((R) => R.nrd[0] === 1 && R.nrd[1] === 0) && golds.every((R) => R.nrd[0] === 2 && R.nrd[1] === -1));
let integral = true, lo = 9, hi = -9, nbs = new Set();
for (const a of all) { let nb = 0; for (const b of all) { const v = Bq(a, b); if (!Number.isInteger(v)) integral = false; lo = Math.min(lo, v); hi = Math.max(hi, v); if (v === 1) nb++; } nbs.add(nb); }
check('E₈: B between any two of the 240 is an integer in −2…2', integral && lo === -2 && hi === 2 && s.facts.integral && s.facts.bRange.join() === '-2,2');
check('E₈: every root has exactly 56 neighbours with B = 1', nbs.size === 1 && nbs.has(56) && s.facts.neighbours === 56);
// a ℤ-basis of the ring by inserting vectors one by one into an echelon basis (gcd steps), coordinates (u, v) of each component
const vec = (q) => q.flatMap((c) => c);
function insert(basis, v) {
  v = v.slice();
  for (let c = 0; c < v.length; c++) {
    if (v[c] === 0) continue;
    const i = basis.findIndex((b) => b.lead === c);
    if (i < 0) { basis.push({ lead: c, v }); basis.sort((a, b) => a.lead - b.lead); return; }
    let b = basis[i].v;
    while (v[c] !== 0) { const f = Math.trunc(b[c] / v[c]); b = b.map((x, k) => x - f * v[k]); [b, v] = [v, b]; }
    basis[i].v = b;
  }
}
const basis = []; for (const q of G) insert(basis, vec(q));
const fromVec = (v) => [0, 1, 2, 3].map((k) => [v[2 * k], v[2 * k + 1]]);
function detBig(M) {   // exact determinant over ℚ with BigInt numerators and a common denominator per row
  const A = M.map((r) => r.map((x) => [BigInt(Math.round(x * 64)), 64n]));
  const n = A.length; let num = 1n, den = 1n;
  const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
  const red = ([p, q]) => { if (q < 0n) { p = -p; q = -q; } const g = gcd(p, q) || 1n; return [p / g, q / g]; };
  for (let k = 0; k < n; k++) {
    let piv = A.findIndex((r, i) => i >= k && r[k][0] !== 0n); if (piv < 0) return 0;
    if (piv !== k) { [A[k], A[piv]] = [A[piv], A[k]]; num = -num; }
    const [pp, pq] = A[k][k]; num *= pp; den *= pq;
    for (let i = k + 1; i < n; i++) {
      const [ap, aq] = A[i][k]; if (ap === 0n) continue;
      const f = red([ap * pq, aq * pp]);
      for (let j = k; j < n; j++) { const [xp, xq] = A[k][j], [yp, yq] = A[i][j]; A[i][j] = red([yp * xq * f[1] - f[0] * xp * yq, yq * xq * f[1]]); }
    }
  }
  const [p, q] = red([num, den]); return Number(p) / Number(q);
}
const Bv = basis.map((b) => fromVec(b.v));
const det8 = detBig(Bv.map((x) => Bv.map((y) => Bq(x, y))));
check('E₈: the ring has rank 8 and Gram determinant 1 (independent basis)', basis.length === 8 && det8 === 1 && s.facts.rank === 8 && s.facts.det === 1, `${basis.length} · ${det8}`);
const pureB = basis.filter((b) => b.lead >= 2).map((b) => fromVec(b.v));
const det6 = detBig(pureB.map((x) => pureB.map((y) => Bq(x, y))));
const pure = all.filter((q) => q[0][0] === 0 && q[0][1] === 0);
let pnb = new Set(); for (const a of pure) { let nb = 0; for (const b of pure) if (Bq(a, b) === 1) nb++; pnb.add(nb); }
check('Im 𝓘: rank 6, Gram determinant 4, 60 shortest vectors with 16 neighbours each (D₆), as the page reads', pureB.length === 6 && det6 === 4 && pure.length === 60 && pnb.size === 1 && pnb.has(16)
  && s.facts.pureRank === 6 && s.facts.pureDet === 4 && s.facts.pureRoots === 60 && s.facts.pureNeighbours === 16, `${pureB.length} · ${det6} · ${pure.length}`);

/* ---------- weighted coordinates ---------- */
const WP = Math.sqrt(2 * PHI / S5), WQ = Math.sqrt(2 / (PHI * S5));
let wErr = 0;
for (const R of s.roots) {
  const q = toQ(R.q), x = q.map(val), y = q.map((c) => val(conj(c)));
  wErr = Math.max(wErr, ...[1, 2, 3].map((k) => Math.abs(R.par[k - 1] - WP * x[k])), ...[1, 2, 3].map((k) => Math.abs(R.perp[k - 1] - WQ * y[k])),
    Math.abs(R.par2 + R.perp2 - 2), Math.abs(WP * WP * x.reduce((a, c) => a + c * c, 0) + WQ * WQ * y.reduce((a, c) => a + c * c, 0) - 2));
}
check('E∥ ⊕ E⊥: the weighted coordinates use the conjugate √5 ↦ −√5, and ‖∥‖² + ‖⊥‖² = 2 for all 240', wErr < 1e-12, `${wErr}`);

/* ---------- the cards of the bridge ---------- */
s = await pick('icosians');
check('ICOSIANS: the card plays the shells', await until(page, () => window.COMPASS_DEBUG.state.playing || window.COMPASS_DEBUG.state.t > 0));
check('ICOSIANS: it stops at the end of the first leg', await ended(1)); s = await state();
check('ICOSIANS: all 120 of 2I drawn, none of the golden copies', s.bridge.n === 120 && s.bridge.units === 120 && s.bridge.golden === 0);
check('ICOSIANS: the selected element reads ½ + ½i + ½j + ½k', s.roots[s.bridge.sel].text === '½ + ½i + ½j + ½k' && /½ \+ ½i/.test(await page.textContent('#ro')), s.roots[s.bridge.sel].text);
const W = Object.keys(shells).map(Number).sort((a, b) => b - a);
let cum = 0, cumOk = true;
for (let k = 0; k < W.length; k++) { cum += shells[W[k].toFixed(9)]; const t = (1 - W[k]) / 2; s = await seek(t + 1e-7); if (s.bridge.units !== cum) cumOk = false; }
check('SHELLS: as w falls the drawn count grows 1, 13, 33, 45, 75, 87, 107, 119, 120', cumOk);
s = await pick('e8');
check('E8: the card plays', await until(page, () => window.COMPASS_DEBUG.state.playing || window.COMPASS_DEBUG.state.t > 1));
check('E8: it stops at 2', await ended(2)); s = await state();
check('E8: 240 roots drawn, 120 + 120', s.bridge.n === 240 && s.bridge.golden === 120);
check('E8: the selected golden copy reads Nrd 2 − φ and Q 2', /2 − φ · 2/.test(await page.textContent('#ro')) && s.roots[s.bridge.sel].gold);
s = await pick('fold');
check('FOLD: the card plays through the last two legs', await until(page, () => window.COMPASS_DEBUG.state.playing || window.COMPASS_DEBUG.state.t > 2));
check('FOLD: it stops at 4', await ended(4)); s = await state();
const vis = s.bridge.visible;
check('FOLD: exactly the 60 pure roots are left', vis.length === 60 && vis.every((i) => s.roots[i].q[0] === 0 && s.roots[i].q[1] === 0));
let swap = true;
for (const i of vis) {
  const R = s.roots[i], q = toQ(R.q), y = q.map((c) => val(conj(c))), p = s.bridge.pos[i];
  if (![0, 1, 2].every((k) => close(p[k], WQ * y[k + 1], 1e-12))) swap = false;
  const rPar = Math.hypot(...R.par), rNow = Math.hypot(...p);
  if (R.gold ? !(rNow > rPar + 0.4) : !(rNow < rPar - 0.4)) swap = false;
}
check('FOLD: at 4 every root sits at its E⊥ place; the units moved in, the golden copies moved out', swap);
s = await seek(3.5);
let mid = true;
for (const i of s.bridge.visible) { const R = s.roots[i], a = Math.PI / 4, p = s.bridge.pos[i]; if (![0, 1, 2].every((k) => close(p[k], Math.cos(a) * R.par[k] + Math.sin(a) * R.perp[k], 1e-12))) mid = false; }
check('FOLD: half way the projection is (E∥ + E⊥)/√2 and keeps 60 roots', mid && s.bridge.visible.length === 60);
s = await seek(2.5);
check('LEG 3: half way through the third leg, exactly the roots with |w|/|q| ≤ ½ remain',
  s.bridge.n === s.roots.filter((R) => { const n = Math.hypot(...toQ(R.q).map(val)); return Math.abs(val(toQ(R.q)[0]) / n) <= 0.5 + 1e-9; }).length);

/* ---------- controls of the bridge ---------- */
for (const [name, text] of [['one', '1'], ['i', 'i'], ['hurwitz', '½ + ½i + ½j + ½k'], ['golden', '½i + ½φ⁻¹j + ½φk'], ['shrunk', '½φ⁻¹i + ½φ⁻²j + ½k']]) {
  await page.click(`#pickChips [data-pick="${name}"]`); s = await state();
  check(`the element chip ${name} selects ${text}`, s.roots[s.bridge.sel].text === text && s.preset === null, s.roots[s.bridge.sel].text);
}
s = await seek(2);
const target = s.roots.findIndex((R) => R.text === '−i');
const xy = await page.evaluate((i) => window.COMPASS_DEBUG.screen(i), target);
await page.mouse.click(xy[0], xy[1]); s = await state();
const hitXY = await page.evaluate((i) => window.COMPASS_DEBUG.screen(i), s.bridge.sel);
check('clicking a dot on the bridge selects the root drawn there', Math.hypot(hitXY[0] - xy[0], hitXY[1] - xy[1]) < 1, `${s.roots[s.bridge.sel].text}`);

/* ---------- compass ---------- */
// the coding of §32.4: L = first end, H = second end, M = middle third
const SPEC = { strings: 'HLM', lqg: 'HHM', ads: 'MML', twistor: 'MML', ncg: 'LML', wolfram: 'MHM', langlands: 'MML', entropic: 'MLH' };
const CAMP = { strings: 1, lqg: 1, ads: 2, twistor: 2, ncg: 3, wolfram: 3, langlands: 4, entropic: 4 };
const bandOf = (v) => (v < 1 / 3 ? 'L' : v > 2 / 3 ? 'H' : 'M');
s = await pick('cube');
const progs = s.compass.programmes;
check('CUBE: eight programmes, each in the bands the §32.4 table names, in four camps of two', progs.length === 8 && progs.every((p) => p.c.map(bandOf).join('') === SPEC[p.id] && p.camp === CAMP[p.id]), JSON.stringify(progs.map((p) => p.id + p.c.map(bandOf).join(''))));
const key3 = (p) => p.c.map((x) => x.toFixed(3)).join();
check('CUBE: no two dots on the same place', new Set(progs.map(key3)).size === 8);
check('CUBE: the book is hidden and no camp is lit', !s.compass.book && s.compass.camp === 0);
s = await pick('camps');
check('CAMPS: the card plays the camps', await until(page, () => window.COMPASS_DEBUG.state.playing || window.COMPASS_DEBUG.state.t > 0));
check('CAMPS: it stops at the fourth camp', await ended(4)); s = await state();
check('CAMPS: the fourth camp is lit and its first programme selected', s.compass.camp === 4 && s.compass.prog === 'langlands');
s = await seek(1);
check('CAMPS: at 1 the first camp (string theory ↔ LQG) is read, and they differ only along η', s.compass.camp === 1 && s.compass.prog === 'strings' && /世界面/.test(s.sub)
  && bandOf(progs[0].c[0]) === bandOf(progs[1].c[0]) && bandOf(progs[0].c[2]) === bandOf(progs[1].c[2]) && bandOf(progs[0].c[1]) !== bandOf(progs[1].c[1]));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps to the next camp', s.compass.camp === 2 && s.compass.prog === 'ads');
s = await pick('crystal');
check('CRYSTAL: the book is drawn and selected, in the middle of θ, at the polytope end of η and the inside end of λ', s.compass.book && s.compass.prog === 'book' && s.compass.bookAt.map(bandOf).join('') === 'MHH');
await page.click('#bookChips [data-book="off"]'); s = await state();
check('the book chips hide the book again and leave the card', !s.compass.book && s.preset === null && s.compass.prog === null);
await page.click('#progChips [data-prog="entropic"]'); s = await state();
check('a programme chip selects that programme; the key reads its bands', s.compass.prog === 'entropic' && /中段 · 光滑 · 场内/.test(s.key), s.key);
const dxy = await page.evaluate(() => window.COMPASS_DEBUG.screen('ncg'));
await page.mouse.click(dxy[0], dxy[1]); s = await state();
check('clicking a dot in the cube selects that programme', s.compass.prog === 'ncg' && (await page.getAttribute('#progChips [data-prog="ncg"]', 'aria-pressed')) === 'true');
const cam0 = await page.evaluate(() => window.COMPASS_DEBUG.camera());
const box = await page.$eval('#stage', (e) => { const r = e.getBoundingClientRect(); return [r.left + r.width * 0.9, r.top + r.height * 0.85]; });
await page.mouse.move(box[0], box[1]); await page.mouse.down(); await page.mouse.move(box[0] - 60, box[1] - 20, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.COMPASS_DEBUG.camera());
check('dragging an empty part of the stage turns the view', Math.abs(cam1.yaw - cam0.yaw) > 0.1);

/* ---------- scenes, rail, keys, language ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); s = await state(); check('key 2 opens the bridge', s.scene === 'bridge' && s.max === 4);
await page.keyboard.press('1'); s = await state(); check('key 1 opens the compass', s.scene === 'compass');
await page.click('#sceneChips [data-scene="bridge"]'); s = await state(); check('the scene chips switch scenes', s.scene === 'bridge');
await page.click('#rew'); s = await state(); check('⏮ goes back to the start', s.t === 0 && s.bridge.n === 1);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.COMPASS_DEBUG.state.playing && window.COMPASS_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('[data-lang-set="en"]'); s = await state();
check('English: the hud speaks English', /Bridge/.test(s.hud));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
