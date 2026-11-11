#!/usr/bin/env node
// Browser regression suite for BERRY//LOOP (books/quantum-geometry/viz/berry-loop/).
//   node books/quantum-geometry/viz/tests/berry-loop.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page computes the enclosed area from a fan of spherical triangles, the turn by rotating the arrow along each
// great-circle arc, and the phase from products of spinor inner products. The suite rebuilds each claim another way:
// the area from the turning angles at the corners (Gauss–Bonnet), the carried arrow by many small projection steps,
// the product of inner products as the trace Tr(ρ₀ρ₁⋯ρₙ₋₁) of Bloch density matrices, the rotations as 3 × 3 matrix
// products, and the zeros of the comb from a winding count of the formula. It reads the page through
// window.BERRY_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'berry-loop';
const T = await session();
const { check } = T;
const PI = Math.PI, TAU = 2 * PI;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub = (a, b) => a.map((x, i) => x - b[i]);
const scale = (a, k) => a.map((x) => x * k);
const norm = (a) => Math.sqrt(dot(a, a));
const unit = (a) => scale(a, 1 / norm(a));
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));
const wrap = (a) => a - TAU * Math.round(a / TAU);
/** Into (−2π, 2π]: oriented areas are defined modulo 4π. */
const mod4pi = (a) => { let x = a % (2 * TAU); if (x > TAU + 1e-9) x -= 2 * TAU; if (x <= -TAU + 1e-9) x += 2 * TAU; return x; };

/* ---------- independent models ---------- */
// Gauss–Bonnet for a geodesic polygon: Ω = 2π − Σ (signed turning angle at each corner), mod 4π
const tangentToward = (a, b) => unit(sub(b, scale(a, dot(a, b))));
const sgnAngle = (n, r, v) => Math.atan2(dot(n, cross(r, v)), dot(r, v));
function areaGB(V) {
  const n = V.length; let turn = 0;
  for (let k = 0; k < n; k++) {
    const a = V[(k - 1 + n) % n], p = V[k], b = V[(k + 1) % n];
    turn += sgnAngle(p, scale(tangentToward(p, a), -1), tangentToward(p, b));
  }
  return mod4pi(TAU - turn);
}
// carry a tangent vector by small steps: move, then project back onto the tangent plane and renormalize
function slerp(u, w, t) { const th = Math.acos(Math.max(-1, Math.min(1, dot(u, w)))); if (th < 1e-12) return u.slice(); const s = Math.sin(th); return u.map((x, i) => (Math.sin((1 - t) * th) * x + Math.sin(t * th) * w[i]) / s); }
function carrySteps(V, u0, steps = 4000) {
  let v = u0.slice();
  for (let k = 0; k < V.length; k++) {
    const a = V[k], b = V[(k + 1) % V.length];
    for (let j = 1; j <= steps; j++) { const p = slerp(a, b, j / steps); v = unit(sub(v, scale(p, dot(v, p)))); }
  }
  return v;
}
// density matrices ρ = ½(I + r·σ), complex 2 × 2 as [[re, im] …]
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
const rho = (r) => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
/** Tr(ρ₀ρ₁⋯ρₙ₋₁) = ⟨ψ₀,ψ₁⟩⟨ψ₁,ψ₂⟩⋯⟨ψₙ₋₁,ψ₀⟩ for pure states. */
function traceProduct(V) { let M = rho(V[0]); for (let k = 1; k < V.length; k++) M = mm(M, rho(V[k])); return ca(M[0][0], M[1][1]); }
const arg = (z) => Math.atan2(z[1], z[0]);
// rotation matrices
const Rx = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]];
const Ry = (a) => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]];
const mv = (M, v) => M.map((row) => dot(row, v));
const M3 = (A, B) => A.map((row) => [0, 1, 2].map((j) => row[0] * B[0][j] + row[1] * B[1][j] + row[2] * B[2][j]));
// the comb field and its winding round a pole
const field = (p) => sub([0, 0, 1], scale(p, p[2]));
function winding(q, eps = 0.1, N = 720) {
  const e1 = unit(cross(q, Math.abs(q[2]) < 0.9 ? [0, 0, 1] : [0, 1, 0])), e2 = cross(q, e1); let tot = 0, prev = null;
  for (let i = 0; i <= N; i++) {
    const a = TAU * i / N, p = q.map((x, j) => Math.cos(eps) * x + Math.sin(eps) * (Math.cos(a) * e1[j] + Math.sin(a) * e2[j])), w = field(p), ang = Math.atan2(dot(w, e2), dot(w, e1));
    if (prev != null) tot += wrap(ang - prev); prev = ang;
  }
  return Math.round(tot / TAU);
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.BERRY_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.BERRY_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const N = [0, 0, 1], X = [1, 0, 0], Y = [0, 1, 0];

/** All the loop claims for the loop the page shows now, against the independent models. */
async function loopClaims(label, s) {
  const gb = areaGB(s.V);
  check(`${label}: area Ω agrees with Gauss–Bonnet from the corner angles`, close(mod4pi(s.area), gb, 1e-9), `${s.area} vs ${gb}`);
  const end = carrySteps(s.V, s.u0);
  check(`${label}: the carried arrow agrees with step-by-step projection transport`, vclose(s.endArrow, end, 2e-3), JSON.stringify([s.endArrow, end]));
  check(`${label}: the arrow comes back turned by Ω (mod 2π), measured on the independent arrow`, close(wrap(sgnAngle(s.V[0], s.u0, end) - gb), 0, 3e-3));
  check(`${label}: the unwrapped turn on the page is the area`, close(s.turnTotal, s.area, 1e-9));
  const tp = traceProduct(s.V);
  check(`${label}: Δ equals Tr(ρ₀ρ₁⋯) of the Bloch density matrices`, close(s.delta[0], tp[0], 1e-12) && close(s.delta[1], tp[1], 1e-12));
  check(`${label}: arg Δ = Ω/2 (mod 2π), and the unwrapped phase is Ω/2`, close(wrap(arg(tp) - gb / 2), 0, 1e-7) && close(s.phaseTotal, s.area / 2, 1e-7));
  const sq = s.V.map((a, k) => (1 + dot(a, s.V[(k + 1) % s.V.length])) / 2);
  check(`${label}: |⟨ψₖ, ψₖ₊₁⟩|² = (1 + cos of the arc)/2`, s.overlaps.every((z, k) => close(z[0] ** 2 + z[1] ** 2, sq[k], 1e-12)));
}

// opening view: OCTANT at its telling frame
let s = await state();
check('opens on the OCTANT card walked all the way round', s.preset === 'octant' && s.scene === 'loop' && close(s.t, 3) && !s.playing);
check('OCTANT: the corners are N, +X, +Y', vclose(s.V[0], N) && vclose(s.V[1], X) && vclose(s.V[2], Y));
check('OCTANT: Ω = π/2, an eighth of the sphere', close(s.area, PI / 2, 1e-9) && close(s.area / (4 * PI), 1 / 8, 1e-9));
check('OCTANT: Δ = (1 + i)/4 and arg Δ = π/4', close(s.delta[0], 0.25, 1e-12) && close(s.delta[1], 0.25, 1e-12) && close(s.phaseTotal, PI / 4, 1e-9));
check('OCTANT: the arrow set out towards +X and comes back pointing to +Y', vclose(s.u0, X, 1e-12) && vclose(s.endArrow, Y, 1e-9));
check('OCTANT: the readout and the HUD print π/2 and π/4', (await page.textContent('#roKey')).trim() === 'π/2' && (await page.textContent('#hudSub')).includes('π/4'));
await loopClaims('OCTANT', s);
// along the way: the turn equals the swept area, by Gauss–Bonnet on the loop start → … → current point → c → start
let worst = 0;
for (const t of [0.4, 1, 1.37, 2.2, 2.81]) {
  s = await seek(t);
  const k = Math.min(s.n - 1, Math.floor(t)), poly = [...s.V.slice(0, k + 1), s.p, s.c].filter((x, i, a) => i === 0 || norm(sub(x, a[i - 1])) > 1e-9);
  const gb = poly.length >= 3 ? areaGB(poly) : 0, tp = traceProduct(poly);
  worst = Math.max(worst, Math.abs(s.swept - gb), Math.abs(s.turn - gb), Math.abs(wrap(arg(tp) - s.phase)), Math.abs(s.phase - gb / 2));
}
check('OCTANT, part of the way: turn = area swept = 2 × phase, against Gauss–Bonnet and the trace product', worst < 1e-8, `max error ${worst}`);

// EQUATOR
await pick('equator');
check('EQUATOR plays by itself', await until(page, () => window.BERRY_DEBUG.state.t > 0));
check('EQUATOR walks the four edges and stops', await until(page, () => { const d = window.BERRY_DEBUG.state; return !d.playing && d.t >= 4 - 1e-9; }, null, 180000));
s = await state();
check('EQUATOR: Ω = 2π, the northern hemisphere', close(s.area, TAU, 1e-9) && close(s.turnTotal, TAU, 1e-9));
check('EQUATOR: the arrow comes back exactly as it set out', vclose(s.endArrow, s.u0, 1e-9));
check('EQUATOR: phase π, Δ = −1/4', close(s.phaseTotal, PI, 1e-9) && close(s.delta[0], -0.25, 1e-12) && close(s.delta[1], 0, 1e-12));
const lat = (t, z, w) => [(1 - t) + t * (z[0] * w[0] + z[1] * w[1]), t * (z[0] * w[1] - z[1] * w[0])];   // (1 − t) + t·z̄w
const zs = s.V.map((v) => [v[0], v[1]]);
check('EQUATOR: each neighbouring inner product is (1 − t) + t·z̄w at t = ½, i.e. (1 + i)/2', s.overlaps.every((z, k) => vclose(z, lat(0.5, zs[k], zs[(k + 1) % 4]), 1e-12) && vclose(z, [0.5, 0.5], 1e-12)));
await loopClaims('EQUATOR', s);

// REVERSE
await pick('reverse'); await until(page, () => !window.BERRY_DEBUG.state.playing, null, 180000);
const oct = [N, X, Y];
s = await state();
check('REVERSE: the corners are N, +Y, +X', vclose(s.V[0], N) && vclose(s.V[1], Y) && vclose(s.V[2], X));
check('REVERSE: Ω = −π/2, turn −π/2, phase −π/4', close(s.area, -PI / 2, 1e-9) && close(s.turnTotal, -PI / 2, 1e-9) && close(s.phaseTotal, -PI / 4, 1e-9));
const sqOct = oct.map((a, k) => (1 + dot(a, oct[(k + 1) % 3])) / 2);
check('REVERSE: the squared moduli are those of OCTANT (all ½)', s.overlaps.every((z, k) => close(z[0] ** 2 + z[1] ** 2, sqOct[k], 1e-12) && close(z[0] ** 2 + z[1] ** 2, 0.5, 1e-12)));
check('REVERSE: Δ is the complex conjugate of OCTANT’s', close(s.delta[0], 0.25, 1e-12) && close(s.delta[1], -0.25, 1e-12));
await loopClaims('REVERSE', s);

// ORDER
await pick('order');
check('ORDER plays its two steps', await until(page, () => { const d = window.BERRY_DEBUG.state; return d.scene === 'order' && !d.playing && d.t >= 2 - 1e-9; }));
const q = PI / 2;
const atStep = async (t) => seek(t);
s = await atStep(1);
check('ORDER, after step one: the points are R_y(π/2)e₃ = +X and R_x(π/2)e₃ = −Y', vclose(s.pA, mv(Ry(q), N), 1e-12) && vclose(s.pB, mv(Rx(q), N), 1e-12) && vclose(s.pA, X, 1e-12) && vclose(s.pB, [0, -1, 0], 1e-12));
const a1 = s.aA, b1 = s.aB;
s = await atStep(2);
check('ORDER: R_x R_y e₃ = +X and R_y R_x e₃ = −Y by matrix products', vclose(s.pA, mv(M3(Rx(q), Ry(q)), N), 1e-12) && vclose(s.pB, mv(M3(Ry(q), Rx(q)), N), 1e-12));
check('ORDER: the arrows are the matrix images of the starting arrow', vclose(s.aA, mv(M3(Rx(q), Ry(q)), s.u0), 1e-12) && vclose(s.aB, mv(M3(Ry(q), Rx(q)), s.u0), 1e-12));
check('ORDER: step two leaves the points but turns each arrow by 90°', close(Math.acos(dot(a1, s.aA)), q, 1e-9) && close(Math.acos(dot(b1, s.aB)), q, 1e-9));
check('ORDER: the two endpoints are 90° apart, and the readout says so', close(dot(s.pA, s.pB), 0, 1e-12) && (await page.textContent('#roKey')).trim() === '90°' && (await page.textContent('#roD')).trim() === '90°');

// COMB
await pick('comb');
check('COMB walks to the pole', await until(page, () => { const d = window.BERRY_DEBUG.state; return d.scene === 'comb' && !d.playing && d.t >= 1 - 1e-9; }));
s = await state();
check('COMB: at the North Pole the arrow is zero', vclose(s.p, N, 1e-12) && norm(s.v) < 1e-12);
worst = 0;
for (const t of [0, 0.2, 0.5, 0.77]) { s = await seek(t); const th = PI / 2 * (1 - t); worst = Math.max(worst, ...sub(s.v, field(s.p)).map(Math.abs), Math.abs(norm(s.v) - Math.sin(th)), Math.abs(s.p[2] - Math.cos(th))); }
check('COMB: on the way the arrow is e₃ − (p·e₃)p, of length sin θ', worst < 1e-12, `max error ${worst}`);
check('COMB: at +X the arrow is e₃', vclose((await seek(0)).v, N, 1e-12));
const wn = winding(N), ws = winding([0, 0, -1]);
check('COMB: the page’s indices are the winding counts (+1, +1) and add up to 2', s.indices[0] === wn && s.indices[1] === ws && wn + ws === 2);
let zeros = 0;
for (let i = 0; i <= 180; i++) for (let j = 0; j < 360; j += 3) { const th = i * PI / 180, ph = j * PI / 180, p = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; if (norm(field(p)) < 1e-9) zeros++; }
check('COMB: on a 1° grid the field vanishes only at the two poles', zeros === 2 * 120);

// controls: scene chips
await page.click('#sceneChips [data-scene="loop"]'); s = await state();
check('the Loop chip returns to the loop and leaves the card', s.scene === 'loop' && s.preset === null);
await page.click('#sceneChips [data-scene="order"]'); s = await state();
check('the Order chip shows the two orders from the start', s.scene === 'order' && close(s.t, 0));
await page.click('#sceneChips [data-scene="comb"]'); s = await state();
check('the Comb chip shows the comb', s.scene === 'comb');

// controls: add, remove, reverse, R key
await pick('octant'); await page.evaluate(() => window.BERRY_DEBUG.seek(99));
const before = await state();
await page.click('#addV'); s = await state();
check('“Add a corner” puts a fourth corner mid-way on the last edge and leaves the card', s.n === 4 && s.preset === null && close(dot(s.V[3], unit([0, 1, 1])), 1, 1e-12));
check('…and the area, the turn and the phase do not change', close(s.area, before.area, 1e-9) && close(s.turnTotal, before.turnTotal, 1e-9) && close(s.phaseTotal, before.phaseTotal, 1e-7) && close(wrap(arg(s.delta) - arg(before.delta)), 0, 1e-9));
await loopClaims('four corners', s);
await page.click('#delV'); s = await state();
check('“Remove a corner” goes back to three', s.n === 3 && close(s.area, PI / 2, 1e-9));
check('“Remove” is disabled at three corners', await page.evaluate(() => document.getElementById('delV').disabled));
await page.click('#revV'); s = await state();
check('“Reverse” keeps the start and flips Ω', vclose(s.V[0], N) && vclose(s.V[1], Y) && close(s.area, -PI / 2, 1e-9));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('r'); s = await state();
check('R reverses back', vclose(s.V[1], X) && close(s.area, PI / 2, 1e-9));

// dragging a corner
await pick('octant'); await page.evaluate(() => window.BERRY_DEBUG.seek(99));
const c2 = await page.evaluate(() => window.BERRY_DEBUG.corner(2));
await page.mouse.move(c2[0], c2[1]); await page.mouse.down(); await page.mouse.move(c2[0] - 40, c2[1] - 70, { steps: 5 }); await page.mouse.up();
s = await state();
const target = await page.evaluate(([x, y]) => window.BERRY_DEBUG.under(x, y), [c2[0] - 40, c2[1] - 70]);
check('dragging a cyan corner moves it under the pointer and leaves the card', vclose(s.V[2], target, 1e-6) && s.preset === null && !vclose(s.V[2], Y, 1e-3));
await loopClaims('dragged triangle', s);
const cam0 = await page.evaluate(() => window.BERRY_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 60, box.y + box.height - 120); await page.mouse.down(); await page.mouse.move(box.x + 160, box.y + box.height - 150, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.BERRY_DEBUG.camera());
check('dragging empty space turns the view and leaves the loop alone', cam1.yaw !== cam0.yaw && vclose((await state()).V[2], s.V[2]));

// many random loops, built through the page's own controls: add corners, then drag each to a target point
let bad = 0, placed = 0;
const D = [0.62, 0.62, 0.48];   // roughly towards the viewer of the OCTANT camera, so every target is on the front
for (let r = 0; r < 6; r++) {
  const n = 3 + (r % 3), e1 = unit(cross(D, [0, 0, 1])), e2 = cross(unit(D), e1), V = [];
  for (let k = 0; k < n; k++) {
    const a = TAU * k / n + 0.35 * Math.sin(7 * r + k), rad = 0.35 + 0.35 * (0.5 + 0.5 * Math.cos(3 * r + 2 * k));
    V.push(unit(unit(D).map((x, i) => Math.cos(rad) * x + Math.sin(rad) * (Math.cos(a) * e1[i] + Math.sin(a) * e2[i]))));
  }
  await pick('octant'); await page.evaluate(() => window.BERRY_DEBUG.seek(99));
  for (let k = 3; k < n; k++) { await page.click('#addV'); await settle(page); }
  for (let k = 0; k < n; k++) {
    const from = await page.evaluate((i) => window.BERRY_DEBUG.corner(i), k), to = await page.evaluate((v) => window.BERRY_DEBUG.screen(v), V[k]);
    await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 4 }); await page.mouse.up(); await settle(page);
  }
  s = await state();
  if (s.n === n && s.V.every((v, k) => norm(sub(v, V[k])) < 0.02)) placed++;
  const gb = areaGB(s.V), tp = traceProduct(s.V), end = carrySteps(s.V, s.u0, 2000);
  if (!(close(mod4pi(s.area), gb, 1e-8) && close(wrap(arg(tp) - gb / 2), 0, 1e-8) && vclose(s.endArrow, end, 4e-3) && close(wrap(arg(tp) - s.phaseTotal), 0, 1e-8))) bad++;
}
check('six loops dragged into place corner by corner (three to five corners)', placed === 6, `${placed} of 6 placed`);
check('…and for each, area, carried arrow and phase agree with the independent models', bad === 0, `${bad} disagreed`);

// rail and keyboard
await pick('octant'); await until(page, () => !window.BERRY_DEBUG.state.playing, null, 180000);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Home'); s = await state();
check('Home returns to the start, arrow and reference together', close(s.t, 0) && vclose(s.v, s.ref, 1e-12) && close(s.turn, 0, 1e-12));
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps one edge (to +X)', close(s.t, 1) && vclose(s.p, X, 1e-12));
await page.keyboard.press('End'); check('End goes round to the start again', close((await state()).t, 3));
await page.keyboard.press('ArrowLeft'); check('← steps back an edge', close((await state()).t, 2));
await page.keyboard.press('Home');
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.BERRY_DEBUG.state.t > 0));
await page.keyboard.press('Space');
check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ goes back to the start', close((await state()).t, 0));

// English
await page.click('[data-lang-set="en"]'); await pick('octant'); await page.evaluate(() => window.BERRY_DEBUG.seek(99)); await settle(page);
check('English: the HUD reads “Loop · Ω = π/2”', (await page.textContent('#hudBig')).trim() === 'Loop · Ω = π/2');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
