// The plot budget of a page: every chart it draws with kit.plot keeps the readable height it declares (kit.plot's
// g.rawIh ≥ g.minHeight, g.drawable) wherever a reader meets it. kit.plot clamps a short chart to a 1px box without
// complaint, and the DOM quality gate (stageFirstChecks) sees only the regions of elements, so a chart squeezed out of
// a cited figure passes every other check; this one reads the allocation the page asked for.
//
// Where it looks, in the order a reader meets the page:
//   - every card a chapter cites, in its language and at the height the chapter gives its frame (tbook.viz.citations),
//     on a phone (334px) and on a desktop page of the book (740px), then after each scene button and, once per language
//     and height, through every card with the tour bar's ▶;
//   - the labelled still of each cited card that PDF and EPUB print (?shot=1, 800 × 450), and the cover (?thumb=1);
//   - the whole lab through every card and scene: in a chapter's frames (320, 334 and 740 wide, 620 high), on a phone
//     (390 × 844) and on desktop screens (1440 × 900, and the short 1440 × 500 and 1081 × 500).
// A chart is counted when its canvas is laid out and visible when it is drawn (hidden strips and scenes do not count).
//
// A cited card whose figure is a 3D stage alone (a lit solid of kit.solid, a sphere of kit.stage3) draws no chart
// there: the strip of charts is not part of a figure, and in a narrow figure the tour bar takes the place of the scene
// buttons. Its owning suite names it in opts.stageOnly with a function that establishes, on the page as it stands,
// what the stage shows instead; every state of that figure then either draws charts, held to their readable height as
// everywhere, or draws none and passes that function. A card not named there still needs a chart in its figure.
//
//   import { plotBudgetChecks } from './plot-budget.mjs';
//   await plotBudgetChecks(T, 'quantum-geometry', '<id>');
//   await plotBudgetChecks(T, 'quantum-geometry', '<id>', { stageOnly: { '<card>': async (page) => ({ ok, detail }) } });
import { settle } from '../../../../tools/node/viz-testkit.mjs';
import { resolveBook, vizCitations } from '../../../../tools/node/viz-common.mjs';

const FIGURE_WIDTHS = [334, 740];
const STILL = { width: 800, height: 450 };
const LABS = [
  { query: '?embed=1', lang: 'zh', width: 334, height: 620 }, { query: '?embed=1', lang: 'en', width: 334, height: 620 },
  { query: '?embed=1', lang: 'zh', width: 320, height: 620 }, { query: '?embed=1', lang: 'en', width: 740, height: 620 },
  { query: '', lang: 'zh', width: 390, height: 844 }, { query: '', lang: 'en', width: 1440, height: 900 },
  { query: '', lang: 'zh', width: 1440, height: 500 }, { query: '', lang: 'en', width: 1081, height: 500 }
];
const locale = (lang) => (lang === 'zh' ? 'zh-CN' : 'en-US');
const SCENES = '.stage > .hud-tr :is(button, [role="button"])';

/** Draw every painter once (kit.flush) and report each kit.plot chart drawn on a visible canvas. */
const charts = (page) => page.evaluate(() => {
  const kit = window.TRV && window.TRV.kit, out = [];
  if (!kit || !kit.plot) return out;
  const plot = kit.plot;
  kit.plot = function (cv, o) {
    const g = plot.call(this, cv, o), cs = getComputedStyle(cv);
    if (cv.clientWidth > 0 && cv.clientHeight > 0 && !cv.hidden && cs.visibility !== 'hidden' && cv.getClientRects().length) {
      // a stage that kit.plot grew (--plot-min-height) and the part of its box the canvas does not get (its border)
      const st = cv.closest('.stage'), budget = st ? parseFloat(st.style.getPropertyValue('--plot-min-height')) || 0 : 0;
      const box = st ? st.getBoundingClientRect().height : 0;
      out.push({ canvas: cv.id || cv.className || 'canvas', H: g.H, top: Math.round(g.pt * 10) / 10, bottom: Math.round(g.pb * 10) / 10,
        rawIh: Math.round(g.rawIh * 10) / 10, minHeight: g.minHeight, drawable: g.drawable,
        grown: !!budget && Math.abs(box - budget) < 0.6, inset: st ? Math.round((box - cv.clientHeight) * 10) / 10 : 0 });
    }
    return g;
  };
  try { kit.flush(); } finally { kit.plot = plot; }
  return out;
});

/**
 * Run the plot budget over the reader contexts above; one check per cited card, per tour, for the stills and cover,
 * and per lab viewport, then one for the whole budget. Returns { contexts, charts, short } for a summary.
 * opts.stageOnly { <card>: (page) => Promise<{ ok, detail }> }: cited cards whose figure is a 3D stage alone (above).
 */
export async function plotBudgetChecks(T, slug, id, opts = {}) {
  const { check } = T, total = { contexts: 0, charts: 0, short: 0 };
  const cardIds = (page) => page.$$eval('[data-preset]', (els) => els.map((e) => e.dataset.preset));
  const where = (page) => page.evaluate(() => ({
    card: (document.querySelector('[data-preset][aria-pressed="true"]') || {}).dataset?.preset || null,
    scene: (document.querySelector('.stage > .hud-tr [aria-pressed="true"]') || {}).textContent?.trim() || null
  }));
  // measure the page as it is now; `fails` collects the charts below their readable height, with where they were
  const measure = async (page, tag, group) => {
    await settle(page);
    const got = await charts(page), at = await where(page);
    total.contexts++; total.charts += got.length; group.charts += got.length;
    for (const c of got.filter((x) => !x.drawable)) {
      total.short++;
      // the stage stands at the height kit.plot published for its charts, and the canvas is short by about the stage's
      // own border: the budget was set for the canvas but applied to the stage's border box (theme/viz/kit.js)
      const inset = c.grown && c.inset > 0 && c.minHeight - c.rawIh <= c.inset + 0.5 ? ` (the stage is at its published plot budget; its ${c.inset}px border is not in the canvas)` : '';
      group.fails.push(`${tag}${at.card ? ` card ${at.card}` : ''}${at.scene ? ` scene ${at.scene}` : ''}: #${c.canvas} H ${c.H}, pads ${c.top}/${c.bottom} leave ${c.rawIh}px < ${c.minHeight}px${inset}`);
    }
    // a card named in opts.stageOnly: a state that draws no chart must show its stage, as its suite establishes
    if (group.stage) {
      const place = `${tag}${at.card ? ` card ${at.card}` : ''}${at.scene ? ` scene ${at.scene}` : ''}`;
      group.states.push(got.length ? { place, charts: got.length } : { place, charts: 0, ...(await group.stage(page)) });
    }
  };
  const report = (name, group) => check(`plot budget: ${name}: every chart keeps its readable height`, group.charts > 0 && group.fails.length === 0,
    group.charts ? `${group.fails.length} of the charts drawn fall short — ${group.fails.slice(0, 4).join(' | ')}` : 'no chart drawn with kit.plot');
  const reportStage = (name, group) => {
    const bare = group.states.filter((s) => !s.charts), bad = bare.filter((s) => !s.ok);
    check(`plot budget: ${name}: each state without a chart shows its 3D stage (${bare.length} of ${group.states.length}), every chart drawn keeps its readable height`,
      group.states.length > 0 && bad.length === 0 && group.fails.length === 0,
      [...bad.slice(0, 3).map((s) => `${s.place}: ${s.detail}`), ...group.fails.slice(0, 3)].join(' | ') || 'no state measured');
  };
  const scenes = async (page, tag, group) => {
    const n = await page.locator(SCENES).count();
    for (let i = 0; i < n; i++) {
      const b = page.locator(SCENES).nth(i);
      if (!(await b.isVisible()) || !(await b.isEnabled())) continue;
      await b.click(); await measure(page, tag, group);
    }
  };
  const lab = await T.open(slug, id, '?lang=zh');
  const cards = await cardIds(lab);
  await lab.context().close();

  // the cited figures
  const seen = new Set(), cited = [];
  for (const c of vizCitations(resolveBook(slug), id)) {
    const key = `${c.lang}.${c.preset}.${c.height}`;
    if (c.preset && cards.includes(c.preset) && !seen.has(key)) { seen.add(key); cited.push(c); }
  }
  if (!cited.length) for (const lang of ['zh', 'en']) cited.push({ lang, preset: cards[Math.min(1, cards.length - 1)], height: 500 });
  const toured = new Set();
  for (const c of cited) {
    const page = await T.open(slug, id, `?embed=1&lang=${c.lang}&preset=${c.preset}`, { viewport: { width: FIGURE_WIDTHS[0], height: c.height }, locale: locale(c.lang) });
    const stage = opts.stageOnly && Object.prototype.hasOwnProperty.call(opts.stageOnly, c.preset) ? opts.stageOnly[c.preset] : null;
    const group = { charts: 0, fails: [], stage, states: [] }, tag = (w) => `${c.lang} ${w} × ${c.height}`;
    for (const w of [...FIGURE_WIDTHS, FIGURE_WIDTHS[0]]) { await page.setViewportSize({ width: w, height: c.height }); await measure(page, tag(w), group); }
    await scenes(page, tag(FIGURE_WIDTHS[0]), group);
    (stage ? reportStage : report)(`cited figure (${c.lang}, ${c.preset}, ${FIGURE_WIDTHS.join(' and ')} × ${c.height}, then each scene)`, group);
    if (!toured.has(`${c.lang}.${c.height}`)) {
      toured.add(`${c.lang}.${c.height}`);
      const tour = { charts: 0, fails: [] };
      for (let i = 0; i < cards.length; i++) {
        const next = page.locator('.tour [data-tour="next"]');
        if (!(await next.isVisible()) || !(await next.isEnabled())) break;
        await next.click(); await measure(page, `${tag(FIGURE_WIDTHS[0])} ▶`, tour);
      }
      report(`cited figure (${c.lang}, ${FIGURE_WIDTHS[0]} × ${c.height}), ▶ through every card`, tour);
    }
    await page.context().close();
  }

  // the labelled stills of the cited cards, and the cover
  for (const lang of ['zh', 'en']) {
    const group = { charts: 0, fails: [] };
    for (const preset of [...new Set(cited.filter((c) => c.lang === lang).map((c) => c.preset))]) {
      const page = await T.open(slug, id, `?shot=1&lang=${lang}&preset=${preset}`, { viewport: STILL, locale: locale(lang), reducedMotion: 'reduce' });
      await measure(page, `still ${lang} ${preset}`, group);
      await page.context().close();
    }
    if (group.charts || cited.some((c) => c.lang === lang)) report(`still for PDF/EPUB (${lang}, ${STILL.width} × ${STILL.height}, every cited card)`, group);
  }
  {
    const page = await T.open(slug, id, '?thumb=1&lang=zh', { viewport: { width: 1280, height: 720 }, reducedMotion: 'reduce' });
    await page.evaluate(async () => { if (typeof window.TRV_THUMB === 'function') await window.TRV_THUMB(); });
    const group = { charts: 0, fails: [] };
    await measure(page, 'cover', group);
    if (group.charts) report('cover (1280 × 720)', group);
    await page.context().close();
  }

  // the whole lab, through every card and scene
  for (const v of LABS) {
    const page = await T.open(slug, id, `${v.query ? `${v.query}&` : '?'}lang=${v.lang}`, { viewport: { width: v.width, height: v.height }, locale: locale(v.lang) });
    const group = { charts: 0, fails: [] }, tag = `lab ${v.query ? 'frame ' : ''}${v.lang} ${v.width} × ${v.height}`;
    await measure(page, tag, group);
    for (const c of cards) { await page.click(`[data-preset="${c}"]`); await measure(page, tag, group); }
    await scenes(page, tag, group);
    report(`whole lab (${v.query ? 'in a chapter frame, ' : ''}${v.lang}, ${v.width} × ${v.height}, every card and scene)`, group);
    await page.context().close();
  }

  check(`plot budget: ${total.charts} charts in ${total.contexts} reader contexts, ${total.short} below their readable height`, total.charts > 0 && total.short === 0);
  return total;
}
