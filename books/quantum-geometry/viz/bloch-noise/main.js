/* BLOCH//NOISE: the Bloch ball under three noises.
   One step of a noise is an affine map of the whole ball, r ↦ (λx, λy, az + h):
     phase damping  (c x, c y, z)                    c = 1 − p per step
     amplitude      (λ x, λ y, a z + 1 − a)          a = 1 − p per step, λ = a^(T1/T2) (λ = √a for pure amplitude damping)
     depolarizing   (f x, f y, f z)                  f = 1 − p per step
   The rail counts steps N. At whole N the map is exactly N steps; between two whole steps the page takes the convex
   combination of the outputs of the two neighbouring whole steps. The stage draws the unit ball before (thin wire),
   its image (cyan), two states ρ (amber) and σ (white) that start on the skin, their distance, and the fixed points;
   a map that is not a channel is drawn as a lit solid in a glass shell instead (drawSolid).
   Read-only probe for the browser suite: window.NOISE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180;

  /* ---------- model ---------- */
  const S = { ch: 'amp', p: 0.3, ratio: 2, rho0: [0, 0, -1], sig0: [1, 0, 0], scene: 'noise' };
  /* The environment scene (§4.1): the rail is the angle θ_env between the two records |e₀⟩, |e₁⟩ of the environment.
     A pure state a|0⟩ + b|1⟩ is coupled to the environment as a|0⟩|e₀⟩ + b|1⟩|e₁⟩; tracing the environment out gives
     ρ_S = [[|a|², a b̄ ⟨e₁|e₀⟩], [ā b ⟨e₀|e₁⟩, |b|²]] with e₀ = (1, 0), e₁ = (cos θ, sin θ). */
  const env = () => S.scene === 'env';
  function reduced(r, th) {
    const t = Math.acos(kit.clamp(r[2], -1, 1)) / 2, ph = Math.atan2(r[1], r[0]);
    const a = [Math.cos(t), 0], b = [Math.sin(t) * Math.cos(ph), Math.sin(t) * Math.sin(ph)];
    const e0 = [[1, 0], [0, 0]], e1 = [[Math.cos(th), 0], [Math.sin(th), 0]];   // two real record vectors, as complex pairs
    const ip = (u, v) => [u[0][0] * v[0][0] + u[0][1] * v[0][1] + u[1][0] * v[1][0] + u[1][1] * v[1][1], u[0][0] * v[0][1] - u[0][1] * v[0][0] + u[1][0] * v[1][1] - u[1][1] * v[1][0]];   // ⟨u|v⟩
    const cm = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]], cj = (x) => [x[0], -x[1]];
    const r10 = cm(cm(cj(a), b), ip(e0, e1)), r00 = a[0] * a[0] + a[1] * a[1], r11 = b[0] * b[0] + b[1] * b[1];
    return [2 * r10[0], 2 * r10[1], r00 - r11];   // x = 2 Re ρ₁₀, y = 2 Im ρ₁₀, z = ρ₀₀ − ρ₁₁
  }
  /** One step of the amplitude family breaks the north-pole ball criterion: λ² > a for λ = a^(T₁/T₂), a = 1 − p.
      For 0 < p < 1 this happens exactly when T₂ > 2 T₁; the map then is no channel (nor amplitude damping). At the
      endpoints λ² = a for every ratio: p = 0 is the identity and p = 1 resets the whole ball to the north pole. */
  const notChannel = () => { if (S.ch !== 'amp') return false; const m = whole(1); return m.lam * m.lam > m.a + 1e-12; };
  const chName = (c) => (c === 'amp' && notChannel() ? L('固定北极的仿射映射（不是信道）', 'A map fixing the north pole (not a channel)')
    : c === 'dephase' && S.p > 1 - 1e-12 ? L('捏合（完全去相干）', 'Pinching (complete dephasing)')
      : ({ dephase: L('相位阻尼', 'Phase damping'), amp: L('振幅阻尼', 'Amplitude damping'), depol: L('去极化', 'Depolarizing') })[c]);
  /** The affine map after a whole number n of steps: { lam, a, h } with r ↦ (lam x, lam y, a z + h). */
  function whole(n) {
    const f = Math.pow(1 - S.p, n);   // 0^0 = 1: no step, no change
    if (S.ch === 'dephase') return { lam: f, a: 1, h: 0 };
    if (S.ch === 'depol') return { lam: f, a: f, h: 0 };
    return { lam: f > 0 ? Math.pow(f, 1 / S.ratio) : 0, a: f, h: 1 - f };
  }
  /** The map at rail position N: whole steps exactly, a convex combination of two neighbouring whole steps between them. */
  function mapAt(N) {
    if (env()) return { lam: Math.cos(N * DEG), a: 1, h: 0 };   // the reduced map for every input: the overlap ⟨e₀|e₁⟩ = cos θ_env
    const k = Math.floor(N + 1e-12), u = N - k;
    const m0 = whole(k);
    if (u < 1e-12) return m0;
    const m1 = whole(k + 1);
    return { lam: (1 - u) * m0.lam + u * m1.lam, a: (1 - u) * m0.a + u * m1.a, h: (1 - u) * m0.h + u * m1.h };
  }
  const apply = (m, v) => [m.lam * v[0], m.lam * v[1], m.a * v[2] + m.h];
  /** The largest |F(r)| over the closed unit ball (it lies on the sphere): |F|² = (a² − λ²) z² + 2ah z + h² + λ². */
  function farthest(m) {
    const A = m.a * m.a - m.lam * m.lam, B = 2 * m.a * m.h, C = m.h * m.h + m.lam * m.lam;
    const g = (z) => A * z * z + B * z + C;
    let best = { z: 1, g: g(1) };
    for (const z of [-1].concat(A < 0 ? [kit.clamp(-B / (2 * A), -1, 1)] : [])) if (g(z) > best.g + 1e-15) best = { z, g: g(z) };
    return { z: best.z, r: Math.sqrt(Math.max(0, best.g)) };
  }
  function read(N) {
    const m = mapAt(N), rho = env() ? reduced(S.rho0, N * DEG) : apply(m, S.rho0), sig = env() ? reduced(S.sig0, N * DEG) : apply(m, S.sig0), far = farthest(m);
    const T0 = v3.len(v3.sub(S.rho0, S.sig0)) / 2, T = v3.len(v3.sub(rho, sig)) / 2;
    return {
      m, rho, sig, T0, T, len: v3.len(rho), far,
      escapes: far.r > 1 + 1e-9,
      mass0: (S.rho0[0] ** 2 + S.rho0[1] ** 2) / 2, mass: (rho[0] ** 2 + rho[1] ** 2) / 2   // |ρ₀₁|² + |ρ₁₀|² = (x² + y²)/2
    };
  }

  /* ---------- stage ---------- */
  let grab = null;   // 'rho' | 'sig' while dragging
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.41 : 0.335, cy: TRV.figure ? 0.53 : 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => {
      const now = read(clock.t);
      const d = (v) => (solidOn && solid.occluded(v, 0.02) ? 1e9 : st.near(ev, v));   // what the solid hides cannot be picked
      const dr = Math.min(d(S.rho0), d(now.rho)), ds = Math.min(d(S.sig0), d(now.sig));
      grab = Math.min(dr, ds) < 22 ? (dr <= ds ? 'rho' : 'sig') : null;
      return !!grab;
    },
    onDrag: (ev, st) => { const r = v3.unit(st.pick(ev)); if (grab === 'rho') S.rho0 = r; else if (grab === 'sig') S.sig0 = r; touched(); },
    onDrop: () => { grab = null; }
  });
  /* ---------- the solid stage: a map that is not a channel ----------
     When one step breaks the north-pole criterion (λ² > a, the card T2 > 2T1), the question the page asks is which
     part of the image lies outside the ball; a wire outline cannot tell inside from outside there. For that case only,
     the stage draws with kit.solid, under the same camera: the unit ball as a glass shell, its image as a lit opaque
     solid, cyan inside the ball and magenta where it lies outside, the trace of the solid on the skin as a thin white
     line. Marks sit on the solid and are hidden where it hides them. Every other state keeps the wire stage above. */
  const solid = kit.solid($('stage'), { canvas: $('sv'), radius: TRV.thumbMode ? 0.41 : 0.335, cy: TRV.figure ? 0.53 : 0.52, rotate: false, onChange: () => paint() });
  let solidOn = false;
  /** Where the image lies outside the unit ball: |F|² − 1 = (a² − λ²) z² + 2ah z + h² + λ² − 1 > 0 for the pre-image
      height z of a point of the sphere. For the amplitude family z = 1 is a root (the fixed north pole), so the part
      outside is the image of the cap z0 < z ≤ 1. Returns z0, or null when nothing lies outside. */
  function capOf(m) {
    const A = m.a * m.a - m.lam * m.lam, B = 2 * m.a * m.h, C = m.h * m.h + m.lam * m.lam - 1;
    if (farthest(m).r <= 1 + 1e-9 || A >= -1e-12) return null;
    const disc = Math.sqrt(Math.max(0, B * B - 4 * A * C));
    return kit.clamp(Math.min((-B + disc) / (2 * A), (-B - disc) / (2 * A)), -1, 1);
  }
  const NU = 96, K = 18;
  /** The image solid, sampled on columns of the azimuth (run backwards, so that the grid's normals point outwards); in
      every column the polar angle runs in two stretches that meet at the polar angle θ0 of the cap, so that the
      magenta edge is exact. A half-axis thinner than a few pixels is drawn at that thickness (no zero-thickness sheet);
      when both are, the image is one point and the dots show it. */
  function drawImage(sc, m) {
    const eps = 3.5 / sc.unit, lam = Math.max(m.lam, eps), a = Math.max(m.a, eps);
    if (m.lam < eps && m.a < eps) return { z0: null };
    const z0 = capOf(m), th0 = z0 == null ? 0 : Math.acos(z0), rows = [];
    for (let j = 0; j <= 2 * K + 1; j++) rows.push([]);
    for (let i = 0; i <= NU; i++) {
      const ph = -2 * Math.PI * i / NU, at = (th) => [lam * Math.sin(th) * Math.cos(ph), lam * Math.sin(th) * Math.sin(ph), a * Math.cos(th) + m.h];
      for (let j = 0; j <= K; j++) rows[j].push(at(th0 * j / K));
      for (let j = 0; j <= K; j++) rows[K + 1 + j].push(at(th0 + (Math.PI - th0) * j / K));
    }
    const nv = 2 * K + 1;
    sc.surface('image', rows, { colors: [P.cyan, P.magenta], range: [0, 1], value: (u, v) => (z0 != null && Math.round(v * nv) <= K ? 1 : 0) });
    return { z0 };
  }
  function drawSolid(on, now) {
    const sc = solid, m = now.m;
    if (!on) { if (solidOn) { sc.begin(); sc.end(); solidOn = false; } return; }
    solidOn = true;
    Object.assign(sc.cam, { yaw: stage.cam.yaw, pitch: stage.cam.pitch, zoom: stage.cam.zoom });
    sc.begin();
    sc.glass('ball', [0, 0, 0], 1, { color: P.ink, alpha: 0.045, rim: 0.32 });
    const eq = []; for (let i = 0; i <= 96; i++) { const t = 2 * Math.PI * i / 96; eq.push([Math.cos(t), Math.sin(t), 0]); }
    sc.line(eq, { color: P.faint, width: 1, alpha: 0.7 });
    sc.line([[0, 0, -1.18], [0, 0, 1.18]], { color: P.faint, width: 1, alpha: 0.9 });
    sc.line([[-1.12, 0, 0], [1.12, 0, 0]], { color: P.faint, width: 1, alpha: 0.6 });
    sc.tag('k0', [0, 0, 1.08], '|0⟩', 'num', now.escapes ? { dx: -50, dy: -6 } : { dx: -22 });
    sc.tag('k1', [0, 0, -1.08], '|1⟩', 'num', { dx: -22 }); sc.tag('kp', [1.24, 0, 0], '|+⟩', 'num');
    const img = drawImage(sc, m);
    // the trace of the solid on the skin: the circle at the image height a z0 + h
    if (img.z0 != null) {
      const zc = m.a * img.z0 + m.h, rc = m.lam * Math.sqrt(Math.max(0, 1 - img.z0 * img.z0)) * 1.004, ring = [];
      for (let i = 0; i <= 120; i++) { const t = 2 * Math.PI * i / 120; ring.push([rc * Math.cos(t), rc * Math.sin(t), zc]); }
      sc.line(ring, { color: P.ink, width: 1.4, alpha: 0.95 });
    }
    // the fixed north pole (on the tip of the solid: always in view), and the farthest image point
    if (S.p > 1e-9 && clock.t > 1e-9) {
      sc.bead([0, 0, 1], { color: P.violet, r: 6.5, glow: 0.8, key: 'fix' });
      sc.ring([0, 0, 1], { color: P.violet, r: 10.5, normal: sc.facing() });
      sc.tag('fx', [0, 0, 1], L('不动点', 'fixed point'), 'raw c-vi', now.escapes ? { dx: 58, dy: -20, occlude: false } : { dx: 54, dy: -12, occlude: false });
    }
    if (now.escapes) {
      const side = v3.unit(v3.cross([0, 0, 1], sc.facing())), z = now.far.z, w = Math.sqrt(Math.max(0, 1 - z * z));
      const q = apply(m, [w * side[0], w * side[1], z]);
      sc.bead(q, { color: P.magenta, r: 5.5, glow: 0.8, key: 'esc' });
      const tight = sc.p(q)[0] + 150 > sc.W;   // a narrow stage: the label goes below the point instead of beside it
      sc.tag('esc', q, L(`出界 ‖r‖ = ${fix(now.far.r, 3)}`, `out ‖r‖ = ${fix(now.far.r, 3)}`), 'num c-mg', tight ? { dx: -40, dy: 42, occlude: false } : { dx: 62, dy: -10, occlude: false });
    }
    // the two states: where they started (rings on the skin), the road travelled, where they are now (no distance:
    // the map is not a channel)
    const road = (v) => { const pts = [], n = Math.max(2, Math.ceil(clock.t * 24)); for (let i = 0; i <= n; i++) pts.push(apply(mapAt(clock.t * i / n), v)); return pts; };
    if (clock.t > 1e-9) {
      sc.line(road(S.sig0), { color: P.ink, width: 1, alpha: 0.5 });
      sc.line(road(S.rho0), { color: P.amber, width: 1.2, alpha: 0.65 });
      sc.line([S.rho0, S.sig0], { color: P.dim, width: 1, alpha: 0.8, dash: [4, 4] });
    }
    sc.ring(S.sig0, { color: P.ink, r: 5, alpha: 0.75, normal: S.sig0, key: 'sig0' });
    sc.ring(S.rho0, { color: P.amber, r: 5.5, alpha: 0.85, normal: S.rho0, key: 'rho0' });
    sc.bead(now.sig, { color: P.ink, r: 4.5, glow: 0.4, key: 'sig' });
    sc.arrow([0, 0, 0], now.rho, { color: P.amber, width: 2.6, headSize: 11 });
    sc.bead(now.rho, { color: P.amber, r: 5, glow: 0.7, key: 'rho' });
    const pr = sc.p(now.rho), ps = sc.p(now.sig), dx = pr[0] - ps[0], dy = pr[1] - ps[1], dl = Math.hypot(dx, dy);
    const ux = dl > 1 ? dx / dl : 1, uy = dl > 1 ? dy / dl : 0;
    sc.tag('rho', now.rho, 'ρ', 'num c-am big', { dx: 15 * ux + 4, dy: 15 * uy - 6 });
    sc.tag('sig', now.sig, 'σ', 'num big', { dx: -15 * ux - 4, dy: -15 * uy - 6 });
    sc.end();
  }

  /** Draw a polyline of world points, magenta (thicker) where it lies outside the unit ball and `color` inside. */
  function runs(pts, color, s) {
    let cur = [pts[0]], out = null;
    const flush = () => { if (cur.length > 1) stage.path(cur, Object.assign({}, s, out ? { color: P.magenta, width: (s.width || 1) * 2.2, alpha: 1 } : { color })); };
    for (let i = 1; i < pts.length; i++) {
      const o = v3.len(v3.scale(v3.add(pts[i - 1], pts[i]), 0.5)) > 1 + 1e-6;
      if (out !== null && o !== out) { flush(); cur = [pts[i - 1]]; }
      cur.push(pts[i]); out = o;
    }
    flush();
  }
  function drawStage() {
    // a map that is not a channel is drawn on the solid stage (see drawSolid); everything else on the wire stage below
    const now = read(clock.t), solidNow = !env() && notChannel();
    drawSolid(solidNow, now);
    const st = stage, c = st.begin(), m = now.m, D = st.facing(), thick = TRV.thumbMode ? 1.6 : 1;
    if (!solidNow) {
    // the unit ball before the noise
    st.sphere(1, { lat: [0], lon: 2, shade: 0.04, alpha: TRV.thumbMode ? 0.75 : 0.4 });
    st.line([0, 0, -1.18], [0, 0, 1.18], { color: P.faint, width: 1, alpha: 0.9, back: 0.5 });
    st.line([-1.12, 0, 0], [1.12, 0, 0], { color: P.faint, width: 1, alpha: 0.6, back: 0.5 });
    const onNorth = [now.rho, now.sig].some((v) => v3.len(v3.sub(v, [0, 0, 1])) < 0.2);
    // |0⟩ sits above the bulge when the image pierces the skin
    st.tag('k0', [0, 0, 1.08], '|0⟩', 'num', now.escapes ? { dx: -64, dy: -22 } : onNorth ? { dx: -52, dy: -4 } : { dx: -22 });
    st.tag('k1', [0, 0, -1.08], '|1⟩', 'num', { dx: -22 }); st.tag('kp', [1.24, 0, 0], '|+⟩', 'num');
    // the image of the ball: outline of the spheroid with half-axes (λ, λ, a) centred at (0, 0, h)
    const e1 = v3.unit(v3.cross(D, Math.abs(D[2]) < 0.95 ? [0, 0, 1] : [1, 0, 0])), e2 = v3.cross(D, e1), outline = [];
    for (let i = 0; i < 96; i++) {
      const t = 2 * Math.PI * i / 96, u = v3.add(v3.scale(e1, Math.cos(t)), v3.scale(e2, Math.sin(t)));
      const hh = Math.sqrt(m.lam * m.lam * (u[0] * u[0] + u[1] * u[1]) + m.a * m.a * u[2] * u[2]);
      outline.push(hh > 1e-9 ? [m.lam * m.lam * u[0] / hh, m.lam * m.lam * u[1] / hh, m.a * m.a * u[2] / hh + m.h] : [0, 0, m.h]);
    }
    const flat = m.lam < 0.012, point = flat && m.a < 0.012;
    if (point) { /* the whole ball is one point: drawn by the dots below */ }
    else if (flat) { c.save(); c.shadowColor = P.cyan; c.shadowBlur = 10; st.line([0, 0, m.h - m.a], [0, 0, m.h + m.a], { color: P.cyan, width: 6 * thick, alpha: 0.9, back: 1 }); c.restore(); }
    else {
      st.poly(outline, { fill: P.cyan, alpha: 0.1 });
      runs(outline.concat([outline[0]]), P.cyan, { width: 1.8 * thick, alpha: 0.95, fade: false });
      // the image of the equator and of two meridians, so that the body reads as a solid
      const eq = [], m1 = [], m2 = [];
      for (let i = 0; i <= 72; i++) { const t = 2 * Math.PI * i / 72; eq.push(apply(m, [Math.cos(t), Math.sin(t), 0])); m1.push(apply(m, [Math.sin(t), 0, Math.cos(t)])); m2.push(apply(m, [0, Math.sin(t), Math.cos(t)])); }
      runs(eq, P.cyan, { width: 1.1 * thick, alpha: 0.75, back: 0.35 });
      runs(m1, P.cyan, { width: 0.8 * thick, alpha: 0.5, back: 0.3 }); runs(m2, P.cyan, { width: 0.8 * thick, alpha: 0.5, back: 0.3 });
    }
    // fixed points (violet), when the noise acts at all
    const acting = S.p > 1e-9 && clock.t > 1e-9;
    if (acting) {
      if (S.ch === 'dephase') { c.save(); c.shadowColor = P.violet; c.shadowBlur = 8; st.line([0, 0, -1], [0, 0, 1], { color: P.violet, width: 2 * thick, alpha: 1, dash: [7, 5], back: 0.7 }); c.restore(); st.tag('fx', [0, 0, -0.55], L('不动点：整根竖轴', 'fixed: the whole axis'), 'raw c-vi', { dx: 72, fade: false }); }
      else if (S.ch === 'amp') { st.dot([0, 0, 1], 6.5, P.violet, { glow: 12, fade: false }); st.tag('fx', [0, 0, 1], L('不动点', 'fixed point'), 'raw c-vi', now.escapes ? { dx: 40, dy: -58 } : { dx: 54, dy: -12 }); }
      else { st.dot([0, 0, 0], 6.5, P.violet, { glow: 12, fade: false }); st.tag('fx', [0, 0, 0], L('不动点', 'fixed point'), 'raw c-vi', { dx: -46, dy: 16 }); }
    }
    // where the image pierces the skin: the farthest point, turned to face the side of the screen
    if (now.escapes) {
      const side = v3.unit(v3.cross([0, 0, 1], D)), z = now.far.z, w = Math.sqrt(Math.max(0, 1 - z * z));
      const q = apply(m, [w * side[0], w * side[1], z]);
      st.dot(q, 5.5, P.magenta, { glow: 12, fade: false });
      st.tag('esc', q, L(`出界 ‖r‖ = ${fix(now.far.r, 3)}`, `out ‖r‖ = ${fix(now.far.r, 3)}`), 'num c-mg', { dx: 62, dy: -10 });
    }
    // pinching: the sideways part of each start, the part that is squashed away (its square carries the coherence mass)
    if (S.ch === 'dephase' && S.p > 1 - 1e-12 && !env() && clock.t > 1e-9) {
      for (const v of [S.rho0, S.sig0]) st.line([0, 0, v[2]], v, { color: P.magenta, width: 2.6 * thick, alpha: 0.95, back: 0.6 });
    }
    // the two states: where they started (rings on the skin), the road travelled, where they are now
    const road = (v) => { const pts = [], n = Math.max(2, Math.ceil(clock.t * 24)); for (let i = 0; i <= n; i++) pts.push(apply(mapAt(clock.t * i / n), v)); return pts; };
    if (clock.t > 1e-9) {
      st.path(road(S.sig0), { color: P.ink, width: 1, alpha: 0.45, back: 0.3 });
      st.path(road(S.rho0), { color: P.amber, width: 1.2, alpha: 0.6, back: 0.3 });
      st.line(S.rho0, S.sig0, { color: P.dim, width: 1, alpha: 0.8, dash: [4, 4], back: 0.5 });
    }
    st.dot(S.sig0, 5, P.ink, { ring: true, alpha: 0.7 });
    st.dot(S.rho0, 5.5, P.amber, { ring: true, alpha: 0.8 });
    if (!notChannel()) st.line(now.rho, now.sig, { color: P.ink, width: 2.2 * thick, alpha: 0.95, back: 0.7 });   // no distance for a map that is not a channel
    st.dot(now.sig, 4.5, P.ink, { fade: false });
    st.arrow([0, 0, 0], now.rho, { color: P.amber, width: 2.6, glow: 12, headSize: 11, fade: false });
    st.dot(now.rho, 5, P.amber, { glow: 14, fade: false });
    // a single fixed point stays visible when a state sits on it
    if (acting && S.ch !== 'dephase') st.dot(S.ch === 'amp' ? [0, 0, 1] : [0, 0, 0], 10.5, P.violet, { ring: true, width: 2, fade: false });
    // labels: ρ and σ pushed away from each other on screen; the distance at the middle of the white line
    const pr = st.p(now.rho), ps = st.p(now.sig), dx = pr[0] - ps[0], dy = pr[1] - ps[1], dl = Math.hypot(dx, dy);
    // when the two land on one point, their labels go to either side of it, clear of the vertical axis
    const ux = dl > 1 ? dx / dl : 1, uy = dl > 1 ? dy / dl : 0;
    st.tag('rho', now.rho, 'ρ', 'num c-am big', { dx: 15 * ux + 4, dy: 15 * uy - 6 });
    st.tag('sig', now.sig, 'σ', 'num big', { dx: -15 * ux - 4, dy: -15 * uy - 6 });
    if (dl > 46 && !notChannel()) st.tag('T', v3.scale(v3.add(now.rho, now.sig), 0.5), `T ${fix(now.T, 3)}`, 'num', { dx: 14 * -uy, dy: 14 * ux });
    }
    st.end();
    $('legEsc').hidden = !now.escapes;
    if (env()) {
      drawRecords(c, clock.t * DEG);
      $('hudBig').textContent = L(`偏迹 · θₑₙᵥ = ${fix(clock.t, 1)}°`, `partial trace · θₑₙᵥ = ${fix(clock.t, 1)}°`);
      $('hudSub').innerHTML = L(`局部箭头长 cos θ<sub>env</sub> = <b class="c-cy">${fix(now.len, 3)}</b> · 两条记录正交（90°）时缩到球心`, `local arrow length cos θ<sub>env</sub> = <b class="c-cy">${fix(now.len, 3)}</b> · at orthogonal records (90°) it reaches the centre`);
      return;
    }
    $('hudBig').textContent = `${chName(S.ch)} · N = ${fix(clock.t, 2)}`;
    const k = Math.floor(clock.t + 1e-12), between = clock.t - k > 1e-9;
    let sub;
    if (S.ch === 'dephase') sub = L(`横向 ×${fix(m.lam, 2)}（= cos θ<sub>env</sub>，θ<sub>env</sub> = ${fix(Math.acos(kit.clamp(m.lam, -1, 1)) / DEG, 1)}°）· 高度不变 · ρ 的相干质量 ${fix(now.mass0, 3)} → ${fix(now.mass, 3)}`, `across ×${fix(m.lam, 2)} (= cos θ<sub>env</sub>, θ<sub>env</sub> = ${fix(Math.acos(kit.clamp(m.lam, -1, 1)) / DEG, 1)}°) · height kept · coherence mass of ρ ${fix(now.mass0, 3)} → ${fix(now.mass, 3)}`);
    else if (S.ch === 'depol') sub = L(`整体 ×${fix(m.a, 2)}，球心不动`, `everything ×${fix(m.a, 2)}, the centre stays`);
    else sub = L(`横向 ×${fix(m.lam, 2)} · 纵向 ×${fix(m.a, 2)} · 球心上移 ${fix(m.h, 2)}`, `across ×${fix(m.lam, 2)} · up ×${fix(m.a, 2)} · centre lifted ${fix(m.h, 2)}`)
      + (notChannel() ? L(` · T₂ = ${fix(S.ratio, 1)} T₁ > 2 T₁`, ` · T₂ = ${fix(S.ratio, 1)} T₁ > 2 T₁`) : '');
    $('hudSub').innerHTML = sub + (between ? L(` · 第 ${k} 与第 ${k + 1} 步之间`, ` · between steps ${k} and ${k + 1}`) : '');
  }

  /** The environment window: the two records |e₀⟩, |e₁⟩ at the angle θ_env, and the cyan shadow ⟨e₀|e₁⟩ = cos θ_env. */
  function drawRecords(c, th) {
    const W = c.canvas.clientWidth, H = c.canvas.clientHeight, thumb = TRV.thumbMode;
    const Lp = Math.min(96, W * 0.16), ox = W - Lp - 70, oy = H - 70;
    c.save();
    c.strokeStyle = P.faint; c.lineWidth = 1; c.strokeRect(ox - 16, oy - Lp - 30, Lp + 66, Lp + 52);
    const tip = [ox + Lp * Math.cos(th), oy - Lp * Math.sin(th)];
    c.strokeStyle = P.dim; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(tip[0], tip[1]); c.lineTo(tip[0], oy); c.stroke(); c.setLineDash([]);
    c.strokeStyle = P.cyan; c.lineWidth = thumb ? 8 : 6; c.lineCap = 'round'; c.beginPath(); c.moveTo(ox, oy); c.lineTo(ox + Lp * Math.cos(th), oy); c.stroke();
    c.strokeStyle = P.ink; c.lineWidth = 2; c.lineCap = 'butt';
    for (const [x, y] of [[ox + Lp, oy], tip]) { c.beginPath(); c.moveTo(ox, oy); c.lineTo(x, y); c.stroke(); }
    c.beginPath(); c.arc(ox, oy, 22, -th, 0); c.stroke();
    if (!thumb) {
      c.font = '12px "JetBrains Mono", monospace'; c.fillStyle = P.ink; c.textBaseline = 'middle'; c.textAlign = 'left';
      c.fillText('|e₀⟩', ox + Lp + 4, oy); c.fillText('|e₁⟩', tip[0] + 4, tip[1] - 6);
      c.fillText('θ', ox + 26 * Math.cos(th / 2) + 2, oy - 26 * Math.sin(th / 2));
      c.textAlign = 'center'; c.textBaseline = 'top'; c.fillStyle = P.cyan; c.fillText(`cos θ = ${fix(Math.cos(th), 2)}`, ox + Lp / 2, oy + 6);
      c.fillStyle = P.dim; c.textBaseline = 'bottom'; c.fillText(L('环境的两条记录', 'two records in the environment'), ox + Lp / 2 + 8, oy - Lp - 14);
    }
    c.restore();
  }

  /* ---------- strip: the half-axes, and the distance, against the steps ---------- */
  const ticksFor = (max) => { const t = []; for (let i = 0; i <= max; i++) if (max <= 8 || i % 2 === 0) t.push(i); return t; };
  const sample = (max, fn) => { const pts = []; for (let i = 0, n = Math.max(48, max * 24); i <= n; i++) { const N = max * i / n; pts.push([N, fn(N)]); } return pts; };
  function drawAxes() {
    const max = clock.max, now = read(clock.t), g = kit.plot($('axesPlot'), { x: [0, max], y: [0, 1.42], pad: [30, 10, 8, 22] });
    g.axes({ yTicks: [0, 0.5, 1], xTicks: ticksFor(max), xGrid: true });
    const items = [];
    if (S.ch === 'amp') { g.line(sample(max, (N) => Math.sqrt(mapAt(N).a)), P.magenta, { width: 1.4, dash: [3, 3] }); items.push([P.magenta, L('横向上限 √a', 'bound √a'), 'dash']); }
    g.line(sample(max, (N) => mapAt(N).a), P.ink, { width: 1.6, dash: [6, 3] });
    g.line(sample(max, (N) => mapAt(N).lam), P.cyan, { width: 2 });
    g.vline(clock.t, P.amber); g.dot(clock.t, now.m.lam, P.cyan, 4); g.dot(clock.t, now.m.a, P.ink, 3.5);
    g.legend([[P.cyan, L('横向半轴 λ', 'across λ')], [P.ink, L('纵向半轴 a', 'up a'), 'dash']].concat(items));
    $('axesMeta').textContent = `λ ${fix(now.m.lam, 2)} · a ${fix(now.m.a, 2)}`;
  }
  function drawDist() {
    const max = clock.max, now = read(clock.t), top = Math.max(0.2, now.T0 * 1.5), g = kit.plot($('distPlot'), { x: [0, max], y: [0, top], pad: [34, 10, 8, 22] });
    g.axes({ yTicks: top > 0.6 ? [0, 0.5, 1].filter((v) => v <= top) : [0, 0.1, 0.2].filter((v) => v <= top), xTicks: ticksFor(max), xGrid: true });
    g.hline(now.T0, P.dim, { dash: [4, 4] });
    g.line(sample(max, (N) => { const m = mapAt(N); return v3.len(v3.sub(apply(m, S.rho0), apply(m, S.sig0))) / 2; }), P.ink, { width: 2 });
    g.vline(clock.t, P.amber); g.dot(clock.t, now.T, P.ink, 4);
    g.legend([[P.ink, L('距离 T', 'distance T')], [P.dim, L('作用之前', 'before the noise'), 'dash']], { dy: -2 });
    $('distMeta').textContent = `${fix(now.T0, 3)} → ${fix(now.T, 3)}`;
  }

  /* ---------- readouts ---------- */
  function drawText() {
    const now = read(clock.t), m = now.m;
    $('roDist').innerHTML = `${fix(now.T0, 4)} → ${fix(now.T, 4)}`;
    $('roDistSub').textContent = notChannel() ? L(' · 不是信道，不增定理管不到', ' · not a channel: the theorem does not apply') : L(' · 只减不增', ' · never grows');
    $('roLen').textContent = `${fix(v3.len(S.rho0), 3)} → ${fix(now.len, 3)}`;
    $('roAxes').textContent = `${fix(m.lam, 3)} · ${fix(m.a, 3)}`;
    $('roMass').textContent = `${fix(now.mass0, 3)} → ${fix(now.mass, 3)}`;
    const l2 = m.lam * m.lam, inBall = !now.escapes;
    $('roBall').innerHTML = S.ch === 'amp' ? `${fix(l2, 3)} ${l2 <= m.a + 1e-12 ? '≤' : '>'} ${fix(m.a, 3)} · ${inBall ? L('在球里', 'inside') : `<span class="c-mg">${L('刺穿球皮', 'through the skin')}</span>`}`
      : (inBall ? L('在球里', 'inside') : `<span class="c-mg">${L('刺穿球皮', 'through the skin')}</span>`);
    $('roAside').textContent = chName(S.ch);
    $('roNote').innerHTML = now.escapes ? L('像的一部分已在单位球外：这样的映射不把态送到态，下面的不增定理管不到它。', 'Part of the image lies outside the unit ball: this map does not send states to states, and the theorem below does not apply to it.')
      : now.T0 < 1e-9 ? L('ρ 与 σ 从同一点出发：距离一直是零。', 'ρ and σ start at the same point: their distance stays zero.')
        : now.T < 1e-6 ? L('ρ 与 σ 已落在同一点：只看这颗比特，再也分不出它们从哪里来。', 'ρ and σ have landed on the same point: from this qubit alone nobody can tell where they came from.')
          : L(`距离剩下原来的 ${fix(100 * now.T / now.T0, 1)}%。`, `The distance keeps ${fix(100 * now.T / now.T0, 1)}% of what it was.`);
    $('pillLen').querySelector('strong').textContent = fix(now.len, 2);
    $('pillDist').querySelector('strong').textContent = fix(now.T, 3);
    $('ratioField').classList.toggle('off', S.ch !== 'amp');
    $('ratio').disabled = S.ch !== 'amp';
    const per = { dephase: ['c = 1 − p', 'c = 1 − p'], amp: ['γ = p', 'γ = p'], depol: ['λ = p', 'λ = p'] }[S.ch];
    $('pHintZh').textContent = per[0]; $('pHintEn').textContent = per[1];
  }

  const paint = kit.painter(() => { drawStage(); drawAxes(); drawDist(); drawText(); TRV.hudFit(); }, [$('stage'), $('axesPlot'), $('distPlot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 8, rate: 2, step: 1,
    format: (t, max) => (env() ? `θₑₙᵥ ${t.toFixed(1)}° <small>/ 90°</small>` : `N ${t.toFixed(2)} <small>/ ${max.toFixed(0)} ${L('步', max === 1 ? 'step' : 'steps')}</small>`),
    onChange: () => paint()
  });
  /** The rail length that shows a noise to its end, unless a card says otherwise. */
  const autoMax = (p) => (p >= 0.999 ? 1 : p < 0.01 ? 8 : Math.min(8, Math.max(1, Math.ceil(Math.log(0.05) / Math.log(1 - p)))));
  function setMax(max) { clock.setMax(max, true); clock.rate = max / 4; clock.step = env() ? 15 : 1; clock.set(Math.min(clock.t, max)); }
  function touched() { cards.mark(null); paint(); }
  /** The noise controls take the page back from the environment scene to the step-by-step noises. */
  function toNoise() { if (env()) { S.scene = 'noise'; setMax(autoMax(S.p)); clock.set(0); } }
  const fP = kit.field($('strength'), { fmt: (v) => fix(v, 2), onInput: (v) => { S.p = v; S.scene = 'noise'; setMax(autoMax(v)); touched(); } });
  const fR = kit.field($('ratio'), { fmt: (v) => fix(v, 1), onInput: (v) => { S.ratio = v; toNoise(); touched(); } });
  const chChips = kit.chips($('chChips'), 'ch', (v) => { S.ch = v; toNoise(); touched(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- experiment cards ---------- */
  const at = (th, ph) => v3.sph(th * DEG, ph * DEG);
  const PRESETS = {
    shorten: { scene: 'env', ch: 'dephase', p: 0.3, ratio: 2, rho: [90, 0], sig: [90, 180], max: 90, still: 75 },
    pinch: { ch: 'dephase', p: 1, ratio: 2, rho: [60, 30], sig: [60, 210], max: 1, still: 1 },
    dephase: { ch: 'dephase', p: 0.3, ratio: 2, rho: [50, 20], sig: [125, 250], max: 8, still: 2.5 },
    amp: { ch: 'amp', p: 0.3, ratio: 2, rho: [180, 0], sig: [90, 0], max: 8, still: 3.5 },
    wide: { ch: 'amp', p: 0.5, ratio: 6, rho: [40, 0], sig: [90, 180], max: 3, still: 2 },
    distance: { ch: 'amp', p: 0.5, ratio: 2, rho: [0, 0], sig: [90, 0], max: 1, still: 1 },
    centre: { ch: 'depol', p: 1, ratio: 2, rho: [0, 0], sig: [90, 0], max: 1, still: 1 }
  };
  const NOTES = {
    shorten: ['右下角是环境的两条记录 |e₀⟩、|e₁⟩，夹角 θₑₙᵥ 沿时间轴从 0° 转到 90°，青色的影子是它们的内积 cos θₑₙᵥ。对环境求偏迹后，从 |+⟩ 出发的琥珀色 ρ（与从 |−⟩ 出发的白色 σ）沿横轴缩短，长度正是 cos θₑₙᵥ；画面停在 75°，箭头只剩 0.26。转到 90°，两条记录正交，箭头缩到球心。', 'At the bottom right are the two records |e₀⟩, |e₁⟩ of the environment; along the rail their angle θₑₙᵥ turns from 0° to 90°, and the cyan shadow is their overlap cos θₑₙᵥ. After the environment is traced out, the amber ρ that started at |+⟩ (and the white σ from |−⟩) shrinks along the horizontal axis to exactly cos θₑₙᵥ; the frame stops at 75°, where the arrow keeps 0.26. At 90° the records are orthogonal and the arrow has shrunk to the centre.'],
    pinch: ['一步完全去相干（捏合）：青色的球被压成竖直的一条线，紫色的竖轴整条不动。ρ 与 σ 高度相同、只差横向部分，落到轴上同一点，白线缩成零。', 'One step of complete dephasing (pinching): the cyan ball is squashed into a vertical line and the violet axis stays put along its whole length. ρ and σ have the same height and differ only sideways, so they land on the same point of the axis and the white line shrinks to nothing.'],
    dephase: ['每一步横向乘 0.7、高度不动：青色的球收腰成竖直的雪茄，再细成紫色的竖轴；ρ 与 σ 沿水平方向走向轴线。', 'Each step multiplies the sideways part by 0.7 and keeps the height: the cyan ball pinches into an upright cigar and thins towards the violet axis, while ρ and σ move horizontally towards it.'],
    amp: ['振幅阻尼：青色的球一边缩小一边往北极上漂，横向缩得比纵向慢；紫色的北极 |0⟩ 不动，从南极出发的 ρ 一路爬向北极。', 'Amplitude damping: the cyan ball shrinks while it drifts towards the north pole, more slowly across than up; the violet north pole |0⟩ stays put, and ρ climbs all the way from the south pole towards it.'],
    wide: ['横向保留得比 √a 多（T₂ = 6 T₁）：青色的像在北极附近从侧面鼓出球皮，品红的部分已经不在球里。这样的映射不把态送到态。', 'More is kept sideways than √a allows (T₂ = 6 T₁): near the north pole the cyan image bulges out through the skin, and the magenta part is no longer in the ball. Such a map does not send states to states.'],
    distance: ['振幅阻尼走一步（γ = ½）：北极的 ρ 不动，+x 上的 σ 被拉向北方；白线标出的距离 T 从虚线的 0.707 缩到 0.433。', 'One step of amplitude damping (γ = ½): ρ at the north pole stays, σ at +x is pulled north, and the distance T on the white line drops from the dashed 0.707 to 0.433.'],
    centre: ['强度 1 的去极化：整颗球缩成紫色的球心一点。北极的 ρ 与 +x 的 σ 落在同一处，距离为零。', 'Depolarizing at strength 1: the whole ball shrinks to the violet centre. ρ from the north pole and σ from +x land on the same spot, at distance zero.']
  };
  let booting = true;
  const WIDE_PITCH = 0.12;
  let camBefore = null;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.scene = p.scene || 'noise';
    S.ch = p.ch; S.p = p.p; S.ratio = p.ratio; S.rho0 = at(p.rho[0], p.rho[1]); S.sig0 = at(p.sig[0], p.sig[1]);
    chChips.set(p.ch, true); fP.set(p.p); fR.set(p.ratio);
    // T2 > 2T1 looks at the solid from lower down, so that the magenta piece shows sideways past the glass shell; the
    // camera the reader had is given back when the next card is picked
    const cam = stage.cam;
    if (id === 'wide') { if (!camBefore) camBefore = { yaw: cam.yaw, pitch: cam.pitch }; cam.pitch = WIDE_PITCH; }
    else if (camBefore) { Object.assign(cam, camBefore); camBefore = null; }
    setMax(p.max); clock.set(0);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换一种噪声、调强度，或在球皮上拖动 ρ 与 σ。随时可以再选一张卡。', 'Free play: switch the noise, change the strength, or drag ρ and σ on the skin. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.NOISE_DEBUG = {
    get state() {
      const s = read(clock.t);
      return { scene: S.scene, ch: S.ch, p: S.p, ratio: S.ratio, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current,
        rho0: S.rho0.slice(), sig0: S.sig0.slice(), rho: s.rho, sig: s.sig, lam: s.m.lam, a: s.m.a, h: s.m.h,
        T0: s.T0, T: s.T, len: s.len, mass0: s.mass0, mass: s.mass, escapes: s.escapes, farthest: s.far.r };
    },
    at: (N) => { const s = read(N); return { rho: s.rho, sig: s.sig, lam: s.m.lam, a: s.m.a, h: s.m.h, T: s.T, escapes: s.escapes, farthest: s.far.r }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** The image as the stage draws it now: 'wire', or 'solid' (a map that is not a channel), with its half-axes and
        centre and the pre-image height z0 above which it lies outside the ball (null: nowhere). */
    image: () => { const m = mapAt(clock.t); return { drawn: solidOn ? 'solid' : 'wire', lam: m.lam, a: m.a, h: m.h, z0: capOf(m) }; },
    /** Viewport coordinates of a world point (for pointer tests). */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; }
  };
  window.TRV_THUMB = () => { applyPreset('amp'); cards.mark('amp'); clock.pause(); clock.set(3); stage.cam.yaw = -0.5; stage.cam.pitch = 0.3; paint.now(); };
  cards.pick(cards.initial('amp'));
  booting = false;
  paint();
})();
