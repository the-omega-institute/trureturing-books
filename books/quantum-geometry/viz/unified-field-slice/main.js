/* ORTHO//UNIFIED: three pictures from the first half of Chapter 32, on one rail.
   Clock: the rapidity η carries (1, 0) to (cosh η, sinh η); the worldline crosses t = 1 at height tanh η, and moved
          across to the unit circle that height lands at θ = gd(η): sin θ = tanh η (the speed), cos θ = sech η = 1/γ
          (the proper-time rate). The arc length θ equals the shadow cos θ only at the cosine fixed point θ*.
   Loop:  rotors kept as unit quaternions [w, b] (U = w − (b₁e₂₃ + b₂e₃₁ + b₃e₁₂)); the rail applies R₂⁻¹, R₁⁻¹, R₂, R₁
          to a reference arrow, so one round is U = R₁R₂R₁⁻¹R₂⁻¹: 1 in one plane, a left-over turn in two planes.
   Horizon: a regular icosahedron in the unit sphere with a vertex (the observer) at the north pole; its angle
          deficits, and the edges cut by the horizon at polar angle λ.
   Read-only probe for the browser suite: window.UNIFIED_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, LN2 = Math.LN2, ETA_MAX = 4;

  /* ---------- clock: the Gudermannian ---------- */
  const gd = (eta) => Math.atan(Math.sinh(eta));
  const gdInv = (th) => Math.asinh(Math.tan(th));
  /** The only real root of cos θ = θ, by Newton's method. */
  const THETA_STAR = (() => { let x = 0.75; for (let i = 0; i < 40; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const ETA_STAR = gdInv(THETA_STAR);
  function clockAt(eta) {
    const theta = gd(eta), c = Math.cos(theta), s = Math.sin(theta), ch = Math.cosh(eta), sh = Math.sinh(eta);
    return { eta, theta, cos: c, sin: s, cosh: ch, sinh: sh, gamma: ch, sech: 1 / ch, tanh: Math.tanh(eta), circle: c * c + s * s, hyper: ch * ch - sh * sh };
  }

  /* ---------- loop: rotors as unit quaternions ---------- */
  const qOf = (n, a) => { const s = Math.sin(a / 2); return [Math.cos(a / 2), n[0] * s, n[1] * s, n[2] * s]; };
  const qMul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
  const qConj = (q) => [q[0], -q[1], -q[2], -q[3]];
  const qRot = (q, v) => { const r = qMul(qMul(q, [0, v[0], v[1], v[2]]), qConj(q)); return [r[1], r[2], r[3]]; };
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];
  const P0 = v3.unit([0.55, -0.62, 0.56]);
  const LEG_NAME = ['R₂⁻¹', 'R₁⁻¹', 'R₂', 'R₁'];
  /** The four turns in the order they act on the arrow: R₂⁻¹, R₁⁻¹, R₂, R₁. */
  function legs() {
    const e = S.eps * DEG, [a1, a2] = S.plane === 'two' ? [E1, E2] : [E3, E3];
    return [[a2, -e], [a1, -e], [a2, e], [a1, e]];
  }
  function loopAt(tau) {
    const lg = legs(), k = Math.max(0, Math.min(4, Math.floor(tau + 1e-9))), f = Math.min(1, Math.max(0, tau - k));
    let q = [1, 0, 0, 0];
    for (let i = 0; i < k; i++) q = qMul(qOf(lg[i][0], lg[i][1]), q);
    if (k < 4 && f > 1e-9) q = qMul(qOf(lg[k][0], lg[k][1] * f), q);
    return { q, r: qRot(q, P0), k, f };
  }
  /** The whole round U = R₁R₂R₁⁻¹R₂⁻¹ and what is left of it. */
  function loopU() {
    const U = loopAt(4).q, b = Math.hypot(U[1], U[2], U[3]);
    return { U, phi: 2 * Math.acos(Math.min(1, Math.abs(U[0]))), axis: b > 1e-12 ? [U[1] / b, U[2] / b, U[3] / b] : null, biv: [-U[1], -U[2], -U[3]] };
  }
  /** The left-over angle for a loop of size ε (degrees) in the current planes, for the strip. */
  function phiOf(epsDeg) {
    const e = epsDeg * DEG, [a1, a2] = S.plane === 'two' ? [E1, E2] : [E3, E3];
    const U = qMul(qOf(a1, e), qMul(qOf(a2, e), qMul(qOf(a1, -e), qOf(a2, -e))));
    return 2 * Math.acos(Math.min(1, Math.abs(U[0])));
  }

  /* ---------- horizon: the icosahedron ---------- */
  const ICO = (() => {
    const V = [[0, 0, 1]], z = 1 / Math.sqrt(5), r = 2 / Math.sqrt(5);
    for (let k = 0; k < 5; k++) V.push([r * Math.cos(72 * k * DEG), r * Math.sin(72 * k * DEG), z]);
    for (let k = 0; k < 5; k++) V.push([r * Math.cos((72 * k + 36) * DEG), r * Math.sin((72 * k + 36) * DEG), -z]);
    V.push([0, 0, -1]);
    const n = V.length, d = (i, j) => v3.len(v3.sub(V[i], V[j])), E = [], adj = V.map(() => new Set());
    let short = Infinity;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) short = Math.min(short, d(i, j));
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (d(i, j) < short * 1.01) { E.push([i, j]); adj[i].add(j); adj[j].add(i); }
    const F = [];
    for (const [i, j] of E) for (const k of adj[i]) if (k > j && adj[j].has(k)) F.push([i, j, k]);
    // the face angles at each vertex, and what is missing from 2π
    const angle = (v, a, b) => Math.acos(kit.clamp(v3.dot(v3.unit(v3.sub(a, v)), v3.unit(v3.sub(b, v))), -1, 1));
    const sums = V.map(() => 0);
    for (const f of F) for (let t = 0; t < 3; t++) { const v = f[t], a = f[(t + 1) % 3], b = f[(t + 2) % 3]; sums[v] += angle(V[v], V[a], V[b]); }
    const deficit = sums.map((s) => 2 * Math.PI - s);
    // the neighbours of each vertex in order around it, for the flattened fans
    const fans = V.map((v, i) => {
      const t1 = v3.unit(v3.cross(v, Math.abs(v[2]) < 0.9 ? E3 : E1)), t2 = v3.cross(v, t1);
      const nb = [...adj[i]].map((j) => { const w = v3.sub(V[j], v); return [j, Math.atan2(v3.dot(w, t2), v3.dot(w, t1))]; }).sort((a, b) => a[1] - b[1]);
      return { t1, t2, start: nb[0][1] };
    });
    return { V, E, F, deficit, fans, edge: short, polar: V.map((v) => Math.acos(kit.clamp(v[2], -1, 1))) };
  })();
  function horizonAt(lamDeg) {
    const lam = lamDeg * DEG, inA = ICO.polar.map((p) => p < lam - 1e-9);
    let inside = 0, cut = 0;
    const kind = ICO.E.map(([i, j]) => { if (inA[i] && inA[j]) { inside++; return 'in'; } if (inA[i] !== inA[j]) { cut++; return 'cut'; } return 'out'; });
    const nA = inA.filter(Boolean).length;
    return { lam: lamDeg, inA, nA, inside, cut, kind, bound: Math.pow(S.bond, cut) };
  }

  /* ---------- state and scenes ---------- */
  const S = { scene: 'clock', eta: LN2, theta: 0.3, tau: 0, lam: 0, eps: 60, plane: 'two', bond: 2 };
  const TH_MAX = 1.5;
  const SCENES = {
    clock: { max: ETA_MAX, rate: 0.7, step: 0.1, get: () => S.eta, set: (v) => { S.eta = v; } },
    fixed: { max: TH_MAX, rate: 0.3, step: 0.02, get: () => S.theta, set: (v) => { S.theta = v; } },
    loop: { max: 4, rate: 0.8, step: 1, get: () => S.tau, set: (v) => { S.tau = v; } },
    horizon: { max: 180, rate: 40, step: 15, get: () => S.lam, set: (v) => { S.lam = v; } }
  };
  const LEGEND = {
    clock: [['cy', '线 cos θ = 1/γ：固有时率', 'line cos θ = 1/γ: proper-time rate'], ['mg', '面积 sin θ = tanh η：速度 v/c', 'area sin θ = tanh η: speed v/c'], ['vi', '弧长 θ', 'arc length θ'], ['am', '当前的点', 'the current point']],
    loop: [['am', '箭头的尖端', 'tip of the arrow'], ['vi', '转轴', 'axis of a turn'], ['mg', '没合上的缺口', 'the gap left open']],
    // the fixed-point scene has only the unit circle: nothing on it is a speed
    fixed: [['vi', '弧长 θ（下方拉直）', 'arc length θ (straightened below)'], ['cy', '影子 cos θ', 'the shadow cos θ'], ['mg', '高 sin θ：在 θ* 处是局部压缩率', 'height sin θ: at θ* the local contraction rate'], ['am', '圆上当前的点', 'the current point on the circle']],
    // with no horizon pushed in (λ = 0) only the polytope and its angle deficits are on the stage
    polytope: [['mg', '每个顶点的角亏 60°', 'the 60° angle deficit at each vertex'], ['dm', '正二十面体的边', 'edges of the icosahedron']],
    horizon: [['cy', '视界以内的边', 'edges inside the horizon'], ['mg', '割断的边 · 角亏', 'cut edges · angle deficits'], ['am', '视界 λ', 'the horizon λ'], ['dm', '视界以外', 'beyond the horizon']]
  };

  /* ---------- the stage ---------- */
  let G = null;   // the 2D plot of the clock scene, for pointer picking
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.42 : 0.36, cy: TRV.figure ? 0.53 : 0.55,
    onChange: () => paint(),
    onPick: (ev) => { if (S.scene === 'clock') dragClock(ev); else if (S.scene === 'fixed') dragFixed(ev); else return false; return true; },
    onDrag: (ev) => (S.scene === 'fixed' ? dragFixed(ev) : dragClock(ev))
  });
  function dragClock(ev) {
    if (!G) return;
    const b = $('cv').getBoundingClientRect(), x = G.invX(ev.clientX - b.left), y = G.invY(ev.clientY - b.top);
    const th = kit.clamp(Math.atan2(y, x), 0, gd(ETA_MAX));
    clock.pause(); cards.mark(null); clock.set(kit.clamp(gdInv(th), 0, ETA_MAX));
  }

  function dragFixed(ev) {
    if (!G) return;
    const b = $('cv').getBoundingClientRect(), x = G.invX(ev.clientX - b.left), y = G.invY(ev.clientY - b.top);
    clock.pause(); cards.mark(null); clock.set(kit.clamp(Math.atan2(y, x), 0, TH_MAX));
  }

  /** The fixed point on its own: the unit circle, the arc θ, the shadow cos θ and the height sin θ. */
  function drawFixed() {
    const st = stage, cv = $('cv');
    st.begin();
    const w = cv.clientWidth, h = cv.clientHeight, thumb = TRV.thumbMode, lw = thumb ? 1.8 : 1;
    const g = G = kit.plot(cv, { x: [-0.22, 1.62], y: [-0.36, 1.14], equal: true, pad: [24, 24, h < 420 ? 62 : 74, 44] });
    const c = g.ctx, X = g.X, Y = g.Y, th = S.theta, co = Math.cos(th), si = Math.sin(th);
    c.save(); c.beginPath(); c.rect(g.pl, g.pt, g.iw, g.ih); c.clip();
    const seg = (a, b, color, s) => g.line([a, b], color, Object.assign({ width: 1.6 * lw }, s));
    seg([g.x0, 0], [g.x1, 0], P.faint, { width: 1 }); seg([0, -0.05], [0, g.y1], P.faint, { width: 1 });
    const circ = []; for (let i = 0; i <= 90; i++) { const a = Math.PI / 2 * i / 90; circ.push([Math.cos(a), Math.sin(a)]); }
    g.line(circ, P.dim, { width: 1.3 * lw });
    seg([0, 0], [co, si], P.ink, { width: 1.2 * lw, alpha: 0.6 });
    // where the arc and the shadow agree
    seg([THETA_STAR, -0.26], [THETA_STAR, 0.02], P.dim, { width: 1, dash: [3, 4] });
    const arc = []; for (let i = 0; i <= 60; i++) { const a = th * i / 60; arc.push([Math.cos(a), Math.sin(a)]); }
    g.line(arc, P.violet, { width: 3 * lw, alpha: 0.85 });
    seg([0, -0.14], [th, -0.14], P.violet, { width: 3 * lw, alpha: 0.85 });
    seg([co, 0], [co, si], P.magenta, { width: 3.2 * lw, glow: 6 });
    seg([0, 0], [co, 0], P.cyan, { width: 5 * lw, glow: 10 });
    g.dot(co, si, P.amber, 6 * lw, { glow: 14 });
    c.restore();
    if (!thumb) {
      const at = (x, y, dx, dy) => [X(x) + (dx || 0), Y(y) + (dy || 0)];
      const tag = (key, p, html, cls) => st.tag(key, p, html, cls, { screen: true });
      tag('fcos', at(co / 2, 0, 0, -13), `cos θ = ${fix(co, 3)}`, 'num c-cy');
      tag('farc', at(th / 2, -0.14, 0, 15), `${L('弧长', 'arc')} θ = ${fix(th, 3)}`, 'num c-vi');
      tag('fsin', at(co, si / 2, -52, 0), `sin θ = ${fix(si, 3)}`, 'num c-mg');
      tag('fstar', at(THETA_STAR, -0.24, 16, 0), 'θ*', 'num');
    }
    st.end();
  }

  function drawClock() {
    const st = stage, cv = $('cv');
    st.begin();
    const w = cv.clientWidth, h = cv.clientHeight, thumb = TRV.thumbMode, lw = thumb ? 1.8 : 1;
    const g = G = kit.plot(cv, { x: [-0.3, 2.35], y: [-0.36, 1.62], equal: true, pad: [24, 24, h < 420 ? 62 : 74, 44] });
    const c = g.ctx, k = clockAt(S.eta), X = g.X, Y = g.Y;
    c.save(); c.beginPath(); c.rect(g.pl, g.pt, g.iw, g.ih); c.clip();
    const seg = (a, b, color, s) => g.line([a, b], color, Object.assign({ width: 1.6 * lw }, s));
    // axes, light, the line t = 1
    seg([g.x0, 0], [g.x1, 0], P.faint, { width: 1 }); seg([0, g.y0], [0, g.y1], P.faint, { width: 1 });
    seg([0, 0], [3, 3], P.ink, { width: 1.4 * lw, alpha: 0.75 });
    seg([1, g.y0], [1, g.y1], P.faint, { width: 1, dash: [4, 4] });
    // the hyperbola t² − x² = 1 and the unit circle (first quadrant)
    const hyp = [], circ = [];
    for (let i = 0; i <= 80; i++) { const u = 2.2 * i / 80; hyp.push([Math.cosh(u), Math.sinh(u)]); }
    for (let i = 0; i <= 90; i++) { const a = Math.PI / 2 * i / 90; circ.push([Math.cos(a), Math.sin(a)]); }
    g.line(hyp, P.dim, { width: 1.3 * lw, alpha: 0.9 });
    g.line(circ, P.lineHot, { width: 1.3 * lw });
    // the worldline O → (cosh η, sinh η), its height at t = 1, carried across to the circle
    seg([0, 0], [8 * k.cosh, 8 * k.sinh], P.ink, { width: 1 * lw, alpha: 0.6 });
    seg([1, k.tanh], [k.cos, k.sin], P.magenta, { width: 1.2 * lw, dash: [4, 4], alpha: 0.8 });
    g.dot(1, k.tanh, P.dim, 3.5 * lw);
    g.dot(k.cosh, k.sinh, P.amber, 4 * lw);
    // the arc θ (violet), straightened below the axis; the cyan line cos θ and the magenta height sin θ
    const arc = []; for (let i = 0; i <= 60; i++) { const a = k.theta * i / 60; arc.push([Math.cos(a), Math.sin(a)]); }
    g.line(arc, P.violet, { width: 3 * lw, alpha: 0.85 });
    seg([0, -0.12], [k.theta, -0.12], P.violet, { width: 3 * lw, alpha: 0.85 });
    seg([k.cos, 0], [k.cos, k.sin], P.magenta, { width: 3.2 * lw, glow: 6 });
    seg([0, 0], [k.cos, 0], P.cyan, { width: 5 * lw, glow: 10 });
    // the horizon θ = 90°
    g.dot(0, 1, P.magenta, 6 * lw, { ring: true, width: 1.6 * lw });
    g.dot(k.cos, k.sin, P.amber, 6 * lw, { glow: 14 });
    c.restore();
    if (!thumb) {
      const at = (x, y, dx, dy) => [X(x) + (dx || 0), Y(y) + (dy || 0)];
      const tag = (key, p, html, cls) => st.tag(key, p, html, cls, { screen: true });
      const wide = w >= 560;
      tag('ax-t', at(g.x1, 0, -12, 13), 't', 'num');
      if (wide) tag('ax-x', at(0, g.y1, 12, 10), 'x', 'num');
      tag('light', at(1.47, 1.47, 36, 0), L('光 t = x', 'light t = x'), 'raw ink');
      tag('hyp', at(Math.cosh(1.05), Math.sinh(1.05), 44, 8), 't² − x² = 1', 'num');
      if (wide && k.cosh < g.x1 - 0.1 && k.sinh < g.y1 - 0.1) tag('H', at(k.cosh, k.sinh, 66, -4), '(cosh η, sinh η)', 'num c-am');
      if (wide) tag('tanh', at(1, k.tanh, 50, 14), `tanh η = ${fix(k.tanh, 3)}`, 'num c-mg');
      tag('cos', at(k.cos / 2, 0, 0, 13), `cos θ = ${fix(k.cos, 3)}`, 'num c-cy');
      tag('arc', at(k.theta / 2, -0.12, 0, wide ? 13 : 15), `${L('弧长', 'arc')} θ = ${fix(k.theta, 3)}`, 'num c-vi');
      tag('sin', at(k.cos, k.sin / 2, -46, 0), `sin θ = ${fix(k.sin, 3)}`, 'num c-mg');
      tag('ninety', at(0, 1, -26, -12), '90°', 'num c-mg');
    }
    st.end();
  }

  function drawLoop() {
    const st = stage, c = st.begin(), now = loopAt(S.tau), lg = legs(), R = loopU(), done = S.tau >= 4 - 1e-9;
    st.sphere(1, { lat: [0], lon: 2, alpha: 0.4 });
    [[E1, 'e₁'], [E2, 'e₂'], [E3, 'e₃']].forEach(([e, n], i) => { st.line(v3.scale(e, -1.2), v3.scale(e, 1.2), { color: P.faint, width: 1, alpha: 0.9, back: 0.5 }); st.tag('e' + i, v3.scale(e, 1.3), n, 'num'); });
    const path = (a, b) => { const pts = []; for (let i = 0, m = Math.max(2, Math.ceil((b - a) * 48)); i <= m; i++) pts.push(loopAt(a + (b - a) * i / m).r); return pts; };
    if (S.tau < 4) st.path(path(S.tau, 4), { color: P.amber, width: 1.2, alpha: 0.45, dash: [3, 5], back: 0.35 });
    if (S.tau > 0) st.path(path(0, S.tau), { color: P.amber, width: 2.2, alpha: 0.9, back: 0.35 });
    // the turn in progress: its axis and the circle the tip rides on
    if (!done) {
      const [n] = lg[now.k], d = v3.dot(n, now.r);
      st.line(v3.scale(n, -1.12), v3.scale(n, 1.12), { color: P.violet, width: 1.6, dash: [6, 4], back: 0.45 });
      st.circle(v3.scale(n, d), n, Math.sqrt(Math.max(0, 1 - d * d)), { color: P.violet, width: 1, alpha: 0.5, back: 0.3 });
    }
    // the left-over turn and the gap
    if (done && R.phi > 1e-6 && R.axis) {
      st.line(v3.scale(R.axis, -1.12), v3.scale(R.axis, 1.12), { color: P.violet, width: 2.2, back: 0.45 });
      st.tag('Uax', v3.scale(R.axis, 1.22), L(`U 的转轴 · ${fix(R.phi / DEG, 1)}°`, `axis of U · ${fix(R.phi / DEG, 1)}°`), 'raw c-vi');
    }
    const gap = Math.acos(kit.clamp(v3.dot(P0, now.r), -1, 1));
    if (done && gap > 1e-4) {
      c.save(); c.shadowColor = P.magenta; c.shadowBlur = 10;
      st.arc(P0, now.r, { color: P.magenta, width: 3.4, back: 0.5 }, 1);
      c.restore();
      st.tag('gap', v3.scale(v3.unit(v3.add(P0, now.r)), 1.12), L(`缺口 ${fix(gap / DEG, 1)}°`, `gap ${fix(gap / DEG, 1)}°`), 'raw c-mg', { dx: 62, dy: -16 });
    }
    st.dot(P0, 5, P.ink, { ring: true });
    st.tag('p0', P0, L('起点', 'start'), 'raw ink', { dx: -30, dy: 14 });
    st.arrow([0, 0, 0], now.r, { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false });
    st.dot(now.r, 5.5, P.amber, { glow: 14, fade: false });
    st.end();
  }

  function drawHorizon() {
    const st = stage, c = st.begin(), H = horizonAt(S.lam), V = ICO.V, cap = S.lam > 1e-9 && S.lam < 180 - 1e-9;
    st.sphere(1, { lat: [0], lon: 0, alpha: 0.25, shade: 0.06 });
    // the edges, beyond / inside / cut
    ICO.E.forEach(([i, j], e) => { if (H.kind[e] === 'out') st.line(V[i], V[j], { color: P.dim, width: 1, alpha: 0.7, back: 0.45 }); });
    ICO.E.forEach(([i, j], e) => { if (H.kind[e] === 'in') st.line(V[i], V[j], { color: P.cyan, width: 2.2, back: 0.4 }); });
    c.save(); c.shadowColor = P.magenta; c.shadowBlur = 8;
    ICO.E.forEach(([i, j], e) => { if (H.kind[e] === 'cut') st.line(V[i], V[j], { color: P.magenta, width: 3, back: 0.45 }); });
    c.restore();
    // the angle deficit at every vertex: five 60° corners laid flat, and the 60° that is missing
    const fanAlpha = S.lam > 1e-9 ? 0.35 : 1, rr = 0.15;
    const order = V.map((v, i) => [i, st.p(v)[2]]).sort((a, b) => a[1] - b[1]);
    for (const [i, depth] of order) {
      const v = V[i], f = ICO.fans[i], fa = fanAlpha * (depth < 0 ? 0.3 : 1);
      const pt = (a) => v3.add(v3.scale(v, 1.005), v3.add(v3.scale(f.t1, rr * Math.cos(a)), v3.scale(f.t2, rr * Math.sin(a))));
      const sector = (a0, a1) => { const pts = [v3.scale(v, 1.005)]; for (let s = 0; s <= 12; s++) pts.push(pt(a0 + (a1 - a0) * s / 12)); return pts; };
      for (let s = 0; s < 5; s++) st.poly(sector(f.start + s * Math.PI / 3, f.start + (s + 1) * Math.PI / 3), { fill: P.ink, alpha: 0.12 * fa, color: P.dim, strokeAlpha: 0.5 * fa, width: 0.8 });
      st.poly(sector(f.start + 5 * Math.PI / 3, f.start + 2 * Math.PI), { fill: P.magenta, alpha: 0.6 * fa, color: P.magenta, strokeAlpha: 0.9 * fa, width: 1 });
    }
    V.forEach((v, i) => st.dot(v, H.inA[i] ? 4.5 : 3.2, H.inA[i] ? P.cyan : P.dim));
    // the horizon at polar angle λ and the observer at the pole
    if (cap) st.circle([0, 0, Math.cos(S.lam * DEG)], E3, Math.sin(S.lam * DEG), { color: P.amber, width: 2, dash: [6, 4], back: 0.35, n: 96 });
    st.dot(V[0], 8, P.ink, { ring: true, width: 1.6, fade: false });
    st.tag('obs', V[0], L('观察者', 'observer'), 'raw ink', { dy: -22 });
    if (S.lam < 1e-9) st.tag('def', V[0], L('缺 60°', '60° missing'), 'raw c-mg', { dx: 58, dy: 4 });
    if (cap) {
      // put the count on the side of the horizon that faces the viewer
      const D = st.facing(), a = Math.atan2(D[1], D[0]), s = Math.sin(S.lam * DEG), z = Math.cos(S.lam * DEG);
      st.tag('cut', [s * Math.cos(a), s * Math.sin(a), z], `|∂A| = ${H.cut}`, 'num c-am', { dy: 18 });
    }
    st.end();
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    const cv = $('plot');
    if (S.scene === 'clock') {
      const g = kit.plot(cv, { x: [0, ETA_MAX], y: [0, 1.05], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 1, 2, 3, 4], xGrid: true });
      const a = [], b = [], t = [];
      for (let i = 0; i <= 160; i++) { const e = ETA_MAX * i / 160; a.push([e, 1 / Math.cosh(e)]); b.push([e, Math.tanh(e)]); t.push([e, gd(e) / (Math.PI / 2)]); }
      g.line(a, P.cyan, { width: 1.8 }); g.line(b, P.magenta, { width: 1.8 }); g.line(t, P.violet, { width: 1.4, dash: [5, 3] });
      const k = clockAt(S.eta);
      g.vline(S.eta, P.amber); g.dot(S.eta, k.cos, P.cyan, 4); g.dot(S.eta, k.sin, P.magenta, 4);
      g.legend([[P.cyan, 'cos θ = sech η'], [P.magenta, 'sin θ = tanh η'], [P.violet, L('θ / 90°', 'θ / 90°'), 'dash']], { bottom: true, dy: -10 });
      $('plotTitle').innerHTML = L('<span>推得越快：时钟越慢，速度越贴近光</span>', '<span>The harder the push, the slower the clock and the closer to light</span>');
      $('plotMeta').textContent = `η = ${fix(S.eta, 3)} · θ = ${fix(k.theta / DEG, 2)}°`;
    } else if (S.scene === 'fixed') {
      const g = kit.plot(cv, { x: [0, TH_MAX], y: [0, 1.5], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1, 1.5], xTicks: [0, 0.5, 1, 1.5], xGrid: true });
      const a = [], b = [];
      for (let i = 0; i <= 150; i++) { const x = TH_MAX * i / 150; a.push([x, x]); b.push([x, Math.cos(x)]); }
      g.line(a, P.violet, { width: 1.8 }); g.line(b, P.cyan, { width: 1.8 });
      g.vline(S.theta, P.amber); g.dot(THETA_STAR, THETA_STAR, P.ink, 4);
      g.legend([[P.violet, L('弧长 θ', 'arc θ')], [P.cyan, L('影子 cos θ', 'shadow cos θ')]], { right: true, bottom: true });
      $('plotTitle').innerHTML = L('<span>弧长与影子只相交一次</span>', '<span>The arc and the shadow cross only once</span>');
      $('plotMeta').textContent = `θ = ${fix(S.theta, 3)} · θ* = ${fix(THETA_STAR, 4)}`;
    } else if (S.scene === 'loop') {
      const g = kit.plot(cv, { x: [0, 90], y: [0, 130], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [0, 60, 120], xTicks: [0, 30, 60, 90], xGrid: true, yFmt: (v) => `${v}°`, xFmt: (v) => `${v}°` });
      const cur = [], ref = [];
      for (let i = 0; i <= 90; i++) { cur.push([i, phiOf(i) / DEG]); ref.push([i, (i * DEG) ** 2 / DEG]); }
      g.line(ref, P.dim, { width: 1.3, dash: [5, 3] });
      g.line(cur, S.plane === 'two' ? P.magenta : P.cyan, { width: 2 });
      g.vline(S.eps, P.amber); g.dot(S.eps, phiOf(S.eps) / DEG, P.amber, 4.5);
      g.legend([[S.plane === 'two' ? P.magenta : P.cyan, L('余下的转角 φ', 'left-over angle φ')], [P.dim, L('ε²（弧度）', 'ε² (radians)'), 'dash']], { right: false });
      $('plotTitle').innerHTML = L('<span>回路越大，余下的转角越大</span>', '<span>The bigger the loop, the bigger the turn left over</span>');
      $('plotMeta').textContent = `ε = ${S.eps}° · φ = ${fix(phiOf(S.eps) / DEG, 2)}°`;
    } else {
      const g = kit.plot(cv, { x: [0, 180], y: [0, 13], pad: [30, 10, 8, 22] });
      g.axes({ yTicks: [0, 5, 10], xTicks: [0, 45, 90, 135, 180], xGrid: true, xFmt: (v) => `${v}°` });
      const cut = [], nA = [];
      for (let i = 0; i <= 720; i++) { const l = 180 * i / 720, H = horizonAt(l); cut.push([l, H.cut]); nA.push([l, H.nA]); }
      g.line(nA, P.cyan, { width: 1.6 }); g.line(cut, P.magenta, { width: 2.2 });
      const H = horizonAt(S.lam);
      g.vline(S.lam, P.amber); g.dot(S.lam, H.cut, P.amber, 4.5);
      g.legend([[P.magenta, L('割断的边 |∂A|', 'cut edges |∂A|')], [P.cyan, L('视界以内的顶点', 'vertices inside')]], { right: true, bottom: true });
      $('plotTitle').innerHTML = L('<span>视界往下推：割边先变多，再变少</span>', '<span>Pushing the horizon down: the cut grows, then shrinks</span>');
      $('plotMeta').textContent = `λ = ${fix(S.lam, 1)}° · |∂A| = ${H.cut}`;
    }
  }

  /* ---------- readouts, hud ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  function drawText() {
    const sc = S.scene;
    let big, sub, key, keyName, rows, note, aside, pill, leg = sc;
    if (sc === 'clock') {
      const k = clockAt(S.eta), c2 = k.cos * k.cos, s2 = k.sin * k.sin;
      const fp = Math.abs(k.theta - THETA_STAR) < 5e-4;
      big = fp ? L(`不动点 · θ* = ${fix(k.theta, 3)}`, `Fixed point · θ* = ${fix(k.theta, 3)}`) : L(`时钟 · η = ${fix(S.eta, 3)}`, `Clock · η = ${fix(S.eta, 3)}`);
      sub = fp ? `<span class="c-vi">${L('弧长', 'arc')} θ* = ${fix(k.theta, 3)}</span> · <span class="c-cy">cos θ* = ${fix(k.cos, 3)}</span> · <span class="c-mg">sin θ* = ${fix(k.sin, 3)}</span>`
        : `θ = gd(η) = ${fix(k.theta / DEG, 2)}° · <span class="c-cy">cos θ = ${fix(k.cos, 3)}</span> · <span class="c-mg">sin θ = ${fix(k.sin, 3)}</span>`;
      if (fp) leg = 'fixed';
      keyName = L('线² + 面积²', 'line² + area²');
      key = `<span class="c-cy">${fix(c2, 3)}</span> + <span class="c-mg">${fix(s2, 3)}</span> = ${fix(c2 + s2, 3)} ✓`;
      rows = row('', '快度 η · 角 θ = gd(η)', 'rapidity η · angle θ = gd(η)', `${fix(S.eta, 4)} · ${fix(k.theta / DEG, 2)}°`)
        + row('c', '固有时率 dτ/dt = cos θ = sech η', 'proper-time rate dτ/dt = cos θ = sech η', `${fix(k.cos, 4)} = ${fix(k.sech, 4)}`)
        + row('m', '速度 v/c = sin θ = tanh η', 'speed v/c = sin θ = tanh η', `${fix(k.sin, 4)} = ${fix(k.tanh, 4)}`)
        + row('', 'γ = cosh η · cosh² − sinh²', 'γ = cosh η · cosh² − sinh²', `${fix(k.cosh, 4)} · ${fix(k.hyper, 4)}`)
        + row('', '弧长 θ − 影子 cos θ', 'arc θ − shadow cos θ', sgn(k.theta - k.cos, 4));
      note = Math.abs(k.theta - THETA_STAR) < 5e-4 ? L(`θ = θ* ≈ ${fix(THETA_STAR, 6)}：紫色的弧长与青色的影子一样长，cos θ = θ。品红的高 sin θ* = ${fix(Math.sin(THETA_STAR), 4)} 是反复取余弦时误差每步缩小的倍数。`, `θ = θ* ≈ ${fix(THETA_STAR, 6)}: the violet arc and the cyan shadow are equally long, cos θ = θ. The magenta height sin θ* = ${fix(Math.sin(THETA_STAR), 4)} is the factor by which the error shrinks at each step of taking cosines again and again.`)
        : S.eta > 2.5 ? L(`时钟只剩 ${fix(100 * k.cos, 1)}% 的速率，速度已是光速的 ${fix(100 * k.sin, 2)}%；η 再大，θ 也只是贴向 90°，到不了。`, `The clock runs at ${fix(100 * k.cos, 1)}% of its rate and the speed is ${fix(100 * k.sin, 2)}% of light; however large η grows, θ only creeps towards 90° and never reaches it.`)
          : L(`同一个角 θ：青色的线是时钟走得多快，品红的高是跑得多快，两者的平方加起来总是 1。`, 'One angle θ: the cyan line is how fast the clock runs, the magenta height how fast the body moves, and their squares always add up to 1.');
      aside = 'sin θ = tanh η';
      pill = fp ? ['sin θ*', fix(k.sin, 3)] : ['v/c', fix(k.sin, 3)];
    } else if (sc === 'fixed') {
      const th = S.theta, co = Math.cos(th), si = Math.sin(th), at = Math.abs(th - THETA_STAR) < 5e-4;
      big = at ? L(`不动点 · θ* = ${fix(th, 3)}`, `Fixed point · θ* = ${fix(th, 3)}`) : L(`不动点 · θ = ${fix(th, 3)}`, `Fixed point · θ = ${fix(th, 3)}`);
      sub = `<span class="c-vi">${L('弧长', 'arc')} θ = ${fix(th, 3)}</span> · <span class="c-cy">cos θ = ${fix(co, 3)}</span> · <span class="c-mg">sin θ = ${fix(si, 3)}</span>`;
      keyName = L('影子 − 弧长 cos θ − θ', 'shadow − arc cos θ − θ');
      key = sgn(co - th, 4);
      rows = row('', '角 θ（弧度 · 度）', 'angle θ (radians · degrees)', `${fix(th, 4)} · ${fix(th / DEG, 2)}°`)
        + row('c', '影子 cos θ', 'shadow cos θ', fix(co, 4))
        + row('m', '高 sin θ', 'height sin θ', fix(si, 4))
        + row('', 'cos θ = θ 的根 θ*', 'root θ* of cos θ = θ', fix(THETA_STAR, 6));
      note = at ? L(`θ = θ* ≈ ${fix(THETA_STAR, 6)}：紫色的弧长与青色的影子一样长，cos θ = θ。品红的高 sin θ* = ${fix(Math.sin(THETA_STAR), 4)} 是反复取余弦时误差每步缩小的倍数。`, `θ = θ* ≈ ${fix(THETA_STAR, 6)}: the violet arc and the cyan shadow have the same length, cos θ = θ. The magenta height sin θ* = ${fix(Math.sin(THETA_STAR), 4)} is the factor by which repeated cosines shrink the error at each step.`)
        : th < THETA_STAR ? L('影子比弧长长：cos θ − θ > 0。把点往上推，弧长变长、影子变短。', 'The shadow is longer than the arc: cos θ − θ > 0. Push the point up: the arc grows and the shadow shrinks.')
          : L('弧长已经比影子长：cos θ − θ < 0。两者只在 θ* 处相等一次。', 'The arc is now longer than the shadow: cos θ − θ < 0. The two agree only once, at θ*.');
      aside = 'cos θ = θ';
      pill = ['θ', fix(th, 3)];
    } else if (sc === 'loop') {
      const now = loopAt(S.tau), R = loopU(), done = S.tau >= 4 - 1e-9, b = R.biv;
      const leg = Math.min(3, now.k);
      big = L(`回路 · ε = ${S.eps}° · ${done ? '走完一圈' : `第 ${leg + 1} / 4 步 ${LEG_NAME[leg]}`}`, `Loop · ε = ${S.eps}° · ${done ? 'one round done' : `step ${leg + 1} of 4, ${LEG_NAME[leg]}`}`);
      const term = (x, n) => `${fix(x, 3)[0] === '−' ? '−' : '+'} ${fix(Math.abs(x), 3)}${n}`;
      const Utxt = R.phi < 1e-9 ? `U = ${fix(R.U[0], 3)}` : `U = ${fix(R.U[0], 3)} ${term(b[0], 'e₂₃')} ${term(b[1], 'e₃₁')} ${term(b[2], 'e₁₂')}`;
      sub = done ? `${Utxt} · <span class="c-mg">${L('余下转角', 'left over')} φ = ${fix(R.phi / DEG, 1)}°</span>` : L(`${S.plane === 'two' ? '两个平面' : '同一个平面'}：依次 R₂⁻¹、R₁⁻¹、R₂、R₁`, `${S.plane === 'two' ? 'Two planes' : 'One plane'}: R₂⁻¹, R₁⁻¹, R₂, R₁ in turn`);
      keyName = L('一圈后余下的转角 φ', 'turn left after one round φ');
      key = `${fix(R.phi / DEG, 2)}° <small>· ${R.phi < 1e-9 ? 'U = 1' : 'U ≠ 1'}</small>`;
      const gap = Math.acos(kit.clamp(v3.dot(P0, now.r), -1, 1));
      rows = row('', '每一步的转角 ε · ε²（按弧度换成度）', 'turn per step ε · ε² (radians, in degrees)', `${S.eps}° · ${fix((S.eps * DEG) ** 2 / DEG, 1)}°`)
        + row('', 'U 的标量部 w', 'scalar part w of U', fix(R.U[0], 4))
        + row('m', 'U 的二向量部 (e₂₃, e₃₁, e₁₂)', 'bivector part of U (e₂₃, e₃₁, e₁₂)', `(${sgn(b[0], 3)}, ${sgn(b[1], 3)}, ${sgn(b[2], 3)})`)
        + row('am', '箭头离起点', 'arrow from its start', `${fix(gap / DEG, 2)}°`)
        + row('', '时间轴', 'rail', `${fix(S.tau, 2)} / 4`);
      note = S.plane === 'one' ? L('两个转动在同一个平面里，先后次序可以交换：四步互相抵消，U = 1。', 'Both turns lie in one plane, so their order can be swapped: the four steps cancel and U = 1.')
        : done ? L(`四步走完没有回到起点：剩下一个 ${fix(R.phi / DEG, 1)}° 的转动，它的二向量主要落在 e₁e₂ 平面。ε 越小，余下的转角越接近 ε²。`, `After four steps the arrow is not home: a ${fix(R.phi / DEG, 1)}° turn is left over, with its bivector mostly in the e₁e₂ plane. The smaller ε, the closer the left-over angle is to ε².`)
          : L('先倒着绕 e₂、再倒着绕 e₁，然后正着绕 e₂、正着绕 e₁：每一步都被后面的一步“撤销”，看最后能不能回家。', 'Back about e₂, back about e₁, then forward about e₂ and forward about e₁: every step is later “undone”; watch whether the arrow gets home.');
      aside = 'U = R₁R₂R₁⁻¹R₂⁻¹';
      pill = ['φ', `${fix(R.phi / DEG, 1)}°`];
    } else {
      const H = horizonAt(S.lam), dsum = ICO.deficit.reduce((a, b) => a + b, 0);
      const flat = S.lam < 1e-9;
      big = flat ? L('多面体 · 12 个顶点各缺 60°', 'Polytope · 12 vertices, 60° missing at each')
        : L(`视界 · λ = ${fix(S.lam, 1)}° · 割断 ${H.cut} 条边`, `Horizon · λ = ${fix(S.lam, 1)}° · ${H.cut} edge${H.cut === 1 ? '' : 's'} cut`);
      if (flat) leg = 'polytope';
      sub = S.lam < 1e-9 ? L(`角亏 12 × 60° = ${fix(dsum / DEG, 1)}° = 4π`, `angle deficit 12 × 60° = ${fix(dsum / DEG, 1)}° = 4π`)
        : L(`D = ${S.bond}：跨视界施密特秩 ≤ ${S.bond}<sup>${H.cut}</sup> = ${H.bound.toLocaleString('en-US')}`, `D = ${S.bond}: Schmidt rank across the horizon ≤ ${S.bond}<sup>${H.cut}</sup> = ${H.bound.toLocaleString('en-US')}`);
      keyName = L('割断的边 |∂A|', 'cut edges |∂A|');
      key = `${H.cut} <small>· ≤ ${S.bond}<sup>${H.cut}</sup></small>`;
      rows = row('am', '视界的极角 λ', 'polar angle of the horizon λ', `${fix(S.lam, 1)}°`)
        + row('c', '视界以内的顶点 · 边', 'vertices · edges inside', `${H.nA} · ${H.inside}`)
        + row('m', `秩的上界 D<sup>|∂A|</sup>（D = ${S.bond}）`, `rank bound D<sup>|∂A|</sup> (D = ${S.bond})`, H.bound.toLocaleString('en-US'))
        + row('m', '每个顶点的角亏 · 总和', 'deficit at each vertex · total', `${fix(ICO.deficit[0] / DEG, 2)}° · ${fix(dsum / DEG, 2)}°`)
        + row('', '顶点 · 边 · 面', 'vertices · edges · faces', `${ICO.V.length} · ${ICO.E.length} · ${ICO.F.length}`);
      note = S.lam < 1e-9 ? L('每个顶点挤着 5 个 60° 的角，摊平后缺一个 60°：12 个顶点一共缺 720°，正是一整个球面的 4π。', 'Each vertex holds five 60° corners and, laid flat, misses one 60°: the 12 vertices miss 720° in all, exactly the 4π of a whole sphere.')
        : L(`视界以内 ${H.nA} 个顶点。只有被割断的 ${H.cut} 条边连着两边：无论网络里装着什么，跨视界的纠缠只能从这几条边上过。`, `${H.nA} vertices lie inside the horizon. Only the ${H.cut} cut edges join the two sides: whatever the network holds, entanglement across the horizon can only pass along these edges.`);
      aside = '|∂A|';
      pill = flat ? [L('角亏', 'deficit'), `${fix(dsum / DEG, 0)}°`] : ['|∂A|', String(H.cut)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { clock: L('时钟', 'CLOCK'), fixed: L('不动点', 'FIXED'), loop: L('回路', 'LOOP'), horizon: L('视界', 'HORIZON') }[sc];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[leg].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  function drawStage() { if (S.scene === 'clock') drawClock(); else if (S.scene === 'fixed') drawFixed(); else if (S.scene === 'loop') drawLoop(); else drawHorizon(); }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  let stopAt = null, wasPlaying = false;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: ETA_MAX, rate: 0.7, step: 0.1, t: S.eta,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => S.scene === 'clock' ? `η = ${fix(t, 3)} <small>/ ${fix(max, 0)}</small>`
      : S.scene === 'fixed' ? `θ = ${fix(t, 3)} <small>/ ${fix(max, 1)}</small>`
      : S.scene === 'loop' ? `${L('步', 'step')} ${fix(t, 2)} <small>/ 4</small>` : `λ = ${fix(t, 1)}° <small>/ 180°</small>`,
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      SCENES[S.scene].set(t);
      if (!c.playing && wasPlaying && S.scene === 'loop' && t >= 4 - 1e-9) finished();
      wasPlaying = c.playing;
      paint();
    }
  });
  function finished() {
    const R = loopU();
    TRV.toast($('toast'), R.phi < 1e-9 ? L('回到起点：<b>U = 1</b>', 'Home again: <b>U = 1</b>') : L(`没合上：剩下 <b>${fix(R.phi / DEG, 1)}°</b> 的转动`, `Not closed: a <b>${fix(R.phi / DEG, 1)}°</b> turn is left over`));
  }
  function setScene(sc) {
    // pause first: the pause reports the old rail value, which still belongs to the old scene
    stopAt = null; clock.pause();
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    const cf = SCENES[sc];
    clock.rate = cf.rate; clock.step = cf.step; clock.setMax(cf.max, true); clock.set(cf.get());
  }

  /* ---------- controls ---------- */
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const fEps = kit.field($('eps'), { fmt: (v) => `${v}°`, onInput: (v) => { leave(); S.eps = v; paint(); } });
  const planeChips = kit.chips($('planeChips'), 'plane', (v) => { leave(); S.plane = v; paint(); });
  const bondChips = kit.chips($('bondChips'), 'bond', (v) => { leave(); S.bond = +v; paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('clock'); }, 2: () => { leave(); setScene('loop'); }, 3: () => { leave(); setScene('horizon'); }, 4: () => { leave(); setScene('fixed'); } });

  /* ---------- experiment cards: scene, where the rail starts and stops, the still, and what else the card sets ---------- */
  const PRESETS = {
    polytope: { scene: 'horizon', from: 0, still: 0 },
    fixedpoint: { scene: 'fixed', from: 0, to: THETA_STAR, still: THETA_STAR },
    photon: { scene: 'clock', from: LN2, to: ETA_MAX, still: ETA_MAX },
    plaquette: { scene: 'loop', plane: 'two', eps: 60, from: 0, to: 4, still: 4 },
    horizon: { scene: 'horizon', bond: 2, from: 0, to: 90, still: 90 }
  };
  const NOTES = {
    polytope: ['球面上内接一个正二十面体，北极的顶点是观察者。每个顶点挤着 5 个等边三角形，角加起来只有 300°：品红的小扇形就是摊平后缺的那 60°。12 个顶点一共缺 720° = 4π。', 'A regular icosahedron sits in the sphere, with the observer at the vertex on the north pole. Five equilateral triangles meet at each vertex and their angles add to only 300°: the small magenta wedge is the 60° that is missing once they are laid flat. The 12 vertices miss 720° = 4π in all.'],
    fixedpoint: ['圆上的点停在 θ* ≈ 0.739：紫色的弧长 θ 与青色的影子 cos θ 一样长，这是 cos θ = θ 唯一的实根。品红的高 sin θ* ≈ 0.674，是反复取余弦时误差每步缩小的倍数。', 'The point on the circle stops at θ* ≈ 0.739: the violet arc length θ is as long as the cyan shadow cos θ, the only real root of cos θ = θ. The magenta height sin θ* ≈ 0.674 is the factor by which the error shrinks at each step of taking cosines again and again.'],
    photon: ['η 从 ln 2 一直推到 4：世界线贴向白色的光线，圆上的点贴向 θ = 90°。青色的线缩到 0.04，时钟几乎停摆；品红的高逼近 1，却碰不到：η 有限时 θ 总小于 90°。出发的 η = ln 2 处，青色的线是 0.8 = 1/γ，品红的高是 0.6，0.8² + 0.6² = 1。', 'Push η from ln 2 all the way to 4: the worldline hugs the white light line and the point on the circle creeps up to θ = 90°. The cyan line shrinks to 0.04 and the clock all but stops; the magenta height nears 1 without touching it: for finite η, θ stays below 90°. At the start, η = ln 2, the cyan line is 0.8 = 1/γ and the magenta height 0.6, with 0.8² + 0.6² = 1.'],
    plaquette: ['换成两个平面：R₁ 绕 e₁、R₂ 绕 e₂，各转 60°，依次施加 R₂⁻¹、R₁⁻¹、R₂、R₁。四步走完箭头没回到起点：品红的弧是缺口，紫色的线是余下那个转动的轴。U = 0.875 − (0.217e₂₃ − 0.217e₃₁ + 0.375e₁₂)，余下转角 57.9°。把两根转轴都换成同一根（同一个平面），四步互相抵消，U = 1。', 'Now two planes: R₁ about e₁ and R₂ about e₂, 60° each, applied as R₂⁻¹, R₁⁻¹, R₂, R₁. After four steps the arrow is not home: the magenta arc is the gap and the violet line is the axis of the turn left over. U = 0.875 − (0.217e₂₃ − 0.217e₃₁ + 0.375e₁₂), a left-over turn of 57.9°. Put both turns about one axis (one plane) and the four steps cancel: U = 1.'],
    horizon: ['视界从北极往下推到 λ = 90°：以内是北极和第一圈 5 个顶点，青色的边留在里面，品红的 10 条边被割断。每条边携带 D 维指标时，跨视界的施密特秩至多 D¹⁰。', 'The horizon is pushed down from the north pole to λ = 90°: inside it are the pole and the first ring of 5 vertices, the cyan edges stay inside and the 10 magenta edges are cut. If every edge carries a D-dimensional index, the Schmidt rank across the horizon is at most D¹⁰.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    stopAt = null; clock.pause();
    if (p.plane) { S.plane = p.plane; planeChips.set(p.plane, true); }
    if (p.eps != null) { S.eps = p.eps; fEps.set(p.eps); }
    if (p.bond != null) { S.bond = p.bond; bondChips.set(String(p.bond), true); }
    SCENES[p.scene].set(p.still);
    setScene(p.scene);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed) || p.to == null) return;
    clock.set(p.from);
    stopAt = p.to < clock.max - 1e-9 ? p.to : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，用时间轴推快度、走回路或推视界；在“时钟”里拖动圆上的点，在“回路”里改转角与平面。随时可以再选一张卡。', 'Free play: switch scenes, and use the rail to push the rapidity, walk the loop or push the horizon; drag the point on the circle in Clock, and change the angle and the planes in Loop. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.UNIFIED_DEBUG = {
    get state() {
      const k = clockAt(S.eta), now = loopAt(S.tau), R = loopU(), H = horizonAt(S.lam);
      return {
        scene: S.scene, t: clock.t, max: clock.max, playing: clock.playing, preset: cards.current, eps: S.eps, plane: S.plane, bond: S.bond,
        fixed: { theta: S.theta, cos: Math.cos(S.theta), sin: Math.sin(S.theta), thetaStar: THETA_STAR },
        clock: { eta: S.eta, theta: k.theta, cos: k.cos, sin: k.sin, cosh: k.cosh, sinh: k.sinh, sech: k.sech, tanh: k.tanh, gamma: k.gamma, thetaStar: THETA_STAR, etaStar: ETA_STAR },
        loop: { tau: S.tau, p0: P0.slice(), r: now.r, q: now.q, U: R.U, phi: R.phi, axis: R.axis, legs: legs().map(([n, a]) => [n.slice(), a]) },
        horizon: { lam: S.lam, cut: H.cut, nA: H.nA, inside: H.inside, bound: H.bound, inA: H.inA.slice(), V: ICO.V.map((v) => v.slice()), E: ICO.E.map((e) => e.slice()), F: ICO.F.length, deficit: ICO.deficit.slice() },
        hud: $('hudBig').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the data point (x, y) on the clock stage, for pointer tests. */
    point: (x, y) => { const b = $('cv').getBoundingClientRect(); return G ? [b.left + G.X(x), b.top + G.Y(y)] : null; },
    camera: () => Object.assign({}, stage.cam)
  };
  window.TRV_THUMB = () => { applyPreset('plaquette'); cards.mark('plaquette'); clock.pause(); clock.set(4); stage.cam.yaw = -0.5; stage.cam.pitch = 0.32; paint.now(); };
  cards.pick(cards.initial('photon'));
  booting = false;
  paint();
})();
