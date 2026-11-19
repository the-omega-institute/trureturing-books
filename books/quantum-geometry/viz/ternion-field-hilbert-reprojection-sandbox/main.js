/* TERNION//HILBERT · 三元数场组合与再投影阶梯沙盘 · Many-field reprojection (Chapter 32, §32.3)
   World (kit.solid): z up. Above (z ≈ 0.7) the violet ternion field bodies: spherical octants bounded by three quadrant
   arcs, one per field. In the middle the cyan lens (an ellipse at z = 0.19 − 0.44λ) with the amber handle on its rim;
   dragging it sets the flattening λ. Below (z = −1) the floor of basis slots and the cyan pillars, whose heights are the
   absolute coefficients scaled to the largest of the frame (times λ, and times the rise of a card transition).
     card 0  one field: the unit quaternion (cos(θ/2), n sin(θ/2)) on 1 + 3 pillars (the silver one is w).
     card 1  two chiral fields: x = qᴸ · 1 · q̄ᴿ on a 2 × 2 block and F = qᴸ ∧ qᴿ on two rows of three (E·B = 0).
     card 2  the seven Fano fields: a unit octonion on 1 + 7 pillars; the magenta crease is [e₁, e₂, e₃] = −2e₆, the
             line (124) has no crease ([e₁, e₂, e₄] = 0).
     card 3  sedenion zero divisors: (a, b)(c, d) = (ac − d̄b, da + bc̄) on 16 pillars, all zero; the magenta paths
             carry the four signed terms to the slot where they cancel.
     card 4  N fields: a product-state sample on 2ᴺ pillars; the front edge splits the 4ᴺ − 1 Pauli words into 3N
             one-site (cyan) and 4ᴺ − 1 − 3N multi-site (magenta).
   The rail τ ∈ [0, 1] turns the field bodies (and the sample coefficients); N, λ and χ do not move with it. The strip
   draws log₁₀ of 3N, the MPS ray dimension 2D − 2 (bond ≤ χ), 2ᴺ and 4ᴺ − 1 for N = 1 … 300.
   Every number is computed here. Read-only probe: window.TERNION_HILBERT. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const fmt = (x) => (Math.abs(x) < 5e-5 ? 0 : x).toFixed(4);
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = (n) => String(n).replace(/\d/g, (d) => SUP[d]);
  const group = (n) => n.toLocaleString('en-US');
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
  /* The state; `grow` lifts the pillars from the floor after a card is picked (kit.tween). */
  const S = { ...cardsData[4], tau: 0, lens: 0, example: 0, kind: 4, grow: 1 };
  const NOTES = {
    'native-ternion-curl-field': [
      '一个场的三条卷曲轴投下 1 根银白标量柱与 3 根青色向量柱，平方和为 1。',
      'One field’s three curls cast 1 silver scalar pillar and 3 cyan vector pillars; their squares add up to 1.'
    ],
    'spin4-chiral-spacetime-bivector': [
      '左右两个手征场投向 4 根向量柱与 6 根双矢柱。',
      'Two chiral fields cast 4 vector pillars and 6 bivector pillars.'
    ],
    'fano-seven-field-octonion-weave': [
      '七条法诺线投向 1 + 7 = 8 根柱；切换直线与跨线三角形，比较品红的结合子折痕。',
      'Seven Fano lines cast 1 + 7 = 8 pillars; switch between a line and an off-line triangle to compare the magenta associator crease.'
    ],
    'sedenion-zero-divisor-bankruptcy': [
      '两个输入都有长度，品红路径两两相消，十六根柱全部归零。',
      'Both inputs have length, yet the magenta paths cancel in pairs and all sixteen pillars drop to zero.'
    ],
    'many-body-3n-to-2n-hilbert-pillars': [
      '六个场投向六十四根基柱；台前的青色是 18 个单体槽，品红是 4,077 个多体槽。',
      'Six fields cast 64 basis pillars; on the front edge cyan is the 18 one-site slots and magenta the 4,077 multi-site slots.'
    ]
  };
  const setText = (id, value) => {
    const el = $(id);
    if (el.textContent !== String(value)) el.textContent = String(value);
  };
  const setHTML = (id, value) => {
    const el = $(id);
    if (el.innerHTML !== value) el.innerHTML = value;
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
  const ZERO_PAIRS = ['(e₁ + e₁₀)(e₃ + e₁₄)', '(e₁ + e₁₁)(e₂ − e₁₄)', '(e₁ + e₁₂)(e₃ + e₁₃)'];

  /** Everything the page shows, from the state. */
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
      detail = 'w = ' + fmt(q[0]) + ' · w² + ‖v‖² = ' + fmt(q.reduce((s, x) => s + x * x, 0));
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
      const [ex, ey, ez, bx, by, bz] = values.slice(4);
      detail = 'x = qᴸ · 1 · q̄ᴿ · F = qᴸ ∧ qᴿ · E·B = ' + fmt(ex * bx + ey * by + ez * bz);
    } else if (S.kind === 2) {
      const v = Array.from({ length: 8 }, (_, k) => (k === 0 ? 0.8 : Math.sin(t + k)));
      const norm = Math.hypot(...v);
      values = v.map((x) => x / norm);
      const assoc = associator(1, 2, S.example ? 3 : 4);
      detail =
        (S.example ? '[e₁, e₂, e₃] = ' + String(assoc[6]).replace('-', '−') + 'e₆' : '[e₁, e₂, e₄] = 0') +
        ' · ‖[a, b, c]‖ = ' +
        Math.hypot(...assoc);
    } else if (S.kind === 3) {
      values = zeroProduct(S.example);
      detail = ZERO_PAIRS[S.example] + ' = 0 · ‖u‖²‖v‖² = 4';
    } else {
      values = [1];
      for (let j = 0; j < S.N; j++) {
        const a = Math.PI / 4 + 0.16 * Math.sin(t + j * 0.8);
        values = values.flatMap((v) => [v * Math.cos(a), v * Math.sin(a)]);
      }
      detail = '|ψ⟩ = ⊗ₖ (cos aₖ|0⟩ + sin aₖ|1⟩) · ∑|ψₓ|² = ' + fmt(values.reduce((s, x) => s + x * x, 0));
    }
    return {
      kind: S.kind,
      upperCount: upper,
      pillarValues: values,
      norm: Math.hypot(...values),
      detail,
      localCount: 3 * S.N,
      rayCount: 2 ** (S.N + 1) - 2,
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
  const stage = $('stage'),
    handle = $('lambdaHandle');
  const sc = kit.solid(stage, config);
  if (TRV.still) stage.classList.add('still');
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
    const w = stage.clientWidth,
      h = stage.clientHeight;
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
      const h = (Math.abs(v) / max) * 0.51 * S.lambda * S.grow;
      if (h > 0.00001)
        box(mesh, x, y, floor + 0.014, stride * 0.61, depth * 0.54, h, m.kind === 0 && i === 0 ? P.sigma : P.cyan);
      if (i % Math.ceil(chart.length / 14) === 0 && m.kind !== 3)
        sc.line([bodies[i % bodies.length], [x * 0.55, y * 0.55, z], [x, y, floor + 0.017 + h]], {
          color: P.cyan,
          alpha: 0.2 * S.lambda * S.grow
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
    sc.bead(grip(S.lambda), { key: 'aperture', color: P.cyan, r: 3 });
    // Short tags on the outer rim: the lens on its left end, the ledger on its right edge.
    sc.tag('lens', [-1.12, 0, z], (S.lens ? 'λ = ' : L('透镜 λ = ', 'LENS λ = ')) + S.lambda.toFixed(2), 'raw backed c-cy');
    sc.tag('ledger', [1.3, 0.2, floor], (S.lens ? '' : L('基柱 ', 'PILLARS ')) + group(chart.length), 'raw backed c-cy');
    sc.end();
    const p = sc.p(grip(S.lambda));
    handle.hidden = TRV.still;
    handle.style.left = p[0] + 'px';
    handle.style.top = p[1] + 'px';
    fitLabels();
  }
  // Keep each tag near its anchor, inside the stage and clear of the HUD, the legend and the handle.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, b] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - b.left, bounds.right - 5 - b.right);
      const row = b.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = b.left + dx,
          right = b.right + dx,
          top = b.top + dy,
          bottom = b.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }

  /* ---------- strip plot: along N, which counts grow exponentially ---------- */
  const series = new Map();
  function strip() {
    const canvas = $('plot');
    if (TRV.thumbMode || !canvas.clientWidth || !canvas.clientHeight) return;
    if (!series.has(S.chi)) {
      const ns = Array.from({ length: 300 }, (_, i) => i + 1);
      series.set(S.chi, [
        ns.map((n) => [n, Math.log10(3 * n)]),
        ns.map((n) => [n, Math.log10(mpsCount(n, S.chi))]),
        ns.map((n) => [n, n * Math.log10(2)]),
        ns.map((n) => [n, Math.log10(4 ** n - 1)])
      ]);
    }
    setText('plotTitle', L('沿场数 N（log₁₀）：3N 与 MPS 贴着底边，2ᴺ 与 4ᴺ 一路上冲', 'Along N (log₁₀): 3N and MPS hug the floor, 2ᴺ and 4ᴺ climb away'));
    const g = kit.plot(canvas, { x: [1, 300], y: [0, 185], pad: [35, 18, 7, 20] });
    g.axes({ xTicks: [1, 100, 200, 300], yTicks: [0, 45, 90, 135, 180], xLabel: 'N' });
    const colors = [P.cyan, P.violet, P.magenta, P.magenta];
    series.get(S.chi).forEach((pts, k) => g.line(pts, colors[k], { width: k < 2 ? 2.4 : 1.8, dash: k === 2 ? [6, 4] : [] }));
    // The key sits just right of the amber cursor (N ≤ 8), in the empty top-left corner, so the cursor never crosses it.
    const keyX = g.X(8) + 14;
    [
      [P.cyan, '3N'],
      [P.violet, 'MPS 2D − 2 (χ = ' + S.chi + ')'],
      [P.magenta, '2^{N}', [4, 3]],
      [P.magenta, '4^{N} − 1']
    ].forEach(([color, label, dash], row) => {
      const y = g.invY(g.pt + 9 + 14 * row);
      g.arrow([g.invX(keyX), y], [g.invX(keyX + 14), y], { color, width: 2, head: false, dash });
      g.text(g.invX(keyX + 19), y, label, P.ink, { face: 'body', size: 10.5 });
    });
    g.vline(S.N, P.amber, { width: 1.5 });
    g.dot(S.N, Math.log10(3 * S.N), P.amber, 2.5);
    setText(
      'plotMeta',
      'N = 300 · 3N = 900 · MPS = ' +
        group(mpsCount(300, S.chi)) +
        ' · log₁₀ 2ᴺ = ' +
        series.get(S.chi)[2][299][1].toFixed(2) +
        ' · log₁₀(4ᴺ − 1) = ' +
        series.get(S.chi)[3][299][1].toFixed(2)
    );
  }

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE = [
    [['单场与四元数', 'ONE FIELD'], ['左右手征场', 'CHIRAL PAIR'], ['法诺七场', 'FANO SEVEN'], ['十六元数零因子', 'SEDENION ZEROS'], ['多场再投影', 'MANY FIELDS']],
    [['ℍ = ℝ ⊕ ℝ³', 'ℍ = ℝ ⊕ ℝ³'], ['SU(2)ᴸ × SU(2)ᴿ', 'SU(2)ᴸ × SU(2)ᴿ'], ['PG(2,2) · 𝕆', 'PG(2,2) · 𝕆'], ['𝕊₁₆ = 𝕆 ⊕ 𝕆e₈', '𝕊₁₆ = 𝕆 ⊕ 𝕆e₈'], ['SU(2)ᴺ → (ℂ²)⊗ᴺ', 'SU(2)ᴺ → (ℂ²)⊗ᴺ']]
  ];
  const LENS_NAME = [['多场再投影', 'REPROJECTION'], ['凯莱—迪克森', 'CAYLEY–DICKSON']];
  const pillarsWord = () => L('根基柱', 'PILLARS');
  function keyQuantity(m) {
    if (m.kind === 0) return `1 + 3 = 4 ${pillarsWord()}`;
    if (m.kind === 1) return `4 + 6 = 10 ${pillarsWord()}`;
    if (m.kind === 2) return S.example ? '‖[e₁, e₂, e₃]‖ = 2' : '[e₁, e₂, e₄] = 0';
    if (m.kind === 3) return 'u·v = 0';
    return `2${sup(S.N)} = ${group(m.pillarValues.length)} ${pillarsWord()}`;
  }
  function subline(m) {
    if (m.kind === 0)
      return L('一个场的三条卷曲轴投下 1 根标量柱与 3 根向量柱，四个坐标的平方和恒为 1。', 'One field’s three curls cast 1 scalar and 3 vector pillars; the four squares always add up to 1.');
    if (m.kind === 1)
      return L('左右两个场各转 3 个参数，投下 4 根向量柱与 6 根双矢柱。', 'Two chiral fields of 3 rotation parameters each cast 4 vector and 6 bivector pillars.');
    if (m.kind === 2)
      return S.example
        ? L('(123) 不在法诺线上：结合子为 −2e₆。', '(123) is off the Fano lines: the associator is −2e₆.')
        : L('(124) 是一条法诺线：结合子为 0。', '(124) is a Fano line: the associator is 0.');
    if (m.kind === 3)
      return L('两个长度为 √2 的输入相乘，品红路径两两相消，16 根柱全部归零。', 'Two inputs of length √2 multiply; the magenta paths cancel in pairs and all 16 pillars drop to zero.');
    return L(
      `N = ${S.N} 个场只有 3N = ${m.localCount} 个局部参数，摊平后是 ${group(m.pillarValues.length)} 根基柱、${group(m.excessCount)} 个多体槽位。`,
      `N = ${S.N} fields have only 3N = ${m.localCount} local parameters, yet flatten onto ${group(m.pillarValues.length)} pillars and ${group(m.excessCount)} multi-site slots.`
    );
  }
  function legendItems(m) {
    const k = m.kind;
    if (S.lens)
      return [
        ['vi', SCENE[1][k][0]],
        ['cy', ['w, x, y, z', 'x · E · B', '1 + 7', 'uv = 0', '|ψ<sub>x</sub>|'][k]],
        ['sg', ['w', 'χ', '(457)', 'χ', 'χ = ' + S.chi][k]],
        ['mg', ['', '', '[a, b, c]', '±', '4ᴺ − 1 − 3N'][k]]
      ].filter(([, s]) => s);
    return [
      ['vi', L('三元数场体', 'ternion fields')],
      ['cy', L('基柱与透镜', 'pillars and lens')],
      ['sg', [L('标量柱 w', 'scalar pillar w'), L('场间的键', 'bonds'), L('第七条法诺线', 'seventh Fano line'), L('场间的键', 'bonds'), L('键（随 χ 变粗）', 'bonds (thicker with χ)')][k]],
      ['mg', ['', '', L('结合子折痕', 'associator crease'), L('相消路径', 'cancelling paths'), L('多体槽位', 'multi-site slots')][k]]
    ].filter(([, s]) => s);
  }
  function render() {
    const m = ledger();
    setHTML('hudBig', `${L(...SCENE[S.lens][S.kind])} · ${keyQuantity(m)}`);
    setHTML('hudSub', subline(m));
    setHTML('legend', legendItems(m).map(([c, s]) => `<span><i class="sw ${c}"></i>${s}</span>`).join(''));
    TRV.hudFit();
    draw(m);
    strip();
    setText('roKey', group(m.pillarValues.length));
    setText('roKeySub', L(` · 上层 ${m.upperCount} 个场体`, ` · ${m.upperCount} field bod${m.upperCount === 1 ? 'y' : 'ies'} above`));
    setText('roLocal', `${m.localCount} · N = ${S.N}`);
    setText('roRay', group(m.rayCount));
    setText('roMps', `${group(m.mpsCount)} · χ = ${S.chi}`);
    setText('roExcess', group(m.excessCount));
    setText('roNorm', fmt(m.norm));
    setText('roAlgebra', m.detail);
    setText('roNote', L(`舞台上的柱高按本帧最大模长缩放，再乘 λ = ${S.lambda.toFixed(2)}；读数是未缩放的准确值。`, `On the stage the pillar heights are scaled to the largest of the frame and multiplied by λ = ${S.lambda.toFixed(2)}; the readouts are exact and unscaled.`));
    setHTML('scenePill', `HILBERT <strong>${L(...LENS_NAME[S.lens])}</strong>`);
    setHTML('keyPill', `${L('基柱', 'PILLARS')} <strong>${group(m.pillarValues.length)}</strong>`);
    setText('hint', L('拖琥珀手柄上下移动透镜 · 拖空白处转视角 · 空格播放', 'drag the amber handle to move the lens · drag empty space to orbit · Space plays'));
    setText('formula', `λ = ${S.lambda.toFixed(2)} · χ = ${S.chi} · 3N = ${m.localCount} → 2ᴺ = ${group(2 ** S.N)}`);
    $('lensToggleBtn').setAttribute('aria-pressed', String(S.lens === 1));
  }
  const paint = kit.painter(render, [stage, $('plot')]);

  /* ---------- the rail: the turning phase of the field bodies ---------- */
  const playBtn = $('playBtn');
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
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stage);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let rise = null,
    loading = true;
  /** After a card is picked the pillars rise from the floor (kit.tween), so the projection is seen happening. */
  function startRise(ms) {
    if (rise) rise.cancel();
    S.grow = 0;
    const token = {};
    rise = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.grow = 1; };
    token.run = kit.tween(ms, (e) => { S.grow = e; paint(); }, () => { if (rise === token) rise = null; S.grow = 1; paint(); });
  }
  /** The reader takes over: the clock pauses and no card is marked. */
  function leave(keepRise = false) {
    stopBootPlay();
    if (!keepRise && rise) { rise.cancel(); rise = null; }
    cards.mark(null);
    clock.pause();
  }
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    S.cam = cameras[v] ? v : 'split';
    sc.view(cameras[S.cam], TRV.still ? 0 : 600);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    S.lens = S.lens ? 0 : 1;
    paint();
  });
  const fieldN = kit.field($('fieldN'), {
    onInput: (n) => {
      const switched = S.kind !== 4;
      if (switched) cards.pick(cardsData[4].id);
      leave(switched);
      S.N = n;
      fieldN.set(n);
      paint();
    }
  });
  const lambda = kit.field($('flatLambda'), {
    fmt: (n) => n.toFixed(2),
    onInput: (n) => {
      leave();
      S.lambda = n;
      paint();
    }
  });
  const chi = kit.field($('bondChi'), {
    fmt: (k) => String(2 ** k),
    onInput: (k) => {
      leave();
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

  /* ---------- the amber handle: drag the lens up and down, or arrow keys ---------- */
  let drag = null;
  handle.onpointerdown = (e) => {
    if (e.button > 0 || TRV.still) return;
    e.preventDefault();
    leave();
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('dragging');
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
  handle.onpointerup = (e) => {
    if (handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId);
  };
  handle.onlostpointercapture = () => {
    drag = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (e) => {
    if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    leave();
    S.lambda =
      e.key === 'Home'
        ? 0
        : e.key === 'End'
          ? 1
          : Math.round(100 * kit.clamp(S.lambda + (e.key === 'ArrowDown' ? 0.01 : -0.01), 0, 1)) / 100;
    lambda.set(S.lambda);
    paint();
  };

  /* ---------- experiment cards ---------- */
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'native-ternion-curl-field': ['一个场投下 1 根银白柱与 3 根青色柱，平方和为 1。', 'One field casts 1 silver and 3 cyan pillars; their squares add up to 1.'],
    'spin4-chiral-spacetime-bivector': ['左右两个场投向 4 根向量柱与 6 根双矢柱。', 'Two chiral fields cast 4 vector and 6 bivector pillars.'],
    'fano-seven-field-octonion-weave': ['(123) 不在法诺线上：品红折痕是结合子 −2e₆。', '(123) is off the Fano lines: the magenta crease is the associator −2e₆.'],
    'sedenion-zero-divisor-bankruptcy': ['品红路径两两相消，16 根柱全部归零。', 'The magenta paths cancel in pairs; all 16 pillars drop to zero.'],
    'many-body-3n-to-2n-hilbert-pillars': ['6 个场、18 个局部参数，摊平成 64 根基柱。', '6 fields with 18 local parameters flatten onto 64 pillars.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    Object.assign(S, { N: p.N, lambda: p.lambda, chi: p.chi, cam: p.cam, play: p.play, still: p.still, kind: cardsData.indexOf(p), example: p === cardsData[2] ? 1 : 0 });
    fieldN.set(S.N);
    chi.set(Math.log2(S.chi));
    lambda.set(S.lambda);
    examples();
    camChips.set(p.cam, true);
    sc.view(cameras[p.cam], loading || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (loading && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!loading && !TRV.still) startRise(700);
    else if (rise) { rise.cancel(); rise = null; }
    if (p.play && !TRV.still && (!loading || TRV.embed)) {
      if (loading) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：拉 N、λ 与 χ，拖琥珀手柄移动透镜，换透镜或视角。时间轴让场体缓缓转动。随时可以再选一张卡。', 'Free play: pull N, λ and χ, drag the amber handle to move the lens, switch the lens or the view. The rail turns the field bodies slowly. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.TERNION_HILBERT = Object.freeze({
    associator,
    zeroProduct,
    mpsCount,
    get state() {
      return { ...S, ...ledger(), preset: cards.current, play: clock.playing, blending: S.grow < 1, camera: { ...sc.cam } };
    }
  });
  window.TRV_THUMB = () => paint.now();
  cards.pick(cards.initial(cardsData[4].id));
  loading = false;
  paint.now();
})();
