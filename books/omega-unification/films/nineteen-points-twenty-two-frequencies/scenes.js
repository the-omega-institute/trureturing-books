/* Film · Nineteen Points, Twenty-Two Frequencies · 十九个点，二十二个频率
   (book omega-unification, chapter 1). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     hook     the nonnegative integer solutions of x² + y² + z² = 867 = 3·17²: exactly 19 (definition
              def-ou-ch01-behrend-shell; enumerated here, computed); picking this shell as the testbed is the
              chapter's modelling choice (argued, MODEL).
     orbits   σ(x, y, z) = (y, z, x) is the 3-fold rotation about the pole axis, so in the projection along the pole
              it is a turn by 120°; it fixes (17, 17, 17) and splits the other 18 points into six 3-point orbits in
              four layers (computed).
     edges    pairs with squared distance d² ≤ 804: 135 of the 171 pairs, 36 dropped, 529 triangles, degree sum
              270 = 2·135 with degrees 18, 18, 14, 16, 10 by layer (computed).
     arcs     the 23 squared lengths j and the arc angles cos θ_j = 1 − j/1734 (computed); each α_j = e^{iθ_j} lies in
              ℚ(√−D_j), D_j the square-free part of j(3468 − j) (computed); that angles from different fields carry no
              rational relation is the chapter's Galois-character argument (argued).
     relation 21 distinct fields; j = 12, 68, 136 share ℚ(√−2); the exact product
              (287 + 24√−2)(49 + 10√−2) = 289 (47 + 14√−2), i.e. α₁₂ α₆₈ = α₁₃₆, and the three points
              (11, 11, 25), (13, 13, 23), (17, 17, 17) in order on the great circle x₁ = x₂ (computed); that exactly
              22 independent frequencies remain is the chapter's argument (argued).
     lean     OmegaTernionHeap.triad_assoc and .kappa_heap_invariant (LEAN); IsotropicShellInversion
              .shell_density_unique and .shell_projection_mass (LEAN), illustrated with the example
              f(t) = e^(−t²), h(r) = 4r² e^(−r²), for which ∫h = 2∫f = √π (computed here).
     gram     the unit-edge Laplacian L = D − A of the 135 edges has real rank 18 (exact rank computed here); the
              minimal rational Gram dimension 21 and the 2-adic Hasse obstruction at p ∈ {2, 11, 17, 71} are copied
              from §1.4 (replay certificate and written argument, argued).

   On load, FILM.init re-derives every number on screen by a second route (brute-force enumeration, exact BigInt
   arithmetic, an exact rank by fraction-free elimination, numerical quadrature) and checks it against the values
   printed in the chapter; any disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                          the shell, computed                              */
/* ======================================================================= */
const NP_R = 867, NP_CUT = 804;
const NP_LEAN = {
  assoc: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.triad_assoc',
  kappa: 'D5/S3/Quantum/AURICOmega/OmegaTernionHeap.kappa_heap_invariant',
  unique: 'D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_density_unique',
  mass: 'D5/S3/Quantum/StaticExchange/IsotropicShellInversion.shell_projection_mass'
};
/* the points, sorted by layer (pole, inner, sub-inner, middle, outer), then by orbit, then along σ */
const NP_LAYERS = [
  { key: '17,17,17', en: 'pole', zh: '极点', pearl: 'g', col: 'now', reps: ['(17, 17, 17)'], n: '1' },
  { key: '13,13,23', en: 'inner', zh: '内层', pearl: 'c', col: 'cyan', reps: ['(13, 13, 23)'], n: '3' },
  { key: '11,11,25', en: 'sub-inner', zh: '次内层', pearl: 'w', col: 'white', reps: ['(11, 11, 25)'], n: '3' },
  { key: '7,17,23', en: 'middle', zh: '中层', pearl: 'b', col: 'blue', reps: ['(7, 17, 23)', '(7, 23, 17)'], n: '3 + 3' },
  { key: '1,5,29', en: 'outer', zh: '外层', pearl: 'm', col: 'mag', reps: ['(1, 5, 29)', '(1, 29, 5)'], n: '3 + 3' }
];
const npSigma = p => [p[1], p[2], p[0]];
const npKey = p => p.join(',');
const npD2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
function npBuild() {
  const raw = [];
  for (let x = 0; x * x <= NP_R; x++) for (let y = 0; x * x + y * y <= NP_R; y++) {
    const z2 = NP_R - x * x - y * y, z = Math.round(Math.sqrt(z2));
    if (z * z === z2) raw.push([x, y, z]);
  }
  const layerOf = p => NP_LAYERS.findIndex(L => L.key === p.slice().sort((a, b) => a - b).join(','));
  const used = new Set(), pts = [];
  /* orbit representatives in a fixed order: walk the sorted list, take each unused point's σ-orbit */
  const sorted = raw.slice().sort((a, b) => layerOf(a) - layerOf(b) || npKey(a).localeCompare(npKey(b)));
  let orbit = 0;
  for (const p of sorted) {
    if (used.has(npKey(p))) continue;
    let q = p, k = 0;
    do { used.add(npKey(q)); pts.push({ p: q, layer: layerOf(q), orbit, k: k++ }); q = npSigma(q); } while (npKey(q) !== npKey(p));
    orbit++;
  }
  const n = pts.length, pairs = [], edges = [], dropped = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    const d2 = npD2(pts[i].p, pts[j].p);
    pairs.push([i, j, d2]);
    (d2 <= NP_CUT ? edges : dropped).push([i, j, d2]);
  }
  const adj = pts.map(() => new Set());
  for (const [i, j] of edges) { adj[i].add(j); adj[j].add(i); }
  const tris = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (adj[i].has(j)) for (let k = j + 1; k < n; k++) if (adj[i].has(k) && adj[j].has(k)) tris.push([i, j, k]);
  const lengths = [...new Set(edges.map(e => e[2]))].sort((a, b) => a - b);
  return { raw, pts, pairs, edges, dropped, adj, tris, lengths, orbits: orbit };
}
const NP = npBuild();
const npSqfree = m => { for (let k = 2; k * k <= m; k++) while (m % (k * k) === 0) m /= k * k; return m; };
const npTheta = j => Math.acos(1 - j / 1734);
const npDeg = r => (r * 180) / Math.PI;
const NP_D = NP.lengths.map(j => npSqfree(j * (3468 - j)));

/* ---- projection along the pole: e1 = (1, −1, 0)/√2 to the right, e2 = (−1, −1, 2)/√6 up ---- */
const NP_E1 = [1 / Math.SQRT2, -1 / Math.SQRT2, 0], NP_E2 = [-1 / Math.sqrt(6), -1 / Math.sqrt(6), 2 / Math.sqrt(6)];
const npDot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const npUnit = p => { const r = Math.sqrt(npDot(p, p)); return [p[0] / r, p[1] / r, p[2] / r]; };
const NP_U = NP.pts.map(q => npUnit(q.p));
/* the direction of σ in the picture: the signed angle from a point to its σ-image (±120°) */
const NP_SIGMA_TURN = (() => {
  const u = NP_U[NP.pts.findIndex(q => q.layer === 4)], v = npUnit(npSigma(NP.pts.find(q => q.layer === 4).p));
  const a = Math.atan2(npDot(u, NP_E2), npDot(u, NP_E1)), b = Math.atan2(npDot(v, NP_E2), npDot(v, NP_E1));
  let d = b - a; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU;
  return d;
})();
function npProj(v, o) {
  const x = npDot(v, NP_E1), y = npDot(v, NP_E2), c = Math.cos(o.rot || 0), s = Math.sin(o.rot || 0);
  return [o.cx + o.R * (c * x - s * y), o.cy - o.R * (s * x + c * y)];
}
function npSlerp(a, b, t) {
  const w = Math.acos(clamp(npDot(a, b), -1, 1)), sw = Math.sin(w);
  if (sw < 1e-9) return a;
  const ka = Math.sin((1 - t) * w) / sw, kb = Math.sin(t * w) / sw;
  return [ka * a[0] + kb * b[0], ka * a[1] + kb * b[1], ka * a[2] + kb * b[2]];
}
function npArc(a, b, o, col, al, lw = 2, upto = 1) {
  if (al <= 0.003) return;
  const n = 18;
  curve(t => npProj(npSlerp(a, b, t * upto), o), n, col, al, lw);
}
/* the sphere: rim of the octant (three coordinate quarter-circles), edges, points */
function npSphere(o) {
  const a = o.a;
  if (a <= 0.003) return;
  const X = [1, 0, 0], Y = [0, 1, 0], Z = [0, 0, 1];
  ctx.save(); ctx.setLineDash([6, 8]);
  for (const [p, q] of [[X, Y], [Y, Z], [Z, X]]) npArc(p, q, o, C.dim, a * 0.5, 1.5);
  ctx.restore();
  if (o.edges) for (const e of o.edges) npArc(NP_U[e[0]], NP_U[e[1]], o, e[2], a * e[3], e[4] || 1.6, e[5] == null ? 1 : e[5]);
  const show = o.show || (() => 1);
  NP.pts.forEach((q, i) => {
    const s = show(i);
    if (s <= 0.003) return;
    const [x, y] = npProj(NP_U[i], o);
    const L = NP_LAYERS[q.layer];
    const pearl = o.mono ? 'c' : L.pearl;
    dot(x, y, (o.r || 13) * (0.6 + 0.4 * eo(s)), pearl, a * s);
    if (o.hi && o.hi.has(i)) ring(x, y, (o.r || 13) + 9, C.now, a * s, 3);
  });
}
const npPos = (i, o) => npProj(NP_U[i], o);

/* exact rank of an integer matrix by fraction-free (Bareiss) elimination in BigInt */
function npRank(M) {
  const A = M.map(r => r.map(v => BigInt(v))), n = A.length, m = A[0].length;
  let rank = 0, prev = 1n;
  for (let c = 0; c < m && rank < n; c++) {
    let piv = -1;
    for (let r = rank; r < n; r++) if (A[r][c] !== 0n) { piv = r; break; }
    if (piv < 0) continue;
    [A[rank], A[piv]] = [A[piv], A[rank]];
    for (let r = rank + 1; r < n; r++) {
      for (let k = c + 1; k < m; k++) A[r][k] = (A[rank][c] * A[r][k] - A[r][c] * A[rank][k]) / prev;
      A[r][c] = 0n;
    }
    prev = A[rank][c]; rank++;
  }
  return rank;
}
const NP_LAP = NP.pts.map((_, i) => NP.pts.map((__, j) => (i === j ? NP.adj[i].size : NP.adj[i].has(j) ? -1 : 0)));
/* the shell-inversion example: f(t) = e^(−t²), h(r) = −2r f′(r) = 4r² e^(−r²) */
const npF = t => Math.exp(-t * t), npH = r => 4 * r * r * Math.exp(-r * r);
function npSimpson(fn, a, b, n = 4000) {
  const h = (b - a) / n; let s = fn(a) + fn(b);
  for (let i = 1; i < n; i++) s += fn(a + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('nineteen-points film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  /* 0. the cited theorems at the pinned commit */
  check((DATA.lean || []).length === 4, 'film.json cites 4 declarations');
  for (const gid of Object.values(NP_LEAN)) {
    const r = leanCite(gid);
    if (!r) fail(`film.json does not cite ${gid}`); else check(r.kind === 'theorem', `${gid} is not a theorem`);
  }
  /* 1. the points, by a second route: brute force over the cube [0, 29]³ */
  let brute = 0;
  for (let x = 0; x <= 29; x++) for (let y = 0; y <= 29; y++) for (let z = 0; z <= 29; z++) if (x * x + y * y + z * z === 867) brute++;
  check(brute === 19 && NP.pts.length === 19 && 867 === 3 * 17 * 17, '19 points on 867 = 3·17²');
  check(NP.pts.every(q => q.layer >= 0), 'every point is in a listed layer');
  const fixed = NP.pts.filter(q => npKey(npSigma(q.p)) === npKey(q.p));
  check(fixed.length === 1 && npKey(fixed[0].p) === '17,17,17', 'σ fixes only the pole');
  check(NP.orbits === 7, `7 σ-orbits (${NP.orbits})`);
  const perLayer = NP_LAYERS.map((_, l) => NP.pts.filter(q => q.layer === l).length);
  check(perLayer.join() === '1,3,3,6,6', `layer sizes ${perLayer}`);
  check(Math.abs(Math.abs(NP_SIGMA_TURN) - TAU / 3) < 1e-9, 'σ is a 120° turn about the pole');
  /* 2. edges, dropped chords, triangles, degrees */
  check(NP.pairs.length === 171 && NP.edges.length === 135 && NP.dropped.length === 36, '171 = 135 + 36');
  check(NP.tris.length === 529, `529 triangles (${NP.tris.length})`);
  let tri2 = 0;
  for (let i = 0; i < 19; i++) for (let j = 0; j < 19; j++) for (let k = 0; k < 19; k++)
    if (i < j && j < k && npD2(NP.pts[i].p, NP.pts[j].p) <= 804 && npD2(NP.pts[i].p, NP.pts[k].p) <= 804 && npD2(NP.pts[j].p, NP.pts[k].p) <= 804) tri2++;
  check(tri2 === 529, 'triangles by brute force');
  const degSum = NP.adj.reduce((s, a) => s + a.size, 0);
  check(degSum === 270 && degSum === 2 * 135, 'degree sum 270');
  const degL = NP_LAYERS.map((_, l) => [...new Set(NP.pts.map((q, i) => [q, i]).filter(([q]) => q.layer === l).map(([, i]) => NP.adj[i].size))].join('/'));
  check(degL.join() === '18,18,14,16,10', `degrees by layer ${degL}`);
  /* 3. the 23 lengths, angles and fields, against the chapter's lists */
  const J23 = [12, 32, 52, 56, 68, 72, 136, 152, 172, 200, 216, 224, 244, 292, 296, 372, 392, 504, 512, 544, 632, 724, 804];
  check(NP.lengths.join() === J23.join(), 'the 23 squared lengths');
  check(NP.lengths.every(j => npTheta(j) > 0 && npTheta(j) < Math.PI / 2), 'θ in (0, π/2)');
  NP.edges.forEach(([i, j, d2]) => check(Math.abs(Math.acos(npDot(NP_U[i], NP_U[j])) - npTheta(d2)) < 1e-12, `arc ${i}-${j}`));
  const others = [86, 542, 1478, 1538, 1634, 1698, 1718, 2534, 7998, 8858, 10374, 11102, 11354, 11942, 14874, 31502, 49166, 57962, 58682, 112022];
  const two = NP.lengths.filter((j, k) => NP_D[k] === 2);
  check(two.join() === '12,68,136', 'ℚ(√−2) holds 12, 68, 136');
  check(NP_D.filter(d => d !== 2).sort((a, b) => a - b).join() === others.join(), 'the other 20 kernels');
  check(new Set(NP_D).size === 21, '21 fields');
  /* 4. α_j in lowest terms for j = 12, 68, 136, and the exact product */
  const g = (a, b) => (b ? g(b, a % b) : a);
  const alpha = j => {             // α_j = (1734 − j + k√−2)/1734 with j(3468 − j) = 2k²
    const k = Math.round(Math.sqrt(j * (3468 - j) / 2));
    if (2 * k * k !== j * (3468 - j)) return null;
    const d = g(g(1734 - j, k), 1734);
    return [(1734 - j) / d, k / d, 1734 / d];
  };
  const a12 = alpha(12), a68 = alpha(68), a136 = alpha(136);
  check(a12 && a12.join() === '287,24,289' && a68.join() === '49,10,51' && a136.join() === '47,14,51', 'α in lowest terms');
  const re = BigInt(287) * 49n - 2n * 24n * 10n, im = 287n * 10n + 24n * 49n;
  check(re === 13583n && im === 4046n && re === 289n * 47n && im === 289n * 14n, '(287 + 24√−2)(49 + 10√−2) = 289(47 + 14√−2)');
  check(Math.abs(npTheta(136) - npTheta(12) - npTheta(68)) < 1e-12, 'θ136 = θ12 + θ68');
  const P = [11, 11, 25], Qp = [13, 13, 23], O = [17, 17, 17];
  check(npD2(P, Qp) === 12 && npD2(Qp, O) === 68 && npD2(P, O) === 136 && npDot(P, Qp) === 861, 'P, Q, O lengths');
  /* 5. the Laplacian: rank 18 exactly, rows sum to 0 */
  check(NP_LAP.every(r => r.reduce((s, v) => s + v, 0) === 0), 'Laplacian rows sum to zero');
  check(npRank(NP_LAP) === 18, 'Laplacian rank 18');
  /* 6. the inversion example: projection(h) = f, ∫h = 2∫f = √π */
  for (const t of [0.2, 0.7, 1.3]) check(Math.abs(npSimpson(r => npH(r) / (2 * r), t, 12) - npF(t)) < 1e-9, `projection at ${t}`);
  const Ih = npSimpson(npH, 0, 12), If = npSimpson(npF, 0, 12), rp = Math.sqrt(Math.PI);
  check(Math.abs(Ih - rp) < 1e-9 && Math.abs(2 * If - rp) < 1e-9, '∫h = 2∫f = √π');
});
Object.assign(FILM.speed, { hook: 0.02, orbits: 0.016, edges: 0.016, arcs: 0.014, relation: 0.016, lean: 0.014, gram: 0.014, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const npFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
const NP_LEAN_MISSING = new Set();
function npLean(x, y, gid, a, size = 20) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!NP_LEAN_MISSING.has(gid)) { NP_LEAN_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt((r.name || r.label).split('.').slice(-2).join('.'), x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* the layer legend dots and names */
const npCol = L => C[L.col];
function npTriple(p) { return `(${p.join(', ')})`; }

/* ======================================================================= */
/*                            scene 1 · NINETEEN POINTS                      */
/* ======================================================================= */
const NP_O1 = { cx: 600, cy: 505, R: 400 };
SCENES.hook = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'modelling choice', 'argued']]);
  /* points pop in one by one while line 1 is spoken, ordered by distance from the pole */
  const order = NP.pts.map((q, i) => i).sort((i, j) => NP.pts[i].layer - NP.pts[j].layer || i - j);
  const t1 = lineAt(S, 1).s + 0.3, step = 0.16;
  const rank = new Map(order.map((i, k) => [i, k]));
  const o = Object.assign({ a, rot: 0.04 * S.u, show: i => clamp((S.u - t1 - rank.get(i) * step) / 0.35) }, NP_O1);
  const sa = a * at(S, 0, 0.8);
  ring(o.cx, o.cy, o.R * Math.sqrt(2 / 3), C.dim, sa * 0.35, 1.2);
  npSphere(Object.assign({}, o, { a: sa }));
  txt('view along (1, 1, 1) · 沿极轴俯视', o.cx, 846 - 10, { size: 18, fam: F.zh, w: 700, align: 'center', c: C.dim, a: sa * 0.9 });
  /* right: the equation */
  panel(1060, 190, 740, 150, sa, C.cyan, 'THE SHELL · 球壳');
  txt('x² + y² + z² = 867', 1090, 278, { size: 52, fam: F.math, w: 700, c: C.white, a: sa });
  txt('= 3 · 17²', 1560, 322, { size: 34, fam: F.math, w: 700, c: C.dim, a: sa * at(S, 0, 0.6, 1.6) });
  txt('x, y, z ∈ ℤ,  x, y, z ≥ 0', 1090, 322, { size: 22, fam: F.mono, w: 700, c: C.cyan, a: sa * at(S, 0, 0.6, 2.4) });
  /* the 19 triples, in the same order as they appear */
  const ga = a * at(S, 1, 0.5);
  panel(1060, 362, 740, 318, ga, C.cyan, 'NONNEGATIVE INTEGER POINTS · 非负整点');
  order.forEach((i, k) => {
    const s = clamp((S.u - t1 - k * step) / 0.35);
    const col = k % 4, row = Math.floor(k / 4);
    const L = NP_LAYERS[NP.pts[i].layer];
    txt(npTriple(NP.pts[i].p), 1086 + col * 178, 420 + row * 44, { size: 22, fam: F.mono, w: 700, c: npCol(L), a: a * s });
  });
  const shown = Math.max(0, Math.min(19, Math.floor((S.u - t1) / step + 0.0001) + 1));
  const ca = a * at(S, 1, 0.4);
  if (ca > 0.003 && S.u > t1) {
    txt(String(shown), 1556, 664, { size: 54, fam: F.orb, w: 900, align: 'right', c: shown === 19 ? C.now : C.white, a: ca });
    txt('points · 个点', 1570, 658, { size: 24, fam: F.zh, w: 700, c: C.white, a: ca });
  }
  /* line 2: the modelling choice */
  const ma = a * Q(S, 2, 'modelling choice', 0.5);
  panel(1060, 700, 740, 134, ma, C.argued, 'MODEL · 模型选择');
  txt('the testbed is a choice · 试验台是选出来的', 1090, 762, { size: 26, fam: F.zh, w: 700, c: C.argued, a: ma });
  const ha = a * Q(S, 2, 'hard arithmetic', 0.5);
  txt('then every count is exact · 选定后一切皆硬算术', 1090, 810, { size: 24, fam: F.zh, w: 700, c: C.white, a: ha });
};

/* ======================================================================= */
/*                          scene 2 · ONE POLE, SIX ORBITS                   */
/* ======================================================================= */
SCENES.orbits = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badge(a * clamp(S.u / 0.8), 'computed');
  /* σ as a 120° turn: three eased steps during line 0 and after; the picture lands on itself each time */
  const t0 = lineAt(S, 0).s + 1.4;
  let steps = 0;
  for (let k = 0; k < 3; k++) steps += ease(clamp((S.u - t0 - k * 2.6) / 1.3));
  const rot = 0.04 * (lineAt(S, 0).s) + NP_SIGMA_TURN * steps;
  const o = Object.assign({ a, rot }, NP_O1);
  /* line 2: the orbit triangles in their layer colours */
  const ta = Q(S, 2, 'six orbits', 0.6);
  const edges = [];
  if (ta > 0.003) for (let i = 0; i < 19; i++) {
    const q = NP.pts[i];
    if (q.layer === 0) continue;
    const j = NP.pts.findIndex(r => r.orbit === q.orbit && r.k === (q.k + 1) % 3);
    edges.push([i, j, npCol(NP_LAYERS[q.layer]), 0.75 * ta, 2.2]);
  }
  const hi = new Set(); const pa = Q(S, 1, 'the pole', 0.5);
  if (pa > 0.5) hi.add(NP.pts.findIndex(q => q.layer === 0));
  npSphere(Object.assign({}, o, { edges, hi }));
  /* the turn arrow around the pole */
  const aa = a * at(S, 0, 0.6, 0.8) * (1 - 0.6 * ta);
  if (aa > 0.003) {
    const r = 64, s0 = -Math.PI / 2, sgn = -Math.sign(NP_SIGMA_TURN);
    curve(t => [o.cx + r * Math.cos(s0 + sgn * t * 2.0), o.cy + r * Math.sin(s0 + sgn * t * 2.0)], 30, C.now, aa, 3);
    const e = s0 + sgn * 2.0, b = s0 + sgn * 1.9;
    arrow(o.cx + r * Math.cos(b), o.cy + r * Math.sin(b), o.cx + r * Math.cos(e), o.cy + r * Math.sin(e), C.now, aa, 3);
  }
  /* right: σ and the table */
  const sa = a * at(S, 0, 0.6);
  panel(1060, 190, 740, 150, sa, C.cyan, 'CYCLE THE COORDINATES · 坐标轮换');
  txt('σ(x, y, z) = (y, z, x)', 1090, 276, { size: 42, fam: F.math, w: 700, c: C.white, a: sa });
  txt('a 120° turn about the pole · 绕极轴转 120°', 1090, 324, { size: 20, fam: F.zh, w: 700, c: C.now, a: a * at(S, 0, 0.6, 1.2) });
  const pla = a * pa;
  panel(1060, 364, 740, 110, pla, C.now, 'FIXED POINT · 不动点');
  txt('σ(17, 17, 17) = (17, 17, 17)', 1090, 440, { size: 34, fam: F.math, w: 700, c: C.now, a: pla });
  const la = a * Q(S, 2, 'six orbits', 0.5);
  panel(1060, 498, 740, 336, la, C.cyan, 'ORBITS BY LAYER · 按层排列的轨道');
  NP_LAYERS.slice(1).forEach((L, k) => {
    const ra = a * Q(S, 2, 'six orbits', 0.5, 0.35 * k);
    const y = 562 + k * 56;
    dot(1098, y - 8, 11, L.pearl, ra);
    txt(`${L.en} · ${L.zh}`, 1124, y, { size: 24, fam: F.zh, w: 700, c: npCol(L), a: ra });
    txt(L.reps.join('  '), 1370, y, { size: 20, fam: F.mono, w: 700, c: C.white, a: ra });
    txt(L.n, 1772, y, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ra });
  });
  const sum = a * Q(S, 2, 'inner core', 0.5);
  txt('1 + 6 × 3 = 19', 1430, 806, { size: 36, fam: F.math, w: 700, align: 'center', c: C.now, a: sum });
};

/* ======================================================================= */
/*                               scene 3 · 135 EDGES                         */
/* ======================================================================= */
const NP_EDGE_ORDER = NP.edges.slice().sort((x, y) => x[2] - y[2]);
SCENES.edges = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badge(a * clamp(S.u / 0.8), 'computed');
  const o = Object.assign({ a, rot: 0.04 * S.u }, NP_O1);
  /* line 0: the threshold sweeps from 0 to 804; edges appear as it passes their length */
  const sw = ease(at(S, 0, Math.max(1.5, lineAt(S, 0).e - lineAt(S, 0).s - 0.3), 0.3));
  const thr = Math.round(804 * sw);
  const flash = (S.u - lineAt(S, 2).s) / 0.55;
  const tri = S.u > lineAt(S, 2).s ? NP.tris[(Math.floor(Math.max(0, flash)) * 37) % NP.tris.length] : null;
  const edges = [];
  for (const e of NP_EDGE_ORDER) if (e[2] <= thr) edges.push([e[0], e[1], C.cyan, 0.42, 1.4]);
  /* line 1: the 36 dropped chords flash as dashed dim arcs, then go */
  const da = Q(S, 1, 'are dropped', 0.4) * (1 - Q(S, 1, 'are dropped', 0.8, 1.4));
  npSphere(Object.assign({}, o, { edges }));
  if (da > 0.003) {
    ctx.save(); ctx.setLineDash([5, 7]);
    for (const e of NP.dropped) npArc(NP_U[e[0]], NP_U[e[1]], o, C.mag, a * da * 0.8, 1.6);
    ctx.restore();
  }
  if (tri) {
    const [i, j, k] = tri;
    const ps = [i, j, k].map(v => npPos(v, o));
    ctx.save(); ctx.globalAlpha = a * 0.28; ctx.fillStyle = C.now; ctx.beginPath();
    ps.forEach(([x, y], m) => (m ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill(); ctx.restore();
    for (const [p, q] of [[i, j], [j, k], [k, i]]) npArc(NP_U[p], NP_U[q], o, C.now, a, 3);
  }
  /* right: the threshold and the counts */
  const sa = a * at(S, 0, 0.5);
  panel(1060, 190, 740, 130, sa, C.now, 'THRESHOLD · 阈值');
  txt('d² ≤', 1090, 278, { size: 46, fam: F.math, w: 700, c: C.white, a: sa });
  txt(String(thr), 1220, 278, { size: 52, fam: F.orb, w: 900, c: C.now, a: sa });
  txt(`${edges.length} edges · 条边`, 1500, 274, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: sa });
  const ca = a * at(S, 1, 0.5);
  panel(1060, 344, 740, 260, ca, C.cyan, 'COUNT · 计数');
  const rows = [
    [1, '171', 'pairs · 点对', C.white, '171 pairs'],
    [1, '− 36', 'longest chords dropped · 剔除最长弦', C.mag, 'longest chords'],
    [1, '= 135', 'edges · 原边', C.cyan, '135 survive'],
    [2, '529', 'triangles · 三角面', C.now, '529 triangles']
  ];
  rows.forEach(([k, n, lab, col, ph], m) => {
    const ra = a * Q(S, k, ph, 0.5);
    const y = 404 + m * 54;
    txt(n, 1250, y, { size: 38, fam: F.orb, w: 900, align: 'right', c: col, a: ra });
    txt(lab, 1280, y - 4, { size: 24, fam: F.zh, w: 700, c: col === C.white ? C.white : col, a: ra });
  });
  const ha = a * at(S, 3, 0.5);
  panel(1060, 628, 740, 206, ha, C.cyan, 'HANDSHAKE · 握手引理');
  txt('18·1 + 18·3 + 14·3 + 16·6 + 10·6', 1090, 692, { size: 28, fam: F.math, w: 700, c: C.white, a: ha });
  txt('degree × vertices · 度数 × 点数', 1090, 728, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ha });
  const ha2 = a * Q(S, 3, 'twice 135', 0.5);
  txt('= 270 = 2 × 135', 1090, 794, { size: 40, fam: F.math, w: 700, c: C.now, a: ha2 });
};

/* ======================================================================= */
/*                               scene 4 · 23 LENGTHS                        */
/* ======================================================================= */
const NP_CHIP = { x0: 150, y0: 250, dx: 206, dy: 108, w: 188, h: 92, cols: 8 };
function npChips(S, a, mode, hiTwo) {
  NP.lengths.forEach((j, k) => {
    const s = a * mode.show(k);
    if (s <= 0.003) return;
    const col = k % NP_CHIP.cols, row = Math.floor(k / NP_CHIP.cols);
    const x = NP_CHIP.x0 + col * NP_CHIP.dx, y = NP_CHIP.y0 + row * NP_CHIP.dy;
    const isTwo = NP_D[k] === 2;
    const c = hiTwo > 0 && isTwo ? mix(C.cyan, C.now, hiTwo) : C.cyan;
    const dimA = hiTwo > 0 && !isTwo ? 1 - 0.55 * hiTwo : 1;
    box(x, y, NP_CHIP.w, NP_CHIP.h, c, s * dimA, 2, 'rgba(0,0,0,0.45)');
    txt(String(j), x + NP_CHIP.w / 2, y + 42, { size: 34, fam: F.orb, w: 900, align: 'center', c, a: s * dimA });
    const fa = mode.field;
    const sub1 = `θ ≈ ${npDeg(npTheta(j)).toFixed(2)}°`, sub2 = `√−${NP_D[k]}`;
    txt(sub1, x + NP_CHIP.w / 2, y + 76, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: s * dimA * (1 - fa) });
    txt(sub2, x + NP_CHIP.w / 2, y + 76, { size: 18, fam: F.mono, w: 700, align: 'center', c: isTwo && hiTwo > 0 ? C.now : C.white, a: s * dimA * fa });
  });
}
SCENES.arcs = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, 'Galois argument', 'argued']]);
  const fa = Q(S, 3, 'imaginary quadratic field', 0.8);
  npChips(S, a, { show: k => clamp((S.u - lineAt(S, 0).s - 0.4 - k * 0.09) / 0.3), field: fa }, 0);
  txt('23 squared lengths j · 23 种平方弦长', 150, 222, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: a * at(S, 0, 0.5) });
  /* bottom left: the angle */
  const ba = a * at(S, 1, 0.5);
  panel(150, 590, 760, 244, ba, C.cyan, 'ARC ANGLE · 弧角');
  txt('cos θⱼ = 1 − j / 1734', 180, 668, { size: 40, fam: F.math, w: 700, c: C.white, a: ba });
  txt('αⱼ = e^(iθⱼ) = (1734 − j + i√(j(3468 − j))) / 1734', 180, 720, { size: 22, fam: F.math, w: 700, c: C.dim, a: ba * at(S, 1, 0.5, 2.0) });
  const qa = a * at(S, 2, 0.5);
  txt('Σ nⱼ θⱼ = 0 with integers nⱼ ?  · 有理关系？', 180, 790, { size: 26, fam: F.zh, w: 700, c: C.now, a: qa });
  /* bottom right: the spectrum of 23 angles on 0..60° */
  const ga0 = Q(S, 3, 'Galois argument', 0.6);
  const pa = a * at(S, 1, 0.5, 0.6) * (1 - ga0);
  panel(950, 590, 850, 244, pa, C.cyan, 'SPECTRUM · 原弧频谱');
  const x0 = 990, x1 = 1760, yb = 760, sc = (x1 - x0) / 60;
  line(x0, yb, x1, yb, C.dim, pa, 2);
  for (let d = 0; d <= 60; d += 10) {
    line(x0 + d * sc, yb, x0 + d * sc, yb + 10, C.dim, pa, 2);
    txt(`${d}°`, x0 + d * sc, yb + 36, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
  }
  NP.lengths.forEach((j, k) => {
    const xx = x0 + npDeg(npTheta(j)) * sc;
    const isTwo = NP_D[k] === 2;
    line(xx, yb - 4, xx, yb - 120, isTwo && fa > 0 ? mix(C.cyan, C.white, fa) : C.cyan, pa * 0.9, 2.5);
  });
  /* line 3: the argued separation by fields */
  const ga = a * Q(S, 3, 'Galois argument', 0.6);
  if (ga > 0.003) {
    panel(950, 590, 850, 244, ga, C.argued, 'GALOIS CHARACTERS · 伽罗瓦特征标');
    txt('αⱼ ∈ ℚ(√−Dⱼ),  σ(αⱼ) = αⱼ or αⱼ⁻¹', 980, 670, { size: 32, fam: F.math, w: 700, c: C.white, a: ga });
    txt('different fields → no rational relation', 980, 724, { size: 26, fam: F.disp, w: 700, c: C.argued, a: ga });
    txt('不同的域之间没有有理关系', 980, 770, { size: 26, fam: F.zh, w: 700, c: C.argued, a: ga });
    txt('Dⱼ = square-free part of j(3468 − j)', 980, 812, { size: 18, fam: F.mono, w: 700, c: C.dim, a: ga });
  }
};

/* ======================================================================= */
/*                              scene 5 · ONE RELATION                       */
/* ======================================================================= */
SCENES.relation = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, '22 rationally independent', 'argued']]);
  /* top: 23 angles → 21 fields */
  const ta = a * at(S, 0, 0.5);
  panel(130, 186, 1670, 116, ta, C.cyan, 'FIELDS · 虚二次域');
  txt('23 angles', 160, 268, { size: 36, fam: F.orb, w: 900, c: C.white, a: ta });
  txt('→', 390, 266, { size: 36, fam: F.math, w: 700, c: C.dim, a: ta });
  txt('21 fields', 450, 268, { size: 36, fam: F.orb, w: 900, c: C.cyan, a: ta });
  const sa = a * Q(S, 0, '12, 68 and 136', 0.5);
  ['12', '68', '136'].forEach((j, k) => chip(810 + k * 120, 252, 100, 52, j, C.now, sa, 28, F.orb));
  txt('→ ℚ(√−2)', 1124, 266, { size: 34, fam: F.math, w: 700, c: C.now, a: sa });
  txt('20 others: one field each · 其余各占一域', 1330, 262, { size: 22, fam: F.zh, w: 700, c: C.dim, a: sa });
  /* left: the great circle x₁ = x₂ through P, Q, O, drawn flat with the true angles from the pole */
  const ca = a * at(S, 0, 0.6, 1.0);
  panel(130, 326, 690, 508, ca, C.cyan, 'GREAT CIRCLE x₁ = x₂ · 大圆');
  const cx = 620, cy = 1040, R = 600;               /* the circle centre sits below the panel; only the top arc shows */
  const ang = th => 0.1 - th * 2.0;                 /* angle from the vertical, exaggerated ×2 so the short arc is visible; labels give the true values */
  const t12 = npTheta(12), t68 = npTheta(68), t136 = npTheta(136);
  const pt = (th, r = R) => [cx + r * Math.sin(ang(th)), cy - r * Math.cos(ang(th))];
  if (ca > 0.003) {
    ctx.save(); ctx.beginPath(); ctx.rect(132, 360, 686, 472); ctx.clip();
    curve(t => pt(-0.1 + t * (t136 + 0.2)), 60, C.dim, ca * 0.6, 2);
    ctx.restore();
    const ga = a * Q(S, 2, 'one great circle', 0.6);
    /* arcs: θ68 (pole → Q) magenta, θ12 (Q → P) cyan on the circle; θ136 (pole → P) amber, just inside */
    const g1 = ca * clamp(ga * 2), g2 = ca * clamp(ga * 2 - 1);
    curve(t => pt(t * t68), 30, C.mag, g1, 6);
    curve(t => pt(t68 + t * t12), 20, C.cyan, g1, 6);
    curve(t => pt(t * t136, R - 40), 40, C.now, g2, 4);
    const [ox, oy] = pt(0), [qx, qy] = pt(t68), [px, py] = pt(t136);
    dot(ox, oy, 15, 'g', ca); dot(qx, qy, 15, 'c', ca); dot(px, py, 15, 'w', ca);
    txt('O', ox + 14, oy - 18, { size: 26, fam: F.mono, w: 700, c: C.now, a: ca });
    txt('Q', qx - 6, qy - 24, { size: 26, fam: F.mono, w: 700, c: C.cyan, a: ca });
    txt('P', px - 34, py + 34, { size: 26, fam: F.mono, w: 700, c: C.white, a: ca });
    const [mx, my] = pt(t68 / 2, R + 40), [nx, ny] = pt(t68 + t12 / 2), [kx, ky] = pt(t136 / 2, R - 90);
    txt(`θ₆₈ ≈ ${npDeg(t68).toFixed(2)}°`, mx, my, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: g1 });
    txt(`θ₁₂ ≈ ${npDeg(t12).toFixed(2)}°`, nx - 18, ny - 8, { size: 22, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: g1 });
    txt(`θ₁₃₆ ≈ ${npDeg(t136).toFixed(2)}°`, kx, ky, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.now, a: g2 });
    [['O', '(17, 17, 17)  pole · 极点', 'g', C.now], ['Q', '(13, 13, 23)  inner · 内层', 'c', C.cyan], ['P', '(11, 11, 25)  sub-inner · 次内层', 'w', C.white]].forEach(([n, lab, pe, col], k) => {
      const y = 694 + k * 40;
      dot(170, y - 8, 10, pe, ca);
      txt(`${n} ${lab}`, 192, y, { size: 22, fam: F.zh, w: 700, c: col, a: ca });
    });
    txt('angles drawn ×2 · 角度放大示意', 160, 816, { size: 17, fam: F.zh, w: 700, c: C.dim, a: ca });
  }
  /* right: the exact product */
  const pa = a * at(S, 1, 0.5);
  panel(860, 326, 940, 312, pa, C.cyan, 'EXACT PRODUCT · 精确乘积');
  txt('α₁₂ = (287 + 24√−2) / 289', 890, 392, { size: 30, fam: F.math, w: 700, c: C.cyan, a: pa });
  txt('α₆₈ = (49 + 10√−2) / 51', 890, 440, { size: 30, fam: F.math, w: 700, c: C.mag, a: pa });
  const pb = a * at(S, 1, 0.5, 1.4);
  txt('(287 + 24√−2)(49 + 10√−2) = 13583 + 4046√−2', 890, 500, { size: 26, fam: F.math, w: 700, c: C.white, a: pb });
  txt('= 289 · (47 + 14√−2)', 1270, 540, { size: 26, fam: F.math, w: 700, c: C.white, a: pb });
  const pc = a * Q(S, 1, 'exactly the one for 136', 0.5);
  txt('α₁₂ · α₆₈ = (47 + 14√−2) / 51 = α₁₃₆', 890, 606, { size: 32, fam: F.math, w: 700, c: C.now, a: pc });
  /* bottom right: the relation and the count */
  const ra = a * Q(S, 2, 'arcs simply add', 0.5);
  panel(860, 662, 940, 172, ra, C.now, 'THE ONLY RELATION · 唯一关系');
  txt('θ₁₃₆ = θ₁₂ + θ₆₈', 890, 744, { size: 44, fam: F.math, w: 700, c: C.now, a: ra });
  const ka = a * Q(S, 3, '22 rationally independent', 0.6);
  if (ka > 0.003) {
    txt('23 − 1 = 22', 1770, 744, { size: 46, fam: F.orb, w: 900, align: 'right', c: C.white, a: ka });
    txt('independent frequencies · 有理独立频率', 890, 806, { size: 24, fam: F.zh, w: 700, c: C.argued, a: ka });
  }
};

/* ======================================================================= */
/*                             scene 6 · TWO LEAN PILLARS                    */
/* ======================================================================= */
SCENES.lean = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badge(a * clamp(S.u / 0.8), 'lean');
  /* left: the projective ternion heap */
  const la = a * at(S, 0, 0.6);
  panel(130, 190, 800, 644, la, C.lean, 'PROJECTIVE TERNION HEAP · 射影三元流群');
  txt('integer quaternions ℤ⁴ · 整四元数', 160, 262, { size: 24, fam: F.zh, w: 700, c: C.dim, a: la });
  txt('triad(x, y, z) = (x ȳ) z', 160, 322, { size: 40, fam: F.math, w: 700, c: C.white, a: la });
  const aa = a * at(S, 1, 0.5, 0.4);
  txt('triad(triad(x, y, z), u, v)', 160, 404, { size: 28, fam: F.math, w: 700, c: C.white, a: aa });
  txt('∼ray  triad(x, y, triad(z, u, v))', 160, 448, { size: 28, fam: F.math, w: 700, c: C.white, a: aa });
  txt('x, y, z, u, v nonzero · 皆非零', 160, 486, { size: 20, fam: F.zh, w: 700, c: C.dim, a: aa });
  npLean(160, 532, NP_LEAN.assoc, a * at(S, 1, 0.5, 1.2));
  const ka = a * at(S, 2, 0.5, 0.3);
  txt('κ(a, b) = ⟨a, b⟩² / (‖a‖² ‖b‖²)', 160, 616, { size: 28, fam: F.math, w: 700, c: C.white, a: ka });
  txt('κ(triad(a, u, v), triad(b, u, v)) ≡ κ(a, b)', 160, 666, { size: 28, fam: F.math, w: 700, c: C.white, a: ka });
  txt('u, v nonzero; ≡ is IntRatio.Equivalent', 160, 704, { size: 20, fam: F.mono, w: 700, c: C.dim, a: ka });
  npLean(160, 756, NP_LEAN.kappa, a * at(S, 2, 0.5, 1.2));
  /* right: isotropic shell inversion */
  const ra = a * at(S, 3, 0.6);
  panel(970, 190, 830, 644, ra, C.lean, 'ISOTROPIC SHELL INVERSION · 各向同性球壳反演');
  txt('f(t) = ∫ h(r) / (2r) dr  over r > t', 1000, 262, { size: 30, fam: F.math, w: 700, c: C.cyan, a: ra });
  txt('h(r) = −2r f′(r)', 1000, 326, { size: 42, fam: F.math, w: 700, c: C.mag, a: ra * at(S, 3, 0.5, 1.6) });
  npLean(1000, 380, NP_LEAN.unique, ra * at(S, 3, 0.5, 2.4), 18);
  /* the plot: a computed example */
  const px0 = 1010, px1 = 1760, py0 = 430, py1 = 660, xs = (px1 - px0) / 3, ys = (py1 - py0) / 1.6;
  const pa = ra * at(S, 3, 0.6, 1.0);
  line(px0, py1, px1, py1, C.dim, pa, 2); line(px0, py1, px0, py0, C.dim, pa, 2);
  for (let k = 0; k <= 3; k++) txt(String(k), px0 + k * xs, py1 + 24, { size: 18, fam: F.mono, w: 700, align: 'center', c: C.dim, a: pa });
  const grow = ease(at(S, 3, 2.2, 1.0));
  curve(t => [px0 + 3 * t * grow * xs, py1 - npF(3 * t * grow) * ys], 80, C.cyan, pa, 3.5);
  curve(t => [px0 + 3 * t * grow * xs, py1 - npH(3 * t * grow) * ys], 80, C.mag, pa, 3.5);
  txt('f = e^(−t²)', px0 + 0.08 * xs, py0 + 22, { size: 22, fam: F.math, w: 700, c: C.cyan, a: pa });
  txt('h = 4r² e^(−r²)', px0 + 1.62 * xs, py1 - 1.0 * ys, { size: 22, fam: F.math, w: 700, c: C.mag, a: pa });
  txt('example · computed · 例子（屏幕算出）', px1, py0 - 6, { size: 17, fam: F.zh, w: 700, align: 'right', c: C.dim, a: pa });
  const ma = ra * at(S, 3, 0.6, 2.6);
  txt('∫ h = 2 ∫ f  over (0, ∞)   (= √π here · 此例)', 1000, 726, { size: 28, fam: F.math, w: 700, c: C.white, a: ma });
  npLean(1000, 784, NP_LEAN.mass, ma, 18);
};

/* ======================================================================= */
/*                                scene 7 · 21, NOT 18                       */
/* ======================================================================= */
/* the vertices in layer order for the heatmap */
SCENES.gram = S => {
  const a = npFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'Hasse obstruction', 'argued']]);
  /* left: L = D − A as a heatmap, 19 × 19 */
  const ha = a * at(S, 0, 0.6);
  panel(130, 190, 660, 644, ha, C.cyan, 'LAPLACIAN L = D − A · 拉普拉斯');
  const cs = 27, x0 = 200, y0 = 246;
  const sweep = ease(at(S, 0, 2.0, 0.4)) * 19;
  for (let i = 0; i < 19; i++) for (let j = 0; j < 19; j++) {
    const s = clamp(sweep - i);
    if (s <= 0) continue;
    const v = NP_LAP[i][j];
    const x = x0 + j * cs, y = y0 + i * cs;
    if (v < 0) fillBox(x + 1, y + 1, cs - 2, cs - 2, C.cyan, ha * s * 0.7);
    else if (v > 0) fillBox(x + 1, y + 1, cs - 2, cs - 2, C.now, ha * s * (0.35 + 0.55 * v / 18));
    else fillBox(x + 1, y + 1, cs - 2, cs - 2, C.bg, ha * s * 0.9);
    if (v > 0) txt(String(v), x + cs / 2, y + cs / 2 + 6, { size: 15, fam: F.mono, w: 700, align: 'center', c: C.bg, a: ha * s });
  }
  NP.pts.forEach((q, i) => dot(x0 - 18, y0 + i * cs + cs / 2, 8, NP_LAYERS[q.layer].pearl, ha));
  txt('cyan −1: the 135 edges · 青色 −1：135 条边', 160, 806, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ha });
  /* right: the dimension ladder */
  const r1 = a * at(S, 1, 0.5);
  panel(830, 190, 970, 300, r1, C.cyan, 'HOW MANY COORDINATES · 需要几维坐标');
  const tile = (d, x, y, col, mark, al, ring2 = 0) => {
    if (al <= 0.003) return;
    box(x, y, 150, 92, col, al, 2.5, 'rgba(0,0,0,0.5)');
    txt(String(d), x + 75, y + 62, { size: 46, fam: F.orb, w: 900, align: 'center', c: col, a: al });
    if (mark) txt(mark, x + 140, y + 28, { size: 26, fam: F.math, w: 700, align: 'right', c: col, a: al });
    if (ring2 > 0) box(x - 8, y - 8, 166, 108, C.now, al * ring2, 3);
  };
  txt('ℝ', 862, 316, { size: 40, fam: F.math, w: 700, c: C.cyan, a: r1 });
  tile(18, 930, 254, C.cyan, '✓', r1);
  txt('real rank 18 · 实秩 18', 1110, 310, { size: 26, fam: F.zh, w: 700, c: C.cyan, a: r1 * at(S, 1, 0.5, 0.8) });
  const r2 = a * Q(S, 2, 'rational coordinates', 0.5);
  txt('ℚ', 862, 438, { size: 40, fam: F.math, w: 700, c: C.white, a: r2 });
  const xq = [930, 1140, 1350, 1560];
  [18, 19, 20].forEach((d, k) => {
    const strike = a * Q(S, 2, 'rules out', 0.4, 0.35 * k);
    tile(d, xq[k], 376, strike > 0.5 ? C.argued : C.dim, strike > 0.5 ? '✕' : '', r2);
  });
  const r3 = a * Q(S, 3, 'The minimum is 21', 0.5);
  tile(21, xq[3], 376, C.argued, '✓', r3, r3);
  /* obstruction panel: copied from §1.4 (replay certificate and argument) */
  const oa = a * Q(S, 2, 'Hasse obstruction', 0.5);
  panel(830, 514, 970, 320, oa, C.argued, 'REPLAY CERTIFICATE + ARGUMENT · 复算证书与论证');
  txt('Hasse target −1 at p ∈ {2, 11, 17, 71}', 860, 580, { size: 26, fam: F.math, w: 700, c: C.white, a: oa });
  txt('p = 2:  −d ≡ 1 (mod 8)  ⇒  (x, −d)₂ = +1', 860, 626, { size: 26, fam: F.math, w: 700, c: C.white, a: oa * Q(S, 2, 'rules out', 0.5) });
  txt('⇒ no rational embedding in 18, 19, 20 dimensions', 860, 668, { size: 22, fam: F.mono, w: 700, c: C.argued, a: oa * Q(S, 2, 'rules out', 0.5, 0.8) });
  const ma = a * Q(S, 3, 'The minimum is 21', 0.5, 0.6);
  txt('Meyer: 18 + 3 = 21 always suffices', 860, 714, { size: 22, fam: F.mono, w: 700, c: C.argued, a: ma });
  const fa = a * Q(S, 3, 'three dimensions', 0.6);
  txt('18 → 21 : three hidden dimensions · 三个隐藏维度', 860, 790, { size: 28, fam: F.zh, w: 700, c: C.now, a: fa });
};

/* ======================================================================= */
/*                                 scene 8 · LEDGER                          */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 270 });
};

/* ======================================================================= */
/*                                     poster                                */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[2], t = sc.start + 9;
  background(t, sc, 2, 9);
  const o = { cx: 1380, cy: 560, R: 470, rot: 0.3, a: 1 };
  const edges = NP.edges.map(e => [e[0], e[1], C.cyan, 0.32, 1.4]);
  for (const j of [12, 68, 136]) for (const e of NP.edges) if (e[2] === j) edges.push([e[0], e[1], C.now, 0.95, 3.2]);
  npSphere(Object.assign({}, o, { edges, r: 15 }));
  txt(DATA.film.title_zh, 130, 380, { size: 88, fam: F.zh, w: 900, c: C.white, ab: 4 });
  txt('NINETEEN POINTS,', 130, 480, { size: 52, fam: F.orb, w: 900, c: C.cyan, ab: 2, ls: 4 });
  txt('TWENTY-TWO FREQUENCIES', 130, 548, { size: 52, fam: F.orb, w: 900, c: C.cyan, ab: 2, ls: 4 });
  txt('x² + y² + z² = 867', 130, 650, { size: 50, fam: F.math, w: 700, c: C.white });
  txt('θ₁₃₆ = θ₁₂ + θ₆₈', 130, 724, { size: 44, fam: F.math, w: 700, c: C.now });
  bloom(0.5);
  txt(`${DATA.book.code} · FILM`, 130, 870, { size: 24, fam: F.mono, w: 700, c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, 130, 940, { size: 26, fam: F.zh, w: 700, c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 2, sc);
  post(0);
};
