/* REVERSAL//CASCADE · 反者道之动：双无限路径切口、来路对角化与概念开维级联
   Dual-infinite path cut, diagonal escape, and the concept cascade.
   One lit 3D stage (kit.solid) and five scenes on one rail (the flow phase τ, which moves wavefronts, phases, a probe
   and pulses but no computed number):
     ladder   comparison anchors in ℝ⁴: a₁ = x = e₁ and, past each threshold I_cmp = 0.5, 1.5, 2.5, one more anchor
              a_{k+1} = cos ε e₁ + sin ε e_{k+1}, ε = 18°(1 + I_cmp) (the page's parameterisation). The Gram determinants
              come from the explicit two-anchor, three-anchor and 4 × 4 formulas: det G₂ = sin²ε, det G₃ = sin⁴ε,
              det G₄ = sin⁶ε. The stage draws each anchor's residual off x (sin ε along a fresh axis): the point x, the
              cyan segment, the magenta triangle and the violet tetrahedron, of length, area and volume √det G₂,
              √det G₃ / 2 and √det G₄ / 6; the magenta arrows are the residuals leaving the old concept.
     time     from I_cmp = 3.5 the twins ψ₊ and ψ₋ = −ψ₊ share the centroid of the tetrahedron. The finite arena is ψ₊
              at the four vertices plus the twins; the readouts x, y, z and |ψ|² leave 2 ordered escape pairs, and the
              phase cut T (drawn as a helix rising along a fourth axis) leaves 0.
     arrival  the K × K table T[r][c] ∈ {0, 1, 2, 3} of phase quadrants of the listed paths Γ_r → x, as dials on
              lanes that funnel into x, and the violet diagonal path Γ_diag[k] = T[k][k] + 2 (mod 4).
     cut      M = span((3, 4)/5) in ℝ²: P_M + P_M⊥ = I and P_M P_M⊥ = 0 in integers over 25;
              P_eff(κ₋) = P_M + (1 − κ₋) P_M⊥. Cyan paths converge on x inside the wall, magenta paths turn back
              outside it; as κ₋ → 0 the wall and the concept dissolve into haze. The amber handle on the boundary
              ring sets κ₋.
     cascade  the five concepts side by side; the magenta overflow of each lands as the cyan generator of the next.
   Read-only probe for the browser suite: window.REVERSAL_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, TINY = 1e-12;
  const frac = (x) => x - Math.floor(x);
  const O = [0, 0, 0];
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const subN = (n) => String(n).split('').map((d) => SUBS[+d]).join('');
  const centroid = (pts) => v3.scale(pts.reduce(v3.add, [0, 0, 0]), 1 / pts.length);

  /* ---------- the comparison ladder in ℝ⁴ ---------- */
  const THRESH = [0.5, 1.5, 2.5, 3.5];
  const CONCEPTS = ['point', 'line', 'surface', 'volume', 'time'];
  const CONCEPT_NAME = { point: ['0D 点', '0D point'], line: ['1D 线', '1D line'], surface: ['2D 面', '2D surface'], volume: ['3D 体', '3D volume'], time: ['3+1D 时间', '3+1D time'] };
  const CONCEPT_SHORT = ['0D', '1D', '2D', '3D', '3+1D'];
  const STAGE_I = { point: 0.25, line: 1, surface: 2, volume: 3, time: 3.85 };
  /** Display axes of the residuals: the first new axis to the right (x), the second up (z), the third into depth (y). */
  const AX = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
  /** ε(I_cmp) = 18°(1 + I_cmp): the step of every comparison, the page's parameterisation (MODEL). */
  const stepAngle = (I) => (1 + I) * PI / 10;
  const dot4 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  /** 4 × 4 determinant by Laplace expansion along the first row. */
  function det4(M) {
    let d = 0;
    for (let j = 0; j < 4; j++) {
      const minor = [1, 2, 3].map((i) => [0, 1, 2, 3].filter((c) => c !== j).map((c) => M[i][c]));
      d += (j % 2 ? -1 : 1) * M[0][j] * det3(minor);
    }
    return d;
  }
  function ladderAt(I) {
    const e = stepAngle(I), c = Math.cos(e), s = Math.sin(e);
    const opened = [0, 1, 2].map((k) => I >= THRESH[k]);
    const A = [[1, 0, 0, 0]];
    for (let k = 1; k <= 3; k++) {
      if (opened[k - 1]) { const a = [c, 0, 0, 0]; a[k] = s; A.push(a); } else A.push([1, 0, 0, 0]);   // overlap 1 with x: it is x
    }
    const G = A.map((u) => A.map((w) => dot4(u, w)));
    const detG1 = dot4(A[0], A[0]);
    const detG2 = dot4(A[0], A[0]) * dot4(A[1], A[1]) - dot4(A[0], A[1]) ** 2;          // |u|²|v|² − ⟨u, v⟩²
    const g3 = G.slice(0, 3).map((r) => r.slice(0, 3));
    const detG3 = det3(g3), detG4 = det4(G);
    const dets = [detG1, detG2, detG3, detG4];
    let rank = 0;
    while (rank < 4 && dets[rank] > TINY) rank++;
    // Gram–Schmidt: the residual of each anchor off the span of those before it, and its unit escape normal
    const Q = [], residual = [];
    for (const a of A) {
      let y = a.slice();
      for (const q of Q) { const d = dot4(y, q); y = y.map((v, i) => v - d * q[i]); }
      const h = Math.sqrt(dot4(y, y));
      residual.push(h); Q.push(h > TINY ? y.map((v) => v / h) : [0, 0, 0, 0]);
    }
    const verts = [O.slice()];
    opened.forEach((on, k) => { if (on) verts.push(v3.scale(AX[k], s)); });
    return { I, e, c, s, opened, A, G, dets, rank, residual, normals: Q, chirality: Math.sign(det4(A)), verts,
      threeAnchor: 1 + 2 * G[0][1] * G[1][2] * G[0][2] - G[0][1] ** 2 - G[1][2] ** 2 - G[0][2] ** 2 };
  }

  /* ---------- the finite arena of the time scene: escape pairs before and after the phase cut T ---------- */
  /** |ψ|² of the standing wave at a locus (MODEL); the twins share it. */
  const intensity = (p) => Math.cos(PI * v3.len(p)) ** 2;
  const READ = { x: (st) => st.p[0], y: (st) => st.p[1], z: (st) => st.p[2], amp: (st) => intensity(st.p) * st.sign * st.sign, T: (st) => (st.sign > 0 ? 0 : PI) };
  const CUTS = ['x', 'y', 'z', 'amp', 'T'];
  function arenaAt(lad, I) {
    const twins = I >= THRESH[3] && lad.rank === 4;
    const states = lad.verts.map((p, i) => ({ p, sign: 1, name: `v${i}` }));
    const locus = centroid(lad.verts);
    if (twins) states.push({ p: locus, sign: 1, name: 'ψ₊' }, { p: locus, sign: -1, name: 'ψ₋' });
    const key = (st, cuts) => cuts.map((k) => READ[k](st).toFixed(9)).join('|');
    /** Ordered pairs of distinct states that the readouts `cuts` cannot tell apart: the joint kernel off the diagonal. */
    const kernel = (cuts) => {
      const out = [];
      states.forEach((a, i) => states.forEach((b, j) => { if (i !== j && key(a, cuts) === key(b, cuts)) out.push(`${i}:${j}`); }));
      return out;
    };
    const staircase = [0, 1, 2, 3, 4, 5].map((m) => kernel(CUTS.slice(0, m)).length);
    const without = kernel(CUTS.slice(0, 4)), withT = kernel(CUTS), n = states.length, denom = n * (n - 1);
    return {
      twins, n, locus, states: states.map((st) => ({ name: st.name, p: st.p.slice(), sign: st.sign })), staircase,
      before: without.length, after: withT.length, uniqueCapture: without.length - withT.length,
      rateBefore: denom ? without.length / denom : 0, rateAfter: denom ? withT.length / denom : 0,
      lowersEscape: denom > 0 && withT.length < without.length,
      strictKernel: withT.every((p) => without.includes(p)) && withT.length < without.length, nondegenerate: n >= 2
    };
  }

  /* ---------- the dual cut: M = span((3, 4)/5) in ℝ², integer numerators over 25 ---------- */
  const UM = [3, 4], UQ = [-4, 3], DEN = 25;
  const outer = (u) => [[u[0] * u[0], u[0] * u[1]], [u[1] * u[0], u[1] * u[1]]];
  const mul2 = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  const maxAbs = (M) => Math.max(...M.flat().map(Math.abs));
  const lin2 = (A, a, B, b) => A.map((r, i) => r.map((v, j) => a * v + b * B[i][j]));
  const tr2 = (M) => M[0][0] + M[1][1];
  /** The perpendicular of a plane vector: the orthogonal complement of its span is spanned by it. */
  const perp = (v) => [v[1], -v[0]];
  const H2 = (p) => (p <= 0 || p >= 1 ? 0 : -(p * Math.log2(p) + (1 - p) * Math.log2(1 - p)));
  function cutAt(kappa) {
    const PM = outer(UM), PQ = outer(UQ), Id = [[DEN, 0], [0, DEN]];
    const orthogonalityResidual = Math.max(maxAbs(mul2(PM, PQ)), maxAbs(mul2(PQ, PM))) / (DEN * DEN);
    const completenessResidual = maxAbs(lin2(lin2(PM, 1, PQ, 1), 1, Id, -1)) / DEN;
    const idempotenceResidual = Math.max(maxAbs(lin2(mul2(PM, PM), 1, PM, -DEN)), maxAbs(lin2(mul2(PQ, PQ), 1, PQ, -DEN))) / (DEN * DEN);
    const PMcc = outer(perp(UQ));                       // the projection onto M⊥⊥, from the spanning vector of M⊥
    const doubleComplementError = maxAbs(lin2(PMcc, 1, PM, -1)) / DEN;
    const w = 1 - kappa;
    const trM = tr2(PM) / DEN, trQ = tr2(PQ) / DEN;    // both exactly 1
    // traces of P_eff restricted to each side: Tr(P_eff P_M) = Tr(P_M P_M) + w Tr(P_M⊥ P_M), and so on
    const reach = tr2(mul2(PM, PM)) / (DEN * DEN) + w * tr2(mul2(PQ, PM)) / (DEN * DEN);
    const unreach = tr2(mul2(PM, PQ)) / (DEN * DEN) + w * tr2(mul2(PQ, PQ)) / (DEN * DEN);
    const pBalanced = 1 / (2 - kappa);
    return {
      kappa, PM, PQ, PMcc, den: DEN, Peff: lin2(PM, 1 / DEN, PQ, w / DEN),
      pReachTrace: trM, pUnreachWeight: w * trQ,
      cutContrast: kappa * trQ / trM,                   // the share of the unreachable weight the cut turns back
      contrastFromTraces: (reach - unreach) / reach,
      orthogonalityResidual, completenessResidual, idempotenceResidual, doubleComplementError,
      pBalanced, distinctionBits: 1 - H2(pBalanced)
    };
  }
  const CUT_CURVE = Array.from({ length: 101 }, (_, i) => { const c = cutAt(i / 100); return [i / 100, c.cutContrast, c.distinctionBits]; });

  /* ---------- the arrival table and its diagonal ---------- */
  const twist = (y) => (y + 2) % 4;
  const DZ = 0.34, DX = 0.36, RD = 0.12, X_RIGHT = -0.95;
  const tables = new Map(), diagonals = new Map();
  /** A fixed K × K table of phase quadrants (a seeded draw whose rows differ and which uses all four quadrants). */
  function tableFor(K) {
    if (tables.has(K)) return tables.get(K);
    for (let seed = 4049 + 131 * K; ; seed++) {
      const rnd = TRV.mulberry32(seed);
      const T = Array.from({ length: K }, () => Array.from({ length: K }, () => Math.floor(rnd() * 4)));
      if (new Set(T.flat()).size === 4 && new Set(T.map((r) => r.join(''))).size === K) { tables.set(K, T); return T; }
    }
  }
  const bezier = (a, b, c, d, t) => { const u = 1 - t; return [0, 1, 2].map((i) => u * u * u * a[i] + 3 * u * u * t * b[i] + 3 * u * t * t * c[i] + t * t * t * d[i]); };
  /** Lanes: one per listed path and one for the diagonal (below, a little apart). Each lane is a rail under its K
      dials (so that no hand lies along it), then a funnel into x. */
  function lanesFor(K, T, diag) {
    const gap = 0.6 * DZ, Ht = (K - 1) * DZ + DZ + gap, zTop = Ht / 2;
    const zOf = (r) => (r < K ? zTop - r * DZ : -Ht / 2);
    const xOf = (c) => X_RIGHT - (K - 1 - c) * DX;
    const x0 = xOf(0) - RD - 0.32;
    const lanes = [];
    for (let r = 0; r <= K; r++) {
      const z = zOf(r), kind = r < K ? 'listed' : 'diag';
      const cells = Array.from({ length: K }, (_, c) => ({ c, center: [xOf(c), 0, z], q: kind === 'listed' ? T[r][c] : diag[c] }));
      const zr = z - RD - 0.03, p1 = [xOf(K - 1) + RD + 0.16, 0, zr];
      const rail = [[x0, 0, zr], p1];
      const funnel = [];
      for (let i = 0; i <= 24; i++) funnel.push(bezier(p1, [p1[0] + 0.38, 0, zr], [-0.34, 0, 0], O, i / 24));
      funnel[funnel.length - 1] = O.slice();              // the final reconvergence step ends exactly at x
      const path = [rail[0], ...funnel];
      const lens = [0];
      for (let i = 1; i < path.length; i++) lens.push(lens[i - 1] + v3.len(v3.sub(path[i], path[i - 1])));
      lanes.push({ r, kind, z, zr, cells, segs: [rail, funnel], path, lens });
    }
    return { lanes, x0, zTop, zBot: -Ht / 2, xOf };
  }
  function diagonalAt(K) {
    if (diagonals.has(K)) return diagonals.get(K);
    const T = tableFor(K), diag = T.map((row, k) => twist(row[k]));
    const escapes = T.map((row, r) => diag[r] !== row[r]);
    const geom = lanesFor(K, T, diag);
    const reconverges = geom.lanes.every((ln) => { const e = ln.path[ln.path.length - 1]; return e[0] === O[0] && e[1] === O[1] && e[2] === O[2]; });
    // the one-coordinate refinement instance: the K² step records all read "arrives at x"; their catalog of
    // quadrants is complete; joining the twisted diagonal readout splits the one class
    const records = T.flat();
    const before = new Set(records.map(() => 'x')).size, after = new Set(records.map((y) => `x|${twist(y)}`)).size;
    const out = {
      K, T, diag, escapes, escapedAllRows: escapes.every(Boolean), differsFromEveryRow: T.every((row) => row.some((y, c) => y !== diag[c])),
      reconverges, geom, refined: { before, after, records: records.length, catalogComplete: new Set(records).size === 4, strict: after > before }
    };
    diagonals.set(K, out);
    return out;
  }

  /* ---------- state ---------- */
  const S = { I: 2.85, kappa: 1, K: 5, lens: 'ladder' };
  let clock = null, cards = null;
  function compute() {
    const lad = ladderAt(S.I), arena = arenaAt(lad, S.I), cut = cutAt(S.kappa), diag = diagonalAt(S.K);
    const stageIndex = lad.rank === 4 && arena.twins ? 4 : lad.rank - 1;
    const transfers = [lad.residual[1], lad.residual[2], lad.residual[3], arena.twins ? arena.uniqueCapture / Math.max(1, arena.before) : 0];
    return { I: S.I, kappa: S.kappa, K: S.K, t: clock ? clock.t : 1, lad, arena, cut, diag, stageIndex, conceptId: CONCEPTS[stageIndex], transfers };
  }
  const VIEWS = { ladder: [0.75, 0.46], time: [0.62, 0.36], arrival: [0.32, 0.2], cut: [0.75, 0.5], cascade: [0.38, 0.3] };

  /* ---------- the stage ---------- */
  const stageEl = $('stage'), cv = $('cv'), handle = $('cutHandle');
  stageEl.classList.toggle('still', !!TRV.still);
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; tagBox.appendChild(probe);
  // the wheel stays with the page (a chapter stacks many frames); a still takes no pointer
  const solidOpts = { canvas: cv, yaw: VIEWS.ladder[0], pitch: VIEWS.ladder[1], radius: 0.3, cx: 0.5, cy: 0.5, wheel: false,
    onChange: () => paint(), onPick: () => !!TRV.still };
  const sc = kit.solid(stageEl, solidOpts);
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  }

  /* the safe area: the stage minus the title, the scene chips and the legend */
  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el);
    if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') return null;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = cv.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(40, bottom - top) };
  }

  /* fitting: the lens's content into the safe area; a change of scene blends the fit over the camera's move */
  const UT = v3.unit([1, 1, 1]);
  const RB = 1.3, GAUGE_ARC = 2.4;
  /** Cascade stations: spread along x on a wide stage, climbing a diagonal on a tall one (set by the safe area). */
  let CASC = { dx: 1.15, dz: 0.1 };
  const ST = (k) => [CASC.dx * (k - 2), 0, -0.1 + CASC.dz * (k - 2)], GK = 0.5;
  function cascadeLayout(area) {
    const u = clamp((area.w / Math.max(1, area.h) - 0.95) / (1.7 - 0.95), 0, 1);
    CASC = { dx: 0.68 + (1.15 - 0.68) * u, dz: 0.6 + (0.1 - 0.6) * u };
  }
  function fitPoints(F) {
    if (S.lens === 'ladder') return [O, [1.24, 0, 0], [0, 0, 1.24], [0, 1.24, 0], [0.55, 0.55, -0.12]];
    if (S.lens === 'time') { const g = v3.scale([1, 1, 1], 0.25); return [O, [1.05, 0, 0], [0, 0, 1.05], [0, 1.05, 0], v3.add(g, v3.scale(UT, 1.55)), [0.4, 0.4, -0.12]]; }
    if (S.lens === 'arrival') { const g = F.diag.geom; return [[g.x0 - 0.62, 0, g.zTop + 0.22], [g.x0 - 0.62, 0, g.zBot - 0.22], [1.05, 0, 1.05], [1.05, 0, -0.2], [0.1, 1, 0.1]]; }
    if (S.lens === 'cut') { const { R, U } = camAxes(), r = RB + 0.8; return [v3.scale(R, r), v3.scale(R, -r), v3.scale(U, r), v3.scale(U, -r)]; }
    const pts = [v3.add(ST(0), [-0.5, 0, -0.5]), v3.add(ST(4), [0.6, 0.3, 0.75]), v3.add(ST(4), [0.2, 0.3, -0.45]), v3.add(ST(0), [0, 0.4, 0.5])];
    for (let k = 0; k < 4; k++) pts.push(transferCurve(k, 1)(0.5));
    return pts;
  }
  let lastFit = null, blend = null;
  function startBlend(ms) {
    if (!lastFit || ms <= 0) { blend = null; return; }
    const b = { from: Object.assign({}, lastFit), e: 0 };
    blend = b;
    kit.tween(ms, (e) => { if (blend === b) { b.e = e; paint(); } }, () => { if (blend === b) blend = null; paint(); });
  }
  function fitProjection(F, area, W, H) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPoints(F)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = TRV.thumbMode ? 0 : Math.min(26, area.w * 0.06), py = TRV.thumbMode ? 0 : Math.min(18, area.h * 0.05);
    const u = Math.max(8, Math.min((area.w - 2 * px) / Math.max(x1 - x0, 1e-3), (area.h - 2 * py) / Math.max(y1 - y0, 1e-3)));
    const target = { u, mx: (x0 + x1) / 2, my: (y0 + y1) / 2, ax: area.x + area.w / 2, ay: area.y + area.h / 2 };
    const f = blend ? Object.fromEntries(Object.keys(target).map((k) => [k, blend.from[k] + (target[k] - blend.from[k]) * blend.e])) : target;
    lastFit = Object.assign({}, f);
    const unit = f.u * sc.cam.zoom, m = Math.max(1, Math.min(W, H));
    solidOpts.radius = f.u / m;
    solidOpts.cx = (f.ax - unit * f.mx) / Math.max(1, W);
    solidOpts.cy = (f.ay + unit * f.my) / Math.max(1, H);
  }

  /* ---------- labels: placed after drawing, by priority, never on top of each other or of the hud ---------- */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => sizes.clear());
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) {
      probe.className = 'tag ' + cls; probe.innerHTML = html; TRV.keepCase(probe); probe.hidden = false;
      s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true;
      if (s[0] > 0) sizes.set(k, s);
    }
    return s;
  }
  let LB = [], KEEP = [], OBST = [], BOUNDS = { x: 0, y: 0, w: 0, h: 0 }, PLACED = [];
  /** Ask for a label near the world point p; o: pri (higher first), dir (preferred screen direction), r (gap px). */
  const want = (key, p, html, cls, o = {}) => { const q = sc.p(p); LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 8 : o.r }); };
  const keepDot = (p, r = 7) => { const q = sc.p(p); KEEP.push({ x: q[0] - r, y: q[1] - r, w: 2 * r, h: 2 * r }); };
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [], boxes = OBST.concat(KEEP);
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 22]) for (const da of [0, 0.6, -0.6, 1.2, -1.2, 1.9, -1.9, PI]) {
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
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- drawing ---------- */
  /** The concept of a rank as a lit glyph at base, scaled by k: x, the cyan segment, the magenta triangle (the front
      wall) and the violet tetrahedron. Returns the vertices along the three axes. */
  function conceptGlyph(key, rank, s, base, k, alpha, o = {}) {
    const V = AX.map((ax, i) => (rank >= i + 2 ? v3.add(base, v3.scale(ax, s * k)) : null));
    if (rank >= 4) {
      sc.poly(key + '-vol', { vertices: [base, V[0], V[1], V[2]], faces: [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]] },
        { colors: [P.magenta, P.violet, P.violet, P.violet], alpha: o.volAlpha == null ? alpha : o.volAlpha, edges: P.ink });
    } else if (rank === 3) sc.poly(key + '-surf', { vertices: [base, V[0], V[1]], faces: [[0, 1, 2]] }, { color: P.magenta, alpha, edges: P.ink });
    if (rank >= 2) sc.tube(key + '-line', [base, V[0]], { color: P.cyan, width: o.lineWidth || 4.5, glow: 0.35, alpha });
    if (o.point !== false) sc.bead(base, { key: key + '-x', color: P.ink, r: o.pointR || 6, alpha: Math.max(0.4, alpha) });
    return V;
  }
  /** The concept fades with the cut: at κ₋ = 0 nothing carves it out of the haze. */
  const conceptAlpha = (F) => 0.12 + 0.88 * F.kappa;
  const env = (u) => (u > 0 && u < 1 ? Math.sin(PI * u) : 0);
  const playing = (F) => F.t > 1e-6 && F.t < 1 - 1e-6;
  const HAZE = (() => {
    const rnd = TRV.mulberry32(907), out = [];
    while (out.length < 90) { const p = [rnd() * 2 - 1, rnd() * 2 - 1, rnd() * 2 - 1]; if (v3.len(p) <= 1) out.push(v3.scale(p, 1.8)); }
    return out;
  })();
  function drawHaze(F, center = O, scale = 1) {
    if (F.kappa > 0.999) return;
    const a = 0.75 * (1 - F.kappa);
    HAZE.forEach((p, i) => { if (i % (scale < 1 ? 2 : 1) === 0) sc.bead(v3.add(center, v3.scale(p, scale)), { color: P.dim, r: 2.2, alpha: a, glow: 0.2 }); });
  }

  /* the ladder: x, then the residual of each anchor off x along a fresh axis */
  function drawLadder(F) {
    const lad = F.lad, s = lad.s, a = conceptAlpha(F);
    AX.forEach((ax, i) => {
      const on = lad.opened[i];
      sc.line([O, v3.scale(ax, 1.16)], { color: on ? P.dim : P.faint, width: 1, dash: on ? null : [4, 4], alpha: on ? 0.8 : 0.7 });
      want(`ax${i}`, v3.scale(ax, 1.2), `e${subN(i + 2)}`, 'num small', { pri: 1, dir: [[1, 0], [0, -1], [-1, -0.4]][i], r: 3 });
    });
    conceptGlyph('lad', lad.rank, s, O, 1, a);
    // the overflow of each later anchor: its residual sin ε along the new axis, the edge it adds to the concept
    // (drawn a hair outside the solid, away from the axes it is orthogonal to)
    for (let k = 1; k < 3; k++) {
      if (!lad.opened[k]) continue;
      const out = k === 1 ? [-0.07, 0, 0] : [0, 0, -0.06];   // in front of the violet wall; below the floor edge
      const c = v3.add(O, out), tip = v3.add(c, v3.scale(AX[k], s)), newest = k === lad.rank - 2;
      sc.arrow(c, tip, { color: P.magenta, width: newest ? 3.4 : 2.6, headSize: newest ? 12 : 10, alpha: (newest ? 1 : 0.9) * a });
      if (newest) {
        want('res', v3.lerp(c, tip, 0.55), `sin ε = ${fix(s, 3)}`, 'num c-mg backed', { pri: 3, dir: k === 1 ? [-1, 0] : [-1, 0.2], r: 10 });
        if (playing(F)) sc.bead(v3.lerp(c, tip, F.t), { color: P.magenta, r: 5, alpha: env(F.t) });
      }
    }
    if (lad.rank === 2) {
      want('res', v3.scale(AX[0], s * 0.55), `sin ε = ${fix(s, 3)}`, 'num c-mg backed', { pri: 3, dir: [0, 1], r: 10 });
      if (playing(F)) sc.bead(v3.scale(AX[0], s * F.t), { color: P.magenta, r: 5, alpha: env(F.t) });
    }
    if (F.arena.twins) {
      const g = F.arena.locus, top = v3.add(g, v3.scale(UT, 1.05));
      sc.line([g, top], { color: P.violet, width: 1.6, dash: [5, 4], alpha: 0.85 });
      want('t', top, 't', 'num c-vi', { pri: 2, dir: [0.4, -1] });
    }
    keepDot(O);
    want('x', O, lad.rank === 1 ? 'x · CMP(x, x) = 1' : 'x', 'num', { pri: 4, dir: [-1, 0.6], r: 9 });
    drawHaze(F);
  }

  /* the time scene: two opposite-phase states at one locus, and the phase fiber that tells them apart */
  function drawTime(F) {
    const lad = F.lad, ar = F.arena, a = conceptAlpha(F), g = ar.locus;
    conceptGlyph('tim', lad.rank, lad.s, O, 1, a, { volAlpha: 0.26 * a + 0.04 });
    keepDot(O);
    want('x', O, 'x', 'num', { pri: 2, dir: [-1, 0.6] });
    if (lad.rank < 2) { drawHaze(F); return; }
    const n1 = v3.unit(v3.cross(UT, [0, 0, 1])), n2 = v3.cross(UT, n1), rH = 0.17;
    sc.bead(g, { key: 'psi-plus-3d', color: P.cyan, r: 6.5 });
    keepDot(g, 12);
    if (!ar.twins) {
      sc.line([g, v3.add(g, v3.scale(UT, 0.9))], { color: P.faint, width: 1.2, dash: [4, 4], alpha: 0.8 });
      want('psi', g, 'ψ₊', 'num c-cy backed', { pri: 3, dir: [1, 0.4] });
      want('noT', v3.add(g, v3.scale(UT, 0.9)), L('无需 T', 'no T needed'), 'raw small', { pri: 1, dir: [0.4, -1] });
      drawHaze(F);
      return;
    }
    sc.ring(g, { key: 'psi-minus-3d', color: P.magenta, r: 11 });
    const lam = 0.45 + 0.55 * kit.clamp((F.I - THRESH[3]) / 0.5, 0, 1), pitch = 0.3 * lam, base = v3.add(g, v3.scale(UT, 0.1));
    const helix = (phi) => v3.add(v3.add(base, v3.scale(UT, pitch * phi / TAU)), v3.add(v3.scale(n1, rH * Math.cos(phi)), v3.scale(n2, rH * Math.sin(phi))));
    const PHI = 5 * PI, pts = Array.from({ length: 151 }, (_, i) => helix(PHI * i / 150));
    sc.tube('fiber', pts, { color: P.violet, width: 2.6, glow: 0.3, alpha: 0.95 });
    const top = v3.add(base, v3.scale(UT, pitch * PHI / TAU + 0.18));
    sc.line([g, top], { color: P.violet, width: 1.3, dash: [5, 4], alpha: 0.75 });
    const fp = TAU * (1 + F.t), fm = fp + PI, pp = helix(fp), pm = helix(fm);
    sc.bead(pp, { key: 'psi-plus', color: P.cyan, r: 6 });
    sc.bead(pm, { key: 'psi-minus', color: P.magenta, r: 6 });
    // what the three-dimensional readouts see: both drop onto the same locus
    const foot = (p) => v3.add(g, v3.scale(UT, 0));
    sc.line([pp, foot(pp)], { color: P.cyan, width: 1.1, dash: [3, 4], alpha: 0.7 });
    sc.line([pm, foot(pm)], { color: P.magenta, width: 1.1, dash: [3, 4], alpha: 0.7 });
    keepDot(pp, 8); keepDot(pm, 8);
    want('psiP', pp, 'ψ₊', 'num c-cy backed', { pri: 4, dir: [1, 0], r: 8 });
    want('psiM', pm, 'ψ₋', 'num c-mg backed', { pri: 4, dir: [-1, 0], r: 8 });
    want('amp', g, '|ψ₊|² = |ψ₋|²', 'num backed', { pri: 3, dir: [1, 0.9], r: 14 });
    want('t', top, L('t · 相位切口 T', 't · phase cut T'), 'num c-vi', { pri: 2, dir: [0.3, -1] });
    drawHaze(F);
  }

  /* the arrival table: listed lanes with phase dials, the violet diagonal lane, all funnelling into x */
  const handTip = (c, q, k = 0.92) => v3.add(c, [RD * k * Math.cos(q * PI / 2), 0, RD * k * Math.sin(q * PI / 2)]);
  function drawArrival(F) {
    const D = F.diag, a = conceptAlpha(F), K = D.K;
    conceptGlyph('arr', F.lad.rank, F.lad.s, O, 1, a);
    // the probe walks the diagonal lane by arc length; while it is under a dial, that step is the current one
    let cursor = null;
    if (playing(F)) {
      const dl = D.geom.lanes[K], target = F.t * dl.lens[dl.lens.length - 1];
      let i = 1;
      while (i < dl.path.length - 1 && dl.lens[i] < target) i++;
      const f = (target - dl.lens[i - 1]) / Math.max(1e-9, dl.lens[i] - dl.lens[i - 1]), p = v3.lerp(dl.path[i - 1], dl.path[i], clamp(f, 0, 1));
      cursor = { p, k: i === 1 ? dl.cells.findIndex((cl) => Math.abs(cl.center[0] - p[0]) <= DX / 2) : -1 };
    }
    for (const ln of D.geom.lanes) {
      const isDiag = ln.kind === 'diag';
      ln.segs.forEach((seg, i) => sc.tube(`lane-${ln.r}-${i}`, seg, { color: isDiag ? P.violet : P.cyan, width: isDiag ? 3.4 : 2, glow: isDiag ? 0.4 : 0.15, alpha: isDiag ? 1 : 0.72 }));
      for (const cl of ln.cells) {
        const onDiag = !isDiag && cl.c === ln.r, hot = isDiag || onDiag;
        sc.circle(cl.center, [0, 1, 0], RD, { fade: false, n: 28, color: hot ? P.violet : P.cyan, width: hot ? 2 : 1.1, alpha: hot ? 1 : 0.5 });
        if (isDiag) {
          // the hand of row k at step k (dashed cyan) and the diagonal's hand half a turn from it (violet)
          const q0 = D.T[cl.c][cl.c], a0 = q0 * PI / 2;
          sc.line([cl.center, handTip(cl.center, q0, 0.86)], { color: P.cyan, width: 1.5, dash: [3, 3], alpha: 0.85 });
          const arc = Array.from({ length: 13 }, (_, i) => { const t = a0 + PI * i / 12; return v3.add(cl.center, [0.5 * RD * Math.cos(t), 0, 0.5 * RD * Math.sin(t)]); });
          sc.line(arc, { color: P.violet, width: 1.1, alpha: 0.85 });
          sc.line([cl.center, handTip(cl.center, cl.q)], { color: P.violet, width: 2.6 });
        } else sc.line([cl.center, handTip(cl.center, cl.q)], { color: P.cyan, width: onDiag ? 2.4 : 1.7, alpha: onDiag ? 1 : 0.85 });
        if (cursor && cursor.k === cl.c && (isDiag || onDiag)) sc.circle(cl.center, [0, 1, 0], RD * 1.45, { fade: false, n: 28, color: P.amber, width: 2.2 });
      }
      want(`row${ln.r}`, ln.path[0], isDiag ? 'Γ<sub>diag</sub>' : `Γ${subN(ln.r + 1)}`, isDiag ? 'num c-vi' : 'num c-cy small', { pri: isDiag ? 3 : 2, dir: [-1, 0], r: 4 });
    }
    if (cursor) {
      const dl = D.geom.lanes[K];
      sc.bead(cursor.p, { color: P.amber, r: 5.5, alpha: 0.4 + 0.6 * env(F.t) });
      if (cursor.k >= 0) {
        const top = D.geom.lanes[cursor.k].cells[cursor.k].center, bot = dl.cells[cursor.k].center;
        sc.line([v3.add(top, [0, 0, -RD * 1.45]), v3.add(bot, [0, 0, RD * 1.45])], { color: P.amber, width: 1.4, dash: [4, 4], alpha: 0.9 });
      }
    }
    const tc = [(D.geom.xOf(0) + D.geom.xOf(K - 1)) / 2, 0, D.geom.zTop + 0.05];
    want('tbl', tc, `T · ${K} × ${K}`, 'num small', { pri: 1, dir: [0, -1], r: 10 });
    keepDot(O);
    want('x', O, 'x', 'num', { pri: 4, dir: [0.2, 1], r: 9 });
    drawHaze(F);
  }

  /* the dual cut: the wall, the cyan paths that reach x, the magenta paths turned back, the κ gauge on the ring */
  const fib = (n, off) => Array.from({ length: n }, (_, i) => { const z = 1 - 2 * (i + 0.5) / n, r = Math.sqrt(1 - z * z), t = i * 2.39996323 + off; return [r * Math.cos(t), r * Math.sin(t), z]; });
  const DIR_IN = fib(18, 0.3).filter((d) => !(d[0] > -0.08 && d[1] > -0.08 && d[2] > -0.08));
  const DIR_OUT = fib(16, 1.9);
  function gaugeAngle(k) {
    const { R, D } = camAxes(), pf = Math.atan2(D[1], D[0]), tg = [-Math.sin(pf), Math.cos(pf), 0];
    return pf + (v3.dot(tg, R) >= 0 ? 1 : -1) * (k - 0.5) * GAUGE_ARC;
  }
  const gaugePoint = (k) => { const t = gaugeAngle(k); return [RB * Math.cos(t), RB * Math.sin(t), 0]; };
  function drawCut(F) {
    const k = F.kappa, a = conceptAlpha(F), { D } = camAxes();
    conceptGlyph('cut', F.lad.rank, F.lad.s, O, 1, a);
    // the wall and its ring exist only as much as the cut turns paths back: at κ₋ = 0 nothing is left of them
    if (k > 0.004) {
      sc.glass('wall', O, RB, { color: P.magenta, alpha: 0.1 * k, rim: 0.56 * k });
      sc.circle(O, [0, 0, 1], RB, { color: P.magenta, width: 0.8 + 2.2 * k, alpha: k, back: 0.3 });
    }
    // the paths that reach x (cyan, converging) and those turned back at the wall (magenta, leaving)
    DIR_IN.forEach((d) => sc.arrow(v3.scale(d, RB * 0.97), v3.scale(d, 0.16), { color: P.cyan, width: 1.5, headSize: 7, alpha: 0.3 + 0.45 * k }));
    DIR_OUT.forEach((d) => {
      if (k > 0.004) sc.arrow(v3.scale(d, RB * 1.02), v3.scale(d, RB + 0.12 + 0.52 * k), { color: P.magenta, width: 1.7, headSize: 7, alpha: k });
      if (k < 0.996) sc.line([v3.scale(d, RB * 1.0), v3.scale(d, 0.38)], { color: P.dim, width: 1, dash: [3, 4], alpha: 0.7 * (1 - k) });
    });
    // wavefronts: cyan shrinking onto x inside, magenta spreading back out outside (the rail moves them)
    for (let j = 0; j < 3; j++) {
      const u = frac(F.t + j / 3), e = Math.sin(PI * u);
      if (e > 0.02) sc.circle(O, D, RB * (1 - u), { fade: false, n: 72, color: P.cyan, width: 1.2, alpha: 0.75 * e });
      if (e > 0.02 && k > 0.004) sc.circle(O, D, RB * (1 + 0.55 * u), { fade: false, n: 72, color: P.magenta, width: 1.2, alpha: 0.75 * e * k });
    }
    // the gauge on the boundary ring: dim track, magenta up to κ₋, amber bead at κ₋ (the handle sits on it)
    const track = Array.from({ length: 49 }, (_, i) => gaugePoint(i / 48));
    sc.line(track, { color: P.dim, width: 3, alpha: 0.55 });
    if (k > 0.01) sc.line(Array.from({ length: 33 }, (_, i) => gaugePoint(k * i / 32)), { color: P.magenta, width: 4.2 });
    const gp = gaugePoint(k);
    sc.bead(gp, { key: 'gauge', color: P.amber, r: 6.5 });
    keepDot(gp, 18);
    keepDot(O);
    want('x', O, 'x', 'num', { pri: 4, dir: [-1, 0.5], r: 9 });
    const { R, U } = camAxes(), inSpot = v3.add(v3.scale(R, -0.62 * RB), v3.scale(U, 0.5 * RB)), outSpot = v3.add(v3.scale(R, 0.9 * RB), v3.scale(U, 0.92 * RB));
    want('pin', inSpot, 'P₊(x) = Im P<sub>M</sub>', 'num c-cy backed', { pri: 3, dir: [0, -1], r: 2 });
    if (k > 0.05) want('pout', outSpot, 'P₋(x) = Im P<sub>M⊥</sub>', 'num c-mg backed', { pri: 3, dir: [1, -1], r: 4 });
    want('kap', gp, `κ₋ = ${fix(k, 2)}`, 'num c-am backed', { pri: 5, dir: v3.dot(gp, R) >= 0 ? [1, 0.6] : [-1, 0.6], r: 18 });
    drawHaze(F);
  }

  /* the cascade: five concepts side by side; each magenta overflow lands as the next cyan generator */
  function stationCentre(k, s) {
    const S0 = ST(k);
    if (k === 0) return S0;
    return v3.add(S0, v3.scale(centroid([O, ...AX.slice(0, Math.min(3, k)).map((ax) => v3.scale(ax, s * GK))]), 1));
  }
  function landing(k, s) {   // where transfer k → k + 1 lands: the middle of the new generator of station k + 1
    if (k < 3) return v3.add(ST(k + 1), v3.scale(AX[k], 0.5 * s * GK));
    return stationCentre(4, s);
  }
  /** The arc of transfer k → k + 1: up out of station k, over, and down onto the generator it opens. */
  function transferCurve(k, s) {
    const A = v3.add(stationCentre(k, s), [0.05, 0, 0.12]), B = landing(k, s), lift = 0.55 + 0.3 * clamp(CASC.dx - CASC.dz, 0, 1);
    const C1 = v3.add(A, [0.25, 0, lift]), C2 = v3.add(B, [-0.25, 0, lift]);
    return (t) => bezier(A, C1, C2, B, t);
  }
  function drawCascade(F) {
    const s = 1, kap = F.kappa, a = conceptAlpha(F), act = F.stageIndex;
    for (let k = 0; k < 5; k++) {
      const on = k <= act, base = ST(k), c = stationCentre(k, s), al = on ? a : 0.16;
      const rank = Math.min(4, k + 1);
      conceptGlyph(`st${k}`, rank, s, base, GK, al, { lineWidth: 3.6, pointR: 5, volAlpha: k === 4 ? 0.35 * al : al });
      sc.circle(c, sc.facing(), 0.46, { fade: false, n: 56, color: on ? P.magenta : P.faint, width: on ? 1 + kap : 1, alpha: on ? 0.2 + 0.6 * kap : 0.5, dash: on ? null : [3, 4] });
      if (k === 4) {
        const g = c, n1 = v3.unit(v3.cross(UT, [0, 0, 1])), n2 = v3.cross(UT, n1), rH = 0.09;
        const helix = (phi) => v3.add(v3.add(v3.add(g, v3.scale(UT, 0.06)), v3.scale(UT, 0.13 * phi / TAU)), v3.add(v3.scale(n1, rH * Math.cos(phi)), v3.scale(n2, rH * Math.sin(phi))));
        sc.tube('st4-fiber', Array.from({ length: 101 }, (_, i) => helix(5 * PI * i / 100)), { color: on ? P.violet : P.faint, width: 2.2, glow: 0.3, alpha: on ? 1 : 0.4 });
        if (on) { const fp = TAU * (1 + F.t); sc.bead(helix(fp), { color: P.cyan, r: 4.5 }); sc.bead(helix(fp + PI), { color: P.magenta, r: 4.5 }); }
      }
      const tagAt = v3.add(base, [0.25 * GK, 0, -0.32]);
      want(`st${k}`, tagAt, CONCEPT_SHORT[k], k === act ? 'num c-am' : 'num small', { pri: 3, dir: [0, 1], r: 2 });
    }
    // transfers: magenta from the overflowing concept, cyan into the generator it opens
    for (let k = 0; k < 4; k++) {
      const on = k + 1 <= act, curve = transferCurve(k, s), A = curve(0), B = curve(1);
      const pts = Array.from({ length: 41 }, (_, i) => curve(i / 40)), cut = 22;
      if (on) {
        sc.tube(`xf${k}a`, pts.slice(0, cut + 1), { color: P.magenta, width: 2.6, glow: 0.3 });
        sc.tube(`xf${k}b`, pts.slice(cut), { color: P.cyan, width: 2.6, glow: 0.3 });
        sc.arrow(pts[37], pts[40], { color: P.cyan, width: 2.4, headSize: 10 });
        // the generator it lands on, in cyan
        if (k < 3) sc.tube(`gen${k}`, [ST(k + 1), v3.add(ST(k + 1), v3.scale(AX[k], s * GK))], { color: P.cyan, width: 4, glow: 0.4 });
        else sc.circle(stationCentre(4, s), UT, 0.1, { fade: false, n: 36, color: P.cyan, width: 2.2 });
        if (playing(F)) { const u = 4 * F.t - k; if (u > 0 && u < 1) sc.bead(curve(u), { color: u < cut / 40 ? P.magenta : P.cyan, r: 5.5, alpha: env(u) }); }
      } else sc.line(pts, { color: P.faint, width: 1.2, dash: [4, 4], alpha: 0.8 });
    }
    drawHaze(F, ST(2), 1.15);
  }

  /* ---------- the hud: title, one line of explanation, legend ---------- */
  function hudText(F) {
    const lad = F.lad, ar = F.arena, cut = F.cut, nm = CONCEPT_NAME[F.conceptId];
    const d = (k) => fix(lad.dets[k], 3);
    if (S.lens === 'ladder') {
      const subs = [
        L('0D 点：只有自比较 CMP(x, x) = 1', '0D point: only the self-comparison CMP(x, x) = 1'),
        L(`${nm[0]}：det G₂ = sin²ε = ${d(1)} &gt; 0`, `${nm[1]}: det G₂ = sin²ε = ${d(1)} &gt; 0`),
        L(`${nm[0]}：det G₃ = sin⁴ε = ${d(2)} &gt; 0`, `${nm[1]}: det G₃ = sin⁴ε = ${d(2)} &gt; 0`),
        L(`${nm[0]}：det G₄ = sin⁶ε = ${d(3)} &gt; 0`, `${nm[1]}: det G₄ = sin⁶ε = ${d(3)} &gt; 0`),
        L(`体之外：三维读出仍留 ${ar.before} 个逃逸对，要加 T`, `Past 3D: the 3D readouts leave ${ar.before} escape pairs; T is needed`)
      ];
      return [L(`格拉姆阶梯 · 秩 ${lad.rank}`, `Gram ladder · rank ${lad.rank}`), subs[F.stageIndex]];
    }
    if (S.lens === 'time') {
      return [L(`相位碰撞 · 逃逸对 ${ar.before} → ${ar.after}`, `Phase collision · escape pairs ${ar.before} → ${ar.after}`),
        ar.twins ? L('|ψ₊|² = |ψ₋|²：x、y、z、|ψ|² 都分不开，相位切口 T 能', '|ψ₊|² = |ψ₋|²: x, y, z and |ψ|² cannot tell them apart; the phase cut T can')
          : L(`I<sub>cmp</sub> &lt; 3.5：还没有反相的一对，三维读出已分开全部 ${ar.n} 个态`, `I<sub>cmp</sub> &lt; 3.5: no opposite-phase pair yet; the 3D readouts separate all ${ar.n} states`)];
    }
    if (S.lens === 'arrival') {
      return [L(`来路对角 · K = ${F.K}`, `Diagonal of the ways in · K = ${F.K}`),
        L('Γ<sub>diag</sub>[k] = T[k][k] + 2 (mod 4)：第 k 步与第 k 行相差半圈', 'Γ<sub>diag</sub>[k] = T[k][k] + 2 (mod 4): half a turn from row k at step k')];
    }
    if (S.lens === 'cut') {
      return [L(`双无限切口 · κ₋ = ${fix(cut.kappa, 2)}`, `Dual-infinite cut · κ₋ = ${fix(cut.kappa, 2)}`),
        L(`P<sub>M</sub> + P<sub>M⊥</sub> = I，P<sub>M</sub>P<sub>M⊥</sub> = 0；锐度 ${fix(cut.cutContrast, 2)}，区分 ${fix(cut.distinctionBits, 2)} bit`,
          `P<sub>M</sub> + P<sub>M⊥</sub> = I, P<sub>M</sub>P<sub>M⊥</sub> = 0; sharpness ${fix(cut.cutContrast, 2)}, distinction ${fix(cut.distinctionBits, 2)} bit`)];
    }
    return [L('概念级联 · 点 → 线 → 面 → 体 → 时', 'Concept cascade · point → line → surface → volume → time'),
      L('每一级的品红溢出，落成下一级的青色生成元', 'The magenta overflow of each level lands as the cyan generator of the next')];
  }
  function legendFor(F) {
    if (S.lens === 'ladder') return [['ik box', 'x'], ['cy', L('线', 'line')], ['mg box', L('面', 'surface')], ['vi box', L('体', 'volume')], ['mg', L('溢出残差 sin ε', 'overflow residual sin ε')]];
    if (S.lens === 'time') return [['cy', 'ψ₊'], ['mg', 'ψ₋ = −ψ₊'], ['vi', L('相位纤维 T', 'phase fiber T')], ['vi box', L('体', 'volume')]];
    if (S.lens === 'arrival') return [['cy', L('列出的来路 Γ₁ … Γ<sub>K</sub>', 'listed paths Γ₁ … Γ<sub>K</sub>')], ['vi', 'Γ<sub>diag</sub>'], ['dash cy', L('第 k 行在第 k 步的指针', 'row k at step k')]];
    if (S.lens === 'cut') {
      const out = [['cy', 'P₊(x) = Im P<sub>M</sub>'], ['mg', 'P₋(x) = Im P<sub>M⊥</sub>'], ['ring', L('κ₋ 手柄', 'κ₋ handle')]];
      if (F.kappa < 0.999) out.push(['dot', L('未切开的雾', 'uncarved haze')]);
      return out;
    }
    return [['mg', L('溢出 P₋(C<sub>k</sub>)', 'overflow P₋(C<sub>k</sub>)')], ['cy', L('生成元 P₊(C<sub>k+1</sub>)', 'generator P₊(C<sub>k+1</sub>)')], ['vi box', L('体 · 时间纤维', 'volume · time fiber')]];
  }
  let hudKey = '';
  function writeHud(F) {
    const [big, sub] = hudText(F), legend = legendFor(F).map(([c, t]) => `<span><i class="sw ${c}"></i>${t}</span>`).join('');
    const key = `${TRV.lang()}|${big}|${sub}|${legend}`;
    if (key === hudKey) return;
    hudKey = key;
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub; $('legend').innerHTML = legend;
  }

  /* ---------- the frame ---------- */
  let frame = null;
  function drawStage(F) {
    const W = cv.clientWidth, H = cv.clientHeight;
    writeHud(F);
    TRV.hudFit();
    const huds = TRV.thumbMode ? [] : hudBoxes();
    const area = TRV.thumbMode ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (S.lens === 'cascade') cascadeLayout(area);
    fitProjection(F, area, W, H);
    sc.begin();
    LB = []; KEEP = []; OBST = huds; BOUNDS = { x: 4, y: 4, w: W - 8, h: H - 8 };
    if (S.lens === 'ladder') drawLadder(F);
    else if (S.lens === 'time') drawTime(F);
    else if (S.lens === 'arrival') drawArrival(F);
    else if (S.lens === 'cut') drawCut(F);
    else drawCascade(F);
    if (!TRV.thumbMode) placeLabels(); else PLACED = [];
    sc.end();
    placeHandle(F, W, H);
  }
  function placeHandle(F, W, H) {
    const show = S.lens === 'cut' && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    const q = sc.p(gaugePoint(F.kappa));
    handle.style.left = `${clamp(q[0], 16, Math.max(16, W - 16)).toFixed(1)}px`;
    handle.style.top = `${clamp(q[1], 16, Math.max(16, H - 16)).toFixed(1)}px`;
    handle.setAttribute('aria-valuenow', fix(F.kappa, 2));
    handle.setAttribute('aria-valuetext', `κ₋ = ${fix(F.kappa, 2)}`);
  }

  /* ---------- the strip: one question per scene ---------- */
  const LADDER_CURVE = Array.from({ length: 401 }, (_, i) => { const l = ladderAt(i / 100); return { I: i / 100, d: l.dets, rank: l.rank }; });
  function ladderSeries(f) {
    const pts = [];
    let last = null;
    for (const p of LADDER_CURVE) { if (last != null && p.rank !== last) pts.push(null); pts.push([p.I, f(p)]); last = p.rank; }
    return pts;
  }
  const SERIES = { g1: ladderSeries((p) => p.d[0]), g2: ladderSeries((p) => p.d[1]), g3: ladderSeries((p) => p.d[2]), g4: ladderSeries((p) => p.d[3]), rank: ladderSeries((p) => p.rank / 4) };
  function plotLadder(F, g) {
    g.axes({ xTicks: [[0, '0'], [0.5, '0.5'], [1.5, '1.5'], [2.5, '2.5'], [3.5, '3.5'], [4, '4']], yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
    for (const th of THRESH) g.vline(th, P.panelEdge, { width: 1, dash: [2, 3] });
    [[0, 0.5], [0.5, 1.5], [1.5, 2.5], [2.5, 3.5], [3.5, 4]].forEach(([a, b], i) => g.text((a + b) / 2, 1.12, CONCEPT_SHORT[i], i === F.stageIndex ? P.amber : P.dim, { align: 'center', size: 9.5 }));
    g.line(SERIES.rank, P.dim, { width: 1, dash: [2, 3], alpha: 0.9 });
    g.line(SERIES.g1, P.ink, { width: 1.1, dash: [4, 3], alpha: 0.55 });
    g.line(SERIES.g2, P.cyan, { width: 2 });
    g.line(SERIES.g3, P.magenta, { width: 2 });
    g.line(SERIES.g4, P.violet, { width: 2 });
    g.vline(F.I, P.amber, { width: 1.5 });
    [P.cyan, P.magenta, P.violet].forEach((c, i) => { if (F.lad.dets[i + 1] > 0) g.dot(F.I, F.lad.dets[i + 1], c, 3.5); });
  }
  function plotTime(F, g, ymax) {
    const st = F.arena.staircase;
    g.axes({ xTicks: [[0, '∅'], [1, 'x'], [2, '+y'], [3, '+z'], [4, '+|ψ|²'], [5, '+T']], yTicks: [[0, '0'], [ymax, String(ymax)]] });
    st.forEach((v, i) => {
      const c = i === 5 ? P.cyan : P.magenta;
      if (v > 0) g.rect(i - 0.3, 0, i + 0.3, v, c, { alpha: i === 4 ? 0.85 : 0.35, stroke: c, strokeAlpha: 0.9 });
      g.text(i, v + ymax * 0.05, String(v), i === 5 ? P.cyan : i === 4 ? P.magenta : P.dim, { align: 'center', base: 'bottom', size: 10.5 });
    });
  }
  function plotArrival(F, g) {
    const D = F.diag, K = D.K, W = g.W, H = g.H, gap = 0.55;
    const cell = Math.max(8, Math.min((H - 10) / (K + 1 + gap), (W - 150) / K, 22));
    const gx = Math.max(58, Math.round((W - K * cell) / 2 - 30)), gy = Math.round((H - (K + 1 + gap) * cell) / 2);
    const tx = (px) => px / W, ty = (py) => 1 - py / H;
    const arrow = (cx, cy, q, color, s) => {
      const t = q * PI / 2, r = cell * 0.32, dx = r * Math.cos(t), dy = r * Math.sin(t);
      g.arrow([tx(cx - dx), ty(cy + dy)], [tx(cx + dx), ty(cy - dy)], Object.assign({ color, width: 1.5, headSize: Math.max(4, cell * 0.28) }, s));
    };
    for (let r = 0; r <= K; r++) {
      const listed = r < K, y = gy + (listed ? r : K + gap) * cell;
      g.text(tx(gx - 7), ty(y + cell / 2), listed ? `Γ_{${r + 1}}` : 'Γ_{diag}', listed ? P.cyan : P.violet, { align: 'right', size: 10.5 });
      for (let c = 0; c < K; c++) {
        const x = gx + c * cell, hot = !listed || c === r;
        g.rect(tx(x + 1), ty(y + 1), tx(x + cell - 1), ty(y + cell - 1), P.violet, { fill: hot, alpha: listed ? 0.18 : 0.1, stroke: hot ? P.violet : P.panelEdge, strokeAlpha: 1, width: hot ? 1.4 : 1 });
        const cx = x + cell / 2, cy = y + cell / 2;
        if (listed) arrow(cx, cy, D.T[r][c], P.cyan, { alpha: c === r ? 1 : 0.8 });
        else { arrow(cx, cy, D.T[c][c], P.cyan, { dash: [2, 2], alpha: 0.7, width: 1.1 }); arrow(cx, cy, D.diag[c], P.violet, { width: 1.8 }); }
      }
    }
    const rx = gx + K * cell + 12;
    if (W - rx > 70) {
      g.text(tx(rx), ty(gy + cell * 0.6), L('对角格 (k, k) 翻转半圈', 'diagonal cells turned by π'), P.violet, { size: 10, face: 'body' });
      g.text(tx(rx), ty(gy + cell * 1.9), L(`逃出 ${D.escapes.filter(Boolean).length} / ${K} 行`, `escapes ${D.escapes.filter(Boolean).length} / ${K} rows`), P.dim, { size: 10, face: 'body' });
      g.text(tx(rx), ty(gy + cell * 3.2), L(`划分 ${D.refined.before} → ${D.refined.after} 类`, `classes ${D.refined.before} → ${D.refined.after}`), P.dim, { size: 10, face: 'body' });
    }
  }
  function plotCut(F, g) {
    g.axes({ xTicks: [[0, '0'], [0.25, '0.25'], [0.5, '0.5'], [0.75, '0.75'], [1, '1']], yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], xLabel: 'κ₋' });
    g.line(CUT_CURVE.map(([k]) => [k, 1 - k]), P.dim, { width: 1.1, dash: [4, 3] });
    g.line(CUT_CURVE.map(([k, c]) => [k, c]), P.magenta, { width: 2 });
    g.line(CUT_CURVE.map(([k, , b]) => [k, b]), P.cyan, { width: 2 });
    g.vline(F.kappa, P.amber, { width: 1.5 });
    g.dot(F.kappa, F.cut.cutContrast, P.magenta, 3.5);
    g.dot(F.kappa, F.cut.distinctionBits, P.cyan, 3.5);
  }
  function plotCascade(F, g) {
    g.axes({ xTicks: [[0, '0D'], [1, '1D'], [2, '2D'], [3, '3D'], [4, '3+1D'], [5.6, '']], yTicks: [[0, '0'], [1, '1']] });
    const gen = [1, ...F.transfers], over = [...F.transfers, null];
    for (let k = 0; k < 5; k++) {
      if (gen[k] > 0) g.rect(k - 0.34, 0, k - 0.03, gen[k], P.cyan, { alpha: 0.7, stroke: P.cyan, strokeAlpha: 0.9 });
      if (over[k] != null && over[k] > 0) g.rect(k + 0.03, 0, k + 0.34, over[k], P.magenta, { alpha: 0.7, stroke: P.magenta, strokeAlpha: 0.9 });
      if (k < 4 && over[k] > 0) g.arrow([k + 0.2, over[k] + 0.05], [k + 1 - 0.2, gen[k + 1] + 0.05], { color: P.dim, width: 1, headSize: 6 });
    }
    const K = F.K, esc = F.diag.escapes;
    for (let r = 0; r < K; r++) g.rect(5.32, r / K, 5.88, (r + 1) / K - 0.025, P.violet, { alpha: esc[r] ? 0.75 : 0.1, stroke: P.violet, strokeAlpha: 0.9 });
    g.text(5.6, -0.08, 'Γ_{diag}', P.violet, { align: 'center', base: 'top', size: 10 });
    g.text(5.6, 1.1, `${esc.filter(Boolean).length}/${K}`, P.violet, { align: 'center', size: 10 });
  }
  function drawPlot(F) {
    const pc = $('plot');
    if (!pc.clientWidth || !pc.clientHeight) return;
    const titles = {
      ladder: [L('注入越多，哪个格拉姆行列式长出来？', 'As information flows in, which Gram determinant opens?'), '<span class="c-cy">G₂</span> <span class="c-mg">G₃</span> <span class="c-vi">G₄</span> · rank / 4'],
      time: [L('哪一刀把反相的一对分开？', 'Which cut separates the opposite-phase pair?'), `${F.arena.n} ${L('个态', 'states')} · ${F.arena.before} → ${F.arena.after}`],
      arrival: [L('对角路径与每一行在哪一格不同？', 'Where does the diagonal differ from each row?'), `K = ${F.K}`],
      cut: [L('切口锐度与区分信息随 κ₋', 'Cut sharpness and distinction against κ₋'), `<span class="c-mg">${L('锐度', 'sharpness')}</span> · <span class="c-cy">bit</span> · 1 − κ₋`],
      cascade: [L('每一级的溢出等于下一级的生成元', 'Each overflow equals the next generator'), `<span class="c-mg">${L('溢出', 'overflow')}</span> = <span class="c-cy">${L('生成元', 'generator')}</span> · K = ${F.K}`]
    };
    const [t, m] = titles[S.lens];
    if ($('plotTitle').textContent !== t) $('plotTitle').textContent = t;
    if ($('plotMeta').innerHTML !== m) $('plotMeta').innerHTML = m;
    if (S.lens === 'ladder') plotLadder(F, kit.plot(pc, { x: [0, 4], y: [0, 1.2], pad: [30, 10, 8, 18] }));
    else if (S.lens === 'time') { const ymax = Math.max(2, F.arena.staircase[0]); plotTime(F, kit.plot(pc, { x: [-0.6, 5.6], y: [0, ymax * 1.3], pad: [30, 10, 8, 18] }), ymax); }
    else if (S.lens === 'arrival') plotArrival(F, kit.plot(pc, { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }));
    else if (S.lens === 'cut') plotCut(F, kit.plot(pc, { x: [0, 1], y: [0, 1.12], pad: [30, 10, 8, 18] }));
    else plotCascade(F, kit.plot(pc, { x: [-0.6, 6.2], y: [-0.02, 1.25], pad: [30, 10, 8, 18] }));
  }

  /* ---------- readouts ---------- */
  function drawText(F) {
    const lad = F.lad, ar = F.arena, cut = F.cut, D = F.diag, nm = CONCEPT_NAME[F.conceptId];
    $('roKey').textContent = L(nm[0], nm[1]);
    $('roKeySub').textContent = ` · ${L('秩', 'rank')} ${lad.rank}${F.stageIndex === 4 ? ' + T' : ''}`;
    const dd = (k) => (lad.dets[k] > 0 ? `${fix(lad.dets[k], 4)} > 0` : '0');
    $('roG2').textContent = dd(1); $('roG3').textContent = dd(2); $('roG4').textContent = dd(3);
    $('roEsc').textContent = `${ar.before} → ${ar.after}`;
    $('roCut').textContent = `${fix(cut.cutContrast, 2)} · ${fix(cut.distinctionBits, 3)} bit`;
    $('roDiag').textContent = `${D.escapes.filter(Boolean).length} / ${D.K}`;
    const deg = fix(lad.e * 180 / PI, 1);
    const notes = {
      ladder: L(`ε = ${deg}°。每越过一个阈值多一个锚点；它在旧张成之外的残差 sin ε = ${fix(lad.s, 3)} 撑开一根新轴，归一化后离旧张成恰好为 1。`,
        `ε = ${deg}°. Past each threshold one more anchor joins; its residual sin ε = ${fix(lad.s, 3)} off the old span opens a new axis, at distance exactly 1 once normalised.`),
      time: ar.twins ? L(`竞技场 ${ar.n} 个态：x、y、z、|ψ|² 之后逃逸率 ${fix(ar.rateBefore, 3)}，加 T 之后 ${fix(ar.rateAfter, 3)}；联合核严格变小。`,
        `Arena of ${ar.n} states: escape rate ${fix(ar.rateBefore, 3)} after x, y, z and |ψ|², ${fix(ar.rateAfter, 3)} with T; the joint kernel strictly shrinks.`)
        : L('还没有反相的一对：把 I_cmp 推过 3.5。', 'No opposite-phase pair yet: push I_cmp past 3.5.'),
      arrival: L(`Γdiag 与全部 ${D.K} 行都在对角格不同，最后一步汇入 x；单坐标实例从 ${D.refined.before} 类分成 ${D.refined.after} 类。`,
        `Γdiag differs from all ${D.K} rows at their diagonal cells and its last step runs into x; the one-coordinate instance splits ${D.refined.before} class into ${D.refined.after}.`),
      cut: L(`可达权重 ${fix(cut.pReachTrace, 0)}，不可达权重 ${fix(cut.pUnreachWeight, 2)}；P_M P_M⊥、P_M + P_M⊥ − I 与 P_M⊥⊥ − P_M 的残差都精确为 0。`,
        `Reachable weight ${fix(cut.pReachTrace, 0)}, unreachable weight ${fix(cut.pUnreachWeight, 2)}; the residuals of P_M P_M⊥, P_M + P_M⊥ − I and P_M⊥⊥ − P_M are exactly 0.`),
      cascade: L(`传递量 ${F.transfers.map((v) => fix(v, 2)).join('、')}：每一级的溢出与下一级生成元的长度相等；K = ${D.K} 时 Γdiag 逃出全部 ${D.K} 行。`,
        `Transfers ${F.transfers.map((v) => fix(v, 2)).join(', ')}: each overflow equals the length of the next generator; with K = ${D.K}, Γdiag escapes all ${D.K} rows.`)
    };
    $('roNote').textContent = notes[S.lens];
    $('pillDim').querySelector('strong').textContent = CONCEPT_SHORT[F.stageIndex];
    $('pillKappa').querySelector('strong').textContent = fix(F.kappa, 2);
    if (stageChips) stageChips.set(F.conceptId, true);
  }

  function draw() {
    if (!clock || !cards) return;
    frame = compute();
    drawStage(frame);
    drawPlot(frame);
    drawText(frame);
  }
  const paint = kit.painter(draw, [stageEl, $('plot')]);

  /* ---------- the rail: the flow phase τ ---------- */
  clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 1, rate: 0.2, step: 0.05, loop: true,
    format: (t) => `τ ${fix(t, 2)} <small>/ 1</small>`,
    onChange: () => paint()
  });

  /* ---------- controls ---------- */
  let ptween = null;
  function stopTween() { if (ptween) { ptween.cancel(); ptween = null; } }
  function leave() { stopTween(); if (cards) cards.mark(null); }
  const fI = kit.field($('infoInject'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.I = clamp(v, 0, 4); paint(); } });
  const fKappa = kit.field($('negCoupling'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.kappa = clamp(v, 0, 1); paint(); } });
  const fK = kit.field($('tableSize'), { fmt: (v) => String(Math.round(v)), onInput: (v) => { leave(); S.K = clamp(Math.round(v), 3, 7); paint(); } });
  function sync() { fI.set(S.I); fKappa.set(S.kappa); fK.set(S.K); }
  function tweenParams(to, ms = 600) {
    stopTween();
    const from = { I: S.I, kappa: S.kappa }, target = Object.assign({}, from, to);
    // with reduced motion kit.tween finishes inside the call, so the handle is a token made before it
    const token = { cancel() { if (token.run) token.run.cancel(); }, done: false };
    ptween = token;
    token.run = kit.tween(ms, (e) => { S.I = from.I + (target.I - from.I) * e; S.kappa = from.kappa + (target.kappa - from.kappa) * e; sync(); paint(); },
      () => { S.I = target.I; S.kappa = target.kappa; token.done = true; if (ptween === token) ptween = null; sync(); paint(); });
    if (token.done && ptween === token) ptween = null;
  }
  function pickStage(id) { leave(); tweenParams({ I: STAGE_I[id] }, 450); }
  const stageChips = kit.chips($('stageChips'), 'stage', (v) => pickStage(v));
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { if (cards) cards.mark(null); setLens(v); });
  function setLens(id, instant) {
    const changed = S.lens !== id;
    S.lens = id; sceneChips.set(id, true);
    const v = VIEWS[id];
    if (instant || TRV.still) { blend = null; sc.view([v[0], v[1], 1], 0); } else if (changed) { startBlend(650); sc.view([v[0], v[1], 1], 650); }
    paint();
  }
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => pickStage('point'), 2: () => pickStage('line'), 3: () => pickStage('surface'), 4: () => pickStage('volume'), 5: () => pickStage('time') });

  /* the κ handle: drag it along the boundary ring (or use the arrow keys on it) */
  let hdrag = null;
  function kappaAt(ev) {
    const b = cv.getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    let best = S.kappa, bd = Infinity;
    for (let i = 0; i <= 200; i++) { const k = i / 200, q = sc.p(gaugePoint(k)), d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; best = k; } }
    return Math.round(best * 100) / 100;
  }
  function setKappa(k) { leave(); S.kappa = clamp(k, 0, 1); fKappa.set(S.kappa); paint(); }
  handle.setAttribute('role', 'slider');
  handle.setAttribute('aria-valuemin', '0');
  handle.setAttribute('aria-valuemax', '1');
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0) return;
    ev.preventDefault(); ev.stopPropagation();
    hdrag = { id: ev.pointerId };
    handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
    setKappa(kappaAt(ev));
  });
  handle.addEventListener('pointermove', (ev) => { if (hdrag && ev.pointerId === hdrag.id) setKappa(kappaAt(ev)); });
  const endDrag = (ev) => {
    if (!hdrag || (ev && ev.pointerId !== hdrag.id)) return;
    const id = hdrag.id;
    hdrag = null;
    handle.classList.remove('dragging');
    try { if (handle.hasPointerCapture && handle.hasPointerCapture(id)) handle.releasePointerCapture(id); } catch (e) { /* already released */ }
    paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const step = { ArrowLeft: -0.05, ArrowDown: -0.05, ArrowRight: 0.05, ArrowUp: 0.05 }[ev.key];
    if (step == null && ev.key !== 'Home' && ev.key !== 'End') return;
    ev.preventDefault(); ev.stopPropagation();
    setKappa(ev.key === 'Home' ? 0 : ev.key === 'End' ? 1 : Math.round((S.kappa + step) * 100) / 100);
  });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'gram-overflow-cascade': { I: 2.85, kappa: 1, K: 5, lens: 'ladder', play: false, still: 1 },
    'time-from-phase-collision': { I: 3.85, kappa: 1, K: 5, lens: 'time', play: false, still: 1 },
    'arrival-diagonal-escape': { I: 2.2, kappa: 1, K: 5, lens: 'arrival', play: false, still: 1 },
    'reversal-dual-cut': { I: 2.4, kappa: 1, K: 5, lens: 'cut', play: false, still: 1 },
    'concept-obstruction-cascade': { I: 4, kappa: 1, K: 6, lens: 'cascade', play: false, still: 1 }
  };
  // the notes quote numbers the engine computes at each card's state
  const at = (id) => { const p = PRESETS[id], lad = ladderAt(p.I); return { lad, ar: arenaAt(lad, p.I), D: diagonalAt(p.K) }; };
  const C1 = at('gram-overflow-cascade'), C2 = at('time-from-phase-collision'), C3 = at('arrival-diagonal-escape'), C5 = at('concept-obstruction-cascade');
  const NOTES = {
    'gram-overflow-cascade': [
      `I_cmp = 2.85，ε = ${fix(C1.lad.e * 180 / PI, 1)}°：x 溢出成青色的线，线溢出成品红的面，面再溢出成紫色的体。每支品红箭头都是新锚点在旧张成之外的残差 sin ε = ${fix(C1.lad.s, 3)}；det G₂ = ${fix(C1.lad.dets[1], 3)}、det G₃ = ${fix(C1.lad.dets[2], 3)}、det G₄ = ${fix(C1.lad.dets[3], 3)}，都大于 0。`,
      `I_cmp = 2.85, ε = ${fix(C1.lad.e * 180 / PI, 1)}°: x overflows into a cyan line, the line into a magenta surface, the surface into a violet volume. Each magenta arrow is the residual sin ε = ${fix(C1.lad.s, 3)} of a new anchor off the old span; det G₂ = ${fix(C1.lad.dets[1], 3)}, det G₃ = ${fix(C1.lad.dets[2], 3)}, det G₄ = ${fix(C1.lad.dets[3], 3)}, all positive.`],
    'time-from-phase-collision': [
      `I_cmp = 3.85：青色的 ψ₊ 与品红的 ψ₋ = −ψ₊ 落在四面体的同一个质心上，|ψ₊|² = |ψ₋|²。x、y、z、|ψ|² 之后还剩 ${C2.ar.before} 个有序逃逸对；沿紫色相位纤维 T，它们隔着半圈，逃逸对降到 ${C2.ar.after}。`,
      `I_cmp = 3.85: the cyan ψ₊ and the magenta ψ₋ = −ψ₊ sit on the same centroid of the tetrahedron, |ψ₊|² = |ψ₋|². After x, y, z and |ψ|², ${C2.ar.before} ordered escape pairs remain; along the violet phase fiber T they are half a turn apart, and the escape pairs drop to ${C2.ar.after}.`],
    'arrival-diagonal-escape': [
      `K = ${C3.D.K}：五条青色来路排成表 T，每格的指针是那一步的相位象限，都汇入 x。紫色的 Γdiag 在第 k 步把第 k 行的指针（青色虚线）转半圈，最后也到达 x，却与每一行都在对角格不同。`,
      `K = ${C3.D.K}: five cyan paths form the table T, each dial pointing to the phase quadrant of that step, all running into x. The violet Γdiag turns the hand of row k (dashed cyan) by half a turn at step k; it also reaches x, yet differs from every row at its diagonal cell.`],
    'reversal-dual-cut': [
      'κ₋ = 1：青色的路穿过墙收向 x（P₊ = Im P_M），品红的路在墙外折回（P₋ = Im P_M⊥）；P_M + P_M⊥ = I、P_M P_M⊥ = 0，边界锐度 1，区分信息 1 bit。拖动琥珀色手柄让 κ₋ 变小，墙和概念一起化进雾里。',
      'κ₋ = 1: cyan paths pass the wall and converge on x (P₊ = Im P_M), magenta paths turn back outside it (P₋ = Im P_M⊥); P_M + P_M⊥ = I and P_M P_M⊥ = 0, sharpness 1, distinction 1 bit. Drag the amber handle to lower κ₋: the wall and the concept melt into haze together.'],
    'concept-obstruction-cascade': [
      `I_cmp = 4：点、线、面、体、时间排成一列。每一级的品红溢出弧落成下一级的青色生成元：x 的溢出是线，线的溢出是面的第二条边，面的溢出是体的第三条边，体里的相位碰撞落成时间纤维上的切口 T。按播放看脉冲沿级联传下去。`,
      `I_cmp = 4: point, line, surface, volume and time in a row. The magenta overflow arc of each level lands as the cyan generator of the next: the overflow of x is the line, that of the line the second edge of the surface, that of the surface the third edge of the volume, and the phase collision in the volume lands as the cut T on the time fiber. Press play to send a pulse down the cascade.`]
  };
  // a cited figure has a fixed frame: one short sentence per card there (no sub- or superscripts)
  const FIGURE_NOTES = {
    'gram-overflow-cascade': [`点 → 青线 → 品红面 → 紫体；每支品红箭头是新轴上的残差 sin ε = ${fix(C1.lad.s, 3)}，det G₄ = ${fix(C1.lad.dets[3], 3)}。`,
      `Cyan line, magenta surface, violet volume; each magenta arrow is a residual sin ε = ${fix(C1.lad.s, 3)}.`],
    'time-from-phase-collision': [`青 ψ₊ 与品红 ψ₋ 同处质心、|ψ|² 相同，三维读出留下 ${C2.ar.before} 个逃逸对；紫色相位纤维 T 把它们分开。`,
      `Cyan ψ₊ and magenta ψ₋ share a locus: ${C2.ar.before} escape pairs in 3D; the violet fiber T splits them.`],
    'arrival-diagonal-escape': ['青色来路排成表 T；紫色 Γdiag 把第 k 行第 k 步的指针转半圈，仍到达 x，却不在表中。',
      'The violet Γdiag turns row k at step k by half a turn: it reaches x but is not in T.'],
    'reversal-dual-cut': ['κ₋ = 1：青色的路收向 x，品红的路在墙外折回；两投影之和为 I、之积为 0，边界锐度为 1。',
      'κ₋ = 1: cyan paths converge on x, magenta paths turn back; the projections sum to I.'],
    'concept-obstruction-cascade': ['点 → 线 → 面 → 体 → 时：每一级的品红溢出，都落成下一级的青色生成元。',
      'Each magenta overflow lands as the cyan generator of the next concept, point to time.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    stopTween();
    clock.pause();
    S.K = p.K;
    setLens(p.lens, booting || TRV.still);
    clock.set(p.still);
    if (booting || TRV.still) { S.I = p.I; S.kappa = p.kappa; sync(); paint(); } else tweenParams({ I: p.I, kappa: p.kappa });
    if (p.play && !TRV.still) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
  }
  cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? Object.assign({}, NOTES, FIGURE_NOTES) : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动滑块与琥珀色的 κ 手柄、换场景、拖时间轴或转动舞台。随时可以再选一张卡。', 'Free play: move the sliders and the amber κ handle, switch scenes, scrub the rail or turn the stage. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const screenOf = (v) => { const q = sc.p(v), b = cv.getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; };
  window.REVERSAL_DEBUG = {
    get state() {
      const F = compute(), lad = F.lad, ar = F.arena, cut = F.cut, D = F.diag;
      return JSON.parse(JSON.stringify({
        preset: cards.current, lens: S.lens, t: clock.t, playing: clock.playing, cam: Object.assign({}, sc.cam),
        infoInject: F.I, negCoupling: F.kappa, tableSize: F.K,
        activeStageIndex: F.stageIndex, activeConceptId: F.conceptId, rank: lad.rank, stepAngleDeg: lad.e * 180 / PI,
        anchors: lad.A, gramMatrix: lad.G, gramDets: lad.dets, threeAnchorFormula: lad.threeAnchor, residuals: lad.residual, escapeNormals: lad.normals, chirality: lad.chirality,
        displayVertices: lad.verts,
        arenaStates: ar.states, escapeStaircase: ar.staircase, escapePairsBefore: ar.before, escapePairsAfter: ar.after, escapePairsCount: ar.before,
        escapeRateBefore: ar.rateBefore, escapeRateAfter: ar.rateAfter, lowersEscape: ar.lowersEscape, strictKernel: ar.strictKernel, twinsPresent: ar.twins,
        pReachTrace: cut.pReachTrace, pUnreachWeight: cut.pUnreachWeight, cutContrast: cut.cutContrast, contrastFromTraces: cut.contrastFromTraces,
        orthogonalityResidual: cut.orthogonalityResidual, completenessResidual: cut.completenessResidual, idempotenceResidual: cut.idempotenceResidual,
        doubleComplementError: cut.doubleComplementError, distinctionBits: cut.distinctionBits, pBalanced: cut.pBalanced,
        projectionNumerators: { den: cut.den, PM: cut.PM, PMperp: cut.PQ, PMperpperp: cut.PMcc }, Peff: cut.Peff,
        lookupMatrix: D.T, diagonalPath: D.diag, escapedRows: D.escapes, escapedAllRows: D.escapedAllRows, differsFromEveryRow: D.differsFromEveryRow,
        reconvergesToTarget: D.reconverges, refinedPartitionClasses: D.refined, transfers: F.transfers,
        handle: handle.hidden ? null : { left: parseFloat(handle.style.left), top: parseFloat(handle.style.top) },
        labels: PLACED.map((b) => ({ key: b.key, x: b.x, y: b.y, w: b.w, h: b.h })),
        roles: { line: 'cyan', reachable: 'cyan', psiPlus: 'cyan', surface: 'magenta', overflow: 'magenta', unreachable: 'magenta', psiMinus: 'magenta', volume: 'violet', diagonal: 'violet', timeFiber: 'violet', handle: 'amber', cursor: 'amber', haze: 'dim' }
      }));
    },
    setState(o) {
      leave();
      if (o.infoInject != null) S.I = clamp(+o.infoInject, 0, 4);
      if (o.negCoupling != null) S.kappa = clamp(+o.negCoupling, 0, 1);
      if (o.tableSize != null) S.K = clamp(Math.round(+o.tableSize), 3, 7);
      sync();
      if (o.lens) setLens(o.lens, true); else paint();
    },
    /** Viewport coordinates of a world point under the current projection, and its depth. */
    screen: screenOf,
    /** The world point of the κ gauge on the boundary ring for a coupling k (default: the current one). */
    gaugePoint: (k) => gaugePoint(k == null ? S.kappa : k),
    ladderAt: (I) => { const l = ladderAt(I); return JSON.parse(JSON.stringify({ dets: l.dets, rank: l.rank, residual: l.residual })); },
    cutAt: (k) => JSON.parse(JSON.stringify(cutAt(k))),
    palette: () => ({ cyan: P.cyan, magenta: P.magenta, violet: P.violet, amber: P.amber, dim: P.dim })
  };
  window.TRV_THUMB = () => { cards.pick('concept-obstruction-cascade'); clock.pause(); clock.set(1); paint.now(); };
  cards.pick(cards.initial('gram-overflow-cascade'));
  booting = false;
})();
