// Browser regression suite for ORTHO//VORTEX (books/quantum-geometry/viz/navier-stokes-p-np/).
//   node books/quantum-geometry/viz/tests/navier-stokes-p-np.test.mjs   (or: node tools/node/viz-test.mjs quantum-geometry)
// Reads the page through window.VORTEX_DEBUG and checks it against independent computations written here: the vector
// identity by finite differences with another step, the cross-section of the tube by integrating its differential
// equation with Runge–Kutta, and the closure criterion by brute force over all 27 settings of the three leaks.
import { session, stageFirstChecks, settle, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'navier-stokes-p-np';
const T = await session();
const { check } = T;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.VORTEX_DEBUG.state); };
// playback advances on animation frames, and a busy runner delivers them late: wait until the page reports the move, not for a fixed time
const until = (fn) => page.waitForFunction(fn, null, { timeout: 30000 }).catch(() => {});
const seek = async (t) => { await D((v) => window.VORTEX_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => { await D(([i, val]) => { const el = document.getElementById(i); el.value = String(val); el.dispatchEvent(new Event('input', { bubbles: true })); }, [id, v]); await settle(page); };

/* ---------- opening view ---------- */
let s = await state();
check('opens on STRETCH: the tube under steady strain, without viscosity, at the telling frame', s.preset === 'strain' && s.scene === 'tube' && s.mode === 'strain' && s.nu === 0 && near(s.t, 1.8) && !s.playing, JSON.stringify([s.preset, s.scene, s.t]));
const { alpha, kappa, gamma, a0 } = s.consts;

/* ---------- the two halves of advection ---------- */
await pick('potential'); s = await state();
check('POTENTIAL: s = 0, no vorticity, the Lamb half is zero and advection equals its gradient half', s.scene === 'lamb' && s.t === 0 && s.lamb.w === 0 && Math.hypot(...s.lamb.lamb) === 0 && near(s.lamb.adv[0], s.lamb.grad[0]) && near(s.lamb.adv[1], s.lamb.grad[1]));
const vel = (q, x, y) => [(1 - q) * x - q * y, -(1 - q) * y + q * x];
let idOK = true, idBad = '', seed = 11; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
for (let k = 0; k < 60 && idOK; k++) {
  const q = rnd(), x = rnd() * 3 - 1.5, y = rnd() * 3 - 1.5, h = 3e-4;
  const d = await D(([a, b, c]) => window.VORTEX_DEBUG.split(a, b, c), [q, x, y]);
  // (u·∇)u and ∇(|u|²/2) by central differences with a step of my own; ω from the curl
  const u = vel(q, x, y), e = (a, b) => { const w = vel(q, a, b); return (w[0] ** 2 + w[1] ** 2) / 2; };
  const ux = [0, 1].map((i) => (vel(q, x + h, y)[i] - vel(q, x - h, y)[i]) / (2 * h)), uy = [0, 1].map((i) => (vel(q, x, y + h)[i] - vel(q, x, y - h)[i]) / (2 * h));
  const adv = [u[0] * ux[0] + u[1] * uy[0], u[0] * ux[1] + u[1] * uy[1]], grad = [(e(x + h, y) - e(x - h, y)) / (2 * h), (e(x, y + h) - e(x, y - h)) / (2 * h)], w = ux[1] - uy[0];
  const ok = near(d.adv[0], adv[0], 1e-6) && near(d.adv[1], adv[1], 1e-6) && near(d.grad[0], grad[0], 1e-6) && near(d.grad[1], grad[1], 1e-6) && near(d.w, w, 1e-6) && near(d.w, 2 * q, 1e-9)
    && near(d.lamb[0], -w * u[1], 1e-6) && near(d.lamb[1], w * u[0], 1e-6) && near(adv[0] - grad[0] - d.lamb[0], 0, 1e-6) && near(adv[1] - grad[1] - d.lamb[1], 0, 1e-6) && d.residual < 1e-6
    && near(ux[0] + uy[1], 0, 1e-8);
  if (!ok) { idOK = false; idBad = JSON.stringify({ q, x, y, d }); }
}
check('60 random points: advection = gradient half + ω × u, ω = 2s, the flow is divergence-free (finite differences of my own)', idOK, idBad);
await pick('vortex'); await page.waitForTimeout(400); s = await state();
check('LAMB plays s upward from 0', s.scene === 'lamb' && (s.playing || s.t > 0));
s = await seek(0.8); check('at s = 0.8 the vorticity is 1.6 and the readout shows a nonzero Lamb half', near(s.lamb.w, 1.6) && Number((await page.textContent('#roKey')).replace('−', '-')) > 0);
const to = await D(() => window.VORTEX_DEBUG.at(-0.6, 0.9));
await page.mouse.click(to[0], to[1]); s = await state();
check('clicking the stage moves the probe there', near(s.probe[0], -0.6, 0.03) && near(s.probe[1], 0.9, 0.03) && s.preset === null, JSON.stringify(s.probe));
check('the residual of the identity at the probe is shown as passing', (await page.textContent('#ro4')).includes('✓'));

/* ---------- the vortex tube ---------- */
const rhs = (mode, nu, A) => (mode === 'flat' ? 4 * Math.PI * nu : mode === 'strain' ? 4 * Math.PI * nu - alpha * A : 4 * Math.PI * nu - kappa * gamma);
const integrate = (mode, nu, t) => { let A = a0; const n = 4000, h = t / n; for (let i = 0; i < n; i++) { const k1 = rhs(mode, nu, A), k2 = rhs(mode, nu, A + h * k1 / 2), k3 = rhs(mode, nu, A + h * k2 / 2), k4 = rhs(mode, nu, A + h * k3); A += h * (k1 + 2 * k2 + 2 * k3 + k4) / 6; } return A; };
let tubeOK = true, tubeBad = '';
for (const [mode, nu, t] of [['flat', 0, 3], ['flat', 0.02, 4], ['strain', 0, 1.8], ['strain', 0, 5], ['strain', 0.02, 2], ['strain', 0.02, 6], ['strain', 0.1, 3], ['self', 0, 1.5], ['self', 0.012, 2], ['self', 0.06, 4]]) {
  const d = await D(([m, v, tt]) => window.VORTEX_DEBUG.tube(m, v, tt), [mode, nu, t]), A = integrate(mode, nu, t);
  if (!(near(d.A, A, 1e-6) && near(d.w * d.A, gamma, 1e-9))) { tubeOK = false; tubeBad = JSON.stringify({ mode, nu, t, page: d.A, mine: A }); break; }
}
check('the cross-section follows dA/dt = 4πν − (stretching) in all three modes (Runge–Kutta here), and ω·A = Γ', tubeOK, tubeBad);
await pick('flat'); s = await seek(5);
check('FLAT-2D: no stretching; the cross-section only widens and the vorticity only falls', s.mode === 'flat' && s.tube.A > a0 && s.tube.w < gamma / a0 && s.tube.len === 1);
await pick('strain'); s = await seek(0); const w0 = s.tube.w; s = await seek(4);
check('STRETCH: at t = 4 the vorticity has grown by e^(αt) and the circulation is still Γ', near(s.tube.w / w0, Math.exp(alpha * 4), 1e-6) && near(s.tube.w * s.tube.A, gamma, 1e-9) && near(s.tube.len, Math.exp(alpha * 4), 1e-6));
await pick('burgers'); s = await seek(6);
check('BURGERS: the cross-section settles at 4πν/α', near(s.floor, 4 * Math.PI * 0.02 / alpha, 1e-12) && Math.abs(s.tube.A - s.floor) < 0.01 && near(integrate('strain', 0.02, 60), s.floor, 1e-6), JSON.stringify([s.tube.A, s.floor]));
await pick('runaway'); s = await state();
const tstar = a0 / (kappa * gamma - 4 * Math.PI * 0.012);
check('RUNAWAY: κΓ > 4πν, so the cross-section reaches zero at t* = A₀/(κΓ − 4πν); the rail stops just before', near(s.tStar, tstar, 1e-9) && s.max < tstar && s.max > 0.97 * tstar && integrate('self', 0.012, tstar) < 1e-6);
s = await seek(s.max); check('near t* the vorticity is more than 50 times its starting value', s.tube.w > 50 * gamma / a0, String(s.tube.w));
await setRange('nu', 0.06); s = await state();
check('with enough viscosity (4πν ≥ κΓ) the self-stretching tube never pinches', s.nu === 0.06 && !Number.isFinite(s.tStar) && 4 * Math.PI * 0.06 >= kappa * gamma && s.max === 6 && /粘性赢了/.test(await page.textContent('#hudSub')), JSON.stringify([s.nu, s.tStar, s.max, await page.textContent('#hudSub')]));
await page.click('#modeChips [data-mode="strain"]'); s = await state();
check('the mode chips switch the kind of stretching and restart the rail', s.mode === 'strain' && s.t === 0);

/* ---------- closure ---------- */
await pick('closed'); s = await seek(1.7);
check('CLOSED: no leak, the seen acceleration does not depend on the unseen y', s.scene === 'closure' && s.closed && near(s.seen[0], s.seen[1], 1e-12) && /存在精确闭合/.test(await page.textContent('#roKeySub')));
let iffOK = true, iffBad = '', incOK = true;
for (const lin of [-1, 0, 1]) for (const self of [-1, 0, 1]) for (const mix of [-1, 0, 1]) {
  await setRange('lin', lin); await setRange('self', self); await setRange('mix', mix);
  // does the seen acceleration depend on x alone? brute force over a grid of states
  const spread = await D(() => { let worst = 0; for (let i = 0; i <= 20; i++) { const x = -1 + i / 10; let lo = 1e9, hi = -1e9; for (let j = 0; j <= 20; j++) { const v = window.VORTEX_DEBUG.seen(x, -1 + j / 10); lo = Math.min(lo, v); hi = Math.max(hi, v); } worst = Math.max(worst, hi - lo); } return worst; });
  const st = await state(), exists = spread < 1e-12, three = lin === 0 && self === 0 && mix === 0;
  if (exists !== three || st.closed !== three) { iffOK = false; iffBad = JSON.stringify({ lin, self, mix, spread }); }
  const y = st.y, x = st.x; if (!near(st.seen[1] - st.seen[0], lin * y - mix * x * y - self * y * y, 1e-12)) incOK = false;
}
check('all 27 settings of the leaks: a closure f(x) exists exactly when the three leaks vanish together', iffOK, iffBad);
check('the gap equals P(L b) − P(B(a, b) + B(b, a)) − P(B(b, b)) in every setting', incOK);
await pick('mixed'); s = await seek(1.7);
check('MIXED-LEAK: only the mixed term is nonzero and the gap is −μ·x·y', near(s.terms.lin, 0) && near(s.terms.self, 0) && near(s.terms.mix, 0.35, 1e-9) && near(s.seen[1] - s.seen[0], -0.35, 1e-9) && /不存在精确闭合/.test(await page.textContent('#roKeySub')));
const p2 = await D(() => window.VORTEX_DEBUG.at(-0.5, -1));
await page.mouse.click(p2[0], p2[1]); s = await state();
check('clicking the closure stage moves the unseen y there', near(s.y, -0.5, 0.03), String(s.y));

/* ---------- rail, keyboard, language ---------- */
await page.click('body', { position: { x: 5, y: 5 } });
for (const [key, sc] of [['1', 'lamb'], ['2', 'tube'], ['3', 'closure']]) { await page.keyboard.press(key); check(`key ${key} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); s = await state();
check('Home and → step the rail', near(s.t, 0.1, 1e-9));
await page.keyboard.press('Space'); await until(() => { const d = window.VORTEX_DEBUG.state; return d.playing && d.t > 0.1; }); s = await state(); check('Space plays', s.playing && s.t > 0.1);
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);
await page.click('#rew'); check('⏮ returns to the start', (await state()).t === 0);
await page.click('[data-lang-set="en"]'); await settle(page, 150);
for (const sc of ['lamb', 'tube', 'closure']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page, 60); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }
check('the open problem is labelled as open and the toy models as models', await D(() => !!document.querySelector('.lean.open[data-scenes="tube"]') && !!document.querySelector('.lean.model[data-scenes="tube"]')));

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
