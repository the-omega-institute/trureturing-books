// Browser regression suite for ORTHO//QUBIT (books/quantum-geometry/viz/qubit-geometry/).
//   node books/quantum-geometry/viz/tests/qubit-geometry.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page keeps gates as unit quaternions. The suite recomputes everything with 2 × 2 complex matrices acting on the
// spinor, so the two implementations check each other, and reads the page through window.QUBIT_DEBUG.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'qubit-geometry';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));

/* ---------- independent model: SU(2) matrices on the spinor ---------- */
const C = { mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], add: (a, b) => [a[0] + b[0], a[1] + b[1]], conj: (a) => [a[0], -a[1]] };
const AX = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], h: [Math.SQRT1_2, 0, Math.SQRT1_2] };
/** U = cos(a/2) I − i sin(a/2) n·σ for a turn of `deg` degrees about n. */
function gate(n, deg) {
  const a = deg * Math.PI / 180, c = Math.cos(a / 2), s = Math.sin(a / 2);
  return [[[c, -s * n[2]], [-s * n[1], -s * n[0]]], [[s * n[1], -s * n[0]], [c, s * n[2]]]];
}
const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => C.add(C.mul(A[i][0], B[0][j]), C.mul(A[i][1], B[1][j]))));
const apply = (U, v) => [C.add(C.mul(U[0][0], v[0]), C.mul(U[0][1], v[1])), C.add(C.mul(U[1][0], v[0]), C.mul(U[1][1], v[1]))];
const spinor = (theta, phi) => { const t = theta * Math.PI / 360, p = phi * Math.PI / 180; return [[Math.cos(t), 0], [Math.sin(t) * Math.cos(p), Math.sin(t) * Math.sin(p)]]; };
const bloch = (v) => { const c = C.mul(C.conj(v[0]), v[1]); return [2 * c[0], 2 * c[1], v[0][0] ** 2 + v[0][1] ** 2 - v[1][0] ** 2 - v[1][1] ** 2]; };
const rotor = (U) => [(U[0][0][0] + U[1][1][0]) / 2, -U[0][1][1], -U[0][1][0], -U[0][0][1]];   // U = w − i b·σ → [w, b]
function expected(theta, phi, gates) {
  let U = gate(AX.z, 0);
  for (const [ax, deg] of gates) U = mmul(gate(AX[ax], deg), U);
  return { r: bloch(apply(U, spinor(theta, phi))), q: rotor(U) };
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const state = async () => { await settle(page); return page.evaluate(() => window.QUBIT_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const frames = (n) => page.evaluate((k) => new Promise((done) => { const f = () => (k-- > 0 ? requestAnimationFrame(f) : done()); f(); }), n);
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };   // a card glides B to its start before it applies; settle lands that glide instead of waiting for it
const end = async () => { await page.evaluate(() => { const d = window.QUBIT_DEBUG; d.seek(d.state.n); }); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

let s = await state();
check('starts on the SIXTY card with no gates', s.preset === 'half' && s.n === 0 && s.theta === 60 && s.phi === 40);
check('line = cos 60° and area = sin 60°', close(s.line, 0.5) && close(s.area, Math.sqrt(3) / 2));
check('header pills show line and area', (await page.textContent('#pillLine strong')) === '+0.50' && (await page.textContent('#pillArea strong')) === '0.87');
check('the key readout shows 0.250 + 0.750 = 1.000', (await page.textContent('#roSum')).replace(/\s+/g, ' ').includes('0.250 + 0.750 = 1.000'));

// line² + area² = 1 and the Born weights, over a grid of states and all three rulers
let worst = 0, born = 0, vsMatrix = 0;
for (const axis of ['z', 'x', 'y']) {
  await page.click(`#axisChips [data-axis="${axis}"]`);
  for (const [th, ph] of [[0, 0], [17, 233], [60, 40], [90, 0], [90, 90], [121, 301], [180, 0]]) {
    await setRange('theta', th); await setRange('phi', ph);
    s = await state();
    const e = expected(th, ph, []);
    worst = Math.max(worst, Math.abs(s.line ** 2 + s.area ** 2 - 1));
    born = Math.max(born, Math.abs(s.p0 + s.p1 - 1), Math.abs(s.p0 - (1 + s.line) / 2));
    vsMatrix = Math.max(vsMatrix, ...s.r.map((x, i) => Math.abs(x - e.r[i])), Math.abs(s.line - e.r['xyz'.indexOf(axis)]));
  }
}
check('line² + area² = 1 for every state and ruler tried', worst < 1e-12, `max error ${worst}`);
check('the two click probabilities sum to 1 and P(+A) = (1 + line)/2', born < 1e-12, `max error ${born}`);
check('the Bloch vector agrees with the spinor computation', vsMatrix < 1e-12, `max error ${vsMatrix}`);
check('moving a slider leaves the experiment card', (await state()).preset === null);
check('the ruler note follows the chosen axis', (await page.textContent('#axisNote')).includes('Y'));

// experiment cards: end states
await pick('line'); s = await state();
check('ALL-LINE: line 1, area 0, every click is +A', close(s.line, 1) && close(s.area, 0) && close(s.p0, 1));
await pick('area'); s = await state();
check('ALL-AREA: line 0, area 1, clicks 50 / 50', close(s.line, 0) && close(s.area, 1) && close(s.p0, 0.5));
await pick('hadamard'); s = await state();
check('HADAMARD starts playing from |0⟩', s.playing && s.n === 1 && s.theta === 0);
s = await end();
check('HADAMARD: H takes |0⟩ to |+⟩ (all line becomes area)', vclose(s.r, [1, 0, 0]) && close(s.line, 0) && close(s.area, 1));
await pick('phase');
const lines = await page.evaluate(() => [0, 0.3, 0.9, 1.4, 2].map((t) => window.QUBIT_DEBUG.at(t)));
check('PHASE: the line and the area stay put while B goes round A', lines.every((x) => close(x.line, 0) && close(x.area, 1)));
check('PHASE: B really moves', !vclose(lines[1].r, lines[0].r, 1e-3) && vclose(lines[4].r, lines[0].r));
await pick('hzh'); s = await end();
let e = expected(60, 40, [['h', 180], ['z', 180], ['h', 180]]);
const viaX = expected(60, 40, [['x', 180]]);
check('H·Z·H: the end point matches the matrix product', vclose(s.r, e.r, 1e-12) && vclose(s.q, e.q, 1e-12));
check('H·Z·H: the end point equals what one X gate gives', vclose(s.r, viaX.r, 1e-12));
check('H·Z·H: the rotor is −R_X', vclose(s.q, viaX.q.map((x) => -x), 1e-12) && s.sheet === -1);
const cmp = await page.evaluate(() => window.QUBIT_DEBUG.compareX());
check('H·Z·H: the page reports the same turn with sign −1', cmp.sameTurn && cmp.sign === -1);
check('H·Z·H: the circuit note says −R_X', (await page.textContent('#circNote')).includes('−R'));
await pick('turn1'); s = await end();
check('TURN-360: B is back and R = −1', vclose(s.r, expected(60, 40, []).r, 1e-12) && vclose(s.q, [-1, 0, 0, 0], 1e-12) && s.sheet === -1);
check('TURN-360: the pill shows the sheet −1', (await page.textContent('#pillSheet strong')) === '−1');
await pick('turn2'); s = await end();
check('TURN-720: B is back and R = +1', vclose(s.r, expected(60, 40, []).r, 1e-12) && vclose(s.q, [1, 0, 0, 0], 1e-12) && s.sheet === 1);
check('TURN-720 is four half-turns on the rail', s.n === 4 && s.gates.every((g) => g[0] === 'x' && g[1] === 180));
check('TURN-720: the circuit note says the whole turn is the identity with rotor +1', /\+1/.test(await page.textContent('#circNote')));

// B coming back does not make the circuit the identity: an S gate leaves the north pole where it is
await pick('line');
await page.click('#gateChips [data-gate="S"]');
const toastSaid = await page.waitForFunction(() => /±1/.test(document.getElementById('toast').textContent), null, { timeout: 30000 }).then(() => true, () => false);
s = await end();
const US = gate(AX.z, 90), eS = expected(0, 0, [['z', 90]]);
const offBy = (U, sg) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(U[i][j][0] - (i === j ? sg : 0), U[i][j][1]))));
check('S on the north pole: B does not move, yet the matrix is neither I nor −I and the rotor is (√½, 0, 0, √½)', vclose(s.r, [0, 0, 1], 1e-12) && vclose(eS.r, [0, 0, 1], 1e-12) && offBy(US, 1) > 0.5 && offBy(US, -1) > 0.5 && vclose(s.q, [Math.SQRT1_2, 0, 0, Math.SQRT1_2], 1e-12) && vclose(s.q, eS.q, 1e-12));
const noteS = await page.textContent('#circNote'), toastS = await page.textContent('#toast');
check('S on the north pole: the circuit note says B is back but the rotor is not ±1, and never that it is back at +1', /±1/.test(noteS) && /不是|not/.test(noteS) && !/回到\s*\+1|back at \+1|R = \+1/.test(noteS), noteS);
check('S on the north pole: the end-of-circuit toast does not report R = ±1 either', toastSaid && !/R = [+−]1/.test(toastS), toastS);
check('the header pill names the sheet of ±R, not the rotor itself', /叶|sheet/i.test(await page.textContent('#pillSheet')));

// gates appended by hand, against the matrix product at every step
await pick('half');
const seq = ['H', 'S', 'X', 'T', 'Y', 'Z'], TURN = { X: ['x', 180], Y: ['y', 180], Z: ['z', 180], H: ['h', 180], S: ['z', 90], T: ['z', 45] };
let gateErr = 0;
for (let k = 0; k < seq.length; k++) {
  await page.click(`#gateChips [data-gate="${seq[k]}"]`); await settle(page);
  s = await end(); e = expected(60, 40, seq.slice(0, k + 1).map((g) => TURN[g]));
  gateErr = Math.max(gateErr, ...s.r.map((x, i) => Math.abs(x - e.r[i])), ...s.q.map((x, i) => Math.abs(x - e.q[i])));
}
check('six gates H S X T Y Z: Bloch vector and rotor match the matrix product after each', gateErr < 1e-12 && s.n === 6, `max error ${gateErr}`);
check('the rotor stays a unit quaternion', close(s.q.reduce((a, x) => a + x * x, 0), 1, 1e-12));
check('the circuit tape lists ψ₀ and six gates', (await page.$$eval('#gates .gate', (b) => b.length)) === 7);
const mid = await page.evaluate(() => window.QUBIT_DEBUG.at(2.5));
e = expected(60, 40, [['h', 180], ['z', 90], ['x', 90]]);
check('half-way through a gate the state is the partial turn', vclose(mid.r, e.r, 1e-12) && vclose(mid.q, e.q, 1e-12));
await setRange('alpha', 270); await page.click('#turnChips [data-turn="y"]'); await page.click('#addTurn'); s = await end();
e = expected(60, 40, [...seq.map((g) => TURN[g]), ['y', 270]]);
check('a custom 270° turn about ŷ is split into two pieces and matches', s.n === 8 && vclose(s.r, e.r, 1e-12) && vclose(s.q, e.q, 1e-12));
await page.click('#undo'); check('Undo removes the last piece', (await state()).n === 7);

// rail and keyboard
await page.click('#gates [data-jump="2"]'); s = await state();
check('clicking a gate on the tape jumps to just after it', close(s.tau, 2) && !s.playing);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); check('→ steps one gate forward', close((await state()).tau, 3));
await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).tau, 1));
await page.keyboard.press('Home'); check('Home returns to ψ₀', close((await state()).tau, 0));
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.QUBIT_DEBUG.state; return d.playing && d.tau > 0; }));
await page.keyboard.press('Space'); const paused = await state(); await frames(3);   // three more animation frames: a running clock would have moved
check('Space pauses', !paused.playing && close((await state()).tau, paused.tau));
await page.keyboard.press('End'); check('End goes to the end of the circuit', close((await state()).tau, 7));
await setRange('now', 3.25); check('scrubbing the rail sets τ', close((await state()).tau, 3.25));
await page.keyboard.press('r'); s = await state();
check('R clears the circuit', s.n === 0 && close(s.tau, 0));
check('with no gates the transport is disabled', await page.evaluate(() => document.getElementById('play').disabled && document.getElementById('now').disabled));

// dragging B on the sphere, and orbiting the camera
await pick('half');
const tip = await page.evaluate(() => window.QUBIT_DEBUG.tip());
await page.mouse.move(tip[0], tip[1]); await page.mouse.down(); await page.mouse.move(tip[0] - 60, tip[1] + 50, { steps: 4 }); await page.mouse.up();
s = await state();
const tip2 = await page.evaluate(() => window.QUBIT_DEBUG.tip());
check('dragging the amber arrow moves B under the pointer', Math.hypot(tip2[0] - (tip[0] - 60), tip2[1] - (tip[1] + 50)) < 1.5, JSON.stringify(tip2));
check('dragging B leaves the card and keeps line² + area² = 1', s.preset === null && close(s.line ** 2 + s.area ** 2, 1, 1e-12) && (Math.abs(s.theta - 60) > 1 || Math.abs(s.phi - 40) > 1));
const cam0 = await page.evaluate(() => window.QUBIT_DEBUG.camera());
const box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 60, box.y + box.height - 90); await page.mouse.down(); await page.mouse.move(box.x + 160, box.y + box.height - 130, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.QUBIT_DEBUG.camera());
check('dragging empty space orbits the camera and leaves the state alone', cam1.yaw !== cam0.yaw && cam1.pitch !== cam0.pitch && close((await state()).theta, s.theta));
await page.click('#camChips [data-cam="top"]'); await settle(page);
check('the Top view looks down the z axis', (await page.evaluate(() => window.QUBIT_DEBUG.camera())).pitch > 1.5);

// the stills the chapters print: each card stops at the moment its caption describes, and the readout says so
const stillOf = async (card) => {
  const pg = await T.goto(BOOK, ID, `?shot=1&lang=zh&preset=${card}`, await T.newPage());
  await settle(pg);
  const out = await pg.evaluate(() => ({ s: window.QUBIT_DEBUG.state, big: document.getElementById('hudBig').textContent, sub: document.getElementById('hudSub').textContent }));
  await pg.close();
  return out;
};
const wIn = (txt) => { const m = /w\s*=\s*([+−-]?\d+\.\d+)/.exec(txt); return m ? Number(m[1].replace('−', '-')) : NaN; };
let st = await stillOf('turn1'); e = expected(60, 40, [['x', 360]]);
check('TURN-360 still: B has gone the full 360° and is back, the readout says w = −1.00', close(st.s.tau, 2) && vclose(st.s.r, expected(60, 40, []).r, 1e-12) && close(wIn(st.sub), Math.round(e.q[0] * 100) / 100) && e.q[0] < -0.999 && /360°/.test(st.sub), st.sub);
st = await stillOf('turn2'); e = expected(60, 40, [['x', 720]]);
check('TURN-720 still: B has gone the full 720° and is back, the readout says w = +1.00', close(st.s.tau, 4) && vclose(st.s.r, expected(60, 40, []).r, 1e-12) && close(wIn(st.sub), Math.round(e.q[0] * 100) / 100) && e.q[0] > 0.999 && /720°/.test(st.sub), st.sub);
st = await stillOf('hadamard'); e = expected(0, 0, [['h', 180]]);
check('HADAMARD still: the end of the turn, B on |+⟩, line 0 and area 1, θ(A,B) = 90°', close(st.s.tau, 1) && vclose(st.s.r, e.r, 1e-12) && close(st.s.line, e.r[2], 1e-12) && close(st.s.area, Math.hypot(e.r[0], e.r[1]), 1e-12) && st.big.includes(`${(Math.acos(e.r[2]) * 180 / Math.PI).toFixed(1)}°`), st.big);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
