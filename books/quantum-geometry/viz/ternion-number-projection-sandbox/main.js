(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const fmt = (x) => (!Number.isFinite(x) ? '∞' : (Math.abs(x) < 5e-5 ? 0 : x).toFixed(4));
  const signed = (x) => (x >= 0 ? '+' : '') + fmt(x);
  let star = 0.75;
  for (let i = 0; i < 5; i++) star += (cs(star) - star) / (1 + sn(star));
  const twoStar = (2 * star) / deg;
  const pairs = [
    [1, 7],
    [3, 5],
    [12, 35],
    [5, 13]
  ];
  function arithmetic([p, q]) {
    const seen = new Map(),
      digits = [],
      remainders = [];
    let r = p;
    while (r && !seen.has(r)) {
      seen.set(r, digits.length);
      remainders.push(r);
      digits.push(Math.floor((10 * r) / q));
      r = (10 * r) % q;
    }
    remainders.push(r);
    const start = r ? seen.get(r) : digits.length,
      pre = digits.slice(0, start).join(''),
      period = digits.slice(start).join('');
    const factors = [];
    let a = p,
      b = q,
      product = p / q;
    for (let prime = 2; prime <= Math.max(a, b); prime++) {
      let v = 0;
      while (a % prime === 0) {
        a /= prime;
        v++;
      }
      while (b % prime === 0) {
        b /= prime;
        v--;
      }
      if (v) {
        const norm = prime ** -v;
        factors.push({ prime, v, norm });
        product *= norm;
      }
    }
    return { p, q, pre, period, remainders, factors, product };
  }
  const rats = pairs.map(arithmetic);
  const state = { thetaDeg: twoStar, tiltDeg: 35, pqIndex: 1, cam: 'panorama', lens: 0 };
  const cams = { panorama: [-0.12, 0.24, 1], deadlock: [0.25, 0.29, 1.02], channels: [-0.34, 0.34, 1] };
  const presets = Object.fromEntries(
    [
      ['flat-3d-zero-divisor-gimbal-deadlock', 179, 45, 0, 'deadlock', true, 0.5],
      ['hamilton-quaternion-w-shadow-tax', twoStar, 35, 1, 'panorama', true, 0.5],
      ['complex-equatorial-hopf-slice', 120, 0, 1, 'channels', true, 0.63],
      ['real-trace-geodesic-projection', 360, 30, 2, 'channels', true, 0.75],
      ['homotopy-pi3-integer-winding', 720, 35, 3, 'panorama', false, 1]
    ].map(([id, thetaDeg, tiltDeg, pqIndex, cam, play, still]) => [id, { thetaDeg, tiltDeg, pqIndex, cam, play, still }])
  );
  const ids = Object.keys(presets);
  function calculate() {
    const h = (state.thetaDeg * deg) / 2,
      a = state.tiltDeg * deg,
      w = cs(h),
      v = Math.abs(sn(h));
    const b = cs(a),
      c = sn(a),
      pole = state.thetaDeg % 360 === 180;
    // A and B lie in the equator; C leaves it at latitude α. AB stays strictly shorter than π.
    const width = (25 + 40 * v) * deg,
      mid = width / 2;
    const triangle = [
      [1, 0, 0],
      [cs(width), sn(width), 0],
      [cs(a) * cs(mid), cs(a) * sn(mid), sn(a)]
    ];
    const [A, B, C] = triangle,
      D = sn(width) * sn(a),
      S = 1 + dot(A, B) + dot(B, C) + dot(C, A);
    return {
      ...state,
      w,
      v,
      quaternion: [w, sn(h) * b, sn(h) * c, 0],
      tax: 1 - w,
      unit: w * w + v * v,
      rod: pole ? Infinity : v / Math.abs(w),
      pole,
      triangle,
      omega: 2 * Math.atan2(D, S),
      trace: 1 + 2 * cs(2 * h),
      n: Math.floor(state.thetaDeg / 360),
      matrix: [
        [w, -b, -c],
        [b, w, 0],
        [c, 0, w]
      ],
      lambda: w,
      vNull: [0, -c, b],
      rat: rats[state.pqIndex]
    };
  }
  const stage = $('stage'),
    handle = $('ternionHandle');
  const opts = {
    canvas: $('cv'),
    yaw: cams.panorama[0],
    pitch: cams.panorama[1],
    radius: 0.2,
    wheel: false,
    onChange: () => paint()
  };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const anchors = {
    flat: [-1.36, 0, 0.68],
    shadow: [1.37, 0.1, 0.65],
    slice: [-1.28, -0.04, -0.76],
    trace: [1.19, -0.03, -0.72],
    winding: [0, -0.2, -1.27]
  };
  const tube = (key, points, color, r, extra = {}) => sc.tube(key, points, { color, r, glow: 0.15, ...extra });
  const circle = (center, r, fn) => sample(72, (t) => add(center, scale(fn(t * TAU), r)));
  const xy = (t) => [cs(t), sn(t), 0];

  // Three lobes around the polar direction. The leading edge of each swept face
  // meets the next lobe at the equator, so all three share one opaque body.
  function coreP(u, v) {
    const lat = PI * u,
      lon = TAU * v,
      ring = sn(lat),
      depth = cs(lat);
    const radius = 0.875 * (1 + 0.12 * ring ** 3 * cs(3 * lon - 1.4 * depth));
    const heading = lon + 0.24 * sn((state.thetaDeg * deg) / 2);
    return [radius * ring * cs(heading), -0.84 * radius * depth, radius * ring * sn(heading)];
  }
  // The orthographic drawing of the signed (cos h, sin h) great circle.
  const onArc = (d) => {
    const h = (d * deg) / 2;
    return [1.01 * cs(h), -0.24 * sn(h), 0.98 * sn(h)];
  };
  const offset = (k, x, y, z) => add(anchors[k], [x, y, z]);
  const box = (name, p, half, token) => {
    const corners = Array.from({ length: 8 }, (_, i) =>
      add(
        p,
        half.map((r, j) => (i & (1 << j) ? r : -r))
      )
    );
    sc.poly(
      name,
      {
        vertices: corners,
        faces: [
          [0, 4, 6, 2],
          [1, 3, 7, 5],
          [0, 1, 5, 4],
          [2, 6, 7, 3],
          [0, 2, 3, 1],
          [4, 5, 7, 6]
        ]
      },
      { color: token, edges: token, alpha: 0.7 }
    );
  };
  function rotor(m) {
    sc.surface('body', coreP, { u: [0, 1], v: [0, 1], nu: 34, nv: 72, color: P.violet });
    for (let blade = 0; blade < 3; blade++) {
      const vane = (u, v) => {
        const lat = 0.045 + 0.85 * u;
        const width = 0.09 * sn(PI * u);
        const lon = blade / 3 + 0.31 * u + (v - 0.5) * width;
        const lift = 1 + 0.125 * sn(PI * u) ** 2 * sn(PI * v);
        return scale(coreP(lat, lon), lift);
      };
      sc.surface('vane' + blade, vane, { nu: 40, nv: 12, color: P.violet, glow: 0.18 });
      tube(
        'vaneEdge' + blade,
        sample(40, (t) => vane(t, 0.12)),
        P.violet,
        0.012
      );
    }
    tube(
      'geodesic',
      sample(100, (t) => onArc(t * 720)),
      P.sigma,
      0.015
    );
    sc.bead(onArc(m.thetaDeg), { color: P.amber, r: 4.2, key: 'cursor' });
    // Opposite marks on the body show the front/back occlusion after orbiting.
    for (const u of [0.09, 0.91]) sc.bead(scale(coreP(u, 0.5), 1.012), { color: P.violet, key: 'seam' + u, r: 4 });
  }
  function stations(m) {
    const flat = anchors.flat,
      shadow = anchors.shadow,
      c = anchors.slice,
      tr = anchors.trace;
    box('flat', flat, [0.32, 0.23, 0.05], P.violet);
    sc.arrow(offset('flat', -0.16, 0, -0.2), offset('flat', -0.16, 0, 0.44), { color: P.magenta, width: 3 });
    const h = 0.12 * Math.min(4, m.rod),
      rodBase = offset('flat', 0.16, 0, 0.052);
    if (h > 1e-6) tube('pillar', [rodBase, add(rodBase, [0, 0, h])], P.magenta, 0.054);
    if (m.pole) tube('pole', circle(add(rodBase, [0, 0, 0.48]), 0.11, xy), P.magenta, 0.016);
    tube('norm', circle(shadow, 0.32 * Math.max(0.0001, m.v), xy), P.cyan, 0.025);
    if (Math.abs(m.w) > 1e-6) tube('scalar', [shadow, add(shadow, [0, 0, 0.42 * m.w])], P.sigma, 0.05);
    if (m.tax > 1e-6)
      tube('sagitta', [offset('shadow', 0.17, 0, 0.42), offset('shadow', 0.17, 0, m.w * 0.42)], P.magenta, 0.022);
    const ph = (m.thetaDeg * deg) / 2;
    const plane = (t) => [cs(t), sn(t) * 0.55, sn(t) * 0.835];
    sc.fan(circle(c, 0.4, plane), { fill: P.cyan, alpha: 0.17 });
    tube('phaseCircle', circle(c, 0.4, plane), P.cyan, 0.015);
    const height = sn(ph) * cs(m.tiltDeg * deg);
    const projection = [m.w, 0.55 * height, 0.835 * height];
    if (hypot(...projection) > 1e-8) sc.arrow(c, add(c, scale(projection, 0.39)), { color: P.cyan, width: 2 });
    if (m.tiltDeg < 18) {
      const strength = 1 - m.tiltDeg / 18;
      const equator = circle([0, 0, 0], 1.08, (t) => [cs(t), sn(t), 0]);
      sc.fan(equator, { fill: P.cyan, alpha: 0.12 * strength });
      sc.line(equator, { color: P.cyan, width: 1.3, alpha: 0.65 * strength });
    }
    const project = ([x, y, z]) => add(c, scale([x, 0.55 * y - 0.835 * z, 0.835 * y + 0.55 * z], 0.39));
    if (m.tiltDeg > 0) {
      // Normalize barycentric coordinates back onto S². The three boundary curves
      // are short great-circle arcs; the patch disappears in the equatorial limit.
      const [A, B, C] = m.triangle;
      sc.surface(
        'excess',
        (u, v) => {
          const inner = add(scale(A, 1 - u), scale(B, u));
          const q = add(scale(inner, 1 - v), scale(C, v));
          return project(scale(q, 1 / hypot(...q)));
        },
        { nu: 12, nv: 9, color: P.violet, alpha: 0.72 }
      );
    }
    for (const [i, val, token] of [
      [0, m.w, P.sigma],
      [1, m.trace, P.cyan]
    ]) {
      const ctr = add(tr, [0, 0, -i * 0.12]);
      tube('ruler' + i, [add(ctr, [-0.35, 0, 0]), add(ctr, [0.35, 0, 0])], P.ink, 0.011);
      for (let tick = -3; tick <= 3; tick++) {
        const mid = add(ctr, [tick * 0.105, 0, 0]);
        sc.line([add(mid, [0, 0, -0.025]), add(mid, [0, 0, 0.025])], { color: P.sigma, width: 1 });
      }
      const x = val * 0.105;
      if (Math.abs(x) > 1e-6) tube('trace' + i, [ctr, add(ctr, [x, 0, 0])], token, 0.031);
      sc.bead(add(ctr, [x, 0, 0]), { color: token, r: 3 });
    }
    const row = anchors.winding;
    tube('windingRail', [add(row, [-0.39, 0, 0]), add(row, [0.39, 0, 0])], P.blue, 0.009);
    for (let k = 0; k < 2; k++) {
      const p = add(row, [-0.39 + k * 0.11, 0, 0]);
      sc.ring(p, { color: P.sigma, normal: [0, -1, 0], r: 4 });
      if (k < m.n) sc.bead(p, { color: P.sigma, r: 3.1 });
    }
    // The tail holds the successive distinct remainders. On a new rational
    // both the decimal row and the set of nontrivial local norms change.
    m.rat.remainders.slice(0, -1).forEach((r, i) => {
      sc.bead(add(row, [-0.08 + i * 0.085, 0, 0]), { color: P.cyan, r: 2 + (1.8 * r) / m.rat.q });
    });
    m.rat.factors.forEach(({ prime }, i) =>
      sc.ring(add(row, [(i - (m.rat.factors.length - 1) / 2) * 0.14, 0, -0.11]), {
        color: P.cyan,
        normal: [0, -1, 0],
        r: 3 + Math.log(prime)
      })
    );
  }
  const labels = { flat: '3D FLAT', shadow: 'ℍ · 4D', slice: 'ℂ · 2D', trace: 'ℝ · 1D', winding: 'ℤ/ℙ · 0D' };
  const hud = (m) => {
    $('hudBig').textContent = state.lens
      ? L('除环与同伦', 'Division algebras & degree')
      : L('极小圆弧体', 'Minimal circular-arc body');
    $('hudSub').textContent = 'Δ𝒯ε ∈ S³  ·  θ = ' + m.thetaDeg.toFixed(2) + '°';
    $('legend').innerHTML =
      '<span><i class="sw sg"></i>w</span><span><i class="sw cy"></i>‖v‖</span><span><i class="sw mg"></i>min(4, |tan(θ/2)|)</span>';
  };
  // Two stations can project to the same column when the camera turns edge-on.
  // Keep each caption near its anchor and reserve the HUD and handle rectangles.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx;
        const top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3))
          continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  function drawStage(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    opts.radius = Math.min((W - 26) / 3.85, (H - 83) / 3.0) / Math.min(W, H);
    opts.cy = 0.49;
    sc.begin();
    rotor(m);
    stations(m);
    for (const name of ['flat', 'shadow', 'slice', 'trace']) {
      const target = anchors[name],
        direction = scale(target, 1 / hypot(...target));
      sc.line([scale(direction, 0.9), add(target, scale(direction, -0.4))], {
        color: name === 'flat' ? P.magenta : P.cyan,
        dash: [2, 5],
        width: 1,
        alpha: 0.43
      });
    }
    // Sweep the geodesic to the selected endpoint.
    const f = clock.t * m.thetaDeg;
    if (f > 0.01)
      tube(
        'traversed',
        sample(60, (t) => scale(onArc(t * f), 1.025)),
        P.cyan,
        0.021
      );
    for (const [k, label] of Object.entries(labels)) {
      const p = offset(k, 0, 0, k === 'winding' ? -0.22 : k === 'shadow' ? -0.54 : k === 'slice' ? -0.42 : -0.32);
      const algebra = { flat: 'Lₓ · λ₀', shadow: 'ℍ · w² + ‖v‖²', slice: 'ℂ · Ω', trace: 'ℝ · ½Tr U', winding: 'ℤ/ℙ · n' };
      sc.tag(k, p, m.lens ? algebra[k] : label, 'raw backed c-ik');
    }
    sc.end();
    const q = sc.p(onArc(m.thetaDeg));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }
  const curve = sample(360, (t) => {
    const a = t * TAU;
    return [720 * t, cs(a), Math.abs(sn(a)), Math.min(4, Math.abs(Math.tan(a)))];
  });
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientHeight) return;
    $('plotTitle').textContent = L('半角坐标随转角的变化', 'Half-angle coordinates');
    $('plotMeta').textContent = '0° – 720°';
    const g = kit.plot(cv, { x: [0, 720], y: [-1.1, 4.1], pad: [32, 14, 12, 22] });
    g.axes({ xTicks: [0, 180, 360, 540, 720], yTicks: [-1, 0, 1, 2, 3, 4] });
    [P.cyan, P.violet, P.magenta].forEach((color, i) =>
      g.line(
        curve.map((row) => [row[0], row[i + 1]]),
        color,
        { width: 1.8 }
      )
    );
    g.vline(m.thetaDeg, P.amber);
    g.dot(m.thetaDeg, m.w, P.amber, 3.5);
    g.legend([
      [P.cyan, 'w'],
      [P.violet, '‖v‖'],
      [P.magenta, 'min(4, |tan|)']
    ]);
  }
  function readings(m) {
    const txt = (id, x) => {
      $(id).textContent = x;
    };
    txt('roTheta', m.thetaDeg.toFixed(8) + '°');
    txt('roRod', fmt(m.rod));
    txt('roMatrix', 'x = w + i cos α + j sin α\n' + m.matrix.map((r) => '[ ' + r.map(fmt).join('  ') + ' ]').join('\n'));
    const residual = m.matrix.map((row, i) => dot(row, m.vNull) - m.lambda * m.vNull[i]);
    txt(
      'roWitness',
      'λ₀ = ' + fmt(m.lambda) + ' · v = (' + m.vNull.map(fmt).join(', ') + ') · ‖(Lₓ − λ₀I)v‖ = ' + fmt(hypot(...residual))
    );
    txt(
      'roShadow',
      'w = ' + fmt(m.w) + ' · ‖v‖ = ' + fmt(m.v) + ' · w² + ‖v‖² = ' + fmt(m.unit) + ' · 1 − w = ' + fmt(m.tax)
    );
    txt(
      'roSlice',
      'α = ' +
        m.tiltDeg +
        '° · Ω = ' +
        fmt(m.omega) +
        ' sr · z = ' +
        fmt(m.w) +
        (m.quaternion[1] < 0 ? ' − ' : ' + ') +
        fmt(Math.abs(m.quaternion[1])) +
        'i'
    );
    txt('roTrace', '½Tr U = ' + signed(m.w) + ' · Tr R = ' + signed(m.trace));
    txt('roTurns', 'n = ' + m.n + ' · ' + L('双圈数', '720° cycles') + ' = ' + Math.floor(m.thetaDeg / 720));
    const r = m.rat;
    txt(
      'roDecimal',
      r.p + '/' + r.q + ' = 0.' + r.pre + (r.period ? '(' + r.period + ')' : '') + ' · r: ' + r.remainders.join(' → ')
    );
    txt(
      'roProduct',
      r.p + '/' + r.q + ' × ' + r.factors.map((x) => x.prime + '^(' + -x.v + ')').join(' × ') + ' = ' + fmt(r.product)
    );
    const digits = r.remainders.length - 1,
      pow = 10 ** digits;
    const prefix = Math.floor((pow * r.p) / r.q);
    $('roDecimal').textContent +=
      '\n' + r.q + ' × ' + prefix + ' + ' + r.remainders.at(-1) + ' = 10^' + digits + ' × ' + r.p;
    txt(
      'roNote',
      m.pole
        ? L('柱顶标记发散，旋子依然有界。', 'The capped pillar marks a divergent limit. The rotor remains bounded.')
        : L(
            '圆弧扫过的青色段给出从单位元到当前点的路程。',
            'The cyan sweep traces the path from the identity to the selected endpoint.'
          )
    );
    $('scenePill').querySelector('strong').textContent = state.lens ? 'ℝ · ℂ · ℍ' : 'Δ𝒯ε';
    $('keyPill').querySelector('strong').textContent = fmt(m.w);
    txt('hint', L('沿弧拖动 · 空格播放', 'Drag along arc · Space to play'));
    txt('formula', 'U = w1 + v · (i,j,k)');
  }
  const paint = kit.painter(() => {
    const m = calculate();
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m);
    drawPlot(m);
  }, [stage, $('plot')]);
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 0.12,
    step: 0.1,
    max: 1,
    format: (t) => 'τ ' + t.toFixed(2),
    onChange: (t, c) => {
      $('playBtn').textContent = c.playing ? '❚❚' : '▷';
      $('playBtn').setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  const leave = () => {
    cards.mark(null);
    clock.pause();
  };
  function rotate(v) {
    state.thetaDeg = Math.round(v * 100) === 8469 ? twoStar : kit.clamp(Math.round(v * 100) / 100, 0, 720);
    tf.set(state.thetaDeg);
    paint();
  }
  const tf = kit.field($('rotTheta'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      leave();
      rotate(v);
    }
  });
  const af = kit.field($('sliceTilt'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      state.tiltDeg = v;
      paint();
    }
  });
  const rf = kit.field($('ratPair'), {
    fmt: (v) => pairs[v].join('/'),
    onInput: (v) => {
      leave();
      state.pqIndex = v;
      paint();
    }
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = v;
    sc.view(cams[v], 350);
    paint();
  });
  $('lensToggleBtn').onclick = () => {
    state.lens = 1 - state.lens;
    $('lensToggleBtn').setAttribute('aria-pressed', String(!!state.lens));
    paint();
  };
  $('playBtn').onclick = () => clock.toggle();
  for (const id of ['rew', 'rewindBtn'])
    $(id).onclick = () => {
      clock.pause();
      clock.set(0);
    };
  const notes = Object.fromEntries(
    ids.map((id, i) => [
      id,
      [
        [
          '179° 时读数为 114.5887，品红柱已达上限 4。再转一度，柱顶圆环标出极点。',
          'At 179° the readout is 114.5887 and the magenta pillar is capped at 4. At 180° a ring marks the pole.'
        ],
        [
          '在两倍不动点处，银柱高 0.7391，品红矢高为 0.2609。',
          'At twice the fixed point, the silver column reads 0.7391 and the magenta sagitta 0.2609.'
        ],
        ['切面回到赤道，三角形余量压成零。', 'On the equator the triangle flattens to zero excess.'],
        [
          '一整圈后，旋量的半迹变为 −1，空间旋转的迹回到 +3。',
          'One turn takes the half spinor trace to −1 and the spatial trace to +3.'
        ],
        [
          '两圈闭合，比较 5/13 的重复余数与素数赋值。',
          'Two turns close the lift. Compare the repeating remainders of 5/13 with its prime norms.'
        ]
      ][i]
    ])
  );
  let boot = true;
  const cards = kit.cards($('presets'), {
    presets,
    notes,
    noteEl: $('presetNote'),
    tour: $('tour'),
    idle: ['自由探索', 'Free exploration'],
    onPick: (id) => {
      const p = presets[id];
      clock.pause();
      Object.assign(state, { thetaDeg: p.thetaDeg, tiltDeg: p.tiltDeg, pqIndex: p.pqIndex, cam: p.cam });
      tf.set(p.thetaDeg);
      af.set(p.tiltDeg);
      rf.set(p.pqIndex);
      camChips.set(p.cam, true);
      sc.view(cams[p.cam], 0);
      clock.set(TRV.still || boot ? p.still : 0);
      if (p.play && !TRV.still && (!boot || TRV.embed)) clock.play();
      paint();
    }
  });
  const point = (d) => {
    const q = sc.p(onArc(d)),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  };
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    let best = state.thetaDeg,
      gap = Infinity;
    const rect = $('cv').getBoundingClientRect(),
      x = ev.clientX - rect.left,
      y = ev.clientY - rect.top;
    for (let d = 0; d <= 720; d += 0.25) {
      const p = sc.p(onArc(d)),
        dist = hypot(p[0] - x, p[1] - y) + Math.abs(state.thetaDeg - d) * 1e-7;
      if (dist < gap) {
        gap = dist;
        best = d;
      }
    }
    rotate(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    rotate(ev.key === 'Home' ? 0 : ev.key === 'End' ? 720 : state.thetaDeg + (ev.key === 'ArrowLeft' ? -0.25 : 0.25));
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.onLang(paint);
  window.TERNION_DEBUG = {
    get state() {
      return { ...calculate(), t: clock.t, playing: clock.playing, preset: cards.current, camera: { ...sc.cam } };
    },
    dragTarget: point
  };
  window.TRV_THUMB = () => {
    cards.pick(ids[1]);
    clock.pause();
    clock.set(0.75);
    paint.now();
  };
  cards.pick(cards.initial(ids[1]));
  boot = false;
  paint.now();
})();
