// CLOCK//DILATION browser regression: the shared stage-first gate (with the lit-solid checks), then every control and
// every property the page claims, checked against an independent computation written here (hyperbolic rapidities,
// cross products, brute-force lattice counts, Gaussian elimination), never by calling the page's functions.
// Run directly with node; VIZ_PHASE1=1 skips the repeated card and still matrix; VIZ_SLOW_FRAMES=1000 delivers
// animation frames a second apart to flush out fixed waits.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until, stageView, cjkLeftovers, overflowX, labelOverlaps, routeLocalFonts } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'universal-clock-gravity-dilation-sandbox';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = path.resolve(HERE, '..', ID);
const REGISTRY = path.resolve(HERE, '..', 'visualizations.json');
const PHASE1 = process.env.VIZ_PHASE1 === '1';

/* ---------- the contract of the five cards ---------- */
const CARDS = {
  'light-cone-precision-floor': { scene: 'cone', N: 20, beta: 0, eta: 0, drive: 'eta', sub: false, max: 20, rate: 1, notes: ['317', '0.0500'] },
  'kinematic-address-split': { scene: 'clocks', N: 20, beta: 0.8, eta: 0, drive: 'beta', sub: false, max: 10, rate: 0.6, notes: ['0.80', '64.0%', '0.6000'] },
  'holographic-mass-load': { scene: 'clocks', N: 20, beta: 0, eta: 0.4, drive: 'eta', sub: false, max: 10, rate: Math.sqrt(0.6), notes: ['2.50', '0.400', '40.0%', '0.7746'] },
  'equivalence-dual-flywheel': { scene: 'clocks', N: 20, beta: 0.6, eta: 0.36, drive: 'both', sub: true, max: 10, rate: 0.64, notes: ['59.04%', '0.6400', '1.0000'] },
  'horizon-saturation-lock': { scene: 'clocks', N: 20, beta: 0, eta: 1, drive: 'eta', sub: false, max: 10, rate: 0, notes: ['1.000', '100%', '0.0000'] }
};
const GIDS = [
  'D5/S0/Certificates/MinkowskiNullConeRigidity.eq_smul_minkowski_of_null',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_time_lower_bound',
  'D5/S3/QuantumBounds/FubiniStudyRecordTime.record_count_upper_bound',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Bogoliubov/BogoliubovNormConservation.bogoliubov_norm_conservation'
];
const SECTION = 'ch39-s08-universal-clock-and-gravitational-dilation.html#sec-ch39-universal-clock-and-gravitational-dilation';
const near = (a, b, tol = 1e-12) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/* ---------- independent mathematics ---------- */
/** The rate as the product of a gravitational and a kinematic Lorentz factor, both through rapidities:
    1/(cosh r_v · cosh r_g) with tanh r_v = β and tanh r_g = √η. */
function rateOf(eta, beta) {
  const atanh = (x) => 0.5 * Math.log((1 + x) / (1 - x));
  return 1 / (Math.cosh(atanh(beta)) * Math.cosh(atanh(Math.sqrt(eta))));
}
/** The three channels, expanded by hand: η, β² − ηβ², 1 − η − β² + ηβ². */
const channels = (eta, beta) => ({ background: eta, motion: beta * beta - eta * beta * beta, self: 1 - eta - beta * beta + eta * beta * beta });
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm2 = (a) => a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
/** Lattice nodes (i, j) with i² + j² ≤ (N/2)², counted by brute force; with t, those whose echo is back (2d ≤ t). */
function nodesWithin(N, t = Infinity) {
  let n = 0;
  for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) { const d = Math.hypot(i, j); if (d <= N / 2 + 1e-12 && 2 * d <= t + 1e-9) n++; }
  return n;
}
/** Rank of a real matrix by Gaussian elimination with partial pivoting. */
function rank(rows, tol = 1e-10) {
  const A = rows.map((r) => r.slice()), m = A.length, n = A[0].length;
  let r = 0;
  for (let c = 0; c < n && r < m; c++) {
    let p = r; for (let i = r + 1; i < m; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
    if (Math.abs(A[p][c]) < tol) continue;
    [A[r], A[p]] = [A[p], A[r]];
    for (let i = r + 1; i < m; i++) { const f = A[i][c] / A[r][c]; for (let j = c; j < n; j++) A[i][j] -= f * A[r][j]; }
    r++;
  }
  return r;
}
const NULL_ROWS = Array.from({ length: 12 }, (_, k) => { const a = 2 * Math.PI * k / 12, c = Math.cos(a), s = Math.sin(a); return [1, c * c, s * s, c, s, c * s]; });

function checkMath(s, tag) {
  const { check } = T;
  const rate = rateOf(s.eta, s.beta), ch = channels(s.eta, s.beta);
  check(`${tag}: both master wheels run at ν₀ = 1 and stand at the same angle`, s.nuA === 1 && s.nuB === 1 && s.masterAngleA === s.masterAngleB && near(s.masterAngleA, 2 * Math.PI * s.t, 1e-9));
  check(`${tag}: dτ/dt = √((1 − η)(1 − β²)) (independent: 1/(cosh r_v cosh r_g))`, near(s.B.rate, rate, 1e-12), `${s.B.rate} vs ${rate}`);
  check(`${tag}: A is the unloaded reference, dτ/dt = 1`, near(s.A.rate, 1, 0) && near(s.A.load, 0, 0));
  check(`${tag}: the three channels and their Pythagorean sum`, near(s.B.background, ch.background, 1e-14) && near(s.B.motion, ch.motion, 1e-14) && near(s.B.self, ch.self, 1e-14)
    && near(s.B.sum, 1, 1e-14) && near(ch.background + ch.motion + ch.self, 1, 1e-14) && near(s.B.load, 1 - rate * rate, 1e-12));
  const u = [0, 0, 1], v = s.axisB;
  check(`${tag}: the axis of B is a unit vector whose upright part is the rate and whose wedge with the time axis is the load`,
    near(norm2(v), 1, 1e-12) && near(v[2], rate, 1e-12) && near(norm2(cross(u, v)), s.B.load, 1e-12));
  const I = s.leanInstances;
  check(`${tag}: Lagrange instance (Σu²)(Σv²) − (u·v)² = wedge², both sides equal the load`, near(I.lagrange.lhs, norm2(cross(u, s.budgetAxis)), 1e-12) && near(I.lagrange.rhs, I.lagrange.lhs, 1e-12) && near(I.lagrange.rhs, ch.background + ch.motion, 1e-12));
  if (s.beta < 1) {
    const r = 0.5 * Math.log((1 + s.beta) / (1 - s.beta)), c = (Math.exp(r) + Math.exp(-r)) / 2, sh = (Math.exp(r) - Math.exp(-r)) / 2;
    check(`${tag}: rapidity instance cosh² r − sinh² r = 1 and 1/cosh r = √(1 − β²)`, near(I.rapidity.r, r, 1e-12) && near(I.rapidity.cosh, c, 1e-12) && near(I.rapidity.sinh, sh, 1e-12)
      && near(I.rapidity.identity, 1, 1e-12) && near(1 / c, Math.sqrt(1 - s.beta * s.beta), 1e-12) && near(I.rapidity.rate, 1 / c, 1e-12));
  }
  check(`${tag}: frames A = ⌊ν₀t⌋, B = ⌊(dτ/dt)ν₀t⌋`, near(s.tauA, s.t, 1e-12) && near(s.tauB, rate * s.t, 1e-11) && s.framesA === Math.floor(s.t + 1e-9) && s.framesB === Math.floor(rate * s.t + 1e-9));
  check(`${tag}: background arcs round(20η), address hops ⌊βν₀t⌋`, s.arcs === Math.round(20 * s.eta) && s.hops === Math.floor(s.beta * s.t + 1e-9));
  if (s.sphere) {
    const d = Math.hypot(...s.sphere.centre.map((x, k) => x - s.sphere.wheelB[k]));
    check(`${tag}: the holographic sphere stands at the true ratio r/r_s = 1/η`, near(d / s.sphere.radius, 1 / s.eta, 1e-9) && near(s.rOverRs, 1 / s.eta, 1e-12));
  }
  if (rate > 0) check(`${tag}: every sub-clock of B scales by dτ/dt, the ratio of ratios is 1`, s.subclocks.scale.every((x) => near(x, rate, 1e-12)) && near(s.subclocks.ratioOfRatios, 1, 1e-12)
    && near(s.subclocks.innerA, 2 / 0.25, 1e-12) && near(s.subclocks.innerB, 2 / 0.25, 1e-12));
  // the light-cone window, from the lattice and the record bound
  const N = s.N;
  check(`${tag}: window N, R_max = N/2, ε = 1/N and the interior count (brute force)`, s.cone.N === N && near(s.cone.Rmax, N / 2, 0) && near(s.cone.eps, 1 / N, 1e-15) && s.cone.interior === nodesWithin(N));
  check(`${tag}: verified nodes are those with 2d ≤ ν₀t`, s.cone.verified === nodesWithin(N, s.scene === 'cone' ? s.t : N));
  check(`${tag}: record bound N ≤ 4ET/(πħ) with E = π/4, ħ = 1, T = N`, near(s.cone.bound, 4 * (Math.PI / 4) * N / Math.PI, 1e-12) && s.cone.N <= s.cone.bound + 1e-12);
  check(`${tag}: record-time instance: both Fubini–Study angles are π/4, τ ≥ πħ/(4E) = 1`, near(I.record.angle0, Math.acos(Math.SQRT1_2), 1e-15) && near(I.record.angle1, Math.PI / 4, 1e-12)
    && I.record.orthogonality === 0 && near(I.record.tauMin, 1, 1e-15) && near(I.record.speedAtTauMin, Math.PI / 4, 1e-15));
  check(`${tag}: null-cone forms: rank 5 of 6, the one solution ∝ t² − x² − y²`, rank(NULL_ROWS) === 5 && I.nullCone.nullity === 1
    && I.nullCone.form.every((x, k) => near(x, [1, -1, -1, 0, 0, 0][k], 1e-9)) && NULL_ROWS.every((r) => near(r[0] - r[1] - r[2], 0, 1e-15))
    && near(I.nullCone.rateFromForm, Math.sqrt(1 - s.beta * s.beta), 1e-9));
}

const T = await session();
const { page, check } = T;

/* ---------- source contract (no browser) ---------- */
{
  const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8'), css = fs.readFileSync(path.join(DIR, 'style.css'), 'utf8'), js = fs.readFileSync(path.join(DIR, 'main.js'), 'utf8');
  const reg = JSON.parse(fs.readFileSync(REGISTRY, 'utf8')).visualizations.find((v) => v.id === ID) || {};
  check('registry: live, chapter 39 §39.8, code CLOCK//DILATION', reg.status === 'live' && reg.chapter === 39 && reg.section === '39.8' && reg.code === 'CLOCK//DILATION');
  check('registry: the five cards in order', same(reg.presets, Object.keys(CARDS)));
  check('registry: exactly the five cited theorems', same((reg.lean || []).map((l) => l.gid), GIDS));
  check('registry: theory points at §39.8 in both languages', reg.theory && reg.theory[0].href === `../zh/${SECTION}` && reg.theory[0].href_en === `../en/${SECTION}`);
  check('page: every card carries data-still in the source', Object.keys(CARDS).every((c) => new RegExp(`data-preset="${c}" data-still="end"`).test(html)));
  check('page: as many Chinese as English fragments', (html.match(/class="[^"]*\bzh\b/g) || []).length === (html.match(/class="[^"]*\ben\b/g) || []).length);
  check('page: the drawer links §39.8 in both languages', html.includes(`../../zh/${SECTION}`) && html.includes(`../../en/${SECTION}`));
  check('no colour literals and no palette switch in the page sources', ![html, css, js].some((src) => /#[0-9a-fA-F]{3,8}\b|rgba?\(\s*\d|hsla?\(\s*\d/.test(src.replace(/&#\d+;/g, '')))
    && ![html, css, js].some((src) => /data-tr-palette|trPalette|prefers-color-scheme/.test(src)));
  check('style.css does not override the grid columns of the lab', !/grid-template-columns/.test(css) && !/\.app\.lab\s*\{/.test(css));
  // identifiers of tools and vendors kept encoded, so that this file passes the same scan
  const banned = ['Q2xhdWRl', 'T3B1cw==', 'U29ubmV0', 'R1BU', 'Q29kZXg=', 'R2VtaW5p', 'RGVlcE1pbmQ=', 'QW50aHJvcGlj', 'T3BlbkFJ', 'TExN', 'QUk=', 'YWdlbnQ=', '5Lq65bel5pm66IO9', '5aSn5qih5Z6L', '5pm66IO95L2T']
    .map((b) => Buffer.from(b, 'base64').toString('utf8'));
  const scan = (src) => banned.filter((w) => (/^[\x00-\x7f]+$/.test(w) ? new RegExp(`\\b${w}\\b`, 'i').test(src) : src.includes(w)));
  const own = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const hits = [html, css, js, own, JSON.stringify(reg)].flatMap(scan);
  check('no tool or vendor identifiers in the page, its test or its registry entry', hits.length === 0, hits.join(', '));
}

/* ---------- the night console stays: no palette attribute in a light colour scheme either ---------- */
{
  const ctx = await T.browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'light' });
  await routeLocalFonts(ctx, T.origin);
  const p = await ctx.newPage();
  await p.addInitScript(() => { window.__paletteWrites = 0; new MutationObserver((r) => { window.__paletteWrites += r.length; }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-tr-palette'] }); });
  await p.goto(T.url(BOOK, ID, '?lang=zh'), { waitUntil: 'load' }); await settle(p, 300);
  check('light colour scheme: no data-tr-palette is written', await p.evaluate(() => document.documentElement.dataset.trPalette === undefined && window.__paletteWrites === 0));
  await ctx.close();
}

// The shared gate: desktop, English, short screens, embed, rail, frames, cited figure, still, phone, cover, motion,
// plus the lit solid (opaque share, light and shade, turning, marks, the WebGL context resting inside a book).
await stageFirstChecks(T, BOOK, ID, { solid: true, cards: !PHASE1 });

// Keep the deck identity, theory entry point and numerical colours aligned with the shared shell.
{
  const shell = await page.evaluate(() => {
    const deck = document.querySelector('aside.col.deck#rail');
    const evidence = document.querySelector('#evidence');
    const info = document.querySelector('#infoBtn');
    const footer = document.querySelector('footer.rail');
    const probe = document.createElement('span');
    probe.style.color = 'var(--amber)'; document.body.appendChild(probe);
    const amber = getComputedStyle(probe).color; probe.remove();
    const readouts = [...document.querySelectorAll('output, dl.ro dd, dl.ro dd *')];
    return {
      rail: !!deck && document.querySelectorAll('#rail').length === 1 && !!footer && footer.id !== 'rail',
      info: !!info && document.querySelectorAll('#infoBtn').length === 1 && evidence?.firstElementChild === info,
      neutral: readouts.length > 0 && readouts.every((el) => getComputedStyle(el).color !== amber)
    };
  });
  check('shell: the only #rail identifies the left deck; the transport uses footer.rail', shell.rail);
  check('shell: the only #infoBtn is the first child of #evidence', shell.info);
  check('tokens: ordinary numerical outputs and readouts never use amber', shell.neutral);
}

/* ---------- helpers ---------- */
const state = (p = page) => p.evaluate(() => window.CLOCK_DILATION_DEBUG.state);
async function input(selector, value, p = page) {
  await p.locator(selector).evaluate((el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, value);
  await settle(p);
}
async function pause(p = page) {
  await settle(p);
  await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(p);
}
/** Pick a card as a reader does, wait for its state, pause, and put the rail on its end. */
async function pick(card, p = page) {
  await p.click(`[data-preset="${card}"]`);
  const ok = await until(p, (q) => { const s = window.CLOCK_DILATION_DEBUG.state; return s.preset === q.id && s.scene === q.scene && Math.abs(s.beta - q.beta) < 1e-12 && Math.abs(s.eta - q.eta) < 1e-12; }, { id: card, ...CARDS[card] });
  await pause(p);
  await input('#now', CARDS[card].max, p);
  return ok;
}

await page.goto(T.url(BOOK, ID, '?lang=zh'), { waitUntil: 'load' }); await settle(page, 400);

/* ---------- the page opens on the default card at its still ---------- */
{
  const s = await state();
  check('opens on holographic-mass-load at ν₀t = 10, paused', s.preset === 'holographic-mass-load' && s.scene === 'clocks' && near(s.t, 10, 0) && !s.playing && near(s.eta, 0.4, 0) && near(s.beta, 0, 0));
  check('the default reads dτ/dt = 0.7746 (√0.60) and 7.75 frames of B', (await page.textContent('#roKey')).trim() === '0.7746' && near(s.B.rate, Math.sqrt(0.6), 1e-15) && near(s.tauB, 10 * Math.sqrt(0.6), 1e-12));
  checkMath(s, 'default');
}

/* ---------- every card: its state, the mathematics, the layout ---------- */
for (const [card, c] of Object.entries(CARDS)) {
  check(`${card}: the card applies`, await pick(card));
  const s = await state();
  check(`${card}: scene ${c.scene}, β = ${c.beta}, η = ${c.eta}, N = ${c.N}, drive ${c.drive}, sub-clocks ${c.sub ? 'on' : 'off'}`,
    s.scene === c.scene && s.beta === c.beta && s.eta === c.eta && s.N === c.N && s.drive === c.drive && s.sub === c.sub && near(s.max, c.max, 0));
  check(`${card}: dτ/dt = ${c.rate.toFixed(4)}`, near(s.B.rate, c.rate, 1e-15));
  checkMath(s, card);
  const view = await stageView(page, '#stage', false), overlaps = await labelOverlaps(page, '.stage .tag', 0);
  check(`${card}: stage layout, HUD and labels`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0, [...view.layout, ...view.hud, ...overlaps.map((o) => JSON.stringify(o))].join(' | '));
  const note = await page.textContent('#presetNote');
  check(`${card}: the Chinese note names ${c.notes.join(', ')}`, c.notes.every((x) => note.includes(x)), note);
}
{
  await pick('kinematic-address-split');
  const s = await state();
  check('kinematic: ν₀ A = B = 1.000, β² = 64.0%, dτ/dt = 0.6000, frames 10 / 6', near(s.B.motion, 0.64, 1e-15) && s.framesA === 10 && s.framesB === 6 && (await page.textContent('#roKey')).trim() === '0.6000');
  await pick('holographic-mass-load');
  const h = await state();
  check('holographic: r = 2.50 r_s, η = 40.0%, √0.60 = 0.774597, 8 of 20 slots pierced', near(h.rOverRs, 2.5, 1e-12) && near(h.B.background, 0.4, 0) && near(h.B.rate, 0.7745966692414834, 1e-15) && h.arcs === 8 && h.slots === 20);
  await pick('equivalence-dual-flywheel');
  const e = await state();
  check('equivalence: load 59.04%, dτ/dt = √(0.64 × 0.64) = 0.6400, local ratio 1.0000', near(e.B.load, 0.5904, 1e-12) && near(e.B.rate, Math.sqrt(0.64 * 0.64), 1e-15) && near(e.subclocks.ratioOfRatios, 1, 1e-12)
    && near(e.B.background + e.B.motion + e.B.self, 0.36 + 0.64 * 0.36 + 0.64 * 0.64, 1e-15));
  check('equivalence: the OPEN box on gravity dynamics is in #evidence, not painted on the stage', await page.evaluate(() => {
    const box = [...document.querySelectorAll('#evidence .lean.open')].find((b) => /gravity-dynamics-and-coupling/.test(b.innerHTML));
    return !!box && !document.querySelector('#stage .lean');
  }));
  await pick('horizon-saturation-lock');
  const z = await state();
  check('horizon: η = 1, dτ/dt = 0.0000, B frozen at 0 frames while A completes 10, all 20 slots pierced', z.eta === 1 && z.B.rate === 0 && z.framesB === 0 && z.framesA === 10 && z.arcs === 20 && near(z.masterAngleB, 20 * Math.PI, 1e-9));
  await pick('light-cone-precision-floor');
  const l = await state();
  check('light cone: N = 20, ε = 0.0500, R_max = 10, 317 / 317 verified at the echo', l.cone.N === 20 && near(l.cone.eps, 0.05, 1e-15) && l.cone.Rmax === 10 && l.cone.interior === 317 && l.cone.verified === 317
    && (await page.textContent('#roKey')).trim() === '0.0500');
  await input('#now', 10);
  check('light cone: at ν₀t = 10 only the nodes within 5 spacings are verified', (await state()).cone.verified === nodesWithin(20, 10));
}

/* ---------- the clock: a card click plays, Space pauses, ▶ advances ---------- */
check('card click plays the rail', await playsAfter(page, () => page.click('[data-preset="kinematic-address-split"]'), () => window.CLOCK_DILATION_DEBUG.state));
await pause();
check('▶ advances the rail', await playsAfter(page, () => page.click('#play'), () => window.CLOCK_DILATION_DEBUG.state));
await pause();
{
  const a = await state();
  check('while it plays the two master wheels never differ', near(a.masterAngleA, a.masterAngleB, 0));
}

/* ---------- controls ---------- */
await pick('holographic-mass-load');
await input('#beta', 0.5);
{
  const s = await state();
  check('β slider: leaves the card and sets β', s.preset === null && near(s.beta, 0.5, 1e-12)); checkMath(s, 'β = 0.5');
}
await input('#eta', 0.25);
{ const s = await state(); check('η slider sets η', near(s.eta, 0.25, 1e-12)); checkMath(s, 'η = 0.25, β = 0.5'); }
await page.click('#sceneChips [data-scene="cone"]'); await settle(page);
await input('#nTicks', 30);
{
  const s = await state();
  check('scene chip and N slider: the cone with N = 30, rail max 30, ε = 1/30', s.scene === 'cone' && s.N === 30 && near(s.max, 30, 0) && near(s.cone.eps, 1 / 30, 1e-15) && s.cone.interior === nodesWithin(30));
}
await page.click('#sceneChips [data-scene="clocks"]'); await settle(page);
check('scene chip back to the flywheels: rail max 10', (await state()).scene === 'clocks' && near((await state()).max, 10, 0));
{
  const before = await state();
  await page.click('#lensChips [data-lens="phys"]'); await settle(page);
  const after = await state(), big = await page.textContent('#hudBig');
  check('lens: physics reading relabels the HUD, the state stays', after.lens === 'phys' && /rs\/r/.test(big) && near(after.B.rate, before.B.rate, 0) && near(after.eta, before.eta, 0)
    && (await page.getAttribute('#lensChips [data-lens="phys"]', 'aria-pressed')) === 'true' && (await page.getAttribute('#lensChips [data-lens="clock"]', 'aria-pressed')) === 'false');
  await page.click('#lensChips [data-lens="clock"]'); await settle(page);
  check('lens: back to the comparison-clock reading', (await state()).lens === 'clock' && /ν₀/.test(await page.textContent('#hudBig')));
}
await page.click('#subChips [data-sub="on"]'); await settle(page);
check('sub-clock chips show the three sub-clocks', (await state()).sub === true);
await page.click('#subChips [data-sub="off"]'); await settle(page);

/* ---------- the handle: drag the axis of B (η, then β), then the reception event of the cone ---------- */
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
async function drag(targetFn, arg, tag) {
  const before = await state(), h = await page.evaluate(() => window.CLOCK_DILATION_DEBUG.handleBox());
  const q = await page.evaluate(({ fn, a }) => window.CLOCK_DILATION_DEBUG[fn](...a), { fn: targetFn, a: arg });
  check(`${tag}: the handle is shown on its anchor`, !!h && await page.locator('#handle').isVisible());
  if (!h || !q) return null;
  await page.mouse.move(h.x, h.y); await page.mouse.down();
  check(`${tag}: pointerdown enters dragging`, await page.locator('#handle').evaluate((el) => el.classList.contains('dragging')));
  await page.mouse.move(q.x, q.y, { steps: 8 }); await page.mouse.up(); await settle(page);
  const after = await state();
  check(`${tag}: the camera did not turn and the drag ended`, same(after.camera, before.camera) && !(await page.locator('#handle').evaluate((el) => el.classList.contains('dragging'))));
  return after;
}
await pick('holographic-mass-load');
{
  const a = await drag('tipPoint', [0.7, 0], 'drag η');
  if (a) { check('drag η: the tip under the pointer sets η ≈ 0.70', Math.abs(a.eta - 0.7) <= 0.012 && a.beta === 0, `η = ${a.eta}`); checkMath(a, 'after drag η'); }
}
await pick('kinematic-address-split');
{
  const a = await drag('tipPoint', [0, 0.5], 'drag β');
  if (a) { check('drag β: the tip under the pointer sets β ≈ 0.50', Math.abs(a.beta - 0.5) <= 0.012 && a.eta === 0, `β = ${a.beta}`); checkMath(a, 'after drag β'); }
}
await pick('light-cone-precision-floor');
{
  const a = await drag('apexPoint', [14], 'drag N');
  if (a) check('drag N: the reception event under the pointer sets N = 14, ε = 1/14, 149 nodes', a.N === 14 && near(a.cone.eps, 1 / 14, 1e-15) && a.cone.interior === nodesWithin(14) && a.cone.interior === 149, `N = ${a.N}`);
}
await pick('holographic-mass-load');
await page.focus('#handle'); await page.keyboard.press('ArrowUp'); await settle(page);
check('keyboard on the handle: ArrowUp raises η by 0.01', near((await state()).eta, 0.41, 1e-12));

/* ---------- English: the notes carry the same numbers ---------- */
await page.click('[data-lang-set="en"]'); await settle(page);
for (const [card, c] of Object.entries(CARDS)) {
  await pick(card);
  const note = await page.textContent('#presetNote');
  check(`${card}: the English note names ${c.notes.join(', ')}`, c.notes.every((x) => note.includes(x)) && !/[㐀-鿿]/.test(note), note);
  if (!PHASE1) check(`${card}: no Chinese left on the English page`, (await cjkLeftovers(page)).length === 0);
}
await page.click('[data-lang-set="zh"]'); await settle(page);

/* ---------- every card as a chapter cites it: 390 and 740 wide, both languages ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) for (const width of [390, 740]) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: { width, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
  await settle(p, 300);
  const s = await state(p), tag = `figure ${lang}/${card}/${width}`;
  check(`${tag}: opens on the card, parked at its still`, s.preset === card && !s.playing && near(s.t, CARDS[card].max, 0));
  const view = await stageView(p, '#stage', true), overlaps = await labelOverlaps(p, '.stage .tag', 0);
  check(`${tag}: stage, HUD and labels whole and clear`, view.layout.length === 0 && view.hud.length === 0 && overlaps.length === 0 && (await overflowX(p)) <= 0,
    [...view.layout, ...view.hud, ...overlaps.map((o) => JSON.stringify(o))].join(' | '));
  if (lang === 'en') check(`${tag}: no Chinese`, (await cjkLeftovers(p)).length === 0);
  await p.context().close();
}

/* ---------- stills for PDF/EPUB ---------- */
if (!PHASE1) for (const lang of ['zh', 'en']) for (const card of Object.keys(CARDS)) {
  const p = await openStill(T, BOOK, ID, card, lang), s = await state(p);
  check(`still ${lang}/${card}: the declared end frame, paused, handle hidden`, s.preset === card && !s.playing && near(s.t, CARDS[card].max, 0)
    && await p.evaluate(() => TRV.still && TRV.shot && document.getElementById('handle').hidden));
  check(`still ${lang}/${card}: dτ/dt and frames as the caption names them`, near(s.B.rate, CARDS[card].rate, 1e-15) && s.framesB === Math.floor(CARDS[card].rate * CARDS[card].max + 1e-9));
  checkMath(s, `still ${lang}/${card}`);
  await p.context().close();
}

check('no page error, console error or failed request in the page checks', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
