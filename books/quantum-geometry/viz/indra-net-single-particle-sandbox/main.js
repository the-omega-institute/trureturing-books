/* INDRA//NET · 唯一宇宙场与因陀罗网 · One cosmic field and Indra's net
   World (kit.solid): z up. Thirteen jewels of one radius: jewel 0 at the centre, jewels 1 … 12 on the vertices of an
   icosahedron of circumradius 1 with a vertex up (1 = top, 2 … 6 the upper pentagon, 7 … 11 the lower one, 12 = bottom).
   The net is the 30 edges of the icosahedron and the 12 spokes to the centre. Every jewel carries a unit record
   ψ_x ∈ ℝ⁴ (centre (1, 0, 0, 0), outer (½, (√3/2)p̂_x)): the Gram matrix has 1 exactly on its diagonal
   (unit_gram_overlap_characterization), and an icosahedral rotation g taking jewel 1 to the chief x₀ relabels the
   columns without changing it, so a unitary U carries one onto the other (exists_unitary_mul_eq_of_conjTranspose_mul_eq).
   The chief's spherical mirror shows the other twelve: the image of y sits where the normal bisects the view direction D
   and the direction d̂ to y, with clarity cos²θ = (1 + D·d̂)/2. Reflections: Ψ⁽⁰⁾ = δ_{x₀}, Ψ⁽ᵐ⁾ = cos(K_εΨ⁽ᵐ⁻¹⁾) with
   K_ε = (1 − ε)·1 + ε·(mean over the neighbours), a contraction on [0, 1]-valued fields converging to θ* everywhere
   (rational_inverse_endpoint, objective_claim_requires_invariant_common_factor). The chief's word is a different, linear
   object: its letters (K_εʲΨ)(x₀) = ⟨(K_εᵀ)ʲδ_{x₀}, Ψ⟩, j = 0 … m, read the Krylov span of the mixing matrix, not the
   outputs of the nonlinear reflection (future_word_orthogonal_residual); the mirror of each jewel is a page whose slot
   0 is itself (recursive_page_table_walk). The Wheeler ribbon is the closed Hamiltonian cycle
   1 → 3 → 4 → 8 → 9 → 5 → 10 → 12 → 7 → 2 → 11 → 6 → 1 along great-circle arcs: the slice z = z_now meets it in knots of
   alternating sign, and over GF(2) the cycle is the boundary of ten faces (face_cycle_exact). The cosmic zoom ζ shrinks
   the net into an outer horizon jewel (MODEL). The rail τ ∈ [0, 1] drives the card's quantity. Every number is computed
   here; read-only probe: window.INDRA_NET_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit = (a) => scale(a, 1 / norm(a));
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };

  /* ---------- the net ---------- */
  const R5 = 2 / Math.sqrt(5), Z5 = 1 / Math.sqrt(5);
  const POS = [[0, 0, 0], [0, 0, 1]];
  for (let k = 0; k < 5; k++) POS.push([R5 * Math.cos(TAU * k / 5), R5 * Math.sin(TAU * k / 5), Z5]);
  for (let k = 0; k < 5; k++) POS.push([R5 * Math.cos(TAU * k / 5 + PI / 5), R5 * Math.sin(TAU * k / 5 + PI / 5), -Z5]);
  POS.push([0, 0, -1]);
  const N = POS.length, OUTER = range(1, 12, 11);
  const EDGE = Math.sqrt(2 - 2 / Math.sqrt(5));            // the edge of the icosahedron of circumradius 1
  const EDGES = [];
  for (const i of OUTER) for (const j of OUTER) if (j > i && Math.abs(norm(sub(POS[i], POS[j])) - EDGE) < 1e-9) EDGES.push([i, j]);
  const SPOKES = OUTER.map((k) => [0, k]);
  const NEIGH = POS.map(() => []);
  for (const [i, j] of [...EDGES, ...SPOKES]) { NEIGH[i].push(j); NEIGH[j].push(i); }
  NEIGH.forEach((l) => l.sort((a, b) => a - b));
  const ekey = (i, j) => (i < j ? `${i}-${j}` : `${j}-${i}`);
  const EDGE_SET = new Set(EDGES.map(([i, j]) => ekey(i, j)));
  const FACES = [];
  for (const i of OUTER) for (const j of OUTER) for (const k of OUTER) if (i < j && j < k && EDGE_SET.has(ekey(i, j)) && EDGE_SET.has(ekey(j, k)) && EDGE_SET.has(ekey(i, k))) FACES.push([i, j, k]);
  const RIBBON = [1, 3, 4, 8, 9, 5, 10, 12, 7, 2, 11, 6];
  const RIBBON_EDGES = RIBBON.map((a, i) => ekey(a, RIBBON[(i + 1) % RIBBON.length]));
  const RJ = 0.29, RH = 1.3, SLICE_R = 1.3, IMG_R = 0.06, LOG_OBS = Math.log10(4.40e26 / 1.616255e-35);
  const EPS0 = 0.5, M_MAX = 24, Z_SPAN = 1.25;
  const VIEW0 = [2.827, 0.5];

  /* ---------- records, Gram, the chief swap ---------- */
  const PSI = POS.map((p, x) => (x === 0 ? [1, 0, 0, 0] : [0.5, ...scale(p, Math.sqrt(3) / 2)]));
  const dot4 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  const GRAM = PSI.map((a) => PSI.map((b) => dot4(a, b)));
  const rot = (axis, ang) => {
    const [x, y, z] = unit(axis), c = Math.cos(ang), s = Math.sin(ang), t = 1 - c;
    return [[t * x * x + c, t * x * y - s * z, t * x * z + s * y], [t * x * y + s * z, t * y * y + c, t * y * z - s * x], [t * x * z - s * y, t * y * z + s * x, t * z * z + c]];
  };
  const mm3 = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  const mv3 = (A, v) => A.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2]);
  /** The 60 rotations of the icosahedron, from a fivefold turn about the top and a half turn about an edge midpoint. */
  const GROUP = (() => {
    const gens = [rot([0, 0, 1], TAU / 5), rot(add(POS[1], POS[2]), PI)], out = [[[1, 0, 0], [0, 1, 0], [0, 0, 1]]];
    const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < 1e-9));
    for (let q = 0; q < out.length && out.length < 200; q++) for (const g of gens) { const h = mm3(out[q], g); if (!out.some((e) => same(e, h))) out.push(h); }
    return out.map((Rm) => {
      const perm = POS.map((p, x) => (x === 0 ? 0 : OUTER.find((y) => norm(sub(mv3(Rm, p), POS[y])) < 1e-9)));
      return { R: Rm, perm, angle: Math.acos(clamp((Rm[0][0] + Rm[1][1] + Rm[2][2] - 1) / 2, -1, 1)) };
    });
  })();
  const inv4 = (M) => {   // Gauss–Jordan on a 4 × 4 matrix
    const a = M.map((r, i) => [...r, ...[0, 1, 2, 3].map((j) => (i === j ? 1 : 0))]);
    for (let c = 0; c < 4; c++) {
      let p = c; for (let r = c + 1; r < 4; r++) if (Math.abs(a[r][c]) > Math.abs(a[p][c])) p = r;
      [a[c], a[p]] = [a[p], a[c]];
      const d = a[c][c]; a[c] = a[c].map((x) => x / d);
      for (let r = 0; r < 4; r++) if (r !== c) { const f = a[r][c]; a[r] = a[r].map((x, j) => x - f * a[c][j]); }
    }
    return a.map((r) => r.slice(4));
  };
  /** The swap of the chief from jewel 1 to x₀: the rotation g (smallest angle), B = (ψ_{g(x)}), U = BA⁺ and residuals. */
  function chiefSwap(x0) {
    const cands = GROUP.filter((g) => g.perm[1] === x0).sort((a, b) => a.angle - b.angle);
    if (!cands.length) return { exists: false, from: 1, to: x0, gramRow: [GRAM[1].slice(), GRAM[x0].slice()] };
    const g = cands[0], A = [0, 1, 2, 3].map((r) => PSI.map((c) => c[r])), B = [0, 1, 2, 3].map((r) => g.perm.map((y) => PSI[y][r]));
    const AAt = A.map((r) => A.map((s) => r.reduce((t, x, k) => t + x * s[k], 0))), BAt = B.map((r) => A.map((s) => r.reduce((t, x, k) => t + x * s[k], 0)));
    const Ai = inv4(AAt), U = BAt.map((r) => [0, 1, 2, 3].map((j) => r.reduce((t, x, k) => t + x * Ai[k][j], 0)));
    const UA = U.map((r) => A[0].map((_, c) => r.reduce((t, x, k) => t + x * A[k][c], 0)));
    let unitary = 0, fit = 0, gram = 0;
    for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) unitary = Math.max(unitary, Math.abs(U.reduce((t, r) => t + r[i] * r[j], 0) - (i === j ? 1 : 0)));
    for (let i = 0; i < 4; i++) for (let c = 0; c < N; c++) fit = Math.max(fit, Math.abs(UA[i][c] - B[i][c]));
    for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) gram = Math.max(gram, Math.abs(GRAM[g.perm[a]][g.perm[b]] - GRAM[a][b]));
    return { exists: true, from: 1, to: x0, perm: g.perm, angle: g.angle, U, unitary, fit, gram };
  }

  /* ---------- the cosine fixed point and the reflections ---------- */
  const THETA_STAR = (() => { let a = 0, b = 1; for (let i = 0; i < 200; i++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; })();
  const SIGN_CHANGES = (() => { let n = 0, prev = Math.cos(1e-3) - 1e-3; for (let k = 2; k <= 2000; k++) { const t = k * 1e-3, f = Math.cos(t) - t; if (Math.sign(f) !== Math.sign(prev)) n++; prev = f; } return n; })();
  function kMatrix(eps) {
    const K = new Float64Array(N * N);
    for (let x = 0; x < N; x++) { K[x * N + x] += 1 - eps; for (const y of NEIGH[x]) K[x * N + y] += eps / NEIGH[x].length; }
    return K;
  }
  const apply = (K, v) => { const out = new Float64Array(N); for (let x = 0; x < N; x++) { let s = 0; for (let y = 0; y < N; y++) s += K[x * N + y] * v[y]; out[x] = s; } return out; };
  const applyT = (K, v) => { const out = new Float64Array(N); for (let y = 0; y < N; y++) { let s = 0; for (let x = 0; x < N; x++) s += K[x * N + y] * v[x]; out[y] = s; } return out; };
  const delta = (x0) => { const v = new Float64Array(N); v[x0] = 1; return v; };
  const reflCache = new Map();
  /** Ψ⁽⁰⁾ … Ψ⁽ᴹ⁾ from the start that lights only the chief, their errors and the limit. */
  function reflections(eps, x0) {
    const key = `${eps.toFixed(4)}|${x0}`;
    if (reflCache.has(key)) return reflCache.get(key);
    const K = kMatrix(eps), fields = [delta(x0)];
    for (let m = 1; m <= M_MAX; m++) fields.push(apply(K, fields[m - 1]).map(Math.cos));
    const errs = fields.map((f) => Math.max(...f.map((x) => Math.abs(x - THETA_STAR))));
    let lim = fields[M_MAX];
    for (let m = 0; m < 400; m++) lim = apply(K, lim).map(Math.cos);
    const out = { K, fields, errs, limit: lim };
    reflCache.set(key, out);
    if (reflCache.size > 60) reflCache.delete(reflCache.keys().next().value);
    return out;
  }
  /** The chief's linear mixing word of length m + 1: the effects (K_εᵀ)ʲδ_{x₀}, so its letters are (K_εʲΨ)(x₀), not the
      outputs of the nonlinear reflection Ψ ↦ cos(K_εΨ); the dimension they span and a residual witness. */
  function word(R, x0, m, psi) {
    const effects = [delta(x0)];
    for (let j = 1; j <= m; j++) effects.push(applyT(R.K, effects[j - 1]));
    const basis = [];
    for (const e of effects) {
      const v = Float64Array.from(e);
      for (const b of basis) { const c = b.reduce((s, x, i) => s + x * v[i], 0); for (let i = 0; i < N; i++) v[i] -= c * b[i]; }
      const n = Math.hypot(...v);
      if (n > 1e-9) basis.push(v.map((x) => x / n));
    }
    const r = Float64Array.from({ length: N }, (_, i) => Math.sin(1.7 * i + 0.3));
    for (const b of basis) { const c = b.reduce((s, x, i) => s + x * r[i], 0); for (let i = 0; i < N; i++) r[i] -= c * b[i]; }
    const rn = Math.hypot(...r), res = rn > 1e-9 ? r.map((x) => x / rn) : new Float64Array(N);
    const plus = psi.map((x, i) => x + res[i]);
    const w = (v) => effects.map((e) => e.reduce((s, x, i) => s + x * v[i], 0));
    const proj = (v) => { const out = new Float64Array(N); for (const b of basis) { const c = b.reduce((s, x, i) => s + x * v[i], 0); for (let i = 0; i < N; i++) out[i] += c * b[i]; } return out; };
    const w0 = w(psi), w1 = w(plus), p0 = proj(psi), p1 = proj(plus);
    return { length: effects.length, dim: basis.length, residualDim: N - basis.length, residual: Array.from(res), residualNorm: Math.hypot(...res),
      wordGap: Math.max(...w0.map((x, i) => Math.abs(x - w1[i]))), projGap: Math.max(...p0.map((x, i) => Math.abs(x - p1[i]))), word: w0 };
  }

  /* ---------- the page table of the mirrors ---------- */
  const SLOTS = 13;
  const lookup = (x, s) => (s === 0 ? x : NEIGH[x][s - 1] != null ? NEIGH[x][s - 1] : x);
  const walk = (root, path) => path.reduce((x, s) => lookup(x, s), root);
  function pageTable(x0, m) {
    const i = 1, leaf = lookup(x0, i), j = 1, data = lookup(leaf, j);
    const depths = Array.from({ length: m + 1 }, (_, d) => walk(x0, Array(d).fill(0)));
    return { root: x0, selfSlot: 0, i, j, leaf, data, slots: SLOTS, selfFixed: lookup(x0, 0) === x0, walkIJ: walk(x0, [i, j]), walkSelfI: walk(x0, [0, i]), depths, depth: m };
  }

  /* ---------- faces and cycles over GF(2) ---------- */
  const FACE_TOPO = (() => {
    const edgeIndex = new Map(EDGES.map(([i, j], e) => [ekey(i, j), e]));
    const cols = FACES.map((f) => { let bits = 0n; for (const [a, b] of [[f[0], f[1]], [f[1], f[2]], [f[0], f[2]]]) bits |= 1n << BigInt(edgeIndex.get(ekey(a, b))); return bits; });
    // rank of the boundary map (30 × 20) over GF(2), by elimination on the face columns
    const basis = [];
    for (let c of cols) { for (const b of basis) if ((c ^ b) < c) c ^= b; if (c) basis.push(c); basis.sort((a, b) => (a > b ? -1 : a < b ? 1 : 0)); }
    // the face set bounded by the ribbon: across a ribbon edge the side flips, across any other edge it stays
    const side = FACES.map(() => -1), ribbon = new Set(RIBBON_EDGES);
    side[0] = 1;
    let conflict = false;
    for (let changed = true; changed;) {
      changed = false;
      FACES.forEach((f, a) => {
        if (side[a] < 0) return;
        FACES.forEach((g, b) => {
          const shared = f.filter((v) => g.includes(v));
          if (a === b || shared.length !== 2) return;
          const want = side[a] ^ (ribbon.has(ekey(shared[0], shared[1])) ? 1 : 0);
          if (side[b] < 0) { side[b] = want; changed = true; } else if (side[b] !== want) conflict = true;
        });
      });
    }
    const X = FACES.map((_, a) => a).filter((a) => side[a] === 1);
    const boundary = EDGES.filter(([i, j]) => FACES.filter((f, a) => side[a] === 1 && f.includes(i) && f.includes(j)).length === 1).map(([i, j]) => ekey(i, j)).sort();
    return { V: 12, E: EDGES.length, F: FACES.length, rank: basis.length, kernel: FACES.length - basis.length, X, Xsize: X.length, complement: FACES.length - X.length,
      conflict, boundaryIsRibbon: boundary.join() === [...RIBBON_EDGES].sort().join(), ribbonIsCycle: RIBBON_EDGES.every((k) => EDGE_SET.has(k)) && new Set(RIBBON).size === 12 };
  })();

  /* ---------- the ribbon and its knots ---------- */
  const slerp = (a, b, t) => { const om = Math.acos(clamp(dot(a, b), -1, 1)), s = Math.sin(om); return add(scale(a, Math.sin((1 - t) * om) / s), scale(b, Math.sin(t * om) / s)); };
  const RIBBON_PATH = RIBBON.flatMap((a, i) => { const b = RIBBON[(i + 1) % RIBBON.length]; return range(0, 1, 20).slice(0, 20).map((t) => slerp(POS[a], POS[b], t)); });
  /** The knots of the ribbon on the slice z = zs (in the shrunk world of scale s): point, sign of the crossing, edge. */
  function knots(zs, s) {
    const n = RIBBON_PATH.length, out = [];
    for (let i = 0; i < n; i++) {
      const p = scale(RIBBON_PATH[i], s), q = scale(RIBBON_PATH[(i + 1) % n], s), a = p[2] - zs, b = q[2] - zs;
      if ((a < 0 && b >= 0) || (a >= 0 && b < 0)) {
        const t = a / (a - b);
        out.push({ i, p: add(p, scale(sub(q, p), t)), q: b > a ? 1 : -1, edge: RIBBON_EDGES[Math.floor(i / 20)] });
      }
    }
    return out;
  }

  /* ---------- state ---------- */
  const S = { lens: 'indra', drive: 'focus', focus: 1, eps: EPS0, m: 2, zeta: 0, zNow: 0, tau: 0, from: null, blend: 1 };
  const driveFocus = (t) => Math.min(12, Math.floor(13 * t + 1e-9));
  const driveNow = (t) => -Z_SPAN + 2 * Z_SPAN * t;
  const driveDepth = (t) => Math.round(M_MAX * t);
  function targets() {
    return {
      focus: S.drive === 'focus' ? driveFocus(S.tau) : S.focus,
      zNow: S.drive === 'now' || S.drive === 'free' ? driveNow(S.tau) : S.zNow,
      m: S.drive === 'depth' ? driveDepth(S.tau) : S.m,
      zeta: S.drive === 'zoom' ? S.tau : S.zeta,
      eps: S.eps
    };
  }
  function eff() {
    const t = targets();
    if (!S.from || S.blend >= 1) return t;
    const b = S.blend, f = S.from;
    return { focus: t.focus, zNow: lerp(f.zNow, t.zNow, b), m: t.m, zeta: lerp(f.zeta, t.zeta, b), eps: lerp(f.eps, t.eps, b) };
  }

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), s = 1 - 0.8 * e.zeta, R = reflections(e.eps, e.focus), psi = R.fields[e.m];
    const pos = POS.map((p) => scale(p, s)), rj = RJ * s;
    const ratio = e.m >= 1 && R.errs[e.m - 1] > 0 ? R.errs[e.m] / R.errs[e.m - 1] : null;
    return { e, s, pos, rj, R, psi, err: R.errs[e.m], ratio, focus: e.focus, eps: e.eps, m: e.m, zeta: e.zeta, zNow: e.zNow * s, lens: S.lens, logScale: LOG_OBS * e.zeta };
  }
  /** The chief's mirror for the view direction D: one image per other jewel, with its clarity cos²θ. */
  function mirror(M, D) {
    const c0 = M.pos[M.focus];
    return POS.map((_, y) => y).filter((y) => y !== M.focus).map((y) => {
      const d = unit(sub(M.pos[y], c0)), h = add(D, d), hn = norm(h);
      const mhat = hn > 1e-9 ? scale(h, 1 / hn) : null, clarity = (1 + dot(D, d)) / 2;
      return { y, d, mhat, clarity, cosTheta: mhat ? dot(mhat, D) : 0 };
    });
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${M.focus}|${M.eps}|${M.m}`;
    if (instCache.has(key)) return instCache.get(key);
    const W = word(M.R, M.focus, M.m, M.psi);
    let offMax = -Infinity, diagMin = Infinity;
    GRAM.forEach((r, a) => r.forEach((x, b) => { if (a === b) diagMin = Math.min(diagMin, x); else offMax = Math.max(offMax, x); }));
    const classes = new Set(PSI.map((_, a) => GRAM[a].map((x, b) => (Math.abs(x - 1) < 1e-12 ? b : -1)).filter((b) => b >= 0).join())).size;
    const gram = { diagMin, offMax, classes, imageOverlap: dot4(PSI[M.focus], PSI[M.focus]), norms: PSI.map((p) => dot4(p, p)) };
    const swap = chiefSwap(M.focus);
    const table = pageTable(M.focus, M.m);
    const dottie = { theta: THETA_STAR, residual: Math.abs(Math.cos(THETA_STAR) - THETA_STAR), signChanges: SIGN_CHANGES, sinTheta: Math.sin(THETA_STAR), sqrt: Math.sqrt(1 - THETA_STAR * THETA_STAR), sin1: Math.sin(1),
      errs: M.R.errs, boundOk: M.R.errs.every((x, m) => x <= Math.pow(Math.sin(1), m) * M.R.errs[0] + 1e-12), limitGap: Math.max(...M.R.limit.map((x) => Math.abs(x - THETA_STAR))) };
    const limits = POS.map((_, x) => reflections(M.eps, x).limit);
    const objective = { contexts: limits.length, factor: THETA_STAR, gap: Math.max(...limits.map((l) => Math.max(...l.map((x) => Math.abs(x - THETA_STAR))))) };
    const out = { word: W, gram, swap, table, faces: FACE_TOPO, dottie, objective };
    instCache.set(key, out);
    if (instCache.size > 60) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 10, y: top, w: Math.max(40, W - 20), h: Math.max(60, bottom - top) };
  }
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; s = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
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
  /** The scene lies in a ball of radius RH + a margin, whatever the camera: fit that square into the HUD-free rect. */
  const BOX = { x0: -(RH + 0.04), x1: RH + 0.04, y0: -(RH + 0.04), y1: RH + 0.04 };
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 4 : 8, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  let FRAME = null, FIT = null, TAGS = [], AX = null, dragging = null, FRONTS = [], MIRROR = [], KNOTS = [];
  /** A label for world point p; with `from` and `clear` it is pushed out from the centre `from`, clear of a ball of radius `clear`. */
  const at = (p, html, cls, pri, dir, extra) => { if (!TRV.thumbMode) TAGS.push(Object.assign({ p, html, cls, pri, dir }, extra)); };
  const sphere = (c, r) => (u, v) => { const th = PI * v, ph = TAU * u, s = Math.sin(th); return [c[0] + r * s * Math.cos(ph), c[1] + r * s * Math.sin(ph), c[2] + r * Math.cos(th)]; };
  const ringPoint = (M) => add(M.pos[M.focus], scale(add(scale(AX.R, Math.SQRT1_2), scale(AX.U, Math.SQRT1_2)), M.rj * 1.28));

  /** The thirteen jewels: lit spheres; in the Indra lens their colour is Ψ⁽ᵐ⁾, in the Wheeler lens they are silver. */
  function drawJewels(M) {
    M.pos.forEach((c, x) => {
      const style = M.lens === 'indra' ? { colors: [P.violet, P.cyan], value: () => M.psi[x], range: [0, 1] } : { color: P.sigma };
      sc.surface(`jewel-${x}`, sphere(c, M.rj), Object.assign({ u: [0, 1], v: [0, 1], nu: 26, nv: 14, pick: false, grid: { every: [13, 7], color: P.ink, alpha: 0.1 } }, style));
    });
    for (const [i, j] of [...EDGES, ...SPOKES]) sc.line([M.pos[i], M.pos[j]], { color: P.ink, width: 1, alpha: j && i ? 0.3 : 0.18 });
    FRONTS = M.pos.map((c) => add(c, scale(AX.D, M.rj)));
  }
  /** The chief: the amber ring and, in the Indra lens, the images of the other twelve on its mirror. */
  function drawChief(M) {
    const c0 = M.pos[M.focus];
    sc.circle(c0, AX.D, M.rj * 1.28, { color: P.amber, width: 2.6, fade: false });
    if (M.lens === 'indra' && M.zeta <= 0.3) at(add(c0, scale(AX.U, -M.rj * 1.3)), `x₀ = ${M.focus}${M.focus === 0 ? L(' · 中心', ' · centre') : ''}`, 'raw c-ik backed', 9, [0, 1]);
    MIRROR = mirror(M, AX.D);
    if (M.lens !== 'indra' || M.zeta > 0.3) return;
    let best = null, worst = null;
    for (const im of MIRROR) {
      if (!im.mhat) continue;
      const m = im.mhat, t1 = unit(cross(m, Math.abs(m[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), t2 = cross(m, t1), cen = add(c0, scale(m, M.rj * 1.006)), rr = IMG_R * M.s;
      const pts = range(0, TAU, 16).slice(0, 16).map((a) => add(cen, add(scale(t1, rr * Math.cos(a)), scale(t2, rr * Math.sin(a)))));
      sc.fan(pts, { fill: im.clarity >= 0.5 ? P.cyan : P.violet, alpha: 1, color: P.ink, width: 0.8 });
      im.point = cen;
      if (!best || im.clarity > best.clarity) best = im;
      if (!worst || im.clarity < worst.clarity) worst = im;
    }
    const tone = (im) => (im.clarity >= 0.5 ? 'c-cy' : 'c-vi');   // the same rule as the colour of its disc
    if (best) at(best.point, `cos²θ = ${fix(best.clarity, 2)}`, `raw ${tone(best)} backed`, 7, null, { from: c0, clear: M.rj });
    if (worst && worst.point && worst !== best) at(worst.point, `cos²θ = ${fix(worst.clarity, 2)}`, `raw ${tone(worst)} backed`, 6, null, { from: c0, clear: M.rj });
  }
  /** The ribbon: faint in the Indra lens; in the Wheeler lens magenta above the slice, cyan below, with its knots. */
  function drawRibbon(M) {
    const path = RIBBON_PATH.map((p) => scale(p, M.s));
    KNOTS = knots(M.zNow, M.s);
    if (M.lens === 'indra') { sc.line(path, { color: P.ink, width: 1.2, alpha: 0.4, close: true }); return; }
    const n = path.length, runs = [];
    if (!KNOTS.length) runs.push({ pts: [...path, path[0]], up: path[0][2] >= M.zNow });
    else KNOTS.forEach((k, a) => {
      const next = KNOTS[(a + 1) % KNOTS.length], pts = [k.p];
      for (let i = k.i + 1; ; i++) { const j = i % n; pts.push(path[j]); if (j === next.i) break; }
      pts.push(next.p);
      runs.push({ pts, up: k.q > 0 });
    });
    runs.forEach((r, k) => sc.tube(`ribbon-${k}`, r.pts, { color: r.up ? P.magenta : P.cyan, width: 5, glow: 0.35, pick: false, occlude: false }));
    // the region the ribbon bounds: ten faces, faint
    sc.poly('region', { vertices: POS.map((p) => scale(p, M.s * 0.995)), faces: FACE_TOPO.X.map((a) => FACES[a]) }, { color: P.violet, alpha: 0.16, edges: false, pick: false });
  }
  /** The slice of now: a translucent disc with the cuts through the jewels and the knots of the ribbon. */
  function drawSlice(M) {
    const z = M.zNow, R = SLICE_R * Math.max(M.s, 0.25), wheeler = M.lens === 'wheeler';
    if (Math.abs(z) > R) return;
    sc.surface('now', (u, v) => [u * Math.cos(v), u * Math.sin(v), z], { u: [0, R], v: [0, TAU], nu: 4, nv: 72, color: P.dim, alpha: wheeler ? 0.3 : 0.1, pick: false, grid: wheeler ? { every: [1, 6], color: P.ink, alpha: 0.14 } : false });
    sc.line(range(0, TAU, 72).map((a) => [R * Math.cos(a), R * Math.sin(a), z]), { color: P.ink, width: 1.2, alpha: wheeler ? 0.6 : 0.25 });
    if (!wheeler) return;
    M.pos.forEach((c) => {
      const dz = c[2] - z;
      if (Math.abs(dz) >= M.rj) return;
      const r = Math.sqrt(M.rj * M.rj - dz * dz);
      sc.line(range(0, TAU, 32).map((a) => [c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), z]), { color: P.ink, width: 1.2, alpha: 0.7 });
    });
    KNOTS.forEach((k, a) => {
      sc.ring(k.p, { key: `knot-${a}`, normal: [0, 0, 1], r: 7, color: P.ink });
      at(k.p, `q = ${k.q > 0 ? '+1' : '−1'}`, `raw ${k.q > 0 ? 'c-mg' : 'c-cy'} backed`, 8, null);
    });
    at([R * 0.72, -R * 0.72, z], `Σ<sub>now</sub> · ${KNOTS.length} ${L('个结', 'knots')} · Σq = ${KNOTS.reduce((s, k) => s + k.q, 0)}`, 'raw c-ik backed', 9, null);
  }
  /** The horizon: the outer jewel the net shrinks into. */
  function drawHorizon(M) {
    if (M.zeta < 0.02) return;
    const D = AX.D, e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), e2 = cross(D, e1);
    sc.surface('horizon-back', (u, v) => {   // the far half about the view direction, opaque: the outer jewel
      const th = u * PI / 2, s = Math.sin(th);
      return scale(add(scale(D, -Math.cos(th)), add(scale(e1, s * Math.cos(v)), scale(e2, s * Math.sin(v)))), RH * 0.985);
    }, { u: [0, 1], v: [0, TAU], nu: 18, nv: 64, colors: [P.faint, P.sigma], value: () => M.zeta, range: [0, 1], pick: false, occlude: false, grid: { every: [3, 8], color: P.ink, alpha: 0.12 } });
    sc.glass('horizon', [0, 0, 0], RH, { color: P.sigma, alpha: 0.05 + 0.1 * M.zeta, rim: 0.3 + 0.5 * M.zeta });
    const top = scale(add(scale(AX.U, 0.8), scale(AX.R, 0.6)), RH);
    at(top, M.zeta > 0.995 ? `R<sub>obs</sub>/ℓ<sub>P</sub> = 2.72 × 10<sup>61</sup> · <span class="hs">⋆</span>: Λ³ ≅ Λ⁰` : `R/ℓ<sub>P</sub> = 10<sup>${fix(M.logScale, 2)}</sup>`, 'raw c-sg backed', 9, null);
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 8, y: 8, w: W - 16, h: H - 16 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: BOX };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawJewels(M);
    drawChief(M);
    drawRibbon(M);
    drawSlice(M);
    drawHorizon(M);
    sc.end();
    const hq = !thumb && !TRV.still ? sc.p(ringPoint(M)) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p);
        let dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1], r = 10;
        if (t.from) {
          const c = sc.p(t.from), dx = q[0] - c[0], dy = q[1] - c[1], d = Math.hypot(dx, dy);
          dir = d > 1 ? [dx, dy] : [0, -1];
          r = Math.max(10, t.clear * sc.unit - d + 8);
        }
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, box: FIT.box, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- picking a jewel: a click on the stage, or the handle dragged onto it ---------- */
  const handle = $('indraHandle');
  function placeHandle(q) {
    handle.hidden = !q;
    if (!q) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = L('拖到另一颗宝珠上换主珠', 'Drag onto another jewel to change the chief');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The jewel under a pointer: the nearest visible front point within reach (a jewel hidden behind another is not). */
  const jewelAt = (ev, px) => sc.nearest(ev, FRONTS, px == null ? Math.max(14, sc.unit * RJ * 1.1) : px);
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
    const k = jewelAt(ev);
    if (k >= 0 && k !== S.focus) setFocus(k);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    setFocus((S.focus + sgn + N) % N);
  });
  let press = null;
  stageEl.addEventListener('pointerdown', (ev) => { press = ev.target.closest('button, a, input, .chip') || TRV.still ? null : { x: ev.clientX, y: ev.clientY, id: ev.pointerId }; });
  stageEl.addEventListener('pointerup', (ev) => {
    if (!press || ev.pointerId !== press.id) return;
    const moved = Math.hypot(ev.clientX - press.x, ev.clientY - press.y);
    press = null;
    if (moved > 5) return;
    const k = jewelAt(ev);
    if (k >= 0) { leave(); setFocus(k); }
  });

  /* ---------- HUD, legend, readouts ---------- */
  function legendItems() {
    if (S.lens === 'wheeler') return [['mg', L('丝带 · 切面之上', 'ribbon · above the slice')], ['cy', L('丝带 · 切面之下', 'ribbon · below the slice')], ['sg', L('宝珠', 'jewels')], ['vi', L('丝带围出的 10 个面', 'the ten faces it bounds')]];
    return [['cy', L('Ψ → 1 · 近轴清晰', 'Ψ → 1 · clear near the axis')], ['vi', L('Ψ → 0 · 边缘压扁', 'Ψ → 0 · squashed at the limb')]];
  }
  function hudText(M, I) {
    let big, sub;
    if (M.zeta > 0.02) {
      big = `ζ = ${fix(M.zeta, 2)} · R/ℓ<sub>P</sub> = 10<sup>${fix(M.logScale, 2)}</sup>`;
      sub = `${L('宝网缩进外面的一颗宝珠', 'the net shrinks into one outer jewel')} · x₀ = ${M.focus}`;
    } else if (M.lens === 'wheeler') {
      const qsum = KNOTS.reduce((s, k) => s + k.q, 0);
      big = `Σ<sub>now</sub> · z = ${fix(M.zNow, 2)} · ${KNOTS.length} ${L('个结', 'knots')} · Σq = ${qsum}`;
      sub = `∂X = ${L('丝带', 'ribbon')} · |X| = ${I.faces.Xsize} ${L('面', 'faces')} · V − E + F = ${I.faces.V - I.faces.E + I.faces.F}`;
    } else {
      big = `x₀ = ${M.focus} · m = ${M.m} · max|Ψ<sup>(m)</sup> − θ*| = ${fix(M.err, 4)}`;
      sub = `ε = ${fix(M.eps, 2)} · H<sub>x</sub> ≅ H<sub>y</sub> ≅ H<sub>field</sub> · ${L('宝网位移', 'net moved')} 0`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const sci = (x) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); return e >= -3 ? fix(x, 4) : `${fix(x / Math.pow(10, e), 2)} × 10<sup>−${-e}</sup>`; };
  function drawText(M, I) {
    if (M.lens === 'wheeler') {
      $('roKeyZh').innerHTML = '切面上的结 · Σq'; $('roKeyEn').innerHTML = 'Knots on the slice · Σq';
      $('roKey').textContent = String(KNOTS.length); $('roKeySub').innerHTML = ` · Σq = ${KNOTS.reduce((s, k) => s + k.q, 0)}`;
    } else {
      $('roKeyZh').innerHTML = '反射 m 次后 max|Ψ<sup>(m)</sup> − θ*|'; $('roKeyEn').innerHTML = 'After m reflections, max|Ψ<sup>(m)</sup> − θ*|';
      $('roKey').innerHTML = sci(M.err); $('roKeySub').innerHTML = ` · m = ${M.m}`;
    }
    const sw = I.swap;
    $('roFocus').innerHTML = `${M.focus} · 0 · ${sw.exists ? sci(Math.max(sw.unitary, sw.fit)) : L('不存在', 'none')}`;
    const cl = MIRROR.map((im) => im.clarity);
    $('roClarity').innerHTML = cl.length ? `${fix(Math.max(...cl), 4)} · ${fix(Math.min(...cl), 4)}` : '—';
    $('roRate').innerHTML = `${M.ratio == null ? '—' : fix(M.ratio, 4)} · sin θ* = ${fix(I.dottie.sinTheta, 6)}`;
    $('roWord').innerHTML = `${I.word.dim} · ${I.word.residualDim}`;
    $('roRibbon').innerHTML = `${KNOTS.length} · ${KNOTS.reduce((s, k) => s + k.q, 0)} · |X| = ${I.faces.Xsize}`;
    $('roCosmos').innerHTML = `${fix(M.zeta, 2)} · 10<sup>${fix(M.logScale, 2)}</sup>`;
    $('roNote').innerHTML = noteFor(M, I);
    $('scenePill').innerHTML = `INDRA <strong>${M.lens === 'wheeler' ? L('丝带', 'RIBBON') : L('宝网', 'NET')}</strong>`;
    $('keyPill').innerHTML = `x₀ <strong>${M.focus}</strong>`;
    $('hint').innerHTML = L('点宝珠或拖琥珀手柄换主珠 · 拖空白处转视角', 'click a jewel or drag the amber handle to change the chief · drag empty space to orbit');
    $('formula').innerHTML = 'Ψ<sup>(m)</sup> = cos(K<sub>ε</sub>Ψ<sup>(m−1)</sup>) → θ* = cos θ* · cos²θ = (1 + D·d̂)/2 · Σq = 0';
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'wheeler'));
  }
  function noteFor(M, I) {
    if (M.lens === 'wheeler') return L(`惠勒丝带：切面 z = ${fix(M.zNow, 2)} 上 ${KNOTS.length} 个结，Σq = ${KNOTS.reduce((s, k) => s + k.q, 0)}；这条闭圈是 ${I.faces.Xsize} 个面的边界（GF(2) 上 ∂ 的秩 ${I.faces.rank}，核 ${I.faces.kernel} 维）。`,
      `The Wheeler ribbon: ${KNOTS.length} knots on the slice z = ${fix(M.zNow, 2)}, Σq = ${KNOTS.reduce((s, k) => s + k.q, 0)}; this closed cycle bounds ${I.faces.Xsize} faces (over GF(2) the boundary map has rank ${I.faces.rank} and a kernel of dimension ${I.faces.kernel}).`);
    return L(`主珠 x₀ = ${M.focus}：线性读字 (K<sub>ε</sub><sup>j</sup>Ψ)(x₀)，j ≤ ${M.m}，可见 ${I.word.dim} 维、残差 ${I.word.residualDim} 维；非线性反射 Ψ<sup>(m)</sup> = cos(K<sub>ε</sub>Ψ<sup>(m−1)</sup>) 在 13 种主珠下的极限都是 θ* = ${fix(THETA_STAR, 10)}（偏差 ${sci(I.objective.gap)}）。`,
      `Chief x₀ = ${M.focus}: the linear word (K<sub>ε</sub><sup>j</sup>Ψ)(x₀), j ≤ ${M.m}, sees ${I.word.dim} dimensions, the residual has ${I.word.residualDim}; the nonlinear reflection Ψ<sup>(m)</sup> = cos(K<sub>ε</sub>Ψ<sup>(m−1)</sup>) reaches θ* = ${fix(THETA_STAR, 10)} for all thirteen chiefs (off by ${sci(I.objective.gap)}).`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M, I) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    const kind = S.drive === 'now' || (S.drive === 'free' && M.lens === 'wheeler') ? 'knots' : S.drive === 'orbit' ? 'mirror' : S.drive === 'zoom' ? 'zoom' : S.drive === 'focus' ? 'gram' : 'errors';
    if (kind === 'knots') {
      $('plotTitle').innerHTML = L('切面的高度与结的个数', 'Height of the slice and number of knots');
      const g = kit.plot(cv, { x: [-Z_SPAN, Z_SPAN], y: [0, 7], pad });
      g.axes({ xTicks: [-1, -0.5, 0, 0.5, 1], yTicks: [0, 2, 4, 6], xLabel: 'z' });
      g.line(range(-Z_SPAN, Z_SPAN, 500).map((z) => [z, knots(z * M.s, M.s).length]), P.magenta, { width: 2 });
      g.vline(M.zNow / M.s, P.ink, { alpha: 0.6 }); g.dot(M.zNow / M.s, KNOTS.length, P.ink, 4.2);
      $('plotMeta').innerHTML = `${L('结', 'knots')} ${KNOTS.length} · Σq = ${KNOTS.reduce((s, k) => s + k.q, 0)}`;
    } else if (kind === 'mirror') {
      $('plotTitle').innerHTML = L('像离镜面中心越远，越被压扁：cos²θ', 'The farther an image from the centre of the mirror, the more squashed: cos²θ');
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 30, 60, 90], yTicks: [0, 0.5, 1], xLabel: 'θ (°)' });
      g.line(range(0, 90, 180).map((t) => [t, Math.cos(t * PI / 180) ** 2]), P.dim, { width: 1.4, dash: [4, 4] });
      MIRROR.forEach((im) => { const th = Math.acos(clamp(im.cosTheta, -1, 1)) * 180 / PI; g.dot(th, im.clarity, im.clarity >= 0.5 ? P.cyan : P.violet, 3.2); });
      $('plotMeta').innerHTML = `${L('12 个像', '12 images')} · max ${fix(Math.max(...MIRROR.map((m) => m.clarity)), 3)} · min ${fix(Math.min(...MIRROR.map((m) => m.clarity)), 3)}`;
    } else if (kind === 'zoom') {
      $('plotTitle').innerHTML = L('标尺：从普朗克长度到可观测宇宙', 'The scale: from the Planck length to the observable universe');
      const g = kit.plot(cv, { x: [0, 1], y: [0, 65], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 20, 40, 61.43], xLabel: 'ζ' });
      g.line([[0, 0], [1, LOG_OBS]], P.sigma, { width: 2 });
      g.vline(M.zeta, P.ink, { alpha: 0.6 }); g.dot(M.zeta, M.logScale, P.ink, 4.2);
      $('plotMeta').innerHTML = `log₁₀(R/ℓ<sub>P</sub>) = ${fix(M.logScale, 2)} · ${L('终点', 'end')} ${fix(LOG_OBS, 2)}`;
    } else if (kind === 'gram') {
      $('plotTitle').innerHTML = L('主珠的格拉姆行：只有它自己重叠为 1', 'The Gram row of the chief: overlap 1 only with itself');
      const g = kit.plot(cv, { x: [-0.5, 12.5], y: [-0.6, 1.1], pad });
      g.axes({ xTicks: [0, 2, 4, 6, 8, 10, 12], yTicks: [-0.5, 0, 0.5, 1], xLabel: L('宝珠 y', 'jewel y') });
      GRAM[M.focus].forEach((x, y) => g.dot(y, x, y === M.focus ? P.ink : P.cyan, y === M.focus ? 4.2 : 3));
      g.hline(1, P.ink, { alpha: 0.4, dash: [4, 4] });
      $('plotMeta').innerHTML = `⟨ψ<sub>x₀</sub>, ψ<sub>x₀</sub>⟩ = 1 · max<sub>y≠x₀</sub> = ${fix(Math.max(...GRAM[M.focus].filter((_, y) => y !== M.focus)), 4)}`;
    } else {
      $('plotTitle').innerHTML = L('反射再反射：误差按 sin θ* 一步步缩小', 'Reflections of reflections: the error shrinks by sin θ* per step');
      const g = kit.plot(cv, { x: [0, M_MAX], y: [1e-6, 2], pad, logY: true });
      g.axes({ xTicks: [0, 6, 12, 18, 24], yTicks: [1e-5, 1e-3, 1e-1, 1], xLabel: 'm' });
      g.line(range(0, M_MAX, M_MAX).map((m) => [m, Math.pow(Math.sin(1), m) * M.R.errs[0]]), P.dim, { width: 1.2, dash: [4, 4] });
      g.line(M.R.errs.map((x, m) => [m, Math.max(x, 1e-6)]), P.violet, { width: 2 });
      g.dot(M.m, Math.max(M.err, 1e-6), P.ink, 4.2);
      $('plotMeta').innerHTML = `e<sub>${M.m}</sub> = ${sci(M.err)} · ${L('虚线', 'dashed')} (sin 1)<sup>m</sup>e₀`;
    }
  }

  const paint = kit.painter(() => {
    const M = model(), I = instances(M);
    AX = camAxes(sc.cam); KNOTS = knots(M.zNow, M.s); MIRROR = mirror(M, AX.D);
    hudText(M, I); TRV.hudFit();
    drawStage(M); drawText(M, I); drawPlot(M, I);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  const railLabel = (t) => (S.drive === 'focus' ? `τ ${fix(t, 2)} · x₀ = ${driveFocus(t)}` : S.drive === 'orbit' ? `τ ${fix(t, 2)} · ${Math.round(360 * t)}°`
    : S.drive === 'depth' ? `τ ${fix(t, 2)} · m = ${driveDepth(t)}` : S.drive === 'zoom' ? `τ ${fix(t, 2)} · ζ = ${fix(t, 2)}` : `τ ${fix(t, 2)} · z<sub>now</sub> = ${fix(driveNow(t), 2)}`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.1, step: 0.05, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t, C) => {
      S.tau = t;
      if (S.drive === 'orbit') { sc.cam.yaw = VIEW0[0] + TAU * t; sc.cam.pitch = VIEW0[1]; }
      syncFields(); playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
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
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the current values become the state, the clock pauses and from now on is the time of the slice. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    S.focus = e.focus; S.zNow = e.zNow; S.m = e.m; S.zeta = e.zeta; S.eps = e.eps; S.from = null; S.blend = 1; S.drive = 'free';
    cards.mark(null); clock.pause(); clock.set(clamp((S.zNow + Z_SPAN) / (2 * Z_SPAN), 0, 1), true); S.tau = clock.t;
  }
  const fFocus = kit.field($('focusJewel'), { fmt: (v) => String(Math.round(clamp(v, 0, 12))), onInput: (v) => { leave(); S.focus = clamp(Math.round(v), 0, 12); paint(); } });
  const fEps = kit.field($('mirrorCurvature'), { fmt: (v) => fix(clamp(v, 0, 1), 2), onInput: (v) => { leave(); S.eps = Math.round(clamp(v, 0, 1) * 100) / 100; paint(); } });
  const fDepth = kit.field($('reflectionDepth'), { fmt: (v) => String(Math.round(clamp(v, 0, M_MAX))), onInput: (v) => { leave(); S.m = clamp(Math.round(v), 0, M_MAX); paint(); } });
  const fZoom = kit.field($('cosmicZoom'), { fmt: (v) => fix(clamp(v, 0, 1), 2), onInput: (v) => { leave(); S.zeta = clamp(v, 0, 1); paint(); } });
  function syncFields() { const e = eff(); fFocus.set(e.focus); fEps.set(Math.round(e.eps * 100) / 100); fDepth.set(e.m); fZoom.set(Math.round(e.zeta * 100) / 100); }
  function setFocus(k) { S.focus = clamp(Math.round(k), 0, 12); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { leave(); S.lens = S.lens === 'indra' ? 'wheeler' : 'indra'; paint(); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'yoneda-isomorphic-jewel-net': { lens: 'indra', drive: 'focus', focus: 1, eps: EPS0, m: 2, zeta: 0, zNow: 0, play: true, still: 0.35 },
    'wheeler-single-ribbon-knots': { lens: 'wheeler', drive: 'now', focus: 1, eps: EPS0, m: 2, zeta: 0, zNow: 0, play: true, still: 0.5 },
    'spherical-mirror-limb-foreshortening': { lens: 'indra', drive: 'orbit', focus: 0, eps: EPS0, m: 2, zeta: 0, zNow: 0, play: true, still: 0 },
    'dottie-infinite-reflection-convergence': { lens: 'indra', drive: 'depth', focus: 0, eps: EPS0, m: 2, zeta: 0, zNow: 0, play: true, still: 'end' },
    'observable-cosmos-single-jewel': { lens: 'indra', drive: 'zoom', focus: 1, eps: EPS0, m: 2, zeta: 0, zNow: 0, play: true, still: 'end' }
  };
  const NOTES = {
    'yoneda-isomorphic-jewel-net': ['13 颗同样的宝珠：时间轴让主珠 x₀ 依次换成 0、1 … 12 号，琥珀圈跟着走，宝网一颗也不动。主珠的镜面上，青色圆片是近轴清晰的像，紫色是被压扁的像；宝珠的颜色是从“只点亮主珠”出发反射 2 次后的场 Ψ<sup>(2)</sup>。τ = 0.35 时主珠是正对你的 4 号。',
      'Thirteen identical jewels: the rail makes jewels 0, 1 … 12 the chief x₀ in turn, the amber ring follows, and not one jewel of the net moves. On the mirror of the chief the cyan discs are clear images near the axis and the violet ones squashed images; the colour of the jewels is the field Ψ<sup>(2)</sup> after two reflections from the start that lights only the chief. At τ = 0.35 the chief is jewel 4, facing you.'],
    'wheeler-single-ribbon-knots': ['惠勒丝带：一根闭合丝带走遍 12 颗外层宝珠，竖直方向读作时间。时间轴把此刻的切面 Σ<sub>now</sub> 从下往上推：结成对地出生、成对地湮灭（0 → 2 → 6 → 2 → 0）。τ = 0.5 时切面过中心，6 个结正负相间，Σq = 0；品红在切面之上，青色在之下，淡紫的 10 个面以这条丝带为边界。',
      'The Wheeler ribbon: one closed ribbon visits the twelve outer jewels, with the vertical read as time. The rail pushes the slice of now, Σ<sub>now</sub>, upwards: knots are born in pairs and annihilate in pairs (0 → 2 → 6 → 2 → 0). At τ = 0.5 the slice passes through the centre and the six knots alternate in sign, Σq = 0; magenta lies above the slice, cyan below, and the ten faint violet faces have this ribbon as their boundary.'],
    'spherical-mirror-limb-foreshortening': ['球镜：中心宝珠当主珠，它的镜面映出外层 12 颗。像点在法向平分视线与珠间方向的地方，清晰度 cos²θ = (1 + D·d̂)/2：朝向你的像是青色、清晰（cos²θ → 1），贴着边缘的像是紫色、被压扁（cos²θ → 0）。时间轴把视角绕竖轴转一圈，像在镜面上滑动，宝网不动。',
      'The spherical mirror: the central jewel is the chief, and its mirror shows the twelve outer ones. An image sits where the normal bisects the line of sight and the direction between the jewels, with clarity cos²θ = (1 + D·d̂)/2: images facing you are cyan and clear (cos²θ → 1), images against the limb are violet and squashed (cos²θ → 0). The rail turns the view once about the vertical; the images slide across the mirror while the net stays.'],
    'dottie-infinite-reflection-convergence': ['反射再反射：只点亮中心宝珠，Ψ<sup>(0)</sup> = δ<sub>0</sub>，每次反射 Ψ<sup>(m)</sup> = cos(K<sub>ε</sub>Ψ<sup>(m−1)</sup>)。时间轴把反射次数 m 从 0 加到 24：颜色忽明忽暗地收拢，最后 13 颗宝珠都是同一个 θ* = 0.739085，误差 e₂₄ = 2.80 × 10⁻⁵，相邻两步的比趋于 sin θ* = 0.673612。',
      'Reflections of reflections: light only the central jewel, Ψ<sup>(0)</sup> = δ<sub>0</sub>, and reflect, Ψ<sup>(m)</sup> = cos(K<sub>ε</sub>Ψ<sup>(m−1)</sup>). The rail raises the depth m from 0 to 24: the colours close in, flickering between brighter and darker, until all thirteen jewels carry the same θ* = 0.739085, with error e₂₄ = 2.80 × 10⁻⁵ and the ratio of successive steps tending to sin θ* = 0.673612.'],
    'observable-cosmos-single-jewel': ['宇宙缩放：时间轴把 ζ 从 0 推到 1，标尺从普朗克长度拉到可观测宇宙的半径，R<sub>obs</sub>/ℓ<sub>P</sub> = 2.72 × 10⁶¹。整张宝网缩成中间的一小簇，外面的视界本身成了一颗银白的宝珠：读作 ⋆: Λ³ ≅ Λ⁰。',
      'The cosmic zoom: the rail pushes ζ from 0 to 1 and the scale runs from the Planck length to the radius of the observable universe, R<sub>obs</sub>/ℓ<sub>P</sub> = 2.72 × 10⁶¹. The whole net shrinks to a small cluster in the middle, and the horizon outside becomes one silver jewel itself: read as ⋆: Λ³ ≅ Λ⁰.']
  };
  const FIGURE_NOTES = {
    'yoneda-isomorphic-jewel-net': ['琥珀圈换到 4 号宝珠：主珠换了，宝网一颗也没动。', 'The amber ring has moved to jewel 4: the chief changed, and not one jewel of the net moved.'],
    'wheeler-single-ribbon-knots': ['一根闭合丝带穿过此刻的切面：6 个结正负相间，Σq = 0。', 'One closed ribbon pierces the slice of now: six knots of alternating sign, Σq = 0.'],
    'spherical-mirror-limb-foreshortening': ['中心宝珠的镜面：青色的像近轴清晰，紫色的像贴边被压扁。', 'The mirror of the central jewel: cyan images clear near the axis, violet images squashed at the limb.'],
    'dottie-infinite-reflection-convergence': ['反射 24 次：13 颗宝珠都收敛到 θ* = 0.739085。', 'After 24 reflections all thirteen jewels have converged to θ* = 0.739085.'],
    'observable-cosmos-single-jewel': ['ζ = 1：可观测宇宙收成外面的一颗银白宝珠。', 'At ζ = 1 the observable universe closes into one outer silver jewel.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.lens = p.lens; S.drive = p.drive; S.focus = p.focus; S.eps = p.eps; S.m = p.m; S.zeta = p.zeta; S.zNow = p.zNow; S.from = null; S.blend = 1;
    sc.view([VIEW0[0], VIEW0[1], 1], booting || TRV.still || p.drive === 'orbit' ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换主珠、曲率、反射次数与缩放，换透镜，点宝珠或拖琥珀手柄。时间轴现在是切面 Σ<sub>now</sub> 的时刻。随时可以再选一张卡。', 'Free play: change the chief, the curvature, the reflection depth and the zoom, switch the lens, click a jewel or drag the amber handle. The rail is now the time of the slice Σ<sub>now</sub>. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.INDRA_NET_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M), D = camAxes(sc.cam).D;
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, drive: S.drive, blending: !!(S.from && S.blend < 1), tau: S.tau,
        focus: M.focus, eps: M.eps, m: M.m, zeta: M.zeta, zNow: M.zNow, scale: M.s, logScale: M.logScale,
        constants: { rj: RJ, rh: RH, mMax: M_MAX, zSpan: Z_SPAN, logObs: LOG_OBS, view0: VIEW0 },
        positions: M.pos, basePositions: POS, edges: EDGES, faces: FACES, ribbon: RIBBON, records: PSI,
        thetaStar: THETA_STAR, psi: Array.from(M.psi), errs: M.R.errs, err: M.err, ratio: M.ratio, limit: Array.from(M.R.limit),
        mirror: mirror(M, D).map((im) => ({ y: im.y, clarity: im.clarity, cosTheta: im.cosTheta })), view: D,
        knots: knots(M.zNow, M.s).map((k) => ({ p: k.p, q: k.q, edge: k.edge })),
        leanInstances: I, camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'wheeler' ? 'wheeler' : 'indra';
      if (o.focus != null) S.focus = clamp(Math.round(o.focus), 0, 12);
      if (o.eps != null) S.eps = clamp(o.eps, 0, 1);
      if (o.m != null) S.m = clamp(Math.round(o.m), 0, M_MAX);
      if (o.zeta != null) S.zeta = clamp(o.zeta, 0, 1);
      syncFields();
      if (o.t != null) { clock.set(clamp(o.t, 0, 1)); }
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of a jewel's front point and whether a solid hides it. */
    jewelPoint(k) { const b = stageEl.getBoundingClientRect(), p = FRONTS[k], q = sc.p(p); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], hidden: sc.occluded(p, 0.02) }; }
  });
  window.TRV_THUMB = () => { cards.pick('spherical-mirror-limb-foreshortening'); clock.pause(); clock.set(0); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('yoneda-isomorphic-jewel-net'));
  booting = false;
  paint();
})();
