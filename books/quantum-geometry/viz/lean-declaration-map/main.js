/* LEAN//MAP · Lean 声明地图: every frozen declaration the book cites, laid out by chapter.
     stage   one column per unit of the book in the reading order of SUMMARY.md (prelude, chapters 1–39 with their
             sections at any depth, the coda with its sections, the appendices with theirs; Appendix C indexes
             everything and has no column). Names under the columns are thinned by measured width (axisNames); every
             column can still be chosen, and the chosen one shows its full number in cyan. Each cell is one
             entry of trureturing.lock.json, stacked in the column of the chapter whose Chinese text cites it first:
             theorems (green) below definitions (grey), environment citations (filled) below inline-only ones (hollow).
     rail    the reading position: the cells of the chapters read so far have landed, the rest are outlines.
     look back from a chapter: cyan lines from the foot of that column to every cell it cites.
     choose a cell: amber lines from it to every other chapter that cites it.
   The data come from data.generated.json, written by gen-data.py from the lock and the chapters (never by hand, never
   committed); the page fetches it together with the publication lock before it builds anything.
   Colours: green = the lock's kind is `theorem`, grey = definition, cyan = cited by the chosen chapter,
   amber = the chosen declaration and the reading position. Read-only probe for the browser suite: LEANMAP_DEBUG. */
(async () => {
  'use strict';
  const { kit, L } = TRV, P = TRV.palette;
  const $ = (id) => document.getElementById(id);

  // The clock, its keys, autoplay and the probe exist only once both files are in: kit.pending lets kit.ready() (the
  // suites' settle()) wait for them. Both are fetched at once, so the page starts no later than with the lock alone.
  const load = (url, what) => fetch(url, { cache: 'no-store' }).then((r) => { if (!r.ok) throw new Error(`Cannot load ${what}: ${r.status}`); return r.json(); });
  const [DATA, PIN] = await kit.pending(Promise.all([load('data.generated.json', 'declaration map'), load('../assets/trureturing.json', 'publication lock')]));

  /* ---------- the declarations ---------- */
  const IDX = DATA.index;                                               // the unit of Appendix C
  const COLS = DATA.units.map((u, i) => i).filter((i) => i !== IDX);    // units with a column, in reading order
  const NC = COLS.length, colOf = {};
  $('src').max = String(NC - 1);
  COLS.forEach((u, c) => { colOf[u] = c; });
  const D = DATA.decls.map(([gid, home, cites, serial], i) => {
    const declaration = PIN.declarations[gid];
    if (!declaration) throw new Error(`Declaration missing from publication lock: ${gid}`);
    const kind = DATA.kinds.indexOf(declaration.kind), line = declaration.line || 0;
    // the source file is the module the lock records: a declaration name may itself contain dots (Latitude.latitude_dot)
    const module = declaration.module, short = gid.slice(gid.lastIndexOf('.') + 1);
    if (!module || !gid.startsWith(`${module}.`)) throw new Error(`Declaration module missing from publication lock: ${gid}`);
    return { i, gid, module, short, kind, line, home, col: colOf[home], cites, serial, env: cites.some((c) => c[1] === 'e') };
  });
  const BY = Object.fromEntries(D.map((d) => [d.gid, d]));
  const KIND_NAME = [['定理 theorem', 'theorem'], ['定义 def', 'definition (def)'], ['归纳类型 inductive', 'inductive type']];
  const unitName = (u) => L(DATA.units[u].n[0], DATA.units[u].n[1]);
  const unitShort = (u) => L(DATA.units[u].s[0], DATA.units[u].s[1]);
  const FILTERS = { all: () => true, theorem: (d) => d.kind === 0, inline: (d) => !d.env };
  const ch = (n) => DATA.units.findIndex((u) => u.file.startsWith(`ch${String(n).padStart(2, '0')}-`));

  /** Stack heights of the visible cells: gid → slot inside its column (theorems first, filled first, lock order). */
  function layout(filter) {
    const f = FILTERS[filter], cols = Array.from({ length: NC }, () => []);
    for (const d of D) if (f(d)) cols[d.col].push(d);
    const pos = {};
    for (const list of cols) {
      list.sort((a, b) => (a.kind > 0) - (b.kind > 0) || (b.env - a.env) || a.i - b.i);
      list.forEach((d, k) => { pos[d.gid] = k; });
    }
    return { pos, cols, max: Math.max(...cols.map((l) => l.length)) };
  }
  const MAXALL = layout('all').max;
  /** Declarations a unit cites, every citation or environments only. */
  const citedBy = (u, mode) => (u == null ? [] : D.filter((d) => d.cites.some((c) => c[0] === u && (mode === 'all' || c[1] === 'e'))));

  /* ---------- state ---------- */
  const S = { filter: 'all', src: null, mode: 'all', sel: null, q: '' };
  let lay = layout('all'), from = null, mix = 1;                         // from: the layout a transition starts from
  const metIn = (d, t) => d.col < Math.floor(t) || (d.col === Math.floor(t) && lay.pos[d.gid] < (t - Math.floor(t)) * lay.cols[d.col].length);
  const visible = () => D.filter(FILTERS[S.filter]);
  // S.src is a column; the unit it stands for skips Appendix C, which has no column
  const focus = () => new Set(citedBy(S.src == null ? null : COLS[S.src], S.mode).map((d) => d.gid));
  /** Visible declarations whose GID (module path and name) contains the search text, ignoring case. */
  const found = () => { const q = S.q.trim().toLowerCase(); return q ? visible().filter((d) => d.gid.toLowerCase().includes(q)) : null; };
  const metCount = (t) => visible().filter((d) => metIn(d, t)).length;

  /* ---------- axis names ---------- */
  // How strongly a column claims its name under an axis (lower first; null: only when chosen). Both ends; then the chosen
  // column; the heads of the last group (the coda and the first appendix); chapters 10, 20, 30, …, then 5, 15, 25, …,
  // then the other chapters and appendices. A section (any depth: 30.4, 39.5.7, 40.1, A.1) is named only when chosen.
  const KIND_OF = COLS.map((u) => { const s = DATA.units[u].s[0]; return /^\d+$/.test(s) ? 'chapter' : /^[A-Z]$/.test(s) ? 'appendix' : s.includes('.') ? 'section' : 'coda'; });
  const FIRST_APPX = KIND_OF.indexOf('appendix');
  const NAME_RANK = COLS.map((u, c) => {
    if (c === 0 || c === NC - 1) return 0;
    if (KIND_OF[c] === 'coda' || c === FIRST_APPX) return 2;
    if (KIND_OF[c] === 'chapter') { const n = +DATA.units[u].s[0]; return n % 10 === 0 ? 3 : n % 5 === 0 ? 4 : 5; }
    return KIND_OF[c] === 'appendix' ? 5 : null;
  });
  /** The names drawn under an axis, in the font already set on ctx: columns claim in rank order, then reading order; a
      name is kept only where its measured width stays 2 px clear of every name kept before it and inside [0, W] (a name
      at an edge moves inward, still over its own column). The chosen column always shows its full name: it may move
      sideways, its column's centre at least 1 px inside it, to clear both ends; if even that fails it stays on its
      column and an end it would touch gives way. x(c) is the column's centre, chosen the chosen column or null. */
  function axisNames(ctx, x, text, chosen, W) {
    let kept = [];
    const clear = (at, w) => !kept.some((k) => at - w / 2 < k.r + 2 && at + w / 2 > k.l - 2);
    const put = (c, lab, at, w) => kept.push({ c, text: lab, x: at, l: at - w / 2, r: at + w / 2 });
    COLS.map((u, c) => [c === chosen && NAME_RANK[c] !== 0 ? 1 : NAME_RANK[c], c]).filter(([r]) => r != null).sort((a, b) => a[0] - b[0] || a[1] - b[1]).forEach(([, c]) => {
      const lab = text(c), w = ctx.measureText(lab).width, home = Math.min(Math.max(x(c), w / 2), W - w / 2);
      if (c !== chosen) { if (clear(home, w)) put(c, lab, home, w); return; }
      const lo = Math.max(w / 2, x(c) - w / 2 + 1), hi = Math.min(W - w / 2, x(c) + w / 2 - 1);
      const spot = [home, ...kept.flatMap((k) => [k.r + 2.01 + w / 2, k.l - 2.01 - w / 2])]
        .filter((at) => at >= lo && at <= hi && clear(at, w)).sort((a, b) => Math.abs(a - home) - Math.abs(b - home))[0];
      if (spot == null) kept = kept.filter((k) => !(home - w / 2 < k.r + 2 && home + w / 2 > k.l - 2));
      put(c, lab, spot == null ? home : spot, w);
    });
    return kept;
  }

  /* ---------- stage ---------- */
  const legendH = () => { const el = document.querySelector('.hud-bl'); return el && getComputedStyle(el).display !== 'none' ? el.offsetHeight + 6 : 0; };
  let view = null, plotView = null;
  function drawStage() {
    const thumb = TRV.thumbMode, cv = $('cv'), W = cv.clientWidth, narrow = W < 560;
    const top = Math.max(MAXALL + 4, 10);
    const g = kit.plot(cv, { x: [-0.6, NC - 0.4], y: [0, top], pad: thumb ? [18, 18, 26, 34] : [14, 14, narrow ? 64 : 58, 44 + legendH()] });
    view = g;
    const ctx = g.ctx, t = clock.t, cw = g.X(1) - g.X(0), rowH = g.Y(0) - g.Y(1);
    const cellW = Math.max(3, Math.min(cw * 0.78, 30)), cellH = Math.max(2, rowH * 0.8);
    const foc = focus(), hasFocus = S.src != null, hits = found(), hitSet = hits && new Set(hits.map((d) => d.gid));

    // part bands and their names
    const partOf = (c) => DATA.units[COLS[c]].part, bands = [];
    let c0 = 0;
    for (let c = 1; c <= NC; c++) {
      if (c < NC && partOf(c) === partOf(c0)) continue;
      const p = partOf(c0), x0 = g.X(c0 - 0.5), x1 = g.X(c - 0.5);
      if (p >= 0 && p % 2 === 0) { ctx.fillStyle = P.panelEdge; ctx.globalAlpha = 0.35; ctx.fillRect(x0, g.pt, x1 - x0, g.ih + 2); ctx.globalAlpha = 1; }
      if (p >= 0) bands.push({ p, x0, x1 });
      c0 = c;
    }
    if (!thumb) {
      // a part's name: the full name if it fits its band, the coda-and-appendices group then tries compact forms, else
      // the roman numeral; in reading order a name moves right, its centre still inside its own band, to keep 2 px clear
      // of the name before it, and is left out only when even that cannot keep it clear
      ctx.font = `${narrow ? 9.5 : 10.5}px ${TRV.fonts.body}`; ctx.fillStyle = P.dim; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      let right = -Infinity;
      for (const { p, x0, x1 } of bands) {
        const name = L(DATA.parts[p][0], DATA.parts[p][1]), roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', '·'][p] || '';
        // the last band has nothing after it: its name may reach on to the right edge of the stage
        const fits = (str) => ctx.measureText(str).width < (p === bands[bands.length - 1].p ? W - 2 : x1 - 2) - (x0 + 2);
        const compact = /^Coda/.test(DATA.parts[p][1]) ? L(['终章附录', '终+'], ['Coda & App.', 'Coda+']) : [];
        const lab = [name, ...compact].find(fits) || roman, w = ctx.measureText(lab).width;
        const x = Math.min(Math.max((x0 + x1) / 2, right + 2 + w / 2), W - w / 2);
        if (x > x1 || x < x0) continue;
        ctx.fillText(lab, x, g.pt + g.ih + 22); right = x + w / 2;
      }
      // column names: every column keeps its place and can be chosen, but a name is drawn only where its measured width
      // keeps 2 px clear of every name already drawn; the chosen column shows its full number in cyan (axisNames)
      ctx.font = `${narrow ? 9 : 10.5}px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (const { c, text, x } of axisNames(ctx, (c) => g.X(c), (c) => unitShort(COLS[c]), S.src, W)) {
        ctx.fillStyle = c === S.src ? P.cyan : c < Math.floor(t) || (c === Math.floor(t) && t % 1 > 0) ? P.ink : P.dim;
        ctx.fillText(text, x, g.pt + g.ih + 6);
      }
      // what a column counts: each declaration once, in the chapter that cites it first
      ctx.font = `${narrow ? 9.5 : 10.5}px ${TRV.fonts.body}`; ctx.textAlign = 'left'; ctx.fillStyle = P.dim;
      const what = [L('每格一条声明，落在第一次引用它的那一章', 'one cell per declaration, in the chapter that first cites it'), L('后面的章再引用不再计', 'later citations add none')];
      (narrow ? what : [what.join(L('；', '; '))]).forEach((line, i) => ctx.fillText(line, g.pl + 6, g.pt + 6 + i * 13));
    }

    // the reading position
    const xr = g.X(Math.min(t, NC) - 0.5);
    if (t < NC - 1e-9) { ctx.strokeStyle = P.amber; ctx.globalAlpha = 0.85; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(xr, g.pt); ctx.lineTo(xr, g.pt + g.ih); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }

    // cells
    const vis = FILTERS[S.filter], wasVis = from ? FILTERS[from.filter] : vis;
    const cellBox = {};
    for (const d of D) {
      const on = vis(d), was = wasVis(d);
      if (!on && !was) continue;
      const kNew = on ? lay.pos[d.gid] : (from.lay.pos[d.gid] ?? 0), kOld = from && was ? from.lay.pos[d.gid] : kNew;
      const k = kOld + (kNew - kOld) * mix, a = (was ? 1 : 0) + ((on ? 1 : 0) - (was ? 1 : 0)) * mix;
      if (a <= 0.01) continue;
      const cx = g.X(d.col), cy = g.Y(k + 0.5), x = cx - cellW / 2, y = cy - cellH / 2;
      cellBox[d.gid] = [cx, cy];
      const met = !on || metIn(d, t), dim = (hasFocus && !foc.has(d.gid)) || (hitSet && !hitSet.has(d.gid));
      const col = d.kind === 0 ? P.ok : P.dim;
      ctx.globalAlpha = a * (met ? (dim ? 0.22 : 1) : 0.28);
      if (met && d.env) { ctx.fillStyle = col; ctx.fillRect(x, y, cellW, cellH); }
      else { ctx.strokeStyle = col; ctx.lineWidth = thumb ? 2 : 1.2; ctx.strokeRect(x + 0.6, y + 0.6, cellW - 1.2, cellH - 1.2); }
      ctx.globalAlpha = 1;
    }

    // cyan: what the chosen chapter cites (from the foot of its column)
    const arcs = { cyan: [], amber: [] };   // what was drawn, for the probe
    const curve = (x1, y1, x2, y2, color, width, alpha) => {
      const lift = Math.min(g.ih * 0.9, 30 + Math.abs(x2 - x1) * 0.45);
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.globalAlpha = alpha; ctx.beginPath(); ctx.moveTo(x1, y1);
      ctx.bezierCurveTo(x1, Math.min(y1, y2) - lift, x2, Math.min(y1, y2) - lift, x2, y2); ctx.stroke(); ctx.globalAlpha = 1;
    };
    if (hasFocus && Math.floor(t) > S.src) {
      const x0 = g.X(S.src), y0 = g.Y(0);
      ctx.fillStyle = P.cyan; ctx.fillRect(x0 - cellW / 2 - 2, y0 + 1, cellW + 4, 3);
      for (const gid of foc) if (cellBox[gid]) { const [cx, cy] = cellBox[gid]; curve(x0, y0, cx, cy, P.cyan, thumb ? 2.2 : 1.1, foc.size > 12 ? 0.45 : 0.8); arcs.cyan.push(gid); }
      for (const gid of foc) if (cellBox[gid]) { const [cx, cy] = cellBox[gid]; ctx.strokeStyle = P.cyan; ctx.lineWidth = 1.4; ctx.strokeRect(cx - cellW / 2 - 1.5, cy - cellH / 2 - 1.5, cellW + 3, cellH + 3); }
    }
    // amber: the chosen declaration and every other chapter that cites it
    const sd = S.sel && BY[S.sel];
    if (sd && cellBox[sd.gid]) {
      const [cx, cy] = cellBox[sd.gid];
      for (const u of new Set(sd.cites.map((c) => c[0]))) {
        // the chosen chapter's own line stays cyan: amber goes only to the other chapters that cite it
        if (u === IDX || colOf[u] === sd.col || (hasFocus && foc.has(sd.gid) && colOf[u] === S.src)) continue;
        arcs.amber.push(colOf[u]);
        const x2 = g.X(colOf[u]), y2 = g.Y(0);
        curve(cx, cy, x2, y2, P.amber, 1.6, 0.95);
        ctx.fillStyle = P.amber; ctx.beginPath(); ctx.arc(x2, y2 + 2, 3.2, 0, 2 * Math.PI); ctx.fill();
      }
      ctx.strokeStyle = P.amber; ctx.lineWidth = 2.4; ctx.shadowColor = P.amber; ctx.shadowBlur = 10;
      ctx.strokeRect(cx - cellW / 2 - 2.5, cy - cellH / 2 - 2.5, cellW + 5, cellH + 5); ctx.shadowBlur = 0;
    }
    // amber frames: the cells the search text matches
    if (hitSet) { ctx.strokeStyle = P.amber; ctx.lineWidth = 1.6; for (const gid of hitSet) if (cellBox[gid]) { const [cx, cy] = cellBox[gid]; ctx.strokeRect(cx - cellW / 2 - 1.5, cy - cellH / 2 - 1.5, cellW + 3, cellH + 3); } }
    window.LEANMAP_BOXES = cellBox; window.LEANMAP_ARCS = arcs;   // read by the probe below (pointer tests)

    const u = COLS[Math.min(NC - 1, Math.max(0, Math.ceil(t) - 1))], n = visible().length, met = metCount(t);
    $('hudBig').textContent = t <= 0 ? L('地图 · 还没开始读', 'Map · nothing read yet') : t >= NC ? L('地图 · 全书读完', 'Map · the whole book read') : L(`地图 · 读到${unitName(u)}`, `Map · read to ${unitName(u)}`);
    $('hudSub').textContent = (S.src != null ? L(`${unitName(COLS[S.src])}引用 ${foc.size} 条 · `, `${unitName(COLS[S.src])} cites ${foc.size} · `) : '')
      + L(`已落定 ${met} / ${n} 条`, `${met} of ${n} landed`);
  }

  /* ---------- strip: landed against the reading position ---------- */
  function drawPlot() {
    const n = visible().length, g = kit.plot($('plot'), { x: [0, NC], y: [0, Math.max(1, n) * 1.4], pad: [36, 10, 10, 22] });
    plotView = g;
    // the tick after column c (the count once that unit is read) carries its name; names are thinned as under the stage,
    // measured in the axis font of kit.plot at the pixel-snapped place it draws a tick, so that no two touch however many
    // columns the book has
    g.ctx.font = `10px ${TRV.fonts.data}`;
    g.axes({ yTicks: [0, Math.round(n / 2), n], xTicks: axisNames(g.ctx, (c) => Math.round(g.X(c + 1)) + 0.5, (c) => unitShort(COLS[c]), null, g.W).map(({ c, text }) => [c + 1, text]) });
    const pts = [[0, 0]]; for (let c = 1; c <= NC; c++) pts.push([c, metCount(c)]);
    g.hline(n, P.ink, { dash: [4, 3], alpha: 0.7 });
    g.line(pts, S.filter === 'theorem' ? P.ok : P.sigma, { width: 1.8 });
    const t = clock.t; g.vline(t, P.amber, { alpha: 0.8 }); g.dot(t, metCount(t), P.amber, 4.5);
    g.legend([[S.filter === 'theorem' ? P.ok : P.sigma, L('已落定', 'landed')], [P.ink, L('锁文件里的条目', 'entries in the lock'), 'dash']]);
    $('plotMeta').textContent = `${metCount(t)} / ${n}`;
  }

  /* ---------- readouts ---------- */
  function where(d) {
    const by = new Map();
    for (const [u, m] of d.cites) by.set(u, (by.get(u) === 'e' || m === 'e') ? 'e' : 'i');
    return [...by].filter(([u]) => u !== IDX).map(([u, m]) => `${unitShort(u)}${m === 'e' ? '' : L('（行内）', ' (inline)')}`).join(L('、', ', '));
  }
  function drawText() {
    const t = clock.t, n = visible().length, met = metCount(t), d = S.sel && BY[S.sel];
    $('roMet').textContent = `${met} / ${n}`;
    $('roMetSub').textContent = S.filter === 'all' ? L('锁文件共 ' + D.length + ' 条', `the lock has ${D.length}`) : S.filter === 'theorem' ? L('种类为 theorem 的', 'of kind theorem') : L('只有行内链接的', 'inline links only');
    $('roName').innerHTML = d ? `<code>${d.short}</code>` : '—';
    $('roKind').innerHTML = d ? `<span class="${d.kind === 0 ? 'c-ok' : ''}">${L(KIND_NAME[d.kind][0], KIND_NAME[d.kind][1])}</span> · ${d.env ? L('环境引用', 'environment') : L('只有行内链接', 'inline only')}` : '—';
    $('roModule').innerHTML = d ? `<a href="https://github.com/${PIN.repo}/blob/${PIN.commit}/${d.module}.lean#L${d.line}" target="_blank" rel="noopener"><code>${d.module}.lean:${d.line}</code></a>` : '—';
    $('roWhere').textContent = d ? where(d) : '—';
    $('roSerial').textContent = d ? (d.serial || '—') : '—';
    $('roNote').textContent = d ? L(`首次出场：${unitName(d.home)}。琥珀色的线连到另外引用它的 ${new Set(d.cites.map((c) => c[0]).filter((u) => u !== IDX && u !== d.home)).size} 章。`,
      `First appears in ${unitName(d.home)}. The amber lines go to the ${new Set(d.cites.map((c) => c[0]).filter((u) => u !== IDX && u !== d.home)).size} other chapter(s) that cite it.`)
      : S.src != null ? L(`${unitName(COLS[S.src])}引用 ${focus().size} 条声明，青色的线从它的柱脚连到每一格。点一格看它的种类与位置。`, `${unitName(COLS[S.src])} cites ${focus().size} declarations; the cyan lines run from the foot of its column to each cell. Click a cell to see its kind and place.`)
        : L('点一格看它的种类、模块与在书中的位置；点某一章柱子的底部，看那一章引用了哪些。', 'Click a cell to see its kind, module and place in the book; click the foot of a column to see what that chapter cites.');
    $('pillRead').querySelector('strong').textContent = t >= NC ? L('全书', 'all') : t <= 0 ? '—' : unitShort(COLS[Math.min(NC - 1, Math.ceil(t) - 1)]);
    $('pillMet').querySelector('strong').textContent = `${met}/${n}`;
    $('oSrc').textContent = S.src == null ? L('无', 'none') : unitName(COLS[S.src]);
    const hits = found();
    $('qOut').textContent = hits == null ? L('输入声明名或模块路径的一段：命中的格子框成琥珀色，其余变暗。', 'Type part of a declaration name or module path: the matching cells are framed in amber and the rest dim.')
      : hits.length === 0 ? L('没有命中。', 'No match.')
        : L(`命中 ${hits.length} 条：`, `${hits.length} match${hits.length > 1 ? 'es' : ''}: `) + hits.slice(0, 12).map((d) => `${d.serial || '—'} ${d.short}`).join(L('、', ', ')) + (hits.length > 12 ? L(` 等`, ', …') : '');
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NC, t: NC, rate: 3, step: 1,
    format: (t, max) => `${t >= max ? L('全书', 'all') : t <= 0 ? '0' : unitShort(COLS[Math.min(NC - 1, Math.ceil(t) - 1)])} <small>/ ${max}</small>`,
    onChange: () => paint()
  });
  function setLayout(filter, animate) {
    if (filter === S.filter) return;
    from = { filter: S.filter, lay }; S.filter = filter; lay = layout(filter);
    if (S.sel && !FILTERS[filter](BY[S.sel])) S.sel = null;
    if (!animate) { from = null; mix = 1; paint(); return; }
    mix = 0; kit.tween(600, (m) => { mix = m; paint(); }, () => { from = null; mix = 1; paint(); });
  }
  const filterChips = kit.chips($('filterChips'), 'filter', (v) => { cards.mark(null); setLayout(v, true); });
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { cards.mark(null); S.mode = v; paint(); });
  const fSrc = kit.field($('src'), { fmt: (v) => (v < 0 ? L('无', 'none') : unitName(COLS[v])), onInput: (v) => { cards.mark(null); S.src = v < 0 ? null : v; paint(); } });
  const syncControls = () => { filterChips.set(S.filter, true); modeChips.set(S.mode, true); fSrc.set(S.src == null ? -1 : S.src); };
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('q').addEventListener('input', () => { cards.mark(null); S.q = $('q').value; const h = found(); if (S.sel && h && !h.some((d) => d.gid === S.sel)) S.sel = null; paint(); });
  $('q').addEventListener('keydown', (ev) => ev.stopPropagation());   // typing a space or a digit does not drive the rail

  // direct manipulation: click a cell to choose it, the foot of a column to look back from that chapter
  function hit(ev) {
    const b = $('cv').getBoundingClientRect(), px = ev.clientX - b.left, py = ev.clientY - b.top;
    const c = Math.round(view.invX(px));
    if (c < 0 || c >= NC) return null;
    if (py > view.pt + view.ih) return { col: c };
    const k = Math.floor(view.invY(py)), list = lay.cols[c];
    const d = list[k];
    if (d && Math.abs(px - view.X(c)) < Math.max(6, (view.X(1) - view.X(0)) * 0.5) && metIn(d, clock.t)) return { gid: d.gid };
    return { none: true };
  }
  $('cv').addEventListener('click', (ev) => {
    const h = hit(ev); if (!h) return;
    cards.mark(null);
    if (h.gid) S.sel = S.sel === h.gid ? null : h.gid;
    else if (h.col != null) { S.src = S.src === h.col ? null : h.col; syncControls(); }
    else { S.sel = null; }
    paint();
  });

  /* ---------- experiment cards ---------- */
  const C27 = ch(27), C28 = ch(28), env27 = citedBy(C27, 'env'), env28 = citedBy(C28, 'env'), all27 = citedBy(C27, 'all'), all28 = citedBy(C28, 'all');
  const homes = (list) => [...new Set(list.map((d) => d.home))].sort((a, b) => a - b);
  const homeNames = (list, lang) => homes(list).map((u) => DATA.units[u].n[lang]).join(lang ? ', ' : '、');
  const span = (list, lang) => { const h = homes(list).filter((u) => /^ch/.test(DATA.units[u].file)); return `${DATA.units[h[0]].n[lang]}${lang ? ' to ' : '到'}${DATA.units[h[h.length - 1]].n[lang]}`; };
  const inParts = (list, a, b) => list.filter((d) => DATA.units[d.home].part >= a && DATA.units[d.home].part <= b).length;
  const nThm = D.filter((d) => d.kind === 0).length, nInl = D.filter((d) => !d.env).length, nInlThm = D.filter((d) => !d.env && d.kind === 0).length;
  const FIX = D.find((d) => d.short === 'unreadState_fixed_iff'), PAR = D.find((d) => d.short === 'inner_product_norm_parallelogram_law');
  const PRESETS = {
    all: { filter: 'all', src: null, sel: null, at: 0, play: true, still: NC },
    bedrock: { filter: 'all', src: colOf[C27], mode: 'env', sel: PAR.gid, at: NC, still: NC },
    table27: { filter: 'all', src: colOf[C27], mode: 'all', sel: null, at: NC, still: NC },
    closure: { filter: 'all', src: colOf[C28], mode: 'env', sel: FIX.gid, at: NC, still: NC },
    table28: { filter: 'all', src: colOf[C28], mode: 'all', sel: null, at: NC, still: NC },
    theorems: { filter: 'theorem', src: null, sel: null, at: NC, still: NC },
    inline: { filter: 'inline', src: null, sel: null, at: NC, still: NC }
  };
  const [FIRST, LAST, INDEXED] = [COLS[0], COLS[NC - 1], IDX].map((u) => DATA.units[u].n);   // where the rail starts and ends, and the index it passes over
  const NOTES = {
    all: [`时间轴从${FIRST[0]}一章一章读到${LAST[0]}（${INDEXED[0]} 是总索引，不单列一柱）：每一章第一次引用的冻结声明落进这一章的柱子（绿色是定理，灰色是定义）。读完，${D.length} 格全部落定，正好是锁文件的条目数。`,
      `The rail reads from the ${FIRST[1]} to ${LAST[1]} one chapter at a time (${INDEXED[1]}, the index, has no column): the frozen declarations a chapter cites first drop into its column (green theorems, grey definitions). At the end all ${D.length} cells have landed, exactly the number of entries in the lock file.`],
    bedrock: [`第二十七章用定理环境逐行解剖的 ${env27.length} 条：${env27.length} 根青色的线从第二十七章的柱脚连回它们第一次出场的${homeNames(env27, 0)}，选中的那一格也是青线。琥珀色框住选中的平行四边形恒等式，琥珀色的线只连到另外引用它的几章。`,
      `The ${env27.length} theorems Chapter 27 dissects in its own environments: ${env27.length} cyan lines run from the foot of Chapter 27 back to where they first appear, ${homeNames(env27, 1)}, the chosen cell's line among them. The amber frame marks the chosen parallelogram law, and amber lines go only to the other chapters that cite it.`],
    table27: [`第二十七章连同它的审计表一共引用 ${all27.length} 条：青色的线从它的柱脚伸回${span(all27, 0)}，其中 ${inParts(all27, 0, 2)} 条落在第一至三部。`,
      `Chapter 27, audit table included, cites ${all27.length} declarations: the cyan lines reach back from its foot to ${span(all27, 1)}, and ${inParts(all27, 0, 2)} of them land in Parts I–III.`],
    closure: [`第二十八章解剖的 ${env28.length} 条：${env28.length} 根青色的线连回${homeNames(env28, 0)}，选中的那一格也是青线。琥珀色框住选中的未读不动点判据 unreadState_fixed_iff，它第一次出场在${DATA.units[FIX.home].n[0]}；琥珀色的线只连到另外引用它的章。`,
      `The ${env28.length} theorems Chapter 28 dissects: ${env28.length} cyan lines back to ${homeNames(env28, 1)}, the chosen cell's line among them. The amber frame marks the chosen unread fixed-point criterion unreadState_fixed_iff, which first appears in ${DATA.units[FIX.home].n[1]}; amber lines go only to the other chapters that cite it.`],
    table28: [`第二十八章连同它的审计表一共引用 ${all28.length} 条：青色的线从它的柱脚伸回${span(all28, 0)}，其中 ${inParts(all28, 3, 5)} 条落在第四至六部。`,
      `Chapter 28, audit table included, cites ${all28.length} declarations: the cyan lines reach back from its foot to ${span(all28, 1)}, and ${inParts(all28, 3, 5)} of them land in Parts IV–VI.`],
    theorems: [`只留锁文件里种类为 theorem 的 ${nThm} 格，全是绿色；实心的被某个定理环境用 lean= 引用，空心的只出现在行内链接里。`,
      `Only the ${nThm} entries of kind theorem remain, all green; the filled ones are cited by a theorem environment with lean=, the hollow ones only by inline links.`],
    inline: [`只留没有任何环境 lean= 引用、只靠行内链接出现的 ${nInl} 格：${nInlThm} 格绿色的定理，${nInl - nInlThm} 格灰色的定义。`,
      `Only the ${nInl} entries that no environment cites with lean=, reached by inline links alone: ${nInlThm} green theorems and ${nInl - nInlThm} grey definitions.`]
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.src = p.src; S.mode = p.mode || 'all'; S.sel = p.sel;
    setLayout(p.filter, !booting && !TRV.still);
    syncControls();
    clock.set(p.at);
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); }
    else if (p.play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：点一格看它在哪里，点柱子底部看那一章引用了哪些，或拖动时间轴。', 'Free play: click a cell to see where it is, click the foot of a column to see what that chapter cites, or scrub the rail.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  window.LEANMAP_DEBUG = {
    get state() {
      const t = clock.t;
      return { t, max: NC, playing: clock.playing, preset: cards.current, filter: S.filter, src: S.src == null ? null : DATA.units[COLS[S.src]].file, srcCol: S.src, mode: S.mode, sel: S.sel,
        visible: visible().length, met: metCount(t), q: S.q, found: (found() || []).map((d) => d.gid).sort(), focus: [...focus()].sort(), arcs: window.LEANMAP_ARCS && { cyan: [...window.LEANMAP_ARCS.cyan].sort(), amber: window.LEANMAP_ARCS.amber.map((c) => DATA.units[COLS[c]].file).sort() }, landed: visible().filter((d) => metIn(d, t)).map((d) => d.gid) };
    },
    /** The page's data as drawn: [gid, kind name, line, home unit file, [[unit file, 'e' | 'i'], …], serial]. */
    rows: () => D.map((d) => [d.gid, DATA.kinds[d.kind], d.line, DATA.units[d.home].file, d.cites.map(([u, m]) => [DATA.units[u].file, m]), d.serial]),
    units: () => DATA.units.map((u) => u.file),
    columns: () => COLS.map((u) => DATA.units[u].file),
    stack: (col) => lay.cols[col].map((d) => d.gid),
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of a drawn cell, and of the foot of a column (for pointer tests). */
    cellAt: (gid) => { const b = $('cv').getBoundingClientRect(), p = (window.LEANMAP_BOXES || {})[gid]; return p ? [b.left + p[0], b.top + p[1]] : null; },
    footAt: (col) => { const b = $('cv').getBoundingClientRect(); return [b.left + view.X(col), b.top + view.pt + view.ih + 12]; },
    /** Viewport coordinates of the strip's tick v (v columns read) on its axis line. */
    tickAt: (v) => { const b = $('plot').getBoundingClientRect(); return [b.left + plotView.X(v), b.top + plotView.pt + plotView.ih]; }
  };
  window.TRV_THUMB = () => { clock.pause(); S.src = colOf[C28]; S.mode = 'all'; S.sel = FIX.gid; setLayout('all', false); clock.set(NC); paint.now(); };
  cards.pick(cards.initial('all'));   // a chapter may cite another card: ::: {.viz src="lean-declaration-map" preset="table27"}
  booting = false;
  paint();
})();
