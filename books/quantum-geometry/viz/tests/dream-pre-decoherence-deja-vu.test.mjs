#!/usr/bin/env node
// Regression checks for the projection sandtable. Expected values are computed here from amplitudes,
// Bloch projections, characteristic polynomials, finite world pairs and lattice enumeration.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'dream-pre-decoherence-deja-vu';
const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'dream-pre-decoherence-deja-vu');

const RAD = Math.PI / 180, TOL = 1e-12;
const near = (a, b, tol = TOL) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const vectorNear = (a, b, tol = TOL) => Array.isArray(a) && a.length === b.length && a.every((x, i) => near(x, b[i], tol));
const matrixNear = (a, b, tol = TOL) => Array.isArray(a) && a.length === b.length && a.every((row, i) => vectorNear(row, b[i], tol));
const pure = (theta) => {
  const v = [Math.cos(theta * RAD), Math.sin(theta * RAD)];
  return v.map((x) => v.map((y) => x * y));
};
// Unlike the page's matrix products, project the Bloch vector onto the chosen unit axis.
function pinching(A, beta) {
  const nx = Math.sin(beta * RAD), nz = Math.cos(beta * RAD);
  const trace = A[0][0] + A[1][1], dot = (A[0][1] + A[1][0]) * nx + (A[0][0] - A[1][1]) * nz;
  return [[(trace + dot * nz) / 2, dot * nx / 2], [dot * nx / 2, (trace - dot * nz) / 2]];
}
const mix = (A, B, f) => A.map((row, i) => row.map((x, j) => (1 - f) * x + f * B[i][j]));
const hsMass = (A, B) => A.flat().reduce((sum, x, i) => sum + (x - B.flat()[i]) ** 2, 0);
const eigenvalues = (A) => {
  const trace = A[0][0] + A[1][1], det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  const gap = Math.sqrt(Math.max(0, trace * trace - 4 * det));
  return [(trace + gap) / 2, (trace - gap) / 2];
};
const entropy = (A) => eigenvalues(A).reduce((sum, x) => x > 1e-15 ? sum - x * Math.log2(x) : sum, 0);
const binaryEntropy = (p) => [p, 1 - p].reduce((sum, x) => x > 0 ? sum - x * Math.log2(x) : sum, 0);
const physical = (A) => matrixNear(A, [[A[0][0], A[1][0]], [A[0][1], A[1][1]]])
  && near(A[0][0] + A[1][1], 1) && eigenvalues(A).every((x) => x >= -TOL && x <= 1 + TOL);
const weights = (theta, beta) => [Math.cos((theta - beta / 2) * RAD) ** 2, Math.sin((theta - beta / 2) * RAD) ** 2];
const sigma = [[3 / 4, 0], [0, 1 / 4]], half = [[1 / 2, 0], [0, 1 / 2]], H = binaryEntropy(3 / 4);

const page = await T.goto(BOOK, ID, '?lang=zh');
await page.evaluate(() => document.fonts.ready);
await settle(page);
const state = () => page.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state);
const click = async (selector) => { await page.click(selector); await settle(page); return state(); };
const seek = async (t) => { await page.evaluate((v) => window.DEJAVU_SANDTABLE_DEBUG.seek(v), t); await settle(page); return state(); };
const range = async (id, value) => {
  await page.locator(`#${id}`).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(page);
  return state();
};
const card = async (id, t) => { await click(`[data-preset="${id}"]`); return seek(t); };
const text = (id) => page.locator(`#${id}`).innerText();
const readNumber = async (id) => Number((await text(id)).replaceAll('−', '-'));
const address = async (value) => { await page.evaluate((v) => window.DEJAVU_SANDTABLE_DEBUG.setAddress(v), value); await settle(page); return state(); };

function frameChecks(label, s, before, expected) {
  check(`${label}: before and current matrices`, matrixNear(s.before, before) && matrixNear(s.rho, expected), JSON.stringify(s));
  check(`${label}: trace one, symmetric, positive; entropy in bits`, physical(s.rho) && near(s.existingEntropyBits, entropy(expected)), JSON.stringify(s.rho));
  check(`${label}: incremental entropy and squared HS residual`, near(s.additionalEntropyBits, entropy(expected) - entropy(before))
    && near(s.discardedHsMass, hsMass(before, expected)) && s.additionalEntropyBits >= -TOL,
  JSON.stringify([s.additionalEntropyBits, s.discardedHsMass]));
}

let s = await state();
check('opening: paused same-basis second pass at the hit card', s.preset === 'deja-vu-hit' && s.scene === 'basis'
  && s.program === 'repeat' && s.t === 2 && !s.playing && s.pass === 2);

// Each card must reset every control, including values dirtied in another scene.
const cards = [
  ['choose-context', 'basis', 'choose', 30, 90, false, 1, 1],
  ['dream-precompile', 'basis', 'repeat', 30, 0, false, 1, 2],
  ['gram-funnel', 'funnel', 'repeat', 30, 0, false, 3, 3],
  ['logic-upgrade-flush', 'funnel', 'repeat', 30, 90, true, 3, 3],
  ['unimodular-reversal', 'records', 'repeat', 45, 0, false, 3, 3],
  ['deja-vu-hit', 'basis', 'repeat', 30, 0, false, 2, 2]
];
check('the six preset slugs are present exactly once', JSON.stringify(await page.locator('[data-preset]').evaluateAll((els) => els.map((el) => el.dataset.preset)))
  === JSON.stringify(cards.map(([id]) => id)));
for (const [id, scene, program, theta, beta, upgrade, still, max] of cards) {
  await card('deja-vu-hit', 2);
  await range('theta', 71); await range('beta', 155);
  await click('[data-fact="dup"]'); await click('[data-up="on"]');
  await address('event-1');
  await click('[data-scene="records"]'); await click('[data-ov="zero"]');
  s = await card(id, still);
  check(`${id}: resets scene, program, angles and rail`, s.preset === id && s.scene === scene && s.program === program
    && s.theta === theta && near(s.beta, beta) && s.t === still && s.max === max && !s.playing, JSON.stringify(s));
  check(`${id}: resets learning, overlap and address lookup`, s.logicUpgrade === upgrade && !s.redundantMode && s.overlapMode === 'unit'
    && s.contextVersion === Number(upgrade) && s.cacheMatch.address && s.snapshot.address === 'event-0');
  check(`${id}: fresh baseline snapshot and selected card`, matrixNear(s.snapshot.sigma, pinching(pure(theta), 0))
    && s.snapshot.version === 0 && s.snapshot.beta === 0 && s.snapshot.timeTag === null
    && await page.locator(`[data-preset="${id}"]`).getAttribute('aria-pressed') === 'true');
}

// One unchanged input, two rulers: use squared overlaps with their half-angle basis vectors.
await card('choose-context', 0);
for (const [t, beta, p] of [[0, 0, 3 / 4], [1, 90, (2 + Math.sqrt(3)) / 4]]) {
  s = await seek(t);
  check(`choose-context β=${beta}: unchanged pure matrix and exact outcome weight`, matrixNear(s.rho, pure(30))
    && near(s.beta, beta) && near(weights(30, beta)[0], p) && near(await readNumber('roKey'), p, 0.00005));
  check(`choose-context β=${beta}: zero entropy and no discarded mass`, near(s.existingEntropyBits, 0)
    && near(s.additionalEntropyBits, 0) && near(s.discardedHsMass, 0) && s.pass === 0);
}
check('choose-context: displayed comparison is 0.7500 versus 0.9330', await text('ro2') === '0.7500' && await text('ro3') === '0.9330');
const angles = [0, 1, 15, 30, 45, 60, 75, 89, 90], rulers = [0, 5, 30, 45, 60, 90, 120, 150, 175];
for (const theta of angles) {
  await range('theta', theta);
  for (const beta of rulers) {
    s = await range('beta', beta);
    const [p, q] = weights(theta, beta), dot = Math.sin(2 * theta * RAD) * Math.sin(beta * RAD) + Math.cos(2 * theta * RAD) * Math.cos(beta * RAD);
    check(`ruler grid θ=${theta}, β=${beta}: amplitude and Bloch weights agree with the readout`, near(p, (1 + dot) / 2)
      && near(p + q, 1) && near(await readNumber('roKey'), p, 0.00005) && near(await readNumber('ro4'), dot, 0.00005));
    check(`ruler grid θ=${theta}, β=${beta}: controls move the ruler, input stays pure`, near(s.beta, beta) && s.theta === theta
      && matrixNear(s.rho, pure(theta)) && physical(s.rho) && near(s.existingEntropyBits, 0) && s.preset === null
      && await page.locator('#oBeta').innerText() === `${beta}°`);
  }
}

// First pass: include intermediate frames as convex mixtures, and both pure-state endpoints.
await card('dream-precompile', 1);
for (const theta of [0, 15, 30, 45, 60, 90]) {
  await range('theta', theta);
  const input = pure(theta), saved = pinching(input, 0);
  for (const t of [0, 0.25, 0.5, 1]) {
    s = await seek(t);
    frameChecks(`compile θ=${theta}, t=${t}`, s, input, mix(input, saved, t));
    check(`compile θ=${theta}, t=${t}: no premature hit`, s.pass === 1 && !s.cacheHit && !s.untaggedFamiliarity
      && s.cacheEntry.valid === Number(t === 1) && !s.cacheChecked);
  }
}
s = await card('dream-precompile', 1);
frameChecks('dream-precompile', s, pure(30), sigma);
check('dream-precompile: h₂(3/4)=0.811278… bits, added +0.811278… bits, HS mass 3/8', near(H, 0.8112781244591328)
  && near(s.existingEntropyBits, H) && near(s.additionalEntropyBits, H) && near(s.discardedHsMass, 3 / 8)
  && near(s.before[0][1], Math.sqrt(3) / 4));
check('dream-precompile: visible entropy and mass keep distinct units', /0\.8113 bit/.test(await text('ro1'))
  && await text('ro2') === '0.3750' && /0\.8113 bit/.test(await text('hudBig')));

// Repeating the same map keeps an already mixed state: existing entropy is not incremental entropy.
s = await card('deja-vu-hit', 2);
frameChecks('deja-vu-hit', s, sigma, sigma);
const immutable = JSON.stringify(s.snapshot);
check('deja-vu-hit: Valid=1, Time_Tag=NULL, matching address/context/payload, familiarity', s.cacheEntry.valid === 1
  && s.cacheEntry.timeTag === null && s.cacheEntry.version === 0 && s.cacheEntry.address === 'event-0'
  && matrixNear(s.cacheEntry.payload, sigma) && Object.values(s.cacheMatch).every(Boolean) && s.cacheChecked
  && s.cacheHit === true && s.untaggedFamiliarity === true);
check('deja-vu-hit: stage shows zero added entropy and HIT', /0\.0000 bit/.test(await text('hudBig'))
  && /Valid: 1/.test(await text('cacheBody')) && /Time_Tag: NULL/.test(await text('cacheBody'))
  && /HIT/.test(await text('cacheBody')) && await page.locator('#cacheCard').isVisible());
check('deja-vu-hit: existing entropy and both outcome surprisals remain positive', /0\.8113 bit/.test(await text('ro1'))
  && (await text('ro3')).includes((-Math.log2(3 / 4)).toFixed(4)) && (await text('ro3')).includes('2.0000'));

for (const theta of angles) {
  await range('theta', theta);
  const saved = pinching(pure(theta), 0);
  for (const beta of rulers) {
    await range('beta', beta);
    s = await seek(2);
    const expected = pinching(saved, beta), unchanged = matrixNear(expected, saved);
    frameChecks(`repeat grid θ=${theta}, β=${beta}`, s, saved, expected);
    check(`repeat grid θ=${theta}, β=${beta}: fixed-point criterion and immutable cache`, matrixNear(s.snapshot.sigma, saved)
      && matrixNear(s.cacheEntry.payload, saved) && s.cacheEntry.valid === 1 && s.cacheMatch.payload === unchanged
      && s.cacheHit === unchanged && s.untaggedFamiliarity === unchanged && matrixNear(pinching(s.rho, beta), s.rho)
      && near(await readNumber('ro4'), 0));
    // The HUD may only report what the state does; a nonzero residual does show that β differs from the saved β = 0°.
    const sub = await text('hudSub');
    check(`repeat grid θ=${theta}, β=${beta}: HUD reports the state property, not ruler identity`, sub.includes(`β = ${beta}°`)
      && !sub.includes('同一把尺子') && (unchanged ? sub.startsWith('再投影保持态不变') : sub.startsWith('换了尺子') && beta !== s.snapshot.beta), sub);
  }
}
// A maximally mixed snapshot (θ=45°) is fixed by every ruler; a changed ruler need not imply a miss there.
s = await card('deja-vu-hit', 2);
for (const beta of [5, 40, 90, 175]) {
  s = await range('beta', beta);
  frameChecks(`changed ruler β=${beta}`, s, sigma, pinching(sigma, beta));
  check(`changed ruler β=${beta}: valid entry but payload mismatch and visible MISS`, s.cacheEntry.valid === 1
    && !s.cacheMatch.payload && !s.cacheHit && !s.untaggedFamiliarity && await text('ro5') === 'MISS'
    && /MISS/.test(await text('cacheBody')) && JSON.stringify(s.snapshot) === immutable);
}
s = await range('beta', 0);
check('restoring the original ruler restores the hit', s.cacheHit && near(s.additionalEntropyBits, 0) && near(s.discardedHsMass, 0));
s = await address('event-1');
check('address mismatch: valid bit and NULL timestamp do not create a hit', s.cacheEntry.valid === 1 && s.cacheEntry.timeTag === null
  && !s.cacheMatch.address && s.cacheMatch.version && s.cacheMatch.payload && !s.cacheHit && !s.untaggedFamiliarity
  && await text('ro5') === 'MISS' && /MISS/.test(await text('cacheBody')));
s = await address('event-0');
check('restoring the lookup address restores the hit', s.cacheMatch.address && s.cacheHit && s.untaggedFamiliarity);

// Brute-force all ordered distinct pairs, retaining the pairs rather than using a closed-form rate.
const worlds = ['00', '01', '10', '11'];
const pairs = worlds.flatMap((x) => worlds.filter((y) => y !== x).map((y) => [x, y]));
const f0 = (w) => w[0], f1 = (w) => w[1];
const escapePairs = (features) => pairs.filter(([x, y]) => features.every((f) => f(x) === f(y)));
const oldEscape = escapePairs([f0]);
const noveltyChecks = (label, q, redundant = false) => {
  const added = redundant ? f0 : f1, remaining = escapePairs([f0, added]);
  const unique = oldEscape.filter(([x, y]) => added(x) !== added(y));
  check(`${label}: 12 ordered pairs, exact unique capture and escape rates`, pairs.length === 12 && oldEscape.length === 4
    && unique.length === (redundant ? 0 : 4) && remaining.length === (redundant ? 4 : 0)
    && q.uniqueCapture === unique.length && q.escapeRate.pairs === pairs.length
    && near(q.escapeRate.old, oldEscape.length / pairs.length) && near(q.escapeRate.now, remaining.length / pairs.length));
};
for (let cycle = 1; cycle <= 3; cycle++) {
  s = await click('[data-up="on"]');
  frameChecks(`upgrade ON cycle ${cycle}`, s, sigma, half);
  noveltyChecks(`upgrade ON cycle ${cycle}`, s);
  check(`upgrade ON cycle ${cycle}: context v1, flush, invalid entry, MISS`, s.logicUpgrade && s.beta === 90 && s.contextVersion === 1
    && s.flush === 1 && s.cacheEntry.valid === 0 && !s.cacheMatch.version && !s.cacheHit && !s.untaggedFamiliarity
    && s.cacheEntry.timeTag === null && await text('ro5') === 'MISS' && /MISS/.test(await text('cacheBody')));
  check(`upgrade ON cycle ${cycle}: exact secondary gain and mass; snapshot untouched`, near(s.additionalEntropyBits, 1 - H)
    && near(1 - H, 0.18872187554086717) && near(s.discardedHsMass, 1 / 8) && JSON.stringify(s.snapshot) === immutable);
  s = await click('[data-up="off"]');
  frameChecks(`upgrade OFF cycle ${cycle}`, s, sigma, sigma);
  check(`upgrade OFF cycle ${cycle}: clean snapshot restoration and hit`, !s.logicUpgrade && s.beta === 0 && s.contextVersion === 0
    && s.flush === 0 && s.cacheEntry.valid === 1 && s.cacheHit && s.untaggedFamiliarity && JSON.stringify(s.snapshot) === immutable);
}
await click('[data-fact="dup"]');
s = await click('[data-up="on"]');
noveltyChecks('redundant fact', s, true);
check('redundant fact: upgrade switch ON without flush, basis change or invalidation', s.logicUpgrade && s.redundantMode
  && s.beta === 0 && s.contextVersion === 0 && s.flush === 0 && s.cacheEntry.valid === 1 && s.cacheHit
  && near(s.additionalEntropyBits, 0) && near(s.discardedHsMass, 0));
s = await click('[data-fact="novel"]');
check('panel fact switch while ON: distinguishing fact immediately invalidates the hit', !s.redundantMode && s.contextVersion === 1
  && s.flush === 1 && s.beta === 90 && !s.cacheHit && matrixNear(s.rho, half));
s = await click('[data-fact="dup"]');
check('panel fact switch back to redundant: original state and hit return', s.redundantMode && s.contextVersion === 0
  && s.flush === 0 && s.cacheHit && matrixNear(s.rho, sigma) && JSON.stringify(s.snapshot) === immutable);

// A fixed state does not identify the ruler. At θ = 45° the saved snapshot is I/2, which the pinchings with β = 0° and
// β = 90° both leave alone although the two maps differ; drive the real controls (arrow keys on the sliders, the stage
// switch) and require the HUD to report the state property only.
const keysOn = async (p, selector, key, n) => {
  await p.focus(selector); for (let k = 0; k < n; k++) await p.keyboard.press(key);
  await p.evaluate(() => document.activeElement?.blur()); await settle(p);
  return p.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state);
};
const mixedSaved = pinching(pure(45), 0), channelGap = Math.max(...pinching(pure(45), 0).flat().map((x, i) => Math.abs(x - pinching(pure(45), 90).flat()[i])));
check('θ=45° certificate: Π at 0° and 90° differ by 1/2 on the input, yet both fix the saved I/2', matrixNear(mixedSaved, half)
  && near(channelGap, 1 / 2) && matrixNear(pinching(mixedSaved, 90), mixedSaved) && matrixNear(pinching(mixedSaved, 0), mixedSaved));
const fixedHudZh = '再投影保持态不变，β = 90°，态熵仍是 1.000 bit', fixedHudEn = 'Π(σ) = σ, β = 90°; state entropy still 1.000 bit';
s = await card('deja-vu-hit', 2);
check('deja-vu-hit HUD at the card: state unchanged under β = 0°', await text('hudSub') === '再投影保持态不变，β = 0°，态熵仍是 0.811 bit');
s = await keysOn(page, '#theta', 'ArrowRight', 15);
check('θ=45° by arrow keys: saved snapshot I/2 under the dream ruler, hit', s.theta === 45 && near(s.beta, 0)
  && matrixNear(s.snapshot.sigma, mixedSaved) && s.cacheHit && await text('oTheta') === '45°');
s = await keysOn(page, '#beta', 'ArrowRight', 18);
frameChecks('fixed state, ruler turned to 90° by arrow keys', s, mixedSaved, mixedSaved);
let hud = await text('hudSub'), note = await text('roNote');
check('fixed state, ruler turned: current β 90° ≠ saved β 0°, state unchanged, hit', near(s.beta, 90) && s.snapshot.beta === 0
  && matrixNear(s.rho, s.before) && s.cacheMatch.payload && s.cacheHit && await text('oBeta') === '90°');
check('fixed state, ruler turned: visible HUD reports only that the state is unchanged', await page.locator('#hudSub').isVisible()
  && hud === fixedHudZh && !/同一把尺子/.test(hud + note), `${hud} | ${note}`);
s = await card('deja-vu-hit', 2);
await keysOn(page, '#theta', 'ArrowRight', 15);
s = await click('[data-up="on"]');
frameChecks('fixed state, upgrade turns the ruler to 90°', s, mixedSaved, mixedSaved);
hud = await text('hudSub'); note = await text('roNote');
check('fixed state, upgrade: β 90° ≠ saved β 0°, flush and MISS while the state stays', s.logicUpgrade && near(s.beta, 90)
  && s.snapshot.beta === 0 && s.flush === 1 && s.cacheEntry.valid === 0 && s.cacheMatch.payload && !s.cacheHit && await text('ro5') === 'MISS');
check('fixed state, upgrade: visible HUD reports only that the state is unchanged', await page.locator('#hudSub').isVisible()
  && hud === fixedHudZh && !/同一把尺子/.test(hud + note), `${hud} | ${note}`);
const english = await T.open(BOOK, ID, '?lang=en&preset=deja-vu-hit');
await settle(english);
await keysOn(english, '#theta', 'ArrowRight', 15);
let q = await keysOn(english, '#beta', 'ArrowRight', 18);
hud = await english.locator('#hudSub').innerText(); note = await english.locator('#roNote').innerText();
check('English, ruler turned: β 90° ≠ saved 0°, fixed I/2 state, HUD reports only the state', near(q.beta, 90) && q.snapshot.beta === 0
  && matrixNear(q.rho, mixedSaved) && q.cacheHit && await english.locator('#hudSub').isVisible() && hud === fixedHudEn
  && !/same ruler/i.test(hud + note), `${hud} | ${note}`);
await english.click('[data-up="on"]'); await settle(english);
q = await english.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state);
hud = await english.locator('#hudSub').innerText(); note = await english.locator('#roNote').innerText();
check('English, upgrade: flush and MISS with the state unchanged, HUD reports only the state', q.logicUpgrade && near(q.beta, 90)
  && q.flush === 1 && !q.cacheHit && matrixNear(q.rho, mixedSaved) && hud === fixedHudEn && !/same ruler/i.test(hud + note), `${hud} | ${note}`);
await english.context().close();
// At the narrowest phone width the widest reading (β = 175°) stays on one visible line inside the stage.
for (const [lang, expected] of [['zh', '再投影保持态不变，β = 175°，态熵仍是 1.000 bit'], ['en', 'Π(σ) = σ, β = 175°; state entropy still 1.000 bit']]) {
  const narrow = await T.open(BOOK, ID, `?lang=${lang}&preset=deja-vu-hit`, { viewport: { width: 334, height: 720 }, locale: lang === 'en' ? 'en-US' : 'zh-CN' });
  await settle(narrow);
  await keysOn(narrow, '#theta', 'ArrowRight', 15);
  q = await keysOn(narrow, '#beta', 'ArrowRight', 35);
  const g = await narrow.evaluate(() => {
    const el = document.getElementById('hudSub'), r = el.getBoundingClientRect(), st = document.getElementById('stage').getBoundingClientRect();
    return { text: el.innerText, lines: Math.round(r.height / parseFloat(getComputedStyle(el).lineHeight)), inside: r.left >= st.left && r.right <= st.right && r.top >= st.top };
  });
  check(`${lang} 334 px, β = 175°: fixed I/2 state, HUD on one line inside the stage`, near(q.beta, 175) && q.snapshot.beta === 0 && q.cacheHit
    && matrixNear(q.rho, mixedSaved) && g.text === expected && g.lines === 1 && g.inside && await narrow.locator('#hudSub').isVisible(), JSON.stringify(g));
  await narrow.context().close();
}

// Gram geometry: derive the feasible band from unit vectors, independently of the displayed determinant.
const detGram = (z) => 81 / 625 - (z - 16 / 25) ** 2;
const gramMinors = (z) => [1, 1, 1, 9 / 25, 9 / 25, 1 - z * z, detGram(z)];
const zOf = (q) => 16 / 25 + (9 / 25) * q;
const windows = [[-1, 1], [0, 2 / 3], [1 / 3, 1 / 2]].map((interval) => interval.map(zOf));
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
function gramChecks(label, q, upgraded) {
  const z = upgraded ? 2 / 5 : 4 / 5, band = upgraded ? [-1, -1 / 3].map(zOf) : windows[2];
  const cosine = (z - 16 / 25) / (9 / 25), A = [4 / 5, 3 / 5, 0], B = [1, 0, 0];
  const C = [4 / 5, (3 / 5) * cosine, (3 / 5) * Math.sqrt(1 - cosine ** 2)];
  check(`${label}: prior interval, target and determinant`, vectorNear(q.gramBand, band) && near(q.zTarget, z)
    && near(q.zNow, z) && near(q.detG, detGram(z)) && near(q.detG, upgraded ? 9 / 125 : 13 / 125));
  check(`${label}: unit vectors realize all three cosines and nonnegative principal minors`, near(dot(A, A), 1) && near(dot(B, B), 1)
    && near(dot(C, C), 1) && near(dot(A, B), 4 / 5) && near(dot(B, C), 4 / 5) && near(dot(A, C), q.zTarget)
    && gramMinors(q.zTarget).every((x) => x >= -TOL) && q.zTarget >= band[0] && q.zTarget <= band[1]);
  check(`${label}: old target validity follows the new interval`, q.oldTargetValid === !upgraded
    && (4 / 5 >= band[0] && 4 / 5 <= band[1]) === !upgraded && q.cacheEntry.valid === Number(!upgraded));
}
s = await card('gram-funnel', 3);
gramChecks('gram-funnel', s, false);
check('Gram feasibility: exact endpoints 0.28 and 1, invalid outside', near(zOf(-1), 0.28) && near(zOf(1), 1)
  && near(detGram(0.28), 0) && near(detGram(1), 0) && detGram(0.27) < 0 && detGram(1.01) < 0);
const phi = (1 + Math.sqrt(5)) / 2, centre = phi - 3 / 2;
function golden(width) {
  const selected = [];
  for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) {
    const internal = a - b / phi;
    if (Math.abs(internal - centre) <= width / 2 + TOL) selected.push(`${a},${b}`);
  }
  return selected;
}
const goldenSets = [1, 1 / 2, 1 / 4].map(golden);
check('finite golden window: independent counts 26, 11, 7 and nested selections', vectorNear(goldenSets.map((set) => set.length), [26, 11, 7])
  && goldenSets[1].every((p) => goldenSets[0].includes(p)) && goldenSets[2].every((p) => goldenSets[1].includes(p)));
for (const t of [0, 0.5, 1, 1.5, 2, 2.5, 3]) {
  s = await seek(t);
  const k = Math.min(1, Math.floor(t)), band = t >= 2 ? windows[2] : windows[k].map((x, i) => x + (windows[k + 1][i] - x) * (t - k));
  const width = 2 ** -Math.min(2, t), selected = golden(width);
  check(`funnel t=${t}: nested prior band and target retained`, vectorNear(s.gramBand, band) && s.oldTargetValid
    && s.zTarget >= band[0] && s.zTarget <= band[1] && (t < 2 ? s.zNow === null : near(s.zNow, 19 / 25 + (t - 2) / 25)));
  check(`funnel t=${t}: golden width and independent finite enumeration`, near(s.goldenNow.s, width) && s.goldenNow.count === selected.length
    && vectorNear(s.goldenCounts, [26, 11, 7]) && vectorNear(s.goldenCounts, goldenSets.map((set) => set.length)));
  check(`funnel t=${t}: golden count visible in the readout`, (await text('ro3')).includes(`· ${selected.length} (26 → 11 → 7)`));
}
s = await card('logic-upgrade-flush', 3);
gramChecks('logic-upgrade-flush', s, true);
noveltyChecks('logic-upgrade-flush', s);
check('logic-upgrade-flush: secondary pinching entropy and residual', s.logicUpgrade && s.beta === 90 && s.flush === 1 && s.contextVersion === 1
  && near(s.existingEntropyBits, entropy(half)) && near(s.additionalEntropyBits, entropy(pinching(sigma, 90)) - H)
  && near(s.discardedHsMass, hsMass(sigma, half)) && /Valid 0/.test(await text('ro5')));
const funnelSnapshot = JSON.stringify(s.snapshot);
for (let cycle = 1; cycle <= 2; cycle++) {
  s = await click('[data-up="off"]');
  gramChecks(`funnel OFF cycle ${cycle}`, s, false);
  check(`funnel OFF cycle ${cycle}: restores snapshot and zero extra entropy`, !s.logicUpgrade && s.beta === 0 && s.contextVersion === 0
    && near(s.additionalEntropyBits, 0) && near(s.discardedHsMass, 0) && JSON.stringify(s.snapshot) === funnelSnapshot);
  s = await click('[data-up="on"]');
  gramChecks(`funnel ON cycle ${cycle}`, s, true);
}
s = await click('[data-fact="dup"]');
gramChecks('funnel redundant fact', s, false);
noveltyChecks('funnel redundant fact', s, true);
check('funnel redundant fact: no context upgrade or flush', s.logicUpgrade && s.redundantMode && s.contextVersion === 0
  && s.flush === 0 && s.beta === 0 && JSON.stringify(s.snapshot) === funnelSnapshot);
await click('[data-fact="novel"]');
await click('[data-scene="basis"]');
s = await seek(2);
frameChecks('funnel to ruler: secondary projection', s, sigma, half);
check('scene switch retains upgraded context and MISS', s.logicUpgrade && s.beta === 90 && s.cacheEntry.valid === 0 && !s.cacheHit);
await click('[data-up="off"]');
await range('beta', 40);
s = await state();
check('manual ruler override after reset: payload mismatch without a context flush', !s.logicUpgrade && s.contextVersion === 0
  && s.cacheEntry.valid === 1 && !s.cacheHit && matrixNear(s.rho, pinching(sigma, 40)));
await click('[data-up="on"]'); await range('beta', 0);
s = await state();
check('manual ruler override while upgraded: compatible payload cannot rescue invalid context', s.logicUpgrade && s.beta === 0
  && s.cacheMatch.payload && !s.cacheMatch.version && s.cacheEntry.valid === 0 && !s.cacheHit);

// Reconstruct the two-copy phase channel from complex record amplitudes, not from page functions.
const multiply = ([a, b], [c, d]) => [a * c - b * d, a * d + b * c];
const conjugate = ([a, b]) => [a, -b];
const overlap = (r) => r[0].reduce((sum, x, i) => {
  const z = multiply(x, conjugate(r[1][i])); return [sum[0] + z[0], sum[1] + z[1]];
}, [0, 0]);
const phaseRecord = [[[1, 0], [0, 0]], [[0, 1], [0, 0]]];
const zeroRecord = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
const phaseStops = (theta, record) => {
  const gamma = overlap(record), reverse = conjugate(gamma), input = [Math.sin(2 * theta * RAD) / 2, 0];
  const written = multiply(multiply(input, gamma), gamma), one = multiply(written, reverse);
  return [input, written, one, multiply(one, reverse)];
};
const names = ['input', 'write-both', 'reverse-one', 'reverse-both'];
s = await card('unimodular-reversal', 3);
check('unimodular-reversal: amplitude-derived overlap is −i', vectorNear(s.recordOverlap, overlap(phaseRecord))
  && vectorNear(overlap(phaseRecord), [0, -1]) && near(dot(s.recordOverlap, s.recordOverlap), 1));
for (const theta of [0, 30, 45, 90]) {
  await range('theta', theta);
  const expected = phaseStops(theta, phaseRecord);
  for (let t = 0; t <= 3; t++) {
    s = await seek(t);
    check(`phase θ=${theta}, stop=${t}: complex value and stage`, s.recordStage === names[t] && vectorNear(s.recordValue, expected[t]), JSON.stringify(s.recordValue));
    check(`phase θ=${theta}, stop=${t}: modulus and two-entry coherence mass`, near(await readNumber('ro2'), Math.hypot(...expected[t]), 0.00005)
      && near(await readNumber('ro3'), 2 * dot(expected[t], expected[t]), 0.00005));
  }
}
check('two-copy equal-superposition certificate: +1/2 → −1/2 → −i/2 → +1/2',
  phaseStops(45, phaseRecord).every((v, i) => vectorNear(v, [[0.5, 0], [-0.5, 0], [0, -0.5], [0.5, 0]][i])));
await range('theta', 45); await click('[data-ov="zero"]');
for (let t = 0; t <= 3; t++) {
  s = await seek(t);
  check(`zero overlap stop=${t}: premise fails and reversal cannot restore coherence`, vectorNear(s.recordOverlap, overlap(zeroRecord))
    && vectorNear(s.recordValue, phaseStops(45, zeroRecord)[t]) && s.recordStage === names[t] && await text('ro5') === '不成立'
    && /回不来/.test(await text('roNote')));
}
s = await click('[data-ov="unit"]');
check('restoring unimodular records restores the two-copy demonstration', vectorNear(s.recordValue, [0.5, 0])
  && vectorNear(s.recordOverlap, [0, -1]) && await text('ro5') === '成立');

// Real rail controls, including progress and automatic stopping, use state conditions in both frame modes.
await click('[data-preset="dream-precompile"]');
check('compile card starts playback', await until(page, () => { const q = window.DEJAVU_SANDTABLE_DEBUG.state; return q.playing && q.t > 0 && q.t < 1; }));
await page.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.jump(0.99));
check('compile card stops exactly at the first-pass boundary', await until(page, () => {
  const q = window.DEJAVU_SANDTABLE_DEBUG.state; return !q.playing && q.t === 1 && q.pass === 1;
}));
s = await state();
check('compile autoplay ends with the saved mixed state and first-pass gain', matrixNear(s.rho, sigma) && near(s.additionalEntropyBits, H) && !s.cacheHit);
await card('deja-vu-hit', 2); await click('#rew');
check('rewind pauses at the input', (await state()).t === 0 && !(await state()).playing);
await click('[data-speed="2.5"]'); await click('#play');
check('play button advances the rail', await until(page, () => { const q = window.DEJAVU_SANDTABLE_DEBUG.state; return q.playing && q.t > 0; }));
s = await click('#play');
check('pause button retains the current rail position', !s.playing && s.t > 0 && await page.locator('#play').getAttribute('aria-pressed') === 'false');
const pausedAt = s.t;
await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
check('paused clock remains unchanged across delivered frames', near((await state()).t, pausedAt));
await range('now', 2);
check('rail input reaches the second-pass hit', (await state()).cacheHit && (await state()).t === 2);
await page.locator('#now').focus(); await page.keyboard.press('Home'); await settle(page);
check('rail Home goes to zero', (await state()).t === 0);
await page.keyboard.press('End'); await settle(page);
check('rail End goes to the final hit', (await state()).t === 2 && (await state()).cacheHit);
await click('#rew'); await page.locator('#play').focus(); await page.keyboard.press(' ');
check('Space on the play button starts playback', await until(page, () => { const q = window.DEJAVU_SANDTABLE_DEBUG.state; return q.playing && q.t > 0; }));
await page.keyboard.press(' '); await settle(page);
check('Space on the play button pauses playback', !(await state()).playing);
await page.evaluate(() => document.activeElement?.blur());
await page.keyboard.press('u'); await settle(page);
check('U turns on the upgrade', (await state()).logicUpgrade && !(await state()).cacheHit);
await page.keyboard.press('u'); await settle(page);
check('U restores the baseline hit', !(await state()).logicUpgrade && (await state()).cacheHit);
await card('choose-context', 0.9); await click('#play');
check('choose-context stops at the final ruler', await until(page, () => { const q = window.DEJAVU_SANDTABLE_DEBUG.state; return !q.playing && q.t === 1; }));
await settle(page);
s = await state();
check('choose-context final playback weight is 0.9330', near(s.beta, 90) && await text('roKey') === '0.9330');

// Reload through the English URL, then switch language in place without changing the projection state.
await T.goto(BOOK, ID, '?lang=en&preset=deja-vu-hit'); await settle(page);
s = await state();
check('English query: title, stage and cache are translated', !/[\u3400-\u9fff]/u.test(await page.title())
  && /Again/.test(await text('hudBig')) && /HIT.*Untagged Familiarity/s.test(await text('cacheBody'))
  && await page.locator('[data-lang-set="en"]').getAttribute('aria-pressed') === 'true' && s.cacheHit);
const englishState = JSON.stringify(s);
await click('[data-lang-set="zh"]');
check('language switch to Chinese preserves all numerical and cache state', /再投影/.test(await text('hudBig'))
  && /无时间标签的熟悉感/.test(await text('cacheBody')) && JSON.stringify(await state()) === englishState);
await click('[data-lang-set="en"]');
check('language switch back to English preserves the state', /added pinching entropy/.test(await text('roKeyL'))
  && JSON.stringify(await state()) === englishState);
await card('unimodular-reversal', 3); await click('[data-ov="zero"]');
check('English zero-overlap comparison explicitly rejects the premise', await text('ro5') === 'fails' && /nothing comes back/.test(await text('roNote')));

// Both figure cards keep their essential annotation and the upgrade switch on the stage.
const figure = await T.open(BOOK, ID, '?embed=1&lang=en&preset=deja-vu-hit', { viewport: { width: 740, height: 500 }, reducedMotion: 'reduce' });
// A cited card starts playing (from t = 0) at its first in-view report; seek only after that, or the start overwrites the seek.
check('embedded hit figure plays its card once the stage is in view', await until(figure, () => {
  const q = window.DEJAVU_SANDTABLE_DEBUG.state; return q.preset === 'deja-vu-hit' && (q.playing || q.t > 0);
}));
await figure.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.seek(2));
await settle(figure);
const box = await figure.locator('#cacheCard').evaluate((el) => {
  const r = el.getBoundingClientRect(), stage = document.getElementById('stage').getBoundingClientRect();
  return { inside: r.left >= stage.left && r.right <= stage.right && r.top >= stage.top && r.bottom <= stage.bottom, text: el.innerText };
});
check('embedded hit figure: cache entry and familiarity fit on the stage', await figure.locator('#cacheCard').isVisible()
  && box.inside && /Valid: 1/.test(box.text) && /Time_Tag: NULL/.test(box.text) && /HIT.*Untagged Familiarity/s.test(box.text), JSON.stringify(box));
await figure.goto(T.url(BOOK, ID, '?embed=1&lang=en&preset=logic-upgrade-flush'));
await settle(figure);
check('embedded upgrade figure: ON switch is visible and selected', await figure.locator('#upCtl').isVisible()
  && await figure.locator('[data-up="on"]').getAttribute('aria-pressed') === 'true');
await figure.click('[data-up="off"]'); await settle(figure);
const reset = await figure.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state);
check('embedded upgrade figure: OFF restores the saved prior and state', !reset.logicUpgrade && vectorNear(reset.gramBand, windows[2])
  && near(reset.zTarget, 4 / 5) && reset.cacheEntry.valid === 1 && near(reset.additionalEntropyBits, 0));
await figure.context().close();

check('all regression interactions: zero console, page and request errors', T.errors.length === 0, T.errors.join(' | '));

// The hit note may claim only what the saved state and the current ruler give. Ground truth below is the Bloch vector
// of the saved state, r = (0, cos 2θ), projected on n = (sin β, cos β): the entropy from |r|, the outcome weights from
// r·n, the residual from |Δr|²/2 (no page function, no matrix product). The sweep drives the real sliders over the whole
// supported grid (θ = 0…90° in steps of 1°, β = 0…175° in steps of 5°) in both languages; at the pure endpoints
// θ = 0° and 90° a hit has zero state entropy and outcome surprisals 0 and ∞. Then the switch, the learned fact, the
// lookup address, the keyboard, an in-place language change and the narrowest phone width are driven in turn.
{
  const check = T.check, RD = Math.PI / 180, ZERO = 1e-12, errorsAtStart = T.errors.length;
  const h2 = (p) => [p, 1 - p].reduce((sum, x) => (x > 0 ? sum - x * Math.log2(x) : sum), 0);
  const truthAt = (theta, beta, o = {}) => {
    const flush = !!o.flush, addressOk = o.addressOk !== false, b = flush ? 90 : beta;
    const rz = Math.cos(2 * theta * RD), nx = Math.sin(b * RD), nz = Math.cos(b * RD), along = rz * nz;
    const after = [along * nx, along * nz], gap = Math.hypot(after[0], after[1] - rz), unchanged = gap <= ZERO;
    const H = h2((1 + Math.abs(along)) / 2), H0 = h2((1 + Math.abs(rz)) / 2), weights = [(1 + along) / 2, (1 - along) / 2];
    const ofBloch = (x, z) => [[(1 + z) / 2, x / 2], [x / 2, (1 - z) / 2]];
    return {
      theta, beta: b, unchanged, hit: unchanged && !flush && addressOk, H, added: H - H0, mass: gap * gap / 2, weights,
      surprisal: weights.map((p) => (p > 0 ? -Math.log2(p) + 0 : Infinity)), before: ofBloch(0, rz), after: ofBloch(after[0], after[1])
    };
  };
  const close = (A, B) => Array.isArray(A) && A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) <= ZERO));
  const shown = (x) => (Number.isFinite(x) ? (Math.abs(x) < 5e-5 ? '0.0000' : x.toFixed(4)) : '∞');
  const num = (s) => (s.trim() === '∞' ? Infinity : Number(s.replace(/bit/g, '').replaceAll('−', '-').replace('+', '').trim()));
  const pair = (s) => s.replace(/bit/g, '').split('·').map(num);
  const within = (a, b, tol = 5.1e-5) => (Number.isFinite(b) ? Math.abs(a - b) <= tol : a === b);
  // What a note asserts, read from its words in either language: zero or nonzero added entropy, nonzero state quantities,
  // a zero state entropy, surprisals 0 and ∞, and the identity of a ruler or of a labelled outcome.
  const claims = (note) => {
    const n = note.replace(/\s+/g, ' ');
    return {
      addedZero: /新增熵[^；;。]*?(?<![不没非])(都是|是|为)\s*0(?!\.?\d)|added entropy[^;.]*?\b(are|is)\s+0(?!\.?\d)/i.test(n),
      addedNonzero: /新增熵[^；;。]*?(不为|不是|没有变成)\s*0(?!\.?\d)|added entropy[^;.]*?\b(are|is)\s+not\s+0(?!\.?\d)/i.test(n),
      mentionsState: /态熵|state entropy/i.test(n),
      stateNonzero: /(态熵|惊讶度)[^；;。]*?(没有变成|不是|不为|并非)\s*0(?!\.?\d)|(state entropy|surprisal)[^;.]*?\b(are|is|were|was)\s+not\s+0(?!\.?\d)|(state entropy|surprisal)[^;.]*?\bnonzero/i.test(n),
      entropyZero: /态熵[^；;。，,]*?(?<![不没非])(就是|是|为|等于)\s*0(?!\.?\d)|state entropy[^;.,]*?\b(is|was|equals)(\s+already)?\s+0(?!\.?\d)/i.test(n),
      surprisalZeroInf: /惊讶度[^；;。]*?\b0\b[^；;。]*?∞|惊讶度[^；;。]*?∞[^；;。]*?\b0\b|surprisal[^;.]*?\b0\b[^;.]*?∞|surprisal[^;.]*?∞[^;.]*?\b0\b/i.test(n),
      identity: /同一把尺子|同一个算子|same ruler|same operator|same map/i.test(n),
      labelled: /p₊|p₋|同一个结果|same outcome|common outcome/i.test(n)
    };
  };
  const readoutProblems = (r, tr) => {
    const bad = [];
    if (Number(r.inTheta) !== tr.theta || r.theta !== tr.theta || Number(r.inBeta) !== tr.beta || Math.abs(r.beta - tr.beta) > ZERO) bad.push(`controls θ=${r.theta} β=${r.beta}`);
    if (r.t !== 2 || r.pass !== 2) bad.push(`rail t=${r.t}`);
    if (!close(r.before, tr.before) || !close(r.rho, tr.after)) bad.push('matrices');
    if (r.hit !== tr.hit || r.ro5 !== (tr.hit ? 'HIT' : 'MISS')) bad.push(`cache ${r.ro5}, independent ${tr.hit ? 'HIT' : 'MISS'}`);
    if (!within(num(r.ro1), tr.H)) bad.push(`state entropy ${r.ro1} vs ${shown(tr.H)}`);
    if (!within(num(r.key), tr.added) || !within(num(r.ro2), tr.mass)) bad.push(`added ${r.key} / residual ${r.ro2} vs ${shown(tr.added)} / ${shown(tr.mass)}`);
    const s = pair(r.ro3);
    if (s.length !== 2 || !s.every((x, i) => within(x, tr.surprisal[i]))) bad.push(`surprisals ${r.ro3} vs ${tr.surprisal.map(shown).join(' · ')}`);
    const hudNumbers = (r.sub.match(/-?\d+\.\d+/g) || []).map(Number);
    if (!r.sub.includes(`β = ${tr.beta}°`) || !(tr.unchanged ? within(hudNumbers[hudNumbers.length - 1], tr.H, 5.1e-4) : within(hudNumbers[hudNumbers.length - 1], tr.mass)))
      bad.push(`HUD ${r.sub}`);
    return bad;
  };
  const claimProblems = (r, tr) => {
    const c = claims(r.note), bad = [], finitePositive = tr.surprisal.every((x) => Number.isFinite(x) && x > 0);
    const sorted = tr.surprisal.slice().sort((a, b) => a - b);
    if (c.identity) bad.push('names a ruler or operator identity');
    if (c.labelled) bad.push('names a labelled outcome');
    if (c.addedZero && !(Math.abs(tr.added) <= ZERO && tr.mass <= ZERO)) bad.push(`claims zero added entropy and residual; independent ${tr.added}, ${tr.mass}`);
    if (c.addedNonzero && !(tr.added > ZERO && tr.mass > ZERO)) bad.push(`claims nonzero added entropy and residual; independent ${tr.added}, ${tr.mass}`);
    if (c.stateNonzero && !(tr.H > 0 && finitePositive)) bad.push(`claims nonzero state entropy and surprisals; independent H = ${shown(tr.H)} bit, surprisals ${tr.surprisal.map(shown).join(' · ')}`);
    if (c.entropyZero && tr.H !== 0) bad.push(`claims zero state entropy; independent H = ${tr.H}`);
    if (c.surprisalZeroInf && !(sorted[0] === 0 && sorted[1] === Infinity)) bad.push(`claims surprisals 0 and ∞; independent ${tr.surprisal.map(shown).join(' · ')}`);
    if (c.stateNonzero && (c.entropyZero || c.surprisalZeroInf)) bad.push('contradicts itself');
    if (c.stateNonzero && (r.ro1.startsWith('0.0000') || r.ro3.includes('∞') || /(^|· )0\.0000/.test(r.ro3))) bad.push(`contradicts the readouts ${r.ro1} | ${r.ro3}`);
    if (c.entropyZero && !r.ro1.startsWith('0.0000')) bad.push(`contradicts the readout ${r.ro1}`);
    if (tr.hit && !(c.addedZero && c.mentionsState)) bad.push('a hit note must keep the added entropy apart from the state entropy');
    return bad;
  };
  const readRow = (p) => p.evaluate(() => {
    const q = window.DEJAVU_SANDTABLE_DEBUG.state, el = (id) => document.getElementById(id), t = (id) => el(id).innerText;
    return { theta: q.theta, beta: q.beta, t: q.t, pass: q.pass, hit: q.cacheHit, rho: q.rho, before: q.before, inTheta: el('theta').value, inBeta: el('beta').value,
      note: t('roNote'), ro1: t('ro1'), ro2: t('ro2'), ro3: t('ro3'), ro5: t('ro5'), key: t('roKey'), sub: t('hudSub') };
  });
  const sweepRow = (p, theta, betas) => p.evaluate(async ([th, bs]) => {
    const kit = window.TRV.kit; if (kit.ready) await kit.ready();
    const el = (id) => document.getElementById(id), t = (id) => el(id).innerText;
    const set = (id, v) => { el(id).value = String(v); el(id).dispatchEvent(new Event('input', { bubbles: true })); kit.flush(); };
    set('theta', th);
    return bs.map((b) => {
      set('beta', b);
      const q = window.DEJAVU_SANDTABLE_DEBUG.state;
      return { theta: q.theta, beta: q.beta, t: q.t, pass: q.pass, hit: q.cacheHit, rho: q.rho, before: q.before, inTheta: el('theta').value, inBeta: el('beta').value,
        note: t('roNote'), ro1: t('ro1'), ro2: t('ro2'), ro3: t('ro3'), ro5: t('ro5'), key: t('roKey'), sub: t('hudSub') };
    });
  }, [theta, betas]);

  const thetas = Array.from({ length: 91 }, (_, k) => k), betas = Array.from({ length: 36 }, (_, k) => 5 * k);
  const independentHits = [], pureHits = [], observedHits = { zh: [], en: [] };
  for (const theta of thetas) for (const beta of betas) {
    const tr = truthAt(theta, beta);
    if (tr.hit) { independentHits.push(`${theta},${beta}`); if (tr.H === 0) pureHits.push(`${theta},${beta}`); }
  }
  for (const lang of ['zh', 'en']) {
    const p = await T.open(BOOK, ID, `?lang=${lang}&preset=deja-vu-hit`, { locale: lang === 'en' ? 'en-US' : 'zh-CN' });
    await settle(p);
    for (const theta of thetas) {
      const rows = await sweepRow(p, theta, betas), readouts = [], notes = [];
      rows.forEach((r, k) => {
        const tr = truthAt(theta, betas[k]);
        if (r.hit) observedHits[lang].push(`${r.theta},${r.beta}`);
        const a = readoutProblems(r, tr), b = claimProblems(r, tr);
        if (a.length) readouts.push(`β=${betas[k]}°: ${a.join('; ')}`);
        if (b.length) notes.push(`β=${betas[k]}°: ${b.join('; ')} | ${r.note}`);
      });
      check(`R-A sweep ${lang} θ=${theta}°: cache verdict, matrices and readouts equal the Bloch computation for all 36 rulers`, readouts.length === 0, readouts.slice(0, 3).join(' || '));
      check(`R-A sweep ${lang} θ=${theta}°: every claim of the note about added entropy, state entropy and surprisals holds for all 36 rulers`, notes.length === 0, notes.slice(0, 3).join(' || '));
    }
    await p.context().close();
  }
  check('R-A domain: 91 × 36 = 3276 supported states; the hits are β = 0° or θ = 45° (126 states); only (0°, 0°) and (90°, 0°) are pure; both languages show exactly this hit set',
    independentHits.length === 126 && JSON.stringify(pureHits) === JSON.stringify(['0,0', '90,0'])
    && independentHits.every((k) => { const [th, b] = k.split(',').map(Number); return b === 0 || th === 45; })
    && JSON.stringify(observedHits.zh) === JSON.stringify(independentHits) && JSON.stringify(observedHits.en) === JSON.stringify(independentHits),
  `${independentHits.length} ${pureHits.join(' ')} ${observedHits.zh.length} ${observedHits.en.length}`);

  // Precedence: the card, the keyboard on the sliders, the switch and the learned fact, the lookup address, a language
  // change in place. Each step is compared with its own independent state.
  const press = async (p, selector, key, n = 1) => {
    await p.focus(selector); for (let k = 0; k < n; k++) await p.keyboard.press(key);
    await p.evaluate(() => document.activeElement?.blur()); await settle(p); return readRow(p);
  };
  const tap = async (p, selector) => { await p.click(selector); await settle(p); return readRow(p); };
  const lookup = async (p, a) => { await p.evaluate((v) => window.DEJAVU_SANDTABLE_DEBUG.setAddress(v), a); await settle(p); return readRow(p); };
  const step = (label, r, tr, ok) => {
    const bad = [...readoutProblems(r, tr), ...claimProblems(r, tr)];
    check(`R-A precedence: ${label}`, bad.length === 0 && ok, `${bad.join('; ')} | ${r.ro1} | ${r.ro3} | ${r.note}`);
  };
  const pageP = await T.open(BOOK, ID, '?lang=zh&preset=deja-vu-hit');
  await settle(pageP);
  let r = await readRow(pageP);
  step('card θ = 30°, β = 0° (interior hit): the state quantities stay nonzero and the note says so', r, truthAt(30, 0), r.hit && claims(r.note).stateNonzero);
  r = await press(pageP, '#theta', 'Home');
  step('Home on θ → 0° (pure endpoint hit): H = 0, surprisals 0 · ∞, no nonzero claim', r, truthAt(0, 0),
    r.hit && r.ro1 === '0.0000 bit' && r.ro3 === '0.0000 · ∞ bit' && !claims(r.note).stateNonzero);
  r = await tap(pageP, '[data-up="on"]');
  step('switch ON with the distinguishing fact at θ = 0°: flush, β = 90°, the state changes, MISS', r, truthAt(0, 90, { flush: true }), !r.hit && r.ro5 === 'MISS');
  r = await tap(pageP, '[data-fact="dup"]');
  step('redundant fact while ON: β back to 0°, hit at the pure endpoint again', r, truthAt(0, 0), r.hit && !claims(r.note).stateNonzero);
  r = await press(pageP, '#beta', 'ArrowRight');
  step('ArrowRight on β → 5° at θ = 0°: the state changes, MISS', r, truthAt(0, 5), !r.hit);
  await press(pageP, '#beta', 'ArrowLeft');
  r = await lookup(pageP, 'event-1');
  step('address mismatch at the pure endpoint: MISS with the state kept', r, truthAt(0, 0, { addressOk: false }), !r.hit && r.ro5 === 'MISS');
  await lookup(pageP, 'event-0');
  r = await press(pageP, '#theta', 'End');
  step('End on θ → 90° (the other pure endpoint): H = 0, surprisals ∞ · 0, no nonzero claim', r, truthAt(90, 0),
    r.hit && r.ro1 === '0.0000 bit' && r.ro3 === '∞ · 0.0000 bit' && !claims(r.note).stateNonzero);
  const zhState = JSON.stringify(await pageP.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state));
  r = await tap(pageP, '[data-lang-set="en"]');
  step('language switched in place at θ = 90°: same state, English note, still no nonzero claim', r, truthAt(90, 0),
    r.hit && !/[㐀-鿿]/u.test(r.note) && !claims(r.note).stateNonzero
    && JSON.stringify(await pageP.evaluate(() => window.DEJAVU_SANDTABLE_DEBUG.state)) === zhState);
  await press(pageP, '#theta', 'ArrowLeft', 45);
  r = await press(pageP, '#beta', 'ArrowRight', 18);
  step('θ = 45°, β = 90° by arrow keys (mixed I/2 alias): hit, H = 1 and both surprisals 1, no ruler identity', r, truthAt(45, 90),
    r.hit && within(num(r.ro1), 1) && r.ro3 === '1.0000 · 1.0000 bit' && claims(r.note).stateNonzero);
  r = await tap(pageP, '[data-fact="novel"]');
  step('distinguishing fact at the I/2 alias: flush, MISS although the state is kept', r, truthAt(45, 90, { flush: true }), !r.hit && claims(r.note).addedZero);
  r = await tap(pageP, '[data-up="off"]');
  step('switch OFF at θ = 45°: β = 0°, hit again on the mixed state', r, truthAt(45, 0), r.hit && claims(r.note).stateNonzero);
  await pageP.context().close();

  // The narrowest phone width keeps the endpoint note inside the page without sideways scrolling.
  for (const lang of ['zh', 'en']) {
    const narrow = await T.open(BOOK, ID, `?lang=${lang}&preset=deja-vu-hit`, { viewport: { width: 334, height: 720 }, locale: lang === 'en' ? 'en-US' : 'zh-CN' });
    await settle(narrow);
    for (const [key, theta] of [['Home', 0], ['End', 90]]) {
      const q = await press(narrow, '#theta', key);
      const g = await narrow.evaluate(() => {
        const el = document.getElementById('roNote'), b = el.getBoundingClientRect();
        return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, left: b.left, right: b.right, width: innerWidth };
      });
      const bad = [...readoutProblems(q, truthAt(theta, 0)), ...claimProblems(q, truthAt(theta, 0))];
      check(`R-A ${lang} 334 px, θ = ${theta}°: endpoint hit note true and inside the width`, bad.length === 0 && q.hit && g.overflow <= 0
        && g.left >= 0 && g.right <= g.width && await narrow.locator('#roNote').isVisible(), `${bad.join('; ')} ${JSON.stringify(g)} | ${q.note}`);
    }
    await narrow.context().close();
  }
  check('R-A checks: zero console, page and request errors', T.errors.length === errorsAtStart, T.errors.slice(errorsAtStart).join(' | '));
}
await T.finish();
