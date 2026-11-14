/* 球面几何、复重叠链与有限路径和；显示坐标不进入数学读数。 */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, $ = id => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, O = [0, 0, 0], NORTH = [0, 0, 1];
  const S = { scene: 'sector-volume', eps: 60, gauge: 45, theta: 60, steps: 12, eta: 0.50, wave: 30 };
  const PRESETS = Object.fromEntries(['sector-volume', 'hopf-fiber-lift', 'stokes-wilson-duality', 'pancharatnam-fan', 'feynman-stationary'].map(id => [id, { still: 1, play: false }]));
  const TITLES = {
    'sector-volume': ['弧顶面积 = 立体角 = 三倍扇锥体积', 'Cap area = solid angle = three times sector volume'],
    'hopf-fiber-lift': ['同一球面终点 · 不同纤维相位', 'Same sphere endpoint · distinct fiber phases'],
    'stokes-wilson-duality': ['边相位随规范转动 · 回路和乐不变', 'Edge phases turn with gauge · loop holonomy stays fixed'],
    'pancharatnam-fan': ['离散重叠链 · 向连续立体角收敛', 'Discrete overlap chain · convergence to solid angle'],
    'feynman-stationary': ['两束路径 · 一束相长，一束卷曲', 'Two path bundles · phase locking and coiled cancellation']
  };
  const NOTES = {
    'sector-volume': ['品红弧顶围出实心扇锥；青色弦四面体嵌在其中。', 'The magenta cap bounds a solid sector around the cyan chord tetrahedron.'],
    'hopf-fiber-lift': ['两路同到 C；紫色纤维保留相位差 −Ω/2。', 'Both paths reach C; the violet fiber retains their phase difference −Ω/2.'],
    'stokes-wilson-duality': ['拖动 α_g：两条边此消彼长，闭合回路不变。', 'Vary α_g: two edge phases trade turns while the closed loop stays fixed.'],
    'pancharatnam-fan': ['增加 N：重叠模长恢复至 1，相位趋近 −Ω/2。', 'Increase N: overlap modulus recovers to 1 and phase approaches −Ω/2.'],
    'feynman-stationary': ['青色驻相束 0.933；品红偏航束 0.182。', 'The cyan stationary bundle gives 0.933; the magenta steered bundle gives 0.182.']
  };
  let clock, cards, fields, frame, bounds, labelBoxes = [], handle, dragging = false;
  const paint = kit.painter(draw, [$('stage'), $('plot')]);
  const options = { canvas: $('cv'), yaw: 3.35, pitch: 0.48, wheel: false,
    onChange: () => paint(),
    onPick: ev => { dragging = !!handle && sc.near(ev, handle) < 22; return dragging; },
    onDrag: ev => dragHandle(ev), onDrop: () => { dragging = false; } };
  const sc = kit.solid($('stage'), options);
  const samples = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const dot = (a, b) => v3.dot(a, b), mul = (a, t) => a.map(x => x * t);
  const mix = (a, b, t) => a.map((x, i) => x * (1 - t) + b[i] * t);
  const unit = a => mul(a, 1 / Math.hypot(...a));
  function slerp(a, b, t) {
    const d = Math.acos(clamp(dot(a, b), -1, 1));
    return d < 1e-8 ? a.slice() : a.map((x, i) => (x * Math.sin((1 - t) * d) + b[i] * Math.sin(t * d)) / Math.sin(d));
  }
  const arc = (a, b, n = 36) => samples(n, t => slerp(a, b, t));
  const omegaAt = e => 2 * Math.atan(Math.tan(e / 2) ** 2);
  const solidAngle = (a, b, c) => 2 * Math.atan2(dot(a, v3.cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a));
  const lengthAt = eta => 2 * Math.acos(Math.cos(PI / 4) * Math.cos(eta));
  function bundle(eta, wave = S.wave) {
    const chain = [[0, 0]], phases = [], lengths = [];
    for (let m = 0; m < 41; m++) {
      const len = lengthAt(eta + (m - 20) / 100), phase = wave * (len - PI / 2), last = chain[chain.length - 1];
      lengths.push(len); phases.push(phase); chain.push([last[0] + Math.cos(phase) / 41, last[1] + Math.sin(phase) / 41]);
    }
    return { chain, phases, lengths, amplitude: Math.hypot(...chain[41]) };
  }
  function overlap(n = S.steps, theta = S.theta * DEG) {
    const b = Math.sin(theta / 2) ** 2, re = 1 - b + b * Math.cos(TAU / n), im = b * Math.sin(TAU / n);
    const phase = -n * Math.atan2(im, re), modulus = Math.hypot(re, im) ** n;
    return { re, im, modulus, phase, product: [modulus * Math.cos(phase), -modulus * Math.sin(phase)], limit: -PI * (1 - Math.cos(theta)) };
  }
  function geometry() {
    const e = S.eps * DEG, A = [Math.sin(e), Math.cos(e), 0], B = [0, 1, 0], C = [0, Math.cos(e), Math.sin(e)];
    const omega = omegaAt(e), gamma = -omega / 2, tetra = Math.sin(e) ** 2 / 6;
    const gauge = S.gauge * DEG, edgePhases = [gauge, -gauge, gamma];
    const sum = edgePhases.reduce((a, b) => a + b, 0);
    const t = clock ? clock.t : 1, q1 = slerp(A, C, t), q2 = t <= 0.5 ? slerp(A, B, 2 * t) : slerp(B, C, 2 * t - 1);
    const liftPhase = t <= 0.5 ? 0 : -solidAngle(A, B, q2) / 2;
    return { A, B, C, omega, cap: omega, sector: omega / 3, tetra, gamma,
      imDelta: Math.sin(e) ** 2 / 4, edgePhases, wilson: [Math.cos(sum), Math.sin(sum)], anchoredDifference: sum,
      fan: overlap(), stationary: bundle(0), steered: bundle(S.eta), q1, q2, liftPhase };
  }
  clock = kit.clock({ range: $('now'), play: $('play'), label: $('time'), max: 1, t: 1, step: 0.05, rate: 0.14,
    format: t => `t ${fix(t, 2)} <small>/ 1</small>`, onChange: () => paint() });
  fields = {};
  for (const id of ['eps', 'gauge', 'theta', 'steps', 'eta', 'wave']) fields[id] = kit.field($(id), {
    fmt: v => ['eps', 'gauge', 'theta'].includes(id) ? `${fix(v, 0)}°` : fix(v, id === 'eta' ? 2 : 0),
    onInput: v => { clock.pause(); S[id] = v; paint(); }
  });
  function sync() {
    for (const id of Object.keys(fields)) fields[id].set(S[id]);
    for (const el of document.querySelectorAll('[data-scenes]')) el.hidden = !el.dataset.scenes.split(' ').includes(S.scene);
  }
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'),
    onPick: id => {
      clock.pause(); Object.assign(S, { scene: id, eps: 60, gauge: 45, theta: 60, steps: 12, eta: 0.50, wave: 30 });
      clock.set(PRESETS[id].still); sync(); sc.view(id === 'pancharatnam-fan' ? [3.35, 0.85] : [3.35, 0.48], 0); paint();
    }
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  for (const [id, v] of [['onPath', 0], ['offPath', 0.50]]) $(id).addEventListener('click', () => { clock.pause(); S.eta = v; sync(); paint(); });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  $('theoryMobile').addEventListener('click', () => $('infoBtn').click());
  const swatches = items => items.map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
  function text(G) {
    $('hudBig').textContent = L(...TITLES[S.scene]);
    const rows = [];
    const row = (label, id, value, color) => rows.push(`<div class="${color}"><dt>${label}</dt><dd><output id="${id}">${value}</output></dd></div>`);
    let legend, key, sub, plotTitle, plotMeta, note;
    if (S.scene === 'sector-volume' || S.scene === 'hopf-fiber-lift') {
      sub = S.scene === 'sector-volume' ? `ε = ${fix(S.eps, 0)}° · A_cap = ${fix(G.cap, 4)} · V_sector = ${fix(G.sector, 4)}` : `ε = ${fix(S.eps, 0)}° · Δγ_B = ${fix(G.gamma / DEG, 2)}° · C_Γ₁ = C_Γ₂`;
      row('A_cap = Ω', 'roCap', fix(G.cap, 6), 'mg'); row('V_sector = Ω/3', 'roSector', fix(G.sector, 6), 'mg');
      row('V_tetra = sin²ε/6', 'roTetra', fix(G.tetra, 6), 'cy'); row('γ_B = −Ω/2', 'roBerry', `${fix(G.gamma / DEG, 3)}°`, 'vi');
      legend = [['cy', S.scene === 'sector-volume' ? L('弦四面体', 'Chord tetrahedron') : 'Γ₁ = AC'], ['mg', L('弧顶／扇锥', 'Cap / sector')], [S.scene === 'sector-volume' ? 'am' : 'vi', S.scene === 'sector-volume' ? L('ε 手柄', 'ε handle') : 'S¹ · ψ_Γ₁ / ψ_Γ₂']];
      if (S.scene === 'hopf-fiber-lift') legend.push(['am', 'Γ₂ = AB + BC']);
      plotTitle = S.scene === 'sector-volume' ? L('面积、体积与半角相位', 'Area, volume & half-angle phase') : L('抬升进度与相位差', 'Lift progress & phase difference');
      plotMeta = S.scene === 'sector-volume' ? 'NUM · ε ∈ [5°, 90°]' : `NUM · Δγ_B(t) = ${fix(G.liftPhase / DEG, 2)}°`;
      key = S.scene === 'sector-volume' ? [['mg', 'A_cap = 3V_sector'], ['cy', '3V_tetra'], ['vi', '|γ_B|']] : [['cy', 'γ₁ = 0'], ['vi', 'γ₂(t)'], ['am', `t = ${fix(clock.t, 2)}`]];
      note = L('单位球上的面积与扇锥体积；相位符号随正向回路约定。', 'Unit-sphere area and radial sector volume; the phase sign follows the oriented loop.');
    } else if (S.scene === 'stokes-wilson-duality') {
      sub = `α_g = ${fix(S.gauge, 0)}° · arg W = ${fix(G.gamma / DEG, 2)}° · |W| = 1`;
      for (let i = 0; i < 3; i++) row(['φ_AB', 'φ_BC', 'φ_CA'][i], `roEdge${i}`, `${fix(G.edgePhases[i] / DEG, 2)}°`, i < 2 ? 'cy' : 'mg');
      row('arg W = Σφ', 'roWilson', `${fix(G.gamma / DEG, 3)}°`, 'mg');
      row(L('锚定路径差', 'Anchored path difference'), 'roAnchored', `${fix(G.anchoredDifference / DEG, 3)}°`, 'vi');
      legend = [['cy', L('生成树 T', 'Spanning tree T')], ['mg', L('基本闭合弦', 'Fundamental chord')], ['am', L('局部规范旋钮', 'Local gauge dial')]];
      key = [['cy', 'φ_AB'], ['cy', 'φ_BC (−α_g)'], ['mg', 'arg W (invariant)']];
      plotTitle = L('边相位变化 · 闭合相位守恒', 'Changing edges · conserved loop phase'); plotMeta = 'NUM · U(1)';
      note = L('仅在 B 点作规范变换。树边相位增减抵消，非树边编码基本回路。', 'The gauge changes only at B. Tree-edge shifts cancel; the non-tree chord encodes the fundamental loop.');
    } else if (S.scene === 'pancharatnam-fan') {
      sub = `N = ${S.steps} · θ₀ = ${fix(S.theta, 0)}° · |Π_N| = ${fix(G.fan.modulus, 4)} · −arg Π_N = ${fix(G.fan.phase / DEG, 2)}°`;
      row('|Π_N|', 'roModulus', fix(G.fan.modulus, 6), 'cy'); row('−arg Π_N', 'roFanPhase', `${fix(G.fan.phase / DEG, 3)}°`, 'vi');
      row('−Ω/2 (N → ∞)', 'roFanLimit', `${fix(G.fan.limit / DEG, 3)}°`, 'mg'); row('N', 'roN', String(S.steps), 'am');
      legend = [['vi', L('球面扇形肋', 'Spherical fan ribs')], ['am', L('离散重叠链', 'Discrete overlap chain')], ['mg', L('连续纬圈', 'Continuous latitude')]];
      key = [['cy', '|Π_N| → 1'], ['vi', '−arg Π_N'], ['mg', '−Ω/2']];
      plotTitle = L('模长恢复与相位收敛', 'Modulus recovery & phase convergence'); plotMeta = 'NUM · N = 3…36';
      note = L('橙色边是短大圆弧；品红纬圈与它们在有限 N 时围住不同面积。', 'Amber edges are short great-circle arcs; the magenta latitude encloses a different area at finite N.');
    } else {
      sub = `M = 41 · k_eff = ${S.wave} · |A₄₁(0)| = ${fix(G.stationary.amplitude, 3)} · |A₄₁(${fix(S.eta, 2)})| = ${fix(G.steered.amplitude, 3)}`;
      row('η_ref = 0 · |A₄₁|', 'roReference', fix(G.stationary.amplitude, 6), 'cy'); row(`η₀ = ${fix(S.eta, 2)} · |A₄₁|`, 'roAmplitude', fix(G.steered.amplitude, 6), 'mg');
      row('L(0) = π/2', 'roLengthRef', fix(PI / 2, 6), 'cy'); row('L(η₀)', 'roLength', fix(lengthAt(S.eta), 6), 'am');
      legend = [['cy', 'η_ref = 0'], ['mg', `η₀ = ${fix(S.eta, 2)}`], ['am', L('可调中央路径', 'Steered center path')]];
      key = [['cy', L('驻相累积', 'Stationary sum')], ['mg', L('偏航卷曲', 'Off-path coil')], ['am', `m = ${Math.round(clock.t * 41)}`]];
      plotTitle = L('科纽螺线 · 逐步相量和', 'Cornu spiral · cumulative phasors'); plotMeta = 'MODEL · Re A / Im A';
      note = L('两束各 41 条等权路径，束宽 ±0.20。相量链按路径参数排序；短箭头相消，长合量相长。', 'Each bundle has 41 equally weighted paths spanning ±0.20. Chains are ordered by path parameter; short resultants show cancellation.');
    }
    $('hudSub').textContent = sub; $('legend').innerHTML = swatches(legend); $('plotKey').innerHTML = swatches(key);
    $('plotTitle').textContent = plotTitle; $('plotMeta').textContent = plotMeta; $('values').innerHTML = rows.join(''); $('readoutNote').textContent = note;
    TRV.hudFit();
  }
  function fit(G) {
    const W = $('stage').clientWidth, H = $('stage').clientHeight, rect = $('stage').getBoundingClientRect();
    const top = TRV.thumbMode ? 16 : $('hud').getBoundingClientRect().bottom - rect.top + 10;
    $('stage').style.setProperty('--plot-top', `${Math.ceil(top + 4)}px`);
    const band = $('plotBand').getBoundingClientRect(), sidePlot = !TRV.thumbMode && band.width < W * 0.6;
    const geometryWidth = sidePlot ? band.left - rect.left - 12 : W;
    const bottom = TRV.thumbMode || sidePlot ? H - 16 : band.top - rect.top - 8;
    const points = [];
    for (let j = 0; j <= 16; j++) for (let k = 0; k < 24; k++) points.push(v3.sph(PI * j / 16, TAU * k / 24));
    if (S.scene === 'hopf-fiber-lift') for (let i = 0; i < 24; i++) for (const h of [0.2, 1.3]) points.push(fiber(G, TAU * i / 24, h));
    const y = sc.cam.yaw, p = sc.cam.pitch, right = [Math.cos(y), -Math.sin(y), 0], up = [Math.sin(y) * Math.sin(p), Math.cos(y) * Math.sin(p), Math.cos(p)];
    const xs = points.map(q => dot(q, right)), ys = points.map(q => dot(q, up));
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const pad = TRV.thumbMode ? 22 : geometryWidth < 500 ? 22 : 32, unit = Math.min((geometryWidth - 2 * pad) / (x1 - x0), Math.max(50, bottom - top - 26) / (y1 - y0));
    options.radius = unit / Math.min(W, H); options.cx = (geometryWidth / 2 - unit * (x0 + x1) / 2) / W;
    options.cy = ((top + bottom) / 2 + unit * (y0 + y1) / 2) / H;
    bounds = { W, H, top, bottom, unit, geometryWidth, sidePlot };
  }
  function sphere(P) {
    const facing = sc.facing();
    sc.surface('sphere', (u, v) => v3.sph(u, v), { u: [0, PI], v: [0, TAU], nu: 28, nv: 48,
      color: P.sigma, alpha: (u, v) => dot(v3.sph(u, v), facing) < -0.06 ? 1 : 0.025,
      grid: { every: [4, 6], color: P.sigma, alpha: 0.16 }, pick: false });
    sc.glass('sphere-shell', O, 1.003, { color: P.sigma, alpha: 0.008, rim: 0.13 });
  }
  const capPoint = (G, u, v) => unit(mix(G.A, slerp(G.B, G.C, v), u));
  function sector(G, P, full = true) {
    sc.surface('cap', (u, v) => capPoint(G, u, v), { u: [0, 1], v: [0, 1], nu: 20, nv: 24,
      color: P.magenta, alpha: full ? 0.55 : 0.23, grid: { every: [4, 4], color: P.magenta, alpha: 0.2 }, pick: false });
    if (full) {
      for (const [i, a, b] of [[0, G.A, G.B], [1, G.B, G.C], [2, G.C, G.A]]) sc.surface(`sector-wall-${i}`, (r, t) => mul(slerp(a, b, t), r),
        { u: [0, 1], v: [0, 1], nu: 12, nv: 24, color: P.magenta, alpha: 0.14, pick: false });
      const vertices = [O, G.A, G.B, G.C];
      sc.poly('chord-tetrahedron', { vertices, faces: [[0, 2, 1], [0, 3, 2], [0, 1, 3], [1, 2, 3]] }, { color: P.cyan, alpha: 0.21, edges: P.cyan });
      for (let i = 0; i < vertices.length; i++) for (let j = i + 1; j < vertices.length; j++) sc.line([vertices[i], vertices[j]], { color: P.cyan, width: 1.8, alpha: 0.9 });
      for (const a of [G.A, G.B, G.C]) sc.line([O, a], { color: P.magenta, width: 1.5, alpha: 0.62 });
      for (const [a, b] of [[G.A, G.B], [G.B, G.C], [G.C, G.A]]) sc.line(arc(a, b), { color: P.magenta, width: 2.6 });
      for (const r of [0.33, 0.67]) sc.line(arc(G.B, G.C).map(p => mul(p, r)), { color: P.magenta, alpha: 0.34, width: 1.1 });
      sc.bead(O, { key: 'origin', color: P.sigma, r: 3.2 });
    }
  }
  function paths(G, P) {
    sc.line(arc(G.A, G.C), { color: P.cyan, width: 3.5 });
    sc.line([...arc(G.A, G.B), ...arc(G.B, G.C).slice(1)], { color: P.amber, width: 3.2 });
    sc.bead(G.q1, { key: 'path-one', color: P.cyan, r: 4.5 }); sc.bead(G.q2, { key: 'path-two', color: P.amber, r: 4.5 });
  }
  function fiber(G, phase, h = 0.75 + 0.65 * phase) {
    const u = unit(v3.cross(G.C, [1, 0, 0])), v = v3.cross(G.C, u);
    return v3.add(mul(G.C, 1 + h), v3.add(mul(u, 0.13 * Math.cos(phase)), mul(v, 0.13 * Math.sin(phase))));
  }
  function hopf(G, P) {
    sector(G, P, false); paths(G, P);
    sc.surface('fiber-cylinder', (a, h) => fiber(G, a, h), { u: [0, TAU], v: [0.2, 1.3], nu: 36, nv: 10, color: P.violet, alpha: 0.16, pick: false });
    sc.line(samples(80, t => fiber(G, -0.85 + 1.7 * t)), { color: P.violet, width: 2.3, alpha: 0.8 });
    for (const h of [0.2, 1.3]) sc.line(samples(64, t => fiber(G, TAU * t, h)), { color: P.violet, width: 1.3, alpha: 0.65 });
    sc.line([G.C, mul(G.C, 2.36)], { color: P.violet, dash: [3, 4], alpha: 0.65, width: 1.3 });
    const lift1 = fiber(G, 0), lift2 = fiber(G, G.liftPhase);
    sc.line([G.q1, lift1], { color: P.cyan, width: 1.2, dash: [3, 4], alpha: 0.45 });
    sc.line([G.q2, lift2], { color: P.amber, width: 1.2, dash: [3, 4], alpha: 0.45 });
    sc.bead(lift1, { key: 'fiber-one', color: P.violet, r: 5.3 }); sc.bead(lift2, { key: 'fiber-two', color: P.violet, r: 5.3 });
    sc.ring(lift1, { color: P.cyan, r: 8.5 }); sc.ring(lift2, { color: P.amber, r: 8.5 });
    return { lift1, lift2 };
  }
  function wilson(G, P) {
    sector(G, P, false);
    const edges = [[G.A, G.B], [G.B, G.C], [G.C, G.A]];
    edges.forEach(([a, b], i) => {
      sc.line(arc(a, b), { color: i < 2 ? P.cyan : P.magenta, width: i < 2 ? 3.5 : 4.0 });
      const m = slerp(a, b, 0.5), tangent = unit(v3.cross(m, Math.abs(m[2]) < 0.9 ? NORTH : [1, 0, 0])), normal = v3.cross(m, tangent);
      const center = mul(m, 1.06), dial = phase => v3.add(center, v3.add(mul(tangent, 0.09 * Math.cos(phase)), mul(normal, 0.09 * Math.sin(phase))));
      sc.line(samples(40, t => dial(TAU * t)), { color: i < 2 ? P.cyan : P.magenta, alpha: 0.45, width: 1 });
      sc.arrow(center, dial(G.edgePhases[i]), { color: i < 2 ? P.cyan : P.magenta, width: 2, headSize: 5 });
    });
    sc.line([O, G.B], { color: P.cyan, dash: [4, 5], alpha: 0.4, width: 1 });
    const dial = a => v3.add(mul(G.B, 1.15), [0.16 * Math.cos(a), 0, 0.16 * Math.sin(a)]);
    sc.line(samples(64, t => dial(TAU * t)), { color: P.amber, alpha: 0.7, width: 1.5 });
    handle = dial(S.gauge * DEG); sc.bead(handle, { key: 'gauge-handle', color: P.amber, r: 5.6 });
  }
  function fan(G, P) {
    const theta = S.theta * DEG, point = phi => v3.sph(theta, phi), n = S.steps;
    sc.line(samples(160, t => point(TAU * t)), { color: P.magenta, width: 2, alpha: 0.55 });
    for (let i = 0; i < n; i++) {
      const a = point(TAU * i / n), b = point(TAU * (i + 1) / n);
      sc.surface(`wedge-${i}`, (u, v) => unit(mix(NORTH, slerp(a, b, v), u)), { u: [0, 1], v: [0, 1], nu: 10, nv: 5, color: P.violet, alpha: i % 2 ? 0.17 : 0.27, pick: false });
      sc.line(arc(NORTH, a, 22), { color: P.violet, width: 1.4, alpha: 0.85 });
      sc.line(arc(a, b, 12), { color: P.amber, width: 2.2 });
      sc.bead(a, { key: `fan-vertex-${i}`, color: P.violet, r: n > 18 ? 1.8 : 2.8 });
    }
    sc.bead(NORTH, { key: 'north', color: P.violet, r: 4 });
    const segment = Math.min(n - 1, Math.floor(clock.t * n)), u = clock.t * n - segment;
    handle = slerp(point(TAU * segment / n), point(TAU * (segment + 1) / n), u);
    sc.bead(handle, { key: 'fan-probe', color: P.amber, r: 5 });
  }
  function feynman(G, P) {
    const s = Math.SQRT1_2, a = [-s, s, 0], c = [s, s, 0];
    for (const [center, color, prefix] of [[0, P.cyan, 'reference'], [S.eta, P.magenta, 'steered']]) {
      for (let m = 0; m < 41; m++) {
        const eta = center + (m - 20) / 100, b = [0, Math.cos(eta), Math.sin(eta)];
        sc.line([...arc(a, b, 18), ...arc(b, c, 18).slice(1)], { color, alpha: m === 20 ? 1 : 0.23, width: m === 20 ? 2.8 : 0.85 });
      }
      const b = [0, Math.cos(center), Math.sin(center)], q = clock.t <= 0.5 ? slerp(a, b, clock.t * 2) : slerp(b, c, clock.t * 2 - 1);
      sc.bead(q, { key: `${prefix}-probe`, color, r: 4 });
    }
    handle = [0, Math.cos(S.eta), Math.sin(S.eta)];
    sc.line([...arc(a, handle), ...arc(handle, c).slice(1)], { color: P.amber, width: 2, alpha: 0.9 });
    sc.bead(handle, { key: 'eta-handle', color: P.amber, r: 5.5 });
    sc.bead(a, { key: 'feynman-A', color: P.cyan, r: 4 }); sc.bead(c, { key: 'feynman-C', color: P.cyan, r: 4 });
    return { a, c };
  }
  function draw() {
    if (!clock || !cards || !fields) return;
    const G = geometry(), P = TRV.palette; frame = G; handle = null;
    text(G); fit(G); sc.begin(); sphere(P);
    let extra;
    if (S.scene === 'sector-volume') { sector(G, P); handle = G.A; sc.bead(handle, { key: 'eps-handle', color: P.amber, r: 5.5 }); }
    if (S.scene === 'hopf-fiber-lift') extra = hopf(G, P);
    if (S.scene === 'stokes-wilson-duality') wilson(G, P);
    if (S.scene === 'pancharatnam-fan') fan(G, P);
    if (S.scene === 'feynman-stationary') extra = feynman(G, P);
    if (!['pancharatnam-fan', 'feynman-stationary'].includes(S.scene)) for (const [id, p] of [['A', G.A], ['B', G.B], ['C', G.C]]) sc.bead(p, { key: id, color: P.sigma, r: 3.5 });
    sc.end(); labels(G, P, extra); drawPlot(G, P);
  }
  function labels(G, P, extra) {
    const cv = sc.overlay(), dpr = TRV.fitCanvas(cv), ctx = cv.getContext('2d'), { W, H, top, bottom, geometryWidth } = bounds;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); labelBoxes = [];
    if (TRV.thumbMode) return;
    const size = W < 500 ? 10 : 11; ctx.font = `${size}px ${TRV.fonts.data}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    const entries = [];
    if (S.scene === 'sector-volume') entries.push(['O', O, P.sigma], ['A · ε', G.A, P.amber], ['B', G.B, P.sigma], ['C', G.C, P.sigma]);
    if (S.scene === 'hopf-fiber-lift') entries.push(['A', G.A, P.sigma], ['B', G.B, P.sigma], ['C', G.C, P.sigma], ['ψ_Γ₁', extra.lift1, P.violet], ['ψ_Γ₂', extra.lift2, P.violet]);
    if (S.scene === 'stokes-wilson-duality') entries.push(['A · root', G.A, P.cyan], ['B · α_g', handle, P.amber], ['C', G.C, P.sigma]);
    if (S.scene === 'pancharatnam-fan') entries.push(['N', NORTH, P.violet], [`N = ${S.steps}`, handle, P.amber]);
    if (S.scene === 'feynman-stationary') entries.push(['A', extra.a, P.cyan], ['C', extra.c, P.cyan], [`η₀ = ${fix(S.eta, 2)}`, handle, P.amber]);
    for (const [text, p, color] of entries) {
      const q = sc.p(p), w = ctx.measureText(text).width + 12, h = size + 10;
      const candidates = [[0, -18], [0, 19], [w / 2 + 10, 0], [-w / 2 - 10, 0], [0, -42], [0, 42], [w + 10, -15], [-w - 10, 15]];
      let box;
      for (const [dx, dy] of candidates) {
        const x = clamp(q[0] + dx, w / 2 + 6, geometryWidth - w / 2 - 6), y = clamp(q[1] + dy, top + h / 2, bottom - h / 2);
        const b = { x: x - w / 2, y: y - h / 2, w, h, text };
        if (labelBoxes.every(a => Math.min(a.x + a.w + 3, b.x + b.w + 3) <= Math.max(a.x, b.x) || Math.min(a.y + a.h + 3, b.y + b.h + 3) <= Math.max(a.y, b.y))) { box = b; break; }
      }
      if (!box) continue;
      ctx.strokeStyle = TRV.alpha(color, 0.4); ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(q[0], q[1]); ctx.lineTo(box.x + box.w / 2, box.y + box.h / 2); ctx.stroke();
      ctx.fillStyle = TRV.alpha(P.stage, 0.94); ctx.beginPath(); ctx.roundRect(box.x, box.y, w, h, 5); ctx.fill(); ctx.stroke();
      ctx.fillStyle = color; ctx.fillText(text, box.x + w / 2, box.y + h / 2); labelBoxes.push(box);
    }
  }
  function drawPlot(G, P) {
    if (TRV.thumbMode) return;
    const cv = $('plot'), W = cv.clientWidth, small = W < 440, pad = [34, 12, 9, 20];
    if (S.scene === 'sector-volume') {
      const g = kit.plot(cv, { x: [5, 90], y: [0, 1.65], pad });
      g.axes({ xTicks: small ? [15, 45, 90] : [15, 30, 45, 60, 90], yTicks: [0, 0.5, 1, 1.5], xLabel: 'ε (°)' });
      const curve = fn => samples(170, q => { const d = 5 + 85 * q; return [d, fn(d * DEG)]; });
      g.line(curve(omegaAt), P.magenta, { width: 4.5, alpha: 0.3 });
      g.line(curve(e => 3 * (omegaAt(e) / 3)), P.magenta, { width: 1.8 });
      g.line(curve(e => Math.sin(e) ** 2 / 2), P.cyan, { width: 1.8 }); g.line(curve(e => omegaAt(e) / 2), P.violet, { width: 1.8 });
      g.line([[S.eps, 0], [S.eps, 1.6]], P.amber, { dash: [3, 4], alpha: 0.5 });
      for (const [y, c] of [[G.cap, P.magenta], [3 * G.tetra, P.cyan], [-G.gamma, P.violet]]) g.dot(S.eps, y, c, 3.4);
      g.dot(S.eps, G.cap, P.magenta, 6, { ring: true });
    } else if (S.scene === 'hopf-fiber-lift') {
      const g = kit.plot(cv, { x: [0, 1], y: [-48, 4], pad });
      g.axes({ xTicks: [0, 0.5, 1], yTicks: [-45, -30, -15, 0], xLabel: 't', yLabel: 'γ (°)' });
      g.line([[0, 0], [1, 0]], P.cyan, { width: 2 });
      g.line(samples(100, t => [t, t <= 0.5 ? 0 : -solidAngle(G.A, G.B, slerp(G.B, G.C, 2 * t - 1)) / (2 * DEG)]), P.violet, { width: 2.2 });
      g.dot(clock.t, G.liftPhase / DEG, P.amber, 4); g.line([[clock.t, -48], [clock.t, 4]], P.amber, { alpha: 0.4, dash: [3, 4] });
    } else if (S.scene === 'stokes-wilson-duality') {
      const right = W > 420 ? 0.27 * W : 0, g = kit.plot(cv, { x: [-180, 180], y: [-230, 200], pad: [34, 12 + right, 9, 20] });
      g.axes({ xTicks: [-180, 0, 180], yTicks: [-180, 0, 180], xLabel: 'α_g (°)' });
      g.line([[-180, -180], [180, 180]], P.cyan); g.line([[-180, 180], [180, -180]], P.cyan, { dash: [4, 3] });
      g.line([[-180, G.gamma / DEG], [180, G.gamma / DEG]], P.magenta, { width: 2.4 });
      for (const [i, c] of [[0, P.cyan], [1, P.cyan], [2, P.magenta]]) g.dot(S.gauge, i === 2 ? G.gamma / DEG : G.edgePhases[i] / DEG, c, 3.5);
      if (right) {
        const ctx = g.ctx, x = W - right / 2 - 3, y = cv.clientHeight / 2, r = Math.min(right / 2 - 10, cv.clientHeight / 2 - 15);
        ctx.strokeStyle = TRV.alpha(P.magenta, 0.35); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
        ctx.strokeStyle = P.magenta; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + r * G.wilson[0], y - r * G.wilson[1]); ctx.stroke();
        ctx.fillStyle = P.ink; ctx.font = `10px ${TRV.fonts.data}`; ctx.textAlign = 'center'; ctx.fillText('W', x, y - r - 6);
      }
    } else if (S.scene === 'pancharatnam-fan') {
      const half = W / 2, g = kit.plot(cv, { x: [3, 36], y: [0, 1.05], pad: [29, half + 10, 9, 20] });
      g.axes({ xTicks: [3, 12, 36], yTicks: [0, 0.5, 1] });
      g.line(samples(99, t => { const n = 3 + 33 * t; return [n, overlap(n).modulus]; }), P.cyan, { width: 2 });
      g.line([[3, 1], [36, 1]], P.cyan, { alpha: 0.4, dash: [3, 3] }); g.dot(S.steps, G.fan.modulus, P.amber, 4);
      const h = kit.plot(cv, { x: [3, 36], y: [-180, 0], pad: [half + 32, 9, 9, 20], clear: false });
      h.axes({ xTicks: [3, 12, 36], yTicks: [-180, -90, 0] });
      h.line(samples(99, t => { const n = 3 + 33 * t; return [n, overlap(n).phase / DEG]; }), P.violet, { width: 2 });
      h.line([[3, G.fan.limit / DEG], [36, G.fan.limit / DEG]], P.magenta, { dash: [4, 3], width: 1.5 }); h.dot(S.steps, G.fan.phase / DEG, P.amber, 4);
    } else {
      const all = [...G.stationary.chain, ...G.steered.chain], ys = all.map(p => p[1]);
      const g = kit.plot(cv, { x: [-0.12, 1.02], y: [Math.min(-0.1, ...ys) - 0.05, Math.max(0.22, ...ys) + 0.05], pad, equal: true });
      g.axes({ xTicks: [0, 0.5, 1], yTicks: [0], xLabel: 'Re A', yLabel: 'Im A' });
      for (const [b, c] of [[G.stationary, P.cyan], [G.steered, P.magenta]]) {
        g.line(b.chain, c, { width: 1.7 });
        for (let m = 0; m < 41; m++) g.arrow(b.chain[m], b.chain[m + 1], { color: c, width: 1.1, headSize: 3 });
        g.arrow([0, 0], b.chain[41], { color: c, alpha: 0.75, width: 2.5, headSize: 7 });
        const i = Math.round(clock.t * 41); g.dot(...b.chain[i], P.amber, 3.2);
      }
    }
  }
  function dragHandle(ev) {
    if (!dragging || !bounds) return;
    const rect = $('stage').getBoundingClientRect(), x = ev.clientX - rect.left, y = ev.clientY - rect.top;
    let id, lo, hi, point;
    if (S.scene === 'sector-volume') { id = 'eps'; lo = 5; hi = 90; point = v => [Math.sin(v * DEG), Math.cos(v * DEG), 0]; }
    if (S.scene === 'feynman-stationary') { id = 'eta'; lo = 0; hi = 0.60; point = v => [0, Math.cos(v), Math.sin(v)]; }
    if (S.scene === 'stokes-wilson-duality') { id = 'gauge'; lo = -180; hi = 180; point = v => v3.add(mul(frame.B, 1.15), [0.16 * Math.cos(v * DEG), 0, 0.16 * Math.sin(v * DEG)]); }
    if (S.scene === 'pancharatnam-fan') { clock.pause(); clock.set(clamp((x - 12) / (bounds.W - 24), 0, 1)); return; }
    if (!id) return;
    let best = lo, distance = Infinity;
    for (let i = 0; i <= 360; i++) { const v = lo + (hi - lo) * i / 360, q = sc.p(point(v)), d = Math.hypot(q[0] - x, q[1] - y); if (d < distance) { best = v; distance = d; } }
    clock.pause(); S[id] = id === 'eta' ? Math.round(best * 100) / 100 : Math.round(best); sync(); paint();
  }
  window.BERRY_DEBUG = Object.freeze({
    get state() { return JSON.parse(JSON.stringify({ ...S, ...geometry(), preset: cards.current, t: clock.t, playing: clock.playing, camera: sc.cam, bounds, labels: labelBoxes, handle, surfaceMode: sc.mode })); }
  });
  window.TRV_THUMB = () => { cards.pick('sector-volume'); S.eps = 78; sync(); sc.view([3.35, 0.48], 0); paint.now(); };
  cards.pick(cards.initial('sector-volume')); paint();
})();
