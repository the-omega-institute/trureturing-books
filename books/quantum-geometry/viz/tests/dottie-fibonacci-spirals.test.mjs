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
  && enTwinNote.includes('eight completed historical Picard updates Q₀…Q₇') && enTwinNote.includes('nine updates (4.5 cobweb turns)'),
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

/* ---------- legend and unit-bar marker against the geometry actually drawn on the stage canvas ----------
   Every draw call on #cv is recorded during one repaint. The test then identifies, with its own arithmetic, which
   curves (y = cos x, y = 1/(1 + x)), 90° guides (quarter arcs from (xⱼ, xⱼ) to (xⱼ₊₁, xⱼ₊₁) on its own 90-digit orbits),
   fixed-point tangents (slope −sin θ* or −φ⁻²) and polar spirals (R = κ^{2φ/π}) are really there, and requires the legend
   to name exactly those. The unit-bar marker is located from the drawn bar rectangles and compared with the exact
   rational iterate. */
await page.evaluate(() => {
  const ctx = document.getElementById('cv').getContext('2d');
  const R = window.__spiralsRec = { on: false, ops: [], path: [] };
  const scratch = document.createElement('canvas').getContext('2d');
  R.norm = (v) => { scratch.fillStyle = '#000'; scratch.fillStyle = v; return scratch.fillStyle; };
  const hook = (name, fn) => {
    const orig = ctx[name];
    ctx[name] = function (...a) { if (R.on) fn.apply(this, a); return orig.apply(this, a); };
  };
  hook('beginPath', () => { R.path = []; });
  hook('moveTo', (x, y) => R.path.push({ x, y, m: 1 }));
  hook('lineTo', (x, y) => R.path.push({ x, y }));
  hook('arc', (x, y, r) => R.path.push({ x, y, r, arc: 1 }));
  hook('rect', (x, y, w, h) => R.path.push({ x, y, w, h, rect: 1 }));
  hook('stroke', function () { R.ops.push({ op: 'stroke', style: this.strokeStyle, dash: this.getLineDash().length > 0, path: R.path.slice() }); });
  hook('fill', function () { R.ops.push({ op: 'fill', style: this.fillStyle, path: R.path.slice() }); });
  hook('fillRect', function (x, y, w, h) { R.ops.push({ op: 'fillRect', style: this.fillStyle, x, y, w, h }); });
  hook('fillText', function (text, x, y) { R.ops.push({ op: 'text', text: String(text), style: this.fillStyle, align: this.textAlign, x, y, w: this.measureText(String(text)).width }); });
});
const capture = () => page.evaluate(() => {
  const R = window.__spiralsRec, P = window.TRV.palette, cv = document.getElementById('cv').getBoundingClientRect();
  R.ops = []; R.path = []; R.on = true;
  window.TRV.kit.flush();
  R.on = false;
  const ops = R.ops, st = window.SPIRALS_DEBUG.state;
  const col = {};
  for (const [k, v] of Object.entries({ cy: P.cyan, mg: P.magenta, am: P.amber, vi: P.violet, dm: P.dim, ink: P.sigma })) col[k] = R.norm(v);
  let frame = null;
  if (st.scene !== 'angle') {
    const p1 = window.SPIRALS_DEBUG.cobwebAt(0.5), p2 = window.SPIRALS_DEBUG.cobwebAt(0.9);
    frame = { a: 0.5, b: 0.9, p1: [p1[0] - cv.left, p1[1] - cv.top], p2: [p2[0] - cv.left, p2[1] - cv.top] };
  }
  const legend = [...document.querySelectorAll('#legend > span')].map((s) => ({ sw: s.querySelector('i').className, text: s.textContent.trim() }));
  return { ops, col, frame, legend, st: { scene: st.scene, map: st.map, cam: st.cam, x0: st.x0, step: st.step }, lang: document.documentElement.lang };
});
const rgb = (s) => {
  const h = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(s);
  if (h) return h.slice(1).map((x) => parseInt(x, 16)).join(',');
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(s);
  return m ? m.slice(1).join(',') : s;
};
const pts = (op) => op.path.filter((p) => !p.arc && !p.rect);
const SUBD = '₀₁₂₃₄₅₆₇₈₉', subN = (n) => String(n).split('').map((d) => SUBD[+d]).join('');
const gcdN = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
function fibRational(x0c, k) { // exact x_k of x ↦ 1/(1 + x) from x₀ = x0c/100: p/q ↦ q/(p + q)
  let p = BigInt(x0c), q = 100n; const g = gcdN(p, q); p /= g; q /= g;
  for (let j = 0; j < k; j++) [p, q] = [q, p + q];
  return [p, q];
}
const orbitCache = new Map();
const orbitOf = (kind, x0c) => {
  const key = `${kind}|${x0c}`;
  if (!orbitCache.has(key)) orbitCache.set(key, refOrbit(kind, x0c, 20));
  return orbitCache.get(key);
};

/* What the cobweb panel and the polar panel really show, decided only from the recorded calls. */
function analyse(c) {
  const out = { curves: {}, guides: { cos: [], fib: [] }, tangents: [], spirals: {}, circle: false, strokedRGB: new Set(), dashedRGB: new Set() };
  const painted = (op) => op.path.length > 1 || (op.path.length === 1 && (op.path[0].arc || op.path[0].rect));
  for (const op of c.ops) if ((op.op === 'stroke' || op.op === 'fill') && painted(op)) (op.dash ? out.dashedRGB : out.strokedRGB).add(rgb(op.style));
  for (const op of c.ops) if (op.op === 'fillRect') out.strokedRGB.add(rgb(op.style));
  if (c.frame) {
    const f = c.frame, sx = (f.p2[0] - f.p1[0]) / (f.b - f.a), sy = (f.p1[1] - f.p2[1]) / (f.b - f.a);
    const U = (px) => f.a + (px - f.p1[0]) / sx, V = (py) => f.a + (f.p1[1] - py) / sy, Y = (v) => f.p1[1] - (v - f.a) * sy;
    out.equalAspect = Math.abs(sx / sy - 1) < 1e-9;
    const fn = { cos: Math.cos, fib: (x) => 1 / (1 + x) };
    for (const op of c.ops) {
      if (op.op !== 'stroke') continue;
      const P = pts(op);
      if (P.length >= 60 && !op.dash) {
        for (const kind of ['cos', 'fib']) {
          if (P.every((p) => Math.abs(Y(fn[kind](U(p.x))) - p.y) < 0.01)) out.curves[kind] = rgb(op.style);
        }
      } else if (P.length >= 20 && P.length <= 40) {
        const a = P[0], b = P[P.length - 1], found = [];
        const hit = (p, v) => Math.abs(U(p.x) - v) * Math.abs(sx) < 0.05 && Math.abs(V(p.y) - v) * Math.abs(sy) < 0.05;
        for (const kind of ['cos', 'fib']) {
          const xs = orbitOf(kind, Math.round(c.st.x0 * 100)).xs;
          for (let j = 0; j <= 20; j++) if (hit(a, xs[j]) && hit(b, xs[j + 1])) found.push({ kind, j, rgb: rgb(op.style) });
        }
        // an arc shared by both orbits (from x₀ = 0 both maps first step to 1) identifies neither map
        if (new Set(found.map((g) => g.kind)).size === 1) for (const g of found) out.guides[g.kind].push(g);
      } else if (P.length === 2 && op.dash && rgb(op.style) === rgb(c.col.mg)) {
        const u1 = U(P[0].x), v1 = V(P[0].y), u2 = U(P[1].x), v2 = V(P[1].y), slope = (v2 - v1) / (u2 - u1);
        for (const [kind, sl, star] of [['cos', -LAMd, THd], ['fib', -IPH2d, IPHd]]) {
          if (Math.abs(slope - sl) < 1e-9 && Math.abs(v1 - star - sl * (u1 - star)) * Math.abs(sy) < 0.01) out.tangents.push(kind);
        }
      }
    }
  }
  // polar panel: the dashed dim unit circle gives the centre and the scale; spirals must obey R = κ^{2φ/π}
  const circ = c.ops.find((op) => op.op === 'stroke' && op.dash && rgb(op.style) === rgb(c.col.dm) && op.path.length === 1 && op.path[0].arc && op.path[0].r > 20);
  if (circ) {
    out.circle = true;
    const { x: cx, y: cy, r: sc } = circ.path[0];
    const kap = { theta: LAMd, phi: IPHd, cobweb: Math.sqrt(LAMd) };
    for (const op of c.ops) {
      if (op.op !== 'stroke') continue;
      const P = pts(op);
      if (P.length < 40) continue;
      let phi = 0, prev = null, ok = Math.abs(P[0].x - cx) < 0.01 && Math.abs(cy - P[0].y - sc) < 0.01;
      for (const p of P) {
        if (!ok) break;
        const a = Math.atan2(p.x - cx, cy - p.y);
        if (prev != null) { let d = a - prev; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; phi += d; }
        prev = a;
        p.r = Math.hypot(p.x - cx, cy - p.y) / sc; p.phi = phi;
      }
      if (!ok) continue;
      for (const [name, k] of Object.entries(kap)) {
        if (P.every((p) => Math.abs(p.r - Math.pow(k, (2 * p.phi) / Math.PI)) * sc < 0.01) && P[P.length - 1].phi > 2 * Math.PI) out.spirals[name] = rgb(op.style);
      }
    }
  }
  return out;
}
const legendHas = (c, sw, re) => c.legend.some((e) => e.sw === `sw ${sw}` && re.test(e.text));
const tag = (c) => `${c.lang} ${c.st.scene}/${c.st.map}/${c.st.cam} x₀=${c.st.x0} k=${c.st.step}`;

function checkCobwebLegend(c) {
  const A = analyse(c), col = c.col, rc = rgb(col.cy), rm = rgb(col.mg);
  const want = { cos: ['cos'], fib: ['fib'], both: ['cos', 'fib'] }[c.st.map];
  const drawn = Object.keys(A.curves).sort();
  const nonCurrent = (kind) => A.guides[kind].filter((g) => g.rgb !== rgb(col.am));
  const info = JSON.stringify({ drawn, curves: A.curves, tangents: A.tangents, guides: { cos: nonCurrent('cos').length, fib: nonCurrent('fib').length }, legend: c.legend });
  check(`${tag(c)}: the stage draws exactly the selected map curve(s) in their own colours on an equal-aspect frame`,
    A.equalAspect && JSON.stringify(drawn) === JSON.stringify(want)
    && (!A.curves.cos || A.curves.cos === rc) && (!A.curves.fib || A.curves.fib === rm), info);
  const guideOk = ['cos', 'fib'].every((kind) => nonCurrent(kind).every((g) => g.rgb === (kind === 'cos' ? rc : rm))
    && (c.st.step === 0 || (nonCurrent(kind).length > 0) === want.includes(kind)))
    && ['cos', 'fib'].every((kind) => A.guides[kind].filter((g) => g.rgb === rgb(col.am)).every((g) => g.j === c.st.step));
  check(`${tag(c)}: completed 90° guides lie on the drawn maps' own orbits in their colours, only step k in amber`, guideOk, info);
  const tanWant = c.st.map === 'both' ? [] : want;
  check(`${tag(c)}: a dashed fixed-point tangent is drawn exactly for a single map, with that map's slope`,
    JSON.stringify(A.tangents) === JSON.stringify(tanWant), info);
  check(`${tag(c)}: legend names cos θ, 1/(1 + x) and the tangent exactly when they are drawn`,
    legendHas(c, 'cy', /cos θ/) === !!A.curves.cos
    && legendHas(c, 'mg', /1\/\(1 ?\+ ?x\)/) === !!A.curves.fib
    && legendHas(c, 'dash mg', /./) === (A.tangents.length > 0), info);
  if (c.st.scene === 'cobweb') {
    const sw = { cy: rc, mg: rm };
    const missing = c.legend.filter((e) => { const k = e.sw.split(' ').pop(); return k in sw && !(e.sw.includes('dash') ? A.dashedRGB : A.strokedRGB).has(sw[k]); });
    const cyanUnexplained = !c.legend.some((e) => e.sw === 'sw cy') && [...A.strokedRGB, ...A.dashedRGB].includes(rc);
    check(`${tag(c)}: every cyan/magenta legend entry is painted on the stage and no cyan is painted without a cyan legend entry`,
      missing.length === 0 && !cyanUnexplained, JSON.stringify({ missing, cyanUnexplained }));
  } else {
    check(`${tag(c)}: both polar spirals (θ* cyan, φ⁻¹ magenta) and the violet per-arm spiral are drawn and named in the legend`,
      A.spirals.theta === rc && A.spirals.phi === rm && A.spirals.cobweb === rgb(col.vi)
      && legendHas(c, 'cy', /θ\*/) && legendHas(c, 'mg', /φ⁻¹/) && legendHas(c, 'vi', /./), JSON.stringify({ spirals: A.spirals, legend: c.legend }));
  }
}

function checkUnitBar(c, wide = true) {
  const col = c.col, rc = rgb(col.cy), rm = rgb(col.mg), ra = rgb(col.am);
  const rects = c.ops.filter((o) => o.op === 'fillRect');
  let bar = null;
  for (const r1 of rects) for (const r2 of rects) {
    if (rgb(r1.style) === rc && rgb(r2.style) === rm && Math.abs(r1.x + r1.w - r2.x) < 1e-6 && Math.abs(r1.y - r2.y) < 1e-6 && Math.abs(r1.h - r2.h) < 1e-6) bar = { x0: r1.x, xs: r2.x, x1: r2.x + r2.w, y: r1.y, h: r1.h };
  }
  const k = c.st.step, x0c = Math.round(c.st.x0 * 100), barStart = x0c === 0 ? 100 : x0c;
  const [p, q] = fibRational(barStart, k), val = Number(p) / Number(q), off = p > q;
  const label = `x${subN(k)}${x0c === 0 ? '(x₀=1)' : ''}=${p}/${q}`;
  const pyMid = bar ? bar.y + bar.h / 2 : 0, s = bar ? bar.x1 - bar.x0 : 0;
  const amberFills = c.ops.filter((o) => o.op === 'fill' && rgb(o.style) === ra);
  const barDots = bar ? amberFills.filter((o) => o.path.length === 1 && o.path[0].arc && Math.abs(o.path[0].y - bar.y) < 0.01) : [];
  const heads = bar ? amberFills.filter((o) => { const P = pts(o); return P.length === 3 && P.every((pt) => pt.x > bar.x1 && pt.y >= bar.y - 1 && pt.y <= bar.y + bar.h + 1); }) : [];
  const headOk = heads.length === 1 && (() => { const P = pts(heads[0]), tip = P.reduce((m, pt) => (pt.x > m.x ? pt : m)); return Math.abs(tip.y - pyMid) < 0.01 && P.filter((pt) => pt !== tip).every((pt) => pt.x < tip.x - 1); })();
  const panel = bar && c.ops.find((o) => o.op === 'stroke' && o.path.length === 1 && o.path[0].rect && o.path[0].x <= bar.x0 && o.path[0].x + o.path[0].w >= bar.x1 && o.path[0].y <= bar.y && o.path[0].y + o.path[0].h >= bar.y);
  const headVisible = heads.length === 1 && panel && pts(heads[0]).every((pt) => pt.x <= panel.path[0].x + panel.path[0].w - 1);
  const tagOps = c.ops.filter((o) => o.op === 'text' && rgb(o.style) === ra && bar && o.align === 'right' && Math.abs(o.y - (bar.y - 3)) < 0.5);
  const tags = tagOps.map((o) => o.text);
  const oneD = c.ops.find((o) => o.op === 'text' && o.text === '1D: φ⁻¹ + φ⁻² = 1');
  const offWord = c.lang === 'en' ? 'off-scale' : '尺外';
  const info = JSON.stringify({ bar, val, off, label, tags, dots: barDots.map((o) => o.path[0].x), heads: heads.length, headOk, headVisible });
  check(`${tag(c)}: unit bar spans 0 … 1 at the shared 1:1 scale and splits exactly at φ⁻¹ (1D: φ⁻¹ + φ⁻² = 1 stays drawn)`,
    !!bar && Math.abs((bar.xs - bar.x0) / s - IPHd) < 1e-9 && c.ops.some((o) => o.op === 'text' && o.text === '1D: φ⁻¹ + φ⁻² = 1'), info);
  if (!off) {
    check(`${tag(c)}: amber marker sits at the exact iterate ${p}/${q} on the bar, with the exact label at the bar end and no off-scale arrow`,
      barDots.length === 1 && Math.abs(barDots[0].path[0].x - (bar.x0 + val * s)) < 0.01 && heads.length === 0
      && tags.length === 1 && tags[0] === label && Math.abs(tagOps[0].x - bar.x1) < 0.5, info);
  } else {
    check(`${tag(c)}: off-scale start ${p}/${q} > 1 is never pinned on the bar: no amber dot, a right-pointing amber arrow past the bar end inside the panel, and a label giving ${label} with "> 1"${wide ? ` ${offWord}` : ''} above the arrow, clear of the 1D statement`,
      barDots.length === 0 && headOk && headVisible && tags.length === 1 && tags[0].startsWith(label) && tags[0].includes('> 1') && (!wide || tags[0].includes(offWord))
      && (c.lang !== 'en' || !/[\u3400-\u9fff]/.test(tags[0]))
      && tagOps[0].x > bar.x1 && tagOps[0].x <= panel.path[0].x + panel.path[0].w && tagOps[0].x - tagOps[0].w >= oneD.x + oneD.w, info);
  }
  // the 2D panel: θ_k projected onto the unit circle at its true angle (frame from the bar scale and the fixed-point ring)
  const ring = c.ops.find((o) => o.op === 'stroke' && rgb(o.style) === rc && o.path.length === 1 && o.path[0].arc && Math.abs(o.path[0].r - 6) < 1e-9);
  const th = orbitOf('cos', x0c).xs[k];
  const dots2 = amberFills.filter((o) => o.path.length === 1 && o.path[0].arc && Math.abs(o.path[0].r - 3.6) < 1e-9 && bar && Math.abs(o.path[0].y - bar.y) > 0.5);
  const ok2 = !!ring && Math.abs(ring.path[0].x - (bar.x0 + THd * s)) < 0.01 && dots2.length === 1
    && Math.abs(dots2[0].path[0].x - (bar.x0 + Math.cos(th) * s)) < 0.01 && Math.abs(dots2[0].path[0].y - (ring.path[0].y + (LAMd - Math.sin(th)) * s)) < 0.01;
  check(`${tag(c)}: amber θₖ = ${th.toFixed(4)} sits on the unit circle at its own angle (never clamped)`, ok2,
    JSON.stringify({ ring: ring && ring.path[0], dots2: dots2.map((o) => o.path[0]), th }));
}

check('start slider keeps its supported domain 0 … 1.50 in steps of 0.01',
  await page.evaluate(() => { const e = document.getElementById('x0'); return e.min === '0' && e.max === '1.5' && e.step === '0.01'; }));
const view = async (w, h) => { await page.setViewportSize({ width: w, height: h }); await settle(page, 60); };
for (const lang of ['zh', 'en']) {
  await view(1440, 900);
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 40);
  // F1 path: WHIRLING-SQUARES → 1/(1 + x) → step 5, then its endpoints and the adjacent maps and cameras
  await pick('whirl'); await page.click('#mapChips [data-map="fib"]'); await seek(5);
  checkCobwebLegend(await capture());
  for (const k of [0, 20]) { await seek(k); checkCobwebLegend(await capture()); }
  await page.click('#mapChips [data-map="cos"]'); await seek(5); checkCobwebLegend(await capture());
  await page.click('#mapChips [data-map="both"]'); await seek(5); checkCobwebLegend(await capture());
  await page.click('#mapChips [data-map="fib"]'); await page.click('#camChips [data-cam="follow"]'); await seek(6); checkCobwebLegend(await capture());
  await pick('zoom'); await seek(12); checkCobwebLegend(await capture());
  // TWIN scene: the same left panel next to the polar models, for each map
  await pick('twin'); await seek(8); checkCobwebLegend(await capture());
  await page.click('#mapChips [data-map="fib"]'); await seek(5); checkCobwebLegend(await capture());
  await pick('division'); await seek(7); checkCobwebLegend(await capture());
  // ANGLE scene: its polar legend stays valid (all four models drawn)
  await pick('tilt'); await seek(1);
  {
    const c = await capture(), A = analyse(c);
    check(`${lang} angle: θ*, φ⁻¹ and per-arm spirals plus the dashed closed circle are drawn and named in the legend`,
      A.circle && A.spirals.theta === rgb(c.col.cy) && A.spirals.phi === rgb(c.col.mg) && A.spirals.cobweb === rgb(c.col.vi)
      && legendHas(c, 'cy', /θ\*/) && legendHas(c, 'mg', /φ⁻¹/) && legendHas(c, 'vi', /82\.83/) && legendHas(c, 'dash dm', /90\.00/),
      JSON.stringify({ spirals: A.spirals, legend: c.legend }));
  }
  // F2 path: start 1.50 in TWIN → SQUARES → ANGLE → conservation → step 0, then the adjacent supported states
  await pick('twin'); await setRange('x0', 1.5);
  await page.click('#sceneChips [data-scene="cobweb"]'); await settle(page);
  await page.click('#sceneChips [data-scene="angle"]'); await settle(page);
  await page.click('#focusChips [data-focus="conservation"]'); await seek(0);
  checkUnitBar(await capture());
  for (const k of [1, 20]) { await seek(k); checkUnitBar(await capture()); }
  for (const [x, k] of [[1.01, 0], [1, 0], [0, 0], [1.25, 0], [1.25, 1]]) { await setRange('x0', x); await seek(k); checkUnitBar(await capture()); }
  await setRange('x0', 1.5); await seek(0);
  await view(390, 844); checkUnitBar(await capture(), false);
  await view(1440, 900);
  await pick('pythagoras'); await seek(8); checkUnitBar(await capture());
}
await view(1440, 900);
await page.click('[data-lang-set="zh"]');

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
