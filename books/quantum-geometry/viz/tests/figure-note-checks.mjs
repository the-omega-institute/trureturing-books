#!/usr/bin/env node
// Every card of these pages, cited in a narrow (334 × 500) frame, must keep its whole explanation readable. Since template
// 0.9.1 the shared theme (theme/viz/theme.css, "cited figure") bounds .tour .tour-note of a cited card to two lines and lets
// the reader scroll it, up and down only, inside the bar: the whole note stays in the bar and in the accessibility tree.
// So the note may scroll vertically; nothing else may. For each card in each language this checks that
//   - the bar holds exactly one note and its text is the card's whole note (#presetNote), not a shortened copy;
//   - the note is bounded to the theme's two lines, sits inside the bar, and no character of it is cut at the side;
//   - its first line is in sight on arrival (a short note: all of it), and a real mouse wheel over the note scrolls it to
//     its last line, which is then in sight;
//   - the stage, the title row, the note, the bar and the rail keep their regions, before and after the wheel, and the
//     wheel moves nothing else: the frame, the body and every other box neither scroll nor clip.
import { settle, until } from '../../../../tools/node/viz-testkit.mjs';

const pages = [
  ['chsh-dial', 'collinear'],
  ['dream-decoherence-unpinning', 'waking'],
  ['self-referential-table', 'reset'],
  ['forgetting-rebirth-attractor', 'staircase'],
  ['pointer-ontology-deref', 'qram_tree'],
  ['entanglement-entropy-complexity', 'pythagoras'],
  ['eth-horizon-crossover', 'human'],
  ['sphere-escape', 'diagonal'],
  ['timeless-causal-crystal', 'window'],
  ['golden-cut-observer', 'cut'],
  ['fixed-point-convergence', 'golden'],
  ['gram-causal-elliptope', 'elliptope'],
  ['spherical-degeneracy-radar', 'meridian'],
  ['pisot-clifford-rauzy-sandtable', 'zeckendorf']
];

/** Read in the page: the note of the current card, its glyphs, and the regions of the cited frame. */
const noteFrame = () => {
  const de = document.documentElement, body = document.body, bar = document.querySelector('.tour');
  const notes = bar ? bar.querySelectorAll('.tour-note') : [], note = notes[0] || null;
  const pressed = document.querySelector('[data-preset][aria-pressed="true"]'), card = document.getElementById('presetNote');
  const rect = (el) => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; };
  const stage = document.querySelector('.stage'), rail = document.querySelector('footer.rail'), title = bar && bar.querySelector('.what b');
  const name = (e) => (e.id ? `#${e.id}` : `${e.tagName.toLowerCase()}${typeof e.className === 'string' && e.className ? '.' + e.className.trim().split(/\s+/).join('.') : ''}`);
  // boxes a reader could scroll (overflow auto/scroll with more than they show), in either direction: only the note, and
  // only up and down, is allowed to
  const scrollers = [...document.querySelectorAll('body *')].filter((e) => {
    const s = getComputedStyle(e), sx = /auto|scroll/.test(s.overflowX), sy = /auto|scroll/.test(s.overflowY);
    return (sx && e.scrollWidth > e.clientWidth + 1) || (sy && e !== note && e.scrollHeight > e.clientHeight + 1);
  }).map(name);
  // the frame's own regions must not cut what they hold either (overflow hidden or clip with more than they show)
  const regions = [de, body, document.querySelector('.app.lab'), document.querySelector('.lab .center'), bar, rail].filter(Boolean);
  const cut = regions.filter((e) => {
    const s = getComputedStyle(e);
    return (s.overflowX !== 'visible' && e.scrollWidth > e.clientWidth + 1) || (s.overflowY !== 'visible' && e.scrollHeight > e.clientHeight + 1);
  }).map(name);
  const g = {
    notes: notes.length, card: pressed ? pressed.dataset.preset : null, text: note ? note.textContent : '', whole: card ? card.textContent : null,
    scrollY, scrollX, doc: [de.scrollWidth - de.clientWidth, de.scrollHeight - innerHeight], scrollers, cut,
    stage: stage && rect(stage), bar: bar && rect(bar), rail: rail && rect(rail), title: title && rect(title)
  };
  if (!note || !stage || !bar || !rail || !title) return g;
  // each character of the note: whether it stays inside the width of the note, and whether it is in sight (in the note's
  // scrollport and in the frame). A glyph box at line-height 1.4 stands up to a pixel over its line, so allow 2px; a line
  // hidden by the scroller is a whole line (~17px) away.
  const n = rect(note), cs = getComputedStyle(note), lh = parseFloat(cs.lineHeight), tol = 2;
  const port = { l: n.l + note.clientLeft, t: n.t + note.clientTop, r: n.l + note.clientLeft + note.clientWidth, b: n.t + note.clientTop + note.clientHeight };
  const glyphs = [], walk = document.createTreeWalker(note, NodeFilter.SHOW_TEXT);
  for (let t = walk.nextNode(); t; t = walk.nextNode()) for (const m of t.data.matchAll(/\S/gu)) {
    const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length);
    glyphs.push([...r.getClientRects()].filter((q) => q.width > 0 && q.height > 0).pop() || null);
  }
  const seen = (q) => !!q && q.top >= port.t - tol && q.bottom <= port.b + tol && q.left >= port.l - tol && q.right <= port.r + tol
    && q.top >= -tol && q.bottom <= innerHeight + tol && q.left >= -tol && q.right <= innerWidth + tol;
  const b = g.bar, s = g.stage, r = g.rail, h = g.title;
  return {
    ...g, note: n, lines: n.h / lh, cap: parseFloat(cs.maxHeight) / lh, sideways: note.scrollWidth - note.clientWidth,
    side: glyphs.filter((q) => !q || q.left < port.l - tol || q.right > port.r + tol).length, glyphs: glyphs.length,
    shown: note.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && n.w > 0 && n.h > 0,
    inBar: n.l >= b.l - 0.5 && n.r <= b.r + 0.5 && n.t >= b.t - 0.5 && n.b <= b.b + 0.5,
    order: s.b <= b.t + 1 && h.t >= b.t && h.b <= n.t + 1 && n.b <= b.b + 1 && b.b <= r.t + 1 && r.b <= innerHeight + 1,
    scrollTop: note.scrollTop, scrollMax: note.scrollHeight - note.clientHeight,
    first: seen(glyphs[0]), last: seen(glyphs[glyphs.length - 1]), all: glyphs.every(seen)
  };
};
const sameBox = (a, b) => !!a && !!b && ['l', 't', 'r', 'b'].every((k) => Math.abs(a[k] - b[k]) <= 0.5);
/** What every reading of the frame must show, at arrival and after the wheel. */
const frameFaults = (v) => {
  const f = [];
  if (!v.glyphs) return ['no note, stage, title or rail'];
  if (v.notes !== 1) f.push(`notes=${v.notes}`);
  if (v.text.trim().length <= 8 || v.text !== v.whole) f.push('text≠#presetNote');
  if (!v.shown) f.push('hidden');
  if (!(Math.abs(v.cap - 2) <= 0.05) || v.lines > 2.05 || (v.scrollMax > 0 && v.lines < 1.95)) f.push(`lines=${v.lines.toFixed(2)}/cap=${v.cap.toFixed(2)}`);
  if (v.sideways > 0 || v.side) f.push(`sideways=${v.sideways}/side=${v.side}`);
  if (!v.inBar) f.push('note out of bar');
  if (!v.order) f.push('regions');
  if (v.scrollY || v.scrollX || v.doc[0] > 0 || v.doc[1] > 0) f.push(`frame scroll ${v.scrollX},${v.scrollY} doc ${v.doc}`);
  if (v.scrollers.length) f.push(`scrolls: ${v.scrollers.slice(0, 3).join(' ')}`);
  if (v.cut.length) f.push(`cuts: ${v.cut.slice(0, 3).join(' ')}`);
  return f;
};

/** `only` ({ ids, langs }) narrows the run (used to prove the checks reject a broken note); the suites call it bare. */
export async function figureNoteChecks(T, only = {}) {
  for (const [id, first] of pages) for (const lang of ['zh', 'en']) {
    if ((only.ids && !only.ids.includes(id)) || (only.langs && !only.langs.includes(lang))) continue;
    const page = await T.open('quantum-geometry', id, `?embed=1&preset=${first}&lang=${lang}`, {
      viewport: { width: 334, height: 500 }, reducedMotion: 'reduce'
    });
    if (only.prepare) await only.prepare(page);
    await settle(page);
    const count = await page.locator('[data-preset]').count();
    for (let i = 0; i < count; i++) {
      // a new card may bring glyphs of a font face not loaded yet (superscripts in a title): read once they have arrived
      if (i) { await page.click('[data-tour="next"]'); await settle(page); await page.evaluate(() => document.fonts.ready); await settle(page); }
      const a = await page.evaluate(noteFrame);
      const at = frameFaults(a);
      if (a.glyphs && a.scrollTop !== 0) at.push(`arrives scrolled ${a.scrollTop}`);
      if (a.glyphs && !a.first) at.push('first line out of sight');
      if (a.glyphs && a.scrollMax <= 0 && !a.all) at.push('short note not all in sight');
      // a reader's wheel over the note, as far as it goes; a short note has nowhere to go and nothing else may move
      let reached = false, e = a;
      const box = a.glyphs ? await page.locator('.tour .tour-note').boundingBox() : null;
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await page.mouse.wheel(0, 4000);
        reached = await until(page, () => { const n = document.querySelector('.tour .tour-note'); return n.scrollHeight - n.clientHeight - n.scrollTop <= 1; }, undefined, 10000);
        await settle(page, 60);
        e = await page.evaluate(noteFrame);
      }
      const after = box ? frameFaults(e) : [];
      if (box) {
        if (!reached || e.scrollTop < e.scrollMax - 1) after.push(`stopped at ${e.scrollTop}/${e.scrollMax}`);
        if (!e.last) after.push('last line out of sight');
        if (e.card !== a.card || e.text !== a.text) after.push('card or note changed');
        const moved = ['stage', 'title', 'bar', 'rail'].filter((k) => !sameBox(e[k], a[k]));
        if (moved.length) after.push(`moved: ${moved.map((k) => `${k} ${a[k] && e[k] ? ['l', 't', 'r', 'b'].map((q) => +(e[k][q] - a[k][q]).toFixed(1)).join(',') : '?'}`).join(' ')}`);
      }
      const lines = a.glyphs ? `${a.lines.toFixed(2)} of ${a.cap.toFixed(2)} lines, scroll ${a.scrollMax}px` : '';
      T.check(`${id}/${a.card} (${lang}): the whole card note sits in the two-line bar with nothing cut at the side, and a wheel over it reaches its last line; only the note scrolls, up and down, and the stage, bar and rail keep their regions`,
        a.glyphs > 0 && !at.length && !after.length,
        JSON.stringify({ lines, glyphs: a.glyphs, arrival: at, wheel: after }));
    }
    await page.context().close();
  }
}
