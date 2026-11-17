// TRIAD//LOOP 浏览器回归：共享质量门、三栏契约、独立数学与真实交互。
// 单独用 node 运行；VIZ_PHASE1=1 缩短共享遍历，VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'triadic-arc-field-loop-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'arc-seed-triad': { stage: 0, view: 'iso', still: 0.62 },
  'line-particle-worldline': { stage: 1, view: 'iso', still: 0.62 },
  'surface-wave-sagitta': { stage: 2, view: 'iso', still: 0.62 },
  'volume-field-condensation': { stage: 3, view: 'iso', still: 0.62 },
  'reversal-field-to-particle': { stage: 4, view: 'top', still: 1 }
};
const GIDS = [
  'D5/S3/Fourier/FinitePoisson.finite_poisson_summation',
  'D5/S3/Fourier/FinitePoisson.sum_annihilator_character',
  'D5/S1/Phase/ContinuousAverage.continuous_average_tendsto_haar',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
];
const CHAPTER = 'ch34-s12-triadic-duality.html';
const THEORY = ['zh', 'en'].flatMap(lang => [
  `../../${lang}/${CHAPTER}#sec-ch34-triadic-duality-and-field-loop`,
  `../../${lang}/ch34-s04-infinitesimal-trihedron.html#sec-ch34-infinitesimal-spherical-trihedron`
]);
const T = await session(), { page, check } = T;

// 导航前记录任何调色板属性写入；关闭上下文之前再读取本地记录，避免异步回传漏记。
const paletteMutations = [], schemesSeen = new Set();
let contextScheme = 'dark', contextsAudited = 0;
async function auditPalette(context) {
  const records = [];
  for (const p of context.pages()) for (const frame of p.frames()) {
    records.push(await frame.evaluate(() => ({
      url: location.href, absent: document.documentElement.dataset.trPalette === undefined,
      mutations: window.__triadPaletteMutations || []
    })));
  }
  check(`palette context ${++contextsAudited}: dataset undefined and zero mutations in every document`,
    records.length > 0 && records.every(r => r.absent && r.mutations.length === 0), JSON.stringify(records));
}
async function watchPalette(context) {
  await context.exposeBinding('__triadPaletteMutation', ({ page: p }, record) => paletteMutations.push({ url: p.url(), ...record }));
  await context.addInitScript(() => {
    window.__triadPaletteMutations = [];
    new MutationObserver(records => {
      for (const r of records) {
        const record = { element: r.target.tagName, old: r.oldValue, value: r.target.getAttribute(r.attributeName) };
        window.__triadPaletteMutations.push(record);
        window.__triadPaletteMutation(record).catch(() => {});
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
  });
  const close = context.close.bind(context);
  context.close = async (...args) => { await auditPalette(context); return close(...args); };
}
await page.emulateMedia({ colorScheme: 'dark' });
schemesSeen.add('dark');
await watchPalette(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => {
  const colorScheme = options?.colorScheme || contextScheme;
  const context = await newContext({ ...options, colorScheme });
  schemesSeen.add(colorScheme);
  await watchPalette(context);
  return context;
};
await stageFirstChecks(T, "quantum-geometry", "triadic-arc-field-loop-sandbox", { solid: true, cards: !PHASE1, settle: 0 });

const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < tol;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const state = (p = page) => p.evaluate(() => window.TRIAD_LOOP_DEBUG.state);
async function waitPreset(p, card, timeout = 3000) {
  const expected = { card, ...CARDS[card] };
  return until(p, ({ card: id, stage, view }) => {
    const s = window.TRIAD_LOOP_DEBUG.state;
    return s.preset === id && s.triadStage === stage && s.stageIndex === stage
      && s.arcAngleDeg === 60 && s.cancelSharpness === 1 && s.view === view && !s.playing && s.max === 1;
  }, expected, timeout);
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
// 书内窄框里，按到播放键要先滚动；舞台若因此不足半屏，页面自己的原生可见性观察器会先暂停时钟。
// 新建观察器的首次回调与页面观察器对这次滚动的裁决同批或更晚送达，等到它，再读到的 playing 才算数。
const visibilityJudged = (p) => p.locator('#stage').evaluate(el => new Promise(resolve => {
  const observer = new IntersectionObserver(() => { observer.disconnect(); resolve(); });
  observer.observe(el);
}));
const stageShare = (p) => p.locator('#stage').evaluate(el => {
  const r = el.getBoundingClientRect();
  return Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top)) / r.height;
});
// 在页面内同步检查播放键状态并按需按下，不触发滚动或滚动后的可见性暂停。
async function pause(p = page) {
  await p.locator('#play').evaluate(button => { if (button.getAttribute('aria-pressed') === 'true') button.click(); });
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`); await settle(p); await pause(p); await waitPreset(p, card);
}
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

// 带主元的高斯消元独立求行列式，不调用页面的余子式函数。
function determinant(matrix) {
  const a = matrix.map(row => [...row]);
  let result = 1;
  for (let col = 0; col < a.length; col++) {
    let pivot = col;
    for (let i = col + 1; i < a.length; i++) if (Math.abs(a[i][col]) > Math.abs(a[pivot][col])) pivot = i;
    if (Math.abs(a[pivot][col]) < 1e-15) return 0;
    if (pivot !== col) { [a[pivot], a[col]] = [a[col], a[pivot]]; result *= -1; }
    result *= a[col][col];
    for (let i = col + 1; i < a.length; i++) {
      const q = a[i][col] / a[col][col];
      for (let j = col + 1; j < a.length; j++) a[i][j] -= q * a[col][j];
    }
  }
  return result;
}
// 用复数对象与一般矩阵乘法核算 Tr(ρAρBρC)，另以三重积验证符号。
const z = (re, im = 0) => ({ re, im });
const plus = (a, b) => z(a.re + b.re, a.im + b.im);
const times = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const product = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((acc, x, k) => plus(acc, times(x, b[k][j])), z(0))));
function independentGeometry(degrees) {
  const e = degrees * Math.PI / 180, s = Math.sin(e), c = Math.cos(e);
  const anchors = [[s, c, 0], [0, 1, 0], [0, c, s]];
  const gram = anchors.map(a => anchors.map(b => dot(a, b)));
  const rho = ([x, y, zz]) => [[z((1 + zz) / 2), z(x / 2, -y / 2)], [z(x / 2, y / 2), z((1 - zz) / 2)]];
  const trace = product(product(rho(anchors[0]), rho(anchors[1])), rho(anchors[2]));
  return { anchors, gram, sin: s, sag: 1 - c, omega: 2 * Math.atan2(s * s, (1 + c) ** 2),
    det: determinant(gram), barg: plus(trace[0][0], trace[1][1]) };
}

// 直接用三角函数求 DFT；零化子由整数同余穷举，与页面的查表特征值实现独立。
const SITES = Array.from({ length: 12 }, (_, i) => i), H3 = [0, 3, 6, 9];
function independentPoisson(degrees) {
  const e = degrees * Math.PI / 180;
  const f = SITES.map(x => {
    const w = 1 + Math.sin(e) * Math.cos(Math.PI * x / 6);
    return z(w * Math.cos(x * e), w * Math.sin(x * e));
  });
  const ft = SITES.map(k => f.reduce((acc, value, j) => {
    const a = -2 * Math.PI * j * k / 12;
    return plus(acc, times(value, z(Math.cos(a), Math.sin(a))));
  }, z(0)));
  return [[0], H3, SITES].map((elements, i) => {
    const annihilator = SITES.filter(k => elements.every(h => k * h % 12 === 0));
    const lhs = elements.reduce((acc, h) => plus(acc, f[h]), z(0));
    const rhs = annihilator.reduce((acc, k) => plus(acc, times(z(elements.length / 12), ft[k])), z(0));
    return { name: ['H_0', 'H_3', 'H_12'][i], elements, annihilator, diff: Math.hypot(lhs.re - rhs.re, lhs.im - rhs.im) };
  });
}
function independentLoop(kappa, winding) {
  const amplitudes = SITES.map(x => {
    const sum = [0, 4, 8].reduce((acc, k) => {
      const a = 2 * Math.PI * ((k * x) % 12) * winding / 12, amp = k === 0 ? 1 : kappa;
      return plus(acc, z(amp * Math.cos(a), amp * Math.sin(a)));
    }, z(0));
    return Math.hypot(sum.re, sum.im) / (1 + 2 * kappa);
  });
  return { amplitudes, rms: Math.sqrt(SITES.filter(x => !H3.includes(x)).reduce((sum, x) => sum + amplitudes[x] ** 2, 0) / 8) };
}
// 整数边函数的两次上边缘，遍历全部 4^4 个四元组，并扰动一个面核对计数恒等式。
function independentCochain() {
  const V = [0, 1, 2, 3], edge = (i, j) => ((H3[j] - H3[i]) % 12 + 12) % 12;
  const face = (i, j, k) => edge(j, k) - edge(i, k) + edge(i, j);
  const bumped = (i, j, k) => face(i, j, k) + Number(i === 0 && j === 1 && k === 2);
  const delta = (f, a, b, c, d) => f(b, c, d) - f(a, c, d) + f(a, b, d) - f(a, b, c);
  let max = 0, bumpedDefects = 0;
  const faceErrors = V.map(() => 0), values = new Set();
  for (const a of V) for (const b of V) for (const c of V) for (const d of V) {
    max = Math.max(max, Math.abs(delta(face, a, b, c, d)));
    bumpedDefects += Number(delta(bumped, a, b, c, d) !== 0);
    faceErrors[a] += Number(delta(face, a, b, c, d) !== 0);
    values.add(face(b, c, d));
  }
  return { max, bumpedDefects, faceErrors, values: [...values].sort((a, b) => a - b) };
}
const cochain = independentCochain();
const weylAlpha = 2 / (1 + Math.sqrt(5));
const weylExpected = Math.abs(Math.sin(233 * Math.PI * weylAlpha) / Math.sin(Math.PI * weylAlpha)) / 233;
for (const elements of [[0], H3, SITES]) {
  const ann = SITES.filter(k => elements.every(h => (h * k) % 12 === 0));
  check(`independent character orthogonality H={${elements.join(',')}}`, elements.length * ann.length === 12 && SITES.every(x => {
    const sum = ann.reduce((acc, k) => plus(acc, z(Math.cos(2 * Math.PI * k * x / 12), Math.sin(2 * Math.PI * k * x / 12))), z(0));
    return Math.hypot(sum.re - (elements.includes(x) ? ann.length : 0), sum.im) < 1e-13;
  }));
}
function checkMath(s, tag) {
  const g = independentGeometry(s.arcAngleDeg), poisson = independentPoisson(s.arcAngleDeg);
  const target = independentLoop(s.cancelSharpness, 1), now = independentLoop(s.cancelSharpness, s.windingW);
  check(`${tag}: grade 1 chord and grade 2 sagitta`, near(s.order1ChordSin, g.sin) && near(s.order2Sagitta, g.sag));
  check(`${tag}: Girard excess and sector volume against atan2`, near(s.order2GirardExcess, g.omega)
    && near(s.order3SectorVol, g.omega / 3));
  check(`${tag}: exact cell Gram determinant by independent elimination`, near(s.order3DetG3, g.det)
    && near(s.order3DetG3, Math.sin(s.arcAngleDeg * Math.PI / 180) ** 4));
  check(`${tag}: Bargmann trace by complex matrices and oriented triple product`, near(s.order3BargmannIm, g.barg.im)
    && near(s.order3BargmannIm, dot(g.anchors[0], cross(g.anchors[1], g.anchors[2])) / 4)
    && near(s.bargmannRe, g.barg.re) && near(s.bargmannArg, g.omega / 2) && s.bargmannErr < 1e-14 && s.lagrangeErr < 1e-14);
  check(`${tag}: three generators, exterior top grade and square-zero cochain`,
    determinant([[0, 0, 1], [1, 0, 0], [0, 1, 0]]) !== 0 && s.su2GeneratorCount === 3 && s.deRhamMaxGrade === 3
    && same(s.gradeDims, [1, 3, 3, 1]) && s.cochainSquareZeroMaxErr === cochain.max && cochain.max === 0
    && s.tetraDefects === 0 && same(s.faceErrors, cochain.faceErrors) && same(s.cochainFaceValues, cochain.values)
    && s.incidence.tetraDefects === cochain.bumpedDefects && s.incidence.faceErrorSum === cochain.bumpedDefects
    && s.orthComplementIdErr < 1e-14);
  check(`${tag}: three finite Poisson identities by independent DFT`, s.poissonSubgroups.length === 3 && s.poissonMaxDiff < 1e-13
    && poisson.every((r, i) => r.diff < 1e-13 && s.poissonSubgroups[i].diff < 1e-13
      && r.name === s.poissonSubgroups[i].name && same(r.elements, s.poissonSubgroups[i].elements)
      && same(r.annihilator, s.poissonSubgroups[i].annihilator)) && s.characterMaxDiff < 1e-13,
    JSON.stringify({ independent: poisson, actual: s.poissonSubgroups }));
  check(`${tag}: all twelve current and target character sums`, s.siteTargets.length === 12 && s.siteAmplitudes.length === 12
    && target.amplitudes.every((a, i) => near(a, s.siteTargets[i])) && now.amplitudes.every((a, i) => near(a, s.siteAmplitudes[i]))
    && near(s.offShellRms, target.rms) && near(s.offShellRmsNow, now.rms) && s.onShellPeak === 1);
  check(`${tag}: finite irrational average against the geometric-series modulus`, s.weylN === 233 && near(s.weylAvgAbs, weylExpected));
  if (s.cancelSharpness === 1) check(`${tag}: off-shell triangular cancellation and on-shell peak one`,
    s.offShellRms < 1e-14 && s.onShellPeak === 1 && s.siteTargets.every((a, x) => H3.includes(x) ? a === 1 : a < 1e-14));
  if (s.arcAngleDeg === 0) check(`${tag}: all six grades extinguish exactly`, [s.order1ChordSin, s.order2Sagitta,
    s.order2GirardExcess, s.order3SectorVol, s.order3DetG3, s.order3BargmannIm].every(v => v === 0));
}
// 精确停帧逐项比对；失败时只列出偏离的字段及其实际值与期望值。
function presetMismatch(s, card) {
  const p = CARDS[card], want = { preset: card, triadStage: p.stage, stageIndex: p.stage, arcAngleDeg: 60,
    cancelSharpness: 1, view: p.view, playing: false, max: 1 };
  return Object.fromEntries(Object.entries(want).filter(([k, v]) => (k === 'playing' ? !!s.playing : s[k]) !== v)
    .map(([k, v]) => [k, { actual: s[k], expected: v }]));
}
function checkPreset(s, card, tag) {
  const mismatch = presetMismatch(s, card);
  check(`${tag}: exact preset controls`, Object.keys(mismatch).length === 0, JSON.stringify({ mismatch, t: s.t }));
  checkMath(s, tag);
}
async function checkLinks(p, tag) {
  check(`${tag}: exactly nine frozen theorem links in the side evidence panel`,
    same(await p.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', els => els.every(e => e.tagName === 'A' && e.closest('.col.side #evidence .lean')
      && e.closest('.lean').querySelector('.ok').textContent.trim() === 'LEAN ✓' && /\/blob\/[0-9a-f]{40}\//.test(e.href))));
  check(`${tag}: exact relative bilingual theory links`, same(await p.$$eval('#drawer a[href^="../../"]',
    els => els.map(e => e.getAttribute('href')).sort()), [...THEORY].sort()));
}
async function desktopContract(p, tag) {
  const layout = await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .col.deck'),
      center = app.querySelector(':scope > .center'), side = app.querySelector(':scope > .col.side');
    const d = deck.getBoundingClientRect(), c = center.getBoundingClientRect(), s = side.getBoundingClientRect();
    return { columns: getComputedStyle(app).gridTemplateColumns.split(/\s+/).length,
      ordered: d.right <= c.left && c.right <= s.left, plot: document.querySelector('#plot').getBoundingClientRect().height,
      plotInStrip: !!document.querySelector('.center > .strip #plot') && !document.querySelector('#stage #plot'),
      evidence: ['argued', 'model', 'num'].every(kind => side.querySelector(`#evidence .lean.${kind} .ok`)?.textContent.trim() === kind.toUpperCase())
        && !!side.querySelector('#evidence #infoBtn'),
      noStageWarning: !document.querySelector('#stage .wn, #stage .c-wn, #stage [style*="--warn"]') };
  });
  check(`${tag}: triadic-nameless-sandbox three-column app.lab contract`, layout.columns === 3 && layout.ordered
    && layout.plotInStrip && layout.plot >= 54 && layout.evidence && layout.noStageWarning, JSON.stringify(layout));
  check(`${tag}: side readouts and evidence visible`, await p.locator('.col.side #readouts').isVisible()
    && await p.locator('.col.side #evidence').isVisible());
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: zero literal colors`, !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source));
  check(`source ${file}: zero palette overrides or warning color`, !/\btrPalette\b|data-tr-palette|\bP\s*\.\s*warn\b|--warn\b/.test(source));
}
check('source: no grid-template-columns override', !/grid-template-columns\s*:/i.test(sources['style.css']));
check('source: all five cards in public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
check('source: wheel false leaves host scrolling enabled', /wheel:\s*false/.test(sources['main.js']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: live 34.12 entry, five bilingual cards and exact nine GIDs', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.12'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));

await T.goto(BOOK, ID, '?lang=en'); await settle(page);
check('runtime: shared scripts and styles only', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))),
  ['../assets/shell.js', '../assets/kit.js', 'main.js']) && same(await page.$$eval('link[rel="stylesheet"]',
  els => els.map(e => e.getAttribute('href')).filter(h => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
await checkLinks(page, 'runtime'); await desktopContract(page, 'runtime');
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`toggle ${lang}: document language and pressed control`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) { await pick(card); checkPreset(await state(), card, `toggle ${lang}/${card}`); }
}

// 每张实验卡都走真实滑块，覆盖全部角度与相消锐度的笛卡尔积。
for (const card of Object.keys(CARDS)) {
  await pick(card); const camera = (await state()).camera;
  for (const angle of [0, 15, 30, 60, 85]) for (const kappa of [0, 0.5, 1]) {
    await input('#arcAngleDeg', angle); await input('#cancelSharpness', kappa);
    const s = await state(), tag = `sweep ${card}/epsilon=${angle}/kappa=${kappa}`;
    check(`${tag}: sliders apply without rotating the camera`, s.arcAngleDeg === angle && s.cancelSharpness === kappa
      && s.triadStage === CARDS[card].stage && s.preset === null && !s.playing && same(s.camera, camera));
    checkMath(s, tag);
  }
}
for (let stage = 0; stage <= 4; stage++) {
  await page.click(`#stageChips [data-stage="${stage}"]`); await settle(page);
  const s = await state();
  check(`stage chip ${stage}: stage, free exploration and pressed state`, s.triadStage === stage && s.stageIndex === stage
    && s.preset === null && await page.locator(`#stageChips [data-stage="${stage}"]`).getAttribute('aria-pressed') === 'true');
  checkMath(s, `stage chip ${stage}`);
}
for (const stage of [0, 0.5, 1.5, 2.5, 3.5, 4]) {
  await input('#triadStage', stage); await input('#now', 0.5); const s = await state();
  const u = Math.max(0, Math.min(1, stage - 3));
  check(`phase slider ${stage}: continuous stage and winding`, s.triadStage === stage && s.stageIndex === Math.round(stage)
    && near(s.windingW, u * u * (3 - 2 * u) * 0.5) && s.preset === null);
  checkMath(s, `phase slider ${stage}`);
}
for (const view of ['iso', 'top', 'cell']) {
  await page.click(`#sceneChips [data-scene="${view}"]`); await settle(page);
  check(`view ${view}: selected through stage chip`, (await state()).view === view
    && await page.locator(`#sceneChips [data-scene="${view}"]`).getAttribute('aria-pressed') === 'true');
}

// 滑块从非零收拢到零，数值、读数与舞台一起改变，镜头完全不动。
await pick('volume-field-condensation'); await input('#arcAngleDeg', 85);
const sliderCamera = (await state()).camera, openImage = await picture();
let previous = await state();
for (const angle of [60, 30, 15, 0]) {
  await input('#arcAngleDeg', angle); const s = await state();
  check(`slider extinction ${angle}: six measures decrease with fixed camera`, same(s.camera, sliderCamera)
    && ['order1ChordSin', 'order2Sagitta', 'order2GirardExcess', 'order3SectorVol', 'order3DetG3', 'order3BargmannIm'].every(k => s[k] < previous[k]));
  checkMath(s, `slider extinction ${angle}`); previous = s;
}
check('slider extinction: visible readouts and stage reach zero', await page.locator('#roLine').textContent() === '0.000000'
  && await page.locator('#roSurf').textContent() === '0.0000 / 0.0000' && await page.locator('#roVol').textContent() === '0.0000 / 0.0000'
  && await picture() !== openImage);

// 探针仅用于投影定位；取景在真实 pointerdown 时冻结，再计算拖动的目标坐标。
async function handleTarget(degrees) {
  return page.evaluate(d => { const probe = window.TRIAD_LOOP_DEBUG; return probe.screen(probe.trackPoint(d)); }, degrees);
}
await pick('surface-wave-sagitta'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
for (const angle of [85, 30, 0]) {
  const before = await state(), box = await page.locator('#arcHandle').boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  check(`handle drag ${angle}: pointer captured and dragging`, await page.locator('#arcHandle').evaluate(el => el.classList.contains('dragging') && el.hasPointerCapture(1)));
  const target = await handleTarget(angle);
  await page.mouse.move(...target, { steps: 8 }); await page.mouse.up(); await settle(page);
  const s = await state();
  check(`handle drag ${angle}: angle changes without orbit`, near(s.arcAngleDeg, angle) && s.arcAngleDeg !== before.arcAngleDeg
    && s.preset === null && same(s.camera, before.camera), JSON.stringify({ before: before.arcAngleDeg, actual: s.arcAngleDeg, target: angle }));
  checkMath(s, `handle drag ${angle}`);
  await page.mouse.move(target[0] + 20, target[1] + 15); await settle(page);
  check(`handle drag ${angle}: release clears capture and ignores subsequent motion`, (await state()).arcAngleDeg === s.arcAngleDeg
    && await page.locator('#arcHandle').evaluate(el => !el.classList.contains('dragging') && !el.hasPointerCapture(1)));
}
async function pointer(type, degrees, id) {
  const xy = await handleTarget(degrees);
  await page.locator('#arcHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true, button: 0,
    buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.xy[0], clientY: a.xy[1]
  })), { type, xy, id }); await settle(page);
}
for (const [i, end] of ['pointercancel', 'lostpointercapture'].entries()) {
  const id = 41 + 2 * i, camera = (await state()).camera;
  await pointer('pointerdown', 0, id); await pointer('pointermove', 45, id);
  check(`${end}: setup drags the intended pointer`, near((await state()).arcAngleDeg, 45));
  await pointer('pointermove', 70, id + 10);
  check(`${end}: unrelated pointer cannot move the arc`, near((await state()).arcAngleDeg, 45));
  await pointer(end, 45, id); const cancelled = await state(); await pointer('pointermove', 5, id);
  check(`${end}: cleanup ignores the old pointer`, (await state()).arcAngleDeg === cancelled.arcAngleDeg
    && !(await page.locator('#arcHandle').evaluate(el => el.classList.contains('dragging'))));
  await pointer('pointerdown', 45, id + 1); await pointer('pointermove', 60, id + 1); await pointer('pointerup', 60, id + 1);
  check(`${end}: fresh pointer works with camera fixed`, near((await state()).arcAngleDeg, 60) && same((await state()).camera, camera));
}
await page.focus('#arcHandle'); await page.keyboard.press('Home'); await settle(page);
check('handle keyboard Home extinguishes the arc', (await state()).arcAngleDeg === 0);
await page.keyboard.press('End'); await settle(page);
await page.keyboard.press('ArrowLeft'); await settle(page);
check('handle keyboard End and ArrowLeft reach 84 degrees', (await state()).arcAngleDeg === 84);

// 条带可改角；反向回环卡的条带只读。
await pick('line-particle-worldline');
await page.locator('#plot').scrollIntoViewIfNeeded(); await settle(page);
let plot = await page.locator('#plot').boundingBox();
await page.mouse.click(plot.x + 34 + (plot.width - 46) * 30 / 85, plot.y + plot.height / 2); await settle(page);
check('strip plot pointer changes epsilon', Math.abs((await state()).arcAngleDeg - 30) <= 0.2 && (await state()).preset === null);
await pick('reversal-field-to-particle');
await page.locator('#plot').scrollIntoViewIfNeeded(); await settle(page);
plot = await page.locator('#plot').boundingBox();
await page.mouse.click(plot.x + plot.width / 3, plot.y + plot.height / 2); await settle(page);
check('reversal plot is readonly', (await state()).arcAngleDeg === 60 && (await state()).preset === 'reversal-field-to-particle'
  && await page.locator('#plot').evaluate(el => el.classList.contains('readonly')));

await pause(); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
const orbitBefore = await state(), stageBox = await page.locator('#stage').boundingBox(), orbitImage = await picture();
await page.mouse.move(stageBox.x + stageBox.width * 0.32, stageBox.y + stageBox.height * 0.58);
await page.mouse.down(); await page.mouse.move(stageBox.x + stageBox.width * 0.52, stageBox.y + stageBox.height * 0.68, { steps: 8 });
await page.mouse.up(); await settle(page);
const orbitAfter = await state();
check('canvas orbit changes the camera and rendering without changing mathematics', !same(orbitAfter.camera, orbitBefore.camera)
  && orbitAfter.arcAngleDeg === orbitBefore.arcAngleDeg && near(orbitAfter.order3DetG3, orbitBefore.order3DetG3) && await picture() !== orbitImage);
const wheel = await page.evaluate(() => {
  const before = window.TRIAD_LOOP_DEBUG.state.camera, original = Event.prototype.preventDefault; let calls = 0;
  Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
  try {
    const events = [...document.querySelectorAll('#stage canvas')].map(el => {
      const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
      return { allowed: el.dispatchEvent(ev), cancelled: ev.defaultPrevented };
    });
    return { before, after: window.TRIAD_LOOP_DEBUG.state.camera, calls, events };
  } finally { Event.prototype.preventDefault = original; }
});
check('wheel: every stage canvas passes through without preventDefault or zoom', wheel.calls === 0 && wheel.events.length > 0
  && wheel.events.every(e => e.allowed && !e.cancelled) && same(wheel.before, wheel.after), JSON.stringify(wheel));
await page.click('#rew'); await settle(page);
check('rewind pauses at zero', (await state()).t === 0 && !(await state()).playing);
check('play advances under slow frames', await playsAfter(page, () => page.click('#play'), () => window.TRIAD_LOOP_DEBUG.state));
await pause(); const pausedTime = (await state()).t; await settle(page);
check('pause keeps the clock still', !(await state()).playing && (await state()).t === pausedTime);
for (const speed of ['0.5', '2', '1']) {
  await page.click(`#speedChips [data-speed="${speed}"]`); await settle(page);
  check(`speed ${speed}: pressed control`, await page.locator(`#speedChips [data-speed="${speed}"]`).getAttribute('aria-pressed') === 'true');
}
await input('#now', 1); checkMath(await state(), 'reversal terminal rail');
check('reversal terminal rail condenses only on H3', (await state()).windingW === 1 && (await state()).offShellRmsNow < 1e-14);
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page); await page.click('#infoBtn');
  check(`drawer ${lang}: info button opens dialog`, await page.locator('#drawer [role="dialog"]').isVisible());
  if (lang === 'en') check('drawer en: zero Chinese leftovers', (await cjkLeftovers(page)).length === 0);
  await page.keyboard.press('Escape'); check(`drawer ${lang}: Escape closes`, !(await page.locator('#drawer').isVisible()));
  await page.click('#infoBtn'); await page.click('#drawerClose');
  check(`drawer ${lang}: close button closes`, !(await page.locator('#drawer').isVisible()));
}

// 先把舞台滚出视口再启动页面，确定性覆盖首次可见回调晚于暂停的情形；不替换观察器或时钟。
{
  const p = await T.newPage();
  await p.setViewportSize({ width: 740, height: 620 });
  await p.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  await p.route(`**/${ID}/main.js`, async route => {
    await p.locator('#ctlPanel').scrollIntoViewIfNeeded();
    await route.continue();
  });
  await T.goto(BOOK, ID, '?lang=en&embed=1', p); await settle(p);
  const box = await p.locator('#stage').boundingBox();
  check('first visibility: offscreen boot keeps the clock paused', box.y + box.height <= 0 && !(await state(p)).playing);
  check('first visibility: native scrolling starts playback', await playsAfter(p,
    () => p.locator('#stage').scrollIntoViewIfNeeded(), () => window.TRIAD_LOOP_DEBUG.state));
  await pause(p);
  await waitPreset(p, 'arc-seed-triad');
  checkPreset(await state(p), 'arc-seed-triad', 'first visibility after pause');
  await p.close();
}

// 书内 740×620 的窄框：舞台在视野中播放时，滚到播放键会让舞台不足半屏，页面的原生观察器先行暂停。
// 确定性重放失败次序：滚动前读到的 playing 若留到滚动之后才按键，会把时钟重新播放，与精确停帧只差 playing 一项。
{
  const card = 'volume-field-condensation', tag = 'transport reach 740x620';
  const p = await T.open(BOOK, ID, '?lang=en&embed=1', { viewport: { width: 740, height: 620 }, locale: 'en-US', reducedMotion: 'reduce' });
  await settle(p); await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
  check(`${tag}: first visibility starts playback`, await until(p, () => window.TRIAD_LOOP_DEBUG.state.playing));
  for (let i = 0; i < 3; i++) { await p.click('[data-tour="next"]'); await settle(p); }
  check(`${tag}: tour reaches the card playing with the stage in view`, (await state(p)).preset === card
    && (await state(p)).playing && await stageShare(p) >= 0.5);
  await pause(p); await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
  checkPreset(await state(p), card, `${tag}/pause from view`);
  await p.click('[data-tour="prev"]'); await settle(p); await p.click('[data-tour="next"]'); await settle(p);
  const stale = await state(p), shareBefore = await stageShare(p);
  await p.locator('#play').scrollIntoViewIfNeeded(); await visibilityJudged(p);
  const judged = await state(p), shareAfter = await stageShare(p);
  check(`${tag}: reaching the transport drops the stage below half view and the page observer pauses before any press`,
    stale.preset === card && stale.playing && shareBefore >= 0.5 && shareAfter < 0.5 && !judged.playing,
    JSON.stringify({ stalePlaying: stale.playing, shareBefore, shareAfter, judgedPlaying: judged.playing }));
  await p.click('#play'); await settle(p);
  const restarted = presetMismatch(await state(p), card);
  check(`${tag}: a press decided before the scroll restarts the clock and only playing leaves the exact frame`,
    same(restarted, { playing: { actual: true, expected: false } }), JSON.stringify(restarted));
  await pause(p); await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
  checkPreset(await state(p), card, `${tag}/pause after the stale press`);
  await p.context().close();
}

// 两种系统配色 × 双语 × 桌面、短屏、手机、书内与窄引用框，每张卡都核对布局与数学。
for (const scheme of ['dark', 'light']) {
  contextScheme = scheme;
  for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
    [1440, 900, false, false], [1081, 500, false, false], [390, 844, false, false],
    [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
  ]) {
    const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? '&preset=arc-seed-triad' : ''}`, {
      viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
    });
    await settle(p);
    const tag = `${scheme}/${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
    check(`${tag}: actual system preference and no palette override`, await p.evaluate(s =>
      matchMedia(`(prefers-color-scheme: ${s})`).matches && document.documentElement.dataset.trPalette === undefined, scheme));
    await checkLinks(p, tag);
    if (!embed && width > 1080) await desktopContract(p, tag);
    // 首次进入视野会异步自动播放；先等它开始，再暂停，随后才能读取精确停帧。
    if (embed) {
      await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
      check(`${tag}: first visibility starts playback`, await until(p, () => window.TRIAD_LOOP_DEBUG.state.playing));
      if (!(await state(p)).playing) throw new Error(`${tag}: initial autoplay did not start`);
      await pause(p);
    }
    for (const [i, card] of Object.keys(CARDS).entries()) {
      if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } await pause(p); }
      else await pick(card, p);
      await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
      await pause(p);
      await waitPreset(p, card);
      checkPreset(await state(p), card, `${tag}/${card}`);
      const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p, '.stage .tag', 0);
      check(`${tag}/${card}: zero layout, HUD or label overlaps and horizontal overflow`, view.layout.length === 0 && view.hud.length === 0
        && overlaps.length === 0 && await overflowX(p) === 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
      if (lang === 'en') check(`${tag}/${card}: zero Chinese leftovers`, (await cjkLeftovers(p)).length === 0);
    }
    if (!embed && width === 390) {
      await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
      const before = await p.evaluate(() => ({ y: scrollY, camera: window.TRIAD_LOOP_DEBUG.state.camera }));
      const box = await p.locator('#stage').boundingBox();
      await p.mouse.move(box.x + box.width / 2, Math.max(10, Math.min(height - 10, box.y + box.height / 2)));
      await p.mouse.wheel(0, 180);
      check(`${tag}: trusted wheel scrolls host`, await until(p, y => scrollY > y, before.y));
      check(`${tag}: trusted wheel keeps camera fixed`, same((await state(p)).camera, before.camera));
    }
    await p.context().close();
  }
}
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag);
  check(`${tag}: declared frame and paused labelled still`, s.t === CARDS[card].still && !s.playing
    && await p.evaluate(() => window.TRV.still && window.TRV.shot && document.documentElement.dataset.shot === '1'),
    JSON.stringify({ t: s.t, expected: CARDS[card].still, playing: s.playing }));
  await p.context().close();
}
for (const context of T.browser.contexts()) await auditPalette(context);
check('palette: both dark and light browser contexts observed', schemesSeen.has('dark') && schemesSeen.has('light'));
check('palette: zero attribute mutations across all contexts', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console or request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
