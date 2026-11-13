#!/usr/bin/env node
// Browser regression suite for ORTHO//HANDSHAKE (books/quantum-geometry/viz/coherence-handshake-causality/):
//   node books/quantum-geometry/viz/tests/coherence-handshake-causality.test.mjs
// After the stage-first battery it reads the page through window.__HANDSHAKE_LAB__ and checks every claim against
// computations written here: explicit closed forms and index sums (not the page's matrix products), Newton iterations
// (not its bisections), a cofactor determinant and the trigonometric roots of the characteristic cubic (not its Jacobi
// rotations), Kahan-summed phasors, and an enumeration of the binary maps straight from their Lean definitions.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'coherence-handshake-causality';
const HERE = path.dirname(fileURLToPath(import.meta.url)), DIR = path.join(HERE, '..', ID);
const T = await session();
const { check } = T;
await stageFirstChecks(T, BOOK, ID, { settle: 0 });

const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
const near = (a, b, tol = 1e-10) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= tol;
const vectorNear = (a, b, tol = 1e-10) => a.length === b.length && a.every((v, i) => near(v, b[i], tol));
const page = await T.goto(BOOK, ID, '?lang=zh');
await settle(page);
const LAB = (fn, arg) => page.evaluate(fn, arg);
const set = async (patch) => { const r = await LAB((p) => window.__HANDSHAKE_LAB__.setState(p), patch); await settle(page); return r; };
const state = () => LAB(() => window.__HANDSHAKE_LAB__.state);

/* ---------- static: tokens only, no green or red outside evidence ---------- */
{
  const src = Object.fromEntries(['index.html', 'style.css', 'main.js'].map((f) => [f, fs.readFileSync(path.join(DIR, f), 'utf8')]));
  check('static: no literal #rrggbb or rgb() colours in style.css and main.js', !/#[0-9a-f]{3,8}\b|rgba?\(/i.test(src['style.css'] + src['main.js']));
  check('static: green (--ok / P.ok) and red (--warn / P.warn) are not drawn by the page', !/--ok|--warn|P\.ok\b|P\.warn\b|palette\.ok|palette\.warn/.test(src['style.css'] + src['main.js']));
  check('static: the page loads only theme.css, style.css, shell.js, kit.js and main.js',
    JSON.stringify([...src['index.html'].matchAll(/<(?:script|link)[^>]*(?:src|href)="([^"]+\.(?:js|css))"/g)].map((m) => m[1]).filter((u) => !/^https:/.test(u))) === JSON.stringify(['../assets/theme.css', 'style.css', '../assets/shell.js', '../assets/kit.js', 'main.js']));
  const presets = [...src['index.html'].matchAll(/data-preset="([^"]+)"/g)].map((m) => m[1]);
  check('static: exactly the six presets, in order', JSON.stringify(presets) === JSON.stringify(['boolean-illusion', 'born-handshake', 'feynman-stationary', 'tsvf-eraser', 'gram-symmetry', 'paradox-cancel']), presets.join(','));
}

/* ---------- math symbols keep their case ---------- */
for (const lang of ['zh', 'en']) {
  await page.click(`[data-lang-set="${lang}"]`); await settle(page);
  for (const card of ['boolean-illusion', 'tsvf-eraser', 'paradox-cancel']) {
    await page.click(`[data-preset="${card}"]`); await settle(page);
    const bad = await page.evaluate(() => {
      const out = [];
      for (const el of document.querySelectorAll('body *')) {
        if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') continue;
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('');
        if (/[α-ωϑϕ]/.test(own) && getComputedStyle(el).textTransform === 'uppercase') out.push(own.trim().slice(0, 30));
      }
      return out;
    });
    check(`case (${lang}, ${card}): no element with Greek letters is set in uppercase`, bad.length === 0, bad.slice(0, 3).join(' | '));
    if (card === 'tsvf-eraser') {
      const domain = await page.locator('.leanref[data-lean-gid$=".local_marginal_correlation_blind_spot"]')
        .evaluate((el, l) => el.closest('.lean').querySelector(`.${l}`).textContent, lang);
      check(`marginal theorem (${lang}): domain is the real trace-zero subspace of BipartiteHermitian m n`,
        domain.includes('BipartiteHermitian m n') && domain.includes('ℝ')
        && /零迹子空间|trace-zero subspace/.test(domain) && /实维数|real dimension/.test(domain)
        && domain.includes('6 + 9 = 15'));
    }
  }
}
await page.click('[data-lang-set="zh"]'); await settle(page);

/* ---------- boolean-illusion: three zeros, recomputed in closed form ---------- */
{
  await page.click('[data-preset="boolean-illusion"]'); await settle(page);
  const s0 = await state();
  check('boolean: the card opens on θ = 90°, ξ = 45°, Δ = 180°', near(s0.params.th, PI / 2) && near(s0.params.xi, PI / 4) && near(s0.params.Delta, PI));
  const indep = (th, xi, D, g) => {
    const a = Math.cos(xi), b = Math.sin(xi);
    // ρ_γ entries by formula; ports ⟨±|ρ|±⟩ = ½(ρ00 + ρ11 ± 2 Re ρ01)
    const r00 = a * a, r11 = b * b, r01 = [g * a * b * Math.cos(D), -g * a * b * Math.sin(D)];
    return { par2: Math.cos(th) ** 2, perp2: Math.sin(th) ** 2, dot: Math.cos(th), sumAB2: 2 * (1 + Math.cos(th)),
      pPlus: (a * a + b * b + 2 * a * b * Math.cos(D)) / 2, pMinus: (a * a + b * b - 2 * a * b * Math.cos(D)) / 2,
      qPlus: (r00 + r11 + 2 * r01[0]) / 2, qMinus: (r00 + r11 - 2 * r01[0]) / 2,
      purity: r00 * r00 + r11 * r11 + 2 * (r01[0] ** 2 + r01[1] ** 2), coh: 2 * (r01[0] ** 2 + r01[1] ** 2), cohPure: 2 * a * a * b * b };
  };
  const cases = [[PI / 2, PI / 4, PI, 1], [PI / 2, PI / 4, PI, 0], [0.7, 0.3, 2.1, 0.4], [2.4, PI / 2 - 0.2, 0.3, 0.85], [1.1, 0, 1.7, 0.6], [PI, PI / 4, 0, 1]];
  let worst = 0, okLines = true;
  for (const [th, xi, D, g] of cases) {
    const r = await set({ scene: 'boolean-illusion', th, xi, Delta: D, gamma: g }), m = r.state.math['boolean-illusion'], e = indep(th, xi, D, g);
    for (const k of ['par2', 'perp2', 'dot', 'sumAB2', 'pPlus', 'pMinus', 'qPlus', 'qMinus', 'purity']) worst = Math.max(worst, Math.abs(m[k] - e[k]));
    worst = Math.max(worst, Math.abs(m.hsOff - e.coh), Math.abs(m.cohPure - e.cohPure));
    okLines = okLines && m.projRes <= 1e-12 && m.lagRes <= 1e-12 && m.idemRes <= 1e-12 && m.hsRes <= 1e-12 && m.portSumRes <= 1e-12 && m.portSumResG <= 1e-12 && m.psd && m.traceRes <= 1e-12;
  }
  check('boolean: projections, wedge, ports, ρ_γ ports and purity match the closed forms (6 settings)', worst <= 1e-12, `max error ${worst}`);
  check('boolean: complementary projections, Lagrange, idempotence, HS Pythagoras, port sums, PSD and trace hold to 1e−12', okLines);
  let m = (await set({ th: PI / 2, xi: PI / 4, Delta: PI, gamma: 1 })).state.math['boolean-illusion'];
  check('boolean fixture: θ = 90° gives a zero shadow and a full complement, ‖A+B‖² = 2', near(m.par2, 0, 1e-15) && near(m.perp2, 1, 1e-15) && near(m.sumAB2, 2, 1e-15) && near(m.wedge2, 1, 1e-15));
  check('boolean fixture: a = b, Δ = π, γ = 1 gives p₊ = 0, p₋ = 1 and purity 1', near(m.pPlus, 0, 1e-15) && near(m.pMinus, 1, 1e-15) && near(m.purity, 1, 1e-12));
  m = (await set({ gamma: 0 })).state.math['boolean-illusion'];
  check('boolean fixture: γ = 0 gives p± = ½, purity ½, and the pure state had coherence mass ½', near(m.qPlus, 0.5) && near(m.qMinus, 0.5) && near(m.purity, 0.5) && near(m.cohPure, 0.5));
  check('boolean: the pinched state need not be idempotent: ‖(I/2)² − I/2‖ = √2/4', near(m.pinSqRes, Math.SQRT2 / 4, 1e-12), String(m.pinSqRes));
  let flat = true; for (const D of [0, 1, 2.5, PI, 5]) { const q = (await set({ xi: 0, Delta: D, gamma: 1 })).state.math['boolean-illusion']; flat = flat && near(q.pPlus, 0.5) && near(q.pMinus, 0.5); }
  check('boolean fixture: a = 1, b = 0 gives p± = ½ for every Δ', flat);
  m = (await set({ xi: 0.5, Delta: PI, gamma: 1 })).state.math['boolean-illusion'];
  check('boolean: with unequal arms opposite phase does not reach zero: p₊ = (a − b)²/2', near(m.pPlus, (Math.cos(0.5) - Math.sin(0.5)) ** 2 / 2) && m.pPlus > 0.05);
  // the three operations are separate controls
  await set({ th: 0.4, xi: 0.3, Delta: 1, gamma: 1 });
  await page.click('#boolSnaps [data-snap="orth"]'); await settle(page);
  let p = (await state()).params;
  check('boolean: the orthogonal snap sets only θ = 90°', near(p.th, PI / 2) && near(p.Delta, 1) && near(p.gamma, 1));
  await page.click('#boolSnaps [data-snap="anti"]'); await settle(page); p = (await state()).params;
  check('boolean: the opposite-phase snap sets Δ = 180° on equal arms and leaves γ', near(p.Delta, PI) && near(p.xi, PI / 4) && near(p.gamma, 1));
  await page.click('#boolSnaps [data-snap="pinch"]'); await settle(page); p = (await state()).params;
  check('boolean: the pinch snap sets γ = 0', near(p.gamma, 0, 1e-12));
  for (const [id, key, val, want] of [['fTh', 'th', 30, 30 * DEG], ['fXi', 'xi', 20, 20 * DEG], ['fDelta', 'Delta', 270, 270 * DEG]]) {
    await page.$eval(`#${id}`, (el, v) => { el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, val); await settle(page);
    check(`boolean: the slider ${id} moves ${key}`, near((await state()).params[key], want, 1e-9));
  }
  // drag the tip of B to straight up
  await set({ th: 0.5 }); const at = await LAB(() => window.__HANDSHAKE_LAB__.at('B'));
  const origin = await LAB(() => { const L = window.__HANDSHAKE_LAB__; L.setState({ th: Math.PI / 2 }); const q = L.at('B'); L.setState({ th: 0.5 }); return q; });
  await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.move(origin[0], origin[1], { steps: 5 }); await page.mouse.up(); await settle(page);
  check('boolean: dragging the tip of B turns θ', Math.abs((await state()).params.th - PI / 2) < 0.08, String((await state()).params.th));
}

/* ---------- born-handshake ---------- */
{
  await page.click('[data-preset="born-handshake"]'); await settle(page);
  let worst = 0, inv = 0;
  for (const [th, cp, cf] of [[PI / 2, PI / 3, 0], [0.4, 1.3, 4.2], [2.9, 5.5, 0.7], [0, 2, 3], [PI, 1, 1]]) {
    const m = (await set({ thB: th, chiPsi: cp, chiPhi: cf })).state.math['born-handshake'], r = Math.cos(th / 2), al = cp - cf;
    worst = Math.max(worst, Math.abs(m.fwd[0] - r * Math.cos(al)), Math.abs(m.fwd[1] - r * Math.sin(al)), Math.abs(m.echo[0] - r * Math.cos(al)), Math.abs(m.echo[1] + r * Math.sin(al)),
      Math.abs(m.w - r * r), Math.abs(m.t1[0] - r * r), Math.abs(m.t2[0] - r * r), Math.abs(m.prod[1]), Math.abs(m.weights[0][0] - r * r), Math.abs(m.weights[1][0] - (1 - r * r)));
    inv = Math.max(inv, m.sandRes, m.ensRes, m.conjRes, m.rec.selfAdj, m.rec.idem, m.rec.orth, m.rec.complete);
  }
  check('born: forward r e^{i(χ_ψ − χ_φ)}, echo its conjugate, w = Tr(P_φP_ψ) = Tr(P_ψP_φ) = cos²(θ/2), weights w and 1 − w', worst <= 1e-12, `max error ${worst}`);
  check('born: the sandwich P_ψP_φP_ψ = wP_ψ, the unread ensemble and the record family {P_φ, I − P_φ} hold to 1e−12', inv <= 1e-12, `${inv}`);
  const fx = []; for (const th of [0, PI / 2, PI]) fx.push((await set({ thB: th })).state.math['born-handshake'].w);
  check('born fixtures: θ = 0, 90°, 180° give w = 1, ½, 0', near(fx[0], 1) && near(fx[1], 0.5) && near(fx[2], 0, 1e-15), fx.join(','));
  await set({ thB: 1.2, chiPhi: 0.9 });
  const ws = [], args = [];
  for (let k = 0; k <= 24; k++) { const m = (await set({ chiPsi: TAU * k / 24 })).state.math['born-handshake']; ws.push(m.w); args.push([m.argFwd, m.argEcho]); }
  check('born: sweeping χ_ψ over a full turn leaves w unchanged', Math.max(...ws) - Math.min(...ws) <= 1e-12);
  check('born: the two arrows turn in opposite directions', args.every(([f, e]) => near(Math.cos(f), Math.cos(e), 1e-12) && near(Math.sin(f), -Math.sin(e), 1e-12)));
  await page.$eval('#fThB', (el) => { el.value = '120'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('born: the θ slider moves the separation', near((await state()).params.thB, 120 * DEG, 1e-9));
  await page.$eval('#fChiPhi', (el) => { el.value = '45'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('born: the χ_φ slider moves the phase of |φ⟩', near((await state()).params.chiPhi, 45 * DEG, 1e-9));
  await page.click('#bornSnaps [data-snap="180"]'); await settle(page);
  check('born: the θ = 180° snap gives w = 0 from orthogonal rays', near((await state()).math['born-handshake'].w, 0, 1e-15));
}

/* ---------- feynman-stationary ---------- */
{
  await page.click('[data-preset="feynman-stationary"]'); await settle(page);
  const s = await set({ kFrac: 1 }), m = s.state.math['feynman-stationary'];
  const n1 = 1, n2 = 1.5, k0 = TAU / 0.25;
  const dL = (x) => n1 * x / Math.hypot(x, 1) - n2 * (1 - x) / Math.hypot(1 - x, 1), d2L = (x) => n1 / (x * x + 1) ** 1.5 + n2 / ((1 - x) ** 2 + 1) ** 1.5;
  let x = 0.5; for (let i = 0; i < 40; i++) x -= dL(x) / d2L(x);
  check('feynman: the stationary crossing agrees with Newton’s method and spec value 0.6231997970978063', near(m.sStar, x, 1e-12) && near(m.sStar, 0.6231997970978063, 1e-12), `${m.sStar} vs ${x}`);
  check('feynman: it obeys Snell’s law n₁ sin θ₁ = n₂ sin θ₂ to 1e−10', m.snellRes < 1e-10 && m.dLres < 1e-10);
  check('feynman: auto picks M = 513 with largest phase step 0.5673508840 ≤ π/4', m.M === 513 && near(m.step, 0.5673508840211241, 1e-9) && !m.under, `${m.M} ${m.step}`);
  const Lf = (q) => n1 * Math.hypot(q, 1) + n2 * Math.hypot(1 - q, 1);
  const kahan = (M, phase) => { let re = 0, im = 0, cr = 0, ci = 0; for (let k = 0; k < M; k++) { const sk = -2 + 5 * (k + 0.5) / M, ph = phase(sk, k); let y = Math.cos(ph) - cr, t = re + y; cr = (t - re) - y; re = t; y = Math.sin(ph) - ci; t = im + y; ci = (t - im) - y; im = t; } return [re / Math.sqrt(M), im / Math.sqrt(M)]; };
  const A = kahan(513, (q) => k0 * Lf(q));
  check('feynman: A_M = M^{−½}Σe^{ik₀L(s_k)} matches a Kahan sum, and C = |A_M|²/M ∈ [0, 1]', near(m.A[0], A[0], 1e-9) && near(m.A[1], A[1], 1e-9) && near(m.C, (A[0] ** 2 + A[1] ** 2) / 513, 1e-9) && m.C >= 0 && m.C <= 1);
  const A2 = kahan(1025, (q) => k0 * Lf(q)), diff = Math.hypot(A[0] / Math.sqrt(513) - A2[0] / Math.sqrt(1025), A[1] / Math.sqrt(513) - A2[1] / Math.sqrt(1025));
  check('feynman: the next-mesh difference of the averaged phasor is the independent one', near(m.meshDiff, diff, 1e-9) && m.next === 1025, `${m.meshDiff} vs ${diff}`);
  check('feynman: the off-stationary part is small but not zero (no exact-cancellation claim)', Math.hypot(...m.Aoff) > 1e-3 && Math.hypot(...m.Aoff) < Math.hypot(...m.Aband));
  const band = (await LAB(() => window.__HANDSHAKE_LAB__.paths())).band, sv = (await LAB(() => window.__HANDSHAKE_LAB__.paths())).s;
  const bandOk = sv.every((q, i) => (Math.abs(k0 * (Lf(q) - Lf(x))) <= PI / 4 + 1e-12) === !!band[i] || Math.abs(Math.abs(k0 * (Lf(q) - Lf(x))) - PI / 4) < 1e-9);
  check('feynman: the stationary band is |k₀(L(s) − L(s*))| ≤ π/4', bandOk);
  const r = (await set({ fan: 'roots' })).state.math['feynman-stationary'];
  check('feynman: roots-of-unity calibration sums to zero and a pair Ω, −Ω cancels', r.rootsRes < 1e-9 && r.pairRes === 0 && Math.hypot(...r.A) < 1e-9);
  const qd = (await set({ fan: 'quadratic' })).state.math['feynman-stationary'], L2 = d2L(x);
  const Aq = kahan(qd.M, (q) => k0 * (Lf(x) + 0.5 * L2 * (q - x) ** 2));
  check('feynman: the quadratic fan uses L(s*) + ½L″(s*)(s − s*)²', near(qd.A[0], Aq[0], 1e-9) && near(qd.A[1], Aq[1], 1e-9));
  await set({ fan: 'exact' });
  const hi = (await set({ k0: 40 * PI, n1: 2.5, n2: 2.5 })).state.math['feynman-stationary'];
  let st4097 = 0; { let prev = null; for (let k = 0; k < 4097; k++) { const ph = 40 * PI * (2.5 * Math.hypot(-2 + 5 * (k + 0.5) / 4097, 1) + 2.5 * Math.hypot(1 - (-2 + 5 * (k + 0.5) / 4097), 1)); if (prev != null) st4097 = Math.max(st4097, Math.abs(ph - prev)); prev = ph; } }
  check('feynman: under-resolution is flagged exactly when even M = 4097 has a phase step > π/4', hi.under === (st4097 > PI / 4) && hi.M === 4097, `${hi.under} ${st4097}`);
  await set({ k0: TAU / 0.25, n1: 1, n2: 1.5 });
  await page.click('#mChips [data-mesh="2049"]'); await settle(page);
  check('feynman: the mesh chips set M', (await state()).math['feynman-stationary'].M === 2049);
  await page.click('#mChips [data-mesh="auto"]'); await settle(page);
  await page.$eval('#fK0', (el) => { el.value = '40'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('feynman: the k₀ slider moves the wave number', near((await state()).params.k0, 40, 1e-9));
  for (const id of ['fN1', 'fN2']) { await page.$eval(`#${id}`, (el) => { el.value = '1.3'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page); }
  const pf = (await state()).params; check('feynman: the n₁ and n₂ sliders move the indices', near(pf.n1, 1.3) && near(pf.n2, 1.3));
  check('feynman: equal indices put the stationary point at s* = ½', near((await state()).math['feynman-stationary'].sStar, 0.5, 1e-12));
}

/* ---------- tsvf-eraser ---------- */
{
  await page.click('[data-preset="tsvf-eraser"]'); await settle(page);
  // the joint probability by explicit index sums Σ ρ_{(a,b),(c,d)} E_{ca} F_{db}: only four entries of ρ are nonzero
  const joint = (j, beta, V, sign) => {
    const N = 128, q = 1 / N, ph = TAU * (j + 0.5) / N, c = Math.cos(beta / 2), s = Math.sin(beta / 2);
    const f = sign > 0 ? [c, s] : [-s, c], F = (i, k) => f[i] * f[k];
    const E = (i, k) => (i === k ? [q, 0] : i === 1 ? [q * Math.cos(ph), q * Math.sin(ph)] : [q * Math.cos(ph), -q * Math.sin(ph)]);
    const terms = [[0, 0, 0, 0, 0.5], [1, 1, 1, 1, 0.5], [0, 0, 1, 1, V / 2], [1, 1, 0, 0, V / 2]];   // (a, b, c, d, ρ)
    let re = 0; for (const [a, b, cc, d, r] of terms) re += r * E(cc, a)[0] * F(d, b);
    return re;
  };
  let worst = 0, totalWorst = 0, condOk = true;
  for (const [beta, V] of [[0, 1], [PI / 2, 1], [0.6, 0.4], [1.2, 0], [PI / 4, 0.75]]) {
    await set({ beta, V });
    const sc = await LAB(() => window.__HANDSHAKE_LAB__.screen());
    for (let j = 0; j < 128; j++) {
      worst = Math.max(worst, Math.abs(sc.jointPlus[j] - joint(j, beta, V, 1)), Math.abs(sc.jointMinus[j] - joint(j, beta, V, -1)));
      totalWorst = Math.max(totalWorst, Math.abs(sc.total[j] - 1 / 128), Math.abs(sc.direct[j] - 1 / 128));
    }
    const pp = sc.jointPlus.reduce((u, v) => u + v, 0), pm = sc.jointMinus.reduce((u, v) => u + v, 0);
    condOk = condOk && near(pp, 0.5, 1e-12) && near(pm, 0.5, 1e-12) && near(sc.jointPlus.reduce((u, v) => u + v / pp, 0), 1, 1e-12);
  }
  check('eraser: p(j, ±) equal the explicit 4 × 4 traces on all 128 bins (5 settings)', worst <= 1e-15, `max error ${worst}`);
  check('eraser: the past total p(j, +) + p(j, −) and Tr[ρ(Eⱼ ⊗ I)] equal qⱼ = 1/128 for every basis and visibility', totalWorst <= 1e-15, `${totalWorst}`);
  check('eraser: p(±) = ½ and each conditional p(j | ±) sums to 1', condOk);
  let m = (await set({ beta: PI / 2, V: 1 })).state.math['tsvf-eraser'];
  check('eraser: the readout shows the raw residual max|p₊ + p₋ − q|', m.maxRes <= 1e-15 && (await page.textContent('#roKey')).trim() === '0.0000');
  check('eraser: 128 screen elements sum to I and ρ_PM is a state', m.sumERes < 1e-12 && m.rhoTraceRes < 1e-15 && m.rhoMinEig > -1e-15);
  const sc0 = await LAB(() => { const L = window.__HANDSHAKE_LAB__; L.setState({ beta: 0, V: 1 }); return L.screen(); });
  check('eraser fixture: β = 0 (which-path) leaves both joint arrays flat', Math.max(...sc0.jointPlus) - Math.min(...sc0.jointPlus) < 1e-15);
  await set({ beta: PI / 2, V: 1 });
  const fringes = await LAB(() => window.__HANDSHAKE_LAB__.screen());
  check('eraser: both conditional screen profiles match complementary fringes in all 128 bins',
    fringes.jointPlus.length === 128 && fringes.jointMinus.length === 128
    && fringes.jointPlus.every((v, j) => near(2 * v, (1 + Math.cos(TAU * (j + 0.5) / 128)) / 128, 1e-15))
    && fringes.jointMinus.every((v, j) => near(2 * v, (1 - Math.cos(TAU * (j + 0.5) / 128)) / 128, 1e-15)));
  const inst = await LAB(() => [11, 29, 404].map((s) => window.__HANDSHAKE_LAB__.instrument(s)));
  check('eraser: for random complete two-outcome marker instruments the past marginal is unchanged', inst.every((r) => r.completeRes < 1e-12 && r.marginalRes < 1e-15), JSON.stringify(inst));
  const wv = await LAB((list) => list.map((e) => window.__HANDSHAKE_LAB__.weak(e)), [PI / 3, 0, PI / 2, -PI / 2, 1.0]);
  check('weak value: η = 60° gives Z_w = √3 and p_post = ¼', near(wv[0].Zw[0], Math.sqrt(3), 1e-12) && near(wv[0].pPost, 0.25, 1e-12) && near(wv[0].Zw[1], 0, 1e-15));
  check('weak value: η = 0 gives Z_w = 0 and p_post = 1', near(wv[1].Zw[0], 0, 1e-15) && near(wv[1].pPost, 1, 1e-12));
  check('weak value: η = ±90° is undefined (zero postselection), not ∞', !wv[2].defined && wv[2].Zw === null && !wv[3].defined && wv[3].Zw === null && wv[2].pPost < 1e-16);
  check('weak value: Z_w = tan η where defined', near(wv[4].Zw[0], Math.tan(1.0), 1e-12));
  await set({ eta: PI / 2 });
  check('weak value: the readout says undefined at η = 90°', /无定义|undefined/.test(await page.textContent('#ro3')));
  await page.$eval('#fV', (el) => { el.value = '0.3'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('eraser: the V slider moves the visibility', near((await state()).params.V, 0.3));
  await page.$eval('#fEta', (el) => { el.value = '-30'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page);
  check('eraser: the η slider moves the postselection', near((await state()).params.eta, -30 * DEG, 1e-9));
  await page.click('#tsvfSnaps [data-snap="which"]'); await settle(page);
  check('eraser: the which-path snap sets β = 0', near((await state()).params.beta, 0, 1e-12));
}

/* ---------- gram-symmetry ---------- */
{
  await page.click('[data-preset="gram-symmetry"]'); await settle(page);
  const cof = (G) => G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  /** Eigenvalues of a symmetric 3 × 3 matrix from its characteristic cubic (trigonometric solution). */
  const eig3 = (A) => {
    const p1 = A[0][1] ** 2 + A[0][2] ** 2 + A[1][2] ** 2, q = (A[0][0] + A[1][1] + A[2][2]) / 3;
    if (p1 < 1e-30) return [A[0][0], A[1][1], A[2][2]].sort((a, b) => a - b);
    const p2 = (A[0][0] - q) ** 2 + (A[1][1] - q) ** 2 + (A[2][2] - q) ** 2 + 2 * p1, p = Math.sqrt(p2 / 6);
    const B = A.map((r, i) => r.map((v, j) => (v - (i === j ? q : 0)) / p)), r = Math.max(-1, Math.min(1, cof(B) / 2)), ph = Math.acos(r) / 3;
    const e1 = q + 2 * p * Math.cos(ph), e3 = q + 2 * p * Math.cos(ph + 2 * PI / 3);
    return [e3, 3 * q - e1 - e3, e1].sort((a, b) => a - b);
  };
  let m = (await set({ x: 0.2, y: 0.6, z: 0.1, swap: false })).state.math['gram-symmetry'];
  const G = [[1, 0.2, 0.1], [0.2, 1, 0.6], [0.1, 0.6, 1]], Gp = [[1, 0.6, 0.1], [0.6, 1, 0.2], [0.1, 0.2, 1]];
  check('gram: the default triple is x = 0.2, y = 0.6, z = 0.1 (x ≠ y)', near(m.x, 0.2, 1e-12) && near(m.y, 0.6, 1e-12) && near(m.z, 0.1, 1e-12));
  check('gram: det G = det G′ = 0.614 by cofactor expansion', near(m.det, cof(G), 1e-12) && near(m.detP, cof(Gp), 1e-12) && near(cof(G), 0.614, 1e-12), `${m.det}`);
  check('gram: G′ = P₁₃GP₁₃ᵀ exchanges x and y and differs from G by |x − y| = 0.4', m.Gp.every((r, i) => r.every((v, j) => near(v, Gp[i][j], 1e-12))) && near(m.same, 0.4, 1e-12) && !m.equal);
  const e = eig3(G);
  check('gram: G and G′ have the same eigenvalues (characteristic cubic) and both are PSD of rank 3', m.eig.every((v, i) => near(v, e[i], 1e-10)) && m.eigP.every((v, i) => near(v, e[i], 1e-10)) && m.psd && m.psdP && m.rank === 3 && m.rankP === 3);
  const tri = (a, b, c) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
  check('gram: (A·(B×C))² = det G, and the swap flips the sign of the triple product', near(tri(m.A, m.B, m.C) ** 2, m.det, 1e-12) && near(m.tripleSwap, -m.triple, 1e-12) && near(m.detParam, m.det, 1e-12));
  // the vectors are unit and realize the table
  const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  check('gram: A, B, C are unit vectors with A·B = x, B·C = y, A·C = z', [m.A, m.B, m.C].every((v) => near(dot(v, v), 1, 1e-12)) && near(dot(m.A, m.B), 0.2, 1e-12) && near(dot(m.B, m.C), 0.6, 1e-12) && near(dot(m.A, m.C), 0.1, 1e-12));
  m = (await set({ x: 0.5, y: 0.5, z: 0.2 })).state.math['gram-symmetry'];
  check('gram fixture: the symmetric snapshot x = y = 0.5, z = 0.2 has det 0.56 and G′ = G', near(m.det, 0.56, 1e-12) && m.equal && near(Math.cos(m.phi), -1 / 15, 1e-12));
  m = (await set({ x: 0, y: 0, z: 0 })).state.math['gram-symmetry'];
  check('gram fixture: orthonormal vectors give G = I and det 1', near(m.det, 1, 1e-12) && m.eig.every((v) => near(v, 1, 1e-10)));
  m = (await set({ x: 0.3, y: -0.4, phi: 0 })).state.math['gram-symmetry'];
  check('gram fixture: coplanar vectors (φ = 0) give det 0', near(m.det, 0, 1e-12) && m.rank === 2);
  m = (await set({ x: 1, y: 1, z: 1 })).state.math['gram-symmetry'];
  check('gram fixture: x = y = z = 1 gives rank 1 and det 0', near(m.det, 0, 1e-12) && m.rank === 1);
  const before = (await set({ x: 0.2, y: 0.6, z: 0.1 })).state.params;
  const rj = await set({ x: 1, y: 1, z: -1 });
  const after = (await state()).params;
  check('gram: the triple (1, 1, −1) is rejected as non-Gram (det −4) and the state is left as it was', !rj.ok && near(rj.state.reject.det, -4, 1e-12) && after.x === before.x && after.y === before.y && near(after.phi, before.phi, 1e-12), JSON.stringify(rj.rejected));
  await page.click('#gramSnaps [data-snap="invalid"]'); await settle(page);
  check('gram: the “try (1, 1, −1)” chip says it is rejected', /拒绝|Rejected/.test(await page.textContent('#roNote')));
  const s0 = (await state()).params.swap;
  await page.click('#gramSnaps [data-snap="swap"]'); await settle(page);
  check('gram: the swap chip toggles A_past ↔ C_future and shows it pressed', (await state()).params.swap === !s0 && (await page.getAttribute('#gramSnaps [data-snap="swap"]', 'aria-pressed')) === String(!s0));
  let sweepOk = true;
  for (let k = 0; k < 12; k++) {
    const phi = TAU * k / 12, z = 0.2 * 0.6 + Math.sqrt((1 - 0.2 ** 2) * (1 - 0.6 ** 2)) * Math.cos(phi);
    const expected = [[1, 0.2, z], [0.2, 1, 0.6], [z, 0.6, 1]], eigenvalues = eig3(expected);
    const q = (await set({ phi })).state.math['gram-symmetry'];
    sweepOk = sweepOk && near(q.z, z, 1e-12) && near(q.det, cof(expected), 1e-12)
      && near(q.detP, cof(expected), 1e-12) && vectorNear(q.eig, eigenvalues, 1e-10) && vectorNear(q.eigP, eigenvalues, 1e-10);
  }
  check('gram: independent determinants and cubic spectra agree before and after the swap all the way round', sweepOk);
  for (const [id, key] of [['fX', 'x'], ['fY', 'y']]) { await page.$eval(`#${id}`, (el) => { el.value = '-0.35'; el.dispatchEvent(new Event('input', { bubbles: true })); }); await settle(page); check(`gram: the slider ${id} moves ${key}`, near((await state()).params[key], -0.35)); }
}

/* ---------- paradox-cancel ---------- */
{
  await page.click('[data-preset="paradox-cancel"]'); await settle(page);
  const ports = []; for (const tau of [0, 0.5, 1]) ports.push((await set({ tau })).state.math['paradox-cancel'].pLoop);
  check('loop fixtures: δ = 0, π/2, π give paradox-port weights 1, ½, 0', near(ports[0], 1) && near(ports[1], 0.5) && near(ports[2], 0, 1e-15), ports.join(','));
  let sums = 0, liftOk = true;
  for (let k = 0; k <= 16; k++) {
    const tau = 2 * k / 16, delta = PI * tau, q = (await set({ tau })).state.math['paradox-cancel'];
    sums = Math.max(sums, Math.abs(q.pLoop + q.pOther - 1), Math.abs(q.pLoop - Math.cos(delta / 2) ** 2), Math.abs(q.pOther - Math.sin(delta / 2) ** 2));
    liftOk = liftOk && near(q.tau, tau) && vectorNear(q.base, [Math.cos(2 * delta), Math.sin(2 * delta)])
      && vectorNear(q.lift, [Math.cos(delta), Math.sin(delta)]) && near(Math.hypot(...q.lift), 1)
      && vectorNear(q.Aloop, [(1 + Math.cos(delta)) / 2, Math.sin(delta) / 2])
      && vectorNear(q.Aother, [(1 - Math.cos(delta)) / 2, -Math.sin(delta) / 2]);
  }
  check('loop: the two ports always sum to 1 and have the independent cos²(δ/2), sin²(δ/2) weights', sums < 1e-12);
  check('loop: base, lift and both complex output amplitudes match independent phasors over two turns', liftOk);
  const m = (await set({ tau: 1 })).state.math['paradox-cancel'];
  check('loop: the full-turn lift ends at −1 with unit norm (not zero), and lift² = base', near(m.fullTurnEnd[0], -1, 1e-15) && near(m.fullTurnEndNorm, 1, 1e-15) && m.liftSqRes < 1e-15);
  check('loop: ψ and −ψ give the same density matrix', m.rayRes < 1e-15);
  check('Deutsch: X(I/2)X† = I/2 and X|+⟩⟨+|X† = |+⟩⟨+|, every (I + rₓX)/2 is fixed, |0⟩⟨0| is moved, −I fixes it', m.deutschRes === 0 && m.plusRes < 1e-15 && m.familyRes < 1e-15 && m.zeroMoves > 1 && m.globalPhaseRes === 0);
  let th = 0.7; for (let i = 0; i < 30; i++) th -= (Math.cos(th) - th) / (-Math.sin(th) - 1);
  check('cosine: the bisection root agrees with Newton’s method and 0.7390851332151607', near(m.cosRoot.theta, th, 1e-12) && near(m.cosRoot.theta, 0.7390851332151607, 1e-12) && m.cosRoot.residual <= 1e-12 && m.cosRoot.f0 > 0 && m.cosRoot.f1 < 0);
  // the six nondegenerate maps over Fin 2, straight from the Lean definitions
  const mine = [];
  for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) for (let c = 0; c < 2; c++) for (let d = 0; d < 2; d++) {
    if (a * d - b * c === 0) continue;
    const fc = [c, d - a, -b].map((v) => v + 0), disc = (d - a) ** 2 + 4 * b * c, same = (t) => fc.every((v, i) => v === t[i]);
    const fate = same([0, 0, 0]) ? 'empty' : same([0, 0, -1]) ? 'dead' : disc === 5 ? 'live' : disc === 0 || disc === 4 ? 'collapse' : null;
    mine.push([a, b, c, d, fate]);
  }
  const theirs = (await LAB(() => window.__HANDSHAKE_LAB__.fates())).map((f) => [f.a, f.b, f.c, f.d, f.fate]);
  check('fates: six nondegenerate maps, each with exactly one fate, live exactly for the two golden families', JSON.stringify(theirs) === JSON.stringify(mine) && (await LAB(() => window.__HANDSHAKE_LAB__.fates())).every((f) => f.fates.length === 1 && (f.fate === 'live') === f.phiFamily));
  await page.click('#loopSnaps [data-snap="0"]'); await settle(page);
  check('loop: the δ = 0 snap brightens the paradox port', near((await state()).math['paradox-cancel'].pLoop, 1));
  // Press the tip and release it in the frame the drag starts in. A target read from a temporary δ = π state names a
  // point of another frame: a three-digit δ in the amber pill can wrap the header and move the stage. The arrow turns
  // about its tail, so every point of the tip's own axis left of the tail is exactly δ = π (the left edge of the canvas
  // is one), and a point taken from another frame lands off that axis. One move: once δ has jumped, a frame may re-lay
  // the page out under the pointer before a later move arrives.
  const [at, tgt] = await LAB(() => { const p = window.__HANDSHAKE_LAB__.at('loop'), b = document.getElementById('cv').getBoundingClientRect(); return [p, [b.left + 2, p[1]]]; });
  await page.mouse.move(at[0], at[1]); await page.mouse.down(); await page.mouse.move(tgt[0], tgt[1]); await page.mouse.up(); await settle(page);
  check('loop: dragging the violet loop arrow turns δ', Math.abs((await state()).params.tau - 1) < 0.06, String((await state()).params.tau));
  check('loop: released on its own axis left of its tail, the loop arrow reads δ = π', Math.abs((await state()).params.tau - 1) < 1e-5, String((await state()).params.tau));
}

/* ---------- presets, rail, keys, language, motion, touch ---------- */
{
  const seen = [];
  for (const c of ['boolean-illusion', 'born-handshake', 'feynman-stationary', 'tsvf-eraser', 'gram-symmetry', 'paradox-cancel']) {
    const p2 = await T.open(BOOK, ID, `?embed=1&preset=${c}&lang=en`, { viewport: { width: 740, height: 500 } }); await settle(p2);
    const s = await p2.evaluate(() => window.__HANDSHAKE_LAB__.state);
    seen.push(s.scene === c && s.preset === c && s.lang === 'en');
    await p2.context().close();
  }
  check('presets: ?preset=<id>&embed=1 opens each of the six scenes on its card', seen.every(Boolean), JSON.stringify(seen));
  await page.click('[data-preset="born-handshake"]'); await settle(page);
  await page.keyboard.press('Home'); await settle(page);
  await page.click('#play');
  check('rail: ▶ plays the χ_ψ sweep', await until(page, () => window.__HANDSHAKE_LAB__.state.t > 0.3));
  await page.click('#play'); await settle(page);
  await page.keyboard.press('3'); await settle(page);
  check('keys: 3 switches to the path fan', (await state()).scene === 'feynman-stationary');
  const calm = await T.open(BOOK, ID, '?lang=zh', { reducedMotion: 'reduce' }); await settle(calm);
  await calm.click('[data-preset="gram-symmetry"]'); await settle(calm);
  check('reduced motion: the swap of the gram card lands at once', await calm.evaluate(() => window.__HANDSHAKE_LAB__.state.swapU === 1));
  await calm.context().close();
  const phone = await T.open(BOOK, ID, '?lang=zh', { viewport: { width: 390, height: 844 } }); await settle(phone);
  const small = [];
  for (const c of ['boolean-illusion', 'feynman-stationary', 'gram-symmetry']) {
    await phone.click(`[data-preset="${c}"]`); await settle(phone);
    small.push(...await phone.evaluate(() => [...document.querySelectorAll('button, input[type=range], .crumb')].filter((el) => el.offsetParent && el.getClientRects().length).map((el) => [el.id || el.dataset.preset || el.dataset.snap || el.textContent.trim().slice(0, 12), el.getBoundingClientRect().height]).filter(([, h]) => h < 44 - 0.5)));
  }
  check('phone: every button and slider is at least 44 px tall', small.length === 0, JSON.stringify(small.slice(0, 5)));
  check('phone: no sideways scrolling', await phone.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth));
  await phone.context().close();
}

check('no page error, console error or failed request in the page checks', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
