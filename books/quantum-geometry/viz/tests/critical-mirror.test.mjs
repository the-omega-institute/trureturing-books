#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/critical-mirror (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/critical-mirror.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery, every property the page shows is recomputed here independently: the four-point
// orbit and its Cayley images (inversion in the circle), the radial offsets quoted in the chapter, the quartic F along
// the critical line, and ξ(½ + it) from a different method (Borwein's series for η and the Lanczos Γ).
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';
import { plotBudgetChecks } from './plot-budget.mjs';

const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'critical-mirror');
// every chart drawn with kit.plot keeps its readable height in each cited figure, still, cover and lab viewport
await plotBudgetChecks(T, 'quantum-geometry', 'critical-mirror');

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

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
