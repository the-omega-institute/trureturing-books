/* PAIR//SHUTTER · 两子丈量与快门计数 · Pairwise measurement and shutter counts
   One stage, two parts. Left: the Bloch sphere with the known state A (cyan) and the target state B (amber); B's
   perpendicular onto A's diameter cuts it so that the stretch on the −1 side is the weight p = Tr(ρ_A P_B). Right: the
   shutter. Shot i passes when its uniform random number uᵢ < pᵢ; the curve is the running share k/N against N on a
   log axis, the dashed line is p. In "random" mode B is a fresh uniform direction for every shot and the right part
   is the histogram of the weights. The rail runs over t ∈ [0, ln(1 + Nmax)] and N(t) = ⌊eᵗ − 1⌋ shots are done.
   Read-only probe for the browser suite: window.SHUTTER_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180;
  const BINS = 10, ROW = 40;
  const TURN_AXIS = v3.sph(55 * DEG, 110 * DEG);

  /* ---------- the weight, three ways ---------- */
  // 2 × 2 complex matrices [[a, b], [c, d]] with entries [re, im]
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  /** ½(I + v·σ). */
  const half = (v) => [[[(1 + v[2]) / 2, 0], [v[0] / 2, -v[1] / 2]], [[v[0] / 2, v[1] / 2], [(1 - v[2]) / 2, 0]]];
  const traceW = (a, b) => { const M = mmul(half(a), half(b)); return M[0][0][0] + M[1][1][0]; };
  /** The spinor (cos(θ/2), e^{iφ} sin(θ/2)) of a unit Bloch vector. */
  function spinor(v) {
    const th = Math.acos(Math.max(-1, Math.min(1, v[2]))), ph = Math.atan2(v[1], v[0]);
    return [[Math.cos(th / 2), 0], [Math.sin(th / 2) * Math.cos(ph), Math.sin(th / 2) * Math.sin(ph)]];
  }
  /** |⟨φ_b|ψ_a⟩|². */
  function spinorW(a, b) {
    const x = spinor(a), y = spinor(b);
    const re = y[0][0] * x[0][0] + y[0][1] * x[0][1] + y[1][0] * x[1][0] + y[1][1] * x[1][1];
    const im = y[0][0] * x[0][1] - y[0][1] * x[0][0] + y[1][0] * x[1][1] - y[1][1] * x[1][0];
    return re * re + im * im;
  }
  const sphereW = (a, b) => (1 + v3.dot(a, b)) / 2;
  const angle = (a, b) => Math.acos(Math.max(-1, Math.min(1, v3.dot(a, b))));

  /* ---------- state ---------- */
  const S = { A: [0, 0, 1], B: v3.sph(60 * DEG, 0), mode: 'fixed', turn: false, seed: 1, nmax: 4000 };
  let run = null;   // the shots of this run
  const tmaxOf = (n) => Math.log(1 + n);
  /** Shots done at rail time t. */
  const shotsAt = (t) => Math.max(0, Math.min(S.nmax, Math.floor(Math.expm1(t) + 1e-9)));
  /** Turning angle of the pair at rail time t (one full turn over the run). */
  const turnAt = (t) => (S.turn && S.mode === 'fixed' ? 2 * Math.PI * t / tmaxOf(S.nmax) : 0);
  /** Turning angle at the moment of shot n (1-based): the rail reaches n shots at t = ln(1 + n). */
  const turnOfShot = (n) => turnAt(Math.log(1 + n));
  const rotA = (alpha) => v3.rot(S.A, TURN_AXIS, alpha), rotB = (alpha) => v3.rot(S.B, TURN_AXIS, alpha);

  /** Draw the run: uniform numbers u (the shutter), and for "random" a uniform direction per shot. */
  function rebuild() {
    const n = S.nmax, rng = TRV.mulberry32(0x5eed + 7919 * S.seed), dirRng = TRV.mulberry32(0xd1ec + 104729 * S.seed);
    const u = new Float64Array(n), w = new Float64Array(n), pass = new Uint8Array(n), K = new Uint32Array(n + 1);
    const dirs = S.mode === 'random' ? [] : null;
    const fixedW = traceW(S.A, S.B);
    for (let i = 0; i < n; i++) {
      u[i] = rng();
      if (dirs) {
        let d; do { d = [TRV.gauss(dirRng), TRV.gauss(dirRng), TRV.gauss(dirRng)]; } while (v3.len(d) < 1e-9);
        d = v3.unit(d); dirs.push(d); w[i] = traceW(S.A, d);
      } else if (S.turn) {
        const al = turnOfShot(i + 1); w[i] = traceW(rotA(al), rotB(al));
      } else w[i] = fixedW;
      pass[i] = u[i] < w[i] ? 1 : 0;
      K[i + 1] = K[i] + pass[i];
    }
    run = { u, w, pass, K, dirs };
  }
  rebuild();
  /** Bin counts of the weights of the first N random directions. */
  function bins(N) {
    const c = new Array(BINS).fill(0);
    for (let i = 0; i < N; i++) c[Math.min(BINS - 1, Math.floor(run.w[i] * BINS))]++;
    return c;
  }
  /** Everything the stage and the readouts show at rail time t. */
  function now(t) {
    const N = shotsAt(t), al = turnAt(t);
    let a = rotA(al), b = rotB(al);
    if (S.mode === 'random') { a = S.A; b = N > 0 ? run.dirs[N - 1] : S.B; }
    const p = traceW(a, b), k = run.K[N];
    return { N, k, alpha: al, a, b, p, ps: sphereW(a, b), pv: spinorW(a, b), theta: angle(a, b), share: N ? k / N : null };
  }

  /* ---------- layout: sphere and plot side by side, or stacked on a narrow stage ---------- */
  const cv = $('cv'), opts3 = { canvas: cv, radius: 0.34, cx: 0.25, cy: 0.5, yaw: -0.35, pitch: 0.32 };
  let box = null;
  function layout() {
    const W = cv.clientWidth || 1, H = cv.clientHeight || 1, m = Math.min(W, H), thumb = TRV.thumbMode;
    const top = thumb ? 24 : 56, bottom = thumb ? 24 : (W < 520 ? 70 : 48);
    const wide = W >= 1.2 * H;
    let sph, plot;
    if (wide) {
      const sw = W * (thumb ? 0.48 : 0.45);
      sph = { x: 0, y: top, w: sw, h: H - top - bottom };
      plot = { x: sw + 10, y: top + 24, w: W - sw - 10 - (thumb ? 40 : 20), h: H - top - 24 - bottom - 22 };
    } else {
      const sh = (H - top - bottom) * 0.54;
      sph = { x: 0, y: top, w: W, h: sh };
      plot = { x: 12, y: top + sh + 28, w: W - 28, h: H - top - sh - 28 - bottom - 22 };
    }
    const unit = Math.max(30, Math.min(sph.w, sph.h) * (thumb ? 0.42 : wide ? 0.4 : 0.44));
    opts3.radius = unit / m; opts3.cx = (sph.x + sph.w / 2) / W; opts3.cy = (sph.y + sph.h / 2) / H;
    box = { W, H, wide, sph, plot };
    return box;
  }

  /* ---------- stage ---------- */
  let grab = null;
  const stage = kit.stage3($('stage'), Object.assign(opts3, {
    onChange: () => paint(),
    onPick: (ev, st) => {
      const t = clock.t, c = now(t), r = cv.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
      grab = null;
      if (S.mode === 'fixed' && st.near(ev, c.b) < 26) grab = 'B';
      else if (st.near(ev, c.a) < 26) grab = 'A';
      if (grab) return true;
      // the plot half takes the pointer, so that a drag there does not turn the sphere
      const p = box && box.plot;
      return !!p && x >= p.x - 20 && x <= p.x + p.w + 20 && y >= p.y - 30 && y <= p.y + p.h + 30;
    },
    onDrag: (ev, st) => {
      if (!grab) return;
      const q = st.pick(ev), al = turnAt(clock.t), back = v3.rot(q, TURN_AXIS, -al);
      if (grab === 'B') S.B = back; else S.A = back;
      cards.mark(null); rebuild(); paint();
    }
  }));

  function drawSphere(st, c) {
    const a = c.a, b = c.b, ctx = st.ctx;
    st.sphere(1, { lat: [], lon: 0, shade: 0.08 });
    // the random directions so far (random mode)
    if (S.mode === 'random') {
      const N = c.N, step = N > 2500 ? 2 : 1;
      for (let i = 0; i < N - 1; i += step) st.dot(run.dirs[i], 1.15, P.dim, { alpha: 0.75 });
    }
    // the common axis of turning, and the paths of the two tips so far
    if (S.turn && S.mode === 'fixed') {
      st.line(v3.scale(TURN_AXIS, -1.25), v3.scale(TURN_AXIS, 1.25), { color: P.violet, width: 1.6, alpha: 0.85, back: 0.4 });
      if (c.alpha > 1e-3) {
        const pa = [], pb = [], M = 60;
        for (let i = 0; i <= M; i++) { const al = c.alpha * i / M; pa.push(rotA(al)); pb.push(rotB(al)); }
        st.path(pa, { color: P.cyan, width: 1, alpha: 0.55, dash: [3, 4] });
        st.path(pb, { color: P.amber, width: 1, alpha: 0.55, dash: [3, 4] });
      }
    }
    // A's diameter: from the −1 end to the foot of B (cyan, length 2p), and on to the +1 end (grey)
    const foot = v3.scale(a, v3.dot(a, b)), minus = v3.scale(a, -1);
    st.line(foot, a, { color: P.dim, width: 2.2, alpha: 0.9, back: 0.5 });
    if (c.p > 1e-6) {
      ctx.save(); ctx.shadowColor = P.cyan; ctx.shadowBlur = 8;
      st.line(minus, foot, { color: P.cyan, width: 4.5, back: 0.6 });
      ctx.restore();
    }
    // B's perpendicular onto the diameter
    if (v3.len(v3.sub(b, foot)) > 1e-3) st.line(b, foot, { color: P.faint, width: 1.2, dash: [3, 4], back: 0.6 });
    // the angle between the arrows
    if (c.theta > 2 * DEG && c.theta < 178 * DEG) st.arc(a, b, { color: P.ink, width: 1.1, alpha: 0.7 }, 0.28);
    // the two ends: +1 (pass) and −1 (fail)
    st.dot(a, 5.5, P.cyan, { glow: 10 });
    st.dot(minus, 5.5, P.dim, {});
    st.dot(foot, 3.5, P.cyan, {});
    // the arrows
    st.arrow([0, 0, 0], a, { color: P.cyan, width: 2.6, headSize: 11 });
    st.arrow([0, 0, 0], b, { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false });
    st.dot(b, 4.5, P.amber, { glow: 12, fade: false });
    // labels
    const away = (v, k) => { const q = st.p(v), dx = q[0] - st.cx, dy = q[1] - st.cy, n = Math.hypot(dx, dy) || 1; return { dx: k * dx / n, dy: k * dy / n }; };
    const bothEnds = c.N > 0 && S.mode === 'fixed';
    // keep a label inside the sphere's part of the stage: push it out along the radius, then clamp it
    const place = (key, v, html, cls, k, half) => {
      const q = st.p(v), o = away(v, k), sb = box.sph, x = q[0] + o.dx, y = q[1] + o.dy;
      const cx = Math.max(sb.x + half + 6, Math.min(sb.x + sb.w - half - 6, x)), cy = Math.max(sb.y + 10, Math.min(sb.y + sb.h - 10, y));
      st.tag(key, [cx, cy], html, cls, { screen: true });
    };
    const en = TRV.lang() === 'en';
    const ta = bothEnds ? `A · +1 ${L('过', 'pass')} ×${c.k}` : `A · +1 ${L('过', 'pass')}`;
    const tm = bothEnds ? `−1 ${L('不过', 'fail')} ×${c.N - c.k}` : `−1 ${L('不过', 'fail')}`;
    place('a', a, `<span class="c-cy">${ta}</span>`, 'num', 30 + ta.length * (en ? 3.2 : 3.6), ta.length * (en ? 3.4 : 4.4));
    place('m', minus, tm, 'num', 24 + tm.length * (en ? 3.2 : 3.6), tm.length * (en ? 3.4 : 4.4));
    place('b', b, '<span class="c-am">B</span>', 'num', 18, 8);
    if (c.theta > 12 * DEG && c.theta < 170 * DEG) {
      // the angle label sits just outside the small arc, on the bisector
      const mid = v3.scale(v3.unit(v3.add(a, b)), 0.28), q = st.p(mid), o = away(mid, 26);
      st.tag('th', [q[0] + o.dx, q[1] + o.dy], `θ ${fix(c.theta / DEG, 0)}°`, 'num', { screen: true });
    }
  }

  function drawPlot(c) {
    const pb = box.plot, W = box.W, H = box.H, ctx = cv.getContext('2d'), th = TRV.thumbMode ? 2 : 1;
    const pad = [pb.x + 34, W - pb.x - pb.w, pb.y, H - pb.y - pb.h];
    if (S.mode === 'random') {
      const g = kit.plot(cv, { clear: false, x: [0, 1], y: [0, 2.2], pad });
      g.axes({ yTicks: [0, 1, 2], xTicks: [0, 0.25, 0.5, 0.75, 1], xFmt: (v) => fix(v, 2), xLabel: TRV.thumbMode ? '' : L('权重 p', 'weight p') });
      const cnt = bins(c.N);
      for (let j = 0; j < BINS; j++) {
        const d = c.N ? cnt[j] / (c.N / BINS) : 0;
        g.rect(j / BINS + 0.006, 0, (j + 1) / BINS - 0.006, Math.min(2.2, d), P.cyan, { alpha: 0.55 });
      }
      g.hline(1, P.cyan, { dash: [6, 4], width: 1.6 * th, alpha: 0.95 });
      if (c.N) g.vline(c.p, P.amber, { width: 1.6 * th, alpha: 0.9 });
      if (!TRV.thumbMode) {
        stage.tag('pl', [g.X(1) - 4, g.Y(1.32)], `<span class="c-cy">${L('均匀：每段 1/10 ↓', 'uniform: 1/10 per bin ↓')}</span>`, 'num', { screen: true, dx: -70 });
        stage.tag('pk', [g.X(0) + 6, g.pt - 12], L('密度（每段的份额 × 10）', 'density (share per bin × 10)'), 'num', { screen: true, dx: 80 });
      }
      return;
    }
    const n = S.nmax, g = kit.plot(cv, { clear: false, x: [1, n], y: [0, 1], pad, logX: true });
    const xt = [1, 10, 100, 1000, n].filter((v, i, arr) => v <= n && arr.indexOf(v) === i);
    g.axes({ yTicks: [0, 0.5, 1], xTicks: xt, xLabel: TRV.thumbMode ? '' : L('快门次数 N（对数刻度）', 'shots N (log scale)') });
    // the band p ± 2√(p(1 − p)/N), and the weight
    const p = c.p, up = [], dn = [];
    for (let i = 0; i <= 120; i++) { const x = Math.exp(Math.log(n) * i / 120), s = 2 * Math.sqrt(Math.max(0, p * (1 - p)) / x); up.push([x, Math.min(1, p + s)]); dn.push([x, Math.max(0, p - s)]); }
    g.poly(up.concat(dn.reverse()), P.cyan, { alpha: 0.09 });
    g.hline(p, P.cyan, { dash: [7, 4], width: 1.8 * th, alpha: 0.95 });
    // the counted share k/N, shot by shot
    if (c.N) {
      const pts = [], K = run.K, N = c.N, step = (m) => (m > 300 ? Math.ceil(m / 300) : 1);
      for (let m = 1; m <= N; m += step(m)) pts.push([m, K[m] / m]);
      pts.push([N, K[N] / N]);
      g.line(pts, P.ink, { width: 1.5 * th, alpha: 0.85 });
      g.dot(N, K[N] / N, P.amber, 4.5 * th, { glow: 10 });
    }
    // the row of the latest shots, above the plot: filled cyan = +1 pass, open grey = −1 fail
    const row = Math.min(ROW, c.N), size = Math.max(5, Math.min(11, (pb.w - 34) / ROW - 2)), gap = size + 2, y0 = pb.y - size - 8;
    for (let j = 0; j < row; j++) {
      const i = c.N - row + j, x = pb.x + 34 + j * gap;
      ctx.globalAlpha = 1;
      if (run.pass[i]) { ctx.fillStyle = P.cyan; ctx.fillRect(x, y0, size, size); } else { ctx.strokeStyle = P.dim; ctx.lineWidth = 1.2; ctx.strokeRect(x + 0.5, y0 + 0.5, size - 1, size - 1); }
      if (i === c.N - 1) { ctx.strokeStyle = P.amber; ctx.lineWidth = 1.6; ctx.strokeRect(x - 1.5, y0 - 1.5, size + 3, size + 3); }
    }
    if (!TRV.thumbMode) {
      // the weight is named at the left end of its line, the share next to the current point
      stage.tag('pl', [g.X(1), g.Y(p)], `<span class="c-cy">${L('权重', 'weight')} p = ${fix(p, 3)}</span>`, 'num', { screen: true, dx: TRV.lang() === 'en' ? 62 : 58, dy: p > 0.82 ? 13 : -12 });
      if (c.N) {
        const sh = K_share(c), yy = g.Y(sh), right = g.X(c.N) > g.X(1) + 0.55 * g.iw;
        const dy = Math.abs(yy - g.Y(p)) > 18 ? 0 : (sh >= p ? -15 : 15);
        stage.tag('sh', [g.X(c.N), yy], `<span class="c-am">k/N = ${fix(sh, 3)}</span>`, 'num', { screen: true, dx: right ? -50 : 50, dy: right && dy === 0 ? (sh >= p ? -15 : 15) : dy });
      }
    }
  }
  const K_share = (c) => run.K[c.N] / c.N;

  function drawStage() {
    layout();
    const st = stage; st.begin();
    const c = now(clock.t);
    drawSphere(st, c);
    drawPlot(c);
    st.end();
    $('stage').classList.toggle('turning', S.turn && S.mode === 'fixed');
    $('stage').classList.toggle('random', S.mode === 'random');
    // HUD
    if (S.mode === 'random') {
      $('hudBig').textContent = L(`随机方向 · N = ${c.N}`, `Random directions · N = ${c.N}`);
      $('hudSub').innerHTML = c.N ? L(`这一次的 B 离 A <b>${fix(c.theta / DEG, 0)}°</b>，权重 <span class="c-am">${fix(c.p, 3)}</span>；十段直方图越数越平`, `this B is <b>${fix(c.theta / DEG, 0)}°</b> from A, weight <span class="c-am">${fix(c.p, 3)}</span>; the ten bins flatten as they fill`)
        : L('B 每次在球面上随机取一个方向', 'B takes a random direction on the sphere for every shot');
    } else {
      $('hudBig').textContent = L(`快门计数 · θ = ${fix(c.theta / DEG, 0)}°`, `Shutter counts · θ = ${fix(c.theta / DEG, 0)}°`);
      const w = `<span class="c-cy">${L('权重', 'weight')} p = ${fix(c.p, 3)}</span>`;
      $('hudSub').innerHTML = c.N ? `${w} · ${L(`${c.N} 次里过了 ${c.k} 次`, `${c.k} ${c.k === 1 ? 'pass' : 'passes'} in ${c.N} ${c.N === 1 ? 'shot' : 'shots'}`)} · <span class="c-am">k/N = ${fix(c.share, 3)}</span>`
        : `${w} · ${L('还没有按快门', 'no shots yet')}`;
    }
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const c = now(clock.t), rnd = S.mode === 'random';
    const set = (id, zh, en) => { $(id).textContent = L(zh, en); };
    if (rnd) {
      const w = run.w, N = c.N; let mean = 0, v = 0;
      for (let i = 0; i < N; i++) mean += w[i]; mean = N ? mean / N : 0;
      for (let i = 0; i < N; i++) v += (w[i] - mean) ** 2; v = N > 1 ? v / N : 0;
      const cnt = bins(N), dens = cnt.map((x) => (N ? x / (N / BINS) : 0));
      set('dtKey', '权重的样本均值 → 1/2', 'sample mean of the weight → 1/2');
      $('roKey').innerHTML = N ? `<span class="c-am">${fix(mean, 3)}</span> → 0.500` : '—';
      $('roKeySub').textContent = N ? L(`方差 ${fix(v, 4)}，均匀分布是 1/12 ≈ 0.0833`, `variance ${fix(v, 4)}; uniform gives 1/12 ≈ 0.0833`) : '';
      set('dtAngle', '这一次 B 与 A 的夹角 θ', 'angle θ between this B and A');
      set('dtSphere', '权重 (1 + cos θ)/2 · 球面', 'weight (1 + cos θ)/2 · sphere');
      set('dtSpinor', '|⟨φ|ψ⟩|² · 旋量', '|⟨φ|ψ⟩|² · spinor');
      set('dtTrace', 'Tr(ρ_A P_B) · 矩阵', 'Tr(ρ_A P_B) · matrix');
      set('dtCount', '随机方向的个数 N', 'random directions N');
      set('dtDev', '十段密度：最低 / 最高', 'ten bins, density: lowest / highest');
      $('roAngle').textContent = N ? `${fix(c.theta / DEG, 1)}°` : '—';
      $('roSphere').textContent = N ? fix(c.ps, 4) : '—'; $('roSpinor').textContent = N ? fix(c.pv, 4) : '—'; $('roTrace').textContent = N ? fix(c.p, 4) : '—';
      $('roCount').textContent = String(N);
      $('roDev').textContent = N ? `${fix(Math.min(...dens), 2)} / ${fix(Math.max(...dens), 2)}` : '—';
      $('roNote').textContent = L('每段的份额越数越接近 1/10：随便指一个方向，权重取 0 到 1 之间每个值的机会都一样。', 'Each bin\'s share comes closer to 1/10: point anywhere, and every weight between 0 and 1 is equally likely.');
    } else {
      const sd = c.N ? Math.sqrt(c.p * (1 - c.p) / c.N) : null;
      set('dtKey', '数出来的比例 k/N → 权重 p', 'counted share k/N → weight p');
      $('roKey').innerHTML = c.N ? `<span class="c-am">${fix(c.share, 3)}</span> → <span class="c-cy">${fix(c.p, 3)}</span>` : `— → <span class="c-cy">${fix(c.p, 3)}</span>`;
      $('roKeySub').textContent = L(`“过”与“不过”的权重：${fix(c.p, 3)} + ${fix(1 - c.p, 3)} = 1`, `weights of pass and fail: ${fix(c.p, 3)} + ${fix(1 - c.p, 3)} = 1`);
      set('dtAngle', 'A 与 B 的夹角 θ', 'angle θ between A and B');
      set('dtSphere', '权重 (1 + cos θ)/2 · 球面', 'weight (1 + cos θ)/2 · sphere');
      set('dtSpinor', '|⟨φ_B|ψ_A⟩|² · 旋量', '|⟨φ_B|ψ_A⟩|² · spinor');
      set('dtTrace', 'Tr(ρ_A P_B) · 矩阵', 'Tr(ρ_A P_B) · matrix');
      set('dtCount', '过 / 不过（次）', 'pass / fail (shots)');
      set('dtDev', '比例 − 权重（参考尺度 2σ）', 'share − weight (scale 2σ)');
      $('roAngle').textContent = `${fix(c.theta / DEG, 1)}°`;
      $('roSphere').textContent = fix(c.ps, 4); $('roSpinor').textContent = fix(c.pv, 4); $('roTrace').textContent = fix(c.p, 4);
      $('roCount').textContent = `${c.k} / ${c.N - c.k}`;
      $('roDev').innerHTML = c.N ? `${kit.sgn(c.share - c.p, 3)} <small>(2σ = ${fix(2 * sd, 3)})</small>` : '—';
      $('roNote').textContent = c.p > 1 - 1e-9 ? L('共线：每一次都过，比例从第一次起就是 1。', 'Collinear: every shot passes, and the share is 1 from the first shot on.')
        : c.p < 1e-9 ? L('对跖：一次也不过，比例从第一次起就是 0。', 'Antipodal: not a single pass; the share is 0 from the first shot on.')
          : S.turn ? L(`两支箭头已一起转过 ${fix(c.alpha / DEG, 0)}°，夹角还是 ${fix(c.theta / DEG, 0)}°，每一次快门的权重都是 ${fix(c.p, 3)}。`, `The pair has turned by ${fix(c.alpha / DEG, 0)}° together; the angle is still ${fix(c.theta / DEG, 0)}° and every shot has weight ${fix(c.p, 3)}.`)
            : L('单独一次是过还是不过说不准；数得越多，比例离青色虚线越近。', 'A single shot cannot be foretold; the more shots, the closer the share to the dashed cyan line.');
    }
    $('pillAngle').querySelector('strong').textContent = `${fix(c.theta / DEG, 0)}°`;
    $('pillWeight').querySelector('strong').textContent = fix(c.p, 3);
    $('pillShots').querySelector('strong').textContent = String(c.N);
  }

  const paint = kit.painter(() => { drawStage(); drawText(); }, [$('stage')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: tmaxOf(S.nmax), rate: 1, step: 0.25,
    format: (t) => { const N = shotsAt(t); return L(`第 ${N} 次快门 <small>/ 共 ${S.nmax} 次</small>`, `shot ${N} <small>/ ${S.nmax} in all</small>`); },
    onChange: () => paint()
  });
  function setRun(n) { S.nmax = n; countChips.set(String(n), true); rebuild(); clock.setMax(tmaxOf(n), true); }
  const modeChips = kit.chips($('modeChips'), 'mode', (v) => { cards.mark(null); S.mode = v; rebuild(); clock.pause(); clock.set(0); });
  const turnChips = kit.chips($('turnChips'), 'turn', (v) => { cards.mark(null); S.turn = v === 'on'; rebuild(); clock.pause(); clock.set(0); });
  const countChips = kit.chips($('countChips'), 'count', (v) => { cards.mark(null); setRun(parseInt(v, 10)); clock.pause(); clock.set(0); });
  function reseed() { cards.mark(null); S.seed++; rebuild(); paint(); }
  $('reseed').addEventListener('click', reseed);
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: reseed });

  /* ---------- experiment cards ---------- */
  const NORTH = [0, 0, 1];
  const PRESETS = {
    clicks: { A: NORTH, B: v3.sph(70 * DEG, 30 * DEG), mode: 'fixed', turn: false, n: 24, play: true },
    sixty: { A: v3.sph(60 * DEG, 0), B: v3.sph(120 * DEG, 0), mode: 'fixed', turn: false, n: 4000, play: true },
    right: { A: NORTH, B: v3.sph(90 * DEG, 40 * DEG), mode: 'fixed', turn: false, n: 4000, play: true },
    same: { A: NORTH, B: NORTH, mode: 'fixed', turn: false, n: 400, play: true },
    opposite: { A: NORTH, B: [0, 0, -1], mode: 'fixed', turn: false, n: 400, play: true },
    turn: { A: v3.sph(60 * DEG, 0), B: v3.sph(120 * DEG, 0), mode: 'fixed', turn: true, n: 4000, play: true },
    random: { A: NORTH, B: v3.sph(60 * DEG, 0), mode: 'random', turn: false, n: 4000, play: true }
  };
  const NOTES = {
    clicks: ['琥珀色的 B 离青色的 A 70°，可以指向任何方向；快门每次只报一端：A 这一端 +1 “过”，对面一端 −1 “不过”。右上一排方块是每一次的读数，实心青色是过，空心灰色是不过；哪一次过，事先说不准。', 'The amber B is 70° from the cyan A and could point anywhere; each shot reports only one end: +1 “pass” at A, −1 “fail” at the far end. The row of squares at the top right is shot by shot, solid cyan for a pass and hollow grey for a fail; which shot passes cannot be foretold.'],
    sixty: ['A 离北极 60°，B 离北极 120°，两者之间只有一个角 θ = 60°。青色虚线是权重 3/4；细曲线是数出来的比例，开头乱跳，按到四千次已贴在虚线旁。', 'A is 60° from the north pole and B 120°; between them there is just one angle, θ = 60°. The dashed cyan line is the weight 3/4; the thin curve is the counted share, jumpy at first and hugging the line by four thousand shots.'],
    right: ['B 与 A 垂直，权重 1/2：过与不过一样多。浅色带在这里最宽，细曲线在 1/2 上下摆得最厉害，但还是一路收窄。', 'B is perpendicular to A, weight 1/2: as many passes as fails. The pale band is widest here and the thin curve wobbles most around 1/2, yet it still narrows all the way.'],
    same: ['B 与 A 重合，青色的一段占满整条直径，权重 1：每一次都过，方块全是实心，曲线从第一次起就贴在 1 上。', 'B coincides with A and the cyan stretch fills the whole diameter, weight 1: every shot passes, every square is solid, and the curve sits on 1 from the first shot.'],
    opposite: ['B 在 A 的对面，青色的一段缩成一点，权重 0：一次也不过，方块全是空心，曲线从第一次起就贴在 0 上。', 'B is opposite A and the cyan stretch shrinks to a point, weight 0: not a single pass, every square is hollow, and the curve sits on 0 from the first shot.'],
    turn: ['与 60° 那张卡同一对箭头、同一串随机数，只是每按一次快门之前，两支箭头绕紫色的轴一起转一点。虚线是两支箭尖走过的路；夹角一直是 60°，权重一直是 3/4，数出来的曲线与不转时一模一样。', 'The same pair and the same random numbers as the 60° card, except that before each shot both arrows turn a little about the violet axis. The dashed paths are where the tips have been; the angle stays 60°, the weight stays 3/4, and the counted curve is exactly the one without turning.'],
    random: ['每按一次快门，B 换一个球面上均匀随机的方向，灰点是已经取过的方向。右边把它们的权重分成十段计数：开头高低不齐，越数越平，每段都向 1/10 的青色虚线靠拢。', 'For each shot B takes a fresh uniformly random direction on the sphere; the grey dots are the directions so far. On the right their weights are counted in ten bins: ragged at first, flatter as they fill, each bin closing in on the dashed cyan line at 1/10.']
  };
  let booting = true, moving = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (moving) { moving.cancel(); moving = null; }
    const fromA = now(clock.t).a, fromB = S.mode === 'fixed' ? now(clock.t).b : S.B;
    const land = () => {
      moving = null;
      S.A = p.A.slice(); S.B = p.B.slice(); S.mode = p.mode; S.turn = p.turn; S.seed = 1;
      modeChips.set(p.mode, true); turnChips.set(p.turn ? 'on' : 'off', true);
      setRun(p.n); clock.pause(); clock.set(0);
      // a still (cover, cited figure shot) and the opening view of the full page show the whole run;
      // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
      if (TRV.still || (booting && !TRV.embed)) clock.set(clock.max); else if (p.play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
    };
    if (booting || TRV.still) { land(); return; }
    // carry the arrows to the card's start, so the eye can follow what changed
    clock.pause(); S.mode = 'fixed'; S.turn = false; S.seed = 1; clock.set(0, true);
    moving = kit.tween(420, (e) => {
      S.A = v3.dot(fromA, p.A) > 1 - 1e-12 ? p.A.slice() : v3.slerp(fromA, p.A, e);
      S.B = v3.dot(fromB, p.B) > 1 - 1e-12 ? p.B.slice() : v3.slerp(fromB, p.B, e);
      rebuild(); paint();
    }, land);
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动 B 或 A、换一串随机数、换成随机方向。随时可以再选一张卡。', 'Free play: drag B or A, draw new random numbers, switch to random directions. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.SHUTTER_DEBUG = {
    get state() {
      const c = now(clock.t);
      return { preset: cards.current, mode: S.mode, turn: S.turn, seed: S.seed, nmax: S.nmax, t: clock.t, tmax: clock.max, playing: clock.playing,
        A: S.A.slice(), B: S.B.slice(), a: c.a.slice(), b: c.b.slice(), alpha: c.alpha, theta: c.theta, N: c.N, k: c.k, share: c.share,
        p: c.p, pSphere: c.ps, pSpinor: c.pv };
    },
    /** The run: uniform numbers, per-shot weights, pass flags and, in random mode, the directions. */
    run: () => ({ u: Array.from(run.u), w: Array.from(run.w), pass: Array.from(run.pass), dirs: run.dirs ? run.dirs.map((d) => d.slice()) : null }),
    /** The pair as it stood at shot n (1-based) in a turning run. */
    pairAt: (n) => { const al = turnOfShot(n); return { a: rotA(al), b: rotB(al), alpha: al }; },
    bins: () => bins(now(clock.t).N),
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of the tips of B and A. */
    tips: () => { const c = now(clock.t), r = cv.getBoundingClientRect(), qb = stage.p(c.b), qa = stage.p(c.a); return { B: [r.left + qb[0], r.top + qb[1]], A: [r.left + qa[0], r.top + qa[1]] }; }
  };
  window.TRV_THUMB = () => { applyPreset('sixty'); cards.mark('sixty'); clock.set(clock.max); paint.now(); };
  cards.pick(cards.initial('sixty'));
  booting = false;
  paint();
})();
