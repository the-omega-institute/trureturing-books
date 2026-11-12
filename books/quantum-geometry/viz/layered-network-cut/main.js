/* NETWORK//CUT: the layered network of chapter 19 and the minimal cut of a boundary interval.
   The network: 32 boundary sites under a binary MERA-like network with open ends. Each layer joins the slots
   (1, 2), (3, 4), … with a disentangler u (a square, two legs in, two out) and then merges the slots (0, 1), (2, 3), …
   with an isometry w (a triangle, two legs in, one out); after five layers one triangle is left. Every bond counts 1.
   The cut: the fewest bonds whose removal disconnects the legs of the chosen boundary sites from the other boundary
   legs, found by augmenting paths (breadth first, unit capacities, undirected bonds); the cut shown is the one next
   to the chosen sites (the set reachable from them in the residual graph).
   The rail is the length L of interval A, whose right end stays put.
   Read-only probe for the browser suite: window.NETCUT_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const N = 32, LCAP = 16;
  const face = (f) => (f === 'body' ? TRV.fonts.body : f === 'display' ? TRV.fonts.display : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
    if (o.halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
  }

  /* ---------- the network ---------- */
  function build() {
    const nodes = [], edges = [];
    const add = (id, kind, x, y, layer) => { const n = { id, kind, x, y, layer, i: nodes.length, adj: [] }; nodes.push(n); return n; };
    const link = (a, b) => { const e = edges.length; edges.push({ a: a.i, b: b.i }); a.adj.push(e); b.adj.push(e); };
    let cur = [];
    for (let i = 0; i < N; i++) { const b = add('b' + i, 'b', i + 0.5, 0, -1); cur.push({ node: b, x: i + 0.5 }); }
    let l = 0;
    while (cur.length > 1) {
      const n = cur.length, nxt = cur.slice();
      for (let i = 1; i < n - 1; i += 2) {
        const u = add(`u${l}.${i}`, 'u', (cur[i].x + cur[i + 1].x) / 2, 2 * l + 1, l);
        link(cur[i].node, u); link(cur[i + 1].node, u);
        nxt[i] = { node: u, x: cur[i].x }; nxt[i + 1] = { node: u, x: cur[i + 1].x };
      }
      const up = [];
      for (let i = 0; i < n; i += 2) {
        const w = add(`w${l}.${i / 2}`, 'w', (nxt[i].x + nxt[i + 1].x) / 2, 2 * l + 2, l);
        link(nxt[i].node, w); link(nxt[i + 1].node, w);
        up.push({ node: w, x: w.x });
      }
      cur = up; l++;
    }
    return { nodes, edges, layers: l };
  }
  const NET = build(), NODES = NET.nodes, EDGES = NET.edges, TOPY = 2 * NET.layers;

  /** Minimal cut between the boundary legs of `sites` and all other boundary legs: { k, cut: [edge], side: [node] }. */
  function minCut(sites) {
    const inA = new Uint8Array(N); sites.forEach((s) => { inA[s] = 1; });
    const cap = new Int8Array(2 * EDGES.length).fill(1);              // arc 2e: a → b, arc 2e + 1: b → a
    const other = (e, v) => (EDGES[e].a === v ? EDGES[e].b : EDGES[e].a);
    const arc = (e, from) => (EDGES[e].a === from ? 2 * e : 2 * e + 1);
    const isSink = (v) => NODES[v].kind === 'b' && !inA[NODES[v].i];
    let k = 0;
    for (;;) {
      const prev = new Int32Array(NODES.length).fill(-2), q = [];
      for (let s = 0; s < N; s++) if (inA[s]) { prev[s] = -1; q.push(s); }
      let hit = -1;
      for (let h = 0; h < q.length && hit < 0; h++) {
        const v = q[h];
        for (const e of NODES[v].adj) {
          const w = other(e, v); if (prev[w] !== -2 || cap[arc(e, v)] <= 0) continue;
          prev[w] = e; if (isSink(w)) { hit = w; break; } q.push(w);
        }
      }
      if (hit < 0) {
        const side = []; for (let v = 0; v < NODES.length; v++) if (prev[v] !== -2) side.push(v);
        const inS = new Uint8Array(NODES.length); side.forEach((v) => { inS[v] = 1; });
        const cut = []; EDGES.forEach((ed, e) => { if (inS[ed.a] !== inS[ed.b]) cut.push(e); });
        return { k, cut, side };
      }
      for (let v = hit; prev[v] !== -1;) { const e = prev[v], u = other(e, v); cap[arc(e, u)]--; cap[arc(e, v)]++; v = u; }
      k++;
    }
  }
  const range = (l, r) => Array.from({ length: r - l }, (_, i) => l + i);
  /** k for every interval [l, r) of the boundary (527 of them, r − l from 1 to 31). */
  const TABLE = {}; for (let l = 0; l < N; l++) for (let r = l + 1; r <= N; r++) if (r - l < N) TABLE[`${l},${r}`] = minCut(range(l, r)).k;
  const kOf = (l, r) => TABLE[`${l},${r}`];
  const ref = (len) => 2 * Math.log2(len) + 1;
  let refOK = true; for (const key in TABLE) { const [l, r] = key.split(',').map(Number); if (TABLE[key] > ref(r - l) + 1e-9) refOK = false; }

  /* ---------- state ---------- */
  const S = { mode: 'one', aR: 17, B: [18, 26], stop: null };
  const lo = () => (S.mode === 'two' && S.B[1] <= S.aR - 1 ? S.B[1] + 1 : 0);
  const lmax = () => Math.max(1, Math.min(LCAP, S.aR - lo()));
  const len = () => clamp(1 + Math.floor(clock.t + 1e-9), 1, lmax());
  const A = () => [S.aR - len(), S.aR];
  let memo = { key: null };
  function current() {
    const a = A(), key = `${S.mode}|${a}|${S.B}`;
    if (memo.key === key) return memo;
    const sites = range(a[0], a[1]).concat(S.mode === 'two' ? range(S.B[0], S.B[1]) : []), mc = minCut(sites);
    memo = { key, a, b: S.mode === 'two' ? S.B.slice() : null, sites, k: mc.k, cut: mc.cut, side: mc.side, kA: kOf(a[0], a[1]), kB: S.mode === 'two' ? kOf(S.B[0], S.B[1]) : 0 };
    memo.sum = memo.kA + memo.kB;
    return memo;
  }
  const jointMemo = {};
  const joint = (l, r) => { const key = `${l},${r}|${S.B}`; if (jointMemo[key] == null) jointMemo[key] = minCut(range(l, r).concat(range(S.B[0], S.B[1]))).k; return jointMemo[key]; };

  /* ---------- the stage ---------- */
  const box = { top: 70, bottom: 44 };
  let view = null;
  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => el.getBoundingClientRect().bottom - sr.top;
    const thumb = TRV.thumbMode, lw = thumb ? 2 : 1;
    box.top = thumb ? 34 : Math.max(46, below($('hudBig').parentElement), below($('modeChips'))) + 8; box.bottom = thumb ? 30 : Math.max(18, $('legend').offsetHeight + 18);
    const g = kit.plot($('cv'), { x: [0, N], y: [-1.25, TOPY + 0.45], pad: [12, 12, box.top, box.bottom] }), ctx = g.ctx; view = g;
    const C = current(), inS = new Uint8Array(NODES.length); C.side.forEach((v) => { inS[v] = 1; });
    const isCut = new Uint8Array(EDGES.length); C.cut.forEach((e) => { isCut[e] = 1; });
    const sx = g.scale, dy = g.Y(0) - g.Y(1), sz = clamp(Math.min(0.55 * dy, 0.8 * sx), 4, 13) * (thumb ? 1.35 : 1);
    const line = (x1, y1, x2, y2) => { ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); };
    ctx.lineCap = 'round';
    // the region on the inner side of the cut, as one soft shape
    ctx.fillStyle = TRV.alpha(P.cyan, 0.1); ctx.beginPath();
    for (const v of C.side) { const n = NODES[v]; if (n.kind === 'b') continue; const r = Math.min(0.95 * dy, sx * Math.pow(2, n.layer) * 0.85, 46); ctx.moveTo(g.X(n.x) + r, g.Y(n.y)); ctx.arc(g.X(n.x), g.Y(n.y), r, 0, kit.TAU); }
    ctx.fill();
    // bonds
    EDGES.forEach((ed, e) => {
      if (isCut[e]) return;
      const a = NODES[ed.a], b = NODES[ed.b], inner = inS[ed.a] && inS[ed.b];
      ctx.strokeStyle = inner ? P.cyan : P.dim; ctx.globalAlpha = inner ? 0.85 : 0.5; ctx.lineWidth = (inner ? 1.8 : 1.15) * lw;
      line(g.X(a.x), g.Y(a.y), g.X(b.x), g.Y(b.y));
    });
    ctx.globalAlpha = 1;
    // the cut
    for (const e of C.cut) {
      const a = NODES[EDGES[e].a], b = NODES[EDGES[e].b], x1 = g.X(a.x), y1 = g.Y(a.y), x2 = g.X(b.x), y2 = g.Y(b.y);
      ctx.strokeStyle = P.magenta; ctx.lineWidth = 3 * lw; ctx.shadowColor = P.magenta; ctx.shadowBlur = 8; line(x1, y1, x2, y2); ctx.shadowBlur = 0;
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, d = Math.hypot(x2 - x1, y2 - y1) || 1, nx = -(y2 - y1) / d, ny = (x2 - x1) / d, t = 7 * (thumb ? 1.6 : 1);
      ctx.lineWidth = 2.4 * lw; line(mx - nx * t, my - ny * t, mx + nx * t, my + ny * t);
    }
    // tensors
    for (const n of NODES) {
      if (n.kind === 'b') continue;
      const x = g.X(n.x), y = g.Y(n.y), on = inS[n.i];
      ctx.fillStyle = on ? TRV.alpha(P.cyan, 0.45) : P.stage; ctx.strokeStyle = on ? P.cyan : P.dim; ctx.lineWidth = 1.4 * lw;
      ctx.beginPath();
      if (n.kind === 'u') ctx.rect(x - sz * 0.62, y - sz * 0.5, sz * 1.24, sz);
      else { ctx.moveTo(x - sz * 0.78, y + sz * 0.5); ctx.lineTo(x + sz * 0.78, y + sz * 0.5); ctx.lineTo(x, y - sz * 0.62); ctx.closePath(); }
      ctx.fill(); ctx.stroke();
    }
    // the boundary: sites, the chosen intervals
    const chosen = new Uint8Array(N); C.sites.forEach((s) => { chosen[s] = 1; });
    const yb = g.Y(-0.62), hb = Math.max(5, 0.32 * dy) * (thumb ? 1.4 : 1);
    for (const [iv, name] of [[C.a, 'A'], [C.b, 'B']]) {
      if (!iv) continue;
      ctx.fillStyle = TRV.alpha(P.amber, 0.9); ctx.shadowColor = P.amber; ctx.shadowBlur = 8;
      ctx.fillRect(g.X(iv[0]) + 1.5, yb - hb / 2, g.X(iv[1]) - g.X(iv[0]) - 3, hb); ctx.shadowBlur = 0;
      if (!thumb) text(ctx, C.b ? name : `A · L = ${iv[1] - iv[0]}`, g.X((iv[0] + iv[1]) / 2), yb + hb / 2 + 3, P.amber, { align: 'center', base: 'top', size: 11.5, weight: 600, halo: true });
    }
    for (let s = 0; s < N; s++) { ctx.fillStyle = chosen[s] ? P.amber : P.dim; ctx.beginPath(); ctx.arc(g.X(s + 0.5), g.Y(0), (chosen[s] ? 3 : 2.2) * (thumb ? 1.5 : 1), 0, kit.TAU); ctx.fill(); }
  }

  /* ---------- the strip ---------- */
  function drawPlots() {
    if (TRV.still || TRV.figure) return;
    const C = current(), m = lmax();
    const g = kit.plot($('plotA'), { x: [0.5, LCAP + 0.5], y: [0, LCAP + 1], pad: [30, 12, 10, 20] });
    g.axes({ yTicks: [0, 4, 8, 12, 16], xTicks: [1, 2, 4, 8, 16], xLabel: L('区间 A 的长度', 'length of A') });
    if (S.mode === 'one') {
      g.line([[0.5, 0.5], [LCAP + 0.5, LCAP + 0.5]], P.dim, { width: 1.2 });
      const rc = []; for (let i = 0; i <= 120; i++) { const x = 1 + (LCAP - 1) * i / 120; rc.push([x, ref(x)]); } g.line(rc, P.ink, { width: 1.2, dash: [4, 3], alpha: 0.75 });
      const pts = []; for (let l = 1; l <= m; l++) pts.push([l, kOf(S.aR - l, S.aR)]);
      g.line(pts, P.magenta, { width: 1.4, alpha: 0.6 }); pts.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.6));
      g.dot(len(), C.k, P.amber, 5, { glow: 8 });
      g.legend([[P.dim, L('剪断 A 的每条腿：L', 'cut every leg of A: L')], [P.magenta, L('最小割', 'minimal cut')], [P.ink, '2·log₂L + 1', 'dash']], { right: false });
      $('pATitle').textContent = L('区间加长，割多几条', 'A longer interval, how many more legs'); $('pAMeta').textContent = L(`右端在第 ${S.aR} 格`, `right end at site ${S.aR}`);
    } else {
      const sum = [], jn = []; for (let l = 1; l <= m; l++) { const a0 = S.aR - l; sum.push([l, kOf(a0, S.aR) + kOf(S.B[0], S.B[1])]); jn.push([l, joint(a0, S.aR)]); }
      g.line(sum, P.dim, { width: 1.4 }); sum.forEach(([x, y]) => g.dot(x, y, P.dim, 2.4));
      g.line(jn, P.magenta, { width: 1.4, alpha: 0.7 }); jn.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.6));
      g.dot(len(), C.k, P.amber, 5, { glow: 8 });
      g.legend([[P.dim, L('分开割：A 的 + B 的', 'apart: cut A + cut B')], [P.magenta, L('一起割 A∪B', 'together: A∪B')]], { right: false });
      $('pATitle').textContent = L('一起割与分开割', 'Together against apart'); $('pAMeta').textContent = L(`B 长 ${S.B[1] - S.B[0]}`, `B has ${S.B[1] - S.B[0]} sites`);
    }
    const h = kit.plot($('plotB'), { x: [0, N], y: [0, 12], pad: [30, 12, 10, 20] });
    h.axes({ yTicks: [0, 4, 8, 12], xTicks: [1, 8, 16, 24, 31] });
    const seen = {}; for (const key in TABLE) { const [l, r] = key.split(',').map(Number), c = `${r - l},${TABLE[key]}`; seen[c] = (seen[c] || 0) + 1; }
    for (const c in seen) { const [x, y] = c.split(',').map(Number); h.dot(x, y, P.cyan, 1.6 + Math.min(2.4, Math.sqrt(seen[c]) * 0.5), { alpha: 0.75 }); }
    const rc = []; for (let i = 0; i <= 150; i++) { const x = 1 + 30 * i / 150; rc.push([x, ref(x)]); } h.line(rc, P.ink, { width: 1.2, dash: [4, 3], alpha: 0.75 });
    h.dot(C.a[1] - C.a[0], C.kA, P.amber, 4.5, { glow: 6 });
    $('pBTitle').textContent = L('527 段区间，没有一段越过虚线', '527 intervals, none above the dashed line'); $('pBMeta').textContent = L('横轴：区间长度', 'across: interval length');
  }

  /* ---------- words ---------- */
  const LEGEND = [['am', '选中的区间', 'the chosen interval'], ['mg', '最小割断的键', 'bonds of the minimal cut'], ['cy box', '割内侧的张量', 'tensors inside the cut'], ['dm', '其余的键', 'the other bonds']];
  function drawText() {
    const C = current(), set = (i, lab, val) => { $(`roL${i}`).textContent = lab; $(`ro${i}`).innerHTML = val; };
    const l = C.a[1] - C.a[0], tens = C.side.filter((v) => NODES[v].kind !== 'b').length;
    let big, hud, note, what, key;
    if (S.mode === 'one') {
      big = L(`一段 · L = ${l}`, `One interval · L = ${l}`);
      hud = C.k < l ? L(`最小割断 ${C.k} 条键；直接剪断 A 的腿要 ${l} 条`, `the minimal cut severs ${C.k} bond${C.k === 1 ? '' : 's'}; cutting the legs of A takes ${l}`) : L(`最小割就是 A 自己的 ${l} 条腿`, `the minimal cut is the ${l} leg${l === 1 ? '' : 's'} of A itself`);
      $('roKeyL').textContent = L('最小割断的键', 'bonds in the minimal cut'); $('roKey').innerHTML = `<span class="c-mg">${C.k}</span>`; $('roKeySub').textContent = L(`A 有 ${l} 条腿`, `A has ${l} leg${l === 1 ? '' : 's'}`);
      set(1, L('区间 A', 'interval A'), l === 1 ? L(`第 ${C.a[0]} 格`, `site ${C.a[0]}`) : L(`第 ${C.a[0]}–${C.a[1] - 1} 格`, `sites ${C.a[0]}–${C.a[1] - 1}`));
      set(2, L('跨割的秩至多', 'rank across the cut at most'), `χ<sup>${C.k}</sup>`);
      set(3, '2·log₂L + 1', `${fix(ref(l), 2)} <span class="chk">${C.k <= ref(l) + 1e-9 ? '≥ k ✓' : '✗'}</span>`);
      set(4, L('割内侧的张量', 'tensors inside the cut'), String(tens));
      note = L('割不会多于 L：直接剪断 A 的每条腿就是一道割。', 'The cut never needs more than L: severing every leg of A is itself a cut.');
      what = `L = ${l}`; key = `k = ${C.k}`;
    } else {
      const lb = C.b[1] - C.b[0], gap = C.b[0] >= C.a[1] ? C.b[0] - C.a[1] : C.a[0] - C.b[1];
      big = L(`两段 · A 长 ${l}，B 长 ${lb}`, `Two intervals · A has ${l}, B has ${lb}`);
      hud = C.k < C.sum ? L(`一起割 ${C.k} 条，分开割 ${C.sum} 条：一起割省 ${C.sum - C.k} 条`, `together ${C.k} bonds, apart ${C.sum}: together saves ${C.sum - C.k}`) : L(`一起割 ${C.k} 条，与分开割一样多`, `together ${C.k} bonds, as many as apart`);
      $('roKeyL').textContent = L('一起割 A∪B', 'cut A∪B together'); $('roKey').innerHTML = `<span class="c-mg">${C.k}</span>`; $('roKeySub').textContent = L(`分开割 ${C.kA} + ${C.kB} = ${C.sum}`, `apart ${C.kA} + ${C.kB} = ${C.sum}`);
      set(1, L('A 的割 · B 的割', 'cut of A · cut of B'), `${C.kA} · ${C.kB}`);
      set(2, L('分开割之和', 'sum apart'), String(C.sum));
      set(3, L('一起割省下', 'saved together'), `${C.sum - C.k} <span class="chk">${C.k <= C.sum ? '≥ 0 ✓' : '✗'}</span>`);
      set(4, L('A、B 之间空几格', 'sites between A and B'), String(gap));
      note = L('一起割从不比分开割多：A 的割与 B 的割合起来，本身就是 A∪B 的一道割。', 'Together never takes more than apart: the cut of A and the cut of B, taken together, are themselves a cut of A∪B.');
      what = `L = ${l}`; key = `k = ${C.k}`;
    }
    $('hudBig').textContent = big; $('hudSub').textContent = hud; $('roNote').textContent = note; $('roAside').textContent = S.mode === 'one' ? L('一段', 'ONE') : L('两段', 'TWO');
    $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const leg = LEGEND.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlots(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 3, rate: 2.2, step: 1, t: 3, rangeStep: '1',
    format: (t, max) => `L ${1 + Math.floor(t + 1e-9)} <small>/ ${Math.round(max) + 1}</small>`,
    onChange: (t, c) => {
      if (S.stop != null && c.playing && 1 + Math.floor(t + 1e-9) >= S.stop) { const at = S.stop - 1; S.stop = null; c.pause(); c.set(at); return; }
      paint();
    }
  });
  /** Put the rail on length l for the current right end (and the current second interval). */
  function fit(l) { clock.setMax(lmax() - 1, true); clock.set(clamp(l, 1, lmax()) - 1); }
  const leave = () => { S.stop = null; cards.mark(null); };
  const ok = (a, b) => a[0] >= 0 && a[1] <= N && a[1] - a[0] >= 1 && a[1] - a[0] <= LCAP && (!b || (b[0] >= 0 && b[1] <= N && b[1] - b[0] >= 1 && b[1] - b[0] <= LCAP && (a[1] < b[0] || b[1] < a[0])));
  function place(a, b) {
    if (!ok(a, S.mode === 'two' ? b : null)) return false;
    if (S.mode === 'two') S.B = b.slice();
    S.aR = a[1]; fit(a[1] - a[0]); return true;
  }
  function setMode(m, quiet) {
    S.mode = m; modeChips.set(m, true);
    if (m === 'two') { S.B = [18, 26]; const a = A(); if (!ok(a, S.B)) { S.aR = 16; } fit(Math.min(len(), 16)); }
    else fit(len());
    if (!quiet) paint();
  }
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { leave(); clock.pause(); setMode(v); });
  $('rew').addEventListener('click', () => { leave(); clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); clock.pause(); setMode('one'); }, 2: () => { leave(); clock.pause(); setMode('two'); } });

  // dragging on the stage: the ends of an interval change its length, its middle slides it, an empty site moves A there
  let drag = null;
  const siteAt = (ev) => { const b = $('cv').getBoundingClientRect(); return clamp(Math.floor(view.invX(ev.clientX - b.left)), 0, N - 1); };
  function grab(s) {
    const a = A(), b = S.mode === 'two' ? S.B.slice() : null;
    for (const [iv, who] of [[a, 'a'], [b, 'b']]) {
      if (!iv || s < iv[0] || s >= iv[1]) continue;
      const part = s === iv[1] - 1 ? 'R' : s === iv[0] ? 'L' : 'M';
      return { who, part, s0: s, a0: a, b0: b };
    }
    const l = a[1] - a[0], na = [clamp(s - Math.floor((l - 1) / 2), 0, N - l)]; na.push(na[0] + l);
    place(na, b);
    return { who: 'a', part: 'M', s0: s, a0: A(), b0: b };
  }
  function move(d, s) {
    const iv = (d.who === 'a' ? d.a0 : d.b0).slice(), ds = s - d.s0;
    if (d.part === 'L') iv[0] = Math.min(s, iv[1] - 1); else if (d.part === 'R') iv[1] = Math.max(s + 1, iv[0] + 1); else { iv[0] += ds; iv[1] += ds; }
    place(d.who === 'a' ? iv : d.a0, d.who === 'b' ? iv : d.b0);
  }
  $('cv').addEventListener('pointerdown', (ev) => { if (!view) return; leave(); clock.pause(); try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ } drag = grab(siteAt(ev)); paint(); });
  $('cv').addEventListener('pointermove', (ev) => { if (!drag) return; move(drag, siteAt(ev)); paint(); });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { drag = null; });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    one: { mode: 'one', aR: 17, at: 1 },
    four: { mode: 'one', aR: 17, at: 4 },
    grow: { mode: 'one', aR: 24, at: 16, play: true },
    two: { mode: 'two', aR: 16, B: [18, 26], at: 10, play: true, stop: 10 }
  };
  const NOTES = {
    one: ['区间只有第 16 格一格：品红的最小割就是它自己那一条腿。只有一条键穿过这道割，跨过它的秩至多是这一条键的维数。', 'The interval is the single site 16: the magenta minimal cut is its own leg. Only one bond crosses this cut, so the rank across it is at most the dimension of that one bond.'],
    four: ['连续 4 格：剪断它们的 4 条腿不是最省的。品红的最小割钻进网络，只割断 3 条键；青色是割内侧的张量。', 'Four sites in a row: severing their 4 legs is not the cheapest. The magenta minimal cut runs into the network and severs only 3 bonds; the cyan tensors lie inside it.'],
    grow: ['区间从 1 格长到 16 格，右端不动：品红的割一层层往上爬，只从 1 条长到 8 条；直接剪断每条腿要 16 条。', 'The interval grows from 1 site to 16 with its right end fixed: the magenta cut climbs layer by layer and grows only from 1 bond to 8, while severing every leg would take 16.'],
    two: ['A、B 之间空 2 格，A 从 1 格往左长到 10 格。A 短时，品红的割是两道各自的割；A 长到 7 格起，一道包住两段的大割加上空隙底下的小割更省，长到 10 格时一起割 10 条，分开割 13 条。', 'Two sites lie between A and B, and A grows leftward from 1 site to 10. While A is short the magenta cut is two separate cuts; from 7 sites on, one large cut around both intervals plus a small cut under the gap is cheaper, and at 10 sites together takes 10 bonds, apart 13.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); S.stop = null;
    S.mode = p.mode; modeChips.set(p.mode, true); if (p.B) S.B = p.B.slice(); S.aR = p.aR;
    fit(p.at); paint();
    if (!p.play || TRV.still || (booting && !TRV.embed)) return;
    S.stop = p.stop || null; clock.set(0);
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动区间的两端或整段，切换一段与两段，用时间轴改变 A 的长度。随时可以再选一张卡。', 'Free play: drag the ends or the middle of an interval, switch between one and two, change the length of A on the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.NETCUT_DEBUG = {
    get state() {
      const C = current();
      return { preset: cards.current, mode: S.mode, t: clock.t, max: clock.max, playing: clock.playing, L: len(), lmax: lmax(), A: C.a.slice(), B: C.b ? C.b.slice() : null,
        k: C.k, cut: C.cut.map((e) => [NODES[EDGES[e].a].id, NODES[EDGES[e].b].id]), side: C.side.map((v) => NODES[v].id), kA: C.kA, kB: C.kB, sum: C.sum, refOK };
    },
    graph: () => ({ nodes: NODES.map((n) => ({ id: n.id, kind: n.kind, x: n.x, y: n.y })), edges: EDGES.map((e) => [NODES[e.a].id, NODES[e.b].id]) }),
    table: () => Object.assign({}, TABLE),
    seek: (l) => { clock.pause(); clock.set(l - 1); },
    /** Client coordinates of the middle of boundary site s (for pointer tests). */
    site: (s) => { const b = $('cv').getBoundingClientRect(); return [b.left + view.X(s + 0.5), b.top + view.Y(0)]; }
  };
  window.TRV_THUMB = () => { S.stop = null; clock.pause(); S.mode = 'one'; modeChips.set('one', true); S.aR = 24; fit(16); paint.now(); };
  cards.pick(cards.initial('four'));
  booting = false;
  paint();
})();
