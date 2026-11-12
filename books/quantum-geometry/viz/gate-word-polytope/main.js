/* GATE//POLYTOPE · 门字多面体 · The polytope of gate words
   The Bloch sphere. From the north pole e_z, the {H, T} words of length at most L reach the finite set S_L
   (S_L = S_{L−1} ∪ R_H(S_{L−1}) ∪ R_T(S_{L−1}), with R_H(x, y, z) = (z, −y, x) and R_T(x, y, z) = ((x − y)/√2, (x + y)/√2, z),
   as in the worked example of Chapter 16). Each point keeps the first (shortest) word that reaches it.
   The convex hull P_L = conv(S_L) is built incrementally (points added in breadth-first order) and snapshotted after
   every layer. For a target direction n: h = max n·s, the angle arccos h to the nearest point and the radial gap 1 − h.
   The covering radius ε_L = max over the sphere of that angle is attained at the outer normal of a face of the hull
   (the centre of an empty cap), or, for L ≤ 2, at the analogous directions of a point, a segment, a triangle.
   The rail is L (0 … 20). Read-only probe for the browser suite: window.GATE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, LMAX = 20, R2 = Math.SQRT1_2, TH = TRV.thumbMode ? 1.6 : 1;

  /* ---------- the reachable points, layer by layer ---------- */
  const RH = (p) => [p[2], -p[1], p[0]];
  const RT = (p) => [(p[0] - p[1]) * R2, (p[0] + p[1]) * R2, p[2]];
  const key = (p) => p.map((c) => (Math.round(c * 1e7) / 1e7 + 0).toFixed(7)).join(',');
  const PTS = [{ p: [0, 0, 1], word: '', layer: 0 }], seen = new Set([key([0, 0, 1])]), UPTO = [1];
  {
    let front = [0];
    for (let l = 1; l <= LMAX; l++) {
      const next = [];
      for (const i of front) for (const [g, f] of [['H', RH], ['T', RT]]) {
        const q = f(PTS[i].p), k = key(q);
        if (seen.has(k)) continue;
        seen.add(k); PTS.push({ p: q, word: g + PTS[i].word, layer: l }); next.push(PTS.length - 1);
      }
      front = next; UPTO.push(PTS.length);
    }
  }

  /* ---------- incremental convex hull, snapshotted after each layer ---------- */
  const EPS = 1e-10;
  function face(a, b, c, inside) {
    const A = PTS[a].p, n0 = v3.cross(v3.sub(PTS[b].p, A), v3.sub(PTS[c].p, A)), ln = v3.len(n0);
    let n = v3.scale(n0, 1 / ln), v = [a, b, c];
    if (v3.dot(n, v3.sub(inside, A)) > 0) { n = v3.scale(n, -1); v = [a, c, b]; }
    return { v, n, d: v3.dot(n, A) };
  }
  const HULLS = [];
  {
    let faces = null, inside = null, start = 0;
    // the first four points in breadth-first order that are not coplanar
    const quad = [0];
    for (let i = 1; i < PTS.length && quad.length < 4; i++) {
      const A = PTS[quad[0]].p, p = PTS[i].p;
      if (quad.length === 1) quad.push(i);
      else if (quad.length === 2) { if (v3.len(v3.cross(v3.sub(PTS[quad[1]].p, A), v3.sub(p, A))) > 1e-9) quad.push(i); }
      else if (Math.abs(v3.dot(v3.cross(v3.sub(PTS[quad[1]].p, A), v3.sub(PTS[quad[2]].p, A)), v3.sub(p, A))) > 1e-9) quad.push(i);
    }
    const add = (i) => {
      const p = PTS[i].p, vis = faces.map((f) => v3.dot(f.n, p) - f.d > -EPS);
      if (!vis.some(Boolean)) return;
      const owner = new Map();
      faces.forEach((f, k) => { for (let e = 0; e < 3; e++) owner.set(`${f.v[e]},${f.v[(e + 1) % 3]}`, k); });
      const made = [];
      faces.forEach((f, k) => {
        if (!vis[k]) return;
        for (let e = 0; e < 3; e++) {
          const a = f.v[e], b = f.v[(e + 1) % 3], twin = owner.get(`${b},${a}`);
          if (twin != null && !vis[twin]) made.push(face(a, b, i, inside));
        }
      });
      faces = faces.filter((f, k) => !vis[k]).concat(made);
    };
    for (let l = 0; l <= LMAX; l++) {
      if (!faces && UPTO[l] > quad[3]) {
        inside = v3.scale(quad.reduce((s, i) => v3.add(s, PTS[i].p), [0, 0, 0]), 0.25);
        const [a, b, c, d] = quad;
        faces = [face(a, b, c, inside), face(a, b, d, inside), face(a, c, d, inside), face(b, c, d, inside)];
        for (let i = 0; i < UPTO[l]; i++) if (!quad.includes(i)) add(i);
        start = UPTO[l];
      } else if (faces) { for (let i = start; i < UPTO[l]; i++) add(i); start = UPTO[l]; }
      HULLS.push(faces ? faces.map((f) => ({ v: f.v.slice(), n: f.n, d: f.d })) : null);
    }
  }

  /* ---------- the hole: covering radius per layer ---------- */
  function worstOf(l) {
    const n = UPTO[l], pt = (i) => PTS[i].p;
    if (HULLS[l]) {
      let best = null;
      for (const f of HULLS[l]) if (!best || f.d < best.d - 1e-12) best = f;
      return { dir: best.n, eps: Math.acos(clamp(best.d, -1, 1)), minD: best.d };
    }
    if (n === 1) return { dir: v3.scale(pt(0), -1), eps: Math.PI, minD: -1 };
    if (n === 2) { const m = v3.unit(v3.scale(v3.add(pt(0), pt(1)), -1)); return { dir: m, eps: Math.acos(clamp(v3.dot(m, pt(0)), -1, 1)), minD: v3.dot(m, pt(0)) }; }
    const nn = v3.unit(v3.cross(v3.sub(pt(1), pt(0)), v3.sub(pt(2), pt(0))));
    const h1 = v3.dot(nn, pt(0)), m = h1 < 0 ? nn : v3.scale(nn, -1), h = Math.min(h1, -h1);
    return { dir: m, eps: Math.acos(clamp(h, -1, 1)), minD: h };
  }
  const WORST = HULLS.map((_, l) => worstOf(l));
  /** Edges of the hull for drawing, without the diagonals of flat faces made of several triangles. */
  const EDGES = HULLS.map((faces) => {
    if (!faces) return null;
    const own = new Map(), out = [];
    faces.forEach((f, k) => { for (let e = 0; e < 3; e++) { const a = f.v[e], b = f.v[(e + 1) % 3], kk = a < b ? `${a},${b}` : `${b},${a}`; if (!own.has(kk)) own.set(kk, [a, b, k]); else own.get(kk).push(k); } });
    own.forEach(([a, b, k1, k2]) => { if (k2 == null || v3.dot(faces[k1].n, faces[k2].n) < 1 - 1e-9) out.push([a, b]); });
    return out;
  });

  /* ---------- state ---------- */
  const S = { mode: 'free', draw: 'chord', theta: 110, phi: 200, chart: false };   // chart: the ε_L staircase on the stage (the shrink card)
  const level = () => Math.min(LMAX, Math.floor(clock.t + 1e-9));
  const target = () => (S.mode === 'worst' ? WORST[level()].dir : v3.sph(S.theta * DEG, S.phi * DEG));
  function nearest(l, n) {
    let best = -2, at = 0;
    for (let i = 0; i < UPTO[l]; i++) { const d = v3.dot(PTS[i].p, n); if (d > best + 1e-12) { best = d; at = i; } }
    return { i: at, h: best, angle: Math.acos(clamp(best, -1, 1)) };
  }
  const shape = (l) => {
    if (UPTO[l] === 1) return 'point'; if (UPTO[l] === 2) return 'segment'; if (!HULLS[l]) return 'triangle';
    const m = WORST[l].minD; return m < -1e-9 ? 'outside' : m < 1e-9 ? 'onface' : 'inside';
  };
  const SHAPE = {
    point: ['单点', 'a point'], segment: ['线段', 'a segment'], triangle: ['平面三角形', 'a flat triangle'],
    outside: ['立体，球心在外', 'solid, centre outside'], onface: ['立体，球心在面上', 'solid, centre on a face'], inside: ['立体，球心在内部', 'solid, centre inside']
  };
  const wordText = (w) => (w ? w : L('空字', 'empty word'));

  /* ---------- stage ---------- */
  let grab = false;
  const SO = {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.36, cy: 0.54, yaw: -0.9, pitch: 0.42,
    onChange: () => paint(),
    onPick: (ev, st) => { grab = st.near(ev, target()) < 22; return grab; },
    onDrag: (ev, st) => {
      if (!grab) return;
      const x = v3.unit(st.pick(ev));
      S.mode = 'free'; modeChips.set('free', true);
      S.theta = Math.acos(clamp(x[2], -1, 1)) / DEG; S.phi = ((Math.atan2(x[1], x[0]) / DEG) + 360) % 360;
      fT.set(Math.round(S.theta)); fF.set(Math.round(S.phi) % 360);
      leave(); paint();
    },
    onDrop: () => { grab = false; }
  };
  const stage = kit.solid($('stage'), SO);
  /** Points of the great-circle arc from the unit vector u to the unit vector w, lifted just off the sphere. */
  const arcPts = (u, w, n, lift = 1.004) => { const out = []; for (let k = 0; k <= n; k++) out.push(v3.scale(v3.slerp(u, w, k / n), lift)); return out; };
  /** Where the staircase goes when it shares the stage: right of the sphere, or below it on a narrow stage. */
  function chartBox() {
    const W = $('stage').clientWidth, H = $('stage').clientHeight, narrow = W < 560;
    const top = Math.max(56, $('hudBig').parentElement.getBoundingClientRect().bottom - $('stage').getBoundingClientRect().top + 30), bottom = H - Math.max(24, $('legend').offsetHeight + 22);
    return narrow ? { narrow, x: 14, y: H * 0.6, w: W - 28, h: bottom - H * 0.6 } : { narrow, x: W * 0.58, y: top, w: W * 0.4 - 14, h: bottom - top };
  }
  function drawStage() {
    const st = stage, l = level(), n = target(), near = nearest(l, n), W = WORST[l], sh = shape(l), thumb = TRV.thumbMode;
    // with the staircase on the stage the sphere moves aside to make room for it; the staircase goes on #flat
    const cb = S.chart && !thumb ? chartBox() : null;
    SO.cx = cb && !cb.narrow ? 0.3 : 0.5; SO.cy = cb && cb.narrow ? 0.36 : 0.54; SO.radius = cb ? (cb.narrow ? 0.26 : 0.32) : thumb ? 0.4 : 0.36;
    $('flat').hidden = !cb;
    st.begin();
    // the Bloch sphere: a glass shell and its equator
    st.glass('bloch', [0, 0, 0], 1, { color: P.cyan, alpha: thumb ? 0.14 : 0.08, rim: 0.55 });
    const eq = []; for (let k = 0; k < 96; k++) eq.push([Math.cos(kit.TAU * k / 96), Math.sin(kit.TAU * k / 96), 0]);
    st.line(eq, { color: P.cyan, width: 1.1 * TH, alpha: thumb ? 0.6 : 0.4, close: true });
    // the two axes: T turns about e_z by 45°, H turns about (e_x + e_z)/√2 by 180°
    const AX = [['T', [0, 0, 1]], ['H', [R2, 0, R2]]];
    for (const [g, a] of AX) {
      st.line([v3.scale(a, -1.22), v3.scale(a, 1.22)], { color: P.violet, width: 1.2 * TH, alpha: 0.55 });
      if (!thumb) st.tag('ax' + g, v3.scale(a, 1.16), L(`${g} 的转轴`, `axis of ${g}`), 'raw c-vi', { dx: g === "H" ? 50 : 36, dy: g === "H" ? -16 : 0, occlude: false });
    }
    // the polytope: an opaque, flat-shaded solid; in the projected drawing its edges are carried radially onto the sphere
    const pt = (i) => PTS[i].p, geo = S.draw === 'geo' && sh === 'inside';
    if (HULLS[l]) {
      st.poly('hull', { vertices: PTS.slice(0, UPTO[l]).map((q) => q.p), faces: HULLS[l].map((f) => f.v) }, { color: P.cyan, edges: geo ? false : P.ink, id: 'hull' });
      if (geo) for (const [a, b] of EDGES[l]) st.line(arcPts(pt(a), pt(b), 16), { color: P.cyan, width: 1.4 * TH, alpha: 0.85 });
    } else if (sh === 'segment') st.tube('seg', [pt(0), pt(1)], { color: P.cyan, width: 2 * TH });
    else if (sh === 'triangle') st.poly('tri', { vertices: [pt(0), pt(1), pt(2)], faces: [[0, 1, 2]] }, { color: P.cyan, edges: P.ink, id: 'tri' });
    // the reachable points
    for (let i = 0; i < UPTO[l]; i++) st.bead(v3.scale(pt(i), 1.008), { r: (UPTO[l] > 200 ? 2.2 : 3.2) * TH, color: P.cyan, glow: 0.7 });
    if (!thumb && UPTO[l] <= 8) for (let i = 0; i < UPTO[l]; i++) if (i !== near.i) st.tag('w' + i, pt(i), wordText(PTS[i].word), 'num cy', { dx: 0, dy: -14 });
    // the worst direction: the empty cap of angular radius ε, its rim dashed on the sphere
    if (S.mode === 'worst' && W.eps < Math.PI - 1e-9) {
      const c = v3.scale(n, Math.cos(W.eps)), u = v3.unit(v3.cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), w = v3.cross(n, u), rim = [];
      for (let k = 0; k < 120; k++) { const a = kit.TAU * k / 120; rim.push(v3.scale(v3.add(c, v3.scale(v3.add(v3.scale(u, Math.cos(a)), v3.scale(w, Math.sin(a))), Math.sin(W.eps))), 1.004)); }
      st.line(rim, { color: P.magenta, width: 1.6 * TH, alpha: 0.9, dash: [6, 4], close: true });
    }
    // the gap: the arc to the nearest point, and the radial piece between the support plane and the sphere
    const s = pt(near.i);
    if (near.angle > 1e-9) st.tube('gapArc', arcPts(n, s, 48), { color: P.magenta, width: 2.4 * TH });
    st.ring(v3.scale(s, 1.008), { r: 6.5 * TH, normal: s, color: P.magenta, key: 'nearest' });
    st.arrow([0, 0, 0], n, { color: P.amber, width: 2.2 * TH, headSize: 9 });
    // the radial gap on top of the arrow: from the support plane (height h) out to the sphere
    if (near.angle > 1e-9) {
      st.tube('gapRad', [v3.scale(n, near.h), n], { color: P.magenta, width: 4 * TH });
      st.bead(v3.scale(n, near.h), { r: 3.2 * TH, color: P.magenta, key: 'support' });
    }
    st.bead(n, { r: 5 * TH, color: P.amber, glow: 1, key: 'target' });
    if (!thumb) {
      const sq = st.p(s), nq = st.p(n), right = sq[0] >= nq[0] ? 1 : -1;
      st.tag('near', s, wordText(PTS[near.i].word), 'num mg', { dx: right * 34, dy: -12 });
      st.tag('tgt', n, S.mode === 'worst' ? `ε = ${fix(W.eps / DEG, 1)}°` : `${fix(near.angle / DEG, 1)}°`, 'num c-am', { dx: -right * 30, dy: 14 });
      st.tag('N', [0, 0, 1.08], 'e<sub>z</sub>', 'tick', { dx: -18, dy: -6 });
    }
    if (cb) drawChart(cb, l);
    st.end();
  }
  /** The staircase on the stage, drawn on the flat canvas #flat over the solid (shown only while the card SHRINK holds
      it): ε_L for every length computed by the page (magenta), the current length amber. */
  function drawChart(b, l) {
    const W = $('flat').clientWidth, H = $('flat').clientHeight;
    const g = kit.plot($('flat'), { x: [-0.6, LMAX + 0.6], y: [0, 190], pad: [b.x + 40, W - b.x - b.w, b.y + 22, H - b.y - b.h + 20] });
    g.axes({ yTicks: [0, 45, 90, 135, 180], yFmt: (v) => `${v}°`, xTicks: [0, 5, 10, 15, 20] });
    WORST.forEach((w, k) => g.rect(k - 0.36, 0, k + 0.36, w.eps / DEG, k === l ? P.amber : P.magenta, { alpha: k === l ? 0.9 : 0.6 }));
    stage.tag('chT', [b.x + 40 + (b.w - 40) / 2, b.y + 6], L('每个门长 L 的最大缺口 ε', 'largest hole ε for each length L'), 'raw', { screen: true });
    stage.tag('chV', [g.X(l) - (l > LMAX - 3 ? 18 : 0), g.Y(WORST[l].eps / DEG) - 14], `<span class="c-am">${fix(WORST[l].eps / DEG, 2)}°</span>`, 'num', { screen: true });
  }

  /* ---------- strip: ε_L against L ---------- */
  function drawPlot() {
    const l = level(), g = kit.plot($('plot'), { x: [-0.5, LMAX + 0.5], y: [0, 190], pad: [34, 10, 8, 22] });
    g.axes({ yTicks: [0, 45, 90, 135, 180], yFmt: (v) => `${v}°`, xTicks: [0, 5, 10, 15, 20] });
    WORST.forEach((w, k) => g.rect(k - 0.36, 0, k + 0.36, w.eps / DEG, k === l ? P.amber : P.magenta, { alpha: k === l ? 0.85 : 0.55 }));
    g.hline(90, P.dim, { dash: [3, 3] });
    g.legend([[P.magenta, L('最坏方向的角度 ε', 'angle of the worst direction ε')]]);
    $('plotMeta').textContent = `L = ${l} · ε = ${fix(WORST[l].eps / DEG, 2)}°`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const l = level(), n = target(), near = nearest(l, n), W = WORST[l], w = PTS[near.i].word;
    $('hudBig').innerHTML = L(`门长 ≤ ${l} · ${UPTO[l]} 个点`, `Length ≤ ${l} · ${UPTO[l]} point${UPTO[l] === 1 ? "" : "s"}`);
    $('hudSub').innerHTML = `<span class="c-am">${S.mode === 'worst' ? L('最坏方向', 'worst direction') : L('目标', 'target')}</span> → <span class="c-mg">${L('最近点', 'nearest point')} ${fix(near.angle / DEG, 2)}°</span> · ${L('最大缺口', 'largest hole')} ε = ${fix(W.eps / DEG, 2)}°`;
    $('roAngle').textContent = `${fix(near.angle / DEG, 2)}°`;
    $('roAngleSub').innerHTML = ` <small>h = ${fix(near.h, 4)}</small>`;
    $('roWord').innerHTML = `${wordText(w)} <small>· ${L(`${w.length} 个门`, `${w.length} gate${w.length === 1 ? '' : 's'}`)}</small>`;
    $('roGap').textContent = fix(1 - near.h, 4);
    $('roCount').textContent = `${UPTO[l]} · ${Math.pow(2, l + 1) - 1}`;
    $('roEps').textContent = `${fix(W.eps / DEG, 2)}°`;
    $('roShape').textContent = L(...SHAPE[shape(l)]);
    $('roAside').textContent = `L = ${l}`;
    $('roNote').innerHTML = near.angle < 1e-9
      ? L('目标正好是一个可达点：门字精确命中，间隙为零。', 'The target is a reachable point: the word hits it exactly, and the gap is zero.')
      : L(`平直多面体在这个方向的高度只有 h = ${fix(near.h, 3)}，离球皮还差 ${fix(1 - near.h, 3)}。`, `In this direction the flat polytope reaches only h = ${fix(near.h, 3)}, ${fix(1 - near.h, 3)} short of the sphere.`);
    $('pillL').querySelector('strong').textContent = String(l);
    $('pillEps').querySelector('strong').textContent = `${fix(W.eps / DEG, 1)}°`;
    const items = [['cy', '门字的落点与它们的凸包', 'where the words land, and their hull'], ['am', S.mode === 'worst' ? '最坏方向' : '目标方向', S.mode === 'worst' ? 'the worst direction' : 'the target direction'],
      ['mg', S.mode === 'worst' ? '到最近点的缺口；空球冠' : '到最近点的弧；径向间隙', S.mode === 'worst' ? 'gap to the nearest point; the empty cap' : 'arc to the nearest point; radial gap'], ['vi', 'H 与 T 的转轴', 'axes of H and T']];
    $('legend').innerHTML = items.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail: the word length ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: LMAX, rate: 2.5, step: 1,
    format: (t, max) => `L = ${Math.floor(t + 1e-9)} <small>/ ${max.toFixed(0)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      paint();
    }
  });

  /* ---------- controls ---------- */
  const leave = () => { cards.mark(null); stopAt = null; S.chart = false; };
  const fT = kit.field($('theta'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.mode = 'free'; modeChips.set('free', true); S.theta = v; paint(); } });
  const fF = kit.field($('phi'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); S.mode = 'free'; modeChips.set('free', true); S.phi = v; paint(); } });
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { leave(); S.mode = v; paint(); });
  const drawChips = kit.chips($('drawChips'), 'draw', (v) => { leave(); S.draw = v; paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); stopAt = null; clock.set(0); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    one: { L: 1, mode: 'free', theta: 90, phi: 0, draw: 'chord', view: [-0.35, 0.35] },
    three: { L: 3, mode: 'free', theta: 90, phi: 180, draw: 'chord', view: [0.3, 0.38] },
    six: { L: 6, mode: 'worst', theta: 110, phi: 200, draw: 'geo', aim: [0.3, -0.12] },
    nearest: { L: 10, mode: 'free', theta: 110, phi: 200, draw: 'chord', view: [1.0, -0.12] },
    shrink: { L: 20, mode: 'worst', theta: 110, phi: 200, draw: 'chord', aim: [0.55, -0.2], chart: true }
  };
  const NOTES = {
    one: ['门长 1：北极是 T 的不动点，只有 H 把它送到 e<sub>x</sub>。两个青色的点只连成一条线段；琥珀色的目标就落在 e<sub>x</sub> 上，门字 H 精确命中，没有品红的缺口。紫色是 H 与 T 的转轴。', 'Length 1: the north pole is fixed by T, and only H carries it to e<sub>x</sub>. The two cyan points span just a segment; the amber target sits on e<sub>x</sub>, the word H hits it exactly, and there is no magenta gap. Violet marks the axes of H and T.'],
    three: ['门长 3：五个青色的顶点第一次围成立体，但它们都在 x ≥ 0、z ≥ 0 的一侧，球心在外面。琥珀色的目标指向 −e<sub>x</sub>：最近的顶点在 90° 外，品红的径向间隙从球心一直到球皮，整整为 1。', 'Length 3: the five cyan vertices enclose a solid for the first time, but all of them lie where x ≥ 0 and z ≥ 0, so the centre is outside. The amber target points to −e<sub>x</sub>: the nearest vertex is 90° away, and the magenta radial gap runs all the way from the centre to the sphere, a full 1.'],
    six: ['门长 6：19 个点的凸包已经包住球心，把棱沿半径投到球皮上，就成了一张青色的大圆弧网格。网格里最大的一个洞仍是品红虚线圈住的空球冠，半径 ε = 47.27°，琥珀色的箭头指着它的中心。', 'Length 6: the hull of 19 points now holds the centre, and projecting its edges radially onto the sphere gives a mesh of cyan great-circle arcs. The largest hole in the mesh is still the empty cap circled in dashed magenta, of radius ε = 47.27°, with the amber arrow at its centre.'],
    nearest: ['门长 10、64 个点：琥珀色的目标在 θ = 110°、φ = 200°。离它最近的可达点由门字 HTHTTTTTH 到达，相隔 17.04°（品红的弧）；平直多面体在这个方向的高度是 0.956，离球皮还差 0.044（品红的半径段）。', 'Length 10, 64 points: the amber target is at θ = 110°, φ = 200°. The nearest reachable point is reached by the word HTHTTTTTH, 17.04° away (the magenta arc); in this direction the flat polytope reaches height 0.956, 0.044 short of the sphere (the magenta piece of radius).'],
    shrink: ['门长从 0 走到 20：球上青色的点一层层变密，品红虚线圈出的最大空球冠一级级缩小。旁边的台阶是每个门长的最大缺口 ε：从 180° 缩到 9.10°，有几层一点也不缩，琥珀色的是当前门长。到 L = 20 有 971 个点，洞仍然在。', 'The length runs from 0 to 20: the cyan points on the sphere grow denser layer by layer, and the largest empty cap circled in dashed magenta shrinks. The staircase beside it is the largest hole ε at each length: from 180° down to 9.10°, not shrinking at all at some layers, with the current length in amber. At L = 20 there are 971 points, and the hole is still there.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause(); stopAt = null;
    S.mode = p.mode; S.theta = p.theta; S.phi = p.phi; S.draw = p.draw; S.chart = !!p.chart;
    modeChips.set(S.mode, true); drawChips.set(S.draw, true); fT.set(p.theta); fF.set(p.phi);
    // worst-direction cards look at the worst direction of their length, a little from the side
    const aimAt = (d, o) => [Math.atan2(-d[0], -d[1]) + o[0], clamp(Math.asin(clamp(d[2], -1, 1)) + o[1], -1.4, 1.4)];
    stage.view(p.aim ? aimAt(WORST[p.L].dir, p.aim) : p.view, TRV.still || booting ? 0 : 600);
    clock.set(p.L);
    // a still (cover, cited figure shot) and the opening of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    clock.set(0);
    stopAt = p.L < LMAX ? p.L : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖时间轴改门长，在球上拖动琥珀色的目标，或换成最坏方向。随时可以再选一张卡。', 'Free play: drag the rail to change the length, drag the amber target on the sphere, or switch to the worst direction. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.GATE_DEBUG = {
    get state() {
      const l = level(), n = target(), near = nearest(l, n);
      return { L: l, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, mode: S.mode, draw: S.draw, theta: S.theta, phi: S.phi,
        target: n, count: UPTO[l], points: PTS.slice(0, UPTO[l]).map((q) => ({ p: q.p, word: q.word })),
        faces: HULLS[l] ? HULLS[l].map((f) => ({ v: f.v.slice(), n: f.n, d: f.d })) : null,
        chart: S.chart, eps: WORST[l].eps / DEG, worst: WORST[l].dir, shape: shape(l), nearest: { p: PTS[near.i].p, word: PTS[near.i].word, angle: near.angle / DEG }, h: near.h, gap: 1 - near.h,
        epsAll: WORST.map((w) => w.eps / DEG), counts: UPTO.slice(), flat: !$('flat').hidden };
    },
    seek: (t) => { clock.pause(); stopAt = null; clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Set the camera ([yaw, pitch, zoom]; the suite puts it back after turning it). */
    setCamera: (c) => { stage.cam.yaw = c.yaw; stage.cam.pitch = c.pitch; stage.cam.zoom = c.zoom; paint(); },
    screen: (v) => { const q = stage.p(v), b = $('stage').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('nearest'); cards.mark('nearest'); S.mode = 'worst'; clock.pause(); clock.set(9); const d = WORST[9].dir; stage.cam.yaw = Math.atan2(-d[0], -d[1]) + 0.35; stage.cam.pitch = clamp(Math.asin(d[2]) - 0.1, -1.4, 1.4); paint.now(); };
  cards.pick(cards.initial('nearest'));
  booting = false;
  paint();
})();
