// ARC//MACRO 浏览器回归：严格公共契约、独立数学、真实指针与双语视口。
// VIZ_PHASE1=1 缩短共享卡片遍历；VIZ_SLOW_FRAMES=1000 检验慢帧。
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import {
  session, stageFirstChecks, settle, openStill, playsAfter, until,
  stageView, cjkLeftovers, overflowX, labelOverlaps
} from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'quantum-arc-macro-integral-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const REQUIRED_CARDS = [
  'arc-sagitta-ito', 'quantum-three-hallmarks', 'curve-stitches-straight',
  'force-from-phase-gradient', 'calculus-duality-zoom'
];
const STEP_COUNTS = [1, 4, 16, 64, 256];
const CHANNEL_NS = [1, 2, 3, 4, 6, 8, 11, 16, 23, 32, 45, 64, 91, 128, 181, 256];
const CARDS = {
  'arc-sagitta-ito': { n: 64, theta: 1, beta: 0, scene: 'arc', plot: 'sagitta', still: 0.5, play: true },
  'quantum-three-hallmarks': { n: 1, theta: 0.85, beta: 0, scene: 'hallmarks', plot: 'hallmarks', still: 0.5, play: true },
  'curve-stitches-straight': { n: 16, theta: 1, beta: 0, scene: 'bundle', plot: 'stitch', still: 1, play: true },
  'force-from-phase-gradient': { n: 16, theta: 1, beta: 0.55, scene: 'bundle', plot: 'force', still: 1, play: true },
  'calculus-duality-zoom': { n: 64, theta: 1, beta: 0.25, scene: 'zoom', plot: 'channels', still: 1, play: false }
};
const GIDS = [
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le',
  'D5/S3/Quantum/Analysis/TrotterProduct.trotter_product',
  'D5/S3/QuantumBounds/RobertsonSchrodinger.robertson_schrodinger',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Fourier/GoldenModelSetDelone.exists_golden_modelSet_delone',
  'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product',
  'D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness',
  'D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity'
];
const THEORY = ['zh', 'en'].map(lang => `../../${lang}/ch34-s11-quantum-arcs-and-macro-integrals.html#sec-ch34-quantum-arc-and-macro-integral`);
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(file => [file, fs.readFileSync(path.join(DIR, file), 'utf8')]));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
const near = (a, b, tol = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = a => Math.hypot(...a);
const unit = a => a.map(x => x / norm(a));
const sph = (psi, lambda) => [Math.cos(lambda) * Math.sin(psi), Math.sin(lambda), Math.cos(lambda) * Math.cos(psi)];
const distance = (a, b) => 2 * Math.asin(Math.min(1, norm(sub(a, b)) / 2));
const entropy = p => (p > 0 ? -p * Math.log(p) : 0) + (p < 1 ? -(1 - p) * Math.log1p(-p) : 0);

const T = await session(), { page, check } = T;
const paletteMutations = [], consoleWarnings = [], contexts = new Set(), schemes = new Set();
let nextScheme = 'dark';
// 在任何页面脚本前安装，覆盖共享质量门、停帧、深浅系统偏好及后续新建页面。
async function watchPalette(context) {
  contexts.add(context);
  await context.exposeBinding('__arcPaletteMutation', ({ page: p }, record) => paletteMutations.push({ url: p.url(), ...record }));
  await context.addInitScript(() => {
    const records = [], pending = [];
    new MutationObserver(mutations => {
      for (const r of mutations) {
        const record = { tag: r.target.tagName, old: r.oldValue, value: r.target.getAttribute(r.attributeName) };
        records.push(record);
        pending.push(window.__arcPaletteMutation(record));
      }
    }).observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['data-tr-palette'] });
    window.__arcPaletteAudit = async () => {
      await Promise.resolve();
      await Promise.all(pending);
      return {
        unset: document.documentElement.dataset.trPalette === undefined,
        attributes: document.querySelectorAll('[data-tr-palette]').length,
        mutations: records.length,
        scheme: matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
      };
    };
  });
  const watchConsole = p => p.on('console', m => {
    // 软件 WebGL 驱动的能力与性能提示不属于页面警告。
    if (m.type() === 'warning' && !/KHR_parallel_shader_compile|GL Driver Message|GPU stall due to ReadPixels/.test(m.text())) {
      consoleWarnings.push(`${p.url()}: ${m.text()}`);
    }
  });
  for (const p of context.pages()) watchConsole(p);
  context.on('page', watchConsole);
}
await watchPalette(T.context);
await page.emulateMedia({ colorScheme: 'dark' });
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async options => {
  const context = await newContext({ colorScheme: nextScheme, ...options });
  await watchPalette(context);
  return context;
};
const state = (p = page) => p.evaluate(() => window.ARC_MACRO_DEBUG.state);
async function auditPalette(p, tag) {
  const audit = await p.evaluate(() => window.__arcPaletteAudit());
  schemes.add(audit.scheme);
  check(`${tag}: palette unset, zero attributes and zero mutations`, audit.unset && audit.attributes === 0 && audit.mutations === 0, JSON.stringify(audit));
}
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => {
    el.value = String(v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, value);
  await settle(p);
}
async function pause(p = page) {
  // 准备读数时原地暂停；滚到页脚再点击会与书内的离屏自动暂停竞争。
  // 真正的播放/暂停按钮另在交互检查中操作。
  await p.evaluate(() => window.TRV.kit.pause());
  await settle(p);
}
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  await settle(p); await pause(p);
}
const picture = async () => createHash('sha256').update(await page.locator('#stage').screenshot({ animations: 'disabled' })).digest('hex');
async function section(name, run) {
  try { await run(); }
  catch (error) { check(`${name}: completes without an exception`, false, error.stack || String(error)); }
}

// 通用矩阵幂级数核对 so(3)；不用页面的 Rodrigues 公式或线性循环乘幂。
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const multiply = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, x, k) => sum + x * b[k][j], 0)));
function exponential(a) {
  let sum = eye(a.length), term = eye(a.length);
  for (let k = 1; k <= 80; k++) {
    term = multiply(term, a).map(row => row.map(x => x / k));
    sum = sum.map((row, i) => row.map((x, j) => x + term[i][j]));
    if (Math.max(...term.flat().map(Math.abs)) < 1e-17) break;
  }
  return sum;
}
function power(a, n) {
  let result = eye(a.length);
  for (; n > 0; n = Math.floor(n / 2), a = multiply(a, a)) if (n % 2) result = multiply(result, a);
  return result;
}
const frobeniusDifference = (a, b) => norm(a.flatMap((row, i) => row.map((x, j) => x - b[i][j])));
function so3Trotter(theta, n) {
  const x = [[0, 0, 0], [0, 0, -theta], [0, theta, 0]], y = [[0, 0, theta], [0, 0, 0], [-theta, 0, 0]];
  const step = a => exponential(a.map(row => row.map(v => v / n)));
  return frobeniusDifference(power(multiply(step(x), step(y)), n), exponential(x.map((row, i) => row.map((v, j) => v + y[i][j]))));
}

// 每条路独立重建 49 个顶点，用弦长反求弧长；面积由首顶点扇形三角剖分给出。
function pathPoints(theta, eta, n = 48) {
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    return sph(theta * (t - 0.5), 4 * eta * t * (1 - t));
  });
}
function pathGeometry(theta, eta) {
  const points = pathPoints(theta, eta);
  const length = points.slice(1).reduce((sum, q, i) => sum + distance(points[i], q), 0);
  let area = 0;
  for (let i = 1; i + 1 < points.length; i++) {
    const [a, b, c] = [points[0], points[i], points[i + 1]];
    area -= 2 * Math.atan2(dot(a, cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a));
  }
  return { length, area };
}
const phase = (theta, beta, eta) => {
  const g = pathGeometry(theta, eta);
  return (30 / theta) * (g.length - theta - 2 * beta * g.area / theta);
};
function hingeSummary(theta, eta, n) {
  const points = pathPoints(theta, eta, n), turns = [];
  for (let i = 1; i + 1 < points.length; i++) {
    const a = unit(cross(points[i - 1], points[i])), b = unit(cross(points[i], points[i + 1]));
    turns.push(Math.atan2(dot(points[i], cross(a, b)), dot(a, b)));
  }
  return { curvature: -turns.reduce((sum, x) => sum + x, 0) / theta, max: Math.max(0, ...turns.map(Math.abs)) };
}
function checkBundle(s, tag) {
  const theta = s.arcScale, beta = s.phaseGradient;
  const paths = Array.from({ length: 41 }, (_, m) => {
    const eta = 0.4 * theta * (m - 20) / 20, geometry = pathGeometry(theta, eta);
    return { ...geometry, phase: (30 / theta) * (geometry.length - theta - 2 * beta * geometry.area / theta) };
  });
  const amplitude = norm([0, 1].map(axis => paths.reduce((sum, p) => sum + (axis ? Math.sin(p.phase) : Math.cos(p.phase)), 0) / 41));
  check(`${tag}: 41 independently recomputed arc lengths, areas, phases and coherent sum`, s.bundlePathCount === 41
    && s.pathPhases.length === 41 && s.pathAreas.length === 41
    && paths.every((p, i) => near(s.pathPhases[i], p.phase, 2e-10) && near(s.pathAreas[i], p.area, 1e-11))
    && near(s.bundleAmplitude, amplitude, 2e-11) && amplitude > 0 && amplitude < 1);
  check(`${tag}: signed Stokes loop and flux agree with independent triangulation`, near(s.stokesOuter.flux, -paths[40].area)
    && near(s.stokesOuter.loop, -paths[40].area) && near(s.stokesOuter.bargmann, -paths[40].area)
    && near(s.spineFlux, pathGeometry(theta, s.stationaryEta).area) && s.stokesLoopFluxMatch < 1e-10);
  const eta = s.stationaryEta, h = 1e-5 * theta;
  const derivative = (phase(theta, beta, eta + h) - phase(theta, beta, eta - h)) / (2 * h);
  const kappa = (8 * eta - theta ** 2 * Math.sin(eta) * Math.cos(eta)) / (theta ** 2 * Math.cos(eta) ** 2);
  // 路径族有边界；驻点到达 ±W 后，核对约束极小值的单侧导数。
  const boundary = near(Math.abs(eta), 0.4 * theta, 1e-9);
  const stationary = boundary ? derivative * Math.sign(eta) <= 1e-5 : Math.abs(derivative) < 1e-5;
  check(`${tag}: stationary action or constrained endpoint and analytic signed midpoint curvature`, stationary
    && near(s.stationarySpineCurvature, kappa, 1e-4) && Math.sign(eta) === Math.sign(beta)
    && Math.sign(s.stationarySpineCurvature) === Math.sign(beta), JSON.stringify({ derivative, kappa, actual: s.stationarySpineCurvature }));
  if (beta === 0) check(`${tag}: even phases, odd areas and exact transverse cancellation`, s.bundleSymmetric && s.stationaryEta === 0
    && s.transverseResidual === 0 && s.pathPhases.every((v, i) => near(v, s.pathPhases[40 - i]))
    && s.pathAreas.every((v, i) => near(v, -s.pathAreas[40 - i])));
  else check(`${tag}: steering breaks symmetry and moves the stationary spine`, !s.bundleSymmetric
    && s.transverseResidual > 0 && s.spineFlux * beta > 0);
  check(`${tag}: exact N grid is present in the channel table`, same(s.channels.map(r => r.n), CHANNEL_NS));
  for (const n of CHANNEL_NS) {
    const row = s.channels.find(r => r.n === n), hinges = hingeSummary(theta, eta, n);
    const eps = theta / (s.scalingMode === 'feynman-ito' ? Math.sqrt(n) : n);
    check(`${tag}/channel N=${n}: signed hinge curvature and entropy independently recomputed`, !!row
      && near(row.curvature, hinges.curvature, 1e-9) && near(row.hingeMax, hinges.max, 1e-9)
      && near(row.tax, entropy((1 + Math.cos(eps) ** n) / 2)) && row.deviation >= 0);
  }
}
function checkMath(s, tag, bundle = true) {
  const n = s.stepCount, theta = s.arcScale, ito = s.scalingMode === 'feynman-ito', eps = theta / (ito ? Math.sqrt(n) : n);
  const chord = norm([s.tangentSin, s.sagittaVersine]);
  check(`${tag}: exact step, chord, arc and tangent-normal sagitta`, near(s.stepEps, eps) && near(s.tangentSin, Math.sin(eps))
    && near(s.sagittaVersine, 2 * Math.sin(eps / 2) ** 2) && near(chord, 2 * Math.sin(eps / 2)) && chord < eps
    && near(s.cumulativeSagitta, n * 2 * Math.sin(eps / 2) ** 2));
  check(`${tag}: quadratic sagitta and cubic chord defect with Taylor remainder bounds`, s.sagittaVersine > 0
    && s.sagittaVersine <= eps ** 2 / 2 + 1e-15 && s.sagittaVersine >= eps ** 2 / 2 - eps ** 4 / 24 - 1e-15
    && eps - chord <= eps ** 3 / 24 + 1e-14 && eps - chord >= eps ** 3 / 24 - eps ** 5 / 1920 - 1e-14);
  check(`${tag}: geometric identities have independently bounded residuals`, near(s.tangentSin ** 2 + (1 - s.sagittaVersine) ** 2, 1)
    && s.lagrangeGramResidual < 1e-12 && s.pythagoreanResidual < 1e-12 && s.versineResidual < 1e-12);
  check(`${tag}: so(3) Trotter norm matches a matrix exponential series`, near(s.trotterOperatorError, so3Trotter(theta, n), 1e-10)
    && s.trotterByN.every(r => near(r.err, so3Trotter(theta, r.n), 1e-10)));
  const errors = s.trotterByN;
  check(`${tag}: Trotter error stays positive, decreases and is first order in 1/N`, errors.every(r => r.err > 0)
    && errors.slice(1).every((r, i) => r.err < errors[i].err)
    && errors.slice(-3).every((r, i, tail) => !i || Math.abs(r.n * r.err / (tail[i - 1].n * tail[i - 1].err) - 1) < 0.003));
  let re = 0, im = 0, factor = 1;
  // 极小尾项低于双精度舍入尺度时，裸比较可能给出保守的 false；误差预算不掩盖可分辨的越界。
  const roundoff = 32 * Number.EPSILON * Math.max(1, eps);
  check(`${tag}: seven Taylor tails satisfy independent scalar complex norms and bounds`, s.taylorTails.length === 7
    && (s.taylorBoundHolds || s.taylorTails.every(r => r.tail <= r.bound + roundoff))
    && s.taylorTails.every((r, k) => {
      if (k) {
        const j = k - 1, term = eps ** j / factor;
        re += [1, 0, -1, 0][j % 4] * term; im += [0, 1, 0, -1][j % 4] * term; factor *= k;
      }
      const tail = Math.hypot(Math.cos(eps) - re, Math.sin(eps) - im), bound = eps ** k / factor * Math.exp(eps);
      return r.n === k && near(r.tail, tail, 5e-8) && near(r.bound, bound) && tail <= bound + roundoff;
    }), JSON.stringify({ eps, holds: s.taylorBoundHolds, tails: s.taylorTails }));
  const variance = 1 - Math.sin(eps) ** 2 / 2, rs = s.robertson;
  check(`${tag}: Pauli variances, covariance, commutator floor and Gram remainder`, near(rs.product, variance ** 2)
    && near(rs.cov, -(Math.sin(eps) ** 2) / 2) && near(rs.half[0], Math.cos(eps)) && near(rs.half[1], 0)
    && near(rs.G, 0) && near(s.commutatorFloor, Math.abs(Math.cos(eps))) && s.robertsonEqualityDiff < 1e-12 && s.robertsonGramNonnegative);
  const z = Math.cos(eps) ** n;
  check(`${tag}: pinching entropy equals the spectrum of the final state`, near(s.coherenceLeft, z)
    && near(s.coarsePinchingEntropyTax, entropy((1 + z) / 2)) && s.coarsePinchingEntropyTax > 0 && s.pinchingIdentityResidual < 1e-11);
  check(`${tag}: solid angle, minimum sagitta and continuous spinor lift`, near(s.girardExcess, 2 * Math.atan(Math.tan(eps / 2) ** 2))
    && s.girardExcess > 0 && near(s.minSagittaFloor, s.sagittaVersine)
    && s.spinor360Sign === -1 && s.spinor720Sign === 1 && near(s.spinorAngle, 4 * Math.PI * s.t)
    && near(s.spinorNow[0], Math.cos(s.spinorAngle / 2)) && near(s.spinorNow[1], Math.sin(s.spinorAngle / 2)));
  if (bundle) checkBundle(s, tag);
}
function checkPreset(s, id, tag) {
  const p = CARDS[id];
  check(`${tag}: preset applies all declared parameters`, s.preset === id && s.stepCount === p.n && s.scalingMode === 'feynman-ito'
    && s.arcScale === p.theta && s.phaseGradient === p.beta && s.scene === p.scene && s.plot === p.plot && !s.playing,
    JSON.stringify({ preset: s.preset, n: s.stepCount, theta: s.arcScale, beta: s.phaseGradient, scene: s.scene, plot: s.plot, playing: s.playing }));
  checkMath(s, tag);
}
async function checkLinks(p, tag) {
  check(`${tag}: exactly nine frozen theorem links`, same(await p.$$eval('[data-lean-gid]', els => els.map(e => e.dataset.leanGid).sort()), [...GIDS].sort()));
  check(`${tag}: exact relative bilingual chapter links in the drawer`, same(await p.$$eval('#drawer a[href^="../../"]', els => els.map(e => e.getAttribute('href')).sort()), [...THEORY].sort()));
  check(`${tag}: every Lean link and all evidence badges stay in the side evidence panel`, await p.evaluate(() => {
    const evidence = document.querySelector('.col.side #evidence');
    return !!evidence && [...document.querySelectorAll('[data-lean-gid]')].every(a => evidence.contains(a)
      && a.closest('.lean')?.querySelector('.ok')?.textContent.trim() === 'LEAN ✓')
      && ['argued', 'model', 'num'].every(k => evidence.querySelector(`.lean.${k} .ok`)?.textContent.trim() === k.toUpperCase())
      && evidence.contains(document.querySelector('#infoBtn'));
  }));
}
async function strictLabels(p) {
  return p.evaluate(() => {
    const stage = document.querySelector('#stage').getBoundingClientRect();
    const visible = el => {
      const s = getComputedStyle(el);
      return !el.hidden && el.getClientRects().length && s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity) > 0;
    };
    const tags = [...document.querySelectorAll('#stage .tag')].filter(visible).map(el => ({ name: el.textContent, rect: el.getBoundingClientRect() }));
    const hud = [...document.querySelectorAll('#stage > .hud-tl, #stage > .hud-tr, #stage > .hud-bl')].filter(visible).map(el => ({ name: el.className, rect: el.getBoundingClientRect() }));
    const bad = [], area = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    tags.forEach((a, i) => {
      if (a.rect.left < stage.left || a.rect.right > stage.right || a.rect.top < stage.top || a.rect.bottom > stage.bottom) bad.push(`clipped ${a.name}`);
      for (const b of [...tags.slice(i + 1), ...hud]) if (area(a.rect, b.rect) > 0.1) bad.push(`${a.name} / ${b.name}`);
    });
    for (let i = 0; i < hud.length; i++) for (const b of hud.slice(i + 1)) if (area(hud[i].rect, b.rect) > 0.1) bad.push(`${hud[i].name} / ${b.name}`);
    return { count: tags.length, bad };
  });
}

await section('shared quality gates', () => stageFirstChecks(T, 'quantum-geometry', 'quantum-arc-macro-integral-sandbox', { solid: true, cards: !PHASE1, settle: 0 }));
await section('source and public contract', async () => {
  // 禁止词用码点保存，测试自身也遵守出版源码的零标识约定。
  const forbidden = [
    [111, 112, 101, 110, 97, 105], [97, 110, 116, 104, 114, 111, 112, 105, 99],
    [99, 108, 97, 117, 100, 101], [103, 101, 109, 105, 110, 105], [99, 111, 100, 101, 120],
    [99, 104, 97, 116, 103, 112, 116], [103, 112, 116], [100, 101, 101, 112, 115, 101, 101, 107],
    [108, 108, 97, 109, 97], [113, 119, 101, 110], [109, 105, 115, 116, 114, 97, 108],
    [99, 111, 112, 105, 108, 111, 116], [100, 97, 108, 108, 101], [109, 105, 100, 106, 111, 117, 114, 110, 101, 121]
  ].map(codes => String.fromCharCode(...codes));
  const identifiers = new RegExp(`\\b(?:${forbidden.join('|')})(?:[-_ ]?\\d[\\w.-]*)?\\b`, 'i');
  for (const [file, source] of Object.entries(sources)) {
    check(`source ${file}: zero color literals`, !/#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{4}|[\da-f]{3})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(source));
    check(`source ${file}: zero palette overrides`, !/\btrPalette\b|data-tr-palette/.test(source));
    check(`source ${file}: zero generation or vendor identifiers`, !identifiers.test(source));
    check(`source ${file}: zero warning colors on the stage`, !/\bP\s*(?:\.\s*warn\b|\[\s*['"]warn['"]\s*\])|--warn\b|\bc-wn\b|class="[^"]*\bwn\b/.test(source));
  }
  check('source style.css: zero grid-template-columns overrides', !/grid-template-columns/i.test(sources['style.css']));
  check('source: wheel false preserves host scrolling', /\bwheel\s*:\s*false\b/.test(sources['main.js']));
  const actualCards = [...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map(m => m[1]);
  check('contract: exact five presets in public order', same(actualCards, REQUIRED_CARDS) && same(Object.keys(CARDS), REQUIRED_CARDS), `actual: ${actualCards.join(', ')}`);
  check('registry: live entry and exact nine GIDs', entry?.status === 'live' && same(entry.lean.map(x => x.gid).sort(), [...GIDS].sort()));
  check('registry: exact five presets match the page', same(entry?.presets, REQUIRED_CARDS), `presets: ${JSON.stringify(entry?.presets)}`);
  await T.goto(BOOK, ID, '?lang=en'); await settle(page); await pause();
  check('runtime: only shared scripts and local styles', same(await page.$$eval('script', els => els.map(e => e.getAttribute('src'))), ['../assets/shell.js', '../assets/kit.js', 'main.js'])
    && same(await page.$$eval('link[rel=stylesheet]', els => els.map(e => e.getAttribute('href')).filter(s => !s.startsWith('https:'))), ['../assets/theme.css', 'style.css']));
  await checkLinks(page, 'desktop');
  const layout = await page.evaluate(() => {
    const app = document.querySelector('.app.lab'), deck = document.querySelector('.col.deck'), center = document.querySelector('.center'), side = document.querySelector('.col.side');
    const visible = el => !!el && el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0 && getComputedStyle(el).display !== 'none';
    const boxes = [deck, center, side].map(el => el?.getBoundingClientRect());
    const plot = document.querySelector('#plot');
    return { grid: getComputedStyle(app).display, columns: getComputedStyle(app).gridTemplateColumns.split(' ').length,
      ordered: boxes.every(Boolean) && boxes[0].right <= boxes[1].left && boxes[1].right <= boxes[2].left,
      plot: !!plot.closest('.strip') && !plot.closest('#stage'), height: plot.getBoundingClientRect().height,
      panels: visible(document.querySelector('.col.side #readouts')) && visible(document.querySelector('.col.side #evidence')) };
  });
  check('layout: exact shared three-column app.lab, side panels and plot strip', layout.grid === 'grid' && layout.columns === 3 && layout.ordered
    && layout.plot && layout.height >= 54 && layout.panels, JSON.stringify(layout));
  for (const id of REQUIRED_CARDS) {
    check(`contract: preset ${id} has one bilingual button`, await page.locator(`button[data-preset="${id}"]`).evaluateAll(els => els.length === 1
      && ['zh', 'en'].every(lang => els[0].querySelector(`.cn.${lang}`)?.textContent.trim())));
  }
  for (const [selector, min, max, step, values] of [
    ['#arcScale', 0.2, 1.4, 0.01, [0.2, 0.52, 1, 1.4]],
    ['#phaseGradient', -1, 1, 0.05, [-1, -0.55, 0, 0.55, 1]],
    ['#now', 0, 1, null, [0, 0.5, 0.75, 1]]
  ]) {
    const control = await page.locator(selector).evaluateAll(els => els.map(el => ({ type: el.type, min: Number(el.min), max: Number(el.max), step: el.step === 'any' ? null : Number(el.step || 1) })));
    check(`contract: ${selector} has its declared range and step`, control.length === 1 && control[0].type === 'range'
      && control[0].min === min && control[0].max === max && control[0].step === step
      && values.every(v => v >= control[0].min && v <= control[0].max && (control[0].step === null || near((v - control[0].min) / control[0].step, Math.round((v - control[0].min) / control[0].step), 1e-8))), JSON.stringify(control));
  }
  check('contract: subdivision chips match the five supported counts', same(await page.$$eval('#stepCount button[data-steps]', els => els.map(el => Number(el.dataset.steps))), STEP_COUNTS));
  check('contract: scaling chips expose both implemented modes', same(await page.$$eval('#scalingMode button[data-mode]', els => els.map(el => el.dataset.mode)), ['feynman-ito', 'newton-smooth']));
  check('contract: the arc endpoint is the stage drag handle', await page.locator('#stage button#arcHandle.arc-handle').count() === 1);
  checkMath(await state(), 'initial state');
});

await section('available presets and mathematics', async () => {
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`); await settle(page);
    check(`language ${lang}: document and pressed control agree`, await page.evaluate(l => document.documentElement.lang.startsWith(l)
      && document.querySelector(`[data-lang-set="${l}"]`).getAttribute('aria-pressed') === 'true', lang));
    for (const card of Object.keys(CARDS)) { await pick(card); checkPreset(await state(), card, `${lang}/${card}`); }
  }
  // 两个标度各扫所有可操作段数与轨道尺度，全部通过真实控件输入。
  const stepValues = await page.$$eval('#stepCount [data-steps]', els => els.map(el => Number(el.dataset.steps)));
  check('available subdivision controls retain the declared values', same(stepValues, STEP_COUNTS));
  for (const card of Object.keys(CARDS)) {
    await pick(card);
    for (const mode of ['feynman-ito', 'newton-smooth']) {
      await page.click(`#scalingMode [data-mode="${mode}"]`); await settle(page);
      for (const theta of [0.2, 0.52, 1, 1.4]) {
        await input('#arcScale', theta);
        const rows = [];
        for (const n of stepValues) {
          await page.click(`#stepCount [data-steps="${n}"]`); await settle(page);
          const s = await state(), tag = `${card}/${mode}/Θ=${theta}/N=${n}`;
          check(`${tag}: controls reach free exploration`, s.stepCount === n && s.arcScale === theta && s.scalingMode === mode && s.preset === null);
          checkMath(s, tag, n === 64);
          rows.push(s);
        }
        const last = rows.at(-1), target = theta ** 2 / 2;
        check(`${card}/${mode}/Θ=${theta}: cumulative sagitta has the correct limit and rate`, rows.slice(1).every((s, i) => mode === 'feynman-ito'
          ? s.cumulativeSagitta > rows[i].cumulativeSagitta && s.cumulativeSagitta < target
          : s.cumulativeSagitta < rows[i].cumulativeSagitta)
          && (mode === 'feynman-ito' ? Math.abs(last.cumulativeSagitta - target) <= theta ** 4 / (24 * last.stepCount) + 1e-12
            : Math.abs(last.stepCount * last.cumulativeSagitta - target) <= theta ** 4 / (24 * last.stepCount ** 2) + 1e-10));
        check(`${card}/${mode}/Θ=${theta}: angular quadratic variation distinguishes the deterministic chains`, rows.every(s => near(s.stepCount * s.stepEps ** 2 / theta ** 2,
          mode === 'feynman-ito' ? 1 : 1 / s.stepCount)));
      }
    }
  }
  await pick('force-from-phase-gradient');
  const steering = [];
  for (const beta of [-1, -0.55, 0, 0.55, 1]) {
    await input('#phaseGradient', beta); const s = await state();
    check(`steering β=${beta}: actual slider updates state`, s.phaseGradient === beta && s.preset === null);
    checkBundle(s, `steering β=${beta}`); steering.push(s);
  }
  check('steering reversal preserves amplitude and reverses signed curvature and flux', [0, 1].every(i => near(steering[i].bundleAmplitude, steering[4 - i].bundleAmplitude)
    && near(steering[i].stationaryEta, -steering[4 - i].stationaryEta, 1e-7)
    && near(steering[i].stationarySpineCurvature, -steering[4 - i].stationarySpineCurvature, 1e-5)
    && near(steering[i].spineFlux, -steering[4 - i].spineFlux, 1e-7)));
});

await section('pointer, orbit, wheel, transport and drawer', async () => {
  await pick('arc-sagitta-ito'); await input('#now', 0.5);
  await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
  const target = theta => page.evaluate(th => {
    const q = window.TRV.solids[0].p([Math.sin(th / 2), 0, Math.cos(th / 2)]), stage = document.querySelector('#stage'), r = stage.getBoundingClientRect();
    return [r.left + stage.clientLeft + q[0], r.top + stage.clientTop + q[1]];
  }, theta);
  for (const theta of [0.55, 1.25]) {
    const before = await state(), image = await picture(), box = await page.locator('#arcHandle').boundingBox();
    check(`handle Θ=${theta}: visible drag target`, !!box);
    if (!box) continue;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.down();
    check(`handle Θ=${theta}: pointerdown enters dragging`, await page.locator('#arcHandle').evaluate(el => el.classList.contains('dragging')));
    const xy = await target(theta); await page.mouse.move(...xy, { steps: 8 }); await page.mouse.up(); await settle(page);
    const s = await state();
    check(`handle Θ=${theta}: changes the parameter and drawing without orbiting`, near(s.arcScale, theta, 0.011) && s.preset === null
      && same(s.camera, before.camera) && await picture() !== image);
    await page.mouse.move(xy[0] + 25, xy[1] + 20); await settle(page);
    check(`handle Θ=${theta}: release clears dragging and later motion does nothing`, (await state()).arcScale === s.arcScale
      && !(await page.locator('#arcHandle').evaluate(el => el.classList.contains('dragging'))));
    checkMath(s, `handle Θ=${theta}`);
  }
  async function pointer(type, theta, id) {
    const xy = await target(theta);
    await page.locator('#arcHandle').evaluate((el, args) => el.dispatchEvent(new PointerEvent(args.type, {
      bubbles: true, cancelable: true, pointerId: args.id, pointerType: 'mouse', isPrimary: true, button: 0,
      buttons: /down|move/.test(args.type) ? 1 : 0, clientX: args.xy[0], clientY: args.xy[1]
    })), { type, xy, id }); await settle(page);
  }
  for (const [i, end] of ['pointercancel', 'lostpointercapture'].entries()) {
    const id = 301 + 2 * i;
    await pointer('pointerdown', 0.8, id); const before = await state();
    await pointer('pointermove', 0.45, id + 20);
    check(`${end}: ignores a different pointer`, (await state()).arcScale === before.arcScale);
    await pointer('pointermove', 0.8, id);
    check(`${end}: setup actually changes Θ`, near((await state()).arcScale, 0.8, 0.011));
    await pointer(end, 0.8, id); const released = await state();
    await pointer('pointermove', 0.45, id);
    check(`${end}: clears dragging and ignores stale movement`, (await state()).arcScale === released.arcScale
      && !(await page.locator('#arcHandle').evaluate(el => el.classList.contains('dragging'))));
    await pointer('pointerdown', 0.8, id + 1); await pointer('pointermove', 1.1, id + 1); await pointer('pointerup', 1.1, id + 1);
    check(`${end}: accepts a new pointer afterwards`, near((await state()).arcScale, 1.1, 0.011));
  }
  await pick('arc-sagitta-ito'); await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
  const before = await state(), image = await picture(), box = await page.locator('#stage').boundingBox();
  await page.mouse.move(box.x + box.width * 0.08, box.y + box.height * 0.65); await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.28, box.y + box.height * 0.5, { steps: 8 }); await page.mouse.up(); await settle(page);
  const turned = await state();
  check('canvas orbit changes the camera and drawing while preserving the mathematics', !same(before.camera, turned.camera)
    && before.arcScale === turned.arcScale && before.stepCount === turned.stepCount && before.camera.zoom === turned.camera.zoom && image !== await picture());
  checkMath(turned, 'orbit');
  const wheel = await page.evaluate(() => {
    const before = window.ARC_MACRO_DEBUG.state.camera, original = Event.prototype.preventDefault; let calls = 0;
    Event.prototype.preventDefault = function (...args) { if (this.type === 'wheel') calls++; return original.apply(this, args); };
    try {
      const events = [...document.querySelectorAll('#stage canvas')].map(el => {
        const ev = new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: 180 });
        return { allowed: el.dispatchEvent(ev), cancelled: ev.defaultPrevented };
      });
      return { before, after: window.ARC_MACRO_DEBUG.state.camera, calls, events };
    } finally { Event.prototype.preventDefault = original; }
  });
  check('wheel false: every canvas passes wheel without cancelling or zooming', wheel.calls === 0 && wheel.events.length > 0
    && wheel.events.every(e => e.allowed && !e.cancelled) && same(wheel.before, wheel.after), JSON.stringify(wheel));
  await page.click('#rew'); await settle(page);
  check('rewind resets and pauses the clock', (await state()).t === 0 && !(await state()).playing);
  check('play advances under ordinary and slow frames', await playsAfter(page, () => page.click('#play'), () => window.ARC_MACRO_DEBUG.state));
  await page.click('#play'); await settle(page); const paused = await state(); await settle(page);
  check('pause holds the rail stationary', !paused.playing && (await state()).t === paused.t);
  for (const speed of [0.5, 2, 1]) {
    await page.click(`[data-speed="${speed}"]`); await settle(page);
    check(`speed ${speed}: button is pressed`, await page.locator(`[data-speed="${speed}"]`).getAttribute('aria-pressed') === 'true');
  }
  await input('#now', 0.75); check('rail slider sets progress and spinor angle', near((await state()).t, 0.75) && near((await state()).spinorAngle, 3 * Math.PI));
  await page.keyboard.press('n'); await settle(page);
  check('N keyboard shortcut cycles subdivisions', (await state()).stepCount === 256 && (await state()).preset === null);
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`); await settle(page); await page.click('#infoBtn');
    check(`drawer ${lang}: info button opens the dialog`, await page.locator('#drawer').isVisible() && await page.locator('#drawer [role=dialog]').isVisible());
    if (lang === 'en') check('drawer English: zero Chinese leftovers', (await cjkLeftovers(page)).length === 0);
    await page.keyboard.press('Escape'); check(`drawer ${lang}: Escape closes`, !(await page.locator('#drawer').isVisible()));
    await page.click('#infoBtn'); await page.click('#drawerClose'); check(`drawer ${lang}: close button closes`, !(await page.locator('#drawer').isVisible()));
  }
  await auditPalette(page, 'main interactions');
});

// 深浅系统偏好 × 中英 × 桌面、短屏、手机、书内与窄引用框；每张现有卡都检查。
for (const scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, embed, figure] of [
  [1440, 900, false, false], [1081, 500, false, false], [390, 844, false, false],
  [740, 620, true, false], [740, 500, true, true], [334, 520, true, true]
]) await section(`${scheme}/${lang}/${width}x${height}`, async () => {
  nextScheme = scheme;
  const p = await T.open(BOOK, ID, `?lang=${lang}${embed ? '&embed=1' : ''}${figure ? '&preset=arc-sagitta-ito' : ''}`, {
    viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce'
  });
  try {
    await settle(p);
    const tag = `${scheme}/${lang}/${width}x${height}/${figure ? 'figure' : embed ? 'embed' : 'lab'}`;
    check(`${tag}: requested system color scheme is active`, await p.evaluate(s => matchMedia(`(prefers-color-scheme: ${s})`).matches, scheme));
    await checkLinks(p, tag);
    // 在任何选卡操作前见证初次可见启动；后续播放不再能冒充这个一次性回调。
    if (embed) {
      await p.locator('#stage').scrollIntoViewIfNeeded();
      if (!await until(p, () => window.ARC_MACRO_DEBUG.state.playing)) throw new Error(`${tag}: initial autoplay did not start`);
      await pause(p);
    }
    // 导览条只在书内显示；在真正可见的入口测试前进和返回。
    if (embed) {
      await p.click('[data-tour="next"]'); await settle(p); await pause(p);
      check(`${tag}: tour next selects the next card`, (await state(p)).preset === 'quantum-three-hallmarks');
      await p.click('[data-tour="prev"]'); await settle(p); await pause(p);
      check(`${tag}: tour previous returns to the first card`, (await state(p)).preset === 'arc-sagitta-ito');
    }
    for (const [i, card] of Object.keys(CARDS).entries()) {
      if (embed) { if (i) { await p.click('[data-tour="next"]'); await settle(p); } await pause(p); }
      else await pick(card, p);
      await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
      await pause(p);
      const s = await state(p), view = await stageView(p, '#stage', figure), overlaps = await labelOverlaps(p), strict = await strictLabels(p);
      checkPreset(s, card, `${tag}/${card}`);
      check(`${tag}/${card}: zero clipped labels or label/HUD overlaps`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && strict.bad.length === 0,
        [...view.layout, ...view.hud, ...overlaps, ...strict.bad].join(' | '));
      check(`${tag}/${card}: at least one visible geometric label`, strict.count > 0);
      check(`${tag}/${card}: zero overflowX`, await overflowX(p) === 0);
      if (lang === 'en') check(`${tag}/${card}: zero cjkLeftovers`, (await cjkLeftovers(p)).length === 0);
      await auditPalette(p, `${tag}/${card}`);
    }
    if (!embed && width === 390) {
      await p.locator('#stage').scrollIntoViewIfNeeded(); await settle(p);
      const before = await p.evaluate(() => ({ y: scrollY, camera: window.ARC_MACRO_DEBUG.state.camera })), b = await p.locator('#stage').boundingBox();
      await p.mouse.move(b.x + b.width / 2, Math.max(10, Math.min(height - 10, b.y + b.height / 2))); await p.mouse.wheel(0, 180);
      check(`${tag}: trusted wheel scrolls the host page`, await until(p, y => scrollY > y, before.y));
      check(`${tag}: trusted wheel preserves the camera`, same((await state(p)).camera, before.camera));
    }
  } finally { await auditPalette(p, `${scheme}/${lang}/${width}x${height}/closing`); await p.context().close(); }
});
nextScheme = 'dark';
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) await section(`still ${lang}/${card}`, async () => {
  const p = await openStill(T, BOOK, ID, card, lang);
  try {
    const s = await state(p); checkPreset(s, card, `still ${lang}/${card}`);
    check(`still ${lang}/${card}: declared time and hidden drag handle`, s.t === CARDS[card].still && !(await p.locator('#arcHandle').isVisible()));
    await auditPalette(p, `still ${lang}/${card}`);
  } finally { await p.context().close(); }
});

check('palette observers cover both dark and light browser contexts', contexts.size > 2 && schemes.has('dark') && schemes.has('light'));
await auditPalette(page, 'final page');
check('zero data-tr-palette mutations across every context', paletteMutations.length === 0, JSON.stringify(paletteMutations));
check('zero browser console warnings across every context', consoleWarnings.length === 0,
  `${consoleWarnings.length} warnings; ${consoleWarnings.slice(0, 5).join(' | ')}`);
check('zero page, console or request errors', T.errors.length === 0, T.errors.join(' | '));
check('zero browser quality warnings', T.warnings.length === 0, T.warnings.map(w => `${w.name}: ${w.detail}`).join(' | '));
await T.finish();
