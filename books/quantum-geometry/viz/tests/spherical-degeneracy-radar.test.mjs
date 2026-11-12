#!/usr/bin/env node
// Browser regression suite for ORTHO//DEGENERACY (books/quantum-geometry/viz/spherical-degeneracy-radar/).
//   node books/quantum-geometry/viz/tests/spherical-degeneracy-radar.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// The page multiplies multivectors of Cl(3,0) blade by blade and lets rotors act by s ↦ R s R̃. The suite rebuilds every
// claim another way: rotors as 2 × 2 complex SU(2) matrices (e₁, e₂, e₃ ↦ σx, σy, σz; R̃ ↦ R†), vectors read back as
// ½ Tr(M σₖ); the closed forms of Chapter 34 for v₁, v₂, s₁, s₂ and Δ(O); 3 × 3 rotation matrices for the turned frame;
// and a brute-force search over a grid of observers for the ones that read every pair equally. It reads the page
// through window.DEGEN_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'spherical-degeneracy-radar';
const T = await session();
const { check } = T;
const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, R2 = Math.SQRT1_2;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub = (a, b) => a.map((x, i) => x - b[i]);
const norm = (a) => Math.hypot(...a);
const vclose = (a, b, eps = 1e-9) => a.length === b.length && a.every((x, i) => close(x, b[i], eps));
const sph = (b, a) => [Math.sin(b) * Math.cos(a), Math.sin(b) * Math.sin(a), Math.cos(b)];

/* ---------- independent model: SU(2) ---------- */
// complex numbers [re, im]; 2 × 2 matrices [[a, b], [c, d]]
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cs = (a, k) => [a[0] * k, a[1] * k];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
const madd = (A, B) => A.map((r, i) => r.map((z, j) => ca(z, B[i][j])));
const msc = (A, k) => A.map((r) => r.map((z) => cs(z, k)));
const dag = (A) => [[[A[0][0][0], -A[0][0][1]], [A[1][0][0], -A[1][0][1]]], [[A[0][1][0], -A[0][1][1]], [A[1][1][0], -A[1][1][1]]]];
const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
const SX = [[[0, 0], [1, 0]], [[1, 0], [0, 0]]], SY = [[[0, 0], [0, -1]], [[0, 1], [0, 0]]], SZ = [[[1, 0], [0, 0]], [[0, 0], [-1, 0]]];
const SIG = [SX, SY, SZ];
const vm = (v) => madd(madd(msc(SX, v[0]), msc(SY, v[1])), msc(SZ, v[2]));
const tr = (A) => ca(A[0][0], A[1][1]);
const mv = (M) => SIG.map((s) => tr(mm(M, s))[0] / 2);
/** Bivector e_i e_j as a matrix: σ_i σ_j. */
const biv = (i, j) => mm(SIG[i], SIG[j]);
/** The rotor c − s·(e_i e_j) as a matrix. */
const rot = (c, s, i, j) => madd(msc(I2, c), msc(biv(i, j), -s));
const actM = (U, v) => mv(mm(mm(U, vm(v)), dag(U)));
/** Page blades [1, e₁, e₂, e₁e₂, e₃, e₁e₃, e₂e₃, e₁e₂e₃] → matrix (even part only, the rest must vanish). */
const fromBlades = (B) => madd(madd(madd(msc(I2, B[0]), msc(biv(0, 1), B[3])), msc(biv(0, 2), B[5])), msc(biv(1, 2), B[6]));
const mclose = (A, B, eps = 1e-9) => A.every((r, i) => r.every((z, j) => close(z[0], B[i][j][0], eps) && close(z[1], B[i][j][1], eps)));

const U12 = rot(R2, R2, 0, 1), U23 = rot(R2, R2, 1, 2), U13 = rot(R2, R2, 0, 2);
const UONCE = U13, UTWICE = mm(U23, U12);
const EXP12 = rot(Math.cos(PI / 4), Math.sin(PI / 4), 0, 1);   // exp(−π/4 e₁e₂)
const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.DEGEN_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.DEGEN_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const pairAt = (t) => page.evaluate((v) => window.DEGEN_DEBUG.pairAt(v), t);

// the rotor formulas of Example ex-ch34-spherical-addressing-and-octant-rotors
const R = await page.evaluate(() => window.DEGEN_DEBUG.rotors());
check('R_once = (1 − e₁e₃)/√2 (blades)', vclose(R.once, [R2, 0, 0, 0, 0, -R2, 0, 0], 1e-12));
check('R_twice = (1 − e₁e₂ − e₂e₃ − e₁e₃)/2 (blades)', vclose(R.twice, [0.5, 0, 0, -0.5, 0, -0.5, -0.5, 0], 1e-12));
check('R_twice is the left product ((1 − e₂e₃)/√2)((1 − e₁e₂)/√2), in SU(2)', mclose(fromBlades(R.twice), UTWICE, 1e-12));
check('R_twice = exp(−π/4 e₁e₂) R_once, in SU(2)', mclose(fromBlades(R.twice), mm(EXP12, UONCE), 1e-12));
check('the right product (the wrong order) is a different rotor', !mclose(mm(U12, U23), UTWICE, 1e-6));
check('difference rotor D = R₂R̃₁ = exp(−π/4 e₁e₂)', vclose(R.diff, [R2, 0, 0, -R2, 0, 0, 0, 0], 1e-12) && mclose(fromBlades(R.diff), mm(UTWICE, dag(UONCE)), 1e-12));
check('both rotors send +e₁ to +e₃ (SU(2) sandwich)', vclose(actM(fromBlades(R.once), E1), E3, 1e-12) && vclose(actM(fromBlades(R.twice), E1), E3, 1e-12));
check('D commutes with e₃ and not with e₁ (page), and Dσz = σzD, Dσx ≠ σxD (SU(2))',
  norm(R.comm3) < 1e-12 && norm(R.comm1) > 1 && mclose(mm(EXP12, SZ), mm(SZ, EXP12), 1e-12) && !mclose(mm(EXP12, SX), mm(SX, EXP12), 1e-6));
// D e₁ = e₂ D, so the commutator is (e₂ − e₁) D: its size is |e₂ − e₁| = √2
check('|De₁ − e₁D| = |e₂ − e₁| = √2 (covariant commutator with f′ = e₂)', close(norm(R.comm1), Math.SQRT2, 1e-12));

// opening view: MERIDIAN
let s = await state();
check('opens on the MERIDIAN card at φ = 90°, not playing', s.preset === 'meridian' && s.scene === 'address' && close(s.t, PI / 2) && !s.playing);
const v1f = (th) => [Math.sin(th), 0, Math.cos(th)], v2f = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const gapf = (O, th, ph) => Math.sin(th) * (O[0] * (Math.cos(ph) - 1) + O[1] * Math.sin(ph));
check('MERIDIAN: v₁, v₂ are the closed forms at θ = π/3 (= (√3/2, 0, ½) and (0, √3/2, ½))', vclose(s.a, v1f(PI / 3), 1e-12) && vclose(s.b, [0, Math.sqrt(3) / 2, 0.5], 1e-12));
check('MERIDIAN: the observer has O₁ = O₂ and reads the same twice', close(s.O[0], s.O[1], 1e-12) && close(s.gap, 0, 1e-12) && close(s.ra, dot(s.O, v1f(PI / 3)), 1e-12));
check('MERIDIAN: the blind circle is the meridian O₁ = O₂ (normal ∝ (−1, 1, 0))', vclose(s.blind.map(Math.abs), [R2, R2, 0], 1e-12) && close(s.blind[0], -s.blind[1], 1e-12));
check('MERIDIAN: the readout prints the equal readings', (await page.textContent('#roKey')).includes('0.000') && (await page.textContent('#roKeySub')).includes('0.787'));
// Δ(O) formula, for this and other observers, at several φ
let worst = 0;
for (const ph of [0.3, 1.1, 2.5, 4.0, 5.9]) {
  const p = await pairAt(ph);
  worst = Math.max(worst, norm(sub(p.a, v1f(PI / 3))), norm(sub(p.b, v2f(PI / 3, ph))));
  for (const O of [sph(0.7, 1.9), sph(2.2, -0.4), E2]) worst = Math.max(worst, Math.abs(dot(O, p.b) - dot(O, p.a) - gapf(O, PI / 3, ph)));
}
check('ADDRESS: v₁, v₂ and Δ(O) = sin θ [O₁(cos φ − 1) + O₂ sin φ] at five azimuths and three observers', worst < 1e-12, `max error ${worst}`);

// SWEEP: the pole reads the same at every φ; the blind circles meet only at ±e₃
s = await pick('sweep');
check('SWEEP: the observer stands at +e₃, and the card plays', vclose(s.O, E3, 1e-12) && s.trail && await until(page, () => window.DEGEN_DEBUG.state.t > 0));
check('SWEEP runs once round and stops', await until(page, () => { const d = window.DEGEN_DEBUG.state; return !d.playing && d.t >= 2 * Math.PI - 1e-9; }, null, 120000));
const legendFaint = () => page.evaluate(() => /淡线|faint/.test(document.getElementById('legend').textContent));
check('SWEEP: the legend names the faint circles the caption calls the ones already passed', await legendFaint());
worst = 0;
for (let k = 1; k < 24; k++) { s = await seek(k * TAU / 24); worst = Math.max(worst, Math.abs(s.gap), Math.abs(s.ra - 0.5), Math.abs(dot(s.blind, E3)), Math.abs(dot(s.blind, sub(s.b, s.a)) - norm(sub(s.b, s.a)))); }
check('SWEEP: at every φ the pole reads cos θ = ½ twice, and each blind circle contains ±e₃ and is orthogonal to v₂ − v₁', worst < 1e-12, `max error ${worst}`);
s = await seek(1.3);
check('SWEEP: the common normal of two differences is ±e₃ and orthogonal to both (unit_perpendicular_pair)', vclose(s.common.map(Math.abs), [0, 0, 1], 1e-12) && Math.abs(dot(s.common, s.diffs[0])) < 1e-12 && Math.abs(dot(s.common, s.diffs[1])) < 1e-12);
// brute force: observers on a grid reading every one of twelve pairs equally
const pairs = []; for (let k = 1; k <= 12; k++) pairs.push(v2f(PI / 3, k * TAU / 13));
const blindAll = [];
for (let i = 0; i <= 90; i++) for (let j = 0; j < 180; j++) {
  const O = sph(i * PI / 90, j * TAU / 180);
  if (pairs.every((v) => Math.abs(dot(O, v) - dot(O, v1f(PI / 3))) < 1e-9)) blindAll.push(O);
}
check('brute force over 16 380 grid observers: only ±e₃ read twelve azimuths equally', blindAll.length > 0 && blindAll.every((O) => close(Math.abs(O[2]), 1, 1e-12)), `${blindAll.length} found`);

// TILTED: the spread is 2 sin θ sin β
s = await pick('tilted');
await until(page, () => !window.DEGEN_DEBUG.state.playing, null, 120000);
check('TILTED draws no trail, and its legend does not mention faint circles', !(await state()).trail && !(await legendFaint()));
const Ot = sph(PI / 4, PI / 2);
check('TILTED: the observer is 45° from the pole in the e₂∧e₃ plane', vclose(s.O, Ot, 1e-12));
let lo = Infinity, hi = -Infinity;
for (let k = 0; k <= 720; k++) { const g = gapf(Ot, PI / 3, k * TAU / 720); lo = Math.min(lo, g); hi = Math.max(hi, g); }
s = await seek(PI / 2);
check('TILTED, φ = 90°: readings √2/4 and √2/4 + √6/4, gap sin θ sin β = √6/4', close(s.ra, Math.SQRT2 / 4, 1e-12) && close(s.rb, (Math.SQRT2 + Math.sqrt(6)) / 4, 1e-12) && close(s.gap, Math.sqrt(6) / 4, 1e-12));
check('TILTED: peak-to-peak spread over φ is 2 sin θ sin β = √6/2 (sampled) and the readout says so', close(hi - lo, Math.sqrt(6) / 2, 1e-6) && (await page.textContent('#roD')).trim() === '1.225');

// HOPS
s = await pick('hops');
check('HOPS plays its two hops and stops', await until(page, () => { const d = window.DEGEN_DEBUG.state; return d.scene === 'rotor' && !d.playing && d.t >= 2 - 1e-9; }, null, 120000));
s = await state();
check('HOPS: both roads end at +e₃', vclose(s.a, E3, 1e-12) && vclose(s.b, E3, 1e-12));
check('HOPS: the flags (images of e₂) are e₂ and −e₁, as R₁e₂R̃₁ and R₂e₂R̃₂ in SU(2)', vclose(s.fa, E2, 1e-12) && vclose(s.fb, [-1, 0, 0], 1e-12) && vclose(actM(UONCE, E2), E2, 1e-12) && vclose(actM(UTWICE, E2), [-1, 0, 0], 1e-12));
check('HOPS: at the end the difference rotor is exp(−π/4 e₁e₂)', mclose(fromBlades(s.D), EXP12, 1e-12));
s = await seek(1);
check('HOPS, hop 1: two hops are at e₂ (exp(−π/4 e₁e₂) e₁), one hop halfway up e₁∧e₃', vclose(s.b, E2, 1e-12) && vclose(s.a, [R2, 0, R2], 1e-12));
s = await seek(1.5);
const Uh = mm(rot(Math.cos(PI / 8), Math.sin(PI / 8), 1, 2), U12), Uo = rot(Math.cos(3 * PI / 16), Math.sin(3 * PI / 16), 0, 2);
check('HOPS, hop 1.5: both points agree with SU(2) partial rotors', vclose(s.b, actM(Uh, E1), 1e-12) && vclose(s.a, actM(Uo, E1), 1e-12));

// EQUATOR
s = await pick('equator');
check('EQUATOR: α = 60°, observer at e₂, not playing', s.scene === 'test' && close(s.t, PI / 3) && vclose(s.O, E2, 1e-12) && !s.playing);
check('EQUATOR: s₁ = (0, √3/2, ½), s₂ = (−√3/2, 0, ½); e₂ reads √3/2 and 0', vclose(s.a, [0, Math.sqrt(3) / 2, 0.5], 1e-12) && vclose(s.b, [-Math.sqrt(3) / 2, 0, 0.5], 1e-12) && close(s.ra, Math.sqrt(3) / 2, 1e-12) && close(s.rb, 0, 1e-12));
worst = 0; let onlyPoles = true;
for (let k = 0; k <= 48; k++) {
  const al = k * TAU / 48, p = await pairAt(al), sa = [Math.cos(al), Math.sin(al), 0];
  worst = Math.max(worst, norm(sub(p.a, [0, Math.sin(al), Math.cos(al)])), norm(sub(p.b, [-Math.sin(al), 0, Math.cos(al)])), norm(sub(p.a, actM(UONCE, sa))), norm(sub(p.b, actM(UTWICE, sa))));
  const same = norm(sub(p.a, p.b)) < 1e-9;
  if (same !== Math.abs(Math.sin(al)) < 1e-9) onlyPoles = false;
  if (same && !close(Math.abs(p.a[2]), 1, 1e-9)) onlyPoles = false;
}
check('EQUATOR: s₁(α) = cos α e₃ + sin α e₂ and s₂(α) = cos α e₃ − sin α e₁ at 49 values, matching SU(2)', worst < 1e-12, `max error ${worst}`);
check('EQUATOR: s₁ and s₂ coincide exactly where sin α = 0, and there at ±e₃', onlyPoles);
await page.click('#toPole'); s = await state();
check('EQUATOR, observer at e₃: both read cos α', close(s.ra, 0.5, 1e-12) && close(s.rb, 0.5, 1e-12));

// FRAMES
s = await pick('frames');
check('FRAMES plays once round and stops', await until(page, () => { const d = window.DEGEN_DEBUG.state; return d.scene === 'frames' && !d.playing && d.t >= 2 * Math.PI - 1e-9; }, null, 120000));
worst = 0;
const Rz = (g) => [[Math.cos(g), -Math.sin(g), 0], [Math.sin(g), Math.cos(g), 0], [0, 0, 1]];
const m3 = (M, v) => M.map((r) => dot(r, v));
for (let k = 0; k < 16; k++) {
  const g = k * TAU / 16 + 0.1; s = await seek(g);
  const e1g = m3(Rz(g), E1), e2g = m3(Rz(g), E2), al = PI / 3;
  const sa = [0, 1, 2].map((i) => Math.cos(al) * e1g[i] + Math.sin(al) * e2g[i]);
  const U1 = madd(msc(I2, R2), msc(mm(vm(e1g), SZ), -R2)), U2 = mm(madd(msc(I2, R2), msc(mm(vm(e2g), SZ), -R2)), madd(msc(I2, R2), msc(mm(vm(e1g), vm(e2g)), -R2)));
  const nb = [0, 1, 2].map((i) => (e1g[i] + e2g[i]) * R2);
  worst = Math.max(worst, norm(sub(s.a, actM(U1, sa))), norm(sub(s.b, actM(U2, sa))), Math.abs(s.gap), Math.abs(s.ra - 0.5), norm(sub(s.blind.map(Math.abs), nb.map(Math.abs))), Math.abs(dot(s.blind, E3)));
}
check('FRAMES: images agree with SU(2) rotors of the turned frame, the pole reads ½ twice, the blind normal is ±(e₁(γ) + e₂(γ))/√2', worst < 1e-12, `max error ${worst}`);
check('FRAMES: common normal of two blind-circle differences is ±e₃', vclose(s.common.map(Math.abs), [0, 0, 1], 1e-12));

// PULLBACK: turning the states about k equals pulling the observer back; with k = O nothing changes
s = await pick('pullback');
check('PULLBACK plays once round and stops', await until(page, () => { const d = window.DEGEN_DEBUG.state; return d.scene === 'pull' && !d.playing && d.t >= 2 * Math.PI - 1e-9; }, null, 120000));
s = await state();
const KP = sph(60 * DEG, 220 * DEG), OP = sph(45 * DEG, 90 * DEG), V1 = [Math.sin(PI / 3), 0, Math.cos(PI / 3)], V2 = [0, Math.sin(PI / 3), Math.cos(PI / 3)];
check('PULLBACK: tilted axis k = (60°, 220°), observer at β = 45° in e₂∧e₃, states v₁, v₂ of θ = 60°, φ = 90°', vclose(s.k, KP, 1e-12) && vclose(s.O, OP, 1e-12) && vclose(s.a0, V1, 1e-12) && vclose(s.b0, V2, 1e-12) && s.axis === 'k');
const iM = (M) => M.map((r) => r.map((z) => [-z[1], z[0]]));
const Uk = (k, psi) => madd(msc(I2, Math.cos(psi / 2)), msc(iM(vm(k)), -Math.sin(psi / 2)));   // exp(−iψ k·σ/2)
const rhoOf = (v) => msc(madd(I2, vm(v)), 0.5);
worst = 0;
for (let j = 0; j < 12; j++) {
  const psi = j * TAU / 12 + 0.05; s = await seek(psi);
  const U = Uk(KP, psi), E = rhoOf(OP);
  for (const [v, x, rd, pd] of [[V1, s.a, s.ra, s.pa], [V2, s.b, s.rb, s.pb]]) {
    const r = rhoOf(v);
    const fwd = tr(mm(mm(mm(U, r), dag(U)), E)), back = tr(mm(r, mm(mm(dag(U), E), U)));   // Tr(UρU†E) and Tr(ρ U†EU)
    worst = Math.max(worst, norm(sub(x, actM(U, v))), Math.abs(fwd[0] - back[0]), Math.abs(fwd[1]), Math.abs(fwd[0] - (1 + rd) / 2), Math.abs(back[0] - (1 + pd) / 2));
  }
  worst = Math.max(worst, norm(sub(s.Op, actM(dag(U), OP))));
}
check('PULLBACK: at 12 angles the turned states match SU(2), and Tr(UρU†E) = Tr(ρ U†EU) equal the two readings (1 + O·Rv)/2, (1 + R⁻¹O·v)/2', worst < 1e-12, `max error ${worst}`);
s = await seek(2 * PI / 3);
check('PULLBACK at ψ = 120°: both ways read 0.61 and −0.62 (card note)', close(s.ra, s.pa, 1e-12) && close(s.rb, s.pb, 1e-12) && s.ra.toFixed(2) === '0.61' && s.rb.toFixed(2) === '-0.62', `${s.ra} ${s.rb}`);
await page.click('#axisChips [data-axis="O"]'); s = await state();
worst = 0;
for (let j = 0; j < 12; j++) { const psi = j * TAU / 12 + 0.05; s = await seek(psi); worst = Math.max(worst, norm(sub(s.Op, OP)), Math.abs(s.ra - dot(OP, V1)), Math.abs(s.rb - dot(OP, V2)), norm(sub(s.k, OP))); }
check('axis = O: the pulled-back observer stays at O and the readings never change over ψ', s.axis === 'O' && s.preset === null && worst < 1e-12, `max error ${worst}`);
await page.click('#axisChips [data-axis="k"]'); await settle(page);
await page.click('#toPole'); await settle(page);   // the later checks read from the pole, where FRAMES left the observer

/* ---------- controls ---------- */
await page.click('[data-scene="address"]'); s = await state();
check('scene chip Address: switches and leaves the card', s.scene === 'address' && s.preset === null && close(s.max, TAU));
await page.click('[data-scene="rotor"]'); s = await state();
check('scene chip Rotors: rail runs over two hops', s.scene === 'rotor' && close(s.max, 2));
await page.click('[data-scene="test"]'); s = await state();
check('scene chip Test', s.scene === 'test');
await page.click('[data-scene="frames"]'); s = await state();
check('scene chip Frames shows the α field', s.scene === 'frames' && await page.isVisible('#alpha'));
await page.click('[data-scene="pull"]'); s = await state();
check('scene chip Pull shows the axis chips and runs ψ over 360°', s.scene === 'pull' && close(s.max, TAU) && await page.isVisible('#axisChips'));
await page.click('[data-scene="frames"]'); s = await state();
await page.$eval('#alpha', (el) => { el.value = '30'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await seek(0.4);
check('α field: the pole reads cos 30° twice', close(s.alpha, 30 * DEG, 1e-12) && close(s.ra, Math.cos(30 * DEG), 1e-12) && close(s.rb, Math.cos(30 * DEG), 1e-12));
await page.click('[data-scene="address"]');
await page.$eval('#theta', (el) => { el.value = '40'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await seek(1);
check('θ field: v₁ follows θ = 40°', close(s.theta, 40 * DEG, 1e-12) && vclose(s.a, v1f(40 * DEG), 1e-12));
await page.$eval('#beta', (el) => { el.value = '70'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
await page.$eval('#azim', (el) => { el.value = '200'; el.dispatchEvent(new Event('input', { bubbles: true })); }); s = await state();
check('β and azimuth fields move the observer and the gap follows Δ(O)', vclose(s.O, sph(70 * DEG, 200 * DEG), 1e-12) && close(s.gap, gapf(s.O, 40 * DEG, 1), 1e-12));
await page.click('#toE2'); s = await state();
check('button: to the equator e₂', vclose(s.O, E2, 1e-12));
await page.click('#toPole'); s = await state();
check('button: to the pole +e₃, gap zero', vclose(s.O, E3, 1e-12) && close(s.gap, 0, 1e-12));
await page.click('#toE2'); await settle(page); await page.focus('body'); await page.keyboard.press('p'); s = await state();
check('key P: back to the pole', vclose(s.O, E3, 1e-12));
await seek(2); await page.click('#rew'); s = await state();
check('⏮ returns the rail to 0', close(s.t, 0));
await page.click('#play');
check('▶ plays', await until(page, () => window.DEGEN_DEBUG.state.t > 0));
await page.click('#play'); await settle(page);
// drag the observer from the pole to a point on the front of the sphere
await page.evaluate(() => window.DEGEN_DEBUG.seek(1));
const from = await page.evaluate(() => window.DEGEN_DEBUG.screen([0, 0, 1]));
const target = sph(1.0, -2.0 + PI);   // towards the viewer
const to = await page.evaluate((v) => window.DEGEN_DEBUG.screen(v), target);
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 8 }); await page.mouse.up(); s = await state();
const cam = await page.evaluate(() => window.DEGEN_DEBUG.camera());
check('dragging the amber observer moves it (and not the camera)', norm(sub(s.O, target)) < 0.03 && close(cam.yaw, -2.0, 1e-9), JSON.stringify([s.O, target]));
check('no page errors', T.errors.length === 0, T.errors.slice(0, 3).join(' | '));

await T.finish();
