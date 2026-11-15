// LORENTZ//OCTAVE 浏览器回归：共享质量门、独立数学、三栏契约与真实交互。
// VIZ_PHASE1=1 缩短共享卡片遍历；VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { session, stageFirstChecks, settle, playsAfter, until, openStill, stageView, labelOverlaps, cjkLeftovers, overflowX, solidPixels } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'lorentz-pseudoscalar-sm-octave-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const RP = 0.8409, LAMBDA_PI = 197.3269804 / 139.57039;
const CARDS = {
  'pseudoscalar-minus-sign': { beta: 0.35, stage: 3, view: 'minus', plot: 'budget', still: 1 / Math.sqrt(1 - 0.35 ** 2) },
  'proper-time-budget-cone': { beta: 0.5, stage: 0, view: 'budget', plot: 'budget', still: 1 / Math.sqrt(0.75) },
  'sm-123-gauge-grades': { beta: 0.35, stage: 3, view: 'grades', plot: 'dof', still: 0.6 },
  'color-confinement-baryon': { beta: 0.35, stage: 3, view: 'color', plot: 'dof', still: 0.6 },
  'pion-yukawa-octave-handoff': { beta: 0.75, stage: 4, view: 'yukawa', plot: 'yukawa', still: 0.9 }
};
const GIDS = [
  'D5/S3/Quantum/FiniteDimensional.qubit_weyl_star',
  'D5/S3/Quantum/Measurement/Bloch/QubitBloch.B_formula_core',
  'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation',
  'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  'D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_CAR',
  'D5/S3/Quantum/SpinChains/SupersymmetricFermion/JordanWigner.fullC_anticomm_of_lt',
  'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/Fourier/FinitePoisson.finite_poisson_summation'
];
const THEORY = ['zh', 'en'].map(lang => `../../${lang}/ch34-s14-lorentz-and-standard-model-octave.html#sec-ch34-lorentz-pseudoscalar-and-sm-octave`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, eps = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= eps;
const number = text => Number(text.replace(/−/g, '-'));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const T = await session(), { page, check } = T;

// 只过滤驱动的 info/warning；任何 console.error 都仍由共享 session 收集。
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const harmless = (type, text) => ['info', 'warning'].includes(type) && driverInfo.test(text);
const browserWarnings = [], paletteDocuments = [], paletteMutations = [], watchedPages = new WeakSet();
let contextScheme = 'dark', contextsAudited = 0;
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', m => {
    if (harmless(m.type(), m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
async function auditPalette(context) {
  const records = [];
  for (const p of context.pages()) for (const frame of p.frames()) records.push(await frame.evaluate(() => ({
    url: location.href, absent: document.documentElement.dataset.trPalette === undefined,
    mutations: window.__lorentzPaletteMutations || []
  })));
  check(`palette context ${++contextsAudited}: absent attribute and zero mutations`, records.length > 0
    && records.every(r => r.absent && r.mutations.length === 0), JSON.stringify(records));
}
async function watchContext(context) {
  await context.exposeBinding('__lorentzPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    window.__lorentzPaletteMutations = [];
    new MutationObserver(records => {
      for (const r of records) {
        const record = { kind: 'mutation', old: r.oldValue, value: r.target.getAttribute(r.attributeName) };
        window.__lorentzPaletteMutations.push(record);
        window.__lorentzPaletteAudit(record).catch(() => {});
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__lorentzPaletteAudit({ kind: 'document',
      absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
  const close = context.close.bind(context);
  context.close = async (...args) => { await auditPalette(context); return close(...args); };
}
await watchContext(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => {
  const context = await newContext({ colorScheme: contextScheme, ...options });
  await watchContext(context);
  return context;
};
// 共享质量门自身遍历双语、桌面、手机、书内与窄引用卡；两种系统主题分别完整执行。
for (const scheme of ['dark', 'light']) {
  contextScheme = scheme;
  await page.emulateMedia({ colorScheme: scheme });
  await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });
}
check('console filter: known driver warnings only, real warnings and every error survive',
  ['KHR_parallel_shader_compile', 'GPU stall due to ReadPixels', 'SwiftShader', 'GL Driver Message', 'WEBGL_debug_renderer_info']
    .every(text => harmless('info', text) && harmless('warning', text) && !harmless('error', text))
  && !harmless('warning', 'Application warning') && !harmless('error', 'Application error'));

const state = (p = page) => p.evaluate(() => window.LORENTZ_OCTAVE_DEBUG.state);
const autoplayReady = new WeakSet();
async function pause(p = page) {
  // 让初次 IntersectionObserver 自动播放先交付，再用可见按钮暂停。
  if (!autoplayReady.has(p)) {
    await p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    autoplayReady.add(p);
  }
  await settle(p);
  // 书内点击远处的 footer 会先把舞台滚出视野并自动暂停；用舞台旁可见的镜像按钮。
  if ((await state(p)).playing) await p.click(await p.locator('#playBtn').isVisible() ? '#playBtn' : '#play');
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`#presets [data-preset="${card}"]`); await settle(p); await pause(p);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

// 用 Cl(3,0) 的子集基做几何积；交换基向量的奇偶性独立给出 I₃² 和标量部。
function blade(a, b) {
  let sign = 1;
  for (let i = 0; i < 3; i++) for (let j = 0; j < i; j++) if ((a & 1 << i) && (b & 1 << j)) sign *= -1;
  return [a ^ b, sign];
}
function multivectorSquare(beta) {
  const a = Array(8).fill(0); a[7] = 1; a[1] = beta;
  const out = Array(8).fill(0);
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) {
    const [mask, sign] = blade(i, j); out[mask] += sign * a[i] * a[j];
  }
  return out;
}
const exteriorDims = [0, 1, 2, 3].map(k => Array.from({ length: 8 }, (_, mask) =>
  [0, 1, 2].filter(j => mask & 1 << j).length).filter(n => n === k).length);
function determinant(matrix) {
  const a = matrix.map(row => [...row]); let result = 1;
  for (let j = 0; j < a.length; j++) {
    let pivot = j;
    for (let i = j + 1; i < a.length; i++) if (Math.abs(a[i][j]) > Math.abs(a[pivot][j])) pivot = i;
    if (Math.abs(a[pivot][j]) < 1e-15) return 0;
    if (pivot !== j) { [a[j], a[pivot]] = [a[pivot], a[j]]; result *= -1; }
    result *= a[j][j];
    for (let i = j + 1; i < a.length; i++) {
      const q = a[i][j] / a[j][j];
      for (let k = j + 1; k < a.length; k++) a[i][k] -= q * a[j][k];
    }
  }
  return result;
}
const gram = vectors => vectors.map(a => vectors.map(b => dot(a, b)));
// 五点差分取势的导数，独立于页面的闭式通量函数。
function flux(r, lambda) {
  if (r === 0) return 1;
  const h = r * 1e-4, potential = x => Math.exp(-x / lambda) / x;
  return -r * r * (potential(r - 2 * h) - 8 * potential(r - h) + 8 * potential(r + h) - potential(r + 2 * h)) / (12 * h);
}
function poissonError(lambda) {
  const sites = Array.from({ length: 12 }, (_, x) => x), H = sites.filter(x => x % 4 === 0);
  const annihilator = sites.filter(k => H.every(h => h * k % 12 === 0));
  const f = sites.map(x => flux(Math.min(x, 12 - x) / 2, lambda));
  const transform = k => f.reduce(([re, im], v, x) => [re + v * Math.cos(Math.PI * k * x / 6), im - v * Math.sin(Math.PI * k * x / 6)], [0, 0]);
  const lhs = H.reduce((sum, h) => sum + f[h], 0) / H.length;
  const rhs = annihilator.map(transform).reduce(([re, im], v) => [re + v[0] / 12, im + v[1] / 12], [0, 0]);
  return Math.hypot(lhs - rhs[0], rhs[1]);
}
function checkMath(s, tag) {
  const remainder = Math.cos(Math.asin(s.beta)), square = multivectorSquare(s.beta);
  check(`${tag}: I3SquaredDiag and multivectorScalarPart from the Clifford subset basis`,
    same(s.I3SquaredDiag, [-1, -1]) && blade(7, 7)[1] === -1 && s.I3SquaredError < 1e-15
    && near(s.multivectorScalarPart, square[0]) && near(square[0], -(remainder ** 2)));
  // p 的特征值为 1±β；以特征值积核对页面的复矩阵行列式与 p p̄。
  const det = (1 - s.beta) * (1 + s.beta);
  check(`${tag}: baylisDet, properTimeRatio and spatialShare obey the unit budget`,
    near(s.baylisDet, det) && s.baylisProductDiag.every(v => near(v, det)) && s.baylisResidual < 1e-12
    && s.bFormulaResidual < 1e-12 && near(s.properTimeRatio, remainder) && near(s.spatialShare, s.beta ** 2)
    && near(s.budgetSum, 1) && near(s.properTime, s.t * remainder) && near(s.phaseOverPi, s.t * remainder));
  const b = Math.min(s.beta, 0.999999), eta = Math.log((1 + b) / (1 - b)) / 2;
  const gamma = 1 / Math.sqrt((1 - b) * (1 + b)), gammaBeta = b * gamma;
  // β=1 时仅快度使用有限截断；大双曲函数相减的误差按其条件数定界。
  const cancellation = 16 * Number.EPSILON * gamma ** 2;
  const residual = s.gamma ** 2 - s.gammaBeta ** 2 - 1;
  check(`${tag}: logarithmic rapidity and independently normalized Bogoliubov pair`,
    near(s.clampedBeta, b) && near(s.rapidity, eta, 1e-9)
    && near(s.gamma, gamma, 1e-9) && near(s.gammaBeta, gammaBeta, 1e-9)
    && near(s.bogoliubovResidual, residual, cancellation) && Math.abs(s.bogoliubovResidual) <= cancellation);
  const ranks = [1, 2, 3], algebraDims = ranks.map(n => n === 1 ? 1 : n * n - 1);
  check(`${tag}: exteriorDims from all subsets, gaugeRanks and settled smStage`,
    same(s.exteriorDims, exteriorDims) && s.exteriorTotal === 2 ** 3 && same(s.gaugeRanks, ranks)
    && same(s.gaugeAlgebraDims, algebraDims) && Number.isInteger(s.smStage) && s.smStage >= 0 && s.smStage <= 4
    && near(s.smStageContinuous, s.smStage));
  const angle = s.colorAngleDeg * Math.PI / 180;
  const colors = [[1, 0, 0], [0, 1, 0], [0, Math.cos(angle), Math.sin(angle)]];
  check(`${tag}: colorSingletDetG3 by elimination and degenerate color cases`,
    near(s.colorSingletDetG3, determinant(gram(colors))) && near(s.colorDetG3Cases.threeOrthogonal, 1)
    && s.colorDetG3Cases.twoColorDuplicate === determinant(gram([colors[0], colors[1], colors[1]]))
    && s.colorDetG3Cases.oneColor === determinant(gram([colors[0], colors[0], colors[0]])));
  const charge = quarks => [...quarks].reduce((sum, q) => sum + ({ u: 2, d: -1 })[q], 0) / 3;
  check(`${tag}: protonCharge and neutronCharge from integer quark charge thirds`,
    near(s.protonCharge, charge('uud')) && near(s.neutronCharge, charge('udd')) && same(s.quarkChargesThirds, { u: 2, d: -1 }));
  check(`${tag}: yukawaFluxAtRp from a five-point potential derivative`,
    near(s.lambdaPi, LAMBDA_PI) && s.protonRadius === RP && near(s.yukawaFluxAtRp, flux(RP, s.lambda), 1e-10)
    && near(s.yukawaFluxAtRpPhysical, flux(RP, LAMBDA_PI), 1e-10));
  const independentError = Math.max(poissonError(s.lambda), poissonError(LAMBDA_PI));
  check(`${tag}: poissonMaxDiff and independent normalized Fourier sums`,
    independentError < 1e-13 && s.poissonMaxDiff >= 0 && s.poissonMaxDiff < 1e-13 && near(s.poissonMaxDiff, independentError, 1e-13));
}
function checkPreset(s, card, tag, still = false) {
  const p = CARDS[card];
  check(`${tag}: selected preset, grade, view, plot, range and settled clock`, s.preset === card
    && near(s.beta, p.beta) && s.smStage === p.stage && s.view === p.view && s.plot === p.plot
    && near(s.lambda, LAMBDA_PI) && near(s.colorAngleDeg, 90) && !s.playing && (!still || near(s.t, p.still)), JSON.stringify(s));
  checkMath(s, tag);
}
async function checkContract(p, tag, desktop = false) {
  const dom = await p.evaluate(() => {
    const q = s => document.querySelector(s), shape = el => [...el.children].map(e => [e.tagName, [...e.classList].sort().join(' ')]);
    const b = s => q(s).getBoundingClientRect();
    return {
      shape: shape(q('.app.lab')), center: [...q('main.center').children].map(e => e.id || e.className),
      side: [...q('.col.side').children].map(e => e.id), plot: !!q('main.center > .strip #plot') && !q('#stage #plot'),
      status: [...q('header.top .status').children].map(e => e.id || e.className),
      info: !!q('#evidence > #infoBtn') && !q('.status #infoBtn'),
      tour: ['prevBtn', 'rewindBtn', 'tourStep', 'tourBody', 'playBtn', 'nextBtn'].every(id => q(`#tour #${id}`)),
      columns: getComputedStyle(q('.app.lab')).gridTemplateColumns.split(' ').length,
      separated: b('.deck').right <= b('.center').left && b('.center').right <= b('.side').left
        && b('.strip').top >= b('#stage').bottom && b('#plot').height >= 54,
      panels: ['#readouts', '#evidence'].every(sel => b(sel).height > 0 && b(sel).width > 0),
      gids: [...document.querySelectorAll('[data-lean-gid]')].map(e => e.dataset.leanGid),
      lean: [...document.querySelectorAll('[data-lean-gid]')].every(e => e.closest('.col.side #evidence .lean')
        && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓'),
      kinds: ['argued', 'model', 'num'].map(k => document.querySelectorAll(`#evidence .lean.${k}`).length),
      opens: document.querySelectorAll('#drawer .lean.open').length,
      outside: document.querySelectorAll('.lean.open:not(#drawer .lean.open)').length,
      links: [...document.querySelectorAll('#drawer a[href^="../../"]')].map(e => e.getAttribute('href')),
      ranges: ['smOctaveStage', 'betaOverC', 'pionRangeScale'].map(id => [q(`#${id}`).min, q(`#${id}`).max, q(`#${id}`).step])
    };
  });
  check(`${tag}: exact deck | center | side lab skeleton`, same(dom.shape,
    [['HEADER', 'top'], ['ASIDE', 'col deck'], ['MAIN', 'center'], ['ASIDE', 'col side'], ['FOOTER', 'rail']])
    && same(dom.center, ['stage', 'tour', 'strip']) && same(dom.side, ['readouts', 'evidence']) && dom.plot);
  check(`${tag}: tour, status, evidence button and three slider domains`, dom.tour && dom.info
    && same(dom.status, ['modePill', 'budgetPill', 'langs'])
    && same(dom.ranges, [['0', '4', '1'], ['0', '1', '0.01'], ['0.40', '2.50', '0.01']]));
  if (desktop) check(`${tag}: three actual grid columns and visible separated panels`, dom.columns === 3 && dom.separated && dom.panels);
  check(`${tag}: twelve exact frozen theorem links and honest evidence categories`, same(dom.gids, GIDS) && dom.lean
    && same(dom.kinds, [1, 1, 1]) && dom.opens === 4 && dom.outside === 0);
  check(`${tag}: exact relative bilingual §34.14 chapter links`, same(dom.links.sort(), [...THEORY].sort()));
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: token colors only and no palette override`,
    !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source)
    && !/\btrPalette\b|data-tr-palette/.test(source));
}
check('source: shared lab grid and wheel:false', !/\.app\.lab[^{}]*\{[^}]*grid-template-columns/.test(sources['style.css'])
  && /wheel:\s*false/.test(sources['main.js']));
check('source: exact five public presets in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: live §34.14 with five bilingual presets and twelve exact GIDs', entry.status === 'live' && entry.section === '34.14'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map(x => x.gid), GIDS));

await T.goto(BOOK, ID, '?lang=zh'); await settle(page); await pause();
await checkContract(page, 'desktop', true);
check('runtime: only shared scripts and page-local assets', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))),
  ['../assets/shell.js', '../assets/kit.js', 'main.js']) && same(await page.$$eval('link[rel="stylesheet"]', els => els.map(e => e.getAttribute('href')).filter(h => !h.startsWith('https:'))),
  ['../assets/theme.css', 'style.css']));
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: real switch updates document and sole pressed language`, await page.evaluate(l =>
    document.documentElement.lang.startsWith(l) && document.querySelectorAll('.langs [aria-pressed="true"]').length === 1
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); checkPreset(await state(), card, `${lang}/${card}`);
    check(`${lang}/${card}: sole pressed preset and declared still`, same(await page.$$eval('#presets [aria-pressed="true"]', els => els.map(e => e.dataset.preset)), [card])
      && near(Number(await page.locator(`#presets [data-preset="${card}"]`).getAttribute('data-still')), CARDS[card].still));
    if (lang === 'en') check(`${lang}/${card}: no CJK leftovers`, (await cjkLeftovers(page)).length === 0);
  }
}

// 全部阶与 β 交叉扫描，含静止和光锥端点，且检查读数与真实滑块同步。
await pick('sm-123-gauge-grades');
for (const grade of [0, 1, 2, 3, 4]) {
  await input('#smOctaveStage', grade);
  check(`grade ${grade}: slider, chip, strip and probe agree`, (await state()).smStage === grade
    && (await state()).preset === null && (await state()).plot === (grade === 0 ? 'budget' : grade === 4 ? 'yukawa' : 'dof')
    && same(await page.$$eval('#gradeChips [aria-pressed="true"]', els => els.map(e => Number(e.dataset.grade))), [grade])
    && Number(await page.inputValue('#smOctaveStage')) === grade);
  for (const beta of [0, 0.2, 0.35, 0.5, 0.8, 0.99, 1]) {
    await input('#betaOverC', beta); const s = await state();
    check(`grade ${grade}/beta ${beta}: slider and visible budget readouts`, near(s.beta, beta) && s.preset === null
      && near(number(await page.locator('#oBeta').innerText()), beta)
      && near(number(await page.locator('#roTau').innerText()), s.properTimeRatio, 5e-5)
      && near(number(await page.locator('#roBaylis').innerText()), s.baylisDet, 5e-5));
    checkMath(s, `grade ${grade}/beta ${beta}`);
    if (beta === 0 || beta === 1) check(`grade ${grade}/beta ${beta}: exact rest/light-cone budget`,
      s.spatialShare === beta && s.properTimeRatio === 1 - beta && near(s.baylisDet, 1 - beta));
  }
}
for (const grade of [4, 3, 2, 1, 0]) {
  await page.click(`#gradeChips [data-grade="${grade}"]`); await settle(page);
  check(`chip ${grade}: actual click synchronizes slider and settled grade`, (await state()).smStage === grade
    && near((await state()).smStageContinuous, grade) && Number(await page.inputValue('#smOctaveStage')) === grade);
}
await pick('pion-yukawa-octave-handoff');
let previousFlux = 0;
for (const lambda of [0.4, 0.65, 1, 1.41, 2, 2.5]) {
  await input('#pionRangeScale', lambda); const s = await state();
  check(`lambda ${lambda}: real range, readout and monotone screening`, near(s.lambda, lambda) && s.plot === 'yukawa' && s.preset === null
    && near(number(await page.locator('#oLambda').innerText()), lambda) && s.yukawaFluxAtRp > previousFlux);
  previousFlux = s.yukawaFluxAtRp; checkMath(s, `lambda ${lambda}`);
}

// 真鼠标拖拽：投影仅定位目标，输入走实际按钮的捕获、移动与释放监听器。
for (const card of ['pseudoscalar-minus-sign', 'proper-time-budget-cone', 'pion-yukawa-octave-handoff']) {
  await pick(card); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
  const before = await state(), image = await picture();
  const start = await page.evaluate(() => window.LORENTZ_OCTAVE_DEBUG.handleBox());
  check(`handle ${card}: projected button is visible and hittable`, start && await page.evaluate(({ x, y }) =>
    document.elementFromPoint(x, y)?.id === 'velocityHandle', start));
  if (!start) continue;
  const target = await page.evaluate(() => {
    const D = window.LORENTZ_OCTAVE_DEBUG, axis = D.driftAxis(), a = D.project(axis.anchor), b = D.project(axis.end);
    return [a[0] + 0.9 * (b[0] - a[0]), a[1] + 0.9 * (b[1] - a[1])];
  });
  await page.mouse.move(start.x, start.y); await page.mouse.down();
  check(`handle ${card}: pointerdown captures the live pointer`, await page.locator('#velocityHandle').evaluate(el =>
    el.classList.contains('dragging') && el.hasPointerCapture(1)));
  await page.mouse.move(target[0], target[1], { steps: 8 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check(`handle ${card}: beta changes to 0.9 and camera does not rotate`, near(after.beta, 0.9, 0.01)
    && after.preset === null && same(after.camera, before.camera) && await picture() !== image
    && near(Number(await page.inputValue('#betaOverC')), after.beta, 0.005));
  await page.mouse.move(start.x + 30, start.y + 30); await settle(page);
  check(`handle ${card}: pointerup releases capture and later moves are ignored`, (await state()).beta === after.beta
    && await page.locator('#velocityHandle').evaluate(el => !el.classList.contains('dragging') && !el.hasPointerCapture(1)));
  checkMath(after, `drag ${card}`);
}
// 取消与失去捕获也必须结束拖动，旧指针不能继续写入。
for (const [i, end] of ['pointercancel', 'lostpointercapture'].entries()) {
  await pick('proper-time-budget-cone'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
  const id = 40 + i;
  const dispatch = async type => {
    await page.locator('#velocityHandle').evaluate((el, args) => {
      const D = window.LORENTZ_OCTAVE_DEBUG, axis = D.driftAxis(), a = D.project(axis.anchor), b = D.project(axis.end);
      el.dispatchEvent(new PointerEvent(args.type, { bubbles: true, cancelable: true, pointerId: args.id,
        pointerType: 'mouse', isPrimary: true, button: 0, buttons: 1,
        clientX: a[0] + 0.85 * (b[0] - a[0]), clientY: a[1] + 0.85 * (b[1] - a[1]) }));
    }, { type, id }); await settle(page);
  };
  await dispatch('pointerdown'); await dispatch('pointermove');
  check(`${end}: setup actually drags the handle`, near((await state()).beta, 0.85, 0.01)
    && await page.locator('#velocityHandle').evaluate(el => el.classList.contains('dragging')));
  await dispatch(end); await input('#betaOverC', 0.3); await dispatch('pointermove');
  check(`${end}: clears dragging and ignores the cancelled pointer`, near((await state()).beta, 0.3)
    && await page.locator('#velocityHandle').evaluate(el => !el.classList.contains('dragging')));
}
await pick('proper-time-budget-cone'); await page.focus('#velocityHandle');
for (const [key, delta] of [['ArrowLeft', 0.01], ['ArrowUp', 0.01], ['ArrowRight', -0.01], ['ArrowDown', -0.01]]) {
  const before = await state(); await page.keyboard.press(key); await settle(page);
  check(`handle keyboard ${key}: one beta step and fixed camera`, near((await state()).beta, before.beta + delta)
    && same((await state()).camera, before.camera));
}

// 坐标时间、固有时相位与两个播放按钮都用真实控件核验。
for (const card of Object.keys(CARDS)) {
  check(`play ${card}: card starts and advances even under slow frames`, await playsAfter(page,
    () => page.click(`#presets [data-preset="${card}"]`), () => window.LORENTZ_OCTAVE_DEBUG.state));
  await settle(page); await pause();
}
await pick('pseudoscalar-minus-sign'); await input('#now', 2);
checkMath(await state(), 'coordinate rail ct=2');
for (const play of ['#play']) {
  await page.click('#rew'); await settle(page);
  check(`${play}: rewind pauses at zero`, (await state()).t === 0 && !(await state()).playing);
  check(`${play}: real button advances`, await playsAfter(page, () => page.click(play), () => window.LORENTZ_OCTAVE_DEBUG.state));
  await settle(page); await page.click(play); await settle(page); const stopped = await state();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); await settle(page);
  check(`${play}: settled pause holds rail and both play indicators`, !stopped.playing && (await state()).t === stopped.t
    && await page.locator('#play').getAttribute('aria-pressed') === 'false'
    && await page.locator('#playBtn').getAttribute('aria-pressed') === 'false');
}
for (const speed of [0.5, 2, 1]) {
  await page.click(`#speedChips [data-speed="${speed}"]`); await settle(page);
  check(`speed ${speed}: sole pressed speed`, same(await page.$$eval('#speedChips [aria-pressed="true"]', els => els.map(e => Number(e.dataset.speed))), [speed]));
}
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page); await page.click('#infoBtn'); await settle(page);
  check(`drawer ${lang}: visible modal and explicit numerical disclaimer`, await page.locator('#drawer [role="dialog"]').isVisible()
    && /不是证明|not a proof/i.test(await page.locator(`#drawer .sheet > .${lang}`).innerText()));
  if (lang === 'en') check('drawer en: no CJK leftovers', (await cjkLeftovers(page)).length === 0);
  await page.keyboard.press('Escape'); await settle(page);
  check(`drawer ${lang}: Escape closes`, await page.locator('#drawer').evaluate(el => el.hidden));
  await page.click('#infoBtn'); await settle(page); await page.click('#drawerClose'); await settle(page);
  check(`drawer ${lang}: close button closes`, await page.locator('#drawer').evaluate(el => el.hidden));
}

// 主题 × 语言 × 桌面／手机／书内；短屏与窄引用卡补充共享质量门的逐卡数学核验。
const paletteSamples = [];
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
  [1440, 900, false, false], [1081, 500, false, false], [390, 844, false, false],
  [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
]) {
  contextScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? '&preset=pseudoscalar-minus-sign' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await settle(p); await pause(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
  check(`${tag}: requested system preference and no page palette`, await p.evaluate(s =>
    matchMedia(`(prefers-color-scheme: ${s})`).matches && document.documentElement.dataset.trPalette === undefined, scheme));
  paletteSamples.push(await p.evaluate(() => {
    const s = getComputedStyle(document.documentElement);
    return ['color-scheme', '--bg', '--ink', '--cyan', '--magenta', '--violet', '--amber'].map(k => s.getPropertyValue(k).trim());
  }));
  await checkContract(p, tag, !embed && width > 1080);
  for (const [i, card] of Object.keys(CARDS).entries()) {
    if (embed) { if (i) { await p.click('#nextBtn'); await settle(p); await pause(p); } }
    else await pick(card, p);
    checkPreset(await state(p), card, `${tag}/${card}`);
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p);
    check(`${tag}/${card}: no overlaps, HUD collisions or horizontal overflow`, view.layout.length === 0
      && view.hud.length === 0 && overlaps.length === 0 && await overflowX(p) === 0,
    [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no CJK leftovers`, (await cjkLeftovers(p)).length === 0);
  }
  // 完整书内实验室显示导览播放／回卷；桌面与引用卡按共享契约隐藏这两个按钮。
  if (embed && !figure) {
    await p.click('#rewindBtn'); await settle(p);
    check(`${tag}: tour rewind pauses at zero`, (await state(p)).t === 0 && !(await state(p)).playing);
    check(`${tag}: tour play advances under slow frames`, await playsAfter(p, () => p.click('#playBtn'), () => window.LORENTZ_OCTAVE_DEBUG.state));
    await settle(p);
    check(`${tag}: tour and rail play indicators agree`, await p.locator('#playBtn').getAttribute('aria-pressed') === 'true'
      && await p.locator('#play').getAttribute('aria-pressed') === 'true');
    await p.click('#playBtn'); await settle(p); const stopped = await state(p);
    await p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); await settle(p);
    check(`${tag}: tour pause holds the clock and rail`, !stopped.playing && (await state(p)).t === stopped.t
      && await p.locator('#playBtn').getAttribute('aria-pressed') === 'false'
      && await p.locator('#play').getAttribute('aria-pressed') === 'false');
    await p.click('#prevBtn'); await settle(p); await pause(p);
    checkPreset(await state(p), 'color-confinement-baryon', `${tag}/tour previous`);
    await p.click('#nextBtn'); await settle(p); await pause(p);
    checkPreset(await state(p), 'pion-yukawa-octave-handoff', `${tag}/tour next`);
  }
  check(`${tag}: palette stays absent after all presets`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
check('palette: one identical night console across both preferences and all viewports', paletteSamples.length === 24
  && paletteSamples.every(s => s[0] === 'dark' && same(s, paletteSamples[0]) && s.slice(2).every(Boolean)));

// 有标签静帧与封面使用同一停帧协议；逐张核对图注所指的读数。
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag, true);
  check(`${tag}: shot protocol pauses at the declared frame`, await p.evaluate(() => TRV.shot && TRV.still
    && document.documentElement.dataset.trPalette === undefined));
  if (card === 'pseudoscalar-minus-sign' || card === 'proper-time-budget-cone') check(`${tag}: one unit of proper time`, near(s.properTime, 1) && near(s.phaseOverPi, 1));
  if (card === 'pion-yukawa-octave-handoff') check(`${tag}: physical pion range gives flux 0.880`, s.smStage === 4 && s.yukawaFluxAtRp.toFixed(3) === '0.880');
  await p.context().close();
}
await pick('pseudoscalar-minus-sign'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
const pixels = await solidPixels(page);
check('solid: lit opaque body has substantial area and shading', pixels && pixels.share >= 0.16 && pixels.share <= 0.28
  && pixels.spread >= 0.04, JSON.stringify(pixels));
await auditPalette(T.context);
check('palette: every observed document has dataset.trPalette undefined', paletteDocuments.length > 0
  && paletteDocuments.every(r => r.absent), JSON.stringify(paletteDocuments.filter(r => !r.absent)));
check('palette: dark and light observed at document startup', paletteDocuments.some(r => r.dark) && paletteDocuments.some(r => !r.dark));
check('palette: zero mutations in every browser context', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero real browser warnings', browserWarnings.length === 0, browserWarnings.join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
