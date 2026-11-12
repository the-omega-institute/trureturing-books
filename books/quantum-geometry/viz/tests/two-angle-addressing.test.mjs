// Browser regression suite for TWO//ANGLES (books/quantum-geometry/viz/two-angle-addressing/).
//   node books/quantum-geometry/viz/tests/two-angle-addressing.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page turns vectors with Rodrigues' formula. The suite recomputes every word with unit quaternions (a different
// representation: q v q*), checks the caps with exact integer axes, and surveys the sphere on its own latitude–longitude
// grid. It reads the page through window.ANGLES_DEBUG and never calls the page's own model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'two-angle-addressing';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sph = (th, ph) => [Math.sin(th * DEG) * Math.cos(ph * DEG), Math.sin(th * DEG) * Math.sin(ph * DEG), Math.cos(th * DEG)];

/* ---------- independent model: quaternions ---------- */
const qmul = (p, q) => [p[0] * q[0] - p[1] * q[1] - p[2] * q[2] - p[3] * q[3], p[0] * q[1] + p[1] * q[0] + p[2] * q[3] - p[3] * q[2],
  p[0] * q[2] - p[1] * q[3] + p[2] * q[0] + p[3] * q[1], p[0] * q[3] + p[1] * q[2] - p[2] * q[1] + p[3] * q[0]];
const qaxis = (u, ang) => { const n = Math.hypot(...u), s = Math.sin(ang / 2); return [Math.cos(ang / 2), s * u[0] / n, s * u[1] / n, s * u[2] / n]; };
const qapply = (q, v) => { const r = qmul(qmul(q, [0, ...v]), [q[0], -q[1], -q[2], -q[3]]); return [r[1], r[2], r[3]]; };
const axisB = (alpha) => [0, Math.sin(alpha * DEG), Math.cos(alpha * DEG)];
/** The word, applied factor after factor, up to rail position t (the factor in progress turned by its fraction). */
function wordAt(word, alpha, t) {
  let q = [1, 0, 0, 0];
  word.forEach((f, j) => { const share = Math.max(0, Math.min(1, t - j)); if (share > 0) q = qmul(qaxis(f.ax === 'a' ? [0, 0, 1] : axisB(alpha), f.deg * DEG * share), q); });
  return { p: qapply(q, [0, 0, 1]), flag: qapply(q, [1, 0, 0]) };
}
const RAW6 = [[1, 2, 0], [1, -2, 0], [0, 1, 2], [0, 1, -2], [2, 0, 1], [-2, 0, 1]], RAW3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const held = (x, raw) => raw.map((a, i) => (2 * dot(x, a) ** 2 > dot(a, a) ? i : -1)).filter((i) => i >= 0);
const nearest = (x, raw) => Math.max(...raw.map((a) => dot(x, a) ** 2 / dot(a, a)));
/** min over the sphere of the largest (x·â)²: a latitude–longitude grid, then a shrinking local search. */
function worstOver(raw) {
  let best = 2, bt = 0, bp = 0;
  for (let i = 0; i <= 180; i++) for (let j = 0; j < 360; j++) { const v = nearest(sph(i, j), raw); if (v < best) { best = v; bt = i; bp = j; } }
  for (let h = 1; h > 1e-7; h /= 2) for (const [dt, dp] of [[h, 0], [-h, 0], [0, h], [0, -h]]) { const v = nearest(sph(bt + dt, bp + dp), raw); if (v < best) { best = v; bt += dt; bp += dp; } }
  return best;
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.ANGLES_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.ANGLES_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
/** Largest gap between the page's point and flag and the quaternion computation. */
const agrees = (s) => { const q = wordAt(s.word, s.alpha, s.t); return Math.max(...q.p.map((x, i) => Math.abs(x - s.p[i])), ...q.flag.map((x, i) => Math.abs(x - s.flag[i]))); };

let s = await state();
check('opens on the TILT+TWIST card at its end', s.preset === 'address' && close(s.t, 2) && !s.playing);
check('TILT+TWIST: the word is [b 60°, a 45°], R_z(φ) R_y(θ) with b = e₂', s.word.length === 2 && s.word[0].ax === 'b' && close(s.word[0].deg, 60) && s.word[1].ax === 'a' && close(s.word[1].deg, 45) && vclose(s.b, [0, 1, 0], 1e-12));
check('TILT+TWIST: it ends at x = (√6/4, √6/4, ½), as in the worked example', vclose(s.p, [Math.sqrt(6) / 4, Math.sqrt(6) / 4, 0.5], 1e-12) && agrees(s) < 1e-12);
s = await seek(1);
check('after the first step the point is (sin θ, 0, cos θ)', vclose(s.p, [Math.sin(60 * DEG), 0, 0.5], 1e-12));
const heights = await page.evaluate(() => Array.from({ length: 21 }, (_, i) => window.ANGLES_DEBUG.at(1 + i / 20).p[2]));
check('during the second step the height cos θ = ½ stays put', heights.every((z) => close(z, 0.5, 1e-12)));

await pick('tilt'); s = await seek(0.8);
const circle = await page.evaluate(() => Array.from({ length: 37 }, (_, i) => window.ANGLES_DEBUG.at(i / 36).p));
check('ONE-TURN: one turn about e₂ keeps the point on the x–z meridian and brings it back to N', circle.every((p) => close(p[1], 0, 1e-12)) && vclose(circle[36], [0, 0, 1], 1e-12) && agrees(s) < 1e-12);

await pick('pole'); s = await seek(1.6);
const still = await page.evaluate(() => Array.from({ length: 11 }, (_, i) => window.ANGLES_DEBUG.at(1 + i / 10).p));
check('POLE: after θ = 180° the point is the south pole and the full twist never moves it', still.every((p) => vclose(p, [0, 0, -1], 1e-12)));
check('POLE: only the flag turns (by 0.6 × 360° at t = 1.6)', agrees(s) < 1e-12 && close(Math.acos(Math.max(-1, Math.min(1, dot(s.flag, wordAt(s.word, 90, 1).flag)))) / DEG, 144, 1e-6));

await pick('collinear'); s = await seek(2.5);
const stuck = await page.evaluate(() => Array.from({ length: 41 }, (_, i) => window.ANGLES_DEBUG.at(i / 10).p));
check('COLLINEAR: with α = 0 every turn fixes N: the point never leaves it', s.alpha === 0 && stuck.every((p) => vclose(p, [0, 0, 1], 1e-12)) && agrees(s) < 1e-12);
check('COLLINEAR: the flag stays in the horizontal plane while it turns', close(s.flag[2], 0, 1e-12) && !vclose(s.flag, [1, 0, 0], 1e-6));
await setRange('theta', 70); s = await state();
check('collinear axes and a target off N: the page builds no word', s.unreachable && s.word.length === 0 && (await page.textContent('#roWord')).includes('共线'));

for (const [card, alpha, k] of [['skew', 30, 2], ['narrow', 10, 6]]) {
  await pick(card); s = await seek(1e9);
  const end = wordAt(s.word, alpha, s.word.length).p;
  check(`${card}: the word carries N onto the target at θ = 110°, φ = 45° (quaternions)`, s.alpha === alpha && vclose(end, sph(110, 45), 1e-9) && vclose(s.p, end, 1e-9));
  check(`${card}: ${k} turns about b = ⌈110° / 2α⌉, alternating with turns about a (${2 * k} turns in all)`, s.word.filter((f) => f.ax === 'b').length === k && s.word.length === 2 * k && s.word.every((f, i) => f.ax === (i % 2 ? 'a' : 'b')));
  const reach = Math.acos(Math.max(-1, Math.min(1, wordAt(s.word, alpha, s.word.length - 1).p[2]))) / DEG;
  check(`${card}: before the last turn (about a) the point is already 110° from N, inside the reach ${2 * alpha * k}°`, close(reach, 110, 1e-6) && 110 <= 2 * alpha * k);
}

// built words for many axes and targets: endpoint, count, and the bound "at most 2α per turn about b" along the rail
let endErr = 0, countBad = '', countOK = true, boundOK = true;
for (const alpha of [90, 55, 30, 17, 8]) {
  await setRange('alpha', alpha);
  for (const [th, ph] of [[30, 10], [90, 200], [135, 300], [179, 77], [180, 0], [12, 359]]) {
    await setRange('theta', th); await setRange('phi', ph); s = await state();
    endErr = Math.max(endErr, ...wordAt(s.word, alpha, s.word.length).p.map((x, i) => Math.abs(x - sph(th, ph)[i])), agrees(s));
    if (s.word.filter((f) => f.ax === 'b').length !== Math.ceil(th / (2 * alpha) - 1e-9)) { countOK = false; countBad += ` α${alpha} θ${th}: ${s.word.map((f) => f.ax).join('')}`; }
    for (let i = 0; i <= 60; i++) {
      const t = s.word.length * i / 60, bs = s.word.filter((f, j) => f.ax === 'b' && j < Math.ceil(t - 1e-9)).length;
      const polar = Math.acos(Math.max(-1, Math.min(1, wordAt(s.word, alpha, t).p[2]))) / DEG;
      if (polar > Math.min(180, 2 * alpha * bs) + 1e-6) boundOK = false;
    }
  }
}
check('five axis angles × six targets: every word lands on its target (quaternions)', endErr < 1e-9, `max error ${endErr}`);
check('the page uses exactly ⌈Θ / 2α⌉ turns about b', countOK, countBad);
check('along every word the angle from N never exceeds 2α × the turns about b so far', boundOK);
let randOK = true;
for (let r = 0, seed = 7; r < 400; r++) {   // random words of the test's own: one turn about b moves the angle from a by at most 2α
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const alpha = 5 + 80 * rnd(), word = Array.from({ length: 6 }, (_, i) => ({ ax: i % 2 ? 'a' : 'b', deg: 360 * rnd() - 180 }));
  const polar = Math.acos(Math.max(-1, Math.min(1, wordAt(word, alpha, 6).p[2]))) / DEG;
  if (polar > Math.min(180, 6 * alpha) + 1e-6) randOK = false;
}
check('random words (test-side): three turns about b never reach farther than 3 × 2α from N', randOK);
check('the α slider sets the second axis b = (0, sin α, cos α) and leaves the card', s.preset === null && vclose(s.b, axisB(8), 1e-12));

// the cover scene
await pick('six'); s = await seek(1e9);
check('SIX-AXES: the point x = (√6/4, √6/4, ½) is held by colours 0, 2, 4 exactly (2(x·aᵢ)² > 5)', s.scene === 'cover' && JSON.stringify(s.held) === JSON.stringify(held(s.p, RAW6)) && JSON.stringify(s.held) === '[0,2,4]');
check('SIX-AXES: 2(x·a₀)² = 27/4 as in the example', close(2 * dot(s.p, RAW6[0]) ** 2, 6.75, 1e-12) && close(s.near, 6.75 / 10, 1e-12));
let perpOK = true;
const u = [s.p[1], -s.p[0], 0].map((c) => c / Math.hypot(s.p[0], s.p[1])), w = [s.p[1] * u[2] - s.p[2] * u[1], s.p[2] * u[0] - s.p[0] * u[2], s.p[0] * u[1] - s.p[1] * u[0]];
for (let i = 0; i < 720; i++) { const a = i * Math.PI / 360, y = u.map((c, k) => Math.cos(a) * c + Math.sin(a) * w[k]); if (held(y, RAW6).some((c) => s.held.includes(c))) perpOK = false; }
check('SIX-AXES: the great circle orthogonal to x meets no cap of x\'s colours (720 points)', perpOK);
let covered = true;
for (let i = 0; i <= 180; i++) for (let j = 0; j < 360; j += 2) if (!held(sph(i, j), RAW6).length) covered = false;
check('the six colours cover a full latitude–longitude grid of the sphere', covered);
const w6 = worstOver(RAW6), w3 = worstOver(RAW3);
check('the minimum over the sphere of the nearest (x·â)² is 3/5 for six axes, as the page reports', close(w6, 0.6, 1e-6) && close(s.worst, w6, 1e-6) && s.gaps === 0, `${w6} / ${s.worst}`);
await pick('three'); s = await seek(1e9);
check('THREE-CAPS: at the diagonal (1, 1, 1)/√3 no coordinate cap holds the point; (x·eⱼ)² = 1/3', vclose(s.p, [1, 1, 1].map((c) => c / Math.sqrt(3)), 1e-9) && s.held.length === 0 && held(s.p, RAW3).length === 0 && close(s.near, 1 / 3, 1e-9));
check('THREE-CAPS: the minimum over the sphere is 1/3 < ½ and the page draws a gap', close(w3, 1 / 3, 1e-6) && close(s.worst, w3, 1e-6) && s.gaps > 0);
await page.click('#setChips [data-set="six"]'); s = await state();
check('the cap chips switch to the six rational axes and leave the card', s.set === 'six' && s.preset === null && JSON.stringify(s.held) === JSON.stringify(held(s.p, RAW6)));
await page.click('#sceneChips [data-scene="words"]'); s = await state();
check('the scene chips switch back to addressing', s.scene === 'words' && await page.evaluate(() => document.getElementById('capPanel').hidden && !document.getElementById('polarPanel').hidden));

// dragging the target ring
await pick('address');
const from = await page.evaluate(() => window.ANGLES_DEBUG.screen(window.ANGLES_DEBUG.state.target));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] - 60, from[1] + 50, { steps: 5 }); await page.mouse.up();
s = await state();
const to = await page.evaluate(() => window.ANGLES_DEBUG.screen(window.ANGLES_DEBUG.state.target));
check('dragging the target ring puts it under the pointer', Math.hypot(to[0] - from[0] + 60, to[1] - from[1] - 50) < 1.5, JSON.stringify(to));
check('after the drag the word is rebuilt and lands on the new target', s.preset === null && vclose(wordAt(s.word, s.alpha, s.word.length).p, s.target, 1e-9) && vclose(s.p, s.target, 1e-9));
const cam0 = await page.evaluate(() => window.ANGLES_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 40, box.y + box.height - 90); await page.mouse.down(); await page.mouse.move(box.x + 140, box.y + box.height - 130, { steps: 4 }); await page.mouse.up();
check('dragging empty space orbits the camera and leaves the target alone', (await page.evaluate(() => window.ANGLES_DEBUG.camera())).yaw !== cam0.yaw && vclose((await state()).target, s.target));

// playback, rail and keyboard
await pick('skew'); await seek(0);
await page.click('[data-preset="narrow"]');
check('clicking a card plays it', await until(page, () => { const d = window.ANGLES_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.ANGLES_DEBUG.seek(window.ANGLES_DEBUG.state.max - 0.05)); await page.click('#play');
check('playback stops at the end of the word', await until(page, () => { const d = window.ANGLES_DEBUG.state; return !d.playing && d.t >= d.max - 1e-9; }));
await page.click('#rew'); s = await state(); check('⏮ returns to N', close(s.t, 0) && vclose(s.p, [0, 0, 1]));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ makes one whole turn at a time', close((await state()).t, 2));
await page.keyboard.press('ArrowLeft'); check('← steps back one turn', close((await state()).t, 1));
await page.keyboard.press('End'); s = await state(); check('End goes to the end of the word', close(s.t, s.max) && s.max === 12);
await page.keyboard.press('Home'); check('Home returns to N', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.ANGLES_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.ANGLES_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 3.4); s = await state();
check('scrubbing the rail turns part of a factor, as the quaternions say', close(s.t, 3.4) && agrees(s) < 1e-12);

// the printed stills: opened as viz-thumbs.mjs does (?shot=1&preset=…), each card shows the frame its caption tells
const shot = await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=tilt', await T.newPage());
const shotState = async () => { await settle(shot); return shot.evaluate(() => window.ANGLES_DEBUG.state); };
const hudPolar = async () => { const m = (await shot.textContent('#hudSub')).match(/离 N ([\d.]+)°/); return m ? Number(m[1]) : NaN; };
const spinTag = async () => { const t = await shot.evaluate(() => Array.from(document.querySelectorAll('#stage .tag')).filter((e) => !e.hidden).map((e) => e.textContent).find((x) => x.includes('小旗转过'))); const m = t && t.match(/([\d.]+)°/); return m ? Number(m[1]) : NaN; };
s = await shotState();
let qp = wordAt(s.word, s.alpha, s.t).p, qpolar = Math.acos(Math.max(-1, Math.min(1, qp[2]))) / DEG;
check('ONE-TURN still: the word has played to its end and the point is back at N, as the caption says', close(s.t, s.max) && !s.playing && vclose(qp, [0, 0, 1], 1e-9) && close(await hudPolar(), Number(qpolar.toFixed(1)), 1e-9), `t ${s.t}/${s.max}, polar ${qpolar}`);
await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=pole', shot); s = await shotState();
const flagTurn = Math.acos(Math.max(-1, Math.min(1, dot(wordAt(s.word, 90, s.t).flag, wordAt(s.word, 90, 1).flag)))) / DEG;
const twist = Math.abs(s.word[1].deg) * (s.t - 1);
check('POLE still: the twist has run its full turn, the point sits at the south pole and the flag readout says one whole turn', close(s.t, s.max) && vclose(wordAt(s.word, 90, s.t).p, [0, 0, -1], 1e-9) && close(flagTurn, 0, 1e-5) && close(await spinTag(), Math.round(twist), 1e-9) && close(twist, 360, 1e-9), `t ${s.t}, flag tag ${await spinTag()}`);
await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=collinear', shot); s = await shotState();
qp = wordAt(s.word, 0, s.t).p;
const lastTurn = Math.abs(s.word[s.word.length - 1].deg);
check('COLLINEAR still: the whole word has played, N never moved, and the flag readout is the last turn', close(s.t, s.max) && vclose(qp, [0, 0, 1], 1e-9) && close(await hudPolar(), 0, 1e-9) && close(await spinTag(), Math.round(lastTurn), 1e-9) && close(wordAt(s.word, 0, s.t).flag[2], 0, 1e-12), `t ${s.t}, tag ${await spinTag()}`);
await shot.close();

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Address'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
