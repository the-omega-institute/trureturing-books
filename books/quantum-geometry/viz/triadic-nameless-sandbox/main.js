/* 三元几何、递归花冠与去名相化同伦。 */
(() => {
  'use strict';
  const { kit } = TRV, { v3, clamp, fix } = kit, $ = (id) => document.getElementById(id), L = TRV.L;
  const PI = Math.PI, TAU = 2 * PI, PHI = (1 + Math.sqrt(5)) / 2, O = [0, 0, 0];
  let dottie = 0.7;
  for (let n = 0; n < 120; n++) dottie = Math.cos(dottie);
  const ROLE_DYAD = 'dyad', ROLE_OPERATOR = 'operator', ROLE_PROJECTION = 'projection';
  const S = { c0: 0.72, nuLang: 0.90, GenDepth: 1, RoleIndex: 0, view: 'iso', grow: 1 };
  const wCut = (v) => v * v * (3 - 2 * v);
  function invariants(c0 = S.c0, r = S.RoleIndex) {
    const st = Math.sqrt(2 * (1 - c0) / 3), ct = Math.sqrt((1 + 2 * c0) / 3);
    const V = [0, 1, 2].map((m) => [st * Math.cos(TAU * m / 3 + PI / 6), st * Math.sin(TAU * m / 3 + PI / 6), ct]);
    const i = ((r % 3) + 3) % 3, j = (i + 1) % 3, k = (i + 2) % 3;
    const sij = v3.scale(v3.add(V[i], V[j]), 1 / Math.sqrt(2 * (1 + c0)));
    const aij = v3.scale(v3.cross(V[i], V[j]), 1 / Math.sqrt(1 - c0 * c0));
    const alpha = Math.SQRT2 * c0 / Math.sqrt(1 + c0), beta = Math.sqrt((1 - c0) * (1 + 2 * c0) / (1 + c0));
    return { c0, V, i, j, k, Sij: sij, Aij: aij, alpha, beta, theta: Math.acos(c0), gamma: Math.acos(c0 / (1 + c0)),
      detG: (1 - c0) ** 2 * (1 + 2 * c0), omega: 3 * Math.acos(c0 / (1 + c0)) - PI,
      gram: V.map((a) => V.map((b) => v3.dot(a, b))), roles: { dyad0: i, dyad1: j, proj: k },
      vertexRoles: V.map((_, m) => m === k ? ROLE_PROJECTION : ROLE_DYAD), comparisonRole: ROLE_OPERATOR };
  }
  const cellCache = new Map();
  function cellsAt(c0, depth) {
    const key = `${c0}|${depth}`;
    if (cellCache.has(key)) return cellCache.get(key);
    const V = invariants(c0, 0).V, cells = [{ vertices: V, level: 0, parent: -1 }];
    let frontier = [[V[0], V[1], 0], [V[1], V[2], 0], [V[2], V[0], 0]];
    for (let level = 1; level < depth; level++) {
      const next = [];
      for (const [a, b, parent] of frontier) {
        const M = v3.unit(v3.add(a, b)), C = v3.unit(cells[parent].vertices.reduce(v3.add, O));
        const inward = v3.sub(C, v3.scale(M, v3.dot(C, M)));
        // 边大圆的法线也在中点的切平面内；选背离父胞的符号。
        let N = v3.unit(v3.cross(a, b));
        if (v3.dot(N, inward) >= 0) N = v3.scale(N, -1);
        const delta = 0.42 * PHI ** (1 - level), point = v3.add(v3.scale(M, Math.cos(delta)), v3.scale(N, Math.sin(delta)));
        const vertices = [b, a, point], index = cells.length;
        cells.push({ vertices, level, parent, edge: [a, b], midpoint: M, normal: N, point, delta });
        next.push([a, point, index], [point, b, index]);
      }
      frontier = next;
    }
    cellCache.set(key, cells);
    if (cellCache.size > 80) cellCache.delete(cellCache.keys().next().value);
    return cells;
  }
  const PRESETS = {
    'bootstrap-core': { GenDepth: 1, RoleIndex: 0, nuLang: 0.90, c0: 0.72, play: false, still: 0 },
    'cascade-corolla': { GenDepth: 3, RoleIndex: 0, nuLang: 0.88, c0: 0.72, play: true, still: 'end' },
    'cyclic-triality': { GenDepth: 1, RoleIndex: 1, nuLang: 0.92, c0: 0.72, play: true, still: 6 },
    'ladder-fade': { GenDepth: 2, RoleIndex: 0, nuLang: 0.35, c0: 0.72, play: false, still: 0 },
    'noumenon-breath': { GenDepth: 1, RoleIndex: 0, nuLang: 0, c0: 0.72, play: true, still: 7.4 }
  };
  const NOTES = {
    'bootstrap-core': ['二生三：青色二态、琥珀比较、品红投影同在 S²，平权服从比较公理 A₀，撑起 det G₃ > 0 的弧面体。', 'Two begets three: the cyan dyad, amber comparison and magenta projection share S² and axiom A₀ equally, opening det G₃ > 0.'],
    'cascade-corolla': ['无外部注入：跨边界递归长出 1 → 4 → 10 胞，青色与品红花瓣沿黄金阻尼步长展开。', 'Zero-input proliferation: boundary recursion grows 1 → 4 → 10 cells; cyan and magenta petals open in golden-damped steps.'],
    'cyclic-triality': ['120° 的 Z₃ 语言轮换：几何本体不动，二元、比较、投影三名相互换身份。', 'A 120° Z₃ triality: the body stays still while dyad, comparison and projection trade roles.'],
    'ladder-fade': ['ν = 0.35，切刀权重 0.28175：三块投影幕与轮廓半融回同一流形。', 'At ν = 0.35 the cut weight is 0.28175: three screens and contours dissolve halfway into one manifold.'],
    'noumenon-breath': ['ν = 0：幕布、投影线与舞台标签全部撤去，只剩两频率比为黄金比的持续呼吸。', 'At ν = 0 all screens, rays and stage tags withdraw, leaving continuing breathing with a golden frequency ratio.']
  };
  let clock, cards, fields, depthChips, roleChips, sceneChips, transition = null, drag = null, plotG = null, booting = true;
  const sc = kit.solid($('stage'), { canvas: $('cv'), yaw: -0.62, pitch: 0.38, radius: 0.32,
    onChange: () => paint(), onPick, onDrag, onDrop });
  const paint = kit.painter(() => {
    const G = invariants();
    drawText(G);
    TRV.hudFit();
    drawStage(G);
    drawPlot(G);
  }, [$('stage'), $('plot')]);
  const CAM = { iso: [-0.62, 0.38], noun: [-0.52, 0.85], verb: [1.0, 0.28], proj: [-2.0, 0.40], noumenon: [-0.30, -0.18] };
  function setView(view, instant = false) {
    S.view = view; sceneChips.set(view, true);
    sc.view(CAM[view], instant || TRV.still ? 0 : 650); paint();
  }
  function sync() {
    fields.nu.set(S.nuLang); fields.c.set(S.c0);
    depthChips.set(String(S.GenDepth), true); roleChips.set(String(S.RoleIndex), true);
  }
  function leave() { if (transition) transition.cancel(); transition = null; clock.pause(); cards.mark(null); }
  function setNu(v) { leave(); S.nuLang = clamp(v, 0, 1); sync(); paint(); }
  function setC0(v) { leave(); S.c0 = clamp(v, 0.20, 0.90); sync(); paint(); }
  function setRole(r) { leave(); S.RoleIndex = ((Math.round(r) % 3) + 3) % 3; sync(); paint(); }
  function setDepth(d) { leave(); S.GenDepth = clamp(Math.round(d), 1, 3); S.grow = 1; sync(); paint(); }
  function timeline(t) {
    if (cards && cards.current === 'cascade-corolla') S.grow = t / 12;
    if (cards && cards.current === 'cyclic-triality') { S.RoleIndex = (PRESETS['cyclic-triality'].RoleIndex + Math.floor(Math.min(t, 11.999) / 4)) % 3; roleChips.set(String(S.RoleIndex), true); }
    paint();
  }
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 12, step: 0.2, rate: 1,
    format: (t) => `τ ${fix(t, 2)} <small>/ 12</small>`, onChange: timeline });
  fields = { nu: kit.field($('nuLang'), { fmt: (v) => fix(v, 2), onInput: setNu }), c: kit.field($('c0'), { fmt: (v) => fix(v, 2), onInput: setC0 }) };
  depthChips = kit.chips($('GenDepth'), 'depth', (v) => setDepth(Number(v)));
  roleChips = kit.chips($('RoleIndex'), 'role', (v) => setRole(Number(v)));
  sceneChips = kit.chips($('sceneChips'), 'scene', (v) => setView(v));
  function applyPreset(id) {
    const p = PRESETS[id], from = { c0: S.c0, nuLang: S.nuLang };
    if (transition) transition.cancel();
    clock.pause();
    Object.assign(S, { c0: p.c0, nuLang: p.nuLang, GenDepth: p.GenDepth, RoleIndex: p.RoleIndex, grow: id === 'cascade-corolla' ? 0 : 1 });
    clock.set(0, true);
    setView(id === 'noumenon-breath' ? 'noumenon' : 'iso', booting);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    sync();
    if (!booting && !TRV.still) {
      transition = kit.tween(550, (e) => { S.c0 = from.c0 + (p.c0 - from.c0) * e; S.nuLang = from.nuLang + (p.nuLang - from.nuLang) * e; sync(); paint(); });
    }
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  }
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), idle: ['自由探索：拖动珠子或切换角色。', 'Explore freely: drag the bead or change roles.'], tour: $('tour'), onPick: applyPreset });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: () => setRole(S.RoleIndex + 1) });

  function onPick(ev) {
    if (S.nuLang < 0.15) return false;
    const G = invariants(), p = v3.scale(G.Sij, 1.04);
    if (sc.near(ev, p) > 23 || sc.occluded(p, 0.02)) return false;
    drag = { x: ev.clientX, c0: S.c0 }; return true;
  }
  function onDrag(ev) { if (drag) setC0(drag.c0 + (ev.clientX - drag.x) / 300); }
  function onDrop() { drag = null; }
  const plotDrag = (ev) => {
    if (!plotG) return;
    const rect = $('plot').getBoundingClientRect(), x = plotG.invX(ev.clientX - rect.left);
    if (S.nuLang < 0.15) { clock.pause(); clock.set(clamp(x, 0, 12)); } else setC0(x);
  };
  $('plot').addEventListener('pointerdown', (ev) => { $('plot').setPointerCapture(ev.pointerId); plotDrag(ev); });
  $('plot').addEventListener('pointermove', (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) plotDrag(ev); });
  $('plot').addEventListener('pointerup', (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) $('plot').releasePointerCapture(ev.pointerId); });

  function noumRadius(theta, phi, t) {
    return 0.78 * (1 + 0.18 * Math.sin(theta) ** 3 * Math.cos(3 * (phi - PI / 6) - t) + 0.09 * Math.sin(2 * theta) * Math.cos(PHI * t));
  }
  const normalsOf = (V) => V.map((a, m) => v3.unit(v3.cross(a, V[(m + 1) % 3])));
  function sharpRadius(q, G) {
    // 顶点按正向绕序排列，内侧点与每条边的法线内积非负。
    const distance2 = (normals) => normals.reduce((sum, n) => sum + Math.max(0, -v3.dot(q, n)) ** 2, 0);
    let d2 = distance2(G.edgeNormals || normalsOf(G.V));
    // 光滑并合正在展开的胞域：每片花瓣内部与公共边仍为单位半径。
    for (const normals of G.petalNormals || []) {
      const child = distance2(normals);
      d2 = d2 + child > 0 ? d2 * child / (d2 + child) : 0;
    }
    const phi = Math.atan2(q[1], q[0]);
    return 1 - (0.34 - 0.06 * (1 - q[2] * q[2]) * Math.cos(3 * (phi - PI / 6))) * d2 / (d2 + 0.88 ** 2);
  }
  const arc = (a, b, n = 28) => Array.from({ length: n + 1 }, (_, i) => v3.slerp(a, b, i / n));
  function cellFraction(cell) {
    return cell.level === 0 ? 1 : clamp(S.grow * (S.GenDepth - 1) - (cell.level - 1), 0, 1);
  }
  let screenCount = 0, rayCount = 0, renderedCells = 1;
  function drawStage(G) {
    const P = TRV.palette, w = wCut(S.nuLang), named = S.nuLang >= 0.15;
    const cells = named ? cellsAt(S.c0, S.GenDepth).filter((c) => cellFraction(c) > 0).map((cell) => ({
      ...cell, vertices: cell.level ? cell.vertices.map((p) => v3.slerp(cell.midpoint, p, cellFraction(cell))) : cell.vertices
    })) : [];
    G.edgeNormals = normalsOf(G.V);
    G.petalNormals = cells.filter((c) => c.level && cellFraction(c) > 0.001).map((c) => normalsOf(c.vertices));
    sc.begin();
    const overlay = sc.overlay(), dpr = TRV.fitCanvas(overlay), ctx = overlay.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, sc.W, sc.H);
    sc.surface('manifold', (theta, phi) => {
      const q = v3.sph(theta, phi), radius = (1 - w) * noumRadius(theta, phi, cards.current === 'cyclic-triality' ? 0 : clock.t) + w * sharpRadius(q, G);
      return v3.scale(q, radius);
    }, { u: [0, PI], v: [0, TAU], nu: 80, nv: 120, alpha: 1,
      colors: [P.sigma, P.cyan, P.amber], value: (theta, phi) => 0.50 + 0.25 * Math.sin(theta) * Math.cos(3 * (phi - PI / 6)) - 0.45 * Math.cos(theta),
      range: [0, 1], grid: { every: [8, 12], color: P.sigma, alpha: 0.13 } });
    sc.bead(O, { key: 'origin', color: P.violet, r: 4 });
    screenCount = 0; rayCount = 0; renderedCells = 1;
    if (named) {
      sc.glass('sheen', [0, 0, 0.05], 1.018, { color: P.sigma, alpha: 0.035 * w, rim: 0.22 * w, pick: false });
      const zFloor = -0.76;
      for (const r of [0.46, 0.88, 1.32]) sc.circle([0, 0, zFloor], [0, 0, 1], r, { color: P.dim, alpha: 0.28 * w, width: 1, fade: false });
      for (let m = 0; m < 3; m++) {
        const az = PI / 6 + TAU * m / 3;
        sc.line([[0, 0, zFloor], [1.40 * Math.cos(az), 1.40 * Math.sin(az), zFloor]], { color: P.dim, alpha: 0.24 * w, width: 1 });
      }
      renderedCells = cells.length;
      for (const [index, cell] of cells.entries()) {
        const V = cell.vertices, color = [P.cyan, P.amber, P.magenta][cell.level];
        const onBody = (p, lift = 0.006) => v3.scale(p, index === 0 ? 1 + lift : Math.max(1.005, sharpRadius(p, G) + lift));
        sc.surface(`cap-${index}`, (u, v) => onBody(v3.unit(v3.add(v3.scale(V[0], 1 - u), v3.scale(v3.add(v3.scale(V[1], 1 - v), v3.scale(V[2], v)), u))), 0.005),
          { u: [0, 1], v: [0, 1], nu: 20, nv: 24, color, alpha: (index ? 0.60 : 0.78) * w, pick: false });
        for (let e = 0; e < 3; e++) sc.tube(`edge-${index}-${e}`, arc(V[e], V[(e + 1) % 3]).map((p) => onBody(p, 0.009)),
          { color: index === 0 ? (e === G.i ? P.amber : P.sigma) : color, width: index === 0 ? (e === G.i ? 3.2 : 2.2) : 1.25, alpha: (index ? 0.66 : 0.92) * w, pick: false });
      }
      // 固定三种重心坐标之一，再将线段径向提升：三组都是大圆弧。
      for (let axis = 0; axis < 3; axis++) for (let k = 1; k < 5; k++) {
        const t = k / 5, a = v3.unit(v3.add(v3.scale(G.V[axis], t), v3.scale(G.V[(axis + 1) % 3], 1 - t))),
          b = v3.unit(v3.add(v3.scale(G.V[axis], t), v3.scale(G.V[(axis + 2) % 3], 1 - t)));
        sc.line(arc(a, b).map((p) => v3.scale(p, 1.009)), { color: P.sigma, alpha: 0.42 * w, width: 1 });
      }
      sc.arrow(v3.scale(G.Sij, G.alpha), G.V[G.k], { color: P.magenta, width: 1.3, alpha: 0.30 * w, headSize: 7 });
      // 后上方的名词幕抬高，另两幕分居左右，避免任何一幕藏进实体背面。
      const screens = [
        { key: 'Screen_Noun', az: PI, z: 0.52, color: P.cyan, label: L('切片一：二元名词', 'Slice 1: Dyadic noun') },
        { key: 'Screen_Verb', az: -0.12, z: -0.26, color: P.amber, label: L('切片二：比较动词', 'Slice 2: Action verb') },
        { key: 'Screen_Proj', az: -2 * PI / 3 - 0.15, z: -0.26, color: P.magenta, label: L('切片三：投影结果', 'Slice 3: Projected result') }
      ];
      for (const [m, screen] of screens.entries()) {
        const radial = [Math.cos(screen.az), Math.sin(screen.az), 0];
        const c = screen.center = [1.32 * radial[0], 1.32 * radial[1], screen.z];
        const n = v3.unit(v3.add(v3.scale(radial, -0.35), [Math.sin(0.62), -Math.cos(0.62), 0]));
        const u = [-n[1], n[0], 0], v = v3.add(v3.scale(n, -Math.sin(PI / 15)), [0, 0, Math.cos(PI / 15)]);
        const normal = v3.unit(v3.cross(u, v));
        const local = (a, b, front = 0.004) => v3.add(c, v3.add(v3.add(v3.scale(u, a), v3.scale(v, b)), v3.scale(normal, front)));
        const corners = [[-0.24, -0.26], [0.24, -0.26], [0.24, 0.26], [-0.24, 0.26]].map(([a, b]) => local(a, b, 0));
        screen.top = local(0, 0.29); screen.corners = corners;
        sc.fan(corners, { fill: P.sigma, alpha: 0.07 * w });
        sc.line(corners, { color: screen.color, alpha: 0.65 * w, close: true, width: 1.2 });
        const disc = (a, b, r, color, count, alpha) => {
          const points = Array.from({ length: count }, (_, j) => local(a + r * Math.cos(TAU * j / count), b + r * Math.sin(TAU * j / count)));
          sc.fan(points, { fill: color, alpha: alpha * w }); sc.line(points, { color, close: true, alpha: alpha * w, width: 1 });
        };
        if (m === 0) {
          sc.line([local(-0.12, -0.015), local(0.12, 0.045)], { color: P.cyan, width: 2, alpha: 0.92 * w });
          disc(-0.12, -0.015, 0.026, P.cyan, 12, 0.92); disc(0.12, 0.045, 0.026, P.cyan, 12, 0.92);
        } else if (m === 1) {
          const hook = Array.from({ length: 24 }, (_, j) => { const t = j / 23; return local(-0.09 + 0.18 * Math.sin(PI * t * 0.85), -0.15 + 0.30 * t); });
          sc.line(hook, { color: P.amber, width: 2.2, alpha: 0.95 * w });
          const tip = hook.at(-1), back = hook.at(-3), d = v3.unit(v3.sub(tip, back));
          sc.line([v3.add(v3.sub(tip, v3.scale(d, 0.035)), v3.scale(u, 0.023)), tip, v3.sub(v3.sub(tip, v3.scale(d, 0.035)), v3.scale(u, 0.023))], { color: P.amber, width: 1.5, alpha: 0.95 * w });
        } else {
          sc.line([local(-0.14, -0.13), local(0.14, -0.13), local(-0.03, 0.12)], { color: P.cyan, close: true, width: 1.6, alpha: 0.9 * w });
          sc.line([local(-0.03, 0.12), local(-0.03, -0.13)], { color: P.sigma, dash: [3, 3], width: 1, alpha: 0.42 * w });
          disc(-0.03, 0.12, 0.040, P.amber, 16, 0.88);
        }
        const samples = m === 0 ? [G.V[G.i], G.V[G.j]] : m === 1 ? [G.Sij] : [G.V[G.k], v3.scale(G.Sij, G.alpha)];
        for (const p of samples) {
          const q = local(v3.dot(p, u) * 0.18, (p[2] - 0.7) * 0.20);
          sc.line([p, q], { color: screen.color, dash: [5, 5], alpha: 0.45 * w, width: 1 }); rayCount++;
        }
        screenCount++;
      }
      placeLabels(G, screens, ctx);
      G.V.forEach((p, m) => sc.bead(v3.scale(p, 1.035), { key: `v${m}`, color: m === G.k ? P.magenta : P.cyan, r: 5.5 }));
      sc.bead(v3.scale(G.Sij, 1.04), { key: 'comparison', color: P.amber, r: 6.2 });
      sc.ring(v3.scale(G.Sij, 1.036), { key: 'cmp-halo-1', color: P.cyan, r: 11, normal: G.Sij });
      sc.ring(v3.scale(G.Sij, 1.033), { key: 'cmp-halo-2', color: P.amber, r: 17, normal: G.Sij });
    } else {
      sc.ring([1.09 * Math.cos(clock.t * 0.27), -0.55, 0.72 * Math.sin(clock.t * 0.27)], { key: 'floating', color: P.violet, r: 9, normal: sc.facing() });
    }
    sc.end();
  }

  /* 标签按优先级寻找空位，最后在舞台内部搜索；不会强塞进冲突区域。 */
  const measure = document.createElement('span');
  measure.className = 'label-measure'; measure.hidden = true; $('stage').appendChild(measure);
  const labelSizes = new Map();
  TRV.onLang(() => labelSizes.clear());
  if (document.fonts) document.fonts.ready.then(() => labelSizes.clear());
  function placeLabels(G, screens, ctx) {
    if (TRV.thumbMode) return;
    const stage = $('stage'), b = stage.getBoundingClientRect(), boxes = [];
    const visible = (el) => el.getClientRects().length && getComputedStyle(el).opacity !== '0' && getComputedStyle(el).visibility !== 'hidden';
    for (const el of stage.querySelectorAll(':scope > .hud-tl, :scope > .hud-tr, :scope > .hud-bl')) if (visible(el)) {
      const q = el.getBoundingClientRect(); boxes.push({ x: q.left - b.left - 4, y: q.top - b.top - 4, w: q.width + 8, h: q.height + 8 });
    }
    const center = sc.p([0, 0, 0.65]);
    const labels = G.V.map((p, m) => ({ key: `vertex-${m}`, p, text: `V${['₀', '₁', '₂'][m]} · ${m === G.k ? L('创生投影', 'Projection') : L('二元初态', 'Dyad')}`, cls: m === G.k ? 'c-mg' : 'c-cy', pri: 10 }));
    labels.push({ key: 'cmp', p: v3.scale(G.Sij, 1.04), text: L('比较算子', 'Comparison'), cls: 'c-am', pri: 9 });
    screens.forEach((s, m) => labels.push({ key: s.key, p: s.top, text: s.label, cls: ['c-cy', 'c-am', 'c-mg'][m], pri: 12, screen: true }));
    const placed = [];
    const intersects = (a, c) => a.x < c.x + c.w + 3 && c.x < a.x + a.w + 3 && a.y < c.y + c.h + 3 && c.y < a.y + a.h + 3;
    for (const l of labels.sort((a, c) => c.pri - a.pri)) {
      const cls = `raw backed ${l.cls}`, cache = `${l.text}|${sc.W < 620}`, key = cache;
      let size = labelSizes.get(key);
      if (!size) {
        measure.className = `tag ${cls}`; measure.textContent = l.text; measure.hidden = false; measure.style.visibility = 'hidden';
        size = [measure.offsetWidth, measure.offsetHeight]; measure.hidden = true; labelSizes.set(key, size);
      }
      const [w, h] = size, q = sc.p(l.p), candidates = [];
      const dx = q[0] - center[0], dy = q[1] - center[1], length = Math.hypot(dx, dy) || 1;
      const preferred = l.screen ? [[q[0], q[1] - h / 2 - 7], [q[0] - w / 3, q[1] - h / 2 - 7], [q[0] + w / 3, q[1] - h / 2 - 7]] :
        [26, 46, 68].map((r) => [q[0] + dx / length * (w / 2 + r), q[1] + dy / length * (h / 2 + r)]);
      candidates.push(...preferred);
      for (const radius of [24, 44, 68, 96, 128]) for (let a = 0; a < 16; a++) candidates.push([q[0] + radius * Math.cos(TAU * a / 16), q[1] + radius * Math.sin(TAU * a / 16)]);
      for (let y = 20; y < sc.H - 15; y += 20) for (let x = 12 + w / 2; x < sc.W - 12 - w / 2; x += Math.max(20, w / 3)) candidates.push([x, y]);
      let best = null, distance = Infinity;
      for (const [ci, [x, y]] of candidates.entries()) {
        const r = { x: x - w / 2, y: y - h / 2, w, h };
        if (r.x < 10 || r.y < 10 || r.x + w > sc.W - 10 || r.y + h > sc.H - 10 || boxes.some((c) => intersects(r, c))) continue;
        const d = (x - q[0]) ** 2 + (y - q[1]) ** 2 - (ci < preferred.length ? 12000 : 0);
        if (d < distance) { best = r; distance = d; }
      }
      if (!best) continue;
      boxes.push(best); placed.push({ box: best, q });
      sc.tag(l.key, [best.x + w / 2, best.y + h / 2], l.text, cls, { screen: true });
    }
    const blocked = (a, c, box) => {
      const x0 = box.x - 2, x1 = box.x + box.w + 2, y0 = box.y - 2, y1 = box.y + box.h + 2;
      let lo = 0, hi = 1;
      for (const [p, d, min, max] of [[a[0], c[0] - a[0], x0, x1], [a[1], c[1] - a[1], y0, y1]]) {
        if (Math.abs(d) < 0.001) { if (p < min || p > max) return false; }
        else { const t0 = (min - p) / d, t1 = (max - p) / d; lo = Math.max(lo, Math.min(t0, t1)); hi = Math.min(hi, Math.max(t0, t1)); }
      }
      return lo < hi && hi > 0 && lo < 1;
    };
    ctx.strokeStyle = TRV.palette.dim; ctx.globalAlpha = 0.42 * wCut(S.nuLang); ctx.lineWidth = 0.8;
    for (const { box, q } of placed) {
      const x = box.x + box.w / 2, y = box.y + box.h / 2, dx = q[0] - x, dy = q[1] - y;
      if (Math.hypot(dx, dy) <= 18) continue;
      const factor = Math.min((box.w / 2 + 3) / Math.max(0.001, Math.abs(dx)), (box.h / 2 + 3) / Math.max(0.001, Math.abs(dy)));
      const end = [x + dx * factor, y + dy * factor], start = q.slice(0, 2), obstacles = boxes.filter((r) => r !== box);
      const paths = [[start, end], [start, [start[0], end[1]], end], [start, [end[0], start[1]], end]];
      const route = paths.find((path) => path.slice(1).every((c, i) => obstacles.every((r) => !blocked(path[i], c, r))));
      if (!route) continue;
      ctx.beginPath(); ctx.moveTo(...route[0]); route.slice(1).forEach((p) => ctx.lineTo(...p)); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawText(G) {
    const named = S.nuLang >= 0.15, w = wCut(S.nuLang);
    $('hudBig').textContent = named ? L('同一原胞 · 三种切片', 'One cell · three slices') : L('无名流形 · 黄金呼吸', 'Nameless manifold · golden breathing');
    $('hudSub').textContent = named ? `c₀ = ${fix(S.c0, 2)} · det G₃ = ${fix(G.detG, 6)} · r = ${S.RoleIndex}` : L(`ν = ${fix(S.nuLang, 2)} · 撤去幕布、投影线与标签`, `ν = ${fix(S.nuLang, 2)} · screens, rays and tags withdrawn`);
    const V = (m) => `V${['₀', '₁', '₂'][m]}`;
    $('legend').innerHTML = named ? `<span><i class="sw cy"></i>${L('二元初态', 'Dyad')}: ${V(G.i)}, ${V(G.j)}</span><span><i class="sw am"></i>${L('比较算子: 弧', 'Comparison:')} ${V(G.i)}↔${V(G.j)}</span><span><i class="sw mg"></i>${L('创生投影', 'Projection')}: ${V(G.k)}</span>` : `<span><i class="sw cy"></i>${L('连续曲面', 'Continuous surface')}</span><span><i class="sw vi"></i>${L('两频呼吸', 'Two frequencies')} · 1 : ${fix(PHI, 5)}</span>`;
    $('pillC').textContent = fix(S.c0, 2); $('pillG').textContent = fix(G.detG, 4);
    $('roDet').textContent = fix(G.detG, 6);
    const count = cellsAt(S.c0, S.GenDepth).filter((c) => cellFraction(c) > 0).length;
    $('roCells').textContent = L(` · ${count} 胞`, ` · ${count} cells`);
    $('roTheta').textContent = `${fix(G.theta * 180 / PI, 2)}° / ${fix(dottie * 180 / PI, 2)}°`;
    $('roBeta').textContent = fix(G.beta, 6); $('roUnit').textContent = fix(G.alpha ** 2 + G.beta ** 2, 12);
    $('roOmega').textContent = `${fix(G.omega, 6)} / ${fix(G.omega * 180 / PI, 2)}°`;
    $('roCut').textContent = `${fix(w, 5)} / ${fix(PHI, 6)}`;
  }
  function drawPlot(G) {
    const P = TRV.palette, nameless = S.nuLang < 0.15;
    plotG = kit.plot($('plot'), { x: nameless ? [0, 12] : [0.20, 0.90], y: nameless ? [-1.15, 1.15] : [0, 1.22], pad: [32, 12, 8, 24] });
    const g = plotG;
    g.axes({ xTicks: nameless ? [0, 4, 8, 12] : [0.2, 0.4, 0.6, 0.9], yTicks: nameless ? [-1, 0, 1] : [0, 0.5, 1] });
    if (nameless) {
      const ts = Array.from({ length: 241 }, (_, i) => 12 * i / 240);
      g.line(ts.map((t) => [t, Math.cos(t)]), P.cyan, { width: 2 });
      g.line(ts.map((t) => [t, Math.cos(PHI * t)]), P.magenta, { width: 2 });
      g.line(ts.map((t) => [6 + 1.05 * Math.cos(t), 0.85 * Math.sin(PHI * t)]), P.violet, { width: 1, alpha: 0.45 });
      g.vline(clock.t, P.amber); g.dot(clock.t, Math.cos(clock.t), P.amber, 3);
      $('plotTitle').textContent = L('不闭合的两频呼吸', 'Two frequencies, no closed period');
      $('plotMeta').textContent = 'cos τ · cos(φ τ)';
    } else {
      const xs = Array.from({ length: 121 }, (_, i) => 0.20 + 0.70 * i / 120);
      g.line(xs.map((c) => [c, (1 - c) ** 2 * (1 + 2 * c)]), P.cyan, { width: 2 });
      g.line(xs.map((c) => [c, Math.sqrt((1 - c) * (1 + 2 * c) / (1 + c))]), P.magenta, { width: 2 });
      g.line(xs.map((c) => [c, 3 * Math.acos(c / (1 + c)) - PI]), P.violet, { width: 2 });
      g.vline(S.c0, P.amber); g.dot(S.c0, wCut(S.nuLang), P.amber, 4); g.dot(S.c0, G.detG, P.amber, 3);
      $('plotTitle').textContent = L('改变比较，几何如何撑开', 'How comparison opens the geometry');
      $('plotMeta').textContent = 'det G₃ · β · Ω₀ · w';
    }
  }
  window.TRIAD_DEBUG = Object.freeze({
    getState: () => JSON.parse(JSON.stringify({ ...S, ...invariants(), preset: cards.current, t: clock.t, playing: clock.playing, max: clock.max, wCut: wCut(S.nuLang), omega1: 1, omega2: PHI, screenCount, peripheralScreens: screenCount, rayCount, renderedCells, camera: sc.cam })),
    invariants: (c, r) => invariants(c, r), cellsAt: (c, d) => JSON.parse(JSON.stringify(cellsAt(c, d))),
    setNu, setC0, setRole, setDepth, wCut,
    screen: (p) => { const b = $('stage').getBoundingClientRect(), q = sc.p(p); return [b.left + q[0], b.top + q[1]]; },
    plotBox: () => ({ left: $('plot').getBoundingClientRect().left, top: $('plot').getBoundingClientRect().top, width: plotG.iw, pad: plotG.pl })
  });
  window.TRV_THUMB = () => { cards.pick('bootstrap-core'); sc.view([-0.62, 0.42, 0.96], 0); paint.now(); };
  cards.pick(cards.initial('bootstrap-core')); booting = false; paint();
})();
