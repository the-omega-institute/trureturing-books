// Browser regression suite for WALK//SPREAD (books/quantum-geometry/viz/walk-spreading/).
//   node books/quantum-geometry/viz/tests/walk-spreading.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page steps amplitude arrays one step at a time. The suite builds the whole 2p × 2p one-step matrix of the
// text's hadamardStep and raises it to the n-th power by repeated squaring (complex matrices as pairs of real ones),
// counts the classical walk with binomial coefficients folded mod p, and compares. It reads the page through
// window.WALK_DEBUG and never calls the page's own model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'walk-spreading';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model ---------- */
/** Index of the mode (b, x mod p) in the 2p-vector. */
const idx = (b, x, p) => b * p + (((x % p) + p) % p);
/** The one-step matrix of hadamardStep(p): row = new mode, column = old mode. */
function stepMatrix(p) {
  const N = 2 * p, M = Array.from({ length: N }, () => new Float64Array(N)), s = Math.SQRT1_2;
  for (let x = 0; x < p; x++) {
    M[idx(0, x, p)][idx(0, x + 1, p)] += s; M[idx(0, x, p)][idx(1, x + 1, p)] += s;
    M[idx(1, x, p)][idx(0, x - 1, p)] += s; M[idx(1, x, p)][idx(1, x - 1, p)] -= s;
  }
  return M;
}
const mul = (A, B) => {   // real square matrices (the step matrix is real; powers stay real)
  const N = A.length, C = Array.from({ length: N }, () => new Float64Array(N));
  for (let i = 0; i < N; i++) for (let k = 0; k < N; k++) { const a = A[i][k]; if (a === 0) continue; const Bk = B[k], Ci = C[i]; for (let j = 0; j < N; j++) Ci[j] += a * Bk[j]; }
  return C;
};
function power(M, n) {
  const N = M.length; let R = Array.from({ length: N }, (_, i) => { const r = new Float64Array(N); r[i] = 1; return r; }), B = M;
  while (n > 0) { if (n & 1) R = mul(R, B); n >>= 1; if (n) B = mul(B, B); }
  return R;
}
const cache = new Map();
/** Amplitudes after n steps from the origin with the coin c = [re0, im0, re1, im1]: |ψ(0, x)|², |ψ(1, x)|² by x mod p. */
function walk(p, n, c) {
  const key = `${p}|${n}`;
  if (!cache.has(key)) cache.set(key, power(stepMatrix(p), n));
  const U = cache.get(key), i0 = idx(0, 0, p), i1 = idx(1, 0, p), z0 = [], z1 = [];
  for (let x = 0; x < p; x++) {
    const r0 = U[idx(0, x, p)][i0] * c[0] + U[idx(0, x, p)][i1] * c[2], m0 = U[idx(0, x, p)][i0] * c[1] + U[idx(0, x, p)][i1] * c[3];
    const r1 = U[idx(1, x, p)][i0] * c[0] + U[idx(1, x, p)][i1] * c[2], m1 = U[idx(1, x, p)][i0] * c[1] + U[idx(1, x, p)][i1] * c[3];
    z0.push(r0 * r0 + m0 * m0); z1.push(r1 * r1 + m1 * m1);
  }
  return { z0, z1, q: z0.map((a, x) => a + z1[x]) };
}
/** Classical walk: C(n, k) / 2ⁿ at the position 2k − n, folded mod p. */
function classical(p, n) {
  const out = new Array(p).fill(0);
  let c = Math.pow(2, -n);
  for (let k = 0; k <= n; k++) { out[(((2 * k - n) % p) + p) % p] += c; c = c * (n - k) / (k + 1); }
  return out;
}
const repr = (x, p) => { const r = ((x % p) + p) % p; return r > p / 2 ? r - p : r; };
function width(dist, p) {
  let m = 0; dist.forEach((v, x) => { m += repr(x, p) * v; });
  let v2 = 0; dist.forEach((v, x) => { v2 += (repr(x, p) - m) ** 2 * v; });
  return { mean: m, sigma: Math.sqrt(v2) };
}
const R2 = Math.SQRT1_2, STAR = [R2, 0, 0, R2], REAL = [R2, 0, R2, 0];
/** The page's arrays (indexed by x mod p) against the test's. */
const gap = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.WALK_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.WALK_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
/** Indices of the tallest bars (by position). */
const peaks = (s) => { const top = Math.max(...s.q); return s.q.map((v, i) => (v > top - 1e-12 ? s.xs[i] : null)).filter((x) => x != null).sort((a, b) => a - b); };

let s = await state();
check('opens on the FIFTY-STEPS card at n = 50', s.preset === 'fifty' && s.n === 50 && !s.playing);
let W = walk(121, 50, STAR), C = classical(121, 50);
check('FIFTY: the quantum distribution equals the 50th power of the one-step matrix applied to c*', gap(s.q, W.q) < 1e-12 && gap(s.z0, W.z0) < 1e-12 && gap(s.z1, W.z1) < 1e-12, `${gap(s.q, W.q)}`);
check('FIFTY: the classical distribution is binomial C(50, k)/2⁵⁰', gap(s.k, C) < 1e-15);
const wq = width(W.q, 121), wc = width(C, 121);
check('FIFTY: widths 27.07 and √50 = 7.07, ratio 3.83 (as the card says)', close(s.sigmaQ, wq.sigma, 1e-9) && close(wq.sigma, 27.07, 0.005) && close(s.sigmaC, Math.sqrt(50), 1e-9) && close(wc.sigma, Math.sqrt(50), 1e-9) && close(wq.sigma / wc.sigma, 3.83, 0.005), `${wq.sigma} ${wc.sigma}`);
check('FIFTY: the two tallest bars stand at ±34', JSON.stringify(peaks(s)) === '[-34,34]', JSON.stringify(peaks(s)));
check('FIFTY: the probabilities add up to 1', close(s.total, 1, 1e-12) && close(W.q.reduce((a, b) => a + b, 0), 1, 1e-12));

check('FIFTY: nothing beyond ±n, and only positions of the parity of n are occupied', s.xs.every((x, i) => (Math.abs(x) > 50 || (x - 50) % 2 !== 0 ? s.q[i] < 1e-15 && s.k[i] < 1e-15 : true)));

await pick('width'); s = await seek(60);
check('WIDTH: the width scene at n = 60', s.scene === 'width' && s.n === 60);
let cOK = true, qOK = true;
for (let n = 0; n <= 60; n++) { if (!close(s.widths[n][1], Math.sqrt(n), 1e-9)) cOK = false; }
for (const n of [1, 7, 20, 33, 60]) { if (!close(s.widths[n][0], width(walk(121, n, STAR).q, 121).sigma, 1e-9)) qOK = false; }
check('WIDTH: the classical width is √n at every step (variance of the binomial walk = n)', cOK);
check('WIDTH: the quantum widths agree with the matrix powers at n = 1, 7, 20, 33, 60', qOK);
const slopes = s.widths.slice(20).map((w, i) => w[0] / (i + 20));
check('WIDTH: σ ÷ n stays near 0.54 from n = 20 on (a straight line), and reaches 32.5 against 7.75 at 60', slopes.every((v) => v > 0.52 && v < 0.56) && close(s.widths[60][0], 32.48, 0.005) && close(s.widths[60][1], 7.746, 0.001), slopes.map((v) => v.toFixed(3)).join(' '));
check('WIDTH: the width ratio keeps growing (like √n)', s.widths.slice(5).every((w, i, a) => i === 0 || w[0] / w[1] > a[i - 1][0] / a[i - 1][1] - 1e-9));

await pick('coin'); s = await seek(50);
W = walk(121, 50, REAL);
const imb = W.q.reduce((a, v, x) => a + Math.abs(v - W.q[(121 - x) % 121]), 0) / 2;
check('REAL-COIN: coin (1, 1)/√2 at n = 50 matches the matrix power', s.phi === 0 && close(s.w, 0.5) && gap(s.q, W.q) < 1e-12);
check('REAL-COIN: lopsidedness ½ Σ |P(x) − P(−x)| = 0.51, leaning left', close(s.imbalance, imb, 1e-12) && close(imb, 0.5117, 0.0005) && s.meanQ < 0 && width(W.q, 121).mean < 0, `${imb}`);
const star = walk(121, 50, STAR);
check('REAL-COIN: a mirror pair (0, x), (1, −x) holds the same total as with c* (test-side)', W.z0.every((a, x) => close(a + W.z1[(121 - x) % 121], star.z0[x] + star.z1[(121 - x) % 121], 1e-12)));
check('REAL-COIN: …but the real coin does not split it evenly', s.pairGap > 0.1 && close(s.pairGap, Math.max(...W.z0.map((a, x) => Math.abs(a - W.z1[(121 - x) % 121]))), 1e-12));
check('REAL-COIN: the card shows the pairs scene, one bar per x with |ψ(0, x)|² below and |ψ(1, −x)|² above', s.scene === 'pairs' && (await page.textContent('#hudBig')).startsWith('镜像对')
  && s.pairs.length === 121 && s.pairs.every(([x, a, b]) => { const i = ((x % 121) + 121) % 121; return close(a, W.z0[i], 1e-12) && close(b, W.z1[(121 - i) % 121], 1e-12); }));
check('REAL-COIN: every pair reaches the dashed total of c* exactly', s.pairs.every(([x, a, b, t]) => { const i = ((x % 121) + 121) % 121; return close(a + b, t, 1e-12) && close(t, star.z0[i] + star.z1[(121 - i) % 121], 1e-12); }));
check('REAL-COIN: the largest gap within a pair is 0.145 (as the card says)', close(s.pairGap, 0.1445, 0.0005), String(s.pairGap));
await setRange('phi', 90); s = await state();
check('REAL-COIN → c*: on the pairs scene every pair is split evenly and the totals stay', s.scene === 'pairs' && s.pairGap < 1e-12 && s.pairs.every(([, a, b, t]) => close(a, b, 1e-12) && close(a + b, t, 1e-12)));

await pick('ring'); s = await seek(20);
W = walk(9, 20, STAR);
check('RING: p = 9, n = 20 matches the matrix power on ZMod 9', s.p === 9 && s.n === 20 && gap(s.q, W.q) < 1e-12 && gap(s.k, classical(9, 20)) < 1e-15);
check('RING: still a mirror image, P(x) = P(−x), no lopsidedness', s.imbalance < 1e-12 && W.q.every((v, x) => close(v, W.q[(9 - x) % 9], 1e-12)));

// RING in the width scene: before the wrap (2n < p) the widths are those of the line; after it both stay below p/2
const tags = () => page.$$eval('.stage .tag', (ts) => ts.filter((t) => !t.hidden).map((t) => t.textContent.trim()));
await page.click('#sceneChips [data-scene="width"]'); s = await seek(4);
const line4 = width(walk(121, 4, STAR).q, 121).sigma;
check('RING, width scene, n = 4 (2n < p, not yet wrapped): the quantum σ is the line walk\'s and the classical σ is √4 = 2', s.scene === 'width' && s.p === 9 && s.n === 4
  && close(s.sigmaQ, width(walk(9, 4, STAR).q, 9).sigma, 1e-9) && close(s.sigmaQ, line4, 1e-9) && close(s.sigmaC, 2, 1e-12), `${s.sigmaQ} ${line4}`);
s = await seek(60);
const ringQ = width(walk(9, 60, STAR).q, 9).sigma, ringC = width(classical(9, 60), 9).sigma;
check('RING, width scene, n = 60 (wrapped): quantum σ = 2.2649 and classical σ = 2.5828 (matrix power; binomial folded mod 9)', s.n === 60
  && close(s.sigmaQ, ringQ, 1e-9) && close(ringQ, 2.2648592075, 1e-9) && close(s.sigmaC, ringC, 1e-9) && close(ringC, 2.5828186904, 1e-9), `${s.sigmaQ} ${s.sigmaC}`);
check('RING: both widths stay at most 4 = ⌊9/2⌋ at every step: after the wrap neither √n (√60 ≈ 7.75) nor 0.54·n applies', s.widths.length === 61 && s.widths.every(([q, c]) => q <= 4 + 1e-12 && c <= 4 + 1e-12) && Math.sqrt(60) > 4);
const tg = await tags();
check('RING, width scene: the curves are labelled “量子宽度” and “经典宽度”, with no straight-line or √n law on the stage', tg.includes('量子宽度') && tg.includes('经典宽度') && !tg.some((t) => /直线|√n/.test(t)), JSON.stringify(tg));
// the coefficient 0.54 belongs to the symmetric coin on a line: the same scene on p = 121 at n = 60
await setRange('pp', 121); s = await state();
const lim = Math.sqrt(1 - Math.SQRT1_2);
check('line p = 121, n = 60, coin c*: σ ÷ n = 0.541, next to the large-n limit √(1 − 1/√2) (matrix power)', s.scene === 'width' && s.p === 121 && s.n === 60
  && close(s.sigmaQ, width(walk(121, 60, STAR).q, 121).sigma, 1e-9) && close(s.sigmaQ / 60, lim, 0.003), `${s.sigmaQ / 60}`);
await setRange('phi', 0); s = await state();
const realW = width(walk(121, 60, REAL).q, 121);
check('line p = 121, n = 60, coin (1, 1)/√2: the walk leans left and its width about the mean is narrower, σ ÷ n < 0.52 (matrix power)', s.phi === 0
  && close(s.sigmaQ, realW.sigma, 1e-9) && realW.mean < 0 && s.sigmaQ / 60 < 0.52 && s.sigmaQ / 60 < lim - 0.03, `${s.sigmaQ / 60}`);
await pick('ring'); s = await seek(20);

// the mechanism of the proof sketch, test-side, for many cycles and steps
let balOK = true, sumOK = true;
for (const p of [3, 4, 5, 8, 11, 16]) for (const n of [0, 1, 2, 5, 9, 14]) {
  const a = walk(p, n, STAR), b = walk(p, n, [1, 0, 0, 0]);
  for (let x = 0; x < p; x++) {
    const j = (p - x) % p;
    if (!close(a.z0[x], a.z1[j], 1e-12)) balOK = false;
    if (!close(a.z0[x] + a.z1[j], b.z0[x] + b.z1[j], 1e-12)) sumOK = false;
  }
}
check('test-side: with c* every mirror pair (0, x), (1, −x) is split evenly (p = 3 … 16, n ≤ 14)', balOK);
check('test-side: the total of a mirror pair is the same for c* and for |0⟩', sumOK);

// controls
await setRange('wt', 1); s = await state();
W = walk(9, 20, [1, 0, 0, 0]);
check('the w slider sets the coin (√w, …) and leaves the card', s.preset === null && close(s.coin[0], 1) && close(s.coin[2], 0, 1e-12) && gap(s.q, W.q) < 1e-12);
await setRange('wt', 0.5); await setRange('phi', -90); s = await state();
W = walk(9, 20, [R2, 0, 0, -R2]);
check('the φ slider sets the relative phase: the conjugate coin (1, −i)/√2 is symmetric too', gap(s.q, W.q) < 1e-12 && s.pairGap < 1e-12 && s.imbalance < 1e-12);
await setRange('pp', 31); await setRange('phi', 45); s = await state();
const c45 = [R2, 0, R2 * Math.cos(Math.PI / 4), R2 * Math.sin(Math.PI / 4)];
W = walk(31, 20, c45);
check('the p slider changes the cycle to ZMod 31 (with φ = 45°)', s.p === 31 && s.xs.length === 31 && gap(s.q, W.q) < 1e-12 && s.imbalance > 0.01);
check('the strip records the lopsidedness of every step', close(s.imbalances[20], s.imbalance, 1e-15) && close(s.imbalances[7], (() => { const w = walk(31, 7, c45); return w.q.reduce((a, v, x) => a + Math.abs(v - w.q[(31 - x) % 31]), 0) / 2; })(), 1e-12));
await page.click('#sceneChips [data-scene="width"]'); s = await state();
check('the scene chips switch to the width scene', s.scene === 'width' && (await page.textContent('#hudBig')).startsWith('宽度'));
await page.click('#sceneChips [data-scene="pairs"]'); s = await state();
check('the scene chips switch to the mirror pairs', s.scene === 'pairs' && (await page.textContent('#hudBig')).startsWith('镜像对'));
await page.click('#sceneChips [data-scene="dist"]'); s = await state();
check('…and back to the spread', s.scene === 'dist' && (await page.textContent('#hudBig')).startsWith('分布'));

// playback, rail and keyboard
await pick('fifty'); await seek(0);
await page.click('[data-preset="ring"]');
check('clicking a card plays it', await until(page, () => { const d = window.WALK_DEBUG.state; return d.playing && d.t > 0; }));
check('the card stops by itself at its step (n = 20)', await until(page, () => { const d = window.WALK_DEBUG.state; return !d.playing && d.n === 20; }));
await page.click('#rew'); s = await state(); check('⏮ returns to the origin (n = 0, all probability at x = 0)', s.n === 0 && close(s.q[0], 1, 1e-12) && close(s.k[0], 1));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ takes one step at a time', (await state()).n === 2);
await page.keyboard.press('ArrowLeft'); check('← steps back', (await state()).n === 1);
await page.keyboard.press('End'); check('End goes to n = 60', (await state()).n === 60);
await page.keyboard.press('Home'); check('Home returns to n = 0', (await state()).n === 0);
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.WALK_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.WALK_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 23.6); s = await state();
check('scrubbing the rail shows the whole step reached (n = 23)', s.n === 23 && gap(s.q, walk(9, 23, STAR).q) < 1e-12);

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Spread'));
await page.click('#sceneChips [data-scene="width"]'); await settle(page);
const tgEn = await tags();
check('English: the width curves are labelled “quantum width” and “classical width”, with no straight-line or √n law', tgEn.includes('quantum width') && tgEn.includes('classical width') && !tgEn.some((t) => /straight line|√n/.test(t)), JSON.stringify(tgEn));
const drawerZh = await page.textContent('#drawer .sheet > div.zh'), drawerEn = await page.textContent('#drawer .sheet > div.en');
check('the drawer keeps √n to the line before the wrap, the linear width to the line at large n, 0.54 to the symmetric coin, and bounds the widths after the wrap (both languages)',
  drawerZh.includes('2n < p') && drawerZh.includes('n 很大时近似线性增长') && drawerZh.includes('只属于对称硬币') && drawerZh.includes('文献结果，未在本书形式化') && drawerZh.includes('不是指数的')
  && drawerZh.includes('2n ≥ p') && drawerZh.includes('受圈长限制') && drawerZh.includes('线上的增长律不再适用')
  && drawerEn.includes('2n < p') && drawerEn.includes('roughly linearly for large n') && drawerEn.includes('belongs to the symmetric coin only') && drawerEn.includes('not formalized in this book') && drawerEn.includes('not exponential')
  && drawerEn.includes('2n ≥ p') && drawerEn.includes('bounded by the size of the cycle') && drawerEn.includes('growth laws of the line no longer apply'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
