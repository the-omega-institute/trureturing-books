import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { session, stageFirstChecks, settle, stageView, overflowX, cjkLeftovers, playsAfter, solidPixels } from '../../../../tools/node/viz-testkit.mjs';

const BOOK = 'quantum-geometry', ID = 'berry-sector-path-sandbox';
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', ID);
const CARDS = ['sector-volume', 'hopf-fiber-lift', 'stokes-wilson-duality', 'pancharatnam-fan', 'feynman-stationary'];
const GIDS = [
  'D5/S3/Quantum/Information/GroupInvariantPsi/C129QubitBargmann.triple_bargmann_bloch',
  'D5/S3/Quantum/Information/BargmannImaginaryMaximizers.bargmann_path_product',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverNoSection.no_continuous_global_section',
  'D5/S3/ConceptDynamics/Topology/CircleDoubleCoverHistoryLift.circle_double_cover_history_lift',
  'D5/S3/Observer/AgencyHolonomy/NamedTreePhaseTransport.selected_tree_transport',
  'D5/S3/Observer/AgencyHolonomy/AnchoredPhaseClassification.anchored_phase_classification'
];
// 并发写作期间不扫描章节引用；所有卡的浏览器检查仍在下方逐项执行。
const PHASE1 = process.env.VIZ_PHASE1 === '1';
const T = await session({ viewport: { width: 1280, height: 800 } }), { page, check } = T;
const near = (a, b, tol = 1e-10) => Math.abs(a - b) < tol;
const state = (p = page) => p.evaluate(() => BERRY_DEBUG.state);
async function pick(card, p = page) { await p.evaluate(id => document.querySelector(`[data-preset="${id}"]`).click(), card); await settle(p); }
async function range(id, value, p = page) { await p.$eval(`#${id}`, (e, v) => { e.value = String(v); e.dispatchEvent(new Event('input', { bubbles: true })); }, value); await settle(p); }
// 标准版式：曲线只在舞台下方的 .strip 里渲染，舞台内既无 #plot 也无 .math-panel。
const stripPlot = p => p.evaluate(() => {
  const stage = document.querySelector('.center #stage'), plot = document.querySelector('.center .strip #plot');
  return { inStage: stage ? stage.querySelectorAll('#plot, .math-panel').length : -1, rendered: !!plot && plot.getClientRects().length > 0, height: plot ? plot.clientHeight : 0,
    under: !!stage && !!plot && plot.getBoundingClientRect().top >= stage.getBoundingClientRect().bottom - 0.5 };
});
const readablePlot = v => v.inStage === 0 && v.rendered && v.height >= 54 && v.under;
// 1440 × 900 桌面整页是与 triadic 相同的标准三栏实验室：量网格轨道、栏位边界与可见框，而不只查选择器。
// 返回问题清单（空 = 通过）；依据栏自带滚动，先像读者一样滚入栏内再量，量完复原所有滚动位置。
const desktopLab = p => p.evaluate(() => {
  const bad = [], q = s => document.querySelector(s), css = e => getComputedStyle(e), rect = e => e.getBoundingClientRect();
  const shown = e => { if (!e || !e.getClientRects().length || css(e).visibility === 'hidden') return false; for (let a = e; a; a = a.parentElement) if (css(a).opacity === '0') return false; return true; };
  const seen = e => {
    const b = rect(e); let l = Math.max(b.left, 0), t = Math.max(b.top, 0), r = Math.min(b.right, innerWidth), d = Math.min(b.bottom, innerHeight);
    for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) { const s = css(a); if (s.overflowX === 'visible' && s.overflowY === 'visible') continue; const c = rect(a); l = Math.max(l, c.left); t = Math.max(t, c.top); r = Math.min(r, c.right); d = Math.min(d, c.bottom); }
    return { w: Math.max(0, r - l), h: Math.max(0, d - t) };
  };
  const visible = e => { const v = seen(e); return v.w > 0 && v.h > 0; };
  const app = q('.app.lab'), grid = app && css(app), tracks = grid ? (grid.gridTemplateColumns.match(/[\d.]+px/g) || []).map(parseFloat) : [];
  if (!grid || grid.display !== 'grid' || tracks.length !== 3 || !tracks.every(w => w > 0)) bad.push(`.app.lab is not a three-column grid (${grid && grid.display}: ${grid && grid.gridTemplateColumns})`);
  const names = ['deck', 'center', 'side'], cols = ['.app.lab > .col.deck', '.app.lab > .center', '.app.lab > .col.side'].map(q), [deck, center, side] = cols;
  cols.forEach((c, i) => { if (!shown(c)) bad.push(`${names[i]} column is not rendered`); else if (!visible(c)) bad.push(`${names[i]} column has no visible box`); });
  if (cols.every(shown)) {
    const [d, c, s] = cols.map(rect);
    if (!(d.left >= -0.5 && d.right <= c.left + 0.5 && c.right <= s.left + 0.5 && s.right <= innerWidth + 0.5)) bad.push(`columns not ordered deck | center | side without overlap: ${[d, c, s].map(b => `${Math.round(b.left)}–${Math.round(b.right)}`).join(', ')}`);
    if (Math.min(d.bottom, c.bottom, s.bottom) - Math.max(d.top, c.top, s.top) <= 0) bad.push('the three columns do not share a row');
    if (tracks.length === 3 && [d, c, s].some((b, i) => Math.abs(b.width - tracks[i]) > 1)) bad.push(`column widths ${[d, c, s].map(b => Math.round(b.width)).join('/')} differ from grid tracks ${tracks.map(Math.round).join('/')}`);
  }
  const part = (sel, col, what) => {
    const e = q(sel);
    if (!e || !col || !col.contains(e)) { bad.push(`${what} is not in its column`); return null; }
    if (!shown(e)) { bad.push(`${what} is not rendered`); return null; }
    const b = rect(e), c = rect(col); if (!(b.left >= c.left - 0.5 && b.right <= c.right + 0.5)) bad.push(`${what} sticks out of its column`);
    return e;
  };
  const presets = part('.col.deck #presets', deck, '#presets'), stage = part('.center #stage', center, '#stage'), plot = part('.center .strip #plot', center, '.strip #plot');
  const readouts = part('.col.side #readouts', side, '#readouts'), evidence = part('.col.side #evidence', side, '#evidence');
  for (const [e, what] of [[presets, '#presets'], [stage, '#stage'], [readouts, '#readouts']]) if (e && !visible(e)) bad.push(`${what} has no visible box`);
  const inStage = stage ? stage.querySelectorAll('#plot, .math-panel').length : -1;
  if (inStage !== 0) bad.push(`#stage holds ${inStage} #plot / .math-panel`);
  if (plot) { if (plot.clientHeight < 54 || rect(plot).height < 54) bad.push(`.strip #plot is ${plot.clientHeight}px tall`); if (stage && rect(plot).top < rect(stage).bottom - 0.5) bad.push('.strip #plot is not under the stage'); }
  if (readouts && evidence && rect(evidence).top < rect(readouts).bottom - 0.5) bad.push('#evidence is not under #readouts');
  if (evidence) {
    const scrolls = [side, document.body, document.documentElement].map(e => [e, e.scrollTop, e.scrollLeft]);
    evidence.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const v = seen(evidence); if (!(v.w > 0 && v.h > 0)) bad.push(`#evidence has no visible box once scrolled into view (${Math.round(v.w)} × ${Math.round(v.h)})`);
    for (const [e, top, left] of scrolls) { e.scrollTop = top; e.scrollLeft = left; }
  }
  const info = q('#infoBtn');
  if (!info || !evidence || !evidence.contains(info) || info.closest('.status') || document.querySelectorAll('#infoBtn').length !== 1) bad.push('#infoBtn is not the single theory button inside #evidence (outside .status)');
  else if (!shown(info)) bad.push('#infoBtn is not rendered');
  return bad;
});
let scheme = 'dark';
const newContext = T.browser.newContext.bind(T.browser);
T.browser.newContext = options => newContext({ ...options, colorScheme: scheme });

for (scheme of ['dark', 'light']) {
  await page.emulateMedia({ colorScheme: scheme });
  await stageFirstChecks(T, BOOK, ID, { solid: true, ...(PHASE1 ? { cards: false } : {}) });
  check(`${scheme}: single-theme night-console contract`, await page.evaluate(() => document.documentElement.dataset.trPalette === undefined));
}
if (PHASE1) console.log('Phase 1: chapter citation scanning deferred; explicit card matrix follows.');
const sources = Object.fromEntries(['index.html', 'main.js', 'style.css'].map(name => [name, fs.readFileSync(path.join(DIR, name), 'utf8')]));
for (const [name, source] of Object.entries(sources)) check(`${name}: every color comes from tokens`, !/#[\da-f]{3,8}\b|\b(?:rgba?|hsla?)\s*\(/i.test(source));
check('no open-problem or green stage colors', !/P\.(warn|ok)|--warn|--tr-warn|--ok/.test(sources['main.js']));
check('exactly six frozen GIDs', [...sources['index.html'].matchAll(/data-lean-gid="([^"]+)"/g)].map(m => m[1]).sort().join() === [...GIDS].sort().join());
const entry = JSON.parse(fs.readFileSync(path.join(DIR, '..', 'visualizations.json'), 'utf8')).visualizations.find(v => v.id === ID);
check('registry: bilingual live §29.7 with exact card order', entry.status === 'live' && entry.chapter === 29 && entry.section === '29.7' && entry.presets.join() === CARDS.join() && CARDS.every(id => entry.preset_titles[id].zh && entry.preset_titles[id].en));
check('registry: exact frozen dependencies and four bilingual evidence layers', entry.lean.map(r => r.gid).sort().join() === [...GIDS].sort().join() && ['LEAN ✓', 'ARGUED', 'NUM', 'MODEL'].every(kind => entry.theory.some(t => t.label.startsWith(kind) && t.label_en.startsWith(kind))));
await T.goto(BOOK, ID, '?lang=en'); await settle(page);
check('shared runtime scripts only', await page.evaluate(() => [...document.scripts].map(s => s.getAttribute('src')).join() === '../assets/shell.js,../assets/kit.js,main.js'));
await page.click('#infoBtn');
check('six Lean claim boxes contain their clickable GIDs', await page.$$eval('#drawer .viz-claim-lean', boxes => boxes.length === 6 && boxes.every(b => b.querySelector('.lean a[data-lean-gid][href*="/blob/"]'))));
check('drawer separates argued, numerical and model evidence without OPEN', await page.evaluate(() => !!document.querySelector('.viz-theory .viz-claim-argued') && !!document.querySelector('.viz-claim-num') && !!document.querySelector('.viz-claim-model') && !document.querySelector('#drawer .open')));
await page.keyboard.press('Escape');

// 球面面积用三向量行列式与点积独立计算，避免复用页面的半角公式。
for (const degrees of [15, 30, 45, 60, 90]) {
  await pick('sector-volume'); await range('eps', degrees); const s = await state(), e = degrees * Math.PI / 180;
  const det = Math.sin(e) ** 2, denominator = 1 + 2 * Math.cos(e) + Math.cos(e) ** 2;
  const area = 2 * Math.atan2(det, denominator);
  check(`ε=${degrees}°: cap, sector, tetrahedron and Berry phase`, near(s.cap, area) && near(s.sector, area / 3) && near(s.tetra, det / 6) && near(s.gamma, -area / 2));
  check(`ε=${degrees}°: visible readouts match geometry`, near(Number(await page.locator('#roCap').innerText()), area, 0.000001) && near(Number(await page.locator('#roSector').innerText()), area / 3, 0.000001) && near(Number(await page.locator('#roTetra').innerText()), det / 6, 0.000001));
  check(`ε=${degrees}°: Bargmann imaginary-volume relation`, near(s.tetra, 2 * s.imDelta / 3));
}
await pick('hopf-fiber-lift'); await range('now', 1); let s = await state();
check('two paths meet at exactly C with a nonzero phase separation', s.q1.every((x, i) => near(x, s.C[i])) && s.q2.every((x, i) => near(x, s.C[i])) && near(s.liftPhase, s.gamma) && s.gamma < 0);
await range('now', 0.5); s = await state();
check('the two-step lift reaches B halfway and has zero enclosed fan so far', s.q2.every((x, i) => near(x, s.B[i])) && near(s.liftPhase, 0));
await range('now', 0); check('play advances the synchronized path probe', await playsAfter(page, () => page.click('#play'), () => BERRY_DEBUG.state));
await page.click('#play'); await settle(page); check('pause stops the path clock', !(await state()).playing);

await pick('stokes-wilson-duality'); const beforeGauge = await state();
for (const degrees of [-180, -90, 0, 60, 180]) {
  await range('gauge', degrees); const g = await state();
  const product = g.edgePhases.reduce(([x, y], phi) => [x * Math.cos(phi) - y * Math.sin(phi), x * Math.sin(phi) + y * Math.cos(phi)], [1, 0]);
  check(`gauge ${degrees}°: Wilson product and anchored difference invariant`, product.every((v, i) => near(v, beforeGauge.wilson[i])) && g.wilson.every((v, i) => near(v, beforeGauge.wilson[i])) && near(g.anchoredDifference, beforeGauge.anchoredDifference));
  check(`gauge ${degrees}°: individual edge phases really change`, near(g.edgePhases[0], degrees * Math.PI / 180) && near(g.edgePhases[1], -degrees * Math.PI / 180) && near(g.edgePhases[2], g.gamma));
}

await pick('pancharatnam-fan'); let previous = 0;
for (const [n, expected] of [[3, 0.2894], [4, 0.3906], [12, 0.7340], [36, 0.9023]]) {
  await range('steps', n); s = await state(); const theta = Math.PI / 3, spinors = Array.from({ length: n }, (_, i) => [Math.cos(theta / 2), Math.sin(theta / 2) * Math.cos(2 * Math.PI * i / n), Math.sin(theta / 2) * Math.sin(2 * Math.PI * i / n)]);
  let re = 1, im = 0;
  for (let i = 0; i < n; i++) {
    const a = spinors[i], b = spinors[(i + 1) % n], r = a[0] * b[0] + a[1] * b[1] + a[2] * b[2], z = a[1] * b[2] - a[2] * b[1];
    [re, im] = [re * r - im * z, re * z + im * r];
  }
  check(`N=${n}: cyclic spinor product and Zeno modulus benchmark`, near(s.fan.product[0], re) && near(s.fan.product[1], im) && near(s.fan.modulus, expected, 0.00006) && s.fan.modulus > previous && s.fan.modulus < 1);
  check(`N=${n}: discrete phase approaches the continuous −90° limit`, near(s.fan.phase, -Math.atan2(im, re)) && near(s.fan.limit, -Math.PI / 2) && Math.abs(s.fan.phase - s.fan.limit) < 0.6);
  previous = s.fan.modulus;
}
await range('theta', 45); check('latitude control updates both solid-angle target and overlaps', near((await state()).fan.limit, -Math.PI * (1 - Math.SQRT1_2)));

await pick('feynman-stationary'); s = await state();
check('default screenshot compares both 41-path bundles at η₀=0.50', near(s.eta, 0.50) && s.stationary.chain.length === 42 && s.steered.chain.length === 42 && near(s.stationary.amplitude, 0.9328648371715882) && near(s.steered.amplitude, 0.18163496009843386));
await range('eta', 0); const constructive = await state();
await range('eta', 0.50); const destructive = await state();
check('steering 0 → 0.50 drops the resultant while cyan reference stays fixed', near(constructive.steered.amplitude, constructive.stationary.amplitude) && destructive.steered.amplitude < 0.20 && constructive.steered.amplitude > 0.93 && near(constructive.stationary.amplitude, destructive.stationary.amplitude));
// 两段实际球面距离之和独立核对模型路径长度。
const distance = (a, b) => Math.acos(Math.max(-1, Math.min(1, a.reduce((t, v, i) => t + v * b[i], 0))));
const a = [-Math.SQRT1_2, Math.SQRT1_2, 0], c = [Math.SQRT1_2, Math.SQRT1_2, 0];
for (const [i, eta] of [[0, 0.30], [20, 0.50], [40, 0.70]]) {
  const b = [0, Math.cos(eta), Math.sin(eta)], len = distance(a, b) + distance(b, c);
  check(`bundle member ${i}: displayed length is the broken-geodesic length`, near(destructive.steered.lengths[i], len));
}
await range('wave', 45); check('wavenumber changes both finite path sums', !near((await state()).steered.amplitude, destructive.steered.amplitude) && !near((await state()).stationary.amplitude, destructive.stationary.amplitude));

// 全卡矩阵独立于章节引用，覆盖完整页面与两种书内高度。
for (scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) for (const [width, height, query] of [[1280, 800, ''], [375, 667, ''], [820, 520, '&embed=1'], [820, 640, '&embed=1'], [375, 667, '&embed=1']]) {
  const p = await T.open(BOOK, ID, `?lang=${lang}${query}`, { viewport: { width, height }, reducedMotion: 'reduce' }); await settle(p);
  for (const card of CARDS) {
    await pick(card, p); const v = await stageView(p, '#stage'), q = await state(p), issues = [...v.hud, ...v.layout];
    for (const b of q.labels) if (b.x < 0 || b.x + b.w > q.bounds.W || b.y < q.bounds.top - 1 || b.y + b.h > q.bounds.bottom + 1) issues.push('clipped geometry label');
    for (let i = 0; i < q.labels.length; i++) for (let j = i + 1; j < q.labels.length; j++) { const a = q.labels[i], b = q.labels[j]; if (Math.min(a.x + a.w, b.x + b.w) > Math.max(a.x, b.x) && Math.min(a.y + a.h, b.y + b.h) > Math.max(a.y, b.y)) issues.push('overlapping geometry labels'); }
    if (await overflowX(p) > 0) issues.push('horizontal overflow'); if (lang === 'en') issues.push(...await cjkLeftovers(p));
    check(`${scheme}/${lang}/${width}×${height}${query}/${card}: stage and plot stay readable`, issues.length === 0, issues.slice(0, 3).join(' | '));
    // 整页与整台实验室嵌入（无 preset）都保留曲线条：它在舞台下方的 .strip 里，不在舞台内。
    const plot = await stripPlot(p);
    check(`${scheme}/${lang}/${width}×${height}${query}/${card}: labels are present and the strip plot under the stage has readable height`, q.labels.length >= (card === 'hopf-fiber-lift' ? 5 : 2) && readablePlot(plot), JSON.stringify(plot));
  }
  await p.context().close();
}
// 1440 × 900 桌面：双语、双配色的独立页面，开页时与每张卡之后都必须是标准三栏实验室。
for (scheme of ['dark', 'light']) for (const lang of ['zh', 'en']) {
  const p = await T.open(BOOK, ID, `?lang=${lang}`, { viewport: { width: 1440, height: 900 }, locale: lang === 'zh' ? 'zh-CN' : 'en-US', reducedMotion: 'reduce' }); await settle(p);
  const opened = await desktopLab(p), issues = [];
  check(`desktop ${scheme}/${lang}/1440×900: standard three-column lab (deck | stage over strip | readouts and evidence)`, opened.length === 0, opened.slice(0, 4).join(' | '));
  for (const card of CARDS) { await pick(card, p); issues.push(...(await desktopLab(p)).map(x => `${card}: ${x}`)); }
  check(`desktop ${scheme}/${lang}/1440×900: the three columns hold after every card`, issues.length === 0, issues.slice(0, 4).join(' | '));
  await p.context().close();
}
// 显式逐卡引用，不通过章节扫描获取参数。书内引用卡按标准版式只留舞台、导览与时间轴：曲线条有意隐藏。
for (const lang of ['zh', 'en']) for (const [width, height] of [[820, 520], [820, 640], [375, 667]]) for (const card of CARDS) {
  const p = await T.open(BOOK, ID, `?embed=1&lang=${lang}&preset=${card}`, { viewport: { width, height }, reducedMotion: 'reduce' }); await settle(p);
  const v = await stageView(p, '#stage', true), q = await state(p);
  check(`figure ${lang}/${width}×${height}/${card}: correct paused scene in an unclipped frame`, q.scene === card && q.t === 1 && !q.playing && !v.layout.length && !v.hud.length && await overflowX(p) <= 0, [...v.layout, ...v.hud].slice(0, 3).join(' | '));
  const cited = await p.evaluate(() => { const strip = document.querySelector('.center .strip'), stage = document.querySelector('.center #stage'); return { figure: document.documentElement.dataset.figure === '1', strip: !!strip && getComputedStyle(strip).display === 'none' && !strip.getClientRects().length, inStage: stage ? stage.querySelectorAll('#plot, .math-panel').length : -1 }; });
  check(`figure ${lang}/${width}×${height}/${card}: the strip is left out and the stage holds no plot`, cited.figure && cited.strip && cited.inStage === 0, JSON.stringify(cited));
  await p.context().close();
}
await T.goto(BOOK, ID, '?lang=en'); await settle(page); const pixels = await solidPixels(page);
check('the magenta cone and cyan tetrahedron produce a shaded WebGL image', pixels.share > 0.12 && pixels.spread > 0.04);
check('zero browser errors', T.errors.length === 0, T.errors.slice(0, 6).join(' | '));
check('zero quality warnings', T.warnings.length === 0, T.warnings.map(w => w.name).join(' | '));
await T.finish();
