/* TERNION//NUMBERS · 三元数投影生万数沙盘 · All numbers from one arc (Chapter 32, §32.2)
   World (kit.solid): z up. In the centre the violet three-lobed sculpture of the minimal circular-arc body
   Δ𝒯ε(θ, û) = cos(θ/2) 1 + sin(θ/2) û·(i, j, k) ∈ S³, with û = i cos α + j sin α; the silver arc draws θ from 0° to
   720° and the amber handle sits on it at the current θ. Four projection stations surround it:
     flat   (upper left)   the quaternion product without its k part, on span(1, i, j): Lₓ of x = w + i cos α + j sin α
                           has the real root λ₀ = w and the null vector v = (0, −sin α, cos α); the magenta Rodrigues
                           pillar has height min(4, |tan(θ/2)|) (MODEL cap) and a ring at the pole θ ≡ 180° (mod 360°).
     ℍ      (upper right)  the silver column w = cos(θ/2), the cyan ring of radius ‖v‖ = |sin(θ/2)|, the magenta
                           sagitta 1 − w.
     ℂ      (lower left)   the cyan phase disc and the spherical triangle A = (1, 0, 0), B = (cos β, sin β, 0),
                           C = (cos α cos β/2, cos α sin β/2, sin α), β = 25° + 40°|sin(θ/2)| (MODEL), with
                           S = 1 + a·b + b·c + c·a, D = a·(b × c), excess Ω = 2 atan2(D, S).
     ℝ      (lower right)  two rulers: ½Tr U = w and Tr R = 4w² − 1.
     ℤ/ℙ    (bottom)       the silver beads n = ⌊θ / 360°⌋, the long-division remainders of p/q (cyan beads) and the
                           p-adic factors other than 1 (cyan rings).
   The rail τ ∈ [0, 1] runs the cyan stretch from the identity to the current point; θ, α and p/q do not move with it.
   Every number is computed here; the instances of the cited Lean theorems are in instances().
   Read-only probe: window.TERNION_NUMBERS_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const lerp = (a, b, u) => a + (b - a) * u;
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const fmt = (x) => (!Number.isFinite(x) ? '∞' : (Math.abs(x) < 5e-5 ? 0 : x).toFixed(4));
  const signed = (x) => (Number.isFinite(x) && Math.abs(x) >= 5e-5 && x < 0 ? '−' + fmt(-x) : '+' + fmt(x));
  const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  const sup = (n) => String(n).replace(/\d/g, (d) => SUP[d]);
  let star = 0.75;
  for (let i = 0; i < 6; i++) star += (cs(star) - star) / (1 + sn(star));
  const twoStar = (2 * star) / deg;
  const pairs = [
    [1, 7],
    [3, 5],
    [12, 35],
    [5, 13]
  ];
  function arithmetic([p, q]) {
    const seen = new Map(),
      digits = [],
      remainders = [];
    let r = p;
    while (r && !seen.has(r)) {
      seen.set(r, digits.length);
      remainders.push(r);
      digits.push(Math.floor((10 * r) / q));
      r = (10 * r) % q;
    }
    remainders.push(r);
    const start = r ? seen.get(r) : digits.length,
      pre = digits.slice(0, start).join(''),
      period = digits.slice(start).join('');
    const factors = [];
    let a = p,
      b = q,
      product = p / q;
    for (let prime = 2; prime <= Math.max(a, b); prime++) {
      let v = 0;
      while (a % prime === 0) {
        a /= prime;
        v++;
      }
      while (b % prime === 0) {
        b /= prime;
        v--;
      }
      if (v) {
        const norm = prime ** -v;
        factors.push({ prime, v, norm });
        product *= norm;
      }
    }
    // The long-division invariant with b = 10 and n = the number of digits written: q · prefix + r = 10ⁿ · p.
    const n = remainders.length - 1,
      prefix = Math.floor((10 ** n * p) / q);
    return { p, q, pre, period, remainders, factors, product, division: { n, prefix, remainder: remainders.at(-1), lhs: q * prefix + remainders.at(-1), rhs: 10 ** n * p } };
  }
  const rats = pairs.map(arithmetic);
  /* The state; during a card transition θ and α blend from `from` to the state (kit.tween). */
  const state = { thetaDeg: twoStar, tiltDeg: 35, pqIndex: 1, cam: 'panorama', lens: 0, from: null, blend: 1 };
  function eff() {
    if (!state.from || state.blend >= 1) return { thetaDeg: state.thetaDeg, tiltDeg: state.tiltDeg };
    const b = state.blend,
      f = state.from;
    return { thetaDeg: lerp(f.thetaDeg, state.thetaDeg, b), tiltDeg: lerp(f.tiltDeg, state.tiltDeg, b) };
  }
  const cams = { panorama: [-0.12, 0.24, 1], deadlock: [0.25, 0.29, 1.02], channels: [-0.34, 0.34, 1] };
  const presets = Object.fromEntries(
    [
      ['flat-3d-zero-divisor-gimbal-deadlock', 179, 45, 0, 'deadlock', true, 0.5],
      ['hamilton-quaternion-w-shadow-tax', twoStar, 35, 1, 'panorama', true, 0.5],
      ['complex-equatorial-hopf-slice', 120, 0, 1, 'channels', true, 0.63],
      ['real-trace-geodesic-projection', 360, 30, 2, 'channels', true, 0.75],
      ['homotopy-pi3-integer-winding', 720, 35, 3, 'panorama', false, 1]
    ].map(([id, thetaDeg, tiltDeg, pqIndex, cam, play, still]) => [id, { thetaDeg, tiltDeg, pqIndex, cam, play, still }])
  );
  const ids = Object.keys(presets);
  /** Everything the page shows, from the (blended) state. */
  function calculate() {
    const e = eff(),
      thetaDeg = e.thetaDeg,
      tiltDeg = e.tiltDeg;
    const h = (thetaDeg * deg) / 2,
      a = tiltDeg * deg,
      w = cs(h),
      v = Math.abs(sn(h));
    const b = cs(a),
      c = sn(a),
      pole = thetaDeg % 360 === 180;
    // A and B lie in the equator; C leaves it at latitude α. AB stays strictly shorter than π.
    const width = (25 + 40 * v) * deg,
      mid = width / 2;
    const triangle = [
      [1, 0, 0],
      [cs(width), sn(width), 0],
      [cs(a) * cs(mid), cs(a) * sn(mid), sn(a)]
    ];
    const [A, B, C] = triangle,
      D = sn(width) * sn(a),
      S = 1 + dot(A, B) + dot(B, C) + dot(C, A);
    return {
      thetaDeg,
      tiltDeg,
      pqIndex: state.pqIndex,
      cam: state.cam,
      lens: state.lens,
      twoStar: thetaDeg === twoStar,
      w,
      v,
      quaternion: [w, sn(h) * b, sn(h) * c, 0],
      lift: [cs(h), sn(h)],
      tax: 1 - w,
      unit: w * w + v * v,
      rod: pole ? Infinity : v / Math.abs(w),
      pole,
      triangle,
      holonomy: { S, D, lhs: S * S + D * D, rhs: 2 * (1 + dot(A, B)) * (1 + dot(B, C)) * (1 + dot(C, A)) },
      omega: 2 * Math.atan2(D, S),
      trace: 1 + 2 * cs(2 * h),
      n: Math.floor(thetaDeg / 360),
      matrix: [
        [w, -b, -c],
        [b, w, 0],
        [c, 0, w]
      ],
      lambda: w,
      vNull: [0, -c, b],
      rat: rats[state.pqIndex]
    };
  }
  /* ---------- 2 × 2 complex matrices as [[re, im], …] ---------- */
  const cmul = (x, y) => [x[0] * y[0] - x[1] * y[1], x[0] * y[1] + x[1] * y[0]];
  const mmul = (X, Y) => X.map((row, i) => Y[0].map((_, j) => row.reduce((s, x, k) => { const p = cmul(x, Y[k][j]); return [s[0] + p[0], s[1] + p[1]]; }, [0, 0])));
  const adj = (X) => X[0].map((_, j) => X.map((row) => [row[j][0], -row[j][1]]));
  const gap = (X, Y) => Math.max(...X.flatMap((row, i) => row.map((x, j) => hypot(x[0] - Y[i][j][0], x[1] - Y[i][j][1]))));
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]],
    NEG_I2 = [[[-1, 0], [0, 0]], [[0, 0], [-1, 0]]];
  /** The instances of the cited Lean theorems at the current state, computed here. */
  function instances(m) {
    const c = cs(m.tiltDeg * deg),
      s = sn(m.tiltDeg * deg);
    // R = −i(cos α σx + sin α σy): the 2 × 2 matrix of the axis û (i ↦ −iσx, j ↦ −iσy).
    const R = [[[0, 0], [-s, -c]], [[s, -c], [0, 0]]],
      RH = adj(R),
      R2 = mmul(R, R);
    const residual = m.matrix.map((row, i) => dot(row, m.vNull) - m.lambda * m.vNull[i]);
    const minusR = R.map((row) => row.map(([re, im]) => [-re, -im]));
    return {
      flat: { lambda: m.lambda, v: m.vNull, residual: hypot(...residual) },
      axis: { R, R2, skew: gap(RH, minusR), unitary: gap(mmul(R, RH), I2), square: gap(R2, NEG_I2) },
      holonomy: { ...m.holonomy, gap: Math.abs(m.holonomy.lhs - m.holonomy.rhs), phase: [m.holonomy.S / Math.sqrt(m.holonomy.lhs), -m.holonomy.D / Math.sqrt(m.holonomy.lhs)] },
      lift: { z: m.lift, square: [cs(m.thetaDeg * deg), sn(m.thetaDeg * deg)], turns: m.n },
      division: m.rat.division,
      product: { factors: m.rat.factors, value: m.rat.product },
      fixedPoint: { thetaStar: star, residual: Math.abs(cs(star) - star) }
    };
  }
  const stage = $('stage'),
    handle = $('ternionHandle');
  const opts = {
    canvas: $('cv'),
    yaw: cams.panorama[0],
    pitch: cams.panorama[1],
    radius: 0.2,
    wheel: false,
    onChange: () => paint()
  };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const anchors = {
    flat: [-1.36, 0, 0.68],
    shadow: [1.37, 0.1, 0.65],
    slice: [-1.28, -0.04, -0.76],
    trace: [1.19, -0.03, -0.72],
    winding: [0, -0.2, -1.27]
  };
  const tube = (key, points, color, r, extra = {}) => sc.tube(key, points, { color, r, glow: 0.15, ...extra });
  const circle = (center, r, fn) => sample(72, (t) => add(center, scale(fn(t * TAU), r)));
  const xy = (t) => [cs(t), sn(t), 0];

  // Three lobes around the polar direction. The leading edge of each swept face
  // meets the next lobe at the equator, so all three share one opaque body.
  function coreP(u, v, thetaDeg) {
    const lat = PI * u,
      lon = TAU * v,
      ring = sn(lat),
      depth = cs(lat);
    const radius = 0.875 * (1 + 0.12 * ring ** 3 * cs(3 * lon - 1.4 * depth));
    const heading = lon + 0.24 * sn((thetaDeg * deg) / 2);
    return [radius * ring * cs(heading), -0.84 * radius * depth, radius * ring * sn(heading)];
  }
  // The orthographic drawing of the signed (cos h, sin h) great circle.
  const onArc = (d) => {
    const h = (d * deg) / 2;
    return [1.01 * cs(h), -0.24 * sn(h), 0.98 * sn(h)];
  };
  const offset = (k, x, y, z) => add(anchors[k], [x, y, z]);
  const box = (name, p, half, token) => {
    const corners = Array.from({ length: 8 }, (_, i) =>
      add(
        p,
        half.map((r, j) => (i & (1 << j) ? r : -r))
      )
    );
    sc.poly(
      name,
      {
        vertices: corners,
        faces: [
          [0, 4, 6, 2],
          [1, 3, 7, 5],
          [0, 1, 5, 4],
          [2, 6, 7, 3],
          [0, 2, 3, 1],
          [4, 5, 7, 6]
        ]
      },
      { color: token, edges: token, alpha: 0.7 }
    );
  };
  function rotor(m) {
    const core = (u, v) => coreP(u, v, m.thetaDeg);
    sc.surface('body', core, { u: [0, 1], v: [0, 1], nu: 34, nv: 72, color: P.violet });
    for (let blade = 0; blade < 3; blade++) {
      const vane = (u, v) => {
        const lat = 0.045 + 0.85 * u;
        const width = 0.09 * sn(PI * u);
        const lon = blade / 3 + 0.31 * u + (v - 0.5) * width;
        const lift = 1 + 0.125 * sn(PI * u) ** 2 * sn(PI * v);
        return scale(core(lat, lon), lift);
      };
      sc.surface('vane' + blade, vane, { nu: 40, nv: 12, color: P.violet, glow: 0.18 });
      tube(
        'vaneEdge' + blade,
        sample(40, (t) => vane(t, 0.12)),
        P.violet,
        0.012
      );
    }
    tube(
      'geodesic',
      sample(100, (t) => onArc(t * 720)),
      P.sigma,
      0.015
    );
    sc.bead(onArc(m.thetaDeg), { color: P.amber, r: 4.2, key: 'cursor' });
    // Opposite marks on the body show the front/back occlusion after orbiting.
    for (const u of [0.09, 0.91]) sc.bead(scale(core(u, 0.5), 1.012), { color: P.violet, key: 'seam' + u, r: 4 });
  }
  function stations(m) {
    const flat = anchors.flat,
      shadow = anchors.shadow,
      c = anchors.slice,
      tr = anchors.trace;
    box('flat', flat, [0.32, 0.23, 0.05], P.violet);
    sc.arrow(offset('flat', -0.16, 0, -0.2), offset('flat', -0.16, 0, 0.44), { color: P.magenta, width: 3 });
    const h = 0.12 * Math.min(4, m.rod),
      rodBase = offset('flat', 0.16, 0, 0.052);
    if (h > 1e-6) tube('pillar', [rodBase, add(rodBase, [0, 0, h])], P.magenta, 0.054);
    if (m.pole) tube('pole', circle(add(rodBase, [0, 0, 0.48]), 0.11, xy), P.magenta, 0.016);
    tube('norm', circle(shadow, 0.32 * Math.max(0.0001, m.v), xy), P.cyan, 0.025);
    if (Math.abs(m.w) > 1e-6) tube('scalar', [shadow, add(shadow, [0, 0, 0.42 * m.w])], P.sigma, 0.05);
    if (m.tax > 1e-6)
      tube('sagitta', [offset('shadow', 0.17, 0, 0.42), offset('shadow', 0.17, 0, m.w * 0.42)], P.magenta, 0.022);
    const ph = (m.thetaDeg * deg) / 2;
    const plane = (t) => [cs(t), sn(t) * 0.55, sn(t) * 0.835];
    sc.fan(circle(c, 0.4, plane), { fill: P.cyan, alpha: 0.17 });
    tube('phaseCircle', circle(c, 0.4, plane), P.cyan, 0.015);
    const height = sn(ph) * cs(m.tiltDeg * deg);
    const projection = [m.w, 0.55 * height, 0.835 * height];
    if (hypot(...projection) > 1e-8) sc.arrow(c, add(c, scale(projection, 0.39)), { color: P.cyan, width: 2 });
    if (m.tiltDeg < 18) {
      const strength = 1 - m.tiltDeg / 18;
      const equator = circle([0, 0, 0], 1.08, (t) => [cs(t), sn(t), 0]);
      sc.fan(equator, { fill: P.cyan, alpha: 0.12 * strength });
      sc.line(equator, { color: P.cyan, width: 1.3, alpha: 0.65 * strength });
    }
    const project = ([x, y, z]) => add(c, scale([x, 0.55 * y - 0.835 * z, 0.835 * y + 0.55 * z], 0.39));
    if (m.tiltDeg > 0) {
      // Normalize barycentric coordinates back onto S². The three boundary curves
      // are short great-circle arcs; the patch disappears in the equatorial limit.
      const [A, B, C] = m.triangle;
      sc.surface(
        'excess',
        (u, v) => {
          const inner = add(scale(A, 1 - u), scale(B, u));
          const q = add(scale(inner, 1 - v), scale(C, v));
          return project(scale(q, 1 / hypot(...q)));
        },
        { nu: 12, nv: 9, color: P.violet, alpha: 0.72 }
      );
    }
    for (const [i, val, token] of [
      [0, m.w, P.sigma],
      [1, m.trace, P.cyan]
    ]) {
      const ctr = add(tr, [0, 0, -i * 0.12]);
      tube('ruler' + i, [add(ctr, [-0.35, 0, 0]), add(ctr, [0.35, 0, 0])], P.ink, 0.011);
      for (let tick = -3; tick <= 3; tick++) {
        const mid = add(ctr, [tick * 0.105, 0, 0]);
        sc.line([add(mid, [0, 0, -0.025]), add(mid, [0, 0, 0.025])], { color: P.sigma, width: 1 });
      }
      const x = val * 0.105;
      if (Math.abs(x) > 1e-6) tube('trace' + i, [ctr, add(ctr, [x, 0, 0])], token, 0.031);
      sc.bead(add(ctr, [x, 0, 0]), { color: token, r: 3 });
    }
    const row = anchors.winding;
    tube('windingRail', [add(row, [-0.39, 0, 0]), add(row, [0.39, 0, 0])], P.blue, 0.009);
    for (let k = 0; k < 2; k++) {
      const p = add(row, [-0.39 + k * 0.11, 0, 0]);
      sc.ring(p, { color: P.sigma, normal: [0, -1, 0], r: 4 });
      if (k < m.n) sc.bead(p, { color: P.sigma, r: 3.1 });
    }
    // The tail holds the successive distinct remainders. On a new rational
    // both the decimal row and the set of nontrivial local norms change.
    m.rat.remainders.slice(0, -1).forEach((r, i) => {
      sc.bead(add(row, [-0.08 + i * 0.085, 0, 0]), { color: P.cyan, r: 2 + (1.8 * r) / m.rat.q });
    });
    m.rat.factors.forEach(({ prime }, i) =>
      sc.ring(add(row, [(i - (m.rat.factors.length - 1) / 2) * 0.14, 0, -0.11]), {
        color: P.cyan,
        normal: [0, -1, 0],
        r: 3 + Math.log(prime)
      })
    );
  }
  /* ---------- stage tags, HUD and legend ---------- */
  const LENS_NAME = [
    ['万数归弧', 'ONE ARC, ALL NUMBERS'],
    ['除环与同伦', 'DIVISION & DEGREE']
  ];
  const stationLabel = (k) =>
    state.lens
      ? { flat: 'Lₓ · λ₀', shadow: 'ℍ · w² + ‖v‖²', slice: 'ℂ · Ω', trace: 'ℝ · ½Tr U', winding: 'ℤ/ℙ · n' }[k]
      : { flat: L('平直 ℝ³', '3D FLAT'), shadow: 'ℍ · 4D', slice: 'ℂ · 2D', trace: 'ℝ · 1D', winding: 'ℤ/ℙ · 0D' }[k];
  function subline(m) {
    if (m.pole)
      return L(`θ = ${m.thetaDeg.toFixed(0)}°：平直坐标 |tan(θ/2)| 发散，紫色弧体照样跨过半圈。`, `θ = ${m.thetaDeg.toFixed(0)}°: the flat coordinate |tan(θ/2)| diverges; the violet arc body crosses the half turn all the same.`);
    if (m.thetaDeg === 720)
      return L('两整圈后旋量回到 w = +1，空间旋转也复原：n = 2。', 'After two full turns the spinor is back at w = +1 and so is the rotation: n = 2.');
    if (m.thetaDeg === 360)
      return L('转满一圈：空间旋转复原（Tr R = +3），旋量却停在 w = −1。', 'One full turn: the rotation is back (Tr R = +3) but the spinor stops at w = −1.');
    if (m.tiltDeg === 0)
      return L('α = 0：切片三角形压回赤道，角盈 Ω = 0，只剩一个单位相位。', 'α = 0: the slice triangle falls onto the equator, Ω = 0, and a single unit phase is left.');
    if (m.twoStar)
      return L(`θ = 2θ*：银白柱 w = cos θ* = θ*，品红矢高 1 − w = ${fmt(m.tax)}。`, `θ = 2θ*: the silver column is w = cos θ* = θ* and the magenta sagitta 1 − w = ${fmt(m.tax)}.`);
    return L(`平直坐标 |tan(θ/2)| = ${fmt(m.rod)}；弧体上始终 w² + ‖v‖² = 1。`, `The flat coordinate reads |tan(θ/2)| = ${fmt(m.rod)}; on the arc body w² + ‖v‖² = 1 throughout.`);
  }
  function legendItems() {
    if (state.lens)
      return [['vi', 'Δ𝒯ε ∈ S³'], ['sg', 'ℝ · w = ½Tr U'], ['cy', 'ℂ · ‖v‖, Ω'], ['mg', 'ℝ³ · |tan(θ/2)|']];
    return [['vi', L('极小圆弧体', 'arc body')], ['sg', L('弧与余弦影 w', 'arc and shadow w')], ['cy', L('‖v‖、相位与走过的弧', '‖v‖, phase, path so far')], ['mg', L('平直坐标与矢高', 'flat coordinate, sagitta')]];
  }
  function hud(m) {
    $('hudBig').innerHTML = `${L(...LENS_NAME[state.lens])} · w = ${signed(m.w)}`;
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  // Two stations can project to the same column when the camera turns edge-on.
  // Keep each caption near its anchor and reserve the HUD and handle rectangles.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const row = box.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = box.left + dx,
          right = box.right + dx;
        const top = box.top + dy,
          bottom = box.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3))
          continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }
  function drawStage(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    opts.radius = Math.min((W - 26) / 3.85, (H - 83) / 3.0) / Math.min(W, H);
    opts.cy = 0.49;
    sc.begin();
    rotor(m);
    stations(m);
    for (const name of ['flat', 'shadow', 'slice', 'trace']) {
      const target = anchors[name],
        direction = scale(target, 1 / hypot(...target));
      sc.line([scale(direction, 0.9), add(target, scale(direction, -0.4))], {
        color: name === 'flat' ? P.magenta : P.cyan,
        dash: [2, 5],
        width: 1,
        alpha: 0.43
      });
    }
    // Sweep the geodesic to the selected endpoint.
    const f = clock.t * m.thetaDeg;
    if (f > 0.01)
      tube(
        'traversed',
        sample(60, (t) => scale(onArc(t * f), 1.025)),
        P.cyan,
        0.021
      );
    for (const k of Object.keys(anchors)) {
      // the ℂ tag sits a little in front of its disc, so the disc does not hide it in the channels view
      const p = offset(k, 0, k === 'slice' ? -0.2 : 0, k === 'winding' ? -0.22 : k === 'shadow' ? -0.54 : k === 'slice' ? -0.42 : -0.32);
      sc.tag(k, p, stationLabel(k), 'raw backed c-ik');
    }
    sc.end();
    const q = sc.p(onArc(m.thetaDeg));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }
  /* ---------- strip plot: along θ, which coordinate stays bounded and which runs off ---------- */
  const curve = sample(360, (t) => {
    const a = t * TAU;
    return [720 * t, cs(a), Math.abs(sn(a)), Math.min(4, Math.abs(Math.tan(a)))];
  });
  function drawPlot(m) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    $('plotTitle').textContent = L('沿转角 θ：弧上的 w、‖v‖ 有界，平直坐标在 180° 冲出量程', 'Along θ: w and ‖v‖ stay bounded, the flat coordinate runs off at 180°');
    $('plotMeta').textContent = 'w² + ‖v‖² = 1 · |tan(θ/2)| → ∞ @ 180°, 540°';
    const g = kit.plot(cv, { x: [0, 720], y: [-1.1, 4.1], pad: [32, 14, 12, 22] });
    g.axes({ xTicks: [0, 180, 360, 540, 720], yTicks: [-1, 0, 1, 2, 3, 4], xLabel: 'θ (°)' });
    for (const pole of [180, 540]) g.vline(pole, P.magenta, { alpha: 0.4, dash: [3, 4] });
    [P.sigma, P.cyan, P.magenta].forEach((color, i) =>
      g.line(
        curve.map((row) => [row[0], row[i + 1]]),
        color,
        { width: i === 2 ? 1.8 : 2 }
      )
    );
    g.vline(m.thetaDeg, P.amber);
    g.dot(m.thetaDeg, m.w, P.amber, 3.5);
    g.legend([
      [P.sigma, 'w'],
      [P.cyan, '‖v‖'],
      [P.magenta, 'min(4, |tan(θ/2)|)']
    ]);
  }
  /* ---------- readouts ---------- */
  function ratioNote(r) {
    const d = r.division,
      chain = r.remainders.join(' → ');
    const identity = `${r.q} × ${d.prefix} + ${d.remainder} = 10${sup(d.n)} × ${r.p}`;
    if (!r.period)
      return L(`${r.p}/${r.q}：余数 ${chain}，在第 ${d.n} 位终止；${identity}。`, `${r.p}/${r.q}: remainders ${chain}, terminating after ${d.n} digit${d.n > 1 ? 's' : ''}; ${identity}.`);
    return L(`${r.p}/${r.q}：余数 ${chain}，回到出现过的值，循环节 ${r.period.length} 位；${identity}。`, `${r.p}/${r.q}: remainders ${chain} come back to an earlier value, a repetend of ${r.period.length} digits; ${identity}.`);
  }
  function readings(m, I) {
    $('roKey').textContent = signed(m.w);
    $('roKeySub').textContent = ` · ‖v‖ = ${fmt(m.v)} · 1 − w = ${fmt(m.tax)}`;
    $('roTheta').textContent = `${m.thetaDeg.toFixed(2)}°${m.twoStar ? ' = 2θ*' : ''} · n = ${m.n}`;
    $('roRod').textContent = m.pole ? '∞ · ' + L('极点', 'pole') : fmt(m.rod);
    $('roWitness').textContent = `λ₀ = w = ${signed(m.lambda)} · ‖(Lₓ − λ₀)v‖ = ${fmt(I.flat.residual)}`;
    $('roSlice').textContent = `α = ${fmt(m.tiltDeg).replace(/\.?0+$/, '')}° · Ω = ${fmt(m.omega)} sr`;
    $('roTrace').textContent = signed(m.trace);
    const r = m.rat;
    $('roRatio').textContent = `${r.p}/${r.q} = 0.${r.pre}${r.period ? '(' + r.period + ')' : ''} · ${fmt(r.product)}`;
    $('roNote').textContent = ratioNote(r);
    $('scenePill').innerHTML = `S³ <strong>${L(...LENS_NAME[state.lens])}</strong>`;
    $('keyPill').innerHTML = `w <strong>${signed(m.w)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄沿弧改 θ · 拖空白处转视角 · 空格播放', 'drag the amber handle along the arc · drag empty space to orbit · Space plays');
    $('formula').textContent = 'U = w 1 + sin(θ/2) û·(i, j, k) · w = cos(θ/2)';
    $('lensToggleBtn').setAttribute('aria-pressed', String(state.lens === 1));
  }
  const paint = kit.painter(() => {
    const m = calculate(),
      I = instances(m);
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail: how far along the arc the cyan stretch has run ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: 0.12,
    step: 0.1,
    max: 1,
    format: (t) => 'τ ' + t.toFixed(2),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

  /* a page-local start for a card that plays inside a book: play once the stage is half in view, pause when it leaves,
     and let go for good as soon as the reader touches anything */
  let bootIO = null;
  function bootAutoplay() {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver((entries) => {
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO.observe(stage);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  /** Blend θ and α from `from` to the state over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); state.blend = 1; state.from = null; };
    token.run = kit.tween(ms, (e) => { state.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; state.blend = 1; state.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the shown values become the state, the clock pauses, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    state.thetaDeg = e.thetaDeg;
    state.tiltDeg = e.tiltDeg;
    state.from = null;
    state.blend = 1;
    cards.mark(null);
    clock.pause();
  }
  const snapTheta = (v) => (Math.round(v * 100) === 8469 ? twoStar : kit.clamp(Math.round(v * 100) / 100, 0, 720));
  function rotate(v) {
    state.thetaDeg = snapTheta(v);
    syncFields();
    paint();
  }
  const tf = kit.field($('rotTheta'), {
    fmt: (v) => v.toFixed(2),
    onInput: (v) => {
      leave();
      rotate(v);
    }
  });
  const af = kit.field($('sliceTilt'), {
    fmt: (v) => v + '°',
    onInput: (v) => {
      leave();
      state.tiltDeg = v;
      paint();
    }
  });
  const rf = kit.field($('ratPair'), {
    fmt: (v) => pairs[v].join('/'),
    onInput: (v) => {
      leave();
      state.pqIndex = v;
      paint();
    }
  });
  function syncFields() {
    const e = eff();
    tf.set(Math.round(e.thetaDeg * 100) / 100);
    af.set(Math.round(e.tiltDeg));
    rf.set(state.pqIndex);
  }
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still ? 0 : 600);
    paint();
  });
  $('lensToggleBtn').addEventListener('click', () => {
    state.lens = state.lens ? 0 : 1;
    paint();
  });

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'flat-3d-zero-divisor-gimbal-deadlock': [
      '179° 时平直坐标 |tan(θ/2)| = 114.5887，品红柱封顶在 4；再转一度，柱顶圆环标出极点。',
      'At 179° the flat coordinate |tan(θ/2)| is 114.5887 and the magenta pillar is capped at 4; one degree on, a ring marks the pole.'
    ],
    'hamilton-quaternion-w-shadow-tax': [
      '在两倍不动点 2θ* 处，银白柱高 w = 0.7391，品红矢高 1 − w = 0.2609。',
      'At twice the fixed point, 2θ*, the silver column is w = 0.7391 and the magenta sagitta 1 − w = 0.2609.'
    ],
    'complex-equatorial-hopf-slice': [
      '横倾 α = 0：青色台上的三角形压回赤道，角盈 Ω = 0。',
      'Tilt α = 0: the triangle on the cyan station falls onto the equator and its excess Ω = 0.'
    ],
    'real-trace-geodesic-projection': [
      '转满一圈：空间旋转的迹回到 +3，旋量的半迹 w 却是 −1。',
      'One full turn: the trace of the rotation is back at +3, but the half trace w of the spinor is −1.'
    ],
    'homotopy-pi3-integer-winding': [
      '两圈后旋量回到 +1，两颗银珠计出 n = 2；青色珠是 5/13 的长除余数。',
      'After two turns the spinor is back at +1 and two silver beads count n = 2; the cyan beads are the remainders of 5/13.'
    ]
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'flat-3d-zero-divisor-gimbal-deadlock': ['179°：平直坐标 114.5887，品红柱封顶在 4。', '179°: the flat coordinate is 114.5887; the magenta pillar is capped at 4.'],
    'hamilton-quaternion-w-shadow-tax': ['2θ*：银白柱 w = 0.7391，品红矢高 0.2609。', '2θ*: the silver column is w = 0.7391, the magenta sagitta 0.2609.'],
    'complex-equatorial-hopf-slice': ['α = 0：三角形压回赤道，角盈 Ω = 0。', 'α = 0: the triangle lies on the equator and Ω = 0.'],
    'real-trace-geodesic-projection': ['360°：旋转的迹回到 +3，旋量的半迹是 −1。', '360°: the rotation trace is back at +3, the spinor half trace is −1.'],
    'homotopy-pi3-integer-winding': ['720°：旋量回到 +1，两颗银珠计出 n = 2。', '720°: the spinor is back at +1; two silver beads count n = 2.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    Object.assign(state, { thetaDeg: p.thetaDeg, tiltDeg: p.tiltDeg, pqIndex: p.pqIndex, cam: p.cam, from: null, blend: 1 });
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) {
      if (booting) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄或拉 θ、α 与 p/q，换透镜或视角。时间轴让青色一段沿弧走到当前点。随时可以再选一张卡。', 'Free play: drag the amber handle or pull θ, α and p/q, switch the lens or the view. The rail runs the cyan stretch along the arc to the current point. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag along the arc, or arrow keys ---------- */
  const point = (d) => {
    const q = sc.p(onArc(d)),
      r = $('cv').getBoundingClientRect();
    return { x: r.left + q[0], y: r.top + q[1] };
  };
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    let best = state.thetaDeg,
      gap = Infinity;
    const rect = $('cv').getBoundingClientRect(),
      x = ev.clientX - rect.left,
      y = ev.clientY - rect.top;
    for (let d = 0; d <= 720; d += 0.25) {
      const p = sc.p(onArc(d)),
        dist = hypot(p[0] - x, p[1] - y) + Math.abs(state.thetaDeg - d) * 1e-7;
      if (dist < gap) {
        gap = dist;
        best = d;
      }
    }
    rotate(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    rotate(ev.key === 'Home' ? 0 : ev.key === 'End' ? 720 : state.thetaDeg + (ev.key === 'ArrowLeft' ? -0.25 : 0.25));
  };
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  window.TERNION_NUMBERS_DEBUG = Object.freeze({
    get state() {
      const m = calculate();
      return JSON.parse(JSON.stringify({
        ...m,
        rod: Number.isFinite(m.rod) ? m.rod : null,
        thetaStar: star,
        t: clock.t,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam },
        leanInstances: instances(m)
      }));
    },
    /** Viewport coordinates where the handle would sit at the angle θ (degrees), for drag targets. */
    dragTarget: point
  });
  window.TRV_THUMB = () => {
    cards.pick(ids[1]);
    clock.pause();
    clock.set(0.75);
    paint.now();
  };
  cards.pick(cards.initial(ids[1]));
  booting = false;
  paint.now();
})();
