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
   The stage has two layers. The exact drawings (memory row, routing tree, page tables, register) are flat, on the 2D
   canvas #flat over the stage. Beside them (a column on the right of a wide stage, a band on top of a narrow one) the
   same state is built as a lit solid with kit.solid, a schematic MODEL: one memory die, the 64 cells folded into an
   8 × 8 array along an H-shaped routing tree, the page tables standing on the other half, the pointer register p
   floating just past one end. #cv only keeps the solid's last frame while its WebGL context rests.
   Read-only probe: POINTER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const setText = (id, value) => { const el = $(id); if (el.textContent !== value) el.textContent = value; };

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

  /* ---------- the die: the same three address spaces as one solid (a schematic MODEL) ----------
     World units, x right, y back, z up, the die centred on the origin. The 64 cells are an 8 × 8 array on the left
     half. The routing tree is folded onto it as an H-tree: even levels split left/right, odd levels back/front, so
     bits 5, 3, 1 of an address give its column and bits 4, 2, 0 its row, and consecutive addresses follow the Z-order
     curve. Switch (ℓ, p) sits at the centre of the cells it routes to. The page directory P, the leaf tables and the
     data frame stand on the right half; the register p floats past the far end of the cell array, its read port
     underneath, so that it hides no cell. */
  const DIE = { hx: 1.86, hy: 0.98, z0: -0.3, inset: 0.1 };
  const ARR = { x0: -1.72, y1: 0.83, pitch: 0.2075 };                 // the 8 × 8 array: x0 … x0 + 8·pitch, y1 … y1 − 8·pitch
  const ZP = { pad: 0.035, bar: 0.06, node: 0.08, run: 0.082, read: 0.075, asked: 0.16, pillar: 0.38 };
  const REG = { x: -2.12, hx: 0.2, hy: 0.3, z0: 0.3, z1: 0.38 };      // the pointer register: centre x, half-extents, bottom, top
  const PORT = [REG.x, 0, REG.z0 - 0.06];                                // its read port, just under it
  const colOf = (a) => (((a >> 5) & 1) << 2) | (((a >> 3) & 1) << 1) | ((a >> 1) & 1);
  const rowOf = (a) => (((a >> 4) & 1) << 2) | (((a >> 2) & 1) << 1) | (a & 1);
  const cellXY = (a) => [ARR.x0 + (colOf(a) + 0.5) * ARR.pitch, ARR.y1 - (rowOf(a) + 0.5) * ARR.pitch];
  /** Switch (ℓ, p) at the mean of the cells under it (the centre of its block); level n is the cell itself. */
  const SW3 = new Map();
  for (const [l, p] of SWITCHES) {
    const span = 1 << (n - l); let x = 0, y = 0;
    for (let a = p * span; a < (p + 1) * span; a++) { const c = cellXY(a); x += c[0]; y += c[1]; }
    SW3.set(`${l}:${p}`, [x / span, y / span]);
  }
  const nodeXY = (l, p) => (l === n ? cellXY(p) : SW3.get(`${l}:${p}`));
  /** A box as five faces (no bottom), appended to a vertex/face/colour list. */
  function box3(M, x0, x1, y0, y1, z0, z1, col) {
    const b = M.vertices.length;
    M.vertices.push([x0, y0, z0], [x1, y0, z0], [x1, y1, z0], [x0, y1, z0], [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]);
    M.faces.push([b + 4, b + 5, b + 6, b + 7], [b, b + 1, b + 5, b + 4], [b + 1, b + 2, b + 6, b + 5], [b + 2, b + 3, b + 7, b + 6], [b + 3, b, b + 4, b + 7]);
    for (let i = 0; i < 5; i++) M.colors.push(col);
  }
  const mesh = () => ({ vertices: [], faces: [], colors: [] });
  /** The die: a slab whose sides slope in by `inset` towards the top face z = 0. */
  const DIE_MESH = (() => {
    const { hx, hy, z0, inset: i } = DIE;
    return { vertices: [[-hx, -hy, z0], [hx, -hy, z0], [hx, hy, z0], [-hx, hy, z0], [-hx + i, -hy + i, 0], [hx - i, -hy + i, 0], [hx - i, hy - i, 0], [-hx + i, hy - i, 0]],
      faces: [[4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7], [0, 3, 2, 1]] };
  })();
  /** The H-tree conduits (every edge of the 63 switches, the last level down to the cells) and the switch housings. */
  const BUS_MESH = (() => {
    const M = mesh(), w = 0.011, c = null;          // coloured when drawn (the palette follows the theme)
    for (const [l, p] of SWITCHES) {
      const A = nodeXY(l, p);
      for (const ch of [0, 1]) {
        const B = nodeXY(l + 1, 2 * p + ch);
        box3(M, Math.min(A[0], B[0]) - w, Math.max(A[0], B[0]) + w, Math.min(A[1], B[1]) - w, Math.max(A[1], B[1]) + w, ZP.pad, ZP.bar, c);
      }
      box3(M, A[0] - 0.03, A[0] + 0.03, A[1] - 0.03, A[1] + 0.03, ZP.pad, ZP.node, c);
    }
    return M;
  })();
  /** The page tables on the right half: P and T₁ as four slots each (slot 0 at the back), T₂, T₃ and D₁,₂ as blocks. */
  const TB3 = (() => {
    const top = 0.83, sp = 0.24, g = 0.014;
    const slots = (x0, x1) => Array.from({ length: TBL }, (_, k) => ({ x0, x1, y0: top - (k + 1) * sp + g, y1: top - k * sp - g, z1: 0.2 }));
    return { [B0]: { slots: slots(0.26, 0.72) }, 0x2000: { slots: slots(1.14, 1.6) },
      0x3000: { box: { x0: 1.14, x1: 1.6, y0: -0.36, y1: -0.2, z1: 0.15 } }, 0x4000: { box: { x0: 1.14, x1: 1.6, y0: -0.58, y1: -0.42, z1: 0.15 } },
      0x9000: { box: { x0: 1.14, x1: 1.6, y0: -0.83, y1: -0.64, z1: 0.15 } } };
  })();
  const topOf = (r) => [(r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2, r.z1];
  /** Where a pointer to the table or frame b lands: the top of its slot 0 (its base address), or the top of the block. */
  const anchor3 = (b) => (TB3[b].slots ? topOf(TB3[b].slots[0]) : topOf(TB3[b].box));
  const POINTERS = [[B0, 0], [B0, 1], [B0, 2], [B0, 3], [0x2000, 2]];   // the pointers the flat table draws too
  const bez = (P0, C, P1, k) => Array.from({ length: k + 1 }, (_, i) => { const t = i / k, u = 1 - t; return [0, 1, 2].map((d) => u * u * P0[d] + 2 * u * t * C[d] + t * t * P1[d]); });
  /** The loop of P[0]: out of the top of slot 0, over its back corner (a diagonal plane, so that it reads from any
      side) and down into the same slot. */
  const LOOP = (() => {
    const s = TB3[B0].slots[0], c = topOf(s), d = [-Math.SQRT1_2, Math.SQRT1_2, 0], at = (u, z) => [c[0] + d[0] * u, c[1] + d[1] * u, c[2] + z];
    const P0 = at(-0.1, 0), P1 = at(-0.1, 0.52), P2 = at(0.6, 0.46), P3 = at(0.1, 0.03);
    return { pts: Array.from({ length: 33 }, (_, q) => { const t = q / 32, u = 1 - t; return [0, 1, 2].map((k) => u * u * u * P0[k] + 3 * u * u * t * P1[k] + 3 * u * t * t * P2[k] + t * t * t * P3[k]); }), apex: at(0.32, 0.5) };
  })();
  /** The pointer of slot (b, i) as a curve: a lifted arc to its target, or for P[0] the loop back into slot 0 itself. */
  function pointerPts(b, i) {
    if (b === B0 && i === 0) return LOOP.pts;
    const s = topOf(TB3[b].slots[i]), e = anchor3(MEM[b][i]), d = Math.hypot(e[0] - s[0], e[1] - s[1]);
    return bez(s, [(s[0] + e[0]) / 2, (s[1] + e[1]) / 2, Math.max(s[2], e[2]) + 0.2 + 0.14 * d], e, 24);
  }
  /** The register feed: out of the read port, across and down onto the root of the H-tree. */
  const FEED = (() => { const r = nodeXY(0, 0); return bez(PORT, [r[0], r[1], PORT[2]], [r[0], r[1], ZP.run], 16); })();
  /** The scan head: over the last cell read (address min(t, a + 1) − 1), sliding on to the next between ticks. */
  function headXY() {
    const u = clamp(Math.min(clock.t, scanSteps()) - 1, 0, N - 1), i0 = Math.floor(u), f = u - i0, A = cellXY(i0), B = cellXY(Math.min(N - 1, i0 + 1));
    return [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f];
  }

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
        ring(ctx, x0, Y(l0), rNode * 2, P.amber, lw(1.6), treeA); geo.amber++;
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
    geo.amber++;
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
    // the rows as tall as the box allows: T₁ (a 22 px head and 4 rows) and the three blocks under it (4.2 rows) end inside it
    const colW = clamp(box.w * 0.3, 54, 150), top0 = Math.min(28, Math.max(20, box.h * 0.12)), sh = clamp((box.h - top0 - 26) / 8.2, 12, 34), fs = clamp(sh * 0.48, 8.5, 12.5);
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
      if (isCur(b, k)) { geo.amber++; ctx.globalAlpha = A; ctx.strokeStyle = P.amber; ctx.lineWidth = lw(2); ctx.shadowColor = P.amber; ctx.shadowBlur = 10; ctx.strokeRect(r.x + 1, y + 1, r.w - 2, sh - 2); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
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
      if (r) { geo.amber++; const hh = MEM[v] ? 22 : r.h; ctx.globalAlpha = focus ? 1 : 0.35; ctx.strokeStyle = P.amber; ctx.lineWidth = lw(2.2); ctx.shadowColor = P.amber; ctx.shadowBlur = 12; ctx.strokeRect(r.x - 2, r.y - 2, r.w + 4, hh + 4); ctx.shadowBlur = 0; ctx.globalAlpha = 1; }
    }
    geo.table = blocks;
  }

  /* ---------- the pointer register beside the table: p and *p side by side ---------- */
  /** For a one-hop walk: the register p (the base the hop reads from) against *p (the value it reads), then an
      ordinary pointer for contrast, p = addr(T₁) against *p = T₁[0]. Both pairs are looked up in MEM, not typed in. */
  function drawRegister(ctx, box) {
    const hop = walk(S.idx)[0], done = hopsDone() >= 1;
    const other = { base: 0x2000, slot: 0, value: MEM[0x2000][0] };
    const fs = clamp(box.w / 26, 10, 14), bh = clamp(fs * 2.6, 28, 40), bw = clamp(box.w * 0.36, 86, 170);
    const cx = box.x + box.w / 2, rows = [];
    const pair = (y, h, A, cap) => {
      const same = h.base === h.value, xl = cx - bw - fs * 1.4, xr = cx + fs * 1.4;
      text(ctx, cap, box.x + 4, y - bh * 0.5 - fs * 2.1, P.dim, { size: fs * 0.85, face: 'body', base: 'bottom' });
      for (const [x, k, v] of [[xl, 'p', hex(h.base)], [xr, `*p = ${nameOf(h.base)}[${h.slot}]`, done || h !== hop ? hex(h.value) : '?']]) {
        ctx.globalAlpha = A; ctx.strokeStyle = P.lineHot; ctx.lineWidth = lw(1.2); ctx.strokeRect(x + 0.5, y - bh / 2 + 0.5, bw - 1, bh - 1); ctx.globalAlpha = 1;
        text(ctx, k, x + bw / 2, y - bh / 2 - 3, A < 1 ? P.faint : P.dim, { align: 'center', base: 'bottom', size: fs * 0.82 });
        ctx.globalAlpha = A; text(ctx, v, x + bw / 2, y, P.ink, { align: 'center', size: fs * 1.15, weight: 600 }); ctx.globalAlpha = 1;
      }
      const eq = done || h !== hop ? (same ? '=' : '≠') : '';
      ctx.globalAlpha = A; text(ctx, eq, cx, y, same ? P.cyan : P.dim, { align: 'center', size: fs * 1.9, weight: 700 }); ctx.globalAlpha = 1;
      rows.push({ p: h.base, star: h.value, sign: eq });
    };
    const y1 = box.y + Math.max(box.h * 0.3, bh / 2 + fs * 3.4), y2 = Math.min(box.y + box.h - bh / 2 - 2, y1 + bh + fs * 4.2);
    pair(y1, hop, 1, L('指针寄存器 p 与它读出的 *p', 'the pointer register p and what it reads, *p'));
    pair(y2, other, 0.55, L('对照：一枚普通指针', 'for contrast: an ordinary pointer'));
    geo.reg = rows;
  }

  /* ---------- where the solid goes ----------
     Wide stage: a column on the right, from under the scene chips down to the legend; the title wraps short of it,
     and the flat drawings fill the rest, stacked when they are narrow. Narrow stage: a band on top, under the title,
     the flat drawings below. The size of the solid does not depend on the title, so it holds still while the title
     changes from card to card. */
  let LAY = { mode: 'column', orient: 'deep', r3: { x: 0, y: 0, w: 1, h: 1 }, cx: 0, cy: 0, unit: 1, pitch: 0.8 }, camKey = '';
  /** World points that bound the model: the die, the tallest pillar and arc, the register. */
  const HULL = (() => {
    const out = [], corners = (x0, x1, y0, y1, zs) => { for (const x of [x0, x1]) for (const y of [y0, y1]) for (const z of zs) out.push([x, y, z]); };
    corners(-DIE.hx, DIE.hx, -DIE.hy, DIE.hy, [DIE.z0, 0]);                          // the slab
    corners(ARR.x0, ARR.x0 + 8 * ARR.pitch, ARR.y1 - 8 * ARR.pitch, ARR.y1, [ZP.pillar + 0.14]);   // the pillars and the beads on them
    corners(-0.2, 1.7, -0.85, 0.9, [0.7]);                                          // the pointer arcs and the loop over the tables
    corners(REG.x - REG.hx, REG.x + REG.hx, -REG.hy, REG.hy, [REG.z0 - 0.1, REG.z1]);   // the register
    return out;
  })();
  const ORIENT = { deep: -Math.PI / 2 + 0.07, wide: -0.16 };   // default yaw: the long side of the die runs away from, or across, the viewer
  /** Fit the model into the rectangle r (leaving `cap` pixels for the caption below it): the pitch that shows the most of
      the die's top face, and the scale and centre that put the model's outline in the middle of r. */
  function fit(r, cap) {
    const orient = r.w / r.h >= 1.25 ? 'wide' : 'deep', yaw = ORIENT[orient], m = 8;
    let best = null;
    for (let pitch = 0.62; pitch <= 0.8601; pitch += 0.04) {
      const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch), R = [cy, -sy, 0], U = [sy * sp, cy * sp, cp];
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const v of HULL) { const X = v[0] * R[0] + v[1] * R[1], Y = v[0] * U[0] + v[1] * U[1] + v[2] * U[2]; x0 = Math.min(x0, X); x1 = Math.max(x1, X); y0 = Math.min(y0, Y); y1 = Math.max(y1, Y); }
      const unit = Math.max(10, Math.min((r.w - 2 * m) / (x1 - x0), (r.h - 2 * m - cap) / (y1 - y0))), score = unit * unit * sp * (1 - 0.8 * (pitch - 0.62));
      if (!best || score > best.score + 1e-9) best = { score, pitch, unit, cx: r.x + r.w / 2 - unit * (x0 + x1) / 2, cy: r.y + (r.h - cap) / 2 + unit * (y0 + y1) / 2 };
    }
    return { orient, yaw, pitch: best.pitch, unit: best.unit, cx: best.cx, cy: best.cy };
  }
  /** A cited figure in a phone's frame (about 334 × 500): style.css tightens the same frames with the same query. */
  const compact = () => TRV.figure && !TRV.still && window.matchMedia('(max-width: 480px)').matches;
  function layout(W, H) {
    const stage = $('stage'), st = stage.getBoundingClientRect(), below = (el) => (el && el.getClientRects().length ? el.getBoundingClientRect().bottom - st.top : 0);
    if (TRV.thumbMode) return { mode: 'cover', r3: { x: W * 0.02, y: H * 0.05, w: W * 0.42, h: H * 0.9 }, cap: 0 };
    if (compact()) {   // a phone's cited figure: the die in a band under the title, the drawing the card is about under it
      stage.classList.remove('col3');
      // the die takes what the drawing under it can spare: the page tables need 146 px, the routing tree over the memory row 116
      const top = below($('hudBig').parentElement) + 6, bottom = $('legend').offsetHeight + 22, ah = Math.max(260, H - top - bottom);
      const h3 = Math.round(S.scene === 'table' ? Math.min(ah * 0.52, ah - 146) : Math.min(ah * 0.58, ah - 116));
      return { mode: 'band', compact: true, r3: { x: 10, y: top - 2, w: W - 20, h: h3 }, cap: 14, b2: { x: 14, y: top + h3 + 6, w: W - 28, h: ah - h3 - 6 } };
    }
    const wide = W - 36 >= 560, w3 = clamp(0.85 * (H - 60), 220, W * 0.4), x3 = W - w3 - 8;   // a short stage needs a narrower column
    stage.classList.toggle('col3', wide);
    stage.style.setProperty('--pod-hud-max', `${Math.max(160, x3 - 34)}px`);
    const top = Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 8, bottom = Math.max(18, $('legend').offsetHeight + 18);
    if (wide) {
      const y3 = below($('sceneChips')) + 6;
      return { mode: 'column', r3: { x: x3, y: y3, w: w3, h: H - bottom + 4 - y3 }, cap: 18, b2: { x: 18, y: top, w: x3 - 14 - 18, h: Math.max(80, H - top - bottom) } };
    }
    const h3 = clamp(Math.min(H * 0.34, H - 330), 90, 240);
    return { mode: 'band', r3: { x: 10, y: top - 4, w: W - 20, h: h3 }, cap: 16, b2: { x: 18, y: top + h3 + 2, w: W - 36, h: Math.max(80, H - top - bottom - h3 - 2) } };
  }

  /* ---------- the solid ---------- */
  let G3 = null;                              // what the last frame put on the die (for the probe)
  function drawSolid(lay) {
    const sc = solid, table = S.scene === 'table', focusScan = S.scene === 'scan', t = clock.t, m = levelsSet();
    const read = table ? 0 : scanRead(), hit = !table && read >= scanSteps(), delivered = new Set(!table && m >= n ? branches() : []);
    const rec = { cells: [], switches: [], paths: [], fronts: [], head: null, arcs: [], landing: null, loopWalks: 0, port: PORT.slice() };
    sc.begin();
    sc.poly('die', DIE_MESH, { color: P.faint });
    sc.poly('bus', BUS_MESH, { color: P.lineHot, edges: false });
    // the cells: raised where the tree has delivered (cyan pillars), the cell asked for and the cells the scan has read (ink)
    const C = mesh(), h = ARR.pitch * 0.4;
    for (let a = 0; a < N; a++) {
      const [x, y] = cellXY(a);
      let z = ZP.pad, col = P.dim, kind = 'idle';
      if (delivered.has(a)) { z = ZP.pillar; col = P.cyan; kind = 'delivered'; }
      else if (!table && a === S.a) { z = hit ? ZP.pillar * 0.8 : ZP.asked; col = P.ink; kind = 'asked'; }
      else if (a < read) { z = ZP.read; col = P.ink; kind = 'read'; }
      box3(C, x - h, x + h, y - h, y + h, 0, z, col);
      rec.cells.push({ a, x, y, z, kind });
    }
    sc.poly('cells', C, { colors: C.colors });
    // the register p, its read port underneath (hidden by the register from above)
    const Rg = mesh();
    box3(Rg, REG.x - REG.hx, REG.x + REG.hx, -REG.hy, REG.hy, REG.z0, REG.z1, P.dim);
    sc.poly('reg', Rg, { colors: Rg.colors });
    sc.bead(PORT, { key: 'port', color: P.dim, r: 3, glow: 0.2 });
    // the page tables: walked slots cyan
    const hops = walk(S.idx), done = table ? hopsDone() : 0, cur = table && done < hops.length ? done : -1;
    const walked = (b, i) => hops.some((x, q) => q < done && x.base === b && x.slot === i);
    const T3 = mesh();
    for (const [b, tb] of Object.entries(TB3)) {
      if (tb.slots) tb.slots.forEach((r, i) => box3(T3, r.x0, r.x1, r.y0, r.y1, 0, r.z1, walked(+b, i) ? P.cyan : P.dim));
      else box3(T3, tb.box.x0, tb.box.x1, tb.box.y0, tb.box.y1, 0, tb.box.z1, P.dim);
    }
    sc.poly('tables', T3, { colors: T3.colors });
    for (const [b, i] of POINTERS) {
      const pts = pointerPts(b, i), on = walked(b, i), e = pts[pts.length - 1];
      if (on) { sc.tube(`ptr${b}:${i}`, pts.slice(0, -2), { color: P.cyan, width: 3.2, glow: 0.35 }); sc.arrow(pts[pts.length - 4], e, { color: P.cyan, width: 3, headSize: 9 }); }
      else { sc.line(pts.slice(0, -2), { color: P.faint, width: 1.3 }); sc.arrow(pts[pts.length - 4], e, { color: P.faint, width: 1.3, headSize: 7 }); }
      rec.arcs.push({ base: b, slot: i, walked: on, walks: hops.filter((x, q) => q < done && x.base === b && x.slot === i).length });
    }
    rec.loopWalks = rec.arcs[0].walks;
    if (table) {      // the amber dereference: from the port to the slot being read now, or to what the walk has read
      const land = cur >= 0 ? topOf(TB3[hops[cur].base].slots[hops[cur].slot]) : anchor3(hops.length ? hops[hops.length - 1].value : B0);
      const at = [land[0], land[1], land[2] + 0.04], beam = bez(PORT, [(PORT[0] + at[0]) / 2, (PORT[1] + at[1]) / 2, PORT[2] + 0.12], at, 24);
      sc.tube('beam', beam.slice(0, -3), { color: P.amber, width: 2.6, glow: 0.6 });
      sc.arrow(beam[beam.length - 5], at, { color: P.amber, width: 2.4, headSize: 11 });
      sc.bead(at, { key: 'now', color: P.amber, r: 4.6, glow: 1 });
      rec.landing = cur >= 0 ? { at, base: hops[cur].base, slot: hops[cur].slot } : { at, block: hops.length ? hops[hops.length - 1].value : B0 };
    } else {          // the routing paths: from the port down the feed onto the root, then switch by switch
      const front = Math.min(t, n);
      branches().forEach((a, q) => {
        const path = pathOf(a), pts = t > 0 ? FEED.slice() : [];
        for (let l = 1; l <= m; l++) { const [x, y] = nodeXY(l, l === n ? a : path[l].p); pts.push([x, y, l === n ? ZP.read : ZP.run]); }
        if (pts.length >= 2) sc.tube(`br${q}`, pts, { color: P.cyan, width: focusScan ? 2.2 : 3.2, glow: 0.35 });
        rec.paths.push({ a, nodes: pts.slice(FEED.length - 1) });   // the root and the switches set, ending at the cell once delivered
        if (t < n) {  // the routing front between two levels
          const l0 = Math.floor(front), f = front - l0, A = nodeXY(l0, path[l0].p), B = nodeXY(l0 + 1, l0 + 1 === n ? a : path[l0 + 1].p);
          const at = [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, ZP.run + 0.03];
          sc.bead(at, { key: `front${q}`, color: P.amber, r: focusScan ? 3.4 : 4.4, glow: 1 });
          rec.fronts.push({ a, at, l0, f });
        }
      });
      if (t <= 0) sc.line(FEED, { color: P.faint, width: 1.2 });
      for (const [l, p] of activeSwitches()) {
        const [x, y] = nodeXY(l, p), at = [x, y, ZP.run + 0.012];
        sc.bead(at, { key: `sw${l}:${p}`, color: P.cyan, r: focusScan ? 2.6 : 3.4, glow: 0.6 });
        rec.switches.push({ l, p, at });
      }
      // the scan: the head over the last cell read, and the Z-order walk through the cells read so far
      const [hx, hy] = headXY(), hz = (rec.cells[Math.min(N - 1, Math.max(0, Math.round(Math.min(t, scanSteps()) - 1)))].z) + 0.09;
      sc.bead([hx, hy, hz], { key: 'head', color: P.amber, r: focusScan ? 5.4 : 3.6, glow: 1 });
      rec.head = { at: [hx, hy, hz], cell: Math.max(0, Math.min(read, scanSteps()) - 1) };
      if (focusScan && read > 1) sc.line(Array.from({ length: read }, (_, c) => { const [x, y] = cellXY(c); return [x, y, ZP.read + 0.014]; }), { color: P.ink, width: 1.3 });
    }
    // labels: what the die is, the register, the tables
    if (lay.cap) sc.tag('cap', [lay.r3.x + lay.r3.w / 2, lay.r3.y + lay.r3.h - 9], L('示意模型：一块存储芯片', 'Schematic model: one memory die'), 'raw', { screen: true });
    sc.tag('reg', [REG.x, 0, REG.z1], table ? 'p' : S.k === 1 ? `a = ${S.a}` : L(`a：${S.k} 个分支`, `a: ${S.k} branches`), 'num', { dy: -12, occlude: false });
    sc.tag('P', [0.49, 0.35, 0.42], 'P', table ? 'ink' : '');
    sc.tag('T1', [1.37, 0.35, 0.42], 'T₁', table ? 'ink' : '');
    sc.tag('D', [1.37, -0.735, 0.34], 'D₁,₂', table ? 'ink' : '');
    // the count of the loop over its apex, or beside it (a phone's figure, where the title is just above the die)
    if (table && rec.loopWalks) sc.tag('loops', LOOP.apex, `×${rec.loopWalks}`, 'cy', lay.compact ? { dx: 18, dy: 0 } : { dy: -12 });
    sc.end();
    G3 = rec;
  }

  /* ---------- the stage ---------- */
  function drawStage() {
    const g0 = kit.plot($('flat'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx, W = g0.W, H = g0.H;
    geo.amber = 0;
    const lay = layout(W, H), f = fit(lay.r3, lay.cap), key = `${lay.mode}:${f.orient}:${f.pitch.toFixed(2)}`;
    if (key !== camKey) { camKey = key; solid.cam.yaw = f.yaw; solid.cam.pitch = f.pitch; solid.cam.zoom = 1; }
    LAY = Object.assign({ W, H }, lay, f);
    drawSolid(lay);
    geo.panels = [];
    if (TRV.thumbMode) {     // wordless cover: the die beside the lit routing paths over the memory row and the self-mapped directory
      const glow = ctx.createRadialGradient(W * 0.72, H * 0.5, 0, W * 0.72, H * 0.5, W * 0.28);
      glow.addColorStop(0, TRV.alpha(P.cyan, 0.08)); glow.addColorStop(1, TRV.alpha(P.cyan, 0)); ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
      drawMemory(ctx, { x: W * 0.47, y: H * 0.08, w: W * 0.32, h: H * 0.84 }, false);
      drawTable(ctx, { x: W * 0.81, y: H * 0.16, w: W * 0.18, h: H * 0.68 }, false);
      return;
    }
    const bx = lay.b2;
    geo.mem = null; geo.reg = null; geo.tree = S.scene !== 'table';
    // every flat panel's box is recorded: the solid stays out of them
    const panel = (what, draw) => (c, b, w) => { geo.panels.push(Object.assign({ what }, b)); draw(c, b, w); };
    const mem = panel('memory', drawMemory), tab = panel('table', drawTable), reg = panel('register', drawRegister);
    if (lay.compact) {                 // a phone's figure: only the drawing the scene is about (the rest is in the full laboratory)
      if (S.scene !== 'table') mem(ctx, bx, true);
      else if (S.idx.length === 1) reg(ctx, bx);
      else tab(ctx, bx, true);
      return;
    }
    if (S.scene === 'table') {         // the page table is a notation of its own: the routing tree and scan bus fold away
      const one = S.idx.length === 1, wide = bx.w >= 560;
      if (one && wide) {
        const rw = bx.w * 0.42;
        reg(ctx, { x: bx.x, y: bx.y, w: rw, h: bx.h });
        tab(ctx, { x: bx.x + rw + 16, y: bx.y, w: bx.w - rw - 16, h: bx.h }, true);
      } else if (one) {
        const rh = Math.min(bx.h * 0.46, 200);
        reg(ctx, { x: bx.x, y: bx.y, w: bx.w, h: rh });
        tab(ctx, { x: bx.x, y: bx.y + rh + 4, w: bx.w, h: bx.h - rh - 4 }, true);
      } else {
        const tw = Math.min(bx.w, 620);
        tab(ctx, { x: bx.x + (bx.w - tw) / 2, y: bx.y, w: tw, h: bx.h }, true);
      }
      return;
    }
    if (bx.w >= 560) {
      const mw = bx.w * 0.6;
      mem(ctx, { x: bx.x, y: bx.y, w: mw, h: bx.h }, true);
      tab(ctx, { x: bx.x + mw + 16, y: bx.y, w: bx.w - mw - 16, h: bx.h }, true);
    } else {
      const mh = Math.max(bx.h * 0.4, Math.min(bx.h * 0.52, bx.h - 149));   // the table keeps the height its seven rows need
      mem(ctx, { x: bx.x, y: bx.y, w: bx.w, h: mh }, true);
      tab(ctx, { x: bx.x, y: bx.y + mh + 4, w: bx.w, h: bx.h - mh - 4 }, true);
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
  const LEGEND_TABLE = [['cy', '走过的跳', 'hops walked'], ['am', '此刻读到的槽或表', 'the slot or table being read now']];
  const setLabel = (id, zh, en) => { const h = `<span class="zh">${zh}</span><span class="en">${en}</span>`; if ($(id)._h !== h) { $(id).innerHTML = h; $(id)._h = h; } };
  const bin = (a) => a.toString(2).padStart(n, '0');
  const idxStr = () => `[${S.idx.join(', ')}]`;
  function drawText() {
    const s = tick(), read = scanRead(), act = activeSwitches().length, hops = walk(S.idx), done = hopsDone(), v = pageResult();
    let big, hud, note;
    if (S.scene === 'scan') {
      big = L(`扫描 · 第 ${Math.min(s, scanSteps())} 步`, `Scan · step ${Math.min(s, scanSteps())}`);
      hud = read >= scanSteps() ? L(`读到地址 ${S.a}：它是第 ${S.a + 1} 格，恰好用了 ${S.a + 1} 步`, `address ${S.a} reached: it is cell ${S.a + 1}, in exactly ${S.a + 1} steps`) : L(`读头一拍读一格，已读 ${read} 格，要读到第 ${S.a + 1} 格`, `one cell per tick, ${read} read so far, cell ${S.a + 1} to go for`);
      const k = scanSteps(), d = depthOf(N);   // scan: cell k = a + 1 at step k; tree: the leaf at step d = log₂N
      note = S.a === N - 1 ? L('最后一格要把整张表走一遍：N = 64 步。', 'The last cell takes a walk over the whole table: N = 64 steps.')
        : k < d ? L(`读到第 ${k} 格（地址 ${S.a}）扫描只要 ${k} 步，比路由树的 ${d} 层还早：表头附近，扫描反而先到。树赢在最坏情形：任何地址都只要 ${d} 步，扫描最坏要 N = ${N} 步。`, `Scanning reaches cell ${k} (address ${S.a}) in ${k} steps, before the tree's ${d} levels: near the head of the table the scan arrives first. The tree wins in the worst case: every address takes ${d} steps, a scan up to N = ${N}.`)
          : k === d ? L(`读到第 ${k} 格（地址 ${S.a}）扫描要 ${k} 步，与路由树的 ${d} 层同时到达；再往后的每一格，扫描都比树晚。`, `Scanning reaches cell ${k} (address ${S.a}) in ${k} steps, at the same step as the tree's ${d} levels; for every later cell the scan arrives after the tree.`)
            : L(`读到第 ${k} 格（地址 ${S.a}）扫描要 ${k} 步；路由树在第 ${d} 步就已走到叶子，早 ${k - d} 步。`, `Scanning to cell ${k} (address ${S.a}) takes ${k} steps; the tree reached its leaf at step ${d}, ${k - d} steps earlier.`);
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
    setText('hudBig', big); setText('hudSub', hud); $('roNote').textContent = note;
    $('pillSteps').querySelector('strong').textContent = String(s);
    const leg = (S.scene === 'table' ? LEGEND_TABLE : LEGEND).map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    $('oAddr').textContent = String(S.a);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(S.scene); });
  }

  /* the solid stage: the camera turns on any drag that does not start on a memory cell of the flat drawing; its
     placement on the stage (cx, cy, radius) is read from the layout of the last frame */
  const solid = kit.solid($('stage'), {
    canvas: $('cv'), onChange: () => paint(), onPick: (ev) => cellAt(ev) != null,
    get cx() { return LAY.W ? LAY.cx / LAY.W : 0.5; }, get cy() { return LAY.H ? LAY.cy / LAY.H : 0.5; },
    get radius() { return LAY.W ? LAY.unit / Math.min(LAY.W, LAY.H) : 0.36; }
  });
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

  /* ---------- direct manipulation: click a memory cell (flat row or die) ---------- */
  const cellAt = (ev) => {
    const g = geo.mem; if (!g) return null;
    const b = $('flat').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (x < g.x || x >= g.x + g.w || y < g.y - 8 || y > g.y + g.h + 14) return null;
    return Math.floor((x - g.x) / g.cw);
  };
  /** The cell of the die under the pointer (a face of the cell array; five faces per cell, in address order). */
  const dieCellAt = (ev) => { const h = solid.hit(ev); return h && h.id === 'cells' && h.face != null ? Math.floor(h.face / 5) : null; };
  let downAt = null;
  $('stage').addEventListener('pointerdown', (ev) => { downAt = [ev.clientX, ev.clientY]; });
  $('stage').addEventListener('pointermove', (ev) => { if (!ev.buttons) $('stage').classList.toggle('on-cell', cellAt(ev) != null || dieCellAt(ev) != null); });
  $('stage').addEventListener('click', (ev) => {
    if (ev.target.closest('button, a, input, .chip')) return;
    if (downAt && Math.hypot(ev.clientX - downAt[0], ev.clientY - downAt[1]) > 4) return;   // a drag turned the die
    const c = cellAt(ev) ?? dieCellAt(ev);
    if (c == null) return;
    leave(); S.a = c; fAddr.set(c); if (S.scene === 'table') setScene('tree', 0); else fitClock(0); clock.play();
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    qram_tree: { scene: 'tree', a: 41, k: 1, idx: [1, 2], play: true, still: 'end' },
    linear64: { scene: 'scan', a: 63, k: 1, idx: [1, 2], play: true, still: 'end' },
    superpose: { scene: 'tree', a: 41, k: 4, idx: [1, 2], play: true, still: 'end' },
    four_loops: { scene: 'table', a: 41, k: 1, idx: [0, 0, 0, 0], play: true, still: 'end' },
    self_map: { scene: 'table', a: 41, k: 1, idx: [0, 1], play: true, still: 'end' },
    diagonal_hit: { scene: 'table', a: 41, k: 1, idx: [0], play: true, still: 'end' }
  };
  const NOTES = {
    qram_tree: ['地址 41 = 101001₂ 从树根进来，每一拍按一位拨一层开关：六拍后青色的路通到第 42 格，63 个开关里只亮这 6 个。同一时刻，琥珀色的扫描读头才读过 6 格。', 'Address 41 = 101001₂ enters at the root and each tick sets one level by one bit: after six ticks the cyan path reaches cell 42, and only these 6 of the 63 switches light up. At the same moment the amber scan head has read just 6 cells.'],
    linear64: ['读头沿着总线一拍读一格，读过的格变亮；要读最后一格（地址 63），它得把 64 格全部走一遍，用 64 步。路由树在第 6 步就已到达叶子。', 'The head reads one cell per tick along the bus, and the cells it has read light up; to read the last cell (address 63) it must walk all 64 cells, 64 steps. The routing tree reached its leaf at step 6.'],
    superpose: ['地址是四个分支的叠加：41、9、33、1。四条青色的路同时往下走，在根开关与第三层开关处分叉，分开后不再共用；到底一共亮 17 个开关，每条路仍只有 6 个。', 'The address is a superposition of four branches: 41, 9, 33 and 1. Four cyan paths run down at once, parting at the root switch and at a third-level switch, never to share again; 17 switches light up in all, and each path still has only 6.'],
    four_loops: ['索引 [0, 0, 0, 0]：四跳都读零号槽，零号槽里写的就是页目录自己的地址 0x1000，箭头四次弯回原处（×4）；读出的仍是页目录 P 自己。', 'Index [0, 0, 0, 0]: all four hops read slot 0, which holds the directory’s own address 0x1000, so the arrow curls back four times (×4); what comes out is still the page directory P itself.'],
    self_map: ['索引 [0, 1]：第一跳踩中零号槽回到 0x1000，第二跳读 P[1] = 0x2000，于是叶页表 T₁ 本身被当作数据读出；对照 [1, 2] 两跳读到的是数据帧 0x9000。', 'Index [0, 1]: the first hop lands on slot 0 and comes back to 0x1000, the second reads P[1] = 0x2000, so the leaf table T₁ itself is read out as data; compare [1, 2], whose two hops reach the data frame 0x9000.'],
    diagonal_hit: ['p = 0x1000，*p = Mem[0x1000][0] = 0x1000：左边指针寄存器 p 与它读出的 *p 并排，中间是青色的“=”——一次解引用，读出的内容就是地址本身。下面对照的普通指针 p = 0x2000 读出 T₁[0] = 0x7000，两数不等：只有写着自己地址的这一格如此，读别的地址仍要一级一级走。', 'p = 0x1000 and *p = Mem[0x1000][0] = 0x1000: on the left the pointer register p and what it reads, *p, stand side by side with a cyan = sign between them; one dereference, and what it reads is the address itself. The ordinary pointer below for contrast, p = 0x2000, reads T₁[0] = 0x7000, and the two differ: only the cell that holds its own address does this; any other address still takes every level.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.a = p.a; fAddr.set(p.a); S.k = p.k; branchChips.set(String(p.k), true); S.idx = p.idx.slice(); idxChips.set(p.idx.join(','), true);
    setScene(p.scene);
    if (!p.play) return;
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the end of the walk;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.still === 'end' ? clock.max : p.still); return; }
    clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  // A cited figure keeps its short note whole; detailed explanations remain in the full laboratory.
  const FIGURE_NOTES = {
    "qram_tree": ["地址 41 沿六级树走六步到叶子，63 个开关只亮六个。", "Address 41 reaches its leaf in 6 steps, lighting 6 of 63 switches."],
    "linear64": ["顺序读到地址 63 要走 64 步，同一规模的路由树只需六步。", "Reading address 63 sequentially takes 64 steps; the routing tree takes 6."],
    "superpose": ["四个地址叠加共点亮 17 个开关，每条路径仍只有六级。", "Four address branches light 17 switches in all; each path still has 6 levels."],
    "four_loops": ["索引 [0,0,0,0] 四次返回 0x1000，读出的仍是页目录自己。", "Index [0,0,0,0] loops to 0x1000 four times, returning the directory itself."],
    "self_map": ["索引 [0,1] 先返回本页，再读出叶页表 T₁ 自身作为数据。", "Index [0,1] first returns to this page, then reads the leaf table T₁ as data."],
    "diagonal_hit": ["p = *p = 0x1000：这一格恰好保存自身地址，一次解引用即返回。", "p = *p = 0x1000: this cell holds its own address and returns it in one read."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? FIGURE_NOTES : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖地址、点内存格、换叠加的分支数或页表索引、拖时间轴。随时可以再选一张卡。', 'Free play: drag the address, click a memory cell, change the branches or the page-table index, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const at = (x, y) => { const b = $('flat').getBoundingClientRect(); return { x: b.left + x, y: b.top + y }; };
  window.POINTER_DEBUG = {
    get state() {
      return { scene: S.scene, a: S.a, k: S.k, idx: S.idx.slice(), t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, step: tick(),
        N, depth: depthOf(N), switches: SWITCHES.length, scanSteps: scanSteps(), scanRead: scanRead(), hit: scanRead() >= scanSteps(),
        levels: levelsSet(), active: activeSwitches(), branches: branches(), pathSwitches: allPathSwitches(), hops: walk(S.idx).slice(0, hopsDone()), result: hopsDone() >= S.idx.length ? pageResult() : null,
        treeShown: !!geo.tree, register: geo.reg ? geo.reg.map((r) => Object.assign({}, r)) : null, amberMarks: geo.amber || 0 };
    },
    switches: () => SWITCHES.map((s) => s.slice()), path: (a) => pathOf(a).map((s) => Object.assign({}, s)), mem: () => JSON.parse(JSON.stringify(MEM)), walk: (idx) => walk(idx),
    seek: (t) => { clock.pause(); clock.set(t); }, scene: (sc, t) => setScene(sc, t), setAddr: (a) => { S.a = a; fAddr.set(a); fitClock(); }, setK: (k) => setK(k), setIdx: (idx) => setIdx(idx),
    point: { cell: (c) => (geo.mem ? at(geo.mem.x + (c + 0.5) * geo.mem.cw, geo.mem.y + geo.mem.h / 2) : null) },
    /** The die of the last frame: layout, camera, cells, lit switches and paths, fronts, scan head, pointers, the
        amber landing, the flat panels it must stay out of, and its marks (viewport pixels). */
    solid: () => JSON.parse(JSON.stringify(Object.assign({ mode: LAY.mode, orient: LAY.orient, region: LAY.r3, pitch: LAY.pitch, unit: solid.unit, cam: solid.cam,
      arr: ARR, die: DIE, register: REG, tables: TB3, panels: geo.panels || [] }, G3 || {}, { marks: solid.marks() })))
  };
  /** Cover: four superposed paths reaching their leaves while the scan head is a third of the way along. */
  window.TRV_THUMB = () => { S.a = 41; S.k = 4; S.idx = [0, 0]; setScene('tree', n); paint.now(); };
  cards.pick(cards.initial('qram_tree'));   // a chapter may cite another card: ::: {.viz src="pointer-ontology-deref" preset="linear64"}
  booting = false;
  paint();
})();
