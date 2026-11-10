#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/sphere-escape (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/sphere-escape.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// Reads page state through the read-only window.SE_DEBUG probe and checks every mesh count, angular defect, Taylor
// remainder, iteration and contracting set sequence against an independent implementation written here.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'sphere-escape';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const pageSource = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'index.html'), 'utf8');
const CJK = /[　-〿㐀-鿿＀-￯]/;

/* ---------- independent mathematical implementation ---------- */
const DEG = Math.PI / 180;
const V_LEVELS = [12, 42, 60, 162, 642];
const PHI = (1 + Math.sqrt(5)) / 2;
const near = (a, b, tol = 1e-12) => Math.abs(a - b) <= tol;
// Math.cos in the browser and in Node may differ in the last place (different V8 builds), so values that pass through
// cos are compared to a few ulps, never bit for bit.
const ULP = 1e-15;
const fact = (n) => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };

/** Taylor partial sum Σ_{j<N} (−1)ʲ θ²ʲ/(2j)! by explicit powers and factorials; bound θ²ᴺ/(2N)!. */
function taylorModel(theta, N) {
  let poly = 0;
  for (let j = 0; j < N; j++) poly += (-1) ** j * theta ** (2 * j) / fact(2 * j);
  return { poly, exact: Math.cos(theta), direct: Math.abs(Math.cos(theta) - poly), bound: Math.abs(theta) ** (2 * N) / fact(2 * N) };
}

/** θ* by bisection on cos θ − θ over [0, 1] (independent of the page's Newton iteration). */
function dottieBisect() {
  let a = 0, b = 1;
  for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; }
  return (a + b) / 2;
}
const THETA_STAR = dottieBisect();

function iterModel(theta0Deg, steps) {
  const th0 = theta0Deg * DEG;
  const theta = [th0];
  for (let k = 0; k < steps; k++) theta.push(Math.cos(theta[k]));
  const x = [Math.max(0.2, th0)];
  for (let k = 0; k < steps; k++) x.push(1 + 1 / x[k]);
  return {
    theta, dRes: theta.map((t) => Math.abs(Math.cos(t) - t)),
    x, gRes: x.map((v) => Math.abs(1 + 1 / v - v))
  };
}

/** Readings j/16 ∈ [0, π]; S₀ = readings between θ₀ and cos θ₀ widened by 1/16; U keeps the better half by residual. */
function setsModel(theta0Deg, steps) {
  const th0 = theta0Deg * DEG, c0 = Math.cos(th0);
  const lo = Math.min(th0, c0) - 1 / 16, hi = Math.max(th0, c0) + 1 / 16;
  const r = (j) => Math.abs(Math.cos(j / 16) - j / 16);
  const S0 = [];
  for (let j = 0; j / 16 <= Math.PI; j++) if (j / 16 >= lo - 1e-12 && j / 16 <= hi + 1e-12) S0.push(j);
  const U = (A) => (A.length <= 1 ? A.slice() : [...A].sort((a, b) => r(a) - r(b) || a - b).slice(0, Math.ceil(A.length / 2)).sort((a, b) => a - b));
  const seq = [S0];
  for (let n = 0; n < Math.max(steps, S0.length) + 1; n++) seq.push(U(seq[n]));
  return { S0, seq, r };
}

/** Counts, degrees, orientation, convexity and defects of a closed triangulated surface. */
function meshModel({ P, faces }) {
  const V = P.length, F = faces.length;
  const und = new Map(), dir = new Set();
  let orientedOnce = true;
  for (const f of faces) for (let k = 0; k < 3; k++) {
    const a = f[k], b = f[(k + 1) % 3];
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    und.set(key, (und.get(key) || 0) + 1);
    if (dir.has(`${a},${b}`)) orientedOnce = false;
    dir.add(`${a},${b}`);
  }
  const E = und.size;
  const manifold = [...und.values()].every((c) => c === 2);
  const deg = new Array(V).fill(0);
  for (const key of und.keys()) { const [a, b] = key.split(',').map(Number); deg[a]++; deg[b]++; }
  const angle = new Array(V).fill(0);
  const ang = (o, p, q) => {
    const u = [p[0] - o[0], p[1] - o[1], p[2] - o[2]], v = [q[0] - o[0], q[1] - o[1], q[2] - o[2]];
    const c = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) / (Math.hypot(...u) * Math.hypot(...v));
    return Math.acos(Math.max(-1, Math.min(1, c)));
  };
  let convex = Infinity, outward = true;
  for (const f of faces) {
    for (let k = 0; k < 3; k++) angle[f[k]] += ang(P[f[k]], P[f[(k + 1) % 3]], P[f[(k + 2) % 3]]);
    const [a, b, c] = f.map((i) => P[i]);
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
    const off = n[0] * a[0] + n[1] * a[1] + n[2] * a[2];
    if (off <= 0) outward = false;
    for (let m = 0; m < V; m++) {
      if (m === f[0] || m === f[1] || m === f[2]) continue;
      convex = Math.min(convex, off - (n[0] * P[m][0] + n[1] * P[m][1] + n[2] * P[m][2]));
    }
  }
  const defect = angle.map((s) => 2 * Math.PI - s);
  const deg5 = deg.filter((x) => x === 5).length, deg6 = deg.filter((x) => x === 6).length;
  return {
    V, E, F, chi: V - E + F, manifold, orientedOnce, outward, convex, deg5, deg6,
    unit: P.every((p) => near(Math.hypot(...p), 1, 1e-12)),
    comboDeg: deg.reduce((s, x) => s + (6 - x) * 60, 0),
    metricTotal: defect.reduce((s, x) => s + x, 0), minDefect: Math.min(...defect)
  };
}

/* ---------- open ---------- */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
const D = (fn, arg) => page.evaluate(fn, arg);
const settle = async () => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(() => !SE_DEBUG.pending(), null, { timeout: 30000 });
};
const text = (sel) => D((s) => document.querySelector(s).textContent, sel);
const open = async (query) => {
  await T.goto(BOOK, ID, query);
  await page.waitForFunction(() => window.SE_DEBUG && SE_DEBUG.frames() > 0, null, { timeout: 30000 });
};
const sameState = (s, [v, th, n, p, k]) => s.vIdx === v && s.theta0 === th && s.taylorN === n && near(s.pitch, p) && s.steps === k;

await open('?lang=zh');
let st = await D(() => SE_DEBUG.state());
check('opens on (V = 162, θ₀ = 60°, N = 3, pitch 0.25, k = 10)', sameState(st, [3, 60, 3, 0.25, 10]), JSON.stringify(st));
check('page carries its id and runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');
const zhCount = (pageSource.match(/class="(?:[^"]*\s)?zh(?:\s[^"]*)?"/g) || []).length;
const enCount = (pageSource.match(/class="(?:[^"]*\s)?en(?:\s[^"]*)?"/g) || []).length;
check('index.html has as many .zh as .en fragments (source and DOM)', zhCount > 0 && zhCount === enCount
  && (await D(() => document.querySelectorAll('.zh').length === document.querySelectorAll('.en').length)), `${zhCount} vs ${enCount}`);
check('SE_DEBUG is a frozen read-only probe and TRV_THUMB is a function', await D(() => Object.isFrozen(SE_DEBUG) && typeof window.TRV_THUMB === 'function'));
const before = await D(() => { const i = SE_DEBUG.info(); i.dottie.theta[0] = 99; i.sets.S0.push(-1); return SE_DEBUG.info(); });
check('mutating a probe snapshot does not touch page state', before.dottie.theta[0] === 60 * DEG && !before.sets.S0.includes(-1));
check('SE_DEBUG.levels() lists V ∈ {12, 42, 60, 162, 642}', JSON.stringify(await D(() => SE_DEBUG.levels())) === JSON.stringify(V_LEVELS));

/* ---------- the five meshes: Euler, degrees, orientation, convexity, Descartes ---------- */
for (let v = 0; v < 5; v++) {
  await D((x) => SE_DEBUG.set(x, 60), v); await settle();
  const mesh = await D((x) => SE_DEBUG.mesh(x), v);
  const info = await D(() => SE_DEBUG.info());
  const m = meshModel(mesh);
  const Vn = V_LEVELS[v];
  check(`V = ${Vn}: E = 3V − 6 = ${3 * Vn - 6}, F = 2V − 4 = ${2 * Vn - 4}, V − E + F = 2 (independent count and page agree)`,
    m.V === Vn && m.E === 3 * Vn - 6 && m.F === 2 * Vn - 4 && m.chi === 2 && info.V === m.V && info.E === m.E && info.F === m.F && info.chi === 2,
    JSON.stringify({ m: [m.V, m.E, m.F], page: [info.V, info.E, info.F] }));
  check(`V = ${Vn}: closed, consistently outward-oriented, convex, vertices on S²`, m.manifold && m.orientedOnce && m.outward && m.convex > 0 && m.unit, JSON.stringify({ manifold: m.manifold, oriented: m.orientedOnce, outward: m.outward, convex: m.convex }));
  check(`V = ${Vn}: exactly 12 degree-5 and ${Vn - 12} degree-6 vertices`, m.deg5 === 12 && m.deg6 === Vn - 12 && info.deg5 === 12 && info.deg6 === Vn - 12 && info.degOther === 0);
  check(`V = ${Vn}: equilateral-model defect 12 × 60° = 720°; metric defects all > 0 and sum to 720° (= 4π)`,
    m.comboDeg === 720 && near(info.comboTotalDeg, 720, 1e-9) && near(m.metricTotal, 4 * Math.PI, 1e-9) && near(info.metricTotalDeg, 720, 1e-8)
    && m.minDefect > 0 && info.minDefectDeg > 0 && near(info.minDefectDeg, m.minDefect / DEG, 1e-7),
    JSON.stringify({ combo: m.comboDeg, metric: m.metricTotal, page: info.metricTotalDeg, min: info.minDefectDeg }));
  if (v === 0) check('V = 12: the icosahedron puts the whole 720° on its 12 vertices (60° each)', near(info.pentShare, 1, 1e-12) && near(info.pentMeanDeg, 60, 1e-9));
}
const shares = [];
for (let v = 0; v < 5; v++) { await D((x) => SE_DEBUG.set(x, 60), v); shares.push(await D(() => SE_DEBUG.info().pentShare)); }
check('the degree-5 share of the metric defect falls as the dome gets finer (V = 12 → 42 → 162 → 642)', shares[0] > shares[1] && shares[1] > shares[3] && shares[3] > shares[4], shares.map((s) => s.toFixed(4)).join(', '));

/* ---------- constants: θ*, sin θ*, sin 1, φ ---------- */
let info = await D(() => SE_DEBUG.info());
check('θ* agrees with an independent bisection and with 0.73908513321516', near(info.thetaStar, THETA_STAR, ULP) && near(info.thetaStar, 0.73908513321516, 1e-13) && Math.abs(Math.cos(info.thetaStar) - info.thetaStar) <= 5e-16, String(info.thetaStar));
check('sin θ* = √(1 − θ*²) ≈ 0.6736120292 and equals sin(θ*)', near(info.sinStar, Math.sqrt(1 - THETA_STAR ** 2), ULP) && near(info.sinStar, 0.6736120292, 1e-9) && near(info.sinStar, Math.sin(info.thetaStar), ULP), String(info.sinStar));
check('Banach rate sin 1 ≈ 0.84147098 < 1 and φ = (1 + √5)/2 with 1 + 1/φ = φ', near(info.sin1, 0.8414709848, 1e-9) && info.sin1 < 1 && near(info.phi, PHI, 0) && near(1 + 1 / info.phi, info.phi, 1e-15));

/* ---------- presets & independent verification ---------- */
const presets = [
  ['0,60,2,0.20,8', [0, 60, 2, 0.2, 8]],
  ['2,90,3,0.30,12', [2, 90, 3, 0.3, 12]],
  ['1,42,1,0.00,16', [1, 42, 1, 0, 16]],
  ['4,180,4,0.40,10', [4, 180, 4, 0.4, 10]]
];
function agrees(x, [v, th, n, p, k]) {
  const it = iterModel(th, k), tm = taylorModel(th * DEG, n), sm = setsModel(th, k);
  const okT = near(x.taylor.poly, tm.poly, 1e-14) && near(x.taylor.exact, tm.exact, ULP) && near(x.taylor.bound, tm.bound, Math.max(1e-300, tm.bound * 1e-12))
    && near(x.taylor.residual, tm.direct, 3 * ULP) && x.taylor.residual <= x.taylor.bound && (th === 0 ? x.taylor.residual === 0 : x.taylor.residual > 0)
    && x.taylor.degree === 2 * n - 2;
  const okD = x.dottie.theta.length === k + 1 && x.dottie.theta.every((t, i) => near(t, it.theta[i], 20 * ULP)) && x.dottie.residual.every((r, i) => near(r, it.dRes[i], 40 * ULP) && r > 0);
  const okG = x.golden.x.every((g, i) => near(g, it.x[i], 1e-15) && g > 0) && x.golden.residual.every((r, i) => near(r, it.gRes[i], 1e-15)) && near(x.golden.x0, Math.max(0.2, th * DEG), 0);
  const okS = JSON.stringify(x.sets.S0) === JSON.stringify(sm.S0) && x.sets.seq.every((a, i) => JSON.stringify(a) === JSON.stringify(sm.seq[i]));
  return { okT, okD, okG, okS, all: x.vIdx === v && x.V === V_LEVELS[v] && near(x.pitch, p) && x.steps === k && okT && okD && okG && okS };
}
for (const [code, params] of presets) {
  await page.click(`#presets [data-preset="${code}"]`); await settle();
  const s = await D(() => SE_DEBUG.state());
  const x = await D(() => SE_DEBUG.info());
  const pressed = await D((c) => document.querySelector(`#presets [data-preset="${c}"]`).getAttribute('aria-pressed'), code);
  const others = await D((c) => [...document.querySelectorAll('#presets [data-preset]')].filter((b) => b.dataset.preset !== c).every((b) => b.getAttribute('aria-pressed') === 'false'), code);
  check(`preset ${code} applies and is the only aria-pressed preset`, sameState(s, params) && pressed === 'true' && others, JSON.stringify(s));
  const a = agrees(x, params);
  check(`preset ${code}: Taylor, Dottie, golden and set sequences agree with the independent model`, a.all, JSON.stringify(a));
  check(`preset ${code}: the V chip and V readout follow (V = ${V_LEVELS[params[0]]})`, (await D(() => document.querySelector('#vChips [aria-pressed="true"]').dataset.v)) === String(params[0]) && (await text('#vOut')) === `V = ${V_LEVELS[params[0]]}`);
}
check('a preset shows a toast naming it', /载入预设/.test(await text('#toast')));

/* ---------- theorem-shaped properties of the page's sequences ---------- */
function setProps(sets) {
  const sub = (a, b) => a.every((x) => b.includes(x));
  const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
  const shrinking = sets.seq.every((a, i) => i === 0 || sub(a, sets.seq[i - 1]));
  const stable = sets.seq.every((a, n) => n < sets.N || eq(a, sets.seq[sets.N]));
  const strict = sets.seq.slice(0, -1).filter((a, n) => !eq(a, sets.seq[n + 1])).length;
  return { shrinking, stable, strict, ok: shrinking && stable && sets.N <= sets.card0 && sets.changes === strict && strict <= sets.card0 && sets.rBest > 0 && sets.final.length >= 1 };
}
let allOk = true, badMsg = '';
let seed = 2026;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (let t = 0; t < 60; t++) {
  const params = [Math.floor(rnd() * 5), Math.floor(rnd() * 181), 1 + Math.floor(rnd() * 6), Math.round(rnd() * 50) / 100, 1 + Math.floor(rnd() * 20)];
  await D((p) => SE_DEBUG.set(...p), params);
  const x = await D(() => SE_DEBUG.info());
  const a = agrees(x, params), sp = setProps(x.sets);
  const it = iterModel(params[1], params[4]);
  // Banach: θ₁ ∈ [−1, 1], so from k = 1 on every step contracts the distance to θ* by at most sin 1. From k = 2 on the
  // iterates lie in [cos 1, 1] ⊂ [0, π], where cos is decreasing, so they alternate around θ* (θ₁ may be negative).
  let banach = true;
  for (let k = 1; k < params[4]; k++) {
    if (x.dottie.err[k + 1] > Math.sin(1) * x.dottie.err[k] + 1e-15) banach = false;
    if (k >= 2 && (it.theta[k] - THETA_STAR) * (it.theta[k + 1] - THETA_STAR) > 0) banach = false;
  }
  if (!a.all || !sp.ok || !banach || x.helixLift !== params[3] || x.helixClosed !== (params[3] === 0)) {
    allOk = false;
    badMsg = `${params} ${JSON.stringify({ a, sp, banach })}`;
    break;
  }
}
check('60 pseudo-random states: page values match the model; U(S) ⊆ S, N ≤ |S₀|, strict changes ≤ |S₀|, final residual > 0; Banach rate ≤ sin 1 and alternation from k = 2', allOk, badMsg);

let taylorOk = true, taylorMsg = '';
for (let n = 1; n <= 6 && taylorOk; n++) {
  for (const th of [0, 1e-6, 0.01, 0.1, 0.5, THETA_STAR, 1, 2, 2.5, 3, Math.PI]) {
    const x = await D(([a, b]) => SE_DEBUG.taylorAt(a, b), [th, n]);
    const tm = taylorModel(th, n);
    const ok = near(x.poly, tm.poly, 1e-14) && near(x.residual, tm.direct, 3 * ULP) && x.residual <= tm.bound * (1 + 1e-12)
      && (th === 0 ? x.residual === 0 : x.residual > 0) && near(x.bound, tm.bound, Math.max(1e-300, tm.bound * 1e-12));
    if (!ok) { taylorOk = false; taylorMsg = `N=${n} θ=${th} ${JSON.stringify(x)} vs ${JSON.stringify(tm)}`; break; }
  }
}
check('Taylor remainder: 0 < |R₂N(θ)| ≤ θ²ᴺ/(2N)! for θ ∈ (0, π], N = 1 … 6 (R₂N(0) = 0)', taylorOk, taylorMsg);

/* ---------- controls: chips, sliders, number boxes, steppers, clamping, keyboard ---------- */
await D(() => SE_DEBUG.reset()); await settle();
await page.click('#vChips [data-v="2"]'); await settle();
await page.fill('#theta0Num', '75'); await page.press('#theta0Num', 'Enter'); await settle();
await page.locator('#taylorN').fill('5'); await settle();
await page.click('#pitchInc'); await page.click('#stepsDec'); await settle();
st = await D(() => SE_DEBUG.state());
check('chip, number box, slider and steppers update (V=60, θ₀=75, N=5, pitch 0.26, k=9)', sameState(st, [2, 75, 5, 0.26, 9]), JSON.stringify(st));
await page.locator('#vIdx').fill('4'); await settle();
check('the V slider selects V = 642', (await D(() => SE_DEBUG.info().V)) === 642);
// settle after each commit: a pending render rewrites every number box, which would undo a fill not yet committed
await page.fill('#theta0Num', '999'); await page.press('#theta0Num', 'Enter'); await settle();
await page.fill('#pitchNum', '5'); await page.press('#pitchNum', 'Enter'); await settle();
await page.fill('#stepsNum', '-3'); await page.press('#stepsNum', 'Enter'); await settle();
await page.fill('#taylorNNum', '0'); await page.press('#taylorNNum', 'Enter'); await settle();
st = await D(() => SE_DEBUG.state());
check('out-of-range inputs are clamped (θ₀ = 180, pitch = 0.50, k = 1, N = 1)', st.theta0 === 180 && near(st.pitch, 0.5) && st.steps === 1 && st.taylorN === 1, JSON.stringify(st));
check('steppers disable at their limits', await D(() => ['theta0Inc', 'pitchInc', 'stepsDec', 'taylorNDec'].every((id) => document.getElementById(id).disabled)));
await page.click('body', { position: { x: 5, y: 5 } });
await page.keyboard.press('v'); await settle();
check('V cycles the polyhedron (642 → 12)', (await D(() => SE_DEBUG.state().vIdx)) === 0);
await page.keyboard.press(']'); await page.keyboard.press(']'); await page.keyboard.press('['); await settle();
check('] and [ step the iteration count', (await D(() => SE_DEBUG.state().steps)) === 2);
await page.keyboard.press('r'); await settle();
st = await D(() => SE_DEBUG.state());
check('R resets to the default state', sameState(st, [3, 60, 3, 0.25, 10]), JSON.stringify(st));

/* ---------- canvas: drawing, magenta defect vertices, drag rotation, labels ---------- */
const pix = await D(() => {
  const c = document.getElementById('view');
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let lit = 0, magentaLeft = 0;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) {
    const i = (y * c.width + x) * 4;
    if (d[i] + d[i + 1] + d[i + 2] > 180) lit++;
    if (x < c.width / 2 && d[i] > 200 && d[i + 1] < 110 && d[i + 2] > 150) magentaLeft++;
  }
  return { lit, magentaLeft };
});
check('the four panels are drawn and the left half shows magenta degree-5 vertices', pix.lit > 4000 && pix.magentaLeft > 60, JSON.stringify(pix));
const yaw0 = await D(() => SE_DEBUG.state().yaw);
const box = await page.locator('#view').boundingBox();
// (0.25 W, 0.18 H) lies in the polyhedron panel in both arrangements: landscape (left half, top 70 %) and portrait (top 36 %)
await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.18);
await page.mouse.down(); await page.mouse.move(box.x + box.width * 0.25 + 60, box.y + box.height * 0.18 + 10, { steps: 4 }); await page.mouse.up(); await settle();
st = await D(() => SE_DEBUG.state());
check('dragging the polyhedron panel rotates the polyhedron without touching the parameters', st.yaw !== yaw0 && sameState(st, [3, 60, 3, 0.25, 10]));
let labels = await D(() => SE_DEBUG.labels());
check('canvas labels carry the live Euler count, the Lean-checked set bound and θ*', labels.includes('V − E + F = 162 − 480 + 320 = 2')
  && labels.some((l) => /^LEAN ✓ N = \d+ ≤ \|S₀\| = \d+$/.test(l)) && labels.includes('θ* ≈ 0.739085'), labels.slice(0, 8).join(' | '));

/* ---------- Lean links at the pinned commit; evidence tiers; drawer ---------- */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file and line of trureturing.lock.json', links.length >= 8 && links.every(([gid, href]) => {
  const d = lock.declarations[gid];
  return d && d.kind === 'theorem' && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 4)));
const expectedGids = [
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_not_continuous',
  'D5/S3/ConceptDynamics/ObservationTopology/DiagonalTopologicalEscape.complete_diagonal_topological_settlement',
  'D5/S1/FixedPoints/FiniteContractingStability.finite_contracting_updates_stabilize',
  'D5/S1/FixedPoints/Algebraic/GoldenFixedPoint.golden_fixed_point_unique'
];
const cited = [...new Set(links.map(([g]) => g))].sort();
check('the page cites exactly the four frozen theorems', JSON.stringify(cited) === JSON.stringify([...expectedGids].sort()), cited.join(', '));
const paths = await D(() => [...document.querySelectorAll('a[data-trureturing-path]')].map((a) => [a.dataset.trureturingPath, a.href]));
check('trureturing file links are pinned to the locked commit', paths.length >= 3 && paths.every(([p, href]) => href === `https://github.com/${lock.repo}/blob/${lock.commit}/${p}`));
const tiers = await D(() => {
  const boxes = [...document.querySelectorAll('#evidence .lean')];
  const green = boxes.filter((b) => !['num', 'model', 'argued', 'open'].some((c) => b.classList.contains(c)));
  return {
    green: green.length, greenLinked: green.every((b) => b.querySelectorAll('a[data-lean-gid]').length === 1 && b.querySelector('.ok').textContent === 'LEAN ✓'),
    nonGreenUnlinked: boxes.filter((b) => !green.includes(b)).every((b) => !b.querySelector('a[data-lean-gid]') && !/LEAN/.test(b.querySelector('.ok').textContent)),
    lit: !!document.querySelector('#evidence .lean.argued'), model: !!document.querySelector('#evidence .lean.model'),
    open: !!document.querySelector('#evidence .lean.open'), num: !!document.querySelector('#evidence .lean.num')
  };
});
check('evidence tiers: four green LEAN ✓ boxes, each with one theorem link; literature, model, open and numeric boxes carry no Lean link', tiers.green === 4 && tiers.greenLinked && tiers.nonGreenUnlinked && tiers.lit && tiers.model && tiers.open && tiers.num, JSON.stringify(tiers));
check('literature results are labelled as not formalized in this book', /文献结果，未在本书形式化/.test(await text('#litBox .zh')) && /Literature results, not formalized in this book/.test(await text('#litBox .en')));
check('the golden box says the theorem asserts uniqueness, not convergence', /不断言迭代收敛/.test(pageSource) && /not convergence of the iteration/.test(pageSource));

await page.click('#infoBtn');
check('theory drawer opens', (await D(() => document.getElementById('drawer').hidden)) === false);
check('the drawer states that the page is a numerical illustration, not a proof', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
check('drawer chapter links target the top window', await D(() => [...document.querySelectorAll('#drawer a[href*="ch2"]')].every((a) => a.target === '_top' && !a.getAttribute('href').startsWith('/'))));
await page.keyboard.press('Escape');
check('Esc closes the drawer and returns focus to #infoBtn', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* ---------- English mode & zero CJK leftovers (DOM, aria, title, canvas, toast, drawer) ---------- */
await page.click('[data-lang-set="en"]'); await settle();
let left = await cjkLeftovers(page);
check('no visible Chinese in English mode', left.length === 0, left.slice(0, 6).join(' | '));
labels = await D(() => SE_DEBUG.labels());
check('no Chinese in the English canvas labels', labels.length > 20 && labels.every((l) => !CJK.test(l)), labels.filter((l) => CJK.test(l)).slice(0, 4).join(' | '));
for (const [code] of presets) {
  await page.click(`#presets [data-preset="${code}"]`); await settle();
  left = await cjkLeftovers(page);
  labels = await D(() => SE_DEBUG.labels());
  check(`no Chinese in English mode after preset ${code} (DOM, canvas, toast)`, left.length === 0 && labels.every((l) => !CJK.test(l)) && /^Preset loaded/.test(await text('#toast')) && !CJK.test(await text('#toast')), left.concat(labels.filter((l) => CJK.test(l))).slice(0, 6).join(' | '));
}
check('English aria-labels come from data-aria-en', await D(() => [...document.querySelectorAll('[data-aria-en]')].every((el) => el.getAttribute('aria-label') === el.dataset.ariaEn)));
await page.click('#infoBtn');
left = await cjkLeftovers(page);
check('no visible Chinese in the English theory drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title is set', (await D(() => document.title)) === 'ORTHO//ESCAPE · Polyhedral Approximation, Hairy Ball Defect, and Cosine Fixed Points');

/* ---------- hub round trip ---------- */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, keeps English, and lists sphere-escape with its thumbnail', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D(() => document.querySelectorAll('.card[data-viz="sphere-escape"]').length)) === 1
  && (await D(() => !!document.querySelector('.card[data-viz="sphere-escape"] img[src="sphere-escape/thumb.jpg"]'))));
check('language choice is remembered under tr-lang', (await D(() => localStorage.getItem('tr-lang'))) === 'en');
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click('.card[data-viz="sphere-escape"] .enter'); await page.waitForLoadState('load');
await page.waitForFunction(() => window.SE_DEBUG && SE_DEBUG.frames() > 0, null, { timeout: 30000 });
check('the hub card re-opens sphere-escape', (await D(() => document.body.dataset.vizId)) === ID);

/* ---------- responsive & special viewports ---------- */
for (const lang of ['zh', 'en']) {
  for (const [w, h] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await open(`?lang=${lang}`); await settle();
    check(`no horizontal scroll at ${w}px (${lang})`, (await overflowX(page)) === 0);
  }
}
/* ---------- golden-carry frame: deck | center (+ key rail) | side, then two columns, then one ---------- */
const frame = () => D(() => {
  const q = (s) => document.querySelector(s);
  const r = (s) => q(s).getBoundingClientRect();
  return {
    dom: !!q('.app > aside.col.deck > #inputs + #readouts') && !!q('.app > main.center > #stagePanel + footer.rail#rail > .keys')
      && !!q('.app > aside.col.side > #evidence #infoBtn') && !!q('#evidence > h2 .aside'),
    cols: getComputedStyle(q('.app')).gridTemplateColumns.split(' ').length,
    inputs: r('#inputs').toJSON(), readouts: r('#readouts').toJSON(), stage: r('#stagePanel').toJSON(), evidence: r('#evidence').toJSON()
  };
});
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
let fr = await frame();
check('1440px: three columns — aside.col.deck (#inputs, #readouts) | main.center (#stagePanel, footer#rail .keys) | aside.col.side (#evidence, #infoBtn)',
  fr.dom && fr.cols === 3 && fr.stage.left > fr.inputs.right - 1 && fr.evidence.left > fr.stage.right - 1
  && Math.abs(fr.inputs.top - fr.stage.top) < 2 && Math.abs(fr.stage.top - fr.evidence.top) < 2, JSON.stringify(fr));
await page.setViewportSize({ width: 1000, height: 900 });
await open('?lang=zh'); await settle();
fr = await frame();
check('1000px: two columns — the deck first, then the stage and the evidence across the full width',
  fr.cols === 2 && fr.stage.top >= fr.readouts.bottom - 1 && fr.evidence.top >= fr.stage.bottom - 1
  && fr.stage.width > 1.8 * fr.inputs.width && Math.abs(fr.evidence.width - fr.stage.width) < 2 && (await overflowX(page)) === 0, JSON.stringify(fr));
await page.setViewportSize({ width: 390, height: 844 });
await open('?lang=zh'); await settle();
fr = await frame();
check('390px: one column in the order inputs → stage → readouts → evidence',
  fr.cols === 1 && fr.stage.top >= fr.inputs.bottom - 1 && fr.readouts.top >= fr.stage.bottom - 1 && fr.evidence.top >= fr.readouts.bottom - 1, JSON.stringify(fr));
await page.setViewportSize({ width: 390, height: 844 });
await open('?lang=en'); await settle();
labels = await D(() => SE_DEBUG.labels());
check('phone width: the canvas switches to the portrait layout and keeps English labels', (await D(() => { const c = document.getElementById('view'); return c.clientHeight > c.clientWidth; })) && labels.every((l) => !CJK.test(l)));
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en'); await settle();
check('?embed=1 hides header, crumb and keyboard hint', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en starts in English with zero CJK leftovers', (await D(() => TRV.lang())) === 'en' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, no horizontal scroll', (await overflowX(page)) === 0 && (await D(() => {
  const a = document.getElementById('inputs').getBoundingClientRect();
  const b = document.getElementById('stagePanel').getBoundingClientRect();
  return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40;
})));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh&v=1&theta0=42&n=1&pitch=0&steps=16'); await settle();
check('URL parameters set the state (the "near Dottie" preset is pressed)', sameState(await D(() => SE_DEBUG.state()), [1, 42, 1, 0, 16])
  && (await D(() => document.querySelector('#presets [data-preset="1,42,1,0.00,16"]').getAttribute('aria-pressed'))) === 'true'
  && (await D(() => SE_DEBUG.info().helixClosed)) === true);
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await settle();
check('?thumb=1: the stage canvas fills the 1280x720 frame', await D(() => {
  const r = document.getElementById('view').getBoundingClientRect();
  return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720;
}));
await D(() => window.TRV_THUMB()); await settle();
check('TRV_THUMB sets the cover state (V = 162, θ₀ = 180°, N = 3, pitch 0.35, k = 12)', sameState(await D(() => SE_DEBUG.state()), [3, 180, 3, 0.35, 12]));
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests, or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
