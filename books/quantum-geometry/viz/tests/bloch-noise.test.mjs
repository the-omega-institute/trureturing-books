// Browser regression suite for BLOCH//NOISE (books/quantum-geometry/viz/bloch-noise/).
//   node books/quantum-geometry/viz/tests/bloch-noise.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page moves Bloch vectors with affine maps. The suite recomputes everything with 2 × 2 complex density matrices:
// Kraus operators applied step by step, the trace distance from the eigenvalues of ρ − σ, the coherence mass from the
// off-diagonal entries, and the north-pole criterion by sampling the closed ball. It reads the page through
// window.NOISE_DEBUG and never calls the page's own model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'bloch-noise';
const T = await session();
const { check } = T;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vclose = (a, b, eps = 1e-9) => a.every((x, i) => close(x, b[i], eps));
const DEG = Math.PI / 180;
const sph = (th, ph) => [Math.sin(th * DEG) * Math.cos(ph * DEG), Math.sin(th * DEG) * Math.sin(ph * DEG), Math.cos(th * DEG)];

/* ---------- independent model: density matrices and Kraus operators ---------- */
const c = (re, im = 0) => [re, im];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], conj = (a) => [a[0], -a[1]];
const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const dag = (A) => [0, 1].map((i) => [0, 1].map((j) => conj(A[j][i])));
const madd = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(A[i][j], B[i][j])));
const mscale = (A, k) => A.map((r) => r.map((z) => [z[0] * k, z[1] * k]));
/** ρ = ½(I + xX + yY + zZ). */
const density = (r) => [[c((1 + r[2]) / 2), c(r[0] / 2, -r[1] / 2)], [c(r[0] / 2, r[1] / 2), c((1 - r[2]) / 2)]];
const blochOf = (R) => [2 * R[0][1][0], -2 * R[0][1][1], R[0][0][0] - R[1][1][0]];
const channel = (Ks) => (R) => Ks.reduce((acc, K) => madd(acc, mmul(mmul(K, R), dag(K))), [[c(0), c(0)], [c(0), c(0)]]);
const I2 = [[c(1), c(0)], [c(0), c(1)]], X = [[c(0), c(1)], [c(1), c(0)]], Y = [[c(0), c(0, -1)], [c(0, 1), c(0)]], Z = [[c(1), c(0)], [c(0), c(-1)]];
/** One step of each noise, as Kraus operators, at strength p. */
const STEP = {
  dephase: (p) => { const cc = 1 - p; return channel([mscale(I2, Math.sqrt((1 + cc) / 2)), mscale(Z, Math.sqrt((1 - cc) / 2))]); },
  amp: (p) => channel([[[c(1), c(0)], [c(0), c(Math.sqrt(1 - p))]], [[c(0), c(Math.sqrt(p))], [c(0), c(0)]]]),
  depol: (p) => channel([mscale(I2, Math.sqrt(1 - 3 * p / 4)), mscale(X, Math.sqrt(p / 4)), mscale(Y, Math.sqrt(p / 4)), mscale(Z, Math.sqrt(p / 4))])
};
/** The state after rail position N: n whole Kraus steps, and between steps the convex mixture of steps k and k + 1. */
function evolve(ch, p, r0, N) {
  const step = STEP[ch](p), k = Math.floor(N + 1e-12), u = N - k;
  let R = density(r0);
  for (let i = 0; i < k; i++) R = step(R);
  return u < 1e-12 ? R : madd(mscale(R, 1 - u), mscale(step(R), u));
}
/** Trace distance ½‖ρ − σ‖₁ from the eigenvalues of the Hermitian 2 × 2 difference. */
function traceDistance(A, B) {
  const D = madd(A, mscale(B, -1)), a = D[0][0][0], d = D[1][1][0], b = D[0][1];
  const m = (a + d) / 2, r = Math.sqrt(((a - d) / 2) ** 2 + b[0] ** 2 + b[1] ** 2);
  return (Math.abs(m + r) + Math.abs(m - r)) / 2;
}
const coherenceMass = (R) => R[0][1][0] ** 2 + R[0][1][1] ** 2 + R[1][0][0] ** 2 + R[1][0][1] ** 2;
/** The amplitude-family map written with lifetimes: a = e^(−N/T1), λ = e^(−N/T2), T2 = ratio · T1 (whole steps only). */
function lifetimeMap(p, ratio, N) { const T1 = -1 / Math.log(1 - p), T2 = ratio * T1; return { lam: Math.exp(-N / T2), a: Math.exp(-N / T1) }; }
/** The largest |F(r)| over a sampled closed unit ball, F = (λx, λy, az + 1 − a); refined around the best sample. */
function bruteFarthest(lam, a) {
  const F = (x, y, z) => Math.hypot(lam * x, lam * y, a * z + 1 - a);
  let best = 0, bz = 0;
  for (let i = 0; i <= 400; i++) for (const rho of [1, 0.999, 0.9, 0.5, 0]) { const z = -1 + 2 * i / 400, w = Math.sqrt(Math.max(0, 1 - z * z)) * rho; const v = F(w, 0, z * (rho === 0 ? 1 : 1)); if (v > best) { best = v; bz = z; } }
  for (let it = 0, h = 0.005; it < 40; it++, h /= 2) for (const z of [bz - h, bz + h]) { if (z < -1 || z > 1) continue; const v = F(Math.sqrt(1 - z * z), 0, z); if (v > best) { best = v; bz = z; } }
  return best;
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific invariants ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.NOISE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.NOISE_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const chip = async (ch) => { await page.click(`#chChips [data-ch="${ch}"]`); await settle(page); };
/** Compare the page's state with the density-matrix computation. */
function agrees(s) {
  const R = evolve(s.ch, s.p, s.rho0, s.t), Sg = evolve(s.ch, s.p, s.sig0, s.t);
  const err = Math.max(...blochOf(R).map((x, i) => Math.abs(x - s.rho[i])), ...blochOf(Sg).map((x, i) => Math.abs(x - s.sig[i])),
    Math.abs(traceDistance(R, Sg) - s.T), Math.abs(traceDistance(density(s.rho0), density(s.sig0)) - s.T0), Math.abs(coherenceMass(R) - s.mass));
  return err;
}

let s = await state();
check('opens on the DRIFT-NORTH card at its still frame N = 3.5', s.preset === 'amp' && s.ch === 'amp' && close(s.t, 3.5) && !s.playing);
check('the opening state agrees with Kraus operators on density matrices', agrees(s) < 1e-12, `error ${agrees(s)}`);

// every channel, several strengths, whole and fractional steps, against the Kraus computation
let worst = 0, monotone = true;
for (const ch of ['dephase', 'amp', 'depol']) {
  await chip(ch);
  for (const p of [0.1, 0.37, 0.8, 1]) {
    await setRange('strength', p);
    for (const N of [0, 0.5, 1, 1.25, 2, 3]) { s = await seek(N); if (N <= s.max) worst = Math.max(worst, agrees(s)); }
    const Ts = await page.evaluate((mx) => Array.from({ length: 41 }, (_, i) => window.NOISE_DEBUG.at(mx * i / 40).T), s.max);
    for (let i = 1; i < Ts.length; i++) if (Ts[i] > Ts[i - 1] + 1e-12) monotone = false;
  }
}
check('three noises × four strengths × whole and in-between steps: ρ, σ, T and coherence mass match the density matrices', worst < 1e-12, `max error ${worst}`);
check('along the whole rail the distance never grows (sampled at 41 points for each case)', monotone);
check('the strength slider sets p and the rail length (p = 1 runs one step)', s.p === 1 && s.max === 1);
await setRange('strength', 0.3); s = await state();
check('a weaker strength lengthens the rail (p = 0.3 → 8 steps)', s.p === 0.3 && s.max === 8 && s.preset === null);

// cards: end states
await pick('shorten'); s = await seek(2);
check('SHORTER: |+⟩ and |−⟩ under phase damping shrink along x to ±0.49 at N = 2', vclose(s.rho, [0.49, 0, 0], 1e-12) && vclose(s.sig, [-0.49, 0, 0], 1e-12) && close(s.len, 0.49, 1e-12));
check('SHORTER: the stage names the record angle θ_env = arccos 0.49', (await page.textContent('#hudSub')).includes(`${(Math.acos(0.49) / DEG).toFixed(1)}°`));
await pick('pinch'); s = await seek(1);
let R = evolve('dephase', 1, s.rho0, 1);
check('ONTO-AXIS: one step of pinching leaves ρ with zero off-diagonal entries and the same diagonal', coherenceMass(R) < 1e-24 && close(R[0][0][0], density(s.rho0)[0][0][0], 1e-12) && close(s.mass, 0, 1e-12));
check('ONTO-AXIS: ρ and σ (same height) land on the same point of the axis, T = 0', vclose(s.rho, s.sig, 1e-12) && vclose(s.rho, [0, 0, Math.cos(60 * DEG)], 1e-12) && close(s.T, 0, 1e-12));
check('ONTO-AXIS: the discarded coherence mass before pinching is |ρ₀₁|² + |ρ₁₀|² = 0.375', close(s.mass0, coherenceMass(density(s.rho0)), 1e-12) && close(s.mass0, 0.375, 1e-12));
const diag = density([0, 0, 0.3]);
check('ONTO-AXIS: a state on the axis is a fixed point of pinching (independent check)', vclose(blochOf(STEP.dephase(1)(diag)), [0, 0, 0.3], 1e-12));
await pick('dephase'); s = await seek(2.5);
check('CIGAR: heights are kept, the sideways part is scaled', close(s.rho[2], s.rho0[2], 1e-12) && close(s.sig[2], s.sig0[2], 1e-12) && close(s.lam, 0.7 ** 2 * (1 - 0.5 * 0.3), 1e-12) && close(s.a, 1));
await pick('amp'); s = await seek(8);
check('DRIFT-NORTH: ρ from the south pole climbs towards the north pole', s.rho0[2] < -0.999 && close(s.rho[2], 1 - 2 * 0.7 ** 8, 1e-12) && s.rho[2] > 0.88 && agrees(s) < 1e-12);
await pick('wide'); s = await seek(1.7);
check('T2 > 2T1: the page reports that the image pierces the skin', s.escapes && s.lam ** 2 > s.a);
// the page's farthest point against a sampled ball, at whole steps, and the criterion λ² ≤ a ⇔ the ball is kept
let critOK = true, farErr = 0;
for (const ratio of [0.5, 1, 1.9, 2, 2.1, 3, 6, 8]) {
  await setRange('ratio', ratio);
  for (const N of [1, 2, 3]) {
    s = await seek(N);
    const m = lifetimeMap(s.p, ratio, N), far = bruteFarthest(m.lam, m.a), kept = far <= 1 + 1e-9;
    farErr = Math.max(farErr, Math.abs(far - s.farthest), Math.abs(m.lam - s.lam), Math.abs(m.a - s.a));
    if (kept !== (m.lam ** 2 <= m.a + 1e-12) || kept === s.escapes) critOK = false;
  }
}
check('lifetime slider: λ = e^(−N/T2), a = e^(−N/T1), and the farthest image point matches a sampled ball', farErr < 1e-6, `max error ${farErr}`);
check('north-pole criterion: the sampled ball is kept exactly when λ² ≤ a (T2 ≤ 2T1), and the page says so', critOK);
s = await state();
check('the magenta legend entry appears only when the image pierces the skin', (await page.evaluate(() => document.getElementById('legEsc').hidden)) === !s.escapes);
await setRange('ratio', 2); s = await seek(2);
check('T2 = 2T1 is pure amplitude damping: Kraus operators agree and the ball is kept', !s.escapes && agrees(s) < 1e-12);
await chip('depol');
check('the lifetime slider is disabled away from amplitude damping', await page.evaluate(() => document.getElementById('ratio').disabled));
await setRange('strength', 0.3); s = await seek(2);
check('depolarizing at p = 0.3 scales every state by 0.7² = 0.49 towards the centre after two steps', vclose(s.rho, s.rho0.map((x) => 0.49 * x), 1e-12) && vclose(s.sig, s.sig0.map((x) => 0.49 * x), 1e-12));
await pick('distance'); s = await seek(1);
check('NEVER-FARTHER: north pole and +x, amplitude damping γ = ½: T 0.7071 → 0.4330', close(s.T0, Math.SQRT1_2, 1e-12) && close(s.T, 0.4330127, 1e-6) && agrees(s) < 1e-12);
const table = {};
for (const ch of ['dephase', 'depol']) { await chip(ch); table[ch] = (await state()).T; }
check('NEVER-FARTHER: the chapter table for this pair (dephasing 0.5590, depolarizing 0.3536)', close(table.dephase, 0.5590170, 1e-6) && close(table.depol, 0.3535534, 1e-6));
await pick('shorten'); await setRange('strength', 0.5);
const pm = {};
for (const ch of ['dephase', 'amp', 'depol']) { await chip(ch); pm[ch] = (await seek(1)).T; }
check('the second column of the table, +x and −x (0.5000, 0.7071, 0.5000)', close(pm.dephase, 0.5, 1e-12) && close(pm.amp, Math.SQRT1_2, 1e-12) && close(pm.depol, 0.5, 1e-12));
await pick('centre'); s = await seek(1);
R = evolve('depol', 1, s.rho0, 1);
check('DEAD-CENTRE: both states land on r = 0, ρ = I/2, distance 0', vclose(s.rho, [0, 0, 0], 1e-12) && vclose(s.sig, [0, 0, 0], 1e-12) && close(R[0][0][0], 0.5, 1e-12) && close(s.T, 0, 1e-12));
check('DEAD-CENTRE: the readout note says the origin can no longer be told', (await page.textContent('#roNote')).includes('分不出'));

// playback, rail and keyboard
await page.click('[data-preset="amp"]');
check('clicking a card plays it', await until(page, () => { const d = window.NOISE_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.NOISE_DEBUG.seek(7.9)); await page.click('#play');   // from just before the end, so that slow frames reach it too
check('playback stops at the end of the rail', await until(page, () => { const d = window.NOISE_DEBUG.state; return !d.playing && d.t >= d.max - 1e-9; }));
await page.click('#rew'); check('⏮ returns to step 0', close((await state()).t, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); check('→ steps one whole step', close((await state()).t, 2));
await page.keyboard.press('ArrowLeft'); check('← steps back', close((await state()).t, 1));
await page.keyboard.press('End'); check('End goes to the last step', close((await state()).t, 8));
await page.keyboard.press('Home'); check('Home returns to step 0', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.NOISE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); await settle(page);
check('Space pauses', !paused.playing && close((await state()).t, paused.t));
await page.click('#play'); check('▶ plays', await until(page, () => window.NOISE_DEBUG.state.playing));
await page.click('#play'); check('▶ again pauses', !(await state()).playing);
await setRange('now', 2.25); s = await state();
check('scrubbing the rail sets N between steps', close(s.t, 2.25) && agrees(s) < 1e-12);
await page.click('#chChips [data-ch="dephase"]'); s = await state();
check('the noise chips switch the channel and leave the card', s.ch === 'dephase' && s.preset === null);

// dragging ρ on the skin, and orbiting the camera
await pick('amp');
const from = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.rho0));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] + 70, from[1] - 120, { steps: 5 }); await page.mouse.up();
s = await state();
const to = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.rho0));
check('dragging ρ puts its starting point under the pointer, on the skin', Math.hypot(to[0] - from[0] - 70, to[1] - from[1] + 120) < 1.5 && close(Math.hypot(...s.rho0), 1, 1e-12), JSON.stringify(to));
check('after the drag the page still agrees with the density matrices and leaves the card', agrees(s) < 1e-12 && s.preset === null);
const sigFrom = await page.evaluate(() => window.NOISE_DEBUG.screen(window.NOISE_DEBUG.state.sig0));
await page.mouse.move(sigFrom[0], sigFrom[1]); await page.mouse.down(); await page.mouse.move(sigFrom[0] - 40, sigFrom[1] - 40, { steps: 4 }); await page.mouse.up();
s = await state();
check('dragging σ moves σ and not ρ', !vclose(s.sig0, sph(90, 0), 1e-3) && close(Math.hypot(...s.sig0), 1, 1e-12));
const cam0 = await page.evaluate(() => window.NOISE_DEBUG.camera()), box = await page.locator('#stage').boundingBox();
await page.mouse.move(box.x + 50, box.y + box.height - 80); await page.mouse.down(); await page.mouse.move(box.x + 150, box.y + box.height - 120, { steps: 4 }); await page.mouse.up();
const cam1 = await page.evaluate(() => window.NOISE_DEBUG.camera());
check('dragging empty space orbits the camera and leaves the states alone', cam1.yaw !== cam0.yaw && vclose((await state()).rho0, s.rho0));

// the stills printed in chapter 4: what the title and the labels say at the frame the reader sees
const stillOf = async (card) => {
  const pg = await T.goto(BOOK, ID, `?shot=1&lang=zh&preset=${card}`, await T.newPage());
  await settle(pg);
  const out = await pg.evaluate(() => {
    const vis = [...document.querySelectorAll('#stage .tag')].filter((t) => !t.hidden).map((t) => { const b = t.getBoundingClientRect(); return { text: t.textContent, l: b.left, r: b.right, t: b.top, b: b.bottom }; });
    return { s: window.NOISE_DEBUG.state, big: document.getElementById('hudBig').textContent, sub: document.getElementById('hudSub').textContent, dist: document.getElementById('roDistSub').textContent, vis };
  });
  await pg.close();
  return out;
};
const overlaps = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;
let w = await stillOf('wide');
const wm = lifetimeMap(w.s.p, 6, w.s.t), wfar = bruteFarthest(wm.lam, wm.a);
check('T2 > 2T1 still: λ = a^(1/6) pierces the ball (λ² > a), so the title does not call the map amplitude damping and says it is not a channel', close(w.s.lam, Math.pow(w.s.a, 1 / 6), 1e-12) && wm.lam ** 2 > wm.a && !/振幅阻尼/.test(w.big) && /不是信道/.test(w.big) && w.sub.includes('T₂ = 6.0 T₁'), w.big);
check('T2 > 2T1 still: the escape label reads the farthest image point, found by an independent search', w.vis.some((t) => t.text.includes(`‖r‖ = ${wfar.toFixed(3)}`)) && close(w.s.farthest, wfar, 1e-6));
check('T2 > 2T1 still: no distance T is shown on the stage, and the readout says the theorem does not apply', !w.vis.some((t) => /^T /.test(t.text)) && /不是信道/.test(w.dist));
const tagOf = (o, re) => o.vis.find((t) => re.test(t.text));
check('T2 > 2T1 still: the labels “fixed point” and |0⟩ do not sit on each other or on the escape label', (() => { const a = tagOf(w, /不动点/), b = tagOf(w, /\|0⟩/), e = tagOf(w, /出界/); return a && b && e && !overlaps(a, b) && !overlaps(a, e) && !overlaps(b, e); })());
const pinchStill = await stillOf('pinch');
check('ONTO-AXIS still: the title says pinching, not phase damping, and the readout gives the coherence mass of ρ lost, 0.375 → 0', /捏合/.test(pinchStill.big) && !/相位阻尼/.test(pinchStill.big) && pinchStill.sub.includes(`${coherenceMass(density(pinchStill.s.rho0)).toFixed(3)} → 0.000`), pinchStill.sub);
check('ONTO-AXIS still: ρ and σ land on one point and their labels do not overlap', vclose(pinchStill.s.rho, pinchStill.s.sig, 1e-12) && !overlaps(tagOf(pinchStill, /^ρ$/), tagOf(pinchStill, /^σ$/)));

// language
await page.click('[data-lang-set="en"]'); await settle(page);
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Amplitude damping'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
