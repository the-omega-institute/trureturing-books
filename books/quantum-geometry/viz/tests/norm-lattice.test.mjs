#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/norm-lattice (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/norm-lattice.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery come the checks of this page. Every claim is recomputed here independently:
// Eisenstein norms as squared moduli of complex numbers x + y·e^{iπ/3} (cos/sin, not the polynomial), the range of
// Qform by brute-force enumeration over a large box, the discriminant as −4 × the Gram determinant of the two basis
// vectors, the cell area as a cross product, golden integers by the Fibonacci/Lucas recurrences, and φ by Newton's
// method on x² − x − 1.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'norm-lattice');

const page = await T.goto('quantum-geometry', 'norm-lattice', '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.NORM_DEBUG.state); };
const seek = async (c) => { await page.evaluate((v) => window.NORM_DEBUG.seek(v), c); return state(); };
const card = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); return state(); };

/* ---------- independent arithmetic ---------- */
const W = [Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)];
const z = (x, y) => [x + y * W[0], y * W[1]];
const abs2 = (p) => p[0] * p[0] + p[1] * p[1];
/** The values ≤ lim of a binary form f on a large integer box. */
function rangeOf(f, lim, R = 40) { const s = new Set(); for (let a = -R; a <= R; a++) for (let b = -R; b <= R; b++) { const v = f(a, b); if (v <= lim) s.add(Math.round(v)); } return [...s].sort((a, b) => a - b); }
const loeschian = rangeOf((x, y) => Math.round(abs2(z(x, y))), 13);
const qf = (t) => (p, q) => p * p - (2 * t + 1) * p * q + (t * t + t + 1) * q * q;
let phi = 2; for (let i = 0; i < 60; i++) phi -= (phi * phi - phi - 1) / (2 * phi - 1);
const phib = 1 - phi;
const fib = [0, 1], luc = [2, 1];
for (let n = 2; n < 12; n++) { fib.push(fib[n - 1] + fib[n - 2]); luc.push(luc[n - 1] + luc[n - 2]); }

check('brute force: the Eisenstein values ≤ 13 are 0, 1, 3, 4, 7, 9, 12, 13', JSON.stringify(loeschian) === '[0,1,3,4,7,9,12,13]', JSON.stringify(loeschian));

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === 'norm-lattice');
check('opens on the HEX card, paused, in the complex plane at t = −1', s.preset === 'hex' && !s.playing && s.scene === 'eis' && Math.abs(s.m - 1) < 1e-9 && Math.abs(s.t + 1) < 1e-9);

/* ---------- HEX ---------- */
s = await card('hex');
let worst = 0;
for (const p of s.points) { const w = z(p.x, p.y); worst = Math.max(worst, Math.hypot(w[0] - p.X, w[1] - p.Y)); }
check('HEX: every point sits at x + y·e^{iπ/3}', s.points.length > 50 && worst < 1e-9, `${worst}`);
const seven = [];
for (let x = -10; x <= 10; x++) for (let y = -10; y <= 10; y++) if (Math.abs(abs2(z(x, y)) - 7) < 1e-9) seven.push([x, y]);
check('HEX: the amber point (−1, 3) has |z|² = 7 and 12 lattice points share that circle', JSON.stringify(s.cur) === '[-1,3]' && seven.length === 12 && s.onLevel === 12 && Math.abs(s.value - 7) < 1e-9);
check('HEX: the dashed circles 2, 5, 6 carry no lattice point', [2, 5, 6].every((n) => !loeschian.includes(n)) && s.points.every((p) => ![2, 5, 6].some((n) => Math.abs(abs2([p.X, p.Y]) - n) < 1e-6)));
check('HEX: the key readout says 7', s.key.trim() === '7');

/* ---------- SKEW ---------- */
s = await card('skew');
check('SKEW: integer coordinates, t = 2, the amber point at (P, Q) = (8, 3)', Math.abs(s.m) < 1e-9 && Math.abs(s.t - 2) < 1e-9 && s.PQ[0] === 8 && s.PQ[1] === 3);
check('SKEW: Qform(2, 8, 3) = 64 − 120 + 63 = 7, as the page says', 64 - 120 + 63 === 7 && Math.abs(s.value - 7) < 1e-9 && qf(2)(8, 3) === 7);
check('SKEW: the form is P² − 5PQ + 7Q²', s.coef[0] === 1 && s.coef[1] === -5 && s.coef[2] === 7);
check('SKEW: the cyan ellipse still carries 12 points', s.onLevel === 12);
await page.click('[data-view="1"]');
s = await state();
const zc = z(-1, 3), amber = s.points.find((p) => p.x === -1 && p.y === 3);
check('view chip: the complex plane puts (8, 3) back at (−1, 3) with |z|² = 7', Math.abs(s.m - 1) < 1e-9 && amber && Math.hypot(amber.X - zc[0], amber.Y - zc[1]) < 1e-9 && Math.abs(abs2(zc) - 7) < 1e-9);

/* ---------- SHEAR ---------- */
s = await card('shear');
check('SHEAR plays', await until(page, () => window.NORM_DEBUG.state.clock > 0.2));
const sh0 = await seek(0), sh1 = await seek(3);
const key = (p) => `${p.x},${p.y}`, m0 = new Map(sh0.points.map((p) => [key(p), p]));
let moved = 0;
for (const p of sh1.points) { const q = m0.get(key(p)); if (q) moved = Math.max(moved, Math.hypot(p.X - q.X, p.Y - q.Y)); }
check('SHEAR: in the plane the points do not move from t = −1 to t = 2', sh1.points.length > 50 && moved < 1e-9, `${moved}`);
let areaWorst = 0, discWorst = 0, coefWorst = 0;
for (const c of [0, 0.4, 1, 1.7, 2, 2.55, 3]) {
  const x = await seek(c), { u1, u2 } = x.basis;
  const area = Math.abs(u1[0] * u2[1] - u1[1] * u2[0]);
  const g11 = u1[0] ** 2 + u1[1] ** 2, g12 = u1[0] * u2[0] + u1[1] * u2[1], g22 = u2[0] ** 2 + u2[1] ** 2;
  areaWorst = Math.max(areaWorst, Math.abs(area - Math.sqrt(3) / 2));
  discWorst = Math.max(discWorst, Math.abs(-4 * (g11 * g22 - g12 * g12) + 3), Math.abs(x.disc + 3));
  coefWorst = Math.max(coefWorst, Math.abs(x.coef[0] - g11), Math.abs(x.coef[1] - 2 * g12), Math.abs(x.coef[2] - g22));
}
check('SHEAR: the cell area is √3/2 all along the rail (cross product)', areaWorst < 1e-9, `${areaWorst}`);
check('SHEAR: the coefficients are the Gram entries (|u₁|², 2u₁·u₂, |u₂|²)', coefWorst < 1e-9, `${coefWorst}`);
check('SHEAR: −4 × Gram determinant = −3 = the page’s discriminant, for every t', discWorst < 1e-9, `${discWorst}`);
const endU2 = (await seek(3)).basis.u2;
const onLattice = (w) => { const y = Math.round(w[1] / W[1]), x = Math.round(w[0] - y * W[0]); const q = z(x, y); return Math.hypot(q[0] - w[0], q[1] - w[1]) < 1e-9; };
const midU2 = (await seek(1.5)).basis.u2;
check('SHEAR: at integer t, u₂ lands on a lattice point; between, it does not', onLattice(endU2) && onLattice((await seek(1)).basis.u2) && !onLattice(midU2));

/* ---------- RANGE ---------- */
s = await card('range');
check('RANGE plays', await until(page, () => window.NORM_DEBUG.state.clock > 0.2));
for (const T0 of [-1, 0, 1, 2]) {
  const x = await seek(T0 + 1), [wx, wy] = x.window;
  const ints = x.points.every((p) => Math.abs(p.X - Math.round(p.X)) < 1e-9 && Math.abs(p.Y - Math.round(p.Y)) < 1e-9);
  const seen = new Set(x.points.map((p) => `${Math.round(p.X)},${Math.round(p.Y)}`));
  let full = true; for (let q = -Math.floor(wy); q <= Math.floor(wy); q++) for (let p = -Math.floor(wx); p <= Math.floor(wx); p++) if (!seen.has(`${p},${q}`)) full = false;
  const brute = rangeOf(qf(T0), 13);
  const normsKept = x.points.every((p) => Math.abs(qf(T0)(Math.round(p.X), Math.round(p.Y)) - abs2(z(p.x, p.y))) < 1e-9);
  check(`RANGE t = ${T0}: points fill the integer grid one to one`, ints && full && seen.size === x.points.length);
  check(`RANGE t = ${T0}: each point keeps its norm, Qform(t, P, Q) = |z|²`, normsKept);
  check(`RANGE t = ${T0}: values taken = brute-force range of Qform = Eisenstein values`, JSON.stringify(x.taken) === JSON.stringify(brute) && JSON.stringify(brute) === JSON.stringify(loeschian), JSON.stringify(x.taken));
}
s = await seek(1.5);
check('RANGE: between integers, the odd rows sit off the grid and the page says so', s.points.some((p) => Math.abs(p.X - Math.round(p.X)) > 0.4) && s.note.includes('不是整数'));

/* ---------- NORM ---------- */
s = await card('norm');
check('NORM: golden scene, g = (2, 1), (g, ḡ) axes', s.scene === 'gold' && JSON.stringify(s.g) === '[2,1]' && Math.abs(s.alpha) < 1e-9);
check('NORM: g = 2 + φ and ḡ = 2 + φ̄ (φ by Newton)', Math.abs(s.uv[0] - (2 + phi)) < 1e-9 && Math.abs(s.uv[1] - (2 + phib)) < 1e-9);
check('NORM: rectangle area g·ḡ = 5 = 2² + 2·1 − 1², and the key says 5', Math.abs(s.uv[0] * s.uv[1] - 5) < 1e-9 && s.norm === 5 && s.key.trim() === '5');

/* ---------- PELL ---------- */
s = await card('pell');
const tr = s.uv[0] + s.uv[1], bb = (s.uv[0] - s.uv[1]) / Math.sqrt(5);
check('PELL: the frame is turned, the diagonal shadow is the trace 5 and the other is √5·b with b = 1', Math.abs(s.alpha - 1) < 1e-9 && Math.abs(tr - 5) < 1e-9 && Math.abs(bb - 1) < 1e-9);
check('PELL: trace² − 5b² = 20 = 4 × norm, in integers', 5 * 5 - 5 * 1 * 1 === 4 * s.norm && Math.abs(tr * tr - 5 * bb * bb - 4 * s.uv[0] * s.uv[1]) < 1e-9);
check('PELL: the readout shows 20 = 4 × 5', (await page.textContent('#ro3')).includes('20 = 4 × 5'));

/* ---------- UNITS ---------- */
s = await card('units');
check('UNITS plays', await until(page, () => window.NORM_DEBUG.state.clock > 0.2));
let ok = true, detail = '';
for (let k = 0; k <= 4; k++) {
  const x = await seek(k), [a, b] = x.g;
  const good = 2 * a + b === luc[k] && b === fib[k] && x.norm === (k % 2 ? -1 : 1) && Math.abs(x.uv[0] - phi ** k) < 1e-9 && Math.abs(x.uv[1] - phib ** k) < 1e-9;
  if (!good) { ok = false; detail = `k=${k} ${JSON.stringify(x.g)} ${x.norm}`; }
}
check('UNITS: φᵏ gives (2a + b, b) = (Lₖ, Fₖ), norm (−1)ᵏ, and sits at (φᵏ, φ̄ᵏ), k = 0 … 4', ok, detail);
s = await seek(3.8);
check('UNITS: between steps the page says the slide is animation', s.moving && s.note.length > 4);

/* ---------- controls ---------- */
await page.click('[data-scene="eis"]'); s = await state();
check('scene chip: back to Eisenstein, no card selected', s.scene === 'eis' && s.preset === null);
let d = await page.evaluate(() => window.NORM_DEBUG.pointAt(2, 1));
await page.mouse.click(d[0], d[1]); s = await state();
check('clicking a lattice point makes it the amber point (norm 7 → 2² + 2 + 1 = 7)', JSON.stringify(s.cur) === '[2,1]' && Math.abs(s.value - abs2(z(2, 1))) < 1e-9);
d = await page.evaluate(() => window.NORM_DEBUG.pointAt(1, 1));
await page.mouse.click(d[0], d[1]); s = await state();
check('clicking (1, 1): norm 3, six points on its circle', JSON.stringify(s.cur) === '[1,1]' && Math.abs(s.value - 3) < 1e-9 && s.onLevel === 6);
await page.click('[data-scene="gold"]'); await settle(page);
await page.click('[data-frame="1"]'); s = await state();
check('frame chip turns the axes', Math.abs(s.alpha - 1) < 1e-9);
d = await page.evaluate(() => window.NORM_DEBUG.pointAt(3, -1));
await page.mouse.click(d[0], d[1]); s = await state();
check('clicking a golden integer starts from it: (3, −1) has norm 9 − 3 − 1 = 5', JSON.stringify(s.g0) === '[3,-1]' && s.norm === 5 && s.k === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); s = await state();
check('→ multiplies by φ once: (3, −1)·φ = (−1, 2), norm −5', s.k === 1 && JSON.stringify(s.g) === '[-1,2]' && s.norm === -5);
await page.keyboard.press('Home');
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.NORM_DEBUG.state.clock > 0.2));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
