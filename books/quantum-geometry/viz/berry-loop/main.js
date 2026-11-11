/* BERRY//LOOP · 球面回路与贝里相位 · Loops on the sphere and the Berry phase
   The stage is the Bloch sphere. Three scenes share it:
     order  two 90° rotations about X and Y applied in the two orders, carrying a point and an arrow attached to it;
     loop   a closed loop of great-circle arcs through draggable corners; a tangent arrow carried along it (along an arc,
            a rotation about the arc's axis), the magenta area a fan from an inside point c has swept, and a dial with
            the phase of the product of neighbouring spinor inner products;
     comb   the tangent field v(p) = e₃ − (p·e₃)p, zero only at the poles.
   Each loop number comes from its own route: area from spherical triangles, turn from carried arrows, phase from
   complex spinors. Read-only probe for the browser suite: window.BERRY_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const wrap = (a) => a - TAU * Math.round(a / TAU);
  const NP = [0, 0, 1], SP = [0, 0, -1], EX = [1, 0, 0], EY = [0, 1, 0];
  const TANG = 0.5;   // drawn length of a unit tangent arrow

  /** A multiple of π as text: π/2, −π/4, 2π, else 0.37π. */
  function piText(x) {
    const r = x / PI;
    if (Math.abs(r) < 5e-7) return '0';
    for (const den of [1, 2, 3, 4, 6, 8]) {
      const num = Math.round(r * den);
      if (num && Math.abs(r - num / den) < 5e-7) {
        const s = num < 0 ? '−' : '', a = Math.abs(num), g = gcd(a, den), nn = a / g, dd = den / g;
        return `${s}${nn === 1 ? '' : nn}π${dd === 1 ? '' : '/' + dd}`;
      }
    }
    return `${fix(r, 2)}π`;
  }
  function gcd(a, b) { return b ? gcd(b, a % b) : a; }
  const degText = (x) => `${fix(x / DEG, 0)}°`;
  const cText = (z, d = 2) => Math.abs(z[1]) < 0.5 * 10 ** -d ? fix(z[0], d) : `${fix(z[0], d)}${z[1] < 0 && fix(z[1], d) !== '0.00' ? '−' : '+'}${fix(Math.abs(z[1]), d)}i`;

  /* ---------- spinors: ψ(p) = (cos θ/2, e^{iφ} sin θ/2) ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  function spinor(p) {
    const th = Math.acos(clamp(p[2], -1, 1)), ph = Math.atan2(p[1], p[0]), s = Math.sin(th / 2);
    return [[Math.cos(th / 2), 0], [s * Math.cos(ph), s * Math.sin(ph)]];
  }
  /** ⟨ψ(a), ψ(b)⟩ = conj(ψa)·ψb. */
  function overlap(a, b) {
    const x = spinor(a), y = spinor(b);
    return [x[0][0] * y[0][0] + x[0][1] * y[0][1] + x[1][0] * y[1][0] + x[1][1] * y[1][1],
      x[0][0] * y[0][1] - x[0][1] * y[0][0] + x[1][0] * y[1][1] - x[1][1] * y[1][0]];
  }
  /** Product of neighbouring inner products round the closed list of points. */
  function bargmann(pts) {
    let z = [1, 0];
    for (let i = 0; i < pts.length; i++) z = cmul(z, overlap(pts[i], pts[(i + 1) % pts.length]));
    return z;
  }

  /* ---------- sphere geometry ---------- */
  /** Oriented solid angle of the geodesic triangle (c, a, b) (Van Oosterom–Strackee). */
  const tri = (c, a, b) => 2 * Math.atan2(v3.dot(c, v3.cross(a, b)), 1 + v3.dot(c, a) + v3.dot(c, b) + v3.dot(a, b));
  /** Carry the tangent vector u at `from` along the great-circle arc to `to` (null if they are antipodal). */
  function carry(u, from, to) {
    const d = clamp(v3.dot(from, to), -1, 1), ang = Math.acos(d);
    if (ang < 1e-12) return u.slice();
    if (PI - ang < 1e-9) return null;
    return v3.rot(u, v3.unit(v3.cross(from, to)), ang);
  }
  /** Signed angle from r to v about the outward normal p. */
  const signedAngle = (p, r, v) => Math.atan2(v3.dot(p, v3.cross(r, v)), v3.dot(r, v));
  const perpTo = (a) => v3.unit(v3.cross(a, Math.abs(a[2]) < 0.9 ? NP : EX));

  /* ---------- the loop ---------- */
  const S = { scene: 'loop', V: [NP, EX, EY], t: 0 };
  let LP = null;   // built loop
  function build(V) {
    const n = V.length, E = [];
    for (let k = 0; k < n; k++) {
      const a = V[k], b = V[(k + 1) % n], ang = Math.acos(clamp(v3.dot(a, b), -1, 1));
      let axis = v3.cross(a, b);
      axis = v3.len(axis) > 1e-9 ? v3.unit(axis) : perpTo(a);
      E.push({ a, b, ang, axis });
    }
    // an inside point: the mean of the corners, or the mean normal of the edges when the corners balance out
    let sum = V.reduce((s, x) => v3.add(s, x), [0, 0, 0]);
    if (v3.len(sum) < 0.25) sum = E.reduce((s, e) => v3.add(s, v3.cross(e.a, e.b)), [0, 0, 0]);
    const c = v3.unit(sum);
    // the arrow sets out along the first edge
    const u0 = v3.unit(v3.sub(V[1], v3.scale(V[0], v3.dot(V[0], V[1])))), u0ok = v3.len(v3.sub(V[1], v3.scale(V[0], v3.dot(V[0], V[1])))) > 1e-9;
    const start = u0ok ? u0 : perpTo(V[0]);
    const vs = [start];
    for (let k = 0; k < n; k++) vs.push(v3.rot(vs[k], E[k].axis, E[k].ang));
    const refC = carry(start, V[0], c);
    LP = { V, n, E, c, u0: start, vs, refC };
    // samples: every half degree, every corner included
    const T = [];
    for (let k = 0; k < n; k++) { const m = Math.max(2, Math.ceil(E[k].ang / (0.5 * DEG))); for (let j = 0; j < m; j++) T.push(k + j / m); }
    T.push(n);
    const smp = T.map((t) => raw(t));
    smp[0].swept = 0; smp[0].turnU = smp[0].turn; smp[0].phaseU = smp[0].phase;
    for (let i = 1; i < smp.length; i++) {
      const a = smp[i - 1], b = smp[i];
      b.swept = a.swept + tri(c, a.p, b.p);
      b.turnU = a.turnU + wrap(b.turn - a.turn);
      b.phaseU = a.phaseU + wrap(b.phase - a.phase);
    }
    LP.T = T; LP.smp = smp;
    const last = smp[smp.length - 1];
    LP.area = last.swept; LP.turn = last.turnU; LP.phase = last.phaseU;
    LP.overlaps = E.map((e) => overlap(e.a, e.b));
    LP.delta = bargmann(V);
    return LP;
  }
  /** Point and carried arrow at rail time t (t = k + f: fraction f of edge k). */
  function pv(t) {
    const n = LP.n, k = Math.min(n - 1, Math.max(0, Math.floor(t))), f = clamp(t - k, 0, 1), e = LP.E[k];
    return { k, p: v3.rot(e.a, e.axis, f * e.ang), v: v3.rot(LP.vs[k], e.axis, f * e.ang) };
  }
  /** Unwrapped-free values at t: the reference arrow, the raw turn and the raw phase. */
  function raw(t) {
    const { k, p, v } = pv(t), ref = LP.refC ? carry(LP.refC, LP.c, p) : null;
    const turn = ref ? signedAngle(p, ref, v) : 0;
    const z = bargmann([...LP.V.slice(0, k + 1), p, LP.c]);
    return { t, p, v, ref, turn, phase: Math.atan2(z[1], z[0]), z };
  }
  /** Everything at rail time t, continued from the last sample at or before t. */
  function at(t) {
    t = clamp(t, 0, LP.n);
    const T = LP.T; let lo = 0, hi = T.length - 1;
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (T[m] <= t + 1e-12) lo = m; else hi = m - 1; }
    const s = LP.smp[lo], r = raw(t);
    return Object.assign(r, { i: lo, swept: s.swept + tri(LP.c, s.p, r.p), turnU: s.turnU + wrap(r.turn - s.turn), phaseU: s.phaseU + wrap(r.phase - s.phase) });
  }

  /* ---------- the two orders ---------- */
  const U0 = v3.unit([1, 1, 0]);
  function orderAt(t) {
    const a1 = clamp(t, 0, 1) * PI / 2, a2 = clamp(t - 1, 0, 1) * PI / 2;
    const A = (x) => v3.rot(v3.rot(x, EY, a1), EX, a2), B = (x) => v3.rot(v3.rot(x, EX, a1), EY, a2);
    return { pA: A(NP), aA: A(U0), pB: B(NP), aB: B(U0), step: t <= 1 ? 1 : 2 };
  }

  /* ---------- the comb ---------- */
  const field = (p) => v3.sub(NP, v3.scale(p, p[2]));
  const combPoint = (t) => v3.sph((1 - clamp(t, 0, 1)) * PI / 2, 0);
  /** Winding of the field round a small loop about the pole q, anticlockwise about the outward normal q. */
  function indexAt(q) {
    const e1 = perpTo(q), e2 = v3.cross(q, e1), eps = 0.05, N = 256;
    let tot = 0, prev = null;
    for (let i = 0; i <= N; i++) {
      const a = TAU * i / N, p = v3.add(v3.scale(q, Math.cos(eps)), v3.scale(v3.add(v3.scale(e1, Math.cos(a)), v3.scale(e2, Math.sin(a))), Math.sin(eps)));
      const w = field(p), ang = Math.atan2(v3.dot(w, e2), v3.dot(w, e1));
      if (prev != null) tot += wrap(ang - prev);
      prev = ang;
    }
    return Math.round(tot / TAU);
  }
  const INDEX = { n: indexAt(NP), s: indexAt(SP) };

  /* ---------- stage ---------- */
  let drag = -1;
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), radius: TRV.thumbMode ? 0.4 : 0.33, cy: TRV.figure ? 0.52 : 0.54, yaw: -3 * PI / 4, pitch: 0.5,
    onChange: () => paint(),
    onPick: (ev, st) => {
      if (S.scene !== 'loop') return false;
      let best = -1, bd = 22;
      LP.V.forEach((x, k) => { const d = st.near(ev, x); if (st.p(x)[2] > -0.02 && d < bd) { bd = d; best = k; } });
      drag = best;
      return best >= 0;
    },
    onDrag: (ev, st) => {
      if (drag < 0) return;
      const V = LP.V.slice(); V[drag] = st.pick(ev);
      cards.mark(null); setLoop(V, true);
    },
    onDrop: () => { drag = -1; }
  });
  const nameOf = (x) => {
    const names = [[NP, 'N'], [SP, 'S'], [EX, '+X'], [v3.scale(EX, -1), '−X'], [EY, '+Y'], [v3.scale(EY, -1), '−Y']];
    for (const [d, s] of names) if (v3.dot(d, x) > Math.cos(0.6 * DEG)) return s;
    return '';
  };

  function drawLoop(st, c) {
    const A = at(clock.t), smp = LP.smp;
    // the swept area: fan quads from c, front and back filled once each
    const K = 6, stride = Math.max(1, Math.round(smp.length / 160)), front = new Path2D(), back = new Path2D();
    const quad = (pts) => {
      const q = pts.map(st.p), d = q.reduce((s, x) => s + x[2], 0) / 4, path = d >= 0 ? front : back;
      path.moveTo(q[0][0], q[0][1]); for (let j = 1; j < 4; j++) path.lineTo(q[j][0], q[j][1]); path.closePath();
    };
    const upto = [];
    for (let i = 0; i <= A.i; i += stride) upto.push(smp[i].p);
    if (smp[A.i] && upto[upto.length - 1] !== smp[A.i].p) upto.push(smp[A.i].p);
    upto.push(A.p);
    for (let i = 1; i < upto.length; i++) {
      const a = upto[i - 1], b = upto[i];
      for (let r = 0; r < K; r++) quad([v3.slerp(LP.c, a, r / K), v3.slerp(LP.c, a, (r + 1) / K), v3.slerp(LP.c, b, (r + 1) / K), v3.slerp(LP.c, b, r / K)]);
    }
    c.save(); c.fillStyle = P.magenta;
    c.globalAlpha = TRV.thumbMode ? 0.12 : 0.08; c.fill(back);
    c.globalAlpha = TRV.thumbMode ? 0.34 : 0.26; c.fill(front);
    c.restore();
    // the loop
    st.path(smp.map((s) => s.p), { color: P.cyan, width: 2.2, alpha: 0.95, back: 0.35, close: true });
    LP.V.forEach((x, k) => {
      st.dot(x, k === drag ? 6.5 : 5, P.cyan, { glow: 8 });
      const nm = nameOf(x);
      if (nm) { const q = st.p(x), o = st.p([0, 0, 0]), dx = q[0] - o[0], dy = q[1] - o[1], l = Math.hypot(dx, dy) || 1; st.tag('v' + k, x, nm, 'cy', { dx: 20 * dx / l, dy: 16 * dy / l - (l < 4 ? 16 : 0) }); }
    });
    // the reference arrow (dashed) and the carried arrow (amber), and the angle between them
    const p = A.p, tip = (u) => v3.add(p, v3.scale(u, TANG));
    if (A.ref) {
      const turn = clamp(A.turnU, -TAU, TAU);
      if (Math.abs(turn) > 1e-3) {
        const pts = [p], m = Math.max(8, Math.ceil(Math.abs(turn) / (4 * DEG)));
        for (let j = 0; j <= m; j++) pts.push(v3.add(p, v3.scale(v3.rot(A.ref, p, turn * j / m), TANG * 0.7)));
        st.poly(pts, { fill: P.magenta, alpha: 0.32 });
      }
      st.arrow(p, tip(A.ref), { color: P.dim, width: 1.6, dash: [4, 4], headSize: 8, fade: false });
    }
    st.arrow(p, tip(A.v), { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false });
    st.dot(p, 5.5, P.amber, { glow: 14, fade: false });
    if (A.ref && Math.abs(A.turnU) > 0.05) {
      const mid = v3.rot(A.ref, p, clamp(A.turnU, -TAU, TAU) / 2);
      st.tag('turn', v3.add(p, v3.scale(mid, TANG * 0.95)), `${L('转', 'turn')} ${piText(A.turnU)}`, 'raw c-mg', {});
    }
    drawDial(st, c, A);
    return A;
  }
  /** The dial: magenta wedge = swept area, cyan needle = phase of the product of inner products. */
  function drawDial(st, c, A) {
    const R = clamp(Math.min(st.W, st.H) * (TRV.thumbMode ? 0.13 : 0.1), 28, 72);
    const leg = $('legend'), legH = leg && st.W < 640 ? leg.offsetHeight + 22 : (TRV.figure ? 18 : 26);
    const cx = st.W - R - 22, cy = st.H - R - legH;
    c.save(); c.lineWidth = 1 * st.lw;
    c.strokeStyle = P.dim; c.globalAlpha = 0.85; c.beginPath(); c.arc(cx, cy, R, 0, TAU); c.stroke();
    c.globalAlpha = 0.5; c.beginPath(); c.moveTo(cx - R, cy); c.lineTo(cx + R, cy); c.moveTo(cx, cy - R); c.lineTo(cx, cy + R); c.stroke();
    const area = clamp(A.swept, -TAU, TAU);
    if (Math.abs(area) > 1e-4) { c.globalAlpha = 0.28; c.fillStyle = P.magenta; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R * 0.92, 0, -area, area > 0); c.closePath(); c.fill(); }
    const ph = A.phaseU;
    c.globalAlpha = 1; c.strokeStyle = P.cyan; c.lineWidth = 2.6 * st.lw; c.shadowColor = P.cyan; c.shadowBlur = 8;
    c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + R * Math.cos(ph), cy - R * Math.sin(ph)); c.stroke();
    c.shadowBlur = 0; c.fillStyle = P.cyan; c.beginPath(); c.arc(cx + R * Math.cos(ph), cy - R * Math.sin(ph), 3.5 * st.lw, 0, TAU); c.fill();
    c.restore();
    st.tag('dial', [cx, cy - R - 12], `${L('相位', 'phase')} ${piText(ph)}`, 'raw c-cy', { screen: true });
  }

  function drawOrder(st) {
    const o = orderAt(clock.t);
    // the two axes being turned about
    for (const [ax, nm] of [[EX, 'X'], [EY, 'Y']]) {
      st.line(v3.scale(ax, -1.25), v3.scale(ax, 1.25), { color: P.violet, width: 1.4, alpha: 0.85, back: 0.4 });
      st.tag('ax' + nm, v3.scale(ax, nm === 'X' ? -1.36 : 1.36), L(`${nm} 轴`, `${nm} axis`), 'raw c-vi', {});
    }
    // the roads: N → +X (about Y) and N → −Y (about X)
    st.arc(NP, EX, { color: P.dim, width: 1.4, dash: [4, 4], alpha: 0.8, back: 0.4 });
    st.arc(NP, v3.scale(EY, -1), { color: P.dim, width: 1.4, dash: [4, 4], alpha: 0.8, back: 0.4 });
    st.dot(NP, 4, P.dim, {});
    st.tag('n', NP, L('起点 N', 'start N'), 'ink', { dy: -18 });
    for (const [p, a, key, txt] of [[o.pA, o.aA, 'A', L('先 Y 后 X', 'Y, then X')], [o.pB, o.aB, 'B', L('先 X 后 Y', 'X, then Y')]]) {
      st.arrow(p, v3.add(p, v3.scale(a, TANG)), { color: P.amber, width: 2.4, glow: 10, headSize: 11, fade: false });
      st.dot(p, 5.5, P.amber, { glow: 12, fade: false });
      if (clock.t > 0.35) { const q = st.p(p), oo = st.p([0, 0, 0]), dx = q[0] - oo[0], l = Math.abs(dx) || 1; st.tag(key, p, txt, 'raw c-am', { dx: 62 * dx / l, dy: 26 }); }
    }
    return o;
  }

  function drawComb(st) {
    const t = clock.t;
    st.line([0, 0, -1.25], [0, 0, 1.25], { color: P.violet, width: 1.4, alpha: 0.85, back: 0.4 });
    for (let th = 15; th < 180; th += 15) for (let ph = 0; ph < 360; ph += 20) {
      const p = v3.sph(th * DEG, ph * DEG), w = field(p), d = st.p(p)[2];
      st.arrow(p, v3.add(p, v3.scale(w, 0.17)), { color: P.cyan, width: 1.3, alpha: d >= 0 ? 0.85 : 0.35, headSize: 5, fade: false });
    }
    const p = combPoint(t), w = field(p);
    st.arc(EX, NP, { color: P.dim, width: 1.2, dash: [3, 4], alpha: 0.7 });
    if (v3.len(w) > 0.02) st.arrow(p, v3.add(p, v3.scale(w, 0.42)), { color: P.amber, width: 2.6, glow: 12, headSize: 12, fade: false });
    st.dot(p, 5.5, P.amber, { glow: 14, fade: false });
    st.tag('v', p, `|v| = ${fix(v3.len(w), 2)}`, 'raw c-am', { dx: 44, dy: 14 });
    for (const [q, key, idx] of [[NP, 'zn', INDEX.n], [SP, 'zs', INDEX.s]]) {
      st.dot(q, 9, P.violet, { ring: true, width: 2.2, fade: false });
      st.tag(key, q, L(`零点 · 指标 +${idx}`, `zero · index +${idx}`), 'raw c-vi', { dx: -78, dy: key === 'zn' ? -8 : 10 });
    }
    return { p, w };
  }

  function drawStage() {
    const st = stage, c = st.begin();
    st.sphere(1, { lat: [0], lon: 0, shade: 0.08, alpha: 0.4 });
    let hudBig = '', hudSub = '';
    if (S.scene === 'loop') {
      const A = drawLoop(st, c), n = LP.n;
      hudBig = L(`回路 · Ω = ${piText(LP.area)}`, `Loop · Ω = ${piText(LP.area)}`);
      hudSub = clock.t >= n - 1e-9
        ? `<span class="c-mg">${L('圈住的面积', 'area enclosed')} Ω</span> · <span class="c-am">${L('箭头转过', 'arrow turned')} ${piText(A.turnU)}</span> = <span class="c-mg">Ω</span> · <span class="c-cy">${L('相位', 'phase')} ${piText(A.phaseU)}</span> = Ω/2`
        : `<span class="c-mg">${L('已扫过', 'swept')} ${piText(A.swept)}</span> · <span class="c-am">${L('箭头转过', 'arrow turned')} ${piText(A.turnU)}</span> · <span class="c-cy">${L('相位', 'phase')} ${piText(A.phaseU)}</span>`;
    } else if (S.scene === 'order') {
      const o = drawOrder(st);
      hudBig = L(`转序 · 相隔 ${degText(Math.acos(clamp(v3.dot(o.pA, o.pB), -1, 1)))}`, `Order · ${degText(Math.acos(clamp(v3.dot(o.pA, o.pB), -1, 1)))} apart`);
      hudSub = o.step === 1 ? L('第一步：各绕一根轴转 90°', 'Step one: a 90° turn about one axis each')
        : L('第二步：点不动，贴在点上的箭头转了', 'Step two: the points stay, the arrows on them turn') + ` ${degText((clock.t - 1) * PI / 2)}`;
    } else {
      const m = drawComb(st);
      hudBig = L(`梳毛 · |v| = ${fix(v3.len(m.w), 2)}`, `Comb · |v| = ${fix(v3.len(m.w), 2)}`);
      hudSub = L('|v| = sin θ：沿经线向北走，箭头越走越短，到北极缩成零', '|v| = sin θ: walking north along a meridian, the arrow shortens and vanishes at the pole');
    }
    st.end();
    $('hudBig').textContent = hudBig; $('hudSub').innerHTML = hudSub;
    const LEG = {
      loop: [['cy', L('回路（大圆弧）', 'the loop (great-circle arcs)')], ['box mg', L('圈住的面积', 'the enclosed area')], ['am', L('沿回路搬运的箭头', 'the arrow carried round')], ['dm', L('虚线：参照箭头', 'dashed: the reference arrow')]],
      order: [['vi', L('转轴 X、Y', 'the axes X and Y')], ['am', L('两种转序下的点与箭头', 'the point and arrow in each order')], ['dm', L('走过的路', 'the road taken')]],
      comb: [['cy', L('箭头场 v(p)：竖直方向的影子', 'the field v(p): shadow of the vertical')], ['vi', L('竖直轴与两个零点', 'the vertical axis and the two zeros')], ['am', L('当前点的箭头', 'the arrow at the current point')]]
    }[S.scene];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }

  /* ---------- strip ---------- */
  function drawPlot() {
    if (S.scene === 'loop') {
      const smp = LP.smp, ys = smp.flatMap((s) => [s.swept, s.turnU, s.phaseU]);
      const lo = Math.min(0, ...ys), hi = Math.max(0.1, ...ys), padY = 0.12 * (hi - lo || 1);
      const g = kit.plot($('plot'), { x: [0, LP.n], y: [lo - padY, hi + padY], pad: [42, 10, 8, 22] });
      const yt = []; for (let k = Math.ceil((lo - padY) / (PI / 2)); k * PI / 2 <= hi + padY; k++) yt.push([k * PI / 2, piText(k * PI / 2)]);
      const xt = []; for (let k = 0; k <= LP.n; k++) xt.push([k, String(k)]);
      g.axes({ yTicks: yt, xTicks: xt });
      g.line(smp.map((s) => [s.t, s.swept]), P.magenta, { width: 2.2 });
      const stride = Math.max(1, Math.round(smp.length / 28));
      for (let i = 0; i < smp.length; i += stride) g.dot(smp[i].t, smp[i].turnU, P.amber, 2.6);
      g.line(smp.map((s) => [s.t, s.phaseU]), P.cyan, { width: 2 });
      g.vline(clock.t, P.amber, { alpha: 0.8 });
      g.legend([[P.magenta, L('扫过的面积', 'area swept')], [P.amber, L('箭头转角（点）', 'arrow turn (dots)')], [P.cyan, L('内积连乘的相位', 'phase of the product')]], LP.area < 0 ? {} : { bottom: true });
      const A = at(clock.t);
      $('plotMeta').textContent = `${piText(A.swept)} · ${piText(A.turnU)} · ${piText(A.phaseU)}`;
      $('plotTitle').innerHTML = `<span class="zh">沿回路：转角跟着面积走，相位只走一半</span><span class="en">Along the loop: the turn keeps up with the area, the phase goes half as far</span>`;
    } else if (S.scene === 'order') {
      const g = kit.plot($('plot'), { x: [0, 2], y: [0, 100], pad: [38, 10, 8, 22] });
      g.axes({ yTicks: [[0, '0°'], [45, '45°'], [90, '90°']], xTicks: [[0, '0'], [1, '1'], [2, '2']] });
      const pts = []; for (let i = 0; i <= 80; i++) { const o = orderAt(i / 40); pts.push([i / 40, Math.acos(clamp(v3.dot(o.pA, o.pB), -1, 1)) / DEG]); }
      g.line(pts, P.cyan, { width: 2.2 });
      g.vline(clock.t, P.amber, { alpha: 0.8 });
      const o = orderAt(clock.t);
      $('plotMeta').textContent = degText(Math.acos(clamp(v3.dot(o.pA, o.pB), -1, 1)));
      $('plotTitle').innerHTML = `<span class="zh">两种转序的点相隔多远</span><span class="en">How far apart the two orders put the point</span>`;
    } else {
      const g = kit.plot($('plot'), { x: [0, 1], y: [0, 1.1], pad: [38, 10, 8, 22] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '+X'], [0.5, '45°'], [1, 'N']] });
      const pts = []; for (let i = 0; i <= 90; i++) pts.push([i / 90, v3.len(field(combPoint(i / 90)))]);
      g.line(pts, P.cyan, { width: 2.2 });
      g.vline(clock.t, P.amber, { alpha: 0.8 });
      g.dot(clock.t, v3.len(field(combPoint(clock.t))), P.amber, 4);
      $('plotMeta').textContent = fix(v3.len(field(combPoint(clock.t))), 2);
      $('plotTitle').innerHTML = `<span class="zh">向北走，箭头还剩多长</span><span class="en">Walking north: how long the arrow still is</span>`;
    }
  }

  /* ---------- readouts ---------- */
  function row(id, dt, dd) { $('dt' + id).innerHTML = dt; $('ro' + id).innerHTML = dd; $('ro' + id).parentElement.hidden = dd == null; }
  function drawText() {
    let note = '';
    if (S.scene === 'loop') {
      const A = at(clock.t), frac = Math.abs(LP.area) / (4 * PI);
      $('dtKey').textContent = L('回路圈住的面积 Ω', 'area enclosed by the loop Ω');
      $('roKey').textContent = piText(LP.area);
      $('roKeySub').textContent = L(` = 整球的 ${fix(frac, 3)}`, ` = ${fix(frac, 3)} of the sphere`);
      $('roAside').textContent = `${LP.n} ${L('个顶点', 'corners')}`;
      row('A', L('此刻：箭头转过 / 已扫过的面积', 'now: arrow turned / area swept'), `${piText(A.turnU)} / ${piText(A.swept)}`);
      row('B', L('相邻内积连乘 Δ 与它的相位', 'product of neighbouring inner products Δ, and its phase'), `${cText(LP.delta, 3)} · arg ${piText(Math.atan2(LP.delta[1], LP.delta[0]))}`);
      row('C', L('相邻两点的内积 ⟨ψₖ, ψₖ₊₁⟩', 'inner products of neighbours ⟨ψₖ, ψₖ₊₁⟩'), LP.overlaps.map((z) => cText(z)).join(' · '));
      row('D', L('它们的模平方', 'their squared moduli'), LP.overlaps.map((z) => fix(z[0] * z[0] + z[1] * z[1], 2)).join(' · '));
      note = clock.t < LP.n - 1e-9 ? L('播放或拖时间轴：品红的扇形扫过多少，琥珀色箭头就比虚线参照多转多少。', 'Play or drag the rail: the amber arrow gets ahead of the dashed reference by as much as the magenta fan has swept.')
        : L(`走回起点：箭头比出发时转了 ${piText(LP.turn)}，等于 Ω；内积连乘的相位是 ${piText(LP.phase)}，Ω 的一半。`, `Back at the start: the arrow has turned by ${piText(LP.turn)} since it set out, which is Ω; the phase of the product is ${piText(LP.phase)}, half of Ω.`);
      $('pillArea').querySelector('strong').textContent = piText(LP.area);
      $('pillTurn').querySelector('strong').textContent = piText(A.turnU);
      $('pillPhase').querySelector('strong').textContent = piText(A.phaseU);
    } else if (S.scene === 'order') {
      const o = orderAt(clock.t), e = orderAt(2), sep = Math.acos(clamp(v3.dot(o.pA, o.pB), -1, 1));
      const vt = (x) => `(${x.map((y) => fix(y, 2)).join(', ')})`;
      $('dtKey').textContent = L('两个点之间的夹角', 'angle between the two points');
      $('roKey').textContent = degText(sep); $('roKeySub').textContent = '';
      $('roAside').textContent = L(`第 ${o.step} 步`, `step ${o.step}`);
      row('A', L('先 Y 后 X 的点', 'point after Y, then X'), vt(o.pA));
      row('B', L('先 X 后 Y 的点', 'point after X, then Y'), vt(o.pB));
      row('C', L('第二步把点挪动了', 'the second step moved the point by'), fix(v3.len(v3.sub(e.pA, orderAt(1).pA)) + v3.len(v3.sub(e.pB, orderAt(1).pB)), 3));
      row('D', L('第二步把箭头转了', 'the second step turned the arrow by'), degText(Math.acos(clamp(v3.dot(e.aA, orderAt(1).aA), -1, 1))));
      note = L('同样两次 90° 的转动，换个次序就停在不同的地方：+X 与 −Y 相隔 90°。', 'The same two 90° turns in the other order end somewhere else: +X and −Y are 90° apart.');
      $('pillArea').querySelector('strong').textContent = '—';
      $('pillTurn').querySelector('strong').textContent = degText(sep);
      $('pillPhase').querySelector('strong').textContent = '—';
    } else {
      const p = combPoint(clock.t), w = field(p), th = Math.acos(clamp(p[2], -1, 1));
      $('dtKey').textContent = L('箭头长度 |v| = sin θ', 'arrow length |v| = sin θ');
      $('roKey').textContent = fix(v3.len(w), 3); $('roKeySub').textContent = '';
      $('roAside').textContent = 'v(p) = e₃ − (p·e₃)p';
      row('A', L('当前点离北极的角 θ', 'angle θ of the point from the North Pole'), degText(th));
      row('B', L('在 +X 处的箭头', 'the arrow at +X'), `(${field(EX).map((y) => fix(y, 0)).join(', ')})`);
      row('C', L('零点的指标（北、南）与它们的和', 'indices of the zeros (north, south) and their sum'), `${INDEX.n} + ${INDEX.s} = ${INDEX.n + INDEX.s}`);
      row('D', '', null);
      note = L('这一场箭头只在两极为零；想把它改成处处不为零是做不到的（毛球定理，文献结果）。', 'This field vanishes only at the poles; no change will make it nonzero everywhere (hairy ball theorem, a literature result).');
      $('pillArea').querySelector('strong').textContent = '—';
      $('pillTurn').querySelector('strong').textContent = '—';
      $('pillPhase').querySelector('strong').textContent = '—';
    }
    $('roNote').textContent = note;
    $('loopPanel').hidden = S.scene !== 'loop';
    $('addV').disabled = S.scene !== 'loop' || LP.n >= 6;
    $('delV').disabled = S.scene !== 'loop' || LP.n <= 3;
  }

  const paint = kit.painter(() => { drawStage(); drawPlot(); drawText(); }, [$('stage'), $('plot')]);

  /* ---------- controls ---------- */
  const MAX = () => (S.scene === 'loop' ? LP.n : S.scene === 'order' ? 2 : 1);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 3, rate: 1, step: 1,
    format: (t, max) => (S.scene === 'loop' ? L(`第 ${fix(t, 2)} 段 <small>/ 共 ${max} 段</small>`, `edge ${fix(t, 2)} <small>/ ${max}</small>`)
      : S.scene === 'order' ? L(`第 ${fix(t, 2)} 步 <small>/ 2</small>`, `step ${fix(t, 2)} <small>/ 2</small>`)
        : L(`θ = ${fix(90 * (1 - t), 0)}°`, `θ = ${fix(90 * (1 - t), 0)}°`)),
    onChange: () => paint()
  });
  function setScene(sc, quiet) {
    S.scene = sc; sceneChips.set(sc, true);
    clock.pause(); clock.step = sc === 'comb' ? 1 / 6 : 1; clock.rate = sc === 'comb' ? 0.4 : sc === 'order' ? 0.8 : 0.9;
    clock.setMax(MAX(), true); if (!quiet) clock.set(0);
  }
  /** A new loop; `full` shows it walked all the way round. */
  function setLoop(V, full) {
    build(V); S.V = V;
    if (S.scene !== 'loop') setScene('loop', true);
    clock.pause(); clock.setMax(LP.n, true); clock.set(full ? LP.n : Math.min(clock.t, LP.n));
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { cards.mark(null); setScene(v); paint(); });
  const addCorner = () => { if (S.scene !== 'loop' || LP.n >= 6) return; cards.mark(null); const V = LP.V.slice(); V.push(v3.slerp(V[V.length - 1], V[0], 0.5)); setLoop(V, true); };
  const delCorner = () => { if (S.scene !== 'loop' || LP.n <= 3) return; cards.mark(null); setLoop(LP.V.slice(0, -1), true); };
  const reverse = () => { if (S.scene !== 'loop') return; cards.mark(null); setLoop([LP.V[0], ...LP.V.slice(1).reverse()], true); };
  $('addV').addEventListener('click', addCorner);
  $('delV').addEventListener('click', delCorner);
  $('revV').addEventListener('click', reverse);
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ r: reverse });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    order: { scene: 'order', view: [-PI / 4, 0.45], still: 2 },
    octant: { scene: 'loop', V: [NP, EX, EY], view: [-3 * PI / 4, 0.5], still: 'end' },
    equator: { scene: 'loop', V: [EX, EY, v3.scale(EX, -1), v3.scale(EY, -1)], view: [-3 * PI / 4, 0.72], still: 'end' },
    reverse: { scene: 'loop', V: [NP, EY, EX], view: [-3 * PI / 4, 0.5], still: 'end' },
    comb: { scene: 'comb', view: [-PI / 4, 0.32], still: 1 }
  };
  const NOTES = {
    order: ['从北极出发，同样两次 90° 转动：先绕 Y 再绕 X 的琥珀点停在 +X，先绕 X 再绕 Y 的停在 −Y。第二步里两个点都不动，贴在点上的琥珀色箭头却各转了 90°。', 'From the North Pole, the same two 90° turns: the amber point turned about Y and then X ends at +X, the one turned about X and then Y ends at −Y. In the second step neither point moves, but the amber arrow attached to each turns by 90°.'],
    octant: ['青色的回路 N → +X → +Y → N 圈住八分之一球，品红面积 Ω = π/2。琥珀色的箭头沿回路搬一圈，回到 N 时比虚线的出发方向转了 π/2；右下角青色的指针停在 π/4，是这块面积的一半。', 'The cyan loop N → +X → +Y → N encloses an eighth of the sphere, a magenta area Ω = π/2. The amber arrow carried once round comes back to N turned by π/2 from the dashed direction it set out in; the cyan needle at the lower right stops at π/4, half that area.'],
    equator: ['沿赤道走一圈：品红面积是整个北半球 2π。琥珀色箭头回到 +X 时与虚线重合，看上去没转，其实转满了一周（品红的整圆）；右下角青色的指针停在 π，四个相邻内积都是 (1 + i)/2。', 'Once round the equator: the magenta area is the whole northern hemisphere, 2π. The amber arrow comes back to +X on top of the dashed one, as if it had not turned, yet it has turned a full circle (the full magenta disc); the cyan needle at the lower right stops at π, and all four neighbouring inner products are (1 + i)/2.'],
    reverse: ['同一个三角形反着走 N → +Y → +X → N：品红面积一样大，琥珀色箭头却往另一边转 π/2，右下角青色的指针停在 −π/4。', 'The same triangle walked the other way, N → +Y → +X → N: the magenta area is just as large, but the amber arrow turns π/2 the other way and the cyan needle at the lower right stops at −π/4.'],
    comb: ['青色的箭头是竖直方向在球面上的影子。琥珀色的点从 +X 沿经线向北走，箭头越来越短，到北极缩成零；紫色圈出的南北两极是这场箭头仅有的两个零点。', 'The cyan arrows are the shadow of the vertical direction on the sphere. The amber point walks north along a meridian from +X; its arrow shortens and vanishes at the North Pole. The two poles circled in violet are the only zeros of the field.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    if (p.V) build(p.V.map((x) => x.slice()));
    setScene(p.scene, true);
    if (booting || TRV.still) { stage.cam.yaw = p.view[0]; stage.cam.pitch = p.view[1]; stage.cam.zoom = 1; } else stage.view(p.view, 600);
    const still = p.still === 'end' ? MAX() : p.still;
    clock.set(0);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(still);
    else if (booting) kit.autoplay(clock, $('stage'));
    else clock.play();
    paint();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动青色的顶点、加减顶点、反着走，或换一个场景。随时可以再选一张卡。', 'Free play: drag the cyan corners, add or remove one, reverse the loop, or change the scene. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.BERRY_DEBUG = {
    get state() {
      const base = { scene: S.scene, preset: cards.current, t: clock.t, max: clock.max, playing: clock.playing };
      if (S.scene === 'loop') {
        const A = at(clock.t);
        return Object.assign(base, { V: LP.V.map((x) => x.slice()), n: LP.n, c: LP.c.slice(), u0: LP.u0.slice(), p: A.p, v: A.v, ref: A.ref, swept: A.swept, turn: A.turnU, phase: A.phaseU,
          area: LP.area, turnTotal: LP.turn, phaseTotal: LP.phase, endArrow: LP.vs[LP.n], delta: LP.delta.slice(), overlaps: LP.overlaps.map((z) => z.slice()) });
      }
      if (S.scene === 'order') { const o = orderAt(clock.t); return Object.assign(base, { pA: o.pA, aA: o.aA, pB: o.pB, aB: o.aB, u0: U0.slice() }); }
      const p = combPoint(clock.t);
      return Object.assign(base, { p, v: field(p), indices: [INDEX.n, INDEX.s] });
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of corner k of the loop (for pointer tests). */
    corner: (k) => { const q = stage.p(LP.V[k]), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; },
    /** Viewport coordinates of a world point. */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; },
    /** The point of the sphere under the viewport position (x, y). */
    under: (x, y) => stage.pick({ clientX: x, clientY: y })
  };
  window.TRV_THUMB = () => { cards.pick('octant'); stage.cam.yaw = -3 * PI / 4; stage.cam.pitch = 0.5; clock.pause(); clock.set(LP.n); paint.now(); };
  build(S.V);
  cards.pick(cards.initial('octant'));
  booting = false;
  paint();
})();
