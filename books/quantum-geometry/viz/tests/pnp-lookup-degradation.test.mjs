#!/usr/bin/env node
// Browser regression suite for ORTHO//LOOKUP (books/quantum-geometry/viz/pnp-lookup-degradation/):
//   node books/quantum-geometry/viz/tests/pnp-lookup-degradation.test.mjs
// Runs stageFirstChecks first, then verifies all 6 presets, all 7 degradation stages (d = 0..6),
// exact spacetime–gravity trade-off curves, the Bekenstein–Hawking (σ* = 2/3, r_min = 1/3) floor,
// Grover (σ = 0, r = 0.500) ↔ Stage-3 wire-delay (σ = 1, r = 0.500) duality, exact canonical Zeckendorf
// lower-support carry barrier (m − 2), palette discipline (zero #rrggbb), interactive controls, and mobile HUD.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'pnp-lookup-degradation';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const VIZ_DIR = path.resolve(HERE, '..', ID);

const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID);

/* ---------- static source audit: zero hardcoded hex literals ---------- */
const cssSrc = fs.readFileSync(path.join(VIZ_DIR, 'style.css'), 'utf8');
const jsSrc = fs.readFileSync(path.join(VIZ_DIR, 'main.js'), 'utf8');
check('style.css contains zero #rrggbb hex colour literals', !/#[0-9a-fA-F]{3,8}\b/.test(cssSrc));
check('main.js contains zero #rrggbb hex colour literals and never touches P.ok / P.warn on canvas',
  !/#[0-9a-fA-F]{3,8}\b/.test(jsSrc) && !/\bP\.(ok|warn)\b/.test(jsSrc));

/* ---------- independent mathematical reference ---------- */
const R_PPSZ = Math.log2(1.307);
const R_QBT = R_PPSZ / 2;
const rel = (a, b) => Math.abs(a - b) / Math.max(Math.abs(b), 1e-15);

const refFib = [0, 1];
for (let i = 2; i <= 24; i++) refFib.push(refFib[i - 1] + refFib[i - 2]);
function refWdigits(n) {
  let rem = n;
  const out = [];
  for (let k = refFib.length - 1; k >= 2 && rem > 0; k--) {
    if (refFib[k] <= rem) { out.push(k); rem -= refFib[k]; k--; }
  }
  return out;
}

/* ---------- open page ---------- */
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page, 300);

const state = async () => { await settle(page); return page.evaluate(() => window.LOOKUP_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.LOOKUP_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page, 60); };
const setRange = async (id, v) => {
  await page.evaluate(([i, val]) => {
    const el = document.getElementById(i);
    el.value = String(val);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }, [id, v]);
  await settle(page);
};
const stopped = (to) => until(page, (t) => {
  const s = window.LOOKUP_DEBUG.state;
  return !s.playing && Math.abs(s.t - t) < 1e-6;
}, to, 300000);
const text = async (sel) => (await page.textContent(sel)).trim();

let s = await state();
check('page carries its viz id', (await page.evaluate(() => document.body.dataset.vizId)) === ID);
check('opens on default BEKENSTEIN card at exact holographic optimum (d=3, σ=2/3, r_eff=1/3, stopped)',
  s.preset === 'bekenstein' && s.scene === 'duo' && s.d === 3 && !s.sweep && !s.playing
  && Math.abs(s.effSigma - 2 / 3) < 1e-12 && Math.abs(s.rEff - 1 / 3) < 1e-12,
  JSON.stringify({ preset: s.preset, d: s.d, effSigma: s.effSigma, rEff: s.rEff, playing: s.playing }));

for (const lang of ['zh', 'en']) {
  const note = await page.locator(`.note .${lang}`).allTextContents();
  check(`holographic note (${lang}): bit capacity includes ln 2 and limits the envelope to a MODEL`,
    note.some((t) => t.includes('S ≲ A/(4ℓ_P² ln 2)') && /比特|bits/.test(t)
      && t.includes('MODEL') && /不是无条件|not an unconditional/.test(t)));
}

/* ---------- exact holographic trade-off curves & Grover-wire duality ---------- */
const curveCheck = await page.evaluate(() => {
  const D = window.LOOKUP_DEBUG;
  const grid = [0, 0.2, 0.5, 2 / 3, 0.8, 1];
  return grid.map((sig) => ({
    sig,
    ramBB: D.rRamCurve(sig, 'blackbox'),
    wire: D.rWireCurve(sig),
    serBB: D.rSerialCurve(sig, 'blackbox'),
    pipeBB: D.rPipeCurve(sig, 'blackbox'),
    qBB: D.rQuantumCurve(sig, 'blackbox'),
    ramSat: D.rRamCurve(sig, 'sat3'),
    qSat: D.rQuantumCurve(sig, 'sat3')
  }));
});
check('classical RAM 1−σ, relativistic serial 1−σ/2, pipelined max(1−σ, σ/2), and quantum (1−σ)/2 match exact formulas',
  curveCheck.every((c) =>
    Math.abs(c.ramBB - (1 - c.sig)) < 1e-12
    && Math.abs(c.wire - c.sig / 2) < 1e-12
    && Math.abs(c.serBB - (1 - c.sig / 2)) < 1e-12
    && Math.abs(c.pipeBB - Math.max(1 - c.sig, c.sig / 2)) < 1e-12
    && Math.abs(c.qBB - (1 - c.sig) / 2) < 1e-12
    && rel(c.ramSat, R_PPSZ * (1 - c.sig)) < 1e-12
    && rel(c.qSat, R_QBT * (1 - c.sig)) < 1e-12));

check('Bekenstein–Hawking pipelined minimum hits r_min = 1/3 at σ* = 2/3, and Grover r(0) = 0.500 equals Stage-3 wire r(1) = 0.500',
  Math.abs(s.holoOptimum.sigma - 2 / 3) < 1e-12
  && Math.abs(s.holoOptimum.r - 1 / 3) < 1e-12
  && s.groverAtZero === 0.5
  && s.wireAtOne === 0.5
  && rel(s.ppszRate, R_PPSZ) < 1e-12
  && rel(s.qbtRate, R_QBT) < 1e-12);

/* ---------- exact Zeckendorf lower_support_carry_barrier & 5-step Frougny carry ---------- */
check('Zeckendorf demo 1584 + F₈(21) = 1605 normalizes to canonical [17, 6] saturating m − 2 = 6 across all 6 step states',
  s.zeckDemo.sumP === 1584
  && s.zeckDemo.addF === 21
  && s.zeckDemo.total === 1605
  && JSON.stringify(s.zeckDemo.canonical) === JSON.stringify(refWdigits(1605))
  && JSON.stringify(s.zeckDemo.canonical) === JSON.stringify([17, 6])
  && s.zeckDemo.steps.every((st) => {
    const val = st.multiset.reduce((a, k) => a + refFib[k], 0);
    return val === 1605 && Math.min(...st.multiset) >= 6;
  })
  && s.zeckDemo.barrierCases.every((c) => c.ok));

/* ---------- all 6 citable experiment cards ---------- */
// 1. ORACLE card (also verify auto-stop under VIZ_SLOW_FRAMES=1000)
await pick('oracle');
check('STAGE-0 ORACLE card plays and auto-stops at τ = 5.5', await stopped(5.5));
s = await state();
check('ORACLE card locks d=0, effSigma=0, r_eff=0.0000',
  s.d === 0 && s.effSigma === 0 && s.rEff === 0 && (await text('#roKey')) === '0.0000');

// 2. FROUGNY card
await pick('frougny');
s = await seek(5.0);
check('STAGE-2 ZECKENDORF card sets d=2, sat3 regime, and canonical [17, 6] readout',
  s.d === 2 && s.regime === 'sat3' && (await text('#ro5')).includes('wdigits(1605) = [17, 6]'));

// 3. GROVER card
await pick('grover');
s = await seek(4.0);
check('STAGE-4 GROVER-KSdW card sets d=4, σ=0, r_eff=0.5000 and displays wire duality',
  s.d === 4 && s.effSigma === 0 && Math.abs(s.rEff - 0.5) < 1e-12
  && (await text('#roKey')) === '0.5000' && (await text('#ro5')).includes('0.500 = r_wire'));

// 4. LANDAUER card
await pick('landauer');
s = await seek(4.2);
check('STAGE-5 LANDAUER card sets d=5, σ=0.12, r_eff=0.8800 and displays Landauer balance',
  s.d === 5 && Math.abs(s.effSigma - 0.12) < 1e-12 && Math.abs(s.rEff - 0.88) < 1e-12
  && (await text('#roKey')) === '0.8800' && (await text('#ro5')).includes('Landauer'));

// 5. LADDER card (sweeps d = 0 -> 6 along rail)
await pick('ladder');
const sLad0 = await seek(0);
const sLad3 = await seek(3);
const sLad6 = await seek(6);
check('STAGES 0→6 LADDER card sweeps d=0 (r=0) -> d=3 (r=1/3) -> d=6 (r=1) along rail',
  sLad0.sweep && sLad0.d === 0 && sLad0.rEff === 0
  && sLad3.d === 3 && Math.abs(sLad3.rEff - 1 / 3) < 1e-12
  && sLad6.d === 6 && sLad6.rEff === 1);

// 6. BEKENSTEIN card
await pick('bekenstein');
check('clicking BEKENSTEIN arms stopAt = 5 while playing', (await state()).stopAt === 5);
await setRange('sigma', 0.4);
s = await state();
check('editing #sigma slider clears stopAt, leaves card, and updates r_eff = max(0.6, 0.2) = 0.6',
  s.stopAt === null && s.preset === null && s.d === 3 && Math.abs(s.effSigma - 0.4) < 1e-12 && Math.abs(s.rEff - 0.6) < 1e-12);

/* ---------- stage chips d=1 & d=6, wire chips, regime chips, pointer drag & keyboard ---------- */
await page.click('#stageChips [data-d="1"]');
s = await state();
check('stage chip d=1 shows zero in-domain loss and non-anticipating failure readout',
  s.d === 1 && !s.sweep && (await text('#ro5')).includes('NonAnticipating'));

await page.click('#stageChips [data-d="6"]');
s = await state();
check('stage chip d=6 locks memoryless σ_eff=0 and r_eff=1.0000',
  s.d === 6 && s.effSigma === 0 && s.rEff === 1 && (await text('#roKey')) === '1.0000');

await page.click('#stageChips [data-d="3"]');
await page.click('#wireChips [data-wire="serial"]');
s = await state();
check('serial wire mode at d=3, σ=2/3 gives r_serial = 1 − (2/3)/2 = 2/3 ≈ 0.6667',
  s.wire === 'serial' && Math.abs(s.rEff - 2 / 3) < 1e-12);
await page.click('#wireChips [data-wire="pipelined"]');

const p80 = await page.evaluate(() => window.LOOKUP_DEBUG.phasePointPx(0.8));
await page.mouse.move(p80[0], p80[1]); await page.mouse.down(); await page.mouse.up();
s = await state();
check('dragging inside the phase diagram moves σ to ~0.80 (r_pipe = max(0.2, 0.4) = 0.40)',
  Math.abs(s.effSigma - 0.8) <= 0.02 && Math.abs(s.rEff - Math.max(1 - s.effSigma, s.effSigma / 2)) < 1e-12,
  `effSigma=${s.effSigma}, rEff=${s.rEff}`);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('2'); s = await state(); check('key 2 switches to Routing scene', s.scene === 'morph');
await page.keyboard.press('3'); s = await state(); check('key 3 switches to Phase scene', s.scene === 'phase');
await page.keyboard.press('1'); s = await state(); check('key 1 switches to Twin scene', s.scene === 'duo');
await page.keyboard.press('r'); s = await state(); check('key R toggles regime to sat3', s.regime === 'sat3');
await page.keyboard.press('r'); s = await state(); check('key R toggles regime back to blackbox', s.regime === 'blackbox');
await page.keyboard.press('d'); s = await state(); check('key D cycles degradation stage (3 -> 4)', s.d === 4);

await seek(2.0);
await page.keyboard.press('ArrowRight'); s = await state(); check('→ advances the rail by 0.5', Math.abs(s.t - 2.5) < 1e-9);
await page.keyboard.press('ArrowLeft'); s = await state(); check('← steps the rail back by 0.5', Math.abs(s.t - 2.0) < 1e-9);
await page.click('#rew'); s = await state(); check('⏮ rewinds to 0 and pauses', s.t === 0 && !s.playing);

await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('Space');
check('Space starts playback', await until(page, () => { const d = window.LOOKUP_DEBUG.state; return d.playing && d.t > 0.05; }));
await page.keyboard.press('Space'); await settle(page);
check('Space pauses playback', !(await state()).playing);

/* ---------- responsive 390x844 mobile stacking & HUD non-overlap across all 6 presets (zh & en) ---------- */
await page.setViewportSize({ width: 390, height: 844 }); await settle(page, 120);
s = await state();
check('Twin scene stacks panels top/bottom cleanly on 390px phone', s.stacked === true);
const ALL_PRESETS = [['oracle', 5.0], ['frougny', 5.0], ['bekenstein', 4.2], ['grover', 4.0], ['landauer', 4.2], ['ladder', 6.0]];
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page, 40);
  const overlaps = [];
  for (const [pid, st] of ALL_PRESETS) {
    await pick(pid); await seek(st);
    const hit = await page.evaluate(() => {
      const a = document.querySelector('.hud-tl').getBoundingClientRect();
      const b = document.querySelector('.hud-tr').getBoundingClientRect();
      const sep = a.right + 4 <= b.left || b.right + 4 <= a.left || a.bottom + 4 <= b.top || b.bottom + 4 <= a.top;
      return sep ? null : { tl: [a.left, a.top, a.right, a.bottom], tr: [b.left, b.top, b.right, b.bottom] };
    });
    if (hit) overlaps.push(`${pid}:${JSON.stringify(hit)}`);
  }
  check(`390×844 (${lang}): .hud-tl and .hud-tr never overlap across all 6 presets`, overlaps.length === 0, overlaps.join(' | '));
}

await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 120);
await page.click('[data-lang-set="en"]');
await pick('bekenstein'); await seek(4.2);
const enHud = await text('#hudBig');
check('English HUD preserves lowercase Greek σ in S = 2^{σn} (zero uppercase Σ)',
  enHud.includes('σ') && !enHud.includes('Σ'), enHud);
await page.click('[data-lang-set="zh"]');

/* ---------- cited cards in a narrow column (334 × 500, as on a phone page) ---------- */
// The routing picture and the phase diagram stand side by side, each the full height of the band between the title
// block and the legend as laid out; stacked, each was left a strip of a few dozen pixels.
for (const lang of ['zh', 'en']) {
  const bad = [];
  for (const [pid, st] of ALL_PRESETS) {
    const fig = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${pid}`, { viewport: { width: 334, height: 500 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US' });
    await settle(fig, 200);
    await fig.evaluate((t) => window.LOOKUP_DEBUG.seek(t), st); await settle(fig, 120);
    const r = await fig.evaluate(() => {
      const cv = document.getElementById('cv').getBoundingClientRect(), lg = document.getElementById('legend').getBoundingClientRect();
      const hud = Math.max(document.querySelector('.hud-tl').getBoundingClientRect().bottom, document.getElementById('sceneChips').getBoundingClientRect().bottom) - cv.top;
      return { L: window.LOOKUP_DEBUG.state.layout, hud, legend: lg.top - cv.top };
    });
    const ps = r.L ? r.L.panels : [];
    if (!(r.L && r.L.side && ps.length === 2 && ps.every((q) => q.y >= r.hud && q.y + q.h <= r.legend && q.h >= 70) && ps[0].x + ps[0].w <= ps[1].x)) bad.push(`${pid}: ${JSON.stringify(r)}`);
    await fig.context().close();
  }
  check(`cited cards at 334 × 500 (${lang}): routing and phase panels side by side, each at least 70 px high, between the title block and the legend`, bad.length === 0, bad.join(' | '));
}

check('no page error, console error or failed request', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
