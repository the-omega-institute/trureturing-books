/* AXIOM//OMEGA · 无源三元比较闭合沙盘 · One axiom, four faces (Chapter 39, §39.1)
   World (kit.solid): z up. In the centre the stereographic chart of S³ from −1 (a quaternion q = (w, v) is drawn at
   v / (1 + w)): the violet unit sphere is the set of pure unit quaternions (90° from 1, the unit sphere of su(2)), with
   the wedge 0 < azimuth < 90° cut away; its two walls are shaded by κ(1, q) = 1 / (1 + r²). Around it four stations:
     upper left   d = 1, 2: the line ℝ (x − y + z = z − y + x) and the plane of aff(1) ([H, E] = E), whose Ad flow
                  exp(s ad H) stretches the cyan unit circle into the magenta ellipse e^s times as tall.
     upper right  d = 3: the unit balls of H₃(ℝ) (shear), sl(2, ℝ) (stretch e^s) and su(2) (rotation) under Ad flows.
     lower left   the three-anchor Gram matrix G₃ of the chosen kernel: the rows of its Cholesky factor drawn as three
                  arrows; the parallelepiped they span has volume √det G₃.
     lower right  B₋, the other half of S³ (chart from +1, drawn at 0.42 scale): the boundary of the geodesic ball
                  B(1, d) shrinks back to −1 in it.
   Below, the dimension ruler d = 1, 2, 3, 4, 6, 8.
   Cards pick a focus; the rail s ∈ [0, 1] drives one quantity of the focus (carry, Ad flow, opening of the anchors,
   d = πs) and leaves the other stations at s = 1. The amber handle is the bridge o on the path x → 1 → z.
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.AXIOM_OMEGA_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    DEG = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const lerp = (a, b, u) => a + (b - a) * u;
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const rotAbout = (v, n, a) => add(add(scale(v, cs(a)), scale(cross(n, v), sn(a))), scale(n, dot(n, v) * (1 - cs(a))));
  const fmt = (x, k = 4) => (!Number.isFinite(x) ? '∞' : (Math.abs(x) < 0.5 * 10 ** -k ? 0 : x).toFixed(k));
  const signed = (x, k = 4) => (Number.isFinite(x) && x < 0 && Math.abs(x) >= 0.5 * 10 ** -k ? '−' + fmt(-x, k) : fmt(x, k));

  /* ---------- quaternions [w, x, y, z] = w + x i + y j + z k ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = (a) => [a[0], -a[1], -a[2], -a[3]];
  /** The ternary comparison of unit quaternions: [x, y, z] = x y⁻¹ z. */
  const heap = (x, y, z) => qmul(qmul(x, qconj(y)), z);
  const qgap = (a, b) => norm(sub(a, b));
  /** g^s along the one-parameter subgroup through the unit quaternion g. */
  function qpow(g, s) {
    const w = Math.max(-1, Math.min(1, g[0])),
      ang = Math.acos(w),
      si = sn(ang);
    if (si < 1e-12) return w > 0 ? [1, 0, 0, 0] : [cs(PI * s), 0, 0, sn(PI * s)];
    const k = sn(s * ang) / si;
    return [cs(s * ang), g[1] * k, g[2] * k, g[3] * k];
  }
  /** Stereographic chart of S³ from −1. */
  const chart = (q) => scale([q[1], q[2], q[3]], 1 / (1 + q[0]));
  /** The mother kernel κ = cos²(d/2) = (1 + ⟨x, y⟩)/2 on unit quaternions. */
  const kappa = (a, b) => (1 + dot(a, b)) / 2;
  const ONE = [1, 0, 0, 0],
    QI = [0, 1, 0, 0],
    QJ = [0, 0, 1, 0],
    QK = [0, 0, 0, 1];
  const XQ = QI,
    ZQ = QJ;
  /** The bridge o on the path x = i → 1 → z = j: b ∈ [0, 2], arc length πb/2. */
  function bridgeAt(b) {
    if (b <= 1) {
      const h = (PI * b) / 2;
      return [sn(h), cs(h), 0, 0];
    }
    const h = (PI * (b - 1)) / 2;
    return [cs(h), 0, sn(h), 0];
  }
  const qunit = (q) => scale(q, 1 / norm(q));
  const UQ = qunit([0.3, -0.5, 0.7, 0.4]),
    VQ = qunit([-0.6, 0.2, 0.1, 0.75]);
  /** Laws (I) and (II) at the bridge o: each residual is a distance that should vanish. */
  function laws(o) {
    const phi = (q) => qmul(qmul(q, qconj(o)), ONE); // ⋆o → ⋆1, o ↦ 1
    const r = {
      cancelLeft: qgap(heap(XQ, XQ, ZQ), ZQ),
      cancelRight: qgap(heap(XQ, ZQ, ZQ), XQ),
      associative: qgap(heap(heap(XQ, o, ZQ), UQ, VQ), heap(XQ, o, heap(ZQ, UQ, VQ))),
      unit: qgap(heap(o, o, XQ), XQ),
      inverse: qgap(heap(XQ, o, heap(o, XQ, o)), o),
      rightInvariant: Math.abs(kappa(heap(XQ, UQ, VQ), heap(ZQ, UQ, VQ)) - kappa(XQ, ZQ)),
      leftInvariant: Math.abs(kappa(heap(UQ, VQ, XQ), heap(UQ, VQ, ZQ)) - kappa(XQ, ZQ)),
      isomorphism: qgap(phi(heap(XQ, o, ZQ)), heap(phi(XQ), ONE, phi(ZQ)))
    };
    return { ...r, max: Math.max(...Object.values(r)) };
  }

  /* ---------- small real matrices ---------- */
  const zeros = (n) => Array.from({ length: n }, () => new Array(n).fill(0));
  const eye = (n) => zeros(n).map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
  const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
  const madd = (A, B, k = 1) => A.map((row, i) => row.map((x, j) => x + k * B[i][j]));
  const mT = (A) => A[0].map((_, j) => A.map((row) => row[j]));
  const mapply = (A, v) => A.map((row) => dot(row, v));
  const trace = (A) => A.reduce((s, row, i) => s + row[i], 0);
  /** exp(A) by its power series (the flows here have ‖A‖ ≤ π). */
  function expm(A) {
    let term = eye(A.length),
      sum = eye(A.length);
    for (let k = 1; k <= 40; k++) {
      term = mmul(term, A).map((row) => row.map((x) => x / k));
      sum = madd(sum, term);
    }
    return sum;
  }
  /** Eigenvalues of a small symmetric matrix by cyclic Jacobi rotations. */
  function symEig(S) {
    const A = S.map((row) => row.slice()),
      n = A.length;
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] ** 2;
      if (off < 1e-30) break;
      for (let p = 0; p < n; p++)
        for (let q = p + 1; q < n; q++) {
          if (Math.abs(A[p][q]) < 1e-300) continue;
          const th = (A[q][q] - A[p][p]) / (2 * A[p][q]);
          const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
          const c = 1 / Math.sqrt(t * t + 1),
            s = t * c;
          for (let k = 0; k < n; k++) {
            const a = A[k][p],
              b = A[k][q];
            A[k][p] = c * a - s * b;
            A[k][q] = s * a + c * b;
          }
          for (let k = 0; k < n; k++) {
            const a = A[p][k],
              b = A[q][k];
            A[p][k] = c * a - s * b;
            A[q][k] = s * a + c * b;
          }
        }
    }
    return A.map((row, i) => row[i]).sort((a, b) => b - a);
  }
  const opNorm = (M) => Math.sqrt(Math.max(0, symEig(mmul(mT(M), M))[0]));

  /* ---------- 2 × 2 complex matrices, entries [re, im] ---------- */
  const cx = (re, im = 0) => [re, im];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cmm = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => { const p = cmul(x, B[k][j]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0])));
  const cadd = (A, B, k = 1) => A.map((row, i) => row.map((x, j) => [x[0] + k * B[i][j][0], x[1] + k * B[i][j][1]]));
  const cscale = (A, z) => A.map((row) => row.map((x) => cmul(x, z)));
  const cdag = (A) => A[0].map((_, j) => A.map((row) => [row[j][0], -row[j][1]]));
  const cgap = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
  const ctrace = (A) => [A[0][0][0] + A[1][1][0], A[0][0][1] + A[1][1][1]];
  const CI = [[cx(1), cx(0)], [cx(0), cx(1)]];
  const SIG = [
    [[cx(0), cx(1)], [cx(1), cx(0)]],
    [[cx(0), cx(0, -1)], [cx(0, 1), cx(0)]],
    [[cx(1), cx(0)], [cx(0), cx(-1)]]
  ];
  /** eⱼ = −iσⱼ: the basis of su(2) as 2 × 2 matrices. */
  const EB = SIG.map((s) => cscale(s, cx(0, -1)));
  /** The brackets [eₐ, e_b] of the 2 × 2 matrices, read back in the basis e (Tr(eₐ e_b) = −2δ). */
  const SU2_BRACKETS = EB.map((A) =>
    EB.map((B) => {
      const C = cadd(cmm(A, B), cmm(B, A), -1);
      return EB.map((E) => -ctrace(cmm(C, E))[0] / 2);
    })
  );
  const levi = (i, j, k) => ((i - j) * (j - k) * (k - i)) / 2;
  const su2BracketResidual = Math.max(
    ...SU2_BRACKETS.flatMap((row, i) => row.flatMap((v, j) => v.map((c, k) => Math.abs(c - 2 * levi(i, j, k)))))
  );
  /** A unit quaternion as the 2 × 2 unitary w I + x e₁ + y e₂ + z e₃. */
  const quatMatrix = (q) => [CI, ...EB].reduce((S, M, k) => cadd(S, cscale(M, cx(q[k]))), [[cx(0), cx(0)], [cx(0), cx(0)]]);

  /* ---------- the candidate Lie algebras: structure constants br[i][j] = [eᵢ, eⱼ] ---------- */
  const bracketTable = (n, rules) => {
    const br = Array.from({ length: n }, () => Array.from({ length: n }, () => new Array(n).fill(0)));
    for (const [i, j, k, c] of rules) {
      br[i][j][k] += c;
      br[j][i][k] -= c;
    }
    return br;
  };
  const ALG = {
    aff: { br: bracketTable(2, [[0, 1, 1, 1]]), gen: [1, 0] }, // H, E: [H, E] = E; flow exp(s ad H)
    heis: { br: bracketTable(3, [[0, 1, 2, 1]]), gen: [1, 0, 0] }, // X, Y, Z: [X, Y] = Z; flow exp(s ad X)
    sl2: { br: bracketTable(3, [[0, 1, 1, 2], [0, 2, 2, -2], [1, 2, 0, 1]]), gen: [0.5, 0, 0] }, // H, E, F; flow exp(s ad H/2)
    su2: { br: SU2_BRACKETS, gen: [0, 0, PI / 2] }, // e₁, e₂, e₃ from the matrices; flow exp(s ad (π/2)e₃)
    abelian3: { br: bracketTable(3, []), gen: [1, 0, 0] }
  };
  /** ad_x as a matrix: column j holds the coordinates of [x, eⱼ]. */
  function adMatrix(br, x) {
    const n = br.length,
      M = zeros(n);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) M[k][j] += x[i] * br[i][j][k];
    return M;
  }
  const basisVec = (n, i) => Array.from({ length: n }, (_, k) => (k === i ? 1 : 0));
  /** The Killing form Bᵢⱼ = Tr(ad eᵢ ad eⱼ), its eigenvalues and signature. */
  function killing(br) {
    const n = br.length,
      ads = Array.from({ length: n }, (_, i) => adMatrix(br, basisVec(n, i)));
    const B = ads.map((A) => ads.map((C) => trace(mmul(A, C))));
    const eig = symEig(B);
    const signs = eig.map((x) => (x > 1e-9 ? '+' : x < -1e-9 ? '−' : '0'));
    return { B, eig, signature: '(' + signs.join(', ') + ')' };
  }
  const KILLING = Object.fromEntries(Object.entries(ALG).map(([k, a]) => [k, killing(a.br)]));
  /** Determinant and numerical rank of a square real matrix, by Gaussian elimination with partial pivoting. */
  function eliminate(M) {
    const A = M.map((r) => r.slice()),
      n = A.length,
      cols = A[0].length,
      scaleTol = 1e-9 * Math.max(1, ...A.flat().map(Math.abs));
    let det = 1,
      rank = 0;
    for (let c = 0; c < cols && rank < n; c++) {
      let p = rank;
      for (let r = rank + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      if (Math.abs(A[p][c]) <= scaleTol) { det = 0; continue; }
      if (p !== rank) { [A[p], A[rank]] = [A[rank], A[p]]; det = -det; }
      det *= A[rank][c];
      for (let r = 0; r < n; r++) if (r !== rank) { const f = A[r][c] / A[rank][c]; for (let k = c; k < cols; k++) A[r][k] -= f * A[rank][k]; }
      rank++;
    }
    return { det: rank === n && n === cols ? det : 0, rank, rows: A.slice(0, rank) };
  }
  const detN = (M) => eliminate(M).det;
  const numRank = (M) => eliminate(M).rank;
  /** The invariant bilinear forms Φ([x, y], z) = −Φ(y, [x, z]) of an algebra: a basis of the solutions, as n × n matrices. */
  function invariantForms(br) {
    const n = br.length,
      rows = [];
    for (let x = 0; x < n; x++)
      for (let y = 0; y < n; y++)
        for (let z = 0; z < n; z++) {
          const row = new Array(n * n).fill(0);
          for (let k = 0; k < n; k++) {
            row[k * n + z] += br[x][y][k];
            row[y * n + k] += br[x][z][k];
          }
          rows.push(row);
        }
    const R = eliminate(rows).rows,
      pivots = R.map((r) => r.findIndex((v) => Math.abs(v) > 1e-12)),
      free = [...Array(n * n).keys()].filter((c) => !pivots.includes(c));
    return free.map((f) => {
      const v = new Array(n * n).fill(0);
      v[f] = 1;
      R.forEach((r, i) => { v[pivots[i]] = -r[f] / r[pivots[i]]; });
      return Array.from({ length: n }, (_, i) => v.slice(i * n, i * n + n));
    });
  }
  /** aff(1) (H, E with [H, E] = E): every invariant form has Φ(E, ·) = 0, so E lies in its left kernel. */
  const AFF_FORMS = (() => {
    const forms = invariantForms(ALG.aff.br);
    return { dim: forms.length, forms, eRowZero: forms.every((F) => F[1].every((v) => Math.abs(v) < 1e-12)) };
  })();
  /** Twenty fixed unit quaternions in general position (a linear congruential sequence), for the kernel ranks. */
  const RANK_POINTS = (() => {
    let s = 20261119;
    const r = () => ((s = (s * 48271) % 2147483647) / 2147483647) * 2 - 1;
    return Array.from({ length: 20 }, () => { const q = [r(), r(), r(), r()]; return scale(q, 1 / norm(q)); });
  })();
  /** Ad of the flow exp(s G): exp(s ad G), with its operator norm. */
  function adFlow(name, s) {
    const a = ALG[name],
      M = expm(adMatrix(a.br, scale(a.gen, s)));
    return { M, norm: opNorm(M) };
  }

  /* ---------- the three kernels and the three-anchor Gram matrix ---------- */
  const KERNELS = {
    mother: { f: (d) => cs(d / 2) ** 2, rank: 5 },
    half: { f: (d) => cs(d), rank: 4 },
    integer: { f: (d) => cs(d) ** 2, rank: 10 }
  };
  const det3 = (G) =>
    G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) -
    G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) +
    G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  /** Cholesky G = LLᵀ of a positive semidefinite 3 × 3 matrix (a zero pivot leaves its column at zero). */
  function cholesky(G) {
    const Lm = zeros(3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j <= i; j++) {
        let s = G[i][j];
        for (let k = 0; k < j; k++) s -= Lm[i][k] * Lm[j][k];
        if (i === j) Lm[i][i] = Math.sqrt(Math.max(0, s));
        else Lm[i][j] = Lm[j][j] > 1e-9 ? s / Lm[j][j] : 0;
      }
    return Lm;
  }
  /** Anchors γ(0), γ(ε), γ(2ε) on the great circle γ(t) = cos t k + sin t j, read by the kernel f. */
  function gram3(f, e) {
    const a = f(e),
      b = f(2 * e),
      G = [
        [1, a, b],
        [a, 1, a],
        [b, a, 1]
      ];
    const Lm = cholesky(G);
    return { a, b, G, det: det3(G), lean: 1 + 2 * a * a * b - 2 * a * a - b * b, L: Lm, chol: Math.max(...G.flatMap((row, i) => row.map((x, j) => Math.abs(x - dot(Lm[i], Lm[j]))))) };
  }
  const anchorQ = (t) => [0, 0, sn(t), cs(t)];
  const motherFeature = (q) => scale([1, ...q], Math.SQRT1_2);
  const integerFeature = (q) => q.flatMap((a) => q.map((b) => a * b));

  /* ---------- the field: η-volume, boundary area, the ℤ₂ boundary on an icosahedron ---------- */
  function simpson(fn, a, b, n = 240) {
    if (b <= a) return 0;
    const h = (b - a) / n;
    let s = fn(a) + fn(b);
    for (let i = 1; i < n; i++) s += fn(a + i * h) * (i % 2 ? 4 : 2);
    return (s * h) / 3;
  }
  const etaVolume = (d) => simpson((t) => 4 * PI * sn(t) ** 2, 0, d);
  const ICO = (() => {
    const r5 = Math.sqrt(5),
      V = [[0, 0, 1]];
    for (let k = 0; k < 5; k++) V.push([(2 / r5) * cs(k * 72 * DEG), (2 / r5) * sn(k * 72 * DEG), 1 / r5]);
    for (let k = 0; k < 5; k++) V.push([(2 / r5) * cs((k * 72 + 36) * DEG), (2 / r5) * sn((k * 72 + 36) * DEG), -1 / r5]);
    V.push([0, 0, -1]);
    const F = [];
    for (let k = 0; k < 5; k++) {
      const a = 1 + k,
        b = 1 + ((k + 1) % 5),
        c = 6 + k,
        d = 6 + ((k + 1) % 5);
      F.push([0, a, b], [a, c, b], [b, c, d], [c, 11, d]);
    }
    const E = new Map();
    F.forEach((f, fi) =>
      f.forEach((v, t) => {
        const w = f[(t + 1) % 3],
          key = Math.min(v, w) + '-' + Math.max(v, w);
        if (!E.has(key)) E.set(key, { ends: [Math.min(v, w), Math.max(v, w)], faces: [] });
        E.get(key).faces.push(fi);
      })
    );
    const polar = F.map((f) => {
      const c = [0, 1, 2].map((i) => V[f[0]][i] + V[f[1]][i] + V[f[2]][i]);
      return Math.acos(c[2] / norm(c));
    });
    return { V, F, E: [...E.values()], polar };
  })();
  /** Label 1 the faces whose centre lies within d of the north pole; the ℤ₂ boundary on each edge is the sum of the
      labels of its two faces. */
  function icoBoundary(d) {
    const label = ICO.polar.map((p) => (p <= d + 1e-12 ? 1 : 0));
    const edges = ICO.E.filter((e) => (label[e.faces[0]] + label[e.faces[1]]) % 2 === 1);
    const degree = new Array(ICO.V.length).fill(0);
    edges.forEach((e) => e.ends.forEach((v) => degree[v]++));
    return { filled: label.reduce((a, b) => a + b, 0), edges: edges.length, cycle: degree.every((x) => x % 2 === 0), euler: ICO.V.length - ICO.E.length + ICO.F.length };
  }
  /** The simplicial 2-cochain instance on 4 vertices: F = δ(edge), then one ordered triangle raised by 1. */
  const TETRA = (() => {
    const n = 4,
      Vs = [...Array(n).keys()],
      edge = (a, b) => a * b + a - 2 * b;
    const F0 = (i, j, k) => edge(j, k) - edge(i, k) + edge(i, j);
    const F1 = (i, j, k) => F0(i, j, k) + (i === 0 && j === 1 && k === 2 ? 1 : 0);
    const defects = (F) => {
      let t = 0;
      for (const r of Vs) for (const i of Vs) for (const j of Vs) for (const k of Vs) if (F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j) !== 0) t++;
      return t;
    };
    const faceErrors = (F, r) => {
      let t = 0;
      for (const i of Vs) for (const j of Vs) for (const k of Vs) if (F(i, j, k) !== F(r, j, k) - F(r, i, k) + F(r, i, j)) t++;
      return t;
    };
    const edgeErrors = (F) => {
      let t = 0;
      for (const i of Vs) for (const j of Vs) for (const k of Vs) if (F(i, j, k) !== edge(j, k) - edge(i, k) + edge(i, j)) t++;
      return t;
    };
    return {
      n,
      exact: { defects: defects(F0), faceErrors: Vs.map((r) => faceErrors(F0, r)), edgeErrors: edgeErrors(F0) },
      raised: { defects: defects(F1), faceErrors: Vs.map((r) => faceErrors(F1, r)), edgeErrors: edgeErrors(F1) }
    };
  })();

  /* ---------- state ---------- */
  /** focus: the station the rail drives; b: the bridge; eps: the anchor step (degrees); during a card transition b and
      eps blend from `from` to the state (kit.tween). */
  const state = { focus: 'bridge', b: 1, eps: 60, kernel: 'mother', cam: 'cutaway', lens: 0, from: null, blend: 1 };
  let clock = null;
  const railT = () => (clock ? clock.t : 1);
  function eff() {
    if (!state.from || state.blend >= 1) return { b: state.b, eps: state.eps };
    const u = state.blend,
      f = state.from;
    return { b: lerp(f.b, state.b, u), eps: lerp(f.eps, state.eps, u) };
  }
  const FOCI = ['bridge', 'sieve2', 'sieve3', 'kernel', 'field'];

  /** Everything the page shows, from the (blended) state and the rail. */
  function calculate() {
    const e = eff(),
      s = railT(),
      f = state.focus;
    const drive = Object.fromEntries(FOCI.map((k) => [k, k === f ? s : 1]));
    // the bridge and the two orders
    const o = bridgeAt(e.b);
    const g1 = qmul(XQ, qconj(o)),
      g2 = qmul(ZQ, qconj(o));
    const xoz = heap(XQ, o, ZQ),
      zox = heap(ZQ, o, XQ);
    const carryZ = qmul(qpow(g1, drive.bridge), ZQ),
      carryX = qmul(qpow(g2, drive.bridge), XQ);
    // d ≤ 2 and d = 3
    const aff = adFlow('aff', drive.sieve2),
      heis = adFlow('heis', drive.sieve3),
      sl2 = adFlow('sl2', drive.sieve3),
      su2 = adFlow('su2', drive.sieve3);
    const line = { x: 0.3, y: -0.08, z: -0.3 };
    line.xyz = line.x - line.y + line.z;
    line.zyx = line.z - line.y + line.x;
    line.carryZ = line.z + drive.sieve2 * (line.x - line.y);
    line.carryX = line.x + drive.sieve2 * (line.z - line.y);
    // the kernel
    const K = KERNELS[state.kernel],
      epsEff = e.eps * drive.kernel,
      g = gram3(K.f, epsEff * DEG);
    const gmin = state.kernel === 'half' ? -1 : 0,
      antipode = K.f(PI);
    // the field
    const d = PI * drive.field,
      volume = etaVolume(d),
      area = 4 * PI * sn(d) ** 2;
    return {
      focus: f,
      s,
      drive,
      b: e.b,
      eps: e.eps,
      epsEff,
      kernel: state.kernel,
      rank: K.rank,
      lens: state.lens,
      cam: state.cam,
      bridge: o,
      xoz,
      zox,
      carryZ,
      carryX,
      gap: qgap(xoz, zox),
      laws: laws(o),
      line,
      aff: { M: aff.M, norm: aff.norm },
      heis: { M: heis.M, norm: heis.norm },
      sl2: { M: sl2.M, norm: sl2.norm },
      su2: { M: su2.M, norm: su2.norm },
      killing: Object.fromEntries(Object.entries(KILLING).map(([k, v]) => [k, { B: v.B, eig: v.eig, signature: v.signature }])),
      gram: g,
      kernelMin: gmin,
      kernelAntipode: antipode,
      field: { d, volume, closed: PI * (2 * d - sn(2 * d)), area, ico: icoBoundary(d), inPlus: d <= PI / 2 }
    };
  }

  /** The instances of the cited Lean theorems at the current state, computed here. */
  function instances(m) {
    const e = m.epsEff * DEG,
      anchors = [0, 1, 2].map((k) => anchorQ(k * e));
    // partition_inseparable_iff_kernel: the readout r(q) = κ(1, q)
    const readout = Object.fromEntries([['one', ONE], ['i', QI], ['j', QJ], ['k', QK]].map(([k, q]) => [k, kappa(ONE, q)]));
    // unit_gram_overlap_characterization: unit features; overlap 1 only for the same point
    const pts = [...anchors, QI, QJ, QK, scale(QI, -1), scale(QJ, -1), scale(QK, -1)];
    let worstSame = 0,
      leastOther = Infinity;
    pts.forEach((p, i) =>
      pts.forEach((q, j) => {
        const ov = dot(motherFeature(p), motherFeature(q));
        if (qgap(p, q) < 1e-12) worstSame = Math.max(worstSame, Math.abs(ov - 1));
        else leastOther = Math.min(leastOther, 1 - ov);
      })
    );
    const intK = integerFeature(QK),
      intNegK = integerFeature(scale(QK, -1));
    // rank_one_born_pairing_weight: ψ = (1, 0), φ = (cos(ε/2), e^{0.7i} sin(ε/2))
    const psi = [cx(1), cx(0)],
      ph = [cx(cs(e / 2)), cmul(cx(cs(0.7), sn(0.7)), cx(sn(e / 2)))];
    const outer = (u, v) => u.map((a) => v.map((b) => cmul(a, [b[0], -b[1]])));
    const rho = outer(psi, psi),
      P0 = outer(ph, ph),
      P1 = cadd(CI, P0, -1);
    const overlap = ph.reduce((acc, a, i) => { const p = cmul([a[0], -a[1]], psi[i]); return [acc[0] + p[0], acc[1] + p[1]]; }, [0, 0]);
    const weight = (Pk) => ctrace(cmm(rho, Pk))[0];
    const w0 = weight(P0),
      w1 = weight(P1);
    const unread = cadd(cmm(cmm(P0, rho), P0), cmm(cmm(P1, rho), P1));
    const cond = (Pk, w) => (w > 1e-12 ? cscale(cmm(cmm(Pk, rho), Pk), cx(1 / w)) : [[cx(0), cx(0)], [cx(0), cx(0)]]);
    const recombined = cadd(cscale(cond(P0, w0), cx(w0)), cscale(cond(P1, w1), cx(w1)));
    // gram_realizability: Q = G₃, O = Lᵀ
    const G = m.gram.G,
      O = mT(m.gram.L),
      xv = [1, -2, 0.5],
      yv = [0.3, 0.7, -1.1];
    // lagrange_gram_identity on u = φ(γ(0)), v = φ(γ(ε)) in ℝ⁵
    const u5 = motherFeature(anchors[0]),
      v5 = motherFeature(anchors[1]);
    let rhs = 0;
    for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) rhs += (u5[i] * v5[j] - u5[j] * v5[i]) ** 2;
    // crossProduct_is_skewAdjoint_of_balanced_sum: S = the bridge, A = S(I + iσ₃)/2, B = S(I − iσ₃)/2
    const S = quatMatrix(m.bridge),
      iS3 = cscale(SIG[2], cx(0, 1));
    const A = cscale(cmm(S, cadd(CI, iS3)), cx(0.5)),
      B = cscale(cmm(S, cadd(CI, iS3, -1)), cx(0.5));
    const half = cscale(CI, cx(0.5)),
      AB = cmm(A, cdag(B));
    // tri_eq_mul_inv_mul, baseChange_bijective, noncommutative_iff: the group at the current bridge o
    const o = m.bridge,
      star = (a, b) => heap(a, o, b),
      invO = (a) => heap(o, a, o),
      sampleQ = [ONE, scale(ONE, -1), QI, QJ, QK, ...anchors];
    let triGap = 0,
      changeGap = 0,
      orderGap = 0;
    for (const x of sampleQ) for (const y of sampleQ) for (const z of sampleQ) triGap = Math.max(triGap, qgap(heap(x, y, z), star(star(x, invO(y)), z)));
    for (const o2 of [ONE, QK]) for (const x of sampleQ) changeGap = Math.max(changeGap, qgap(heap(heap(x, o, o2), o2, o), x));
    for (const x of [QI, QJ, QK]) for (const y of [QI, QJ, QK]) orderGap = Math.max(orderGap, qgap(heap(x, o, y), heap(y, o, x)));
    // quaternionModel_hasFeatureRank_five, five_le_of_hasFeatureRank: the reading table of 1, −1, i, j, k
    const five = [ONE, scale(ONE, -1), QI, QJ, QK],
      K5 = five.map((p) => five.map((q) => kappa(p, q)));
    let realize = 0;
    for (const p of five) for (const q of five) realize = Math.max(realize, Math.abs(dot(motherFeature(p), motherFeature(q)) - kappa(p, q)));
    // finrank_span_sum_character_kernel: the numerical rank of each kernel on fixed points of S³
    const kernelRanks = Object.fromEntries(
      Object.entries(KERNELS).map(([k, K]) => [k, numRank(RANK_POINTS.map((p) => RANK_POINTS.map((q) => K.f(Math.acos(Math.max(-1, Math.min(1, dot(p, q))))))))])
    );
    return {
      basePoint: { triGap, changeGap, orderGap },
      rankFive: { det: detN(K5), rank: numRank(K5), realize },
      lowDim: { aff: AFF_FORMS, su2Residual: su2BracketResidual, c: SU2_BRACKETS[0][1][2] },
      characterRank: kernelRanks,
      partition: readout,
      unitGram: { worstSame, leastOther, integerEqual: qgap(intK, intNegK) < 1e-12, integerOverlap: dot(intK, intNegK) },
      born: { weight: w0, overlapSq: overlap[0] ** 2 + overlap[1] ** 2, half: cs(e / 2) ** 2, unreadGap: cgap(unread, recombined), total: w0 + w1 },
      gramRealizability: { chol: m.gram.chol, pairing: Math.abs(dot(mapply(G, xv), yv) - dot(mapply(O, xv), mapply(O, yv))) },
      gramDet: { cofactor: m.gram.det, lean: m.gram.lean, closed: state.kernel === 'mother' ? 0.5 * sn(e) ** 2 * (1 - cs(e)) ** 2 : null },
      gramPos: { det: m.gram.det, pivot: m.gram.L[2][2] },
      spin: { brackets: SU2_BRACKETS, residual: su2BracketResidual },
      lagrange: { lhs: dot(u5, u5) * dot(v5, v5) - dot(u5, v5) ** 2, rhs: rhs / 2 },
      balanced: { sum: cgap(cadd(A, B), S), unitary: cgap(cmm(S, cdag(S)), CI), halfA: cgap(cmm(A, cdag(A)), half), halfB: cgap(cmm(B, cdag(B)), half), skew: cgap(cdag(AB), cscale(AB, cx(-1))) },
      faceCycle: m.field.ico,
      tetra: TETRA
    };
  }

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('bridgeHandle');
  const YAW0 = (-3 * PI) / 4;
  const cams = { panorama: [YAW0, 0.3, 1], cutaway: [YAW0 + 0.1, 0.12, 1], above: [YAW0 - 0.24, 0.64, 1] };
  const opts = { canvas: $('cv'), yaw: cams.cutaway[0], pitch: cams.cutaway[1], radius: 0.2, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  // the stations sit in the plane facing the default camera: EX to the right, EY up, EZ towards the viewer
  const EX = [cs(YAW0), -sn(YAW0), 0],
    EY = [0, 0, 1],
    EZ = [-sn(YAW0), -cs(YAW0), 0];
  const at = (c, x, y, z = 0) => add(add(add(c, scale(EX, x)), scale(EY, y)), scale(EZ, z));
  const O0 = [0, 0, 0];
  const LAYOUTS = {
    wide: { ul: [-2.12, 0.6], ur: [2.12, 0.6], ll: [-2.06, -0.78], lr: [2.08, -0.8], ruler: [-1.1, 1.1, -1.42], ext: [-2.8, 2.8, -1.66, 1.3] },
    tall: { ul: [-0.98, 1.98], ur: [0.98, 1.98], ll: [-0.98, -1.86], lr: [1.02, -1.88], ruler: [-1.25, 1.25, -2.72], ext: [-1.8, 1.8, -2.94, 2.64] }
  };
  let layout = LAYOUTS.wide,
    compact = false,
    solo = null; // in a small frame: only the central S³ and the station the rail drives ('' when it drives the centre)
  const S = {};
  const placeStations = () => {
    for (const k of ['ul', 'ur', 'll', 'lr']) S[k] = at(O0, layout[k][0], layout[k][1]);
  };
  placeStations();
  const RT = 0.42; // the scale of B₋
  const tube = (key, points, color, r, extra = {}) => sc.tube(key, points, { color, r, glow: 0.15, ...extra });
  const RB = 0.16; // the unit balls of the three-dimensional candidates
  const RC = 0.15; // the unit circle of aff(1)
  /* The station the rail drives grows a little and moves towards the centre (a tween when the focus changes). */
  const FOCUS_STATION = { sieve2: 'ul', sieve3: 'ur', kernel: 'll', field: 'lr' };
  const ZOOM_TO = { ul: 1.3, ur: 1.25, ll: 1.3, lr: 1.28 },
    INWARD = { ul: 0.36, ur: -0.5, ll: 0.36, lr: -0.36 };
  const zoom = { ul: 1, ur: 1, ll: 1, lr: 1 };
  const zoomTarget = (k) => (FOCUS_STATION[state.focus] === k ? ZOOM_TO[k] : 1);
  let zoomRun = null;
  function retargetZoom(instant) {
    if (zoomRun) zoomRun.cancel();
    zoomRun = null;
    const from = { ...zoom },
      settleZoom = () => { for (const k in zoom) zoom[k] = zoomTarget(k); };
    if (instant) { settleZoom(); return; }
    zoomRun = kit.tween(600, (u) => { for (const k in zoom) zoom[k] = lerp(from[k], zoomTarget(k), u); paint(); }, () => { settleZoom(); paint(); });
  }
  /** Station-local coordinates: (x, y, z) along EX, EY, EZ, scaled by the station's zoom. */
  const frame = (k) => {
    const f = zoom[k],
      c = at(S[k], solo === null ? INWARD[k] * (f - 1) : 0, 0);
    const p = (x, y, z = 0) => at(c, x * f, y * f, z * f);
    p.f = f;
    p.c = c;
    return p;
  };

  /** Half-circles of radius ρ (in units of r) on the two walls of a cut ball. */
  function wallRings(c, r, rho, style) {
    const half = (axis) => sample(32, (t) => {
      const psi = -PI / 2 + PI * t;
      return add(c, scale(axis === 'x' ? [rho * cs(psi), 0.006, rho * sn(psi)] : [0.006, rho * cs(psi), rho * sn(psi)], r));
    });
    sc.line(half('x'), style);
    sc.line(half('y'), style);
  }
  /** A ball of the chart with the wedge 0 < azimuth < 90° cut away. Its walls are shaded by κ(o, ·): towards cyan only
      where κ > ½ (B₊, the chart from −1); B₋ (the chart from +1) has κ(o, ·) = ρ²/(1 + ρ²) ≤ ½ and stays violet. */
  function cutBall(key, c, r, plus, rings) {
    sc.surface(key, (u, v) => {
      const ph = PI / 2 + u * 1.5 * PI,
        th = PI * v;
      return add(c, scale([sn(th) * cs(ph), sn(th) * sn(ph), cs(th)], r));
    }, { nu: 54, nv: 30, color: P.violet, grid: { every: [6, 5], alpha: 0.14 } });
    const wall = (axis) => (u, v) => {
      const psi = -PI / 2 + PI * v,
        p = axis === 'x' ? [u * cs(psi), 0, u * sn(psi)] : [0, u * cs(psi), u * sn(psi)];
      return add(c, scale(p, r));
    };
    const shade = { nu: 14, nv: 24, value: (u) => (plus ? 1 / (1 + u * u) : (u * u) / (1 + u * u)), range: [0.5, 1.6], colors: [P.violet, P.cyan] };
    sc.surface(key + 'WallA', wall('x'), shade);
    sc.surface(key + 'WallB', wall('y'), shade);
    for (const rho of rings) wallRings(c, r, rho, { color: P.cyan, width: 1, alpha: 0.55 });
  }
  // the κ-shells 0.9 and 0.75 around o in B₊ (0.1 and 0.25 in B₋); in the field card the swept level spheres instead
  const KAPPA_RINGS = [1 / 3, 1 / Math.sqrt(3)];
  const SWEEP = [1, 2, 3, 5, 6, 7].map((k) => (k * PI) / 8);
  function central(m) {
    const rings = m.focus === 'field' ? SWEEP.filter((d) => d < PI / 2 && d <= m.field.d + 1e-9).map((d) => Math.tan(d / 2)) : KAPPA_RINGS;
    cutBall('s3', O0, 1, true, rings);
    // the units ±i, ±j, ±k on the sphere and 1 at the centre; the back ones are hidden by the body
    for (const [k, q] of [['i', QI], ['j', QJ], ['k', QK], ['-i', scale(QI, -1)], ['-j', scale(QJ, -1)], ['-k', scale(QK, -1)]])
      sc.bead(scale(chart(q), 1.008), { color: P.sigma, r: 2.6, key: 'unit' + k });
    sc.bead(O0, { color: P.sigma, r: 3, key: 'one' });
    if (m.focus === 'bridge') bridgeLayer(m);
    if (m.focus === 'kernel') anchorLayer(m);
  }
  function bridgeLayer(m) {
    sc.line(sample(60, (t) => scale(chart(bridgeAt(2 * t)), 1.004)), { color: P.sigma, width: 1.4, dash: [4, 4], alpha: 0.9 });
    const g1 = qmul(XQ, qconj(m.bridge)),
      g2 = qmul(ZQ, qconj(m.bridge)),
      s = m.drive.bridge;
    if (s > 1e-4) {
      tube('carryZ', sample(40, (t) => scale(chart(qmul(qpow(g1, t * s), ZQ)), 1.014)), P.cyan, 0.017);
      tube('carryX', sample(40, (t) => scale(chart(qmul(qpow(g2, t * s), XQ)), 1.014)), P.blue, 0.017);
    }
    sc.ring(scale(chart(m.xoz), 1.016), { color: P.cyan, r: 6.5, key: 'xozRing' });
    sc.ring(scale(chart(m.zox), 1.016), { color: P.blue, r: 6.5, key: 'zoxRing' });
    sc.bead(scale(chart(m.carryZ), 1.016), { color: P.cyan, r: 4.6, key: 'carryZ' });
    sc.bead(scale(chart(m.carryX), 1.016), { color: P.blue, r: 4.6, key: 'carryX' });
    sc.bead(scale(chart(XQ), 1.01), { color: P.sigma, r: 4, key: 'x' });
    sc.bead(scale(chart(ZQ), 1.01), { color: P.sigma, r: 4, key: 'z' });
  }
  const anchorPts = (m) => [0, 1, 2].map((k) => scale(chart(anchorQ(k * m.epsEff * DEG)), 1.014));
  function anchorLayer(m) {
    const e2 = 2 * m.epsEff * DEG;
    if (e2 > 1e-4) tube('anchorArc', sample(48, (t) => scale(chart(anchorQ(t * e2)), 1.012)), P.cyan, 0.012);
    anchorPts(m).forEach((p, k) => sc.bead(p, { color: P.cyan, r: 4.4, key: 'anchor' + k }));
  }

  /** Upper left: ℝ and the plane of aff(1). */
  function stationFlat(m) {
    const q = frame('ul'),
      f = q.f;
    const plate = [q(-0.58, -0.5), q(0.58, -0.5), q(0.58, 0.5), q(-0.58, 0.5)];
    sc.fan(plate, { fill: P.magenta, alpha: 0.07, color: P.magenta, width: 1, strokeAlpha: 0.45 });
    // the line ℝ: x − y + z and z − y + x are one point
    const Lp = (u) => q(-0.38, u);
    tube('lineR', [Lp(-0.44), Lp(0.44)], P.magenta, 0.008 * f);
    sc.bead(Lp(m.line.x), { color: P.sigma, r: 3.4, key: 'lineX' });
    sc.ring(Lp(m.line.y), { color: P.sigma, r: 3.6, normal: EZ, key: 'lineY' });
    sc.bead(Lp(m.line.z), { color: P.sigma, r: 3.4, key: 'lineZ' });
    sc.ring(Lp(m.line.xyz), { color: P.magenta, r: 6, normal: EZ, key: 'lineMeet' });
    sc.bead(add(Lp(m.line.carryZ), scale(EZ, 0.02)), { color: P.cyan, r: 3.6, key: 'lineCarryZ' });
    sc.bead(add(Lp(m.line.carryX), scale(EZ, 0.03)), { color: P.blue, r: 2.6, key: 'lineCarryX' });
    // aff(1): H to the right, E up; the unit circle and its image under Ad
    const pt = (h, e) => q(0.2 + h, e);
    sc.line(sample(72, (t) => pt(RC * cs(2 * PI * t), RC * sn(2 * PI * t))), { color: P.cyan, width: 1.3, dash: [3, 3] });
    const M = m.aff.M;
    sc.line(sample(72, (t) => { const v = mapply(M, [cs(2 * PI * t), sn(2 * PI * t)]); return pt(RC * v[0], RC * v[1]); }), { color: P.magenta, width: 2 });
    sc.arrow(pt(0, 0), pt(RC, 0), { color: P.cyan, width: 1.6, headSize: 7 });
    sc.arrow(pt(0, 0), pt(0, RC), { color: P.cyan, width: 1.6, headSize: 7 });
    const AE = mapply(M, [0, 1]);
    if (Math.abs(AE[1] - 1) > 1e-3) sc.arrow(pt(0.012, RC), pt(0.012 + RC * AE[0], RC * AE[1]), { color: P.magenta, width: 1.6, headSize: 7 });
    sc.ring(pt(0, 0), { color: P.magenta, r: 4, normal: EZ, key: 'bracketZero' });
  }
  /** Upper right: the unit balls of H₃(ℝ), sl(2, ℝ) and su(2) pushed by their Ad flows. */
  const BALL_X = [-0.48, 0, 0.48];
  function stationThree(m) {
    const q = frame('ur'),
      rb = RB * q.f;
    const balls = [
      ['heis', m.heis.M, [EZ, EX, EY], P.magenta],
      ['sl2', m.sl2.M, [EZ, EY, EX], P.magenta],
      ['su2', m.su2.M, [EX, EZ, EY], P.violet]
    ];
    balls.forEach(([key, M, axes, color], k) => {
      const centre = q(BALL_X[k], 0.02),
        map = (v) => add(centre, scale(add(add(scale(axes[0], v[0]), scale(axes[1], v[1])), scale(axes[2], v[2])), rb));
      sc.surface(key, (u, v) => {
        const ph = 2 * PI * u,
          th = PI * v,
          p = [sn(th) * cs(ph), sn(th) * sn(ph), cs(th)];
        return map(mapply(M, p));
      }, { nu: 36, nv: 18, color, grid: { every: [6, 3], alpha: 0.22 } });
      // the cyan outline of the round unit ball, for comparison
      sc.line(sample(72, (t) => add(centre, scale(add(scale(EX, cs(2 * PI * t)), scale(EY, sn(2 * PI * t))), rb * 1.04))), { color: P.cyan, width: 1.1, dash: [3, 3], alpha: 0.85 });
      if (key === 'su2') sc.bead(map(mapply(M, [1, 0, 0])), { color: P.cyan, r: 3.4, key: 'su2Probe' });
    });
  }
  /** Lower left: the rows of the Cholesky factor of G₃ and the parallelepiped they span. */
  const GRAM_SCALE = 0.34;
  // a right-handed frame tilted so that all three rows show on screen: a₁ to the right, a₂ up and away, a₃ mostly up
  const gramAxes = () => {
    const a1 = rotAbout(EX, EY, -0.3),
      a2 = add(scale(EY, 0.5), scale(rotAbout(EZ, EY, -0.3), -Math.sqrt(3) / 2));
    return [a1, a2, cross(a1, a2)];
  };
  function gramVectors(m) {
    const [a1, a2, a3] = gramAxes(),
      q = frame('ll'),
      origin = q(-0.36, -0.3),
      k = GRAM_SCALE * q.f;
    const vec = (row) => scale(add(add(scale(a1, row[0]), scale(a2, row[1])), scale(a3, row[2])), k);
    return { origin, v: m.gram.L.map(vec), k };
  }
  function stationGram(m) {
    const { origin, v, k } = gramVectors(m),
      [v1, v2, v3] = v;
    const flat = m.gram.det < 1e-6;
    const P8 = [O0, v1, v2, v3, add(v1, v2), add(v1, v3), add(v2, v3), add(add(v1, v2), v3)].map((p) => add(origin, p));
    if (!flat)
      sc.poly('gram', { vertices: P8, faces: [[0, 1, 4, 2], [0, 2, 6, 3], [0, 3, 5, 1], [7, 5, 3, 6], [7, 6, 2, 4], [7, 4, 1, 5]] }, { color: P.cyan, edges: P.sigma });
    else sc.fan([P8[0], P8[1], P8[4], P8[2]], { fill: P.magenta, alpha: 0.32, color: P.magenta, width: 1.4 });
    const tone = flat ? P.magenta : P.cyan;
    v.forEach((w, j) => sc.arrow(origin, add(origin, w), { color: j === 2 && flat ? P.magenta : tone, width: 2, headSize: 8 }));
    // the height of the third vector above the base plane: √det G₃ / (base area)
    const foot = add(origin, sub(v3, scale(gramAxes()[2], k * m.gram.L[2][2])));
    if (!flat) sc.line([add(origin, v3), foot], { color: P.sigma, width: 1, dash: [2, 3], alpha: 0.85 });
  }
  /** Lower right: B₋ and the boundary of the geodesic ball shrinking to −o in it. In the field card the walls of both
      halves carry the level spheres of the distance from o swept so far, and the current one is a cyan glass shell. */
  function stationField(m) {
    const q = frame('lr'),
      c = q.c,
      rt = RT * q.f,
      f = m.field,
      field = m.focus === 'field';
    const rings = field ? SWEEP.filter((d) => d > PI / 2 && d <= f.d + 1e-9).map((d) => Math.tan((PI - d) / 2)) : KAPPA_RINGS;
    cutBall('bminus', c, rt, false, rings);
    sc.bead(c, { color: P.sigma, r: 3.2, key: 'antipode' });
    if (!field) return;
    const [centre, r, rho] = f.inPlus ? [O0, 1, Math.tan(f.d / 2)] : [c, rt, Math.tan((PI - f.d) / 2)];
    if (rho * r > 0.004) {
      sc.glass('boundary', centre, rho * r * 0.995, { color: P.cyan, alpha: 0.16, rim: 0.85 });
      wallRings(centre, r, rho * 0.995, { color: P.cyan, width: 2.2, alpha: 1 });
    }
  }
  /** Below: the dimension ruler. */
  const DIMS = [1, 2, 3, 4, 6, 8];
  const rulerAt = (k) => {
    const [x0, x1, y] = layout.ruler;
    return at(O0, x0 + ((x1 - x0) * k) / (DIMS.length - 1), y);
  };
  function ruler() {
    tube('ruler', [rulerAt(0), rulerAt(DIMS.length - 1)], P.sigma, 0.006);
    DIMS.forEach((d, k) => {
      const p = rulerAt(k);
      if (d === 3) {
        sc.bead(p, { color: P.violet, r: 5.2, key: 'dim3' });
        sc.ring(p, { color: P.cyan, r: 8, normal: EZ, key: 'dim3ring' });
      } else if (d < 3) sc.bead(p, { color: P.magenta, r: 4, key: 'dim' + d });
      else sc.ring(p, { color: P.magenta, r: 4.6, normal: EZ, key: 'dim' + d });
    });
  }

  /* ---------- stage tags, HUD and legend ---------- */
  const LENS_NAME = [
    ['母公理读法', 'MOTHER AXIOM'],
    ['李群与正定核', 'LIE GROUPS & KERNELS']
  ];
  const FOCUS_NAME = {
    bridge: ['无源桥', 'ORIGIN-FREE BRIDGE'],
    sieve2: ['维数筛 d = 1, 2', 'SIEVE d = 1, 2'],
    sieve3: ['维数筛 d = 3', 'SIEVE d = 3'],
    kernel: ['母核 · 秩 1 + 4 = 5', 'MOTHER KERNEL · RANK 1 + 4 = 5'],
    field: ['闭合场', 'CLOSED FIELD']
  };
  const KERNEL_NAME = { mother: 'κ = cos²(d/2)', half: 'κ = cos d', integer: 'κ = cos²d' };
  function stationTags() {
    const lens = state.lens;
    // a small frame keeps only the names; the descriptions are in the legend, the readouts and the drawer
    if (compact)
      return [
        ['central', at(O0, -0.92, -1.08), 'S³(1)', 'c-vi'],
        ['ul', frame('ul')(0, 0.64), 'd = 1, 2', 'c-mg'],
        ['ur', frame('ur')(0, 0.64), 'd = 3', 'c-mg'],
        ['ll', frame('ll')(0, -0.6), lens ? 'G₃' : L('秩 5', 'rank 5'), 'c-cy'],
        ['lr', frame('lr')(0, -0.6), 'B₋', 'c-vi']
      ];
    return [
      ['central', at(O0, -0.92, -1.08), lens ? 'SU(2) ≅ S³ = 𝕋₃' : L('S³(1) · 三元数场', 'S³(1) · the ternion field'), 'c-vi'],
      ['ul', frame('ul')(0, 0.64), lens ? 'ℝ · ℝ² · aff(1)' : L('d = 1, 2 · 扭不起来', 'd = 1, 2 · cannot twist'), 'c-mg'],
      ['ur', frame('ur')(0, 0.64), lens ? 'd = 3 · Milnor 7.5' : L('d = 3 · 非紧出局', 'd = 3 · non-compact out'), 'c-mg'],
      ['ll', frame('ll')(0, -0.6), lens ? 'c₀ = ½ · c<sub>1/2</sub> = ¼' : L('母核 · 秩 1 + 4 = 5', 'kernel · rank 1 + 4 = 5'), 'c-cy'],
      ['lr', frame('lr')(0, -0.6), lens ? 'S³ = B₊ ∪ B₋' : L('B₋ · 另一半 S³', 'B₋ · other half of S³'), 'c-vi']
    ];
  }
  function focusTags(m) {
    const out = [];
    if (!compact || solo === 'ur') {
      const names = ['H₃', 'sl(2, ℝ)', 'su(2)'];
      const q = frame('ur');
      BALL_X.forEach((x, k) => out.push(['ball' + k, q(x, -0.5, 0.3), names[k], k < 2 ? 'c-mg' : 'c-vi']));
    }
    DIMS.forEach((d, k) => {
      if (compact) return;
      out.push(['dim' + d, add(rulerAt(k), scale(EY, -0.16)), String(d), d === 3 ? 'c-vi' : 'c-mg']);
    });
    if (m.focus === 'bridge') {
      out.push(['x', scale(chart(XQ), 1.12), 'x = i', 'c-sg']);
      out.push(['z', scale(chart(ZQ), 1.12), 'z = j', 'c-sg']);
      out.push(['xoz', add(scale(chart(m.xoz), 1.12), [0, 0, 0.06]), '[x, o, z]', 'c-cy']);
      out.push(['zox', add(scale(chart(m.zox), 1.12), [0, 0, -0.06]), '[z, o, x]', 'c-bl']);
    }
    if (m.focus === 'kernel') ['γ(0)', 'γ(ε)', 'γ(2ε)'].forEach((t, k) => out.push(['anchor' + k, scale(anchorPts(m)[k], 1.12), t, 'c-cy']));
    if (m.focus === 'field' && shown('lr')) {
      const f = m.field;
      const q = frame('lr');
      if (f.d < PI - 1e-6) out.push(['bdry', f.inPlus ? at(O0, 0, Math.min(0.9, Math.tan(f.d / 2)) * 0.6 + 0.12) : q(0, 0.56), '∂B(o, d)', 'c-cy']);
      out.push(['antipode', q(0.2, -0.1), '−o', 'c-sg']);
    }
    return out;
  }
  function subline(m) {
    const f = m.focus;
    if (f === 'bridge') {
      if (m.b < 0.005) return L('桥在 x：[x, x, z] = z，两种次序都落在 z。', 'Bridge at x: [x, x, z] = z, and both orders land on z.');
      if (m.b > 1.995) return L('桥在 z：[x, z, z] = x，两种次序都落在 x。', 'Bridge at z: [x, z, z] = x, and both orders land on x.');
      if (Math.abs(m.b - 1) < 0.005) return L('桥在 1：[i, 1, j] = +k，[j, 1, i] = −k，落在对径两极。', 'Bridge at 1: [i, 1, j] = +k and [j, 1, i] = −k, on opposite poles.');
      return L(`两种次序相距 ${fmt(m.gap)}；桥滑到 1 时分得最开。`, `The two orders are ${fmt(m.gap)} apart; they split most with the bridge at 1.`);
    }
    if (f === 'sieve2') return L(`ℝ 上两种次序重合；aff(1) 的单位圆被拉高 ${fmt(m.aff.norm)} 倍。`, `On ℝ the two orders coincide; the unit circle of aff(1) is stretched ${fmt(m.aff.norm)} times.`);
    if (f === 'sieve3') return L('H₃ 被剪切，sl(2, ℝ) 被拉伸，只有 su(2) 的紫球原样转动。', 'H₃ is sheared and sl(2, ℝ) stretched; only the violet ball of su(2) turns unchanged.');
    if (f === 'kernel') {
      if (m.kernel === 'half') return L('只取 j = ½：三个特征共面，det G₃ = 0，κ 还会取负值。', 'j = ½ alone: the three features are coplanar, det G₃ = 0, and κ goes negative.');
      if (m.kernel === 'integer') return L('只取整数 j：κ(o, −o) = 1，分不开对径点。', 'Integer j alone: κ(o, −o) = 1, the antipodes cannot be told apart.');
      return L('κ = cos²(d/2)：三锚的特征张成有体积的平行六面体。', 'κ = cos²(d/2): the features of the three anchors span a solid parallelepiped.');
    }
    const fd = m.field;
    if (fd.d >= PI - 1e-9) return L('d = π：边界缩成 −o 一点，面积 0，η 体积 2π²。', 'd = π: the boundary has shrunk to the point −o, area 0, η-volume 2π².');
    if (fd.inPlus) return L(`边界球在 B₊ 里长大：A = 4π sin²d = ${fmt(fd.area)}。`, `The boundary sphere grows in B₊: A = 4π sin²d = ${fmt(fd.area)}.`);
    return L(`过了赤道，边界球在 B₋ 里缩回 −o：A = ${fmt(fd.area)}。`, `Past the equator the boundary shrinks in B₋ towards −o: A = ${fmt(fd.area)}.`);
  }
  function hudKey(m) {
    const f = m.focus;
    if (f === 'bridge') return `‖[x, o, z] − [z, o, x]‖ = ${fmt(m.gap)}`;
    if (f === 'sieve2') return `‖Ad‖ = e<sup>s</sup> = ${fmt(m.aff.norm)}`;
    if (f === 'sieve3') return `‖Ad‖ = ${fmt(m.heis.norm)} · ${fmt(m.sl2.norm)} · ${fmt(m.su2.norm)}`;
    if (f === 'kernel') return `det G₃ = ${fmt(m.gram.det)}`;
    return `V = ${fmt(m.field.volume)} · A = ${fmt(m.field.area)}`;
  }
  function legendItems(m) {
    if (m.focus === 'bridge')
      return state.lens
        ? [['vi', 'S³ ≅ SU(2)'], ['cy', 'x o⁻¹ z'], ['bl', 'z o⁻¹ x'], ['sg', 'x → 1 → z']]
        : [['vi', L('三元数场 S³', 'ternion field S³')], ['cy', '[x, o, z]'], ['bl', '[z, o, x]'], ['sg', L('桥的路径', 'path of the bridge')]];
    return state.lens
      ? [['vi', 'S³ ≅ SU(2)'], ['cy', 'G₃ ⪰ 0 · det > 0'], ['mg', '‖Ad‖ → ∞ · det = 0'], ['sg', '1 · −1 · d']]
      : [['vi', L('三元数场 S³', 'ternion field S³')], ['cy', L('保正、忠实', 'positive, faithful')], ['mg', L('被筛掉', 'sieved out')], ['sg', L('单位元与刻度', 'unit and ruler')]];
  }
  function hud(m) {
    $('hudBig').innerHTML = `${L(...FOCUS_NAME[m.focus])} · ${hudKey(m)}`;
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems(m).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // Two tags can project onto one spot when the camera turns. Keep each near its anchor; reserve the HUD and handle.
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
          right = box.right + dx,
          top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  function fitView() {
    const W = stage.clientWidth,
      H = stage.clientHeight,
      top = TRV.thumbMode ? 12 : 66,
      bottom = TRV.thumbMode ? 12 : 34;
    const unitOf = (Lay) => Math.max(20, Math.min((W - 20) / (Lay.ext[1] - Lay.ext[0]), (H - top - bottom) / (Lay.ext[3] - Lay.ext[2])));
    // the layout that draws the scene larger in this frame
    let next = unitOf(LAYOUTS.tall) > unitOf(LAYOUTS.wide) * 1.04 ? LAYOUTS.tall : LAYOUTS.wide;
    compact = unitOf(next) < 78;
    solo = null;
    if (compact) {
      // a small frame shows the central S³ and the station the rail drives, beside it or below it
      const k = FOCUS_STATION[state.focus] || '',
        side = W / Math.max(1, H) >= 1.05;
      next = { ...next, ruler: next.ruler };
      if (k) next[k] = side ? [1.95, 0] : [0, -1.95];
      next.ext = !k ? [-1.25, 1.25, -1.25, 1.32] : side ? [-1.14, 2.86, -1.2, 1.3] : [-1.2, 1.2, -2.78, 1.3];
      solo = k;
    }
    if (next !== layout) {
      layout = next;
      placeStations();
    }
    const [x0, x1, y0, y1] = layout.ext,
      unit = unitOf(layout);
    opts.radius = unit / Math.max(1, Math.min(W, H));
    opts.cx = 0.5 - ((x0 + x1) / 2) * (unit / Math.max(1, W));
    const spare = H - top - bottom - unit * (y1 - y0);
    opts.cy = (top + Math.max(0, spare) / 2 + unit * y1) / Math.max(1, H);
  }
  const shown = (k) => solo === null || solo === k;
  function drawStage(m) {
    fitView();
    sc.begin();
    central(m);
    if (shown('ul')) stationFlat(m);
    if (shown('ur')) stationThree(m);
    if (shown('ll')) stationGram(m);
    if (shown('lr')) stationField(m);
    if (solo === null) ruler();
    for (const [k, p, html, cls] of [...stationTags().filter(([k]) => k === 'central' || shown(k)), ...focusTags(m)]) sc.tag(k, p, html, 'raw backed ' + cls);
    sc.end();
    const q = sc.p(scale(chart(m.bridge), 1.004));
    handle.hidden = TRV.still || m.focus !== 'bridge';
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strip plot: along the step ε, which kernel keeps det G₃ > 0 ---------- */
  const STRIP = Object.fromEntries(
    Object.entries(KERNELS).map(([k, K]) => [k, sample(180, (t) => { const e = PI * t; return [180 * t, gram3(K.f, e).det]; })])
  );
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('沿步长 ε：只有母核在整个开半圈上保持 det G₃ > 0', 'Along the step ε: only the mother kernel keeps det G₃ > 0 over the open half-turn');
    $('plotMeta').textContent = 'det G₃(60°) = 3/32 · det G₃(90°) = 1/2';
    const g = kit.plot(cv, { x: [0, 180], y: [-0.08, 0.95], pad: [34, 14, 12, 22] });
    g.axes({ xTicks: [0, 60, 90, 120, 180], yTicks: [0, 0.25, 0.5, 0.75], xLabel: 'ε (°)' });
    g.line(STRIP.integer, P.magenta, { width: 1.6, dash: [5, 4] });
    g.line(STRIP.half, P.magenta, { width: 1.8 });
    g.line(STRIP.mother, P.cyan, { width: 2.2 });
    g.vline(m.epsEff, P.amber);
    g.dot(m.epsEff, m.gram.det, P.amber, 3.5);
    g.legend([
      [P.cyan, 'j = 0 + ½ · cos²(d/2)'],
      [P.magenta, 'j = ½ · cos d'],
      [P.magenta, 'j ∈ ℕ · cos²d']
    ]);
  }

  /* ---------- readouts ---------- */
  const QNAME = (q) => {
    const names = [['1', ONE], ['i', QI], ['j', QJ], ['k', QK]];
    for (const [n, b] of names) {
      if (qgap(q, b) < 1e-9) return '+' + n;
      if (qgap(q, scale(b, -1)) < 1e-9) return '−' + n;
    }
    return '(' + q.map((x) => signed(x, 2)).join(', ') + ')';
  };
  function noteFor(m, I) {
    const f = m.focus;
    if (f === 'bridge')
      return L(`以 o 为单位元：[o, o, x] = x，x ⋆ₒ x⁻¹ = o；换成 o′ = 1，φ(q) = q o⁻¹ 把 ⋆ₒ 搬成 ⋆₁，残差 ${fmt(m.laws.isomorphism)}。`, `With o as the unit: [o, o, x] = x and x ⋆ₒ x⁻¹ = o; for o′ = 1, φ(q) = q o⁻¹ carries ⋆ₒ to ⋆₁, residual ${fmt(m.laws.isomorphism)}.`);
    if (f === 'sieve2' || f === 'sieve3')
      return L(`基灵型号差：aff(1) ${m.killing.aff.signature}、H₃ ${m.killing.heis.signature}、sl(2, ℝ) ${m.killing.sl2.signature}、su(2) ${m.killing.su2.signature}。`, `Killing signatures: aff(1) ${m.killing.aff.signature}, H₃ ${m.killing.heis.signature}, sl(2, ℝ) ${m.killing.sl2.signature}, su(2) ${m.killing.su2.signature}.`);
    if (f === 'kernel')
      return L(`a = f(ε) = ${fmt(m.gram.a)}，b = f(2ε) = ${fmt(m.gram.b)}；1 + 2a²b − 2a² − b² = ${fmt(m.gram.lean)}；LLᵀ 与 G₃ 之差 ${fmt(m.gram.chol)}。`, `a = f(ε) = ${fmt(m.gram.a)}, b = f(2ε) = ${fmt(m.gram.b)}; 1 + 2a²b − 2a² − b² = ${fmt(m.gram.lean)}; LLᵀ differs from G₃ by ${fmt(m.gram.chol)}.`);
    const ico = I.faceCycle;
    return L(`二十面体上标 1 的面 ${ico.filled} / 20，ℤ₂ 边界 ${ico.edges} 条边${ico.edges ? '，是一条闭链' : ''}；V − E + F = ${ico.euler}。`, `Icosahedron: ${ico.filled} of 20 faces labelled 1, a ℤ₂ boundary of ${ico.edges} edge${ico.edges === 1 ? '' : 's'}${ico.edges ? ', a cycle' : ''}; V − E + F = ${ico.euler}.`);
  }
  function readings(m, I) {
    $('roKey').textContent = fmt(m.gram.det);
    $('roKeySub').textContent = ` · ${KERNEL_NAME[m.kernel]} · ${L('秩', 'rank')} ${m.rank} · ε = ${fmt(m.epsEff, 2).replace(/\.?0+$/, '')}°`;
    $('roBridge').textContent = `${QNAME(m.xoz)} · ${QNAME(m.zox)} · ‖Δ‖ = ${fmt(m.gap)}`;
    $('roHeap').textContent = fmt(m.laws.max) + ' · ' + L('消去 · 结合 · 单位元 · 逆 · 双侧不变 · 同构', 'cancel · assoc. · unit · inverse · invariance · iso');
    $('roFlat').textContent = `[e₁, e₂] = 0 · ‖Ad‖ = ${fmt(m.aff.norm)}`;
    $('roThree').textContent = `H₃ ${fmt(m.heis.norm)} · sl(2, ℝ) ${fmt(m.sl2.norm)} ${m.killing.sl2.signature} · su(2) ${fmt(m.su2.norm)} ${m.killing.su2.signature}`;
    $('roKernel').textContent =
      m.kernel === 'half'
        ? `min κ = ${signed(m.kernelMin)} < 0 · κ(o, −o) = ${signed(m.kernelAntipode)}`
        : m.kernel === 'integer'
          ? `κ(o, −o) = ${fmt(m.kernelAntipode)} · ${L('分不开 ±o', 'cannot separate ±o')}`
          : `min κ = ${fmt(m.kernelMin)} · κ(o, −o) = ${fmt(m.kernelAntipode)}`;
    $('roField').textContent = `d = ${fmt(m.field.d / DEG, 1)}° · V = ${fmt(m.field.volume)} · A = ${fmt(m.field.area)}`;
    $('roNote').textContent = noteFor(m, I);
    $('scenePill').innerHTML = `S³ <strong>${L(...LENS_NAME[state.lens])}</strong>`;
    $('keyPill').innerHTML = `det G₃ <strong>${fmt(m.gram.det)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄移动桥 o · 拖空白处转视角 · 空格播放', 'drag the amber handle to move the bridge o · drag empty space to orbit · Space plays');
    $('formula').textContent = {
      bridge: 'carry: (x o⁻¹)^s z → [x, o, z] = x o⁻¹ z',
      sieve2: 'Ad(s) = exp(s ad H) · ‖Ad‖ = e^s',
      sieve3: 'Ad(s) = exp(s ad G) · G = X, H/2, (π/2)e₃',
      kernel: 'γ(0), γ(sε), γ(2sε) · det G₃ = ½ sin²ε (1 − cos ε)²',
      field: 'd = πs · V(d) = π(2d − sin 2d) · A = 4π sin²d'
    }[m.focus];
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
  }
  const paint = kit.painter(() => {
    const m = calculate(),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: the one quantity of the current focus ---------- */
  const playBtn = $('playBtn');
  clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 0.16,
    step: 0.05,
    max: 1,
    format: (t) => 's ' + t.toFixed(2),
    onChange: (t, c) => {
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
  let transition = null,
    booting = true;
  /** Blend b and ε from `from` to the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); state.blend = 1; state.from = null; };
    token.run = kit.tween(ms, (u) => { state.blend = u; syncFields(); paint(); }, () => { if (transition === token) transition = null; state.blend = 1; state.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    state.b = e.b;
    state.eps = e.eps;
    state.from = null;
    state.blend = 1;
    cards.mark(null);
    clock.pause();
  }
  /** A control of another station brings its station into focus, shown in full (s = 1). */
  function focusOn(f) {
    if (state.focus === f) return;
    state.focus = f;
    retargetZoom(false);
    clock.set(clock.max);
  }
  const snapB = (v) => kit.clamp(Math.round(v * 100) / 100, 0, 2);
  function moveBridge(v) {
    state.b = snapB(v);
    syncFields();
    paint();
  }
  const bf = kit.field($('bridgePos'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      leave();
      focusOn('bridge');
      moveBridge(v);
    }
  });
  const ef = kit.field($('anchorStep'), {
    fmt: (v) => Math.round(v) + '°',
    onInput: (v) => {
      leave();
      focusOn('kernel');
      state.eps = v;
      paint();
    }
  });
  function syncFields() {
    const e = eff();
    bf.set(Math.round(e.b * 100) / 100);
    ef.set(Math.round(e.eps));
  }
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still ? 0 : 600);
    paint();
  });
  const kernelChips = kit.chips($('kernelChips'), 'kernel', (v) => {
    leave();
    focusOn('kernel');
    state.kernel = KERNELS[v] ? v : 'mother';
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    state.lens = state.lens ? 0 : 1;
    paint();
  });

  /* ---------- experiment cards ---------- */
  const presets = {
    'origin-free-ternary-bridge': { focus: 'bridge', b: 1, eps: 60, kernel: 'mother', cam: 'cutaway', play: true, still: 'end' },
    'dimension-sieve-1d-2d-deadlock': { focus: 'sieve2', b: 1, eps: 60, kernel: 'mother', cam: 'panorama', play: true, still: 'end' },
    'three-sphere-noncompact-elimination': { focus: 'sieve3', b: 1, eps: 60, kernel: 'mother', cam: 'panorama', play: true, still: 'end' },
    'peter-weyl-rank-five-kernel': { focus: 'kernel', b: 1, eps: 60, kernel: 'mother', cam: 'panorama', play: true, still: 'end' },
    'cartan-three-form-closed-field': { focus: 'field', b: 1, eps: 60, kernel: 'mother', cam: 'cutaway', play: true, still: 'end' }
  };
  const ids = Object.keys(presets);
  const NOTES = {
    'origin-free-ternary-bridge': [
      '以 1 为桥：时间轴把 j 沿青色弧搬到 [i, 1, j] = +k，把 i 沿蓝色弧搬到 [j, 1, i] = −k，两者落在对径的两极。拖琥珀手柄，桥滑到 x 或 z 时两种次序重合。',
      'With 1 as the bridge the rail carries j along the cyan arc to [i, 1, j] = +k and i along the blue arc to [j, 1, i] = −k, onto opposite poles. Drag the amber handle: with the bridge at x or z the two orders coincide.'
    ],
    'dimension-sieve-1d-2d-deadlock': [
      '左上台：ℝ 上青色与蓝色两颗珠落在同一点；aff(1) 的 Ad 流把青色虚线单位圆拉成高 e = 2.7183 倍的品红椭圆，换位子只剩中心的品红小环。',
      'Upper left: on ℝ the cyan and blue beads meet at one point; the Ad flow of aff(1) stretches the dashed cyan unit circle into a magenta ellipse e = 2.7183 times as tall, and the bracket is left as the small magenta ring at the centre.'
    ],
    'three-sphere-noncompact-elimination': [
      '右上台：Ad 流把 H₃ 的球剪成斜椭球（‖Ad‖ = 1.6180），把 sl(2, ℝ) 的球拉成细长椭球（2.7183），二者都冲出青色虚线圈；su(2) 的紫球只转了半圈，青珠仍在圈上。',
      'Upper right: the Ad flow shears the ball of H₃ into a slanted ellipsoid (‖Ad‖ = 1.6180) and stretches that of sl(2, ℝ) into a thin one (2.7183), both past the dashed cyan circle; the violet ball of su(2) only turns half a turn, its cyan bead still on the circle.'
    ],
    'peter-weyl-rank-five-kernel': [
      '三锚从重合张开到 ε = 60°：左下台青色平行六面体的体积平方 det G₃ = 3/32 = 0.09375。换成“只取 j = ½”，它压成品红的平行四边形。',
      'The anchors open from coincidence to ε = 60°: the squared volume of the cyan parallelepiped on the lower left is det G₃ = 3/32 = 0.09375. Switch to “j = ½ only” and it collapses to a magenta parallelogram.'
    ],
    'cartan-three-form-closed-field': [
      '青色边界球先在紫球的剖面里长大，过了赤道在右下的 B₋ 里缩回 −o；d = π 时边界面积 0，η 体积 2π² = 19.7392。',
      'The cyan boundary sphere first grows in the cutaway of the violet ball and, past the equator, shrinks in B₋ on the lower right back to −o; at d = π its area is 0 and the η-volume 2π² = 19.7392.'
    ]
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'origin-free-ternary-bridge': ['以 1 为桥：[i, 1, j] = +k，[j, 1, i] = −k，落在对径两极。', 'Bridge 1: [i, 1, j] = +k and [j, 1, i] = −k, on opposite poles.'],
    'dimension-sieve-1d-2d-deadlock': ['ℝ 上两颗珠重合；aff(1) 的单位圆被拉高 2.7183 倍。', 'On ℝ the two beads meet; the aff(1) circle is stretched 2.7183 times.'],
    'three-sphere-noncompact-elimination': ['H₃ 被剪切，sl(2, ℝ) 被拉伸，su(2) 的紫球原样转动。', 'H₃ is sheared, sl(2, ℝ) stretched; the violet su(2) ball just turns.'],
    'peter-weyl-rank-five-kernel': ['ε = 60°：青色平行六面体的 det G₃ = 3/32 = 0.09375。', 'ε = 60°: the cyan parallelepiped has det G₃ = 3/32 = 0.09375.'],
    'cartan-three-form-closed-field': ['d = π：边界缩回 −o，面积 0，η 体积 2π²。', 'd = π: the boundary shrinks to −o, area 0, η-volume 2π².']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, { focus: p.focus, b: p.b, eps: p.eps, kernel: p.kernel, cam: p.cam, from: null, blend: 1 });
    retargetZoom(booting || TRV.still);
    camChips.set(p.cam, true);
    kernelChips.set(p.kernel, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
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
    idle: ['自由探索：拖琥珀手柄或拉桥与步长，换核、透镜或视角。时间轴推动最后一张卡的那个量。随时可以再选一张卡。', 'Free play: drag the amber handle or pull the bridge and the step, switch the kernel, the lens or the view. The rail drives the quantity of the last card. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag the bridge along x → 1 → z, or arrow keys ---------- */
  const point = (b) => {
    const q = sc.p(scale(chart(bridgeAt(b)), 1.004)),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  };
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    focusOn('bridge');
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    let best = state.b,
      gap = Infinity;
    const rect = $('cv').getBoundingClientRect(),
      x = ev.clientX - rect.left,
      y = ev.clientY - rect.top;
    for (let b = 0; b <= 2.0001; b += 0.005) {
      const p = sc.p(scale(chart(bridgeAt(b)), 1.004)),
        dist = hypot(p[0] - x, p[1] - y) + Math.abs(state.b - b) * 1e-7;
      if (dist < gap) {
        gap = dist;
        best = b;
      }
    }
    moveBridge(best);
  };
  const release = (ev) => {
    if (ev && handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onpointerup = release;
  handle.onpointercancel = release;
  handle.onlostpointercapture = () => { dragging = null; handle.classList.remove('dragging'); };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    focusOn('bridge');
    moveBridge(ev.key === 'Home' ? 0 : ev.key === 'End' ? 2 : state.b + (ev.key === 'ArrowLeft' ? -0.01 : 0.01));
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  const calc = Object.freeze({ qmul, heap, qpow, chart, bridgeAt, kappa, gram3, killing: (name) => KILLING[name], adFlow, etaVolume, icoBoundary, laws });
  window.AXIOM_OMEGA_DEBUG = Object.freeze({
    get state() {
      const m = calculate();
      return JSON.parse(JSON.stringify({
        ...m,
        t: clock.t,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        compact,
        zoom: { ...zoom },
        layout: solo !== null ? 'solo' : layout === LAYOUTS.wide ? 'wide' : 'tall',
        leanInstances: instances(m)
      }));
    },
    calc,
    presets: JSON.parse(JSON.stringify(presets)),
    /** Viewport coordinates where the handle would sit for the bridge position b, for drag targets. */
    dragTarget: point
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[0]);
    clock.pause();
    clock.set(clock.max);
    paint.now();
  };
  cards.pick(cards.initial(ids[0]));
  booting = false;
  paint.now();
})();
