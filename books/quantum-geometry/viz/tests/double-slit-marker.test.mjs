#!/usr/bin/env node
// Browser regression suite for SLIT//MARKER (books/quantum-geometry/viz/double-slit-marker/):
//   node books/quantum-geometry/viz/tests/double-slit-marker.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then the page's own claims, checked against computations written here and never by calling
// the page's functions: the screen law from 2×2 complex density matrices (marker state, slit unitaries, a partial
// trace), the reading directions as eigenvectors, the distinguishability as a trace norm, the hits by a
// Kolmogorov–Smirnov test against the law, the rows by binomial counts and a contrast estimator of our own. The ERASER
// card is a comparison of two alternative readouts on the same stored hits; the suite also computes (Lüders rule) why it
// cannot be a path readout followed by an erasing one, and where the coherence is when α = 90°.
import { session, stageFirstChecks, settle, until, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'double-slit-marker', NMAX = 1600;
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.SLIT_DEBUG.state); };
const seek = async (t) => { await D((v) => window.SLIT_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ---------- independent model: complex 2×2 matrices ---------- */
const C = (re, im = 0) => ({ re, im });
const cadd = (a, b) => C(a.re + b.re, a.im + b.im), cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re), conj = (a) => C(a.re, -a.im);
const mmul = (A, B) => [[cadd(cmul(A[0][0], B[0][0]), cmul(A[0][1], B[1][0])), cadd(cmul(A[0][0], B[0][1]), cmul(A[0][1], B[1][1]))], [cadd(cmul(A[1][0], B[0][0]), cmul(A[1][1], B[1][0])), cadd(cmul(A[1][0], B[0][1]), cmul(A[1][1], B[1][1]))]];
const dag = (A) => [[conj(A[0][0]), conj(A[1][0])], [conj(A[0][1]), conj(A[1][1])]];
const tr = (A) => cadd(A[0][0], A[1][1]);
const rot = (a) => [[C(Math.cos(a)), C(-Math.sin(a))], [C(Math.sin(a)), C(Math.cos(a))]];
const I2 = [[C(1), C(0)], [C(0), C(1)]];
const SIG = 0.45, K = 8 * Math.PI, env = (x) => Math.exp(-x * x / (2 * SIG * SIG));
/** The marker state λ|e₀⟩⟨e₀| + (1 − λ)·I/2 (λ is the weight of the pure part; the purity is Tr ρ² = (1 + λ²)/2) and the
    two slit unitaries: U_L = 1, U_R = rotation by α. */
const model = (alphaDeg, lam) => ({ rho: [[C((1 + lam) / 2), C(0)], [C(0), C((1 - lam) / 2)]], U: [I2, rot(alphaDeg * Math.PI / 180)] });
/** P(x, m) = ½ Σ_jk ψ_j(x) ψ_k(x)* ⟨m| U_j ρ U_k† |m⟩ with ψ_L = √env·e^{ikx/2}, ψ_R = √env·e^{−ikx/2}; m a real unit vector. */
function joint(md, x, m) {
  const psi = [C(Math.sqrt(env(x)) * Math.cos(K * x / 2), Math.sqrt(env(x)) * Math.sin(K * x / 2)), C(Math.sqrt(env(x)) * Math.cos(K * x / 2), -Math.sqrt(env(x)) * Math.sin(K * x / 2))];
  let s = C(0);
  for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) {
    const M = mmul(mmul(md.U[j], md.rho), dag(md.U[k]));
    const q = cadd(cadd(cmul(C(m[0] * m[0]), M[0][0]), cmul(C(m[0] * m[1]), M[0][1])), cadd(cmul(C(m[1] * m[0]), M[1][0]), cmul(C(m[1] * m[1]), M[1][1])));
    s = cadd(s, cmul(cmul(psi[j], conj(psi[k])), q));
  }
  return 0.5 * s.re;
}
const totalLaw = (md, x) => joint(md, x, [1, 0]) + joint(md, x, [0, 1]);
/** Eigenvectors of a real symmetric 2×2 matrix [[a, b], [b, d]], the one of the larger eigenvalue first. */
function eig2(a, b, d) {
  const m = (a + d) / 2, r = Math.hypot((a - d) / 2, b), l1 = m + r, l2 = m - r;
  const v = Math.abs(b) > 1e-14 ? [b, l1 - a] : a >= d ? [1, 0] : [0, 1], n = Math.hypot(v[0], v[1]);
  const u = [v[0] / n, v[1] / n]; return { vals: [l1, l2], vecs: [u, [-u[1], u[0]]] };
}
const ret = (md, j) => mmul(mmul(md.U[j], md.rho), dag(md.U[j]));      // ρ_L, ρ_R
function rawReaders(md) {
  const L = ret(md, 0), R = ret(md, 1), dif = eig2(L[0][0].re - R[0][0].re, L[0][1].re - R[0][1].re, L[1][1].re - R[1][1].re);
  const rl = md.U[0].map((row) => row[0].re), rr = md.U[1].map((row) => row[0].re);           // U e₀
  const sum = eig2(rl[0] ** 2 + rr[0] ** 2, rl[0] * rl[1] + rr[0] * rr[1], rl[1] ** 2 + rr[1] ** 2);
  return { dif, sum };
}
/** Reading directions: for the path, the eigenvectors of ρ_L − ρ_R (its positive one says “left”); to erase, those of
    |r_L⟩⟨r_L| + |r_R⟩⟨r_R| (the bisector first). Where they are not unique (α = 0, α = 90°, λ = 0) we take the limit
    from inside: the directions do not depend on λ > 0, and α is moved by 10⁻⁶. */
function readers(md, alphaDeg) {
  const { dif } = rawReaders(md), a = alphaDeg == null ? Math.atan2(md.U[1][1][0].re, md.U[1][0][0].re) * 180 / Math.PI : alphaDeg;
  const path = rawReaders(model(a < 1e-3 ? 1e-6 : a, 1)).dif.vecs, erase = rawReaders(model(a > 90 - 1e-3 ? 90 - 1e-6 : a, 1)).sum.vecs;
  return { path, erase, dTrace: 0.5 * (Math.abs(dif.vals[0]) + Math.abs(dif.vals[1])) };
}
const visibility = (md) => { const z = tr(mmul(dag(md.U[1]), mmul(md.U[0], md.rho))); return Math.hypot(z.re, z.im); };
/** The reduced path state ½ Tr_E(U_j ρ U_k†) and its off-diagonal mass |ρ₀₁|² + |ρ₁₀|². */
const mass = (md) => { const z = tr(mmul(mmul(md.U[0], md.rho), dag(md.U[1]))); return 2 * ((z.re / 2) ** 2 + (z.im / 2) ** 2); };
/** Contrast solved from ⟨cos kx⟩ by our own trapezoid integrals of env, env·cos, env·cos². */
const INT = (() => { const n = 20000; let e0 = 0, e1 = 0, e2 = 0; for (let i = 0; i <= n; i++) { const x = -1 + 2 * i / n, w = (i === 0 || i === n ? 0.5 : 1) * 2 / n, e = env(x), c = Math.cos(K * x); e0 += w * e; e1 += w * e * c; e2 += w * e * c * c; } return [e0, e1, e2]; })();
const estimate = (xs) => { if (!xs.length) return null; const m = xs.reduce((s, x) => s + Math.cos(K * x), 0) / xs.length; return (m * INT[0] - INT[1]) / (INT[2] - m * INT[1]); };
/** Kolmogorov–Smirnov distance between samples and the law f on [−1, 1] (CDF by a fine trapezoid sum). */
function ks(xs, f) {
  const n = 8000, cdf = [0]; let acc = 0; for (let i = 1; i <= n; i++) { acc += (f(-1 + 2 * (i - 1) / n) + f(-1 + 2 * i / n)) / 2; cdf.push(acc); }
  const F = (x) => { const u = (x + 1) / 2 * n, i = Math.min(n - 1, Math.max(0, Math.floor(u))); return (cdf[i] + (u - i) * (cdf[i + 1] - cdf[i])) / acc; };
  const s = xs.slice().sort((a, b) => a - b); let d = 0; s.forEach((x, i) => { const v = F(x); d = Math.max(d, Math.abs(v - i / s.length), Math.abs(v - (i + 1) / s.length)); }); return d;
}
const mass1 = (md, m) => { const n = 4000; let a = 0, t = 0; for (let i = 0; i <= n; i++) { const x = -1 + 2 * i / n, w = i === 0 || i === n ? 0.5 : 1; a += w * joint(md, x, m); t += w * totalLaw(md, x); } return a / t; };
const XS = Array.from({ length: 41 }, (_, i) => -1 + i / 20);
/** The page's drawn curves against the law here; the rows are matched to the reading directions here up to order. */
async function lawMatches(st) {
  const md = model(st.alpha, st.lambda), cv = await D((xs) => window.SLIT_DEBUG.curves(xs), XS);
  let err = Math.max(...XS.map((x, i) => Math.abs(cv.total[i] - totalLaw(md, x))));
  if (cv.rows) { const dirs = readers(md)[st.reader]; err = Math.max(err, ...XS.map((x, i) => Math.abs(cv.rows[0][i] - joint(md, x, dirs[0]))), ...XS.map((x, i) => Math.abs(cv.rows[1][i] - joint(md, x, dirs[1])))); }
  return err;
}

/* ---------- opening card and the circle ---------- */
let s = await state();
check('opens on SIXTY: α = 60°, pure marker, unread, every hit in', s.preset === 'partial' && s.alpha === 60 && s.lambda === 1 && s.reader === 'none' && s.n === NMAX && !s.playing);
let md = model(60, 1);
check('SIXTY: V = |Tr(U_R†U_L ρ)| = 0.5 and D = ½‖ρ_L − ρ_R‖₁ = 0.866, so D² + V² = 1', near(s.V, visibility(md), 1e-12) && near(s.D, readers(md).dTrace, 1e-12) && s.V.toFixed(2) === '0.50' && s.D.toFixed(3) === '0.866' && near(s.sum, 1, 1e-12));
check('SIXTY: the coherence mass of the reduced path state is V²/2 = 0.125', near(s.mass, mass(md), 1e-12) && near(s.mass, 0.125, 1e-12));
check('SIXTY: the drawn law equals the partial trace of the joint state, env·(1 + cos α·cos kx)', (await lawMatches(s)) < 1e-12);
let hits = await D(() => window.SLIT_DEBUG.hits());
let dks = ks(hits.map((h) => h.x), (x) => totalLaw(md, x));
check('SIXTY: the 1600 hits follow the law (Kolmogorov–Smirnov distance below the 1% level 0.041)', hits.length === NMAX && dks < 1.63 / Math.sqrt(NMAX), `KS ${dks.toFixed(4)}`);
check('SIXTY: the contrast counted from the hits is the page’s and close to 0.5', near(s.counted, estimate(hits.map((h) => h.x)), 1e-6) && Math.abs(s.counted - 0.5) < 0.08, `${s.counted}`);

let sweep = 0, lawErr = 0;
for (const a of [0, 13, 30, 45, 72, 90]) for (const lam of [1, 0.7, 0.3, 0]) {
  await setRange('alpha', a); await setRange('purity', lam); s = await state(); md = model(a, lam);
  sweep = Math.max(sweep, Math.abs(s.V - visibility(md)), Math.abs(s.D - readers(md).dTrace), Math.abs(s.mass - mass(md)), Math.abs(s.sum - (visibility(md) ** 2 + readers(md).dTrace ** 2)));
  if (lam === 1) sweep = Math.max(sweep, Math.abs(s.sum - 1)); else if (a > 0) sweep = Math.max(sweep, s.sum < 1 - 1e-9 ? 0 : 1);
  for (const r of ['path', 'erase']) { await page.click(`#readerChips [data-reader="${r}"]`); await settle(page); lawErr = Math.max(lawErr, await lawMatches(await state())); }
  await page.click('#readerChips [data-reader="none"]'); await settle(page);
}
check('24 markers (α × λ): V, D, the mass and D² + V² match the matrices; = 1 for pure, < 1 for mixed markers with α > 0', sweep < 1e-9, `${sweep}`);
check('…and in every one the drawn rows of both readers equal the law read along the eigenvectors computed here', lawErr < 1e-6, `${lawErr}`);
check('the sliders leave the card', (await state()).preset === null);

/* ---------- cards ---------- */
await pick('wave'); s = await state();
check('WAVE: α = 0°, V = 1, D = 0', s.alpha === 0 && near(s.V, 1, 1e-12) && near(s.D, 0, 1e-12));
check('WAVE plays the hits in from zero', await until(page, () => { const d = window.SLIT_DEBUG.state; return d.n > 0 && d.n < 1600 || d.n === 1600; }));
s = await seek(NMAX); hits = await D(() => window.SLIT_DEBUG.hits());
check('WAVE: the counted contrast is near 1', Math.abs(estimate(hits.map((h) => h.x)) - 1) < 0.08);
await pick('which'); s = await seek(NMAX); hits = await D(() => window.SLIT_DEBUG.hits()); md = model(90, 1);
check('WHICH-PATH: α = 90°, V = 0, D = 1, no fringes in the hits', s.alpha === 90 && near(s.V, 0, 1e-12) && near(s.D, 1, 1e-12) && Math.abs(estimate(hits.map((h) => h.x))) < 0.1 && ks(hits.map((h) => h.x), env) < 0.041);
const unreadX = hits.map((h) => h.x);
// α = 90°: the reduced path state has no off-diagonal mass, and it has not moved into the marker: the marker's own
// reduced state ½(ρ_L + ρ_R) has none either; the cross block ½ U_L ρ U_R† of the joint path–marker state keeps it
{
  const ML = ret(md, 0), MR = ret(md, 1), mk = [0, 1].map((i) => [0, 1].map((j) => C((ML[i][j].re + MR[i][j].re) / 2, (ML[i][j].im + MR[i][j].im) / 2)));
  const off = (A) => A[0][1].re ** 2 + A[0][1].im ** 2 + A[1][0].re ** 2 + A[1][0].im ** 2;
  const X = mmul(mmul(md.U[0], md.rho), dag(md.U[1])), cross = 2 * X.flat().reduce((t, z) => t + z.re * z.re + z.im * z.im, 0) / 4;
  const noteW = await page.textContent('#roNote');
  check('WHICH-PATH: neither the reduced path state nor the marker’s own state keeps off-diagonal mass; the cross blocks of the joint state keep ½, and the note puts the coherence there, not in the marker', near(mass(md), 0, 1e-15) && near(s.mass, 0, 1e-12) && off(mk) < 1e-15 && near(cross, 0.5, 1e-12) && /联合关联/.test(noteW) && /没有搬进标记/.test(noteW), `${off(mk)} ${cross} ${noteW}`);
}

await pick('delayed'); s = await state();
check('DELAYED: the marker is to be read for the path, but only after the hits are in', s.reader === 'path' && s.hold && s.split === 0 && s.n < NMAX);
check('DELAYED: the hits keep arriving while the marker waits', await until(page, () => { const d = window.SLIT_DEBUG.state; return d.n > 0 && d.hold; }));
// the claim is what happens when the last hit lands, not how fast playback gets there: move the rail to it
s = await seek(NMAX);
check('DELAYED: once the last hit lands, the hits are sorted into two rows', s.n === NMAX && !s.hold && s.split === 1);
hits = await D(() => window.SLIT_DEBUG.hits());
const rowsOf = (hs, k) => hs.filter((h) => h.row === k).map((h) => h.x);
check('DELAYED: the sorted hits are exactly the unread hits of WHICH-PATH, none moved', s.split === 1 && hits.length === NMAX && hits.every((h, i) => h.x === unreadX[i]) && hits.every((h) => h.row === 0 || h.row === 1));
const dirs = readers(md);
let p1 = mass1(md, dirs.path[0]), n1 = rowsOf(hits, 0).length;
check('DELAYED: half the hits are read as “left”, as the law gives', near(p1, 0.5, 1e-9) && Math.abs(n1 - NMAX * p1) < 4 * Math.sqrt(NMAX * p1 * (1 - p1)), `${n1}`);
check('DELAYED: neither row shows fringes', Math.abs(estimate(rowsOf(hits, 0))) < 0.2 && Math.abs(estimate(rowsOf(hits, 1))) < 0.2);
await pick('erase'); s = await state();
check('ERASER: the marker again waits for the hits; the card will sort them under the path readout first and under the alternative erasing readout afterwards', s.hold && s.reader === 'path' && s.then === 'erase');
const eraseCard = await D(() => { const b = document.querySelector('[data-preset="erase"]'); return { zh: b.querySelector('.cn.zh').textContent, en: b.querySelector('.cn.en').textContent }; });
const noteZh = await page.textContent('#presetNote');
check('ERASER: the card and its note present two alternative readouts compared on the same hits, not a reading followed by a re-reading', s.compare === true && /二选一/.test(eraseCard.zh) && !/重读|先.*再/.test(eraseCard.zh) && /alternative/.test(eraseCard.en) && !/again|then/i.test(eraseCard.en) && /只能选一种/.test(noteZh) && /对照/.test(noteZh), `${eraseCard.zh} | ${eraseCard.en} | ${noteZh.slice(0, 60)}`);
// the last hit starts the card's own comparison: sorted under the path readout (700 ms), pause (1400 ms), gather
// (450 ms), sorted under the erasing readout (700 ms). settle() flushes twice and so also ends the pause, leaving the path
// rows only for the gather, which separate calls can miss on a busy runner: land the last hit, end the sort alone (one
// flush does not end the pause it schedules) and read the state, the hits and the HUD in that same task
const first = await D((n) => { const before = window.SLIT_DEBUG.state; window.SLIT_DEBUG.seek(n); window.TRV.kit.flush(); return { before, st: window.SLIT_DEBUG.state, hits: window.SLIT_DEBUG.hits(), hud: document.getElementById('hudSub').textContent }; }, NMAX);
s = first.st; hits = first.hits;
check('ERASER: once the hits are in, they are first sorted as the path readout would sort them, none moved', first.before.hold && first.before.n < NMAX && s.n === NMAX && !s.hold && s.reader === 'path' && s.split === 1 && s.then === 'erase' && hits.length === NMAX && hits.every((h, i) => h.x === unreadX[i] && (h.row === 0 || h.row === 1)) && Math.abs(estimate(rowsOf(hits, 0))) < 0.2 && Math.abs(estimate(rowsOf(hits, 1))) < 0.2, `${JSON.stringify({ before: first.before.hold, reader: s.reader, split: s.split, then: s.then })} ${estimate(rowsOf(hits, 0))} ${estimate(rowsOf(hits, 1))}`);
check('ERASER: while the path rows are shown, the HUD names them as one of the alternatives', first.st.compare === true && /对照/.test(first.hud) && /按路径读/.test(first.hud), first.hud);
check('ERASER: then, by itself, the card gathers them back and sorts them under the alternative erasing readout', await until(page, () => { const d = window.SLIT_DEBUG.state; return d.reader === 'erase' && d.split === 1 && d.then === null; }));
await settle(page); s = await state(); hits = await D(() => window.SLIT_DEBUG.hits());
const ep = estimate(rowsOf(hits, 0)), em = estimate(rowsOf(hits, 1));
const hudE = await page.textContent('#hudSub'), toastE = await page.textContent('#toast');
check('ERASER: the HUD names the erasing rows as the other alternative, and the switch says it is not a second reading of the marker', s.compare === true && /对照/.test(hudE) && /二选一/.test(hudE) && /不是对标记的第二次读出/.test(toastE), `${hudE} | ${toastE}`);
check('ERASER: the same stored hits under the erasing readout; one row has fringes, the other anti-fringes', s.reader === 'erase' && hits.every((h, i) => h.x === unreadX[i]) && ep > 0.8 && em < -0.8, `${ep} ${em}`);
check('ERASER: the two rows add up to every hit', rowsOf(hits, 0).length + rowsOf(hits, 1).length === NMAX && (await lawMatches(s)) < 1e-12);
// why the card compares alternatives and does not read twice: after a projective path readout at α = 90° the marker is
// left along a path direction d, so an erasing readout afterwards sorts the hits with weight ⟨e, d⟩² and no cos kx term
// (Lüders rule); the erasing readout chosen instead gives fringes and anti-fringes of full contrast. Matrices here.
{
  const md9 = model(90, 1), rd = readers(md9), dot = (u, v) => u[0] * v[0] + u[1] * v[1];
  const seq = (x, e) => rd.path.reduce((t, d) => t + joint(md9, x, d) * dot(e, d) ** 2, 0);
  const FX = Array.from({ length: 401 }, (_, i) => -0.5 + i / 400);      // holds x = 0 and x = ±1/8, where cos kx = ±1
  const flat = rd.erase.map((e) => Math.max(...FX.map((x) => Math.abs(seq(x, e) / env(x) - seq(0, e) / env(0)))));
  const vis = (f) => { const v = FX.map((x) => f(x) / env(x)), hi = Math.max(...v), lo = Math.min(...v); return (hi - lo) / (hi + lo); };
  const alt = rd.erase.map((e) => vis((x) => joint(md9, x, e)));
  check('…a path readout followed by an erasing one would leave both rows without fringes; the erasing readout chosen instead gives fringes of full contrast', flat.every((d) => d < 1e-12) && alt.every((v) => near(v, 1, 1e-9)), `${flat} ${alt}`);
}
await pick('mixed'); s = await seek(NMAX); md = model(60, 0.5);
check('MIXED: λ = 0.5: V = 0.5 still, D = 0.433, D² + V² = 0.4375 < 1', s.lambda === 0.5 && near(s.V, 0.5, 1e-12) && near(s.D, readers(md).dTrace, 1e-12) && near(s.sum, 0.4375, 1e-12));
check('MIXED: the path of the point stays inside the circle, on the arc (cos α, λ·sin α)', [10, 40, 80].every((a) => { const m = model(a, 0.5); return visibility(m) ** 2 + readers(m).dTrace ** 2 < 1; }));
// λ is the weight of the pure part, not the purity: Tr ρ² of the marker, from the matrix here
const rho5 = model(60, 0.5).rho, purity5 = tr(mmul(rho5, rho5)).re;
check('MIXED: λ = 0.5 is not the purity; Tr ρ² = (1 + λ²)/2 = 0.625 from the matrix, and the readout shows it', near(purity5, 0.625, 1e-15) && (await page.textContent('#roL')).includes('0.625'));
const lamText = await page.evaluate(() => document.body.textContent);
check('no text on the page calls λ the purity (纯度 λ / purity λ)', !/纯度\s*λ|标记的纯度|purity\s+(of the marker\s+)?λ|purity of the marker/i.test(lamText));
// a mixed marker that has recorded nothing (α = 0) is on the circle, not inside it
await setRange('alpha', 0); await setRange('purity', 0.5); s = await state(); md = model(0, 0.5);
const eq0 = visibility(md) ** 2 + readers(md).dTrace ** 2;
const sub0 = await page.textContent('#roSumSub');
check('α = 0 with λ = 0.5: D² + V² = 1 from the matrices, the page agrees, and its readout claims neither “below 1” nor “inside”', near(eq0, 1, 1e-12) && near(s.sum, 1, 1e-12) && (await page.textContent('#pillSum strong')) === '1.000' && !/小于|圆内|below|inside/.test(sub0), sub0);
await setRange('alpha', 60); s = await state(); md = model(60, 0.5);
check('…and back at α = 60°, λ = 0.5 the same marker is strictly inside: 0.4375 < 1, and the readout says so', near(s.sum, 0.4375, 1e-12) && /小于|圆内/.test(await page.textContent('#roSumSub')));
await page.click('#readerChips [data-reader="path"]'); await settle(page); s = await state(); hits = await D(() => window.SLIT_DEBUG.hits());
p1 = mass1(md, readers(md).path[0]); n1 = rowsOf(hits, 0).length;
check('the reader chips sort at once and leave the card; the row counts follow the law for a mixed marker', s.reader === 'path' && s.split === 1 && s.preset === null && Math.abs(n1 - NMAX * p1) < 4 * Math.sqrt(NMAX * p1 * (1 - p1)) && (await lawMatches(s)) < 1e-12, `${n1} vs ${NMAX * p1}`);

/* ---------- direct manipulation, rail, language ---------- */
await setRange('purity', 1);
const to = await D(() => window.SLIT_DEBUG.at(30));
await page.mouse.move(to[0], to[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('pressing on the circle turns the marker to that angle', Math.abs(s.alpha - 30) < 1.5, `${s.alpha}`);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await seek(500); await page.keyboard.press('ArrowRight'); s = await state();
check('→ lets 100 more hits in', s.n === 600);
await page.click('#rew'); check('⏮ empties the screen', (await state()).n === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays the hits in', await until(page, () => { const d = window.SLIT_DEBUG.state; return d.playing && d.n > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const r of ['none', 'path', 'erase']) { await page.click(`#readerChips [data-reader="${r}"]`); await settle(page); const left = await cjkLeftovers(page); check(`English: no Chinese left with the reader ${r}`, left.length === 0, left.slice(0, 3).join(' | ')); }
await pick('erase');
const noteEn = await page.textContent('#presetNote');
check('English ERASER: the note presents two alternative readouts compared on the same stored hits', /only one of the two/.test(noteEn) && /for comparison/.test(noteEn) && /not a path reading followed by/.test(noteEn), noteEn.slice(0, 120));
await D((n) => window.SLIT_DEBUG.seek(n), NMAX);
const erasedEn = await until(page, () => { const d = window.SLIT_DEBUG.state; return d.reader === 'erase' && d.split === 1 && d.then === null; });
await settle(page);
const hudEn = await page.textContent('#hudSub'), toastEn = await page.textContent('#toast'), leftEn = await cjkLeftovers(page);
check('English ERASER: the erasing rows are named as the other alternative, the switch is not a second reading, and no Chinese is left', erasedEn && /one or the other/.test(hudEn) && /not a second reading/.test(toastEn) && leftEn.length === 0, `${hudEn} | ${toastEn} | ${leftEn.slice(0, 3).join(' | ')}`);

// the stills that chapter 6 prints: the reading splits the hits (it does not copy them), and the rows are named as the caption says
{
  const shot = await T.newPage();
  for (const id of ['delayed', 'erase']) {
    await T.goto(BOOK, ID, `?shot=1&lang=zh&preset=${id}`, shot); await settle(shot, 60);
    const st = await shot.evaluate(() => window.SLIT_DEBUG.state), hits = await shot.evaluate(() => window.SLIT_DEBUG.hits());
    const rows = [0, 1].map((r) => hits.filter((h) => h.row === r).length);
    check(`still ${id}: all ${NMAX} hits are in, and the two rows split them (${rows.join(' + ')} = ${hits.length})`, st.n === NMAX && hits.length === NMAX && rows[0] + rows[1] === NMAX && rows.every((k) => k > 0) && st.reader === (id === 'delayed' ? 'path' : 'erase'));
    const body = await shot.evaluate(() => document.getElementById('stage').innerText + document.getElementById('legend').innerText);
    check(`still ${id}: the legend writes r with a subscript R, not r_R`, !/r_[LR]/.test(body) && /rR/.test(await shot.evaluate(() => document.getElementById('legend').textContent)));
    if (id === 'erase') check('still erase: the frame names the rows as the alternative erasing readout and their fringes as conditional', /对照/.test(body) && /二选一/.test(body) && /条件条纹/.test(body), body.replace(/\s+/g, ' ').slice(0, 160));
  }
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
