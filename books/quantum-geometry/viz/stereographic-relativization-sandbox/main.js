/* 单位球上的有限微弧与穿孔坐标图；显示变换不参与数学读数。 */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, $ = id => document.getElementById(id);
  const PI = Math.PI, TURN = 2 * PI, N = [0, 0, 1];
  const CHART_SCALE = 0.16, LIFT = 0.8, FLOOR = -1.15;
  const POWER = Math.log((28.4 - 1) / (2 / Math.tan(0.06) - 1)) / Math.log(0.85);
  const S = { scene: 'blindspot-divergence', tau: 1, psi: 25, delta_blind: 0.12 };
  const PRESETS = {
    'blindspot-divergence': { tau: 1, psi: 25, delta_blind: 0.12, still: 0, play: false },
    'compact-homotopy': { tau: 0.85, psi: 25, delta_blind: 0.12, still: 0, play: false },
    'oracle-collapse': { tau: 0.65, psi: 0, delta_blind: 0.12, still: 0, play: false },
    'oracle-chase': { tau: 0.85, psi: 65, delta_blind: 0.12, still: 0, play: false },
    'tetralemma-rest': { tau: 0.50, psi: 35, delta_blind: 0.12, still: 0, play: false }
  };
  const TITLES = {
    'blindspot-divergence': ['盲点 · 透视发散', 'Blind spot · perspective divergence'],
    'compact-homotopy': ['紧化 · 连续展开', 'Compactification · continuous unfolding'],
    'oracle-collapse': ['神谕 A · 折叠对称', 'Oracle A · folding symmetry'],
    'oracle-chase': ['神谕 B · 追逐分离', 'Oracle B · pursuit separation'],
    'tetralemma-rest': ['四句离相 · 双生止息', 'Tetralemma · twin-projection rest']
  };
  const NOTES = {
    'blindspot-divergence': ['青色微弧平静回返；琥珀投影在 θ=0.65 时放大 4.90×，盲点边缘全展幅 33.3×。', 'The calm cyan arc returns; amber projection magnifies by 4.90× at θ=0.65, with a full rim span of 33.3×.'],
    'compact-homotopy': ['τ=0.85：紫色同伦骨架展向平面，展幅 28.4×；青色本源弧长不变。', 'At τ=0.85 violet homotopy ribs unfold toward the chart, spanning 28.4×; cyan source length stays fixed.'],
    'oracle-collapse': ['ψ=0°：验证与生成重合于青色折叠环，r=0.00；示意 TQBF 神谕 A 下 Pᴬ=NPᴬ。', 'At ψ=0° verification and generation share the cyan ring, r=0.00; a model of Pᴬ=NPᴬ under TQBF oracle A.'],
    'oracle-chase': ['ψ=65°：品红追逐差 r=0.70；盲点球冠 Δ>0，不能据此裁决无神谕问题。', 'At ψ=65° the magenta pursuit gap is r=0.70; the blind cap keeps Δ>0, leaving the oracle-free question undecided.'],
    'tetralemma-rest': ['球面与平面同台安顿：悬置静态全知与无穷后退的终局断言。', 'Sphere and chart rest together, suspending final decrees of static omniscience and endless regress.']
  };
  let clock, cards, fields, frame, bounds, pills = [], transition;
  const options = { canvas: $('cv'), yaw: -0.28, pitch: 0.43, radius: 0.15, wheel: false, onChange: () => paint() };
  const sc = kit.solid($('stage'), options);
  const paint = kit.painter(draw, [$('stage'), $('plot')]);
  const source = (theta, phi) => v3.sph(theta, phi);
  const project = p => [p[0] / (1 - p[2]), p[1] / (1 - p[2]), 0];
  const lifted = p => v3.add(p, [0, 0, LIFT]);
  const chart = p => [CHART_SCALE * p[0], CHART_SCALE * p[1], FLOOR];
  const spiralPhi = theta => -1.6 + 9.4 * (1.9 - theta) / (1.9 - S.delta_blind);
  const samples = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  function geometry() {
    const theta = S.delta_blind + (0.65 - S.delta_blind) * (1 + Math.cos(PI * clock.t / 12)) / 2;
    const point = source(theta, spiralPhi(theta)), projected = project(point);
    const rimRadius = 1 / Math.tan(S.delta_blind / 2), spanMax = 2 * rimRadius, blend = S.tau ** POWER;
    const sourceArc = samples(240, q => { const a = 1.9 + (S.delta_blind - 1.9) * q; return source(a, spiralPhi(a)); });
    const arcLength = sourceArc.slice(1).reduce((s, p, i) => s + v3.len(v3.sub(p, sourceArc[i])), 0);
    return { theta, point, projected, rimRadius, spanMax, blend, span: 1 + (spanMax - 1) * blend,
      mu: 1 / (1 - Math.cos(theta)), separation: 0.772 * Math.sin(S.psi * PI / 180),
      gap: Math.sin(S.delta_blind / 2) ** 2, sourceArc, arcLength,
      collapsed: S.psi === 0, displayScale: CHART_SCALE, homotopyPower: POWER };
  }
  function sync() { for (const id of ['tau', 'psi', 'delta_blind']) fields[id].set(S[id]); }
  function free() { if (transition) transition.cancel(); clock.pause(); cards.mark(null); }
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('time'), max: 12, step: 0.25, rate: 0.7,
    format: t => `t ${fix(t, 2)} <small>/ 12</small>`, onChange: () => paint() });
  fields = {};
  for (const id of ['tau', 'psi', 'delta_blind']) fields[id] = kit.field($(id), {
    fmt: v => id === 'psi' ? `${fix(v, 0)}°` : fix(v, 2), onInput: v => { free(); S[id] = v; paint(); }
  });
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'),
    idle: ['自由探索：球面微弧与平面坐标同步对应。', 'Free exploration: source arc and chart coordinates stay paired.'],
    onPick: id => {
      if (transition) transition.cancel(); clock.pause();
      const from = { ...S }, p = PRESETS[id];
      Object.assign(S, { scene: id, tau: p.tau, psi: p.psi, delta_blind: p.delta_blind });
      clock.set(p.still); sync();
      if (!TRV.still) transition = kit.tween(420, q => {
        for (const key of ['tau', 'psi', 'delta_blind']) S[key] = from[key] + (p[key] - from[key]) * q;
        sync(); paint();
      });
      paint();
    }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  // 抽屉在散文之后镜像右栏的全部依据框；开放问题只在抽屉里。
  $('drawerEvidence').append(...[...$('evidence').querySelectorAll(':scope > .lean')].map(node => node.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  const keys = items => items.map(([c, t]) => `<span class="key"><i class="sw ${c}"></i>${t}</span>`).join('');

  function text(G) {
    $('hudBig').textContent = L(...TITLES[S.scene]);
    const read = { roTheta: `${fix(G.theta, 2)} rad`, roMu: `${fix(G.mu, 2)}×`,
      roSpanMax: `${fix(G.spanMax, 1)}×`, roSpan: `${fix(G.span, 1)}×`, roSeparation: fix(G.separation, 2), roGap: `${fix(100 * G.gap, 2)}% > 0` };
    for (const [id, value] of Object.entries(read)) $(id).textContent = value;
    // 舞台说明只写这张卡在图上看得见的那几个数，完整读数在右栏。
    const sub = {
      'blindspot-divergence': `θ = ${read.roTheta} · μ(θ) = ${read.roMu} · 2R(δ) = ${read.roSpanMax}`,
      'compact-homotopy': `τ = ${fix(S.tau, 2)} · H(τ) = ${read.roSpan} · 2R(δ) = ${read.roSpanMax}`,
      'oracle-collapse': `ψ = ${fix(S.psi, 0)}° · r(ψ) = ${read.roSeparation} · δ_blind = ${fix(S.delta_blind, 2)} rad`,
      'oracle-chase': `ψ = ${fix(S.psi, 0)}° · r(ψ) = ${read.roSeparation} · Δ = ${read.roGap}`,
      'tetralemma-rest': `τ = ${fix(S.tau, 2)} · ψ = ${fix(S.psi, 0)}° · δ_blind = ${fix(S.delta_blind, 2)} rad`
    };
    $('hudSub').textContent = sub[S.scene];
    $('pillTheta').textContent = read.roTheta; $('pillSpan').textContent = read.roSpanMax;
    const legend = [['cy', L('有限本源弧', 'Finite source arc')], ['am', L('盲点／透视坐标', 'Aperture / chart')],
      ['vi', L('切面／同伦', 'Slice / homotopy')], [G.collapsed ? 'cy' : 'mg', G.collapsed ? L('折叠重合', 'Folded coincidence') : L('追逐／封顶缺口', 'Pursuit / cap gap')]];
    $('legend').innerHTML = legend.map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
    TRV.hudFit();
  }
  function fit(G) {
    const rect = $('stage').getBoundingClientRect(), hud = $('hud').getBoundingClientRect(), legend = $('legend').getBoundingClientRect();
    const W = $('stage').clientWidth, H = $('stage').clientHeight;
    const top = TRV.thumbMode ? 18 : hud.bottom - rect.top + 14, bottom = TRV.thumbMode ? 18 : rect.bottom - legend.top + 12;
    const chartRadius = Math.max(1.2, CHART_SCALE * G.rimRadius) + 0.25, points = [];
    for (let j = 0; j <= 24; j++) for (let k = 0; k < 32; k++) points.push(lifted(source(PI * j / 24, TURN * k / 32)));
    for (let j = 0; j < 72; j++) points.push([chartRadius * Math.cos(TURN * j / 72), chartRadius * Math.sin(TURN * j / 72), FLOOR]);
    const psi = S.psi * PI / 180;
    for (const u of [-2.05, 2.05]) for (const v of [-1.5, 1.5]) points.push([u, v * Math.cos(psi), -0.25 + v * Math.sin(psi)]);
    const y = sc.cam.yaw, p = sc.cam.pitch, right = [Math.cos(y), -Math.sin(y), 0], up = [Math.sin(y) * Math.sin(p), Math.cos(y) * Math.sin(p), Math.cos(p)];
    const xs = points.map(q => v3.dot(q, right)), ys = points.map(q => v3.dot(q, up));
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const band = TRV.thumbMode ? 0 : 28, unit = Math.min((W - 40) / (x1 - x0), Math.max(80, H - top - bottom - band * 2) / (y1 - y0));
    options.radius = unit / Math.min(W, H);
    options.cx = (W / 2 - unit * (x0 + x1) / 2) / W;
    options.cy = (top + (H - top - bottom) / 2 + unit * (y0 + y1) / 2) / H;
    bounds = { W, H, top, bottom, chartRadius };
  }
  function draw() {
    if (!clock || !cards || !fields) return;
    const G = geometry(), P = TRV.palette; frame = G;
    text(G); fit(G); sc.begin();
    const groundRadius = Math.max(0.5, CHART_SCALE * G.span / 2), fullRadius = CHART_SCALE * G.rimRadius;
    sc.surface('source-sphere', (theta, phi) => lifted(source(theta, phi)), {
      u: [0, PI], v: [0, TURN], nu: 48, nv: 72, color: P.sigma, alpha: 0.19,
      grid: { every: [4, 6], color: P.cyan, alpha: 0.20 }, pick: false
    });
    sc.glass('sphere-rim', [0, 0, LIFT], 1.004, { color: P.sigma, alpha: 0.015, rim: 0.12 });
    sc.line(G.sourceArc.map(lifted), { color: P.cyan, width: 2.7, alpha: 0.95 });
    // 赤道坐标图按固定比例显示；读数保持单位球的原始尺度。
    sc.surface('equatorial-chart', (r, phi) => [r * Math.cos(phi), r * Math.sin(phi), FLOOR], {
      u: [0, Math.max(fullRadius, 1.2)], v: [0, TURN], nu: 12, nv: 72, color: P.amber, alpha: 0.025, pick: false
    });
    for (const ratio of [0.20, 0.40, 0.65, 1]) sc.circle([0, 0, FLOOR], N, groundRadius * ratio, { color: P.amber, width: ratio === 1 ? 2 : 1, alpha: ratio === 1 ? 0.60 : 0.25 });
    for (let j = 0; j < 8; j++) {
      const a = TURN * j / 8;
      sc.line([[0, 0, FLOOR], [Math.max(fullRadius, 1.2) * Math.cos(a), Math.max(fullRadius, 1.2) * Math.sin(a), FLOOR]], { color: P.dim, width: 0.8, alpha: 0.22 });
    }
    const unfolding = p => v3.lerp(lifted(p), chart(project(p)), G.blend);
    const unfolded = G.sourceArc.map(unfolding);
    sc.line(unfolded, { color: P.amber, width: 2.2, alpha: 0.88 });
    if (G.blend > 0.001 && G.blend < 0.999) {
      for (let j = 0; j < 8; j++) {
        const az = TURN * j / 8;
        const rib = samples(70, q => v3.lerp(lifted(source(S.delta_blind + (PI - S.delta_blind) * q, az)), chart(project(source(S.delta_blind + (PI - S.delta_blind) * q, az))), G.blend));
        sc.line(rib, { color: P.violet, width: 1.0, alpha: S.scene === 'compact-homotopy' ? 0.50 : 0.22 });
      }
    }
    const pole = lifted(N), apertureZ = LIFT + Math.cos(S.delta_blind), apertureR = Math.sin(S.delta_blind);
    sc.circle([0, 0, apertureZ], N, apertureR, { color: P.amber, width: 3.2, alpha: 1 });
    sc.surface('blind-cap', (theta, phi) => lifted(v3.scale(source(theta, phi), 1.008)), {
      u: [0, S.delta_blind], v: [0, TURN], nu: 10, nv: 48, color: P.magenta, alpha: 0.30, pick: false
    });
    sc.line(samples(54, q => {
      const a = 0.25 + q * 1.65 * PI;
      return [apertureR * 1.07 * Math.cos(a), apertureR * 1.07 * Math.sin(a), apertureZ + 0.035];
    }), { color: P.magenta, width: 2.2, alpha: 0.95 });
    for (const theta of [1.25, 0.65, S.delta_blind]) {
      const p = source(theta, spiralPhi(theta));
      sc.line([pole, lifted(p)], { color: P.amber, width: 1.0, alpha: 0.25 });
      sc.line([lifted(p), chart(project(p))], { color: P.amber, dash: [5, 4], width: 1.1, alpha: 0.40 });
    }
    sc.bead(lifted(G.point), { key: 'source-bead', color: P.cyan, r: 5.2 });
    sc.bead(unfolding(G.point), { key: 'chart-bead', color: P.amber, r: 4.3 });
    sc.line([pole, lifted(G.point), unfolding(G.point)], { color: P.amber, width: 1.4, alpha: 0.7 });

    const psi = S.psi * PI / 180, sliceAt = (u, v) => [u, v * Math.cos(psi), -0.25 + v * Math.sin(psi)];
    sc.surface('oracle-slice', sliceAt, { u: [-2.05, 2.05], v: [-1.5, 1.5], nu: 12, nv: 10,
      color: P.violet, alpha: S.scene === 'tetralemma-rest' ? 0.055 : 0.095, pick: false });
    const corners = [[-2.05, -1.5], [2.05, -1.5], [2.05, 1.5], [-2.05, 1.5]].map(([u, v]) => sliceAt(u, v));
    sc.line(corners, { color: P.violet, width: 1.2, alpha: 0.45, close: true });
    const ring = (r, shift = 0) => samples(120, q => sliceAt(r * Math.cos(TURN * q), r * Math.sin(TURN * q) + shift));
    const branchColor = G.collapsed ? P.cyan : P.magenta;
    const emphasis = S.scene === 'oracle-chase' || S.scene === 'oracle-collapse' ? 1 : 0.42;
    sc.line(ring(1.18), { color: G.collapsed ? P.cyan : P.violet, width: G.collapsed ? 3.6 : 1.6, alpha: 0.85 * emphasis });
    sc.line(ring(1.18 + 0.60 * G.separation), { color: branchColor, width: G.collapsed ? 3.6 : 2.5, alpha: 0.90 * emphasis });
    if (!G.collapsed) {
      sc.line(samples(110, q => {
        const a = TURN * q, r = 1.18 + G.separation * (0.12 + 0.48 * q);
        return sliceAt(r * Math.cos(a), r * Math.sin(a));
      }), { color: P.magenta, width: 1.9, alpha: 0.75 * emphasis });
      sc.circle([0, 0, FLOOR - 0.012], N, groundRadius + 0.20 * G.separation, { color: P.magenta, width: 2.5, alpha: S.scene === 'oracle-chase' ? 0.90 : 0.40 });
    }
    sc.end(); drawPills(G, P, pole); drawPlot(G, P);
  }
  // 条带小图：沿这张卡唯一在变的那个量，画出它驱动的曲线；琥珀珠是当前值。
  function drawPlot(G, P) {
    const cv = $('plot'), narrow = cv.clientWidth < 420, pad = [42, 14, 10, 22];
    const plotKind = S.scene === 'compact-homotopy' ? 'homotopy' : S.scene.startsWith('oracle') ? 'slice' : 'divergence';
    let title, meta, key;
    if (plotKind === 'divergence') {
      const g = kit.plot(cv, { x: [0, 1.9], y: [0.4, 1000], pad, logY: true });
      g.axes({ xTicks: narrow ? [0, 0.65, 1.9] : [0, 0.65, 1, 1.5, 1.9], yTicks: [[1, '1×'], [10, '10×'], [100, '100×'], [1000, '1000×']] });
      g.rect(0, 0.4, S.delta_blind, 1000, P.magenta, { alpha: 0.16 });
      const thetas = samples(220, q => S.delta_blind + (1.9 - S.delta_blind) * q);
      g.line(thetas.map(t => [t, 1 / Math.tan(t / 2)]), P.ink, { width: 1.8, alpha: 0.85 });
      g.line(thetas.map(t => [t, 1 / (1 - Math.cos(t))]), P.magenta, { width: 2 });
      g.vline(G.theta, P.amber, { alpha: 0.6, dash: [3, 4] });
      g.dot(G.theta, 1 / Math.tan(G.theta / 2), P.amber, 3.2); g.dot(G.theta, G.mu, P.amber, 4.2);
      g.dot(S.delta_blind, G.rimRadius, P.ink, 3, { ring: true });
      title = L('越靠近北极，坐标放大得越快', 'Closer to the pole, the chart stretches faster');
      meta = L('NUM · 横轴 θ（rad）· 对数纵轴', 'NUM · θ (rad) across · log scale'); key = [['ik', 'R(θ) = cot(θ/2)'], ['mg', 'μ(θ) = 1/(1−cos θ)'], ['am', `θ = ${fix(G.theta, 2)}`]];
    } else if (plotKind === 'homotopy') {
      const top = Math.ceil((G.spanMax * 1.12) / 10) * 10, g = kit.plot(cv, { x: [0, 1], y: [0, top], pad });
      g.axes({ xTicks: [0, 0.5, 0.85, 1], yTicks: [[1, '1×'], [Math.round(top / 2), `${Math.round(top / 2)}×`], [top, `${top}×`]], xLabel: 'τ' });
      g.hline(G.spanMax, P.ink, { dash: [4, 4], alpha: 0.55 });
      g.line(samples(200, q => [q, 1 + (G.spanMax - 1) * q ** POWER]), P.violet, { width: 2.2 });
      g.vline(S.tau, P.amber, { alpha: 0.6, dash: [3, 4] }); g.dot(S.tau, G.span, P.amber, 4.2);
      title = L('同伦把展幅从 1× 拉到 2R(δ)', 'The homotopy stretches the span from 1× to 2R(δ)');
      meta = 'MODEL · NUM'; key = [['vi', 'H(τ)'], ['ik', `2R(δ) = ${fix(G.spanMax, 1)}×`], ['am', `τ = ${fix(S.tau, 2)}`]];
    } else {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 0.85], pad });
      g.axes({ xTicks: [0, 30, 65, 90], yTicks: [0, 0.4, 0.772], yFmt: v => fix(v, v === 0 ? 0 : 2), xLabel: 'ψ (°)' });
      g.line(samples(180, q => [90 * q, 0.772 * Math.sin(q * PI / 2)]), P.magenta, { width: 2 });
      g.dot(0, 0, P.cyan, 4.2);
      g.vline(S.psi, P.amber, { alpha: 0.6, dash: [3, 4] }); g.dot(S.psi, G.separation, P.amber, 4.2);
      title = L('切面倾角越大，图示分离越大', 'The steeper the slice, the wider the drawn separation');
      meta = 'MODEL'; key = [['mg', 'r(ψ) = 0.772 sin ψ'], ['cy', 'r(0) = 0'], ['am', `ψ = ${fix(S.psi, 0)}°`]];
    }
    $('plotTitle').textContent = title; $('plotMeta').innerHTML = `${meta} · ${keys(key)}`;
  }
  function drawPills(G, P, pole) {
    const cv = sc.overlay(), dpr = TRV.fitCanvas(cv), ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, sc.W, sc.H); pills = [];
    if (TRV.thumbMode) return;
    const { W, H, top, bottom } = bounds, small = W < 500, size = small ? 10 : 12;
    ctx.font = `${size}px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    function pill(x, y, str, color) {
      const w = ctx.measureText(str).width + 22, h = size + 15;
      x = kit.clamp(x, w / 2 + 12, W - w / 2 - 12);
      const box = { x: x - w / 2, y: y - h / 2, w, h, text: str };
      ctx.fillStyle = TRV.alpha(P.stage, 0.92); ctx.strokeStyle = TRV.alpha(color, 0.38); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(box.x, box.y, w, h, h / 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = color; ctx.fillText(str, x, y); pills.push(box); return [x, y + h / 2];
    }
    const q = sc.p(pole), anchor = pill(W / 2, top + 15, `N · δ = ${fix(S.delta_blind, 2)} rad`, P.amber);
    ctx.strokeStyle = TRV.alpha(P.amber, 0.35); ctx.beginPath(); ctx.moveTo(...anchor); ctx.lineTo(q[0], q[1] - 7); ctx.stroke();
    const y = H - bottom - 15;
    pill(W * 0.26, y, G.collapsed ? 'Pᴬ = NPᴬ · r = 0.00' : `Pᴮ ≠ NPᴮ · r = ${fix(G.separation, 2)}`, G.collapsed ? P.cyan : P.magenta);
    pill(W * 0.76, y, `R(δ) = ${fix(G.rimRadius, 2)}`, P.amber);
  }
  window.STEREO_DEBUG = Object.freeze({
    get state() { return JSON.parse(JSON.stringify({ ...S, ...geometry(), t: clock.t, playing: clock.playing,
      preset: cards.current, camera: sc.cam, bounds, pills, surfaceMode: sc.mode })); }
  });
  window.TRV_THUMB = () => { cards.pick('oracle-chase'); sc.view([-0.28, 0.43], 0); paint.now(); };
  cards.pick(cards.initial('blindspot-divergence')); paint();
})();
