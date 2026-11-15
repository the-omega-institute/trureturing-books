#!/usr/bin/env node
// Browser regression suite for PRELUDE//SHADOWS (books/quantum-geometry/viz/prelude-dimensions/):
//   node books/quantum-geometry/viz/tests/prelude-dimensions.test.mjs     (or: ./tbook test)
// First the quality gate every stage-first page passes (stageFirstChecks), then this page: one check for every control,
// and every geometric claim recomputed here another way — projections by dot products and by removing the normal
// component, velocities by finite differences of the positions the page reports, the latitude as a plane cut of the
// sphere measured along a polyline, the lift by norms and orthogonality, the mixture by summing the six vectors, and
// the cosine cobweb by iterating and by bisection — never by calling the page's own functions. The page is read
// through its read-only probe window.PRELUDE_DEBUG; stills are opened as viz-thumbs.mjs opens them (openStill).
import { session, stageFirstChecks, settle, until, playsAfter, openStill } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'prelude-dimensions';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));
const sub = (a, b) => a.map((x, i) => x - b[i]);
const cross2 = (a, b) => a[0] * b[1] - a[1] * b[0];

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- this page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.PRELUDE_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.PRELUDE_DEBUG.seek(v), t); return state(); };
const scene = async (sc, sub2 = null, t = null) => { await page.evaluate(([a, b, c]) => window.PRELUDE_DEBUG.scene(a, b, c), [sc, sub2, t]); return state(); };
const click = async (sel) => { await page.click(sel); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); return state(); };
const at2 = (x, y) => page.evaluate(([a, b]) => window.PRELUDE_DEBUG.at2(a, b), [x, y]);
const at3 = (v) => page.evaluate((w) => window.PRELUDE_DEBUG.at3(w), v);
async function dragFrom(from, to) {
  await page.mouse.move(from[0], from[1]); await page.mouse.down();
  await page.mouse.move(to[0], to[1], { steps: 8 }); await page.mouse.up();
  return state();
}
const tagText = (s, key) => (s.tags.find(([k]) => k === key) || [])[1] || '';

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('the full page opens on the EDGE-ON card at its key frame θ = 60°, not playing', s.preset === 'shadow' && s.mode === 'one' && close(s.t, 60) && !s.playing, JSON.stringify([s.preset, s.mode, s.t, s.playing]));
check('the opening frame: shadow x = 0.5 under the post, labelled on the stage', close(s.disc.shadow, 0.5, 1e-12) && tagText(s, 'x').includes('+0.50'));
check('the stage names its two views: from the top the post goes round, edge-on only left and right remain',
  tagText(s, 'top').includes('俯视') && tagText(s, 'top').includes('木桩绕圆走') && tagText(s, 'side').includes('侧视') && tagText(s, 'side').includes('只剩左右位置'));
check('no Lean citation, no green box and no green tick on this page (analogies and numbers only)',
  await page.evaluate(() => !document.querySelector('a[data-lean-gid], .okmark') && [...document.querySelectorAll('.lean')].every((b) => /(^|\s)(model|argued|num)(\s|$)/.test(b.className))));
check('the evidence names MODEL, ARGUED and NUM', await page.evaluate(() => ['model', 'argued', 'num'].every((c) => document.querySelector(`.lean.${c}`))));
check('three columns: #rail on the left holds only the cards; #evidence on the right opens with the one #infoBtn, then controls, readouts and evidence; footer.rail keeps the clock',
  await page.evaluate(() => {
    const rail = document.getElementById('rail'), ev = document.getElementById('evidence'), kids = ev ? [...ev.children].map((e) => e.id) : [];
    return document.querySelectorAll('#infoBtn').length === 1 && !!rail && rail.matches('aside.col.deck') && rail.contains(document.getElementById('presets'))
      && !rail.querySelector('input, #ctlPanel, #readouts, .lean') && !!ev && ev.matches('aside.col.side')
      && kids[0] === 'infoBtn' && kids.indexOf('ctlPanel') > 0 && kids.indexOf('ctlPanel') < kids.indexOf('readouts') && kids.indexOf('readouts') < kids.indexOf('evidenceBoxes')
      && !!document.querySelector('footer.rail #play') && !!document.querySelector('.lab .center > .strip') && !document.querySelector('#stage .strip');
  }), await page.evaluate(() => JSON.stringify([...(document.getElementById('evidence') || { children: [] }).children].map((e) => e.id))));

/* ---------- 1 · head-on: the same ray, seen from the angle α ---------- */
s = await scene('ray');
check('scene RAY: the rail is the viewing angle α over 0 … 90°', s.mode === 'ray' && close(s.max, 90));
let worst = 0, bad = [];
for (const a of [0, 5, 20, 45, 60, 90]) {
  s = await seek(a);
  const R = s.ray, ray = sub(R.P1, R.P0), src = sub(R.P0, R.P1).map((x) => x / norm(ray)), gz = R.gaze;
  const ang = Math.acos(Math.max(-1, Math.min(1, dot(gz, src) / norm(gz)))) / DEG;   // line of sight against the direction towards the source
  const imgLen = norm(sub(R.image[1], R.image[0]));
  const shadowLen = Math.abs(cross2(ray, gz)) / norm(gz);                                // the ray with its component along the gaze removed
  const onRetina = R.image.every((I) => Math.abs(dot(sub(I, R.retina.center), gz)) < 1e-12);
  const parallel = [[R.P0, R.image[0]], [R.P1, R.image[1]]].every(([A, I]) => Math.abs(cross2(sub(I, A), gz)) < 1e-12);
  worst = Math.max(worst, Math.abs(norm(ray) - 1), Math.abs(ang - a), Math.abs(imgLen - shadowLen), Math.abs(R.imageLen - imgLen), Math.abs(cross2(R.eye, gz)));
  if (!onRetina || !parallel) bad.push(a);
}
check('HEAD-ON: the ray keeps length 1, the angle to the line of sight is α, the image is the ray with its component along the gaze removed (|ray × gaze|), on the retina, by parallel projectors', worst < 1e-9 && !bad.length, `max error ${worst}; bad at ${bad}`);
s = await seek(0);
check('HEAD-ON at α = 0°: o · a = 1 and the image is a single point', close(dot(s.ray.gaze, [-1, 0]), 1, 1e-12) && s.ray.imageLen < 1e-12 && s.hud[1].includes('一个点'));
s = await seek(45);
check('HEAD-ON at α = 45°: image sin 45° ≈ 0.71, shown beside the retina', close(s.ray.imageLen, Math.SQRT1_2, 1e-12) && tagText(s, 'img').includes('0.71'));
s = await click('#alphaChips [data-alpha="20"]');
check('the α chips jump to 20°: image length 0.342', close(s.t, 20) && close(s.ray.imageLen, 0.3420201433, 1e-9) && s.preset === null);
await seek(45);
s = await dragFrom(await at2(1.2 * Math.cos(45 * DEG), 1.2 * Math.sin(45 * DEG)), await at2(1.2 * Math.cos(30 * DEG), 1.2 * Math.sin(30 * DEG)));
check('dragging on the RAY stage turns the eye to α ≈ 30° (the ray itself stays put)', Math.abs(s.t - 30) < 1.2 && close(s.ray.P0[0], -0.5) && close(s.ray.P1[0], 0.5), `α = ${s.t}`);
check('a drag on a 2D scene leaves the hidden 3D camera alone', close(s.cam.yaw, -1.9) && close(s.cam.pitch, 0.34), JSON.stringify(s.cam));

/* ---------- 2 · edge-on: the post goes round, the shadow keeps only x ---------- */
s = await scene('disc', 'one');
check('scene DISC with one post: the rail is the turn θ over 0 … 360°', s.mode === 'one' && close(s.max, 360));
const h = 1e-3;   // degrees
worst = 0; let fdErr = 0, ccw = Infinity;
const xs = [];
for (const phi of [0, 30, 60, 90, 135, 180, 225, 270, 315]) {
  s = await seek(phi); const G = s.disc;
  const depth = [0, 1];                                                       // the edge-on viewer looks along the depth axis
  const flat = sub(G.post, depth.map((d) => d * dot(G.post, depth)));         // remove the depth component
  worst = Math.max(worst, Math.abs(norm(G.post) - 1), Math.abs(Math.atan2(G.post[1], G.post[0]) / DEG - (phi > 180 ? phi - 360 : phi)), Math.abs(flat[1]), Math.abs(flat[0] - G.shadow));
  const a = (await seek(phi + h)).disc, b = (await seek(phi - h + (phi === 0 ? 360 : 0))).disc;
  const span = 2 * h * DEG, fv = [(a.post[0] - b.post[0]) / span, (a.post[1] - b.post[1]) / span], fx = (a.shadow - b.shadow) / span;
  fdErr = Math.max(fdErr, Math.abs(fv[0] - G.vel[0]), Math.abs(fv[1] - G.vel[1]), Math.abs(fx - G.shadowVel));
  ccw = Math.min(ccw, cross2(G.post, G.vel));                                 // > 0: anticlockwise
  xs.push([phi, G.shadow, G.shadowVel, G.speed]);
}
check('EDGE-ON: the post sits on the unit circle at θ, and its shadow is the post with the depth component removed', worst < 1e-9, `max error ${worst}`);
check('EDGE-ON: the velocity of the post and of its shadow match finite differences of the positions (per radian of turn: in units of the post speed)', fdErr < 1e-6, `max error ${fdErr}`);
check('EDGE-ON: the post turns anticlockwise at speed 1', ccw > 1 - 1e-9 && xs.every(([, , , v]) => close(v, 1, 1e-12)));
const xAt = (p) => xs.find(([q]) => q === p);
check('EDGE-ON: cos 90° = cos 270° = 0 — two positions on the same spot', Math.abs(xAt(90)[1]) < 1e-12 && Math.abs(xAt(270)[1]) < 1e-12);
check('EDGE-ON: at the ends (θ = 0°, 180°) the shadow stands still while the post still moves', Math.abs(xAt(0)[2]) < 1e-12 && Math.abs(xAt(180)[2]) < 1e-12 && close(Math.abs(xAt(0)[1]), 1, 1e-12));
let lo = Infinity, hi = -Infinity;
for (let phi = 0; phi < 360; phi += 7.5) { const x = (await seek(phi)).disc.shadow; lo = Math.min(lo, x); hi = Math.max(hi, x); }
check('EDGE-ON: the shadows of the whole circle fill exactly the segment [−1, 1] (the side view of the disc)', close(lo, -1, 1e-12) && close(hi, 1, 1e-12), `${lo} … ${hi}`);
for (const [phi, x, v] of [[90, 0, -1], [180, -1, 0], [270, 0, 1], [0, 1, 0]]) {
  s = await click(`#phiChips [data-phi="${phi}"]`);
  check(`the θ chip ${phi}° jumps there: x = ${x}, sideways speed ${v}`, close(s.t, phi) && close(s.disc.shadow, x, 1e-12) && close(s.disc.shadowVel, v, 1e-12) && !s.playing);
}
await seek(90); s = await click('#discStep');
check('ONE STEP moves θ on by 15°', close(s.t, 105) && !s.playing);
s = await click('#discZero');
check('BACK TO THE START puts θ at 0°', close(s.t, 0));
await seek(60);
s = await dragFrom(await at2(Math.cos(60 * DEG), Math.sin(60 * DEG)), await at2(Math.cos(150 * DEG), Math.sin(150 * DEG)));
check('dragging the post round the disc sets θ ≈ 150°', Math.abs(s.t - 150) < 1, `θ = ${s.t}`);
await seek(200); s = await click('#rew');
check('⏮ on the rail goes back to θ = 0°', close(s.t, 0));
check('the play button plays the post round', await playsAfter(page, () => page.click('#play'), () => window.PRELUDE_DEBUG.state));
await page.keyboard.press('Space'); s = await state();
check('Space pauses it', !s.playing);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await seek(30); await page.keyboard.press('ArrowRight'); s = await state();
check('→ steps the rail by 15°', close(s.t, 45));

/* ---------- 3 · same shadow, opposite next step ---------- */
s = await click('#discMode [data-disc="pair"]');
check('TWO POSTS: the rail is the common advance δ over 0 … 45°', s.mode === 'pair' && close(s.max, 45) && close(s.t, 0));
const pr = s.pair;
check('SAME-X at δ = 0: the cyan and magenta posts are opposite points of the circle (θ = 90° and 270°)',
  close(pr.a.post[0] + pr.b.post[0], 0, 1e-12) && close(pr.a.post[1] + pr.b.post[1], 0, 1e-12) && close(pr.a.post[1], 1, 1e-12));
check('SAME-X at δ = 0: both shadows fall on x = 0 (the dot product with the x axis)', Math.abs(dot(pr.a.post, [1, 0])) < 1e-12 && Math.abs(pr.a.shadow) < 1e-12 && Math.abs(pr.b.shadow) < 1e-12);
const step = 0.5, nxt = (await seek(step)).pair;
const da = (nxt.a.shadow - pr.a.shadow) / (step * DEG), db = (nxt.b.shadow - pr.b.shadow) / (step * DEG);
check('SAME-X: one step on, the two shadows move in opposite directions (finite differences ≈ −1 and +1)', da < -0.99 && db > 0.99 && close(pr.a.shadowVel, -1, 1e-12) && close(pr.b.shadowVel, 1, 1e-12), `${da} ${db}`);
s = await seek(10);
const rot = (p, d) => [p[0] * Math.cos(d) - p[1] * Math.sin(d), p[0] * Math.sin(d) + p[1] * Math.cos(d)];   // rotate the start posts
const ra = rot([0, 1], 10 * DEG), rb = rot([0, -1], 10 * DEG);
check('SAME-X at δ = 10°: the posts are the start posts turned by δ, and the shadows have parted (cyan left, magenta right)',
  close(s.pair.a.post[0], ra[0], 1e-12) && close(s.pair.b.post[0], rb[0], 1e-12) && s.pair.a.shadow < 0 && s.pair.b.shadow > 0 && close(s.pair.b.shadow - s.pair.a.shadow, 2 * Math.sin(10 * DEG), 1e-12));
s = await click('#discStep');
check('ONE STEP with two posts advances δ by 5°', close(s.t, 15));
s = await seek(0);
check('SAME-X: the stage says it in words', tagText(s, 'say').includes('影子位置相同') && tagText(s, 'say').includes('下一步却相反'));
check('SAME-X: the legend uses cyan and magenta for the two posts, and no green or red',
  await page.evaluate(() => { const c = [...document.querySelectorAll('#legend .sw')].map((e) => e.className); return c.some((x) => /\bcy\b/.test(x)) && c.some((x) => /\bmg\b/.test(x)) && !c.some((x) => /\b(ok|wn)\b/.test(x)); }));
s = await dragFrom(await at2(0, 1), await at2(Math.cos(120 * DEG), Math.sin(120 * DEG)));
check('dragging the cyan post on by 30° sets δ ≈ 30°', Math.abs(s.t - 30) < 1, `δ = ${s.t}`);
s = await click('#discMode [data-disc="one"]');
check('back to one post', s.mode === 'one');
const shown = () => page.evaluate(() => ['#hudTl', '#legend', '#readouts', '#ctlPanel', '#pillRail', '#tau', '#presetNote', '#stage .tags', '#plotMeta']
  .map((q) => document.querySelector(q)).filter((el) => el && el.getClientRects().length).map((el) => el.innerText).join(' | '));
const drawerItems = (lang) => page.evaluate((l) => [...document.querySelectorAll(`#drawer .${l} li`)].map((li) => li.textContent), lang);
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await seek(60);
  const one = await shown();
  await page.click('#discMode [data-disc="pair"]'); await seek(0);
  const two = await shown();
  await page.click('#discMode [data-disc="one"]');
  const li = await drawerItems(lang), unit = lang === 'zh' ? '以木桩速度为单位' : 'in units of the post speed';
  check(`DISC (${lang}): the turn is θ on every visible label, legend, readout and control (as in the prelude), never φ; speeds are in units of the post speed`,
    !/φ/.test(one + two) && /θ = 60°/.test(one) && /θ = 90° \+ δ/.test(two) && one.includes(unit) && two.includes(unit)
    && /cos θ, sin θ/.test(li[1]) && !/φ/.test(li[1] + li[2]) && li[1].includes(unit) && li[2].includes(unit) && /θ/.test(li[3]) && /φ/.test(li[3]),
    (one + ' ‖ ' + two).slice(0, 400));
}
await page.click('[data-lang-set="zh"]');
check('COSINE (zh): the control note says radians, not degrees (度数)', await page.evaluate(() => document.querySelector('[data-scenes="cobweb"] .note .zh').textContent.includes('不是度数')));

/* ---------- 4 · latitude ---------- */
s = await click('#sceneChips [data-scene="sphere"]');
check('scene SPHERE opens on the latitude, θ chips and slider shown', s.mode === 'lat' && await page.isVisible('#theta') && await page.isVisible('#thetaChips'));
s = await click('#thetaChips [data-theta="50"]');
const ringLen = (pts) => pts.reduce((acc, p, i) => acc + norm(sub(pts[(i + 1) % pts.length], p)), 0);
worst = 0;
for (const phi of [0, 45, 200]) {
  s = await seek(phi); const G = s.lat, p = G.point;
  const az = (Math.atan2(p[1], p[0]) / DEG + 360) % 360;
  worst = Math.max(worst, Math.abs(norm(p) - 1), Math.abs(dot(p, G.normal) - G.offset), Math.abs(G.offset - Math.cos(50 * DEG)), Math.abs(az - phi) % 360);
}
check('LATITUDE: the amber point stays on the sphere and on the plane z = cos 50° at azimuth φ', worst < 1e-9, `max error ${worst}`);
let ring = await page.evaluate(() => window.PRELUDE_DEBUG.ring(4000));
const d50 = Math.cos(50 * DEG), cut50 = Math.sqrt(1 - d50 * d50);   // a plane at distance d cuts the unit sphere in a circle of radius √(1 − d²)
check('LATITUDE: the drawn circle is the cut of the sphere by the plane at distance cos θ, and its length (summed along it) is 2π sin θ < 2π',
  ring.every((q) => close(norm(q), 1, 1e-12) && close(q[2], d50, 1e-12)) && close(ringLen(ring), s.lat.length, 1e-5) && close(s.lat.radius, cut50, 1e-12) && s.lat.length < 2 * Math.PI - 1 && !s.lat.great);
s = await setRange('theta', 90);
ring = await page.evaluate(() => window.PRELUDE_DEBUG.ring(4000));
check('the θ slider at 90°: the plane passes through the centre and the latitude is the great circle of length 2π',
  close(s.theta, 90) && s.lat.great && Math.abs(s.lat.offset) < 1e-12 && close(ringLen(ring), 2 * Math.PI, 1e-5) && s.hud[1].includes('大圆') && s.preset === null);
s = await click('#thetaChips [data-theta="50"]');
check('the θ chip 50° sets θ back to 50°', close(s.theta, 50));
s = await seek(30);
const target = [Math.sin(60 * DEG) * Math.cos(30 * DEG), Math.sin(60 * DEG) * Math.sin(30 * DEG), Math.cos(60 * DEG)];
s = await dragFrom(await at3(s.lat.point), await at3(target));
check('dragging the amber point moves it to θ ≈ 60°, φ ≈ 30°', Math.abs(s.theta - 60) <= 2 && Math.abs(s.t - 30) < 2.5, `θ ${s.theta}, φ ${s.t}`);
// what the reader sees after using the visible controls (the θ chip, then the slider by keyboard): the cyan legend entry,
// the signed plane height z = cos θ on the readout and the non-negative distance |cos θ| on the stage title must agree
const latShown = () => page.evaluate(() => {
  const vis = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const cy = [...document.querySelectorAll('#legend > span')].find((e) => vis(e) && e.querySelector('.sw.cy'));
  const ro = document.getElementById('ro3'), hud = document.getElementById('hudSub');
  return { legend: cy ? cy.textContent : '', legendAll: document.getElementById('legend').textContent, hud: vis(hud) ? hud.textContent : '',
    roT: vis(ro) ? document.getElementById('ro3T').textContent : '', roV: vis(ro) ? document.getElementById('ro3V').textContent : '', out: document.getElementById('oTheta').textContent };
});
const num = (x) => Number(String(x).trim().replace('−', '-').replace(/^\+/, ''));
const cos120 = Math.cos(120 * DEG);   // −1/2: the plane lies below the centre
for (const lang of ['zh', 'en']) {
  const zh = lang === 'zh';
  await page.click(`[data-lang-set="${lang}"]`);
  s = await click('#thetaChips [data-theta="90"]');
  let v = await latShown();
  const label = zh ? '平面高度 z = cos θ（带符号）' : 'Signed plane height z = cos θ';
  check(`LATITUDE (${lang}) at θ = 90° via the chip: the cyan legend says its plane passes through the centre, the readout shows the signed height 0, the title says the plane passes through the centre`,
    close(s.theta, 90) && v.legend.includes(zh ? '纬圈：平面经过球心' : 'latitude: its plane passes through the centre') && !/不过球心|misses the centre/.test(v.legendAll)
    && v.roT === label && num(v.roV) === 0 && v.hud.includes(zh ? '平面过球心' : 'the plane passes through the centre') && v.out === '90°', JSON.stringify(v));
  check(`θ slider (${lang}) is visible and starts from the chip value`, await page.isVisible('#theta') && (await page.inputValue('#theta')) === '90');
  for (let i = 0; i < 30; i++) await page.locator('#theta').press('ArrowRight');   // the slider steps by 1°
  s = await state(); v = await latShown();
  const height = num(v.roV), dist = num((v.hud.match(zh ? /平面离球心 (\S+)/ : /plane (\S+) from the centre/) || [])[1]);
  check(`LATITUDE (${lang}) at θ = 120° via the slider: the legend says the plane misses the centre, the readout shows the signed height cos 120° = −0.500 and the title the distance |cos θ| = 0.50`,
    close(s.theta, 120) && (await page.inputValue('#theta')) === '120' && v.out === '120°'
    && v.legend.includes(zh ? '纬圈：平面不过球心' : 'latitude: its plane misses the centre') && !/经过球心|passes through/.test(v.legendAll)
    && v.roT === label && v.roV.startsWith('−') && Math.abs(height - cos120) < 5e-4
    && dist > 0 && Math.abs(dist - Math.abs(cos120)) < 5e-3 && dist === Number(Math.abs(height).toFixed(2)) && s.lat.offset < 0 && !s.lat.great, JSON.stringify(v));
  const li = (await drawerItems(lang))[3];
  check(`LATITUDE (${lang}): the drawer gives the plane z = cos θ, cos θ as a signed height and |cos θ| as the distance to the centre`,
    li.includes('z = cos θ') && li.includes('|cos θ|') && li.includes(zh ? '带符号的高度' : 'signed height') && li.includes(zh ? '到球心的距离' : 'distance from the plane to the centre')
    && !/离球心 cos θ|lies cos θ from/.test(li), li);
}
await page.click('[data-lang-set="zh"]');

/* ---------- 5 · the old circle becomes an equator ---------- */
s = await click('#sphereMode [data-sphere="lift"]');
check('NEW AXIS: the rail is the lift angle η over 0 … 90°', s.mode === 'lift' && close(s.max, 90));
const old = await page.evaluate(() => window.PRELUDE_DEBUG.ring(360));
worst = 0;
for (const eta of [0, 30, 60, 90]) {
  s = await seek(eta); const G = s.lift;
  const horiz = [G.point[0], G.point[1], 0];
  worst = Math.max(worst, Math.abs(norm(G.point) - 1), Math.abs(G.point[2] - Math.sin(eta * DEG)), Math.abs(norm(horiz) - Math.cos(eta * DEG)),
    eta < 90 ? Math.abs(norm(sub(horiz.map((x) => x / norm(horiz)), G.base))) : 0, Math.abs(norm(G.base) - 1), Math.abs(G.base[2]));
}
check('NEW AXIS: the lifted point stays at distance 1 — cos η of it in the old plane along the old radius, sin η along the new axis', worst < 1e-9, `max error ${worst}`);
check('NEW AXIS: the old circle stays in its plane with radius 1, and the poles ±e₃ are unit and orthogonal to every point of it',
  old.every((q) => close(norm(q), 1, 1e-12) && Math.abs(q[2]) < 1e-12) && s.lift.poles.every((p) => close(norm(p), 1) && old.every((q) => Math.abs(dot(p, q)) < 1e-12)));
check('NEW AXIS: at η = 0 the point is on the old circle, at η = 90° it is the pole +e₃', close((await seek(0)).lift.point[2], 0, 1e-12) && close((await seek(90)).lift.point[2], 1, 1e-12));
const p30 = await at3((await seek(30)).lift.point), p60 = await at3((await seek(60)).lift.point);
s = await dragFrom(p60, p30);
check('dragging the amber point down the meridian sets η ≈ 30°', Math.abs(s.t - 30) < 2.5, `η = ${s.t}`);
s = await state();
check('NEW AXIS: the stage labels ±e₃ and says the radius is still 1', tagText(s, 'np').includes('e₃') && tagText(s, 'sp').includes('e₃') && tagText(s, 'one').includes('1'));

/* ---------- 6 · the six-way mixture ---------- */
s = await click('#sphereMode [data-sphere="mean"]');
check('MIXTURE: the rail is the mixing share w over 0 … 1', s.mode === 'mean' && close(s.max, 1));
const AX = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
const pairs = s.mean.dirs.every((d) => s.mean.dirs.some((e) => close(norm(d.map((x, i) => x + e[i])), 0)));
check('MIXTURE: the six directions are three opposite pairs of unit axes', pairs && s.mean.dirs.every((d) => close(norm(d), 1)) && s.mean.dirs.length === 6);
worst = 0;
for (const w of [0, 0.25, 0.5, 0.8, 1]) {
  s = await seek(w); const G = s.mean;
  const own = AX.map((d) => (d[2] === 1 ? 1 - w + w / 6 : w / 6));
  const m = [0, 1, 2].map((k) => G.dirs.reduce((acc, d, i) => acc + G.weights[i] * d[k], 0));
  worst = Math.max(worst, Math.abs(G.weights.reduce((a, b) => a + b, 0) - 1), ...G.weights.map((x, i) => Math.abs(x - own[AX.findIndex((d) => d.every((v, k) => v === G.dirs[i][k]))])),
    ...m.map((x, k) => Math.abs(x - G.mean[k])), Math.abs(norm(m) - (1 - w)), Math.abs(G.len - norm(m)));
}
check('MIXTURE: the weights spread linearly from +z to 1/6 each, and the weighted sum of the six vectors (summed here) is the amber mean, |m| = 1 − w', worst < 1e-12, `max error ${worst}`);
s = await seek(1);
check('MIXTURE at w = 1: every weight is 1/6 and the mean is the centre', s.mean.weights.every((x) => close(x, 1 / 6, 1e-15)) && s.mean.len < 1e-12 && s.hud[1].includes('1/6'));
const yaw0 = s.cam.yaw;
const box = await page.locator('#cv').boundingBox();
s = await dragFrom([box.x + box.width * 0.08, box.y + box.height * 0.6], [box.x + box.width * 0.2, box.y + box.height * 0.6]);
check('dragging empty space on the sphere turns the camera', Math.abs(s.cam.yaw - yaw0) > 0.2, `${yaw0} → ${s.cam.yaw}`);

/* ---------- 7 · the cosine cobweb ---------- */
s = await click('#sceneChips [data-scene="cobweb"]');
check('scene COSINE: the rail is the step k over 0 … 12', s.mode === 'cob' && close(s.max, 12));
s = await seek(6);
const own = [1]; for (let k = 0; k < 12; k++) own.push(Math.cos(own[k]));
let a0 = 0, b0 = 1; for (let i = 0; i < 80; i++) { const m = (a0 + b0) / 2; if (Math.cos(m) - m > 0) a0 = m; else b0 = m; }   // cos x = x by bisection
const star = (a0 + b0) / 2;
check('COSINE: the iterates are θₖ₊₁ = cos θₖ from θ₀ = 1, and θ₆ ≈ 0.7640', s.cob.seq.length === 7 && s.cob.seq.every((x, i) => close(x, own[i], 1e-15)) && close(s.cob.theta, 0.7639596829, 1e-9));
check('COSINE: the crossing drawn is the root of cos x = x found by bisection (0.739085…)', close(s.cob.thetaStar, star, 1e-12));
const path = s.cob.path;
let onCurve = true, onDiag = true, axis = true;
for (let i = 1; i < path.length; i++) {
  const [p, q] = [path[i - 1], path[i]];
  axis = axis && (close(p[0], q[0], 1e-15) || close(p[1], q[1], 1e-15));
  if (i % 2 === 1) onCurve = onCurve && close(q[1], Math.cos(q[0]), 1e-15); else onDiag = onDiag && close(q[0], q[1], 1e-15);
}
check('COSINE: the path starts at (1, 0), runs vertically to y = cos θ and horizontally to y = θ, in turn', close(path[0][0], 1) && close(path[0][1], 0) && axis && onCurve && onDiag && path.length === 13);
check('COSINE: the iterates fall to either side of θ* in turn and close in',
  own.slice(0, 12).every((x, i) => Math.sign(x - star) === -Math.sign(own[i + 1] - star)) && Math.abs(own[12] - star) < Math.abs(own[6] - star));
check('COSINE: the stage shows θ₆ ≈ 0.7640 and θ* for reference', tagText(s, 'tk').includes('0.7640') && tagText(s, 'star').includes('0.739'));
s = await seek(6.25);
const last = s.cob.path[s.cob.path.length - 1];
check('COSINE: a quarter of the way into step 7 the path is halfway from (θ₆, θ₆) to the curve', close(last[0], own[6], 1e-15) && Math.abs(last[1] - (own[6] + (Math.cos(own[6]) - own[6]) * 0.5)) < 1e-12);
await seek(6); s = await click('#cobStep');
check('NEXT STEP goes from k = 6 to k = 7', close(s.t, 7));
s = await click('#cobZero');
check('BACK TO θ₀ goes to k = 0', close(s.t, 0) && s.cob.path.length === 1);

/* ---------- keys and scene buttons ---------- */
await page.locator('body').click({ position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'ray'], ['2', 'disc'], ['3', 'sphere'], ['4', 'cobweb']]) { await page.keyboard.press(key); s = await state(); check(`key ${key} switches to the ${sc} scene`, s.scene === sc); }
check('each scene shows only its own controls', await page.evaluate(() => {
  const vis = (sel) => { const el = document.querySelector(sel); return !!el && !!el.offsetParent; };
  return vis('#cobStep') && !vis('#discStep') && !vis('#theta') && !vis('#alphaChips');
}));

/* ---------- cards: every card plays when clicked, and lands where its note says ---------- */
const WANT = { 'head-on': 'ray', shadow: 'one', compare: 'pair', latitude: 'lat', normal: 'lift', average: 'mean', cosine: 'cob' };
for (const [card, m] of Object.entries(WANT)) {
  check(`card ${card} plays when clicked`, await playsAfter(page, () => page.click(`[data-preset="${card}"]`), () => window.PRELUDE_DEBUG.state));
  s = await state();
  check(`card ${card} opens its situation (${m}) and explains itself`, s.preset === card && s.mode === m && (await page.textContent('#presetNote')).trim().length > 20);
  await page.evaluate(() => window.PRELUDE_DEBUG.seek(0));
}
await page.click('[data-lang-set="en"]'); await page.click('[data-preset="compare"]'); await page.evaluate(() => window.PRELUDE_DEBUG.seek(0)); s = await state();
check('English: the SAME-X note and the stage say the same thing', (await page.textContent('#presetNote')).includes('same shadow position, opposite next step') && tagText(s, 'say').includes('opposite next step'));
check('English: the drawer keeps φ and θ in lower case', await page.evaluate(() => /φ/.test(document.getElementById('drawer').textContent) && /θ/.test(document.getElementById('drawer').textContent)));
await page.click('[data-lang-set="zh"]');

/* ---------- a cited card plays only once it is in view; the reader keeps control ---------- */
const fig = await T.open(BOOK, ID, '?embed=1&lang=zh&preset=shadow', { viewport: { width: 740, height: 500 } });
await settle(fig, 300);
check('cited EDGE-ON: plays once in view (kit.autoplay)', await until(fig, () => { const d = window.PRELUDE_DEBUG.state; return d.playing && d.t > 0 && d.preset === 'shadow'; }));
await fig.click('#play'); await settle(fig);
const paused = await fig.evaluate(() => window.PRELUDE_DEBUG.state.t);
await fig.evaluate(() => new Promise((done) => { let n = 6; const f = () => (n-- > 0 ? requestAnimationFrame(f) : done()); f(); }));
const later = await fig.evaluate(() => window.PRELUDE_DEBUG.state);
check('cited EDGE-ON: ❚❚ stops it and nothing restarts it', !later.playing && close(later.t, paused), `${paused} → ${later.t} ${later.playing}`);
await fig.context().close();

/* ---------- the stills a chapter prints: the frame its caption describes ---------- */
const still = async (card, lang, fn) => { const p = await openStill(T, BOOK, ID, card, lang); const d = await p.evaluate(() => window.PRELUDE_DEBUG.state); await p.context().close(); return fn(d); };
for (const lang of ['zh', 'en']) {
  check(`still head-on (${lang}): α = 45°, image sin 45° ≈ 0.71`, await still('head-on', lang, (d) => d.mode === 'ray' && close(d.t, 45) && close(d.ray.imageLen, Math.SQRT1_2, 1e-12) && tagText(d, 'img').includes('0.71') && !d.playing));
  check(`still shadow (${lang}): θ = 60°, x = 0.50 under the post, both views named`, await still('shadow', lang, (d) => d.mode === 'one' && close(d.t, 60) && close(d.disc.shadow, 0.5, 1e-12) && tagText(d, 'x').includes('0.50') && tagText(d, 'top') && tagText(d, 'side')));
  check(`still compare (${lang}): δ = 0, both shadows at x = 0 with speeds −1 and +1`, await still('compare', lang, (d) => d.mode === 'pair' && close(d.t, 0) && Math.abs(d.pair.a.shadow) < 1e-12 && Math.abs(d.pair.b.shadow) < 1e-12 && close(d.pair.a.shadowVel, -1, 1e-12) && close(d.pair.b.shadowVel, 1, 1e-12) && tagText(d, 'say')));
  check(`still latitude (${lang}): θ = 50°, φ = 45°`, await still('latitude', lang, (d) => d.mode === 'lat' && close(d.theta, 50) && close(d.t, 45) && close(d.lat.point[2], Math.cos(50 * DEG), 1e-12)));
  check(`still normal (${lang}): η = 60°, the point at distance 1, both poles labelled`, await still('normal', lang, (d) => d.mode === 'lift' && close(d.t, 60) && close(norm(d.lift.point), 1, 1e-12) && tagText(d, 'np') && tagText(d, 'sp')));
  check(`still average (${lang}): the mixture is complete, the mean at the centre`, await still('average', lang, (d) => d.mode === 'mean' && close(d.t, 1) && d.mean.len < 1e-12));
  check(`still cosine (${lang}): six steps, θ₆ ≈ 0.7640 on the stage`, await still('cosine', lang, (d) => d.mode === 'cob' && close(d.t, 6) && d.cob.k === 6 && tagText(d, 'tk').includes('0.7640')));
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
