#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/pythagoras-number-escape (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/pythagoras-number-escape.test.mjs      (or node tools/node/viz-test.mjs quantum-geometry)
// 1. Static alignment with example-monograph/viz/golden-carry: every rule of its style.css is kept verbatim, its frame ids
//    exist here, and the thumbnail cover uses the same split composition.
// 2. The page's own self-test (window.__vizTest), then state read through the read-only window.PYTHAGORAS_ESCAPE probe and
//    checked against an independent implementation written here: continued fractions of √d from an exact rational
//    approximation (not the page's integer recurrence), norms in BigInt, Gaussian splittings by search, #E_d(𝔽ₚ) by brute
//    force over 𝔽ₚ × 𝔽ₚ, Tunnell's counts by triple loops, the congruent triangles in exact rationals; and the earlier
//    pure mathematics (Pythagorean readings, Pell rows of √2, Liu Hui, E₁/E₂ counts) kept by the page.
// 3. The golden-carry frame in the browser: three columns, the ledger rows, sign tape, rail, chirality map, evidence,
//    drawer, both languages, the hub round trip, the layouts, embed and thumbnail modes.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, cjkLeftovers, overflowX } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'pythagoras-number-escape';
const DIR = path.join(ROOT, 'books', BOOK, 'viz', ID), GOLD = path.join(ROOT, 'books', 'example-monograph', 'viz', 'golden-carry');
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(DIR, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(DIR, 'main.js'), 'utf8');
const CJK = /[　-〿㐀-鿿＀-￯]/;
const LEAN = [
  'D5/S3/QuantumBounds/LagrangeGramIdentity.lagrange_gram_identity',
  'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law',
  'D5/S3/Quantum/Tomography/ComplementaryContextProbabilityPythagoras.complementary_context_probability_pythagoras',
  'D5/S3/Observer/BornReduction.rank_one_pure_state_modulus_square_reduction'
];
const DEG = Math.PI / 180;

/* =============================== independent mathematics =============================== */
/** ⌊√n⌋ for a BigInt n by Newton's iteration from a power of two above the root. */
const isqrtB = (n) => { if (n < 2n) return n; let x = 1n << BigInt(Math.ceil(n.toString(2).length / 2)); for (;;) { const y = (x + n / x) / 2n; if (y >= x) return x; x = y; } };
const squarefreeList = []; for (let d = 2; d <= 37; d++) { let ok = true; for (let q = 2; q * q <= d; q++) if (d % (q * q) === 0) ok = false; if (ok) squarefreeList.push(d); }
const primes97 = []; for (let q = 2; q <= 97; q++) { let pr = true; for (let r = 2; r * r <= q; r++) if (q % r === 0) pr = false; if (pr) primes97.push(q); }
/** Continued fraction of the rational X/10⁴⁰ ≈ √d (error < 10⁻⁴⁰) by Euclid's algorithm, and its convergents. */
function cfIndependent(d, terms) {
  const S = 10n ** 40n, X = isqrtB(BigInt(d) * S * S);
  let a = X, b = S, h1 = 1n, h2 = 0n, k1 = 0n, k2 = 1n;
  const out = [];
  for (let i = 0; i < terms; i++) {
    const q = a / b, h = q * h1 + h2, k = q * k1 + k2;
    out.push({ a: Number(q), m: h, n: k, norm: h * h - BigInt(d) * k * k });
    [a, b] = [b, a - q * b]; [h2, h1, k2, k1] = [h1, h, k1, k];
  }
  return out;
}
function countEd(d, p) { let n = 1; const A = -d * d; for (let x = 0; x < p; x++) { const f = (((x * x * x + A * x) % p) + p) % p; for (let y = 0; y < p; y++) if ((y * y) % p === f) n++; } return n; }
function tunnellIndependent(d) {
  const odd = d % 2 === 1, n = odd ? d : d / 2, b = odd ? 2 : 4, R = Math.ceil(Math.sqrt(n)) + 1;
  let A = 0, B = 0;
  for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) for (let z = -R; z <= R; z++) {
    if (x * x + b * y * y + 8 * z * z === n) A++;
    if (x * x + b * y * y + 32 * z * z === n) B++;
  }
  return { A, B };
}
const frac = (s) => { const t = String(s).replace('−', '-').split('/'); return [BigInt(t[0]), BigInt(t[1] || 1)]; };
/** Pell convergents of √2 from (1 + √2)ᵏ = mₖ + nₖ√2, in BigInt (the earlier page's rows). */
const pell2 = []; { let m = 1n, n = 1n; for (let k = 1; k <= 7; k++) { pell2.push([m, n]); [m, n] = [m + 2n * n, m + n]; } }
function countPoints(A, B, p) { let n = 1; for (let x = 0; x < p; x++) { const f = ((x * x * x + A * x + B) % p + p) % p; for (let y = 0; y < p; y++) if ((y * y) % p === f) n++; } return n; }
const PRIMES = []; for (let q = 5; q <= 199; q++) { let pr = true; for (let r = 2; r * r <= q; r++) if (q % r === 0) pr = false; if (pr) PRIMES.push(q); }
const THETA_STAR = (() => { let a = 0, b = 1; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; })();

/* =============================== open =============================== */
const T = await session({ viewport: { width: 1440, height: 900 }, locale: 'zh-CN' });
const { page, check } = T;
const D = (fn, arg) => page.evaluate(fn, arg);
const settle = async () => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  await page.waitForFunction(() => !PYTHAGORAS_ESCAPE.pending(), null, { timeout: 30000 });
};
const text = (sel) => D((s) => document.querySelector(s).textContent, sel);
const open = async (query) => {
  await T.goto(BOOK, ID, query);
  await page.waitForFunction(() => window.PYTHAGORAS_ESCAPE && PYTHAGORAS_ESCAPE.frames() > 0, null, { timeout: 30000 });
};
const state = () => D(() => PYTHAGORAS_ESCAPE.state());
const lit = (id, thr = 200) => D(([i, t]) => { const c = document.getElementById(i), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let k = 0; k < d.length; k += 4) if (d[k] + d[k + 1] + d[k + 2] > t) n++; return n; }, [id, thr]);

/* =============================== static alignment with golden-carry =============================== */
{
  const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
  const blocks = (s) => { const out = []; let depth = 0, start = 0; for (let i = 0; i < s.length; i++) { if (s[i] === '{') depth++; else if (s[i] === '}') { depth--; if (depth === 0) { out.push(s.slice(start, i + 1).trim()); start = i + 1; } } } return out; };
  const gold = blocks(strip(fs.readFileSync(path.join(GOLD, 'style.css'), 'utf8'))), mine = strip(css);
  const missing = gold.filter((b) => !mine.includes(b));
  check(`style.css keeps all ${gold.length} rule blocks of golden-carry verbatim (grid, media queries, embed, thumb, ledger, tape, map)`, gold.length > 60 && missing.length === 0, missing.slice(0, 2).join(' ‖ '));
  check('style.css: three-column grid minmax(270px, 310px) minmax(0, 1fr) minmax(320px, 400px)', mine.includes('grid-template-columns: minmax(270px, 310px) minmax(0, 1fr) minmax(320px, 400px)'));
  check('style.css: the stage is 210px tall (min 190px, flex 0 0 210px) inside the ledger panel', /\.stage \{[^}]*height: 210px; min-height: 190px; flex: 0 0 210px;/.test(mine));
  const FRAME = ['app', 'inputs', 'presets', 'swap', 'random', 'readouts', 'roNote', 'ledgerPanel', 'ledgerTitle', 'sheetWrap', 'ledger', 'tape', 'tapeSum', 'toast', 'rail', 'first', 'prev', 'play', 'next', 'last', 'passLabel', 'pass', 'heatPanel', 'heatRange', 'heat', 'nChips', 'heatCounts', 'heatHover', 'evidence', 'infoBtn', 'drawer', 'drawerTitle', 'drawerClose'];
  const goldHtml = fs.readFileSync(path.join(GOLD, 'index.html'), 'utf8');
  check('the golden-carry frame ids exist in both pages', FRAME.every((i) => goldHtml.includes(`id="${i}"`) && html.includes(`id="${i}"`)), FRAME.filter((i) => !html.includes(`id="${i}"`)).join(','));
  check('drawCover() uses the golden-carry split: lattice at ox = 64u, side = 600u; ledger rows at x0 = 760u', /side = 600 \* u/.test(js) && /ox = 64 \* u/.test(js) && /x0 = 760 \* u/.test(js) && /function drawCover\(\)/.test(js) && /if \(TRV\.thumbMode\) \{ drawCover\(\); return; \}/.test(js));
  check('no model or tool names in the page sources', ![html, css, js].some((s) => /\x63laude|\x67emini|\x67pt-|\x63odex|\x6fpenai|\x61nthropic/i.test(s)));
}

await open('?lang=zh');
let st = await state();
check('opens on √2, p = 13, step 4 of 8, view Pell', st.d === 2 && st.p === 13 && st.k === 4 && st.steps === 8 && st.view === 'pell', JSON.stringify(st));
check('page carries its id and the runtime language', (await D(() => document.body.dataset.vizId)) === ID && (await D(() => TRV.lang())) === 'zh');

/* =============================== the golden-carry page frame in the browser =============================== */
const frame = await D(() => {
  const q = (s) => document.querySelector(s), all = (s) => [...document.querySelectorAll(s)];
  const ro = all('#readouts dl.ro > div');
  const ledgerKids = [...q('#ledgerPanel').children].map((e) => e.className || e.id);
  return {
    theme: document.documentElement.hasAttribute('data-theme'), inlineHead: [...document.head.querySelectorAll('script')].filter((s) => !s.src).length,
    headScripts: [...document.head.querySelectorAll('script[src]')].map((s) => s.getAttribute('src')),
    styles: [...document.head.querySelectorAll('link[rel=stylesheet]')].map((l) => l.getAttribute('href')).filter((h) => !h.startsWith('http')),
    bodyScripts: [...document.body.querySelectorAll('script')].map((s) => s.getAttribute('src')),
    header: !!q('header.top > .brand > a.crumb[href="../"]') && !!q('header.top .brand h1.logo') && !!q('header.top .brand .tagline') && !!q('header.top .status .langs[role=group] [data-lang-set="en"]'),
    themes: all('.themes, [data-theme-set]').length,
    cols: [q('.app > aside.col.deck'), q('.app > main.center'), q('.app > aside.col.side')].map((e) => !!e),
    deck: all('aside.deck > section').map((s) => s.id).join() === 'inputs,readouts' && q('#readouts').getAttribute('aria-live') === 'polite',
    fields: all('#inputs .num-field').map((f) => !!f.querySelector('label') && f.querySelectorAll('.stepper > button').length === 2 && !!f.querySelector('.stepper > input[type=number]') && !!f.querySelector(':scope > input[type=range]')),
    presets: all('#presets [data-preset]').map((b) => b.dataset.preset).join() === 'd=2,d=5,d=6,p=13,p=7' && !!q('#presets #swap') && !!q('#presets #random') && !!q('#presets #reset'),
    ro: { half: ro.filter((d) => !d.className).length, hero: ro.filter((d) => d.className === 'wide deficit').length, wide: ro.filter((d) => d.className === 'wide').length, total: ro.length,
      heroParts: !!q('.deficit dd > b#roDeficit') && !!q('.deficit dd > .sub#roDeficitSub') && !!q('.deficit dd > .okmark#roDeficitMark') },
    ledgerKids,
    rules: all('#ledgerPanel .rules > .rule').map((r) => r.className).join() === 'rule r0,rule r1,rule rj,rule ra' && all('#ledgerPanel .rules > .rule').every((r) => r.querySelector('b') && r.querySelector('i')),
    stage: !!q('.stage#stage > canvas#stageCanvas') && !!q('.stage > .scan') && ['tl', 'tr', 'bl', 'br'].every((c) => q(`.stage > .bracket.${c}`)) && !!q('.stage > .hud-tl > .big#hudBig') && !!q('.stage > .hud-tl > .sub#hudSub')
      && all('.stage > .hud-tr.chips#viewChips > [data-view-set]').map((b) => b.dataset.viewSet).join() === 'pell,primes,elliptic',
    stageH: q('#stage').getBoundingClientRect().height,
    rows: { hdr: all('#ledger > .drow.hdr').length, input: all('#ledger > .drow.input').length, sum: all('#ledger > .drow.sum').length, pass: all('#ledger > .drow.pass[data-pass]').length, final: all('#ledger > .drow.final').length,
      parts: all('#ledger > .drow.pass').every((r) => r.querySelector(':scope > .lab') && r.querySelectorAll(':scope > .cells > span').length === 3 && r.querySelector(':scope > .what > .sgn') && r.querySelector(':scope > .what > code') && r.querySelector(':scope > .what > .name')) },
    tape: all('#tape > i[data-pass]').length === 8 && !!q('.tape-row > .tape-label') && !!q('.tape-row > #tapeSum.tape-sum') && q('#toast').getAttribute('role') === 'status',
    rail: !!q('main.center > footer.rail#rail .transport') && ['first', 'prev', 'play', 'next', 'last'].every((i) => q(`.transport > #${i}.tbtn`)) && !!q('footer.rail .clock > .tau#passLabel') && q('#pass').min === '1' && q('#pass').max === '8' && !!q('footer.rail .keys'),
    side: !!q('aside.side > section.panel.sec.heatpanel#heatPanel[data-thumb]') && !!q('#heatPanel > h2.thumb-hide #heatRange') && !!q('#heatPanel > .heatwrap > canvas#heat') && !!q('#heatPanel > .heatwrap > .scan')
      && all('#heatPanel > #nChips.thumb-hide [data-n]').map((b) => b.dataset.n).join() === '2,3,5,13' && ['pos', 'zero', 'neg', 'cur'].every((c) => q(`#heatPanel > ul.legend.thumb-hide .sw.${c}`))
      && !!q('#heatPanel > p.note.thumb-hide#heatCounts') && !!q('#heatPanel > p.note.thumb-hide#heatHover') && !!q('aside.side > #evidence.panel.sec button.chip#infoBtn'),
    drawer: !!q('.drawer#drawer[hidden] > .sheet[role=dialog][aria-modal=true][aria-labelledby=drawerTitle]'),
    leanClasses: all('#evidence > div').map((d) => d.className), labels: all('#evidence > div > .ok').map((s) => s.textContent),
    banned: all('.tier, .tiergrid, .lean-badge, .lean.interp, .subhead, .vout, .spindetails, .reading, .tag-ok, .stagewrap, .tierpanel, [data-ctl], [data-ro]').length,
    grid: getComputedStyle(q('.app')).gridTemplateColumns
  };
});
check('no data-theme on <html> and no inline script in <head>', !frame.theme && frame.inlineHead === 0);
check('<head> loads ../assets/theme.css, style.css and ../assets/shell.js; main.js is the only body script', JSON.stringify(frame.styles) === '["../assets/theme.css","style.css"]' && JSON.stringify(frame.headScripts) === '["../assets/shell.js"]' && JSON.stringify(frame.bodyScripts) === '["main.js"]', JSON.stringify(frame));
check('header: crumb, logo, tagline and the language switch; no theme switch anywhere', frame.header && frame.themes === 0 && !/data-theme|tr-viz-theme|setTheme/.test(js));
check('three columns: deck (#inputs + #readouts, aria-live) | center (ledger + rail) | side (map + evidence)', frame.cols.every(Boolean) && frame.deck && frame.rail && frame.side && frame.drawer && frame.grid.split(' ').length === 3, JSON.stringify(frame.grid));
check('inputs: three .num-field (label, − number +, range) and the presets with Swap, Random, Reset', frame.fields.length === 3 && frame.fields.every(Boolean) && frame.presets);
check('readouts: 6 half-width items, 1 glowing hero (b, .sub, .okmark) and 2 wide verification rows', frame.ro.half === 6 && frame.ro.hero === 1 && frame.ro.wide === 2 && frame.ro.total === 9 && frame.ro.heroParts, JSON.stringify(frame.ro));
check('ledger panel order: .head, .rules, .stage, .sheetwrap, .tape-row, .toast', JSON.stringify(frame.ledgerKids) === JSON.stringify(['head', 'rules', 'stage', 'sheetwrap', 'tape-row', 'toast']), JSON.stringify(frame.ledgerKids));
check('four rule badges r0, r1, rj, ra', frame.rules);
check('stage: canvas, scanlines, four brackets, HUD (big + sub) and the three view chips; 210px tall', frame.stage && Math.abs(frame.stageH - 210) < 1, String(frame.stageH));
check('ledger rows in HTML: header, input (√d), seed sum (#0), 8 passes with lab/cells/sgn/code/name, final prime row', frame.rows.hdr === 1 && frame.rows.input === 1 && frame.rows.sum === 1 && frame.rows.pass === 8 && frame.rows.final === 1 && frame.rows.parts, JSON.stringify(frame.rows));
check('sign tape with 8 clickable squares, label and sum; toast is a status region', frame.tape);
check('evidence uses only the standard boxes and labels; no custom chrome from the earlier page',
  frame.leanClasses.every((c) => ['lean', 'lean num', 'lean model', 'lean argued', 'lean open'].includes(c)) && frame.labels.filter((l) => l === 'LEAN ✓').length === 4 && frame.labels.includes('NUM') && frame.labels.includes('OPEN') && frame.labels.every((l) => ['LEAN ✓', 'NUM', 'MODEL', 'ARGUED', 'OPEN'].includes(l)) && frame.banned === 0, JSON.stringify(frame.labels));
check('every .zh fragment of the page source has an .en partner', (html.match(/class="zh"/g) || []).length === (html.match(/class="en"/g) || []).length);

/* =============================== the page's own self-test =============================== */
const self = await D(() => window.__vizTest.run());
check(`in-page self-test: ${self.passed}/${self.total} checks pass`, self.failed === 0 && self.total > 100, JSON.stringify(self.results.filter((r) => !r.ok).slice(0, 3)));
await open('?lang=zh');

/* =============================== the Pell ledger against the independent continued fractions =============================== */
check('squarefree d in 2 … 37 and primes 2 … 97 agree', JSON.stringify(await D(() => PYTHAGORAS_ESCAPE.squarefree())) === JSON.stringify(squarefreeList) && JSON.stringify(await D(() => PYTHAGORAS_ESCAPE.ledgerPrimes())) === JSON.stringify(primes97));
let cfOK = true, cfBad = '';
for (const d of squarefreeList) {
  const L = await D((x) => PYTHAGORAS_ESCAPE.ledger(x), d), mine = cfIndependent(d, 8);
  const ok = L.steps.length === 8 && L.steps.every((s, i) => s.a === mine[i].a && BigInt(s.m) === mine[i].m && BigInt(s.n) === mine[i].n && BigInt(s.norm) === mine[i].norm);
  const fundOK = L.fund.norm === (L.period % 2 ? -1 : 1) && BigInt(L.fund.m) ** 2n - BigInt(d) * BigInt(L.fund.n) ** 2n === BigInt(L.fund.norm) && mine.slice(0, L.period - 1).every((r) => r.norm !== 1n && r.norm !== -1n);
  if (!ok || !fundOK) { cfOK = false; cfBad = `d = ${d}`; break; }
}
check('all 23 ledgers: partial quotients, convergents and exact norms equal the independent continued fractions; the fundamental unit is the first ±1', cfOK, cfBad);
check('√2 is Theon’s ladder: 1/1, 3/2, 7/5, 17/12, … with norms −1, +1, −1, …', (await D(() => PYTHAGORAS_ESCAPE.ledger(2).steps.map((s) => `${s.m}/${s.n}:${s.norm}`).join())) === '1/1:-1,3/2:1,7/5:-1,17/12:1,41/29:-1,99/70:1,239/169:-1,577/408:1');
let gridOK = true;
for (const d of [2, 3, 5, 13]) {
  const g = await D(([x, n]) => PYTHAGORAS_ESCAPE.grid(x, n), [d, 64]);
  for (let m = 0; m < 64 && gridOK; m++) for (let n = 0; n < 64; n++) { const v = m * m - d * n * n, c = v === 1 ? '+' : v === -1 ? '-' : '.'; if (g[m * 64 + n] !== c) { gridOK = false; break; } }
}
check('the chirality map marks exactly the cells with m² − d n² = ±1 (d = 2, 3, 5, 13 over 64 × 64)', gridOK);

/* =============================== primes, E_d and congruent numbers =============================== */
let splitOK = true;
for (const p of primes97) {
  const s = await D((x) => PYTHAGORAS_ESCAPE.split(x), p);
  let found = null; for (let a = 1; a * a < p && !found; a++) { const b2 = p - a * a, b = Math.round(Math.sqrt(b2)); if (b * b === b2) found = [a, b]; }
  const minus1 = [...Array(p).keys()].some((x) => (x * x + 1) % p === 0);
  const want = p === 2 ? 'ramified' : p % 4 === 1 ? 'split' : 'inert';
  if (s.cls !== want || (found !== null) !== (p % 4 !== 3) || s.minusOneSquare !== minus1 || (s.a !== null && s.a * s.a + s.b * s.b !== p) || (s.tri && s.tri.leg1 ** 2 + s.tri.leg2 ** 2 !== p * p)) splitOK = false;
}
check('25 primes: split ⇔ p = a² + b² ⇔ −1 is a square mod p; the triple (|a² − b²|, 2ab, p) is Pythagorean', splitOK);
let edOK = true, hasseOK = true, cmOK = true, edBad = '';
for (const d of squarefreeList) for (const p of primes97) {
  const r = await D(([x, y]) => PYTHAGORAS_ESCAPE.frobE(x, y), [d, p]), n = countEd(d, p), bad = (2 * d) % p === 0;
  if (r.count !== n || r.ap !== p + 1 - n || r.bad !== bad) { edOK = false; edBad = `${d},${p}`; }
  if (!bad && r.ap * r.ap > 4 * p) hasseOK = false;
  if (!bad && p % 4 === 3 && r.ap !== 0) cmOK = false;
}
check('#E_d(𝔽ₚ) by brute force over 𝔽ₚ × 𝔽ₚ equals the page for all 575 pairs (d, p); bad exactly at p | 2d', edOK, edBad);
check('Hasse aₚ² ≤ 4p at every good pair, and aₚ = 0 for p ≡ 3 (mod 4)', hasseOK && cmOK);
let congOK = true, congBad = '';
const congruent = [];
for (const d of squarefreeList) {
  const c = await D((x) => PYTHAGORAS_ESCAPE.congruent(x), d), t = tunnellIndependent(d);
  if (c.tunnell.A !== t.A || c.tunnell.B !== t.B) { congOK = false; congBad = `Tunnell ${d}`; }
  if (c.congruent) {
    congruent.push(d);
    const [an, ad] = frac(c.a), [bn, bd] = frac(c.b), [cn, cd] = frac(c.c);
    const pyth = (an * an * bd * bd + bn * bn * ad * ad) * cd * cd === cn * cn * ad * ad * bd * bd, area = an * bn === 2n * BigInt(d) * ad * bd;
    const [xn, xd] = frac(c.x), [yn, yd] = frac(c.y), D2 = BigInt(d * d);
    const onE = yn * yn * xd * xd * xd === (xn * xn * xn - D2 * xn * xd * xd) * yd * yd;
    if (!pyth || !area || !onE || t.A !== 2 * t.B) { congOK = false; congBad = `d = ${d}`; }
  } else if (t.A === 2 * t.B) { congOK = false; congBad = `d = ${d} has A = 2B but no triangle`; }
}
check('congruent d ≤ 37: a stored point on E_d gives a² + b² = c², ab/2 = d exactly; Tunnell counts agree and A ≠ 2B elsewhere', congOK && congruent.join() === '5,6,7,13,14,15,21,22,23,29,30,31,34,37', congBad || congruent.join());

/* =============================== the earlier pure mathematics, kept by the page =============================== */
let p1 = true;
for (const deg of [0, 12.5, 30, THETA_STAR / DEG, 45, 60, 77, 90]) {
  const r = await D((t) => PYTHAGORAS_ESCAPE.pythagorean(t), deg * DEG), a = Math.cos(deg * DEG), b = Math.sin(deg * DEG);
  if (Math.abs(r.a - a) > 1e-15 || Math.abs(r.b - b) > 1e-15 || Math.abs(r.sum - 1) > 1e-15 || r.wedgeSum !== 0 || Math.abs(r.lagLHS - b * b) > 1e-15 || Math.abs(r.plLHS - 2) > 2e-15 || Math.abs(r.p0 + r.p1 - 1) > 1e-15) p1 = false;
}
check('kept: cos²θ + sin²θ = 1, a∧b + b∧a = 0, Lagrange 1 − a² = b², parallelogram = 2, Born P₀ + P₁ = 1 at 8 angles', p1);
const rows = await D(() => PYTHAGORAS_ESCAPE.pell());
check('kept: seven Pell rows of √2 agree with (1 + √2)ᵏ in BigInt, m² − 2n² = (−1)ᵏ', rows.length === 7 && rows.every((r, i) => BigInt(r.m) === pell2[i][0] && BigInt(r.n) === pell2[i][1] && BigInt(r.diff) === ((i + 1) % 2 ? -1n : 1n)));
const gons = await D(() => PYTHAGORAS_ESCAPE.gons());
check('kept: Liu Hui s_N = 2 sin(π/N), A_2N < π < 2A_2N − A_N for N = 6 … 96', gons.length === 5 && gons.every((g) => Math.abs(g.s - 2 * Math.sin(Math.PI / g.N)) < 1e-14 && g.area2N < Math.PI && Math.PI < g.upper));
let countOK = true;
for (const [cid, A, B] of [['E1', -1, 0], ['E2', -1, 1]]) {
  const table = await D((c) => PYTHAGORAS_ESCAPE.frobTable(c), cid);
  if (table.map((r) => r.p).join() !== PRIMES.join()) countOK = false;
  for (const r of table) { const n = countPoints(A, B, r.p); if (n !== r.count || r.ap !== r.p + 1 - n || r.ap * r.ap > 4 * r.p) countOK = false; }
}
check('kept: #E₁, #E₂ over 𝔽ₚ by brute force for the 44 primes 5 … 199, Hasse holds', countOK);

/* =============================== readouts =============================== */
const hero = () => D(() => ({ t: document.getElementById('roDeficit').textContent, c: document.getElementById('roDeficit').className, m: document.getElementById('roDeficitMark').textContent }));
let h = await hero();
check('hero: √2 step 4 shows Δ = +1 in cyan with ✓', h.t === '+1' && h.c === 'vpos' && h.m === '✓', JSON.stringify(h));
await D(() => PYTHAGORAS_ESCAPE.step(5)); await settle();
h = await hero();
check('hero: step 5 (41/29) shows Δ = −1 in magenta with ✓', h.t === '−1' && h.c === 'vneg' && h.m === '✓' && /41\/29/.test(await text('#roConv')), JSON.stringify(h));
await D(() => PYTHAGORAS_ESCAPE.set({ d: 13, k: 1 })); await settle();
h = await hero();
check('hero: √13 step 1 (3/1) shows Δ = −4, neutral, no ✓', h.t === '−4' && h.c === 'vzero' && h.m === '—', JSON.stringify(h));
check('Pythagorean row: 13 = 3² + 2² gives 5² + 12² = 13² ✓ and the congruent number 30', /5² \+ 12² = 13²/.test(await text('#roPyth')) && /✓/.test(await text('#roPyth')) && /30/.test(await text('#roPyth')));
await D(() => PYTHAGORAS_ESCAPE.set({ d: 2, p: 13 })); await settle();
check('Hasse row for E₂ at p = 13: |a₁₃| ≤ 2√13 = 7.2111 ✓', /≤ 2√13 = 7\.2111/.test(await text('#roHasseBound')) && /✓/.test(await text('#roHasseBound')), await text('#roHasseBound'));
await D(() => PYTHAGORAS_ESCAPE.set({ p: 7 })); await settle();
check('inert p = 7: no lattice triangle and no Gaussian split', /7 ≠ a² \+ b²/.test(await text('#roPyth')) && /^—/.test(await text('#roGauss')));
await D(() => PYTHAGORAS_ESCAPE.set({ d: 6, p: 3 })); await settle();
check('p = 3 divides 2d = 12: bad reduction, Hasse marked not applicable', /p \| 2d/.test(await text('#roHasseBound')) && !/✓/.test(await text('#roHasseBound')));
await D(() => PYTHAGORAS_ESCAPE.reset()); await settle();

/* =============================== controls =============================== */
await page.fill('#dNum', '7'); await page.press('#dNum', 'Enter'); await settle();
await page.locator('#d').fill('21'); await settle();
st = await state();
check('number box and slider set d (7, then 21)', st.d === 21 && (await D(() => document.getElementById('dNum').value)) === '21');
await page.click('#dDec'); await settle();
check('the d stepper skips non-squarefree numbers (21 → 19)', (await state()).d === 19);
await page.fill('#dNum', '4'); await page.press('#dNum', 'Enter'); await settle();
check('a non-squarefree d snaps to the nearest squarefree value (4 → 5)', (await state()).d === 5);
await page.fill('#pNum', '50'); await page.press('#pNum', 'Enter'); await settle();
check('a composite p snaps to the nearest prime (50 → 53)', (await state()).p === 53);
await page.click('#pDec'); await settle();
check('the p stepper goes to the previous prime (47)', (await state()).p === 47);
await page.fill('#pNum', '500'); await page.press('#pNum', 'Enter'); await settle();
check('out-of-range p is clamped to 97', (await state()).p === 97);
await page.fill('#kNum', '6'); await page.press('#kNum', 'Enter'); await page.click('#kInc'); await settle();
check('k box and stepper set the step (6 → 7) and the rail follows', (await state()).k === 7 && (await D(() => document.getElementById('pass').value)) === '7');
for (const [pr, key, val, view] of [['d=2', 'd', 2, 'pell'], ['d=5', 'd', 5, 'pell'], ['d=6', 'd', 6, 'elliptic'], ['p=13', 'p', 13, 'primes'], ['p=7', 'p', 7, 'primes']]) {
  await page.click(`#presets [data-preset="${pr}"]`); await settle();
  const s = await state();
  check(`preset ${pr} applies, switches to the ${view} view and is marked`, s[key] === val && s.view === view && (await D((q) => document.querySelector(`#presets [data-preset="${q}"]`).getAttribute('aria-pressed'), pr)) === 'true');
}
check('Swap is disabled for d = 6 (not prime)', await D(() => document.getElementById('swap').disabled));
await page.click('#reset'); await settle();
st = await state();
check('Reset returns to √2, p = 13, step 4, view Pell', st.d === 2 && st.p === 13 && st.k === 4 && st.view === 'pell');
await page.click('#swap'); await settle();
st = await state();
check('Swap d ↔ p: (2, 13) → (13, 2); the ledger of √13 reaches 18² − 13·5² = −1 at step 5', st.d === 13 && st.p === 2 && (await D(() => { const s = PYTHAGORAS_ESCAPE.ledger(13).steps[4]; return s.m === '18' && s.n === '5' && s.norm === -1; })));
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('s'); await settle();
st = await state();
check('S swaps back from the keyboard', st.d === 2 && st.p === 13);
await page.click('#random'); await settle();
st = await state();
check('Random picks a squarefree d and a prime p', squarefreeList.includes(st.d) && primes97.includes(st.p) && !(st.d === 2 && st.p === 13));
await page.click('#nChips [data-n="13"]'); await settle();
check('the d = 13 chip of the map sets d and is marked', (await state()).d === 13 && (await D(() => document.querySelector('#nChips [data-n="13"]').getAttribute('aria-pressed'))) === 'true');
for (const v of ['primes', 'elliptic', 'pell']) {
  await page.click(`#viewChips [data-view-set="${v}"]`); await settle();
  check(`view chip ${v} switches the stage, is marked and draws the diagram`, (await state()).view === v && (await D((x) => document.querySelector(`#viewChips [data-view-set="${x}"]`).getAttribute('aria-pressed'), v)) === 'true' && (await lit('stageCanvas')) > 300);
}
await page.click('#reset'); await settle();
await page.click('#first'); await settle();
check('⏮ goes to step 1; later rows dimmed; ◀ disabled', (await state()).k === 1 && (await D(() => document.querySelectorAll('#ledger .drow.future').length)) === 7 && (await D(() => document.getElementById('prev').disabled)));
await page.click('#next'); await page.click('#next'); await settle();
check('▶▶ steps one convergent at a time and marks the current row and tape square', (await state()).k === 3 && (await D(() => document.querySelector('#ledger .drow.now').dataset.pass)) === '3' && (await D(() => document.querySelector('#tape i.now').dataset.pass)) === '3');
await page.click('#prev'); await settle();
check('◀ steps back', (await state()).k === 2);
await page.click('#last'); await settle();
check('⏭ jumps to step 8; ▶▶ disabled', (await state()).k === 8 && (await D(() => document.getElementById('next').disabled)));
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('ArrowLeft'); await settle();
check('← steps back from the keyboard', (await state()).k === 7);
await page.keyboard.press('Home'); await page.keyboard.press('ArrowRight'); await settle();
check('Home and → work from the keyboard', (await state()).k === 2);
await page.keyboard.press('v'); await settle();
check('V cycles the view', (await state()).view === 'primes');
await page.click('#ledger .drow[data-pass="5"]'); await settle();
check('clicking a ledger row selects that step', (await state()).k === 5);
await page.click('#tape i[data-pass="3"]'); await settle();
check('clicking a tape square selects that step', (await state()).k === 3);
await page.locator('#pass').fill('6'); await settle();
check('the rail slider selects the step', (await state()).k === 6);
await page.click('#first'); await page.click('#play'); await settle();
check('▶ plays the convergents', (await state()).playing === true);
await page.waitForFunction(() => !PYTHAGORAS_ESCAPE.state().playing, null, { timeout: 20000 }).catch(() => {});
await page.waitForFunction(() => getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 5000 }).catch(() => {});
check('playback stops at step 8 and reports the ±1 counts', (await state()).k === 8 && /√2：8 步中范数 \+1 出现 4 次、−1 出现 4 次/.test(await text('#toast')), await text('#toast'));
await D(() => PYTHAGORAS_ESCAPE.step(4)); await settle();
const pt = await D(() => PYTHAGORAS_ESCAPE.cellPoint(5, 7));
await page.mouse.click(pt.x, pt.y); await settle();
check('clicking the map at (n, m) = (5, 7) selects the nearest convergent, step 3 (7/5)', (await state()).k === 3, JSON.stringify(await state()));
check('the map is drawn with its ±1 cells and the counts confirm every ±1 cell is a convergent', (await lit('heat', 60)) > 10000 && /✓/.test(await text('#heatCounts')) && (await text('#heatRange')) === '16 × 16');
const hp = await D(() => PYTHAGORAS_ESCAPE.cellPoint(2, 3));
await page.mouse.move(hp.x + 1, hp.y + 1); await settle();
check('hovering the map (now 16 × 16) at (n, m) = (2, 3) reports Δ = 9 − 8 = +1', /\(m, n\) = \(3, 2\) → Δ = \+1/.test(await text('#heatHover')), await text('#heatHover'));

/* =============================== Lean links; drawer =============================== */
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check('every Lean link points at the pinned commit, file and line of trureturing.lock.json, and names a theorem', links.length >= 4 && links.every(([gid, href]) => {
  const d = lock.declarations[gid]; return d && d.kind === 'theorem' && href === `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${d.line}`;
}), JSON.stringify(links.slice(0, 2)));
check('the page cites exactly the four pinned theorems', JSON.stringify([...new Set(links.map(([g]) => g))].sort()) === JSON.stringify([...LEAN].sort()));
await page.click('#infoBtn');
check('theory drawer opens and says the page is a numerical illustration, not a proof', (await D(() => document.getElementById('drawer').hidden)) === false && /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
check('drawer chapter links point to the coda and chapters 1, 2, 3, 6 of this book and open in the top window', await D(() => { const a = [...document.querySelectorAll('#drawer a[href^="../../"]')]; return a.length === 16 && a.every((x) => /^\.\.\/\.\.\/(zh|en)\/(coda|ch01-measurement|ch02-born-rule|ch03-projectors-and-duality|ch06-geometric-product)\.html#/.test(x.getAttribute('href')) && x.target === '_top'); }));
await page.keyboard.press('Escape');
check('Esc closes the drawer and focus returns to its button', (await D(() => document.getElementById('drawer').hidden)) === true && (await D(() => document.activeElement.id)) === 'infoBtn');

/* =============================== language =============================== */
await page.click('[data-lang-set="en"]'); await settle();
for (const v of ['pell', 'primes', 'elliptic']) {
  await D((x) => PYTHAGORAS_ESCAPE.view(x), v); await settle();
  const left = await cjkLeftovers(page), lab = await D(() => PYTHAGORAS_ESCAPE.labels());
  check(`no visible Chinese in English mode, view ${v} (DOM and stage labels)`, left.length === 0 && lab.length > 3 && lab.every((s) => !CJK.test(s)), left.concat(lab.filter((s) => CJK.test(s))).slice(0, 6).join(' | '));
}
for (const p of ['p=7', 'd=6', 'd=5']) {
  await page.click(`#presets [data-preset="${p}"]`); await settle();
  const left = await cjkLeftovers(page);
  check(`no visible Chinese in English mode after preset ${p}`, left.length === 0, left.slice(0, 6).join(' | '));
}
await page.click('#infoBtn');
let left = await cjkLeftovers(page);
check('no visible Chinese in the English drawer', left.length === 0, left.slice(0, 6).join(' | '));
await page.keyboard.press('Escape');
check('English title', (await D(() => document.title)).startsWith('ORTHO//PYTHAGORAS · Pell chirality ledger'));
await page.click('#presets [data-preset="d=2"]'); await settle();
await D(() => document.activeElement && document.activeElement.blur());
await page.keyboard.press('End'); await settle(); await page.click('#play');
await page.waitForFunction(() => !PYTHAGORAS_ESCAPE.state().playing && getComputedStyle(document.getElementById('toast')).opacity === '1', null, { timeout: 20000 }).catch(() => {});
check('the end-of-playback toast is in English', /^√2: in 8 steps the norm is \+1 4× and −1 4×; \|Δ\| never drops below 1$/.test(await text('#toast')), await text('#toast'));

/* =============================== hub round trip =============================== */
await page.click('.crumb'); await page.waitForLoadState('load');
check('the crumb opens the hub, which keeps the language and lists this visualization', (await D(() => document.documentElement.dataset.lang)) === 'en'
  && (await D((id) => document.querySelectorAll(`.card[data-viz="${id}"]`).length, ID)) === 1 && (await D((id) => !!document.querySelector(`.card[data-viz="${id}"] img[src="${id}/thumb.jpg"]`), ID)));
left = await cjkLeftovers(page);
check('no visible Chinese on the English hub', left.length === 0, left.slice(0, 6).join(' | '));
await page.click(`.card[data-viz="${ID}"] .enter`); await page.waitForLoadState('load');
await page.waitForFunction(() => window.PYTHAGORAS_ESCAPE && PYTHAGORAS_ESCAPE.frames() > 0, null, { timeout: 30000 });
check('the hub card opens this page', (await D(() => document.body.dataset.vizId)) === ID);

/* =============================== layouts =============================== */
const hudClear = () => D(() => { const a = document.getElementById('hudBig').getBoundingClientRect(), b = document.getElementById('viewChips').getBoundingClientRect(); return a.right <= b.left + 1 || a.bottom <= b.top + 1 || b.bottom <= a.top + 1; });
for (const lang of ['zh', 'en']) {
  for (const [w, hh] of [[390, 844], [820, 1000], [1440, 900]]) {
    await page.setViewportSize({ width: w, height: hh });
    for (const v of ['pell', 'elliptic']) {
      await open(`?lang=${lang}&view=${v}`); await settle();
      check(`no horizontal scroll and a clear HUD at ${w}px (${lang}, ${v})`, (await overflowX(page)) === 0 && (await hudClear()));
    }
  }
}
await page.setViewportSize({ width: 740, height: 560 });
await open('?embed=1&lang=en&view=primes'); await settle();
check('?embed=1 hides the header, crumb and key help', await D(() => ['header.top', '.crumb', '.keys'].every((s) => getComputedStyle(document.querySelector(s)).display === 'none') && document.documentElement.dataset.embed === '1'));
check('?embed=1&lang=en&view=primes starts in English on the primes view', (await D(() => TRV.lang())) === 'en' && (await state()).view === 'primes' && (await cjkLeftovers(page)).length === 0);
check('embedded at 740px: two columns, a clear HUD, no horizontal scroll', (await overflowX(page)) === 0 && (await hudClear()) && (await D(() => { const a = document.getElementById('inputs').getBoundingClientRect(), b = document.getElementById('ledgerPanel').getBoundingClientRect(); return b.left > a.right - 1 && Math.abs(a.top - b.top) < 40; })));
await page.setViewportSize({ width: 360, height: 560 });
await open('?embed=1&lang=zh'); await settle();
check('embedded at 360px: no horizontal scroll', (await overflowX(page)) === 0);
await page.setViewportSize({ width: 1280, height: 720 });
await open('?thumb=1&lang=zh'); await settle();
await D(() => TRV_THUMB()); await settle();
check('?thumb=1: the chirality-map panel fills the frame and the word-free cover is drawn', await D(() => { const r = document.getElementById('heat').getBoundingClientRect(); return document.documentElement.dataset.thumbMode === '1' && r.width === 1280 && r.height === 720; }) && (await lit('heat', 60)) > 50000 && (await state()).k === 5);
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.setViewportSize({ width: 1440, height: 900 });
await open('?lang=zh'); await settle();
check('reduced motion is honoured (no logo glitch)', (await D(() => TRV.reduceMotion)) === true && (await D(() => !document.getElementById('app').classList.contains('glitching'))));

check('no script errors, failed requests or console errors during the session', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
