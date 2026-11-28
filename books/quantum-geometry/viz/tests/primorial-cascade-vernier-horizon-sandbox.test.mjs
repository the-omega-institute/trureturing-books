import fs from 'node:fs';
import path from 'node:path';
import { readLock, readRegistry, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';
import {
  cjkLeftovers, labelOverlaps, openStill, overflowX, session, settle, stageFirstChecks, viewportShare
} from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'primorial-cascade-vernier-horizon-sandbox';
const SECTION = 'ch31-s08-primorial-cascade-vernier-resolution-and-finite-register-cap';
const ANCHOR = 'sec-ch31-primorial-cascade-vernier-resolution-and-finite-register-cap';
const AXIOM_FREE_BOX = 'thm-ch31-primorial-vernier-omega-axiom-free-anchors';
const AXIOM_FREE = ['fractran_step_iff', 'fractran_deterministic', 'fractran_stable']
  .map((name) => 'D5/S3/Quantum/AURICOmega/OmegaMatrixAndFractran.' + name);
const ZERO_AXIOM_CLAIM = { zh: /零公理|无公理/, en: /zero[- ]axiom|axiom-free/i };
const LANGS = ['zh', 'en'];
const CARDS = [
  { id: 'static-period-composite-refutation', scene: 'ray', rail: 8 },
  { id: 'primorial-wheel-square-horizon', scene: 'wheel', rail: 2 },
  { id: 'jit-allocator-epsilon-horizon-cap', scene: 'jit', rail: 6 },
  { id: 'rational-vernier-caliper-sphere', scene: 'vernier', rail: 5 },
  { id: 'minsky-tower-vs-lemma-shortcut', scene: 'tower', rail: 18 },
  { id: 'crt-dark-sector-and-memory-refresh', scene: 'crt', rail: 1 }
];
const HORIZONS = [3, 5, 10, 15, 20, 30, 50];
const LEDGERS = [[12, 5], [42, 11], [1716, 1715], [10648, 10647]];
const BOX_MINIMA = ['2/1', '9/8', '25/24', '126/125', '540/539', '10648/10647'];
const FULL_SUPPORT = [...BOX_MINIMA.slice(0, 5), '1716/1715'];
const CJK = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const product = (values) => values.reduce((acc, value) => acc * value, 1n);

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function leastDivisor(n) {
  for (let d = 2n; d * d <= n; d++) if (n % d === 0n) return d;
  return n;
}

function* primes() {
  for (let n = 2n; ; n++) if (leastDivisor(n) === n) yield n;
}

function primePrefix(k) {
  const stream = primes();
  return Array.from({ length: k }, () => stream.next().value);
}

function rayAt(period, residue, step) {
  const n = BigInt(residue) + BigInt(period) * BigInt(step);
  const d = leastDivisor(n);
  const isComposite = d !== n;
  return { value: String(n), isComposite, factorPair: isComposite ? [d, n / d].map(String) : null };
}

function wheelAt(k) {
  const prefix = primePrefix(k + 1);
  const next = prefix.pop();
  const modulus = product(prefix);
  const horizon = next * next;
  let totient = 0n;
  for (let n = 1n; n <= modulus; n++) if (gcd(n, modulus) === 1n) totient++;
  const inside = [];
  let errors = 0;
  for (let n = 2n; n < horizon; n++) {
    if (gcd(n, modulus) !== 1n) continue;
    inside.push(Number(n));
    if (leastDivisor(n) !== n) errors++;
  }
  let leak = 4n;
  while (gcd(leak, modulus) !== 1n || leastDivisor(leak) === leak) leak++;
  return {
    primes: prefix.map(Number), primorial: String(modulus), totient: String(totient), squareHorizon: Number(horizon),
    newPrimesInHorizon: inside, firstCompositeLeak: Number(leak), errorsInHorizon: errors
  };
}

function growTo(bound) {
  const minted = [];
  for (const prime of primes()) {
    if (prime > BigInt(bound)) {
      return { primes: minted.map(Number), nextCandidate: Number(prime), primorial: String(product(minted)), halted: true };
    }
    minted.push(prime);
  }
}

function adelicLedger(n, d) {
  const factors = new Set();
  const padic = [1n, 1n];
  for (const [index, value] of [BigInt(d), BigInt(n)].entries()) {
    let remaining = value;
    while (remaining > 1n) {
      const factor = leastDivisor(remaining);
      remaining /= factor;
      factors.add(Number(factor));
      padic[index] *= factor;
    }
  }
  const total = [BigInt(n) * padic[0], BigInt(d) * padic[1]];
  const common = gcd(...total);
  return {
    support: [...factors].sort((a, b) => a - b),
    archimedean: [n, d].map(String), padicProduct: padic.map(String), total: total.map((value) => String(value / common))
  };
}

function vernierBox(k, h) {
  const bases = primePrefix(k);
  let minimum = null;
  let witness = null;
  let count = 0n;
  const less = ([n, d], [a, b]) => n * b < a * d;
  function visit(exponents, n, d) {
    if (exponents.length === k) {
      count++;
      if (n <= d) return;
      const ratio = [n, d];
      if (!minimum || less(ratio, minimum.ratio)) minimum = { ratio, exponents };
      if (n - d === 1n && exponents.every(Boolean) && (!witness || less(ratio, witness))) witness = ratio;
      return;
    }
    const p = bases[exponents.length];
    for (let exponent = -h; exponent <= h; exponent++) {
      const power = p ** BigInt(Math.abs(exponent));
      visit([...exponents, exponent], exponent > 0 ? n * power : n, exponent < 0 ? d * power : d);
    }
  }
  visit([], 1n, 1n);
  const [n, d] = minimum.ratio;
  const shift = [n * n - d * d, 2n * (n * n + d * d)];
  const common = gcd(...shift);
  return {
    stateCount: String(count), boxMin: minimum.ratio.map(String), boxExponents: minimum.exponents,
    fullSupportWitness: witness?.map(String) ?? null, kappaShift: shift.map((value) => String(value / common))
  };
}

function primorialCap(bits) {
  const limit = 2n ** BigInt(bits);
  let modulus = 1n;
  let K = 0;
  let p = 0;
  for (const prime of primes()) {
    if (modulus * prime > limit) return { K, p };
    modulus *= prime;
    K++;
    p = Number(prime);
  }
}

const MULTIPLY = [[455, 33], [11, 13], [1, 11], [3, 7], [11, 2], [1, 3]];
const PRIMEGAME = [[17, 91], [78, 85], [19, 51], [23, 38], [29, 33], [77, 29], [95, 23],
  [77, 19], [1, 17], [11, 13], [13, 11], [15, 2], [1, 7], [55, 1]];

function runFractran(rules, n, stop) {
  const program = rules.map((ratio) => ratio.map(BigInt));
  let peak = n;
  for (let beat = 0; beat <= 1000; beat++) {
    const rule = program.find(([a, b]) => (n * a) % b === 0n);
    if (n === stop || !rule) return { beat, beats: beat, N: String(n), peak: String(peak) };
    n = n * rule[0] / rule[1];
    if (n > peak) peak = n;
  }
  throw new Error('Independent FRACTRAN run exceeded 1000 beats');
}

function crtAt(k) {
  const modulus = product(primePrefix(k));
  const x = 7n % modulus;
  const y = 37n % modulus;
  return { M: String(modulus), rx: String(x), ry: String(y), collide: x === y, g77: String(gcd(77n, modulus)) };
}

const book = resolveBook(BOOK);
const entry = readRegistry(book).visualizations.find(({ id }) => id === ID);
const ids = CARDS.map(({ id }) => id);
const lock = readLock();
const sorted = (values) => [...values].sort();
const emptyAxioms = (gid) => lock.declarations[gid]?.kind === 'theorem' && same(lock.declarations[gid]?.axioms, []);

function chapterLean(lang) {
  const chapter = fs.readFileSync(path.join(book.dir, lang, SECTION + '.md'), 'utf8');
  const split = (group) => group.split(',').map((gid) => gid.trim());
  const opening = chapter.match(new RegExp('^:::\\s*\\{\\.theorem #' + AXIOM_FREE_BOX + '\\s[^\\n]*', 'm'))?.[0] ?? '';
  const axiomFree = /\blean="([^"]+)"/.exec(opening)?.[1];
  return {
    all: [...chapter.matchAll(/\blean="([^"]+)"/g)].flatMap(([, group]) => split(group)),
    axiomFree: axiomFree ? split(axiomFree) : []
  };
}
const chapters = Object.fromEntries(LANGS.map((lang) => [lang, chapterLean(lang)]));

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

const basis = await T.page.locator('#basis [data-lean-gid]').evaluateAll((links) => links.map((link) => link.dataset.leanGid));
const evidence = await T.page.locator('#basis .lean').evaluateAll((boxes) => boxes
  .filter((box) => box.querySelector('[data-lean-gid]'))
  .map((box) => ({
    gid: box.querySelector('[data-lean-gid]').dataset.leanGid,
    green: !/(^|\s)(num|model|argued|open|frozen)(\s|$)/.test(box.className)
      && box.querySelector('.ok')?.textContent.trim() === 'LEAN ✓',
    zh: box.querySelector('.zh')?.textContent ?? '',
    en: box.querySelector('.en')?.textContent ?? ''
  })));
check('Registration is live in section 31.8 with a theory link in each language',
  entry.code === 'OMEGA//PRIMORIAL' && entry.status === 'live' && entry.chapter === 31 && entry.section === '31.8'
    && entry.theory[0].href === '../zh/' + SECTION + '.html#' + ANCHOR
    && entry.theory[0].href_en === '../en/' + SECTION + '.html#' + ANCHOR);
check('The evidence panel cites 16 distinct frozen theorems in registry order, each in a green LEAN box',
  new Set(basis).size === 16 && same(basis, entry.lean.map(({ gid }) => gid))
    && basis.every((gid) => lock.declarations[gid]?.kind === 'theorem')
    && same(evidence.map(({ gid }) => gid), basis) && evidence.every(({ green }) => green),
  JSON.stringify(evidence.filter(({ green }) => !green).map(({ gid }) => gid)));
check('Both editions cite the same 16 frozen theorems as the evidence panel, in any book order',
  LANGS.every((lang) => chapters[lang].all.length === 16 && same(sorted(chapters[lang].all), sorted(basis))),
  JSON.stringify(LANGS.map((lang) => chapters[lang].all.length)));
check('Both editions cite exactly the three FRACTRAN theorems in the axiom-free box, each with an empty axiom list at the pin',
  LANGS.every((lang) => same(chapters[lang].axiomFree, AXIOM_FREE))
    && AXIOM_FREE.every((gid) => basis.includes(gid) && emptyAxioms(gid)),
  JSON.stringify({ ...Object.fromEntries(LANGS.map((lang) => [lang, chapters[lang].axiomFree])),
    axioms: AXIOM_FREE.map((gid) => lock.declarations[gid]?.axioms) }));
for (const lang of LANGS) {
  const claims = evidence.filter((box) => ZERO_AXIOM_CLAIM[lang].test(box[lang])).map(({ gid }) => gid);
  check('In ' + lang + ' only the evidence of the axiom-free box claims zero axioms, and the pin lists none for each claim',
    same(sorted(claims), sorted(AXIOM_FREE)) && claims.every(emptyAxioms),
    JSON.stringify(claims.map((gid) => [gid.split('.').pop(), lock.declarations[gid]?.axioms])));
}
check('English registry fields use English text and contain no Han or fullwidth punctuation',
  [entry.title_en, entry.summary_en, ...entry.tags_en, entry.theory[0].label_en, ...ids.map((id) => entry.preset_titles[id].en)]
    .every((value) => /[A-Za-z]/.test(value) && !CJK.test(value)));
check('Both editions cite all six cards at 500px and the lab at 620px',
  same(entry.presets, ids) && LANGS.every((lang) => same(
    vizCitations(book, ID).filter((c) => c.lang === lang).map(({ preset, height }) => [preset || '', height]),
    [...ids.map((id) => [id, 500]), ['', 620]]
  )));

const lab = await T.open(BOOK, ID, '?lang=en', { viewport: { width: 1080, height: 900 }, reducedMotion: 'reduce' });
await settle(lab);
const snapshot = (page) => page.evaluate(() => window.__primorialVernierLab.state());
const readouts = (page) => page.locator('#evidence output').allTextContents();

async function choose(page, selector) {
  const control = page.locator(selector);
  await control.click();
  await settle(page);
  return control;
}

const chooseCard = (page, card) => choose(page, '[data-preset="' + card.id + '"]');

const rays = [];
for (let period = 1; period <= 60; period++) {
  for (let residue = 1; residue <= period; residue++) rays.push([period, residue, residue === 1 ? period + 2 : residue]);
}
const samples = [...rays, [6, 1, 0], [6, 1, 1], [6, 1, 7], [6, 5, 4], ['9007199254740993', '2', '4']];
const numeric = await lab.evaluate(({ samples, horizons, ledgers }) => {
  const api = window.__primorialVernierLab;
  return {
    rays: samples.map((args) => api.evalStaticRay(...args)),
    wheels: [1, 2, 3, 4, 5].map((k) => api.evalPrimorialWheel(k)),
    grows: horizons.map((bound) => api.growUntilHorizon(bound)),
    ledgers: ledgers.map((args) => api.finiteAdelicProduct(...args)),
    ratios: [1, 2, 3, 4, 5, 6].map((k) => api.vernierStats(k, 3)),
    bench: api.bench()
  };
}, { samples, horizons: HORIZONS, ledgers: LEDGERS });
const errors = samples.filter((args, i) => !same(numeric.rays[i], rayAt(...args)));
check('Static rays match exact BigInt values and factor pairs, including an integer beyond safe Number range',
  errors.length === 0, JSON.stringify(errors.slice(0, 4)));
check('Each of the 1830 fixed-period residue rails has a factorized composite witness',
  numeric.rays.slice(0, rays.length).every(({ isComposite, factorPair, value }) =>
    isComposite && factorPair.every((d) => BigInt(d) > 1n) && product(factorPair.map(BigInt)) === BigInt(value)));

const primeCounts = [3, 7, 12, 26, 34];
for (const [index, wheel] of numeric.wheels.entries()) {
  const k = index + 1;
  check('Wheel k=' + k + ' agrees with counted totient, open residues, and first composite',
    same(wheel, wheelAt(k)) && wheel.firstCompositeLeak === wheel.squareHorizon
      && wheel.errorsInHorizon === 0 && wheel.newPrimesInHorizon.length === primeCounts[index], JSON.stringify(wheel));
}
for (const [index, horizon] of HORIZONS.entries()) {
  check('Growth to ' + horizon + ' agrees with the prime prefix, primorial, and first rejected candidate',
    same(numeric.grows[index], growTo(horizon)), JSON.stringify(numeric.grows[index]));
}
for (const [index, ratio] of LEDGERS.entries()) {
  check('The adelic ledger of ' + ratio.join('/') + ' has the exact support and product 1/1',
    same(numeric.ledgers[index], adelicLedger(...ratio)) && same(numeric.ledgers[index].total, ['1', '1']));
}
for (const [index, vernier] of numeric.ratios.entries()) {
  const k = index + 1;
  check('Vernier K=' + k + ', H=3 agrees with exhaustive BigInt ratio ordering and kappa shift',
    same(vernier, vernierBox(k, 3)) && vernier.boxMin.join('/') === BOX_MINIMA[index]
      && vernier.fullSupportWitness?.join('/') === FULL_SUPPORT[index], JSON.stringify(vernier));
}

const multiplication = runFractran(MULTIPLY, 36n);
const primegame = runFractran(PRIMEGAME, 2n, 32n);
const { bench } = numeric;
for (const counter of ['rayBad', 'ledBad', 'bezBad', 'cfBad', 'euBad']) {
  check('Benchmark reports zero for ' + counter, bench[counter] === 0, String(bench[counter]));
}
check('Benchmark counts all fixed-period rails, register caps, and distinct Vernier states',
  bench.rays === rays.length && same(bench.kmax, HORIZONS.map((bound) => growTo(bound).primes.length))
    && bench.distinct === Number(7n ** 6n) && bench.boxSize === bench.distinct);
for (const [bits, expected] of [[256, { K: 43, p: 191 }], [327, { K: 53, p: 241 }]]) {
  check('Benchmark locates the exact primorial cap below 2^' + bits,
    same(bench['cap' + bits], primorialCap(bits)) && same(bench['cap' + bits], expected));
}
check('Benchmark matches both exact FRACTRAN traces',
  bench.multBeats === multiplication.beats && bench.multPeak === multiplication.peak
    && bench.pgBeats === primegame.beats && bench.pgBeats === 281 && bench.pgPeak === primegame.peak);
check('CRT benchmark reaches every residue tuple before the first repeat',
  same(bench.crt, [1, 2, 3, 4, 5].map((K) => {
    const prefix = primePrefix(K);
    const modulus = product(prefix);
    const tuple = (n) => prefix.map((prime) => n % prime).join(',');
    const distinct = new Set();
    for (let n = 0n; n < modulus; n++) distinct.add(tuple(n));
    return { K, M: Number(modulus), ok: distinct.size === Number(modulus) && tuple(modulus) === tuple(0n) };
  })));

const parked = {
  ray: (s) => s.m === 8 && same(s.ray, { ...rayAt(6, 1, 8), kill: 8 }) && same(s.ray.factorPair, ['7', '7']),
  wheel: (s) => s.wheelK === 3 && s.primorial === '30' && s.totient === '8' && s.squareHorizon === 49
    && s.zeroErrorsInSquareHorizon && numeric.wheels[2].newPrimesInHorizon.length === 12
    && numeric.wheels[2].errorsInHorizon === 0,
  jit: (s) => s.horizonM === 15 && s.jitStep === 6 && s.halted && same(s.activePrimes, [2, 3, 5, 7, 11, 13]),
  vernier: (s) => s.vernierK === 6 && s.vernierH === 3 && same(s.boxMinRatio, ['10648', '10647'])
    && same(s.fullSupportRatio, ['1716', '1715']) && same(s.kappaShift, ['21295', '453477026']),
  tower: (s) => same(s.tower, multiplication) && s.tower.beat === 18 && s.tower.beats === 18
    && s.tower.N === '625' && s.tower.peak === '398125',
  crt: (s) => s.crtK === 3 && same(s.crt, { M: '30', rx: '7', ry: '7', collide: true, g77: '1' })
};

function checkParked(label, card, state) {
  check(label + ' ' + card.scene + ' opens paused at its exact parked state',
    state.preset === card.id && state.scene === card.scene && state.railValue === card.rail
      && state.playing === false && parked[card.scene](state), JSON.stringify(state));
}

async function englishText(page, label) {
  const leftovers = await cjkLeftovers(page);
  const attributes = await page.locator('[aria-label], [title]').evaluateAll((nodes) => nodes
    .filter((node) => node.checkVisibility({ checkVisibilityCSS: true }) && !node.closest('.langs'))
    .flatMap((node) => [node.getAttribute('aria-label'), node.getAttribute('title')].filter(Boolean)));
  const bad = [...leftovers, ...attributes.filter((value) => CJK.test(value))];
  check(label + ' contains no visible Han or CJK fullwidth text', bad.length === 0, bad.slice(0, 4).join(' | '));
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const lang of LANGS) {
    const page = await T.open(BOOK, ID, '?lang=' + lang, { viewport, reducedMotion: 'reduce' });
    const label = lang + ' ' + viewport.width + 'x' + viewport.height;
    await settle(page);
    check(label + ' stage fits without horizontal overflow', await overflowX(page) === 0 && await viewportShare(page, '#stage') >= 0.28);
    for (const card of CARDS) {
      await chooseCard(page, card);
      checkParked(label, card, await snapshot(page));
      if (lang === 'en') await englishText(page, label + ' ' + card.scene);
    }
    await choose(page, '#infoBtn');
    check(label + ' opens the theory drawer', await page.locator('#drawer').isVisible());
    if (lang === 'en') await englishText(page, label + ' theory drawer');
    await page.keyboard.press('Escape');
    check(label + ' closes the theory drawer with Escape', await page.locator('#drawer').isHidden());
    await page.context().close();
  }
}

async function dial(group, attribute, value, expected) {
  const chip = await choose(lab, '#' + group + ' [data-' + attribute + '="' + value + '"]');
  const state = await snapshot(lab);
  check(group + ' selects ' + value + ' and changes the paused state',
    await chip.getAttribute('aria-pressed') === 'true' && state.playing === false && expected(state), JSON.stringify(state));
}

for (const period of [10, 30, 6]) {
  await dial('tChips', 'period', period, (s) =>
    s.scene === 'ray' && s.T === period && s.m === period + 2
    && same(s.ray, { ...rayAt(period, 1, period + 2), kill: period + 2 }));
}
for (const residue of [5, 1]) {
  const step = residue === 1 ? 8 : 5;
  await dial('rChips', 'start', residue, (s) =>
    s.scene === 'ray' && s.r === residue && s.m === step && same(s.ray, { ...rayAt(6, residue, step), kill: step }));
}
for (const [index, expected] of numeric.wheels.entries()) {
  await dial('kChips', 'wheel', index + 1, (s) =>
    s.scene === 'wheel' && s.wheelK === index + 1 && same(s.activePrimes, expected.primes)
    && s.primorial === expected.primorial && s.totient === expected.totient && s.squareHorizon === expected.squareHorizon);
}
for (const horizon of HORIZONS) {
  const expected = growTo(horizon);
  await dial('mChips', 'horizon', horizon, (s) =>
    s.scene === 'jit' && s.horizonM === horizon && s.jitStep === expected.primes.length && s.halted
    && same(s.activePrimes, expected.primes) && s.primorial === expected.primorial);
}
for (const [index, ratio] of LEDGERS.entries()) {
  const expected = adelicLedger(...ratio);
  await dial('aChips', 'adelic', index, (s) => s.scene === 'jit' && same(s.adelicProduct, expected.total));
  check('The selected ledger displays the input ratio ' + ratio.join('/'),
    (await lab.locator('#roJit').textContent()).includes(ratio.join('/') + ' × ' + expected.padicProduct.join('/') + ' = 1'));
}
for (const [index, stats] of numeric.ratios.entries()) {
  await dial('vkChips', 'vk', index + 1, (s) =>
    s.scene === 'vernier' && s.vernierK === index + 1 && s.vernierH === 3 && same(s.boxMinRatio, stats.boxMin));
}
for (const h of [1, 2, 3]) {
  const stats = vernierBox(6, h);
  await dial('vhChips', 'vh', h, (s) =>
    s.scene === 'vernier' && s.vernierK === 6 && s.vernierH === h && s.stateCount === stats.stateCount
    && same(s.boxMinRatio, stats.boxMin) && same(s.fullSupportRatio, stats.fullSupportWitness));
}
for (const [mode, expected] of [['primegame', primegame], ['multiply', multiplication]]) {
  await dial('pChips', 'prog', mode, (s) => s.scene === 'tower' && s.shortcutMode === mode && same(s.tower, expected));
}
for (const k of [2, 3, 4, 5, 6, 10]) {
  await dial('cChips', 'crt', k, (s) =>
    s.scene === 'crt' && s.crtK === k && same(s.crt, crtAt(k)) && s.stateCount === String(7n ** BigInt(k))
    && s.crtInjectiveUpTo === String(BigInt(s.crt.M) - 1n));
}

await chooseCard(lab, CARDS[0]);
const handle = lab.locator('#stageHandle');
await handle.scrollIntoViewIfNeeded();
const from = await handle.boundingBox();
const to = await lab.evaluate(() => window.__primorialVernierLab.dragTarget(3));
await lab.mouse.move(from.x + from.width / 2, from.y + from.height / 2);
await lab.mouse.down();
await lab.mouse.move(to.x, to.y, { steps: 8 });
await lab.mouse.up();
await settle(lab);
const dragged = await snapshot(lab);
check('Dragging the stage handle to rail step 3 updates the exact ray without playing',
  dragged.m === 3 && dragged.railValue === 3 && dragged.playing === false
    && same(dragged.ray, { ...rayAt(6, 1, 3), kill: 8 }), JSON.stringify(dragged));

function numericState({ lens, lensT, view, cam, ...state }) {
  return state;
}

const canvasPixels = (page) => page.evaluate(() => {
  window.TRV.kit.flush();
  return document.querySelector('#stage canvas.solid-gl').toDataURL();
});

for (const card of CARDS) {
  await chooseCard(lab, card);
  const fixed = numericState(await snapshot(lab));
  const before = await readouts(lab);
  let pixels = await canvasPixels(lab);
  check(card.scene + ' lens badge is a paragraph with the initial lens reading',
    await lab.locator('#lensBadge').evaluate((badge) => badge.localName === 'p' && badge.dataset.lens === '0'));
  for (const [selector, lens] of [['#lensToggleBtn', 1], ['#lensMirror', 0]]) {
    await choose(lab, selector);
    const state = await snapshot(lab);
    const badges = await lab.evaluate(() => ({
      pressed: ['lensToggleBtn', 'lensMirror'].map((id) => document.getElementById(id).getAttribute('aria-pressed')),
      badge: document.getElementById('lensBadge').dataset.lens
    }));
    const nextPixels = await canvasPixels(lab);
    check(card.scene + ' ' + selector + ' synchronizes both buttons and the badge at Lens ' + lens,
      state.lens === lens && state.lensT === lens && same(badges.pressed, Array(2).fill(String(lens === 1)))
      && badges.badge === String(lens));
    check(card.scene + ' ' + selector + ' changes canvas pixels and preserves numerical state and readouts',
      pixels !== nextPixels && same(numericState(state), fixed) && same(await readouts(lab), before));
    pixels = nextPixels;
  }
}
await lab.context().close();

for (const lang of LANGS) {
  for (const card of CARDS) {
    const page = await openStill(T, BOOK, ID, card.id, lang);
    const label = lang + ' still';
    checkParked(label, card, await snapshot(page));
    check(label + ' ' + card.scene + ' hides the stage handle', await page.locator('#stageHandle').isHidden());
    const overlaps = await labelOverlaps(page, '#stage .tag', 0);
    check(label + ' ' + card.scene + ' has no overlapping stage labels',
      overlaps.length === 0, JSON.stringify(overlaps.slice(0, 4)));
    if (lang === 'en') await englishText(page, label + ' ' + card.scene);
    await page.context().close();
  }
}

check('Zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('Zero console, page, or request errors', T.errors.length === 0, T.errors.slice(0, 8).join(' | '));
await T.finish();
