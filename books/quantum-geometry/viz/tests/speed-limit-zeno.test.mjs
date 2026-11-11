// Browser regression suite for SPEED//ZENO (books/quantum-geometry/viz/speed-limit-zeno/).
//   node books/quantum-geometry/viz/tests/speed-limit-zeno.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page computes the overlap as a sum of phasors, the Zeno survival from cos²(π/2N) and the first-return ledger by
// iterating the monitored protocol. The suite rebuilds everything another way: state vectors evolved level by level
// and their complex inner products, the Hamiltonian's moments from a diagonal matrix, the strobe as repeated 2 × 2
// unitary steps followed by a projection, and the ledger from the closed forms of Chapter 7. It reads the page
// through window.ZENO_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'speed-limit-zeno';
const T = await session();
const { check } = T;
const PI = Math.PI, DEG = PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model ---------- */
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const conj = (a) => [a[0], -a[1]];
const cabs2 = (a) => a[0] * a[0] + a[1] * a[1];
/** ψ(t) as a list of complex amplitudes √wₙ e^{−iEₙt}, Eₙ = n. */
const psi = (w, t) => w.map((wn, n) => [Math.sqrt(wn) * Math.cos(n * t), -Math.sqrt(wn) * Math.sin(n * t)]);
const inner = (x, y) => x.reduce((a, xi, i) => { const p = cmul(conj(xi), y[i]); return [a[0] + p[0], a[1] + p[1]]; }, [0, 0]);
const fsAngle = (w, t) => Math.acos(Math.min(1, Math.sqrt(cabs2(inner(psi(w, 0), psi(w, t))))));
function moments(w) {
  const v = psi(w, 0), H = w.map((_, n) => n);        // H = diag(0, 1, 2, …)
  const Hv = v.map((z, n) => [z[0] * H[n], z[1] * H[n]]), H2v = Hv.map((z, n) => [z[0] * H[n], z[1] * H[n]]);
  const m1 = inner(v, Hv)[0], m2 = inner(v, H2v)[0];
  return { meanH: m1, dH: Math.sqrt(m2 - m1 * m1) };
}
/** One strobe interval: U = exp(−i(δ/2)σx) on (a, b). */
const stepU = (d, [a, b]) => { const c = Math.cos(d / 2), s = Math.sin(d / 2); return [[c * a[0] + s * b[1], c * a[1] - s * b[0]], [s * a[1] + c * b[0], -s * a[0] + c * b[1]]]; };
function strobeSurvival(N) {
  let v = [[1, 0], [0, 0]];
  for (let k = 0; k < N; k++) { v = stepU(PI / N, v); v = [v[0], [0, 0]]; }   // evolve, then keep the "yes" component
  return cabs2(v[0]);
}
const closedP = (d, n) => { const c2 = Math.cos(d / 2) ** 2, s2 = 1 - c2; return n === 1 ? c2 : s2 * s2 * c2 ** (n - 2); };
const closedS = (d, n) => { const c2 = Math.cos(d / 2) ** 2, s2 = 1 - c2; return n === 0 ? 1 : s2 * c2 ** (n - 1); };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.ZENO_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
// a card plays by itself once clicked; then the suite jumps to the end of the rail (a busy runner may deliver few frames)
const finished = async () => { const ok = await until(page, () => { const s = window.ZENO_DEBUG.state; return s.playing && s.t > 0; });
  await page.evaluate(() => window.ZENO_DEBUG.seek(window.ZENO_DEBUG.state.max)); await settle(page); return ok; };
const seek = async (t) => { await page.evaluate((x) => window.ZENO_DEBUG.seek(x), t); await settle(page); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// opening view: THREE-EVEN at the moment it meets the wall
let s = await state();
check('opens on THREE-EVEN at t = 2π/3', s.preset === 'three' && s.scene === 'speed' && s.levels === 3 && close(s.t, 2 * PI / 3, 1e-9));
const w3 = [1 / 3, 1 / 3, 1 / 3], m3 = moments(w3);
check('THREE-EVEN: ⟨H⟩ = E and ΔH = √(2/3) E from the diagonal Hamiltonian', close(s.speed.meanH, m3.meanH, 1e-12) && close(s.speed.dH, m3.dH, 1e-12) && close(m3.dH, Math.sqrt(2 / 3), 1e-12));
check('THREE-EVEN: the page\'s first orthogonal time is 2π/3 ≈ 2.0944, and the state vectors are orthogonal there', close(s.speed.tauPerp, 2 * PI / 3, 1e-6) && cabs2(inner(psi(w3, 0), psi(w3, 2 * PI / 3))) < 1e-24);
let firstZero = null; for (let i = 1; i <= 200000 && firstZero == null; i++) { const t = PI * i / 200000; if (Math.sqrt(cabs2(inner(psi(w3, 0), psi(w3, t)))) < 1e-4) firstZero = t; }
check('THREE-EVEN: no earlier zero of the overlap (grid of 200 000 times)', firstZero != null && Math.abs(firstZero - 2 * PI / 3) < 1e-3, String(firstZero));
check('THREE-EVEN: MT 1.9238 and ML 1.5708 lie before τ⊥ (table of §7.2)', close(s.speed.tauMT, 1.9238, 5e-5) && close(s.speed.tauML, 1.5708, 5e-5) && s.speed.tauMT < s.speed.tauPerp && s.speed.tauML < s.speed.tauMT);
check('THREE-EVEN: the arc length by the wall is 1.7101 rad, 8.9% longer than π/2', close(s.speed.arc, 1.7101, 5e-5) && close(s.speed.arc / (PI / 2) - 1, 0.089, 5e-4));
for (const [t, ov, th, arc] of [[0.5, 0.9184, 0.4068, 0.4082], [1, 0.6935, 0.8044, 0.8165], [1.5, 0.3805, 1.1805, 1.2247]]) {
  await seek(t); s = await state();
  check(`THREE-EVEN at t = ${t}: overlap ${ov}, angle ${th}, arc ${arc} (the table of §7.2)`, close(Math.hypot(...s.speed.overlap), ov, 5e-5) && close(s.speed.theta, th, 5e-5) && close(fsAngle(w3, t), th, 5e-5) && close(s.speed.arc, arc, 5e-5));
}
let worstBelow = Infinity;
for (let i = 0; i <= 400; i++) { const t = PI * i / 400; worstBelow = Math.min(worstBelow, m3.dH * t - fsAngle(w3, t)); }
check('THREE-EVEN: the angle never rises above the speed line ΔH·t (400 times)', worstBelow > -1e-12, String(worstBelow));
check('the HUD names the case and the key readout shows τ⊥ ≥ MT', (await page.textContent('#hudBig')).includes('三能级') && (await page.textContent('#ro .key')).includes('2.0944'));

// TWO-EVEN: equality all the way to the wall at π
await pick('equal');
check('TWO-EVEN plays by itself (then: the end of the rail, t = π)', await finished());
s = await state();
const w2 = [0.5, 0.5], m2 = moments(w2);
check('TWO-EVEN: two levels, α = 45°, ΔH = ⟨H⟩ = E/2', s.levels === 2 && s.alpha === 45 && close(s.speed.dH, 0.5, 1e-12) && close(m2.dH, 0.5, 1e-12) && close(m2.meanH, 0.5, 1e-12));
check('TWO-EVEN: τ⊥ = MT = ML = π (both bounds attained)', close(s.speed.tauPerp, PI, 1e-6) && close(s.speed.tauMT, PI, 1e-12) && close(s.speed.tauML, PI, 1e-12));
let worstEq = 0; for (let i = 0; i <= 200; i++) { const t = PI * i / 200; worstEq = Math.max(worstEq, Math.abs(fsAngle(w2, t) - m2.dH * t)); }
check('TWO-EVEN: the angle equals the speed line at every time (200 times)', worstEq < 1e-7, String(worstEq));
check('TWO-EVEN: the theorem\'s choices hold with equality: each half is π/4 = energy·(τ⊥/2)/ħ', close(fsAngle(w2, PI / 2), PI / 4, 1e-12) && close(Math.acos(Math.sqrt(cabs2(inner(psi(w2, PI / 2), psi(w2, PI))))), PI / 4, 1e-7) && close(PI / (4 * m2.dH), PI / 2, 1e-12));

// UNEVEN: α = 30°, at most 60°
await pick('unequal');
check('UNEVEN plays by itself', await finished());
s = await state();
const wu = [Math.cos(30 * DEG) ** 2, Math.sin(30 * DEG) ** 2];
let maxA = 0, minO = 1; for (let i = 0; i <= 20000; i++) { const t = PI * i / 20000; maxA = Math.max(maxA, fsAngle(wu, t)); minO = Math.min(minO, Math.sqrt(cabs2(inner(psi(wu, 0), psi(wu, t))))); }
check('UNEVEN: α = 30° and no orthogonal time', s.alpha === 30 && s.speed.tauPerp === null);
check('UNEVEN: the smallest overlap is |cos 2α| = 0.5 and the largest angle 2α = 60°', close(s.speed.minOv, 0.5, 1e-6) && close(minO, 0.5, 1e-6) && close(s.speed.maxAngle, 60 * DEG, 1e-6) && close(maxA, 60 * DEG, 1e-6));
check('UNEVEN: the moments ΔH = sin α cos α, ⟨H⟩ = sin²α', close(s.speed.dH, moments(wu).dH, 1e-12) && close(s.speed.meanH, moments(wu).meanH, 1e-12));
await setRange('alpha', 40); s = await state();
check('the weight slider: α = 40° reaches at most 80° (§7.2) and leaves the card', s.alpha === 40 && close(s.speed.maxAngle, 80 * DEG, 1e-6) && s.preset === null);
await setRange('alpha', 45); s = await state();
check('α = 45° reaches the wall again', s.speed.tauPerp != null && close(s.speed.tauPerp, PI, 1e-6));
await page.click('#levelChips [data-levels="3"]'); s = await state();
check('the level chips switch to three even levels and disable the weight slider', s.levels === 3 && close(s.speed.tauPerp, 2 * PI / 3, 1e-6) && await page.evaluate(() => document.getElementById('alpha').disabled));

// STROBE ×4 and ×16 against repeated 2 × 2 unitary steps
await pick('strobe4');
check('STROBE ×4 plays by itself', await finished());
s = await state();
check('STROBE ×4: P₄ = 0.5308 from repeated unitary steps and projections', s.scene === 'zeno' && s.N === 4 && close(s.zeno.PN, strobeSurvival(4), 1e-12) && close(strobeSurvival(4), 0.5308, 5e-5));
check('STROBE ×4: single-look survival cos²(π/8) = 0.8536', close(s.zeno.p1, 0.8536, 5e-5) && close(s.zeno.p1, cabs2(stepU(PI / 4, [[1, 0], [0, 0]])[0]), 1e-12));
check('STROBE ×4: at 180° the arrow is back on |0⟩ after the last look', s.arrow && close(s.arrow[2], 1, 1e-12));
await seek(PI / 4 * 1.5); s = await state();
const half = stepU(PI / 8, [[1, 0], [0, 0]]);
check('STROBE ×4 mid-interval: survival-so-far = P(yes once) × |⟨0|U(π/8)|0⟩|²', close(s.zeno.S, Math.cos(PI / 8) ** 2 * cabs2(half[0]), 1e-12));
check('STROBE ×4 mid-interval: the Bloch arrow is turned 22.5° about X, towards −y', close(s.arrow[2], Math.cos(PI / 8), 1e-12) && close(s.arrow[1], -Math.sin(PI / 8), 1e-12) && close(s.arrow[0], 0, 1e-12));
await pick('strobe16');
check('STROBE ×16 plays by itself', await finished());
s = await state();
check('STROBE ×16: P₁₆ = 0.8569 from repeated steps', s.N === 16 && close(s.zeno.PN, strobeSurvival(16), 1e-12) && close(strobeSurvival(16), 0.8569, 5e-5));
for (const [n, v] of [[1, 0], [64, 0.9622]]) {
  await page.click(`#strobeChips [data-strobes="${n}"]`); s = await state();
  check(`strobe chip N = ${n}: P = ${v} (table of §7.3)`, s.N === n && close(s.zeno.PN, strobeSurvival(n), 1e-12) && close(s.zeno.PN, v, 5e-5) && s.preset === null);
}
const pts = [1, 2, 4, 8, 16, 32, 64].map(strobeSurvival);
check('the strobe survival grows with N (1, 2, 4 … 64)', pts.every((p, i) => i === 0 || p > pts[i - 1]));

// RETURN: the ledger against the closed forms
await pick('mean');
check('RETURN plays by itself', await finished());
s = await state();
const d45 = 45 * DEG;
let worstLedger = 0;
for (let n = 1; n <= 40; n++) worstLedger = Math.max(worstLedger, Math.abs(s.ret.p[n] - closedP(d45, n)), Math.abs(s.ret.s[n] - closedS(d45, n)));
check('RETURN: pₙ and sₙ agree with c², s⁴c^{2(n−1)}, s²c^{2(n−1)} for n ≤ 40', s.delta === 45 && worstLedger < 1e-14, String(worstLedger));
let worstCons = 0, cum = 0;
for (let n = 0; n < 40; n++) { cum += s.ret.p[n + 1]; worstCons = Math.max(worstCons, Math.abs(s.ret.p[n + 1] - (s.ret.s[n] - s.ret.s[n + 1])), Math.abs(cum + s.ret.s[n + 1] - 1)); }
check('RETURN: s₀ = 1, pₙ₊₁ = sₙ − sₙ₊₁ and Σp + s_N = 1 on every column', close(s.ret.s[0], 1) && worstCons < 1e-14, String(worstCons));
check('RETURN: δ = π/4 row of §7.3: p₁ 0.853553, p₂ 0.021447, p₃ 0.018306, s₃ 0.106694', close(s.ret.p[1], 0.853553, 5e-7) && close(s.ret.p[2], 0.021447, 5e-7) && close(s.ret.p[3], 0.018306, 5e-7) && close(s.ret.s[3], 0.106694, 5e-7));
let meanClosed = 0; for (let n = 1; n <= 20000; n++) meanClosed += n * closedP(d45, n);
check('RETURN: the mean return time is 2 (page: Σ sₙ and Σ n·pₙ; suite: Σ n·pₙ of the closed form)', close(s.ret.mean, 2, 1e-9) && close(s.ret.meanNp, 2, 1e-9) && close(meanClosed, 2, 1e-9) && close(s.ret.sumP, 1, 1e-12));
check('RETURN: the key readout prints 2.000000', (await page.textContent('#ro .key')).includes('2.000000'));
const curve = await page.evaluate(() => window.ZENO_DEBUG.meanCurve());
check('the small plot: the mean is 2 for every δ from 45° to 180°, and 1 + 1/s² matches', curve.length === 136 && curve.every(([d, m, after]) => close(m, 2, 1e-6) && close(after, 1 + 1 / Math.sin(d * DEG / 2) ** 2, 1e-9)));
for (const [d, row] of [[90, [0.5, 0.25, 0.125, 0.125]], [180, [0, 1, 0, 0]]]) {
  await setRange('delta', d); s = await state();
  check(`the step slider: δ = ${d}° gives p₁ p₂ p₃ s₃ = ${row.join(' ')} and mean 2`, s.delta === d && close(s.ret.p[1], row[0], 1e-12) && close(s.ret.p[2], row[1], 1e-12) && close(s.ret.p[3], row[2], 1e-12) && close(s.ret.s[3], row[3], 1e-12) && close(s.ret.mean, 2, 1e-9));
}
await seek(3); s = await state();
check('RETURN at step 3: the HUD prints returned + not yet = 1', s.ret.j === 3 && (await page.textContent('#hudSub')).replace(/\s+/g, '').includes('=1.0000'));
await seek(3.5); s = await state();
check('RETURN half-way through step 4: the arrow is turned δ/2 away from |1⟩', close(s.arrow[2], -Math.cos(s.delta * DEG / 2), 1e-12) && close(s.arrow[1], Math.sin(s.delta * DEG / 2), 1e-12));

// dragging the chart scrubs the rail; dragging the sphere turns the view
const cx = await page.evaluate(() => window.ZENO_DEBUG.chartX(20)), box = await page.evaluate(() => window.ZENO_DEBUG.chartBox());
await page.mouse.move(cx, box[1] + box[3] / 2); await page.mouse.down(); await page.mouse.up(); s = await state();
check('clicking the ledger at column 20 moves the rail there', Math.abs(s.t - 20) < 0.3, String(s.t));
const cam0 = await page.evaluate(() => window.ZENO_DEBUG.camera()), st = await page.locator('#stage').boundingBox();
await page.mouse.move(st.x + 60, st.y + st.height * 0.75); await page.mouse.down(); await page.mouse.move(st.x + 140, st.y + st.height * 0.7, { steps: 4 }); await page.mouse.up();
check('dragging next to the sphere turns the view', (await page.evaluate(() => window.ZENO_DEBUG.camera())).yaw !== cam0.yaw);

// scenes, rail and keyboard
await page.click('#sceneChips [data-scene="speed"]'); s = await state();
check('the scene chips switch scenes and the scene panels follow', s.scene === 'speed' && await page.evaluate(() => !document.querySelector('.deck [data-scenes="speed"]').hidden && document.querySelector('.deck [data-scenes="return"]').hidden));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); check('key 2 opens the Zeno scene', (await state()).scene === 'zeno');
await page.keyboard.press('3'); check('key 3 opens the return scene', (await state()).scene === 'return');
await page.keyboard.press('1'); s = await state(); check('key 1 opens the speed scene', s.scene === 'speed');
await page.keyboard.press('Home'); check('Home goes to t = 0', close((await state()).t, 0));
await page.keyboard.press('ArrowRight'); check('→ steps π/12', close((await state()).t, PI / 12, 1e-9));
await page.keyboard.press('End'); check('End goes to t = π', close((await state()).t, PI, 1e-9));
await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).t, PI - PI / 12, 1e-9));
await page.click('#rew'); check('⏮ goes back to 0', close((await state()).t, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.ZENO_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await setRange('now', 1); s = await state();
check('the rail sets t and the readouts follow', close(s.t, 1, 1e-9) && close(s.speed.theta, fsAngle([1 / 3, 1 / 3, 1 / 3], 1), 1e-9));

// English
await page.click('[data-lang-set="en"]'); await pick('strobe4'); await finished();
check('English: the HUD reads “Strobe N = 4”', (await page.textContent('#hudBig')).trim() === 'Strobe N = 4');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
