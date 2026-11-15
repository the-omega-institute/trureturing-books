// VOLUME//STANDING 浏览器回归：先过共享质量门，再独立核对几何、相位、生成树与晶格。
// 单独运行本文件；VIZ_PHASE1=1 使用 cards: false 的快速质量门，完整验收另跑默认模式与
// VIZ_SLOW_FRAMES=1000。数学检查只读取 STANDING_DEBUG.state，控件通过页面事件驱动。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'standing-wave-volume-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const TAU = 2 * Math.PI, DEG = Math.PI / 180, GOLD = (Math.sqrt(5) - 1) / 2;
const CARDS = {
  'multi-phase-point': { scene: 'point', M: 12, detune: 0.36 },
  'circle-density-pushforward': { scene: 'loop', M: 24, detune: 0.22 },
  'void-cancellation': { scene: 'void', M: 48, detune: 2 * GOLD },
  'bohr-sommerfeld-quantization': { scene: 'echo', M: 24, detune: 0 },
  'standing-volume-emergence': { scene: 'volume', M: 64, detune: 0 }
};
const T = await session(), { page, check } = T;
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1, settle: 0 });

// 页面源码只用共享颜色令牌，实验卡顺序也属于公开契约。
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [file, source] of Object.entries(sources)) {
  const literals = source.match(/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/gi) || [];
  check(`source ${file}: zero hex/rgb/hsl colour literals`, literals.length === 0, literals.join(', '));
}
const cardIds = [...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]);
check('source: the five experiment cards appear in order', JSON.stringify(cardIds) === JSON.stringify(Object.keys(CARDS)), cardIds.join(', '));

// 独立数学：复数、向量、北极图中的旋子；不调用页面的数学或调试辅助函数。
const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const vectorNear = (a, b) => Array.isArray(a) && a.length === b.length && a.every((x, i) => near(x, b[i]));
const mul = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const conj = ([a, b]) => [a, -b];
const cis = (a) => [Math.cos(a), Math.sin(a)];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const unit = (a) => a.map((x) => x / Math.hypot(...a));
const spinor = ([x, y, z]) => [[Math.sqrt((1 + z) / 2), 0], [x / Math.sqrt(2 * (1 + z)), y / Math.sqrt(2 * (1 + z))]];
const inner = (a, b) => {
  const p = mul(conj(a[0]), b[0]), q = mul(conj(a[1]), b[1]);
  return [p[0] + q[0], p[1] + q[1]];
};
const solidAngle = (a, b, c) => 2 * Math.atan2(Math.abs(dot(a, cross(b, c))), 1 + dot(a, b) + dot(b, c) + dot(c, a));
function geometry(deg) {
  const e = deg * DEG, c = Math.cos(e), s = Math.sin(e);
  const A = [1, 0, 0], B = [c, s, 0], C = [c, 0, s];
  const omega = 2 * Math.atan(Math.tan(e / 2) ** 2), bloch = [(1 + c + c + c * c) / 4, s * s / 4];
  // 沿最短大圆边逐段作 Pancharatnam 搬运：相邻态的内积调整为正实数。
  const states = [A, B, C, A].map(spinor);
  let carried = states[0];
  for (const next of states.slice(1)) {
    const overlap = inner(carried, next), phase = cis(-Math.atan2(overlap[1], overlap[0]));
    carried = next.map((z) => mul(z, phase));
  }
  const holonomy = inner(states[0], carried);
  return { A, B, C, omega, bloch, tetra: s * s / 6, berry: Math.atan2(holonomy[1], holonomy[0]) };
}
// 用频差的重数算路径对平均，另用几何级数算 Ψ；与页面的逐项和、双重循环不同。
function pairAverage(M, delta) {
  let sum = M;
  for (let k = 1; k < M; k++) sum += 2 * (M - k) * Math.cos(k * delta);
  return sum / (M * M);
}
function coherence(M, delta, theta = 0) {
  const reduced = Math.atan2(Math.sin(delta), Math.cos(delta));
  const radius = Math.abs(reduced) < 1e-12 ? 1 : Math.sin(M * reduced / 2) / (M * Math.sin(reduced / 2));
  return cis((M - 1) * reduced / 2 + theta).map((x) => x * radius);
}
// 以具名有向边构图，再沿选定树广度优先搬运；规范变换在加法相位坐标里计算。
function treeReference(M, delta, theta) {
  const edges = [];
  for (let k = 0; k < M; k++) {
    edges.push({ a: 0, b: k + 1, phase: k * delta / 2, tree: true });
    edges.push({ a: k + 1, b: M + 1, phase: k * delta / 2, tree: k === 0 });
  }
  const gauge = Array.from({ length: M + 2 }, (_, v) => v === 0 ? 0 : v === M + 1 ? theta : 0.7 * v);
  const transport = (gauged) => {
    const root = [0], queue = [0];
    for (let i = 0; i < queue.length; i++) for (const edge of edges.filter((e) => e.tree)) {
      if (edge.a !== queue[i] || root[edge.b] !== undefined) continue;
      root[edge.b] = root[edge.a] + edge.phase + (gauged ? gauge[edge.b] - gauge[edge.a] : 0);
      queue.push(edge.b);
    }
    return root;
  };
  const before = transport(false), after = transport(true);
  const loops = edges.filter((e) => !e.tree).map((e) => {
    const a = before[e.a] + e.phase - before[e.b];
    const b = after[e.a] + e.phase + gauge[e.b] - gauge[e.a] - after[e.b];
    return { phase: a, shift: Math.hypot(...cis(a).map((x, i) => x - cis(b)[i])) };
  });
  return { loops, covariance: Math.max(...after.map((x, v) => Math.abs(x - before[v] - gauge[v]))) };
}
const state = (p = page) => p.evaluate(() => window.STANDING_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); }

function checkGeometry(s, tag) {
  const g = geometry(s.epsDeg), b = s.tripleBargmann;
  check(`${tag}: vertices, spherical excess, sector and chord tetrahedron`, vectorNear(s.A, g.A) && vectorNear(s.B, g.B) && vectorNear(s.C, g.C)
    && near(s.omega, g.omega) && near(s.omegaVos, solidAngle(g.A, g.B, g.C)) && near(s.vSector, g.omega / 3) && near(s.vTetra, g.tetra), JSON.stringify([s.omega, s.vSector, s.vTetra]));
  check(`${tag}: triple_bargmann_bloch has positive Im = sin²ε/4 = 1.5 Vtetra`, b.im > 0
    && [[b.re, b.im], [b.reBloch, b.imBloch], [b.reSpinor, b.imSpinor], s.bargmannTriangle.trace, s.bargmannTriangle.overlaps].every((z) => vectorNear(z, g.bloch))
    && near(b.im, 1.5 * s.vTetra), JSON.stringify(b));
  check(`${tag}: spinor Berry holonomy A → B → C → A = −arg(trace) = −Ω/2`, near(b.arg, Math.atan2(g.bloch[1], g.bloch[0]))
    && near(g.berry, -b.arg) && near(g.berry, -s.omega / 2), `${g.berry}, arg ${b.arg}`);
}
function checkCoherence(s, tag) {
  const p = coherence(s.M, s.delta), pg = coherence(s.M, s.delta, s.theta), avg = pairAverage(s.M, s.delta);
  check(`${tag}: Ψ from geometric series, |Ψ|² = pairAverage to 1e-10`, near(s.delta, s.harmonic * s.detune * Math.PI)
    && near(s.dGamma, s.detune * Math.PI) && vectorNear([s.psi.re, s.psi.im], p) && near(s.psi.abs, Math.hypot(...p))
    && near(s.psi.abs2, avg) && near(s.pairAvg, avg) && near(s.closedAbs ** 2, avg), JSON.stringify([s.psi.abs2, s.pairAvg, avg]));
  check(`${tag}: endpoint gauge rotates Ψ, preserving its norm`, near(s.theta, TAU * s.t)
    && vectorNear([s.psiGauge.re, s.psiGauge.im], pg) && near(s.psiGauge.abs, s.psi.abs)
    && vectorNear(s.tree.psi, pg) && near(s.tree.psiAbs, s.psi.abs));
  const angle = (s.M - 1) * s.delta / 2, rotated = mul([s.psi.re, s.psi.im], cis(-angle));
  check(`${tag}: phase_locked_overlap_is_rotated_real`, near(s.lock.angle, angle) && near(s.lock.r, rotated[0])
    && near(s.lock.imag, rotated[1]) && Math.abs(rotated[1]) < 1e-10 && Math.abs(s.lock.residual) < 1e-10);
}
function checkTree(s, tag) {
  const ref = treeReference(s.M, s.delta, s.theta);
  check(`${tag}: selected_tree_transport, M−1 basic loops and zero gauge shift`, s.tree.edges === 2 * s.M && s.tree.vertices === s.M + 2
    && s.tree.basicLoops === s.M - 1 && s.tree.loops === ref.loops.length && ref.loops.length === s.M - 1
    && ref.loops.every((l, k) => near(l.phase, (k + 1) * s.delta) && l.shift < 1e-10)
    && ref.covariance < 1e-10 && near(s.tree.covariance, 0) && near(s.tree.loopShift, 0), JSON.stringify(s.tree));
}
function checkLattice(s, tag) {
  const core = s.lattice.filter((n) => n.kind === 'core'), bg = s.lattice.filter((n) => n.kind !== 'core');
  const amplitude = (n) => Math.hypot(...coherence(s.M, n.kind === 'core' ? s.delta : s.harmonic * TAU * (0.176 + 0.064 * (((n.j + 1) * GOLD) % 1))));
  const rms = Math.sqrt(bg.reduce((sum, n) => sum + amplitude(n) ** 2, 0) / bg.length);
  const volume = s.lattice.reduce((sum, n) => sum + amplitude(n) ** 2 * n.w, 0);
  check(`${tag}: 27 core cells and 36 background nodes, independent amplitudes and RMS`, core.length === 27 && s.nCore === 27 && bg.length === 36
    && new Set(bg.map((n) => n.j)).size === 36 && s.lattice.every((n) => near(n.absPsi, amplitude(n)) && n.w > 0)
    && near(s.bgRms, rms) && near(s.coreAbs, Math.hypot(...coherence(s.M, s.delta))), `${s.bgRms} vs ${rms}`);
  check(`${tag}: core weights tile Ω/3; emergent volume and standing counts`, near(core.reduce((sum, n) => sum + n.w, 0), geometry(s.epsDeg).omega / 3)
    && near(s.coreWeightSum, s.omega / 3) && near(s.volEmergent, volume)
    && s.nStanding === s.lattice.filter((n) => amplitude(n) ** 2 >= 0.25).length
    && s.nCoreStanding === core.filter((n) => amplitude(n) ** 2 >= 0.25).length, JSON.stringify([s.coreWeightSum, s.volEmergent, volume]));
}

// 两种操作系统外观仍使用同一夜间配色；逐卡核对中英文实际终态。
await T.goto(BOOK, ID, '?lang=zh'); await settle(page);
const screenTokens = JSON.parse(fs.readFileSync(path.resolve(DIR, '../../../../theme/tokens.json'), 'utf8')).screen;
const paletteKeys = ['void', 'stage', 'cyan', 'magenta', 'amber', 'violet', 'ink'];
for (const scheme of ['dark', 'light']) {
  await page.emulateMedia({ colorScheme: scheme }); await settle(page);
  const palette = await page.evaluate((keys) => ({ unset: document.documentElement.dataset.trPalette === undefined,
    colours: keys.map((k) => TRV.palette[k]) }), paletteKeys);
  check(`palette ${scheme}: trPalette undefined, one shared night-console palette`, palette.unset
    && palette.colours.every((c, i) => c === screenTokens[paletteKeys[i]]), JSON.stringify(palette));
}
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const [card, expected] of Object.entries(CARDS)) {
    await pick(card);
    const s = await state(), tag = `${lang}/${card}`;
    check(`${tag}: preset controls and fixed rail frame`, s.preset === card && s.scene === expected.scene && s.M === expected.M
      && s.epsDeg === 60 && near(s.detune, expected.detune) && s.harmonic === 1 && s.t === 1 && !s.playing, JSON.stringify([s.scene, s.M, s.detune, s.t]));
    checkGeometry(s, tag); checkCoherence(s, tag); checkTree(s, tag); checkLattice(s, tag);
    if (lang === 'en') { const left = await cjkLeftovers(page); check(`${tag}: no Chinese left visible`, left.length === 0, left.join(' | ')); }
  }
}

// 滑块覆盖整个整数定义域，每次输入后 settle，避免慢帧覆盖下一次输入。
await pick('circle-density-pushforward');
for (let M = 3; M <= 64; M++) {
  await input('#density', M);
  const s = await state();
  check(`density slider M=${M}: exact integer and free exploration`, s.M === M && s.preset === null);
  checkCoherence(s, `M=${M}`); checkTree(s, `M=${M}`);
}
for (let eps = 15; eps <= 90; eps++) {
  await input('#epsilon', eps);
  const s = await state();
  check(`epsilon slider ε=${eps}°: control reaches requested angle`, s.epsDeg === eps);
  checkGeometry(s, `ε=${eps}°`);
  if (eps % 15 === 0) checkLattice(s, `ε=${eps}°`);
}
for (const harmonic of [1, 2, 3]) {
  await page.click(`[data-harmonic="${harmonic}"]`); await settle(page);
  for (const detune of [0, 0.01, 0.22, 0.36, 0.5, 1, 1.24, 1.5]) {
    await input('#detune', detune);
    const s = await state(), tag = `n=${harmonic}, Δγ/π=${detune}`;
    check(`${tag}: harmonic chip and detune slider`, s.harmonic === harmonic && near(s.detune, detune));
    checkCoherence(s, tag); checkTree(s, tag);
  }
}
// 共振既含 δ=0，也含非零整圈；M 不必是圈数的倍数。
await input('#detune', 1);
await page.click('[data-harmonic="2"]'); await settle(page);
check('echo resonance: δ=2π also has |Ψ64|²=1', near((await state()).psi.abs2, 1));

// 时间轴是规范相位，不改变相干度或回路坐标。
for (const card of Object.keys(CARDS)) {
  await pick(card);
  const start = await state();
  for (const t of [0, 0.125, 0.37, 0.75, 1]) {
    await input('#now', t);
    const s = await state(), tag = `${card}, t=${t}`;
    check(`${tag}: rail reaches t and |Ψ| stays fixed`, near(s.t, t) && near(s.psi.abs, start.psi.abs));
    checkCoherence(s, tag); checkTree(s, tag);
  }
}
await page.click('#rew'); await settle(page);
check('rewind pauses and sets the gauge rail to zero', (await state()).t === 0 && !(await state()).playing);
check('play advances the rail even at slow frame rates', await playsAfter(page, () => page.click('#play'), () => window.STANDING_DEBUG.state));
await page.click('#play'); await settle(page);
check('pause stops the gauge clock', !(await state()).playing);
await page.click('[data-paths="12"]'); await settle(page);
check('density chips set M=12', (await state()).M === 12);
await page.locator('#stage').focus(); await page.keyboard.press('+'); await settle(page);
check('keyboard + adds one path', (await state()).M === 13);
await page.keyboard.press('-'); await settle(page);
check('keyboard − removes one path', (await state()).M === 12);

// 黄金步长的有限数值见证；不把此数值衰减冒充极限定理给出的收敛速度。
await pick('void-cancellation');
const voids = [];
for (const M of [3, 12, 48, 64]) {
  await input('#density', M);
  const s = await state(); voids.push(s.psi.abs2);
  const bound = 1 / (M * Math.abs(Math.sin(Math.PI * GOLD))) ** 2;
  check(`continuous_average_tendsto_haar: golden step at M=${M}`, near(s.delta, TAU * GOLD)
    && near(s.dGammaGold, TAU * GOLD) && near(s.psi.abs2, pairAverage(M, TAU * GOLD)) && s.psi.abs2 <= bound + 1e-10);
}
check('void cancellation: M=64 drives |Ψ|² below 0.001', voids[3] < 0.001 && voids[3] < voids[0] / 20, voids.join(', '));

// 从子群成员关系穷举零化子，再逐槽求特征；不采用页面给出的零化子作为输入。
await pick('bohr-sommerfeld-quantization');
const sieveState = (await state()).sieve, H = [0, 3, 6, 9];
const annihilator = Array.from({ length: 12 }, (_, k) => k).filter((k) => H.every((h) => k * h % 12 === 0));
check('Z/12Z: subgroup and independently enumerated annihilator', vectorNear(sieveState.H, H) && vectorNear(sieveState.annihilator, annihilator) && sieveState.sums.length === 12);
for (let x = 0; x < 12; x++) {
  const row = sieveState.sums[x], re = annihilator.reduce((sum, k) => sum + Math.cos(TAU * k * x / 12), 0);
  const im = annihilator.reduce((sum, k) => sum + Math.sin(TAU * k * x / 12), 0), expected = H.includes(x) ? 3 : 0;
  check(`sum_annihilator_character: x=${x} gives ${expected}`, row.x === x && row.inH === H.includes(x)
    && near(row.re, re) && near(row.im, im) && near(row.re, expected) && near(row.im, 0)
    && near(row.echoRe, expected) && near(row.echoIm, 0), JSON.stringify(row));
}

// 晶格对照：M 变大只消除背景，核心节点仍同相，权重仍铺满扇形。
await pick('standing-volume-emergence');
const volumes = [];
for (const M of [3, 12, 24, 48, 64]) {
  await input('#density', M);
  const s = await state(); volumes.push(s);
  checkLattice(s, `standing volume M=${M}`);
  check(`standing volume M=${M}: every core node remains 1, coreWeight=Ω/3`, s.lattice.filter((n) => n.inside).every((n) => near(n.absPsi, 1))
    && near(s.coreAbs, 1) && s.nCoreStanding === 27 && near(s.coreWeightSum, s.omega / 3));
}
const first = volumes[0], last = volumes.at(-1);
check('3D lattice contrast: bgRms >0.35 at M=3, <0.08 at M=64', first.bgRms > 0.35 && last.bgRms < 0.08
  && last.bgRms < first.bgRms / 10, `${first.bgRms} → ${last.bgRms}`);
check('emergent volume settles near Ω/3 as the background cancels', last.volEmergent > last.vSector
  && last.volEmergent - last.vSector < 0.001 && first.volEmergent - first.vSector > 0.05
  && last.lattice.filter((n) => !n.inside).every((n) => n.absPsi < 0.03), `${first.volEmergent} → ${last.volEmergent}, Ω/3=${last.vSector}`);

// 滚轮不能被劫持：同时捕获 preventDefault 调用与事件的最终取消状态。
const wheel = await page.evaluate(() => {
  const cv = document.getElementById('cv'), before = { ...window.STANDING_DEBUG.state.cam };
  const original = Event.prototype.preventDefault; let calls = 0;
  Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
  try {
    const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
    const allowed = cv.dispatchEvent(ev);
    return { calls, allowed, cancelled: ev.defaultPrevented, before, after: window.STANDING_DEBUG.state.cam };
  } finally { Event.prototype.preventDefault = original; }
});
check('wheel on #cv: preventDefault never called, event uncancelled, zoom unchanged', wheel.calls === 0 && wheel.allowed && !wheel.cancelled
  && near(wheel.before.zoom, wheel.after.zoom), JSON.stringify(wheel));

// 合成指针事件经过真实舞台监听器；先证明手柄确实拖动，再检查 cancel 清理与重新拾取。
async function pointer(type, xy, id = 41) {
  await page.locator('#cv').evaluate((el, a) => el.dispatchEvent(new PointerEvent(a.type, {
    bubbles: true, cancelable: true, pointerId: a.id, pointerType: 'mouse', isPrimary: true,
    clientX: a.xy[0], clientY: a.xy[1], button: 0, buttons: a.type === 'pointerdown' || a.type === 'pointermove' ? 1 : 0
  })), { type, xy, id });
  await settle(page);
}
const handle = await page.evaluate(() => window.STANDING_DEBUG.handle());
const camBefore = (await state()).cam;
await pointer('pointerdown', handle);
const target = await page.evaluate(() => window.STANDING_DEBUG.screen([Math.cos(75 * Math.PI / 180), 0, Math.sin(75 * Math.PI / 180)]));
await pointer('pointermove', target);
const dragged = await state();
check('amber handle: dragging changes ε to 75° without orbiting', dragged.epsDeg === 75 && near(dragged.cam.yaw, camBefore.yaw) && near(dragged.cam.pitch, camBefore.pitch), `${dragged.epsDeg}`);
await pointer('pointercancel', target);
const released = await state();
await pointer('pointermove', handle);
check('pointercancel: subsequent moves of the cancelled pointer leave ε unchanged', (await state()).epsDeg === released.epsDeg);
await pick('standing-volume-emergence');
const reset = await state(), resetHandle = await page.evaluate(() => window.STANDING_DEBUG.handle());
check('pointercancel: preset can restore ε and refit the stage', reset.epsDeg === 60 && vectorNear(reset.fit.F, last.fit.F) && near(reset.fit.u, last.fit.u));
await pointer('pointerdown', resetHandle, 42);
const nextTarget = await page.evaluate(() => window.STANDING_DEBUG.screen([Math.cos(45 * Math.PI / 180), 0, Math.sin(45 * Math.PI / 180)]));
await pointer('pointermove', nextTarget, 42);
check('pointercancel: a fresh pointer can drag the handle again', (await state()).epsDeg === 45);
await pointer('pointerup', nextTarget, 42);

// 完整模式另外核对 PDF/EPUB 所用的五张双语停帧。
if (!PHASE1) for (const lang of ['zh', 'en']) for (const [card, expected] of Object.entries(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang);
  const s = await state(p);
  check(`still ${lang}/${card}: declared parameters and t=1, paused`, s.preset === card && s.scene === expected.scene && s.M === expected.M
    && near(s.detune, expected.detune) && s.epsDeg === 60 && s.harmonic === 1 && s.t === 1 && !s.playing);
  checkGeometry(s, `still ${lang}/${card}`); checkCoherence(s, `still ${lang}/${card}`); checkLattice(s, `still ${lang}/${card}`);
  await p.context().close();
}
check('no page error, console error or failed request in the suite', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
