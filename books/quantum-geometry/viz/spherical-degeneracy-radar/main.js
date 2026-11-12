/* ORTHO//DEGENERACY · 球面简并雷达 · Spherical degeneracy radar
   The stage is the unit sphere. An observer probe O (amber) reads a state s as O·s, drawn as the cyan shadow of s on the
   observer's axis. Four scenes share the sphere and one rail:
     address  v₁ = cos θ e₃ + sin θ e₁ (turned once), v₂ = v₁ twisted by the azimuth φ in e₁∧e₂ (turned twice);
              the rail is φ; the dashed cyan great circle holds the observers with O·v₁ = O·v₂;
     rotor    R₁ = (1 − e₁e₃)/√2 and R₂ = ((1 − e₂e₃)/√2)((1 − e₁e₂)/√2) carry +e₁ to +e₃ by one hop or two, each
              with the image of e₂ as a flag; the rail is the hop; the dial is the difference rotor D = R₂R̃₁;
     test     the equator test state s(α) = cos α e₁ + sin α e₂ and its two images s₁ = R₁ s R̃₁, s₂ = R₂ s R̃₂; rail α;
     frames   the same with the initial equatorial frame turned by γ; rail γ; the blind circle turns with it.
     pull     the address pair (θ, φ = 90°) turned about an axis k by ψ and read by O, against the pair left alone
              and read by the pulled-back observer R̃OR: the two readings agree for every ψ (rail ψ); with k = O
              the pulled-back observer stays where it is and the reading never changes.
   Every vector comes from one product: Cl(3,0) multivectors multiplied blade by blade, rotors acting by s ↦ R s R̃.
   Read-only probe for the browser suite: window.DEGEN_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];
  const ALPHA_FRAMES = PI / 3;

  /* ---------- Cl(3,0): 8 coefficients on blades by bitmask (bit 0 = e₁, bit 1 = e₂, bit 2 = e₃) ---------- */
  const GRADE = [0, 1, 1, 2, 1, 2, 2, 3];
  const pop = (x) => { let n = 0; while (x) { n += x & 1; x >>= 1; } return n; };
  /** Sign of the product of the canonical blades a and b, put back in canonical order. */
  function bladeSign(a, b) { let s = 0; a >>= 1; while (a) { s += pop(a & b); a >>= 1; } return s & 1 ? -1 : 1; }
  function mul(A, B) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) if (A[i]) for (let j = 0; j < 8; j++) if (B[j]) C[i ^ j] += bladeSign(i, j) * A[i] * B[j];
    return C;
  }
  const rev = (A) => A.map((x, i) => (GRADE[i] >= 2 ? -x : x));
  const vec = (v) => [0, v[0], v[1], 0, v[2], 0, 0, 0];
  const vecOf = (M) => [M[1], M[2], M[4]];
  /** exp(−(ϑ/2) a∧b) for orthonormal a, b: in the sandwich it turns a towards b by ϑ. */
  function rotor(a, b, th) { const B = mul(vec(a), vec(b)), c = Math.cos(th / 2), s = Math.sin(th / 2); return B.map((x, i) => (i === 0 ? c : 0) - s * x); }
  const act = (R, v) => vecOf(mul(mul(R, vec(v)), rev(R)));
  /** Rotor as text: 0.71 − 0.71 e₁e₃ (blades 3 = e₁e₂, 6 = e₂e₃, 5 = e₁e₃). */
  function rotorText(R, d = 2) {
    let s = fix(R[0], d);
    for (const [k, nm] of [[3, 'e₁e₂'], [6, 'e₂e₃'], [5, 'e₁e₃']]) if (Math.abs(R[k]) > 0.5 * 10 ** -d) s += ` ${R[k] < 0 ? '−' : '+'} ${fix(Math.abs(R[k]), d)} ${nm}`;
    return s;
  }
  const H = PI / 2;
  const R13 = rotor(E1, E3, H), R12 = rotor(E1, E2, H), R23 = rotor(E2, E3, H);
  const RONCE = R13, RTWICE = mul(R23, R12), DIFF = mul(RTWICE, rev(RONCE));
  /** The rotor turning by ψ about the unit axis k (right hand): cos(ψ/2) − sin(ψ/2) k⋆, k⋆ = k₁e₂e₃ + k₂e₃e₁ + k₃e₁e₂. */
  function axisRotor(k, psi) { const c = Math.cos(psi / 2), s = Math.sin(psi / 2); return [c, 0, 0, -s * k[2], 0, s * k[1], -s * k[0], 0]; }
  const PULL_K = [Math.sin(PI / 3) * Math.cos(220 * PI / 180), Math.sin(PI / 3) * Math.sin(220 * PI / 180), Math.cos(PI / 3)];   // the tilted axis of the pullback scene: 60° from e₃, azimuth 220°

  /* ---------- the scenes ---------- */
  const S = { scene: 'address', theta: PI / 3, alpha: ALPHA_FRAMES, O: E3.slice(), axis: 'k' };
  const frame = (g) => [[Math.cos(g), Math.sin(g), 0], [-Math.sin(g), Math.cos(g), 0]];
  const v1Of = () => act(rotor(E3, E1, S.theta), E3);
  /** The pair (once, twice) the observer compares, and what else the scene needs, at rail value t. */
  function sceneAt(t) {
    if (S.scene === 'address') {
      const a = v1Of(), b = act(rotor(E1, E2, t), a);
      return { a, b, phi: t };
    }
    if (S.scene === 'pull') {
      const a0 = v1Of(), b0 = act(rotor(E1, E2, H), a0), k = S.axis === 'O' ? S.O.slice() : PULL_K, R = axisRotor(k, t);
      const Op = act(rev(R), S.O);
      return { a: act(R, a0), b: act(R, b0), a0, b0, k, R, Op, psi: t, pa: v3.dot(Op, a0), pb: v3.dot(Op, b0) };
    }
    if (S.scene === 'rotor') {
      const h = clamp(t, 0, 2), once = rotor(E1, E3, H * h / 2), twice = h <= 1 ? rotor(E1, E2, H * h) : mul(rotor(E2, E3, H * (h - 1)), R12);
      return { a: act(once, E1), b: act(twice, E1), fa: act(once, E2), fb: act(twice, E2), once, twice, D: mul(twice, rev(once)), h };
    }
    const g = S.scene === 'frames' ? t : 0, al = S.scene === 'frames' ? S.alpha : t, [f1, f2] = frame(g);
    const once = rotor(f1, E3, H), twice = mul(rotor(f2, E3, H), rotor(f1, f2, H));
    const s = v3.add(v3.scale(f1, Math.cos(al)), v3.scale(f2, Math.sin(al)));
    return { a: act(once, s), b: act(twice, s), s, f1, f2, once, twice, gamma: g, alpha: al };
  }
  /** The unit normal of the blind circle {O : O·a = O·b}; in the address scene its limit where v₂ → v₁. */
  function blindNormal(X, t) {
    const d = v3.sub(X.b, X.a);
    if (v3.len(d) > 1e-9) return v3.unit(d);
    if (S.scene === 'address') { const h = (t == null ? clock.t : t) / 2; return [-Math.sin(h), Math.cos(h), 0]; }
    return null;
  }
  const reading = (X) => ({ ra: v3.dot(S.O, X.a), rb: v3.dot(S.O, X.b) });
  /** A unit vector orthogonal to both a and b (a × b when they are independent). */
  function commonNormal(a, b) {
    const c = v3.cross(a, b);
    if (v3.len(c) > 1e-9) return v3.unit(c);
    const base = v3.len(a) > 1e-9 ? a : v3.len(b) > 1e-9 ? b : E1;
    return v3.unit(v3.cross(base, Math.abs(v3.unit(base)[2]) < 0.9 ? E3 : E1));
  }
  /** The two difference vectors whose common normal the page shows: the current one and a quarter turn earlier. */
  function diffPair(t) {
    const ref = S.scene === 'address' ? (t > PI ? t - H : t + H) : t + H;
    const d = (u) => { const X = sceneAt(u); return v3.sub(X.b, X.a); };
    const now = d(t);   // at φ = 0 or 360° the two results coincide: take the opposite azimuth instead
    return [v3.len(now) > 1e-9 ? now : d(t + PI), d(ref)];
  }

  /* ---------- stage ---------- */
  let drag = false;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.34, cy: TRV.figure ? 0.5 : 0.52, yaw: -2.0, pitch: 0.36,
    onChange: () => paint(),
    onPick: (ev, st) => { drag = st.near(ev, S.O) < 24 && st.p(S.O)[2] > -0.05; return drag; },
    onDrag: (ev, st) => { if (!drag) return; cards.mark(null); setObserver(st.pick(ev)); },
    onDrop: () => { drag = false; }
  });
  /** Push a label away from the centre of the sphere. */
  const outward = (st, p, r = 18) => { const q = st.p(p), o = st.p([0, 0, 0]), dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy); return l < 4 ? { dx: 0, dy: -r } : { dx: r * dx / l, dy: r * dy / l }; };

  function drawFrameAxes(st) {
    st.line([0, 0, -1.2], [0, 0, 1.24], { color: P.violet, width: 1.6, alpha: 0.9, back: 0.4 });
    st.tag('pN', [0, 0, 1.2], '+e₃', 'raw c-vi', { dx: 24 });
    st.tag('pS', [0, 0, -1.14], '−e₃', 'raw c-vi', { dx: 24 });
    for (const [ax, key, nm] of [[E1, 'x1', 'e₁'], [E2, 'x2', 'e₂']]) {
      st.line([0, 0, 0], v3.scale(ax, 1.22), { color: P.dim, width: 1, alpha: 0.7, dash: [3, 4] });
      // the turned frame carries its own labels, and the observer's label wins where the two would meet
      if (S.scene !== 'frames' && S.scene !== 'rotor' && S.scene !== 'pull' && v3.dot(S.O, ax) < 0.97) st.tag(key, v3.scale(ax, 1.32), nm, 'raw ink', {});
    }
  }
  function drawObserver(st, X, cx) {
    const O = S.O, { ra, rb } = reading(X);
    st.line([0, 0, 0], v3.scale(O, 1.18), { color: P.amber, width: 1.6, alpha: 0.85, back: 0.5 });
    // the two shadows on the observer's axis, and the gap between them
    const fa = v3.scale(O, ra), fb = v3.scale(O, rb);
    st.line(X.a, fa, { color: P.cyan, width: 1.2, dash: [3, 4], alpha: 0.75, back: 0.5 });
    st.line(X.b, fb, { color: P.cyan, width: 1.2, dash: [3, 4], alpha: 0.75, back: 0.5 });
    if (!(cx && cx.noGap) && Math.abs(rb - ra) > 2e-3) st.line(fa, fb, { color: P.magenta, width: 4, alpha: 0.95, fade: false });
    st.dot(fa, 3.6, P.cyan, { fade: false }); st.dot(fb, 3.6, P.cyan, { fade: false });
    st.dot(O, 6.5, P.amber, { glow: 14, fade: false });
    const off = Math.abs(O[2]) > 0.95 ? { dx: -66, dy: O[2] > 0 ? -14 : 14 } : outward(st, O, 30);
    if (!cx || !cx.noTag) st.tag('obs', O, L('观察者 O', 'observer O'), 'raw c-am', cx && cx.obsOff ? cx.obsOff : off);
  }
  function drawPair(st, X, la, lb, offA, offB) {
    st.dot(X.a, 5.5, P.ink, { glow: 8 });
    st.dot(X.b, 6, P.ink, { ring: true, width: 2.2 });
    if (la) st.tag('ta', X.a, la, 'raw ink', offA || outward(st, X.a, 24));
    if (lb) st.tag('tb', X.b, lb, 'raw ink', offB || outward(st, X.b, 24));
  }
  /** Earlier blind circles: faint, one every 15° of the rail. */
  function drawTrail(st, upTo, normalAt) {
    for (let u = PI / 12; u < upTo - 1e-9; u += PI / 12) { const n = normalAt(u); if (n) st.circle([0, 0, 0], n, 1, { color: P.cyan, width: 1, alpha: TRV.thumbMode ? 0.32 : 0.22, back: 0.4 }); }
  }

  function drawAddress(st, t) {
    const X = sceneAt(t), a = X.a;
    // first turn: e₃ → v₁ in the meridian plane; second turn: v₁ → v₂ along the latitude, sweeping magenta
    st.arc(E3, a, { color: P.dim, width: 1.4, dash: [4, 4], alpha: 0.85 });
    const zc = [0, 0, a[2]], pts = [];
    const N = Math.max(2, Math.ceil(Math.abs(t) / (3 * DEG)));
    for (let j = 0; j <= N; j++) pts.push(act(rotor(E1, E2, t * j / N), a));
    if (t > 1e-3) { st.poly([zc, ...pts], { fill: P.magenta, alpha: TRV.thumbMode ? 0.22 : 0.14 }); st.path(pts, { color: P.magenta, width: 2.4, alpha: 0.95 }); }
    st.circle(zc, E3, Math.hypot(a[0], a[1]), { color: P.dim, width: 0.8, alpha: 0.45, dash: [2, 4] });
    if (S.trail) drawTrail(st, t, (u) => blindNormal(sceneAt(u), u));
    const n = blindNormal(X, t);
    if (n) st.circle([0, 0, 0], n, 1, { color: P.cyan, width: 2, dash: [6, 5], alpha: 0.95 });
    drawPair(st, X, L('一次 v₁', 'once v₁'), t > 0.12 && t < TAU - 0.12 ? L('两次 v₂', 'twice v₂') : '', null, null);
    drawObserver(st, X);
    return X;
  }

  function drawRotor(st, t) {
    const X = sceneAt(t);
    st.arc(E1, E3, { color: P.ink, width: 1.4, alpha: 0.55 });
    st.arc(E1, E2, { color: P.ink, width: 1.4, alpha: 0.55, dash: [5, 5] });
    st.arc(E2, E3, { color: P.ink, width: 1.4, alpha: 0.55, dash: [5, 5] });
    const FL = 0.5;
    st.arrow(X.a, v3.add(X.a, v3.scale(X.fa, FL)), { color: P.ink, width: 1.8, headSize: 8, fade: false });
    st.arrow(X.b, v3.add(X.b, v3.scale(X.fb, FL)), { color: P.ink, width: 1.8, headSize: 8, dash: [4, 3], fade: false });
    // the angle between the two flags, measured in the tangent plane at the common end point
    const ang = Math.atan2(v3.dot(X.a, v3.cross(X.fa, X.fb)), v3.dot(X.fa, X.fb));
    if (v3.len(v3.sub(X.a, X.b)) < 1e-6 && Math.abs(ang) > 1e-3) {
      const w = [X.a];
      for (let j = 0; j <= 24; j++) w.push(v3.add(X.a, v3.scale(v3.rot(X.fa, X.a, ang * j / 24), FL * 0.62)));
      st.poly(w, { fill: P.magenta, alpha: 0.38 });
      st.tag('wedge', v3.add(X.a, v3.scale(v3.rot(X.fa, X.a, ang / 2), FL * 1.05)), `${L('差', 'apart')} ${fix(Math.abs(ang) / DEG, 0)}°`, 'raw c-mg', { dx: 18, dy: -4 });
    }
    st.dot(E1, 4, P.dim, {});
    st.tag('start', E1, L('起点 +e₁', 'start +e₁'), 'raw ink', { dx: -6, dy: 22 });
    const end = X.h >= 2 - 1e-9;
    const away = X.h > 0.2;
    drawPair(st, X, '', '', null, null);
    // each road's label sits at the tip of its own flag
    if (away) {
      st.tag('ta', v3.add(X.a, v3.scale(X.fa, FL)), L('一步', 'one hop'), 'raw ink', { dx: 30, dy: 0 });
      st.tag('tb', v3.add(X.b, v3.scale(X.fb, FL)), L('两步', 'two hops'), 'raw ink', { dx: 0, dy: -16 });
    }
    drawObserver(st, X);
    drawDial(st, X.D);
    return X;
  }
  /** Dial: the difference rotor D = R₂R̃₁ in the plane of its scalar and e₁e₂ parts. */
  function drawDial(st, D) {
    const c = st.ctx, R = clamp(Math.min(st.W, st.H) * (TRV.thumbMode ? 0.12 : 0.09), 26, 64);
    const leg = $('legend'), legH = leg && st.W < 640 ? leg.offsetHeight + 22 : (TRV.figure ? 18 : 26);
    const cx = st.W - R - 44, cy = st.H - R - legH - 6;
    c.save(); c.lineWidth = 1 * st.lw; c.strokeStyle = P.dim; c.globalAlpha = 0.85;
    c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.stroke();
    c.globalAlpha = 0.5; c.beginPath(); c.moveTo(cx - R, cy); c.lineTo(cx + R, cy); c.moveTo(cx, cy - R); c.lineTo(cx, cy + R); c.stroke();
    const x = D[0], y = D[3], len = Math.hypot(x, y);
    c.globalAlpha = 1; c.strokeStyle = P.violet; c.lineWidth = 2.6 * st.lw; c.shadowColor = P.violet; c.shadowBlur = 8;
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + R * x, cy - R * y); c.stroke();
    c.shadowBlur = 0; c.fillStyle = P.violet; c.beginPath(); c.arc(cx + R * x, cy - R * y, 3.5 * st.lw, 0, TAU); c.fill();
    c.restore();
    st.tag('dialT', [cx, cy - R - 12], `D = ${rotorText(D)}`, 'raw c-vi', { screen: true });
    st.tag('dialL', [cx, cy + R + 11], len > 0.999 ? L('全在 e₁∧e₂ 面里', 'all in the e₁∧e₂ plane') : L(`e₁∧e₂ 面内占 ${fix(len * len * 100, 0)}%`, `${fix(len * len * 100, 0)}% in the e₁∧e₂ plane`), 'raw c-vi', { screen: true });
  }

  function drawTest(st, t) {
    const X = sceneAt(t), fr = S.scene === 'frames';
    st.circle([0, 0, 0], X.f1, 1, { color: P.ink, width: 1.8, alpha: 0.8 });                 // image of the equator, one hop
    st.circle([0, 0, 0], X.f2, 1, { color: P.ink, width: 1.8, alpha: 0.8, dash: [6, 5] });  // image of the equator, two hops
    if (fr) {
      for (const [f, key, nm] of [[X.f1, 'f1', 'e₁(γ)'], [X.f2, 'f2', 'e₂(γ)']]) { st.arrow([0, 0, 0], f, { color: P.dim, width: 1.4, headSize: 8, alpha: 0.85 }); st.tag(key, v3.scale(f, 1.16), nm, 'raw ink', {}); }
      if (S.trail) drawTrail(st, t, (u) => blindNormal(sceneAt(u)));
    }
    st.dot(X.s, 4.5, P.dim, {});
    st.tag('s', X.s, fr ? 's' : 's(α)', 'raw ink', outward(st, X.s, 18));
    st.arc(X.s, X.a, { color: P.dim, width: 1, dash: [2, 4], alpha: 0.7 });
    st.arc(X.s, X.b, { color: P.dim, width: 1, dash: [2, 4], alpha: 0.7 });
    if (v3.len(v3.sub(X.a, X.b)) > 2e-3) st.line(X.a, X.b, { color: P.magenta, width: 2.6, alpha: 0.95 });
    const n = blindNormal(X);
    if (n) st.circle([0, 0, 0], n, 1, { color: P.cyan, width: 2, dash: [6, 5], alpha: 0.95 });
    for (const q of [E3, [0, 0, -1]]) st.dot(q, 8, P.violet, { ring: true, width: 2 });
    drawPair(st, X, 's₁', 's₂', null, null);
    drawObserver(st, X);
    return X;
  }

  function drawPull(st, t) {
    const X = sceneAt(t), N = 36;
    st.line(v3.scale(X.k, -1.3), v3.scale(X.k, 1.3), { color: P.violet, width: 2, alpha: 0.95, back: 0.4 });
    st.tag('kAx', v3.scale(X.k, 1.36), S.axis === 'O' ? L('转轴 = O', 'axis = O') : L('转轴 k', 'axis k'), 'raw c-vi', {});
    // where each state was, and the way it has turned about k
    for (const [v0, key] of [[X.a0, 'a'], [X.b0, 'b']]) {
      const w = []; for (let j = 0; j <= N; j++) w.push(act(axisRotor(X.k, t * j / N), v0));
      if (t > 1e-3) st.path(w, { color: P.ink, width: 1.5, dash: [4, 4], alpha: 0.6 });
      st.dot(v0, 4, P.dim, { ring: key === 'b', width: 1.4 });
    }
    // the pulled-back observer reads the states left alone: its axis and its two shadows, in neutral ink
    const Op = X.Op, sa = v3.scale(Op, X.pa), sb = v3.scale(Op, X.pb);
    if (v3.len(v3.sub(Op, S.O)) > 1e-3) {
      st.line([0, 0, 0], v3.scale(Op, 1.14), { color: P.ink, width: 1.4, dash: [5, 4], alpha: 0.8, back: 0.5 });
      st.line(X.a0, sa, { color: P.dim, width: 1, dash: [2, 4], alpha: 0.7, back: 0.5 });
      st.line(X.b0, sb, { color: P.dim, width: 1, dash: [2, 4], alpha: 0.7, back: 0.5 });
      st.dot(sa, 3, P.ink, { fade: false }); st.dot(sb, 3, P.ink, { fade: false });
      st.dot(Op, 5.5, P.ink, { ring: true, width: 2 });
      st.tag('opull', Op, 'R⁻¹O', 'raw ink', outward(st, Op, 30));
    }
    drawPair(st, X, L('一次 Rv₁', 'once Rv₁'), L('两次 Rv₂', 'twice Rv₂'), null, null);
    drawObserver(st, X, { noGap: true });
    return X;
  }

  function drawStage() {
    const st = stage, c = st.begin(), t = clock.t;
    st.sphere(1, { lat: [0], lon: 0, shade: 0.08, alpha: 0.42 });
    drawFrameAxes(st);
    const X = S.scene === 'address' ? drawAddress(st, t) : S.scene === 'rotor' ? drawRotor(st, t) : S.scene === 'pull' ? drawPull(st, t) : drawTest(st, t);
    st.end();
    const { ra, rb } = reading(X), gap = rb - ra;
    const big = { address: L('寻址', 'Address'), rotor: L('旋子', 'Rotors'), test: L('测试态', 'Test state'), frames: L('标架', 'Frames'), pull: L('拉回', 'Pullback') }[S.scene];
    $('hudBig').textContent = S.scene === 'pull' ? `${big} · ψ = ${fix(t / DEG, 0)}°` : `${big} · Δ = ${sgn(gap, 3)}`;
    const bits = S.scene === 'pull' ? `ψ = ${fix(t / DEG, 0)}°` : S.scene === 'address' ? `φ = ${fix(t / DEG, 0)}°` : S.scene === 'rotor' ? L(`第 ${fix(t, 2)} 步`, `hop ${fix(t, 2)}`) : S.scene === 'test' ? `α = ${fix(t / DEG, 0)}°` : `γ = ${fix(t / DEG, 0)}°`;
    $('hudSub').innerHTML = S.scene === 'pull' ? `<span class="c-cy">${L('一次', 'once')} ${fix(ra, 3)} = ${fix(X.pa, 3)}</span> · <span class="c-cy">${L('两次', 'twice')} ${fix(rb, 3)} = ${fix(X.pb, 3)}</span> · ${L('转态 = 拉回', 'turned = pulled back')}`
      : `${bits} · <span class="c-cy">${L('一次读', 'once reads')} ${fix(ra, 3)}</span> · <span class="c-cy">${L('两次读', 'twice reads')} ${fix(rb, 3)}</span>`;
    const LEG = {
      address: [['vi', L('极轴 ±e₃', 'polar axis ±e₃')], ['mg', L('第二次转动扫过的横向面', 'the side turn and its sweep')], ['cy', S.trail ? L('影子；虚线：读数相同的盲圈；淡线：走过的盲圈', 'shadows; dashed: the blind circle; faint: earlier ones') : L('影子；虚线：读数相同的盲圈', 'shadows; dashed: the blind circle')], ['am', L('观察者', 'observer')]],
      rotor: [['dm', L('实线一步、虚线两步', 'solid one hop, dashed two')], ['mg', L('两面小旗的夹角', 'angle between the flags')], ['vi', L('差旋子 D', 'difference rotor D')], ['am', L('观察者', 'observer')]],
      test: [['dm', L('赤道的两个像：实线一步、虚线两步', 'images of the equator: solid one hop, dashed two')], ['mg', L('s₁ 与 s₂ 之差', 's₁ minus s₂')], ['cy', L('影子；虚线：盲圈', 'shadows; dashed: blind circle')], ['am', L('观察者', 'observer')]],
      pull: [['vi', L('转轴', 'the axis of the turn')], ['dm', L('虚线弧：转态走过的路；墨色虚线：拉回的观察者', 'dashed arcs: the states turning; dashed ink: the pulled-back observer')], ['cy', L('影子', 'shadows')], ['am', L('观察者', 'observer')]],
      frames: [['dm', L('转过 γ 的标架与它的两个像', 'the frame turned by γ and its images')], ['mg', L('s₁ 与 s₂ 之差', 's₁ minus s₂')], ['cy', S.trail ? L('虚线：盲圈；淡线：走过的盲圈', 'dashed: blind circle; faint: earlier ones') : L('虚线：盲圈', 'dashed: blind circle')], ['am', L('观察者', 'observer')]]
    }[S.scene];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
    return X;
  }

  /* ---------- strip: the gap along the rail ---------- */
  function drawPlot() {
    const max = clock.max, pts = [];
    for (let i = 0; i <= 180; i++) { const u = max * i / 180, X = sceneAt(u), r = reading(X); pts.push([u, r.rb - r.ra]); }
    const hi = Math.max(0.25, ...pts.map((p) => Math.abs(p[1]))) * 1.18;
    const g = kit.plot($('plot'), { x: [0, max], y: [-hi, hi], pad: [42, 10, 8, 22] });
    const xt = S.scene === 'rotor' ? [[0, '0'], [1, '1'], [2, '2']] : [0, 90, 180, 270, 360].map((d) => [d * DEG, `${d}°`]);
    g.axes({ xTicks: xt, yTicks: [[-hi / 1.18, fix(-hi / 1.18, 2)], [0, '0'], [hi / 1.18, fix(hi / 1.18, 2)]] });
    g.hline(0, P.dim, { alpha: 0.6 });
    g.line(pts, P.magenta, { width: 2.2 });
    g.vline(clock.t, P.amber, { alpha: 0.8 });
    const r = reading(sceneAt(clock.t));
    g.dot(clock.t, r.rb - r.ra, P.amber, 4);
    $('plotMeta').textContent = `Δ = ${sgn(r.rb - r.ra, 3)}`;
  }

  /* ---------- readouts ---------- */
  function row(id, dt, dd) { $('dt' + id).innerHTML = dt; $('ro' + id).innerHTML = dd == null ? '' : dd; $('ro' + id).parentElement.hidden = dd == null; }
  const vt = (x, d = 2) => `(${x.map((y) => fix(y, d)).join(', ')})`;
  const betaOf = () => Math.acos(clamp(S.O[2], -1, 1));
  function drawText(X) {
    const t = clock.t, { ra, rb } = reading(X), gap = rb - ra;
    if (S.scene === 'pull') {
      $('dtKey').textContent = L('一次：转态读 = 拉回读', 'once: turned state = pulled-back observer');
      $('roKey').textContent = `${fix(ra, 4)} = ${fix(X.pa, 4)}`;
      $('roKeySub').textContent = L(` · 两次 ${fix(rb, 4)} = ${fix(X.pb, 4)}`, ` · twice ${fix(rb, 4)} = ${fix(X.pb, 4)}`);
    } else {
      $('dtKey').textContent = L('读数之差 Δ（两次 − 一次）', 'gap in the readings Δ (twice − once)');
      $('roKey').textContent = sgn(gap, 3);
      $('roKeySub').textContent = L(` · 一次 ${fix(ra, 3)} · 两次 ${fix(rb, 3)}`, ` · once ${fix(ra, 3)} · twice ${fix(rb, 3)}`);
    }
    row('A', L('观察者 O 与它离北极的角', 'observer O and its angle from the North Pole'), `${vt(S.O)} · ${fix(betaOf() / DEG, 0)}°`);
    let note = '';
    const showNormal = S.scene === 'address' || S.scene === 'frames';
    if (showNormal) {
      const [d1, d2] = diffPair(t), n = commonNormal(d1, d2);
      row('C', L('与两根差向量都正交的单位向量 n', 'unit vector n orthogonal to both differences'), `±${vt(n.map((x) => (n[2] < 0 ? -x : x)))}`);
    }
    if (S.scene === 'pull') {
      $('roAside').textContent = `ψ = ${fix(t / DEG, 0)}°`;
      row('B', L('转态：O 读 Rv₁ / Rv₂', 'turn the states: O reads Rv₁ / Rv₂'), `${fix(ra, 4)} / ${fix(rb, 4)}`);
      row('C', L('拉回：R⁻¹O 读 v₁ / v₂', 'pull back: R⁻¹O reads v₁ / v₂'), `${fix(X.pa, 4)} / ${fix(X.pb, 4)}`);
      row('D', L('两种读法相差', 'the two ways differ by'), fix(Math.max(Math.abs(ra - X.pa), Math.abs(rb - X.pb)), 4));
      note = S.axis === 'O' ? L(`转轴就是观察者自己的轴：拉回的观察者 R⁻¹O = O 原地不动，读数对每个 ψ 都是 ${fix(ra, 3)} 与 ${fix(rb, 3)}。`, `The axis is the observer's own: the pulled-back observer R⁻¹O = O stays put, and the readings are ${fix(ra, 3)} and ${fix(rb, 3)} for every ψ.`)
        : L('把两个态绕 k 转过 ψ 再读，与态不动、把观察者绕 k 转回 −ψ 再读，读数一样。', 'Turning the two states about k by ψ and reading them gives the same numbers as leaving them alone and turning the observer back by −ψ.');
    } else if (S.scene === 'address') {
      $('roAside').textContent = `θ = ${fix(S.theta / DEG, 0)}°`;
      row('B', L('一次 v₁ / 两次 v₂', 'once v₁ / twice v₂'), `${vt(X.a)} / ${vt(X.b)}`);
      const b = betaOf();
      row('D', L('随 φ 张开的峰峰值 2 sin θ sin β', 'spread over φ, 2 sin θ sin β'), fix(2 * Math.sin(S.theta) * Math.sin(b), 3));
      note = Math.sin(b) < 1e-6 ? L(`站在极轴上：无论 φ 是多少，两路读数都是 ${fix(ra, 3)}，读数差恒为零。`, `On the polar axis: whatever φ is, both readings are ${fix(ra, 3)} and the gap stays zero.`)
        : Math.abs(gap) < 1e-6 ? L('此刻落在盲圈上：这一次的两个结果你读不出差别；换一个 φ，盲圈就转走了。', 'On the blind circle right now: you cannot tell these two results apart; take another φ and the circle turns away.')
          : L('不在盲圈上：两道青色影子分开，品红的一段就是读数差。', 'Off the blind circle: the two cyan shadows part, and the magenta piece is the gap.');
    } else if (S.scene === 'rotor') {
      $('roAside').textContent = L(`第 ${fix(t, 2)} 步`, `hop ${fix(t, 2)}`);
      row('B', L('一步旋子 R₁', 'one-hop rotor R₁'), rotorText(RONCE));
      row('C', L('两步旋子 R₂', 'two-hop rotor R₂'), rotorText(RTWICE));
      const c3 = mul(DIFF, vec(E3)).map((x, i) => x - mul(vec(E3), DIFF)[i]), c1 = mul(DIFF, vec(E1)).map((x, i) => x - mul(vec(E1), DIFF)[i]);
      const nrm = (M) => Math.hypot(...M);
      row('D', L('差旋子 D = R₂R̃₁', 'difference rotor D = R₂R̃₁'), rotorText(DIFF));
      row('E', L('换位子大小 |De₃ − e₃D| · |De₁ − e₁D|', 'commutators |De₃ − e₃D| · |De₁ − e₁D|'), `${fix(nrm(c3), 3)} · ${fix(nrm(c1), 3)}`);
      note = X.h >= 2 - 1e-9 ? L('两条路都停在 +e₃：终点一样，谁都读不出差别；差别在随行的小旗上，它们在 e₁∧e₂ 面里差 90°。', 'Both roads end at +e₃: the end point is the same and nobody can tell; the difference is in the carried flags, 90° apart in the e₁∧e₂ plane.')
        : L('一步沿 e₁∧e₃ 直上；两步先在赤道上走到 e₂，再沿 e₂∧e₃ 上去。', 'One hop goes straight up through e₁∧e₃; two hops first run along the equator to e₂, then up through e₂∧e₃.');
    } else {
      const al = X.alpha;
      $('roAside').textContent = S.scene === 'frames' ? `α = ${fix(al / DEG, 0)}°` : L('标准标架', 'standard frame');
      row('B', 's₁ / s₂', `${vt(X.a)} / ${vt(X.b)}`);
      if (S.scene === 'test') {
        row('C', L('读数相同的条件 −sin α (O₁ + O₂)', 'equal readings need −sin α (O₁ + O₂) = 0'), sgn(-Math.sin(al) * (S.O[0] + S.O[1]), 3));
        row('D', L('O₁ + O₂', 'O₁ + O₂'), sgn(S.O[0] + S.O[1], 3));
        note = Math.abs(Math.sin(al)) < 1e-6 ? L('sin α = 0：两个像在极点重合，谁都读不出差别。', 'sin α = 0: the two images meet at a pole, and nobody can tell them apart.')
          : Math.abs(gap) < 1e-6 ? L('O₁ + O₂ = 0：观察者在这条盲圈上，两路读数相同。', 'O₁ + O₂ = 0: the observer is on this blind circle and reads the same twice.')
            : L(`两个像只在 ±e₃ 相交；这里两路读数相差 ${fix(Math.abs(gap), 3)}。`, `The two images meet only at ±e₃; here the readings differ by ${fix(Math.abs(gap), 3)}.`);
      } else {
        row('D', L('此刻的盲圈法向 (e₁(γ) + e₂(γ))/√2', 'blind-circle normal (e₁(γ) + e₂(γ))/√2'), vt(blindNormal(X) || [0, 0, 0]));
        note = Math.sin(betaOf()) < 1e-6 ? L('标架怎么转，极点观察者的两路读数都是 cos α：它在每一条盲圈上。', 'However the frame turns, the observer at the pole reads cos α both times: it is on every blind circle.')
          : L('离开极轴的观察者只在个别 γ 落到盲圈上，其余时候读得出差别。', 'An observer off the polar axis lands on the blind circle only for a few γ and tells the results apart the rest of the time.');
      }
    }
    if (S.scene !== 'rotor') row('E', '', null);
    $('roNote').textContent = note;
    $('pillObs').querySelector('strong').textContent = `${fix(betaOf() / DEG, 0)}°`;
    $('pillGap').querySelector('strong').textContent = sgn(gap, 3);
    $('thetaField').hidden = S.scene !== 'address';
    $('alphaField').hidden = S.scene !== 'frames';
    $('axisField').hidden = S.scene !== 'pull';
  }

  const paint = kit.painter(() => { const X = drawStage(); drawPlot(); drawText(X); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const MAX = { address: TAU, rotor: 2, test: TAU, frames: TAU, pull: TAU };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: TAU, rate: 0.9, step: PI / 12,
    format: (t, max) => (max === 2 ? L(`第 ${fix(t, 2)} 步 <small>/ 2</small>`, `hop ${fix(t, 2)} <small>/ 2</small>`)
      : `${S.scene === 'address' ? 'φ' : S.scene === 'test' ? 'α' : S.scene === 'pull' ? 'ψ' : 'γ'} = ${fix(t / DEG, 0)}° <small>/ 360°</small>`),
    onChange: () => paint()
  });
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true);
    clock.pause(); clock.step = sc === 'rotor' ? 0.25 : PI / 12; clock.rate = sc === 'rotor' ? 0.5 : 0.9;
    clock.setMax(MAX[sc], true); clock.set(Math.min(clock.t, MAX[sc]));
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { cards.mark(null); S.trail = false; setScene(v); clock.set(0); paint(); });
  const axisChips = kit.chips($('axisChips'), 'axis', (v) => { cards.mark(null); S.axis = v; paint(); });
  const fTheta = kit.field($('theta'), { fmt: (v) => `${v}°`, onInput: (v) => { cards.mark(null); S.theta = v * DEG; paint(); } });
  const fAlpha = kit.field($('alpha'), { fmt: (v) => `${v}°`, onInput: (v) => { cards.mark(null); S.alpha = v * DEG; paint(); } });
  const fBeta = kit.field($('beta'), { fmt: (v) => `${v}°`, onInput: () => { cards.mark(null); fromFields(); } });
  const fAzim = kit.field($('azim'), { fmt: (v) => `${v}°`, onInput: () => { cards.mark(null); fromFields(); } });
  function fromFields() { S.O = v3.sph(fBeta.value * DEG, fAzim.value * DEG).map((x) => (Math.abs(x) < 1e-12 ? 0 : x)); paint(); }
  function syncFields() {
    const b = betaOf(), az = Math.atan2(S.O[1], S.O[0]);
    fBeta.set(Math.round(b / DEG)); if (Math.sin(b) > 1e-6) fAzim.set(Math.round(((az / DEG) + 360) % 360));
  }
  function setObserver(o) { S.O = v3.unit(o); syncFields(); paint(); }
  $('toPole').addEventListener('click', () => { cards.mark(null); setObserver(E3); });
  $('toE2').addEventListener('click', () => { cards.mark(null); setObserver(E2); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ p: () => { cards.mark(null); setObserver(E3); } });

  /* ---------- experiment cards ---------- */
  const sph = (b, a) => v3.sph(b * DEG, a * DEG);
  const PRESETS = {
    meridian: { scene: 'address', theta: 60, O: sph(45, 45), at: H, view: [-2.0, 0.36] },
    sweep: { scene: 'address', theta: 60, O: E3, play: true, still: 1.5 * PI, trail: true, view: [-2.0, 0.5] },
    tilted: { scene: 'address', theta: 60, O: sph(45, 90), play: true, still: H, view: [-2.0, 0.36] },
    hops: { scene: 'rotor', O: E2, play: true, still: 2, view: [-2.0, 0.85] },
    equator: { scene: 'test', O: E2, at: PI / 3, view: [-2.0, 0.36] },
    frames: { scene: 'frames', O: E3, alpha: 60, play: true, still: 1.25 * PI, trail: true, view: [-2.0, 0.55] },
    pullback: { scene: 'pull', theta: 60, O: sph(45, 90), axis: 'k', play: true, still: 2 * PI / 3, view: [-2.0, 0.36] }
  };
  const NOTES = {
    meridian: ['θ = 60°，第二次横拐 φ = 90°：一次 v₁ 与两次 v₂ 落在不同处。琥珀色的观察者站在 O₁ = O₂ 的青色虚线大圆上，两道青色影子落在轴上同一点，读数都是 0.79，品红的读数差为零。', 'θ = 60° and a second, sideways turn of φ = 90°: once v₁ and twice v₂ land in different places. The amber observer stands on the dashed cyan great circle O₁ = O₂, both cyan shadows fall on the same point of its axis, both readings are 0.79, and there is no magenta gap.'],
    sweep: ['观察者站在北极，方位角 φ 转一圈：品红的横向转动越扫越大，青色虚线的盲圈绕紫色的竖轴转，淡青色是走过的盲圈。它们只在 ±e₃ 相交，北极上的两道影子始终重合在 cos θ = 0.5。', 'The observer stands at the North Pole while the azimuth φ goes once round: the magenta side turn sweeps wider, the dashed cyan blind circle turns about the violet vertical, and the faint cyan circles are the ones already passed. They meet only at ±e₃, and at the pole both shadows stay together at cos θ = 0.5.'],
    tilted: ['观察者离北极 45°、站在 e₂∧e₃ 面里：随 φ 转动，两道青色影子分开，品红的读数差按 0.61 sin φ 张开（峰峰值 2 sin θ sin β = 1.22）；φ = 90° 时读出 0.35 与 0.97。', 'The observer is 45° from the North Pole, in the e₂∧e₃ plane: as φ turns, the two cyan shadows part and the magenta gap opens as 0.61 sin φ (a peak-to-peak spread of 2 sin θ sin β = 1.22); at φ = 90° the readings are 0.35 and 0.97.'],
    hops: ['从 +e₁ 出发：实线一步沿 e₁∧e₃ 直上 +e₃，虚线两步先到 e₂ 再上 +e₃。终点相同，随行的小旗（e₂ 的像）却在 e₁∧e₂ 面里差 90°（品红）；右下角紫色的差旋子 D = 0.71 − 0.71 e₁e₂ 全落在这个面里。', 'From +e₁: the solid one hop goes straight up through e₁∧e₃ to +e₃; the dashed two hops reach e₂ first and then +e₃. The end point is the same, but the carried flags (the images of e₂) are 90° apart in the e₁∧e₂ plane (magenta); the violet difference rotor D = 0.71 − 0.71 e₁e₂ at the lower right lies wholly in that plane.'],
    equator: ['赤道测试态 s(α)，α = 60°：一步把赤道送到 e₂∧e₃ 面里的实线大圆，两步送到 e₁∧e₃ 面里的虚线大圆，两圈只在紫色的 ±e₃ 相交。站在 e₂ 的观察者读出 s₁ 的 0.87 与 s₂ 的 0，品红一段就是这个差；青色虚线是 O₁ + O₂ = 0 的盲圈。', 'The equator test state s(α) at α = 60°: one hop sends the equator to the solid great circle in e₂∧e₃, two hops to the dashed one in e₁∧e₃, and the two meet only at the violet ±e₃. An observer at e₂ reads 0.87 for s₁ and 0 for s₂, the magenta piece is that gap, and the dashed cyan circle is the blind circle O₁ + O₂ = 0.'],
    pullback: ['θ = 60°、φ = 90° 的一次 v₁ 与两次 v₂ 绕紫色的斜轴 k 一起转过 ψ（灰色虚线弧），琥珀色的观察者读它们；墨色虚线是态不动、观察者绕 k 转回 −ψ 的“拉回的观察者” R⁻¹O，它读原来的 v₁、v₂（淡灰点）。两种读法逐位相同：ψ = 120° 时都是 0.61 与 −0.62。把转轴拨到观察者自己的轴上，拉回的观察者原地不动，读数对每个 ψ 都不变。', 'Once v₁ and twice v₂ (θ = 60°, φ = 90°) turn together by ψ about the violet tilted axis k (grey dashed arcs), and the amber observer reads them; the dashed ink line is the “pulled-back observer” R⁻¹O, the states left alone and the observer turned back by −ψ about k, reading the original v₁ and v₂ (faint grey dots). The two ways agree digit for digit: at ψ = 120° both give 0.61 and −0.62. Put the axis on the observer\'s own axis and the pulled-back observer stays where it is, and the readings do not change for any ψ.'],
    frames: ['把初始赤道标架转过 γ，再造两枚旋子（α = 60°）：青色虚线的盲圈跟着标架绕竖轴转，淡青色是转过的盲圈。北极的观察者在每一条上，两路读数始终都是 0.5。', 'Turn the initial equatorial frame by γ and build the two rotors again (α = 60°): the dashed cyan blind circle turns about the vertical with the frame, and the faint cyan circles are the ones already passed. The observer at the North Pole is on every one of them and always reads 0.5 twice.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    S.axis = p.axis || 'k'; axisChips.set(S.axis, true);
    if (p.theta) { S.theta = p.theta * DEG; fTheta.set(p.theta); }
    if (p.alpha) { S.alpha = p.alpha * DEG; fAlpha.set(p.alpha); }
    S.O = p.O.slice(); S.trail = !!p.trail; syncFields();
    setScene(p.scene);
    if (booting || TRV.still) { stage.cam.yaw = p.view[0]; stage.cam.pitch = p.view[1]; stage.cam.zoom = 1; } else stage.view(p.view, 600);
    clock.pause(); clock.set(p.at || 0);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter a playing card starts once the reader has scrolled it into view; a click plays at once
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) kit.autoplay(clock, $('stage'));
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀色的观察者、换场景、拖时间轴或改转角。随时可以再选一张卡。', 'Free play: drag the amber observer, change the scene, scrub the rail or change the angles. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.DEGEN_DEBUG = {
    get state() {
      const t = clock.t, X = sceneAt(t), r = reading(X), n = blindNormal(X, t);
      const out = { scene: S.scene, preset: cards.current, t, max: clock.max, playing: clock.playing, theta: S.theta, alpha: S.alpha, O: S.O.slice(), trail: !!S.trail,
        a: X.a, b: X.b, ra: r.ra, rb: r.rb, gap: r.rb - r.ra, blind: n };
      if (S.scene === 'address' || S.scene === 'frames') { const [d1, d2] = diffPair(t); out.diffs = [d1, d2]; out.common = commonNormal(d1, d2); }
      if (S.scene === 'rotor') Object.assign(out, { fa: X.fa, fb: X.fb, once: X.once, twice: X.twice, D: X.D, h: X.h });
      if (S.scene === 'test' || S.scene === 'frames') Object.assign(out, { s: X.s, f1: X.f1, f2: X.f2, once: X.once, twice: X.twice });
      if (S.scene === 'pull') Object.assign(out, { axis: S.axis, k: X.k, a0: X.a0, b0: X.b0, Op: X.Op, pa: X.pa, pb: X.pb, R: X.R });
      return out;
    },
    /** The end-point rotors and the difference rotor, as 8 blade coefficients [1, e₁, e₂, e₁e₂, e₃, e₁e₃, e₂e₃, e₁e₂e₃]. */
    rotors: () => ({ once: RONCE.slice(), twice: RTWICE.slice(), diff: DIFF.slice(), r12: R12.slice(), r23: R23.slice(),
      comm3: mul(DIFF, vec(E3)).map((x, i) => x - mul(vec(E3), DIFF)[i]), comm1: mul(DIFF, vec(E1)).map((x, i) => x - mul(vec(E1), DIFF)[i]) }),
    /** The (once, twice) pair the current scene shows at rail value t, without moving the rail. */
    pairAt: (t) => { const X = sceneAt(t); return { a: X.a, b: X.b }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of a world point. */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; },
    under: (x, y) => stage.pick({ clientX: x, clientY: y })
  };
  window.TRV_THUMB = () => { cards.pick('sweep'); stage.cam.yaw = -2.0; stage.cam.pitch = 0.5; clock.pause(); clock.set(1.5 * PI); paint.now(); };
  cards.pick(cards.initial('meridian'));
  booting = false;
  paint();
})();
