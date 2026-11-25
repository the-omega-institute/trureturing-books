import fs from 'node:fs';
import path from 'node:path';
import { readLock, readRegistry, resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';
import { labelOverlaps, openStill, overflowX, session, settle, stageFirstChecks, viewportShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'auric-trivalent-gold-observer-focus-sandbox';
const SECTION = 'ch38-s17-auric-trivalent-gold-and-observer-focus-signature';
const ANCHOR = 'sec-ch38-auric-trivalent-gold-and-observer-focus-signature';
const LANGS = ['zh', 'en'];
const CARDS = [
  { id: 'pie-dawn-and-noble-aurous-sphere', scene: 'dawn', still: 0, key: 'Q = (0, 0, 0)' },
  { id: 'relativistic-z79-d4h-lumo-window', scene: 'd4h', still: 8, key: 'Pocc + PLUMO = I₅' },
  { id: 'trivalent-rank-and-j2-quadrupole-ledger', scene: 'ledger', still: 3, key: 'χ₂(1/5) = −19/25 · 6χ₂ = −114/25' },
  { id: 'observer-focus-half-horizon-and-tau-spine', scene: 'focus', still: 15, key: 'N = 22 · τ = 155/12 · b₁ = 11' },
  { id: 'auric-ouroboros-matter-to-omega-closure', scene: 'ring', still: 4, key: 'IV → I' }
];
const [dawn, d4h, ledger, focus, ring] = CARDS;
const OMEGA = 'D5/S3/Quantum/AURICOmega/';
const GIDS = [
  'OmegaComposeAndWitnesses.orthogonal_triad_excess_quarter',
  'OmegaChebyshevHecke.lps_norm_five',
  'OmegaChebyshevHecke.lps_hecke_traces',
  'OmegaJetCalculus.kappa_jet_one',
  'OmegaJetCalculus.var_cube',
  'OmegaMatrixAndFractran.hurwitz_core_unit',
  'OmegaMatrixAndFractran.fractran_deterministic',
  'OmegaSimplicialExactness.d2_eq_zero_iff',
  'OmegaChebyshevHecke.orbital_quadrupole',
  'OmegaChebyshevHecke.full_orbital_quadrupole',
  'OmegaChebyshevHecke.spin_two_character',
  'OmegaSphericalHaarMidpoint.haar_evenChar_expectation',
  'OmegaTernionHeap.triad_left_absorption',
  'OmegaComposeAndWitnesses.p_omega_halts_at_22',
  'DimensionRankRealization.exists_model_tfae'
].map((name) => OMEGA + name).concat('D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities');
const READOUTS = '#roShell, #roProj, #roChar, #roFocus, #roRing';
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\u3000-\u303f\uff00-\uffef]/u;
const same = (a, b) => JSON.stringify(a, (_, v) => typeof v === 'bigint' ? String(v) : v)
  === JSON.stringify(b, (_, v) => typeof v === 'bigint' ? String(v) : v);

// All reference arithmetic is independent of the visualization and uses reduced BigInt fractions.
function fraction(n, d = 1n) {
  if (d < 0n) [n, d] = [-n, -d];
  let a = n < 0n ? -n : n;
  let b = d;
  while (b) [a, b] = [b, a % b];
  return [n / a, d / a];
}
const ZERO = fraction(0n);
const ONE = fraction(1n);
const add = ([a, b], [c, d]) => fraction(a * d + c * b, b * d);
const mul = ([a, b], [c, d]) => fraction(a * c, b * d);
const sum = (values) => values.reduce(add, ZERO);
const fmt = ([n, d]) => (d === 1n ? String(n) : `${n}/${d}`).replace('-', '−');
const tuple = (values) => `(${values.map(fmt).join(', ')})`;
const scale = (vector, factor) => vector.map((q) => mul(q, factor));
const total = (vectors) => [0, 1, 2].map((i) => sum(vectors.map((v) => v[i])));

// The five orbital moments from the chapter's audit table, in units of 1/7.
const orbitals = Object.fromEntries(Object.entries({
  z2: [-2n, -2n, 4n], xz: [2n, -4n, 2n], yz: [-4n, 2n, 2n],
  xy: [2n, 2n, -4n], x2y2: [2n, 2n, -4n]
}).map(([orbital, values]) => [orbital, values.map((n) => fraction(n, 7n))]));
const full = total(Object.values(orbitals));
const closed = scale(full, fraction(2n));
const shell = (t) => total([closed, scale(orbitals.x2y2, fraction(-BigInt(t)))]);
const deleted = shell(2);
const auric = [0n, 0n, 1n].map((n) => add(fraction(n), fraction(-1n, 3n)));
const ratio = fraction(12n, 7n);
const identity = Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => BigInt(i === j)));
const occupied = identity.map((row, i) => row.map((v) => i < 4 ? v : 0n));
const lumo = identity.map((row, i) => row.map((v) => i === 4 ? v : 0n));
const matrixProduct = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((n, v, k) => n + v * b[k][j], 0n)));
const rank = (matrix) => matrix.reduce((n, row, i) => n + Number(row[i]), 0);
const zeroMatrix = identity.map((row) => row.map(() => 0n));
const projections = {
  rankOcc: rank(occupied), rankLumo: rank(lumo),
  idemOcc: same(matrixProduct(occupied, occupied), occupied), idemLumo: same(matrixProduct(lumo, lumo), lumo),
  crossA: same(matrixProduct(occupied, lumo), zeroMatrix), crossB: same(matrixProduct(lumo, occupied), zeroMatrix),
  sum: same(occupied.map((row, i) => row.map((v, j) => v + lumo[i][j])), identity)
};
const kappas = [ONE, fraction(1n, 2n), fraction(1n, 4n), fraction(1n, 5n), ZERO];
const character = (k) => sum([mul(fraction(16n), mul(k, k)), mul(fraction(-12n), k), ONE]);
const chi = kappas.map(character);
const heckeTrace = mul(fraction(6n), chi[3]);
const levels = [{ lam: fraction(-74n, 25n), mult: 3 }, { lam: fraction(54n, 25n), mult: 2 }];
// Four axis units leave z fixed and each of the two cyclic permutations occurs four times.
const rotated = [deleted, [deleted[2], deleted[0], deleted[1]], [deleted[1], deleted[2], deleted[0]]];
const average = scale(total(rotated.map((q) => scale(q, fraction(4n)))), fraction(1n, 12n));
const program = [[11n, 49n], [7n, 25n], [5n, 9n], [3n, 4n]];
const states = [2n ** 17n];
for (let step = 0; step < 16; step++) {
  const n = states.at(-1);
  const gate = program.find(([p, q]) => (n * p) % q === 0n);
  if (!gate) break;
  states.push(n * gate[0] / gate[1]);
}
// The atlas has a connected chain and the additional chords listed in the milestone ledger.
// Each chord adds one independent cycle. The three orthogonal innovations are 3/4, 2/3, 1/2.
const chordSteps = [2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15];
const innovations = [ZERO, fraction(3n, 4n), fraction(2n, 3n), fraction(1n, 2n)];
const atlas = Array.from({ length: 16 }, (_, k) => {
  const V = Math.min(k + 1, 12);
  const E = V - 1 + chordSteps.filter((step) => step <= k).length;
  const b1 = E - V + 1;
  const dI = innovations[k] ?? ZERO;
  const tau = add(sum(innovations.slice(0, k + 1)), fraction(BigInt(b1)));
  return { k, V, E, b1, dI, tau, N: states[k] };
});
// Solve the coefficient equations (2 + 2η + η²)(a + bη + cη²) = 1 modulo η³.
const a = fraction(1n, 2n);
const b = mul(fraction(-1n), a);
const c = mul(fraction(-1n, 2n), add(a, mul(fraction(2n), b)));
const jet = [a, b, c];
const final = atlas.at(-1);
const stations = [
  'I · 5d¹⁰ · Q = 0', 'II · Q = 12/7 · QAuric',
  'III · d = 3 · r = 5 · χ₂(1/5) = −19/25',
  'IV · N₁₆ = 22 · b₁ = 11 · τ = 155/12', 'IV → I · N₁₆ = 22 → *h₂ews-'
];

const snapshot = (page) => page.evaluate(() => window.AURIC_DEBUG.stateSnapshot);
const textAt = (page, selector) => page.locator(selector).textContent();
const numbers = (page) => page.locator(READOUTS).allTextContents();
async function choose(page, selector) {
  await page.locator(selector).click();
  await settle(page);
}
async function chooseCard(page, card) {
  await choose(page, `[data-preset="${card.id}"]`);
}

// Trace all canvas text, including the strip and any overlay, when the page redraws.
async function observeCanvas(page) {
  await page.evaluate(() => {
    window.auricTestCanvasText = [];
    for (const method of ['fillText', 'strokeText']) {
      const original = CanvasRenderingContext2D.prototype[method];
      CanvasRenderingContext2D.prototype[method] = function (value, ...args) {
        window.auricTestCanvasText.push(String(value));
        return original.call(this, value, ...args);
      };
    }
    window.dispatchEvent(new Event('resize'));
  });
  await settle(page);
}
async function visibleCjk(page) {
  const text = await page.evaluate(() => {
    const found = [document.title, ...window.auricTestCanvasText];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      const value = node.textContent.trim();
      // The shared language switch deliberately names Chinese in its own script.
      if (!value || (value === '中' && el.closest('.langs button[data-lang-set="zh"]'))) continue;
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      range.selectNodeContents(node);
      if ([...range.getClientRects()].some(({ width, height }) => width && height)) found.push(value);
    }
    for (const el of document.querySelectorAll('[aria-label], [title], [alt]')) {
      if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
      for (const attr of ['aria-label', 'title', 'alt']) if (el.hasAttribute(attr)) found.push(el.getAttribute(attr));
    }
    return found;
  });
  return [...new Set(text.filter((value) => CJK.test(value)))];
}
async function badgeColors(page, container) {
  return page.locator(`${container} .lean`).evaluateAll((boxes) => boxes.map((box) => {
    const badge = box.querySelector('.ok');
    const sample = document.createElement('span');
    badge.append(sample);
    const color = getComputedStyle(badge).color;
    const tokens = ['--tr-axiom-free', '--ok', '--warn'].filter((token) => {
      sample.style.color = `var(${token})`;
      return color === getComputedStyle(sample).color;
    });
    sample.remove();
    return { gid: box.querySelector('[data-lean-gid]')?.dataset.leanGid, tokens,
      marked: Boolean(badge.querySelector('.af')), open: box.classList.contains('open'), text: badge.textContent.trim() };
  }));
}
function correctBadges(boxes) {
  const lean = boxes.filter(({ gid }) => gid);
  const open = boxes.filter((box) => box.open);
  return same(lean.map(({ gid }) => gid), GIDS)
    && lean.every((box, i) => box.text.includes('LEAN ✓') && box.marked === (i < 8)
      && same(box.tokens, [i < 8 ? '--tr-axiom-free' : '--ok']))
    && open.length > 0 && open.every((box) => box.text === 'OPEN' && same(box.tokens, ['--warn']));
}

const book = resolveBook(BOOK);
const entry = readRegistry(book).visualizations.find((item) => item.id === ID);
const ids = CARDS.map(({ id }) => id);
const source = path.join(book.dir, 'viz', ID);
const lock = readLock();
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true });

check('registration: OMEGA//AURIC is live in Chapter 38 §38.17',
  entry?.code === 'OMEGA//AURIC' && entry.status === 'live' && entry.added === '2026-11-25'
    && entry.chapter === 38 && entry.section === '38.17' && entry.path === `${ID}/`
    && entry.thumbnail === `${ID}/thumb.jpg` && entry.capture_lock === 'links');
check('registration: exact preset order and 16 frozen theorem GIDs',
  same(entry.presets, ids) && same(entry.lean.map(({ gid }) => gid), GIDS)
    && GIDS.every((gid, i) => lock.declarations[gid]?.kind === 'theorem'
      && (i < 8 ? same(lock.declarations[gid].axioms, []) : !same(lock.declarations[gid].axioms, []))));
for (const lang of LANGS) {
  const chapter = fs.readFileSync(path.join(book.dir, lang, SECTION + '.md'), 'utf8');
  const groups = ['omega-axiom-free', 'quadrupole-haar-observer'].map((name) =>
    chapter.match(new RegExp(`^::: \\{\\.theorem #thm-ch38-auric-${name}-anchors [^\\n]*\\blean="([^"]+)"`, 'm'))?.[1].split(','));
  check(`registration: ${lang} theorem boxes contain the exact two groups of eight`,
    same(groups, [GIDS.slice(0, 8), GIDS.slice(8)]));
  const citations = vizCitations(book, ID).filter((citation) => citation.lang === lang);
  check(`registration: ${lang} cites all five cards and the full laboratory in order`,
    same(citations.map(({ preset, height }) => [preset || '', height]), [...ids.map((id) => [id, 540]), ['', 620]]));
  check(`registration: ${lang} theory link addresses the section anchor`,
    entry.theory.length === 1 && entry.theory[0][lang === 'en' ? 'href_en' : 'href'] === `../${lang}/${SECTION}.html#${ANCHOR}`);
}
function englishStrings(value) {
  return typeof value === 'string' ? [value] : Object.values(value ?? {}).flatMap(englishStrings);
}
function englishMetadata(value) {
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).flatMap(([key, item]) => key === 'en' || key.endsWith('_en')
    ? englishStrings(item) : englishMetadata(item));
}
const metadata = englishMetadata(entry);
check('registration: all English metadata is free of Han and CJK punctuation',
  metadata.length === 14 && metadata.every((value) => /[A-Za-z]/.test(value) && !CJK.test(value)));
const css = fs.readFileSync(path.join(source, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(source, 'main.js'), 'utf8');
check('tokens: local CSS and JavaScript contain no literal hex colors',
  !/[:(,]\s*#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})\b/i.test(css)
    && !/['"`]#(?:[\da-f]{3}|[\da-f]{4}|[\da-f]{6}|[\da-f]{8})['"`]/i.test(js));

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  for (const colorScheme of ['dark', 'light']) {
    const page = await T.open(BOOK, ID, '?lang=en', { viewport, locale: 'en-US', reducedMotion: 'reduce' });
    await page.emulateMedia({ colorScheme });
    await observeCanvas(page);
    const label = `en ${colorScheme} ${viewport.width}×${viewport.height}`;
    check(`${label}: requested system color scheme is active`,
      await page.evaluate((scheme) => matchMedia(`(prefers-color-scheme: ${scheme})`).matches, colorScheme));
    check(`${label}: evidence panel uses blue, green and red for the corresponding theorem and OPEN badges`,
      correctBadges(await badgeColors(page, '#basis')));
    for (const card of CARDS) {
      await page.evaluate(() => { window.auricTestCanvasText.length = 0; });
      await chooseCard(page, card);
      const before = await snapshot(page);
      const readings = await numbers(page);
      for (const lens of ['omega', 'chem']) {
        if (lens === 'chem') {
          await page.evaluate(() => { window.auricTestCanvasText.length = 0; });
          await choose(page, viewport.width <= 1080 ? '#lensMirror' : '#lens');
        }
        const at = `${label} ${card.scene} ${lens}`;
        const state = await snapshot(page);
        const active = await page.evaluate(() => ({
          preset: window.AURIC_DEBUG.preset, lens: window.AURIC_DEBUG.lens,
          buttons: ['lens', 'lensMirror'].map((id) => document.getElementById(id).getAttribute('aria-pressed')),
          canvasDrawn: window.auricTestCanvasText.length > 0
        }));
        check(`${at}: both lens switches agree and exact state/readouts are preserved`,
          active.preset === card.id && active.lens === lens && same(active.buttons, Array(2).fill(String(lens === 'chem')))
            && state.scene === card.scene && state.clock === card.still && !state.playing
            && ['at', 'rel', 't', 'Q', 'kappa', 'haarAvg', 'focus', 'ring'].every((key) => same(state[key], before[key]))
            && same(await numbers(page), readings));
        await page.locator('#stage').scrollIntoViewIfNeeded();
        await settle(page);
        const overlaps = await labelOverlaps(page, '#stage .tag', 0);
        const share = await viewportShare(page, '#stage');
        check(`${at}: no label overlaps, no sideways scrolling and stage covers at least 28% of the viewport`,
          overlaps.length === 0 && await overflowX(page) === 0 && share >= 0.28, JSON.stringify({ overlaps, share }));
        const bad = await visibleCjk(page);
        check(`${at}: English DOM and canvas text contain no Han or CJK punctuation`,
          active.canvasDrawn && bad.length === 0, bad.join(' | '));
      }
      // Return through the other switch so both controls are exercised, even on narrow pages.
      if (viewport.width <= 1080) await choose(page, '#lens');
      else await choose(page, '#lens');
      const restored = await page.evaluate(() => ({ lens: window.AURIC_DEBUG.lens,
        buttons: ['lens', 'lensMirror'].map((id) => document.getElementById(id).getAttribute('aria-pressed')) }));
      check(`${label} ${card.scene}: switching back synchronizes both controls`,
        restored.lens === 'omega' && same(restored.buttons, ['false', 'false']) && same(await numbers(page), readings));
    }
    await choose(page, '#infoBtn');
    check(`${label}: theory drawer opens`, await page.locator('#drawer').isVisible());
    const bad = await visibleCjk(page);
    check(`${label}: English drawer contains no Han or CJK punctuation`, bad.length === 0, bad.join(' | '));
    check(`${label}: drawer preserves the 16 evidence colors and red OPEN badge`, correctBadges(await badgeColors(page, '#drawerEvidence')));
    await page.keyboard.press('Escape');
    check(`${label}: Escape closes theory drawer`, await page.locator('#drawer').isHidden());
    await choose(page, '#infoBtn');
    await choose(page, '#drawerClose');
    check(`${label}: close button closes theory drawer`, await page.locator('#drawer').isHidden());
    await page.context().close();
  }
}

const lab = await T.open(BOOK, ID, '?lang=en', { reducedMotion: 'reduce' });
await settle(lab);
const math = await lab.evaluate(() => window.AURIC_DEBUG.math);
check('shell: independent orbital ledger, closed shell, deletion and exact axial scale',
  same(math.orbitals, orbitals) && same(math.full, full) && same(math.closed, closed)
    && same(full, [ZERO, ZERO, ZERO]) && same(math.deleted, deleted) && same(math.auric, auric)
    && same(deleted, scale(auric, ratio)) && same(deleted, [fraction(-4n, 7n), fraction(-4n, 7n), fraction(8n, 7n)])
    && same(sum(deleted), ZERO));
check('projections: exact rank 4 + rank 1, idempotent, orthogonal and complete',
  same(math.projections, { ...projections, ok: true }) && projections.rankOcc + projections.rankLumo === 5
    && projections.sum && projections.crossA && projections.crossB && projections.idemOcc && projections.idemLumo);
for (const card of [dawn, d4h]) {
  await chooseCard(lab, card);
  for (const t of [0, 1, 2]) {
    await choose(lab, `[data-t="${t}"]`);
    const state = await snapshot(lab);
    const expected = shell(t);
    check(`${card.scene}: t = ${t} gives exact traceless shell and complementary projections`,
      state.scene === card.scene && same(state.t[`${card.scene}Q`], fraction(BigInt(t)))
        && same(state.Q[card.scene], expected) && same(state.Q.ratio, ratio) && same(sum(expected), ZERO)
        && await textAt(lab, '#roShell') === `t = ${t} · ${expected.map(fmt).join(' · ')} · 0`
        && await textAt(lab, '#roProj') === '4 · 1 · = I₅');
  }
}
await choose(lab, '#lens');
for (const rel of [0, 1]) {
  await choose(lab, `[data-rel="${rel}"]`);
  const state = await snapshot(lab);
  check(`d4h: λ_rel = ${rel} changes the modeled energy gap and retains the quadrupole`,
    state.rel === rel && same(state.Q.d4h, deleted) && (await textAt(lab, '#roKey')).includes(`≈ ${rel ? '2.4' : '3.9'} eV`));
}
await choose(lab, '#lens');

await chooseCard(lab, ledger);
check('ledger: five polynomial characters, independent trace and Hecke eigenvalue multiplicities',
  same(chi.map(fmt), ['5', '−1', '−1', '−19/25', '1'])
    && math.landmarks.every((landmark, i) => same(landmark.k, kappas[i]) && same(landmark.chi, chi[i]) && same(landmark.trace, chi[i]))
    && same(math.hecke.levels, levels) && same(math.hecke.trace, heckeTrace)
    && same(heckeTrace, sum(levels.map(({ lam, mult }) => mul(lam, fraction(BigInt(mult)))))));
for (const [i, k] of kappas.entries()) {
  await choose(lab, `[data-k="${i}"]`);
  const state = await snapshot(lab);
  const readout = (await textAt(lab, '#roChar')).split(' · ');
  check(`ledger: κ = ${fmt(k)} gives χ₂ = ${fmt(chi[i])} and 6χ₂ = ${fmt(mul(fraction(6n), chi[i]))}`,
    same(state.kappa.k, k) && same(state.kappa.chi, chi[i]) && readout[0] === `κ = ${fmt(k)}`
      && same(readout.slice(-2), [fmt(chi[i]), fmt(mul(fraction(6n), chi[i]))]));
}
check('ledger: twelve Hurwitz rotations distribute the axial moment four times on each axis',
  math.cores.length === 12 && new Set(math.cores.map((q) => q.join(','))).size === 12
    && rotated.every((q) => math.rotated.filter((r) => same(r, q)).length === 4)
    && same(average, [ZERO, ZERO, ZERO]) && same(math.average, average));
await choose(lab, '#haarBtn');
check('ledger: Haar toggle collapses the live quadrupole average to zero',
  await lab.locator('#haarBtn').getAttribute('aria-pressed') === 'true' && same((await snapshot(lab)).haarAvg, average)
    && await textAt(lab, '#roKey') === `⟨Q⟩ = ${tuple(average)}`);
await choose(lab, '#haarBtn');
check('ledger: second Haar toggle restores the single-crystal ledger',
  await lab.locator('#haarBtn').getAttribute('aria-pressed') === 'false' && (await snapshot(lab)).haarAvg === null
    && (await textAt(lab, '#roKey')).includes(fmt(heckeTrace)));

await chooseCard(lab, focus);
check('focus: independent FRACTRAN run halts after 15 steps at 22',
  same(math.program, program.map(([p, q]) => `${p}/${q}`)) && same(math.states, states)
    && states.length === 16 && states.at(-1) === 22n && program.every(([p, q]) => (states.at(-1) * p) % q !== 0n));
check('focus: structural-time atlas and midpoint rational jet',
  same(math.atlas, atlas) && same(final.tau, fraction(155n, 12n)) && final.b1 === 11
    && same(math.jet, jet) && same(jet, [fraction(1n, 2n), fraction(-1n, 2n), fraction(1n, 4n)]));
for (const row of atlas) {
  await lab.locator('#stepRange').fill(String(row.k));
  await settle(lab);
  const state = (await snapshot(lab)).focus;
  check(`focus: step ${row.k}, N = ${row.N}, τ = ${fmt(row.tau)}, b₁ = ${row.b1}`,
    state.step === row.k && !state.moving && same(state.N, row.N) && same(state.tau, row.tau)
      && state.b1 === row.b1 && state.V === row.V && state.E === row.E
      && await textAt(lab, '#roFocus') === `${row.k} · ${row.N} · ${fmt(row.tau)} · ${row.b1}`
      && await textAt(lab, '#stepOut') === `= ${row.k}`);
}
await chooseCard(lab, ring);
for (const [i, invariant] of stations.entries()) {
  await choose(lab, `[data-st="${i}"]`);
  const state = (await snapshot(lab)).ring;
  check(`ring: station ${i} reads ${invariant}`, state.station === i && !state.moving
    && await textAt(lab, '#roRing') === invariant);
}
await choose(lab, '#infoBtn');
const bench = { full: '= 0', closed: `= ${tuple(closed)}`, deleted: tuple(deleted), proj: 'rank 4 + 1',
  chi: chi.map(fmt).join(', '), hecke: `= ${fmt(heckeTrace)}`, haar: tuple(average),
  steps: '15', n16: '22', tau: fmt(final.tau), b1: String(final.b1), jet: tuple(jet) };
for (const [name, expected] of Object.entries(bench)) {
  check(`drawer: ${name} = ${expected}`, await textAt(lab, `#drawer > .sheet > .en [data-bench="${name}"]`) === expected);
}
await lab.context().close();

for (const lang of LANGS) {
  for (const card of CARDS) {
    const page = await openStill(T, BOOK, ID, card.id, lang);
    await observeCanvas(page);
    const state = await snapshot(page);
    const key = await textAt(page, '#roKey');
    const overlaps = await labelOverlaps(page, '#stage .tag', 0);
    check(`${lang} ${card.scene}: still holds the declared frame, readout and hidden handle`,
      state.scene === card.scene && state.clock === card.still && !state.playing && key.includes(card.key)
        && await page.locator('#stageHandle').isHidden(), key);
    check(`${lang} ${card.scene}: still has no horizontal overflow or label overlaps`,
      overlaps.length === 0 && await overflowX(page) === 0, JSON.stringify(overlaps));
    if (lang === 'en') {
      const bad = await visibleCjk(page);
      check(`${card.scene}: English still DOM and canvas contain no Han or CJK punctuation`, bad.length === 0, bad.join(' | '));
    }
    await page.context().close();
  }
}
check('zero shared quality warnings', T.warnings.length === 0, JSON.stringify(T.warnings));
check('zero console, page or request errors', T.errors.length === 0, T.errors.slice(0, 8).join(' | '));
await T.finish();
