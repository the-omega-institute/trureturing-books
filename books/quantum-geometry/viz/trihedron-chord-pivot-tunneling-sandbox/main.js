/* CHORD//TUNNEL · 极小圆弧体内割面隧穿与多尺度枢轴全息锥 · Interior-chord tunneling and the multi-scale pivot cone
   The stage is one trihedron cell ΔT_ε of the unit sphere, drawn as a lit solid: O = 0, the corner B = e₂,
   A(ε) = (sin ε, cos ε, 0) on the wall OAB (the plane z = 0) and C(ε) = (0, cos ε, sin ε) on the wall OBC (x = 0),
   ε ∈ [10°, 90°] (the amber handle on A drags it). Three routes join A to C:
     walls    A → B → C along the two orthogonal walls, length 2ε; at B the serial route waits for a total order
     cap      the geodesic arc of the convex cap △ABC, length arccos(cos²ε) (cos of the arc = A·C = cos²ε)
     chord    the straight interior chord, length ‖A − C‖ = √2 sin ε; its midpoint M = (A + C)/2 sits at radius
              r_mid = √((1 + cos²ε)/2), below the cap arc by Δr = 1 − r_mid (the crescent in the plane OAC)
   Five scenes share the cell and one rail (the progress τ of the amber read head along the scene's route):
     walls    the head climbs A → B → C; the ring at B is the global sort a serial route pays
     cap      k unsorted wavefronts spread over the cap from A; the head rides the cap arc
     chord    the head dives through the bulk along the chord; the flat secant face △ABC and the crescent show the bulge
              the cut shaves off; a min-plus (tropical) Schur complement of a six-vertex graph eliminates B, Q, M, O
     cone     the cap is bisected into N = 2^D Sierpiński leaves (Λ⁰); groups of k consecutive leaves condense into a
              pivot (Λ³_ℓ ≡ Λ⁰_{ℓ+1}) placed at radius cos(θ/2), θ the angular diameter of the region it gathers; the
              deepest pivot sits at r_mid. The thin thread on r = 1 is the Dijkstra settle order of the leaf graph.
     relay    the chord as a rectangular barrier (E = 16, V₀ = 32, ħ = 2m = 1, sphere radius 1): one thick barrier of
              length L against two halves with a resonant pivot well between them; the Zeno probe (n = N projective
              mid-step sorts) closes the shortcut and sends the head back onto the walls.
   Every number is computed here (transfer matrices, Kleene star, clique–separator completion, Van Oosterom–Strackee
   solid angles, Dijkstra). Read-only probe: window.CHORD_TUNNEL_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const O3 = [0, 0, 0], EY = [0, 1, 0];
  const EPS_MIN = 10, EPS_MAX = 90;
  const PHYS = { E: 16, V0: 32 };                                  // ħ = 2m = 1: k₀ = √E = 4, κ = √(V₀ − E) = 4
  const K0 = Math.sqrt(PHYS.E), KAPPA = Math.sqrt(PHYS.V0 - PHYS.E);
  const SIGMA = 0.6;                                               // width of the Gaussian kernel of the completion
  const SCENES = ['walls', 'cap', 'chord', 'cone', 'relay'];
  /** How strongly each face of the cell is drawn in each scene (opacity): the scene's own face leads. */
  const LOOK = {
    walls: { wall: 1, oac: 0.1, cres: 0.3, cap: 0.12, flat: 0 },
    cap: { wall: 0.9, oac: 0.1, cres: 0.3, cap: 0.3, flat: 0 },
    chord: { wall: 0.9, oac: 0.32, cres: 0.9, cap: 0.12, flat: 0.2 },
    cone: { wall: 0.24, oac: 0.05, cres: 0.1, cap: 0.08, flat: 0 },
    relay: { wall: 0.9, oac: 0.22, cres: 0.45, cap: 0.1, flat: 0 }
  };
  const VIEWS = { walls: [-2.45, 0.42], cap: [-2.6, 0.45], chord: [-1.15, 0.42], cone: [-0.46, 0.42], relay: [-1.15, 0.42] };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** x in a short scientific form (7.18×10⁻⁵); plain decimals from 0.01 up. */
  function sci(x, d = 2) {
    if (!(x > 0)) return '0';
    let e = Math.floor(Math.log10(x));
    if (e >= -2) return fix(x, Math.max(d, 2 - e));
    let m = x / 10 ** e;
    if (Number(m.toFixed(d)) >= 10) { m /= 10; e += 1; }
    return `${m.toFixed(d)}×10${String(e).split('').map((ch) => SUP[ch]).join('')}`;
  }

  /* ---------- state ---------- */
  const S = { scene: 'walls', eps: 60, k: 1, logN: 5, zeno: 1, tau: 0.5 };

  /* ---------- the cell ΔT_ε ---------- */
  const cellCache = new Map();
  function cellOf(epsDeg) {
    const key = epsDeg.toFixed(9);
    if (cellCache.has(key)) return cellCache.get(key);
    const e = epsDeg * DEG, s = Math.sin(e), c = Math.cos(e);
    const A = [s, c, 0], B = EY.slice(), C = [0, c, s];
    const M = v3.scale(v3.add(A, C), 0.5), Q = v3.unit(v3.add(A, C));
    const Lwalls = 2 * e, Lcap = Math.acos(clamp(v3.dot(A, C), -1, 1)), Ltunnel = v3.len(v3.sub(A, C));
    const rMid = v3.len(M), dr = 1 - rMid;
    const out = { eps: epsDeg, e, s, c, A, B, C, M, Q, Lwalls, Lcap, Ltunnel, rMid, dr, omega: 2 * Math.atan(Math.tan(e / 2) ** 2) };
    cellCache.set(key, out);
    if (cellCache.size > 400) cellCache.delete(cellCache.keys().next().value);
    return out;
  }
  /** Both sides of Lagrange's identity for u, v: |u|²|v|² − (u·v)² and ½ ΣΣ (uᵢvⱼ − uⱼvᵢ)². */
  function lagrange(u, v) {
    let uu = 0, vv = 0, uv = 0, wedge = 0;
    for (let i = 0; i < 3; i++) { uu += u[i] * u[i]; vv += v[i] * v[i]; uv += u[i] * v[i]; }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (u[i] * v[j] - u[j] * v[i]) ** 2;
    return { lhs: uu * vv - uv * uv, rhs: wedge / 2 };
  }
  const fsAngle = (a, b) => Math.acos(clamp(Math.abs(v3.dot(a, b)), 0, 1));
  /** Solid angle of the spherical triangle abc (Van Oosterom–Strackee). */
  const solidAngle = (a, b, c) => Math.abs(2 * Math.atan2(v3.dot(a, v3.cross(b, c)), 1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a)));

  /* ---------- six vertices: min-plus Schur complement and the PSD completion on the same chordal graph ----------
     order [A, C | B, Q, M, O]; boundary {A, C}, interior {B, Q, M, O}. Edges: the wall arcs A–B–C, the cap arc halves
     A–Q–C, the chord halves A–M–C, the radii A–O–C and M–O. Eliminating B, Q, M, O in turn fills only A–C, so the
     filled graph is chordal with the cliques {A, B, C}, {A, Q, C}, {A, C, M, O} glued along {A, C}. */
  const NAMES = ['A', 'C', 'B', 'Q', 'M', 'O'];
  const EDGES = [[0, 2], [2, 1], [0, 3], [3, 1], [0, 4], [4, 1], [0, 5], [5, 1], [4, 5]];
  const CLIQUES = [[0, 1, 2], [0, 1, 3], [0, 1, 4, 5]], SEPS = [[0, 1], [0, 1]];
  const ROUTES = [['walls', 2], ['cap', 3], ['chord', 4], ['radii', 5]];
  function weightOf(cl, i, j) {
    const key = [Math.min(i, j), Math.max(i, j)].join('-');
    return ({ '0-2': cl.e, '1-2': cl.e, '0-3': cl.Lcap / 2, '1-3': cl.Lcap / 2, '0-4': cl.Ltunnel / 2, '1-4': cl.Ltunnel / 2, '0-5': 1, '1-5': 1, '4-5': cl.rMid })[key];
  }
  const schurCache = new Map();
  function schur(cl, zeno) {
    const key = `${cl.eps.toFixed(9)}|${zeno}`;
    if (schurCache.has(key)) return schurCache.get(key);
    const n = 6, inf = Infinity, allowed = zeno ? [2] : [2, 3, 4, 5];
    const W = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 0 : inf)));
    for (const [i, j] of EDGES) { if ((i > 1 && !allowed.includes(i)) || (j > 1 && !allowed.includes(j))) continue; W[i][j] = W[j][i] = weightOf(cl, i, j); }
    // Kleene star of the interior block (Floyd–Warshall), then W_PP ⊕ W_PI ⊗ W_II* ⊗ W_IP
    const I = [2, 3, 4, 5], star = I.map((a) => I.map((b) => W[a][b]));
    for (let t = 0; t < 4; t++) for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) star[a][b] = Math.min(star[a][b], star[a][t] + star[t][b]);
    const eff = [[0, 0], [0, 0]];
    for (let p = 0; p < 2; p++) for (let q = 0; q < 2; q++) {
      let v = W[p][q];
      for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) v = Math.min(v, W[p][I[a]] + star[a][b] + W[I[b]][q]);
      eff[p][q] = v;
    }
    // the same by eliminating one interior vertex at a time: W_ij ← min(W_ij, W_ib + W_bj)
    const E = W.map((r) => r.slice()), fill = [];
    let live = [0, 1, 2, 3, 4, 5];
    for (const b of I) {
      live = live.filter((x) => x !== b);
      for (const i of live) for (const j of live) {
        const via = E[i][b] + E[b][j];
        if (via < E[i][j]) { if (i < j && E[i][j] === inf) fill.push([NAMES[i], NAMES[j]]); E[i][j] = via; }
      }
    }
    const lengths = { walls: cl.Lwalls, cap: cl.Lcap, chord: cl.Ltunnel, radii: 2 };
    const open = ROUTES.filter(([, v]) => allowed.includes(v));
    let route = null;
    for (const [name] of open) if (Math.abs(lengths[name] - eff[0][1]) < 1e-12) { route = name; break; }
    const out = { allowed: allowed.map((i) => NAMES[i]), weights: W, effective: eff[0][1], eliminated: E[0][1], residual: Math.abs(eff[0][1] - E[0][1]), fill, route, lengths, open: open.map(([nm]) => nm) };
    schurCache.set(key, out);
    if (schurCache.size > 200) schurCache.delete(schurCache.keys().next().value);
    return out;
  }
  /* small dense linear algebra */
  function inverse(Min) {
    const n = Min.length, A = Min.map((r, i) => r.concat(Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))));
    for (let c = 0; c < n; c++) {
      let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
      [A[c], A[p]] = [A[p], A[c]];
      const d = A[c][c]; for (let j = 0; j < 2 * n; j++) A[c][j] /= d;
      for (let r = 0; r < n; r++) if (r !== c) { const f = A[r][c]; if (f) for (let j = 0; j < 2 * n; j++) A[r][j] -= f * A[c][j]; }
    }
    return A.map((r) => r.slice(n));
  }
  /** Eigenvalues of a symmetric matrix (cyclic Jacobi). */
  function eigSym(Min) {
    const n = Min.length, A = Min.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] ** 2;
      if (off < 1e-26) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
        if (Math.abs(A[p][q]) < 1e-300) continue;
        const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) { const a = A[k][p], b = A[k][q]; A[k][p] = c * a - s * b; A[k][q] = s * a + c * b; }
        for (let k = 0; k < n; k++) { const a = A[p][k], b = A[q][k]; A[p][k] = c * a - s * b; A[q][k] = s * a + c * b; }
      }
    }
    return A.map((r, i) => r[i]).sort((a, b) => a - b);
  }
  const compCache = new Map();
  /** The max-determinant PSD completion of the Gaussian-kernel partial matrix given on the cliques. */
  function completion(cl) {
    const key = cl.eps.toFixed(9);
    if (compCache.has(key)) return compCache.get(key);
    const pts = [cl.A, cl.C, cl.B, cl.Q, cl.M, O3];
    const ker = (i, j) => Math.exp(-(v3.len(v3.sub(pts[i], pts[j])) ** 2) / (2 * SIGMA * SIGMA));
    const spec = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => i === j));
    for (const [i, j] of EDGES.concat([[0, 1]])) spec[i][j] = spec[j][i] = true;
    const partial = Array.from({ length: 6 }, (_, i) => Array.from({ length: 6 }, (_, j) => (spec[i][j] ? ker(i, j) : null)));
    const J = Array.from({ length: 6 }, () => new Array(6).fill(0));
    const pad = (set, sgnv) => {
      const inv = inverse(set.map((i) => set.map((j) => partial[i][j])));
      set.forEach((i, a) => set.forEach((j, b) => { J[i][j] += sgnv * inv[a][b]; }));
    };
    CLIQUES.forEach((c) => pad(c, 1)); SEPS.forEach((s) => pad(s, -1));
    const X = inverse(J);
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const m = (X[i][j] + X[j][i]) / 2; X[i][j] = X[j][i] = m; }
    let match = 0; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) if (spec[i][j]) match = Math.max(match, Math.abs(X[i][j] - partial[i][j]));
    const cliqueMin = CLIQUES.map((c) => eigSym(c.map((i) => c.map((j) => partial[i][j])))[0]);
    const eig = eigSym(X), filled = [];
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (!spec[i][j]) filled.push({ pair: `${NAMES[i]}${NAMES[j]}`, value: X[i][j], kernel: ker(i, j) });
    const out = { sigma: SIGMA, partial, specified: spec, completed: X, lambdaMin: eig[0], eigenvalues: eig, cliqueMin, match, filled };
    compCache.set(key, out);
    if (compCache.size > 100) compCache.delete(compCache.keys().next().value);
    return out;
  }

  /* ---------- the multi-scale pivot cone ---------- */
  const hierCache = new Map();
  function hierarchy(cl, D, k) {
    const key = `${cl.eps.toFixed(9)}|${D}|${k}`;
    if (hierCache.has(key)) return hierCache.get(key);
    // Sierpiński bisection: tri(a, m, c) has its right angle at m and hypotenuse a–c; split at the midpoint of a–c
    const tris = [];
    const rec = (a, m, c, d) => { if (d === 0) { tris.push([a, m, c]); return; } const h = v3.unit(v3.add(a, c)); rec(a, h, m, d - 1); rec(m, h, c, d - 1); };
    rec(cl.A, cl.B, cl.C, D);
    const verts = [], vindex = new Map();
    const vid = (p) => { const kk = p.map((x) => x.toFixed(9)).join(','); if (!vindex.has(kk)) { vindex.set(kk, verts.length); verts.push(p); } return vindex.get(kk); };
    const leaves = tris.map((t, i) => {
      const ids = t.map(vid), area = solidAngle(t[0], t[1], t[2]);
      return { i, ids, area, pos: v3.unit(v3.add(v3.add(t[0], t[1]), t[2])) };
    });
    const N = leaves.length;
    // the leaf graph: two leaves are neighbours when they share an edge (two vertices)
    const adj = Array.from({ length: N }, () => []), edges = [];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const shared = leaves[i].ids.filter((x) => leaves[j].ids.includes(x)).length;
      if (shared === 2) { const w = Math.acos(clamp(v3.dot(leaves[i].pos, leaves[j].pos), -1, 1)); adj[i].push([j, w]); adj[j].push([i, w]); edges.push([i, j]); }
    }
    // Dijkstra from the leaf at A: the total order a serial algorithm outputs
    const dist = new Array(N).fill(Infinity), done = new Array(N).fill(false), order = [];
    dist[0] = 0;
    for (let it = 0; it < N; it++) {
      let u = -1; for (let x = 0; x < N; x++) if (!done[x] && (u < 0 || dist[x] < dist[u])) u = x;
      if (u < 0 || dist[u] === Infinity) break;
      done[u] = true; order.push(u);
      for (const [v, w] of adj[u]) if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;
    }
    // levels: groups of k consecutive nodes condense into a pivot of the next level
    const diameter = (lo, hi) => {
      const set = new Set(); for (let i = lo; i < hi; i++) leaves[i].ids.forEach((x) => set.add(x));
      const ids = [...set]; let best = 0;
      for (let a = 0; a < ids.length; a++) for (let b = a + 1; b < ids.length; b++) best = Math.max(best, Math.acos(clamp(v3.dot(verts[ids[a]], verts[ids[b]]), -1, 1)));
      return best;
    };
    const levels = [leaves.map((lf) => ({ pos: lf.pos, dir: lf.pos, r: 1, lo: lf.i, hi: lf.i + 1, children: [], theta: 0 }))];
    if (k >= 2) {
      while (levels[levels.length - 1].length > 1) {
        const prev = levels[levels.length - 1], nodes = [];
        for (let j = 0; j * k < prev.length; j++) {
          const children = []; for (let i = j * k; i < Math.min(prev.length, j * k + k); i++) children.push(i);
          const lo = prev[children[0]].lo, hi = prev[children[children.length - 1]].hi;
          let sum = [0, 0, 0]; for (let i = lo; i < hi; i++) sum = v3.add(sum, v3.scale(leaves[i].pos, leaves[i].area));
          const dir = v3.unit(sum), theta = diameter(lo, hi), r = Math.cos(theta / 2);
          nodes.push({ pos: v3.scale(dir, r), dir, r, lo, hi, children, theta });
        }
        levels.push(nodes);
      }
    }
    const counts = levels.map((l) => l.length);
    // fiber decomposition and partition topology of the first readout q: leaves → level-1 pivots (identity if k = 1)
    const q = leaves.map((lf) => (k >= 2 ? Math.floor(lf.i / k) : lf.i));
    const fibers = new Map(); q.forEach((b, x) => { if (!fibers.has(b)) fibers.set(b, []); fibers.get(b).push(x); });
    const sigma = [...fibers.entries()].flatMap(([b, xs]) => xs.map((x) => [b, x]));
    const roundTrip = sigma.length === N && new Set(sigma.map(([, x]) => x)).size === N && sigma.every(([b, x]) => q[x] === b);
    let agree = 0, inseparable = 0;
    for (let x = 0; x < N; x++) for (let y = 0; y < N; y++) {
      // x, y inseparable in the partition topology: every preimage q⁻¹({b}) holds both or neither
      let insep = true; for (const b of fibers.keys()) if ((q[x] === b) !== (q[y] === b)) { insep = false; break; }
      if (insep === (q[x] === q[y])) agree++;
      if (insep) inseparable++;
    }
    let levelSums = true;
    for (let l = 1; l < levels.length; l++) if (levels[l].reduce((a, nd) => a + nd.children.length, 0) !== levels[l - 1].length) levelSums = false;
    const out = {
      N, D, k, leaves, verts, edges, adj, order, dist, levels, counts, depth: levels.length - 1,
      apex: levels.length > 1 ? levels[levels.length - 1][0] : null,
      partition: { classes: fibers.size, pairs: N * N, agree, inseparable, fiberSizes: [...fibers.values()].map((xs) => xs.length), roundTrip, levelSums },
      m: edges.length, sortTax: N * D, dmmsy: edges.length * Math.pow(D, 2 / 3), fredmanTarjan: edges.length + N * D,
      capArea: leaves.reduce((a, lf) => a + lf.area, 0)
    };
    hierCache.set(key, out);
    if (hierCache.size > 60) hierCache.delete(hierCache.keys().next().value);
    return out;
  }

  /* ---------- tunnelling through the chord ---------- */
  const cx = {
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    neg: (a) => [-a[0], -a[1]],
    div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
    exp: (a) => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; }
  };
  const wave = (E, V) => (E >= V ? [Math.sqrt(E - V), 0] : [0, Math.sqrt(V - E)]);
  /** [[e^{iqx}, e^{−iqx}], [iq e^{iqx}, −iq e^{−iqx}]]: amplitudes (a, b) → (ψ, ψ′) at x. */
  function waveMat(q, x) {
    const iqx = [-q[1] * x, q[0] * x], ep = cx.exp(iqx), em = cx.exp(cx.neg(iqx)), iq = [-q[1], q[0]];
    return [[ep, em], [cx.mul(iq, ep), cx.mul(cx.neg(iq), em)]];
  }
  const m2mul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => { const a = cx.mul(A[i][0], B[0][j]), b = cx.mul(A[i][1], B[1][j]); return [a[0] + b[0], a[1] + b[1]]; }));
  function m2inv(A) {
    const det = cx.sub(cx.mul(A[0][0], A[1][1]), cx.mul(A[0][1], A[1][0]));
    return [[cx.div(A[1][1], det), cx.div(cx.neg(A[0][1]), det)], [cx.div(cx.neg(A[1][0]), det), cx.div(A[0][0], det)]];
  }
  /** Transmission through layers [{ V, w }] between two free leads (V = 0): T = 1/|M₂₂|². */
  function transmission(E, layers) {
    const reg = [{ V: 0 }].concat(layers, [{ V: 0 }]);
    let x = 0, M = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
    for (let j = 0; j + 1 < reg.length; j++) {
      if (j > 0) x += layers[j - 1].w;
      M = m2mul(m2mul(m2inv(waveMat(wave(E, reg[j + 1].V), x)), waveMat(wave(E, reg[j].V), x)), M);
    }
    return 1 / (M[1][1][0] ** 2 + M[1][1][1] ** 2);
  }
  const relayCache = new Map();
  /** One thick barrier of length Lb against two halves Lb/2 with a well of width d between them, d tuned to resonance
      in (0, π/k₀] (one Fabry–Pérot period). */
  function relayOf(Lb) {
    const key = Lb.toFixed(10);
    if (relayCache.has(key)) return relayCache.get(key);
    const Td = (d) => transmission(PHYS.E, [{ V: PHYS.V0, w: Lb / 2 }, { V: 0, w: d }, { V: PHYS.V0, w: Lb / 2 }]);
    const span = PI / K0, n = 240;
    let bd = span / n, bt = -1;
    for (let i = 1; i <= n; i++) { const d = span * i / n, t = Td(d); if (t > bt) { bt = t; bd = d; } }
    let a = Math.max(1e-7, bd - span / n), b = Math.min(span, bd + span / n);
    for (let it = 0; it < 80; it++) { const m1 = a + (b - a) * 0.381966, m2 = b - (b - a) * 0.381966; if (Td(m1) < Td(m2)) a = m1; else b = m2; }
    const d = (a + b) / 2;
    const out = { d, T: Td(d), Tthick: transmission(PHYS.E, [{ V: PHYS.V0, w: Lb }]), Thalf: transmission(PHYS.E, [{ V: PHYS.V0, w: Lb / 2 }]), action: KAPPA * Lb };
    relayCache.set(key, out);
    if (relayCache.size > 400) relayCache.delete(relayCache.keys().next().value);
    return out;
  }
  /** Coherent transfer interrupted by n projective mid-step sorts: 1 − cos²ⁿ(π/2n). */
  const zenoTransfer = (n) => 1 - Math.cos(PI / (2 * n)) ** (2 * n);

  /** Everything the page shows, from the state. */
  function model() {
    const cl = cellOf(S.eps), N = 2 ** S.logN, H = hierarchy(cl, S.logN, S.k), sch = schur(cl, S.zeno), cmp = completion(cl);
    const rel = relayOf(cl.Ltunnel), lg = lagrange(cl.A, cl.C);
    const route = S.scene === 'cone' ? (S.zeno || S.k < 2 ? 'crawl' : 'pivots') : S.zeno ? 'walls' : ({ walls: 'walls', cap: 'cap', chord: 'chord', relay: 'chord' })[S.scene];
    return {
      cl, N, H, sch, cmp, rel, lg, route,
      fs: { AB: fsAngle(cl.A, cl.B), BC: fsAngle(cl.B, cl.C), AC: fsAngle(cl.A, cl.C) },
      zeno: zenoTransfer(N), order: cl.Ltunnel < cl.Lcap && cl.Lcap < cl.Lwalls
    };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEWS.walls[0], pitch: VIEWS.walls[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 10 : o.r });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* The projection is fitted to the HUD-free rect from the cell itself (O, A, B, C and its three arcs), taken at
     max(ε, 40°): above 40° the cell fills the stage at every ε; below it the small cell sits in the 40° frame. The fit
     is held while the handle is dragged, so the corner stays under the pointer. */
  const arcPts = (p, q, n = 24, r = 1) => Array.from({ length: n + 1 }, (_, i) => v3.scale(v3.slerp(p, q, i / n), r));
  const fitPts = (eps) => { const c = cellOf(Math.max(40, eps)); return [O3, c.A, c.B, c.C, ...arcPts(c.A, c.B, 8), ...arcPts(c.B, c.C, 8), ...arcPts(c.A, c.C, 8)]; };
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(area, W, H) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPts(S.eps)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = 0.06 * (x1 - x0), py = 0.06 * (y1 - y0);
    const unit = Math.max(20, Math.min(area.w / (x1 - x0 + 2 * px), area.h / (y1 - y0 + 2 * py)));
    const u = unit * (sc.cam.zoom || 1);
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2 - u * (x0 + x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + u * (y0 + y1) / 2) / Math.max(1, H);
    return unit;
  }

  /** The point of the scene's route at progress t ∈ [0, 1]. */
  function routePoint(M, t) {
    const { cl, H } = M;
    if (M.route === 'walls') return t <= 0.5 ? v3.scale(v3.slerp(cl.A, cl.B, 2 * t), 1.012) : v3.scale(v3.slerp(cl.B, cl.C, 2 * t - 1), 1.012);
    if (M.route === 'cap') return v3.scale(v3.slerp(cl.A, cl.C, t), 1.012);
    if (M.route === 'chord') return v3.lerp(cl.A, cl.C, t);
    const chain = M.route === 'pivots' ? H.levels.map((lv) => lv[0].pos) : H.order.map((i) => v3.scale(H.leaves[i].pos, 1.008));
    if (chain.length < 2) return chain[0];
    const x = clamp(t, 0, 1) * (chain.length - 1), i = Math.min(chain.length - 2, Math.floor(x)), f = x - i;
    return M.route === 'pivots' ? v3.lerp(chain[i], chain[i + 1], f) : v3.scale(v3.slerp(v3.unit(chain[i]), v3.unit(chain[i + 1]), f), 1.008);
  }

  let FRAME = null, FIT = null;
  const unitLine = (pts, s) => sc.line(pts, s);
  /** Small octahedra at the points (one keyed solid for many marks). */
  function dots(key, pts, rpx, color, alpha) {
    if (!pts.length) return;
    const r = rpx / Math.max(1, sc.unit), vertices = [], faces = [];
    const F = [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]];
    pts.forEach((p) => {
      const b = vertices.length;
      for (const d of [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]) vertices.push(v3.add(p, v3.scale(d, r)));
      F.forEach((f) => faces.push(f.map((x) => x + b)));
    });
    sc.poly(key, { vertices, faces }, { color, alpha: alpha == null ? 1 : alpha, edges: false, pick: false });
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const { cl } = M, scene = S.scene, { A, B, C } = cl;
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    sc.begin();

    /* the walls run on towards ε = 90°: a faint stretch of each wall arc beyond A and C */
    if (S.eps < EPS_MAX - 0.5) {
      const far = Math.min(EPS_MAX, S.eps + 18) * DEG;
      unitLine(arcPts(A, [Math.sin(far), Math.cos(far), 0], 12), { color: P.dim, width: 1, alpha: 0.6 });
      unitLine(arcPts(C, [0, Math.cos(far), Math.sin(far)], 12), { color: P.dim, width: 1, alpha: 0.6 });
    }

    /* the cell: two violet walls, the oblique face OAC (cyan, flat), the crescent between chord and arc (magenta),
       the convex cap (magenta) and, in the chord scene, the flat secant face △ABC */
    const look = LOOK[scene];
    const sector = (key, X) => sc.surface(key, (u, v) => v3.scale(v3.slerp(cl.B, X, v), u),
      { u: [0, 1], v: [0, 1], nu: 6, nv: 24, color: P.violet, alpha: look.wall, grid: { every: [2, 6], color: P.ink, alpha: 0.22 }, pick: false });
    sector('wallAB', A); sector('wallBC', C);
    sc.surface('faceOAC', (u, v) => v3.scale(v3.lerp(A, C, v), u), { u: [0, 1], v: [0, 1], nu: 6, nv: 16, color: P.cyan, alpha: look.oac, grid: { every: [3, 4], color: P.cyan, alpha: 0.25 }, pick: false });
    sc.surface('crescent', (u, v) => { const p = v3.lerp(A, C, v); return v3.lerp(p, v3.unit(p), u); }, { u: [0, 1], v: [0, 1], nu: 4, nv: 32, color: P.magenta, alpha: look.cres, pick: false });
    sc.surface('cap', (u, v) => v3.unit(v3.lerp(cl.B, v3.lerp(A, C, v), u)),
      { u: [0, 1], v: [0, 1], nu: 20, nv: 20, color: P.magenta, alpha: look.cap, grid: { every: [4, 4], color: P.ink, alpha: 0.22 }, pick: false });
    if (look.flat) sc.surface('flatABC', (u, v) => v3.lerp(cl.B, v3.lerp(A, C, v), u), { u: [0, 1], v: [0, 1], nu: 2, nv: 8, color: P.cyan, alpha: look.flat, pick: false });

    /* the three routes from A to C */
    const zen = !!S.zeno, hot = M.route;
    sc.tube('arcAB', arcPts(A, cl.B, 32, 1.004), { color: P.violet, width: hot === 'walls' ? 4.6 : 2.4, glow: hot === 'walls' ? 0.6 : 0.3, pick: false });
    sc.tube('arcBC', arcPts(cl.B, C, 32, 1.004), { color: P.violet, width: hot === 'walls' ? 4.6 : 2.4, glow: hot === 'walls' ? 0.6 : 0.3, pick: false });
    sc.tube('arcAC', arcPts(A, C, 40, 1.006), { color: P.magenta, width: hot === 'cap' ? 4.6 : 2.2, glow: hot === 'cap' ? 0.6 : 0.3, pick: false });
    const chordOpen = !(zen && (scene === 'chord' || scene === 'relay'));
    if (chordOpen) sc.tube('chord', [A, cl.M, C], { color: P.cyan, width: hot === 'chord' ? 4.6 : 2.2, glow: hot === 'chord' ? 0.65 : 0.3, pick: false });
    else unitLine([A, C], { color: P.cyan, width: 1.6, alpha: 0.6, dash: [5, 5] });

    /* the corners */
    sc.bead(O3, { key: 'O', color: P.dim, r: 3.6 });
    sc.bead(A, { key: 'A', color: P.sigma, r: 4.2 });
    sc.bead(cl.B, { key: 'B', color: P.sigma, r: 4.2 });
    sc.bead(C, { key: 'C', color: P.sigma, r: 4.2 });
    at(O3, 'O', 'raw ink backed', 10, [-1, 0.6]);
    at(A, 'A', 'raw ink backed', 12, [1, 0.4]);
    at(cl.B, 'B', 'raw ink backed', 12, [-0.4, -1]);
    at(C, 'C', 'raw ink backed', 12, [0.2, -1]);

    if (scene === 'walls') {
      sc.ring(v3.scale(cl.B, 1.01), { key: 'sortRing', color: P.violet, r: 12, normal: cl.B });
      at(v3.scale(cl.B, 1.01), `${L('全局排序', 'global sort')} n log₂ n = ${M.H.sortTax}`, 'raw c-vi backed', 9, [-1, -0.6]);
      at(v3.slerp(A, cl.B, 0.5), `2ε = ${fix(cl.Lwalls, 3)}`, 'raw c-vi backed', 8, null);
    } else if (scene === 'cap') {
      // k unsorted wavefronts round A, kept inside the cap: geodesic circles of radius (τ − j/(k+2))·arc AC
      const nA = v3.cross(A, C), side = (p) => [v3.dot(p, v3.cross(A, cl.B)), v3.dot(p, v3.cross(cl.B, C)), v3.dot(p, v3.cross(C, A))];
      const sgn = Math.sign(v3.dot(C, v3.cross(A, cl.B)));
      const e1 = v3.unit(v3.cross(nA, A)), e2 = v3.unit(nA);
      for (let j = 0; j < Math.max(1, S.k); j++) {
        const rho = (S.tau - j / (S.k + 2)) * cl.Lcap * 1.35;
        if (rho <= 0.004) continue;
        let run = [], runs = [];
        for (let i = 0; i <= 240; i++) {
          const a = 2 * PI * i / 240, d = v3.add(v3.scale(e1, Math.cos(a)), v3.scale(e2, Math.sin(a))), p = v3.add(v3.scale(A, Math.cos(rho)), v3.scale(d, Math.sin(rho)));
          const s = side(p), inside = s.every((x) => x * sgn >= -1e-9);
          if (inside) run.push(v3.scale(p, 1.008)); else if (run.length) { runs.push(run); run = []; }
        }
        if (run.length) runs.push(run);
        runs.filter((r) => r.length > 1).forEach((r, n) => sc.tube(`wave-${j}-${n}`, r, { color: P.magenta, width: j ? 2.6 : 3.8, glow: 0.95, alpha: 1 - j * 0.2, pick: false }));
      }
      at(v3.scale(cl.Q, 1.01), `arccos(cos²ε) = ${fix(cl.Lcap, 3)}`, 'raw c-mg backed', 9, null);
      at(v3.unit(v3.add(v3.add(A, cl.B), C)), `Ω = ${fix(cl.omega / DEG, 2)}°`, 'raw c-mg backed', 8, null);
    } else if (scene === 'chord') {
      sc.bead(cl.M, { key: 'M', color: P.cyan, r: 4.4 });
      sc.bead(cl.Q, { key: 'Q', color: P.magenta, r: 3.6 });
      unitLine([cl.Q, cl.M], { color: P.magenta, width: 1.6, dash: [4, 3] });
      at(cl.M, `M · √2 sin ε = ${fix(cl.Ltunnel, 3)}`, 'raw c-cy backed', 9, null);
      at(v3.lerp(cl.Q, cl.M, 0.5), `Δr = ${fix(cl.dr, 3)}`, 'raw c-mg backed', 8, null);
    } else if (scene === 'cone') {
      const Hh = M.H, lvls = Hh.levels, Lv = Hh.depth, shown = Lv ? Math.floor(clamp(S.tau, 0, 1) * Lv + 1e-9) : 0, crawl = M.route === 'crawl';
      dots('leaves', Hh.leaves.map((lf) => v3.scale(lf.pos, 1.008)), 3.4, P.cyan, 1);
      // the Dijkstra thread on r = 1: the settle order, joined along the sphere (the route itself when it crawls)
      const thread = [];
      Hh.order.forEach((i, n) => { if (n) { const a = Hh.leaves[Hh.order[n - 1]].pos, b = Hh.leaves[i].pos; for (let s = 1; s <= 4; s++) thread.push(v3.scale(v3.slerp(a, b, s / 4), 1.004)); } else thread.push(v3.scale(Hh.leaves[i].pos, 1.004)); });
      unitLine(thread, { color: P.ink, width: crawl ? 1.4 : 1, alpha: crawl ? 0.85 : 0.16 });
      const pivAlpha = crawl ? 0.3 : 1;
      for (let l = 1; l <= shown; l++) {
        if (l === 1) {
          // Λ²: the k-step wavefront patch of each first-level pivot, a small fan over its k leaves
          const vertices = [], faces = [];
          lvls[1].forEach((nd) => {
            if (nd.children.length < 2) return;
            const b = vertices.length; vertices.push(nd.pos); nd.children.forEach((ci) => vertices.push(v3.scale(lvls[0][ci].pos, 1.004)));
            for (let t = 1; t + 1 <= nd.children.length; t++) faces.push([b, b + t, b + t + 1]);
          });
          if (faces.length) sc.poly('fan-1', { vertices, faces }, { color: P.magenta, alpha: crawl ? 0.1 : 0.5, edges: false, pick: false });
        }
        // Λ³_ℓ ≡ Λ⁰_{ℓ+1}: every pivot is joined to the points it gathers
        lvls[l].forEach((nd, j) => {
          const path = [];
          nd.children.forEach((ci) => { path.push(lvls[l - 1][ci].pos, nd.pos); });
          sc.tube(`link-${l}-${j}`, path, { color: P.violet, width: l === 1 ? 1.2 : 1.8, glow: 0.45, alpha: pivAlpha, pick: false });
        });
        dots(`piv-${l}`, lvls[l].map((nd) => nd.pos), l === Lv ? 6.5 : 4.2, P.violet, pivAlpha);
      }
      // the chord midpoint M at r_mid: the apex sinks exactly this deep
      sc.bead(cl.M, { key: 'M', color: P.cyan, r: 4.2 });
      if (Hh.apex && shown === Lv) {
        unitLine([Hh.apex.pos, Hh.apex.dir], { color: P.violet, width: 1.4, dash: [4, 3], alpha: 0.9 });
        at(Hh.apex.pos, `Λ³ · r = ${fix(Hh.apex.r, 3)}`, 'raw c-vi backed', 9, [0.3, 1]);
      }
      at(cl.M, `M · r = ${fix(cl.rMid, 3)}`, 'raw c-cy backed', 7, null);
      at(v3.scale(Hh.leaves[Hh.leaves.length - 1].pos, 1.01), `Λ⁰ · N = ${Hh.N}`, 'raw c-cy backed', 8, [0.6, -1]);
      if (crawl) at(v3.scale(Hh.leaves[Hh.order[Math.min(Hh.order.length - 1, Math.round(Hh.N * 0.35))]].pos, 1.01), `Dijkstra · n log₂ n = ${Hh.sortTax}`, 'raw ink backed', 6, null);
    } else if (scene === 'relay') {
      const R = M.rel, half = (p, q, key) => sc.tube(key, [p, q], { r: 0.03, color: P.violet, alpha: chordOpen ? 0.5 : 0.22, glow: 0.2, pick: false });
      half(A, v3.lerp(A, C, 0.47), 'barrier1'); half(v3.lerp(A, C, 0.53), C, 'barrier2');
      sc.bead(cl.M, { key: 'pivot', color: P.violet, r: 5.4 });
      if (chordOpen) {
        sc.ring(cl.M, { key: 'pivotRing', color: P.amber, r: 11 });
        at(cl.M, `T = ${fix(R.T, 4)}`, 'raw c-cy backed', 9, [0.2, 1]);
        at(v3.lerp(A, C, 0.22), `${L('厚势垒', 'thick barrier')} ${sci(R.Tthick)}`, 'raw c-vi backed', 7, null);
      } else {
        const n = Math.min(16, M.N);
        for (let i = 1; i < n; i++) { const t = i / n, p = t <= 0.5 ? v3.slerp(A, cl.B, 2 * t) : v3.slerp(cl.B, C, 2 * t - 1); sc.ring(v3.scale(p, 1.012), { key: `probe-${i}`, color: P.magenta, r: 5, normal: p }); }
        at(v3.scale(cl.B, 1.01), `${L('芝诺', 'Zeno')} n = ${M.N} · ${fix(M.zeno, 3)}`, 'raw c-mg backed', 9, [-1, -0.6]);
      }
    }

    /* the amber read head on the route */
    const head = routePoint(M, S.tau);
    if (head) sc.bead(head, { key: 'head', color: P.amber, r: 6 });
    sc.end();

    /* the handle: on A, it drags ε */
    const hq = !thumb ? sc.p(A) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p(v3.scale(v3.add(v3.add(A, cl.B), C), 0.3));
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy, head: head ? sc.p(head) : null };
  }

  /* ---------- the ε handle: a button on A, dragged along the wall z = 0 ---------- */
  const handle = $('epsHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The opening angle (degrees) whose corner A projects nearest to the pointer. */
  function epsAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop;
    let best = S.eps, bd = Infinity;
    for (let k = 0; k <= 320; k++) {
      const e = EPS_MIN + (EPS_MAX - EPS_MIN) * k / 320, q = sc.p([Math.sin(e * DEG), Math.cos(e * DEG), 0]), d = Math.hypot(q[0] - x, q[1] - y);
      if (d < bd) { bd = d; best = e; }
    }
    return Math.round(best * 4) / 4;
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    setEps(epsAt(ev));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    setEps(S.eps + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1));
  });

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE_NAMES = { walls: ['双侧壁', 'Twin walls'], cap: ['外凸顶盖', 'Convex cap'], chord: ['内割弦', 'Interior chord'], cone: ['全息枢轴锥', 'Pivot cone'], relay: ['共振中继', 'Resonant relay'] };
  const LEGENDS = {
    walls: () => [['vi', L('双侧壁与壁上路 2ε', 'twin walls, route 2ε')], ['mg', L('外凸顶盖', 'convex cap')], ['cy', L('内割弦', 'interior chord')], ['am', L('读头', 'read head')]],
    cap: () => [['mg', L('顶盖与 k 道波前', 'cap and k wavefronts')], ['vi', L('双侧壁', 'twin walls')], ['cy', L('内割弦', 'interior chord')], ['am', L('读头', 'read head')]],
    chord: () => [['cy', L('内割弦与平切面', 'chord and flat cuts')], ['mg', L('月牙鼓包 Δr', 'crescent bulge Δr')], ['vi', L('双侧壁', 'twin walls')], ['am', L('读头', 'read head')]],
    cone: () => [['cy', L('边界点 Λ⁰', 'boundary Λ⁰')], ['mg', L('波前片 Λ²', 'wavefront Λ²')], ['vi', L('枢轴 Λ³', 'pivots Λ³')], ['ik', L('Dijkstra 全序', 'Dijkstra order')]],
    relay: () => (S.zeno
      ? [['mg', L('芝诺探针', 'Zeno probes')], ['vi', L('双侧壁与势垒', 'walls and barrier')], ['cy', L('关闭的弦', 'closed chord')], ['am', L('读头', 'read head')]]
      : [['cy', L('瞬子捷径', 'instanton chord')], ['vi', L('势垒与枢轴', 'barrier and pivot')], ['am', L('读头与当前枢轴', 'head, current pivot')]])
  };
  function hudText(M) {
    const { cl, H } = M, sc0 = S.scene, name = L(...SCENE_NAMES[sc0]);
    let big, sub;
    if (sc0 === 'walls') {
      big = `${name} · 2ε = ${fix(cl.Lwalls, 3)}`;
      sub = `A → B → C · ${L('B 处全局排序', 'global sort at B')}`;
    } else if (sc0 === 'cap') {
      big = `${name} · arccos(cos²ε) = ${fix(cl.Lcap, 3)}`;
      sub = `Ω = ${fix(cl.omega / DEG, 2)}° · k = ${S.k}`;
    } else if (sc0 === 'chord') {
      big = `${name} · √2 sin ε = ${fix(cl.Ltunnel, 3)}`;
      sub = S.zeno ? L('芝诺探针：弦关闭，回到双壁', 'Zeno probe: chord closed, back on the walls') : `Δr = ${fix(cl.dr, 4)} · r = ${fix(cl.rMid, 4)}`;
    } else if (sc0 === 'cone') {
      big = H.depth ? `${name} · ${H.counts.join(' → ')}` : `${name} · k = 1`;
      sub = H.depth ? `k = ${S.k} · r = ${fix(H.apex.r, 3)} · ${L('与 M 同深', 'as deep as M')}` : L('k = 1：不凝聚，全序贴着 r = 1', 'k = 1: no pivots, the order hugs r = 1');
    } else {
      big = S.zeno ? `${L('芝诺探针', 'Zeno probe')} · ${fix(M.zeno, 3)}` : `${name} · T = ${fix(M.rel.T, 4)}`;
      sub = S.zeno ? `n = ${M.N} · 1 − cos²ⁿ(π/2n)` : `${L('厚势垒', 'thick barrier')} ${sci(M.rel.Tthick)} · κL = ${fix(M.rel.action, 2)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[sc0]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const NOTES_RO = {
    walls: ['串行路线每经过一个顶点都要先排好序：N 个点的全序要 n log₂ n 次比较。三条路的先后顺序在 ε ∈ [10°, 90°] 上逐度核对，从不翻转。', 'A serial route sorts at every vertex it passes: a total order of N points takes n log₂ n comparisons. The order of the three routes is checked degree by degree over ε ∈ [10°, 90°] and never flips.'],
    cap: ['顶盖测地弧比双壁短：arccos(cos²ε) ≤ 2ε 是 FS 角三角不等式的一个实例；省下的路在 ε = 90° 时是 π/2。', 'The cap arc is shorter than the walls: arccos(cos²ε) ≤ 2ε is an instance of the FS-angle triangle inequality; at ε = 90° it saves π/2.'],
    chord: ['弦长 √2 sin ε 与面积 |A ∧ C| = sin(arccos(cos²ε)) 由拉格朗日恒等式锁在一起：|A ∧ C| = √2 sin ε · r<sub>mid</sub>。', 'The chord √2 sin ε and the area |A ∧ C| = sin(arccos(cos²ε)) are locked by the identity of Lagrange: |A ∧ C| = √2 sin ε · r<sub>mid</sub>.'],
    cone: ['每层 ⌈n/k⌉ 个枢轴；第一层的读出把 N 个边界点分成 ⌈N/k⌉ 个不可分类。比较次数指标只是主项，不含常数。', 'Each level keeps ⌈n/k⌉ pivots; the first readout splits the N boundary points into ⌈N/k⌉ inseparable classes. The comparison indices are leading terms without constants.'],
    relay: ['势垒按 E = 16、V₀ = 32（ħ = 2m = 1，球半径为长度单位）取；共振阱宽在一个法布里—珀罗周期 (0, π/k₀] 里调。', 'The barrier takes E = 16, V₀ = 32 (ħ = 2m = 1, the sphere radius as the unit of length); the well width is tuned within one Fabry–Pérot period (0, π/k₀].']
  };
  const FORMULA = {
    walls: 'L<sub>walls</sub> = 2ε · fsAngle(A, B) = fsAngle(B, C) = ε',
    cap: 'L<sub>cap</sub> = arccos(cos²ε) ≤ 2ε · Ω = 2 arctan(tan²(ε/2))',
    chord: 'W<sub>eff</sub> = min(W<sub>AC</sub>, min<sub>b</sub> W<sub>Ab</sub> + W<sub>bC</sub>) · Δr = 1 − √((1 + cos²ε)/2)',
    cone: 'Λ³<sub>ℓ</sub> ≡ Λ⁰<sub>ℓ+1</sub> · r<sub>ℓ</sub> = cos(θ<sub>ℓ</sub>/2)',
    relay: 'S<sub>E</sub> = ∫ √(2m(V − E)) ds = κL · T<sub>thick</sub> ≈ e<sup>−2κL</sup>'
  };
  function drawText(M) {
    const { cl, H, sch, cmp, rel } = M;
    $('roOrder').innerHTML = `${fix(cl.Ltunnel, 4)} &lt; ${fix(cl.Lcap, 4)} &lt; ${fix(cl.Lwalls, 4)}`;
    $('roOrderSub').innerHTML = M.order ? '√2 sin ε &lt; arccos(cos²ε) &lt; 2ε' : L('先后翻转', 'order flipped');
    $('roBulk').innerHTML = `Δr = ${fix(cl.dr, 4)} · r<sub>mid</sub> = ${fix(cl.rMid, 4)} · ε²/4 = ${fix(cl.e * cl.e / 4, 4)}`;
    $('roArea').innerHTML = `Ω = ${fix(cl.omega / DEG, 2)}° · |A∧C|² = ${fix(M.lg.lhs, 4)} = 2 sin²ε · r<sub>mid</sub>²`;
    $('roSchur').innerHTML = `W<sub>eff</sub>(A, C) = ${fix(sch.effective, 4)} · ${L('经', 'via')} ${sch.route === 'walls' ? 'B' : sch.route === 'cap' ? 'Q' : sch.route === 'chord' ? 'M' : 'O'} · λ<sub>min</sub> = ${fix(cmp.lambdaMin, 4)}`;
    $('roCone').innerHTML = H.depth
      ? `${H.counts.join(' → ')} · ${H.partition.classes} ${L('类', 'classes')} · n log₂ n = ${H.sortTax} · m log<sup>2/3</sup> n = ${fix(H.dmmsy, 0)}`
      : `N = ${H.N} · k = 1 · ${H.N} ${L('个单点', 'singletons')} · n log₂ n = ${H.sortTax}`;
    $('roRelay').innerHTML = `T<sub>res</sub> = ${fix(rel.T, 4)} · T<sub>thick</sub> = ${sci(rel.Tthick)} · ${L('芝诺', 'Zeno')} ${fix(M.zeno, 3)}`;
    $('roNote').innerHTML = L(...NOTES_RO[S.scene]);
    $('scenePill').innerHTML = `ε <strong>${fix(S.eps, 1)}°</strong>`;
    $('weffPill').innerHTML = `W <strong>${fix(sch.effective, 4)}</strong>`;
    $('hint').innerHTML = L('拖琥珀圆环改 ε · 拖空白处转视角', 'drag the amber ring to change ε · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    walls: ['三条路的长度：弦 &lt; 顶盖弧 &lt; 双壁，ε 怎么拉都不翻', 'Three route lengths: chord &lt; cap arc &lt; walls, for every ε'],
    cap: ['顶盖：角超 Ω 与省下的路 2ε − arccos(cos²ε)', 'The cap: excess Ω and the saving 2ε − arccos(cos²ε)'],
    chord: ['鼓包的厚度：Δr = 1 − √((1 + cos²ε)/2) 与 ε²/4', 'Thickness of the bulge: Δr = 1 − √((1 + cos²ε)/2) and ε²/4'],
    cone: ['每个点的比较因子：排序税 log₂ n 对 log<sup>2/3</sup> n', 'Comparison factor per vertex: sorting tax log₂ n against log<sup>2/3</sup> n'],
    relay: ['透射 log₁₀ T：共振中继、厚势垒与芝诺探针', 'Transmission log₁₀ T: resonant relay, thick barrier, Zeno probe']
  };
  let curveCache = null;
  function curves() {
    if (curveCache) return curveCache;
    const xs = Array.from({ length: 81 }, (_, i) => EPS_MIN + i);
    curveCache = xs.map((d) => { const c = cellOf(d), r = relayOf(c.Ltunnel); return { d, c, r }; });
    return curveCache;
  }
  /** A drawn polyline [[x, y], …] (x ascending) read back at x, linearly between its vertices. */
  const along = (pts) => (x) => {
    let i = 1; while (i < pts.length - 1 && pts[i][0] < x) i++;
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    return y0 + (y1 - y0) * (x1 === x0 ? 0 : clamp((x - x0) / (x1 - x0), 0, 1));
  };
  /** A curve label clear of its own curve: across the whole width the text covers, its glyphs (scripts included) stay
      `gap` pixels off the stroke of f, above it (default) or below it. Text set by kit.plot's g.text, data font. The
      default gap of 6 leaves at least five whole pixel rows clear, whatever the sub-pixel phase of the two edges. */
  function curveLabel(g, f, x, str, color, o = {}) {
    const size = o.size || 10.5, align = o.align || 'right', gap = o.gap == null ? 6 : o.gap, half = (o.stroke || 2.2) / 2, ctx = g.ctx;
    ctx.font = `${size}px ${TRV.fonts.data}`;
    const meas = (s) => (s ? ctx.measureText(s) : { actualBoundingBoxAscent: 0, actualBoundingBoxDescent: 0 });
    const script = (re) => (str.match(re) || []).map((s) => s.slice(2, -1)).join('');
    const sub = script(/_\{[^{}]*\}/g), sup = script(/\^\{[^{}]*\}/g), main = meas(str.replace(/[_^]\{[^{}]*\}/g, ''));
    // scripts are set at 0.72 of the size, lowered by 0.32 or raised by 0.36 of it (kit.plot's setRuns)
    const drop = Math.max(0, main.actualBoundingBoxDescent, sub ? 0.32 * size + 0.72 * meas(sub).actualBoundingBoxDescent : 0);
    const rise = Math.max(0, main.actualBoundingBoxAscent, sup ? 0.36 * size + 0.72 * meas(sup).actualBoundingBoxAscent : 0);
    const w = meas(str.replace(/[_^]\{([^{}]*)\}/g, '$1')).width, px = g.X(x), x0 = align === 'right' ? px - w : align === 'center' ? px - w / 2 : px;
    let top = Infinity, bottom = -Infinity;
    for (let i = 0; i <= 24; i++) { const y = g.Y(f(g.invX(x0 + w * i / 24))); top = Math.min(top, y); bottom = Math.max(bottom, y); }
    const base = o.below ? bottom + half + gap + rise : top - half - gap - drop;
    g.text(x, g.invY(base), str, color, { align, base: 'alphabetic', size });
  }
  /** The top of a y range from lo that leaves px pixels of the inner height ih above the level top (room for a label). */
  const roomAbove = (ih, lo, top, px) => (top * ih - lo * px) / Math.max(ih / 2, ih - px);
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22], cl = M.cl, sc0 = S.scene, cs = curves();
    $('plotTitle').innerHTML = L(...PLOTS[sc0]);
    let meta = '';
    if (sc0 === 'walls') {
      const g = kit.plot(cv, { x: [10, 90], y: [0, 4], pad });
      g.axes({ xTicks: [10, 30, 50, 70, 90], yTicks: [0, 1, 2, 3], xLabel: 'ε (°)' });
      g.line(cs.map((p) => [p.d, p.c.Lwalls]), P.violet, { width: 2.2 });
      g.line(cs.map((p) => [p.d, p.c.Lcap]), P.magenta, { width: 2.2 });
      g.line(cs.map((p) => [p.d, p.c.Ltunnel]), P.cyan, { width: 2.2 });
      g.vline(S.eps, P.amber, { alpha: 0.85 });
      [cl.Lwalls, cl.Lcap, cl.Ltunnel].forEach((y) => g.dot(S.eps, y, P.amber, 3.4));
      /* curve labels sit at ε = 88°, a fixed pixel gap off their own curve: 2ε and arccos(cos²ε) above, √2 sin ε below
         (all three curves rise towards the right, so the right end is the closest point); the y range leaves headroom
         above 2ε for its label */
      const at = cellOf(88);
      g.text(88, at.Lwalls, '2ε', P.violet, { align: 'right', base: 'bottom', dy: -5, size: 10.5 });
      g.text(88, at.Lcap, 'arccos(cos^{2}ε)', P.magenta, { align: 'right', base: 'bottom', dy: -5, size: 10.5 });
      g.text(88, at.Ltunnel, '√2 sin ε', P.cyan, { align: 'right', base: 'top', dy: 5, size: 10.5 });
      meta = `ε = ${fix(S.eps, 1)}° · ${fix(cl.Ltunnel, 4)} &lt; ${fix(cl.Lcap, 4)} &lt; ${fix(cl.Lwalls, 4)}`;
    } else if (sc0 === 'cap') {
      const g = kit.plot(cv, { x: [10, 90], y: [0, 1.7], pad });
      g.axes({ xTicks: [10, 30, 50, 70, 90], yTicks: [0, 0.5, 1, 1.5], xLabel: 'ε (°)' });
      g.line(cs.map((p) => [p.d, p.c.omega]), P.magenta, { width: 2.2 });
      g.line(cs.map((p) => [p.d, p.c.Lwalls - p.c.Lcap]), P.violet, { width: 2.2 });
      g.vline(S.eps, P.amber, { alpha: 0.85 });
      g.dot(S.eps, cl.omega, P.amber, 3.4); g.dot(S.eps, cl.Lwalls - cl.Lcap, P.amber, 3.4);
      g.text(14, 1.5, 'Ω(ε)', P.magenta, { align: 'left', size: 10.5 });
      g.text(14, 1.25, '2ε − arccos(cos^{2}ε)', P.violet, { align: 'left', size: 10.5 });
      meta = `Ω = ${fix(cl.omega, 4)} · 2ε − L<sub>cap</sub> = ${fix(cl.Lwalls - cl.Lcap, 4)}`;
    } else if (sc0 === 'chord') {
      const g = kit.plot(cv, { x: [10, 90], y: [0, 0.65], pad });
      g.axes({ xTicks: [10, 30, 50, 70, 90], yTicks: [0, 0.2, 0.4, 0.6], xLabel: 'ε (°)' });
      g.line(cs.map((p) => [p.d, p.c.e * p.c.e / 4]), P.dim, { width: 1.6, dash: [5, 4] });
      g.line(cs.map((p) => [p.d, p.c.dr]), P.magenta, { width: 2.4 });
      g.vline(S.eps, P.amber, { alpha: 0.85 }); g.dot(S.eps, cl.dr, P.amber, 3.6);
      g.text(14, 0.55, 'Δr(ε)', P.magenta, { align: 'left', size: 10.5 });
      g.text(14, 0.44, 'ε^{2}/4', P.dim, { align: 'left', size: 10.5 });
      meta = `Δr = ${fix(cl.dr, 5)} · ε²/4 = ${fix(cl.e * cl.e / 4, 5)} · r<sub>mid</sub> = ${fix(cl.rMid, 5)}`;
    } else if (sc0 === 'cone') {
      // both labels end at log₂ n = 38, five clear pixels above their own line; the y range keeps 21 px above y = 38
      const g = kit.plot(cv, { x: [1, 40], y: [0, Math.max(45, roomAbove(cv.clientHeight - pad[2] - pad[3], 0, 38, 21))], pad });
      g.axes({ xTicks: [1, 10, 20, 30, 40], yTicks: [0, 10, 20, 30, 40], xLabel: 'log₂ n' });
      const xs = Array.from({ length: 79 }, (_, i) => 1 + i / 2), lin = (x) => x, pow = (x) => Math.pow(x, 2 / 3);
      g.line(xs.map((x) => [x, lin(x)]), P.violet, { width: 2.2 });
      g.line(xs.map((x) => [x, pow(x)]), P.cyan, { width: 2.2 });
      g.vline(S.logN, P.amber, { alpha: 0.85 }); g.dot(S.logN, S.logN, P.amber, 3.4); g.dot(S.logN, Math.pow(S.logN, 2 / 3), P.amber, 3.4);
      curveLabel(g, lin, 38, 'log_{2} n', P.violet);
      curveLabel(g, pow, 38, 'log^{2/3} n', P.cyan);
      meta = `N = ${M.N} · m = ${M.H.m} · n log₂ n = ${M.H.sortTax} · m log<sup>2/3</sup> n = ${fix(M.H.dmmsy, 1)}`;
    } else {
      /* five clear pixels between each label and its own line: T_res above the flat cyan line log₁₀ T = 0 (the y range
         keeps 21 px above 0 for it, at least 0.9), T_thick above the violet curve where it ends at ε = 65° (clear of the
         axis unit ε (°) in the bottom right corner), and the Zeno label under its dashed line, so it never meets the
         cyan line at small N */
      const g = kit.plot(cv, { x: [10, 90], y: [-7, Math.max(0.9, roomAbove(cv.clientHeight - pad[2] - pad[3], -7, 0, 21))], pad });
      g.axes({ xTicks: [10, 30, 50, 70, 90], yTicks: [-6, -4, -2, 0], xLabel: 'ε (°)' });
      const thick = cs.map((p) => [p.d, Math.log10(p.r.Tthick)]), res = cs.map((p) => [p.d, Math.log10(p.r.T)]), zl = Math.log10(M.zeno);
      g.line(thick, P.violet, { width: 2.2 });
      g.line(res, P.cyan, { width: 2.4 });
      g.hline(zl, P.magenta, { width: 1.8, dash: [5, 4] });
      g.vline(S.eps, P.amber, { alpha: 0.85 }); g.dot(S.eps, Math.log10(M.rel.T), P.amber, 3.4); g.dot(S.eps, Math.log10(M.rel.Tthick), P.amber, 3.4);
      curveLabel(g, along(res), 12, 'T_{res}', P.cyan, { align: 'left', stroke: 2.4 });
      curveLabel(g, along(thick), 65, 'T_{thick}', P.violet);
      curveLabel(g, () => zl, 88, `Zeno n = ${M.N}`, P.magenta, { size: 10, stroke: 1.8, below: true });
      meta = `T<sub>res</sub> = ${fix(M.rel.T, 5)} (d* = ${fix(M.rel.d, 4)}) · T<sub>thick</sub> = ${sci(M.rel.Tthick)} · ${L('芝诺', 'Zeno')} ${fix(M.zeno, 4)}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: progress τ of the read head ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0.5, rate: 0.25, step: 0.05, loop: true,
    format: (t) => `τ ${fix(t, 2)} <small>/ 1</small>`,
    onChange: (t, C) => { S.tau = t; playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  // a reader who touches the rail ends the boot autoplay (its observer would otherwise restart the clock)
  let bootIO = null;
  function bootPlay() {
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stageEl);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  function leave() { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); }
  function setEps(v, quiet) { S.eps = clamp(Math.round(v * 4) / 4, EPS_MIN, EPS_MAX); fEps.set(S.eps); if (!quiet) paint(); }
  function setScene(v, quiet) { S.scene = SCENES.includes(v) ? v : 'walls'; sceneChips.set(S.scene, true); if (!quiet) paint(); }
  function setZeno(v, quiet) { S.zeno = v ? 1 : 0; zenoChips.set(String(S.zeno), true); if (!quiet) paint(); }
  const fEps = kit.field($('epsDeg'), { fmt: (v) => `${fix(v, 1)}°`, onInput: (v) => { leave(); setEps(v); } });
  const fK = kit.field($('kWindow'), { fmt: (v) => `k = ${Math.round(v)}`, onInput: (v) => { leave(); S.k = clamp(Math.round(v), 1, 4); paint(); } });
  const fN = kit.field($('graphScale'), { fmt: (v) => `N = ${2 ** Math.round(v)}`, onInput: (v) => { leave(); S.logN = clamp(Math.round(v), 3, 7); paint(); } });
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); setScene(v, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint(); });
  const zenoChips = kit.chips($('zenoProbe'), 'zeno', (v) => { leave(); setZeno(Number(v)); });
  kit.keys({ z: () => { leave(); setZeno(!S.zeno); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'walls-dijkstra-tax': { scene: 'walls', eps: 60, k: 1, logN: 5, zeno: 1, play: true, still: 0.5 },
    'cap-wavefront-relax': { scene: 'cap', eps: 60, k: 3, logN: 5, zeno: 0, play: true, still: 0.7 },
    'flat-chord-tunnel': { scene: 'chord', eps: 60, k: 3, logN: 5, zeno: 0, play: true, still: 0.5 },
    'holographic-pivot-cone': { scene: 'cone', eps: 90, k: 3, logN: 6, zeno: 0, play: true, still: 1 },
    'resonant-pivot-relay': { scene: 'relay', eps: 75, k: 3, logN: 5, zeno: 0, play: true, still: 0.5 }
  };
  const NOTES = {
    'walls-dijkstra-tax': ['ε = 60°：琥珀读头沿紫色双壁从 A 爬到直角顶点 B、再到 C，路长 2ε = 2.094。紫环处它要先把全部候选排好序（N = 32 时 n log₂ n = 160 次比较），才能转上第二面墙。', 'ε = 60°: the amber head climbs the violet walls from A to the right-angle corner B and on to C, a route of 2ε = 2.094. At the violet ring it must first sort every candidate (n log₂ n = 160 comparisons for N = 32) before it turns onto the second wall.'],
    'cap-wavefront-relax': ['k = 3 道品红波前不排序地从 A 铺过外凸顶盖；读头沿品红测地弧走 arccos(cos²ε) = 1.318 < 2ε = 2.094。顶盖的角超 Ω = 36.87°。', 'k = 3 magenta wavefronts spread over the convex cap from A without being sorted; the head rides the magenta geodesic arc, arccos(cos²ε) = 1.318 < 2ε = 2.094. The cap has excess Ω = 36.87°.'],
    'flat-chord-tunnel': ['青色内割弦穿过体内，长 √2 sin ε = 1.225；中点 M 沉到 r = 0.791，品红月牙就是被平切面削掉的鼓包，厚 Δr = 0.209。消去内点 B、Q、M、O 后，A 到 C 的有效权重取到这条弦。', 'The cyan interior chord runs through the bulk, √2 sin ε = 1.225 long; its midpoint M sinks to r = 0.791, and the magenta crescent is the bulge the flat cut shaves off, Δr = 0.209 thick. Eliminating the inner vertices B, Q, M, O leaves the chord as the effective weight from A to C.'],
    'holographic-pivot-cone': ['ε = 90°：N = 64 个青色边界点每 k = 3 个凝成一颗紫色枢轴，一层层沉进体内：64 → 22 → 8 → 3 → 1；最深的枢轴落在 r = 0.707，与弦中点 M 同深。白线是 Dijkstra 在 r = 1 上排出的全序。', 'ε = 90°: the N = 64 cyan boundary points condense three at a time into violet pivots that sink level by level: 64 → 22 → 8 → 3 → 1; the deepest pivot sits at r = 0.707, as deep as the chord midpoint M. The white thread is the total order Dijkstra lays out on r = 1.'],
    'resonant-pivot-relay': ['ε = 75°：沿弦的厚势垒只透过 T = 7.18×10⁻⁵；把紫色枢轴放进弦中点、阱宽调到共振，透射回到 T = 1.0000。打开芝诺探针，N = 32 次中途排序把读头压回双壁。', 'ε = 75°: the thick barrier along the chord lets through only T = 7.18×10⁻⁵; with the violet pivot at the midpoint and the well tuned to resonance, the transmission returns to T = 1.0000. Switch the Zeno probe on and N = 32 mid-step sorts push the head back onto the walls.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'walls-dijkstra-tax': ['读头沿紫色双壁走 2ε = 2.094，在 B 处先付 160 次比较的排序税。', 'The head climbs the violet walls, 2ε = 2.094, and pays a 160-comparison sort at B.'],
    'cap-wavefront-relax': ['三道品红波前不排序地铺过顶盖；测地弧 1.318 短于双壁 2.094。', 'Three magenta wavefronts spread unsorted; the cap arc, 1.318, beats the walls, 2.094.'],
    'flat-chord-tunnel': ['青色内割弦长 1.225，中点沉到 r = 0.791；品红月牙是削掉的鼓包。', 'The cyan chord, 1.225, sinks to r = 0.791 at M; the magenta crescent is cut away.'],
    'holographic-pivot-cone': ['64 个边界点三个一组凝成枢轴：64 → 22 → 8 → 3 → 1，最深处 r = 0.707。', 'Points condense in threes: 64 → 22 → 8 → 3 → 1, the deepest pivot at r = 0.707.'],
    'resonant-pivot-relay': ['厚势垒只透过 7.18×10⁻⁵；共振枢轴放在弦中点，透射回到 1.0000。', 'The thick barrier passes 7.18×10⁻⁵; a resonant pivot at M brings it back to 1.0000.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    if (!booting) stopBootPlay();
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    setScene(p.scene, true); setZeno(p.zeno, true);
    S.k = p.k; S.logN = p.logN; fK.set(p.k); fN.set(p.logN);
    sc.view(VIEWS[p.scene], booting || TRV.still ? 0 : 600);
    const from = S.eps, finish = () => { setEps(p.eps, true); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(550, (e) => { setEps(from + (p.eps - from) * e, true); paint(); }, finish);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootPlay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拉 ε、k 与 N、开关芝诺探针，拖琥珀圆环改 ε。随时可以再选一张卡。', 'Free play: switch the scene, pull ε, k and N, toggle the Zeno probe, drag the amber ring to change ε. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const round = (x) => (Number.isFinite(x) ? x : null);
  window.CHORD_TUNNEL_DEBUG = Object.freeze({
    get state() {
      const M = model(), { cl, H, sch, cmp, rel } = M;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, tau: S.tau, playing: clock.playing, scene: S.scene, route: M.route,
        epsDeg: S.eps, epsRad: cl.e, k: S.k, logN: S.logN, N: M.N, zenoProbe: S.zeno,
        A: cl.A, B: cl.B, C: cl.C, M: cl.M, Q: cl.Q,
        L_walls: cl.Lwalls, L_cap: cl.Lcap, L_tunnel: cl.Ltunnel, orderHolds: M.order, rMid: cl.rMid, dr: cl.dr, omega: cl.omega,
        fsAngle: M.fs, lagrange: M.lg,
        schur: { allowed: sch.allowed, weights: sch.weights.map((r) => r.map(round)), effective: sch.effective, eliminated: sch.eliminated, residual: sch.residual, fill: sch.fill, route: sch.route, open: sch.open },
        completion: { sigma: cmp.sigma, partial: cmp.partial, specified: cmp.specified, completed: cmp.completed, lambdaMin: cmp.lambdaMin, eigenvalues: cmp.eigenvalues, cliqueMin: cmp.cliqueMin, match: cmp.match, filled: cmp.filled },
        hierarchy: {
          N: H.N, D: H.D, k: H.k, counts: H.counts, depth: H.depth, m: H.m, sortTax: H.sortTax, dmmsy: H.dmmsy, fredmanTarjan: H.fredmanTarjan, capArea: H.capArea,
          leaves: H.leaves.map((lf) => ({ ids: lf.ids, area: lf.area, pos: lf.pos })), verts: H.verts, edges: H.edges, order: H.order, dist: H.dist,
          levels: H.levels.map((lv) => lv.map((nd) => ({ pos: nd.pos, dir: nd.dir, r: nd.r, lo: nd.lo, hi: nd.hi, children: nd.children, theta: nd.theta }))),
          apex: H.apex ? { pos: H.apex.pos, r: H.apex.r, theta: H.apex.theta } : null, partition: H.partition
        },
        relay: { E: PHYS.E, V0: PHYS.V0, k0: K0, kappa: KAPPA, L: cl.Ltunnel, d: rel.d, T: rel.T, Tthick: rel.Tthick, Thalf: rel.Thalf, action: rel.action, zeno: M.zeno, actions: { chord: KAPPA * cl.Ltunnel, cap: KAPPA * cl.Lcap, walls: KAPPA * cl.Lwalls } },
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, head: FRAME ? FRAME.head : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.eps != null) setEps(o.eps, true);
      if (o.k != null) { S.k = clamp(Math.round(o.k), 1, 4); fK.set(S.k); }
      if (o.logN != null) { S.logN = clamp(Math.round(o.logN), 3, 7); fN.set(S.logN); }
      if (o.zeno != null) setZeno(o.zeno, true);
      if (o.tau != null) clock.set(clamp(o.tau, 0, 1));
      paint();
    },
    /** Viewport coordinates of the ε handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the corner A at the opening angle deg (for drag targets). */
    epsPoint(deg) { const b = stageEl.getBoundingClientRect(), q = sc.p([Math.sin(deg * DEG), Math.cos(deg * DEG), 0]); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    /** Viewport coordinates of a world point under the current camera (for checking marks against the geometry). */
    project(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; },
    /** Pure computations for a given state (no page change): used by the suite for sweeps. */
    sweep(eps) { const c = cellOf(eps); return { L_walls: c.Lwalls, L_cap: c.Lcap, L_tunnel: c.Ltunnel, dr: c.dr, rMid: c.rMid, omega: c.omega }; }
  });
  window.TRV_THUMB = () => { cards.pick('flat-chord-tunnel'); clock.pause(); clock.set(0.5); sc.view([VIEWS.chord[0], VIEWS.chord[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('walls-dijkstra-tax'));
  booting = false;
  paint();
})();
