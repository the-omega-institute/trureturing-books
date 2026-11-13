#!/usr/bin/env node
// Browser regression suite for CHSH//DIAL (books/quantum-geometry/viz/chsh-dial/).
//   node books/quantum-geometry/viz/tests/chsh-dial.test.mjs      (or: node tools/node/viz-test.mjs quantum-geometry)
// The page uses cos(a − b) for the correlations, the formula N = 4|sin α sin β| for the ceiling, and angles for the
// hidden-direction model. The suite works with matrices instead: the 4 × 4 CHSH operator built from Kronecker
// products of n·σ = cos θ Z + sin θ X, its expectation on |Φ⁺⟩, its eigenvalues by Jacobi rotations, S² − 4I; the
// toy model with unit vectors and signs of dot products; and the maximum over Bob's turn by a grid search refined
// by golden-section steps. It reads the page through window.CHSH_DEBUG.
import fs from 'node:fs';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

import { figureNoteChecks } from './figure-note-checks.mjs';

const BOOK = 'quantum-geometry', ID = 'chsh-dial';
const T = await session();
const { check } = T;
const DEG = Math.PI / 180, R2 = Math.SQRT2;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;

/* ---------- independent model: 4 × 4 real matrices ---------- */
const kron = (A, B) => { const M = Array.from({ length: 4 }, () => new Array(4).fill(0)); for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) for (let l = 0; l < 2; l++) M[2 * i + k][2 * j + l] = A[i][j] * B[k][l]; return M; };
const add = (A, B, s = 1) => A.map((r, i) => r.map((x, j) => x + s * B[i][j]));
const mul = (A, B) => A.map((r, i) => B[0].map((_, j) => r.reduce((acc, x, k) => acc + x * B[k][j], 0)));
const Z = [[1, 0], [0, -1]], X = [[0, 1], [1, 0]];
const obs = (deg) => add(Z.map((r) => r.map((x) => x * Math.cos(deg * DEG))), X.map((r) => r.map((x) => x * Math.sin(deg * DEG))));
const chsh = (A0, A1, B0, B1) => add(add(add(kron(A0, B0), kron(A0, B1)), kron(A1, B0)), kron(A1, B1), -1);
const opOf = (d) => chsh(obs(d.a0), obs(d.a1), obs(d.b0), obs(d.b1));
const PHI = [1 / R2, 0, 0, 1 / R2];
const expect = (M, v = PHI) => v.reduce((acc, vi, i) => acc + vi * M[i].reduce((s, x, j) => s + x * v[j], 0), 0);
/** Eigenvalues of a real symmetric matrix by cyclic Jacobi rotations. */
function eig(M0) {
  const A = M0.map((r) => r.slice()), n = A.length;
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
    if (off < 1e-26) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
    }
  }
  return A.map((r, i) => r[i]).sort((a, b) => a - b);
}
const dirsAt = (s, phi) => ({ a0: s.dirs.a0, a1: s.dirs.a1, b0: phi, b1: phi - s.beta });
/** The largest ⟨S⟩ on |Φ⁺⟩ over a full turn of Bob's pair: grid, then golden-section refinement. */
function bestOverTurn(s) {
  const f = (phi) => expect(opOf(dirsAt(s, phi)));
  let bx = 0, bv = -9; for (let i = 0; i < 720; i++) { const x = -180 + i / 2, v = f(x); if (v > bv) { bv = v; bx = x; } }
  let lo = bx - 0.5, hi = bx + 0.5; const gr = (Math.sqrt(5) - 1) / 2;
  for (let k = 0; k < 80; k++) { const m1 = hi - gr * (hi - lo), m2 = lo + gr * (hi - lo); if (f(m1) > f(m2)) hi = m2; else lo = m1; }
  return { phi: (lo + hi) / 2, value: f((lo + hi) / 2) };
}
/* toy model: hidden unit vectors λ_k at (k + ½)°, answers sgn(a·λ) with 0 → +1 */
const unit = (deg) => [Math.sin(deg * DEG), Math.cos(deg * DEG)];
const ans = (u, l) => (u[0] * l[0] + u[1] * l[1] >= 0 ? 1 : -1);
function toy(d) {
  const per = []; let sum = 0;
  const A0 = unit(d.a0), A1 = unit(d.a1), B0 = unit(d.b0), B1 = unit(d.b1);
  for (let k = 0; k < 360; k++) { const l = unit(k + 0.5), a0 = ans(A0, l), a1 = ans(A1, l), b0 = ans(B0, l), b1 = ans(B1, l); const c = a0 * (b0 + b1) + a1 * (b0 - b1); per.push(c); sum += c; }
  return { per, S: sum / 360 };
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);
await figureNoteChecks(T);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
const state = async () => { await settle(page); return page.evaluate(() => window.CHSH_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const plays = () => until(page, () => { const s = window.CHSH_DEBUG.state; return s.playing; });
const stopsAt = (phi) => until(page, (p) => { const s = window.CHSH_DEBUG.state; return !s.playing && Math.abs(s.phi - p) < 1e-6; }, phi, 180000);
const seek = async (phi) => { await page.evaluate((x) => window.CHSH_DEBUG.seek(x), phi); await settle(page); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
/** The page's ⟨S⟩, N, ceiling and four correlations against the matrices at the current directions. */
function agrees(s) {
  const M = opOf(s.dirs), ev = eig(M), E = [[s.dirs.a0, s.dirs.b0], [s.dirs.a0, s.dirs.b1], [s.dirs.a1, s.dirs.b0], [s.dirs.a1, s.dirs.b1]].map(([a, b]) => expect(kron(obs(a), obs(b))));
  return close(s.S, expect(M), 1e-12) && E.every((e, i) => close(e, s.E[i], 1e-12)) && close(s.hi, ev[3], 1e-9) && close(-s.hi, ev[0], 1e-9);
}

// 45° · 2√2: the opening card and the frozen fixed operator
let s = await state();
check('opens on 45° · 2√2 with A₀ = Z, A₁ = X, B₀ = 45°, B₁ = −45°', s.preset === 'tsirelson' && s.scene === 'dial' && close(s.dirs.a0, 0) && close(s.dirs.a1, 90) && close(s.dirs.b0, 45) && close(s.dirs.b1, -45));
check('45°: ⟨S⟩ on |Φ⁺⟩, the four correlations and the ceiling agree with the 4 × 4 matrices', agrees(s));
const witness = chsh(Z, X, add(Z, X).map((r) => r.map((x) => x / R2)), add(Z, X, -1).map((r) => r.map((x) => x / R2)));
check('45°: the operator equals Z⊗B₀ + Z⊗B₁ + X⊗B₀ − X⊗B₁ with B₀,₁ = (Z ± X)/√2, ⟨S⟩ = 2√2 = its largest eigenvalue', opOf(s.dirs).every((r, i) => r.every((x, j) => close(x, witness[i][j], 1e-12))) && close(s.S, 2 * R2, 1e-12) && close(eig(witness)[3], 2 * R2, 1e-9));
const sq = mul(witness, witness), ev45 = eig(sq);
check('45°: S² has eigenvalues 0, 0, 8, 8 (N = 4, outside the open range of the spectrum proposition)', close(s.N, 4, 1e-12) && close(ev45[0], 0, 1e-9) && close(ev45[1], 0, 1e-9) && close(ev45[2], 8, 1e-9) && close(ev45[3], 8, 1e-9));
check('45°: the HUD and the key readout print 2.828', (await page.textContent('#hudBig')).includes('2.828') && (await page.textContent('#ro .key')).includes('2.8284'));

// COLLINEAR: Alice's pair commutes, S² = 4I
await pick('collinear');
check('COLLINEAR plays by itself when clicked', await plays());
check('COLLINEAR stops at φ = 90° by itself', await stopsAt(90));
await seek(0); s = await state();
const Mc = opOf(s.dirs), Mc2 = mul(Mc, Mc);
check('COLLINEAR: A₀ = A₁, S² = 4I (matrix product), spectrum ±2, the magenta mark at 2', close(s.dirs.a0, s.dirs.a1) && Mc2.every((r, i) => r.every((x, j) => close(x, i === j ? 4 : 0, 1e-12))) && close(s.hi, 2, 1e-12) && close(s.N, 0, 1e-12));
check('COLLINEAR: at φ = 0°, ⟨S⟩ = 2 on the dashed bound', close(s.S, 2, 1e-12) && agrees(s));
let sw = await page.evaluate(() => window.CHSH_DEBUG.sweep());
let worst = 0; for (const [phi, v] of sw.q) worst = Math.max(worst, Math.abs(v - expect(opOf(dirsAt(s, phi)))));
check('COLLINEAR: over a full turn of Bob ⟨S⟩ = 2 cos φ never exceeds 2 (361 angles, matrices)', worst < 1e-12 && Math.max(...sw.q.map((p) => p[1])) <= 2 + 1e-12 && sw.q.every(([phi, v]) => close(v, 2 * Math.cos(phi * DEG), 1e-12)), String(worst));

// 60° · 60°: the worked row of the chapter's table
await pick('sixty');
check('60° · 60° plays by itself', await plays());
const best60 = bestOverTurn({ dirs: { a0: 0, a1: 60 }, beta: 60 });
check('60° · 60° stops by itself', await until(page, () => !window.CHSH_DEBUG.state.playing, undefined, 180000)); s = await state();
check('60° · 60°: the play ends at the maximiser φ ≈ 19.1° with ⟨S⟩ = √7', close(s.phi, best60.phi, 1e-4) && close(s.S, Math.sqrt(7), 1e-9) && close(best60.value, Math.sqrt(7), 1e-9), `${s.phi} ${best60.phi}`);
await seek(0); s = await state();
const ev60 = eig(opOf(s.dirs));
check('60° · 60°: at φ = 0°, ⟨S⟩ = 5/2; spectrum −√7, −1, 1, √7 (Jacobi); N = 3', close(s.S, 2.5, 1e-12) && close(ev60[0], -Math.sqrt(7), 1e-9) && close(ev60[1], -1, 1e-9) && close(ev60[2], 1, 1e-9) && close(ev60[3], Math.sqrt(7), 1e-9) && close(s.N, 3, 1e-12) && close(s.hi, Math.sqrt(7), 1e-12) && close(s.lo, 1, 1e-12));
check('60° · 60°: the commutator term S² − 4I has spectrum ±3 = ±N', (() => { const e = eig(add(mul(opOf(s.dirs), opOf(s.dirs)), [[4, 0, 0, 0], [0, 4, 0, 0], [0, 0, 4, 0], [0, 0, 0, 4]], -1)); return close(e[0], -3, 1e-9) && close(e[1], -3, 1e-9) && close(e[2], 3, 1e-9) && close(e[3], 3, 1e-9); })());

// TURN BOB: 2√2 cos(φ − 45°)
await pick('sweep');
check('TURN BOB plays by itself', await plays());
check('TURN BOB stops at φ = 90°', await stopsAt(90));
s = await state();
check('TURN BOB: ⟨S⟩ = 2 at 90°', close(s.S, 2, 1e-12));
await seek(0); s = await state();
check('TURN BOB at φ = 0°: right angles, Bob aligned with Alice: ⟨S⟩ = 1 + 0 + 0 + 1 = 2 under the ceiling 2√2', close(s.phi, 0) && close(s.S, 2, 1e-12) && close(s.hi, 2 * R2, 1e-12) && agrees(s) && s.E.every((e, i) => close(e, [1, 0, 0, -1][i], 1e-12)));
await seek(90); s = await state();
sw = await page.evaluate(() => window.CHSH_DEBUG.sweep());
worst = 0; for (const [phi, v] of sw.q) worst = Math.max(worst, Math.abs(v - 2 * R2 * Math.cos((phi - 45) * DEG)), Math.abs(v - expect(opOf(dirsAt(s, phi)))));
check('TURN BOB: the strip curve is 2√2 cos(φ − 45°) and matches the matrices at 361 angles', worst < 1e-12, String(worst));
const bestCross = bestOverTurn(s);
check('TURN BOB: the largest ⟨S⟩ over the turn is 2√2, at φ = 45°', close(bestCross.value, 2 * R2, 1e-9) && close(bestCross.phi, 45, 1e-4));
await seek(20); s = await state();
check('TURN BOB: at 20° the value is 2.563', close(s.S, 2 * R2 * Math.cos(25 * DEG), 1e-12) && close(s.S, 2.563, 5e-4));

// HIDDEN ±2: the finite fiber model
await pick('hidden');
check('HIDDEN plays by itself', await plays());
check('HIDDEN stops at φ = 180° by itself', await stopsAt(180));
s = await state();
check('HIDDEN: the scene is the hidden-direction model', s.scene === 'hidden');
let allPlus = true, worstToy = 0;
for (const phi of [0, 7.3, 20, 33.3, 45, 61.7, 75, 90]) {
  await seek(phi); s = await state(); const t = toy(s.dirs);
  worstToy = Math.max(worstToy, Math.abs(t.S - s.classical.S), ...t.per.map((c, k) => Math.abs(c - s.classical.per[k])));
  if (!(t.per.every((c) => c === 2) && s.classical.plus === 360 && close(s.classical.S, 2, 1e-12))) allPlus = false;
}
check('HIDDEN: for Bob\'s cross between 0° and 90° all 360 hidden directions give +2 and S = 2 (vector signs)', allPlus && worstToy === 0, String(worstToy));
let toyOk = true;
for (const phi of [100, 135, 170, -60, -150]) { await seek(phi); s = await state(); const t = toy(s.dirs); if (!(close(t.S, s.classical.S, 1e-12) && t.per.every((c) => c === 2 || c === -2) && Math.abs(t.S) <= 2 + 1e-12)) toyOk = false; }
check('HIDDEN: elsewhere every hidden direction still gives ±2 and |S| ≤ 2 (as the frozen bound says)', toyOk);
sw = await page.evaluate(() => window.CHSH_DEBUG.sweep());
check('HIDDEN: the classical curve of the strip stays in [−2, 2] over the whole turn', sw.c.every(([, v]) => Math.abs(v) <= 2 + 1e-12) && sw.c.every(([phi, v]) => close(v, toy(dirsAt(s, phi)).S, 1e-12)));

// ARC · LINE
await pick('arc'); s = await state();
check('ARC: the scene is the arc, Bob at 45°', s.scene === 'arc' && close(s.phi, 45));
const line = await page.evaluate(() => window.CHSH_DEBUG.toyLine());
const whole = line.filter(([x]) => Number.isInteger(x));
check('ARC: the polyline is exactly 1 − 2θ/π at every whole degree from 0° to 180°', whole.length === 181 && whole.every(([x, y]) => close(y, 1 - 2 * x / 180, 1e-12)));
check('ARC: the arc stands 0.2071 above the line at 45° and below it at 135°', close(Math.cos(45 * DEG) - 0.5, 0.2071, 1e-4) && close(s.E[3], -Math.cos(45 * DEG), 1e-12) && close(s.classical.E[3], -0.5, 1e-12) && close(s.classical.E[0], 0.5, 1e-12));
check('ARC: the four gaps add up to 2√2 − 2 ≈ 0.8284 (arc 2.828, line 2.000)', close(s.S - s.classical.S, 2 * R2 - 2, 1e-12) && (await page.textContent('#ro .key')).includes('0.8284'));

// random configurations: the page against the matrices; the ceiling is never passed
let rnd = 7, okR = true, okReach = true;
const rand = () => { rnd = (rnd * 16807) % 2147483647; return rnd / 2147483647; };
for (let i = 0; i < 6; i++) {
  const al = Math.round(-180 + 360 * rand()), be = Math.round(-180 + 360 * rand()), ph = Math.round(-180 + 360 * rand());
  await setRange('alpha', al); await setRange('beta', be); await seek(ph); s = await state();
  if (!agrees(s)) okR = false;
  const b = bestOverTurn(s), sa = Math.sin(s.alpha * DEG), sb = Math.sin(s.beta * DEG);
  if (!(close(b.value, Math.sqrt(4 + 4 * sa * sb), 1e-8) && close(s.reach, b.value, 1e-8) && b.value <= s.hi + 1e-9 && s.hi <= 2 * R2 + 1e-12)) okReach = false;
}
check('the sliders: six random openings and turns agree with the matrices (⟨S⟩, correlations, ±largest eigenvalue)', okR);
check('turning Bob reaches exactly √(4 + 4 sin α sin β), never above the magenta mark, which never passes 2√2', okReach);
s = await state();
check('the opening sliders leave the card', s.preset === null && s.fields.alpha === Math.round(s.alpha) && s.fields.beta === Math.round(s.beta));

// dragging an arrow on the dial
await pick('tsirelson');
await page.click('#sceneChips [data-scene="dial"]');
let pt = await page.evaluate(() => window.CHSH_DEBUG.dialPoint(110, 0.9));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('dragging near A₁ turns A₁ to 110° and leaves the card', close(s.dirs.a1, 110) && s.preset === null && agrees(s), JSON.stringify(s.dirs));
pt = await page.evaluate(() => window.CHSH_DEBUG.dialPoint(60, 0.9));
await page.mouse.move(pt[0], pt[1]); await page.mouse.down(); await page.mouse.up(); s = await state();
check('dragging near B₀ turns B₀ to 60° and B₁ stays at −45°', close(s.dirs.b0, 60) && close(s.dirs.b1, -45) && close(s.phi, 60), JSON.stringify(s.dirs));

// scenes, rail and keyboard
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); check('key 2 opens the hidden scene', (await state()).scene === 'hidden');
await page.keyboard.press('3'); check('key 3 opens the arc scene', (await state()).scene === 'arc');
await page.keyboard.press('1'); check('key 1 opens the dial scene', (await state()).scene === 'dial');
await page.keyboard.press('Home'); check('Home goes to φ = −180°', close((await state()).phi, -180, 1e-9));
await page.keyboard.press('ArrowRight'); check('→ steps 5°', close((await state()).phi, -175, 1e-9));
await page.keyboard.press('End'); check('End goes to φ = 180°', close((await state()).phi, 180, 1e-9));
await page.click('#rew'); check('⏮ goes back to φ = −180°', close((await state()).phi, -180, 1e-9));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space plays', await until(page, () => window.CHSH_DEBUG.state.t > 0));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await setRange('now', 180 + 30); s = await state();
check('the rail sets φ and the readouts follow', close(s.phi, 30, 1e-9) && agrees(s));
await page.click('#sceneChips [data-scene="hidden"]'); check('the scene chips switch scenes', (await state()).scene === 'hidden');

// English
await page.click('[data-lang-set="en"]'); await pick('hidden'); await until(page, () => !window.CHSH_DEBUG.state.playing, undefined, 180000);
s = await state();
check('English: the HUD reads “hidden-direction model · k/360 give +2” with the count of the stop', (await page.textContent('#hudSub')).includes(`hidden-direction model · ${toy(s.dirs).per.filter((c) => c > 0).length}/360 give +2`));

/* ---------- the cited stills: the frame each figure shows against its caption and its card note ---------- */
const chapter = (lang) => fs.readFileSync(new URL(`../../${lang}/ch13-entanglement-and-chsh.md`, import.meta.url), 'utf8');
const caption = (lang, card) => { const m = new RegExp(`::: \\{\\.viz src="chsh-dial" preset="${card}"[^}]*\\}\\n([\\s\\S]*?)\\n:::`).exec(chapter(lang)); return m ? m[1] : ''; };
const shot = await T.newPage();
for (const lang of ['zh', 'en']) {
  await T.goto(BOOK, ID, `?shot=1&lang=${lang}&preset=hidden`, shot); await settle(shot);
  const h = await shot.evaluate(() => window.CHSH_DEBUG.state), t = toy(h.dirs);
  const plus = t.per.filter((c) => c === 2).length, minus = t.per.filter((c) => c === -2).length;
  const bell = expect(opOf(h.dirs)), cap = caption(lang, 'hidden'), note = await shot.textContent('#presetNote');
  check(`HIDDEN still (${lang}): both colours on the ring (vector signs: ${plus} give +2, ${minus} give −2) and the page agrees`, plus > 0 && minus > 0 && plus + minus === 360 && h.classical.plus === plus && close(h.classical.S, t.S, 1e-12), `${plus}/${minus}`);
  const nums = [`${plus}`, `${minus}`, `${Math.round(h.phi)}^\\circ`, t.S.toFixed(3), bell.toFixed(3), `(${plus} \\cdot 2 - ${minus} \\cdot 2)/360`];
  check(`HIDDEN still (${lang}): the caption names the stop φ, the two counts, the mean ${t.S.toFixed(3)} and the Bell value ${bell.toFixed(3)}`, nums.every((x) => cap.includes(x)), nums.filter((x) => !cap.includes(x)).join(' '));
  check(`HIDDEN still (${lang}): the card note names the same numbers`, [`${plus}`, `${minus}`, `${Math.round(h.phi)}°`, t.S.toFixed(3), bell.toFixed(3)].every((x) => note.includes(x)));
  await T.goto(BOOK, ID, `?shot=1&lang=${lang}&preset=sixty`, shot); await settle(shot);
  const x = await shot.evaluate(() => {
    const st = window.CHSH_DEBUG.state, tag = [...document.querySelectorAll('.tags .tag.hot')].find((e) => !e.hidden && e.textContent.trim() === st.S.toFixed(3));
    const r = tag && tag.getBoundingClientRect();
    return { S: st.S, hi: st.hi, box: r && [r.top, r.bottom], yHi: window.CHSH_DEBUG.gaugeY(st.hi), yVal: window.CHSH_DEBUG.gaugeY(st.S) };
  });
  const free = x.box && !(x.box[0] <= x.yHi + 2 && x.box[1] >= x.yHi - 2);
  check(`60° · 60° still (${lang}): the value label ${x.S.toFixed(3)} keeps off the magenta √(4+N) line at ${x.hi.toFixed(3)}`, close(x.hi, Math.sqrt(7), 1e-12) && close(x.S, 2.5, 1e-12) && free, JSON.stringify(x));
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
