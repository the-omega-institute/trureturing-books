// Browser regression suite for TWO//ANGLES (books/quantum-geometry/viz/two-angle-addressing/).
//   node books/quantum-geometry/viz/tests/two-angle-addressing.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page turns vectors with Rodrigues' formula. The suite recomputes every word with unit quaternions (a different
// representation: q v q*), checks the caps with exact integer axes, and surveys the sphere on its own latitude–longitude
// grid. It reads the page through window.ANGLES_DEBUG and never calls the page's own model. The cover cards draw an
// opaque lit ball with the caps as patches on it: the suite runs the solid gates on them and reads, through the stage's
// own ray picking, which surface shows at sample points of the sphere, against the test's own cap membership.
import { session, stageFirstChecks, solidChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

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

await pick('narrow'); await setRange('alpha', 0); await setRange('theta', 70); s = await state();
check('collinear axes (α slider at 0) and a target off N: the page builds no word', s.alpha === 0 && s.unreachable && s.word.length === 0 && (await page.textContent('#roWord')).includes('共线'));

// Lie–Trotter: P_n = (R_a(θ/n) R_b(θ/n))ⁿ, θ = 90°, a = e₃, b = e₂, against a turn by √2·θ about (0, 1, 1)/√2.
// Test-side: quaternion powers, matrices from quaternions, and the operator norm by power iteration on MᵀM.
const qmat = (q) => { const [w, x, y, z] = q; return [[1 - 2 * (y * y + z * z), 2 * (x * y - w * z), 2 * (x * z + w * y)], [2 * (x * y + w * z), 1 - 2 * (x * x + z * z), 2 * (y * z - w * x)], [2 * (x * z - w * y), 2 * (y * z + w * x), 1 - 2 * (x * x + y * y)]]; };
function opNorm(M) {
  const MtM = [0, 1, 2].map((i) => [0, 1, 2].map((j) => M[0][i] * M[0][j] + M[1][i] * M[1][j] + M[2][i] * M[2][j]));
  let v = [0.3, 0.5, 0.8], lam = 0;
  for (let k = 0; k < 400; k++) { const w = MtM.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]); lam = Math.hypot(...w); if (lam < 1e-300) return 0; v = w.map((c) => c / lam); }
  return Math.sqrt(lam);
}
function trotterTest(n) {
  const step = qmul(qaxis([0, 0, 1], Math.PI / 2 / n), qaxis([0, 1, 0], Math.PI / 2 / n));
  let q = [1, 0, 0, 0]; for (let k = 0; k < n; k++) q = qmul(step, q);
  if (q[0] < 0) q = q.map((c) => -c);
  const angle = 2 * Math.acos(Math.min(1, q[0])) / DEG, axis = [q[1], q[2], q[3]].map((c) => c / Math.hypot(q[1], q[2], q[3]));
  const A = qmat(q), B = qmat(qaxis([0, 1, 1], Math.SQRT2 * Math.PI / 2));
  const err = opNorm(A.map((r, i) => r.map((c, j) => c - B[i][j])));
  return { angle, axis, err, end: qapply(q, [0, 0, 1]) };
}
// the chapter's table (x → a = e₃, y → b = e₂, z → −e₁): n, error, angle, axis (x, y, z) of the example
const TABLE = [[1, 1.0353, 120.00, [0.5774, 0.5774, 0.5774]], [2, 0.5037, 125.60, [0.6786, 0.6786, 0.2811]], [4, 0.2496, 126.87, [0.7002, 0.7002, 0.1393]], [16, 0.0622, 127.25, [0.7067, 0.7067, 0.0347]], [256, 0.0039, 127.28, [0.7071, 0.7071, 0.0022]]];
await pick('trotter'); s = await seek(1e9);
check('TROTTER: the card plays n = 4, a word of 8 turns by 22.5°, alternating about b and a', s.trot === 4 && s.word.length === 8 && s.word.every((f, i) => f.ax === (i % 2 ? 'a' : 'b') && close(f.deg, 22.5, 1e-12)) && vclose(s.b, [0, 1, 0], 1e-12));
for (const [n, err, ang, ax] of TABLE) {
  await page.click(`#trotChips [data-trot="${n}"]`); s = await seek(1e9);
  const t = trotterTest(n), mapped = [-ax[2], ax[1], ax[0]];
  check(`TROTTER n = ${n}: angle ${ang}°, error ${err}, n × error ${(n * err).toFixed(4)} (quaternions, power iteration; the chapter's table)`,
    s.trot === n && close(s.trotInfo.angle, t.angle, 1e-7) && close(s.trotInfo.err, t.err, 1e-7) && close(s.trotInfo.nErr, n * t.err, 1e-5)
    && close(t.angle, ang, 0.005) && close(t.err, err, 0.00005) && close(n * t.err, Number((n * err).toFixed(4)), n * 0.00005 + 1e-4), `${s.trotInfo.angle} ${s.trotInfo.err}`);
  check(`TROTTER n = ${n}: the violet axis of Pₙ is the table's axis carried by x → e₃, y → e₂, z → −e₁`, vclose(s.trotInfo.axis, t.axis, 1e-7) && vclose(t.axis, mapped, 0.00006));
  check(`TROTTER n = ${n}: the amber zigzag ends at Pₙ N`, vclose(s.p, t.end, 1e-9) && agrees(s) < 1e-9);
}
const axisZs = TABLE.map(([n]) => Math.abs(trotterTest(n).axis[0]));
check('TROTTER: the axis of Pₙ moves monotonically onto the bisector (0, 1, 1)/√2 as n grows', axisZs.every((z, i) => i === 0 || z < axisZs[i - 1]) && axisZs[4] < 0.003);
await setRange('theta', 50); s = await state();
check('moving a slider leaves the Lie–Trotter mode', s.trot === 0 && s.preset === null && (await page.getAttribute('#trotChips [data-trot="0"]', 'aria-pressed')) === 'true');

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

// the cover cards as solids: an opaque, lit ball with the caps as patches on it
await pick('six'); await seek(1e9);
await solidChecks(T, BOOK, ID, page);
await pick('three'); await seek(1e9);
await solidChecks(T, BOOK, ID, page, { rest: false });
/** The camera's direction towards the viewer, from yaw and pitch (the test's own formula of the orbit camera). */
const towards = (c) => [-Math.sin(c.yaw) * Math.cos(c.pitch), -Math.cos(c.yaw) * Math.cos(c.pitch), Math.sin(c.pitch)];
/** Points of the sphere facing the viewer, away from the rim: a spiral on the sphere kept where depth > 0.25. */
const frontPoints = (D) => { const out = []; for (let i = 0, n = 1400; i < n; i++) { const z = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - z * z), a = i * Math.PI * (3 - Math.sqrt(5)), y = [r * Math.cos(a), r * Math.sin(a), z]; if (dot(y, D) > 0.25) out.push(y); } return out; };
/** What should show at y: a cap of a colour holding x on top, else any cap holding y, else the bare ball. Null near a rim. */
function expected(y, raw, heldX) {
  if (raw.some((a) => Math.abs(2 * dot(y, a) ** 2 / dot(a, a) - 1) < 0.05)) return null;
  const hold = held(y, raw), top = hold.filter((i) => heldX.includes(i)), use = top.length ? top : hold;
  return use.length ? use.map((i) => `cap${i}${dot(y, raw[i]) > 0 ? '+' : '-'}`) : ['ball'];
}
for (const [card, raw, n] of [['six', RAW6, 12], ['three', RAW3, 6]]) {
  await pick(card); s = await seek(1e9);
  const caps = await page.evaluate(() => window.ANGLES_DEBUG.caps());
  const centres = raw.flatMap((a) => [1, -1].map((sg) => a.map((c) => sg * c / Math.sqrt(dot(a, a)))));
  check(`${card} solid: ${n} cap patches of angular radius 45°, centred on ±âᵢ`, caps.length === n && caps.every((c) => close(c.w, Math.PI / 4, 1e-12)) && centres.every((u) => caps.some((c) => vclose(c.c, u, 1e-12))), JSON.stringify(caps.map((c) => c.id)));
  check(`${card} solid: the caps drawn cyan are exactly those of the colours holding x`, caps.every((c) => c.held === held(s.p, raw).includes(c.i)));
  const D = towards(await page.evaluate(() => window.ANGLES_DEBUG.camera()));
  const pts = frontPoints(D), ids = await page.evaluate((ps) => ps.map((v) => window.ANGLES_DEBUG.hit(v)), pts);
  let bad = [], judged = 0, bare = 0;
  pts.forEach((y, k) => { const e = expected(y, raw, s.held); if (!e) return; judged++; if (ids[k] === 'ball') bare++; if (!e.includes(ids[k])) bad.push(`${y.map((c) => c.toFixed(2))}: ${ids[k]} not ${e.join('/')}`); });
  check(`${card} solid: at ${judged} points of the front of the sphere the surface on top is the cap the test's own membership says (cyan over grey over the bare ball)`, judged > 300 && bad.length === 0, bad.slice(0, 3).join(' | '));
  if (card === 'six') check('six solid: the bare (magenta) ball shows nowhere: the caps cover the front of the sphere', bare === 0, `${bare}`);
  else {
    // the patches are meshes whose rims are chords of the true circles, so allow the rim band the layering check skips
    const gapOK = pts.every((y, k) => ids[k] !== 'ball' || y.every((c) => c * c < 0.5 + 0.025));
    const octants = new Set(pts.filter((y, k) => ids[k] === 'ball').map((y) => y.map((c) => (c > 0 ? '+' : '-')).join('')));
    check('three solid: the bare (magenta) ball shows, and only where every (x·eⱼ)² < ½ (up to the drawn rims): around the octant diagonals', bare > 0 && gapOK && octants.has('+++'), `${bare} points in ${[...octants].join(' ')}; largest (x·eⱼ)² there ${Math.max(0, ...pts.filter((y, k) => ids[k] === 'ball').map((y) => Math.max(...y.map((c) => c * c)))).toFixed(4)}`);
  }
}
// a target the ball hides cannot be grabbed; one in front can
await pick('six'); await seek(1e9);
const xs = await state(), toward = Math.atan2(-xs.p[0], -xs.p[1]);
await page.evaluate((v) => window.ANGLES_DEBUG.view(v), [toward + Math.PI, -0.4]); await settle(page);
let at = await page.evaluate(() => window.ANGLES_DEBUG.screen(window.ANGLES_DEBUG.state.target.map((c) => c * window.ANGLES_DEBUG.layers.mark)));
const camBack = await page.evaluate(() => window.ANGLES_DEBUG.camera());
await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.move(at[0] - 50, at[1] + 30, { steps: 4 }); await page.mouse.up(); s = await state();
check('cover: a target behind the ball cannot be grabbed (the drag turns the camera instead)', vclose(s.target, xs.target, 1e-12) && (await page.evaluate(() => window.ANGLES_DEBUG.camera())).yaw !== camBack.yaw);
await page.evaluate((v) => window.ANGLES_DEBUG.view(v), [toward, 0.3]); await settle(page);
at = await page.evaluate(() => window.ANGLES_DEBUG.screen(window.ANGLES_DEBUG.state.target.map((c) => c * window.ANGLES_DEBUG.layers.mark)));
await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.move(at[0] - 40, at[1] + 30, { steps: 4 }); await page.mouse.up(); s = await state();
check('cover: a target in front of the ball can be grabbed and dragged; x follows it and its colours are recomputed', !vclose(s.target, xs.target, 1e-3) && vclose(s.p, s.target, 1e-9) && JSON.stringify(s.held) === JSON.stringify(held(s.p, RAW6)));

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
await T.goto(BOOK, ID, '?shot=1&lang=zh&preset=trotter', shot); s = await shotState();
const hud = await shot.textContent('#hudSub'), tt = trotterTest(4);
check('TROTTER still: the zigzag has played to its end, and the stage reads 126.87°, 0.2496 and 0.9984 as the caption and the table say', close(s.t, s.max) && s.max === 8 && hud.includes('126.87°') && hud.includes('0.2496') && hud.includes(`${(4 * tt.err).toFixed(4)}`) && (4 * tt.err).toFixed(4) === '0.9984', hud);
await shot.close();

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Address'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
