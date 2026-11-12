#!/usr/bin/env node
// Browser regression suite for FIXED//CONVERGE (books/quantum-geometry/viz/fixed-point-convergence/):
//   node books/quantum-geometry/viz/tests/fixed-point-convergence.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per experiment card, and every property the page claims,
// recomputed here independently of the page: 90-digit fixed-point arithmetic with the cosine and sine from a short
// Taylor sum at x/2ⁿ followed by n angle doublings (the page sums the full Taylor series after reducing mod 2π),
// θ* and φ by bisection (the page uses Newton and an integer square root), continued fractions by Euclid on the
// bisection value, and the convergents from the recurrence on those quotients.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'fixed-point-convergence';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent 90-digit arithmetic ---------- */
const D = 90, ONE = 10n ** BigInt(D);
const mul = (a, b) => (a * b) / ONE, dv = (a, b) => (a * ONE) / b;
const abs = (a) => (a < 0n ? -a : a);
const fromC = (c) => (BigInt(c) * ONE) / 100n;   // a start given in hundredths
const toNum = (a) => { if (a === 0n) return 0; const s = abs(a).toString(), k = Math.min(17, s.length); return (a < 0n ? -1 : 1) * Number(s.slice(0, k)) * 10 ** (s.length - k - D); };
const digits = (a, d) => { const s = abs(a).toString().padStart(D + 1, '0'), cut = s.length - D; return `${a < 0n ? '−' : ''}${s.slice(0, cut)}.${s.slice(cut, cut + d)}`; };
/** [cos x, sin x]: halve until |x| < 1/2, Taylor to 40 terms there, then double back up n times. */
function cs(x) {
  let n = 0, a = x; while (abs(a) > ONE / 2n) { a /= 2n; n++; }
  const a2 = mul(a, a); let c = 0n, s = 0n, tc = ONE, ts = a;
  for (let j = 0; j < 40; j++) { c += tc; s += ts; tc = (-tc * a2) / ONE / BigInt((2 * j + 1) * (2 * j + 2)); ts = (-ts * a2) / ONE / BigInt((2 * j + 2) * (2 * j + 3)); }
  for (let j = 0; j < n; j++) [c, s] = [mul(c, c) - mul(s, s), 2n * mul(s, c)];
  return [c, s];
}
const cos = (x) => cs(x)[0], sin = (x) => cs(x)[1];
function bisect(f, lo, hi, it = 320) { for (let i = 0; i < it; i++) { const m = (lo + hi) / 2n; if ((f(m) > 0n) === (f(lo) > 0n)) lo = m; else hi = m; } return (lo + hi) / 2n; }
const TH = bisect((t) => cos(t) - t, 0n, ONE);
const PH = bisect((x) => mul(x, x) - x - ONE, ONE, 2n * ONE);
const LAM = sin(TH);
const FX = { cos: { f: cos, fp: (x) => -sin(x), star: TH }, golden: { f: (x) => ONE + dv(ONE, x), fp: (x) => -dv(ONE, mul(x, x)), star: PH } };
function orbit(map, c, kind, K) {
  const M = FX[map], xs = [fromC(c)];
  for (let k = 0; k < K; k++) { const x = xs[k], y = M.f(x); xs.push(kind === 'newton' ? x - dv(x - y, ONE - M.fp(x)) : y); }
  return { xs, d: xs.map((x) => toNum(x - M.star)) };
}
const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-300);
const SIN1 = toNum(sin(ONE)), LAMd = toNum(LAM), THd = toNum(TH);

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.FPC_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.FPC_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
// a card plays up to ~130 animation frames before it stops; under VIZ_SLOW_FRAMES that is minutes, so wait on the state for up to 5 minutes
const stopped = (to) => until(page, (t) => { const s = window.FPC_DEBUG.state; return !s.playing && s.step === t; }, to, 300000);
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the RATE card: the cosine from θ₀ = 1, following, stopped at its still (step 8)', s.preset === 'rate' && s.scene === 'iter' && s.map === 'cos' && s.x0 === 1 && s.cam === 'follow' && s.step === 8 && !s.playing, JSON.stringify({ p: s.preset, step: s.step, playing: s.playing }));

/* the two fixed points */
check('θ* agrees with a bisection of cos t = t to 60 digits', s.xstar === digits(TH, 60), `${s.xstar} vs ${digits(TH, 60)}`);
check('λ = sin θ* agrees to 60 digits, and (θ*)² + λ² = 1', s.lambda === digits(LAM, 60) && abs(mul(TH, TH) + mul(LAM, LAM) - ONE) < 10n ** BigInt(D - 80));
check('φ agrees with a bisection of x² = x + 1 to 60 digits', s.phi === digits(PH, 60));
check('θ* ≈ 0.73908513321516 and λ ≈ 0.6736120292 as the chapter says (rounded)', Math.abs(Number(s.xstar.slice(0, 20)) - 0.73908513321516) < 5e-15 && Math.abs(Number(s.lambda.slice(0, 20)) - 0.6736120292) < 5e-11);

/* RATE: the cosine from 1 */
const oc = orbit('cos', 100, 'iter', 60);
check('the cosine orbit from 1: all 61 errors δₖ agree (relative 1e-12)', s.u.length === 61 && s.u.every((u, k) => rel(u, oc.d[k]) < 1e-12), `max ${Math.max(...s.u.map((u, k) => rel(u, oc.d[k])))}`);
check('the chapter table: δ₄ = +0.0543952, δ₂₀ = +0.0000993', Math.abs(oc.d[4] - 0.0543952) < 5e-8 && Math.abs(oc.d[20] - 0.0000993) < 5e-8);
s = await seek(21);
check('step 21: the ratio δ₂₁/δ₂₀ = −0.673649 (chapter table), within 1e-4 of −λ', Math.abs(s.ratio - oc.d[21] / oc.d[20]) < 1e-12 && Math.abs(s.ratio - -0.673649) < 5e-7 && Math.abs(s.ratio + LAMd) < 1e-4, `${s.ratio}`);
check('the ratios alternate in sign around −λ: the path closes in from both sides', oc.d.slice(0, 40).every((d, k) => k === 0 || Math.sign(d) === -Math.sign(oc.d[k - 1])));
check('the key readout shows the ratio of this step', (await text('#roKey')) === s.ratio.toFixed(4).replace('-', '−'));
check('“steps per extra digit” = ln 10 / |ln λ| = 5.83', (await text('#ro5')).startsWith((Math.log(10) / Math.abs(Math.log(LAMd))).toFixed(2)) && (Math.log(10) / Math.abs(Math.log(LAMd))).toFixed(2) === '5.83');
const first = (lim) => oc.d.findIndex((d) => Math.abs(d) < lim);
check('|δₖ| first drops below 10⁻¹⁰ at k = 55 (chapter count)', first(1e-10) === 55, `${first(1e-10)}`);
s = await seek(55);
check('the follow camera zooms with the error: the view half-width at step 55 is within a factor of 4 of |δ₅₅|', s.viewHalf > Math.abs(oc.d[55]) && s.viewHalf < 4 * Math.max(Math.abs(oc.d[53]), Math.abs(oc.d[57])), `${s.viewHalf} vs ${oc.d[55]}`);
check('the global bound |δₖ| ≤ (sin 1)ᵏ⁻¹|δ₁| holds along the orbit', oc.d.every((d, k) => k === 0 || Math.abs(d) <= SIN1 ** (k - 1) * Math.abs(oc.d[1]) * (1 + 1e-12)));

/* GOLDEN: 1 + 1/x from 1 */
await pick('golden');
check('GOLDEN card plays and stops at step 8', await stopped(8));
s = await state();
const fib = [0n, 1n]; while (fib.length < 40) fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
const og = orbit('golden', 100, 'iter', 60);
check('GOLDEN: map 1 + 1/x from 1, whole view', s.map === 'golden' && s.x0 === 1 && s.cam === 'whole');
check('the readings are ratios of consecutive Fibonacci numbers, F(k+2)/F(k+1), for k = 0 … 20 (exact to 50 digits)', [...Array(21).keys()].every((k) => Math.abs(toNum(og.xs[k] - (fib[k + 2] * ONE) / fib[k + 1])) < 1e-50) && s.u.every((u, k) => rel(u, og.d[k]) < 1e-12));
s = await seek(30);
check('GOLDEN: the error ratio at step 30 is −1/φ² ≈ −0.381966 (within 1e-8)', Math.abs(s.ratio + 1 / toNum(mul(PH, PH))) < 1e-8 && Math.abs(s.slope + 0.381966) < 1e-6, `${s.ratio}`);
check('GOLDEN: the green box for φ shows, the one for θ* hides', await page.evaluate(() => !document.querySelector('.lean[data-map="golden"]').hidden && document.querySelector('.lean[data-map="cos"]').hidden));

/* FAR: the cosine from 3 */
await pick('far');
check('FAR card plays and stops at step 12', await stopped(12));
s = await state();
const o3f = orbit('cos', 300, 'iter', 60);
check('FAR: the cosine from x₀ = 3, whole view', s.map === 'cos' && s.x0 === 3 && s.cam === 'whole');
check('FAR: the first step lands in [−1, 1] (cos 3 = −0.98999), and the orbit agrees with an independent one', Math.abs(toNum(o3f.xs[1]) - Math.cos(3)) < 1e-15 && Math.abs(Math.cos(3)) <= 1 && s.u.every((u, k) => rel(u, o3f.d[k]) < 1e-12));
check('FAR: by step 40 the path is within 1e-6 of the same θ* as from 1, and still not on it', Math.abs(o3f.d[40]) < 1e-6 && o3f.d[40] !== 0);

/* CIRCLE */
await pick('circle');
check('CIRCLE card plays and stops at step 14', await stopped(14));
s = await state();
check('CIRCLE: the unit-circle camera on the cosine from 1', s.cam === 'circle' && s.map === 'cos' && s.x0 === 1);
check('the magenta height λ equals |the tangent slope| at θ*: slope = −λ', Math.abs(s.slope + LAMd) < 1e-15);

/* NEWTON */
await pick('newton');
check('NEWTON card plays and stops at step 2, where the tangent walk is still visible', await stopped(2));
s = await state();
const on = orbit('cos', 100, 'newton', 5);
{
  // the still: what the caption says, computed here from the independent orbit
  const dig = (x) => Math.max(0, Math.floor(-Math.log10(Math.abs(x)))), trail = on.d.slice(0, 3).map(dig);
  const pic2 = orbit('cos', 100, 'iter', 300), reach2 = pic2.d.findIndex((p) => Math.abs(p) <= Math.abs(on.d[2]));
  const sub = await text('#hudSub');
  check('NEWTON still: view about 10⁻⁴ wide, |δ₂| = 2.78×10⁻⁵, correct digits 0 → 1 → 4, plain iteration 24 steps',
    2 * s.viewHalf > 5e-5 && 2 * s.viewHalf < 2e-4 && Math.abs(Math.abs(on.d[2]) / 2.78e-5 - 1) < 0.002 && trail.join() === '0,1,4' && reach2 === 24
      && sub.includes(trail.join(' → ')) && sub.includes(`${reach2} 步`), `${2 * s.viewHalf} ${trail} ${reach2} | ${sub}`);
}
s = await seek(4);
check('the Newton orbit from 1 agrees at every step (relative 1e-12)', s.scene === 'newton' && s.u.length === 6 && s.u.every((u, k) => rel(u, on.d[k]) < 1e-12));
check('the chapter table: |δ₃| = 1.70×10⁻¹⁰, |δ₄| = 6.39×10⁻²¹, x₁ = 0.750363867840243893035', Math.abs(Math.abs(on.d[3]) / 1.70e-10 - 1) < 0.005 && Math.abs(Math.abs(on.d[4]) / 6.39e-21 - 1) < 0.002 && abs(on.xs[1] - (750363867840243893035n * ONE) / 10n ** 21n) * 2n * 10n ** 21n <= ONE);
const quad = THd / (2 * (1 + LAMd));
check('|δ₄|/δ₃² = θ*/(2(1 + λ)) ≈ 0.220805 (within 1e-6)', Math.abs(Math.abs(on.d[4]) / on.d[3] ** 2 - quad) < 1e-6 && (await text('#roKey')) === (Math.abs(on.d[4]) / on.d[3] ** 2).toFixed(6));
const pic = orbit('cos', 100, 'iter', 300);
const reach = on.d.map((e) => pic.d.findIndex((p) => Math.abs(p) <= Math.abs(e)));
check('“the plain iteration needs” n steps to be as close as each Newton step: 54 for step 3, 115 for step 4 (chapter)', JSON.stringify(s.picardSteps) === JSON.stringify(reach) && reach[3] === 54 && reach[4] === 115, `${s.picardSteps} vs ${reach}`);
check('the readout shows that count', (await text('#ro4')).startsWith('115'));
check('at step 4 the digit trail reads 0 → 1 → 4 → 9 → 20', (await text('#hudSub')).includes('0 → 1 → 4 → 9 → 20'));
s = await seek(5);
check('step 5 keeps 40 correct digits (|δ₅| < 10⁻⁴⁰), still from the 70-digit arithmetic', rel(s.uk, on.d[5]) < 1e-12 && Math.abs(s.uk) < 1e-40 && Math.abs(s.uk) > 0);

/* CONVERGENTS */
await pick('rational');
check('CONVERGENTS card plays through the ten convergents and stops on the last', await stopped(9));
s = await state();
// continued fraction of the bisection θ* by Euclid, convergents by the recurrence
const quot = []; { let p = TH, q = ONE; for (let i = 0; i < 16; i++) { const a = p / q; quot.push(Number(a)); [p, q] = [q, p - a * q]; } }
const conv = []; { let h0 = 0n, h1 = 1n, k0 = 1n, k1 = 0n; for (const a of quot) { const A = BigInt(a), h = A * h1 + h0, k = A * k1 + k0; h0 = h1; h1 = h; k0 = k1; k1 = k; conv.push([h, k]); } }
const mine = conv.filter(([, k]) => k >= 3n).slice(0, 10);
check('partial quotients [0; 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1]', JSON.stringify(s.quotients.slice(0, 12)) === JSON.stringify([0, 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1]) && JSON.stringify(quot.slice(0, 12)) === JSON.stringify([0, 1, 2, 1, 4, 1, 40, 1, 9, 4, 2, 1]));
check('the ten readings are the convergents 2/3, 3/4, 14/19, 17/23, 694/939, 711/962, 7093/9597, …', JSON.stringify(s.reads) === JSON.stringify(mine.map(([h, k]) => `${h}/${k}`)) && s.reads.slice(0, 7).join(' ') === '2/3 3/4 14/19 17/23 694/939 711/962 7093/9597');
let okRes = true, okBand = true, okB2 = true, worst = 0;
for (let j = 0; j < 10; j++) {
  s = await seek(j);
  const [h, k] = mine[j], q = (h * ONE) / k, res = toNum(cos(q) - q), err = toNum(q - TH);
  worst = Math.max(worst, rel(s.reading.res, res));
  okRes = okRes && rel(s.reading.res, res) < 1e-10 && rel(s.reading.u, err) < 1e-10 && res !== 0;
  okBand = okBand && Math.abs(res) >= Math.abs(err) && Math.abs(res) <= (1 + SIN1) * Math.abs(err);
  okB2 = okB2 && Number(k) ** 2 * Math.abs(res) < 1 + SIN1 && Math.abs(s.reading.b2res - Number(k) ** 2 * Math.abs(res)) < 1e-9;
}
check('every residual |cos q − q| agrees and is not zero', okRes, `worst ${worst}`);
check('every residual lies between |q − θ*| and (1 + sin 1)|q − θ*|', okBand);
check('every b²·|cos q − q| is below 1 + sin 1 = 1.8415, as the page shows', okB2);
s = await seek(3);
check('17/23: residual 7.58×10⁻⁵, b² × residual 0.0401 (chapter table)', s.reading.a === '17' && s.reading.b === '23' && Math.abs(Math.abs(s.reading.res) / 7.58e-5 - 1) < 0.001 && (await text('#roKey')).startsWith('0.0401'));

/* RULER */
await pick('ruler'); s = await state();
const r = (TH * 1000n + ONE / 2n) / ONE, rq = (r * ONE) / 1000n, rres = toNum(cos(rq) - rq);
const q23 = (17n * ONE) / 23n, res23 = toNum(cos(q23) - q23);
check('RULER: on 17/23 with the ruler D = 1000', s.scene === 'read' && s.D === 1000 && s.step === 3 && !s.playing && s.reading.b === '23');
check('the ruler reads 739/1000 with residual 1.42×10⁻⁴, about twice that of 17/23', s.ruler.a === String(r) && r === 739n && rel(s.ruler.res, rres) < 1e-10 && Math.abs(Math.abs(rres) / 1.42e-4 - 1) < 0.005 && Math.abs(rres / res23) > 1.7 && Math.abs(rres / res23) < 2.1);
check('the readout says how many times larger', (await text('#ro5')).includes((Math.abs(rres) / Math.abs(res23)).toFixed(2)));
// exhaustive: the nearest a/D for a few rulers agrees with the page
let rulerOk = true;
for (const Dn of [7, 23, 100, 502, 999]) {
  await setRange('ruler', Dn); s = await state();
  let best = null; for (let a = 0n; a <= BigInt(Dn); a++) { const e = abs((a * ONE) / BigInt(Dn) - TH); if (!best || e < best[1]) best = [a, e]; }
  rulerOk = rulerOk && s.ruler.a === String(best[0]) && s.ruler.b === String(Dn);
}
check('the ruler slider picks the tick nearest θ* (brute force over every a/D for D = 7, 23, 100, 502, 999)', rulerOk);
check('moving the ruler leaves the card', s.preset === null);
await setRange('ruler', 0); s = await state();
check('ruler 0: no ruler', s.ruler === null && s.D === 0);

/* controls */
await page.click('#sceneChips [data-scene="iter"]'); s = await state();
check('the Iterate chip switches the scene', s.scene === 'iter' && s.preset === null);
await page.click('#mapChips [data-map="golden"]'); s = await state();
check('the map chips switch to 1 + 1/x and reset the start to 1', s.map === 'golden' && s.x0 === 1);
check('the unit-circle camera is disabled for 1 + 1/x', await page.evaluate(() => document.querySelector('[data-cam="circle"]').disabled));
await page.click('#mapChips [data-map="cos"]');
await setRange('x0', 3); s = await state();
const o3 = orbit('cos', 300, 'iter', 60);
check('the start slider: x₀ = 3, and the orbit agrees (the first step lands in [−1, 1])', s.x0 === 3 && s.u.every((u, k) => rel(u, o3.d[k]) < 1e-12) && Math.abs(toNum(o3.xs[1])) <= 1);
await page.click('#camChips [data-cam="whole"]'); s = await state();
check('the camera chips switch to the whole path', s.cam === 'whole');
const at = await page.evaluate(() => window.FPC_DEBUG.at(2));
await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('pressing on the stage moves the start there (x₀ ≈ 2)', Math.abs(s.x0 - 2) <= 0.02, `x₀ = ${s.x0}`);
await page.click('#camChips [data-cam="follow"]');
const fr = await page.evaluate(() => window.FPC_DEBUG.at(window.FPC_DEBUG.state.x0));
await page.mouse.move(fr[0] - 30, fr[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('dragging in the follow camera switches to the whole path', s.cam === 'whole');
await page.click('#sceneChips [data-scene="newton"]'); await setRange('x0', 3); s = await state();
const n3 = orbit('cos', 300, 'newton', 5);
check('Newton from x₀ = 3 agrees with the independent orbit', s.scene === 'newton' && s.u.every((u, k) => rel(u, n3.d[k]) < 1e-10), JSON.stringify(s.u));
await page.click('#sceneChips [data-scene="read"]'); s = await state();
check('the Readings scene uses the cosine and hides the map controls', s.scene === 'read' && s.map === 'cos' && await page.evaluate(() => document.querySelector('section[data-scenes="iter newton"]').hidden));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); s = await state(); check('key 1: the Iterate scene', s.scene === 'iter');
await page.keyboard.press('m'); s = await state(); check('key M switches the map', s.map === 'golden');
await page.keyboard.press('m');
await page.keyboard.press('3'); s = await state(); check('key 3: the Readings scene', s.scene === 'read');
await page.keyboard.press('2'); s = await state(); check('key 2: the Newton scene', s.scene === 'newton');
await seek(2); await page.keyboard.press('ArrowRight'); s = await state(); check('→ steps the rail', s.step === 3);
await page.keyboard.press('ArrowLeft'); s = await state(); check('← steps back', s.step === 2);
await page.click('#rew'); s = await state(); check('⏮ returns to step 0', s.t === 0 && !s.playing);
await page.keyboard.press('1'); await seek(0);
await page.locator('body').click({ position: { x: 5, y: 5 } });   // Space on a focused button presses the button, not the rail
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.FPC_DEBUG.state; return d.playing && d.t > 0.5; }));
await page.keyboard.press('Space'); await settle(page); check('Space pauses', !(await state()).playing);

/* English */
await page.click('[data-lang-set="en"]'); await pick('rational'); await seek(3);
check('English HUD names the convergent', (await text('#hudBig')) === 'CONVERGENT 17/23');
await page.click('[data-lang-set="zh"]');

/* ---------- Newton over every supported start: the local law, the denominators, the ratios ---------- */
// The start slider is swept in hundredths over its whole range for each map, through the slider's own input event, and
// FPC_DEBUG.state.newton is read at every start. Recomputed here: the 90-digit Newton orbit and 1 − f′(xₖ) at each step;
// C = max|F″| / (2 min|F′|) for F(x) = x − f(x) by sampling the closed interval [x* − ρ, x* + ρ] in doubles (the page
// evaluates the two ends in closed form); which steps start inside |δ| ≤ ρ; and |δⱼ| / δⱼ₋₁² wherever |δⱼ| ≥ RES.
const RHO = 0.5, RES = 1e-60, DEN_FLOOR = 1e-9, PHd = toNum(PH);
const FF = { cos: { s: THd, F1: (x) => 1 + Math.sin(x), F2: (x) => Math.cos(x) }, golden: { s: PHd, F1: (x) => 1 + 1 / (x * x), F2: (x) => -2 / x ** 3 } };
const localC = (map, rho) => { const { s, F1, F2 } = FF[map]; let hi = 0, lo = Infinity; for (let i = 0; i <= 20000; i++) { const x = s - rho + (2 * rho * i) / 20000; hi = Math.max(hi, Math.abs(F2(x))); lo = Math.min(lo, Math.abs(F1(x))); } return hi / (2 * lo); };
const quadAt = (map) => { const { s, F1, F2 } = FF[map]; return Math.abs(F2(s) / (2 * F1(s))); };
const near = (a, b, r = 1e-9, z = 1e-62) => Number.isFinite(a) && Math.abs(a - b) <= r * Math.abs(b) + z;
const sweep = async (map) => {
  await page.click(`#mapChips [data-map="${map}"]`); await settle(page);
  const out = await page.evaluate(() => {
    const el = document.getElementById('x0'), lo = Math.round(Number(el.min) * 100), hi = Math.round(Number(el.max) * 100), rows = [];
    for (let c = lo; c <= hi; c++) {
      el.value = String(c / 100); el.dispatchEvent(new Event('input', { bubbles: true }));
      const s = window.FPC_DEBUG.state; rows.push({ c, x0: s.x0, scene: s.scene, map: s.map, u: s.u, newton: s.newton });
    }
    return { lo, hi, rows };
  });
  await settle(page);
  return out;
};
await page.click('#sceneChips [data-scene="newton"]'); await settle(page);
for (const map of ['cos', 'golden']) {
  const { lo, hi, rows } = await sweep(map), C = localC(map, RHO), M = FX[map];
  check(`Newton, ${map}: the sweep covers every start of the slider in hundredths (${lo / 100} … ${hi / 100}), on the Newton scene`,
    rows.length === hi - lo + 1 && rows.length > 400 && rows.every((r) => r.scene === 'newton' && r.map === map && Math.round(r.x0 * 100) === r.c && r.newton), `${rows.length} rows`);
  const bad = { bound: [], orbit: [], den: [], local: [], ratio: [], law: [] };
  let denMin = Infinity, denAt = null, nulls = 0, present = 0, governed = 0;
  for (const r of rows) {
    const N = r.newton, tag = `x₀=${(r.c / 100).toFixed(2)}`;
    if (!N) { bad.bound.push(`${tag}: no newton state`); continue; }
    // the neighbourhood and its constant
    if (!(N.rho === RHO && near(N.C, C) && near(N.Crho, C * RHO) && N.Crho < 1 && N.res === RES && near(N.quad, quadAt(map)) && N.quad <= N.C)) bad.bound.push(`${tag}: ρ ${N.rho}, C ${N.C} vs ${C}, Cρ ${N.Crho}, res ${N.res}, quad ${N.quad} vs ${quadAt(map)}`);
    // the orbit and the denominator 1 − f′(xₖ) at every step, from the 90-digit arithmetic
    const o = orbit(map, r.c, 'newton', 5), den = o.xs.slice(0, 5).map((x) => toNum(ONE - M.fp(x)));
    if (!(r.u.length === 6 && r.u.every((u, j) => near(u, o.d[j])))) bad.orbit.push(`${tag}: ${r.u.map((u) => u.toExponential(3))} vs ${o.d.map((u) => u.toExponential(3))}`);
    const dmin = Math.min(...N.den.map(Math.abs));
    if (!(N.den.length === 5 && N.den.every((d, j) => Number.isFinite(d) && Math.abs(d) >= DEN_FLOOR && near(d, den[j]) && (map !== 'golden' || d > 1)) && N.denMin === dmin)) bad.den.push(`${tag}: ${N.den} vs ${den}, denMin ${N.denMin}`);
    if (dmin < denMin) { denMin = dmin; denAt = tag; }
    // which steps the quadratic law governs: those that start inside |δ| ≤ ρ
    const inside = o.d.map((_, j) => j > 0 && Math.abs(o.d[j - 1]) <= RHO);
    if (!(N.local.length === 6 && N.local.every((f, j) => f === inside[j]))) bad.local.push(`${tag}: ${N.local} vs ${inside}`);
    for (let j = 1; j < 6; j++) {
      const a = Math.abs(o.d[j]), q = N.ratio[j];
      if (Math.abs(Math.log10(a / RES)) < 1e-3) continue;   // at RES itself either answer is honest
      if (a < RES) { if (q !== null) bad.ratio.push(`${tag}: step ${j} |δ| = ${a.toExponential(2)} < RES but ratio ${q}`); else nulls++; continue; }
      const want = a / o.d[j - 1] ** 2;
      if (!(typeof q === 'number' && q > 0 && near(q, want, a >= 1e-50 ? 1e-6 : 1e-3, 0))) { bad.ratio.push(`${tag}: step ${j} ratio ${q} vs ${want}`); continue; }
      present++;
      // inside the neighbourhood the step obeys |δⱼ| ≤ C·δⱼ₋₁², and C·ρ < 1 keeps the next start inside too
      if (inside[j]) { governed++; if (!(q <= C * (1 + 1e-9) && (j === 5 || inside[j + 1]))) bad.law.push(`${tag}: step ${j} ratio ${q} > C ${C} or left the neighbourhood`); }
    }
    if (N.ratio.length !== 6 || N.ratio[0] !== null) bad.ratio.push(`${tag}: ratio ${N.ratio}`);
  }
  check(`Newton, ${map}: ρ = 0.5 at every start; C = ${C.toFixed(4)} and C·ρ = ${(C * RHO).toFixed(4)} < 1 match max|F″| / (2 min|F′|) sampled on [x* − ρ, x* + ρ]; the limit |F″(x*)/(2F′(x*))| ≤ C`, bad.bound.length === 0, bad.bound.slice(0, 2).join(' | '));
  check(`Newton, ${map}: at every start the six errors δ₀ … δ₅ agree with the 90-digit orbit (relative 1e-9)`, bad.orbit.length === 0, bad.orbit.slice(0, 2).join(' | '));
  check(`Newton, ${map}: at every start every 1 − f′(xₖ) is finite, agrees with the 90-digit value and is at least 10⁻⁹ in size${map === 'golden' ? ' (above 1, since x > 0)' : ''}; denMin is the smallest`, bad.den.length === 0 && denMin >= DEN_FLOOR, `${bad.den.slice(0, 2).join(' | ')} smallest ${denMin} at ${denAt}`);
  check(`Newton, ${map}: a step is marked local exactly when the previous error has |δ| ≤ ρ`, bad.local.length === 0, bad.local.slice(0, 2).join(' | '));
  check(`Newton, ${map}: |δⱼ| / δⱼ₋₁² is absent below RES = 10⁻⁶⁰ and present and correct above it (both cases occur)`, bad.ratio.length === 0 && nulls > 0 && present > 0, `${bad.ratio.slice(0, 2).join(' | ')} (null ${nulls}, present ${present})`);
  check(`Newton, ${map}: every local step obeys |δⱼ| ≤ C·δⱼ₋₁² and its successor starts inside again (${governed} steps)`, bad.law.length === 0 && governed > 0, bad.law.slice(0, 2).join(' | '));
}
// the start with the smallest denominator throws the orbit far away: the stage still draws it
await page.click('#mapChips [data-map="cos"]'); await setRange('x0', -0.8); s = await state();
check('Newton from x₀ = −0.80 (the smallest 1 − f′ of any start) draws, and its errors agree', s.scene === 'newton' && s.x0 === -0.8 && s.u.every((u, k) => near(u, orbit('cos', -80, 'newton', 5).d[k])));

/* the plain iteration is untouched by the Newton bookkeeping */
await page.click('#sceneChips [data-scene="iter"]'); await settle(page);
let plainOk = true; const plainBad = [];
for (const [map, starts] of [['cos', [-150, 100, 300]], ['golden', [20, 100, 500]]]) {
  await page.click(`#mapChips [data-map="${map}"]`); await settle(page);
  for (const c of starts) {
    await setRange('x0', c / 100); s = await seek(30);
    const o = orbit(map, c, 'iter', 60);
    const ok = s.scene === 'iter' && s.map === map && s.newton === null && s.picardSteps === null && s.max === 60 && s.u.length === 61 && s.u.every((u, k) => near(u, o.d[k])) && near(s.ratio, o.d[30] / o.d[29], 1e-9, 0);
    if (!ok) plainBad.push(`${map} x₀=${c / 100}: newton ${JSON.stringify(s.newton)}, max ${s.max}, u[30] ${s.u[30]} vs ${o.d[30]}`);
    plainOk = plainOk && ok;
  }
}
check('the plain iteration is unchanged: no Newton state, 60 steps, the 90-digit orbit and the step ratio, for both maps from both ends of the slider and from 1', plainOk, plainBad.slice(0, 2).join(' | '));
await page.click('#mapChips [data-map="cos"]');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
