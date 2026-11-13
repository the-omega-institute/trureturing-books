#!/usr/bin/env node
// Independent browser regression for the eight sandtable experiments.
import { session, stageFirstChecks, settle, cjkLeftovers, inkShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pisot-clifford-rauzy-sandtable';
const PRESETS = ['zeckendorf', 'kbonacci', 'padic', 'rauzy', 'clifford', 'self-reference', 'entanglement', 'entropy'];
const VIEWS = ['words', 'roots', 'padic', 'rauzy', 'sand', 'spiral', 'cut', 'entropy'];
const T = await session(), { check } = T;
await stageFirstChecks(T, BOOK, ID, { settle: 0 });
const near = (a, b, eps = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < eps;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// The page bisects a power sum. This oracle uses safeguarded Newton steps on
// 1 - Σ x^(-j), with its analytic derivative and an independently maintained bracket.
function perron(K) {
  let lo = 1, hi = 2, x = 1.8;
  for (let i = 0; i < 100; i++) {
    let f = 1, df = 0;
    for (let j = 1; j <= K; j++) { f -= x ** -j; df += j * x ** (-j - 1); }
    if (Math.abs(f) < 2e-16) break;
    if (f < 0) lo = x; else hi = x;
    const candidate = x - f / df;
    const next = candidate > lo && candidate < hi ? candidate : (lo + hi) / 2;
    if (next === x) break;
    x = next;
  }
  return x;
}
const polynomial = (K, z) => {
  let re = 0, im = 0;
  const r = Math.hypot(z.re, z.im), a = Math.atan2(z.im, z.re);
  for (let j = 0; j <= K; j++) {
    const sign = j === K ? 1 : -1;
    re += sign * r ** j * Math.cos(j * a); im += sign * r ** j * Math.sin(j * a);
  }
  return Math.hypot(re, im);
};
// Transfer automaton counts states by the current suffix run, without a Bonacci recurrence.
function wordCounts(K, n) {
  let runs = Array(K).fill(0); runs[0] = 1;
  const counts = [1];
  for (let q = 1; q <= n; q++) {
    runs = [runs.reduce((a, b) => a + b, 0), ...runs.slice(0, -1)];
    counts.push(runs.reduce((a, b) => a + b, 0));
  }
  return counts;
}
function legalWords(K, n) {
  return Array.from({ length: 2 ** n }, (_, i) => n ? i.toString(2).padStart(n, '0') : '')
    .filter(w => !w.includes('1'.repeat(K)));
}
const terminal = w => w.match(/1*$/)[0].length;
const initial = w => w.match(/^1*/)[0].length;
const OBS = ['tau', 'd0', 'd1', 'd2', 'd3'];
function escapeCount(words, selected) {
  const buckets = new Map();
  for (const w of words) {
    const key = selected.map(id => id === 'tau' ? terminal(w) : w[Number(id[1])]).join(':');
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }
  return [...buckets.values()].reduce((n, m) => n + m * (m - 1), 0);
}
// Fixed-point iteration is independent of the page's interval solver.
let thetaStar = 1;
for (let i = 0; i < 200; i++) thetaStar = Math.cos(thetaStar);

const page = await T.goto(BOOK, ID, '?lang=zh');
await page.waitForFunction(() => !!window.RAUZY_SANDTABLE_DEBUG);
const state = async () => { await settle(page); return page.evaluate(() => window.RAUZY_SANDTABLE_DEBUG.state); };
const pause = async p => {
  await p.evaluate(() => { const b = document.querySelector('#play'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
};
const pick = async id => { await page.click(`[data-preset="${id}"]`); await pause(page); return state(); };
const seek = async t => {
  await page.evaluate(x => window.RAUZY_SANDTABLE_DEBUG.seek(x), t);
  await page.waitForFunction(x => Math.abs(window.RAUZY_SANDTABLE_DEBUG.t - x) < 1e-10, t);
  return state();
};
const input = async (selector, value) => { await page.locator(selector).fill(String(value)); await page.dispatchEvent(selector, 'input'); await settle(page); };
let s = await state();
check('opening frame: Clifford sandtable, K=3, Q=11, paused', s.preset === 'clifford' && s.view === 'sand' && s.K === 3 && s.Q === 11 && !s.playing);

let previousRoot = 1, previousEntropy = 0;
for (let K = 2; K <= 8; K++) {
  const root = perron(K);
  const got = await page.evaluate(k => window.RAUZY_SANDTABLE_DEBUG.roots(k), K);
  check(`K=${K}: independent φ_K solver, polynomial, 2−φ_K^(−K)=φ_K, increasing roots below 2`,
    near(got.beta, root) && polynomial(K, { re: got.beta, im: 0 }) < 1e-10
    && near(2 - root ** -K, got.beta) && root > previousRoot && root < 2, JSON.stringify({ got: got.beta, root }));
  previousRoot = root;
  const all = [{ re: root, im: 0 }, ...got.conj];
  const sumRe = all.reduce((n, z) => n + z.re, 0), sumIm = all.reduce((n, z) => n + z.im, 0);
  check(`K=${K}: all K−1 distinct conjugates solve P_K and contract inside the unit circle`,
    got.conj.length === K - 1 && got.conj.every(z => near(z.abs, Math.hypot(z.re, z.im)) && z.abs > 0 && z.abs < 1 && polynomial(K, z) < 1e-10)
    && all.every((z, i) => all.slice(i + 1).every(w => Math.hypot(z.re - w.re, z.im - w.im) > 1e-6))
    && near(sumRe, 1) && near(sumIm, 0), JSON.stringify(got));
  await page.click(`[data-k="${K}"]`); s = await state();
  const counts = wordCounts(K, s.admissibleCounts.length - 1);
  check(`K=${K}: F_(n+2)^(K) counts match suffix automaton at every available n, including n=0 and n<K`,
    same(s.admissibleCounts, counts) && s.admissibleCount === counts[s.Q], JSON.stringify(s.admissibleCounts));
  for (const n of [0, 1, K - 1, K, 10]) {
    const words = await page.evaluate(([k, q]) => window.RAUZY_SANDTABLE_DEBUG.words(k, q), [K, n]);
    const ref = legalWords(K, n), actual = words.map(w => w.word).sort();
    check(`K=${K}, n=${n}: exhaustive forbidden 1^K language, no omissions or duplicates`,
      same(actual, ref.sort()) && actual.length === counts[n], `${actual.length} versus ${ref.length}`);
  }
  // Renewal cycles have lengths 1…K and probabilities φ^(-length). Occupation
  // of suffix j is P(length>j)/E(length); sign symmetry divides it by two.
  const probs = Array.from({ length: K }, (_, i) => root ** (-i - 1));
  const mean = probs.reduce((n, p, i) => n + (i + 1) * p, 0);
  const occupancy = probs.map((_, j) => probs.slice(j).reduce((a, b) => a + b, 0) / mean);
  const hReturn = -probs.reduce((n, p) => n + p * Math.log2(p), 0), hShift = hReturn / mean;
  const weights = s.parryWeights;
  check(`K=${K}: Parry parameter, independent renewal occupation, normalized stationary signed law`,
    near(s.parryParam, 1 / root) && near(weights.total, 1) && near(weights.rootSum, 1)
    && weights.states.length === 2 * K && weights.states.every(x => near(x.mass, occupancy[x.j] / 2))
    && weights.byRun.every((p, j) => near(p, occupancy[j]))
    && weights.stationarityMaxErr < 1e-12 && weights.rowSumMaxErr < 1e-12 && weights.flipMaxErr < 1e-12);
  const muReset = weights.byRun[0];
  check(`K=${K}: renewal entropy log₂φ_K and Abramov h(return)=h(shift)/μ(reset)`,
    near(hShift, Math.log2(root)) && near(hReturn, Math.log2(s.perronRoot) / muReset)
    && hShift > previousEntropy && hShift < 1, JSON.stringify({ hReturn, hShift, muReset }));
  previousEntropy = hShift;
}

await pick('rauzy'); await seek(8); s = await state();
const beta3 = perron(3), alphaRe = (1 - beta3) / 2, alphaAbs = 1 / Math.sqrt(beta3);
const alphaIm = Math.sqrt(alphaAbs ** 2 - alphaRe ** 2);
check('Tribonacci α₂ matches the independent quadratic factor; |α₂|=φ₃^(−1/2)<1',
  near(s.rauzyBranches.alpha.re, alphaRe) && near(s.rauzyBranches.alpha.im, alphaIm) && near(s.alphaAbs, alphaAbs));
const image = (w, z) => [...w].reduce((sum, digit, j) => {
  const r = Math.hypot(z.re, z.im), a = Math.atan2(z.im, z.re);
  return [sum[0] + Number(digit) * r ** j * Math.cos(j * a), sum[1] + Number(digit) * r ** j * Math.sin(j * a)];
}, [0, 0]);
const cloud = await page.evaluate(() => window.RAUZY_SANDTABLE_DEBUG.words(3, 8));
const branchCounts = [0, 0, 0];
for (const w of cloud) branchCounts[initial(w.word)]++;
check('every sampled word has independently evaluated expanding physical and contracting internal images', cloud.every(w => {
  const a = image(w.word, { re: alphaRe, im: alphaIm }), b = image(w.word, { re: beta3, im: 0 });
  return near(w.re, a[0]) && near(w.im, a[1]) && near(w.ph, b[0], 1e-9) && w.branch === initial(w.word);
}) && same(branchCounts, s.rauzyBranches.counts));
check('Rauzy prefixes 0 / 10 / 110 have the three affine contractions α, α², α³', s.rauzyBranches.maps.every((m, i) => {
  const prefix = ['0', '10', '110'][i], shift = image(prefix, { re: alphaRe, im: alphaIm });
  const scale = image('0'.repeat(prefix.length) + '1', { re: alphaRe, im: alphaIm });
  return m.prefix === prefix && near(m.shift.re, shift[0]) && near(m.shift.im, shift[1])
    && near(m.scale.re, scale[0]) && near(m.scale.im, scale[1]) && near(s.rauzyBranches.contraction[i], alphaAbs ** (i + 1));
}));
await pick('self-reference'); s = await state();
check('Dottie θ*: independent cosine iteration, fixed-point residual, distinct α modulus and relative gap',
  near(s.thetaStar, thetaStar, 2e-15) && near(Math.cos(s.thetaStar), s.thetaStar, 2e-15)
  && s.thetaStar > s.alphaAbs && near(s.relDiffPct, 100 * (thetaStar - alphaAbs) / thetaStar)
  && s.relDiffPct > 0.23 && s.relDiffPct < 0.24);
let cosine = 0;
for (let n = 0; n <= 24; n++) {
  const got = await page.evaluate(i => window.RAUZY_SANDTABLE_DEBUG.cos(i), n);
  check(`cosine trace n=${n} follows cos iteration`, near(got, cosine)); cosine = Math.cos(cosine);
}

await pick('entropy');
for (const K of [2, 3, 4, 8]) {
  await page.click(`[data-k="${K}"]`);
  const arena = legalWords(K, 4), denom = arena.length * (arena.length - 1);
  const unique = Object.fromEntries(OBS.map(id => [id, escapeCount(arena, OBS.filter(o => o !== id))]));
  let last = denom;
  for (let step = 0; step <= 10; step++) {
    s = await seek(step);
    const selected = step <= 5 ? OBS.slice(0, step) : OBS.filter((_, i) => i !== step - 6);
    const count = escapeCount(arena, selected), e = s.escape;
    check(`K=${K}, EscapePairs step=${step}: independent ordered-pair buckets, diagonal exclusion, boundary and leave-one-out counts`,
      e.step === step && e.q === arena.length && same(e.arena.slice().sort(), arena.slice().sort())
      && same(e.selected, selected) && e.removed === (step <= 5 ? null : OBS[step - 6])
      && e.count === count && e.denom === denom && near(e.rate, count / denom)
      && same(e.unique, unique) && s.escapeCount === count && s.escapeDenom === denom
      && (step > 5 || count <= last) && (step !== 0 || count === denom) && (step !== 5 || count === 0), JSON.stringify({ e, count }));
    last = count;
  }
}
check('entropy evidence keeps log₂β and Abramov in the literature tier',
  (await page.locator('.lean.argued[data-views="entropy"]').innerText()).includes('log₂')
  && (await page.locator('.lean.argued[data-views="entropy"]').textContent()).includes('Abramov'));

await pick('padic'); s = await state();
check('p-adic first split: 34−7=27=3³, first distinct residue at precision 4',
  s.padic.v === 3 && s.padic.first === 4 && 7 % 27 === 34 % 27 && 7 % 81 !== 34 % 81);
await input('#py', 7); s = await state();
check('equal p-adic integers have distance zero and no first split', s.padic.first === null && s.padic.d.xy === 0);
await pick('entanglement'); s = await state();
const caps = s.encoderCaps, left = legalWords(3, 4).filter(w => w[0] === '1'), right = legalWords(3, 5).filter(w => w[0] === '1');
const forbidden = left.reduce((n, x) => n + right.filter(y => (x + y).includes('111')).length, 0);
check('direct encoder boundary counts and attainable rank caps: N=2,K=3,mX=4,mY=5',
  caps.forbidden === forbidden && same(caps.R, [6, 5]) && same(caps.M, [2, 1]));
for (const t of [0, Math.floor(s.max / 2), s.max]) {
  s = await seek(t);
  check(`cut pair ${t}: concatenation oracle agrees with τ(x)+ι(y)<K`,
    s.cut.legal === !(s.cut.x + s.cut.y).includes('111') && s.cut.tau === terminal(s.cut.x) && s.cut.iota === initial(s.cut.y));
}

// All published cards at every viewport × language × theme combination.
for (const [kind, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['embed', 780, 500]]) {
  for (const lang of ['zh', 'en']) for (const theme of ['dark', 'light']) {
    const p = await T.open(BOOK, ID, `?lang=${lang}&preset=${PRESETS[0]}${kind === 'embed' ? '&embed=1' : ''}`, { viewport: { width, height } });
    await p.emulateMedia({ colorScheme: theme });
    await p.waitForFunction(() => !!window.RAUZY_SANDTABLE_DEBUG); await pause(p);
    for (let i = 0; i < PRESETS.length; i++) {
      if (i) { await p.click(kind === 'embed' ? '[data-tour="next"]' : `[data-preset="${PRESETS[i]}"]`); await pause(p); }
      // Render a populated finite cloud even when no animation frame has arrived.
      await p.evaluate(() => window.RAUZY_SANDTABLE_DEBUG.seek(window.RAUZY_SANDTABLE_DEBUG.max));
      await p.evaluate(() => window.scrollTo(0, 0)); await settle(p);
      const info = await p.evaluate(embed => {
        const r = document.querySelector('#stage').getBoundingClientRect(), tour = document.querySelector('#tour').getBoundingClientRect();
        const a = document.querySelector('.hud-tl').getBoundingClientRect(), b = document.querySelector('.hud-tr').getBoundingClientRect();
        const cv = document.querySelector('#cv'), cr = cv.getBoundingClientRect();
        return { preset: window.RAUZY_SANDTABLE_DEBUG.preset, view: window.RAUZY_SANDTABLE_DEBUG.view,
          theme: matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark', lang: document.documentElement.dataset.lang,
          overflow: Math.max(document.documentElement.scrollWidth - innerWidth, document.body.scrollWidth - document.body.clientWidth),
          share: r.width * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / (innerWidth * innerHeight),
          order: r.top < document.querySelector('.deck').getBoundingClientRect().top,
          fits: tour.bottom <= innerHeight + 1 && r.bottom <= tour.top + 1,
          hud: a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top,
          canvas: cv.width > 0 && cv.height > 0 && Math.abs(cr.width - r.width) < 3,
          pressed: document.querySelector(`[data-preset="${window.RAUZY_SANDTABLE_DEBUG.preset}"]`).getAttribute('aria-pressed'),
          note: document.querySelector(embed ? '.tour .what' : '#presetNote').textContent.trim().length };
      }, kind === 'embed');
      const tag = `${kind} ${width}×${height} ${lang}/${theme} ${PRESETS[i]}`;
      check(`${tag}: card, view, color preference and rendered stage`, info.preset === PRESETS[i] && info.view === VIEWS[i] && info.theme === theme && info.lang === lang
        && info.pressed === 'true' && info.note > 8 && info.canvas && (await inkShare(p, '#cv')) > 0.01, JSON.stringify(info));
      check(`${tag}: stage-first geometry and HUD separation`, info.overflow <= 0 && info.hud
        && info.share >= (kind === 'embed' ? 0.6 : 0.28) && (kind !== 'mobile' || info.order) && (kind !== 'embed' || info.fits), JSON.stringify(info));
      if (lang === 'en') { const bad = await cjkLeftovers(p); check(`${tag}: English is complete`, bad.length === 0, bad.slice(0, 3).join(' | ')); }
    }
    await p.context().close();
  }
}

await pick('clifford'); await seek(0);
await page.locator('#now').focus(); await page.keyboard.press('ArrowRight'); await settle(page); s = await state();
check('focused rail keyboard advances depth', s.t > 0 && !s.playing);
await input('#qmax', 10); s = await state();
check('word-length control refits the rail and clears the named card', s.Q === 10 && s.max === 10 && s.preset === null);
await page.click('#rew'); s = await state(); check('rewind pauses at the start', s.t === 0 && !s.playing);
await page.locator('body').click({ position: { x: 2, y: 2 } }); await page.keyboard.press('Space');
await page.waitForFunction(() => window.RAUZY_SANDTABLE_DEBUG.playing && window.RAUZY_SANDTABLE_DEBUG.t > 0.15);
check('Space playback advances on delivered animation frames', (await state()).t > 0.15);
await page.keyboard.press('Space'); await settle(page); s = await state();
const stopped = s.t;
await settle(page); check('Space pauses without advancing the clock', !(await state()).playing && (await state()).t === stopped);
await page.click('[data-scene="plane"]'); await page.click('[data-view="roots"]'); await seek(6); s = await state();
check('scene/view controls refit the rail and roots endpoint selects K=8', s.scene === 'plane' && s.view === 'roots' && s.K === 8 && s.max === 6);
await page.click('#infoBtn'); await page.waitForFunction(() => !document.querySelector('#drawer').hidden);
await page.keyboard.press('Escape'); await page.waitForFunction(() => document.querySelector('#drawer').hidden);
check('drawer opens and closes through its controls', await page.locator('#drawer').isHidden());
check('no browser, console or network errors', T.errors.length === 0, T.errors.join(' | '));
await T.finish();
