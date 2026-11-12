#!/usr/bin/env node
// Browser regression suite for ORTHO//CLOSURE (books/quantum-geometry/viz/self-sustaining-spinor-flow/).
//   node books/quantum-geometry/viz/tests/self-sustaining-spinor-flow.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// The page multiplies multivectors of Cl(3,0) blade by blade. The suite rebuilds every claim another way: even
// multivectors as 2 × 2 complex matrices (e₁, e₂, e₃ ↦ σx, σy, σz, so ψ ∈ ℝ·SU(2); the reversion ψ̃ ↦ ψ†), vectors
// read back as ½ Tr(M σₖ), scalars as ½ Re Tr(M); the closed forms of Example ex-ch39-even-clifford-spinor-bilinear-fierz
// (J(ϑ) = ρ(cos ϑ e₃ − sin ϑ e₂), ψ(2π) = −ψ₀, ψ(4π) = +ψ₀); and the half-angle flag cos(t/2) n + sin(t/2) r.
// It reads the page through window.CLOSURE_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'self-sustaining-spinor-flow';
const T = await session();
const { check } = T;
const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = (a) => Math.hypot(...a);
const unit = (a) => { const n = norm(a); return a.map((x) => x / n); };
const vclose = (a, b, eps = 1e-9) => a.length === b.length && a.every((x, i) => close(x, b[i], eps));

/* ---------- independent model: 2 × 2 complex matrices ---------- */
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cs = (a, k) => [a[0] * k, a[1] * k];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
const madd = (A, B) => A.map((r, i) => r.map((z, j) => ca(z, B[i][j])));
const msc = (A, k) => A.map((r) => r.map((z) => cs(z, k)));
const mcx = (A, z) => A.map((r) => r.map((w) => cm(w, z)));
const dag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
const SX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], SY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], SZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
const SIG = [SX, SY, SZ];
const vm = (v) => madd(madd(msc(SX, v[0]), msc(SY, v[1])), msc(SZ, v[2]));
const tr = (A) => ca(A[0][0], A[1][1]);
const vecOfM = (M) => SIG.map((s) => tr(mm(M, s))[0] / 2);
const sclOfM = (M) => tr(M)[0] / 2;
const biv = (i, j) => mm(SIG[i], SIG[j]);
const mclose = (A, B, eps = 1e-9) => A.every((r, i) => r.every((z, j) => close(z[0], B[i][j][0], eps) && close(z[1], B[i][j][1], eps)));
/** Page blades [1, e₁, e₂, e₁e₂, e₃, e₁e₃, e₂e₃, e₁e₂e₃] of an even multivector → matrix (the odd blades must vanish). */
const fromBlades = (B) => madd(madd(madd(msc(I2, B[0]), msc(biv(0, 1), B[3])), msc(biv(0, 2), B[5])), msc(biv(1, 2), B[6]));
const oddPart = (B) => Math.hypot(B[1], B[2], B[4], B[7]);
/** ψ = a + b e₂e₃ + c e₃e₁ + d e₁e₂ as a matrix and as page blades. */
const psiM = (a, b, c, d) => madd(madd(madd(msc(I2, a), msc(biv(1, 2), b)), msc(biv(2, 0), c)), msc(biv(0, 1), d));
const psiB = (a, b, c, d) => [a, 0, 0, d, 0, -c, b, 0];
/** Rotor cos(t/2) − sin(t/2) B for the unit bivector B = e_i e_j, as a matrix. */
const rotM = (t, i, j) => madd(msc(I2, Math.cos(t / 2)), msc(biv(i, j), -Math.sin(t / 2)));
const PLANE = { e23: [1, 2], e31: [2, 0], e12: [0, 1] }, AXIS = { e23: [1, 0, 0], e31: [0, 1, 0], e12: [0, 0, 1] };
// a small deterministic generator for the test's own spinors
let seed = 12345;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.CLOSURE_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.CLOSURE_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); return state(); };
const psiAt = (t) => page.evaluate((v) => window.CLOSURE_DEBUG.psiAt(v), t);
/** J, S, J², S², ρ of a ψ in the matrix model. */
function model(P) {
  const Pd = dag(P), rhoM = mm(P, Pd), rho = sclOfM(rhoM);
  const JM = mm(mm(P, SZ), Pd), SM = mm(mm(P, biv(0, 1)), Pd);
  return { rho, rhoM, J: vecOfM(JM), JM, SM, J2: mm(JM, JM), S2: mm(SM, SM) };
}

let s = await state();
check('opens on the WEAVE card at t = 0, not playing, with the reference blades and no band', s.preset === 'weave' && s.t === 0 && !s.playing && s.ref && !s.band);
check('WEAVE: the reference blades e₃ and e₁e₂ are on the stage', (await page.evaluate(() => [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden).map((t) => t.textContent).join('|'))).match(/e₃.*e₁e₂|e₁e₂.*e₃/) !== null);
check('WEAVE: J points along the chosen slanted direction, length ρ = 1', vclose(s.J, unit([0.53, 0.29, 0.8]), 1e-12) && close(norm(s.J), 1, 1e-12));
{
  const m = model(fromBlades(s.psi));
  check('WEAVE: J = ψe₃ψ̃ agrees with σ-matrices ψσzψ†', vclose(s.J, m.J, 1e-12) && oddPart(s.psi) === 0);
  // in three dimensions S = I J, and I = σxσyσz = i·1: the matrix of S is i times the matrix of J
  check('WEAVE: S = ψe₁e₂ψ̃ is the dual I J of J (matrix of S = i · matrix of J)', mclose(fromBlades(s.S), mcx(vm(s.J), [0, 1]), 1e-12));
  check('WEAVE: the square spanned by Re₁R̃, Re₂R̃ is orthogonal to J and has area ρ', close(dot(s.A, s.J), 0, 1e-12) && close(dot(s.B, s.J), 0, 1e-12) && close(norm(s.A) * norm(s.B), 1, 1e-12) && close(dot(s.A, s.B), 0, 1e-12));
}

// J² = −S² = ρ² for many spinors, the page's product against the matrix model
let worst = 0, worstVec = 0;
for (let k = 0; k < 40; k++) {
  const q = [rnd() - 0.5, rnd() - 0.5, rnd() - 0.5, rnd() - 0.5].map((x) => x * (0.3 + 2.5 * rnd()));
  const P = psiM(...q), m = model(P);
  const b = await page.evaluate((x) => window.CLOSURE_DEBUG.bilinears(x), psiB(...q));
  const rho = q.reduce((a, x) => a + x * x, 0);
  worst = Math.max(worst, Math.abs(b.rho[0] - rho), Math.abs(m.rho - rho), Math.abs(b.J2[0] - rho * rho), Math.abs(b.S2[0] + rho * rho),
    Math.abs(b.J2.slice(1).reduce((a, x) => a + Math.abs(x), 0)), Math.abs(b.S2.slice(1).reduce((a, x) => a + Math.abs(x), 0)));
  // the matrix model: J² = ρ² · 1 and S² = −ρ² · 1 exactly as matrices
  worst = Math.max(worst, mclose(m.J2, msc(I2, rho * rho), 1e-10) ? 0 : 1, mclose(m.S2, msc(I2, -rho * rho), 1e-10) ? 0 : 1);
  worstVec = Math.max(worstVec, norm(b.J.map((x, i) => x - m.J[i])), mclose(fromBlades(b.S), m.SM, 1e-10) ? 0 : 1);
}
check('J² = −S² = ρ² for 40 random spinors (page product and σ-matrices), with no other grade left over', worst < 1e-10, `max error ${worst}`);
check('J and S of the 40 spinors agree between the page and the σ-matrices', worstVec < 1e-10, `max error ${worstVec}`);

// FIERZ card: ρ = 1.3, turning in e₃e₁; the readout holds 1.69 three times
s = await pick('fierz');
check('FIERZ: ρ = 1.3, turning in e₃e₁, and the card plays', close(s.rho, 1.3) && s.plane === 'e31' && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
await page.evaluate(() => window.CLOSURE_DEBUG.seek(0));
worst = 0;
for (const t of [0.4, 1.7, 3.1, 5.0, 8.8, 12.0]) {
  s = await seek(t);
  const m = model(fromBlades(s.psi));
  worst = Math.max(worst, Math.abs(s.J2[0] - 1.69), Math.abs(-s.S2[0] - 1.69), Math.abs(m.rho - 1.3), norm(s.J.map((x, i) => x - m.J[i])));
  const want = mm(rotM(t, ...PLANE.e31), fromBlades(s.psi0));          // ψ(t) = R(t) ψ₀
  worst = Math.max(worst, mclose(fromBlades(s.psi), want, 1e-10) ? 0 : 1);
}
check('FIERZ: along the rail ψ(t) = R(t)ψ₀ and J² = −S² = ρ² = 1.69', worst < 1e-10, `max error ${worst}`);
check('FIERZ: the key readout prints three equal squares 1.690', (await page.textContent('#roKey')).replace(/\s/g, '') === '1.690·1.690·1.690');

// the example of Chapter 39, turned in e₂e₃ from ψ₀ = 1
s = await pick('turn360');
check('TURN 360°: ρ = 1, plane e₂e₃, ψ₀ = 1, rail capped at 360°, and the card plays', close(s.rho, 1) && s.plane === 'e23' && vclose(s.psi0, [1, 0, 0, 0, 0, 0, 0, 0]) && close(s.max, TAU) && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
await page.evaluate((t) => window.CLOSURE_DEBUG.nudge(t), TAU - 0.05);
check('TURN 360° stops by itself at 360°', await until(page, () => { const d = window.CLOSURE_DEBUG.state; return !d.playing && d.t >= 2 * Math.PI - 1e-9; }));
s = await state();
check('TURN 360°: J is back at e₃ while ψ = −ψ₀ (R(2π) = −1)', vclose(s.J, [0, 0, 1], 1e-12) && vclose(s.psi, [-1, 0, 0, 0, 0, 0, 0, 0], 1e-12) && mclose(rotM(TAU, 1, 2), msc(I2, -1), 1e-12) && close(s.c, -1, 1e-12));
check('TURN 360°: the flag is the reverse of the starting flag (along −n)', vclose(s.flagDir, [-1, 0, 0], 1e-12) && vclose(s.axis, AXIS.e23));
check('TURN 360°: the note and the pill say ψ = −ψ₀', (await page.textContent('#roSign')).includes('−ψ₀') && (await page.textContent('#pillSign strong')).includes('−1.00'));
worst = 0;
for (let k = 0; k <= 24; k++) {
  const t = k * TAU / 24 * 2, p = await psiAt(t);
  const want = rotM(t, 1, 2), m = model(fromBlades(p));
  worst = Math.max(worst, mclose(fromBlades(p), want, 1e-12) ? 0 : 1, norm(m.J.map((x, i) => x - [0, -Math.sin(t), Math.cos(t)][i])));
}
check('ψ(ϑ) = cos(ϑ/2) − sin(ϑ/2) e₂e₃ and J(ϑ) = cos ϑ e₃ − sin ϑ e₂ at 25 angles in [0, 720°]', worst < 1e-12, `max error ${worst}`);
worst = 0;
for (const t of [0.3, 1.2, 2.9, 4.4, 6.0]) {
  s = await seek(t);
  const c = sclOfM(mm(fromBlades(s.psi), dag(fromBlades(s.psi0)))) / s.rho;
  const r = unit(s.flagBase), want = [0, 1, 2].map((i) => Math.cos(t / 2) * [1, 0, 0][i] + Math.sin(t / 2) * r[i]);
  worst = Math.max(worst, Math.abs(c - Math.cos(t / 2)), Math.abs(s.c - c), norm(s.flagDir.map((x, i) => x - want[i])), Math.abs(dot(r, [1, 0, 0])), norm(unit(s.J).map((x, i) => x - r[i])));
}
check('the flag stands at the bearing of J and points along cos(t/2) n + sin(t/2) r, with cos(t/2) = ½Re Tr(ψψ₀†)/ρ', worst < 1e-12, `max error ${worst}`);

s = await pick('seam');
check('SEAM: flags all the way round, rail capped at 360°, and the card plays', s.fan && close(s.max, TAU) && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
s = await seek(TAU);
const f0 = (await seek(0)).flagDir;
s = await seek(TAU);
check('SEAM: back at the start, the last flag is opposite to the first one at the same base point', vclose(f0, [1, 0, 0], 1e-12) && vclose(s.flagDir, [-1, 0, 0], 1e-12) && vclose(s.flagBase, (await seek(0)).flagBase, 1e-12));

s = await pick('turn720');
check('TURN 720°: rail up to 720°, and the card plays', close(s.max, 2 * TAU) && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
await page.evaluate((t) => window.CLOSURE_DEBUG.nudge(t), 2 * TAU - 0.05);
check('TURN 720° stops by itself at 720°', await until(page, () => { const d = window.CLOSURE_DEBUG.state; return !d.playing && d.t >= 4 * Math.PI - 1e-9; }));
s = await state();
check('TURN 720°: ψ = +ψ₀ (R(4π) = +1), J at e₃, the flag back along +n', vclose(s.psi, [1, 0, 0, 0, 0, 0, 0, 0], 1e-12) && mclose(rotM(2 * TAU, 1, 2), I2, 1e-12) && vclose(s.J, [0, 0, 1], 1e-12) && vclose(s.flagDir, [1, 0, 0], 1e-12));
check('TURN 720°: the readout says ψ = +ψ₀', (await page.textContent('#roSign')).includes('+ψ₀'));

/* ---------- controls ---------- */
await page.evaluate(() => { const el = document.getElementById('rho'); el.value = '1.45'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the density slider sets ρ, leaves the card and scales J to length ρ and the squares to ρ²', close(s.rho, 1.45) && s.preset === null && close(norm(s.J), 1.45, 1e-12) && close(s.J2[0], 1.45 * 1.45, 1e-12) && close(-s.S2[0], 1.45 * 1.45, 1e-12));
await page.click('#planeChips [data-plane="e12"]'); await settle(page);
worst = 0;
for (const t of [0, 1.1, TAU, 9.0]) { s = await seek(t); worst = Math.max(worst, norm(s.J.map((x, i) => x - [0, 0, 1.45][i])), Math.abs(s.c - Math.cos(t / 2))); }
check('turning in e₁e₂ from ψ₀ = √ρ: J sits on the axis e₃ and never moves, while ψ/ψ₀ still runs as cos(t/2)', s.plane === 'e12' && vclose(s.axis, [0, 0, 1]) && worst < 1e-12, `max error ${worst}`);
await page.click('#planeChips [data-plane="e23"]'); await settle(page);
const before = (await state()).psi0;
await page.click('#psiRandom'); s = await state();
const m1 = model(fromBlades(s.psi));
check('“Random ψ₀” draws a new spinor whose squares still agree (σ-matrices)', !vclose(before, s.psi0, 1e-6) && close(m1.rho, 1.45, 1e-12) && mclose(m1.J2, msc(I2, 1.45 ** 2), 1e-10) && mclose(m1.S2, msc(I2, -(1.45 ** 2)), 1e-10));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('r'); const s2 = await state();
check('the key R draws another ψ₀', !vclose(s.psi0, s2.psi0, 1e-6));
await page.click('#psiOne'); s = await seek(0);
check('“ψ₀ = √ρ” starts J at ρ e₃', vclose(s.psi0, [Math.sqrt(1.45), 0, 0, 0, 0, 0, 0, 0], 1e-12) && vclose(s.J, [0, 0, 1.45], 1e-12));
await page.click('#bandChip'); s = await state();
check('the band chip hides the band', s.band === false && (await page.getAttribute('#bandChip', 'aria-pressed')) === 'false');
await page.click('#bandChip'); await page.click('#fanChip'); s = await state();
check('the band chip shows it again, and the flag chip plants flags all the way', s.band && s.fan);
// drag the tip of J to another point of the sphere
s = await seek(1.0);
const from = await page.evaluate((v) => window.CLOSURE_DEBUG.screen(v), s.J);
const to = await page.evaluate((v) => window.CLOSURE_DEBUG.screen(v), [0.6, -0.6, 0.53]);
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 4 }); await page.mouse.up();
s = await state();
const aimed = await page.evaluate(([x, y]) => window.CLOSURE_DEBUG.under(x, y), to);
check('dragging the tip of J points J at the sphere point under the pointer, keeping ρ and the identity', Math.acos(Math.min(1, dot(unit(s.J), unit(aimed)))) < 1e-6 && close(norm(s.J), 1.45, 1e-9) && close(s.J2[0], 1.45 ** 2, 1e-9) && close(s.t, 1.0, 1e-12), `J ${s.J.map((x) => x.toFixed(3))}`);
// the rail
await page.locator('body').click({ position: { x: 5, y: 5 } });
await seek(PI / 2); await page.keyboard.press('ArrowRight');
check('→ steps 15°', close((await state()).t, PI / 2 + PI / 12, 1e-9));
await page.click('#rew'); check('⏮ goes back to 0', (await state()).t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.CLOSURE_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

// English
const en = await T.goto(BOOK, ID, '?lang=en&preset=turn360');
await settle(en);
await en.evaluate(() => window.CLOSURE_DEBUG.seek(2 * Math.PI)); await settle(en);
check('English: the readout and the stage title speak English at 360°', (await en.textContent('#roNote')).includes('other side of the band') && (await en.textContent('#hudSub')).includes('turned 360°'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
