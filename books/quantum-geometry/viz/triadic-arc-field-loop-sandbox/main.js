/* TRIAD//LOOP：一条极小圆弧生出线、面、体三相（粒子、波、场）；三相在回环上相消，粒子回到壳上。 */
(() => {
  'use strict';
  const { kit } = TRV, { v3, clamp, fix } = kit, $ = (id) => document.getElementById(id), L = TRV.L;
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, PHI = (1 + Math.sqrt(5)) / 2;
  const M = 12, SITES = Array.from({ length: M }, (_, x) => x), H3 = [0, 3, 6, 9], ANN3 = [0, 4, 8];
  const SUBGROUPS = [
    { name: 'H_0', elements: [0] },
    { name: 'H_3', elements: [0, 3, 6, 9] },
    { name: 'H_12', elements: SITES.slice() }
  ];
  const EPS_MAX = 85, RING = 1.2, PHASOR = 0.1, TRACK = 1.0, WEYL_N = 233;
  const COS = SITES.map((r) => Math.cos(TAU * r / M)), SIN = SITES.map((r) => Math.sin(TAU * r / M));
  const mod = (n) => ((n % M) + M) % M;
  const chi = (n) => [COS[mod(n)], SIN[mod(n)]];                       // e^{2πi n/12}
  const smooth = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const sci = (x) => (x === 0 ? '0' : Math.abs(x) >= 1e-3 ? fix(x, 4) : x.toExponential(1).replace(/-/g, '−'));
  const S = { triadStage: 0, arcAngleDeg: 60, cancelSharpness: 1, view: 'iso' };

  /* ---------- 代数小工具 ---------- */
  const outer = (a, b) => a.map((ai) => b.map((bj) => ai * bj));
  const madd = (P, Q, k = 1) => P.map((row, i) => row.map((v, j) => v + k * Q[i][j]));
  const mmul = (P, Q) => P.map((row) => Q[0].map((_, j) => row[0] * Q[0][j] + row[1] * Q[1][j] + row[2] * Q[2][j]));
  const mvec = (P, v) => P.map((row) => row[0] * v[0] + row[1] * v[1] + row[2] * v[2]);
  const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  const maxAbs = (P) => Math.max(...P.flat().map(Math.abs));
  const det3 = (g) => g[0][0] * (g[1][1] * g[2][2] - g[1][2] * g[2][1]) - g[0][1] * (g[1][0] * g[2][2] - g[1][2] * g[2][0]) + g[0][2] * (g[1][0] * g[2][1] - g[1][1] * g[2][0]);
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  // 量子比特投影 ρ = (I + r·σ)/2，与 Lean 的 qubitProjector 同一写法：[[r₂, r₀ − i r₁], [r₀ + i r₁, −r₂]]
  const rho = (r) => [[[(1 + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(1 - r[2]) / 2, 0]]];
  const m2 = (X, Y) => [0, 1].map((i) => [0, 1].map((j) => cadd(cmul(X[i][0], Y[0][j]), cmul(X[i][1], Y[1][j]))));
  const trace2 = (X) => cadd(X[0][0], X[1][1]);
  /** 球面三角形在顶点 p 处的内角：两条大圆弧切向量的夹角。 */
  function corner(p, q, r) {
    const tq = v3.sub(q, v3.scale(p, v3.dot(p, q))), tr = v3.sub(r, v3.scale(p, v3.dot(p, r)));
    return Math.atan2(v3.len(v3.cross(tq, tr)), v3.dot(tq, tr));
  }
  /** 一组向量张成的维数：由格拉姆行列式逐级判定。 */
  function rank(vs) {
    const gram = (list) => list.map((a) => list.map((b) => v3.dot(a, b)));
    if (vs.length === 3 && Math.abs(det3(gram(vs))) > 1e-12) return 3;
    for (let i = 0; i < vs.length; i++) for (let j = i + 1; j < vs.length; j++) {
      const g = gram([vs[i], vs[j]]);
      if (g[0][0] * g[1][1] - g[0][1] * g[1][0] > 1e-12) return 2;
    }
    return vs.some((v) => v3.len(v) > 1e-9) ? 1 : 0;
  }

  /* ---------- 圆弧的三相 ---------- */
  function cell(epsDeg) {
    const e = epsDeg * DEG, s = Math.sin(e), c = Math.cos(e);
    return { e, s, c, A: [s, c, 0], B: [0, 1, 0], C: [0, c, s], T: [-c, s, 0] };
  }
  function phases(epsDeg) {
    const { s, A, B, C } = cell(epsDeg);
    const flat = s < 1e-12;
    const omega = flat ? 0 : corner(A, B, C) + corner(B, C, A) + corner(C, A, B) - PI;
    const pts = [A, B, C], gram = pts.map((a) => pts.map((b) => v3.dot(a, b)));
    const tr = trace2(m2(m2(rho(A), rho(B)), rho(C)));
    return { sin: v3.len(v3.sub(B, v3.scale(A, v3.dot(A, B)))), sag: 1 - v3.dot(A, B), omega, det: det3(gram), im: tr[1], re: tr[0], gram };
  }
  /** 回环十二格上三个特征相位 χ₀、χ₄、χ₈ 的和；W 把相位从同向缠绕到特征相位，κ 是两个非平凡相位的振幅。 */
  function loopSums(W, kappa) {
    return SITES.map((x) => {
      const ph = ANN3.map((k) => { const r = mod(k * x); return { k, r, amp: k === 0 ? 1 : kappa, th: TAU * r / M * W }; });
      let re = 0, im = 0;
      for (const p of ph) { re += p.amp * Math.cos(p.th); im += p.amp * Math.sin(p.th); }
      return { x, onShell: H3.includes(x), ph, re, im, abs: Math.hypot(re, im) };
    });
  }
  function shell(sums) {
    const ref = sums[0].abs;                     // x = 0 在壳上：三个相位都是 1
    const norm = sums.map((q) => (ref > 0 ? q.abs / ref : 0));
    const off = sums.filter((q) => !q.onShell).map((q) => norm[q.x]);
    return { sums, norm, peak: Math.max(...sums.filter((q) => q.onShell).map((q) => norm[q.x])), rms: Math.sqrt(off.reduce((a, v) => a + v * v, 0) / off.length) };
  }
  /** 有限泊松求和与零化子特征和：三个子群，两边分别算。 */
  function poisson(e, s) {
    const fs = SITES.map((x) => { const a = x * e, w = 1 + s * Math.cos(PI * x / 6); return [w * Math.cos(a), w * Math.sin(a)]; });
    const dft = (k) => SITES.reduce((acc, j) => cadd(acc, cmul(chi(-j * k), fs[j])), [0, 0]);   // mathlib 的负指数 DFT
    const rows = SUBGROUPS.map((H) => {
      const ann = SITES.filter((k) => H.elements.every((h) => mod(k * h) === 0));
      const lhs = H.elements.reduce((acc, h) => cadd(acc, fs[h]), [0, 0]);
      const sumF = ann.reduce((acc, k) => cadd(acc, dft(k)), [0, 0]), w = H.elements.length / M, rhs = [w * sumF[0], w * sumF[1]];
      let charErr = 0;
      for (const x of SITES) {
        const sum = ann.reduce((acc, k) => cadd(acc, chi(k * x)), [0, 0]), want = H.elements.includes(x) ? ann.length : 0;
        charErr = Math.max(charErr, Math.hypot(sum[0] - want, sum[1]));
      }
      return { name: H.name, elements: H.elements.slice(), annihilator: ann, diff: Math.hypot(lhs[0] - rhs[0], lhs[1] - rhs[1]), charErr };
    });
    return { rows, maxDiff: Math.max(...rows.map((r) => r.diff)), charMaxDiff: Math.max(...rows.map((r) => r.charErr)) };
  }
  /** 四个壳上格点上的整数边函数 e(i, j) = (j − i) mod 12 与它的上边缘 F = δe；再算四项上边缘 δF。 */
  const COCHAIN = (() => {
    const V = H3, idx = [0, 1, 2, 3], edge = (i, j) => mod(V[j] - V[i]);
    const F = (i, j, k) => edge(j, k) - edge(i, k) + edge(i, j);
    const delta = (G, r, i, j, k) => G(i, j, k) - G(r, j, k) + G(r, i, k) - G(r, i, j);
    const quads = [];
    for (const r of idx) for (const i of idx) for (const j of idx) for (const k of idx) quads.push([r, i, j, k]);
    const faceErrors = (G, r) => { let n = 0; for (const i of idx) for (const j of idx) for (const k of idx) if (G(i, j, k) !== G(r, j, k) - G(r, i, k) + G(r, i, j)) n++; return n; };
    const defects = (G) => quads.filter(([r, i, j, k]) => delta(G, r, i, j, k) !== 0).length;
    const bumped = (i, j, k) => F(i, j, k) + (i === 0 && j === 1 && k === 2 ? 1 : 0);   // 改动一个面值，核对计数恒等式
    const values = new Set();
    for (const i of idx) for (const j of idx) for (const k of idx) values.add(F(i, j, k));
    return {
      maxErr: Math.max(...quads.map(([r, i, j, k]) => Math.abs(delta(F, r, i, j, k)))), defects: defects(F),
      faceErrors: idx.map((r) => faceErrors(F, r)), faceValues: [...values].sort((a, b) => a - b),
      bumpedFaceSum: idx.reduce((a, r) => a + faceErrors(bumped, r), 0), bumpedDefects: defects(bumped)
    };
  })();
  const WEYL = (() => {
    const a = 1 / PHI; let re = 0, im = 0;
    for (let n = 0; n < WEYL_N; n++) { re += Math.cos(TAU * n * a); im += Math.sin(TAU * n * a); }
    return Math.hypot(re, im) / WEYL_N;
  })();
  // 两步的转轴取自两面坐标墙：e₁∧e₂ 的法线 e₃，e₂∧e₃ 的法线 e₁。
  const AXES = [v3.cross([1, 0, 0], [0, 1, 0]), v3.cross([0, 1, 0], [0, 0, 1])];
  const GENERATORS = rank([AXES[0], AXES[1], v3.cross(AXES[0], AXES[1])]);
  const binom = (n, k) => (k < 0 || k > n ? 0 : k === 0 ? 1 : binom(n - 1, k - 1) * n / k);
  const GRADE_DIMS = [0, 1, 2, 3, 4].map((k) => binom(3, k));
  const TOP_GRADE = Math.max(...GRADE_DIMS.map((d, k) => (d > 0 ? k : -1)));

  function weights(s = S.triadStage) {
    const up = (a) => smooth(s - a), dim = 1 - 0.72 * up(3);
    return { line: up(0), surf: up(1) * dim, vol: up(2) * dim, loop: up(2), wind: up(3) };
  }
  const stageIndex = () => clamp(Math.round(S.triadStage), 0, 4);
  const winding = () => weights().wind * (clock ? clock.t : 0);

  function engine(epsDeg = S.arcAngleDeg, kappa = S.cancelSharpness, W = winding()) {
    const g = cell(epsDeg), { A, B, T } = g, E3 = [0, 0, 1];
    // M = span(A) 的投影 P；正交补的投影 Q 由 M⊥ 的正交基 {T, e₃} 另行搭出。
    const P = outer(A, A), Q = madd(outer(T, T), outer(E3, E3));
    const orthErr = Math.max(maxAbs(madd(Q, madd(I3, P, -1), -1)), maxAbs(madd(mmul(P, P), P, -1)), maxAbs(madd(mmul(Q, Q), Q, -1)),
      maxAbs(mmul(P, Q)), maxAbs(mmul(Q, P)), maxAbs(madd(madd(P, Q), I3, -1)));
    const QB = mvec(Q, B), ph = phases(epsDeg);
    const lagL = v3.dot(A, A) * v3.dot(B, B) - v3.dot(A, B) ** 2;
    let lagR = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) lagR += (A[i] * B[j] - A[j] * B[i]) ** 2;
    lagR /= 2;
    const re = (1 + ph.gram[0][1] + ph.gram[1][2] + ph.gram[2][0]) / 4, im = v3.dot(A, v3.cross(B, g.C)) / 4;
    const pz = poisson(g.e, g.s), target = shell(loopSums(1, kappa)), now = shell(loopSums(W, kappa));
    return {
      ...g, PB: mvec(P, B), QB, F: mvec(P, B), Q1: v3.add(A, v3.scale(T, g.s)),
      order1ChordSin: v3.len(QB), order2Sagitta: ph.sag, order2GirardExcess: ph.omega, order3SectorVol: ph.omega / 3,
      order3DetG3: ph.det, order3BargmannIm: ph.im, bargmannRe: ph.re, bargmannArg: Math.atan2(ph.im, ph.re),
      bargmannErr: Math.hypot(ph.re - re, ph.im - im), lagrangeLeft: lagL, lagrangeErr: Math.abs(lagL - lagR),
      orthComplementIdErr: orthErr, poisson: pz, poissonMaxDiff: pz.maxDiff, characterMaxDiff: pz.charMaxDiff,
      target, now, windingW: W, onShellPeak: target.peak, offShellRms: target.rms, offShellRmsNow: now.rms
    };
  }

  /* ---------- 实验卡 ---------- */
  const PRESETS = {
    'arc-seed-triad': { stage: 0, eps: 60, kappa: 1, view: 'iso', play: true, still: 0.62 },
    'line-particle-worldline': { stage: 1, eps: 60, kappa: 1, view: 'iso', play: true, still: 0.62 },
    'surface-wave-sagitta': { stage: 2, eps: 60, kappa: 1, view: 'iso', play: true, still: 0.62 },
    'volume-field-condensation': { stage: 3, eps: 60, kappa: 1, view: 'iso', play: true, still: 0.62 },
    'reversal-field-to-particle': { stage: 4, eps: 60, kappa: 1, view: 'top', play: true, still: 1 }
  };
  const NOTES = {
    'arc-seed-triad': ['一条极小圆弧 A → B，ε = 60°：琥珀点沿弧走过；线、面、体三相都从这一条弧里长出来。', 'One minimal arc A → B with ε = 60°: the amber point walks it, and line, surface and volume all grow from this one arc.'],
    'line-particle-worldline': ['一阶 Λ¹：青色切线是粒子的直世界线，青色粗段 sin ε 是 B 离开直线 OA 的正交分量。', 'Grade one: the cyan tangent is the straight worldline of a particle; the thick cyan stretch sin ε is the part of B orthogonal to the line OA.'],
    'surface-wave-sagitta': ['二阶 Λ²：品红矢高 1 − cos ε 把弧从切线上拉弯，品红球面帽 ABC 多出角超 Ω。', 'Grade two: the magenta sagitta 1 − cos ε bends the arc off the tangent, and the magenta cap ABC carries the excess Ω.'],
    'volume-field-condensation': ['三阶 Λ³：紫色扇锥撑开体积 Ω/3，det G₃ > 0；回环十二格上三个相位同向，场点亮每一格。', 'Grade three: the violet sector opens the volume Ω/3 with det G₃ > 0; on the twelve loop sites the three phases align and the field lights every site.'],
    'reversal-field-to-particle': ['反者道之动：壳外三个相位转开 120°，首尾相接闭成三角形而相消；只在 H = {0, 3, 6, 9} 上同向，青色粒子回来。', 'Reversal: off shell the three phases turn 120° apart and close head to tail into triangles; only on H = {0, 3, 6, 9} do they align, and cyan particles return.']
  };
  const CAM = { iso: [-2.28, 0.5, 1], top: [-2.28, 1.02, 1], cell: [-2.36, 0.62, 1.42] };

  let clock, cards, fields, stageChips, sceneChips, transition = null, plotG = null, booting = true, frozenFit = false, handleR = TRACK, hdrag = null, lastG = null;
  const solidOpts = { canvas: $('cv'), yaw: CAM.iso[0], pitch: CAM.iso[1], radius: 0.3, cy: 0.5, wheel: false, onChange: () => paint() };
  const sc = kit.solid($('stage'), solidOpts);
  const paint = kit.painter(() => {
    const G = lastG = engine();
    drawText(G);
    TRV.hudFit();
    fitStage();
    drawStage(G);
    drawPlot(G);
  }, [$('stage'), $('plot')]);

  function setView(view, instant = false) {
    S.view = CAM[view] ? view : 'iso'; sceneChips.set(S.view, true);
    sc.view(CAM[S.view], instant || TRV.still ? 0 : 650); paint();
  }
  function sync() {
    fields.stage.set(fix(S.triadStage, 2)); fields.eps.set(fix(S.arcAngleDeg, 1)); fields.kappa.set(fix(S.cancelSharpness, 2));
    const k = Math.round(S.triadStage);
    stageChips.set(Math.abs(S.triadStage - k) < 0.005 ? String(k) : null, true);
  }
  function leave() { if (transition && transition.run) transition.run.cancel(); transition = null; clock.pause(); cards.mark(null); }
  function setStage(v) { leave(); S.triadStage = clamp(v, 0, 4); sync(); paint(); }
  function setArc(v) { leave(); S.arcAngleDeg = clamp(Math.round(v * 10) / 10, 0, EPS_MAX); sync(); paint(); }
  function setKappa(v) { leave(); S.cancelSharpness = clamp(v, 0, 1); sync(); paint(); }

  clock = kit.clock({ range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, step: 0.05, rate: 1 / 6, loop: true,
    format: (t) => `τ ${fix(t, 2)} <small>/ 1</small>`, onChange: () => paint() });
  fields = {
    stage: kit.field($('triadStage'), { fmt: (v) => fix(v, 2), onInput: setStage }),
    eps: kit.field($('arcAngleDeg'), { fmt: (v) => `${fix(v, 1)}°`, onInput: setArc }),
    kappa: kit.field($('cancelSharpness'), { fmt: (v) => fix(v, 2), onInput: setKappa })
  };
  stageChips = kit.chips($('stageChips'), 'stage', (v) => setStage(Number(v)));
  sceneChips = kit.chips($('sceneChips'), 'scene', (v) => setView(v));
  function applyPreset(id) {
    const p = PRESETS[id], from = { s: S.triadStage, eps: S.arcAngleDeg, kappa: S.cancelSharpness };
    if (transition && transition.run) transition.run.cancel();
    transition = null;
    clock.pause();
    clock.set(0, true);
    setView(p.view, booting);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still, true);
    const land = () => { S.triadStage = p.stage; S.arcAngleDeg = p.eps; S.cancelSharpness = p.kappa; sync(); };
    if (booting || TRV.still) land();
    else {
      const token = {}; transition = token;
      token.run = kit.tween(600, (u) => {
        S.triadStage = from.s + (p.stage - from.s) * u; S.arcAngleDeg = from.eps + (p.eps - from.eps) * u;
        S.cancelSharpness = from.kappa + (p.kappa - from.kappa) * u; sync(); paint();
      }, () => { land(); if (transition === token) transition = null; paint(); });
    }
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    paint();
  }
  cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀手柄改变 ε，或切换三相阶段。', 'Explore freely: drag the amber handle to change ε, or switch the phase stage.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ s: () => setStage((stageIndex() + 1) % 5) });

  /* ---------- 圆弧手柄：拖它沿赤道走，ε 跟着变；拖动期间舞台的取景不变 ---------- */
  const handle = $('arcHandle');
  const trackPoint = (deg, r) => [r * Math.sin(deg * DEG), r * Math.cos(deg * DEG), 0];
  function arcFromPointer(ev, r) {
    const b = $('cv').getBoundingClientRect(), px = ev.clientX - b.left, py = ev.clientY - b.top;
    const dist = (d) => { const q = sc.p(trackPoint(d, r)); return (q[0] - px) ** 2 + (q[1] - py) ** 2; };
    let best = 0, bd = Infinity;
    for (let d = 0; d <= EPS_MAX; d += 0.5) { const dd = dist(d); if (dd < bd) { bd = dd; best = d; } }
    for (let step = 0.25; step >= 0.01; step /= 2) for (const d of [best - step, best + step]) {
      if (d < 0 || d > EPS_MAX) continue;
      const dd = dist(d); if (dd < bd) { bd = dd; best = d; }
    }
    return best;
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    hdrag = { pointer: ev.pointerId, r: handleR }; frozenFit = true;
    handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* 合成事件没有指针捕获 */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!hdrag || ev.pointerId !== hdrag.pointer) return;
    S.arcAngleDeg = clamp(Math.round(arcFromPointer(ev, hdrag.r) * 10) / 10, 0, EPS_MAX); sync(); paint();
  });
  const endDrag = (ev) => {
    if (!hdrag || (ev && ev.pointerId !== hdrag.pointer)) return;
    hdrag = null; frozenFit = false; handle.classList.remove('dragging');
    if (handle.hasPointerCapture && ev && handle.hasPointerCapture(ev.pointerId)) { try { handle.releasePointerCapture(ev.pointerId); } catch (e) { /* 已释放 */ } }
    if (ev && ev.type !== 'lostpointercapture' && document.activeElement === handle) {
      const st = $('stage'); if (!st.hasAttribute('tabindex')) st.setAttribute('tabindex', '-1'); st.focus({ preventScroll: true });
    }
    paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const step = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[ev.key];
    if (step) { ev.preventDefault(); setArc(S.arcAngleDeg + step); }
    else if (ev.key === 'Home') { ev.preventDefault(); setArc(0); }
    else if (ev.key === 'End') { ev.preventDefault(); setArc(EPS_MAX); }
  });

  /* 条带小图：阶段 0–3 拖动改变 ε */
  const plotDrag = (ev) => {
    if (!plotG || stageIndex() === 4) return;
    const rect = $('plot').getBoundingClientRect();
    setArc(plotG.invX(ev.clientX - rect.left));
  };
  $('plot').addEventListener('pointerdown', (ev) => { if (stageIndex() === 4) return; $('plot').setPointerCapture(ev.pointerId); plotDrag(ev); });
  $('plot').addEventListener('pointermove', (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) plotDrag(ev); });
  for (const type of ['pointerup', 'pointercancel']) $('plot').addEventListener(type, (ev) => { if ($('plot').hasPointerCapture(ev.pointerId)) $('plot').releasePointerCapture(ev.pointerId); });

  /* ---------- 取景：整个场景（含回环）落在标题带与图例之间 ---------- */
  function hudBoxes() {
    const b = $('cv').getBoundingClientRect(), out = [];
    if (TRV.thumbMode) return out;
    for (const el of $('stage').querySelectorAll(':scope > .hud-tl, :scope > .hud-tr, :scope > .hud-bl')) {
      if (!el.getClientRects().length || getComputedStyle(el).opacity === '0') continue;
      for (const c of el.children) {
        const q = c.getBoundingClientRect();
        if (q.width > 0 && q.height > 0) out.push({ x: q.left - b.left - 4, y: q.top - b.top - 4, w: q.width + 8, h: q.height + 8 });
      }
    }
    return out;
  }
  /** 取景：在标题、场景按钮与图例之外找最大的圆，整个场景（以包络半径计）落在圆里；包络只随阶段变，不随 ε 变。 */
  function fitStage() {
    if (frozenFit) return;
    const b = $('cv').getBoundingClientRect(), W = b.width || 300, H = b.height || 150, cx = W / 2, boxes = hudBoxes(), w = weights();
    const world = 1.1 + 0.35 * w.line + 0.05 * w.loop;
    let best = { R: 0, cy: H / 2 };
    for (let k = 0; k <= 60; k++) {
      const cy = H * (0.18 + 0.64 * k / 60);
      let R = Math.min(cx - 8, cy - 8, H - 8 - cy);
      for (const c of boxes) {
        const dx = Math.max(c.x - cx, 0, cx - (c.x + c.w)), dy = Math.max(c.y - cy, 0, cy - (c.y + c.h));
        R = Math.min(R, Math.hypot(dx, dy));
      }
      if (R > best.R + 0.5 || (Math.abs(R - best.R) <= 0.5 && Math.abs(cy - H / 2) < Math.abs(best.cy - H / 2))) best = { R, cy };
    }
    const R = Math.max(36, best.R);
    solidOpts.cy = best.cy / H;
    solidOpts.radius = R / world / Math.min(W, H);
  }

  /* ---------- 舞台 ---------- */
  const lift = (p, z = 0.006) => [p[0], p[1], p[2] + z];
  const segment = (a, b, n = 16) => Array.from({ length: n + 1 }, (_, i) => v3.lerp(a, b, i / n));
  const arcPts = (a, b, r = 1, n = 40) => Array.from({ length: n + 1 }, (_, i) => v3.scale(v3.slerp(a, b, i / n), r));
  const camAxes = () => {
    const y = sc.cam.yaw, p = sc.cam.pitch;
    return { R: [Math.cos(y), -Math.sin(y), 0], U: [Math.sin(y) * Math.sin(p), Math.cos(y) * Math.sin(p), Math.cos(p)] };
  };
  function drawStage(G) {
    const P = TRV.palette, w = weights(), tau = clock.t, idx = stageIndex(), { A, B, C, T, s } = G, open = s > 1e-3, marks = [];
    sc.begin();
    const overlay = sc.overlay(), dpr = TRV.fitCanvas(overlay), ctx = overlay.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, sc.W, sc.H);
    // 单位球：挖去 x, y, z ≥ 0 的八分角，原胞落在缺口里
    const grid = { every: [6, 8], color: P.sigma, alpha: 0.12 };
    sc.surface('sphere-low', (th, ph) => v3.sph(th, ph), { u: [PI / 2, PI], v: [0, TAU], nu: 24, nv: 96, color: P.dim, grid });
    sc.surface('sphere-high', (th, ph) => v3.sph(th, ph), { u: [0, PI / 2], v: [PI / 2, TAU], nu: 24, nv: 72, color: P.dim, grid });
    const wall = (key, f) => sc.surface(key, (u, v) => v3.scale(f(v), u), { u: [0, 1], v: [0, PI / 2], nu: 6, nv: 24, color: P.faint, grid: { every: [2, 6], color: P.sigma, alpha: 0.16 } });
    wall('wall-z', (v) => [Math.cos(v), Math.sin(v), 0]);
    wall('wall-x', (v) => [0, Math.cos(v), Math.sin(v)]);
    wall('wall-y', (v) => [Math.cos(v), 0, Math.sin(v)]);
    sc.bead([0, 0, 0], { key: 'O', color: P.dim, r: 3.5 });

    // 本源圆弧 A → B（正文墨色），以及帽的另两条边
    if (open) sc.tube('seed-arc', arcPts(A, B, 1.008).map((p) => lift(p)), { color: P.ink, width: idx === 0 ? 3.6 : 2.6, glow: 0.35, pick: false });
    const rim = Math.max(w.surf, w.vol);
    if (open && rim > 0.01) {
      sc.line(arcPts(B, C, 1.006, 32), { color: P.sigma, alpha: 0.75 * rim, width: 1.3 });
      sc.line(arcPts(C, A, 1.006, 32), { color: P.sigma, alpha: 0.75 * rim, width: 1.3 });
    }
    const Pt = v3.slerp(A, B, tau), Qt = v3.add(A, v3.scale(T, Math.sin(tau * G.e)));

    // 一阶 Λ¹：线与粒子（青）
    if (w.line > 0.01) {
      const wl = Array.from({ length: 31 }, (_, i) => v3.add(A, v3.scale(T, -0.4 + 1.45 * i / 30)));
      sc.tube('worldline', wl, { color: P.cyan, width: 1.8, alpha: (t) => w.line * 0.9 * Math.min(1, t / 0.14, (1 - t) / 0.14), pick: false });
      if (open) {
        sc.tube('half-chord', segment(A, G.Q1), { color: P.cyan, width: 4.2, alpha: w.line, pick: false });
        sc.line([lift(G.F), lift(B)], { color: P.cyan, dash: [4, 3], alpha: 0.7 * w.line, width: 1.2 });
      }
      sc.line([[0, 0, 0.004], lift(A, 0.004)], { color: P.cyan, dash: [5, 4], alpha: 0.55 * w.line, width: 1.1 });
      sc.bead(Qt, { key: 'particle', color: P.cyan, r: 5, alpha: w.line });
    }
    // 二阶 Λ²：面与波（品红）
    if (w.surf > 0.01 && open) {
      sc.tube('sagitta', segment(G.Q1, B), { color: P.magenta, width: 4.2, alpha: w.surf, pick: false });
      sc.line([lift(G.F), lift(A)], { color: P.magenta, dash: [4, 3], alpha: 0.7 * w.surf, width: 1.2 });
      if (tau > 0.002) sc.line([Qt, Pt], { color: P.magenta, alpha: 0.85 * w.surf, width: 1.5 });
      sc.surface('cap', (u, v) => v3.scale(v3.unit(v3.add(v3.scale(A, 1 - u), v3.scale(v3.add(v3.scale(B, 1 - v), v3.scale(C, v)), u))), 1.004),
        { u: [0, 1], v: [0, 1], nu: 22, nv: 22, color: P.magenta, alpha: 0.74 * w.surf * (1 - 0.62 * w.vol), pick: false });
    }
    // 三阶 Λ³：体与场（紫）
    if (w.vol > 0.01 && open) {
      const sector = (key, a, b, off) => sc.surface(key, (u, v) => v3.add(v3.scale(v3.slerp(a, b, v), u), off),
        { u: [0, 1], v: [0, 1], nu: 8, nv: 20, color: P.violet, alpha: 0.6 * w.vol, pick: false });
      sector('sector-oab', A, B, [0, 0, 0.005]);
      sector('sector-obc', B, C, [0.005, 0, 0]);
      sector('sector-oca', C, A, [0, 0, 0]);
      // 三面角的三条棱 O → A、O → B、O → C：体积从球心撑开
      [[A, [0, 0, 0.008]], [B, [0.008, 0, 0.008]], [C, [0.008, 0, 0]]].forEach(([p, off], m) =>
        sc.tube(`edge-${m}`, segment([0, 0, 0], p, 12).map((q) => v3.add(q, off)), { color: P.violet, width: 3, alpha: w.vol, pick: false }));
    }
    sc.bead(lift(A, 0), { key: 'A', color: P.ink, r: 4.5 });
    sc.bead(B, { key: 'B', color: P.ink, r: 4.5 });
    if (rim > 0.01 && open) sc.bead(C, { key: 'C', color: P.sigma, r: 4, alpha: rim });
    sc.bead(v3.scale(Pt, 1.012), { key: 'now', color: P.amber, r: 5.5 });

    // 回环：十二格上的三个相位 χ₀、χ₄、χ₈，按复平面画成正对读者的小箭头链
    if (w.loop > 0.01) {
      sc.circle([0, 0, 0], [0, 0, 1], RING, { color: P.dim, alpha: 0.6 * w.loop, width: 1.1, fade: false });
      const { R, U } = camAxes(), dir = (th) => v3.add(v3.scale(U, Math.cos(th)), v3.scale(R, Math.sin(th)));
      const tones = [P.cyan, P.magenta, P.violet];
      for (const site of G.now.sums) {
        const az = PI / 2 - site.x * PI / 6, base = [RING * Math.cos(az), RING * Math.sin(az), 0.02];
        let p = base;
        const chain = [sc.p(base)];
        site.ph.forEach((q, m) => {
          if (q.amp < 1e-3) return;
          const next = v3.add(p, v3.scale(dir(q.th), PHASOR * q.amp));
          sc.arrow(p, next, { color: tones[m], width: 1.6, headSize: 5, alpha: w.loop });
          p = next; chain.push(sc.p(p));
        });
        if (w.loop > 0.3) {
          const xs = chain.map((c) => c[0]), ys = chain.map((c) => c[1]), x0 = Math.min(...xs) - 9, y0 = Math.min(...ys) - 9;
          marks.push({ x: x0, y: y0, w: Math.max(...xs) + 9 - x0, h: Math.max(...ys) + 9 - y0 });
        }
        const n = G.now.norm[site.x];
        if (site.onShell) sc.ring(base, { key: `shell-${site.x}`, color: P.cyan, r: 9, normal: [0, 0, 1], alpha: 0.5 * w.loop });
        if (n > 0.03) sc.bead(base, { key: `site-${site.x}`, color: site.onShell ? P.cyan : P.violet, r: 2 + 4 * n, alpha: w.loop });
      }
    }
    const hb = placeHandle(G);
    placeLabels(G, w, ctx, hb, marks);
    sc.end();
  }

  function placeHandle(G) {
    if (TRV.thumbMode) { handle.hidden = true; return null; }
    handle.hidden = false;
    const W = sc.W, H = sc.H, half = (handle.offsetWidth || 30) / 2 + 3, hud = hudBoxes();
    const meets = (a, c) => a.x < c.x + c.w && c.x < a.x + a.w && a.y < c.y + c.h && c.y < a.y + a.h;
    let pick = null, first = null;
    for (const r of hdrag ? [hdrag.r] : [TRACK, 1.18, 0.86, 1.32, 0.72]) {
      const q = sc.p(trackPoint(S.arcAngleDeg, r)), x = clamp(q[0], half + 2, W - half - 2), y = clamp(q[1], half + 2, H - half - 2);
      const box = { x: x - half, y: y - half, w: 2 * half, h: 2 * half };
      if (!first) first = { r, x, y, box };
      if (Math.hypot(x - q[0], y - q[1]) < 1 && !hud.some((c) => meets(box, c))) { pick = { r, x, y, box }; break; }
    }
    pick = pick || first;
    handleR = pick.r;
    handle.style.left = `${pick.x.toFixed(1)}px`; handle.style.top = `${pick.y.toFixed(1)}px`;
    handle.classList.toggle('behind', sc.occluded(trackPoint(S.arcAngleDeg, pick.r), 0.02));
    return pick.box;
  }

  /* 标签按优先级找空位：避开标题、场景按钮、图例、手柄与已放的标签；离锚点远时画一条细引线。 */
  const measure = document.createElement('span');
  measure.className = 'label-measure'; measure.hidden = true; $('stage').appendChild(measure);
  const labelSizes = new Map();
  TRV.onLang(() => labelSizes.clear());
  if (document.fonts) document.fonts.ready.then(() => { labelSizes.clear(); paint(); });
  function placeLabels(G, w, ctx, handleBox, marks = []) {
    if (TRV.thumbMode) return;
    const { A, B, C } = G, open = G.s > 1e-3, idx = stageIndex(), labels = [];
    const add = (key, p, text, cls, pri) => labels.push({ key, p, text, cls, pri });
    add('lab-A', A, 'A', 'ink', 10);
    if (open) add('lab-B', B, 'B', 'ink', 10);
    if (open && idx >= 2) add('lab-C', C, 'C', 'ink', 9);
    if (open && (idx === 1 || idx === 2) && G.s > 0.06) add('lab-sin', v3.lerp(A, G.Q1, 0.5), 'sin ε', 'c-cy', 8);
    if (open && idx === 2 && G.order2Sagitta > 0.01) add('lab-sag', v3.lerp(G.Q1, B, 0.5), '1 − cos ε', 'c-mg', 8);
    if (open && idx === 2 && G.order2GirardExcess > 0.01) add('lab-omega', v3.unit(v3.add(v3.add(A, B), C)), 'Ω', 'c-mg', 7);
    if (open && idx === 3 && G.order3SectorVol > 0.004) add('lab-vol', v3.scale(v3.add(v3.add(A, B), C), 0.3), 'Ω/3', 'c-vi', 7);
    if (idx >= 3 && w.loop > 0.35) {
      const site = idx === 4 ? 3 : 1.5, az = PI / 2 - site * PI / 6;
      add('lab-loop', [RING * Math.cos(az), RING * Math.sin(az), 0.02], idx === 4 ? 'H = {0, 3, 6, 9}' : 'ℤ/12ℤ', idx === 4 ? 'c-cy' : 'ink', 6);
    }
    const boxes = hudBoxes(), placed = [], stage = { W: sc.W, H: sc.H };
    if (handleBox) boxes.push({ x: handleBox.x - 2, y: handleBox.y - 2, w: handleBox.w + 4, h: handleBox.h + 4 });
    boxes.push(...marks);
    const c0 = sc.p([0, 0, 0]), silhouette = sc.unit, small = sc.W < 620;
    const meets = (a, c) => a.x < c.x + c.w + 3 && c.x < a.x + a.w + 3 && a.y < c.y + c.h + 3 && c.y < a.y + a.h + 3;
    for (const l of labels.sort((a, c) => c.pri - a.pri)) {
      const cls = `raw backed ${l.cls}`, cache = `${l.text}|${small}`;
      let size = labelSizes.get(cache);
      if (!size) {
        measure.className = `tag ${cls}`; measure.textContent = l.text; measure.hidden = false; measure.style.visibility = 'hidden';
        size = [measure.offsetWidth, measure.offsetHeight]; measure.hidden = true; measure.style.visibility = '';
        if (size[0] > 0) labelSizes.set(cache, size);
      }
      const [lw, lh] = size, q = sc.p(l.p), dx = q[0] - c0[0], dy = q[1] - c0[1], len = Math.hypot(dx, dy);
      // 先沿球心到锚点的径向推到实体轮廓之外（让出主体），再在锚点周围找空位
      const a0 = len > 1 ? Math.atan2(dy, dx) : -PI / 2, out = Math.max(len + 12, silhouette + 10), preferred = [];
      for (const extra of [0, 16, 34]) for (const da of [0, 0.16, -0.16, 0.34, -0.34, 0.55, -0.55]) {
        const a = a0 + da, ext = Math.abs(Math.cos(a)) * lw / 2 + Math.abs(Math.sin(a)) * lh / 2;
        preferred.push([c0[0] + (out + extra + ext) * Math.cos(a), c0[1] + (out + extra + ext) * Math.sin(a)]);
      }
      const candidates = preferred.slice();
      for (const radius of [22, 36, 54, 78, 108]) for (let a = 0; a < 16; a++) candidates.push([q[0] + radius * Math.cos(TAU * a / 16), q[1] + radius * Math.sin(TAU * a / 16)]);
      let best = null, score = Infinity;
      for (const [ci, [x, y]] of candidates.entries()) {
        const r = { x: x - lw / 2, y: y - lh / 2, w: lw, h: lh };
        if (r.x < 8 || r.y < 8 || r.x + lw > stage.W - 8 || r.y + lh > stage.H - 8 || boxes.some((c) => meets(r, c))) continue;
        const d = ci < preferred.length ? ci : preferred.length + Math.hypot(x - q[0], y - q[1]);
        if (d < score) { best = r; score = d; }
      }
      if (!best) continue;
      boxes.push(best); placed.push({ box: best, q });
      sc.tag(l.key, [best.x + lw / 2, best.y + lh / 2], l.text, cls, { screen: true });
    }
    ctx.strokeStyle = TRV.palette.dim; ctx.globalAlpha = 0.5; ctx.lineWidth = 0.8;
    for (const { box, q } of placed) {
      const x = box.x + box.w / 2, y = box.y + box.h / 2, dx = q[0] - x, dy = q[1] - y;
      if (Math.hypot(dx, dy) <= box.w / 2 + 10) continue;
      const k = Math.min((box.w / 2 + 2) / Math.max(1e-3, Math.abs(dx)), (box.h / 2 + 2) / Math.max(1e-3, Math.abs(dy)));
      ctx.beginPath(); ctx.moveTo(x + dx * k, y + dy * k); ctx.lineTo(q[0], q[1]); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- 文字：标题、图例、读数与依据框里的实时数 ---------- */
  const setAll = (cls, text) => document.querySelectorAll(`.${cls}`).forEach((el) => { el.textContent = text; });
  function drawText(G) {
    const idx = stageIndex(), w = weights();
    const heads = [
      [`${L('本源圆弧', 'Seed arc')} · ε = ${fix(S.arcAngleDeg, 1)}°`, L('线、面、体三相都由这一条弧决定', 'Line, surface and volume are all fixed by this one arc')],
      [L('线 · 粒子 Λ¹', 'Line · particle Λ¹'), `sin ε = ${fix(G.order1ChordSin, 4)} · ${L('切线是直世界线', 'the tangent is a straight worldline')}`],
      [L('面 · 波 Λ²', 'Surface · wave Λ²'), `1 − cos ε = ${fix(G.order2Sagitta, 4)} · Ω = ${fix(G.order2GirardExcess, 4)}`],
      [L('体 · 场 Λ³', 'Volume · field Λ³'), `Ω/3 = ${fix(G.order3SectorVol, 4)} · det G₃ = ${fix(G.order3DetG3, 4)}`],
      [L('场相消 · 反生粒子', 'Field cancels · particle returns'), `W = ${fix(G.windingW, 2)} · ${L('壳外', 'off shell')} RMS = ${sci(G.offShellRmsNow)}`]
    ];
    $('hudBig').textContent = heads[idx][0]; $('hudSub').textContent = heads[idx][1];
    const items = [['ik', L('本源弧 A → B', 'Seed arc A → B')]];
    if (w.line > 0.3) items.push(['cy', L('线 · 粒子', 'Line · particle')]);
    if (w.surf > 0.3 || idx >= 2) items.push(['mg', L('面 · 波', 'Surface · wave')]);
    if (w.vol > 0.3 || idx >= 3) items.push(['vi', L('体 · 场', 'Volume · field')]);
    items.push(['am', L('当前点 · ε 手柄', 'Current point · ε handle')]);
    $('legend').innerHTML = items.map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
    $('pillEps').textContent = `${fix(S.arcAngleDeg, 1)}°`; $('pillDet').textContent = fix(G.order3DetG3, 4);
    const keys = [
      [L('本源圆弧 ε', 'Seed arc ε'), `${fix(S.arcAngleDeg, 1)}°`, ' · A → B'],
      [L('线 Λ¹ · sin ε', 'Line Λ¹ · sin ε'), fix(G.order1ChordSin, 6), ''],
      [L('面 Λ² · 1 − cos ε', 'Surface Λ² · 1 − cos ε'), fix(G.order2Sagitta, 6), ` · Ω = ${fix(G.order2GirardExcess, 6)}`],
      [L('体 Λ³ · det G₃', 'Volume Λ³ · det G₃'), fix(G.order3DetG3, 6), ` · Ω/3 = ${fix(G.order3SectorVol, 6)}`],
      [L('壳外均方根（W = 1）', 'Off-shell RMS (W = 1)'), sci(G.offShellRms), ` · ${L('壳上峰值', 'on-shell peak')} ${sci(G.onShellPeak)}`]
    ];
    $('dtKey').textContent = keys[idx][0]; $('roKey').textContent = keys[idx][1]; $('roKeySub').textContent = keys[idx][2];
    $('roLine').textContent = fix(G.order1ChordSin, 6);
    $('roSurf').textContent = `${fix(G.order2Sagitta, 4)} / ${fix(G.order2GirardExcess, 4)}`;
    $('roVol').textContent = `${fix(G.order3SectorVol, 4)} / ${fix(G.order3DetG3, 4)}`;
    $('roBarg').textContent = `${fix(G.order3BargmannIm, 4)} / ${fix(G.bargmannArg, 4)}`;
    $('roShell').textContent = `${sci(G.onShellPeak)} / ${sci(G.offShellRms)}`;
    $('roErr').textContent = `${sci(G.orthComplementIdErr)} / ${sci(G.poissonMaxDiff)} / ${sci(COCHAIN.maxErr)}`;
    setAll('ev-poisson', sci(G.poissonMaxDiff)); setAll('ev-peak', sci(G.onShellPeak)); setAll('ev-rms', sci(G.offShellRms));
    setAll('ev-weyl', fix(WEYL, 5)); setAll('ev-orth', sci(G.orthComplementIdErr)); setAll('ev-lag', fix(G.lagrangeLeft, 6));
    setAll('ev-lagerr', sci(G.lagrangeErr)); setAll('ev-gen', String(GENERATORS)); setAll('ev-det', fix(G.order3DetG3, 6));
    setAll('ev-re', fix(G.bargmannRe, 6)); setAll('ev-im', fix(G.order3BargmannIm, 6)); setAll('ev-barg', sci(G.bargmannErr));
    setAll('ev-cochain', String(COCHAIN.maxErr)); setAll('ev-tetra', String(COCHAIN.defects));
  }

  function drawPlot(G) {
    const P = TRV.palette, idx = stageIndex(), cv = $('plot');
    cv.classList.toggle('readonly', idx === 4);
    if (idx < 4) {
      const g = plotG = kit.plot(cv, { x: [0, EPS_MAX], y: [0, 1.5], pad: [34, 12, 8, 22] });
      g.axes({ xTicks: [0, 20, 40, 60, 85].map((v) => [v, `${v}°`]), yTicks: [0, 0.5, 1, 1.5] });
      const rows = Array.from({ length: 171 }, (_, i) => [i * 0.5, phases(i * 0.5)]);
      g.line(rows.map(([d, q]) => [d, q.sin]), P.cyan, { width: 2 });
      g.line(rows.map(([d, q]) => [d, q.sag]), P.magenta, { width: 2 });
      g.line(rows.map(([d, q]) => [d, q.omega]), P.magenta, { width: 1.5, dash: [5, 4] });
      g.line(rows.map(([d, q]) => [d, q.det]), P.violet, { width: 2 });
      g.line(rows.map(([d, q]) => [d, q.im]), P.violet, { width: 1.5, dash: [5, 4] });
      g.vline(S.arcAngleDeg, P.amber);
      for (const [v, c] of [[G.order1ChordSin, P.cyan], [G.order2Sagitta, P.magenta], [G.order2GirardExcess, P.magenta], [G.order3DetG3, P.violet], [G.order3BargmannIm, P.violet]]) g.dot(S.arcAngleDeg, v, c, 3.2);
      g.legend([[P.cyan, 'sin ε'], [P.magenta, '1 − cos ε'], [P.magenta, 'Ω', 'dash'], [P.violet, 'det G_{3}'], [P.violet, 'Im Δ_{3}', 'dash']], { right: false });
      $('plotTitle').textContent = L('ε → 0：面与体先于线熄灭', 'As ε → 0 the surface and volume go out before the line');
      $('plotMeta').textContent = `ε = ${fix(S.arcAngleDeg, 1)}°`;
    } else {
      const g = plotG = kit.plot(cv, { x: [-0.6, 11.6], y: [0, 1.15], pad: [34, 12, 8, 22] });
      g.axes({ xTicks: SITES.map((x) => [x, String(x)]), yTicks: [0, 0.5, 1] });
      for (const x of SITES) {
        const on = H3.includes(x), c = on ? P.cyan : P.violet;
        g.rect(x - 0.3, 0, x + 0.3, G.now.norm[x], c, { alpha: 0.75 });
        g.dot(x, G.target.norm[x], c, 3, { ring: true, width: 1.4 });
      }
      $('plotTitle').textContent = L('十二格上的三相和 |Σ| / |Σ(0)|', 'The three-phase sum |Σ| / |Σ(0)| on twelve sites');
      $('plotMeta').textContent = `W = ${fix(G.windingW, 2)} · κ = ${fix(S.cancelSharpness, 2)}`;
    }
  }

  /* ---------- 只读探针 ---------- */
  function snapshot() {
    const G = engine();
    return JSON.parse(JSON.stringify({
      triadStage: S.triadStage, stageIndex: stageIndex(), arcAngleDeg: S.arcAngleDeg, cancelSharpness: S.cancelSharpness, view: S.view,
      order1ChordSin: G.order1ChordSin, order2Sagitta: G.order2Sagitta, order2GirardExcess: G.order2GirardExcess,
      order3SectorVol: G.order3SectorVol, order3DetG3: G.order3DetG3, order3BargmannIm: G.order3BargmannIm,
      bargmannRe: G.bargmannRe, bargmannArg: G.bargmannArg, bargmannErr: G.bargmannErr, lagrangeErr: G.lagrangeErr,
      su2GeneratorCount: GENERATORS, deRhamMaxGrade: TOP_GRADE, gradeDims: GRADE_DIMS.slice(0, 4),
      cochainSquareZeroMaxErr: COCHAIN.maxErr, tetraDefects: COCHAIN.defects, faceErrors: COCHAIN.faceErrors, cochainFaceValues: COCHAIN.faceValues,
      incidence: { faceErrorSum: COCHAIN.bumpedFaceSum, tetraDefects: COCHAIN.bumpedDefects },
      poissonMaxDiff: G.poissonMaxDiff, characterMaxDiff: G.characterMaxDiff,
      poissonSubgroups: G.poisson.rows.map((r) => ({ name: r.name, elements: r.elements, annihilator: r.annihilator, diff: r.diff })),
      offShellRms: G.offShellRms, onShellPeak: G.onShellPeak, offShellRmsNow: G.offShellRmsNow, windingW: G.windingW,
      siteAmplitudes: G.now.norm, siteTargets: G.target.norm, orthComplementIdErr: G.orthComplementIdErr,
      weylAvgAbs: WEYL, weylN: WEYL_N, weights: weights(), handleTrack: handleR,
      preset: cards.current, t: clock.t, playing: clock.playing, max: clock.max, camera: { ...sc.cam }
    }));
  }
  window.TRIAD_LOOP_DEBUG = Object.freeze({
    get state() { return snapshot(); },
    engine: (eps, kappa, W) => JSON.parse(JSON.stringify(engine(eps, kappa, W))),
    setStage, setArc, setKappa,
    screen: (p) => { const b = $('cv').getBoundingClientRect(), q = sc.p(p); return [b.left + q[0], b.top + q[1]]; },
    trackPoint: (deg, r = handleR) => trackPoint(deg, r)
  });
  window.TRV_THUMB = () => { cards.pick('volume-field-condensation'); paint.now(); };
  cards.pick(cards.initial('arc-seed-triad')); booting = false; sync(); paint();
})();
