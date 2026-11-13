#!/usr/bin/env node
// Browser regression suite for ORTHO//PADIC (books/quantum-geometry/viz/padic-prime-table-tree/):
//   node books/quantum-geometry/viz/tests/padic-prime-table-tree.test.mjs
// Runs stageFirstChecks first, then independently verifies every p-adic, Hensel, ultrametric,
// collision-pair, CRT, and Adelic product claim using exact BigInt reference arithmetic.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'padic-prime-table-tree';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VIZ_DIR = path.resolve(__dirname, '..', ID);

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- static source hygiene (AGENTS.md Rule 2: zero hex colors, zero warn-red for ramification) ---------- */
const cssSrc = fs.readFileSync(path.join(VIZ_DIR, 'style.css'), 'utf8');
const jsSrc = fs.readFileSync(path.join(VIZ_DIR, 'main.js'), 'utf8');
check('style.css and main.js contain zero hardcoded hex colours',
  !/#[0-9a-fA-F]{3,8}\b/.test(cssSrc) && !/#[0-9a-fA-F]{3,8}\b/.test(jsSrc));
check('style.css and main.js never use --warn / P.warn red (reserved strictly for open conjectures)',
  !/--warn\b/.test(cssSrc) && !/\bP\.warn\b/.test(jsSrc) && !/--warn\b/.test(jsSrc));

/* ---------- independent BigInt reference arithmetic ---------- */
const PRIMES = [2, 3, 5, 7, 11, 13, 17, 23, 31, 97, 257, 1031];
const EXPECTED_DEPTHS = [10, 7, 5, 4, 3, 3, 3, 3, 3, 2, 2, 1];
const EXPECTED_E1 = [261632, 174251, 104346, 74387, 47151, 39819, 30330, 22286, 16401, 4905, 1530, 0];
const N_STATES = 1024;

const absB = (a) => (a < 0n ? -a : a);
const gcdB = (a, b) => {
  a = absB(a); b = absB(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a || 1n;
};
const modB = (a, m) => { const r = a % m; return r < 0n ? r + m : r; };
function modInvB(a, m) {
  let t = 0n, nt = 1n, r = m, nr = modB(a, m);
  while (nr !== 0n) {
    const q = r / nr;
    [t, nt] = [nt, t - q * nt];
    [r, nr] = [nr, r - q * nr];
  }
  return r === 1n ? (t < 0n ? t + m : t) : null;
}

const REF_POLYS = {
  sqrt2:   { disc: 8,   f: (x) => x * x - 2n,         df: (x) => 2n * x },
  cubic23: { disc: -23, f: (x) => x * x * x - x + 1n, df: (x) => 3n * x * x - 1n },
  sqrtm1:  { disc: -4,  f: (x) => x * x + 1n,         df: (x) => 2n * x }
};

function refDepth(p) {
  let k = 1, pk = BigInt(p);
  while (pk < BigInt(N_STATES)) { pk *= BigInt(p); k++; }
  return k;
}
function refCollisions(N, p) {
  const q = Math.floor(N / p), r = N % p;
  return (r * (q + 1) * q) / 2 + ((p - r) * q * (q - 1)) / 2;
}
function refVal(p, n) {
  let m = Math.abs(Math.trunc(n));
  if (m === 0) return Infinity;
  let v = 0;
  while (m % p === 0) { m = Math.floor(m / p); v++; }
  return v;
}

/* ---------- open page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);

const state = async () => { await settle(page); return page.evaluate(() => window.PADIC_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.PADIC_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => {
  await page.evaluate(([i, val]) => {
    const el = document.getElementById(i);
    el.value = String(val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, [id, v]);
  await settle(page);
};
const stopped = (to) => until(page, (t) => { const d = window.PADIC_DEBUG.state; return !d.playing && Math.round(d.t) === t; }, to, 300000);
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries its viz id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on default HENSEL card at still rIdx = 3 (p = 7, stopped)',
  s.preset === 'hensel' && s.scene === 'duo' && s.rIdx === 3 && s.prime === 7 && s.poly === 'sqrt2' && s.rat === '12/35' && s.probeB === 353 && !s.playing,
  JSON.stringify({ preset: s.preset, scene: s.scene, rIdx: s.rIdx, prime: s.prime, playing: s.playing }));

/* ---------- 1. Prime ladder K(p) & exact unordered collisions E₁(1024, p) ---------- */
const table = await page.evaluate(() => window.PADIC_DEBUG.PRIME_TABLE);
check('all 12 primes match exact serial depth K(p) = ⌈10/log₂ p⌉ and unordered k=1 collision pairs E₁(1024, p)',
  table.length === 12
  && table.every((row, i) =>
    row.p === PRIMES[i]
    && row.depth === EXPECTED_DEPTHS[i]
    && row.depth === refDepth(PRIMES[i])
    && row.exactUnordered === EXPECTED_E1[i]
    && row.exactUnordered === refCollisions(N_STATES, PRIMES[i])
    && row.exactOrdered === 2 * EXPECTED_E1[i]
    && Math.abs(row.smoothUnordered - Math.max(0, (N_STATES * (N_STATES - PRIMES[i])) / (2 * PRIMES[i]))) < 1e-12),
  JSON.stringify(table));
check('boundary milestones: p=2 gives (K=10, E₁=261632), p=7 gives (K=4, E₁=74387), p=31 gives (K=3, E₁=16401), p=1031 gives (K=1, E₁=0)',
  table[0].depth === 10 && table[0].exactUnordered === 261632
  && table[3].depth === 4 && table[3].exactUnordered === 74387
  && table[8].depth === 3 && table[8].exactUnordered === 16401
  && table[11].depth === 1 && table[11].exactUnordered === 0);

/* ---------- 2. Exact BigInt Hensel O(1) root lifting across all 3 polynomials × 12 primes ---------- */
const henselGrid = await page.evaluate((ps) => {
  const out = {};
  for (const poly of ['sqrt2', 'cubic23', 'sqrtm1']) {
    out[poly] = {};
    for (const p of ps) out[poly][p] = window.PADIC_DEBUG.computeHensel(poly, p, 5);
  }
  return out;
}, PRIMES);

let allHenselValid = true;
const henselErrors = [];
for (const [polyId, spec] of Object.entries(REF_POLYS)) {
  for (const p of PRIMES) {
    const P0 = BigInt(p);
    const H = henselGrid[polyId][p];
    const baseRoots = [];
    for (let a = 0n; a < P0; a++) if (modB(spec.f(a), P0) === 0n) baseRoots.push(Number(a));
    if (H.branches.length !== baseRoots.length) {
      allHenselValid = false;
      henselErrors.push(`${polyId}@p=${p}: branches=${H.branches.length} vs ${baseRoots.length}`);
      continue;
    }
    for (const br of H.branches) {
      const a0 = BigInt(br.a0);
      const df0 = modB(spec.df(a0), P0);
      if (df0 === 0n) {
        if (br.kind !== 'ramified' || br.invModP !== null) {
          allHenselValid = false;
          henselErrors.push(`${polyId}@p=${p},a0=${br.a0}: expected ramified`);
        }
      } else {
        const inv = modInvB(df0, P0);
        if (br.kind !== 'simple' || !br.verified || BigInt(br.invModP) !== inv || br.digits.length !== 5) {
          allHenselValid = false;
          henselErrors.push(`${polyId}@p=${p},a0=${br.a0}: invalid simple metadata`);
          continue;
        }
        let sum = 0n, pk = 1n;
        for (let k = 0; k < 5; k++) {
          const d = BigInt(br.digits[k]);
          if (d < 0n || d >= P0) { allHenselValid = false; henselErrors.push(`digit out of range`); }
          sum += d * pk;
          pk *= P0;
          const rk = BigInt(br.residues[k]);
          if (rk !== sum || modB(spec.f(rk), pk) !== 0n || (k > 0 && rk % (pk / P0) !== BigInt(br.residues[k - 1]))) {
            allHenselValid = false;
            henselErrors.push(`${polyId}@p=${p},a0=${br.a0},k=${k + 1}: lift failed`);
          }
        }
      }
    }
  }
}
check('all 36 (polynomial × prime) Hensel tables satisfy exact BigInt congruence f(x_k) ≡ 0 (mod p^k) and prefix coherence x_{k+1} ≡ x_k (mod p^k)',
  allHenselValid, henselErrors.slice(0, 5).join(' | '));

check('canonical Hensel lift of x² − 2 at p = 7: a₀ = 3 lifts to [3, 1, 2, 6, 1]₇ ≡ 4567 (mod 16807) and a₀ = 4 lifts to 12240 with 4567 + 12240 = 7⁵',
  JSON.stringify(henselGrid.sqrt2[7].simpleBranches[0].digits) === JSON.stringify([3, 1, 2, 6, 1])
  && henselGrid.sqrt2[7].simpleBranches[0].residues[4] === '4567'
  && henselGrid.sqrt2[7].simpleBranches[1].residues[4] === '12240'
  && 4567 + 12240 === 7 ** 5);
check('ramification & k=1 UNSAT on x² − 2: p = 2 stalls at k = 2 (a₀ = 0, f′(0) ≡ 0 mod 2, 0 lifts mod 4); p = 3 and p = 5 certify UNSAT at k = 1',
  henselGrid.sqrt2[2].status === 'ramified_only'
  && henselGrid.sqrt2[2].ramifiedBranches[0].lifts2.length === 0
  && henselGrid.sqrt2[3].status === 'unsat_k1'
  && henselGrid.sqrt2[5].status === 'unsat_k1');
check('cubic x³ − x + 1 (Δ = −23) at p = 23 exhibits mixed ramification: stalled double root a₀ = 13 coexisting with O(1)-liftable simple root a₀ = 20 → 550341 (mod 23⁵)',
  henselGrid.cubic23[23].status === 'mixed_ramified'
  && henselGrid.cubic23[23].ramifiedBranches[0].a0 === 13
  && henselGrid.cubic23[23].ramifiedBranches[0].lifts2.length === 0
  && JSON.stringify(henselGrid.cubic23[23].simpleBranches[0].digits) === JSON.stringify([20, 7, 5, 22, 1])
  && henselGrid.cubic23[23].simpleBranches[0].residues[4] === '550341');

/* ---------- 3. Ultrametric observation probe & strong triangle inequality ---------- */
const probeSamples = await page.evaluate((ps) => {
  const p7_353 = window.PADIC_DEBUG.computeProbe(7, 10, 353);
  const p7_same = window.PADIC_DEBUG.computeProbe(7, 10, 10);
  const triplesOk = ps.every((p) => {
    const pts = [0, 10, 42, 135, 353, 512, 1023];
    for (const x of pts) for (const y of pts) for (const z of pts) {
      const dxy = window.PADIC_DEBUG.computeProbe(p, x, y).distVal;
      const dyz = window.PADIC_DEBUG.computeProbe(p, y, z).distVal;
      const dxz = window.PADIC_DEBUG.computeProbe(p, x, z).distVal;
      if (dxz > Math.max(dxy, dyz) + 1e-15) return false;
    }
    return true;
  });
  return { p7_353, p7_same, triplesOk };
}, PRIMES);

check('probe (x_A=10, x_B=353) at p=7 has |10−353|=343=7³: blind for k=1..3, first split at k*=4, distance d₇ = 1/343',
  probeSamples.p7_353.val === 3
  && probeSamples.p7_353.firstK === 4
  && probeSamples.p7_353.distStr === '1/343'
  && probeSamples.p7_353.readingsA.slice(0, 3).every((v, i) => v === probeSamples.p7_353.readingsB[i])
  && probeSamples.p7_353.readingsA[3] !== probeSamples.p7_353.readingsB[3]);
check('probe (x_A=10, x_B=10) yields d_p = 0 with null split depth, and strong ultrametric inequality holds across all 12 primes × 343 state triples',
  probeSamples.p7_same.firstK === null && probeSamples.p7_same.distVal === 0 && probeSamples.p7_same.distStr === '0' && probeSamples.triplesOk);

/* ---------- 4. Adelic rational product formula & CRT decomposition across all 5 rationals ---------- */
const RATS = [
  ['12/35',  12n,  35n, 'Z/420Z ≅ Z/4Z × Z/3Z × Z/5Z × Z/7Z'],
  ['-42/5', -42n,   5n, 'Z/210Z ≅ Z/2Z × Z/3Z × Z/5Z × Z/7Z'],
  ['8/9',     8n,   9n, 'Z/72Z ≅ Z/8Z × Z/9Z'],
  ['30/77',  30n,  77n, 'Z/2310Z ≅ Z/2Z × Z/3Z × Z/5Z × Z/7Z × Z/11Z'],
  ['105/64', 105n, 64n, 'Z/6720Z ≅ Z/64Z × Z/3Z × Z/5Z × Z/7Z']
];
const adelicAll = await page.evaluate((keys) => keys.map((k) => window.PADIC_DEBUG.computeAdelic(k)), RATS.map((r) => r[0]));
check('all 5 rational Adelic ledgers verify |x|_∞ · ∏_p |x|_p = 1 exactly, |ln|x|_∞ + ∑ ln|x|_p| < 1e-13, and exact CRT prime-power decomposition',
  adelicAll.every((Ad, i) => {
    const [, num, den, iso] = RATS[i];
    const g = gcdB(num, den);
    return Ad.productExactOne === true
      && Ad.productStr === '1'
      && Math.abs(Ad.logSum) < 1e-13
      && Ad.num === Number(num / g)
      && Ad.den === Number(den / g)
      && Ad.crtIso === iso;
  }),
  JSON.stringify(adelicAll.map((a) => ({ key: a.key, prod: a.productStr, logSum: a.logSum, crtIso: a.crtIso }))));

/* ---------- 5. Euclid witnesses ---------- */
const euclidSteps = await page.evaluate(() => window.PADIC_DEBUG.EUCLID_STEPS);
check('Euclid witness ladder includes 2·3·5·7·11·13 + 1 = 30031 = 59 × 509 yielding new prime 59 outside {2..13}',
  euclidSteps.length === 6 && euclidSteps[5].M === '30031 = 59×509' && euclidSteps[5].witness === 59);

/* ---------- 6. All 6 experiment cards (including animated playback to auto-stop) ---------- */
// Card 1: CLEAVAGE (from 0 to 0 -> immediate still at rIdx=0, p=2)
await pick('cleavage');
s = await state();
check('CLEAVAGE card sets p = 2 (K = 10, E₁ = 261,632) with ramified root of x² − 2',
  s.preset === 'cleavage' && s.scene === 'duo' && s.rIdx === 0 && s.prime === 2 && s.depth === 10 && s.exactUnordered === 261632
  && s.hensel.status === 'ramified_only' && (await text('#roKey')).includes('K(2) = 10'));

// Card 2: HENSEL (plays from 0 to 3 and auto-stops at p = 7; works cleanly under VIZ_SLOW_FRAMES=1000)
await pick('hensel');
check('HENSEL card plays and auto-stops at rIdx = 3 (p = 7)', await stopped(3));
s = await state();
check('HENSEL card lands on p = 7, f(x) = x² − 2, probeB = 353, displaying [3, 1, 2, 6, 1]₇ ≡ 4567',
  s.preset === 'hensel' && s.prime === 7 && s.probeB === 353 && (await text('#ro1')).includes('4567'));

// Card 3: FLATTEN (rIdx = 8 -> p = 31, K = 3, E₁ = 16,401)
await pick('flatten');
s = await seek(8);
check('FLATTEN card at p = 31 collapses serial depth to K = 3 and collisions to E₁ = 16,401',
  s.prime === 31 && s.depth === 3 && s.exactUnordered === 16401 && (await text('#roKey')).includes('16,401'));

// Card 4: UNRAMIFIED (rIdx = 11 -> p = 1031 > 1024, K = 1, E₁ = 0)
await pick('unramified');
s = await seek(11);
check('UNRAMIFIED card at p = 1031 > 1024 reaches K = 1 single-layer zero-collision lookup (E₁ = 0)',
  s.prime === 1031 && s.depth === 1 && s.exactUnordered === 0 && s.q === 0 && s.rem === 1024
  && (await text('#pillEscape strong')) === '0');

// Card 5: ADELIC (scene = adelic, poly = sqrtm1, rat = 12/35, still = 2 -> p = 5)
await pick('adelic');
s = await seek(2);
check('ADELIC card activates adelic scene on x = 12/35 at p = 5 with ∏ = 1',
  s.scene === 'adelic' && s.poly === 'sqrtm1' && s.rat === '12/35' && s.prime === 5
  && (await text('#ro4')).includes('∏ = 1') && (await text('#ro5')).includes('Z/420Z'));

// Card 6: EUCLID (rIdx = 12 -> p_∞ cliff vs Euclid discrete prime staircase)
await pick('euclid');
s = await seek(12);
check('EUCLID card reaches rIdx = 12 (p_∞ cliff) with cubic23 & −42/5 and displays 30031 = 59 × 509 witness',
  s.isCliff === true && s.prime === null && s.poly === 'cubic23' && s.rat === '-42/5'
  && (await text('#pillPrime strong')) === 'p_∞' && (await text('#roKey')) === '30031 = 59 × 509');

/* ---------- 7. Interactive controls, curve pointer click, slider & keyboard ---------- */
// Editing #probeB while a preset is armed clears stopAt and leaves preset
await pick('flatten');
s = await state();
check('clicking FLATTEN arms stopAt = 8 while playing', s.playing && s.stopAt === 8, JSON.stringify({ playing: s.playing, stopAt: s.stopAt }));
await setRange('probeB', 10);
s = await state();
check('moving #probeB slider to 10 clears stopAt, leaves preset, and reports d_p = 0',
  s.stopAt === null && s.preset === null && s.probeB === 10 && s.probe.distVal === 0 && (await text('#ro2')).includes('d_p = 0'));
await page.click('#rew');
s = await state();
check('⏮ rewinds to rIdx = 0 (p = 2) and pauses', s.rIdx === 0 && s.prime === 2 && !s.playing);

// Prime chips, poly chips, rat chips
await page.click('#primeChips [data-prime="7"]');
await page.click('#polyChips [data-poly="cubic23"]');
await page.click('#ratChips [data-rat="30/77"]');
s = await state();
check('prime chip p=23 + cubic23 + rat 30/77 updates state to mixed-ramified Hensel and Z/2310Z CRT',
  s.prime === 23 && s.poly === 'cubic23' && s.hensel.status === 'mixed_ramified' && s.rat === '30/77' && s.adelic.crtMod === '2310');

// Pointer click directly on the right-hand Depth/Escape curve jumps to target prime index
await page.click('#sceneChips [data-scene="duo"]');
await settle(page, 60);
const hitPt = await page.evaluate(() => window.PADIC_DEBUG.curveHitAt(9)); // idx 9 -> p = 97
await page.mouse.move(hitPt[0], hitPt[1]);
await page.mouse.down();
await page.mouse.up();
s = await state();
check('clicking on the Depth/Escape curve jumps directly to p = 97 (rIdx = 9, K = 2, E₁ = 4,905)',
  s.rIdx === 9 && s.prime === 97 && s.depth === 2 && s.exactUnordered === 4905, JSON.stringify({ rIdx: s.rIdx, prime: s.prime }));

// Keyboard shortcuts: 2 (tree), 3 (adelic), 1 (duo), f (cycle poly), r (cycle rat), ArrowLeft/Right, Space
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); s = await state(); check('key 2 switches to Tree scene', s.scene === 'tree');
await page.keyboard.press('3'); s = await state(); check('key 3 switches to Adelic scene', s.scene === 'adelic');
await page.keyboard.press('1'); s = await state(); check('key 1 switches back to Dual scene', s.scene === 'duo');
await page.keyboard.press('f'); s = await state(); check('key F cycles polynomial from cubic23 to sqrtm1', s.poly === 'sqrtm1');
await page.keyboard.press('r'); s = await state(); check('key R cycles rational from 30/77 to 105/64', s.rat === '105/64');
await seek(3);
await page.keyboard.press('ArrowRight'); s = await state(); check('→ advances prime rail by 1 step to p = 11', s.rIdx === 4 && s.prime === 11);
await page.keyboard.press('ArrowLeft'); s = await state(); check('← steps prime rail back by 1 step to p = 7', s.rIdx === 3 && s.prime === 7);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space starts prime-expansion playback', await until(page, () => { const d = window.PADIC_DEBUG.state; return d.playing && d.t > 3.05; }));
await page.keyboard.press('Space'); await settle(page);
check('Space pauses playback', !(await state()).playing);

/* ---------- 8. Responsive mobile stacking & HUD non-overlap across all 6 presets (zh & en) ---------- */
await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
s = await state();
check('Dual scene stacks panels top/bottom cleanly on 390px phone viewport', s.stacked === true);

const ALL_PRESETS = [
  ['cleavage', 0],
  ['hensel', 3],
  ['flatten', 8],
  ['unramified', 11],
  ['adelic', 2],
  ['euclid', 12]
];
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 50);
  const overlaps = [];
  const cjkLeak = [];
  for (const [pid, st] of ALL_PRESETS) {
    await pick(pid); await seek(st);
    const res = await page.evaluate((lg) => {
      const a = document.querySelector('.hud-tl').getBoundingClientRect();
      const b = document.querySelector('.hud-tr').getBoundingClientRect();
      const sep = a.right + 4 <= b.left || b.right + 4 <= a.left || a.bottom + 4 <= b.top || b.bottom + 4 <= a.top;
      const hit = sep ? null : { tl: [a.left, a.top, a.right, a.bottom], tr: [b.left, b.top, b.right, b.bottom] };
      let hasCjk = false;
      if (lg === 'en') {
        const txt = [
          document.getElementById('hudBig').textContent,
          document.getElementById('hudSub').textContent,
          document.getElementById('roKey').textContent,
          document.getElementById('roKeySub').textContent,
          document.getElementById('ro1').textContent,
          document.getElementById('ro4').textContent,
          document.getElementById('ro5').textContent,
          document.getElementById('presetNote').textContent
        ].join(' ');
        hasCjk = /[\u4e00-\u9fff]/.test(txt);
      }
      return { hit, hasCjk };
    }, lang);
    if (res.hit) overlaps.push(`${pid}:${JSON.stringify(res.hit)}`);
    if (res.hasCjk) cjkLeak.push(pid);
  }
  check(`390×844 (${lang}): .hud-tl and .hud-tr never overlap across all 6 presets`, overlaps.length === 0, overlaps.join(' | '));
  if (lang === 'en') {
    check('English mode has zero CJK characters in HUD, readouts, or preset notes across all 6 presets', cjkLeak.length === 0, cjkLeak.join(', '));
  }
}

await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 120);
s = await state();
check('Dual scene lays out panels side-by-side on wide 1440px viewport', s.stacked === false);
await page.click('[data-lang-set="zh"]');

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
