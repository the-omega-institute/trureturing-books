#!/usr/bin/env node
// Independent browser regression for the six expansion experiments.
import { session, stageFirstChecks, settle, until, openStill, cjkLeftovers, inkShare } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'fairness-square-uncertainty-expansion';
const PRESETS = ['helix-shadow', 'horizon-limit', 'fair-square', 'phase-fold', 'uncertainty-wedge', 'time-expand'];
const SCENES = ['helix', 'horizon', 'square', 'phase', 'wedge', 'expand'];
const T = await session(), { check } = T;
await stageFirstChecks(T, BOOK, ID, { settle: 0 });
const near = (a, b, eps = 1e-11) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < eps;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const DEG = Math.PI / 180, TAU = 2 * Math.PI;
const dot = (a, b) => a.reduce((n, x, i) => n + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const vectorNear = (a, b, eps = 1e-11) => a.length === b.length && a.every((x, i) => near(x, b[i], eps));

// The page subtracts a finite head from the Basel sum. Sum the tail itself here,
// with Euler–Maclaurin remainder after M. The next omitted term is < 1/(30 M^5).
function tailSquared(D) {
  const M = 20000;
  let sum = 1 / M - 1 / (2 * M ** 2) + 1 / (6 * M ** 3);
  for (let k = D + 1; k <= M; k++) sum += 1 / (k * k);
  return 6 * sum / Math.PI ** 2;
}
// Rank is invariant under the page's orthogonal change of basis. Work in the
// unrotated four-cycle block; use pivot elimination, not its Gram–Schmidt routine.
function rank(rows) {
  const a = rows.map(r => r.slice()); let r = 0;
  for (let col = 0; col < a[0].length && r < a.length; col++) {
    let p = r;
    for (let j = r + 1; j < a.length; j++) if (Math.abs(a[j][col]) > Math.abs(a[p][col])) p = j;
    if (Math.abs(a[p][col]) < 1e-10) continue;
    [a[p], a[r]] = [a[r], a[p]];
    const divisor = a[r][col]; a[r] = a[r].map(x => x / divisor);
    for (let j = 0; j < a.length; j++) if (j !== r) { const f = a[j][col]; a[j] = a[j].map((x, k) => x - f * a[r][k]); }
    r++;
  }
  return r;
}
function determinant(a) {
  if (!a.length) return 1;
  if (a.length === 1) return a[0][0];
  return a[0].reduce((sum, x, j) => sum + (-1) ** j * x * determinant(a.slice(1).map(r => r.filter((_, k) => k !== j))), 0);
}
const cyclic = Array.from({ length: 7 }, (_, m) => Array.from({ length: 6 }, (_, j) =>
  j >= 4 ? 0 : [8, 5, 3, 1][((j - m) % 4 + 4) % 4] / Math.sqrt(99)));
const dimensions = cyclic.map((_, m) => rank(cyclic.slice(0, m + 1)));
const residuals = cyclic.map((_, m) => {
  if (m >= 4) return 0;
  const gram = n => cyclic.slice(0, n).map(a => cyclic.slice(0, n).map(b => dot(a, b)));
  return Math.sqrt(determinant(gram(m + 1)) / determinant(gram(m)));
});
function primesThrough(limit) {
  const sieve = Array(limit + 1).fill(true); sieve[0] = sieve[1] = false;
  for (let p = 2; p * p <= limit; p++) if (sieve[p]) for (let q = p * p; q <= limit; q += p) sieve[q] = false;
  return sieve.flatMap((yes, p) => yes ? [p] : []);
}
const primes = primesThrough(30031);

const page = await T.goto(BOOK, ID, '?lang=zh');
await page.waitForFunction(() => !!window.FAIRNESS_EXPANSION_DEBUG);
const state = async () => { await settle(page); return page.evaluate(() => window.FAIRNESS_EXPANSION_DEBUG.state); };
const pause = async p => {
  await p.evaluate(() => { const b = document.querySelector('#play'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
};
const pick = async id => { await page.click(`[data-preset="${id}"]`); await pause(page); return state(); };
const seek = async t => {
  await page.evaluate(x => window.FAIRNESS_EXPANSION_DEBUG.seek(x), t);
  await page.waitForFunction(x => Math.abs(window.FAIRNESS_EXPANSION_DEBUG.state.t - x) < 1e-10, t);
  return state();
};
const input = async (selector, value) => { await page.locator(selector).fill(String(value)); await page.dispatchEvent(selector, 'input'); await settle(page); };
let s = await state();
check('opening frame: paused helix-shadow at 2.75 turns and positive pitch',
  s.preset === 'helix-shadow' && s.scene === 'helix' && s.t === 2.75 && !s.playing && s.pitch === 0.1);

const levels = [];
for (const turns of [0, 0.37, 1, 1.5, 2, 2.75, 3]) {
  s = await seek(turns); const angle = TAU * turns;
  check(`helix ${turns} turns: independent open 3D curve and closed planar projection`,
    vectorNear(s.helixPoint, [Math.cos(angle), Math.sin(angle), 0.1 * angle])
    && vectorNear(s.planarShadow, [Math.cos(angle), Math.sin(angle)]) && near(Math.hypot(...s.planarShadow), 1));
  if (Number.isInteger(turns)) levels.push(s);
}
const goldenPeriod = 2 * Math.log((1 + Math.sqrt(5)) / 2);
check('successive turns close the D=2 shadow but have strictly increasing 3D heights',
  levels.every((v, i) => vectorNear(v.planarShadow, [1, 0]) && (!i || v.helixPoint[2] > levels[i - 1].helixPoint[2])));
check('golden deck step preserves the integer Fourier readout and flips orientation', levels.every((v, n) =>
  v.level === n && near(v.scaleLift, n * goldenPeriod) && v.orientation === (n % 2 === 0)
  && near(v.goldenPeriod, goldenPeriod) && vectorNear(v.fourierReadout, [1, 0]) && near(v.fourierStepGap, 0) && v.levelStepGap === 1));
await page.click('[data-cam="top"]'); await settle(page);
await page.waitForFunction(() => Math.abs(window.FAIRNESS_EXPANSION_DEBUG.state.camera.pitch - (Math.PI / 2 - 0.001)) < 1e-8);
s = await state();
check('Top D=2 camera reaches the planar view and preserves the open spatial curve', s.cam === 'top' && s.helixPoint[2] > 1 && near(s.camera.yaw, 0));
await input('#pitchInput', 0); s = await state();
check('zero pitch makes the curve planar and clears the active experiment', s.pitch === 0 && s.helixPoint[2] === 0 && s.preset === null);
await page.click('[data-qcam="iso"]'); await settle(page);
await page.waitForFunction(() => Math.abs(window.FAIRNESS_EXPANSION_DEBUG.state.camera.pitch - 0.3) < 1e-8);
check('on-stage camera control returns to the 3D view', (await state()).cam === 'iso');

await pick('horizon-limit'); await seek(90);
let previousTail = Infinity;
for (let D = 1; D <= 10; D++) {
  await input('#dimInput', D); s = await state(); const expected = tailSquared(D);
  // A coordinate projection cannot enlarge a norm. Its missing unit basis
  // vector attains one, so the complement's operator norm is exactly one.
  const witness = Array.from({ length: D + 2 }, (_, k) => k === D ? 1 : 0);
  const residual = witness.map((x, k) => k < D ? 0 : x);
  check(`D=${D}: direct infinite tail norm shrinks; missing basis witness attains operator norm 1`,
    s.D === D && near(s.fixedResidual2, expected, 2e-13) && near(Math.sqrt(s.fixedResidual2), Math.sqrt(expected), 2e-13)
    && near(s.fixedShadow2 + expected, 1) && s.fixedResidual2 < previousTail
    && s.witnessResidual2 === dot(residual, residual) && s.witnessResidual2 === 1, JSON.stringify({ got: s.fixedResidual2, expected }));
  previousTail = s.fixedResidual2;
}
for (const angle of [0, 30, 63, 90]) {
  s = await seek(angle);
  check(`horizon θ=${angle}°: projection cos θ, complement sin θ and squared conservation`,
    near(s.cosTheta, Math.cos(angle * DEG)) && near(s.sinTheta, Math.sin(angle * DEG)) && near(s.cosTheta ** 2 + s.sinTheta ** 2, 1));
}

await pick('fair-square');
let minimum = Infinity, maximum = -Infinity;
for (const angle of [0, 15, Math.atan2(3, 4) / DEG, 45, 60, 90, 135, 180, 225, 270, 315, 360]) {
  s = await seek(angle); const c = Math.cos(angle * DEG), sn = Math.sin(angle * DEG);
  minimum = Math.min(minimum, s.l1Sum); maximum = Math.max(maximum, s.l1Sum);
  check(`square θ=${angle.toFixed(3)}°: L1 versus L2, Clifford reversal, parallelogram and Born weights`,
    near(s.l1Sum, Math.abs(c) + Math.abs(sn)) && near(s.l2Sum, c * c + sn * sn) && near(s.l2Sum, 1)
    && vectorNear(s.AB, [c, sn]) && vectorNear(s.BA, [c, -sn]) && vectorNear(s.ABBA, [1, 0])
    && vectorNear(s.parallelogram, [4, 4]) && vectorNear(s.bornWeights, [c * c, sn * sn]));
  if (near(angle, Math.atan2(3, 4) / DEG)) check('3–4–5 landmark: L1=1.4; squared Born weights 0.64+0.36=1',
    near(s.l1Sum, 1.4) && vectorNear(s.bornWeights, [0.64, 0.36]));
}
check('first-power sum ranges from 1 to √2 while squared sum stays 1', near(minimum, 1) && near(maximum, Math.SQRT2));

await pick('phase-fold'); s = await state();
// ρ± have equal diagonal entries 1/2; their off-diagonal entries are ±1/2.
const rhoPlus = [[0.5, 0.5], [0.5, 0.5]], rhoMinus = [[0.5, -0.5], [-0.5, 0.5]];
const diag = (rho, a, b) => rho[0][0] * a + rho[1][1] * b;
check('|+⟩/|−⟩: equal diagonal 1/2 readouts and Z=0, distinguished by X=±1',
  near(s.diagZPlus, diag(rhoPlus, 1, 0)) && near(s.diagZMinus, diag(rhoMinus, 1, 0))
  && near(s.zPlus, diag(rhoPlus, 1, -1)) && near(s.zMinus, diag(rhoMinus, 1, -1))
  && near(s.xPlus, rhoPlus[0][1] + rhoPlus[1][0]) && near(s.xMinus, rhoMinus[0][1] + rhoMinus[1][0])
  && near(s.diagGap, 0) && near(s.zrzGap, 0));
for (const angle of [0, 45, 90, 180, 270, 360, 540, 720]) {
  s = await seek(angle); const phi = angle * DEG;
  check(`phase φ=${angle}°: diagonal blindness, X readout and half-angle spinor lift`,
    near(s.p0Current, 0.5) && near(s.xCurrent, Math.cos(phi)) && vectorNear(s.bloch, [Math.cos(phi), Math.sin(phi), 0])
    && vectorNear(s.lift, [Math.cos(phi / 2), Math.sin(phi / 2)])
    && vectorNear(s.liftSquared, [s.lift[0] ** 2 - s.lift[1] ** 2, 2 * s.lift[0] * s.lift[1]])
    && vectorNear(s.liftSquared, [Math.cos(phi), Math.sin(phi)]));
}
const once = await seek(360), twice = await seek(720);
check('same base after 360° and 720°; lift ends at −1 once and +1 twice',
  vectorNear(once.bloch, twice.bloch) && vectorNear(once.lift, [-1, 0]) && vectorNear(twice.lift, [1, 0]));

await pick('uncertainty-wedge'); s = await seek(0);
check('exact X,Y,|0⟩ landmark: 1 = 0 + 1 + 0', near(s.varA, 1) && near(s.varB, 1) && near(s.varProduct, 1)
  && near(s.C, 0) && near(s.C2, 0) && near(s.K, 1) && near(s.K2, 1) && near(s.G, 0));
// Independent Bloch geometry; the page instead acts with complex 2×2 matrices.
for (const gamma of [0, 40, 90, 135, 180]) {
  await input('#gammaInput', gamma);
  for (const tilt of [0, 20, 55, 90, 140, 180]) {
    s = await seek(tilt);
    const a = [1, 0, 0], b = [Math.cos(gamma * DEG), Math.sin(gamma * DEG), 0];
    const n = [Math.sin(tilt * DEG) * Math.cos(225 * DEG), Math.sin(tilt * DEG) * Math.sin(225 * DEG), Math.cos(tilt * DEG)];
    const va = 1 - dot(a, n) ** 2, vb = 1 - dot(b, n) ** 2, C = dot(a, b) - dot(a, n) * dot(b, n), K = dot(cross(a, b), n);
    check(`uncertainty γ=${gamma}°, tilt=${tilt}°: independent variances, covariance, commutator, Gram remainder`,
      vectorNear(s.stateBloch, n) && near(s.varA, va) && near(s.varB, vb) && near(s.varProduct, va * vb)
      && near(s.C, C) && near(s.K, K) && near(s.C2, C * C) && near(s.K2, K * K)
      && near(s.Cop, C) && near(s.Kop, K) && near(s.Cgeo, C) && near(s.Kgeo, K)
      && near(s.varProduct, C * C + K * K + s.G) && near(s.G, 0) && s.G >= 0 && s.varProduct + 1e-12 >= K * K,
      JSON.stringify({ got: [s.varA, s.varB, s.C, s.K, s.G], expected: [va, vb, C, K, 0] }));
  }
}
await input('#gammaInput', 90); s = await seek(90);
check('equatorial landmark: covariance²=1/4, commutator²=0, Gram remainder=0', near(s.C2, 0.25) && near(s.K2, 0) && near(s.G, 0) && near(s.varProduct, 0.25));

await pick('time-expand'); s = await state();
check('Krylov dimensions match independent elimination of unrotated cyclic orbit', same(s.krylovDims, dimensions) && same(dimensions, [1, 2, 3, 4, 4, 4, 4]));
check('Krylov residual norms match independent Gram determinant ratios', vectorNear(s.krylovResiduals, residuals, 1e-9), JSON.stringify({ got: s.krylovResiduals, residuals }));
check('finite tower saturates after three strict steps, within dim V−rank C=5', s.krylovStrict === 3 && s.krylovBound === 5 && s.krylovStableAt === 3);
for (let step = 0; step <= 6; step++) {
  s = await seek(step);
  const selected = primes.slice(0, step), witness = selected.reduce((a, b) => a * b, 1) + 1;
  const divisors = primes.filter(p => witness % p === 0);
  check(`expansion step=${step}: finite saturation and independent sieve of Euclid witness`,
    s.step === step && s.D === step && s.krylovDim === dimensions[step] && same(s.euclidSet, selected)
    && s.euclidWitness === witness && same(s.euclidFactors, divisors)
    && s.euclidFactors.reduce((a, b) => a * b, 1) === witness && divisors.every(p => !selected.includes(p))
    && selected.every(p => witness % p === 1) && s.euclidOutside && s.euclidCongruent, JSON.stringify(s.euclidFactors));
}
check('30031=59×509: both factors outside S and neither the next prime 17',
  s.euclidWitness === 30031 && same(s.euclidFactors, [59, 509]) && 59 * 509 === 30031 && !s.euclidFactors.includes(primes[6]));

// Every cited card, both languages and themes, in all three publication sizes.
for (const [kind, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844], ['embed', 780, 500]]) {
  for (const lang of ['zh', 'en']) for (const theme of ['dark', 'light']) {
    const p = await T.open(BOOK, ID, `?lang=${lang}&preset=${PRESETS[0]}${kind === 'embed' ? '&embed=1' : ''}`, { viewport: { width, height } });
    await p.emulateMedia({ colorScheme: theme });
    await p.waitForFunction(() => !!window.FAIRNESS_EXPANSION_DEBUG); await pause(p);
    for (let i = 0; i < PRESETS.length; i++) {
      if (i) { await p.click(kind === 'embed' ? '[data-tour="next"]' : `[data-preset="${PRESETS[i]}"]`); await pause(p); }
      await p.evaluate(() => window.scrollTo(0, 0)); await settle(p);
      const info = await p.evaluate(embed => {
        const r = document.querySelector('#stage').getBoundingClientRect(), tour = document.querySelector('#tour').getBoundingClientRect();
        const a = document.querySelector('.hud-tl').getBoundingClientRect(), bEl = document.querySelector('.hud-tr'), b = bEl.getBoundingClientRect();
        const cv = document.querySelector('#cv'), cr = cv.getBoundingClientRect();
        const s = window.FAIRNESS_EXPANSION_DEBUG.state;
        return { preset: s.preset, scene: s.scene, theme: matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark', lang: document.documentElement.dataset.lang,
          overflow: Math.max(document.documentElement.scrollWidth - innerWidth, document.body.scrollWidth - document.body.clientWidth),
          share: r.width * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / (innerWidth * innerHeight),
          order: r.top < document.querySelector('.deck').getBoundingClientRect().top,
          fits: tour.bottom <= innerHeight + 1 && r.bottom <= tour.top + 1,
          hud: bEl.hidden || a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top,
          canvas: cv.width > 0 && cv.height > 0 && Math.abs(cr.width - r.width) < 3,
          pressed: document.querySelector(`[data-preset="${s.preset}"]`).getAttribute('aria-pressed'),
          note: document.querySelector(embed ? '.tour .what' : '#presetNote').textContent.trim().length };
      }, kind === 'embed');
      const tag = `${kind} ${width}×${height} ${lang}/${theme} ${PRESETS[i]}`;
      check(`${tag}: card, scene, color preference and rendered stage`, info.preset === PRESETS[i] && info.scene === SCENES[i] && info.theme === theme && info.lang === lang
        && info.pressed === 'true' && info.note > 8 && info.canvas && (await inkShare(p, '#cv')) > 0.01, JSON.stringify(info));
      check(`${tag}: stage-first geometry and HUD separation`, info.overflow <= 0 && info.hud
        && info.share >= (kind === 'embed' ? 0.6 : 0.28) && (kind !== 'mobile' || info.order) && (kind !== 'embed' || info.fits), JSON.stringify(info));
      if (lang === 'en') { const bad = await cjkLeftovers(p); check(`${tag}: English is complete`, bad.length === 0, bad.slice(0, 3).join(' | ')); }
    }
    await p.context().close();
  }
}

// The cited fair-square frame in a narrow chapter column: the long card note under the stage leaves it short. Measure
// the labels the page actually placed, not its layout rules: every label stays inside the canvas, and the two gauge
// labels touch neither another label nor the text of the title and the legend.
const overlap = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
for (const width of [334, 390]) for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=fair-square`, { viewport: { width, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await p.waitForFunction(() => !!window.FAIRNESS_EXPANSION_DEBUG); await pause(p);
  const m = await p.evaluate(() => {
    const box = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom }; };
    const shown = (el) => !!el.offsetParent && getComputedStyle(el).visibility !== 'hidden' && el.textContent.trim().length > 0;
    const s = window.FAIRNESS_EXPANSION_DEBUG.state;
    return { preset: s.preset, scene: s.scene, canvas: box(document.querySelector('#cv')),
      labels: [...document.querySelectorAll('#stage .tag')].filter(shown).map((el) => ({ text: el.textContent.trim(), ...box(el) })),
      words: [...document.querySelectorAll('#hudBig, #hudSub, #legend > span')].filter(shown).map(box) };
  });
  const tag = `cited fair-square ${width}×500 ${lang}`, c = m.canvas;
  const outside = m.labels.filter((r) => r.left < c.left - 1 || r.right > c.right + 1 || r.top < c.top - 1 || r.bottom > c.bottom + 1);
  const gauges = m.labels.filter((r) => /^\|cos θ\| \+ \|sin θ\| = |^cos²θ \+ sin²θ = /.test(r.text));
  const struck = gauges.flatMap((g) => [...m.labels.filter((r) => r !== g), ...m.words].filter((r) => overlap(g, r)).map((r) => `${g.text} × ${r.text || 'title/legend'}`));
  check(`${tag}: the card stays selected on the square scene`, m.preset === 'fair-square' && m.scene === 'square', JSON.stringify([m.preset, m.scene]));
  check(`${tag}: every stage label lies inside the canvas`, outside.length === 0, JSON.stringify({ canvas: c, outside }));
  check(`${tag}: both gauge labels are clear of the other labels, the title and the legend`, gauges.length === 2 && struck.length === 0, JSON.stringify({ gauges: gauges.length, struck }));
  await p.context().close();
}

// ---------- the three 2D scenes: every label, DOM or canvas, keeps a place of its own ----------
// The 2D scenes lay themselves out in the room between the title block and the legend as the browser renders them, and
// reserve every label at its rendered size; for a given stage the reserved regions do not depend on the rail value:
//   horizon, θ ∈ [0°, 90°]: the quarter circle (axes to 1.2 R) and its five label slots are bounded for every θ by
//     horizonReach in main.js: e_{D+1} left of x = O − 6, V_D right of O + 1.2 R + 5, cos θ in a row under the V_D box,
//     θ at radius ρ = rA + 6 + h/2 on the bisector, sin θ above the tip and raised past the V_D box and the θ label;
//     the ladder has a panel of its own, its title in a row above the plot, its tick labels sized by measureText;
//   squares, θ ∈ [0°, 360°): the squares reach (|cos θ| + |sin θ|) R ≤ √2 R; A and B sit on opposite sides of the
//     axis, B beside the tip across the arrow from the magenta square, its box bounded by its offset maximised over a
//     quarter turn; AB and BA are mirror images kept on their own sides, beside their dots (within rr + 10 + w across)
//     or over them (within max(rr + 5.5, 1.3 rr, 10) + 2 + h up and down); the product has a row of its own, under the
//     rotor or under the square and the rotor; the gauges stand in rows (label, bar, label, bar, tick label); the seven
//     packings, with either rotor labelling, are compared by the square's radius;
//   expansion, m ∈ [0, 6]: rows whose heights are label heights and multiples of the cell side, sized from the widest
//     equation and witness labels over all seven steps.
// Those bounds cover every continuous rail value. This suite reads the real browser: the box of every visible DOM
// label and the ink box of every canvas fillText (measureText on the call itself), over dense rail samples driven
// through the rail's own input event (which keeps a cited card selected, so the frame keeps its real height), and
// checks them against each other, the canvas, the title and the legend, and against the regions the page reserved for
// them (FAIRNESS_EXPANSION_DEBUG.layout(), read-only). The old fixed bands failed here: A met B at θ = 0, AB or BA met
// (AB)(BA) = 1, V₄ met cos θ, sin θ met θ, and prime labels left the canvas or ran under the legend.
// Fitting every label must not shrink the mathematics away: in the square scene the radius of the dashed circle and of
// the rotor circle are read from the canvas arc calls themselves, and must stay readable (R ≥ 20 px, rr ≥ 12 px; in the
// cited 334 px English frame the first measured packing left R ≈ 14.5 px), and a square's value is written exactly
// when its side |cos θ| R or |sin θ| R is longer than 34 px, as it always was (a measured guard once hid some).
function layoutSweep({ scene, values }) {
  const dbg = window.FAIRNESS_EXPANSION_DEBUG, cv = document.querySelector('#cv'), ctx = cv.getContext('2d'), rail = document.querySelector('#now');
  const css = (el) => getComputedStyle(el);
  const visible = (el) => !el.hidden && el.offsetParent !== null && css(el).visibility !== 'hidden' && +css(el).opacity > 0 && el.textContent.trim().length > 0;
  const rect = (r) => ({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
  const meet = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1;
  const inside = (a, b, tol = 1) => a.left >= b.left - tol && a.right <= b.right + tol && a.top >= b.top - tol && a.bottom <= b.bottom + tol;
  let ink = null, arcs = null;
  ctx.arc = function (x0, y0, r, ...rest) {   // the radius of each circle drawn, in CSS pixels, and whether it is dashed
    if (arcs) { const t = this.getTransform(), k = cv.width / cv.getBoundingClientRect().width; arcs.push({ r: r * Math.hypot(t.a, t.b) / k, dashed: this.getLineDash().length > 0 }); }
    return CanvasRenderingContext2D.prototype.arc.call(this, x0, y0, r, ...rest);
  };
  ctx.fillText = function (text, x, y, ...rest) {   // the ink box of each canvas text, from the call itself
    if (ink && this.globalAlpha > 0.05 && String(text).trim()) {
      const m = this.measureText(text), t = this.getTransform(), k = cv.width / cv.getBoundingClientRect().width;
      const at = (u, v) => [(t.a * u + t.c * v + t.e) / k, (t.b * u + t.d * v + t.f) / k];
      const p = at(x - m.actualBoundingBoxLeft, y - m.actualBoundingBoxAscent), q = at(x + m.actualBoundingBoxRight, y + m.actualBoundingBoxDescent);
      ink.push({ text: `canvas "${text}"`, left: Math.min(p[0], q[0]), right: Math.max(p[0], q[0]), top: Math.min(p[1], q[1]), bottom: Math.max(p[1], q[1]) });
    }
    return CanvasRenderingContext2D.prototype.fillText.call(this, text, x, y, ...rest);
  };
  const bad = [], off = [];   // what the browser shows wrong; where it disagrees with the regions the page reserved
  const scale = { R: Infinity, rr: Infinity, odd: [] };   // the square scene: smallest circles, value labels against the rule
  let frames = 0, labels = 0, texts = 0;
  try {
    for (const v of values) {
      rail.value = String(v); rail.dispatchEvent(new Event('input', { bubbles: true }));
      ink = []; arcs = []; window.TRV.kit.flush();
      const st = dbg.state, lay = dbg.layout ? dbg.layout() : null, c = cv.getBoundingClientRect();
      const at = `${scene} ${+v.toFixed(3)}`;
      if (st.scene !== scene) { bad.push(`${at}: the scene is ${st.scene}`); continue; }
      frames++;
      const box = (r) => ({ left: r.x + c.left, right: r.x + r.w + c.left, top: r.y + c.top, bottom: r.y + r.h + c.top });
      const dom = [...document.querySelectorAll('#stage .tag')].filter(visible).map((el) => ({ text: `"${el.textContent.trim()}"`, ...rect(el.getBoundingClientRect()) }));
      const drawn = ink.map((r) => ({ ...r, left: r.left + c.left, right: r.right + c.left, top: r.top + c.top, bottom: r.bottom + c.top }));
      const words = [...document.querySelectorAll('#hudBig, #hudSub, #legend > span, #stageCam .chip')].filter(visible).map((el) => ({ text: el.id ? `#${el.id}` : 'a legend entry or button', ...rect(el.getBoundingClientRect()) }));
      const all = [...dom, ...drawn];
      labels += dom.length; texts += drawn.length;
      if (scene === 'square') {   // the dashed circle of radius R and the solid rotor circle; the dots and rings are ≤ 9 px
        const rings = arcs.filter((a) => a.r > 9.5), sq = rings.filter((a) => a.dashed), ro = rings.filter((a) => !a.dashed);
        if (sq.length !== 1 || ro.length !== 1) scale.odd.push(`${at}: ${sq.length} dashed and ${ro.length} solid circles`);
        else {
          const R = sq[0].r, th = v * Math.PI / 180, sides = [Math.abs(Math.cos(th)) * R, Math.abs(Math.sin(th)) * R];
          scale.R = Math.min(scale.R, R); scale.rr = Math.min(scale.rr, ro[0].r);
          const shown = dom.filter((d) => /^"\d\.\d\d"$/.test(d.text)).length, want = sides.filter((x) => x > 34).length;
          if (sides.every((x) => Math.abs(x - 34) > 0.05) && shown !== want) scale.odd.push(`${at}: ${shown} square values shown, sides ${sides.map((x) => x.toFixed(1))} px ask ${want}`);
        }
      }
      all.forEach((a, i) => {
        if (!inside(a, rect(c))) bad.push(`${at}: ${a.text} leaves the canvas`);
        for (const w of words) if (meet(a, w)) bad.push(`${at}: ${a.text} meets ${w.text}`);
        for (const o of all.slice(i + 1)) if (meet(a, o)) bad.push(`${at}: ${a.text} meets ${o.text}`);
      });
      if (!lay) { off.push(`${at}: the page reports no reserved regions`); continue; }
      const room = box(lay.room), regions = lay.blocks.map((b) => ({ name: b.name, ...box(b) }));
      for (const w of words) if (meet(room, w)) off.push(`${at}: the room meets ${w.text}`);
      regions.forEach((b, i) => {
        if (!inside(b, room, 0.5)) off.push(`${at}: region ${b.name} leaves the room`);
        for (const o of regions.slice(i + 1)) if (meet(b, o)) off.push(`${at}: regions ${b.name} and ${o.name} meet`);
      });
      for (const a of all) if (!regions.some((b) => inside(a, b))) off.push(`${at}: ${a.text} lies outside the regions reserved for it`);
    }
  } finally { delete ctx.fillText; delete ctx.arc; }
  return { frames, labels, texts, bad: [...new Set(bad)], off: [...new Set(off)], scale: scene === 'square' ? { ...scale, R: +scale.R.toFixed(2), rr: +scale.rr.toFixed(2) } : null };
}
const steps = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
const SQUARE_STILL = Math.atan2(3, 4) / DEG, SQUARE_END = 360 - SQUARE_STILL;
// start (the card's from = 0), its still, its natural end (fair-square stops at 360° − 36.87°), and the whole range between
const SWEEP = {
  'fair-square': { scene: 'square', dense: [...steps(0, 360, 360), SQUARE_STILL, SQUARE_END], sparse: [...steps(0, 360, 72), SQUARE_STILL, SQUARE_END] },
  'horizon-limit': { scene: 'horizon', dense: steps(0, 90, 180), sparse: steps(0, 90, 36) },
  'time-expand': { scene: 'expand', dense: steps(0, 6, 300), sparse: steps(0, 6, 60) }
};
const report = (tag, r, values) => {
  const few = (list) => ({ frames: r.frames, of: values.length, labels: r.labels, texts: r.texts, first: list.slice(0, 8), more: Math.max(0, list.length - 8) });
  check(`${tag}: every visible DOM label and canvas text stays in the canvas, clear of the others, the title and the legend`,
    r.frames === values.length && r.labels > 0 && r.bad.length === 0, JSON.stringify(few(r.bad)));
  check(`${tag}: the regions the page reserved lie in the room between the title and the legend, apart, and hold every label measured`,
    r.frames === values.length && r.off.length === 0, JSON.stringify(few(r.off)));
  if (r.scale) check(`${tag}: the square stays readable (dashed circle ≥ 20 px, rotor circle ≥ 12 px) and shows a square's value exactly when its side exceeds 34 px`,
    r.frames === values.length && r.scale.R >= 20 && r.scale.rr >= 12 && r.scale.odd.length === 0, JSON.stringify({ R: r.scale.R, rr: r.scale.rr, first: r.scale.odd.slice(0, 6), more: Math.max(0, r.scale.odd.length - 6) }));
};

// cited figures: the frames the chapter shows, at the narrow column widths, both languages and both colour schemes
for (const preset of Object.keys(SWEEP)) for (const width of [334, 390]) for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${preset}`, { viewport: { width, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await p.waitForFunction(() => !!window.FAIRNESS_EXPANSION_DEBUG);
  await until(p, () => window.FAIRNESS_EXPANSION_DEBUG.state.playing || window.FAIRNESS_EXPANSION_DEBUG.state.t > 0);   // the card starts once in view
  await pause(p);
  const cited = await p.evaluate(() => document.documentElement.hasAttribute('data-figure'));
  for (const theme of ['dark', 'light']) {
    await p.emulateMedia({ colorScheme: theme }); await settle(p);
    const values = theme === 'dark' ? SWEEP[preset].dense : SWEEP[preset].sparse, r = await p.evaluate(layoutSweep, { scene: SWEEP[preset].scene, values });
    report(`cited ${preset} ${width}×500 ${lang}/${theme}`, r, values);
  }
  const kept = await p.evaluate(() => window.FAIRNESS_EXPANSION_DEBUG.state.preset);
  check(`cited ${preset} ${width}×500 ${lang}: a cited figure whose card stays selected through the sweeps`, cited && kept === preset, JSON.stringify({ cited, kept }));
  await p.context().close();
}
// the lab on a desktop, a phone and in a book frame without a card; the horizon also with the shortest and longest V_D
for (const [kind, width, height, extra] of [['desktop', 1440, 900, ''], ['mobile', 390, 844, ''], ['embed', 780, 500, '&embed=1']]) for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${extra}`, { viewport: { width, height }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await p.waitForFunction(() => !!window.FAIRNESS_EXPANSION_DEBUG);
  for (const theme of ['dark', 'light']) {
    await p.emulateMedia({ colorScheme: theme });
    for (const preset of Object.keys(SWEEP)) {
      await p.click(`[data-preset="${preset}"]`); await pause(p);
      const values = theme === 'dark' ? SWEEP[preset].dense.filter((_, i) => i % 2 === 0).concat(SWEEP[preset].dense.slice(-2)) : SWEEP[preset].sparse;
      report(`${kind} ${width}×${height} ${lang}/${theme} ${preset}`, await p.evaluate(layoutSweep, { scene: SWEEP[preset].scene, values }), values);
    }
    if (theme === 'dark' && kind !== 'embed') {
      await p.click('[data-preset="horizon-limit"]'); await pause(p);
      for (const D of [1, 10]) {
        await p.locator('#dimInput').fill(String(D)); await p.dispatchEvent('#dimInput', 'input'); await settle(p);
        report(`${kind} ${width}×${height} ${lang} horizon with D = ${D}`, await p.evaluate(layoutSweep, { scene: 'horizon', values: SWEEP['horizon-limit'].sparse }), SWEEP['horizon-limit'].sparse);
      }
    }
  }
  await p.context().close();
}
// the labelled stills for PDF and EPUB (800 × 450, ?shot=1): the frame itself, then the rail around it
for (const preset of Object.keys(SWEEP)) for (const lang of ['zh', 'en']) {
  const p = await openStill(T, BOOK, ID, preset, lang);
  const still = await p.evaluate(() => window.FAIRNESS_EXPANSION_DEBUG.state.t), values = [still, ...SWEEP[preset].sparse];
  report(`still ${preset} 800×450 ${lang}`, await p.evaluate(layoutSweep, { scene: SWEEP[preset].scene, values }), values);
  await p.context().close();
}

// Pointer manipulation and rail/keyboard transitions use state predicates, never elapsed time.
for (const [id, start] of [['horizon-limit', 30], ['fair-square', 30], ['uncertainty-wedge', 30]]) {
  await pick(id); s = await seek(start);
  const h = await page.evaluate(() => window.FAIRNESS_EXPANSION_DEBUG.handle());
  await page.mouse.move(h.x, h.y); await page.mouse.down();
  await page.mouse.move(h.x + (id === 'uncertainty-wedge' ? 40 : -60), h.y - 50, { steps: 6 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check(`${id}: dragging the amber handle changes state and clears the card`, after.preset === null
    && (id === 'uncertainty-wedge' ? Math.hypot(...after.stateBloch.map((x, i) => x - s.stateBloch[i])) > 0.05 : Math.abs(after.t - s.t) > 1));
}
await pick('helix-shadow'); await seek(0);
await page.locator('body').click({ position: { x: 2, y: 2 } }); await page.keyboard.press('ArrowRight'); await settle(page);
check('ArrowRight advances a quarter turn', near((await state()).t, 0.25));
await page.keyboard.press('Home'); await settle(page); check('Home rewinds and pauses', (await state()).t === 0 && !(await state()).playing);
await page.keyboard.press('Space');
await page.waitForFunction(() => window.FAIRNESS_EXPANSION_DEBUG.state.playing && window.FAIRNESS_EXPANSION_DEBUG.state.t > 0.15);
check('Space playback advances on delivered animation frames', (await state()).t > 0.15);
await page.keyboard.press('Space'); await settle(page); const stopped = (await state()).t;
check('Space pauses at a stable clock value', !(await state()).playing && (await state()).t === stopped);
await page.keyboard.press('4'); await pause(page); s = await state();
check('key 4 switches scene and refits the phase rail to 720°', s.preset === 'phase-fold' && s.scene === 'phase' && s.max === 720);
await page.click('#rew'); s = await state(); check('rewind clears the card and pauses at zero', s.preset === null && s.t === 0 && !s.playing);
await page.click('#infoBtn'); await page.waitForFunction(() => !document.querySelector('#drawer').hidden);
await page.keyboard.press('Escape'); await page.waitForFunction(() => document.querySelector('#drawer').hidden);
check('drawer opens and closes through its controls', await page.locator('#drawer').isHidden());
check('no browser, console or network errors', T.errors.length === 0, T.errors.join(' | '));
await T.finish();
