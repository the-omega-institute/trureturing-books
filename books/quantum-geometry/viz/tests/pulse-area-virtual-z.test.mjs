#!/usr/bin/env node
// Browser regression suite for PULSE//AREA (books/quantum-geometry/viz/pulse-area-virtual-z/).
//   node books/quantum-geometry/viz/tests/pulse-area-virtual-z.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// The page turns Bloch vectors with unit quaternions and, for detuned pulses, multiplies slices in time order. The
// suite recomputes everything another way: complex state vectors and 2 × 2 complex matrices driven by the
// time-dependent Schrödinger equation i dψ/dt = H(t)ψ, H = ½(Ω(t)(cos φ X + sin φ Y) + ΔZ), integrated with classical
// Runge–Kutta; pulse areas by Simpson's rule on the envelope; the virtual-Z identity by matrix products. It reads the
// page only through window.PULSE_DEBUG and never calls the page's model.
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pulse-area-virtual-z';
const T = await session();
const { check } = T;
const PI = Math.PI, DEG = PI / 180, W0 = 2 * PI * 5, MHZ = 2 * PI / 1000;
const close = (a, b, eps = 1e-9) => Math.abs(a - b) <= eps;
const vdist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/* ---------- independent model ---------- */
const G0 = Math.exp(-4.5);
const SHAPE = {
  square: () => 1,
  gauss: (tau, Tp) => { const s = Tp / 6; return (Math.exp(-((tau - Tp / 2) ** 2) / (2 * s * s)) - G0) / (1 - G0); }
};
function simpson(f, a, b, n = 20000) { const h = (b - a) / n; let s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3; }
// complex numbers as [re, im]; a state is [a, b]; a matrix is [[m00, m01], [m10, m11]]
const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]], ca = (a, b) => [a[0] + b[0], a[1] + b[1]], cs = (a, k) => [a[0] * k, a[1] * k];
const blochOf = ([a, b]) => { const ab = cm([a[0], -a[1]], b); return [2 * ab[0], 2 * ab[1], a[0] ** 2 + a[1] ** 2 - b[0] ** 2 - b[1] ** 2]; };
const stateOf = (r) => { const th = Math.acos(Math.max(-1, Math.min(1, r[2]))), ph = Math.atan2(r[1], r[0]); return [[Math.cos(th / 2), 0], [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]]; };
/** −iHψ for H = ½[[Δ, Ω e^(−iφ)], [Ω e^(iφ), −Δ]]. */
function deriv(psi, om, phi, det) {
  const e1 = [Math.cos(phi), -Math.sin(phi)], e2 = [Math.cos(phi), Math.sin(phi)];
  const h0 = ca(cs(psi[0], det / 2), cs(cm(e1, psi[1]), om / 2)), h1 = ca(cs(cm(e2, psi[0]), om / 2), cs(psi[1], -det / 2));
  return [[h0[1], -h0[0]], [h1[1], -h1[0]]];
}
const axpy = (psi, k, h) => [ca(psi[0], cs(k[0], h)), ca(psi[1], cs(k[1], h))];
/** RK4 through one pulse from local time 0 to tau. */
function rk4(psi, p, tau, steps) {
  const n = Math.max(1, Math.ceil(steps * tau / p.T)), h = tau / n, om = (t) => p.A * SHAPE[p.shape](t, p.T);
  for (let i = 0; i < n; i++) {
    const t = i * h, k1 = deriv(psi, om(t), p.phi, p.det), k2 = deriv(axpy(psi, k1, h / 2), om(t + h / 2), p.phi, p.det);
    const k3 = deriv(axpy(psi, k2, h / 2), om(t + h / 2), p.phi, p.det), k4 = deriv(axpy(psi, k3, h), om(t + h), p.phi, p.det);
    psi = [0, 1].map((j) => ca(psi[j], cs(ca(ca(k1[j], cs(k2[j], 2)), ca(cs(k3[j], 2), k4[j])), h / 6)));
  }
  return psi;
}
/** A program from the page's settings: the hardware ('main') or the compared path. */
function program(s, kind) {
  const ph = (s.two ? [s.phi, s.phi2] : [s.phi]);
  let phases = ph.map((p) => p - s.sign * s.lam), shape = s.shape, A = s.peak, det = s.det * MHZ, pre = 0;
  if (kind === 'two') phases = phases.slice().reverse();
  if (kind === 'lam') { phases = ph; pre = s.lam * DEG; }
  if (kind === 'det') det = 0;
  if (kind === 'gauss') { shape = 'square'; A = s.areaSet / s.T; }
  return { pre, pulses: phases.map((p, i) => ({ t0: i * s.T, T: s.T, shape, A, phi: p * DEG, det })) };
}
/** The state at time t: an instantaneous Rz(pre) first (the literal circuit only), then the pulses in order. */
function run(s, kind, t, steps = 4000) {
  const pr = program(s, kind), r0 = s.r0;
  let psi = stateOf(r0);
  if (pr.pre) psi = [cm([Math.cos(pr.pre / 2), -Math.sin(pr.pre / 2)], psi[0]), cm([Math.cos(pr.pre / 2), Math.sin(pr.pre / 2)], psi[1])];
  for (const p of pr.pulses) { const tau = Math.max(0, Math.min(p.T, t - p.t0)); if (tau > 0) psi = rk4(psi, p, tau, steps); }
  return blochOf(psi);
}
/** Re tr U / 2 of the hardware propagator at t (the page's angle is 2 arccos of it): columns of U by RK4. */
function traceHalf(s, t) {
  const pr = program(s, 'main');
  let c0 = [[1, 0], [0, 0]], c1 = [[0, 0], [1, 0]];
  for (const p of pr.pulses) { const tau = Math.max(0, Math.min(p.T, t - p.t0)); if (tau > 0) { c0 = rk4(c0, p, tau, 4000); c1 = rk4(c1, p, tau, 4000); } }
  return (c0[0][0] + c1[1][0]) / 2;
}
const rotZ = (r, a) => [r[0] * Math.cos(a) - r[1] * Math.sin(a), r[0] * Math.sin(a) + r[1] * Math.cos(a), r[2]];
// 2 × 2 matrices for the virtual-Z identity
const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
const Rz = (l) => [[[Math.cos(l / 2), -Math.sin(l / 2)], [0, 0]], [[0, 0], [Math.cos(l / 2), Math.sin(l / 2)]]];
const Rphi = (phi, th) => { const c = Math.cos(th / 2), s = Math.sin(th / 2); return [[[c, 0], cm([0, -s], [Math.cos(phi), -Math.sin(phi)])], [cm([0, -s], [Math.cos(phi), Math.sin(phi)]), [c, 0]]]; };
const mdiff = (A, B) => Math.max(...[0, 1].flatMap((i) => [0, 1].map((j) => Math.hypot(A[i][j][0] - B[i][j][0], A[i][j][1] - B[i][j][1]))));
// the note under the readouts reports the end points of the whole program: recomputed here by RK4 at the program's end,
// with the angle between two ends taken from chords (the page uses atan2 of the cross and dot products)
const num = (x) => Number(String(x).replace(/−/g, '-'));
const P0T = (r) => (1 + r[2]) / 2;
function sepT(a, b) {
  const d = vdist(a, b), s = Math.hypot(a[0] + b[0], a[1] + b[1], a[2] + b[2]);
  return (d <= Math.SQRT2 ? 2 * Math.asin(Math.min(1, d / 2)) : PI - 2 * Math.asin(Math.min(1, s / 2))) / DEG;
}
const nsT = (t) => `${t.toFixed(t < 2 ? 2 : 1)} ns`;
const degT = (d) => { const x = ((d + 180) % 360 + 360) % 360 - 180; return `${String(x === -180 ? 180 : x).replace('-', '−')}°`; };
const NOTE = {
  zh: { pair: /实线 P\(0\) = ([−\d.]+)，虚线[^P]*P\(0\) = ([−\d.]+)，相距 ([−\d.]+)°/, one: /P\(0\) = ([−\d.]+)（起点 ([−\d.]+)），离起点 ([−\d.]+)°/,
    from: /实线离起点 ([−\d.]+)°/, at: (end, lab) => `全程终点（t = ${nsT(end)}${lab ? '，旋转系' : ''}）` },
  en: { pair: /solid P\(0\) = ([−\d.]+), dashed[^P]*P\(0\) = ([−\d.]+), ([−\d.]+)° apart/, one: /P\(0\) = ([−\d.]+) \(start ([−\d.]+)\), ([−\d.]+)° from the start/,
    from: /the solid end is ([−\d.]+)° from the start/, at: (end, lab, two) => `Full-program end${two ? 's' : ''} (t = ${nsT(end)}${lab ? ', rotating frame' : ''})` }
};
const TOL_P = 5e-5 + 2e-6, TOL_A = 0.05 + 2e-3;   // the note rounds P(0) to 4 places and angles to 0.1°
/** The ends of the whole program by RK4 (whatever the rail's time): both P(0), the angle between them, and from the start. */
function endsT(s) {
  const end = s.max, m = run(s, 'main', end), g = s.ghost ? run(s, s.ghost, end) : null;
  return { end, m, g, P0m: P0T(m), P0g: g ? P0T(g) : null, gap: g ? sepT(m, g) : null, from: sepT(s.r0, m) };
}
/** Whether a note (language lng) reports those ends, labelled as the full program's: [ok, what disagrees]. */
function noteMatches(note, lng, s, E) {
  const R = NOTE[lng], bad = [], off = (txt, v, tol, what) => { if (!(Math.abs(num(txt) - v) <= tol)) bad.push(`${what} ${txt} vs ${v}`); };
  if (!note.includes(R.at(E.end, s.frame === 'lab', !!E.g))) bad.push('label');
  if (E.g) {
    const x = note.match(R.pair);
    if (!x) bad.push('no pair'); else { off(x[1], E.P0m, TOL_P, 'solid P0'); off(x[2], E.P0g, TOL_P, 'dashed P0'); off(x[3], E.gap, TOL_A, 'apart'); }
    if (s.ghost === 'gauss') { const y = note.match(R.from); if (!y) bad.push('no from'); else off(y[1], E.from, TOL_A, 'from start'); }
  } else {
    const x = note.match(R.one);
    if (!x) bad.push('no end'); else { off(x[1], E.P0m, TOL_P, 'P0'); off(x[2], P0T(s.r0), TOL_P, 'start P0'); off(x[3], E.from, TOL_A, 'from start'); }
  }
  return [bad.length === 0, `${lng}: ${bad.join('; ')}`];
}

/* ---------- the gates every stage-first page must pass ---------- */
await stageFirstChecks(T, BOOK, ID);

/* ---------- page-specific checks ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.PULSE_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const seek = async (t) => { await page.evaluate((x) => window.PULSE_DEBUG.seek(x), t); return state(); };
const setRange = async (id, v) => { await page.evaluate(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };
const chip = async (sel) => { await page.click(sel); await settle(page); };
/** The largest distance between the page's main and compared states and the RK4 computation at the current time. */
function err(s) {
  let e = vdist(run(s, 'main', s.t), s.r);
  if (s.ghost) e = Math.max(e, vdist(run(s, s.ghost, s.t), s.ghostState.r));
  return e;
}

let s = await state();
check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on the QUARTER card at its still frame t = 25 ns', s.preset === 'quarter' && close(s.t, 25) && !s.playing && close(s.max, 25));

// cards: the end states, recomputed
check('QUARTER: 10 MHz for 25 ns has area π/2 (Simpson)', close(s.peak, 2 * PI * 0.01, 1e-15) && close(simpson((t) => s.peak * SHAPE.square(t, 25), 0, 25), PI / 2, 1e-12) && close(s.area, PI / 2, 1e-12));
check('QUARTER: the north pole goes to −y, P(0) = 1/2, the propagator angle is π/2', vdist(s.r, [0, -1, 0]) < 1e-12 && close(s.P0, 0.5, 1e-12) && close(s.angle, PI / 2, 1e-9) && err(s) < 1e-9, `rk4 error ${err(s)}`);
await pick('gauss'); s = await seek(25);
const gArea = simpson((t) => s.peak * SHAPE.gauss(t, 25), 0, 25);
check('SAME-AREA: the Gaussian envelope has area π/2 (Simpson on the envelope)', close(gArea, PI / 2, 1e-10), `${gArea}`);
check('SAME-AREA: it ends at the same point as the square pulse of the same area', vdist(s.r, [0, -1, 0]) < 1e-9 && vdist(s.ghostState.r, [0, -1, 0]) < 1e-9 && s.ghost === 'gauss' && err(s) < 1e-8);
s = await seek(6);
check('SAME-AREA: at 6 ns the Gaussian is behind the evenly moving square pulse', s.area < s.ghostState.area - 0.2 && err(s) < 1e-8 && close(s.ghostState.area, PI / 2 * 6 / 25, 1e-12));
await pick('half'); s = await seek(25);
check('HALF-TURN: area π takes the north pole to the south pole, P(0) = 0', vdist(s.r, [0, 0, -1]) < 1e-12 && close(s.P0, 0, 1e-12) && err(s) < 1e-9);
await pick('detune'); s = await seek(25);
const miss = Math.acos(run(s, 'main', 25).reduce((a, x, i) => a + x * run(s, 'det', 25)[i], 0)) / DEG;
check('DETUNED: the time-ordered slices agree with Runge–Kutta to 1e-6', err(s) < 1e-6, `error ${err(s)}`);
check('DETUNED: the same area π/2 misses the undetuned end by about 26°', close(s.area, PI / 2, 1e-12) && miss > 25.5 && miss < 26.5 && vdist(s.ghostState.r, [0, -1, 0]) < 1e-9, `${miss.toFixed(2)}°`);
check('DETUNED: the note gives the miss the suite computes', (await page.textContent('#roNote')).includes(`${miss.toFixed(1)}°`));
s = await seek(12.5);
check('DETUNED: in mid-pulse the axis is tilted out of the equator', s.axis && s.axis[2] > 0.1 && s.axis[2] < 0.5);
await pick('order'); s = await seek(50);
check('SWAP-ORDER: X then Y takes the north pole to −y; Y then X takes it to +x', vdist(s.r, [0, -1, 0]) < 1e-9 && vdist(s.ghostState.r, [1, 0, 0]) < 1e-9 && s.ghost === 'two' && close(s.max, 50) && err(s) < 1e-8);
await pick('vz'); s = await seek(25);
check('VIRTUAL-Z: the pulse is sent at φ − λ = −90°', s.phys.length === 1 && close(s.phys[0], -90));
check('VIRTUAL-Z: from |+⟩ both the hardware path and the literal circuit reach the north pole, P(0) = 1', vdist(s.r, [0, 0, 1]) < 1e-9 && vdist(s.ghostState.r, [0, 0, 1]) < 1e-9 && close(s.P0, 1, 1e-12) && err(s) < 1e-8);
const plus = [[Math.SQRT1_2, 0], [Math.SQRT1_2, 0]], lit = mm(Rphi(0, PI / 2), Rz(PI / 2));
const out = [ca(cm(lit[0][0], plus[0]), cm(lit[0][1], plus[1])), ca(cm(lit[1][0], plus[0]), cm(lit[1][1], plus[1]))];
check('VIRTUAL-Z: matrices: R_x(π/2) R_z(π/2)|+⟩ = e^(−iπ/4)|0⟩', close(out[0][0], Math.SQRT1_2, 1e-12) && close(out[0][1], -Math.SQRT1_2, 1e-12) && Math.hypot(...out[1]) < 1e-12);
check('VIRTUAL-Z: the mark of the Z takes 0 ns: the analog time is the pulse alone', (await page.textContent('#roTime')).includes('25.0 ns') && close(s.max, 25));
await pick('sign'); s = await seek(25);
check('WRONG-SIGN: sent at φ + λ = +90° the state reaches the south pole, P(0) = 0, while the circuit means the north pole', close(s.phys[0], 90) && vdist(s.r, [0, 0, -1]) < 1e-9 && vdist(s.ghostState.r, [0, 0, 1]) < 1e-9 && close(s.P0, 0, 1e-12));
await pick('carrier'); s = await seek(0.3);
check('CARRIER: lab frame, no drive: |+⟩ has turned 1.5 times about z to −x after 0.3 ns', s.frame === 'lab' && close(s.area, 0) && vdist(s.lab, rotZ([1, 0, 0], W0 * 0.3)) < 1e-12 && vdist(s.lab, [-1, 0, 0]) < 1e-12);
check('CARRIER: the two poles stay put (eigenstates of H₀)', vdist(s.labPoles[0], [0, 0, 1]) < 1e-12 && vdist(s.labPoles[1], [0, 0, -1]) < 1e-12);
check('CARRIER: the rail runs 0.4 ns, two carrier periods', close(s.max, 0.4));

// the area law is for one resonant axis: two ordinary pulses about X then Y, reached through the controls
const lang = async (l) => { await page.click(`[data-lang-set="${l}"]`); await settle(page); };
const words = async () => ({ sub: await page.textContent('#hudSub'), note: await page.textContent('#roNote') });
await pick('quarter'); await chip('#twoChips [data-two="1"]');
s = await seek(50);
const area2 = 2 * simpson((t) => s.peak * SHAPE.square(t, 25), 0, 25), ang2 = 2 * Math.acos(Math.max(-1, Math.min(1, traceHalf(s, 50))));
check('two quarter pulses, X then Y: the areas add up to π (Simpson) while the RK4 propagator turns only 2π/3, and the page agrees', s.two && close(s.phi, 0) && close(s.phi2, 90) && close(area2, PI, 1e-12) && close(s.area, area2, 1e-12)
  && close(ang2, 2 * PI / 3, 1e-6) && close(s.angle, ang2, 1e-6) && err(s) < 1e-8, `area ${s.area}, angle ${s.angle}, rk4 ${ang2}`);
let w = await words();
check('two pulses (zh): the HUD gives area 1.00π and angle 0.67π apart and does not equate them; the note says so', w.sub.includes('面积 1.00π') && w.sub.includes('转角 0.67π') && !w.sub.includes('= 转过') && w.note.includes('面积合计 1.00π') && w.note.includes('0.67π'), `${w.sub} | ${w.note}`);
await lang('en'); w = await words();
check('two pulses (en): the same, in English', w.sub.includes('area 1.00π') && w.sub.includes('angle 0.67π') && !w.sub.includes('turned') && w.note.includes('add up to 1.00π') && w.note.includes('0.67π'), `${w.sub} | ${w.note}`);
s = await seek(25); w = await words();
check('…while only the first pulse has acted, one resonant axis: area = angle, and the HUD equates them (en)', close(s.angle, s.area, 1e-9) && close(s.area, PI / 2, 1e-12) && w.sub.includes('area swept 0.50π = 90.0° turned'), w.sub);
await lang('zh'); w = await words();
check('…and in Chinese', w.sub.includes('扫过面积 0.50π = 转过 90.0°'), w.sub);
// the same axis twice is still two pulses: once the second has begun the HUD keeps area and angle apart
await pick('quarter'); await chip('#twoChips [data-two="1"]'); await setRange('phase2', 0); await setRange('area', 1.5);
s = await seek(50);
const area3 = 2 * simpson((t) => s.peak * SHAPE.square(t, 25), 0, 25), ang3 = 2 * Math.acos(Math.max(-1, Math.min(1, traceHalf(s, 50))));
check('two pulses of area 1.5π about X: the areas add up to 3π (Simpson), the RK4 propagator\'s principal angle is π, and the page agrees', s.two && close(s.phi, 0) && close(s.phi2, 0) && close(area3, 3 * PI, 1e-12) && close(s.area, area3, 1e-12)
  && close(ang3, PI, 1e-6) && close(s.angle, ang3, 1e-6) && err(s) < 1e-8, `area ${s.area}, angle ${s.angle}, rk4 ${ang3}`);
const ro = async () => (await page.textContent('#roArea')).replace(/\s+/g, ' ');
w = await words(); let roA = await ro();
check('same phases, after the second pulse (zh): the readout gives 3.00π · 1.00π and the HUD the same two numbers apart, not 3π = 540°', roA.includes('3.00π · 1.00π') && w.sub.includes('面积 3.00π') && w.sub.includes('转角 1.00π') && !w.sub.includes('= 转过') && !w.sub.includes('540'), `${w.sub} | ${roA}`);
await lang('en'); w = await words(); roA = await ro();
check('same phases, after the second pulse (en): the same, in English', roA.includes('3.00π · 1.00π') && w.sub.includes('area 3.00π') && w.sub.includes('angle 1.00π') && !w.sub.includes('turned') && !w.sub.includes('540'), `${w.sub} | ${roA}`);
s = await seek(25); w = await words();
check('…while only the first of them has acted, the HUD equates area and angle: 1.50π = 270.0° (en)', close(s.area, 1.5 * PI, 1e-12) && close(s.angle, 1.5 * PI, 1e-9) && w.sub.includes('area swept 1.50π = 270.0° turned'), w.sub);
await lang('zh');

// no drive: the rotating-frame state stays only on resonance or on a pole; detuned, it precesses at Δ
await pick('carrier'); await chip('#frameChips [data-frame="rot"]'); await setRange('dur', 25); await setRange('det', 10);
s = await seek(25);
const free = run(s, 'main', 25);
check('no drive, detuned 10 MHz for 25 ns: RK4 turns |+⟩ by Δt = π/2 about z to +y, and so does the page', close(s.area, 0) && s.det === 10 && s.frame === 'rot' && vdist(s.r0, [1, 0, 0]) < 1e-12
  && vdist(free, rotZ([1, 0, 0], 10 * MHZ * 25)) < 1e-9 && vdist(free, [0, 1, 0]) < 1e-9 && vdist(s.r, free) < 1e-9 && err(s) < 1e-9);
w = await words();
check('no drive, detuned (zh): the HUD and the note say the state precesses (100 ns a turn), not that nothing moves', w.sub.includes('进动') && !w.sub.includes('一动不动') && w.note.includes('进动') && w.note.includes('100 ns'), `${w.sub} | ${w.note}`);
await lang('en'); w = await words();
check('no drive, detuned (en): the same, in English', w.sub.includes('precesses') && !w.sub.includes('nothing moves') && w.note.includes('precesses') && w.note.includes('100 ns'), `${w.sub} | ${w.note}`);
await lang('zh');
await setRange('det', 0); s = await seek(25);
check('no drive on resonance: nothing moves in the rotating frame, and the HUD says so', vdist(s.r, [1, 0, 0]) < 1e-12 && vdist(run(s, 'main', 25), [1, 0, 0]) < 1e-9 && (await page.textContent('#hudSub')).includes('一动不动'));
await pick('quarter'); await setRange('area', 0); await setRange('det', 10); s = await seek(25);
check('no drive, detuned, from the north pole: the longitudinal state stays (RK4), and the HUD says so', vdist(s.r0, [0, 0, 1]) < 1e-12 && vdist(run(s, 'main', 25), [0, 0, 1]) < 1e-9 && vdist(s.r, [0, 0, 1]) < 1e-12 && (await page.textContent('#hudSub')).includes('极点'));
const stat = await page.evaluate(() => ({ lean: document.getElementById('leanStationary').textContent, tag: document.querySelector('.tagline').textContent }));
check('the Lean stationarity box is scoped to the free evolution by H₀, and the tagline to one resonant pulse of fixed phase (both languages)', stat.lean.includes('不加驱动') && stat.lean.includes('no drive') && stat.tag.includes('共振、相位固定') && stat.tag.includes('one resonant pulse of fixed phase'));

// free play: random settings against Runge–Kutta, rotating and lab frame, the angle of the propagator
const rnd = (() => { let a = 7; return () => { a = (a * 1103515245 + 12345) % 2147483648; return a / 2147483648; }; })();
let worst = 0, worstAng = 0, worstLab = 0, zSame = 0;
await pick('quarter');
for (let k = 0; k < 6; k++) {
  await chip(`#shapeChips [data-shape="${k % 2 ? 'gauss' : 'square'}"]`);
  await setRange('area', (0.2 + 1.6 * rnd()).toFixed(2)); await setRange('dur', (5 + 30 * rnd()).toFixed(1));
  await setRange('phase', 5 * Math.round((360 * rnd() - 180) / 5)); await setRange('det', k < 3 ? 0 : (0.5 * Math.round(20 * rnd() - 10)).toFixed(1));
  await setRange('lam', k === 2 || k === 5 ? 15 * Math.round((360 * rnd() - 180) / 15) : 0);
  await chip(`#twoChips [data-two="${k === 4 ? 1 : 0}"]`);
  await chip(`#frameChips [data-frame="${k % 3 === 1 ? 'lab' : 'rot'}"]`);
  s = await state();
  for (const f of [0.3, 0.71, 1]) {
    s = await seek(s.max * f);
    worst = Math.max(worst, err(s));
    const w = traceHalf(s, s.t); worstAng = Math.max(worstAng, Math.abs(2 * Math.acos(Math.max(-1, Math.min(1, w))) - s.angle));
    if (s.frame === 'lab') worstLab = Math.max(worstLab, vdist(s.lab, rotZ(run(s, 'main', s.t), (W0 - s.det * MHZ) * s.t)));
    if (s.ghost === 'lam') zSame = Math.max(zSame, Math.abs(s.r[2] - s.ghostState.r[2]), vdist(rotZ(s.r, s.lam * DEG), s.ghostState.r));
  }
}
check('free play: six random programs × three times: main and compared states agree with Runge–Kutta', worst < 1e-6, `max error ${worst}`);
check('free play: the angle of the propagator is 2 arccos(Re tr U / 2) of the RK4 propagator', worstAng < 1e-5, `max error ${worstAng}`);
check('free play: the lab frame is the rotating-frame solution turned by (ω₀ − Δ)t about z', worstLab < 1e-6, `max error ${worstLab}`);
check('virtual Z: the hardware end equals the literal circuit turned back by λ about z (same height, same P(0))', zSame < 1e-8, `max error ${zSame}`);
let ident = 0;
for (let k = 0; k < 20; k++) { const phi = 6 * rnd(), th = 6 * rnd(), l = 6 * rnd(); ident = Math.max(ident, mdiff(mm(Rphi(phi, th), Rz(l)), mm(Rz(l), Rphi(phi - l, th))), mdiff(mm(mm(Rz(l), Rphi(phi, th)), Rz(-l)), Rphi(phi + l, th))); }
check('matrices: R_φ(θ)R_z(λ) = R_z(λ)R_{φ−λ}(θ) and R_z(λ)R_φ(θ)R_z(−λ) = R_{φ+λ}(θ) (20 random cases, independent of the page)', ident < 1e-12);

// the note: what it says about the two ends must be what the ends of the whole program are (RK4), in both languages,
// wherever the rail stands; sameness or difference only as the numbers show it
const notes = async () => { const zh = await page.textContent('#roNote'); await lang('en'); const en = await page.textContent('#roNote'); await lang('zh'); return { zh, en }; };
const p0Now = async () => num((await page.textContent('#roP0')).trim().split(' ')[0]);
const both = (N, s, E) => { const a = noteMatches(N.zh, 'zh', s, E), b = noteMatches(N.en, 'en', s, E); return [a[0] && b[0], `${a[1]} | ${b[1]}`]; };
let E, N, M;
// equal ends where the phases differ: X(π/2) then −X(π/2) undo each other in either order
await pick('order'); await setRange('phase2', 180); s = await seek(30);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('ORDER at 0°/180°, π/2 each: RK4 returns both orders to the north pole; the note reports P(0) = 1.0000 twice and 0.0° apart, and no difference or non-commutation (zh, en)',
  s.ghost === 'two' && close(s.phi2, 180) && vdist(E.m, [0, 0, 1]) < 1e-9 && vdist(E.g, [0, 0, 1]) < 1e-9 && M[0] && N.zh.includes('相距 0.0°') && N.en.includes('0.0° apart')
  && !/不对易|终点不同|却/.test(N.zh) && !/commute|elsewhere|different points|yet/.test(N.en), `${M[1]} | ${N.zh} | ${N.en}`);
const cur30 = P0T(run(s, 'main', 30));
check('…scrubbed to 30 ns: the P(0) readout is the current one (RK4) while the note keeps the full-program end at 50 ns',
  Math.abs((await p0Now()) - cur30) <= TOL_P && Math.abs(cur30 - E.P0m) > 0.3 && N.zh.includes('全程终点（t = 50.0 ns）') && N.en.includes('Full-program ends (t = 50.0 ns)'), `${cur30}`);
// two π pulses about X and Y: the propagators differ only by a sign, so both orders end at the same point
await pick('order'); await setRange('area', 1); s = await seek(50);
E = endsT(s); N = await notes(); M = both(N, s, E);
const negM = (A) => A.map((row) => row.map((z) => cs(z, -1))), XY = mm(Rphi(PI / 2, PI), Rphi(0, PI)), YX = mm(Rphi(0, PI), Rphi(PI / 2, PI));
const ang4 = 2 * Math.acos(Math.max(-1, Math.min(1, traceHalf(s, 50)))) / PI, aN = [N.zh.match(/合成传播子的转角是 ([−\d.]+)π/), N.en.match(/combined propagator turns by ([−\d.]+)π/)];
check('ORDER with two π pulses, X then Y: the two products differ by a global sign (matrices); RK4 ends both orders at the north pole; the note says 0.0° apart, P(0) = 1 twice, areas 2.00π and the RK4 angle, without a contrast',
  mdiff(XY, YX) > 1 && mdiff(XY, negM(YX)) < 1e-12 && vdist(E.m, [0, 0, 1]) < 1e-9 && vdist(E.g, [0, 0, 1]) < 1e-9 && M[0] && N.zh.includes('面积合计 2.00π') && N.en.includes('add up to 2.00π')
  && aN.every((x) => x && Math.abs(num(x[1]) - ang4) <= 0.005 + 1e-6) && close(ang4, 1, 1e-6) && !/不对易|却/.test(N.zh) && !/commute|yet/.test(N.en), `${M[1]} | ${N.zh} | ${N.en}`);
// the wrong sign from the north pole: other azimuth, same height
await pick('quarter'); await setRange('lam', 90); await chip('#signChips [data-sign="-1"]'); s = await seek(10);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('WRONG SIGN from the north pole, λ = 90°: RK4 ends the two paths 90° apart at the same height (P(0) = 1/2 both); the note reports that and does not say the readout changes',
  s.ghost === 'lam' && s.sign === -1 && close(E.P0m, 0.5, 1e-9) && close(E.P0g, 0.5, 1e-9) && close(E.gap, 90, 1e-6) && M[0]
  && N.zh.includes('读数在四位小数上相同') && !N.zh.includes('读数变了') && N.en.includes('agree to four decimals') && !/readout changes|another height/.test(N.en), `${M[1]} | ${N.zh}`);
await pick('sign'); s = await seek(25);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('WRONG-SIGN card: RK4 ends at P(0) = 0 against 1, 180° apart, and the note says the readout changes (zh, en)',
  close(E.P0m, 0, 1e-9) && close(E.P0g, 1, 1e-9) && close(E.gap, 180, 1e-4) && M[0] && N.zh.includes('读数变了') && N.en.includes('the readout changes'), `${M[1]}`);
// the right sign: the literal end is the hardware end turned by λ about z, also when both sit on the axis
await pick('vz'); s = await seek(12);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('VIRTUAL-Z: both ends on the north pole (RK4), related by Z(90°) trivially; the note states the z-turn relation and reports 0.0° apart, not 90° (zh, en)',
  vdist(E.m, [0, 0, 1]) < 1e-9 && vdist(rotZ(E.m, PI / 2), E.g) < 1e-9 && M[0] && N.zh.includes('把实线的终点绕 z 轴转 90° 就得到虚线的终点') && N.zh.includes('相距 0.0°')
  && N.en.includes('Turning the solid end by 90° about z gives the dashed end') && N.en.includes('0.0° apart') && !N.en.includes('90.0° apart') && !N.zh.includes('只差'), `${M[1]} | ${N.en}`);
await pick('quarter'); await setRange('lam', 90); s = await seek(25);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('right sign from the north pole, λ = 90°: RK4 ends 90° apart, the literal one the hardware one turned by 90° about z, P(0) = 1/2 both; the note agrees',
  s.sign === 1 && vdist(rotZ(E.m, PI / 2), E.g) < 1e-9 && close(E.gap, 90, 1e-6) && close(E.P0m, 0.5, 1e-9) && M[0] && N.zh.includes('高度相同') && N.en.includes('same height'), M[1]);
await pick('quarter'); await setRange('lam', 180); await chip('#signChips [data-sign="-1"]'); s = await seek(25);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('λ = 180° with the “wrong” sign: φ + λ and φ − λ are one phase, RK4 relates the ends by Z(180°) (180° apart, P(0) = 1/2 both), and the note says the sign makes no difference',
  s.sign === -1 && close(s.phys[0], 180) && vdist(rotZ(E.m, PI), E.g) < 1e-9 && close(E.gap, 180, 1e-4) && M[0] && N.zh.includes('同一个相位') && !N.zh.includes('改错了符号')
  && N.en.includes('the same phase') && !N.en.includes('wrong sign') && N.en.includes('Turning the solid end by 180° about z'), `${M[1]} | ${N.en}`);
// detuned: a square envelope keeps one tilted axis, a Gaussian one turns it
await pick('quarter'); await setRange('det', 5); s = await state();
const axSq = [s.peak, 0, 5 * MHZ].map((x, i, g) => x / Math.hypot(...g));
let axes = []; for (const t of [0, 3, 12.5, 24.9, 25]) axes.push((await seek(t)).axis);
s = await seek(7); E = endsT(s); N = await notes(); M = both(N, s, E);
const tiltSq = (Math.asin(axSq[2]) / DEG).toFixed(1), axTxt = `(${axSq.map((x) => x.toFixed(2)).join(', ')})`;
check('detuned square pulse (5 MHz, 10 MHz peak): the axis is the constant (Ω, 0, Δ)/|·| = (0.894…, 0, 0.447…) at every time, and the note says fixed, gives it and its 26.6° tilt, and the RK4 ends',
  axes.every((a) => a && vdist(a, axSq) < 1e-12) && close(axSq[0], 2 / Math.sqrt(5), 1e-12) && tiltSq === '26.6' && M[0] && N.zh.includes(`固定为 ${axTxt}`) && N.zh.includes(`倾出赤道 ${tiltSq}°`)
  && N.en.includes(`stays at ${axTxt}`) && N.en.includes(`${tiltSq}° off the equator`) && !N.zh.includes('晃') && !/sway/.test(N.en), `${M[1]} | ${N.en}`);
await pick('detune'); s = await state();
const zG = (t) => 5 * MHZ / Math.hypot(s.peak * SHAPE.gauss(t, 25), 5 * MHZ);
axes = []; for (const t of [0, 6, 12.5, 25]) axes.push([t, (await seek(t)).axis]);
s = await seek(9); E = endsT(s); N = await notes(); M = both(N, s, E);
const tiltG = (Math.asin(zG(12.5)) / DEG).toFixed(1);
check('detuned Gaussian (DETUNED card): the axis tilt follows the envelope, vertical (+z) at both ends, lower at 6 ns, lowest at the peak; the note says so with the peak tilt and the RK4 ends',
  axes.every(([t, a]) => a && close(a[2], zG(t), 1e-9) && close(a[1], 0, 1e-12)) && close(axes[0][1][2], 1, 1e-9) && close(axes[3][1][2], 1, 1e-9) && axes[1][1][2] > axes[2][1][2] + 0.05
  && M[0] && N.zh.includes('随包络变化') && N.zh.includes(`峰值处倾出赤道 ${tiltG}°`) && N.zh.includes('沿 +z') && N.en.includes('changes with the envelope') && N.en.includes(`${tiltG}° off the equator at the peak`) && N.en.includes('along +z'),
  `${M[1]} | ${axes.map(([t, a]) => `${t}: ${a && a[2]}`).join(', ')}`);
// the ordinary single pulse: the area is the propagator's angle, not the distance every start travels
await pick('quarter'); s = await seek(25);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('QUARTER (default): the note calls the area 0.50π the propagator\'s angle (90.0°) and reports the RK4 end, P(0) = 0.5000 from 1.0000, 90.0° from the start',
  !s.ghost && M[0] && N.zh.includes('面积 0.50π 是传播子的转角') && N.zh.includes('转过 90.0°') && N.en.includes('The area 0.50π is the angle of the propagator') && N.en.includes('90.0° from the start'), `${M[1]} | ${N.en}`);
s = await seek(10);
const N10 = await notes(), cur10 = P0T(run(s, 'main', 10));
check('…scrubbed to 10 ns, the note is unchanged while the P(0) readout follows the rail (RK4)', N10.zh === N.zh && N10.en === N.en && Math.abs((await p0Now()) - cur10) <= TOL_P && Math.abs(cur10 - 0.5) > 0.1, `${cur10}`);
await pick('vz'); await setRange('lam', 0); s = await seek(25);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('from |+⟩ on the X axis the same quarter-turn leaves the state where it is (RK4): the note keeps 90.0° as the propagator\'s angle and reports 0.0° from the start',
  !s.ghost && vdist(E.m, [1, 0, 0]) < 1e-9 && M[0] && N.zh.includes('转过 90.0°') && N.zh.includes('离起点 0.0°') && N.en.includes('0.0° from the start'), `${M[1]} | ${N.zh}`);
await pick('gauss'); s = await seek(6);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('SAME-AREA, scrubbed to 6 ns: the note reports the Gaussian and the dashed square ending 0.0° apart (RK4), 90.0° from the start, while the readout shows the current P(0)',
  s.ghost === 'gauss' && E.gap < 1e-6 && M[0] && N.zh.includes('是传播子的转角') && Math.abs((await p0Now()) - P0T(run(s, 'main', 6))) <= TOL_P && Math.abs(P0T(run(s, 'main', 6)) - E.P0m) > 0.1, M[1]);

// the continuous domain: programs of every kind with random areas, durations, phases, detunings and virtual Z, read at
// a random time on the rail and again elsewhere
const rnd2 = (() => { let a = 20261112; return () => { a = (a * 1103515245 + 12345) % 2147483648; return a / 2147483648; }; })();
const MIX = [
  { card: 'vz', shape: 'gauss', two: 1, det: 1, frame: 'lab' }, { card: 'quarter', shape: 'square', lam: 1, sign: -1, det: 1 },
  { card: 'vz', shape: 'gauss', lam: 1, sign: 1, det: 1 }, { card: 'quarter', shape: 'square', det: 1 }, { card: 'vz', shape: 'gauss', det: 1, frame: 'lab' },
  { card: 'vz', shape: 'square' }, { card: 'quarter', shape: 'gauss', frame: 'lab' }, { card: 'vz', shape: 'square', two: 1, lam: 1 },
  { card: 'vz', shape: 'gauss', lam: 1, sign: -1 }, { card: 'quarter', shape: 'square', two: 1, det: 1, same: 1 }, { card: 'quarter', shape: 'square', two: 1 }
];
const bad = { ends: [], rail: [], words: [] }, seen = new Set();
let lagged = 0;
for (const [k, c] of MIX.entries()) {
  await pick(c.card); await chip(`#shapeChips [data-shape="${c.shape}"]`);
  await setRange('area', (0.15 + 1.7 * rnd2()).toFixed(2)); await setRange('dur', (4 + 32 * rnd2()).toFixed(1));
  const ph = 5 * Math.round((360 * rnd2() - 180) / 5); await setRange('phase', ph);
  await setRange('det', c.det ? 0.5 * Math.round(28 * rnd2() - 14) || 2.5 : 0);
  await setRange('lam', c.lam ? 15 * Math.round(22 * rnd2() - 11) || 45 : 0);
  if (c.lam) await chip(`#signChips [data-sign="${c.sign || 1}"]`);
  if (c.two) { await chip('#twoChips [data-two="1"]'); await setRange('phase2', c.same ? ph : 5 * Math.round((360 * rnd2() - 180) / 5)); }
  if (c.frame) await chip(`#frameChips [data-frame="${c.frame}"]`);
  s = await state(); seen.add(s.ghost || 'none');
  s = await seek(s.max * (0.15 + 0.6 * rnd2()));
  E = endsT(s); N = await notes(); M = both(N, s, E);
  if (!M[0]) bad.ends.push(`#${k} ${M[1]}`);
  // the rail: the note stays, the readout follows
  const nowP0 = P0T(run(s, 'main', s.t)), shown = await p0Now();
  if (Math.abs(shown - nowP0) > TOL_P) bad.rail.push(`#${k} readout ${shown} vs ${nowP0}`);
  if (Math.abs(nowP0 - E.P0m) > 0.01) lagged++;
  await seek(s.max * 0.97); if ((await page.textContent('#roNote')) !== N.zh) bad.rail.push(`#${k} note moved with the rail`);
  // the words follow the numbers the note shows
  const x = [N.zh.match(NOTE.zh.pair), N.en.match(NOTE.en.pair)], w = (ok, what) => { if (!ok) bad.words.push(`#${k} ${what}`); };
  if (s.ghost === 'lam') {
    const exact = s.sign > 0 || ((2 * s.lam) % 360 + 360) % 360 === 0;
    if (exact) w(vdist(rotZ(E.m, s.lam * DEG), E.g) < 1e-6 && N.zh.includes(`绕 z 轴转 ${degT(s.lam)}`) && N.en.includes(`by ${degT(s.lam)} about z`) && N.en.includes('same height'), 'z-turn relation');
    else if (!x[0]) w(false, 'wrong sign without the pair');
    else {
      const [a, b, g] = x[0].slice(1), want =a !== b ? ['读数变了', 'the readout changes'] : num(g) !== 0 ? ['四位小数上相同', 'agree to four decimals'] : ['两个终点相同', 'coincide'];
      w(N.zh.includes('改错了符号') && N.en.includes('wrong sign') && N.zh.includes(want[0]) && N.en.includes(want[1]), `wrong-sign verdict ${a} ${b} ${g}`);
    }
  } else if (s.ghost === 'two') {
    const same = ((s.phi - s.phi2) % 360 + 360) % 360 === 0, g = x[0] && num(x[0][3]);
    w(same ? N.zh.includes('完全相同') && N.en.includes('identical') : g !== 0 ? N.zh.includes('不对易') && N.en.includes('do not commute') : !N.zh.includes('不对易') && !N.en.includes('commute'), 'commutation follows the measured gap');
    if (s.det !== 0) w(!N.zh.includes('轴') && !/axis|axes/.test(N.en), 'no axis claim for detuned pulses in a row');
    if (s.det === 0 && !same) {
      const ar = 2 * simpson((t) => s.peak * SHAPE[s.shape](t, s.T), 0, s.T) / PI, an = 2 * Math.acos(Math.max(-1, Math.min(1, traceHalf(s, s.max)))) / PI;
      const za = N.zh.match(/面积合计 ([−\d.]+)π，合成传播子的转角是 ([−\d.]+)π/);
      w(za && Math.abs(num(za[1]) - ar) <= 0.005 + 1e-9 && Math.abs(num(za[2]) - an) <= 0.005 + 1e-5 && !/yet/.test(N.en), 'areas and the RK4 angle');
    }
  } else if (s.ghost === 'det') {
    const tilt = Math.asin(s.det * MHZ / Math.hypot(s.peak, s.det * MHZ)) / DEG, tz = N.zh.match(/倾出赤道 ([−\d.]+)°/);
    w(tz && Math.abs(num(tz[1]) - tilt) <= 0.05 + 1e-9 && !N.zh.includes('晃') && !/sway/.test(N.en)
      && (s.shape === 'square' ? N.zh.includes('固定为') && N.en.includes('stays at') : N.zh.includes('随包络变化') && N.en.includes('changes with the envelope')), `axis words for ${s.shape}`);
  } else w(N.zh.includes(`转过 ${(s.areaSet / DEG).toFixed(1)}°`) && N.en.includes('is the angle of the propagator'), 'area as the propagator angle');
}
check('mixed programs (11, every kind, both frames): the note gives the RK4 full-program ends, both P(0), the angle apart and from the start, in both languages', bad.ends.length === 0, bad.ends.slice(0, 3).join(' || '));
check('mixed programs: the note does not move with the rail, while the P(0) readout follows it (RK4 at the rail\'s time), and the two differ in some programs', bad.rail.length === 0 && lagged >= 3, `${bad.rail.slice(0, 3).join(' || ')} · lagged ${lagged}`);
check('mixed programs: the words follow the numbers: z-turn relation only with the right phase, wrong-sign verdicts, commutation, axis words by envelope', bad.words.length === 0 && ['two', 'lam', 'det', 'gauss', 'none'].every((k) => seen.has(k)), `${bad.words.slice(0, 3).join(' || ')} · ${[...seen]}`);

// controls
await pick('quarter');
await setRange('area', 1); s = await state();
check('the area slider sets the area and leaves the card', close(s.areaSet, PI, 1e-12) && s.preset === null && close(s.peak, PI / 25, 1e-12));
await setRange('dur', 10); s = await state();
check('the duration slider sets T, the rail follows, the area is kept', close(s.T, 10) && close(s.max, 10) && close(s.areaSet, PI, 1e-12));
await setRange('phase', 45); s = await seek(5);
check('the phase slider turns the axis on the equator', s.axis && close(s.axis[0], Math.cos(PI / 4), 1e-12) && close(s.axis[1], Math.sin(PI / 4), 1e-12) && close(s.axis[2], 0));
await setRange('det', 3); s = await state();
check('the detuning slider tilts the axis', s.det === 3 && s.axis[2] > 0 && s.ghost === 'det');
await setRange('det', 0); await setRange('lam', 60); s = await state();
check('the virtual-Z slider shifts the pulse to φ − λ', close(s.phys[0], -15) && s.ghost === 'lam');
await chip('#signChips [data-sign="-1"]'); s = await state();
check('the sign chips choose φ + λ', s.sign === -1 && close(s.phys[0], 105));
await chip('#signChips [data-sign="1"]'); await setRange('lam', 0);
await chip('#twoChips [data-two="1"]'); s = await state();
check('the second-pulse chip doubles the rail', s.two && close(s.max, 20) && s.phys.length === 2 && close(s.phys[1], 90) && s.ghost === 'two');
await setRange('phase2', -30); await page.click('#swap'); await settle(page); s = await state();
check('the swap button exchanges the two phases', close(s.phi, -30) && close(s.phi2, 45));
await chip('#twoChips [data-two="0"]');
await chip('#shapeChips [data-shape="gauss"]'); s = await state();
check('the shape chips switch to the Gaussian, keeping the area', s.shape === 'gauss' && close(simpson((t) => s.peak * SHAPE.gauss(t, s.T), 0, s.T), PI, 1e-9));
await chip('#frameChips [data-frame="lab"]'); check('the frame chips switch to the lab frame', (await state()).frame === 'lab');
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('f'); await settle(page); check('F toggles the frame back', (await state()).frame === 'rot');

// direct manipulation on the stage
await pick('quarter'); await seek(25);
let h = await page.evaluate(() => window.PULSE_DEBUG.handles());
let to = await page.evaluate(() => window.PULSE_DEBUG.env(12.5, 16));
await page.mouse.move(h.amp[0], h.amp[1]); await page.mouse.down(); await page.mouse.move(to[0], to[1], { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the top of the envelope to 16 MHz sets the area to 16 MHz × 25 ns', Math.abs(s.peak / MHZ - 16) < 0.2 && close(s.areaSet, s.peak * 25, 1e-9) && s.preset === null, `${s.peak / MHZ} MHz`);
const peak0 = s.peak;
h = await page.evaluate(() => window.PULSE_DEBUG.handles()); to = await page.evaluate(() => window.PULSE_DEBUG.env(15, 0));
await page.mouse.move(h.width[0], h.width[1]); await page.mouse.down(); await page.mouse.move(to[0], h.width[1], { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the right end to 15 ns keeps the height and shrinks the area', Math.abs(s.T - 15) < 0.3 && close(s.peak, peak0, 1e-9) && close(s.areaSet, peak0 * s.T, 1e-9) && close(s.max, s.T), `T = ${s.T}`);
to = await page.evaluate(() => window.PULSE_DEBUG.env(5, 2));
await page.mouse.click(to[0], to[1]); s = await state();
check('pressing inside the envelope plot moves the rail there', Math.abs(s.t - 5) < 0.2, `t = ${s.t}`);
const from = await page.evaluate(() => window.PULSE_DEBUG.screen(window.PULSE_DEBUG.state.r0));
await page.mouse.move(from[0], from[1]); await page.mouse.down(); await page.mouse.move(from[0] + 60, from[1] + 70, { steps: 5 }); await page.mouse.up(); s = await state();
check('dragging the amber ring moves the starting state on the sphere', vdist(s.r0, [0, 0, 1]) > 0.2 && close(Math.hypot(...s.r0), 1, 1e-12) && err(s) < 1e-8);
E = endsT(s); N = await notes(); M = both(N, s, E);
check('…from the dragged start, with the rail mid-pulse: the note gives the RK4 full-program end (P(0), angle from the new start) and the P(0) readout the current state',
  !s.ghost && s.t < s.max - 1 && M[0] && Math.abs((await p0Now()) - P0T(run(s, 'main', s.t))) <= TOL_P, `${M[1]} | t ${s.t} / ${s.max}`);
const cam0 = await page.evaluate(() => window.PULSE_DEBUG.camera()), b0 = await page.evaluate(() => window.PULSE_DEBUG.screen([0, 0, -1.6]));
await page.mouse.move(b0[0] + 90, b0[1]); await page.mouse.down(); await page.mouse.move(b0[0] + 160, b0[1] - 20, { steps: 4 }); await page.mouse.up();
check('dragging empty space orbits the camera', (await page.evaluate(() => window.PULSE_DEBUG.camera())).yaw !== cam0.yaw);

// playback and keyboard
await page.click('[data-preset="gauss"]');
check('clicking a card plays it', await until(page, () => { const d = window.PULSE_DEBUG.state; return d.playing && d.t > 0; }));
await page.evaluate(() => window.PULSE_DEBUG.seek(24.9)); await page.click('#play');
check('playback stops at the end of the rail', await until(page, () => { const d = window.PULSE_DEBUG.state; return !d.playing && d.t >= d.max - 1e-9; }));
await page.click('#rew'); check('⏮ returns to 0 ns', close((await state()).t, 0));
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); check('→ steps an eighth of the rail', close((await state()).t, 25 / 8));
await page.keyboard.press('End'); check('End goes to the end', close((await state()).t, 25));
await page.keyboard.press('Home'); check('Home returns to 0', close((await state()).t, 0));
await page.keyboard.press('Space'); check('Space plays', await until(page, () => window.PULSE_DEBUG.state.t > 0));
await page.keyboard.press('Space'); const paused = await state(); check('Space pauses', !paused.playing);

await page.click('[data-lang-set="en"]'); await pick('quarter');
check('the stage title follows the language', (await page.textContent('#hudBig')).startsWith('Square'));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
