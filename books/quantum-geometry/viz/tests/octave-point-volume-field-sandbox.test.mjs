// OCTAVE//FIELD 浏览器回归：共享质量门、独立离散求解、真实交互和双语视口。
// 单独用 node 运行；VIZ_PHASE1=1 缩短共享遍历，VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'octave-point-volume-field-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
// 三个情形的公开卡名分别对应 Pascal 外代数、UV 缀饰与 Fourier–Poisson。
// 页面质量／探针控件名为 massScale／probeScale；不向页面注入别名或改写调试状态。
const CARDS = {
  'pascal-hodge-1331': { z: 3, lens: 'octave-hodge', m: 0.35, p: 0.35, still: 1 },
  'octave-helix-zoom': { z: -1, lens: 'octave-hodge', m: 0.35, p: 0.75, still: 1 },
  'green-yukawa-reciprocity': { z: 0, lens: 'green-yukawa', m: 0.35, p: 0.40, still: 0.25 },
  'dressed-uv-cutoff': { z: -0.65, lens: 'fourier-dressed', m: 0.50, p: 0.90, still: 0.0875 },
  'position-momentum-duality': { z: 0, lens: 'fourier-dressed', m: 0, p: 0.50, still: 0.25 }
};
const GIDS = [
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula',
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/Observer/Conditioning/FiniteRecordPinchingIdempotence.finite_record_pinching_idempotent',
  'D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.golden_helix_fourier_readout_step',
  'D5/S3/ObserverMemory/FourierFibers/GoldenScaleCharacterDeckBlindness.level_fourier_joint_readout_detects_step',
  'D5/S3/Fourier/FinitePoisson.finite_poisson_summation',
  'D5/S3/Fourier/FinitePoisson.sum_annihilator_character',
  'D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone'
];
const THEORY = ['zh', 'en'].map(lang => `../../${lang}/ch34-orthogonality-degeneracy-and-observer-position.html#sec-ch34-point-volume-octave-and-particle-field`);
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < tol;
const number = text => Number(text.replace(/−/g, '-'));
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const maxDiff = (a, b) => Math.max(...a.map((x, i) => Math.abs(x - b[i])));
const T = await session(), { page, check } = T;

// 先于任何页面脚本安装观察器：既查最终属性，也查写入后立即删掉的属性。
const paletteMutations = [], paletteDocuments = [], browserWarnings = [];
const watchedPages = new WeakSet();
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', m => {
    // 无头 Chromium 的驱动提示不属于应用警告；所有 console.error 仍由 T.errors 收集。
    if (['info', 'warning'].includes(m.type()) && driverInfo.test(m.text())) return;
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
async function watchPalette(context) {
  await context.exposeBinding('__octavePaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    new MutationObserver(records => {
      for (const r of records) window.__octavePaletteAudit({ kind: 'mutation', old: r.oldValue,
        value: r.target.getAttribute('data-tr-palette') }).catch(() => {});
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__octavePaletteAudit({ kind: 'document',
      absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
}
await watchPalette(T.context);
const newContext = T.browser.newContext.bind(T.browser);
let requestedColorScheme = 'dark';
T.browser.newContext = async options => {
  const context = await newContext({ colorScheme: requestedColorScheme, ...options });
  await watchPalette(context);
  return context;
};
await stageFirstChecks(T, 'quantum-geometry', 'octave-point-volume-field-sandbox', { solid: true, cards: !PHASE1, settle: 0 });

const state = (p = page) => p.evaluate(() => window.OCTAVE_FIELD_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  // 先交付两帧并短暂收敛，让 kit.autoplay 的初次 IntersectionObserver 回调完成。
  await p.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  await settle(p, 50);
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`); await settle(p); await pause(p);
}
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

// 共轭梯度直接解周期七点差分方程；独立于页面的三次一维逆 DFT。
const N = 9, M = N ** 3, wrap = x => (x % N + N) % N;
const idx = (i, j, k) => (wrap(i) * N + wrap(j)) * N + wrap(k);
const sites = Array.from({ length: M }, (_, q) => [Math.floor(q / N ** 2), Math.floor(q / N) % N, q % N]);
const neighbours = sites.map(([i, j, k]) => [idx(i + 1, j, k), idx(i - 1, j, k), idx(i, j + 1, k), idx(i, j - 1, k), idx(i, j, k + 1), idx(i, j, k - 1)]);
function stencil(x, m2) { return Float64Array.from(x, (v, q) => (6 + m2) * v - neighbours[q].reduce((s, j) => s + x[j], 0)); }
const cgCache = new Map();
function cgGreen(x0, m2) {
  const key = `${x0}|${m2}`;
  if (cgCache.has(key)) return cgCache.get(key);
  const b = new Float64Array(M); b[idx(...x0)] = 1;
  const x = new Float64Array(M), r = b.slice(), p = r.slice();
  let rr = dot(r, r);
  for (let it = 0; it < 4000 && rr > 1e-30; it++) {
    const Ap = stencil(p, m2), alpha = rr / dot(p, Ap);
    for (let q = 0; q < M; q++) { x[q] += alpha * p[q]; r[q] -= alpha * Ap[q]; }
    const next = dot(r, r);
    for (let q = 0; q < M; q++) p[q] = r[q] + next / rr * p[q];
    rr = next;
  }
  const residual = maxDiff(stencil(x, m2), b);
  if (!(residual < 1e-13)) throw new Error(`Independent CG residual ${residual}`);
  cgCache.set(key, x);
  return x;
}
async function checkGreen(s, tag, p = page) {
  const G = await p.evaluate(() => {
    const d = window.OCTAVE_FIELD_DEBUG, s = d.state;
    return d.field(s.corePos, s.massScale, 0).G;
  });
  const m2 = s.massScale ** 2 + 1 / 81, reference = cgGreen(s.corePos, m2);
  const b = sites.map((_, q) => q === idx(...s.corePos) ? 1 : 0), residual = maxDiff(stencil(G, m2), b);
  check(`${tag}: all 729 Helmholtz–Yukawa equations and independent CG`, G.length === M
    && near(s.massEffSquared, m2) && residual < 1e-13 && s.greenOperatorResidualMax < 1e-13
    && maxDiff(G, reference) < 1e-13, JSON.stringify({ residual, difference: maxDiff(G, reference) }));
  check(`${tag}: positive Green field, source normalization and core ratio`, G.every(v => v > 0)
    && near(m2 * G.reduce((a, v) => a + v, 0), 1, 1e-13)
    && near(s.yukawaCoreRatio, reference[idx(s.corePos[0] + 1, s.corePos[1], s.corePos[2])] / reference[idx(...s.corePos)], 1e-13));
  const reverse = cgGreen(s.probeSite, m2);
  check(`${tag}: reciprocity from two independent point sources`, s.reciprocityErr < 1e-13
    && near(s.greenProbe, reference[idx(...s.probeSite)], 1e-13)
    && near(reference[idx(...s.probeSite)], reverse[idx(...s.corePos)], 1e-13));
  // 离散 Gauss：跨壳有向边通量 = 1 − m_eff² Σ壳内 G，包含周期边。
  for (const R of [1, 2, 3]) {
    const inside = sites.map(v => v.reduce((sum, x, a) => sum + Math.min(wrap(x - s.corePos[a]), wrap(s.corePos[a] - x)) ** 2, 0) <= R ** 2);
    let flux = 0, charge = 0;
    inside.forEach((yes, q) => {
      if (!yes) return;
      charge += G[q];
      for (const j of neighbours[q]) if (!inside[j]) flux += G[q] - G[j];
    });
    check(`${tag}: discrete shell R=${R} obeys Gauss flux balance`, near(flux, 1 - m2 * charge, 1e-13) && flux > 0 && flux < 1,
      JSON.stringify({ flux, balance: 1 - m2 * charge }));
  }
  return G;
}

// 用四元数构造保向旋转，以带主元消元求 det；不用页面的 Euler 旋转与 Gram 展开式。
function determinant(A) {
  const a = A.map(row => [...row]); let d = 1;
  for (let j = 0; j < a.length; j++) {
    let k = j;
    for (let i = j + 1; i < a.length; i++) if (Math.abs(a[i][j]) > Math.abs(a[k][j])) k = i;
    if (Math.abs(a[k][j]) < 1e-15) return 0;
    if (k !== j) { [a[k], a[j]] = [a[j], a[k]]; d *= -1; }
    d *= a[j][j];
    for (let i = j + 1; i < a.length; i++) {
      const t = a[i][j] / a[j][j];
      for (let col = j + 1; col < a.length; col++) a[i][col] -= t * a[j][col];
    }
  }
  return d;
}
const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
function independentExterior(t) {
  const axis = [1, 2, 3].map(x => x / Math.sqrt(14)), w = Math.cos(Math.PI * t);
  const [x, y, z] = axis.map(x => x * Math.sin(Math.PI * t));
  const R = [[1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]];
  const gram = R.map(a => R.map(b => dot(a, b)));
  let projectorErr = 0;
  for (const u of R) {
    const P = u.map(a => u.map(b => a * b)), Q = P.map((row, i) => row.map((v, j) => +(i === j) - v));
    for (const [A, B] of [[mul(P, P), P], [mul(Q, Q), Q], [mul(P, Q), P.map(row => row.map(() => 0))]]) {
      projectorErr = Math.max(projectorErr, maxDiff(A.flat(), B.flat()));
    }
  }
  // 用外代数的子集基逐项投影，与页面的复矩阵乘法实现不同。
  const basis = Array.from({ length: 8 }, (_, mask) => [0, 1, 2].filter(k => mask & 1 << k));
  const dims = [0, 1, 2, 3].map(k => basis.filter(b => b.length === k).length);
  const rho = basis.map((_, i) => basis.map((__, j) => Math.sin(i + 2 * j) / 64));
  const pinch = A => A.map((row, i) => row.map((v, j) => basis[i].length === basis[j].length ? v : 0));
  return { dims, det: determinant(R), volume: determinant(gram), projectorErr, pinchErr: maxDiff(pinch(pinch(rho)).flat(), pinch(rho).flat()) };
}
function checkMath(s, tag) {
  const e = independentExterior(s.t), grade = Math.round(Math.max(-1, Math.min(3, s.octaveZoom)));
  check(`${tag}: Pascal exterior dimensions 1–3–3–1 and Hodge dual grades`, same(s.pascalDims, e.dims)
    && same(e.dims, [1, 3, 3, 1]) && e.dims.every((v, k) => v === e.dims[3 - k])
    && s.grade === (grade === -1 ? 3 : grade) && s.directionalDof === e.dims[s.grade]);
  check(`${tag}: det R = 1 and SO(3) volume invariance below 1e-14`, near(e.det, 1, 1e-14)
    && near(e.volume, s.volumeGramDet, 1e-14) && near(s.volumeGramDet, 1, 1e-14) && s.so3VolumeInvarianceErr < 1e-14);
  check(`${tag}: P²=P, (I−P)²=I−P, PQ=0 and grade pinching idempotence`, e.projectorErr < 1e-14
    && e.pinchErr === 0 && s.idempotentProjectorErr < 1e-14 && s.pinchingErr < 1e-14);
  check(`${tag}: Bloch triple Bargmann product has volume/4 as imaginary part`, near(s.tripleBargmann[0], 0.25)
    && near(s.tripleBargmann[1], 0.25) && s.tripleBargmannErr < 1e-14);
  const chi = [Math.cos(2 * Math.PI * (s.level + s.t)), Math.sin(2 * Math.PI * (s.level + s.t))];
  check(`${tag}: continuous zoom z = 4t − 1 and octave character`, near(s.octaveZoom, 4 * s.t - 1)
    && maxDiff(chi, s.octaveReadout) < 1e-13 && s.octaveHelixSameDeck === true && s.octaveHelixLevelShift === 1);
  check(`${tag}: packing floor, finite self-energy and Poisson error`, s.delonePackingRadius === 0.5
    && near(s.dressingRadius, Math.max(0.5, 2.5 * (1 - s.probeScale)))
    && Number.isFinite(s.dressedSelfEnergy) && s.dressedSelfEnergy > 0 && s.poissonPointFieldMaxErr < 1e-13);
}
function checkPreset(s, card, tag, still = false) {
  const p = CARDS[card];
  check(`${tag}: preset controls, source reset and declared still`, s.preset === card && s.dualityLens === p.lens
    && near(s.massScale, p.m) && near(s.probeScale, p.p) && same(s.corePos, [4, 4, 4]) && s.level === 0 && !s.playing
    && (still ? near(s.t, p.still) : card === 'octave-helix-zoom' || near(s.octaveZoom, p.z)),
  JSON.stringify({ preset: s.preset, z: s.octaveZoom, t: s.t, lens: s.dualityLens, m: s.massScale, p: s.probeScale, playing: s.playing, level: s.level, core: s.corePos }));
  checkMath(s, tag);
}
async function checkLinks(p, tag) {
  check(`${tag}: exactly ten frozen links, all inside sidebar evidence`, same(await p.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort())
    && await p.$$eval('[data-lean-gid]', els => els.every(e => e.closest('.col.side #evidence .lean')
      && e.closest('.lean').querySelector('.ok')?.textContent.trim() === 'LEAN ✓')));
  check(`${tag}: ARGUED, MODEL, NUM and theory button belong to evidence`, await p.evaluate(() =>
    ['.lean.argued', '.lean.model', '.lean.num', '#infoBtn'].every(sel => document.querySelectorAll(sel).length === 1
      && document.querySelector(sel).closest('.col.side #evidence'))));
  check(`${tag}: exact relative chapter links`, same(await p.$$eval('#drawer a[href^="../../"]', els => els.map(e => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
// 名称采用 Unicode 转义，以便测试文件本身也符合出版物的零标识约定。
const provenance = /\b(?:\u006fpenai|\u0061nthropic|\u0063laude|\u0063odex|\u0063hatgpt|\u0067pt(?:[-\s]?\d[\w.-]*)?|\u0067emini|\u006c(?:lama|lm)|\u0064eepseek|\u006distral|\u0063opilot|\u0067rok|\u0061i[- ]generated)\b/i;
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: zero literal colors`, !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source));
  check(`source ${file}: no palette override, warning role or production identifiers`, !/\btrPalette\b|data-tr-palette|\bP\.warn\b|--warn\b/.test(source) && !provenance.test(source));
}
check('source: shared grid columns and wheel:false', !/grid-template-columns\s*:/i.test(sources['style.css']) && /wheel:\s*false/.test(sources['main.js']));
check('source: all five public cards in order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: live §34.13, five bilingual cards and ten exact GIDs', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.13'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));

await T.goto(BOOK, ID, '?lang=en'); await settle(page);
check('runtime: shared scripts and styles', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
  && same(await page.$$eval('link[rel="stylesheet"]', els => els.map(e => e.getAttribute('href')).filter(h => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
const referenceHtml = fs.readFileSync(path.join(DIR, '..', 'triadic-nameless-sandbox', 'index.html'), 'utf8');
check('layout: exact shared three-column lab skeleton', await page.evaluate(html => {
  const shape = root => [...root.querySelector('.app.lab').children].map(e => [e.tagName, [...e.classList].sort().join(' ')]);
  return JSON.stringify(shape(document)) === JSON.stringify(shape(new DOMParser().parseFromString(html, 'text/html')))
    && getComputedStyle(document.querySelector('.app.lab')).gridTemplateColumns.split(' ').length === 3;
}, referenceHtml));
await checkLinks(page, 'desktop');
check('layout: strip plot stays below stage and sidebar panels are visible', await page.evaluate(() => {
  const b = sel => document.querySelector(sel).getBoundingClientRect(), plot = document.querySelector('#plot');
  return plot.closest('.strip') && !plot.closest('#stage') && b('#plot').height >= 54 && b('.strip').top >= b('#stage').bottom
    && b('.deck').right <= b('.center').left && b('.center').right <= b('.side').left
    && ['#readouts', '#evidence'].every(sel => b(sel).width > 0 && b(sel).height > 0 && document.querySelector(sel).closest('.col.side'))
    && document.querySelectorAll('#stage > .hud-tr.chips#dualityLens button').length === 3;
}));
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`toggle ${lang}: language and pressed control`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state();
    checkPreset(s, card, `${lang}/${card}`); await checkGreen(s, `${lang}/${card}`);
    check(`${lang}/${card}: active card and still declaration`, await page.locator(`[data-preset="${card}"]`).getAttribute('aria-pressed') === 'true'
      && near(Number(await page.locator(`[data-preset="${card}"]`).getAttribute('data-still')), CARDS[card].still));
  }
}

// 所有透镜与连续 z 扫描：读数、滑块与时间轴必须同一次输入同步。
for (const lens of ['octave-hodge', 'green-yukawa', 'fourier-dressed']) {
  await page.click(`#dualityLens [data-lens="${lens}"]`); await settle(page); await pause();
  check(`lens ${lens}: visible pressed control changes state`, (await state()).dualityLens === lens
    && (await state()).preset === null && await page.locator(`[data-lens="${lens}"]`).getAttribute('aria-pressed') === 'true');
  for (const z of [-1, -0.65, 0, 0.37, 1, 1.49, 2, 2.75, 3]) {
    await input('#octaveZoom', z); const s = await state();
    check(`lens ${lens}/z=${z}: slider, rail and visible readout`, near(s.octaveZoom, z) && s.preset === null
      && near(Number(await page.inputValue('#now')), (z + 1) / 4) && near(number(await page.locator('#pillZ').innerText()), z));
    checkMath(s, `${lens}/z=${z}`);
  }
}
for (const z of [-1, 0, 1, 2, 3]) {
  await page.click(`#zoomJumps [data-zoom="${z}"]`); await settle(page);
  check(`zoom jump ${z}: selects the grade and its rail coordinate`, (await state()).octaveZoom === z
    && near((await state()).t, (z + 1) / 4) && await page.locator(`[data-zoom="${z}"]`).getAttribute('aria-pressed') === 'true');
}
for (const lens of ['octave-hodge', 'green-yukawa', 'fourier-dressed']) {
  await page.click(`#dualityLens [data-lens="${lens}"]`); await settle(page); await pause();
  await page.locator('#plot').scrollIntoViewIfNeeded(); await settle(page);
  const before = await state(), b = await page.locator('#plot').boundingBox();
  await page.mouse.move(b.x + b.width * 0.25, b.y + b.height * 0.5); await page.mouse.down();
  await page.mouse.move(b.x + b.width * 0.80, b.y + b.height * 0.5, { steps: 5 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check(`strip ${lens}: trusted drag updates its parameter and releases capture`, after.preset === null
    && (lens === 'octave-hodge' ? after.octaveZoom !== before.octaveZoom : after.probeScale !== before.probeScale)
    && await page.locator('#plot').evaluate(el => !el.hasPointerCapture(1)));
  checkMath(after, `strip ${lens}`);
}
await pick('octave-helix-zoom'); await input('#octaveZoom', -1); const start = await state();
await input('#octaveZoom', 3); const end = await state();
check('octave: t=1 at z=3, equal Fourier readout and distinct joint level', end.t === 1 && end.octaveZoom === 3
  && maxDiff(start.octaveReadout, end.octaveReadout) < 1e-14 && Math.floor(end.level + end.t) === Math.floor(start.level + start.t) + 1);
// 整数模式先在 R/Z 约化：精确整步差为 0；原始浮点 sin(2π) 仅作容差检查。
for (const mode of [-7, -3, -1, 0, 1, 3, 7]) {
  const mod = x => (x % 1 + 1) % 1;
  check(`octave mode ${mode}: exact quotient step invariance`, mod(mode * start.t) === mod(mode * end.t));
}
await input('#now', 0.99); const level = (await state()).level;
await page.click('#play');
check('octave: a real full-turn wrap increments the level', await until(page, before => window.OCTAVE_FIELD_DEBUG.state.level === before + 1, level));
await pause();

await pick('green-yukawa-reciprocity');
let previousRatio = Infinity;
for (const m of [0, 0.1, 0.35, 0.8, 1.4, 2]) {
  await input('#massScale', m); const s = await state();
  check(`mass ${m}: actual slider and output`, s.massScale === m && s.preset === null && near(Number(await page.locator('#oMass').innerText()), m));
  await checkGreen(s, `mass=${m}`);
  check(`mass ${m}: screening lowers the neighbour/core ratio`, s.yukawaCoreRatio < previousRatio);
  previousRatio = s.yukawaCoreRatio;
  // 无界空间连续参考与有限周期模型分别核对，不将二者强行设为相等。
  for (const R of [0.5, 1, 2, 3]) {
    const green = r => Math.exp(-m * r) / (4 * Math.PI * r), h = R * 1e-4;
    const derivative = (green(R - 2 * h) - 8 * green(R - h) + 8 * green(R + h) - green(R + 2 * h)) / (12 * h);
    const flux = -4 * Math.PI * R ** 2 * derivative, exact = (1 + m * R) * Math.exp(-m * R);
    check(`continuum mass=${m}/R=${R}: Coulomb–Yukawa and Gauss flux`, near(flux, exact, 1e-10)
      && (m === 0 ? near(green(R), 1 / (4 * Math.PI * R)) : green(R) < 1 / (4 * Math.PI * R)));
  }
}

// 自能以另一种三角恒等式构造谱权重，独立于页面 selfEnergy。
const eigenvalues = sites.map(v => v.reduce((s, k) => s + 4 * Math.sin(Math.PI * k / N) ** 2, 0));
function energy(m, a) {
  return eigenvalues.reduce((s, lambda) => s + Math.exp(-a * a * lambda) / (lambda + m * m + 1 / 81), 0) / (2 * M);
}
await pick('dressed-uv-cutoff');
// 从黄金窗口枚举相邻点，独立推导 packing = 最短间距/2。
const phi = (1 + Math.sqrt(5)) / 2, goldenPoints = [];
for (let b = -80; b <= 80; b++) {
  const lo = phi - 2 - b * (1 - phi), hi = phi - 1 - b * (1 - phi);
  for (let a = Math.ceil(lo - 1e-12); a <= Math.floor(hi + 1e-12); a++) {
    const x = a + b * phi;
    if (Math.abs(x) < 30) goldenPoints.push({ a, b, x });
  }
}
goldenPoints.sort((a, b) => a.x - b.x);
const minGap = Math.min(...goldenPoints.slice(1).map((p, i) => p.a - goldenPoints[i].a + (p.b - goldenPoints[i].b) * phi));
check('UV: independent golden-window packing radius is exactly 1/2', goldenPoints.length > 20 && minGap / 2 === 0.5
  && (await state()).delonePackingRadius === minGap / 2);
let plateau = null;
for (const p of [0, 0.25, 0.5, 0.75, 0.8, 0.85, 0.9, 0.99, 1]) {
  await input('#probeScale', p); const s = await state(), a = Math.max(0.5, 2.5 * (1 - p));
  check(`UV probe=${p}: radius and independent finite energy`, s.probeScale === p && s.preset === null
    && near(s.dressingRadius, a) && near(s.dressedSelfEnergy, energy(s.massScale, a), 1e-14)
    && near(Number(await page.locator('#oProbe').innerText()), p));
  if (p >= 0.8) {
    if (plateau === null) plateau = s.dressedSelfEnergy;
    check(`UV probe=${p}: packing radius 1/2 fixes the finite plateau`, s.delonePackingRadius === 0.5 && s.dressingRadius === 0.5
      && near(s.dressedSelfEnergy, plateau, 1e-15));
  }
}
// 连续球壳参考 E=∫[a,∞) (1/2)|∇G|²4πr²dr=1/(8πa)；页面是高斯云，系数不同。
for (const a of [0.49, 0.1, 0.01, 0.001]) {
  const sphereEnergy = 1 / (8 * Math.PI * a), gaussianEnergy = 1 / (8 * Math.PI ** 1.5 * a);
  check(`point limit a=${a}: unfloored references diverge while dressing is fixed`, sphereEnergy > 1 / (4 * Math.PI)
    && near(gaussianEnergy * a, 1 / (8 * Math.PI ** 1.5)) && Number.isFinite(plateau)
    && near(energy(0.5, 0.5), plateau, 1e-14));
}

// 一维格林函数也用消元求解；复 DFT 仅用于测试 Poisson，不用页面的逆 DFT 造 f。
function ringGreen(m2) {
  const a = Array.from({ length: 12 }, (_, i) => Array.from({ length: 13 }, (_, j) => j === 12 ? +(i === 0)
    : j === i ? 2 + m2 : (j - i + 12) % 12 === 1 || (i - j + 12) % 12 === 1 ? -1 : 0));
  for (let j = 0; j < 12; j++) {
    const d = a[j][j];
    for (let k = j; k <= 12; k++) a[j][k] /= d;
    for (let i = 0; i < 12; i++) if (i !== j) {
      const factor = a[i][j];
      for (let k = j; k <= 12; k++) a[i][k] -= factor * a[j][k];
    }
  }
  return a.map(row => row[12]);
}
await pick('position-momentum-duality');
for (const m of [0, 0.35, 2]) for (const [p, step] of [[0, 12], [0.2, 6], [0.4, 4], [0.5, 3], [0.7, 2], [1, 1]]) {
  await input('#massScale', m); await input('#probeScale', p); const s = await state();
  const H = Array.from({ length: 12 / step }, (_, i) => i * step);
  const Hp = Array.from({ length: 12 }, (_, i) => i).filter(k => H.every(h => h * k % 12 === 0));
  const f = ringGreen(m ** 2 + 1 / 81);
  const fhat = Array.from({ length: 12 }, (_, k) => f.reduce(([re, im], v, x) => [re + v * Math.cos(2 * Math.PI * k * x / 12), im - v * Math.sin(2 * Math.PI * k * x / 12)], [0, 0]));
  const left = H.reduce((sum, x) => sum + f[x], 0) / H.length;
  const right = Hp.reduce((sum, k) => sum + fhat[k][0], 0) / 12;
  const imag = Hp.reduce((sum, k) => sum + fhat[k][1], 0) / 12;
  check(`Poisson m=${m}/H=${H}: independent normalized complex sums`, near(left, right, 1e-13) && Math.abs(imag) < 1e-13
    && same(s.poissonSubgroup, H) && same(s.poissonAnnihilator, Hp) && H.length * Hp.length === 12
    && near(s.poissonSides[0] / H.length, left, 1e-13) && near(s.poissonSides[1] / H.length, right, 1e-13)
    && s.poissonPointFieldMaxErr < 1e-13);
  for (let x = 0; x < 12; x++) {
    const re = Hp.reduce((sum, k) => sum + Math.cos(2 * Math.PI * k * x / 12), 0);
    const im = Hp.reduce((sum, k) => sum + Math.sin(2 * Math.PI * k * x / 12), 0);
    check(`annihilator m=${m}/step=${step}/x=${x}: exact comb`, near(re, H.includes(x) ? Hp.length : 0, 1e-13) && Math.abs(im) < 1e-13);
  }
}

// 真鼠标拖核心：投影探针只定位起点，后续走实际捕获／移动／释放监听器。
await pick('green-yukawa-reciprocity');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
let before = await state(), image = await picture();
const [hx, hy] = await page.evaluate(() => window.OCTAVE_FIELD_DEBUG.coreScreen());
check('handle: projected core is actually hittable', await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.id === 'coreHandle', [hx, hy]));
await page.mouse.move(hx, hy); await page.mouse.down();
check('handle: pointerdown captures and marks dragging', await page.locator('#coreHandle').evaluate(el => el.classList.contains('dragging')));
await page.mouse.move(hx + 90, hy - 35, { steps: 8 }); await page.mouse.up(); await settle(page);
let dragged = await state();
check('handle: moving the core changes the field and image without orbiting', !same(dragged.corePos, before.corePos) && dragged.preset === null
  && same(dragged.camera, before.camera) && await picture() !== image);
await checkGreen(dragged, 'dragged source');
await page.mouse.move(hx - 50, hy + 50); await settle(page);
check('handle: pointerup cleans capture and ignores later moves', same((await state()).corePos, dragged.corePos)
  && await page.locator('#coreHandle').evaluate(el => !el.classList.contains('dragging') && !el.hasPointerCapture(1)));
async function pointer(type, id, dx = 0) {
  const xy = await page.evaluate(() => window.OCTAVE_FIELD_DEBUG.coreScreen());
  await page.locator('#coreHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true,
    button: 0, buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.xy[0] + a.dx, clientY: a.xy[1]
  })), { type, id, xy, dx }); await settle(page);
}
for (const [i, endType] of ['pointercancel', 'lostpointercapture'].entries()) {
  await pick('green-yukawa-reciprocity'); const id = 40 + i * 2;
  await pointer('pointerdown', id); await pointer('pointermove', id, 65);
  check(`${endType}: setup moves and marks the core`, !same((await state()).corePos, [4, 4, 4])
    && await page.locator('#coreHandle').evaluate(el => el.classList.contains('dragging')));
  await pointer(endType, id); const cancelled = await state();
  await pointer('pointermove', id, -90);
  check(`${endType}: clears drag state and ignores old pointer`, same((await state()).corePos, cancelled.corePos)
    && await page.locator('#coreHandle').evaluate(el => !el.classList.contains('dragging')));
  await pointer('pointerdown', id + 1); await pointer('pointermove', id + 1, -65); await pointer('pointerup', id + 1);
  check(`${endType}: a fresh pointer can drag again`, !same((await state()).corePos, cancelled.corePos));
}
await pick('green-yukawa-reciprocity'); await page.focus('#coreHandle');
for (const [key, delta] of [['ArrowRight', [1, 0, 0]], ['ArrowLeft', [-1, 0, 0]], ['ArrowUp', [0, 1, 0]], ['ArrowDown', [0, -1, 0]], ['PageUp', [0, 0, 1]], ['PageDown', [0, 0, -1]]]) {
  const s = await state(); await page.keyboard.press(key); await settle(page);
  check(`handle keyboard ${key}: exactly one lattice site`, same((await state()).corePos, s.corePos.map((v, i) => v + delta[i])));
}
await checkGreen(await state(), 'keyboard source');
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
before = await state(); image = await picture();
const box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + box.width * 0.15, box.y + box.height * 0.65); await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.15 + 75, box.y + box.height * 0.65 - 30, { steps: 8 });
await page.mouse.up(); await settle(page);
check('canvas orbit: changes the camera and picture, preserving core and mathematics', !same((await state()).camera, before.camera)
  && same((await state()).corePos, before.corePos) && await picture() !== image);
checkMath(await state(), 'after orbit');
const wheel = await page.evaluate(() => {
  const before = window.OCTAVE_FIELD_DEBUG.state.camera, original = Event.prototype.preventDefault; let calls = 0;
  Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
  try {
    const events = [...document.querySelectorAll('#stage canvas')].map(el => {
      const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
      return { allowed: el.dispatchEvent(ev), cancelled: ev.defaultPrevented };
    });
    return { before, after: window.OCTAVE_FIELD_DEBUG.state.camera, calls, events };
  } finally { Event.prototype.preventDefault = original; }
});
check('wheel:false passes every canvas event without preventDefault or zoom', wheel.calls === 0 && wheel.events.length > 0
  && wheel.events.every(e => e.allowed && !e.cancelled) && same(wheel.before, wheel.after), JSON.stringify(wheel));
await page.click('#rew'); await settle(page);
check('rewind resets to z=−1 and pauses', (await state()).t === 0 && (await state()).octaveZoom === -1 && !(await state()).playing);
check('play advances under slow frames', await playsAfter(page, () => page.click('#play'), () => window.OCTAVE_FIELD_DEBUG.state));
await pause(); const paused = (await state()).t; await settle(page);
check('pause holds the rail', !(await state()).playing && (await state()).t === paused);
for (const speed of [0.5, 2, 1]) {
  await page.click(`#speedChips [data-speed="${speed}"]`); await settle(page);
  check(`speed ${speed}: real control becomes the sole selected speed`, await page.$$eval('#speedChips [aria-pressed="true"]', (els, speed) =>
    els.length === 1 && Number(els[0].dataset.speed) === speed, speed));
}
await page.locator('#stage').scrollIntoViewIfNeeded(); await page.focus('#stage');
const oldLens = (await state()).dualityLens; await page.keyboard.press('l'); await settle(page);
check('keyboard L cycles the duality lens', (await state()).dualityLens !== oldLens && (await state()).preset === null);
await page.click('#infoBtn'); await settle(page);
check('theory drawer opens as a dialog', await page.locator('#drawer [role="dialog"]').isVisible());
await page.keyboard.press('Escape'); await settle(page);
check('Escape closes the theory drawer', await page.locator('#drawer').evaluate(el => el.hidden));

// 双语 × 深浅系统主题 × 桌面／短屏／手机／书内／窄引用卡；逐卡检查布局与数学。
for (const colorScheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
  [1440, 900, false, false], [1081, 500, false, false], [390, 844, false, false],
  [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
]) {
  requestedColorScheme = colorScheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? '&preset=pascal-hodge-1331' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await p.emulateMedia({ colorScheme }); await settle(p);
  const tag = `${colorScheme}/${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
  check(`${tag}: system color scheme without palette override`, await p.evaluate(scheme =>
    matchMedia(`(prefers-color-scheme: ${scheme})`).matches && document.documentElement.dataset.trPalette === undefined, colorScheme));
  await checkLinks(p, tag);
  // 未指定 preset 的完整书内实验室默认从螺旋卡开场；先通过真实导览返回首卡。
  if (embed && !figure) { await p.click('[data-tour="prev"]'); await settle(p); await pause(p); }
  for (const [i, card] of Object.keys(CARDS).entries()) {
    if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } await pause(p); }
    else await pick(card, p);
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    checkPreset(await state(p), card, `${tag}/${card}`);
    const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p);
    check(`${tag}/${card}: zero overlaps, HUD collisions and overflow`, view.layout.length === 0 && view.hud.length === 0
      && overlaps.length === 0 && await overflowX(p) === 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: zero cjkLeftovers`, (await cjkLeftovers(p)).length === 0);
  }
  if (!embed && width === 390) {
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    const before = await p.evaluate(() => ({ y: scrollY, camera: window.OCTAVE_FIELD_DEBUG.state.camera }));
    const b = await p.locator('#stage').boundingBox();
    await p.mouse.move(b.x + b.width / 2, Math.max(10, Math.min(height - 10, b.y + b.height / 2)));
    await p.mouse.wheel(0, 180);
    check(`${tag}: trusted wheel scrolls the host page`, await until(p, y => scrollY > y, before.y));
    check(`${tag}: trusted wheel preserves camera`, same((await state(p)).camera, before.camera));
  }
  check(`${tag}: palette remains absent after all interactions`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag, true); await checkGreen(s, tag, p);
  check(`${tag}: labelled screenshot mode pauses at the declared frame`, !s.playing && near(s.t, CARDS[card].still)
    && await p.evaluate(() => TRV.shot && TRV.still && document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
check('palette: every observed document has dataset.trPalette === undefined', paletteDocuments.length > 0 && paletteDocuments.every(r => r.absent), JSON.stringify(paletteDocuments.filter(r => !r.absent)));
check('palette: both dark and light preferences were observed at document startup', paletteDocuments.some(r => r.dark) && paletteDocuments.some(r => !r.dark));
check('palette: zero mutations across all browser contexts', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console and request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser console warnings', browserWarnings.length === 0, `${browserWarnings.length} warnings: ${browserWarnings.slice(0, 3).join(' | ')}`);
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
