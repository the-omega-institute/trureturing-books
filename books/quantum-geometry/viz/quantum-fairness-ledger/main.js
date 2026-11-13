/* ORTHO//FAIRNESS: five ledgers of chapter 31 on one Bloch sphere. Each scene draws the sphere and, beside it, a bar
   whose total does not move (in the seat: two Born bars that stay equal, and a cap count beside the fixed Haar mark).
     seat     points from a fixed seed, uniform on the sphere. Under the Haar measure a cap of half-angle α around any axis
              has measure exactly (1 − cos α)/2; the finite count of the sample only scatters around it (60°, 600 points:
              145 in the cap about +z, 147 about −z, against 150). The centroid tends to the centre as N grows, but not at
              every step (N = 10: 0.214, N = 15: 0.309). Two pure states measure each other with the same Born weight
              |⟨φ|ψ⟩|² = |⟨ψ|φ⟩|² = (1 + r_ψ·r_φ)/2, exactly
     gain     an arrow r of length r ≤ 1: its shadow on the measurement axis D = |z| and its sideways part
              V = √(x² + y²) satisfy D² + V² = r² (the qubit case of centred purity = visible certainty + residual mass,
              worked out by hand and doubled); r = 0 is the centre, with no direction
     bonds    the three-qubit pure states a|000⟩ + b|110⟩ + c|101⟩ + g|111⟩: A's Bloch arrow is (0, 0, 2a² − 1) and
              ‖r_A‖² + τ_AB + τ_AC + τ₃ = 1 with τ_AB = 4a²b², τ_AC = 4a²c², τ₃ = 4a²g²
     copies   the optimal symmetric 1 → M copier of an unknown qubit shrinks the arrow by η = (M + 2)/(3M):
              fidelity F = (1 + η)/2 = (2M + 1)/(3M)
     ergodic  two states precessing about z by the golden angle 2πα, α = φ − 1, from different phases; a window of
              azimuths of length 2 − φ = 1 − α, counted half-open (left end in); hits − T(2 − φ) stays in (−1, 1)
              (Hecke–Kesten); the comparison is a fixed-seed independent random walk, plotted untruncated
   The rail is the number of points (seat), the tilt in degrees (gain), the path parameter (bonds), M − 1 (copies) or
   the step count T (ergodic). The ball is drawn with kit.solid (a glass shell with lit solids in it); the ledger bars
   are flat, on the 2D canvas #flat over the stage. Read-only probe for the browser suite: window.FAIRNESS_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  /** τ with a real subscript on a canvas chart (no ASCII underscore on the stage): the subscript smaller and lower. */
  function subText(g, x, y, sub, color, s) {
    const size = 10.5, small = { ...s, size: 8, dy: (s.dy || 0) + 3 }, right = s.align === 'right';
    if (right) { g.text(x, y, sub, color, small); const w = g.ctx.measureText(sub).width; g.text(x, y, 'τ', color, { ...s, size, dx: (s.dx || 0) - w }); }
    else { g.text(x, y, 'τ', color, { ...s, size }); const w = g.ctx.measureText('τ').width; g.text(x, y, sub, color, { ...small, dx: (s.dx || 0) + w }); }
  }
  const DEG = Math.PI / 180, TAU = 2 * Math.PI;
  const PHI = (1 + Math.sqrt(5)) / 2, ALPHA = PHI - 1, WIN = 2 - PHI;

  /* ---------- shared state ---------- */
  const S = {
    scene: 'seat',
    psi: v3.sph(55 * DEG, -35 * DEG), phi: v3.sph(118 * DEG, 70 * DEG), axis: [0, 0, 1], cap: 60,
    pur: 1, az: -35 * DEG,
    u1: 0, u2: 0.41, lat1: 62 * DEG, lat2: 122 * DEG, c: 0.18
  };

  /* ---------- seat: Haar points from a fixed seed ---------- */
  const NMAX = 600;
  function mulberry(a) { return () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const HAAR = (() => { const r = mulberry(31), pts = []; for (let i = 0; i < NMAX; i++) { const z = 2 * r() - 1, f = TAU * r(), s = Math.sqrt(1 - z * z); pts.push([s * Math.cos(f), s * Math.sin(f), z]); } return pts; })();
  const capShare = (axis, n, alpha) => { const c = Math.cos(alpha * DEG); let k = 0; for (let i = 0; i < n; i++) if (v3.dot(HAAR[i], axis) >= c) k++; return n ? k / n : 0; };
  const centroid = (n) => { let s = [0, 0, 0]; for (let i = 0; i < n; i++) s = v3.add(s, HAAR[i]); return n ? v3.len(s) / n : 0; };
  /** Amplitudes (cos θ/2, e^{iφ} sin θ/2) of the pure state with Bloch vector v, as [[re, im], [re, im]]. */
  const amp = (v) => { const th = Math.acos(kit.clamp(v[2], -1, 1)), ph = Math.atan2(v[1], v[0]); return [[Math.cos(th / 2), 0], [Math.cos(ph) * Math.sin(th / 2), Math.sin(ph) * Math.sin(th / 2)]]; };
  /** ⟨u|w⟩ = Σ conj(uᵢ) wᵢ. */
  const braket = (u, w) => [u[0][0] * w[0][0] + u[0][1] * w[0][1] + u[1][0] * w[1][0] + u[1][1] * w[1][1], u[0][0] * w[0][1] - u[0][1] * w[0][0] + u[1][0] * w[1][1] - u[1][1] * w[1][0]];
  const abs2 = (z) => z[0] * z[0] + z[1] * z[1];
  function seatRead() {
    const n = Math.round(clock.t), a = amp(S.psi), b = amp(S.phi);
    return { n, share: capShare(S.axis, n, S.cap), theory: (1 - Math.cos(S.cap * DEG)) / 2, cen: centroid(n),
      wPsiPhi: abs2(braket(b, a)), wPhiPsi: abs2(braket(a, b)), wBloch: (1 + v3.dot(S.psi, S.phi)) / 2 };
  }

  /* ---------- gain: the arrow and its two parts ---------- */
  function gainRead() {
    const th = clock.t * DEG, v = v3.scale([Math.sin(th) * Math.cos(S.az), Math.sin(th) * Math.sin(S.az), Math.cos(th)], S.pur);
    // ρ = (I + v·σ)/2 written out, then everything read from the matrix
    const r00 = (1 + v[2]) / 2, r11 = (1 - v[2]) / 2, r01 = [v[0] / 2, -v[1] / 2];
    const tr2 = r00 * r00 + r11 * r11 + 2 * abs2(r01), budget = tr2 - 0.5, visible = (r00 - 0.5) ** 2 + (r11 - 0.5) ** 2, residual = 2 * abs2(r01);
    const D = Math.abs(r00 - r11), V = 2 * Math.sqrt(abs2(r01));
    return { th: clock.t, v, r: S.pur, tr2, budget, visible, residual, D, V };
  }

  /* ---------- bonds: a path through a|000⟩ + b|110⟩ + c|101⟩ + g|111⟩ ---------- */
  const s2 = Math.SQRT1_2, s3 = 1 / Math.sqrt(3);
  const ANCHORS = [[1, 0, 0, 0], [s2, s2, 0, 0], [s3, s3, s3, 0], [s2, 0, 0, s2]];
  function coeffs(t) {
    const k = Math.min(2, Math.floor(t + 1e-12)), u = kit.clamp(t - k, 0, 1), A = ANCHORS[k], B = ANCHORS[k + 1];
    const cosw = A.reduce((s, x, i) => s + x * B[i], 0), w = Math.acos(kit.clamp(cosw, -1, 1));
    if (w < 1e-12) return A.slice();
    const p = Math.sin((1 - u) * w) / Math.sin(w), q = Math.sin(u * w) / Math.sin(w);
    return A.map((x, i) => p * x + q * B[i]);
  }
  function bondsRead(t) {
    const [a, b, c, g] = coeffs(t == null ? clock.t : t), a2 = a * a;
    const tAB = 4 * a2 * b * b, tAC = 4 * a2 * c * c, t3 = 4 * a2 * g * g, tABC = 4 * a2 * (b * b + c * c + g * g), rz = 2 * a2 - 1;
    return { a, b, c, g, tAB, tAC, t3, tABC, rA: [0, 0, rz], keep: rz * rz, total: rz * rz + tAB + tAC + t3 };
  }

  /* ---------- copies ---------- */
  const MMAX = 12;
  const eta = (M) => (M + 2) / (3 * M), fid = (M) => (2 * M + 1) / (3 * M);
  const copiesM = () => 1 + Math.floor(clock.t + 1e-9);

  /* ---------- ergodic: the golden rotation ---------- */
  const TMAX = 377;
  const frac = (x) => x - Math.floor(x);
  const inWin = (x) => frac(x - (S.c - WIN / 2)) < WIN;
  function orbit(u, T) {
    const xs = [], hit = [], disc = [], R = [];
    let k = 0, last = null, gap = 0;
    for (let t = 1; t <= T; t++) {
      const x = frac(t * ALPHA + u), h = inWin(x); xs.push(x); hit.push(h);
      if (h) { k++; if (last != null) gap = Math.max(gap, t - last); last = t; }
      disc.push(k - t * WIN); R.push(k / t);
    }
    return { xs, hit, disc, R, hits: k, gap };
  }
  const RANDOM = (() => { const r = mulberry(7), d = []; let k = 0; for (let t = 1; t <= TMAX; t++) { if (r() < WIN) k++; d.push(k - t * WIN); } return d; })();
  /** The literal range of the random comparison: it is plotted in full, not clipped. */
  const RANDOM_RANGE = [Math.min(...RANDOM), Math.max(...RANDOM)];
  const ergodicRead = () => { const T = Math.floor(clock.t + 1e-9), o1 = orbit(S.u1, T), o2 = orbit(S.u2, T), full = orbit(S.u1, 2000); return { T, o1, o2, gapMax: full.gap, M: full.gap - 1 }; };

  /* ---------- scenes ---------- */
  const SC = {
    seat: { max: NMAX, rate: 120, step: 20, start: NMAX, view: [-0.62, 0.34], name: ['席位', 'SEAT'] },
    gain: { max: 180, rate: 40, step: 15, start: 60, view: [35 * DEG, 0.22], name: ['得失', 'GAIN'] },
    bonds: { max: 3, rate: 0.45, step: 1, start: 2, view: [-0.35, 0.18], name: ['关系', 'BONDS'] },
    copies: { max: MMAX - 1, rate: 1.6, step: 1, start: 4, view: [-0.62, 0.3], name: ['复制', 'COPIES'] },
    ergodic: { max: TMAX, rate: 34, step: 1, start: 233, view: [-0.62, 0.62], name: ['遍历', 'HISTORY'] }
  };

  /* ---------- stage: one glass Bloch ball with lit solids in it (kit.solid); the ledger bars on the flat canvas ----------
     The outer ball is a glass shell; the cap, the gain triangle, the three-way face, the copy's ball and the window are
     opaque lit surfaces or polyhedra, shadows, bonds and lost parts are lit tubes, points and partners are beads. The
     centre of the ball moves left on wide stages to leave room for the ledger column: drawStage sets stage.cx before
     each frame, and the construction options only read it back. */
  const PI = Math.PI, E3 = [0, 0, 1];
  let grab = null, stage;
  const SO = { canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.32, cy: 0.54, onChange: () => paint(), get cx() { return stage ? stage.cx : 0.5; } };
  SO.onPick = (ev, st) => {
    const near = (v) => st.near(ev, v) < 24;
    grab = null;
    if (S.scene === 'seat') grab = near(S.axis) ? 'axis' : near(S.psi) ? 'psi' : near(S.phi) ? 'phi' : null;
    else if (S.scene === 'gain') grab = near(gainRead().v) ? 'gain' : null;
    else if (S.scene === 'copies') grab = near(S.psi) ? 'psi' : null;
    return !!grab;
  };
  SO.onDrag = (ev, st) => {
    const p = v3.unit(st.pick(ev));
    if (grab === 'axis') S.axis = p; else if (grab === 'psi') S.psi = p; else if (grab === 'phi') S.phi = p;
    else if (grab === 'gain') { S.az = Math.atan2(p[1], p[0]); clock.pause(); clock.set(Math.acos(kit.clamp(p[2], -1, 1)) / DEG); }
    cards.mark(null); paint();
  };
  SO.onDrop = () => { grab = null; };
  stage = kit.solid($('stage'), SO);

  /* page geometry: sampled circles, drawn with the stage's own line and tube */
  /** Two unit vectors completing the unit vector n to an orthonormal frame. */
  const frameOf = (n) => { const e1 = v3.unit(v3.cross(n, Math.abs(n[2]) < 0.9 ? E3 : [1, 0, 0])); return [e1, v3.cross(n, e1)]; };
  /** k + 1 points round the circle of centre c, unit normal n and radius r (closed: the last point is the first). */
  function circlePts(c, n, r, k = 144) {
    const [e1, e2] = frameOf(n), pts = [];
    for (let i = 0; i <= k; i++) { const a = TAU * i / k; pts.push(v3.add(c, v3.add(v3.scale(e1, r * Math.cos(a)), v3.scale(e2, r * Math.sin(a))))); }
    return pts;
  }
  /** A straight line from a to b, skipped where the two ends meet. */
  const seg = (st, a, b, s) => { if (v3.len(v3.sub(b, a)) > 1e-6) st.line([a, b], s); };
  /** A lit rod (a keyed tube) from a to b, skipped where the two ends meet. */
  const rod = (st, key, a, b, s) => { if (v3.len(v3.sub(b, a)) > 1e-6) st.tube(key, [a, b], s); };
  /** Lines lying on the opaque patches of the sphere sit a hair above them. */
  const LIFT = 1.006;
  /** Radius of the partners B and C, in world units. */
  const PARTNER = 0.17;

  /** A vertical bar of the ledger, in CSS pixels: segments [value, colour, alpha] stacked from the bottom; total 1. */
  function bar(c, x, y0, w, h, segs, s) {
    s = s || {};
    c.strokeStyle = TRV.alpha(P.ink, 0.55); c.lineWidth = 1; c.strokeRect(x + 0.5, y0 + 0.5, w - 1, h - 1);
    let y = y0 + h;
    for (const [v, col, al] of segs) { const hh = Math.max(0, v) * h; c.globalAlpha = al == null ? 0.85 : al; c.fillStyle = col; c.fillRect(x + 2, y - hh, w - 4, hh); y -= hh; }
    c.globalAlpha = 1;
    for (const [v, col, dash] of s.marks || []) { const yy = y0 + h - v * h; c.strokeStyle = col; c.lineWidth = 1.5; c.setLineDash(dash ? [4, 3] : []); c.beginPath(); c.moveTo(x - 6, yy); c.lineTo(x + w + 6, yy); c.stroke(); c.setLineDash([]); }
  }
  const wide = () => $('cv').clientWidth > 600;
  /** Geometry of the ledger column on the right of the stage (null on narrow stages). */
  function column(n) {
    const W = $('cv').clientWidth, H = $('cv').clientHeight;
    if (W <= 600) return null;
    const x1 = W - Math.max(40, W * 0.05), bw = Math.min(46, (W * 0.2) / Math.max(1, n) - 10), gapx = n > 6 ? 6 : 16, x0 = x1 - n * bw - (n - 1) * gapx;
    const top = Math.max(84, H * 0.2), h = Math.min(H * 0.52, H - top - 96);
    return { W, H, x0, bw, gapx, top, h, xs: Array.from({ length: n }, (_, i) => x0 + i * (bw + gapx)) };
  }

  function drawSeat(st, c) {
    const R = seatRead(), thick = TRV.thumbMode ? 1.6 : 1, ca = Math.cos(S.cap * DEG);
    // the cap around the chosen axis: a lit patch of the sphere of half-angle α, its rim, and the points inside it
    const [e1, e2] = frameOf(S.axis);
    st.surface('cap', (u, v) => v3.add(v3.scale(S.axis, Math.cos(u)), v3.add(v3.scale(e1, Math.sin(u) * Math.cos(v)), v3.scale(e2, Math.sin(u) * Math.sin(v)))),
      { u: [0, S.cap * DEG], v: [0, TAU], nu: 18, nv: 96, color: P.amber, id: 'cap' });
    const rimC = v3.scale(S.axis, ca * LIFT), rimR = Math.sin(S.cap * DEG) * LIFT;
    st.line(circlePts(rimC, S.axis, rimR), { color: P.amber, width: 1.3 * thick, alpha: 0.8, dash: [5, 4] });
    for (let i = 0; i < R.n; i++) { const p = HAAR[i], inside = v3.dot(p, S.axis) >= ca; st.bead(p, { r: inside ? 2.6 : 1.9, color: inside ? P.cyan : P.dim, glow: inside ? 0.55 : 0.3, key: 'h' + i }); }
    rod(st, 'axis', [0, 0, 0], v3.scale(S.axis, 1.1), { width: 1.6 * thick, color: P.amber });
    st.bead(S.axis, { r: 6.5, color: P.amber, key: 'axis' });
    // ψ and φ: each one's shadow on the other's diameter has the same length
    const d = v3.dot(S.psi, S.phi);
    st.line([v3.scale(S.phi, -1), S.phi], { color: P.faint, width: 1, alpha: 0.7 });
    st.line([v3.scale(S.psi, -1), S.psi], { color: P.faint, width: 1, alpha: 0.7 });
    rod(st, 'shadowPhi', [0, 0, 0], v3.scale(S.phi, d), { width: 4 * thick, color: P.cyan });
    rod(st, 'shadowPsi', [0, 0, 0], v3.scale(S.psi, d), { width: 4 * thick, color: P.cyan });
    seg(st, S.psi, v3.scale(S.phi, d), { color: P.dim, width: 1, dash: [3, 3] });
    seg(st, S.phi, v3.scale(S.psi, d), { color: P.dim, width: 1, dash: [3, 3] });
    st.arrow([0, 0, 0], S.psi, { color: P.ink, width: 2.2, headSize: 10 });
    st.arrow([0, 0, 0], S.phi, { color: P.ink, width: 2.2, headSize: 10 });
    st.tag('psi', S.psi, 'ψ', 'num big', { dx: 12, dy: -10 }); st.tag('phi', S.phi, 'φ', 'num big', { dx: 12, dy: -10 });
    st.tag('n', v3.scale(S.axis, 1.1), 'n', 'num c-am', { dx: 10, dy: -8 });
    const col = column(3);
    if (col) {
      bar(c, col.xs[0], col.top, col.bw, col.h, [[R.wPsiPhi, P.cyan]]);
      bar(c, col.xs[1], col.top, col.bw, col.h, [[R.wPhiPsi, P.cyan]]);
      bar(c, col.xs[2], col.top, col.bw, col.h, [[R.share, P.cyan]], { marks: [[R.theory, P.ink, true]] });
      const lab = (k, i, html) => st.tag(k, [col.xs[i] + col.bw / 2, col.top + col.h + 16], html, 'num', { screen: true });
      lab('b0', 0, 'ψ→φ'); lab('b1', 1, 'φ→ψ'); lab('b2', 2, L('球冠', 'cap'));
      st.tag('bt', [col.xs[0] + col.bw / 2 + col.bw + col.gapx / 2, col.top - 18], fix(R.wPsiPhi, 3), 'num c-cy', { screen: true });
    }
    $('hudBig').textContent = L(`球冠 ${fix(100 * R.share, 1)}%`, `CAP ${fix(100 * R.share, 1)}%`);
    $('hudSub').textContent = L(`${R.n} 个固定种子点；哈尔测度下半角 ${S.cap}° 的球冠对任何轴都恰占 ${fix(100 * R.theory, 1)}%，有限个点的计数围着它起伏`, `${R.n} fixed-seed points; under the Haar measure a cap of half-angle ${S.cap}° holds exactly ${fix(100 * R.theory, 1)}% around any axis, and a finite count scatters around it`);
  }

  function drawGain(st, c) {
    const R = gainRead(), v = R.v, thick = TRV.thumbMode ? 1.6 : 1, foot = [0, 0, v[2]];
    if (R.r < 0.995) {
      // the ball of radius r the arrow can reach: its outline as seen, and its equator
      const rr = Math.max(R.r, 0.001);
      st.line(circlePts([0, 0, 0], st.facing(), rr), { color: P.faint, width: 1, alpha: 0.5 });
      st.line(circlePts([0, 0, 0], E3, rr), { color: P.faint, width: 1, alpha: 0.4 });
    }
    st.line([[0, 0, -1.2], [0, 0, 1.2]], { color: P.ink, width: 1.2, alpha: 0.75 });
    st.tag('k0', [0, 0, 1.12], '|0⟩', 'num', { dx: -22 }); st.tag('k1', [0, 0, -1.12], '|1⟩', 'num', { dx: -22 });
    // the budget circle in the plane of the arrow: radius r
    const e = [Math.cos(S.az), Math.sin(S.az), 0], circ = [];
    for (let i = 0; i <= 96; i++) { const a = TAU * i / 96; circ.push(v3.add(v3.scale(e, R.r * Math.sin(a)), [0, 0, R.r * Math.cos(a)])); }
    if (R.r > 1e-6) st.line(circ, { color: P.dim, width: 1, alpha: 0.6, dash: [4, 4] });
    // the right triangle origin – foot – tip: a lit face, the line D along the axis and the area V across it
    if (R.D > 1e-6 && R.V > 1e-6) st.poly('gainTri', { vertices: [[0, 0, 0], foot, v], faces: [[0, 1, 2]] }, { color: P.magenta, edges: false, id: 'gainTri' });
    rod(st, 'lineD', [0, 0, 0], foot, { width: 5 * thick, color: P.cyan });
    rod(st, 'areaV', foot, v, { width: 3.5 * thick, color: P.magenta });
    st.arrow([0, 0, 0], v, { color: P.amber, width: 2.6, headSize: 11 });
    if (Math.abs(v[2]) > 0.12) st.tag('D', v3.scale(foot, 0.5), `D ${fix(R.D, 2)}`, 'num c-cy', { dx: 34 });
    if (R.V > 0.12) st.tag('V', v3.lerp(foot, v, 0.5), `V ${fix(R.V, 2)}`, 'num c-mg', { dy: v[2] >= 0 ? -14 : 14 });
    const col = column(1);
    if (col) {
      bar(c, col.xs[0], col.top, col.bw, col.h, [[R.D * R.D, P.cyan], [R.V * R.V, P.magenta], [1 - R.r * R.r, P.faint, 0.6]], { marks: [[R.r * R.r, P.ink, true]] });
      st.tag('g0', [col.xs[0] + col.bw / 2, col.top + col.h + 16], 'D² + V²', 'num', { screen: true });
      st.tag('g1', [col.xs[0] + col.bw / 2, col.top - 18], `= ${fix(R.D * R.D + R.V * R.V, 3)}`, 'num', { screen: true });
    }
    $('hudBig').textContent = `D² + V² = ${fix(R.D * R.D + R.V * R.V, 3)}`;
    $('hudSub').textContent = R.r <= 0
      ? L(`r = 0：箭头缩成球心的一点，没有方向；线 D = ${fix(R.D, 3)}，面积 V = ${fix(R.V, 3)}，预算 r² = 0`, `r = 0: the arrow is a point at the centre with no direction; line D = ${fix(R.D, 3)}, area V = ${fix(R.V, 3)}, budget r² = 0`)
      : L(`箭头偏离测量轴 ${fix(R.th, 0)}°：线 D = ${fix(R.D, 3)}，面积 V = ${fix(R.V, 3)}，预算 r² = ${fix(R.r * R.r, 3)}`, `The arrow is ${fix(R.th, 0)}° off the measurement axis: line D = ${fix(R.D, 3)}, area V = ${fix(R.V, 3)}, budget r² = ${fix(R.r * R.r, 3)}`);
  }

  function drawBonds(st, c) {
    const R = bondsRead(), thick = TRV.thumbMode ? 1.6 : 1, rA = R.rA;
    // partners B and C as lit balls; a bond's width is its tangle, the violet face is the three-way tangle: it grows
    // from the edge B–C towards A as τ₃ goes from 0 to 1
    const B = [1.55, 0.2, 0.75], C = [1.55, 0.2, -0.75], A0 = [0, 0, 0];
    if (R.t3 > 1e-6) {
      const near = (q, edge) => v3.lerp(edge, q, R.t3);
      st.poly('tangle3', { vertices: [near([0.62, 0.08, 0.3], B), B, C, near([0.62, 0.08, -0.3], C)], faces: [[0, 1, 2, 3]] }, { color: P.violet, edges: false, id: 'tangle3' });
    }
    const bond = (key, to, tau) => { const from = v3.unit(to); if (tau > 1e-6) rod(st, key, from, to, { width: (1 + 9 * tau) * thick, color: P.magenta }); else st.line([from, to], { color: P.faint, width: 1, alpha: 0.6, dash: [3, 4] }); };
    bond('bondB', B, R.tAB); bond('bondC', C, R.tAC);
    for (const [p, name] of [[B, 'B'], [C, 'C']]) { st.bead(p, { r: PARTNER * st.unit / st.lw, color: P.ink, glow: 0.12, key: name }); st.tag('n' + name, p, name, 'num big', { dx: 34, dy: -14 }); }
    // A's own arrow: only the part it keeps
    st.line([[0, 0, -1.15], [0, 0, 1.15]], { color: P.faint, width: 1, alpha: 0.7 });
    if (Math.abs(rA[2]) > 0.004) { rod(st, 'keepA', A0, rA, { width: 5 * thick, color: P.cyan }); st.arrow(A0, rA, { color: P.amber, width: 2.6, headSize: 11 }); }
    st.bead(A0, { r: 5.5, color: P.amber, key: 'A' });
    st.tag('nA', [0, 0, 1.08], 'A', 'num big', { dx: -20 });
    const col = column(1);
    if (col) {
      bar(c, col.xs[0], col.top, col.bw, col.h, [[R.keep, P.cyan], [R.tAB, P.magenta, 0.95], [R.tAC, P.magenta, 0.5], [R.t3, P.violet, 0.9]], { marks: [[1, P.ink, false]] });
      st.tag('l0', [col.xs[0] + col.bw / 2, col.top + col.h + 16], L('总额 1', 'total 1'), 'num', { screen: true });
      const mid = (lo, v, key, html, cls) => { if (v > 0.06) st.tag(key, [col.xs[0] - 10, col.top + col.h - (lo + v / 2) * col.h], html, 'num ' + cls, { screen: true, dx: -26 }); };
      mid(0, R.keep, 'l1', '‖r<sub>A</sub>‖²', 'c-cy'); mid(R.keep, R.tAB, 'l2', 'τ<sub>AB</sub>', 'c-mg'); mid(R.keep + R.tAB, R.tAC, 'l3', 'τ<sub>AC</sub>', 'c-mg'); mid(R.keep + R.tAB + R.tAC, R.t3, 'l4', 'τ₃', 'c-vi');
    }
    $('hudBig').textContent = L(`总额 ${fix(R.total, 3)}`, `TOTAL ${fix(R.total, 3)}`);
    $('hudSub').innerHTML = L('‖r<sub>A</sub>‖² + τ<sub>AB</sub> + τ<sub>AC</sub> + τ₃，态 ', '‖r<sub>A</sub>‖² + τ<sub>AB</sub> + τ<sub>AC</sub> + τ₃ for ') + `${fix(R.a, 3)}|000⟩ + ${fix(R.b, 3)}|110⟩ + ${fix(R.c, 3)}|101⟩ + ${fix(R.g, 3)}|111⟩`;
  }

  function drawCopies(st, c) {
    const M = copiesM(), et = eta(M), thick = TRV.thumbMode ? 1.6 : 1, p = S.psi;
    // what each copy can reach: a lit ball of radius η inside the glass; its arrow ends on that ball
    st.surface('copyBall', (u, v) => v3.scale(v3.sph(u, v), et), { u: [0, PI], v: [0, TAU], nu: 36, nv: 72, color: P.cyan, id: 'copyBall' });
    // the orthogonal pair at the poles can be copied exactly
    for (const z of [1, -1]) st.ring([0, 0, z], { r: 5, color: P.ink, key: z > 0 ? 'pole0' : 'pole1' });
    st.line([[0, 0, -1.12], [0, 0, 1.12]], { color: P.faint, width: 1, alpha: 0.7 });
    rod(st, 'lost', v3.scale(p, et), p, { width: 3.5 * thick, color: P.magenta });
    st.arrow([0, 0, 0], v3.scale(p, et), { color: P.cyan, width: 4.5 * thick, headSize: 12 });
    st.bead(p, { r: 6, color: P.amber, key: 'psi' });
    st.tag('psi', p, 'ψ', 'num c-am big', { dx: 14, dy: -12 });
    st.tag('k0', [0, 0, 1], '|0⟩', 'num', { dx: -24 }); st.tag('k1', [0, 0, -1], '|1⟩', 'num', { dx: -24 });
    const col = column(M);
    if (col) {
      const F = fid(M);
      col.xs.forEach((x) => bar(c, x, col.top, col.bw, col.h, [[F, P.cyan], [1 - F, P.magenta, 0.55]], { marks: [[2 / 3, P.ink, true]] }));
      st.tag('cF', [col.x0 + (col.xs[M - 1] + col.bw - col.x0) / 2, col.top + col.h + 16], `F = ${fix(F, 3)}`, 'num c-cy', { screen: true });
      st.tag('c23', [col.x0 - 8, col.top + col.h / 3], '2/3', 'num', { screen: true, dx: -12 });
    }
    $('hudBig').textContent = `M = ${M} · η = ${fix(et, 3)}`;
    $('hudSub').textContent = L(`每份副本的箭头只剩原来的 ${fix(et, 3)}，保真度 (2M + 1)/(3M) = ${fix(fid(M), 3)}`, `Each copy keeps ${fix(et, 3)} of the arrow; fidelity (2M + 1)/(3M) = ${fix(fid(M), 3)}`);
  }

  function drawErgodic(st, c) {
    const E = ergodicRead(), T = E.T, thick = TRV.thumbMode ? 1.6 : 1, a0 = TAU * (S.c - WIN / 2), a1 = TAU * (S.c + WIN / 2);
    // the window: the lune of azimuths between two meridians, a lit patch of the sphere, and its two edges
    st.surface('lune', (u, v) => v3.sph(u, v), { u: [0, PI], v: [a0, a1], nu: 36, nv: 48, color: P.cyan, id: 'lune' });
    const mer = (a) => { const pts = []; for (let i = 0; i <= 40; i++) { const th = PI * i / 40; pts.push(v3.scale([Math.sin(th) * Math.cos(a), Math.sin(th) * Math.sin(a), Math.cos(th)], LIFT)); } return pts; };
    st.line(mer(a0), { color: P.cyan, width: 1.6 * thick, alpha: 0.85 }); st.line(mer(a1), { color: P.cyan, width: 1.6 * thick, alpha: 0.85 });
    st.line(circlePts([0, 0, Math.cos(S.lat1)], E3, Math.sin(S.lat1)), { color: P.faint, width: 1, alpha: 0.8 });
    st.line(circlePts([0, 0, Math.cos(S.lat2)], E3, Math.sin(S.lat2)), { color: P.faint, width: 1, alpha: 0.8 });
    const at = (lat, x) => [Math.sin(lat) * Math.cos(TAU * x), Math.sin(lat) * Math.sin(TAU * x), Math.cos(lat)];
    E.o1.xs.forEach((x, i) => st.bead(at(S.lat1, x), { r: E.o1.hit[i] ? 2.2 : 1.5, color: E.o1.hit[i] ? P.cyan : P.dim, glow: E.o1.hit[i] ? 0.8 : 0.3, key: 'o1_' + i }));
    E.o2.xs.forEach((x, i) => st.bead(at(S.lat2, x), { r: E.o2.hit[i] ? 2.2 : 1.5, color: E.o2.hit[i] ? P.cyan : P.dim, glow: E.o2.hit[i] ? 0.8 : 0.3, key: 'o2_' + i }));
    rod(st, 'axis', [0, 0, -1.15], [0, 0, 1.15], { width: 1.4, color: P.violet });
    if (T > 0) {
      const p1 = at(S.lat1, E.o1.xs[T - 1]), p2 = at(S.lat2, E.o2.xs[T - 1]);
      st.arrow([0, 0, Math.cos(S.lat1)], p1, { color: P.amber, width: 2.2, headSize: 9 });
      st.ring(p2, { r: 6, color: P.ink, key: 'now2' });
      st.tag('o1', p1, '①', 'num c-am', { dx: 14, dy: -10 }); st.tag('o2', p2, '②', 'num', { dx: 14, dy: -10 });
    }
    const col = column(2);
    if (col) {
      const r1 = T ? E.o1.hits / T : 0, r2 = T ? E.o2.hits / T : 0;
      bar(c, col.xs[0], col.top, col.bw, col.h, [[r1, P.cyan]], { marks: [[WIN, P.ink, true]] });
      bar(c, col.xs[1], col.top, col.bw, col.h, [[r2, P.cyan]], { marks: [[WIN, P.ink, true]] });
      st.tag('e1', [col.xs[0] + col.bw / 2, col.top + col.h + 16], '①', 'num c-am', { screen: true });
      st.tag('e2', [col.xs[1] + col.bw / 2, col.top + col.h + 16], '②', 'num', { screen: true });
      st.tag('ew', [col.x0 - 8, col.top + col.h * (1 - WIN)], '2 − φ', 'num', { screen: true, dx: -22 });
    }
    $('hudBig').textContent = `T = ${T}`;
    $('hudSub').textContent = L(`份额 ${fix(T ? E.o1.hits / T : 0, 3)} 与 ${fix(T ? E.o2.hits / T : 0, 3)}；每步转过黄金角 ${fix(360 * ALPHA, 1)}°，窗口占 2 − φ = ${fix(WIN, 4)}；两位的偏差都在 (−1, 1) 里`, `Shares ${fix(T ? E.o1.hits / T : 0, 3)} and ${fix(T ? E.o2.hits / T : 0, 3)}; each step turns by the golden angle ${fix(360 * ALPHA, 1)}°; the window holds 2 − φ = ${fix(WIN, 4)}; both discrepancies stay in (−1, 1)`);
  }

  function drawStage() {
    stage.cx = wide() ? 0.4 : 0.5;
    const st = stage, flat = $('flat');
    st.begin();
    // the flat overlay of the ledger bars, cleared on every frame
    const dpr = TRV.fitCanvas(flat), c = flat.getContext('2d');
    c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, flat.width, flat.height); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    st.glass('bloch', [0, 0, 0], 1, { color: P.cyan, alpha: 0.08, rim: 0.55 });
    st.line(circlePts([0, 0, 0], E3, 1), { color: P.lineHot, width: 1.1, alpha: 0.55 });   // the equator
    ({ seat: drawSeat, gain: drawGain, bonds: drawBonds, copies: drawCopies, ergodic: drawErgodic })[S.scene](st, c);
    st.end();
    const hud = $('hudSub').parentElement;
    $('stage').style.setProperty('--scene-top', `${hud.offsetTop + hud.offsetHeight + 8}px`);
  }

  /* ---------- strip ---------- */
  function drawPlots() {
    const A = $('plotA'), B = $('plotB');
    if (S.scene === 'seat') {
      const R = seatRead(), az = Math.atan2(S.axis[1], S.axis[0]), g = kit.plot(A, { x: [0, 180], y: [0, 0.6], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [0, 0.25, 0.5], xTicks: [[0, '0°'], [90, '90°'], [180, '180°']] });
      const pts = []; for (let b = 0; b <= 180; b += 3) pts.push([b, capShare(v3.sph(b * DEG, az), Math.max(R.n, 1), S.cap)]);
      g.hline(R.theory, P.ink, { dash: [4, 3], alpha: 0.8 }); g.line(pts, P.cyan);
      const pol = Math.acos(kit.clamp(S.axis[2], -1, 1)) / DEG; g.vline(pol, P.amber); g.dot(pol, R.share, P.amber, 4.5);
      g.legend([[P.cyan, L('数出来的份额', 'counted share')], [P.ink, L('哈尔测度 (1 − cos α)/2', 'Haar measure (1 − cos α)/2'), 'dash']], { right: true });
      $('pATitle').textContent = L('轴转到哪里，计数都围着同一条虚线起伏', 'Wherever the axis turns, the count scatters about one line'); $('pAMeta').textContent = `N = ${R.n}`;
      const g2 = kit.plot(B, { x: [0, NMAX], y: [0, 0.6], pad: [34, 10, 10, 22] });
      g2.axes({ yTicks: [0, 0.2, 0.4, 0.6], xTicks: [0, 200, 400, 600] });
      const cen = [], ref = []; for (let n = 5; n <= NMAX; n += 5) { cen.push([n, centroid(n)]); ref.push([n, 1 / Math.sqrt(n)]); }
      g2.line(ref, P.ink, { dash: [4, 3], alpha: 0.7 }); g2.line(cen, P.cyan); g2.vline(R.n, P.amber); g2.dot(R.n, R.cen, P.amber, 4);
      g2.legend([[P.cyan, L('质心离球心多远', 'centroid from the centre')], [P.ink, '1/√N', 'dash']]);
      $('pBTitle').textContent = L('质心大势趋向球心，但不是每步都更近', 'The centroid drifts to the centre, not at every step'); $('pBMeta').textContent = fix(R.cen, 3);
    } else if (S.scene === 'gain') {
      const R = gainRead(), g = kit.plot(A, { x: [0, 180], y: [0, 1.55], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0°'], [90, '90°'], [180, '180°']] });
      const d2 = [], v2 = []; for (let t = 0; t <= 180; t += 2) { const cc = Math.cos(t * DEG) * R.r, ss = Math.sin(t * DEG) * R.r; d2.push([t, cc * cc]); v2.push([t, ss * ss]); }
      g.hline(R.r * R.r, P.ink, { dash: [4, 3] }); g.area(d2, P.cyan, { alpha: 0.15 }); g.line(d2, P.cyan); g.line(v2, P.magenta);
      g.vline(R.th, P.amber); g.dot(R.th, R.D * R.D, P.cyan, 4.5); g.dot(R.th, R.V * R.V, P.magenta, 4.5);
      g.legend([[P.cyan, L('线² D²', 'line² D²')], [P.magenta, L('面积² V²', 'area² V²')], [P.ink, L('两者之和 r²', 'their sum r²'), 'dash']], { right: true, dy: 0 });
      $('pATitle').textContent = L('线与面积此消彼长，和不动', 'Line and area trade off, the sum stays'); $('pAMeta').textContent = `${fix(R.D * R.D, 3)} + ${fix(R.V * R.V, 3)}`;
      const g2 = kit.plot(B, { x: [-0.05, 1.1], y: [-0.05, 1.1], pad: [30, 10, 8, 22], equal: true });
      g2.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 0.5, 1] });
      const q = (r) => { const pts = []; for (let i = 0; i <= 48; i++) pts.push([r * Math.cos(Math.PI / 2 * i / 48), r * Math.sin(Math.PI / 2 * i / 48)]); return pts; };
      g2.area(q(1), P.faint, { alpha: 0.12 }); g2.line(q(1), P.ink, { width: 1.2, alpha: 0.8 }); if (R.r < 0.995) g2.line(q(R.r), P.ink, { dash: [4, 3], alpha: 0.8 });
      g2.line([[0, 0], [R.D, 0]], P.cyan, { width: 3 }); g2.line([[R.D, 0], [R.D, R.V]], P.magenta, { width: 2.4 }); g2.dot(R.D, R.V, P.amber, 5, { glow: 8 });
      g2.text(1.08, 0, 'D', P.cyan, { align: 'right', base: 'bottom', dy: -3 }); g2.text(0, 1.08, 'V', P.magenta, { dx: 5, base: 'top' });
      $('pBTitle').textContent = L('可区分度与相干落在圆上', 'Distinguishability and coherence lie on a circle'); $('pBMeta').textContent = 'D² + V² = r²';
    } else if (S.scene === 'bonds') {
      const g = kit.plot(A, { x: [0, 3], y: [0, 1.08], pad: [30, 10, 10, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, L('直积', 'product')], [1, L('贝尔', 'Bell')], [2, 'W'], [3, 'GHZ']] });
      const lo = [], l1 = [], l2 = [], l3 = [], l4 = [];
      for (let i = 0; i <= 120; i++) { const t = 3 * i / 120, r = bondsRead(t); lo.push([t, 0]); l1.push([t, r.keep]); l2.push([t, r.keep + r.tAB]); l3.push([t, r.keep + r.tAB + r.tAC]); l4.push([t, r.total]); }
      const band = (top, bot, col, al) => g.poly(top.concat(bot.slice().reverse()), col, { alpha: al });
      band(l1, lo, P.cyan, 0.35); band(l2, l1, P.magenta, 0.45); band(l3, l2, P.magenta, 0.22); band(l4, l3, P.violet, 0.4);
      g.line(l4, P.ink, { width: 1.2 }); g.vline(kit.clamp(clock.t, 0, 3), P.amber);
      $('pATitle').textContent = L('沿路走：四份加起来始终是 1', 'Along the path the four parts always add up to 1'); $('pAMeta').textContent = '';
      const R = bondsRead(), g2 = kit.plot(B, { x: [-0.04, 1.08], y: [-0.04, 1.08], pad: [30, 10, 8, 22], equal: true });
      g2.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 0.5, 1] });
      g2.poly([[0, 0], [1, 0], [0, 1]], P.faint, { alpha: 0.15 }); g2.line([[1, 0], [0, 1]], P.ink, { width: 1.2 });
      const cap = R.tABC; if (cap < 0.999) g2.line([[cap, 0], [0, cap]], P.ink, { dash: [4, 3] });
      const path = []; for (let i = 0; i <= 120; i++) { const r = bondsRead(3 * i / 120); path.push([r.tAB, r.tAC]); }
      g2.line(path, P.dim, { width: 1, dash: [2, 3] }); g2.dot(R.tAB, R.tAC, P.amber, 5, { glow: 8 });
      subText(g2, 1.06, 0, 'AB', P.magenta, { align: 'right', base: 'bottom', dy: -3 }); subText(g2, 0, 1.06, 'AC', P.magenta, { dx: 5, base: 'top' });
      $('pBTitle').textContent = L('两份二体纠缠不出这条线', 'The two pairwise bonds stay below the line'); $('pBMeta').innerHTML = 'τ<sub>AB</sub> + τ<sub>AC</sub> ≤ 4 det ρ<sub>A</sub>';
    } else if (S.scene === 'copies') {
      const M = copiesM(), g = kit.plot(A, { x: [0.5, MMAX + 0.5], y: [0.5, 1.04], pad: [34, 10, 10, 22] });
      g.axes({ yTicks: [[0.5, '0.5'], [2 / 3, '2/3'], [1, '1']], xTicks: [1, 2, 4, 6, 8, 10, 12] });
      g.hline(2 / 3, P.ink, { dash: [4, 3] });
      for (let m = 1; m <= MMAX; m++) g.rect(m - 0.3, 0.5, m + 0.3, fid(m), P.cyan, { alpha: m === M ? 0.95 : 0.4 });
      g.vline(M, P.amber);
      $('pATitle').textContent = L('每份的保真度随份数下降，停不到 2/3 以下', 'The fidelity of each copy falls, but not below 2/3'); $('pAMeta').textContent = `M = ${M}`;
      const s = Math.sqrt((1 + S.psi[2]) / 2), g2 = kit.plot(B, { x: [0, 1], y: [0, 1.05], pad: [30, 10, 8, 22] });
      g2.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 0.5, 1] });
      const lin = [], sq = []; for (let i = 0; i <= 60; i++) { const x = i / 60; lin.push([x, x]); sq.push([x, x * x]); }
      g2.line(lin, P.cyan); g2.line(sq, P.magenta); g2.dot(0, 0, P.ink, 4.5, { ring: true }); g2.dot(1, 1, P.ink, 4.5, { ring: true });
      g2.line([[s, s * s], [s, s]], P.amber, { width: 1.5, dash: [3, 3] }); g2.dot(s, s, P.amber, 4);
      g2.legend([[P.cyan, 's'], [P.magenta, 's²']], { right: false });
      $('pBTitle').textContent = L('同一台机器能照抄的一对：s = s²', 'A pair one machine can copy: s = s²'); $('pBMeta').textContent = `s = |⟨0|ψ⟩| = ${fix(s, 3)}`;
    } else {
      const E = ergodicRead(), T = E.T, g = kit.plot(A, { x: [0, TMAX], y: [0.2, 0.62], pad: [38, 10, 10, 22] });
      g.axes({ yTicks: [[0.25, '0.25'], [WIN, '0.382'], [0.5, '0.5']], xTicks: [0, 100, 200, 300] });
      const full1 = orbit(S.u1, TMAX), full2 = orbit(S.u2, TMAX);
      g.hline(WIN, P.ink, { dash: [4, 3] }); g.hline(1 / (E.M + 1), P.dim, { dash: [2, 4] });
      g.line(full2.R.map((r, i) => [i + 1, r]).slice(0, Math.max(T, 1)), P.ink, { width: 1.2, alpha: 0.8 });
      g.line(full1.R.map((r, i) => [i + 1, r]).slice(0, Math.max(T, 1)), P.cyan, { width: 1.6 });
      g.vline(T, P.amber);
      $('pATitle').textContent = L('两位的份额趋于同一个数', 'Both shares tend to the same number'); $('pAMeta').textContent = L(`下界 1/(M + 1)，M = ${E.M}`, `floor 1/(M + 1), M = ${E.M}`);
      // the seeded random walk is drawn as it is (its literal range is in the meta), the golden band (−1, 1) stays shaded
      // the three-row legend sits in a reserved 50 px top margin (rows at 15, 29, 43 px), above the data area, so it
      // never covers the golden traces near 0; y runs just past the literal range −17.71 … +6.08
      const g2 = kit.plot(B, { x: [0, TMAX], y: [-19, 7], pad: [30, 10, 50, 22] });
      g2.axes({ yTicks: [[-15, '−15'], [0, '0']], xTicks: [0, 100, 200, 300] });
      g2.rect(0, -1, TMAX, 1, P.cyan, { alpha: 0.14 });
      g2.line(RANDOM.map((d, i) => [i + 1, d]), P.magenta, { width: 1.1, alpha: 0.8 });
      g2.line(full2.disc.map((d, i) => [i + 1, d]), P.ink, { width: 1, alpha: 0.8 }); g2.line(full1.disc.map((d, i) => [i + 1, d]), P.cyan, { width: 1.4 });
      g2.vline(T, P.amber);
      g2.legend([[P.cyan, L('黄金步 ①', 'golden steps ①')], [P.ink, L('黄金步 ②', 'golden steps ②')], [P.magenta, L('独立随机（固定种子）', 'independent random (fixed seed)')]], { right: true, dy: -44 });
      const rr = `${kit.sgn(RANDOM_RANGE[0], 1)} … ${kit.sgn(RANDOM_RANGE[1], 1)}`;
      $('pBTitle').textContent = L('命中数减去应得数：黄金步一直有界', 'Hits minus the fair count: golden steps stay bounded');
      $('pBMeta').textContent = (T ? `① ${kit.sgn(E.o1.disc[T - 1], 3)} · ` : '') + L(`随机 ${rr}`, `random ${rr}`);
    }
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const set = (i, lab, val, cls) => { $(`roL${i}`).innerHTML = lab; $(`ro${i}`).innerHTML = val; $(`ro${i}`).parentElement.className = cls || ''; };
    let what = '', key = '';
    if (S.scene === 'seat') {
      const R = seatRead();
      $('roKeyL').textContent = L('拿 ψ 量 φ · 拿 φ 量 ψ', 'φ measured with ψ · ψ measured with φ');
      $('roKey').innerHTML = `<span class="c-cy">${fix(R.wPsiPhi, 4)}</span> = <span class="c-cy">${fix(R.wPhiPsi, 4)}</span> ✓`; $('roKeySub').textContent = '|⟨φ|ψ⟩|² = |⟨ψ|φ⟩|²';
      set(1, L('球冠里的点', 'points in the cap'), `${fix(100 * R.share, 1)}%`, 'c'); set(2, L('应占 (1 − cos α)/2', 'expected (1 − cos α)/2'), `${fix(100 * R.theory, 1)}%`);
      set(3, L('质心离球心', 'centroid from centre'), fix(R.cen, 3)); set(4, L('(1 + r<sub>ψ</sub>·r<sub>φ</sub>)/2', '(1 + r<sub>ψ</sub>·r<sub>φ</sub>)/2'), fix(R.wBloch, 4));
      $('roNote').textContent = L(`换一对态：两根柱子永远一样高，|⟨φ|ψ⟩|² = |⟨ψ|φ⟩|² 是恒等式。换一根轴：哈尔测度下球冠恰占 (1 − cos α)/2，与轴无关；这 ${R.n} 个固定种子点数出来的份额只围着它起伏，换轴会多几个或少几个点。`, `Another pair of states: the two bars are always equally tall, since |⟨φ|ψ⟩|² = |⟨ψ|φ⟩|² is an identity. Another axis: under the Haar measure the cap holds exactly (1 − cos α)/2 whatever the axis; the count of these ${R.n} fixed-seed points only scatters around it, a few points more or fewer as the axis moves.`);
      what = `N = ${R.n}`; key = `${fix(R.wPsiPhi, 3)} = ${fix(R.wPhiPsi, 3)}`;
    } else if (S.scene === 'gain') {
      const R = gainRead();
      $('roKeyL').textContent = L('线² + 面积²', 'line² + area²');
      $('roKey').innerHTML = `<span class="c-cy">${fix(R.D * R.D, 3)}</span> + <span class="c-mg">${fix(R.V * R.V, 3)}</span> = ${fix(R.D * R.D + R.V * R.V, 3)} ✓`; $('roKeySub').textContent = L('无论箭头倾斜多少', 'however the arrow tilts');
      set(1, L('线 D（可区分度）', 'line D (distinguishability)'), fix(R.D, 4), 'c'); set(2, L('面积 V（相干）', 'area V (coherence)'), fix(R.V, 4), 'm');
      set(3, L('中心化纯度 Tr ρ² − ½', 'centred purity Tr ρ² − ½'), fix(R.budget, 4)); set(4, L('确定度 + 残余', 'certainty + residual'), `${fix(R.visible, 4)} + ${fix(R.residual, 4)}`);
      // r = 0 has no direction; otherwise the tilt decides: exact words only at 0°, 90° and 180°, shares of r² elsewhere
      const pct = (q) => (q < 0.01 ? '< 1' : q > 0.99 ? '> 99' : fix(100 * q, 0)), qD = R.D * R.D / (R.r * R.r), qV = R.V * R.V / (R.r * R.r);
      $('roNote').textContent = R.r <= 0 ? L('r = 0：箭头缩成球心的一点，没有方向，预算 r² = 0；线与面积都是零，谈不上谁多谁少。', 'r = 0: the arrow shrinks to a point at the centre with no direction; the budget r² is 0, and line and area are both zero.')
        : R.th === 0 ? L('箭头沿测量轴指向 |0⟩：全是线，面积为零。', 'The arrow lies along the measurement axis, pointing to |0⟩: all line, no area.')
          : R.th === 180 ? L('箭头沿测量轴指向 |1⟩：全是线，面积为零。', 'The arrow lies along the measurement axis, pointing to |1⟩: all line, no area.')
            : R.th === 90 ? L('箭头横在赤道上：全是面积，线为零。', 'The arrow lies on the equator: all area, no line.')
              : L(`线占 ${pct(qD)}%，面积占 ${pct(qV)}%：多一分线，就少一分面积。`, `${pct(qD)}% line and ${pct(qV)}% area: a bit more line means a bit less area.`);
      what = `${fix(R.th, 0)}°`; key = `D² + V² = ${fix(R.D * R.D + R.V * R.V, 3)}`;
    } else if (S.scene === 'bonds') {
      const R = bondsRead();
      $('roKeyL').textContent = L('A 留下的 + 三份纠缠', 'what A keeps + three tangles');
      $('roKey').innerHTML = `<span class="c-cy">${fix(R.keep, 3)}</span> + <span class="c-mg">${fix(R.tAB, 3)}</span> + <span class="c-mg">${fix(R.tAC, 3)}</span> + <span class="c-vi">${fix(R.t3, 3)}</span> = ${fix(R.total, 3)} ✓`; $('roKeySub').innerHTML = '‖r<sub>A</sub>‖² + τ<sub>AB</sub> + τ<sub>AC</sub> + τ₃';
      set(1, 'τ<sub>AB</sub> = 4a²b²', fix(R.tAB, 4), 'm'); set(2, 'τ<sub>AC</sub> = 4a²c²', fix(R.tAC, 4), 'm'); set(3, 'τ₃ = 4a²g²', fix(R.t3, 4)); set(4, 'τ<sub>A(BC)</sub> = 4 det ρ<sub>A</sub>', fix(R.tABC, 4));
      $('roNote').textContent = R.keep > 0.999 ? L('直积态：A 留着整支箭头，谁也没分到。', 'A product state: A keeps its whole arrow and shares nothing.')
        : R.tAB > 0.999 ? L('贝尔态：全部预算给了 B，A 的箭头缩回球心，C 分不到。', 'The Bell state: the whole budget goes to B; A\'s arrow shrinks to the centre and C gets nothing.')
          : R.t3 > 0.999 ? L('GHZ 态：两两之间一点也没有，全部交给三方共有。', 'The GHZ state: nothing between any two, everything held by all three.')
            : L('预算在 A 自己、AB、AC 与三方之间分配，加起来总是 1。', 'The budget is split between A itself, AB, AC and the three-way bond; it always adds up to 1.');
      what = `t = ${fix(clock.t, 2)}`; key = `τ₃ = ${fix(R.t3, 3)}`;
    } else if (S.scene === 'copies') {
      const M = copiesM();
      $('roKeyL').textContent = L('每份副本的保真度', 'fidelity of each copy');
      $('roKey').innerHTML = `<span class="c-cy">${fix(fid(M), 4)}</span> <small>= (2M + 1)/(3M)</small>`; $('roKeySub').textContent = L(`M = ${M} 份`, `M = ${M} copies`);
      set(1, L('箭头缩成 η', 'arrow shrinks to η'), fix(eta(M), 4), 'c'); set(2, L('丢掉的 1 − η', 'lost 1 − η'), fix(1 - eta(M), 4), 'm');
      set(3, L('无穷多份时', 'with infinitely many'), 'F → 2/3, η → 1/3'); set(4, L('两极：正交的一对', 'poles: an orthogonal pair'), L('可以照抄', 'copied exactly'));
      $('roNote').textContent = M === 1 ? L('只要一份：原样保留，没有损失。', 'One copy only: kept as it is, nothing lost.') : L('份数越多，每份越短：没有一份能拿到满额。', 'The more copies, the shorter each: none of them gets the full arrow.');
      what = `M = ${M}`; key = `F = ${fix(fid(M), 3)}`;
    } else {
      const E = ergodicRead(), T = E.T, d1 = T ? E.o1.disc[T - 1] : 0, d2 = T ? E.o2.disc[T - 1] : 0;
      $('roKeyL').textContent = L('命中数 − T(2 − φ)', 'hits − T(2 − φ)');
      $('roKey').innerHTML = `<span class="c-cy">${kit.sgn(d1, 3)}</span> · ${kit.sgn(d2, 3)} |·| &lt; 1 ✓`; $('roKeySub').textContent = L('① 与 ② 两位观察者', 'observers ① and ②');
      set(1, L('① 的份额', 'share of ①'), T ? fix(E.o1.hits / T, 4) : '—', 'c'); set(2, L('② 的份额', 'share of ②'), T ? fix(E.o2.hits / T, 4) : '—');
      set(3, L('窗口 2 − φ', 'window 2 − φ'), fix(WIN, 4)); set(4, L('最长间隔（前 2000 步）', 'longest gap (first 2000 steps)'), String(E.gapMax));
      $('roNote').textContent = L(`起点相位 0 与 ${fix(S.u2, 2)}：短期各有参差，长程都分到 2 − φ，误差不超过 1/T。`, `Starting phases 0 and ${fix(S.u2, 2)}: uneven in the short run, both get 2 − φ in the long run, off by less than 1/T.`);
      what = `T = ${T}`; key = T ? `${fix(E.o1.hits / T, 3)} · ${fix(E.o2.hits / T, 3)}` : '—';
    }
    $('roAside').textContent = L(SC[S.scene].name[0], SC[S.scene].name[1]);
    $('pillScene').querySelector('strong').textContent = SC[S.scene].name[1]; $('pillWhat').querySelector('strong').textContent = what; $('pillKey').querySelector('strong').textContent = key;
    const LEG = {
      seat: [['am', '参考轴与它的球冠', 'the reference axis and its cap'], ['cy', '球冠里的点；彼此的影子', 'points in the cap; each one\'s shadow'], ['dm', '球冠外的点', 'points outside the cap']],
      gain: [['am', '态的箭头', 'the state'], ['cy', '线：测量轴上的影子', 'line: the shadow on the axis'], ['mg', '面积：横向的一段', 'area: the sideways part']],
      bonds: [['am', 'A 的箭头', 'A\'s arrow'], ['cy', 'A 自己留下的', 'what A keeps'], ['mg', '二体纠缠', 'pairwise bonds'], ['vi', '三体纠缠', 'three-way bond']],
      copies: [['am', '输入态', 'the input'], ['cy', '每份副本', 'each copy'], ['mg', '丢掉的部分', 'what is lost']],
      ergodic: [['am', '① 现在的位置', '① now'], ['cy', '窗口与命中', 'the window and its hits'], ['dm', '窗口外的步', 'steps outside the window'], ['vi', '转轴', 'the rotation axis']]
    };
    const html = LEG[S.scene].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
  }

  const paint = kit.painter(() => { drawStage(); drawPlots(); drawText(); }, [$('stage'), $('plotA'), $('plotB')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: NMAX, t: NMAX, rate: 120, step: 20,
    format: (t, max) => ({
      seat: () => `N ${Math.round(t)} <small>/ ${Math.round(max)}</small>`,
      gain: () => `${t.toFixed(0)}° <small>/ 180°</small>`,
      bonds: () => `t ${t.toFixed(2)} <small>/ 3</small>`,
      copies: () => `M ${1 + Math.floor(t + 1e-9)} <small>/ ${MMAX}</small>`,
      ergodic: () => `T ${Math.floor(t + 1e-9)} <small>/ ${TMAX}</small>`
    })[S.scene](),
    onChange: () => paint()
  });
  function setScene(sc, t) {
    const changed = S.scene !== sc;
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause(); clock.rate = SC[sc].rate; clock.step = SC[sc].step; clock.setMax(SC[sc].max, true); clock.set(t == null ? SC[sc].start : t);
    if (changed) stage.view(SC[sc].view, TRV.still ? 0 : 500);
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fCap = kit.field($('capA'), { fmt: (v) => `${v}°`, onInput: (v) => { S.cap = v; leave(); paint(); } });
  const fPur = kit.field($('pur'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.pur = v; leave(); paint(); } });
  const fU2 = kit.field($('u2'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.u2 = v; leave(); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('seat'); }, 2: () => { leave(); setScene('gain'); }, 3: () => { leave(); setScene('bonds'); }, 4: () => { leave(); setScene('copies'); }, 5: () => { leave(); setScene('ergodic'); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    haar: { scene: 'seat', at: 0, play: true, still: NMAX },
    tradeoff: { scene: 'gain', at: 0, play: true, still: 60 },
    cloning: { scene: 'copies', at: 0, play: true, still: 4 },
    bell: { scene: 'bonds', at: 1 },
    wstate: { scene: 'bonds', at: 2 },
    ghz: { scene: 'bonds', at: 2, play: true, still: 3 },
    ergodic: { scene: 'ergodic', at: 0, play: true, still: 233 }
  };
  const NOTES = {
    haar: ['球面的均匀测度即哈尔测度，文献结果，未在本书形式化：按这个测度，琥珀色轴拖到哪里，半角 60° 的球冠都恰占四分之一；图里固定种子的点只数得接近四分之一，换一根轴会多几个或少几个。两根青色的影子一样长：拿 ψ 量 φ 与拿 φ 量 ψ，照见的一样多。', 'Haar measure (literature result, not formalized in this book): a 60° cap is exactly a quarter about any axis; fixed-seed counts, only close to a quarter, vary with the amber axis. The cyan shadows are equal: ψ measuring φ = φ measuring ψ.'],
    tradeoff: ['箭头从测量轴转向赤道：青色的线 D 变短，品红的面积 V 变大，D² + V² 始终是 1。线多一分，面积就少一分。', 'The arrow turns from the measurement axis to the equator: the cyan line D shrinks, the magenta area V grows, and D² + V² stays 1. More line means less area.'],
    cloning: ['把同一个未知态复制成 M 份：每份的箭头（青色）越来越短，品红是丢掉的部分；保真度从 1 降向 2/3（通用对称克隆机，文献结果）。这台机器对每个态一视同仁，两极的态也一样变短。两极的空心圈标的是另一件事：一台机器若能把两个态都照抄，它们的内积只能是 0 或 1，所以像 |0⟩、|1⟩ 这样的一对正交态可以由另一台专为它们造的机器照抄。', 'Copy one unknown state into M copies: each copy\'s arrow (cyan) gets shorter, the magenta part is what is lost, and the fidelity falls from 1 towards 2/3 (the universal symmetric cloner, a literature result). This machine treats every state alike, the poles included. The hollow rings at the poles mark something else: if one machine copies two states exactly, their inner product can only be 0 or 1, so an orthogonal pair such as |0⟩, |1⟩ can be copied exactly by a different machine built for that pair.'],
    bell: ['贝尔态 (|00⟩ + |11⟩)/√2 ⊗ |0⟩：A 与 B 之间的品红纽带满额，A 的箭头缩回球心（½I），与 C 之间一点也没有。', 'The Bell state (|00⟩ + |11⟩)/√2 ⊗ |0⟩: the magenta bond between A and B is full, A\'s arrow shrinks to the centre (½I), and nothing is left for C.'],
    wstate: ['W 型态 (|000⟩ + |110⟩ + |101⟩)/√3：A 的箭头剩下 1/3，长度² 1/9；两条品红纽带各 4/9，加起来 8/9，三体为零。', 'The W-type state (|000⟩ + |110⟩ + |101⟩)/√3: A\'s arrow keeps 1/3, squared 1/9; the two magenta bonds take 4/9 each, 8/9 together, and the three-way part is zero.'],
    ghz: ['从 W 型态走到 GHZ 态 (|000⟩ + |111⟩)/√2：两条纽带断开，紫色的三方面撑满，A 的箭头缩回球心。总额一直是 1。', 'From the W-type state to the GHZ state (|000⟩ + |111⟩)/√2: both pairwise bonds break, the violet three-way face fills up and A\'s arrow shrinks to the centre. The total stays 1.'],
    ergodic: ['两个态从不同的相位出发，每步绕竖轴转过黄金角。落进青色窗口的步数，两人都趋于 2 − φ ≈ 0.382；与 T(2 − φ) 的偏差一直不超过 1。', 'Two states start at different phases and turn about the vertical axis by the golden angle at each step. The share of steps in the cyan window tends to 2 − φ ≈ 0.382 for both, and the discrepancy from T(2 − φ) never exceeds 1.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (id === 'haar') { S.cap = 60; fCap.set(60); S.axis = [0, 0, 1]; }
    if (id === 'tradeoff') { S.pur = 1; fPur.set(1); }
    if (id === 'ergodic') { S.u2 = 0.41; fU2.set(0.41); }
    setScene(p.scene, p.at);
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still); } else if (p.play) { if (booting) kit.autoplay(clock, $('stage')); else clock.play(); }
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖动琥珀色或白色的箭头、拖时间轴。随时可以再选一张卡。', 'Free play: switch scenes, drag the amber or white arrows, scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  window.FAIRNESS_DEBUG = {
    get state() {
      const base = { scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current };
      if (S.scene === 'seat') return Object.assign(base, seatRead(), { psi: S.psi, phi: S.phi, axis: S.axis, cap: S.cap, points: HAAR.slice(0, Math.round(clock.t)) });
      if (S.scene === 'gain') return Object.assign(base, gainRead());
      if (S.scene === 'bonds') return Object.assign(base, bondsRead());
      if (S.scene === 'copies') { const M = copiesM(); return Object.assign(base, { M, eta: eta(M), F: fid(M), psi: S.psi }); }
      const E = ergodicRead();
      return Object.assign(base, { T: E.T, u1: S.u1, u2: S.u2, c: S.c, win: WIN, alpha: ALPHA, hits1: E.o1.hits, hits2: E.o2.hits, disc1: E.o1.disc, disc2: E.o2.disc, xs1: E.o1.xs, gapMax: E.gapMax, M: E.M, random: RANDOM });
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    bonds: (t) => bondsRead(t),
    /** Viewport coordinates of a world point on the stage (for pointer tests). */
    at: (v) => { const b = $('cv').getBoundingClientRect(), q = stage.p(v); return [b.left + q[0], b.top + q[1]]; },
    /** Where the centre of the ball is drawn (CSS pixels in the stage), the stage's size and its scale. */
    centre: () => { const q = stage.p([0, 0, 0]); return { x: q[0], y: q[1], W: $('cv').clientWidth, H: $('cv').clientHeight, unit: stage.unit }; },
    /** The flat overlay: what precedes it, its size and how many of its pixels are drawn on. */
    overlay: () => {
      const f = $('flat'), d = f.getContext('2d').getImageData(0, 0, f.width, f.height).data;
      let ink = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 0) ink++;
      return { hidden: f.hidden, after: f.previousElementSibling && f.previousElementSibling.id, w: f.clientWidth, h: f.clientHeight, ink };
    },
    arrow: () => gainRead().v
  };
  window.TRV_THUMB = () => { setScene('bonds', 2.5); stage.view([-0.35, 0.18], 0); kit.flush(); paint.now(); };
  cards.pick(cards.initial('haar'));
  booting = false;
  paint();
})();
