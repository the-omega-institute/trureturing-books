// Browser regression suite for IDEMPOTENT//LINE (books/quantum-geometry/viz/repeated-projection/).
//   node books/quantum-geometry/viz/tests/repeated-projection.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page applies the unread map with P± = ½(I ± n̂·σ) and reads the Bloch arrow off the matrix entries. The suite
// rebuilds everything another way: P± as outer products |u±⟩⟨u±| of the eigen-spinors of n̂·σ, ρ as a sum of Pauli
// matrices, the Bloch arrow as the traces Tr(ρσᵢ), and the projection as plain vector geometry (r·n̂)n̂. It reads the
// page through window.PROJECT_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'repeated-projection';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = (a) => Math.sqrt(dot(a, a));
const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const DEG = Math.PI / 180;

/* ---------- independent model ---------- */
const c = (re, im = 0) => [re, im];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const conj = (a) => [a[0], -a[1]];
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const mplus = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(A[i][j], B[i][j])));
const mscale = (A, s) => A.map((row) => row.map((z) => [z[0] * s, z[1] * s]));
const tr = (A) => cadd(A[0][0], A[1][1]);
const SX = [[c(0), c(1)], [c(1), c(0)]], SY = [[c(0), c(0, -1)], [c(0, 1), c(0)]], SZ = [[c(1), c(0)], [c(0), c(-1)]], I2 = [[c(1), c(0)], [c(0), c(1)]];
const rhoOf = (r) => mscale(mplus(mplus(I2, mscale(SX, r[0])), mplus(mscale(SY, r[1]), mscale(SZ, r[2]))), 0.5);
const blochOf = (R) => [tr(mm(R, SX))[0], tr(mm(R, SY))[0], tr(mm(R, SZ))[0]];
/** |u⟩⟨u| for the eigen-spinor of n̂·σ with eigenvalue +1 (s = 1) or −1 (s = −1). */
function proj(n, s) {
  const th = Math.acos(Math.max(-1, Math.min(1, n[2]))), ph = Math.atan2(n[1], n[0]);
  const u = s > 0 ? [c(Math.cos(th / 2)), [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]]
    : [c(Math.sin(th / 2)), [-Math.cos(th / 2) * Math.cos(ph), -Math.cos(th / 2) * Math.sin(ph)]];
  return [0, 1].map((i) => [0, 1].map((j) => cmul(u[i], conj(u[j]))));
}
function unread(r, n) {
  const R = rhoOf(r), Pp = proj(n, 1), Pm = proj(n, -1);
  return blochOf(mplus(mm(mm(Pp, R), Pp), mm(mm(Pm, R), Pm)));
}
const shadow = (r, n) => n.map((x) => x * dot(r, n));
const frob = (A) => Math.sqrt(A.flat().reduce((a, z) => a + z[0] ** 2 + z[1] ** 2, 0));

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.PROJECT_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const played = (n) => until(page, (k) => { const s = window.PROJECT_DEBUG.state; return !s.playing && s.t >= k - 1e-9; }, n);
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

// opening view: the AGAIN card, shown at its telling frame (three presses done)
let s = await state();
check('opens on the AGAIN card with three presses done', s.preset === 'twice' && s.n === 3 && close(s.t, 3) && s.axis === 'z');
check('AGAIN: the first press lands on the shadow (r·n̂)n̂', vclose(s.hist[1], shadow(s.r0, s.line), 1e-12));
check('AGAIN: the first press agrees with the eigen-spinor computation of P₊ρP₊ + P₋ρP₋', vclose(s.hist[1], unread(s.r0, s.line), 1e-12));
check('AGAIN: the second and third presses move nothing', vclose(s.hist[2], s.hist[1], 1e-12) && vclose(s.hist[3], s.hist[1], 1e-12) && close(s.moved, 0, 1e-12));
check('AGAIN: the first press really moved the arrow', len(s.hist[1].map((x, i) => x - s.hist[0][i])) > 0.5);
check('AGAIN: the readout “moved by the latest press” is 0.000', (await page.textContent('#roMoved')).trim() === '0.000');
check('AGAIN: the HUD says the third press moved it 0.000', (await page.textContent('#hudSub')).includes('0.000') && (await page.textContent('#hudBig')).includes('3'));

// ONCE plays one press and stops; the arrow ends shorter, on the line
await pick('once');
check('ONCE plays by itself and stops after one press', await played(1));
s = await state();
check('ONCE: one press in all, the arrow is the shadow of the start', s.n === 1 && vclose(s.r, shadow(s.r0, s.line), 1e-12) && vclose(s.r, unread(s.r0, s.line), 1e-12));
check('ONCE: the arrow is shorter after the press and its plane part is gone', close(len(s.r0), 1) && len(s.r) < 0.7 && close(s.plane, 0, 1e-12));
check('ONCE: the cyan part on the line is the same before and after', close(dot(s.r0, s.line), s.dot, 1e-12));

// ON-LINE: an arrow on the line is a fixed point and its cross-branch block is zero
await pick('fixed');
check('ON-LINE plays its two presses', await played(2));
s = await state();
check('ON-LINE: the arrow lies on the tilted line and never moves', s.axis === 'n' && close(len(s.r0), 0.7) && close(Math.abs(dot(s.r0, s.line)), 0.7, 1e-12) && s.hist.every((h) => vclose(h, s.r0, 1e-12)));
const Rfix = rhoOf(s.r0);
check('ON-LINE: P₊ρP₋ = 0 by the independent matrices, and the page reads 0', close(frob(mm(mm(proj(s.line, 1), Rfix), proj(s.line, -1))), 0, 1e-12) && close(s.coherence, 0, 1e-12));

// PERP: an arrow in the dual plane projects to the centre
await pick('perp');
check('PERP plays its one press', await played(1));
s = await state();
check('PERP: the start lies in the dual plane (no shadow on the line)', close(dot(s.r0, s.line), 0, 1e-12) && close(len(s.r0), 1));
check('PERP: one press leaves the zero arrow, and the two outcomes are 50 / 50', vclose(s.r, [0, 0, 0], 1e-12) && vclose(unread(s.r0, s.line), [0, 0, 0], 1e-12) && close(s.pp, 0.5) && close(s.pm, 0.5));

// LINE + PLANE: the two parts rebuild the arrow; the purity ledger
await pick('sum');
s = await state();
check('LINE + PLANE: no presses, the arrow at its start', s.n === 0 && close(s.t, 0) && vclose(s.r, s.r0));
const perp = s.r.map((x, i) => x - shadow(s.r, s.line)[i]);
check('LINE + PLANE: shadow + plane part = arrow, and they are perpendicular', vclose(shadow(s.r, s.line).map((x, i) => x + perp[i]), s.r, 1e-12) && close(dot(shadow(s.r, s.line), perp), 0, 1e-12));
check('LINE + PLANE: line² + plane² = length²', close(s.dot ** 2 + s.plane ** 2, dot(s.r, s.r), 1e-12) && close(s.plane, len(perp), 1e-12));
const R0 = rhoOf(s.r), purity = tr(mm(R0, R0))[0], pp = tr(mm(R0, proj(s.line, 1)))[0], pm = tr(mm(R0, proj(s.line, -1)))[0];
check('LINE + PLANE: purity surplus = Σ(p − ½)² + residual mass, from independent traces', close(s.surplus, purity - 0.5, 1e-12) && close(s.deviation, (pp - 0.5) ** 2 + (pm - 0.5) ** 2, 1e-12) && close(s.residual, 0.5 * dot(perp, perp), 1e-12) && close(purity - 0.5, (pp - 0.5) ** 2 + (pm - 0.5) ** 2 + 0.5 * dot(perp, perp), 1e-12));
check('LINE + PLANE: the cross-branch block is half the plane part', close(s.coherence, frob(mm(mm(proj(s.line, 1), R0), proj(s.line, -1))), 1e-12) && close(s.coherence, len(perp) / 2, 1e-12));
check('LINE + PLANE: the key readout prints the ledger', (await page.textContent('#roSum')).replace(/\s+/g, ' ').includes(`${s.surplus.toFixed(3)} = ${s.deviation.toFixed(3)} + ${s.residual.toFixed(3)}`));

// the press button and the P key
await page.click('#press'); s = await state();
check('“Project” adds one press, leaves the card, and lands on the shadow', s.n === 1 && close(s.t, 1) && s.preset === null && vclose(s.r, unread(s.r0, s.line), 1e-12));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('p'); s = await state();
check('P projects once more and moves nothing', s.n === 2 && close(s.t, 2) && close(s.moved, 0, 1e-12));
check('the pill counts the presses', (await page.textContent('#pillPress strong')).trim() === '2');

// switching the line restarts from the arrow as it is: Z then X gives zero
const onZ = s.r;
await page.click('#axisChips [data-axis="x"]'); s = await state();
check('changing the line starts again from the current arrow', s.axis === 'x' && s.n === 0 && vclose(s.r0, onZ, 1e-12) && vclose(s.line, [1, 0, 0]));
await page.click('#press'); s = await state();
check('projecting along Z and then along X leaves the zero arrow', vclose(s.r, [0, 0, 0], 1e-12) && vclose(unread(onZ, [1, 0, 0]), [0, 0, 0], 1e-12));

// the length slider
await pick('once');
await setRange('len', 0.4); s = await state();
check('the length slider sets |r| and starts again', close(len(s.r0), 0.4, 1e-12) && s.n === 0 && s.preset === null);
check('a mixed arrow: purity surplus = ½|r|²', close(s.surplus, 0.5 * 0.16, 1e-12));
await setRange('len', 1);

// many arrows and all three lines: page vs independent computation
let worst = 0;
const tip0 = await page.evaluate(() => window.PROJECT_DEBUG.tip());
const box = await page.locator('#stage').boundingBox();
const offsets = [[-80, 30], [60, 70], [-40, -60], [110, -20], [20, 100]];
for (const axis of ['z', 'x', 'n']) {
  for (const [dx, dy] of offsets) {
    await page.click('#restart'); await settle(page);
    const tip = await page.evaluate(() => window.PROJECT_DEBUG.tip());
    await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(box.x + box.width / 2 + dx, box.y + box.height / 2 + dy, { steps: 3 }); await page.mouse.up();
    await page.click(`#axisChips [data-axis="${axis}"]`); await settle(page);
    await page.click('#press'); await settle(page); await page.click('#press');
    s = await state();
    const e1 = unread(s.r0, s.line), e2 = unread(e1, s.line), R = rhoOf(s.r0), pr = s.r0.map((x, i) => x - shadow(s.r0, s.line)[i]);
    worst = Math.max(worst, ...s.hist[1].map((x, i) => Math.abs(x - e1[i])), ...s.hist[2].map((x, i) => Math.abs(x - e2[i])), ...e2.map((x, i) => Math.abs(x - e1[i])),
      ...e1.map((x, i) => Math.abs(x - shadow(s.r0, s.line)[i])),
      Math.abs(tr(mm(R, R))[0] - 0.5 - ((tr(mm(R, proj(s.line, 1)))[0] - 0.5) ** 2 + (tr(mm(R, proj(s.line, -1)))[0] - 0.5) ** 2 + 0.5 * dot(pr, pr))));
  }
}
check('15 arrows × 3 lines: one press = (r·n̂)n̂, a second press changes nothing, and the purity ledger balances', worst < 1e-12, `max error ${worst}`);
check('the probe never left the unit ball', (await state()).hist.every((h) => len(h) <= 1 + 1e-12));

// dragging the tip follows the pointer
await pick('sum');
const t0 = await page.evaluate(() => window.PROJECT_DEBUG.tip());
await page.mouse.move(t0[0], t0[1]); await page.mouse.down(); await page.mouse.move(t0[0] - 50, t0[1] + 40, { steps: 4 }); await page.mouse.up();
const t1 = await page.evaluate(() => window.PROJECT_DEBUG.tip());
s = await state();
check('dragging the amber tip moves it under the pointer and leaves the card', Math.hypot(t1[0] - (t0[0] - 50), t1[1] - (t0[1] + 40)) < 1.5 && s.preset === null, JSON.stringify([t0, t1]));
check('the dragged arrow keeps its length', close(len(s.r0), 1, 1e-9));
const cam0 = await page.evaluate(() => window.PROJECT_DEBUG.camera());
await page.mouse.move(box.x + 50, box.y + box.height - 80); await page.mouse.down(); await page.mouse.move(box.x + 150, box.y + box.height - 120, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.PROJECT_DEBUG.camera());
check('dragging empty space turns the view and leaves the arrow alone', cam1.yaw !== cam0.yaw && vclose((await state()).r0, s.r0));
void tip0;

// rail and keyboard
await pick('twice');
await played(3);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Home'); s = await state();
check('Home returns to before the first press', close(s.t, 0) && vclose(s.r, s.r0));
await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps one press forward', close(s.t, 1) && vclose(s.r, s.hist[1]));
await page.keyboard.press('End'); check('End goes to the last press', close((await state()).t, 3));
await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).t, 2));
await setRange('now', 0.5); s = await state();
check('half-way through the first press the arrow is between start and shadow', close(s.t, 0.5) && vclose(s.r, s.hist[0].map((x, i) => (x + s.hist[1][i]) / 2), 1e-12));
await page.keyboard.press('Home');
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.PROJECT_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state();
check('Space pauses', !paused.playing);
await page.click('#rew'); check('⏮ goes back to the start', close((await state()).t, 0));
await page.click('#restart'); s = await state();
check('Restart clears the presses and disables the rail', s.n === 0 && await page.evaluate(() => document.getElementById('play').disabled && document.getElementById('now').disabled));

// English
await page.click('[data-lang-set="en"]'); await pick('once'); await played(1); await settle(page);
check('English: the HUD reads “Press 1”', (await page.textContent('#hudBig')).trim() === 'Press 1');

// the AGAIN still printed in chapter 3: three presses, and the readout lists what each one moved
{
  const pg = await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=twice', await T.newPage());
  await settle(pg);
  const st = await pg.evaluate(() => ({ s: window.PROJECT_DEBUG.state, sub: document.getElementById('hudSub').textContent }));
  await pg.close();
  const r0 = sph(52 * DEG, 40 * DEG), z = [0, 0, 1], h = [r0];
  for (let k = 0; k < 3; k++) h.push(unread(h[k], z));
  const mv = [1, 2, 3].map((k) => len(h[k].map((x, i) => x - h[k - 1][i])));
  const shown = mv.map((m) => (Math.abs(m) < 5e-4 ? 0 : m).toFixed(3)).join(' → ');
  check('AGAIN still: after the third press, the readout lists the three moves, the first nonzero and the other two 0', close(st.s.t, 3) && st.s.done === 3 && mv[0] > 0.5 && mv[1] < 1e-12 && mv[2] < 1e-12 && st.sub.includes(shown), `${st.sub} | expected ${shown}`);
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
