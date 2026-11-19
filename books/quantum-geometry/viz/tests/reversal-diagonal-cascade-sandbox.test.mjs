// REVERSAL//CASCADE 浏览器回归：共享质量门、双语视口、独立数学与真实控件事件。
// 单独用 node 运行；VIZ_PHASE1=1 缩短共享卡片遍历，VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'reversal-diagonal-cascade-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'gram-overflow-cascade': { lens: 'ladder', I: 2.85, K: 5 },
  'time-from-phase-collision': { lens: 'time', I: 3.85, K: 5 },
  'arrival-diagonal-escape': { lens: 'arrival', I: 2.2, K: 5 },
  'reversal-dual-cut': { lens: 'cut', I: 2.4, K: 5 },
  'concept-obstruction-cascade': { lens: 'cascade', I: 4, K: 6 }
};
const CONCEPTS = ['point', 'line', 'surface', 'volume', 'time'];
const GIDS = [
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/QuantumContext/TwoAnchorGram.two_anchor_gram_det_pos_iff',
  'D5/S3/QuantumContext/ThreeAnchorGram.three_anchor_gram_det_pos_iff',
  'D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape',
  'D5/S3/ConceptDynamics/InformationEscape/StructuralNovelty.lowersEscape_iff_strict_kernel_novelty',
  'D5/S3/ConceptDynamics/DefinitionEscape/RelativeSemanticDiagonal.relative_semantic_diagonal_ne_listed_decode',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_strict_topology_refinement',
  'D5/S3/Quantum/Algebra/OrthogonalProjectionComplement.orthogonal_complement_projection_identities',
  'D5/S3/Quantum/Algebra/DoubleOrthogonalClosure.double_orthogonal_complement_eq_closure'
];
const T = await session(), { page, check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const vectorNear = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => near(x, b[i]));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const matmul = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
const state = (p = page) => p.evaluate(() => window.REVERSAL_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); }

// 用主元消去独立求秩与行列式；不调用页面的 Laplace 展开或调试数学函数。
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
function checkLadder(s, tag) {
  const index = [0.5, 1.5, 2.5, 3.5].filter(x => s.infoInject >= x).length;
  const rank = Math.min(index + 1, 4), angle = (1 + s.infoInject) * Math.PI / 10;
  const sine = Math.sin(angle), cosine = Math.cos(angle);
  const anchors = [[1, 0, 0, 0], ...[1, 2, 3].map(k => {
    const a = [1, 0, 0, 0];
    if (k < rank) { a[0] = cosine; a[k] = sine; }
    return a;
  })];
  const gram = anchors.map(a => anchors.map(b => dot(a, b)));
  const dets = [1, 2, 3, 4].map(n => elimination(gram.slice(0, n).map(row => row.slice(0, n))).det);
  check(`${tag}: concept, rank and unit comparison anchors in R4`, s.activeStageIndex === index && s.activeConceptId === CONCEPTS[index]
    && s.rank === rank && elimination(anchors).rank === rank && near(s.stepAngleDeg, (1 + s.infoInject) * 18)
    && s.anchors.every((a, i) => vectorNear(a, anchors[i]) && near(dot(a, a), 1)), JSON.stringify([s.activeConceptId, s.rank, s.infoInject]));
  check(`${tag}: Gram minors by elimination equal the sine powers`, s.gramMatrix.every((row, i) => vectorNear(row, gram[i]))
    && vectorNear(s.gramDets, dets) && dets.every((d, i) => near(d, i < rank ? sine ** (2 * i) : 0))
    && near(s.threeAnchorFormula, dets[2]), JSON.stringify(s.gramDets));
  const residuals = [1, ...[1, 2, 3].map(k => k < rank ? sine : 0)];
  check(`${tag}: independent residual axes and overflow-to-generator lengths`, vectorNear(s.residuals, residuals)
    && s.escapeNormals.every((n, i) => vectorNear(n, [0, 1, 2, 3].map(j => i < rank && i === j ? 1 : 0)))
    && vectorNear(s.transfers, [...residuals.slice(1), index === 4 ? 1 : 0])
    && near(s.chirality, rank === 4 ? 1 : 0), JSON.stringify(s.transfers));
}
function checkArena(s, tag) {
  const sine = Math.sin((1 + s.infoInject) * Math.PI / 10);
  const verts = [[0, 0, 0], ...[[1, 0, 0], [0, 0, 1], [0, 1, 0]].slice(0, s.rank - 1).map(a => a.map(x => x * sine))];
  const center = [0, 1, 2].map(j => verts.reduce((sum, p) => sum + p[j], 0) / verts.length);
  const twins = s.infoInject >= 3.5;
  const arena = verts.map(p => ({ p, sign: 1 }));
  if (twins) arena.push({ p: center, sign: 1 }, { p: center, sign: -1 });
  const reads = arena.map(({ p, sign }) => [...p, Math.cos(Math.PI * Math.hypot(...p)) ** 2, sign > 0 ? 0 : Math.PI]);
  const staircase = [0, 1, 2, 3, 4, 5].map(n => {
    let pairs = 0;
    for (let a = 0; a < reads.length; a++) for (let b = 0; b < reads.length; b++) {
      if (a !== b && reads[a].slice(0, n).every((x, j) => near(x, reads[b][j]))) pairs++;
    }
    return pairs;
  });
  const before = twins ? 2 : 0, denominator = arena.length * (arena.length - 1);
  check(`${tag}: finite arena and independently enumerated ordered kernels`, s.twinsPresent === twins
    && s.displayVertices.every((p, i) => vectorNear(p, verts[i])) && s.arenaStates.length === arena.length
    && s.arenaStates.every((a, i) => a.sign === arena[i].sign && vectorNear(a.p, arena[i].p))
    && same(s.escapeStaircase, staircase), JSON.stringify(s.escapeStaircase));
  check(`${tag}: adjoining T separates exactly the two phase twins`, s.escapePairsBefore === before && s.escapePairsCount === before
    && s.escapePairsAfter === 0 && s.lowersEscape === twins && s.strictKernel === twins
    && near(s.escapeRateBefore, denominator ? before / denominator : 0) && s.escapeRateAfter === 0,
  JSON.stringify([s.escapePairsBefore, s.escapePairsAfter, s.lowersEscape]));
}
function checkCut(s, tag) {
  const { den, PM, PMperp: Q, PMperpperp: PP } = s.projectionNumerators;
  const identity = [[25, 0], [0, 25]], zero = [[0, 0], [0, 0]];
  const u = [3, 4], v = [-4, 3], outer = a => a.map(x => a.map(y => x * y));
  const scale = a => a.map(row => row.map(x => 25 * x));
  check(`${tag}: exact rational orthogonal projections and double complement`, den === 25 && same(PM, outer(u)) && same(Q, outer(v))
    && same(matmul(PM, Q), zero) && same(matmul(Q, PM), zero) && same(PM.map((r, i) => r.map((x, j) => x + Q[i][j])), identity)
    && same(matmul(PM, PM), scale(PM)) && same(matmul(Q, Q), scale(Q)) && same(PP, PM)
    && s.orthogonalityResidual === 0 && s.completenessResidual === 0 && s.idempotenceResidual === 0 && s.doubleComplementError === 0);
  const k = s.negCoupling, p = 1 / (2 - k);
  // 用自然对数独立计算二元熵，端点按连续延拓取 0 log 0 = 0。
  const xlogx = x => x === 0 ? 0 : x * Math.log(x);
  const bits = 1 + (xlogx(p) + xlogx(1 - p)) / Math.LN2;
  check(`${tag}: effective cut, trace weights, contrast and Shannon distinction`, s.Peff.every((row, i) => row.every((x, j) => near(x, (PM[i][j] + (1 - k) * Q[i][j]) / den)))
    && s.pReachTrace === 1 && near(s.pUnreachWeight, 1 - k) && s.cutContrast === k && near(s.contrastFromTraces, k)
    && near(s.pBalanced, p) && near(s.distinctionBits, bits) && s.distinctionBits >= 0 && s.distinctionBits <= 1,
  JSON.stringify([k, s.cutContrast, s.distinctionBits]));
  if (k === 0 || k === 1) check(`${tag}: exact distinction endpoint ${k} bit`, s.distinctionBits === k);
}
function checkDiagonal(s, tag) {
  const K = s.tableSize, matrix = s.lookupMatrix, diag = s.diagonalPath, classes = s.refinedPartitionClasses;
  check(`${tag}: KxK quadrant catalog and fixed-point-free diagonal`, matrix.length === K && matrix.every(row => row.length === K && row.every(x => Number.isInteger(x) && x >= 0 && x < 4))
    && new Set(matrix.map(row => row.join(','))).size === K && diag.length === K
    && diag.every((x, k) => x === (matrix[k][k] + 2) % 4 && x !== matrix[k][k])
    && matrix.every(row => row.some((x, k) => x !== diag[k])) && s.escapedRows.length === K && s.escapedRows.every(Boolean)
    && s.escapedAllRows === true && s.differsFromEveryRow === true && s.reconvergesToTarget === true);
  const after = new Set(matrix.flat().map(x => `x|${(x + 2) % 4}`)).size;
  check(`${tag}: adjoining the diagonal strictly refines the arrival partition`, classes.records === K * K && classes.before === 1
    && classes.after === after && classes.after === 4 && classes.after > classes.before && classes.catalogComplete && classes.strict,
  JSON.stringify(classes));
}
function checkMath(s, tag) { checkLadder(s, tag); checkArena(s, tag); checkCut(s, tag); checkDiagonal(s, tag); }
function checkPreset(s, card, tag) {
  const p = CARDS[card];
  check(`${tag}: exact preset controls and declared paused frame`, s.preset === card && s.lens === p.lens && near(s.infoInject, p.I)
    && s.tableSize === p.K && s.negCoupling === 1 && s.t === 1 && !s.playing, JSON.stringify([s.preset, s.lens, s.infoInject, s.tableSize, s.t]));
}

const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(f => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  check(`source ${file}: no literal colors`, !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source));
}
check('source: exact five cards in their public order', same([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]), Object.keys(CARDS)));
check('source: solid stage explicitly leaves wheel scrolling to its host', /wheel:\s*false/.test(sources['main.js']));
check('source: exact nine frozen theorem links', same([...sources['index.html'].matchAll(/data-lean-gid="([^"]+)"/g)].map(m => m[1]).sort(), [...GIDS].sort()));
const registry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations;
const entry = registry.find(v => v.id === ID), position = registry.indexOf(entry), berry = registry.findIndex(v => v.id === 'berry-sector-path-sandbox');
check('registry: live chapter 29.10 entry, code separated from bilingual titles', entry.status === 'live' && entry.chapter === 29 && entry.section === '29.10'
  && entry.code === 'REVERSAL//CASCADE' && !entry.title.includes('//') && !entry.title_en.includes('//')
  && same(entry.presets, Object.keys(CARDS)) && entry.presets.every(c => entry.preset_titles[c].zh && entry.preset_titles[c].en));
check('registry: chapter 29 card precedes the chapter 36 horizon', position < registry.findIndex(v => v.id === 'uncompleted-horizon-sandbox')
  && berry >= 0 && position > berry && position === registry.findIndex(v => v.id === 'clifford-monad-tiling-sandbox') + 1);
check('registry: exact nine frozen theorem registrations', same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));

await T.goto(BOOK, ID, '?lang=zh'); await settle(page);
check('runtime: shared scripts only', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('runtime: exactly nine theorem links and nine green evidence boxes', same(await page.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort())
  && await page.locator('.lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen)').count() === 9);

// 真正点击语言切换，再逐卡核对状态；抽屉的按钮关闭与 Esc 关闭各走一次。
for (const lang of ['en', 'zh']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`toggle ${lang}: document and pressed language`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of Object.keys(CARDS)) {
    await pick(card); const s = await state(), tag = `toggle ${lang}/${card}`;
    checkPreset(s, card, tag); checkMath(s, tag);
    if (lang === 'en') check(`${tag}: no visible Chinese`, (await cjkLeftovers(page)).length === 0);
  }
  await page.click('#infoBtn'); await settle(page);
  check(`drawer ${lang}: opens a named modal with the theory`, await page.locator('#drawer').isVisible()
    && await page.locator('#drawer [role="dialog"][aria-modal="true"]').isVisible());
  if (lang === 'en') check('drawer en: no visible Chinese', (await cjkLeftovers(page)).length === 0);
  await page.click('#drawerClose'); await settle(page);
  check(`drawer ${lang}: close button hides it`, !(await page.locator('#drawer').isVisible()));
  await page.click('#infoBtn'); await page.keyboard.press('Escape'); await settle(page);
  check(`drawer ${lang}: Escape hides it`, !(await page.locator('#drawer').isVisible()));
}

// 整个滑块定义域含阈值前、阈值上、阈值后；时间增加读出而非第五个 Gram 锚点。
await pick('gram-overflow-cascade');
for (let step = 0; step <= 80; step++) {
  const I = step / 20; await input('#infoInject', I); const s = await state();
  check(`I_cmp=${I}: range input enters free exploration`, near(s.infoInject, I) && s.preset === null);
  checkLadder(s, `I_cmp=${I}`); checkArena(s, `I_cmp=${I}`);
}
for (const [i, concept] of CONCEPTS.entries()) {
  await page.click(`#stageChips [data-stage="${concept}"]`); await settle(page);
  const s = await state(); check(`dimension chip ${concept}: reaches selected concept`, s.activeStageIndex === i && s.activeConceptId === concept && s.preset === null);
  checkLadder(s, `chip ${concept}`); checkArena(s, `chip ${concept}`);
  await page.locator('#stage').focus(); await page.keyboard.press(String(i + 1)); await settle(page);
  check(`dimension key ${i + 1}: selects ${concept}`, (await state()).activeConceptId === concept);
}
await pick('reversal-dual-cut');
for (let n = 0; n <= 100; n += 5) {
  await input('#negCoupling', n / 100); const s = await state();
  check(`kappa=${n / 100}: slider and handle agree`, s.negCoupling === n / 100 && s.preset === null
    && near(Number(await page.locator('#cutHandle').getAttribute('aria-valuenow')), s.negCoupling));
  checkCut(s, `kappa=${n / 100}`);
}
await pick('arrival-diagonal-escape');
for (let K = 3; K <= 7; K++) {
  await input('#tableSize', K); const s = await state();
  check(`table size ${K}: exact integer and free exploration`, s.tableSize === K && s.preset === null);
  checkDiagonal(s, `table size ${K}`);
}

// 定位手柄时只用几何探针找坐标；真实鼠标经过页面的捕获、拖动与释放监听器。
await pick('reversal-dual-cut'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
for (const k of [0.25, 0.75]) {
  const before = await state(), box = await page.locator('#cutHandle').boundingBox();
  const target = await page.evaluate(k => window.REVERSAL_DEBUG.screen(window.REVERSAL_DEBUG.gaugePoint(k)), k);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
  await page.mouse.move(target[0], target[1], { steps: 8 }); await page.mouse.up(); await settle(page);
  const s = await state();
  check(`handle drag to ${k}: changes coupling without orbiting`, s.negCoupling === k && s.preset === null
    && same(s.cam, before.cam) && !(await page.locator('#cutHandle').evaluate(el => el.classList.contains('dragging'))), JSON.stringify([s.negCoupling, s.cam]));
  checkCut(s, `drag ${k}`);
  await page.mouse.move(target[0] + 15, target[1] + 15); await settle(page);
  check(`handle drag to ${k}: release stops later mouse movement`, (await state()).negCoupling === k);
}
await page.locator('#cutHandle').focus();
for (const [key, k] of [['Home', 0], ['ArrowRight', 0.05], ['ArrowUp', 0.1], ['ArrowLeft', 0.05], ['ArrowDown', 0], ['ArrowLeft', 0], ['End', 1], ['ArrowUp', 1]]) {
  const t = (await state()).t; await page.keyboard.press(key); await settle(page);
  const s = await state(); check(`handle ${key}: coupling=${k}, rail unchanged`, s.negCoupling === k && s.t === t); checkCut(s, `handle ${key}`);
}

// pointercancel 清理捕获；被取消的指针不能继续拖，新指针仍可重新拾取。
async function pointer(type, xy, id) {
  await page.locator('#cutHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true, button: 0,
    buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.xy[0], clientY: a.xy[1]
  })), { type, xy, id }); await settle(page);
}
const gaugeScreen = k => page.evaluate(k => window.REVERSAL_DEBUG.screen(window.REVERSAL_DEBUG.gaugePoint(k)), k);
await pointer('pointerdown', await gaugeScreen(1), 41);
await pointer('pointermove', await gaugeScreen(0.4), 41);
check('pointercancel setup: synthetic pointer actually moves coupling', (await state()).negCoupling === 0.4);
await pointer('pointercancel', await gaugeScreen(0.4), 41);
await pointer('pointermove', await gaugeScreen(0.8), 41);
check('pointercancel: cancelled pointer leaves coupling fixed', (await state()).negCoupling === 0.4);
await pointer('pointerdown', await gaugeScreen(0.4), 42);
await pointer('pointermove', await gaugeScreen(0.6), 42);
await pointer('pointerup', await gaugeScreen(0.6), 42);
check('pointercancel: fresh pointer can drag again', (await state()).negCoupling === 0.6);

const wheel = await page.evaluate(() => {
  const before = window.REVERSAL_DEBUG.state.cam, original = Event.prototype.preventDefault; let calls = 0;
  Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
  try {
    const events = [...document.querySelectorAll('#stage canvas')].map(el => {
      const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
      return { allowed: el.dispatchEvent(ev), cancelled: ev.defaultPrevented };
    });
    return { before, after: window.REVERSAL_DEBUG.state.cam, calls, events };
  } finally { Event.prototype.preventDefault = original; }
});
check('wheel: every stage canvas passes the event without preventDefault or camera zoom', wheel.calls === 0 && wheel.events.length > 0
  && wheel.events.every(e => e.allowed && !e.cancelled) && same(wheel.before, wheel.after), JSON.stringify(wheel));

// 流动相位只改变画面；暂停帧里的所有数学量保持不变。
for (const card of Object.keys(CARDS)) {
  await pick(card); const before = await state();
  for (const t of [0, 0.125, 0.5, 0.875, 1]) {
    await input('#now', t); const s = await state();
    check(`${card}/tau=${t}: rail position and mathematical invariants`, near(s.t, t) && same(s.gramDets, before.gramDets)
      && same(s.diagonalPath, before.diagonalPath) && s.escapePairsBefore === before.escapePairsBefore
      && s.cutContrast === before.cutContrast && s.distinctionBits === before.distinctionBits);
  }
}
await page.click('#rew'); await settle(page);
check('rewind pauses and resets the flow phase', (await state()).t === 0 && !(await state()).playing);
check('play advances the rail, including under slow frames', await playsAfter(page, () => page.click('#play'), () => window.REVERSAL_DEBUG.state));
await page.click('#play'); await settle(page); check('pause holds the flow phase', !(await state()).playing);

// 双语 × 五视口 × 五张卡：桌面、手机与正文引用框的布局、状态和全部数学。
for (const lang of ['zh', 'en']) for (const [width, height, embed] of [[1440, 900, false], [390, 844, false], [820, 520, true], [820, 640, true], [334, 520, true]]) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1&preset=gram-overflow-cascade' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await settle(p);
  for (const [i, card] of Object.keys(CARDS).entries()) {
    if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } }
    else await pick(card, p);
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    const s = await state(p), tag = `${lang}/${width}x${height}/${embed ? 'embed' : 'lab'}/${card}`;
    checkPreset(s, card, tag); checkMath(s, tag);
    const view = await stageView(p, '#stage', embed), overlaps = await labelOverlaps(p);
    check(`${tag}: stage-first layout, readable HUD and unclipped labels`, view.layout.length === 0 && view.hud.length === 0
      && overlaps.length === 0 && await overflowX(p) === 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}: no visible Chinese`, (await cjkLeftovers(p)).length === 0);
  }
  if (!embed && width === 390) {
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    const before = await p.evaluate(() => ({ y: scrollY, cam: window.REVERSAL_DEBUG.state.cam }));
    const box = await p.locator('#stage').boundingBox();
    await p.mouse.move(box.x + box.width / 2, Math.max(10, Math.min(height - 10, box.y + box.height / 2)));
    await p.mouse.wheel(0, 180);
    check(`${lang}/phone: trusted wheel scrolls the host page`, await until(p, y => scrollY > y, before.y));
    check(`${lang}/phone: trusted wheel keeps the camera fixed`, same((await state(p)).cam, before.cam));
  }
  await p.context().close();
}

if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag); checkMath(s, tag);
  check(`${tag}: printed still hides the interactive handle`, !(await p.locator('#cutHandle').isVisible()));
  await p.context().close();
}
check('no page, console or request errors', T.errors.length === 0, T.errors.slice(0, 6).join(' | '));
check('zero browser quality warnings', T.warnings.length === 0, T.warnings.map(w => w.name).join(' | '));
await T.finish();
