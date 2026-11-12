/* ORTHO//SAMSARA · 轮回与视界阶梯 · Samsara and the horizon staircase
   The stage is the open unit disk, its rim the horizon θ = 90° of Chapter 36. Three scenes on the same disk:
     stair    the rapidity staircase η_k = η₀ + kΔη, η₀ = gd⁻¹(θ*), along the ray to the right; Beltrami–Klein radius
              r = tanh η (chords), Poincaré radius ρ = tanh(η/2) (orthogonal arcs), morphed by the radial isometry
              ρ = r/(1 + √(1 − r²)); a magnifier on the side keeps the gap to the rim visible
     samsara  the outside angle ruler θ ↦ θ + Δθ: it lands on the rim in finitely many steps, falls back to the centre
              and walks again; one spoke per round (a wheel), folded by the period on request
     cayley   w = (s − 1)/s sends the lines Re s = c to circles inside the disk, Re s = 1/2 to the unit circle
   The rail drives one quantity per scene: the step k, the step n or the position of the line.
   Read-only probe for the browser suite: window.SAMSARA_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const HALF_PI = Math.PI / 2, DEG = 180 / Math.PI;
  const TH = TRV.thumbMode ? 2 : 1;          // thicker strokes on the wordless cover
  const KMAX = 10;                            // staircase steps on the rail
  const ROUNDS = 5;                           // rounds after the first wipe on the wheel

  /* ---------- the model ---------- */
  /** θ*: the root of cos θ = θ (Newton from 0.74). */
  const THETA_STAR = (() => { let x = 0.74; for (let i = 0; i < 40; i++) x -= (Math.cos(x) - x) / (-Math.sin(x) - 1); return x; })();
  const gdInv = (th) => Math.log(Math.tan(th / 2 + Math.PI / 4));
  const gd = (eta) => 2 * Math.atan(Math.exp(eta)) - HALF_PI;
  const ETA0 = gdInv(THETA_STAR);
  /** One rapidity: both radii, both proper-time rates and both gaps, the gaps without forming 1 − tanh. */
  function at(eta) {
    const rBK = Math.tanh(eta), rhoP = Math.tanh(eta / 2);
    const gapBK = 2 / (Math.exp(2 * eta) + 1), gapP = 2 / (Math.exp(eta) + 1);
    // 1 − r² and 1 − ρ² written as (1 − r)(1 + r) from the exact gaps, so that they keep their digits near the rim
    return {
      eta, theta: gd(eta), delta: 2 * Math.atan(Math.exp(-eta)), rBK, rhoP,
      dtdtBK: Math.sqrt(gapBK * (2 - gapBK)), dtdtP: gapP * (2 - gapP) / (1 + rhoP * rhoP), sech: 1 / Math.cosh(eta),
      gapBK, gapP
    };
  }
  /** The radial map from Klein (μ = 0) to Poincaré (μ = 1): a Klein radius r goes to (1 − μ)r + μ r/(1 + √(1 − r²)). */
  const morphR = (r, mu) => (1 - mu) * r + mu * r / (1 + Math.sqrt(Math.max(0, 1 - r * r)));
  const morphP = (p, mu) => { const q = Math.hypot(p[0], p[1]); if (q < 1e-15) return [0, 0]; const f = morphR(Math.min(q, 1), mu) / q; return [p[0] * f, p[1] * f]; };
  /** The gap to the rim of a Klein radius r (given its own exact gap gK = 1 − r) after the morph. */
  function morphGap(r, gK, mu) {
    const rho = r / (1 + Math.sqrt(Math.max(0, gK * (2 - gK))));     // 1 − r² = gK(2 − gK), exactly
    const gP = 1 - rho;
    return (1 - mu) * gK + mu * gP;
  }
  /** Klein radius of the angle θ: sin θ; and its exact gap 1 − sin θ = 2 sin²(π/4 − θ/2). */
  const kleinOfTheta = (th) => ({ r: Math.sin(th), g: 2 * Math.sin(Math.PI / 4 - th / 2) ** 2 });

  /** The geodesic perpendicular to the ray (angle 0) through Klein radius r: a chord x = r, morphed. */
  function wall(r, mu, n) {
    const h = Math.sqrt(Math.max(0, 1 - r * r)), pts = [];
    const N = n || 72;
    for (let i = 0; i <= N; i++) { const y = h * Math.sin(-HALF_PI + Math.PI * i / N); pts.push(morphP([r, y], mu)); }
    return pts;
  }

  /** The angle-ruler walk: θ₀ = θ*, θ ↦ θ + Δθ until it would reach 90°, which it records as exactly 90° (the rim);
      the next step falls back to θ = 0. Rounds: 0 is the walk from θ*, 1 … ROUNDS after each wipe. */
  function walk(dth) {
    const th = [THETA_STAR], light = [false], round = [0];
    let j = 0;
    for (let guard = 0; guard < 400; guard++) {
      const last = th[th.length - 1];
      if (light[light.length - 1]) { j++; if (j > ROUNDS) break; th.push(0); light.push(false); round.push(j); }
      else if (last + dth >= HALF_PI) { th.push(HALF_PI); light.push(true); round.push(j); }
      else { th.push(last + dth); light.push(false); round.push(j); }
    }
    const n0 = round.indexOf(1), p = round.filter((x) => x === 1).length;
    // the readout “step after the first wipe mod p” and the target θ: is the target constant on each fibre?
    const fibre = new Map();
    let constant = true;
    for (let n = n0; n < th.length; n++) { const key = (n - n0) % p; if (!fibre.has(key)) fibre.set(key, th[n]); else if (fibre.get(key) !== th[n]) constant = false; }
    return { th, light, round, n0, p, N: th.length, constant, classes: [...fibre.values()] };
  }

  /* ---------- state ---------- */
  const S = { scene: 'stair', mu: 0, model: 'klein', dEta: 1, k: 8, n: 0, fold: 0, ct: 6 };
  let W = walk(gd(ETA0 + S.dEta) - THETA_STAR);
  const refreshWalk = () => { W = walk(gd(ETA0 + S.dEta) - THETA_STAR); S.n = Math.min(S.n, W.N - 1); };
  const cOf = (t) => 0.5 + Math.pow(2, 1 - t);              // the line Re s = c on the cayley rail
  const SCENES = {
    stair: { max: () => KMAX, rate: 2, step: 1, get: () => S.k, set: (v) => { S.k = v; } },
    samsara: { max: () => W.N - 1, rate: 3, step: 1, get: () => S.n, set: (v) => { S.n = v; } },
    cayley: { max: () => 10, rate: 2, step: 1, get: () => S.ct, set: (v) => { S.ct = v; } }
  };

  /* ---------- drawing ---------- */
  let G = null, layout = null, last = {};
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { if (!G || S.scene === 'samsara') return false; drag = true; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = false; }
  });
  let drag = false;
  const tagAt = (key, x, y, html, cls) => stage.tag(key, [x, y], html, cls, { screen: true });
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const pow10 = (e) => `10${String(e).split('').map((c) => SUP[c]).join('')}`;
  /** x as m × 10ᵉ (or plainly when it is not small). */
  function sci(x, d) {
    if (x === 0) return '0';
    if (x >= 1e-3) return fix(x, d == null ? 4 : d);
    const e = Math.floor(Math.log10(x)), m = x / Math.pow(10, e);
    return `${m.toFixed(d == null ? 2 : Math.min(d, 2))} × ${pow10(e)}`;
  }

  function disk(g, s) {
    const ring = []; for (let i = 0; i <= 240; i++) { const a = 2 * Math.PI * i / 240; ring.push([Math.cos(a), Math.sin(a)]); }
    g.poly(ring, P.cyan, { alpha: 0.035 });
    g.line(ring, P.ink, { width: 2.2 * TH, alpha: 0.95, glow: 10 });
    if (!s || s.ticks !== false) {
      g.line([[-1, 0], [1, 0]], P.dim, { width: 1, alpha: 0.35, dash: [3, 5] });
    }
    return ring;
  }

  /** The magnifier: the neighbourhood of the rim point at angle `alpha`, the rim drawn exactly, `gap` the distance of
      the main point from the rim along the ray, `others` the gaps of further points on the ray, `curves` world
      polylines to draw through the window. Returns the window width U (data units). */
  function magnifier(g, box, alpha, gap, others, curves, s) {
    const c = g.ctx, m = 14 * TH;
    const U = gap > 0 ? Math.pow(10, Math.ceil(Math.log10(gap / 0.72))) : 0.1;
    const sc = (box.w - 2 * m) / U, B = [Math.cos(alpha), Math.sin(alpha)], T = [-Math.sin(alpha), Math.cos(alpha)];
    const X = (u) => box.x + box.w - m - u * sc, Y = (v) => box.y + box.h / 2 - v * sc;
    const local = (p) => [1 - (p[0] * B[0] + p[1] * B[1]), p[0] * T[0] + p[1] * T[1]];
    c.save();
    c.fillStyle = P.stage; c.globalAlpha = 0.86; c.fillRect(box.x, box.y, box.w, box.h); c.globalAlpha = 1;
    c.strokeStyle = P.lineHot; c.lineWidth = 1.2 * TH; c.strokeRect(box.x + 0.5, box.y + 0.5, box.w - 1, box.h - 1);
    c.beginPath(); c.rect(box.x, box.y, box.w, box.h); c.clip();
    // outside the disk (beyond the rim) is left dark; the rim itself, exactly: u = 1 − cos ψ, v = sin ψ
    const V = (box.h / 2) / sc, rim = [];
    for (let i = 0; i <= 120; i++) { const v = -V + 2 * V * i / 120; if (Math.abs(v) <= 1) rim.push([v * v / (1 + Math.sqrt(1 - v * v)), v]); }
    c.beginPath(); rim.forEach((q, i) => (i ? c.lineTo(X(q[0]), Y(q[1])) : c.moveTo(X(q[0]), Y(q[1])))); c.lineTo(box.x - 10, Y(V) - 10); c.lineTo(box.x - 10, Y(-V) + 10); c.closePath();
    c.fillStyle = P.cyan; c.globalAlpha = 0.05; c.fill(); c.globalAlpha = 1;
    c.beginPath(); rim.forEach((q, i) => (i ? c.lineTo(X(q[0]), Y(q[1])) : c.moveTo(X(q[0]), Y(q[1])))); c.strokeStyle = P.ink; c.lineWidth = 2.4 * TH; c.shadowColor = P.ink; c.shadowBlur = 8; c.stroke(); c.shadowBlur = 0;
    for (const cv of curves || []) {
      c.beginPath(); let pen = false;
      for (const p of cv.pts) { const q = local(p), x = X(q[0]), y = Y(q[1]); if (pen) c.lineTo(x, y); else { c.moveTo(x, y); pen = true; } }
      c.strokeStyle = cv.color; c.globalAlpha = cv.alpha == null ? 0.8 : cv.alpha; c.lineWidth = (cv.width || 1.4) * TH; c.setLineDash(cv.dash || []); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
    }
    for (const u of others || []) if (u < U * 1.05 && u > 0) { c.fillStyle = P.cyan; c.beginPath(); c.arc(X(u), Y(0), 3.6 * TH, 0, 2 * Math.PI); c.fill(); }
    // the gap: a magenta bar between the point and the rim
    const yb = Y(0) + 16 * TH;
    if (gap > 0) {
      c.strokeStyle = P.magenta; c.lineWidth = 3 * TH; c.shadowColor = P.magenta; c.shadowBlur = 8;
      c.beginPath(); c.moveTo(X(gap), yb); c.lineTo(X(0), yb); c.stroke(); c.shadowBlur = 0;
      c.lineWidth = 1.4 * TH; c.beginPath(); c.moveTo(X(gap), yb - 6); c.lineTo(X(gap), yb + 6); c.moveTo(X(0), yb - 6); c.lineTo(X(0), yb + 6); c.stroke();
    }
    const col = s && s.hitColor ? s.hitColor : P.amber;
    c.fillStyle = col; c.shadowColor = col; c.shadowBlur = 14; c.beginPath(); c.arc(X(gap), Y(0), 6.5 * TH, 0, 2 * Math.PI); c.fill(); c.shadowBlur = 0;
    c.restore();
    if (!TRV.thumbMode) {
      const fov = pow10(Math.round(Math.log10(U))), small = box.w < 230;
      tagAt('magU', box.x + box.w / 2, box.y + 13, small ? L(`视野 ${fov}`, `field ${fov}`) : L(`放大镜 · 视野宽 ${fov}`, `magnifier · field ${fov} wide`), 'raw ink');
      tagAt('magG', box.x + box.w / 2, small ? box.y - 12 : box.y + box.h - 14, gap > 0 ? L(`缝 ${sci(gap)}`, `gap ${sci(gap)}`) : L('缝 = 0：撞上边界', 'gap = 0: on the rim'), 'raw mg');
    }
    return { U, X, Y };
  }

  /** The magnifier box in CSS pixels, or null when the stage has no room for one. */
  function magBox(g) {
    const R = g.scale, cx = g.X(0), cy = g.Y(0);
    const right = g.pl + g.iw - 8;
    if (layout.side) {
      const x = g.X(1) + 0.16 * R, w = Math.min(right - x, 1.25 * R), h = Math.min(w * 0.82, g.ih - 8);
      return { x, y: cy - h / 2, w, h };
    }
    const w = Math.min(0.9 * R, 200), h = w * 0.72;
    return { x: right - w, y: g.pt + g.ih - h - 4, w, h, corner: true };
  }
  function leader(g, box, p) {
    const c = g.ctx; c.save(); c.strokeStyle = P.dim; c.globalAlpha = 0.7; c.setLineDash([3, 4]); c.lineWidth = 1;
    // a leader only when it can run straight out to the box without crossing the disk (the rim point on the right)
    if (p[0] > 0.999 && !box.corner) { c.beginPath(); c.moveTo(g.X(p[0]), g.Y(p[1])); c.lineTo(box.x, box.y + box.h / 2); c.stroke(); }
    c.setLineDash([]);
    c.strokeRect(g.X(p[0]) - 5, g.Y(p[1]) - 5, 10, 10); c.restore();
  }

  /* ---------- scene: the staircase ---------- */
  function drawStair(g) {
    const mu = S.mu, dE = S.dEta;
    disk(g);
    // rings of equal hyperbolic distance η = 1, 2, … from the centre (faint)
    for (let j = 1; j <= 6; j++) {
      const r = morphR(Math.tanh(j), mu), ring = [];
      for (let i = 0; i <= 160; i++) { const a = 2 * Math.PI * i / 160; ring.push([r * Math.cos(a), r * Math.sin(a)]); }
      g.line(ring, P.dim, { width: TH, alpha: 0.22, dash: [2, 5] });
    }
    const kNow = S.k, kInt = Math.floor(kNow + 1e-9);
    // future walls (faint), past walls (cyan); the Klein chords as a dashed ghost once the disk is bent
    for (let k = 0; k <= KMAX; k++) {
      const a = at(ETA0 + k * dE), pts = wall(a.rBK, mu);
      if (mu > 0.01) g.line(wall(a.rBK, 0), P.dim, { width: TH, alpha: 0.4 * Math.min(1, mu * 3), dash: [4, 4] });
      g.line(pts, P.cyan, k <= kInt ? { width: 1.5 * TH, alpha: 0.75 } : { width: TH, alpha: 0.16 });
    }
    const cur = at(ETA0 + kNow * dE), curR = morphR(cur.rBK, mu);
    g.line(wall(cur.rBK, mu), P.amber, { width: 1.8 * TH, alpha: 0.9 });
    g.line([[0, 0], [1, 0]], P.dim, { width: 1.2 * TH, alpha: 0.7 });
    for (let k = 0; k <= kInt; k++) { const a = at(ETA0 + k * dE); g.dot(morphR(a.rBK, mu), 0, P.cyan, 4.2 * TH, { glow: 8 }); }
    g.dot(curR, 0, P.amber, 7 * TH, { glow: 16 });
    const box = magBox(g);
    const gapNow = morphGap(cur.rBK, cur.gapBK, mu), others = [];
    for (let k = 0; k <= kInt; k++) { const a = at(ETA0 + k * dE); others.push(morphGap(a.rBK, a.gapBK, mu)); }
    let mag = null;
    if (box) {
      leader(g, box, [1, 0]);
      mag = magnifier(g, box, 0, gapNow, others, [{ pts: wall(cur.rBK, mu, 400), color: P.amber, width: 1.6 }]);
    }
    if (!TRV.thumbMode) {
      const a0 = at(ETA0);
      tagAt('sK0', g.X(morphR(a0.rBK, mu)), g.Y(0) + 22, `k = 0 · θ*`, 'raw cy');
      tagAt('sRim', g.X(Math.cos(2.2)) - 26, g.Y(Math.sin(2.2)) - 12, L('边界 θ = 90°', 'rim θ = 90°'), 'raw ink');
      tagAt('sNow', g.X(curR) - 34, g.Y(0) - 22, `k = ${fix(kNow, kNow % 1 ? 2 : 0)}`, 'raw hot');
    }
    return { cur, curR, gapNow, mag, box };
  }

  /* ---------- scene: the wheel ---------- */
  function spokeAngle(round) { return (1 - S.fold) * round * (2 * Math.PI / (ROUNDS + 1)); }
  function statePoint(n) {
    const th = W.th[n], k = kleinOfTheta(th), r = W.light[n] ? 1 : morphR(k.r, S.mu), a = spokeAngle(W.round[n]);
    return [r * Math.cos(a), r * Math.sin(a)];
  }
  function walkerPos(t) {
    const n = Math.min(Math.floor(t + 1e-9), W.N - 1), f = t - n;
    if (n >= W.N - 1 || f < 1e-9) return statePoint(n);
    const a = statePoint(n), b = statePoint(n + 1);
    if (W.round[n] === W.round[n + 1]) {      // along the spoke: interpolate the angle θ, not the radius
      const th = W.th[n] + (W.th[n + 1] - W.th[n]) * f, k = kleinOfTheta(th), r = morphR(k.r, S.mu), ang = spokeAngle(W.round[n]);
      return [r * Math.cos(ang), r * Math.sin(ang)];
    }
    return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];   // the fall back to the centre
  }
  function drawSamsara(g) {
    disk(g, { ticks: false });
    const nNow = S.n, nInt = Math.min(Math.floor(nNow + 1e-9), W.N - 1);
    // spokes of the wheel
    for (let j = 0; j <= ROUNDS; j++) { const a = spokeAngle(j); g.line([[0, 0], [Math.cos(a), Math.sin(a)]], P.dim, { width: TH, alpha: j === 0 ? 0.55 : 0.35, dash: j === 0 ? [] : [3, 5] }); }
    // the path walked so far
    for (let n = 0; n < nInt; n++) {
      const a = statePoint(n), b = statePoint(n + 1);
      if (W.round[n] === W.round[n + 1]) g.line([a, b], P.cyan, { width: 2 * TH, alpha: 0.8 });
      else g.line([a, b], P.dim, { width: 1.2 * TH, alpha: 0.7, dash: [4, 4] });
    }
    const pos = walkerPos(nNow);
    if (nNow > nInt + 1e-9 && nInt < W.N - 1) g.line([statePoint(nInt), pos], W.round[nInt] === W.round[nInt + 1] ? P.cyan : P.dim, { width: 2 * TH, alpha: 0.8, dash: W.round[nInt] === W.round[nInt + 1] ? [] : [4, 4] });
    // visited states: cyan dots, the hits on the rim magenta rings
    const mult = new Map();
    for (let n = 0; n <= nInt; n++) {
      const p = statePoint(n);
      if (W.light[n]) g.dot(p[0], p[1], P.magenta, 7 * TH, { ring: true, width: 2.2 * TH, glow: 10 });
      else g.dot(p[0], p[1], W.round[n] === 0 ? P.ink : P.cyan, 4.2 * TH, { glow: 6 });
      if (n >= W.n0) { const key = (n - W.n0) % W.p; mult.set(key, (mult.get(key) || 0) + 1); }
    }
    g.dot(pos[0], pos[1], P.amber, 7 * TH, { glow: 16 });
    // the magnifier: how far the current state is from the rim along its spoke
    const box = magBox(g), cur = W.th[nInt], kc = kleinOfTheta(cur), gapNow = W.light[nInt] ? 0 : morphGap(kc.r, kc.g, S.mu);
    let mag = null;
    if (box) {
      const ang = spokeAngle(W.round[nInt]);
      leader(g, box, [Math.cos(ang), Math.sin(ang)]);
      mag = magnifier(g, box, ang, gapNow, [], [], { hitColor: W.light[nInt] ? P.magenta : P.amber });
    }
    if (!TRV.thumbMode) {
      const p0 = statePoint(0);
      tagAt('wS', g.X(p0[0]), g.Y(p0[1]) + 18, 'θ*', 'raw ink');
      if (S.fold > 0.98) {
        const seen = new Set();
        for (let n = W.n0; n <= nInt; n++) {
          const key = (n - W.n0) % W.p; if (seen.has(key)) continue; seen.add(key);
          const p = statePoint(n), m = mult.get(key);
          if (m > 1) tagAt(`wM${key}`, g.X(p[0]) + (W.light[n] ? 14 : 0), g.Y(p[1]) + (key % 2 ? 20 : -20), `×${m}`, W.light[n] ? 'raw mg' : 'raw cy');
        }
      } else {
        for (let j = 1; j <= ROUNDS; j++) {
          const first = W.round.indexOf(j); if (first < 0 || first > nInt) continue;
          const a = spokeAngle(j), rr = 1.1;
          tagAt(`wR${j}`, g.X(rr * Math.cos(a)), g.Y(rr * Math.sin(a)), L(`第 ${j} 圈`, `round ${j}`), 'raw ink');
        }
      }
    }
    return { pos, gapNow, mag, mult: [...mult.entries()] };
  }

  /* ---------- scene: the fractional map ---------- */
  function circleOfLine(c) { return { centre: 1 - 1 / (2 * c), radius: 1 / (2 * c) }; }
  const cayley = (re, im) => { const d = re * re + im * im; return [1 - re / d, im / d]; };    // 1 − 1/s
  function drawCayley(g) {
    disk(g, { ticks: false });
    g.dot(1, 0, P.ink, 6 * TH, { ring: true, width: 1.6 * TH });
    const tNow = S.ct, jInt = Math.floor(tNow + 1e-9);
    const circ = (c) => { const o = circleOfLine(c), pts = []; for (let i = 0; i <= 200; i++) { const a = 2 * Math.PI * i / 200; pts.push([o.centre + o.radius * Math.cos(a), o.radius * Math.sin(a)]); } return pts; };
    for (let j = 0; j <= 10; j++) g.line(circ(cOf(j)), P.cyan, j <= jInt ? { width: 1.5 * TH, alpha: 0.7 } : { width: TH, alpha: 0.14 });
    const c = cOf(tNow), o = circleOfLine(c);
    g.line(circ(c), P.amber, { width: 2.2 * TH, glow: 10 });
    // the images of a few points of the line: s = c + iy
    const samples = [];
    for (const y of [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4]) { const w = cayley(c, y * c); samples.push({ s: [c, y * c], w, abs: Math.hypot(w[0], w[1]) }); g.dot(w[0], w[1], P.amber, (y === 0 ? 6 : 3.4) * TH, { glow: y === 0 ? 12 : 0 }); }
    const left = o.centre - o.radius, gapNow = 1 + left;      // distance of w(c) = 1 − 1/c from the rim point −1
    const box = magBox(g);
    let mag = null;
    if (box) {
      leader(g, box, [-1, 0]);
      const others = []; for (let j = 0; j <= jInt; j++) { const oj = circleOfLine(cOf(j)); others.push(1 + oj.centre - oj.radius); }
      mag = magnifier(g, box, Math.PI, gapNow, others, [{ pts: circ(c), color: P.amber, width: 1.6 }]);
    }
    if (!TRV.thumbMode) {
      tagAt('cOne', g.X(1) + 14, g.Y(0) - 18, 'w = 1', 'raw ink');
      tagAt('cW', g.X(left) + 4, g.Y(0) + 20, `s = ${fix(c, 3)}`, 'raw hot');
      tagAt('cU', g.X(Math.cos(2.3)) - 34, g.Y(Math.sin(2.3)) - 12, 'Re s = 1/2', 'raw ink');
    }
    return { c, o, samples, gapNow, mag, left };
  }

  /* ---------- the stage ---------- */
  function drawStage() {
    const cv = $('cv'), st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 24 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 24 : Math.max(16, $('legend').offsetHeight + 18);
    const aw = cv.clientWidth - 24, ah = cv.clientHeight - top - bottom;
    layout = { side: aw / Math.max(1, ah) > 1.3, top, bottom };
    stage.begin();
    // wide stage: the magnifier to the right of the disk; narrow stage: in the corner below and to the right
    const xr = layout.side ? [-1.06, 1.06 + Math.min(1.6, Math.max(0.9, 2.12 * aw / ah - 2.12))] : [-1.06, 1.81];
    const yr = layout.side ? [-1.06, 1.06] : [-1.51, 1.06];
    const g = kit.plot(cv, { x: xr, y: yr, equal: true, pad: [12, 12, top, bottom], clear: false });
    G = g;
    let out;
    if (S.scene === 'stair') out = drawStair(g);
    else if (S.scene === 'samsara') out = drawSamsara(g);
    else out = drawCayley(g);
    stage.end();
    last = out || {};
  }

  /** Pointer → disk point. */
  function ptr(ev) { const r = $('cv').getBoundingClientRect(); return [G.invX(ev.clientX - r.left), G.invY(ev.clientY - r.top)]; }
  function aim(ev) {
    const p = ptr(ev);
    cards.mark(null); stopTween();
    if (S.scene === 'stair') {
      const q = clamp(p[0], 0, 0.999999);
      let lo = 0, hi = 0.99999999;            // invert the radial morph by bisection
      for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2; if (morphR(m, S.mu) < q) lo = m; else hi = m; }
      const eta = Math.atanh(lo);
      clock.pause(); clock.set(clamp((eta - ETA0) / S.dEta, 0, KMAX));
    } else if (S.scene === 'cayley') {
      const x = clamp(p[0], -0.996, 0.66), c = 1 / (1 - x);
      clock.pause(); clock.set(clamp(1 - Math.log2(Math.max(1e-9, c - 0.5)), 0, 10));
    }
  }

  /* ---------- strip: one question per scene ---------- */
  function drawPlot() {
    const cv = $('plot'), sc = S.scene;
    let g;
    if (sc === 'stair') {
      $('plotTitle').innerHTML = L('到边界还差多少（对数刻度）：每步缩小，永不为零', 'How far from the rim (log scale): smaller every step, never zero');
      g = kit.plot(cv, { x: [0, KMAX], y: [1e-15, 1], logY: true, pad: [44, 10, 8, 22] });
      g.axes({ yTicks: [[1, '1'], [1e-3, pow10(-3)], [1e-6, pow10(-6)], [1e-9, pow10(-9)], [1e-12, pow10(-12)], [1e-15, pow10(-15)]], xTicks: [0, 2, 4, 6, 8, 10] });
      const bk = [], pc = [];
      for (let i = 0; i <= 200; i++) { const k = KMAX * i / 200, a = at(ETA0 + k * S.dEta); bk.push([k, a.gapBK]); pc.push([k, a.gapP]); }
      g.line(pc, P.cyan, { width: 1.5, dash: [5, 4], alpha: 0.85 });
      g.line(bk, P.cyan, { width: 2.2 });
      for (let k = 0; k <= KMAX; k++) { const a = at(ETA0 + k * S.dEta); g.dot(k, a.gapBK, P.cyan, 3); g.dot(k, a.gapP, P.cyan, 2.4, { ring: true, width: 1.2 }); }
      g.vline(S.k, P.amber, { alpha: 0.85 });
      g.legend([[P.cyan, L('Klein：1 − tanh η', 'Klein: 1 − tanh η')], [P.cyan, L('庞加莱：1 − tanh(η/2)', 'Poincaré: 1 − tanh(η/2)'), 'dash']], {});
      $('plotMeta').textContent = `k · Δη = ${fix(S.dEta, 2)}`;
    } else if (sc === 'samsara') {
      $('plotTitle').innerHTML = L('每一步的捏合账：撞上边界那一步，轴向记忆归零', 'The pinching ledger of each step: on the rim the axial memory is zero');
      g = kit.plot(cv, { x: [-0.6, W.N - 0.4], y: [0, 0.8], pad: [34, 10, 8, 22] });
      const xt = []; for (let n = 0; n < W.N; n += W.N > 30 ? 10 : 5) xt.push(n);
      g.axes({ yTicks: [[0, '0'], [0.25, '¼'], [0.5, '½']], xTicks: xt });
      for (let n = 0; n < W.N; n++) {
        const c = Math.cos(W.th[n]), s = Math.sin(W.th[n]), a = n <= S.n + 1e-9 ? 0.9 : 0.25;
        g.rect(n - 0.34, 0, n + 0.34, 0.5 * c * c, P.cyan, { alpha: a });
        g.rect(n - 0.34, 0.5 * c * c, n + 0.34, 0.5, P.magenta, { alpha: a * 0.85 });
      }
      g.vline(S.n, P.amber, { alpha: 0.9 });
      g.legend([[P.cyan, L('轴向偏置 ½c²（留在对角）', 'axial bias ½c² (kept on the diagonal)')], [P.magenta, L('相干 ½s²（被捏掉）', 'coherence ½s² (pinched away)')]], {});
      $('plotMeta').textContent = `n · p = ${W.p}`;
    } else {
      $('plotTitle').innerHTML = L('像圆的半径 1/(2c)：一步步逼近 1，到不了 1', 'Radius 1/(2c) of the image circle: closer to 1 every step, never 1');
      g = kit.plot(cv, { x: [0, 10], y: [0, 1.12], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']], xTicks: [0, 2, 4, 6, 8, 10] });
      g.hline(1, P.ink, { width: 1.6, alpha: 0.85 });
      const pts = []; for (let i = 0; i <= 200; i++) { const t = 10 * i / 200; pts.push([t, 1 / (2 * cOf(t))]); }
      g.line(pts, P.cyan, { width: 2.2 });
      for (let j = 0; j <= 10; j++) g.dot(j, 1 / (2 * cOf(j)), P.cyan, 3);
      g.vline(S.ct, P.amber, { alpha: 0.85 }); g.dot(S.ct, 1 / (2 * cOf(S.ct)), P.amber, 4.5);
      g.legend([[P.cyan, L('像圆半径', 'image radius')], [P.ink, L('单位圆：Re s = 1/2 的像', 'unit circle: image of Re s = 1/2')]], { bottom: true });
      $('plotMeta').textContent = 'j · c = 1/2 + 2¹⁻ʲ';
    }
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const LEGEND = {
    stair: [['cy', '阶梯的点与过每一级的测地线', 'staircase points and the geodesic through each step'], ['am', '当前一步', 'the current step'], ['mg', '到边界的缝', 'the gap to the rim'], ['dm', '白色圆周：视界 θ = 90°', 'white rim: the horizon θ = 90°']],
    samsara: [['cy', '角度尺走过的路', 'the path on the angle ruler'], ['mg', '撞上边界（擦表）', 'hitting the rim (wipe)'], ['am', '当前一步', 'the current step'], ['dm', '虚线：回到圆心', 'dashed: back to the centre']],
    cayley: [['cy', '直线 Re s = c 的像', 'images of the lines Re s = c'], ['am', '当前这条直线的像', 'image of the current line'], ['dm', '白色单位圆：Re s = 1/2 的像', 'white unit circle: image of Re s = 1/2']]
  };
  const modelName = () => (S.mu < 0.5 ? L('Klein', 'Klein') : L('庞加莱', 'Poincaré'));
  function drawText() {
    const sc = S.scene;
    let big, sub, key, keyName, rows, note, aside, pill;
    if (sc === 'stair') {
      const a = at(ETA0 + S.k * S.dEta), g = morphGap(a.rBK, a.gapBK, S.mu);
      big = L(`阶梯 · k = ${fix(S.k, S.k % 1 ? 2 : 0)}`, `Staircase · k = ${fix(S.k, S.k % 1 ? 2 : 0)}`);
      sub = `${modelName()} · η = ${fix(a.eta, 3)} · δ = π/2 − θ = ${sci(a.delta)} · <span class="c-mg">${L('缝', 'gap')} ${sci(g)}</span>`;
      keyName = L(`到边界的缝 1 − r（${modelName()}）`, `gap to the rim 1 − r (${modelName()})`);
      key = sci(g);
      rows = row('', 'η₀ = gd⁻¹(θ*)', 'η₀ = gd⁻¹(θ*)', fix(ETA0, 6))
        + row('', '余项 δ = π/2 − θ', 'remainder δ = π/2 − θ', `${sci(a.delta)} rad`)
        + row('c', 'Klein 半径 tanh η', 'Klein radius tanh η', fix(a.rBK, 8))
        + row('c', '庞加莱半径 tanh(η/2)', 'Poincaré radius tanh(η/2)', fix(a.rhoP, 8))
        + row('c', 'dτ/dt = √(1 − r²)', 'dτ/dt = √(1 − r²)', sci(a.dtdtBK, 6))
        + row('c', 'dτ/dt = (1 − ρ²)/(1 + ρ²)', 'dτ/dt = (1 − ρ²)/(1 + ρ²)', sci(a.dtdtP, 6));
      note = L(`第 ${Math.floor(S.k + 1e-9)} 级：横向覆盖 sin θ = ${fix(a.rBK, 8)}，自指锚点 cos θ = sech η = ${sci(a.sech)} 仍大于 0。`, `Step ${Math.floor(S.k + 1e-9)}: sideways coverage sin θ = ${fix(a.rBK, 8)}, and the anchor cos θ = sech η = ${sci(a.sech)} is still above 0.`);
      aside = 'η_k = η₀ + kΔη';
      pill = ['1 − r', sci(g, 1)];
    } else if (sc === 'samsara') {
      const n = Math.min(Math.floor(S.n + 1e-9), W.N - 1), th = W.th[n], c = Math.cos(th), s = Math.sin(th);
      const diag = 0.5 + 0.5 * c * c, off = 0.5 * s * s;
      big = L(`轮回 · n = ${n}`, `Wheel · n = ${n}`);
      sub = `${L(`第 ${W.round[n]} 圈`, `round ${W.round[n]}`)} · θ = ${fix(th * DEG, 2)}° · ${W.light[n] ? `<span class="c-mg">${L('撞上边界', 'on the rim')}</span>` : `<span class="c-cy">½c² = ${fix(0.5 * c * c, 3)}</span>`} · p = ${W.p}`;
      keyName = L('‖ρ‖² = 对角 + 被捏掉的', '‖ρ‖² = diagonal + pinched');
      key = `${fix(diag + off, 6)} <small>= ${fix(diag, 4)} + ${fix(off, 4)}</small>`;
      rows = row('', '角度尺的一步 Δθ', 'angle-ruler step Δθ', `${fix(gd(ETA0 + S.dEta) - THETA_STAR, 4)} rad`)
        + row('c', '轴向偏置 ½c²', 'axial bias ½c²', fix(0.5 * c * c, 4))
        + row('m', '被捏掉的相干 ½s²', 'pinched coherence ½s²', fix(off, 4))
        + row('', '周期 p · 首次撞边的步', 'period p · first hit at step', `${W.p} · ${W.n0 - 1}`)
        + row('', '每条纤维上 θ 取常值', 'θ constant on every fibre', W.constant ? L('是', 'yes') : L('否', 'no'));
      note = W.light[n] ? L('这一步落在圆周上：c = 0，轴向偏置归零，整整 ½ 的相干被捏掉；下一步回到圆心重新走。', 'This step lands on the rim: c = 0, the axial bias is gone and a full ½ of coherence is pinched away; the next step falls back to the centre.')
        : S.fold > 0.5 ? L(`折叠后，第一次擦表之后的 ${W.N - W.n0} 步只落在 ${W.p} 个位置上。`, `Folded, the ${W.N - W.n0} steps after the first wipe land on only ${W.p} positions.`)
          : L(`每一圈 ${W.p} 步：${W.p - 1} 步在圆盘里，1 步撞上边界。`, `Each round has ${W.p} steps: ${W.p - 1} inside the disk and 1 on the rim.`);
      aside = 'θ ↦ θ + Δθ';
      pill = ['p', String(W.p)];
    } else {
      const c = cOf(S.ct), o = circleOfLine(c), w = cayley(c, 0), wHalf = cayley(0.5, 1.3);
      big = L(`分式 · c = ${fix(c, 4)}`, `Fractional map · c = ${fix(c, 4)}`);
      sub = `${L('像圆', 'image circle')} ${L('圆心', 'centre')} ${fix(o.centre, 4)} · ${L('半径', 'radius')} ${fix(o.radius, 4)} · <span class="c-mg">${L('缝', 'gap')} ${sci(1 + o.centre - o.radius)}</span>`;
      keyName = L('|w| 在 s = c 处', '|w| at s = c');
      key = fix(Math.hypot(w[0], w[1]), 6);
      rows = row('', 'Re s = c', 'Re s = c', fix(c, 6))
        + row('c', '像圆的半径 1/(2c)', 'image radius 1/(2c)', fix(o.radius, 6))
        + row('', '|w| 在 s = c ± 4ci', '|w| at s = c ± 4ci', fix(Math.hypot(...cayley(c, 4 * c)), 6))
        + row('', '|w| 在 s = ½ + 1.3i', '|w| at s = ½ + 1.3i', fix(Math.hypot(wHalf[0], wHalf[1]), 6));
      note = L('琥珀色的点都落在单位圆里面；w = 1 是所有像圆共同的切点，却不是任何有限 s 的像。', 'All amber points lie inside the unit circle; w = 1 is where every image circle touches it, yet it is the image of no finite s.');
      aside = 'w = (s − 1)/s';
      pill = ['c', fix(c, 3)];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { stair: L('阶梯', 'STAIRCASE'), samsara: L('轮回', 'WHEEL'), cayley: L('分式', 'FRACTIONAL') }[sc];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[sc].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: KMAX, rate: 2, step: 1, t: S.k,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => {
      if (S.scene === 'stair') return `k = ${fix(t, 2)} <small>/ ${fix(max, 0)} · η = ${fix(ETA0 + t * S.dEta, 3)}</small>`;
      if (S.scene === 'samsara') return `n = ${fix(t, 2)} <small>/ ${fix(max, 0)}</small>`;
      return `j = ${fix(t, 2)} <small>/ 10 · c = ${fix(cOf(t), 4)}</small>`;
    },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      SCENES[S.scene].set(t);
      paint();
    }
  });
  function setScene(sc) {
    S.scene = sc; sceneChips.set(sc, true); stopAt = null;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause();
    const cf = SCENES[sc];
    clock.rate = cf.rate; clock.step = cf.step; clock.setMax(cf.max(), true); clock.set(cf.get());
  }

  /* ---------- controls ---------- */
  let morphTween = null, foldTween = null;
  function stopTween() { if (morphTween) { morphTween.cancel(); morphTween = null; } if (foldTween) { foldTween.cancel(); foldTween = null; } tweenPlaying = false; }
  let tweenPlaying = false;
  function setModel(m, animate, done) {
    S.model = m; modelChips.set(m, true);
    const to = m === 'poincare' ? 1 : 0, from = S.mu;
    if (morphTween) morphTween.cancel();
    if (!animate) { S.mu = to; morphTween = null; paint(); if (done) done(); return; }
    morphTween = kit.tween(1600, (e) => { S.mu = from + (to - from) * e; paint(); }, () => { morphTween = null; S.mu = to; paint(); if (done) done(); });
  }
  function setFold(f, animate, done) {
    foldChips.set(String(f), true);
    const from = S.fold;
    if (foldTween) foldTween.cancel();
    if (!animate) { S.fold = f; foldTween = null; paint(); if (done) done(); return; }
    foldTween = kit.tween(1600, (e) => { S.fold = from + (f - from) * e; paint(); }, () => { foldTween = null; S.fold = f; paint(); if (done) done(); });
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); stopTween(); setScene(v); });
  const modelChips = kit.chips($('modelChips'), 'model', (v) => { leave(); setModel(v, true); });
  const foldChips = kit.chips($('foldChips'), 'fold', (v) => { leave(); setFold(Number(v), true); });
  const fD = kit.field($('dEta'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.dEta = v; refreshWalk(); const cf = SCENES[S.scene]; clock.setMax(cf.max(), true); clock.set(cf.get()); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({
    1: () => { leave(); stopTween(); setScene('stair'); }, 2: () => { leave(); stopTween(); setScene('samsara'); }, 3: () => { leave(); stopTween(); setScene('cayley'); },
    m: () => { leave(); setModel(S.model === 'klein' ? 'poincare' : 'klein', true); }
  });

  /* ---------- experiment cards ----------
     scene, model, Δη, the rail's start and stop (from, to; a still shows `to`), and the cards that play a transition
     instead of the rail (morph: Klein → Poincaré; fold: unrolled → folded). */
  const PRESETS = {
    staircase: { scene: 'stair', model: 'klein', dEta: 1, from: 0, to: 8 },
    horizon_gap: { scene: 'stair', model: 'klein', dEta: 1.5, from: 4, to: 10 },
    klein_vs_poincare: { scene: 'stair', model: 'poincare', dEta: 1, at: 3, morph: true },
    erase_reset: { scene: 'samsara', model: 'poincare', dEta: 1, fold: 0, from: 0, to: 'round2' },
    quotient_fold: { scene: 'samsara', model: 'poincare', dEta: 1, at: 'end', fold: 1, foldAnim: true },
    cayley: { scene: 'cayley', from: 0, to: 6 }
  };
  const NOTES = {
    staircase: ['从自指平衡角 θ* 出发（η₀ ≈ 0.817），快度每步加 Δη = 1。青色的点沿射线一级级走向白色的圆周，过每一级的青色直弦都比上一条更挤向边界；走到第 8 级，sin θ = 0.99999996，右边放大镜里品红的缝仍然张开。', 'Starting from the self-referential balance angle θ* (η₀ ≈ 0.817), each step adds Δη = 1 of rapidity. The cyan points walk out along the ray toward the white rim, and each cyan chord through a step crowds closer to the rim than the one before; at step 8, sin θ = 0.99999996, and the magenta gap in the magnifier on the right is still open.'],
    horizon_gap: ['步长加到 Δη = 1.5，从第 4 级走到第 10 级：琥珀色的点在主图上已经贴住圆周，放大镜却一次次把视野缩小十倍，品红的缝始终撑满视野的一截；到第 10 级，缝只剩约 3.6 × 10⁻¹⁴，仍然不是 0。', 'With the step raised to Δη = 1.5, walk from step 4 to step 10: on the main disk the amber point already hugs the rim, yet the magnifier keeps narrowing its field tenfold and the magenta gap always fills part of it; at step 10 the gap is about 3.6 × 10⁻¹⁴, and still not 0.'],
    klein_vs_poincare: ['停在第 3 级，把 Beltrami–Klein 圆盘换成庞加莱圆盘：每个点沿射线从 r = tanh η 挪到 ρ = tanh(η/2)，青色的直弦（灰色虚线是它们原来的位置）弯成与白色圆周正交的圆弧。读数里两种算法的固有时率 √(1 − r²) 与 (1 − ρ²)/(1 + ρ²) 一样，都是 sech η。', 'Stop at step 3 and swap the Beltrami–Klein disk for the Poincaré disk: each point moves along the ray from r = tanh η to ρ = tanh(η/2), and the cyan chords (the grey dashed lines are where they were) bend into arcs that meet the white rim at right angles. In the readouts the two proper-time rates √(1 − r²) and (1 − ρ²)/(1 + ρ²) agree: both are sech η.'],
    erase_reset: ['换成外部角度尺：每步把 θ 加上同样的 Δθ（与阶梯的第一步相同）。第二步就越过 90°，点落在圆周上（品红圈），轴向记忆 ½c² 归零；接着沿虚线回到圆心，换一根辐条从 0 开始重新走，又在第 4 步后撞上圆周。', 'Switch to the outside angle ruler: each step adds the same Δθ to θ (the staircase\'s own first step). The second step already passes 90°, the point lands on the rim (magenta ring) and the axial memory ½c² is zero; then it falls back to the centre along the dashed line and starts again from 0 on a new spoke, hitting the rim again after 4 steps.'],
    quotient_fold: ['走完五圈后，把轮子按周期折叠：五根辐条转到同一个方向，第一次擦表之后的 25 步只落在 5 个位置上，每处叠着 5 次，品红圈全叠在圆周上的同一点；只剩最初从 θ* 出发的那一圈（白点）不在这 5 个位置里。', 'After five rounds, fold the wheel by its period: the five spokes turn to one direction, and the 25 steps after the first wipe land on only 5 positions, 5 times each, the magenta rings all on one point of the rim; only the first walk from θ* (white dots) lies outside these 5 positions.'],
    cayley: ['分式变换 w = (s − 1)/s 把竖直线 Re s = c 变成圆：c 从 2.5 一步步减到接近 1/2，青色的像圆一个套一个，都在 w = 1 处与白色单位圆相切，并越来越贴近它；左边放大镜里，像圆与单位圆之间品红的缝在缩小，但对每个 c > 1/2 都还在。', 'The fractional map w = (s − 1)/s turns the vertical lines Re s = c into circles: as c steps down from 2.5 toward 1/2, the cyan image circles nest inside one another, all touching the white unit circle at w = 1 and hugging it ever closer; in the magnifier the magenta gap between the image circle and the unit circle shrinks, but is still there for every c > 1/2.']
  };
  let booting = true;
  /** A card that plays a transition (morph or fold) runs through this stand-in clock, so a book starts it when seen. */
  function transitionPlayer(run) {
    const pl = { playing: false, pause() {}, play() { pl.playing = tweenPlaying = true; run(() => { pl.playing = tweenPlaying = false; }); } };
    return pl;
  }
  function stopOf(p) { if (p.to === 'round2') return W.round.indexOf(2) + 2; if (p.at === 'end') return W.N - 1; return p.to; }
  function applyPreset(id) {
    const p = PRESETS[id];
    stopTween();
    if (p.dEta != null) { S.dEta = p.dEta; fD.set(p.dEta); refreshWalk(); }
    const sc = SCENES[p.scene];
    const end = p.at != null ? (p.at === 'end' ? W.N - 1 : p.at) : stopOf(p);
    sc.set(end);
    if (p.model) setModel(p.model, false);
    if (p.fold != null) setFold(p.fold, false);
    setScene(p.scene);
    // a still and the opening view of the full page show the card's telling frame; in a chapter the card plays once
    // the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    if (p.morph || p.foldAnim) {
      if (p.morph) { S.mu = 0; modelChips.set('klein', true); } else { S.fold = 0; foldChips.set('0', true); }
      paint();
      const player = transitionPlayer((done) => (p.morph ? setModel('poincare', true, done) : setFold(1, true, done)));
      if (booting) kit.autoplay(player, $('stage')); else player.play();
      return;
    }
    clock.set(p.from);
    stopAt = end < clock.max - 1e-9 ? end : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：沿射线拖动琥珀色的点，用时间轴一级级走，换 Klein 或庞加莱圆盘，改步长 Δη；在“轮回”里看角度尺怎样撞上边界、把轮子折叠；在“分式”里拖动像圆。随时可以再选一张卡。', 'Free play: drag the amber point along the ray, step with the rail, swap the Klein and Poincaré disks, change the step Δη; in Wheel watch the angle ruler hit the rim and fold the wheel; in Fractional map drag the image circle. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.SAMSARA_DEBUG = {
    get state() {
      const steps = []; for (let k = 0; k <= KMAX; k++) steps.push(at(ETA0 + k * S.dEta));
      const cur = at(ETA0 + S.k * S.dEta), c = cOf(S.ct);
      return {
        scene: S.scene, model: S.model, mu: S.mu, dEta: S.dEta, k: S.k, n: S.n, fold: S.fold, ct: S.ct,
        thetaStar: THETA_STAR, eta0: ETA0, t: clock.t, max: clock.max, playing: clock.playing || tweenPlaying, preset: cards.current,
        steps, cur, curGap: morphGap(cur.rBK, cur.gapBK, S.mu),
        wall: wall(cur.rBK, S.mu, 48), curPoint: [morphR(cur.rBK, S.mu), 0],
        walk: { th: W.th.slice(), light: W.light.slice(), round: W.round.slice(), n0: W.n0, p: W.p, N: W.N, constant: W.constant, dth: gd(ETA0 + S.dEta) - THETA_STAR,
          points: W.th.map((_, i) => statePoint(i)), mult: last.mult || null },
        cayley: { c, centre: circleOfLine(c).centre, radius: circleOfLine(c).radius, samples: last.samples || null },
        magU: last.mag ? last.mag.U : null, magGap: last.gapNow,
        hud: $('hudBig').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the disk point (x, y), for pointer tests. */
    point: (x, y) => { const b = $('cv').getBoundingClientRect(); return G ? [b.left + G.X(x), b.top + G.Y(y)] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('staircase'); cards.mark('staircase'); setModel('poincare', false); paint.now(); };   // the cover: the Poincaré arcs
  cards.pick(cards.initial('staircase'));
  booting = false;
  paint();
})();
