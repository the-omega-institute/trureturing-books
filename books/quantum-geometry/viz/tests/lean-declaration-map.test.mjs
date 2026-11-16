#!/usr/bin/env node
// Browser regression suite for quantum-geometry/viz/lean-declaration-map (Playwright + Chromium):
//   node books/quantum-geometry/viz/tests/lean-declaration-map.test.mjs   (or node tools/node/viz-test.mjs quantum-geometry)
// stageFirstChecks first; then one check per control and per claim of the page. The data the page draws is checked
// against trureturing.lock.json and against the Chinese chapters read again here with a different scan (substring
// search per locked GID, attribute split by hand), never by calling the page's own code or gen-data.py.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, until } from '../../../../tools/node/viz-testkit.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../../../..'), BOOK = path.join(ROOT, 'books/quantum-geometry');
const lock = JSON.parse(fs.readFileSync(path.join(ROOT, 'trureturing.lock.json'), 'utf8'));
const GIDS = Object.keys(lock.declarations);

/* ---------- generated inputs ---------- */
// Appendix C (both languages), the statistics and the page's data.generated.json are ignored build outputs; a clean
// checkout has none of them. The book's own generator writes exactly these four text/JSON files from the chapters,
// data/appendix-c.*.md.in, data/declaration-serials.json and gen-data.py (no browser, serials left as registered).
const VENV_PY = path.join(ROOT, '.venv/bin/python');
execFileSync(fs.existsSync(VENV_PY) ? VENV_PY : 'python3', [path.join(BOOK, 'sync-statistics.py')], { cwd: ROOT, stdio: ['ignore', 'inherit', 'inherit'] });

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
// where the rail runs, read from each language's SUMMARY: a unit's label is the unit name its heading opens with
// (序曲/Prelude, 第N章/Chapter N, a numbered subpage N.k, 终章/Coda, 附录 X/Appendix X), followed by one space before
// the title as now written, or by a colon as in older headings; a title in none of these families keeps the older
// rule (up to the colon, else the whole title). The rail starts at the label of columns[0] and ends at the label of
// the last column; a text may name an appendix only if it has a column or is the index, and a list of the reading
// order names exactly the appendices that have a column
const UNIT_HEAD = /^(序曲|终章|第[零〇一二三四五六七八九十百]+章|附录\s*[A-Z]|Prelude|Coda|Chapter\s+\d+|Appendix\s+[A-Z]|\d+(?:\.\d+)+)(?=[\s：:]|$)/;
const unitLabel = (raw) => {
  const title = raw.trim(), head = UNIT_HEAD.exec(title);
  if (head) return head[1].replace(/\s+/g, ' ');
  const cut = [title.indexOf('：'), title.indexOf(':')].filter((k) => k > 0);
  return (cut.length ? title.slice(0, Math.min(...cut)) : title).trim();
};
const LABEL = {};
for (const lang of ['zh', 'en']) {
  LABEL[lang] = {};
  for (const line of fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')) {
    const a = line.indexOf('['), b = line.indexOf('](', a), c = line.indexOf('.md)', b);
    if (a < 0 || b < 0 || c < 0) continue;
    LABEL[lang][line.slice(b + 2, c + 3)] = unitLabel(line.slice(a + 1, b));
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

// Each language's SUMMARY once more, as a tree of any depth: a link's depth is its indentation in steps of two spaces,
// its parent the nearest link one step shallower. A top unit is known by the head of its title (序曲/Prelude, 第N章/
// Chapter N, 终章/Coda, 附录 X/Appendix X). The roots book.toml lists under [numbering.unnumbered] (read here by Python's
// tomllib, not by the book's loader) take no chapter number: the chapters after them keep counting on, and their trees
// are located on the map by the configured prefix instead (Coda.1, Coda.1.2, …). A child page's number is its parent's
// number followed by its place among its siblings (4.1, 39.5.7, Coda.1, A.1), and its file is its parent's stem followed
// by -sNN (ch39-s05-s07-…, coda-s01-…, appendix-a-s01-…). In a numbered tree the title opens with that number; in an
// unnumbered tree no title or heading of the pages opens with a number, old (40.1) or locator (Coda.1): the locator is the
// map's, not the headings'. The short name under a column and the name the page gives a unit come from this tree alone,
// never from the page.
const UNNUMBERED = JSON.parse(execFileSync('python3', ['-I', '-c',
  'import json, sys, tomllib\nwith open(sys.argv[1], "rb") as f: print(json.dumps(tomllib.load(f).get("numbering", {}).get("unnumbered", {})))',
  path.join(BOOK, 'book.toml')], { encoding: 'utf8' }));
const reEsc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** The ATX headings of a page outside fenced code. */
const headings = (file) => { let fence = false; return file.split('\n').filter((l) => { if (/^\s*(```|~~~)/.test(l)) fence = !fence; return !fence && /^#{1,6}\s/.test(l); }).map((l) => l.replace(/^#{1,6}\s+/, '')); };
const CNUM = '零一二三四五六七八九十', cnNum = (n) => (n <= 10 ? CNUM[n] : n < 20 ? `十${CNUM[n - 10]}` : `${CNUM[Math.floor(n / 10)]}十${n % 10 ? CNUM[n % 10] : ''}`);
const cnValue = (s) => { const k = s.indexOf('十'); return k < 0 ? CNUM.indexOf(s) : (k ? CNUM.indexOf(s[0]) : 1) * 10 + (k < s.length - 1 ? CNUM.indexOf(s[k + 1]) : 0); };
const pad2 = (k) => String(k).padStart(2, '0');
const TOP_HEAD = {
  zh: [[/^序曲\s/, () => ['prelude', '0']], [/^第([一二三四五六七八九十]+)章\s/, (m) => ['chapter', String(cnValue(m[1]))]], [/^终章\s/, () => ['coda', null]], [/^附录 ([A-Z])\s/, (m) => ['appendix', m[1]]]],
  en: [[/^Prelude\s/, () => ['prelude', '0']], [/^Chapter (\d+)\s/, (m) => ['chapter', String(+m[1])]], [/^Coda\s/, () => ['coda', null]], [/^Appendix ([A-Z])\s/, (m) => ['appendix', m[1]]]]
};
const NAMES = { prelude: () => ['序曲', 'Prelude'], chapter: (n) => [`第${cnNum(+n)}章`, `Chapter ${n}`], coda: () => ['终章', 'Coda'], appendix: (x) => [`附录 ${x}`, `Appendix ${x}`] };
const TREE = {}, NODE = {};
for (const lang of ['zh', 'en']) {
  const raw = [], nodes = [], trail = [], bad = [], li = lang === 'zh' ? 0 : 1;
  for (const line of fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')) {
    const m = /^( *)(?:-\s+)?\[(.*)\]\(([^)\s]+\.md)\)\s*$/.exec(line);
    if (m) raw.push({ indent: m[1].length, title: m[2].trim(), file: m[3] });
  }
  const head = (title) => { for (const [re, f] of TOP_HEAD[lang]) { const m = re.exec(title); if (m) return f(m); } return [null, null]; };
  for (const r of raw) {
    const depth = r.indent / 2, parent = depth ? trail[depth - 1] : null;
    if (!Number.isInteger(depth) || (depth && !parent)) { bad.push(`${r.file}: indented ${r.indent} spaces`); continue; }
    const node = { file: r.file, title: r.title, depth, parent, children: [] };
    if (!depth) {
      // an unnumbered root is the one book.toml names, never guessed from its title; its number is its prefix
      const prefix = Object.hasOwn(UNNUMBERED, r.file) ? UNNUMBERED[r.file] : null, [kind, n] = head(r.title), num = prefix ?? n ?? '';
      const stem = kind === 'chapter' ? `ch${pad2(+num)}` : kind === 'coda' ? 'coda' : kind === 'appendix' ? `appendix-${num.toLowerCase()}` : 'README';
      Object.assign(node, { kind, num, stem, root: node, unnumbered: prefix != null });
      if (!kind) bad.push(`${r.file}: a top unit whose title opens with no unit name`);
      else if (kind === 'chapter' ? !r.file.startsWith(`${stem}-`) : r.file !== `${stem}.md`) bad.push(`${r.file}: not filed as ${stem}`);
      if ((kind === 'coda') !== node.unnumbered) bad.push(`${r.file}: ${node.unnumbered ? 'unnumbered in book.toml but not the coda' : 'the coda, but book.toml leaves it numbered'}`);
      node.short = kind === 'coda' ? ['终', 'Co'][li] : num;
      node.name = kind ? NAMES[kind](num)[li] : null;
      if (kind && !r.title.startsWith(`${node.name} `)) bad.push(`${r.file}: the title does not open with ${node.name}`);
    } else {
      const k = parent.children.length + 1, num = `${parent.num}.${k}`, stem = `${parent.stem}-s${pad2(k)}`, root = parent.root;
      const rest = num.slice(root.num.length + 1);
      Object.assign(node, { kind: 'section', num, stem, root, k, short: num, unnumbered: root.unnumbered });
      node.name = root.unnumbered ? [`${root.name}·${rest}`, num][li]
        : root.kind === 'chapter' ? [`第${cnNum(+root.num)}章·${rest}`, `Section ${num}`][li] : root.kind === 'appendix' ? [`附录 ${num}`, `Appendix ${num}`][li] : null;
      if (!node.name) bad.push(`${r.file}: a child of ${root.file}, which has no number`);
      if (!root.unnumbered && !r.title.startsWith(`${num} `)) bad.push(`${r.file}: the title opens with ${r.title.split(' ')[0]}, not ${num} (child ${k} of ${parent.num})`);
      if (!r.file.startsWith(`${stem}-`)) bad.push(`${r.file}: not filed as ${stem}-… (child ${k} of ${parent.file})`);
      parent.children.push(node);
    }
    if (node.root.unnumbered) {
      // no number left in the titles of an unnumbered tree: neither an old chapter number (40.1) nor the map's locator
      const numbered = new RegExp(`^(?:\\d+(?:\\.\\d+)*|${reEsc(node.root.num)}(?:\\.\\d+)+)(?=[\\s：:]|$)`);
      const page = fs.readFileSync(path.join(BOOK, lang, r.file), 'utf8');
      for (const t of [r.title, ...headings(page)]) if (numbered.test(t)) bad.push(`${r.file}: “${t.slice(0, 24)}” keeps a number in an unnumbered tree`);
    }
    trail[depth] = node; trail.length = depth + 1;
    nodes.push(node);
  }
  const roots = new Set(nodes.filter((n) => !n.depth).map((n) => n.file));
  for (const file of Object.keys(UNNUMBERED)) if (!roots.has(file)) bad.push(`book.toml: numbering.unnumbered names ${file}, not a top unit of SUMMARY`);
  TREE[lang] = { nodes, bad };
  NODE[lang] = Object.fromEntries(nodes.map((n) => [n.file, n]));
}

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
// A pointer presses whole CSS pixels: Chromium truncates a fractional mouse coordinate, which at the 153 columns of a
// phone (under 2 px each) can land on the next column. Press the whole pixel nearest the probe's point instead.
const press = (p, xy) => p.mouse.click(Math.round(xy[0]), Math.round(xy[1]));

check('page carries its id', (await page.evaluate(() => document.body.dataset.vizId)) === 'lean-declaration-map');

const mainSource = fs.readFileSync(path.join(BOOK, 'viz/lean-declaration-map/main.js'), 'utf8');
check('the coda group tries Coda & App. before the dot fallback',
  /roman = \[[^\n]*'·'\]\[p\]/.test(mainSource)
  && /const compact = [^\n]*'Coda & App\.'/.test(mainSource)
  && /const lab = \[name, \.\.\.compact\]\.find\(fits\) \|\| roman\b/.test(mainSource));
// Read in the source, so that they hold in every state and not only in the states the browser checks below visit: the
// amber lines the stage draws and the counts the chosen declaration's note gives come from one function (routes), the
// only place that turns a declaration's citations into destinations; the cyan lines and the note's “drawn once the rail
// has read it” from one predicate (cyanOn); the landed heading, the strip's dashed label and its description from one
// table of filter populations (KEPT), keyed like FILTERS, carrying no number, its `all` entry still the whole lock.
const keptSrc = /const KEPT = (\{[^\n]*\});/.exec(mainSource), KEPT_SRC = keptSrc && JSON.parse(keptSrc[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
check('source: the drawn amber lines and the chosen declaration’s note both come from routes(), the one place citations become destinations',
  /for \(const u of routes\(sd, foc\)\.amber\) \{\s*arcs\.amber\.push\(colOf\[u\]\);/.test(mainSource)
  && /const \{ cites, cyan, amber \} = routes\(d, focus\(\)\)/.test(mainSource) && /\$\('roNote'\)\.textContent = d \? routeNote\(d, t\)/.test(mainSource)
  && mainSource.split('.cites.map((c) => c[0])').length === 2 && /const routes = \(d, foc\) => \{\s*const cites = \[\.\.\.new Set\(d\.cites\.map\(\(c\) => c\[0\]\)\)\]\.filter\(\(u\) => u !== IDX && u !== d\.home\);/.test(mainSource));
check('source: the cyan lines and the note’s wait for the rail share one predicate (cyanOn)',
  /if \(cyanOn\(t\)\) \{/.test(mainSource) && /const later = cyanOn\(t\) \?/.test(mainSource) && !/Math\.floor\(t\) > S\.src\)/.test(mainSource.replace('const cyanOn = (t) => S.src != null && Math.floor(t) > S.src;', '')));
check('source: the landed heading, the strip’s dashed label and its description name the population from KEPT, keyed like FILTERS, with no number in it and the whole lock only under “all”',
  !!KEPT_SRC && JSON.stringify(Object.keys(KEPT_SRC)) === JSON.stringify(['all', 'theorem', 'inline']) && /const FILTERS = \{ all: [^\n]*, theorem: [^\n]*, inline: [^\n]* \};/.test(mainSource)
  && !/\d/.test(keptSrc[1]) && JSON.stringify(KEPT_SRC.all) === JSON.stringify(['锁文件里的条目', 'entries in the lock'])
  && /\$\('roMetHead'\)\.innerHTML = `<span class="zh">已落定 \/ \$\{KEPT\[S\.filter\]\[0\]\}<\/span><span class="en">landed \/ \$\{KEPT\[S\.filter\]\[1\]\}<\/span>`/.test(mainSource)
  && /const \[keptZh, keptEn\] = KEPT\[S\.filter\]/.test(mainSource) && /\[P\.ink, L\(keptZh, keptEn\), 'dash'\]/.test(mainSource)
  && /cv\.dataset\.ariaZh = `[^`]*\$\{keptZh\}[^`]*`/.test(mainSource) && /cv\.dataset\.ariaEn = `[^`]*\$\{keptEn\}`/.test(mainSource)
  && !mainSource.includes("L('锁文件里的条目', 'entries in the lock')"), keptSrc ? keptSrc[1] : 'no KEPT');

// the page's data (data.generated.json joined to the lock) against the lock and the chapters
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
await press(page, foot); s = await state();
check('clicking the foot of a column looks back from that chapter', s.src === 'ch13-entanglement-and-chsh.md', String(s.src));
const someDef = GIDS.find((g) => lock.declarations[g].kind === 'def' && truth[g].home === 'ch23-diophantine-definability.md');
const at = await page.evaluate((g) => window.LEANMAP_DEBUG.cellAt(g), someDef);
await press(page, at); s = await state(); r = await ro();
check('clicking a cell chooses it and the readouts follow', s.sel === someDef && r.kind.includes('def') && r.serial === serialOf[someDef] && !r.kind.includes('theorem'), JSON.stringify([s.sel, r]));
await press(page, at); s = await state();
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

// The names under the stage and under the strip, read from the fillText calls on #cv and #plot and measured there, at
// the narrowest phone, a phone and a desktop width, in both languages, with no column chosen and with 30.4, 39.5.7,
// Coda.1 and A.1 chosen (a section, a section of a section, the first section of the unnumbered coda and one of an
// appendix):
//   · each name is the short number the SUMMARY tree gives one column; its span holds that column's foot (on the strip:
//     the tick after that column, where kit.plot snaps it to the pixel grid) and lies inside the canvas; only the
//     chosen name may sit off its column's centre, and only it may be a section's number; no two names touch;
//   · both ends keep their names; the chosen column shows its full number in cyan, the only cyan name;
//   · the chapters give the direction (every tenth when nothing is chosen, otherwise at least three from ≤ 10 to ≥ 30),
//     and the coda group keeps the coda, its first appendix and its last column when nothing is chosen, at least one
//     name otherwise, and its part name 终… / Coda…;
//   · a chapter, the coda or an appendix goes unnamed only where its name, measured in the same font and centred on its
//     column, would come within 2 px of a drawn name: names are thinned by measured width, not by a fixed step;
//   · every part is named once, over its own band, by its heading or its roman numeral, no two part names touching.
const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const PART_HEAD = Object.fromEntries(['zh', 'en'].map((lang) => [lang, fs.readFileSync(path.join(BOOK, lang, 'SUMMARY.md'), 'utf8').split('\n')
  .filter((l) => l.startsWith('# ') && !l.startsWith('# Summary')).map((l) => l.slice(2).trim())]));
const BANDS = [];
columns.forEach((f, c) => { const p = partOf[f], b = BANDS[BANDS.length - 1]; if (p < 0) return; if (b && b.p === p) b.last = c; else BANDS.push({ p, first: c, last: c }); });
const GROUP = BANDS[BANDS.length - 1];   // the coda and the appendices
const SHORT_COL = Object.fromEntries(['zh', 'en'].map((lang) => [lang, new Map(columns.map((f, c) => [NODE[lang][f].short, c]))]));
check('every column has a short name of its own in each language', ['zh', 'en'].every((lang) => SHORT_COL[lang].size === NC));
const colOfNum = (num) => columns.findIndex((f) => NODE.zh[f].depth > 0 && NODE.zh[f].num === num);
const CHOSEN = ['30.4', '39.5.7', 'Coda.1', 'A.1'].map(colOfNum);
const CODA = columns.findIndex((f) => NODE.zh[f].kind === 'coda'), APPX = columns.findIndex((f) => NODE.zh[f].kind === 'appendix');
const codaFirst = CHOSEN[2] >= 0 && NODE.zh[columns[CHOSEN[2]]];
check('the axis checks choose 30.4 (depth 2), 39.5.7 (depth 3), Coda.1 (the first page under the unnumbered coda) and A.1 (under Appendix A)',
  CHOSEN.every((c) => c >= 0) && JSON.stringify(CHOSEN.map((c) => NODE.zh[columns[c]].depth)) === '[1,2,1,1]'
  && codaFirst.root.kind === 'coda' && codaFirst.root.unnumbered && codaFirst.parent === codaFirst.root && codaFirst.root.children[0] === codaFirst
  && codaFirst.root.file === columns[CODA] && CHOSEN[2] === CODA + 1 && ['zh', 'en'].every((lang) => NODE[lang][columns[CHOSEN[2]]].short === 'Coda.1')
  && NODE.zh[columns[CHOSEN[3]]].root.kind === 'appendix', JSON.stringify(CHOSEN));
const TENS = columns.map((f, c) => c).filter((c) => NODE.zh[columns[c]].kind === 'chapter' && +NODE.zh[columns[c]].num % 10 === 0);
await page.evaluate(() => {
  const R = window.__axisRec = { on: false, texts: [] };
  for (const id of ['cv', 'plot']) {
    const ctx = document.getElementById(id).getContext('2d'), orig = ctx.fillText;
    ctx.fillText = function (text, x, y) {
      if (R.on) { const m = this.getTransform(), k = devicePixelRatio; R.texts.push({ id, text: String(text), x: (m.a * x + m.e) / k, y: (m.d * y + m.f) / k, w: this.measureText(String(text)).width * m.a / k, align: this.textAlign, font: this.font, style: this.fillStyle }); }
      return orig.apply(this, arguments);
    };
  }
});
const axisRead = () => page.evaluate((n) => {
  const R = window.__axisRec, cv = document.getElementById('cv'), pl = document.getElementById('plot'), b = cv.getBoundingClientRect(), q = pl.getBoundingClientRect();
  R.texts = []; R.on = true; window.TRV.kit.flush(); R.on = false;
  const norm = (v) => { const s = document.createElement('canvas').getContext('2d'); s.fillStyle = v; return s.fillStyle; };
  const feet = Array.from({ length: n }, (_, c) => window.LEANMAP_DEBUG.footAt(c)).map(([x, y]) => [x - b.left, y - b.top]);
  const ticks = Array.from({ length: n + 1 }, (_, v) => window.LEANMAP_DEBUG.tickAt(v)).map(([x, y]) => [x - q.left, y - q.top]);
  return { texts: R.texts.filter((t) => t.align === 'center').map((t) => ({ ...t, cyan: norm(t.style) === norm(window.TRV.palette.cyan) })), feet, ticks, W: cv.clientWidth, PW: pl.clientWidth };
}, NC);
const measure = (font, list) => page.evaluate(([f, l]) => { const c = document.createElement('canvas').getContext('2d'); c.font = f; return l.map((s) => c.measureText(s).width); }, [font, list]);
const touching = (list) => { const row = [...list].sort((p, q) => p.x - q.x); return row.slice(1).map((t, i) => [row[i], t]).filter(([p, q]) => (q.x - q.w / 2) - (p.x + p.w / 2) < 1).map(([p, q]) => `${p.text}|${q.text}`); };
/** One row of names against the tree: at(c) is column c's anchor on that canvas, W its width, chosen a column or null. */
async function axisAudit(lang, names, at, W, chosen) {
  const bad = [], seen = new Map();
  for (const t of names) {
    const c = SHORT_COL[lang].get(t.text), l = t.x - t.w / 2, r = t.x + t.w / 2;
    if (c == null || seen.has(c)) { bad.push(`${t.text}: ${c == null ? 'names no column' : 'drawn twice'}`); continue; }
    seen.set(c, t);
    const x = at(c), edge = l < 0.5 || r > W - 0.5;
    if (!(l <= x - 0.5 && x + 0.5 <= r)) bad.push(`${t.text}: not over its column`);
    else if (c !== chosen && !edge && Math.abs(t.x - x) >= 0.5) bad.push(`${t.text}: off its column's centre`);
    if (l < -0.5 || r > W + 0.5) bad.push(`${t.text}: outside the canvas`);
    if (NODE[lang][columns[c]].depth && c !== chosen) bad.push(`${t.text}: a section that is not chosen`);
  }
  const missing = columns.map((f, c) => c).filter((c) => !NODE[lang][columns[c]].depth && !seen.has(c));
  const ws = names.length ? await measure(names[0].font, missing.map((c) => NODE[lang][columns[c]].short)) : missing.map(() => 0);
  const roomy = missing.filter((c, i) => {
    const w = ws[i], x = Math.min(Math.max(at(c), w / 2), W - w / 2);
    return !names.some((t) => x - w / 2 < t.x + t.w / 2 + 2.01 && x + w / 2 > t.x - t.w / 2 - 2.01);
  }).map((c) => NODE[lang][columns[c]].short);
  return { seen, bad, touch: touching(names), roomy };
}
/** The part names: one per band, over it, the heading's first word(s) or the roman numeral (the last group: 终… / Coda…). */
function partAudit(lang, parts, feet) {
  const cw = feet[1][0] - feet[0][0], bad = [], named = new Map();
  for (const t of parts) {
    const b = BANDS.find((k) => t.x >= feet[k.first][0] - cw / 2 - 0.5 && t.x <= feet[k.last][0] + cw / 2 + 0.5);
    if (!b) { bad.push(`${t.text}: over no part`); continue; }
    if (named.has(b.p)) bad.push(`${t.text}: a second name of part ${b.p + 1}`);
    named.set(b.p, t.text);
    const head = PART_HEAD[lang][b.p], word = lang === 'zh' ? head.split(' ')[0] : head.split(' ').slice(0, 2).join(' ');
    if (!(b === GROUP ? t.text.startsWith(lang === 'zh' ? '终' : 'Coda') : t.text === word || t.text === ROMAN[b.p])) bad.push(`${t.text}: not a name of part ${b.p + 1}`);
  }
  return { bad, touch: touching(parts), unnamed: BANDS.filter((b) => !named.has(b.p)).map((b) => b.p + 1), group: named.get(GROUP.p) };
}
const setSrc = (v) => page.evaluate((x) => { const el = document.getElementById('src'); el.value = String(x); el.dispatchEvent(new Event('input', { bubbles: true })); }, v);
for (const [vw, vh] of [[334, 720], [390, 844], [1440, 900]]) {
  await page.setViewportSize({ width: vw, height: vh }); await settle(page, 60);
  for (const lang of ['zh', 'en']) {
    await page.click(`[data-lang-set="${lang}"]`);
    for (const chosen of [null, ...CHOSEN]) {
      await setSrc(chosen == null ? -1 : chosen); await settle(page);
      const A = await axisRead(), footY = A.feet[0][1], short = chosen == null ? null : NODE[lang][columns[chosen]].short;
      const names = A.texts.filter((t) => t.id === 'cv' && Math.abs(t.y - footY) <= 8), parts = A.texts.filter((t) => t.id === 'cv' && t.y - footY > 8 && t.y - footY <= 24);
      const au = await axisAudit(lang, names, (c) => A.feet[c][0], A.W, chosen), pa = partAudit(lang, parts, A.feet);
      const tag = `${vw}px ${lang}${chosen == null ? '' : `, ${short} chosen`}`;
      check(`column names (${tag}): each is the short number of one column, over its foot and inside the stage; only the chosen one may be a section; none touching`,
        names.length > 0 && !au.bad.length && !au.touch.length, JSON.stringify({ bad: au.bad, touch: au.touch }));
      const chapters = [...au.seen.keys()].filter((c) => NODE.zh[columns[c]].kind === 'chapter').map((c) => +NODE.zh[columns[c]].num).sort((a, b) => a - b);
      const group = [...au.seen.keys()].filter((c) => c >= GROUP.first).map((c) => NODE[lang][columns[c]].short);
      const dir = chosen == null ? TENS.every((c) => au.seen.has(c)) : chapters.length >= 3 && chapters[0] <= 10 && chapters.at(-1) >= 30;
      const nav = (chosen == null ? [CODA, APPX, NC - 1].every((c) => au.seen.has(c)) : group.length >= 1) && pa.group != null;
      check(`column names (${tag}): both ends stay, the chapters keep the direction (${chosen == null ? 'every tenth' : 'three or more, from ≤ 10 to ≥ 30'}), the coda group keeps ${chosen == null ? 'the coda, its first appendix and its last column' : 'a name'} and its part name`,
        au.seen.has(0) && au.seen.has(NC - 1) && dir && nav, JSON.stringify({ ends: [au.seen.has(0), au.seen.has(NC - 1)], chapters, group, part: pa.group }));
      check(`column names (${tag}): a chapter, the coda or an appendix is left out only where its measured name would touch a drawn one`, !au.roomy.length, JSON.stringify(au.roomy));
      const cyan = names.filter((t) => t.cyan).map((t) => t.text);
      check(`column names (${tag}): ${chosen == null ? 'no name is cyan' : `the chosen column reads ${short} in full, in cyan, the only cyan name`}`,
        chosen == null ? !cyan.length : JSON.stringify(cyan) === JSON.stringify([short]) && au.seen.has(chosen) && au.seen.get(chosen).cyan, JSON.stringify(cyan));
      check(`part names (${tag}): every part named once over its own band, by its heading or its roman numeral, the coda group by 终… / Coda…, none touching`,
        !pa.bad.length && !pa.touch.length && !pa.unnamed.length, JSON.stringify(pa));
      if (chosen != null) continue;
      const strip = A.texts.filter((t) => t.id === 'plot' && Math.abs(t.y - A.ticks[0][1]) <= 8);
      // kit.plot draws a tick label at the tick's pixel-snapped place, Math.round(x) + 0.5
      const sa = await axisAudit(lang, strip, (c) => Math.round(A.ticks[c + 1][0]) + 0.5, A.PW, null);
      check(`strip names (${vw}px ${lang}): each names the tick after one column by its short number, inside the strip; no section; none touching`,
        strip.length > 0 && !sa.bad.length && !sa.touch.length, JSON.stringify({ bad: sa.bad, touch: sa.touch }));
      check(`strip names (${vw}px ${lang}): both ends, every tenth chapter, the coda and its first appendix stay; any other chapter or appendix is left out only where it would touch`,
        [0, NC - 1, CODA, APPX, ...TENS].every((c) => sa.seen.has(c)) && !sa.roomy.length, JSON.stringify({ shown: strip.map((t) => t.text), roomy: sa.roomy }));
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
const UNITS2 = BI.zh.order.map((u) => u.file), COLS2 = UNITS2.filter((f) => f !== INDEX), APPE = 'appendix-e.md', CE = COLS2.indexOf(APPE);
const LAST_FILE = COLS2.at(-1), CLAST = COLS2.length - 1;
check('both SUMMARY files list the same units in the same order; every unit but Appendix C is a column, ending with an appendix',
  JSON.stringify(BI.en.order.map((u) => u.file)) === JSON.stringify(UNITS2) && JSON.stringify(UNITS2) === JSON.stringify(files) && UNITS2.includes(INDEX)
  && JSON.stringify(COLS2) === JSON.stringify(columns) && COLS2.length === UNITS2.length - 1 && CE >= 0 && /^appendix-[a-z]\.md$/.test(LAST_FILE), `${UNITS2.length} units, ${COLS2.length} columns, ${LAST_FILE} at ${CLAST}, Appendix E at ${CE}`);
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
// The name the page gives a unit (the chapter slider, the HUD, the notes) is the one derived from the SUMMARY tree:
// 第N章 / Chapter N for a chapter, 第N章·5.1 / Section N.5.1 for a section at any depth under it, 终章·1 / Coda.1
// under the unnumbered coda, 附录 A.1 / Appendix A.1 under an appendix.
const unitNameOk = (lang, file, title, shown) => !!NODE[lang][file] && shown === NODE[lang][file].name;
for (const lang of ['zh', 'en']) {
  check(`SUMMARY tree (${lang}): every child page, at any depth, is numbered by its parent and its place among its siblings and filed under its parent's stem; every top unit opens with its own name; the roots book.toml leaves unnumbered are the coda, and no title or heading in their trees keeps a number`,
    TREE[lang].bad.length === 0, TREE[lang].bad.slice(0, 4).join(' | '));
}
const shape = (lang) => TREE[lang].nodes.map((n) => [n.file, n.depth, n.parent && n.parent.file, n.num]);
check('SUMMARY tree: both languages have the same pages in the same order, at the same depth, under the same parents, with the same numbers',
  JSON.stringify(shape('zh')) === JSON.stringify(shape('en')) && JSON.stringify(TREE.zh.nodes.map((n) => n.file)) === JSON.stringify(files));
const tops = TREE.zh.nodes.filter((n) => !n.depth), chaps = tops.filter((n) => n.kind === 'chapter').map((n) => +n.num), appx = tops.filter((n) => n.kind === 'appendix').map((n) => n.num);
const codaTree = TREE.zh.nodes.filter((n) => n.root.kind === 'coda'), lastChap = Math.max(...chaps);
check(`SUMMARY tree: the top units run prelude, chapters 1, 2, … in order, the coda, then the appendices A, B, … in order; the coda takes no chapter number (no ${lastChap + 1}) and its pages are located as ${UNNUMBERED['coda.md']}.k`,
  tops[0].kind === 'prelude' && chaps.every((n, i) => n === i + 1) && JSON.stringify(tops.map((n) => n.kind)) === JSON.stringify(['prelude', ...chaps.map(() => 'chapter'), 'coda', ...appx.map(() => 'appendix')])
  && appx.every((x, i) => x === String.fromCharCode(65 + i))
  && codaTree.length > 1 && codaTree.every((n) => n.unnumbered && n.num.startsWith(UNNUMBERED['coda.md']) && !/^\d/.test(n.short))
  && !TREE.zh.nodes.some((n) => n.num === String(lastChap + 1) || n.num.startsWith(`${lastChap + 1}.`)), JSON.stringify(tops.map((n) => n.short)));
const kids = TREE.zh.nodes.filter((n) => n.depth), deepest = Math.max(...TREE.zh.nodes.map((n) => n.depth));
const parents = new Set(kids.map((n) => n.parent.file));
check(`SUMMARY tree: ${kids.length} child pages under ${parents.size} parents, to depth ${deepest + 1}; ${files.length} pages, ${columns.length} columns (every page but Appendix C), the last one ${LAST_FILE}`,
  files.length === TREE.zh.nodes.length && columns.length === files.length - 1 && !columns.includes(INDEX) && columns.at(-1) === LAST_FILE
  && kids.every((n) => columns.indexOf(n.file) > columns.indexOf(n.parent.file)) && deepest >= 1,
  JSON.stringify({ columns: columns.length, files: files.length, kids: kids.length }));
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
  else { const f = await p.evaluate((k) => window.LEANMAP_DEBUG.footAt(k), c); await press(p, f); }
  await settle(p);
  return readout(p);
}
async function chips(p, filter, mode) { await p.click(`[data-filter="${filter}"]`); await settle(p); await p.click(`[data-mode="${mode}"]`); await settle(p); }
// End rests the rail on the whole book; it neither waits for nor relies on playback reaching the end by itself
async function toEnd(p) { await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur()); await p.keyboard.press('End'); await settle(p); return (await readout(p)).st; }
// A chosen declaration's routes, from the first reading of the chapters (truth), never from the page: its citation
// destinations are the units citing it other than Appendix C (no column) and its home (the column it stands in); the
// chapter looked back from keeps a cyan line exactly when it is one of them and cites it in the current mode (any
// citation, or lean= only); the amber destinations are the rest. The chosen declaration's note must open with its home,
// give the number of destinations, name the looked-back chapter only when it keeps cyan, give the number of amber lines,
// which must be the ones drawn, and say the cyan line waits exactly when the rail has not read that chapter, which is
// exactly when the cyan line is not drawn.
const routeTruth = (g, src, mode) => {
  const dests = [...truth[g].cites.keys()].filter((f) => f !== INDEX && f !== truth[g].home);
  const cyan = src && dests.includes(src) && (mode === 'all' || truth[g].cites.get(src) === 'e') ? src : null;
  return { dests, cyan, amber: dests.filter((f) => f !== cyan).sort() };
};
const ROUTE_SAYS = {
  zh: { head: (home) => `首次出场：${home}，`, citedBy: '另外引用它的有', dests: (n) => `另外引用它的有 ${n} 章`, cyan: (name) => `其中${name}是正在回看的这一章`, looked: '正在回看', amber: (k) => `琥珀色的线只连到其余 ${k} 章`, each: () => '每一章连一根琥珀色的线', none: '没有琥珀色的线', wait: '时间轴读过这一章才画出' },
  en: { head: (home) => `First appears in ${home};`, citedBy: 'It is cited by', dests: (n) => `It is cited by ${n} other chapter${n === 1 ? '' : 's'}`, cyan: (name) => `${name} is the one being looked back from`, looked: 'looked back from', amber: (k) => `${k === 1 ? 'the amber line goes' : 'amber lines go'} only to the remaining ${k}`, each: (n) => (n === 1 ? 'which takes an amber line' : 'each taking an amber line'), none: 'so there is no amber line', wait: 'drawn once the rail has read it' }
};
function routeNoteOk(lang, note, g, st) {
  const R = routeTruth(g, st.src, st.mode), W = ROUTE_SAYS[lang], name = (f) => NODE[lang][f].name, n = R.dests.length, k = R.amber.length;
  const waits = R.cyan != null && Math.floor(st.t) <= columns.indexOf(R.cyan);
  const drawn = JSON.stringify(st.arcs.amber) === JSON.stringify(R.amber) && !st.arcs.amber.includes(truth[g].home) && (R.cyan == null || st.arcs.cyan.includes(g) === !waits);
  const says = !n ? note.includes(W.none) && !note.includes(W.citedBy) && !note.includes(W.looked)
    : R.cyan == null ? note.includes(W.dests(n)) && note.includes(W.each(n)) && !note.includes(W.looked)
      : note.includes(W.dests(n)) && note.includes(W.cyan(name(R.cyan))) && note.includes(k ? W.amber(k) : W.none);
  return drawn && note.startsWith(W.head(name(truth[g].home))) && says && note.includes(W.wait) === waits;
}
// The population the landed count stands for, as the readout heading, the strip's dashed label (read from the fillText
// calls of its legend) and the strip's description name it, with the counts; independently, the population is every
// entry of the lock, the entries the lock records as theorems, or the entries no chapter cites with lean=.
const POP_N = { all: GIDS.length, theorem: GIDS.filter((g) => lock.declarations[g].kind === 'theorem').length, inline: GIDS.filter((g) => !truth[g].env).length };
const POP_SAYS = { zh: { landed: '已落定 / ', all: '锁文件里的条目', theorem: 'theorem', inline: '行内', aria: (x) => `虚线是${x}数`, lock: `锁文件共 ${GIDS.length} 条` },
  en: { landed: 'landed / ', all: 'entries in the lock', theorem: 'theorem', inline: 'inline', aria: (x) => `the dashed line is the number of ${x}`, lock: `the lock has ${GIDS.length}` } };
const popRead = (p) => p.evaluate(() => {
  if (!window.__popRec) {
    const R = window.__popRec = { on: false, texts: [] }, ctx = document.getElementById('plot').getContext('2d'), orig = ctx.fillText;
    ctx.fillText = function (text) { if (R.on && this.textAlign === 'left') R.texts.push(String(text)); return orig.apply(this, arguments); };
  }
  const R = window.__popRec; R.texts = []; R.on = true; window.TRV.kit.flush(); R.on = false;
  const txt = (id) => document.getElementById(id).innerText.trim();
  return { head: txt('roMetHead'), met: txt('roMet'), sub: txt('roMetSub'), meta: txt('plotMeta'), aria: document.getElementById('plot').getAttribute('aria-label'), legend: R.texts, filter: window.LEANMAP_DEBUG.state.filter };
});
function popOk(lang, r, filter) {
  const W = POP_SAYS[lang], name = r.head.startsWith(W.landed) ? r.head.slice(W.landed.length) : null, n = POP_N[filter];
  return name != null && r.filter === filter
    && (filter === 'all' ? name === W.all : name !== W.all && name.includes(W[filter]))     // the whole lock only under “all”
    && r.legend.length === 2 && r.legend[1] === name && r.aria.endsWith(W.aria(name))       // the dashed label and the description name it too
    && r.met.endsWith(` / ${n}`) && r.meta.endsWith(` / ${n}`) && r.sub === W.lock;         // counted over it; the whole lock under the count
}
async function sweep(p, lang, how) {
  const bad = []; let n = 0, wrong = 0;
  const pop = { n: 0, wrong: 0, bad: [] };
  for (const filter of ['all', 'theorem', 'inline']) {
    for (const mode of ['all', 'env']) {
      await chips(p, filter, mode);
      const pr = await popRead(p); pop.n++;
      if (!popOk(lang, pr, filter)) { pop.wrong++; if (pop.bad.length < 3) pop.bad.push({ filter, mode, ...pr }); }
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
  return { n, wrong, bad, pop };
}
async function appendixCitations(p, lang, how, tag, file, col) {
  await chips(p, 'all', 'all'); await showStage(p);
  if ((await readout(p)).st.srcCol === col) await choose(p, how, how === 'slider' ? -1 : col);   // start from another state
  let r = await choose(p, how, col);
  const want = wantFocus(col, 'all'), [hud] = SAYS[lang](r.shown, want.length);
  check(`${tag}: ${file} (Appendix C has no column) looks back over its own ${want.length} citations, not Appendix C's ${BI.zh.cites[INDEX].size}`,
    want.length > 0 && want.length < BI.zh.cites[INDEX].size && r.st.src === file && r.st.srcCol === col && JSON.stringify(r.st.focus) === JSON.stringify(want) && JSON.stringify(r.st.arcs.cyan) === JSON.stringify(want)
    && nameFits(BI[lang].order.find((u) => u.file === file).title, r.shown) && r.hud.startsWith(hud) && r.max === String(CLAST) && JSON.stringify(r.cols) === JSON.stringify(COLS2),
    JSON.stringify({ src: r.st.src, focus: r.st.focus.length, want: want.length, shown: r.shown, hud: r.hud, max: r.max }));
  await p.click('[data-mode="env"]'); await settle(p); r = await readout(p);
  const wantEnv = wantFocus(col, 'env');
  check(`${tag}: “environments only” leaves ${file} the ${wantEnv.length} lean= citations it has`, r.st.src === file && JSON.stringify(r.st.focus) === JSON.stringify(wantEnv) && r.hud.startsWith(SAYS[lang](r.shown, wantEnv.length)[0]), r.hud);
  await p.click('[data-mode="all"]'); await settle(p);
  return want;
}
async function lastAppendix(p, lang, how, tag) {
  if (APPE !== LAST_FILE) await appendixCitations(p, lang, how, tag, APPE, CE);
  const want = await appendixCitations(p, lang, how, tag, LAST_FILE, CLAST);
  await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
  await p.keyboard.press('ArrowLeft'); await settle(p); const before = (await readout(p)).st;
  await p.keyboard.press('End'); await settle(p); const after = (await readout(p)).st;
  const g = want.find((x) => amberWant(x, LAST_FILE).length > 0) || want[0];
  await showStage(p); const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), g);
  await press(p, at); await settle(p); const chosenR = await readout(p), chosen = chosenR.st;
  await press(p, at); await settle(p); const released = (await readout(p)).st;
  check(`${tag}: ${LAST_FILE}'s cyan lines wait until the rail has read it (← then End), and a chosen cell it cites sends amber only to the other chapters`,
    before.t === CLAST && before.arcs.cyan.length === 0 && JSON.stringify(before.focus) === JSON.stringify(want) && after.t === NC && !after.playing && JSON.stringify(after.arcs.cyan) === JSON.stringify(want)
    && chosen.sel === g && JSON.stringify(chosen.arcs.amber) === JSON.stringify(amberWant(g, LAST_FILE)) && chosen.arcs.cyan.includes(g) && released.sel === null,
    JSON.stringify({ before: [before.t, before.arcs.cyan.length], after: [after.t, after.arcs.cyan.length], g, amber: chosen.arcs.amber }));
  check(`${tag}: the chosen cell's note opens with its home, counts the chapters citing it besides its home and Appendix C, keeps Appendix E's line cyan when it holds the cell, and counts exactly the amber lines drawn`,
    chosen.sel === g && routeNoteOk(lang, chosenR.note, g, chosen), JSON.stringify({ g, note: chosenR.note, route: routeTruth(g, chosen.src, chosen.mode), amber: chosen.arcs.amber }));
}
// every cell chosen by pointer: its rendered link is the lock's module file and line at the pinned commit
async function release(p) {
  const sel = (await readout(p)).st.sel; if (!sel) return;
  const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), sel); await press(p, at); await settle(p);
}
async function links(p, gids) {
  await chips(p, 'all', 'all'); await showStage(p); await release(p);
  const bad = []; let ok = 0;
  for (const g of gids) {
    const at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), g);
    if (!at) { bad.push([g, 'no cell']); continue; }
    await press(p, at); await settle(p);
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
      sw.wrong === 0 && sw.n === 3 * 2 * (NC + (opts.sweep === 'slider' ? 1 : 0)), JSON.stringify({ n: sw.n, wrong: sw.wrong, bad: sw.bad }));
    check(`${tag}: under each filter chip × citation mode, the landed heading, the strip's dashed label and its description name the population the filter keeps (the whole lock only under “all”), and both counts run over it`,
      sw.pop.wrong === 0 && sw.pop.n === 3 * 2, JSON.stringify(sw.pop));
  }
  await lastAppendix(p, lang, opts.sweep || 'foot', tag);
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
// a fresh page builds its clock, keys, autoplay and probe only after its two JSON files arrive (kit.pending): settle()
// waits for that, so no key is pressed and no probe read before the page exists (an early End would scroll the document)
const desktopEn = await T.open('quantum-geometry', 'lean-declaration-map', '?lang=en', { viewport: { width: 1440, height: 900 }, locale: LOCALE.en });
await settle(desktopEn);
st0 = (await readout(desktopEn)).st;
check('desktop 1440 px (en): the full page opens on the whole book read, not playing', st0.t === NC && !st0.playing && st0.preset === 'all');
await frame(desktopEn, 'en', 'desktop 1440 px (en)', { sweep: 'foot' });
// every frame checks the final appendix, Appendix E and the dotted names; the narrow ones sweep the filters, and the links of every cell are read
// in two frames, one per language and width
for (const [w, lang, sweepIt, linksIt] of [[334, 'zh', true, false], [334, 'en', true, true], [740, 'zh', false, false], [740, 'en', false, false]]) {
  const p = await T.open('quantum-geometry', 'lean-declaration-map', `?embed=1&lang=${lang}`, { viewport: { width: w, height: 620 }, locale: LOCALE[lang] });
  const tag = `in the book ${w} px (${lang})`;
  await settle(p);
  const played = await until(p, () => { const d = window.LEANMAP_DEBUG.state; return d.playing && d.t > 0; });
  st0 = await toEnd(p);
  check(`${tag}: the full lab plays by itself once in view, and End stops it on the whole book`, played && st0.t === NC && !st0.playing);
  await frame(p, lang, tag, sweepIt ? { sweep: 'foot', links: linksIt } : {});
}

/* ---------- a chosen declaration's routes and the filter's population over the control families, both languages ---------- */
// The states a reader reaches through the cards, the rail, the citation-mode chips, the chapter slider, the foot of a
// column, the filter chips, the search box and a pointer on a cell: the chosen declaration's note must agree with
// routeTruth and with the lines drawn (routeNoteOk), the card notes must say the chosen cell's home takes no amber line,
// and the landed heading, dashed label and description must name the filter's population (popOk). These are samples of
// a domain the source checks at the top cover by construction (one routes(), one cyanOn(), one KEPT), not an enumeration.
const FIX_HOME = truth[FIX].home, INL = [...truth[FIX].cites].find(([f, m]) => m === 'i' && f !== INDEX && f !== FIX_HOME)[0];
const LONE = GIDS.find((g) => routeTruth(g, null, 'all').dests.length === 0);
const HOME_SAYS = { zh: '琥珀线不连回那里', en: 'no amber line goes there' }, FIRST_SAYS = { zh: '首次出场', en: 'First appears' };
await page.setViewportSize({ width: 1440, height: 900 }); await settle(page, 60);
for (const lang of ['zh', 'en']) {
  const p = page, tag = `routes and population (${lang})`, W = ROUTE_SAYS[lang], ok = (x, g) => x.st.sel === g && routeNoteOk(lang, x.note, g, x.st);
  const cardSays = async (g) => { const t = (await p.textContent('#presetNote')).trim(); return t.includes(NODE[lang][truth[g].home].name) && t.includes(HOME_SAYS[lang]); };
  await p.click(`[data-lang-set="${lang}"]`); await p.fill('#q', ''); await settle(p);
  let r, pr;
  // the two cards that choose a cell
  for (const [id, g, src] of [['closure', FIX, CH28], ['bedrock', PAR, CH27]]) {
    await p.click(`[data-preset="${id}"]`); await settle(p); r = await readout(p);
    const R = routeTruth(g, src, 'env');
    check(`${tag}, card ${id}: ${R.dests.length} chapters cite the chosen cell besides its home and Appendix C; ${src.slice(0, 4)} keeps its line cyan, amber goes to the other ${R.amber.length}, as drawn; the card note says the home takes no amber line`,
      r.st.preset === id && R.cyan === src && R.amber.length === R.dests.length - 1 && ok(r, g) && r.st.arcs.amber.length === R.amber.length && await cardSays(g), `${r.note} | ${JSON.stringify(r.st.arcs.amber)}`);
  }
  // the rail: before and after it has read Chapter 28, the card still on
  await p.click('[data-preset="closure"]'); await settle(p);
  await p.evaluate((v) => window.LEANMAP_DEBUG.seek(v), columns.indexOf(CH28)); await settle(p); const early = await readout(p);
  await p.evaluate((v) => window.LEANMAP_DEBUG.seek(v), columns.indexOf(CH28) + 1); await settle(p); const read = await readout(p);
  await toEnd(p);
  check(`${tag}, rail: until it has read Chapter 28 that line is not drawn and the note says it waits; then it is drawn and the note no longer says so; the amber lines stay`,
    ok(early, FIX) && early.note.includes(W.wait) && !early.st.arcs.cyan.includes(FIX) && ok(read, FIX) && !read.note.includes(W.wait) && read.st.arcs.cyan.includes(FIX)
    && JSON.stringify(early.st.arcs.amber) === JSON.stringify(read.st.arcs.amber), `${early.note} | ${read.note}`);
  // the citation-mode chips, the chapter slider (the cell's home, then none)
  await p.click('[data-mode="all"]'); await settle(p); r = await readout(p);
  check(`${tag}, mode “every citation”: Chapter 28 still holds the chosen cell in cyan; same routes`, r.st.mode === 'all' && r.st.preset === null && ok(r, FIX) && r.note.includes(W.cyan(NODE[lang][CH28].name)), r.note);
  r = await choose(p, 'slider', columns.indexOf(FIX_HOME));
  check(`${tag}, slider on the cell's home: the home takes no amber line and every other citing chapter takes one, Chapter 28 included`,
    r.st.src === FIX_HOME && ok(r, FIX) && r.st.arcs.amber.includes(CH28) && !r.note.includes(W.looked), r.note);
  r = await choose(p, 'slider', -1);
  check(`${tag}, slider on none: every chapter citing it but its home and Appendix C takes an amber line`, r.st.src === null && ok(r, FIX) && r.st.arcs.amber.length === routeTruth(FIX, null, 'all').dests.length, r.note);
  // the foot of a chapter that cites it by an inline link only: lean= citations only, then every citation
  await p.click('[data-mode="env"]'); await settle(p); await showStage(p);
  r = await choose(p, 'foot', columns.indexOf(INL));
  check(`${tag}, foot of ${INL} with lean= citations only: its cyan set does not hold the chosen cell, so it takes an amber line`, r.st.src === INL && r.st.mode === 'env' && !r.st.focus.includes(FIX) && ok(r, FIX) && r.st.arcs.amber.includes(INL), r.note);
  await p.click('[data-mode="all"]'); await settle(p); r = await readout(p);
  check(`${tag}, the same foot with every citation: its inline link puts the cell in its cyan set, its line is cyan and amber goes to the rest`, r.st.focus.includes(FIX) && ok(r, FIX) && !r.st.arcs.amber.includes(INL) && r.note.includes(W.cyan(NODE[lang][INL].name)), r.note);
  // the filter chips: theorems keep the chosen theorem; inline only lets a lean=-cited cell go
  await p.click('[data-filter="theorem"]'); await settle(p); r = await readout(p); pr = await popRead(p);
  check(`${tag}, filter “theorems”: the chosen theorem keeps its routes; the heading, dashed label and description name the theorem entries`, r.st.filter === 'theorem' && ok(r, FIX) && popOk(lang, pr, 'theorem'), JSON.stringify([r.note, pr]));
  await p.click('[data-filter="inline"]'); await settle(p); r = await readout(p); pr = await popRead(p);
  check(`${tag}, filter “inline only”: the lean=-cited cell is let go with its note; the population named is the inline-only entries`, r.st.sel === null && !r.note.includes(FIRST_SAYS[lang]) && popOk(lang, pr, 'inline'), JSON.stringify([r.note, pr]));
  await p.click('[data-filter="all"]'); await settle(p); await showStage(p);
  // a pointer on the cell again, then the search box (matching it, then not)
  let at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), FIX); await press(p, at); await settle(p); r = await readout(p);
  check(`${tag}, pointer on the cell with ${INL} looked back from: the same routes`, ok(r, FIX), r.note);
  await p.fill('#q', 'unreadState_fixed'); await settle(p); r = await readout(p); pr = await popRead(p);
  check(`${tag}, a search that matches it keeps the chosen cell and its routes; the population is still the filter's`, ok(r, FIX) && popOk(lang, pr, 'all'), r.note);
  await p.fill('#q', 'zz_no_such_name'); await settle(p); r = await readout(p);
  check(`${tag}, a search that misses it lets the chosen cell go, and its note with it`, r.st.sel === null && !r.note.includes(FIRST_SAYS[lang]), r.note);
  await p.fill('#q', ''); await settle(p);
  // with no chapter looked back from: a cell no chapter but its home cites, then one others cite
  await choose(p, 'slider', -1); await showStage(p);
  at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), LONE); await press(p, at); await settle(p); r = await readout(p);
  check(`${tag}, pointer on a cell only its home cites (${LONE.split('.').pop()}): no amber line drawn, and the note says so`, ok(r, LONE) && r.st.arcs.amber.length === 0, r.note);
  await press(p, at); await settle(p);
  at = await p.evaluate((x) => window.LEANMAP_DEBUG.cellAt(x), FIX); await press(p, at); await settle(p); r = await readout(p);
  check(`${tag}, pointer on a cell other chapters cite: one amber line to each, as the note counts`, ok(r, FIX) && r.note.includes(W.each(routeTruth(FIX, null, 'all').dests.length)), r.note);
  await press(p, at); await settle(p);
  // the population over the filter cards and the rail
  for (const [id, filter] of [['theorems', 'theorem'], ['inline', 'inline'], ['table28', 'all']]) {
    await p.click(`[data-preset="${id}"]`); await settle(p); pr = await popRead(p);
    check(`${tag}, card ${id}: the heading, dashed label and description name the ${filter === 'all' ? 'whole lock' : `${filter} population`} and count ${POP_N[filter]}`, popOk(lang, pr, filter), JSON.stringify(pr));
  }
  await p.evaluate((v) => window.LEANMAP_DEBUG.seek(v), 40); await settle(p); pr = await popRead(p);
  check(`${tag}, rail at 40 columns read: the same population and denominator, fewer landed`, popOk(lang, pr, 'all') && pr.met !== `${POP_N.all} / ${POP_N.all}`, JSON.stringify(pr));
  await toEnd(p);
}
await page.click('[data-lang-set="zh"]'); await settle(page);

check('no page error, console error or failed request (page-specific part)', T.errors.length === 0, T.errors.slice(0, 4).join(' | '));
await T.finish();
