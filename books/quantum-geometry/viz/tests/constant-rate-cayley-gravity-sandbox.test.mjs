import fs from 'node:fs';
import path from 'node:path';
import { readLock, readRegistry, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';
import { labelOverlaps, openStill, overflowX, session, settle, stageFirstChecks, viewportShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'constant-rate-cayley-gravity-sandbox';
const SECTION = 'ch38-s16-constant-info-rate-observer-and-rational-cayley-gravity';
const LANGS = ['zh', 'en'];
const CARDS = [
  { id: 'phonograph-needle-static-wave-grooves', scene: 'groove', still: 3, key: '21/10' },
  { id: 'constant-bandwidth-cayley-clock-gear', scene: 'gear', still: 8, key: '3/20 + 1/10 + 3/4' },
  { id: 'isotropic-rational-landmarks-vs-radical', scene: 'land', still: 3, key: '4/3' },
  { id: 'horizon-io-saturation-clock-stall', scene: 'horizon', still: 10, key: 'Δτ/Δt = 0' },
  { id: 'differential-decoding-wavefront-refraction', scene: 'wave', still: 8, key: '411/4000' }
];
const [groove, gear, land, horizon, wave] = CARDS;
const READOUTS = '#roKey, #roGroove, #roGear, #roClock, #roLand, #roWave';
const CJK = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Form expected values from integer inputs and compare the exact, reduced pairs.
function fraction(n, d = 1n) {
  let a = n < 0n ? -n : n;
  let b = d;
  while (b) [a, b] = [b, a % b];
  return [n / a, d / a];
}

const ONE = fraction(1n);
const ZERO = fraction(0n);
const add = ([a, b], [c, d]) => fraction(a * d + b * c, b * d);
const subtract = ([a, b], [c, d]) => fraction(a * d - b * c, b * d);
const multiply = ([a, b], [c, d]) => fraction(a * c, b * d);
const rate = ([p, q]) => fraction(q - p, q + p);
const mass = ([p, q]) => fraction(4n * p * q, (p + q) ** 2n);
const exact = (reported, expected) => same(reported, expected?.map(String) ?? null);
const name = ([n, d]) => d === 1n ? String(n) : n + '/' + d;

function isSquare(n) {
  for (let root = 0n; root * root <= n; root++) if (root * root === n) return true;
  return false;
}

async function visibleCjk(page, canvasText = []) {
  const text = await page.evaluate(() => {
    const found = [document.title];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      const value = node.textContent.trim();
      if (!value || (value === '中' && el.closest('.langs button[data-lang-set="zh"]'))) continue;
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      range.selectNodeContents(node);
      if ([...range.getClientRects()].some(({ width, height }) => width && height)) found.push(value);
    }
    for (const el of document.querySelectorAll('[aria-label], [title]')) {
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      for (const attr of ['aria-label', 'title']) if (el.hasAttribute(attr)) found.push(el.getAttribute(attr));
    }
    return found;
  });
  return [...new Set([...text, ...canvasText].filter((value) => CJK.test(value)))];
}

async function observeDrawing(page) {
  await page.evaluate(() => {
    const solid = window.TRV.solids[0];
    const trace = window.gravityTestDrawing = { marks: [], text: [] };
    const begin = solid.begin.bind(solid);
    solid.begin = (...args) => {
      trace.marks = [];
      trace.text = [];
      return begin(...args);
    };
    for (const method of ['surface', 'glass', 'tube', 'line', 'arrow', 'ring', 'bead', 'poly', 'tag']) {
      const draw = solid[method].bind(solid);
      solid[method] = (...args) => {
        const options = args.at(-1);
        const key = options?.key ?? (typeof args[0] === 'string' ? args[0] : null);
        trace.marks.push({
          method, key, colors: [options?.color, options?.grid?.color, ...(options?.colors ?? [])].filter(Boolean)
        });
        return draw(...args);
      };
    }
    for (const method of ['fillText', 'strokeText']) {
      const context = CanvasRenderingContext2D.prototype;
      const draw = context[method];
      context[method] = function (value, ...args) {
        if (this.canvas.matches('#plot, #plotB')) trace.text.push(String(value));
        return draw.call(this, value, ...args);
      };
    }
    window.dispatchEvent(new Event('resize'));
  });
  await settle(page);
}

const snapshot = (page) => page.evaluate(() => window.__constantRateGravityLab.getState());
const readouts = (page) => page.locator(READOUTS).allTextContents();

async function choose(page, selector) {
  await page.locator(selector).click();
  await settle(page);
}

async function chooseCard(page, card) {
  await choose(page, '[data-preset="' + card.id + '"]');
}

async function lensState(page) {
  return page.evaluate(() => {
    const { lens, lensT } = window.__constantRateGravityLab.state;
    return {
      lens, lensT,
      pressed: ['lensToggleBtn', 'lensMirror'].map((id) => document.getElementById(id).getAttribute('aria-pressed')),
      badge: document.getElementById('lensBadge').dataset.lens
    };
  });
}

const expectedLens = (value) => ({
  lens: value, lensT: value, pressed: Array(2).fill(String(value === 1)), badge: String(value)
});

const book = resolveBook(BOOK);
const entry = readRegistry(book).visualizations.find((item) => item.id === ID);
const ids = CARDS.map(({ id }) => id);
const source = path.join(book.dir, 'viz', ID);
const lock = readLock();
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

const basis = await T.page.locator('#basis [data-lean-gid]').evaluateAll((links) => links.map((link) => link.dataset.leanGid));
const chapterGids = LANGS.map((lang) => {
  const chapter = fs.readFileSync(path.join(book.dir, lang, SECTION + '.md'), 'utf8');
  return [...chapter.matchAll(/#thm-ch38-constant-rate-(?:omega-axiom-free|qram-speedlimit)-anchors [^\n]*\blean="([^"]+)"/g)]
    .flatMap(([, gids]) => gids.split(','));
});
check('registration: OMEGA//BANDWIDTH is live in Chapter 38 §38.16',
  entry.code === 'OMEGA//BANDWIDTH' && entry.status === 'live' && entry.chapter === 38 && entry.section === '38.16');
check('registration: the registry and both chapter editions preserve the ordered 16 frozen theorems',
  new Set(basis).size === 16 && same(basis, entry.lean.map(({ gid }) => gid))
    && chapterGids.every((gids) => same(gids, basis))
    && basis.every((gid) => lock.declarations[gid]?.kind === 'theorem'));
check('registration: English metadata contains no Han or CJK punctuation',
  [entry.title_en, entry.summary_en, ...entry.tags_en, ...ids.map((id) => entry.preset_titles[id].en)]
    .every((value) => /[A-Za-z]/.test(value) && !CJK.test(value)));
check('registration: both editions cite each card at 540px and the full lab at 620px',
  same(entry.presets, ids) && LANGS.every((lang) => {
    const citations = vizCitations(book, ID).filter((citation) => citation.lang === lang);
    return same(citations.map(({ preset, height }) => [preset || '', height]),
      [...ids.map((id) => [id, 540]), ['', 620]]);
  }));

const css = fs.readFileSync(path.join(source, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(source, 'main.js'), 'utf8');
check('tokens: local source declares no literal hex colors',
  !/[:(,]\s*#[\da-f]{3,8}\b/i.test(css) && !/['"]#[\da-f]{3,8}['"]/i.test(js));

const viewportSizes = [{ width: 1440, height: 900 }, { width: 390, height: 844 }];
// The shared lab offers one palette. Exercise the browser's two color-scheme preferences.
for (const viewport of viewportSizes) {
  for (const colorScheme of ['dark', 'light']) {
    for (const lang of LANGS) {
      const page = await T.open(BOOK, ID, '?lang=' + lang, { viewport, reducedMotion: 'reduce' });
      await page.emulateMedia({ colorScheme });
      await observeDrawing(page);
      const label = [lang, colorScheme, viewport.width + '×' + viewport.height].join(' ');
      check(label + ': localized stage fits without horizontal overflow',
        await page.evaluate((scheme) => matchMedia('(prefers-color-scheme: ' + scheme + ')').matches, colorScheme)
          && await overflowX(page) === 0 && await viewportShare(page, '#stage') >= 0.28);
      for (const card of CARDS) {
        await chooseCard(page, card);
        for (const value of [0, 1]) {
          if (value === 1) await choose(page, '#lensToggleBtn');
          const at = label + ' ' + card.scene + ' Lens ' + value;
          const overlaps = await labelOverlaps(page, '#stage .tag', 0);
          check(at + ': no overlapping stage labels', overlaps.length === 0, JSON.stringify(overlaps.slice(0, 4)));
          const { marks, palette, controls, text } = await page.evaluate(() => {
            const { amber, ok, warn } = window.TRV.palette;
            const { marks, text } = window.gravityTestDrawing;
            const handle = document.querySelector('#stageHandle');
            const active = document.querySelector('.preset[aria-pressed="true"]');
            const sections = [...document.querySelectorAll('#lensToggleBtn .seg')];
            const focus = getComputedStyle(handle).borderTopColor;
            return {
              marks, text, palette: { amber, ok, warn },
              controls: {
                handle: !handle.hidden && focus === getComputedStyle(document.querySelector('#legend .sw.am')).backgroundColor,
                active: Boolean(active) && getComputedStyle(active).borderTopColor === focus,
                segments: sections.map((segment) => getComputedStyle(segment).backgroundColor === focus)
              }
            };
          });
          const amber = marks.filter(({ colors }) => colors.includes(palette.amber)).map(({ method, key }) => method + ':' + key);
          const reserved = marks.filter(({ colors }) => colors.includes(palette.ok) || colors.includes(palette.warn));
          check(at + ': amber marks the focus and selections, green/red stay off the geometry',
            amber.includes('ring:focus') && amber.every((mark) => mark === 'ring:focus')
              && reserved.length === 0 && controls.handle && controls.active && same(controls.segments, [value === 0, value === 1]),
            JSON.stringify({ amber, reserved, controls }));
          if (lang === 'en') {
            const bad = await visibleCjk(page, text);
            check(at + ': no visible Han or CJK punctuation', bad.length === 0, bad.slice(0, 4).join(' | '));
          }
        }
        await choose(page, viewport.width <= 1080 ? '#lensMirror' : '#lensToggleBtn');
      }
      await choose(page, '#infoBtn');
      check(label + ': the theory drawer opens', await page.locator('#drawer').isVisible());
      if (lang === 'en') {
        const bad = await visibleCjk(page);
        check(label + ': the open drawer has no visible Han or CJK punctuation', bad.length === 0, bad.slice(0, 4).join(' | '));
      }
      const evidence = await page.locator('#drawerEvidence .lean').evaluateAll((boxes) => boxes.map((box) => {
        const badge = box.querySelector('.ok');
        const color = getComputedStyle(badge).color;
        const sample = document.createElement('span');
        box.append(sample);
        sample.style.color = 'var(--ok)';
        const green = color === getComputedStyle(sample).color;
        sample.style.color = 'var(--warn)';
        const red = color === getComputedStyle(sample).color;
        sample.remove();
        return { green, red, open: box.classList.contains('open'), gid: box.querySelector('[data-lean-gid]')?.dataset.leanGid };
      }));
      check(label + ': green identifies only frozen theorems and red only OPEN',
        same(evidence.filter(({ green }) => green).map(({ gid }) => gid), basis)
          && evidence.every(({ red, open }) => red === open));
      await page.keyboard.press('Escape');
      check(label + ': Escape closes the theory drawer', await page.locator('#drawer').isHidden());
      await page.context().close();
    }
  }
}

const lab = await T.open(BOOK, ID, '?lang=en', { viewport: { width: 1080, height: 900 }, reducedMotion: 'reduce' });
await settle(lab);
await chooseCard(lab, groove);
const beforeLens = await readouts(lab);
check('the lens badge is a non-focusable paragraph with the initial lens reading',
  await lab.locator('#lensBadge').evaluate((badge) => badge.localName === 'p' && badge.tabIndex === -1 && badge.dataset.lens === '0'));
for (const [selector, value] of [['#lensToggleBtn', 1], ['#lensMirror', 0]]) {
  await choose(lab, selector);
  const actual = await lensState(lab);
  check(selector + ' switches to Lens ' + value + ' and synchronizes all lens indicators',
    same(actual, expectedLens(value)), JSON.stringify(actual));
  check(selector + ' preserves the numeric readouts', same(await readouts(lab), beforeLens));
}

const addresses = [[1n, 5n], [1n, 4n], [1n, 3n], [1n, 2n]];
const expectedMemory = [[2n, 3n], [3n, 5n], [1n, 2n], [1n, 3n]];
const memory = await lab.evaluate(() => window.__constantRateGravityLab.core.memory());
check('groove: the exact memory is [2/3, 3/5, 1/2, 1/3]',
  expectedMemory.every((value, i) => exact(memory[i], value)) && memory.length === expectedMemory.length);
let register = ZERO;
for (const [address, mu] of addresses.entries()) {
  const value = rate(mu);
  register = add(register, value);
  await choose(lab, '[data-addr="' + address + '"]');
  const recorded = (await snapshot(lab)).groove;
  const output = await readouts(lab);
  check('groove: μ = ' + name(mu) + ' adds ' + name(value) + ' to the register with zero groove writes',
    recorded.exact && recorded.ptr === address && exact(recorded.mu.q, mu) && exact(recorded.D.q, value)
      && exact(recorded.reg.q, register) && recorded.grooves === 0
      && output[1] === [address, name(value), name(register), address + ' / 0 / ' + (4 * address)].join(' · '));
  await choose(lab, '#lensMirror');
  check('groove: both lenses keep the same exact query and readouts at address ' + address,
    same(await lensState(lab), expectedLens(1)) && same((await snapshot(lab)).groove, recorded) && same(await readouts(lab), output));
  await choose(lab, '#lensToggleBtn');
}

await chooseCard(lab, gear);
for (const [mi, mu] of [[0n, 1n], [1n, 4n], [1n, 3n], [1n, 2n]].entries()) {
  await choose(lab, '[data-mu="' + mi + '"]');
  for (const [bi, beta2] of [ZERO, [2n, 5n]].entries()) {
    await choose(lab, '[data-beta="' + bi + '"]');
    const recorded = (await snapshot(lab)).gear;
    const km = mass(mu);
    const remaining = subtract(ONE, km);
    const kinetic = multiply(remaining, beta2);
    const self = multiply(remaining, subtract(ONE, beta2));
    const shares = [recorded.self.q, recorded.kin.q, recorded.km.q];
    const total = shares.map((value) => value.map(BigInt)).reduce(add, ZERO);
    check('gear: μ = ' + name(mu) + ', β² = ' + name(beta2) + ' gives three exact shares totaling 1/1',
      exact(recorded.mu.q, mu) && exact(recorded.b2.q, beta2) && exact(recorded.km.q, km)
        && exact(recorded.kin.q, kinetic) && exact(recorded.self.q, self) && exact(recorded.clock2.q, self)
        && exact(recorded.sum.q, ONE) && total[0] === 1n && total[1] === 1n);
    if (mi === 2 && bi === 0) {
      check('gear: hovering at μ = 1/3 gives Δτ/Δt = 1/2', exact(recorded.clock.q, [1n, 2n]));
    }
    if (mi === 2 && bi === 1) {
      check('gear: moving at μ = 1/3 gives 3/20 + 2/20 + 15/20 exactly',
        [3n, 2n, 15n].every((numerator, i) => {
          const [n, d] = shares[i].map(BigInt);
          return n * 20n === numerator * d;
        }) && (await lab.locator('#roGear').textContent()).includes('3/20 + 1/10 + 3/4 = 1'));
    }
  }
}

await chooseCard(lab, land);
const landmarks = [ZERO, ...addresses, [2n, 3n], ONE];
const landmarkRates = [ONE, ...expectedMemory, [1n, 5n], ZERO];
for (const [index, mu] of landmarks.entries()) {
  await choose(lab, '[data-land="' + index + '"]');
  const recorded = (await snapshot(lab)).land;
  const [p, q] = mu;
  const rR = fraction((p + q) ** 2n, q ** 2n);
  const rrs = p === 0n ? null : fraction((p + q) ** 2n, 4n * p * q);
  check('landmarks: μ = ' + name(mu) + ' gives Δτ/Δt = ' + name(landmarkRates[index]),
    recorded.exact && exact(recorded.mu.q, mu) && exact(recorded.rate.q, rate(mu))
      && exact(recorded.rate.q, landmarkRates[index]) && exact(recorded.rR.q, rR)
      && exact(recorded.rrs?.q ?? null, rrs) && exact(recorded.km.q, mass(mu)));
  if (index === 3) {
    check('landmarks: μ = 1/3 gives r/R = 16/9, r/rₛ = 4/3, κ_mass = 3/4 and Δτ/Δt = 1/2',
      exact(recorded.rR.q, [16n, 9n]) && exact(recorded.rrs.q, [4n, 3n])
        && exact(recorded.km.q, [3n, 4n]) && exact(recorded.rate.q, [1n, 2n]));
  }
}
const areal = await lab.evaluate(() => window.__constantRateGravityLab.core.areal());
for (const [index, [p, q]] of [[5n, 4n], [3n, 2n], [2n, 1n]].entries()) {
  const squared = fraction(p - q, p);
  const stop = areal[index];
  check('landmarks: areal r/rₛ = ' + name([p, q]) + ' has an irrational clock rate',
    exact(stop.q, [p, q]) && exact(stop.rate2, squared) && !(isSquare(squared[0]) && isSquare(squared[1]))
      && Math.abs(stop.rate ** 2 - Number(squared[0]) / Number(squared[1])) < 1e-14);
}

await chooseCard(lab, horizon);
await choose(lab, '[data-hor="10"]');
const end = (await snapshot(lab)).horizon;
const previous = await lab.evaluate(() => window.__constantRateGravityLab.core.horizon(9));
const horizonMass = end.km.q.map(BigInt);
const horizonRate = end.rate.q.map(BigInt);
check('horizon: μ = 1 gives κ_mass = 1/1, κ_self = 0/1 and Δτ/Δt = 0/1',
  exact(end.mu.q, ONE) && exact(end.km.q, ONE) && exact(end.rate.q, ZERO)
    && exact(subtract(ONE, horizonMass).map(String), ZERO) && exact(multiply(horizonRate, horizonRate).map(String), ZERO)
    && exact(end.arcs.q, [20n, 1n]));
check('horizon: master ν₀ = 1 across the last beat',
  end.k === 10 && previous.k === 9 && fraction(BigInt(end.master - previous.master), BigInt(end.k - previous.k)).every((v) => v === 1n));

await chooseCard(lab, wave);
const front = (await snapshot(lab)).wave;
const trav = ([p, q]) => fraction((q - p) * q ** 2n, (q + p) ** 3n);
const vin = trav([1n, 3n]);
const vout = trav([1n, 4n]);
const delta = subtract(vout, vin);
const nin = [vin[1], vin[0]];
const nout = [vout[1], vout[0]];
check('wave: the two speeds, their difference and reciprocal indices are exact',
  same([vin, vout, delta, nin, nout].map(name), ['9/32', '48/125', '411/4000', '32/9', '125/48'])
    && [front.vin, front.vout, front.dv, front.nin, front.nout].every(({ q }, i) => exact(q, [vin, vout, delta, nin, nout][i]))
    && await lab.locator('#roWave').textContent() === '9/32 · 48/125 · 411/4000 · 32/9 / 125/48');
await lab.context().close();

for (const lang of LANGS) {
  for (const card of CARDS) {
    const page = await openStill(T, BOOK, ID, card.id, lang);
    const state = await snapshot(page);
    const key = await page.locator('#roKey').textContent();
    const overlaps = await labelOverlaps(page, '#stage .tag', 0);
    check(lang + ' ' + card.scene + ': still keeps the intended value and hides the handle',
      state.preset === card.id && state.scene === card.scene && state.clock === card.still && !state.playing && key.includes(card.key)
        && await page.locator('#stageHandle').isHidden(), key);
    check(lang + ' ' + card.scene + ': the still has no stage label overlaps', overlaps.length === 0,
      JSON.stringify(overlaps.slice(0, 4)));
    if (lang === 'en') {
      const bad = await visibleCjk(page);
      check(card.scene + ': the English still has no visible Han or CJK punctuation', bad.length === 0, bad.slice(0, 4).join(' | '));
    }
    await page.context().close();
  }
}

check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero console, page or request errors', T.errors.length === 0, T.errors.slice(0, 8).join(' | '));
await T.finish();
