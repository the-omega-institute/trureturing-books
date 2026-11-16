// GATE//TOWER 浏览器回归：共享质量门、三栏契约、独立数学、真实交互与双语视口。
// 单独用 node 运行；VIZ_PHASE1=1 缩短共享遍历，VIZ_SLOW_FRAMES=1000 检验慢帧。
import { createHash } from 'node:crypto';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'quantum-gate-cosmic-tower-sandbox';
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const CARDS = {
  'gate-commutator-trihedron': { tier: 1, lens: false, scene: 'focus', pair: false, plot: 'comm', climb: false, still: 2 },
  'entangling-segre-escape': { tier: 1, lens: false, scene: 'focus', pair: true, plot: 'segre', climb: false, still: 2 },
  'octave-1331-grammar': { tier: 1, lens: true, scene: 'focus', pair: false, plot: 'octave', climb: true, still: 3.5 },
  'six-tier-cosmic-tower': { tier: 4, lens: false, scene: 'tower', pair: false, plot: 'octave', climb: true, still: 2 },
  'mobius-ouroboros-closure': { tier: 5, lens: false, scene: 'focus', pair: false, plot: 'spinor', climb: false, still: 4 }
};
const IDS = Object.keys(CARDS), DEG = Math.PI / 180;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < tol;
const diff = (a, b) => a.length === b.length ? Math.max(0, ...a.map((v, i) => Math.abs(v - b[i]))) : Infinity;
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const clamp = x => Math.max(-1, Math.min(1, x));
const T = await session(), { page, check } = T;

// 页面脚本运行前安装观察器；临时写入再删除的调色板属性同样必须失败。
const paletteMutations = [], paletteDocuments = [], browserWarnings = [];
const watchedPages = new WeakSet();
const driverInfo = /KHR_parallel_shader_compile|GPU stall due to ReadPixels|SwiftShader|GL Driver Message|WEBGL_debug_renderer_info/;
const harmlessDriver = (type, text) => ['info', 'warning'].includes(type) && driverInfo.test(text);
function watchPage(p) {
  if (watchedPages.has(p)) return;
  watchedPages.add(p);
  p.on('console', m => {
    if (harmlessDriver(m.type(), m.text())) return;
    // console.error 不经过过滤，仍由共享 session 收集到 T.errors。
    if (m.type() === 'warning') browserWarnings.push(`${p.url()}: ${m.text()}`);
  });
}
async function watchContext(context) {
  await context.exposeBinding('__gateTowerPaletteAudit', ({ page: p }, record) => {
    (record.kind === 'mutation' ? paletteMutations : paletteDocuments).push({ url: p.url(), ...record });
  });
  await context.addInitScript(() => {
    window.__gateTowerPaletteMutations = [];
    new MutationObserver(records => {
      for (const r of records) {
        const record = { kind: 'mutation', old: r.oldValue, value: r.target.getAttribute(r.attributeName) };
        window.__gateTowerPaletteMutations.push(record);
        window.__gateTowerPaletteAudit(record).catch(() => {});
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    document.addEventListener('DOMContentLoaded', () => window.__gateTowerPaletteAudit({ kind: 'document',
      absent: document.documentElement.dataset.trPalette === undefined,
      dark: matchMedia('(prefers-color-scheme: dark)').matches }).catch(() => {}), { once: true });
  });
  context.on('page', watchPage);
  context.pages().forEach(watchPage);
  // 关闭前再读本地记录，避免跨上下文异步回传遗漏最后一次写入。
  const close = context.close.bind(context);
  context.close = async (...args) => { await auditContext(context); return close(...args); };
}
let audited = 0, requestedScheme = 'dark';
async function auditContext(context) {
  const records = [];
  for (const p of context.pages()) for (const f of p.frames()) records.push(await f.evaluate(() => ({
    absent: document.documentElement.dataset.trPalette === undefined, mutations: window.__gateTowerPaletteMutations || []
  })));
  check(`palette context ${++audited}: no override or transient mutations`, records.length > 0
    && records.every(r => r.absent && r.mutations.length === 0), JSON.stringify(records));
}
await watchContext(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => {
  const context = await newContext({ colorScheme: requestedScheme, ...options });
  await watchContext(context);
  return context;
};
check('console filter: driver info/warnings only, every error retained', ['info', 'warning'].every(t => harmlessDriver(t, 'SwiftShader'))
  && !harmlessDriver('error', 'SwiftShader') && !harmlessDriver('warning', 'Application regression'));
// 共享质量门各跑一次深／浅系统主题；内部同时遍历双语、桌面、手机与书内框。
for (const scheme of ['dark', 'light']) {
  requestedScheme = scheme;
  await page.emulateMedia({ colorScheme: scheme });
  await stageFirstChecks(T, 'quantum-geometry', 'quantum-gate-cosmic-tower-sandbox', { solid: true, cards: !PHASE1, settle: 0 });
}

const state = (p = page) => p.evaluate(() => window.GATE_TOWER_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  if ((await state(p)).playing) await p.click('#playBtn');
  await settle(p);
}
async function pick(card, p = page) { await p.click(`#presets [data-preset="${card}"]`); await settle(p); await pause(p); }
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');

// 四元数计算 SU(2) 换位子与每一步 SO(3) 轨道，不调用页面的矩阵／旋转函数。
const qm = (a, b) => [a[0] * b[0] - dot(a.slice(1), b.slice(1)),
  a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
  a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
  a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
const qc = q => [q[0], -q[1], -q[2], -q[3]];
const rotate = (q, v) => qm(qm(q, [0, ...v]), qc(q)).slice(1);
function determinant(matrix) {
  const a = matrix.map(row => [...row]); let result = 1;
  for (let j = 0; j < a.length; j++) {
    let k = j;
    for (let i = j + 1; i < a.length; i++) if (Math.abs(a[i][j]) > Math.abs(a[k][j])) k = i;
    if (Math.abs(a[k][j]) < 1e-15) return 0;
    if (k !== j) { [a[k], a[j]] = [a[j], a[k]]; result *= -1; }
    result *= a[j][j];
    for (let i = j + 1; i < a.length; i++) {
      const factor = a[i][j] / a[j][j];
      for (let col = j + 1; col < a.length; col++) a[i][col] -= factor * a[j][col];
    }
  }
  return result;
}
function independent(degrees) {
  const e = degrees * DEG, c = Math.cos(e / 2), s = Math.sin(e / 2), qx = [c, s, 0, 0], qy = [c, 0, s, 0];
  const q = qm(qm(qm(qc(qx), qc(qy)), qx), qy), n = Math.hypot(...q.slice(1));
  const path = [[0, 0, 1]];
  for (const r of [qy, qx, qc(qy), qc(qx)]) path.push(rotate(r, path.at(-1)));
  const vertices = [[0, 0, 1], rotate(qy, [0, 0, 1]), rotate(qx, [0, 0, 1])];
  const hyp = Math.acos(clamp(Math.cos(e) ** 2));
  const angle = (a, b, c) => Math.acos(clamp((Math.cos(a) - Math.cos(b) * Math.cos(c)) / (Math.sin(b) * Math.sin(c))));
  const excess = degrees === 0 ? 0 : angle(hyp, e, e) + 2 * angle(e, e, hyp) - Math.PI;
  // Schmidt 振幅给出约化密度；相关矩阵 diag(2ab,−2ab,1) 的奇异值给 CHSH。
  const psi = [c, 0, 0, s], p0 = c * c, p1 = s * s;
  const concurrence = 2 * Math.abs(psi[0] * psi[3] - psi[1] * psi[2]);
  const singularSquares = [(2 * c * s) ** 2, (-2 * c * s) ** 2, 1].sort((a, b) => b - a);
  return { q, half: Math.atan2(n, q[0]), axis: n ? q.slice(1).map(v => v / n) : null, path, vertices, excess,
    det: determinant(vertices.map(u => vertices.map(v => dot(u, v)))), psi, concurrence,
    entropy: 1 - p0 * p0 - p1 * p1, chsh: 2 * Math.sqrt(singularSquares[0] + singularSquares[1]),
    reducedBloch: [0, 0, p0 - p1], pinching: -[p0, p1].reduce((sum, p) => sum + (p > 0 ? p * Math.log(p) : 0), 0) };
}
// 外代数子集基独立计数；不动点用二分法，与页面 Newton 迭代不同。
const exteriorDims = [0, 1, 2, 3].map(k => Array.from({ length: 8 }, (_, m) => [0, 1, 2].filter(b => m & (1 << b)).length).filter(n => n === k).length);
let lo = 0, hi = 1;
for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (Math.cos(mid) > mid) lo = mid; else hi = mid; }
const fixedPoint = (lo + hi) / 2;
function checkMath(s, tag) {
  const r = independent(s.gateAngleDeg);
  check(`${tag}: commutator trace and spinor/Bloch angles by quaternions`, near(s.commutatorTraceHalf, r.q[0])
    && near(s.commutatorSpinorHalfAngle, r.half) && near(s.commutatorBlochAngle, 2 * r.half)
    && s.commutatorTraceDiff < 1e-15, JSON.stringify({ trace: s.commutatorTraceHalf, half: s.commutatorSpinorHalfAngle, expected: r.half }));
  check(`${tag}: all four path steps, residual axis and endpoint`, diff(s.commutatorPath.flat(), r.path.flat()) < 1e-12
    && diff(s.commutatorEndByAxis, r.path.at(-1)) < 1e-12 && (!r.axis || diff(s.commutatorAxis, r.axis) < 1e-12));
  check(`${tag}: Girard excess by spherical angle sum and Gram determinant by elimination`, near(s.girardTrihedralExcess, r.excess, 1e-9)
    && near(s.girardExcessFromAngles, r.excess, 1e-9) && near(s.trihedronGramDet, r.det)
    && diff(s.trihedronVertices.flat(), r.vertices.flat()) < 1e-12);
  check(`${tag}: two-qubit amplitudes, concurrence, reduced density and CHSH`, diff(s.twoQubitState.flat(), r.psi.flatMap(v => [v, 0])) < 1e-12
    && near(s.segreConcurrence, r.concurrence) && near(s.singleQubitLinearEntropy, r.entropy)
    && near(s.chshMax, r.chsh) && diff(s.reducedBloch, r.reducedBloch) < 1e-12 && s.bellMarginalAt90 < 1e-15);
  check(`${tag}: six tiers, four grades, subset dimensions and lens endpoint`, Number.isInteger(s.towerTier) && s.towerTier >= 0 && s.towerTier < 6
    && near(s.t, s.beatPhase) && s.gradeBeat === Math.min(3, Math.floor(s.t + 1e-9)) && same(s.exteriorDims, exteriorDims)
    && typeof s.lensUnifiedGateMode === 'boolean' && s.lensMix === Number(s.lensUnifiedGateMode));
  check(`${tag}: cosine fixed point and spinor double cover`, near(s.dottieFixedPoint, fixedPoint, 1e-15)
    && near(s.dottieFixedPoint, Math.cos(s.dottieFixedPoint), 1e-15) && s.dottieResidual < 1e-15
    && same(s.spinorDoubleCoverSigns, [2, 4].map(turn => Math.round(Math.cos(turn * Math.PI / 2))))
    && near(s.spinorPhase, Math.PI * s.t) && near(s.spinorRe, Math.cos(Math.PI * s.t / 2)));
  check(`${tag}: algebra, Poisson and pinching residuals`, s.carResidual < 1e-15 && s.carCrossResidual < 1e-15
    && s.weylResidual < 1e-15 && s.pseudoscalarSquareResidual < 1e-15 && s.lagrangeResidual < 1e-15
    && same(s.poisson.H, [0, 4, 8]) && same(s.poisson.Hperp, [0, 3, 6, 9]) && s.poisson.residual < 1e-12
    && near(s.entropyStep.dS, r.pinching) && near(s.entropyStep.D, r.pinching) && s.entropyStep.diff < 1e-12);
}
function checkPreset(s, card, tag, still = false) {
  const p = CARDS[card];
  check(`${tag}: exact preset state`, s.preset === card && s.towerTier === p.tier && s.gateAngleDeg === 45
    && s.lensUnifiedGateMode === p.lens && s.scene === p.scene && s.pair === p.pair && s.plot === p.plot && s.climb === p.climb
    && !s.playing && (!still || near(s.t, p.still)), JSON.stringify(s));
  checkMath(s, tag);
}
async function layout(p, tag, desktop = false) {
  const r = await p.evaluate(() => {
    const app = document.querySelector('.app.lab'), deck = app.querySelector(':scope > .col.deck'),
      center = app.querySelector(':scope > main.center'), side = app.querySelector(':scope > .col.side');
    const rect = el => el.getBoundingClientRect(), d = rect(deck), c = rect(center), s = rect(side);
    return { columns: getComputedStyle(app).gridTemplateColumns.split(/\s+/).length,
      skeleton: [...app.children].map(e => e.tagName + '.' + [...e.classList].sort().join('.')),
      center: [...center.children].map(e => e.id === 'stage' ? '#stage' : '.' + e.className),
      side: [...side.children].map(e => e.id), ordered: d.right <= c.left && c.right <= s.left,
      plot: !!center.querySelector(':scope > .strip #plot') && !app.querySelector('#stage #plot'),
      plotHeight: rect(document.querySelector('#plot')).height, stripBelow: rect(center.querySelector('.strip')).top >= rect(center.querySelector('#stage')).bottom,
      panels: ['#readouts', '#evidence'].every(sel => !!side.querySelector(sel)),
      info: !!side.querySelector('#evidence #infoBtn') && !app.querySelector('header #infoBtn') };
  });
  check(`${tag}: shared deck | center(stage/tour/strip) | side(readouts/evidence) DOM`,
    same(r.skeleton, ['HEADER.top', 'ASIDE.col.deck', 'MAIN.center', 'ASIDE.col.side', 'FOOTER.rail'])
    && same(r.center, ['#stage', '.tour', '.strip']) && same(r.side, ['readouts', 'evidence']) && r.plot && r.panels && r.info, JSON.stringify(r));
  if (desktop) check(`${tag}: exactly three visible ordered columns and separate strip`, r.columns === 3 && r.ordered && r.stripBelow
    && r.plotHeight >= 54 && await p.locator('#readouts').isVisible() && await p.locator('#evidence').isVisible(), JSON.stringify(r));
}

await T.goto(BOOK, ID, '?lang=en'); await settle(page);
await layout(page, 'desktop', true);
check('runtime: shared scripts and styles', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))),
  ['../assets/shell.js', '../assets/kit.js', 'main.js']) && same(await page.$$eval('link[rel="stylesheet"]', els => els.map(e => e.getAttribute('href')).filter(h => !h.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
check('cards: exactly five public presets in order', same(await page.$$eval('#presets [data-preset]', els => els.map(e => e.dataset.preset)), IDS));
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  check(`language ${lang}: document, runtime and sole pressed button`, await page.evaluate(l => document.documentElement.lang.startsWith(l) && TRV.lang() === l
    && document.querySelectorAll('[data-lang-set][aria-pressed="true"]').length === 1
    && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
  for (const card of IDS) {
    await pick(card); checkPreset(await state(), card, `${lang}/${card}`);
    check(`${lang}/${card}: sole selected preset and declared still`, await page.$$eval('#presets [aria-pressed="true"]', (els, id) => els.length === 1 && els[0].dataset.preset === id, card)
      && await page.locator(`[data-preset="${card}"]`).getAttribute('data-still') === (CARDS[card].still === 4 ? 'end' : String(CARDS[card].still)));
    if (lang === 'en') check(`language en/${card}: no Chinese leftovers`, (await cjkLeftovers(page)).length === 0);
  }
  await page.click('#infoBtn'); await settle(page);
  check(`drawer ${lang}: dialog opens`, await page.locator('#drawer [role="dialog"][aria-modal="true"]').isVisible());
  if (lang === 'en') check('drawer en: no Chinese leftovers', (await cjkLeftovers(page)).length === 0);
  check(`drawer ${lang}: exact relative chapter links`, same(await page.$$eval('#drawer .refs a', els => els.map(e => e.getAttribute('href')).sort()),
    ['en', 'zh'].map(l => `../../${l}/ch34-s15-quantum-gates-and-concept-tower.html#sec-ch34-quantum-gate-and-cosmic-concept-tower`)));
  await page.keyboard.press('Escape'); await settle(page);
  check(`drawer ${lang}: Escape closes`, await page.locator('#drawer').evaluate(el => el.hidden));
  await page.click('#infoBtn'); await page.click('#drawerClose'); await settle(page);
  check(`drawer ${lang}: close button closes`, await page.locator('#drawer').evaluate(el => el.hidden));
}

// 每张卡扫过真实角度输入，包括退化端点；相机与卡的场景不应跟着改变。
for (const card of IDS) {
  await pick(card); const camera = (await state()).camera;
  for (const angle of [0, 1, 3, 15, 30, 45, 60, 75, 89, 90]) {
    await input('#gateAngleDeg', angle); const s = await state(), tag = `sweep ${card}/epsilon=${angle}`;
    check(`${tag}: slider and visible angle readout with camera fixed`, s.gateAngleDeg === angle && s.preset === null
      && same(s.camera, camera) && await page.inputValue('#gateAngleDeg') === String(angle)
      && (await page.locator('#roEps').innerText()).startsWith(`${angle}°`));
    checkMath(s, tag);
    check(`${tag}: visible commutator, Girard and entanglement readouts`, (await page.locator('#roComm').innerText()).includes((s.commutatorSpinorHalfAngle / DEG).toFixed(3))
      && (await page.locator('#roOmega').innerText()).includes((s.girardTrihedralExcess / DEG).toFixed(3))
      && (await page.locator('#roSegre').innerText()).includes(s.segreConcurrence.toFixed(4)));
  }
}
await pick(IDS[0]); await page.focus('#gateAngleDeg'); await page.keyboard.press('ArrowRight'); await settle(page);
check('slider: trusted keyboard input increments epsilon', (await state()).gateAngleDeg === 46 && (await state()).preset === null);
for (const lens of [true, false]) {
  await page.click('#lensToggleBtn'); await settle(page);
  check(`lens ${lens}: selected segment, endpoint and free exploration`, (await state()).lensUnifiedGateMode === lens
    && (await state()).lensMix === Number(lens) && (await state()).preset === null
    && await page.locator('#lensToggleBtn').getAttribute('aria-pressed') === String(lens));
  for (let tier = 0; tier < 6; tier++) {
    await input('#towerTier', tier);
    check(`lens ${lens}/tier ${tier}: slider, pill, readout and sole tier chip`, (await state()).towerTier === tier
      && (await page.locator('#tierPill').innerText()).startsWith(`L${tier}`) && (await page.locator('#roTier').innerText()).startsWith(`L${tier}`)
      && await page.$$eval('#tierChips [aria-pressed="true"]', (els, t) => els.length === 1 && Number(els[0].dataset.tierChip) === t, tier));
    for (let beat = 0; beat < 4; beat++) {
      await input('#gradeBeat', beat); const s = await state(), tag = `lens ${lens}/tier ${tier}/grade ${beat}`;
      check(`${tag}: grade slider synchronizes paused rail and readout`, s.gradeBeat === beat && s.t === beat && !s.playing
        && Number(await page.inputValue('#now')) === beat && (await page.locator('#roTierSub').innerText()).includes(`dim ${exteriorDims[beat]}`));
      checkMath(s, tag);
    }
  }
}
for (let tier = 0; tier < 6; tier++) {
  await page.click(`[data-tier-chip="${tier}"]`); await settle(page);
  check(`tier chip ${tier}: state and slider`, (await state()).towerTier === tier && Number(await page.inputValue('#towerTier')) === tier);
}
await pick(IDS[4]);
for (const t of [0, 1, 2, 3, 4]) {
  await input('#now', t); checkMath(await state(), `Mobius rail ${t}`);
  check(`Mobius rail ${t}: correct grade slider`, Number(await page.inputValue('#gradeBeat')) === Math.min(3, t));
}
const normals = [];
for (const t of [0, 2, 4]) { await input('#now', t); normals.push((await state()).carriedNormal); }
check('Mobius transport: one turn reverses and two turns restore the carried normal', diff(normals[0], normals[1].map(x => -x)) < 1e-12 && diff(normals[0], normals[2]) < 1e-12);

// 真鼠标抓取琥珀手柄；调试探针只定位起点，不注入状态。
await pick(IDS[0]); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
let before = await state(), image = await picture();
const hb = await page.evaluate(() => window.GATE_TOWER_DEBUG.handleBox());
check('handle: visible and hittable', !!hb && await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.id === 'gateArcHandle', hb));
if (hb) {
  await page.mouse.move(hb.x, hb.y); await page.mouse.down();
  check('handle: real pointer captured and dragging', await page.locator('#gateArcHandle').evaluate(el => el.classList.contains('dragging') && el.hasPointerCapture(1)));
  await page.mouse.move(hb.x + 48, hb.y + 32, { steps: 8 }); await page.mouse.up(); await settle(page);
  const dragged = await state();
  check('handle: changes epsilon and rendering without rotating the camera', dragged.gateAngleDeg !== before.gateAngleDeg
    && dragged.preset === null && !dragged.playing && same(dragged.camera, before.camera) && await picture() !== image);
  checkMath(dragged, 'dragged gate');
  await page.mouse.move(hb.x - 40, hb.y + 20); await settle(page);
  check('handle: release clears capture and ignores later motion', (await state()).gateAngleDeg === dragged.gateAngleDeg
    && await page.locator('#gateArcHandle').evaluate(el => !el.classList.contains('dragging') && !el.hasPointerCapture(1)));
}
async function pointer(type, id, dx = 0) {
  const xy = await page.evaluate(() => window.GATE_TOWER_DEBUG.handleBox());
  await page.locator('#gateArcHandle').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true, button: 0,
    buttons: /down|move/.test(a.type) ? 1 : 0, clientX: a.xy.x + a.dx, clientY: a.xy.y + a.dx / 2
  })), { type, id, dx, xy }); await settle(page);
}
for (const [i, end] of ['pointercancel', 'lostpointercapture'].entries()) {
  await pick(IDS[0]); const id = 41 + i * 2, initial = await state();
  await pointer('pointerdown', id); await pointer('pointermove', id, 48);
  check(`${end}: setup changes epsilon`, (await state()).gateAngleDeg !== initial.gateAngleDeg);
  const moved = await state(); await pointer('pointermove', id + 20, -48);
  check(`${end}: ignores an unrelated pointer`, (await state()).gateAngleDeg === moved.gateAngleDeg);
  await pointer(end, id); const cancelled = await state(); await pointer('pointermove', id, -48);
  check(`${end}: clears drag and ignores stale moves`, (await state()).gateAngleDeg === cancelled.gateAngleDeg
    && await page.locator('#gateArcHandle').evaluate(el => !el.classList.contains('dragging')));
  await pointer('pointerdown', id + 1); await pointer('pointermove', id + 1, -48); await pointer('pointerup', id + 1);
  check(`${end}: fresh pointer drags with camera fixed`, (await state()).gateAngleDeg !== cancelled.gateAngleDeg && same((await state()).camera, initial.camera));
}
await pick(IDS[0]); await page.focus('#gateArcHandle');
for (const [key, delta] of [['ArrowRight', 1], ['ArrowLeft', -1], ['ArrowUp', 1], ['ArrowDown', -1]]) {
  before = await state(); await page.keyboard.press(key); await settle(page);
  check(`handle keyboard ${key}: one degree and no camera turn`, (await state()).gateAngleDeg === before.gateAngleDeg + delta && same((await state()).camera, before.camera));
}
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
before = await state(); image = await picture();
const box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + box.width * 0.18, box.y + box.height * 0.65); await page.mouse.down();
await page.mouse.move(box.x + box.width * 0.18 + 75, box.y + box.height * 0.65 - 30, { steps: 8 }); await page.mouse.up(); await settle(page);
check('canvas orbit: changes camera and image, preserves epsilon', !same((await state()).camera, before.camera)
  && (await state()).gateAngleDeg === before.gateAngleDeg && await picture() !== image);
checkMath(await state(), 'after orbit');

await pick(IDS[0]); await page.click('#rewindBtn'); await settle(page);
check('rewind: pauses at zero', (await state()).t === 0 && !(await state()).playing);
check('play: actual button advances the clock under slow frames', await playsAfter(page, async () => { await page.click('#playBtn'); await settle(page); }, () => window.GATE_TOWER_DEBUG.state));
await pause(); const paused = (await state()).t;
await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))); await settle(page);
check('pause: button stays unpressed and clock remains fixed after two frames', !(await state()).playing && (await state()).t === paused
  && await page.locator('#playBtn').getAttribute('aria-pressed') === 'false');
for (const speed of [0.5, 2, 1]) {
  await page.click(`#speedChips [data-speed="${speed}"]`); await settle(page);
  check(`speed ${speed}: sole selected speed`, await page.$$eval('#speedChips [aria-pressed="true"]', (els, s) => els.length === 1 && Number(els[0].dataset.speed) === s, speed));
}
for (const card of [IDS[2], IDS[4]]) {
  check(`autoplay ${card}: real card click starts and advances`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.GATE_TOWER_DEBUG.state));
  await pause(); checkMath(await state(), `paused autoplay ${card}`);
}
await pick(IDS[2]); await input('#now', 3.99); const tierBefore = (await state()).towerTier;
await page.click('#playBtn'); await settle(page);
check('climbing clock: a real rail wrap advances one tower tier', await until(page, tier => window.GATE_TOWER_DEBUG.state.towerTier === (tier + 1) % 6, tierBefore));
await pause();
await page.focus('#stage'); const oldLens = (await state()).lensUnifiedGateMode;
await page.keyboard.press('l'); await settle(page);
check('keyboard L: toggles unified lens', (await state()).lensUnifiedGateMode !== oldLens && (await state()).preset === null);

// 两种系统配色 × 双语 × 桌面／手机／书内／宽窄引用框，每张卡均核对布局与数学。
let nightPalette = null;
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
  [1440, 900, false, false], [390, 844, false, false], [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
]) {
  requestedScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? `&preset=${IDS[0]}` : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  await settle(p);
  const tag = `${scheme}/${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
  check(`${tag}: actual system scheme and no palette attribute`, await p.evaluate(s => matchMedia(`(prefers-color-scheme: ${s})`).matches
    && document.documentElement.dataset.trPalette === undefined && getComputedStyle(document.documentElement).colorScheme === 'dark', scheme));
  const palette = await p.evaluate(() => ['void', 'ink', 'cyan', 'magenta', 'amber', 'violet', 'sigma', 'stage'].map(k => TRV.palette[k]));
  if (!nightPalette) nightPalette = palette;
  check(`${tag}: identical single night-console palette`, palette.every(Boolean) && same(palette, nightPalette));
  await layout(p, tag, !embed && width === 1440);
  for (const [i, card] of IDS.entries()) {
    if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } await pause(p); }
    else await pick(card, p);
    await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
    checkPreset(await state(p), card, `${tag}/${card}`);
    const view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p);
    check(`${tag}/${card}: zero layout, HUD or label collisions and overflow`, view.layout.length === 0 && view.hud.length === 0
      && overlaps.length === 0 && await overflowX(p) === 0, [...view.layout, ...view.hud, ...overlaps].join(' | '));
    if (lang === 'en') check(`${tag}/${card}: no Chinese leftovers`, (await cjkLeftovers(p)).length === 0);
  }
  check(`${tag}: palette attribute remains absent after all cards`, await p.evaluate(() => document.documentElement.dataset.trPalette === undefined));
  await p.context().close();
}
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of IDS) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p), tag = `still ${lang}/${card}`;
  checkPreset(s, card, tag, true);
  check(`${tag}: declared paused labelled frame`, s.t === CARDS[card].still && !s.playing
    && await p.evaluate(() => TRV.still && TRV.shot && document.documentElement.dataset.trPalette === undefined));
  if (card === IDS[0]) check(`${tag}: caption angles 16.84 and 19.47 degrees`, near(s.commutatorSpinorHalfAngle / DEG, 16.84, 0.005) && near(s.girardTrihedralExcess / DEG, 19.47, 0.005));
  if (card === IDS[1]) check(`${tag}: caption concurrence 0.7071`, near(s.segreConcurrence, 0.7071, 5e-5));
  if (card === IDS[4]) check(`${tag}: complete 4pi return`, s.towerTier === 5 && s.spinorRe === 1);
  await p.context().close();
}
for (const context of T.browser.contexts()) await auditContext(context);
check('palette: both dark and light startup preferences observed', paletteDocuments.some(r => r.dark) && paletteDocuments.some(r => !r.dark));
check('palette: every document starts without override', paletteDocuments.length > 0 && paletteDocuments.every(r => r.absent), JSON.stringify(paletteDocuments.filter(r => !r.absent)));
check('palette: zero mutations across all contexts', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero page, console or request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero genuine browser console warnings', browserWarnings.length === 0, browserWarnings.join(' | '));
check('zero shared quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
