#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/critical-mirror (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/critical-mirror.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery, every property the page shows is recomputed here independently: the four-point
// orbit and its Cayley images (inversion in the circle), the radial offsets quoted in the chapter, the quartic F along
// the critical line, and ξ(½ + it) from a different method (Borwein's series for η and the Lanczos Γ).
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'critical-mirror');

const page = await T.goto('quantum-geometry', 'critical-mirror', '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.MIRROR_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.MIRROR_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); return state(); };

/* ---------- independent complex arithmetic ---------- */
const cx = (re, im = 0) => [re, im];
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cd = (a, b) => { const q = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / q, (a[1] * b[0] - a[0] * b[1]) / q]; };
const cabs = (a) => Math.hypot(a[0], a[1]);
const conj = (a) => [a[0], -a[1]];
const near = (a, b, e) => Math.abs(a - b) <= e;
const cayley = (s) => cd([s[0] - 1, s[1]], s);
// n^(−s) for real n > 0
const npow = (n, s) => { const r = Math.exp(-s[0] * Math.log(n)), a = -s[1] * Math.log(n); return [r * Math.cos(a), r * Math.sin(a)]; };
// ζ(s) by Borwein's algorithm for η (n = 60), then ζ = η / (1 − 2^(1−s))
function zetaB(s, n = 60) {
  const fact = [1]; for (let i = 1; i <= 2 * n; i++) fact.push(fact[i - 1] * i);
  const d = []; let acc = 0;
  for (let k = 0; k <= n; k++) { acc += fact[n + k - 1] * Math.pow(4, k) / (fact[n - k] * fact[2 * k]); d.push(n * acc); }
  let e = [0, 0];
  for (let k = 0; k < n; k++) { const t = npow(k + 1, s), c = (k % 2 ? -1 : 1) * (d[k] - d[n]); e = [e[0] + c * t[0], e[1] + c * t[1]]; }
  e = [-e[0] / d[n], -e[1] / d[n]];
  const two = npow(2, [s[0] - 1, s[1]]);   // 2^(1−s)
  return cd(e, [1 - two[0], -two[1]]);
}
// Γ(z) by Lanczos (g = 7, n = 9), Re z > 0.5
const LG = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
function gammaL(z) {
  const zz = [z[0] - 1, z[1]]; let x = [LG[0], 0];
  for (let i = 1; i < 9; i++) x = [x[0] + cd([LG[i], 0], [zz[0] + i, zz[1]])[0], x[1] + cd([LG[i], 0], [zz[0] + i, zz[1]])[1]];
  const t = [zz[0] + 7.5, zz[1]], lt = [Math.log(cabs(t)), Math.atan2(t[1], t[0])];
  const pw = (() => { const e = [(zz[0] + 0.5) * lt[0] - zz[1] * lt[1], (zz[0] + 0.5) * lt[1] + zz[1] * lt[0]]; const r = Math.exp(e[0] - t[0]); return [r * Math.cos(e[1] - t[1]), r * Math.sin(e[1] - t[1])]; })();
  return cm(cm([Math.sqrt(2 * Math.PI), 0], pw), x);
}
function xiB(t) {
  const s = [0.5, t], h = [0.25, t / 2];
  const piPow = (() => { const r = Math.exp(-h[0] * Math.log(Math.PI)), a = -h[1] * Math.log(Math.PI); return [r * Math.cos(a), r * Math.sin(a)]; })();
  return cm(cm(cm([0.5, 0], cm(s, [s[0] - 1, s[1]])), cm(piPow, gammaL(h))), zetaB(s));
}

/* ---------- QUARTET ---------- */
let s = await state();
check('opens on the QUARTET card: ρ = 0.6 + 2i, four points, paused', s.preset === 'quartet' && near(s.delta, 0.1, 1e-12) && s.gamma === 2 && s.count === 4 && !s.playing);
const orbitOk = (st) => {
  const sg = 0.5 + st.side * st.delta, want = [[sg, st.gamma], [sg, -st.gamma], [1 - sg, -st.gamma], [1 - sg, st.gamma]];
  const w0 = cayley(want[0]);
  const imgs = [w0, conj(w0), cd([1, 0], w0), cd([1, 0], conj(w0))];   // w, w̄, 1/w, 1/w̄
  return st.points.every((p, i) => near(p[0], want[i][0], 1e-12) && near(p[1], want[i][1], 1e-12))
    && st.images.every((w, i) => near(w[0], imgs[i][0], 1e-12) && near(w[1], imgs[i][1], 1e-12));
};
check('QUARTET: the four points are ρ, ρ̄, 1 − ρ, 1 − ρ̄ and their images are w, w̄, 1/w, 1/w̄ (inversion in the circle)', orbitOk(s));
check('QUARTET: two images inside the unit circle and two outside, inverse in pairs', s.absW.filter((r) => r < 1).length === 2 && s.absW.filter((r) => r > 1).length === 2 && near(s.absW[0] * s.absW[3], 1, 1e-12));
let all = true;
for (const g of [0.7, 2, 6.5, 14, 30]) for (const d of [0.02, 0.1, 0.3, 0.45]) {
  await page.evaluate((v) => { const el = document.getElementById('gamma'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, g);
  s = await seek(45 - 100 * d);
  const sigma = 0.5 + s.side * s.delta, w2 = (1 - 2 * sigma) / (sigma * sigma + s.gamma * s.gamma);
  all = all && orbitOk(s) && s.count === 4 && near(s.absW[0] ** 2 - 1, w2, 1e-12);
}
check('20 positions: the orbit and images agree, and |w|² − 1 = (1 − 2σ)/(σ² + t²)', all);
s = await seek(45);
check('on the mirror (δ = 0): the four points coincide in pairs and |w| = 1', s.count === 2 && s.absW.every((r) => near(r, 1, 1e-12)));

/* ---------- CAYLEY ---------- */
s = await pick('cayley');
check('CAYLEY: ρ = ½ + 14.134725i on the circle at an angle of 4.05°', s.count === 2 && near(s.absW[0], 1, 1e-12) && (s.argW * 180 / Math.PI).toFixed(2) === '4.05' && near(s.argW, Math.PI - 2 * Math.atan(2 * 14.134725142), 1e-12));
const z1 = zetaB([0.5, 14.134725142]);
check('the grey first zero really is a zero of ζ (|ζ| < 1e-8 by Borwein\'s series)', cabs(z1) < 1e-8, `${cabs(z1)}`);

/* ---------- THIN ---------- */
s = await pick('thin');
check('THIN: ρ = 0.6 + 14i gives |w| = 0.999491 and its inverse 1.000510', s.absW[0].toFixed(6) === '0.999491' && s.absW[3].toFixed(6) === '1.000510' && near(s.absW[0] * s.absW[3], 1, 1e-12));
check('THIN: the readout shows |w| and the product of the pair is 1', (await page.textContent('#ro2')) === '0.999491' && (await page.textContent('#ro4')).startsWith('1.000000000'));

/* ---------- QUARTIC ---------- */
s = await pick('quartic');
check('QUARTIC: δ = ¼, γ = 14, zeros ½ ± ¼ ± 14i off the line, ρ = ¼ + 14i on the left', s.scene === 'quartic' && near(s.delta, 0.25, 1e-12) && s.gamma === 14 && s.side === -1 && s.count === 4 && s.points.every((p) => p[0] !== 0.5));
let minF = Infinity, argMin = 0, fOk = true;
for (let i = 0; i <= 6000; i++) {
  const t = i * 0.005;
  // F(s) = ((s − ½ − δ)² + γ²)((s − ½ + δ)² + γ²) at s = ½ + it, from the product of the four linear factors
  const z = [0, t], f1 = cm([z[0] - 0.25, z[1] - 14], [z[0] - 0.25, z[1] + 14]), f2 = cm([z[0] + 0.25, z[1] - 14], [z[0] + 0.25, z[1] + 14]), F = cm(f1, f2);
  fOk = fOk && Math.abs(F[1]) < 1e-6 * Math.max(1, Math.abs(F[0])) && F[0] > 0;
  if (F[0] < minF) { minF = F[0]; argMin = t; }
  if (i % 500 === 0) { const pf = await page.evaluate((v) => window.MIRROR_DEBUG.quartic(v), t); fOk = fOk && near(pf, F[0], 1e-9 * Math.max(1, F[0])); }
}
check('F(½ + it) is real and positive for 0 ≤ t ≤ 30 (four linear factors), agreeing with the page', fOk);
check('its minimum is 49 = 4δ²γ², near t = 14', near(minF, 49, 0.01) && near(argMin, 14, 0.01) && near(s.fmin, 49, 1e-12), `${minF} at ${argMin}`);
const pageXi = await page.evaluate(() => [14, 14.5, 15, 20, 21.5].map((t) => window.MIRROR_DEBUG.xi(t)));
const indXi = [14, 14.5, 15, 20, 21.5].map(xiB);
check('ξ(½ + it) on the page agrees with Borwein\'s η and the Lanczos Γ (relative 1e-6) and is real', pageXi.every((p, i) => near(p[0], indXi[i][0], 1e-6 * Math.abs(indXi[i][0])) && Math.abs(p[1]) < 1e-9 * Math.abs(p[0])),
  JSON.stringify(pageXi.map((p, i) => [p[0], indXi[i][0]])));
check('ξ(½ + 14i) ≈ +2.01×10⁻⁴ and ξ(½ + 15i) ≈ −7.06×10⁻⁴, as the chapter says', indXi[0][0].toExponential(2) === '2.01e-4' && indXi[2][0].toExponential(2) === '-7.06e-4');

/* ---------- controls ---------- */
await page.click('#sceneChips [data-scene="mirror"]'); s = await state();
check('the scene chips switch back to the mirror and leave the card', s.scene === 'mirror' && s.preset === null);
const to = await page.evaluate(() => window.MIRROR_DEBUG.at(0.7, 5));
await page.mouse.move(to[0], to[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('pressing in the strip moves ρ there (σ ≈ 0.7, γ ≈ 5)', s.side === 1 && near(s.delta, 0.2, 0.011) && near(s.gamma, 5, 0.15), JSON.stringify([s.delta, s.gamma]));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); check('key 2 opens the quartic scene', (await state()).scene === 'quartic');
await page.keyboard.press('1'); check('key 1 opens the mirror scene', (await state()).scene === 'mirror');
s = await seek(10); await page.keyboard.press('ArrowRight'); check('→ moves ρ 0.01 closer to the mirror', near((await state()).delta, 0.34, 1e-9));
await page.keyboard.press('Space');
check('Space plays: δ runs down', await until(page, () => { const d = window.MIRROR_DEBUG.state; return d.playing && d.delta < 0.34; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

/* ---------- QUARTIC: the least value of F over the whole supported (δ, γ) domain ---------- */
// Independent of the page: F(½ + it) as the product of its four linear factors (it − (±δ ± iγ)) in complex arithmetic,
// minimized numerically over real t (F is even in t, so over t ≥ 0, the endpoint t = 0 included) by a dense grid and a
// golden-section refinement. No closed form is used here.
const Fprod = (d, g, t) => { let f = [1, 0]; for (const [a, b] of [[d, g], [d, -g], [-d, g], [-d, -g]]) f = cm(f, [-a, t - b]); return f; };
function leastF(d, g) {
  const hi = g + 1, n = 4000; let bi = 0, bf = Infinity;
  for (let i = 0; i <= n; i++) { const f = Fprod(d, g, hi * i / n)[0]; if (f < bf) { bf = f; bi = i; } }
  let a = Math.max(0, hi * (bi - 1) / n), b = Math.min(hi, hi * (bi + 1) / n);
  const r = (Math.sqrt(5) - 1) / 2;
  for (let k = 0; k < 200 && b - a > 1e-13; k++) { const c = b - r * (b - a), e = a + r * (b - a); if (Fprod(d, g, c)[0] <= Fprod(d, g, e)[0]) b = e; else a = c; }
  const tm = (a + b) / 2, fa = Fprod(d, g, 0)[0], fm = Fprod(d, g, tm)[0];
  return fa <= fm ? { t: 0, f: fa } : { t: tm, f: fm };
}
const SUPD = { '⁰': 0, '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9 };
/** The number a HUD prints after "最低" / "AT LEAST": decimals or m.mm×10ⁿ; with the precision it was printed at. */
function hudNumber(text) {
  const m = /(?:最低|AT LEAST)\s+([0-9.]+)(?:×10([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))?/.exec(text || '');
  if (!m) return null;
  if (m[2]) { const neg = m[2][0] === '⁻', e = [...m[2].replace('⁻', '')].reduce((v, ch) => v * 10 + SUPD[ch], 0); return { v: parseFloat(m[1]) * 10 ** (neg ? -e : e), rel: 0.006 }; }
  const dec = (m[1].split('.')[1] || '').length; return { v: parseFloat(m[1]), abs: 0.5 * 10 ** -dec + 1e-12 };
}
// a numerical minimum at a double zero (δ = 0) is only zero to rounding: below 1e-20 it counts as 0
const shows = (h, f) => h && (h.rel ? Math.abs(h.v - f) <= h.rel * f : Math.abs(h.v - f) <= h.abs) && (f > 1e-20 ? h.v > 0 : h.v === 0);
const setGamma = async (g) => { await page.evaluate((v) => { const el = document.getElementById('gamma'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, g); };
s = await pick('quartic');
let qBad = [];
for (const d of [0, 0.01, 0.1, 0.25, 0.3, 0.45]) for (const g of [0.3, 0.31, 0.44, 0.45, 0.46, 0.6, 2, 14, 40]) {
  await setGamma(g); s = await seek(45 - 100 * d);
  const want = leastF(d, g), qp = await page.evaluate(() => window.MIRROR_DEBUG.quarticPlot), big = await page.textContent('#hudBig'), sub = await page.textContent('#hudSub');
  const tag = `δ=${d} γ=${g}`;
  if (!(near(s.delta, d, 1e-12) && s.gamma === g)) { qBad.push(`${tag}: state ${s.delta} ${s.gamma}`); continue; }
  if (!(Math.abs(s.fmin - want.f) <= 1e-9 * Math.max(want.f, 1e-6) && Math.abs(s.tmin - want.t) <= 2e-3)) qBad.push(`${tag}: page min ${s.fmin} at ${s.tmin}, numerical ${want.f} at ${want.t}`);
  if (!(qp && qp.t === s.tmin && qp.f === s.fmin && qp.t >= qp.t0 && qp.t <= qp.t1)) qBad.push(`${tag}: plotted mark ${JSON.stringify(qp)}`);
  if (!shows(hudNumber(big), want.f)) qBad.push(`${tag}: HUD "${big}" vs ${want.f}`);
  if (d > 0 ? !sub.includes('不在线上') : !(sub.includes('成对落在线上') && !sub.includes('不在线上') && sub.includes(`±${g.toFixed(2)}`))) qBad.push(`${tag}: HUD sub "${sub}"`);
}
check('QUARTIC over δ ∈ {0 … 0.45} × γ ∈ {0.3 … 40} (54 cases, γ < δ, γ = δ and γ > δ): the page\'s least value of F, its minimizer, the plotted amber mark (in view) and the HUD agree with a numerical minimization of the product of four linear factors', qBad.length === 0, qBad.slice(0, 3).join(' | '));
const wLow = leastF(0.45, 0.3);
check('independent: at δ = 0.45, γ = 0.3 (γ < δ) the least value of F on the line is 0.08555625 at t = 0, not 4δ²γ² = 0.0729', near(wLow.f, 0.08555625, 1e-12) && wLow.t === 0 && Math.abs(wLow.f - 0.0729) > 0.01, JSON.stringify(wLow));

/* ---------- QUARTIC at the end of the rail (δ = 0), as a reader reaches it, in both languages ---------- */
for (const lang of ['zh', 'en']) {
  const p = await T.open('quantum-geometry', 'critical-mirror', `?lang=${lang}&preset=quartic`, { locale: lang === 'en' ? 'en-US' : 'zh-CN' });
  await settle(p, 200);
  await p.focus('#now'); await p.keyboard.press('End'); await settle(p);
  const st = await p.evaluate(() => window.MIRROR_DEBUG.state), qp = await p.evaluate(() => window.MIRROR_DEBUG.quarticPlot);
  const big = await p.textContent('#hudBig'), sub = await p.textContent('#hudSub');
  const at14 = Fprod(0, 14, 14), want = leastF(0, 14);
  check(`${lang}: End on the rail in QUARTIC gives δ = 0, γ = 14: two distinct points and F(½ + 14i) = 0 (product of the four linear factors)`, st.scene === 'quartic' && st.delta === 0 && st.gamma === 14 && st.count === 2 && at14[0] === 0 && at14[1] === 0 && want.f <= 1e-20 && near(want.t, 14, 2e-3), JSON.stringify([st.delta, st.gamma, st.count, at14, want]));
  check(`${lang}: at δ = 0 the page's least value is 0 at t = 14, plotted there`, st.fmin === 0 && st.tmin === 14 && qp && qp.f === 0 && qp.t === 14 && qp.t >= qp.t0 && qp.t <= qp.t1, JSON.stringify([st.fmin, st.tmin, qp]));
  const hud = lang === 'zh'
    ? sub.includes('零点 ½ ± 14.00i 成对落在线上（各为二重）') && sub.includes('F 沿临界线非负，在 t = ±14.00 归零') && !sub.includes('不在线上') && shows(hudNumber(big), 0)
    : sub.includes('Paired zeros ½ ± 14.00i lie on the line (each double)') && sub.includes('F is nonnegative along the line and vanishes at t = ±14.00') && !sub.includes('off the line') && shows(hudNumber(big), 0);
  check(`${lang}: the HUD says the paired zeros lie on the line and F vanishes at t = ±γ, not that they are off the line`, hud, `${big} / ${sub}`);
  const drawer = await p.evaluate((l) => document.querySelector(`#drawer .${l} ol li:nth-child(3)`).textContent, lang);
  const dOk = lang === 'zh'
    ? drawer.includes('δ ≠ 0 时处处为正') && drawer.includes('γ ≥ δ 时最小值 4δ²γ²（在 t = ±√(γ² − δ²) 处）') && drawer.includes('γ < δ 时最小值 (δ² + γ²)²（在 t = 0 处）') && drawer.includes('δ = 0 时零点 ½ ± iγ 成对落在线上（各为二重），F = (γ² − t²)² 非负，在 t = ±γ 归零') && !drawer.includes('是正实数')
    : drawer.includes('for δ ≠ 0 it is positive everywhere') && drawer.includes('minimum 4δ²γ² at t = ±√(γ² − δ²) when γ ≥ δ') && drawer.includes('(δ² + γ²)² at t = 0 when γ < δ') && drawer.includes('at δ = 0 the zeros ½ ± iγ lie on the line in pairs (each double), and F = (γ² − t²)² is nonnegative and vanishes at t = ±γ') && !drawer.includes('positive real number');
  check(`${lang}: the drawer gives the least value of F in both regimes γ ≥ δ and γ < δ, and the δ = 0 endpoint`, dOk, drawer);
  // the identity behind the δ = 0 text: F = (γ² − t²)² ≥ 0 on the line, from the factors, at a spread of heights
  let endOk = true; for (let t = 0; t <= 30; t += 0.25) { const f = Fprod(0, 14, t); endOk = endOk && Math.abs(f[1]) < 1e-9 && f[0] >= 0 && near(f[0], (196 - t * t) ** 2, 1e-9 * Math.max(1, f[0])); }
  check(`${lang}: independent: at δ = 0 the product of the factors is (γ² − t²)², real and nonnegative`, endOk);
  await p.context().close();
}

/* ---------- γ: one value for the state, the slider and its readout, through every control ---------- */
const gAgree = async (exact = true) => {
  await settle(page);
  const st = await page.evaluate(() => window.MIRROR_DEBUG.state), v = parseFloat(await page.$eval('#gamma', (el) => el.value)), o = await page.textContent('#oGamma');
  const ok = st.gamma >= 0.3 && st.gamma <= 40 && o === st.gamma.toFixed(2) && (exact ? v === st.gamma : Math.abs(v - st.gamma) <= 0.005 + 1e-12);
  return { st, v, o, ok };
};
check('the γ slider spans the whole drag domain 0.3 … 40 in steps of 0.01', await page.$eval('#gamma', (el) => [el.min, el.max, el.step].join()) === '0.3,40,0.01');
s = await pick('quartic');
await page.click('#rew'); await settle(page);
check('rewind in QUARTIC: δ = 0.45, γ still 14', near((await state()).delta, 0.45, 1e-12) && (await state()).gamma === 14);
let to2 = await page.evaluate(() => window.MIRROR_DEBUG.at(0.95, 0.3));
await page.mouse.click(to2[0], to2[1]);
let ga = await gAgree();
const wantNear = leastF(ga.st.delta, ga.st.gamma);
check('click at σ = 0.95, γ = 0.30 (δ = 0.45): ρ moves there, and the state, the slider and its readout agree on γ', ga.ok && ga.st.side === 1 && near(ga.st.delta, 0.45, 1e-12) && near(ga.st.gamma, 0.3, 0.011), JSON.stringify([ga.st.gamma, ga.v, ga.o]));
check('there γ < δ: the least value of F is at t = 0, equal to a numerical minimization, plotted in view, and the HUD prints it', ga.st.gamma < ga.st.delta && ga.st.tmin === 0 && near(ga.st.fmin, wantNear.f, 1e-12) && wantNear.t === 0 && shows(hudNumber(await page.textContent('#hudBig')), wantNear.f)
  && (await page.evaluate(() => { const q = window.MIRROR_DEBUG.quarticPlot; return q.t === 0 && q.t0 === 0; })), JSON.stringify([ga.st.fmin, wantNear]));
to2 = await page.evaluate(() => window.MIRROR_DEBUG.at(0.95, 0.05));
await page.mouse.click(to2[0], to2[1]); ga = await gAgree();
check('a click below the lowest height holds ρ at γ = 0.3: slider 0.3, readout 0.30', ga.ok && ga.st.gamma === 0.3 && ga.v === 0.3 && ga.o === '0.30', JSON.stringify([ga.st.gamma, ga.v, ga.o]));
check('at δ = 0.45, γ = 0.3 the page reads the least value 0.0856 (HUD 0.086), not 0.0729', near(ga.st.fmin, 0.08555625, 1e-12) && /最低 0\.086$/.test(await page.textContent('#hudBig')), await page.textContent('#hudBig'));
// drag ρ upwards past the top of the strip: the height climbs to the top of the domain, and the slider follows
const from = await page.evaluate(() => window.MIRROR_DEBUG.at(0.7, 2));
await page.mouse.move(from[0], from[1]); await page.mouse.down();
for (let k = 0; k < 40 && (await state()).gamma < 40; k++) { await page.mouse.move(from[0], 2 + (k % 2)); await settle(page); }
ga = await gAgree();
check('dragging ρ far above the strip stops at γ = 40, and the slider and readout show 40.00 (not 35)', ga.ok && ga.st.gamma === 40 && ga.v === 40 && ga.o === '40.00', JSON.stringify([ga.st.gamma, ga.v, ga.o]));
await page.mouse.up();
// the slider itself: keyboard and pointer
await page.focus('#gamma');
await page.keyboard.press('Home'); ga = await gAgree();
check('slider, Home: γ = 0.3 in the state, the slider and the readout', ga.ok && ga.st.gamma === 0.3 && ga.o === '0.30');
await page.keyboard.press('ArrowRight'); ga = await gAgree();
check('slider, →: γ = 0.31 everywhere', ga.ok && ga.st.gamma === 0.31 && ga.o === '0.31');
await page.keyboard.press('End'); ga = await gAgree();
check('slider, End: γ = 40 everywhere', ga.ok && ga.st.gamma === 40 && ga.o === '40.00');
await page.keyboard.press('ArrowLeft'); ga = await gAgree();
check('slider, ←: γ = 39.99 everywhere', ga.ok && ga.st.gamma === 39.99 && ga.o === '39.99');
const box = await page.locator('#gamma').boundingBox();
await page.mouse.click(box.x + 1, box.y + box.height / 2); ga = await gAgree();
check('slider, a click at its left end: γ = 0.3 everywhere', ga.ok && ga.st.gamma === 0.3, JSON.stringify([ga.st.gamma, ga.v, ga.o]));
await page.mouse.click(box.x + box.width - 1, box.y + box.height / 2); ga = await gAgree();
check('slider, a click at its right end: γ = 40 everywhere', ga.ok && ga.st.gamma === 40, JSON.stringify([ga.st.gamma, ga.v, ga.o]));
// cards
s = await pick('cayley'); ga = await gAgree(false);
check('CAYLEY keeps the first zero\'s height γ = 14.134725142; the slider sits on 14.13 and the readout shows 14.13', ga.ok && ga.st.gamma === 14.134725142 && ga.v === 14.13 && ga.o === '14.13' && (await page.textContent('#hudSub')).includes('14.1347i') && (ga.st.argW * 180 / Math.PI).toFixed(2) === '4.05');
s = await pick('quartic'); ga = await gAgree();
check('QUARTIC card: γ = 14 everywhere, δ = ¼, least value 49 = 4δ²γ²', ga.ok && ga.st.gamma === 14 && near(ga.st.delta, 0.25, 1e-12) && near(ga.st.fmin, leastF(0.25, 14).f, 1e-9) && near(ga.st.fmin, 49, 1e-9));
// the rail and rewind move δ only
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('End'); ga = await gAgree();
check('rail End (δ = 0): γ unchanged and still agreed', ga.ok && ga.st.delta === 0 && ga.st.gamma === 14);
await page.keyboard.press('Home'); ga = await gAgree();
check('rail Home (δ = 0.45): γ unchanged and still agreed', ga.ok && near(ga.st.delta, 0.45, 1e-12) && ga.st.gamma === 14);
await page.click('#rew'); ga = await gAgree();
check('rewind: γ unchanged and still agreed', ga.ok && near(ga.st.delta, 0.45, 1e-12) && ga.st.gamma === 14);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
