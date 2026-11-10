#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/sphere-escape (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/sphere-escape.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// Reads page state through the read-only window.SE_DEBUG probe and the pure functions of window.SE_MATH, and checks
// them against an independent implementation written here: rows as bit masks (Hamming distance by popcount of XOR),
// primes by trial division, Euclid's numbers in BigInt, Euler products as exact BigInt fractions, x* by bisection.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'sphere-escape';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const pageSource = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'index.html'), 'utf8');
const CJK = /[　-〿㐀-鿿＀-￯]/;
const EXPECTED_GIDS = [
  'D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement',
  'D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize',
  'D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique'
];

/* ---------- independent implementation ---------- */
// The seed lists are defined by the mulberry32 generator (a published 32-bit PRNG): bits drawn row by row on 8 × 8,
// the list for N is the top-left N × N block. Written here from the reference description.
function prng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), a | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}
function seedList(seed, n) {
  const g = prng(seed), all = [];
  for (let i = 0; i < 64; i++) all.push(g() < 0.5 ? 0 : 1);
  return Array.from({ length: n }, (_, r) => all.slice(8 * r, 8 * r + n));
}
/** Row → bit mask (bit c ↔ column c). */
const mask = (row) => row.reduce((m, x, c) => m | (x << c), 0);
const popcount = (x) => { let k = 0; while (x) { x &= x - 1; k++; } return k; };
/** Flipped diagonal as a mask: bit r is the complement of bit r of row r. */
const diagMask = (f) => f.reduce((m, row, r) => m | ((((mask(row) >> r) & 1) ^ 1) << r), 0);
function cantorModel(f) {
  const n = f.length, dm = diagMask(f), rows = f.map(mask);
  const d = Array.from({ length: n }, (_, c) => (dm >> c) & 1);
  const ham = rows.map((m) => popcount(m ^ dm));
  const trace = f.reduce((s, row, r) => s + row[r], 0);
  return { d, ham, minHam: Math.min(...ham), listed: rows.includes(dm), trace, weight: popcount(dm), signs: f.map((row, r) => (row[r] ? -1 : 1)) };
}
function isPrime(n) { if (n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; }
const PRIMES = []; for (let n = 2; PRIMES.length < 400; n++) if (isPrime(n)) PRIMES.push(n);
function euclid(k) {
  const Q = PRIMES.slice(0, k).reduce((a, p) => a * BigInt(p), 1n) + 1n;
  let q = 2n; while (Q % q !== 0n) q++;
  return { Q: Number(Q), q: Number(q) };
}
/** ∏ p²/(p² − 1) over the first k primes, as an exact fraction, then to a double. */
function eulerExact(k) {
  let num = 1n, den = 1n;
  for (const p of PRIMES.slice(0, k)) { const P = BigInt(p) * BigInt(p); num *= P; den *= P - 1n; }
  const scale = 10n ** 30n;
  return Number((num * scale) / den) / 1e30;
}
function bisectStar() { let a = 0, b = 1; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; }
const XSTAR = bisectStar();
// Math.cos in the browser and in Node may differ in the last place, so values through cos are compared to a few ulps.
const near = (a, b, tol = 4e-16) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const eq = (x, y) => JSON.stringify(x) === JSON.stringify(y);

/* ---------- open ---------- */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
// record every canvas string, to check that the stage and the cover carry no prose
await page.addInitScript(() => {
  window.__texts = [];
  const orig = CanvasRenderingContext2D.prototype.fillText;
  CanvasRenderingContext2D.prototype.fillText = function (t, ...rest) { window.__texts.push([this.canvas.id, String(t)]); return orig.call(this, t, ...rest); };
});
const D = (fn, arg) => page.evaluate(fn, arg);
const settle = async () => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(() => !SE_DEBUG.pending(), null, { timeout: 30000 });
};
const text = (sel) => D((s) => document.querySelector(s).textContent, sel);
const open = async (query) => {
  await T.goto(BOOK, ID, query);
  await page.waitForFunction(() => window.SE_DEBUG && SE_DEBUG.frames() > 0, null, { timeout: 30000 });
};
const state = () => D(() => SE_DEBUG.state());
await open('?lang=zh');
let st = await state();
check('opens on N = 6, seed 11, x₀ = 1.00 rad, diagonal mode, finished ledger', st.N === 6 && st.seed === 11 && st.x0 === 100 && st.mode === 'diagonal' && st.pass === 6 && st.passes === 6 && !st.edited, JSON.stringify(st));
check('page carries its id and the runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');
const zhCount = (pageSource.match(/class="zh"/g) || []).length, enCount = (pageSource.match(/class="en"/g) || []).length;
check('index.html has as many .zh as .en fragments', zhCount > 20 && zhCount === enCount, `${zhCount} vs ${enCount}`);
{
  const css = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'style.css'), 'utf8');
  const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const blocks = (s) => { const out = []; let depth = 0, start = 0; for (let i = 0; i < s.length; i++) { if (s[i] === '{') depth++; else if (s[i] === '}') { depth--; if (depth === 0) { out.push(s.slice(start, i + 1).trim()); start = i + 1; } } } return out; };
  const gold = blocks(strip(fs.readFileSync(path.join(ROOT, 'books', 'example-monograph', 'viz', 'golden-carry', 'style.css'), 'utf8'))), mine = strip(css);
  const missing = gold.filter((b) => !mine.includes(b));
  check(`style.css keeps all ${gold.length} rule blocks of golden-carry verbatim (grid, media queries, embed, thumb, ledger, tape, map)`, gold.length > 60 && missing.length === 0, missing.slice(0, 2).join(' ‖ '));
  check('style.css: the stage is 210px tall (min 190px, flex 0 0 210px) inside the ledger panel', /\.stage \{[^}]*height: 210px; min-height: 190px; flex: 0 0 210px;/.test(mine));
}
check('SE_DEBUG and SE_MATH are frozen; TRV_THUMB is a function', await D(() => Object.isFrozen(SE_DEBUG) && Object.isFrozen(SE_MATH) && typeof window.TRV_THUMB === 'function'));
check('SE_MATH exports the pure functions', await D(() => ['cantorDiagonal', 'verifyCantorEscape', 'dottieTrajectory', 'verifyDottiePythagorean', 'sievePrimes', 'eulerProductPartial', 'euclidEscape', 'matrixFromSeed', 'firstPrimes', 'hamming', 'dottieStar'].every((k) => typeof SE_MATH[k] === 'function')));
const snap = await D(() => { const i = SE_DEBUG.info(); i.f[0][0] = 9; i.d.push(7); return SE_DEBUG.info(); });
check('mutating a probe snapshot does not touch page state', snap.f[0][0] !== 9 && snap.d.length === 6);

/* ---------- 3-column layout and DOM aligned with golden-carry ---------- */
check('1440px: three columns — deck (#inputs, #readouts) | center (#ledgerPanel, footer#rail) | side (#heatPanel, #evidence)', await D(() => {
  const r = (s) => document.querySelector(s).getBoundingClientRect();
  return document.querySelector('aside.col.deck #inputs + #readouts') && document.querySelector('main.center > #ledgerPanel + footer#rail')
    && document.querySelector('aside.col.side > #heatPanel[data-thumb] + #evidence')
    && r('#inputs').right < r('#ledgerPanel').left && r('#ledgerPanel').right < r('#heatPanel').left && Math.abs(r('#inputs').top - r('#heatPanel').top) < 2;
}));
check('the grid columns are minmax(270px, 310px) | 1fr | minmax(320px, 400px)', await D(() => { const c = getComputedStyle(document.getElementById('app')).gridTemplateColumns.split(' ').map(parseFloat); return c.length === 3 && c[0] >= 270 && c[0] <= 310 && c[2] >= 320 && c[2] <= 400; }));
check('the ledger panel holds .head, .rules (r0 r1 rj ra), .stage, .sheetwrap > .digits#ledger, .tape-row and the toast, in that order', await D(() => {
  const kids = [...document.getElementById('ledgerPanel').children].map((e) => e.className || e.id);
  return eq(kids, ['head', 'rules', 'stage', 'sheetwrap', 'tape-row', 'toast']) && ['r0', 'r1', 'rj', 'ra'].every((c) => document.querySelector(`.rules .rule.${c}`));
  function eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
}));
check('the stage is 210px tall with scan lines, four brackets, HUD and the three mode chips', await D(() => {
  const s = document.getElementById('escapeStage');
  return Math.round(s.getBoundingClientRect().height) === 210 && s.querySelector('canvas#escapeCanvas') && s.querySelector('.scan') && s.querySelectorAll('.bracket.tl, .bracket.tr, .bracket.bl, .bracket.br').length === 4
    && s.querySelector('.hud-tl #hudBig') && s.querySelector('.hud-tl #hudSub') && [...s.querySelectorAll('.hud-tr.chips#modeChips [data-mode]')].map((b) => b.dataset.mode).join() === 'diagonal,dottie,prime';
}));
check('readouts: six half-width items, one hero (.wide.deficit) and two verification rows, then #roNote', await D(() => {
  const items = [...document.querySelectorAll('#readouts dl.ro > div')];
  return items.length === 9 && items.slice(0, 6).every((d) => !d.classList.contains('wide')) && items[6].matches('.wide.deficit') && items[6].querySelector('b#roHero') && items[6].querySelector('#roHeroSub.sub')
    && items[7].matches('.wide') && items[8].matches('.wide') && document.querySelector('#readouts > p.note#roNote');
}));
check('rail: ⏮ ◀ ▶ ▶▶ ⏭, the clock and the key help', await D(() => ['first', 'prev', 'play', 'next', 'last'].every((id) => document.querySelector(`#rail .transport #${id}`)) && document.querySelector('#rail .clock #passLabel.tau') && document.querySelector('#rail .clock input#pass') && document.querySelector('#rail .keys')));

/* ---------- the seed lists and the diagonal escape ---------- */
const lists = await D(() => Array.from({ length: 63 }, (_, k) => SE_MATH.matrixFromSeed(8, k + 1)));
check('matrixFromSeed agrees with the independent generator for every seed 1 … 63', lists.every((m, k) => eq(m, seedList(k + 1, 8))));
let sweepOk = true, sweepBad = '';
for (let seed = 1; seed <= 63 && sweepOk; seed++) for (let n = 3; n <= 8; n++) {
  const f = seedList(seed, n), mine = cantorModel(f);
  const page = await D(([f2]) => { const v = SE_MATH.verifyCantorEscape(f2); return { d: SE_MATH.cantorDiagonal(f2), ...v }; }, [f]);
  if (!(eq(page.d, mine.d) && eq(page.ham, mine.ham) && page.minHam === mine.minHam && page.ok && !page.listed && !mine.listed && mine.minHam >= 1)) { sweepOk = false; sweepBad = `seed ${seed} N ${n}`; break; }
}
check('378 lists (seeds 1 … 63, N = 3 … 8): d, Hamming distances and the escape agree; d is never a row', sweepOk, sweepBad);
const exhaustive = await D(() => {
  let all = 0, ok = 0;
  for (const n of [3, 4]) for (let m = 0; m < 2 ** (n * n); m++) {
    const f = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (__, c) => (m >> (r * n + c)) & 1));
    all++; if (SE_MATH.verifyCantorEscape(f).ok) ok++;
  }
  return [all, ok];
});
check('every 3 × 3 and 4 × 4 list (512 + 65536): the flipped diagonal is off the list', exhaustive[0] === 512 + 65536 && exhaustive[1] === exhaustive[0], exhaustive.join('/'));
let pageOk = true, pageBad = '';
let seedR = 5; const rnd = () => { seedR = (seedR * 1103515245 + 12345) % 2147483648; return seedR; };
for (let i = 0; i < 40; i++) {
  const seed = 1 + (rnd() % 63), N = 3 + (rnd() % 6), x0 = rnd() % 315;
  await D((o) => SE_DEBUG.set(o), { seed, N, x0 });
  const x = await D(() => SE_DEBUG.info()), f = seedList(seed, N), mine = cantorModel(f);
  const ok = eq(x.f, f) && eq(x.d, mine.d) && eq(x.ham, mine.ham) && x.ok && x.trace === mine.trace && x.weight === mine.weight
    && eq(x.signs, mine.signs) && x.total === mine.weight - mine.trace && x.total === N - 2 * mine.trace && x.witness.every(Boolean);
  if (!ok) { pageOk = false; pageBad = JSON.stringify({ seed, N }); break; }
}
check('40 page states: list, d, distances, signs and |d| − tr f = N − 2·tr f match the independent model', pageOk, pageBad);
await D(() => SE_DEBUG.set({ seed: 11, N: 6, x0: 100 })); await settle();
check('readouts show diag(f), d, the minimum distance and the escape for seed 11', (await text('#roTrace')).startsWith('100110') && (await text('#roD')).startsWith('011001') && (await text('#roHam')).startsWith('1')
  && /6 \/ 6/.test(await text('#roCantor')) && (await text('#pillEscape')).includes('✓') && (await D(() => document.getElementById('roHero').className)) === 'vpos');

/* ---------- Dottie, primes and Euler products ---------- */
check('x* agrees with bisection and 0.73908513321516; sin x* ≈ 0.6736120292', await D(() => [SE_MATH.XSTAR, SE_DEBUG.info().sinStar]).then(([xs, s]) => near(xs, XSTAR, 2e-16) && Math.abs(xs - 0.73908513321516) < 1e-13 && Math.abs(s - 0.6736120292) < 1e-9));
let dottieOk = true, dottieBad = '';
for (const x0 of [0, 1, 50, 100, 157, 222, 314]) {
  const tr = await D((a) => SE_MATH.dottieTrajectory(a / 100, 8), x0);
  let x = x0 / 100;
  for (let k = 0; k <= 8; k++) {
    if (!near(tr.xs[k], x, 1e-15) || !(tr.res[k] > 0)) { dottieOk = false; dottieBad = `x₀ ${x0} k ${k}`; break; }
    x = Math.cos(x);
  }
  if (Math.abs(tr.xs[8] - XSTAR) >= Math.abs(tr.xs[2] - XSTAR)) { dottieOk = false; dottieBad = `x₀ ${x0}: no approach to x*`; }
}
check('Dottie trajectories match xₖ₊₁ = cos xₖ; every residual |cos xₖ − xₖ| > 0; the iterates approach x*', dottieOk, dottieBad);
check('sin²x + cos²x = 1 within four ulps at 2000 points of [0, π]', await D(() => SE_MATH.verifyDottiePythagorean(Array.from({ length: 2000 }, (_, i) => (Math.PI * i) / 1999)).ok));
check('sievePrimes(2000) equals trial division', eq(await D(() => SE_MATH.sievePrimes(2000)), PRIMES.filter((p) => p <= 2000)) && eq(await D(() => SE_MATH.firstPrimes(8)), [2, 3, 5, 7, 11, 13, 17, 19]));
const esc = await D(() => Array.from({ length: 8 }, (_, k) => SE_MATH.euclidEscape(SE_MATH.firstPrimes(k + 1))));
check('Euclid: Q = p₁⋯pₖ + 1 and its least prime factor agree with BigInt arithmetic; q is never listed', esc.every((e, k) => { const m = euclid(k + 1); return e.Q === m.Q && e.q === m.q && e.outside && !PRIMES.slice(0, k + 1).includes(m.q) && e.Q === e.q * e.cofactor; })
  && esc[5].q === 59 && esc[6].q === 19 && esc[7].q === 347, JSON.stringify(esc.map((e) => [e.Q, e.q])));
const eul = await D(() => Array.from({ length: 8 }, (_, k) => SE_MATH.eulerProductPartial(SE_MATH.firstPrimes(k + 1), 2)));
const zeta2 = Math.PI ** 2 / 6;
check('partial Euler products ∏ (1 − p⁻²)⁻¹ match exact fractions, increase, and stay below π²/6', eul.every((v, k) => Math.abs(v - eulerExact(k + 1)) < 1e-14 && v < zeta2 && (k === 0 || v > eul[k - 1])) && Math.abs(eul[0] - 4 / 3) < 1e-15);

/* ---------- controls ---------- */
await page.fill('#nNum', '8'); await page.press('#nNum', 'Enter'); await settle();
await page.locator('#seed').fill('24'); await settle();
await page.locator('#x0').fill('0'); await settle();
st = await state();
check('number box and sliders set N = 8, S = 24, x₀ = 0', st.N === 8 && st.seed === 24 && st.x0 === 0 && (await D(() => document.getElementById('n').value)) === '8' && (await D(() => document.getElementById('seedNum').value)) === '24');
await page.click('#nDec'); await page.click('#seedInc'); await page.click('#x0Inc'); await settle();
st = await state();
check('steppers move N down, S up and x₀ up by one', st.N === 7 && st.seed === 25 && st.x0 === 1);
await page.fill('#seedNum', '500'); await page.press('#seedNum', 'Enter'); await settle();
// Settle before touching the next box: render() rewrites every number box from state on the next frame, so a frame
// that lands after #nNum is filled and before Enter would wipe the typed value and the second commit would not happen.
await page.fill('#nNum', '1'); await page.press('#nNum', 'Enter'); await settle();
st = await state();
check('out-of-range input is clamped (S = 63, N = 3) and the steppers disable at the limits', st.seed === 63 && st.N === 3 && (await D(() => document.getElementById('seedInc').disabled && document.getElementById('nDec').disabled)));
for (const [p, dExpect] of [['identity', '00000000'], ['alternating', '11111111'], ['dense', '00000000']]) {
  await page.click('#nChips [data-n="8"]'); await page.click(`#presets [data-preset="${p}"]`); await settle();
  const x = await D(() => SE_DEBUG.info());
  check(`preset ${p}: d = ${dExpect}, d is off the list, and the chip is the only pressed preset`, x.d.join('') === dExpect && x.ok
    && (await D((q) => [...document.querySelectorAll('#presets [data-preset]')].every((b) => b.getAttribute('aria-pressed') === String(b.dataset.preset === q)), p)));
}
await page.click('#presets [data-preset="dottie0"]'); await settle();
st = await state();
check('preset Dottie x₀ = 0 sets x₀ = 0 and the Dottie stage', st.x0 === 0 && st.mode === 'dottie' && (await D(() => document.querySelector('#presets [data-preset="dottie0"]').getAttribute('aria-pressed'))) === 'true'
  && (await D(() => document.querySelector('#modeChips [data-mode="dottie"]').getAttribute('aria-pressed'))) === 'true');
await page.click('#presets [data-preset="dottie1"]'); await settle();
check('preset Dottie x₀ = 1 sets x₀ = 1.00 rad', (await state()).x0 === 100);
await D(() => SE_DEBUG.set({ seed: 11, N: 6 })); await settle();
const before = await D(() => SE_DEBUG.info());
await page.click('#swap'); await settle();
const after = await D(() => SE_DEBUG.info());
check('swap transposes the list: rows become columns, the diagonal and d stay, d is still off the list', eq(after.f, before.f.map((row, r) => row.map((_, c) => before.f[c][r]))) && eq(after.d, before.d) && after.ok && (await state()).edited);
await page.click('#random'); await settle();
st = await state();
check('random picks another seed in 1 … 63', st.seed >= 1 && st.seed <= 63 && st.seed !== 11 && !st.edited);
await page.click('#reset'); await settle();
st = await state();
check('reset restores N = 6, S = 11, x₀ = 1.00, the diagonal stage and the finished ledger', st.N === 6 && st.seed === 11 && st.x0 === 100 && st.mode === 'diagonal' && st.pass === 6 && !st.edited);
for (const n of [4, 6, 8]) {
  await page.click(`#nChips [data-n="${n}"]`); await settle();
  check(`N chip ${n}: pressed, ${n} ledger rows, matrix range ${n} × ${n}`, (await state()).N === n && (await D(() => document.querySelector('#nChips [aria-pressed="true"]').dataset.n)) === String(n)
    && (await D(() => document.querySelectorAll('#ledger .drow.pass').length)) === n && (await text('#heatRange')) === `${n} × ${n}`);
}
await page.click('#nChips [data-n="6"]'); await settle();
for (const m of ['dottie', 'prime', 'diagonal']) {
  await page.click(`#modeChips [data-mode="${m}"]`); await settle();
  const lit = await D(() => { const c = document.getElementById('escapeCanvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 200) n++; return n; });
  check(`stage mode ${m}: pressed and drawn`, (await state()).mode === m && (await D((q) => document.querySelector(`#modeChips [data-mode="${q}"]`).getAttribute('aria-pressed'), m)) === 'true' && lit > 300, String(lit));
}
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('m'); await settle();
check('M cycles the stage mode', (await state()).mode === 'dottie');
await page.click('#modeChips [data-mode="diagonal"]'); await settle();

/* ---------- ledger, tape and transport ---------- */
check('ledger rows: header, diagonal input, step 0, N steps and the escape row d', await D(() => {
  const rows = [...document.querySelectorAll('#ledger .drow')];
  return rows[0].matches('.hdr') && rows[1].matches('.input') && rows[2].matches('.sum[data-pass="0"]') && rows.slice(3, 9).every((r, i) => r.matches('.pass') && r.dataset.pass === String(i + 1)) && rows[9].matches('.final') && rows.length === 10;
}));
check('each step row marks its diagonal cell and carries a sign, the code ¬f(k,k) and a name', await D(() => [...document.querySelectorAll('#ledger .drow.pass')].every((r, i) => {
  const t = r.querySelectorAll('.cells span.touch'); const k = i + 1;
  return t.length === 1 && [...r.querySelectorAll('.cells span')].indexOf(t[0]) === i && r.querySelector('.what .sgn.pos, .what .sgn.neg') && r.querySelector('.what code').textContent.startsWith(`¬f(${k},${k})`) && r.querySelector('.what .name');
})));
await page.click('#first'); await settle();
check('⏮ returns to step 0: N rows dimmed, the step-0 row current, d hidden', (await state()).pass === 0 && (await D(() => document.querySelectorAll('#ledger .drow.future').length)) === 6
  && (await D(() => document.querySelector('#ledger .drow.now').dataset.pass)) === '0' && (await D(() => [...document.querySelectorAll('#ledger .drow.final .cells span')].every((s) => s.textContent === '·'))));
await page.click('#next'); await page.click('#next'); await settle();
check('▶▶ steps one diagonal entry at a time, marks the row and the tape square, and reveals d(1), d(2)', (await state()).pass === 2 && (await D(() => document.querySelector('#ledger .drow.now').dataset.pass)) === '2'
  && (await D(() => document.querySelector('#tape i.now').dataset.pass)) === '2' && (await D(() => [...document.querySelectorAll('#ledger .drow.final .cells span')].map((s) => s.textContent).join(''))) === '01····');
await page.click('#prev'); await settle();
check('◀ steps back', (await state()).pass === 1);
await page.click('#last'); await settle();
check('⏭ jumps to the last step; the escape row is current and fully revealed', (await state()).pass === 6 && (await D(() => document.querySelector('#ledger .drow.final').classList.contains('now'))) && (await D(() => [...document.querySelectorAll('#ledger .drow.final .cells span')].map((s) => s.textContent).join(''))) === '011001');
check('the sign tape sums to |d| − tr f', /总计 0 = \|d\| − tr f/.test(await text('#tapeSum')) && (await D(() => document.querySelectorAll('#tape i.pos').length)) === 3 && (await D(() => document.querySelectorAll('#tape i.neg').length)) === 3);
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('ArrowLeft'); await settle();
check('← steps back from the keyboard', (await state()).pass === 5);
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); await settle();
check('Home and → work from the keyboard', (await state()).pass === 1);
await page.click('#ledger .drow[data-pass="4"]'); await settle();
check('clicking a ledger row selects that step', (await state()).pass === 4);
await page.click('#tape i[data-pass="2"]'); await settle();
check('clicking a tape square selects that step', (await state()).pass === 2);
await page.click('#first'); await page.click('#play'); await settle();
check('▶ plays the steps', (await state()).playing === true);
await page.waitForFunction(() => !SE_DEBUG.state().playing, null, { timeout: 15000 }).catch(() => {});
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 5000 }).catch(() => {});
check('playback stops at the last step and reports the escape', (await state()).pass === 6 && /对角逃逸完成：d 与全部 6 行都不同，带符号翻转计数 0 = \|d\| − tr f/.test(await text('#toast')));

/* ---------- the diagonal matrix ---------- */
let pt = await D(() => SE_DEBUG.cellPoint(2, 3));
const m0 = await D(() => SE_DEBUG.master());
await page.mouse.click(pt.x, pt.y); await settle();
let m1 = await D(() => SE_DEBUG.master());
check('clicking an off-diagonal cell flips f(2, 3), selects step 2 and leaves d alone', m1[1][2] === 1 - m0[1][2] && (await state()).pass === 2 && (await state()).edited && eq((await D(() => SE_DEBUG.info())).d, [0, 1, 1, 0, 0, 1]));
pt = await D(() => SE_DEBUG.cellPoint(3, 3));
await page.mouse.click(pt.x, pt.y); await settle();
let info = await D(() => SE_DEBUG.info());
check('clicking a diagonal cell flips f(3, 3) and d(3) together; d stays off the list', info.d[2] === 1 - info.f[2][2] && info.d[2] === 0 && info.ok && (await state()).pass === 3);
pt = await D(() => SE_DEBUG.cellPoint('d', 5));
const m2 = await D(() => SE_DEBUG.master());
await page.mouse.click(pt.x, pt.y); await settle();
check('clicking the escape row selects that step without changing the list', (await state()).pass === 5 && eq(await D(() => SE_DEBUG.master()), m2));
await page.mouse.move(pt.x, pt.y); await settle();
check('hovering the escape row describes d(c) = ¬f(c, c)', /d\(5\) = ¬f\(5, 5\)/.test(await text('#heatHover')));
const lit = await D(() => { const c = document.getElementById('heat'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 200) n++; return n; });
check('the matrix is drawn', lit > 3000, String(lit));
check('the counts say d differs from all rows', /d 与全部 6 行都不同/.test(await text('#heatCounts')) && (await text('#heatCounts')).includes('✓'));
await page.click('#reset'); await settle();
const stageTexts = await D(() => window.__texts.filter(([id]) => id === 'escapeCanvas').map(([, t]) => t));
check('the stage canvas draws symbols and numbers only (no prose, no Chinese)', stageTexts.length > 10 && stageTexts.every((t) => !CJK.test(t) && !/[A-Za-z]{2,}/.test(t)), [...new Set(stageTexts)].slice(0, 12).join(' | '));

/* ---------- Lean links at the pinned commit; evidence tiers; drawer ---------- */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file and line of trureturing.lock.json', links.length >= 10 && links.every(([gid, href]) => {
  const d = lock.declarations[gid]; return d && d.kind === 'theorem' && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 2)));
check('the page cites exactly the five frozen theorems', eq([...new Set(links.map(([g]) => g))].sort(), [...EXPECTED_GIDS].sort()), links.map(([g]) => g).join(', '));
const paths = await D(() => [...document.querySelectorAll('a[data-trureturing-path]')].map((a) => [a.dataset.trureturingPath, a.href]));
check('trureturing file links are pinned to the locked commit', paths.length >= 4 && paths.every(([p, href]) => href === `https://github.com/${lock.repo}/blob/${lock.commit}/${p}`));
const tiers = await D(() => {
  const boxes = [...document.querySelectorAll('#evidence .lean')];
  const green = boxes.filter((b) => b.className === 'lean');
  return { green: green.length, greenLinked: green.every((b) => b.querySelectorAll('a[data-lean-gid]').length === 1), others: boxes.filter((b) => b.className !== 'lean').map((b) => b.className), othersUnlinked: boxes.filter((b) => b.className !== 'lean').every((b) => !b.querySelector('a[data-lean-gid]')), labels: boxes.map((b) => b.querySelector('.ok').textContent) };
});
check('evidence tiers: five green LEAN ✓ boxes with one theorem link each; argued, model, open and numeric boxes carry no Lean link', tiers.green === 5 && tiers.greenLinked && tiers.othersUnlinked
  && eq(tiers.others, ['lean argued', 'lean model', 'lean open', 'lean num']) && tiers.labels.filter((l) => l === 'LEAN ✓').length === 5, JSON.stringify(tiers));
check('MODEL badge is amber and ARGUED badge is violet in computed styles', await D(() => {
  const rgb = (v) => { const c = document.createElement('i'); c.style.color = getComputedStyle(document.documentElement).getPropertyValue(v); document.body.append(c); const o = getComputedStyle(c).color; c.remove(); return o; };
  return getComputedStyle(document.querySelector('#evidence .lean.model .ok')).color === rgb('--tr-amber')
    && getComputedStyle(document.querySelector('#evidence .lean.argued .ok')).color === rgb('--tr-violet');
}));
check('only standard evidence classes are used', !/lean-badge|\.tier|lean interp|class="lean [a-z]*interp/.test(pageSource));
check('literature results are labelled as not formalized in this book', /文献结果，未在本书形式化/.test(await text('#litBox .zh')) && /Literature results, not formalized in this book/.test(await text('#litBox .en')));
check('the golden box says the theorem asserts uniqueness, not convergence', /不断言迭代收敛/.test(pageSource) && /not convergence of the iteration/.test(pageSource));
await page.click('#infoBtn');
check('theory drawer opens', (await D(() => document.getElementById('drawer').hidden)) === false);
check('the drawer says the page is a numerical illustration, not a proof', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
check('drawer chapter links are relative and target the top window', await D(() => { const a = [...document.querySelectorAll('#drawer a[href*="ch2"]')]; return a.length >= 5 && a.every((x) => x.target === '_top' && x.getAttribute('href').startsWith('../../')); }));
await page.keyboard.press('Escape');
check('Esc closes the drawer and focus returns to its button', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* ---------- language ---------- */
await page.click('[data-lang-set="en"]'); await settle();
let left = await cjkLeftovers(page);
check('no visible Chinese in English mode', left.length === 0, left.slice(0, 6).join(' | '));
for (const p of ['identity', 'dottie0', 'alternating']) {
  await page.click(`#presets [data-preset="${p}"]`); await settle();
  await page.click('#first'); await settle();
  for (const m of ['diagonal', 'dottie', 'prime']) { await page.click(`#modeChips [data-mode="${m}"]`); await settle(); }
  left = await cjkLeftovers(page);
  check(`no visible Chinese in English mode after preset ${p} and every stage mode`, left.length === 0, left.slice(0, 6).join(' | '));
}
await page.click('#infoBtn');
left = await cjkLeftovers(page);
check('no visible Chinese in the English drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title', (await D(() => document.title)) === 'ORTHO//ESCAPE · Diagonal escape, the cosine fixed point and prime escape');
check('English aria-labels come from data-aria-en', await D(() => [...document.querySelectorAll('[data-aria-en]')].every((el) => el.getAttribute('aria-label') === el.dataset.ariaEn)));
await page.click('#reset'); await settle();
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('Home'); await settle(); await page.click('#play');
await page.waitForFunction(() => !SE_DEBUG.state().playing, null, { timeout: 15000 }).catch(() => {});
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 5000 }).catch(() => {});
check('the end-of-playback toast is in English', /^Diagonal escape complete: d differs from all 6 rows; signed flip count 0 = \|d\| − tr f; residual of x₆ /.test(await text('#toast')));

/* ---------- hub round trip (the crumb leads to ../ = the book's visualization index) ---------- */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, which keeps the language and lists this visualization', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D(() => document.querySelectorAll('.card[data-viz="sphere-escape"]').length)) === 1 && (await D(() => !!document.querySelector('.card[data-viz="sphere-escape"] img[src="sphere-escape/thumb.jpg"]'))));
check('the choice is remembered under the site-wide key tr-lang', (await D(() => localStorage.getItem('tr-lang'))) === 'en');
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click('.card[data-viz="sphere-escape"] .enter'); await page.waitForLoadState('load');
await page.waitForFunction(() => window.SE_DEBUG && SE_DEBUG.frames() > 0, null, { timeout: 30000 });
check('the hub card opens this page', (await D(() => document.body.dataset.vizId)) === ID);

/* ---------- layouts ---------- */
for (const lang of ['zh', 'en']) {
  for (const [w, h] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await open(`?lang=${lang}`); await settle();
    check(`no horizontal scroll at ${w}px (${lang})`, (await overflowX(page)) === 0);
  }
}
await page.setViewportSize({ width: 390, height: 844 });
await open('?lang=zh'); await settle();
check('390px: one column in the order inputs → ledger → readouts → matrix → evidence', await D(() => {
  const t = ['#inputs', '#ledgerPanel', '#readouts', '#heatPanel', '#evidence'].map((s) => document.querySelector(s).getBoundingClientRect().top);
  return t.every((y, i) => i === 0 || y > t[i - 1]);
}));
check('390px: the HUD sits below the mode chips', await D(() => document.getElementById('hudBig').getBoundingClientRect().top >= document.getElementById('modeChips').getBoundingClientRect().bottom - 1));
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en'); await settle();
check('?embed=1 hides the header, crumb and key help', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en starts in English', (await D(() => TRV.lang())) === 'en' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, no horizontal scroll', (await overflowX(page)) === 0 && (await D(() => { const a = document.getElementById('inputs').getBoundingClientRect(), b = document.getElementById('ledgerPanel').getBoundingClientRect(); return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40; })));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh&n=8&seed=24&x0=0&mode=dottie'); await settle();
st = await state();
check('URL parameters set the state', st.N === 8 && st.seed === 24 && st.x0 === 0 && st.mode === 'dottie' && st.pass === 8, JSON.stringify(st));
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await D(() => window.TRV_THUMB()); await settle();
check('?thumb=1: the matrix panel fills the frame', await D(() => { const r = document.getElementById('heat').getBoundingClientRect(); return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720; }));
check('TRV_THUMB puts the cover on the 8 × 8 list of seed 11 at step 5', eq(await state().then((s) => [s.N, s.seed, s.pass]), [8, 11, 5]));
const cover = await D(() => {
  window.__texts = []; window.dispatchEvent(new Event('resize'));
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => {
    const c = document.getElementById('heat'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    const half = (x0, x1) => { let n = 0; for (let y = 0; y < c.height; y += 2) for (let x = x0; x < x1; x += 2) { const i = 4 * (y * c.width + x); if (d[i] + d[i + 1] + d[i + 2] > 300) n++; } return n; };
    r({ left: half(0, c.width / 2), right: half(c.width / 2, c.width), texts: window.__texts.filter(([id]) => id === 'heat').map(([, t]) => t) });
  })));
});
check('the cover draws the matrix on the left and the ledger on the right', cover.left > 4000 && cover.right > 400, JSON.stringify({ left: cover.left, right: cover.right }));
check('the cover carries no words: only row codes, digits and signs', cover.texts.length > 60 && cover.texts.every((t) => /^(#\d|d|[01]|[+−]1)$/.test(t)), [...new Set(cover.texts)].join(' '));
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
