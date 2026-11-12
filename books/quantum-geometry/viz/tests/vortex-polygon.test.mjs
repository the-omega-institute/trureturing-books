#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/vortex-polygon (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/vortex-polygon.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// After the stage-first battery, every claim of the page is checked against computations written here: the field in
// complex form (ż_j = i s_j Ω z_j + i (b/2) Σ s_k (z_j − z_k)/|z_j − z_k|²), integrated with a Runge–Kutta step of a
// different size; the eigenvector by a Jacobian of a different finite-difference step; the closed forms of the chapter.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'vortex-polygon';
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.POLYGON_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.POLYGON_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); return state(); };
const close = (a, b, tol) => Math.abs(a - b) <= tol;

/* ---------- independent mechanics ---------- */
const B = 2, OM = 0.5;
function vel(z, N) {           // z as [x…, y…]; complex form of the field
  const out = new Array(2 * N).fill(0);
  for (let j = 0; j < N; j++) {
    const sj = j % 2 === 0 ? 1 : -1; let re = -sj * OM * z[N + j], im = sj * OM * z[j];
    for (let k = 0; k < N; k++) {
      if (k === j) continue;
      const sk = k % 2 === 0 ? 1 : -1, ar = z[j] - z[k], ai = z[N + j] - z[N + k], d = ar * ar + ai * ai;
      re += (B / 2) * sk * (-ai) / d; im += (B / 2) * sk * ar / d;   // i·(ar + i ai)/d
    }
    out[j] = re; out[N + j] = im;
  }
  return out;
}
function integrate(z, N, tEnd, dt) {
  const n = Math.round(tEnd / dt), h = tEnd / n, add = (a, b, c) => a.map((v, i) => v + c * b[i]);
  for (let s = 0; s < n; s++) {
    const k1 = vel(z, N), k2 = vel(add(z, k1, h / 2), N), k3 = vel(add(z, k2, h / 2), N), k4 = vel(add(z, k3, h), N);
    z = z.map((v, i) => v + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
  }
  return z;
}
const ring = (N, rho) => { const z = []; for (let j = 0; j < N; j++) z.push(rho * Math.cos(2 * Math.PI * (j + 1) / N)); for (let j = 0; j < N; j++) z.push(rho * Math.sin(2 * Math.PI * (j + 1) / N)); return z; };
const nrm = (v) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));

/* ---------- opening: the hexagon card at its still ---------- */
let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on HEXAGON at its last frame, not playing', s.preset === 'hexagon' && s.m === 3 && s.mode === 'unstable' && close(s.t, s.max, 1e-9) && close(s.max, 10, 1e-12) && !s.playing, JSON.stringify([s.preset, s.t, s.max]));

// λ = Ω(m − r)√(r² − 2) with m = 3, r = 2 is 1/√2; the page's vector is an eigenvector of it
check('HEXAGON: λ = Ω(m − r)√(r² − 2) = 1/√2', close(s.lam, 1 / Math.SQRT2, 1e-12), String(s.lam));
{
  const N = 6, z0 = ring(N, 1), h = 2e-5, u = s.u, Ju = new Array(2 * N).fill(0);
  for (let q = 0; q < 2 * N; q++) {
    const zp = z0.slice(), zm = z0.slice(); zp[q] += h; zm[q] -= h;
    const fp = vel(zp, N), fm = vel(zm, N);
    for (let p = 0; p < 2 * N; p++) Ju[p] += (fp[p] - fm[p]) / (2 * h) * u[q];
  }
  const res = nrm(Ju.map((v, i) => v - s.lam * u[i]));
  check('HEXAGON: J u = λ u for the pushed direction (Jacobian of a different step)', res < 1e-6 && close(nrm(u), 1, 1e-9), `|Ju − λu| = ${res}`);
  const zEnd = integrate(z0.map((v, i) => v + 1e-9 * u[i]), N, 10, 0.004);
  const dev = nrm(zEnd.map((v, i) => v - z0[i]));
  check('HEXAGON: at t = 10 the push has grown about 1177 times, as e^(10/√2) (independent integration)', close(dev / 1e-9, Math.exp(10 / Math.SQRT2), 2) && close(s.growth, dev / 1e-9, 0.05) && close(s.predicted, Math.exp(10 / Math.SQRT2), 1e-9), `${s.growth} vs ${dev / 1e-9}`);
  check('HEXAGON: the positions at t = 10 agree with the independent integration', nrm(zEnd.map((v, i) => v - s.z[i])) < 1e-10);
}
s = await seek(5);
check('HEXAGON: half-way the growth is e^(5/√2)', close(s.growth, Math.exp(5 / Math.SQRT2), 0.05), String(s.growth));

/* ---------- rest ---------- */
s = await pick('rest');
check('REST: a click plays the card', await until(page, () => { const d = window.POLYGON_DEBUG.state; return d.playing || d.t > 0; }));
s = await seek(10);
{
  const z0 = ring(6, 1), f = vel(z0, 6);
  check('REST: the regular hexagon at R = 1 is a zero of the field', Math.max(...f.map(Math.abs)) < 1e-12 && s.speed0 < 1e-12, String(s.speed0));
  check('REST: after t = 10 nothing has moved', s.dev < 1e-12, String(s.dev));
}

/* ---------- another radius ---------- */
s = await pick('radius'); s = await seek(s.max);
{
  const rho = 1.2, z0 = ring(6, rho), f = vel(z0, 6), w = (j) => (z0[j] * f[6 + j] - z0[6 + j] * f[j]) / (rho * rho), expect = OM - B / (4 * rho * rho);
  check('RADIUS: at ρ = 1.2 the positive vortices turn anticlockwise at Ω − b/(4ρ²), the negative ones as fast clockwise', close(s.omega[0], expect, 1e-12) && close(s.omega[1], -expect, 1e-12) && close(w(0), expect, 1e-12) && close(w(1), -expect, 1e-12), JSON.stringify(s.omega.slice(0, 2)));
  const zEnd = integrate(z0, 6, s.max, 0.004);
  check('RADIUS: the motion agrees with the independent integration', nrm(zEnd.map((v, i) => v - s.z[i])) < 1e-7);
}

/* ---------- drift ---------- */
s = await pick('drift'); s = await seek(100);
{
  const N = 4, z0 = ring(N, 1), d = 1 - 4 / 2, c1 = z0.map((v, i) => ((i % N) % 2 === 0 ? 1 : -1) * v / d);
  const start = z0.map((v, i) => v + 0.01 * c1[i]), radii = [0, 1].map((j) => Math.hypot(start[j], start[N + j]));
  check('DRIFT: c₁ pulls the positive vortices in to 0.99 and pushes the negative ones out to 1.01', close(radii[0], 0.99, 1e-12) && close(radii[1], 1.01, 1e-12) && close(Math.hypot(s.z0[0], s.z0[N]), 0.99, 1e-12));
  // accumulate the angle of every vortex in small steps
  let z = start, acc = 0;
  for (let k = 0; k < 400; k++) {
    const nz = integrate(z, N, 0.25, 0.005);
    for (let j = 0; j < N; j++) acc += Math.atan2(z[j] * nz[N + j] - z[N + j] * nz[j], z[j] * nz[j] + z[N + j] * nz[N + j]) / N;
    z = nz;
  }
  check('DRIFT: by t = 100 the ring has turned ≈ εt = 1 radian (independent integration)', close(acc, 1, 0.01) && close(s.turn, acc, 1e-4) && close(s.linearTurn, 1, 1e-12), `${s.turn} vs ${acc}`);
  check('DRIFT: the radii stay apart instead of oscillating back', Math.abs(Math.hypot(s.z[0], s.z[N]) - 0.99) < 0.003);
}

/* ---------- controls ---------- */
await page.click('#mChips [data-m="6"]'); s = await state();
check('m chips: 12 vortices switch to the unstable push, λ = 2Ω·√2 for r = 2', s.m === 6 && s.mode === 'unstable' && close(s.lam, OM * 4 * Math.SQRT2, 1e-12) && close(s.max, Math.log(1e6) / s.lam, 1e-9) && s.preset === null);
check('the drift button is disabled from the hexagon on', await page.evaluate(() => document.querySelector('#modeChips [data-mode="drift"]').disabled));
await page.click('#mChips [data-m="1"]'); s = await state();
check('m chips: the dipole has no unstable direction and switches to the drift', s.m === 1 && s.mode === 'drift');
await page.click('#modeChips [data-mode="rest"]'); s = await state();
check('mode chips switch the push', s.mode === 'rest' && s.m === 1);
await page.click('[data-preset="hexagon"]'); await settle(page);
await seek(0); await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.POLYGON_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
