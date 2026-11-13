#!/usr/bin/env node
// Long card explanations must remain complete and readable in a narrow cited figure (334 × 500, every card of the pages
// below, both languages). Since template 0.9.1 the shared theme bounds the note of the current card, .tour > .what >
// .tour-note, to two lines and lets the reader scroll it inside the bar. That note may scroll, and only up and down: it
// holds the card's whole text (#presetNote), stays within two lines with nothing out at the side, opens on its first
// line, and a reader's wheel over it brings every line into sight, the last one included. A note that fits needs no
// scrolling and is given none. Nothing else scrolls: not the frame, not the body, and no box anywhere in the page that a
// reader could scroll (overflow auto or scroll). None of the frame's own regions clips what it holds either: the stage
// box, the bar, the card's title and note (the note only up and down, by scrolling), and the rail. The wheel over the
// note moves none of them. What a stage draws inside its own layers (labels, canvases) is not opened up here; the
// stage's own checks look after it. kit.cards writes a new note element for every card, so each card opens at the top of
// its note.
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

/** The only box of a cited frame that may scroll (vertically): the note of the current card in the tour bar. */
const NOTE = '.tour > .what > .tour-note';

/** The cited frame as the reader sees it: the regions, the boxes that scroll or clip, and the note glyph by glyph. */
const readFrame = (sel) => {
  const root = document.documentElement, body = document.body, tour = document.querySelector('.tour'), note = document.querySelector(sel);
  const stage = document.querySelector('.stage'), heading = tour.querySelector('.what b'), rail = document.querySelector('footer.rail');
  const box = (el) => { const r = el.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; };
  const pressed = document.querySelector('[data-preset][aria-pressed="true"]');
  // the boxes that hold more than they show, in either direction: any box in the page a reader could scroll (overflow
  // auto or scroll), and the frame's own regions (stage, bar, the card's title and note, rail) whatever their overflow;
  // the note of the current card may do so only up and down. The layers a stage draws in are left to its own checks.
  const scrolls = (o) => o === 'auto' || o === 'scroll' || o === 'overlay';
  const own = new Set([stage, tour, tour.querySelector('.what'), heading, note, rail].filter(Boolean));
  const over = [...document.querySelectorAll('body *')].filter((e) => {
    const s = getComputedStyle(e);
    if (!own.has(e) && !scrolls(s.overflowX) && !scrolls(s.overflowY)) return false;
    const x = s.overflowX !== 'visible' && e.scrollWidth > e.clientWidth + 1, y = s.overflowY !== 'visible' && e.scrollHeight > e.clientHeight + 1;
    return x || (y && e !== note);
  }).map((e) => (e.id ? `#${e.id}` : [e.tagName.toLowerCase(), ...e.classList].join('.')));
  const v = {
    card: pressed ? pressed.dataset.preset : null, vh: innerHeight, stage: box(stage), bar: box(tour),
    heading: box(heading), rail: box(rail),
    frameY: root.scrollHeight - innerHeight, frameX: root.scrollWidth - root.clientWidth,
    bodyY: body.scrollHeight - body.clientHeight, bodyX: body.scrollWidth - body.clientWidth, scrollX, scrollY, over,
    notes: document.querySelectorAll('.tour-note').length, text: note ? note.textContent : '', whole: document.getElementById('presetNote').textContent
  };
  if (!note) return { ...v, note: null };
  // each character of the note: whether it stays inside the width of the note, whether all of it is in sight now (in the
  // note's scrollport and in the frame), and whether some scroll position of the note brings all of it into sight. The
  // glyph box at the note's line height stands up to a pixel over its line, so allow 2px; a line hidden by the scroller
  // is a whole line (~16px) away.
  const n = box(note), cs = getComputedStyle(note), lh = parseFloat(cs.lineHeight), tol = 2;
  const port = { l: n.l + note.clientLeft, t: n.t + note.clientTop, r: n.l + note.clientLeft + note.clientWidth, b: n.t + note.clientTop + note.clientHeight };
  const glyphs = [], walk = document.createTreeWalker(note, NodeFilter.SHOW_TEXT);
  for (let t = walk.nextNode(); t; t = walk.nextNode()) for (const m of t.data.matchAll(/\S/gu)) {
    const r = document.createRange(); r.setStart(t, m.index); r.setEnd(t, m.index + m[0].length);
    glyphs.push([...r.getClientRects()].filter((q) => q.width > 0 && q.height > 0).pop() || null);
  }
  const seen = (q) => !!q && q.top >= port.t - tol && q.bottom <= port.b + tol && q.left >= port.l - tol && q.right <= port.r + tol
    && q.top >= -tol && q.bottom <= innerHeight + tol && q.left >= -tol && q.right <= innerWidth + tol;
  const top = port.t - note.scrollTop;   // the top of the note's scrolled content, wherever the reader has scrolled it
  const reachable = (q) => !!q && q.top - top >= -tol && q.bottom - top <= note.scrollHeight + tol && q.height <= note.clientHeight + 2 * tol;
  return {
    ...v, note: n, inBar: n.l >= v.bar.l - 0.5 && n.r <= v.bar.r + 0.5 && n.t >= v.bar.t - 0.5 && n.b <= v.bar.b + 0.5,
    lines: n.h / lh, cap: parseFloat(cs.maxHeight) / lh, sideways: note.scrollWidth - note.clientWidth,
    side: glyphs.filter((q) => !q || q.left < port.l - tol || q.right > port.r + tol).length,
    lost: glyphs.filter((q) => !reachable(q)).length, glyphs: glyphs.length,
    scrollTop: note.scrollTop, scrollMax: note.scrollHeight - note.clientHeight,
    first: seen(glyphs[0]), last: seen(glyphs[glyphs.length - 1])
  };
};
const sameBox = (a, b) => ['l', 't', 'r', 'b'].every((k) => Math.abs(a[k] - b[k]) <= 0.5);
/** Stage above the bar; in the bar the card's title above its note; the bar above the rail; the rail inside the frame. */
const regions = (v) => v.stage.b <= v.bar.t + 1 && v.heading.t >= v.bar.t && v.heading.b <= v.note.t + 1 &&
  v.note.b <= v.bar.b + 1 && v.bar.b <= v.rail.t + 1 && v.rail.b <= v.vh + 1;
/** Neither the frame nor the body scrolls, the page has not moved, no box a reader could scroll holds more than it
    shows, and no region of the frame clips: only the note, up and down. */
const fixed = (v) => v.frameY <= 0 && v.frameX <= 0 && v.bodyY <= 0 && v.bodyX <= 0 && v.scrollX === 0 && v.scrollY === 0 && v.over.length === 0;

export async function figureNoteChecks(T) {
  for (const [id, first] of pages) for (const lang of ['zh', 'en']) {
    const page = await T.open('quantum-geometry', id, `?embed=1&preset=${first}&lang=${lang}`, {
      viewport: { width: 334, height: 500 }, reducedMotion: 'reduce'
    });
    await settle(page);
    const count = await page.locator('[data-preset]').count();
    for (let i = 0; i < count; i++) {
      if (i) { await page.click('[data-tour="next"]'); await settle(page); }
      const v = await page.evaluate(readFrame, NOTE);
      const name = `${id}/${v.card} (${lang}): the whole note stays in its two-line bar and scrolls only up and down, to its last line; the frame, stage, bar and rail neither scroll nor move`;
      if (!v.note) { T.check(name, false, JSON.stringify({ card: v.card, fails: ['no note of the current card in the bar'], notes: v.notes })); continue; }
      // a reader's wheel over a note that holds more than its two lines, as far as it goes
      let e = v, reached = v.scrollMax <= 0;
      if (v.scrollMax > 0) {
        await page.mouse.move(v.note.l + v.note.w / 2, v.note.t + v.note.h / 2);
        await page.mouse.wheel(0, 4000);
        reached = await until(page, (sel) => { const n = document.querySelector(sel); return !!n && n.scrollHeight - n.clientHeight - n.scrollTop <= 1; }, NOTE);
        await settle(page);
        e = await page.evaluate(readFrame, NOTE);
      }
      const fails = [], need = (flag, ok) => { if (!ok) fails.push(flag); };
      need('note', v.text.trim().length > 8 && v.sideways <= 1);
      need('whole', v.notes === 1 && v.text === v.whole && !!e.note && e.text === v.text && e.card === v.card);
      need('bound', Math.abs(v.cap - 2) <= 0.05 && v.lines <= 2.05 && (v.scrollMax <= 0 || v.lines >= 1.95));
      need('side', v.side === 0 && v.inBar && !!e.note && e.side === 0 && e.sideways <= 1 && e.inBar);
      need('first', v.scrollTop === 0 && v.first);
      need('reach', v.glyphs > 0 && v.lost === 0 && (v.scrollMax <= 0 ? v.last : reached && !!e.note && e.last && e.lost === 0 && e.scrollTop >= e.scrollMax - 1));
      need('regions', regions(v) && !!e.note && regions(e));
      need('frame', fixed(v) && fixed(e));
      need('wheel', e === v || (['stage', 'bar', 'heading', 'rail', 'note'].every((k) => e[k] && sameBox(e[k], v[k])) && e.bar.h <= v.bar.h + 0.5));
      T.check(name, fails.length === 0, JSON.stringify({
        card: v.card, fails, lines: v.lines, cap: v.cap, scrollMax: v.scrollMax, scrollTop: [v.scrollTop, e.scrollTop], reached,
        glyphs: v.glyphs, side: [v.side, e.side], sideways: [v.sideways, e.sideways], lost: [v.lost, e.lost], first: v.first, last: [v.last, e.last],
        whole: v.text === v.whole, notes: v.notes, over: [...v.over, ...e.over].slice(0, 4), frame: [v.frameY, v.frameX, v.bodyY, v.scrollY],
        bar: [v.bar.h, e.bar && e.bar.h], stageTop: [v.stage.t, e.stage && e.stage.t]
      }));
    }
    await page.context().close();
  }
}
