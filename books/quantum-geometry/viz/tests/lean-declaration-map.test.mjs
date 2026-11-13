#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/lean-declaration-map (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/lean-declaration-map.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per claim of the page. The data the page draws is checked
// against trureturing.lock.json and against the Chinese chapters read again here with a different scan (substring
// search per locked GID, attribute split by hand), never by calling the page's own code or gen-data.py.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..'), BOOK = path.join(ROOT, 'books/quantum-geometry');
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const GIDS = Object.keys(lock.declarations);

/* ---------- the independent reading of the book ---------- */
const summary = fs.readFileSync(path.join(BOOK, 'zh/SUMMARY.md'), 'utf8');
const files = [];
for (const line of summary.split('\n')) { const a = line.indexOf(']('), b = line.indexOf('.md)', a); if (a > 0 && b > a) files.push(line.slice(a + 2, b + 3)); }
const INDEX = 'appendix-c.md';
const text = Object.fromEntries(files.map((f) => [f, fs.readFileSync(path.join(BOOK, 'zh', f), 'utf8')]));
const envOf = {};                          // file → Set of GIDs cited by a lean="…" attribute on a ::: line
for (const f of files) {
  envOf[f] = new Set();
  for (const line of text[f].split('\n')) {
    if (!line.startsWith(':::')) continue;
    let at = 0;
    for (;;) {
      const k = line.indexOf(' lean="', at); if (k < 0) break;
      const end = line.indexOf('"', k + 7);
      for (const g of line.slice(k + 7, end).replace(/,/g, ' ').split(' ')) if (g) envOf[f].add(g);
      at = end + 1;
    }
  }
}
const truth = {};                          // gid → { cites: Map(file → 'e' | 'i'), home }
for (const gid of GIDS) {
  const cites = new Map();
  for (const f of files) {
    if (envOf[f].has(gid)) cites.set(f, 'e');
    else if (text[f].includes(`(lean:${gid})`) || text[f].includes(`<lean:${gid}>`)) cites.set(f, 'i');
  }
  const home = files.find((f) => f !== INDEX && cites.has(f));
  truth[gid] = { cites, home, env: [...cites.values()].includes('e') };
}
const serialOf = {};
for (const line of text[INDEX].split('\n')) {
  const cells = line.split('|').map((c) => c.trim());
  if (cells.length > 3 && /^`[TDR]\d+`$/.test(cells[1])) { const m = cells[2].indexOf('(lean:'); serialOf[cells[2].slice(m + 6, cells[2].indexOf(')', m))] = cells[1].slice(1, -1); }
}
const columns = files.filter((f) => f !== INDEX);
const CH27 = 'ch27-reading-frozen-proofs-i.md', CH28 = 'ch28-reading-frozen-proofs-ii.md';
const citedBy = (f, mode) => GIDS.filter((g) => truth[g].cites.has(f) && (mode === 'all' || truth[g].cites.get(f) === 'e')).sort();
// where the rail runs, read from each language's SUMMARY: a unit's label is its title up to the colon; the rail starts
// at the label of columns[0] and ends at the label of the last column; a text may name an appendix only if it has a
// column or is the index, and a list of the reading order names exactly the appendices that have a column
const LABEL = {};
for (const lang of ['zh', 'en']) {
  LABEL[lang] = {};
  for (const line of fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')) {
    const a = line.indexOf('['), b = line.indexOf('](', a), c = line.indexOf('.md)', b);
    if (a < 0 || b < 0 || c < 0) continue;
    const title = line.slice(a + 1, b), cut = [title.indexOf('：'), title.indexOf(':')].filter((k) => k > 0);
    LABEL[lang][line.slice(b + 2, c + 3)] = (cut.length ? title.slice(0, Math.min(...cut)) : title).trim();
  }
}
const appxLetter = (lang, f) => (/^(?:附录|Appendix)\s*([A-Z])$/.exec(LABEL[lang][f] || '') || [])[1];
const railSays = (lang, txt) => {
  const low = txt.toLowerCase(), start = low.indexOf(LABEL[lang][columns[0]].toLowerCase()), end = low.indexOf(LABEL[lang][columns[columns.length - 1]].toLowerCase());
  const known = new Set([...columns, INDEX].map((f) => appxLetter(lang, f)).filter(Boolean));
  const named = [...txt.matchAll(lang === 'zh' ? /附录\s*([A-Z])\b/g : /Appendix\s+([A-Z])\b/g)].map((m) => m[1]);
  return start >= 0 && end > start && named.every((x) => known.has(x));
};
const ledeSays = (lang, txt) => {
  const open = txt.indexOf(lang === 'zh' ? '（' : '('), close = txt.indexOf(lang === 'zh' ? '）' : ')', open), seq = txt.slice(open + 1, close);
  const at = seq.search(lang === 'zh' ? /附录/ : /Appendi/), letters = at < 0 ? [] : [...seq.slice(at).matchAll(/\b([A-Z])\b/g)].map((m) => m[1]);
  const want = columns.map((f) => appxLetter(lang, f)).filter(Boolean);
  return open >= 0 && seq.toLowerCase().includes(LABEL[lang][columns[0]].toLowerCase()) && seq.toLowerCase().includes(LABEL[lang]['coda.md'].toLowerCase())
    && JSON.stringify(letters) === JSON.stringify(want) && txt.slice(close).includes(LABEL[lang][INDEX]);
};

/* ---------- the page ---------- */
const T = await session();
const { check } = T;
await stageFirstChecks(T, 'quantum-geometry', 'lean-declaration-map');

const page = await T.goto('quantum-geometry', 'lean-declaration-map', '?lang=zh');
await settle(page, 300);
const state = async () => { await settle(page); return page.evaluate(() => window.LEANMAP_DEBUG.state); };
const seek = async (t) => { await page.evaluate((v) => window.LEANMAP_DEBUG.seek(v), t); return state(); };
const pick = async (id) => { await page.click(`[data-preset="${id}"]`); return state(); };
const NC = columns.length;

check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === 'lean-declaration-map');

const mainSource = fs.readFileSync(path.join(BOOK, 'viz/lean-declaration-map/main.js'), 'utf8');
check('the coda group tries Coda & App. before the dot fallback',
  /roman = \[[^\n]*'·'\]\[p\]/.test(mainSource)
  && /const compact = [^\n]*'Coda & App\.'/.test(mainSource)
  && /const lab = \[name, \.\.\.compact\]\.find\(fits\) \|\| roman;/.test(mainSource));

// the data block against the lock and the chapters
const rows = await page.evaluate(() => window.LEANMAP_DEBUG.rows());
check('one cell per entry of trureturing.lock.json', rows.length === GIDS.length && new Set(rows.map((r) => r[0])).size === GIDS.length && rows.every((r) => r[0] in lock.declarations), `${rows.length} cells, ${GIDS.length} entries`);
const badKind = rows.find((r) => lock.declarations[r[0]].kind !== r[1] || (lock.declarations[r[0]].line || 0) !== r[2]);
check('every cell has the kind and source line the lock records', !badKind, badKind ? JSON.stringify(badKind.slice(0, 3)) : '');
const badCite = rows.find((r) => {
  const t = truth[r[0]], got = new Map(r[4].map(([f, m]) => [f, m]));
  return got.size !== t.cites.size || [...t.cites].some(([f, m]) => got.get(f) !== m) || r[3] !== t.home;
});
check('every cell lists exactly the chapters that cite it (environment or inline) and lands in the first of them', !badCite, badCite ? JSON.stringify(badCite) : '');
check('every declaration has a home in the main text (none only in Appendix C)', GIDS.every((g) => truth[g].home));
const badSerial = rows.find((r) => r[5] !== (serialOf[r[0]] || ''));
check('the Appendix C entry numbers match the index table', !badSerial && Object.keys(serialOf).length === GIDS.length, badSerial ? JSON.stringify([badSerial[0], badSerial[5], serialOf[badSerial[0]]]) : '');
check('the columns are the reading order without Appendix C', JSON.stringify(await page.evaluate(() => window.LEANMAP_DEBUG.columns())) === JSON.stringify(columns));
// stacking: theorems below definitions, filled below hollow, in every column
let stackOk = true;
for (let c = 0; c < NC; c++) {
  const st = await page.evaluate((k) => window.LEANMAP_DEBUG.stack(k), c);
  const key = (g) => (lock.declarations[g].kind === 'theorem' ? 0 : 2) + (truth[g].env ? 0 : 1);
  for (let k = 1; k < st.length; k++) if (key(st[k]) < key(st[k - 1])) stackOk = false;
  if (st.length !== GIDS.filter((g) => truth[g].home === columns[c]).length) stackOk = false;
}
check('each column holds the declarations that first appear there, theorems then definitions, filled then hollow', stackOk);

// WHOLE-BOOK: the rail fills the map chapter by chapter, and the end holds every entry of the lock
let s = await state();
check('opens on WHOLE-BOOK with the whole book read', s.preset === 'all' && s.t === NC && s.met === GIDS.length && s.visible === GIDS.length && !s.playing);
let landOk = true;
for (const c of [0, 1, 5, 12, 20, 28, NC]) {
  s = await seek(c);
  const expect = GIDS.filter((g) => columns.indexOf(truth[g].home) < c).length;
  if (s.met !== expect) landOk = false;
}
check('at each chapter boundary the landed count is the number of declarations first cited before it', landOk);
await page.click('[data-preset="all"]');
check('WHOLE-BOOK plays the rail from the prelude', await until(page, () => { const d = window.LEANMAP_DEBUG.state; return d.playing && d.t > 0.5; }));
await page.click('#play'); s = await state();
check('the play button pauses', !s.playing);
const note = async () => (await page.textContent('#presetNote')).trim();
check('WHOLE-BOOK note names the number of lock entries', (await note()).includes(`${GIDS.length} 格`));
check('WHOLE-BOOK note: the rail runs from the first unit of SUMMARY to its last column, and names no appendix without a column except the index', railSays('zh', await note()), await note());
for (const lang of ['zh', 'en']) {
  const lede = await page.textContent(`#drawer .${lang} .lede`);
  check(`drawer (${lang}): the reading order runs from the prelude to the coda and lists exactly the appendices with a column; the index is named outside it`, ledeSays(lang, lede), lede);
}

// CH27-FOUR, CH28-FOUR: the dissected theorems, from the foot of their chapter
s = await pick('bedrock');
const e27 = citedBy(CH27, 'env'), e28 = citedBy(CH28, 'env');
check('CH27-FOUR: cyan marks the four theorems Chapter 27 cites in its environments', e27.length === 4 && JSON.stringify(s.focus) === JSON.stringify(e27) && s.src === CH27 && s.mode === 'env', JSON.stringify(s.focus));
check('CH27-FOUR: the chosen cell is the parallelogram law', s.sel === 'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law');
// the lines as drawn: a cyan one from the chapter's foot to each of its cells (the chosen one included), and amber
// lines from the chosen cell only to the other chapters that cite it (not its home, not Appendix C, not this chapter)
const amberWant = (gid, src) => [...truth[gid].cites.keys()].filter((f) => f !== INDEX && f !== truth[gid].home && f !== src).sort();
check('CH27-FOUR: four cyan lines, one to each dissected cell (the chosen one too); amber lines only to the other chapters citing it', JSON.stringify(s.arcs.cyan) === JSON.stringify(e27) && JSON.stringify(s.arcs.amber) === JSON.stringify(amberWant(s.sel, CH27)) && s.arcs.amber.length >= 1, JSON.stringify(s.arcs));
check('CH27-FOUR note: as many cyan lines as drawn, and amber only for the other chapters', (await page.textContent('#presetNote')).includes(`${s.arcs.cyan.length} 根青色的线`) && /琥珀色的线只连到另外引用它的几章/.test(await page.textContent('#presetNote')));
check('CH27-FOUR: all four are theorems of the lock and land in Chapters 1–3', e27.every((g) => lock.declarations[g].kind === 'theorem' && ['ch01-measurement.md', 'ch02-born-rule.md', 'ch03-projectors-and-duality.md'].includes(truth[g].home)));
const pageGids = await page.$$eval('#evidence a[data-lean-gid]', (as) => as.map((a) => a.dataset.leanGid).sort());
check('the green boxes cite exactly the eight theorems Chapters 27 and 28 dissect', JSON.stringify(pageGids) === JSON.stringify([...e27, ...e28].sort()));
const ro = async () => page.evaluate(() => ({ name: document.getElementById('roName').textContent, kind: document.getElementById('roKind').textContent, mod: document.getElementById('roModule').textContent, href: document.querySelector('#roModule a')?.href, where: document.getElementById('roWhere').textContent, serial: document.getElementById('roSerial').textContent }));
let r = await ro();
const PAR = 'D5/S3/QuantumContext/ParallelogramNormLaw.inner_product_norm_parallelogram_law';
check('the readouts give the chosen declaration as the lock and the index have it', r.name === 'inner_product_norm_parallelogram_law' && r.kind.includes('theorem') && r.mod === `D5/S3/QuantumContext/ParallelogramNormLaw.lean:${lock.declarations[PAR].line}` && r.serial === serialOf[PAR]
  && r.href === `https://github.com/${lock.repo}/blob/${lock.commit}/D5/S3/QuantumContext/ParallelogramNormLaw.lean#L${lock.declarations[PAR].line}`, JSON.stringify(r));
s = await pick('closure');
check('CH28-FOUR: cyan marks the four theorems Chapter 28 cites in its environments', e28.length === 4 && JSON.stringify(s.focus) === JSON.stringify(e28) && s.src === CH28);
check('CH28-FOUR: four cyan lines, and amber lines only to the other chapters citing the chosen criterion', JSON.stringify(s.arcs.cyan) === JSON.stringify(e28) && JSON.stringify(s.arcs.amber) === JSON.stringify(amberWant(s.sel, CH28)), JSON.stringify(s.arcs));
const FIX = 'D5/S3/Observer/Conditioning.unreadState_fixed_iff';
r = await ro();
const whereFix = [...truth[FIX].cites.keys()].filter((f) => f !== INDEX).length;
check('CH28-FOUR: the chosen cell is unreadState_fixed_iff, first cited in Chapter 3', s.sel === FIX && truth[FIX].home === 'ch03-projectors-and-duality.md' && r.serial === serialOf[FIX] && r.where.split('、').length === whereFix, JSON.stringify(r));

// the audit tables
s = await pick('table27');
const a27 = citedBy(CH27, 'all'), a28 = citedBy(CH28, 'all');
check('CH27-TABLE: cyan marks every declaration Chapter 27 cites', JSON.stringify(s.focus) === JSON.stringify(a27) && (await note()).includes(`${a27.length} 条`), `${s.focus.length} vs ${a27.length}`);
const partOf = {}; { let part = -1; for (const line of summary.split('\n')) { if (line.startsWith('# ') && !line.startsWith('# Summary')) part++; const a = line.indexOf(']('); if (a > 0) partOf[line.slice(a + 2, line.indexOf('.md)', a) + 3)] = part; } }
const in13 = a27.filter((g) => partOf[truth[g].home] >= 0 && partOf[truth[g].home] <= 2).length;
check('CH27-TABLE note: how many land in Parts I–III', (await note()).includes(`其中 ${in13} 条落在第一至三部`), await note());
s = await pick('table28');
const in46 = a28.filter((g) => partOf[truth[g].home] >= 3 && partOf[truth[g].home] <= 5).length;
check('CH28-TABLE: cyan marks every declaration Chapter 28 cites', JSON.stringify(s.focus) === JSON.stringify(a28) && (await note()).includes(`其中 ${in46} 条落在第四至六部`), await note());

// the filters
s = await pick('theorems');
const nThm = GIDS.filter((g) => lock.declarations[g].kind === 'theorem').length;
check('THEOREMS: only the entries of kind theorem remain', s.filter === 'theorem' && s.visible === nThm && s.landed.every((g) => lock.declarations[g].kind === 'theorem') && s.met === nThm && (await note()).includes(`${nThm} 格`));
s = await pick('inline');
const inl = GIDS.filter((g) => !truth[g].env), inlThm = inl.filter((g) => lock.declarations[g].kind === 'theorem').length;
check('INLINE: only the entries no environment cites remain, theorems and definitions counted', s.visible === inl.length && s.landed.every((g) => !truth[g].env) && (await note()).includes(`${inl.length} 格：${inlThm} 格绿色的定理，${inl.length - inlThm} 格灰色的定义`), await note());

// controls
await page.click('[data-filter="all"]'); s = await state();
check('the filter chips restore every entry and leave the card', s.filter === 'all' && s.visible === GIDS.length && s.preset === null);
await page.evaluate((v) => { const el = document.getElementById('src'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, columns.indexOf('ch22-primes-euler-products-and-zeros.md')); s = await state();
check('the chapter slider looks back from that chapter', s.src === 'ch22-primes-euler-products-and-zeros.md' && JSON.stringify(s.focus) === JSON.stringify(citedBy('ch22-primes-euler-products-and-zeros.md', 'all')));
await page.click('[data-mode="env"]'); s = await state();
check('“environments only” keeps the lean= citations of that chapter', JSON.stringify(s.focus) === JSON.stringify(citedBy('ch22-primes-euler-products-and-zeros.md', 'env')) && s.mode === 'env');
await page.click('[data-mode="all"]');
const foot = await page.evaluate((c) => window.LEANMAP_DEBUG.footAt(c), columns.indexOf('ch13-entanglement-and-chsh.md'));
await page.mouse.click(foot[0], foot[1]); s = await state();
check('clicking the foot of a column looks back from that chapter', s.src === 'ch13-entanglement-and-chsh.md', String(s.src));
const someDef = GIDS.find((g) => lock.declarations[g].kind === 'def' && truth[g].home === 'ch23-diophantine-definability.md');
const at = await page.evaluate((g) => window.LEANMAP_DEBUG.cellAt(g), someDef);
await page.mouse.click(at[0], at[1]); s = await state(); r = await ro();
check('clicking a cell chooses it and the readouts follow', s.sel === someDef && r.kind.includes('def') && r.serial === serialOf[someDef] && !r.kind.includes('theorem'), JSON.stringify([s.sel, r]));
await page.mouse.click(at[0], at[1]); s = await state();
check('clicking the chosen cell again lets it go', s.sel === null);
await page.click('#rew'); s = await state();
check('⏮ goes back to the prelude: nothing has landed', s.t === 0 && s.met === 0);
await page.locator('body').click({ position: { x: 5, y: 5 } });
await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowRight'); s = await state();
check('→ reads one more chapter at a time', s.t === 2 && s.met === GIDS.filter((g) => columns.indexOf(truth[g].home) < 2).length);
await page.keyboard.press('Space');
check('Space plays', await until(page, () => { const d = window.LEANMAP_DEBUG.state; return d.playing && d.t > 2; }));
await page.keyboard.press('Space'); check('Space pauses', !(await state()).playing);

// find by name: the matching cells counted here by a plain substring scan of the lock's GIDs, ignoring case
await page.click('[data-filter="all"]'); await settle(page);
for (const q of ['pauli_word', 'Born', 'zz_no_such_name']) {
  await page.fill('#q', q); await settle(page); s = await state();
  const want = GIDS.filter((g) => g.toLowerCase().indexOf(q.toLowerCase()) !== -1).sort();
  const out = await page.textContent('#qOut');
  check(`search “${q}”: the page finds exactly the ${want.length} GIDs that contain it`, JSON.stringify(s.found) === JSON.stringify(want) && (want.length ? out.includes(`命中 ${want.length} 条`) && want.slice(0, 12).every((g) => out.includes(serialOf[g] || g.split('.').pop())) : out.includes('没有命中')), JSON.stringify([s.found.length, want.length, out]));
}
await page.fill('#q', 'born'); await page.keyboard.press('Space'); await settle(page);
check('typing a space in the search box does not start the rail', !(await state()).playing);
await page.fill('#q', ''); await settle(page); s = await state();
check('clearing the search shows every cell again', s.q === '' && s.found.length === 0 && (await page.textContent('#qOut')).includes('输入声明名'));

// English
await page.click('[data-lang-set="en"]'); await pick('all');
check('English WHOLE-BOOK note: the same start and end of the rail', railSays('en', await note()), await note());
await pick('table28');
check('English note of CH28-TABLE carries the same numbers', (await note()).includes(`cites ${a28.length} declarations`) && (await note()).includes(`${in46} of them land in Parts IV–VI`), await note());
await page.click('[data-lang-set="zh"]');

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
