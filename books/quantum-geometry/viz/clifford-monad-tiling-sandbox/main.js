/* MONAD//TILING · 极小圆弧体四位一体与多胞抵消分化 · Minimal Clifford monad and multi-cell cancellation
   The stage is the minimal arc cell ΔT_ε on the unit sphere: A = (1, 0, 0), B = (cos ε, sin ε, 0), C = (cos ε, 0, sin ε),
   the three flat walls from the origin O and the outward-bulging spherical cap △ABC. One cell carries all four grades of
   Cl₃ at once (Λ⁰ the compatibility cos ε, Λ¹ the step ε and the tangent gradient sin ε, Λ² the cap excess
   Ω = 2 arctan(tan²(ε/2)), Λ³ the sector volume Ω/3). Tiling it:
     N = k² (k = 1 … 4)   the barycentric lattice of △ABC projected to S²: k² geodesic triangles. Each cell's boundary
                          arrows (the connection δΓ carried in a zero-free tangent frame) meet their neighbours' on
                          every inner edge with the opposite sign; only the 3k rim edges survive.
     N = 27               3 radial shells × 3 × 3 geodesic quadrilaterals (the 3 × 3 × 3 subdivision of a parameter
                          cube): 162 directed faces, 108 inner ones in opposite pairs, 54 on the boundary.
   The rail is the cancellation blend λ: interior edges, walls and arrow pairs fade as λ → 1, leaving the node, the spine,
   the outer surface with its rim ∂Σ, and the volume. Every number comes from the engine below; the three readings of
   one B (gradient, arc, Bargmann phase), Stokes (rim transport against the sum of Bargmann excesses) and the counts are
   computed by separate routes. Read-only probe for the browser suite: window.MONAD_DEBUG.state. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, t) => a + (b - a) * t;
  const NS = [1, 4, 9, 16, 27], EPS0 = 15, EPS1 = 90;
  const R0 = 0.4;          // inner radius of the 3 × 3 × 3 shell complex (MODEL: a drawing choice, every face keeps area)
  const LIFT = 1.006;      // marks on the cap sit this far out, above the surface
  const O = [0, 0, 0], E3 = [0, 0, 1];
  const HS = '<span class="hs">⋆</span>';
  const fmt = (x, d) => fix(Math.abs(x) < 0.5 * Math.pow(10, -d) ? 0 : x, d);
  const sci = (x) => (Math.abs(x) < 1e-300 ? '0' : `${(x / Math.pow(10, Math.floor(Math.log10(Math.abs(x))))).toFixed(1)}×10${String(Math.floor(Math.log10(Math.abs(x)))).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`);

  /* ---------- the qubit: P(r) = ½(I + r·σ) as 2 × 2 complex matrices (entries [re, im]) ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const ca = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const cs = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mm = (X, Y) => [0, 1].map((i) => [0, 1].map((j) => ca(cm(X[i][0], Y[0][j]), cm(X[i][1], Y[1][j]))));
  const msub = (X, Y) => [0, 1].map((i) => [0, 1].map((j) => cs(X[i][j], Y[i][j])));
  const trace = (X) => ca(X[0][0], X[1][1]);
  /** (s·I + r·σ)/2 */
  const sig = (r, s) => [[[(s + r[2]) / 2, 0], [r[0] / 2, -r[1] / 2]], [[r[0] / 2, r[1] / 2], [(s - r[2]) / 2, 0]]];
  const proj = (r) => sig(r, 1);
  /** The Lean formula (triple_bargmann_bloch): Tr(P(r₁)P(r₂)P(r₃)) = (1 + r₁·r₂ + r₂·r₃ + r₃·r₁)/4 + i r₁·(r₂ × r₃)/4. */
  const bargmann = (a, b, c) => [(1 + v3.dot(a, b) + v3.dot(b, c) + v3.dot(c, a)) / 4, v3.dot(a, v3.cross(b, c)) / 4];
  /** The same trace, multiplied out as matrices: a second route to the formula on this page. */
  const bargmannMatrix = (a, b, c) => trace(mm(mm(proj(a), proj(b)), proj(c)));
  /** Excess (solid angle) of the positively oriented geodesic triangle abc: twice the argument of its Bargmann product. */
  const excess = (a, b, c) => { const z = bargmann(a, b, c); return 2 * Math.atan2(z[1], z[0]); };
  /** A unit ket for the Bloch vector r (gauge: real first component; regular on the closed upper hemisphere). */
  const ket = (r) => { const th = Math.acos(clamp(r[2], -1, 1)), ph = Math.atan2(r[1], r[0]), s = Math.sin(th / 2); return [[Math.cos(th / 2), 0], [s * Math.cos(ph), s * Math.sin(ph)]]; };
  const braket = (p, q) => ca(cm([p[0][0], -p[0][1]], q[0]), cm([p[1][0], -p[1][1]], q[1]));

  /* ---------- the connection: a zero-free tangent frame carried along geodesic edges ---------- */
  const ZG = v3.unit([0, 1, -1]);   // never ± a point of the cell (all of its points have x, y, z ≥ 0)
  const frame = (p) => v3.unit(v3.sub(ZG, v3.scale(p, v3.dot(ZG, p))));
  /** Carry the tangent vector v at p along the great-circle arc to q. */
  function carry(v, p, q) { const ax = v3.cross(p, q), s = v3.len(ax); return s < 1e-15 ? v.slice() : v3.rot(v, v3.scale(ax, 1 / s), Math.atan2(s, v3.dot(p, q))); }
  /** δΓ(p → q): the angle about q from the carried frame of p to the frame of q. Round a positively oriented loop the
      sum is −(the turn of a carried arrow) = −Ω. */
  function dGamma(p, q) { const t = carry(frame(p), p, q), f = frame(q); return Math.atan2(v3.dot(q, v3.cross(t, f)), v3.dot(t, f)); }
  const orient = (V, F) => (v3.dot(V[F[0]], v3.cross(V[F[1]], V[F[2]])) < 0 ? F.slice().reverse() : F);
  const tangent = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  const angleAt = (p, q, r) => Math.acos(clamp(v3.dot(tangent(p, q), tangent(p, r)), -1, 1));

  /* ---------- one cell ---------- */
  function monadAt(epsDeg) {
    const e = epsDeg * DEG, c = Math.cos(e), s = Math.sin(e);
    const A = [1, 0, 0], B = [c, s, 0], C = [c, 0, s];
    const grade0Scalar = v3.dot(A, B);
    const grad = v3.sub(A, v3.scale(B, grade0Scalar));                 // tangent gradient of x ↦ A·x at x = B
    const grade1Step = v3.len(grad), arcStep = Math.acos(clamp(grade0Scalar, -1, 1));
    const omega = 2 * Math.atan(Math.tan(e / 2) ** 2);
    const omegaGirard = angleAt(A, B, C) + angleAt(B, C, A) + angleAt(C, A, B) - PI;
    const triple = v3.dot(A, v3.cross(B, C));                           // det[A, B, C] = sin²ε
    const dz = bargmann(A, C, B), dzm = bargmannMatrix(A, C, B);        // Δ₃ = Tr(P_A P_C P_B): the Berry order
    let wedge2 = 0;
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge2 += (A[i] * B[j] - A[j] * B[i]) ** 2;
    const lagrangeLeft = v3.dot(A, A) * v3.dot(B, B) - grade0Scalar ** 2, lagrangeRight = wedge2 / 2;
    const AxB = v3.cross(A, B), nAB = v3.unit(AxB);
    // Born flow (projection_probability_flow): ρ = P(B), P = P(A), H = ½ n·σ; p′(0) = Re(i Tr(ρ (HP − PH)))
    const rho = proj(B), PA = proj(A), H = sig(nAB, 0), z = trace(mm(rho, msub(mm(H, PA), mm(PA, H))));
    const iz = [-z[1], z[0]];
    return {
      epsDeg, e, A, B, C, grad, AxB, nAB,
      grade0Scalar, grade1Step, arcStep, omega, omegaGirard,
      gammaSpinor: -0.5 * omega, gammaVector: -omega, vSector: omega / 3, tripleProduct: triple, vTetra: Math.abs(triple) / 6,
      reBargmann: dz[0], imBargmann: dz[1], argBargmann: Math.atan2(dz[1], dz[0]), imBargmannMatrix: dzm[1],
      bargmannFormulaGap: Math.hypot(dz[0] - dzm[0], dz[1] - dzm[1]),
      cos2: grade0Scalar ** 2, sin2: lagrangeRight, pythagoreanSum: grade0Scalar ** 2 + lagrangeRight, lagrangeLeft, lagrangeRight,
      hodgeLength: v3.len(AxB), hodgeOrthogonality: Math.max(Math.abs(v3.dot(nAB, A)), Math.abs(v3.dot(nAB, B))),
      bornWeight: trace(mm(rho, PA))[0], bornFlowCommutator: iz[0], bornFlowImag: iz[1],
      bornFlowGeometric: v3.dot(A, v3.cross(nAB, B)) / 2                 // d/dt (1 + A·B(t))/2 with dB/dt = n × B
    };
  }

  /* ---------- tilings ---------- */
  /** The barycentric lattice of △ABC with k steps per side, projected to S²: k² positively oriented geodesic triangles. */
  function capLattice(M, k) {
    const V = [], id = new Map();
    const at = (a, b) => {
      const key = `${a},${b}`;
      if (!id.has(key)) { id.set(key, V.length); V.push(v3.unit(v3.add(v3.add(v3.scale(M.A, a), v3.scale(M.B, b)), v3.scale(M.C, k - a - b)))); }
      return id.get(key);
    };
    const faces = [];
    for (let a = 0; a < k; a++) for (let b = 0; a + b < k; b++) {
      faces.push(orient(V, [at(a + 1, b), at(a, b + 1), at(a, b)]));
      if (a + b < k - 1) faces.push(orient(V, [at(a + 1, b), at(a + 1, b + 1), at(a, b + 1)]));
    }
    return { V, faces, corners: [at(k, 0), at(0, k), at(0, 0)] };
  }
  const OTHER = [[1, 2], [2, 0], [0, 1]];   // (i, j) with e_i × e_j = e_axis
  /** 3 radial shells × 3 × 3 geodesic quadrilaterals over △ABC: the square [0, 1]² goes to △ABC with corners A, B, the
      midpoint Mid of arc BC, and C; its grid lines are great-circle arcs. Counted in the parameter cube. */
  function shellComplex(M) {
    const Mid = v3.unit(v3.add(M.B, M.C));
    const S2 = (s, t) => v3.unit(v3.add(v3.add(v3.scale(M.A, (1 - s) * (1 - t)), v3.scale(M.B, s * (1 - t))), v3.add(v3.scale(Mid, s * t), v3.scale(M.C, (1 - s) * t))));
    const rad = (a) => R0 + (1 - R0) * a;
    const X = (p) => v3.scale(S2(p[1] / 3, p[2] / 3), rad(p[0] / 3));   // lattice point (radial, s, t) ∈ {0..3}³ → space
    const faces = new Map(), cells = [], verts = new Set(), edges = new Set();
    let directed = 0;
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 3; c++) {
      const lo = [a, b, c];
      cells.push(lo);
      for (let m = 0; m < 8; m++) verts.add([a + (m & 1), b + ((m >> 1) & 1), c + ((m >> 2) & 1)].join(','));
      for (let ax = 0; ax < 3; ax++) {
        const [i, j] = OTHER[ax];
        for (const du of [0, 1]) for (const dv of [0, 1]) { const p = lo.slice(); p[i] += du; p[j] += dv; const q = p.slice(); q[ax] += 1; edges.add(`${p.join(',')}|${q.join(',')}`); }
        for (const side of [0, 1]) {
          const corner = lo.slice(); corner[ax] += side;
          const key = `${ax}:${corner.join(',')}`;
          if (!faces.has(key)) faces.set(key, { ax, corner, inc: [] });
          faces.get(key).inc.push({ cell: lo, s: side ? 1 : -1 });
          directed++;
        }
      }
    }
    const list = [...faces.values()], inner = list.filter((f) => f.inc.length === 2), bnd = list.filter((f) => f.inc.length === 1);
    const cyc = (f) => { const [i, j] = OTHER[f.ax]; return [[0, 0], [1, 0], [1, 1], [0, 1]].map(([u, v]) => { const p = f.corner.slice(); p[i] += u; p[j] += v; return p; }); };
    // ∂ of the boundary surface: the oriented edges of the 54 boundary faces, summed
    const edgeSum = new Map();
    for (const f of bnd) {
      const q = cyc(f); if (f.inc[0].s < 0) q.reverse();
      for (let t = 0; t < 4; t++) {
        const p0 = q[t].join(','), p1 = q[(t + 1) % 4].join(','), key = p0 < p1 ? `${p0}|${p1}` : `${p1}|${p0}`;
        edgeSum.set(key, (edgeSum.get(key) || 0) + (p0 < p1 ? 1 : -1));
      }
    }
    // the outer surface (radial index 3): 9 positively oriented quadrilaterals on S²
    const OV = [], oid = new Map();
    const ov = (b, c) => { const key = `${b},${c}`; if (!oid.has(key)) { oid.set(key, OV.length); OV.push(X([3, b, c])); } return oid.get(key); };
    const outer = bnd.filter((f) => f.ax === 0 && f.corner[0] === 3).map((f) => orient(OV, cyc(f).map((p) => ov(p[1], p[2]))));
    const center = (p) => X(p.map((x) => x + 0.5));
    return {
      S2, rad, X, Mid, cells, inner, bnd, cyc, center,
      totalDirectedFaces: directed, cancelledInteriorFaces: 2 * inner.length, survivingBoundaryFaces: bnd.length,
      interiorPairSum: inner.reduce((n, f) => n + Math.abs(f.inc[0].s + f.inc[1].s), 0),
      boundaryOfBoundary: [...edgeSum.values()].filter((x) => x !== 0).length,
      eulerVolume: verts.size - edges.size + list.length - cells.length,
      latticeCounts: { vertices: verts.size, edges: edges.size, faces: list.length, cells: cells.length },
      sieveCounts: [
        cells.filter((p) => p[0] === 1 && p[1] === 1 && p[2] === 1).length,
        cells.filter((p) => p[1] === 1 && p[2] === 1).length,
        bnd.filter((f) => f.ax === 0 && f.corner[0] === 3).length,
        cells.length
      ],
      outer: { V: OV, faces: outer, corners: [ov(0, 0), ov(3, 0), ov(0, 3)] }
    };
  }

  /** Incidences, cancellation, circulation and flux of a surface complex on S² (faces positively oriented). */
  function surfaceComplex(V, faces) {
    const emap = new Map();
    faces.forEach((F, f) => F.forEach((a, t) => {
      const b = F[(t + 1) % F.length], i = Math.min(a, b), j = Math.max(a, b), key = `${i}|${j}`;
      if (!emap.has(key)) emap.set(key, { i, j, inc: [] });
      emap.get(key).inc.push({ f, s: a === i ? 1 : -1 });
    }));
    const list = [...emap.values()];
    for (const e of list) e.dg = dGamma(V[e.i], V[e.j]);
    const rim = list.filter((e) => e.inc.length === 1), inner = list.filter((e) => e.inc.length === 2);
    let incidenceSum = 0, net = 0, boundary = 0;
    for (const e of inner) { const s = e.inc[0].s + e.inc[1].s; incidenceSum += Math.abs(s); net += s * e.dg; }
    for (const e of rim) boundary += e.inc[0].s * e.dg;
    // each face on its own: the excess from its Bargmann products, the circulation carried afresh round its boundary
    const faceOmega = faces.map((F) => { let w = 0; for (let t = 1; t + 1 < F.length; t++) w += excess(V[F[0]], V[F[t]], V[F[t + 1]]); return w; });
    const faceCirc = faces.map((F) => F.reduce((w, a, t) => w + dGamma(V[a], V[F[(t + 1) % F.length]]), 0));
    const sumSubOmega = faceOmega.reduce((a, b) => a + b, 0);
    const used = new Set(); faces.forEach((F) => F.forEach((a) => used.add(a)));
    // the rim as a closed path, in the faces' orientation
    const next = new Map();
    for (const e of rim) { const [p, q] = e.inc[0].s > 0 ? [e.i, e.j] : [e.j, e.i]; next.set(p, q); }
    const loop = [];
    if (rim.length) { let p = next.keys().next().value; for (let n = 0; n <= rim.length && !(n && p === loop[0]); n++) { loop.push(p); p = next.get(p); } loop.push(loop[0]); }
    return {
      list, rim, inner, faceOmega, faceCirc, loop,
      totalDirectedEdges: faces.reduce((n, F) => n + F.length, 0),
      cancelledInteriorEdges: 2 * inner.length,
      survivingBoundaryEdges: rim.length,
      interiorIncidenceSum: incidenceSum,
      interiorNetCirculation: net,
      boundaryCirculation: boundary,
      cellCirculationSum: faceCirc.reduce((a, b) => a + b, 0),
      cellCirculationGap: Math.max(...faceCirc.map((c, f) => Math.abs(c + faceOmega[f]))),
      sumSubOmega, surfaceCurvatureFlux: -sumSubOmega,
      f2SurvivingEdges: list.filter((e) => e.inc.length % 2 === 1).length,
      eulerCharacteristic: used.size - list.length + faces.length + 1,
      counts: { vertices: used.size, edges: list.length, faces: faces.length }
    };
  }

  /** The 2-cochain F = δ(edge) with edge(i, j) = arg⟨ψᵢ|ψⱼ⟩ on the vertices, and its tetrahedral coboundary. */
  function cochainCheck(V, faces) {
    const n = V.length, ks = V.map(ket), edge = [];
    for (let i = 0; i < n; i++) { edge.push([]); for (let j = 0; j < n; j++) { const z = braket(ks[i], ks[j]); edge[i].push(Math.atan2(z[1], z[0])); } }
    const F = new Float64Array(n * n * n);
    let nonzero = 0;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
      const v = edge[j][k] - edge[i][k] + edge[i][j];
      F[(i * n + j) * n + k] = v; if (Math.abs(v) > 1e-9) nonzero++;
    }
    let defects = 0, worst = 0;
    for (let r = 0; r < n; r++) for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) for (let k = 0; k < n; k++) {
      const d = Math.abs(F[(i * n + j) * n + k] - F[(r * n + j) * n + k] + F[(r * n + i) * n + k] - F[(r * n + i) * n + j]);
      if (d > worst) worst = d;
      if (d > 1e-12) defects++;
    }
    // on each small triangle, F is the Bargmann phase arg Tr(P P P) (mod 2π)
    let gap = 0;
    for (const Fc of faces) for (let t = 1; t + 1 < Fc.length; t++) {
      const [a, b, c] = [Fc[0], Fc[t], Fc[t + 1]], z = bargmann(V[a], V[b], V[c]);
      let d = F[(a * n + b) * n + c] - Math.atan2(z[1], z[0]); d -= 2 * PI * Math.round(d / (2 * PI)); gap = Math.max(gap, Math.abs(d));
    }
    return { tetraCoboundaryDefect: defects, tetraCoboundaryMax: worst, tetraVertices: n, tetraQuadruples: n ** 4, cochainNonzero: nonzero, cochainBargmannGap: gap };
  }

  let memo = null;
  function compute(n, eps) {
    if (memo && memo.n === n && memo.eps === eps) return memo;
    const M = monadAt(eps), solid = n === 27, k = solid ? 3 : Math.round(Math.sqrt(n));
    const sh = solid ? shellComplex(M) : null, surf = solid ? sh.outer : capLattice(M, k);
    memo = { n, eps, k, solid, M, sh, surf, SC: surfaceComplex(surf.V, surf.faces), CC: cochainCheck(surf.V, surf.faces), scalePowers: [1, Math.cbrt(n), Math.cbrt(n) ** 2, n] };
    return memo;
  }
  /** Directed / cancelled / surviving counts for every N (they do not depend on ε). */
  let barsData = null;
  function bars() {
    if (barsData) return barsData;
    const M = monadAt(60);
    barsData = NS.map((n) => {
      if (n === 27) { const sh = shellComplex(M); return { n, total: sh.totalDirectedFaces, cancelled: sh.cancelledInteriorFaces, surviving: sh.survivingBoundaryFaces, faces: true }; }
      const lat = capLattice(M, Math.round(Math.sqrt(n))), sc0 = surfaceComplex(lat.V, lat.faces);
      return { n, total: sc0.totalDirectedEdges, cancelled: sc0.cancelledInteriorEdges, surviving: sc0.survivingBoundaryEdges, faces: false };
    });
    return barsData;
  }

  /* ---------- state ---------- */
  const S = { n: 1, eps: 60, cancel: 0, lens: 'all' };
  const LENS = {
    all: { w0: 1, w1: 1, w2: 1, w3: 1, star: false, wedge: false, triple: false, stokes: false },
    hodge12: { w0: 0.4, w1: 1, w2: 0.5, w3: 0.35, star: true, wedge: true, triple: false, stokes: false },
    hodge03: { w0: 1, w1: 0.8, w2: 0.5, w3: 0.5, star: true, wedge: false, triple: true, stokes: true }
  };
  const VIEW = [-0.95, 0.6];
  const modeOf = () => (S.n === 27 ? 'sieve' : S.n > 1 ? 'bars' : S.lens === 'hodge12' ? 'phase' : S.lens === 'hodge03' ? 'stokes' : 'grades');

  /* ---------- the stage: a lit solid, fitted into the HUD-free part of the stage every frame ---------- */
  const stageEl = $('stage'), handle = $('epsHandle');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; tagBox.appendChild(probe);
  stageEl.classList.toggle('still', !!TRV.still);
  const SO = { canvas: $('cv'), yaw: VIEW[0], pitch: VIEW[1], radius: 0.36, cx: 0.5, cy: 0.5, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stageEl, SO);

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs0 = getComputedStyle(el); if (cs0.opacity === '0' || cs0.visibility === 'hidden' || cs0.display === 'none') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('lens'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(40, bottom - top) };
  }
  /** The points the view must hold: the sector from O to the cap (and the parallelogram A∧B under the Hodge lens). */
  function fitPoints(G) {
    const { A, B, C } = G.M, pts = [O, A, B, C];
    for (let i = 0; i <= 4; i++) for (let j = 0; i + j <= 4; j++) pts.push(v3.unit(v3.add(v3.add(v3.scale(A, i), v3.scale(B, j)), v3.scale(C, 4 - i - j))));
    if (G.n === 1) { pts.push(v3.add(B, G.M.grad)); if (LENS[S.lens].wedge) pts.push(v3.add(A, B)); if (LENS[S.lens].star) pts.push(G.M.AxB); }
    return pts;
  }
  let fitNow = null, blend = null, dragging = null;
  /** A discrete change (cells, lens, card) moves the framing over ms instead of jumping. */
  function blendFit(ms) {
    if (!fitNow || ms <= 0 || TRV.still) { blend = null; return; }
    const b = { from: { unit: fitNow.unit, c: fitNow.c.slice() }, e: 0 };
    blend = b;
    kit.tween(ms, (e) => { if (blend === b) { b.e = e; paint(); } }, () => { if (blend === b) blend = null; paint(); });
  }
  const axesOf = (yaw, pitch) => { const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] }; };
  /** Fit the points as the default view sees them (so turning the camera does not pump the zoom), centred on the
      middle of their box in space, re-projected with the current camera. */
  function fit(G, safe, W, H) {
    let f;
    if (dragging) f = dragging.fit;
    else {
      const ax0 = axesOf(VIEW[0], VIEW[1]), pts = fitPoints(G), lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
      for (const p of pts) for (let i = 0; i < 3; i++) { lo[i] = Math.min(lo[i], p[i]); hi[i] = Math.max(hi[i], p[i]); }
      const c = v3.scale(v3.add(lo, hi), 0.5);
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      for (const p of pts) { const x = v3.dot(p, ax0.R), y = v3.dot(p, ax0.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
      // the pivot: the point at the depth of c that the default view sees in the middle of the box, so the default view
      // is centred exactly and turning the camera keeps the body in the middle
      const piv = v3.add(c, v3.add(v3.scale(ax0.R, (x0 + x1) / 2 - v3.dot(c, ax0.R)), v3.scale(ax0.U, (y0 + y1) / 2 - v3.dot(c, ax0.U))));
      // tight for the default view, but never larger than a turned view can hold (the body's radius about the pivot)
      const reach = Math.max(...pts.map((p) => v3.len(v3.sub(p, piv)))) || 1;
      const tight = (TRV.thumbMode ? 0.98 : 0.9) * Math.min(safe.w / Math.max(x1 - x0, 1e-3), safe.h / Math.max(y1 - y0, 1e-3));
      const target = { unit: TRV.thumbMode ? tight : Math.min(tight, 1.3 * Math.min(safe.w, safe.h) / (2 * reach)), c: piv, safe };
      f = blend ? { unit: lerp(blend.from.unit, target.unit, blend.e), c: v3.lerp(blend.from.c, target.c, blend.e), safe } : target;
    }
    fitNow = f;
    const ax = axesOf(sc.cam.yaw, sc.cam.pitch), u = f.unit * sc.cam.zoom, tx = f.safe.x + f.safe.w / 2, ty = f.safe.y + f.safe.h / 2;
    SO.radius = f.unit / Math.max(1, Math.min(W, H));
    SO.cx = (tx - u * v3.dot(f.c, ax.R)) / W;
    SO.cy = (ty + u * v3.dot(f.c, ax.U)) / H;
  }

  /* ---------- labels: placed after drawing, by priority, never on each other, the HUD or the marks ---------- */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => sizes.clear());
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const key = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(key);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(key, s); }
    return s;
  }
  let LB = [], KEEP = [], OBST = [], BOUNDS = null;
  const want = (key, v, html, cls, o = {}) => { const q = sc.p(v); LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 9 : o.r }); };
  const keepDot = (v, r = 6) => { const q = sc.p(v); KEEP.push({ x: q[0] - r, y: q[1] - r, w: 2 * r, h: 2 * r }); };
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  /** The screen direction from the screen point of `from` to that of `to`. */
  const away = (from, to) => { const a = sc.p(from), b = sc.p(to), dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
  function placeLabels() {
    const placed = [], boxes = OBST.concat(KEEP);
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24]) for (const da of [0, 0.5, -0.5, 1.1, -1.1, 1.8, -1.8, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || boxes.some((p) => meets(p, b, 1))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
  }

  /* ---------- painted marks: ribbons and arrows lying on the cap, gathered into one polyhedron per colour ---------- */
  const group = () => ({ vertices: [], faces: [] });
  function quad(g, a, b, c, d) { const i = g.vertices.length; g.vertices.push(a, b, c, d); g.faces.push([i, i + 1, i + 2, i + 3]); }
  function tri(g, a, b, c) { const i = g.vertices.length; g.vertices.push(a, b, c); g.faces.push([i, i + 1, i + 2]); }
  const onCap = (p, r = LIFT) => v3.scale(v3.unit(p), r);
  /** A band (and optionally an arrow head) along the geodesic a → b on the sphere, from t0 to t1, shifted by `off`
      (world) to the left of the direction of travel: the inside of a positively oriented cell. Widths in pixels. */
  function arcBand(g, a, b, o) {
    const ax = v3.unit(v3.cross(a, b)), th = Math.acos(clamp(v3.dot(a, b), -1, 1)), u = sc.unit || 1;
    const t0 = o.t0 == null ? 0 : o.t0, t1 = o.t1 == null ? 1 : o.t1, off = o.off || 0, hw = (o.width || 1.2) / 2 / u;
    const span = th * (t1 - t0);
    let hl = o.head ? Math.min((o.headLen || 9) / u, span * 0.45) : 0, hh = o.head ? Math.max(hw * 1.6, Math.min((o.headWidth || 8) / 2 / u, hl * 0.62)) : 0;
    const at = (t) => onCap(v3.add(v3.slerp(a, b, t), v3.scale(ax, off)));
    const tb = t1 - (th > 1e-9 ? hl / th : 0), m = Math.max(2, Math.ceil(8 * (tb - t0)));
    let prev = null;
    for (let i = 0; i <= m; i++) {
      const p = at(t0 + (tb - t0) * i / m), l = onCap(v3.sub(p, v3.scale(ax, hw))), r = onCap(v3.add(p, v3.scale(ax, hw)));
      if (prev) quad(g, prev[0], l, r, prev[1]);
      prev = [l, r];
    }
    if (o.head && hl > 0) { const base = at(tb); tri(g, onCap(v3.sub(base, v3.scale(ax, hh))), at(t1), onCap(v3.add(base, v3.scale(ax, hh)))); }
  }
  /** A straight arrow p → q drawn as a band turned towards the camera (for the normals of the solid cells). */
  function flatArrow(g, p, q, o) {
    const d = v3.sub(q, p), Lw = v3.len(d), u = sc.unit || 1;
    if (Lw < 1e-6) return;
    let side = v3.cross(d, sc.facing()); side = v3.len(side) < 1e-9 ? v3.unit(v3.cross(d, [0, 0, 1])) : v3.unit(side);
    const hw = (o.width || 2) / 2 / u, hl = Math.min((o.headLen || 8) / u, Lw * 0.5), hh = Math.max(hw * 1.6, (o.headWidth || 7) / 2 / u);
    const base = v3.add(p, v3.scale(d, (Lw - hl) / Lw)), s1 = v3.scale(side, hw), s2 = v3.scale(side, hh);
    quad(g, v3.sub(p, s1), v3.sub(base, s1), v3.add(base, s1), v3.add(p, s1));
    tri(g, v3.sub(base, s2), q, v3.add(base, s2));
  }
  function polyOf(key, g, s) { if (g.faces.length) sc.poly(key, g, Object.assign({ edges: false, pick: false, occlude: false }, s)); }
  const arcPts = (p, q, n = 16, r = 1) => Array.from({ length: n + 1 }, (_, i) => v3.scale(v3.slerp(p, q, i / n), r));
  const pathOf = (V, loop, r = LIFT) => { const out = []; for (let i = 0; i + 1 < loop.length; i++) { const seg = arcPts(V[loop[i]], V[loop[i + 1]], 10, r); out.push(...(i ? seg.slice(1) : seg)); } return out; };
  /** The read head that walks the path while the rail plays (amber: now). */
  function readHead(path, t) {
    if (!clock || !clock.playing || path.length < 2) return;
    const lens = [0]; for (let i = 1; i < path.length; i++) lens.push(lens[i - 1] + v3.len(v3.sub(path[i], path[i - 1])));
    const target = (t * 2 % 1) * lens[lens.length - 1];
    let i = 1; while (i < lens.length - 1 && lens[i] < target) i++;
    const f = (target - lens[i - 1]) / Math.max(1e-9, lens[i] - lens[i - 1]);
    sc.bead(v3.lerp(path[i - 1], path[i], f), { key: 'head', color: P.amber, r: 4.5, glow: 0.9 });
  }

  /* ---------- the cap scenes: N = 1, 4, 9, 16 ---------- */
  function drawCap(G) {
    const { A, B, C } = G.M, lam = S.cancel, w = LENS[S.lens], thumb = TRV.thumbMode, one = G.n === 1, V = G.surf.V, SC = G.SC;
    const capA = one ? (w.w2 >= 1 ? 1 : 0.42 + 0.3 * w.w2) : 0.5 + 0.38 * lam;
    const wallA = one ? (w.w3 >= 1 && !w.triple ? 1 : 0.3 + 0.4 * w.w3) : 0.42 + 0.48 * lam;
    // Λ³: the sector, three flat walls from O
    const wall = (key, p, q) => sc.surface(key, (s, t) => v3.scale(v3.slerp(p, q, t), s), { u: [0, 1], v: [0, 1], nu: 6, nv: 24, color: P.violet, alpha: wallA });
    wall('wallAB', A, B); wall('wallBC', B, C); wall('wallCA', C, A);
    // Λ²: the cap
    sc.surface('cap', (s, t) => v3.unit(v3.add(v3.scale(A, 1 - s), v3.scale(v3.add(v3.scale(B, 1 - t), v3.scale(C, t)), s))), { u: [0, 1], v: [0, 1], nu: 28, nv: 28, color: P.magenta, alpha: capA });
    // inner walls of the micro-sectors (fans from O through each inner edge) and the inner edges themselves
    const fade = 1 - lam ** 4, slide = Math.pow(1 - lam, 0.6), walls = group(), edgesG = group(), plus = group(), minus = group(), rimG = group();
    if (!one && fade > 0.01) {
      for (const e of SC.inner) {
        const pts = arcPts(V[e.i], V[e.j], 10, 0.998);
        walls.faces.push([walls.vertices.length, ...pts.map((_, i) => walls.vertices.length + 1 + i)]); walls.vertices.push(O, ...pts);
        arcBand(edgesG, V[e.i], V[e.j], { width: 1.3 });
      }
      polyOf('innerWalls', walls, { color: P.violet, alpha: 0.22 * (1 - lam * lam) });
      polyOf('innerEdges', edgesG, { color: P.sigma, alpha: 0.85 * (1 - lam ** 3) });
    }
    // every cell's boundary arrows, shifted into the cell; on an inner edge the two neighbours' arrows run opposite
    G.surf.faces.forEach((F) => F.forEach((a, t) => {
      const b = F[(t + 1) % F.length], i = Math.min(a, b), j = Math.max(a, b), e = SC.list.find((x) => x.i === i && x.j === j);
      const arc = Math.acos(clamp(v3.dot(V[a], V[b]), -1, 1)), off = slide * Math.min(0.13 * arc, 13 / (sc.unit || 1));
      const style = { t0: 0.24, t1: 0.76, off, width: one ? 2.6 : 2.2, head: true, headLen: one ? 11 : 8, headWidth: one ? 10 : 8 };
      if (e.inc.length === 1) arcBand(rimG, V[a], V[b], style);
      else if (fade > 0.01) arcBand(a === i ? plus : minus, V[a], V[b], style);
    }));
    polyOf('plus', plus, { color: P.cyan, alpha: Math.min(1, 1.15 * fade) });
    polyOf('minus', minus, { color: P.magenta, alpha: Math.min(1, 1.15 * fade) });
    polyOf('rimArrows', rimG, { color: P.amber, alpha: w.stokes ? 1 : 0.55 + 0.45 * w.w1 });
    // the surviving rim ∂Σ
    const rim = pathOf(V, SC.loop);
    sc.tube('rim', rim, { color: P.amber, width: (one ? 3.6 : 3.2) * (w.stokes ? 1.25 : 0.55 + 0.45 * w.w1), glow: 0.35 });
    readHead(rim, clock ? clock.t : 0);
    // vertices: the three macroscopic ones survive, the inner lattice points fade with λ
    for (const [p, k] of [[A, 'A'], [B, 'B'], [C, 'C']]) { sc.bead(onCap(p), { key: k, color: P.cyan, r: (one ? 5.5 : 4.5) * (0.65 + 0.35 * w.w0), glow: 0.6 }); keepDot(p, 7); }
    if (!one && fade > 0.05) V.forEach((p, idx) => { if (!G.surf.corners.includes(idx)) sc.bead(onCap(p), { key: `v${idx}`, color: P.sigma, r: 2.6, alpha: 1 - lam ** 3 }); });
    if (one) drawMonadMarks(G, w);
    if (thumb) return;
    // labels
    const cen = v3.unit(v3.add(v3.add(A, B), C));
    want('A', A, 'A', 'raw ink', { pri: 9, dir: away(cen, A), r: 9 });
    want('B', B, 'B', 'raw ink', { pri: 9, dir: away(cen, B), r: 20 });
    want('C', C, 'C', 'raw ink', { pri: 9, dir: away(cen, C), r: 9 });
    if (!one) {
      want('sum', cen, `ΣΩ<sub>i</sub> = Ω = ${fmt(SC.sumSubOmega, 3)}`, 'raw c-mg backed', { pri: 6, dir: [0, -1], r: 2 });
      const mid = v3.unit(v3.add(A, B));
      want('rim', mid, `∂Σ · ${SC.survivingBoundaryEdges}`, 'raw c-am backed', { pri: 7, dir: away(cen, mid), r: 10 });
      if (fade > 0.25 && SC.inner.length) {
        const e = SC.inner[Math.floor(SC.inner.length / 2)], m = v3.unit(v3.add(V[e.i], V[e.j])), ax = v3.unit(v3.cross(V[e.i], V[e.j]));
        want('pp', v3.add(m, v3.scale(ax, 0.06)), '+δΓ', 'raw c-cy backed', { pri: 5, dir: [-1, -0.4], r: 6 });
        want('pm', v3.sub(m, v3.scale(ax, 0.06)), '−δΓ', 'raw c-mg backed', { pri: 5, dir: [1, 0.4], r: 6 });
      }
    }
  }

  /** The grade marks of the single cell: the cyan shadow cos ε, the amber gradient sin ε, ⋆(A∧B), A∧B, OABC. */
  function drawMonadMarks(G, w) {
    const M = G.M, { A, B, C } = M, c = M.grade0Scalar, F = v3.scale(A, c), thumb = TRV.thumbMode, out = [0, -0.006, 0];
    // Λ⁰: the inner product as a shadow: O → F = (A·C)A along OA, with C → F square to it (in the wall OCA)
    sc.line([O, F].map((p) => v3.add(p, out)), { color: P.cyan, width: 3.4 * (0.6 + 0.4 * w.w0) });
    sc.line([v3.add(C, out), v3.add(F, out)], { color: P.cyan, width: 1.3, dash: [5, 4], alpha: 0.85 });
    const r = 0.055;
    sc.line([v3.add(F, v3.scale(E3, r)), v3.add(v3.sub(F, v3.scale(A, r)), v3.scale(E3, r)), v3.sub(F, v3.scale(A, r))].map((p) => v3.add(p, out)), { color: P.cyan, width: 1.2, alpha: 0.9 });
    sc.bead(v3.add(F, out), { key: 'F', color: P.cyan, r: 3.2 });
    // Λ¹: the tangent gradient of x ↦ A·x at B, length sin ε
    sc.arrow(B, v3.add(B, M.grad), { color: P.amber, width: 2.6 * (0.6 + 0.4 * w.w1), headSize: 11 });
    if (w.wedge) sc.fan([O, A, v3.add(A, B), B], { fill: P.magenta, alpha: 0.2, color: P.magenta, width: 1.3 });
    if (w.star) sc.arrow(O, M.AxB, { color: P.violet, width: 2.8, headSize: 12 });
    if (w.triple) sc.poly('tetra', { vertices: [O, A, B, C], faces: [[0, 2, 1], [0, 1, 3], [0, 3, 2], [1, 2, 3]] }, { color: P.violet, alpha: 0.42, edges: P.violet, pick: false, occlude: false });
    if (thumb) return;
    const cen = v3.unit(v3.add(v3.add(A, B), C));
    want('cos', v3.scale(F, 0.5), `cos ε = ${fmt(c, 3)}`, 'raw c-cy backed', { pri: 8, dir: away(C, v3.scale(F, 0.5)), r: 6 });
    want('grad', v3.add(B, v3.scale(M.grad, 0.6)), `|∇| = sin ε = ${fmt(M.grade1Step, 3)}`, 'raw c-am backed', { pri: 8, dir: away(cen, B), r: 8 });
    if (S.lens === 'all') {
      want('omega', cen, `Ω = ${fmt(M.omega, 3)}`, 'raw c-mg backed', { pri: 7, dir: [0, -1], r: 2 });
      want('vol', v3.scale(v3.add(C, A), 0.36), `Ω/3 = ${fmt(M.vSector, 3)}`, 'raw c-vi backed', { pri: 6, dir: away(cen, v3.scale(v3.add(C, A), 0.36)), r: 4 });
    }
    if (w.wedge) {
      want('arc', v3.unit(v3.add(A, B)), `ε = ${fmt(M.arcStep, 3)}`, 'raw c-am backed', { pri: 7, dir: [0, 1], r: 8 });
      want('wedge', v3.scale(v3.add(v3.add(A, B), A), 0.42), `A∧B · ${fmt(M.hodgeLength, 3)}`, 'raw c-mg backed', { pri: 6, dir: [0, 1], r: 6 });
    }
    if (w.star) want('star', M.AxB, `${HS}(A∧B) · ${fmt(M.hodgeLength, 3)}`, 'raw c-vi backed', { pri: 7, dir: [-1, -0.4], r: 6 });
    if (w.triple) want('triple', v3.scale(v3.add(v3.add(A, B), C), 0.3), `${HS}(A∧B∧C) = sin²ε = ${fmt(M.tripleProduct, 3)}`, 'raw c-vi backed', { pri: 5, dir: [0, 1], r: 30 });
    if (w.stokes) want('stokes', cen, `∮∂Σ = ∬Σ = ${fmt(G.SC.boundaryCirculation, 3)}`, 'raw c-am backed', { pri: 7, dir: [0, -1], r: 2 });
  }

  /* ---------- the solid scene: N = 27 ---------- */
  function drawShell(G) {
    const sh = G.sh, lam = S.cancel, fade = 1 - lam ** 4, slide = Math.pow(1 - lam, 0.6), glow = 0.35 + 0.65 * lam, thumb = TRV.thumbMode, w = LENS[S.lens];
    const { S2, rad } = sh, grid = { every: [8, 8], alpha: 0.45, color: P.ink };
    sc.surface('outer', (s, t) => S2(s, t), { u: [0, 1], v: [0, 1], nu: 24, nv: 24, color: P.magenta, alpha: 0.46 + 0.1 * lam * w.w2, grid });
    sc.surface('inner', (s, t) => v3.scale(S2(s, t), R0), { u: [0, 1], v: [0, 1], nu: 12, nv: 12, color: P.violet, alpha: 0.3 + 0.25 * lam, grid });
    const side = (key, f) => sc.surface(key, (s, r) => v3.scale(f(s), rad(r)), { u: [0, 1], v: [0, 1], nu: 24, nv: 24, color: P.violet, alpha: (0.22 + 0.4 * lam) * (0.6 + 0.4 * w.w3), grid });
    side('sideAB', (s) => S2(s, 0)); side('sideBM', (s) => S2(1, s)); side('sideMC', (s) => S2(1 - s, 1)); side('sideCA', (s) => S2(0, 1 - s));
    // the 54 inner walls and their pairs of opposite normals (cyan along the cell lattice's axis, magenta against it)
    if (fade > 0.01) {
      const walls = group(), plus = group(), minus = group();
      for (const f of sh.inner) {
        const q = sh.cyc(f).map(sh.X);
        quad(walls, ...q);
        const cpar = f.corner.slice(), [i, j] = OTHER[f.ax]; cpar[i] += 0.5; cpar[j] += 0.5;
        const cen = sh.X(cpar), up = cpar.slice(); up[f.ax] += 0.25;
        const dir = v3.unit(v3.sub(sh.X(up), cen)), size = Math.sqrt(v3.len(v3.cross(v3.sub(q[2], q[0]), v3.sub(q[3], q[1]))) / 2);
        const len = 0.42 * size * slide;
        flatArrow(plus, cen, v3.add(cen, v3.scale(dir, len)), { width: 1.8, headLen: 6, headWidth: 6 });
        flatArrow(minus, cen, v3.sub(cen, v3.scale(dir, len)), { width: 1.8, headLen: 6, headWidth: 6 });
      }
      polyOf('innerWalls', walls, { color: P.violet, alpha: 0.16 * (1 - lam * lam) });
      polyOf('plus', plus, { color: P.cyan, alpha: Math.min(1, 1.1 * fade) });
      polyOf('minus', minus, { color: P.magenta, alpha: Math.min(1, 1.1 * fade) });
    }
    // what survives: the node (N⁰), the spine through the three shells (N^{1/3}), the rim of the outer surface
    const node = sh.center([1, 1, 1]), spine = Array.from({ length: 31 }, (_, i) => v3.scale(S2(0.5, 0.5), rad(i / 30)));
    sc.tube('spine', spine, { color: P.amber, width: 4.4, alpha: glow, glow: 0.6 });
    for (let a = 0; a < 3; a++) sc.bead(sh.center([a, 1, 1]), { key: `spine${a}`, color: P.amber, r: 3.4, alpha: glow });
    sc.bead(node, { key: 'node', color: P.cyan, r: 6, glow: 0.8 });
    const t = clock ? clock.t : 0, wave = clock && clock.playing ? Math.sin(2 * PI * 2 * t) ** 2 : 0;
    sc.ring(node, { key: 'nodeRing', color: P.cyan, r: 11 + 6 * wave, alpha: 0.75 });
    const rim = pathOf(G.surf.V, G.SC.loop);
    sc.tube('rim', rim, { color: P.amber, width: 3, alpha: glow, glow: 0.35 });
    readHead(spine, t);
    const { A, B, C } = G.M;
    for (const [p, k] of [[A, 'A'], [B, 'B'], [C, 'C']]) { sc.bead(onCap(p), { key: k, color: P.cyan, r: 4.5, glow: 0.6 }); keepDot(p, 7); }
    if (thumb) return;
    const capC = S2(0.5, 0.5), sideC = v3.scale(S2(0, 0.5), rad(0.5));
    want('A', A, 'A', 'raw ink', { pri: 9, dir: away(capC, A), r: 9 });
    want('B', B, 'B', 'raw ink', { pri: 9, dir: away(capC, B), r: 20 });
    want('C', C, 'C', 'raw ink', { pri: 9, dir: away(capC, C), r: 9 });
    const sv = sh.sieveCounts;
    want('n0', node, `N⁰ = ${sv[0]}`, 'raw c-cy backed', { pri: 8, dir: [-1, 0.2], r: 12 });
    want('n1', v3.scale(capC, rad(0.15)), `N<sup>1/3</sup> = ${sv[1]}`, 'raw c-am backed', { pri: 7, dir: away(capC, v3.scale(capC, 0.4)), r: 8 });
    want('n2', S2(0.7, 0.35), `N<sup>2/3</sup> = ${sv[2]}`, 'raw c-mg backed', { pri: 7, dir: [0.6, -1], r: 6 });
    want('n3', sideC, `N¹ = ${sv[3]}`, 'raw c-vi backed', { pri: 6, dir: away(capC, sideC), r: 8 });
  }

  /* ---------- HUD ---------- */
  function hudText(G) {
    const M = G.M, mode = modeOf(), SC = G.SC;
    const name = G.n === 1 ? L('单元', 'Monad') : G.n === 27 ? L('体胞', 'Solid cells') : L('剖分', 'Tiling');
    $('hudBig').innerHTML = `${name} · N = ${G.n} · ε = ${fix(S.eps, 0)}°`;
    const sub = {
      grades: `<span class="c-cy">Λ⁰ ${fmt(M.grade0Scalar, 3)}</span> · <span class="c-am">Λ¹ ${fmt(M.grade1Step, 3)}</span> · <span class="c-mg">Λ² ${fmt(M.omega, 3)}</span> · <span class="c-vi">Λ³ ${fmt(M.vSector, 3)}</span> · 1⁰ = 1¹ = 1² = 1³ = 1`,
      phase: `<span class="c-am">|∇| = sin ε = ${fmt(M.grade1Step, 3)}</span> · <span class="c-am">${L('弧', 'arc')} ε = ${fmt(M.arcStep, 3)}</span> · <span class="c-vi">Im Δ₃ = ${fmt(M.imBargmann, 4)}</span>`,
      stokes: `<span class="c-am">∮∂Σ A = ${fmt(SC.boundaryCirculation, 4)}</span> = <span class="c-mg">∬Σ F = ${fmt(SC.surfaceCurvatureFlux, 4)}</span> · <span class="c-vi">${HS}(A∧B) ⊥ A, B</span>`,
      bars: `${SC.totalDirectedEdges} → ${L('抵消', 'cancel')} ${SC.cancelledInteriorEdges} → <span class="c-am">${L('外沿', 'rim')} ${SC.survivingBoundaryEdges}</span> · <span class="c-mg">ΣΩ<sub>i</sub> = Ω = ${fmt(SC.sumSubOmega, 3)}</span>`,
      sieve: G.sh ? `${G.sh.totalDirectedFaces} → ${L('抵消', 'cancel')} ${G.sh.cancelledInteriorFaces} → ${G.sh.survivingBoundaryFaces} · <span class="c-cy">${G.sh.sieveCounts[0]}</span> : <span class="c-am">${G.sh.sieveCounts[1]}</span> : <span class="c-mg">${G.sh.sieveCounts[2]}</span> : <span class="c-vi">${G.sh.sieveCounts[3]}</span>` : ''
    }[mode];
    $('hudSub').innerHTML = sub;
    const LEG = {
      grades: [['cy', L('Λ⁰ 相融 cos ε', 'Λ⁰ compatibility cos ε')], ['am', L('Λ¹ 一步与梯度', 'Λ¹ step and gradient')], ['mg', L('Λ² 球面帽 Ω', 'Λ² cap Ω')], ['vi', L('Λ³ 扇形体积', 'Λ³ sector volume')]],
      phase: [['am', L('Λ¹ 弧 ε 与梯度 sin ε', 'Λ¹ arc ε and gradient sin ε')], ['mg', L('Λ² A∧B', 'Λ² A∧B')], ['vi', L('' + HS + '(A∧B) 法向', '' + HS + '(A∧B) normal')], ['cy', L('Λ⁰ cos ε', 'Λ⁰ cos ε')]],
      stokes: [['am', L('∮∂Σ 边界环流', '∮∂Σ rim circulation')], ['mg', L('∬Σ 曲率通量', '∬Σ curvature flux')], ['vi', L('' + HS + ' 法向与四面体', '' + HS + ' normal and tetrahedron')], ['cy', L('Λ⁰ cos ε', 'Λ⁰ cos ε')]],
      bars: [['cy', '+δΓ'], ['mg', '−δΓ'], ['am', L('存活外沿 ∂Σ', 'surviving rim ∂Σ')], ['vi', L('扇形体积', 'sector volume')]],
      sieve: [['cy', L('N⁰ 节点', 'N⁰ node')], ['am', L('N<sup>1/3</sup> 脊线 · ∂Σ', 'N<sup>1/3</sup> spine · ∂Σ')], ['mg', L('N<sup>2/3</sup> 外表面', 'N<sup>2/3</sup> outer surface')], ['vi', L('N¹ 体积', 'N¹ volume')]]
    }[mode];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }

  /* ---------- the frame ---------- */
  function drawStage(G) {
    hudText(G);
    TRV.hudFit();
    const W = $('cv').clientWidth || stageEl.clientWidth, H = $('cv').clientHeight || stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const safe = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    fit(G, safe, W, H);
    sc.begin();
    LB = []; KEEP = []; OBST = huds.slice(); BOUNDS = { x: 4, y: 4, w: W - 8, h: H - 8 };
    if (G.solid) drawShell(G); else drawCap(G);
    // the ε handle rides on B
    const hb = sc.p(G.M.B), showHandle = !thumb && hb[0] > 0 && hb[0] < W && hb[1] > 0 && hb[1] < H;
    handle.hidden = !showHandle;
    if (showHandle) { handle.style.left = `${hb[0].toFixed(1)}px`; handle.style.top = `${hb[1].toFixed(1)}px`; KEEP.push({ x: hb[0] - 17, y: hb[1] - 17, w: 34, h: 34 }); }
    if (!thumb) placeLabels();
    sc.end();
  }

  /* ---------- strip ---------- */
  const STRIP_PAD = [40, 12, 8, 22];
  function drawPlot(G) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const mode = modeOf(), M = G.M, xs = Array.from({ length: 151 }, (_, i) => EPS0 + (EPS1 - EPS0) * i / 150);
    const epsTicks = [15, 30, 45, 60, 75, 90].map((d) => [d, `${d}°`]);
    let meta = '';
    if (mode === 'grades') {
      $('plotTitle').innerHTML = '<span class="zh">N = 1：四个阶的大小随 ε 变，计数都锁在 1</span><span class="en">N = 1: the four grades change size with ε; their counts stay locked at 1</span>';
      const g = kit.plot(cv, { x: [EPS0, EPS1], y: [0, 1.65], pad: STRIP_PAD });
      g.axes({ xTicks: epsTicks, yTicks: [[0, '0'], [0.5, '0.5'], [1, '1'], [1.5, '1.5']] });
      const curves = [[P.cyan, (d) => Math.cos(d * DEG)], [P.amber, (d) => Math.sin(d * DEG)], [P.magenta, (d) => monadAt(d).omega], [P.violet, (d) => monadAt(d).vSector]];
      for (const [col, f] of curves) g.line(xs.map((d) => [d, f(d)]), col, { width: 1.4, alpha: 0.75 });
      // the four counts at N = 1, one line in four colours: 1⁰ = 1¹ = 1² = 1³ = 1
      const seg = (EPS1 - EPS0) / 40;
      for (let i = 0; i < 40; i++) g.line([[EPS0 + i * seg, 1], [EPS0 + (i + 1) * seg, 1]], curves[i % 4][0], { width: 3.2 });
      g.vline(S.eps, P.amber, { alpha: 0.85, width: 1.4 });
      for (const [col, f] of curves) g.dot(S.eps, f(S.eps), col, 3.4);
      meta = `<span class="c-cy">cos ε</span> · <span class="c-am">sin ε</span> · <span class="c-mg">Ω</span> · <span class="c-vi">Ω/3</span> · 1⁰ = 1¹ = 1² = 1³ = 1`;
    } else if (mode === 'phase') {
      $('plotTitle').innerHTML = '<span class="zh">推 B：cos²ε + sin²ε = 1，相位 |Im Δ₃| = ¼ sin²ε 跟着走</span><span class="en">Push B: cos²ε + sin²ε = 1, and the phase |Im Δ₃| = ¼ sin²ε follows</span>';
      const g = kit.plot(cv, { x: [EPS0, EPS1], y: [0, 1.08], pad: STRIP_PAD });
      g.axes({ xTicks: epsTicks, yTicks: [[0, '0'], [0.25, '¼'], [0.5, '½'], [1, '1']] });
      g.hline(1, P.dim, { dash: [4, 3], alpha: 0.8 });
      g.line(xs.map((d) => [d, monadAt(d).cos2]), P.cyan, { width: 2 });
      g.line(xs.map((d) => [d, monadAt(d).sin2]), P.amber, { width: 2 });
      g.line(xs.map((d) => [d, Math.abs(monadAt(d).imBargmann)]), P.violet, { width: 2.2 });
      g.vline(S.eps, P.amber, { alpha: 0.85, width: 1.4 });
      for (const [col, v] of [[P.cyan, M.cos2], [P.amber, M.sin2], [P.violet, Math.abs(M.imBargmann)]]) g.dot(S.eps, v, col, 3.6);
      meta = `<span class="c-cy">cos²ε ${fmt(M.cos2, 3)}</span> + <span class="c-am">sin²ε ${fmt(M.sin2, 3)}</span> = ${fmt(M.pythagoreanSum, 6)} · <span class="c-vi">|Im Δ₃| ${fmt(Math.abs(M.imBargmann), 4)}</span>`;
    } else if (mode === 'stokes') {
      $('plotTitle').innerHTML = '<span class="zh">边界环流与曲面通量：两种算法，同一条线</span><span class="en">Rim circulation and surface flux: two computations, one curve</span>';
      const g = kit.plot(cv, { x: [EPS0, EPS1], y: [-1.7, 0.05], pad: STRIP_PAD });
      g.axes({ xTicks: epsTicks, yTicks: [[0, '0'], [-0.5, '−0.5'], [-1, '−1'], [-1.5, '−1.5']] });
      g.line(xs.map((d) => [d, -monadAt(d).omega]), P.magenta, { width: 2.6 });
      for (let d = EPS0; d <= EPS1 + 1e-9; d += 5) {
        const m = monadAt(d), circ = dGamma(m.A, m.B) + dGamma(m.B, m.C) + dGamma(m.C, m.A);
        g.dot(d, circ, P.amber, 3.6, { ring: true, width: 1.6 });
      }
      g.vline(S.eps, P.amber, { alpha: 0.85, width: 1.4 });
      meta = `<span class="c-am">∮∂Σ ${fmt(G.SC.boundaryCirculation, 4)}</span> · <span class="c-mg">∬Σ ${fmt(G.SC.surfaceCurvatureFlux, 4)}</span> · |Δ| = ${sci(Math.abs(G.SC.boundaryCirculation - G.SC.surfaceCurvatureFlux))}`;
    } else if (mode === 'bars') {
      $('plotTitle').innerHTML = '<span class="zh">每个 N：有向边（面）、成对抵消、存活边界</span><span class="en">For each N: directed edges (faces), cancelled pairs, surviving boundary</span>';
      const data = bars(), g = kit.plot(cv, { x: [0, 5], y: [0, 175], pad: STRIP_PAD });
      g.axes({ xTicks: data.map((d, i) => [i + 0.5, `N = ${d.n}`]), yTicks: [0, 54, 108, 162] });
      data.forEach((d, i) => {
        const on = d.n === S.n, al = on ? 1 : 0.4, x = i + 0.5;
        g.rect(x - 0.36, 0, x - 0.13, d.total, P.sigma, { alpha: 0.12 * al, stroke: P.sigma, strokeAlpha: al });
        g.rect(x - 0.11, 0, x + 0.11, d.cancelled, P.dim, { alpha: 0.75 * al });
        g.rect(x + 0.13, 0, x + 0.36, d.surviving, P.amber, { alpha: 0.85 * al });
      });
      const cur = data.find((d) => d.n === S.n);
      meta = cur ? `N = ${cur.n}: ${cur.total} = ${cur.cancelled} + <span class="c-am">${cur.surviving}</span>` : '';
    } else {
      $('plotTitle').innerHTML = '<span class="zh">宏观筛：N⁰、N<sup>1/3</sup>、N<sup>2/3</sup>、N¹ 从同一点 (1, 1) 分开</span><span class="en">The macroscopic sieve: N⁰, N<sup>1/3</sup>, N<sup>2/3</sup>, N¹ part from one point (1, 1)</span>';
      const g = kit.plot(cv, { x: [1, 27], y: [0.8, 34], logX: true, logY: true, pad: [40, 44, 8, 22] });
      g.axes({ xTicks: NS.map((n) => [n, String(n)]), yTicks: [[1, '1'], [3, '3'], [9, '9'], [27, '27']], xGrid: true });
      const ps = [[0, P.cyan, 'N^{0}'], [1 / 3, P.amber, 'N^{1/3}'], [2 / 3, P.magenta, 'N^{2/3}'], [1, P.violet, 'N^{1}']];
      const nx = Array.from({ length: 61 }, (_, i) => Math.pow(27, i / 60));
      for (const [p, col, lab] of ps) {
        g.line(nx.map((n) => [n, Math.pow(n, p)]), col, { width: 2 });
        for (const n of NS) g.dot(n, Math.pow(n, p), col, 2.4);
        g.text(27, Math.pow(27, p), lab, col, { dx: 6, size: 10.5 });
      }
      const sv = G.sh ? G.sh.sieveCounts : [1, 1, 1, 1];
      ps.forEach(([, col], i) => g.dot(27, sv[i], col, 5.5, { ring: true, width: 1.8 }));
      g.dot(1, 1, P.ink, 5.5, { ring: true, width: 1.8 });
      g.vline(S.n, P.amber, { alpha: 0.85, width: 1.4 });
      meta = `N = 27: <span class="c-cy">${sv[0]}</span> · <span class="c-am">${sv[1]}</span> · <span class="c-mg">${sv[2]}</span> · <span class="c-vi">${sv[3]}</span>`;
    }
    $('plotMeta').innerHTML = meta;
  }

  /* ---------- readouts ---------- */
  function row(k, dt, dd) { $('dt' + k).innerHTML = dt; $('ro' + k).innerHTML = dd; }
  function drawText(G) {
    const M = G.M, SC = G.SC, mode = modeOf(), sh = G.sh;
    const KEY = {
      grades: [L('Λ² 角超 Ω = 2 arctan(tan²(ε/2))', 'Λ² excess Ω = 2 arctan(tan²(ε/2))'), fmt(M.omega, 4), L(` · Λ³ = Ω/3 = ${fmt(M.vSector, 4)}`, ` · Λ³ = Ω/3 = ${fmt(M.vSector, 4)}`)],
      phase: [L('Im Δ₃ = −¼ sin²ε（Δ₃ = Tr(P_A P_C P_B)）', 'Im Δ₃ = −¼ sin²ε (Δ₃ = Tr(P_A P_C P_B))'), fmt(M.imBargmann, 4), L(` · arg Δ₃ = −Ω/2 = ${fmt(M.argBargmann, 4)} · p′ = ${fmt(M.bornFlowCommutator, 4)}`, ` · arg Δ₃ = −Ω/2 = ${fmt(M.argBargmann, 4)} · p′ = ${fmt(M.bornFlowCommutator, 4)}`)],
      stokes: [L('∮∂Σ A（沿边搬运）= ∬Σ F（巴格曼角超）', '∮∂Σ A (transport) = ∬Σ F (Bargmann excess)'), fmt(SC.boundaryCirculation, 4), ` · |Δ| = ${sci(Math.abs(SC.boundaryCirculation - SC.surfaceCurvatureFlux))} · max(|n·A|, |n·B|) = ${sci(M.hodgeOrthogonality)}`],
      bars: [L('存活外沿 / 有向边', 'surviving rim / directed edges'), `${SC.survivingBoundaryEdges} / ${SC.totalDirectedEdges}`, L(` · 抵消 ${SC.cancelledInteriorEdges} · 内部净环流 ${fmt(SC.interiorNetCirculation, 3)}`, ` · cancelled ${SC.cancelledInteriorEdges} · inner net circulation ${fmt(SC.interiorNetCirculation, 3)}`)],
      sieve: sh ? [L('存活边界面 / 有向面', 'surviving boundary faces / directed faces'), `${sh.survivingBoundaryFaces} / ${sh.totalDirectedFaces}`, L(` · 抵消 ${sh.cancelledInteriorFaces} · ∂(∂V) 非零边 ${sh.boundaryOfBoundary}`, ` · cancelled ${sh.cancelledInteriorFaces} · edges left in ∂(∂V): ${sh.boundaryOfBoundary}`)] : ['', '', '']
    }[mode];
    $('dtKey').innerHTML = KEY[0]; $('roKey').textContent = KEY[1]; $('roKeySub').textContent = KEY[2];
    $('roAside').textContent = `N = ${G.n} · ε = ${fix(S.eps, 0)}°`;
    row(1, L('Λ⁰ 相融 A·B = cos ε', 'Λ⁰ compatibility A·B = cos ε'), fmt(M.grade0Scalar, 4));
    row(2, L('Λ¹ 梯度 sin ε · 弧 ε', 'Λ¹ gradient sin ε · arc ε'), `${fmt(M.grade1Step, 4)} · ${fmt(M.arcStep, 4)}`);
    row(3, L('Λ² 角超 Ω · 小单元 ΣΩ<sub>i</sub>', 'Λ² excess Ω · small cells ΣΩ<sub>i</sub>'), `${fmt(M.omega, 4)} · ${fmt(SC.sumSubOmega, 4)}`);
    row(4, L('Λ³ 扇形 Ω/3 · 四面体 sin²ε/6', 'Λ³ sector Ω/3 · tetrahedron sin²ε/6'), `${fmt(M.vSector, 4)} · ${fmt(M.vTetra, 4)}`);
    row(5, L('cos²ε + sin²ε（拉格朗日）', 'cos²ε + sin²ε (Lagrange)'), `${fmt(M.pythagoreanSum, 9)} <span class="nummark">✓</span>`);
    row(6, L('N⁰, N<sup>1/3</sup>, N<sup>2/3</sup>, N¹', 'N⁰, N<sup>1/3</sup>, N<sup>2/3</sup>, N¹'), G.scalePowers.map((x) => (Number.isInteger(x) ? String(x) : fix(x, 2))).join(' · '));
    const note = {
      grades: L('一个单元同时是青色的相融 cos ε、琥珀色的一步与梯度、品红的球面帽与紫色的扇形体积；在这一个单元里，每个阶都只有一个对象可数。', 'One cell is at once the cyan compatibility cos ε, the amber step and gradient, the magenta cap and the violet sector volume; inside this one cell every grade has exactly one object to count.'),
      phase: L('拖动琥珀色的 B：梯度 sin ε、弧长 ε 与 Im Δ₃ = −¼ sin²ε 由同一个 B 驱动；紫色的 ' + HS + '(A∧B) 长度等于品红平行四边形 A∧B 的面积 sin ε。', 'Drag the amber B: the gradient sin ε, the arc ε and Im Δ₃ = −¼ sin²ε are driven by the same B; the violet ' + HS + '(A∧B) is as long as the magenta parallelogram A∧B has area, sin ε.'),
      stokes: L('沿琥珀色的边界逐段搬运标架得到的环流，与品红帽上巴格曼角超的和，是两种独立的算法，读数相同；紫色法向与 A、B 都正交。', 'The circulation from carrying a frame round the amber rim and the sum of Bargmann excesses over the magenta cap are two independent computations with the same reading; the violet normal is square to A and B.'),
      bars: L('每个小三角形的边界箭头在共享边上与邻居的反向：青色 +δΓ 与品红 −δΓ 成对抵消，只剩琥珀色外沿；小角超之和仍是 Ω。', 'On every shared edge the boundary arrows of two neighbouring triangles run against each other: cyan +δΓ and magenta −δΓ cancel in pairs and only the amber rim survives; the small excesses still add up to Ω.'),
      sieve: L('108 个内部面成对抵消，边界面的边界为零；剩下的节点、脊线、外表面与体积按 1 : 3 : 9 : 27 分开。', 'The 108 inner faces cancel in pairs and the boundary of the boundary is zero; what remains, node, spine, outer surface and volume, separates as 1 : 3 : 9 : 27.')
    }[mode];
    $('roNote').innerHTML = note;
    $('pillN').querySelector('strong').textContent = String(G.n);
    $('pillEps').querySelector('strong').textContent = `${fix(S.eps, 0)}°`;
  }

  let clock = null;
  const paint = kit.painter(() => { const G = compute(S.n, S.eps); drawStage(G); drawPlot(G); drawText(G); }, [stageEl, $('plot')]);

  /* ---------- controls ---------- */
  let tween = null, cards = null;
  /** The reader took over: no card, no running card transition, the rail paused. */
  function free() { if (tween) { tween.cancel(); tween = null; } if (cards) cards.mark(null); if (clock) clock.pause(); }
  const fEps = kit.field($('epsilon'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { free(); setEps(v); } });
  const fCancel = kit.field($('cancel'), { fmt: (v) => fix(v, 2), onInput: (v) => { free(); clock.set(clamp(v, 0, 1)); } });
  function setEps(d) { S.eps = clamp(Math.round(d), EPS0, EPS1); fEps.set(S.eps); paint(); }
  clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, rate: 0.22, step: 0.05, loop: true, t: 0,
    format: (t) => `λ = ${fix(t, 2)} <small>/ 1</small>`,
    onChange: (t) => { S.cancel = t; fCancel.set(t.toFixed(2)); paint(); }
  });
  const nChips = kit.chips($('cellCount'), 'n', (v) => { free(); S.n = Number(v); blendFit(450); paint(); });
  const lensChips = kit.chips($('lens'), 'lens', (v) => { free(); S.lens = v; blendFit(450); paint(); });
  $('rew').addEventListener('click', () => { free(); clock.set(0); });
  kit.keys({ l: () => { const order = ['all', 'hodge03', 'hodge12'], v = order[(order.indexOf(S.lens) + 1) % 3]; free(); S.lens = v; lensChips.set(v, true); blendFit(450); paint(); } });

  /* the ε handle: drag B along the great circle of the floor wall; the framing is held still while it moves */
  function handleTo(ev) {
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    let best = S.eps, bd = Infinity;
    for (let d = EPS0; d <= EPS1 + 1e-9; d += 0.25) { const e = d * DEG, q = sc.p([Math.cos(e), Math.sin(e), 0]), dd = Math.hypot(q[0] - x, q[1] - y); if (dd < bd) { bd = dd; best = d; } }
    setEps(best);
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    free();
    dragging = { id: ev.pointerId, fit: fitNow ? { unit: fitNow.unit, c: fitNow.c.slice(), safe: Object.assign({}, fitNow.safe) } : null };
    if (!dragging.fit) { dragging = null; return; }
    handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events have no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => { if (dragging && ev.pointerId === dragging.id) handleTo(ev); });
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.id)) return;
    dragging = null; handle.classList.remove('dragging');
    blendFit(320); paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[ev.key];
    if (!k) return;
    ev.preventDefault(); free(); setEps(S.eps + k);
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'monad-four-in-one': { n: 1, eps: 60, cancel: 0, lens: 'all', still: 0 },
    'gradient-path-phase-lock': { n: 1, eps: 54, cancel: 0, lens: 'hodge12', still: 0 },
    'hodge-stokes-duality': { n: 1, eps: 64, cancel: 0, lens: 'hodge03', still: 0 },
    'multicell-boundary-cancellation': { n: 16, eps: 68, cancel: 0.85, lens: 'all', still: 0.85 },
    'macroscopic-grade-sieve': { n: 27, eps: 65, cancel: 1, lens: 'all', play: false, still: 1 }
  };
  const NOTES = {
    'monad-four-in-one': ['N = 1，ε = 60°：一个不可再分的单元同时是青色的相融 cos ε、琥珀色的一步与梯度 sin ε、品红的球面帽 Ω 和紫色的扇形体积 Ω/3；在这一个单元里每个阶都只数到 1。', 'N = 1, ε = 60°: one indivisible cell is at once the cyan compatibility cos ε, the amber step and gradient sin ε, the magenta cap Ω and the violet sector volume Ω/3; inside this one cell each grade counts exactly 1.'],
    'gradient-path-phase-lock': ['ε = 54°：拖动琥珀色的 B，梯度 sin ε、弧长 ε 与相位 Im Δ₃ = −¼ sin²ε 一起变；品红的平行四边形 A∧B 与紫色的法向 ' + HS + '(A∧B) 一样大。', 'ε = 54°: drag the amber B and the gradient sin ε, the arc ε and the phase Im Δ₃ = −¼ sin²ε change together; the magenta parallelogram A∧B and the violet normal ' + HS + '(A∧B) have the same size.'],
    'hodge-stokes-duality': ['ε = 64°：沿琥珀色边界搬运得到的环流 ∮∂Σ 与品红帽上的通量 ∬Σ 由两种算法得出同一个数 −Ω；紫色的 ' + HS + '(A∧B) 与 A、B 都正交。', 'ε = 64°: the circulation ∮∂Σ carried round the amber rim and the flux ∬Σ over the magenta cap come out of two computations as the same number −Ω; the violet ' + HS + '(A∧B) is square to both A and B.'],
    'multicell-boundary-cancellation': ['N = 16，λ = 0.85：小三角形的边界箭头在共享边上成对相反（青色 +δΓ，品红 −δΓ）并逐渐抵消；48 条有向边里 36 条抵消，只剩 12 条琥珀色外沿。', 'N = 16, λ = 0.85: the boundary arrows of the small triangles run opposite in pairs on shared edges (cyan +δΓ, magenta −δΓ) and fade out; of 48 directed edges 36 cancel and only the 12 amber rim edges remain.'],
    'macroscopic-grade-sieve': ['N = 27，λ = 1：108 个内部面成对抵消；剩下青色节点 1 个、琥珀色脊线 3 格、品红外表面 9 块、紫色体积 27 格，按 N 的 0、1/3、2/3、1 次幂分开。按播放看抵消一遍遍发生。', 'N = 27, λ = 1: the 108 inner faces cancel in pairs; left are 1 cyan node, a 3-cell amber spine, 9 magenta outer faces and 27 violet cells, growing as N to the powers 0, 1/3, 2/3 and 1. Press play to watch the cancellation happen again.']
  };
  // A cited figure has a fixed frame: one complete sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'monad-four-in-one': ['N = 1：一个单元同时是青色 cos ε、琥珀色一步 sin ε、品红帽 Ω 与紫色体积 Ω/3，各数 1 个。', 'N = 1: one cell holds cyan cos ε, amber step sin ε, magenta cap Ω and violet volume Ω/3, one of each.'],
    'gradient-path-phase-lock': ['ε = 54°：推琥珀色的 B，sin ε、弧长 ε 与 Im Δ₃ = −¼ sin²ε 一起变，' + HS + '(A∧B) 与 A∧B 等大。', 'ε = 54°: push amber B; sin ε, arc ε and Im Δ₃ = −¼ sin²ε move together, ' + HS + '(A∧B) matches A∧B.'],
    'hodge-stokes-duality': ['ε = 64°：琥珀色边界的环流 = 品红帽的通量 = −Ω；紫色法向与 A、B 都正交。', 'ε = 64°: amber rim circulation = magenta cap flux = −Ω; the violet normal is square to A and B.'],
    'multicell-boundary-cancellation': ['N = 16：共享边上青色 +δΓ 与品红 −δΓ 成对抵消，48 条有向边只剩 12 条琥珀色外沿。', 'N = 16: cyan +δΓ and magenta −δΓ cancel on shared edges; of 48 directed edges, 12 amber rim edges remain.'],
    'macroscopic-grade-sieve': ['N = 27：108 个内部面抵消，剩节点 1、脊线 3、外表面 9、体积 27，即 N 的 0、1/3、2/3、1 次幂。', 'N = 27: 108 inner faces cancel; node 1, spine 3, surface 9, volume 27 remain: N to the 0, 1/3, 2/3, 1.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (tween) { tween.cancel(); tween = null; }
    clock.pause();   // before the rail moves: pausing reports the clock's t
    S.n = p.n; nChips.set(String(p.n), true);
    S.lens = p.lens; lensChips.set(p.lens, true);
    const instant = booting || TRV.still;
    if (instant) {
      S.eps = p.eps; fEps.set(p.eps);
      sc.view([VIEW[0], VIEW[1], 1], 0);
      clock.set(TRV.still ? p.still : p.cancel);
    } else {
      const e0 = S.eps, l0 = S.cancel;
      blendFit(650);
      sc.view([VIEW[0], VIEW[1], 1], 650);
      tween = kit.tween(650, (q) => {
        S.eps = lerp(e0, p.eps, q); S.cancel = lerp(l0, p.cancel, q);
        fEps.set(Math.round(S.eps)); fCancel.set(S.cancel.toFixed(2)); clock.set(S.cancel, true); paint();
      }, () => { tween = null; S.eps = p.eps; fEps.set(p.eps); clock.set(p.cancel); });
    }
    if (p.play && !TRV.still) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    paint();
  }
  cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? Object.assign({}, NOTES, FIGURE_NOTES) : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换单元数 N、拖动琥珀色的 B 改步长 ε、拖时间轴改抵消 λ、在右上角换透镜。随时可以再选一张卡。', 'Free play: change the cell count N, drag the amber B to change the step ε, scrub the rail to change the blend λ, switch the lens at the top right. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  function snapshot() {
    const G = compute(S.n, S.eps), M = G.M, SC = G.SC, sh = G.sh, CC = G.CC;
    const hb = handle.getBoundingClientRect();
    return JSON.parse(JSON.stringify({
      preset: cards.current, n: G.n, k: G.k, solid: G.solid, epsilon: S.eps, cancel: S.cancel, lens: S.lens, mode: modeOf(),
      t: clock.t, max: clock.max, playing: clock.playing, cam: Object.assign({}, sc.cam), dragging: !!dragging,
      A: M.A, B: M.B, C: M.C,
      grade0Scalar: M.grade0Scalar, grade1Step: M.grade1Step, arcStep: M.arcStep, omega: M.omega, omegaGirard: M.omegaGirard,
      gammaSpinor: M.gammaSpinor, gammaVector: M.gammaVector, vSector: M.vSector, vTetra: M.vTetra, tripleProduct: M.tripleProduct,
      imBargmann: M.imBargmann, reBargmann: M.reBargmann, argBargmann: M.argBargmann, imBargmannMatrix: M.imBargmannMatrix, bargmannFormulaGap: M.bargmannFormulaGap,
      cos2: M.cos2, sin2: M.sin2, pythagoreanSum: M.pythagoreanSum, lagrangeLeft: M.lagrangeLeft, lagrangeRight: M.lagrangeRight,
      hodgeNormal: M.nAB, hodgeLength: M.hodgeLength, hodgeOrthogonality: M.hodgeOrthogonality,
      bornWeight: M.bornWeight, bornFlowCommutator: M.bornFlowCommutator, bornFlowGeometric: M.bornFlowGeometric, bornFlowImag: M.bornFlowImag,
      boundaryCirculation: SC.boundaryCirculation, surfaceCurvatureFlux: SC.surfaceCurvatureFlux,
      totalDirectedEdges: SC.totalDirectedEdges, cancelledInteriorEdges: SC.cancelledInteriorEdges, survivingBoundaryEdges: SC.survivingBoundaryEdges,
      interiorNetCirculation: SC.interiorNetCirculation, interiorIncidenceSum: SC.interiorIncidenceSum,
      cellCirculationSum: SC.cellCirculationSum, cellCirculationGap: SC.cellCirculationGap,
      sumSubOmega: SC.sumSubOmega, subOmega: SC.faceOmega, f2SurvivingEdges: SC.f2SurvivingEdges, eulerCharacteristic: SC.eulerCharacteristic, surfaceCounts: SC.counts,
      totalDirectedFaces: sh ? sh.totalDirectedFaces : null, cancelledInteriorFaces: sh ? sh.cancelledInteriorFaces : null, survivingBoundaryFaces: sh ? sh.survivingBoundaryFaces : null,
      interiorFacePairSum: sh ? sh.interiorPairSum : null, boundaryOfBoundary: sh ? sh.boundaryOfBoundary : null, eulerVolume: sh ? sh.eulerVolume : null,
      latticeCounts: sh ? sh.latticeCounts : null, sieveCounts: sh ? sh.sieveCounts : G.n === 1 ? [1, 1, 1, 1] : null,
      tetraCoboundaryDefect: CC.tetraCoboundaryDefect, tetraCoboundaryMax: CC.tetraCoboundaryMax, tetraVertices: CC.tetraVertices, tetraQuadruples: CC.tetraQuadruples,
      cochainNonzero: CC.cochainNonzero, cochainBargmannGap: CC.cochainBargmannGap,
      scalePowers: G.scalePowers,
      handle: handle.hidden ? null : { x: hb.left + hb.width / 2, y: hb.top + hb.height / 2 },
      roles: { scalar: 'cyan', plusIncidence: 'cyan', step: 'amber', gradient: 'amber', rim: 'amber', spine: 'amber', handle: 'amber', cap: 'magenta', minusIncidence: 'magenta', wedge: 'magenta', outerSurface: 'magenta', volume: 'violet', hodgeNormal: 'violet', spinorPhase: 'violet' }
    }));
  }
  const screenOf = (v) => { const q = sc.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; };
  window.MONAD_DEBUG = Object.freeze({
    get state() { return snapshot(); },
    /** Viewport coordinates of a world point under the current projection, and its depth. */
    screen: screenOf,
    /** The state for any (N, ε) without touching the page (an independent suite compares against its own algorithm). */
    at: (n, eps) => { const keep = memo, G = compute(n, eps), out = { omega: G.M.omega, sumSubOmega: G.SC.sumSubOmega, boundaryCirculation: G.SC.boundaryCirculation, counts: G.SC.counts }; memo = keep; return out; }
  });
  window.TRV_THUMB = () => { cards.pick('macroscopic-grade-sieve'); clock.pause(); clock.set(0.55); sc.view([VIEW[0], VIEW[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('monad-four-in-one'));
  booting = false;
  paint();
})();
