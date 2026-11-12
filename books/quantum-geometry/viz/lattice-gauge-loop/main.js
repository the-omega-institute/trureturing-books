/* GAUGE//LOOP · 格点规范与回路相位 · Lattice gauge and the loop phase
   Chapter 18: U(1) phases on the directed edges of a small lattice. Every edge e carries a phase u(e), drawn as a
   hand on a small dial at its midpoint; every corner v can make a gauge transformation g(v), drawn as a violet hand,
   which turns the edge phase into g(t(e))·u(e)·g(s(e))⁻¹. At the centre of every square sits the magenta loop phase:
   the product of its four edges taken counter-clockwise. The spanning tree T (cyan) is every horizontal edge plus the
   leftmost column, rooted at the bottom-left corner r; on the single square the edges run round 0 → 1 → 2 → 3 → 0
   and T = {e₀, e₁, e₂}, as in the worked example of the chapter.
   Phases are kept as angles in degrees (90° is i). The rail s runs from before a change to after it:
     shown phase φ_s(e) = u0(e) + s·(u1(e) − u0(e)) + s·(θ(t(e)) − θ(s(e))),   shown gauge g_s(v) = s·θ(v).
   Read-only probe for the browser suite: window.GAUGE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180;
  /** An angle in degrees brought into (−180, 180]. */
  const wrap = (d) => { let x = (((d + 180) % 360) + 360) % 360 - 180; if (x <= -180 + 1e-9) x += 360; return Math.abs(x) < 1e-9 ? 0 : x; };
  /** A phase as the reader meets it in the chapter: 1, i, −1, −i when exact, otherwise its angle. */
  function ph(d) {
    const x = wrap(d), r = Math.round(x);
    if (Math.abs(x - r) < 0.05) { if (r === 0) return '1'; if (r === 90) return 'i'; if (r === 180) return '−1'; if (r === -90) return '−i'; return `${r < 0 ? '−' : ''}${Math.abs(r)}°`; }
    return `${x < 0 ? '−' : ''}${fix(Math.abs(x), 1)}°`;
  }
  const SUB = ['₀', '₁', '₂', '₃'];
  /** Several phases in one line: as 1, i, −1, −i when every one of them is a quarter turn, otherwise all in degrees. */
  function phList(ds) {
    const quarter = ds.every((d) => { const x = wrap(d); return Math.abs(x / 90 - Math.round(x / 90)) < 0.05 / 90; });
    return ds.map((d) => (quarter ? ph(d) : `${wrap(d) < 0 ? '−' : ''}${fix(Math.abs(wrap(d)), Math.abs(wrap(d) - Math.round(wrap(d))) < 0.05 ? 0 : 1)}°`)).join(' · ');
  }

  /* ---------- lattices ---------- */
  /** '1': the worked example (4 corners, edges round the square); '2', '4': nx × ny squares, edges pointing right and up. */
  function makeLattice(id) {
    if (id === '1') {
      return {
        id, nx: 1, ny: 1, V: [[0, 0], [1, 0], [1, 1], [0, 1]], names: ['0', '1', '2', '3'],
        E: [[0, 1], [1, 2], [2, 3], [3, 0]], ename: ['e₀', 'e₁', 'e₂', 'e₃'], tree: [true, true, true, false],
        squares: [{ c: [0.5, 0.5], loop: [[0, 1], [1, 1], [2, 1], [3, 1]] }], root: 0, far: 2
      };
    }
    const nx = 2, ny = id === '2' ? 1 : 2, vid = (i, j) => j * (nx + 1) + i, V = [], E = [], tree = [], H = {}, Vt = {};
    for (let j = 0; j <= ny; j++) for (let i = 0; i <= nx; i++) V.push([i, j]);
    for (let j = 0; j <= ny; j++) for (let i = 0; i < nx; i++) { H[`${i},${j}`] = E.length; E.push([vid(i, j), vid(i + 1, j)]); tree.push(true); }
    for (let i = 0; i <= nx; i++) for (let j = 0; j < ny; j++) { Vt[`${i},${j}`] = E.length; E.push([vid(i, j), vid(i, j + 1)]); tree.push(i === 0); }
    const squares = [];
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) squares.push({ c: [i + 0.5, j + 0.5], loop: [[H[`${i},${j}`], 1], [Vt[`${i + 1},${j}`], 1], [H[`${i},${j + 1}`], -1], [Vt[`${i},${j}`], -1]] });
    return { id, nx, ny, V, names: V.map(() => ''), E, ename: E.map(() => ''), tree, squares, root: 0, far: vid(nx, ny) };
  }
  /** The unique tree path from the root to every corner, as [edge, ±1] steps (breadth first over the tree edges). */
  function treePaths(G) {
    const path = G.V.map(() => null); path[G.root] = [];
    const queue = [G.root];
    while (queue.length) {
      const v = queue.shift();
      G.E.forEach(([a, b], e) => {
        if (!G.tree[e]) return;
        if (a === v && !path[b]) { path[b] = path[v].concat([[e, 1]]); queue.push(b); }
        else if (b === v && !path[a]) { path[a] = path[v].concat([[e, -1]]); queue.push(a); }
      });
    }
    return path;
  }
  const FIELDS = {
    1: [0, 0, 0, 90],
    2: [30, -45, 60, 15, -30, 75, 45],
    4: [30, -45, 60, 15, -20, 50, -30, 75, 45, 10, -60, 35]
  };

  /* ---------- state ---------- */
  const S = { G: null, paths: null, anc: 'root', u0: [], u1: [], th: [], sel: null, hot: null, seed: 7 };
  function setLattice(id, field) {
    S.G = makeLattice(id); S.paths = treePaths(S.G);
    S.u0 = (field || FIELDS[id]).slice(); S.u1 = S.u0.slice(); S.th = S.G.V.map(() => 0);
    S.sel = id === '2' ? S.G.E.length - 1 : null; S.hot = null;
    latChips.set(id, true);
  }
  const anchors = () => (S.anc === 'far' ? [S.G.root, S.G.far] : [S.G.root]);
  const isAnchor = (v) => anchors().includes(v);
  /** Shown edge phases at rail position s. */
  const phiAt = (s) => S.G.E.map(([a, b], e) => S.u0[e] + s * (S.u1[e] - S.u0[e]) + s * (S.th[b] - S.th[a]));
  const loopOf = (phi, loop) => loop.reduce((acc, [e, sg]) => acc + sg * phi[e], 0);
  const rootPhase = (phi) => S.paths.map((p) => p.reduce((acc, [e, sg]) => acc + sg * phi[e], 0));
  function chordCycle(e) {
    const [a, b] = S.G.E[e], pa = S.paths[a], pb = S.paths[b];
    const vs = []; let v = S.G.root; vs.push(v);
    for (const [k, sg] of pa) { v = sg > 0 ? S.G.E[k][1] : S.G.E[k][0]; vs.push(v); }
    vs.push(b);
    for (const [k, sg] of pb.slice().reverse()) { v = sg > 0 ? S.G.E[k][0] : S.G.E[k][1]; vs.push(v); }
    return vs;   // a closed walk r → s(e) → t(e) → r
  }
  function snapshot(s) {
    const phi = phiAt(s), rp = rootPhase(phi), G = S.G;
    const loops = G.squares.map((q) => loopOf(phi, q.loop));
    const chi = G.E.map(([a, b], e) => (G.tree[e] ? null : rp[a] + phi[e] - rp[b]));
    const n = G.V.length, m = G.E.length, k = anchors().length, T = G.tree.filter(Boolean).length;
    return { phi, rp, loops, chi, n, m, k, T, c: m - T, a: k - 1 };
  }
  /** Fold the change shown at s into the field: the next change starts from what the reader sees now. */
  function bake() { const phi = phiAt(clock.t); S.u0 = phi.slice(); S.u1 = phi.slice(); S.th = S.th.map(() => 0); }

  /* ---------- layout ---------- */
  const cv = $('cv');
  let box = null;
  function layout() {
    const W = cv.clientWidth || 1, H = cv.clientHeight || 1, thumb = TRV.thumbMode, narrow = W < 560, G = S.G;
    const outside = !thumb && (S.sel != null && G.id === '2' || S.anc === 'far');
    const top = thumb ? 70 : 104, bottom = thumb ? 70 : (narrow ? 96 : 84);
    const left = thumb ? 110 : (narrow ? 44 : 64), right = (thumb ? 110 : (narrow ? 54 : 64)) + (outside ? (narrow ? 70 : 110) : 0);
    const cap = thumb ? 360 : 300;
    const sp = Math.max(60, Math.min(cap, (W - left - right) / G.nx, (H - top - bottom) / G.ny));
    const x0 = left + ((W - left - right) - sp * G.nx) / 2, y0 = top + ((H - top - bottom) - sp * G.ny) / 2 + sp * G.ny;
    const k = thumb ? 1.4 : 1;
    box = {
      W, H, narrow, sp, k, X: (i) => x0 + i * sp, Y: (j) => y0 - j * sp,
      rv: Math.max(5, Math.min(9, sp * 0.045)) * k, rg: Math.max(13, Math.min(22, sp * 0.1)) * k,
      rd: Math.max(11, Math.min(20, sp * 0.1)) * k, rq: Math.max(15, Math.min(32, sp * 0.15)) * k,
      outX: x0 + sp * G.nx + (narrow ? 66 : 84)
    };
    return box;
  }
  const vxy = (v) => [box.X(S.G.V[v][0]), box.Y(S.G.V[v][1])];
  const exy = (e) => { const [a, b] = S.G.E[e], p = vxy(a), q = vxy(b); return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; };
  const qxy = (q) => [box.X(q.c[0]), box.Y(q.c[1])];

  /* ---------- drawing ---------- */
  function dial(ctx, x, y, r, deg, color, o) {
    o = o || {};
    const k = box.k;
    ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = TRV.alpha(P.stage, 0.92); ctx.fill();
    ctx.strokeStyle = o.ring || P.faint; ctx.lineWidth = (o.ringW || 1.2) * k; ctx.stroke();
    // the angle this hand has swept since s = 0: a faint band, a full ring once it has gone all the way round
    if (o.sweep && Math.abs(o.sweep[1] - o.sweep[0]) > 0.5) {
      const [d0, d1] = o.sweep, full = Math.abs(d1 - d0) >= 360 - 1e-6;
      ctx.strokeStyle = TRV.alpha(o.sweepColor || P.ink, 0.26); ctx.lineWidth = r * 0.42; ctx.lineCap = 'butt';
      ctx.beginPath();
      if (full) ctx.arc(x, y, r * 0.62, 0, 2 * Math.PI); else ctx.arc(x, y, r * 0.62, -d0 * DEG, -d1 * DEG, d1 > d0);
      ctx.stroke();
    }
    ctx.strokeStyle = TRV.alpha(P.dim, 0.7); ctx.lineWidth = 1 * k;   // the direction of 1
    ctx.beginPath(); ctx.moveTo(x + r * 0.78, y); ctx.lineTo(x + r, y); ctx.stroke();
    const a = deg * DEG, hx = x + Math.cos(a) * r * 0.86, hy = y - Math.sin(a) * r * 0.86;
    ctx.strokeStyle = color; ctx.lineWidth = (o.w || 2.2) * k; ctx.lineCap = 'round';
    if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(hx, hy); ctx.stroke(); ctx.shadowBlur = 0;
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(hx, hy, 2.2 * k, 0, 2 * Math.PI); ctx.fill();
  }
  function arrowHead(ctx, x, y, ang, size, color) {
    ctx.fillStyle = color; ctx.beginPath();
    ctx.moveTo(x + Math.cos(ang) * size, y + Math.sin(ang) * size);
    ctx.lineTo(x + Math.cos(ang + 2.5) * size, y + Math.sin(ang + 2.5) * size);
    ctx.lineTo(x + Math.cos(ang - 2.5) * size, y + Math.sin(ang - 2.5) * size);
    ctx.closePath(); ctx.fill();
  }
  /** A counter-clockwise loop arrow round a dial (screen y points down, so counter-clockwise is a decreasing angle). */
  function loopArrow(ctx, x, y, r, color, k) {
    ctx.strokeStyle = color; ctx.lineWidth = 1.4 * k; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.arc(x, y, r, -0.35, -2 * Math.PI + 0.75, true); ctx.stroke(); ctx.globalAlpha = 1;
    const end = -2 * Math.PI + 0.75, ex = x + Math.cos(end) * r, ey = y + Math.sin(end) * r;
    arrowHead(ctx, ex, ey, end - Math.PI / 2, 5 * k, color);
  }

  const stage = kit.stage3($('stage'), {
    canvas: cv, rotate: false, wheel: false, onChange: () => paint(),
    onPick: (ev) => pick(ev), onDrag: (ev) => drag(ev), onDrop: () => { S.drag = null; paint(); }
  });

  function drawStage() {
    const G = S.G; layout();
    const st = stage, ctx = st.begin(), s = clock.t, now = snapshot(s), k = box.k, thumb = TRV.thumbMode;
    const anc = anchors(), cyc = S.sel != null && !G.tree[S.sel] ? chordCycle(S.sel) : null, base = snapshot(0);

    // the fundamental loop of the selected chord: a dashed magenta outline just inside it, and its dial outside
    if (cyc) {
      const xs = cyc.map((v) => vxy(v)[0]), ys = cyc.map((v) => vxy(v)[1]), d = box.sp * 0.07;
      const x0 = Math.min(...xs) + d, x1 = Math.max(...xs) - d, y0 = Math.min(...ys) + d, y1 = Math.max(...ys) - d;
      ctx.fillStyle = TRV.alpha(P.magenta, 0.06); ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
      ctx.strokeStyle = P.magenta; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.5 * k; ctx.setLineDash([6, 5]);
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0); ctx.setLineDash([]); ctx.globalAlpha = 1;
      arrowHead(ctx, x1, (y0 + y1) / 2, -Math.PI / 2, 6 * k, P.magenta);
    }
    // the tree path from the root to the far anchor
    if (anc.length > 1) {
      ctx.strokeStyle = P.cyan; ctx.globalAlpha = 0.22; ctx.lineWidth = 12 * k; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); let v = G.root; ctx.moveTo(...vxy(v));
      for (const [e, sg] of S.paths[G.far]) { v = sg > 0 ? G.E[e][1] : G.E[e][0]; ctx.lineTo(...vxy(v)); }
      ctx.stroke(); ctx.globalAlpha = 1;
    }
    // edges: tree edges cyan, chords dim; an arrowhead shows the direction
    G.E.forEach(([a, b], e) => {
      const p = vxy(a), q = vxy(b), dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len;
      const col = G.tree[e] ? P.cyan : P.dim;
      ctx.strokeStyle = col; ctx.lineWidth = (G.tree[e] ? 3 : 1.6) * k; ctx.globalAlpha = G.tree[e] ? 0.9 : 0.85;
      ctx.beginPath(); ctx.moveTo(p[0] + ux * box.rg, p[1] + uy * box.rg); ctx.lineTo(q[0] - ux * box.rg, q[1] - uy * box.rg); ctx.stroke(); ctx.globalAlpha = 1;
      const at = 0.5 + (box.rd + 12 * k) / len;
      arrowHead(ctx, p[0] + dx * at, p[1] + dy * at, Math.atan2(dy, dx), 6 * k, col);
    });
    // squares: the magenta loop phase, counter-clockwise
    G.squares.forEach((q, i) => {
      const [x, y] = qxy(q);
      loopArrow(ctx, x, y, box.rq + 7 * k, TRV.alpha(P.magenta, 0.7), k);
      dial(ctx, x, y, box.rq, now.loops[i], P.magenta, { ring: P.magenta, ringW: 1.6, w: 3, glow: thumb ? 0 : 10, sweep: [base.loops[i], now.loops[i]], sweepColor: P.magenta });
      if (!thumb) st.tag(`q${i}`, [x, y + box.rq + 15], `<span class="c-mg">${ph(now.loops[i])}</span>`, 'num', { screen: true });
    });
    // edge dials
    G.E.forEach((ab, e) => {
      const [x, y] = exy(e), hot = S.hot && S.hot.kind === 'e' && S.hot.i === e;
      dial(ctx, x, y, box.rd, now.phi[e], hot ? P.amber : P.ink, { ring: hot ? P.amber : (G.tree[e] ? TRV.alpha(P.cyan, 0.8) : P.faint), glow: hot ? 10 : 0, sweep: [base.phi[e], now.phi[e]] });
      if (thumb || (box.narrow && G.id === '4')) return;   // on a phone the four-square hands speak for themselves
      const horiz = Math.abs(vxy(ab[0])[1] - vxy(ab[1])[1]) < 1, bottomRow = horiz && G.V[ab[0]][1] === 0 && G.V[ab[1]][1] === 0;
      const label = (G.ename[e] ? `${G.ename[e]} ` : '') + ph(now.phi[e]);
      // outer rows: above or below the dial; inner rows: up and to the right, clear of the square labels;
      // vertical edges: to the right (inside the single square for its right-hand edge, where there is room)
      const topRow = horiz && G.V[ab[0]][1] === G.ny, lw = box.rd + 8 + label.length * 3.3;
      // the right column goes inside when it is the single square, or when the outer dial sits just to its right
      const rightCol = !horiz && G.V[ab[0]][0] === G.nx && (G.id === '1' || (cyc && G.id === '2'));
      const off = horiz ? (bottomRow ? [0, box.rd + 13] : topRow ? [0, -(box.rd + 12)] : [lw, -(box.rd + 2)]) : [rightCol ? -lw : lw, 0];
      st.tag(`e${e}`, [x + off[0], y + off[1]], label, hot ? 'num hot' : 'num', { screen: true });
    });
    // corners: the violet gauge hand on a ring; anchors are locked squares without a ring
    G.V.forEach((pv, v) => {
      const [x, y] = vxy(v), locked = anc.includes(v), hot = S.hot && S.hot.kind === 'v' && S.hot.i === v;
      if (locked) {
        ctx.fillStyle = P.ink; ctx.strokeStyle = anc.length > 1 ? P.cyan : P.ink; ctx.lineWidth = 2 * k;
        const r = box.rv + 2 * k; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); ctx.strokeRect(x - r - 3 * k, y - r - 3 * k, 2 * r + 6 * k, 2 * r + 6 * k);
      } else {
        const col = hot ? P.amber : P.violet, g = s * S.th[v] * DEG;
        ctx.strokeStyle = TRV.alpha(col, 0.55); ctx.lineWidth = 1.3 * k; ctx.beginPath(); ctx.arc(x, y, box.rg, 0, 2 * Math.PI); ctx.stroke();
        ctx.strokeStyle = col; ctx.lineWidth = 2.4 * k; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + Math.cos(g) * box.rg, y - Math.sin(g) * box.rg); ctx.stroke();
        ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x + Math.cos(g) * box.rg, y - Math.sin(g) * box.rg, 3.4 * k, 0, 2 * Math.PI); ctx.fill();
        ctx.fillStyle = P.ink; ctx.beginPath(); ctx.arc(x, y, box.rv, 0, 2 * Math.PI); ctx.fill();
      }
      if (thumb) return;
      const name = v === G.root ? (G.names[v] ? `r = ${G.names[v]}` : 'r') : (anc.length > 1 && v === G.far ? 'a' : G.names[v]);
      const ox = Math.sign(pv[0] - G.nx / 2) || -1, oy = Math.sign(pv[1] - G.ny / 2) || -1;
      if (name) st.tag(`v${v}`, [x + ox * (box.rg + 6 + name.length * 2.5), y - oy * (box.rg + 6)], name, 'num', { screen: true });
    });
    // outside dials: the loop of the selected chord, and the tree-path phase to the far anchor
    if (!thumb && cyc && G.id === '2') {
      const ys = cyc.map((v) => vxy(v)[1]), y = (Math.min(...ys) + Math.max(...ys)) / 2, x = box.outX;
      dial(ctx, x, y, box.rq * 0.8, now.chi[S.sel], P.magenta, { ring: P.magenta, ringW: 1.6, w: 3, glow: 10, sweep: [base.chi[S.sel], now.chi[S.sel]], sweepColor: P.magenta });
      st.tag('cyc', [x, y + box.rq * 0.8 + 15], `<span class="c-mg">${L('外圈', 'outer')} ${ph(now.chi[S.sel])}</span>`, 'num', { screen: true });
    }
    if (!thumb && anc.length > 1) {
      const [, y] = vxy(G.far), x = box.outX, yy = y + box.sp * 0.32;
      dial(ctx, x, yy, box.rq * 0.8, now.rp[G.far], P.cyan, { ring: P.cyan, ringW: 1.6, w: 3, glow: 10, sweep: [base.rp[G.far], now.rp[G.far]], sweepColor: P.cyan });
      st.tag('anc', [x, yy + box.rq * 0.8 + 15], `<span class="c-cy">r → a ${ph(now.rp[G.far])}</span>`, 'num', { screen: true });
    }
    st.end();

    // the title line and its explanation
    const turn = Math.max(0, ...now.phi.map((p, e) => Math.abs(p - base.phi[e])));
    const moved = Math.max(0, ...now.loops.map((x, i) => Math.abs(wrap(x - base.loops[i]))));
    const kind = G.id === '1' ? L('单格', 'One square') : G.id === '2' ? L('两格', 'Two squares') : L('四格', 'Four squares');
    $('hudBig').textContent = `${kind} · ${L('回路', 'loop')} ${phList(now.loops)}`;
    if (G.id === '2' && S.sel != null && !G.tree[S.sel]) {
      const d = (a, b) => { const x = wrap(a - b); return `${x > 0 ? '+' : x < 0 ? '−' : ''}${fix(Math.abs(x), 0)}°`; };
      const dl = d(now.loops[0], base.loops[0]), dr = d(now.loops[1], base.loops[1]), dc = d(now.chi[S.sel], base.chi[S.sel]);
      $('hudSub').textContent = L(`s = ${fix(s, 2)} · 边最多转了 ${fix(turn, 0)}° · 回路变了：左格 ${dl}、右格 ${dr}、外圈 ${dc}`, `s = ${fix(s, 2)} · edges turned up to ${fix(turn, 0)}° · loops moved: left ${dl}, right ${dr}, outer ${dc}`);
    } else $('hudSub').textContent = L(`s = ${fix(s, 2)} · 边最多转了 ${fix(turn, 0)}° · 回路相位变了 ${fix(moved, 0)}°`, `s = ${fix(s, 2)} · edges turned up to ${fix(turn, 0)}° · loop phases moved ${fix(moved, 0)}°`);
  }

  /* ---------- strip: every edge and every loop along the rail ---------- */
  function drawPlot() {
    const g = kit.plot($('plot'), { x: [0, 1], y: [-180, 180], pad: [34, 10, 10, 22] });
    g.axes({ yTicks: [[-180, '−180°'], [-90, '−90°'], [0, '0'], [90, '90°'], [180, '180°']], xTicks: [[0, '0'], [0.5, '½'], [1, '1']] });
    const N = 60, snaps = []; for (let i = 0; i <= N; i++) snaps.push(snapshot(i / N));
    const series = (f) => { const pts = []; let last = null; for (let i = 0; i <= N; i++) { const y = wrap(f(snaps[i])); if (last != null && Math.abs(y - last) > 180) pts.push(null); pts.push([i / N, y]); last = y; } return pts; };
    S.G.E.forEach((ab, e) => g.line(series((sn) => sn.phi[e]), S.hot && S.hot.kind === 'e' && S.hot.i === e ? P.amber : P.dim, { width: 1.2, alpha: 0.75 }));
    if (S.anc === 'far') g.line(series((sn) => sn.rp[S.G.far]), P.cyan, { width: 2.6 });
    S.G.squares.forEach((q, i) => g.line(series((sn) => sn.loops[i]), P.magenta, { width: 2.6 }));
    if (S.sel != null && S.G.id === '2') g.line(series((sn) => sn.chi[S.sel]), P.magenta, { width: 2, dash: [5, 4] });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    const items = [[P.dim, L('各边', 'edges')], [P.magenta, L('各方格', 'squares')]];
    if (S.sel != null && S.G.id === '2') items.push([P.magenta, L('外圈', 'outer loop'), 'dash']);
    if (S.anc === 'far') items.push([P.cyan, 'r → a']);
    g.legend(items, { bottom: true });
    $('plotMeta').textContent = `s ${fix(clock.t, 2)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const now = snapshot(clock.t), base = snapshot(0);
    $('roLoop').innerHTML = now.loops.map((x) => `<span class="c-mg">${ph(x)}</span>`).join(' · ');
    const moved = Math.max(0, ...now.loops.map((x, i) => Math.abs(wrap(x - base.loops[i]))));
    $('roLoopSub').textContent = L(`从 s = 0 起变了 ${fix(moved, 1)}°`, `moved ${fix(moved, 1)}° since s = 0`);
    $('roCount').textContent = `${now.n} · ${now.m} · ${now.k}`;
    $('roC').textContent = `${now.c} = ${now.m} + 1 − ${now.n}`;
    $('roA').textContent = `${now.a} = ${now.k} − 1`;
    $('roInv').textContent = `${now.c + now.a} = ${now.m} + ${now.k} − ${now.n}`;
    $('pillLoop').querySelector('strong').textContent = now.loops.map(ph).join(' · ');
    $('pillInv').querySelector('strong').textContent = String(now.c + now.a);
    const gaugeOnly = S.u1.every((x, e) => Math.abs(x - S.u0[e]) < 1e-9);
    $('roNote').textContent = gaugeOnly
      ? L('时间轴上只有规范变换：边在转，回路相位与锚点之间的路径相位不动。', 'Only a gauge transformation runs on the rail: the edges turn, the loop phases and the path phase between anchors do not.')
      : L('时间轴上改的是边相位本身，不是规范变换：回路相位可以变。', 'The rail changes the edge phases themselves, not a gauge: loop phases may move.');
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- direct manipulation ---------- */
  const ptr = (ev) => { const b = cv.getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; };
  const angleAt = (p, c) => Math.atan2(-(p[1] - c[1]), p[0] - c[0]) / DEG;
  function pick(ev) {
    if (!box) return false;
    const p = ptr(ev);
    for (let e = 0; e < S.G.E.length; e++) { const c = exy(e); if (Math.hypot(p[0] - c[0], p[1] - c[1]) < box.rd + 8) { start({ kind: 'e', i: e }); drag(ev); return true; } }
    for (let v = 0; v < S.G.V.length; v++) {
      const c = vxy(v);
      if (Math.hypot(p[0] - c[0], p[1] - c[1]) < box.rg + 8) {
        if (isAnchor(v)) { TRV.toast($('toast'), L('锚点上的规范固定为 1：这里拧不动。', 'The gauge is fixed to 1 at an anchor: this corner does not turn.')); return true; }
        start({ kind: 'v', i: v }); S.drag.last = angleAt(p, c); return true;
      }
    }
    return false;
  }
  function start(h) {
    cards.mark(null); clock.pause();
    if (h.kind === 'v' && clock.t < 1 - 1e-9) { bake(); clock.set(1); }
    S.hot = h; S.drag = h;
  }
  function drag(ev) {
    const h = S.drag; if (!h) return;
    const p = ptr(ev);
    if (h.kind === 'e') {
      const c = exy(h.i), want = angleAt(p, c), d = wrap(want - phiAt(clock.t)[h.i]);
      S.u0[h.i] += d; S.u1[h.i] += d;
    } else {
      const c = vxy(h.i), a = angleAt(p, c), d = wrap(a - h.last);
      h.last = a; S.th[h.i] += d / Math.max(clock.t, 1e-9);
    }
    paint();
  }

  /* ---------- controls ---------- */
  const latChips = kit.chips($('latChips'), 'lat', (id) => { cards.mark(null); clock.pause(); setLattice(id); clock.set(0); paint(); });
  const ancChips = kit.chips($('ancChips'), 'anc', (id) => { cards.mark(null); clock.pause(); bake(); S.anc = id; clock.set(0); paint(); });
  const rand = () => TRV.mulberry32(S.seed++);
  $('btnGauge').addEventListener('click', () => {
    cards.mark(null); clock.pause(); bake(); const r = rand();
    S.th = S.G.V.map((pv, v) => (isAnchor(v) ? 0 : 15 * Math.round(r() * 24 - 12)));
    S.hot = null; clock.set(0); clock.play();
  });
  $('btnTree').addEventListener('click', () => {
    cards.mark(null); clock.pause(); bake();
    const rp = rootPhase(S.u0); S.th = rp.map((x) => -wrap(x)); S.anc = 'root'; ancChips.set('root', true);
    S.hot = null; clock.set(0); clock.play();
  });
  $('btnField').addEventListener('click', () => {
    cards.mark(null); clock.pause(); const r = rand();
    S.u0 = S.G.E.map(() => 15 * Math.round(r() * 24 - 12)); S.u1 = S.u0.slice(); S.th = S.th.map(() => 0); S.hot = null; clock.set(0); paint();
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.4, step: 0.25,
    format: (t) => `s ${t.toFixed(2)} <small>/ 1</small>`,
    onChange: () => paint()
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    twist: { lat: '1', anc: 'root', th: [0, 360, 0, 0], hot: { kind: 'v', i: 1 }, still: 0.875 },
    chord: { lat: '2', anc: 'root', th: [0, 135, -105, 60, -150, 90], still: 1 },
    anchor: { lat: '4', anc: 'far', th: [0, 120, -75, 150, -135, 45, 90, -60, 0], still: 1 },
    tree: { lat: '4', anc: 'root', th: 'tree', still: 1 },
    two: { lat: '2', anc: 'root', du: { 5: 150 }, hot: { kind: 'e', i: 5 }, still: 1 },
    plaquette: { lat: '1', anc: 'root', th: [0, 90, 180, 270], still: 1 }
  };
  const NOTES = {
    twist: ['单个方格，只拧顶点 1 一整圈（琥珀色）：e₀ 与 e₁ 的指针一个顺转、一个逆转，各自转遍所有值（淡白的弧是它们已扫过的角度）；品红的回路相位一直停在 i，表盘上没有弧。',
      'One square, and only corner 1 turns a full circle (amber): the hands on e₀ and e₁ turn opposite ways and each passes through every value (the faint arcs are the angles they have swept); the magenta loop phase stays at i, with no arc on its dial.'],
    chord: ['两格。青色的生成树是上下两行与最左一列，右边那条弦的基本回路是品红虚线围出的整个长方形。除根以外的顶点一起拧：每条边的指针都在转，淡白的弧是它们扫过的角度；两格与外圈的品红指针都不动，表盘上没有弧。',
      'Two squares. The cyan tree is the top and bottom rows and the leftmost column; the fundamental loop of the right-hand chord is the whole rectangle inside the dashed magenta line. Every corner but the root turns: every hand on an edge moves, and the faint arcs are the angles they sweep; the magenta hands of both squares and of the outer loop stay put, with no arc on their dials.'],
    anchor: ['四格，根 r 与右上角 a 都是锁住的方块。其余顶点随意拧：青色带子标出的树路径 r → a 上，每条边都在转（淡白的弧是扫过的角度），路径相位（右侧青色指针）不动，表盘上没有弧。',
      'Four squares, with the root r and the top-right corner a both locked squares. The other corners turn freely: every edge along the tree path r → a (the cyan band) moves (the faint arcs are the angles swept), yet the path phase (the cyan hand on the right) stays put, with no arc on its dial.'],
    tree: ['四格。时间轴把每个顶点拧到它的树输运相位的倒数：青色的 8 条树边全部转到 1，4 条弦上剩下各自基本回路的相位。中间一列的弦等于它左边那一格，右边一列的弦等于同一行两格相乘。',
      'Four squares. The rail turns every corner by the inverse of its tree transport phase: all 8 cyan tree edges turn to 1, and the 4 chords keep the phases of their fundamental loops. A chord in the middle column equals the square to its left; a chord in the right column equals the product of the two squares in its row.'],
    two: ['两格，只转中间那条公共边（琥珀色）：左格的品红指针转了 +150°，右格转了 −150°（淡品红的弧），外圈的指针不动、没有弧。公共边在两格里走的方向相反，相乘时抵消。',
      'Two squares, and only the shared middle edge turns (amber): the magenta hand of the left square turns by +150°, the right square by −150° (the faint magenta arcs), and the outer loop does not move and has no arc. The shared edge is walked in opposite directions in the two squares, so it cancels in the product.'],
    plaquette: ['正文例题：边相位 (1, 1, 1, i)，规范 g = (1, i, −1, −i)。走完时间轴，四条边变成 (i, i, i, −1)，淡白的弧是各边指针扫过的角度；品红的回路相位始终是 i，表盘上没有弧。',
      'The worked example: edge phases (1, 1, 1, i) and the gauge g = (1, i, −1, −i). At the end of the rail the four edges read (i, i, i, −1), and the faint arcs are the angles their hands swept; the magenta loop phase is i throughout, with no arc on its dial.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); S.anc = p.anc; ancChips.set(p.anc, true); setLattice(p.lat);
    if (p.th === 'tree') S.th = rootPhase(S.u0).map((x) => -wrap(x)); else if (p.th) S.th = p.th.slice();
    if (p.du) for (const e of Object.keys(p.du)) S.u1[+e] = S.u0[+e] + p.du[e];
    S.hot = p.hot || null; if (id === 'two') S.sel = S.G.E.length - 1;
    clock.set(0);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else if (booting) kit.autoplay(clock, $('stage'));
    else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动边上的指针改相位，拖动顶点的紫色指针做规范变换，再拖时间轴从变换前看到变换后。', 'Free play: drag a hand on an edge to change its phase, drag the violet hand at a corner to make a gauge transformation, then scrub the rail from before the change to after it.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  window.GAUGE_DEBUG = {
    get state() {
      const G = S.G, now = snapshot(clock.t), base = snapshot(0);
      return {
        lattice: G.id, s: clock.t, playing: clock.playing, preset: cards.current, anc: S.anc,
        V: G.V.map((p) => p.slice()), E: G.E.map((e) => e.slice()), tree: G.tree.slice(), root: G.root, far: G.far,
        anchors: anchors(), sel: S.sel, hot: S.hot ? Object.assign({}, S.hot) : null,
        phi: now.phi.map(wrap), gauge: S.th.map((x) => wrap(clock.t * x)), loops: now.loops.map(wrap),
        chi: now.chi.map((x) => (x == null ? null : wrap(x))), rootPhase: now.rp.map(wrap),
        counts: { n: now.n, m: now.m, k: now.k, T: now.T, c: now.c, a: now.a, inv: now.c + now.a },
        loopText: $('roLoop').textContent, invText: $('roInv').textContent, hud: $('hudBig').textContent, hudSub: $('hudSub').textContent,
        // the angle each hand has swept since s = 0 (what the faint arcs show)
        swept: { phi: now.phi.map((p, e) => p - base.phi[e]), loops: now.loops.map((x, i) => x - base.loops[i]) }
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the dial of edge e and of corner v (for pointer tests). */
    edgeAt: (e) => { const b = cv.getBoundingClientRect(), c = exy(e); return [b.left + c[0], b.top + c[1], box.rd]; },
    vertexAt: (v) => { const b = cv.getBoundingClientRect(), c = vxy(v); return [b.left + c[0], b.top + c[1], box.rg]; }
  };
  window.TRV_THUMB = () => { clock.pause(); S.anc = 'root'; setLattice('4'); S.th = [0, 120, -75, 150, -135, 45, 90, -60, 30]; clock.pause(); clock.set(0.6); paint.now(); };
  setLattice('1');
  cards.pick(cards.initial('plaquette'));
  booting = false;
  paint();
})();
