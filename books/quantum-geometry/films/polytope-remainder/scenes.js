/* Film · Finite always leaves a gap · 有限总留一道缝
   (book quantum-geometry, part VI: chapter 21, §21.3). Scenes for theme/film/engine.js.

   What each scene shows, and where it rests:
     ball     geodesic polyhedra inscribed in the unit sphere (an icosahedron, and its faces cut into 4 and 16 triangles,
              pushed out to the sphere): 12, 42, 162 corners; the gap 1 − (distance from the centre to the nearest face
              plane) is 0.2053, 0.0658, 0.0178 (computed here; the chapter's covering bound 2/N is a literature argument
              and is not shown).
     pointer  a 5-cell pointer c = (1, 2, 3, 2, 1)/√19 and its copy shifted by one cell; overlap
              γ(1) = Σ c(k+1) c(k) = (2 + 6 + 6 + 2)/19 = 16/19 = 0.8421 (computed); the stencil is an analogy (argued).
     hand     two cells a = cos φ, b = sin φ: γ(1) = ab = ½ sin 2φ ≤ ½, since (a − b)² ≥ 0, equality at a = b (computed);
              ½ = cos(π/3), the apothem of the inscribed triangle; three cells: max γ(1) = cos(π/4) = 0.7071 at
              (½, 1/√2, ½), the apothem of the square (computed: the largest eigenvalue of the path form).
     ceiling  for every finite pointer and ℓ ≠ 0, |γ(ℓ)| ≤ cos(π/(m + 2)), m = ⌊N/|ℓ|⌋
              ..... FiniteRecordCosineObstruction.coefficient_gamma_le_cosine (LEAN); the shift record is a quantum channel
              C with (Cρ)ᵢⱼ = γ(qᵢ − qⱼ) ρᵢⱼ, and for every recovery channel R, ½(1 − cos(π/(m + 2))) ≤ sup over ρ of
              T(R(C ρ), ρ), with the bound > 0 ..... FiniteRecordCosineObstruction.finite_record_cosine_obstruction (LEAN);
              ℓ = 1: m = 1, 2, 4, 10 → ceilings 0.5000, 0.7071, 0.8660, 0.9659; floors 0.2500, 0.1464, 0.0670, 0.0170
              (computed).
     tail     ‖exp z − Σ_{k<n} zᵏ/k!‖ ≤ rⁿ/n! · eʳ whenever ‖z‖ ≤ r, in a complete normed algebra
              ..... ExactTaylorObservationRemainder.exp_tail_le (LEAN); the π pulse z = −i(π/2)σx, r = π/2: ceilings
              1.22, 4.42e−3, 2.27e−6 at n = 4, 8, 12; true errors 0.245, 9.08e−4, 4.68e−7 (computed).
     edge     diagonal states in the label basis are unchanged by the record, so the identity recovery leaves them with
              error 0 (computed); the pointer c(0) = 1 has γ(ℓ) = 0 for every ℓ ≠ 0 and every N (computed); that the
              cosine remainder R₂ₙ(θ) is nonzero for 0 < θ ≤ 2 is a literature result (argued).

   On load, FILM.init checks DATA.lean against the three theorems and re-derives every number shown on screen by an
   independent route (face planes of the geodesic polyhedra, a scan for the two-cell maximum, power iteration for the
   three-cell maximum, random pointers against the cosine ceiling, 2×2 complex matrices for the π pulse). Any
   disagreement is pushed to window.FILM_ERRORS, which stops the render. */
'use strict';

/* ======================================================================= */
/*                             exact quantities                             */
/* ======================================================================= */
const PR_LEAN = {
  coefficient_gamma_le_cosine: 'D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.coefficient_gamma_le_cosine',
  finite_record_cosine_obstruction: 'D5/S3/Quantum/QuantumChannels/FiniteRecordCosineObstruction.finite_record_cosine_obstruction',
  exp_tail_le: 'D5/S3/Observer/Linear/ExactTaylorObservationRemainder.exp_tail_le'
};
const v3 = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]], sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  sc: (a, k) => [a[0] * k, a[1] * k, a[2] * k], dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  unit: a => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; }
};
/* the geodesic polyhedron of frequency f: every icosahedron face cut into f² triangles, the new corners pushed out to
   the unit sphere. Returns { vertices, faces, gaps } with gaps[i] = 1 − (distance from the centre to face i's plane). */
function prGeodesic(f) {
  const p = (1 + Math.sqrt(5)) / 2;
  const I = [[-1, p, 0], [1, p, 0], [-1, -p, 0], [1, -p, 0], [0, -1, p], [0, 1, p], [0, -1, -p], [0, 1, -p], [p, 0, -1], [p, 0, 1], [-p, 0, -1], [-p, 0, 1]].map(v3.unit);
  const d2 = (a, b) => { const q = v3.sub(a, b); return v3.dot(q, q); };
  const e = Math.min(...I.slice(1).map(v => d2(I[0], v)));
  const F = [];
  for (let a = 0; a < 12; a++) for (let b = a + 1; b < 12; b++) for (let c = b + 1; c < 12; c++)
    if ([[a, b], [a, c], [b, c]].every(([i, j]) => Math.abs(d2(I[i], I[j]) - e) < 1e-9)) F.push([a, b, c]);
  const vertices = [], index = new Map(), faces = [];
  const vid = v => { const k = v.map(x => x.toFixed(8)).join(','); if (!index.has(k)) { index.set(k, vertices.length); vertices.push(v); } return index.get(k); };
  for (const [a, b, c] of F) {
    const A = I[a], B = I[b], Cc = I[c], id = {};
    for (let i = 0; i <= f; i++) for (let j = 0; j <= f - i; j++) {
      const k = f - i - j;
      id[i + ',' + j] = vid(v3.unit(v3.add(v3.add(v3.sc(A, i / f), v3.sc(B, j / f)), v3.sc(Cc, k / f))));
    }
    for (let i = 0; i < f; i++) for (let j = 0; j < f - i; j++) {
      faces.push([id[i + ',' + j], id[(i + 1) + ',' + j], id[i + ',' + (j + 1)]]);
      if (i + j < f - 1) faces.push([id[(i + 1) + ',' + j], id[(i + 1) + ',' + (j + 1)], id[i + ',' + (j + 1)]]);
    }
  }
  const normals = faces.map(([a, b, c]) => {
    let n = v3.unit(v3.cross(v3.sub(vertices[b], vertices[a]), v3.sub(vertices[c], vertices[a])));
    if (v3.dot(n, vertices[a]) < 0) n = v3.sc(n, -1);
    return n;
  });
  const gaps = faces.map((fc, i) => 1 - v3.dot(normals[i], vertices[fc[0]]));
  return { vertices, faces, normals, gaps, gap: Math.max(...gaps) };
}
const PR_FREQ = [1, 2, 4];
const PR_GEO = {};
/* the pointer of scene pointer: c = (1, 2, 3, 2, 1) / √19 */
const PR_C = [1, 2, 3, 2, 1].map(x => x / Math.sqrt(19));
/* γ(ℓ) = Σ_k c(k + ℓ) conj c(k) for a real or complex pointer (arrays of [re, im]); c is zero outside 0..N */
function prGamma(c, l) {
  let re = 0, im = 0;
  for (let k = 0; k < c.length; k++) {
    const j = k + l;
    if (j < 0 || j >= c.length) continue;
    const p = c[j], q = c[k];
    re += p[0] * q[0] + p[1] * q[1]; im += p[1] * q[0] - p[0] * q[1];
  }
  return Math.hypot(re, im);
}
const prCeil = m => Math.cos(Math.PI / (m + 2));
const prFloor = m => (1 - prCeil(m)) / 2;
const PR_M = [1, 2, 4, 10];
/* the π pulse: z = −i (π/2) σx, ‖z‖ = π/2; error after n terms = |e^{iπ/2} − Σ_{k<n} (iπ/2)^k / k!| */
const PR_R = Math.PI / 2, PR_N = [4, 8, 12];
const fact = n => { let p = 1; for (let k = 2; k <= n; k++) p *= k; return p; };
function prTail(n) {
  let re = 0, im = 0, tr = 1, ti = 0;
  for (let k = 0; k < n; k++) { re += tr; im += ti; const nr = -ti * PR_R / (k + 1), ni = tr * PR_R / (k + 1); tr = nr; ti = ni; }
  return Math.hypot(Math.cos(PR_R) - re, Math.sin(PR_R) - im);
}
const prBound = n => Math.pow(PR_R, n) / fact(n) * Math.exp(PR_R);
/* number formats */
const prSci = (v, d = 2) => { const e = Math.floor(Math.log10(v)); const m = v / Math.pow(10, e); return e >= -1 ? v.toFixed(e >= 0 ? 2 : 3) : `${m.toFixed(d)}×10${prSup(e)}`; };
const prSup = e => String(e).split('').map(ch => ({ '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' }[ch])).join('');

FILM.init.push(() => {
  const E = window.FILM_ERRORS;
  let bad = 0;
  const fail = m => { if (bad++ < 12) E.push('polytope film: ' + m); };
  const check = (ok, m) => { if (!ok) fail(m); };
  const near = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;

  /* 0. the cited theorems at the pinned commit */
  const lean = DATA.lean || [];
  check(lean.length === Object.keys(PR_LEAN).length, `film.json cites ${lean.length} declarations, expected ${Object.keys(PR_LEAN).length}`);
  for (const [short, gid] of Object.entries(PR_LEAN)) {
    const r = leanCite(gid);
    if (!r) { fail(`film.json does not cite ${gid}`); continue; }
    check(r.kind === 'theorem', `${gid} is not a theorem at the pinned commit`);
    check(r.short === short, `${gid} resolves to ${r.name}, expected ${short}`);
  }

  /* 1. BALL: the geodesic polyhedra and their gaps */
  for (const f of PR_FREQ) PR_GEO[f] = prGeodesic(f);
  const want = { 1: [12, 20, '0.2053'], 2: [42, 80, '0.0658'], 4: [162, 320, '0.0178'] };
  for (const f of PR_FREQ) {
    const g = PR_GEO[f];
    check(g.vertices.length === want[f][0] && g.faces.length === want[f][1], `frequency ${f}: ${g.vertices.length} corners, ${g.faces.length} faces`);
    check(g.vertices.every(v => near(v3.dot(v, v), 1)), `frequency ${f}: corners on the sphere`);
    check(g.gap.toFixed(4) === want[f][2], `frequency ${f}: gap ${g.gap}`);
    /* convex and inscribed: every corner lies on the inner side of every face plane */
    check(g.faces.every((fc, i) => g.vertices.every(v => v3.dot(v, g.normals[i]) <= 1 - g.gaps[i] + 1e-12)), `frequency ${f}: convex`);
    /* the largest gap seen from a dense set of directions equals the face gap (the support function's minimum) */
    let worst = 0;
    for (let i = 0; i < 2000; i++) {
      const t = Math.acos(1 - 2 * (i + 0.5) / 2000), ph = i * Math.PI * (3 - Math.sqrt(5));
      const u = [Math.sin(t) * Math.cos(ph), Math.sin(t) * Math.sin(ph), Math.cos(t)];
      worst = Math.max(worst, 1 - Math.max(...g.vertices.map(v => v3.dot(u, v))));
    }
    check(worst <= g.gap + 1e-12 && worst > g.gap * 0.9, `frequency ${f}: scanned gap ${worst}`);
  }
  check(near(PR_GEO[1].gap, 1 - Math.sqrt((5 + 2 * Math.sqrt(5)) / 15)), 'icosahedron: 1 − inradius / circumradius');
  check(['0.21', '0.066', '0.018'].every((s, i) => PR_GEO[PR_FREQ[i]].gap.toFixed(s.length - 2) === s), 'the gaps as spoken');

  /* 2. POINTER: the overlap of (1, 2, 3, 2, 1)/√19 with its copy shifted by one */
  const cx = PR_C.map(x => [x, 0]);
  check(near(PR_C.reduce((s, x) => s + x * x, 0), 1), 'pointer normalized');
  check(near(prGamma(cx, 1), 16 / 19) && (16 / 19).toFixed(4) === '0.8421', 'γ(1) = 16/19');
  check(near(prGamma(cx, 1), (1 * 2 + 2 * 3 + 3 * 2 + 2 * 1) / 19), 'γ(1) as the sum of products');
  check(prGamma(cx, 1) <= prCeil(4) && prCeil(4).toFixed(4) === '0.8660', 'γ(1) under cos(π/6)');

  /* 3. HAND: two cells peak at ½, three cells at cos(π/4) */
  let best2 = 0, arg2 = 0;
  for (let i = 0; i <= 90000; i++) { const ph = i / 90000 * Math.PI / 2, v = Math.cos(ph) * Math.sin(ph); if (v > best2) { best2 = v; arg2 = ph; } }
  check(near(best2, 0.5, 1e-9) && near(arg2, Math.PI / 4, 1e-4) && near(prCeil(1), 0.5), 'two cells: max ab = ½ at 45° = cos 60°');
  let x = [1, 0.3, 0.7];
  for (let it = 0; it < 400; it++) { const y = [x[0] + x[1] / 2, x[1] + (x[0] + x[2]) / 2, x[2] + x[1] / 2]; /* (I + A) x: A's eigenvalues are ±1/√2 and 0 */ const n = Math.hypot(...y); x = y.map(t => t / n); }
  const g3 = x[0] * x[1] + x[1] * x[2];
  check(near(g3, Math.SQRT1_2, 1e-9) && near(prCeil(2), Math.SQRT1_2) && near(x[0], 0.5, 1e-6) && near(x[1], Math.SQRT1_2, 1e-6), 'three cells: max = cos 45° at (½, 1/√2, ½)');
  check(near(prGamma([[0.5, 0], [Math.SQRT1_2, 0], [0.5, 0]], 1), Math.SQRT1_2), 'three cells: the best pointer');

  /* 4. CEILING: random complex pointers never pass cos(π/(⌊N/|ℓ|⌋ + 2)); the ladder of numbers */
  for (let k = 0; k < 300; k++) {
    const N = Math.floor(rnd(k, 1) * 9);
    let c = [];
    for (let i = 0; i <= N; i++) c.push([2 * rnd(k, 10 + 2 * i) - 1, 2 * rnd(k, 11 + 2 * i) - 1]);
    const n = Math.sqrt(c.reduce((s, z) => s + z[0] * z[0] + z[1] * z[1], 0));
    c = c.map(z => [z[0] / n, z[1] / n]);
    for (let l = -11; l <= 11; l++) if (l !== 0) check(prGamma(c, l) <= prCeil(Math.floor(N / Math.abs(l))) + 1e-12, `random pointer ${k}, ℓ = ${l}`);
  }
  for (const m of PR_M) {
    const s = []; for (let k = 0; k <= m; k++) s.push([Math.sin(Math.PI * (k + 1) / (m + 2)), 0]);
    const n = Math.sqrt(s.reduce((t, z) => t + z[0] * z[0], 0));
    check(near(prGamma(s.map(z => [z[0] / n, 0]), 1), prCeil(m), 1e-12), `the sine pointer reaches the ceiling at m = ${m}`);
  }
  check(PR_M.map(m => prCeil(m).toFixed(4)).join() === '0.5000,0.7071,0.8660,0.9659', 'ceilings');
  check(PR_M.map(m => prFloor(m).toFixed(4)).join() === '0.2500,0.1464,0.0670,0.0170', 'floors');
  check(PR_M.every(m => prFloor(m) > 0), 'floors positive');

  /* 5. TAIL: the π pulse with 2×2 complex matrices, against the scalar formula and the ceiling */
  const cm = (p, q) => [p[0] * q[0] - p[1] * q[1], p[0] * q[1] + p[1] * q[0]];
  const mm = (A, B) => [0, 1, 2, 3].map(q => { const i = q >> 1, j = q & 1, s = cm(A[2 * i], B[j]), t = cm(A[2 * i + 1], B[2 + j]); return [s[0] + t[0], s[1] + t[1]]; });
  const Z = [[0, 0], [0, -PR_R], [0, -PR_R], [0, 0]];                 // −i (π/2) σx
  const U = [[0, 0], [0, -1], [0, -1], [0, 0]];                      // exp z = −i σx
  const opnorm = A => {   // the largest singular value of a 2×2 complex matrix
    const a = A.map(z => z[0] * z[0] + z[1] * z[1]).reduce((s, v) => s + v, 0);
    const det = cm(A[0], A[3]), det2 = cm(A[1], A[2]), d = Math.hypot(det[0] - det2[0], det[1] - det2[1]);
    return Math.sqrt((a + Math.sqrt(Math.max(0, a * a - 4 * d * d))) / 2);
  };
  for (const n of [1, 2, 3, ...PR_N, 16]) {
    let P = [[1, 0], [0, 0], [0, 0], [1, 0]], S = [[0, 0], [0, 0], [0, 0], [0, 0]];
    for (let k = 0; k < n; k++) { S = S.map((z, i) => [z[0] + P[i][0] / fact(k), z[1] + P[i][1] / fact(k)]); P = mm(P, Z); }
    const err = opnorm(U.map((z, i) => [z[0] - S[i][0], z[1] - S[i][1]]));
    check(near(err, prTail(n), 1e-12), `π pulse: matrix error = scalar error at n = ${n}`);
    check(err <= prBound(n) && err > 0, `π pulse: 0 < error ≤ ceiling at n = ${n}`);
  }
  check(PR_N.map(n => prSci(prBound(n))).join() === '1.22,4.42×10⁻³,2.27×10⁻⁶', 'ceilings shown');
  check(PR_N.map(n => prSci(prTail(n))).join() === '0.245,9.08×10⁻⁴,4.68×10⁻⁷', 'errors shown');
  check(PR_N.map(n => Math.pow(PR_R, n).toFixed(n === 4 ? 2 : n === 8 ? 1 : 0)).join() === '6.09,37.1,226', 'powers shown');
  check(PR_N.map(n => fact(n)).join() === '24,40320,479001600', 'factorials shown');

  /* 6. EDGE: diagonal states pass the record untouched; the one-cell pointer has γ = 0 */
  for (let N = 0; N <= 12; N++) {
    const c = [[1, 0]]; for (let k = 1; k <= N; k++) c.push([0, 0]);
    for (let l = 1; l <= 14; l++) check(prGamma(c, l) === 0 && prGamma(c, -l) === 0, `one-cell pointer, N = ${N}, ℓ = ${l}`);
  }
});
Object.assign(FILM.speed, { ball: 0.02, pointer: 0.014, hand: 0.014, ceiling: 0.016, tail: 0.016, edge: 0.016, close: 0.025 });

/* ======================================================================= */
/*                                  drawing                                  */
/* ======================================================================= */
const prFade = S => clamp(S.u / 0.5) * clamp((S.d - S.u) / 0.5);
function prRich(parts, x, y, o = {}) {
  const size = o.size || 30, fam = o.fam || F.math, w = o.w || 700, a = o.a == null ? 1 : o.a;
  let cx = x;
  if (o.align === 'center') cx = x - parts.reduce((s, p) => s + tw(p[0], size, fam, w), 0) / 2;
  for (const [s, col] of parts) { txt(s, cx, y, { size, fam, w, c: col, a, ab: o.ab }); cx += tw(s, size, fam, w); }
  return cx;
}
/* LEAN ✓ chip for one cited theorem, looked up by its whole GID */
const PR_MISSING = new Set();
function prLean(x, y, gid, a, o = {}) {
  if (a <= 0.003) return;
  const r = leanCite(gid);
  if (!r || r.kind !== 'theorem') {
    if (!PR_MISSING.has(gid)) { PR_MISSING.add(gid); window.FILM_ERRORS.push(`film.json does not cite the theorem ${gid}`); }
    return;
  }
  const size = o.size || 20, head = STR.en.lean || 'LEAN ✓', hs = size * 0.8, wh = tw(head, hs, F.mono, 700, 1) + 18;
  fillBox(x, y - size * 1.0, wh, size * 1.35, C.lean, a);
  txt(head, x + 9, y - size * 0.1, { size: hs, fam: F.mono, w: 700, c: C.bg, a, ls: 1 });
  txt(r.short, x + wh + 12, y, { size, fam: F.mono, w: 700, c: C.lean, a });
}
/* orthographic view: world (x, y, z), z up → [screen x, screen y, depth] (depth > 0: behind the centre plane) */
function prView(cx, cy, R, yaw, el) {
  const cw = Math.cos(yaw), sw = Math.sin(yaw), ce = Math.cos(el), se = Math.sin(el);
  const V = p => {
    const X = p[0] * cw - p[1] * sw, Y = p[0] * sw + p[1] * cw, Z = p[2];
    return [cx + X * R, cy - (Z * ce + Y * se) * R, Y * ce - Z * se];
  };
  Object.assign(V, { cx, cy, R, yaw, el });
  return V;
}
const prShot = (key, V, r) => solid(key, { x: r[0], y: r[1], w: r[2], h: r[3], yaw: V.yaw, pitch: V.el, unit: V.R, cx: V.cx - r[0], cy: V.cy - r[1], px: true });
/* a regular n-gon inscribed in a circle of radius R; one side faces right; apothem cyan, gap magenta */
function prPolygon(cx, cy, R, n, a, o = {}) {
  if (a <= 0.003) return;
  ring(cx, cy, R, C.white, a * 0.5, 1.6);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = o.col || C.white; ctx.lineWidth = o.w || 2.5;
  ctx.fillStyle = rgba(o.col || C.white, 0.06); ctx.beginPath();
  for (let k = 0; k <= n; k++) { const t = Math.PI / n + TAU * k / n; const px = cx + R * Math.cos(t), py = cy - R * Math.sin(t); k ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }
  ctx.fill(); ctx.stroke(); ctx.restore();
  const ap = R * Math.cos(Math.PI / n);
  line(cx, cy, cx + ap, cy, C.cyan, a, o.lw || 4);
  line(cx + ap, cy, cx + R, cy, C.mag, a, (o.lw || 4) + 1);
  dot(cx + ap, cy, 7, 'c', a);
}
/* a row of pointer cells with bars: c values, cell width cw, bar scale hs px per unit amplitude */
function prBars(x0, base, c, cw, hs, col, a, o = {}) {
  if (a <= 0.003) return;
  c.forEach((v, k) => {
    const x = x0 + k * cw;
    if (o.cells !== false) box(x + 4, base - hs * 0.75, cw - 8, hs * 0.75, C.dim, a * 0.5, 1.2);
    if (Math.abs(v) < 1e-9) return;
    if (o.outline) { box(x + 14, base - v * hs, cw - 28, v * hs, col, a, 3); }
    else { ctx.save(); ctx.globalAlpha = a * 0.85; ctx.fillStyle = col; ctx.fillRect(x + 14, base - v * hs, cw - 28, v * hs); ctx.restore(); }
  });
}
/* opening title */
function prTitle(S) {
  const u = S.u, L0 = lineAt(S, 0);
  const ta = clamp(u / 0.5) * (1 - clamp((u - L0.s + 0.25) / 0.6));
  if (ta <= 0) return;
  const p = clamp(u / 1.3);
  txt(`${DATA.book.code} · FILM`, W / 2, 330, { size: 26, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta, ls: 10 });
  txt(DATA.film.title_zh, W / 2, 480, { size: 92, fam: F.zh, w: 900, align: 'center', c: C.white, a: ta * clamp(p * 1.6), ab: 4 });
  txt(scramble('FINITE ALWAYS LEAVES A GAP', p, 5), W / 2, 580, { size: 46, fam: F.orb, w: 900, align: 'center', c: C.white, a: ta, ls: 5, ab: 2 });
  txt('FACES · POINTER · TWO CELLS · CEILING · TAIL · LIMITS', W / 2, 660, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.mag, a: ta * 0.9, ls: 6 });
}

/* ======================================================================= */
/*                              scene 1 · FLAT FACES                         */
/* ======================================================================= */
const BL_V = { cx: 640, cy: 540, R: 300, yaw: -0.5, el: 0.32 };
/* the face shown for frequency f: one of largest gap, seen edge-on at the upper right of the silhouette (at the
   view's middle yaw), so that its gap shows as a radial segment between the flat face and the sphere's outline */
const BL_FACE = {};
function blFace(f) {
  if (BL_FACE[f] != null) return BL_FACE[f];
  const g = PR_GEO[f], V = prView(0, 0, 1, BL_V.yaw + 0.15, BL_V.el);
  let best = -1, bd = Infinity;
  g.faces.forEach((fc, i) => {
    if (g.gaps[i] < g.gap - 1e-9) return;
    const q = V(g.normals[i]), score = Math.abs(q[2]) * 3 + Math.hypot(q[0] - 0.6, q[1] + 0.6);
    if (q[2] < 0 && score < bd) { bd = score; best = i; }
  });
  return (BL_FACE[f] = best);
}
/* a magnified cut through the centre of a face: the face is the chord, the sphere the arc, the gap the magenta sagitta */
function blCut(x, y, w, h, gap, a) {
  if (a <= 0.003) return;
  panel(x, y, w, h, a, C.cyan, 'CUT THROUGH A FACE · 过面心的截面（同一放大倍数）');
  /* one magnification for all three polyhedra: the icosahedron's face spans 76% of the panel */
  const g1 = 1 - Math.sqrt((5 + 2 * Math.sqrt(5)) / 15), k = (w * 0.38) / Math.sqrt(1 - (1 - g1) * (1 - g1));
  const d = 1 - gap, half = Math.sqrt(1 - d * d), cx = x + w / 2;
  /* the chord sits at height base; the arc's top at base − gap·k */
  const base = y + h - 40, top = base - gap * k, oy = base + d * k;
  const al = Math.asin(half);
  ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(cx, oy, k, -Math.PI / 2 - al * 1.08, -Math.PI / 2 + al * 1.08); ctx.stroke(); ctx.restore();
  line(cx - half * k, base, cx + half * k, base, C.vio, a, 4);
  line(cx, base, cx, top, C.mag, a, 5);
  dot(cx, base, 8, 'g', a);
  txt(gap.toFixed(4), cx, top - 14, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.mag, a });
  txt('sphere · 球面', x + 20, y + 70, { size: 18, fam: F.zh, w: 700, c: C.cyan, a });
  txt('flat face · 平面', x + 20, y + h - 14, { size: 18, fam: F.zh, w: 700, c: C.vio, a });
}
SCENES.ball = S => {
  const u = S.u;
  prTitle(S);
  const a = clamp((u - lineAt(S, 0).s + 0.3) / 0.7) * clamp((S.d - u) / 0.5);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [3, null, 'argued']]);
  const t42 = phraseAt(S, 2, 'Forty-two'), t162 = phraseAt(S, 2, 'a hundred and sixty-two');
  const fi = u < t42 ? 0 : u < t162 ? 1 : 2, f = PR_FREQ[fi], g = PR_GEO[f];
  const flash = Math.max(0, 1 - Math.abs(u - (fi === 1 ? t42 : fi === 2 ? t162 : -9)) / 0.35);
  const V = prView(BL_V.cx, BL_V.cy, BL_V.R, BL_V.yaw + 0.012 * u, BL_V.el);
  const ga = Q(S, 1, "face's centre", 0.8);
  const fc = blFace(f), n = g.normals[fc], foot = v3.sc(n, 1 - g.gaps[fc]);
  const sh = prShot('ball', V, [300, 200, 680, 680]);
  sh.begin();
  sh.glass('shell', [0, 0, 0], 1, { color: C.cyan, alpha: 0.1, rim: 0.55 });
  sh.poly('geo' + f, { vertices: g.vertices, faces: g.faces }, { color: C.vio, edges: C.white });
  if (ga > 0.01) {
    sh.line([foot, n], { color: C.mag, width: 5, alpha: ga });
    sh.bead(foot, { color: C.now, r: 8, alpha: ga });
    sh.bead(n, { color: C.mag, r: 6, alpha: ga });
  }
  sh.end(a);
  if (flash > 0) ring(BL_V.cx, BL_V.cy, BL_V.R * (1 + 0.06 * (1 - flash)), C.white, a * flash * 0.6, 3);
  if (ga > 0.01) {
    const pa = sh.anchor(n);
    line(pa.x + 6, pa.y - 6, pa.x + 60, pa.y - 60, C.mag, a * ga * 0.8, 2);
    txt(`gap ${g.gap.toFixed(4)}`, pa.x + 66, pa.y - 66, { size: 26, fam: F.mono, w: 700, c: C.mag, a: a * ga });
  }
  blCut(1140, 570, 660, 210, g.gap, a * ga * (1 - at(S, 3, 0.4)));
  txt('glass sphere · 玻璃球面', BL_V.cx, BL_V.cy + BL_V.R + 46, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: a * 0.85 });
  /* the readout */
  const rows = [[12, 20, 0], [42, 80, 1], [162, 320, 2]];
  panel(1140, 210, 660, 330, a, C.cyan, 'CORNERS · 角   →   GAP · 缝');
  rows.forEach(([nv, nf, k]) => {
    const ra = a * (k === 0 ? Q(S, 0, 'twelve corners', 0.6) : k === 1 ? clamp((u - t42) / 0.5) : clamp((u - t162) / 0.5));
    if (ra <= 0.003) return;
    const y = 300 + k * 72, cur = k === fi, gap = PR_GEO[PR_FREQ[k]].gap;
    txt(`${nv}`, 1180, y, { size: 34, fam: F.mono, w: 700, c: cur ? C.now : C.white, a: ra });
    txt(`${nf} faces · 面`, 1290, y, { size: 22, fam: F.zh, w: 700, c: C.dim, a: ra });
    txt(gap.toFixed(4), 1760, y, { size: 34, fam: F.mono, w: 700, align: 'right', c: C.mag, a: ra * (k === 0 ? ga : 1) });
  });
  txt('gap = 1 − nearest face distance · 缝 = 1 − 最近面距', 1160, 520, { size: 18, fam: F.zh, w: 700, c: C.dim, a: a * ga });
  /* line 3: the question */
  const qa = a * at(S, 3, 0.6);
  if (qa > 0.003) {
    panel(1140, 580, 660, 200, qa, C.argued, 'THE IDOL · 偶像');
    txt('finite steps  →  a true ball ?', 1170, 660, { size: 30, fam: F.mono, w: 700, c: C.argued, a: qa });
    txt('有限步，真能得到一个球？', 1170, 720, { size: 30, fam: F.zh, w: 700, c: C.white, a: qa });
  }
};

/* ======================================================================= */
/*                              scene 2 · THE POINTER                        */
/* ======================================================================= */
const PT = { x0: 300, cw: 120, hs: 300, yA: 470, yB: 760 };
SCENES.pointer = S => {
  const u = S.u, a = prFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, 'like two stencils', 'argued'], [2, 'that overlap', 'computed']]);
  const shift = ease(Q(S, 1, 'slide the pointer', 1.0));
  const lay = ease(Q(S, 2, 'Stack the copy', 1.2));
  const ca = PR_C.length;
  /* cell indices under the pointer */
  for (let k = 0; k <= ca; k++) txt(`${k}`, PT.x0 + (k + 0.5) * PT.cw, PT.yA + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: a * 0.8 });
  /* the original (branch q = 0) */
  prBars(PT.x0, PT.yA, PR_C.concat([0]), PT.cw, PT.hs, C.cyan, a, { cells: true });
  txt('c = (1, 2, 3, 2, 1) / √19', PT.x0, 196, { size: 28, fam: F.math, w: 700, c: C.cyan, a });
  txt('amplitudes · 振幅', PT.x0, 236, { size: 20, fam: F.zh, w: 700, c: C.dim, a });
  const ba = a * Q(S, 1, 'To record', 0.6);
  if (ba > 0.003) {
    txt('branch q = 0 · 分支', PT.x0 - 20, PT.yA - 20, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: ba });
    /* the copy (branch q = 1): slides one cell right, then rises onto the original */
    const yc = lerp(PT.yB, PT.yA, lay), xc = PT.x0 + PT.cw * shift;
    prBars(xc, yc, PR_C, PT.cw, PT.hs, C.mag, ba, { cells: lay < 0.5, outline: true });
    txt('branch q = 1 · 分支', PT.x0 - 20, yc - 20, { size: 20, fam: F.zh, w: 700, align: 'right', c: C.mag, a: ba * (1 - lay) });
    if (shift > 0.02 && lay < 0.98) { arrow(PT.x0 + 30, yc + 40, PT.x0 + 30 + PT.cw * shift, yc + 40, C.mag, ba * (1 - lay), 2.5); txt('shift 1 · 平移一格', PT.x0 + 160, yc + 48, { size: 20, fam: F.zh, w: 700, c: C.mag, a: ba * (1 - lay) }); }
  }
  /* line 2: products cell by cell, and their sum */
  const pa = a * Q(S, 2, 'that overlap', 0.6);
  if (lay > 0.98) {
    txt('two stencils · 两张镂空板（比方）', 1220, 196, { size: 22, fam: F.zh, w: 700, c: C.argued, a: a * clamp((lay - 0.98) * 50) * (1 - at(S, 3, 0.6)) });
    const prod = [2, 6, 6, 2];
    prod.forEach((v, i) => txt(`${v}`, PT.x0 + (i + 1.5) * PT.cw, PT.yA + 84, { size: 30, fam: F.mono, w: 700, align: 'center', c: C.white, a: pa }));
    txt('copy q = 1 · 副本', PT.x0 + 5 * PT.cw + 4, PT.yA - 100, { size: 20, fam: F.zh, w: 700, c: C.mag, a: pa });
    prRich([['γ(1) = (2 + 6 + 6 + 2) / 19 = 16/19 = ', C.white], [(16 / 19).toFixed(4), C.now]], PT.x0, PT.yA + 160, { size: 32, a: pa });
    txt('overlap · 重叠量', PT.x0, PT.yA + 204, { size: 20, fam: F.zh, w: 700, c: C.dim, a: pa });
  }
  /* right: what the overlap does */
  panel(1200, 240, 600, 470, a * Q(S, 2, 'that overlap', 0.6), C.cyan, 'OVERLAP · 重叠');
  const ga = a * Q(S, 2, 'that overlap', 0.6);
  if (ga > 0.003) {
    const gx0 = 1240, gx1 = 1760, gy = 360, g = 16 / 19;
    line(gx0, gy, gx1, gy, C.dim, ga, 2);
    for (const [v, s] of [[0, '0'], [1, '1']]) { line(lerp(gx0, gx1, v), gy - 12, lerp(gx0, gx1, v), gy + 12, C.white, ga, 2); txt(s, lerp(gx0, gx1, v), gy + 44, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.white, a: ga }); }
    line(gx0, gy, lerp(gx0, gx1, g), gy, C.cyan, ga, 6);
    dot(lerp(gx0, gx1, g), gy, 12, 'g', ga);
    txt(g.toFixed(4), lerp(gx0, gx1, g), gy - 26, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: ga });
    const la = a * at(S, 3, 0.6);
    if (la > 0.003) {
      txt('γ = 1 : records identical · 分不开', 1230, 470, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
      txt('interference survives · 干涉原样保留', 1230, 508, { size: 22, fam: F.zh, w: 700, c: C.cyan, a: la });
      const da = a * at(S, 3, 0.6, 1.2);
      txt('γ < 1 : coherence × γ · 相干项乘 γ', 1230, 590, { size: 22, fam: F.zh, w: 700, c: C.white, a: da });
      txt('damped · 被压低', 1230, 628, { size: 22, fam: F.zh, w: 700, c: C.mag, a: da });
      line(lerp(gx0, gx1, g), gy + 18, gx1, gy + 18, C.mag, da, 4);
    }
  }
};

/* ======================================================================= */
/*                               scene 3 · TWO CELLS                         */
/* ======================================================================= */
const HD = { x0: 200, cw: 130, hs: 260, base: 560, kx: 820, ky: 600, kR: 220, gx: 1160, gy: 640, gw: 600, gh: 420 };
SCENES.hand = S => {
  const u = S.u, a = prFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed']]);
  /* the knob: φ from 20° to 75° and back to 45° during line 2 */
  const s = at(S, 2, 3.2);
  const deg = s < 0.5 ? 20 + 55 * ease(s / 0.5) : 75 - 30 * ease((s - 0.5) / 0.5);
  const ph = deg * Math.PI / 180, A = Math.cos(ph), B = Math.sin(ph), ab = A * B;
  const L3 = at(S, 3, 0.8);
  /* left: the two cells and the copy shifted by one */
  const sa = a * Q(S, 1, 'Shift it', 0.8);
  prBars(HD.x0, HD.base, [A, B, 0], HD.cw, HD.hs, C.cyan, a);
  txt('a', HD.x0 + 0.5 * HD.cw, HD.base + 40, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  txt('b', HD.x0 + 1.5 * HD.cw, HD.base + 40, { size: 30, fam: F.math, w: 700, align: 'center', c: C.cyan, a });
  txt('a² + b² = 1', HD.x0, 220, { size: 32, fam: F.math, w: 700, c: C.white, a });
  if (sa > 0.003) {
    prBars(HD.x0 + HD.cw * ease(sa), HD.base, [A, B], HD.cw, HD.hs, C.mag, sa, { cells: false, outline: true });
    const ov = a * Q(S, 1, 'Only one cell', 0.6);
    box(HD.x0 + HD.cw + 6, HD.base - HD.hs - 10, HD.cw - 12, HD.hs + 20, C.now, ov, 2.5);
    prRich([['overlap = ', C.white], ['a · b', C.now], [` = ${ab.toFixed(3)}`, C.now]], HD.x0, HD.base + 110, { size: 32, a: a * Q(S, 1, 'the overlap is', 0.6) });
  }
  /* middle: the knob (a, b) on the quarter circle */
  const ka = a * at(S, 0, 0.8, 1.0);
  if (ka > 0.003) {
    const { kx, ky, kR } = HD;
    line(kx, ky, kx + kR * 1.15, ky, C.dim, ka, 1.5); line(kx, ky, kx, ky - kR * 1.15, C.dim, ka, 1.5);
    ctx.save(); ctx.globalAlpha = ka; ctx.strokeStyle = C.white; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(kx, ky, kR, -Math.PI / 2, 0); ctx.stroke(); ctx.restore();
    const px = kx + kR * A, py = ky - kR * B;
    line(kx, ky, px, py, C.now, ka, 3);
    dot(px, py, 12, 'g', ka);
    txt(`${Math.round(deg)}°`, px + 18, py - 18, { size: 22, fam: F.mono, w: 700, c: C.now, a: ka });
    txt('a', kx + kR * 1.15 + 10, ky + 8, { size: 24, fam: F.math, w: 700, c: C.dim, a: ka });
    txt('b', kx - 8, ky - kR * 1.15 - 12, { size: 24, fam: F.math, w: 700, c: C.dim, a: ka });
    txt('knob · 旋钮', kx, ky + 50, { size: 22, fam: F.zh, w: 700, c: C.white, a: ka });
  }
  /* right: the curve ab against φ, then the two polygons */
  const ca = a * at(S, 2, 0.6) * (1 - L3);
  if (ca > 0.003) {
    const { gx, gy, gw, gh } = HD, X = d => gx + gw * d / 90, Y = v => gy - gh * v / 0.6;
    line(gx, gy, gx + gw, gy, C.dim, ca, 1.5); line(gx, gy, gx, gy - gh, C.dim, ca, 1.5);
    ctx.save(); ctx.setLineDash([8, 8]); line(gx, Y(0.5), gx + gw, Y(0.5), C.mag, ca * 0.7, 2); ctx.restore();
    txt('½', gx - 16, Y(0.5) + 9, { size: 28, fam: F.math, w: 700, align: 'right', c: C.mag, a: ca });
    ctx.save(); ctx.globalAlpha = ca; ctx.strokeStyle = C.cyan; ctx.lineWidth = 3.5; ctx.beginPath();
    for (let i = 0; i <= 90; i++) { const v = Math.cos(i * Math.PI / 180) * Math.sin(i * Math.PI / 180); i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v)); }
    ctx.stroke(); ctx.restore();
    dot(X(deg), Y(ab), 12, 'g', ca);
    for (const d of [0, 45, 90]) txt(`${d}°`, X(d), gy + 34, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca });
    txt('a · b', gx + 10, gy - gh - 10, { size: 24, fam: F.math, w: 700, c: C.cyan, a: ca });
    const pk = ca * Q(S, 2, 'when a equals b', 0.6);
    txt('max ½ at a = b', X(45), Y(0.5) - 22, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.now, a: pk });
    prRich([['(a − b)² ≥ 0  ⇒  ab ≤ ½(a² + b²) = ½', C.white]], gx, 230, { size: 28, a: pk });
  }
  /* line 3: triangle and square */
  if (L3 > 0.003) {
    const la = a * L3, ta = a * Q(S, 3, 'One half', 0.6), qa = a * Q(S, 3, 'Three cells', 0.6);
    prPolygon(1270, 470, 140, 3, ta);
    txt('2 cells · 两格', 1270, 680, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: ta });
    txt('cos 60° = 0.5000', 1270, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ta });
    prPolygon(1580, 470, 140, 4, qa);
    txt('3 cells · 三格', 1580, 680, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.white, a: qa });
    txt('cos 45° = 0.7071', 1580, 720, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: qa });
    txt('best (1/2, 1/√2, 1/2)', 1580, 760, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: qa });
    txt('centre-to-side · 边心距', 1425, 250,{ size: 22, fam: F.zh, w: 700, align: 'center', c: C.cyan, a: la });
  }
};

/* ======================================================================= */
/*                              scene 4 · THE CEILING                        */
/* ======================================================================= */
const CE_X = [340, 570, 800, 1020], CE_Y = 400, CE_R = 92;
SCENES.ceiling = S => {
  const u = S.u, a = prFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, 'Lean checks', 'lean'], [3, null, 'computed']]);
  /* left: the ladder of polygons, m = 1, 2, 4, 10 (ℓ = 1: 2, 3, 5, 11 cells) */
  const lad = Q(S, 1, 'Longer pointers', 2.4);
  const fa = a * at(S, 3, 0.6);
  txt('ℓ = 1', 120, 230, { size: 26, fam: F.math, w: 700, c: C.white, a: a * lad });
  PR_M.forEach((m, i) => {
    const ca = a * (i === 0 ? Math.max(at(S, 0, 0.8, 1.5), clamp(lad * 4)) : clamp(lad * 4 - i));
    if (ca <= 0.003) return;
    prPolygon(CE_X[i], CE_Y, CE_R, m + 2, ca, { w: 2, lw: 3 });
    txt(`${m + 1} cells · 格`, CE_X[i], CE_Y + CE_R + 50, { size: 20, fam: F.zh, w: 700, align: 'center', c: C.white, a: ca });
    txt(`m = ${m}`, CE_X[i], CE_Y - CE_R - 22, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.dim, a: ca });
    txt(prCeil(m).toFixed(4), CE_X[i], CE_Y + CE_R + 90, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, a: ca });
    const cur = (i === 0 || i === 3) && Q(S, 3, i === 0 ? 'A quarter' : 'for eleven', 0.4) > 0;
    txt(prFloor(m).toFixed(4), CE_X[i], CE_Y + CE_R + 170, { size: 28, fam: F.mono, w: 700, align: 'center', c: cur ? C.now : C.mag, a: fa * (i === 0 ? Q(S, 3, 'A quarter', 0.5) : i === 3 ? Q(S, 3, 'for eleven', 0.5) : Q(S, 3, 'A quarter', 0.5, 0.6)) });
  });
  txt('ceiling · 上限', 210, CE_Y + CE_R + 90, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.cyan, a: a * lad });
  txt('floor · 下界', 210, CE_Y + CE_R + 170, { size: 18, fam: F.zh, w: 700, align: 'right', c: C.mag, a: fa });
  txt('circle = 1, never reached · 圆是 1，永远够不到', 590, 220, { size: 22, fam: F.zh, w: 700, align: 'center', c: C.mag, a: a * Q(S, 1, 'no polygon', 0.6) });
  /* right top: the lemma */
  const la = a * Q(S, 0, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(1130, 180, 670, 250, la, C.lean, 'THE CEILING · 上限');
    txt('any N + 1 cells, any shift ℓ ≠ 0', 1156, 250, { size: 22, fam: F.mono, w: 700, c: C.white, a: la });
    txt('任意有限指针、任意非零平移', 1156, 284, { size: 22, fam: F.zh, w: 700, c: C.white, a: la });
    prRich([['|γ(ℓ)| ', C.white], ['≤', C.lean], [' cos(π/(m + 2))', C.lean]], 1156, 340, { size: 32, a: la });
    txt('m = ⌊N / |ℓ|⌋', 1580, 340, { size: 24, fam: F.math, w: 700, c: C.white, a: la });
    prLean(1156, 400, PR_LEAN.coefficient_gamma_le_cosine, la, { size: 17 });
  }
  /* right bottom: the theorem */
  const ta = a * Q(S, 2, 'Lean checks the price', 0.6);
  if (ta > 0.003) {
    panel(1130, 460, 670, 340, ta, C.lean, 'THE PRICE · 代价');
    txt('the record is a quantum channel C:', 1156, 528, { size: 21, fam: F.mono, w: 700, c: C.white, a: ta });
    prRich([['(Cρ)ᵢⱼ = γ(qᵢ − qⱼ) ρᵢⱼ', C.white]], 1156, 572, { size: 26, a: ta });
    const la2 = ta * Q(S, 2, 'two branch labels differ', 0.6);
    prRich([['two labels: qᵢ − qⱼ = ℓ ≠ 0', C.white]], 1156, 616, { size: 22, a: la2 });
    txt('两个分支标签相差 ℓ ≠ 0', 1530, 616, { size: 18, fam: F.zh, w: 700, c: C.white, a: la2 });
    const ra = ta * Q(S, 2, 'every recovery channel', 0.6);
    txt('every recovery channel R · 任意恢复信道', 1156, 658, { size: 21, fam: F.zh, w: 700, c: C.white, a: ra });
    prRich([['sup{T(R(Cρ), ρ) : ρ} ', C.white], ['≥', C.lean], [' ½(1 − cos(π/(m+2)))', C.lean], [' > 0', C.lean]], 1150, 702, { size: 22, a: ra });
    txt('worst input · 最坏的输入', 1156, 734, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ra });
    prLean(1156, 776, PR_LEAN.finite_record_cosine_obstruction, ta, { size: 17 });
  }
  stamp('NEVER ZERO', 600, 800, Q(S, 3, 'never zero', 0.5) * (1 - at(S, 3, 0.4, 6)), C.lean, 30, -0.05);
};

/* ======================================================================= */
/*                                scene 5 · THE TAIL                         */
/* ======================================================================= */
const TL_C = { x0: 860, x1: 1760, y0: 800, y1: 360, lo: -8, hi: 1 };
SCENES.tail = S => {
  const u = S.u, a = prFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [1, 'Lean checks', 'lean'], [2, null, 'computed']]);
  /* left: the π pulse */
  panel(120, 190, 620, 300, a, C.cyan, 'π PULSE · π 脉冲');
  prRich([['z = −i (π/2) σₓ,   ‖z‖ = π/2 = r', C.white]], 146, 262, { size: 26, a });
  prRich([['U = exp z = −i σₓ', C.white]], 146, 314, { size: 26, a });
  txt('flips |0⟩ ↔ |1⟩ · 把比特翻过来', 146, 356, { size: 22, fam: F.zh, w: 700, c: C.dim, a });
  const ka = a * Q(S, 0, 'from n terms', 0.6);
  prRich([['keep  Σₖ₌₀ⁿ⁻¹ zᵏ / k!', C.cyan]], 146, 420, { size: 26, a: ka });
  txt('drop the rest · 其余丢掉', 146, 460, { size: 22, fam: F.zh, w: 700, c: C.mag, a: ka });
  /* left bottom: the race of the power and the factorial */
  const ra = a * at(S, 3, 0.6);
  if (ra > 0.003) {
    panel(120, 520, 620, 280, ra, C.cyan, 'THE RACE · 赛跑');
    PR_N.forEach((n, i) => {
      const y = 600 + i * 62;
      txt(`n = ${n}`, 146, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: ra });
      txt(`rⁿ ${Math.pow(PR_R, n).toFixed(n === 4 ? 2 : n === 8 ? 1 : 0)}`, 290, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: ra });
      txt(`n! ${fact(n)}`, 470, y, { size: 24, fam: F.mono, w: 700, c: C.now, a: ra * Q(S, 3, 'outruns', 0.5) });
    });
  }
  /* right top: the lemma */
  const la = a * Q(S, 1, 'Lean checks', 0.6);
  if (la > 0.003) {
    panel(820, 170, 980, 150, la, C.lean, 'ANY COMPLETE NORMED ALGEBRA, ‖1‖ = 1 · 任意完备赋范代数   ‖z‖ ≤ r');
    prRich([['‖exp z − Σₖ₌₀ⁿ⁻¹ zᵏ/k!‖ ', C.white], ['≤', C.lean], ['  rⁿ / n! · eʳ', C.lean]], 846, 248, { size: 32, a: la });
    prLean(846, 296, PR_LEAN.exp_tail_le, la, { size: 17 });
  }
  /* right: the log chart */
  /* the empty chart (axes) from the first line; its bars from line 2 */
  const ga = a * at(S, 0, 0.8, 1.2);
  if (ga > 0.003) {
    const { x0, x1, y0, y1, lo, hi } = TL_C, Y = v => y0 + (y1 - y0) * (Math.log10(v) - lo) / (hi - lo);
    line(x0, y0, x1, y0, C.dim, ga, 1.5); line(x0, y0, x0, y1, C.dim, ga, 1.5);
    for (let e = lo; e <= hi; e += 3) { line(x0 - 8, Y(Math.pow(10, e)), x0, Y(Math.pow(10, e)), C.dim, ga, 1.5); txt(`10${prSup(e)}`, x0 - 14, Y(Math.pow(10, e)) + 8, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.dim, a: ga }); }
    txt('log scale · 对数刻度', x0 + 10, y1 - 10, { size: 18, fam: F.zh, w: 700, c: C.dim, a: ga });
    PR_N.forEach((n, i) => {
      const ba = ga * clamp(at(S, 2, 1.8) * 3 - i * 0.8);
      if (ba <= 0.003) return;
      const cx = x0 + 160 + i * 280, bw = 70;
      const yb = Y(prBound(n)), ye = Y(prTail(n));
      box(cx - bw - 14, yb, bw, y0 - yb, C.cyan, ba, 2.5);
      txt(prSci(prBound(n)), cx - 14, yb - 12, { size: 20, fam: F.mono, w: 700, align: 'right', c: C.cyan, a: ba });
      const ea = ga * Q(S, 3, 'The true errors', 0.6) * clamp(ba);
      if (ea > 0.003) {
        ctx.save(); ctx.globalAlpha = ea * 0.85; ctx.fillStyle = C.mag; ctx.fillRect(cx + 14, ye, bw, y0 - ye); ctx.restore();
        txt(prSci(prTail(n)), cx + 14, ye - 12, { size: 20, fam: F.mono, w: 700, c: C.mag, a: ea });
      }
      txt(`n = ${n}`, cx, y0 + 34, { size: 22, fam: F.mono, w: 700, align: 'center', c: C.white, a: ba });
    });
    txt('ceiling · 上界', x1 - 230, y1 + 40, { size: 20, fam: F.zh, w: 700, c: C.cyan, a: ga * at(S, 2, 0.6) });
    txt('true error · 真实误差', x1 - 230, y1 + 72, { size: 20, fam: F.zh, w: 700, c: C.mag, a: ga * Q(S, 3, 'The true errors', 0.6) });
  }
};

/* ======================================================================= */
/*                         scene 6 · WHAT IT DOES NOT SAY                    */
/* ======================================================================= */
SCENES.edge = S => {
  const u = S.u, a = prFade(S);
  if (a <= 0) return;
  badgeQ(S, [[0, null, 'computed'], [2, null, 'argued']]);
  const rows = [
    { k: 0, col: C.cyan, en: 'the floor is for the worst input', zh: '下界只管最坏的输入', note: 'diagonal states: untouched, error 0 · 对角态原样通过，误差为 0' },
    { k: 1, col: C.cyan, en: 'falling floor ≠ falling error', zh: '下界变小 ≠ 误差变小', note: 'c(0) = 1: γ(ℓ) = 0 for every ℓ ≠ 0, any N · 再长也一样' },
    { k: 2, col: C.argued, en: 'one way to record; cosine tail ≠ 0', zh: '一种记录方式；两弧度以内余弦尾巴不为零', note: 'textbook result, not formalized here · 教科书结果，本书未形式化' }
  ];
  rows.forEach((rw, i) => {
    const ra = a * at(S, rw.k, 0.6);
    if (ra <= 0.003) return;
    const y = 200 + i * 210;
    panel(860, y, 940, 180, ra, rw.col);
    txt(rw.en, 890, y + 56, { size: 30, fam: F.mono, w: 700, c: rw.col, a: ra });
    txt(rw.zh, 890, y + 104, { size: 28, fam: F.zh, w: 700, c: C.white, a: ra });
    txt(rw.note, 890, y + 148, { size: 20, fam: F.zh, w: 700, c: rw.col === C.cyan ? C.dim : C.argued, a: ra * 0.95 });
  });
  /* left: the picture of the current row */
  const r0 = a * at(S, 0, 0.6) * (1 - at(S, 1, 0.5)), r1 = a * at(S, 1, 0.6, 0.3) * (1 - at(S, 2, 0.5)), r2 = a * at(S, 2, 0.6, 0.3);
  if (r0 > 0.003) {
    const mat = (x, y, al) => {
      line(x, y - 50, x, y + 80, C.white, al, 2.5); line(x + 230, y - 50, x + 230, y + 80, C.white, al, 2.5);
      txt('0.7', x + 60, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: al });
      txt('0', x + 170, y, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.dim, a: al });
      txt('0', x + 60, y + 56, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.dim, a: al });
      txt('0.3', x + 170, y + 56, { size: 32, fam: F.mono, w: 700, align: 'center', c: C.white, a: al });
    };
    mat(160, 450, r0);
    arrow(420, 470, 520, 470, C.white, r0, 3);
    txt('record C', 470, 440, { size: 20, fam: F.mono, w: 700, align: 'center', c: C.white, a: r0 });
    mat(550, 450, r0);
    txt('γ only touches the off-diagonal zeros', 160, 620, { size: 22, fam: F.mono, w: 700, c: C.dim, a: r0 });
    txt('只乘在非对角的 0 上', 160, 656, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r0 });
  }
  if (r1 > 0.003) {
    const cw = 80, x0 = 140;
    prBars(x0, 470, [1, 0, 0, 0, 0, 0, 0, 0], cw, 200, C.cyan, r1);
    prBars(x0 + cw, 470, [1], cw, 200, C.mag, r1, { cells: false, outline: true });
    txt('c(0) = 1:  γ(ℓ) = 0 for every ℓ ≠ 0', x0, 560, { size: 28, fam: F.math, w: 700, c: C.now, a: r1 });
    /* the floor of the theorem falls with N (ℓ = 1, m = N), the channel and its error do not */
    [[1, 0], [4, 1], [10, 2]].forEach(([N, i]) => {
      const y = 620 + i * 40, fa = r1 * at(S, 1, 0.5, 1.0 + 0.6 * i);
      txt(`N = ${N}`, x0, y, { size: 24, fam: F.mono, w: 700, c: C.white, a: fa });
      txt(`floor ${prFloor(N).toFixed(4)}`, x0 + 120, y, { size: 24, fam: F.mono, w: 700, c: C.mag, a: fa });
      txt('channel, error: same', x0 + 360, y, { size: 24, fam: F.mono, w: 700, c: C.cyan, a: fa });
    });
    txt('下界在降，信道与误差不变', x0, 760, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r1 * at(S, 1, 0.5, 2.4) });
  }
  if (r2 > 0.003) {
    txt('π pulse: U = cos(π/2) − i sin(π/2) σₓ', 160, 380, { size: 26, fam: F.math, w: 700, c: C.white, a: r2 });
    txt('its cosine part is the cosine series', 160, 420, { size: 20, fam: F.mono, w: 700, c: C.dim, a: r2 });
    txt('脉冲的余弦部分就是余弦级数', 160, 452, { size: 20, fam: F.zh, w: 700, c: C.dim, a: r2 });
    txt('cosine tail ≠ 0 for 0 < θ ≤ 2 rad', 160, 520, { size: 28, fam: F.math, w: 700, c: C.argued, a: r2 });
    txt('literature · 文献结果，两弧度以内', 160, 562, { size: 22, fam: F.zh, w: 700, c: C.argued, a: r2 });
    txt('for the series tail, Lean gives only a ceiling', 160, 630, { size: 22, fam: F.mono, w: 700, c: C.dim, a: r2 });
    txt('对级数尾巴，Lean 只给上界', 160, 666, { size: 22, fam: F.zh, w: 700, c: C.dim, a: r2 });
  }
};

/* ======================================================================= */
/*                                scene 7 · LEDGER                           */
/* ======================================================================= */
SCENES.close = S => {
  badgeQ(S, [[0, null, 'lean']]);
  closingCard(S, { from: 0.1, y: 260 });
};

/* ======================================================================= */
/*                                   poster                                  */
/* ======================================================================= */
FILM.poster = () => {
  const sc = TL.scenes[0], t = sc.end - 1.0;
  background(t, sc, 0, 6);
  drawHyper(CUBE4, [[0, 3, t * 0.21], [1, 2, t * 0.13], [2, 3, t * 0.17]], { scale: 1.2, a: 0.14, cx: 1400, cy: 420, camZ: 7, lw: 1.3, dots: false });
  /* the icosahedron in its sphere, drawn as a wire, and the gap at one face centre */
  const g = PR_GEO[1] || prGeodesic(1), V = prView(560, 540, 330, -0.5, 0.32);
  ring(560, 540, 330, C.cyan, 0.6, 2.5);
  const seen = new Set();
  g.faces.forEach(fc => fc.forEach((p, k) => {
    const q = fc[(k + 1) % 3], key = Math.min(p, q) + ',' + Math.max(p, q);
    if (seen.has(key)) return; seen.add(key);
    const A = V(g.vertices[p]), B = V(g.vertices[q]), back = A[2] + B[2] > 0;
    line(A[0], A[1], B[0], B[1], C.vio, back ? 0.3 : 0.95, back ? 1.5 : 3);
  }));
  const fi = blFace(1), n = g.normals[fi], foot = v3.sc(n, 1 - g.gaps[fi]), P = V(foot), Qn = V(n);
  line(P[0], P[1], Qn[0], Qn[1], C.mag, 1, 6);
  dot(P[0], P[1], 12, 'g', 1);
  txt(DATA.film.title_zh, 1340, 430, { size: 76, fam: F.zh, w: 900, align: 'center', c: C.white, ab: 4 });
  txt('FINITE ALWAYS', 1340, 528, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 3, ls: 5 });
  txt('LEAVES A GAP', 1340, 590, { size: 48, fam: F.orb, w: 900, align: 'center', c: C.white, ab: 2, ls: 5 });
  prRich([['|γ(ℓ)| ', C.white], ['≤', C.lean], [' cos(π/(m + 2)) < 1', C.white]], 1340, 690, { size: 40, align: 'center', ab: 1 });
  bloom(0.6);
  txt(`${DATA.book.code} · FILM`, 1340, 770, { size: 24, fam: F.mono, w: 700, align: 'center', c: C.cyan, ls: 8 });
  txt(`${DATA.book.title.zh} · ${DATA.book.title.en}`, W / 2, 1010, { size: 26, fam: F.zh, w: 700, align: 'center', c: C.white, a: 0.9 });
  hud(t, Math.round(t * 30), 0, sc);
  post(0);
};
