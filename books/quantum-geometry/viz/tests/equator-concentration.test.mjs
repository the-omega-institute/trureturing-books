#!/usr/bin/env node
// Browser regression suite for EQUATOR//CROWD (books/quantum-geometry/viz/equator-concentration/).
//   node books/quantum-geometry/viz/tests/equator-concentration.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page computes the shares with the incomplete beta function (Lanczos log-gamma, continued fraction) and draws
// its points as quantiles of the exact distribution. The suite works otherwise: a Stirling log-gamma, Simpson
// integration of the density (1 − x²)^{(d−3)/2}, a Laplace-type asymptotic for the tail at d = 2²⁰, Monte Carlo with
// normalized Gaussian vectors in ℝ^d, and a Kolmogorov–Smirnov test of the page's points. It reads window.EQUATOR_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'equator-concentration';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model ---------- */
/** ln Γ(x) by the Stirling series after shifting x above 10. */
function lnGamma(x) {
  let s = 0; while (x < 10) { s -= Math.log(x); x += 1; }
  const z = 1 / (x * x);
  return s + (x - 0.5) * Math.log(x) - x + 0.5 * Math.log(2 * Math.PI) + (1 / x) * (1 / 12 - z * (1 / 360 - z * (1 / 1260 - z / 1680)));
}
const lnNorm = (d) => lnGamma(d / 2) - 0.5 * Math.log(Math.PI) - lnGamma((d - 1) / 2);
const dens = (d, x) => (d === 3 ? 0.5 : Math.exp(lnNorm(d) + (d - 3) / 2 * Math.log(1 - x * x)));
/** Pr(|x₁| ≥ e) = 2 ∫_e^1 p by Simpson's rule in φ = arcsin x, where the integrand C cos^{d−2} φ is smooth. */
function tailSimpson(d, e, N = 20000) {
  const a = Math.asin(e), h = (Math.PI / 2 - a) / N, C = d === 3 ? 0.5 : Math.exp(lnNorm(d)); let s = 0;
  for (let i = 0; i <= N; i++) s += (i === 0 || i === N ? 1 : i % 2 ? 4 : 2) * C * Math.pow(Math.max(0, Math.cos(a + i * h)), d - 2);
  return 2 * s * h / 3;
}
/** log₁₀ of the tail for large d: ∫_e^1 (1 − x²)^m dx ≈ (1 − e²)^{m+1} / (2(m + 1)e). */
const log10TailAsym = (d, e) => { const m = (d - 3) / 2; return (Math.log(2) + lnNorm(d) + (m + 1) * Math.log(1 - e * e) - Math.log(2 * (m + 1) * e)) / Math.LN10; };
/** The CDF of x₁ on a grid (cumulative Simpson pairs), for the Kolmogorov–Smirnov test. */
function cdfOf(d, N = 200000) {
  const xs = new Float64Array(N + 1), F = new Float64Array(N + 1), h = 2 / N;
  for (let i = 0; i <= N; i++) xs[i] = -1 + i * h;
  const p = (x) => dens(d, Math.max(-1 + 1e-15, Math.min(1 - 1e-15, x)));
  for (let i = 1; i <= N; i++) F[i] = F[i - 1] + h / 6 * (p(xs[i - 1]) + 4 * p((xs[i - 1] + xs[i]) / 2) + p(xs[i]));
  return (x) => { const k = Math.min(N - 1, Math.max(0, Math.floor((x + 1) / h))); return F[k] + (F[k + 1] - F[k]) * ((x - xs[k]) / h); };
}
function ks(samples, F) { const s = samples.slice().sort((a, b) => a - b), n = s.length; let D = 0; s.forEach((x, i) => { const f = F(x); D = Math.max(D, Math.abs(f - i / n), Math.abs(f - (i + 1) / n)); }); return D; }
/** Monte Carlo: normalized Gaussian vectors in ℝ^d (Box–Muller, seeded). */
function monteCarlo(d, e, M) {
  let a = 12345; const r = () => { a = (Math.imul(a, 1664525) + 1013904223) >>> 0; return (a + 0.5) / 4294967296; };
  const g = () => Math.sqrt(-2 * Math.log(r())) * Math.cos(2 * Math.PI * r());
  let out = 0, sq = 0;
  for (let k = 0; k < M; k++) { let n2 = 0, x1 = 0; for (let j = 0; j < d; j++) { const v = g(); if (j === 0) x1 = v; n2 += v * v; } const x = x1 / Math.sqrt(n2); sq += x * x; if (Math.abs(x) >= e) out++; }
  return { out: out / M, meanSq: sq / M };
}
const KS1 = 1.63 / Math.sqrt(1500);   // 1% critical value

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.EQUATOR_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const plays = () => until(page, () => { const s = window.EQUATOR_DEBUG.state; return s.playing && s.t > 0; });
const stops = () => until(page, () => !window.EQUATOR_DEBUG.state.playing);
const seek = async (t) => { await page.evaluate((x) => window.EQUATOR_DEBUG.seek(x), t); await settle(page); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const smp = () => page.evaluate(() => window.EQUATOR_DEBUG.samples());

// the page opens on the 1/√d card at its telling frame, d = 2¹⁰
let s = await state();
check('opens on 1/√d at d = 1024, ε = 0.1, without playing', s.preset === 'width' && s.d === 1024 && close(s.eps, 0.1, 1e-12) && !s.playing);
check('d = 1024: the magnifier is shown and enlarges √d = 32 times', s.loupe && close(s.loupe.mag, 32, 1e-12));

// d = 16 (four qubits) on the rail
await seek(3); s = await state();
check('the rail at n = 4 gives d = 16 and leaves no magnifier (the bump is wide enough to see)', s.d === 16 && s.loupe === null);
const t16 = tailSimpson(16, 0.1);
check('d = 16: the outside share 0.7026 agrees with Simpson integration of the density', close(s.out, t16, 1e-9) && close(t16, 0.70256, 5e-5), `${s.out} ${t16}`);
const mc = monteCarlo(16, 0.1, 6000);
check('d = 16: Gaussian-vector Monte Carlo (6000 points) gives the same share and E[x₁²] = 1/16', Math.abs(mc.out - s.out) < 4 * Math.sqrt(0.21 / 6000) && Math.abs(mc.meanSq - 1 / 16) < 0.006, `${mc.out} ${mc.meanSq}`);
let x = await smp(), F16 = cdfOf(16);
check('d = 16: the page\'s 1500 points pass a Kolmogorov–Smirnov test against the integrated density', ks(x, F16) < KS1, String(ks(x, F16)));
const varSq = (d) => 3 / (d * (d + 2)) - 1 / (d * d);
check('d = 16: the sample mean of x₁² is 1/d within 4 standard errors; the outside count matches the points', Math.abs(s.meanSq - 1 / 16) < 4 * Math.sqrt(varSq(16) / 1500) && s.outN === x.filter((v) => Math.abs(v) >= 0.1).length);
check('d = 16: the drawn density at 0 is Γ(8)/(√π Γ(7.5))', close(await page.evaluate(() => window.EQUATOR_DEBUG.density(0)), dens(16, 0), 1e-10));
check('the HUD prints d = 2⁴ = 16 and the key readout the outside share', (await page.textContent('#hudBig')).includes('16') && (await page.textContent('#ro .key')).includes('0.7026'));
let worstZ = 0; for (let n = 1; n <= 20; n++) { await seek(n - 1); const st = await state(); if ((st.loupe !== null) !== (Math.pow(2, -n / 2) < 0.05)) worstZ = Infinity; }
check('the magnifier appears exactly when 1/√d < 0.05 (d ≥ 2⁹), checked for n = 1 … 20', worstZ === 0);

// d = 3: even heights
await pick('three');
check('d = 3 plays by itself', await plays());
check('d = 3 stops at d = 3 by itself', await stops());
s = await state();
check('d = 3: the inside share is exactly ε = 0.1 and the density is the constant 1/2', s.d === 3 && close(s.inside, 0.1, 1e-9) && close(tailSimpson(3, 0.1), 0.9, 1e-9) && close(await page.evaluate(() => window.EQUATOR_DEBUG.density(0.7)), 0.5, 1e-9));
x = await smp();
const Dunif = ks(x, (v) => (v + 1) / 2);
check('d = 3: the points\' heights pass a Kolmogorov–Smirnov test for the uniform distribution on [−1, 1]', Dunif < KS1, String(Dunif));
// the measure of the belt is exactly 10%; the fixed draw is a sample of it, counted here from the raw heights
const cyan3 = x.filter((v) => Math.abs(v) < 0.1).length;
check('d = 3: the fixed draw (seed 1) puts 142 of the 1500 points (9.47%) in the belt, not 150: a binomial sample of the exact 10%, and the page counts the rest as outside', s.seed === 1 && cyan3 === 142 && s.outN === 1500 - cyan3
  && Math.abs(cyan3 / 1500 - 0.1) < 4 * Math.sqrt(0.1 * 0.9 / 1500), `${cyan3} in the belt`);
const note3 = await page.textContent('#presetNote');
check('d = 3: the card note gives 10% as the share of the sphere and says the count of dots varies with the draw', note3.includes('占球面的 10%') && note3.includes('随抽样而变') && !note3.includes('10% 的点'), note3);

// the width card: up to d = 1024
await pick('width');
check('1/√d plays by itself', await plays());
await seek(9); s = await state();   // a busy runner may deliver few frames: jump to the end of the sweep
const t1024 = tailSimpson(1024, 0.1);
check('d = 1024: width 1/32, outside share 0.13% (Simpson)', s.d === 1024 && close(s.width, 1 / 32, 1e-12) && close(s.out, t1024, 1e-9) && close(t1024, 0.0013474, 5e-7), `${s.out} ${t1024}`);
x = await smp();
check('d = 1024: the points pass the Kolmogorov–Smirnov test and E[x₁²] ≈ 1/1024', ks(x, cdfOf(1024, 400000)) < KS1 && Math.abs(s.meanSq - 1 / 1024) < 4 * Math.sqrt(varSq(1024) / 1500), String(ks(x, cdfOf(1024, 400000))));
let worstW = 0; for (let n = 1; n <= 20; n++) { await seek(n - 1); const st = await state(); const xs = n <= 10 ? await smp() : null; worstW = Math.max(worstW, Math.abs(st.width - Math.pow(2, -n / 2))); if (xs && Math.abs(st.meanSq * Math.pow(2, n) - 1) > 4 * Math.sqrt(varSq(st.d) / 1500) * Math.pow(2, n)) worstW = Infinity; }
check('the rail: for every n = 1 … 20, d = 2ⁿ and the width is 2^(−n/2); the sample E[x₁²] matches 1/d for n ≤ 10', worstW < 1e-12, String(worstW));

// MARKOV
await pick('bound');
check('MARKOV plays by itself', await plays());
await seek(6); s = await state();
const t128 = tailSimpson(128, 0.2);
check('MARKOV: d = 128, ε = 0.2: outside 0.0231 (Simpson) ≤ bound 1/(dε²) = 0.1953', s.d === 128 && close(s.eps, 0.2, 1e-12) && close(s.out, t128, 1e-9) && close(t128, 0.023059, 5e-6) && close(s.bound, 0.1953125, 1e-12) && s.bound >= s.out);
let worst = Infinity;
for (const e of [0.05, 0.1, 0.3]) { await setRange('eps', e); for (const n of [2, 5, 8, 12]) { await seek(n - 1); const st = await state(); worst = Math.min(worst, st.bound - st.out); if (n <= 8 && !close(st.out, tailSimpson(st.d, e), 1e-8)) worst = -1; } }
check('the bound lies above the actual share at 12 settings of d and ε, and the share agrees with Simpson where it applies', worst >= 0, String(worst));
check('the ε slider leaves the card', (await state()).preset === null);

// TWENTY QUBITS
await pick('twenty');
check('20 QUBITS plays by itself', await plays());
await seek(19); s = await state();
check('20 QUBITS: d = 2²⁰ = 1,048,576 and the Markov bound 100/2²⁰ ≈ 9.54 × 10⁻⁵ (Chapter 12)', s.d === 1048576 && close(s.bound, 100 / 1048576, 1e-15) && close(s.bound, 9.5367e-5, 1e-9));
const la = log10TailAsym(1048576, 0.1);
check('20 QUBITS: log₁₀ of the exact share is −2290.52, as the Laplace asymptotic gives', close(s.log10Out, la, 1e-3) && close(la, -2290.52, 0.01), `${s.log10Out} ${la}`);
check('20 QUBITS: every point is in the belt', s.outN === 0 && close(s.inside, 1, 1e-12));
check('20 QUBITS: the key readout prints 3.0 × 10⁻²²⁹¹', (await page.textContent('#ro .key')).includes('3.0 × 10⁻²²⁹¹'));
// the magnifier: the density of z = x₁√d, against Stirling-normalized (1 − z²/d)^{(d−3)/2}/√d and the normal limit
const lz = await page.evaluate(() => [0, 1, 2, 3.5].map((z) => window.EQUATOR_DEBUG.loupeDensity(z)));
const ind = [0, 1, 2, 3.5].map((z) => Math.exp(lnNorm(1048576) + (1048576 - 3) / 2 * Math.log1p(-z * z / 1048576)) / 1024);
const gauss = [0, 1, 2, 3.5].map((z) => Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI));
check('20 QUBITS: the magnifier enlarges 1024 times and its density of x₁√d matches the independent formula and the normal limit', s.loupe && close(s.loupe.mag, 1024, 1e-9) && lz.every((v, i) => close(v, ind[i], 1e-8) && close(v, gauss[i], 2e-5)), `${lz} ${ind}`);
check('20 QUBITS: the magnifier names the belt edges ±ε√d = ±102 outside its window', (await page.textContent('#stage')).includes('±102'));

// controls and keyboard
const before = (await smp())[0];
await page.click('#redraw'); s = await state();
check('Redraw draws new points', s.seed === 2 && (await smp())[0] !== before);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('r'); check('R redraws as well', (await state()).seed === 3);
await page.keyboard.press('Home'); check('Home goes to d = 2', (await state()).d === 2);
await page.keyboard.press('ArrowRight'); check('→ adds one qubit (d = 4)', (await state()).d === 4);
await page.keyboard.press('End'); check('End goes to d = 2²⁰', (await state()).d === 1048576);
await page.click('#rew'); check('⏮ goes back to d = 2', (await state()).d === 2);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.EQUATOR_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await setRange('now', 5); s = await state();
check('the rail sets d = 2⁶ = 64', s.d === 64 && close(s.out, tailSimpson(64, s.eps), 1e-8));

// English
await page.click('[data-lang-set="en"]'); await pick('three'); await seek(Math.log2(3) - 1);
check('English: the HUD names the ordinary sphere', (await page.textContent('#hudSub')).includes('the ordinary sphere'));
const note3en = await page.textContent('#presetNote');
check('English: the d = 3 note gives 10% of the sphere, not 10% of the points', note3en.includes('10% of the sphere') && note3en.includes('varying with the draw') && !note3en.includes('10% of the points'), note3en);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
