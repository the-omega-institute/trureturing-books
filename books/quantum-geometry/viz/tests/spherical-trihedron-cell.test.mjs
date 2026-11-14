// Browser suite for ORTHO//CELL (spherical-trihedron-cell): the quality gates every stage-first page passes, then the
// page's own claims, each checked against an algorithm written here (Pauli matrices for the rotors, the spherical law of
// cosines and Van Oosterom–Strackee for the angles, step-by-step projected transport for the holonomy), never against
// the page's own functions. Run alone:  node books/quantum-geometry/viz/tests/spherical-trihedron-cell.test.mjs
// and once with VIZ_SLOW_FRAMES=1000 before trusting it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, playsAfter, openStill, labelOverlaps, routeLocalFonts, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'spherical-trihedron-cell';
const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const T = await session();
const { check, page } = T;
const DBG = 'SPHERICAL_TRIHEDRON_DEBUG';
const CARDS = ['cell', 'once-ridge', 'twice-walls', 'cap-excess', 'gram-brick', 'octant-limit'];
const GIDS = [
  'D5/S3/Geometry/TwoAxisFiniteRotation.unit_perpendicular_pair',
  'D5/S3/Geometry/TwoAxisFiniteRotation.two_axis_finite_word',
  'D5/S3/ConceptDynamics/ObservationTopology/PartitionTopologyKernel.partition_inseparable_iff_kernel',
  'D5/S3/Quantum/Algebra/CovariantCommutator.covariant_commutator_formula',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/Algebra/FiniteLayerProjectionEscape.finite_layer_projection_escape'
];

/* ---------- 1. the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- 2. the source: colour tokens only, honest Lean links, paired languages, no model names ---------- */
const src = Object.fromEntries(['index.html', 'style.css', 'main.js'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![0-9A-Za-z_-])/g, FN = /\b(?:rgba?|hsla?)\s*\(/gi;
for (const [f, text] of Object.entries(src)) {
  check(`source ${f}: no literal colour (hex, rgb(), rgba(), hsl())`, !(text.match(HEX) || []).length && !(text.match(FN) || []).length, String((text.match(HEX) || text.match(FN) || []).slice(0, 3)));
}
const leanAttrs = [...src['index.html'].matchAll(/data-lean-gid="([^"]+)"/g)].map((m) => m[1]);
check('source: every data-lean-gid is one of the six locked theorems', leanAttrs.length > 0 && leanAttrs.every((g) => GIDS.includes(g)), leanAttrs.filter((g) => !GIDS.includes(g)).join(' | '));
check('source: all six locked theorems are cited', GIDS.every((g) => leanAttrs.includes(g)), GIDS.filter((g) => !leanAttrs.includes(g)).join(' | '));
const lock = JSON.parse(fs.readFileSync(path.join(DIR, '..', '..', '..', '..', 'trureturing.lock.json'), 'utf8'));
check('source: the six GIDs are theorems of trureturing.lock.json', GIDS.every((g) => lock.declarations[g] && lock.declarations[g].kind === 'theorem'), GIDS.filter((g) => !lock.declarations[g]).join(' | '));
const cls = (name) => (src['index.html'].match(new RegExp(`class="(?:[^"]*\\s)?${name}(?:\\s[^"]*)?"`, 'g')) || []).length;
check('source: every .zh fragment has its .en sibling (equal counts)', cls('zh') === cls('en') && cls('zh') > 20, `${cls('zh')} zh / ${cls('en')} en`);
const presetKeys = [...src['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]);
check('source: exactly the six experiment cards, in order', JSON.stringify(presetKeys) === JSON.stringify(CARDS), presetKeys.join(','));
const boxClasses = [...src['index.html'].matchAll(/class="lean(\s[^"]*)?"/g)].map((m) => m[1] || '');
check('source: evidence boxes use only the theme classes', boxClasses.length >= 10 && boxClasses.every((c) => /^(| num| model| argued| open)$/.test(c)), boxClasses.join(','));
check('source: the drawer separates the exact holonomy from the leading-order rotor term', /只在最低阶 O\(ε²\) 一致/.test(src['index.html']) && /only at the lowest order O\(ε²\)/.test(src['index.html']));

/* ---------- 3. independent mathematics ---------- */
const D = Math.PI / 180;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.hypot(a[0], a[1], a[2]);
const unit = (a) => { const n = norm(a); return [a[0] / n, a[1] / n, a[2] / n]; };
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol * Math.max(1, Math.abs(a), Math.abs(b));
const cellOf = (deg) => { const e = deg * D, s = Math.sin(e), c = Math.cos(e); return { e, s, c, A: [s, c, 0], B: [0, 1, 0], C: [0, c, s] }; };
// Cl⁺(3,0) through Pauli matrices: eₖ ↦ σₖ, so a rotor s + b₁₂e₁e₂ + b₁₃e₁e₃ + b₂₃e₂e₃ ↦ sI + i(b₂₃σ₁ − b₁₃σ₂ + b₁₂σ₃)
const C2 = { mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], add: (a, b) => [a[0] + b[0], a[1] + b[1]] };
const mm = (X, Y) => [[0, 0], [0, 1]].map((_, i) => [0, 1].map((j) => C2.add(C2.mul(X[i][0], Y[0][j]), C2.mul(X[i][1], Y[1][j]))));
const pauli = (r) => [[[r.s, r.b12], [-r.b13, r.b23]], [[r.b13, r.b23], [r.s, -r.b12]]];
const unpauli = (M) => ({ s: (M[0][0][0] + M[1][1][0]) / 2, b12: (M[0][0][1] - M[1][1][1]) / 2, b13: (M[1][0][0] - M[0][1][0]) / 2, b23: (M[0][1][1] + M[1][0][1]) / 2 });
const dagger = (M) => [[[M[0][0][0], -M[0][0][1]], [M[1][0][0], -M[1][0][1]]], [[M[0][1][0], -M[0][1][1]], [M[1][1][0], -M[1][1][1]]]];
const vecM = (v) => [[[v[2], 0], [v[0], -v[1]]], [[v[0], v[1]], [-v[2], 0]]];
const unvec = (M) => [M[1][0][0], M[1][0][1], M[0][0][0]];
const sandwich = (r, v) => unvec(mm(mm(pauli(r), vecM(v)), dagger(pauli(r))));
const wallRotors = (e) => ({ U12: { s: Math.cos(e / 2), b12: -Math.sin(e / 2), b13: 0, b23: 0 }, U23: { s: Math.cos(e / 2), b12: 0, b13: 0, b23: -Math.sin(e / 2) } });
const rmul = (x, y) => unpauli(mm(pauli(x), pauli(y)));
// spherical angle at a vertex from the three side lengths (law of cosines for sides)
const sphAngle = (opp, s1, s2) => Math.acos((Math.cos(opp) - Math.cos(s1) * Math.cos(s2)) / (Math.sin(s1) * Math.sin(s2)));
// parallel transport by many small projected steps along the great circles A → B → C → A
function transportAngle(deg, steps = 4000) {
  const { A, B, C } = cellOf(deg);
  let v = unit(sub(B, A.map((x) => x * dot(A, B))));
  const v0 = v.slice();
  for (const [p, q] of [[A, B], [B, C], [C, A]]) {
    const th = Math.acos(dot(p, q)), w = unit(sub(q, p.map((x) => x * dot(p, q))));
    for (let k = 1; k <= steps; k++) {
      const t = th * k / steps, x = [0, 1, 2].map((i) => p[i] * Math.cos(t) + w[i] * Math.sin(t));
      v = unit(sub(v, x.map((y) => y * dot(v, x))));
    }
  }
  return Math.atan2(dot(A, cross(v0, v)), dot(v0, v));
}
const expected = (deg) => {
  const { e, s, c, A, B, C } = cellOf(deg), G = [[1, c, c * c], [c, 1, c], [c * c, c, 1]];
  const det = G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  const cArc = Math.acos(c * c), alpha = sphAngle(e, e, cArc), triple = dot(A, cross(B, C));
  const omegaVO = 2 * Math.atan2(Math.abs(triple), 1 + dot(A, B) + dot(B, C) + dot(C, A));
  const { U12, U23 } = wallRotors(e), W = rmul(U23, U12), Wswap = rmul(U12, U23);
  const ab = Math.hypot(...sub(A, B)), bc = Math.hypot(...sub(C, B)), ac = Math.hypot(...sub(A, C));
  const betaFlat = Math.acos((ab * ab + bc * bc - ac * ac) / (2 * ab * bc));
  return { e, s, c, A, B, C, det, cArc, alpha, triple, omegaVO, W, Wswap, betaFlat, U12, U23 };
};
const state = (p = page) => p.evaluate((n) => window[n].getState(), DBG);

// the spec's closed forms against independent constructions, at many ε (no page involved)
let worst = 0;
for (let d = 5; d <= 90; d += 1) {
  const x = expected(d), om = 2 * Math.atan(Math.tan(x.e / 2) ** 2);
  worst = Math.max(worst, Math.abs(x.det - Math.sin(x.e) ** 4), Math.abs(x.omegaVO - om), Math.abs(x.alpha - Math.atan(1 / Math.cos(x.e))), Math.abs(Math.cos(x.betaFlat) - Math.sin(x.e / 2) ** 2),
    Math.abs(x.W.s - Math.cos(x.e / 2) ** 2), Math.abs(x.W.b13 + Math.sin(x.e / 2) ** 2), Math.abs(x.W.b12 + Math.sin(x.e / 2) * Math.cos(x.e / 2)), Math.abs(x.W.b23 + Math.sin(x.e / 2) * Math.cos(x.e / 2)));
}
check('maths (no page): det G = sin⁴ε, Ω = 2 arctan(tan²(ε/2)), α = arctan(sec ε), cos β_flat = sin²(ε/2), U₂₃U₁₂ components, for ε = 5°…90°', worst < 1e-12, `worst ${worst}`);
{
  const { U12, U23 } = wallRotors(35 * D), { A, B, C } = cellOf(35);
  check('maths (no page): U₁₂(ε) sends A to B and U₂₃(ε) sends B to C (Pauli sandwich)', norm(sub(sandwich(U12, A), B)) < 1e-12 && norm(sub(sandwich(U23, B), C)) < 1e-12);
}

/* ---------- 4. the six cards against the independent mathematics ---------- */
const SPEC = {
  cell: { eps: 38, view: 'cell', flat: true, transport: true },
  'once-ridge': { eps: 35, view: 'once', flat: false, transport: false },
  'twice-walls': { eps: 35, view: 'twice', flat: false, transport: true },
  'cap-excess': { eps: 48, view: 'excess', flat: true, transport: true, loopT: 1 },
  'gram-brick': { eps: 24, view: 'brick', flat: true, transport: false },
  'octant-limit': { eps: 90, view: 'cell', flat: true, transport: true }
};
for (const card of CARDS) for (const lang of ['zh', 'en']) {
  const p = await openStill(T, BOOK, ID, card, lang);
  const s = await state(p), sp = SPEC[card], x = expected(sp.eps);
  const t = card === 'twice-walls' ? 2 : card === 'cap-excess' ? 1 : sp.eps - 5;
  check(`still ${card} (${lang}): the declared frame and its spherical invariants match the caption`, s.preset === card && s.view === sp.view && near(s.epsDeg, sp.eps) && near(s.t, t) && !s.playing && near(s.omegaRad, x.omegaVO, 1e-9) && near(s.detG, x.det, 1e-12), JSON.stringify([s.preset, s.view, s.epsDeg, s.t, s.playing]));
  await p.context().close();
}
await T.goto(BOOK, ID, '?lang=zh');
await page.evaluate(() => document.fonts && document.fonts.ready); await settle(page);
for (const card of CARDS) {
  await page.click(`[data-preset="${card}"]`); await settle(page);
  // a card that plays is paused at once so that the values are read at its starting step
  await page.evaluate(() => { const b = document.getElementById('play'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  await settle(page);
  const s = await state(), sp = SPEC[card], x = expected(sp.eps);
  check(`card ${card}: state ε = ${sp.eps}°, scene ${sp.view}, flat cut ${sp.flat}, transport ${sp.transport}`, s.preset === card && near(s.epsDeg, sp.eps) && s.view === sp.view && s.flat === sp.flat && s.transport === sp.transport, JSON.stringify({ p: s.preset, e: s.epsDeg, v: s.view, f: s.flat, t: s.transport }));
  check(`card ${card}: vertices A, B, C`, [['A', x.A], ['B', x.B], ['C', x.C]].every(([k, v]) => norm(sub(s[k], v)) < 1e-12));
  check(`card ${card}: cos c = cos²ε and c < √2 ε`, near(s.cosC, x.c * x.c, 1e-12) && near(s.cDeg * D, x.cArc, 1e-10) && s.cDeg < s.flatCdeg && near(s.flatCdeg, Math.SQRT2 * sp.eps, 1e-12), `${s.cDeg} vs ${s.flatCdeg}`);
  check(`card ${card}: α = γ from the spherical law of cosines, β = 90°`, near(s.alphaDeg * D, x.alpha, 1e-9) && near(s.gammaDeg * D, x.alpha, 1e-9) && near(s.betaDeg, 90, 1e-9), `${s.alphaDeg} ${s.gammaDeg} ${s.betaDeg}`);
  check(`card ${card}: Ω against Van Oosterom–Strackee, −Ω/2 the spinor phase`, near(s.omegaRad, x.omegaVO, 1e-9) && near(s.spinorPhaseRad, -x.omegaVO / 2, 1e-9) && near(s.halfOmegaRad, x.omegaVO / 2, 1e-9) && s.omegaRad > 0, `${s.omegaRad} vs ${x.omegaVO}`);
  check(`card ${card}: flat cut angle at B from chord lengths, below 90°`, near(s.betaFlatDeg * D, x.betaFlat, 1e-9) && s.betaFlatDeg < 90, `${s.betaFlatDeg}`);
  check(`card ${card}: U₂₃U₁₂ against the Pauli product, unit norm`, near(s.rotorScalar, x.W.s, 1e-12) && near(s.rotorBiv12, x.W.b12, 1e-12) && near(s.rotorBiv23, x.W.b23, 1e-12) && near(s.rotorBiv13, x.W.b13, 1e-12) && near(s.rotorNorm2, 1, 1e-12),
    JSON.stringify([s.rotorScalar, s.rotorBiv12, s.rotorBiv23, s.rotorBiv13]));
  check(`card ${card}: det G = sin⁴ε by cofactors, volume sin²ε = √det G, coplanar det G = 0`, near(s.detG, x.det, 1e-12) && near(s.vol3D, x.triple, 1e-12) && near(s.sqrtDetG, Math.sin(x.e) ** 2, 1e-9) && Math.abs(s.detGCoplanar) < 1e-12 && near(s.coplanarAC, Math.cos(2 * x.e), 1e-12), `${s.detG} ${s.detGCoplanar}`);
  const hol = transportAngle(sp.eps);
  check(`card ${card}: the arrow carried round comes back turned by Ω (projected transport, 12000 steps)`, Math.abs(s.holonomyRad - hol) < 2e-3 && Math.abs(hol - x.omegaVO) < 2e-3, `page ${s.holonomyRad}, transport ${hol}, Ω ${x.omegaVO}`);
  const loop = s.loopRotor;
  const Astar = { b23: x.A[0], b13: -x.A[1], b12: x.A[2] };   // A⋆ = A₁e₂e₃ + A₂e₃e₁ + A₃e₁e₂
  check(`card ${card}: U_CA U₂₃ U₁₂ = cos(Ω/2) − sin(Ω/2) A⋆`, near(loop.s, Math.cos(x.omegaVO / 2), 1e-9) && ['b12', 'b13', 'b23'].every((k) => near(loop[k], -Math.sin(x.omegaVO / 2) * Astar[k], 1e-9)), JSON.stringify(loop));
  check(`card ${card}: covariant commutator, both sides = −2 sin²(ε/2) e₁e₃`, s.commutator.left.every((v, i) => near(v, s.commutator.right[i], 1e-12)) && near(s.commutator.left[5], x.W.b13 * 2, 1e-12) && near(x.W.b13 - x.Wswap.b13, 2 * x.W.b13, 1e-12),
    JSON.stringify(s.commutator.left.map((v) => +v.toFixed(6))));
  check(`card ${card}: Lagrange–Gram for (A, C): both sides = 1 − cos⁴ε`, near(s.lagrangeLeft, 1 - x.c ** 4, 1e-12) && near(s.lagrangeRight, 1 - x.c ** 4, 1e-12));
  const n = unit(cross(x.C, x.A));
  check(`card ${card}: brick height B·n along the common normal of A and C; coplanar height 0`, near(s.height, dot(x.B, n), 1e-12) && near(s.brick[0] * s.brick[1] * s.brick[2], Math.sin(x.e) ** 2, 1e-9) && Math.abs(s.brickCoplanar[0] * s.brickCoplanar[1] * s.brickCoplanar[2]) < 1e-12 && (s.brickCoplanar[1] < 1e-9 || Math.abs(s.brickCoplanar[2]) < 1e-7), JSON.stringify([s.brick, s.brickCoplanar]));
  check(`card ${card}: colour roles (amber only for the handle, the cursor and the probe; the cap magenta)`, s.roles.cap === 'magenta' && s.roles.excess === 'magenta' && s.roles.onceArc === 'cyan' && s.roles.brick === 'violet' && s.roles.spinor === 'violet' && Object.entries(s.roles).filter(([, v]) => v === 'amber').map(([k]) => k).sort().join() === 'cursor,handle,probe');
}
// the octant limit in numbers
{
  await page.click('[data-preset="octant-limit"]'); await settle(page);
  const s = await state();
  check('octant-limit: Ω = π/2, −Ω/2 = −π/4, det G = 1, α = 90°', near(s.omegaRad, Math.PI / 2, 1e-12) && near(s.spinorPhaseRad, -Math.PI / 4, 1e-12) && near(s.detG, 1, 1e-12) && near(s.alphaDeg, 90, 1e-9), JSON.stringify([s.omegaRad, s.spinorPhaseRad, s.detG, s.alphaDeg]));
  check('octant-limit: the loop of three coordinate rotors is exp(−(π/4) e₂e₃)', near(s.loopRotor.s, Math.SQRT1_2, 1e-12) && near(s.loopRotor.b23, -Math.SQRT1_2, 1e-12) && Math.abs(s.loopRotor.b12) < 1e-12 && Math.abs(s.loopRotor.b13) < 1e-12, JSON.stringify(s.loopRotor));
  check('octant-limit: the two-wall e₁e₃ term (−0.5) and −Ω/2 (−π/4) are not equal: the page does not claim they are', near(s.rotorBiv13, -0.5, 1e-12) && Math.abs(s.rotorBiv13 - s.spinorPhaseRad) > 0.2);
}
// leading order: −sin²(ε/2) and −Ω/2 agree to O(ε⁴)
{
  const r = await page.evaluate((n) => [5, 10, 20].map((d) => window[n].invariants(d)), DBG);
  const ratios = r.map((s) => (s.rotorBiv13 - s.spinorPhaseRad) / s.epsRad ** 4);
  check('leading order: (−sin²(ε/2)) − (−Ω/2) shrinks like ε⁴', ratios.every((q) => Math.abs(q) < 0.1) && Math.abs(r[0].rotorBiv13 - r[0].spinorPhaseRad) < 1e-5, ratios.map((q) => q.toFixed(4)).join(', '));
}

/* ---------- 5. the scenes ---------- */
const DBGcall = (fn, ...a) => page.evaluate(([n, f, args]) => window[n][f](...args), [DBG, fn, a]);
await page.click('[data-preset="once-ridge"]'); await settle(page);
{
  const sc = await page.evaluate((n) => { const d = window[n]; return { O: d.screen([0, 0, 0]), A: d.screen(d.point('A')), B: d.screen(d.point('B')), C: d.screen(d.point('C')), cam: d.getState().cam }; }, DBG);
  const ba = [sc.A[0] - sc.B[0], sc.A[1] - sc.B[1]], bc = [sc.C[0] - sc.B[0], sc.C[1] - sc.B[1]];
  check('once: the camera looks down the ridge (pitch 0, yaw ±π)', Math.abs(sc.cam.pitch) < 1e-6 && Math.abs(Math.abs(sc.cam.yaw) - Math.PI) < 1e-6, JSON.stringify(sc.cam));
  check('once: O and B fall on one screen point (the ridge collapses)', Math.hypot(sc.O[0] - sc.B[0], sc.O[1] - sc.B[1]) < 0.5, JSON.stringify([sc.O, sc.B]));
  check('once: the two legs are equal and meet at 90° on screen (A⊥ = (sin ε, 0), C⊥ = (0, sin ε))', Math.abs(Math.hypot(...ba) - Math.hypot(...bc)) < 0.5 && Math.abs(ba[0] * bc[0] + ba[1] * bc[1]) < 1e-3 * Math.hypot(...ba) ** 2 && Math.abs(ba[1]) < 0.5 && Math.abs(bc[0]) < 0.5);
}
check('twice: the card starts the walk at once', await playsAfter(page, () => page.click('[data-preset="twice-walls"]'), () => window.SPHERICAL_TRIHEDRON_DEBUG.getState()));
await settle(page);
{
  const w = await page.evaluate((n) => { const d = window[n]; return [d.walkAt(0), d.walkAt(1), d.walkAt(2), d.walkAt(1.5)]; }, DBG), x = expected(35);
  check('twice: the walk is at A, B, C after 0, 1, 2 steps', norm(sub(w[0].p, x.A)) < 1e-12 && norm(sub(w[1].p, x.B)) < 1e-12 && norm(sub(w[2].p, x.C)) < 1e-12);
  check('twice: no e₁e₃ part before the turn at B, −sin²(ε/2) after the second step', Math.abs(w[1].rotor.b13) < 1e-12 && near(w[2].rotor.b13, -(Math.sin(x.e / 2) ** 2), 1e-12) && w[3].rotor.b13 < 0);
  check('twice: the carried arrow keeps its direction along the second wall (e₁ fixed by U₂₃)', norm(sub(w[1].v, w[3].v)) < 1e-12 && norm(sub(w[1].v, w[2].v)) < 1e-12);
  const tB = unit(sub(x.C, x.B.map((y) => y * dot(x.B, x.C))));
  check('twice: at B the path turns 90° (the arrow along leg 1 is perpendicular to leg 2)', Math.abs(dot(w[1].v, tB)) < 1e-12);
}
check('excess: the card starts the loop at once', await playsAfter(page, () => page.click('[data-preset="cap-excess"]'), () => window.SPHERICAL_TRIHEDRON_DEBUG.getState()));
await settle(page);
{
  await page.evaluate(() => { const b = document.getElementById('play'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
  const l = await page.evaluate((n) => { const d = window[n]; return [d.loopAt(0), d.loopAt(1), d.getState()]; }, DBG), x = expected(48);
  const ang = Math.atan2(dot(x.A, cross(l[0].v, l[1].v)), dot(l[0].v, l[1].v));
  check('excess: at t = 0 and t = 1 the cursor is at A; the arrow has turned by Ω', norm(sub(l[0].p, x.A)) < 1e-12 && norm(sub(l[1].p, x.A)) < 1e-12 && Math.abs(ang - x.omegaVO) < 1e-9, `${ang} vs ${x.omegaVO}`);
  await DBGcall('setLoopT', 0.5); await settle(page);
  const s = await state(), tot = 2 * x.e + x.cArc, ext = (2 * x.e <= 0.5 * tot ? Math.PI - Math.PI / 2 + Math.PI - x.alpha : Math.PI / 2);
  check('excess: setLoopT(0.5) drives the rail and the path’s turning so far', near(s.loopT, 0.5, 1e-12) && near(s.t, 0.5, 1e-12) && near(s.turning, ext, 1e-9), `${s.turning} vs ${ext}`);
  await DBGcall('setLoopT', 1); await settle(page);
  const s1 = await state();
  check('excess: after the whole loop the path has turned 2π − Ω (Gauss–Bonnet)', near(s1.turning, 2 * Math.PI - x.omegaVO, 1e-9), `${s1.turning}`);
}
// the cap is painted magenta, not amber (pixel under the middle of the cap, flat cut and arrow off)
{
  await page.click('[data-preset="cell"]'); await settle(page);
  await DBGcall('toggleFlatCut', false); await DBGcall('toggleTransport', false); await settle(page);
  const r = await page.evaluate((n) => { const d = window[n], m = [d.point('A'), d.point('B'), d.point('C')].reduce((s, p) => s.map((v, i) => v + p[i]), [0, 0, 0]), l = Math.hypot(...m), q = d.screen(m.map((v) => v / l)); return { px: d.pixel(q[0], q[1]), pal: d.palette() }; }, DBG);
  const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const dir = (c) => { const l = Math.hypot(...c) || 1; return c.map((v) => v / l); };
  const sims = Object.fromEntries(Object.entries(r.pal).map(([k, v]) => [k, dot(dir(r.px.slice(0, 3)), dir(rgb(v)))]));
  const best = Object.entries(sims).sort((a, b) => b[1] - a[1])[0][0];
  check('colour: the middle of the spherical cap is magenta (closest token by hue), not amber', best === 'magenta' && r.px[3] > 0, JSON.stringify({ px: r.px, sims }));
}

/* ---------- 6. the controls ---------- */
{
  await page.click('[data-preset="cell"]'); await settle(page);
  await page.$eval('#eps', (el) => { el.value = '61'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  let s = await state();
  check('control: the ε slider sets ε (and the rail in the cell scene), and leaves the card', near(s.epsDeg, 61) && near(s.t, 56) && s.preset === null, JSON.stringify([s.epsDeg, s.t, s.preset]));
  await page.$eval('#now', (el) => { el.value = '20'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  s = await state();
  check('control: the rail is ε − 5° in the cell scene', near(s.epsDeg, 25), `${s.epsDeg}`);
  await page.click('#flatBtn'); await settle(page); const f1 = (await state()).flat;
  await page.keyboard.press('f'); await settle(page); const f2 = (await state()).flat;
  check('control: the flat-cut button and the F key toggle the flat cut', f1 !== f2 && (await page.getAttribute('#flatBtn', 'aria-pressed')) === String(f2));
  const t0 = (await state()).transport; await page.click('#transBtn'); await settle(page);
  check('control: the transport button toggles the carried arrow', (await state()).transport === !t0);
  await page.$eval('#loop', (el) => { el.value = '0.4'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('control: the loop slider sets t outside the Excess scene', near((await state()).loopT, 0.4));
  for (const v of ['once', 'twice', 'excess', 'brick', 'cell']) {
    await page.click(`#sceneChips [data-scene="${v}"]`); await settle(page);
    const st = await state();
    const railOk = v === 'twice' ? st.max === 2 : v === 'excess' ? st.max === 1 && near(st.t, st.loopT) : st.max === 85 && near(st.t, st.epsDeg - 5);
    check(`control: the scene chip ${v} switches the scene and the meaning of the rail`, st.view === v && railOk, JSON.stringify([st.view, st.t, st.max, st.epsDeg, st.loopT]));
  }
  // drag the amber handle (C) to where C sits for a larger ε
  await DBGcall('setEpsilonDeg', 30); await settle(page);
  const from = await page.evaluate((n) => window[n].screen(window[n].point('C')), DBG);
  const to = await page.evaluate((n) => window[n].screen([0, Math.cos(Math.PI / 3), Math.sin(Math.PI / 3)]), DBG);
  await page.mouse.move(from[0], from[1]); await page.mouse.down();
  for (let k = 1; k <= 8; k++) { await page.mouse.move(from[0] + (to[0] - from[0]) * k / 8, from[1] + (to[1] - from[1]) * k / 8); await settle(page); }
  await page.mouse.up(); await settle(page);
  const after = (await state()).epsDeg;
  check('control: dragging the amber handle along its wall changes ε', after > 45 && after <= 90, `ε ${after}`);
  // in the Gram scene a drag on the plot sets ε
  await page.click('[data-preset="gram-brick"]'); await settle(page);
  const pb = await page.evaluate((n) => { const b = window[n].plotBox(); return b && { x: b.xOf(60), y: b.top + b.height / 2 }; }, DBG);
  await page.mouse.move(pb.x, pb.y); await page.mouse.down(); await page.mouse.up(); await settle(page);
  check('control: a press on the Gram plot sets ε there', Math.abs((await state()).epsDeg - 60) <= 1, `${(await state()).epsDeg}`);
}

/* ---------- 7. no uppercase transform on lowercase Greek (ε would become Ε) ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of CARDS) {
    await page.click(`[data-preset="${card}"]`); await settle(page);
    const bad = await page.evaluate(() => {
      const out = [], w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
      while ((n = w.nextNode())) {
        const el = n.parentElement; if (!el || !/[α-ω]/.test(n.textContent) || el.closest('[hidden], .drawer')) continue;
        if (getComputedStyle(el).textTransform === 'uppercase' && el.offsetParent !== null) out.push(n.textContent.trim().slice(0, 30));
      }
      return out;
    });
    check(`case (${lang}, ${card}): no lowercase Greek under an uppercase transform`, bad.length === 0, bad.slice(0, 3).join(' | '));
  }
}
await page.click('[data-lang-set="zh"]');

/* ---------- 8. labels: none on top of each other, none clipped, none under the hud, at three sizes, both languages and both colour schemes ---------- */
async function labelAudit(p, tag) {
  return p.evaluate((t) => {
    const stage = document.getElementById('stage').getBoundingClientRect(), shot = document.documentElement.dataset.shot === '1';
    const vis = (el) => { if (!el || el.hidden || !el.getClientRects().length) return false; for (let a = el; a; a = a.parentElement) { const cs = getComputedStyle(a); if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') return false; } return true; };
    const tags = [...document.querySelectorAll('.stage .tag')].filter((e) => vis(e) && e.textContent.trim()).map((e) => ({ t: e.textContent.trim(), r: e.getBoundingClientRect() }));
    const huds = [['title', document.getElementById('hudTl')], ['chips', document.getElementById('sceneChips')], ['legend', document.getElementById('legend')]].filter(([k, e]) => vis(e) && !(k === 'chips' && shot)).map(([k, e]) => ({ k, r: e.getBoundingClientRect() }));
    const inter = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const bad = [];
    for (let i = 0; i < tags.length; i++) {
      const a = tags[i].r;
      if (a.left < stage.left - 0.5 || a.right > stage.right + 0.5 || a.top < stage.top - 0.5 || a.bottom > stage.bottom + 0.5) bad.push(`clipped: ${tags[i].t}`);
      for (let j = i + 1; j < tags.length; j++) if (inter(a, tags[j].r) > 0.5) bad.push(`overlap: ${tags[i].t} × ${tags[j].t}`);
      for (const h of huds) if (inter(a, h.r) > 0.5) bad.push(`under ${h.k}: ${tags[i].t}`);
    }
    const title = huds.find((h) => h.k === 'title'), chips = huds.find((h) => h.k === 'chips'), legend = huds.find((h) => h.k === 'legend');
    if (title && chips && inter(title.r, chips.r) > 0.5) bad.push('title × scene chips');
    for (const h of huds) if (h.r.left < stage.left - 0.5 || h.r.right > stage.right + 0.5 || h.r.top < stage.top - 0.5 || h.r.bottom > stage.bottom + 0.5) bad.push(`hud outside the stage: ${h.k}`);
    if (legend && title && inter(legend.r, title.r) > 0.5) bad.push('legend × title');
    return { n: tags.length, bad };
  }, tag);
}
const SIZES = [['1280×800', { width: 1280, height: 800 }, ''], ['800×450 still', { width: 800, height: 450 }, 'shot'], ['390×844', { width: 390, height: 844 }, '']];
for (const [name, viewport, mode] of SIZES) for (const lang of ['zh', 'en']) for (const scheme of ['dark', 'light']) {
  const ctx = await T.browser.newContext({ viewport, locale: lang === 'zh' ? 'zh-CN' : 'en-US', colorScheme: scheme, reducedMotion: mode === 'shot' ? 'reduce' : 'no-preference' });
  await routeLocalFonts(ctx, T.origin);
  const p = await ctx.newPage();
  p.on('pageerror', (e) => T.errors.push(`pageerror: ${e.message}`));
  const fails = [];
  let total = 0;
  for (const card of CARDS) {
    await p.goto(T.url(BOOK, ID, `?lang=${lang}&preset=${card}${mode === 'shot' ? '&shot=1' : ''}`), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts && document.fonts.ready); await settle(p);
    const a = await labelAudit(p, card); total += a.n;
    if (a.bad.length) fails.push(`${card}: ${a.bad.slice(0, 3).join('; ')}`);
    if (mode === 'shot' && lang === 'en') { const left = await cjkLeftovers(p); if (left.length) fails.push(`${card}: Chinese left: ${left[0]}`); }
  }
  const ox = await overflowX(p);
  check(`labels (${name}, ${lang}, ${scheme}): no overlap, no clipping, none under the title, chips or legend, over all six cards`, fails.length === 0 && total > 30 && ox <= 0, fails.slice(0, 3).join(' || ') || `${total} labels, overflow ${ox}`);
  await ctx.close();
}
// the strict overlap test of the testkit, at desktop, across the scenes
{
  await T.goto(BOOK, ID, '?lang=en'); await settle(page);
  let bad = [];
  for (const card of CARDS) { await page.click(`[data-preset="${card}"]`); await settle(page); bad = bad.concat(await labelOverlaps(page, '.stage .tag', 0.0001)); }
  check('labels (1440×900, en): no two stage labels touch on any card', bad.length === 0, JSON.stringify(bad.slice(0, 3)));
}

check('no page error, console error or failed request in the suite', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
