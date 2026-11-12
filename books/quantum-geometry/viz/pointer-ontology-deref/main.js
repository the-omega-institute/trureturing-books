/* ORTHO//ONTOLOGY · 寻址三条路: three ways to reach an address, side by side on one rail of steps.
     scan   N = 64 memory cells read one per tick; address a is cell a + 1 and is reached at tick a + 1.
     tree   the bucket-brigade routing tree of depth n = log₂N = 6 above the same 64 cells: N − 1 = 63 switches,
            switch (ℓ, p) at level ℓ = 0 … 5 with prefix p = a >> (6 − ℓ); one level is set per tick and turns by bit
            ℓ + 1 of a (0 left, 1 right). A superposed address lights several paths: they share the switches of a
            common prefix and part for good at the first differing bit.
     table  Chapter 38's two-level example with N = 4: page directory P at b₀ = 0x1000 with P[0] = b₀ (slot 0 holds
            the directory's own address), P[i] = addr(Tᵢ) = 0x1000·(i + 1), Tᵢ[j] = addr(Dᵢ,ⱼ) = 0x1000·(4i + j + 3),
            so T₁ = 0x2000 and D₁,₂ = 0x9000 as in the chapter. Walk(b, [i₁ … i_L]) reads Mem[b][i₁] per hop.
   Colours: cyan = the routing path that has been set and the hops already walked; ink = cells the scan has read and
   the cell asked for; amber = the reader now (scan head, routing front, the slot being read, the value just read).
   Read-only probe: POINTER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);

  /* ---------- the three address spaces ---------- */
  const n = 6, N = 1 << n;                                   // 64 cells, depth 6
  /** Every switch of the tree, level by level: [ℓ, prefix]. Counted, not assumed: 1 + 2 + … + 32. */
  const SWITCHES = [];
  for (let l = 0; l < n; l++) for (let p = 0; p < (1 << l); p++) SWITCHES.push([l, p]);
  const depthOf = (m) => { let d = 0; while ((1 << d) < m) d++; return d; };   // log₂ of a power of two
  /** The switches on the root-to-leaf path of address a, with the bit each one turns by. */
  const pathOf = (a) => Array.from({ length: n }, (_, l) => ({ l, p: a >> (n - l), bit: (a >> (n - 1 - l)) & 1 }));
  const DELTAS = [0, 32, 8, 40, 2, 34, 10, 42];               // the branches of a superposed address: a xor these
  const branchesOf = (a, k) => DELTAS.slice(0, k).map((d) => a ^ d);

  const B0 = 0x1000, TBL = 4;                                // the chapter's N = 4 page directory at 0x1000
  /** Mem[b][i]: the page directory and its leaf tables; data frames are not tables. */
  const MEM = { [B0]: [B0, 0x2000, 0x3000, 0x4000] };
  for (let i = 1; i < TBL; i++) MEM[0x1000 * (i + 1)] = Array.from({ length: TBL }, (_, j) => 0x1000 * (4 * i + j + 3));
  const hex = (x) => '0x' + x.toString(16).toUpperCase().padStart(4, '0');
  const nameOf = (b) => (b === B0 ? 'P' : MEM[b] ? `T${'₀₁₂₃'[b / 0x1000 - 1]}` : `D${'₀₁₂₃'[Math.floor((b / 0x1000 - 3) / 4)]},${'₀₁₂₃'[(b / 0x1000 - 3) % 4]}`);
  /** The walk: one hop per index, each from the base the previous hop read. */
  function walk(idx) {
    const hops = []; let b = B0;
    for (const i of idx) { const row = MEM[b]; if (!row) break; const v = row[i]; hops.push({ base: b, slot: i, value: v }); b = v; }
    return hops;
  }

  /* ---------- state ---------- */
  const S = { scene: 'tree', a: 41, k: 1, idx: [1, 2] };
  const tick = () => Math.floor(clock.t + 1e-9);
  const scanSteps = () => S.a + 1;
  const scanRead = () => Math.min(tick(), scanSteps());
  const levelsSet = () => Math.min(tick(), n);
  const branches = () => branchesOf(S.a, S.k);
  function activeSwitches() {
    const set = new Map(), m = levelsSet();
    for (const a of branches()) for (const s of pathOf(a)) if (s.l < m) set.set(`${s.l}:${s.p}`, [s.l, s.p]);
    return [...set.values()].sort((u, v) => u[0] - v[0] || u[1] - v[1]);
  }
  const allPathSwitches = () => { const set = new Set(); for (const a of branches()) for (const s of pathOf(a)) set.add(`${s.l}:${s.p}`); return set.size; };
  const hopsDone = () => Math.min(tick(), S.idx.length);
  const pageResult = () => { const h = walk(S.idx); return h.length ? h[h.length - 1].value : B0; };

  /* ---------- canvas helpers ---------- */
  const lw = (x) => (TRV.thumbMode ? 2 * x : x);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${o.face === 'body' ? TRV.fonts.body : TRV.fonts.data}`;
    ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }
  const line = (ctx, x0, y0, x1, y1, col, w, a) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.globalAlpha = a == null ? 1 : a; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.globalAlpha = 1; };
  const dot = (ctx, x, y, r, col, a, glow) => { ctx.fillStyle = col; ctx.globalAlpha = a == null ? 1 : a; if (glow) { ctx.shadowColor = col; ctx.shadowBlur = glow; } ctx.beginPath(); ctx.arc(x, y, r, 0, kit.TAU); ctx.fill(); ctx.shadowBlur = 0; ctx.globalAlpha = 1; };
  const ring = (ctx, x, y, r, col, w, a) => { ctx.globalAlpha = a == null ? 1 : a; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.shadowColor = col; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(x, y, r, 0, kit.TAU); ctx.stroke(); ctx.shadowBlur = 0; ctx.globalAlpha = 1; };
  function arrow(ctx, pts, col, w, a, head) {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.globalAlpha = a == null ? 1 : a;
    ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
    if (pts.length === 4) ctx.bezierCurveTo(pts[1][0], pts[1][1], pts[2][0], pts[2][1], pts[3][0], pts[3][1]); else ctx.lineTo(pts[1][0], pts[1][1]);
    ctx.stroke();
    const e = pts[pts.length - 1], f = pts[pts.length - 2], ang = Math.atan2(e[1] - f[1], e[0] - f[0]), hs = head || 7;
    ctx.beginPath(); ctx.moveTo(e[0], e[1]); ctx.lineTo(e[0] - hs * Math.cos(ang - 0.4), e[1] - hs * Math.sin(ang - 0.4)); ctx.lineTo(e[0] - hs * Math.cos(ang + 0.4), e[1] - hs * Math.sin(ang + 0.4)); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 1;
  }

  /* ---------- lane 1 and 2: the memory row, the scan bus and the routing tree ---------- */
  let geo = {};
  function drawMemory(ctx, box, words) {
    const focusScan = S.scene === 'scan', focusTree = S.scene === 'tree', t = clock.t;
    const cw = box.w / N, rowH = clamp(box.h * 0.1, 10, 26), rowY = box.y + box.h - rowH - (words ? 30 : 8);
    const treeTop = box.y + (words ? 16 : 6), dy = (rowY - 8 - treeTop) / n;
    const X = (l, p) => box.x + (p + 0.5) * box.w / (1 << l), Y = (l) => (l === n ? rowY : treeTop + l * dy);
    const treeA = focusTree || TRV.thumbMode ? 1 : 0.5, scanA = focusScan || TRV.thumbMode ? 1 : 0.5;
    // the tree: all 63 switches and their edges, faint
    for (const [l, p] of SWITCHES) for (const c of [0, 1]) line(ctx, X(l, p), Y(l), X(l + 1, 2 * p + c), Y(l + 1), P.faint, lw(1), 0.55 * treeA);
    const rNode = clamp(box.w / 150, 2, 4.2) * (TRV.thumbMode ? 1.6 : 1);
    for (const [l, p] of SWITCHES) dot(ctx, X(l, p), Y(l), rNode * 0.8, P.faint, treeA);
    // the lit paths
    const m = levelsSet(), front = Math.min(t, n);
    for (const a of branches()) {
      const path = pathOf(a);
      for (const s of path) {
        if (s.l >= m) break;
        const nx = s.l + 1 === n ? X(n, a) : X(s.l + 1, path[s.l + 1].p);
        line(ctx, X(s.l, s.p), Y(s.l), nx, Y(s.l + 1), P.cyan, lw(2.4), treeA);
        if (words && S.k === 1) text(ctx, String(s.bit), (X(s.l, s.p) + nx) / 2 + (s.bit ? 7 : -7), (Y(s.l) + Y(s.l + 1)) / 2, P.cyan, { align: 'center', size: clamp(dy * 0.38, 9, 12) });
      }
      for (const s of path) if (s.l < m) dot(ctx, X(s.l, s.p), Y(s.l), rNode * 1.25, P.cyan, treeA, 6);
      if (t < n) {                       // the routing front between two levels, and the switch being set
        const l0 = Math.floor(front), f = front - l0, s0 = path[l0], x0 = X(l0, s0.p), x1 = l0 + 1 === n ? X(n, a) : X(l0 + 1, path[l0 + 1].p);
        ring(ctx, x0, Y(l0), rNode * 2, P.amber, lw(1.6), treeA);
        dot(ctx, x0 + (x1 - x0) * f, Y(l0) + (Y(l0 + 1) - Y(l0)) * f, rNode * 1.3, P.amber, treeA, 10);
      }
    }
    // the memory row: scanned cells (ink), the cells the tree has delivered (cyan), the cell asked for (ink frame)
    const read = scanRead(), gap = cw > 5 ? 1 : 0.5;
    for (let c = 0; c < N; c++) {
      ctx.fillStyle = P.dim; ctx.globalAlpha = 0.12; ctx.fillRect(box.x + c * cw + gap / 2, rowY, cw - gap, rowH);
      if (c < read) { ctx.fillStyle = P.ink; ctx.globalAlpha = 0.42 * scanA; ctx.fillRect(box.x + c * cw + gap / 2, rowY, cw - gap, rowH); }
    }
    ctx.globalAlpha = 1;
    if (m >= n) for (const a of branches()) { ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.9 * treeA; ctx.shadowColor = P.cyan; ctx.shadowBlur = 8; ctx.fillRect(box.x + a * cw + gap / 2, rowY, cw - gap, rowH); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
    ctx.strokeStyle = P.ink; ctx.lineWidth = lw(1.4); ctx.strokeRect(box.x + S.a * cw + 0.5, rowY - 2.5, cw - 1, rowH + 5);
    // the scan bus under the row, and its head
    const busY = rowY + rowH + 6;
    line(ctx, box.x, busY, box.x + box.w, busY, P.lineHot, lw(1), scanA);
    const hx = box.x + Math.min(t, scanSteps()) * cw;
    if (read > 0) line(ctx, box.x, busY, hx, busY, P.ink, lw(2), 0.75 * scanA);
    if (read >= scanSteps()) { ctx.strokeStyle = P.amber; ctx.lineWidth = lw(2); ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.strokeRect(box.x + S.a * cw + 0.5, rowY - 2.5, cw - 1, rowH + 5); ctx.shadowBlur = 0; }
    ctx.fillStyle = P.amber; ctx.globalAlpha = scanA; ctx.beginPath(); ctx.moveTo(hx, busY - 4); ctx.lineTo(hx - 5, busY + 5); ctx.lineTo(hx + 5, busY + 5); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    if (words) {
      const fs = clamp(box.w / 50, 9, 11.5);
      for (const c of [0, 16, 32, 48, 63]) if (Math.abs(c - S.a) > 4) text(ctx, String(c), box.x + (c + 0.5) * cw, busY + 8, P.dim, { align: 'center', base: 'top', size: fs });
      text(ctx, `a = ${S.a}`, box.x + (S.a + 0.5) * cw, busY + 8, P.ink, { align: 'center', base: 'top', size: fs + 0.5 });
      text(ctx, L('树根', 'root'), X(0, 0) + rNode + 6, Y(0), P.dim, { size: fs, face: 'body' });
    }
    geo.mem = { x: box.x, w: box.w, cw, y: rowY, h: rowH, X, Y };
  }

  /* ---------- lane 3: the page directory with its self-mapped slot ---------- */
  function drawTable(ctx, box, words) {
    const focus = S.scene === 'table' || TRV.thumbMode, A = focus ? 1 : 0.5;
    const hops = walk(S.idx), done = hopsDone(), cur = done < hops.length ? done : -1;
    const colW = clamp(box.w * 0.3, 54, 150), top0 = Math.min(28, Math.max(20, box.h * 0.12)), sh = clamp((box.h - top0 - 26) / 7.6, 12, 34), fs = clamp(sh * 0.48, 8.5, 12.5);
    const xP = box.x + box.w * 0.13, xT = box.x + box.w * 0.13 + colW + Math.max(26, box.w * 0.12), y0 = box.y + top0;
    const slotY = (k) => y0 + 22 + k * sh;
    const blocks = {
      [B0]: { x: xP, y: y0, w: colW, h: 22 + TBL * sh },
      0x2000: { x: xT, y: y0, w: colW, h: 22 + TBL * sh },
      0x3000: { x: xT, y: y0 + 22 + TBL * sh + sh * 0.6, w: colW, h: sh },
      0x4000: { x: xT, y: y0 + 22 + TBL * sh + sh * 1.9, w: colW, h: sh },
      0x9000: { x: xT, y: y0 + 22 + TBL * sh + sh * 3.2, w: colW, h: sh }
    };
    const walked = (base, slot) => hops.some((h, q) => q < done && h.base === base && h.slot === slot);
    const isCur = (base, slot) => cur >= 0 && hops[cur].base === base && hops[cur].slot === slot;
    // the blocks
    for (const [b, r] of Object.entries(blocks)) {
      ctx.fillStyle = P.dim; ctx.globalAlpha = 0.1 * A; ctx.fillRect(r.x, r.y, r.w, r.h); ctx.globalAlpha = 0.8 * A;
      ctx.strokeStyle = P.lineHot; ctx.lineWidth = lw(1); ctx.strokeRect(r.x + 0.5, r.y + 0.5, r.w - 1, r.h - 1); ctx.globalAlpha = 1;
      if (words) text(ctx, `${nameOf(+b)}${MEM[+b] ? ' · ' : ' '}${hex(+b)}`, r.x + 6, MEM[+b] ? r.y + 11 : r.y + r.h / 2, P.ink, { size: fs, weight: 600 });
    }
    // the slots of P and T₁
    for (const b of [B0, 0x2000]) for (let k = 0; k < TBL; k++) {
      const r = blocks[b], y = slotY(k);
      ctx.strokeStyle = P.lineHot; ctx.globalAlpha = 0.7 * A; ctx.lineWidth = lw(1); ctx.strokeRect(r.x + 0.5, y + 0.5, r.w - 1, sh - 1); ctx.globalAlpha = 1;
      if (walked(b, k)) { ctx.fillStyle = P.cyan; ctx.globalAlpha = 0.22 * A; ctx.fillRect(r.x + 1, y + 1, r.w - 2, sh - 2); ctx.globalAlpha = 1; }
      if (isCur(b, k)) { ctx.globalAlpha = A; ctx.strokeStyle = P.amber; ctx.lineWidth = lw(2); ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.strokeRect(r.x + 1, y + 1, r.w - 2, sh - 2); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
      if (words) { text(ctx, String(k), r.x + 6, y + sh / 2, P.dim, { size: fs }); text(ctx, hex(MEM[b][k]), r.x + r.w - 6, y + sh / 2, b === B0 && k === 0 ? P.ink : P.dim, { align: 'right', size: fs }); }
    }
    // pointers: P[0] back to P itself, P[i] to Tᵢ, T₁[2] to D₁,₂
    const rP = blocks[B0], rT = blocks[0x2000], hs = TRV.thumbMode ? 12 : 7;
    const used = (base, slot) => walked(base, slot) || isCur(base, slot);
    const col = (base, slot) => (walked(base, slot) ? P.cyan : P.faint), wd = (base, slot) => lw(walked(base, slot) ? 2.2 : 1.2);
    const ly = slotY(0) + sh / 2, loopX = rP.x - Math.min(box.w * 0.1, 40);
    arrow(ctx, [[rP.x, ly], [loopX, ly], [loopX, rP.y - 18], [rP.x + rP.w * 0.3, rP.y - 1]], col(B0, 0), wd(B0, 0), A * (used(B0, 0) ? 1 : 0.8), hs);
    const loops = hops.slice(0, done).filter((h) => h.base === B0 && h.slot === 0).length;
    if (words && loops) text(ctx, `×${loops}`, loopX - 4, rP.y - 6, P.cyan, { align: 'right', size: fs + 1, weight: 600 });
    arrow(ctx, [[rP.x + rP.w, slotY(1) + sh / 2], [rT.x - 1, rT.y + 11]], col(B0, 1), wd(B0, 1), A, hs);
    for (const [k, b] of [[2, 0x3000], [3, 0x4000]]) { const r = blocks[b]; arrow(ctx, [[rP.x + rP.w, slotY(k) + sh / 2], [rP.x + rP.w + 12, slotY(k) + sh / 2], [r.x - 14, r.y + r.h / 2], [r.x - 1, r.y + r.h / 2]], col(B0, k), wd(B0, k), A * 0.85, hs); }
    const rD = blocks[0x9000];
    const bend = Math.min(22, box.x + box.w - rT.x - rT.w - 2);
    arrow(ctx, [[rT.x + rT.w, slotY(2) + sh / 2], [rT.x + rT.w + bend, slotY(2) + sh / 2], [rD.x + rD.w + bend, rD.y - 18], [rD.x + rD.w - 12, rD.y - 1]], col(0x2000, 2), wd(0x2000, 2), A, hs);
    // the value read at the end of the walk
    if (done >= hops.length && hops.length) {
      const v = hops[hops.length - 1].value, r = blocks[v];
      if (r) { const hh = MEM[v] ? 22 : r.h; ctx.globalAlpha = focus ? 1 : 0.35; ctx.strokeStyle = P.amber; ctx.lineWidth = lw(2.2); ctx.shadowColor = P.amber; ctx.shadowBlur = 12; ctx.strokeRect(r.x - 2, r.y - 2, r.w + 4, hh + 4); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
    }
    geo.table = blocks;
  }

  /* ---------- the stage ---------- */
  function drawStage() {
    const g0 = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, W = g0.W, H = g0.H;
    if (TRV.thumbMode) {     // wordless cover: the lit routing paths over the memory row, beside the self-mapped directory
      const glow = ctx.createRadialGradient(W * 0.35, H * 0.5, 0, W * 0.35, H * 0.5, W * 0.6);
      glow.addColorStop(0, TRV.alpha(P.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(P.cyan, 0)); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      drawMemory(ctx, { x: W * 0.04, y: H * 0.08, w: W * 0.58, h: H * 0.84 }, false);
      drawTable(ctx, { x: W * 0.66, y: H * 0.14, w: W * 0.32, h: H * 0.72 }, false);
      return;
    }
    const st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8, bottom = Math.max(18, $('legend').offsetHeight + 18);
    const bx = { x: 18, y: top, w: W - 36, h: Math.max(80, H - top - bottom) };
    if (bx.w >= 560) {
      const mw = bx.w * 0.6;
      drawMemory(ctx, { x: bx.x, y: bx.y, w: mw, h: bx.h }, true);
      drawTable(ctx, { x: bx.x + mw + 16, y: bx.y, w: bx.w - mw - 16, h: bx.h }, true);
    } else {
      const mh = bx.h * 0.52;
      drawMemory(ctx, { x: bx.x, y: bx.y, w: bx.w, h: mh }, true);
      drawTable(ctx, { x: bx.x, y: bx.y + mh + 4, w: bx.w, h: bx.h - mh - 4 }, true);
    }
  }

  /* ---------- the strip: steps against the size of the table ---------- */
  function drawPlot() {
    const g = kit.plot($('plot'), { x: [2, 1024], y: [0.7, 1500], logX: true, logY: true, pad: [40, 12, 10, 22] });
    const xs = Array.from({ length: 10 }, (_, q) => 2 << q);
    g.axes({ xTicks: [[2, '2'], [8, '8'], [64, '64'], [1024, '1024']], yTicks: [[1, '1'], [6, '6'], [64, '64'], [1024, '1024']] });
    g.line(xs.map((m) => [m, m]), P.ink, { width: 1.8, alpha: 0.75 });
    g.line(xs.map((m) => [m, depthOf(m)]), P.cyan, { width: 2 });
    g.line([[2, 1], [1024, 1]], P.dim, { width: 1, dash: [3, 3] });
    g.vline(N, P.amber, { alpha: 0.8 });
    g.dot(N, N, P.ink, 3.5); g.dot(N, depthOf(N), P.cyan, 3.5);
    g.legend([[P.ink, L('逐格扫描：N 步', 'scan: N steps')], [P.cyan, L('路由树：log₂N 层', 'tree: log₂N levels')], [P.dim, L('零号槽读自己：1 步（只此一格）', 'slot 0 reads itself: 1 step (that cell only)'), 'dash']], { right: false });
    $('plotMeta').textContent = `N = ${N} · ${N} / ${depthOf(N)} / 1`;
  }

  /* ---------- words ---------- */
  const LEGEND = [['cy', '设好的路由开关、走过的跳', 'switches set, hops walked'], ['dm box', '扫描读过的格', 'cells the scan has read'], ['am', '读头：此刻这一步', 'the reader: this step now']];
  const setLabel = (id, zh, en) => { const h = `<span class="zh">${zh}</span><span class="en">${en}</span>`; if ($(id)._h !== h) { $(id).innerHTML = h; $(id)._h = h; } };
  const bin = (a) => a.toString(2).padStart(n, '0');
  const idxStr = () => `[${S.idx.join(', ')}]`;
  function drawText() {
    const s = tick(), read = scanRead(), act = activeSwitches().length, hops = walk(S.idx), done = hopsDone(), v = pageResult();
    let big, hud, note;
    if (S.scene === 'scan') {
      big = L(`扫描 · 第 ${Math.min(s, scanSteps())} 步`, `Scan · step ${Math.min(s, scanSteps())}`);
      hud = read >= scanSteps() ? L(`读到地址 ${S.a}：它是第 ${S.a + 1} 格，恰好用了 ${S.a + 1} 步`, `address ${S.a} reached: it is cell ${S.a + 1}, in exactly ${S.a + 1} steps`) : L(`读头一拍读一格，已读 ${read} 格，要读到第 ${S.a + 1} 格`, `one cell per tick, ${read} read so far, cell ${S.a + 1} to go for`);
      note = S.a === N - 1 ? L('最后一格要把整张表走一遍：N = 64 步。', 'The last cell takes a walk over the whole table: N = 64 steps.') : L('逐格扫描读第 k 格就要 k 步；同一时刻，路由树早已走到叶子。', 'Scanning to cell k takes k steps; by then the tree has long reached its leaf.');
    } else if (S.scene === 'tree') {
      big = L(`路由树 · ${act} / ${SWITCHES.length} 个开关`, `Tree · ${act} / ${SWITCHES.length} switches`);
      hud = S.k === 1 ? L(`地址 ${S.a} = ${bin(S.a)}₂：每一位拨一层，深度 log₂64 = ${depthOf(N)}`, `address ${S.a} = ${bin(S.a)}₂: one bit per level, depth log₂64 = ${depthOf(N)}`)
        : L(`${S.k} 个分支叠加：同时走 ${S.k} 条路，到底共拨 ${allPathSwitches()} 个开关`, `${S.k} branches in superposition: ${S.k} paths at once, ${allPathSwitches()} switches in all by the leaves`);
      note = S.k === 1 ? L('63 个开关里只动这一条路上的 6 个，其余一动不动。', 'Of the 63 switches only the 6 on this path move; the rest stay put.') : L('几条分支在相同的前缀上共用开关，有一位不同就分开，此后不再共用；每条分支仍只有 6 个。', 'The branches share switches while their prefixes agree and part at the first differing bit, never to share again; each branch still has 6.');
    } else {
      const last = done ? hops[done - 1] : null;
      big = L(`页表 ${idxStr()} · 第 ${done} 跳`, `Table ${idxStr()} · hop ${done}`);
      hud = last ? `Mem[${hex(last.base)}][${last.slot}] = ${hex(last.value)}` + (done >= hops.length ? L(`：读出 ${nameOf(v)}`, `: reads ${nameOf(v)}`) : '') : L('从页目录 P = 0x1000 出发', 'starting from the page directory P = 0x1000');
      note = S.idx.every((i) => i === 0) ? L(`零号槽里写的就是 0x1000：每一跳都回到页目录自己，p = *p。`, 'Slot 0 holds 0x1000 itself: every hop comes back to the page directory, p = *p.')
        : S.idx[0] === 0 ? L('第一跳踩中零号槽原地回环，用掉一层间接；第二跳把叶页表 T₁ 当作普通数据读出。', 'The first hop lands on slot 0 and loops in place, using up one level of indirection; the second reads the leaf table T₁ out as ordinary data.')
          : L('普通的两跳：页目录指向叶页表，叶页表指向数据帧。', 'An ordinary two-hop walk: the directory points to a leaf table, the leaf table to a data frame.');
    }
    setLabel('roKeyLabel', '读到这个地址要几步：扫描 · 路由树 · 页表', 'Steps to reach it: scan · tree · page table');
    $('roKey').textContent = `${scanSteps()} · ${depthOf(N)} · ${S.idx.length}`;
    $('roKeySub').textContent = L(`此刻第 ${s} 步`, `now at step ${s}`);
    setLabel('ro1Label', '扫描：已读的格', 'Scan: cells read'); $('ro1').textContent = `${read} / ${N}` + (read >= scanSteps() ? L(` · 读到 a = ${S.a}`, ` · reached a = ${S.a}`) : '');
    setLabel('ro2Label', '亮着的开关（共 N − 1）', 'Switches lit (of N − 1)'); $('ro2').textContent = `${act} / ${SWITCHES.length}`;
    setLabel('ro3Label', '树的深度 log₂N', 'Depth of the tree log₂N'); $('ro3').textContent = String(depthOf(N));
    setLabel('ro4Label', `页表 ${idxStr()}：已走的跳`, `Page table ${idxStr()}: hops walked`);
    $('ro4').textContent = hops.slice(0, done).map((h) => `${hex(h.base)}[${h.slot}] → ${hex(h.value)}`).join(' · ') || '—';
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note;
    $('pillSteps').querySelector('strong').textContent = String(s);
    const leg = LEGEND.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    $('oAddr').textContent = String(S.a);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(S.scene); });
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: steps ---------- */
  const RAIL = { scan: () => ({ max: scanSteps(), rate: Math.max(1.5, scanSteps() / 6) }), tree: () => ({ max: n, rate: 1.3 }), table: () => ({ max: S.idx.length, rate: 0.9 }) };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: n, t: n, rate: 1.3, step: 1,
    format: (t, max) => `${L('第 ', 'STEP ')}${Math.floor(t + 1e-9)}${L(' 步', '')} <small>/ ${Math.round(max)}</small>`,
    onChange: () => paint()
  });
  function fitClock(t) { const R = RAIL[S.scene](); clock.pause(); clock.rate = R.rate; clock.step = 1; clock.setMax(R.max, true); clock.set(t == null ? R.max : t); }
  function setScene(sc, t) { S.scene = sc; sceneChips.set(sc, true); fitClock(t); }
  function setAddr(a) { S.a = clamp(Math.round(a), 0, N - 1); fAddr.set(S.a); fitClock(S.scene === 'scan' ? 0 : undefined); if (S.scene === 'scan') clock.play(); }
  function setK(k) { S.k = k; branchChips.set(String(k), true); paint(); }
  function setIdx(idx) { S.idx = idx.slice(); idxChips.set(idx.join(','), true); if (S.scene === 'table') fitClock(); else paint(); }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const branchChips = kit.chips($('branchChips'), 'branches', (v) => { leave(); S.k = +v; if (S.scene !== 'tree') setScene('tree'); else paint(); });
  const idxChips = kit.chips($('idxChips'), 'idx', (v) => { leave(); S.idx = v.split(',').map(Number); setScene('table'); });
  const fAddr = kit.field($('addr'), { onInput: (v) => { leave(); S.a = v; fitClock(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('scan'); }, 2: () => { leave(); setScene('tree'); }, 3: () => { leave(); setScene('table'); } });

  /* ---------- direct manipulation: click a memory cell ---------- */
  const cellAt = (ev) => {
    const g = geo.mem; if (!g) return null;
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (x < g.x || x >= g.x + g.w || y < g.y - 8 || y > g.y + g.h + 14) return null;
    return Math.floor((x - g.x) / g.cw);
  };
  $('cv').addEventListener('click', (ev) => { const c = cellAt(ev); if (c == null) return; leave(); S.a = c; fAddr.set(c); if (S.scene === 'table') setScene('tree', 0); else fitClock(0); clock.play(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    qram_tree: { scene: 'tree', a: 41, k: 1, idx: [1, 2], play: true },
    linear64: { scene: 'scan', a: 63, k: 1, idx: [1, 2], play: true },
    superpose: { scene: 'tree', a: 41, k: 4, idx: [1, 2], play: true },
    four_loops: { scene: 'table', a: 41, k: 1, idx: [0, 0, 0, 0], play: true },
    self_map: { scene: 'table', a: 41, k: 1, idx: [0, 1], play: true },
    diagonal_hit: { scene: 'table', a: 41, k: 1, idx: [0], play: true }
  };
  const NOTES = {
    qram_tree: ['地址 41 = 101001₂ 从树根进来，每一拍按一位拨一层开关：六拍后青色的路通到第 42 格，63 个开关里只亮这 6 个。同一时刻，琥珀色的扫描读头才读过 6 格。', 'Address 41 = 101001₂ enters at the root and each tick sets one level by one bit: after six ticks the cyan path reaches cell 42, and only these 6 of the 63 switches light up. At the same moment the amber scan head has read just 6 cells.'],
    linear64: ['读头沿着总线一拍读一格，读过的格变亮；要读最后一格（地址 63），它得把 64 格全部走一遍，用 64 步。路由树在第 6 步就已到达叶子。', 'The head reads one cell per tick along the bus, and the cells it has read light up; to read the last cell (address 63) it must walk all 64 cells, 64 steps. The routing tree reached its leaf at step 6.'],
    superpose: ['地址是四个分支的叠加：41、9、33、1。四条青色的路同时往下走，在根开关与第三层开关处分叉，分开后不再共用；到底一共亮 17 个开关，每条路仍只有 6 个。', 'The address is a superposition of four branches: 41, 9, 33 and 1. Four cyan paths run down at once, parting at the root switch and at a third-level switch, never to share again; 17 switches light up in all, and each path still has only 6.'],
    four_loops: ['索引 [0, 0, 0, 0]：四跳都读零号槽，零号槽里写的就是页目录自己的地址 0x1000，箭头四次弯回原处（×4）；读出的仍是页目录 P 自己。', 'Index [0, 0, 0, 0]: all four hops read slot 0, which holds the directory’s own address 0x1000, so the arrow curls back four times (×4); what comes out is still the page directory P itself.'],
    self_map: ['索引 [0, 1]：第一跳踩中零号槽回到 0x1000，第二跳读 P[1] = 0x2000，于是叶页表 T₁ 本身被当作数据读出；对照 [1, 2] 两跳读到的是数据帧 0x9000。', 'Index [0, 1]: the first hop lands on slot 0 and comes back to 0x1000, the second reads P[1] = 0x2000, so the leaf table T₁ itself is read out as data; compare [1, 2], whose two hops reach the data frame 0x9000.'],
    diagonal_hit: ['p = 0x1000，*p = Mem[0x1000][0] = 0x1000：一次解引用，读出的内容就是地址本身。只有写着自己地址的这一格如此，读别的地址仍要一级一级走。', 'p = 0x1000 and *p = Mem[0x1000][0] = 0x1000: one dereference, and what it reads is the address itself. Only this cell, which holds its own address, does that; any other address still takes every level.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.a = p.a; fAddr.set(p.a); S.k = p.k; branchChips.set(String(p.k), true); S.idx = p.idx.slice(); idxChips.set(p.idx.join(','), true);
    setScene(p.scene);
    if (!p.play) return;
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the end of the walk;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖地址、点内存格、换叠加的分支数或页表索引、拖时间轴。随时可以再选一张卡。', 'Free play: drag the address, click a memory cell, change the branches or the page-table index, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const at = (x, y) => { const b = $('cv').getBoundingClientRect(); return { x: b.left + x, y: b.top + y }; };
  window.POINTER_DEBUG = {
    get state() {
      return { scene: S.scene, a: S.a, k: S.k, idx: S.idx.slice(), t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, step: tick(),
        N, depth: depthOf(N), switches: SWITCHES.length, scanSteps: scanSteps(), scanRead: scanRead(), hit: scanRead() >= scanSteps(),
        levels: levelsSet(), active: activeSwitches(), branches: branches(), pathSwitches: allPathSwitches(), hops: walk(S.idx).slice(0, hopsDone()), result: hopsDone() >= S.idx.length ? pageResult() : null };
    },
    switches: () => SWITCHES.map((s) => s.slice()), path: (a) => pathOf(a).map((s) => Object.assign({}, s)), mem: () => JSON.parse(JSON.stringify(MEM)), walk: (idx) => walk(idx),
    seek: (t) => { clock.pause(); clock.set(t); }, scene: (sc, t) => setScene(sc, t), setAddr: (a) => { S.a = a; fAddr.set(a); fitClock(); }, setK: (k) => setK(k), setIdx: (idx) => setIdx(idx),
    point: { cell: (c) => (geo.mem ? at(geo.mem.x + (c + 0.5) * geo.mem.cw, geo.mem.y + geo.mem.h / 2) : null) }
  };
  /** Cover: four superposed paths reaching their leaves while the scan head is a third of the way along. */
  window.TRV_THUMB = () => { S.a = 41; S.k = 4; S.idx = [0, 0]; setScene('tree', n); paint.now(); };
  cards.pick(cards.initial('qram_tree'));   // a chapter may cite another card: ::: {.viz src="pointer-ontology-deref" preset="linear64"}
  booting = false;
  paint();
})();
