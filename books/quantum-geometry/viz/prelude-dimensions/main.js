/* PRELUDE//SHADOWS · 维度的影子: the four blind spots of the prelude as pictures a reader can push.
   One canvas, one rail, four scenes (the rail drives one quantity in each situation):
     ray     a ray of length 1 stays put while the eye goes round it; the retina (a parallel projection) keeps sin α
     disc    the turntable from the top and edge-on: the post at (cos θ, sin θ), its shadow x = cos θ on the segment
             that is the whole disc seen edge-on; with two posts (θ = 90° + δ and 270° + δ) one shadow position hides
             two opposite velocities. The turn is shown as θ, as in the prelude; the probe keeps its field name phi
     sphere  lat: a circle of latitude (fixed θ, φ on the rail); lift: the old unit circle as the equator of a new
             sphere, a point lifted along a meridian at radius 1; mean: six opposite directions mixed towards equal
             weights, the weighted mean falling to the centre
     cobweb  θₖ₊₁ = cos θₖ from θ₀ = 1, drawn as a cobweb between y = cos θ and y = θ (radians on both axes)
   Geometric analogies and numerical illustrations: no Lean theorem is cited, nothing here is a proof.
   Colours: cyan = line, shadow, what stays inside; magenta = face, area; amber = the current state / step only;
   violet = the new axis. Read-only probe for the browser suite: window.PRELUDE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, v3, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, TAU = 2 * Math.PI, MINUS = '−';
  const LW = TRV.thumbMode ? 2 : 1;                  // the wordless cover is read at card size: thicker strokes
  const mod360 = (a) => ((a % 360) + 360) % 360;
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map((d) => SUBS[+d]).join('');

  /* ---------- geometry: what the page draws and claims (the suite recomputes it another way) ---------- */
  const D_EYE = 1.45, D_RET = 1.67, RET_HALF = 0.62;
  /** The ray from P0 to P1 (length 1, along x) and an eye at angle α from its axis, with its retina. */
  function rayGeo(aDeg) {
    const a = aDeg * DEG, u = [Math.cos(a), Math.sin(a)], r = [-Math.sin(a), Math.cos(a)];
    const P0 = [-0.5, 0], P1 = [0.5, 0], C = [D_RET * u[0], D_RET * u[1]];
    const s = (p) => p[0] * r[0] + p[1] * r[1];
    const I0 = [C[0] + s(P0) * r[0], C[1] + s(P0) * r[1]], I1 = [C[0] + s(P1) * r[0], C[1] + s(P1) * r[1]];
    return { alpha: aDeg, P0, P1, rayLen: Math.hypot(P1[0] - P0[0], P1[1] - P0[1]), eye: [D_EYE * u[0], D_EYE * u[1]], gaze: [-u[0], -u[1]],
      retina: { center: C, dir: r, half: RET_HALF }, image: [I0, I1], imageLen: Math.hypot(I1[0] - I0[0], I1[1] - I0[1]) };
  }
  const ARROW = 0.42;                                 // a speed of 1 (unit radius, unit angular speed) is drawn this long
  /** A post on the unit circle at the turn θ (degrees; the probe field is phi), turning anticlockwise, and its edge-on
      shadow; velocities are per radian of turn, i.e. in units of the speed of the post. */
  function postGeo(phiDeg) {
    const f = phiDeg * DEG, p = [Math.cos(f), Math.sin(f)], v = [-Math.sin(f), Math.cos(f)];
    return { phi: phiDeg, post: p, vel: v, speed: Math.hypot(v[0], v[1]), shadow: p[0], shadowVel: v[0] };
  }
  const pairGeo = (dDeg) => ({ delta: dDeg, a: postGeo(90 + dDeg), b: postGeo(270 + dDeg) });
  function latGeo(thDeg, phDeg) {
    const th = thDeg * DEG;
    return { theta: thDeg, phi: phDeg, point: v3.sph(th, phDeg * DEG), normal: [0, 0, 1], offset: Math.cos(th), radius: Math.sin(th),
      length: TAU * Math.sin(th), great: Math.abs(Math.cos(th)) < 1e-9 };
  }
  const LIFT_AZ = 70;                                 // the meridian the lifted point climbs (degrees of azimuth)
  function liftGeo(etaDeg) {
    const e = etaDeg * DEG, base = [Math.cos(LIFT_AZ * DEG), Math.sin(LIFT_AZ * DEG), 0];
    const point = v3.add(v3.scale(base, Math.cos(e)), [0, 0, Math.sin(e)]);
    return { eta: etaDeg, base, point, norm: v3.len(point), height: point[2], poles: [[0, 0, 1], [0, 0, -1]] };
  }
  const AXES6 = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const AXES6_NAMES = ['+x', '−x', '+y', '−y', '+z', '−z'];
  /** Weights spread linearly from all on +z (w = 0) to 1/6 each (w = 1); m is the weighted mean of the six. */
  function meanGeo(w) {
    const weights = AXES6.map((d) => w / 6 + (d[2] === 1 ? 1 - w : 0));
    const mean = AXES6.reduce((s, d, i) => v3.add(s, v3.scale(d, weights[i])), [0, 0, 0]);
    return { w, weights, dirs: AXES6.map((d) => d.slice()), mean, len: v3.len(mean) };
  }
  const COB_MAX = 12, THETA0 = 1, THETA_STAR = 0.7390851332151607;   // θ*: the literature value, drawn for reference
  const SEQ = [THETA0];
  for (let k = 0; k < COB_MAX; k++) SEQ.push(Math.cos(SEQ[k]));
  /** The cobweb up to rail time t: whole steps, then the part of the next one (up to the curve, across to the diagonal). */
  function cobGeo(t) {
    const k = clamp(Math.floor(t + 1e-9), 0, COB_MAX), f = t - k;
    const pts = [[SEQ[0], 0]];
    for (let j = 1; j <= k; j++) pts.push([SEQ[j - 1], SEQ[j]], [SEQ[j], SEQ[j]]);
    if (k < COB_MAX && f > 1e-9) {
      const A = pts[pts.length - 1], B = [SEQ[k], SEQ[k + 1]], C = [SEQ[k + 1], SEQ[k + 1]];
      pts.push(f <= 0.5 ? [A[0], A[1] + (B[1] - A[1]) * 2 * f] : B);
      if (f > 0.5) pts.push([B[0] + (C[0] - B[0]) * (2 * f - 1), B[1]]);
    }
    return { k, theta: SEQ[k], seq: SEQ.slice(0, k + 1), residual: Math.abs(Math.cos(SEQ[k]) - SEQ[k]), path: pts, thetaStar: THETA_STAR };
  }

  /* ---------- state and the rail ---------- */
  const S = { scene: 'disc', disc: 'one', sphere: 'lat', theta: 50 };
  const mode = () => (S.scene === 'disc' ? S.disc : S.scene === 'sphere' ? S.sphere : S.scene === 'ray' ? 'ray' : 'cob');
  const TWO_D = new Set(['ray', 'one', 'pair', 'cob']);
  const MODES = {
    ray: { max: 90, rate: 30, step: 15, start: 45, sym: 'α' },
    one: { max: 360, rate: 60, step: 15, start: 60, sym: 'θ' },
    pair: { max: 45, rate: 15, step: 5, start: 0, sym: 'δ' },
    lat: { max: 360, rate: 60, step: 15, start: 45, sym: 'φ' },
    lift: { max: 90, rate: 30, step: 15, start: 60, sym: 'η' },
    mean: { max: 1, rate: 0.3, step: 0.1, start: 1, sym: 'w' },
    cob: { max: COB_MAX, rate: 1.2, step: 1, start: 6, sym: 'k' }
  };
  const railText = (m, t) => (m === 'mean' ? `w ${fix(100 * t, 0)}%` : m === 'cob' ? `k ${Math.floor(t + 1e-9)}` : `${MODES[m].sym} ${fix(t, 0)}°`);
  const CAM = [-1.9, 0.34];

  /* ---------- stage labels (DOM, so that they stay crisp, translate and never get drawn over) ---------- */
  const stageEl = $('stage');
  let tagBox = stageEl.querySelector('.tags');
  if (!tagBox) { tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox); }
  const tagMap = new Map();
  let tagUsed = new Set();
  /** Put label `key` at canvas pixel (x, y): align left | right | center, base top | bottom | middle; kept inside the stage. */
  function tag(key, x, y, html, cls, o) {
    o = o || {};
    let t = tagMap.get(key);
    if (!t) { t = document.createElement('div'); tagMap.set(key, t); tagBox.appendChild(t); }
    kit.setTag(t, html, cls);
    t.hidden = false; tagUsed.add(key);
    const W = $('cv').clientWidth, H = $('cv').clientHeight, w = t.offsetWidth, h = t.offsetHeight;
    let left = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
    let top = o.base === 'top' ? y : o.base === 'bottom' ? y - h : y - h / 2;
    left = clamp(left, 6, Math.max(6, W - w - 6)); top = clamp(top, 4, Math.max(4, H - h - 4));
    t.style.transform = `translate(${left.toFixed(1)}px, ${top.toFixed(1)}px)`;
    t.style.opacity = o.dim ? '0.45' : '1';
    return t;
  }
  function endTags() { tagMap.forEach((t, k) => { if (!tagUsed.has(k)) t.hidden = true; }); tagUsed = new Set(); }

  /** The free band of the stage between the title row (title block, scene buttons) and the legend, in canvas pixels. */
  function band() {
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight;
    if (TRV.thumbMode) return { W, H, top: 26, bottom: H - 26 };
    const b = cv.getBoundingClientRect();
    const rel = (el) => { if (!el || !el.getClientRects().length) return null; const r = el.getBoundingClientRect(); return r.height < 1 ? null : { t: r.top - b.top, b: r.bottom - b.top }; };
    let top = 10;
    for (const el of [$('hudTl'), $('sceneChips')]) { const r = rel(el); if (r && r.b > top && r.b < H * 0.5) top = r.b; }
    let bottom = H - 8;
    for (const c of $('legend').children) { const r = rel(c); if (r && r.t > H * 0.5 && r.t < bottom) bottom = r.t; }
    return { W, H, top: top + 8, bottom: bottom - 6 };
  }

  /* ---------- the 3D stage (sphere scenes); the 2D scenes take the same canvas and keep the pointer ---------- */
  const S3 = { canvas: $('cv'), yaw: CAM[0], pitch: CAM[1], radius: 0.36, cx: 0.5, cy: 0.5, wheel: false,
    onChange: () => paint(), onPick: (ev, st) => pick(ev, st), onDrag: (ev, st) => dragTo(ev, st), onDrop: () => { drag = null; } };
  const st = kit.stage3(stageEl, S3);
  let view = null, geo = null;                         // the last 2D mapping; the last geometry drawn

  /* ---------- drawing: the ray ---------- */
  function drawRay(t) {
    const G = rayGeo(t), bd = band(), bh = bd.bottom - bd.top;
    const X0 = -0.75, X1 = 2.0, Y0 = -0.72, Y1 = 1.98;
    const u = Math.min((bd.W - 24) / (X1 - X0), bh / (Y1 - Y0));
    const cx = (bd.W - u * (X1 + X0)) / 2, cy = bd.top + (bh - u * (Y1 - Y0)) / 2 + u * Y1;   // pixel of the origin
    const g = view = kit.plot($('cv'), { x: [-cx / u, (bd.W - cx) / u], y: [(cy - bd.H) / u, cy / u], pad: [0, 0, 0, 0] });
    const lw = (w) => w * LW, ret = G.retina, at = (c, d, k) => [c[0] + d[0] * k, c[1] + d[1] * k];
    // the quarter circle the eye travels, faint
    const path = []; for (let i = 0; i <= 45; i++) path.push([D_EYE * Math.cos(i * 2 * DEG), D_EYE * Math.sin(i * 2 * DEG)]);
    g.line(path, P.lineHot, { width: lw(1), dash: [3, 5] });
    // projectors: parallel to the line of sight, from both ends of the ray to the retina
    g.line([G.P0, G.image[0]], P.dim, { width: lw(1), dash: [4, 4], alpha: 0.8 });
    g.line([G.P1, G.image[1]], P.dim, { width: lw(1), dash: [4, 4], alpha: 0.8 });
    // the line of sight (amber: the current way of looking) and the angle α at the ray
    g.line([G.eye, [0, 0]], P.amber, { width: lw(1.4), dash: [6, 4], alpha: 0.85 });
    const arc = []; for (let i = 0; i <= 30; i++) arc.push([0.3 * Math.cos(t * DEG * i / 30), 0.3 * Math.sin(t * DEG * i / 30)]);
    if (t > 0.5) g.line(arc, P.amber, { width: lw(1.6) });
    // the retina, the dashed length 1 on it, and the image (the shadow of the ray)
    g.line([at(ret.center, ret.dir, -ret.half), at(ret.center, ret.dir, ret.half)], P.lineHot, { width: lw(5), alpha: 0.9 });
    g.line([at(ret.center, ret.dir, -0.5), at(ret.center, ret.dir, 0.5)], P.cyan, { width: lw(1), dash: [2, 4], alpha: 0.55 });
    g.line(G.image, P.cyan, { width: lw(5), glow: 12 });
    g.dot(G.image[0][0], G.image[0][1], P.cyan, 4 * LW, { glow: 10 }); g.dot(G.image[1][0], G.image[1][1], P.cyan, 4 * LW, { glow: 10 });
    // the eye: a pupil looking along the gaze, and a lid drawn round it
    const E = G.eye, gz = G.gaze, nx = -gz[1], ny = gz[0], lid = [];
    for (let i = 0; i <= 20; i++) { const s = -1 + i / 10; const w = 0.13 * (1 - s * s); lid.push([E[0] + gz[0] * 0.16 * s + nx * w, E[1] + gz[1] * 0.16 * s + ny * w]); }
    for (let i = 20; i >= 0; i--) { const s = -1 + i / 10; const w = 0.13 * (1 - s * s); lid.push([E[0] + gz[0] * 0.16 * s - nx * w, E[1] + gz[1] * 0.16 * s - ny * w]); }
    g.line(lid, P.amber, { width: lw(1.4) });
    g.dot(E[0], E[1], P.amber, 5 * LW, { glow: 12 });
    // the ray itself: light from P0 towards P1, the same length at every α
    g.arrow(G.P0, G.P1, { color: P.cyan, width: lw(4), glow: 10, headSize: 13 * LW });
    g.dot(G.P0[0], G.P0[1], P.cyan, 4 * LW);
    if (!TRV.thumbMode) {
      const X = g.X, Y = g.Y;
      tag('ray', X(0), Y(0) + 14, L('射线 · 长度 1', 'ray · length 1'), 'lbl cy', { base: 'top' });
      const out = at(ret.center, [Math.cos(t * DEG), Math.sin(t * DEG)], 0.16), side = Math.cos(t * DEG) > 0.62;
      tag('img', X(out[0]) + (side ? 8 : 0), Y(out[1]) - (side ? 0 : 8), `sin α = ${fix(G.imageLen, 2)}`, 'num c-cy backed', side ? { align: 'left' } : { base: 'bottom' });
      const mid = (t / 2) * DEG;
      tag('alpha', X(0.44 * Math.cos(mid)), Y(0.44 * Math.sin(mid)), `α = ${fix(t, 0)}°`, 'num c-am', { align: 'left', base: 'bottom' });
      // the eye: on the clockwise side of the line of sight, away from the label of the image
      const cw = [Math.sin(t * DEG), -Math.cos(t * DEG)];
      tag('eye', X(E[0] + 0.24 * cw[0]), Y(E[1] + 0.24 * cw[1]), L('眼睛', 'eye'), 'lbl hot', t < 45 ? { base: 'top' } : { align: 'left' });
    }
    geo = G;
  }

  /* ---------- drawing: the turntable from the top and edge-on ---------- */
  const GAP = 0.55, SEG_Y = -(1 + GAP);
  function discLayout() {
    const bd = band(), bh = bd.bottom - bd.top, top = TRV.thumbMode ? 4 : 26, bot = TRV.thumbMode ? 6 : 46;
    const u = Math.max(30, Math.min((bh - top - bot) / (1.1 + 1 + GAP), (bd.W - 28) / 2.9, 230));
    const extra = Math.max(0, bh - top - bot - u * (2.1 + GAP));
    const cy = bd.top + top + extra / 2 + u * 1.1, cx = bd.W / 2;
    return { bd, u, cx, cy };
  }
  function drawDisc(t) {
    const pair = S.disc === 'pair', { bd, u, cx, cy } = discLayout();
    const g = view = kit.plot($('cv'), { x: [-cx / u, (bd.W - cx) / u], y: [(cy - bd.H) / u, cy / u], pad: [0, 0, 0, 0] });
    const lw = (w) => w * LW, X = g.X, Y = g.Y;
    const circle = []; for (let i = 0; i <= 120; i++) circle.push([Math.cos(i * 3 * DEG), Math.sin(i * 3 * DEG)]);
    // the disc from the top (a face) and the same disc edge-on (a segment that does not move)
    g.poly(circle, pair ? P.sigma : P.magenta, { alpha: pair ? 0.05 : 0.1 });
    g.line(circle, pair ? P.lineHot : P.magenta, { width: lw(1.6), alpha: pair ? 0.9 : 0.6 });
    g.line([[0, 0], [1.08, 0]], P.lineHot, { width: lw(1), dash: [2, 4] });
    for (const d of [0, 90, 180, 270]) { const c = Math.cos(d * DEG), s = Math.sin(d * DEG); g.line([[0.94 * c, 0.94 * s], [1.06 * c, 1.06 * s]], P.dim, { width: lw(1.2) }); }
    g.line([[-1, SEG_Y], [1, SEG_Y]], pair ? P.dim : P.cyan, { width: lw(pair ? 3 : 4.5), glow: pair ? 0 : 10 });
    for (const x of [-1, 0, 1]) g.line([[x, SEG_Y - 0.07], [x, SEG_Y + 0.07]], P.dim, { width: lw(1.2) });
    if (!TRV.thumbMode) {
      // degree marks beside the four ticks (90° beside its tick: the row label sits above the disc)
      for (const [d, x, y, al, base] of [[0, 1.13, 0, 'left', 'middle'], [90, 0.05, 1.0, 'left', 'top'], [180, -1.13, 0, 'right', 'middle'], [270, -0.05, -1.0, 'right', 'bottom']]) {
        g.text(x, y, `${d}°`, P.dim, { align: al, base, size: 10, dx: al === 'right' ? -3 : 3, dy: base === 'top' ? 4 : base === 'bottom' ? -4 : 0 });
      }
      for (const x of [-1, 0, 1]) g.text(x, SEG_Y, x < 0 ? MINUS + '1' : String(x), P.dim, { align: 'center', base: 'top', dy: 0.07 * u + 3, size: 10 });
    }
    const one = (G, col, key) => {
      const [px, py] = G.post, tip = [px + ARROW * G.vel[0], py + ARROW * G.vel[1]], sx = G.shadow, stip = sx + ARROW * G.shadowVel;
      g.line([[px, py], [sx, SEG_Y]], col, { width: lw(1.1), dash: [5, 4], alpha: 0.75 });           // the shadow is the post with its depth removed
      g.line([tip, [stip, SEG_Y]], col, { width: lw(1), dash: [2, 4], alpha: 0.4 });                    // and its velocity is the shadow of the velocity
      if (!pair) g.line([[0, 0], [px, py]], col, { width: lw(2), alpha: 0.9 });
      g.arrow([px, py], tip, { color: col, width: lw(2.2), headSize: 9 * LW });
      g.dot(px, py, col, 7 * LW, { glow: 12 });
      if (Math.abs(ARROW * G.shadowVel) * u > 0.5) g.arrow([sx, SEG_Y], [stip, SEG_Y], { color: col, width: lw(3), headSize: 10 * LW, glow: 8 });
      return { key, sx };
    };
    if (pair) {
      const G = pairGeo(t);
      one(G.a, P.cyan, 'a'); one(G.b, P.magenta, 'b');
      g.dot(G.b.shadow, SEG_Y, P.magenta, 10 * LW, { ring: true, width: 2 * LW });
      g.dot(G.a.shadow, SEG_Y, P.cyan, 6 * LW, { glow: 10 });
      geo = G;
    } else {
      const G = postGeo(t);
      const arc = []; for (let i = 0; i <= 40; i++) arc.push([0.24 * Math.cos(t * DEG * i / 40), 0.24 * Math.sin(t * DEG * i / 40)]);
      if (t > 0.5) g.line(arc, P.amber, { width: lw(1.4), alpha: 0.85 });
      one(G, P.amber, 'p');
      g.dot(G.shadow, SEG_Y, P.amber, 7 * LW, { glow: 12 });
      geo = G;
    }
    if (!TRV.thumbMode) {
      const yTop = Y(1.1) - 4, yBot = Y(SEG_Y) + 0.07 * u + 20;
      tag('top', X(0), yTop, L('俯视：木桩绕圆走', 'top view: the post goes round'), 'lbl ink', { base: 'bottom' });
      tag('side', X(0), yBot, L('侧视：只剩左右位置', 'side view: only left and right remain'), 'lbl ink', { base: 'top' });
      if (pair) {
        const d = geo.delta, same = d < 0.5;
        tag('say', X(0), Y(SEG_Y) - 0.3 * u, same ? L('影子位置相同，下一步却相反', 'same shadow position, opposite next step') : L('往前一点，两个影子就分开', 'a little further on, the shadows part'), 'say backed', { base: 'bottom' });
      } else {
        const G = geo;
        tag('x', X(G.shadow), Y(SEG_Y) - 12, `x = ${sgn(G.shadow, 2)}`, 'num c-am backed', { base: 'bottom' });
        const mid = (t / 2) * DEG;
        if (t > 8) tag('phi', X(0.36 * Math.cos(mid)), Y(0.36 * Math.sin(mid)), 'θ', 'num c-am');
      }
    }
  }

  /* ---------- drawing: the sphere scenes ---------- */
  function fitSphere(reach) {
    const bd = band(), bh = bd.bottom - bd.top, m = Math.min(bd.W, bd.H);
    const px = Math.max(30, Math.min(bd.W * 0.42 / reach, (bh / 2 - 14) / reach));
    S3.cx = 0.5; S3.cy = (bd.top + bh / 2) / bd.H; S3.radius = px / m;
  }
  /** The screen side of the sphere on the left (−R) or right (+R) of the camera: the azimuth there. */
  const sideAz = (s) => { const y = st.cam.yaw; return s < 0 ? Math.atan2(Math.sin(y), -Math.cos(y)) : Math.atan2(-Math.sin(y), Math.cos(y)); };
  const ringPts = (c, r, n) => { const out = []; for (let i = 0; i < n; i++) { const a = TAU * i / n; out.push([c[0] + r * Math.cos(a), c[1] + r * Math.sin(a), c[2]]); } return out; };
  function screenTag(key, v, html, cls, o) { const q = st.p(v); tag(key, q[0] + ((o && o.dx) || 0), q[1] + ((o && o.dy) || 0), html, cls, Object.assign({ dim: q[2] < -0.05 }, o)); }

  function drawLat(phi) {
    const G = latGeo(S.theta, phi);
    fitSphere(1.18); st.begin();
    st.sphere(1, { lat: [], lon: 2, alpha: 0.35 });
    st.poly(ringPts([0, 0, 0], 1, 72), { fill: P.magenta, alpha: 0.05 });
    st.circle([0, 0, 0], [0, 0, 1], 1, { color: P.magenta, width: 1.8 * LW, back: 0.35 });
    st.line([0, 0, -1.18], [0, 0, 1.18], { color: P.dim, width: 1, dash: [3, 4], fade: false });
    if (G.radius > 1e-3) {
      st.poly(ringPts([0, 0, G.offset], G.radius, 72), { fill: P.cyan, alpha: 0.08 });
      st.circle([0, 0, G.offset], [0, 0, 1], G.radius, { color: P.cyan, width: 2.6 * LW, back: 0.35 });
    }
    st.dot([0, 0, 0], 3, P.dim, { fade: false });
    st.dot([0, 0, G.offset], 3, P.cyan, { fade: false });
    st.line([0, 0, 0], G.point, { color: P.amber, width: 1.4 * LW, alpha: 0.8 });
    st.dot(G.point, 6.5, P.amber, { glow: 12 });
    st.end();
    if (!TRV.thumbMode) {
      const l = sideAz(-1), r = sideAz(1);
      screenTag('lat', [G.radius * Math.cos(l), G.radius * Math.sin(l), G.offset], L(`纬圈 θ = ${fix(S.theta, 0)}°`, `latitude θ = ${fix(S.theta, 0)}°`), 'lbl cy', { align: 'right', dx: -10, dim: false });
      screenTag('eq', [Math.cos(r), Math.sin(r), 0], L('赤道 = 大圆', 'equator = great circle'), 'lbl mg', { align: 'left', dx: 10, dim: false });
    }
    geo = G;
  }
  function drawLift(eta) {
    const G = liftGeo(eta);
    fitSphere(1.3); st.begin();
    st.sphere(1, { lat: [], lon: 3, alpha: 0.32 });
    st.poly(ringPts([0, 0, 0], 1, 72), { fill: P.cyan, alpha: 0.05 });
    st.circle([0, 0, 0], [0, 0, 1], 1, { color: P.cyan, width: 2.8 * LW, back: 0.4 });
    st.line([0, 0, -1.3], [0, 0, 1.3], { color: P.violet, width: 1.6 * LW, fade: false });
    for (const p of G.poles) st.dot(p, 5.5, P.violet, { fade: false, glow: 8 });
    const mer = []; for (let i = 0; i <= 45; i++) { const e = i * 2 * DEG; mer.push(v3.add(v3.scale(G.base, Math.cos(e)), [0, 0, Math.sin(e)])); }
    st.path(mer, { color: P.amber, width: 1.2 * LW, dash: [3, 4], alpha: 0.6 });
    const done = mer.slice(0, Math.max(1, Math.round(eta / 2)) + 1); done[done.length - 1] = G.point;
    st.path(done, { color: P.amber, width: 2.2 * LW });
    st.line([0, 0, 0], G.base, { color: P.cyan, width: 1.4 * LW, alpha: 0.7 });
    st.line([0, 0, 0], G.point, { color: P.amber, width: 2.2 * LW });
    st.dot(G.point, 6.5, P.amber, { glow: 12 });
    st.end();
    if (!TRV.thumbMode) {
      screenTag('np', [0, 0, 1], '+e₃', 'num c-vi', { align: 'left', dx: 12, dim: false });
      screenTag('sp', [0, 0, -1], MINUS + 'e₃', 'num c-vi', { align: 'left', dx: 12, dim: false });
      const l = sideAz(-1);
      screenTag('old', [Math.cos(l), Math.sin(l), 0], L('旧圆 = 新赤道', 'old circle = new equator'), 'lbl cy', { align: 'right', dx: -10, dim: false });
      screenTag('one', v3.scale(G.point, 0.55), L('半径仍是 1', 'radius still 1'), 'num c-am backed', { align: 'right', dx: -12, dim: false });
    }
    geo = G;
  }
  function drawMean(w) {
    const G = meanGeo(w);
    fitSphere(1.22); st.begin();
    st.sphere(1, { lat: [0], lon: 2, alpha: 0.3 });
    const order = G.dirs.map((d, i) => i).sort((a, b) => st.p(G.dirs[a])[2] - st.p(G.dirs[b])[2]);
    for (const i of order) {
      const wi = G.weights[i];
      st.arrow([0, 0, 0], G.dirs[i], { color: P.cyan, width: (1 + 6 * wi) * LW, alpha: 0.25 + 0.75 * Math.sqrt(wi), headSize: 8 + 6 * Math.sqrt(wi) });
    }
    if (G.len * st.unit > 2) st.arrow([0, 0, 0], G.mean, { color: P.amber, width: 3.2 * LW, glow: 10, fade: false });
    st.dot(G.mean, 6.5, P.amber, { glow: 12, fade: false });
    st.end();
    if (!TRV.thumbMode) {
      G.dirs.forEach((d, i) => screenTag('ax' + i, v3.scale(d, 1.17), AXES6_NAMES[i], 'num', {}));
      screenTag('m', G.mean, L('均值', 'mean'), 'lbl hot backed', { align: 'left', dx: 12, dy: 10, dim: false });
    }
    geo = G;
  }

  /* ---------- drawing: the cosine cobweb (radians on both axes) ---------- */
  function drawCob(t) {
    const G = cobGeo(t), bd = band(), padL = 40, padB = 26, padR = 18;
    const side = Math.max(60, Math.min(bd.W - padL - padR, bd.bottom - bd.top - padB));
    const left = Math.max(padL, (bd.W - side) / 2 + (padL - padR) / 2), top = bd.top + Math.max(0, (bd.bottom - bd.top - padB - side) / 2);
    const g = view = kit.plot($('cv'), { x: [0, 1.1], y: [0, 1.1], pad: [left, bd.W - left - side, top, bd.H - top - side] });
    const lw = (w) => w * LW, ticks = [0, 0.2, 0.4, 0.6, 0.8, 1].map((v) => [v, fix(v, 1)]);
    g.axes({ xTicks: TRV.thumbMode ? [] : ticks, yTicks: TRV.thumbMode ? [] : ticks });
    g.line([[0, 0], [1.1, 1.1]], P.dim, { width: lw(1.6) });
    const cosPts = []; for (let i = 0; i <= 110; i++) cosPts.push([i / 100, Math.cos(i / 100)]);
    g.line(cosPts, P.cyan, { width: lw(2.6), glow: 8 });
    g.dot(THETA_STAR, THETA_STAR, P.dim, 6 * LW, { ring: true, width: 1.5 * LW });
    for (const x of G.seq) g.line([[x, 0], [x, 0.035]], P.amber, { width: lw(1.6), alpha: 0.85 });
    g.line(G.path, P.amber, { width: lw(2.2), glow: 6 });
    const cur = G.path[G.path.length - 1];
    g.dot(cur[0], cur[1], P.amber, 5.5 * LW, { glow: 12 });
    if (!TRV.thumbMode) {
      const X = g.X, Y = g.Y;
      tag('cos', X(0.16), Y(Math.cos(0.16)) - 10, 'y = cos θ', 'num c-cy', { align: 'left', base: 'bottom' });
      tag('diag', X(1.05), Y(1.05) + 4, 'y = θ', 'num', { align: 'right', base: 'top' });
      tag('t0', X(THETA0) + 6, Y(0) - 8, `θ${sub(0)} = 1`, 'num c-am', { align: 'left', base: 'bottom' });
      tag('star', X(THETA_STAR) + 12, Y(THETA_STAR) + 10, 'θ* ≈ 0.739', 'num', { align: 'left', base: 'top' });
      tag('xlab', X(0.03), Y(0) - 5, L('θ（弧度）', 'θ (radians)'), 'num', { align: 'left', base: 'bottom' });
      // the angle reached: on the diagonal, where the last whole step put it
      if (G.k >= 1) tag('tk', X(G.theta) - 12, Y(G.theta) - 12, `θ${sub(G.k)} ≈ ${fix(G.theta, 4)}`, 'num c-am backed', { align: 'right', base: 'bottom' });
    }
    geo = G;
  }

  function drawStage() {
    const m = mode(), t = clock.t;
    stageEl.classList.toggle('still', TWO_D.has(m) || TRV.still);
    stageEl.classList.toggle('drag2d', TWO_D.has(m) && m !== 'cob');
    if (TWO_D.has(m)) { st.begin(); st.end(); }
    if (m === 'ray') drawRay(t); else if (m === 'one' || m === 'pair') drawDisc(t); else if (m === 'cob') drawCob(t);
    else { view = null; if (m === 'lat') drawLat(t); else if (m === 'lift') drawLift(t); else drawMean(t); }
    endTags();
  }

  /* ---------- the strip: what changes along the rail, and what does not ---------- */
  function drawPlot() {
    const m = mode(), t = clock.t, cv = $('plot');
    if (!cv.getClientRects().length) return;
    const A = (x0, x1, y0, y1) => kit.plot(cv, { x: [x0, x1], y: [y0, y1], pad: [34, 10, 10, 20] });
    const deg = (vals) => vals.map((v) => [v, `${v}°`]);
    let title, meta;
    if (m === 'ray') {
      const g = A(0, 90, 0, 1.18); g.axes({ xTicks: deg([0, 45, 90]), yTicks: [0, 0.5, 1] });
      const s = []; for (let a = 0; a <= 90; a += 2) s.push([a, Math.sin(a * DEG)]);
      g.hline(1, P.dim, { dash: [4, 3] }); g.line(s, P.cyan); g.vline(t, P.amber, { alpha: 0.6 }); g.dot(t, Math.sin(t * DEG), P.amber, 4.5);
      g.legend([[P.cyan, L('视网膜上的长度 sin α', 'image length sin α')], [P.dim, L('射线的长度', 'length of the ray'), 'dash']], { right: false, bottom: true });
      title = L('射线没变短，变的是看它的角度', 'The ray keeps its length; the angle of view changes'); meta = `sin α = ${fix(Math.sin(t * DEG), 3)}`;
    } else if (m === 'one' || m === 'pair') {
      const g = A(0, 360, -1.2, 1.2); g.axes({ xTicks: deg([0, 90, 180, 270, 360]), yTicks: [-1, 0, 1].map((v) => [v, v < 0 ? MINUS + '1' : String(v)]) });
      const c = [], v = []; for (let a = 0; a <= 360; a += 3) { c.push([a, Math.cos(a * DEG)]); v.push([a, -Math.sin(a * DEG)]); }
      if (m === 'one') {
        g.line(c, P.cyan); g.line(v, P.dim, { dash: [4, 3] }); g.vline(t, P.amber, { alpha: 0.6 }); g.dot(t, Math.cos(t * DEG), P.amber, 4.5);
        g.legend([[P.cyan, L('影子位置 cos θ', 'shadow cos θ')], [P.dim, L('横向速度 −sin θ', 'sideways speed −sin θ'), 'dash']], { right: false, bottom: true });
        title = L('沿时间轴：影子位置与横向速度', 'Along the rail: shadow position and sideways speed'); meta = `x = ${sgn(Math.cos(t * DEG), 2)}`;
      } else {
        g.line(c, P.dim);
        for (const [a, col] of [[90 + t, P.cyan], [270 + t, P.magenta]]) {
          const x = Math.cos(a * DEG), k = -Math.sin(a * DEG), h = 28;   // the slope in units of x per degree is k·π/180
          g.line([[a - h, x - k * h * DEG], [a + h, x + k * h * DEG]], col, { width: 2 });
          g.dot(a, x, col, 4.5);
        }
        title = L('同一个 x，两个相反的斜率', 'One x, two opposite slopes'); meta = `δ = ${fix(t, 0)}°`;
      }
    } else if (m === 'lat') {
      const g = A(0, 180, 0, 7); g.axes({ xTicks: deg([0, 50, 90, 180]), yTicks: [[0, '0'], [TAU, '2π']] });
      const s = []; for (let a = 0; a <= 180; a += 2) s.push([a, TAU * Math.sin(a * DEG)]);
      g.hline(TAU, P.magenta, { dash: [4, 3] }); g.line(s, P.cyan); g.vline(S.theta, P.amber, { alpha: 0.6 }); g.dot(S.theta, TAU * Math.sin(S.theta * DEG), P.amber, 4.5);
      title = L('纬圈周长 2π sin θ：只有 90° 是大圆', 'Latitude length 2π sin θ: a great circle only at 90°'); meta = `${fix(TAU * Math.sin(S.theta * DEG), 3)}`;
    } else if (m === 'lift') {
      const g = A(0, 90, 0, 1.18); g.axes({ xTicks: deg([0, 45, 90]), yTicks: [0, 0.5, 1] });
      const h = [], c = []; for (let a = 0; a <= 90; a += 2) { h.push([a, Math.sin(a * DEG)]); c.push([a, Math.cos(a * DEG)]); }
      g.hline(1, P.ink, { width: 1.6 }); g.line(h, P.violet); g.line(c, P.cyan, { dash: [4, 3] }); g.vline(t, P.amber, { alpha: 0.6 }); g.dot(t, 1, P.amber, 4.5);
      g.legend([[P.ink, L('离球心的距离', 'distance from the centre')], [P.violet, L('新方向上的高度', 'height along the new axis')], [P.cyan, L('留在旧平面里的部分', 'part left in the old plane'), 'dash']], { right: false, bottom: true });
      title = L('半径不变，多出的只是高度', 'The radius stays; only height is added'); meta = '1.000';
    } else if (m === 'mean') {
      const g = A(0, 1, 0, 1.12); g.axes({ xTicks: [[0, '0'], [0.5, '50%'], [1, '100%']], yTicks: [0, 0.5, 1] });
      g.line([[0, 1], [1, 0]], P.ink, { width: 1.6 }); g.vline(t, P.amber, { alpha: 0.6 }); g.dot(t, meanGeo(t).len, P.amber, 4.5);
      title = L('均值的长度从 1 落到 0', 'The length of the mean falls from 1 to 0'); meta = `|m| = ${fix(meanGeo(t).len, 3)}`;
    } else {
      const g = A(0, COB_MAX, 0.45, 1.05); g.axes({ xTicks: [0, 3, 6, 9, 12], yTicks: [0.5, 0.75, 1] });
      g.hline(THETA_STAR, P.dim, { dash: [4, 3] });
      const k = Math.floor(t + 1e-9);
      g.line(SEQ.map((x, i) => [i, x]), P.lineHot, { width: 1 });
      SEQ.forEach((x, i) => g.dot(i, x, i === k ? P.amber : P.cyan, i === k ? 4.5 : 3));
      title = L('θₖ 左右摆动，靠向 θ*', 'θₖ swings to either side and closes in on θ*'); meta = `θ${sub(k)} = ${fix(SEQ[k], 4)}`;
    }
    if ($('plotTitle')._t !== title) { $('plotTitle').textContent = title; $('plotTitle')._t = title; }
    $('plotMeta').textContent = meta;
  }

  /* ---------- text: title, legend, readouts ---------- */
  const LEGEND = {
    ray: [['cy', '射线（长 1）与视网膜上的影子', 'the ray (length 1) and its image'], ['am', '眼睛与视线', 'the eye and its line of sight'], ['dm', '视网膜', 'the retina']],
    one: [['mg', '俯视：圆盘是面', 'from the top: the disc is a face'], ['cy', '侧视：整个圆盘是线段', 'edge-on: the whole disc is a segment'], ['am', '木桩、速度与影子', 'the post, its velocity, its shadow']],
    pair: [['cy', 'θ = 90° + δ 的木桩', 'the post at θ = 90° + δ'], ['mg', 'θ = 270° + δ 的木桩', 'the post at θ = 270° + δ'], ['dm', '圆盘与它的侧影', 'the disc and its side view']],
    lat: [['cy', '纬圈：平面不过球心', 'latitude: its plane misses the centre'], ['mg', '赤道：过球心的大圆', 'equator: a great circle'], ['am', '当前的点', 'the current point']],
    // θ = 90°: the plane z = cos θ = 0 passes through the centre and the latitude is the equator
    latGreat: [['cy', '纬圈：平面经过球心', 'latitude: its plane passes through the centre'], ['mg', '赤道：过球心的大圆', 'equator: a great circle'], ['am', '当前的点', 'the current point']],
    lift: [['cy', '旧的单位圆', 'the old unit circle'], ['vi', '新方向 ±e₃', 'the new direction ±e₃'], ['am', '抬升的点，半径 1', 'the lifted point, radius 1']],
    mean: [['cy', '六个方向，粗细是权重', 'six directions, width = weight'], ['am', '加权平均 m', 'the weighted mean m']],
    cob: [['cy', 'y = cos θ', 'y = cos θ'], ['dm', 'y = θ', 'y = θ'], ['am', '迭代：刻度当下一个角', 'the iteration']]
  };
  const ASIDE = { ray: 'α', one: 'θ', pair: 'δ', lat: 'θ · φ', lift: 'η', mean: 'w', cob: 'k' };
  const ro = (i, label, value, cls) => { const el = $('ro' + i); el.hidden = label == null; if (label == null) return; $(`ro${i}T`).textContent = label; $(`ro${i}V`).innerHTML = value; if (cls != null) el.className = cls; };
  function drawText() {
    const m = mode(), t = clock.t;
    let big, sub2, keyT, key, keySub = '', note, pill;
    if (m === 'ray') {
      const G = rayGeo(t);
      big = L(`射线 · α = ${fix(t, 0)}°`, `Ray · α = ${fix(t, 0)}°`);
      sub2 = t < 0.5 ? L('迎面看：视网膜上只剩一个点', 'head-on: a single point on the retina') : L(`视网膜上长 sin α = ${fix(G.imageLen, 2)}，射线仍长 1`, `image sin α = ${fix(G.imageLen, 2)}; the ray is still 1 long`);
      keyT = L('视网膜上的长度 sin α', 'Image length on the retina sin α'); key = fix(G.imageLen, 3); pill = ['sin α', fix(G.imageLen, 2)];
      ro(1, L('观察角 α', 'Viewing angle α'), `${fix(t, 1)}°`, 'c'); ro(2, L('射线的长度', 'Length of the ray'), `${fix(G.rayLen, 3)} <small>${L('不变', 'unchanged')}</small>`, ''); ro(3, null);
      note = L('射线一直不动，变的只是眼睛站的位置。', 'The ray never moves; only where the eye stands changes.');
    } else if (m === 'one') {
      const G = postGeo(t);
      big = L(`转盘 · θ = ${fix(t, 0)}°`, `Disc · θ = ${fix(t, 0)}°`);
      sub2 = L(`影子 x = cos θ = ${sgn(G.shadow, 2)} · 横向速度 ${sgn(G.shadowVel, 2)}`, `shadow x = cos θ = ${sgn(G.shadow, 2)} · sideways speed ${sgn(G.shadowVel, 2)}`);
      keyT = L('影子的位置 x = cos θ', 'Shadow position x = cos θ'); key = sgn(G.shadow, 3); pill = ['x', sgn(G.shadow, 2)];
      ro(1, L('转角 θ', 'Turn θ'), `${fix(t, 1)}°`, 'c');
      ro(2, L('横向速度 −sin θ（以木桩速度为单位）', 'Sideways speed −sin θ (in units of the post speed)'), sgn(G.shadowVel, 3), 'm');
      ro(3, L('木桩的速度（沿切向）', 'Speed of the post (tangent)'), fix(G.speed, 3), '');
      note = Math.abs(G.shadowVel) < 5e-3 ? L('影子在端点：这一刻横向速度为 0，木桩仍以速度 1 沿圆走。', 'The shadow is at an end: its sideways speed is 0 at this moment, while the post still moves round at speed 1.')
        : L('线段本身不动，在动的是木桩的影子。', 'The segment itself stays put; what moves is the shadow of the post.');
    } else if (m === 'pair') {
      const G = pairGeo(t);
      big = L(`两个木桩 · δ = ${fix(t, 0)}°`, `Two posts · δ = ${fix(t, 0)}°`);
      sub2 = t < 0.5 ? L('两个影子都在 x = 0，速度 −1 与 +1', 'both shadows at x = 0, speeds −1 and +1')
        : L(`影子 ${sgn(G.a.shadow, 2)} 与 ${sgn(G.b.shadow, 2)}，速度 ${sgn(G.a.shadowVel, 2)} 与 ${sgn(G.b.shadowVel, 2)}`, `shadows ${sgn(G.a.shadow, 2)} and ${sgn(G.b.shadow, 2)}, speeds ${sgn(G.a.shadowVel, 2)} and ${sgn(G.b.shadowVel, 2)}`);
      keyT = L('两个影子的位置', 'The two shadow positions'); key = `<span class="c-cy">${sgn(G.a.shadow, 3)}</span> · <span class="c-mg">${sgn(G.b.shadow, 3)}</span>`; pill = ['x', `${sgn(G.a.shadow, 2)} · ${sgn(G.b.shadow, 2)}`];
      ro(1, L('一起前进的角度 δ', 'Common advance δ'), `${fix(t, 1)}°`, '');
      ro(2, L('青色影子的速度', 'Speed of the cyan shadow'), sgn(G.a.shadowVel, 3), 'c');
      ro(3, L('品红影子的速度', 'Speed of the magenta shadow'), sgn(G.b.shadowVel, 3), 'm');
      note = (t < 0.5 ? L('只看线段上的位置，分不出这两种情形；补回俯视的那一维才看得出。', 'The position on the segment alone cannot tell the two apart; the missing dimension from the top can.')
        : L('两个木桩一起往前走 δ，影子立刻朝相反方向分开。', 'Move both posts on by δ and the shadows part in opposite directions at once.'))
        + L('速度以木桩速度为单位。', ' Speeds are in units of the post speed.');
    } else if (m === 'lat') {
      const G = latGeo(S.theta, t);
      big = L(`纬圈 · θ = ${fix(S.theta, 0)}°`, `Latitude · θ = ${fix(S.theta, 0)}°`);
      sub2 = G.great ? L('θ = 90°：平面过球心，纬圈就是赤道大圆', 'θ = 90°: the plane passes through the centre; the latitude is the equator')
        : L(`φ = ${fix(t, 0)}° · 半径 sin θ = ${fix(G.radius, 2)} · 平面离球心 ${fix(Math.abs(G.offset), 2)}`, `φ = ${fix(t, 0)}° · radius sin θ = ${fix(G.radius, 2)} · plane ${fix(Math.abs(G.offset), 2)} from the centre`);
      keyT = L('纬圈周长 2π sin θ', 'Length of the latitude 2π sin θ'); key = fix(G.length, 3); keySub = L(`大圆是 2π ≈ ${fix(TAU, 3)}`, `a great circle is 2π ≈ ${fix(TAU, 3)}`); pill = ['2π sin θ', fix(G.length, 2)];
      ro(1, L('相位 φ', 'Phase φ'), `${fix(t, 1)}°`, '');
      ro(2, L('纬圈半径 sin θ', 'Radius sin θ'), fix(G.radius, 3), 'c');
      ro(3, L('平面高度 z = cos θ（带符号）', 'Signed plane height z = cos θ'), sgn(G.offset, 3), '');
      note = L('φ 怎么转，点都留在这一圈上；改 θ 才换到另一圈。', 'However φ turns, the point stays on this circle; only θ moves it to another.');
    } else if (m === 'lift') {
      const G = liftGeo(t);
      big = L(`升维 · η = ${fix(t, 0)}°`, `New axis · η = ${fix(t, 0)}°`);
      sub2 = L(`离球心 ${fix(G.norm, 3)} · 新方向上的高度 sin η = ${fix(G.height, 2)}`, `distance ${fix(G.norm, 3)} · height along the new axis sin η = ${fix(G.height, 2)}`);
      keyT = L('到球心的距离', 'Distance from the centre'); key = fix(G.norm, 3); keySub = L('始终是 1', 'always 1'); pill = ['|p|', fix(G.norm, 3)];
      ro(1, L('抬升角 η', 'Lift angle η'), `${fix(t, 1)}°`, '');
      ro(2, L('新方向上的高度 sin η', 'Height along the new axis sin η'), fix(G.height, 3), '');
      ro(3, L('留在旧平面里的部分 cos η', 'Part left in the old plane cos η'), fix(Math.cos(t * DEG), 3), 'c');
      note = L('旧圆留在原位成为赤道；增加的是一个方向，不是把半径放大。', 'The old circle stays as the equator; what is added is a direction, not a bigger radius.');
    } else if (m === 'mean') {
      const G = meanGeo(t);
      big = L(`六向平均 · w = ${fix(100 * t, 0)}%`, `Mixture · w = ${fix(100 * t, 0)}%`);
      sub2 = t > 1 - 1e-9 ? L('六个方向各 1/6：对跖两两抵消，均值在球心', '1/6 on each direction: opposite pairs cancel, the mean is at the centre')
        : L(`+z 占 ${fix(G.weights[4], 2)}，其余各 ${fix(G.weights[0], 2)} · |m| = ${fix(G.len, 2)}`, `+z holds ${fix(G.weights[4], 2)}, the others ${fix(G.weights[0], 2)} each · |m| = ${fix(G.len, 2)}`);
      keyT = L('均值的长度 |m|', 'Length of the mean |m|'); key = fix(G.len, 3); pill = ['|m|', fix(G.len, 2)];
      ro(1, L('混合比例 w', 'Mixing share w'), `${fix(100 * t, 0)}%`, '');
      ro(2, L('+z 的权重', 'Weight on +z'), fix(G.weights[4], 3), '');
      ro(3, L('其余五个方向各', 'Each of the other five'), fix(G.weights[0], 3), 'c');
      note = L('这是等权混合，不是一次测量：每一次测量仍落在某个方向上。', 'This is an equal-weight mixture, not a single measurement: each measurement still lands on some direction.');
    } else {
      const G = cobGeo(t);
      big = L(`余弦蛛网 · k = ${G.k}`, `Cosine cobweb · k = ${G.k}`);
      sub2 = `θ${sub(G.k)} ≈ ${fix(G.theta, 4)} · |cos θ${sub(G.k)} − θ${sub(G.k)}| ≈ ${fix(G.residual, 4)}`;
      keyT = L(`第 ${G.k} 个角 θ${sub(G.k)}（弧度）`, `Angle θ${sub(G.k)} (radians)`); key = fix(G.theta, 6); pill = [`θ${sub(G.k)}`, fix(G.theta, 4)];
      ro(1, L('步数 k', 'Step k'), String(G.k), '');
      ro(2, L('残差 |cos θₖ − θₖ|（双精度）', 'Residual |cos θₖ − θₖ| (double precision)'), fix(G.residual, 6), '');
      ro(3, L('θ*（文献值）', 'θ* (literature value)'), '0.7390851332', '');
      note = L('上一步读出的刻度 cos θ 当下一步的角；θₖ 左右摆动，越靠越近。', 'The reading cos θ of one step is the angle of the next; θₖ swings to either side, closer each time.');
    }
    $('hudBig').textContent = big; $('hudSub').textContent = sub2;
    $('roKeyT').textContent = keyT; $('roKey').innerHTML = key; $('roKeySub').textContent = keySub; $('roNote').textContent = note;
    $('pillRail').innerHTML = `${railText(m, t)}`; $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('ctlAside').textContent = ASIDE[m];
    const leg = (m === 'lat' && latGeo(S.theta, t).great ? LEGEND.latGreat : LEGEND[m]).map(([c, zh, en]) => `<span><i class="sw ${c}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
    // jump chips show the value the rail is on
    document.querySelectorAll('#alphaChips [data-alpha]').forEach((b) => b.setAttribute('aria-pressed', String(m === 'ray' && Math.abs(t - +b.dataset.alpha) < 0.5)));
    document.querySelectorAll('#phiChips [data-phi]').forEach((b) => b.setAttribute('aria-pressed', String(m === 'one' && Math.abs(t - +b.dataset.phi) < 0.5)));
    document.querySelectorAll('#thetaChips [data-theta]').forEach((b) => b.setAttribute('aria-pressed', String(Math.abs(S.theta - +b.dataset.theta) < 0.5)));
    $('discStepBy').textContent = S.disc === 'pair' ? '+5°' : '+15°';
    if (document.activeElement !== $('theta')) $('theta').value = String(S.theta);
    $('oTheta').textContent = `${fix(S.theta, 0)}°`;
  }

  const paint = kit.painter(() => { drawText(); TRV.hudFit(); drawStage(); drawPlot(); }, [stageEl, $('plot')]);

  /* ---------- the rail, scenes and situations ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 360, t: 60, rate: 60, step: 15,
    // the label is first drawn while the clock is being built: it reads t, max and the page state, never the clock
    format: (t, max) => { const m = mode(); return m === 'mean' ? `w ${fix(100 * t, 0)}% <small>/ 100%</small>` : m === 'cob' ? `k ${Math.floor(t + 1e-9)} <small>/ ${max}</small>` : `${MODES[m].sym} ${fix(t, 0)}° <small>/ ${fix(max, 0)}°</small>`; },
    onChange: () => paint()
  });
  function fitClock(t) {
    const M = MODES[mode()];
    clock.pause(); clock.rate = M.rate; clock.step = M.step; clock.setMax(M.max, true); clock.set(t == null ? M.start : t);
  }
  function showControls() {
    const m = mode();
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(S.scene); });
    document.querySelectorAll('[data-modes]').forEach((el) => { el.hidden = !el.dataset.modes.split(' ').includes(m); });
  }
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true); discChips.set(S.disc, true); sphereChips.set(S.sphere, true);
    if (sc === 'sphere') st.view(CAM, 0);
    showControls(); fitClock(t);
  }
  const setDisc = (m, t) => { S.disc = m; setScene('disc', t); };
  const setSphere = (m, t) => { S.sphere = m; setScene('sphere', t); };

  /* the boot playback of a cited card: kit.autoplay starts it when the figure scrolls into view; a reader who has
     already moved anything (a card, a control, the rail) keeps the clock as left */
  let boot = null;
  const stopBoot = () => { if (boot) boot.off = true; };
  function bootPlay(id) {
    const b = boot = { id, off: false };
    kit.autoplay({ play: () => { if (!b.off && cards.current === b.id) clock.play(); }, pause: () => { if (!b.off) clock.pause(); }, get playing() { return clock.playing; } }, stageEl);
  }
  for (const [el, type] of [[$('play'), 'click'], [$('now'), 'input'], [$('rew'), 'click']]) el.addEventListener(type, stopBoot, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBoot(); }, true);
  const leave = () => { stopBoot(); cards.mark(null); };

  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  const discChips = kit.chips($('discMode'), 'disc', (v) => { leave(); setDisc(v); });
  const sphereChips = kit.chips($('sphereMode'), 'sphere', (v) => { leave(); setSphere(v); });
  kit.chips($('alphaChips'), 'alpha', (v) => { leave(); clock.pause(); clock.set(+v); });
  kit.chips($('phiChips'), 'phi', (v) => { leave(); clock.pause(); clock.set(+v); });
  const setTheta = (v) => { S.theta = clamp(Math.round(+v), 0, 180); paint(); };
  kit.chips($('thetaChips'), 'theta', (v) => { leave(); setTheta(v); });
  $('theta').addEventListener('input', (ev) => { leave(); setTheta(ev.target.value); });
  $('discStep').addEventListener('click', () => { leave(); clock.stepBy(1); });
  $('discZero').addEventListener('click', () => { leave(); clock.pause(); clock.set(0); });
  $('cobStep').addEventListener('click', () => { leave(); clock.stepBy(1); });
  $('cobZero').addEventListener('click', () => { leave(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('ray'); }, 2: () => { leave(); setScene('disc'); }, 3: () => { leave(); setScene('sphere'); }, 4: () => { leave(); setScene('cobweb'); } });

  /* ---------- direct manipulation ---------- */
  let drag = null;
  const evData = (ev) => { const b = $('cv').getBoundingClientRect(); return [view.invX(ev.clientX - b.left), view.invY(ev.clientY - b.top)]; };
  function pick(ev, s) {
    const m = mode();
    drag = null;
    if (TRV.still) return TWO_D.has(m);
    if (m === 'ray' && view) drag = 'ray';
    else if ((m === 'one' || m === 'pair') && view) { const [x, y] = evData(ev); if (Math.hypot(x, y) < 1.4) drag = m; }
    else if ((m === 'lat' || m === 'lift') && geo && geo.point && s.near(ev, geo.point) < 28) drag = m;
    if (drag) { leave(); clock.pause(); }
    return TWO_D.has(m) || !!drag;   // a 2D scene keeps the pointer: a drag there never turns the hidden camera
  }
  function dragTo(ev, s) {
    if (!drag) return;
    if (drag === 'ray') { const [x, y] = evData(ev); clock.set(clamp(Math.atan2(y, x) / DEG, 0, 90)); }
    else if (drag === 'one') { const [x, y] = evData(ev); clock.set(mod360(Math.atan2(y, x) / DEG)); }
    else if (drag === 'pair') {
      const [x, y] = evData(ev), a = mod360(Math.atan2(y, x) / DEG);
      const near = (d) => (d <= 45 ? { d, gap: 0 } : d - 45 < 360 - d ? { d: 45, gap: d - 45 } : { d: 0, gap: 360 - d });
      const c1 = near(mod360(a - 90)), c2 = near(mod360(a - 270));
      clock.set((c1.gap <= c2.gap ? c1 : c2).d);
    } else if (drag === 'lat') {
      const p = s.pick(ev);
      S.theta = clamp(Math.round(Math.acos(clamp(p[2], -1, 1)) / DEG), 0, 180);
      clock.set(mod360(Math.atan2(p[1], p[0]) / DEG));
    } else if (drag === 'lift') {
      const p = s.pick(ev);
      clock.set(clamp(Math.asin(clamp(p[2], -1, 1)) / DEG, 0, 90));
    }
  }

  /* ---------- experiment cards: where each starts, whether it plays, and the frame its still shows ---------- */
  const PRESETS = {
    'head-on': { scene: 'ray', at: 0, play: true, still: 45 },
    shadow: { scene: 'disc', disc: 'one', at: 0, play: true, still: 60 },
    compare: { scene: 'disc', disc: 'pair', at: 0, play: true, still: 0 },
    latitude: { scene: 'sphere', sphere: 'lat', theta: 50, at: 0, play: true, still: 45 },
    normal: { scene: 'sphere', sphere: 'lift', at: 0, play: true, still: 60 },
    average: { scene: 'sphere', sphere: 'mean', at: 0, play: true, still: 'end' },
    cosine: { scene: 'cobweb', at: 0, play: true, still: 6 }
  };
  const NOTES = {
    'head-on': ['α = 0° 时眼睛正对着射线，视网膜上只剩一个点；侧过去，同一根长 1 的青色射线留下长 sin α 的影子。射线本身从来没有变短。', 'At α = 0° the eye looks straight down the ray and the retina keeps one point; step aside and the same cyan ray of length 1 leaves an image sin α long. The ray itself never gets shorter.'],
    shadow: ['上面俯视：琥珀色的木桩逆时针匀速绕圆走。下面侧视：整个圆盘只是一条不动的线段，在线上来回的是木桩的影子 x = cos θ，到两端速度为 0。', 'Above, from the top: the amber post goes round at a steady pace. Below, edge-on: the whole disc is one segment that stays put, and what swings along it is the shadow of the post, x = cos θ, with speed 0 at the two ends.'],
    compare: ['θ = 90° 的青色木桩与 θ = 270° 的品红木桩投到同一点 x = 0：影子位置相同，下一步却相反。两者一起往前走 δ，影子立刻分开。', 'The cyan post at θ = 90° and the magenta post at θ = 270° fall on the same point x = 0: same shadow position, opposite next step. Move both on by δ and the shadows part at once.'],
    latitude: ['固定 θ = 50°，只转 φ：琥珀色的点沿青色的纬圈走，这一圈所在的平面不过球心。把 θ 调到 90°，它才是品红的赤道大圆。', 'Fix θ = 50° and turn φ alone: the amber point runs along the cyan latitude, whose plane misses the centre. Only at θ = 90° is it the magenta equator, a great circle.'],
    normal: ['青色的旧圆留在原处，成为新球的赤道；新增的是紫色的方向 ±e₃。琥珀色的点从旧圆抬向极点，离球心始终是 1：多出的是一个方向，不是更大的半径。', 'The cyan old circle stays where it is and becomes the equator of a new sphere; what is added is the violet direction ±e₃. The amber point rises from the old circle to the pole at distance 1 from the centre: one more direction, not a bigger radius.'],
    average: ['六个青色方向两两对跖。权重从全在 +z 摊成每个 1/6，琥珀色的均值从球面落回球心：这是等权混合，不是一次测量。', 'The six cyan directions come in opposite pairs. As the weight spreads from all on +z to 1/6 each, the amber mean falls from the sphere to the centre: an equal-weight mixture, not a single measurement.'],
    cosine: ['琥珀色的折线从 θ₀ = 1 出发：竖着走到青色的 cos 曲线，横着走到灰色的对角线，读出的刻度成了下一个角。六步后 θ₆ ≈ 0.7640，一圈圈绕向交点。', 'The amber path starts at θ₀ = 1: up to the cyan cosine curve, across to the grey diagonal, and the reading becomes the next angle. After six steps θ₆ ≈ 0.7640, winding in towards the crossing.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBoot();
    if (p.theta != null) S.theta = p.theta;
    if (p.disc) S.disc = p.disc;
    if (p.sphere) S.sphere = p.sphere;
    setScene(p.scene, p.at);
    // a still (cover, cited figure for PDF/EPUB) and the opening view of the full page show the telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) { if (p.still != null) clock.set(p.still === 'end' ? clock.max : p.still); return; }
    if (!p.play) return;
    if (booting) bootPlay(id); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景、拖舞台上的对象或时间轴。随时可以再选一张卡。', 'Free play: switch scenes, drag what is on the stage or the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const copy = (x) => JSON.parse(JSON.stringify(x));
  const vp = (x, y) => { const b = $('cv').getBoundingClientRect(); return [b.left + x, b.top + y]; };
  window.PRELUDE_DEBUG = {
    get state() {
      const m = mode(), t = clock.t;
      return {
        scene: S.scene, mode: m, preset: cards.current, t, max: clock.max, playing: clock.playing, theta: S.theta, cam: { yaw: st.cam.yaw, pitch: st.cam.pitch },
        ray: m === 'ray' ? copy(rayGeo(t)) : null, disc: m === 'one' ? copy(postGeo(t)) : null, pair: m === 'pair' ? copy(pairGeo(t)) : null,
        lat: m === 'lat' ? copy(latGeo(S.theta, t)) : null, lift: m === 'lift' ? copy(liftGeo(t)) : null, mean: m === 'mean' ? copy(meanGeo(t)) : null,
        cob: m === 'cob' ? copy(cobGeo(t)) : null,
        hud: [$('hudBig').textContent, $('hudSub').textContent],
        tags: [...tagMap.entries()].filter(([, el]) => !el.hidden).map(([k, el]) => [k, el.textContent])
      };
    },
    /** Points of the drawn latitude (or the old circle of the lift), sampled as the page samples them. */
    ring: (n) => { const m = mode(); return m === 'lat' ? ringPts([0, 0, Math.cos(S.theta * DEG)], Math.sin(S.theta * DEG), n || 72) : m === 'lift' ? ringPts([0, 0, 0], 1, n || 72) : null; },
    seek: (t) => { clock.pause(); clock.set(t); },
    scene: (sc, sub2, t) => { if (sc === 'disc' && sub2) S.disc = sub2; if (sc === 'sphere' && sub2) S.sphere = sub2; setScene(sc, t); },
    setTheta: (v) => setTheta(v),
    /** Viewport coordinates for pointer tests: a data point of the 2D scene, or a world point of the sphere. */
    at2: (x, y) => (view ? vp(view.X(x), view.Y(y)) : null),
    at3: (v) => { const q = st.p(v); return vp(q[0], q[1]); }
  };
  /** Cover: the turntable at θ = 60°, the post above and its shadow x = 0.5 on the segment below. */
  window.TRV_THUMB = () => { stopBoot(); S.disc = 'one'; setScene('disc', 60); paint.now(); };
  cards.pick(cards.initial('shadow'));   // a chapter may cite another card: ::: {.viz src="prelude-dimensions" preset="compare"}
  booting = false;
  paint();
})();
