// Browser regression suite for GATE//POLYTOPE (books/quantum-geometry/viz/gate-word-polytope/).
//   node books/quantum-geometry/viz/tests/gate-word-polytope.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page turns Bloch vectors with the 3 × 3 rotations R_H, R_T and builds an incremental hull. The suite works with
// spinors instead: H = (1/√2)[[1, 1], [1, −1]] and T = diag(1, e^{iπ/4}) act on |0⟩, and the Bloch vector is read off
// as (2 Re ā b, 2 Im ā b, |a|² − |b|²). It finds the covering radius by enumerating spherical circumcentres of triples
// (L ≤ 9) or by a grid with local refinement (larger L), and checks the page's hull face by face against all points.
// It reads the page through window.GATE_DEBUG and never calls the page's own model.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'gate-word-polytope';
const T = await session();
const { check } = T;
const DEG = 180 / Math.PI;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const unit = (a) => { const n = Math.hypot(...a); return a.map((c) => c / n); };
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));

/* ---------- independent model: spinors ---------- */
const s2 = Math.SQRT1_2, w8 = [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4)];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const GATES = {
  H: ([a, b]) => [[(a[0] + b[0]) * s2, (a[1] + b[1]) * s2], [(a[0] - b[0]) * s2, (a[1] - b[1]) * s2]],
  T: ([a, b]) => [a, cmul(w8, b)]
};
const bloch = ([a, b]) => { const ab = [a[0] * b[0] + a[1] * b[1], a[0] * b[1] - a[1] * b[0]]; return [2 * ab[0], 2 * ab[1], a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2]; };
/** A word written as an operator product acts from the right: the rightmost gate first. */
const apply = (word) => bloch([...word].reverse().reduce((psi, g) => GATES[g](psi), [[1, 0], [0, 0]]));
const k7 = (p) => p.map((c) => (Math.round(c * 1e7) / 1e7 + 0).toFixed(7)).join(',');
const ORBIT = [[{ p: [0, 0, 1], len: 0 }]];
{
  const seen = new Map([[k7([0, 0, 1]), 0]]);
  let front = [[[1, 0], [0, 0]]], all = [{ p: [0, 0, 1], len: 0 }];
  for (let l = 1; l <= 20; l++) {
    const next = [];
    for (const psi of front) for (const g of ['H', 'T']) {
      const q = GATES[g](psi), p = bloch(q), k = k7(p);
      if (!seen.has(k)) { seen.set(k, l); next.push(q); all = all.concat([{ p, len: l }]); }
    }
    front = next; ORBIT.push(all);
  }
}
/** The covering radius: circumcentres of triples whose cap is empty (exact up to rounding). */
function epsTriples(pts) {
  if (pts.length === 1) return 180;
  if (pts.length === 2) { const m = unit(pts[0].map((c, i) => -(c + pts[1][i]))); return Math.acos(dot(m, pts[0])) * DEG; }
  let best = 0;
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) for (let k = j + 1; k < pts.length; k++) {
    const n0 = cross(sub(pts[j], pts[i]), sub(pts[k], pts[i])), ln = Math.hypot(...n0);
    if (ln < 1e-12) continue;
    for (const s of [1, -1]) {
      const m = n0.map((c) => s * c / ln), h = dot(m, pts[i]);
      if (Math.acos(Math.max(-1, Math.min(1, h))) * DEG <= best) continue;
      if (pts.every((p) => dot(m, p) <= h + 1e-9)) best = Math.acos(Math.max(-1, Math.min(1, h))) * DEG;
    }
  }
  return best;
}
const hOf = (pts, n) => Math.max(...pts.map((p) => dot(p, n)));
/** The covering radius by a Fibonacci grid and a shrinking local search around the best few directions. */
function epsGrid(pts) {
  const N = 20000, g = Math.PI * (3 - Math.sqrt(5)), cand = [];
  for (let i = 0; i < N; i++) { const z = 1 - 2 * (i + 0.5) / N, r = Math.sqrt(1 - z * z), n = [r * Math.cos(g * i), r * Math.sin(g * i), z]; cand.push([hOf(pts, n), n]); }
  cand.sort((a, b) => a[0] - b[0]);
  let best = 2;
  for (const [, n0] of cand.slice(0, 12)) {
    let n = n0, h = hOf(pts, n);
    for (let step = 0.02; step > 1e-9; step /= 2) {
      let moved = true;
      while (moved) {
        moved = false;
        for (let a = 0; a < 12; a++) {
          const t = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), u = cross(n, t), ang = a * Math.PI / 6;
          const m = unit(n.map((c, i) => c + step * (Math.cos(ang) * t[i] + Math.sin(ang) * u[i]))), hm = hOf(pts, m);
          if (hm < h - 1e-15) { n = m; h = hm; moved = true; }
        }
      }
    }
    best = Math.min(best, h);
  }
  return Math.acos(best) * DEG;
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.GATE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.GATE_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

let s = await state();
check('opens on the NEAREST card at L = 10', s.preset === 'nearest' && s.L === 10 && !s.playing);
check('the counts |S_L| agree with the spinor orbit for L = 0 … 20', s.counts.every((c, l) => c === ORBIT[l].length), `${s.counts.join(',')} / ${ORBIT.map((o) => o.length).join(',')}`);
check('the counts start 1, 2, 3, 5 as in the worked example, and never exceed 2^(L+1) − 1', s.counts.slice(0, 4).join(',') === '1,2,3,5' && s.counts.every((c, l) => c <= 2 ** (l + 1) - 1));

s = await seek(20);
let wordErr = 0, lenOK = true;
const byKey = new Map(ORBIT[20].map((o) => [k7(o.p), o.len]));
for (const q of s.points) { wordErr = Math.max(wordErr, ...apply(q.word).map((c, i) => Math.abs(c - q.p[i]))); if (byKey.get(k7(q.p)) !== q.word.length) lenOK = false; }
check('every one of the 971 words, applied to |0⟩ as 2 × 2 matrices, lands on its point', s.count === 971 && wordErr < 1e-12, `${wordErr}`);
check('every word is a shortest one (its length is the layer where the spinor orbit first meets the point)', lenOK && byKey.size === s.points.length);

s = await seek(3);
const FIVE = [[0, 0, 1], [1, 0, 0], [s2, s2, 0], [0, -s2, s2], [0, 1, 0]];
check('L = 3: exactly the five vertices of the worked example', s.count === 5 && FIVE.every((v) => s.points.some((q) => vclose(q.p, v, 1e-12))));

// the hull, face by face, and the covering radius against the test's own computation
let hullOK = true, hullBad = '', epsBad = '';
const exact = [];
for (let l = 0; l <= 20; l++) {
  s = await seek(l);
  const pts = s.points.map((q) => q.p);
  if (s.faces) {
    for (const f of s.faces) {
      if (!close(Math.hypot(...f.n), 1, 1e-9) || f.v.some((i) => !close(dot(f.n, pts[i]), f.d, 1e-9)) || pts.some((p) => dot(f.n, p) > f.d + 1e-9)) { hullOK = false; hullBad = `L${l}`; }
    }
    if (!pts.every((p) => s.faces.some((f) => close(dot(f.n, p), f.d, 1e-9)))) { hullOK = false; hullBad = `L${l} vertex`; }
  }
  const e = l <= 9 ? epsTriples(pts) : epsGrid(pts);
  exact.push(e);
  if (!close(s.eps, e, l <= 9 ? 1e-7 : 2e-4)) epsBad += ` L${l}: ${s.eps} vs ${e}`;
  if (!close(Math.acos(Math.min(1, hOf(pts, s.worst))) * DEG, s.eps, 1e-7)) epsBad += ` L${l}: worst direction`;
}
check('the hull of every layer L = 3 … 20: every face supports all points, and every point lies on a face', hullOK, hullBad);
check('ε_L agrees with the test (triples for L ≤ 9, a refined grid above), and the page\'s worst direction attains it', epsBad === '', epsBad);
s = await state();
check('ε_L never grows with L and stays above 0 up to L = 20', s.epsAll.every((e, l) => e > 0 && (l === 0 || e <= s.epsAll[l - 1] + 1e-9)));
check('ε: 180°, 135°, 110.94° at L = 0, 1, 3; exactly 90° at L = 4; 47.27° at L = 6; 9.10° at L = 20', close(exact[0], 180) && close(exact[1], 135, 1e-9) && close(exact[3], 110.941, 1e-3) && close(exact[4], 90, 1e-7) && close(exact[6], 47.2658, 1e-4) && close(s.epsAll[20], 9.10, 0.005), exact.slice(0, 7).map((e) => e.toFixed(4)).join(' '));
const shapes = [];
for (const l of [0, 1, 2, 3, 4, 5]) shapes.push((await seek(l)).shape);
check('shape: point, segment, triangle, centre outside (L = 3), centre on a face (L = 4), centre inside (L = 5)', shapes.join(',') === 'point,segment,triangle,outside,onface,inside', shapes.join(','));

// the cards
const nearestOf = (pts, n) => { let b = -2, at = null; for (const p of pts) { const d = dot(p, n); if (d > b + 1e-12) { b = d; at = p; } } return { h: b, p: at, angle: Math.acos(Math.min(1, b)) * DEG }; };
await pick('one'); s = await seek(1);
check('LENGTH-1: two points e_z and e_x, the target e_x hit exactly by the word H', s.count === 2 && s.shape === 'segment' && vclose(s.target, [1, 0, 0], 1e-12) && s.nearest.word === 'H' && close(s.nearest.angle, 0, 1e-6) && close(s.gap, 0, 1e-12));
await pick('three'); s = await seek(3);
let nn = nearestOf(ORBIT[3].map((o) => o.p), [-1, 0, 0]);
check('LENGTH-3: target −e_x, support height h = 0, gap 1, nearest vertex 90° away', vclose(s.target, [-1, 0, 0], 1e-12) && close(s.h, 0, 1e-12) && close(nn.h, 0, 1e-12) && close(s.gap, 1, 1e-12) && close(s.nearest.angle, 90, 1e-9));
check('LENGTH-3: all five vertices have x ≥ 0 and z ≥ 0, the centre is outside', s.points.every((q) => q.p[0] >= -1e-12 && q.p[2] >= -1e-12) && s.shape === 'outside');
await pick('six'); s = await seek(6);
check('LENGTH-6: worst direction, projected drawing, 19 points around the centre, ε = 47.27°', s.mode === 'worst' && s.draw === 'geo' && s.count === 19 && s.shape === 'inside' && close(s.eps, exact[6], 1e-7) && close(s.nearest.angle, s.eps, 1e-7));
await pick('nearest'); s = await seek(10);
const tgt = [Math.sin(110 / DEG) * Math.cos(200 / DEG), Math.sin(110 / DEG) * Math.sin(200 / DEG), Math.cos(110 / DEG)];
nn = nearestOf(ORBIT[10].map((o) => o.p), tgt);
check('NEAREST: θ = 110°, φ = 200° at L = 10: 17.04°, gap 0.0439, by the word HTHTTTTTH', vclose(s.target, tgt, 1e-12) && close(s.nearest.angle, nn.angle, 1e-9) && close(nn.angle, 17.04, 0.005) && close(s.gap, 1 - nn.h, 1e-12) && close(s.gap, 0.0439, 0.00005) && s.nearest.word === 'HTHTTTTTH' && vclose(apply(s.nearest.word), nn.p, 1e-12));
await pick('shrink'); s = await seek(20);
check('SHRINK: L = 20, 971 points, worst direction, ε = 9.10° > 0', s.L === 20 && s.count === 971 && s.mode === 'worst' && close(s.eps, 9.10, 0.005));

// SHRINK, the cited still: the staircase ε_L stands on the stage beside the sphere, and the caption's numbers are its numbers
{
  const shot = await T.newPage();
  for (const lang of ['zh', 'en']) {
    await T.goto(BOOK, ID, `?shot=1&lang=${lang}&preset=shrink`, shot); await settle(shot);
    const r = await shot.evaluate(() => {
      const st = window.GATE_DEBUG.state, lab = `${st.eps.toFixed(2)}°`;
      return { st, label: [...document.querySelectorAll('#stage .tags .tag')].some((e) => !e.hidden && e.textContent.trim() === lab) };
    });
    const st = r.st, md = fs.readFileSync(new URL(`../../${lang}/ch16-qsvt-walks-and-compilation.md`, import.meta.url), 'utf8');
    const cap = (/::: \{\.viz src="gate-word-polytope" preset="shrink"[^}]*\}\n([\s\S]*?)\n:::/.exec(md) || [, ''])[1];
    const flat = st.epsAll.some((e, l) => l > 0 && close(e, st.epsAll[l - 1], 1e-9));
    check(`SHRINK still (${lang}): the staircase is on the stage, its bars are the test's own ε₀ … ε₂₀, and the current one is labelled`, st.chart && st.L === 20 && r.label && st.epsAll.length === 21 && st.epsAll.every((e, l) => close(e, exact[l], l <= 9 ? 1e-7 : 2e-4)));
    const nums = [`${Math.round(exact[0])}^\\circ`, `\\varepsilon_{${st.L}} = ${st.eps.toFixed(2)}^\\circ`, `$${st.count}$`];
    check(`SHRINK still (${lang}): the caption names 180°, ε₂₀ = ${st.eps.toFixed(2)}°, the ${st.count} points, and some layers do not shrink`, flat && nums.every((x) => cap.includes(x)), nums.filter((x) => !cap.includes(x)).join(' '));
  }
  await shot.close();
}

// controls
await pick('nearest'); await seek(10);
await setRange('theta', 40); await setRange('phi', 75); s = await state();
const t2 = [Math.sin(40 / DEG) * Math.cos(75 / DEG), Math.sin(40 / DEG) * Math.sin(75 / DEG), Math.cos(40 / DEG)];
nn = nearestOf(ORBIT[10].map((o) => o.p), t2);
check('the θ and φ sliders move the target and leave the card; the nearest point follows', s.preset === null && vclose(s.target, t2, 1e-12) && close(s.nearest.angle, nn.angle, 1e-9) && vclose(apply(s.nearest.word), nn.p, 1e-12));
await page.click('#modeChips [data-mode="worst"]'); s = await state();
check('the “worst direction” chip puts the target where ε_L is attained', s.mode === 'worst' && close(s.nearest.angle, s.eps, 1e-7));
await page.click('#modeChips [data-mode="free"]'); s = await state();
check('…and “my choice” brings back the chosen target', s.mode === 'free' && vclose(s.target, t2, 1e-12));
await page.click('#drawChips [data-draw="geo"]'); s = await state();
check('the drawing chips switch to the radial projection', s.draw === 'geo');
await page.click('#drawChips [data-draw="chord"]');

// dragging the target and orbiting
const from = await page.evaluate(() => window.GATE_DEBUG.screen(window.GATE_DEBUG.state.target));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] - 50, from[1] + 40, { steps: 5 }); await page.mouse.up();
s = await state();
const to = await page.evaluate(() => window.GATE_DEBUG.screen(window.GATE_DEBUG.state.target));
nn = nearestOf(ORBIT[10].map((o) => o.p), s.target);
check('dragging the amber target puts it under the pointer and updates the nearest point', Math.hypot(to[0] - from[0] + 50, to[1] - from[1] - 40) < 1.5 && close(s.nearest.angle, nn.angle, 1e-9), JSON.stringify(to));
const cam0 = await page.evaluate(() => window.GATE_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 40, box.y + box.height - 90); await page.mouse.down(); await page.mouse.move(box.x + 140, box.y + box.height - 130, { steps: 4 }); await page.mouse.up();
check('dragging empty space orbits the camera and leaves the target alone', (await page.evaluate(() => window.GATE_DEBUG.camera())).yaw !== cam0.yaw && vclose((await state()).target, s.target, 1e-12));

// playback, rail and keyboard
await seek(0);
await page.click('[data-preset="six"]');
check('clicking a card plays it', await until(page, () => { const d = window.GATE_DEBUG.state; return d.playing && d.t > 0; }));
check('the card stops by itself at its length (L = 6)', await until(page, () => { const d = window.GATE_DEBUG.state; return !d.playing && d.L === 6; }));
await page.click('#rew'); s = await state(); check('⏮ returns to L = 0 (the pole alone)', s.L === 0 && s.count === 1);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ adds one gate to the length bound', (await state()).L === 2);
await page.keyboard.press('ArrowLeft'); check('← takes one away', (await state()).L === 1);
await page.keyboard.press('End'); check('End goes to L = 20', (await state()).L === 20);
await page.keyboard.press('Home'); check('Home returns to L = 0', (await state()).L === 0);
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.GATE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.GATE_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 7.6); s = await state();
check('scrubbing the rail shows the whole layer reached (L = 7)', s.L === 7 && s.count === ORBIT[7].length);

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Length'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
