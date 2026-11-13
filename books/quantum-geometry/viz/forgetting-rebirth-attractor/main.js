/* ORTHO//SAMSARA · 轮回与视界阶梯 · Samsara and the horizon staircase
   The stage is the open unit disk, its rim the horizon θ = 90° of Chapter 36. Three scenes on the same disk:
     stair    the rapidity staircase η_k = η₀ + kΔη, η₀ = gd⁻¹(θ*), along the ray to the right; Beltrami–Klein radius
              r = tanh η (chords), Poincaré radius ρ = tanh(η/2) (orthogonal arcs), morphed by the radial isometry
              ρ = r/(1 + √(1 − r²)); a magnifier on the side keeps the gap to the rim visible
     samsara  the outside angle ruler θ ↦ θ + Δθ: it lands on the rim in finitely many steps, falls back to the centre
              and walks again; one spoke per round (a wheel), folded by the period on request
     cayley   w = (s − 1)/s sends the lines Re s = c to circles inside the disk, Re s = 1/2 to the unit circle
   The rail drives one quantity per scene: the step k, the step n or the position of the line.
   The stage is split in two. One part holds a lit solid (kit.solid), a schematic of the same state: the upper sheet of
   the hyperboloid with its rapidity rings and the projection rays onto the disk; the tower of the wheel, one level per
   round; the Riemann hemisphere over the disk of w. The other part holds the exact disk and its magnifier, drawn on the
   flat canvas #flat laid over the solid. Dragging on the disk moves the state; dragging elsewhere turns the solid.
   Read-only probe for the browser suite: window.SAMSARA_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const setHTML = (id, value) => { const el = $(id); if (el._h !== value) { el.innerHTML = value; el._h = value; } };
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
  /* the solid: an orbit camera that turns about the vertical (and tilts a little) and never zooms in, so that the
     solid stays inside its own part of the stage whatever the reader does; F3 places and sizes it each frame */
  /* the wheel's tower is looked at a little more from above, so that its levels and the folded disk open up */
  const CAM = { yaw: -0.26, pitch: 0.66, pitchOf: { samsara: 0.9 } }, PITCH = [0.1, 0.9];
  const F3 = { cx: 0.5, cy: 0.5, radius: 0.36, unit: 1, zc: 0 };
  const stage = kit.solid($('stage'), {
    canvas: $('cv'), yaw: CAM.yaw, pitch: CAM.pitch, wheel: false,
    get cx() { return F3.cx; }, get cy() { return F3.cy; }, get radius() { return F3.radius; },
    onChange: () => paint(),
    // only the disk itself is a handle (the staircase and fractional scenes); anywhere else a drag turns the solid
    onPick: (ev) => { if (!onDisk(ev)) return false; drag = true; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = false; }
  });
  let drag = false;
  /** Rough width of a label in CSS pixels (CJK characters are wider), to keep the disk's labels in their own part; a
      label set on several lines (<br>) is as wide as its widest line. */
  const textW = (html) => Math.max(...String(html).split(/<br\s*\/?>/i).map((line) => { let w = 6; for (const ch of line.replace(/<[^>]*>/g, '')) w += /[⺀-鿿＀-￯]/.test(ch) ? 12.5 : 7; return w; }));
  /** The width in CSS pixels that a label of the disk part takes as the theme sets a .tag.raw label (the body face at
      12 px, 0.04em apart, as written), measured on the flat canvas; a label on several lines is as wide as its widest. */
  const labelW = (html) => {
    const c = $('flat').getContext('2d'); c.save(); c.font = `12px ${TRV.fonts.body}`;
    const w = Math.max(...String(html).split(/<br\s*\/?>/i).map((line) => { const t = line.replace(/<[^>]*>/g, ''); return c.measureText(t).width + [...t].length * 0.04 * 12; }));
    c.restore();
    return w;
  };
  const tagAt = (key, x, y, html, cls) => {
    if (layout && layout.r2) { const r = layout.r2, hw = Math.min(r.w / 2, textW(html) / 2); x = clamp(x, r.x + hw, r.x + r.w - hw); }
    stage.tag(key, [x, y], html, cls, { screen: true });
  };
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
      // under the disk there is no room above the box: the gap is named inside it, or (a phone's figure) under it.
      // Over a small box beside the disk or in its corner, a name that would reach back over the disk (a book column
      // of about 480 to 560 px, whose legend takes the height) moves to the right of the rim, clear of the rim's own
      // marks and the counts of the folded wheel, and where that column is narrower than the name it is set, whole, on
      // two lines
      const name = gap > 0 ? [L('缝', 'gap'), sci(gap), ' '] : [L('缝 = 0：', 'gap = 0:'), L('撞上边界', 'on the rim'), L('', ' ')];
      let html = name[0] + name[2] + name[1], gx = box.x + box.w / 2, gy = box.under ? box.y + box.h + 10 : small && !box.below ? box.y - 12 : box.y + box.h - 14;
      if (small && !box.below && !box.under) {
        // where tagAt puts the name, and how wide it is as set: does its box meet the disk and the line of its rim?
        const r2 = layout.r2, hw = Math.min(r2.w / 2, textW(html) / 2), w = labelW(html), x0 = clamp(gx, r2.x + hw, r2.x + r2.w - hw) - w / 2;
        const dx = Math.max(x0 - g.X(0), 0, g.X(0) - x0 - w), dy = Math.max(gy - 9 - g.Y(0), 0, g.Y(0) - gy - 9);
        if (dx * dx + dy * dy < (g.scale + 2) ** 2) {
          const left = g.X(1) + 4;
          if (w > r2.x + r2.w - left) { html = `${name[0]}<br>${name[1]}`; gy -= 9; }
          gx = Math.max(gx, left + labelW(html) / 2);
        }
      }
      tagAt('magG', gx, gy, html, 'raw mg');
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
    if (layout.below) {
      const w = Math.min(g.iw - 8, 2.1 * R), y = Math.max(g.Y(-1.06) + 8, g.pt + g.ih - 0.62 * w - 4), h = g.pt + g.ih - 4 - y - (layout.compact ? 18 : 0);
      return { x: cx - w / 2, y, w, h, corner: true, below: true, under: layout.compact };
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
    // the fold as a motion: each visited state of a later round turns along its own circle toward the first spoke;
    // the grey arc is the way it has turned, the faint ring where it started (unrolled)
    const trails = [];
    if (S.fold > 1e-6) {
      for (let n = 0; n <= nInt; n++) {
        const j = W.round[n]; if (j === 0) continue;
        const r = W.light[n] ? 1 : morphR(kleinOfTheta(W.th[n]).r, S.mu); if (r < 0.02) continue;
        const a0 = j * (2 * Math.PI / (ROUNDS + 1)), a1 = spokeAngle(j), arc = [];
        for (let i = 0; i <= 40; i++) { const a = a0 + (a1 - a0) * i / 40; arc.push([r * Math.cos(a), r * Math.sin(a)]); }
        g.line(arc, P.dim, { width: 1.1 * TH, alpha: 0.55, dash: [3, 4] });
        g.dot(r * Math.cos(a0), r * Math.sin(a0), W.light[n] ? P.magenta : P.cyan, 4 * TH, { ring: true, width: 1.2 * TH, alpha: 0.4 });
        trails.push({ n, r, from: a0, to: a1 });
      }
    }
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
      const p0 = statePoint(0), placed = [];
      if (S.fold > 0.98) {
        // the counts of the folded points, above and below them in turn (the one on the rim inside the disk: the
        // magnifier stands just outside the rim); where the points sit closer than a count is wide (a small disk),
        // in four tiers taken in order along the spoke
        const seen = new Set(), cs = [];
        for (let n = W.n0; n <= nInt; n++) {
          const key = (n - W.n0) % W.p; if (seen.has(key)) continue; seen.add(key);
          const p = statePoint(n), m = mult.get(key);
          if (m > 1) cs.push({ key, m, light: W.light[n], x: g.X(p[0]) + (W.light[n] ? -12 : 0), y: g.Y(p[1]) });
        }
        cs.sort((a, b) => a.x - b.x);
        const crowded = cs.some((c, i) => i && c.x - cs[i - 1].x < textW(`×${c.m}`) + 4);
        cs.forEach((c, i) => {
          const y = c.y + (crowded ? [-18, 18, -36, 36][i % 4] : c.key % 2 ? 20 : -20);
          tagAt(`wM${c.key}`, c.x, y, `×${c.m}`, c.light ? 'raw mg' : 'raw cy'); placed.push([c.x, y, textW(`×${c.m}`)]);
        });
      }
      // θ* under its point, or where no count stands
      const x0 = g.X(p0[0]), y0 = g.Y(p0[1]), free = ([dx, dy]) => placed.every(([x, y, w]) => Math.abs(x0 + dx - x) > (w + textW('θ*')) / 2 + 2 || Math.abs(y0 + dy - y) > 17);
      const at = [[0, 18], [0, -18], [-18, 16], [18, 16], [-18, -16], [18, -16], [0, 54], [0, -54]].find(free) || [0, 18];
      tagAt('wS', x0 + at[0], y0 + at[1], 'θ*', 'raw ink');
      if (S.fold <= 0.98) {
        for (let j = 1; j <= ROUNDS; j++) {
          const first = W.round.indexOf(j); if (first < 0 || first > nInt) continue;
          const a = spokeAngle(j), rr = 1.1;
          tagAt(`wR${j}`, g.X(rr * Math.cos(a)), g.Y(rr * Math.sin(a)), L(`第 ${j} 圈`, `round ${j}`), 'raw ink');
        }
      }
    }
    return { pos, gapNow, mag, mult: [...mult.entries()], trails };
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

  /* ---------- the solid (kit.solid): a schematic of the same state, in its own part of the stage ---------- */
  let geo3 = null;                                 // the solid of the last frame, in model coordinates (for the probe)
  /** Model → world: the middle of the solid's height sits at the centre of its part of the stage. */
  const w3 = (p) => [p[0], p[1], p[2] - F3.zc];
  /** k + 1 points round the horizontal circle of radius r at height z, from angle a0 to a1 (model coordinates). */
  const arcPts = (r, z, a0, a1, k) => Array.from({ length: k + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / k; return [r * Math.cos(a), r * Math.sin(a), z]; });

  /** A cited figure in a phone's frame (about 334 × 500): style.css tightens the same frames with the same query. */
  const compact = () => TRV.figure && !TRV.still && window.matchMedia('(max-width: 480px)').matches;
  const C2 = { column: 0.38, stair: 0.31 };        // a phone figure: the share of the width the disk's column takes (the sheet is wide)
  /** The two parts of the stage, in CSS pixels of the canvas: r3 for the solid, r2 for the disk and its magnifier.
      A wide stage puts them side by side (the solid on the left), a narrow one above each other (the solid on top). */
  function regions() {
    // the legend is measured across the whole stage first, whatever the frame was before: a book page's frame that
    // narrows to a phone's must not keep the book page's legend offset (it would start beyond the narrow frame's edge)
    $('stage').classList.remove('legend-right');
    const cv = $('flat'), st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode, W = cv.clientWidth, H = cv.clientHeight;
    if (compact()) {
      // a phone's cited figure: the solid on the left, the disk over its magnifier in a column on the right (narrower
      // beside the staircase, whose sheet is wide and low)
      const top = below($('hudBig').parentElement) + 6, bottom = $('legend').offsetHeight + 24, x0 = 10, aw = Math.max(1, W - 20), ah = Math.max(1, H - top - bottom);
      const w2 = Math.round(aw * (S.scene === 'stair' ? C2.stair : C2.column)), r3 = { x: x0, y: top, w: aw - w2 - 8, h: ah }, r2 = { x: x0 + aw - w2, y: top, w: w2, h: ah };
      return { W, H, top, bottom, wide: true, compact: true, r3, r2 };
    }
    const top = thumb ? 24 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 24 : Math.max(16, $('legend').offsetHeight + 18);
    const x0 = 12, aw = Math.max(1, W - 24), ah = Math.max(1, H - top - bottom), gap = 12;
    const wide = aw / ah >= 1.15;
    let r3, r2;
    if (wide && TRV.figure && !TRV.still && !thumb) {
      // a cited figure in a book page: the solid's part runs from under the title to the foot of the stage, and the
      // legend keeps to the right of it, under the disk
      const w = Math.round(aw * 0.5), x2 = x0 + w + gap;   // the disk's half keeps room for the legend under it
      $('stage').style.setProperty('--fig-legend-left', `${x2}px`); $('stage').classList.add('legend-right');
      r3 = { x: x0, y: top, w, h: H - top - 14 };
      r2 = { x: x2, y: top, w: aw - w - gap, h: Math.max(1, H - top - Math.max(16, $('legend').offsetHeight + 18)) };
    } else if (wide) { const w = Math.round(aw * 0.58); r3 = { x: x0, y: top, w, h: ah }; r2 = { x: x0 + w + gap, y: top, w: aw - w - gap, h: ah }; }
    else { const h = Math.round(ah * 0.55); r3 = { x: x0, y: top, w: aw, h }; r2 = { x: x0, y: top + h + gap, w: aw, h: ah - h - gap }; }
    return { W, H, top, bottom, wide, r3, r2 };
  }
  /** Size and place the solid inside r3. Its outline is a list of [r, z] (horizontal radius, height): seen at pitch p
      from any yaw, a point lands at most r units to either side and between z cos p − r sin p and z cos p + r sin p
      units up. So turning about the vertical never changes the size; tilting refits it. */
  function frame3(outline, R, pitch) {
    const box = R.r3, m = (R.compact ? 3 : 10) * (TRV.thumbMode ? 1.8 : 1), cp = Math.cos(pitch), sp = Math.sin(pitch);
    let rmax = 0, hi = -Infinity, lo = Infinity;
    for (const [r, z] of outline) { rmax = Math.max(rmax, r); hi = Math.max(hi, z * cp + r * sp); lo = Math.min(lo, z * cp - r * sp); }
    const unit = Math.max(4, Math.min((box.w / 2 - m) / rmax, (box.h - 2 * m) / (hi - lo)));
    F3.zc = (hi + lo) / (2 * cp); F3.unit = unit;
    F3.cx = (box.x + box.w / 2) / R.W; F3.cy = (box.y + box.h / 2) / R.H; F3.radius = unit / Math.min(R.W, R.H);
  }
  /** The outline of a surface of revolution with profile f(t) → [r, z], t in [0, 1]. */
  const outlineOf = (f, k) => Array.from({ length: k + 1 }, (_, i) => f(i / k));

  /* the staircase: the upper sheet t = √(1 + x² + y²) of the hyperboloid (z is t), drawn over half a turn so that the
     rays in front of it stay in view; the rapidity rings η_k = η₀ + kΔη; the disk z = 1 − μ; the projection centre
     C = (0, 0, −μ): Klein (μ = 0) projects from the origin onto t = 1, Poincaré (μ = 1) from (0, 0, −1) onto t = 0.
     The sheet point of rapidity η lies on the ray from C through its disk point Q at the factor cosh η + μ, at height
     cosh η. The sheet runs off to infinity, so the drawing keeps the factor exactly while cosh η − 1 ≤ XE (the first
     step included) and squeezes it on a log scale beyond, the tenth step at height 1 + DTOP (MODEL): every ring then
     lies on the drawn sheet, its ray and its disk point exact. */
  const XE = 0.4, BL = 0.15, DTOP = 1.6;
  const squeeze = (x, xt) => (x <= XE ? x : XE + (DTOP - XE) * Math.log1p((x - XE) / BL) / Math.log1p((xt - XE) / BL));
  const unsqueeze = (d, xt) => (d <= XE ? d : XE + BL * Math.expm1((d - XE) * Math.log1p((xt - XE) / BL) / (DTOP - XE)));
  /** The drawn sheet at squeezed height d (z = 1 + d) and azimuth φ: on the ray from C through the disk point. */
  function sheetAt(d, ph, mu, xt) {
    const x = unsqueeze(d, xt), eta = Math.acosh(1 + x), rr = (1 + mu + d) * morphR(Math.tanh(eta), mu);
    return [rr * Math.cos(ph), rr * Math.sin(ph), 1 + d];
  }
  function stairModel() {
    const mu = S.mu, dE = S.dEta, xt = Math.cosh(ETA0 + KMAX * dE) - 1, kNow = S.k;
    const step = (eta) => {
      const m = morphR(Math.tanh(eta), mu), d = squeeze(Math.cosh(eta) - 1, xt), f = 1 + mu + d;
      return { eta, d, factor: f, Q: [m, 0, 1 - mu], H: [f * m, 0, 1 + d] };
    };
    const steps = [];
    for (let k = 0; k <= KMAX; k++) steps.push(Object.assign({ k }, step(ETA0 + k * dE)));
    return { scene: 'stair', mu, xt, C: [0, 0, -mu], diskZ: 1 - mu, apex: [0, 0, 1], steps, kNow, kInt: Math.floor(kNow + 1e-9), now: step(ETA0 + kNow * dE),
      outline: [[0, -mu], [1, 1 - mu], [0, 1]].concat(outlineOf((t) => [sheetAt(t * DTOP, 0, mu, xt)[0], 1 + t * DTOP], 24), [[1 + mu + DTOP + 0.04, 1 + DTOP + 0.04]]) };
  }
  /** Half a ring of the sheet at squeezed height d, lifted by eps (world units) off the sheet towards its hollow side. */
  function sheetRing(d, md, eps) {
    const h = 1e-3, a = Math.max(0, d - h), b = Math.min(DTOP, d + h), rho = (dd) => sheetAt(dd, 0, md.mu, md.xt)[0];
    const slope = (rho(b) - rho(a)) / (b - a), n = Math.hypot(1, slope), r = rho(d) - eps / n, z = 1 + d + eps * slope / n;
    return arcPts(r, z, 0, Math.PI, 48).map(w3);
  }
  function drawStair3(md) {
    const st = stage, px = 1 / F3.unit, words = !TRV.thumbMode, z = md.diskZ;
    st.surface('sheet', (d, ph) => w3(sheetAt(d, ph, md.mu, md.xt)), { u: [0, DTOP], v: [0, Math.PI], nu: 44, nv: 40, color: P.dim, grid: { every: [100, 10] } });
    st.surface('disk', (r, ph) => w3([r * Math.cos(ph), r * Math.sin(ph), z]), { u: [0, 1], v: [0, 2 * Math.PI], nu: 8, nv: 72, color: P.lineHot });
    st.line(arcPts(1, z, 0, 2 * Math.PI, 120).map(w3), { color: P.ink, width: 2 });
    // the cone of rays from C through the rim (back half): the boundary no step reaches; its rays never meet the sheet.
    // The sheet creeps up to it, so the cone is drawn only as far as it stands visibly (3 px) outside the sheet.
    const top = 1 + DTOP, far = top + md.mu, gapAt = (d) => 1 + d + md.mu - sheetAt(d, 0, md.mu, md.xt)[0];
    let dc = 0; while (dc < DTOP && gapAt(dc) > 3 * px) dc += 0.01;
    st.surface('cone', (t, ph) => w3([t * Math.cos(ph), t * Math.sin(ph), t - md.mu]), { u: [0, 1 + dc + md.mu], v: [0, Math.PI], nu: 24, nv: 40, color: P.faint, grid: { every: [100, 10] } });
    for (const s of [1, -1]) st.line([w3(md.C), w3([s * far, 0, top])], { color: P.ink, width: 1.2, dash: [5, 4], alpha: 0.85 });
    // rapidity rings: walked ones cyan, the ones still ahead faint, the current one amber
    for (const a of md.steps) {
      if (Math.abs(a.k - md.kNow) < 1e-9) continue;
      const walked = a.k <= md.kInt;
      st.tube(`ring${a.k}`, sheetRing(a.d, md, (walked ? 1.2 : 0.7) * px), { color: walked ? P.cyan : P.faint, width: walked ? 2.2 : 1.3, glow: walked ? 0.3 : 0.1 });
    }
    st.tube('ringNow', sheetRing(md.now.d, md, 1.6 * px), { color: P.amber, width: 3, glow: 0.45 });
    // the rays of the walked steps (thin cyan) and of the current step (amber), from C through Q to the sheet
    for (const a of md.steps) if (a.k <= md.kInt && Math.abs(a.k - md.kNow) > 1e-9) st.line([w3(md.C), w3(a.H)], { color: P.cyan, width: 1.1, alpha: 0.8 });
    st.tube('rayNow', [w3(md.C), w3(md.now.H)], { color: P.amber, width: 2.2, glow: 0.4 });
    for (const a of md.steps) if (a.k <= md.kInt && Math.abs(a.k - md.kNow) > 1e-9) { st.bead(w3(a.Q), { key: `Q${a.k}`, color: P.cyan, r: 2.6 }); st.bead(w3(a.H), { key: `H${a.k}`, color: P.cyan, r: 3.2 }); }
    st.bead(w3(md.now.Q), { key: 'Qnow', color: P.amber, r: 4.6 });
    st.bead(w3(md.now.H), { key: 'Hnow', color: P.amber, r: 5.6 });
    st.bead(w3(md.apex), { key: 'apex', color: P.ink, r: 3.2 });
    st.bead(w3(md.C), { key: 'C', color: P.ink, r: 3.6 });
    if (words) st.tag('s3C', w3(md.C), L('投影中心', 'projection centre'), 'raw', { dy: 15 });
  }

  /* the wheel as a tower: round j of the angle ruler lifted to height (1 − f)·j·DH above the disk, its spoke turned
     by (1 − f)·j·60° as on the flat wheel. Height and angle grow together (DH per 60°), so the spokes are the rungs
     of one spiral ramp (a helicoid) whose outer edge, the white helix, is the rim θ = 90° carried up through the
     rounds; folding (f → 1) winds the ramp down onto the first spoke, every round onto the first (MODEL). */
  const DH = 0.25;
  const towerZ = (round) => (1 - S.fold) * round * DH;
  function samsaraModel() {
    const nNow = S.n, nInt = Math.min(Math.floor(nNow + 1e-9), W.N - 1), f = nNow - nInt;
    const pts = W.th.map((_, n) => { const p = statePoint(n); return [p[0], p[1], towerZ(W.round[n])]; });
    const wp = walkerPos(nNow);
    const wz = nInt < W.N - 1 && f > 1e-9 ? towerZ(W.round[nInt]) + (towerZ(W.round[nInt + 1]) - towerZ(W.round[nInt])) * f : towerZ(W.round[nInt]);
    const turn = (1 - S.fold) * ROUNDS * 2 * Math.PI / (ROUNDS + 1);      // how far the ramp winds: the last spoke
    return { scene: 'samsara', fold: S.fold, nNow, nInt, pts, walker: [wp[0], wp[1], wz], heights: Array.from({ length: ROUNDS + 1 }, (_, j) => towerZ(j)), turn,
      // the tower as it stands now: folding lowers it to the disk, so the folded wheel is framed as the flat disk it is
      outline: [[1.04, -0.02], [1.04, towerZ(ROUNDS) + 0.04], [0.04, towerZ(ROUNDS) + 0.16]] };
  }
  function drawSamsara3(md) {
    const st = stage, nInt = md.nInt, step = 2 * Math.PI / (ROUNDS + 1), px = 1 / F3.unit, rise = DH / step;
    st.surface('floor', (r, ph) => w3([r * Math.cos(ph), r * Math.sin(ph), 0]), { u: [0, 1], v: [0, 2 * Math.PI], nu: 8, nv: 72, color: P.lineHot });
    st.line(arcPts(1, 0, 0, 2 * Math.PI, 120).map(w3), { color: P.ink, width: 2 });
    if (md.turn > 1e-3) {
      st.surface('ramp', (r, a) => w3([r * Math.cos(a), r * Math.sin(a), a * rise]), { u: [0.03, 1], v: [0, md.turn], nu: 10, nv: Math.max(8, Math.ceil(md.turn / 0.04)), value: (r, a) => a, colors: [P.faint, P.dim], range: [0, ROUNDS * step], grid: { every: [100, 6] } });
      const hel = []; for (let i = 0; i <= 160; i++) { const a = md.turn * i / 160; hel.push(w3([Math.cos(a), Math.sin(a), a * rise])); }
      st.tube('rim', hel, { color: P.ink, width: 1.8, glow: 0.3 });
    }
    st.tube('axle', [w3([0, 0, 0]), w3([0, 0, Math.max(md.heights[ROUNDS], 0) + 0.12])], { color: P.dim, width: 3, glow: 0.1 });
    const seenRound = (j) => { const i = W.round.indexOf(j); return i >= 0 && i <= nInt; };
    for (let j = 0; j <= ROUNDS; j++) {
      if (!seenRound(j)) continue;
      const a = spokeAngle(j), h = md.heights[j];
      st.line([w3([0, 0, h + px]), w3([Math.cos(a), Math.sin(a), h + px])], { color: P.dim, width: 1, dash: [3, 4] });
    }
    // the fold as a motion: each later-round state has turned along its own circle from its unrolled spoke j·60°;
    // the arc is drawn on the level where the state stands now (the disk, once folded), ending at the state
    if (S.fold > 1e-6) for (let n = 0; n <= nInt; n++) {
      const j = W.round[n]; if (j === 0) continue;
      const r = W.light[n] ? 1 : morphR(kleinOfTheta(W.th[n]).r, S.mu); if (r < 0.02) continue;
      st.line(arcPts(r, towerZ(j) + px, j * step, (1 - S.fold) * j * step, 24).map(w3), { color: P.dim, width: 1, dash: [3, 4], alpha: 0.8 });
    }
    // the path walked so far: along each spoke a cyan tube, the fall back to the centre of the next level dashed
    for (let j = 0; j <= ROUNDS; j++) {
      const run = [];
      const up = (q) => w3([q[0], q[1], q[2] + 1.4 * px]);
      for (let n = 0; n <= nInt; n++) if (W.round[n] === j) run.push(up(md.pts[n]));
      if (W.round[nInt] === j && md.nNow > nInt + 1e-9 && nInt < W.N - 1 && W.round[nInt + 1] === j) run.push(up(md.walker));
      if (run.length > 1) st.tube(`path${j}`, run, { color: P.cyan, width: 2.4, glow: 0.3 });
    }
    for (let n = 0; n < nInt; n++) if (W.round[n] !== W.round[n + 1]) st.line([w3(md.pts[n]), w3(md.pts[n + 1])], { color: P.dim, width: 1.2, dash: [4, 4] });
    if (md.nNow > nInt + 1e-9 && nInt < W.N - 1 && W.round[nInt] !== W.round[nInt + 1]) st.line([w3(md.pts[nInt]), w3(md.walker)], { color: P.dim, width: 1.2, dash: [4, 4] });
    for (let n = 0; n <= nInt; n++) {
      const p = w3(md.pts[n]);
      if (W.light[n]) st.bead(p, { key: `w${n}`, color: P.magenta, r: 4.6 });
      else st.bead(p, { key: `w${n}`, color: W.round[n] === 0 ? P.ink : P.cyan, r: 3 });
    }
    st.bead(w3(md.walker), { key: 'walker', color: P.amber, r: 6 });
  }

  /* the fractional map on the Riemann sphere of w: the inverse stereographic projection from the south pole (0, 0, −1)
     lifts the disk |w| < 1 onto the upper hemisphere and the unit circle onto the equator; circles go to circles, so
     every image circle lifts to a circle on the hemisphere through (1, 0, 0), the lift of w = 1 */
  const lift = (w) => { const q = w[0] * w[0] + w[1] * w[1], d = 1 + q; return [2 * w[0] / d, 2 * w[1] / d, (1 - q) / d]; };
  const imageCircle = (c, k) => { const o = circleOfLine(c), pts = []; for (let i = 0; i <= k; i++) { const a = 2 * Math.PI * i / k; pts.push([o.centre + o.radius * Math.cos(a), o.radius * Math.sin(a)]); } return pts; };
  function cayleyModel() {
    const tNow = S.ct, c = cOf(tNow);
    const samples = [-4, -2, -1, -0.5, 0, 0.5, 1, 2, 4].map((y) => { const w = cayley(c, y * c); return { y, s: [c, y * c], w, p: lift(w) }; });
    return { scene: 'cayley', c, tNow, jInt: Math.floor(tNow + 1e-9), south: [0, 0, -1], samples,
      outline: [[0.04, -1.04], [1.04, 0]].concat(outlineOf((t) => [1.03 * Math.sin(t * Math.PI / 2), 1.03 * Math.cos(t * Math.PI / 2)], 24)) };
  }
  function drawCayley3(md) {
    const st = stage, px = 1 / F3.unit, words = !TRV.thumbMode;
    // the whole upper hemisphere, opaque: the disk of w and what lies on it are inside it, hidden as a solid hides them
    st.surface('dome', (th, ph) => w3([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]), { u: [0, Math.PI / 2], v: [0, 2 * Math.PI], nu: 28, nv: 96, color: P.dim, grid: { every: [7, 12] } });
    st.surface('wdisk', (r, ph) => w3([r * Math.cos(ph), r * Math.sin(ph), 0]), { u: [0, 1], v: [0, 2 * Math.PI], nu: 8, nv: 72, color: P.lineHot });
    st.tube('equator', arcPts(1, 0, 0, 2 * Math.PI, 144).map(w3), { color: P.ink, width: 2.2, glow: 0.3 });
    // a lifted circle as a tube of `width` pixels lying on the sphere: its axis one tube radius (and a hair) outside it
    const onSphere = (pts, width) => pts.map((w) => { const p = lift(w), k = 1 + (0.5 * width * st.lw + 0.4) / st.unit; return w3([p[0] * k, p[1] * k, p[2] * k]); });
    for (let j = 0; j <= 10; j++) {
      if (Math.abs(j - md.tNow) < 1e-9) continue;
      const done = j <= md.jInt, pts = imageCircle(cOf(j), 160), col = done ? P.cyan : P.faint;
      st.tube(`lift${j}`, onSphere(pts, done ? 2 : 1.2), { color: col, width: done ? 2 : 1.2, glow: done ? 0.3 : 0.1 });
      st.line(pts.map((w) => w3([w[0], w[1], 0.6 * px])), { color: col, width: done ? 1.3 : 0.9, alpha: done ? 0.9 : 0.6 });
    }
    const now = imageCircle(md.c, 200);
    st.tube('liftNow', onSphere(now, 3), { color: P.amber, width: 3, glow: 0.45 });
    st.tube('diskNow', now.map((w) => w3([w[0], w[1], 1.2 * px])), { color: P.amber, width: 2.2, glow: 0.45 });
    // the samples s = c + iyc: their images w on the disk, their lifts on the hemisphere, and the projection lines
    for (const q of md.samples) st.line([w3(md.south), w3(q.p)], { color: P.dim, width: 0.9, alpha: 0.7 });
    md.samples.forEach((q, i) => { st.bead(w3([q.w[0], q.w[1], 0]), { key: `w${i}`, color: P.amber, r: q.y === 0 ? 4 : 2.6 }); st.bead(w3(q.p), { key: `p${i}`, color: P.amber, r: q.y === 0 ? 5.2 : 3.4 }); });
    st.bead(w3(md.south), { key: 'south', color: P.ink, r: 3.6 });
    st.ring(w3([1, 0, 0]), { key: 'one', color: P.ink, r: 6, normal: [1, 0, 0] });
    if (words) st.tag('c3S', w3(md.south), L('南极：投影中心', 'south pole: centre'), 'raw', { dy: 15 });
  }

  /* ---------- the stage ---------- */
  function drawStage() {
    const R = regions(), r2 = R.r2;
    layout = { side: r2.w / Math.max(1, r2.h) > 1.25, top: R.top, bottom: R.bottom, wide: R.wide, compact: !!R.compact, r2, r3: R.r3, W: R.W, H: R.H };
    const md = S.scene === 'stair' ? stairModel() : S.scene === 'samsara' ? samsaraModel() : cayleyModel();
    stage.cam.pitch = clamp(stage.cam.pitch, PITCH[0], PITCH[1]); stage.cam.zoom = clamp(stage.cam.zoom, 0.6, 1);
    frame3(md.outline, R, stage.cam.pitch);
    stage.begin();
    // the disk part: wide, the magnifier to the right of the disk; narrow, in the corner below and to the right;
    // tall (a column beside the solid), under the disk, as wide as the disk
    const aw = r2.w, ah = r2.h;
    layout.below = !layout.side && Math.min(aw / 2.12, ah / 2.98) > 1.03 * Math.min(aw / 2.87, ah / 2.57);
    const xr = layout.side ? [-1.06, 1.06 + Math.min(1.6, Math.max(0.9, 2.12 * aw / ah - 2.12))] : layout.below ? [-1.06, 1.06] : [-1.06, 1.81];
    const yr = layout.side ? [-1.06, 1.06] : layout.below ? [-1.92, 1.06] : [-1.51, 1.06];
    const g = kit.plot($('flat'), { x: xr, y: yr, equal: true, pad: [r2.x, R.W - r2.x - r2.w, r2.y, R.H - r2.y - r2.h] });
    G = g;
    let out;
    if (S.scene === 'stair') out = drawStair(g);
    else if (S.scene === 'samsara') out = drawSamsara(g);
    else out = drawCayley(g);
    if (S.scene === 'stair') drawStair3(md); else if (S.scene === 'samsara') drawSamsara3(md); else drawCayley3(md);
    stage.end();
    geo3 = md;
    last = out || {};
  }

  /** Pointer → disk point. */
  function ptr(ev) { const r = $('flat').getBoundingClientRect(); return [G.invX(ev.clientX - r.left), G.invY(ev.clientY - r.top)]; }
  /** Is the pointer on the disk that the reader drags (staircase, fractional map)? Never in the top band of the stage,
      where a drag always turns the solid. */
  function onDisk(ev) {
    if (!G || !layout || S.scene === 'samsara') return false;
    const r = $('flat').getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top, b = layout.r2;
    if (y < 0.1 * r.height || x < b.x || x > b.x + b.w || y < b.y || y > b.y + b.h) return false;
    const p = ptr(ev);
    return Math.hypot(p[0], p[1]) <= 1.04;
  }
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
    stair: [['cy', '阶梯的点与过每一级的测地线', 'step points and their geodesics'], ['am', '当前一步', 'the current step'], ['mg', '到边界的缝', 'the gap to the rim'], ['dm', '白色圆周：视界 θ = 90°', 'white rim: the horizon θ = 90°']],
    samsara: [['cy', '角度尺走过的路', 'the path on the angle ruler'], ['mg', '撞上边界（擦表）', 'hitting the rim (wipe)'], ['am', '当前一步', 'the current step'], ['dm', '虚线：回到圆心', 'dashed: back to the centre']],
    cayley: [['cy', '直线 Re s = c 的像', 'images of the lines Re s = c'], ['am', '当前这条直线的像', 'image of the current line'], ['dm', '白色单位圆：Re s = 1/2 的像', 'white unit circle: image of Re s = 1/2']]
  };
  /** One more legend entry per scene: what the solid is (a schematic drawing of the same state). */
  const LEGEND3 = {
    stair: ['dm', '实体：双曲面上半叶与投影线（示意，沿投影线压缩）', 'solid: hyperboloid sheet, squeezed (model)'],
    samsara: ['dm', '实体：一圈一层的轮回塔（示意）', 'solid: one level per round (schematic tower)'],
    cayley: ['dm', '实体：w 圆盘的黎曼半球，球极投影', 'solid: Riemann hemisphere → w (stereographic)']
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
    setHTML('hudBig', big); setHTML('hudSub', sub);
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { stair: L('阶梯', 'STAIRCASE'), samsara: L('轮回', 'WHEEL'), cayley: L('分式', 'FRACTIONAL') }[sc];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    const legend = (sc === 'samsara' && S.fold > 1e-6 ? LEGEND.samsara.concat([['dm', '虚线弧：折叠时转过的路；淡圈：展开时的位置', 'dashed: folding path; faint rings: unfolded']]) : LEGEND[sc]).concat([LEGEND3[sc]]);
    setHTML('legend', legend.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join(''));
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
    foldChips.set(f === 0 || f === 1 ? String(f) : null, true);
    const from = S.fold;
    if (foldTween) foldTween.cancel();
    const show = (v) => { S.fold = v; fFold.set(Math.round(v * 100) / 100); paint(); };
    if (!animate) { show(f); foldTween = null; if (done) done(); return; }
    foldTween = kit.tween(1600, (e) => show(from + (f - from) * e), () => { foldTween = null; show(f); if (done) done(); });
  }
  const leave = () => cards.mark(null);
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); stopTween(); setScene(v); });
  const modelChips = kit.chips($('modelChips'), 'model', (v) => { leave(); setModel(v, true); });
  const foldChips = kit.chips($('foldChips'), 'fold', (v) => { leave(); setFold(Number(v), true); });
  const fFold = kit.field($('fold'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); if (foldTween) { foldTween.cancel(); foldTween = null; } setFold(v, false); } });
  const fD = kit.field($('dEta'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.dEta = v; refreshWalk(); const cf = SCENES[S.scene]; clock.setMax(cf.max(), true); clock.set(cf.get()); paint(); } });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({
    1: () => { leave(); stopTween(); setScene('stair'); }, 2: () => { leave(); stopTween(); setScene('samsara'); }, 3: () => { leave(); stopTween(); setScene('cayley'); },
    m: () => { leave(); setModel(S.model === 'klein' ? 'poincare' : 'klein', true); }
  });

  /* ---------- experiment cards ----------
     scene, model, Δη, the rail's start and still frame (from, still), and the cards that play a transition
     instead of the rail (morph: Klein → Poincaré; fold: unrolled → folded). */
  const PRESETS = {
    staircase: { scene: 'stair', model: 'klein', dEta: 1, from: 0, still: 8 },
    klein_vs_poincare: { scene: 'stair', model: 'poincare', dEta: 1, still: 3, morph: true },
    erase_reset: { scene: 'samsara', model: 'poincare', dEta: 1, fold: 0, from: 0, get still() { return W.round.indexOf(2) + 2; } },
    quotient_fold: { scene: 'samsara', model: 'poincare', dEta: 1, still: 'end', fold: 1, foldAnim: true },
    cayley: { scene: 'cayley', from: 0, still: 6 }
  };
  const NOTES = {
    staircase: ['从自指平衡角 θ* 出发（η₀ ≈ 0.817），快度每步加 Δη = 1。青色的点沿射线一级级走向白色的圆周，过每一级的青色直弦都比上一条更挤向边界；走到第 8 级，sin θ = 0.99999996，放大镜里品红的缝仍然张开。把步长调大、级数走多，放大镜每一步把视野缩小十倍以上，缝也从不为 0。', 'Starting from the self-referential balance angle θ* (η₀ ≈ 0.817), each step adds Δη = 1 of rapidity. The cyan points walk out along the ray toward the white rim, and each cyan chord through a step crowds closer to the rim than the one before; at step 8, sin θ = 0.99999996, and the magenta gap in the magnifier is still open. Raise the step and walk further, and the magnifier narrows its field tenfold or more at every step; the gap is never 0.'],
    klein_vs_poincare: ['停在第 3 级，把 Beltrami–Klein 圆盘换成庞加莱圆盘：每个点沿射线从 r = tanh η 挪到 ρ = tanh(η/2)，青色的直弦（灰色虚线是它们原来的位置）弯成与白色圆周正交的圆弧。读数里两种算法的固有时率 √(1 − r²) 与 (1 − ρ²)/(1 + ρ²) 一样，都是 sech η。', 'Stop at step 3 and swap the Beltrami–Klein disk for the Poincaré disk: each point moves along the ray from r = tanh η to ρ = tanh(η/2), and the cyan chords (the grey dashed lines are where they were) bend into arcs that meet the white rim at right angles. In the readouts the two proper-time rates √(1 − r²) and (1 − ρ²)/(1 + ρ²) agree: both are sech η.'],
    erase_reset: ['换成外部角度尺：每步把 θ 加上同样的 Δθ（与阶梯的第一步相同）。第二步就越过 90°，点落在圆周上（品红圈），轴向记忆 ½c² 归零；接着沿虚线回到圆心，换一根辐条从 0 开始重新走，又在第 4 步后撞上圆周。', 'Switch to the outside angle ruler: each step adds the same Δθ to θ (the staircase\'s own first step). The second step already passes 90°, the point lands on the rim (magenta ring) and the axial memory ½c² is zero; then it falls back to the centre along the dashed line and starts again from 0 on a new spoke, hitting the rim again after 4 steps.'],
    quotient_fold: ['走完五圈后，把轮子按周期折叠：五根辐条转到同一个方向，每个点沿自己那一圈的灰色虚线弧转过去（淡色空心圈是它原来的位置），第一次擦表之后的 25 步只落在 5 个位置上，每处叠着 5 次，品红圈全叠在圆周上的同一点；只剩最初从 θ* 出发的那一圈（白点）不在这 5 个位置里。', 'After five rounds, fold the wheel by its period: the five spokes turn to one direction, each point turning along its own grey dashed arc (the faint hollow ring is where it was), and the 25 steps after the first wipe land on only 5 positions, 5 times each, the magenta rings all on one point of the rim; only the first walk from θ* (white dots) lies outside these 5 positions.'],
    cayley: ['分式变换 w = (s − 1)/s 把竖直线 Re s = c 变成圆：c 从 2.5 一步步减到接近 1/2，青色的像圆一个套一个，都在 w = 1 处与白色单位圆相切，并越来越贴近它；放大镜里，像圆与单位圆之间品红的缝在缩小，但对每个 c > 1/2 都还在。', 'The fractional map w = (s − 1)/s turns the vertical lines Re s = c into circles: as c steps down from 2.5 toward 1/2, the cyan image circles nest inside one another, all touching the white unit circle at w = 1 and hugging it ever closer; in the magnifier the magenta gap between the image circle and the unit circle shrinks, but is still there for every c > 1/2.']
  };
  let booting = true;
  /** A card that plays a transition (morph or fold) runs through this stand-in clock, so a book starts it when seen. */
  function transitionPlayer(run) {
    const pl = { playing: false, pause() {}, play() { pl.playing = tweenPlaying = true; run(() => { pl.playing = tweenPlaying = false; }); } };
    return pl;
  }
  function applyPreset(id) {
    const p = PRESETS[id];
    stopTween();
    stage.cam.yaw = CAM.yaw; stage.cam.pitch = CAM.pitchOf[p.scene] || CAM.pitch; stage.cam.zoom = 1;   // every card shows its solid from the same side
    if (p.dEta != null) { S.dEta = p.dEta; fD.set(p.dEta); refreshWalk(); }
    const sc = SCENES[p.scene];
    const end = p.still === 'end' ? sc.max() : p.still;
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
  // A cited figure keeps its short note whole; detailed explanations remain in the full laboratory.
  const FIGURE_NOTES = {
    "staircase": ["每步快度加 1：第八级已接近圆周，放大后缝仍非零。", "Add 1 to rapidity each step: step 8 nears the rim but leaves a nonzero gap."],
    "klein_vs_poincare": ["换圆盘坐标，直弦变正交圆弧，两种固有时率都等于 sech η。", "Change disk coordinates: chords become orthogonal arcs; both rates equal sech η."],
    "erase_reset": ["等角步长越过 90° 后擦表归心，换一根辐条重新出发。", "Equal angle steps cross 90°, reset at the centre and start on a new spoke."],
    "quotient_fold": ["按周期折叠五圈：首次擦表后的 25 步落在五个位置。", "Fold five rounds by their period: 25 steps after the first reset occupy 5 places."],
    "cayley": ["c 趋近 1/2 时像圆趋近单位圆；每个 c > 1/2 仍留非零缝。", "As c approaches 1/2, the image circles approach the unit rim but keep a gap."],
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? FIGURE_NOTES : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
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
          points: W.th.map((_, i) => statePoint(i)), mult: last.mult || null, trails: last.trails || null },
        cayley: { c, centre: circleOfLine(c).centre, radius: circleOfLine(c).radius, samples: last.samples || null },
        magU: last.mag ? last.mag.U : null, magGap: last.gapNow,
        hud: $('hudBig').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the disk point (x, y), for pointer tests. */
    point: (x, y) => { const b = $('flat').getBoundingClientRect(); return G ? [b.left + G.X(x), b.top + G.Y(y)] : null; },
    /** The solid of the last frame: its part of the stage, the camera, and its geometry in model coordinates (z up). */
    get solid() {
      const c = stage.cam, copy = (v) => JSON.parse(JSON.stringify(v));
      return {
        mode: stage.mode, parked: stage.parked(), camera: { yaw: c.yaw, pitch: c.pitch, zoom: c.zoom }, pitchRange: PITCH.slice(),
        r3: layout ? copy(layout.r3) : null, r2: layout ? copy(layout.r2) : null, wide: layout ? layout.wide : null,
        frame: { cx: F3.cx, cy: F3.cy, unit: F3.unit, zc: F3.zc }, squeeze: { XE, BL, DTOP }, towerStep: DH,
        model: geo3 ? copy(geo3) : null,
        disk: G ? { cx: G.X(0), cy: G.Y(0), R: G.scale } : null
      };
    }
  };
  window.TRV_THUMB = () => { applyPreset('staircase'); cards.mark('staircase'); setModel('poincare', false); paint.now(); };   // the cover: the Poincaré arcs
  cards.pick(cards.initial('staircase'));
  booting = false;
  paint();
})();
