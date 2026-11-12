#!/usr/bin/env node
// Browser regression suite for ORTHO//SPIRALS (books/quantum-geometry/viz/dottie-fibonacci-spirals/):
//   node books/quantum-geometry/viz/tests/dottie-fibonacci-spirals.test.mjs
// Runs stageFirstChecks first, then verifies every mathematical claim and interactive control independently
// using 90-digit fixed-point arithmetic (bisection for θ* and φ, angle-halving Taylor series for cos/sin).
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'dottie-fibonacci-spirals';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent 90-digit reference arithmetic ---------- */
const D = 90, ONE = 10n ** BigInt(D);
const mul = (a, b) => (a * b) / ONE, dv = (a, b) => (a * ONE) / b;
const abs = (a) => (a < 0n ? -a : a);
const fromC = (c) => (BigInt(c) * ONE) / 100n;
const toNum = (a) => {
  if (a === 0n) return 0;
  const s = abs(a).toString(), k = Math.min(17, s.length);
  return (a < 0n ? -1 : 1) * Number(s.slice(0, k)) * 10 ** (s.length - k - D);
};
const digits = (a, d) => {
  const s = abs(a).toString().padStart(D + 1, '0'), cut = s.length - D;
  return `${a < 0n ? '−' : ''}${s.slice(0, cut)}.${s.slice(cut, cut + d)}`;
};
function cs(x) {
  let n = 0, a = x;
  while (abs(a) > ONE / 2n) { a /= 2n; n++; }
  const a2 = mul(a, a);
  let c = 0n, s = 0n, tc = ONE, ts = a;
  for (let j = 0; j < 42; j++) {
    c += tc; s += ts;
    tc = (-tc * a2) / ONE / BigInt((2 * j + 1) * (2 * j + 2));
    ts = (-ts * a2) / ONE / BigInt((2 * j + 2) * (2 * j + 3));
  }
  for (let j = 0; j < n; j++) [c, s] = [mul(c, c) - mul(s, s), 2n * mul(s, c)];
  return [c, s];
}
const cos = (x) => cs(x)[0], sin = (x) => cs(x)[1];
function bisect(f, lo, hi, it = 330) {
  for (let i = 0; i < it; i++) {
    const m = (lo + hi) / 2n;
    if ((f(m) > 0n) === (f(lo) > 0n)) lo = m; else hi = m;
  }
  return (lo + hi) / 2n;
}
const TH = bisect((t) => cos(t) - t, 0n, ONE);
const LAM = sin(TH);
const PH = bisect((x) => mul(x, x) - x - ONE, ONE, 2n * ONE);
const IPH = bisect((x) => dv(ONE, ONE + x) - x, 0n, ONE);
const IPH2 = mul(IPH, IPH);

const THd = toNum(TH), LAMd = toNum(LAM), IPHd = toNum(IPH), IPH2d = toNum(IPH2);
const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-300);

function refOrbit(kind, x0c, K = 20) {
  const star = kind === 'cos' ? TH : IPH;
  const xs = [fromC(x0c)];
  for (let k = 0; k <= K; k++) xs.push(kind === 'cos' ? cos(xs[k]) : dv(ONE, ONE + xs[k]));
  return {
    xs: xs.map(toNum),
    u: xs.map((x) => toNum(x - star)),
    sides: xs.slice(0, K + 1).map((x, k) => Math.abs(toNum(xs[k + 1] - x)))
  };
}
function refAlphaDeg(kappa) {
  if (kappa >= 1) return 90;
  const b = (-2 / Math.PI) * Math.log(kappa);
  return (Math.atan(1 / b) * 180) / Math.PI;
}

/* ---------- open page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.SPIRALS_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.SPIRALS_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => {
  await page.evaluate(([i, val]) => {
    const el = document.getElementById(i);
    el.value = String(val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, [id, v]);
  await settle(page);
};
const stopped = (to) => until(page, (t) => { const s = window.SPIRALS_DEBUG.state; return !s.playing && s.step === t; }, to, 300000);
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries its viz id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('current-step pill is highlighted while the constant-angle pill is not',
  await page.evaluate(() => document.getElementById('pillStep').classList.contains('hot')
    && !document.getElementById('pillAngle').classList.contains('hot')));
check('opens on the default TWIN card at its still (step 8, stopped)',
  s.preset === 'twin' && s.scene === 'duo' && s.map === 'cos' && s.cam === 'whole' && s.x0 === 0 && s.step === 8 && !s.playing,
  JSON.stringify({ preset: s.preset, scene: s.scene, step: s.step, playing: s.playing }));

/* ---------- fundamental constants & conservation laws ---------- */
check('θ* agrees with 90-digit bisection of cos θ = θ to 60 digits', s.thetaStar === digits(TH, 60), `${s.thetaStar} vs ${digits(TH, 60)}`);
check('sin θ* agrees to 60 digits', s.sinThetaStar === digits(LAM, 60));
check('φ, φ⁻¹ and φ⁻² agree with 90-digit bisection to 60 digits',
  s.phi === digits(PH, 60) && s.invPhi === digits(IPH, 60) && s.invPhi2 === digits(IPH2, 60));
check('1D additive conservation φ⁻¹ + φ⁻² = 1 and 2D Pythagorean conservation (θ*)² + sin²θ* = 1 hold to 1e-15',
  abs(IPH + IPH2 - ONE) < 10n ** BigInt(D - 80) && abs(mul(TH, TH) + mul(LAM, LAM) - ONE) < 10n ** BigInt(D - 80)
  && Math.abs(s.sum1D - 1) < 1e-15 && Math.abs(s.sum2D - 1) < 1e-15);
check('curvature shift sin θ* − φ⁻¹ ≈ +0.055578 (+5.56 percentage points, ~9.0% relative)',
  Math.abs(s.kappaDiff - (LAMd - IPHd)) < 1e-15 && Math.abs(s.kappaDiff - 0.055578) < 1e-6 && Math.abs(s.kappaDiff / IPHd - 0.089927) < 1e-5,
  `${s.kappaDiff}`);

/* ---------- cobweb whirling squares & clockwise N -> E -> S -> W cycle ---------- */
const oc0 = refOrbit('cos', 0, 20);
check('cosine orbit from θ₀ = 0: all 22 iterates (x₀…x₂₁) and signed errors match 90-digit reference (rel < 1e-12)',
  s.cosOrbit.xs.length === 22 && s.cosOrbit.xs.every((x, k) => k === 0 ? x === 0 : rel(x, oc0.xs[k]) < 1e-12)
  && s.cosOrbit.u.every((u, k) => rel(u, oc0.u[k]) < 1e-12));
check('signed residuals alternate strictly across θ* at every step',
  oc0.u.every((u, k) => k === 0 || Math.sign(u) === -Math.sign(oc0.u[k - 1])));
check('cobweb vertical arm |Bₖ − Aₖ| equals horizontal arm |Aₖ₊₁ − Bₖ| equals |cos θₖ − θₖ| across k = 0 … 20',
  s.cosOrbit.sides.length === 21 && s.cosOrbit.sides.every((sd, k) =>
    sd === s.cosOrbit.vArms[k] && sd === s.cosOrbit.hArms[k] && rel(sd, oc0.sides[k]) < 1e-12));
check('cobweb arms wind strictly clockwise N → E → S → W (alternating [N, E] and [S, W] across k = 0 … 20)',
  s.cosOrbit.dirs.length === 21 && s.cosOrbit.dirs.every((d, k) => JSON.stringify(d) === JSON.stringify(k % 2 === 0 ? ['N', 'E'] : ['S', 'W'])));

/* ---------- all 4 spiral trajectories & constant radial tangent angles ---------- */
check('closed circle: κ = 1, α = 90.00°, inward tilt 0.00°, 360° factor 1.0000',
  s.spirals.circle.kappa === 1 && s.spirals.circle.alphaDeg === 90 && s.spirals.circle.tiltDeg === 0 && s.spirals.circle.turn360 === 1);
check('cobweb two-step spiral: κ = √(sin θ*) ≈ 0.8207, α ≈ 82.83°, tilt ≈ 7.17°, κ⁴ = sin²θ* ≈ 0.4538',
  Math.abs(s.spirals.cobweb.kappa - Math.sqrt(LAMd)) < 1e-14
  && Math.abs(s.spirals.cobweb.alphaDeg - refAlphaDeg(Math.sqrt(LAMd))) < 1e-12
  && s.spirals.cobweb.alphaDeg.toFixed(2) === '82.83'
  && Math.abs(s.spirals.cobweb.turn360 - LAMd ** 2) < 1e-14);
check('θ* Clifford orthogonal spiral: κ = sin θ* ≈ 0.6736, α ≈ 75.88°, tilt ≈ 14.12°, κ⁴ ≈ 0.2059',
  Math.abs(s.spirals.clifford.kappa - LAMd) < 1e-14
  && Math.abs(s.spirals.clifford.alphaDeg - refAlphaDeg(LAMd)) < 1e-12
  && s.spirals.clifford.alphaDeg.toFixed(2) === '75.88'
  && s.spirals.clifford.tiltDeg.toFixed(2) === '14.12'
  && s.spirals.clifford.turn360.toFixed(4) === '0.2059');
check('Fibonacci golden spiral: κ = φ⁻¹ ≈ 0.6180, α ≈ 72.97°, tilt ≈ 17.03°, κ⁴ ≈ 0.1459',
  Math.abs(s.spirals.fib.kappa - IPHd) < 1e-14
  && Math.abs(s.spirals.fib.alphaDeg - refAlphaDeg(IPHd)) < 1e-12
  && s.spirals.fib.alphaDeg.toFixed(2) === '72.97'
  && s.spirals.fib.tiltDeg.toFixed(2) === '17.03'
  && s.spirals.fib.turn360.toFixed(4) === '0.1459');

/* ---------- all 6 experiment cards ---------- */
// 1. TILT card: verify full animated playback to auto-stop at step 1 (works cleanly under VIZ_SLOW_FRAMES=1000)
await pick('tilt');
check('TANGENT-ANGLE card plays and auto-stops at step 1', await stopped(1));
s = await state();
check('TANGENT-ANGLE card sets angle scene with tilt focus and 75.88° readout',
  s.scene === 'angle' && s.focus === 'tilt' && s.spiral === 'clifford' && (await text('#roKey')) === '75.88°');

// 2. PYTHAGORAS card
await pick('pythagoras');
s = await seek(8);
check('ADD-VS-SQUARE card sets angle scene with conservation focus and displays both unit sums',
  s.scene === 'angle' && s.focus === 'conservation' && (await text('#ro1')).endsWith('= 1.000000') && (await text('#ro2')).endsWith('= 1.000000'));

// 3. WHIRL card (including unclamped rail endpoint k = 20: s₂₀ = |x₂₁ − x₂₀| ≈ 2.47×10⁻⁴ and N → E turn)
await pick('whirl');
s = await seek(5);
check('WHIRLING-SQUARES card sets full cobweb scene from θ₀ = 0 at step 5 (S → W turn)',
  s.scene === 'cobweb' && s.map === 'cos' && s.cam === 'whole' && s.x0 === 0 && JSON.stringify(s.cosOrbit.dirs[5]) === JSON.stringify(['S', 'W']));
s = await seek(20);
check('step k = 20 reports true s₂₀ = |x₂₁ − x₂₀| ≈ 0.00024664 and step-20 N → E turn (never clamped to s₁₉)',
  rel(s.cosOrbit.sides[20], oc0.sides[20]) < 1e-12
  && Math.abs(s.cosOrbit.sides[20] - 0.000246643056) < 1e-10
  && JSON.stringify(s.cosOrbit.dirs[20]) === JSON.stringify(['N', 'E'])
  && (await text('#roKey')) === '2.47×10⁻⁴'
  && (await text('#roKeySub')) === '(N → E)'
  && (await text('#pBMeta')) === '2.47×10⁻⁴'
  && (await text('#hudSub')).includes('2.47×10⁻⁴')
  && (await text('#hudSub')).includes('N → E'),
  JSON.stringify({ s20: s.cosOrbit.sides[20], roKey: await text('#roKey'), roKeySub: await text('#roKeySub'), hudSub: await text('#hudSub') }));

// 4. ZOOM card (Bernoulli self-similarity Eadem mutata resurgo)
await pick('zoom');
const s4 = await seek(4), v4 = s4.viewHalf;
const s12 = await seek(12), v12 = s12.viewHalf;
check('RESURGO-ZOOM card rescales the window around θ* in exact proportion to |δ₁₂/δ₄| ≈ (sin θ*)⁸',
  s12.scene === 'cobweb' && s12.cam === 'follow'
  && rel(v12 / v4, Math.abs(oc0.u[12] / oc0.u[4])) < 1e-12
  && Math.abs(v12 / v4 - LAMd ** 8) / (LAMd ** 8) < 0.035,
  `v12/v4 = ${(v12 / v4).toFixed(5)} vs |δ12/δ4| = ${Math.abs(oc0.u[12] / oc0.u[4]).toFixed(5)}`);

// 5. DIVISION card (both maps from x₀ = 1: Fibonacci convergents + cosine orbit)
await pick('division');
s = await seek(7);
const fib = [1n, 1n];
while (fib.length < 25) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
const of1 = refOrbit('fib', 100, 20);
check('PHI-AND-THETA card overlays both maps from x₀ = 1 with exact Fibonacci convergents F(k+1)/F(k+2)',
  s.scene === 'duo' && s.map === 'both' && s.x0 === 1 && s.spiral === 'fib'
  && s.fibOrbit.rationals.slice(0, 8).join(' ') === '1/1 1/2 2/3 3/5 5/8 8/13 13/21 21/34'
  && s.fibOrbit.rationals.every((r, k) => r === `${fib[k]}/${fib[k + 1]}`)
  && s.fibOrbit.u.every((u, k) => rel(u, of1.u[k]) < 1e-12));

/* ---------- interactive controls, pointer drag & keyboard ---------- */
// Switching from cos (at x₀ = 0) to fib bumps x₀ to 1.00; starting cos above θ* (x₀ = 1) enters S → W → N → E
await pick('whirl'); await seek(0);
check('WHIRLING-SQUARES starts cos at x₀ = 0', (await state()).x0 === 0);
await page.click('#mapChips [data-map="fib"]'); s = await state();
check('map chip switches from cos (x₀ = 0) to 1/(1 + x), bumps x₀ to 1.00, and clears preset',
  s.map === 'fib' && s.x0 === 1 && s.preset === null, JSON.stringify({ map: s.map, x0: s.x0, preset: s.preset }));
await page.click('#mapChips [data-map="cos"]'); s = await state();
check('starting cos above θ* (x₀ = 1.00) enters the clockwise cycle shifted by two quarter-turns (S→W then N→E)',
  s.x0 === 1 && JSON.stringify(s.cosOrbit.dirs[0]) === JSON.stringify(['S', 'W']) && JSON.stringify(s.cosOrbit.dirs[1]) === JSON.stringify(['N', 'E']));

// Editing #x0 after clicking an auto-playing preset clears stopAt so free play does not halt prematurely
await pick('whirl'); s = await state();
check('clicking WHIRLING-SQUARES arms stopAt = 8 while playing', s.playing && s.stopAt === 8, JSON.stringify({ playing: s.playing, stopAt: s.stopAt }));
await setRange('x0', 0.35); s = await state();
check('editing #x0 after clicking a preset clears stopAt and leaves the card',
  s.stopAt === null && s.preset === null && s.x0 === 0.35, JSON.stringify({ stopAt: s.stopAt, preset: s.preset, x0: s.x0 }));
await page.click('#rew');

await setRange('x0', 1.25); s = await state();
const oc125 = refOrbit('cos', 125, 20);
check('start slider x₀ = 1.25 updates the cosine orbit accurately',
  s.x0 === 1.25 && s.cosOrbit.u.every((u, k) => rel(u, oc125.u[k]) < 1e-12));

const pt04 = await page.evaluate(() => window.SPIRALS_DEBUG.cobwebAt(0.4));
await page.mouse.move(pt04[0], pt04[1]); await page.mouse.down(); await page.mouse.up();
s = await state();
check('dragging on the cobweb diagonal moves x₀ to ~0.40', Math.abs(s.x0 - 0.4) <= 0.02, `x₀ = ${s.x0}`);

await page.click('#camChips [data-cam="follow"]'); s = await state();
check('camera chip switches to follow-and-zoom', s.cam === 'follow');
// Switching mapChips to 'both' while cam === 'follow' resets cam to 'whole' and disables [data-cam="follow"]
await page.click('#mapChips [data-map="both"]'); s = await state();
check('switching map to Both while in follow-and-zoom resets cam to whole and disables follow chip',
  s.map === 'both' && s.cam === 'whole' && await page.evaluate(() => document.querySelector('[data-cam="follow"]').disabled));
await page.click('#mapChips [data-map="cos"]');
await page.click('#camChips [data-cam="follow"]'); s = await state();
const ptFollow = await page.evaluate((th) => window.SPIRALS_DEBUG.cobwebAt(th), THd);
await page.mouse.move(ptFollow[0] + 18, ptFollow[1]); await page.mouse.down(); await page.mouse.up();
s = await state();
check('pointer drag while zoomed switches camera back to whole path', s.cam === 'whole');

await page.click('#sceneChips [data-scene="angle"]'); s = await state();
check('Angle scene chip activates angle scene and reveals focus chips',
  s.scene === 'angle' && await page.evaluate(() => !document.getElementById('focusChips').hidden && document.querySelector('section[data-scenes="duo cobweb"]').hidden));
await page.click('#spiralChips [data-spiral="clifford"]');
const sa12 = await seek(12), meta12 = await text('#pAMeta');
const sa20 = await seek(20), meta20 = await text('#pAMeta');
check('Angle scene radius plot tracks full rail k = 0 … 20 without clamping at 8 (verified at k = 12 and k = 20)',
  sa12.anglePlotQ === 12 && rel(sa12.anglePlotR, LAMd ** 12) < 1e-12 && meta12 === 'R₁₂ = 0.0087'
  && sa20.anglePlotQ === 20 && rel(sa20.anglePlotR, LAMd ** 20) < 1e-12 && meta20 === 'R₂₀ = 3.70×10⁻⁴',
  JSON.stringify({ sa12: [sa12.anglePlotQ, sa12.anglePlotR, meta12], sa20: [sa20.anglePlotQ, sa20.anglePlotR, meta20] }));
await page.click('#spiralChips [data-spiral="cobweb"]'); s = await state();
check('spiral chip selects cobweb 82.83° trajectory', s.spiral === 'cobweb' && (await text('#roKey')) === '82.83°');
await page.click('#spiralChips [data-spiral="circle"]'); s = await state();
check('spiral chip selects closed circle 90.00° trajectory', s.spiral === 'circle' && (await text('#roKey')) === '90.00°');
await page.click('#focusChips [data-focus="conservation"]'); s = await state();
check('focus chip switches to conservation focus', s.focus === 'conservation');

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); s = await state(); check('key 2 switches to Squares scene', s.scene === 'cobweb');
await page.keyboard.press('m'); s = await state(); check('key M cycles the map', s.map === 'fib');
await page.keyboard.press('1'); s = await state(); check('key 1 switches to Twin scene', s.scene === 'duo');
await page.keyboard.press('s'); s = await state(); check('key S cycles the highlighted spiral', s.spiral === 'clifford');
await seek(3);
await page.keyboard.press('ArrowRight'); s = await state(); check('→ advances the rail by 1 step', s.step === 4);
await page.keyboard.press('ArrowLeft'); s = await state(); check('← steps the rail back by 1 step', s.step === 3);
await page.click('#rew'); s = await state(); check('⏮ rewinds to step 0 and pauses', s.t === 0 && !s.playing);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space starts playback', await until(page, () => { const d = window.SPIRALS_DEBUG.state; return d.playing && d.t > 0.08; }));
await page.keyboard.press('Space'); await settle(page);
check('Space pauses playback', !(await state()).playing);

/* ---------- responsive mobile stacking & HUD non-overlap across all 6 presets (zh & en) ---------- */
await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
s = await state();
check('Twin scene stacks panels top/bottom cleanly when canvasWidth < 540 (390px phone)', s.stacked === true);
const ALL_PRESETS = [['whirl', 5], ['twin', 8], ['pythagoras', 8], ['tilt', 1], ['zoom', 12], ['division', 7]];
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 40);
  const overlaps = [];
  for (const [pid, st] of ALL_PRESETS) {
    await pick(pid); await seek(st);
    const hit = await page.evaluate(() => {
      const a = document.querySelector('.hud-tl').getBoundingClientRect();
      const b = document.querySelector('.hud-tr').getBoundingClientRect();
      const sep = a.right + 4 <= b.left || b.right + 4 <= a.left || a.bottom + 4 <= b.top || b.bottom + 4 <= a.top;
      return sep ? null : { tl: [a.left, a.top, a.right, a.bottom], tr: [b.left, b.top, b.right, b.bottom] };
    });
    if (hit) overlaps.push(`${pid}:${JSON.stringify(hit)}`);
  }
  check(`390×844 (${lang}): .hud-tl and .hud-tr never overlap across all 6 presets`, overlaps.length === 0, overlaps.join(' | '));
}
await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 120);
s = await state();
check('Twin scene lays out panels side-by-side on wide viewport', s.stacked === false);

/* ---------- English HUD check (including Greek symbol preservation across all 4 spirals) ---------- */
await page.click('[data-lang-set="zh"]'); await pick('twin'); await seek(8);
const zhTwinNote = await text('#presetNote');
await page.click('[data-lang-set="en"]'); await pick('twin'); await seek(8);
const enTwinNote = await text('#presetNote');
check('TWIN preset note accurately distinguishes 8 completed updates Q₀…Q₇ (4 turns) + active Q₈ (9 updates / 4.5 turns) in zh & en',
  zhTwinNote.includes('Q₀…Q₇') && zhTwinNote.includes('Q₈') && zhTwinNote.includes('4.5')
  && zhTwinNote.includes('8 次历史递推') && zhTwinNote.includes('9 次递推')
  && enTwinNote.includes('Q₀…Q₇') && enTwinNote.includes('Q₈') && enTwinNote.includes('4.5')
  && enTwinNote.includes('8 completed updates') && enTwinNote.includes('9 displayed updates'),
  JSON.stringify({ zhTwinNote, enTwinNote }));
check('English HUD renders Twin Spirals title cleanly', (await text('#hudBig')) === 'TWIN SPIRALS · STEP 8');
await page.click('#sceneChips [data-scene="angle"]');
await page.click('#focusChips [data-focus="tilt"]');
const hudTitles = {};
for (const spId of ['circle', 'cobweb', 'clifford', 'fib']) {
  await page.click(`#spiralChips [data-spiral="${spId}"]`); await settle(page);
  hudTitles[spId] = await text('#hudBig');
}
check('English Angle HUD preserves lowercase Greek θ* and φ⁻¹ (zero uppercase Θ or Φ across all 4 spirals)',
  Object.values(hudTitles).every((h) => !/[ΘΦ]/.test(h))
  && hudTitles.clifford.startsWith('θ* ORTHOGONAL')
  && hudTitles.fib.startsWith('φ⁻¹ GOLDEN'),
  JSON.stringify(hudTitles));
await page.click('[data-lang-set="zh"]');

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
