/* ORTHO//CLOSURE · 自持旋量流 · Self-sustaining spinor flow
   The stage is the real geometric algebra Cl(3,0). An even spinor ψ = √ρ R (RR̃ = 1) sandwiches two reference blades:
     J = ψ e₃ ψ̃   the current vector (cyan arrow, length ρ),
     S = ψ e₁e₂ ψ̃ the spin bivector (magenta square of side √ρ spanned by R e₁ R̃ and R e₂ R̃, area ρ),
   and the page multiplies out J², S² and ρ² = (ψψ̃)² on the spot. The rail turns ψ: ψ(t) = R_B(t) ψ₀ with
   R_B(t) = cos(t/2) − sin(t/2) B for a unit bivector B; J turns through t about the violet axis n = dual of B.
   Outside the sphere a one-sided (Möbius) band goes once round n; at the bearing of J stands a violet flag along
   cos(t/2) n + sin(t/2) r, the two components of ψψ̃₀/ρ: after 360° the flag is reversed (ψ = −ψ₀), after 720° it is back.
   Every number comes from one product: multivectors multiplied blade by blade.
   Read-only probe for the browser suite: window.CLOSURE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, FULL = 2 * TAU;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];

  /* ---------- Cl(3,0): 8 coefficients on blades by bitmask (bit 0 = e₁, bit 1 = e₂, bit 2 = e₃) ---------- */
  // blades: 0 = 1, 1 = e₁, 2 = e₂, 3 = e₁e₂, 4 = e₃, 5 = e₁e₃, 6 = e₂e₃, 7 = e₁e₂e₃
  const GRADE = [0, 1, 1, 2, 1, 2, 2, 3];
  const pop = (x) => { let n = 0; while (x) { n += x & 1; x >>= 1; } return n; };
  function bladeSign(a, b) { let s = 0; a >>= 1; while (a) { s += pop(a & b); a >>= 1; } return s & 1 ? -1 : 1; }
  function mul(A, B) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) if (A[i]) for (let j = 0; j < 8; j++) if (B[j]) C[i ^ j] += bladeSign(i, j) * A[i] * B[j];
    return C;
  }
  const rev = (A) => A.map((x, i) => (GRADE[i] >= 2 ? -x : x));
  const scl = (A, k) => A.map((x) => x * k);
  const vec = (v) => [0, v[0], v[1], 0, v[2], 0, 0, 0];
  const vecOf = (M) => [M[1], M[2], M[4]];
  /** Bivector coefficients in the order (e₂e₃, e₃e₁, e₁e₂). */
  const bivOf = (M) => [M[6], -M[5], M[3]];
  const sandwich = (X, M) => mul(mul(X, M), rev(X));
  const ONE = [1, 0, 0, 0, 0, 0, 0, 0], E12 = [0, 0, 0, 1, 0, 0, 0, 0];
  /** The planes of the turn: B, its two edge vectors (a turns towards b) and the axis n = a × b. */
  const PLANES = {
    e23: { a: E2, b: E3, n: E1, B: [0, 0, 0, 0, 0, 0, 1, 0], name: 'e₂e₃' },
    e31: { a: E3, b: E1, n: E2, B: [0, 0, 0, 0, 0, -1, 0, 0], name: 'e₃e₁' },
    e12: { a: E1, b: E2, n: E3, B: [0, 0, 0, 1, 0, 0, 0, 0], name: 'e₁e₂' }
  };
  const turnRotor = (pl, t) => { const c = Math.cos(t / 2), s = Math.sin(t / 2); return pl.B.map((x, i) => (i === 0 ? c : 0) - s * x); };
  /** The unit rotor that carries the unit vector a to the unit vector b along the shorter arc. */
  function arcRotor(a, b) {
    const M = mul(vec(b), vec(a)); M[0] += 1;
    const n = Math.hypot(M[0], M[3], M[5], M[6]);
    if (n < 1e-9) { const p = v3.unit(v3.cross(a, Math.abs(a[0]) < 0.9 ? E1 : E2)); return mul(vec(p), vec(a)).map((x) => x); }
    return scl(M, 1 / n);
  }
  /** A deterministic random unit rotor (seeded). */
  function randomRotor(seed) {
    let x = (seed * 2654435761) >>> 0;
    const rnd = () => { x = (x + 0x6d2b79f5) >>> 0; let t = x; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const g = () => Math.sqrt(-2 * Math.log(1 - rnd())) * Math.cos(TAU * rnd());
    const q = [g(), g(), g(), g()], n = Math.hypot(...q);
    return [q[0] / n, 0, 0, q[3] / n, 0, q[2] / n, q[1] / n, 0];
  }
  /** Rotor as text: a + b e₂e₃ + c e₃e₁ + d e₁e₂. */
  function evenText(M, d = 2) {
    let s = fix(M[0], d);
    const bv = bivOf(M);
    [['e₂e₃', bv[0]], ['e₃e₁', bv[1]], ['e₁e₂', bv[2]]].forEach(([nm, x]) => { s += ` ${x < 0 ? '−' : '+'} ${fix(Math.abs(x), d)} ${nm}`; });
    return s;
  }
  const vt = (x, d = 2) => `(${x.map((y) => fix(y, d)).join(', ')})`;

  /* ---------- state ---------- */
  const S = { rho: 1, plane: 'e23', R0: ONE.slice(), seed: 0, fan: false, ref: false, band: true, max: FULL, mu: 0, unrolled: false };
  const PL = () => PLANES[S.plane];
  /** ψ and everything woven from it at rail value t. */
  function at(t) {
    const pl = PL(), Rt = turnRotor(pl, t), R = mul(Rt, S.R0), psi = scl(R, Math.sqrt(S.rho));
    const psi0 = scl(S.R0, Math.sqrt(S.rho));
    const Jm = sandwich(psi, vec(E3)), Sm = sandwich(psi, E12), rhoM = mul(psi, rev(psi));
    const J = vecOf(Jm), A = vecOf(sandwich(R, vec(E1))), Bv = vecOf(sandwich(R, vec(E2)));
    const J2 = mul(Jm, Jm), S2 = mul(Sm, Sm);
    const M = scl(mul(psi, rev(psi0)), 1 / S.rho);           // = R_B(t)
    const c = M[0], s = -mul(M, rev(pl.B))[0];               // M = c − s B
    const J0 = vecOf(sandwich(psi0, vec(E3)));
    return { psi, psi0, R, J, Sm, A, B: Bv, rho: rhoM[0], rhoM, J2, S2, c, s, J0,
      Jback: Math.acos(clamp(v3.dot(v3.unit(J), v3.unit(J0)), -1, 1)) };
  }

  /* ---------- where the band starts ---------- */
  /** Bearing (angle in the plane of the turn, from a towards b) of the start of J; 0 when J lies on the axis. */
  function bearing0() {
    const pl = PL(), J0 = at(0).J0, x = v3.dot(J0, pl.a), y = v3.dot(J0, pl.b);
    return Math.hypot(x, y) > 1e-6 * S.rho ? Math.atan2(y, x) : 0;
  }
  const radial = (pl, al) => v3.add(v3.scale(pl.a, Math.cos(al)), v3.scale(pl.b, Math.sin(al)));
  /* ---------- the solid: the one-sided band, or (μ > 0) the pointer ball and the memory shell it is split into ----------
     The band goes once round the axis n at radius RB. Its width direction w(t) = cos(t/2) n + sin(t/2) r(t) turns half
     a turn per round (r(t) is the outward unit vector at the bearing a0 + t), so it is a Möbius band, drawn as a thin
     slab. It is cut along its centre line into one long strip, t from 0 to 720°: the part with t < 360° (the first
     round, "the pointer") lies on one side of the centre line and the part with t ≥ 360° (the second round, "the
     memory") on the other; at μ = 0 the two pieces close up into the band, with no seam. At μ = 1 the first piece is
     a ball round the centre and the second a ring shell round it, the dualist picture of §39.1 (MODEL); in between,
     every point of the solid lies on the straight segment between its two places. The flag of ψ(t) stands on the
     strip at t, from the centre line to the edge, and its tip is the point of the edge at t. */
  const RB = 1.5, HW = 0.5, TH = 0.05, RBALL = 0.62, RTOR = 1.62, ATOR = 0.36, FACE = 0.42;
  const NU = 96, NV = 20;
  /** Frame at turn t: centre c, outward r, travel T, axis n, width direction w and the band's normal N = w × T. */
  function frame(t, a0) {
    const pl = PL(), r = radial(pl, a0 + t), T = radial(pl, a0 + t + PI / 2), c2 = Math.cos(t / 2), s2 = Math.sin(t / 2);
    return { r, T, n: pl.n, c: v3.scale(r, RB), w: v3.add(v3.scale(pl.n, c2), v3.scale(r, s2)), N: v3.add(v3.scale(r, -c2), v3.scale(pl.n, s2)) };
  }
  /** The cross-section of the slab at v in [0, 1]: [across (in half-widths), up (in half-thicknesses)]: the top face
      from the centre line out, the rounded rim, the bottom face back in. */
  function section(v) {
    if (v <= FACE) return [v / FACE, 1];
    if (v >= 1 - FACE) return [(1 - v) / FACE, -1];
    const f = PI * (v - FACE) / (1 - 2 * FACE);
    return [1 + (TH / HW) * Math.sin(f), Math.cos(f)];
  }
  function bandPoint(t, v, a0) { const F = frame(t, a0), s = section(v); return v3.add(F.c, v3.add(v3.scale(F.w, HW * s[0]), v3.scale(F.N, TH * s[1]))); }
  /** Where the same point of the strip sits in the split picture (μ = 1): piece 0 a ball, piece 1 a ring shell. */
  function splitPoint(piece, t, v, a0) {
    const F = frame(t, a0);
    if (!piece) { const th = PI * v; return v3.add(v3.scale(F.r, RBALL * Math.sin(th)), v3.scale(F.n, RBALL * Math.cos(th))); }
    const ph = TAU * v + PI / 2;
    return v3.add(v3.scale(F.r, RTOR + ATOR * Math.cos(ph)), v3.scale(F.n, ATOR * Math.sin(ph)));
  }
  /** A point of the solid: piece 0 has t in [0, 360°], piece 1 in [360°, 720°]. */
  function solidPoint(piece, t, v, a0, mu) { const b = bandPoint(t, v, a0); return mu > 0 ? v3.lerp(b, splitPoint(piece, t, v, a0), mu) : b; }
  /** The edge of the solid at t (the middle of the rim), pushed out by `off` along the outward direction of the edge. */
  function edgeAt(t, a0, mu, off) {
    const pc = pieceOf(t), p = solidPoint(pc, t, 0.5, a0, mu), q = v3.lerp(solidPoint(pc, t, 0, a0, mu), solidPoint(pc, t, 1, a0, mu), 0.5);
    const out = v3.unit(v3.sub(p, q));
    return { p: v3.add(p, v3.scale(out, off || 0)), out };
  }
  const pieceOf = (t) => (t < TAU - 1e-9 ? 0 : 1);

  /* ---------- stage ---------- */
  let drag = null, last = { nodes: [], tip: null };
  const stage = kit.solid($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.235 : 0.25, cy: 0.52, yaw: -1.1, pitch: 0.5,
    onChange: () => paint(),
    onPick: (ev, st) => {
      if (S.unrolled) return false;
      const X = at(clock.t);
      if (st.near(ev, X.J) < 24 && !st.occluded(X.J, 0.02)) { drag = 'J'; return true; }
      const k = st.nearest(ev, last.nodes.map((n) => n.p), 13);
      if (k >= 0) { leave(); clock.pause(); clock.set(last.nodes[k].t); drag = 'tip'; return true; }
      if (last.tip && st.near(ev, last.tip) < 18) { drag = 'tip'; return true; }
      drag = null; return false;
    },
    onDrag: (ev, st) => {
      if (drag === 'J') { leave(); aimJ(st.pick(ev)); return; }
      if (drag !== 'tip') return;
      const h = st.hit(ev);
      if (h && (h.id === 'piece0' || h.id === 'piece1')) { leave(); clock.pause(); clock.set(clamp(h.u, 0, clock.max)); }
    },
    onDrop: () => { drag = null; }
  });
  function leave() { cards.mark(null); restoreMax(); }

  /** The 2D picture of the card SEAM: the band unrolled along its base circle, bearing from left to right. At each
      bearing the band's width direction w = cos(t/2) n + sin(t/2) r turns in the plane of n (up) and r (out of the
      page, drawn slanting down and to the left); the flags planted every 30° are drawn as w, and the first and the last
      one are repeated side by side on the right. */
  function drawUnrolled(t) {
    const cv = $('flat'), g = kit.plot(cv, { x: [-0.8, 12.8], y: [-6.2, 2.4], pad: [16, 16, 60, 52], equal: true });
    const OUT = [-0.42, -0.34], X = (deg) => deg / 30, FL = 1.45;   // r drawn slanting; one flag every 30° = one unit
    const dir = (deg) => { const h = deg * DEG / 2; return [Math.sin(h) * OUT[0], Math.cos(h) + Math.sin(h) * OUT[1]]; };
    const flagAt = (x0, y0, deg, s) => {
      const d = dir(deg), k = s.len || FL, tip = [x0 + k * d[0], y0 + k * d[1]], mid = [x0 + 0.7 * k * d[0], y0 + 0.7 * k * d[1]];
      g.line([[x0, y0], tip], s.color, { width: s.width, dash: s.dash });
      g.poly([tip, [mid[0] + 0.45, (tip[1] + mid[1]) / 2], mid], s.color, { alpha: s.dash ? 0 : 0.9, stroke: s.color, width: 1.2 });
    };
    // the strip the band sweeps, its centre line (the bearing) and the flags planted every 30°
    g.poly([[X(0), -1.6], [X(360), -1.6], [X(360), 1.6], [X(0), 1.6]], P.violet, { alpha: 0.08 });
    g.line([[X(0), 0], [X(360), 0]], P.violet, { width: 1.4, alpha: 0.8 });
    for (let d = 0; d <= 360; d += 90) g.text(X(d), -1.95, `${d}°`, P.dim, { align: 'center', size: 11 });
    g.text(X(0), 2.15, L('沿底圈展开：n 朝上，r 朝屏幕外（斜画）', 'unrolled along the base circle: n up, r out of the page (drawn slanting)'), P.dim, { size: 11 });
    const shown = Math.min(t / DEG, 360 + 1e-6);
    for (let d = 0; d <= shown + 1e-6; d += 30) flagAt(X(d), 0, d, { color: P.violet, width: d === 0 ? 1.6 : 2.4, dash: d === 0 ? [4, 3] : null });
    if (t > 1e-3 && t < TAU - 1e-3) { const d = t / DEG; flagAt(X(d), 0, d, { color: P.violet, width: 3 }); g.dot(X(d), 0, P.amber, 5); }
    // below: the first and the last flag side by side
    g.line([[3.2, -4.3], [8.8, -4.3]], P.violet, { width: 1.2, alpha: 0.5 });
    flagAt(4.6, -4.3, 0, { color: P.violet, width: 2, dash: [4, 3], len: 1.6 });
    g.text(4.6, -5.6, L('出发 · 0°', 'start · 0°'), P.violet, { align: 'center', size: 12 });
    if (t >= TAU - 1e-6) {
      flagAt(7.4, -4.3, 360, { color: P.violet, width: 3.2, len: 1.6 });
      g.dot(7.4, -4.3, P.amber, 5);
      g.text(7.4, -2.5, L('回到起点 · 360°', 'back at the start · 360°'), P.violet, { align: 'center', size: 12 });
    }
  }

  /** The flag of ψ(t) on the face of the solid that looks at the viewer: pole from the centre line to the edge along
      the surface, pennant at the edge pointing along the travel. */
  function flag(st, t, a0, mu, s) {
    s = s || {};
    const pc = pieceOf(t), F = frame(t, a0), D = st.facing();
    const along = (v) => solidPoint(pc, t, v, a0, mu);
    const top = v3.dot(v3.sub(along(FACE * 0.5), along(1 - FACE * 0.5)), D) >= 0;   // which face is nearer the eye
    const vs = (f) => (top ? FACE * f : 1 - FACE * f);
    const lift = v3.scale(F.N, (top ? 1 : -1) * (TH * (1 - mu) + 0.012));   // just off the face, so it sits on it
    const on = (v) => v3.add(along(v), lift);
    const pole = []; for (let k = 0; k <= 8; k++) pole.push(on(vs(k / 8)));
    st.line(pole, { color: P.violet, width: s.width || 2.6, alpha: s.alpha == null ? 1 : s.alpha, dash: s.dash });
    const tip = on(vs(1)), low = on(vs(0.62)), mid = v3.add(on(vs(0.81)), v3.scale(F.T, 0.26 * (s.small ? 0.7 : 1)));
    st.fan([tip, mid, low], s.dash ? { color: P.violet, width: 1.4, dash: s.dash, strokeAlpha: 0.95 } : { fill: P.violet, alpha: (s.alpha == null ? 1 : s.alpha) * 0.95, color: P.violet, width: 1, strokeAlpha: 1 });
    return { base: along(vs(0)), tip, rim: along(0.5) };
  }
  function drawSpin(st, X) {
    const k = Math.sqrt(X.rho), a = v3.scale(X.A, k), b = v3.scale(X.B, k);
    st.fan([[0, 0, 0], a, v3.add(a, b), b], { fill: P.magenta, alpha: TRV.thumbMode ? 0.42 : 0.3, color: P.magenta, width: 1.4 });
    const arc = [];
    for (let j = 0; j <= 16; j++) { const g = (PI / 2) * j / 16; arc.push(v3.scale(v3.add(v3.scale(X.A, Math.cos(g)), v3.scale(X.B, Math.sin(g))), 0.42 * k)); }
    st.line(arc, { color: P.magenta, width: 1.6, alpha: 0.95 });
    st.arrow(arc[arc.length - 3], arc[arc.length - 1], { color: P.magenta, width: 1.6, headSize: 7 });
    st.tag('S', v3.scale(v3.add(a, b), 0.62), 'S', 'raw c-mg', { dx: 0, dy: 0 });
  }
  function drawRef(st) {
    st.arrow([0, 0, 0], E3, { color: P.dim, width: 1.4, dash: [4, 4], headSize: 8 });
    st.tag('e3', [0, 0, 1.12], 'e₃', 'raw ink', {});
    st.line([[0, 0, 0], E1, [1, 1, 0], E2], { color: P.dim, width: 1, dash: [3, 4], alpha: 0.8, close: true });
    st.tag('e12', [1, 1, 0], 'e₁e₂', 'raw ink', { dx: 16, dy: 8 });
  }
  function drawJ(st, J) { st.arrow([0, 0, 0], J, { color: P.cyan, width: 3.4, headSize: 13 }); }

  function drawStage() {
    const st = stage, t = clock.t, X = at(t), a0 = bearing0(), mu = S.mu;
    $('flat').hidden = !S.unrolled;
    if (S.unrolled) {   // the card SEAM: the band unrolled along its base circle (2D)
      st.begin(); st.end();
      drawUnrolled(t);
      $('hudBig').textContent = L('沿底圈展开的光带', 'the band unrolled along its base circle');
      $('hudSub').innerHTML = `${L('每 30° 插一面小旗', 'a flag every 30°')} · ${L('转过', 'turned')} ${fix(t / DEG, 0)}° · <span class="c-vi">${signText(X)}</span>`;
      $('legend').innerHTML = [['vi', L('小旗 w = cos(t/2) n + sin(t/2) r；虚线：出发时的那一面', 'w = cos(t/2)n + sin(t/2)r; dashed: start')], ['am', L('此刻', 'now')]].map(([k, q]) => `<span><i class="sw ${k}"></i>${q}</span>`).join('');
      return X;
    }
    st.begin();
    const n = PL().n, ax = [v3.scale(n, -2.05), v3.scale(n, 2.05)];
    if (!S.ref) { st.line(ax, { color: P.violet, width: 1.4, alpha: 0.75 }); st.tag('axis', v3.scale(n, 2.15), 'n', 'raw c-vi', {}); }
    const look = { color: P.violet, grid: { every: [4, 2] } };   // one colour: light and shade come from the camera only
    if (S.band) {
      for (const piece of [0, 1]) {
        st.surface(`piece${piece}`, (u, v) => solidPoint(piece, u, v, a0, mu), Object.assign({ u: piece ? [TAU, FULL] : [0, TAU], v: [0, 1], nu: NU, nv: NV }, look));
      }
    }
    if (S.ref) drawRef(st);
    const tip0 = X.J0, n2 = Math.max(2, Math.ceil(Math.min(t, TAU) / (3 * DEG))), jp = [];
    for (let j = 0; j <= n2; j++) jp.push(at(Math.min(t, TAU) * j / n2).J);
    if (t > 1e-3) st.line(jp, { color: P.cyan, width: 1.6, alpha: 0.75, dash: [5, 4] });
    if (S.ref && v3.len(v3.sub(v3.unit(X.J), E3)) > 0.05) { const arc = []; for (let k = 0; k <= 40; k++) arc.push(v3.scale(v3.slerp(E3, v3.unit(X.J), k / 40), 0.5)); st.line(arc, { color: P.violet, width: 1.4, alpha: 0.8, dash: [3, 3] }); }
    drawSpin(st, X);
    if (t > 1e-3 && v3.len(v3.sub(X.J, tip0)) > 0.05) st.ring(tip0, { color: P.cyan, r: 4.5 });
    drawJ(st, X.J);
    st.tag('J', X.J, 'J', 'raw c-cy', { dx: 14, dy: -12 });
    last = { nodes: [], tip: null };
    if (S.band) {
      // the stations: every 30° of the turn, a ring on the edge of the solid (two rounds: 24 rings)
      for (let k = 0; k < 24; k++) { const tk = k * PI / 6, e = edgeAt(tk, a0, mu, 0.012); last.nodes.push({ t: tk, p: e.p }); st.ring(e.p, { color: P.violet, r: 5, normal: e.out, key: `node${k}` }); }
      if (S.fan) for (let u = PI / 6; u < t - 1e-6; u += PI / 6) flag(st, u, a0, mu, { width: 1.6, alpha: 0.75, small: true });
      const f0 = t > 0.05 ? flag(st, 0, a0, mu, { width: 1.8, dash: [4, 3] }) : null;
      const f = flag(st, t, a0, mu, { width: 3 });
      // the path of the flag's tip so far: the edge of the band, as far as ψ has gone
      // the edge: the part the flag's tip has run along is solid, the rest a faint dashed line
      if (t > 1e-3) {
        const k = Math.max(2, Math.ceil(t / (2 * DEG))), tr = [];
        for (let j = 0; j <= k; j++) { const u = t * j / k; tr.push(edgeAt(u, a0, mu, 0.012).p); }
        st.tube('trail', tr, { color: P.violet, width: 4, glow: 1.1 });
      }
      if (t < FULL - 1e-3) {
        const k = Math.max(2, Math.ceil((FULL - t) / (2 * DEG))), rest = [];
        for (let j = 0; j <= k; j++) { const u = t + (FULL - t) * j / k; rest.push(edgeAt(Math.min(u, FULL - 1e-9), a0, mu, 0.012).p); }
        st.line(rest, { color: P.violet, width: 1.3, alpha: 0.55, dash: [3, 5] });
      }
      const now = edgeAt(Math.min(t, FULL - 1e-9), a0, mu, 0.03).p;
      st.bead(now, { color: P.amber, r: 6.5, key: 'now' });
      last.tip = now;
      const near = Math.abs(((t + PI) % TAU) - PI) < 0.6;
      if (f0 && (!near || Math.cos(t / 2) < 0)) st.tag('flag0', f0.tip, L('出发时', 'at the start'), 'raw c-vi', { dx: 0, dy: -16 });
      st.tag('flag', f.tip, L('ψ 的小旗', 'flag of ψ'), 'raw c-vi', { dx: 0, dy: 18 });
      if (mu > 0.15) {   // MODEL: the dualist picture
        st.tag('ptr', v3.scale(n, RBALL * mu + 0.25 * (1 - mu)), L('指针', 'pointer'), 'raw c-cy', { dx: 0, dy: -14 });
        st.tag('mem', solidPoint(1, FULL - PI / 2, 0.25, a0, mu), L('内存壳', 'memory shell'), 'raw c-mg', { dx: 0, dy: -16 });
      }
    }
    st.end();
    $('hudBig').textContent = mu > 0.005 ? L(`二元隔墙 μ = ${fix(mu, 2)}（模型）`, `dualist wall μ = ${fix(mu, 2)} (model)`) : `J² = −S² = ρ² = ${fix(X.J2[0], 2)}`;
    $('hudSub').innerHTML = `${L('在', 'in ')}${PL().name}${L(' 面里转过', ', turned')} ${fix(t / DEG, 0)}° · <span class="c-cy">${L('J 离出发方向', 'J from its start')} ${fix(X.Jback / DEG, 0)}°</span> · <span class="c-vi">${signText(X)}</span>`;
    const LEG = [['cy', S.ref ? L('流向量 J = ψe₃ψ̃', 'current J = ψe₃ψ̃') : L('流向量 J = ψe₃ψ̃；虚线：J 走过的路', 'current J = ψe₃ψ̃; dashed: its path')], ['mg', L('自旋面 S = ψe₁e₂ψ̃', 'spin plane S = ψe₁e₂ψ̃')]];
    if (S.ref) LEG.push(['dm', L('参考刀片 e₃ 与 e₁e₂', 'reference blades e₃ and e₁e₂')], ['vi', L('ψ 把 e₃ 带到 J', 'ψ carries e₃ to J')]);
    else if (S.band) LEG.push(['vi', L('单侧光带、转轴、ψ 的小旗；实线：旗尖走过的边，虚线：还没走的', 'band/axis/ψ flag; solid: past, dashed: ahead')], ['am', L('此刻', 'now')]);
    else LEG.push(['vi', L('转轴 n', 'axis n')]);
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
    return X;
  }
  function signText(X) {
    if (Math.abs(X.c - 1) < 1e-9) return 'ψ = +ψ₀';
    if (Math.abs(X.c + 1) < 1e-9) return 'ψ = −ψ₀';
    return L(`ψ 离 ψ₀ 转过半角 ${fix(Math.acos(Math.max(-1, Math.min(1, X.c))) / DEG, 0)}°`, `ψ has turned a half angle of ${fix(Math.acos(Math.max(-1, Math.min(1, X.c))) / DEG, 0)}° from ψ₀`);
  }

  /* ---------- strip: what comes back when ---------- */
  function drawPlot() {
    const g = kit.plot($('plot'), { x: [0, FULL], y: [-1.15, 1.15], pad: [34, 10, 8, 22] });
    g.axes({ xTicks: [0, 180, 360, 540, 720].map((d) => [d * DEG, `${d}°`]), yTicks: [[-1, '−1'], [0, '0'], [1, '1']] });
    g.hline(0, P.dim, { alpha: 0.5 });
    g.vline(TAU, P.dim, { alpha: 0.6 });
    const cj = [], cp = [];
    for (let i = 0; i <= 240; i++) {
      const u = FULL * i / 240, X = at(u);
      cj.push([u, v3.dot(v3.unit(X.J), v3.unit(X.J0))]); cp.push([u, X.c]);
    }
    g.line(cj, P.cyan, { width: 2 });
    g.line(cp, P.violet, { width: 2.2 });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    const X = at(clock.t);
    g.dot(clock.t, X.c, P.amber, 4);
    $('plotMeta').innerHTML = `<span class="c-cy">J · J₀ / ρ²</span> · <span class="c-vi">⟨ψψ̃₀⟩/ρ</span>`;
  }

  /* ---------- readouts ---------- */
  function drawText(X) {
    const t = clock.t;
    $('roAside').textContent = `ρ = ${fix(X.rho, 2)}`;
    $('roKey').textContent = `${fix(X.J2[0], 3)} · ${fix(-X.S2[0], 3)} · ${fix(X.rho * X.rho, 3)}`;
    $('roKeySub').textContent = L(' · 三个数相等', ' · all three agree');
    $('roPsi').textContent = evenText(X.psi);
    $('roJ').textContent = vt(X.J);
    $('roS').textContent = `${vt(bivOf(X.Sm))} · ${L('面积', 'area')} ${fix(Math.hypot(...bivOf(X.Sm)), 2)}`;
    $('roJback').textContent = `${fix(X.Jback / DEG, 1)}°`;
    $('roSign').textContent = Math.abs(Math.abs(X.c) - 1) < 1e-9 ? `${fix(X.c, 3)} · ${signText(X)}` : fix(X.c, 3);
    const tm = t / TAU;
    let note;
    if (Math.abs(tm - 1) < 1e-6) note = L('转满 360°：青色的 J 回到出发处，品红的 S 也是；紫色小旗却到了光带的另一面，与虚线的出发小旗方向相反——ψ = −ψ₀。J 与 S 只认得出转动，认不出 ψ 的正负号。',
      'A full 360°: the cyan J is back where it started, and so is the magenta S; but the violet flag is on the other side of the band, opposite to the dashed starting flag — ψ = −ψ₀. J and S see the rotation, not the sign of ψ.');
    else if (Math.abs(tm - 2) < 1e-6) note = L('转满 720°：小旗回到出发时的那一面，旗尖走过的路（光带的边）首尾相接——ψ = +ψ₀。',
      'A full 720°: the flag is back on the side it started from and the path of its tip, the edge of the band, closes up — ψ = +ψ₀.');
    else if (S.mu > 0.005) note = L(`模型：二元隔墙 μ = ${fix(S.mu, 2)}。光带沿中线剪成两件：小旗走第一圈的那一半收成中间的指针球，走第二圈的那一半撑成外面的内存壳，中间隔着缝。μ 只是画面的过渡，本章没有给它数学定义；推回 0，两件就是第三十九章那条单侧光带。`,
      `Model: dualist wall μ = ${fix(S.mu, 2)}. The band is cut along its centre line into two pieces: the half the flag runs along in its first round shrinks into the pointer ball in the middle, the half of its second round spreads into the memory shell round it, with a gap between. μ only moves the picture; the chapter gives it no mathematical definition. Push it back to 0 and the two pieces are the one-sided band of Chapter 39.`);
    else if (t < 1e-6) note = L('还没转：小旗顺着转轴 n 竖着。J 的长度是 ρ，品红正方形的面积也是 ρ。', 'Not turned yet: the flag stands along the axis n. J has length ρ, and the magenta square has area ρ too.');
    else {
      // t is the turn parameter in the chosen plane; J's angle from J₀ is the principal value X.Jback in [0°, 180°]
      const al = fix(X.Jback / DEG, 0);
      note = L(`在 ${PL().name} 面里转过 ${fix(t / DEG, 0)}°：这是转动参数，不是 J 离出发方向的夹角。J 此刻离出发方向 ${al}°；小旗按半角转过 ${fix(t / 2 / DEG, 0)}°。三个平方仍然相等。`,
        `Turned ${fix(t / DEG, 0)}° in ${PL().name}: this is the turn parameter, not the angle of J from its start. J is now ${al}° from its start; the flag has turned through the half angle, ${fix(t / 2 / DEG, 0)}°. The three squares still agree.`);
    }
    $('roNote').textContent = note;
    $('pillTurn').querySelector('strong').textContent = `${fix(t / DEG, 0)}°`;
    $('pillSign').querySelector('strong').textContent = sgn(X.c, 2);
  }

  const paint = kit.painter(() => { const X = drawStage(); drawPlot(); drawText(X); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: FULL, rate: 1.05, step: PI / 12,
    format: (t, max) => `${L('转过', 'turned')} ${fix(t / DEG, 0)}° <small>/ ${fix(max / DEG, 0)}°</small>`,
    onChange: () => paint()
  });
  function restoreMax() { if (S.max !== FULL) { S.max = FULL; clock.setMax(FULL, true); } }
  /** μ moves smoothly (a card) or at once (the slider). */
  let muTween = null;
  function setMu(v, ms) {
    if (muTween) { muTween.cancel(); muTween = null; }
    const m0 = S.mu;
    if (!ms) { S.mu = v; fMu.set(v); paint(); return; }
    muTween = kit.tween(ms, (e) => { S.mu = m0 + (v - m0) * e; fMu.set(Math.round(S.mu * 100) / 100); paint(); }, () => { muTween = null; });
  }
  const fMu = kit.field($('mu'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); setMu(v); } });
  const fRho = kit.field($('rho'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.rho = v; paint(); } });
  const planeChips = kit.chips($('planeChips'), 'plane', (v) => { leave(); S.plane = v; paint(); });
  $('psiOne').addEventListener('click', () => { leave(); S.R0 = ONE.slice(); paint(); });
  function randomPsi() { leave(); S.seed += 1; S.R0 = randomRotor(S.seed); paint(); }
  $('psiRandom').addEventListener('click', randomPsi);
  $('fanChip').addEventListener('click', () => { leave(); S.fan = !S.fan; $('fanChip').setAttribute('aria-pressed', String(S.fan)); paint(); });
  $('bandChip').addEventListener('click', () => { leave(); S.band = !S.band; $('bandChip').setAttribute('aria-pressed', String(S.band)); if (S.band && stage.cam.zoom > 1.05) stage.view([stage.cam.yaw, stage.cam.pitch, 1], 400); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: randomPsi });
  /** Choose ψ₀ so that J at the current turn points at the unit vector p. */
  function aimJ(p) {
    const t = clock.t, Rt = turnRotor(PL(), t), now = mul(Rt, S.R0), Jn = vecOf(sandwich(now, vec(E3)));
    const Q = arcRotor(v3.unit(Jn), v3.unit(p));
    S.R0 = mul(rev(Rt), mul(Q, now));
    const k = Math.hypot(...S.R0); S.R0 = scl(S.R0, 1 / k);
    paint();
  }

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    weave: { rho: 1, plane: 'e23', aim: [0.53, 0.29, 0.8], ref: true, at: 0, view: [-1.1, 0.5, 1.05] },
    fierz: { rho: 1.3, plane: 'e31', seed: 7, play: true, still: 2.2, view: [-0.4, 0.9, 0.95] },
    turn360: { rho: 1, plane: 'e23', play: true, still: TAU, max: TAU, view: [-1.1, 0.5, 0.95] },
    seam: { rho: 1, plane: 'e23', fan: true, unrolled: true, play: true, still: TAU, max: TAU, view: [-1.1, 0.5, 0.95] },
    turn720: { rho: 1, plane: 'e23', play: true, still: FULL, view: [-1.1, 0.5, 0.95] }
  };
  const NOTES = {
    weave: ['ψ₀ 是一枚斜着的旋量（ρ = 1）。它夹住虚线的 e₃，织出青色的流向量 J；夹住虚线的 e₁e₂ 正方形，织出品红的自旋面 S——那块面正好与 J 垂直。紫色虚线小弧是 ψ 把 e₃ 带到 J 走的路。',
      'ψ₀ is a slanted spinor (ρ = 1). Sandwiching the dashed e₃, it weaves the cyan current vector J; sandwiching the dashed e₁e₂ square, it weaves the magenta spin plane S, which lies exactly at right angles to J. The short dashed violet arc is the way ψ carries e₃ to J.'],
    fierz: ['随便一个 ψ（ρ = 1.3），在 e₃e₁ 面里一直转：J 的长度是 1.3，品红正方形的面积也是 1.3，三个平方 J²、−S²、ρ² 一直都是 1.69。',
      'Any ψ at all (ρ = 1.3), turning on and on in the e₃e₁ plane: J has length 1.3, the magenta square has area 1.3, and the three squares J², −S² and ρ² stay at 1.69 the whole time.'],
    turn360: ['第三十九章的例子：ψ = cos(ϑ/2) − sin(ϑ/2) e₂e₃，转满 360°。青色的 J 绕一圈回到 e₃，品红的 S 也回到原样；紫色小旗却沿光带滑到了另一面，与虚线的出发小旗方向相反：ψ = −ψ₀。旗尖走过的紫色轨迹从光带的上边走到下边，首尾没有接上。',
      'The example of Chapter 39: ψ = cos(ϑ/2) − sin(ϑ/2) e₂e₃, turned a full 360°. The cyan J goes once round back to e₃ and the magenta S is as it was; but the violet flag has slid to the other side of the band and points opposite to the dashed starting flag: ψ = −ψ₀. The violet trail of the tip of the flag runs from the upper edge of the band to the lower one, and its ends do not meet.'],
    seam: ['从出发点起每 30° 插一面小旗，每一面都接着上一面连续地插。绕回出发点时，最后一面与虚线的第一面方向正好相反：沿着这一圈连续地选“平方根”，回到起点就对不上。',
      'From the start, plant a flag every 30°, each one continuing the one before. Back at the start, the last flag points exactly opposite to the dashed first one: choosing a “square root” continuously round the loop does not match up when you return.'],
    turn720: ['再转一圈，一共 720°：小旗回到出发时的那一面，与虚线的出发小旗重合，ψ = +ψ₀。旗尖走过的路就是光带的边——这条边绕了两圈才首尾相接。青色的 J 在这期间走了两圈。',
      'One more turn, 720° in all: the flag is back on its first side, on top of the dashed starting flag, and ψ = +ψ₀. The path of the tip of the flag is the edge of the band, and that edge closes only after going round twice. Meanwhile the cyan J has gone round twice.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.rho = p.rho; fRho.set(p.rho);
    S.plane = p.plane; planeChips.set(p.plane, true);
    S.seed = p.seed || 0; S.R0 = p.aim ? arcRotor(E3, v3.unit(p.aim)) : p.seed ? randomRotor(p.seed) : ONE.slice();
    S.fan = !!p.fan; $('fanChip').setAttribute('aria-pressed', String(S.fan));
    S.band = p.band !== false; $('bandChip').setAttribute('aria-pressed', String(S.band));
    S.ref = !!p.ref;
    S.unrolled = !!p.unrolled;
    S.max = p.max || FULL;
    if (booting || TRV.still || S.mu < 0.005) setMu(0); else setMu(0, 700);   // every card is on the closed band
    if (booting || TRV.still) { stage.cam.yaw = p.view[0]; stage.cam.pitch = p.view[1]; stage.cam.zoom = p.view[2]; } else stage.view(p.view, 600);
    clock.pause(); clock.setMax(S.max, true); clock.set(p.at || 0);
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) kit.autoplay(clock, $('stage'));
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: (id) => { S.ref = false; applyPreset(id); },
    idle: ['自由探索：拖动 J 的箭头尖换一个 ψ₀，改密度 ρ 或转动的平面，拖时间轴。随时可以再选一张卡。', 'Free play: drag the tip of J to choose another ψ₀, change the density ρ or the plane of the turn, scrub the rail. Pick a card again at any time.'] });
  // leaving a card clears the reference blades it showed
  const mark0 = cards.mark;
  cards.mark = (id) => { if (!id) { S.ref = false; S.unrolled = false; } mark0(id); };

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.CLOSURE_DEBUG = {
    get state() {
      const t = clock.t, X = at(t), a0 = bearing0(), F = frame(t, a0);
      return { preset: cards.current, t, max: clock.max, playing: clock.playing, rho: S.rho, plane: S.plane, fan: S.fan, ref: S.ref, band: S.band, zoom: stage.cam.zoom,
        psi: X.psi.slice(), psi0: X.psi0.slice(), J: X.J, J0: X.J0, S: X.Sm.slice(), A: X.A, B: X.B,
        J2: X.J2.slice(), S2: X.S2.slice(), rhoM: X.rhoM.slice(), c: X.c, s: X.s, Jback: X.Jback,
        axis: PL().n.slice(), flagDir: F.w, flagBase: F.c, mu: S.mu, unrolled: !!S.unrolled, tip: last.tip, mode: stage.mode, keyText: $('roKey').textContent };
    },
    /** ψ (8 blade coefficients [1, e₁, e₂, e₁e₂, e₃, e₁e₃, e₂e₃, e₁e₂e₃]) at rail value t, without moving the rail. */
    psiAt: (t) => at(t).psi.slice(),
    /** J, S, J², S² and ψψ̃ that the page's product gives for an arbitrary even multivector ψ (8 blade coefficients). */
    bilinears: (psi) => { const J = sandwich(psi, vec(E3)), Sm = sandwich(psi, E12); return { J: vecOf(J), Jm: J, S: Sm, J2: mul(J, J), S2: mul(Sm, Sm), rho: mul(psi, rev(psi)) }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Set the camera [yaw, pitch, zoom] at once. */
    view: (v) => { stage.cam.yaw = v[0]; stage.cam.pitch = v[1]; stage.cam.zoom = v[2] || 1; paint.now(); },
    /** A point of the solid as the page draws it: piece 0 (t in [0, 2π]) or 1 (t in [2π, 4π]), v across the slab. */
    solid: (piece, t, v, mu) => solidPoint(piece, t, v, bearing0(), mu == null ? S.mu : mu),
    /** The band's centre line, width direction and normal at t, and its dimensions. */
    band: (t) => { const F = frame(t, bearing0()); return { c: F.c, w: F.w, N: F.N, HW, TH, FACE }; },
    /** What the stage has under a viewport point: the piece and its (t, v), or null. */
    hit: (x, y) => { const h = stage.hit({ clientX: x, clientY: y }); return h && { id: h.id, u: h.u, v: h.v, front: h.front }; },
    nodes: () => last.nodes.map((n) => { const q = stage.p(n.p), b = $('cv').getBoundingClientRect(); return { t: n.t, x: b.left + q[0], y: b.top + q[1], hidden: stage.occluded(n.p, 0.02) }; }),
    /** Push a playing clock to just before t without stopping it (tests that wait for a card to stop by itself). */
    nudge: (t) => { if (clock.playing && clock.t < t) clock.set(t, true); },
    /** Viewport coordinates of a world point. */
    screen: (v) => { const q = stage.p(v), bx = $('cv').getBoundingClientRect(); return [bx.left + q[0], bx.top + q[1], q[2]]; },
    under: (x, y) => stage.pick({ clientX: x, clientY: y })
  };
  window.TRV_THUMB = () => { cards.pick('turn720'); setMu(0); stage.cam.yaw = -1.1; stage.cam.pitch = 0.5; stage.cam.zoom = 1; clock.pause(); clock.set(1.5 * TAU); paint.now(); };
  cards.pick(cards.initial('weave'));
  booting = false;
  paint();
})();
