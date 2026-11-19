// COSET//TOWER browser regression: shared stage quality, independent identities, and real reader interactions.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card/still matrix, while VIZ_SLOW_FRAMES=1000
// exercises every transition and playback assertion with deliberately sparse animation frames.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'coset-breaking-conservation-tower-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'pythagorean-coset-ledger': { family: 0, eta: 0.75, g: 0.65, phi: 70, still: 70 },
  'goldstone-vs-higgs-closure': { family: 1, eta: 0.75, g: 0.65, phi: 0, still: 120 },
  'skyrmion-baryon-winding': { family: 2, eta: 0.8, g: 0.65, phi: 0, still: 30 },
  'superconductor-crystal-meissner': { family: 3, eta: 0.85, g: 0.8, phi: 0, still: 60 },
  'five-family-cascade-relay': { family: 4, eta: 0.75, g: 0.65, phi: 0, still: 90 }
};
const GIDS = [
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
  'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  'D5/S3/QuantumChannels/ProjectionDiagnostics/MonitoredReturnConservation.monitored_return_conservation',
  'D5/S3/Fourier/FinitePoisson.finite_poisson_summation',
  'D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity',
  'D5/S3/ConceptDynamics/Interpretation/InterpretationFixedPoint.objective_claim_requires_invariant_common_factor'
];
const THEORY = ['zh', 'en'].map(lang => `../../${lang}/ch34-s16-coset-breaking-and-conservation.html#sec-ch34-coset-breaking-conservation-towers`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const T = await session();
const { page, check } = T;

// Headless Chromium can report driver diagnostics as warnings. They are harmless; every other warning is a failure.
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const browserWarnings = [];
const watchedPages = new WeakSet();
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', m => {
    if ((m.type() === 'info' || m.type() === 'warning') && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}

// Audit the shared night-console contract before page scripts run, including attempted writes that are later removed.
const paletteMutations = [], paletteDocuments = [];
async function watchPalette(context) {
  await context.exposeBinding('__cosetPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver(records => {
      for (const r of records) window.__cosetPaletteAudit({ kind: 'mutation', old: r.oldValue,
        value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__cosetPaletteAudit({ kind: 'document',
      absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
let requestedColorScheme = 'dark';
await watchPalette(T.context);
const browserNewContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => {
  const context = await browserNewContext({ ...options, colorScheme: requestedColorScheme });
  await watchPalette(context);
  return context;
};
watchPage(page);
await page.emulateMedia({ colorScheme: 'dark' });

// The shared gate covers the canonical desktop/mobile/embed paths and the solid WebGL stage.
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

const state = (p = page) => p.evaluate(() => window.COSET_TOWER_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await until(p, (wanted) => {
    const s = window.COSET_TOWER_DEBUG.state, q = wanted;
    return s.familyIndex === q.family && Math.abs(s.ssbDepth - q.eta) < 1e-9 && Math.abs(s.gaugeCoupling - q.g) < 1e-9;
  }, CARDS[card]);
  await pause(p);
}

function checkMath(s, tag) {
  const eta = s.ssbDepth, g = s.gaugeCoupling, eps = Math.PI * eta / 2;
  const sin2w = 1 - (80.377 / 91.1876) ** 2;
  const naiveRemainder = (938.272 - 8.99) / 938.272;   // 1 − (2m_u + m_d)/m_p: a naive scale comparison only
  const flux = 6.62607015e-34 / (2 * 1.602176634e-19);
  check(`${tag}: state exposes finite controls`, Number.isInteger(s.familyIndex) && s.familyIndex >= 0 && s.familyIndex <= 4
    && near(s.ssbDepth, eta) && near(s.gaugeCoupling, g) && Number.isFinite(s.anchorAzimuthRad));
  check(`${tag}: epsilon and anchor azimuth`, near(s.epsilonRad, eps) && near(s.anchorAzimuthRad, s.anchorAzimuthDeg * Math.PI / 180));
  check(`${tag}: Lagrange budget split`, near(s.anchorShareCos2, Math.cos(eps) ** 2) && near(s.cosetShareSin2, Math.sin(eps) ** 2)
    && near(s.budgetSum, 1, 2e-12) && near(s.budgetResidual, 0, 2e-12));
  check(`${tag}: Cartan flux and Girard excess`, near(s.cartanCapFlux, 2 * Math.PI * (1 - Math.cos(eps)))
    && near(s.girardTrihedralExcess, 2 * Math.atan(Math.tan(eps / 2) ** 2)));
  check(`${tag}: Maurer–Cartan and electroweak ledgers`, s.maurerCartanResidual < 1e-11
    && s.electroweakDofBefore === 12 && s.electroweakDofAfter === 12);
  check(`${tag}: physical constants are independently reconstructed`, near(s.weinbergSin2OnShell, sin2w, 1e-14)
    && near(s.protonNaiveScaleRemainder, naiveRemainder, 1e-14) && near(s.fluxQuantumWb, flux, 1e-30));
  check(`${tag}: Skyrmion winding is B=1 away from the symmetric point`, s.skyrmionBaryonNumber === (eta > 0 ? 1 : 0));
}

async function checkLinks(p, tag) {
  check(`${tag}: exact frozen evidence links`, same(await p.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', els => els.every(e => e.closest('.col.side #evidence .lean')
      && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: exact bilingual theory link`, same(await p.$$eval('#drawer a[href^="../../"]', els => els.map(e => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colour or palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source)
    && !/\btrPalette\b|data-tr-palette|--warn\b/.test(source));
}
check('source: shared three-column grid and wheel:false', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']));
check('source: all five public presets remain in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
check('source: no proton-mass attribution of the naive quark-mass remainder', !/protonChiralMassFraction|PROTON_FRACTION|非希格斯|not Higgs|Higgs-given|希格斯给的/.test(sources['index.html'] + sources['main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: live §33.4 entry with five bilingual cards and twelve GIDs', entry.status === 'live' && entry.chapter === 33 && entry.section === '33.4'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
check('runtime: shared scripts and styles', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src')),), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', els => els.map(e => e.getAttribute('href')).filter(h => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime');
check('layout: exact three-column lab contract and centered stage strip', await page.evaluate(() => {
  const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .deck'), center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .side');
  const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
  const tracks = getComputedStyle(app).gridTemplateColumns;
  return getComputedStyle(app).display === 'grid' && tracks.trim().split(/\s+/).length === 3
    && d.right <= c.left + 1 && c.right <= s.left + 1
    && !!center.querySelector(':scope > #stage') && !!center.querySelector(':scope > .tour') && !!center.querySelector(':scope > .strip')
    && !!side.querySelector(':scope > #readouts') && !!side.querySelector(':scope > #evidence')
    && !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot');
},));
check('layout: readouts and evidence are visible', await page.locator('.col.side #readouts').isVisible() && await page.locator('.col.side #evidence').isVisible());

// Every preset is selected through the real card controls, and every state is checked independently of its canvas.
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document and pressed toggle`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state();
    check(`${lang}/${card}: preset applies controls`, s.preset === card && s.familyIndex === CARDS[card].family && !s.playing
      && await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')) === CARDS[card].still);
    checkMath(s, `${lang}/${card}`);
  }
}

// m_u, m_d are MS-bar running parameters (μ = 2 GeV): 1 − (2m_u + m_d)/m_p is a naive scale comparison, never a share of
// the proton mass. The family-2 readout, its note, the NUM box, the relay strip and the drawer must say so in both
// languages; the drawer defines the quark-mass term as a nucleon expectation value of H_m, with no substitute fraction.
const NAIVE_PCT = `${(100 * (938.272 - 8.99) / 938.272).toFixed(2)}%`;
const ATTRIBUTION = /非希格斯|not Higgs|Higgs-given|希格斯给的|chiral\s*\/\s*gluonic|手征\s*\/\s*胶子|质子质量不是|of the proton mass is not/i;
const SUBSTITUTE = /12\.5\s*%|(?<![\d.])9\s*%|(?<![\d.])1\/8(?![\d.])/;
const NAIVE = { zh: /朴素标度/, en: /naive (?:scale|comparison of (?:two )?scales)/ };
const NOT_SHARE = { zh: /不是质(?:子质)?量(?:的)?分解比例/, en: /not a (?:mass-decomposition fraction|fraction of any decomposition of the proton mass)/ };
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  await pick('skyrmion-baryon-winding');
  const t = await page.evaluate(l => ({
    charge: document.querySelector('#roCharge').textContent, note: document.querySelector('#roNote').textContent,
    num: document.querySelector(`#evidence .lean.num .${l}`).textContent,
    argued: document.querySelector(`#evidence .lean.argued .${l}`).textContent,
    drawer: document.querySelector(`#drawer .sheet > .${l}`).textContent, visible: document.body.innerText
  }), lang);
  check(`${lang}: family-2 readout calls the remainder a naive scale comparison, not a mass share`, t.charge.includes(NAIVE_PCT)
    && NAIVE[lang].test(t.charge) && NOT_SHARE[lang].test(t.charge) && !ATTRIBUTION.test(t.charge)
    && ['MS-bar', 'μ = 2 GeV', '2.16 MeV', '4.67 MeV'].every(x => t.note.includes(x)), `${t.charge} | ${t.note}`);
  check(`${lang}: NUM box names MS-bar running parameters and no proton-mass fraction`, t.num.includes(NAIVE_PCT)
    && ['MS-bar', 'μ = 2 GeV', '2.16 MeV', '4.67 MeV', '(938.272 − 8.99)/938.272'].every(x => t.num.includes(x))
    && NAIVE[lang].test(t.num) && NOT_SHARE[lang].test(t.num) && !ATTRIBUTION.test(t.num), t.num);
  check(`${lang}: drawer defines the quark-mass term as ⟨N|Hm|N⟩/⟨N|N⟩ with its primary sources`,
    ['⟨N|Hm|N⟩/⟨N|N⟩', 'Hm = Σf ∫ d³x mf q̄f qf', 'hep-ph/9410274', '(27)–(30)', 'arXiv:1808.08677', '(1)–(6)', 'MS-bar', NAIVE_PCT].every(x => t.drawer.includes(x))
    && NAIVE[lang].test(t.drawer) && NOT_SHARE[lang].test(t.drawer) && !ATTRIBUTION.test(t.drawer) && !SUBSTITUTE.test(t.drawer));
  check(`${lang}: ARGUED keeps QCD generating most of the proton mass`, t.argued.includes(lang === 'zh' ? 'QCD 生成质子质量的绝大部分' : 'QCD generating most of the proton mass'));
  check(`${lang}: no visible text attributes the remainder to a mass source or substitutes a fraction`, !ATTRIBUTION.test(t.visible) && !SUBSTITUTE.test(t.visible));
  await pick('five-family-cascade-relay');
  const meta = await page.locator('#plotMeta').textContent();
  check(`${lang}: relay strip labels 2m_u + m_d as a naive MS-bar scale with no percentage of m_p`, meta.includes('8.99 MeV') && meta.includes('MS-bar')
    && NAIVE[lang].test(meta) && !meta.includes('%') && !ATTRIBUTION.test(meta), meta);
}
{
  const s = await state();
  check('debug API: the remainder is exposed under its arithmetic-scale name only', Object.hasOwn(s, 'protonNaiveScaleRemainder')
    && !Object.hasOwn(s, 'protonChiralMassFraction') && !Object.keys(s).some(k => /chiral|fraction/i.test(k)));
}

// Real sliders cover interior values and both endpoints. Family chips and the range input must stay synchronized.
await pick('pythagorean-coset-ledger');
for (const family of [0, 1, 2, 3, 4]) {
  await input('#familyIndex', family); const s = await state();
  check(`family slider ${family}: state and HUD chip sync`, s.familyIndex === family && s.preset === null
    && await page.locator(`#familyChips [data-family="${family}"]`).getAttribute('aria-pressed') === 'true');
  await page.click(`#familyChips [data-family="${(family + 1) % 5}"]`); await settle(page);
  const next = (family + 1) % 5;
  check(`family chip ${next}: range sync`, (await state()).familyIndex === next && Number(await page.inputValue('#familyIndex')) === next);
}
for (const eta of [0, 0.01, 0.25, 0.75, 1]) {
  await input('#ssbDepth', eta); const s = await state();
  check(`η slider ${eta}: actual state and handle visibility`, near(s.ssbDepth, eta)
    && (eta <= 0.02 ? await page.locator('#vacuumAnchorHandle').isHidden() : !(await page.locator('#vacuumAnchorHandle').isHidden())));
  checkMath(s, `η=${eta}`);
}
for (const g of [0, 0.2, 0.65, 1]) {
  await input('#gaugeCoupling', g); const s = await state();
  check(`gauge slider ${g}: actual state`, near(s.gaugeCoupling, g) && s.preset === null);
  checkMath(s, `g=${g}`);
}
await input('#ssbDepth', 0.75); await input('#gaugeCoupling', 0.65); await input('#familyIndex', 0);

// Drag the amber button to a projected trough point; camera orbit must remain untouched.
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
const beforeDrag = await state(), handle = await page.evaluate(() => window.COSET_TOWER_DEBUG.handleBox()), target = await page.evaluate(() => window.COSET_TOWER_DEBUG.troughPoint(180));
check('anchor handle: projected button is visible', !!handle && await page.locator('#vacuumAnchorHandle').isVisible());
if (handle && target) {
  await page.mouse.move(handle.x, handle.y); await page.mouse.down();
  check('anchor handle: pointerdown enters dragging state', await page.locator('#vacuumAnchorHandle').evaluate(el => el.classList.contains('dragging')));
  await page.mouse.move(target.x, target.y, { steps: 8 }); await page.mouse.up(); await settle(page);
  const afterDrag = await state();
  check('anchor handle: drag changes azimuth without rotating camera', Math.abs(afterDrag.anchorAzimuthDeg - beforeDrag.anchorAzimuthDeg) > 20 && same(afterDrag.camera, beforeDrag.camera));
}

await page.click('#infoBtn'); await settle(page);
check('info button opens the theory drawer', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').isHidden());
check('settled play/pause: play advances the real anchor clock', await playsAfter(page, () => page.click('#play'), () => window.COSET_TOWER_DEBUG.state));
await pause();
const paused = await state(); await settle(page, 50);
check('settled play/pause: pause holds the clock', !paused.playing && same((await state()).anchorAzimuthDeg, paused.anchorAzimuthDeg));

// Dark/light × zh/en × desktop/phone/embed. Desktop additionally enforces the physical three-column positions.
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed] of [
  [1440, 900, false], [390, 844, false], [740, 620, true]
]) {
  requestedColorScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await p.emulateMedia({ colorScheme: scheme }); await settle(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${embed ? 'embed' : width < 500 ? 'phone' : 'desktop'}`;
  check(`${tag}: requested system color and absent palette`, await p.evaluate(s => matchMedia(`(prefers-color-scheme: ${s})`).matches
    && document.documentElement.dataset.trPalette === undefined, scheme));
  await checkLinks(p, tag);
  if (width >= 1081) check(`${tag}: three-column deck|center|side and plot placement`, await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), q = sel => app.querySelector(sel).getBoundingClientRect();
    const d = q(':scope > .deck'), c = q(':scope > .center'), s = q(':scope > .side');
    return d.right <= c.left + 1 && c.right <= s.left + 1 && !!app.querySelector('.center > .strip #plot') && !app.querySelector('#stage #plot')
      && ['#readouts', '#evidence'].every(x => app.querySelector(`.side ${x}`).getBoundingClientRect().height > 0);
  }));
  for (const card of Object.keys(CARDS)) {
    await pick(card, p); const s = await state(p);
    check(`${tag}/${card}: real card selection`, s.preset === card && !s.playing);
    checkMath(s, `${tag}/${card}`);
    const view = await stageView(p, '#stage', false), overlaps = await labelOverlaps(p, '.stage .tag', 0);
    check(`${tag}/${card}: stage layout, HUD, labels and overflow`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) <= 0,
      [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese leftovers`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette remains absent after interactions`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}

if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: declared frame and paused`, s.preset === card && !s.playing && near(s.anchorAzimuthDeg, CARDS[card].still, 1e-8)
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}

check('palette: every observed document stayed undefined', paletteDocuments.length > 0 && paletteDocuments.every(r => r.absent), JSON.stringify(paletteDocuments.filter(r => !r.absent)));
check('palette: dark and light startup documents were observed', paletteDocuments.some(r => r.dark) && paletteDocuments.some(r => !r.dark));
check('palette: zero attempted writes', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings after driver filtering', browserWarnings.length === 0, browserWarnings.slice(0, 4).join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
