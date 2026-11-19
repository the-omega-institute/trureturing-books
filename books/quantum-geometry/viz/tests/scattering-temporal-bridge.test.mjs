#!/usr/bin/env node
// SCATTER//TIME browser regression: the shared stage-first gate first, then every control and every property the page
// claims, against independent mathematics written here: the barrier by RK4 integration of −ψ″ + Vψ = Eψ from the
// transmitted side (never the page's closed forms), the closed-form transmission, the flux from the sampled ψ and ψ′,
// and the temporal double slit as the partial trace of a path ⊗ marker state. P(q) is a relative spectral intensity
// (the count over the incoherent baseline 1 + a², in [0, 2]), not a probability; the suite checks that the page says so,
// that the resultant curves are violet in the legend, and that orbiting the camera changes no number.
//   node books/quantum-geometry/viz/tests/scattering-temporal-bridge.test.mjs   (VIZ_SLOW_FRAMES=1000 for slow frames)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, openStill, playsAfter, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry';
const ID = 'scattering-temporal-bridge';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const PI = Math.PI;

/* ---------- own complex arithmetic ---------- */
const c = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]],
  sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  sc: (a, k) => [a[0] * k, a[1] * k],
  conj: (a) => [a[0], -a[1]],
  abs: (a) => Math.hypot(a[0], a[1]),
  exp: (a) => c.sc([Math.cos(a[1]), Math.sin(a[1])], Math.exp(a[0]))
};
const cdist = (a, b) => c.abs(c.sub(a, b));
const imConjProd = (psi, dpsi) => c.mul(c.conj(psi), dpsi)[1];

/** RK4 for y = (ψ, ψ′), ψ″ = (V − E)ψ, from x0 to x1 in n steps (complex). */
function rk4(psi, dpsi, x0, x1, V, E, n = 4000) {
  const h = (x1 - x0) / n, f = (y) => [y[1], c.sc(y[0], V - E)];
  let y = [psi, dpsi];
  for (let i = 0; i < n; i++) {
    const k1 = f(y), y2 = [c.add(y[0], c.sc(k1[0], h / 2)), c.add(y[1], c.sc(k1[1], h / 2))];
    const k2 = f(y2), y3 = [c.add(y[0], c.sc(k2[0], h / 2)), c.add(y[1], c.sc(k2[1], h / 2))];
    const k3 = f(y3), y4 = [c.add(y[0], c.sc(k3[0], h)), c.add(y[1], c.sc(k3[1], h))];
    const k4 = f(y4);
    y = [0, 1].map((j) => c.add(y[j], c.sc(c.add(c.add(k1[j], c.sc(k2[j], 2)), c.add(c.sc(k3[j], 2), k4[j])), h / 6)));
  }
  return y;
}
/** The scattering solution by integration: start from the transmitted wave at x = L, integrate through the barrier to
    x = 0, decompose into incoming and reflected waves there and normalise the incoming amplitude to 1. */
function scatter(E, L) {
  const k = Math.sqrt(E), kap = Math.sqrt(1 - E), ik = [0, k];
  const [p0, d0] = rk4([1, 0], ik, L, 0, 1, E);                  // ψ = e^{ik(x−L)} on the right, unnormalised
  const A = c.sc(c.add(p0, c.div(d0, ik)), 0.5), Bw = c.sc(c.sub(p0, c.div(d0, ik)), 0.5);
  const t = c.div(c.exp([0, -k * L]), A), r = c.div(Bw, A);
  const psi0 = c.div(p0, A), dpsi0 = c.div(d0, A);
  const aPlus = c.sc(c.add(psi0, c.sc(dpsi0, 1 / kap)), 0.5), aMinus = c.sc(c.sub(psi0, c.sc(dpsi0, 1 / kap)), 0.5);
  const T = c.abs(t) ** 2, R = c.abs(r) ** 2;
  const closed = 1 / (1 + Math.sinh(kap * L) ** 2 / (4 * E * (1 - E)));
  /** ψ and ψ′ at x, from the integration (inside) or the plane waves (outside). */
  const at = (x) => {
    if (x < 0) { const e1 = c.exp([0, k * x]), e2 = c.mul(r, c.exp([0, -k * x])); return [c.add(e1, e2), c.mul(ik, c.sub(e1, e2))]; }
    if (x > L) { const p = c.mul(t, c.exp([0, k * x])); return [p, c.mul(ik, p)]; }
    const [p, d] = rk4([1, 0], ik, L, x, 1, E, Math.max(200, Math.ceil(4000 * (L - x) / Math.max(L, 1e-9))));
    return [c.div(p, A), c.div(d, A)];
  };
  return { k, kap, t, r, T, R, closed, psi0, dpsi0, aPlus, aMinus, at, tauL: c.div([1, 0], A) };
}
/** The temporal double slit as a mixed state: (|1⟩|m₁⟩ + a e^{iθ}|2⟩|m₂⟩)/√(1 + a²), ⟨m₁|m₂⟩ = μ; the marker is traced
    out and the detector reads Tr(ρ_path (|1⟩ + |2⟩)(⟨1| + ⟨2|)). The operator is not a projector (its norm is 2): the
    reading is the count over the incoherent baseline, a relative intensity between 0 and 2, not a probability. */
function mixedP(a, mu, phi, q) {
  const th = q + phi, n = Math.sqrt(1 + a * a);
  const m1 = [[1, 0], [0, 0]], m2 = [[mu, 0], [Math.sqrt(Math.max(0, 1 - mu * mu)), 0]];
  const amp = [[c.sc([1, 0], 1 / n)], [c.sc(c.exp([0, th]), a / n)]];
  const psi = [c.mul(amp[0][0], m1[0]), c.mul(amp[0][0], m1[1]), c.mul(amp[1][0], m2[0]), c.mul(amp[1][0], m2[1])];   // index = 2·path + marker
  const rho = [[0, 0], [0, 0]].map((_, i) => [0, 1].map((j) => {
    let s = [0, 0];
    for (let m = 0; m < 2; m++) s = c.add(s, c.mul(psi[2 * i + m], c.conj(psi[2 * j + m])));
    return s;
  }));
  return rho[0][0][0] + rho[1][1][0] + 2 * rho[0][1][0];
}

const T = await session();
const { page, check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- helpers ---------- */
const state = async (p = page) => { await settle(p); return p.evaluate(() => window.SCATTERING_DEBUG.state); };
const setParams = async (o, p = page) => { await p.evaluate((x) => window.SCATTERING_DEBUG.setParams(x), o); return state(p); };
async function input(sel, v, p = page) { await p.locator(sel).evaluate((el, x) => { el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v); return state(p); }
async function pick(card, p = page) { await p.click(`[data-preset="${card}"]`); await settle(p); await p.locator('#play').evaluate((b) => { if (b.getAttribute('aria-pressed') === 'true') b.click(); }); return state(p); }
const near = (a, b, tol) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
/** Distance in px from the point p to the rectangle b (0 inside), and from the segment a → c to b (sampled finely). */
const rectGap = (b, p) => Math.hypot(Math.max(b.x - p[0], 0, p[0] - b.x - b.w), Math.max(b.y - p[1], 0, p[1] - b.y - b.h));
const segGap = (b, a, c) => { let m = Infinity; for (let i = 0; i <= 200; i++) { const t = i / 200; m = Math.min(m, rectGap(b, [a[0] + (c[0] - a[0]) * t, a[1] + (c[1] - a[1]) * t])); } return m; };
/** A viewport point over the bare canvas of the stage (not a button, chip or label host), at least 60 px from the handle. */
async function emptyPoint(p = page) {
  return p.evaluate(() => {
    const st = document.getElementById('stage'), r = st.getBoundingClientRect(), h = document.getElementById('handle');
    const hb = h && !h.hidden ? h.getBoundingClientRect() : null;
    for (const [fx, fy] of [[0.5, 0.55], [0.3, 0.55], [0.7, 0.55], [0.5, 0.42], [0.25, 0.4], [0.75, 0.4], [0.3, 0.7], [0.7, 0.7], [0.15, 0.55], [0.85, 0.55]]) {
      const x = r.left + fx * r.width, y = r.top + fy * r.height;
      if (hb && Math.hypot(x - hb.left - hb.width / 2, y - hb.top - hb.height / 2) < 60) continue;
      const el = document.elementFromPoint(x, y);
      if (el && el.id === 'cv') return { x, y };
    }
    return null;
  });
}
/** Orbit the camera as a reader does: press on empty canvas, drag right and down, release. */
async function orbit(p = page) {
  const e = await emptyPoint(p);
  if (!e) return null;
  const before = await state(p);
  await p.mouse.move(e.x, e.y); await p.mouse.down(); await p.mouse.move(e.x + 70, e.y + 24, { steps: 7 }); await p.mouse.up();
  return { before, after: await state(p) };
}
const turned = (o) => !!o && o.after.camera.yaw < o.before.camera.yaw - 0.2 && o.after.camera.pitch > o.before.camera.pitch + 0.05;
const sameParams = (o) => !!o && JSON.stringify(o.after.params) === JSON.stringify(o.before.params) && o.after.preset === o.before.preset;
/** Distance in px between the handle and where the page says the handle of these parameters projects now. */
async function handleOff(target, p = page) {
  const [h, t] = await p.evaluate((o) => [window.SCATTERING_DEBUG.handleBox(), window.SCATTERING_DEBUG.dragTarget(o)], target);
  return h && t ? Math.hypot(h.x - t.x, h.y - t.y) : Infinity;
}

function checkBarrier(s, tag) {
  const { E, L } = s.params, X = scatter(E, L), B = s.stationary;
  check(`${tag}: t and r agree with RK4 integration`, cdist(B.t, X.t) < 1e-8 && cdist(B.r, X.r) < 1e-8, `t ${B.t} vs ${X.t}; r ${B.r} vs ${X.r}`);
  check(`${tag}: T = |t|² equals the closed form 1/(1 + sinh²κL/(4E(1−E)))`, near(B.T, X.closed, 1e-12) && near(X.T, X.closed, 1e-8));
  check(`${tag}: T + R = 1`, near(B.T + B.R, 1, 1e-12) && near(X.T + X.R, 1, 1e-8));
  check(`${tag}: e^{−2κL} is the bare leading exponential`, near(B.Twkb, Math.exp(-2 * X.kap * L), 1e-15) && near(B.ratio, B.T / B.Twkb, 1e-9));
  check(`${tag}: branch coefficients a₊, a₋ from ψ(0), ψ′(0)`, cdist(B.aPlus, X.aPlus) < 1e-7 && cdist(B.aMinus, X.aMinus) < 1e-6 * Math.max(1, c.abs(X.aMinus)));
  // each branch alone carries no flux; their cross term carries 2kT
  const jb = 4 * X.kap * c.mul(c.conj(X.aMinus), X.aPlus)[1];
  check(`${tag}: the two branches together carry j = 4κ Im(ā₋a₊) = 2kT`, near(B.jBranches, 2 * X.k * X.T, 1e-9) && near(jb, 2 * X.k * X.T, 1e-7) && near(B.jRight, 2 * X.k * X.T, 1e-9));
  // boundary matching on both sides of x = 0 and x = L
  const b = B.boundary, l0 = [c.add([1, 0], X.r), c.mul([0, X.k], c.sub([1, 0], X.r))];
  check(`${tag}: ψ and ψ′ are continuous at x = 0 and x = L`, b.mismatch < 1e-12
    && cdist(b.x0.left.psi, l0[0]) < 1e-8 && cdist(b.x0.left.dpsi, l0[1]) < 1e-8
    && cdist(b.x0.inside.psi, X.psi0) < 1e-8 && cdist(b.x0.inside.dpsi, X.dpsi0) < 1e-8
    && cdist(b.xL.inside.psi, X.tauL) < 1e-8 && cdist(b.xL.right.dpsi, c.mul([0, X.k], X.tauL)) < 1e-8, JSON.stringify(b));
  // the flux, computed here from every sampled ψ and ψ′, is the same everywhere
  let worstJ = 0, worstPsi = 0;
  for (const smp of B.samples) {
    worstJ = Math.max(worstJ, Math.abs(2 * imConjProd(smp.psi, smp.dpsi) - 2 * X.k * X.T), Math.abs(smp.j - 2 * X.k * X.T));
    const [p, d] = X.at(smp.x);
    worstPsi = Math.max(worstPsi, cdist(p, smp.psi), cdist(d, smp.dpsi));
  }
  check(`${tag}: 2 Im(ψ̄ψ′) = 2kT at all ${B.samples.length} samples`, worstJ < 1e-9, `${worstJ}`);
  check(`${tag}: sampled ψ, ψ′ agree with the integrated solution`, worstPsi < 1e-7, `${worstPsi}`);
}
function checkTemporal(s, tag) {
  const { a, mu, phi } = s.params, Tm = s.temporal, want = mixedP(a, mu, phi, Tm.q);
  check(`${tag}: P(q) equals the marker partial trace`, near(Tm.P, want, 1e-12) && near(Tm.formula, want, 1e-12), `${Tm.P} vs ${want}`);
  check(`${tag}: coherent part + μ-weighted background = numerator`, near(Tm.coherent + Tm.background, Tm.numerator, 1e-12)
    && near(Tm.background, (1 - mu) * (1 + a * a), 1e-14) && near(Tm.coherent, mu * c.abs(c.add([1, 0], c.sc(c.exp([0, Tm.q + phi]), a))) ** 2, 1e-12));
  // the amplitudes: z₁ = 1, z₂ = a e^{i(q+φ)}, the coherent resultant √μ(z₁ + z₂); its intensity is the coherent part
  const z2 = c.sc(c.exp([0, Tm.q + phi]), a), coh = c.sc(c.add([1, 0], z2), Math.sqrt(mu));
  check(`${tag}: amplitudes z₁, z₂ and the coherent resultant √μ(z₁ + z₂)`, cdist(Tm.z1, [1, 0]) < 1e-15 && cdist(Tm.z2, z2) < 1e-14 && cdist(Tm.coh, coh) < 1e-14
    && near(Tm.coherent, c.abs(Tm.coh) ** 2, 1e-12));
  // a relative intensity: the count over 1 + a², between 0 and 2; the ceiling 2 only for a = 1, μ = 1
  const ceil = (1 + a * a + 2 * a * mu) / (1 + a * a);
  check(`${tag}: P = count/(1 + a²) lies in [0, 2]; ceiling (1 + a² + 2aμ)/(1 + a²) ≤ 2`, near(Tm.P, Tm.numerator / (1 + a * a), 1e-14) && Tm.P >= -1e-15 && Tm.P <= 2 + 1e-14
    && near(Tm.ceiling, ceil, 1e-14) && ceil <= 2 + 1e-14 && (Math.abs(ceil - 2) > 1e-12 || (Math.abs(a - 1) < 1e-9 && Math.abs(mu - 1) < 1e-9)));
  let lo = Infinity;
  for (let i = 0; i <= 4000; i++) lo = Math.min(lo, mixedP(a, mu, phi, 2 * PI * i / 4000));
  check(`${tag}: the floor is the minimum over q`, near(Tm.floor, lo, 1e-6), `${Tm.floor} vs ${lo}`);
  check(`${tag}: P samples over [0, 4π]`, Tm.samples.every((x) => near(x.P, mixedP(a, mu, phi, x.q), 1e-12)));
  check(`${tag}: E = ℏq/Δt and fringe spacing 2πℏ/Δt`, near(Tm.E, Tm.q / s.params.dt, 1e-14) && near(Tm.fringe, 2 * PI / s.params.dt, 1e-14));
}

/* ---------- sources and registry ---------- */
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
for (const [f, src] of Object.entries(sources)) check(`source ${f}: no literal colour, no palette override`, !/#(?:[\da-f]{3,8})(?![\w-])|\b(?:rgba?|hsla?)\s*\(/i.test(src.replace(/href="[^"]*"/g, '')) && !/data-tr-palette|trPalette/.test(src));
check('source: no override of the lab grid', !/grid-template-columns/.test(sources['style.css']));
check('source: the four cards in order', JSON.stringify([...sources['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1])) === '["barrier","opaque","cancel","marked"]');
check('source: only the shared runtime and the page script', JSON.stringify([...sources['index.html'].matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])) === '["../assets/shell.js","../assets/kit.js","main.js"]');
check('source: no green Lean box', !/class="lean"|class="lean frozen"|data-lean-gid/.test(sources['index.html']));
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID) || {};
check('registry: live entry, no Lean list, theory link to §29.4', entry.status === 'live' && Array.isArray(entry.lean) && entry.lean.length === 0 && entry.code === 'SCATTER//TIME'
  && entry.path === `${ID}/` && entry.thumbnail === `${ID}/thumb.jpg` && (entry.theory || []).some((t) => /ch34-s19-roundtrip-projection-and-imaginary-blindspot\.html#sec-ch34-19-5$/.test(t.href)));

/* ---------- opening and the cards ---------- */
await T.goto(BOOK, ID, '?lang=zh');
let s = await state();
check('opens on BARRIER at its still frame without playing', s.preset === 'barrier' && s.scene === 'stat' && !s.playing && near(s.t, 0.5, 1e-12) && s.params.E === 0.5 && s.params.L === 1.2);
checkBarrier(s, 'BARRIER');
check('BARRIER: at the still the probe stands in the middle of the barrier', near(s.stationary.probe.x, 0.6, 1e-12) && s.stationary.probe.region === 'barrier');
check('BARRIER: T ≈ 0.52 as the card says', Math.abs(s.stationary.T - 0.52) < 0.01);
check('BARRIER: clicking the card plays the probe', await playsAfter(page, () => page.click('[data-preset="barrier"]')));
s = await pick('opaque');
checkBarrier(s, 'OPAQUE');
check('OPAQUE: T ≈ 0.0069, about four times e^{−2κL} ≈ 0.0017 (16E(1−E) = 4)', Math.abs(s.stationary.T - 0.0069) < 0.0002 && Math.abs(s.stationary.Twkb - 0.0017) < 0.0001 && Math.abs(s.stationary.ratio - 4) < 0.05);
s = await pick('cancel');
check('CANCEL: a = 1, μ = 1, φ = π, temporal scene', s.scene === 'temp' && s.params.a === 1 && s.params.mu === 1 && near(s.params.phi, PI, 1e-15));
await input('#now', 0); s = await state();
checkTemporal(s, 'CANCEL q = 0');
check('CANCEL: P(0) = 0, floor 0, full cancellation met', Math.abs(s.temporal.P) < 1e-15 && Math.abs(s.temporal.floor) < 1e-15 && s.temporal.cancellation);
check('CANCEL: the rail moved without leaving the card', s.preset === 'cancel');
s = await pick('marked');
await input('#now', 0); s = await state();
checkTemporal(s, 'MARKED q = 0');
check('MARKED: μ = 0, P = 1 at every q, no coherent part', s.params.mu === 0 && s.temporal.samples.every((x) => near(x.P, 1, 1e-14)) && s.temporal.coherent === 0 && near(s.temporal.background, 2, 1e-14));
check('MARKED: the coherent amplitude is 0 while the incoherent background (1 − μ)(1 + a²) stays positive', c.abs(s.temporal.coh) === 0 && s.temporal.background > 0
  && near(s.temporal.background, (1 - s.params.mu) * (1 + s.params.a ** 2), 1e-14) && near(s.temporal.P, mixedP(s.params.a, 0, s.params.phi, s.temporal.q), 1e-14));
{
  // the words: P(q) is named a relative spectral intensity, never a detection probability; amplitudes and the
  // marker-traced intensities are told apart; the resultant amplitude is violet in the legend
  const words = async () => page.evaluate(() => ({ ro: document.getElementById('readouts').textContent, note: document.getElementById('roNote').textContent,
    legend: [...document.querySelectorAll('#legend > span')].map((sp) => ({ sw: [...sp.querySelector('.sw').classList].filter((k) => k !== 'sw'), text: sp.textContent })) }));
  let w = await words();
  check('MARKED (zh): P(q) is a relative spectral intensity, not a probability', /相对谱强度/.test(w.ro) && /不是概率/.test(w.ro) && !/探测概率/.test(w.ro));
  check('MARKED (zh): amplitudes and the marker-traced intensities are read apart', /振幅/.test(w.ro) && /非相干本底强度/.test(w.ro) && /混合态/.test(w.ro) && /相干合成振幅/.test(w.note) && /本底强度/.test(w.note) && /P = 1/.test(w.note));
  check('MARKED (zh): the coherent amplitude has the violet swatch, the wall intensity the ink one', w.legend.some((l) => l.sw.includes('vi') && /√μ/.test(l.text))
    && !w.legend.some((l) => !l.sw.includes('vi') && /√μ/.test(l.text)) && w.legend.some((l) => l.sw.includes('ik') && /相对强度/.test(l.text)));
  await page.click('[data-lang-set="en"]'); await settle(page); w = await words();
  check('MARKED (en): "Relative spectral intensity", "not a probability", no "Detection probability"', /Relative spectral intensity/.test(w.ro) && /not a probability/.test(w.ro) && !/[Dd]etection probability/.test(w.ro));
  check('MARKED (en): amplitudes, coherent intensity and the incoherent background intensity are separate rows', /Amplitudes z₁/.test(w.ro) && /Coherent intensity/.test(w.ro) && /not an amplitude/.test(w.ro));
  await page.click('[data-lang-set="zh"]'); await settle(page);
}
s = await setParams({ scene: 'temp', a: 1, mu: 1, phi: PI, t: PI });
checkTemporal(s, 'a = 1, μ = 1, q + φ = 2π');
check('the maximum relative intensity is 2, twice the incoherent baseline, at a = 1, μ = 1, cos(q + φ) = 1', near(s.temporal.P, 2, 1e-12) && near(s.temporal.ceiling, 2, 1e-15)
  && near(mixedP(1, 1, PI, PI), 2, 1e-12));
s = await setParams({ scene: 'stat', E: 0.5, L: 1.2 });
{
  const legend = await page.evaluate(() => [...document.querySelectorAll('#legend > span')].map((sp) => ({ vi: sp.querySelector('.sw').classList.contains('vi'), ik: sp.querySelector('.sw').classList.contains('ik'), text: sp.textContent })));
  check('barrier: the resultant ψ has the violet swatch, no ink swatch names ψ', legend.some((l) => l.vi && /ψ/.test(l.text)) && !legend.some((l) => l.ik && /ψ/.test(l.text)));
}

/* ---------- sweeps through the parameters (programmatic, then checked independently) ---------- */
for (const E of [0.1, 0.3, 0.5, 0.75, 0.9]) for (const Lw of [0.4, 1.7, 3.1, 5]) {
  s = await setParams({ scene: 'stat', E, L: Lw, t: 0.37 });
  checkBarrier(s, `E = ${E}, L = ${Lw}`);
}
{
  // T against the leading exponential: the ratio tends to 16E(1 − E) as κL grows
  s = await setParams({ scene: 'stat', E: 0.3, L: 5 });
  check('thick barrier: T/e^{−2κL} → 16E(1−E)', Math.abs(s.stationary.ratio - 16 * 0.3 * 0.7) / (16 * 0.3 * 0.7) < 0.01, `${s.stationary.ratio}`);
}
for (const [a, mu, phi] of [[1, 1, PI], [0.5, 1, 0.3], [1.5, 0.4, 2], [1, 0.7, PI], [0, 1, 1], [1.2, 1, 4.4]]) for (const q of [0, 1.1, PI, 9.3]) {
  s = await setParams({ scene: 'temp', a, mu, phi, t: q });
  checkTemporal(s, `a = ${a}, μ = ${mu}, φ = ${phi}, q = ${q}`);
}
{
  // P = 0 exactly when a = 1, μ = 1 and cos(q + φ) = −1; elsewhere the minimum over a grid stays above 0
  let worst = Infinity;
  for (const a of [0.3, 0.9, 1.1, 1.5]) for (const mu of [0.2, 0.95, 1]) {
    if (a === 1 && mu === 1) continue;
    let lo = Infinity; for (let i = 0; i < 720; i++) lo = Math.min(lo, mixedP(a, mu, 0, 2 * PI * i / 720));
    worst = Math.min(worst, lo);
    s = await setParams({ scene: 'temp', a, mu, phi: 0, t: PI });
    check(`no cancellation at a = ${a}, μ = ${mu}: floor > 0 and not met`, s.temporal.floor > 1e-6 && !s.temporal.cancellation && near(s.temporal.floor, lo, 1e-4));
  }
  check('the grid minimum is positive away from a = 1, μ = 1', worst > 1e-4);
}

/* ---------- controls ---------- */
await pick('barrier');
s = await input('#energy', 0.7);
check('energy slider sets E, leaves the card', near(s.params.E, 0.7, 1e-12) && s.preset === null && (await page.textContent('#oEnergy')) === '0.700');
s = await input('#width', 2.5);
check('width slider sets L', near(s.params.L, 2.5, 1e-12) && (await page.textContent('#oWidth')) === '2.50');
checkBarrier(s, 'after the sliders');
s = await input('#now', 0.1);
check('the rail moves the probe: x = −4 + t(L + 8)', near(s.stationary.probe.x, -4 + 0.1 * 10.5, 1e-12) && s.stationary.probe.region === 'left');
await page.click('#sceneChips [data-scene="temp"]'); s = await state();
check('scene chip switches to the time slits and the rail to q ∈ [0, 4π]', s.scene === 'temp' && near(s.max, 4 * PI, 1e-12) && await page.locator('[data-scene="temp"].grp').isVisible());
for (const [sel, key, v] of [['#ratio', 'a', 0.6], ['#overlap', 'mu', 0.35], ['#phase', 'phi', 2.2], ['#delay', 'dt', 3.5]]) {
  s = await input(sel, v);
  check(`${sel} sets ${key}`, near(s.params[key], v, 1e-12));
}
checkTemporal(s, 'after the temporal sliders');

/* ---------- the handle: drag and keys, both scenes ---------- */
await page.click('#sceneChips [data-scene="stat"]'); await setParams({ E: 0.5, L: 1.2 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const h = await page.evaluate(() => window.SCATTERING_DEBUG.handleBox()), to = await page.evaluate(() => window.SCATTERING_DEBUG.dragTarget({ L: 3 }));
  check('handle: visible on the right face of the barrier', !!h);
  const cam0 = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check('handle: dragging the right face sets L ≈ 3 and does not turn the camera', Math.abs(s.params.L - 3) < 0.05 && JSON.stringify(s.camera) === JSON.stringify(cam0), `L = ${s.params.L}`);
  check('handle → slider: the width slider follows', Math.abs(Number(await page.inputValue('#width')) - s.params.L) < 0.006);
  checkBarrier(s, 'after the drag');
  await page.focus('#handle'); await page.keyboard.press('ArrowRight'); s = await state();
  const L1 = s.params.L;
  await page.keyboard.press('ArrowLeft'); await page.keyboard.press('ArrowLeft'); s = await state();
  check('handle keys: → and ← step L by 0.05', near(s.params.L, Math.round((L1 - 0.1) * 100) / 100, 1e-9) && !s.playing);
}
await page.click('#sceneChips [data-scene="temp"]'); await setParams({ a: 1, mu: 1, phi: 1, t: 2 });
{
  const h = await page.evaluate(() => window.SCATTERING_DEBUG.handleBox()), to = await page.evaluate(() => window.SCATTERING_DEBUG.dragTarget({ a: 0.6, phi: 2.5 }));
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check('handle: dragging the tip of z₁ + z₂ sets a ≈ 0.6, φ ≈ 2.5', Math.abs(s.params.a - 0.6) < 0.04 && Math.abs(s.params.phi - 2.5) < 0.08, JSON.stringify(s.params));
  check('handle → sliders: a and φ follow', Math.abs(Number(await page.inputValue('#ratio')) - s.params.a) < 0.006 && Math.abs(Number(await page.inputValue('#phase')) - s.params.phi) < 1e-9);
  checkTemporal(s, 'after the tip drag');
  await page.focus('#handle'); const a0 = s.params.a; await page.keyboard.press('ArrowUp'); s = await state();
  check('handle keys: ↑ raises a by 0.05', near(s.params.a, Math.round((a0 + 0.05) * 100) / 100, 1e-9));
}

/* ---------- orbiting the camera: drag empty canvas; no number moves, the handle re-projects, a drag still lands ---------- */
await page.click('#sceneChips [data-scene="stat"]'); await setParams({ E: 0.5, L: 1.2 });
await page.locator('#stage').scrollIntoViewIfNeeded(); await settle(page);
{
  const o = await orbit();
  check('orbit (barrier): dragging empty canvas turns the camera', turned(o), o ? JSON.stringify([o.before.camera, o.after.camera]) : 'no empty canvas point');
  check('orbit (barrier): no parameter and no card changes', sameParams(o));
  if (o) checkBarrier(o.after, 'after the orbit');
  check('orbit (barrier): the handle is re-projected onto the right face', (await handleOff({ L: 1.2 })) < 1.5);
  const h = await page.evaluate(() => window.SCATTERING_DEBUG.handleBox()), to = await page.evaluate(() => window.SCATTERING_DEBUG.dragTarget({ L: 2.2 }));
  const cam = (await state()).camera;
  await page.mouse.move(h.x, h.y); await page.mouse.down(); await page.mouse.move(to.x, to.y, { steps: 8 }); await page.mouse.up();
  s = await state();
  check('orbit then drag (barrier): L ≈ 2.2 under the turned camera, and the drag leaves the camera alone', Math.abs(s.params.L - 2.2) < 0.05 && JSON.stringify(s.camera) === JSON.stringify(cam), `L = ${s.params.L}`);
  checkBarrier(s, 'after the orbit and the drag');
}
await page.click('#sceneChips [data-scene="temp"]'); await setParams({ a: 0.8, mu: 0.6, phi: 1.3, t: 3 });
{
  const o = await orbit();
  check('orbit (time slits): dragging empty canvas turns the camera', turned(o), o ? JSON.stringify([o.before.camera, o.after.camera]) : 'no empty canvas point');
  check('orbit (time slits): no parameter changes', sameParams(o));
  if (o) checkTemporal(o.after, 'after the orbit (time slits)');
  check('orbit (time slits): the handle is re-projected onto the tip of z₁ + z₂', (await handleOff({ a: 0.8, phi: 1.3 })) < 1.5);
}

/* ---------- playback, drawer, embed ---------- */
await page.locator('body').click({ position: { x: 4, y: 4 } });
await page.keyboard.press('Space');
check('Space plays the rail', await until(page, () => { const d = window.SCATTERING_DEBUG.state; return d.playing && d.t > 0; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#infoBtn');
check('drawer: opens and says, in both languages, that the page is not a proof', await page.evaluate(() => { const d = document.getElementById('drawer'); return !d.hidden && /不是证明/.test(d.textContent) && /not a proof/.test(d.textContent); }));
check('drawer: primary sources link to their DOIs', await page.evaluate(() => ['10.1038/s41567-023-01993-w', '10.1103/PhysRevLett.95.040401', '10.1103/jc1c-k3ll', '10.1103/gjfq-k9dv']
  .every((d) => [...document.querySelectorAll('#drawer a')].some((a) => a.href === `https://doi.org/${d}`))));
await page.keyboard.press('Escape');
for (const card of ['barrier', 'cancel', 'marked']) {
  const fig = await T.open(BOOK, ID, `?embed=1&lang=en&preset=${card}`, { viewport: { width: 740, height: 500 }, locale: 'en-US' });
  await settle(fig);
  const fs2 = await fig.evaluate(() => window.SCATTERING_DEBUG.state);
  check(`cited ${card}: the frame opens on the card`, fs2.preset === card);
  await fig.context().close();
}

/* ---------- the stills the chapter prints ---------- */
for (const lang of ['zh', 'en']) {
  let p = await openStill(T, BOOK, ID, 'barrier', lang); let x = await p.evaluate(() => window.SCATTERING_DEBUG.state);
  check(`still barrier (${lang}): probe in the barrier, T ≈ 0.52, j = 2kT`, x.preset === 'barrier' && near(x.t, 0.5, 1e-12) && Math.abs(x.stationary.T - 0.52) < 0.01 && near(x.stationary.probe.j, x.stationary.jRight, 1e-10));
  {
    // the caption promises a visible amber probe: no label box may cover its foot, its stroke or its tip
    const pr = x.frame && x.frame.probe, labels = x.labels || [];
    const worst = pr ? labels.map((b) => ({ key: b.key, seg: segGap(b, pr.foot, pr.tip), tip: rectGap(b, pr.tip) })) : [];
    check(`still barrier (${lang}): no label covers the amber probe (stroke ≥ 3 px, tip ≥ 6 px away)`, !!pr && worst.every((w) => w.seg >= 3 && w.tip >= 6),
      JSON.stringify(worst.filter((w) => w.seg < 3 || w.tip < 6)));
    check(`still barrier (${lang}): the branch labels a₋e^−κx and a₊e^κx are still placed`, ['dec', 'grow'].every((k) => labels.some((b) => b.key === k)), JSON.stringify(labels.map((b) => b.key)));
  }
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'cancel', lang); x = await p.evaluate(() => window.SCATTERING_DEBUG.state);
  check(`still cancel (${lang}): q = 0, P = 0`, x.preset === 'cancel' && x.t === 0 && Math.abs(x.temporal.P) < 1e-15);
  await p.context().close();
  p = await openStill(T, BOOK, ID, 'marked', lang); x = await p.evaluate(() => window.SCATTERING_DEBUG.state);
  check(`still marked (${lang}): μ = 0, P = 1`, x.preset === 'marked' && x.params.mu === 0 && near(x.temporal.P, 1, 1e-15));
  await p.context().close();
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
