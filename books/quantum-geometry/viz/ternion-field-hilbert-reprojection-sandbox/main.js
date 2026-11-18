(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const cardsData = [
    {
      id: 'native-ternion-curl-field',
      N: 1,
      lambda: 0.85,
      chi: 2,
      cam: 'split',
      play: true,
      still: 0.2
    },
    {
      id: 'spin4-chiral-spacetime-bivector',
      N: 2,
      lambda: 0.9,
      chi: 2,
      cam: 'split',
      play: true,
      still: 0.35
    },
    {
      id: 'fano-seven-field-octonion-weave',
      N: 3,
      lambda: 1,
      chi: 4,
      cam: 'ontology',
      play: true,
      still: 0.18
    },
    {
      id: 'sedenion-zero-divisor-bankruptcy',
      N: 4,
      lambda: 1,
      chi: 4,
      cam: 'ledger',
      play: false,
      still: 0.45
    },
    {
      id: 'many-body-3n-to-2n-hilbert-pillars',
      N: 6,
      lambda: 1,
      chi: 2,
      cam: 'split',
      play: true,
      still: 0.45
    }
  ];
  const presets = Object.fromEntries(cardsData.map((p) => [p.id, p]));
  const S = { ...cardsData[4], tau: 0, lens: 0, example: 0, kind: 4 };
  const notes = [
    [
      '三条卷曲轴在下层留下一个标量和三个向量分量。',
      'Three curls project onto one scalar and three vector components.'
    ],
    ['左右手征场投向四根向量柱与六根双矢柱。', 'Two chiral fields illuminate four vector and six bivector slots.'],
    [
      '切换法诺直线与跨线三角形，比较结合子的品红折痕。',
      'Switch between a line and an off-line triangle to expose the magenta associator.'
    ],
    [
      '两条输入都有长度，品红弧相消后十六个槽位都空了。',
      'Two nonzero inputs cancel along the magenta paths. All sixteen slots fall silent.'
    ],
    [
      '六个场投向六十四根基柱。调节 N，观察场链与基阵的增长。',
      'Six fields project onto 64 basis pillars. Vary N to compare the chain and its basis.'
    ]
  ];
  const setText = (id, value) => {
    const el = $(id);
    if (el.textContent !== String(value)) el.textContent = String(value);
  };

  const FANO = [
    [1, 2, 4],
    [2, 3, 5],
    [3, 4, 6],
    [4, 5, 7],
    [5, 6, 1],
    [6, 7, 2],
    [7, 1, 3]
  ];
  const basis = (k, n = 8, sign = 1) => Array.from({ length: n }, (_, i) => (i === k ? sign : 0));
  const table = Array.from({ length: 8 }, (_, i) =>
    Array.from({ length: 8 }, (_, j) => (i === 0 ? j + 1 : j === 0 ? i + 1 : -1))
  );
  for (const line of FANO)
    for (let k = 0; k < 3; k++) {
      const [a, b, c] = [0, 1, 2].map((d) => line[(k + d) % 3]);
      table[a][b] = c + 1;
      table[b][a] = -c - 1;
    }
  function octMul(a, b) {
    const out = Array(8).fill(0);
    for (let i = 0; i < 8; i++)
      for (let j = 0; j < 8; j++) {
        const entry = table[i][j];
        out[Math.abs(entry) - 1] += Math.sign(entry) * a[i] * b[j];
      }
    return out;
  }
  const diff = (a, b) => a.map((x, i) => x - b[i]);
  const sum = (a, b) => a.map((x, i) => x + b[i]);
  const conj = (a) => a.map((x, i) => (i ? -x : x));
  function associator(i, j, k) {
    const [a, b, c] = [i, j, k].map((i) => basis(i));
    return diff(octMul(octMul(a, b), c), octMul(a, octMul(b, c)));
  }
  const pairs = [
    [2, 3, 6, 1],
    [3, 2, 6, -1],
    [4, 3, 5, 1]
  ];
  function zeroTerms(index) {
    const [ub, vc, vd, sign] = pairs[index],
      a = basis(1),
      b = basis(ub),
      c = basis(vc),
      d = basis(vd, 8, sign);
    return [octMul(a, c), octMul(conj(d), b), octMul(d, a), octMul(b, conj(c))];
  }
  function zeroProduct(index) {
    const [ac, db, da, bc] = zeroTerms(index);
    return [...diff(ac, db), ...sum(da, bc)];
  }
  function mpsCount(n, chi) {
    let dim = 0,
      last = 1;
    for (let k = 1; k <= n; k++) {
      const rank = Math.min(chi, 2 ** Math.min(k, n - k));
      dim += 2 * last * rank - (k < n ? rank * rank : 0);
      last = rank;
    }
    return 2 * dim - 2;
  }

  function ledger() {
    const t = S.tau * 2 * Math.PI,
      angle = 0.74 + 0.38 * Math.sin(t);
    const n = [Math.cos(t), Math.sin(t), 0.75].map((x) => x / 1.25);
    const q = [Math.cos(angle / 2), ...n.map((x) => x * Math.sin(angle / 2))];
    let values,
      detail,
      upper = [1, 2, 7, 2, S.N][S.kind];
    if (S.kind === 0) {
      values = q;
      detail = 'w = ' + q[0].toFixed(3) + '   ·   w² + ‖v‖² = 1';
    } else if (S.kind === 1) {
      const R = [Math.cos(0.55), Math.sin(0.55) * Math.cos(t), 0, Math.sin(0.55) * Math.sin(t)];
      const pairs = [
        [0, 1],
        [0, 2],
        [0, 3],
        [2, 3],
        [3, 1],
        [1, 2]
      ];
      // The chiral action sends the scalar paravector 1 to qL · conj(qR).
      const [w, x, y, z] = q,
        [v, a, b, c] = R;
      const paravector = [
        w * v + x * a + y * b + z * c,
        x * v - w * a - y * c + z * b,
        y * v - w * b - z * a + x * c,
        z * v - w * c - x * b + y * a
      ];
      values = [...paravector, ...pairs.map(([i, j]) => q[i] * R[j] - q[j] * R[i])];
      detail = 'x = qᴸ · 1 · q̄ᴿ   ·   F = qᴸ ∧ qᴿ';
    } else if (S.kind === 2) {
      const v = Array.from({ length: 8 }, (_, k) => (k === 0 ? 0.8 : Math.sin(t + k)));
      const norm = Math.hypot(...v);
      values = v.map((x) => x / norm);
      const assoc = associator(1, 2, S.example ? 3 : 4);
      detail =
        (S.example ? '[e₁,e₂,e₃] = ' + String(assoc[6]).replace('-', '−') + 'e₆' : '[e₁,e₂,e₄] = 0') +
        '   ·   ‖[a,b,c]‖ = ' +
        Math.hypot(...assoc);
    } else if (S.kind === 3) {
      values = zeroProduct(S.example);
      detail =
        ['(e₁ + e₁₀)(e₃ + e₁₄)', '(e₁ + e₁₁)(e₂ − e₁₄)', '(e₁ + e₁₂)(e₃ + e₁₃)'][S.example] +
        ' = 0   ·   ‖u‖²‖v‖² = 4';
    } else {
      values = [1];
      for (let j = 0; j < S.N; j++) {
        const a = Math.PI / 4 + 0.16 * Math.sin(t + j * 0.8);
        values = values.flatMap((v) => [v * Math.cos(a), v * Math.sin(a)]);
      }
      detail =
        L('乘积态样本 · 全体纯射线实维数 ', 'Product-state sample · full pure-ray real dimension ') +
        (2 * values.length - 2);
    }
    return {
      kind: S.kind,
      upperCount: upper,
      pillarValues: values,
      detail,
      mpsCount: mpsCount(S.N, S.chi),
      excessCount: 4 ** S.N - 1 - 3 * S.N
    };
  }

  const cameras = { split: [-0.34, 0.34, 1], ontology: [-0.22, 0.8, 0.99], ledger: [0.27, 0.5, 1.03] };
  const config = {
    canvas: $('cv'),
    wheel: false,
    radius: 0.39,
    yaw: cameras.split[0],
    pitch: cameras.split[1],
    onChange: () => paint()
  };
  const sc = kit.solid($('stage'), config);
  const makeMesh = () => ({ vertices: [], faces: [], colors: [] });
  function box(mesh, x, y, z, w, d, h, color, top = color) {
    const offset = mesh.vertices.length;
    for (const dz of [0, h])
      for (const [a, b] of [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1]
      ])
        mesh.vertices.push([x + (a * w) / 2, y + (b * d) / 2, z + dz]);
    for (const f of [
      [0, 3, 2, 1],
      [0, 1, 5, 4],
      [1, 2, 6, 5],
      [2, 3, 7, 6],
      [3, 0, 4, 7],
      [4, 5, 6, 7]
    ]) {
      mesh.faces.push(f.map((i) => i + offset));
      mesh.colors.push(f[0] === 4 ? top : color);
    }
  }
  function publishMesh(key, m, edges = false) {
    sc.poly(key, m, { colors: m.colors, edges });
  }
  const curve = (steps, fn) => Array.from({ length: steps + 1 }, (_, i) => fn(i / steps));
  const tau = 2 * Math.PI,
    lerp = (a, b, u) => a * (1 - u) + b * u;
  const floor = -1;
  const floorMesh = makeMesh();
  box(floorMesh, 0, 0, floor - 0.075, 2.56, 1.65, 0.075, P.lineHot, P.panelEdge);
  function positions(count, kind) {
    if (count === 1) return [[0, 0, 0.65]];
    if (kind === 2) {
      // Vertices 1,2,3; side midpoints 4,5,7; median intersection 6.
      return [
        [-0.97, -0.43],
        [0.97, -0.43],
        [0, 0.86],
        [0, -0.43],
        [0.485, 0.215],
        [0, 0],
        [-0.485, 0.215]
      ].map(([x, y]) => [x, y, 0.73 + 0.16 * y]);
    }
    if (kind === 4)
      return Array.from({ length: count }, (_, i) => {
        const t = i / (count - 1);
        return [lerp(-1.04, 1.04, t), 0.34 * Math.sin(tau * t), 0.76 + 0.1 * Math.cos(tau * t)];
      });
    const radius = count === 2 ? 0.63 : 0.92;
    return Array.from({ length: count }, (_, i) => {
      const t = ((i + 0.15) / count) * tau;
      return [radius * Math.cos(t), 0.48 * Math.sin(t), 0.72 + 0.08 * Math.sin(t)];
    });
  }
  function shell(k, center, r, phase) {
    const [x, y, z] = center;
    function rotate(a, b, c) {
      const p = phase + k * 0.8;
      return [x + r * (a * Math.cos(p) - b * Math.sin(p)), y + r * (a * Math.sin(p) + b * Math.cos(p)), z + r * c];
    }
    // Three quadrant arcs bound a convex spherical octant. Offset their centroid onto the field centre.
    const point = (a, b, c) => rotate(a - 0.33, b - 0.33, c - 0.33);
    const surface = (u, v) => point(Math.sin(u) * Math.cos(v), Math.sin(u) * Math.sin(v), Math.cos(u));
    sc.surface('cap' + k, surface, {
      u: [0, Math.PI / 2],
      v: [0, Math.PI / 2],
      nu: 16,
      nv: 18,
      color: P.violet,
      grid: { every: [4, 5], color: P.ink, alpha: 0.15 }
    });
    for (let ax = 0; ax < 3; ax++) {
      const arc = curve(16, (t) => {
        const coords = [0, 0, 0];
        coords[(ax + 1) % 3] = Math.cos((t * Math.PI) / 2);
        coords[(ax + 2) % 3] = Math.sin((t * Math.PI) / 2);
        return point(...coords);
      });
      sc.poly(
        'wall' + k + ':' + ax,
        { vertices: [point(0, 0, 0), ...arc], faces: [arc.map((_, j) => j + 1).concat(0)] },
        { color: ax === 1 ? P.blue : P.violet, edges: false }
      );
      sc.tube('curl' + k + ':' + ax, arc, { color: ax === 0 ? P.cyan : P.sigma, width: 2.2, glow: 0.36 });
    }
    sc.bead(point(0, 0, 0), { key: 'pivot' + k, color: P.sigma, r: 2.8 });
  }
  const apertureZ = (l) => 0.19 - 0.44 * l;
  const grip = (l) => [1.12 * Math.cos(-0.32), 0.66 * Math.sin(-0.32), apertureZ(l)];
  function draw(m) {
    const w = $('stage').clientWidth,
      h = $('stage').clientHeight;
    const viewHeight = m.kind === 2 || m.kind === 3 ? 3.48 : 3.13;
    config.radius = Math.min(w / (3.35 * Math.min(w, h)), h / (viewHeight * Math.min(w, h)));
    config.cy = 0.5;
    sc.begin();
    publishMesh('base', floorMesh);
    for (let j = 0; j <= 16; j++) {
      const x = lerp(-1.26, 1.26, j / 16),
        y = lerp(-0.8, 0.8, j / 16);
      sc.line(
        [
          [x, -0.81, floor + 0.001],
          [x, 0.81, floor + 0.001]
        ],
        { color: P.sigma, alpha: 0.26 }
      );
      sc.line(
        [
          [-1.26, y, floor + 0.001],
          [1.26, y, floor + 0.001]
        ],
        { color: P.cyan, alpha: 0.2 }
      );
    }
    const bodies = positions(m.upperCount, m.kind),
      z = apertureZ(S.lambda);
    const chart = m.pillarValues,
      cols = m.kind === 1 ? 5 : 2 ** Math.ceil(Math.log2(chart.length) / 2),
      rows = Math.ceil(chart.length / cols);
    const mesh = makeMesh(),
      tiles = makeMesh(),
      stride = 2.28 / cols,
      depth = 1.38 / rows,
      max = Math.max(...chart.map(Math.abs), 0.001);
    function basisPoint(i) {
      let col = i % cols,
        row = Math.floor(i / cols);
      if (m.kind === 1) {
        // Left 2 × 2: x. Right 3 × 2: electric and magnetic components.
        col = i < 4 ? i % 2 : 2 + ((i - 4) % 3);
        row = i < 4 ? Math.floor(i / 2) : Math.floor((i - 4) / 3);
      }
      return [(col - (cols - 1) / 2) * stride, (row - (rows - 1) / 2) * depth];
    }
    chart.forEach((v, i) => {
      const [x, y] = basisPoint(i);
      box(tiles, x, y, floor + 0.002, stride * 0.78, depth * 0.74, 0.012, P.lineHot);
      const h = (Math.abs(v) / max) * 0.51 * S.lambda;
      if (h > 0.00001)
        box(mesh, x, y, floor + 0.014, stride * 0.61, depth * 0.54, h, m.kind === 0 && i === 0 ? P.sigma : P.cyan);
      if (i % Math.ceil(chart.length / 14) === 0 && m.kind !== 3)
        sc.line([bodies[i % bodies.length], [x * 0.55, y * 0.55, z], [x, y, floor + 0.017 + h]], {
          color: P.cyan,
          alpha: 0.2 * S.lambda
        });
    });
    if (m.kind === 3) {
      // Route opposite signed terms to their actual shared basis slot.
      const terms = zeroTerms(S.example);
      terms.forEach((term, j) => {
        const slot = term.findIndex((v) => v !== 0) + (j >= 2 ? 8 : 0),
          end = basisPoint(slot);
        const begin = bodies[j % 2];
        const path = curve(26, (t) => [
          lerp(begin[0], end[0], t) + (j % 2 ? -0.27 : 0.27) * Math.sin(Math.PI * t),
          lerp(begin[1], end[1], t) + 0.12 * Math.sin(2 * Math.PI * t),
          lerp(begin[2], floor + 0.022, t)
        ]);
        sc.tube('cancel' + j, path, { color: P.magenta, width: 2.8, glow: 0.65 });
      });
    }
    publishMesh('slots', tiles);
    if (mesh.faces.length) publishMesh('pillars', mesh);
    const ellipse = curve(64, (t) => [1.12 * Math.cos(t * tau), 0.66 * Math.sin(t * tau), z]);
    sc.fan(ellipse, { fill: P.blue, alpha: 0.1 });
    sc.tube('iris', ellipse, { color: P.cyan, width: 2, glow: 0.24, alpha: 0.7, pick: false, occlude: false });
    if (m.kind === 2) {
      for (const [i, path] of [
        [1, 4, 2],
        [2, 5, 3],
        [3, 6, 4],
        [5, 6, 1],
        [7, 6, 2],
        [3, 7, 1]
      ].entries()) {
        sc.tube(
          'fano-edge' + i,
          path.map((k) => bodies[k - 1]),
          { color: P.cyan, width: 2.5, glow: 0.35 }
        );
      }
      // The seventh projective line is an ellipse through midpoints 4,5,7.
      sc.tube(
        'fano-circle',
        curve(60, (t) => {
          const y = 0.43 * Math.sin(tau * t);
          return [(0.97 / Math.sqrt(3)) * Math.cos(tau * t), y, 0.73 + 0.16 * y];
        }),
        { color: P.sigma, width: 2.5, glow: 0.35 }
      );
      if (S.example)
        sc.tube(
          'associator',
          curve(24, (t) => [
            lerp(bodies[0][0], bodies[2][0], t),
            lerp(bodies[0][1], bodies[2][1], t),
            0.73 + 0.3 * Math.sin(Math.PI * t)
          ]),
          { color: P.magenta, width: 5, glow: 0.7 }
        );
    } else {
      for (let i = 1; i < bodies.length; i++)
        sc.tube('bond' + i, [bodies[i - 1], bodies[i]], {
          color: P.sigma,
          width: 1.8 + Math.log2(S.chi) * 0.5,
          glow: 0.3
        });
    }
    if (m.kind === 4) {
      // Partition the traceless operator slots by Pauli weight on the front edge of the ledger.
      const weightOne = (3 * S.N) / (4 ** S.N - 1);
      const x0 = -1.2,
        x1 = 1.2,
        split = lerp(x0, x1, weightOne);
      sc.tube(
        'weight-one',
        [
          [x0, -0.83, floor],
          [split, -0.83, floor]
        ],
        { color: P.cyan, width: 3, glow: 0.45 }
      );
      if (m.excessCount > 0)
        sc.tube(
          'multi-site',
          [
            [split, -0.83, floor],
            [x1, -0.83, floor]
          ],
          { color: P.magenta, width: 3, glow: 0.45 }
        );
    }
    const r =
      m.upperCount === 1
        ? 0.85
        : m.upperCount === 2
          ? 0.61
          : m.kind === 2
            ? 0.3
            : Math.min(0.44, 1.7 / m.upperCount + 0.09);
    bodies.forEach((c, i) => shell(i, c, r, S.tau * tau));
    const handle = $('lambdaHandle'),
      p = sc.p(grip(S.lambda));
    handle.style.left = p[0] + 'px';
    handle.style.top = p[1] + 'px';
    sc.bead(grip(S.lambda), { key: 'aperture', color: P.cyan, r: 3 });
    sc.end();
  }

  const series = new Map();
  function strip() {
    const canvas = $('plot');
    if (!canvas.clientWidth) return;
    if (!series.has(S.chi)) {
      const ns = Array.from({ length: 300 }, (_, i) => i + 1);
      series.set(S.chi, [
        ns.map((n) => [n, Math.log10(3 * n)]),
        ns.map((n) => [n, Math.log10(mpsCount(n, S.chi))]),
        ns.map((n) => [n, n * Math.log10(2)]),
        ns.map((n) => [n, Math.log10(4 ** n - 1)])
      ]);
    }
    const g = kit.plot(canvas, { x: [1, 300], y: [0, 185], pad: [35, 18, 7, 20] });
    g.axes({ xTicks: [1, 100, 200, 300], yTicks: [0, 45, 90, 135, 180] });
    const colors = [P.cyan, P.violet, P.magenta, P.magenta];
    series.get(S.chi).forEach((pts, k) => g.line(pts, colors[k], { width: 1.8, dash: k === 2 ? [6, 4] : [] }));
    g.legend(
      [
        [P.cyan, '3N'],
        [P.violet, '2D − 2'],
        [P.magenta, '2ᴺ', 'dash'],
        [P.magenta, '4ᴺ − 1']
      ],
      { right: false }
    );
    g.vline(S.N, P.amber, { width: 1.5 });
    g.dot(S.N, Math.log10(3 * S.N), P.amber, 2.5);
    setText('plotTitle', L('参数增长 · log₁₀', 'Parameter growth · log₁₀'));
    setText(
      'plotMeta',
      'N = 300 · 3N = 900 · MPS = ' +
        mpsCount(300, S.chi).toLocaleString('en-US') +
        ' · log₁₀(2ᴺ) = ' +
        series.get(S.chi)[2][299][1].toFixed(2) +
        ' · log₁₀(4ᴺ−1) = ' +
        series.get(S.chi)[3][299][1].toFixed(2)
    );
  }
  function render() {
    const m = ledger();
    draw(m);
    strip();
    for (const [id, v] of Object.entries({
      upperCount: m.upperCount,
      pillarCount: m.pillarValues.length,
      localCount: 3 * S.N,
      mpsCount: m.mpsCount,
      excessCount: m.excessCount,
      detail: m.detail
    }))
      setText(id, v);
    const names = [
      ['单场与四元数', 'One field · quaternions'],
      ['左右手征场', 'Left and right chiral fields'],
      ['七线法诺网', 'Seven-line Fano web'],
      ['十六元数零因子', 'Sedenion zero divisor'],
      ['多场再投影', 'Many-body reprojection']
    ];
    setText('stageTitle', L(...names[S.kind]));
    const captions = [
      L('1 个场 · 标量 w 与 3 个向量分量', 'One field · scalar w and three vector components'),
      L('左右各 3 个自由度 · 4 个向量槽 + 6 个双矢槽', '3 + 3 local rotations · 4 vector and 6 bivector slots'),
      m.detail,
      m.detail,
      L('场体 ', 'Fields ') +
        m.upperCount +
        '   ↓   ' +
        L('基柱 ', 'Basis pillars ') +
        m.pillarValues.length +
        '   ·   ' +
        L('多体槽 ', 'Multi-site slots ') +
        m.excessCount
    ];
    setText('stageSub', S.lens ? m.detail : captions[S.kind]);
    setText('hint', L('拖空白处旋转 · 拖手柄展平', 'Drag to orbit · drag the handle to flatten'));
    setText('formula', 'λ = ' + S.lambda.toFixed(2) + '   ·   χ = ' + S.chi);
    const legend = $('legend'),
      content = [
        [
          'vi',
          S.lens ? ['ℍ', 'SU(2) × SU(2)', 'PG(2,2)', '𝕆 ⊕ 𝕆e₈', 'SU(2)ᴺ'][S.kind] : L('三元场', 'Ternion field')
        ],
        [
          'cy',
          S.lens ? ['w, x, y, z', 'x · E · B', '1 + 7', 'uv = 0', '|ψₓ|'][S.kind] : L('基柱', 'Basis pillar')
        ],
        [
          'mg',
          L(
            ['', '', '结合子', '抵消路径', '多体关联'][S.kind],
            ['', '', 'Associator', 'Cancellation', 'Multi-site correlations'][S.kind]
          )
        ]
      ].filter(([, s]) => s);
    const html = content.map(([c, s]) => '<span><i class="sw ' + c + '"></i>' + s + '</span>').join('');
    if (legend.innerHTML !== html) legend.innerHTML = html;
  }
  const paint = kit.painter(render, [$('stage'), $('plot')]);
  const clock = kit.clock({
    max: 1,
    rate: 0.065,
    step: 1 / 24,
    loop: true,
    range: $('now'),
    label: $('tau'),
    play: $('play'),
    speeds: $('speedChips'),
    format: (t) => 'τ ' + t.toFixed(2),
    onChange: (t, c) => {
      S.tau = t;
      $('playBtn').textContent = c.playing ? '❚❚' : '▷';
      $('playBtn').setAttribute('aria-pressed', c.playing);
      paint();
    }
  });
  const rewind = () => {
    clock.pause();
    clock.set(0);
  };
  $('playBtn').onclick = () => clock.toggle();
  $('rewBtn').onclick = rewind;
  $('rew').onclick = rewind;
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    S.cam = v;
    sc.view(cameras[v], TRV.still ? 0 : 350);
    paint();
  });
  $('lensToggleBtn').onclick = () => {
    S.lens = 1 - S.lens;
    $('lensToggleBtn').setAttribute('aria-pressed', String(!!S.lens));
    paint();
  };
  const fieldN = kit.field($('fieldN'), {
    onInput: (n) => {
      if (S.kind !== 4) cards.pick(cardsData[4].id);
      clock.pause();
      S.N = n;
      fieldN.set(n);
      cards.mark(null);
      paint();
    }
  });
  const lambda = kit.field($('flatLambda'), {
    fmt: (n) => n.toFixed(2),
    onInput: (n) => {
      S.lambda = n;
      paint();
    }
  });
  const chi = kit.field($('bondChi'), {
    fmt: (k) => String(2 ** k),
    onInput: (k) => {
      S.chi = 2 ** k;
      paint();
    }
  });
  function examples() {
    const el = $('caseChips'),
      labels = S.kind === 2 ? ['(124)', '(123)'] : S.kind === 3 ? ['e₁ + e₁₀', 'e₁ + e₁₁', 'e₁ + e₁₂'] : [];
    el.hidden = !labels.length;
    el.innerHTML = labels
      .map(
        (s, i) =>
          '<button class="chip" data-case="' + i + '" aria-pressed="' + (i === S.example) + '">' + s + '</button>'
      )
      .join('');
  }
  kit.chips($('caseChips'), 'case', (i) => {
    S.example = Number(i);
    paint();
  });
  let drag = null;
  const handle = $('lambdaHandle');
  handle.onpointerdown = (e) => {
    if (TRV.still) return;
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    drag = { y: e.clientY, l: S.lambda };
  };
  handle.onpointermove = (e) => {
    if (!drag) return;
    const distance = sc.p(grip(1))[1] - sc.p(grip(0))[1];
    if (Math.abs(distance) < 1) return;
    S.lambda = Math.round(100 * kit.clamp(drag.l + (e.clientY - drag.y) / distance, 0, 1)) / 100;
    lambda.set(S.lambda);
    paint();
  };
  handle.onlostpointercapture = () => {
    drag = null;
  };
  handle.onkeydown = (e) => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    S.lambda =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? 1
          : kit.clamp(S.lambda + (e.key === 'ArrowDown' ? 0.01 : -0.01), 0, 1);
    lambda.set(S.lambda);
    paint();
  };
  let loading = true;
  const cards = kit.cards($('presets'), {
    presets,
    notes: Object.fromEntries(cardsData.map((p, i) => [p.id, notes[i]])),
    idle: [
      '自由探索 · 改变场数并比较上下两层。',
      'Free exploration · vary the field count and compare the two layers.'
    ],
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: (id) => {
      const p = presets[id];
      clock.pause();
      Object.assign(S, p, { kind: cardsData.indexOf(p), example: p === cardsData[2] ? 1 : 0 });
      fieldN.set(S.N);
      chi.set(Math.log2(S.chi));
      lambda.set(S.lambda);
      examples();
      camChips.set(p.cam, true);
      sc.view(cameras[p.cam], loading || TRV.still ? 0 : 350);
      clock.set(TRV.still || loading ? p.still : 0);
      if (p.play && !TRV.still) {
        if (loading) kit.autoplay(clock, $('stage'));
        else clock.play();
      }
      paint();
    }
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  window.TERNION_HILBERT = Object.freeze({
    associator,
    zeroProduct,
    mpsCount,
    get state() {
      return { ...S, ...ledger(), preset: cards.current, play: clock.playing };
    }
  });
  window.TRV_THUMB = () => paint.now();
  cards.pick(cards.initial(cardsData[4].id));
  loading = false;
  paint();
})();
