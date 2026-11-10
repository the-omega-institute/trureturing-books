#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/qubit-geometry (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/qubit-geometry.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// Reads page state through the read-only window.QG_DEBUG probe and verifies every geometric and information-theoretic
// quantity against an independent implementation written here.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'qubit-geometry';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));

/* ---------- independent mathematical implementation ---------- */
// Built from explicit 2×2 density matrices instead of Bloch vectors:
//   ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)|, |ψ⟩ = (cos(θ/2), e^{iφ} sin(θ/2));  ρ(η) = E_η(ρ₀) = (1−η)ρ₀ + ηΠ(ρ₀).
const DEG = Math.PI / 180;
const xlogx = (x) => (x > 1e-300 ? x * Math.log(x) : 0);
function h2Nats(p) {
  if (p <= 1e-15 || p >= 1 - 1e-15) return 0;
  return -(p * Math.log(p) + (1 - p) * Math.log(1 - p));
}
function independentModel(theta, phi, alpha, eta) {
  const th = theta * DEG, ph = phi * DEG, al = alpha * DEG;
  const dot = Math.cos(th), wedge = Math.sin(th);
  const a = Math.cos(th / 2), b = Math.sin(th / 2);
  // ρ₀ entries: ρ₀₀ = a², ρ₁₁ = b², ρ₀₁ = ab e^{−iφ}, ρ₁₀ = ab e^{iφ}
  const pure = { d0: a * a, d1: b * b, re: a * b * Math.cos(ph), im: -a * b * Math.sin(ph) };
  // E_η keeps the diagonal and multiplies the off-diagonal entries by (1 − η)
  const cur = { d0: pure.d0, d1: pure.d1, re: (1 - eta) * pure.re, im: (1 - eta) * pure.im };
  const off2 = (m) => 2 * (m.re * m.re + m.im * m.im);            // |ρ₀₁|² + |ρ₁₀|²
  const hsDiag = pure.d0 ** 2 + pure.d1 ** 2;                       // ⟨Π(ρ₀),Π(ρ₀)⟩
  const hsOffPure = off2(pure), hsOffActive = off2(cur);
  const trSq = cur.d0 ** 2 + cur.d1 ** 2 + off2(cur);               // Tr ρ(η)² = ⟨ρ(η),ρ(η)⟩
  // eigenvalues of ρ(η) and the relative entropy D(ρ(η) ‖ Π(ρ₀)) = Tr ρ ln ρ − Tr ρ ln Π(ρ₀)
  const disc = Math.sqrt((cur.d0 - cur.d1) ** 2 + 2 * off2(cur));
  const lam = [(1 + disc) / 2, (1 - disc) / 2];
  const trRhoLnRho = xlogx(lam[0]) + xlogx(lam[1]);
  const lnSafe = (x) => (x > 1e-300 ? Math.log(x) : 0);
  const trRhoLnPi = cur.d0 * lnSafe(pure.d0) + cur.d1 * lnSafe(pure.d1);
  const relEntropy = Math.max(0, trRhoLnRho - trRhoLnPi);
  const V = Math.abs(Math.cos(al)), D = Math.sqrt(Math.max(0, 1 - V * V));
  const entropyPinchNats = -(xlogx(pure.d0) + xlogx(pure.d1));
  return {
    p0: pure.d0, p1: pure.d1, dot, wedge, pythAB: dot * dot + wedge * wedge,
    V, D, pythDV: D * D + V * V,
    hsDiag, hsOffPure, hsOffActive, hsTotalActive: trSq,
    entropyPinchNats, entropyPinchBits: entropyPinchNats / Math.LN2,
    entropyCurrentNats: -trRhoLnRho, entropyRemainingNats: relEntropy,
    blochDecohered: [2 * cur.re, -2 * cur.im, cur.d0 - cur.d1]
  };
}
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

/* ---------- open ---------- */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
const D = (fn, arg) => page.evaluate(fn, arg);
const settle = async () => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(() => !QG_DEBUG.pending(), null, { timeout: 30000 });
};
const text = (sel) => D((s) => document.querySelector(s).textContent, sel);
const open = async (query) => {
  await T.goto(BOOK, ID, query);
  await page.waitForFunction(() => window.QG_DEBUG && QG_DEBUG.frames() > 0, null, { timeout: 30000 });
};

await open('?lang=zh');
let st = await D(() => QG_DEBUG.state());
check('opens on balanced state (60°, 36°, 30°, 0) with empty gate tape', st.theta === 60 && st.phi === 36 && st.alpha === 30 && st.eta === 0 && st.gates.length === 0, JSON.stringify(st));
check('page carries its id and runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');

/* ---------- static bilingual parity of index.html ---------- */
const html = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'index.html'), 'utf8');
const count = (re) => (html.match(re) || []).length;
check('index.html has equally many <span class="zh"> and <span class="en">', count(/<span class="zh">/g) === count(/<span class="en">/g) && count(/<span class="zh">/g) > 30,
  `${count(/<span class="zh">/g)} vs ${count(/<span class="en">/g)}`);
check('index.html has equally many class="zh" and class="en" blocks', count(/class="zh"/g) === count(/class="en"/g));

/* ---------- A01: explicit circuit order |ψ⟩ → U(α) → ρ₀(θ,φ) → E_η → ρ(η) ---------- */
const PIPELINE = '|ψ⟩ → U(α) → ρ₀(θ,φ) → E_η → ρ(η)';
const langText = (sel, lang) => D(([s, l]) => document.querySelector(`${s} .${l}`).textContent.trim(), [sel, lang]);
const ordered = (t, parts) => parts.every((p, i) => t.indexOf(p) >= 0 && (i === 0 || t.indexOf(p) > t.indexOf(parts[i - 1])));
check('A01: the page exposes the canonical pipeline string', (await D(() => QG_DEBUG.pipeline())) === PIPELINE);
check('A01: gates subhead names circuit step 2 and U(α) = exp(−iα n̂·σ/2) in both languages',
  (await langText('#gatesHead', 'zh')).includes('线路第 2 步') && (await langText('#gatesHead', 'zh')).includes('U(α) = exp(−iα n̂·σ/2)')
  && (await langText('#gatesHead', 'en')).includes('Circuit step 2') && (await langText('#gatesHead', 'en')).includes('U(α) = exp(−iα n̂·σ/2)'));
check('A01: tape label reads 线路顺序 / Circuit order', (await langText('#tapeLbl', 'zh')) === '线路顺序' && (await langText('#tapeLbl', 'en')) === 'Circuit order');
let tape = await text('#gateTape');
check('A01: the tape shows the full circuit with U(α) = I before any gate', tape === '|ψ⟩ → U(α) = I → ρ₀(60°, 36°) → E_η (η = 0.00) → ρ(η)', tape);
check('A01: the tape lists |ψ⟩, U(α), ρ₀, E_η, ρ(η) in circuit order', ordered(tape, ['|ψ⟩', 'U(α)', 'ρ₀(', 'E_η', 'ρ(η)']), tape);
let note = await text('#roNote');
check('A01: the readout note states the pipeline and its four steps in order (zh)', note.includes(PIPELINE)
  && ordered(note, ['① 态制备 |ψ⟩', '② 旋子门 U(α) = exp(−iα n̂·σ/2)', '③ 门后纯态 ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)|', '④ 固定 z 轴退相干信道 E_η', 'ρ(η) = E_η(ρ₀)'])
  && note.includes('α = 30° 只驱动互补圆'), note);
check('A01: the theory drawer states the pipeline in both languages',
  (await text('#drawer div.zh')).includes(PIPELINE) && (await text('#drawer div.en')).includes(PIPELINE)
  && /线路顺序：/.test(await text('#drawer div.zh')) && /Circuit order:/.test(await text('#drawer div.en')));

/* ---------- Q04: every HS and entropy formula names its state ---------- */
const DT_HS_ZH = '当前态希尔伯特—施密特分解 ⟨ρ(η),ρ(η)⟩ = ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)';
const DT_HS_EN = 'Current-state Hilbert–Schmidt split ⟨ρ(η),ρ(η)⟩ = ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)';
const DT_S_ZH = '当前态剩余相对熵相干 D(ρ(η) ‖ Π(ρ₀)) = S(Π(ρ₀)) − S(ρ(η))';
const DT_S_EN = 'Current-state remaining coherence D(ρ(η) ‖ Π(ρ₀)) = S(Π(ρ₀)) − S(ρ(η))';
const dtText = (ddId, lang) => D(([id, l]) => document.getElementById(id).parentElement.querySelector(`dt .${l}`).textContent, [ddId, lang]);
check('Q04: #roHS label names ρ(η), Π(ρ₀) and ρ₀₁(η) in both languages', (await dtText('roHS', 'zh')) === DT_HS_ZH && (await dtText('roHS', 'en')) === DT_HS_EN);
check('Q04: #roEntropy label names D(ρ(η) ‖ Π(ρ₀)) = S(Π(ρ₀)) − S(ρ(η)) in both languages', (await dtText('roEntropy', 'zh')) === DT_S_ZH && (await dtText('roEntropy', 'en')) === DT_S_EN);
check('Q04: no readout label keeps a bare ⟨ρ,ρ⟩, Π(ρ) or ΔS without a state argument', await D(() => [...document.querySelectorAll('#readouts dt')].every((dt) => !/⟨ρ,ρ⟩|Π\(ρ\)|ΔS =|\|ρ₀₁\|/.test(dt.textContent))));

/* ---------- ARCH-R2-002: semantic color discipline (#46ffb2 only on standard .ok LEAN ✓ badges, #ffc83d only on single active selection) ---------- */
const colorAudit = await D(() => {
  const OK_RGB = 'rgb(70, 255, 178)';
  const AMBER_RGB = 'rgb(255, 200, 61)';
  const CYAN_RGB = 'rgb(25, 240, 255)';
  const VIOLET_RGB = 'rgb(157, 140, 255)';
  const okEls = [];
  const amberEls = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    if (cs.color === OK_RGB || cs.backgroundColor === OK_RGB) {
      okEls.push({ tag: el.tagName, id: el.id, cls: el.className, isLeanBadge: el.classList.contains('ok') && el.textContent.trim() === 'LEAN ✓' });
    }
    if (cs.color === AMBER_RGB || cs.backgroundColor === AMBER_RGB) {
      const isSingleActiveSelection = el.id === 'pillAngles' || el.parentElement?.id === 'pillAngles' || el.classList.contains('am');
      amberEls.push({ tag: el.tagName, id: el.id, cls: el.className, isSingleActiveSelection });
    }
  }
  const okmarkColors = [...document.querySelectorAll('.okmark')].map((el) => getComputedStyle(el).color);
  const tapeColor = getComputedStyle(document.getElementById('gateTape')).color;
  const roDColor = getComputedStyle(document.querySelector('#roD .vvi')).color;
  const roEntColor = getComputedStyle(document.querySelector('#roEntropy .vcy')).color;
  return {
    okCount: okEls.length,
    okOnlyLeanBadges: okEls.length >= 4 && okEls.every((e) => e.isLeanBadge),
    okEls,
    amberCount: amberEls.length,
    amberOnlyActiveSelection: amberEls.length >= 2 && amberEls.every((e) => e.isSingleActiveSelection),
    amberEls,
    okmarksAreCyan: okmarkColors.length >= 4 && okmarkColors.every((c) => c === CYAN_RGB),
    tapeIsCyan: tapeColor === CYAN_RGB,
    roDIsViolet: roDColor === VIOLET_RGB,
    roEntIsCyan: roEntColor === CYAN_RGB
  };
});
check('ARCH-R2-002: #46ffb2 / rgb(70, 255, 178) is used ONLY on standard .ok LEAN ✓ badges', colorAudit.okOnlyLeanBadges, JSON.stringify(colorAudit.okEls));
check('ARCH-R2-002: #ffc83d / rgb(255, 200, 61) is used ONLY on the single active (θ, φ) state selection', colorAudit.amberOnlyActiveSelection, JSON.stringify(colorAudit.amberEls));
check('ARCH-R2-002: .okmark checkmarks, #gateTape, #roD, and #roEntropy use cyan/violet (not ok-green or amber)',
  colorAudit.okmarksAreCyan && colorAudit.tapeIsCyan && colorAudit.roDIsViolet && colorAudit.roEntIsCyan, JSON.stringify(colorAudit));

/* ---------- presets & independent mathematical verification ---------- */
const presets = [
  ['0,0,0,0', [0, 0, 0, 0]],
  ['90,0,0,0', [90, 0, 0, 0]],
  ['60,36,30,0', [60, 36, 30, 0]],
  ['90,0,90,1', [90, 0, 90, 1]]
];
for (const [code, [th, ph, al, et]] of presets) {
  await page.click(`#presets [data-preset="${code}"]`); await settle();
  const s = await D(() => QG_DEBUG.state());
  const info = await D(() => QG_DEBUG.info());
  const m = independentModel(th, ph, al, et);
  const pressed = await D((q) => document.querySelector(`#presets [data-preset="${q}"]`).getAttribute('aria-pressed'), code);
  check(`preset ${code} applies and sets aria-pressed="true"`, s.theta === th && s.phi === ph && s.alpha === al && near(s.eta, et) && pressed === 'true', JSON.stringify(s));
  check(`preset ${code} agrees with independent model and Pythagorean laws`, near(info.dot, m.dot) && near(info.wedge, m.wedge) && near(info.pythAB, 1) && near(info.V, m.V) && near(info.D, m.D) && near(info.pythDV, 1) && near(info.hsTotalActive, m.hsTotalActive) && near(info.entropyPinchNats, m.entropyPinchNats) && near(info.entropyRemainingNats, m.entropyRemainingNats), JSON.stringify(info));
}

/* ---------- Q03 + Q04 on the full pinching dephasing preset (90°, 0°, 90°, 1): |+⟩⟨+| → I/2 ---------- */
let info = await D(() => QG_DEBUG.info());
check('full pinching dephasing preset: D = 1, V = 0, ρ(1) = I/2 (zero Bloch vector), active off-diagonal mass 0, pure-state mass 0.5',
  near(info.D, 1) && near(info.V, 0) && info.blochDecohered.every((c) => near(c, 0)) && near(info.hsOffActive, 0) && near(info.hsOffPure, 0.5)
  && near(info.hsTotalActive, 0.5) && near(info.hsDiag, 0.5), JSON.stringify(info));
check('full pinching dephasing preset: budget S(Π(ρ₀)) = ln 2 (1 bit), S(ρ(1)) = ln 2, remaining D(ρ(1)‖Π(ρ₀)) = 0',
  near(info.entropyPinchNats, Math.LN2) && near(info.entropyPinchBits, 1) && near(info.entropyCurrentNats, Math.LN2) && info.entropyRemainingNats === 0, JSON.stringify(info));
let ent = await text('#roEntropy');
check('Q04: #roEntropy shows the remaining 0.0000 nats (0.0000 bits) as primary value at (90°,0°,90°,1)', ent.startsWith('0.0000 nats (0.0000 bits)'), ent);
check('Q04: #roEntropy sub shows the budget S(Π(ρ₀)) = H₂(cos²(θ/2)) = 0.6931 nats (1.0000 bits) and S(ρ(η)) = 0.6931 nats',
  ent.includes('初始纯态相干预算 S(Π(ρ₀)) = H₂(cos²(θ/2)) = 0.6931 nats (1.0000 bits)') && ent.includes('当前态熵 S(ρ(η)) = 0.6931 nats'), ent);
check('Q04: #roHS reads 0.5000 = 0.5000 + 0.0000 ✓ with Π(ρ(η)) = Π(ρ₀) = diag(0.5000, 0.5000)',
  (await text('#roHS')).startsWith('0.5000 = 0.5000 + 0.0000 ✓') && (await text('#roHS')).includes('Π(ρ(η)) = Π(ρ₀) = diag(0.5000, 0.5000)'), await text('#roHS'));
let ledger = await D(() => QG_DEBUG.ledger());
check('Q04: canvas ledger header is LEAN ✓  ⟨ρ(η),ρ(η)⟩ = ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)', ledger && ledger.head === 'LEAN ✓  ⟨ρ(η),ρ(η)⟩ = ⟨Π(ρ₀),Π(ρ₀)⟩ + (|ρ₀₁(η)|²+|ρ₁₀(η)|²)', JSON.stringify(ledger));
check('Q04: canvas ledger bars are ⟨ρ(η),ρ(η)⟩, ⟨Π(ρ₀),Π(ρ₀)⟩, |ρ₀₁(η)|²+|ρ₁₀(η)|², D(ρ(η)‖Π(ρ₀)) [nats, max ln 2]',
  ledger && ledger.bars.map((b) => b.code).join(' | ') === '⟨ρ(η),ρ(η)⟩ | ⟨Π(ρ₀),Π(ρ₀)⟩ | |ρ₀₁(η)|²+|ρ₁₀(η)|² | D(ρ(η)‖Π(ρ₀))'
  && near(ledger.bars[3].max, Math.LN2) && ledger.bars[3].suffix === ' nats', JSON.stringify(ledger));
check('Q04: at (90°,0°,90°,1) the ledger bars read 0.5, 0.5, 0, 0 nats', ledger && near(ledger.bars[0].val, 0.5) && near(ledger.bars[1].val, 0.5) && near(ledger.bars[2].val, 0) && ledger.bars[3].val === 0, JSON.stringify(ledger));

/* ---------- Q03: unital dephasing is not a non-unital reset ---------- */
check('Q03: preset label reads 正交捏合退相干 (ln 2) / Full Pinching Dephasing (ln 2)',
  (await langText('#presets [data-preset="90,0,90,1"]', 'zh')) === '正交捏合退相干 (ln 2)' && (await langText('#presets [data-preset="90,0,90,1"]', 'en')) === 'Full Pinching Dephasing (ln 2)');
check('Q03: no preset label calls dephasing an erasure', await D(() => [...document.querySelectorAll('#presets .chip')].every((b) => !/擦除|[Ee]rasure/.test(b.textContent))));
const unital = await D(() => [0, 0.13, 0.5, 0.87, 1].map((e) => QG_DEBUG.dephase([0, 0, 0], e)));
check('Q03: E_η is unital: E_η(I/2) = I/2 for every η (zero Bloch vector stays put, never pushed to |0⟩⟨0|)', unital.every((v) => v.every((c) => c === 0)), JSON.stringify(unital));
const zfix = await D(() => [[0.3, -0.4, 0.5], [0, 0, 1], [0.6, 0.8, 0], [-0.1, 0.2, -0.97]].map((r) => [r[2], QG_DEBUG.dephase(r, 0.37)[2], QG_DEBUG.dephase(r, 1)]));
check('Q03/Q04: E_η leaves the z axis fixed, so Π(ρ(η)) = Π(ρ₀); η = 1 is the pinching Π (transverse part removed)',
  zfix.every(([z, zEta, full]) => z === zEta && full[0] === 0 && full[1] === 0 && full[2] === z), JSON.stringify(zfix));
let sweepOk = true, sweepMsg = '', prevS = -1, prevD = Infinity;
for (const e of [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1]) {
  await D((x) => QG_DEBUG.set(90, 0, 90, x), e);
  const x = await D(() => QG_DEBUG.info());
  if (!(x.entropyCurrentNats >= prevS - 1e-12 && x.entropyRemainingNats <= prevD + 1e-12 && near(x.entropyCurrentNats + x.entropyRemainingNats, Math.LN2))) {
    sweepOk = false; sweepMsg = `η=${e}: ${JSON.stringify(x)}`; break;
  }
  prevS = x.entropyCurrentNats; prevD = x.entropyRemainingNats;
}
check('Q03: along |+⟩⟨+| → I/2, S(ρ(η)) rises from S(ρ₀) = 0 to ln 2 while D(ρ(η)‖Π(ρ₀)) falls from ln 2 to 0; their sum stays ln 2', sweepOk && near(prevS, Math.LN2) && prevD === 0, sweepMsg);
const pinchZh = await text('#drawerPinchZh'), pinchEn = await text('#drawerPinchEn');
const q03Common = ['|+⟩⟨+| → I/2', 'Π(I/2) = E_η(I/2) = I/2', 'S(ρ₀) = 0', 'S(Π(ρ₀)) = H₂(cos²(θ/2)) ≤ ln 2', 'ΔS_pinch = D(ρ ‖ Π(ρ)) = S(Π(ρ)) − S(ρ) ≥ 0',
  'I/2 → |0⟩⟨0|', 'ΔS_sys = −ln 2 < 0', 'k_B T ln 2', 'E_η(ρ) = (1−η)ρ + ηΠ(ρ)', 'Π(ρ(η)) = Π(ρ₀) = diag(p₀, p₁)', 'p₀ = cos²(θ/2)'];
check('Q03: drawer (zh) separates 保单位 dephasing (entropy up) from 非保单位 reset (Landauer heat, literature result)',
  q03Common.every((s) => pinchZh.includes(s)) && ['保单位退相干', '非保单位信道', '兰道尔原理', '温度为 T 的热库', '文献结果，未在本书形式化', '相位相干泄入环境记录'].every((s) => pinchZh.includes(s)),
  q03Common.concat(['保单位退相干', '非保单位信道']).filter((s) => !pinchZh.includes(s)).join(' | '));
check('Q03: drawer (en) separates unital dephasing (entropy up) from non-unital reset (Landauer heat, literature result)',
  q03Common.every((s) => pinchEn.includes(s)) && ['Unital dephasing / pinching', 'non-unital', "Landauer's principle", 'thermal reservoir at temperature T', 'literature result, not formalized in this book', 'Phase coherence leaks into environmental records'].every((s) => pinchEn.includes(s)),
  q03Common.filter((s) => !pinchEn.includes(s)).join(' | '));
check('Q03: drawer title distinguishes unital pinching dephasing from non-unital Landauer reset',
  (await langText('#drawerTitle', 'zh')).includes('保单位捏合退相干与非保单位兰道尔重置') && (await langText('#drawerTitle', 'en')).includes('unital pinching dephasing vs non-unital Landauer reset'));
check('Q03: drawer links the Landauer literature remark of chapter 8 in both languages', await D(() =>
  !!document.querySelector('#drawer div.zh a[href="../../zh/ch08-erasure-and-time-arrows.html#rem-landauer-thermodynamic-bridge-literature"]')
  && !!document.querySelector('#drawer div.en a[href="../../en/ch08-erasure-and-time-arrows.html#rem-landauer-thermodynamic-bridge-literature"]')));

/* ---------- Q04 at η = 0: the remaining coherence equals the pure-state budget ---------- */
await page.click('#presets [data-preset="60,36,30,0"]'); await settle();
info = await D(() => QG_DEBUG.info());
const budget = h2Nats(Math.cos(30 * DEG) ** 2);
ent = await text('#roEntropy');
check('Q04: at η = 0, D(ρ(0)‖Π(ρ₀)) = S(Π(ρ₀)) = H₂(cos²(30°)) and S(ρ(0)) = 0', near(info.entropyRemainingNats, budget) && near(info.entropyPinchNats, budget) && near(info.entropyCurrentNats, 0),
  JSON.stringify(info));
check('Q04: at η = 0 the primary #roEntropy value equals the budget shown in its sub line',
  ent.startsWith(`${budget.toFixed(4)} nats (${(budget / Math.LN2).toFixed(4)} bits)`) && ent.includes(`H₂(cos²(θ/2)) = ${budget.toFixed(4)} nats`), ent);

// 60 pseudo-random states (theta, phi, alpha, eta) checked against independent model
let seed = 42;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
let allOk = true, badMsg = '';
for (let k = 0; k < 60; k++) {
  const th = Math.floor(rnd() * 181);
  const ph = Math.floor(rnd() * 361);
  const al = Math.floor(rnd() * 91);
  const et = Math.round(rnd() * 100) / 100;
  await D(([a, b, c, d]) => QG_DEBUG.set(a, b, c, d), [th, ph, al, et]);
  const x = await D(() => QG_DEBUG.info());
  const m = independentModel(th, ph, al, et);
  const ok = x.theta === th && x.phi === ph && x.alpha === al && near(x.eta, et)
    && near(x.p0, m.p0) && near(x.p1, m.p1) && near(x.p0 + x.p1, 1)
    && near(x.dot, m.dot) && near(x.wedge, m.wedge) && near(x.pythAB, 1)
    && near(x.V, m.V) && near(x.D, m.D) && near(x.pythDV, 1)
    && near(x.hsDiag, m.hsDiag) && near(x.hsOffPure, m.hsOffPure)
    && near(x.hsOffActive, m.hsOffActive) && near(x.hsTotalActive, m.hsDiag + m.hsOffActive)
    && near(x.entropyPinchNats, m.entropyPinchNats) && near(x.entropyCurrentNats, m.entropyCurrentNats)
    && near(x.entropyRemainingNats, m.entropyRemainingNats)
    && near(x.entropyRemainingNats, x.entropyPinchNats - x.entropyCurrentNats, 1e-12)
    && x.blochDecohered.every((c, i) => near(c, m.blochDecohered[i]))
    && near((1 + x.blochDecohered[2]) / 2, x.p0) && near(x.blochDecohered[2], x.blochPure[2]);
  if (!ok) {
    allOk = false;
    badMsg = `(${th},${ph},${al},${et}) got ${JSON.stringify(x)} expected ${JSON.stringify(m)}`;
    break;
  }
}
check('60 pseudo-random states: Born rule, AB product, D²+V²=1, HS split of ρ(η), D(ρ(η)‖Π(ρ₀)) from 2×2 matrices, and Π(ρ(η)) = Π(ρ₀) all match', allOk, badMsg);

/* ---------- Clifford rotor gates ---------- */
await page.click('#presets [data-preset="0,0,0,0"]'); await settle();
await page.click('#gates [data-gate="H"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('H gate rotates |0⟩ (0°,0°) to |+⟩ (90°,0°)', st.theta === 90 && st.phi === 0 && st.gates.join(',') === 'H', JSON.stringify(st));
tape = await text('#gateTape');
check('A01: after H the tape reads |ψ⟩ → U(α) [H] → ρ₀(90°, 0°) → E_η (η = 0.00) → ρ(η)', tape === '|ψ⟩ → U(α) [H] → ρ₀(90°, 0°) → E_η (η = 0.00) → ρ(η)', tape);
note = await text('#roNote');
check('A01: after H the note lists the applied gate inside step ② and the post-gate coordinates in step ③', note.includes('已施加 1 个：H') && note.includes('(θ, φ) = (90°, 0°)'), note);
await page.click('#gates [data-gate="S"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('S gate rotates |+⟩ (90°,0°) to |+i⟩ (90°,90°)', st.theta === 90 && st.phi === 90 && st.gates.join(',') === 'H,S', JSON.stringify(st));
await page.click('#gates [data-gate="T"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('T gate advances azimuth by +45° to (90°,135°)', st.theta === 90 && st.phi === 135 && st.gates.join(',') === 'H,S,T', JSON.stringify(st));
await page.click('#gates [data-gate="Z"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('Z gate advances azimuth by +180° to (90°,315°)', st.theta === 90 && st.phi === 315 && st.gates.join(',') === 'H,S,T,Z', JSON.stringify(st));
await page.click('#gates [data-gate="X"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('X gate reflects (theta -> 180-theta, phi -> 360-phi) to (90°,45°)', st.theta === 90 && st.phi === 45, JSON.stringify(st));
await page.click('#gates [data-gate="Y"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('Y gate reflects (theta -> 180-theta, phi -> 180-phi) to (90°,135°)', st.theta === 90 && st.phi === 135, JSON.stringify(st));
await page.click('#gates [data-gate="I"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('I gate preserves (theta, phi) and records on the circuit tape', st.theta === 90 && st.phi === 135 && st.gates[st.gates.length - 1] === 'I'
  && (await text('#gateTape')) === '|ψ⟩ → U(α) [H → S → T → Z → X → Y → I] → ρ₀(90°, 135°) → E_η (η = 0.00) → ρ(η)', await text('#gateTape'));
await page.click('#resetGates'); await settle();
st = await D(() => QG_DEBUG.state());
check('Reset button clears the rotor tape and restores balanced state (60°,36°,30°,0)', st.theta === 60 && st.phi === 36 && st.alpha === 30 && st.eta === 0 && st.gates.length === 0);

/* ---------- sliders, number boxes, steppers & clamping ---------- */
await page.fill('#thetaNum', '45'); await page.press('#thetaNum', 'Enter'); await settle();
await page.locator('#phi').fill('120'); await settle();
await page.click('#alphaInc'); await page.click('#etaInc'); await settle();
st = await D(() => QG_DEBUG.state());
check('number input, range slider, and steppers update (theta=45, phi=120, alpha=31, eta=0.05)', st.theta === 45 && st.phi === 120 && st.alpha === 31 && near(st.eta, 0.05), JSON.stringify(st));
await page.fill('#thetaNum', '999'); await page.press('#thetaNum', 'Enter'); await settle();
await page.fill('#etaNum', '5'); await page.press('#etaNum', 'Enter'); await settle();
st = await D(() => QG_DEBUG.state());
check('out-of-range inputs are clamped to theta=180, eta=1.00', st.theta === 180 && near(st.eta, 1), JSON.stringify(st));

/* ---------- canvas rendering check ---------- */
await page.click('#presets [data-preset="60,36,30,0"]'); await settle();
const lit = await D(() => {
  const c = document.getElementById('view');
  const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let n = 0;
  for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 180) n++;
  return n;
});
check('the 3D Bloch sphere, complementarity circle, and pinching bars are drawn on canvas', lit > 2000, String(lit));

/* ---------- Lean links at the pinned commit; drawer ---------- */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file, and line of trureturing.lock.json', links.length >= 8 && links.every(([gid, href]) => {
  const d = lock.declarations[gid];
  return d && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 4)));
const cites = links.map(([g]) => g);
const expectedGids = [
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/PureState/RecordCoherenceComplementarity.pure_record_distinguishability_coherence_complementarity',
  'D5/S3/QuantumChannels/PinchingProjection.pinching_hilbert_schmidt_pythagorean',
  'D5/S3/Quantum/Dynamics/EntropyProductionCoherenceDeletionIdentity.entropy_production_coherence_deletion_identity'
];
check('the page cites all 4 core Lean 4 theorems', expectedGids.every((g) => cites.includes(g)));

await page.click('#infoBtn');
check('theory drawer opens', (await D(() => document.getElementById('drawer').hidden)) === false);
check('the drawer states that the page is a numerical illustration, not a proof', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
await page.keyboard.press('Escape');
check('Esc closes the drawer and returns focus to #infoBtn', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* ---------- English mode & zero CJK leftovers ---------- */
await page.click('[data-lang-set="en"]'); await settle();
let left = await cjkLeftovers(page);
check('no visible Chinese in English mode', left.length === 0, left.slice(0, 6).join(' | '));
for (const p of ['0,0,0,0', '90,0,90,1']) {
  await page.click(`#presets [data-preset="${p}"]`); await settle();
  left = await cjkLeftovers(page);
  check(`no visible Chinese in English mode after preset ${p}`, left.length === 0, left.slice(0, 6).join(' | '));
}
// still on (90°, 0°, 90°, 1): ρ(1) = I/2
ent = await text('#roEntropy');
check('Q04: English #roEntropy names the budget S(Π(ρ₀)) and current-state entropy S(ρ(η))',
  ent.includes('initial pure-state coherence budget S(Π(ρ₀)) = H₂(cos²(θ/2)) = 0.6931 nats (1.0000 bits)') && ent.includes('current-state entropy S(ρ(η)) = 0.6931 nats') && ent.startsWith('0.0000 nats (0.0000 bits)'), ent);
await page.click('#gates [data-gate="H"]'); await settle();
left = await cjkLeftovers(page);
check('no visible Chinese in English mode after applying a rotor gate and showing toast', left.length === 0 && /Applied rotor gate U\(α\) = H → post-gate pure state ρ₀/.test(await text('#toast')), left.slice(0, 6).join(' | '));
note = await text('#roNote');
check('A01: English note states the pipeline and its four steps in order with zero CJK', !/[　-〿㐀-鿿＀-￯]/.test(note)
  && note.startsWith(`Circuit order ${PIPELINE}:`)
  && ordered(note, ['(1) state preparation |ψ⟩', '(2) rotor gate U(α) = exp(−iα n̂·σ/2), 1 applied: H', '(3) post-gate pure state ρ₀ = |ψ(θ,φ)⟩⟨ψ(θ,φ)|', '(4) fixed-z dephasing channel E_η', 'ρ(η) = E_η(ρ₀)']), note);
tape = await text('#gateTape');
check('A01: English tape is language-neutral and complete (H maps |+⟩ to |0⟩)', !/[　-〿㐀-鿿＀-￯]/.test(tape) && tape === '|ψ⟩ → U(α) [H] → ρ₀(0°, 0°) → E_η (η = 1.00) → ρ(η)', tape);
await page.click('#infoBtn');
left = await cjkLeftovers(page);
check('no visible Chinese in the English theory drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title is set', (await D(() => document.title)).startsWith('ORTHO//QUBIT · Pairwise geometric product'));

/* ---------- hub round trip ---------- */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, preserves English language, and lists qubit-geometry', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D(() => document.querySelectorAll('.card[data-viz="qubit-geometry"]').length)) === 1
  && (await D(() => !!document.querySelector('.card[data-viz="qubit-geometry"] img[src="qubit-geometry/thumb.jpg"]'))));
check('language choice is remembered under tr-lang', (await D(() => localStorage.getItem('tr-lang'))) === 'en');
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click('.card[data-viz="qubit-geometry"] .enter'); await page.waitForLoadState('load');
await page.waitForFunction(() => window.QG_DEBUG && QG_DEBUG.frames() > 0, null, { timeout: 30000 });
check('the hub card re-opens qubit-geometry', (await D(() => document.body.dataset.vizId)) === ID);

/* ---------- responsive & special viewports ---------- */
for (const lang of ['zh', 'en']) {
  for (const [w, h] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await open(`?lang=${lang}`); await settle();
    check(`no horizontal scroll at ${w}px (${lang})`, (await overflowX(page)) === 0);
  }
}
/* ---------- golden-carry frame: deck | center (+ key rail) | side, then two columns, then one ---------- */
const frame = () => D(() => {
  const q = (s) => document.querySelector(s);
  const r = (s) => q(s).getBoundingClientRect();
  return {
    dom: !!q('.app > aside.col.deck > #inputs + #readouts') && !!q('.app > main.center > #stagePanel + footer.rail#rail > .keys')
      && !!q('.app > aside.col.side > #evidence #infoBtn') && !!q('#evidence > h2 .aside'),
    cols: getComputedStyle(q('.app')).gridTemplateColumns.split(' ').length,
    inputs: r('#inputs').toJSON(), readouts: r('#readouts').toJSON(), stage: r('#stagePanel').toJSON(), evidence: r('#evidence').toJSON()
  };
});
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
let fr = await frame();
check('1440px: three columns — aside.col.deck (#inputs, #readouts) | main.center (#stagePanel, footer#rail .keys) | aside.col.side (#evidence, #infoBtn)',
  fr.dom && fr.cols === 3 && fr.stage.left > fr.inputs.right - 1 && fr.evidence.left > fr.stage.right - 1
  && Math.abs(fr.inputs.top - fr.stage.top) < 2 && Math.abs(fr.stage.top - fr.evidence.top) < 2, JSON.stringify(fr));
await page.setViewportSize({ width: 1000, height: 900 });
await open('?lang=zh'); await settle();
fr = await frame();
check('1000px: two columns — the deck first, then the stage and the evidence across the full width',
  fr.cols === 2 && fr.stage.top >= fr.readouts.bottom - 1 && fr.evidence.top >= fr.stage.bottom - 1
  && fr.stage.width > 1.8 * fr.inputs.width && Math.abs(fr.evidence.width - fr.stage.width) < 2 && (await overflowX(page)) === 0, JSON.stringify(fr));
await page.setViewportSize({ width: 390, height: 844 });
await open('?lang=zh'); await settle();
fr = await frame();
check('390px: one column in the order inputs → stage → readouts → evidence',
  fr.cols === 1 && fr.stage.top >= fr.inputs.bottom - 1 && fr.readouts.top >= fr.stage.bottom - 1 && fr.evidence.top >= fr.readouts.bottom - 1, JSON.stringify(fr));
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en'); await settle();
check('?embed=1 hides header, crumb, and keyboard hint', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en starts in English with zero CJK leftovers', (await D(() => TRV.lang())) === 'en' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, no horizontal scroll', (await overflowX(page)) === 0 && (await D(() => {
  const a = document.getElementById('inputs').getBoundingClientRect();
  const b = document.getElementById('stagePanel').getBoundingClientRect();
  return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40;
})));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await settle();
check('?thumb=1: the stage canvas fills the 1280x720 frame', await D(() => {
  const r = document.getElementById('view').getBoundingClientRect();
  return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720;
}));
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests, or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
