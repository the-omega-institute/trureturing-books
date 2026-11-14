// Exhaustive transitions owned by self-referential-table.test.mjs; every press still redraws.
import { settle } from '../../../../tools/node/viz-testkit.mjs';

export async function transitionChecks(T, page) {
const { check } = T;
// Every transition the controls offer: 3 sizes × 4 scenes × 6 cards, with a selection on each side of each card size
// (coordinates 0, 3, 4, 7, 8, 11 that exist in the source table: valid or not in rows and columns independently).
// Expected: a card that names its own cell selects it; any other card keeps the selection when it still fits and
// otherwise moves each coordinate to the last row or column; then Read reads exactly that cell.
const CARD_N = { reset: 8, expand_table: 8, full: 8, dual_read: 4, heal: 8, orthogonal_zero: 8 }, CARD_CELL = { dual_read: [0, 3], heal: [1, 4] };
// The same transitions in chunks of one size × scene × card, with the page settling in between: every press redraws the
// lit solid, and some eight thousand WebGL frames in one synchronous evaluate exhaust the renderer.
const sweep = await (async () => {
  const dom = await page.evaluate(() => ({
    sizes: [...document.querySelectorAll('#sizeChips [data-size]')].map((b) => +b.dataset.size),
    scenes: [...document.querySelectorAll('#sceneChips [data-scene]')].map((b) => b.dataset.scene),
    cards: [...document.querySelectorAll('#presets [data-preset]')].map((b) => b.dataset.preset)
  }));
  const rows = [], errs = [];
  for (const n of dom.sizes) for (const sc of dom.scenes) for (const id of dom.cards) {
    const part = await page.evaluate(([n, sc, id]) => {
      const dbg = window.TABLE_DEBUG, kit = window.TRV.kit, q = (sel) => document.querySelector(sel), errs = [];
      const onErr = (e) => errs.push(String(e.message || e)); window.addEventListener('error', onErr);
      const press = (sel) => { q(sel).click(); kit.flush(); };
      const cell = (i, j) => { const p = dbg.point.cell(i, j); q('#cv').dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: p.x, clientY: p.y })); kit.flush(); };
      const rows = [];
      for (const i of [0, 3, 4, 7, 8, 11].filter((x) => x < n)) for (const j of [0, 3, 4, 7, 8, 11].filter((x) => x < n)) {
        const row = { n, sc, id, i, j };
        try {
          press(`[data-size="${n}"]`); press('[data-scene="read"]'); cell(i, j);
          const a = dbg.state; row.before = [a.N, a.i, a.j];
          press(`[data-scene="${sc}"]`); press(`[data-preset="${id}"]`);
          const b = dbg.state;
          row.after = { N: b.N, r: b.r, i: b.i, j: b.j, kicks: b.kicks, rankMax: +q('#rank').max, rankVal: +q('#rank').value, chip: +q('#sizeChips [aria-pressed="true"]').dataset.size };
          press('[data-scene="read"]');
          const c = dbg.state, p = dbg.products(), T = dbg.T();
          row.read = { N: c.N, i: c.i, j: c.j, len: p.length, partial: c.partial, Tij: T[c.i] ? T[c.i][c.j] : NaN };
        } catch (e) { row.error = String((e && e.message) || e); }
        rows.push(row);
      }
      window.removeEventListener('error', onErr);
      return { rows, errs };
    }, [n, sc, id]);
    rows.push(...part.rows); errs.push(...part.errs);
    await settle(page);
  }
  return { rows, errs, sizes: dom.sizes, scenes: dom.scenes, cards: dom.cards };
})();
check('transition domain from the controls: sizes 4/8/12, four scenes, six cards (card sizes 4 and 8)', sweep.sizes.join() === '4,8,12' && sweep.scenes.length === 4 && sweep.cards.length === 6 && sweep.cards.every((c) => CARD_N[c]));
let transOk = true, keptOk = true, movedOk = true, nKept = 0, nMoved = 0;
const transDetail = [];
for (const u of sweep.rows) {
  const tag = `${u.n}/${u.sc}/${u.id}/(${u.i + 1}, ${u.j + 1})`;
  if (u.error || !u.after || !u.read) { transOk = false; transDetail.push(`${tag}: ${u.error}`); continue; }
  const N2 = CARD_N[u.id], want = CARD_CELL[u.id] || [Math.min(u.i, N2 - 1), Math.min(u.j, N2 - 1)], a = u.after;
  const valid = a.N === N2 && a.i === want[0] && a.j === want[1] && a.i < a.N && a.j < a.N && a.r >= 1 && a.r <= a.N && a.rankMax === a.N && a.rankVal === a.r && a.chip === a.N && a.kicks.every((k) => k.i < a.N && k.j < a.N);
  const read = u.read.N === N2 && u.read.i === want[0] && u.read.j === want[1] && u.read.len === N2 && Math.abs(u.read.partial - u.read.Tij) < 1e-12;
  if (u.before.join() !== [u.n, u.i, u.j].join() || !valid || !read) { transOk = false; transDetail.push(`${tag}: ${JSON.stringify([u.before, a.N, a.i, a.j, u.read])}`); }
  if (!CARD_CELL[u.id]) {
    if (u.i < N2 && u.j < N2) { nKept++; if (a.i !== u.i || a.j !== u.j) keptOk = false; } else { nMoved++; if (!(a.i < N2 && a.j < N2)) movedOk = false; }
  }
}
check(`every size × scene × card × selection transition leaves a valid selection, and Read reads it (${sweep.rows.length} transitions)`, transOk && sweep.rows.length === 4 * 6 * (4 + 16 + 36) && sweep.errs.length === 0, `${transDetail.slice(0, 3).join(' | ')} ${sweep.errs.slice(0, 2).join(' | ')}`);
check('a selection that still fits the card’s table is kept as it was', keptOk && nKept > 0, `${nKept} kept`);
check('a selection outside the card’s table is moved inside it (row and column independently)', movedOk && nMoved > 0, `${nMoved} moved`);
}
