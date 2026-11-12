#!/usr/bin/env node
// Browser regression suite for PAIR//SHUTTER (books/quantum-geometry/viz/pairwise-shutter/):
//   node books/quantum-geometry/viz/tests/pairwise-shutter.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first. Then every control and every claim of the page, against computations written here: the
// weight from eigen-spinors of n̂·σ built as normalized columns of I + n̂·σ and from traces of Pauli sums (the page uses
// angle spinors and ½(I + v·σ) entries); the counts recounted from the page's uniform numbers; rotations checked by
// what a rotation keeps (length, the component along the axis, the angle between the pair); uniformity of random
// directions and of their weights by moments, a chi-square test and a Kolmogorov–Smirnov distance.
// The page is read through window.SHUTTER_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pairwise-shutter';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent model ---------- */
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.sqrt(dot(a, a));
const ang = (a, b) => Math.acos(Math.max(-1, Math.min(1, dot(a, b) / (len(a) * len(b)))));
const c = (re, im = 0) => [re, im];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const conj = (a) => [a[0], -a[1]];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const mplus = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(A[i][j], B[i][j])));
const mscale = (A, s) => A.map((row) => row.map((z) => [z[0] * s, z[1] * s]));
const tr = (A) => cadd(A[0][0], A[1][1]);
const SX = [[c(0), c(1)], [c(1), c(0)]], SY = [[c(0), c(0, -1)], [c(0, 1), c(0)]], SZ = [[c(1), c(0)], [c(0), c(-1)]], I2 = [[c(1), c(0)], [c(0), c(1)]];
const proj = (n) => mscale(mplus(I2, mplus(mplus(mscale(SX, n[0]), mscale(SY, n[1])), mscale(SZ, n[2]))), 0.5);
/** Tr(ρ_a P_b) from Pauli sums. */
const traceWeight = (a, b) => tr(mm(proj(a), proj(b)));
/** The +1 eigen-spinor of n̂·σ: the larger column of I + n̂·σ, normalized. */
function eigen(n) {
  const M = mplus(I2, mplus(mplus(mscale(SX, n[0]), mscale(SY, n[1])), mscale(SZ, n[2])));
  const col = (j) => [M[0][j], M[1][j]], nrm = (v) => Math.sqrt(v[0][0] ** 2 + v[0][1] ** 2 + v[1][0] ** 2 + v[1][1] ** 2);
  const v = nrm(col(0)) >= nrm(col(1)) ? col(0) : col(1), k = 1 / nrm(v);
  return v.map((z) => [z[0] * k, z[1] * k]);
}
/** |⟨φ_b|ψ_a⟩|² from eigen-spinors. */
function overlap(a, b) { const x = eigen(a), y = eigen(b), s = cadd(cmul(conj(y[0]), x[0]), cmul(conj(y[1]), x[1])); return s[0] ** 2 + s[1] ** 2; }
const recount = (u, w, N) => { let k = 0; for (let i = 0; i < N; i++) if (u[i] < w) k++; return k; };
const shotsAt = (t) => { let n = 0; while (Math.log(n + 2) <= t + 1e-12) n++; return n; };   // largest n with ln(1 + n) ≤ t
function ks(xs) {   // Kolmogorov–Smirnov distance to the uniform law on [0, 1]
  const s = xs.slice().sort((p, q) => p - q), n = s.length; let d = 0;
  s.forEach((x, i) => { d = Math.max(d, Math.abs((i + 1) / n - x), Math.abs(x - i / n)); });
  return d;
}

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.SHUTTER_DEBUG.state); };
const runOf = () => D(() => window.SHUTTER_DEBUG.run());
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
/** The card starts playing by itself (the clock moves); then the rest of the run is skipped by seeking to its end,
    so that the check does not depend on how many animation frames the browser delivers. */
const played = async () => {
  const ok = await until(page, () => { const s = window.SHUTTER_DEBUG.state; return s.preset !== null && s.t > 0; });
  await D(() => window.SHUTTER_DEBUG.seek(window.SHUTTER_DEBUG.state.tmax)); await settle(page);
  return ok;
};
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// opening view: the 60° card, its whole run done
let s = await state();
check('opens on the 60° card with the whole run done', s.preset === 'sixty' && s.N === 4000 && !s.playing && s.mode === 'fixed');
check('60°: A is 60° and B 120° from the north pole, in one meridian', close(ang(s.A, [0, 0, 1]), 60 * DEG, 1e-12) && close(ang(s.B, [0, 0, 1]), 120 * DEG, 1e-12) && close(s.A[1], 0, 1e-12) && close(s.B[1], 0, 1e-12));
check('60°: one angle between them, θ = 60°', close(s.theta, 60 * DEG, 1e-12) && close(ang(s.a, s.b), 60 * DEG, 1e-12));
check('60°: weight 3/4 by the eigen-spinor overlap and by Pauli traces', close(s.p, 0.75, 1e-12) && close(overlap(s.a, s.b), 0.75, 1e-12) && close(traceWeight(s.a, s.b)[0], 0.75, 1e-12) && close(traceWeight(s.a, s.b)[1], 0, 1e-12));
check('60°: the sphere and spinor readouts agree with the trace', close(s.pSphere, 0.75, 1e-12) && close(s.pSpinor, 0.75, 1e-12));
let r = await runOf();
check('60°: the page\'s pass count is the number of uniform numbers below 3/4', s.k === recount(r.u, 0.75, 4000) && r.pass.every((x, i) => x === (r.u[i] < 0.75 ? 1 : 0)));
check('60°: the uniform numbers look uniform (KS distance < 0.03 over 4000)', r.u.every((x) => x >= 0 && x < 1) && ks(r.u) < 0.03, `KS ${ks(r.u).toFixed(4)}`);
const sixtyK = s.k;
check('60°: after 4000 shots the share is within 4σ of 3/4', Math.abs(s.share - 0.75) < 4 * Math.sqrt(0.75 * 0.25 / 4000), `${s.share}`);
check('60°: “pass” and “fail” weights are non-negative and add to 1 (independent traces)', (() => { const pp = traceWeight(s.a, s.b)[0], pf = tr(mm(proj(s.a), mplus(I2, mscale(proj(s.b), -1))))[0]; return pp >= 0 && pf >= 0 && close(pp + pf, 1, 1e-12); })());
check('the key readout prints k/N → p', (await page.textContent('#roKey')).replace(/\s+/g, ' ').includes(`${s.share.toFixed(3)} → 0.750`));
check('the counts readout prints pass / fail', (await page.textContent('#roCount')).trim() === `${s.k} / ${4000 - s.k}`);

// the rail: N(t) = ⌊eᵗ − 1⌋, and the share at every N is recounted
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Home'); s = await state();
check('Home: no shots yet', s.N === 0 && s.k === 0 && s.share === null);
let railOk = true;
for (const t of [0.7, 1.2, 2.5, 4.1, 6.3, 8.0]) {
  await D((v) => window.SHUTTER_DEBUG.seek(v), t); s = await state();
  if (s.N !== shotsAt(t) || s.k !== recount(r.u, 0.75, s.N) || !close(s.share, s.k / s.N, 1e-15)) railOk = false;
}
check('rail: N = ⌊eᵗ − 1⌋ shots, and k is recounted at six rail positions', railOk);
await page.keyboard.press('End'); s = await state();
check('End: all 4000 shots', s.N === 4000);
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps the rail by 0.25', close(s.t, 0.25, 1e-9) && s.N === 0);
await setRange('now', 3); s = await state();
check('the rail slider sets the shot count', s.N === shotsAt(3) && s.N === 19);
await page.keyboard.press('Home'); await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.SHUTTER_DEBUG.state.N > 0));
await page.keyboard.press('Space');
check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ goes back to no shots', (await state()).N === 0);

// CLICKS: 24 shots, each one +1 or −1
await pick('clicks');
check('CLICKS starts playing by itself', await played());
s = await state(); r = await runOf();
check('CLICKS: a run of 24 shots at θ = 70°', s.nmax === 24 && s.N === 24 && close(s.theta, 70 * DEG, 1e-12));
check('CLICKS: weight (1 + cos 70°)/2 by spinors', close(s.p, overlap(s.a, s.b), 1e-12) && close(s.p, (1 + Math.cos(70 * DEG)) / 2, 1e-12));
check('CLICKS: every shot is either a pass or a fail, and the tags count both ends', r.pass.every((x) => x === 0 || x === 1) && s.k === recount(r.u, s.p, 24)
  && (await page.textContent('.stage .tags')).includes(`×${s.k}`) && (await page.textContent('.stage .tags')).includes(`×${24 - s.k}`));

// 90°: weight 1/2, the widest band
await pick('right'); check('90° plays', await played()); s = await state(); r = await runOf();
check('90°: weight 1/2 by spinors and traces', close(s.p, 0.5, 1e-12) && close(overlap(s.a, s.b), 0.5, 1e-12) && close(traceWeight(s.a, s.b)[0], 0.5, 1e-12));
check('90°: counts recounted, share within 4σ of 1/2', s.k === recount(r.u, 0.5, 4000) && Math.abs(s.share - 0.5) < 4 * Math.sqrt(0.25 / 4000));
let maxVar = 0; for (let d = 0; d <= 180; d += 5) { const p = (1 + Math.cos(d * DEG)) / 2; maxVar = Math.max(maxVar, p * (1 - p)); }
check('90°: p(1 − p) is largest at 90° (scan of 0°…180°)', close(maxVar, s.p * (1 - s.p), 1e-12));

// 0° and 180°: certain outcomes
await pick('same'); check('0° plays', await played()); s = await state();
check('0°: weight 1, every shot passes', close(s.p, 1, 1e-12) && close(overlap(s.a, s.b), 1, 1e-12) && s.k === s.N && s.N === 400);
await pick('opposite'); check('180° plays', await played()); s = await state();
check('180°: weight 0, no shot passes', close(s.p, 0, 1e-12) && close(overlap(s.a, s.b), 0, 1e-12) && s.k === 0 && s.N === 400);

// TURN: same pair, turning together, same counts
await pick('turn'); check('TURN plays', await played()); s = await state(); r = await runOf();
check('TURN: the turn is on and the pair has turned by a full turn at the end', s.turn && close(s.alpha, 2 * Math.PI, 1e-9));
let turnOk = true, moved = 0;
for (const n of [1, 10, 100, 700, 2500, 4000]) {
  const q = await D((k) => window.SHUTTER_DEBUG.pairAt(k), n);
  if (!close(len(q.a), 1, 1e-12) || !close(len(q.b), 1, 1e-12) || !close(ang(q.a, q.b), 60 * DEG, 1e-9) || !close(overlap(q.a, q.b), 0.75, 1e-12)) turnOk = false;
  moved = Math.max(moved, len(q.a.map((x, i) => x - s.A[i])));
}
check('TURN: at six shots the pair is still unit, 60° apart, weight 3/4 by spinors', turnOk);
check('TURN: the pair really moved (tip of A up to > 1 away from its start)', moved > 1, `${moved}`);
const axis = [Math.sin(55 * DEG) * Math.cos(110 * DEG), Math.sin(55 * DEG) * Math.sin(110 * DEG), Math.cos(55 * DEG)];
const q700 = await D(() => window.SHUTTER_DEBUG.pairAt(700));
check('TURN: both tips keep their component along the violet axis (a rotation about it)', close(dot(q700.a, axis), dot(s.A, axis), 1e-12) && close(dot(q700.b, axis), dot(s.B, axis), 1e-12));
check('TURN: every one of the 4000 per-shot weights is 3/4', r.w.every((w) => close(w, 0.75, 1e-12)));
check('TURN: the counts are exactly those of the 60° card without turning', s.k === sixtyK && s.k === recount(r.u, 0.75, 4000));

// the TURN still printed in chapter 2: the pair stops 306° of the way round, visibly away from its start
{
  const pg = await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=turn', await T.newPage());
  await settle(pg);
  const st = await pg.evaluate(() => ({ s: window.SHUTTER_DEBUG.state, run: window.SHUTTER_DEBUG.run(), sub: document.getElementById('hudSub').textContent, big: document.getElementById('hudBig').textContent }));
  await pg.close();
  const tStill = 0.85 * Math.log(1 + 4000), nStill = Math.floor(Math.expm1(tStill) + 1e-9), kStill = recount(st.run.u, 0.75, nStill);
  check('TURN still: stopped at 306° of the turn, not back at the start', close(st.s.t, tStill, 1e-9) && close(st.s.alpha, 1.7 * Math.PI, 1e-9) && len(st.s.a.map((x, i) => x - st.s.A[i])) > 0.5 && !st.s.playing);
  check('TURN still: the pair is still 60° apart with weight 3/4', close(ang(st.s.a, st.s.b), 60 * DEG, 1e-9) && close(overlap(st.s.a, st.s.b), 0.75, 1e-12) && st.big.includes('60°'), st.big);
  check('TURN still: the readout counts the shots done so far, recounted from the same random numbers', st.s.N === nStill && st.s.k === kStill && st.sub.includes(`${nStill} 次里过了 ${kStill} 次`) && st.sub.includes(`k/N = ${(kStill / nStill).toFixed(3)}`), st.sub);
}

// RANDOM: uniform directions, uniform weights
await pick('random'); check('RANDOM plays', await played()); s = await state(); r = await runOf();
const dirs = r.dirs, N = dirs.length;
check('RANDOM: 4000 unit directions', N === 4000 && dirs.every((d) => close(len(d), 1, 1e-12)));
const wInd = dirs.map((d) => overlap(s.A, d));
check('RANDOM: every weight equals the spinor overlap with A', r.w.every((w, i) => close(w, wInd[i], 1e-12)));
const mean = wInd.reduce((a, x) => a + x, 0) / N, varr = wInd.reduce((a, x) => a + (x - mean) ** 2, 0) / N;
check('RANDOM: mean weight ≈ 1/2, variance ≈ 1/12', Math.abs(mean - 0.5) < 4 * Math.sqrt(1 / 12 / N) && Math.abs(varr - 1 / 12) < 0.006, `${mean} ${varr}`);
const bins = new Array(10).fill(0); wInd.forEach((w) => { bins[Math.min(9, Math.floor(w * 10))]++; });
const chi2 = bins.reduce((a, o) => a + (o - N / 10) ** 2 / (N / 10), 0);
check('RANDOM: ten-bin chi-square below 27.9 (df 9, 0.1 %)', chi2 < 27.9, `${chi2.toFixed(2)}`);
check('RANDOM: KS distance of the weights to uniform < 0.03', ks(wInd) < 0.03, `${ks(wInd).toFixed(4)}`);
check('RANDOM: the page\'s histogram matches the recount', JSON.stringify(await D(() => window.SHUTTER_DEBUG.bins())) === JSON.stringify(bins));
const mvec = [0, 1, 2].map((i) => dirs.reduce((a, d) => a + d[i], 0) / N), m2 = [0, 1, 2].map((i) => dirs.reduce((a, d) => a + d[i] * d[i], 0) / N);
check('RANDOM: directions are isotropic (mean ≈ 0, each ⟨xᵢ²⟩ ≈ 1/3)', len(mvec) < 0.06 && m2.every((x) => Math.abs(x - 1 / 3) < 0.03), JSON.stringify([mvec, m2]));
const zs = dirs.map((d) => (1 + dot(d, s.A)) / 2);
check('RANDOM: heights along A are uniform too (hat box), KS < 0.03', ks(zs) < 0.03);
check('RANDOM: the current B is the latest direction', dirs[N - 1].every((x, i) => close(x, s.b[i], 1e-15)));

// controls: mode, turn, count chips, reseed
await page.click('#modeChips [data-mode="fixed"]'); s = await state();
check('the mode chip goes back to a fixed B and leaves the card', s.mode === 'fixed' && s.preset === null && s.N === 0);
await page.click('#countChips [data-count="400"]'); s = await state();
check('the count chip sets a run of 400', s.nmax === 400 && close(s.tmax, Math.log(401), 1e-12));
await page.click('#turnChips [data-turn="on"]'); s = await state();
check('the turn chip turns the pair on', s.turn);
await page.click('#turnChips [data-turn="off"]');
await page.keyboard.press('End');
s = await state(); const u0 = (await runOf()).u;
await page.click('#reseed'); const s2 = await state(), u1 = (await runOf()).u;
check('“New run” draws new random numbers and keeps the weight', s2.seed === s.seed + 1 && u1.some((x, i) => x !== u0[i]) && close(s2.p, s.p, 1e-15) && s2.k === recount(u1, s2.p, s2.N));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('r'); check('R draws another run', (await state()).seed === s2.seed + 1);

// dragging B and A, orbiting empty space
await pick('sixty'); await played();
await page.keyboard.press('End');
s = await state(); const uKeep = (await runOf()).u;
let tips = await D(() => window.SHUTTER_DEBUG.tips());
await page.mouse.move(tips.B[0], tips.B[1]); await page.mouse.down(); await page.mouse.move(tips.B[0] - 30, tips.B[1] - 50, { steps: 4 }); await page.mouse.up();
let sd = await state();
const uAfter = (await runOf()).u;
check('dragging the amber tip moves B, leaves the card and keeps the random numbers', sd.preset === null && len(sd.B.map((x, i) => x - s.B[i])) > 0.05 && uAfter.every((x, i) => x === uKeep[i]));
check('after the drag: weight by spinors, counts recounted', close(sd.p, overlap(sd.a, sd.b), 1e-12) && sd.k === recount(uAfter, sd.p, sd.N) && close(len(sd.B), 1, 1e-12));
tips = await D(() => window.SHUTTER_DEBUG.tips());
await page.mouse.move(tips.A[0], tips.A[1]); await page.mouse.down(); await page.mouse.move(tips.A[0] + 40, tips.A[1] + 20, { steps: 4 }); await page.mouse.up();
const sa = await state();
check('dragging the cyan tip moves A', len(sa.A.map((x, i) => x - sd.A[i])) > 0.05 && close(sa.p, overlap(sa.a, sa.b), 1e-12));
const cam0 = await D(() => window.SHUTTER_DEBUG.camera()), sb = await page.locator('#stage').boundingBox();
await page.mouse.move(sb.x + 30, sb.y + sb.height * 0.3); await page.mouse.down(); await page.mouse.move(sb.x + 90, sb.y + sb.height * 0.3 + 30, { steps: 4 }); await page.mouse.up();
const cam1 = await D(() => window.SHUTTER_DEBUG.camera());
check('dragging empty space turns the view and leaves the arrows alone', cam1.yaw !== cam0.yaw && (await state()).A.every((x, i) => x === sa.A[i]));

// English
await page.click('[data-lang-set="en"]'); await pick('clicks'); await played();
check('English: the HUD names the shutter counts', (await page.textContent('#hudBig')).startsWith('Shutter counts'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
