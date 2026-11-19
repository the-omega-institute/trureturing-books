// TERNION//TFT · browser controls, the lit solid, the registry and independent checks of every claim of the page:
// unit quaternions and rotation matrices for ★ and ξ, BigInt fractions for the exact hit, enumeration for the ledger.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until, openStill, cjkLeftovers, solidPixels } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'ternion-field-transformer-sandbox';
const CHAPTER = 'ch39-s22-ternion-field-transformer-and-rational-rotor-dynamics';
const THEORY = CHAPTER + '.html#sec-ch39-ternion-field-transformer-and-rational-rotor-dynamics';
const OPEN = CHAPTER + '.html#prob-ch39-tft-scale-and-seams';
const GIDS = [
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S0/Diagonal/RecursivePageTable.recursive_page_table_walk',
  'D5/S0/Computability/DescriptionComplexity/LookupProgramUpperBound.lookup_program_upper_bound',
  'D5/S3/ObserverMemory/Dynamics/ObservableKrylovPermanentStability.observable_krylov_once_stable_permanently',
  'D5/S3/Quantum/Information/GroupInvariantPsi/ShortestGateHolonomy.shortest_gate_triangle_holonomy',
  'D5/S3/Quantum/TensorNetworks/BridgeGraph/QuantumMaxFlowBound.QMaxFlow_le_QMinCut',
  'D5/S3/Quantum/Matrix/SchurMinimum.schur_quadratic_is_least',
  'D5/S3/Quantum/SpinFactor/OriginalClassification.complete_consequences'
];
// id, camera, still
const presets = [
  ['dual-denom-shadow-mrp', 'oblique', 120],
  ['nape-nonabelian-holonomy', 'front', 90],
  ['butterfly-schur-bridge', 'oblique', 30],
  ['born-heap-attention-sinkfree', 'oblique', 180],
  ['fano-lie-triple-curvature-gate', 'oblique', 100]
];
const read = (file) => fs.readFileSync(new URL(file, import.meta.url), 'utf8');
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const near = (a, b, tol = 1e-9) => Math.abs(a - b) < tol;

/* ---------- an independent model: unit quaternions (Hamilton product) and rotation matrices ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const quat = (s) => { const k = dot(s, s); return [(1 - k) / (1 + k), ...s.map((x) => (2 * x) / (1 + k))]; };
const qmul = ([a0, a1, a2, a3], [b0, b1, b2, b3]) => [
  a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3,
  a0 * b1 + a1 * b0 + a2 * b3 - a3 * b2,
  a0 * b2 - a1 * b3 + a2 * b0 + a3 * b1,
  a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0
];
/** The same rotation up to the sign of the quaternion (antipodal seam points are one rotation). */
const qgap = (p, q) => Math.min(norm(p.map((x, i) => x - q[i])), norm(p.map((x, i) => x + q[i])));
/** The rotation matrix of a unit quaternion. */
function matrix([w, x, y, z]) {
  return [
    [1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)],
    [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)],
    [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]
  ];
}
const mmul = (A, B) => A.map((r) => [0, 1, 2].map((j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => [0, 1, 2].map((i) => [0, 1, 2].map((j) => A[j][i]));
const trace = (A) => A[0][0] + A[1][1] + A[2][2];
/** The angle (degrees) of the rotation R₁ᵀR₂ from its trace. */
const relAngle = (A, B) => (Math.acos(Math.max(-1, Math.min(1, (trace(mmul(transpose(A), B)) - 1) / 2))) * 180) / Math.PI;
/** ½ vee(R − Rᵀ) = sin θ û, read off the matrix. */
const sineVector = (R) => [(R[2][1] - R[1][2]) / 2, (R[0][2] - R[2][0]) / 2, (R[1][0] - R[0][1]) / 2];
/** The rotation by θ degrees about a unit axis, as a matrix (Rodrigues). */
function axisAngle(n, deg) {
  const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t), [x, y, z] = n;
  return [
    [c + x * x * (1 - c), x * y * (1 - c) - z * s, x * z * (1 - c) + y * s],
    [y * x * (1 - c) + z * s, c + y * y * (1 - c), y * z * (1 - c) - x * s],
    [z * x * (1 - c) - y * s, z * y * (1 - c) + x * s, c + z * z * (1 - c)]
  ];
}
const matGap = (A, B) => Math.max(...A.flatMap((r, i) => r.map((x, j) => Math.abs(x - B[i][j]))));
const crossV = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

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

await stageFirstChecks(T, BOOK, ID, { solid: { minShare: 0.14, minSpread: 0.055 } });

/* ---------- registry, chapter anchors and publication hygiene ---------- */
const registry = JSON.parse(read('../visualizations.json')).visualizations.find((r) => r.id === ID);
check('bilingual registry entry, theory links and the eight Lean theorems', registry.chapter === 37 && registry.section === '37.1'
  && registry.code === 'TERNION//TFT' && registry.status === 'live' && registry.added === '2026-11-19'
  && registry.theory[0].href === '../zh/' + THEORY && registry.theory[0].href_en === '../en/' + THEORY
  && equal(registry.presets, presets.map(([id]) => id))
  && registry.presets.every((id) => registry.preset_titles[id].zh && registry.preset_titles[id].en)
  && equal(registry.lean.map((x) => x.gid).sort(), [...GIDS].sort()));
for (const lang of ['zh', 'en']) {
  const text = read('../../' + lang + '/' + CHAPTER + '.md');
  check(lang + ' chapter has the theory and open-problem anchors and cites all eight theorems',
    text.includes('{#' + THEORY.split('#')[1] + '}') && text.includes('#' + OPEN.split('#')[1]) && GIDS.every((g) => text.includes(g)));
}
const sources = ['index.html', 'main.js', 'style.css'].map((f) => read('../' + ID + '/' + f));
const words = [[103,112,116],[99,108,97,117,100,101],[97,110,116,104,114,111,112,105,99],[111,112,101,110,97,105],
  [103,101,109,105,110,105],[99,111,100,101,120],[99,111,112,105,108,111,116],[111,112,117,115],[115,111,110,110,101,116],
  [104,97,105,107,117],[100,101,101,112,115,101,101,107],[113,119,101,110],[108,108,97,109,97],[109,105,115,116,114,97,108],
  [100,101,101,112,109,105,110,100],[108,108,109]].map((codes) => String.fromCharCode(...codes));
const forbidden = new RegExp('\\b(?:' + words.join('|') + ')(?:-?\\d+)?\\b', 'i');
check('sources, entry and suite meet the publication naming contract',
  [...sources, JSON.stringify(registry), read(import.meta.url)].every((s) => !forbidden.test(s)));
check('only token colours in authored styles and rendering code',
  sources.slice(1).every((s) => !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(s)) && !/dataset\.trPalette|data-tr-palette/.test(sources.join('\n')));
check('only shared scripts plus the page implementation', equal([...sources[0].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]),
  ['../assets/shell.js', '../assets/kit.js', 'main.js']));
check('green and red reserved for evidence', !/P\.(?:ok|warn|red|green)\b|var\(--(?:ok|warn|green|red)\)|okmark/.test(sources.join('\n')));
check('neutral model badge and ink slider readouts',
  sources[2].includes('.lean.model { border-color: color-mix(in srgb, var(--ink) 32%, transparent); }')
  && sources[2].includes('.lean.model .ok { color: var(--ink); }') && sources[2].includes('.field output { color: var(--ink); }'));

/* ---------- the opening frame, the shell and the evidence ---------- */
await T.goto(BOOK, ID, '?lang=en');
await settle(page);
const state = (p = page) => p.evaluate(() => window.TERNION_TFT_DEBUG.state);
const initial = await state();
check('a fresh page opens on the dual-denominator card, parked on its still frame', initial.preset === presets[0][0]
  && initial.kind === 0 && !initial.play && near(initial.theta, 120) && !initial.blending && initial.cam === 'oblique');
check('the probe exposes state, calc and presets', await page.evaluate(() => {
  const d = window.TERNION_TFT_DEBUG;
  return Object.isFrozen(d) && typeof d.calc.star === 'function' && typeof d.calc.xi === 'function'
    && d.presets.length === 5 && d.presets.every((p) => p.play === true && typeof p.still === 'number');
}));
check('three-column lab shell, status pills, panels, stage contents and drawer', await page.evaluate(() => {
  const q = (s) => document.querySelector(s);
  const asides = [...document.querySelectorAll('.sec h2 .aside')].map((el) => el.textContent.trim());
  return !!q('.app.lab > header.top .status #scenePill') && !!q('.app.lab > header.top .status #keyPill') && !!q('.app.lab > header.top .status .langs')
    && !!q('aside#rail.col.deck #lensPanel .lens-toggle') && !!q('#rail #presets') && !!q('#rail #ctlPanel #camChips') && !!q('#rail #ctlPanel #retractChips')
    && ['fieldLog', 'reserve', 'halt'].every((id) => q('#rail #ctlPanel #' + id))
    && !!q('main.center > #stage > .scan') && !!q('main.center > #stage > .vig') && !!q('#stage > #hudTl #hudBig') && !!q('#stage > button.handle#rotorHandle')
    && !!q('main.center > .strip canvas#plot') && !q('#stage .strip') && !!q('aside.col.side > section.panel.sec#evidence')
    && q('#evidence').firstElementChild.id === 'infoBtn' && !!q('aside.col.side > #readouts') && !q('.status #infoBtn')
    && getComputedStyle(q('#stage')).containerType === 'inline-size'
    && ['§37.1', '5', 'NUM', 'trureturing'].every((x) => asides.includes(x))
    && document.querySelectorAll('#readouts dl.ro > div.key').length === 1 && document.querySelectorAll('#readouts dl.ro > div:not([hidden])').length <= 7
    && [...document.querySelectorAll('#evidence .lean')].every((el) => el.children.length === 2 && [...el.children].every((c) => c.tagName === 'SPAN'))
    && [...document.querySelectorAll('#drawer .sheet > div.zh, #drawer .sheet > div.en')].every((el) => el.querySelector('p.lede') && el.querySelectorAll('ol li b').length === 7 && el.querySelector('p.lede.refs a'));
}));
check('eight green LEAN ✓ boxes keep the shared green, and NUM, MODEL, ARGUED and OPEN boxes are present', await page.evaluate(() => {
  const probe = document.createElement('span');
  probe.style.color = 'var(--ok)';
  document.body.appendChild(probe);
  const ok = getComputedStyle(probe).color;
  probe.remove();
  const boxes = [...document.querySelectorAll('#evidence .lean:not(.num):not(.model):not(.argued):not(.open):not(.frozen)')];
  return boxes.length === 8 && boxes.every((b) => getComputedStyle(b.querySelector('.ok')).color === ok && b.querySelectorAll('[data-lean-gid]').length === 1)
    && ['num', 'model', 'argued', 'open'].every((c) => document.querySelectorAll('#evidence .lean.' + c).length === 1)
    && !document.querySelector('#evidence .lean.frozen');
}));
check('open problem and drawer link into §37.1 in both languages, the drawer says it is not a proof', await page.evaluate(([theory, open]) =>
  ['zh', 'en'].every((lang) => document.querySelector('.lean.open a[href="../../' + lang + '/' + open + '"]')
    && document.querySelector('#drawer a[href="../../' + lang + '/' + theory + '"]'))
  && document.querySelector('#drawer .sheet > div.zh').textContent.includes('不是证明') && document.querySelector('#drawer .sheet > div.en').textContent.includes('not a proof'), [THEORY, OPEN]));
for (const lang of ['zh', 'en']) {
  const box = (gid) => page.locator('#evidence .lean:has([data-lean-gid$="' + gid + '"]) .' + lang).textContent();
  const born = await box('.rank_one_born_pairing_weight'), holo = await box('.shortest_gate_triangle_holonomy'), krylov = await box('.observable_krylov_once_stable_permanently');
  check(lang + ' evidence names the instances the page shows and the ones it does not',
    born.includes('|⟨0|ψ⟩|²') && holo.includes('(e₁, e₃, e₂)') && holo.includes('120°')
    && (lang === 'zh' ? krylov.includes('不由它推出') : krylov.includes('does not follow from it')));
}
const solid = await solidPixels(page);
check('the opening frame keeps an opaque lit body: share ≥ 0.14 and spread ≥ 0.055', solid.share >= 0.14 && solid.spread >= 0.055,
  `share ${solid.share.toFixed(3)}, spread ${solid.spread.toFixed(3)}`);
{
  // turn the camera as the shared gate does and require a clear change of light and shade
  const cam = await page.evaluate(() => ({ ...TRV.solids[0].cam }));
  let best = 0;
  for (const axis of ['yaw', 'pitch']) {
    await page.evaluate((c) => { Object.assign(TRV.solids[0].cam, c); TRV.kit.flush(); }, cam);
    const b = await page.evaluate(() => { const r = TRV.solids[0].el.getBoundingClientRect(); return [r.left, r.top, r.width, r.height]; });
    const x = b[0] + b[2] * 0.08, y = b[1] + b[3] * 0.65;
    await page.mouse.move(x, y); await page.mouse.down();
    for (let k = 1; k <= 6; k++) await page.mouse.move(x + (axis === 'yaw' ? b[2] * 0.05 * k : 0), y - (axis === 'pitch' ? b[3] * 0.05 * k : 0));
    await page.mouse.up(); await settle(page);
    const c = await solidPixels(page);
    best = Math.max(best, c.hist.reduce((s, h, k) => s + Math.abs(h - solid.hist[k]), 0) / 2);
  }
  await page.evaluate((c) => { Object.assign(TRV.solids[0].cam, c); TRV.kit.flush(); }, cam);
  await settle(page);
  check('turning the camera changes the histogram of light and shade by ≥ 0.08', best >= 0.08, best.toFixed(3));
}
check('the shadow of σ_A lies behind the bowl and is hidden, the beads in front are not', await page.evaluate(() => {
  const marks = TRV.solids[0].marks(), by = (k) => marks.find((m) => m.key === k);
  return by('shadowA').hidden && !by('sigmaA').hidden && !by('sigmaB').hidden && !by('product').hidden;
}));

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
const calc = (name, ...args) => page.evaluate(([n, a]) => window.TERNION_TFT_DEBUG.calc[n](...a), [name, args]);

/* ---------- every card: transition, camera, readings, print frame ---------- */
check('a card click grows its paths with a transition instead of a hard cut', await page.evaluate(() => {
  document.querySelector('[data-preset="nape-nonabelian-holonomy"]').click();
  const s = window.TERNION_TFT_DEBUG.state;
  return s.blending && s.grow < 1 && s.kind === 1;
}));
await settle(page);
check('the transition ends with full paths', await until(page, () => !window.TERNION_TFT_DEBUG.state.blending && window.TERNION_TFT_DEBUG.state.grow === 1));
for (const [i, [id, cam, still]] of presets.entries()) {
  await select(id);
  const s = await state();
  check(id + ' selects its card, camera and playback', s.preset === id && s.kind === i && s.cam === cam && s.play === true);
  await pause();
  const before = await state();
  await page.click('#lensToggleBtn');
  await settle(page);
  const after = await state();
  check(id + ' engineering lens relabels without changing the numbers', before.lens !== after.lens && near(before.theta, after.theta)
    && equal(before.anchor, after.anchor) && !(await cjkLeftovers(page)).length);
  await page.click('#lensToggleBtn');
  await settle(page);
  const frame = await openStill(T, BOOK, ID, id, 'en');
  const f = await state(frame);
  check(id + ' parks on its declared print frame with the handle hidden', !f.play && f.kind === i && near(f.theta, still)
    && near(f.theta, Number(await frame.locator('[data-preset="' + id + '"]').getAttribute('data-still')))
    && !(await frame.locator('.handle').isVisible()));
  check(id + ' keeps the ball and the floor inside the print frame', await frame.evaluate(() => {
    const sc = TRV.solids[0], pts = [[0, 0, 1], [0, 0, -1]];
    for (const a of [-1.3, 1.3]) for (const b of [-1.3, 1.3]) pts.push([a, b, -1.24]);
    return pts.every((v) => { const [x, y] = sc.p(v); return x >= 4 && x <= sc.W - 4 && y >= 4 && y <= sc.H - 4; });
  }));
  await frame.context().close();
}

/* ---------- card 0: the dual-denominator product against quaternions ---------- */
await select(presets[0][0]);
await pause();
for (const t of [0, 37, 52, 90, 120, 179, 181, 200, 300, 359]) {
  await input('now', t);
  const s = await state();
  const A = s.sigmaA, B = s.sigmaB, P = s.product;
  const qa = quat(A), qb = quat(B), qp = quat(P);
  const halfSum = (1 + dot(A, A)) * (1 + dot(B, B)) / 2;
  // the rotation of the product is the Hamilton product of the two lifts; its stored point is the short one
  const w = Math.abs(qmul(qa, qb)[0]), shortNorm = Math.sqrt((1 - w) / (1 + w));
  check('θ = ' + t + '°: σ_A ★ σ_B is the rotation q(σ_A)q(σ_B), stored inside the ball',
    qgap(qp, qmul(qa, qb)) < 1e-12 && near(norm(P), shortNorm, 1e-12) && norm(P) <= 1 + 1e-12);
  check('θ = ' + t + '°: the chosen denominator is at least ½(D₊ + D₋) = ½(1 + ‖σ_A‖²)(1 + ‖σ_B‖²) ≥ ½',
    near(s.dPlus + s.dMinus, 2 * halfSum, 1e-12) && s.chosen >= halfSum - 1e-12 && halfSum >= 0.5 && near(s.chosen, Math.max(s.dPlus, s.dMinus)));
  check('θ = ' + t + '°: the squared norm of the product is min/max', near(dot(P, P), s.ratio, 1e-12) && s.normResidual < 1e-12 && s.sumResidual < 1e-12);
  // ξ = ½ vee(R − Rᵀ) of the product's rotation matrix, and of the matrix built from axis and angle
  check('θ = ' + t + '°: ξ of the product is the sine vector of its rotation matrix', norm(s.xiProduct.map((x, i) => x - sineVector(matrix(qp))[i])) < 1e-12);
  check('θ = ' + t + '°: λ(σ_B) = 2/(1 + ‖σ_B‖²) lies in [1, 2]', near(s.lambdaB, 2 / (1 + dot(B, B))) && s.lambdaB >= 1 - 1e-12 && s.lambdaB <= 2);
  const R = axisAngle(s.axis, t);
  check('θ = ' + t + '°: the stored σ_B is the rotation by θ about its axis (the shadow side after 180°)', matGap(matrix(qb), R) < 1e-12 && norm(B) <= 1 + 1e-12);
}
{
  const s = await state();
  const shadowMatrix = matrix(quat(s.shadowA));
  check('the shadow −σ_A/‖σ_A‖² is the same rotation, and ξ does not see the flip', matGap(shadowMatrix, matrix(quat(s.sigmaA))) < 1e-12
    && s.shadowResidual < 1e-12 && near(norm(s.shadowA), 1 / norm(s.sigmaA)));
}
{
  // ξ passes the seam without a jump where the stored coordinates of the product jump to the far side
  const xs = [], ps = [];
  for (let t = 40; t <= 66; t += 0.5) {
    const s = await page.evaluate((v) => {
      const d = window.TERNION_TFT_DEBUG, c = d.calc, k = d.constants;
      const p = c.star(c.rep(k.A_ANGLE, k.A_AXIS), c.rep(v, k.B_AXIS));
      return { p, x: c.xi(p) };
    }, t);
    xs.push(s.x); ps.push(s.p);
  }
  const jumpP = Math.max(...ps.slice(1).map((p, i) => norm(p.map((x, j) => x - ps[i][j]))));
  const jumpX = Math.max(...xs.slice(1).map((x, i) => norm(x.map((v, j) => v - xs[i][j]))));
  check('along θ the product crosses the seam: its coordinates jump, its sine vector moves smoothly', jumpP > 1.5 && jumpX < 0.05, `${jumpP.toFixed(3)} / ${jumpX.toFixed(4)}`);
}
{
  // the two identities on many random pairs in the cube [−4, 4]³, and the bound ‖★‖ ≤ 1
  const out = await page.evaluate(() => {
    const c = window.TERNION_TFT_DEBUG.calc;
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const rows = [];
    for (let i = 0; i < 400; i++) {
      const a = [0, 1, 2].map(() => 8 * rnd() - 4), b = [0, 1, 2].map(() => 8 * rnd() - 4), p = c.starParts(a, b);
      rows.push({ a, b, N: p.N, dp: p.dp, dm: p.dm, out: p.out });
    }
    return rows;
  });
  check('400 pairs in [−4, 4]³: D₊ + D₋ = (1 + ‖a‖²)(1 + ‖b‖²), ‖N‖² = D₊D₋, max(D₊, D₋) ≥ ½ and ‖a ★ b‖ ≤ 1', out.every(({ a, b, N, dp, dm, out: p }) => {
    const sum = (1 + dot(a, a)) * (1 + dot(b, b));
    return Math.abs(dp + dm - sum) < 1e-9 * sum && Math.abs(dot(N, N) - dp * dm) < 1e-9 * (1 + dp * dm) && Math.max(dp, dm) >= 0.5 && norm(p) <= 1 + 1e-12;
  }));
  check('400 pairs: a ★ b is the Hamilton product of the lifts', out.every(({ a, b, out: p }) => qgap(quat(p), qmul(quat(a), quat(b))) < 1e-9));
}

/* ---------- card 1: 3D-NAPE against rotation matrices ---------- */
await select(presets[1][0]);
await pause();
await input('now', 90);
{
  const s = await state();
  check('γ_A ★ γ_B = (1, 1, 1)/3 and γ_B ★ γ_A = (1, 1, −1)/3 for two 90° steps', norm(s.ab.map((x, i) => x - [1, 1, 1][i] / 3)) < 1e-12
    && norm(s.ba.map((x, i) => x - [1, 1, -1][i] / 3)) < 1e-12 && near(s.stepNorm, Math.SQRT2 - 1));
  const Rx = axisAngle([1, 0, 0], 90), Ry = axisAngle([0, 1, 0], 90);
  check('the swap angle is 120°, as between the matrices RₓR_y and R_yRₓ', near(s.deviation, 120, 1e-9) && near(relAngle(mmul(Rx, Ry), mmul(Ry, Rx)), 120, 1e-9));
  check('coaxial planar turns commute: the RoPE swap is 0', s.rope < 1e-6);
  const text = await page.locator('#hudBig').textContent();
  check('HUD title names the 120.0° swap', text.includes('120.0°'));
}
for (const t of [20, 60, 135, 180, 250, 330]) {
  await input('now', t);
  const s = await state();
  const Rx = axisAngle([1, 0, 0], t), Ry = axisAngle([0, 1, 0], t);
  check('step ' + t + '°: the swap angle matches the rotation matrices', near(s.deviation, relAngle(mmul(Rx, Ry), mmul(Ry, Rx)), 1e-6),
    s.deviation + ' vs ' + relAngle(mmul(Rx, Ry), mmul(Ry, Rx)));
}
{
  // the triangle holonomy, multiplied independently: rotor(a, b) = (1 + (σ·b)(σ·a))/√(2(1 + a·b))
  const C = (re, im = 0) => [re, im];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const pauli = ([x, y, z]) => [[C(z), C(x, -y)], [C(x, y), C(-z)]];
  const m2 = (A, B) => [0, 1].map((i) => [0, 1].map((j) => { const p = cmul(A[i][0], B[0][j]), q = cmul(A[i][1], B[1][j]); return [p[0] + q[0], p[1] + q[1]]; }));
  const rotor = (a, b) => { const k = 1 / Math.sqrt(2 * (1 + dot(a, b))), M = m2(pauli(b), pauli(a)); return M.map((r, i) => r.map((z, j) => [(z[0] + (i === j ? 1 : 0)) * k, z[1] * k])); };
  const holo = (a, b, c) => {
    const S = 1 + dot(a, b) + dot(b, c) + dot(c, a), D = dot(a, crossV(b, c)), r = Math.sqrt(S * S + D * D), P = pauli(a);
    const left = m2(m2(rotor(c, a), rotor(b, c)), rotor(a, b));
    return { S, D, gap: Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(left[i][j][0] - ((i === j ? S : 0) + D * P[i][j][1]) / r, left[i][j][1] + (D * P[i][j][0]) / r)))) };
  };
  const s = await state(), e = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const mine = holo(e[0], e[1], e[2]), rev = holo(e[0], e[2], e[1]);
  check('triangle (e₁, e₂, e₃): S = 1, D = 1, and the rotor product equals (S − iDσ·a)/√(S² + D²)', mine.S === 1 && mine.D === 1 && mine.gap < 1e-12
    && s.triangle.S === 1 && s.triangle.D === 1 && s.triangle.gap < 1e-12);
  check('the reversed triangle (e₁, e₃, e₂) flips D to −1 and still matches', rev.D === -1 && rev.gap < 1e-12 && s.reversed.D === -1 && s.reversed.gap < 1e-12);
}

/* ---------- card 2: bilateral rotors and the parameter ledger ---------- */
await select(presets[2][0]);
await pause();
/** Count by enumeration: m butterfly stages pair j with j xor 2^s, three parameters per pair, four projections. */
function ledger(m) {
  const K = 2 ** m, d = 3 * K;
  let pairs = 0;
  for (let s = 0; s < m; s++) for (let j = 0; j < K; j++) if ((j ^ (1 << s)) > j) pairs++;
  const total = 4 * 6 * K + 4 * 3 * pairs + 6 * K + 3 * K;
  return { K, dense: 4 * d * d + 3 * d * (8 * d / 3), total, gated: total - 3 * K + 15 * K, bridges: pairs };
}
for (const m of [3, 4, 6, 8, 10, 12]) {
  await input('fieldLog', m);
  const s = await state(), want = ledger(m);
  check('K = 2^' + m + ': the ledger agrees with counting pairs and matrices', s.kind === 2 && s.K === want.K && s.dense === want.dense
    && s.total === want.total && s.gatedTotal === want.gated && s.bridges === want.bridges && near(s.ratio, want.dense / want.total));
}
{
  await input('fieldLog', 10);
  const s = await state();
  check('d = 3072: 12d² = 113,246,208 against 93K = 95,232 and 105K = 107,520', s.dense === 113246208 && s.total === 95232 && s.gatedTotal === 107520
    && s.bilateral === 24576 && s.butterfly === 61440 && s.gate === 6144 && s.nape === 3072
    && (await page.locator('#roKey').textContent()) === '95,232');
}
for (const t of [0, 30, 100, 200]) {
  await input('now', t);
  const s = await state(), k = await page.evaluate(() => window.TERNION_TFT_DEBUG.constants);
  const ql = quat(await calc('rep', k.ELL_ANGLE, k.ELL_AXIS)), qr = quat(await calc('rep', k.RR_ANGLE, k.RR_AXIS));
  check('θ = ' + t + '°: ℓ ★ σ ★ r is the rotation q(ℓ)q(σ)q(r) and keeps the Born kernel to ℓ ★ r',
    qgap(quat(s.bilateralOut), qmul(qmul(ql, quat(s.sigma)), qr)) < 1e-12 && s.isometryResidual < 1e-12);
  check('θ = ' + t + '°: a butterfly bridge does not see the shadow flip of its partner', s.bridgeResidual < 1e-12);
}

/* ---------- card 3: Born–Heap attention, the exact hit and the total mismatch ---------- */
await select(presets[3][0]);
await pause();
await input('now', 0);
{
  const s = await state();
  // exact rationals: α = 1/(ε₀ + 1), ¼ξ((½, 0, 0)) = 6/25, ω̄ = α·6/25, R_rat(ω̄) = ω̄/(1 + ω̄²)
  const g = (a, b) => (b ? g(b, a % b) : a);
  const fr = (n, d) => { const k = g(n, d); return [n / k, d / k]; };
  const alpha = fr(20n, 21n), om = fr(alpha[0] * 6n, alpha[1] * 25n), step = fr(om[0] * om[1], om[1] * om[1] + om[0] * om[0]);
  const same = (x, y) => x[0] === y[0] && x[1] === y[1];
  check('the exact hit (ε₀ = 0.05) in BigInt: α = 20/21, ω̄ = 8/35, R_rat(ω̄) = 280/1289', same(alpha, [20n, 21n]) && same(om, [8n, 35n]) && same(step, [280n, 1289n]));
  check('the page computes the same: Σα = 20/21, ω̄ = 8/35 e₁, the step 280/1289 e₁', near(s.alphaSum, 20 / 21, 1e-15) && near(s.omega[0], 8 / 35, 1e-15)
    && Math.abs(s.omega[1]) + Math.abs(s.omega[2]) < 1e-15 && near(s.mid[0], 280 / 1289, 1e-15) && near(norm(s.mid), 280 / 1289, 1e-15) && s.born === 1);
  const ro = await page.locator('#readouts').textContent();
  check('the readouts print the exact fractions 20/21, 8/35 and 280/1289', ['20/21', '8/35', '280/1289'].every((x) => ro.includes(x)));
  await page.click('[data-retract="sqrt"]');
  await settle(page);
  const q = await state();
  check('the half-angle retraction gives 8/(35 + √1289) e₁', near(q.mid[0], 8 / (35 + Math.sqrt(1289)), 1e-15) && near(norm(q.mid), q.mid[0], 1e-15));
  await page.click('[data-retract="rat"]');
  await settle(page);
}
for (const t of [0, 45, 90, 135, 170, 180, 220, 300]) {
  await input('now', t);
  const s = await state();
  const half = (t * Math.PI) / 360, b = Math.cos(half) ** 2, phi = b * b, alpha = phi / (0.05 + phi);
  // the Born kernel is the squared inner product of the quaternion lifts of query and key
  const lift = dot(quat(s.query), quat(s.key)) ** 2;
  check('θ = ' + t + '°: b = cos²(θ/2) = (q_Q·q_K)² = |⟨0|ψ⟩|²', near(s.born, b, 1e-12) && near(lift, b, 1e-12) && near(s.bornOverlap, b, 1e-12));
  check('θ = ' + t + '°: Σα = S/(ε₀ + S) < 1, the reserve takes the rest, Softmax still adds up to 1', near(s.alphaSum, alpha, 1e-12)
    && s.alphaSum < 1 && near(s.alphaSum + s.reserveShare, 1, 1e-12) && s.softSum === 1);
  // the carried value: q(σ̂) = q(−σ̃_K)q(σ_V) with σ̃_Q = 0
  check('θ = ' + t + '°: the carried value is the rotation q(−σ̃_K)q(σ_V)', qgap(quat(s.transported), qmul(quat(s.key.map((x) => -x)), quat(s.value))) < 1e-12);
  check('θ = ' + t + '°: the TFT step is R_rat(α·¼ξ(m)), the Softmax step R_rat(¼ξ(m))', (() => {
    const x = sineVector(matrix(quat(s.relative))), u = x.map((v) => (alpha * v) / 4), w = x.map((v) => v / 4);
    const rr = (v) => v.map((c) => c / (1 + dot(v, v)));
    return norm(rr(u).map((c, i) => c - s.mid[i])) < 1e-12 && norm(rr(w).map((c, i) => c - s.soft[i])) < 1e-12;
  })());
}
{
  await input('now', 180);
  const s = await state();
  check('a total mismatch: Σα = 0 and no TFT step, while the forced Softmax step stays', s.alphaSum < 1e-12 && s.stepNorm < 1e-12 && s.softNorm > 0.2);
}
await input('reserve', 0.2);
{
  await input('now', 0);
  const s = await state();
  check('ε₀ = 0.2 switches nothing else and gives Σα = 1/1.2 = 5/6 at the exact hit', s.kind === 3 && near(s.eps0, 0.2) && near(s.alphaSum, 5 / 6, 1e-15)
    && (await page.locator('#readouts').textContent()).includes('5/6'));
}
await input('reserve', 0.05);

/* ---------- card 4: the Fano Lie-triple gate and halting ---------- */
await select(presets[4][0]);
await pause();
{
  const k = await page.evaluate(() => window.TERNION_TFT_DEBUG.constants);
  const m1 = matrix(qmul(quat(k.SM1), quat(k.SM2))), f = sineVector(m1);
  for (const t of [0, 3, 30, 100, 177, 180, 183, 260, 360]) {
    await input('now', t);
    const s = await state();
    const R = axisAngle(k.MID_AXIS, t), x = sineVector(R);
    const delta = crossV(k.W1, x).map((v, i) => v + dot(x, f) * k.W2[i] - dot(k.W2, f) * x[i]);
    const step = delta.map((v) => v / (1 + dot(delta, delta)));
    check('θ = ' + t + '°: ξ = sin θ û from the matrix, f from the partner fields, Δ = w₁ × ξ + {ξ, w₂, f}',
      norm(s.xi.map((v, i) => v - x[i])) < 1e-12 && norm(s.f.map((v, i) => v - f[i])) < 1e-12 && norm(s.delta.map((v, i) => v - delta[i])) < 1e-12);
    check('θ = ' + t + '°: the step r = ‖R_rat(Δ)‖, σ_out = σ_mid ★ R_rat(Δ), and the halting rule r ≤ ε_self',
      near(s.r, norm(step), 1e-12) && qgap(quat(s.out), qmul(quat(s.mid), quat(step))) < 1e-12 && s.halted === (s.r <= s.epsSelf));
  }
  await input('now', 180);
  check('on the seam ξ = 0: the gate shuts and the layer halts', (await state()).xiNorm < 1e-12 && (await state()).halted && (await state()).r < 1e-12);
  await input('now', 100);
  check('at θ = 100° the gate is open and the layer goes on', !(await state()).halted && (await state()).r > 0.3);
  await input('halt', 0.2);
  const s = await state();
  check('ε_self = 0.2 widens the halting band', s.kind === 4 && near(s.epsSelf, 0.2) && s.halted === (s.r <= 0.2));
  await input('halt', 0.05);
}

/* ---------- sliders that belong to a card switch to it; chips; the handle ---------- */
await select(presets[0][0]);
await input('fieldLog', 6);
check('the field slider switches to the butterfly card', (await state()).kind === 2 && (await state()).K === 64);
await input('reserve', 0.1);
check('the reserve slider switches to the attention card', (await state()).kind === 3 && near((await state()).eps0, 0.1));
await input('halt', 0.08);
check('the halting slider switches to the gate card', (await state()).kind === 4 && near((await state()).epsSelf, 0.08));
for (const cam of ['front', 'top', 'oblique']) {
  await page.click('[data-cam="' + cam + '"]'); await settle(page);
  check('camera chip ' + cam + ' selects its view', (await state()).cam === cam);
}
await select(presets[0][0]);
await pause();
const handle = page.locator('#rotorHandle');
async function point() {
  const r = await handle.boundingBox();
  return [r.x + r.width / 2, r.y + r.height / 2];
}
await input('now', 20); const start = await point();
await input('now', 160); const end = await point();
check('the rail moves the projected handle along the diameter', Math.hypot(end[0] - start[0], end[1] - start[1]) > 40);
const camera = () => page.evaluate(() => ({ ...TRV.solids[0].cam }));
const beforeCam = await camera();
await page.mouse.move(...end); await page.mouse.down();
await page.mouse.move(...start, { steps: 6 }); await page.mouse.up(); await settle(page);
{
  const s = await state();
  check('dragging the handle turns the rotor back without orbiting', Math.abs(s.theta - 20) < 3 && equal(beforeCam, await camera()) && s.preset == null, String(s.theta));
}
await handle.focus();
await page.keyboard.press('ArrowRight'); await settle(page);
const keyed = (await state()).theta;
await page.keyboard.press('End'); await settle(page);
check('arrow keys and End on the handle step θ', Math.abs(keyed - 20) < 4.5 && (await state()).theta === 360);
await select(presets[0][0]);
check('the rail plays on sparse frames', await until(page, () => window.TERNION_TFT_DEBUG.state.play && window.TERNION_TFT_DEBUG.state.theta > 0));
await pause();
await page.locator('#rew').evaluate((el) => el.click()); await settle(page);
check('rewind returns to θ = 0°', (await state()).theta === 0);

check('zero application console warnings', warnings.length === 0, [...new Set(warnings)].join(' | '));
check('zero browser errors', T.errors.length === 0, T.errors.join(' | '));
check('zero shared gate warnings', !T.warnings.length, T.warnings.map((w) => w.name).join(' | '));
await T.finish();
