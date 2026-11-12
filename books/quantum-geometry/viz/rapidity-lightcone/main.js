/* RAPIDITY//CONE · 快度与光锥 · Rapidity and the light cone
   Two-dimensional Minkowski spacetime, events (t, x), c = 1, q(t, x) = t² − x². The stage is the spacetime diagram
   itself: x across, t up, equal scales, the light cone t = ±x in white. Four scenes on one rail:
     orbit    one event v = (5, 3) turned (magenta circle, t² + x² kept) and boosted (cyan hyperbola, t² − x² kept)
     boost    kB(η) acting on v and on the beads (j, ±j) of the cone; the amber axes are the traveller's t′, x′ at
              rapidity η (t′ through v at η = ln 2), so the amber point Bv reads v in that frame; k = 1 is a
              Lorentz boost, any other k keeps the cone but moves v off its hyperbola
     caliper  the spatial displacement (0, w) (amber) and the two null vectors (±|w|, w) that clamp it
     paths    O = (0, 0) → P = (10, 0): the rest worldline and the bent one through the turning point A, with one tick
              per unit of proper time, all boosted together by η
   The rail drives one quantity per scene: s (orbit), η (boost and paths) or w (caliper).
   Read-only probe for the browser suite: window.CONE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const LN2 = Math.LN2;
  const TH = TRV.thumbMode ? 2 : 1;          // thicker strokes on the wordless cover
  const V0 = [5, 3];                          // the event of the chapter's example, (t, x)
  const PEND = [10, 0];                       // the end of both worldlines
  const BEADS = [1, 2, 3, 4];                 // beads (j, j) and (j, −j) on the future light cone

  /* ---------- the model: (t, x) ---------- */
  const q = (v) => v[0] * v[0] - v[1] * v[1];
  const boost = (eta, v, k) => { const c = Math.cosh(eta), s = Math.sinh(eta), m = k == null ? 1 : k; return [m * (c * v[0] - s * v[1]), m * (-s * v[0] + c * v[1])]; };
  const turn = (a, v) => [Math.cos(a) * v[0] + Math.sin(a) * v[1], -Math.sin(a) * v[0] + Math.cos(a) * v[1]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const ptau = (d) => Math.sqrt(Math.max(0, q(d)));
  /** The turning point kept inside the diamond t ≥ |x|, 10 − t ≥ |x| (lab coordinates). */
  const inDiamond = (a) => { const t = clamp(a[0], 0, PEND[0]), m = Math.min(t, PEND[0] - t); return [t, clamp(a[1], -m, m)]; };
  const RAP_V0 = Math.atanh(V0[1] / V0[0]);  // = ln 2: the rapidity of v itself

  /* ---------- scenes: the rail's range, step and the view window ---------- */
  const SCENES = {
    orbit: { lo: -0.5, hi: 1.5, step: 0.1, rate: 0.55, view: { x: [-6.6, 6.6], t: [-6.3, 8.1] }, thumb: { x: [-6.2, 6.2], t: [-6.1, 7.6] } },
    boost: { lo: -0.6, hi: 1.6, step: 0.1, rate: 0.55, view: { x: [-7, 7], t: [-3, 10] }, thumb: { x: [-6, 6], t: [-2.4, 8.4] } },
    caliper: { lo: -5, hi: 5, step: 0.5, rate: 2.4, view: { x: [-6.2, 6.2], t: [-6.2, 6.2] }, thumb: { x: [-5.6, 5.6], t: [-5.6, 5.6] } },
    paths: { lo: -LN2, hi: LN2, step: LN2 / 7, rate: 0.4, view: { x: [-10.6, 10.6], t: [-0.7, 13] }, thumb: { x: [-9, 9], t: [-0.5, 12.6] } }
  };
  const viewOf = (sc) => (TRV.thumbMode ? SCENES[sc].thumb : SCENES[sc].view);

  /* ---------- state ---------- */
  const S = { scene: 'boost', s: 0, eta: LN2, w: 3, k: 1, etaP: 0, apex: V0.slice(), ghost: false };
  const V = { x: viewOf('boost').x.slice(), t: viewOf('boost').t.slice() };
  const parOf = (sc) => (sc === 'orbit' ? S.s : sc === 'boost' ? S.eta : sc === 'caliper' ? S.w : S.etaP);
  function setPar(sc, v) { if (sc === 'orbit') S.s = v; else if (sc === 'boost') S.eta = v; else if (sc === 'caliper') S.w = v; else S.etaP = v; }

  /* the bent and the rest worldline in the current frame */
  function worldlines() {
    const e = S.etaP, A = S.apex, O = [0, 0];
    const lab = { O, A, P: PEND };
    const now = { O, A: boost(e, A), P: boost(e, PEND) };
    const d1 = sub(now.A, now.O), d2 = sub(now.P, now.A), dr = sub(now.P, now.O);
    return { lab, now, tau1: ptau(d1), tau2: ptau(d2), tauBent: ptau(d1) + ptau(d2), tauRest: ptau(dr), dt1: d1[0], dt2: d2[0], dtRest: dr[0], q1: q(d1), q2: q(d2), qRest: q(dr) };
  }

  /* ---------- drawing helpers (plot coordinates are [x, t]) ---------- */
  const XY = (v) => [v[1], v[0]];
  const M = 40;   // long enough for a line to leave any view
  let G = null, layoutBox = null;
  function hyper(g, tau, color, s, centre, range) {
    const c = centre || [0, 0], U = range || 3.2, pts = [];
    for (let i = 0; i <= 160; i++) { const u = -U + 2 * U * i / 160; pts.push([c[1] + tau * Math.sinh(u), c[0] + tau * Math.cosh(u)]); }
    g.line(pts, color, s);
  }
  function arrow(g, a, b, color, w, s) {
    const c = g.ctx, ax = g.X(a[1]), ay = g.Y(a[0]), bx = g.X(b[1]), by = g.Y(b[0]), dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy);
    s = s || {};
    c.save(); c.globalAlpha = s.alpha == null ? 1 : s.alpha; c.strokeStyle = c.fillStyle = color; c.lineWidth = w * TH; c.lineCap = 'round'; c.setLineDash(s.dash || []);
    if (s.glow) { c.shadowColor = color; c.shadowBlur = s.glow; }
    c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke(); c.setLineDash([]);
    if (l > 8) { const hs = Math.min(10 * TH, l * 0.45), ux = dx / l, uy = dy / l; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux * hs - uy * hs * 0.42, by - uy * hs + ux * hs * 0.42); c.lineTo(bx - ux * hs + uy * hs * 0.42, by - uy * hs - ux * hs * 0.42); c.closePath(); c.fill(); }
    c.restore();
  }
  const seg = (g, a, b, color, s) => g.line([XY(a), XY(b)], color, s);
  const dot = (g, v, color, r, s) => g.dot(v[1], v[0], color, r * TH, s);
  /** A label just off the event v (in CSS pixels), kept inside the plot. */
  function tagAt(key, v, html, cls, dx, dy) {
    const g = G, x = clamp(g.X(v[1]) + (dx || 0), g.pl + 30, g.pl + g.iw - 30), y = clamp(g.Y(v[0]) + (dy || 0), g.pt + 10, g.pt + g.ih - 10);
    stage.tag(key, [x, y], html, cls, { screen: true });
  }
  function labAxes(g) {
    g.line([[V.x[0] - 1, 0], [V.x[1] + 1, 0]], P.dim, { width: 1, alpha: 0.55 });
    g.line([[0, V.t[0] - 1], [0, V.t[1] + 1]], P.dim, { width: 1, alpha: 0.55 });
    const c = g.ctx; c.save(); c.strokeStyle = P.dim; c.globalAlpha = 0.55; c.lineWidth = 1;
    for (let j = Math.ceil(V.x[0]); j <= V.x[1]; j++) if (j) { c.beginPath(); c.moveTo(g.X(j), g.Y(0) - 3); c.lineTo(g.X(j), g.Y(0) + 3); c.stroke(); }
    for (let j = Math.ceil(V.t[0]); j <= V.t[1]; j++) if (j) { c.beginPath(); c.moveTo(g.X(0) - 3, g.Y(j)); c.lineTo(g.X(0) + 3, g.Y(j)); c.stroke(); }
    c.restore();
    if (!TRV.thumbMode) { tagAt('axT', [V.t[1] - 0.45, 0], 't', 'tick', 16, 4); tagAt('axX', [0, V.x[1] - 0.3], 'x', 'tick', 4, -10); }
  }
  /** The light cone through `o` (future and past), the future cone shaded cyan. */
  function cone(g, o, s) {
    s = s || {};
    const c = o || [0, 0];
    if (s.fill !== false) g.poly([[c[1], c[0]], [c[1] + M, c[0] + M], [c[1] - M, c[0] + M]], P.cyan, { alpha: 0.05 });
    const past = s.past == null ? 0.85 : s.past;
    seg(g, c, [c[0] + M, c[1] + M], P.ink, { width: 1.8 * TH, alpha: 0.85, glow: 6 });
    seg(g, c, [c[0] + M, c[1] - M], P.ink, { width: 1.8 * TH, alpha: 0.85, glow: 6 });
    if (past) { seg(g, c, [c[0] - M, c[1] - M], P.ink, { width: 1.8 * TH, alpha: 0.85 * past }); seg(g, c, [c[0] - M, c[1] + M], P.ink, { width: 1.8 * TH, alpha: 0.85 * past }); }
  }
  /** Where the line through the origin along d leaves the view (for axis labels). */
  function exitPoint(d, margin) {
    let best = Infinity;
    const lim = [[V.t[0] + margin, V.t[1] - margin], [V.x[0] + margin, V.x[1] - margin]];
    for (let i = 0; i < 2; i++) if (Math.abs(d[i]) > 1e-9) for (const b of lim[i]) { const u = b / d[i]; if (u > 0) best = Math.min(best, u); }
    return [d[0] * best, d[1] * best];
  }

  /* ---------- scenes ---------- */
  function drawOrbit(g) {
    cone(g, [0, 0], { past: 1 });
    const R = Math.hypot(V0[0], V0[1]);
    const ring = []; for (let i = 0; i <= 180; i++) { const a = 2 * Math.PI * i / 180; ring.push([R * Math.sin(a), R * Math.cos(a)]); }
    g.line(ring, P.magenta, { width: 1.8 * TH, alpha: 0.85 });
    hyper(g, Math.sqrt(q(V0)), P.cyan, { width: 2.2 * TH, glow: 6 });
    dot(g, V0, P.dim, 4, { ring: true, width: 1.4 });
    const m = turn(S.s, V0), b = boost(S.s, V0);
    arrow(g, [0, 0], m, P.magenta, 2, { alpha: 0.8 });
    arrow(g, [0, 0], b, P.cyan, 2, { alpha: 0.8 });
    dot(g, m, P.magenta, 6, { glow: 12 });
    dot(g, b, P.cyan, 6, { glow: 12 });
    if (!TRV.thumbMode) {
      tagAt('oM', m, `t² + x² = ${fix(m[0] * m[0] + m[1] * m[1], 2)}`, 'raw mg', -86, -14);
      tagAt('oB', b, `t² − x² = ${fix(q(b), 2)}`, 'raw cy', 86, 16);
      tagAt('oCone', [5.6, 5.6], 't = x', 'tick', 34, 0);
    }
    return {};
  }

  /** The axes of the traveller moving with rapidity η, drawn in the lab diagram: t′ along (cosh η, sinh η), x′ along
      (sinh η, cosh η). At η = ln 2 the t′ axis runs through v = (5, 3), whose reading in the traveller's coordinates is Bv. */
  const travAxes = (eta) => ({ t: [Math.cosh(eta), Math.sinh(eta)], x: [Math.sinh(eta), Math.cosh(eta)] });
  const GHOSTS = [-0.6, 0];                   // the cone card leaves hollow beads where η was −0.6 and 0

  function drawBoost(g) {
    const k = S.k, e = S.eta, ax = travAxes(e);
    // τ = 1 (faint, where the unit tick sits for k = 1), τ = 4 (the event's hyperbola), and τ = 4k, τ = k when k ≠ 1
    const scaled = Math.abs(k - 1) > 1e-6 && k > 1e-6;
    hyper(g, 1, P.cyan, { width: 1.3 * TH, alpha: 0.5 });
    cone(g, [0, 0], { past: 0.5 });
    hyper(g, 4, P.cyan, { width: 2.4 * TH, glow: 6 });
    if (scaled) { hyper(g, 4 * k, P.cyan, { width: 1.6 * TH, dash: [6, 5], alpha: 0.9 }); hyper(g, k, P.cyan, { width: 1.2 * TH, dash: [4, 4], alpha: 0.6 }); }
    // the lab axes (grey dashed) and the traveller's axes t′, x′ (amber)
    g.line([[0, -M], [0, M]], P.dim, { width: 1.2, dash: [5, 5], alpha: 0.8 });
    g.line([[-M, 0], [M, 0]], P.dim, { width: 1.2, dash: [5, 5], alpha: 0.8 });
    const ut = ax.t.map((z) => z / Math.hypot(...ax.t)), ux = ax.x.map((z) => z / Math.hypot(...ax.x));
    seg(g, [-M * ut[0], -M * ut[1]], [M * ut[0], M * ut[1]], P.amber, { width: 1.4 * TH, alpha: 0.75 });
    seg(g, [-M * ux[0], -M * ux[1]], [M * ux[0], M * ux[1]], P.amber, { width: 1.4 * TH, alpha: 0.75 });
    if (!TRV.thumbMode) {
      tagAt('bTa', exitPoint(ut, 0.55), 't′', 'raw hot', 0, 0);
      tagAt('bXa', exitPoint(ux, 0.55), 'x′', 'raw hot', 0, 0);
    }
    // beads on the cone; on the cone card, hollow beads where η was −0.6 and 0
    if (S.ghost) for (const ge of GHOSTS) if (ge < e - 0.05) for (const j of BEADS) for (const sgnx of [1, -1]) dot(g, boost(ge, [j, sgnx * j], k), P.ink, 3.4, { ring: true, width: 1.2, alpha: 0.55 });
    for (const j of BEADS) for (const sgnx of [1, -1]) dot(g, boost(e, [j, sgnx * j], k), P.ink, 3.6, { glow: 6 });
    // v (grey ring), the unit tick on t′ (k units along it), and the reading kBv (amber)
    dot(g, V0, P.dim, 4.5, { ring: true, width: 1.4 });
    const bv = boost(e, V0, k), et = [k * ax.t[0], k * ax.t[1]];
    arrow(g, [0, 0], et, P.amber, 2.2, {});
    dot(g, et, P.amber, 4, {});
    arrow(g, [0, 0], bv, P.amber, 2.4, { alpha: 0.9 });
    dot(g, bv, P.amber, 6.5, { glow: 14 });
    if (!TRV.thumbMode) {
      tagAt('bV', V0, 'v = (5, 3)', 'raw ink', -30, -44);
      tagAt('bBv', bv, `${scaled ? 'kBv' : 'Bv'} = (${fix(bv[0], 2)}, ${fix(bv[1], 2)})`, 'raw hot', bv[1] > 2.5 ? -86 : -112, bv[1] > 2.5 ? 0 : 24);
      const h4 = [4 * Math.cosh(-0.9), 4 * Math.sinh(-0.9)];
      tagAt('bH4', h4, 'τ = 4', 'raw cy', -26, 0);
      if (scaled) {
        const hk = [4 * k * Math.cosh(0.95), 4 * k * Math.sinh(0.95)]; tagAt('bHk', hk, `τ = ${fix(4 * k, 2)}`, 'raw cy', 34, 0);
        tagAt('bTick', et, `τ = ${fix(k, 2)}`, 'raw hot', 40, 10);
      }
      tagAt('bCone', [V.t[1] - 0.8, V.t[1] - 0.8], 't = x', 'tick', 34, 0);
    }
    return { bv, et };
  }

  function drawCaliper(g) {
    g.poly([[0, 0], [M, -M], [-M, -M]], P.cyan, { alpha: 0.03 });
    cone(g, [0, 0], { past: 1 });
    const w = S.w, a = Math.abs(w), vp = [a, w], vm = [-a, w], sp = [0, w];
    // the rhombus O, v₊, 2(0, w), v₋ (its diagonals are 2(0, w) and v₊ − v₋)
    g.line([XY([0, 0]), XY(vp), XY([0, 2 * w]), XY(vm), XY([0, 0])], P.dim, { width: 1.1, dash: [4, 4], alpha: 0.8 });
    seg(g, vm, vp, P.ink, { width: 1.6 * TH, dash: [6, 4], alpha: 0.9 });
    arrow(g, [0, 0], vp, P.ink, 2.4, { glow: 8 });
    arrow(g, [0, 0], vm, P.ink, 2.4, { glow: 8 });
    arrow(g, [0, 0], sp, P.amber, 2.8, { glow: 10 });
    dot(g, sp, P.amber, 6, { glow: 12 });
    dot(g, vp, P.ink, 4.2, {}); dot(g, vm, P.ink, 4.2, {});
    if (!TRV.thumbMode && a > 0.35) {
      const sx = w >= 0 ? 1 : -1;
      tagAt('cP', vp, '(+|w|, w) · q = 0', 'raw ink', sx * 70, -4);
      tagAt('cM', vm, '(−|w|, w) · q = 0', 'raw ink', sx * 70, 4);
      tagAt('cW', sp, '(0, w)', 'raw hot', sx * 30, 16);
    }
    return { vp, vm, sp };
  }

  function drawPaths(g) {
    const W = worldlines(), n = W.now, e = S.etaP;
    for (let j = 1; j <= 13; j++) hyper(g, j, P.cyan, { width: TH, alpha: j % 5 === 0 ? 0.34 : 0.18 });
    cone(g, [0, 0], { past: 0 });
    // the diamond between the future cone of O and the past cone of P
    const L1 = boost(e, [5, 5]), R1 = boost(e, [5, -5]);
    g.line([XY(n.O), XY(L1), XY(n.P), XY(R1), XY(n.O)], P.ink, { width: 1.5 * TH, alpha: 0.9 });
    g.poly([XY(n.O), XY(L1), XY(n.P), XY(R1)], P.ink, { alpha: 0.035 });
    // the rest worldline (white, thick) and the bent one (cyan), each with a tick per unit of proper time
    seg(g, n.O, n.P, P.ink, { width: 3 * TH, alpha: 0.95 });
    seg(g, n.O, n.A, P.cyan, { width: 3 * TH, glow: 8 });
    seg(g, n.A, n.P, P.cyan, { width: 3 * TH, glow: 8 });
    const ticks = (a, b, tau, color) => { const m = Math.floor(tau + 1e-9); for (let j = 1; j <= m; j++) { if (Math.abs(j - tau) < 1e-9 && b === n.P) continue; const u = j / tau; dot(g, [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u], color, 4, {}); } };
    ticks(n.O, n.P, W.tauRest, P.ink);
    ticks(n.O, n.A, W.tau1, P.cyan);
    ticks(n.A, n.P, W.tau2, P.cyan);
    dot(g, n.O, P.ink, 5, {}); dot(g, n.P, P.ink, 5, {});
    dot(g, n.A, P.amber, 7.5, { glow: 16 });
    g.dot(n.A[1], n.A[0], P.amber, 12 * TH, { ring: true, width: 1.4, alpha: 0.7 });
    if (!TRV.thumbMode) {
      tagAt('pO', n.O, 'O', 'raw ink', -16, 10);
      tagAt('pP', n.P, 'P', 'raw ink', -16, -6);
      const right = n.A[1] >= n.P[1] / 2 ? 1 : -1;
      tagAt('pA', n.A, 'A', 'raw hot', right * 20, -10);
      const mb = [(n.A[0] + n.P[0]) / 2, (n.A[1] + n.P[1]) / 2], mr = [n.P[0] * 0.5, n.P[1] * 0.5];
      tagAt('pTb', mb, `τ = ${fix(W.tauBent, 2)}`, 'raw cy', right * 60, 0);
      tagAt('pTr', mr, `τ = ${fix(W.tauRest, 2)}`, 'raw ink', -right * 58, 0);
    }
    return W;
  }

  /* ---------- the stage ---------- */
  const stage = kit.stage3($('stage'), {
    canvas: $('cv'), rotate: false,
    onPick: (ev) => { if (!G) return false; drag = true; aim(ev); return true; },
    onDrag: (ev) => { if (drag) aim(ev); },
    onDrop: () => { drag = false; dragWhat = null; }
  });
  let drag = false, dragWhat = null;
  /** Pointer → spacetime point (t, x). */
  function at(ev) { const r = $('cv').getBoundingClientRect(); return [G.invY(ev.clientY - r.top), G.invX(ev.clientX - r.left)]; }
  const rapidity = (p) => (p[0] > Math.abs(p[1]) + 1e-6 ? Math.atanh(p[1] / p[0]) : null);
  function aim(ev) {
    const p = at(ev), sc = S.scene, cf = SCENES[sc];
    let v = null;
    if (sc === 'orbit') {
      if (!dragWhat) { const m = turn(S.s, V0), b = boost(S.s, V0); dragWhat = Math.hypot(p[0] - m[0], p[1] - m[1]) < Math.hypot(p[0] - b[0], p[1] - b[1]) ? 'turn' : 'boost'; }
      if (dragWhat === 'turn') v = Math.atan2(V0[1], V0[0]) - Math.atan2(p[1], p[0]);
      else { const r = rapidity(p); v = r == null ? null : RAP_V0 - r; }
    } else if (sc === 'boost') { const r = rapidity(p); v = r == null ? null : RAP_V0 - r; }
    else if (sc === 'caliper') v = p[1];
    else {
      const lab = boost(-S.etaP, p);
      stopApex(); cards.mark(null);
      S.apex = inDiamond(lab); paint(); return;
    }
    if (v == null || !isFinite(v)) return;
    S.ghost = false; cards.mark(null);
    clock.pause(); clock.set(clamp(v, cf.lo, cf.hi) - cf.lo);
  }

  let last = {};
  function drawStage() {
    const cv = $('cv'), st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const thumb = TRV.thumbMode;
    const top = thumb ? 16 : Math.max(46, below($('hudBig').parentElement), below($('sceneChips'))) + 6;
    const bottom = thumb ? 16 : Math.max(16, $('legend').offsetHeight + 16);
    stage.begin();
    const g = kit.plot(cv, { x: V.x, y: V.t, equal: true, pad: [12, 12, top, bottom], clear: false });
    G = g; layoutBox = { top, bottom };
    g.ctx.save(); g.ctx.beginPath(); g.ctx.rect(g.pl, g.pt, g.iw, g.ih); g.ctx.clip();
    labAxes(g);
    let out;
    if (S.scene === 'orbit') out = drawOrbit(g);
    else if (S.scene === 'boost') out = drawBoost(g);
    else if (S.scene === 'caliper') out = drawCaliper(g);
    else out = drawPaths(g);
    g.ctx.restore();
    stage.end();
    last = out || {};
  }

  /* ---------- strip: one question per scene ---------- */
  function drawPlot() {
    const cv = $('plot'), sc = S.scene, cf = SCENES[sc], N = 200, xs = (i) => cf.lo + (cf.hi - cf.lo) * i / N;
    const xTicks = sc === 'caliper' ? [[-5, '−5'], [0, '0'], [5, '5']] : sc === 'paths' ? [[-LN2, '−ln 2'], [0, '0'], [LN2, 'ln 2']] : sc === 'orbit' ? [[-0.5, '−0.5'], [0, '0'], [0.5, '0.5'], [1, '1'], [1.5, '1.5']] : [[-0.5, '−0.5'], [0, '0'], [LN2, 'ln 2'], [1.5, '1.5']];
    let g;
    if (sc === 'orbit') {
      $('plotTitle').innerHTML = L('转动守住平方和，推动守住平方差', 'A turn keeps the sum of squares, a boost the difference');
      g = kit.plot(cv, { x: [cf.lo, cf.hi], y: [-40, 95], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[-34, '−34'], [0, '0'], [16, '16'], [34, '34'], [80, '80']], xTicks });
      const a = [], b = [], c = [], d = [];
      for (let i = 0; i <= N; i++) { const s = xs(i), m = turn(s, V0), bb = boost(s, V0); a.push([s, m[0] * m[0] + m[1] * m[1]]); b.push([s, q(m)]); c.push([s, q(bb)]); d.push([s, bb[0] * bb[0] + bb[1] * bb[1]]); }
      g.hline(0, P.ink, { alpha: 0.6 });
      g.line(b, P.magenta, { width: 1.4, dash: [5, 4] }); g.line(d, P.cyan, { width: 1.4, dash: [5, 4] });
      g.line(a, P.magenta, { width: 2.2 }); g.line(c, P.cyan, { width: 2.2 });
      g.vline(S.s, P.amber, { alpha: 0.85 });
      g.legend([[P.magenta, L('转动', 'turn')], [P.cyan, L('推动', 'boost')]], {});
      $('plotMeta').textContent = L('实线守住，虚线不守；低于 0 在光锥外', 'solid: kept, dashed: not; below 0 = outside the cone');
    } else if (sc === 'boost') {
      $('plotTitle').innerHTML = L('快度可以一直推，速度到不了 1', 'Rapidity grows without end, velocity never reaches 1');
      g = kit.plot(cv, { x: [cf.lo, cf.hi], y: [-1.15, 1.15], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[-1, '−1'], [0, '0'], [0.6, '0.6'], [1, '1']], xTicks });
      g.hline(1, P.ink, { width: 1.6, alpha: 0.8 }); g.hline(-1, P.ink, { width: 1.6, alpha: 0.8 });
      const b = []; for (let i = 0; i <= N; i++) { const e = xs(i); b.push([e, Math.tanh(e)]); }
      g.line(b, P.cyan, { width: 2.2 });
      g.vline(S.eta, P.amber, { alpha: 0.85 }); g.dot(S.eta, Math.tanh(S.eta), P.amber, 4);
      g.legend([[P.cyan, L('速度 β = tanh η', 'velocity β = tanh η')], [P.ink, L('光速 β = ±1', 'light speed β = ±1')]], { bottom: true, dy: -14 });
      $('plotMeta').textContent = 'η';
    } else if (sc === 'caliper') {
      $('plotTitle').innerHTML = L('两条零线上恒为零，横着的一支为负', 'Zero on both null lines, negative on the horizontal one');
      g = kit.plot(cv, { x: [cf.lo, cf.hi], y: [-27, 4], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[-25, '−25'], [-9, '−9'], [0, '0']], xTicks });
      const p = []; for (let i = 0; i <= N; i++) { const w = xs(i); p.push([w, q([0, w])]); }
      g.line([[cf.lo, 0], [cf.hi, 0]], P.ink, { width: 2.2 });
      g.line(p, P.cyan, { width: 2.2 });
      g.vline(S.w, P.amber, { alpha: 0.85 }); g.dot(S.w, q([0, S.w]), P.amber, 4);
      g.legend([[P.ink, L('t² − x² 在 (±|w|, w) 上', 't² − x² on (±|w|, w)')], [P.cyan, L('t² − x² 在 (0, w) 上', 't² − x² on (0, w)')]], { dy: 12 });
      $('plotMeta').textContent = 'w';
    } else {
      $('plotTitle').innerHTML = L('换参考系：坐标时间在变，固有时不变', 'Change frame: coordinate times move, proper times do not');
      g = kit.plot(cv, { x: [cf.lo, cf.hi], y: [-9, 14], pad: [34, 10, 8, 22] });
      g.axes({ yTicks: [[0, '0'], [4, '4'], [8, '8'], [10, '10']], xTicks });
      const save = S.etaP, d1 = [], d2 = [], tb = [], tr = [];
      for (let i = 0; i <= N; i++) { S.etaP = xs(i); const W = worldlines(); d1.push([S.etaP, W.dt1]); d2.push([S.etaP, W.dt2]); tb.push([S.etaP, W.tauBent]); tr.push([S.etaP, W.tauRest]); }
      S.etaP = save;
      g.line(d1, P.cyan, { width: 1.3, dash: [5, 4] }); g.line(d2, P.cyan, { width: 1.3, dash: [2, 3] });
      g.line(tr, P.ink, { width: 2.2 }); g.line(tb, P.cyan, { width: 2.2 });
      g.vline(S.etaP, P.amber, { alpha: 0.85 });
      g.legend([[P.ink, L('静止世界线的固有时', 'proper time, rest worldline')], [P.cyan, L('折线的固有时', 'proper time, bent path')], [P.cyan, L('去程的坐标时间', 'coordinate time, outbound leg'), 'dash'], [P.cyan, L('回程的坐标时间', 'coordinate time, return leg'), 'dash']], { bottom: true });
      $('plotMeta').textContent = 'η';
    }
  }

  /* ---------- readouts, HUD, legend ---------- */
  const row = (cls, zh, en, val) => `<div class="${cls}"><dt>${L(zh, en)}</dt><dd>${val}</dd></div>`;
  const pt = (v, d) => `(${fix(v[0], d)}, ${fix(v[1], d)})`;
  const LEGEND = {
    orbit: [['mg', '转动：圆 t² + x² = 34', 'turn: circle t² + x² = 34'], ['cy', '推动：双曲线 t² − x² = 16', 'boost: hyperbola t² − x² = 16'], ['dm', '白线：光锥 t = ±x', 'white lines: light cone t = ±x']],
    boost: [['cy', '双曲线 t² − x² = τ²', 'hyperbolas t² − x² = τ²'], ['am', 'Bv 与旅行者的轴 t′、x′', "Bv and the traveller's axes t′, x′"], ['dm', '白线与珠子：光锥', 'white lines and beads: light cone']],
    caliper: [['am', '空间位移 (0, w)', 'spatial displacement (0, w)'], ['dm', '白色箭头：零向量 (±|w|, w)', 'white arrows: null vectors (±|w|, w)']],
    paths: [['cy', '经 A 的折线，每格 1 个单位固有时', 'bent path through A, one tick per unit of proper time'], ['dm', '白色粗线：静止世界线', 'thick white line: rest worldline'], ['am', '折返点 A', 'turning point A']]
  };
  function drawText() {
    const sc = S.scene;
    let big, sub, key, keyName, rows, note, aside, pill;
    if (sc === 'orbit') {
      const m = turn(S.s, V0), b = boost(S.s, V0), qm = q(m);
      big = L(`对照 · s = ${fix(S.s, 2)}`, `Compare · s = ${fix(S.s, 2)}`);
      sub = `<span class="c-mg">t² + x² = ${fix(m[0] * m[0] + m[1] * m[1], 2)}</span> · <span class="c-cy">t² − x² = ${fix(q(b), 2)}</span>`;
      keyName = L('推动后 t² − x² · 转动后 t² + x²', 't² − x² after the boost · t² + x² after the turn');
      key = `${fix(q(b), 4)} <small>· ${fix(m[0] * m[0] + m[1] * m[1], 4)}</small>`;
      rows = row('c', '推动后的事件', 'boosted event', pt(b, 3)) + row('m', '转动后的事件', 'turned event', pt(m, 3))
        + row('m', '转动后的 t² − x²', 't² − x² after the turn', fix(qm, 3)) + row('c', '推动后的 t² + x²', 't² + x² after the boost', fix(b[0] * b[0] + b[1] * b[1], 3));
      note = qm < 0 ? L('品红的点在光锥外面（t² − x² < 0）；青色的点仍在光锥里面。', 'The magenta point is outside the light cone (t² − x² < 0); the cyan one is still inside.')
        : L('两个点都在光锥里面；把 s 推过 1.33 或拉过 −0.25，品红的点就出去了。', 'Both points are inside the light cone; push s past 1.33 or pull it below −0.25 and the magenta point leaves.');
      aside = 'cos² + sin² = 1 · cosh² − sinh² = 1';
      pill = ['t² − x²', fix(q(b), 2)];
    } else if (sc === 'boost') {
      const e = S.eta, k = S.k, bv = boost(e, V0, k), scaled = Math.abs(k - 1) > 1e-9;
      big = S.ghost ? L(`光锥不动 · η = ${fix(e, 3)}`, `The cone stays · η = ${fix(e, 3)}`)
        : scaled ? L(`比例 · k = ${fix(k, 2)}`, `Scale · k = ${fix(k, 2)}`) : L(`推动 · η = ${fix(e, 3)}`, `Boost · η = ${fix(e, 3)}`);
      sub = scaled ? `η = ${fix(e, 3)} · k² = ${fix(k * k, 2)} · <span class="c-cy">τ = 4 → ${fix(Math.sqrt(Math.max(0, q(bv))), 2)}</span>`
        : `β = ${fix(Math.tanh(e), 3)} · γ = ${fix(Math.cosh(e), 3)} · <span class="c-cy">t² − x² = ${fix(q(bv), 2)}</span>`;
      keyName = L('被推动的事件的 t² − x²', 't² − x² of the boosted event');
      key = `${fix(q(bv), 4)}${scaled ? ` <small>= ${fix(k * k, 4)} × 16</small>` : ''}`;
      rows = row('', 'cosh η · sinh η', 'cosh η · sinh η', `${fix(Math.cosh(e), 4)} · ${fix(Math.sinh(e), 4)}`) + row('', 'cosh²η − sinh²η', 'cosh²η − sinh²η', fix(Math.cosh(e) ** 2 - Math.sinh(e) ** 2, 6))
        + row('', '速度 β = tanh η', 'velocity β = tanh η', fix(Math.tanh(e), 4)) + row('', `${scaled ? 'kB' : 'B'}(5, 3)`, `${scaled ? 'kB' : 'B'}(5, 3)`, pt(bv, 4))
        + row('c', '单位刻度的 t² − x²', 't² − x² of the unit tick', fix(k * k, 4)) + row('', '比例 k · k²', 'scale k · k²', `${fix(k, 2)} · ${fix(k * k, 4)}`);
      note = !scaled ? L('k = 1：琥珀色的点留在青色双曲线 τ = 4 上，t′ 轴上的单位刻度留在 τ = 1 上。', 'k = 1: the amber point stays on the cyan hyperbola τ = 4 and the unit tick on t′ stays on τ = 1.')
        : L(`k = ${fix(k, 2)}：珠子仍在光锥上，琥珀色的点却到了 τ = ${fix(4 * k, 2)}，单位刻度到了 τ = ${fix(k, 2)}。`, `k = ${fix(k, 2)}: the beads are still on the cone, but the amber point is on τ = ${fix(4 * k, 2)} and the unit tick on τ = ${fix(k, 2)}.`);
      aside = 'q(kBv) = q(kBe₀)·q(v)';
      pill = ['η', fix(e, 3)];
    } else if (sc === 'caliper') {
      const w = S.w, a = Math.abs(w);
      big = L(`卡尺 · w = ${fix(w, 2)}`, `Caliper · w = ${fix(w, 2)}`);
      sub = `q(±|w|, w) = ${fix(q([a, w]), 2)} · <span class="c-cy">q(0, w) = ${fix(q([0, w]), 2)}</span>`;
      keyName = L('两条零向量的 t² − x²', 't² − x² of the two null vectors');
      key = `${fix(q([a, w]), 4)} <small>· ${fix(q([-a, w]), 4)}</small>`;
      rows = row('', '(0, w) 的 t² − x²', 't² − x² of (0, w)', fix(q([0, w]), 4)) + row('', '(1, 0) 的 t² − x²', 't² − x² of (1, 0)', fix(q([1, 0]), 4))
        + row('', '两支之和 v₊ + v₋', 'sum v₊ + v₋', pt([a - a, 2 * w], 2)) + row('', '两支之差 v₊ − v₋', 'difference v₊ − v₋', pt([2 * a, 0], 2))
        + row('', 'polar((1, 0), (0, w))', 'polar((1, 0), (0, w))', fix(q([1, w]) - q([1, 0]) - q([0, w]), 4));
      note = L('白色箭头的尖端在琥珀色箭头尖端的正上方与正下方，各差 |w|。', 'The tips of the white arrows sit straight above and below the tip of the amber arrow, |w| away.');
      aside = 'q(t, x) = t² − x²';
      pill = ['w', fix(w, 2)];
    } else {
      const W = worldlines();
      big = L(`世界线 · η = ${fix(S.etaP, 3)}`, `Worldlines · η = ${fix(S.etaP, 3)}`);
      sub = `<span class="c-cy">${L('折线', 'bent')} τ = ${fix(W.tauBent, 3)}</span> · ${L('静止', 'rest')} τ = ${fix(W.tauRest, 3)}`;
      keyName = L('固有时：折线 · 静止', 'proper time: bent · rest');
      key = `${fix(W.tauBent, 3)} <small>· ${fix(W.tauRest, 3)}</small>`;
      rows = row('am', '此参考系里的 A', 'A in this frame', pt(W.now.A, 3)) + row('c', '去程 √(t² − x²) · 坐标时间', 'outbound √(t² − x²) · coordinate time', `${fix(W.tau1, 3)} · ${fix(W.dt1, 3)}`)
        + row('c', '回程 √(t² − x²) · 坐标时间', 'return √(t² − x²) · coordinate time', `${fix(W.tau2, 3)} · ${fix(W.dt2, 3)}`) + row('', '静止 √(t² − x²) · 坐标时间', 'rest √(t² − x²) · coordinate time', `${fix(W.tauRest, 3)} · ${fix(W.dtRest, 3)}`);
      note = W.tauBent < 1e-9 ? L('两段都在光锥上：t² − x² = 0，折线上一个刻度也没有。', 'Both legs lie on the light cone: t² − x² = 0, and the bent path carries no tick at all.')
        : L(`折线比静止世界线少 ${fix(W.tauRest - W.tauBent, 3)} 个单位固有时。`, `The bent path collects ${fix(W.tauRest - W.tauBent, 3)} fewer units of proper time than the rest worldline.`);
      aside = 'τ = Σ √(Δt² − Δx²)';
      pill = ['τ', `${fix(W.tauBent, 2)} · ${fix(W.tauRest, 2)}`];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('ro').innerHTML = `<div class="key"><dt>${keyName}</dt><dd><b>${key}</b></dd></div>${rows}`;
    $('roNote').textContent = note; $('roAside').textContent = aside;
    $('pillScene').querySelector('strong').textContent = { orbit: L('对照', 'COMPARE'), boost: L('推动', 'BOOST'), caliper: L('卡尺', 'CALIPER'), paths: L('世界线', 'WORLDLINES') }[sc];
    $('pillKeyName').textContent = pill[0]; $('pillKey').querySelector('strong').textContent = pill[1];
    $('legend').innerHTML = LEGEND[sc].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
  }

  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plot')]);

  /* ---------- the rail ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: SCENES.boost.hi - SCENES.boost.lo, rate: SCENES.boost.rate, step: SCENES.boost.step, t: S.eta - SCENES.boost.lo,
    // the label is first drawn while the clock is being built: it reads t, max and S only
    format: (t, max) => {
      const cf = SCENES[S.scene], v = t + cf.lo;
      const name = S.scene === 'orbit' ? 's' : S.scene === 'caliper' ? 'w' : 'η';
      return `${name} = ${fix(v, S.scene === 'caliper' ? 2 : 3)} <small>/ ${fix(cf.lo, 2)} … ${fix(cf.hi, 2)}</small>`;
    },
    onChange: (t, c) => {
      if (stopAt != null && c.playing && t >= stopAt - 1e-9) { const s = stopAt; stopAt = null; c.pause(); c.set(s); return; }
      setPar(S.scene, t + SCENES[S.scene].lo);
      paint();
    }
  });
  let viewTween = null;
  function setScene(sc, animate) {
    const was = S.scene;
    S.scene = sc; sceneChips.set(sc, true); stopAt = null;
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    clock.pause();
    const cf = SCENES[sc];
    clock.rate = cf.rate; clock.step = cf.step; clock.setMax(cf.hi - cf.lo, true); clock.set(parOf(sc) - cf.lo);
    const to = viewOf(sc);
    if (viewTween) viewTween.cancel();
    if (animate && was !== sc) {
      const fx = V.x.slice(), ft = V.t.slice();
      viewTween = kit.tween(500, (e) => { for (let i = 0; i < 2; i++) { V.x[i] = fx[i] + (to.x[i] - fx[i]) * e; V.t[i] = ft[i] + (to.t[i] - ft[i]) * e; } paint(); });
    } else { V.x = to.x.slice(); V.t = to.t.slice(); }
  }

  /* ---------- controls ---------- */
  const leave = () => { S.ghost = false; cards.mark(null); };
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, true); });
  const fK = kit.field($('k'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.k = v; paint(); } });
  $('apexReset').addEventListener('click', () => { leave(); S.apex = V0.slice(); paint(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ 1: () => { leave(); setScene('orbit', true); }, 2: () => { leave(); setScene('boost', true); }, 3: () => { leave(); setScene('caliper', true); }, 4: () => { leave(); setScene('paths', true); } });

  /* ---------- experiment cards ----------
     scene, the rail's start and stop (play), the frame a still shows (still), and what else the card sets.
     apexFrom/apexTo: the card moves the turning point instead of the rail. */
  const PRESETS = {
    circle: { scene: 'orbit', from: 0, to: 1.5, still: 1.5 },
    boost: { scene: 'boost', k: 1, from: 0, to: LN2, still: LN2 },
    caliper: { scene: 'caliper', from: -5, to: 3, still: 3 },
    cone: { scene: 'boost', k: 1, from: -0.6, to: 1, still: 1, ghost: true },
    scale: { scene: 'boost', k: 1.5, from: 0, to: LN2, still: LN2 },
    light: { scene: 'paths', eta: 0, apexFrom: [5, 3], apexTo: [5, 5] },
    twins: { scene: 'paths', eta: 0, apexFrom: [5, 0], apexTo: [5, 3] },
    frames: { scene: 'paths', apex: [5, 3], from: 0, to: LN2, still: LN2 }
  };
  const NOTES = {
    circle: ['同一个事件 v = (5, 3)，一边转动、一边推动。品红的点沿品红的圆走，t² + x² 保持 34；青色的点沿青色的双曲线走，t² − x² 保持 16。s 走到 1.5 时，品红的点已经穿过白色的光锥跑到外面，青色的点贴着光锥，却始终在里面。', 'One event v = (5, 3), turned on one side and boosted on the other. The magenta point runs along the magenta circle with t² + x² held at 34; the cyan point runs along the cyan hyperbola with t² − x² held at 16. By s = 1.5 the magenta point has crossed the white light cone to the outside, while the cyan one hugs the cone and stays inside.'],
    boost: ['快度 η 从 0 推到 ln 2：琥珀色的两根轴是以快度 η 运动的旅行者的 t′、x′ 轴，像剪刀一样向光锥合拢，到 η = ln 2（β = 3/5）时 t′ 轴正好穿过灰圈里的原事件 v = (5, 3)；灰色虚线是原来的 t、x 轴。琥珀色的点 Bv 是 v 在旅行者坐标里的读数，沿青色双曲线 τ = 4 滑到 (4, 0)：这时 cosh η = 5/4，sinh η = 3/4。', 'Push the rapidity η from 0 to ln 2: the two amber axes are the t′ and x′ axes of a traveller moving with rapidity η; they close toward the light cone like scissors, and at η = ln 2 (β = 3/5) the t′ axis runs right through the original event v = (5, 3) in the grey ring; the grey dashed lines are the original t and x axes. The amber point Bv is v read in the traveller’s coordinates and slides along the cyan hyperbola τ = 4 to (4, 0), where cosh η = 5/4 and sinh η = 3/4.'],
    caliper: ['任取一个空间位移 (0, w)（琥珀色）。在时间方向上向上、向下各垫起 |w|，正好踩在未来与过去两条光锥线上：两支白色箭头 (±|w|, w) 的 t² − x² 都是 0。虚线菱形的两条对角线，一条是横着的 2(0, w)，一条是竖着的 2|w|(1, 0)：两支一加一减，就是证明里那把双向卡尺。', 'Take any spatial displacement (0, w) (amber). Lift it by |w| up and down in time and it lands exactly on the future and past light-cone lines: both white arrows (±|w|, w) have t² − x² = 0. The dashed rhombus has the horizontal 2(0, w) and the vertical 2|w|(1, 0) as diagonals: adding and subtracting the two arrows is the two-sided caliper of the proof.'],
    cone: ['η 从 −0.6 扫到 1：白色光锥一动不动。光锥上的白色珠子只沿光锥滑——右边一串挤向原点，左边一串散开——没有一颗离开这两条线；空心的淡白珠子是 η = −0.6 与 η = 0 时它们的位置。琥珀色的点沿青色双曲线走。', 'Sweep η from −0.6 to 1: the white light cone does not move. The white beads on it only slide along it — the right-hand string crowds toward the origin, the left-hand string spreads out — and none leaves the two lines; the faint hollow beads mark where they were at η = −0.6 and η = 0. The amber point runs along its cyan hyperbola.'],
    scale: ['把推动再乘一个比例 k = 1.5，η 推到 ln 2：白色珠子仍然只在光锥上滑，光锥照样保住；琥珀色的点却落到 (6, 0)，离开青色的 τ = 4，到了青色虚线 τ = 6 上；t′ 轴上琥珀色的单位刻度也落在青色细虚线 τ = 1.5 上，而不是 τ = 1 上：差的正是 k² = 2.25。', 'Multiply the boost by a scale k = 1.5 and push η to ln 2: the white beads still only slide along the light cone, so the cone is kept all the same; but the amber point lands at (6, 0), off the cyan τ = 4 and onto the dashed cyan τ = 6, and the amber unit tick on t′ sits on the thin dashed cyan τ = 1.5 instead of τ = 1: the difference is exactly k² = 2.25.'],
    light: ['把折返点 A 拖到光锥上的 (5, 5)：两段都沿白色菱形的边走，t² − x² = 0，青色折线上一个刻度也没有，τ = 0；白色粗线（静止世界线）走满 10 个刻度。', 'Drag the turning point A onto the light cone at (5, 5): both legs run along the edges of the white diamond with t² − x² = 0, the cyan path carries not a single tick and τ = 0; the thick white rest worldline carries all 10.'],
    twins: ['折返点 A 从 (5, 0) 移到 (5, 3)：青色折线上的刻度从 10 个减到 8 个（每段 4 个），白色粗线（静止世界线）始终 10 个。去程的每个刻度都落在以 O 为心的一条淡青色双曲线上。', 'The turning point A moves from (5, 0) to (5, 3): the ticks on the cyan path drop from 10 to 8 (4 on each leg), while the thick white rest worldline keeps all 10. Each tick of the outbound leg sits on one of the faint cyan hyperbolas centred at O.'],
    frames: ['换到去程旅行者的参考系：η 从 0 推到 ln 2。所有事件沿着淡青色双曲线滑动，去程变成竖直的 (4, 0)，回程变成 (8.5, −7.5)，白色粗线也歪了；可青色折线上仍是 8 个刻度，白色粗线上仍是 10 个。', 'Switch to the outbound traveller\'s frame: push η from 0 to ln 2. Every event slides along the faint cyan hyperbolas; the outbound leg becomes the vertical (4, 0), the return leg (8.5, −7.5), and the thick white line leans over too; yet the cyan path still carries 8 ticks and the thick white line 10.']
  };
  let booting = true, apexTween = null, apexPlaying = false;
  /** A card that moves the turning point plays through this stand-in clock, so a book starts it when it is seen. */
  function apexPlayer(from, to) {
    const run = {
      playing: false, pause() {},
      play() {
        if (apexTween) apexTween.cancel();
        run.playing = apexPlaying = true; S.apex = from.slice(); paint();
        apexTween = kit.tween(1400, (e) => { S.apex = [from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e]; paint(); },
          () => { run.playing = apexPlaying = false; apexTween = null; S.apex = to.slice(); paint(); });
      }
    };
    return run;
  }
  function stopApex() { if (apexTween) { apexTween.cancel(); apexTween = null; } apexPlaying = false; }
  function applyPreset(id) {
    const p = PRESETS[id];
    stopApex();
    S.ghost = !!p.ghost;
    if (p.k != null) { S.k = p.k; fK.set(p.k); }
    if (p.apex) S.apex = p.apex.slice();
    if (p.eta != null) S.etaP = p.eta;
    if (p.still != null) setPar(p.scene, p.still);
    if (p.apexTo) S.apex = p.apexTo.slice();
    setScene(p.scene, !booting);
    // a still (cover, cited figure shot) and the opening view of the full page show the card's telling frame;
    // inside a chapter the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) return;
    const cf = SCENES[p.scene];
    if (p.apexTo) {
      const player = apexPlayer(p.apexFrom, p.apexTo);
      S.apex = p.apexFrom.slice();
      if (booting) kit.autoplay(player, $('stage')); else player.play();
      return;
    }
    clock.set(p.from - cf.lo);
    stopAt = p.to - cf.lo < clock.max - 1e-9 ? p.to - cf.lo : null;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀色的点（或在“对照”里拖任一个点），用时间轴推动快度，在“推动”里改比例 k，在“世界线”里拖折返点 A。随时可以再选一张卡。', 'Free play: drag the amber point (or either point in Compare), push the rapidity with the rail, change the scale k in Boost, or drag the turning point A in Worldlines. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.CONE_DEBUG = {
    get state() {
      const W = worldlines();
      return {
        scene: S.scene, s: S.s, eta: S.eta, w: S.w, k: S.k, etaP: S.etaP, apex: S.apex.slice(),
        t: clock.t, max: clock.max, playing: clock.playing || apexPlaying, preset: cards.current, view: { x: V.x.slice(), t: V.t.slice() },
        orbit: { turned: turn(S.s, V0), boosted: boost(S.s, V0) },
        boost: { event: boost(S.eta, V0, S.k), tick: travAxes(S.eta).t.map((z) => S.k * z), axisT: travAxes(S.eta).t, axisX: travAxes(S.eta).x, ghost: S.ghost, ghosts: S.ghost ? GHOSTS.filter((ge) => ge < S.eta - 0.05).flatMap((ge) => BEADS.flatMap((j) => [boost(ge, [j, j], S.k), boost(ge, [j, -j], S.k)])) : [], beads: BEADS.flatMap((j) => [boost(S.eta, [j, j], S.k), boost(S.eta, [j, -j], S.k)]), cosh: Math.cosh(S.eta), sinh: Math.sinh(S.eta), beta: Math.tanh(S.eta) },
        caliper: { plus: [Math.abs(S.w), S.w], minus: [-Math.abs(S.w), S.w], spatial: [0, S.w] },
        paths: { A: W.now.A, P: W.now.P, tau1: W.tau1, tau2: W.tau2, tauBent: W.tauBent, tauRest: W.tauRest, dt1: W.dt1, dt2: W.dt2, dtRest: W.dtRest,
          ticksBent: Math.floor(W.tau1 + 1e-9) + Math.floor(W.tau2 + 1e-9), ticksRest: Math.floor(W.tauRest + 1e-9) },
        hud: $('hudBig').textContent, key: $('ro').querySelector('.key dd').textContent
      };
    },
    seek: (t) => { clock.pause(); clock.set(t); },
    /** Viewport coordinates of the spacetime point (t, x) on the stage, for pointer tests. */
    point: (t, x) => { const b = $('cv').getBoundingClientRect(); return G ? [b.left + G.X(x), b.top + G.Y(t)] : null; }
  };
  window.TRV_THUMB = () => { applyPreset('boost'); cards.mark('boost'); paint.now(); };
  cards.pick(cards.initial('boost'));
  booting = false;
  paint();
})();
