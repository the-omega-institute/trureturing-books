#!/usr/bin/env node
// Browser regression suite for ORTHO//TRIAD (books/quantum-geometry/viz/entanglement-entropy-complexity/):
//   node books/quantum-geometry/viz/tests/entanglement-entropy-complexity.test.mjs
// Runs stageFirstChecks first, then verifies every mathematical identity (independent 4x4 density-matrix partial trace,
// Pythagorean conservation, Dottie θ* fixed point, Area vs Volume cut bond dimension, Spin(3) quaternion slerp),
// every preset and control, colour/epistemic boundaries, and 390×844 mobile HUD non-overlap in zh & en.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VIZ_DIR = path.resolve(HERE, '../entanglement-entropy-complexity');
const BOOK = 'quantum-geometry', ID = 'entanglement-entropy-complexity';

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- independent mathematical oracle (explicit 4x4 -> 2x2 partial trace) ---------- */
const THETA_STAR = (() => {
  let a = 0, b = 1;
  for (let i = 0; i < 100; i++) {
    const m = 0.5 * (a + b);
    if (Math.cos(m) - m > 0) a = m; else b = m;
  }
  return 0.5 * (a + b);
})();
const THETA_STAR_DEG = (THETA_STAR * 180) / Math.PI;

function oracleTwoQubit(thetaDeg, regime, view) {
  const th = (thetaDeg * Math.PI) / 180;
  // Explicit 4-vector |ψ⟩ = [cos(θ/2), 0, 0, sin(θ/2)] in basis {|00⟩, |01⟩, |10⟩, |11⟩}
  const psi = [Math.cos(th / 2), 0, 0, Math.sin(th / 2)];
  const rho4 = Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (__, c) => psi[r] * psi[c]));
  // Explicit partial trace over qubit B: (ρ_A)_{i,j} = Σ_{b∈{0,1}} ρ_{(i,b),(j,b)}
  const rhoA = [
    [rho4[0][0] + rho4[1][1], rho4[0][2] + rho4[1][3]],
    [rho4[2][0] + rho4[3][1], rho4[2][2] + rho4[3][3]]
  ];
  // Bloch vector r_A = (Tr(ρ_A σ_x), Tr(ρ_A σ_y), Tr(ρ_A σ_z))
  const rx = rhoA[0][1] + rhoA[1][0];
  const ry = 0; // real symmetric ρ_A
  const rz = rhoA[0][0] - rhoA[1][1];
  const rNorm = Math.hypot(rx, ry, rz);
  const rSq = rNorm * rNorm;
  // Purity Tr(ρ_A²)
  const purity = rhoA[0][0] ** 2 + 2 * rhoA[0][1] * rhoA[1][0] + rhoA[1][1] ** 2;
  const sLinear = 2 * (1 - purity);
  // Concurrence for |ψ⟩ = α|00⟩ + δ|11⟩: C = 2|αδ|, τ = C²
  const concurrence = 2 * Math.abs(psi[0] * psi[3]);
  const tangle = concurrence ** 2;
  const eig0 = rhoA[0][0], eig1 = rhoA[1][1];
  const h = (p) => (p <= 1e-15 ? 0 : -p * Math.log2(p));
  const sVn = h(eig0) + h(eig1);
  const kCut = regime === 'area' ? 2 : 8;
  const sCut = kCut * sVn;
  const chi = view === 'local' ? 2 ** sCut : 1;
  const schmidtRank = [eig0, eig1].filter((p) => p > 0).length ** kCut;
  return { rNorm, rSq, purity, sLinear, concurrence, tangle, sVn, kCut, sCut, chi, schmidtRank };
}

/* ---------- static source discipline checks ---------- */
const cssSrc = fs.readFileSync(path.join(VIZ_DIR, 'style.css'), 'utf8');
const jsSrc = fs.readFileSync(path.join(VIZ_DIR, 'main.js'), 'utf8');
const jsCode = jsSrc.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '');
check('style.css and main.js contain zero hardcoded hex colours',
  !/#[0-9a-fA-F]{3,8}\b/.test(cssSrc) && !/#[0-9a-fA-F]{3,8}\b/.test(jsSrc));
check('main.js never uses --warn / P.warn on the partial-trace horizon blade',
  !/\bwarn\b/.test(jsCode));

/* ---------- open page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.TRIAD_DEBUG.state); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 80); return state(); };
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries its viz id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on default PYTHAGORAS card at 3-4-5 right triangle (θ ≈ 53.13°, local Area cut)',
  s.preset === 'pythagoras' && s.regime === 'area' && s.view === 'local' && s.blade === 1
  && Math.abs(s.metrics.thetaDeg - 53.13010235) < 1e-5,
  JSON.stringify({ preset: s.preset, theta: s.metrics.thetaDeg, blade: s.blade }));

/* ---------- Dottie θ* & exact Pythagorean / partial-trace verification ---------- */
const dbgStar = await page.evaluate(() => ({ rad: window.TRIAD_DEBUG.THETA_STAR_RAD, deg: window.TRIAD_DEBUG.THETA_STAR_DEG }));
check('Dottie fixed point cos(θ*) = θ* matches 100-step bisection to 1e-14',
  Math.abs(dbgStar.rad - THETA_STAR) < 1e-14 && Math.abs(Math.cos(dbgStar.rad) - dbgStar.rad) < 1e-15
  && Math.abs(dbgStar.deg - THETA_STAR_DEG) < 1e-12,
  JSON.stringify(dbgStar));

for (const deg of [0, 15, 30, THETA_STAR_DEG, 53.13010235, 60, 75, 90]) {
  const got = await page.evaluate((d) => window.TRIAD_DEBUG.metricsAt(d, 'volume', 'local'), deg);
  const global = await page.evaluate((d) => window.TRIAD_DEBUG.metricsAt(d, 'volume', 'global'), deg);
  const ref = oracleTwoQubit(deg, 'volume', 'local');
  const ok = Math.abs(got.rNorm - ref.rNorm) < 1e-14
    && Math.abs(got.rSq - ref.rSq) < 1e-14
    && Math.abs(got.concurrence - ref.concurrence) < 1e-14
    && Math.abs(got.tangle - ref.tangle) < 1e-14
    && Math.abs(got.sLinear - ref.sLinear) < 1e-14
    && Math.abs(got.sLinear - got.tangle) < 1e-14
    && Math.abs(got.pythSum - 1) < 1e-14
    && Math.abs(got.sVn - ref.sVn) < 1e-13
    && Math.abs(got.chiObserved - ref.chi) < 1e-10;
  check(`θ = ${deg.toFixed(2)}°: explicit 4×4 partial trace matches ‖r_A‖² + τ = 1, S_L ≡ τ, S_vN & χ_bond`, ok, JSON.stringify({ got, ref }));
  check(`θ = ${deg.toFixed(2)}°: χ_eff and exact Schmidt rank describe the same cut in both views`,
    got.schmidtRank === ref.schmidtRank && global.schmidtRank === ref.schmidtRank
    && Math.abs(got.chiFull - ref.chi) < 1e-10 && global.chiFull === got.chiFull
    && global.sCutFull === got.sCutFull && global.rGlobal === 1 && global.chiObserved === 1
    && (deg === 0 || deg === 90 || got.chiFull < got.schmidtRank));
}

/* ---------- Spin(3) quaternion slerp camera verification ---------- */
const qCheck = await page.evaluate(() => {
  const Q = window.TRIAD_DEBUG.quat;
  const q0 = Q.fromCam(0.62, 0.38), q1 = Q.fromCam(-0.41, 0.24);
  const norms = [], dots = [];
  for (const t of [0, 0.25, 0.5, 0.75, 1]) {
    const qt = Q.slerp(q0, q1, t);
    norms.push(Math.hypot(qt[0], qt[1], qt[2], qt[3]));
    dots.push(Math.abs(qt[0] * q0[0] + qt[1] * q0[1] + qt[2] * q0[2] + qt[3] * q0[3]));
  }
  const c0 = Q.toCam(q0), c1 = Q.toCam(Q.slerp(q0, q1, 1));
  return { norms, dots, c0, c1 };
});
check('Spin(3) quaternion slerp preserves unit norm ‖q(t)‖ = 1 and recovers exact camera endpoints',
  qCheck.norms.every((n) => Math.abs(n - 1) < 1e-14)
  && Math.abs(qCheck.c0.yaw - 0.62) < 1e-12 && Math.abs(qCheck.c0.pitch - 0.38) < 1e-12
  && Math.abs(qCheck.c1.yaw - (-0.41)) < 1e-12 && Math.abs(qCheck.c1.pitch - 0.24) < 1e-12
  && qCheck.dots.every((d, i) => i === 0 || d <= qCheck.dots[i - 1] + 1e-12),
  JSON.stringify(qCheck));

/* ---------- all 6 citable presets & controlled contrasts ---------- */
s = await pick('dottie');
const refDottie = oracleTwoQubit(THETA_STAR_DEG, 'area', 'local');
check('DOTTIE card lands on θ* ≈ 42.35° with ‖r_A‖² ≈ 0.5462, τ ≈ 0.4538, and S_vN rounded to 0.559 bits',
  s.preset === 'dottie' && Math.abs(s.metrics.thetaDeg - THETA_STAR_DEG) < 1e-6
  && Math.abs(s.metrics.rSq - refDottie.rSq) < 1e-14 && Math.abs(s.metrics.rSq - 0.546247) < 1e-5
  && Math.abs(s.metrics.tangle - refDottie.tangle) < 1e-14 && Math.abs(s.metrics.tangle - 0.453753) < 1e-5
  && Math.abs(s.metrics.sVn - refDottie.sVn) < 1e-13 && Math.abs(s.metrics.sVn - 0.558691) < 1e-5
  && (await text('#ro3')) === '0.559 bits' && (await text('#hudSub')).includes('0.559 bits'),
  `${await text('#ro3')} | ${await text('#hudSub')}`);

const sArea = await pick('arealaw');
const sVol = await pick('volumelaw');
check('AREA-LAW vs VOLUME-LAW at fixed θ = 60°: S_cut quadruples (1.623 → 6.490 bits) and χ_bond jumps (3.08 → 90.0)',
  Math.abs(sArea.metrics.thetaDeg - 60) < 1e-6 && Math.abs(sVol.metrics.thetaDeg - 60) < 1e-6
  && sArea.metrics.kCut === 2 && sVol.metrics.kCut === 8
  && Math.abs(sVol.metrics.sCutFull - 4 * sArea.metrics.sCutFull) < 1e-12
  && Math.abs(sArea.metrics.chiObserved - 3.08) < 0.02
  && Math.abs(sVol.metrics.chiObserved - 90.0) < 0.2,
  JSON.stringify({ area: sArea.metrics.chiObserved, vol: sVol.metrics.chiObserved }));

const sBellCut = await pick('bellcut');
const sGlobal = await pick('globaljoint');
check('BELL-CUT vs GLOBAL-JOINT at θ = 90°: lowering blade gives r_A = 0, S_cut = 8 bits, χ = 256; lifting blade gives S_global = 0, χ = 1',
  sBellCut.view === 'local' && sBellCut.blade === 1
  && sBellCut.metrics.rNorm < 1e-14 && Math.abs(sBellCut.metrics.sCutFull - 8) < 1e-12 && Math.abs(sBellCut.metrics.chiObserved - 256) < 1e-10
  && sGlobal.view === 'global' && sGlobal.blade === 0
  && Math.abs(sGlobal.metrics.sObserved - 0) < 1e-14 && sGlobal.metrics.chiObserved === 1,
  JSON.stringify({ cut: sBellCut.metrics, global: sGlobal.metrics }));

/* ---------- controls, chips, plot scrub, keyboard shortcuts & leave() ---------- */
await page.click('#angleChips [data-angle="0"]'); s = await state();
check('0° quick chip sets separable product state (‖r_A‖² = 1, τ = 0, S_vN = 0, χ = 1) and clears active card',
  s.metrics.thetaDeg === 0 && Math.abs(s.metrics.rSq - 1) < 1e-14 && s.metrics.tangle === 0 && s.metrics.chiObserved === 1
  && !(await page.$('[data-preset][aria-pressed="true"]')));

await page.click('#angleChips [data-angle="dottie"]'); s = await state();
check('θ* quick chip jumps to Dottie angle', Math.abs(s.metrics.thetaDeg - THETA_STAR_DEG) < 1e-6);

await page.click('#viewChips [data-view="local"]'); s = await state();
check('view chip lowers partial-trace horizon blade (blade = 1)', s.view === 'local' && s.blade === 1);

await page.click('#regimeChips [data-regime="area"]'); s = await state();
check('regime chip switches to Area Law (k_cut = 2)', s.regime === 'area' && s.metrics.kCut === 2);

await page.click('#camChips [data-cam="top"]'); s = await state();
check('camera chip rotates via quaternion slerp to Top web pitch ≈ 1.18', Math.abs(s.cam.pitch - 1.18) < 1e-3);

// Scrub #plot directly at 50% width → θ ≈ 45°
const plotBox = await page.$eval('#plot', (el) => {
  const r = el.getBoundingClientRect();
  return { x: r.left + 36 + 0.5 * (r.width - 50), y: r.top + r.height * 0.5 };
});
await page.mouse.click(plotBox.x, plotBox.y); s = await state();
check('clicking #plot scrubs θ directly to ~45° (‖r_A‖² ≈ 0.5, τ ≈ 0.5)',
  Math.abs(s.metrics.thetaDeg - 45) < 1.5 && Math.abs(s.metrics.rSq - 0.5) < 0.03,
  `${s.metrics.thetaDeg}`);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('v'); s = await state();
check('key V toggles partial-trace horizon blade to global view', s.view === 'global' && s.blade === 0);
await page.keyboard.press('t'); s = await state();
check('key T toggles topology to Volume Law', s.regime === 'volume' && s.metrics.kCut === 8);
await page.keyboard.press('d'); s = await state();
check('key D jumps to θ* ≈ 42.35°', Math.abs(s.metrics.thetaDeg - THETA_STAR_DEG) < 1e-6);
await page.keyboard.press('ArrowRight'); s = await state();
check('→ increments θ by 1.5°', Math.abs(s.metrics.thetaDeg - (THETA_STAR_DEG + 1.5)) < 1e-5);
await page.click('#rew'); s = await state();
check('⏮ rewinds θ to 0°', s.metrics.thetaDeg === 0);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space starts θ sweep playback', await until(page, () => window.TRIAD_DEBUG.state.metrics.thetaDeg > 0.2));
await page.keyboard.press('Space'); await settle(page);

// Drawer open / Escape close
await page.click('#infoBtn');
check('DATA SHARD button opens theory drawer', !(await page.$eval('#drawer', (el) => el.hidden)));
await page.keyboard.press('Escape');
check('Escape closes theory drawer', await page.$eval('#drawer', (el) => el.hidden));

/* ---------- TRV_THUMB stroke scale lw = 2.0 ---------- */
await page.evaluate(() => window.TRV_THUMB());
s = await state();
check('TRV_THUMB sets balanced θ* Volume-Law cover with lw = 2.0',
  s.cam.lw === 2.0 && s.regime === 'volume' && s.view === 'local' && Math.abs(s.metrics.thetaDeg - THETA_STAR_DEG) < 1e-6,
  JSON.stringify(s.cam));
await page.evaluate(() => { window.location.reload(); });
await page.waitForLoadState('load');
await settle(page, 300);

/* ---------- 390×844 mobile HUD non-overlap & Greek θ preservation across all 6 presets (zh & en) ---------- */
await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
const PRESET_IDS = ['pythagoras', 'dottie', 'arealaw', 'volumelaw', 'bellcut', 'globaljoint'];
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 50);
  check(`readout (${lang}): χ_eff is labelled effective and χ_exact is rank(ρ_A)`,
    /有效键维|effective bond dim/.test(await text('#roL5')) && (await text('#roL5')).includes('χ_eff')
    && (await text('#ro5')).includes('χ_exact = rank(ρ_A)'));
  const hudOverlaps = [], stageTourOverlaps = [], uppercaseTheta = [];
  for (const pid of PRESET_IDS) {
    await pick(pid);
    const info = await page.evaluate(() => {
      const a = document.querySelector('.hud-tl').getBoundingClientRect();
      const b = document.querySelector('.hud-tr').getBoundingClientRect();
      const st = document.getElementById('stage').getBoundingClientRect();
      const tr = document.getElementById('tour').getBoundingClientRect();
      const sep = a.right + 4 <= b.left || b.right + 4 <= a.left || a.bottom + 4 <= b.top || b.bottom + 4 <= a.top;
      return {
        overlap: sep ? null : { tl: [a.left, a.top, a.right, a.bottom], tr: [b.left, b.top, b.right, b.bottom] },
        tourOverlap: st.bottom <= tr.top + 1 ? null : { stageBottom: st.bottom, tourTop: tr.top },
        hudBig: document.getElementById('hudBig').textContent
      };
    });
    if (info.overlap) hudOverlaps.push(`${pid}:${JSON.stringify(info.overlap)}`);
    if (info.tourOverlap) stageTourOverlaps.push(`${pid}:${JSON.stringify(info.tourOverlap)}`);
    if (info.hudBig.includes('Θ')) uppercaseTheta.push(`${pid}:${info.hudBig}`);
  }
  check(`390×844 (${lang}): .hud-tl and .hud-tr never overlap across all 6 presets`, hudOverlaps.length === 0, hudOverlaps.join(' | '));
  check(`390×844 (${lang}): #stage never overlaps #tour across all 6 presets`, stageTourOverlaps.length === 0, stageTourOverlaps.join(' | '));
  check(`390×844 (${lang}): #hudBig preserves lowercase Greek θ / θ* (zero uppercase Θ)`, uppercaseTheta.length === 0, uppercaseTheta.join(' | '));
}

await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 120);
check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
