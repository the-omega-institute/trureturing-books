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

// the column names under the stage, read from the fillText calls on #cv and measured there: at the narrowest phone,
// phone and desktop width, in both languages, with no column chosen and with section 30.4 chosen, no two names touch,
// each stands at the foot of its own column and reads as derived here from the file name; both ends and every fifth
// chapter keep their names, the coda-and-appendices group keeps at least two, and only the chosen column carries its
// name, in full, in cyan
const shortName = (f, en) => f === 'README.md' ? '0' : f === 'coda.md' ? (en ? 'Co' : '终') : f.startsWith('appendix-') ? f[9].toUpperCase()
  : f.replace(/^ch(\d+)(?:-s(\d+))?-.*$/, (m, a, b) => (b ? `${+a}.${+b}` : String(+a)));
await page.evaluate(() => {
  const ctx = document.getElementById('cv').getContext('2d'), R = window.__axisRec = { on: false, texts: [] };
  const orig = ctx.fillText;
  ctx.fillText = function (text, x, y) {
    if (R.on) { const m = this.getTransform(), k = devicePixelRatio; R.texts.push({ text: String(text), x: (m.a * x + m.e) / k, y: (m.d * y + m.f) / k, w: this.measureText(String(text)).width * m.a / k, align: this.textAlign, style: this.fillStyle }); }
    return orig.apply(this, arguments);
  };
});
const axisNames = () => page.evaluate((n) => {
  const R = window.__axisRec, b = document.getElementById('cv').getBoundingClientRect();
  R.texts = []; R.on = true; window.TRV.kit.flush(); R.on = false;
  const feet = Array.from({ length: n }, (_, c) => window.LEANMAP_DEBUG.footAt(c).map((v, i) => v - (i ? b.top : b.left)));
  const norm = (v) => { const s = document.createElement('canvas').getContext('2d'); s.fillStyle = v; return s.fillStyle; };
  return { names: R.texts.filter((t) => t.align === 'center' && Math.abs(t.y - feet[0][1]) <= 8).map((t) => ({ ...t, cyan: norm(t.style) === norm(window.TRV.palette.cyan) })), feet };
}, NC);
const S304 = columns.indexOf('ch30-s04-navier-stokes.md'), groupFrom = columns.indexOf('coda.md');
const setSrc = (v) => page.evaluate((x) => { const el = document.getElementById('src'); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
for (const [vw, vh] of [[334, 720], [390, 844], [1440, 900]]) {
  await page.setViewportSize({ width: vw, height: vh }); await settle(page, 60);
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`);
    for (const chosen of [null, S304]) {
      await setSrc(chosen == null ? -1 : chosen); await settle(page);
      const { names, feet } = await axisNames(), at = {}, bad = [];
      for (const t of names) {
        const c = feet.findIndex((f) => Math.abs(f[0] - t.x) < 0.5);
        if (c < 0 || t.text !== shortName(columns[c], lang === 'en') || at[c]) bad.push(t.text); else at[c] = t;
      }
      const row = [...names].sort((p, q) => p.x - q.x);
      const touch = row.slice(1).map((t, i) => [row[i], t]).filter(([p, q]) => (q.x - q.w / 2) - (p.x + p.w / 2) < 1).map(([p, q]) => `${p.text}|${q.text}`);
      const keep = [0, NC - 1, ...[5, 10, 15, 20, 25, 30, 35].map((k) => columns.findIndex((f) => f.startsWith(`ch${String(k).padStart(2, '0')}-`)))].filter((c) => c !== chosen && !at[c]);
      const group = Object.keys(at).filter((c) => +c >= groupFrom).length;
      const cyan = names.filter((t) => t.cyan).map((t) => t.text);
      const tag = `${vw}px ${lang}${chosen == null ? '' : ', 30.4 chosen'}`;
      check(`column names (${tag}): each at its own column's foot, named from its file, none touching`, !bad.length && !touch.length, JSON.stringify({ bad, touch }));
      check(`column names (${tag}): both ends, every fifth chapter and two names of the coda group stay`, !keep.length && group >= 2, JSON.stringify({ missing: keep.map((c) => columns[c]), group }));
      check(`column names (${tag}): ${chosen == null ? 'no name is cyan' : 'the chosen section reads 30.4 in cyan, the only cyan name'}`, chosen == null ? !cyan.length : JSON.stringify(cyan) === '["30.4"]' && at[chosen] && at[chosen].cyan, JSON.stringify(cyan));
    }
  }
}
await setSrc(-1); await page.click('[data-lang-set="zh"]'); await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 60);

/* ---------- every source link and the whole chapter-filter domain, in both languages, desktop and narrow ---------- */
// Read once more, independently of the scans above and of the page: each language's SUMMARY gives the units and their
// order (a regular expression over the link), each language's chapters give every unit's citations (lean="…" on :::
// lines by a regular expression, inline links by substring). A cell's source link is built from the module and line
// the lock records, never by cutting the GID at its last dot: a declaration name can carry dots of its own.
const readBook = (lang) => {
  const order = [];
  for (const line of fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')) {
    const m = /\[([^\]]*)\]\(([^)\s]+\.md)\)/.exec(line);
    if (m) order.push({ file: m[2], title: m[1].trim() });
  }
  const cites = {};
  for (const { file } of order) {
    const src = fs.readFileSync(path.join(BOOK, lang, file), 'utf8'), env = new Set();
    for (const line of src.split('\n')) if (line.startsWith(':::')) for (const m of line.matchAll(/(?:^|\s)lean="([^"]*)"/g)) for (const g of m[1].split(/[\s,]+/)) if (g) env.add(g);
    cites[file] = new Map();
    for (const g of GIDS) if (env.has(g)) cites[file].set(g, 'e'); else if (src.includes(`(lean:${g})`) || src.includes(`<lean:${g}>`)) cites[file].set(g, 'i');
  }
  return { order, cites };
};
const BI = { zh: readBook('zh'), en: readBook('en') };
const UNITS2 = BI.zh.order.map((u) => u.file), COLS2 = UNITS2.filter((f) => f !== INDEX), APPD = 'appendix-d.md', CD = COLS2.indexOf(APPD);
check('both SUMMARY files list the same units in the same order; every unit but Appendix C is a column, the last one Appendix D',
  JSON.stringify(BI.en.order.map((u) => u.file)) === JSON.stringify(UNITS2) && JSON.stringify(UNITS2) === JSON.stringify(files) && UNITS2.includes(INDEX)
  && JSON.stringify(COLS2) === JSON.stringify(columns) && COLS2.length === UNITS2.length - 1 && CD === COLS2.length - 1, `${UNITS2.length} units, ${COLS2.length} columns, Appendix D at ${CD}`);
const sameCites = (a, b) => a.size === b.size && [...a].every(([k, m]) => b.get(k) === m);
const langDiff = UNITS2.filter((f) => !sameCites(BI.zh.cites[f], BI.en.cites[f]));
check('every unit cites the same declarations, environment or inline, in Chinese and in English', langDiff.length === 0, langDiff.join(', '));
const scanDiff = GIDS.filter((g) => !sameCites(new Map(UNITS2.filter((f) => BI.zh.cites[f].has(g)).map((f) => [f, BI.zh.cites[f].get(g)])), truth[g].cites));
check('the second reading of the Chinese chapters finds every citation the first one found', scanDiff.length === 0, scanDiff.slice(0, 3).join(', '));
const wantFocus = (c, mode) => (c < 0 ? [] : GIDS.filter((g) => BI.zh.cites[COLS2[c]].has(g) && (mode === 'all' || BI.zh.cites[COLS2[c]].get(g) === 'e')).sort());
const anyEnv = (g) => UNITS2.some((f) => BI.zh.cites[f].get(g) === 'e');
const KEEP = { all: () => true, theorem: (g) => lock.declarations[g].kind === 'theorem', inline: (g) => !anyEnv(g) };
const firstIn = Object.fromEntries(GIDS.map((g) => [g, COLS2.find((f) => BI.zh.cites[f].has(g))]));
const wantHref = (g) => `https://github.com/${lock.repo}/blob/${lock.commit}/${lock.declarations[g].module}.lean#L${lock.declarations[g].line}`;
const DOTTED = ['D5/S3/Quantum/Information/BargmannImaginaryMaximizers.Latitude.latitude_dot', "D5/S3/Weil/Mertens/Third.E₃.bound''"];
const nested = GIDS.filter((g) => lock.declarations[g].module && g.slice(lock.declarations[g].module.length + 1).includes('.'));
check('every GID begins with the module the lock records, and the two dotted declarations sit in a module shorter than the GID before its last dot',
  GIDS.every((g) => lock.declarations[g].module && g.startsWith(`${lock.declarations[g].module}.`)) && DOTTED.every((g) => nested.includes(g) && g.slice(0, g.lastIndexOf('.')) !== lock.declarations[g].module), JSON.stringify(nested));
const nameFits = (title, name) => !!name && (title === name || [' ', '：', ':'].some((sep) => title.startsWith(name + sep)));
// A child page of SUMMARY (indented under its chapter) carries a subtitle, not its number, so the name the page shows
// for it cannot be a prefix of that title: it must equal, exactly, the section name derived here from the indentation
// (the k-th child of chapter n is 第<n in Chinese numerals>章·k / Section n.k). Every other unit keeps nameFits.
const CNUM = '零一二三四五六七八九十', cnNum = (n) => (n <= 10 ? CNUM[n] : n < 20 ? `十${CNUM[n - 10]}` : `${CNUM[Math.floor(n / 10)]}十${n % 10 ? CNUM[n % 10] : ''}`);
const SECTION = {};
for (const lang of ['zh', 'en']) {
  SECTION[lang] = {}; let parent = null, k = 0;
  for (const line of fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')) {
    const m = /^(\s*)(?:-\s+)?\[[^\]]*\]\(([^)\s]+\.md)\)/.exec(line);
    if (!m) continue;
    if (!m[1].length) { const c = /^ch(\d+)-/.exec(m[2]); parent = c ? +c[1] : null; k = 0; continue; }
    k++; SECTION[lang][m[2]] = lang === 'zh' ? `第${cnNum(parent)}章·${k}` : `Section ${parent}.${k}`;
  }
}
const unitNameOk = (lang, file, title, shown) => (SECTION[lang][file] ? shown === SECTION[lang][file] : nameFits(title, shown));
const CH30 = columns.findIndex((f) => f.startsWith('ch30-')), SEC30 = Object.keys(SECTION.zh);
check('SUMMARY hierarchy: Chapter 30 has six child pages, columns right after it, named 第三十章·1 … ·6 / Section 30.1 … 30.6 in both languages',
  SEC30.length === 6 && SEC30.every((f, k) => columns[CH30 + 1 + k] === f && f.startsWith(`ch30-s0${k + 1}-`) && SECTION.zh[f] === `第三十章·${k + 1}` && SECTION.en[f] === `Section 30.${k + 1}`)
  && JSON.stringify(Object.keys(SECTION.en)) === JSON.stringify(SEC30) && columns.length === 50 && files.length === 51 && files.length - SEC30.length === 45, JSON.stringify({ CH30, SEC30, n: columns.length }));
const SAYS = { zh: (name, n) => [`${name}引用 ${n} 条 · `, `${name}引用 ${n} 条声明`], en: (name, n) => [`${name} cites ${n} · `, `${name} cites ${n} declarations`] };
const NONE = { zh: '无', en: 'none' }, CITES = { zh: '引用', en: ' cites ' };
const readout = (p) => p.evaluate(() => {
  const a = document.querySelector('#roModule a'), txt = (id) => document.getElementById(id).textContent.trim();
  const { t, playing, preset, filter, src, srcCol, mode, sel, focus, arcs } = window.LEANMAP_DEBUG.state;   // all but the long list of landed cells
  return { st: { t, playing, preset, filter, src, srcCol, mode, sel, focus, arcs }, cols: window.LEANMAP_DEBUG.columns(), shown: txt('oSrc'), hud: document.getElementById('hudSub').textContent, note: txt('roNote'), name: txt('roName'), mod: txt('roModule'), href: a && a.getAttribute('href'), abs: a && a.href, target: a && a.target, max: document.getElementById('src').max };
});
const showStage = (p) => p.evaluate(() => document.getElementById('stage').scrollIntoView({ block: 'center' }));
// choose a column with the slider (c = −1 is “none”) or by clicking the foot of its column, as a reader does
async function choose(p, how, c) {
  if (how === 'slider') await p.evaluate((v) => { const el = document.getElementById('src'); el.value = String(v); el.dispatchEvent(new Event('input', { bubbles: true })); }, c);
  else { const f = await p.evaluate((k) => window.LEANMAP_DEBUG.footAt(k), c); await p.mouse.click(f[0], f[1]); }
  await settle(p);
  return readout(p);
}
async function chips(p, filter, mode) { await p.click(`[data-filter="${filter}"]`); await settle(p); await p.click(`[data-mode="${mode}"]`); await settle(p); }
// End rests the rail on the whole book; it neither waits for nor relies on playback reaching the end by itself
async function toEnd(p) { await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur()); await p.keyboard.press('End'); await settle(p); return (await readout(p)).st; }
async function sweep(p, lang, how) {
  const bad = []; let n = 0, wrong = 0;
  for (const filter of ['all', 'theorem', 'inline']) {
    for (const mode of ['all', 'env']) {
      await chips(p, filter, mode);
      if (how === 'foot') await showStage(p);
      for (let c = how === 'slider' ? -1 : 0; c < NC; c++) {
        const r = await choose(p, how, c), want = wantFocus(c, mode), file = c < 0 ? null : COLS2[c];
        const title = file && BI[lang].order.find((u) => u.file === file).title, [hud, note] = SAYS[lang](r.shown, want.length);
        const stack = c < 0 ? null : await p.evaluate((k) => window.LEANMAP_DEBUG.stack(k), c);
        const ok = r.st.src === file && r.st.srcCol === (c < 0 ? null : c) && r.st.mode === mode && r.st.filter === filter && r.st.t === NC && !r.st.playing
          && JSON.stringify(r.st.focus) === JSON.stringify(want) && JSON.stringify(r.st.arcs.cyan) === JSON.stringify(want.filter(KEEP[filter]))
          && (c < 0 ? r.shown === NONE[lang] && !r.hud.includes(CITES[lang]) : unitNameOk(lang, file, title, r.shown) && r.hud.startsWith(hud) && r.note.startsWith(note))
          && (stack == null || JSON.stringify([...stack].sort()) === JSON.stringify(GIDS.filter((g) => firstIn[g] === file && KEEP[filter](g)).sort()));
        n++;
        if (!ok) { wrong++; if (bad.length < 3) bad.push({ filter, mode, c, file, src: r.st.src, focus: r.st.focus.length, cyan: r.st.arcs.cyan.length, want: want.length, shown: r.shown, hud: r.hud }); }
      }
    }
  }
  return { n, wrong, bad };
}
async function appendixD(p, lang, how, tag) {
  await chips(p, 'all', 'all'); await showStage(p);
  if ((await readout(p)).st.srcCol === CD) await choose(p, how, how === 'slider' ? -1 : CD);   // start from another state
  let r = await choose(p, how, CD);
  const want = wantFocus(CD, 'all'), [hud] = SAYS[lang](r.shown, want.length);
  check(`${tag}: the last column is Appendix D (Appendix C has none) and looks back over its own ${want.length} citations, not Appendix C's ${BI.zh.cites[INDEX].size}`,
    want.length > 0 && want.length < BI.zh.cites[INDEX].size && r.st.src === APPD && r.st.srcCol === CD && JSON.stringify(r.st.focus) === JSON.stringify(want) && JSON.stringify(r.st.arcs.cyan) === JSON.stringify(want)
    && nameFits(BI[lang].order.find((u) => u.file === APPD).title, r.shown) && r.hud.startsWith(hud) && r.max === String(NC - 1) && JSON.stringify(r.cols) === JSON.stringify(COLS2),
    JSON.stringify({ src: r.st.src, focus: r.st.focus.length, want: want.length, shown: r.shown, hud: r.hud, max: r.max }));
  await p.click('[data-mode="env"]'); await settle(p); r = await readout(p);
  const wantEnv = wantFocus(CD, 'env');
  check(`${tag}: “environments only” leaves Appendix D the ${wantEnv.length} lean= citations it has`, r.st.src === APPD && JSON.stringify(r.st.focus) === JSON.stringify(wantEnv) && r.hud.startsWith(SAYS[lang](r.shown, wantEnv.length)[0]), r.hud);
  await p.click('[data-mode="all"]'); await settle(p);
  await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
  await p.keyboard.press('ArrowLeft'); await settle(p); const before = (await readout(p)).st;
  await p.keyboard.press('End'); await settle(p); const after = (await readout(p)).st;
  const g = want.find((x) => amberWant(x, APPD).length > 0) || want[0];
  await showStage(p); const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), g);
  await p.mouse.click(at[0], at[1]); await settle(p); const chosen = (await readout(p)).st;
  await p.mouse.click(at[0], at[1]); await settle(p); const released = (await readout(p)).st;
  check(`${tag}: Appendix D's cyan lines wait until the rail has read it (← then End), and a chosen cell it cites sends amber only to the other chapters`,
    before.t === NC - 1 && before.arcs.cyan.length === 0 && JSON.stringify(before.focus) === JSON.stringify(want) && after.t === NC && !after.playing && JSON.stringify(after.arcs.cyan) === JSON.stringify(want)
    && chosen.sel === g && JSON.stringify(chosen.arcs.amber) === JSON.stringify(amberWant(g, APPD)) && chosen.arcs.cyan.includes(g) && released.sel === null,
    JSON.stringify({ before: [before.t, before.arcs.cyan.length], after: [after.t, after.arcs.cyan.length], g, amber: chosen.arcs.amber }));
}
// every cell chosen by pointer: its rendered link is the lock's module file and line at the pinned commit
async function release(p) {
  const sel = (await readout(p)).st.sel; if (!sel) return;
  const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), sel); await p.mouse.click(at[0], at[1]); await settle(p);
}
async function links(p, gids) {
  await chips(p, 'all', 'all'); await showStage(p); await release(p);
  const bad = []; let ok = 0;
  for (const g of gids) {
    const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), g);
    if (!at) { bad.push([g, 'no cell']); continue; }
    await p.mouse.click(at[0], at[1]); await settle(p);
    const r = await readout(p), want = wantHref(g);
    if (r.st.sel === g && r.href === want && r.abs === new URL(want).href && r.target === '_blank' && r.mod === `${lock.declarations[g].module}.lean:${lock.declarations[g].line}` && g.endsWith(`.${r.name}`)) ok++;
    else if (bad.length < 3) bad.push([g, r.st.sel, r.href]);
  }
  await release(p);
  return { ok, bad };
}
async function frame(p, lang, tag, opts) {
  if (opts.sweep) {
    const sw = await sweep(p, lang, opts.sweep);
    const how = opts.sweep === 'slider' ? `the chapter slider over none and all ${NC} columns` : `a click on the foot of each of the ${NC} columns`;
    check(`${tag}: ${how} × every citation / environments only × all / theorems / inline: the source is that SUMMARY unit, its cyan lines and count are exactly its citations, and its column holds what first appears there`,
      sw.wrong === 0 && sw.n === 3 * 2 * (NC + (opts.sweep === 'slider' ? 1 : 0)), JSON.stringify(sw));
  }
  await appendixD(p, lang, opts.sweep || 'foot', tag);
  const lk = await links(p, DOTTED);
  check(`${tag}: the two dotted declarations link to their modules' files at the lock's lines`, lk.ok === DOTTED.length, JSON.stringify(lk.bad));
  if (opts.links) {
    const all = await links(p, GIDS);
    check(`${tag}: all ${GIDS.length} cells, chosen by pointer, link to the module file and line the lock records at the pinned commit`, all.ok === GIDS.length, JSON.stringify(all));
  }
}
const LOCALE = { zh: 'zh-CN', en: 'en-US' };
let st0 = await toEnd(page);
check('desktop 1440 px (zh): End rests the rail on the whole book, not playing', st0.t === NC && !st0.playing);
await frame(page, 'zh', 'desktop 1440 px (zh)', { sweep: 'slider', links: true });
const desktopEn = await T.open('quantum-geometry', 'lean-declaration-map', '?lang=en', { viewport: { width: 1440, height: 900 }, locale: LOCALE.en });
st0 = (await readout(desktopEn)).st;
check('desktop 1440 px (en): the full page opens on the whole book read, not playing', st0.t === NC && !st0.playing && st0.preset === 'all');
await frame(desktopEn, 'en', 'desktop 1440 px (en)', { sweep: 'foot' });
// every frame checks Appendix D and the dotted names; the narrow ones sweep the filters, and the links of every cell are read
// in two frames, one per language and width
for (const [w, lang, sweepIt, linksIt] of [[334, 'zh', true, false], [334, 'en', true, true], [740, 'zh', false, false], [740, 'en', false, false]]) {
  const p = await T.open('quantum-geometry', 'lean-declaration-map', `?embed=1&lang=${lang}`, { viewport: { width: w, height: 620 }, locale: LOCALE[lang] });
  const tag = `in the book ${w} px (${lang})`;
  const played = await until(p, () => { const d = window.LEANMAP_DEBUG.state; return d.playing && d.t > 0; });
  st0 = await toEnd(p);
  check(`${tag}: the full lab plays by itself once in view, and End stops it on the whole book`, played && st0.t === NC && !st0.playing);
  await frame(p, lang, tag, sweepIt ? { sweep: 'foot', links: linksIt } : {});
}

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
