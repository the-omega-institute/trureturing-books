#!/usr/bin/env node
// Browser regression suite for ORTHO//HAIRY (books/quantum-geometry/viz/hairy-ball-normal-escape/).
//   node books/quantum-geometry/viz/tests/hairy-ball-normal-escape.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page writes the merging family as a closed-form pull-back, counts indices by winding along small loops, builds
// geodesic domes by a barycentric grid with dot-product angles, and minimises the lifted field by sampling. The suite
// checks each claim another way: the pull-back by finite differences of inverse stereographic projection, the indices
// by its own winding count of its own formulas, the domes by recursive midpoint subdivision of an icosahedron found
// from edge lengths with angles from the law of cosines, and the lifted minimum from the closed form of its
// derivative. It reads the page through window.HAIRY_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'hairy-ball-normal-escape';
const T = await session();
const { check } = T;
const PI = Math.PI, TAU = 2 * PI;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub = (a, b) => a.map((x, i) => x - b[i]);
const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map((x) => x * k);
const norm = (a) => Math.sqrt(dot(a, a));
const unit = (a) => scale(a, 1 / norm(a));
const wrap = (a) => a - TAU * Math.round(a / TAU);

/* ---------- independent models ---------- */
// a reproducible stream of points on the sphere
let seed = 20261112;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const randomPoint = () => { const z = 2 * rnd() - 1, a = TAU * rnd(), r = Math.sqrt(1 - z * z); return [r * Math.cos(a), r * Math.sin(a), z]; };
const zonal = ([x, y]) => [-y, x, 0];
const dipoleW = ([x, y, z]) => [((1 - z) ** 2 - x * x + y * y) / 2, -x * y, x * (1 - z)];
// inverse stereographic projection from the North Pole and its derivative by central differences
const sigma = (p, q) => { const d = 1 + p * p + q * q; return [2 * p / d, 2 * q / d, (p * p + q * q - 1) / d]; };
function pullBack(x, f) { // f: (p, q) → [re, im]
  const p = x[0] / (1 - x[2]), q = x[1] / (1 - x[2]), h = 1e-6, F = f(p, q);
  const dp = scale(sub(sigma(p + h, q), sigma(p - h, q)), 1 / (2 * h)), dq = scale(sub(sigma(p, q + h), sigma(p, q - h)), 1 / (2 * h));
  return add(scale(dp, F[0]), scale(dq, F[1]));
}
const family = (t) => (p, q) => { // e^{iψ}(a − u)/(1 + a)
  const a = Math.tan(PI * t / 2), psi = -(PI / 2) * (1 - t), re = (a - p) / (1 + a), im = -q / (1 + a);
  return [Math.cos(psi) * re - Math.sin(psi) * im, Math.sin(psi) * re + Math.cos(psi) * im];
};
// winding of a tangent field round a small loop about q, in a frame built from a different reference axis
function winding(F, q, eps = 0.05, N = 2000) {
  const e1 = unit(cross(Math.abs(q[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0], q)), e2 = cross(q, e1); let tot = 0, prev = null;
  for (let i = 0; i <= N; i++) {
    const a = TAU * i / N, p = q.map((x, j) => Math.cos(eps) * x + Math.sin(eps) * (Math.cos(a) * e1[j] + Math.sin(a) * e2[j])), w = F(p), ang = Math.atan2(dot(w, e2), dot(w, e1));
    if (prev != null) tot += wrap(ang - prev); prev = ang;
  }
  return tot / TAU;
}
// geodesic domes: icosahedron from edge lengths, recursive midpoint subdivision, angles from the law of cosines
function icosahedron() {
  const g = (1 + Math.sqrt(5)) / 2, V = [];
  for (const s of [-1, 1]) for (const t of [-1, 1]) V.push([0, s, t * g], [s, t * g, 0], [t * g, 0, s]);
  const U = V.map(unit), edge = Math.min(...U.slice(1).map((v) => norm(sub(v, U[0])))), adj = (i, j) => Math.abs(norm(sub(U[i], U[j])) - edge) < 1e-9, F = [];
  for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) for (let k = j + 1; k < 12; k++) if (adj(i, j) && adj(j, k) && adj(i, k)) F.push([i, j, k]);
  return { V: U, F };
}
function midpointSplit(M) {
  const V = M.V.slice(), memo = new Map(), F = [];
  const mid = (i, j) => { const k = i < j ? `${i},${j}` : `${j},${i}`; if (!memo.has(k)) { memo.set(k, V.length); V.push(unit(add(V[i], V[j]))); } return memo.get(k); };
  for (const [a, b, c] of M.F) { const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a); F.push([a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]); }
  return { V, F };
}
function defects(M) {
  const ang = new Array(M.V.length).fill(0);
  for (const t of M.F) for (let k = 0; k < 3; k++) {
    const a = t[k], b = t[(k + 1) % 3], c = t[(k + 2) % 3], A = norm(sub(M.V[b], M.V[c])), B = norm(sub(M.V[a], M.V[c])), C = norm(sub(M.V[a], M.V[b]));
    ang[a] += Math.acos((B * B + C * C - A * A) / (2 * B * C));
  }
  return ang.map((s) => TAU - s);
}
const sum = (xs) => xs.reduce((s, x) => s + x, 0);
// the lifted field: ‖w̃_λ‖² = (1 − λ)²(1 − z)² + λ²(1 + z)²/4, stationary where its derivative in z vanishes
function liftMinExact(l) {
  const f = (z) => Math.sqrt((1 - l) ** 2 * (1 - z) ** 2 + l * l * (1 + z) ** 2 / 4);
  const zs = [-1, 1]; const den = 4 * (1 - l) ** 2 + l * l; if (den > 0) { const z = (4 * (1 - l) ** 2 - l * l) / den; if (z > -1 && z < 1) zs.push(z); }
  return Math.min(...zs.map(f));
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.HAIRY_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.HAIRY_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const fieldAt = (pts) => page.evaluate((p) => window.HAIRY_DEBUG.field(p), pts);
let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the MERGE card, merged, not playing', s.preset === 'merge' && s.scene === 'sphere' && close(s.t, 1) && !s.playing);

// the sphere: zonal at t = 0, dipole at t = 1, the pull-back in between
const pts = Array.from({ length: 200 }, randomPoint).filter((x) => x[2] < 0.995);
await pick('poles'); s = await state();
let F0 = await fieldAt(pts);
check('POLES: the field is (−y, x, 0) at 200 random points', pts.every((x, i) => norm(sub(F0[i], zonal(x))) < 1e-12));
check('POLES: zeros at both poles, index +1 each (page count), sum 2', s.zeros.length === 2 && s.zeros.every((z) => z.index === 1) && s.indexSum === 2
  && s.zeros.some((z) => close(z.p[2], 1)) && s.zeros.some((z) => close(z.p[2], -1)));
check('independent winding of (−y, x, 0): +1 at N and +1 at S', close(winding(zonal, [0, 0, 1]), 1, 1e-6) && close(winding(zonal, [0, 0, -1]), 1, 1e-6));
s = await seek(1);
const F1 = await fieldAt(pts);
check('t = 1: the field is w = (((1 − z)² − x² + y²)/2, −xy, x(1 − z))', pts.every((x, i) => norm(sub(F1[i], dipoleW(x))) < 1e-12));
check('w is tangent: x·w = 0 at 200 random points (own formula)', pts.every((x) => Math.abs(dot(x, dipoleW(x))) < 1e-14));
check('‖w‖ = 1 − z at 200 random points (own formula)', pts.every((x) => close(norm(dipoleW(x)), 1 - x[2], 1e-14)));
check('w vanishes at N only: ‖w‖ > 0 away from N', pts.every((x) => norm(dipoleW(x)) > 0) && norm(dipoleW([0, 0, 1])) === 0);
check('independent winding of w round N is +2', close(winding(dipoleW, [0, 0, 1]), 2, 1e-6));
check('t = 1: one zero, at N, index +2 (page count)', s.zeros.length === 1 && s.zeros[0].index === 2 && close(s.zeros[0].p[2], 1) && s.indexSum === 2);
let worstPB = 0, idxBad = 0;
for (const t of [0.15, 0.3, 0.5, 0.7, 0.85, 0.95]) {
  s = await seek(t);
  const F = await fieldAt(pts), own = pts.map((x) => pullBack(x, family(t)));
  worstPB = Math.max(worstPB, ...pts.map((x, i) => norm(sub(F[i], own[i]))));
  const a = Math.tan(PI * t / 2), m = sigma(a, 0), sep = Math.acos(m[2]);
  const G = (x) => pullBack(x, family(t)), wN = winding(G, [0, 0, 1], sep / 4), wM = winding(G, m, sep / 4);
  if (!(s.zeros.length === 2 && norm(sub(s.moving, m)) < 1e-12 && close(wN, 1, 1e-4) && close(wM, 1, 1e-4) && s.zeros.every((z) => z.index === 1) && s.indexSum === 2)) idxBad++;
}
check('the merging family agrees with the finite-difference pull-back (six rail values)', worstPB < 1e-6, `max difference ${worstPB}`);
check('…the second zero sits at σ(tan(πt/2)); both zeros have index +1 by an independent winding; the page sums 2', idxBad === 0, `${idxBad} rail values disagreed`);
// a big loop round N enclosing both zeros winds twice at every t (the sum cannot change)
let bigBad = 0;
for (const t of [0.8, 0.9, 0.97]) { const a = Math.tan(PI * t / 2), sep = Math.acos(sigma(a, 0)[2]); if (!close(winding((x) => pullBack(x, family(t)), [0, 0, 1], sep * 2, 4000), 2, 1e-3)) bigBad++; }
check('a loop round both zeros winds +2 for t = 0.8, 0.9, 0.97 (independent)', bigBad === 0);

// drag the moving zero up its meridian
await pick('poles'); await seek(0.3);
s = await state();
const target = [Math.sin(PI / 4), 0, Math.cos(PI / 4)];   // 45° from N on the +X meridian
await page.evaluate(() => document.getElementById('stage').scrollIntoView());
const fromNow = await page.evaluate((v) => window.HAIRY_DEBUG.screen(v), s.moving);
let to = await page.evaluate((v) => window.HAIRY_DEBUG.screen(v), target);
await page.mouse.move(fromNow[0], fromNow[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 6 }); await page.mouse.up();
s = await state();
check('dragging the amber zero moves it north along the meridian and leaves the card', s.preset === null && s.moving && Math.abs(s.moving[2] - Math.cos(PI / 4)) < 0.08 && s.indexSum === 2);

// the torus
await pick('torus'); s = await state();
check('TORUS: scene torus, R = 0.68 > r = 0.28 > 0', s.scene === 'torus' && close(s.R, 0.68) && close(s.r, 0.28));
let torBad = 0, minLen = Infinity;
for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) {
  const th = TAU * i / 24, ph = TAU * j / 24, [x, e] = await page.evaluate(([a, b]) => window.HAIRY_DEBUG.torus(a, b), [th, ph]);
  const r = s.r, R = s.R, own = [(R + r * Math.cos(th)) * Math.cos(ph), (R + r * Math.cos(th)) * Math.sin(ph), r * Math.sin(th)];
  const dTh = [-r * Math.sin(th) * Math.cos(ph), -r * Math.sin(th) * Math.sin(ph), r * Math.cos(th)], dPh = [-(R + r * Math.cos(th)) * Math.sin(ph), (R + r * Math.cos(th)) * Math.cos(ph), 0];
  const n = unit(cross(dTh, dPh));
  minLen = Math.min(minLen, norm(e));
  if (!(norm(sub(x, own)) < 1e-12 && Math.abs(dot(e, n)) < 1e-12 && norm(sub(e, unit(dPh))) < 1e-12)) torBad++;
}
check('torus points follow the embedding; ê_φ is the unit ∂φ, tangent (⟂ normal) at 576 sites', torBad === 0, `${torBad} sites off`);
check('…its shortest arrow has length 1: no zero (own grid and page readout)', close(minLen, 1, 1e-12) && close(s.minLength, 1, 1e-12) && (await page.textContent('#roKey')).trim() === '1.000');
check('…the drawn mesh has V − E + F = 0', s.euler.V - s.euler.E + s.euler.F === 0);
await page.evaluate(() => { const el = document.getElementById('tube'); el.value = '0.45'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
const [xt] = await page.evaluate(() => window.HAIRY_DEBUG.torus(0, 0));
check('the tube slider sets r and leaves the card; the point moves outward', close(s.r, 0.45) && s.preset === null && close(xt[0], 0.68 + 0.45, 1e-12));

// geodesic domes
const ico = icosahedron();
check('own icosahedron: 12 vertices, 20 faces', ico.V.length === 12 && ico.F.length === 20);
const own2 = midpointSplit(ico), own4 = midpointSplit(own2);
const d1 = defects(ico), d2 = defects(own2), d4 = defects(own4);
check('own domes: total defect 4π for ν = 1, 2, 4 (law of cosines)', [d1, d2, d4].every((d) => close(sum(d), 4 * PI, 1e-9)) && d1.every((d) => close(d, PI / 3, 1e-12)));
await pick('defect');
let domeBad = [];
for (let k = 0; k < 6; k++) {
  s = await seek(k);
  const nu = k + 1;
  if (!(s.nu === nu && s.V === 10 * nu * nu + 2 && s.F === 20 * nu * nu && s.V - s.E + s.F === 2 && close(s.total, 4 * PI, 1e-9) && close(sum(s.defects), s.total, 1e-12))) domeBad.push(nu);
  // the page's per-vertex defects, recomputed here from its own vertices and triangles by the law of cosines
  if (!close(sum(defects({ V: s.vertices, F: s.triangles })), 4 * PI, 1e-9) || defects({ V: s.vertices, F: s.triangles }).some((d, i) => !close(d, s.defects[i], 1e-9))) domeBad.push(`angles ${nu}`);
}
check('page domes ν = 1…6: V = 10ν² + 2, F = 20ν², V − E + F = 2, Σ δ = 4π', domeBad.length === 0, domeBad.join(', '));
s = await seek(1);
const sorted = (a) => a.slice().sort((x, y) => x - y);
check('ν = 2: the page’s 42 defects are the same multiset as the midpoint subdivision', s.V === 42 && sorted(s.defects).every((d, i) => close(d, sorted(d2)[i], 1e-9)));
s = await seek(0);
check('ν = 1: twelve defects of 60°', s.V === 12 && s.defects.every((d) => close(d, PI / 3, 1e-12)));

// the lifted field
await pick('escape');
check('ESCAPE plays from λ = 0', await until(page, () => window.HAIRY_DEBUG.state.playing || window.HAIRY_DEBUG.state.t > 0));
await until(page, () => window.HAIRY_DEBUG.state.t > 0.02 || !window.HAIRY_DEBUG.state.playing);
await page.evaluate(() => window.HAIRY_DEBUG.advance(0.45));
check('…and stops by itself at λ = ½', await until(page, () => !window.HAIRY_DEBUG.state.playing, null, 120000));
s = await state();
check('…at λ = ½, the shortest arrow is the closed-form minimum (> 0) at z = 0.6', close(s.t, 0.5) && close(s.minLength, liftMinExact(0.5), 1e-9) && close(s.minHeight, 0.6, 1e-5) && s.minLength > 0.44);
let liftBad = 0;
for (const l of [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]) {
  s = await seek(l);
  const F = await fieldAt(pts);
  const ok = pts.every((x, i) => close(norm(F[i]) ** 2, (1 - l) ** 2 * (1 - x[2]) ** 2 + l * l * (1 + x[2]) ** 2 / 4, 1e-12) && norm(sub(F[i], add(scale(dipoleW(x), 1 - l), scale(x, l * (1 + x[2]) / 2)))) < 1e-12);
  if (!(ok && close(s.minLength, liftMinExact(l), 1e-9) && ((l > 0 && l < 1) ? s.minLength > 0 : close(s.minLength, 0, 1e-9)))) liftBad++;
}
check('w̃_λ = (1 − λ)w + λ(1 + z)/2·x and its smallest length match the closed form for seven λ; zero only at λ = 0, 1', liftBad === 0, `${liftBad} values off`);
s = await seek(1);
check('λ = 1: ‖w̃(N)‖ = 1, and the South Pole is a zero again', close(norm(s.north), 1, 1e-12) && close(s.minLength, 0) && close(s.minHeight, -1, 1e-6));
await pick('upright'); await until(page, () => !window.HAIRY_DEBUG.state.playing, null, 120000);
s = await state();
check('UPRIGHT ends at λ = 1', s.scene === 'escape' && close(s.t, 1));

// scene chips, keys, rail
await page.click('[data-scene="torus"]'); s = await state();
check('scene chip switches to the torus and leaves the card', s.scene === 'torus' && s.preset === null);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('3'); s = await state();
check('key 3 opens the defect scene', s.scene === 'defect');
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps to the next subdivision', s.nu === 2);
await page.keyboard.press('End'); s = await state();
check('End goes to ν = 6', s.nu === 6);
await page.keyboard.press('Home'); await page.keyboard.press('1'); s = await state();
check('key 1 opens the sphere scene', s.scene === 'sphere');
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.HAIRY_DEBUG.state.t > 0));
await page.keyboard.press('Space'); s = await state();
check('Space pauses', !s.playing);
await page.click('#rew'); check('⏮ goes back to the start', close((await state()).t, 0));
await page.evaluate(() => { const el = document.getElementById('now'); el.value = '0.5'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the rail sets the merge parameter', close(s.t, 0.5) && norm(sub(s.moving, [1, 0, 0])) < 1e-12);

// English
await page.click('[data-lang-set="en"]'); await pick('merge'); await page.evaluate(() => window.HAIRY_DEBUG.seek(1)); await settle(page);
check('English: the HUD reads “Sphere · index sum = 2”', (await page.textContent('#hudBig')).trim() === 'Sphere · index sum = 2');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
