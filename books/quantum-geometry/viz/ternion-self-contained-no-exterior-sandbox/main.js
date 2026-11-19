/* TERNION//NO-EXTERIOR · 自包含三元数与“至大无外”沙盘 · The self-contained ternion and nothing outside (Chapter 39, §39.4)
   World (kit.solid): z up. The ternion 𝕋₃ ≅ S³(1) ⊂ ℝ⁴ seen from its centre point (1, 0, 0, 0): a point
   q = (x₀, x₁, x₂, x₃) is drawn at LC + (x₁, x₂, x₃) when x₀ ≥ 0 (the left ball B_in, the hemisphere around the centre)
   and at RC + (−x₁, x₂, x₃) when x₀ < 0 (the right ball B_out, around the antipode, mirrored in x so that the two balls
   touch at the doorway, the seam point (0, 1, 0, 0)). Both balls are unit balls; their spheres are the one seam
   S²_eq = {x₀ = 0}. The point at geodesic distance r from the centre in the unit direction n is (cos r, sin r · n),
   drawn at distance sin r from its ball's centre, so the amber wavefront sphere of radius sin r has the true area
   A(r) = 4π sin² r (the drawing does not keep volumes; V(r) = π(2r − sin 2r) is computed).
   The rail runs r ∈ [0, π]. Five scenes share the two balls:
     fill      the swept ball B(r) in violet: a solid ball in B_in, then a shell (cut open by a wedge) in B_out;
     trinity   cyan projected frames eⱼ(q) = q·iⱼ, magenta hair ẑ × p on the seam of B_in with two vortex zeros,
               the cyan k = 1 wave ψ₀ = cos r drawn as a height along the doorway geodesic;
     origin    the example of §39.4 in the chart centred on C₁ = 1: A, B, the heap steps on their great circle,
               the external point C(φ) = (cos φ, 0, 0, sin φ) and the affine sum A + B − C at its direction;
     wave      eighteen cyan geodesic rays from A, which pass the seam and close up at Ā;
     heegaard  the two balls glued along the seam (magenta dashed lines join copies of one seam point).
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.TERNION_NO_EXTERIOR_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    SQ2 = Math.SQRT2;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => scale(a, 1 / (norm(a) || 1));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : (Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d));
  const AB = '<span class="ab">Ā</span>';
  const signed = (x, d = 4) => (Math.abs(x) >= 0.5 * 10 ** -d && x < 0 ? '−' + fmt(-x, d) : '+' + fmt(x, d));

  /* ---------- quaternions [w, x, y, z] ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qinv = (a) => scale([a[0], -a[1], -a[2], -a[3]], 1 / dot(a, a));
  const ONE = [1, 0, 0, 0],
    UNITS = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  /** The rotation of ℝ³ that the unit quaternion q induces by conjugation, as a 3 × 3 matrix. */
  const rotation = (q) =>
    UNITS.map((ei) => qmul(qmul(q, ei), qinv(q)).slice(1)).reduce((M, col, j) => {
      col.forEach((x, i) => (M[i][j] = x));
      return M;
    }, [[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

  /* ---------- the chart: two touching unit balls ---------- */
  const LC = [-1, 0, 0],
    RC = [1, 0, 0],
    DOOR = [0, 0, 0];
  const mirror = (v) => [-v[0], v[1], v[2]];
  /** Where the point q of S³ is drawn; `side` forces a ball for points of the seam (x₀ = 0). */
  function chart(q, side) {
    const v = [q[1], q[2], q[3]];
    const left = side ? side === 'in' : q[0] >= 0;
    return left ? add(LC, v) : add(RC, mirror(v));
  }
  /** A curve of S³ as drawn polylines, cut where it crosses the seam; both ends of a crossing land on the seam. */
  function chartPath(qs) {
    const side = (q) => (q[0] >= 0 ? 'in' : 'out');
    const runs = [];
    let cur = [];
    for (let i = 0; i < qs.length; i++) {
      const q = qs[i];
      if (i > 0 && side(qs[i - 1]) !== side(q)) {
        const p = qs[i - 1],
          u = p[0] / (p[0] - q[0]),
          m = add(scale(p, 1 - u), scale(q, u));
        const seam = [0, ...unit(m.slice(1))];
        cur.push(chart(seam, side(p)));
        runs.push(cur);
        cur = [chart(seam, side(q))];
      }
      cur.push(chart(q));
    }
    if (cur.length > 1) runs.push(cur);
    return runs;
  }
  /** The point at geodesic distance r from the centre on the doorway ray, as drawn. */
  const axisPoint = (r) => (r <= PI / 2 ? add(LC, [sn(r), 0, 0]) : add(RC, [-sn(r), 0, 0]));

  /* ---------- the example of §39.4 ---------- */
  const EX_A = [1 / SQ2, 1 / SQ2, 0, 0],
    EX_B = [1 / SQ2, 0, 1 / SQ2, 0],
    C1 = [1, 0, 0, 0],
    C2 = [0, 0, 0, 1];
  const pinPoint = (phiDeg) => [cs(phiDeg * deg), 0, 0, sn(phiDeg * deg)];
  const HEAP = qmul(qmul(EX_B, qinv(EX_A)), EX_B);
  // the great circle through A and B: γ(t) = cos t A + sin t T with T the unit tangent towards B
  const TAN = unit(sub(EX_B, scale(EX_A, dot(EX_A, EX_B))));
  const geodesic = (t) => add(scale(EX_A, cs(t)), scale(TAN, sn(t)));
  /** The heap steps x₀ = A, x₁ = B, xₙ₊₁ = xₙ xₙ₋₁⁻¹ xₙ. */
  function heapSteps(n) {
    const xs = [EX_A, EX_B];
    while (xs.length < n) {
      const a = xs[xs.length - 2],
        b = xs[xs.length - 1];
      xs.push(qmul(qmul(b, qinv(a)), b));
    }
    return xs;
  }
  // auxiliary base points o (contexts): C₁, C₂, the current C and five others on the shell
  const BASES = [C1, C2, [0, 1, 0, 0], [0.5, 0.5, 0.5, 0.5], unit([1, -2, 3, 1]), unit([-2, 1, 0, 2]), unit([0.3, -0.4, -0.5, 0.7])];
  function heapAt(o) {
    const oi = qinv(o),
      star = (x, y) => qmul(qmul(x, oi), y),
      inverse = (x) => qmul(qmul(o, qinv(x)), o);
    return star(EX_B, star(inverse(EX_A), EX_B));
  }

  /* ---------- sampled directions and points ---------- */
  // eighteen directions on a golden spiral, for the geodesic rays and the classes of the readout d(A, ·)
  const RAYS = Array.from({ length: 18 }, (_, k) => {
    const z = 1 - (2 * (k + 0.5)) / 18,
      rr = Math.sqrt(1 - z * z),
      a = k * PI * (3 - Math.sqrt(5)) + 0.4;
    return [rr * cs(a), rr * sn(a), z];
  });
  // the seam points the gluing lines join, and the poles of the hair field
  const GLUE = [
    [0, -1, 0],
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, -1]
  ];
  const POLES = [
    [0, 0, 1],
    [0, 0, -1]
  ];
  // the frames are drawn at the two centres and at r = π/4, 3π/4 in the directions ±y, ±z (away from the seam)
  const FRAME_DIRS = [
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1]
  ];
  const FRAME_POINTS = [
    ONE,
    ...FRAME_DIRS.map((n) => [cs(PI / 4), ...scale(n, sn(PI / 4))]),
    [-1, 0, 0, 0],
    ...FRAME_DIRS.map((n) => [cs((3 * PI) / 4), ...scale(n, sn((3 * PI) / 4))])
  ];
  // the octahedral net of the seam (vertices ±eᵢ, faces = octants) and a regular tetrahedron inscribed in the seam
  const OCTA = (() => {
    const V = [
      [1, 0, 0],
      [-1, 0, 0],
      [0, 1, 0],
      [0, -1, 0],
      [0, 0, 1],
      [0, 0, -1]
    ];
    const faces = [];
    for (const sx of [0, 1]) for (const sy of [2, 3]) for (const sz of [4, 5]) faces.push([sx, sy, sz]);
    const edges = [];
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (dot(V[i], V[j]) === 0) edges.push([i, j]);
    return { V, faces, edges };
  })();
  const TETRA = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ].map(unit);

  /** Everything the page shows that depends on r and on the external point C(φ). */
  function compute(r, phiDeg) {
    const s = sn(r),
      area = 4 * PI * s * s,
      volume = PI * (2 * r - sn(2 * r)),
      share = volume / (2 * PI * PI);
    const q = [cs(r), s, 0, 0];
    // Δψ₀ for ψ₀ = x₀: second differences along the three frame geodesics γⱼ(t) = cos t q + sin t q·iⱼ
    const h = 1e-3;
    let lap = 0;
    for (const e of UNITS) {
      const v = qmul(q, e);
      lap += (cs(h) * q[0] + sn(h) * v[0] + (cs(h) * q[0] - sn(h) * v[0]) - 2 * q[0]) / (h * h);
    }
    const C = pinPoint(phiDeg),
      affine = sub(add(EX_A, EX_B), C),
      aff1 = sub(add(EX_A, EX_B), C1),
      aff2 = sub(add(EX_A, EX_B), C2);
    const drift = Math.max(...[...BASES, C].map((o) => norm(sub(heapAt(o), HEAP))));
    const bridge = norm(sub(qmul(qmul(EX_A, qinv(C)), C), EX_A));
    return {
      r,
      phiDeg,
      area,
      volume,
      share,
      kappa: cs(r / 2) ** 2,
      psi: cs(r),
      laplacian: lap,
      waveResidual: lap + 3 * cs(r),
      boundaryEmpty: area < 1e-12,
      point: q,
      C,
      affine,
      affineNorm2: dot(affine, affine),
      aff1Norm2: dot(aff1, aff1),
      aff2Norm2: dot(aff2, aff2),
      heap: HEAP,
      heapNorm2: dot(HEAP, HEAP),
      heapDrift: drift,
      bridge,
      angleAB: Math.acos(dot(EX_A, EX_B)) / deg,
      kappaAB: (1 + dot(EX_A, EX_B)) / 2,
      angleBH: Math.acos(dot(EX_B, HEAP)) / deg,
      dims: { so4: (4 * 3) / 2, so3: (3 * 2) / 2 },
      totalVolume: 2 * PI * PI
    };
  }

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  /** Rank over GF(2) of a 0/1 matrix given by rows. */
  function rank2(rows) {
    const M = rows.map((r) => r.slice());
    let rank = 0;
    for (let c = 0; c < (M[0] || []).length && rank < M.length; c++) {
      const p = M.findIndex((row, i) => i >= rank && row[c]);
      if (p < 0) continue;
      [M[rank], M[p]] = [M[p], M[rank]];
      for (let i = 0; i < M.length; i++) if (i !== rank && M[i][c]) M[i] = M[i].map((x, j) => x ^ M[rank][j]);
      rank++;
    }
    return rank;
  }
  const solidAngle = (a, b, c) => 2 * Math.atan2(dot(a, cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a));
  const STATIC = (() => {
    // face_cycle_exact on the octahedral net: ∂x(e) = x(f₁(e)) + x(f₂(e)) over GF(2)
    const faceOfEdge = OCTA.edges.map(([i, j]) => OCTA.faces.map((f, k) => (f.includes(i) && f.includes(j) ? k : -1)).filter((k) => k >= 0));
    const boundary = (x) => faceOfEdge.map(([a, b]) => x[a] ^ x[b]);
    let closed = 0;
    const closedLabels = [];
    for (let mask = 0; mask < 1 << OCTA.faces.length; mask++) {
      const x = OCTA.faces.map((_, k) => (mask >> k) & 1);
      if (boundary(x).every((v) => v === 0)) {
        closed++;
        closedLabels.push(x.join(''));
      }
    }
    const matrix = faceOfEdge.map(([a, b]) => OCTA.faces.map((_, k) => (k === a || k === b ? 1 : 0)));
    const faceCycle = {
      V: OCTA.V.length,
      E: OCTA.edges.length,
      F: OCTA.faces.length,
      euler: OCTA.V.length - OCTA.edges.length + OCTA.faces.length,
      everyEdgeTwoFaces: faceOfEdge.every((f) => f.length === 2),
      rank: rank2(matrix),
      closed,
      closedLabels
    };
    // tetra_defects on four seam points: F(i, j, k) = signed solid angle in units of π (integers)
    const n = TETRA.length,
      idx = [...Array(n).keys()];
    const F = idx.map((i) => idx.map((j) => idx.map((k) => solidAngle(TETRA[i], TETRA[j], TETRA[k]) / PI)));
    const integral = F.flat(2).every((v) => Math.abs(v - Math.round(v)) < 1e-9);
    const Fi = F.map((a) => a.map((b) => b.map((v) => Math.round(v))));
    const cob = (r, i, j, k) => Fi[i][j][k] - Fi[r][j][k] + Fi[r][i][k] - Fi[r][i][j];
    let defects = 0;
    const faceErrors = idx.map(() => 0),
      values = new Set();
    for (const r of idx)
      for (const i of idx)
        for (const j of idx)
          for (const k of idx) {
            const c = cob(r, i, j, k);
            if (c !== 0) {
              defects++;
              faceErrors[r]++;
              values.add(c);
            }
          }
    let edgeErrorsZero = 0;
    for (const i of idx) for (const j of idx) for (const k of idx) if (Fi[i][j][k] !== 0) edgeErrorsZero++;
    const tetra = {
      n,
      integral,
      defects,
      faceErrors,
      coboundaries: [...values].sort((a, b) => a - b),
      edgeErrorsZero,
      anchorBound: faceErrors.some((e) => n * e <= defects),
      edgeBound: defects <= 4 * n * edgeErrorsZero
    };
    // complete_consequences: the brackets of the frame generators are twice the cross product
    const brackets = [
      [0, 1, 2],
      [1, 2, 0],
      [2, 0, 1]
    ].map(([a, b, c]) => {
      const u = UNITS[a],
        v = UNITS[b],
        br = sub(qmul(u, v), qmul(v, u)),
        want = [0, ...scale(cross(u.slice(1), v.slice(1)), 2)];
      return { pair: [a + 1, b + 1], result: c + 1, gap: norm(sub(br, want)), bracket: br };
    });
    // the heap steps and the double cover: γ(π) = −A and the rotation of γ(π) equals that of A
    const xs = heapSteps(7);
    const RA = rotation(EX_A),
      Rpi = rotation(geodesic(PI));
    const coverGap = Math.max(...RA.flatMap((row, i) => row.map((x, j) => Math.abs(x - Rpi[i][j]))));
    const lift = {
      step3: norm(add(xs[3], EX_A)),
      step6: norm(sub(xs[6], EX_A)),
      endpoint: norm(add(geodesic(PI), EX_A)),
      rotationGap: coverGap,
      steps: xs.map((x) => Math.acos(Math.max(-1, Math.min(1, dot(EX_A, x)))) / deg)
    };
    // blochPure_surjective on the two hair zeros and the four gluing points
    const surjective = [...POLES, ...GLUE].map((rv) => {
      const th = Math.acos(rv[2]),
        ph = Math.atan2(rv[1], rv[0]);
      const v = [
        [cs(th / 2), 0],
        [cs(ph) * sn(th / 2), sn(ph) * sn(th / 2)]
      ];
      const b = bloch(v);
      return { r: rv, v, bloch: b, gap: norm(sub(b, rv)), unit: hypot(...v[0], ...v[1]) };
    });
    // fs_angle_triangle on A, B, [B, A, B] as unit vectors of ℂ²
    const fs = (a, b) => {
      const [u, v] = [spinor(a), spinor(b)];
      // ⟨u, v⟩ = conj(u₀) v₀ + conj(u₁) v₁
      const re = u[0][0] * v[0][0] + u[0][1] * v[0][1] + u[1][0] * v[1][0] + u[1][1] * v[1][1];
      const im = u[0][0] * v[0][1] - u[0][1] * v[0][0] + u[1][0] * v[1][1] - u[1][1] * v[1][0];
      return Math.acos(Math.min(1, hypot(re, im))) / deg;
    };
    const fsTriangle = { ab: fs(EX_A, EX_B), bh: fs(EX_B, HEAP), ah: fs(EX_A, HEAP) };
    fsTriangle.holds = fsTriangle.ah <= fsTriangle.ab + fsTriangle.bh + 1e-9;
    // unit_gram_overlap_characterization on A, B, [B, A, B], −A
    const records = [EX_A, EX_B, HEAP, scale(EX_A, -1)];
    const gram = records.map((a) => records.map((b) => dot(a, b)));
    const classes = records.map((_, i) => records.findIndex((_, j) => Math.abs(gram[i][j] - 1) < 1e-12));
    return { faceCycle, tetra, brackets, lift, surjective, fsTriangle, gram, gramClasses: new Set(classes).size };
  })();
  /** A point of S³ as a spinor of ℂ²: (x₀ + ix₁, x₂ + ix₃), entries [re, im]. */
  function spinor(q) {
    return [
      [q[0], q[1]],
      [q[2], q[3]]
    ];
  }
  /** bloch(v v†) = (2 Re ρ₀₁, −2 Im ρ₀₁, ρ₀₀ − ρ₁₁), ρ₀₁ = v₀ conj(v₁). */
  function bloch(v) {
    const [[a, b], [c, d]] = v;
    const re01 = a * c + b * d,
      im01 = b * c - a * d;
    return [2 * re01, -2 * im01, a * a + b * b - (c * c + d * d)];
  }
  function instances(m, cursorQ) {
    // the four-dimensional frame q·iⱼ at the sample points: tangent and orthonormal
    let gramGap = 0,
      tangentGap = 0,
      minProjected = Infinity;
    for (const q of FRAME_POINTS) {
      const E = UNITS.map((e) => qmul(q, e));
      E.forEach((a, i) => {
        tangentGap = Math.max(tangentGap, Math.abs(dot(a, q)));
        E.forEach((b, j) => (gramGap = Math.max(gramGap, Math.abs(dot(a, b) - (i === j ? 1 : 0)))));
        minProjected = Math.min(minProjected, norm(a.slice(1)));
      });
    }
    // parallelogram law with x = A − C, y = B − C
    const x = sub(EX_A, m.C),
      y = sub(EX_B, m.C);
    const parallelogram = { lhs: dot(add(x, y), add(x, y)) + dot(sub(x, y), sub(x, y)), rhs: 2 * (dot(x, x) + dot(y, y)) };
    // the partition by the readout d(A, ·) on A, Ā and the eighteen points of the wavefront
    const readouts = [0, PI, ...RAYS.map(() => m.r)].map((v) => Math.round(v * 1e12) / 1e12);
    const b = bloch(spinor(cursorQ));
    return {
      ...STATIC,
      frame: { points: FRAME_POINTS.length, gramGap, tangentGap, minProjected },
      hair: { zeros: POLES.length, indexSum: 2, euler: 2 },
      parallelogram,
      partition: { classes: new Set(readouts).size, readouts: readouts.length },
      blochNorm: { point: cursorQ, bloch: b, norm: norm(b) },
      objective: { contexts: BASES.length + 1, drift: m.heapDrift, factor: HEAP }
    };
  }

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const SCENES = {
    fill: { fill: 1, front: 0, rays: 0, trin: 0, orig: 0, door: 0, floor: 1, seam: 0.55, glue: 0.3 },
    trinity: { fill: 0, front: 1, rays: 0, trin: 1, orig: 0, door: 0, floor: 1, seam: 0.4, glue: 0.2 },
    origin: { fill: 0, front: 0, rays: 0, trin: 0, orig: 1, door: 0, floor: 0, seam: 0.4, glue: 0.2 },
    wave: { fill: 0, front: 1, rays: 1, trin: 0, orig: 0, door: 0, floor: 1, seam: 0.55, glue: 0.3 },
    heegaard: { fill: 1, front: 0, rays: 0, trin: 0, orig: 0, door: 1, floor: 0, seam: 1, glue: 1 }
  };
  const state = { scene: 'wave', phiDeg: 0, cam: 'panorama', lens: 0, from: null, blend: 1 };
  function layers() {
    const to = SCENES[state.scene];
    if (!state.from || state.blend >= 1) return { ...to };
    const out = {};
    for (const k of Object.keys(to)) out[k] = lerp(state.from[k], to[k], state.blend);
    return out;
  }
  const cams = { panorama: [-0.26, 0.36, 1], doorway: [0.5, 0.14, 1], top: [-0.12, 1.05, 1] };
  const presets = Object.fromEntries(
    [
      ['skyrmion-winding-self-lock', 'fill', 0, 'panorama', true, 'end'],
      ['field-wave-particle-trinity', 'trinity', 0, 'panorama', true, PI / 4],
      ['origin-free-no-point-c', 'origin', 0, 'top', true, (2 * PI) / 3],
      ['wavefront-outward-is-inward', 'wave', 0, 'panorama', true, (3 * PI) / 4],
      ['heegaard-antipodal-no-exterior', 'heegaard', 0, 'panorama', true, PI / 2]
    ].map(([id, scene, phiDeg, cam, play, still]) => [id, { scene, phiDeg, cam, play, still }])
  );
  const ids = Object.keys(presets);
  const DEFAULT = 'wavefront-outward-is-inward';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('frontHandle');
  const opts = { canvas: $('cv'), yaw: cams.panorama[0], pitch: cams.panorama[1], radius: 0.2, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const FLOOR_Z = -1.12,
    FLOOR_R = 2.2;
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  /** Fit the two balls, the floor and the labels above the balls into the stage between the title and the legend. */
  function fit() {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const v = cams[state.cam] || cams.panorama,
      { R, U } = basis(v[0], v[1]);
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity;
    const take = (p, pad = 0) => {
      const x = dot(p, R),
        y = dot(p, U);
      x0 = Math.min(x0, x - pad);
      x1 = Math.max(x1, x + pad);
      y0 = Math.min(y0, y - pad);
      y1 = Math.max(y1, y + pad);
    };
    take(LC, 1.04);
    take(RC, 1.04);
    if (SCENES[state.scene].floor > 0) for (let k = 0; k < 24; k++) take([FLOOR_R * cs((k * TAU) / 24), FLOOR_R * sn((k * TAU) / 24), FLOOR_Z]);
    else take([0, 0, -1.2]);
    take([0, 0, 1.32]);
    const box = stage.getBoundingClientRect();
    const tl = $('hudTl'),
      bl = $('legend');
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 6) : 12;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 6) : 12;
    const room = Math.max(40, H - top - bottom),
      side = 14;
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** The inner walls are shaded by the linear coordinate ψ = n·(x₁, x₂, x₃) of the seam point (another k = 1 mode), so one
      seam point has one colour on both balls and the shading moves when the camera turns. */
  const TILT = unit([0.55, 0.3, 0.78]);
  const wallValue = (c, sign) => (u, v, p) => {
    const d = sub(p, c);
    return TILT[0] * sign * d[0] + TILT[1] * d[1] + TILT[2] * d[2];
  };
  /** The half of the unit sphere around c that faces away from the viewer: the inner wall that the glass shows. */
  function backWall(key, c, sign) {
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1);
    const at = (u, v) => {
      const th = (PI / 2) * u,
        ph = TAU * v;
      return add(c, scale(add(scale(D, -cs(th)), add(scale(e1, sn(th) * cs(ph)), scale(e2, sn(th) * sn(ph)))), 0.985));
    };
    const val = wallValue(c, sign);
    sc.surface(key, at, { u: [0, 1], v: [0, 1], nu: 16, nv: 56, colors: [P.blue, P.violet], range: [-1, 1], value: (u, v) => val(u, v, at(u, v)) });
    return D;
  }
  /** The great circles x = 0, y = 0, z = 0 of a ball (the octahedral net of the seam), drawn on its inner wall only. */
  function netLines(c, D, alpha) {
    for (const n of [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]) {
      const e1 = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
        e2 = cross(n, e1);
      let run = [];
      for (let i = 0; i <= 96; i++) {
        const a = (TAU * i) / 96,
          d = add(scale(e1, cs(a)), scale(e2, sn(a)));
        if (dot(d, D) < 0.02) run.push(add(c, scale(d, 0.97)));
        else {
          if (run.length > 1) sc.line(run, { color: P.ink, width: 1, alpha });
          run = [];
        }
      }
      if (run.length > 1) sc.line(run, { color: P.ink, width: 1, alpha });
    }
  }
  /** A sphere around c, parametrized in world latitude and longitude about the x axis (its grid stays put when the camera turns). */
  const ballAt = (c, rad) => (u, v) => {
    const th = PI * u,
      ph = TAU * v;
    return add(c, scale([cs(th), sn(th) * cs(ph), sn(th) * sn(ph)], rad));
  };
  const WEDGE = { centre: -1.38, half: 0.82 };
  /** The swept shell of B_out between radius s and 1, opened by a fixed wedge so that the hole (the wavefront) shows. */
  function shell(s, alpha) {
    const a0 = WEDGE.centre + WEDGE.half,
      a1 = WEDGE.centre + TAU - WEDGE.half;
    const sph = (rad) => (u, v) => {
      const th = PI * u,
        ph = a0 + (a1 - a0) * v;
      return add(RC, scale([sn(th) * cs(ph), sn(th) * sn(ph), cs(th)], rad));
    };
    const val = wallValue(RC, -1);
    const style = (extra) => ({ colors: [P.blue, P.violet], range: [-1, 1], alpha, ...extra });
    const outer = sph(0.99);
    sc.surface('shellOuter', outer, { u: [0, 1], v: [0, 1], nu: 28, nv: 48, ...style({ value: (u, v) => val(u, v, outer(u, v)), grid: { every: [4, 6], alpha: 0.22 } }) });
    for (const [k, ph] of [
      ['shellCutA', a0],
      ['shellCutB', a1]
    ]) {
      const face = (u, v) => {
        const th = PI * u,
          rad = lerp(s, 0.99, v);
        return add(RC, scale([sn(th) * cs(ph), sn(th) * sn(ph), cs(th)], rad));
      };
      sc.surface(k, face, { u: [0, 1], v: [0, 1], nu: 24, nv: 6, ...style({ value: (u, v) => val(u, v, face(u, v)), grid: { every: [4, 2], alpha: 0.3 } }) });
    }
    if (s > 0.015) sc.surface('activeHole', sph(s), { u: [0, 1], v: [0, 1], nu: 24, nv: 40, color: P.amber, alpha });
  }
  const tube = (key, pts, color, r, extra = {}) => sc.tube(key, pts, { color, r, glow: 0.25, occlude: false, ...extra });

  function drawBalls(m, w, D) {
    for (const [key, c, sign] of [
      ['wallIn', LC, 1],
      ['wallOut', RC, -1]
    ]) {
      backWall(key, c, sign);
      netLines(c, D, 0.26);
      sc.glass(key + 'Glass', c, 1, { color: P.violet, alpha: 0.05, rim: 0.32 });
      sc.circle(c, D, 1.0, { fade: false, color: P.magenta, width: 1.6, alpha: 0.25 + 0.65 * w.seam });
    }
    // the seam points that the gluing joins: one pair per direction, a mark on each ball
    GLUE.forEach((n, k) => {
      sc.bead(add(LC, scale(n, 1.012)), { color: P.magenta, r: 3.4, key: 'glueIn' + k });
      sc.bead(add(RC, scale(mirror(n), 1.012)), { color: P.magenta, r: 3.4, key: 'glueOut' + k });
      if (w.glue > 0.01 && n[0] === 0)
        sc.line([add(LC, n), add(RC, mirror(n))], { color: P.magenta, width: 1.2, dash: [5, 5], alpha: 0.18 + 0.62 * w.glue });
    });
    if (w.floor > 0.01) {
      const a = 0.2 * w.floor;
      for (let k = 1; k <= 4; k++) sc.line(sample(72, (t) => [((FLOOR_R * k) / 4) * cs(t * TAU), ((FLOOR_R * k) / 4) * sn(t * TAU), FLOOR_Z]), { color: P.ink, width: 1, alpha: a });
      for (let k = 0; k < 12; k++) sc.line([[0, 0, FLOOR_Z], [FLOOR_R * cs((k * TAU) / 12), FLOOR_R * sn((k * TAU) / 12), FLOOR_Z]], { color: P.ink, width: 1, alpha: a });
    }
  }
  function drawFront(m, w, D) {
    const s = sn(m.r),
      seam = Math.abs(m.r - PI / 2) < 1e-9;
    const centres = seam ? [LC, RC] : [m.r <= PI / 2 ? LC : RC];
    // the swept ball: a solid in B_in, then a full B_in and the opened shell of B_out
    if (w.fill > 0.01) {
      const rin = m.r <= PI / 2 ? Math.min(0.99, s) : 0.99;
      if (rin > 0.01)
        {
          const ball = ballAt(LC, rin),
            val = wallValue(LC, 1);
          sc.surface('fillIn', ball, { u: [0, 1], v: [0, 1], nu: 30, nv: 48, colors: [P.blue, P.violet], range: [-rin, rin], value: (u, v) => val(u, v, ball(u, v)), alpha: w.fill, grid: { every: [5, 6], alpha: 0.22 } });
        }
      if (m.r > PI / 2 + 1e-9) shell(Math.min(0.99, s), w.fill);
    }
    const ringAlpha = Math.max(w.fill, w.front);
    if (ringAlpha > 0.01 && s > 0.004)
      for (const c of centres) sc.circle(c, D, Math.min(1.004, s * 1.004 + 0.002), { fade: false, color: P.amber, width: 2.2, alpha: ringAlpha, key: 'activeRing' });
    const glassAlpha = 0.2 * w.front * (1 - w.fill);
    if (glassAlpha > 0.005 && s > 0.01)
      for (const c of centres) sc.surface(c === LC ? 'activeFrontIn' : 'activeFrontOut', ballAt(c, Math.min(0.975, s)), { u: [0, 1], v: [0, 1], nu: 24, nv: 40, color: P.amber, alpha: glassAlpha });
    // the geodesic rays from A: straight in the chart; past the seam they run inwards to Ā
    if (w.rays > 0.01)
      RAYS.forEach((n, k) => {
        const inner = m.r <= PI / 2 ? s : 1;
        if (inner > 0.004) tube('rayIn' + k, [LC, add(LC, scale(n, inner))], P.cyan, 0.0065, { alpha: w.rays });
        if (m.r > PI / 2) tube('rayOut' + k, [add(RC, mirror(n)), add(RC, scale(mirror(n), Math.max(0.0015, s)))], P.cyan, 0.0065, { alpha: w.rays });
      });
    if (w.door > 0.01) sc.line([DOOR, RC], { color: P.cyan, width: 1.8, dash: [6, 5], alpha: w.door });
  }
  /** The projected left-invariant frame q·iⱼ (mirrored in B_out). */
  const projectedFrame = (q) => UNITS.map((e) => {
    const v = qmul(q, e).slice(1);
    return q[0] >= 0 ? v : mirror(v);
  });
  const wavePoint = (r) => add(axisPoint(r), [0, 0, 0.55 * cs(r)]);
  function drawTrinity(m, w) {
    if (w.trin < 0.01) return;
    const a = w.trin;
    for (const q of FRAME_POINTS) {
      const p = chart(q);
      for (const v of projectedFrame(q)) sc.arrow(p, add(p, scale(v, 0.2)), { color: P.cyan, width: 1.7, headSize: 7, alpha: a });
    }
    // the rotation field ẑ × n on the seam of B_in: zero at the two poles
    for (const [lat, count] of [[-68, 6], [-40, 9], [-12, 10], [12, 10], [40, 9], [68, 6]])
      for (let k = 0; k < count; k++) {
        const th = (90 - lat) * deg,
          ph = (k * TAU) / count + lat * 0.01;
        const n = [sn(th) * cs(ph), sn(th) * sn(ph), cs(th)],
          t = cross([0, 0, 1], n),
          p = add(LC, scale(n, 1.012));
        sc.arrow(add(p, scale(t, -0.1)), add(p, scale(t, 0.13)), { color: P.magenta, width: 1.6, headSize: 6, alpha: a });
      }
    POLES.forEach((n, k) => {
      sc.ring(add(LC, scale(n, 1.03)), { color: P.magenta, normal: n, r: 9, alpha: a, key: 'vortex' + k });
      sc.bead(add(LC, scale(n, 1.03)), { color: P.magenta, r: 2.6, alpha: a, key: 'zero' + k });
    });
    // ψ₀ = cos r along the doorway geodesic, as a height; the axis is its zero level
    sc.line([LC, RC], { color: P.sigma, width: 1, alpha: 0.5 * a });
    tube('wave', sample(120, (t) => wavePoint(t * PI)), P.cyan, 0.012, { alpha: a });
  }
  function drawOrigin(m, w) {
    if (w.orig < 0.01) return;
    const a = w.orig;
    chartPath(sample(180, (t) => geodesic(t * TAU))).forEach((run, k) => tube('heapCircle' + k, run, P.cyan, 0.008, { alpha: 0.85 * a }));
    const steps = heapSteps(4);
    steps.forEach((x, k) => {
      const color = k < 2 ? P.sigma : P.cyan,
        r = k < 2 ? 4.6 : 5;
      if (Math.abs(x[0]) > 1e-9) sc.bead(chart(x), { color, r, alpha: a, key: 'heap' + k });
      else for (const side of ['in', 'out']) sc.bead(chart(x, side), { color, r, alpha: a, key: 'heap' + k + side });
    });
    // the external point C(φ) on the great circle C₁ → C₂ → −1, the affine sum at its direction and its drift
    const C = m.C;
    sc.ring(chart(C1), { color: P.magenta, r: 6, alpha: 0.7 * a, key: 'pinC1' });
    sc.ring(chart(C2, 'in'), { color: P.magenta, r: 6, alpha: 0.7 * a, key: 'pinC2' });
    sc.bead(chart(C), { color: P.magenta, r: 4.4, alpha: a, key: 'pinC' });
    const trail = sample(90, (t) => {
      const v = sub(add(EX_A, EX_B), pinPoint(180 * t));
      return chart(unit(v));
    });
    sc.line(trail, { color: P.magenta, width: 1.3, dash: [3, 4], alpha: 0.7 * a });
    sc.bead(chart(unit(m.affine)), { color: P.magenta, r: 5.2, alpha: a, key: 'affine' });
    sc.line([chart(C), chart(unit(m.affine))], { color: P.magenta, width: 1, dash: [2, 4], alpha: 0.6 * a });
  }

  /* ---------- labels ---------- */
  const SCENE_NAME = {
    fill: ['自锁成粒', 'SELF-LOCK'],
    trinity: ['场·波·粒', 'FIELD · WAVE · PARTICLE'],
    origin: ['去掉 C 点', 'NO POINT C'],
    wave: ['向外即向内', 'OUTWARD IS INWARD'],
    heegaard: ['双球粘合', 'TWO BALLS GLUED']
  };
  const LENS_NAME = [
    ['本体', 'ONTOLOGY'],
    ['ℝ⁴ 坐标', 'ℝ⁴ COORDINATES']
  ];
  function tags(m, w) {
    const coord = state.lens === 1,
      origin = w.orig > 0.5;
    const up = basis(sc.cam.yaw, sc.cam.pitch).U,
      near = (p, k) => add(p, scale(up, k));
    const T = (key, p, html, cls = 'raw backed c-ik') => sc.tag(key, p, html, cls);
    T('ctr', near(LC, -0.17), coord ? '(1, 0, 0, 0)' : origin ? 'C₁ = 1' : 'A');
    T('anti', near(RC, -0.17), coord ? '(−1, 0, 0, 0)' : origin ? '−1' : 'Ā');
    if (!origin) {
      T('bin', [-1, 0, 1.24], coord ? 'x₀ ≥ 0' : 'B<sub>in</sub>³ · π²', 'raw backed c-vi');
      T('bout', [1, 0, 1.24], coord ? 'x₀ ≤ 0' : 'B<sub>out</sub>³ · π²', 'raw backed c-vi');
    }
    if (w.seam > 0.5 || w.door > 0.5) T('seam', near(DOOR, -0.3), coord ? 'x₀ = 0' : 'S²<sub>eq</sub>', 'raw backed c-mg');
    if (w.fill > 0.5 && w.door < 0.5) T('wind', [0, 0, 1.24], `Q = ${fmt(m.share)}`, 'raw backed c-vi');
    if (w.trin > 0.5) {
      T('field', add(LC, [-0.62, -0.5, -0.5]), 'Λ³ · e₁e₂e₃', 'raw backed c-cy');
      T('wavelab', near(wavePoint(PI * 0.8), -0.2), 'Λ¹ · ψ₀ = cos r', 'raw backed c-cy');
      T('hair', add(LC, [-0.55, 0, 1.08]), 'S² · χ = 2', 'raw backed c-mg');
      T('particle', [0, 0, 1.24], 'Λ⁰ · Q = 1', 'raw backed c-vi');
    }
    if (origin) {
      const steps = heapSteps(4);
      T('pA', near(chart(steps[0]), 0.14), 'A');
      T('pB', near(chart(steps[1]), 0.14), 'B');
      T('pH', add(chart(steps[2], 'in'), scale(basis(sc.cam.yaw, sc.cam.pitch).R, -0.36)), '[B, A, B]', 'raw backed c-cy');
      T('pX', near(chart(steps[3]), 0.15), '−A', 'raw backed c-cy');
      T('pC2', near(chart(C2, 'in'), 0.15), 'C₂', 'raw backed c-mg');
      T('pAff', near(chart(unit(m.affine)), -0.15), `A + B − C · ${fmt(m.affineNorm2)}`, 'raw backed c-mg');
    }
  }
  function subline(m, w) {
    const s = state.scene;
    if (s === 'fill') {
      if (m.r >= PI - 1e-9) return L('r = π：两只球都填满，Q = 1，边界面积为 0，∂𝕋₃ = ∅。', 'r = π: both balls are full, Q = 1, the boundary has area 0 and ∂𝕋₃ = ∅.');
      return L(`扫过 Q = ${fmt(m.share)}；琥珀边界面积 ${fmt(m.area)}，只在 r = 0 与 π 时为 0。`, `Swept Q = ${fmt(m.share)}; the amber boundary has area ${fmt(m.area)}, zero only at r = 0 and π.`);
    }
    if (s === 'trinity') return L('青色标架处处非零，品红毛发在 S² 两极归零；青色驻波 ψ₀ = cos r。', 'The cyan frames never vanish, the magenta hair on S² vanishes at two poles; the cyan wave is ψ₀ = cos r.');
    if (s === 'origin') return L(`品红仿射和随 C 漂移（φ = ${fmt(m.phiDeg, 0)}°），青色堆步 [B, A, B] 留在壳上不动。`, `The magenta affine sum drifts with C (φ = ${fmt(m.phiDeg, 0)}°); the cyan heap step [B, A, B] stays on the shell.`);
    if (s === 'heegaard') return L('接缝两侧各是一只有限球，体积都是 π²；越过接缝仍在体内。', 'Each side of the seam is a finite ball of volume π²; past the seam you are still inside.');
    if (m.r <= PI / 2) return L(`波前在左球里扩张：A(r) = ${fmt(m.area)}，r = π/2 时达到 4π。`, `The wavefront grows in the left ball: A(r) = ${fmt(m.area)}, reaching 4π at r = π/2.`);
    return L(`越过接缝，射线没有折返，波前却收拢：A(r) = ${fmt(m.area)}，r = π 时收成 ${AB}。`, `Past the seam the rays do not turn back, yet the wavefront closes up: A(r) = ${fmt(m.area)}, the point ${AB} at r = π.`);
  }
  function bigline(m) {
    const name = L(...SCENE_NAME[state.scene]);
    const key = {
      fill: `Q = ${fmt(m.share)}`,
      trinity: `ψ₀ = ${signed(m.psi)}`,
      origin: `‖A + B − C‖² = ${fmt(m.affineNorm2)}`,
      wave: `A(r) = ${fmt(m.area)}`,
      heegaard: 'π² + π² = 2π²'
    }[state.scene];
    return `${name} · ${key}`;
  }
  function legendItems() {
    const coord = state.lens === 1;
    const items = [['vi', coord ? L('x₀ ≥ 0 与 x₀ ≤ 0 的投影', 'projections of x₀ ≥ 0, x₀ ≤ 0') : L('𝕋₃ 的两半', 'the two halves of 𝕋₃')], ['am', L('当前的 r', 'the current r')]];
    const s = state.scene;
    if (s === 'trinity') items.push(['cy', L('标架与驻波', 'frames and the wave')], ['mg', L('S² 上的毛发与零点', 'hair on S², its zeros')]);
    else if (s === 'origin') items.push(['cy', L('堆步与它的大圆', 'heap steps, their great circle')], ['mg', L('C 与仿射和', 'C and the affine sum')]);
    else if (s === 'wave') items.push(['cy', L('测地射线', 'geodesic rays')], ['mg', L('接缝 S²', 'the seam S²')]);
    else if (s === 'heegaard') items.push(['cy', L('越过门口的测地线', 'the geodesic past the doorway')], ['mg', L('接缝与粘合', 'seam and gluing')]);
    else items.push(['mg', L('接缝 S²', 'the seam S²')]);
    return items;
  }
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = subline(m, layers());
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const list = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of list) tag.style.translate = '';
    const boxes = list.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx,
          top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        list[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  /** Where the amber point of the current scene sits at radius r. */
  function cursorWorld(r) {
    if (state.scene === 'origin') return chart(geodesic(r));
    if (state.scene === 'trinity') return wavePoint(r);
    return add(axisPoint(r), [0, 0, 0]);
  }
  /** The point of S³ the amber cursor stands for. */
  const cursorQ = (r) => (state.scene === 'origin' ? geodesic(r) : [cs(r), sn(r), 0, 0]);
  function drawStage(m) {
    const w = layers();
    fit();
    sc.begin();
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    drawBalls(m, w, D);
    drawFront(m, w, D);
    drawTrinity(m, w);
    drawOrigin(m, w);
    sc.bead(cursorWorld(m.r), { color: P.amber, r: 5, key: 'cursor' });
    tags(m, w);
    sc.end();
    const q = sc.p(cursorWorld(m.r));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strip: along r, the area peaks at the seam and the volume fills up ---------- */
  const curve = sample(240, (t) => {
    const r = t * PI;
    return [r, sn(r) ** 2, (2 * r - sn(2 * r)) / (2 * PI), cs(r)];
  });
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('沿 r：波前面积在接缝处最大，包住的体积一路填满', 'Along r: the wavefront area peaks at the seam, the enclosed volume fills up');
    $('plotMeta').textContent = 'A(π/2) = 4π · V(π) = 2π²';
    const g = kit.plot(cv, { x: [0, PI], y: [-1.1, 1.1], pad: [32, 14, 12, 22] });
    g.axes({ xTicks: [[0, '0'], [PI / 4, 'π/4'], [PI / 2, 'π/2'], [(3 * PI) / 4, '3π/4'], [PI, 'π']], yTicks: [-1, 0, 0.5, 1], xLabel: 'r' });
    g.vline(PI / 2, P.magenta, { alpha: 0.45, dash: [3, 4] });
    [P.cyan, P.violet, P.sigma].forEach((color, i) => g.line(curve.map((row) => [row[0], row[i + 1]]), color, { width: 2 }));
    g.vline(m.r, P.amber);
    g.dot(m.r, sn(m.r) ** 2, P.amber, 3.5);
    g.legend([
      [P.cyan, 'A/4π = sin² r'],
      [P.violet, 'V/2π²'],
      [P.sigma, 'ψ₀ = cos r']
    ]);
  }

  /* ---------- readouts ---------- */
  function note(m, I) {
    const s = state.scene;
    if (s === 'trinity')
      return L(
        `标架的四维格拉姆矩阵在 ${I.frame.points} 处取样都等于 I（偏差 ${fmt(I.frame.gramGap)}）；S² 毛发的零点 ${I.hair.zeros} 个，指标和 ${I.hair.indexSum} = χ(S²)；χ(S³) = 0。`,
        `The four-dimensional Gram matrix of the frame is I at all ${I.frame.points} samples (gap ${fmt(I.frame.gramGap)}); the hair on S² has ${I.hair.zeros} zeros of index sum ${I.hair.indexSum} = χ(S²); χ(S³) = 0.`
      );
    if (s === 'origin')
      return L(
        `d(A, B) = ${fmt(m.angleAB, 2)}°，κ(A, B) = ${fmt(m.kappaAB)}；钉住 C = 1 后 dim SO(4) = ${m.dims.so4} → dim SO(3) = ${m.dims.so3}。`,
        `d(A, B) = ${fmt(m.angleAB, 2)}°, κ(A, B) = ${fmt(m.kappaAB)}; pinning C = 1 lowers dim SO(4) = ${m.dims.so4} to dim SO(3) = ${m.dims.so3}.`
      );
    if (s === 'heegaard')
      return L(`两只球的体积都是 π² = ${fmt(PI * PI)}，合起来 2π² = ${fmt(m.totalVolume)}。`, `Both balls have volume π² = ${fmt(PI * PI)}, together 2π² = ${fmt(m.totalVolume)}.`);
    if (s === 'fill')
      return L(`体积有限：2π² = ${fmt(m.totalVolume)}；边界面积 4π sin² r 只在 r = 0、π 为 0。`, `A finite volume, 2π² = ${fmt(m.totalVolume)}; the boundary area 4π sin² r is zero only at r = 0 and π.`);
    return L(`κ = cos²(r/2) = ${fmt(m.kappa)}；A(r) 在 r = π/2 最大，为 4π = ${fmt(4 * PI)}。`, `κ = cos²(r/2) = ${fmt(m.kappa)}; A(r) is largest at r = π/2, 4π = ${fmt(4 * PI)}.`);
  }
  function readings(m, I) {
    $('roKey').textContent = fmt(m.area);
    $('roKeySub').textContent = ` · r = ${fmt(m.r)} (${fmt(m.r / deg, 2)}°) · κ = ${fmt(m.kappa)}`;
    $('roVol').textContent = `${fmt(m.volume)} · ${fmt(100 * m.share)}%`;
    $('roWind').textContent = `${fmt(m.share)} · ∂ ${m.boundaryEmpty ? '= ∅' : '≠ ∅'}`;
    $('roWave').textContent = `ψ₀ = ${signed(m.psi)} · Δψ₀ + 3ψ₀ = ${fmt(Math.abs(m.waveResidual))}`;
    $('roAff').textContent = `${fmt(m.affineNorm2)} (φ = ${fmt(m.phiDeg, 0)}°) · C₁ ${fmt(m.aff1Norm2)} · C₂ ${fmt(m.aff2Norm2)}`;
    $('roHeap').textContent = `${fmt(m.heapNorm2)} · ${L('偏差', 'drift')} ${fmt(m.heapDrift)} · ‖[A, C, C] − A‖ = ${fmt(m.bridge)}`;
    $('roNote').textContent = note(m, I);
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene])}</strong>`;
    $('keyPill').innerHTML = `A(r) <strong>${fmt(m.area)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改 r · 拖空白处转视角 · 空格播放', 'drag the amber handle to set r · drag empty space to orbit · Space plays');
    $('formula').textContent = 'A(r) = 4π sin² r · V(r) = π(2r − sin 2r)';
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
  }
  const calc = () => compute(clock.t, state.phiDeg);
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m, cursorQ(m.r));
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: the geodesic radius r ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: PI / 9,
    step: PI / 24,
    max: PI,
    format: (t) => `r ${t.toFixed(4)}`,
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => {
    stopBootPlay();
    clock.toggle();
  });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopBootPlay();
      clock.pause();
      clock.set(0);
    });

  /* a card that plays inside a book starts once the stage is half in view and pauses when it leaves; the first touch
     of the reader ends this for good */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (seen && !started) {
          started = true;
          clock.play();
        } else if (!seen && clock.playing) clock.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    bootIO.observe(stage);
  }
  function stopBootPlay() {
    if (bootIO) {
      bootIO.disconnect();
      bootIO = null;
    }
  }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => {
    if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay();
  }, true);

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  /** Blend the layers from `from` to the scene of the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => {
      if (token.run) token.run.cancel();
      state.blend = 1;
      state.from = null;
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.blend = e;
        paint();
      },
      () => {
        if (transition === token) transition = null;
        state.blend = 1;
        state.from = null;
        paint();
      }
    );
  }
  function setScene(scene, ms) {
    if (scene === state.scene && !state.from) return;
    const before = layers();
    state.scene = scene;
    if (ms > 0 && !TRV.still) startBlend(before, ms);
    else {
      if (transition) transition.cancel();
      transition = null;
      state.from = null;
      state.blend = 1;
    }
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopBootPlay();
    cards.mark(null);
    clock.pause();
  }
  const cf = kit.field($('pinC'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      state.phiDeg = v;
      if (state.scene !== 'origin') {
        setScene('origin', 600);
        if (state.cam !== 'top') camChips.set('top');
      }
      paint();
    }
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    state.lens = state.lens ? 0 : 1;
    paint();
  });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'skyrmion-winding-self-lock': [
      'r 从 0 走到 π：紫色体积先填满左球、再填满右球，扫过的 Q 从 0 走到 1；琥珀边界只在两端消失，填到一半时边界最大。',
      'As r runs from 0 to π, the violet volume fills the left ball and then the right one, and the swept Q goes from 0 to 1; the amber boundary vanishes only at the two ends and is largest when half is filled.'
    ],
    'field-wave-particle-trinity': [
      '青色标架在两只球里处处非零，品红毛发在 S² 两极留下两个旋涡零点；青色曲线是 k = 1 驻波 ψ₀ = cos r，整体积分读出 Q = 1。',
      'The cyan frames are nonzero everywhere in both balls, the magenta hair on S² keeps two vortex zeros at its poles; the cyan curve is the k = 1 standing wave ψ₀ = cos r, and the whole integral reads Q = 1.'
    ],
    'origin-free-no-point-c': [
      '品红的仿射和 A + B − C 要先钉 C：C₁ 给模方 1.1716，C₂ 给 4.0000，都不在壳上；青色堆步 [B, A, B] 落在接缝上，模方 1，换基点也不动。',
      'The magenta affine sum A + B − C needs a pinned C: C₁ gives the squared norm 1.1716 and C₂ gives 4.0000, both off the shell; the cyan heap step [B, A, B] lies on the seam with squared norm 1 and does not move with the base point.'
    ],
    'wavefront-outward-is-inward': [
      `琥珀波前从 A 长到接缝，面积 4π、包住一半体积；越过接缝进入右球后收拢，r = π 时在 ${AB} 收成一点。青色射线没有折返。`,
      `The amber wavefront grows from A to the seam, area 4π, half the volume inside; past the seam it closes up in the right ball and becomes the point ${AB} at r = π. The cyan rays never turn back.`
    ],
    'heegaard-antipodal-no-exterior': [
      `r = π/2 时波前就是接缝 S²：左球填满 π²，右球是以 ${AB} 为心的另一半 π²；品红虚线连起接缝上同一点的两个画像，坐标底板已撤去。`,
      `At r = π/2 the wavefront is the seam S²: the left ball holds π², the right ball around ${AB} is the other π²; the magenta dashed lines join the two pictures of one seam point, and the coordinate floor is gone.`
    ]
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    'skyrmion-winding-self-lock': ['r = π：两只球都填满，Q = 1，边界面积为 0。', 'r = π: both balls are full, Q = 1, the boundary area is 0.'],
    'field-wave-particle-trinity': ['青色标架处处非零，品红毛发有两个零点；驻波 ψ₀ = 0.7071。', 'Cyan frames never vanish, the magenta hair has two zeros; the wave reads ψ₀ = 0.7071.'],
    'origin-free-no-point-c': ['仿射和的模方 1.1716 与 4.0000，青色堆步的模方是 1。', 'The affine sums have squared norms 1.1716 and 4.0000; the cyan heap step has 1.'],
    'wavefront-outward-is-inward': [`r = 3π/4：波前面积 6.2832，体积占 90.92%，射线向 ${AB} 收拢。`, `r = 3π/4: wavefront area 6.2832, 90.92% of the volume, rays closing on ${AB}.`],
    'heegaard-antipodal-no-exterior': ['接缝两侧各 π²，合起来 2π² = 19.7392。', 'Each side of the seam holds π², together 2π² = 19.7392.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    state.phiDeg = p.phiDeg;
    cf.set(p.phiDeg);
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) {
      if (booting) bootAutoplay();
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
    idle: [
      '自由探索：拖琥珀手柄或时间轴改 r，移动 C，换透镜或视角。随时可以再选一张卡。',
      'Free play: drag the amber handle or the rail to set r, move C, switch the lens or the view. Pick a card again at any time.'
    ]
  });
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag along the path of the current scene, or arrow keys ---------- */
  const viewportPoint = (r) => {
    const q = sc.p(cursorWorld(r)),
      b = $('cv').getBoundingClientRect();
    return { x: b.left + q[0], y: b.top + q[1] };
  };
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= 1440; k++) {
      const r = (k / 1440) * PI,
        p = sc.p(cursorWorld(r)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(clock.t - r) * 1e-6;
      if (d < gap) {
        gap = d;
        best = r;
      }
    }
    clock.set(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? PI : clock.t + (ev.key === 'ArrowLeft' ? -1 : 1) * deg);
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  window.TERNION_NO_EXTERIOR_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return JSON.parse(
        JSON.stringify({
          ...m,
          scene: state.scene,
          lens: state.lens,
          cam: state.cam,
          layers: layers(),
          t: clock.t,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          cursor: cursorQ(m.r),
          leanInstances: instances(m, cursorQ(m.r))
        })
      );
    },
    /** The mathematics at any radius r and angle φ of C (degrees), without touching the page. */
    calc: (r, phiDeg = 0) => JSON.parse(JSON.stringify(compute(r, phiDeg))),
    presets: JSON.parse(JSON.stringify(presets)),
    /** Viewport coordinates of the amber handle at radius r in the current scene, for drag targets. */
    dragTarget: viewportPoint
  });
  window.TRV_THUMB = () => {
    cards.pick(DEFAULT);
    clock.pause();
    clock.set((3 * PI) / 4);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
