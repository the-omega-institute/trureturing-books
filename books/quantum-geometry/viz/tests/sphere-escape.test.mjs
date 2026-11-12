// Browser regression suite for ORTHO//ESCAPE (books/quantum-geometry/viz/sphere-escape/).
//   node books/quantum-geometry/viz/tests/sphere-escape.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.ESCAPE_DEBUG and recomputes every claim independently: the flipped diagonal, the
// polygon gap, the verified Taylor bound, the cosine orbit and Euclid's numbers (with BigInt).
import { session, stageFirstChecks, settle } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'sphere-escape';
const T = await session();
const { check } = T;
const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-300);

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.ESCAPE_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 30000 }).catch(() => {});
const seek = async (t) => { await page.evaluate((v) => window.ESCAPE_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const scene = async (sc) => { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 40); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const flipped = (rows) => rows.map((r, i) => (r[i] === '1' ? '0' : '1')).join('');
const dist = (a, b) => [...a].reduce((s, ch, i) => s + (ch !== b[i] ? 1 : 0), 0);

/* ---------- diagonal ---------- */
let s = await state();
check('starts on the DIAGONAL card: 6 rows of 6 bits', s.scene === 'diag' && s.N === 6 && s.rows.length === 6 && s.rows.every((r) => /^[01]{6}$/.test(r)));
let ok = true, minH = 99;
for (const N of [3, 5, 8, 10]) for (const seed of [1, 11, 42, 99]) {
  await setRange('size', N); await setRange('seed', seed); s = await state();
  const d = flipped(s.rows);
  ok = ok && s.d === d && !s.rows.includes(d) && s.rows.every((r, i) => r[i] !== d[i]) && s.hamming.every((h, i) => h === dist(s.rows[i], d) && h >= 1);
  minH = Math.min(minH, ...s.hamming);
}
check('for 16 lists (N = 3 … 10): d is the flipped diagonal, differs from row k in place k, and is on no row', ok);
check('every Hamming distance from d to a row is at least 1', minH >= 1, `min ${minH}`);
check('changing the list leaves the experiment card', s.preset === null);
await setRange('size', 6); await setRange('seed', 11); s = await seek(6);
const before = s;
const at = await page.evaluate(() => window.ESCAPE_DEBUG.cell(2, 4));
await page.mouse.click(at[0], at[1]); s = await state();
check('clicking an off-diagonal cell flips that bit and leaves d alone', s.rows[2][4] !== before.rows[2][4] && s.d === before.d && !s.rows.includes(s.d));
const dg = await page.evaluate(() => window.ESCAPE_DEBUG.cell(3, 3));
await page.mouse.click(dg[0], dg[1]); s = await state();
check('clicking a diagonal cell flips the matching bit of d, and d is still off the list', s.d[3] !== before.d[3] && s.d === flipped(s.rows) && !s.rows.includes(s.d));
// make row 1 equal to the current d except for the diagonal bit: the nearest it can get
await page.click('#identity'); s = await state();
check('Identity: the unit matrix gives d = 000000', s.rows.every((r, i) => [...r].every((ch, j) => ch === (i === j ? '1' : '0'))) && s.d === '000000' && s.hamming.every((h) => h === 1));
s = await seek(3);
check('the rail reads the diagonal bit by bit', s.step === 3 && (await page.textContent('#ro2')) === '000···');
check('the HUD names the next bit to read', (await page.textContent('#hudSub')).includes('第 4 行第 4 位'));
// absorb d again and again
await pick('diagonal'); await seek(6);
let grew = true, old = (await state());
for (let n = 7; n <= 10; n++) {
  await page.click('#absorb'); await settle(page, 30); s = await seek(n);
  grew = grew && s.N === n && s.rows.length === n && s.rows[n - 1].slice(0, n - 1) === old.d && s.rows.slice(0, n - 1).every((r, i) => r.slice(0, n - 1) === old.rows[i]) && !s.rows.includes(s.d) && s.d === flipped(s.rows);
  old = s;
}
check('absorbing d four times: d becomes the new row, the old table is kept, and the new d escapes each time', grew && s.N === 10);
await page.click('#absorb'); await settle(page, 30);
check('a full list (N = 10) refuses another row and says so', (await state()).N === 10 && (await page.textContent('#toast')).includes('10'));
await pick('absorb'); s = await seek(7);
check('ABSORB card: seven rows, the seventh is the escaped string of the first six', s.N === 7 && s.rows[6].slice(0, 6) === flipped(s.rows.slice(0, 6).map((r) => r.slice(0, 6))) && !s.rows.includes(s.d));

/* ---------- fibres: the four-address catalog ---------- */
// independent model: the four maps {0,1} → {0,1} as functions, blocks and pairs counted by brute force
const MAPS = [() => 0, (x) => x, (x) => 1 - x, () => 1];
const fibreModel = (lat) => {
  const g = MAPS.map((D, a) => (D(lat[a]) === 0 ? 1 : 0)), pairs = [];
  for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) if (a < b && lat[a] === lat[b] && g[a] !== g[b]) pairs.push(`${a}${b}`);
  const blocks = (key) => new Set([0, 1, 2, 3].map(key)).size;
  return { g: g.join(''), pairs, before: blocks((a) => lat[a]), after: blocks((a) => lat[a] * 2 + g[a]) };
};
await pick('split');
await page.waitForFunction(() => { const d = window.ESCAPE_DEBUG.state; return d.scene === 'fiber' && !d.playing; }, null, { timeout: 120000 }).catch(() => {});
s = await seek(6);
check('SPLIT card: latent (0,0,0,1), g = 1100, the pairs (a₀, a₂) and (a₁, a₂) are split, 2 → 3 blocks', s.scene === 'fiber' && s.lat === '0001' && s.fiber.g.join('') === '1100'
  && s.fiber.pairs.map((p) => p.join('')).join() === '02,12' && s.fiber.before === 2 && s.fiber.after === 3 && s.step === 6);
let fOk = true, fMin = 9;
for (let code = 0; code < 16; code++) {
  const want = [3, 2, 1, 0].map((i) => (code >> i) & 1);
  for (let guard = 0; guard < 17 && (await state()).lat !== want.join(''); guard++) { await page.click('#nextLat'); await settle(page); }
  s = await state(); const m = fibreModel(want);
  fOk = fOk && s.lat === want.join('') && s.fiber.g.join('') === m.g && s.fiber.pairs.map((p) => p.join('')).join() === m.pairs.join() && s.fiber.before === m.before && s.fiber.after === m.after;
  fMin = Math.min(fMin, m.pairs.length);
  fOk = fOk && m.after > m.before;
}
check('for all 16 latent maps the page agrees with a brute-force count of g, deficit pairs and blocks', fOk);
check('every latent map leaves at least one separated pair and strictly more blocks after the join', fMin >= 1);
check('the fibre scene leaves the card when the latents change', s.preset === null);
const latBefore = s.lat; await page.click('#latChips [data-a="3"]'); s = await state();
check('a latent chip toggles that address and nothing else', s.lat.slice(0, 3) === latBefore.slice(0, 3) && s.lat[3] !== latBefore[3]);
await pick('split');
await page.waitForFunction(() => { const d = window.ESCAPE_DEBUG.state; return d.scene === 'fiber' && !d.playing; }, null, { timeout: 120000 }).catch(() => {});
s = await seek(6);
const nodeAt = await page.evaluate(() => window.ESCAPE_DEBUG.node(0));
await page.mouse.click(nodeAt[0], nodeAt[1]); s = await state();
check('clicking an address on the stage toggles its latent coordinate', s.lat === '1001' && s.fiber.pairs.length >= 1);
s = await seek(2);
check('the rail computes g one address at a time', (await page.textContent('#hudBig')).includes('3'));

/* ---------- pointer: the finite record overlap ---------- */
const ptrModel = (N, shape, l) => {
  const raw = []; for (let k = 0; k <= N; k++) raw.push(shape === 'flat' ? 1 : shape === 'tri' ? Math.min(k + 1, N + 1 - k) : Math.sin(Math.PI * (k + 1) / (N + 2)));
  let n2 = 0; for (const x of raw) n2 += x * x; const c = raw.map((x) => x / Math.sqrt(n2));
  let gsum = 0; for (let i = 0; i <= N; i++) { const j = i - l; if (j >= 0) gsum += c[i] * c[j]; }
  return { gamma: Math.abs(gsum), bound: Math.cos(Math.PI / (Math.trunc(N / l) + 2)) };
};
await pick('pointer'); s = await state();
const p0 = ptrModel(8, 'sine', 1);
check('POINTER card: N = 8, sine shape, ℓ = 1, |γ| = cos(π/10) = 0.9511', s.scene === 'ptr' && s.pN === 8 && s.shape === 'sine' && s.ell === 1
  && Math.abs(s.gammaAbs - p0.gamma) < 1e-12 && Math.abs(s.gammaAbs - Math.cos(Math.PI / 10)) < 1e-12 && Math.abs(s.bound - p0.bound) < 1e-15);
let pOk = true, pMax = 0, eqOk = true;
for (const shape of ['sine', 'tri', 'flat']) {
  await page.click(`#shapeChips [data-shape="${shape}"]`); await settle(page);
  for (const N of [2, 3, 5, 8, 13, 16]) {
    await setRange('plen', N);
    for (const l of [1, 2, 3, N]) {
      if (l > N) continue; s = await seek(l - 1); const m = ptrModel(N, shape, l);
      pOk = pOk && s.ell === l && Math.abs(s.gammaAbs - m.gamma) < 1e-12 && Math.abs(s.bound - m.bound) < 1e-12 && s.gammaAbs <= s.bound + 1e-12 && s.bound < 1;
      pMax = Math.max(pMax, s.gammaAbs - s.bound);
      if (shape === 'sine' && l === 1) eqOk = eqOk && Math.abs(s.gammaAbs - Math.cos(Math.PI / (N + 2))) < 1e-12;
    }
  }
}
check('three shapes, six lengths, four shifts: the overlap matches an independent sum and never exceeds cos(π/(⌊N/ℓ⌋ + 2)) < 1', pOk, `max excess ${pMax}`);
check('the sine-shaped pointer meets the bound exactly at ℓ = 1', eqOk);
check('the key readout says the overlap stays below 1', (await page.textContent('#roKey')).includes('< 1'));

/* ---------- polygon and Taylor ---------- */
await pick('zu'); s = await state();
check('ZU-24576: the last step has 24576 sides', s.scene === 'poly' && s.step === 12 && s.n === 24576);
let gapErr = 0, mono = true, prev = Infinity, quarter = 0;
for (let k = 0; k <= 12; k++) {
  s = await seek(k); const n = 6 * 2 ** k, exact = 2 * Math.sin(Math.PI / (2 * n)) ** 2;
  gapErr = Math.max(gapErr, rel(s.gap, exact)); mono = mono && s.gap > 0 && s.gap < prev && s.n === n;
  if (k > 2) quarter = Math.max(quarter, Math.abs(s.gap / prev - 0.25)); prev = s.gap;
}
check('the gap is 1 − cos(π/n) for n = 6 · 2ᵏ, k = 0 … 12', gapErr < 1e-12, `max relative error ${gapErr}`);
check('the gap shrinks at every doubling and stays positive', mono);
check('each doubling shrinks it to about a quarter', quarter < 0.01, `max deviation ${quarter}`);
s = await seek(4);
check('step 4 is the 96-gon, whose half-perimeter 3.1410… is Liu Hui\'s area of the 192-gon', s.n === 96 && (await page.textContent('#ro2')).startsWith('3.1410'));
s = await seek(5);
check('step 5 is the 192-gon', s.n === 192 && (await page.textContent('#ro2')).startsWith('3.1414'));
check('the key readout says the gap is positive', (await page.textContent('#roKey')).includes('> 0'));
const tay = await page.evaluate(() => { const out = []; for (const th of [0.2, 1, 2, 3]) for (let m = 1; m <= 10; m++) { const t = window.ESCAPE_DEBUG.taylor(th, m); out.push([th, m, t.actual, t.lagrange, t.bound]); } return out; });
let tOk = true, tIndep = 0;
for (const [th, m, actual, lagrange, bound] of tay) {
  let sum = 0; for (let j = 0; j < m; j++) { let term = 1; for (let i = 1; i <= 2 * j; i++) term *= th / i; sum += (j % 2 ? -1 : 1) * term; }
  let b = 1; for (let i = 1; i <= 2 * m; i++) b *= th / i;
  tIndep = Math.max(tIndep, Math.abs(actual - Math.abs(Math.cos(th) - sum)), rel(lagrange, b), rel(bound, b * Math.exp(th)));
  tOk = tOk && actual <= bound + 4e-16;   // the remainder itself is only known to a few ulps of cos θ
}
check('the Taylor remainder never exceeds the verified bound θ²ᵐ/(2m)!·e^θ (40 cases)', tOk);
check('remainder and bound agree with an independent computation', tIndep < 1e-12, `max error ${tIndep}`);
await setRange('tpoint', 2.5);
check('the Taylor angle slider drives the second plot', (await page.textContent('#pBMeta')).includes('2.50'));

/* ---------- cosine ---------- */
await scene('cos'); await setRange('x0', 0); await page.click('#zoomChips [data-zoom="follow"]'); s = await seek(0);
check('the cosine scene starts the iteration at x₀ = 0 with the following camera', s.scene === 'cos' && s.x0 === 0 && s.zoom === 'follow');
let x = 0, orbitErr = 0, positive = true, shrink = true, lastRes = Infinity;
for (let k = 0; k <= 40; k++) {
  s = await seek(k); orbitErr = Math.max(orbitErr, Math.abs(s.xk - x));
  const res = Math.abs(Math.cos(x) - x); positive = positive && res > 0; shrink = shrink && res < lastRes; lastRes = res; x = Math.cos(x);
}
check('the orbit matches an independent iteration for 40 steps', orbitErr < 1e-15, `max error ${orbitErr}`);
check('the residual |cos xₖ − xₖ| shrinks at every step and is still positive at step 40', positive && shrink, `last ${lastRes}`);
check('x* is the fixed point to machine precision', Math.abs(Math.cos(s.xstar) - s.xstar) < 1e-15 && Math.abs(s.xstar - 0.7390851332151607) < 1e-15);
check('the error factor readout is near sin x*', Math.abs(parseFloat(await page.textContent('#ro3')) - Math.sin(s.xstar)) < 0.01);
await setRange('x0', 3); await page.click('#zoomChips [data-zoom="whole"]'); s = await state();
check('a far start x₀ = 3 with the whole-path camera', s.x0 === 3 && s.zoom === 'whole');
s = await seek(40);
check('from x₀ = 3 the orbit heads for the same x*', Math.abs(s.xk - s.xstar) < 1e-6 && Math.abs(s.xk - s.xstar) > 0);
await page.click('#zoomChips [data-zoom="follow"]'); check('the camera chips switch the view', (await state()).zoom === 'follow');

/* ---------- primes ---------- */
await pick('thirteen'); s = await state();
check('30031 card: Q = 2·3·5·7·11·13 + 1 = 30031 = 59 × 509', s.scene === 'prime' && s.step === 6 && s.euclid.Q === 30031 && s.euclid.factors.join('×') === '59×509');
const LIST = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const isPrime = (n) => { if (n < 2n) return false; for (let p = 2n; p * p <= n; p++) if (n % p === 0n) return false; return true; };
let eOk = true, euler = true, prevGap = Infinity;
for (let k = 0; k <= 12; k++) {
  s = await seek(k); const e = s.euclid, prod = LIST.slice(0, k).reduce((a, p) => a * BigInt(p), 1n), Q = prod + 1n;
  eOk = eOk && BigInt(e.Q) === Q && e.factors.reduce((a, f) => a * BigInt(f), 1n) === Q && e.factors.every((f) => isPrime(BigInt(f)) && !LIST.slice(0, k).includes(f))
    && LIST.slice(0, k).every((p) => Q % BigInt(p) === 1n) && e.factors[0] === Math.min(...e.factors);
  const product = LIST.slice(0, k).reduce((a, p) => a / (1 - 1 / (p * p)), 1), g = Math.PI ** 2 / 6 - product;
  euler = euler && rel(e.euler, product) < 1e-14 && g > 0 && g < prevGap; prevGap = g;
}
check('for k = 0 … 12: Q = p₁⋯pₖ + 1 leaves remainder 1 on every listed prime and factors into primes off the list', eOk);
check('the finite Euler product rises towards π²/6 and stays below it', euler, `last gap ${prevGap}`);
s = await seek(0);
check('with an empty list Q = 2', s.euclid.Q === 2 && s.euclid.factors.join() === '2');
check('the key readout names the least prime factor', (await page.textContent('#roKey')).trim().startsWith('2'));

/* ---------- the prime stage at every step, in both languages and every supported layout ---------- */
// Each layout gets its own context and walks the rail k = 0 … 12 on the prime scene. ESCAPE_DEBUG.prime is read in the
// same task as the seek, so no animation frame can move the rail in between. Its boxes are tested against the canvas,
// the free band and one another; its numbers against Q and its factors computed here in BigInt by trial division.
const factorBig = (n) => { const f = []; for (let p = 2n; p * p <= n; p += p === 2n ? 1n : 2n) while (n % p === 0n) { f.push(p); n /= p; } if (n > 1n) f.push(n); return f; };
const EU = Array.from({ length: LIST.length + 1 }, (_, k) => { const Q = LIST.slice(0, k).reduce((a, p) => a * BigInt(p), 1n) + 1n; return { Q, f: factorBig(Q) }; });
check('BigInt: every Q = p₁⋯pₖ + 1 (k = 0 … 12) is the product of its factors, all prime and off the list, with remainder 1 on every listed prime',
  EU.every(({ Q, f }, k) => f.reduce((a, x) => a * x, 1n) === Q && f.every((x, i) => isPrime(x) && !LIST.slice(0, k).some((p) => BigInt(p) === x) && (i === 0 || f[i - 1] <= x))
    && LIST.slice(0, k).every((p) => Q % BigInt(p) === 1n)) && EU[6].Q === 30031n && EU[6].f.join('×') === '59×509');
const sep = (a, b) => Math.max(b[0] - a[2], a[0] - b[2], b[1] - a[3], a[1] - b[3]);   // > 0 iff the two boxes are disjoint
const finiteBox = (b) => Array.isArray(b) && b.length === 4 && b.every(Number.isFinite) && b[2] > b[0] && b[3] > b[1];
const ints = (str) => (String(str).match(/[0-9]+/g) || []);   // ASCII digits only: the subscripts of p₁⋯pₖ are not numbers here
const BANDS = ['dials', 'eq', 'fac', 'lpf'], PAIRS = BANDS.flatMap((a, i) => BANDS.slice(i + 1).map((b) => `${a}|${b}`)), EPS = 1e-6;
const LAYOUTS = [
  ['full desktop', '&preset=thirteen', { width: 1440, height: 900 }],
  ['short-height desktop', '&preset=thirteen', { width: 1440, height: 560 }],
  ['phone', '&preset=thirteen', { width: 390, height: 844 }],
  ['embedded lab', '&embed=1', { width: 740, height: 620 }],
  ['cited card', '&embed=1&preset=thirteen', { width: 740, height: 500 }],
  ['still (?shot=1)', '&shot=1&preset=thirteen', { width: 800, height: 450 }]
];
for (const [name, query, viewport] of LAYOUTS) for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${query}`, { viewport, locale: lang === 'en' ? 'en-US' : 'zh-CN', reducedMotion: query.includes('shot') ? 'reduce' : 'no-preference' });
  await settle(p, 300);
  if (!query.includes('preset')) { await p.click('#sceneChips [data-scene="prime"]'); await settle(p, 40); }
  const geo = [], dat = [];
  for (let k = 0; k <= LIST.length; k++) {
    const r = await p.evaluate((v) => {
      window.ESCAPE_DEBUG.seek(v); window.TRV.kit.flush();
      const b = document.getElementById('cv').getBoundingClientRect();
      return { s: window.ESCAPE_DEBUG.state, L: window.ESCAPE_DEBUG.prime, cw: b.width, ch: b.height };
    }, k);
    const { s, L: P } = r, E = EU[k], tag = `k=${k}`;
    if (!P || s.scene !== 'prime' || s.step !== k || P.k !== k) { geo.push(`${tag}: no prime layout for this step`); dat.push(`${tag}: no prime layout for this step`); continue; }
    // geometry: canvas, free band, four finite bands, every pair apart, nothing outside the free band
    if (P.fallback !== false) geo.push(`${tag}: fallback`);
    if (Math.abs(P.W - r.cw) > 1 || Math.abs(P.H - r.ch) > 1) geo.push(`${tag}: layout ${P.W}×${P.H} vs canvas ${r.cw}×${r.ch}`);
    const F = P.free || {};
    if (!(Number.isFinite(F.top) && Number.isFinite(F.bottom) && F.top >= 0 && F.top < F.bottom && F.bottom <= P.H)) geo.push(`${tag}: free band ${JSON.stringify(F)}`);
    const B = P.bands || {};
    if (Object.keys(B).sort().join() !== [...BANDS].sort().join() || !BANDS.every((n) => finiteBox(B[n]))) geo.push(`${tag}: band boxes ${JSON.stringify(B)}`);
    else {
      for (const n of BANDS) { const b = B[n]; if (b[0] < -EPS || b[2] > P.W + EPS || b[1] < F.top - EPS || b[3] > F.bottom + EPS) geo.push(`${tag}: ${n} ${b.map((v) => v.toFixed(1))} outside x∈[0, ${P.W}], y∈[${F.top}, ${F.bottom}]`); }
      const mine = PAIRS.map((key) => { const [a, b] = key.split('|'); return [key, sep(B[a], B[b])]; });
      if (Object.keys(P.pairs || {}).sort().join() !== [...PAIRS].sort().join()) geo.push(`${tag}: pairs ${Object.keys(P.pairs || {})}`);
      for (const [key, v] of mine) { if (!(v > 0)) geo.push(`${tag}: ${key} separation ${v}`); if (!(Math.abs(P.pairs[key] - v) < 1e-9)) geo.push(`${tag}: ${key} reported ${P.pairs[key]}, recomputed ${v}`); }
      const least = Math.min(...mine.map(([, v]) => v));
      if (!(P.gaps && P.gaps.min > 0 && Math.abs(P.gaps.min - least) < 1e-9)) geo.push(`${tag}: min gap ${P.gaps && P.gaps.min} vs ${least}`);
    }
    for (const d of P.dials || []) if (!finiteBox(d.box) || d.box[1] < F.top - EPS || d.box[3] > F.bottom + EPS || d.box[0] < -EPS || d.box[2] > P.W + EPS) geo.push(`${tag}: dial ${d.spec && d.spec.p} box ${d.box}`);
    // data: Q, its factors, the listed dials, the least prime factor, the equation and the factorization as drawn
    if (P.primes !== 12) dat.push(`${tag}: primes ${P.primes}`);
    if (!(Number.isSafeInteger(s.euclid.Q) && BigInt(s.euclid.Q) === E.Q)) dat.push(`${tag}: Q ${s.euclid.Q} vs ${E.Q}`);
    if (s.euclid.factors.map(String).join('×') !== E.f.join('×')) dat.push(`${tag}: factors ${s.euclid.factors} vs ${E.f}`);
    const dials = P.dials || [];
    if (dials.length !== k || !dials.every((d, i) => d.spec && d.spec.p === LIST[i] && BigInt(d.spec.rem) === E.Q % BigInt(LIST[i]) && d.spec.rem === 1 && d.spec.r > 0)) dat.push(`${tag}: listed dials ${JSON.stringify(dials.map((d) => d.spec && [d.spec.p, d.spec.rem]))}`);
    if (k === 0 ? !(P.empty && finiteBox(P.empty.box) && P.r === null) : !(P.empty === null && Number.isFinite(P.r) && P.r > 0 && P.cols >= 1 && P.rows >= 1 && P.cols * P.rows >= k)) dat.push(`${tag}: band 1 ${JSON.stringify({ empty: !!P.empty, r: P.r, cols: P.cols, rows: P.rows })}`);
    const lp = P.lpf && P.lpf.spec;
    if (!(lp && BigInt(lp.p) === E.f[0] && lp.rem === 0 && E.Q % BigInt(lp.p) === 0n && Number.isFinite(P.lpfR) && P.lpfR > 0 && lp.r === P.lpfR && finiteBox(P.lpf.box))) dat.push(`${tag}: least prime ${lp && [lp.p, lp.rem]} vs ${E.f[0]}`);
    const eqN = ints(P.eq && P.eq.text), facN = ints(P.fac && P.fac.text);
    if (!(eqN.length >= 2 && eqN[eqN.length - 1] === E.Q.toString() && eqN[eqN.length - 2] === '1' && (k === 0 || k > 7 || eqN.slice(0, k).join() === LIST.slice(0, k).join()) && Number.isFinite(P.eqFont) && P.eqFont > 0)) dat.push(`${tag}: equation ${P.eq && P.eq.text}`);
    if (!(facN.join('×') === E.f.join('×') && facN.reduce((a, x) => a * BigInt(x), 1n) === E.Q && Number.isFinite(P.facFont) && P.facFont > 0)) dat.push(`${tag}: factorization ${P.fac && P.fac.text}`);
  }
  check(`prime stage, ${name} (${viewport.width}×${viewport.height}), ${lang}: at every k = 0 … 12 the four bands have finite boxes inside the free band, every pair is apart, the least gap is positive, no fallback`, geo.length === 0, geo.slice(0, 3).join(' | '));
  check(`prime stage, ${name}, ${lang}: 12 primes; Q, its factors, the listed dials (remainder 1), the least prime factor (remainder 0), the equation and the factorization agree with BigInt at every k`, dat.length === 0, dat.slice(0, 3).join(' | '));
  await p.context().close();
}

/* ---------- scenes, rail, keyboard ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['2', 'fiber'], ['3', 'poly'], ['4', 'ptr'], ['5', 'cos'], ['6', 'prime'], ['1', 'diag']]) { await page.keyboard.press(key); check(`key ${key} opens the ${sc} scene`, (await state()).scene === sc); }
const vis = await page.evaluate(() => [...document.querySelectorAll('[data-scenes]')].map((el) => [el.dataset.scenes, !el.hidden]));
check('only the controls and evidence of the current scene are shown', vis.every(([sc, shown]) => shown === sc.split(' ').includes('diag')));
await scene('prime'); s = await seek(3);
await page.locator('body').click({ position: { x: 5, y: 5 } });   // keys act on the page, not on the focused chip
await page.keyboard.press('ArrowRight'); check('→ adds one prime', (await state()).step === 4);
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('Home'); check('Home goes back to step 0', (await state()).step === 0);
await page.keyboard.press('End'); check('End goes to the last step', (await state()).step === 12);
await page.keyboard.press('Home'); await page.keyboard.press('Space'); await until(() => { const d = window.ESCAPE_DEBUG.state; return d.playing && d.t > 0; }); s = await state();
check('Space plays the scene forward', s.playing && s.t > 0);
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
check('the pills follow the scene', (await page.textContent('#pillScene strong')) === 'PRIMES');
await scene('cos'); check('the scene chips switch scenes and reset the rail length', (await state()).max === 40);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
