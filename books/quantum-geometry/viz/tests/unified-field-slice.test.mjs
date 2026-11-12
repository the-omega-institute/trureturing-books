#!/usr/bin/env node
// Browser regression suite for ORTHO//UNIFIED (books/quantum-geometry/viz/unified-field-slice/):
//   node books/quantum-geometry/viz/tests/unified-field-slice.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per claim, each against an independent computation here:
//   clock    θ from gd(η) = 2 arctan(eʸ) − π/2 (not the page's arctan(sinh η)); the fixed point of cos by bisection;
//   loop     the rotors as 2 × 2 SU(2) matrices acting on spinors and by Rodrigues' formula on vectors (the page uses quaternions);
//   horizon  an icosahedron built from the cyclic permutations of (0, ±1, ±φ), turned so that a vertex is the observer,
//            and the rank of random factorizations through the cut edges by exact elimination modulo a prime.
// The loop and the horizon are lit solids (kit.solid): solidChecks on PLAQUETTE, POLYTOPE and HORIZON, and on POLYTOPE the
// twelve vertex marks, some in front of the solid and some hidden behind it.
import { session, stageFirstChecks, solidChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'unified-field-slice';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));

await stageFirstChecks(T, BOOK, ID);

/* ---------- independent models ---------- */
const gdIndep = (eta) => 2 * Math.atan(Math.exp(eta)) - Math.PI / 2;
const fixedPoint = () => { let a = 0, b = 1; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; };
// SU(2): U(n, a) = cos(a/2) I − i sin(a/2) n·σ, complex numbers as [re, im]
const C = { mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], add: (a, b) => [a[0] + b[0], a[1] + b[1]] };
function su2(n, a) { const c = Math.cos(a / 2), s = Math.sin(a / 2); return [[[c, -s * n[2]], [-s * n[1], -s * n[0]]], [[s * n[1], -s * n[0]], [c, s * n[2]]]]; }
const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => C.add(C.mul(A[i][0], B[0][j]), C.mul(A[i][1], B[1][j]))));
const asRotor = (U) => [(U[0][0][0] + U[1][1][0]) / 2, -U[0][1][1], -U[0][1][0], -U[0][0][1]];   // U = w − i b·σ → [w, b]
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
/** Rodrigues: v turned by a about the unit axis n (right hand). */
const rod = (v, n, a) => { const c = Math.cos(a), s = Math.sin(a), k = dot(n, v) * (1 - c), x = cross(n, v); return [0, 1, 2].map((i) => v[i] * c + x[i] * s + n[i] * k); };
const AX = { e1: [1, 0, 0], e2: [0, 1, 0], e3: [0, 0, 1] };
function loopIndep(plane, epsDeg, p0) {
  const e = epsDeg * Math.PI / 180, [a1, a2] = plane === 'two' ? [AX.e1, AX.e2] : [AX.e3, AX.e3];
  const U = mmul(su2(a1, e), mmul(su2(a2, e), mmul(su2(a1, -e), su2(a2, -e))));
  let r = p0.slice(); for (const [n, a] of [[a2, -e], [a1, -e], [a2, e], [a1, e]]) r = rod(r, n, a);
  const q = asRotor(U);
  return { q, r, phi: 2 * Math.acos(Math.min(1, Math.abs(q[0]))) };
}
// icosahedron from (0, ±1, ±φ), normalised, with the vertex v0 = (0, 1, φ)/|·| as the observer
const PHI = (1 + Math.sqrt(5)) / 2;
const ICO = (() => {
  const V = [];
  for (const s1 of [1, -1]) for (const s2 of [1, -1]) { V.push([0, s1, s2 * PHI], [s1, s2 * PHI, 0], [s2 * PHI, 0, s1]); }
  const U = V.map((v) => { const l = Math.hypot(...v); return v.map((x) => x / l); });
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const edge = 2 / Math.hypot(1, PHI), E = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) if (Math.abs(d(U[i], U[j]) - edge) < 1e-9) E.push([i, j]);
  return { V: U, E, edge, v0: U[0] };
})();
function cutIndep(lamDeg) {
  const c = Math.cos(lamDeg * Math.PI / 180), inA = ICO.V.map((v) => dot(v, ICO.v0) > c + 1e-9);
  return { cut: ICO.E.filter(([i, j]) => inA[i] !== inA[j]).length, nA: inA.filter(Boolean).length };
}
// exact rank modulo a prime of a random product X·Y with X: m × r, Y: r × n, i.e. a map that passes through r = D^k values
const PR = 1000003;
function rankMod(M) {
  const A = M.map((r) => r.slice()), rows = A.length, cols = A[0].length; let rank = 0;
  const inv = (a) => { let r = 1, b = a % PR, e = PR - 2; while (e) { if (e & 1) r = Number(BigInt(r) * BigInt(b) % BigInt(PR)); b = Number(BigInt(b) * BigInt(b) % BigInt(PR)); e >>= 1; } return r; };
  for (let c = 0; c < cols && rank < rows; c++) {
    let p = -1; for (let i = rank; i < rows; i++) if (A[i][c] !== 0) { p = i; break; }
    if (p < 0) continue; [A[rank], A[p]] = [A[p], A[rank]];
    const iv = inv(A[rank][c]);
    for (let i = rank + 1; i < rows; i++) { const f = Number(BigInt(A[i][c]) * BigInt(iv) % BigInt(PR)); if (f) for (let j = c; j < cols; j++) A[i][j] = ((A[i][j] - Number(BigInt(f) * BigInt(A[rank][j]) % BigInt(PR))) % PR + PR) % PR; }
    rank++;
  }
  return rank;
}
let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed % PR; };
function factoredRank(m, r, n) {
  const X = Array.from({ length: m }, () => Array.from({ length: r }, rnd)), Y = Array.from({ length: r }, () => Array.from({ length: n }, rnd));
  const M = X.map((row) => Array.from({ length: n }, (_, j) => { let s = 0n; for (let k = 0; k < r; k++) s += BigInt(row[k]) * BigInt(Y[k][j]); return Number(s % BigInt(PR)); }));
  return rankMod(M);
}

/* ---------- page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.UNIFIED_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.UNIFIED_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const ended = (max) => until(page, (m) => { const d = window.UNIFIED_DEBUG.state; return !d.playing && d.t >= m - 1e-6; }, max, 90000);
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// cards play on animation frames; the fastest speed keeps the suite short under VIZ_SLOW_FRAMES as well
await page.click('#speedChips [data-speed="2.5"]');
check('the speed chips pick 2.5×', (await page.getAttribute('#speedChips [data-speed="2.5"]', 'aria-pressed')) === 'true');
let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the PHOTON card at its still η = 4, not playing', s.preset === 'photon' && s.scene === 'clock' && close(s.clock.eta, 4, 1e-12) && !s.playing);

// the Gudermannian over a grid: θ, sin θ = tanh η, cos θ = sech η = 1/γ, and the two identities
let worst = 0;
for (const eta of [0, 0.1, 0.5, Math.LN2, 1, 1.7, 2.5, 3.3, 4]) {
  s = await seek(eta); const c = s.clock, th = gdIndep(eta);
  worst = Math.max(worst, Math.abs(c.theta - th), Math.abs(c.sin - Math.tanh(eta)), Math.abs(c.cos - 2 / (Math.exp(eta) + Math.exp(-eta))), Math.abs(c.cos * c.gamma - 1),
    Math.abs(c.cos ** 2 + c.sin ** 2 - 1), Math.abs(c.cosh ** 2 - c.sinh ** 2 - 1) / Math.max(1, c.cosh ** 2), Math.abs(c.sin - Math.sin(th)), Math.abs(c.cos - Math.cos(th)));
}
check('CLOCK: θ = gd(η), sin θ = tanh η, cos θ = sech η = 1/γ, cos² + sin² = 1 = cosh² − sinh², on nine rapidities', worst < 1e-12, `max error ${worst}`);
s = await seek(4);
check('CLOCK: θ stays below 90° at η = 4', s.clock.theta < Math.PI / 2 && close(s.clock.theta, gdIndep(4), 1e-12));

s = await seek(Math.LN2);
check('CLOCK: η = ln 2 gives cos θ = 0.8, sin θ = 0.6, θ = 36.87°', close(s.clock.cos, 0.8, 1e-12) && close(s.clock.sin, 0.6, 1e-12) && close(s.clock.theta * 180 / Math.PI, 36.8699, 1e-4));
check('CLOCK at ln 2: the key readout reads 0.640 + 0.360 = 1.000', s.key.replace(/\s+/g, ' ').includes('0.640 + 0.360 = 1.000'), s.key);

const tStar = fixedPoint();
s = await pick('fixedpoint'); await ended(tStar); s = await state();
check('FIXED POINT: its own scene, the card stops where cos θ = θ (bisection θ* = 0.7390851332)', s.scene === 'fixed' && close(s.fixed.theta, tStar, 1e-10) && close(s.fixed.cos, s.fixed.theta, 1e-10), `${s.scene} ${s.fixed.theta}`);
check('FIXED POINT: |sin θ*| = √(1 − θ*²) ≈ 0.673612 and θ* + arcsin θ* = π/2', close(s.fixed.sin, Math.sqrt(1 - tStar ** 2), 1e-10) && close(s.fixed.sin, 0.673612, 1e-6) && close(tStar + Math.asin(tStar), Math.PI / 2, 1e-12));
const num = (str) => parseFloat(str.replace(/−/g, '-').replace(/[^0-9.+-]/g, ''));
check('FIXED POINT: the key readout cos θ − θ reads 0 there', Math.abs(num(s.key)) < 1e-4, s.key);
{
  const leg = await page.textContent('#legend');
  check('FIXED POINT: the header and legend read the fixed point, not a speed (no η, no v/c, no light)', /θ\* = 0\.739/.test(s.hud) && !/η/.test(s.hud) && !/v\/c|速度|光/.test(leg) && leg.includes('局部压缩率'), `${s.hud} | ${leg}`);
}
s = await seek(0.4);
check('FIXED POINT: below θ* the shadow is longer than the arc (cos θ − θ > 0)', s.scene === 'fixed' && close(num(s.key), Math.cos(0.4) - 0.4, 1e-4) && num(s.key) > 0, s.key);
{
  const q = await page.evaluate(() => window.UNIFIED_DEBUG.point(Math.cos(1.1), Math.sin(1.1)));
  await page.mouse.move(q[0], q[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
  check('FIXED POINT: dragging on the circle sets θ under the pointer', Math.abs(s.fixed.theta - 1.1) < 0.012 && s.preset === null, String(s.fixed.theta));
}

s = await pick('photon');
check('PHOTON: a click plays the card', await until(page, () => window.UNIFIED_DEBUG.state.playing || window.UNIFIED_DEBUG.state.t > 1));
check('PHOTON: it runs to η = 4 and stops', await ended(4)); s = await state();
check('PHOTON: θ = gd(4) ≈ 87.9°, the clock rate falls to sech 4 ≈ 0.037', close(s.clock.theta, gdIndep(4), 1e-12) && close(s.clock.cos, 0.0366, 1e-4) && s.clock.sin > 0.999);

// dragging the point on the circle
s = await seek(0.3);
const p = await page.evaluate(() => window.UNIFIED_DEBUG.point(Math.cos(50 * Math.PI / 180), Math.sin(50 * Math.PI / 180)));
await page.mouse.move(p[0], p[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('dragging on the circle sets θ under the pointer and works back η = arsinh(tan θ)', Math.abs(s.clock.theta * 180 / Math.PI - 50) < 0.6 && close(s.clock.eta, Math.asinh(Math.tan(s.clock.theta)), 1e-12) && s.preset === null, `θ = ${s.clock.theta * 180 / Math.PI}`);

/* ---------- loop ---------- */
s = await pick('plaquette');
check('PLAQUETTE: the card plays the loop', await until(page, () => window.UNIFIED_DEBUG.state.playing || window.UNIFIED_DEBUG.state.t > 0));
check('PLAQUETTE: it runs through all four steps', await ended(4)); s = await state();
let ind = loopIndep('two', 60, s.loop.p0);
check('PLAQUETTE: U = R₁R₂R₁⁻¹R₂⁻¹ equals the SU(2) matrix commutator', vclose(s.loop.U, ind.q, 1e-12), JSON.stringify(s.loop.U));
check('PLAQUETTE: U ≠ 1: w = 0.875, bivector part (0.2165, −0.2165, 0.375), left-over 57.9°', close(s.loop.U[0], 0.875, 1e-12) && vclose(s.loop.U.slice(1), [Math.sqrt(3) / 8, -Math.sqrt(3) / 8, 0.375], 1e-12) && close(s.loop.phi * 180 / Math.PI, 57.91, 0.01));
check('PLAQUETTE: the arrow ends where Rodrigues puts it, away from its start', vclose(s.loop.r, ind.r, 1e-12) && Math.acos(dot(s.loop.r, s.loop.p0)) > 0.1);
check('PLAQUETTE: the page reads U as a left-over turn (toast)', (await page.textContent('#toast')).includes('57.9'));
await solidChecks(T, BOOK, ID, page, { rest: false });
// half-way through the loop, the arrow is where the first steps put it
s = await seek(1.5);
const e60 = Math.PI / 3, mid = rod(rod(s.loop.p0, AX.e2, -e60), AX.e1, -e60 / 2);
check('LOOP: at step 1.5 the arrow has done R₂⁻¹ and half of R₁⁻¹', vclose(s.loop.r, mid, 1e-12));

await page.click('#planeChips [data-plane="one"]'); s = await seek(4);
ind = loopIndep('one', 60, s.loop.p0);
check('ONE PLANE (plane chips): U = 1 and the arrow comes home', close(Math.abs(s.loop.U[0]), 1, 1e-12) && s.loop.phi < 1e-6 && vclose(s.loop.r, s.loop.p0, 1e-12) && vclose(s.loop.U, ind.q, 1e-12));

// the controls of the loop
await page.click('#planeChips [data-plane="two"]'); s = await state();
check('the plane chips switch to two planes and leave the card', s.plane === 'two' && s.preset === null);
let small = true;
for (const e of [10, 20, 45, 90]) {
  await setRange('eps', e); s = await state(); const q = loopIndep('two', e, s.loop.p0), er = e * Math.PI / 180;
  if (!(s.eps === e && close(s.loop.phi, q.phi, 1e-12) && (e > 20 || Math.abs(s.loop.phi / (er * er) - 1) < 0.02))) small = false;
}
check('the ε slider sets the turn; the left-over angle matches SU(2) and is ≈ ε² for small loops', small);
s = await state();
check('at ε = 90° the left-over turn is 120°', close(s.loop.phi * 180 / Math.PI, 120, 1e-9));

// the title of the loop strip names what is plotted and asserts no growth: in one plane nothing is left over at any ε.
// One plane at the slider's min, middle and max, two planes on a grid, each against SU(2) and Rodrigues; the title is
// read in both languages after every control, after a scene change and after the PLAQUETTE card and a slider over it.
{
  const R = await page.$eval('#eps', (el) => ({ min: el.min === '' ? 0 : +el.min, max: el.max === '' ? 100 : +el.max, step: +el.step || 1 }));
  const snap = (v) => Math.min(R.max, Math.max(R.min, R.min + Math.round((v - R.min) / R.step) * R.step));
  const mid = snap((R.min + R.max) / 2);
  const title = () => page.textContent('#plotTitle');
  const metaPhi = async () => { const m = /φ = ([0-9.]+)°/.exec((await page.textContent('#plotMeta')) || ''); return m ? +m[1] : NaN; };
  const GROWS_ZH = /越大|越小|越多|越少|增大|变大|增长|单调/, GROWS_EN = /bigger|larger|greater|grows|growing|increas|monoton|the more/i;
  const titleOk = ([zh, en]) => /回路/.test(zh) && /余下的转角/.test(zh) && !GROWS_ZH.test(zh) && /loop/i.test(en) && /turn left over/i.test(en) && !GROWS_EN.test(en);
  const both = async () => {
    const zh = await title(); await page.click('[data-lang-set="en"]'); await settle(page);
    const en = await title(); await page.click('[data-lang-set="zh"]'); await settle(page);
    return [zh, en];
  };
  const titles = new Set();
  let ok = true, why = '';
  await page.click('#planeChips [data-plane="one"]');
  for (const e of [R.min, mid, R.max]) {
    await setRange('eps', e); s = await seek(4);
    const q = loopIndep('one', s.eps, s.loop.p0), t = await both(), m = await metaPhi(); titles.add(t.join(' | '));
    const good = s.plane === 'one' && close(s.eps, e, 1e-9) && vclose(s.loop.U, q.q, 1e-12) && close(Math.abs(s.loop.U[0]), 1, 1e-12) && q.phi < 1e-6 && s.loop.phi < 1e-6
      && vclose(s.loop.r, s.loop.p0, 1e-12) && Math.abs(m) < 0.005 && titleOk(t);
    if (!good) { ok = false; why = `ε = ${e}: φ = ${s.loop.phi}, strip φ = ${m}, ${t.join(' | ')}`; }
  }
  check(`ONE PLANE at ε = ${R.min}°, ${mid}°, ${R.max}°: U = 1 (SU(2) and page), the arrow comes home, the strip reads φ = 0.00°, and its title (中/EN) claims no growth`, ok, why);
  ok = true; why = '';
  await page.click('#planeChips [data-plane="two"]');
  const grid = [...new Set([R.min, 15, 30, mid, 60, 75, R.max].map(snap))];
  for (const e of grid) {
    await setRange('eps', e); s = await seek(4);
    const q = loopIndep('two', s.eps, s.loop.p0), t = await both(), m = await metaPhi(); titles.add(t.join(' | '));
    const good = s.plane === 'two' && close(s.eps, e, 1e-9) && vclose(s.loop.U, q.q, 1e-12) && close(s.loop.phi, q.phi, 1e-12) && vclose(s.loop.r, q.r, 1e-12)
      && Math.abs(m - q.phi * 180 / Math.PI) <= 0.0051 && titleOk(t);
    if (!good) { ok = false; why = `ε = ${e}: φ = ${s.loop.phi} vs ${q.phi}, strip φ = ${m}, ${t.join(' | ')}`; }
  }
  check(`TWO PLANES at ε = ${grid.join('°, ')}°: U, φ and the arrow match SU(2) and Rodrigues, the strip reads that φ, and its title (中/EN) claims no growth`, ok, why);
  check('the loop strip carries one title for both planes and every ε', titles.size === 1, [...titles].join(' / '));
  const loopTitle = [...titles][0];
  await page.click('#sceneChips [data-scene="clock"]'); s = await state();
  const other = await title();
  await page.click('#sceneChips [data-scene="loop"]'); s = await state();
  const back = await both();
  check('scene change: the clock strip has its own title, and back in the loop the loop title is the neutral one again', s.scene === 'loop' && other !== back[0] && titleOk(back) && back.join(' | ') === loopTitle, `${other} | ${back.join(' | ')}`);
  s = await pick('plaquette'); s = await seek(4);
  const onCard = await both();
  await setRange('eps', mid); s = await state();
  const over = await both();
  check('PLAQUETTE, then the ε slider over it: the title stays the neutral loop title in both languages', s.preset === null && s.plane === 'two' && close(s.eps, mid, 1e-9)
    && titleOk(onCard) && titleOk(over) && onCard.join(' | ') === loopTitle && over.join(' | ') === loopTitle, `${onCard.join(' | ')} / ${over.join(' | ')}`);
}

/* ---------- horizon ---------- */
s = await pick('polytope');
check('POLYTOPE: horizon scene with λ = 0', s.scene === 'horizon' && s.horizon.lam === 0 && s.horizon.cut === 0);
{
  const leg = await page.textContent('#legend');
  check('POLYTOPE: the header and legend speak of the deficits only, not of a horizon', !/视界|λ/.test(s.hud) && !/视界/.test(leg) && /720/.test(await page.textContent('#hudSub')), `${s.hud} | ${leg}`);
}
const V = s.horizon.V, E = s.horizon.E, ed = E.map(([i, j]) => Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]));
check('POLYTOPE: 12 unit vertices, 30 edges of length 4/√(10 + 2√5), 20 faces; the observer at the north pole', V.length === 12 && V.every((v) => close(Math.hypot(...v), 1, 1e-12)) && E.length === 30 && ed.every((x) => close(x, ICO.edge, 1e-12)) && s.horizon.F === 20 && vclose(V[0], [0, 0, 1], 1e-15));
// angle deficits computed here from the independent icosahedron
let total = 0;
for (let v = 0; v < 12; v++) {
  const nb = ICO.E.filter((e) => e.includes(v)).map((e) => (e[0] === v ? e[1] : e[0]));
  let sum = 0;
  for (let a = 0; a < nb.length; a++) for (let b = a + 1; b < nb.length; b++) if (ICO.E.some((e) => e.includes(nb[a]) && e.includes(nb[b]))) {
    const u = ICO.V[nb[a]].map((x, i) => x - ICO.V[v][i]), w = ICO.V[nb[b]].map((x, i) => x - ICO.V[v][i]);
    sum += Math.acos(dot(u, w) / Math.hypot(...u) / Math.hypot(...w));
  }
  total += 2 * Math.PI - sum;
}
check('POLYTOPE: each vertex misses 60° and the total is 720° = 4π (here and on the page)', close(total, 4 * Math.PI, 1e-10) && s.horizon.deficit.every((d) => close(d, Math.PI / 3, 1e-12)));
await solidChecks(T, BOOK, ID, page, { rest: false });
{
  await settle(page);
  const vm = await page.evaluate(() => window.TRV.solids[0].marks().filter((m) => /^v\d+$/.test(m.key)).map((m) => ({ key: m.key, hidden: m.hidden })));
  const keys = new Set(vm.map((m) => m.key)), all12 = vm.length === 12 && Array.from({ length: 12 }, (_, i) => `v${i}`).every((k) => keys.has(k));
  check('POLYTOPE: the 12 vertices v0…v11 are marks on the solid, some in front of it and some hidden behind it', all12 && vm.some((m) => !m.hidden) && vm.some((m) => m.hidden), vm.map((m) => `${m.key}${m.hidden ? ' (hidden)' : ''}`).join(', '));
}

s = await pick('horizon');
check('HORIZON: the card plays the horizon down', await until(page, () => window.UNIFIED_DEBUG.state.playing || window.UNIFIED_DEBUG.state.t > 0));
check('HORIZON: it stops at λ = 90°', await ended(90)); s = await state();
check('HORIZON: at 90° the pole and one ring are inside and 10 edges are cut; bound 2¹⁰', s.horizon.lam === 90 && s.horizon.cut === 10 && s.horizon.nA === 6 && s.horizon.inside === 10 && s.horizon.bound === 1024);
await solidChecks(T, BOOK, ID, page, { rest: false });
let cuts = true, bad = '';
for (let lam = 0; lam <= 180; lam += 7.5) { s = await seek(lam); const c = cutIndep(lam); if (s.horizon.cut !== c.cut || s.horizon.nA !== c.nA) { cuts = false; bad = `${lam}: ${s.horizon.cut}/${c.cut}`; } }
check('HORIZON: the cut |∂A| and the vertices inside agree with an independently built icosahedron at 25 angles', cuts, bad);
// the rank across a cut: a map that passes through k edges of dimension D has rank ≤ D^k, and generic ones reach it
s = await seek(30);
const r1 = factoredRank(48, 32, 40), r2 = factoredRank(20, 32, 40);
check('RANK: through 5 cut edges with D = 2 the page bounds the rank by 32; random factorizations reach 32 and never more', s.horizon.cut === 5 && s.horizon.bound === 32 && r1 === 32 && r2 === 20);
await page.click('#bondChips [data-bond="3"]'); s = await seek(90);
check('the bond chips set D: at 90° the bound becomes 3¹⁰ = 59049', s.bond === 3 && s.horizon.bound === 59049 && s.preset === null);

/* ---------- scenes, rail, keys ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('1'); s = await state(); check('key 1 opens the clock scene', s.scene === 'clock' && s.max === 4);
await page.keyboard.press('2'); s = await state(); check('key 2 opens the loop scene', s.scene === 'loop' && s.max === 4);
await page.keyboard.press('3'); s = await state(); check('key 3 opens the horizon scene', s.scene === 'horizon' && s.max === 180);
await page.keyboard.press('4'); s = await state(); check('key 4 opens the fixed-point scene', s.scene === 'fixed' && close(s.max, 1.5, 1e-12));
await page.click('#sceneChips [data-scene="loop"]'); s = await state(); check('the scene chips switch scenes', s.scene === 'loop');
await seek(1); await page.keyboard.press('ArrowRight'); s = await state(); check('→ steps one turn of the loop', close(s.loop.tau, 2, 1e-12));
await page.click('#rew'); s = await state(); check('⏮ goes back to the start', s.t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });   // a focused button keeps Space for itself
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.UNIFIED_DEBUG.state.playing && window.UNIFIED_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('[data-lang-set="en"]'); s = await state();
check('English: the hud speaks English', /Loop/.test(s.hud));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
