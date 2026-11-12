#!/usr/bin/env node
// Browser regression suite for BLADE//XOR (books/quantum-geometry/viz/blade-multiplication/):
//   node books/quantum-geometry/viz/tests/blade-multiplication.test.mjs        (or node tools/node/viz-test.mjs quantum-geometry)
// It first runs the quality gates every stage-first page must pass, then reads the page through the read-only probe
// window.BX_DEBUG and checks every claim against an independent computation written here: 2 × 2 complex matrices
// (e₁ ↦ X, e₂ ↦ Y, e₃ ↦ Z, and the words Xᵃ Zᵇ), the product identified by searching all ± blades (no XOR, no
// inversion formula), inversions counted pair by pair in the joined index string, and B(a) of chapter 25 squared.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until, cjkLeftovers } from '../../../../tools/node/viz-testkit.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..');
const BOOK = 'quantum-geometry', ID = 'blade-multiplication';
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const chapter = fs.readFileSync(path.join(ROOT, 'books', BOOK, 'zh', 'ch25-rewriting-and-xor.md'), 'utf8');

/* ---------- independent algebra: complex 2 × 2 matrices ---------- */
const C = (re, im = 0) => ({ re, im });
const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cadd = (a, b) => C(a.re + b.re, a.im + b.im);
const mat = (rows) => rows.map((r) => r.map((z) => (typeof z === 'number' ? C(z) : z)));
const mul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(A[i][0], B[0][j]), cmul(A[i][1], B[1][j]))));
const scale = (A, s) => A.map((r) => r.map((z) => C(z.re * s, z.im * s)));
const same = (A, B) => A.every((r, i) => r.every((z, j) => Math.abs(z.re - B[i][j].re) < 1e-12 && Math.abs(z.im - B[i][j].im) < 1e-12));
const I = mat([[1, 0], [0, 1]]), X = mat([[0, 1], [1, 0]]), Y = mat([[0, C(0, -1)], [C(0, 1), 0]]), Z = mat([[1, 0], [0, -1]]);
const blade = (m) => [X, Y, Z].reduce((A, S, i) => ((m >> i) & 1 ? mul(A, S) : A), I);   // e₁e₂e₃ in ascending order
const word = (m) => [X, Z].reduce((A, S, i) => ((m >> i) & 1 ? mul(A, S) : A), I);       // Xᵃ Zᵇ
/** Which ±basis element a matrix is, by search over the basis. */
function identify(M, basis) {
  for (let m = 0; m < basis.length; m++) for (const s of [1, -1]) if (same(M, scale(basis[m], s))) return { mask: m, sign: s };
  return null;
}
const B8 = Array.from({ length: 8 }, (_, m) => blade(m)), B4 = Array.from({ length: 4 }, (_, m) => word(m));
const cl3 = (l, r) => identify(mul(B8[l], B8[r]), B8), pauli = (l, r) => identify(mul(B4[l], B4[r]), B4);
/** Inversions of the joined index string, counted pair by pair. */
const idx = (m) => [0, 1, 2].filter((i) => (m >> i) & 1);
function inversions(l, r) { const w = [...idx(l), ...idx(r)]; let n = 0; for (let p = 0; p < w.length; p++) for (let q = p + 1; q < w.length; q++) if (w[p] > w[q]) n++; return n; }
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const T = await session();
const { check } = T;

/* ---------- the quality gates of every stage-first page ---------- */
await stageFirstChecks(T, BOOK, ID);

const page = await T.goto(BOOK, ID, '?lang=zh');
await page.evaluate(() => document.fonts && document.fonts.ready); await settle(page, 300);
const D = (fn, arg) => page.evaluate(fn, arg);
const state = async () => { await settle(page); return D(() => window.BX_DEBUG.state); };
const info = async () => { await settle(page); return D(() => window.BX_DEBUG.info()); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); await settle(page); };
const text = (sel) => page.textContent(sel);

/* ---------- opening view ---------- */
let st = await state();
check('opens on the card E2·E1: e₂ · e₁ with its one swap finished', st.preset === 'e2e1' && st.scene === 'cl3' && st.l === 2 && st.r === 1 && st.step === 1 && st.steps === 1 && !st.playing, JSON.stringify(st));
check('page carries its id', (await D(() => document.body.dataset.vizId)) === ID);

/* ---------- the whole table against matrix multiplication ---------- */
let tab = await D(() => window.BX_DEBUG.table());
let bad = '';
for (let l = 0; l < 8 && !bad; l++) for (let r = 0; r < 8; r++) {
  const m = cl3(l, r), c = tab[l][r];
  if (!m || m.mask !== c.mask || m.sign !== c.sign || c.sign !== (inversions(l, r) % 2 ? -1 : 1)) { bad = `(${l}, ${r}) page ${JSON.stringify(c)} matrices ${JSON.stringify(m)}`; break; }
}
check('8 × 8: every cell equals the product of Pauli matrices, and its sign is the parity of the inversions', !bad, bad);
check('8 × 8: the product mask is the XOR of the masks (checked against the matrix search above)', [...Array(64).keys()].every((k) => cl3(k >> 3, k & 7).mask === ((k >> 3) ^ (k & 7))));
check('the page reports its own matrix check as passed', st.matrixOk.cl3 && st.matrixOk.pauli);

/* ---------- the rewrite of every pair ---------- */
let rwBad = '';
for (let l = 0; l < 8 && !rwBad; l++) for (let r = 0; r < 8; r++) {
  await D(([a, b]) => window.BX_DEBUG.set(a, b), [l, r]);
  const q = await D(() => window.BX_DEBUG.info()), m = cl3(l, r);
  const swaps = q.steps.filter((s) => s.kind === 'swap'), cancels = q.steps.filter((s) => s.kind === 'cancel');
  const last = q.steps.length ? q.steps[q.steps.length - 1].word : q.start;
  const alternate = q.steps.every((s, k) => s.sign === ((k < swaps.length ? k + 1 : swaps.length) % 2 ? -1 : 1));
  const ok = eq(q.start, [...idx(l), ...idx(r)]) && swaps.length === inversions(l, r) && q.steps.slice(0, swaps.length).every((s) => s.kind === 'swap')
    && cancels.length === idx(l & r).length && eq(last, idx(m.mask)) && q.sign === m.sign && q.mask === m.mask && alternate
    && q.steps.every((s, k) => k === 0 || s.word.length <= q.steps[k - 1].word.length);
  if (!ok) rwBad = `(${l}, ${r}) ${JSON.stringify(q)}`;
}
check('64 rewrites: swaps = inversions, each swap flips the sign, equal pairs cancel, the last string is the product blade', !rwBad, rwBad);

/* ---------- cards ---------- */
await pick('e2e1'); await page.keyboard.press('End'); st = await state(); let x = await info();
check('E2·E1: e₂ · e₁ = −e₁₂ after one swap', st.l === 2 && st.r === 1 && x.sign === -1 && x.mask === 3 && x.swaps === 1 && cl3(2, 1).sign === -1);
tab = await D(() => window.BX_DEBUG.table());
check('E2·E1: the note\'s other order, e₁ · e₂ = +e₁₂, needs no swap, and the two cells mirror each other across the diagonal',
  cl3(1, 2).sign === 1 && cl3(1, 2).mask === 3 && inversions(1, 2) === 0 && eq(tab[1][2], { mask: 3, sign: 1 }) && eq(tab[2][1], { mask: 3, sign: -1 }));
check('E2·E1: the note names both orders and both colours', /e₁ · e₂/.test(await text('#presetNote')) && /青色/.test(await text('#presetNote')) && /品红/.test(await text('#presetNote')));
await pick('square'); st = await state(); x = await info();
check('E12²: e₁₂ · e₁₂ = −1: one swap, two cancelled pairs', st.l === 3 && st.r === 3 && st.hl === 'diag' && x.sign === -1 && x.mask === 0 && x.swaps === 1 && x.cancels === 2 && eq(cl3(3, 3), { mask: 0, sign: -1 }));
check('E12²: on the diagonal 1, e₁, e₂, e₃ square to +1 and e₁₂, e₁₃, e₂₃, I₃ to −1', [0, 1, 2, 4].every((m) => cl3(m, m).sign === 1) && [3, 5, 6, 7].every((m) => cl3(m, m).sign === -1)
  && (await D(() => window.BX_DEBUG.table())).every((row, m) => row[m].mask === 0 && row[m].sign === ([3, 5, 6, 7].includes(m) ? -1 : 1)));
await pick('pseudo'); st = await state(); x = await info();
check('I3²: I₃ · I₃ = −1 after 0 + 1 + 2 = 3 swaps and 3 cancelled pairs', st.l === 7 && st.r === 7 && st.hl === 'pseudo' && x.swaps === 3 && x.cancels === 3 && x.sign === -1 && eq(cl3(7, 7), { mask: 0, sign: -1 }) && inversions(7, 7) === 3);
check('I3²: the row and the column of I₃ agree cell by cell (I₃ commutes with every blade)', [...Array(8).keys()].every((m) => eq(cl3(7, m), cl3(m, 7))));
check('I3²: the note names the violet row and column', /紫色/.test(await text('#roNote')));
await pick('pauli'); st = await state(); x = await info();
check('PAULI: Z · X = −XZ in the 4 × 4 table of Pauli words', st.scene === 'pauli' && st.l === 2 && st.r === 1 && x.sign === -1 && x.mask === 3 && eq(pauli(2, 1), { mask: 3, sign: -1 }));
tab = await D(() => window.BX_DEBUG.table());
let pBad = '';
for (let l = 0; l < 4; l++) for (let r = 0; r < 4; r++) {
  const m = pauli(l, r), b = (l >> 1) & 1, c = r & 1;
  if (!m || m.mask !== tab[l][r].mask || m.sign !== tab[l][r].sign || m.sign !== (b * c ? -1 : 1)) pBad = `(${l}, ${r})`;
}
check('PAULI: all 16 cells equal the products of XᵃZᵇ, and the sign is (−1)^(bc): minus only where left has Z and right has X', tab.length === 4 && !pBad, pBad);
check('PAULI: four cells carry a minus sign', tab.flat().filter((c) => c.sign < 0).length === 4);
await pick('vector'); st = await state();
const V = [[3, 0], [4, 1], [12, 2]], terms = [];
for (const [a, i] of V) for (const [b, j] of V) { const m = cl3(1 << i, 1 << j); terms.push({ mask: m.mask, coef: a * b * m.sign }); }
const sumsAt = (n) => { const o = { 0: 0, 3: 0, 5: 0, 6: 0 }; terms.slice(0, n).forEach((t) => { o[t.mask] += t.coef; }); return o; };
const vec = await D(() => window.BX_DEBUG.table());
check('V²: the nine terms of (3e₁ + 4e₂ + 12e₃)² on the page equal the matrix products', eq(vec.flat(), terms));
let sOK = true; for (let n = 0; n <= 9; n++) { const p = await D((k) => window.BX_DEBUG.sums(k), n), q = sumsAt(n); if (!eq(Object.keys(q).map((k) => p[k]), Object.values(q))) sOK = false; }
check('V²: the running coefficients after each term match the sums here', sOK);
const vm = mul(mat([[12, C(3, -4)], [C(3, 4), -12]]), mat([[12, C(3, -4)], [C(3, 4), -12]]));
const bsq = await D(() => window.BX_DEBUG.bsq());
check('V²: v² = 169 = 13², and B(3, 4, 12)² = 169·I as the page says', st.scene === 'vector' && eq(sumsAt(9), { 0: 169, 3: 0, 5: 0, 6: 0 }) && same(vm, scale(I, 169))
  && bsq.every((row, i) => row.every((z, j) => Math.abs(z[0] - vm[i][j].re) < 1e-12 && Math.abs(z[1] - vm[i][j].im) < 1e-12)));
{ const done = await until(page, () => window.BX_DEBUG.state.step === 9 && !window.BX_DEBUG.state.playing, null, 180000); await settle(page); check('V²: the card plays the nine terms in and ends at v² = 169', done && /169/.test(await text('#roKey')), JSON.stringify([done, await text('#roKey'), await D(() => window.BX_DEBUG.state)])); }

/* ---------- cards play when clicked ---------- */
await page.click('[data-preset="pseudo"]');
check('a card that plays starts its rail from the beginning when clicked', await until(page, () => { const s = window.BX_DEBUG.state; return s.playing || (s.t > 0 && s.t < s.max) || s.step === 6; }));
check('…and finishes the six steps by itself', await until(page, () => window.BX_DEBUG.state.step === 6 && !window.BX_DEBUG.state.playing, null, 180000));

/* ---------- the rail ---------- */
await D(() => window.BX_DEBUG.seek(0)); st = await state();
check('the rail goes back to the joined string', st.step === 0 && /0/.test(await text('#tau')));
await page.click('body', { position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await settle(page); await page.keyboard.press('ArrowRight'); st = await state();
check('→ steps one swap or cancellation at a time', st.step === 2, String(st.t));
await page.keyboard.press('ArrowLeft'); check('← steps back', (await state()).step === 1);
await page.keyboard.press('End'); check('End jumps to the product', (await state()).step === 6);
await page.keyboard.press('Home'); await settle(page); await page.keyboard.press('Space');
check('Space plays the rewrite', await until(page, () => window.BX_DEBUG.state.t > 0));
await page.keyboard.press('Space'); await settle(page);
await page.click('#rew'); check('⏮ returns to the start', (await state()).t === 0);
await D(() => window.BX_DEBUG.seek(6)); await settle(page);
let pt = await D(() => window.BX_DEBUG.point.row(2));
await page.mouse.click(pt.x, pt.y); st = await state();
check('clicking a row of the rewrite goes to that step', st.step === 2, String(st.t));

/* ---------- controls ---------- */
pt = await D(() => window.BX_DEBUG.point.cell(4, 1));
await page.mouse.click(pt.x, pt.y); st = await state(); x = await info();
check('clicking a cell of the table picks that pair: e₃ · e₁ = −e₁₃', st.l === 4 && st.r === 1 && x.mask === 5 && x.sign === -1 && st.preset === null && /自由探索/.test(await text('#presetNote')));
check('the readouts show the XOR and the swaps', (await text('#ro1')).includes('100₂ ⊕ 001₂ = 101₂') && (await text('#ro2')).startsWith('1'));
await page.click('#leftChips [data-left="6"]'); await settle(page); await page.click('#rightChips [data-right="5"]'); st = await state(); x = await info();
check('the blade chips set the left and right factors: e₂₃ · e₁₃', st.l === 6 && st.r === 5 && x.mask === 3 && x.sign === cl3(6, 5).sign);
await page.click('#swapBtn'); st = await state(); check('the swap button exchanges the factors', st.l === 5 && st.r === 6 && (await info()).sign === cl3(5, 6).sign);
await page.keyboard.press('s'); st = await state(); check('S exchanges them from the keyboard', st.l === 6 && st.r === 5);
await page.click('#sceneChips [data-scene="pauli"]'); st = await state();
check('the scene chip switches to Pauli words and keeps the pair inside 0 … 3', st.scene === 'pauli' && st.l < 4 && st.r < 4 && (await D(() => document.querySelectorAll('#leftChips button:not([hidden])').length)) === 4);
check('the Pauli scene shows its green box and hides the others', await D(() => !document.querySelector('.lean[data-scenes="pauli"]').hidden && document.querySelector('.lean[data-scenes="cl3"]').hidden));
await page.click('body', { position: { x: 5, y: 5 } });
for (const [key, sc] of [['3', 'vector'], ['1', 'cl3'], ['2', 'pauli']]) { await page.keyboard.press(key); check(`key ${key} switches to the scene ${sc}`, (await state()).scene === sc); }
await page.keyboard.press('3'); await settle(page);
pt = await D(() => window.BX_DEBUG.point.cell(1, 0));
await page.mouse.click(pt.x, pt.y); st = await state();
check('in the vector scene clicking a cell jumps to that term (4e₂ · 3e₁ is the fourth)', st.step === 4 && (await D(() => window.BX_DEBUG.sums()))[3] === 0);

/* ---------- evidence: the declaration map comes from the chapter and the lock file ---------- */
const chapterGids = [...new Set([...chapter.matchAll(/lean="([^"]+)"/g)].flatMap((m) => m[1].split(/\s+/)))].filter((g) => lock.declarations[g] && lock.declarations[g].kind === 'theorem');
const url = (gid) => `https://github.com/${lock.repo}/blob/${lock.commit}/${gid.slice(0, gid.lastIndexOf('.'))}.lean#L${lock.declarations[gid].line}`;
const map = await D(() => [...document.querySelectorAll('#declmap .lean a[data-lean-gid]')].map((a) => [a.dataset.leanGid, a.href]));
check(`the declaration map lists exactly the ${chapterGids.length} theorems chapter 25 cites with lean=`, map.length === chapterGids.length && eq(map.map(([g]) => g).sort(), [...chapterGids].sort()), JSON.stringify(map.map(([g]) => g)));
check('every entry of the map links to the pinned commit, file and line of the lock file', map.every(([g, h]) => h === url(g)));
const links = await D(() => [...document.querySelectorAll('a[data-lean-gid]')].map((a) => a.dataset.leanGid));
check('every green link on the page is one of the chapter’s theorems', links.every((g) => chapterGids.includes(g)));
const registry = JSON.parse(fs.readFileSync(path.join(ROOT, 'books', BOOK, 'viz', 'visualizations.json'), 'utf8')).visualizations.find((v) => v.id === ID);
check('the registry lists exactly the theorems the page cites', eq([...new Set(links)].sort(), registry.lean.map((l) => l.gid).sort()));
check('the bit rule itself is labelled NUM, not green', await D(() => { const b = document.querySelector('.lean.num[data-scenes="cl3"]'); return !!b && !b.querySelector('a[data-lean-gid]'); }));
check('Cl(3,0) ≅ M₂(ℂ) is labelled a literature result', await D(() => /文献结果，未在本书形式化/.test(document.querySelector('.lean.argued').textContent)));
await page.click('#infoBtn');
check('the drawer says the page is a numerical illustration, not a proof', /数值演示，不是证明/.test(await text('#drawer div.zh')) && /numerical illustration, not a proof/.test(await text('#drawer div.en')));
await page.keyboard.press('Escape');

/* ---------- English ---------- */
await page.click('[data-lang-set="en"]'); await settle(page, 150);
check('English title', (await D(() => document.title)).startsWith('BLADE//XOR · Multiplying blades'));
for (const sc of ['cl3', 'pauli', 'vector']) { await page.click(`#sceneChips [data-scene="${sc}"]`); await settle(page); const left = await cjkLeftovers(page); check(`English: no Chinese left in the scene ${sc} after free play`, left.length === 0, left.slice(0, 4).join(' | ')); }
await D(() => { try { localStorage.removeItem('tr-lang'); } catch (e) { /* none */ } });

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
