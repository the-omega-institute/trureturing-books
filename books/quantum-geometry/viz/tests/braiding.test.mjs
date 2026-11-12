#!/usr/bin/env node
// Browser regression suite for BRAID//STRANDS (books/quantum-geometry/viz/braiding/):
//   node books/quantum-geometry/viz/tests/braiding.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first. Then every control and every claim of the page against a model written here: the colour
// rules as tables (Fox's rule "equal stays, different gives the third" instead of 2x − y; y + 1 by a lookup), the
// chapter's crossing / crossingInv on pairs and crossing₁ / crossing₂ on nested triples (x, (y, z)), closed colourings
// counted by nested loops, and the geometry read off the page's sampled world lines: the winding angle of the pair,
// which strand is nearer the viewer at a crossing, and where each strand ends.
// The stage is a lit solid (kit.solid): solidChecks runs on the opening card, and the suite checks the fitted layout and
// the beads of now against the page's own world lines.
// The page is read through window.BRAID_DEBUG.
import { session, stageFirstChecks, solidChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'braiding';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent model ---------- */
const FOX = [[0, 2, 1], [2, 1, 0], [1, 0, 2]];                 // x ⋆ y: equal colours stay, different give the third
const RACKS = {
  dihedral: { act: (x, y) => FOX[x][y], inv: (x, y) => { for (let z = 0; z < 3; z++) if (FOX[x][z] === y) return z; return -1; } },
  shift: { act: (_x, y) => [1, 2, 0][y], inv: (_x, y) => [2, 0, 1][y] }
};
const crossing = (Q, [x, y]) => [Q.act(x, y), x];
const crossingInv = (Q, [u, v]) => [v, Q.inv(v, u)];
/** Apply a word (bottom to top, ±k) to a colour list, by the chapter's pairwise maps. */
function run(Q, c, word) {
  let s = c.slice();
  for (const g of word) { const i = Math.abs(g) - 1, pr = (g > 0 ? crossing : crossingInv)(Q, [s[i], s[i + 1]]); s = s.slice(); s[i] = pr[0]; s[i + 1] = pr[1]; }
  return s;
}
function count(Q, n, word) {
  let k = 0;
  const loop = (pre) => { if (pre.length === n) { if (run(Q, pre, word).join() === pre.join()) k++; return; } for (let x = 0; x < 3; x++) loop(pre.concat([x])); };
  loop([]); return k;
}
const c1 = (Q, [x, [y, z]]) => [Q.act(x, y), [x, z]], c2 = (Q, [x, [y, z]]) => [x, [Q.act(y, z), y]];
const flat = ([x, [y, z]]) => [x, y, z];
/** Unwrapped angle swept by strand b − strand a in the plane, from the sampled world lines. */
function winding(pts, a, b) {
  let tot = 0, prev = null;
  for (let i = 0; i < pts[a].length; i++) {
    const ang = Math.atan2(pts[b][i][1] - pts[a][i][1], pts[b][i][0] - pts[a][i][0]);
    if (prev != null) { let d = ang - prev; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; tot += d; }
    prev = ang;
  }
  return tot;
}
const close = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps;

/* ---------- model sanity ---------- */
let ok = true;
for (const Q of Object.values(RACKS)) for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) {
  if (crossingInv(Q, crossing(Q, [x, y])).join() !== [x, y].join()) ok = false;
  for (let z = 0; z < 3; z++) if (Q.act(Q.act(x, y), Q.act(x, z)) !== Q.act(x, Q.act(y, z))) ok = false;
}
check('model: both rules are racks (left self-distributive, crossingInv undoes crossing)', ok);
let yb = true;
for (const Q of Object.values(RACKS)) for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) for (let z = 0; z < 3; z++)
  if (flat(c1(Q, c2(Q, c1(Q, [x, [y, z]])))).join() !== flat(c2(Q, c1(Q, c2(Q, [x, [y, z]])))).join()) yb = false;
check('model: crossing₁∘crossing₂∘crossing₁ = crossing₂∘crossing₁∘crossing₂ on all 27 triples, both racks', yb);
check('model: Fox rule is idempotent, y + 1 is not', [0, 1, 2].every((x) => RACKS.dihedral.act(x, x) === x) && [0, 1, 2].every((x) => RACKS.shift.act(x, x) !== x));

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const Dv = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return Dv(() => window.BRAID_DEBUG.state); };
const linesOf = (w) => Dv((x) => window.BRAID_DEBUG.lines(x), w);
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const played = async () => {
  const r = await until(page, () => { const s = window.BRAID_DEBUG.state; return s.preset !== null && s.t > 0; });
  await Dv(() => window.BRAID_DEBUG.seek(1)); await settle(page);
  return r;
};
const D3 = RACKS.dihedral;
const agreesA = (s, Q) => run(Q, s.A.bottom, s.A.word).join() === s.A.top.join() && count(Q, s.A.n, s.A.word) === s.A.count;
const agreesB = (s, Q) => run(Q, s.B.bottom, s.B.word).join() === s.B.top.join() && count(Q, s.B.n, s.B.word) === s.B.count;

/* ---------- the lit solid ---------- */
// The opening card (σ₁, run to the top): two thin tubes, their beads and lines. Thin strands cover far less of the stage
// than a ball would (measured 2.7% opaque on the default 1440 × 900 page), so the coverage floor is 2%, not the default
// 12%; nothing is drawn larger to pass it. Light and shade, the turn of the camera and picking are checked as usual.
const camOpen = await Dv(() => Object.assign({}, window.TRV.solids[0].cam));
await solidChecks(T, BOOK, ID, page, { rest: false, minShare: 0.02 });
await Dv((c) => { Object.assign(window.TRV.solids[0].cam, c); window.TRV.kit.flush(); }, camOpen);
{
  const cam = await Dv(() => window.BRAID_DEBUG.state.camera);
  check('solid: the camera is back where the card put it after the solid checks', close(cam.yaw, camOpen.yaw, 1e-12) && close(cam.pitch, camOpen.pitch, 1e-12) && close(cam.zoom, camOpen.zoom, 1e-12));
  const rt = await Dv(() => { const sc = window.TRV.solids[0]; return { stage: sc.el.id, gl: !!sc.el.querySelector('canvas.solid-gl'), mode: sc.mode, cv: getComputedStyle(document.getElementById('cv')).visibility }; });
  check('solid: the stage is a kit.solid drawn by WebGL, the 2D canvas kept only for the resting picture', rt.stage === 'stage' && rt.gl && rt.mode === 'webgl' && rt.cv === 'hidden', JSON.stringify(rt));
}
/** Every strand end of both braids inside the stage, with a margin, and the scale the fit asked for. */
async function fitted(tag) {
  const g = await Dv(() => window.BRAID_DEBUG.layout());
  const ends = g.ends.flat(2), inside = ends.every(([x, y]) => x > 8 && x < g.W - 8 && y > 8 && y < g.H - 8);
  return check(`${tag}: the fitted layout keeps every strand end inside the stage`, inside && g.unit > 20 && ends.length > 0, JSON.stringify({ W: g.W, H: g.H, unit: g.unit, ends: ends.slice(0, 4) }));
}
await fitted('σ₁');
{
  // the beads of now are marks of the solid, one per strand, at the exact point of each world line at the rail's height
  const near = (p, pts) => { let d = Infinity; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], ab = b.map((x, k) => x - a[k]), ap = p.map((x, k) => x - a[k]), L2 = ab.reduce((u, x) => u + x * x, 0), u = L2 ? Math.max(0, Math.min(1, ab.reduce((w, x, k) => w + x * ap[k], 0) / L2)) : 0; d = Math.min(d, Math.hypot(...ap.map((x, k) => x - u * ab[k]))); } return d; };
  await Dv(() => window.BRAID_DEBUG.seek(0.43)); await settle(page);
  const ms = await Dv(() => window.TRV.solids[0].marks().filter((m) => /^now0/.test(m.key)));
  const ln0 = await linesOf(0), z0 = ln0.pts[0][0][2], z1 = ln0.pts[0].at(-1)[2], zNow = z0 + 0.43 * (z1 - z0);
  const onLine = ms.length === 2 && ms.every((m) => close(m.p[2], zNow, 1e-12) && Math.min(...ln0.pts.map((pts) => near(m.p, pts))) < 2e-3);
  check('σ₁ at t = 0.43: one amber bead per strand, on its world line at the height of now (the tube runs up to it)', onLine, JSON.stringify(ms.map((m) => m.p)));
  await Dv(() => window.BRAID_DEBUG.seek(1)); await settle(page);
}

let s = await state();
check('opens on σ₁ with the whole braid run', s.preset === 'over' && s.t === 1 && !s.playing && s.A.word.join() === '1');
check('σ₁: colours (0, 1) reach the top as (0 ⋆ 1, 0) = (2, 0)', s.A.bottom.join() === '0,1' && s.A.top.join() === '2,0' && agreesA(s, D3));
let ln = await linesOf(0);
check('σ₁: the pair turns half a turn anticlockwise seen from above (+π)', close(winding(ln.pts, 0, 1), Math.PI, 1e-3));
const mid = Math.floor(ln.pts[0].length / 2);
check('σ₁: halfway, the strand that started on the left is nearer the viewer (y < 0) and the other behind', ln.pts[0][mid][1] < -0.3 && ln.pts[1][mid][1] > 0.3);
check('σ₁: the left strand ends on the right slot and vice versa', close(ln.pts[0].at(-1)[0], ln.slots[1]) && close(ln.pts[1].at(-1)[0], ln.slots[0]));

// clicking a bottom end recolours it
let q = await Dv(() => window.BRAID_DEBUG.bottom(0));
await page.mouse.click(q[0], q[1]); s = await state();
check('clicking a bottom number cycles that colour', s.A.bottom.join() === '1,1' && s.preset === null && agreesA(s, D3) && s.A.top.join() === '1,1');

// INVERSE
await pick('inverse'); check('σ₁σ₁⁻¹ plays', await played()); s = await state();
check('σ₁σ₁⁻¹: colours return to (0, 1); the straight braid also gives (0, 1)', s.A.top.join() === '0,1' && s.B.top.join() === '0,1' && s.B.word.length === 0 && agreesA(s, D3) && agreesB(s, D3));
ln = await linesOf(0);
check('σ₁σ₁⁻¹: the pair turns +π and back, net angle 0', close(winding(ln.pts, 0, 1), 0, 1e-3));
const q1 = Math.floor(ln.pts[0].length * 3 / 4);
// after σ₁ the strands have swapped slots: strand 0 now comes from the right
check('σ₁⁻¹: the strand coming from the right passes in front this time', ln.pts[0][q1][1] < -0.3 && ln.pts[1][q1][1] > 0.3);
check('σ₁σ₁⁻¹: every strand ends where it started', close(ln.pts[0].at(-1)[0], ln.slots[0]) && close(ln.pts[1].at(-1)[0], ln.slots[1]));

// TWICE
await pick('twice'); check('σ₁² plays', await played()); s = await state();
check('σ₁²: (0, 1) arrives as (1, 2), not as the straight braid\'s (0, 1)', s.A.top.join() === '1,2' && s.B.top.join() === '0,1' && agreesA(s, D3));
ln = await linesOf(0);
check('σ₁²: the pair winds a full turn (2π) and each strand is back on its slot', close(winding(ln.pts, 0, 1), 2 * Math.PI, 1e-3) && close(ln.pts[0].at(-1)[0], ln.slots[0]));
let anyBack = false;
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) if (a !== b && run(D3, [a, b], [1, 1]).join() === [a, b].join()) anyBack = true;
check('model: no two-colour start comes back after σ₁² (only the one-colour ones do)', !anyBack && count(D3, 2, [1, 1]) === 3);
check('the turn readout shows +360° and 0°', (await page.textContent('#roTurn')).includes('+360°'));

// YANG–BAXTER: for every bottom colouring, the two orders agree
await pick('yb'); check('Yang–Baxter plays', await played()); s = await state();
check('YB: σ₁σ₂σ₁ and σ₂σ₁σ₂ on (0, 1, 2) both reach (0, 2, 0)', s.A.top.join() === '0,2,0' && s.B.top.join() === '0,2,0' && agreesA(s, D3) && agreesB(s, D3));
let all = true;
for (let k = 0; k < 9; k++) {
  q = await Dv((j) => window.BRAID_DEBUG.bottom(j), k % 3);
  await page.mouse.click(q[0], q[1]); s = await state();
  if (s.A.top.join() !== s.B.top.join() || !agreesA(s, D3) || run(D3, s.A.bottom, [2, 1, 2]).join() !== s.A.top.join()) all = false;
}
check('YB: after nine recolourings the two tops still agree, as the model says', all);
ln = await linesOf(0); const lnB = await linesOf(1);
check('YB: the two braids\' world lines differ (strand 1 halfway is elsewhere)', Math.abs(ln.pts[1][Math.floor(ln.pts[1].length / 2)][0] - ln.slots[0] - (lnB.pts[1][Math.floor(lnB.pts[1].length / 2)][0] - lnB.slots[0])) > 0.1);

// CLOSE
await pick('close'); check('CLOSE plays', await played()); s = await state();
check('CLOSE: closed, (0, 1) → (2, 0) clashes, 3 of 9 come back', s.closed && s.A.top.join() === '2,0' && s.A.count === 3 && count(D3, 2, [1]) === 3);
check('CLOSE: the key readout prints 3 / 9', (await page.textContent('#roKey')).trim() === '3 / 9');

// STABILIZE
await pick('stabilize'); check('+1 STRAND plays', await played()); s = await state();
check('+1 STRAND: the added strand copies the last colour, (0, 1) → (0, 1, 1)', s.B.n === 3 && s.B.bottom.join() === '0,1,1' && s.B.word.join() === '2,1,1,1');
check('+1 STRAND: both come back, and both count 9 (model: 9 and 9)', s.A.top.join() === '0,1' && s.B.top.join() === '0,1,1' && s.A.count === 9 && s.B.count === 9 && count(D3, 2, [1, 1, 1]) === 9 && count(D3, 3, [2, 1, 1, 1]) === 9);
let copies = true;
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let z = 0; z < 3; z++) {
  const fixedBig = run(D3, [a, b, z], [2, 1, 1, 1]).join() === [a, b, z].join(), fixedSmall = run(D3, [a, b], [1, 1, 1]).join() === [a, b].join();
  if (fixedBig !== (fixedSmall && z === b)) copies = false;
}
check('model: a 3-strand colouring comes back exactly when the 2-strand one does and the new colour copies the last', copies);
check('model: the negative stabilization also counts 9', count(D3, 3, [-2, 1, 1, 1]) === 9);

// TREFOIL
await pick('trefoil'); check('3 ≠ 9 plays', await played()); s = await state();
await fitted('3 ≠ 9 (two closed braids, front view)');
check('3 ≠ 9: σ₁ counts 3, σ₁³ counts 9', s.A.count === 3 && s.B.count === 9 && s.B.top.join() === '0,1' && agreesB(s, D3));

// RACK
await pick('rack'); check('x⋆x ≠ x plays', await played()); s = await state();
const SH = RACKS.shift;
check('x⋆x ≠ x: one strand counts 3, after a strand is added 0 (model too)', s.rule === 'shift' && s.A.count === 3 && s.B.count === 0 && count(SH, 1, []) === 3 && count(SH, 2, [1]) === 0);
check('x⋆x ≠ x: the copied (0, 0) arrives as (1, 0)', s.B.bottom.join() === '0,0' && s.B.top.join() === '1,0' && agreesB(s, SH));

// controls
await page.click('#nChips [data-n="3"]'); s = await state();
check('the 3-strand chip gives three straight strands and leaves the card', s.A.n === 3 && s.A.word.length === 0 && s.preset === null && s.B === null);
await page.click('#genBtns [data-gen="1"]'); await page.click('#genBtns [data-gen="-2"]'); await Dv(() => window.BRAID_DEBUG.seek(1)); s = await state();
// (the rule is still the rack of the last card: the strand chip changes only the strands)
check('σ₁ and σ₂⁻¹ buttons add crossings on top, colours by the current rule', s.A.word.join() === '1,-2' && agreesA(s, RACKS[s.rule]) && s.rule === 'shift', JSON.stringify(s.A));
await page.click('#undo'); s = await state();
check('undo removes the last crossing', s.A.word.join() === '1');
await page.click('#clearW'); s = await state();
check('clear removes every crossing', s.A.word.length === 0);
await page.click('#nChips [data-n="2"]');
check('σ₂ is disabled with two strands', await page.$eval('#genBtns [data-gen="2"]', (b) => b.disabled));
await page.click('#closeChips [data-closed="closed"]'); s = await state();
check('the closed-up chip closes the braid', s.closed);
await page.click('#qChips [data-q="shift"]'); s = await state();
check('the rack chip switches the rule; two straight strands then count 9 (model)', s.rule === 'shift' && s.A.count === count(SH, 2, []) && s.A.count === 9);
await page.click('#viewChips [data-view="front"]'); await settle(page); s = await state();
check('the front chip turns to the braid diagram', close(s.camera.yaw, 0) && close(s.camera.pitch, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('f'); await settle(page); s = await state();
check('F toggles back to the tilted view', s.view === 'tilt' && !close(s.camera.yaw, 0));
await pick('yb'); await played();
await page.locator('body').click({ position: { x: 5, y: 5 } });   // keys go to the page, not to the focused card
await page.keyboard.press('Home'); s = await state();
check('Home: at the bottom', s.t === 0);
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps one crossing', close(s.t, 1 / 3, 1e-9));
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.BRAID_DEBUG.state.t > 0.34));
await page.keyboard.press('Space'); s = await state(); check('Space pauses', !s.playing, JSON.stringify([s.t, s.playing]));
await page.click('#rew'); check('⏮ goes back to the bottom', (await state()).t === 0);
const sb = await page.locator('#stage').boundingBox(), cam0 = (await state()).camera;
await page.mouse.move(sb.x + 40, sb.y + sb.height * 0.4); await page.mouse.down(); await page.mouse.move(sb.x + 120, sb.y + sb.height * 0.4 + 20, { steps: 4 }); await page.mouse.up();
check('dragging empty space turns the view', (await state()).camera.yaw !== cam0.yaw);

// English
await page.click('[data-lang-set="en"]'); await pick('close'); await played();
check('English: the HUD names the crossings', (await page.textContent('#hudBig')).includes('crossing 1/1'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
