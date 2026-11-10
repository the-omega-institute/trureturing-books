#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/timeless-causal-crystal (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/timeless-causal-crystal.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// Reads page state through the read-only window.TCC_DEBUG probe and checks it against an independent implementation
// written here: the Gram window from explicit unit vectors and a cofactor determinant, the de-ordered Taylor series by the
// term recurrence t_k = −t_{k−1} θ²/((2k − 1)2k), factorials in BigInt, amplitude amplification by the two-amplitude
// recursion, no signalling by a closed-form partial trace, the Page–Wootters crystal as one flat vector with a dense
// Hamiltonian, and the barrier potential recomputed here. Then it checks the golden-carry page frame (three columns, the
// ledger with its stage, sign tape and rail, the phase-map panel), drives every control, checks the Lean citations against
// trureturing.lock.json, both languages, the hub round trip and the layouts.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'timeless-causal-crystal';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const html = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'index.html'), 'utf8');
const CJK = /[　-〿㐀-鿿＀-￯]/;
const LEAN = [
  'D5/S3/Observer/Conditioning.unreadState_fixed_iff',
  'D5/S3/Observer/Conditioning.conditionalState_isState',
  'D5/S3/Observer/Conditioning/RankOneBornPairingWeight.rank_one_born_pairing_weight',
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/Quantum/PureState/UnitGramIndistinguishability.unit_gram_overlap_characterization',
  'D5/S3/Quantum/Recovery/CoherentUniformAmplification.uniform_operator_rotation',
  'D5/S3/Geometry/Riemannian/GradientDissipation.S2_dissipation'
];

/* =============================== independent mathematics =============================== */
const DEG = Math.PI / 180, TWO_PI = 2 * Math.PI;
const dot = (u, v) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
/** B at the pole, A at polar angle θ₁ (azimuth 0), C at polar angle θ₂ and azimuth φ. */
const triple = (t1, t2, phi) => ({ A: [Math.sin(t1), 0, Math.cos(t1)], B: [0, 0, 1], C: [Math.sin(t2) * Math.cos(phi), Math.sin(t2) * Math.sin(phi), Math.cos(t2)] });
/** det of the Gram matrix with c_AB = a, c_BC = b, c_AC = c, by cofactors. */
const gramDet = (a, b, c) => det3([[1, a, c], [a, 1, b], [c, b, 1]]);
/** n! in BigInt. */
const factBig = (n) => { let f = 1n; for (let i = 2n; i <= BigInt(n); i++) f *= i; return f; };
/** The cos series by the term recurrence (no powers, no factorial table). */
function cosPartials(t, K) { const out = []; let term = 1, s = 0; for (let k = 0; k <= K; k++) { if (k) term *= -t * t / ((2 * k - 1) * (2 * k)); s += term; out.push(s); } return out; }
function sinSum(t, K) { let term = t, s = 0; for (let k = 0; k <= K; k++) { if (k) term *= -t * t / ((2 * k) * (2 * k + 1)); s += term; } return s; }
/** The first K ≥ 1 with |θ|^(2K+2)/(2K+2)! < 1e−16 for all angles (magnitudes by the recurrence). */
function orderK(thetas) {
  for (let k = 1; k < 40; k++) {
    if (thetas.every((t) => { let m = 1; for (let j = 1; j <= 2 * k + 2; j++) m *= Math.abs(t) / j; return m < 1e-16; })) return k;
  }
  return 40;
}
/** Amplitude amplification on (target amplitude a, every other amplitude r): oracle a ↦ −a, then reflection about the mean. */
function groverModel(n, T) {
  const Nn = 2 ** n; let a = 1 / Math.sqrt(Nn), r = a; const out = [a];
  for (let t = 0; t < T; t++) { a = -a; const mean = (a + (Nn - 1) * r) / Nn; a = 2 * mean - a; r = 2 * mean - r; out.push(a); }
  return out;
}
/** No signalling in closed form: ρ_B = diag(cos²(θ₁/2), sin²(θ₁/2)); reading "+" gives M[b][b′] = P₊[b′][b] s_b s_b′ / p₊. */
function signalModel(t1, t2, phi) {
  const s = [Math.cos(t1 / 2), Math.sin(t1 / 2)], m = [Math.sin(t2) * Math.cos(phi), Math.sin(t2) * Math.sin(phi), Math.cos(t2)];
  const P = [[[(1 + m[2]) / 2, 0], [m[0] / 2, -m[1] / 2]], [[m[0] / 2, m[1] / 2], [(1 - m[2]) / 2, 0]]];
  const M = [0, 1].map((b) => [0, 1].map((b2) => [P[b2][b][0] * s[b] * s[b2], P[b2][b][1] * s[b] * s[b2]]));
  const p = M[0][0][0] + M[1][1][0], rhoB = [[s[0] ** 2, 0], [0, s[1] ** 2]];
  let d = 0; for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) d += (M[i][j][0] / p - rhoB[i][j]) ** 2 + (M[i][j][1] / p) ** 2;
  return { rhoB, pPlus: p, shiftPlus: Math.sqrt(d) };
}
/* the crystal as one flat vector, index 2j + m, amplitude e^{−i m τⱼ}/√(2N); H = H_C ⊗ I + I ⊗ H_S densely */
const N = 12, PAGES = Array.from({ length: N }, (_, j) => TWO_PI * j / N);
const Cx = (re, im = 0) => ({ re, im });
const cadd = (a, b) => Cx(a.re + b.re, a.im + b.im);
const cmul = (a, b) => Cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const abs2 = (a) => a.re * a.re + a.im * a.im;
const expi = (t) => Cx(Math.cos(t), Math.sin(t));
const PSI = [];
for (const t of PAGES) for (let m = 0; m < 2; m++) PSI.push(cmul(Cx(1 / Math.sqrt(2 * N)), expi(-m * t)));
const H = Array.from({ length: 2 * N }, () => Array.from({ length: 2 * N }, () => Cx(0)));
for (let l = 0; l < N; l++) for (let q = 0; q < N; q++) {
  let z = Cx(0);
  for (let k = 0; k < N; k++) z = cadd(z, cmul(Cx(-k / N), expi(-k * (PAGES[l] - PAGES[q]))));
  for (let m = 0; m < 2; m++) H[2 * l + m][2 * q + m] = cadd(H[2 * l + m][2 * q + m], z);
}
for (let l = 0; l < N; l++) H[2 * l + 1][2 * l + 1] = cadd(H[2 * l + 1][2 * l + 1], Cx(1));
const hNorm = Math.sqrt(H.map((row) => row.reduce((s, h, b) => cadd(s, cmul(h, PSI[b])), Cx(0))).reduce((s, z) => s + abs2(z), 0));
const sliceModel = (t) => [Cx(Math.SQRT1_2), cmul(Cx(Math.SQRT1_2), expi(-t))];
const Vbar = (x) => { const s1 = 5 - x[0], s2 = 25 - 4 * x[0] - x[1]; return -0.2 * (2 * x[0] + x[1]) - Math.log(x[0]) - Math.log(x[1]) - Math.log(s1) - Math.log(s2); };

/* =============================== open =============================== */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
const D = (fn, arg) => page.evaluate(fn, arg);
const settle = async () => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(() => !TCC_DEBUG.pending(), null, { timeout: 30000 });
};
const text = (sel) => D((s) => document.querySelector(s).textContent, sel);
const open = async (query) => {
  await T.goto(BOOK, ID, query);
  await page.waitForFunction(() => window.TCC_DEBUG && TCC_DEBUG.frames() > 0, null, { timeout: 30000 });
};
await open('?lang=zh');
let st = await D(() => TCC_DEBUG.state());
check('opens on the Gram window at θ₁ = 120°, θ₂ = 75°, φ = 60°, n = 8 with the finished ledger', st.view === 'gram' && st.t1 === 120 && st.t2 === 75 && st.phi === 60 && st.c === null && st.n === 8 && st.pass === st.passes && st.passes === orderK([120 * DEG, 75 * DEG, Math.acos(Math.cos(120 * DEG) * Math.cos(75 * DEG) + Math.sin(120 * DEG) * Math.sin(75 * DEG) * 0.5)]), JSON.stringify(st));
check('page carries its id and the runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');
{
  const css = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'style.css'), 'utf8');
  const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const blocks = (s) => { const out = []; let depth = 0, start = 0; for (let i = 0; i < s.length; i++) { if (s[i] === '{') depth++; else if (s[i] === '}') { depth--; if (depth === 0) { out.push(s.slice(start, i + 1).trim()); start = i + 1; } } } return out; };
  const gold = blocks(strip(fs.readFileSync(path.join(ROOT, 'books', 'example-monograph', 'viz', 'golden-carry', 'style.css'), 'utf8'))), mine = strip(css);
  const missing = gold.filter((b) => !mine.includes(b));
  check(`style.css keeps all ${gold.length} rule blocks of golden-carry verbatim (grid, media queries, embed, thumb, ledger, tape, map)`, gold.length > 60 && missing.length === 0, missing.slice(0, 2).join(' ‖ '));
  check('style.css: the stage is 210px tall (min 190px, flex 0 0 210px) inside the ledger panel', /\.stage \{[^}]*height: 210px; min-height: 190px; flex: 0 0 210px;/.test(mine));
  check('MODEL badge is amber and ARGUED badge is violet in computed styles', await D(() => {
    const rgb = (v) => { const c = document.createElement('i'); c.style.color = getComputedStyle(document.documentElement).getPropertyValue(v); document.body.append(c); const o = getComputedStyle(c).color; c.remove(); return o; };
    return getComputedStyle(document.querySelector('#evidence .lean.model .ok')).color === rgb('--tr-amber')
      && getComputedStyle(document.querySelector('#evidence .lean.argued .ok')).color === rgb('--tr-violet');
  }));
}

/* =============================== the golden-carry page frame =============================== */
const frame = await D(() => {
  const q = (s) => document.querySelector(s), all = (s) => [...document.querySelectorAll(s)];
  const ledger = q('#ledgerPanel');
  return {
    theme: document.documentElement.hasAttribute('data-theme'), inlineHead: [...document.head.querySelectorAll('script')].filter((s) => !s.src).length,
    headScripts: [...document.head.querySelectorAll('script[src]')].map((s) => s.getAttribute('src')),
    styles: [...document.head.querySelectorAll('link[rel=stylesheet]')].map((l) => l.getAttribute('href')).filter((h) => !h.startsWith('http')),
    bodyScripts: [...document.body.querySelectorAll('script')].map((s) => s.getAttribute('src')),
    header: !!q('header.top > .brand > a.crumb[href="../"]') && !!q('header.top .brand h1.logo') && !!q('header.top .brand .tagline') && !!q('header.top .status .langs[role=group] [data-lang-set="zh"]'),
    themes: all('.themes, [data-theme-set]').length,
    cols: [q('.app > aside.col.deck'), q('.app > main.center'), q('.app > aside.col.side')].map((e) => !!e),
    inputs: all('aside.deck > #inputs.panel.sec > .num-field').map((f) => !!f.querySelector('label') && f.querySelectorAll('.stepper > button').length === 2 && !!f.querySelector('.stepper > input[type=number]') && !!f.querySelector(':scope > input[type=range]')),
    presets: all('#inputs #presets.chips.presets > button.chip').length,
    roDivs: all('#readouts[aria-live] > dl.ro > div').map((d) => d.className),
    hero: !!q('#readouts dl.ro > div.wide.deficit dd > b#roDeficit') && !!q('#readouts dl.ro > div.wide.deficit dd > .sub#roDeficitSub') && !!q('#readouts dl.ro > div.wide.deficit dd > #roDeficitMark'),
    proofRows: all('#readouts dl.ro > div.wide:not(.deficit) dd').map((dd) => !!dd.querySelector(':scope > b') && !!dd.querySelector(':scope > .okmark, :scope > .badmark')),
    note: !!q('#readouts > p.note#roNote'),
    ledgerKids: ledger ? [...ledger.children].map((c) => c.className || c.tagName.toLowerCase()) : [],
    head: !!q('#ledgerPanel.panel.ledger[aria-labelledby=ledgerTitle] > .head > h2#ledgerTitle') && !!q('#ledgerPanel > .head > .aside'),
    rules: all('#ledgerPanel > .rules > .rule').map((r) => r.className),
    stage: !!q('#ledgerPanel > .stage#stage > canvas#stageCanvas') && !!q('#stage > .scan') && ['tl', 'tr', 'bl', 'br'].every((c) => !!q(`#stage > .bracket.${c}`))
      && !!q('#stage > .hud-tl > #hudBig.big') && !!q('#stage > .hud-tl > #hudSub.sub') && all('#stage > .hud-tr.chips#viewChips > button.chip[data-view-set]').length === 3,
    stageH: q('#stage') ? q('#stage').getBoundingClientRect().height : 0,
    sheet: !!q('#ledgerPanel > .sheetwrap > .digits#ledger'),
    tape: !!q('#ledgerPanel > .tape-row > .tape-label') && !!q('#ledgerPanel > .tape-row > .tape#tape') && !!q('#ledgerPanel > .tape-row > .tape-sum#tapeSum'),
    toast: !!q('#ledgerPanel > .toast#toast[role=status]'),
    rail: ['first', 'prev', 'play', 'next', 'last'].every((id) => !!q(`main.center > footer.rail#rail > .transport > button.tbtn#${id}`)) && !!q('footer.rail .clock > .tau#passLabel') && !!q('footer.rail .clock > input#pass[type=range]') && !!q('footer.rail > .keys'),
    heat: !!q('aside.side > section.panel.sec.heatpanel#heatPanel[data-thumb] > h2.thumb-hide > .aside#heatRange') && !!q('#heatPanel > .heatwrap > canvas#heat') && !!q('#heatPanel > .heatwrap > .scan')
      && all('#heatPanel > #nChips.chips.thumb-hide > button.chip[data-t2]').length === 4 && ['pos', 'zero', 'neg', 'cur'].every((c) => !!q(`#heatPanel > ul.legend.thumb-hide .sw.${c}`))
      && !!q('#heatPanel > p.note.thumb-hide#heatCounts') && !!q('#heatPanel > p.note.thumb-hide#heatHover'),
    side: !!q('aside.side > #evidence.panel.sec button.chip#infoBtn'),
    drawer: !!q('.drawer#drawer[hidden] > .sheet[role=dialog][aria-modal=true][aria-labelledby=drawerTitle]'),
    leanClasses: all('#evidence > div').map((d) => d.className), labels: all('#evidence > div > .ok').map((s) => s.textContent),
    banned: all('.lean-badge, .tier, .lean.interp, .subhead, .nowgroup, .vout, .stagepanel, .mappanel').length,
    grid: getComputedStyle(q('.app')).gridTemplateColumns
  };
});
check('no data-theme on <html> and no inline script in <head>', !frame.theme && frame.inlineHead === 0);
check('<head> loads ../assets/theme.css, style.css and ../assets/shell.js; main.js is the only body script', JSON.stringify(frame.styles) === '["../assets/theme.css","style.css"]' && JSON.stringify(frame.headScripts) === '["../assets/shell.js"]' && JSON.stringify(frame.bodyScripts) === '["main.js"]', JSON.stringify(frame));
check('header: crumb, logo, tagline and the language switch; no theme switch anywhere', frame.header && frame.themes === 0 && !/data-theme|tr-viz-theme/.test(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', ID, 'main.js'), 'utf8')));
check('three columns deck | center | side, as in golden-carry; the .app grid has three tracks at 1440 px', frame.cols.every(Boolean) && frame.grid.split(' ').length === 3, frame.grid);
check('inputs: three .num-field blocks (label, − number +, range) and eight preset/action chips', frame.inputs.length === 3 && frame.inputs.every(Boolean) && frame.presets === 8, JSON.stringify(frame.inputs));
check('readouts: six half-width items, one .wide.deficit hero with sub and mark, two .wide check rows, and the note', JSON.stringify(frame.roDivs) === JSON.stringify(['', '', '', '', '', '', 'wide deficit', 'wide', 'wide']) && frame.hero && frame.proofRows.length === 2 && frame.proofRows.every(Boolean) && frame.note, JSON.stringify(frame.roDivs));
check('ledger panel: head, four rules r0 r1 rj ra, the stage, the sheet, the sign tape and the toast, in the golden-carry order', frame.head && JSON.stringify(frame.rules) === '["rule r0","rule r1","rule rj","rule ra"]'
  && JSON.stringify(frame.ledgerKids) === '["head","rules","stage","sheetwrap","tape-row","toast"]' && frame.sheet && frame.tape && frame.toast, JSON.stringify(frame.ledgerKids));
check('stage: canvas, scan lines, four brackets, HUD and three view chips; 210 px tall at 1440 px', frame.stage && Math.abs(frame.stageH - 210) < 1, String(frame.stageH));
check('rail: ⏮ ◀ ▶ ▶▶ ⏭, the clock with its range, and the key help', frame.rail);
check('phase-map panel [data-thumb]: title with range, canvas, θ₂ chips, four-colour legend, counts and hover notes', frame.heat && frame.side && frame.drawer);
check('evidence uses only the standard boxes .lean / .num / .model / .argued / .open with their standard labels',
  frame.leanClasses.every((c) => ['lean', 'lean num', 'lean model', 'lean argued', 'lean open'].includes(c)) && frame.labels.every((l) => ['LEAN ✓', 'NUM', 'MODEL', 'ARGUED', 'OPEN'].includes(l)) && frame.banned === 0, JSON.stringify(frame.leanClasses) + JSON.stringify(frame.labels));
check('every .zh fragment of the page source has an .en partner', (html.match(/class="zh"/g) || []).length === (html.match(/class="en"/g) || []).length);
const rowsDom = await D(() => {
  const rows = [...document.querySelectorAll('#ledger > .drow')];
  return {
    kinds: rows.map((r) => r.className.replace(/\b(now|future)\b/g, '').trim()),
    parts: rows.every((r) => !!r.querySelector(':scope > .lab') && !!r.querySelector(':scope > .cells') && !!r.querySelector(':scope > .what')),
    sgn: [...document.querySelectorAll('#ledger > .drow[data-pass]')].every((r) => !!r.querySelector('.what > .sgn') && !!r.querySelector('.what > code') && !!r.querySelector('.what > .name')),
    cellCls: [...document.querySelectorAll('#ledger > .drow:not(.hdr) .cells > span')].every((s) => s.className.split(' ').every((c) => ['d0', 'd1', 'd2', 'touch'].includes(c))),
    tape: [...document.querySelectorAll('#tape > i')].map((i) => i.className.split(' ')[0])
  };
});
check('ledger rows: .hdr, .input, .sum (#0), .pass rows and the .final row, each with lab / cells / what (sign, code, name)',
  rowsDom.kinds[0] === 'drow hdr' && rowsDom.kinds[1] === 'drow input' && rowsDom.kinds[2] === 'drow sum' && rowsDom.kinds.slice(3, -1).every((k) => k === 'drow pass') && rowsDom.kinds[rowsDom.kinds.length - 1] === 'drow pass final'
  && rowsDom.parts && rowsDom.sgn && rowsDom.cellCls, JSON.stringify(rowsDom.kinds));

/* =============================== the Gram window =============================== */
let winErr = 0, detErr = 0, minDet = 1, invErr = 0, endErr = 0;
for (const a of [0, 15, 47, 90, 123, 180]) for (const b of [0, 30, 75, 110, 179]) for (const p of [0, 0.4, 1.2, 2.5, Math.PI]) {
  const t1 = a * DEG, t2 = b * DEG, v = triple(t1, t2, p), cAB = dot(v.A, v.B), cBC = dot(v.B, v.C), cAC = dot(v.A, v.C);
  const pg = await D(([x, y, z]) => ({ c: TCC_DEBUG.cACFromAzimuth(x, y, z), w: TCC_DEBUG.causalWindow(x, y), tr: TCC_DEBUG.triad(x, y, z) }), [t1, t2, p]);
  const G = det3([[1, cAB, cAC], [cAB, 1, cBC], [cAC, cBC, 1]]);
  winErr = Math.max(winErr, Math.abs(pg.c - cAC));
  detErr = Math.max(detErr, Math.abs(pg.tr.detFactor - G), Math.abs(pg.tr.detFormula - G), Math.abs(pg.tr.detMatrix - G), Math.abs(await D(([x, y, z]) => TCC_DEBUG.gramDeterminant(x, y, z), [cAB, cBC, cAC]) - G));
  minDet = Math.min(minDet, G);
  // the window: extremes of A·C over the azimuth, sampled here
  let lo = Infinity, hi = -Infinity; for (let k = 0; k <= 720; k++) { const c = dot(v.A, triple(t1, t2, Math.PI * k / 720).C); lo = Math.min(lo, c); hi = Math.max(hi, c); }
  endErr = Math.max(endErr, Math.abs(pg.w.lo - lo), Math.abs(pg.w.hi - hi), Math.abs(gramDet(cAB, cBC, pg.w.lo)), Math.abs(gramDet(cAB, cBC, pg.w.hi)));
  if (a % 180 && b % 180 && p > 0 && p < Math.PI) { const back = await D(([x, y, z]) => TCC_DEBUG.azimuthFromCAC(x, y, z), [t1, t2, cAC]); invErr = Math.max(invErr, Math.abs(back - p)); }
}
check('c_AC(φ) = c₁c₂ + s₁s₂ cos φ equals A·C of explicit unit vectors (150 configurations, < 1e-15)', winErr < 1e-15, String(winErr));
check('det G = s₁²s₂² sin²φ = 1 − Σc² + 2c_AB c_BC c_AC = cofactor det of the Gram matrix, and ≥ 0 for real φ', detErr < 1e-14 && minDet > -1e-15, `${detErr} ${minDet}`);
check('the window [cos(θ₁ + θ₂), cos(θ₁ − θ₂)] is the range of A·C over the azimuth, and det G = 0 at both ends', endErr < 1e-12, String(endErr));
check('azimuthFromCAC inverts c_AC(φ) on the open window', invErr < 1e-7, String(invErr));
check('azimuthFromCAC has no real solution outside the window', (await D(() => [TCC_DEBUG.azimuthFromCAC(Math.PI / 3, Math.PI / 3, -0.9), TCC_DEBUG.azimuthFromCAC(1, 0.5, 0.9999)])).every((x) => x === null));
const perm = await D(() => TCC_DEBUG.permDets(1.1, 0.7, 2.2)), trp = await D(() => TCC_DEBUG.triad(1.1, 0.7, 2.2));
check('relabelling A, B, C leaves det G unchanged and the mirror areas cancel: (+Ω) + (−Ω) = 0', perm.every((x) => Math.abs(x - trp.detFormula) < 1e-14) && trp.omegaSum === 0 && Math.abs(trp.fourOmega2 - trp.detFactor) < 1e-14);
const lag = await D(() => TCC_DEBUG.lagrange([0.3, -0.4, 0.86], [0.7, 0.1, -0.2]));
const lagL = (0.09 + 0.16 + 0.7396) * (0.49 + 0.01 + 0.04) - (0.21 - 0.04 - 0.172) ** 2;
check('lagrange_gram_identity instance: (Σu²)(Σv²) − (Σuv)² = ½ΣΣ(uᵢvⱼ − uⱼvᵢ)²', Math.abs(lag.lhs - lagL) < 1e-12 && Math.abs(lag.lhs - lag.rhs) < 1e-12);
const top = await D(() => TCC_DEBUG.triad(0.8, 0.8, 0));
check('unit_gram_overlap_characterization instance: θ₁ = θ₂, φ = 0 gives c_AC = 1 and C = A', Math.abs(top.cAC - 1) < 1e-15 && top.distAC < 1e-15);
for (const t2 of [30, 75, 90, 140]) {
  const lf = await D((x) => TCC_DEBUG.lens(x), t2), M = 401;
  let pos = 0; for (let i = 0; i < M; i++) for (let j = 0; j < M; j++) { const t1 = (i + 0.5) / M * Math.PI, c = -1 + 2 * (j + 0.5) / M; if (gramDet(Math.cos(t1), Math.cos(t2 * DEG), c) > 0) pos++; }
  const exact = 2 * Math.sin(t2 * DEG) / Math.PI;
  check(`phase map θ₂ = ${t2}°: the share with det G > 0 is 2 sin θ₂ / π = ${exact.toFixed(4)} (page grid and an independent ${M} × ${M} grid)`, Math.abs(lf.fraction - exact) < 0.01 && Math.abs(pos / (M * M) - exact) < 0.01 && Math.abs(lf.exact - exact) < 1e-15, JSON.stringify(lf));
}

/* =============================== the de-ordered ledger =============================== */
let factOK = true;
for (let n = 0; n <= 40; n++) { const pg = await D((x) => TCC_DEBUG.factorial(x), n), f = factBig(n); if (n <= 18 ? BigInt(pg) !== f : Math.abs(pg - Number(f)) / Number(f) > 1e-15) factOK = false; }
check('factorials: exact through 18!, correctly rounded beyond (BigInt here)', factOK);
let serOK = true;
for (const t of [0, 0.3, 1, Math.PI / 2, 2.5, Math.PI]) for (const K of [1, 3, 6, 12]) {
  const s = await D(([a, b]) => TCC_DEBUG.cosTaylorSeries(a, b), [t, K]), mine = cosPartials(t, K);
  const scale = 1 + mine.reduce((m, x) => Math.max(m, Math.abs(x)), 0);
  if (s.partial.some((x, k) => Math.abs(x - mine[k]) > 1e-14 * scale) || s.rem > s.bound * (1 + 1e-9) + 4 * Number.EPSILON * scale || Math.abs(Number(factBig(2 * K)) - s.orders) / s.orders > 1e-15) serOK = false;
  const sn = await D(([a, b]) => TCC_DEBUG.sinTaylorSeries(a, b), [t, K]);
  if (Math.abs(sn.sum - sinSum(t, K)) > 1e-14 * scale) serOK = false;
}
check('cos and sin Taylor partial sums agree with the term recurrence, and |cos θ − T_K| ≤ |θ|^(2K+2)/(2K+2)! (plus rounding)', serOK);
const perms = await D(() => [1, 2, 3, 4].map((k) => TCC_DEBUG.permutations(2 * k)));
check('Heap enumeration: 2!, 4!, 6!, 8! distinct orderings of 2k steps', perms.map((p) => `${p.count}/${p.distinct}`).join() === '2/2,24/24,720/720,40320/40320');
let ledOK = true, ledBad = '';
for (const [a, b, c] of [[120, 75, null], [60, 45, null], [160, 140, null], [60, 60, -0.9], [0, 0, null], [180, 90, null], [33, 151, 0.2]]) {
  const t1 = a * DEG, t2 = b * DEG, cAC = c === null ? Math.cos(t1) * Math.cos(t2) + Math.sin(t1) * Math.sin(t2) * Math.cos(DEG * 60) : c;
  const L = await D(([x, y, z]) => TCC_DEBUG.taylorLedger(x, y, z), [t1, t2, cAC]), th = [t1, t2, Math.acos(cAC)], K = orderK(th);
  const parts = th.map((t) => cosPartials(t, K)), exact = gramDet(Math.cos(t1), Math.cos(t2), cAC);
  const ok = L.K === K && L.rows.length === K + 1 && L.rows.every((r, k) => {
    const c3 = parts.map((p) => p[k]), d = gramDet(c3[0], c3[1], c3[2]);
    return r.k === k && r.c.every((x, i) => Math.abs(x - c3[i]) < 1e-13 * (1 + Math.abs(c3[i]))) && Math.abs(r.det - d) < 1e-11 * (1 + Math.abs(d)) && r.sign === (Math.abs(r.det) <= 1e-12 ? 0 : Math.sign(r.det));
  }) && L.rows[0].det === 0 && Math.abs(L.rows[K].det - exact) < 1e-12 && (Math.abs(exact) <= 1e-12 ? L.rows[K].sign === 0 : L.rows[K].sign === Math.sign(exact));
  if (!ok) { ledOK = false; ledBad = `(${a}, ${b}, ${c}) K page ${L.K} mine ${K}`; break; }
}
check('de-ordered ledger: K, the truncated cosines and det G⁽ᵏ⁾ order by order match; order 0 is A = B = C (det 0); the last order is the exact det G', ledOK, ledBad);
const bd = await D(() => TCC_DEBUG.taylorLedger(Math.PI / 3, Math.PI / 4, Math.cos(Math.PI / 12)));
check('on the boundary φ = 0 the truncated det G⁽ᵏ⁾ changes sign before it settles on 0', bd.rows.some((r) => r.sign < 0) && bd.rows.some((r) => r.sign > 0) && bd.rows[bd.K].sign === 0);
let ordOK = true;
for (const t of [0.2, 1.3, 2.9, Math.PI]) { const K = orderK([t]); const c = cosPartials(t, K)[K], s = sinSum(t, K); if (Math.abs(c * c + s * s - 1) > 1e-14) ordOK = false; }
const info0 = await D(() => TCC_DEBUG.info());
check('(2k)! order quotient: cos²θ + sin²θ = 1 at the converged order (here and on the page)', ordOK && info0.order.maxDev < 1e-12 && /✓/.test(await text('#roOrderMark')));

/* =============================== no signalling =============================== */
let sigErr = 0, shiftErr = 0, delta = 0, moved = 0;
for (const [a, b, p] of [[120, 75, 60], [60, 45, 0], [90, 90, 90], [10, 170, 123], [150, 30, 30]]) {
  const pg = await D(([x, y, z]) => TCC_DEBUG.noSignaling(x, y, z), [a * DEG, b * DEG, p * DEG]), m = signalModel(a * DEG, b * DEG, p * DEG);
  sigErr = Math.max(sigErr, Math.abs(pg.rhoB[0][0][0] - m.rhoB[0][0]), Math.abs(pg.rhoB[1][1][0] - m.rhoB[1][1]), Math.hypot(...pg.rhoB[0][1]), Math.abs(pg.pPlus - m.pPlus));
  shiftErr = Math.max(shiftErr, Math.abs(pg.shiftPlus - m.shiftPlus));
  delta = Math.max(delta, pg.delta); moved = Math.max(moved, m.shiftPlus);
}
check('no signalling: ρ_B = diag(cos²(θ₁/2), sin²(θ₁/2)) and an unread measurement on C leaves it unchanged (Δρ_B < 1e-15)', sigErr < 1e-15 && delta < 1e-15, `${sigErr} ${delta}`);
check('a read outcome does move B’s conditional state (closed form here), so the zero above is not trivial', shiftErr < 1e-12 && moved > 0.1, `${shiftErr} ${moved}`);

/* =============================== amplitude amplification =============================== */
let grovErr = 0, simErr = 0, tStarOK = true;
for (let n = 2; n <= 12; n++) {
  const g = await D((x) => TCC_DEBUG.grover(x), n), th = Math.asin(2 ** (-n / 2)), M = groverModel(n, g.sim.tMax);
  for (let t = 0; t <= g.sim.tMax; t++) { grovErr = Math.max(grovErr, Math.abs(M[t] - Math.sin((2 * t + 1) * th))); simErr = Math.max(simErr, Math.abs(g.sim.target[t] - M[t])); }
  simErr = Math.max(simErr, g.sim.worst);
  for (const r of g.rows) grovErr = Math.max(grovErr, Math.abs(r.a - M[r.t]));
  const best = M.reduce((b, v, t) => (v * v > M[b] * M[b] + 1e-12 ? t : b), 0);
  if (g.K !== best || g.rows.length !== g.K + 1 || g.rows.slice(1).some((r) => r.sign !== 1)) tStarOK = false;
}
check('uniform_operator_rotation instance: the ledger amplitudes equal the two-amplitude recursion and sin((2t + 1)θ), sin θ = 2^(−n/2), n = 2 … 12', grovErr < 1e-12, String(grovErr));
check('the page’s entry-by-entry simulation (N up to 4096) agrees with it to < 1e-12', simErr < 1e-12, String(simErr));
check('the NP ledger stops at t*, the first step of largest success probability, and every step before it raises P', tStarOK);

/* =============================== the crystal book and the P field =============================== */
check('independent H: ‖(H_C ⊗ I + I ⊗ H_S)Ψ‖ < 1e-12, and the page agrees', hNorm < 1e-12 && (await D(() => TCC_DEBUG.hNorm())) < 1e-12, String(hNorm));
const crystal = await D(() => TCC_DEBUG.crystal());
check('the stored crystal equals (1/√N)|τⱼ⟩ ⊗ U(τⱼ)|+⟩ entry by entry', crystal.every((row, j) => row.every((z, m) => Math.hypot(z[0] - PSI[2 * j + m].re, z[1] - PSI[2 * j + m].im) < 1e-15)));
let sliceErr = 0;
for (let i = 0; i < 24; i++) { const t = TWO_PI * (i + 0.31) / 24, s = await D((x) => TCC_DEBUG.slice(x), t), w = sliceModel(t); sliceErr = Math.max(sliceErr, ...s.map((z, m) => Math.hypot(z[0] - w[m].re, z[1] - w[m].im))); }
check('slices ψ(τ) = √N⟨c(τ)|Ψ⟩ match (1, e^{−iτ})/√2 at 24 off-page τ (< 1e-12)', sliceErr < 1e-12, String(sliceErr));
const reading = await D(() => TCC_DEBUG.reading());
check('left-to-right and right-to-left readings give the same matrix exactly; the θ* rebuild agrees to 1e-14', reading.gap === 0 && reading.boundaryGap < 1e-14 && reading.ltr.every((r, j) => Math.abs(r[0] * N - (1 + Math.cos(PAGES[j])) / 2) < 1e-14));
const pinch = await D(() => TCC_DEBUG.pinch()), pc = await D(() => TCC_DEBUG.pageConditional()), rec = await D(() => TCC_DEBUG.record());
check('unreadState_fixed_iff instance: every inter-page block has norm 1/N ≠ 0, so pinching changes ρ', Math.abs(pinch.maxBlock - 1 / N) < 1e-14 && Math.abs(pinch.minBlock - 1 / N) < 1e-14 && !pinch.fixed && Math.abs(pinch.frobDiff - Math.sqrt(1 - 1 / N)) < 1e-13 && pinch.recordAxioms === 0);
check('conditionalState_isState instance: each page-conditional state has weight 1/N, trace 1, is Hermitian, PSD and equals |τⱼ⟩⟨τⱼ| ⊗ |ψ(τⱼ)⟩⟨ψ(τⱼ)|', pc.weightErr < 1e-15 && pc.traceErr < 1e-14 && pc.hermErr < 1e-15 && pc.minQuad > -1e-15 && pc.formErr < 1e-14, JSON.stringify(pc));
check('rank_one_born_pairing_weight instance: ‖φ*Ψ‖² = Tr(ρP) for 24 rank-one records and unreadState = Σ weight • conditionalState', rec.traceGap < 1e-15 && Math.abs(rec.sumW - 1) < 1e-14 && rec.unreadVsMix < 1e-14 && rec.count === 24);
const diss = await D(() => TCC_DEBUG.dissipation());
check('S2_dissipation instance: V(x₀) − V(x_T) = ∫‖ẋ‖² dt along the barrier gradient flow (relative error < 1e-6; V recomputed here)', diss.relErr < 1e-6 && Math.abs(diss.V0 - Vbar([1, 1])) < 1e-12 && Math.abs(diss.VT - Vbar(diss.xT)) < 1e-12 && diss.drop > 0, JSON.stringify(diss));

/* =============================== readouts and presets =============================== */
const hero = async () => D(() => ({ cls: document.getElementById('roDeficit').className, txt: document.getElementById('roDeficit').textContent, mark: document.getElementById('roDeficitMark').className }));
let h = await hero(), inf = await D(() => TCC_DEBUG.info());
check('default: det G > 0 shown in cyan with ✓, equal to s₁²s₂² sin²φ', h.cls === 'vpos' && h.mark === 'okmark' && Math.abs(parseFloat(h.txt.replace('−', '-')) - inf.det) < 5e-5 && Math.abs(inf.det - (Math.sin(120 * DEG) * Math.sin(75 * DEG) * Math.sin(60 * DEG)) ** 2) < 1e-15);
check('the six readouts show c_AB, c_BC, the chosen c_AC, the window, the slack and t* = 12 for n = 8', /−0\.5000/.test(await text('#roAB')) && /0\.2588/.test(await text('#roBC')) && /0\.2888/.test(await text('#roAC')) && /\[−0\.966, 0\.707\]/.test(await text('#roWin')) && /0\.8365/.test(await text('#roSlack')) && /t\* = 12/.test(await text('#roGrover')));
check('no-signalling row: Δρ_B ≈ 0 with ✓', /Δρ_B = /.test(await text('#roSignal')) && (await D(() => document.getElementById('roSignalMark').className)) === 'okmark');
await page.click('#presets [data-preset="boundary"]'); await settle();
h = await hero(); st = await D(() => TCC_DEBUG.state());
check('preset “lightcone boundary φ = 0°”: det G = 0 in the boundary colour, c_AC = cos(θ₁ − θ₂), the chip is pressed', h.cls === 'vzero' && h.txt === '0.0000' && st.phi === 0 && Math.abs((await D(() => TCC_DEBUG.info())).cAC - Math.cos(15 * DEG)) < 1e-15 && (await D(() => document.querySelector('#presets [data-preset="boundary"]').getAttribute('aria-pressed'))) === 'true');
await page.click('#presets [data-preset="ortho"]'); await settle();
check('preset “orthogonal steps 90° + 90°”: det G = +1.0000', (await hero()).txt === '+1.0000');
await page.click('#presets [data-preset="slack"]'); await settle();
check('preset “max slack φ = 90°”: det G = s₁²s₂² = +0.2500', (await hero()).txt === '+0.2500' && (await hero()).cls === 'vpos');
await page.click('#presets [data-preset="breach"]'); await settle();
h = await hero(); inf = await D(() => TCC_DEBUG.info());
check('preset “forbidden breach”: c_AC = −0.9 outside [−0.5, 1], det G = −0.7600 in magenta with ✗, no real φ', h.cls === 'vneg' && h.txt === '−0.7600' && h.mark === 'badmark' && inf.status === -1 && !inf.phiMode && Math.abs(inf.det - gramDet(0.5, 0.5, -0.9)) < 1e-15 && /无实数 φ/.test(await text('#roAC')));
check('in the breach the ledger ends below zero and the tape ends magenta', (await D(() => { const t = [...document.querySelectorAll('#tape i')]; return t[t.length - 1].className.split(' ')[0]; })) === 'neg' && /✗/.test(await text('#ledger .drow.final')));
await page.click('#presets [data-preset="grover"]'); await settle();
st = await D(() => TCC_DEBUG.state());
check('preset “Grover n = 6”: the P field vs NP thread view with t* = 6 steps', st.view === 'field' && st.n === 6 && st.kind === 'grover' && st.passes === 6 && st.pass === 6 && (await D(() => document.querySelector('#qChips [data-n="6"]').getAttribute('aria-pressed'))) === 'true');
await page.click('#reset'); await settle();
st = await D(() => TCC_DEBUG.state());
check('reset returns to the default triple, n = 8 and the Gram window', st.t1 === 120 && st.t2 === 75 && st.phi === 60 && st.c === null && st.n === 8 && st.view === 'gram');

/* =============================== controls =============================== */
await page.fill('#t1Num', '100'); await page.press('#t1Num', 'Enter'); await settle();
await page.locator('#t2').fill('40'); await settle();
st = await D(() => TCC_DEBUG.state());
check('number box and slider set θ₁ = 100°, θ₂ = 40°', st.t1 === 100 && st.t2 === 40 && (await D(() => document.getElementById('t1').value)) === '100' && (await D(() => document.getElementById('t2Num').value)) === '40');
await page.click('#t1Inc'); await page.click('#t2Dec'); await page.click('#phiInc'); await settle();
st = await D(() => TCC_DEBUG.state());
check('steppers move θ₁ up, θ₂ down and φ up by one degree', st.t1 === 101 && st.t2 === 39 && st.phi === 61);
await page.fill('#phiNum', '12.5'); await page.press('#phiNum', 'Enter'); await settle();
check('the φ box takes tenths of a degree', (await D(() => TCC_DEBUG.state().phi)) === 12.5);
const before = await D(() => TCC_DEBUG.info());
await page.click('#swap'); await settle();
st = await D(() => TCC_DEBUG.state());
check('swap exchanges θ₁ and θ₂ and leaves c_AC and det G unchanged (relabelling)', st.t1 === 39 && st.t2 === 101 && Math.abs((await D(() => TCC_DEBUG.info())).det - before.det) < 1e-15 && Math.abs((await D(() => TCC_DEBUG.info())).cAC - before.cAC) < 1e-15);
await page.click('#random'); await settle();
st = await D(() => TCC_DEBUG.state());
check('random picks angles in 0 … 180° and φ in 0 … 180°', st.t1 >= 0 && st.t1 <= 180 && st.t2 >= 0 && st.t2 <= 180 && st.phi >= 0 && st.phi <= 180 && !(st.t1 === 39 && st.t2 === 101));
await page.fill('#t1Num', '500'); await page.press('#t1Num', 'Enter'); await settle();
check('out-of-range input is clamped to 180°', (await D(() => TCC_DEBUG.state().t1)) === 180);
for (const t2 of [30, 45, 60, 90]) {
  await page.click(`#nChips [data-t2="${t2}"]`); await settle();
  check(`θ₂ chip ${t2}° applies and is marked`, (await D(() => TCC_DEBUG.state().t2)) === t2 && (await D((x) => document.querySelector(`#nChips [data-t2="${x}"]`).getAttribute('aria-pressed'), t2)) === 'true');
}
await page.click('#reset'); await settle();

/* =============================== the phase map =============================== */
let pt = await D(() => TCC_DEBUG.cellPoint(90, 0.1));
await page.mouse.click(pt.x, pt.y); await settle();
st = await D(() => TCC_DEBUG.state()); inf = await D(() => TCC_DEBUG.info());
check('clicking inside the lens picks (θ₁, φ): θ₁ = 90° and c_AC ≈ 0.1 with a real azimuth', st.t1 === 90 && st.c === null && Math.abs(inf.cAC - 0.1) < 0.01 && inf.status === 1, JSON.stringify(st));
pt = await D(() => TCC_DEBUG.cellPoint(20, -0.8));
await page.mouse.click(pt.x, pt.y); await settle();
st = await D(() => TCC_DEBUG.state()); inf = await D(() => TCC_DEBUG.info());
check('clicking outside the lens is a breach: θ₁ = 20°, c_AC ≈ −0.8, det G < 0', st.t1 === 20 && st.c !== null && Math.abs(inf.cAC + 0.8) < 0.01 && inf.status === -1 && (await hero()).cls === 'vneg', JSON.stringify(st));
const lit = await D(() => { const c = document.getElementById('heat'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 200) n++; return n; });
check('the phase map is drawn', lit > 5000, String(lit));
await page.mouse.move(pt.x + 30, pt.y - 40); await settle();
check('hovering the map reads det G under the pointer', /det G =/.test(await text('#heatHover')));
check('the counts note reports the analytic share with ✓', /2 sin θ₂ \/ π/.test(await text('#heatCounts')) && /✓/.test(await text('#heatCounts')));
await page.click('#reset'); await settle();

/* =============================== the rail =============================== */
const KK = (await D(() => TCC_DEBUG.state())).passes;
await page.click('#first'); await settle();
check('⏮ returns to order 0, later rows dimmed', (await D(() => TCC_DEBUG.state().pass)) === 0 && (await D(() => document.querySelectorAll('#ledger .drow.future').length)) === KK);
await page.click('#next'); await page.click('#next'); await settle();
check('▶▶ steps one order at a time and marks the current row and tape square', (await D(() => TCC_DEBUG.state().pass)) === 2 && (await D(() => document.querySelector('#ledger .drow.now').dataset.pass)) === '2' && (await D(() => document.querySelector('#tape i.now').dataset.pass)) === '2');
await page.click('#prev'); await settle();
check('◀ steps back', (await D(() => TCC_DEBUG.state().pass)) === 1);
await page.click('#last'); await settle();
check('⏭ jumps to the converged order', (await D(() => TCC_DEBUG.state().pass)) === KK);
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('ArrowLeft'); await settle();
check('← steps back from the keyboard', (await D(() => TCC_DEBUG.state().pass)) === KK - 1);
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); await settle();
check('Home and → work from the keyboard', (await D(() => TCC_DEBUG.state().pass)) === 1);
await page.click('#ledger .drow[data-pass="5"]'); await settle();
check('clicking a ledger row selects that order', (await D(() => TCC_DEBUG.state().pass)) === 5);
await page.click('#tape i[data-pass="3"]'); await settle();
check('clicking a tape square selects that order', (await D(() => TCC_DEBUG.state().pass)) === 3);
check('the tape follows the signs of det G⁽ᵏ⁾ (order 1 breaches at the default triple)', (await D(() => [...document.querySelectorAll('#tape i')].map((i) => i.className.split(' ')[0]).join())) === ['neg', ...Array(KK - 1).fill('pos')].join());
await page.click('#first'); await page.click('#play'); await settle();
check('▶ plays the orders', (await D(() => TCC_DEBUG.state().playing)) === true);
await page.waitForFunction(() => !TCC_DEBUG.state().playing, null, { timeout: 20000 }).catch(() => {});
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 5000 }).catch(() => {});
check('playback stops at the converged order and reports det G', (await D(() => TCC_DEBUG.state().pass)) === KK && new RegExp(`去序完成：${KK} 阶后 det G⁽ᴷ⁾ = \\+0\\.5248，与精确值 \\+0\\.5248 一致`).test(await text('#toast')), await text('#toast'));

/* =============================== views =============================== */
const roles = async () => D(() => { const r = TCC_DEBUG.roles(), p = TCC_DEBUG.palette(); return Object.entries(r).every(([k, v]) => (k === 'now') === v.includes(p.amber) && !v.includes(p.ok)); });
for (const [key, v] of [['2', 'book'], ['3', 'field'], ['1', 'gram']]) {
  await D(() => document.activeElement && document.activeElement.blur());
  await page.keyboard.press(key); await settle();
  const s = await D(() => TCC_DEBUG.state());
  const drawn = await D(() => { const c = document.getElementById('stageCanvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 200) n++; return n; });
  check(`key ${key} opens the ${v} view; its chip is pressed and the stage is drawn`, s.view === v && (await D((x) => document.querySelector(`#viewChips [data-view-set="${x}"]`).getAttribute('aria-pressed'), v)) === 'true' && drawn > 1500, String(drawn));
  check(`${v} view: amber on the canvases only for the role "now", green never`, await roles());
}
await page.click('#viewChips [data-view-set="field"]'); await settle();
const gl = await D(() => TCC_DEBUG.ledger());
check('the field view ledger is the NP thread: rows t = 0 … t* with the success probability rising to the end', gl.kind === 'grover' && gl.K === 12 && gl.rows[gl.K].P > 0.999 && (await D(() => document.querySelectorAll('#ledger .drow[data-pass]').length)) === 13);
await page.click('#qChips [data-n="2"]'); await settle();
check('n chips set n; at n = 2 one step reaches the solution with P = 1', (await D(() => TCC_DEBUG.state().n)) === 2 && /P = 1\.0000/.test(await text('#tapeSum')));
await page.click('#viewChips [data-view-set="gram"]'); await settle();

/* =============================== Lean links at the pinned commit; drawer =============================== */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file and line of trureturing.lock.json, and names a theorem', links.length >= 7 && links.every(([gid, href]) => {
  const d = lock.declarations[gid]; return d && d.kind === 'theorem' && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 2)));
check('the page cites exactly the seven pinned theorems, each once in a LEAN ✓ box', JSON.stringify([...new Set(links.map(([g]) => g))].sort()) === JSON.stringify([...LEAN].sort())
  && (await D(() => [...document.querySelectorAll('#evidence .lean:not(.num):not(.model):not(.argued):not(.open)')].map((b) => b.querySelector('a[data-lean-gid]').dataset.leanGid))).sort().join() === [...LEAN].sort().join());
check('P ≠ NP stays OPEN and “P is a field, NP is a line” stays MODEL', /P ≠ NP/.test(await text('#evidence .lean.open')) && /P 是场，NP 是线/.test(await text('#evidence .lean.model')));
await page.click('#infoBtn');
check('theory drawer opens', (await D(() => document.getElementById('drawer').hidden)) === false);
check('the drawer says the page is a numerical illustration, not a proof', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
check('drawer chapter links point to the coda and chapters 2–3 of this book and open in the top window', await D(() => [...document.querySelectorAll('#drawer a[href^="../../"]')].every((a) => /^\.\.\/\.\.\/(zh|en)\/(coda|ch02-born-rule|ch03-projectors-and-duality)\.html#/.test(a.getAttribute('href')) && a.target === '_top')));
await page.keyboard.press('Escape');
check('Esc closes the drawer and focus returns to its button', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* =============================== language =============================== */
await page.click('[data-lang-set="en"]'); await settle();
for (const v of ['gram', 'book', 'field']) {
  await D((x) => TCC_DEBUG.view(x), v); await settle();
  const left = await cjkLeftovers(page), lab = await D(() => TCC_DEBUG.labels());
  check(`no visible Chinese in English mode, ${v} view (DOM and canvas labels)`, left.length === 0 && lab.length > 8 && lab.every((s) => !CJK.test(s)), left.concat(lab.filter((s) => CJK.test(s))).slice(0, 6).join(' | '));
}
for (const p of ['breach', 'boundary']) {
  await page.click(`#presets [data-preset="${p}"]`); await page.click('#first'); await settle();
  const left = await cjkLeftovers(page);
  check(`no visible Chinese in English mode after preset ${p}`, left.length === 0, left.slice(0, 6).join(' | '));
}
await page.click('#infoBtn');
let left = await cjkLeftovers(page);
check('no visible Chinese in the English drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title', (await D(() => document.title)).startsWith('ORTHO//CAUSAL · Timeless causal ledger'));
await page.click('#presets [data-preset="grover"]'); await page.click('#qChips [data-n="2"]'); await settle();
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('Home'); await settle(); await page.click('#play');
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 10000 }).catch(() => {});
check('the end-of-playback toast is in English', /^t\* = 1 steps walked: P = 1\.0000, √N = 2\.00$/.test(await text('#toast')), await text('#toast'));

/* =============================== hub round trip =============================== */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, which keeps the language and lists this visualization', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D((id) => document.querySelectorAll(`.card[data-viz="${id}"]`).length, ID)) === 1 && (await D((id) => !!document.querySelector(`.card[data-viz="${id}"] img[src="${id}/thumb.jpg"]`), ID)));
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click(`.card[data-viz="${ID}"] .enter`); await page.waitForLoadState('load');
await page.waitForFunction(() => window.TCC_DEBUG && TCC_DEBUG.frames() > 0, null, { timeout: 30000 });
check('the hub card opens this page', (await D(() => document.body.dataset.vizId)) === ID);

/* =============================== layouts =============================== */
for (const lang of ['zh', 'en']) {
  for (const [w, hh] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: hh });
    for (const v of ['gram', 'field']) {
      await open(`?lang=${lang}&view=${v}`); await settle();
      check(`no horizontal scroll at ${w}px (${lang}, ${v})`, (await overflowX(page)) === 0);
    }
  }
}
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en&view=book'); await settle();
check('?embed=1 hides the header, crumb and key help', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en&view=book starts in English on the crystal book', (await D(() => TRV.lang())) === 'en' && (await D(() => TCC_DEBUG.state().view)) === 'book' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, no horizontal scroll', (await overflowX(page)) === 0 && (await D(() => { const a = document.getElementById('inputs').getBoundingClientRect(), b = document.getElementById('ledgerPanel').getBoundingClientRect(); return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40; })));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await settle();
check('?thumb=1: the phase-map panel fills the frame', await D(() => { const r = document.getElementById('heat').getBoundingClientRect(); return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720; }));
await D(() => window.TRV_THUMB()); await settle();
check('?thumb=1: the cover draws the map and the ledger (both halves lit) with amber only for the current point and row', await D(() => {
  const c = document.getElementById('heat'), g = c.getContext('2d'), lit = (x0, x1) => { const d = g.getImageData(x0, 0, x1 - x0, c.height).data; let n = 0; for (let i = 0; i < d.length; i += 4) if (d[i] + d[i + 1] + d[i + 2] > 200) n++; return n; };
  return lit(64, 664) > 50000 && lit(760, 1270) > 5000;
}) && await roles());
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
