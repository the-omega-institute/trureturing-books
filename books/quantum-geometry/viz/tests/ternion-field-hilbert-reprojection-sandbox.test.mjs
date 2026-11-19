// TERNION//HILBERT · browser controls, embedded figures and independent dimension/algebra checks.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until, openStill, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'ternion-field-hilbert-reprojection-sandbox';
const THEORY = 'ch39-s20-ternion-field-composition-and-hilbert-reprojection.html#sec-ch39-ternion-field-composition-and-hilbert-reprojection';
const GIDS = [
  "D5/S3/Quantum/Entanglement/LocalMarginalCorrelationBlindSpot.local_marginal_correlation_blind_spot",
  "D5/S3/Observer/Tomography/FiniteStageExpansion.finite_stage_expansion",
  "D5/S3/Observer/Tomography/FiniteRankConcentrationModeBound.finite_rank_concentration_mode_bound",
  "D5/S3/Quantum/Completion/UniformCompletionObstruction.uniform_completion_obstruction",
  "D5/S3/Quantum/Codes/StabilizerGenuineEntanglementCommutationRank.pauli_word_mul",
  "D5/S3/Quantum/TensorNetworks/OpenBoundaryMPSDensityRecovery.observable_chart_phase_recovery",
  "D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut",
  "D5/S3/Fourier/CharacterSelection/SimplexTwoCochainRepair.tetra_defects_incidence_repair_and_exactness"
];
const presets = [
  ['native-ternion-curl-field', 1, 0.85, 2, 'split', true, 4],
  ['spin4-chiral-spacetime-bivector', 2, 0.9, 2, 'split', true, 10],
  ['fano-seven-field-octonion-weave', 3, 1, 4, 'ontology', true, 8],
  ['sedenion-zero-divisor-bankruptcy', 4, 1, 4, 'ledger', false, 16],
  ['many-body-3n-to-2n-hilbert-pillars', 6, 1, 2, 'split', true, 64]
];
const read = (file) => fs.readFileSync(new URL(file, import.meta.url), 'utf8');
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b) => Math.abs(a - b) < 1e-9;
const T = await session();
const { page, check } = T;
const warnings = [];
// Observe popup and embed contexts from their first navigation.
function observe(context) {
  const listen = (p) => p.on('console', (m) => {
    if (m.type() !== 'warning') return;
    // The shared solid gate probes pixels on a software GL context. Its renderer can report
    // missing parallel shader compilation and synchronous pixel readback, even on a blank scene.
    const diagnostic = m.text();
    if (/^THREE\.WebGLRenderer: KHR_parallel_shader_compile extension not supported\.$/.test(diagnostic)) return;
    if (/^\[\.WebGL-[^\]]+\]GL Driver Message .*GPU stall due to ReadPixels(?: \(this message will no longer repeat\))?$/.test(diagnostic)) return;
    warnings.push(diagnostic);
  });
  context.on('page', listen);
  context.pages().forEach(listen);
}
observe(T.context);
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = async (options) => {
  const context = await newContext(options);
  observe(context);
  return context;
};

await stageFirstChecks(T, BOOK, ID, { solid: true });

const registry = JSON.parse(read('../visualizations.json')).visualizations.find((r) => r.id === ID);
check('standalone bilingual registry and theory links', registry.chapter === 32 && registry.section === '32.3'
  && registry.code === 'TERNION//HILBERT' && registry.status === 'live'
  && registry.theory[0].href === '../zh/' + THEORY && registry.theory[0].href_en === '../en/' + THEORY
  && equal(registry.presets, presets.map(([id]) => id))
  && registry.presets.every((id) => registry.preset_titles[id].zh && registry.preset_titles[id].en)
  && equal(registry.lean.map((x) => x.gid).sort(), [...GIDS].sort()));
for (const lang of ['zh', 'en']) {
  const [file, anchor] = THEORY.split('#');
  check(lang + ' chapter has the registered anchor', read('../../' + lang + '/' + file.replace('.html', '.md')).includes('{#' + anchor + '}'));
}
const sources = ['index.html', 'main.js', 'style.css'].map((f) => read('../' + ID + '/' + f));
const words = [[103,112,116],[99,108,97,117,100,101],[97,110,116,104,114,111,112,105,99],[111,112,101,110,97,105],
  [103,101,109,105,110,105],[99,111,100,101,120],[99,111,112,105,108,111,116],[111,112,117,115],[115,111,110,110,101,116],
  [104,97,105,107,117],[108,108,109],[97,103,101,110,116],[97,115,115,105,115,116,97,110,116],[99,104,97,116,98,111,116],
  [100,101,101,112,109,105,110,100],[65,73]].map((codes) => String.fromCharCode(...codes));
const forbidden = new RegExp('\\b(?:' + words.join('|') + ')(?:-?\\d+)?\\b', 'i');
check('sources, entry and suite meet the publication naming contract',
  [...sources, JSON.stringify(registry), read(import.meta.url)].every((s) => !forbidden.test(s)));
check('only token colours in authored styles and rendering code',
  sources.slice(1).every((s) => !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(s)));
check('neutral model badge and ink slider readouts',
  sources[2].includes('.lean.model { border-color: color-mix(in srgb, var(--ink) 32%, transparent); }')
  && sources[2].includes('.lean.model .ok { color: var(--ink); }') && sources[2].includes('.field output { color: var(--ink); }'));
check('only shared scripts plus the page implementation', equal([...sources[0].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]),
  ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('green and red reserved for evidence', !/P\.(?:ok|warn|red|green)\b|var\(--(?:ok|warn|green|red)\)|okmark/.test(sources.join('\n')));

await T.goto(BOOK, ID, '?lang=en');
await settle(page);
const state = (p = page) => p.evaluate(() => window.TERNION_HILBERT.state);
const initial = await state();
check('fresh entry opens six fields above 64 basis slots, parked on its still frame',
  initial.preset === presets[4][0] && initial.upperCount === 6 && initial.pillarValues.length === 64
  && !initial.play && near(initial.tau, 0.45) && !initial.blending);
check('three-column lab shell, status pills, panel badges, tagline, fonts and evidence spans', await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
  return !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill')
    && !!q('.app.lab > header.top .status .langs')
    && !!q('aside#rail.col.deck #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #camChips')
    && !!q('#rail #ctlPanel #fieldN') && !q('aside.col.side #ctlPanel')
    && !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig')
    && !q('aside#evidence') && !!q('aside.col.side > section.panel.sec#evidence')
    && q('#evidence').firstElementChild.id === 'infoBtn' && !!q('aside.col.side > #readouts')
    && getComputedStyle(q('#stage')).containerType === 'inline-size'
    && ['§32.3', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x))
    && [...document.querySelectorAll('.tagline > span')].every((el) => el.querySelector('em') && el.firstChild.nodeType === 3)
    && !!q('link[href*="fonts.googleapis.com/css2?family=Chakra+Petch"]')
    && document.querySelectorAll('#readouts dl.ro > div').length === 7 && document.querySelectorAll('#readouts dl.ro > div.key').length === 1
    && [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN'))
    && [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelector('ol li b') && el.querySelector('p.lede.refs a'));
}));
check('green LEAN ✓ boxes keep the shared green border', await page.evaluate(() => {
  const probe = document.createElement('span');
  probe.style.color = 'var(--ok)';
  document.body.appendChild(probe);
  const ok = getComputedStyle(probe).color;
  probe.remove();
  const boxes = [...document.querySelectorAll('#evidence .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen)')];
  return boxes.length === 8 && boxes.every((b) => getComputedStyle(b.querySelector('.ok')).color === ok
    && getComputedStyle(b).borderLeftColor !== getComputedStyle(document.querySelector('#evidence .lean.model')).borderLeftColor);
}));
check('HUD title, sub line and status pills name the scene and its pillars', await page.evaluate(() =>
  document.querySelector('#hudBig').textContent.includes('64') && document.querySelector('#hudSub').textContent.includes('4,077')
  && document.querySelector('#keyPill strong').textContent === '64' && document.querySelector('#scenePill strong').textContent.length > 0
  && document.querySelector('#roKey').textContent === '64'));
check('a card click lifts the pillars with a transition instead of a hard cut', await page.evaluate(() => {
  document.querySelector('[data-preset="native-ternion-curl-field"]').click();
  const s = window.TERNION_HILBERT.state;
  return s.blending && s.grow < 1 && s.pillarValues.length === 4;
}));
await settle(page);
check('the transition ends with full pillars', await until(page, () => !window.TERNION_HILBERT.state.blending && window.TERNION_HILBERT.state.grow === 1));
check('stage, strip, controls and evidence occupy their intended regions', await page.evaluate(() =>
  !!document.querySelector('.app.lab #rail .lens-toggle') && !!document.querySelector('#stage .handle')
  && !!document.querySelector('.center > .strip canvas') && !document.querySelector('#stage .strip')
  && !!document.querySelector('#evidence #infoBtn') && document.querySelectorAll('#evidence .lean [data-lean-gid]').length === 8
  && ['argued', 'open', 'num', 'model'].every((c) => document.querySelector('#evidence .lean.' + c))));
check('open links and bilingual chapter navigation', await page.evaluate((theory) => ['zh', 'en'].every((lang) =>
  ['ch38-s07-blindspot-and-relativization.html#prob-ch38-unrelativized-p-vs-np-and-independence',
    'ch39-s11-af-gut-arc-field-grand-unification.html#prob-ch39-af-gut-threshold-and-proton-stability'].every((link) =>
      document.querySelector('.lean.open a[href="../../' + lang + '/' + link + '"]'))
  && document.querySelector('#drawer a[href="../../' + lang + '/' + theory + '"]')), THEORY));
for (const lang of ['zh', 'en']) {
  const badgeText = (selector) => page.locator('#evidence ' + selector + ' .' + lang).textContent();
  const stages = await badgeText('[class="lean"]:has([data-lean-gid$=".finite_stage_expansion"])');
  const sectors = await badgeText('[class="lean"]:has([data-lean-gid$=".local_marginal_correlation_blind_spot"])');
  const numeric = await badgeText('.lean.num');
  check(lang + ' closed stages and shells in the complete real inner-product space', lang === 'zh'
    ? stages.includes('完备实内积空间') && stages.includes('闭子空间序列')
    : /complete real inner[- ]product space/i.test(stages) && stages.includes('closed subspaces'));
  const dimensions = sectors.replace(/\s+/g, '');
  check(lang + ' general sector split and two-qubit marginal witness',
    dimensions.includes('m,n≥1') && dimensions.includes('mn>1') && dimensions.includes('m=n=2')
    && sectors.includes('bellDensity') && sectors.includes('classicalCorrelatedDensity'));
  check(lang + ' per-frame pillar scaling and unscaled live norms and dimensions', lang === 'zh'
    ? /本帧|当前帧/.test(numeric) && /最大/.test(numeric) && /未经缩放|未缩放/.test(numeric) && /范数与维数/.test(numeric)
    : /largest|maximum/.test(numeric) && numeric.includes('current frame') && /unscaled norms and dimensions/.test(numeric));
}

async function input(id, value) {
  await page.locator('#' + id).evaluate((el, v) => { el.value = v; el.dispatchEvent(new Event('input', { bubbles: true })); }, String(value));
  await settle(page);
}
async function select(id) {
  await page.locator('[data-preset="' + id + '"]').click();
  await settle(page);
}
async function pause() {
  await page.locator('#play').evaluate((el) => { if (el.getAttribute('aria-pressed') === 'true') el.click(); });
  await settle(page);
}

// A left-canonical chart sums the complex dimensions of Grassmann charts, then closes the last bond.
function rayDimension(n, cap) {
  let previous = 1, total = 0;
  for (let k = 1; k < n; k++) {
    const rank = Math.min(cap, 2 ** Math.min(k, n - k));
    total += rank * (2 * previous - rank);
    previous = rank;
  }
  return 2 * (total + 2 * previous - 1);
}
// Count words by adjoining a single site to each word of a given weight.
function multiSite(n) {
  let weights = [1];
  for (let k = 0; k < n; k++) weights = Array.from({ length: weights.length + 1 }, (_, i) => (weights[i] || 0) + 3 * (weights[i - 1] || 0));
  return weights.slice(2).reduce((a, b) => a + b, 0);
}
for (const [id, n, lambda, chi, cam, play, pillars] of presets) {
  await select(id);
  const s = await state();
  check(id + ' restores parameters, view, playback and ledger', s.preset === id && s.N === n && near(s.lambda, lambda)
    && s.chi === chi && s.cam === cam && s.play === play && s.pillarValues.length === pillars, JSON.stringify(s).slice(0, 240));
  await pause();
  const before = await state();
  await page.click('#lensToggleBtn');
  await settle(page);
  const after = await state();
  check(id + ' changes reading while preserving coefficients', before.lens !== after.lens && equal(before.pillarValues, after.pillarValues)
    && before.N === after.N && after.lambda === before.lambda);
  check(id + ' English algebra lens translates every control', !(await cjkLeftovers(page)).length);
  await page.click('#lensToggleBtn');
  const still = await openStill(T, BOOK, ID, id, 'en');
  const frame = await state(still);
  check(id + ' has a stationary declared print frame', !frame.play && frame.pillarValues.length === pillars
    && near(frame.tau, Number(await still.locator('[data-preset="' + id + '"]').getAttribute('data-still')))
    && !(await still.locator('.handle').isVisible()));
  check(id + ' keeps the full base in the print frame', await still.evaluate(() => {
    const sc = TRV.solids[0];
    return [-1.28, 1.28].every(x => [-.825, .825].every(y => {
      const [px,py] = sc.p([x,y,-1.075]);
      return px >= 6 && px <= sc.W - 6 && py >= 6 && py <= sc.H - 6;
    }));
  }));
  await still.context().close();
}
await select(presets[0][0]);
await pause();
for (const t of [0, 0.25, 0.7, 1]) {
  await input('now', t);
  const q = (await state()).pillarValues;
  check('unit quaternion at phase ' + t, q.length === 4 && near(q.reduce((s, v) => s + v * v, 0), 1));
}

await select(presets[1][0]);
await pause();
await input('now', 0.37);
{
  const values = (await state()).pillarValues;
  const [ex,ey,ez,bx,by,bz] = values.slice(4);
  check('chiral rotation of 1 preserves norm and the decomposable two-form obeys E·B = 0',
    near(Math.hypot(...values.slice(0,4)), 1) && near(ex*bx + ey*by + ez*bz, 0));
}

// Signed entries encode ±(basis index + 1), so the scalar and negative scalar remain distinct.
const table = [
  [1,2,3,4,5,6,7,8], [2,-1,5,8,-3,7,-6,-4], [3,-5,-1,6,2,-4,8,-7], [4,-8,-6,-1,7,3,-5,2],
  [5,3,-2,-7,-1,8,4,-6], [6,-7,4,-3,-8,-1,2,5], [7,6,-8,5,-4,-2,-1,3], [8,4,7,-2,6,-5,-3,-1]
];
const mul = (a, b) => Math.sign(a * b) * table[Math.abs(a) - 1][Math.abs(b) - 1];
function associator(i, j, k) {
  const result = Array(8).fill(0);
  const left = mul(mul(i + 1, j + 1), k + 1), right = mul(i + 1, mul(j + 1, k + 1));
  result[Math.abs(left) - 1] += Math.sign(left);
  result[Math.abs(right) - 1] -= Math.sign(right);
  return result;
}
const triples = [];
for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) for (let k = 0; k < 8; k++) triples.push([i, j, k]);
const observed = await page.evaluate((cases) => cases.map((v) => Array.from(window.TERNION_HILBERT.associator(...v))), triples);
check('all 512 ordered basis associators match signed table multiplication', triples.every((v, i) => equal(observed[i], associator(...v))));
const triangles = triples.filter(([i, j, k]) => 0 < i && i < j && j < k);
check('seven lines close and 28 off-line triples have norm two', triangles.filter((v) => Math.hypot(...associator(...v)) === 2).length === 28
  && triangles.filter((v) => Math.hypot(...associator(...v)) === 0).length === 7 && associator(1, 2, 3)[6] === -2);
await select(presets[2][0]);
await pause();
const cases = page.locator('#caseChips button');
check('Fano line and off-line triangle are selectable', await cases.count() >= 2);
if (await cases.count() >= 2) {
  await cases.nth(0).click(); await settle(page);
  const line = await page.locator('#roAlgebra').innerText();
  await cases.nth(1).click(); await settle(page);
  check('changing Fano incidence changes the associator readout', line !== await page.locator('#roAlgebra').innerText());
}
await select(presets[3][0]);
check('three independent zero-divisor examples available', await cases.count() === 3);
// Each factor has a single signed basis entry in each octonion half. Expand
// the four products separately so a wrong sign cannot pass as an empty sum.
const pairs = [
  { u: [1,10], v: [3,14] },
  { u: [1,11], v: [2,-14] },
  { u: [1,12], v: [3,13] }
];
function expandPair({ u, v }) {
  const a = u[0] + 1, b = u[1] - 7, c = v[0] + 1;
  const d = Math.sign(v[1]) * (Math.abs(v[1]) - 7);
  const coefficients = Array(16).fill(0);
  const halves = [[mul(a, c), -mul(-d, b)], [mul(d, a), mul(b, -c)]];
  for (const [half, terms] of halves.entries()) {
    for (const term of terms) coefficients[8 * half + Math.abs(term) - 1] += Math.sign(term);
  }
  return coefficients;
}
for (let i = 0; i < await cases.count(); i++) {
  await cases.nth(i).click(); await settle(page);
  const out = (await state()).pillarValues;
  check('pair ' + (i + 1) + ' cancels in each coefficient', equal(out, expandPair(pairs[i])) && out.every((x) => x === 0));
}
await select(presets[4][0]);
await pause();
for (const n of [1,2,3,4,5,6,7,8]) {
  await input('fieldN', n);
  for (let index = 0; index < 5; index++) {
    await input('bondChi', index);
    const s = await state();
    check('Hilbert and gauge-fixed MPS dimensions N=' + n + ', χ=' + 2 ** index, s.N === n && s.upperCount === n
      && s.pillarValues.length === 2 ** n && s.chi === 2 ** index && s.mpsCount === rayDimension(n, s.chi)
      && s.excessCount === multiSite(n) && Number((await page.locator('#roKey').innerText()).replaceAll(',', '')) === 2 ** n);
  }
}
const long = await page.evaluate(() => [1,2,4,8,16].map((chi) => window.TERNION_HILBERT.mpsCount(300, chi)));
check('300-qubit endpoints agree with independent Grassmann chart counts', equal(long, [1,2,4,8,16].map((chi) => rayDimension(300, chi)))
  && long.at(-1) === 150014 && (300 * Math.log10(2)).toFixed(2) === '90.31' && (300 * Math.log10(4)).toFixed(2) === '180.62');
// Inspect geometry and plot calls in one synchronous paint. This catches a correct readout
// paired with a truncated mesh, missing curve or misplaced cursor.
async function sampleDrawing() {
  return page.evaluate(() => {
    const stage = TRV.solids[0], kit = TRV.kit, poly = stage.poly, surface = stage.surface, plot = kit.plot;
    const trace = { bodies: [], slots: 0, pillars: 0, lines: [], cursor: null };
    stage.poly = function(key, mesh, style) {
      if (key === 'slots' || key === 'pillars') trace[key] = mesh.vertices.length / 8;
      return poly.call(this, key, mesh, style);
    };
    stage.surface = function(key, ...args) {
      if (key.startsWith('cap')) trace.bodies.push(key);
      return surface.call(this, key, ...args);
    };
    kit.plot = function(canvas, options) {
      const g = plot(canvas, options), line = g.line, vline = g.vline;
      g.line = (points, colour, style) => {
        trace.lines.push({ points, colour, dashed: !!style.dash?.length });
        return line(points, colour, style);
      };
      g.vline = (n, colour, style) => { trace.cursor = { n, colour }; return vline(n, colour, style); };
      return g;
    };
    try {
      window.TRV_THUMB();
      return { ...trace, colors: ['cyan','violet','magenta','amber'].map((role) => TRV.palette[role]) };
    } finally { stage.poly = poly; stage.surface = surface; kit.plot = plot; }
  });
}
const drawing = await sampleDrawing();
check('eight rendered upper solids and 256 separate lit pillars', drawing.bodies.length === 8 && drawing.slots === 256 && drawing.pillars === 256);
check('all four strip curves use the correct tokens, scale and endpoints', drawing.lines.length === 4
  && drawing.lines.every(({points,colour,dashed}, i) => colour === drawing.colors[Math.min(i,2)] && dashed === (i === 2)
    && points.length === 300 && points.every(([n,y], j) => j + 1 === n && near(y, Math.log10([3*n,rayDimension(n,16),2**n,4**n-1][i]))))
  && drawing.cursor?.n === 8 && drawing.cursor.colour === drawing.colors[3]);
await input('flatLambda', 0);
const flattened = await sampleDrawing();
check('zero flattening lowers every amplitude while retaining every basis slot', flattened.pillars === 0 && flattened.slots === 256);
await input('fieldN', 6);
await input('flatLambda', 0.5);
for (const cam of ['ontology','ledger','split']) {
  await page.click('[data-cam="' + cam + '"]'); await settle(page);
  check('camera chip ' + cam + ' selects its view', (await state()).cam === cam);
}
const handle = page.locator('#lambdaHandle');
async function point() {
  const r = await handle.boundingBox();
  return [r.x + r.width / 2, r.y + r.height / 2];
}
await input('flatLambda', 0); const start = await point();
await input('flatLambda', 1); const end = await point();
check('slider moves projected aperture handle', Math.hypot(end[0] - start[0], end[1] - start[1]) > 12);
const camera = () => page.evaluate(() => ({ ...TRV.solids[0].cam }));
const beforeCam = await camera();
await page.mouse.move(...end); await page.mouse.down();
await page.mouse.move(...start, { steps: 6 }); await page.mouse.up(); await settle(page);
check('projected drag reaches the opposite endpoint without orbiting', (await state()).lambda <= 0.02
  && Number(await page.locator('#flatLambda').inputValue()) <= 0.02 && equal(beforeCam, await camera()));
await select(presets[4][0]);
check('loop advances on sparse frames', await until(page, () => window.TERNION_HILBERT.state.play && window.TERNION_HILBERT.state.tau > 0));
await pause();
await page.locator('#rew').evaluate((el) => el.click()); await settle(page);
check('rewind returns to zero', (await state()).tau === 0);
check('zero application console warnings', warnings.length === 0, [...new Set(warnings)].join(' | '));
check('zero browser errors', T.errors.length === 0, T.errors.join(' | '));
check('zero shared gate warnings', !T.warnings.length, T.warnings.map((w) => w.name).join(' | '));
await T.finish();
