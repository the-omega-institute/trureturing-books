/* ORTHO//POLYGON: 2m point vortices of alternating sign on a circle, with the precession term of chapter 30.
   The field is F_{b,Ω} of def-ch30-alternating-vortex-polygon with b = 2, Ω = ½, so the resting radius is R = 1.
   One rail (the time t) and four situations:
     rest      the regular polygon at R: nothing moves
     radius    the same polygon at ρ = 1.2: the positive vortices turn one way, the negative ones the other
     unstable  m ≥ 3, a 10⁻⁹ push along an eigenvector of λ_r = Ω(m − r)√(r² − 2), r = 2: the push grows like e^{λt}
     drift     m ≤ 2 (all eigenvalues on the imaginary axis), a push ε·c₁ along the Jordan chain: the polygon turns away
   The nonlinear equations are integrated with the classical Runge–Kutta method; the eigenvector comes from inverse
   iteration on the Jacobian (central differences). Read-only probe for the browser suite: window.POLYGON_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const B = 2, OM = 0.5, R = Math.sqrt(B / (4 * OM));
  const EPS_UN = 1e-9, EPS_DR = 0.01, RHO_OFF = 1.2, FRAMES = 400;

  /* ---------- the field ---------- */
  const sign = (j) => (j % 2 === 0 ? 1 : -1);   // vortex j = 0 … N−1 here is vortex j + 1 of the chapter: s = (−1)^{j+2}
  function field(z, N) {
    const out = new Float64Array(2 * N);
    for (let j = 0; j < N; j++) {
      const xj = z[j], yj = z[N + j];
      let fx = -sign(j) * OM * yj, fy = sign(j) * OM * xj;
      for (let k = 0; k < N; k++) {
        if (k === j) continue;
        const dx = xj - z[k], dy = yj - z[N + k], d = dx * dx + dy * dy;
        fx -= (B / 2) * sign(k) * dy / d; fy += (B / 2) * sign(k) * dx / d;
      }
      out[j] = fx; out[N + j] = fy;
    }
    return out;
  }
  function polygon(N, rho) {
    const z = new Float64Array(2 * N);
    for (let j = 0; j < N; j++) { const a = 2 * Math.PI * (j + 1) / N; z[j] = rho * Math.cos(a); z[N + j] = rho * Math.sin(a); }
    return z;
  }
  const axpy = (a, x, y) => { const o = new Float64Array(y.length); for (let i = 0; i < y.length; i++) o[i] = y[i] + a * x[i]; return o; };
  function rk4(z, N, dt) {
    const k1 = field(z, N), k2 = field(axpy(dt / 2, k1, z), N), k3 = field(axpy(dt / 2, k2, z), N), k4 = field(axpy(dt, k3, z), N);
    const o = new Float64Array(z.length);
    for (let i = 0; i < z.length; i++) o[i] = z[i] + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
    return o;
  }
  const norm = (v) => Math.sqrt(v.reduce((s, x) => s + x * x, 0));

  /* ---------- the eigenvector of λ_r (r = 2) by inverse iteration ---------- */
  const lambda = (m, r) => OM * (m - r) * Math.sqrt(r * r - 2);
  function jacobian(N) {
    const z0 = polygon(N, R), h = 1e-6, n = 2 * N, J = Array.from({ length: n }, () => new Float64Array(n));
    for (let q = 0; q < n; q++) {
      const zp = z0.slice(), zm = z0.slice(); zp[q] += h; zm[q] -= h;
      const fp = field(zp, N), fm = field(zm, N);
      for (let p = 0; p < n; p++) J[p][q] = (fp[p] - fm[p]) / (2 * h);
    }
    return J;
  }
  function solve(A, b) {
    const n = b.length, M = A.map((r, i) => [...r, b[i]]);
    for (let c = 0; c < n; c++) {
      let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(M[i][c]) > Math.abs(M[p][c])) p = i;
      [M[c], M[p]] = [M[p], M[c]];
      for (let i = c + 1; i < n; i++) { const f = M[i][c] / M[c][c]; for (let j = c; j <= n; j++) M[i][j] -= f * M[c][j]; }
    }
    const x = new Float64Array(n);
    for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j]; x[i] = s / M[i][i]; }
    return x;
  }
  function eigvec(N, mu) {
    const J = jacobian(N), n = 2 * N, A = J.map((r, i) => { const o = Array.from(r); o[i] -= mu + 1e-7; return o; });
    let x = Float64Array.from({ length: n }, (_, i) => Math.sin(1.7 * i + 0.3) + 0.5);
    for (let it = 0; it < 12; it++) { x = solve(A, x); const s = norm(x); x = x.map((v) => v / s); }
    // a fixed orientation: the largest component positive
    let big = 0; for (let i = 1; i < n; i++) if (Math.abs(x[i]) > Math.abs(x[big])) big = i;
    if (x[big] < 0) x = x.map((v) => -v);
    return x;
  }
  /** c₁ of prop-ch30-vortex-polygon-neutral-drift: (1/δ_m)(s_j x_j; s_j y_j), δ_m = 1 − m²/2. */
  function chain(m) {
    const N = 2 * m, z = polygon(N, R), d = 1 - m * m / 2, c = new Float64Array(2 * N);
    for (let j = 0; j < N; j++) { c[j] = sign(j) * z[j] / d; c[N + j] = sign(j) * z[N + j] / d; }
    return c;
  }

  /* ---------- the situation and its trajectory ---------- */
  const S = { m: 3, mode: 'unstable' };
  const MODES = ['rest', 'radius', 'unstable', 'drift'];
  const allowed = (m, mode) => (mode === 'unstable' ? m >= 3 : mode === 'drift' ? m <= 2 : true);
  let run = null;
  function build() {
    const m = S.m, N = 2 * m, ref = polygon(N, R);
    let z0 = ref, tmax = 10, lam = null, u = null, eps = 0;
    if (S.mode === 'radius') { z0 = polygon(N, RHO_OFF); tmax = 3; }
    if (S.mode === 'unstable') { lam = lambda(m, 2); u = eigvec(N, lam); eps = EPS_UN; z0 = axpy(eps, u, ref); tmax = Math.min(10, Math.log(1e6) / lam); }
    if (S.mode === 'drift') { u = chain(m); eps = EPS_DR; z0 = axpy(eps, u, ref); tmax = 100; }
    const per = Math.max(1, Math.ceil(tmax / FRAMES / 0.01)), dt = tmax / FRAMES / per;
    const frames = [z0], turn = [0];
    let z = z0, acc = 0;
    for (let f = 1; f <= FRAMES; f++) {
      const prev = z;
      for (let s = 0; s < per; s++) z = rk4(z, N, dt);
      let a = 0;
      for (let j = 0; j < N; j++) a += Math.atan2(prev[j] * z[N + j] - prev[N + j] * z[j], prev[j] * z[j] + prev[N + j] * z[N + j]);
      acc += a / N; frames.push(z); turn.push(acc);
    }
    const f0 = field(z0, N);
    const omega = [];
    for (let j = 0; j < N; j++) omega.push((z0[j] * f0[N + j] - z0[N + j] * f0[j]) / (z0[j] ** 2 + z0[N + j] ** 2));
    run = { m, N, mode: S.mode, ref, z0, tmax, lam, u, eps, frames, turn, dev0: norm(axpy(-1, ref, z0)), speed0: Math.max(...f0.map(Math.abs)), omega };
  }
  function at(t) {
    const x = kit.clamp(t / run.tmax, 0, 1) * FRAMES, i = Math.min(FRAMES - 1, Math.floor(x)), f = x - i;
    const a = run.frames[i], b = run.frames[i + 1], z = new Float64Array(a.length);
    for (let k = 0; k < a.length; k++) z[k] = a[k] + f * (b[k] - a[k]);
    return { z, turn: run.turn[i] + f * (run.turn[i + 1] - run.turn[i]) };
  }
  function readout(t) {
    const { z, turn } = at(t), dev = norm(axpy(-1, run.ref, z));
    return { t, z, dev, growth: run.dev0 > 0 ? dev / run.dev0 : 0, predicted: run.lam != null ? Math.exp(run.lam * t) : null, turn, linearTurn: run.eps * t };
  }

  /* ---------- stage ---------- */
  function arrow(g, a, b, color, width) {
    const L2 = Math.hypot(b[0] - a[0], b[1] - a[1]), h = Math.min(L2 * 0.45, 11 / g.scale), ux = (b[0] - a[0]) / L2, uy = (b[1] - a[1]) / L2;
    g.line([a, [b[0] - ux * h * 0.8, b[1] - uy * h * 0.8]], color, { width, glow: 8 });
    g.poly([b, [b[0] - ux * h - uy * h * 0.45, b[1] - uy * h + ux * h * 0.45], [b[0] - ux * h + uy * h * 0.45, b[1] - uy * h - ux * h * 0.45]], color, { alpha: 1 });
  }
  let view = null;
  function drawStage() {
    const k = readout(clock.t), N = run.N, thumb = TRV.thumbMode, lw = thumb ? 1.8 : 1;
    const g = view = kit.plot($('cv'), { x: [-1.55, 1.55], y: [-1.45, 1.45], pad: [20, 20, 64, 46], equal: true });
    const circ = (r) => { const pts = []; for (let i = 0; i <= 120; i++) pts.push([r * Math.cos(i * Math.PI / 60), r * Math.sin(i * Math.PI / 60)]); return pts; };
    g.line(circ(R), P.faint, { width: 1.2 * lw, dash: [4, 4] });
    if (run.mode === 'radius') g.line(circ(RHO_OFF), P.dim, { width: 1 * lw, dash: [2, 4] });
    g.dot(0, 0, P.dim, 2.5 * lw);
    // where the vortices started
    for (let j = 0; j < N; j++) g.dot(run.z0[j], run.z0[N + j], P.dim, 7 * lw, { ring: true, width: 1.2 });
    // trails
    if (run.mode === 'radius' || run.mode === 'drift') {
      const upto = Math.round(kit.clamp(clock.t / run.tmax, 0, 1) * FRAMES);
      for (let j = 0; j < N; j++) {
        const pts = []; for (let f = 0; f <= upto; f++) pts.push([run.frames[f][j], run.frames[f][N + j]]);
        pts.push([k.z[j], k.z[N + j]]);
        g.line(pts, sign(j) > 0 ? P.cyan : P.magenta, { width: 1.6 * lw, alpha: 0.75 });
      }
    }
    // the push, magnified
    let mag = null;
    if (run.mode === 'unstable') {
      mag = 0.32 / (run.eps * Math.exp(run.lam * run.tmax) * Math.max(...Array.from(run.u).map(Math.abs)));
      for (let j = 0; j < N; j++) {
        const x0 = run.ref[j], y0 = run.ref[N + j], dx = (k.z[j] - x0) * mag, dy = (k.z[N + j] - y0) * mag;
        if (Math.hypot(dx, dy) > 0.004) arrow(g, [x0, y0], [x0 + dx, y0 + dy], P.amber, 2.4 * lw);
      }
    }
    // the drift: how far the whole polygon has turned
    if (run.mode === 'drift' && Math.abs(k.turn) > 1e-4) {
      const a0 = Math.atan2(run.z0[N], run.z0[0]), pts = [];
      for (let i = 0; i <= 40; i++) { const a = a0 + k.turn * i / 40; pts.push([0.42 * Math.cos(a), 0.42 * Math.sin(a)]); }
      g.line(pts, P.amber, { width: 2.4 * lw, glow: 8 });
      g.line([[0, 0], [run.z0[0], run.z0[N]]], P.dim, { width: 1, dash: [3, 3] });
      g.line([[0, 0], [k.z[0], k.z[N]]], P.amber, { width: 1.4 * lw });
    }
    for (let j = 0; j < N; j++) g.dot(k.z[j], k.z[N + j], sign(j) > 0 ? P.cyan : P.magenta, 7.5 * lw, { glow: 10 });
    if (!thumb) {
      for (let j = 0; j < N; j++) g.text(k.z[j], k.z[N + j], sign(j) > 0 ? '+' : '−', P.stage, { align: 'center', base: 'middle', size: 12 });
      g.text(R * Math.cos(-0.35), R * Math.sin(-0.35), 'R = 1', P.dim, { align: 'left', dx: 8, size: 12 });
      if (mag) g.text(-1.5, -1.38, L(`琥珀色箭头：位移 × ${sci(mag)}`, `amber arrows: displacement × ${sci(mag)}`), P.amber, { align: 'left', size: 12 });
      if (run.mode === 'drift' && Math.abs(k.turn) > 0.02) g.text(0.6 * Math.cos(Math.atan2(run.z0[N], run.z0[0]) + k.turn / 2), 0.6 * Math.sin(Math.atan2(run.z0[N], run.z0[0]) + k.turn / 2), `${fix(k.turn / Math.PI * 180, 1)}°`, P.amber, { align: 'right', dx: -8, size: 12 });
    }
    hud(k);
  }
  const sci = (x) => { const e = Math.floor(Math.log10(x)), c = x / 10 ** e; return `${fix(c, 1)}×10${String(e).split('').map((d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[+d] || d).join('')}`; };

  function hud(k) {
    const m = run.m, n = 2 * m;
    const name = { rest: L('静止', 'At rest'), radius: L('半径不对', 'Wrong radius'), unstable: L('发散', 'Diverging'), drift: L('漂移', 'Drifting') }[run.mode];
    $('hudBig').textContent = `${name} · ${n} ${L('个涡旋', 'vortices')}`;
    $('hudSub').innerHTML = run.mode === 'rest' ? L(`半径 R = 1：进动与邻居恰好相抵，最大速度 ${sci(Math.max(run.speed0, 1e-17))}`, `radius R = 1: precession and neighbours cancel, largest speed ${sci(Math.max(run.speed0, 1e-17))}`)
      : run.mode === 'radius' ? L(`半径 1.2：正涡旋每秒逆时针转 ${fix(run.omega[0], 3)}，负涡旋顺时针转同样多`, `radius 1.2: positive vortices turn ${fix(run.omega[0], 3)} rad/s anticlockwise, negative ones as much clockwise`)
        : run.mode === 'unstable' ? `λ = ${fix(run.lam, 4)} · t = ${fix(k.t, 2)} · ${L('增长', 'growth')} ${fix(k.growth, 1)} · e<sup>λt</sup> = ${fix(k.predicted, 1)}`
          : L(`ε = ${run.eps} · t = ${fix(k.t, 1)} · 平均转过 ${fix(k.turn, 4)} rad，线性化给出 εt = ${fix(k.linearTurn, 4)}`, `ε = ${run.eps} · t = ${fix(k.t, 1)} · turned ${fix(k.turn, 4)} rad on average; the linearization gives εt = ${fix(k.linearTurn, 4)}`);
    const leg = [['cy', '正涡旋 +', 'positive vortex +'], ['mg', '负涡旋 −', 'negative vortex −'], ['dm', '出发的位置', 'where they started']];
    if (run.mode === 'unstable') leg.push(['am', '放大后的位移', 'the magnified displacement']);
    if (run.mode === 'drift') leg.push(['am', '整圈转过的角', 'the angle the whole ring has turned']);
    $('legend').innerHTML = leg.map(([c, zh, en]) => `<span><i class="sw ${c}"></i>${L(zh, en)}</span>`).join('');
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    const cv = $('plot');
    if (run.mode === 'unstable') {
      const top = Math.log10(Math.exp(run.lam * run.tmax)) * 1.08;
      const g = kit.plot(cv, { x: [0, run.tmax], y: [0, top], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [0, 2, 4, 6].filter((v) => v <= top), xGrid: true, yFmt: (v) => `10${'⁰¹²³⁴⁵⁶'[v]}` });
      const pr = [], pg = [];
      for (let i = 0; i <= 120; i++) { const t = run.tmax * i / 120; pr.push([t, run.lam * t / Math.LN10]); if (t <= clock.t + 1e-9) pg.push([t, Math.log10(readout(t).growth)]); }
      g.line(pr, P.dim, { width: 1.3, dash: [5, 3] }); g.line(pg, P.cyan, { width: 2 });
      g.vline(clock.t, P.amber);
      g.legend([[P.cyan, L('增长倍数', 'growth')], [P.dim, 'e^(λt)', 'dash']], { right: false });
      $('plotTitle').innerHTML = L('<span>偏离按指数长大</span>', '<span>The push grows exponentially</span>');
    } else if (run.mode === 'drift') {
      const g = kit.plot(cv, { x: [0, run.tmax], y: [0, run.eps * run.tmax * 1.15], pad: [34, 10, 8, 22] });
      g.axes({ xGrid: true });
      const lin = [[0, 0], [run.tmax, run.eps * run.tmax]], got = [];
      for (let i = 0; i <= 120; i++) { const t = run.tmax * i / 120; if (t <= clock.t + 1e-9) got.push([t, readout(t).turn]); }
      g.line(lin, P.dim, { width: 1.3, dash: [5, 3] }); g.line(got, P.cyan, { width: 2 });
      g.vline(clock.t, P.amber);
      g.legend([[P.cyan, L('平均转角', 'mean angle')], [P.dim, 'εt', 'dash']], { right: false });
      $('plotTitle').innerHTML = L('<span>谱全在虚轴上，整圈仍匀速转走</span>', '<span>An imaginary spectrum, yet the ring turns away</span>');
    } else {
      const g = kit.plot(cv, { x: [0, run.tmax], y: [0, 1.1], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xGrid: true });
      const pts = []; for (let i = 0; i <= 120; i++) { const t = run.tmax * i / 120; if (t <= clock.t + 1e-9) pts.push([t, readout(t).dev / Math.sqrt(run.N)]); }
      g.line(pts, P.cyan, { width: 2 }); g.vline(clock.t, P.amber);
      $('plotTitle').innerHTML = L('<span>离静止的正多边形有多远</span>', '<span>How far from the resting regular polygon</span>');
    }
    $('plotMeta').textContent = `t = ${fix(clock.t, 2)}`;
  }

  /* ---------- readouts ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  function drawText() {
    const k = readout(clock.t), m = run.m;
    let keyName, key;
    if (run.mode === 'unstable') { keyName = L('增长倍数 · e^(λt)', 'growth · e^(λt)'); key = `${fix(k.growth, 1)} <small>· ${fix(k.predicted, 1)}</small>`; }
    else if (run.mode === 'drift') { keyName = L('平均转角 · εt', 'mean angle · εt'); key = `${fix(k.turn, 4)} <small>· ${fix(k.linearTurn, 4)}</small>`; }
    else if (run.mode === 'radius') { keyName = L('正 / 负涡旋的角速度', 'angular speed of + / − vortices'); key = `${sgn(run.omega[0], 3)} <small>/ ${sgn(run.omega[1], 3)}</small>`; }
    else { keyName = L('最大速度', 'largest speed'); key = sci(Math.max(run.speed0, 1e-17)); }
    const lams = []; for (let r = 2; r <= m - 1; r++) lams.push(fix(lambda(m, r), 4));
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>`
      + row('', '涡旋个数 2m', 'vortices 2m', `${2 * m} (m = ${m})`)
      + row('m', '正实本征值 λ<sub>r</sub>（r = 2 … m − 1）', 'positive eigenvalues λ<sub>r</sub> (r = 2 … m − 1)', lams.length ? lams.join(' · ') : L('没有', 'none'))
      + row('', '离静止多边形的距离', 'distance from the resting polygon', sci(Math.max(k.dev, 1e-17)))
      + row('', '时间 t', 'time t', fix(k.t, 2));
    $('roNote').textContent = run.mode === 'unstable' ? L('六边形起才有正实本征值；沿它的本征方向推一下，偏离按 e^(λt) 长大，与闭式 λ = Ω(m − r)√(r² − 2) 一致。', 'Positive eigenvalues start with the hexagon; a push along such an eigenvector grows like e^(λt), matching the closed form λ = Ω(m − r)√(r² − 2).')
      : run.mode === 'drift' ? L('偶极与正方形的本征值全在虚轴上，可沿若尔当链 c₁ 推一下，整圈涡旋绕原点匀速转走：谱中性不等于有界。', 'For the dipole and the square every eigenvalue is imaginary, yet a push along the Jordan chain c₁ turns the whole ring steadily about the centre: a neutral spectrum is not boundedness.')
        : run.mode === 'radius' ? L('偶数个涡旋只在半径 R 上静止；放在别的半径上，进动与邻居不再相抵，正负涡旋朝相反方向转开。', 'An even ring rests only at the radius R; at any other radius precession and neighbours no longer cancel, and the two signs turn apart.')
          : L('半径 R = √(b/(4Ω)) = 1：每个涡旋的进动与其余涡旋吹来的速度恰好相抵。', 'Radius R = √(b/(4Ω)) = 1: each vortex\'s precession exactly cancels the velocity the others blow on it.');
    $('pillN').querySelector('strong').textContent = String(2 * m);
    $('pillKey').querySelector('strong').textContent = run.mode === 'unstable' ? fix(k.growth, 0) : run.mode === 'drift' ? `${fix(k.turn, 3)} rad` : run.mode === 'radius' ? sgn(run.omega[0], 3) : '0';
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- rail and controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 10, t: 0, rate: 1, step: 0.5,
    format: (t, max) => `t ${fix(t, 2)} <small>/ ${fix(max, 1)}</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      paint();
    }
  });
  function rebuild(t) {
    build();
    clock.rate = run.tmax / 6; clock.step = run.tmax / 20; clock.setMax(run.tmax, true);
    clock.set(t == null ? 0 : Math.min(t, run.tmax));
    modeChips.set(S.mode, true); mChips.set(String(S.m), true);
    document.querySelectorAll('#modeChips [data-mode]').forEach((b) => { b.disabled = !allowed(S.m, b.dataset.mode); });
  }
  const leave = () => cards.mark(null);
  const mChips = kit.chips($('mChips'), 'm', (v) => { leave(); clock.pause(); S.m = +v; if (!allowed(S.m, S.mode)) S.mode = S.m >= 3 ? 'unstable' : 'drift'; rebuild(0); });
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { leave(); clock.pause(); if (!allowed(S.m, v)) return; S.mode = v; rebuild(0); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    rest: { m: 3, mode: 'rest', play: true, still: 'end' },
    radius: { m: 3, mode: 'radius', play: true, still: 'end' },
    hexagon: { m: 3, mode: 'unstable', play: true, still: 'end' },
    drift: { m: 2, mode: 'drift', play: true, still: 'end' }
  };
  const NOTES = {
    rest: ['六个涡旋正负相间排在半径 R = 1 的圆上：每个涡旋的进动与其余涡旋吹来的速度恰好相抵，整圈一动不动。', 'Six vortices of alternating sign on the circle of radius R = 1: each one\'s precession exactly cancels the velocity the others blow on it, and the ring does not move.'],
    radius: ['同一个六边形放在半径 1.2 上：进动压过邻居，青色的正涡旋逆时针转、品红的负涡旋顺时针转，整圈拆开。', 'The same hexagon at radius 1.2: precession beats the neighbours, the cyan positive vortices turn anticlockwise and the magenta negative ones clockwise, and the ring comes apart.'],
    hexagon: ['六边形沿本征值 λ = 1/√2 的本征方向推 10⁻⁹：琥珀色的位移（放大后）按 e^(λt) 长大，到 t = 10 约 1177 倍。', 'The hexagon pushed 10⁻⁹ along an eigenvector of λ = 1/√2: the amber displacement (magnified) grows like e^(λt), about 1177 times by t = 10.'],
    drift: ['正方形的本征值全在虚轴上。沿若尔当链 c₁ 推 ε = 0.01：正负涡旋的半径错开，整圈绕原点匀速转走，到 t = 100 约转过 1 弧度。', 'Every eigenvalue of the square is imaginary. Push it ε = 0.01 along the Jordan chain c₁: the radii of the two signs split and the whole ring turns steadily about the centre, about 1 radian by t = 100.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    stopAt = null; clock.pause();
    S.m = p.m; S.mode = p.mode;
    rebuild(0);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame
    if (TRV.still || (booting && !TRV.embed)) { clock.set(p.still === 'end' ? clock.max : p.still); return; }
    if (!p.play) return;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换涡旋个数与推法，拖时间轴。随时可以再选一张卡。', 'Free play: change the number of vortices and the push, and scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.POLYGON_DEBUG = {
    get state() {
      const k = readout(clock.t);
      return { t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, m: run.m, mode: run.mode, lam: run.lam, eps: run.eps,
        z: Array.from(k.z), z0: Array.from(run.z0), ref: Array.from(run.ref), u: run.u ? Array.from(run.u) : null, growth: k.growth, predicted: k.predicted,
        turn: k.turn, linearTurn: k.linearTurn, speed0: run.speed0, omega: run.omega.slice(), dev: k.dev };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    consts: { b: B, Omega: OM, R, epsUnstable: EPS_UN, epsDrift: EPS_DR, rhoOff: RHO_OFF }
  };
  window.TRV_THUMB = () => { S.m = 2; S.mode = 'drift'; rebuild(100); paint.now(); };
  cards.pick(cards.initial('hexagon'));
  booting = false;
  paint();
})();
