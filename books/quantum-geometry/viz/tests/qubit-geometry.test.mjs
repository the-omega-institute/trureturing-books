#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/qubit-geometry (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/qubit-geometry.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// Reads page state through the read-only window.QG_DEBUG probe and checks it against an independent implementation
// written here: complex numbers as {re, im} objects, the textbook gate matrices, rotors from a power series of
// exp(−i(α/2) n̂·σ) (no closed form), Bloch vectors as ψ†σψ of the textbook state, and the sign convention of the tape.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'qubit-geometry';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));

/* ---------- independent implementation ---------- */
const cx = (re, im = 0) => ({ re, im });
const add = (a, b) => cx(a.re + b.re, a.im + b.im);
const mul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => cx(a.re, -a.im);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const mat = (rows) => rows.map((r) => r.map((z) => (typeof z === 'number' ? cx(z) : z)));
const mm = (A, B) => A.map((_, i) => B[0].map((__, j) => A[i].reduce((s, a, k) => add(s, mul(a, B[k][j])), cx(0))));
const madd = (A, B) => A.map((r, i) => r.map((z, j) => add(z, B[i][j])));
const msc = (A, z) => A.map((r) => r.map((w) => mul(w, z)));
const mdiff = (A, B) => Math.max(...A.flatMap((r, i) => r.map((z, j) => Math.hypot(z.re - B[i][j].re, z.im - B[i][j].im))));
const mv = (A, v) => A.map((r) => r.reduce((s, a, k) => add(s, mul(a, v[k])), cx(0)));
const tr = (A) => add(A[0][0], A[1][1]);
const det = (A) => add(mul(A[0][0], A[1][1]), mul(cx(-1), mul(A[0][1], A[1][0])));
const ID2 = mat([[1, 0], [0, 1]]);
const s2 = Math.SQRT1_2;
const sx = mat([[0, 1], [1, 0]]), sy = mat([[0, cx(0, -1)], [cx(0, 1), 0]]), sz = mat([[1, 0], [0, -1]]);
const TEXTBOOK = {
  I: ID2, X: sx, Y: sy, Z: sz, H: mat([[s2, s2], [s2, -s2]]), S: mat([[1, 0], [0, cx(0, 1)]]), T: mat([[1, 0], [0, cx(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4))]])
};
const AXIS = { x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1], h: [s2, 0, s2] };
const GATE_AXIS = { I: ['z', 0], X: ['x', Math.PI], Y: ['y', Math.PI], Z: ['z', Math.PI], H: ['h', Math.PI], S: ['z', Math.PI / 2], T: ['z', Math.PI / 4] };
/** exp(M) by its power series (40 terms are far below double precision for ‖M‖ ≤ 2π). */
function expm(M) {
  let term = ID2, sum = ID2;
  for (let k = 1; k < 60; k++) { term = msc(mm(term, M), cx(1 / k)); sum = madd(sum, term); }
  return sum;
}
const nsig = (n) => madd(madd(msc(sx, cx(n[0])), msc(sy, cx(n[1]))), msc(sz, cx(n[2])));
const rotorExp = (n, a) => expm(msc(nsig(n), cx(0, -a / 2)));
const ROTOR = Object.fromEntries(Object.entries(GATE_AXIS).map(([g, [ax, a]]) => [g, rotorExp(AXIS[ax], a)]));
const state = (thDeg, phDeg) => { const t = thDeg * Math.PI / 180, p = phDeg * Math.PI / 180; return [cx(Math.cos(t / 2)), cx(Math.sin(t / 2) * Math.cos(p), Math.sin(t / 2) * Math.sin(p))]; };
const blochOf = (psi) => [sx, sy, sz].map((S) => { const v = mv(S, psi); return mul(conj(psi[0]), v[0]).re + mul(conj(psi[1]), v[1]).re; });
/** Components (w, b₁, b₂, b₃) of a rotor matrix M = w − i b·σ: w = Re tr M / 2, b_k = −Im tr(Mσ_k) / 2. */
const comps = (M) => [tr(M).re / 2, ...[sx, sy, sz].map((S) => -tr(mm(M, S)).im / 2)];
const signOf = (q) => { for (const x of q) if (Math.abs(x) > 1e-9) return Math.sign(x); return 1; };
/** The circuit, step by step: textbook state, rotor product, Bloch vector, spinor and the tape sign. */
function model(th, ph, gates) {
  const psi0 = state(th, ph);
  let textbook = psi0, M = ID2;
  const steps = [{ r: blochOf(psi0), rotor: [1, 0, 0, 0], psi: psi0, sign: 1 }];
  for (const g of gates) {
    textbook = mv(TEXTBOOK[g], textbook);
    M = mm(ROTOR[g], M);
    const q = comps(M), psi = mv(M, psi0);
    steps.push({ r: blochOf(textbook), rotorR: blochOf(psi), rotor: q, psi, sign: signOf(q) });
  }
  return steps;
}
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;
const nearV = (u, v, tol = 1e-9) => u.length === v.length && u.every((x, i) => near(x, v[i], tol));
const eq = (x, y) => JSON.stringify(x) === JSON.stringify(y);

/* ---------- open ---------- */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
const D = (fn, arg) => page.evaluate(fn, arg);
/** Wait until every scheduled render has run (renders are batched into animation frames). */
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
check('opens on |ψ(60°, 36°)⟩ through H, Z, H with the finished ledger, α = 240° about ẑ, ⟨σ_z⟩ map', st.theta === 60 && st.phi === 36 && st.alpha === 240 && eq(st.gates, ['H', 'Z', 'H'])
  && st.pass === 3 && st.passes === 3 && st.axis === 'z' && st.obs === 'z', JSON.stringify(st));
check('page carries its id and the runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');

/* ---------- static bilingual parity of index.html & golden-carry CSS preservation ---------- */
const html = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'style.css'), 'utf8');
const themeCss = fs.readFileSync(path.join(ROOT, 'theme', 'viz', 'theme.css'), 'utf8');
{
  const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const blocks = (s) => { const out = []; let depth = 0, start = 0; for (let i = 0; i < s.length; i++) { if (s[i] === '{') depth++; else if (s[i] === '}') { depth--; if (depth === 0) { out.push(s.slice(start, i + 1).trim()); start = i + 1; } } } return out; };
  const gold = blocks(strip(fs.readFileSync(path.join(ROOT, 'books', 'example-monograph', 'viz', 'golden-carry', 'style.css'), 'utf8'))), mine = strip(css);
  const missing = gold.filter((b) => !mine.includes(b));
  check(`style.css keeps all ${gold.length} rule blocks of golden-carry verbatim (grid, media queries, embed, thumb, ledger, tape, map)`, gold.length > 60 && missing.length === 0, missing.slice(0, 2).join(' ‖ '));
  check('style.css: the stage is 210px tall (min 190px, flex 0 0 210px) inside the ledger panel', /\.stage \{[^}]*height: 210px; min-height: 190px; flex: 0 0 210px;/.test(mine));
  check('theme/viz/theme.css defines .lean.model .ok as var(--amber) and .lean.argued .ok as var(--violet)', /\.lean\.model \.ok \{\s*color: var\(--amber\);\s*\}/.test(themeCss) && /\.lean\.argued \.ok \{\s*color: var\(--violet\);\s*\}/.test(themeCss));
}
const count = (re) => (html.match(re) || []).length;
check('index.html has equally many class="zh" and class="en" fragments', count(/class="zh"/g) === count(/class="en"/g) && count(/class="zh"/g) > 30, `${count(/class="zh"/g)} vs ${count(/class="en"/g)}`);

/* ---------- the golden-carry frame, element by element ---------- */
const dom = await D(() => {
  const q = (s) => !!document.querySelector(s), n = (s) => document.querySelectorAll(s).length;
  return {
    deck: q('.app > aside.col.deck > section.panel.sec#inputs + section.panel.sec#readouts[aria-live="polite"]'),
    inputs: n('#inputs > .num-field > .stepper > input[type=number]') === 3 && n('#inputs > .num-field > input[type=range]') === 3
      && q('#inputs > h2 > .aside') && q('#inputs > .chips.presets#presets #swap') && q('#presets #random') && q('#presets #reset') && n('#presets [data-preset]') === 5 && n('#gates [data-gate]') === 7,
    readouts: n('#readouts dl.ro > div:not(.wide)') === 6 && n('#readouts dl.ro > div.wide.deficit') === 1 && n('#readouts dl.ro > div.wide:not(.deficit)') === 2
      && q('dl.ro .deficit dd > b#roHero.vpos + .sub#roHeroSub + .okmark') && q('#readouts > p.note#roNote'),
    center: q('.app > main.center > section.panel.ledger#ledgerPanel + footer.rail#rail'),
    ledger: q('#ledgerPanel > .head > h2#ledgerTitle + .aside') && n('#ledgerPanel > .rules > .rule') === 4 && ['r0', 'r1', 'rj', 'ra'].every((c) => q(`.rules > .rule.${c} > b + i`))
      && q('#ledgerPanel > .rules + .stage#blochStage + .sheetwrap#sheetWrap > .digits#ledger') && q('#ledgerPanel > .sheetwrap + .tape-row > .tape-label + .tape#tape + .tape-sum#tapeSum')
      && q('#ledgerPanel > .toast#toast[role="status"]'),
    stage: q('#blochStage > canvas#blochCanvas + .scan') && ['tl', 'tr', 'bl', 'br'].every((c) => q(`#blochStage > .bracket.${c}`)) && q('#blochStage > .hud-tl > #hudBig.big + #hudSub.sub')
      && q('#blochStage > .hud-tr.chips#viewChips') && n('#viewChips [data-axis]') === 4,
    rail: ['first', 'prev', 'play', 'next', 'last'].every((id) => q(`#rail > .transport > button.tbtn#${id}`)) && q('#rail > .clock > .tau#passLabel + input[type=range]#pass') && q('#rail > .keys'),
    side: q('.app > aside.col.side > section.panel.sec.heatpanel#heatPanel[data-thumb] + section.panel.sec#evidence'),
    heat: q('#heatPanel > h2.thumb-hide > .aside#heatRange') && q('#heatPanel > .heatwrap > canvas#heat + .scan') && q('#heatPanel > .chips.thumb-hide#nChips') && n('#nChips [data-obs]') === 3
      && ['pos', 'zero', 'neg', 'cur'].every((c) => q(`#heatPanel > ul.legend.thumb-hide .sw.${c}`)) && q('#heatPanel > p.note.thumb-hide#heatCounts + p.note.thumb-hide#heatHover'),
    evidence: n('#evidence > .lean:not(.num):not(.model):not(.argued):not(.open)') === 5 && n('#evidence > .lean.model') === 1 && n('#evidence > .lean.num') === 1
      && q('#evidence > button.chip#infoBtn') && q('.drawer#drawer[hidden] > .sheet'),
    classes: [...document.querySelectorAll('#evidence [class*="lean"]')].every((e) => [...e.classList].every((c) => ['lean', 'num', 'model', 'argued', 'open', 'leanref'].includes(c)))
  };
});
check('DOM: aside.col.deck holds #inputs (3 steppers + sliders, 5 presets + Swap/Random/Reset, 7 gate chips) and #readouts', dom.deck && dom.inputs, JSON.stringify(dom));
check('DOM: #readouts has 6 half-width readouts, 1 hero .wide.deficit, 2 .wide verification rows and #roNote', dom.readouts, JSON.stringify(dom));
check('DOM: main.center holds #ledgerPanel (head, 4 rules r0/r1/rj/ra, Bloch .stage, .sheetwrap > .digits#ledger, .tape-row, .toast) and footer.rail', dom.center && dom.ledger && dom.rail, JSON.stringify(dom));
check('DOM: the Bloch stage has #blochCanvas, .scan, four brackets, .hud-tl (#hudBig, #hudSub) and .hud-tr.chips#viewChips', dom.stage, JSON.stringify(dom));
check('DOM: aside.col.side holds #heatPanel[data-thumb] (heatwrap, #nChips, 4-swatch legend, #heatCounts, #heatHover) and #evidence', dom.side && dom.heat, JSON.stringify(dom));
check('DOM: #evidence has 5 LEAN boxes, one MODEL, one NUM, only standard .lean classes, and #infoBtn for #drawer', dom.evidence && dom.classes, JSON.stringify(dom));

/* ---------- the ledger rows ---------- */
const rows = await D(() => [...document.querySelectorAll('#ledger .drow')].map((r) => ({ cls: r.className, pass: r.dataset.pass ?? null, cells: r.querySelectorAll('.cells span').length, sgn: r.querySelector('.sgn')?.textContent ?? null })));
check('ledger rows: .hdr, two .input rows (A, B), .sum #0, then .pass #1..#3 with .final on the last', rows.length === 7 && /\bhdr\b/.test(rows[0].cls) && /\binput\b/.test(rows[1].cls) && /\binput\b/.test(rows[2].cls)
  && /\bsum\b/.test(rows[3].cls) && rows[3].pass === '0' && rows.slice(4).every((r, k) => /\bpass\b/.test(r.cls) && r.pass === String(k + 1)) && rows.filter((r) => /\bfinal\b/.test(r.cls)).length === 1 && /\bfinal\b/.test(rows[6].cls)
  && rows.every((r) => r.cells === 7), JSON.stringify(rows));
check('ledger: H·Z·H from |ψ(60°, 36°)⟩ has signs +1, +1, −1, −1 and the tape shows +, −, −', eq(rows.slice(3).map((r) => r.sgn), ['+1', '+1', '−1', '−1'])
  && eq(await D(() => [...document.querySelectorAll('#tape i')].map((i) => i.className.split(' ')[0])), ['pos', 'neg', 'neg']), JSON.stringify(rows.map((r) => r.sgn)));
check('ledger: the final row reports the Bloch vector and the spinor sign', /r = \(0\.70,−0\.51,−0\.50\), s = −1 ✓/.test(await text('#ledger .drow.final')), await text('#ledger .drow.final'));

/* ---------- algebra checked on the page and here ---------- */
const alg = await D(() => {
  const m = QG_DEBUG.math;
  return { vol: m.verifyPauliVolume(), hzh: m.verifyHadamardConjugation(), dc: ['x', 'y', 'z', 'h'].map((a) => m.verifyDoubleCover(a)), gates: m.GATES,
    comps: Object.fromEntries(Object.entries(m.GATES).map(([g, G]) => [g, m.rotorComponents(m.AXES[G.axis], G.angle)])) };
});
const XYZ = mm(mm(sx, sy), sz);
check('σ₁σ₂σ₃ = i·I₂ (page and here); it is skew-adjoint and unitary and squares to −I', alg.vol.err < 1e-15 && alg.vol.skewErr < 1e-15 && alg.vol.unitErr < 1e-15 && alg.vol.squareErr < 1e-15
  && mdiff(XYZ, msc(ID2, cx(0, 1))) < 1e-15 && mdiff(mm(XYZ, XYZ), msc(ID2, cx(-1))) < 1e-15, JSON.stringify(alg.vol));
check('H σ₃ H = σ₁ (page and here), and R_H R_Z R_H = −R_X as rotors', alg.hzh.err < 1e-12 && alg.hzh.rotorNegErr < 1e-12
  && mdiff(mm(mm(TEXTBOOK.H, sz), TEXTBOOK.H), sx) < 1e-12 && mdiff(mm(mm(ROTOR.H, ROTOR.Z), ROTOR.H), msc(ROTOR.X, cx(-1))) < 1e-12, JSON.stringify(alg.hzh));
check('R_n̂(2π) = −1, R_n̂(4π) = +1 and B_n̂² = −I for the axes x̂, ŷ, ẑ, ĥ (page), and exp(−iπ n̂·σ) = −I here', alg.dc.every((d) => d.errTwoPi < 1e-12 && d.errFourPi < 1e-12 && d.bivectorSquareErr < 1e-12)
  && Object.values(AXIS).every((n) => mdiff(rotorExp(n, 2 * Math.PI), msc(ID2, cx(-1))) < 1e-12 && mdiff(rotorExp(n, 4 * Math.PI), ID2) < 1e-12));
check('each gate rotor equals its axis-angle form, its power-series exponential, lies in SU(2) and matches the textbook gate up to a global phase',
  Object.entries(alg.gates).every(([g, G]) => nearV(G.rotor, alg.comps[g], 1e-12) && nearV(G.rotor, comps(ROTOR[g]), 1e-12)
    && near(det(ROTOR[g]).re, 1, 1e-12) && near(det(ROTOR[g]).im, 0, 1e-12) && near(Math.hypot(tr(mm(ROTOR[g].map((r, i) => r.map((_, j) => conj(ROTOR[g][j][i]))), TEXTBOOK[g])).re, tr(mm(ROTOR[g].map((r, i) => r.map((_, j) => conj(ROTOR[g][j][i]))), TEXTBOOK[g])).im), 2, 1e-12)));

/* ---------- presets ---------- */
const presetCases = [
  ['0,0|', [0, 0, 1], 1], ['0,0|H', [1, 0, 0], 1], ['0,0|H,S', [0, 1, 0], -1], ['0,0|H,T', [s2, s2, 0], -1], ['0,0|H,Z,H', [0, 0, -1], -1]
];
for (const [code, r, sign] of presetCases) {
  await page.click(`#presets [data-preset="${code}"]`); await settle();
  const s = await D(() => QG_DEBUG.state()), x = await D(() => QG_DEBUG.info());
  const [ang, gs] = code.split('|'), gates = gs ? gs.split(',') : [];
  const m = model(...ang.split(',').map(Number), gates).at(-1);
  check(`preset ${code} applies, is marked and ends at r = (${r.map((v) => v.toFixed(2)).join(', ')}) with s = ${sign > 0 ? '+1' : '−1'}`,
    eq(s.gates, gates) && s.theta === 0 && s.phi === 0 && s.pass === gates.length && nearV(x.steps.at(-1).r, r) && nearV(m.r, r) && x.finalSign === sign && m.sign === sign
    && (await D((q) => document.querySelector(`#presets [data-preset="${q}"]`).getAttribute('aria-pressed'), code)) === 'true', JSON.stringify(x.steps.at(-1)));
}
let info = await D(() => QG_DEBUG.info());
check('H·Z·H = X: the accumulated rotor is −R_X = (0, −1, 0, 0) and the readouts say s = −1', nearV(info.steps.at(-1).rotor, [0, -1, 0, 0]) && /−1/.test(await text('#pillC')) && /终态 s = −1/.test(await text('#tapeSum')));

/* ---------- circuits: Bloch vector, rotor, spinor and sign against the independent model ---------- */
const NAMES = ['I', 'X', 'Y', 'Z', 'H', 'S', 'T'];
let seed = 11; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const circuits = [[60, 36, ['H', 'Z', 'H']], [0, 0, ['X', 'X']], [90, 0, ['S', 'S', 'S', 'S']], [180, 0, ['H']], [45, 300, ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T']], [30, 200, []]];
for (let k = 0; k < 80; k++) circuits.push([Math.floor(rnd() * 181), Math.floor(rnd() * 361), Array.from({ length: Math.floor(rnd() * 9) }, () => NAMES[Math.floor(rnd() * 7)])]);
let circOK = true, circBad = '';
for (const [th, ph, gates] of circuits) {
  await D(([a, b, g]) => QG_DEBUG.set(a, b, g), [th, ph, gates]);
  const x = await D(() => QG_DEBUG.info()), m = model(th, ph, gates);
  const ok = x.theta === th && x.phi === ph && eq(x.gates, gates) && x.steps.length === m.length && x.steps.every((s, k) => {
    const n = m[k], psi = s.psi.map(([re, im]) => cx(re, im));
    const touched = k ? [...m[k].r, ...m[k].rotor].map((v, j) => (Math.abs(v - [...m[k - 1].r, ...m[k - 1].rotor][j]) > 1e-6 ? j : -1)).filter((j) => j >= 0) : [];
    return nearV(s.r, n.r) && nearV(s.rotor, n.rotor) && psi.every((z, i) => near(z.re, n.psi[i].re) && near(z.im, n.psi[i].im)) && s.sign === n.sign
      && (k === 0 || nearV(n.rotorR, n.r)) && near(s.r[0] ** 2 + s.r[1] ** 2 + s.r[2] ** 2, 1) && eq(s.touched, touched);
  }) && near(x.born[0], abs2(m[x.pass].psi[0])) && near(x.born[0] + x.born[1], 1) && near(x.born[0], (1 + m[x.pass].r[2]) / 2);
  if (!ok) { circOK = false; circBad = `(${th}, ${ph}, ${gates.join('')}) ${JSON.stringify(x.steps.at(-1))} vs ${JSON.stringify(m.at(-1))}`; break; }
}
check(`${circuits.length} circuits: Bloch vectors (= textbook ψ†σψ), rotor products, spinors, tape signs, touched cells and Born weights all match; ‖r‖ = 1, P(0) + P(1) = 1`, circOK, circBad);
await D(() => QG_DEBUG.set(0, 0, ['X', 'X'])); await settle();
check('X·X: the vector is back (r = e₃) but the rotor is −1, so the tape ends on −1', nearV((await D(() => QG_DEBUG.info())).steps.at(-1).rotor, [-1, 0, 0, 0]) && (await D(() => QG_DEBUG.info())).finalSign === -1);

/* ---------- the probe rotor Rₙ(α) and the double cover ---------- */
await D(() => QG_DEBUG.set(60, 36, ['H', 'Z', 'H'])); await D(() => QG_DEBUG.setAlpha(360)); await settle();
info = await D(() => QG_DEBUG.info());
check('α = 360°: tr R = −2 and the probe brings the vector back (ghost = r)', near(info.probe.trace, -2) && nearV(info.probe.ghost, info.steps.at(-1).r, 1e-12) && (await text('#roTr')).startsWith('−2.0000'), await text('#roTr'));
await page.click('#viewChips [data-axis="x"]'); await D(() => QG_DEBUG.setAlpha(90)); await settle();
info = await D(() => QG_DEBUG.info());
const rx = info.steps.at(-1).r, ghostX = blochOf(mv(rotorExp(AXIS.x, Math.PI / 2), mv(mm(mm(ROTOR.H, ROTOR.Z), ROTOR.H), state(60, 36))));
check('axis chip x̂ and α = 90°: tr R = √2 and the ghost is r turned 90° about x̂', (await D(() => QG_DEBUG.state().axis)) === 'x' && near(info.probe.trace, Math.SQRT2) && nearV(info.probe.ghost, ghostX)
  && near(info.probe.ghost[0], rx[0]) && (await D(() => document.querySelector('#viewChips [data-axis="x"]').getAttribute('aria-pressed'))) === 'true' && /R_x̂\(2π\) = −1 ✓/.test(await text('#roTwoPi')));
check('readouts: r_x, r_y, r_z, P(0), P(1) of the current step; hero σ₁σ₂σ₃ = i · I₂ ✓; H σ₃ H = σ₁ ✓', await D(() => {
  const x = QG_DEBUG.info(), r = x.steps[x.pass].r, f = (v) => (v < 0 && Math.abs(v).toFixed(4) !== '0.0000' ? '−' : '') + Math.abs(v).toFixed(4);
  const t = (id) => document.getElementById(id).textContent;
  return t('roRx').startsWith(f(r[0])) && t('roRy').startsWith(f(r[1])) && t('roRz').startsWith(f(r[2])) && t('roP0').startsWith(f(x.born[0])) && t('roP1').startsWith(f(x.born[1]))
    && t('roHero') === 'σ₁σ₂σ₃ = i · I₂' && document.getElementById('roHeroOk').textContent === '✓' && /H σ₃ H = σ₁ ✓/.test(t('roHZH'));
}));
await page.click('#viewChips [data-axis="z"]'); await D(() => QG_DEBUG.setAlpha(240)); await settle();

/* ---------- the phase map ---------- */
for (const obs of ['z', 'x', 'y']) {
  await page.click(`#nChips [data-obs="${obs}"]`); await settle();
  const grid = await D((o) => QG_DEBUG.grid(o), obs), idx = { x: 0, y: 1, z: 2 }[obs];
  let ok = grid.length === 37 * 37, bad = '';
  for (let i = 0; i < 37 && ok; i++) for (let j = 0; j < 37; j++) {
    const v = blochOf(state(5 * i, 10 * j))[idx];
    if (!near(grid[i * 37 + j], v, 1e-12)) { ok = false; bad = `(${5 * i}°, ${10 * j}°) page ${grid[i * 37 + j]} mine ${v}`; break; }
  }
  check(`⟨σ_${obs}⟩ map: all 1369 cells agree with ψ†σψ of the textbook state; chip pressed; counts cover the grid`, ok
    && (await D(() => document.querySelector('#nChips [aria-pressed="true"]').dataset.obs)) === obs && (await text('#heatCounts')).includes('1369') && /✓/.test(await text('#heatCounts'))
    && (await text('#heatRange')) === '180° × 360°', bad);
}
await page.click('#nChips [data-obs="z"]'); await settle();
const pt = await D(() => QG_DEBUG.cellPoint(45, 120));
await page.mouse.click(pt.x, pt.y); await settle();
st = await D(() => QG_DEBUG.state());
check('clicking the phase map sets the initial state (θ, φ) = (45°, 120°) and keeps the gates', st.theta === 45 && st.phi === 120 && eq(st.gates, ['H', 'Z', 'H']), JSON.stringify(st));
const lit = (id) => D((i) => { const c = document.getElementById(i), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let k = 0; k < d.length; k += 4) if (d[k] + d[k + 1] + d[k + 2] > 200) n++; return n; }, id);
check('the phase map and the Bloch stage are drawn', (await lit('heat')) > 2000 && (await lit('blochCanvas')) > 300);

/* ---------- controls ---------- */
await page.fill('#thetaNum', '30'); await page.press('#thetaNum', 'Enter'); await settle();
await page.locator('#phi').fill('200'); await settle();
st = await D(() => QG_DEBUG.state());
check('number box and slider set θ = 30, φ = 200', st.theta === 30 && st.phi === 200 && (await D(() => document.getElementById('theta').value)) === '30' && (await D(() => document.getElementById('phiNum').value)) === '200');
await page.click('#thetaInc'); await page.click('#phiDec'); await page.click('#alphaInc'); await settle();
st = await D(() => QG_DEBUG.state());
check('steppers move θ up, φ down and α up by one degree', st.theta === 31 && st.phi === 199 && st.alpha === 241);
await page.fill('#thetaNum', '999'); await page.press('#thetaNum', 'Enter'); await settle();
await page.fill('#alphaNum', '-5'); await page.press('#alphaNum', 'Enter'); await settle();
st = await D(() => QG_DEBUG.state());
check('out-of-range input is clamped (θ = 180, α = 0)', st.theta === 180 && st.alpha === 0);
await page.click('#reset'); await settle();
st = await D(() => QG_DEBUG.state());
check('Reset restores |ψ(60°, 36°)⟩ → H, Z, H, α = 240° about ẑ', st.theta === 60 && st.phi === 36 && st.alpha === 240 && eq(st.gates, ['H', 'Z', 'H']) && st.axis === 'z' && st.pass === 3);
await page.click('#gates [data-gate="S"]'); await page.click('#gates [data-gate="T"]'); await settle();
st = await D(() => QG_DEBUG.state());
check('gate chips append +S, +T and jump to the new last step', eq(st.gates, ['H', 'Z', 'H', 'S', 'T']) && st.pass === 5 && (await D(() => document.querySelectorAll('#ledger .drow.pass').length)) === 5);
await page.click('#swap'); await settle();
check('Swap order reverses the gate sequence', eq((await D(() => QG_DEBUG.state())).gates, ['T', 'S', 'H', 'Z', 'H']));
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('y'); await page.keyboard.press('Backspace'); await page.keyboard.press('Backspace'); await page.keyboard.press('x'); await settle();
check('keys: a gate letter appends, ⌫ removes the last gate', eq((await D(() => QG_DEBUG.state())).gates, ['T', 'S', 'H', 'Z', 'X']));
await page.click('#random'); await settle();
st = await D(() => QG_DEBUG.state());
check('Random picks a state and 1–6 gates', st.theta >= 0 && st.theta <= 180 && st.phi >= 0 && st.phi < 360 && st.gates.length >= 1 && st.gates.length <= 6 && st.gates.every((g) => NAMES.includes(g)));

/* ---------- transport ---------- */
await page.click('#reset'); await settle();
await page.click('#first'); await settle();
check('⏮ returns to #0, later rows dimmed', (await D(() => QG_DEBUG.state().pass)) === 0 && (await D(() => document.querySelectorAll('#ledger .drow.future').length)) === 3);
await page.click('#next'); await page.click('#next'); await settle();
check('▶▶ steps one gate at a time and marks the current row and tape square', (await D(() => QG_DEBUG.state().pass)) === 2 && (await D(() => document.querySelector('#ledger .drow.now').dataset.pass)) === '2'
  && (await D(() => document.querySelector('#tape i.now').dataset.pass)) === '2' && /^第2 步 \/ 3$/.test(await text('#hudBig')));
await page.click('#prev'); await settle();
check('◀ steps back', (await D(() => QG_DEBUG.state().pass)) === 1);
await page.click('#last'); await settle();
check('⏭ jumps to the final state', (await D(() => QG_DEBUG.state().pass)) === 3);
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('ArrowLeft'); await settle();
check('← steps back from the keyboard', (await D(() => QG_DEBUG.state().pass)) === 2);
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); await settle();
check('Home and → work from the keyboard', (await D(() => QG_DEBUG.state().pass)) === 1);
await page.click('#ledger .drow[data-pass="2"]'); await settle();
check('clicking a ledger row selects that step', (await D(() => QG_DEBUG.state().pass)) === 2);
await page.click('#tape i[data-pass="3"]'); await settle();
check('clicking a tape square selects that step', (await D(() => QG_DEBUG.state().pass)) === 3);
await page.click('#first'); await page.click('#play'); await settle();
check('▶ plays the circuit', (await D(() => QG_DEBUG.state().playing)) === true);
await page.waitForFunction(() => !QG_DEBUG.state().playing, null, { timeout: 15000 }).catch(() => {});
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 5000 }).catch(() => {});
check('playback stops at the final state and reports the spinor sign', (await D(() => QG_DEBUG.state().pass)) === 3 && /线路完成：3 个门，旋量符号 −1/.test(await text('#toast')), await text('#toast'));

/* ---------- colour semantics ---------- */
const colours = await D(() => {
  const rgb = (v) => { const c = document.createElement('i'); c.style.color = getComputedStyle(document.documentElement).getPropertyValue(v); document.body.append(c); const o = getComputedStyle(c).color; c.remove(); return o; };
  const OK = rgb('--tr-ok'), AMBER = rgb('--tr-amber');
  const greens = [], ambers = [];
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('#drawer')) continue;
    const cs = getComputedStyle(el);
    if (cs.color === OK || cs.backgroundColor === OK) greens.push(el);
    if (cs.color === AMBER || cs.backgroundColor === AMBER) ambers.push(el);
  }
  const allowAmber = '#pillPair, #pillPair *, .stepper input, .drow.now .lab, .drow.now .cells span, #passLabel, #passLabel *, #hudBig, .lean.model .ok';
  return {
    greens: greens.length, greenOK: greens.length >= 5 && greens.every((e) => (e.matches('.lean:not(.num):not(.model) > .ok') && e.textContent === 'LEAN ✓') || e.matches('.leanref code')),
    ambers: ambers.map((e) => `${e.tagName}#${e.id}.${e.className}`), amberOK: ambers.length >= 2 && ambers.every((e) => e.matches(allowAmber))
  };
});
check('green appears only on LEAN ✓ badges and the frozen theorem names they link', colours.greenOK, JSON.stringify(colours));
check('amber appears only on "now": the input pill, the current values, the current row, the step clock, the HUD step and the MODEL tag', colours.amberOK, JSON.stringify(colours.ambers));

/* ---------- Lean links at the pinned commit; drawer ---------- */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file and line of trureturing.lock.json, and names a theorem', links.length >= 10 && links.every(([gid, href]) => {
  const d = lock.declarations[gid]; return d && d.kind === 'theorem' && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 2)));
const cites = new Set(links.map(([g]) => g));
const GIDS = ['D5/S3/Quantum/FiniteDimensional.qubit_weyl_star', 'D5/S3/Quantum/Algebra/Unitary/BalancedUnitaryComplexStructure.square_eq_neg_one_of_skewAdjoint_unitary',
  'D5/S3/Quantum/Information/ActualPureQubitGeometry.bloch_geometry_of_isHermitian', 'D5/S3/Observer/Conditioning.recordWeight_sum', 'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity'];
check('the page cites qubit_weyl_star, square_eq_neg_one_of_skewAdjoint_unitary, bloch_geometry_of_isHermitian, recordWeight_sum and lagrange_gram_identity', GIDS.every((g) => cites.has(g)) && cites.size === 5);
const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('the registry entry lists the same five theorems', eq(reg.lean.map((l) => l.gid).sort(), [...GIDS].sort()));
await page.click('#infoBtn');
check('theory drawer opens', (await D(() => document.getElementById('drawer').hidden)) === false);
check('the drawer says the page is a numerical illustration, not a proof, and marks H·Z·H = X as a hand computation', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en'))
  && /不是所引的 Lean 定理/.test(await text('#drawer div.zh')) && /not one of the cited Lean theorems/.test(await text('#drawer div.en')));
await page.keyboard.press('Escape');
check('Esc closes the drawer and focus returns to its button', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* ---------- language ---------- */
await page.click('[data-lang-set="en"]'); await settle();
let left = await cjkLeftovers(page);
check('no visible Chinese in English mode', left.length === 0, left.slice(0, 6).join(' | '));
for (const p of ['0,0|H,Z,H', '0,0|H,S']) {
  await page.click(`#presets [data-preset="${p}"]`); await settle();
  await page.click('#first'); await settle();
  left = await cjkLeftovers(page);
  check(`no visible Chinese in English mode after preset ${p}`, left.length === 0, left.slice(0, 6).join(' | '));
}
await page.click('#infoBtn');
left = await cjkLeftovers(page);
check('no visible Chinese in the English drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title', (await D(() => document.title)).startsWith('ORTHO//QUBIT · Qubit rotor ledger'));
await page.click('#presets [data-preset="0,0|H"]'); await settle();
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('Home'); await settle(); await page.click('#play');
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 10000 }).catch(() => {});
check('the end-of-playback toast is in English', /^Circuit done after 1 gate: spinor sign \+1$/.test(await text('#toast')), await text('#toast'));

/* ---------- hub round trip (the crumb leads to ../ = the book's visualization index) ---------- */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, which keeps the language and lists this visualization', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D(() => document.querySelectorAll('.card[data-viz="qubit-geometry"]').length)) === 1 && (await D(() => !!document.querySelector('.card[data-viz="qubit-geometry"] img[src="qubit-geometry/thumb.jpg"]'))));
check('the choice is remembered under the site-wide key tr-lang', (await D(() => localStorage.getItem('tr-lang'))) === 'en');
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click('.card[data-viz="qubit-geometry"] .enter'); await page.waitForLoadState('load');
await page.waitForFunction(() => window.QG_DEBUG && QG_DEBUG.frames() > 0, null, { timeout: 30000 });
check('the hub card opens this page', (await D(() => document.body.dataset.vizId)) === ID);

/* ---------- layouts ---------- */
for (const lang of ['zh', 'en']) {
  for (const [w, h] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: h });
    await open(`?lang=${lang}`); await settle();
    check(`no horizontal scroll at ${w}px (${lang})`, (await overflowX(page)) === 0);
  }
}
const frame = () => D(() => {
  const r = (id) => document.getElementById(id).getBoundingClientRect().toJSON();
  return { cols: getComputedStyle(document.querySelector('.app')).gridTemplateColumns.split(' ').map(parseFloat), inputs: r('inputs'), readouts: r('readouts'), ledger: r('ledgerPanel'), heat: r('heatPanel'), evidence: r('evidence') };
});
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
let fr = await frame();
check('1440px: three columns 270–310 | 1fr | 320–400 — deck, ledger, phase map side by side with aligned tops', fr.cols.length === 3 && fr.cols[0] >= 270 && fr.cols[0] <= 310 && fr.cols[2] >= 320 && fr.cols[2] <= 400
  && fr.ledger.left > fr.inputs.right - 1 && fr.heat.left > fr.ledger.right - 1 && Math.abs(fr.inputs.top - fr.ledger.top) < 2 && Math.abs(fr.ledger.top - fr.heat.top) < 2 && fr.evidence.top >= fr.heat.bottom - 1, JSON.stringify(fr));
await page.setViewportSize({ width: 1000, height: 900 });
await open('?lang=zh'); await settle();
fr = await frame();
check('1000px: two columns; the ledger spans the full width below the deck, then the side panels', fr.cols.length === 2 && fr.ledger.top >= fr.readouts.bottom - 1 && fr.heat.top >= fr.ledger.bottom - 1
  && fr.ledger.width > 1.8 * fr.inputs.width && (await overflowX(page)) === 0, JSON.stringify(fr));
await page.setViewportSize({ width: 390, height: 844 });
await open('?lang=zh'); await settle();
fr = await frame();
check('390px: one column in the order inputs → ledger → readouts → phase map → evidence', fr.cols.length === 1 && fr.ledger.top >= fr.inputs.bottom - 1 && fr.readouts.top >= fr.ledger.bottom - 1
  && fr.heat.top >= fr.readouts.bottom - 1 && fr.evidence.top >= fr.heat.bottom - 1, JSON.stringify(fr));
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en'); await settle();
check('?embed=1 hides the header, crumb and key help', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en starts in English', (await D(() => TRV.lang())) === 'en' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, no horizontal scroll', (await overflowX(page)) === 0 && (await D(() => { const a = document.getElementById('inputs').getBoundingClientRect(), b = document.getElementById('ledgerPanel').getBoundingClientRect(); return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40; })));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await settle();
check('?thumb=1: the phase-map panel fills the frame', await D(() => { const r = document.getElementById('heat').getBoundingClientRect(); return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720; }));
const cover = await D(async () => {
  const proto = CanvasRenderingContext2D.prototype, orig = proto.fillText, words = [];
  proto.fillText = function (t, ...a) { if (this.canvas.id === 'heat') words.push(String(t)); return orig.call(this, t, ...a); };
  await TRV_THUMB();
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  proto.fillText = orig;
  const c = document.getElementById('heat'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let leftLit = 0, rightLit = 0;
  for (let k = 0; k < d.length; k += 4) if (d[k] + d[k + 1] + d[k + 2] > 200) { if ((k / 4) % c.width < c.width / 2) leftLit++; else rightLit++; }
  return { words, leftLit, rightLit, state: QG_DEBUG.state() };
});
check('?thumb=1 cover: the phase map on the left, the ledger rows on the right, both drawn', cover.leftLit > 20000 && cover.rightLit > 2000 && eq(cover.state.gates, ['H', 'S', 'H', 'T', 'Z', 'H']), JSON.stringify({ l: cover.leftLit, r: cover.rightLit }));
check('?thumb=1 cover has no words: only row labels, digits and signs', cover.words.length > 40 && cover.words.every((w) => /^(A|B|#\d+|[+−]?\d+(\.\d+)?|·)$/.test(w)), cover.words.filter((w) => !/^(A|B|#\d+|[+−]?\d+(\.\d+)?|·)$/.test(w)).slice(0, 6).join(' | '));
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
