// TRUSS//RIGIDITY 浏览器回归：共享质量门、双语视口、独立几何与真实控件事件。
// 单独用 node 运行；VIZ_PHASE1=1 缩短共享遍历，VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'trihedron-rigidity-truss-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'complete-graph-triangulation': { N: 5, mode: 'complete', torque: 0.35, plot: 'counts' },
  'downward-irreducibility-lock': { N: 3, mode: 'complete', torque: 0.30, plot: 'gram' },
  'floppy-c4-vs-rigid-k4': { N: 4, mode: 'missing-diagonals', torque: 0.65, plot: 'loop' },
  'maxwell-laman-polynomial': { N: 4, mode: 'complete', torque: 0.50, plot: 'maxwell' },
  'regge-curvature-glow': { N: 7, mode: 'complete', torque: 0.45, plot: 'regge' }
};
const GIDS = [
  'D5/S3/Quantum/Algebra/GramUnitaryExtension.exists_unitary_mul_eq_of_conjTranspose_mul_eq',
  'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_formula',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.fs_angle_triangle',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/Combinatorics/Graph/PlanarMatching/RotationBoundary.face_cycle_exact',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness'
];
const THEORY = ['zh', 'en'].map(lang => `../../${lang}/ch34-orthogonality-degeneracy-and-observer-position.html#sec-ch34-trihedron-rigidity-and-3d-stability`);
const T = await session(), { page, check } = T;

// 在页面脚本前安装观察器，连共享质量门创建的独立页面也记录根节点调色板写入。
const paletteMutations = [];
async function watchPalette(context) {
  await context.exposeBinding('__rigidityPaletteMutation', ({ page: p }, mutation) => paletteMutations.push({ url: p.url(), ...mutation }));
  await context.addInitScript(() => {
    new MutationObserver(records => {
      for (const r of records) if (r.target === document.documentElement) {
        window.__rigidityPaletteMutation({ old: r.oldValue, value: r.target.getAttribute(r.attributeName) }).catch(() => {});
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
  });
}
await watchPalette(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => { const context = await newContext(options); await watchPalette(context); return context; };
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < tol;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const gram = points => points.map(a => points.map(b => dot(a, b)));
const state = (p = page) => p.evaluate(() => window.RIGIDITY_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  if ((await state(p)).playing) await p.click('#play');
  await settle(p);
}
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); await pause(p); }
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

// 带主元的消元独立求秩和行列式，不使用页面的行列式或剪切公式。
function elimination(matrix) {
  const a = matrix.map(row => [...row]);
  let rank = 0, det = 1;
  for (let col = 0; col < a[0].length && rank < a.length; col++) {
    let pivot = rank;
    for (let i = rank + 1; i < a.length; i++) if (Math.abs(a[i][col]) > Math.abs(a[pivot][col])) pivot = i;
    if (Math.abs(a[pivot][col]) < 1e-10) continue;
    if (pivot !== rank) { [a[pivot], a[rank]] = [a[rank], a[pivot]]; det *= -1; }
    const d = a[rank][col]; det *= d;
    for (let i = rank + 1; i < a.length; i++) {
      const ratio = a[i][col] / d;
      for (let j = col; j < a[0].length; j++) a[i][j] -= ratio * a[rank][j];
    }
    rank++;
  }
  return { rank, det: rank === a.length ? det : 0 };
}
function checkMath(s, tag) {
  const N = s.N, complete = s.topologyMode === 'complete', c = Math.cos(s.apertureDeg * Math.PI / 180);
  const pairs = s.positions.flatMap((_, i) => s.positions.slice(i + 1).map((__, j) => [i, i + j + 1]));
  const G = gram(s.positions), G0 = gram(s.restPositions), G3 = G0.slice(0, 3).map(row => row.slice(0, 3));
  const drift = Math.max(...G.flatMap((row, i) => row.map((x, j) => Math.abs(x - G0[i][j]))));
  check(`${tag}: unit nodes, independent rank 3 and Gram drift`, s.positions.length === N && s.restPositions.length === N
    && G.every((row, i) => near(row[i], 1)) && elimination(G).rank === 3 && near(s.gramMaxDiff, drift));
  check(`${tag}: independent positive trihedron determinant`, near(s.detG3, elimination(G3).det) && s.detG3 > 0
    && near(s.detG3, (1 - c) ** 2 * (1 + 2 * c)) && G3.every((row, i) => row.every((x, j) => near(x, i === j ? 1 : c))));
  if (s.apertureDeg === 60) check(`${tag}: det G3 = 0.5 at 60 degrees`, near(s.detG3, 0.5));
  check(`${tag}: complete graph and Maxwell counts`, s.completeEdges === pairs.length && s.completeEdges === N * (N - 1) / 2
    && s.maxwell3DEdges === 3 * N - 6 && s.activeEdges === (complete ? pairs.length : N)
    && s.maxwellExcess === s.activeEdges - (3 * N - 6));
  if (complete) {
    check(`${tag}: exact Maxwell polynomial and no floppy modes`, s.maxwellExcess === (N - 3) * (N - 4) / 2
      && s.maxwellExcess === [0, 0, 1, 3, 6, 10][N - 3] && s.floppyModes === 0 && s.sphereFloppyModes === 0 && !s.isFloppy);
    check(`${tag}: complete Gram table and shear stay exactly locked`, s.gramMaxDiff === 0 && drift === 0
      && same(s.positions, s.restPositions) && s.shearAngleDeg === 0 && s.shearAmplitude === 0 && s.flexOn === 0);
  }
  const glow = Math.max(0, s.maxwellExcess) * (2 * Math.PI - 5 * Math.acos(1 / 3));
  check(`${tag}: Regge model follows positive redundancy`, near(s.reggeCurvatureGlow, glow)
    && (N > 4 || s.reggeCurvatureGlow === 0));
}
function checkRhombus(s, tag) {
  const ring = s.cycle.map(i => s.positions[i - 1]), G = gram(ring), c = Math.cos(s.apertureDeg * Math.PI / 180);
  const sides = ring.map((p, i) => dot(p, ring[(i + 1) % 4]));
  const [a, b] = [G[0][2], G[1][3]], product = (1 + a) * (1 + b);
  check(`${tag}: all four perimeter cosines stay cos(epsilon) within 1e-12`, s.N === 4 && sides.every(x => near(x, c))
    && near(s.c_side, c) && s.sideCosMaxDev < 1e-12, JSON.stringify(sides));
  check(`${tag}: rank-3 spherical rhombus identity within 1e-12`, elimination(G).rank === 3
    && near(s.c_diag1, a) && near(s.c_diag2, b) && near(product, 4 * c ** 2)
    && near(s.rhombusProduct, product) && near(s.rhombusTarget, 4 * c ** 2), JSON.stringify({ a, b, error: product - 4 * c ** 2 }));
}
function checkPreset(s, card, tag) {
  const p = CARDS[card];
  check(`${tag}: exact preset controls`, s.preset === card && s.N === p.N && s.nodeCount === p.N && s.topologyMode === p.mode
    && s.perturbTorque === p.torque && s.apertureDeg === 60 && s.plot === p.plot && s.push === 0 && !s.playing);
  checkMath(s, tag);
  if (p.mode === 'missing-diagonals') {
    check(`${tag}: C4 has four edges, deficit -2 and a spherical floppy mode`, s.activeEdges === 4 && s.maxwellExcess === -2
      && s.isFloppy === true && s.floppyModes === 2 && s.sphereFloppyModes === 1);
    checkRhombus(s, tag);
  }
}
async function checkLinks(p, tag) {
  check(`${tag}: exactly eight frozen theorem links`, same(await p.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort()));
  check(`${tag}: exact relative zh and en theory links`, same(await p.$$eval('#drawer a[href^="../../"]', els => els.map(e => e.getAttribute('href')).sort()), [...THEORY].sort()));
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: zero literal colors`, !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source));
  check(`source ${file}: zero trPalette overrides`, !/\btrPalette\b|data-tr-palette/.test(source));
}
check('source: all five cards in public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
check('source: wheel false leaves host scrolling enabled', /wheel:\s*false/.test(sources['main.js']));
check('source: exact eight frozen GIDs', same([...sources['index.html'].matchAll(/data-lean-gid="([^"]+)"/g)].map(m => m[1]).sort(), [...GIDS].sort()));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: live 34.10 entry, all five bilingual cards and exact eight GIDs', entry.status === 'live' && entry.chapter === 34 && entry.section === '34.10'
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en)
  && same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));

await T.goto(BOOK, ID, '?lang=en'); await settle(page);
check('runtime: shared scripts only', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
await checkLinks(page, 'runtime');
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`toggle ${lang}: document language and pressed control`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) { await pick(card); checkPreset(await state(), card, `toggle ${lang}/${card}`); }
}

// 用真实概念数按钮与扰动滑块扫过 K3 … K8，包含满力矩与多个扰动相位。
await pick('complete-graph-triangulation');
const glows = [];
for (let N = 3; N <= 8; N++) {
  await page.click(`#nodeCount [data-n="${N}"]`); await settle(page);
  for (const torque of [0, 0.35, 1]) {
    await input('#perturbTorque', torque);
    for (const t of [0, 0.25, 0.5, 1]) {
      await input('#now', t); const s = await state(), tag = `complete N=${N}/torque=${torque}/t=${t}`;
      check(`${tag}: actual controls reach free exploration`, s.N === N && s.perturbTorque === torque && s.t === t && s.preset === null);
      checkMath(s, tag);
    }
  }
  glows.push((await state()).reggeCurvatureGlow);
}
check('Regge glow is zero at N=3,4 and strictly rises through N=5,6,7,8', glows[0] === 0 && glows[1] === 0
  && glows.slice(2).every((g, i) => g > glows[i + 1]), JSON.stringify(glows));

// 滑块改变的是可见节点与对角读数；四条边和秩约束由节点坐标重新计算。
await pick('floppy-c4-vs-rigid-k4'); await input('#now', 1);
let previous = null;
for (const torque of [0, 0.25, 0.5, 0.75, 1]) {
  await input('#perturbTorque', torque); const s = await state(), readout = await page.locator('#ro3').innerText();
  check(`C4 torque=${torque}: slider enters the state`, s.perturbTorque === torque && s.preset === null);
  checkMath(s, `C4 torque=${torque}`); checkRhombus(s, `C4 torque=${torque}`);
  if (previous) check(`C4 torque=${torque}: both diagonal cosines and visible readout change`, Math.abs(s.c_diag1 - previous.s.c_diag1) > 1e-3
    && Math.abs(s.c_diag2 - previous.s.c_diag2) > 1e-3 && !same(s.positions, previous.s.positions) && readout !== previous.readout);
  previous = { s, readout };
}
await input('#perturbTorque', 0); const unpushed = await picture();
await input('#perturbTorque', 1);
check('C4 torque changes the rendered stage', await picture() !== unpushed);
for (const epsilon of [25, 45, 60, 80]) {
  await input('#apertureDeg', epsilon);
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    await input('#now', t); const s = await state();
    check(`C4 epsilon=${epsilon}/t=${t}: controls applied`, s.apertureDeg === epsilon && s.t === t);
    checkRhombus(s, `C4 epsilon=${epsilon}/t=${t}`);
  }
}

// 几何探针只定位拖拽坐标；鼠标走页面真实的捕获、移动与释放监听器。
await pick('floppy-c4-vs-rigid-k4'); await input('#perturbTorque', 0); await input('#now', 1);
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
async function handleTarget(d) {
  return page.evaluate(drive => {
    const p = window.RIGIDITY_DEBUG.ringAt(drive)[2].map(x => x * 1.006), q = window.TRV.solids[0].p(p);
    const r = document.querySelector('#stage').getBoundingClientRect();
    return [r.left + q[0], r.top + q[1]];
  }, d);
}
for (const d of [0.75, -0.75]) {
  const before = await state(), box = await page.locator('#shearHandle').boundingBox(), target = await handleTarget(d), image = await picture();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  check(`handle drag ${d}: captures the pointer`, await page.locator('#shearHandle').evaluate(el => el.classList.contains('dragging')));
  await page.mouse.move(target[0], target[1], { steps: 8 }); await page.mouse.up(); await settle(page);
  const s = await state();
  check(`handle drag ${d}: changes both diagonals and stage without orbiting`, near(s.drive, d) && s.preset === null
    && Math.abs(s.c_diag1 - before.c_diag1) > 1e-3 && Math.abs(s.c_diag2 - before.c_diag2) > 1e-3
    && same(s.camera, before.camera) && await picture() !== image);
  checkRhombus(s, `handle drag ${d}`);
  await page.mouse.move(target[0] + 25, target[1] + 20); await settle(page);
  check(`handle drag ${d}: release clears dragging and prevents later movement`, (await state()).push === s.push
    && !(await page.locator('#shearHandle').evaluate(el => el.classList.contains('dragging'))));
}
async function pointer(type, d, id) {
  const xy = await handleTarget(d);
  await page.locator('#shearHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true, button: 0,
    buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.xy[0], clientY: a.xy[1]
  })), { type, xy, id }); await settle(page);
}
for (const [i, end] of ['pointercancel', 'lostpointercapture'].entries()) {
  const id = 41 + 2 * i;
  await pointer('pointerdown', -0.75, id); await pointer('pointermove', 0.25, id);
  check(`${end}: setup actually drags`, near((await state()).drive, 0.25));
  await pointer(end, 0.25, id); const cancelled = await state();
  await pointer('pointermove', -0.5, id);
  check(`${end}: cleans dragging and ignores the old pointer`, same((await state()).positions, cancelled.positions)
    && (await state()).push === cancelled.push && !(await page.locator('#shearHandle').evaluate(el => el.classList.contains('dragging'))));
  await pointer('pointerdown', 0.25, id + 1); await pointer('pointermove', 0.5, id + 1); await pointer('pointerup', 0.5, id + 1);
  check(`${end}: a fresh pointer can drag again`, near((await state()).drive, 0.5));
  checkRhombus(await state(), end);
}

await page.click('#topologyMode [data-mode="complete"]'); await settle(page);
check('welding both diagonals yields K4: E=6, delta E=0 and no floppy mode', (await state()).activeEdges === 6
  && (await state()).maxwellExcess === 0 && !(await state()).isFloppy);
for (const torque of [0, 0.5, 1]) {
  await input('#perturbTorque', torque); const s = await state();
  checkMath(s, `welded K4/torque=${torque}`); checkRhombus(s, `welded K4/torque=${torque}`);
  check(`welded K4/torque=${torque}: shear zero and diagonals (0.5, -1/3) at 60 degrees`, s.apertureDeg === 60
    && s.shearAngleDeg === 0 && s.shearAmplitude === 0 && near(s.c_diag1, 0.5) && near(s.c_diag2, -1 / 3));
}

await pick('downward-irreducibility-lock');
check('English spawn control has its public label', await page.locator('#spawnBtn .en').isVisible()
  && (await page.locator('#spawnBtn .en').textContent()).trim() === '+ Spawn Concept');
for (let N = 4; N <= 8; N++) {
  await page.click('#spawnBtn'); await settle(page); const s = await state();
  check(`spawn reaches N=${N} cleanly`, s.N === N && s.nodeCount === N && s.positions.length === N && s.preset === null && s.fresh
    && await page.locator(`#nodeCount [data-n="${N}"]`).getAttribute('aria-pressed') === 'true');
  checkMath(s, `spawn N=${N}`);
}
check('spawn is hidden at the upper limit N=8', !(await page.locator('#spawnBtn').isVisible()));
await page.locator('#spawnBtn').evaluate(el => el.click()); await settle(page);
check('even a programmatic extra spawn stays at N=8', (await state()).N === 8 && (await state()).positions.length === 8);
await pick('floppy-c4-vs-rigid-k4');
await page.click('#spawnBtn'); await settle(page);
check('spawning from C4 welds the topology and reaches K5', (await state()).N === 5 && (await state()).topologyMode === 'complete');
checkMath(await state(), 'spawn from C4');

const wheel = await page.evaluate(() => {
  const before = window.RIGIDITY_DEBUG.state.camera, original = Event.prototype.preventDefault; let calls = 0;
  Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
  try {
    const events = [...document.querySelectorAll('#stage canvas')].map(el => {
      const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
      return { allowed: el.dispatchEvent(ev), cancelled: ev.defaultPrevented };
    });
    return { before, after: window.RIGIDITY_DEBUG.state.camera, calls, events };
  } finally { Event.prototype.preventDefault = original; }
});
check('wheel: all stage canvases pass the event without preventDefault or zoom', wheel.calls === 0 && wheel.events.length > 0
  && wheel.events.every(e => e.allowed && !e.cancelled) && same(wheel.before, wheel.after), JSON.stringify(wheel));
await page.click('#rew'); await settle(page);
check('rewind resets and pauses the rail', (await state()).t === 0 && !(await state()).playing);
check('play advances even under slow frames', await playsAfter(page, () => page.click('#play'), () => window.RIGIDITY_DEBUG.state));
await pause(); check('pause stops the clock', !(await state()).playing);

// 双语 × 桌面/短屏/手机/书内/窄引用框 × 五张卡；逐卡核对布局、链接与数学。
for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
  [1440, 900, false, false], [1081, 500, false, false], [390, 844, false, false],
  [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
]) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? '&preset=complete-graph-triangulation' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await settle(p);
  const tag = `${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
  await checkLinks(p, tag);
  for (const [i, card] of Object.keys(CARDS).entries()) {
    if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } await pause(p); }
    else await pick(card, p);
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    checkPreset(await state(p), card, `${tag}/${card}`);
    const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p);
    check(`${tag}/${card}: clear stage, HUD and labels with no horizontal overflow`, view.layout.length === 0 && view.hud.length === 0
      && overlaps.length === 0 && await overflowX(p) === 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no visible Chinese`, (await cjkLeftovers(p)).length === 0);
  }
  if (!embed && width === 390) {
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    const before = await p.evaluate(() => ({ y: scrollY, camera: window.RIGIDITY_DEBUG.state.camera }));
    const box = await p.locator('#stage').boundingBox();
    await p.mouse.move(box.x + box.width / 2, Math.max(10, Math.min(height - 10, box.y + box.height / 2)));
    await p.mouse.wheel(0, 180);
    check(`${lang}/phone: trusted wheel scrolls the host page`, await until(p, y => scrollY > y, before.y));
    check(`${lang}/phone: trusted wheel keeps the camera fixed`, same((await state(p)).camera, before.camera));
  }
  await p.context().close();
}
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag);
  check(`${tag}: declared t=1 and no interactive handle`, s.t === 1 && !(await p.locator('#shearHandle').isVisible()));
  await p.context().close();
}
check('zero trPalette mutations across all browser contexts', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console or request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
