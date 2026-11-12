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
await stageFirstChecks(T, BOOK, ID, { solid: true });

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
check('opens on the WEAVE card at t = 0, not playing, with the reference blades on the closed band (μ = 0), drawn with WebGL', s.preset === 'weave' && s.t === 0 && !s.playing && s.ref && s.band && s.mu === 0 && s.mode === 'webgl');
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
check('SEAM: flags all the way round on the unrolled band, rail capped at 360°, and the card plays', s.fan && s.unrolled && close(s.max, TAU) && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
s = await seek(TAU);
const f0 = (await seek(0)).flagDir;
s = await seek(TAU);
check('SEAM: back at the start, the last flag is opposite to the first one at the same base point', vclose(f0, [1, 0, 0], 1e-12) && vclose(s.flagDir, [-1, 0, 0], 1e-12) && vclose(s.flagBase, (await seek(0)).flagBase, 1e-12));

/* ---------- the solid band ---------- */
// one-sidedness, from the page's own geometry by another route: the mid-surface of the slab is the midpoint of its top
// and bottom faces; its normal (finite differences) carried continuously along the centre line comes back reversed
// after one round and as it was after two
{
  const pts = await page.evaluate(() => { const D = window.CLOSURE_DEBUG, b = D.band(0), out = [];
    for (let k = 0; k <= 720; k++) { const t = k * Math.PI / 180, pc = t < 2 * Math.PI - 1e-9 ? 0 : 1, row = [];
      for (const x of [0, 2e-3]) { const v = b.FACE * x; row.push(D.solid(pc, t, v, 0).map((q, i) => (q + D.solid(pc, t, 1 - v, 0)[i]) / 2)); }
      out.push(row); }
    return out; });
  const sub = (a, b) => a.map((x, i) => x - b[i]), cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  let n = null, n0 = null, at360 = null, ok = true;
  for (let k = 0; k <= 720; k++) {
    const r = pts[k], tg = sub(pts[Math.min(720, k + 1)][0], pts[Math.max(0, k - 1)][0]), across = sub(r[1], r[0]);
    let m = unit(cross(tg, across));
    if (n && dot(m, n) < 0) m = m.map((x) => -x);      // carry continuously
    if (n && dot(m, n) < 0.99) ok = false;
    n = m; if (k === 0) n0 = m; if (k === 360) at360 = m;
  }
  check('one-sided: the band’s normal carried once round comes back reversed, twice round as it was (finite differences)', ok && dot(at360, n0) < -0.999 && dot(n, n0) > 0.999, `${dot(at360, n0)} / ${dot(n, n0)}`);
  // μ is only a transition of the picture: at μ = 0 the two pieces close up into the band along both cuts
  const seams = await page.evaluate(() => { const D = window.CLOSURE_DEBUG, d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); let g0 = 0, g1 = Infinity;
    for (let k = 0; k <= 72; k++) { const t = k * Math.PI / 36; g0 = Math.max(g0, d(D.solid(0, t, 1, 0), D.solid(1, t + 2 * Math.PI, 0, 0)), d(D.solid(1, t + 2 * Math.PI, 1, 0), D.solid(0, t, 0, 0)));
      for (let j = 0; j <= 10; j++) for (let i = 0; i <= 10; i++) g1 = Math.min(g1, d(D.solid(0, t, j / 10, 1), D.solid(1, 2 * Math.PI + i * Math.PI / 5, j / 10, 1))); }
    for (let j = 0; j <= 20; j++) g0 = Math.max(g0, d(D.solid(0, 2 * Math.PI, j / 20, 0), D.solid(1, 2 * Math.PI, j / 20, 0)), d(D.solid(1, 4 * Math.PI, j / 20, 0), D.solid(0, 0, j / 20, 0)));
    return { g0, g1 }; });
  check('μ = 0: the two pieces meet along both cuts (one closed band); μ = 1: they are apart', seams.g0 < 1e-12 && seams.g1 > 0.3, JSON.stringify(seams));
}
await page.evaluate(() => { const el = document.getElementById('mu'); el.value = '1'; el.dispatchEvent(new Event('input', { bubbles: true })); });
s = await state();
check('the μ slider (model) opens the dualist picture and leaves the card', close(s.mu, 1) && s.preset === null && (await page.textContent('#hudBig')).includes('μ'));
s = await pick('turn360');
check('every card is on the closed band: picking a card brings μ back to 0', s.mu === 0);
const tip0 = (await seek(0)).tip, tip360 = (await seek(TAU)).tip;
check('the flag’s tip (amber) at 360° is on the other edge, not where it started', norm(tip0.map((x, i) => x - tip360[i])) > 0.5);

s = await pick('turn720');
check('TURN 720°: rail up to 720°, and the card plays', close(s.max, 2 * TAU) && await until(page, () => window.CLOSURE_DEBUG.state.t > 0));
await page.evaluate((t) => window.CLOSURE_DEBUG.nudge(t), 2 * TAU - 0.05);
check('TURN 720° stops by itself at 720°', await until(page, () => { const d = window.CLOSURE_DEBUG.state; return !d.playing && d.t >= 4 * Math.PI - 1e-9; }));
s = await state();
check('TURN 720°: ψ = +ψ₀ (R(4π) = +1), J at e₃, the flag back along +n', vclose(s.psi, [1, 0, 0, 0, 0, 0, 0, 0], 1e-12) && mclose(rotM(2 * TAU, 1, 2), I2, 1e-12) && vclose(s.J, [0, 0, 1], 1e-12) && vclose(s.flagDir, [1, 0, 0], 1e-12));
check('TURN 720°: the readout says ψ = +ψ₀', (await page.textContent('#roSign')).includes('+ψ₀'));
check('TURN 720°: the tip is back where it started', norm(s.tip.map((x, i) => x - tip0[i])) < 1e-6, String(norm(s.tip.map((x, i) => x - tip0[i]))));

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
// drag the tip of J to another point of the sphere; the tip must be in view (the solid band hides what is behind it):
// a smaller ρ, looking along the axis n into the hole of the band
await page.evaluate(() => { const el = document.getElementById('rho'); el.value = '0.8'; el.dispatchEvent(new Event('input', { bubbles: true })); });
await page.evaluate(() => window.CLOSURE_DEBUG.view([-Math.PI / 2 + 0.25, 0.3, 1]));
s = await seek(1.0);
check('the tip of J is not hidden in this view', !(await page.evaluate((v) => window.TRV.solids[0].occluded(v, 0.02), s.J)));
const from = await page.evaluate((v) => window.CLOSURE_DEBUG.screen(v), s.J);
const to = await page.evaluate((v) => window.CLOSURE_DEBUG.screen(v), [0.2, -0.45, 0.5]);
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 4 }); await page.mouse.up();
s = await state();
const aimed = await page.evaluate(([x, y]) => window.CLOSURE_DEBUG.under(x, y), to);
check('dragging the tip of J points J at the sphere point under the pointer, keeping ρ and the identity', Math.acos(Math.min(1, dot(unit(s.J), unit(aimed)))) < 1e-6 && close(norm(s.J), 0.8, 1e-9) && close(s.J2[0], 0.8 ** 2, 1e-9) && close(s.t, 1.0, 1e-12), `J ${s.J.map((x) => x.toFixed(3))}`);
// the rail
await page.locator('body').click({ position: { x: 5, y: 5 } });
await seek(PI / 2); await page.keyboard.press('ArrowRight');
check('→ steps 15°', close((await state()).t, PI / 2 + PI / 12, 1e-9));
await page.click('#rew'); check('⏮ goes back to 0', (await state()).t === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.CLOSURE_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

/* ---------- the rail's t is the turn parameter, not J's angle from J₀ ---------- */
// For a unit axis n and ĵ₀ = J₀/ρ, Rodrigues' formula gives cos α = (n·ĵ₀)² + (1 − (n·ĵ₀)²) cos t, α the principal angle in
// [0, π]. Checked here over every plane, several starting spinors (ψ₀ = √ρ, two random ones, a slanted aim), the ends of the
// density range, μ = 0 and μ = 0.6, and t across [0, 720°] including the folds at 180°, 360° and 540°.
const alphaLaw = (n, j0, t) => { const c = dot(n, j0); return Math.acos(Math.max(-1, Math.min(1, c * c + (1 - c * c) * Math.cos(t)))); };
const setIn = (id, v) => page.evaluate(([i, x]) => { const el = document.getElementById(i); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]);
const TS = [0, 37, 90, 179, 180, 200, 270, 359, 360, 450, 505, 540, 630, 719, 720].map((d) => d * DEG);
await setIn('mu', 0); await settle(page);
let lawWorst = 0, lawWhy = '', combos = 0, tiltSeen = 0;
for (const plane of ['e23', 'e31', 'e12']) {
  await page.click(`#planeChips [data-plane="${plane}"]`); await settle(page);
  for (const start of ['one', 'rand', 'rand', 'aim']) {
    if (start === 'one') await page.click('#psiOne');
    else if (start === 'rand') await page.click('#psiRandom');
    else { await page.click('[data-preset="weave"]'); await settle(page); await page.click(`#planeChips [data-plane="${plane}"]`); }   // WEAVE's slanted J₀, kept
    await settle(page);
    for (const rho of [0.2, 1.6]) {
      await setIn('rho', rho); await settle(page);
      for (const mu of [0, 0.6]) {
        await setIn('mu', mu); await settle(page);
        for (const t of TS) {
          const st = await page.evaluate((v) => { const D = window.CLOSURE_DEBUG; D.seek(v); return D.state; }, t);
          const j0 = unit(model(fromBlades(st.psi0)).J), n = AXIS[plane], want = alphaLaw(n, j0, t);
          const Jt = model(fromBlades(st.psi)).J, direct = Math.acos(Math.max(-1, Math.min(1, dot(unit(Jt), j0))));
          const err = Math.max(Math.abs(st.Jback - want), Math.abs(direct - want), Math.abs(norm(Jt) - rho));
          if (err > lawWorst) { lawWorst = err; lawWhy = `${plane}/${start}/ρ${rho}/μ${mu}/t${(t / DEG).toFixed(0)}`; }
          combos++;
          if (Math.abs(dot(n, j0)) > 1e-3 && Math.abs(dot(n, j0)) < 1 - 1e-3) tiltSeen++;
        }
      }
    }
  }
}
await setIn('mu', 0); await settle(page);
check(`J’s angle from J₀ follows cos α = (n·ĵ₀)² + (1 − (n·ĵ₀)²) cos t, principal in [0°, 180°], over ${combos} plane/start/ρ/μ/t combinations (${tiltSeen} tilted)`, lawWorst < 1e-6 && combos === 3 * 4 * 2 * 2 * TS.length && tiltSeen > 0, `max error ${lawWorst} at ${lawWhy}`);

/** The free-play note at t, read in one language: the plane, ψ₀ = √ρ when asked ('one'). */
const noteAt = async (pg, plane, aimVec, t) => {
  await pg.click(`#planeChips [data-plane="${plane}"]`); await settle(pg);
  if (aimVec === 'one') await pg.click('#psiOne');
  await settle(pg);
  const st = await pg.evaluate((v) => { const D = window.CLOSURE_DEBUG; D.seek(v); return D.state; }, t);
  await settle(pg);
  return { st, text: await pg.textContent('#roNote'), ro: await pg.textContent('#roJback') };
};
{
  const enP = await T.goto(BOOK, ID, '?lang=en', await T.newPage()); await settle(enP);
  let ok = true, why = '';
  // parallel: ψ₀ = √ρ (J₀ = e₃) turning in e₁e₂ (axis e₃); perpendicular: the same start in e₂e₃ (axis e₁)
  const CASES = [['e12', 90, 0], ['e12', 450, 0], ['e23', 90, 90], ['e23', 200, 160], ['e23', 270, 90], ['e23', 500, 140]];
  for (const [pg, lang] of [[page, 'zh'], [enP, 'en']]) {
    for (const [plane, deg, alphaDeg] of CASES) {
      const { st, text, ro } = await noteAt(pg, plane, 'one', deg * DEG);
      const lawDeg = alphaLaw(AXIS[plane], [0, 0, 1], deg * DEG) / DEG;
      const words = lang === 'zh'
        ? [`转过 ${deg}°`, '这是转动参数，不是 J 离出发方向的夹角', `J 此刻离出发方向 ${Math.round(lawDeg)}°`, `小旗按半角转过 ${deg / 2}°`]
        : [`Turned ${deg}°`, 'this is the turn parameter, not the angle of J from its start', `J is now ${Math.round(lawDeg)}° from its start`, `half angle, ${deg / 2}°`];
      // no exact on-axis / fixed wording: the note reports the computed separation only, which may round to 0°
      const bad = lang === 'zh' ? ['J 只转过同样的角', '就在转轴', '一直不动'] : ['J has turned through that angle', 'lies on the axis', 'does not move'];
      if (Math.abs(lawDeg - alphaDeg) > 1e-9 || Math.abs(st.Jback / DEG - alphaDeg) > 1e-6 || !ro.startsWith(alphaDeg.toFixed(1)) || !words.every((w) => text.includes(w)) || bad.some((w) => text.includes(w))) {
        ok = false; why = why || `${lang} ${plane} t=${deg}: ${text} | ${ro}`;
      }
    }
  }
  check('the note, parallel (ψ₀ = √ρ in e₁e₂: t = 90°, 450° leave J at 0°) and perpendicular (e₂e₃: 90° → 90°, 200° → 160°, 270° → 90°, 500° → 140°), both languages', ok, why);
  // tilted: the slanted start of WEAVE, turned in e₂e₃ (axis e₁), then the free note at 90° and 180°
  ok = true; why = '';
  for (const [pg, lang] of [[page, 'zh'], [enP, 'en']]) {
    await pg.click('[data-preset="weave"]'); await settle(pg);
    for (const deg of [90, 180, 300]) {
      await pg.evaluate(() => { const el = document.getElementById('rho'); el.value = '1'; el.dispatchEvent(new Event('input', { bubbles: true })); });
      const st = await pg.evaluate((v) => { const D = window.CLOSURE_DEBUG; D.seek(v); return D.state; }, deg * DEG);
      await settle(pg);
      const text = await pg.textContent('#roNote'), j0 = unit([0.53, 0.29, 0.8]), want = alphaLaw([1, 0, 0], j0, deg * DEG) / DEG;
      const shown = `${Math.round(want)}°`;
      if (Math.abs(st.Jback / DEG - want) > 1e-6 || Math.abs(want - deg) < 1 || !text.includes(shown) || (lang === 'zh' ? !text.includes(`J 此刻离出发方向 ${shown}`) || /就在转轴|一直不动/.test(text) : !text.includes(`J is now ${shown} from its start`) || /lies on the axis|does not move/.test(text))) { ok = false; why = why || `${lang} ${deg}: ${text} (want ${want})`; }
    }
  }
  check('the note, tilted start (the slanted J₀ of WEAVE in e₂e₃): α differs from t at 90°, 180°, 300° and the note names the true α, both languages', ok, why);
  // the evidence: the history-lift box states its full hypotheses and nothing about J; the plane/flag reading sits with ARGUED/NUM
  const ev = await page.evaluate(() => [...document.querySelectorAll('#evidence .lean')].map((b) => ({ cls: b.className.trim(), gid: (b.querySelector('[data-lean-gid]') || {}).dataset?.leanGid || '', zh: (b.querySelector('.zh') || {}).textContent || '', en: (b.querySelector('.en') || {}).textContent || '' })));
  const lift = ev.find((b) => b.cls === 'lean' && /history_lift$/.test(b.gid)), nosec = ev.find((b) => b.cls === 'lean' && /no_continuous_global_section$/.test(b.gid));
  const argued = ev.filter((b) => /argued/.test(b.cls)).pop(), num = ev.find((b) => /\bnum\b/.test(b.cls));
  check('green history-lift box: continuous base path on [0, 1], upper start w with γ(0) = w², γ̂² = γ, γ̂(0) = w, uniqueness, no continuous global section, fullTurn from 1 ends at −1 (both languages)',
    !!lift && ['[0, 1]', 'γ(0) = w²', 'γ̂(s)² = γ(s)', 'γ̂(0) = w', '唯一', '没有连续的全局截面', 'exp(2πis)', '从 1 提升，终点是 −1'].every((w) => lift.zh.includes(w))
    && ['[0, 1]', 'γ(0) = w²', 'γ̂(s)² = γ(s)', 'γ̂(0) = w', 'uniqueness', 'no continuous global section', 'exp(2πis)', 'lifted from 1, ends at −1'].every((w) => lift.en.includes(w)));
  check('the two green boxes say nothing about J, the flag or the page', [lift, nosec].every((b) => b && !/J|小旗|页面|旗/.test(b.zh) && !/\bJ\b|flag|page/.test(b.en)));
  check('the plane/flag reading of the base circle sits in the ARGUED box: e^{it} is the chosen turn parameter, not J’s angle',
    !!argued && argued.zh.includes('选定的转动参数') && argued.zh.includes('一般不是 J 离出发方向的夹角') && argued.zh.includes('小旗') && argued.en.includes('turn parameter chosen on the rail') && argued.en.includes('in general not the angle of J from its start') && argued.en.includes('flag'));
  check('the NUM box gives the separation law and its principal range (both languages)',
    !!num && num.zh.includes('cos α = (n·ĵ₀)² + (1 − (n·ĵ₀)²) cos t') && num.zh.includes('0°–180°') && num.en.includes('cos α = (n·ĵ₀)² + (1 − (n·ĵ₀)²) cos t') && num.en.includes('0°–180°'));
  const drawer = await page.evaluate(() => [document.querySelector('#drawer .sheet > div.zh').textContent, document.querySelector('#drawer .sheet > div.en').textContent]);
  check('the drawer distinguishes the turn parameter from J’s angle and no longer calls e^{it} the angle J has turned through',
    drawer[0].includes('不是 J 与 J₀ 的夹角 α') && drawer[0].includes('选定的转动参数') && !drawer[0].includes('J 转过的角') && drawer[1].includes('not the angle α between J and J₀') && drawer[1].includes('chosen turn parameter') && !drawer[1].includes('the angle J has turned through'));
  check('the English drawer names the lift with its prescribed compatible starting point, not “every path has a unique lift”',
    drawer[1].includes('history-dependent lifting theorem') && drawer[1].includes('prescribed compatible upper starting point') && !drawer[1].includes('every path has a unique'));
  await enP.close();
}

// English
const en = await T.goto(BOOK, ID, '?lang=en&preset=turn360');
await settle(en);
await en.evaluate(() => window.CLOSURE_DEBUG.seek(2 * Math.PI)); await settle(en);
check('English: the readout and the stage title speak English at 360°', (await en.textContent('#roNote')).includes('other side of the band') && (await en.textContent('#hudSub')).includes('turned 360°'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
