#!/usr/bin/env node
// Browser regression suite for ZYZ//COMPILE (books/quantum-geometry/viz/zyz-compile/).
//   node books/quantum-geometry/viz/tests/zyz-compile.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page multiplies rotors on Cl(3,0) blade masks. The suite recomputes everything with 2 × 2 complex matrices
// (SU(2): R_u(θ) = cos(θ/2) I − i sin(θ/2) σ_u, with e₁₂ ↔ iσ₃, e₁₃ ↔ −iσ₂, e₂₃ ↔ iσ₁) and reads rotations off as
// M_jk = ½ Tr(σ_j U σ_k U†). It reads the page through window.ZYZ_DEBUG and never calls the page's own model.
import { readFileSync } from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'zyz-compile';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.length === b.length && a.every((x, i) => close(x, b[i], eps));

/* ---------- independent model: SU(2) matrices ---------- */
const c = (re, im = 0) => [re, im];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], conj = (a) => [a[0], -a[1]];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const dag = (A) => [[conj(A[0][0]), conj(A[1][0])], [conj(A[0][1]), conj(A[1][1])]];
const SIG = [[[c(0), c(1)], [c(1), c(0)]], [[c(0), c(0, -1)], [c(0, 1), c(0)]], [[c(1), c(0)], [c(0), c(-1)]]];
const su = (ax, th) => { const k = { x: 0, y: 1, z: 2 }[ax], s = Math.sin(th / 2), C = Math.cos(th / 2), S = SIG[k];
  return [0, 1].map((i) => [0, 1].map((j) => cadd(c(i === j ? C : 0), cmul(c(0, -s), S[i][j])))); };
const share = (t, i) => Math.max(0, Math.min(1, t - i));
const U = (a, b, g, t = 3) => mm(mm(su('z', a * share(t, 2)), su('y', b * share(t, 1))), su('z', g * share(t, 0)));
/** The rotor coefficients [s, b12, b13, b23] of U = s I + b12 iσ₃ + b13 (−iσ₂) + b23 iσ₁. */
const coeffsOf = (u) => [u[0][0][0], u[0][0][1], u[1][0][0], u[1][0][1]];
const rotm = (u) => [0, 1, 2].map((j) => [0, 1, 2].map((k) => { const m = mm(mm(mm(SIG[j], u), SIG[k]), dag(u)); return (m[0][0][0] + m[1][1][0]) / 2; }));
const mv = (M, v) => M.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
const col = (M, k) => [M[0][k], M[1][k], M[2][k]];
/** Rotation by φ about the unit axis n, written as a matrix (Euler–Rodrigues form, not the page's vector formula). */
const axisMatrix = (n, phi) => { const C = Math.cos(phi), S = Math.sin(phi), V = 1 - C, [x, y, z] = n;
  return [[C + x * x * V, x * y * V - z * S, x * z * V + y * S], [y * x * V + z * S, C + y * y * V, y * z * V - x * S], [z * x * V - y * S, z * y * V + x * S, C + z * z * V]]; };
const rotorErr = (s, t) => { const q = coeffsOf(U(s.alpha, s.beta, s.gamma, t)), r = s.rotor; return Math.max(...[0, 3, 5, 6].map((m, i) => Math.abs(r[m] - q[i]))); };

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.ZYZ_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.ZYZ_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

let s = await state();
check('opens on the Z·Y·Z card at the end of the three turns', s.preset === 'chain' && close(s.t, 3) && !s.playing);
check('Z·Y·Z: the angles are (0.37, −0.81, 0.52) and v starts at e₁', close(s.alpha, 0.37, 1e-15) && close(s.beta, -0.81, 1e-15) && close(s.gamma, 0.52, 1e-15) && vclose(s.v0, [1, 0, 0]));
const ex = coeffsOf(U(0.37, -0.81, 0.52));
check('Z·Y·Z: the compiled rotor equals the SU(2) product R_z(α) R_y(β) R_z(γ)', rotorErr(s, 3) < 1e-12 && vclose([0, 3, 5, 6].map((m) => s.full[m]), ex, 1e-12));
check('Z·Y·Z: … and the chapter\'s 0.829592 − 0.395635 e₁₂ − 0.392911 e₁₃ + 0.029524 e₂₃', vclose([0, 3, 5, 6].map((m) => s.full[m]), [0.829592, -0.395635, -0.392911, 0.029524], 5e-7));
check('Z·Y·Z: only the even masks 0, 3, 5, 6 carry anything', [1, 2, 4, 7].every((m) => Math.abs(s.full[m]) < 1e-15));
const M = rotm(U(0.37, -0.81, 0.52)), EXM = [[0.378188, -0.633230, -0.675273], [0.679631, 0.685203, -0.261913], [0.628550, -0.359884, 0.689498]];
check('Z·Y·Z: the tripod Re₁, Re₂, Re₃ are the columns of ½Tr(σⱼUσₖU†) and of the chapter\'s matrix', [0, 1, 2].every((k) => vclose(s.frame[k], col(M, k), 1e-12) && vclose(s.columns[k], col(EXM, k), 5e-7)));
check('Z·Y·Z: v = Re₁ and the head-up line shows the rotor', vclose(s.v, col(M, 0), 1e-12) && s.hud.includes('0.830 − 0.396 e₁₂ − 0.393 e₁₃ + 0.030 e₂₃'));
check('the readout shows the rotor to six places and RR̃ = 1', (await page.textContent('#roRotor')).includes('0.829592 − 0.395635 e₁₂ − 0.392911 e₁₃ + 0.029524 e₂₃') && (await page.textContent('#roRotorSub')).includes('1.000000000000'));

// along the rail: every partial rotor and every arrow
let worst = 0, unit = 0;
for (let i = 0; i <= 60; i++) {
  const t = 3 * i / 60, x = await seek(t), q = coeffsOf(U(x.alpha, x.beta, x.gamma, t));
  worst = Math.max(worst, rotorErr(x, t), ...mv(rotm(U(x.alpha, x.beta, x.gamma, t)), x.v0).map((y, k) => Math.abs(y - x.v[k])));
  unit = Math.max(unit, Math.abs(q.reduce((a, b) => a + b * b, 0) - 1), Math.abs(x.rotor[0] ** 2 + x.rotor[3] ** 2 + x.rotor[5] ** 2 + x.rotor[6] ** 2 - 1));
}
check('61 rail positions: partial rotor and sandwiched arrow agree with SU(2) and ½Tr(σⱼUσₖU†)', worst < 1e-12, `max error ${worst}`);
check('the strip\'s claim: scalar² + area² stays 1 along the rail', unit < 1e-12, `${unit}`);
s = await seek(1.5);
check('during turn 2 (about y) the page names segment β and its axis', s.seg === 1 && s.segAxis === 'y' && close(s.segAngle, -0.405, 1e-12));

// the arrow as a pure state
let rhoErr = 0;
for (const t of [0, 0.7, 1.9, 3]) {
  const x = await seek(t), want = [0, 1].map((i) => [0, 1].map((j) => { let z = c(i === j ? 0.5 : 0); for (let k = 0; k < 3; k++) z = cadd(z, cmul(c(x.v[k] / 2), SIG[k][i][j])); return z; }));
  rhoErr = Math.max(rhoErr, ...[0, 1].flatMap((i) => [0, 1].flatMap((j) => [Math.abs(want[i][j][0] - x.rho[i][j][0]), Math.abs(want[i][j][1] - x.rho[i][j][1])])));
  const sq = mm(want, want);
  rhoErr = Math.max(rhoErr, Math.abs(x.trRho - 1), Math.abs(x.normRho - 1), ...x.blochRho.map((y, k) => Math.abs(y - x.v[k])), ...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(sq[i][j][0] - want[i][j][0], sq[i][j][1] - want[i][j][1]))));
}
check('ρ = ½(I + v·σ): Tr ρ = 1, bloch(ρ) = v, ρ² = ρ, ‖bloch ρ‖ = 1', rhoErr < 1e-12, `${rhoErr}`);

// SANDWICH
await pick('sandwich'); s = await seek(1);
check('SANDWICH: one turn of 90° about z, the other two angles zero', close(s.gamma, Math.PI / 2) && s.alpha === 0 && s.beta === 0 && s.seg === 0 && s.segAxis === 'z');
check('SANDWICH: v goes from (√3/2, 0, ½) to (0, √3/2, ½), as SU(2) says', vclose(s.v0, [Math.sqrt(3) / 2, 0, 0.5], 1e-15) && vclose(s.v, mv(rotm(U(0, 0, Math.PI / 2)), s.v0), 1e-12) && vclose(s.v, [0, Math.sqrt(3) / 2, 0.5], 1e-12));
const heights = await page.evaluate(() => Array.from({ length: 21 }, (_, i) => window.ZYZ_DEBUG.at(i / 20)));
check('SANDWICH: the shadow on the axis (½e₃) never moves, the in-plane part keeps its length √3/2', heights.every((p) => close(p[2], 0.5, 1e-12) && close(Math.hypot(p[0], p[1]), Math.sqrt(3) / 2, 1e-12)));
check('SANDWICH: the fan is split into two halves, 45° + 45°', s.half && (await page.$$eval('.stage .tag', (els) => els.some((e) => !e.hidden && e.textContent.includes('45.0° + 45.0°')))));
check('SANDWICH: the rotor is cos 45° − sin 45° e₁₂', vclose([0, 3, 5, 6].map((m) => s.full[m]), [Math.SQRT1_2, -Math.SQRT1_2, 0, 0], 1e-12));

// T
await pick('t'); s = await seek(3);
check('T-GATE: (π/4, 0, 0) compiles to 0.923880 − 0.382683 e₁₂', vclose([0, 3, 5, 6].map((m) => s.full[m]), [Math.cos(Math.PI / 8), -Math.sin(Math.PI / 8), 0, 0], 1e-12) && rotorErr(s, 3) < 1e-12);
const still = await page.evaluate(() => Array.from({ length: 21 }, (_, i) => window.ZYZ_DEBUG.at(2 * i / 20)));
check('T-GATE: during the two zero turns the arrow does not move', still.every((p) => vclose(p, [1, 0, 0], 1e-12)));
check('T-GATE: v ends 45° along the equator and Re₃ stays at the pole', vclose(s.v, [Math.SQRT1_2, Math.SQRT1_2, 0], 1e-12) && vclose(s.frame[2], [0, 0, 1], 1e-12) && vclose(s.axis, [0, 0, 1], 1e-12) && close(s.phi, Math.PI / 4, 1e-12));

// H
await pick('h'); s = await seek(3);
check('HADAMARD: (0, π/2, π) compiles to −(e₁₂ + e₂₃)/√2', vclose([0, 3, 5, 6].map((m) => s.full[m]), [0, -Math.SQRT1_2, 0, -Math.SQRT1_2], 1e-12) && rotorErr(s, 3) < 1e-12);
check('HADAMARD: Re₁ = e₃, Re₂ = −e₂, Re₃ = e₁', vclose(s.columns[0], [0, 0, 1], 1e-12) && vclose(s.columns[1], [0, -1, 0], 1e-12) && vclose(s.columns[2], [1, 0, 0], 1e-12));
check('HADAMARD: the single axis is (e₁ + e₃)/√2 and the angle 180°', s.fold && vclose(s.axis, [Math.SQRT1_2, 0, Math.SQRT1_2], 1e-12) && close(s.phi, Math.PI, 1e-12));
const pole = await page.evaluate(() => Array.from({ length: 11 }, (_, i) => window.ZYZ_DEBUG.at(i / 10)));
check('HADAMARD: in the first turn v sits on the z axis and stays at N; then it comes down to e₁', pole.every((p) => vclose(p, [0, 0, 1], 1e-12)) && vclose(s.v, [1, 0, 0], 1e-12));
s = await seek(0.5);
check('HADAMARD: … while the tripod turns (Re₁ at 90° halfway through the first turn)', vclose(s.frame[0], [0, 1, 0], 1e-12));

// ONE-AXIS
await pick('fold'); s = await seek(3);
const Mf = rotm(U(s.alpha, s.beta, s.gamma)), tr = Mf[0][0] + Mf[1][1] + Mf[2][2];
check('ONE-AXIS: the axis n is fixed by the rotation and the angle satisfies 1 + 2cos φ = Tr M', vclose(mv(Mf, s.axis), s.axis, 1e-12) && close(1 + 2 * Math.cos(s.phi), tr, 1e-12) && close(s.phi / DEG, 67.886, 5e-4));
const A = axisMatrix(s.axis, s.phi);
check('ONE-AXIS: one turn by φ about n equals the three turns, for v and the whole tripod', vclose(mv(A, s.v0), s.v, 1e-12) && [0, 1, 2].every((k) => vclose(col(A, k), s.columns[k], 1e-12)));
check('ONE-AXIS: the readout gives the angle 67.886°', (await page.textContent('#roPhi')).includes('67.886'));

// controls
await setRange('gamma', 40); await setRange('beta', 120); await setRange('alpha', -75); s = await state();
check('the three sliders set γ, β, α, leave the card and show the end', s.preset === null && close(s.gamma, 40 * DEG, 1e-12) && close(s.beta, 120 * DEG, 1e-12) && close(s.alpha, -75 * DEG, 1e-12) && close(s.t, 3) && rotorErr(s, 3) < 1e-12);
const Mr = rotm(U(s.alpha, s.beta, s.gamma));
check('after the sliders: the axis is still fixed and one turn about it still lands on v', vclose(mv(Mr, s.axis), s.axis, 1e-12) && vclose(mv(axisMatrix(s.axis, s.phi), s.v0), s.v, 1e-12));
await page.click('#vecChips [data-vec="e2"]'); s = await state();
check('the e₂ chip moves the start of v to e₂', vclose(s.v0, [0, 1, 0]) && vclose(s.v, col(Mr, 1), 1e-12));
await page.click('#foldChips [data-fold="off"]'); s = await state();
check('the axis chips switch the single axis off', !s.fold && await page.evaluate(() => document.getElementById('legFold').hidden));
await page.click('#foldChips [data-fold="on"]'); s = await state();
check('… and on again', s.fold && await page.evaluate(() => !document.getElementById('legFold').hidden));
let zeros = 0;
for (const [a, b, g] of [[0, 0, 0], [30, 0, -70], [-180, 180, 180], [90, -90, 45]]) {
  await setRange('alpha', a); await setRange('beta', b); await setRange('gamma', g); s = await state();
  zeros = Math.max(zeros, rotorErr(s, 3), ...[0, 1, 2].map((k) => Math.max(...s.columns[k].map((y, j) => Math.abs(y - rotm(U(a * DEG, b * DEG, g * DEG))[j][k])))));
}
check('four more triples (identity, β = 0, ±180°): rotor and columns agree with SU(2)', zeros < 1e-12, `${zeros}`);

// dragging the start ring and orbiting
await pick('chain'); await seek(0);
const from = await page.evaluate(() => window.ZYZ_DEBUG.screen(window.ZYZ_DEBUG.state.v0));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] - 50, from[1] - 60, { steps: 5 }); await page.mouse.up();
s = await state();
const to = await page.evaluate(() => window.ZYZ_DEBUG.screen(window.ZYZ_DEBUG.state.v0));
check('dragging the start ring puts it under the pointer and leaves the card', Math.hypot(to[0] - from[0] + 50, to[1] - from[1] + 60) < 1.5 && s.preset === null && close(Math.hypot(...s.v0), 1, 1e-12), JSON.stringify(to));
await seek(3); s = await state();
check('… and the three turns carry the new start as SU(2) says', vclose(s.v, mv(rotm(U(s.alpha, s.beta, s.gamma)), s.v0), 1e-12));
const cam0 = await page.evaluate(() => window.ZYZ_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 40, box.y + box.height - 90); await page.mouse.down(); await page.mouse.move(box.x + 140, box.y + box.height - 130, { steps: 4 }); await page.mouse.up();
check('dragging empty space orbits the camera and leaves v alone', (await page.evaluate(() => window.ZYZ_DEBUG.camera())).yaw !== cam0.yaw && vclose((await state()).v0, s.v0));

// playback, rail and keyboard
await pick('h');
check('clicking a card plays it', await until(page, () => { const d = window.ZYZ_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.ZYZ_DEBUG.seek(2.95)); await page.click('#play');
check('playback stops at the end of the third turn', await until(page, () => { const d = window.ZYZ_DEBUG.state; return !d.playing && d.t >= 3 - 1e-9; }));
await page.click('#rew'); s = await state(); check('⏮ returns to the start', close(s.t, 0) && vclose(s.v, s.v0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ makes one whole turn at a time', close((await state()).t, 2));
await page.keyboard.press('ArrowLeft'); check('← steps back one turn', close((await state()).t, 1));
await page.keyboard.press('End'); check('End goes to the end', close((await state()).t, 3));
await page.keyboard.press('Home'); check('Home returns to the start', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.ZYZ_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.ZYZ_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 1.25); s = await state();
check('scrubbing the rail turns part of a factor, as SU(2) says', close(s.t, 1.25) && rotorErr(s, 1.25) < 1e-12);

// the claim map: exactly the theorems of the chapter, as the lock file has them
const lock = JSON.parse(readFileSync(new URL('../../../../trureturing.lock.json', import.meta.url), 'utf8')).declarations;
const chapter = readFileSync(new URL('../../zh/ch26-single-qubit-rotor-compilation.md', import.meta.url), 'utf8');
const cited = [...new Set([...chapter.matchAll(/lean="([^"]+)"/g)].map((m) => m[1]))].filter((g) => lock[g] && lock[g].kind === 'theorem').sort();
const mapped = [...new Set(await page.$$eval('#drawer ul.claims a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid)))].sort();
const onPage = [...new Set(await page.$$eval('a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid)))].sort();
check('claim map: the drawer lists exactly the chapter\'s lean= theorems of the lock file (4)', cited.length === 4 && JSON.stringify(mapped) === JSON.stringify(cited), mapped.join(' '));
check('no Lean link on the page outside the chapter\'s theorems', JSON.stringify(onPage) === JSON.stringify(cited));

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', /^Turn \d/.test(await page.textContent('#hudBig')));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
