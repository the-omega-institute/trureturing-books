#!/usr/bin/env node
// Browser regression suite for ORTHO//ELLIPTOPE (books/quantum-geometry/viz/gram-causal-elliptope/):
//   node books/quantum-geometry/viz/tests/gram-causal-elliptope.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery it reads the page through window.ELLIPTOPE_DEBUG and checks it against computations
// written here: eigenvalues by Jacobi rotations (instead of the page's LDLᵀ), determinants by cofactor expansion
// (instead of its Gaussian elimination), windows by bisection on the smallest eigenvalue (instead of its Schur
// complements), the closed form of the three-element elliptope, and random vectors in ℝ³ and ℝ⁶.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'gram-causal-elliptope';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent linear algebra ---------- */
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
/** Determinant by cofactor expansion along the first row (sizes ≤ 6 here). */
function cofDet(A) {
  const n = A.length; if (n === 1) return A[0][0]; if (n === 2) return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  let s = 0; for (let j = 0; j < n; j++) { if (A[0][j] === 0) continue; const minor = A.slice(1).map((r) => r.filter((_, k) => k !== j)); s += (j % 2 ? -1 : 1) * A[0][j] * cofDet(minor); }
  return s;
}
/** Eigenvalues of a symmetric matrix by cyclic Jacobi rotations. */
function jacobi(A0) {
  const n = A0.length, A = A0.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
    }
  }
  return A.map((r, i) => r[i]);
}
const lamMin = (A) => Math.min(...jacobi(A));
/** The Gram table Q, P₀, …, P₋₍M−1₎ built here from the page's vectors. */
function table(V, M, y, z) {
  const row = [1, z, y, ...V.b.slice(2)], G = [];
  for (let i = 0; i <= M; i++) { G.push([]); for (let j = 0; j <= M; j++) G[i].push(i === 0 ? row[j] : j === 0 ? row[i] : dot(V.anchors[i - 1], V.anchors[j - 1])); }
  return G;
}
/** The window for z by bisection on the (concave) smallest eigenvalue. */
function windowBisect(V, M, y) {
  const f = (z) => lamMin(table(V, M, y, z));
  let a = -1, b = 1;
  for (let i = 0; i < 80; i++) { const m1 = a + (b - a) / 3, m2 = b - (b - a) / 3; if (f(m1) < f(m2)) a = m1; else b = m2; }
  const top = (a + b) / 2; if (f(top) < -1e-12) return null;
  const edge = (lo, hi) => { for (let i = 0; i < 70; i++) { const m = (lo + hi) / 2; if (f(m) >= 0) hi = m; else lo = m; } return hi; };
  const edgeR = (lo, hi) => { for (let i = 0; i < 70; i++) { const m = (lo + hi) / 2; if (f(m) >= 0) lo = m; else hi = m; } return lo; };
  return [f(-1) >= 0 ? -1 : edge(-1, top), f(1) >= 0 ? 1 : edgeR(top, 1)];
}
function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const randUnit = (r, d) => { const v = Array.from({ length: d }, () => r() * 2 - 1); const n = Math.sqrt(dot(v, v)); return v.map((x) => x / n); };
const gramOf = (vs) => vs.map((a) => vs.map((b) => dot(a, b)));

/* ---------- the page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.ELLIPTOPE_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.ELLIPTOPE_DEBUG.seek(v), t); return state(); };
const setQ = async (y, z) => { await page.evaluate(([a, b]) => window.ELLIPTOPE_DEBUG.setQ(a, b), [y, z]); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); return state(); };
const V6 = await page.evaluate(() => window.ELLIPTOPE_DEBUG.vectors('r6'));
const V3 = await page.evaluate(() => window.ELLIPTOPE_DEBUG.vectors('r3'));

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on NARROW at the frame M = 5, in ℝ⁶, not playing', s.preset === 'narrow' && s.M === 5 && s.space === 'r6' && !s.playing);

// the events: unit vectors, five anchors and a reference step one radian apart, in ℝ⁶ and in ℝ³
let unitErr = 0; for (const V of [V6, V3]) for (const v of [...V.anchors, V.ref]) unitErr = Math.max(unitErr, Math.abs(dot(v, v) - 1));
check('every event is a unit vector (ℝ⁶ and ℝ³)', unitErr < 1e-12, `max | |v|² − 1 | = ${unitErr}`);
check('the table the page reads is the Gram table of its vectors', (() => { const G = table(V6, 5, s.y, s.z); let e = 0; G.forEach((r, i) => r.forEach((x, j) => { e = Math.max(e, Math.abs(x - s.table[i][j])); })); return e < 1e-12; })());
check('x is P₀·P₋₁ of the history', Math.abs(s.x - dot(V6.anchors[0], V6.anchors[1])) < 1e-12);

/* why six dimensions: four or more vectors in ℝ³ have a zero Gram determinant, in ℝ⁶ in general not */
{
  const r = rng(2026); let worst3 = 0, least6 = Infinity;
  for (let trial = 0; trial < 40; trial++) for (const n of [4, 5, 6]) {
    worst3 = Math.max(worst3, Math.abs(cofDet(gramOf(Array.from({ length: n }, () => randUnit(r, 3))))));
    least6 = Math.min(least6, Math.abs(cofDet(gramOf(Array.from({ length: n }, () => randUnit(r, 6))))));
  }
  check('random 4, 5, 6 vectors of ℝ³: Gram determinant 0', worst3 < 1e-12, `max |det| = ${worst3}`);
  check('random 4, 5, 6 vectors of ℝ⁶: Gram determinant away from 0', least6 > 1e-6, `min |det| = ${least6}`);
  const hist3 = cofDet(gramOf([...V3.anchors, V3.ref])), hist6 = cofDet(gramOf([...V6.anchors, V6.ref]));
  check('the page\'s six events: det 0 in ℝ³, positive in ℝ⁶', Math.abs(hist3) < 1e-12 && hist6 > 1e-5, `ℝ³ ${hist3}, ℝ⁶ ${hist6}`);
}

/* every depth in ℝ⁶ has an inside: the default candidate's table is positive definite for M = 1 … 5 */
let pdAll = true, minorErr = 0;
for (let M = 1; M <= 5; M++) {
  s = await seek(M - 1);
  const G = table(V6, M, s.y, s.z);
  if (!(s.M === M && lamMin(G) > 1e-6 && s.psd && !s.edge)) pdAll = false;
  G.forEach((_, k) => { minorErr = Math.max(minorErr, Math.abs(cofDet(G.slice(0, k + 1).map((r) => r.slice(0, k + 1))) - s.minors[k])); });
}
check('ℝ⁶: the default candidate is strictly inside at every depth M = 1 … 5', pdAll);
check('leading minors agree with cofactor expansion', minorErr < 1e-12, `max error ${minorErr}`);

/* the three-element window: closed form, det G₃ = 0 at both ends, > 0 inside, < 0 outside */
{
  s = await seek(1);
  let err = 0, signs = true;
  for (const y of [-0.8, -0.3, 0, 0.24, 0.6, 0.9]) {
    s = await setQ(y, 0);
    const x = s.x, w = s.windows[1], r = Math.sqrt((1 - x * x) * (1 - y * y)), lo = x * y - r, hi = x * y + r;
    err = Math.max(err, Math.abs(w.lo - lo), Math.abs(w.hi - hi));
    const d3 = (z) => 1 - x * x - y * y - z * z + 2 * x * y * z;
    if (!(Math.abs(d3(lo)) < 1e-12 && Math.abs(d3(hi)) < 1e-12 && d3((lo + hi) / 2) > 0 && d3(lo - 0.02) < 0 && d3(hi + 0.02) < 0)) signs = false;
  }
  check('M = 2: window = [xy − √((1−x²)(1−y²)), xy + √((1−x²)(1−y²))]', err < 1e-10, `max error ${err}`);
  check('M = 2: det G₃ = 0 at both ends of the window, > 0 inside, < 0 just outside', signs);
}

/* deeper windows: agree with bisection on the smallest eigenvalue, and never grow with memory */
{
  let err = 0, nested = true;
  for (const y of [-0.2, 0.1, 0.24, 0.35]) {
    s = await setQ(y, 0.3);
    for (let M = 1; M <= 5; M++) {
      const w = s.windows[M - 1], b = windowBisect(V6, M, y);
      if (!w || !b) { if (!!w !== !!b) err = Infinity; continue; }
      err = Math.max(err, Math.abs(w.lo - b[0]), Math.abs(w.hi - b[1]));
      const prev = M > 1 ? s.windows[M - 2] : null;
      if (prev && (w.lo < prev.lo - 1e-10 || w.hi > prev.hi + 1e-10)) nested = false;
    }
  }
  check('windows for M = 1 … 5 agree with bisection on λ_min (Jacobi)', err < 1e-7, `max error ${err}`);
  check('each window lies inside the window of one depth less (memory never widens it)', nested);
}

/* the page's semidefinite verdict against Jacobi eigenvalues: inside, on the edge, outside */
{
  const verdict = (G) => page.evaluate((g) => window.ELLIPTOPE_DEBUG.psd(g), G);
  const cases = [];
  const r = rng(77);
  for (let i = 0; i < 12; i++) cases.push(gramOf(Array.from({ length: 5 }, () => randUnit(r, 6))));                       // inside: positive definite
  for (let i = 0; i < 6; i++) cases.push(gramOf(Array.from({ length: 5 }, () => randUnit(r, 3))));                        // on the edge: rank 3
  for (let i = 0; i < 6; i++) { const G = gramOf(Array.from({ length: 4 }, () => randUnit(r, 6))); G[0][3] = G[3][0] = -G[0][3] * 3 - 0.9 * Math.sign(G[0][3] || 1); cases.push(G); }   // pushed out
  const y = (await state()).y;
  for (const M of [2, 3, 4, 5]) { const w = windowBisect(V6, M, y); cases.push(table(V6, M, y, w[1])); cases.push(table(V6, M, y, w[1] + 0.03)); cases.push(table(V6, M, y, w[0] - 0.03)); cases.push(table(V6, M, y, (w[0] + w[1]) / 2)); }
  let agree = 0, edges = 0, outs = 0;
  for (const G of cases) {
    const lm = lamMin(G), v = await verdict(G);
    const truth = lm >= -1e-8;
    if (v.psd === truth) agree++;
    if (Math.abs(lm) < 1e-8) edges++;
    if (lm < -1e-3) outs++;
  }
  check(`semidefinite verdict (LDLᵀ) agrees with Jacobi eigenvalues on ${cases.length} tables`, agree === cases.length, `${agree} / ${cases.length}`);
  check('the cases include tables on the edge and outside', edges >= 6 && outs >= 10, `${edges} edge, ${outs} outside`);
}

/* the VIOLATE card: the first negative leading minor */
s = await pick('violate');
{
  const G = table(V6, 5, s.y, s.z), D = G.map((_, k) => cofDet(G.slice(0, k + 1).map((r) => r.slice(0, k + 1))));
  const first = D.findIndex((v) => v < -1e-12) + 1;
  const w3 = windowBisect(V6, 3, s.y), w4 = windowBisect(V6, 4, s.y);
  check('VIOLATE: M = 5, z inside the depth-3 window and outside the depth-4 window', s.M === 5 && s.z < w3[1] && s.z > w4[1] && s.z > w3[0]);
  check('VIOLATE: D₁ … D₄ ≥ 0 and D₅ is the first negative minor (cofactors)', first === 5 && D.slice(0, 4).every((v) => v > 0));
  check('VIOLATE: the page reports the same first negative minor and fails its LDLᵀ at 5', s.firstNeg === 5 && !s.psd && s.fail === 5 && lamMin(G) < 0);
  check('VIOLATE: the readout names D₅', (await page.textContent('#roNeg')).includes('D₅'));
}

/* the ELLIPTOPE card */
s = await pick('elliptope');
check('ELLIPTOPE: M = 2, in ℝ⁶, the candidate inside', s.M === 2 && s.space === 'r6' && s.psd && !s.playing);

/* the FLAT card */
s = await pick('flat');
check('FLAT plays in ℝ³', await until(page, () => { const d = window.ELLIPTOPE_DEBUG.state; return d.playing && d.space === 'r3'; }));
await page.evaluate(() => window.ELLIPTOPE_DEBUG.advance(3.8));
await until(page, () => { const d = window.ELLIPTOPE_DEBUG.state; return !d.playing && d.M === 5; });
s = await state();
check('FLAT: ℝ³ at M = 5, det G = 0, the window a single value', s.space === 'r3' && s.M === 5 && Math.abs(cofDet(table(V3, 5, s.y, s.z))) < 1e-12 && s.windows[4].pts.length === 1 && !s.windows[4].open);
s = await pick('elliptope');

/* ℝ³: the bubble keeps only its edge from M = 3, isolated points from M = 4 */
await page.click('#spaceChips [data-space="r3"]');
s = await seek(4);
{
  let flat = true, ok = true;
  for (let M = 3; M <= 5; M++) {
    s = await seek(M - 1);
    const G = table(V3, M, s.y, s.z);
    if (!(Math.abs(cofDet(G)) < 1e-12 && s.windows[M - 1] && !s.windows[M - 1].open)) flat = false;
    if (!s.windows[M - 1].pts.some((z) => Math.abs(z - s.z) < 1e-9)) ok = false;
  }
  check('ℝ³: for M = 3, 4, 5 det G = 0 and the window has no inside', flat && s.space === 'r3');
  check('ℝ³: the candidate sits on one of the window\'s values (pinned to the edge)', ok);
  const w2 = (await seek(1)).windows[1];
  check('ℝ³: with two remembered the window still has an inside', w2.open && w2.hi - w2.lo > 0.1);
  check('ℝ³: the sliders are disabled', await page.evaluate(() => document.getElementById('fy').disabled && document.getElementById('fz').disabled));
}
await page.click('#spaceChips [data-space="r6"]');
s = await state();
check('back to ℝ⁶: sliders enabled, candidate inside', s.space === 'r6' && s.psd && !(await page.evaluate(() => document.getElementById('fy').disabled)));

/* controls */
await page.click('#depthChips [data-depth="3"]'); s = await state();
check('depth chip 3 sets M = 3 and leaves the card', s.M === 3 && s.preset === null);
s = await setRange('fz', 0.1); check('z slider sets z', Math.abs(s.z - 0.1) < 1e-9);
s = await setRange('fy', -0.2); check('y slider sets y', Math.abs(s.y + 0.2) < 1e-9);
{
  const to = await page.evaluate(() => window.ELLIPTOPE_DEBUG.at(0.1, 0.4));
  const from = await page.evaluate(() => window.ELLIPTOPE_DEBUG.at());
  await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 4 }); await page.mouse.up();
  s = await state();
  check('dragging Q in the slice moves it to (y, z)', Math.abs(s.y - 0.1) < 0.02 && Math.abs(s.z - 0.4) < 0.02, `(${s.y}, ${s.z})`);
}
await page.locator('body').click({ position: { x: 5, y: 5 } });
await seek(1); await page.keyboard.press('ArrowRight'); check('→ remembers one step more', (await state()).M === 3);
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); check('← ← remembers two steps less', (await state()).M === 1);
s = await pick('narrow');
check('NARROW plays from M = 1', await until(page, () => { const d = window.ELLIPTOPE_DEBUG.state; return d.playing && d.t > 0.2; }));
// do not wait for the whole run: push the playing clock near its end, then let it stop by itself
await page.evaluate(() => window.ELLIPTOPE_DEBUG.advance(3.8));
check('NARROW stops by itself at M = 5', await until(page, () => { const d = window.ELLIPTOPE_DEBUG.state; return !d.playing && d.M === 5 && d.t === 4; }));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays again', await until(page, () => { const d = window.ELLIPTOPE_DEBUG.state; return d.playing; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ goes back to M = 1', (await state()).M === 1);

/* English */
await page.click('[data-lang-set="en"]'); await settle(page);
check('English readout note', /minors|table|candidate/.test(await page.textContent('#roNote')));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
