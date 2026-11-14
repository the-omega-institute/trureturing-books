/* ORTHO//CELL · 球面三面角原胞 · The spherical trihedron cell
   The stage is one right-angled trihedron cell ΔT_ε on the unit sphere: O = 0, the pivot B = e₂, A(ε) = (sin ε, cos ε, 0)
   in the wall e₂∧e₁ and C(ε) = (0, cos ε, sin ε) in the wall e₂∧e₃. Three flat walls (OBA, OBC and the oblique OAC)
   and the outward-bulging spherical cap △ABC bound it. Five scenes share the cell and one rail:
     cell    the solid seen from outside; rail = the step ε (5° … 90°); the cyan dashed shadow is its projection down OB
     once    the camera looks down the ridge OB: O and B fall on one point, the walls become two legs, and the once arc AC
             (cos c = cos²ε) is the hypotenuse; an inset compares the arc lengths 2ε, √2 ε and c_ε; rail = ε
     twice   the camera looks into the corner of the two walls; an amber cursor walks A → B (wall e₁∧e₂), turns 90° at B
             and walks B → C (wall e₂∧e₃); the inset shows the four parts of the rotor carried so far; rail = the walk
     excess  the cap against the flat cut: spherical angles α, 90°, γ against the flat 180°, and an arrow carried round
             A → B → C → A that comes back turned by Ω; the inset compares −Ω/2 with the e₁e₃ part of U₂₃U₁₂; rail = t
     brick   2D: the Gram tables of the coplanar two-step and of the trihedron with their parallelepipeds, and the log–log
             scaling of c_ε, Ω and sin²ε over ε; rail = ε
   Rotors are multiplied blade by blade in Cl(3,0); the arrow is carried leg by leg by the edge rotors.
   The stage is kit.stage3 (a 2D canvas with an orbit camera); the page draws its own depth-ordered, shaded faces.
   Read-only probe for the browser suite: window.SPHERICAL_TRIHEDRON_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, DEG = PI / 180;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1], O = [0, 0, 0];
  const EPS0 = 5, EPS1 = 90, FLOOR_DEG = 7.5;   // the rail's range of ε (degrees); FLOOR_DEG: the schematic ε_min (MODEL)

  /* ---------- Cl(3,0): 8 coefficients on blades by bitmask (bit 0 = e₁, bit 1 = e₂, bit 2 = e₃) ----------
     index 0 = 1, 3 = e₁e₂, 5 = e₁e₃, 6 = e₂e₃, 7 = e₁e₂e₃ */
  const GRADE = [0, 1, 1, 2, 1, 2, 2, 3];
  const pop = (x) => { let n = 0; while (x) { n += x & 1; x >>= 1; } return n; };
  function bladeSign(a, b) { let s = 0; a >>= 1; while (a) { s += pop(a & b); a >>= 1; } return s & 1 ? -1 : 1; }
  function mul(A, B) {
    const C = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 8; i++) if (A[i]) for (let j = 0; j < 8; j++) if (B[j]) C[i ^ j] += bladeSign(i, j) * A[i] * B[j];
    return C;
  }
  const rev = (A) => A.map((x, i) => (GRADE[i] >= 2 ? -x : x));
  const vec = (v) => [0, v[0], v[1], 0, v[2], 0, 0, 0];
  const vecOf = (M) => [M[1], M[2], M[4]];
  const sub8 = (A, B) => A.map((x, i) => x - B[i]);
  /** The rotor turning the unit vector p towards the unit vector q by the fraction f of their angle:
      cos(fθ/2) − sin(fθ/2) Î with Î the unit bivector of the bivector part of pq (U₁₂ = cos(ε/2) − sin(ε/2) e₁e₂ sends A to B). */
  function rotorFromTo(p, q, f = 1) {
    const th = Math.acos(clamp(v3.dot(p, q), -1, 1)), s = Math.sin(th), pq = mul(vec(p), vec(q)), k = s > 1e-15 ? Math.sin(f * th / 2) / s : 0;
    return [Math.cos(f * th / 2), 0, 0, -k * pq[3], 0, -k * pq[5], -k * pq[6], 0];
  }
  const act = (R, v) => vecOf(mul(mul(R, vec(v)), rev(R)));
  const parts = (R) => ({ s: R[0], b12: R[3], b23: R[6], b13: R[5] });

  /* ---------- the cell at step ε (degrees): every number the page shows comes from here ---------- */
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const gram = (X) => X.map((u) => X.map((w) => v3.dot(u, w)));
  /** Unit tangent at the unit vector p pointing along the great circle towards q. */
  const tangent = (p, q) => v3.unit(v3.sub(q, v3.scale(p, v3.dot(p, q))));
  const angleBetween = (a, b) => Math.acos(clamp(v3.dot(v3.unit(a), v3.unit(b)), -1, 1));
  function cellAt(epsDeg) {
    const e = epsDeg * DEG, s = Math.sin(e), c = Math.cos(e);
    const A = [s, c, 0], B = E2.slice(), C = [0, c, s], Acop = [s, c, 0], Ccop = [-s, c, 0];
    const G = gram([A, B, C]), Gc = gram([Acop, B, Ccop]);
    const detG = det3(G), detGc = det3(Gc), triple = v3.dot(A, v3.cross(B, C));
    const cosC = v3.dot(A, C), cArc = Math.acos(clamp(cosC, -1, 1));
    // spherical angles from the tangent vectors at each vertex; flat angles from the chords
    const alpha = angleBetween(tangent(A, B), tangent(A, C)), beta = angleBetween(tangent(B, A), tangent(B, C)), gamma = angleBetween(tangent(C, B), tangent(C, A));
    const omega = alpha + beta + gamma - PI;
    const betaFlat = angleBetween(v3.sub(A, B), v3.sub(C, B)), alphaFlat = angleBetween(v3.sub(B, A), v3.sub(C, A)), gammaFlat = angleBetween(v3.sub(A, C), v3.sub(B, C));
    const U12 = rotorFromTo(A, B), U23 = rotorFromTo(B, C), UCA = rotorFromTo(C, A);
    const W = mul(U23, U12), Wswap = mul(U12, U23), loop = mul(UCA, W);
    const CxA = v3.cross(C, A), nAC = v3.unit(CxA), height = v3.dot(B, nAC);
    // Gram–Schmidt in the order A, C, B: the edges of a rectangular brick whose volume is |det[A, B, C]|
    const gs = (X) => { const r = [], U = []; for (const x of X) { let y = x.slice(); for (const u of U) y = v3.sub(y, v3.scale(u, v3.dot(y, u))); const l = v3.len(y); r.push(l); U.push(l > 1e-12 ? v3.scale(y, 1 / l) : [0, 0, 0]); } return r; };
    const brick = gs([A, C, B]), brickCop = gs([Acop, Ccop, B]);
    // Lagrange–Gram for the pair (A, C): both sides computed separately
    let wedge2 = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge2 += (A[i] * C[j] - A[j] * C[i]) ** 2;
    const lagrangeL = v3.dot(A, A) * v3.dot(C, C) - cosC * cosC, lagrangeR = wedge2 / 2;
    // covariant commutator: U·f − f·U against (f′ − f)·U with U = U₂₃, f = U₁₂, f′ = U₂₃U₁₂Ũ₂₃
    const fPrime = mul(mul(U23, U12), rev(U23)), commL = sub8(W, Wswap), commR = mul(sub8(fPrime, U12), U23);
    const V0 = tangent(A, B), V1 = act(loop, V0), holonomy = Math.atan2(v3.dot(A, v3.cross(V0, V1)), v3.dot(V0, V1));
    return { epsDeg, e, s, c, A, B, C, Acop, Ccop, G, Gc, detG, detGc, triple, cosC, cArc, alpha, beta, gamma, omega, betaFlat, alphaFlat, gammaFlat,
      U12, U23, UCA, W, Wswap, loop, CxA, nAC, height, brick, brickCop, lagrangeL, lagrangeR, commL, commR, V0, V1, holonomy };
  }
  /** The numbers the probe reports (and the page shows), for a cell. */
  function invariants(G) {
    const w = parts(G.W);
    return {
      epsDeg: G.epsDeg, epsRad: G.e, cosC: G.cosC, cDeg: G.cArc / DEG, flatCdeg: Math.SQRT2 * G.epsDeg, alphaDeg: G.alpha / DEG, gammaDeg: G.gamma / DEG, betaDeg: G.beta / DEG,
      betaFlatDeg: G.betaFlat / DEG, alphaFlatDeg: G.alphaFlat / DEG, omegaRad: G.omega, omegaDeg: G.omega / DEG, halfOmegaRad: G.omega / 2, spinorPhaseRad: -G.omega / 2,
      rotorScalar: w.s, rotorBiv12: w.b12, rotorBiv23: w.b23, rotorBiv13: w.b13, rotorNorm2: w.s ** 2 + w.b12 ** 2 + w.b23 ** 2 + w.b13 ** 2,
      detG: G.detG, vol3D: G.triple, sqrtDetG: Math.sqrt(Math.max(0, G.detG)), detGCoplanar: G.detGc, coplanarAC: v3.dot(G.Acop, G.Ccop),
      loopRotor: parts(G.loop), holonomyRad: G.holonomy, height: G.height, crossAC: v3.len(G.CxA), brick: G.brick.slice(), brickCoplanar: G.brickCop.slice(),
      lagrangeLeft: G.lagrangeL, lagrangeRight: G.lagrangeR, commutator: { left: G.commL.slice(), right: G.commR.slice() }
    };
  }

  /** The arrow carried round A → B → C → A at t ∈ [0, 1] (arc length), by the edge rotors. */
  function loopState(G, t) {
    const l1 = G.e, l2 = G.e, l3 = G.cArc, tot = l1 + l2 + l3, d = clamp(t, 0, 1) * tot;
    let R, leg;
    if (d <= l1) { R = rotorFromTo(G.A, G.B, d / l1); leg = 0; } else if (d <= l1 + l2) { R = mul(rotorFromTo(G.B, G.C, (d - l1) / l2), G.U12); leg = 1; } else { R = mul(rotorFromTo(G.C, G.A, (d - l1 - l2) / l3), G.W); leg = 2; }
    return { p: act(R, G.A), v: act(R, G.V0), R, leg, d, tot };
  }
  /** The walk along the walls at s ∈ [0, 2]: A → B by U₁₂, then B → C by U₂₃. */
  function walkState(G, s) {
    const u = clamp(s, 0, 2), R = u <= 1 ? rotorFromTo(G.A, G.B, u) : mul(rotorFromTo(G.B, G.C, u - 1), G.U12);
    return { p: act(R, G.A), v: act(R, G.V0), R, s: u };
  }
  /** Total turning of the path (sum of exterior angles passed) at loop position t. */
  function turningAt(G, t) {
    const l1 = G.e, l2 = G.e, tot = 2 * G.e + G.cArc, d = clamp(t, 0, 1) * tot, eps = 1e-12;
    return (d >= l1 - eps ? PI - G.beta : 0) + (d >= l1 + l2 - eps ? PI - G.gamma : 0) + (d >= tot - eps ? PI - G.alpha : 0);
  }

  /* ---------- state ---------- */
  const S = { view: 'cell', eps: 38, loopT: 1, walk: 2, flat: true, transport: true };
  const RAIL = { cell: 'eps', once: 'eps', twice: 'walk', excess: 'loop', brick: 'eps' };
  const VIEW = {
    cell: { cam: [-2.3, 0.5], fit: 'octant', wall: 0.34, roof: 0.13, cap: 0.66, capBack: 0.2, once: 2.2, twice: 2.2, octant: true, shadow: true },
    once: { cam: [-PI, 0], fit: 'ridge', wall: 0.3, roof: 0.1, cap: 0.5, capBack: 0.2, once: 3.6, twice: 2.6, octant: false, inset: 'lengths' },
    twice: { cam: [-2.75, 0.41], fit: 'cell', wall: 0.42, roof: 0.06, cap: 0.2, capBack: 0.3, once: 1.4, twice: 3.6, octant: false, inset: 'rotor' },
    excess: { cam: [-2.05, 0.34], fit: 'cap', wall: 0.22, roof: 0.08, cap: 0.55, capBack: 0.18, once: 2.6, twice: 2.6, octant: false, inset: 'holonomy' },
    brick: { cam: [-2.3, 0.5] }
  };

  /* ---------- stage, camera and fitting ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; tagBox.appendChild(probe);
  let drag = null;
  const st = kit.stage3(stageEl, {
    canvas: $('cv'), yaw: VIEW.cell.cam[0], pitch: VIEW.cell.cam[1],
    onChange: () => paint(),
    onPick: (ev) => pickAt(ev),
    onDrag: (ev) => dragTo(ev),
    onDrop: () => { drag = null; }
  });
  const PJ = { cx: 0, cy: 0, u: 100, R: [1, 0, 0], U: [0, 0, 1], D: [0, -1, 0] };
  function camAxes(cam) {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  }
  /** World point → [screen x, screen y, depth] (depth > 0 faces the viewer). */
  const pj = (v) => [PJ.cx + PJ.u * v3.dot(v, PJ.R), PJ.cy - PJ.u * v3.dot(v, PJ.U), v3.dot(v, PJ.D)];
  /** Scale and centre that fit the points into the rect (CSS px). */
  function fitFor(pts, rect, axes) {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of pts) { const x = v3.dot(p, axes.R), y = v3.dot(p, axes.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const u = Math.min(rect.w / Math.max(x1 - x0, 1e-3), rect.h / Math.max(y1 - y0, 1e-3)) * st.cam.zoom;
    return { u, cx: rect.x + rect.w / 2 - u * (x0 + x1) / 2, cy: rect.y + rect.h / 2 + u * (y0 + y1) / 2 };
  }
  let lastFit = null, blend = null;
  /** A change of scene blends the fit over the camera's move instead of jumping. */
  function startBlend(ms) {
    if (!lastFit || ms <= 0) { blend = null; return; }
    const b = { from: Object.assign({}, lastFit), e: 0 };
    blend = b;
    kit.tween(ms, (e) => { if (blend === b) { b.e = e; paint(); } }, () => { if (blend === b) blend = null; paint(); });
  }
  const arcPts = (p, q, n = 24) => Array.from({ length: n + 1 }, (_, i) => v3.slerp(p, q, i / n));
  function fitPoints(G, kind) {
    if (kind === 'ridge') return [O, G.A, G.B, G.C, ...arcPts(G.A, G.C, 12), v3.scale(E1, G.s * 1.32), v3.scale(E3, G.s * 1.32)];
    if (kind === 'cap') {
      const pts = [...arcPts(G.A, G.B, 8), ...arcPts(G.B, G.C, 8), ...arcPts(G.C, G.A, 8)], m = v3.unit(v3.add(v3.add(G.A, G.B), G.C)), k = 0.16 * Math.max(G.e, 0.2);
      // room around each vertex for its angle mark and the carried arrow
      for (const p of [G.A, G.B, G.C]) { const out = v3.unit(v3.sub(p, v3.scale(m, v3.dot(p, m)))); pts.push(v3.add(p, v3.scale(out, k))); }
      return pts;
    }
    if (kind === 'cell') return [O, G.A, G.B, G.C, ...arcPts(G.A, G.B, 8), ...arcPts(G.B, G.C, 8), v3.scale(E2, 1.08)];
    return [O, G.A, G.B, G.C, v3.scale(E1, 1.1), v3.scale(E2, 1.14), v3.scale(E3, 1.1)];
  }

  /* ---------- the safe area: the stage minus the title, the scene chips and the legend ---------- */
  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.opacity === '0' || cs.visibility === 'hidden' || cs.display === 'none') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(40, bottom - top) };
  }
  /** Two parts of a rect: the main part and an inset (side by side when wide, stacked when tall). */
  function splitRect(r, frac, side) {
    if (r.w >= r.h * (side || 1.15)) { const iw = Math.round(r.w * frac); return { main: { x: r.x, y: r.y, w: r.w - iw - 8, h: r.h }, inset: { x: r.x + r.w - iw, y: r.y, w: iw, h: r.h }, wide: true }; }
    const ih = Math.round(r.h * frac); return { main: { x: r.x, y: r.y, w: r.w, h: r.h - ih - 8 }, inset: { x: r.x, y: r.y + r.h - ih, w: r.w, h: ih }, wide: false };
  }
  const inset = (r, dx, dy) => ({ x: r.x + dx, y: r.y + dy, w: Math.max(10, r.w - 2 * dx), h: Math.max(10, r.h - 2 * dy) });

  /* ---------- labels: placed after drawing, by priority, never on top of each other or of the hud ---------- */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => sizes.clear());
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], KEEP = [], BOUNDS = null, OBST = [];
  /** Ask for a label at the screen point q; opts: pri (higher first), dir ([x, y] preferred direction), r (gap px), at ('center'). */
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 9 : o.r, at: o.at, free: !!o.free });
  /** Keep labels off a screen box (points, insets). */
  const keepOut = (x, y, w, h) => KEEP.push({ x, y, w, h });
  const keepDot = (q, r = 5) => keepOut(q[0] - r, q[1] - r, 2 * r, 2 * r);
  /** Keep labels off a drawn segment (small boxes every few pixels along it). */
  const keepSeg = (a, b, r = 4) => { const n = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 6)); for (let i = 0; i <= n; i++) keepDot([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n], r); };
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [], boxes = OBST.concat(KEEP);
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      let cands;
      if (l.at === 'center') cands = [[0, 0]];
      else {
        const base = Math.atan2(l.dir[1], l.dir[0]);
        cands = [];
        for (const r of [l.r, l.r + 10, l.r + 22]) for (const da of [0, 0.6, -0.6, 1.2, -1.2, 1.9, -1.9, PI]) {
          const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
          cands.push([ux * (r + ext), uy * (r + ext)]);
        }
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || (l.free ? OBST : boxes).some((p) => meets(p, b, 1))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      st.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    return placed;
  }

  /* ---------- drawing primitives (CSS px on the stage canvas) ---------- */
  let ctx = null;
  const LW = () => (TRV.thumbMode ? 1.8 : 1);
  function stroke2(pts, s) {
    if (pts.length < 2) return;
    ctx.save(); ctx.strokeStyle = s.color; ctx.lineWidth = (s.width || 1.2) * LW(); ctx.globalAlpha = s.alpha == null ? 1 : s.alpha;
    ctx.setLineDash(s.dash || []); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (s.glow) { ctx.shadowColor = s.color; ctx.shadowBlur = s.glow; }
    ctx.beginPath(); pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); if (s.close) ctx.closePath(); ctx.stroke(); ctx.restore();
  }
  const line3 = (pts, s) => stroke2(pts.map(pj), s);
  function fill2(pts, color, alpha, c2) {
    const g = c2 || ctx; g.save(); g.globalAlpha = alpha; g.fillStyle = color; g.beginPath(); pts.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.closePath(); g.fill(); g.restore();
  }
  function dot2(q, r, color, s = {}) {
    ctx.save(); ctx.globalAlpha = s.alpha == null ? 1 : s.alpha; ctx.beginPath(); ctx.arc(q[0], q[1], r * LW(), 0, 2 * PI);
    if (s.ring) { ctx.strokeStyle = color; ctx.lineWidth = (s.width || 2) * LW(); ctx.stroke(); } else { if (s.glow) { ctx.shadowColor = color; ctx.shadowBlur = s.glow; } ctx.fillStyle = color; ctx.fill(); }
    ctx.restore();
  }
  function arrow2(a, b, color, s = {}) {
    const dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy);
    stroke2([a, b], { color, width: s.width || 2.2, alpha: s.alpha, dash: s.dash, glow: s.glow });
    if (len < 6) return;
    const h = Math.min((s.head || 9) * LW(), len * 0.6), ux = dx / len, uy = dy / len;
    fill2([b, [b[0] - ux * h - uy * h * 0.45, b[1] - uy * h + ux * h * 0.45], [b[0] - ux * h + uy * h * 0.45, b[1] - uy * h - ux * h * 0.45]], color, s.alpha == null ? 1 : s.alpha);
  }
  const lightDir = () => v3.unit(v3.add(v3.add(v3.scale(PJ.R, -0.35), v3.scale(PJ.U, 0.55)), v3.scale(PJ.D, 0.75)));
  /** Lambert shade in [0, 1] for an outward normal, lit from the camera's upper left (both sides). */
  const shade = (n) => Math.abs(v3.dot(n, lightDir()));

  /* the cap: drawn opaque on an offscreen canvas, then laid on the stage at one alpha (no seams between facets) */
  const off = document.createElement('canvas'), offCtx = off.getContext('2d');
  function capMesh(G, n) {
    const pt = (i, j) => v3.unit(v3.add(v3.add(v3.scale(G.A, i), v3.scale(G.B, j)), v3.scale(G.C, n - i - j)));
    const grid = [], tris = [];
    for (let i = 0; i <= n; i++) { grid[i] = []; for (let j = 0; j <= n - i; j++) grid[i][j] = pt(i, j); }
    for (let i = 0; i < n; i++) for (let j = 0; j < n - i; j++) {
      tris.push([grid[i][j], grid[i + 1][j], grid[i][j + 1]]);
      if (i + j < n - 1) tris.push([grid[i + 1][j], grid[i + 1][j + 1], grid[i][j + 1]]);
    }
    return { grid, tris, n };
  }
  function capLayer(mesh, front, alpha, W, H) {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (off.width !== Math.round(W * dpr) || off.height !== Math.round(H * dpr)) { off.width = Math.round(W * dpr); off.height = Math.round(H * dpr); }
    offCtx.setTransform(1, 0, 0, 1, 0, 0); offCtx.clearRect(0, 0, off.width, off.height); offCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let any = false;
    const list = mesh.tris.map((t) => { const m = v3.unit(v3.add(v3.add(t[0], t[1]), t[2])); return { t, m, d: v3.dot(m, PJ.D) }; })
      .filter((f) => (f.d > 1e-9) === front).sort((a, b) => a.d - b.d);
    for (const f of list) {
      const q = f.t.map(pj), lam = shade(f.m);
      offCtx.save(); offCtx.fillStyle = P.magenta; offCtx.strokeStyle = P.magenta; offCtx.lineWidth = 0.8; offCtx.lineJoin = 'round';
      offCtx.beginPath(); q.forEach((p, i) => (i ? offCtx.lineTo(p[0], p[1]) : offCtx.moveTo(p[0], p[1]))); offCtx.closePath(); offCtx.fill(); offCtx.stroke();
      offCtx.globalAlpha = (1 - lam) * 0.62; offCtx.fillStyle = P.void; offCtx.strokeStyle = P.void; offCtx.fill(); offCtx.stroke(); offCtx.restore();
      any = true;
    }
    if (front && any) {
      // a light grid on the cap: lines of constant barycentric coordinate, every third step
      offCtx.save(); offCtx.strokeStyle = P.ink; offCtx.globalAlpha = 0.16; offCtx.lineWidth = 0.7;
      const n = mesh.n, g = mesh.grid;
      for (let k = 3; k < n; k += 3) {
        const rows = [Array.from({ length: n - k + 1 }, (_, j) => g[k][j]), Array.from({ length: n - k + 1 }, (_, i) => g[i][k]), Array.from({ length: k + 1 }, (_, i) => g[i][k - i])];
        for (const r of rows) { offCtx.beginPath(); r.forEach((p, i) => { const q = pj(p); if (i) offCtx.lineTo(q[0], q[1]); else offCtx.moveTo(q[0], q[1]); }); offCtx.stroke(); }
      }
      offCtx.restore();
    }
    if (!any) return;
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = alpha; ctx.drawImage(off, 0, 0); ctx.restore();
  }

  /* ---------- the 3D scenes ---------- */
  const ink = () => P.sigma;
  function drawCell3D(G, W, H, huds) {
    const V = VIEW[S.view], thumb = TRV.thumbMode;
    Object.assign(PJ, camAxes(st.cam));
    let area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds), ins = null;
    if (V.inset && !thumb) {
      // reserve the inset only where it can be read: beside the cell when the stage is wide, under it when it is tall
      const n = V.inset === 'rotor' ? 4 : 3, need = 54 + n * 38 + 8;
      if (area.w >= area.h * 1.15) { if (area.w * 0.36 >= 190 && area.h >= need) { const sp = splitRect(area, 0.36); area = sp.main; ins = sp.inset; } }
      else if (area.h - need >= 180 && area.w >= 190) { ins = { x: area.x, y: area.y + area.h - need, w: area.w, h: need }; area = { x: area.x, y: area.y, w: area.w, h: area.h - need - 8 }; }
    }
    const fitArea = thumb ? area : inset(area, Math.min(40, area.w * 0.08), Math.min(26, area.h * 0.07));
    const target = fitFor(fitPoints(G, V.fit), fitArea, PJ);
    const f = blend ? { u: blend.from.u + (target.u - blend.from.u) * blend.e, cx: blend.from.cx + (target.cx - blend.from.cx) * blend.e, cy: blend.from.cy + (target.cy - blend.from.cy) * blend.e } : target;
    PJ.u = f.u; PJ.cx = f.cx; PJ.cy = f.cy; lastFit = Object.assign({}, f);

    ctx.save();
    if (!thumb) { ctx.beginPath(); ctx.rect(area.x - 6, area.y - 4, area.w + 12, area.h + 8); ctx.clip(); }
    const D = PJ.D, front = (n) => v3.dot(n, D) > 1e-9;
    // context: the octant of the sphere and the axes
    if (V.octant) {
      for (const [p, q] of [[E1, E2], [E2, E3], [E3, E1]]) line3(arcPts(p, q, 40), { color: P.lineHot, width: 1, alpha: 0.75 });
      for (const [ax, k] of [[E1, 1.1], [E2, 1.14], [E3, 1.1]]) line3([O, v3.scale(ax, k)], { color: P.dim, width: 1, alpha: 0.6, dash: [3, 4] });
    } else if (S.view === 'once') {
      for (const ax of [E1, E3]) line3([O, v3.scale(ax, G.s * 1.3)], { color: P.dim, width: 1, alpha: 0.65, dash: [3, 4] });
    }
    // the shadow of the cell down the ridge OB, on the plane y = 0
    if (V.shadow) {
      const sh = [O, [G.s, 0, 0], ...arcPts(G.A, G.C, 20).map((p) => [p[0], 0, p[2]]), [0, 0, G.s]].map(pj);
      fill2(sh, P.cyan, 0.07); stroke2(sh, { color: P.cyan, width: 1, alpha: 0.55, dash: [4, 4], close: true });
    }
    const faces = [
      { key: 'wallA', pts: [O, ...arcPts(G.B, G.A, 16)], n: [0, 0, -1], color: ink(), alpha: V.wall },
      { key: 'wallC', pts: [O, ...arcPts(G.B, G.C, 16)], n: [-1, 0, 0], color: ink(), alpha: V.wall },
      { key: 'roof', pts: [O, ...arcPts(G.A, G.C, 16)], n: v3.unit(v3.cross(G.A, G.C)), color: P.cyan, alpha: V.roof }
    ];
    const isFront = {}; faces.forEach((fc) => { isFront[fc.key] = front(fc.n); });
    const drawFace = (fc) => { const q = fc.pts.map(pj); fill2(q, fc.color, fc.alpha * (0.5 + 0.5 * shade(fc.n)) * (isFront[fc.key] ? 1 : 0.85)); };
    const mesh = capMesh(G, 12);
    const edges = [
      { key: 'OB', pts: [O, G.B], faces: ['wallA', 'wallC'], role: 'ridge' },
      { key: 'OA', pts: [O, G.A], faces: ['wallA', 'roof'], role: 'radius' },
      { key: 'OC', pts: [O, G.C], faces: ['wallC', 'roof'], role: 'radius' },
      { key: 'AB', pts: arcPts(G.A, G.B), faces: ['wallA'], cap: true, role: 'twice' },
      { key: 'BC', pts: arcPts(G.B, G.C), faces: ['wallC'], cap: true, role: 'twice' },
      { key: 'AC', pts: arcPts(G.A, G.C), faces: ['roof'], cap: true, role: 'once' }
    ];
    const edgeStyle = (role) => role === 'once' ? { color: P.cyan, width: V.once } : role === 'twice' ? { color: P.magenta, width: V.twice } : role === 'ridge' ? { color: ink(), width: 1.5 } : { color: P.dim, width: 1.1 };
    const segs = (seen) => {
      for (const e of edges) {
        const sty = edgeStyle(e.role);
        for (let i = 1; i < e.pts.length; i++) {
          const a = e.pts[i - 1], b = e.pts[i], m = v3.scale(v3.add(a, b), 0.5);
          const vis = S.view === 'once' || e.faces.some((k) => isFront[k]) || (e.cap && v3.dot(v3.unit(m), D) > 1e-9);
          if (vis !== seen) continue;
          stroke2([pj(a), pj(b)], seen ? sty : { color: sty.color, width: Math.max(1, sty.width * 0.6), alpha: 0.5, dash: [4, 4] });
        }
      }
    };
    // back faces, the back of the cap, hidden edges, the flat cut, front faces, the front of the cap, visible edges
    faces.filter((fc) => !isFront[fc.key]).forEach(drawFace);
    capLayer(mesh, false, V.capBack, W, H);
    segs(false);
    if (S.flat && S.view !== 'once') {
      const tri = [G.A, G.B, G.C].map(pj);
      fill2(tri, P.cyan, S.view === 'excess' ? 0.22 : 0.16);
      stroke2(tri, { color: P.cyan, width: 1.3, alpha: 0.9, dash: [6, 4], close: true });
    }
    faces.filter((fc) => isFront[fc.key]).forEach(drawFace);
    capLayer(mesh, true, V.cap, W, H);
    segs(true);

    // marks, points, the handle and the carried arrow
    const qA = pj(G.A), qB = pj(G.B), qC = pj(G.C), qO = pj(O), cen = pj(v3.scale(v3.add(v3.add(G.A, G.B), G.C), 1 / 3));
    const away = (q, r = 1) => { const dx = q[0] - cen[0], dy = q[1] - cen[1], l = Math.hypot(dx, dy) || 1; return [r * dx / l, r * dy / l]; };
    if (S.view === 'cell' || S.view === 'twice') {
      // the angle ε at O in each wall
      const r = 0.2;
      line3(arcPts(E2, G.A, 16).map((p) => v3.scale(p, r)), { color: ink(), width: 1.1, alpha: 0.85 });
      line3(arcPts(E2, G.C, 16).map((p) => v3.scale(p, r)), { color: ink(), width: 1.1, alpha: 0.85 });
      const mid = pj(v3.scale(v3.slerp(E2, G.C, 0.5), r * 1.0));
      if (!thumb) want('epsO', mid, 'ε', 'raw ink', { pri: 2, dir: [mid[0] - qO[0], mid[1] - qO[1]], r: 4 });
    }
    if (S.view === 'once' || S.view === 'twice' || S.view === 'excess') {
      // the right angle at B, in the tangent plane at B
      const tA = tangent(G.B, G.A), tC = tangent(G.B, G.C), r = 0.11 * Math.max(G.e, 0.35) * (S.view === 'once' ? 1.4 : 1);
      line3([v3.add(G.B, v3.scale(tA, r)), v3.add(G.B, v3.add(v3.scale(tA, r), v3.scale(tC, r))), v3.add(G.B, v3.scale(tC, r))], { color: ink(), width: 1.3, alpha: 0.95 });
      if (S.view === 'twice' && !thumb) { const q = pj(v3.add(G.B, v3.add(v3.scale(tA, r), v3.scale(tC, r)))); want('ninety', q, '90°', 'raw ink', { pri: 7, dir: away(q), r: 4 }); }
    }
    if (S.view === 'excess') drawAngles(G, cen);
    if (S.view === 'twice') drawWalk(G);
    if ((S.view === 'cell' || S.view === 'excess') && S.transport) drawTransport(G);

    for (const [q, k] of [[qA, 'A'], [qB, 'B'], [qC, 'C']]) { dot2(q, 3.6, ink()); keepDot(q, 5); }
    if (S.view !== 'once' && S.view !== 'excess') { dot2(qO, 3, ink()); keepDot(qO, 4); }
    const handle = S.view === 'cell' || S.view === 'once' || S.view === 'excess';
    if (handle && !thumb) dot2(qC, 9, P.amber, { ring: true, width: 2.2 });
    // vertex labels
    if (!thumb) {
      const once = S.view === 'once';
      want('A', qA, once ? 'A⊥ = (sin ε, 0)' : 'A(ε)', 'raw ink', { pri: 9, dir: away(qA), r: 7 });
      want('C', qC, once ? 'C⊥ = (0, sin ε)' : 'C(ε)', 'raw ink', { pri: 9, dir: away(qC), r: 12 });
      want('B', qB, once ? L('B 与 O 重合', 'B on top of O') : 'B = e₂', 'raw ink', { pri: 9, dir: once ? [-1, 1] : away(qB), r: 8 });
      if (S.view === 'cell' || S.view === 'twice') want('O', qO, 'O', 'raw ink', { pri: 8, dir: [qO[0] - cen[0], qO[1] - cen[1]], r: 6 });
      if (V.octant) for (const [ax, nm, k, Vx] of [[E1, 'e₁', 1.1, G.A], [E3, 'e₃', 1.1, G.C]]) { if (v3.dot(ax, Vx) > 0.97) continue; const q = pj(v3.scale(ax, k)); want('ax' + nm, q, nm, 'raw', { pri: 3, dir: [q[0] - qO[0], q[1] - qO[1]], r: 4 }); }
      if (once) for (const [ax, nm] of [[E1, 'e₁'], [E3, 'e₃']]) { const q = pj(v3.scale(ax, G.s * 1.3)); want('ax' + nm, q, nm, 'raw', { pri: 3, dir: [q[0] - qB[0], q[1] - qB[1]], r: 4 }); }
      if (once) {
        const m = pj(v3.slerp(G.A, G.C, 0.5));
        want('cArc', m, `c<sub>ε</sub> = ${fix(G.cArc / DEG, 1)}°`, 'raw c-cy', { pri: 6, dir: away(m), r: 8 });
      }
      if (S.view === 'cell') {
        const m = pj(v3.unit(v3.add(v3.add(G.A, G.B), G.C)));
        want('cap', m, L('球面帽', 'cap'), 'raw c-mg', { pri: 4, at: 'center' });
      }
    }
    ctx.restore();
    if (ins) drawInset(G, ins);
    return area;
  }

  function drawAngles(G, cen) {
    const thumb = TRV.thumbMode, r = 0.2 * Math.min(G.e, G.cArc);
    const mark = (Vx, P1, P2, key, html, cls, color, pri) => {
      const t1 = tangent(Vx, P1), t2 = tangent(Vx, P2), pts = Array.from({ length: 17 }, (_, i) => v3.add(Vx, v3.scale(v3.slerp(t1, t2, i / 16), r)));
      line3(pts, { color, width: 1.6, alpha: 0.95 });
      if (!thumb) { const q = pj(v3.add(Vx, v3.scale(v3.slerp(t1, t2, 0.5), r))); const qv = pj(Vx); want(key, q, html, cls, { pri, dir: [q[0] - qv[0] || 0.01, q[1] - qv[1]], r: 3 }); }
    };
    mark(G.A, G.B, G.C, 'angA', `α = ${fix(G.alpha / DEG, 1)}°`, 'raw c-mg', P.magenta, 6);
    mark(G.C, G.A, G.B, 'angC', `γ = ${fix(G.gamma / DEG, 1)}°`, 'raw c-mg', P.magenta, 6);
    if (S.flat) {
      // the flat angle at B, on the chords
      const u1 = v3.unit(v3.sub(G.A, G.B)), u2 = v3.unit(v3.sub(G.C, G.B)), rr = r * 1.55;
      line3(Array.from({ length: 17 }, (_, i) => v3.add(G.B, v3.scale(v3.slerp(u1, u2, i / 16), rr))), { color: P.cyan, width: 1.5, alpha: 0.95 });
      if (!thumb) { const q = pj(v3.add(G.B, v3.scale(v3.slerp(u1, u2, 0.5), rr))), qb = pj(G.B); want('angBf', q, `β<sub>flat</sub> = ${fix(G.betaFlat / DEG, 1)}°`, 'raw c-cy', { pri: 5, dir: [q[0] - qb[0], q[1] - qb[1]], r: 4 }); }
    }
    if (!thumb) { const q = pj(G.B); want('angB', q, 'β = 90°', 'raw c-mg', { pri: 6, dir: [q[0] - cen[0], q[1] - cen[1]], r: 14 }); }
  }

  function drawWalk(G) {
    const w = walkState(G, S.walk), q = pj(w.p), thumb = TRV.thumbMode;
    // the part of the staircase already walked, brighter
    const done = w.s <= 1 ? arcPts(G.A, w.p, 16) : [...arcPts(G.A, G.B, 16), ...arcPts(G.B, w.p, 16)];
    line3(done, { color: P.magenta, width: 5, alpha: 0.35 });
    if (S.transport) {
      const len = 0.38 * Math.max(G.e, 0.3), tip = pj(v3.add(w.p, v3.scale(w.v, len)));
      arrow2(q, tip, P.amber, { width: 2.4, head: 9 });
      keepSeg(q, tip);
    }
    dot2(q, 5.5, P.amber, { glow: 10 }); keepDot(q, 7);
    if (!thumb) {
      want('stepA', pj(v3.slerp(G.A, G.B, 0.5)), L('第一步 · 墙 e₁∧e₂', 'step 1 · wall e₁∧e₂'), 'raw c-mg', { pri: 5, dir: [0, 1], r: 10 });
      want('stepC', pj(v3.slerp(G.B, G.C, 0.5)), L('第二步 · 墙 e₂∧e₃', 'step 2 · wall e₂∧e₃'), 'raw c-mg', { pri: 5, dir: [1, 0], r: 10 });
    }
  }

  function drawTransport(G) {
    const thumb = TRV.thumbMode, T = loopState(G, S.loopT), len = 0.36 * Math.max(Math.min(G.e, G.cArc), 0.3) * (S.view === 'cell' ? 0.9 : 1);
    const qA = pj(G.A), q = pj(T.p);
    // the arrow as it set out (ghost) and as it is now
    const g0 = pj(v3.add(G.A, v3.scale(G.V0, len)));
    arrow2(qA, g0, P.dim, { width: 1.6, dash: [4, 3], alpha: 0.9, head: 8 });
    keepSeg(qA, g0, 3);
    const closed = S.loopT >= 1 - 1e-9;
    if (closed && Math.abs(G.holonomy) > 1e-4) {
      // the turn of the arrow after one loop (magenta), and the rotor's half angle (violet), in the tangent plane at A
      const fan = [qA], arc = [], half = [];
      for (let i = 0; i <= 24; i++) { const v = v3.rot(G.V0, G.A, G.holonomy * i / 24); fan.push(pj(v3.add(G.A, v3.scale(v, len * 0.8)))); }
      for (let i = 0; i <= 24; i++) { const v = v3.rot(G.V0, G.A, G.holonomy * i / 24); arc.push(pj(v3.add(G.A, v3.scale(v, len * 0.8)))); }
      for (let i = 0; i <= 16; i++) { const v = v3.rot(G.V0, G.A, (G.holonomy / 2) * i / 16); half.push(pj(v3.add(G.A, v3.scale(v, len * 0.5)))); }
      fill2(fan, P.magenta, 0.32); stroke2(arc, { color: P.magenta, width: 1.6 });
      stroke2(half, { color: P.violet, width: 2.2 });
      if (!thumb) {
        const mid = pj(v3.add(G.A, v3.scale(v3.rot(G.V0, G.A, G.holonomy / 2), len * 0.86)));
        want('omega', mid, `Ω = ${fix(G.omega / DEG, 1)}°`, 'raw c-mg', { pri: 8, dir: [mid[0] - qA[0], mid[1] - qA[1]], r: 6 });
        const mh = pj(v3.add(G.A, v3.scale(v3.rot(G.V0, G.A, G.holonomy / 4), len * 0.5)));
        if (S.view === 'excess') want('half', mh, 'Ω/2', 'raw c-vi', { pri: 4, dir: [mh[0] - qA[0], mh[1] - qA[1]], r: 4 });
      }
    }
    const tip = pj(v3.add(T.p, v3.scale(T.v, len)));
    arrow2(q, tip, P.amber, { width: 2.4, head: 9 });
    dot2(q, 5, P.amber, { glow: 10 });
    keepDot(q, 7); keepSeg(q, tip);
  }

  /* insets: the arc lengths (once), the rotor carried so far (twice), the spinor phase against the wall rotor (excess).
     Each row is a name line and a bar; the value sits right of the bar. */
  let INS = [], INSBOX = null;
  function drawInset(G, r0) {
    const r = inset(r0, 6, 4), rows = [];
    let title = '', foot = '', lo = 0, hi = 1;
    if (S.view === 'once') {
      title = L('三种弧长', 'Three arc lengths');
      rows.push([P.magenta, L('两次：A → B → C', 'twice: A → B → C'), 2 * G.e, `${fix(2 * G.epsDeg, 1)}°`]);
      rows.push([P.dim, L('平直勾股 √2 ε', 'flat Pythagoras √2 ε'), Math.SQRT2 * G.e, `${fix(Math.SQRT2 * G.epsDeg, 1)}°`, [4, 3]]);
      rows.push([P.cyan, L('一次：弧 AC', 'once: arc AC'), G.cArc, `${fix(G.cArc / DEG, 1)}°`]);
      hi = 2 * G.e;
      foot = L(`c<sub>ε</sub> 比 √2 ε 短 ${fix((Math.SQRT2 * G.e - G.cArc) / DEG, 2)}°`, `c<sub>ε</sub> is ${fix((Math.SQRT2 * G.e - G.cArc) / DEG, 2)}° shorter than √2 ε`);
    } else if (S.view === 'twice') {
      const w = walkState(G, S.walk), p = parts(w.R);
      title = S.walk >= 2 - 1e-9 ? 'U₂₃U₁₂' : L('走到这里的旋子', 'The rotor so far');
      rows.push([P.violet, L('标量', 'scalar'), p.s, sgn(p.s, 3)]);
      rows.push([P.violet, 'e₁e₂', p.b12, sgn(p.b12, 3)]);
      rows.push([P.violet, 'e₂e₃', p.b23, sgn(p.b23, 3)]);
      rows.push([P.magenta, L('e₁e₃：拐角之后才有', 'e₁e₃: only after the turn'), p.b13, sgn(p.b13, 3)]);
      lo = -1; hi = 1;
      foot = L(`平方和 = ${fix(p.s ** 2 + p.b12 ** 2 + p.b23 ** 2 + p.b13 ** 2, 3)}`, `sum of squares = ${fix(p.s ** 2 + p.b12 ** 2 + p.b23 ** 2 + p.b13 ** 2, 3)}`);
    } else {
      const b13 = parts(G.W).b13, lead = -(G.e ** 2) / 4;
      title = L('与 −Ω/2 对照', 'Against −Ω/2');
      rows.push([P.violet, L('回路 −Ω/2（精确）', 'loop −Ω/2 (exact)'), -G.omega / 2, fix(-G.omega / 2, 3)]);
      rows.push([P.violet, L('两面墙的 e₁e₃ 分量', 'two walls, e₁e₃ part'), b13, fix(b13, 3), [4, 3]]);
      rows.push([P.dim, L('最低阶 −ε²/4', 'lowest order −ε²/4'), lead, fix(lead, 3), [2, 3]]);
      lo = Math.min(-0.05, -G.omega / 2, b13, lead) * 1.08; hi = 0;
      foot = L('三者只在最低阶一致', 'they agree only at lowest order');
    }
    const rowH = Math.min(44, (r.h - 54) / rows.length), valW = 62, x0 = r.x + 2, bw = Math.max(20, r.w - 4 - valW);
    keepOut(r0.x, r0.y, r0.w, r0.h);
    if (rowH < 30 || r.w < 150) return;   // too small to read: leave the inset out
    const X = (v) => x0 + (v - lo) / (hi - lo || 1) * bw;
    INS.push({ key: 'insT', x: x0, y: r.y + 9, html: title, cls: 'raw ink' });
    rows.forEach(([color, name, v, txt, dash], i) => {
      const y = r.y + 26 + i * rowH, yb = y + 19;
      stroke2([[x0, yb], [x0 + bw, yb]], { color: P.lineHot, width: 1, alpha: 0.6 });
      ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.lineCap = 'butt'; ctx.setLineDash(dash || []);
      ctx.beginPath(); ctx.moveTo(X(Math.max(lo, Math.min(hi, 0))), yb); ctx.lineTo(X(v), yb); ctx.stroke(); ctx.restore();
      if (lo < 0 && hi > 0) stroke2([[X(0), yb - 7], [X(0), yb + 7]], { color: P.dim, width: 1 });
      INS.push({ key: 'insN' + i, x: x0, y: y + 6, html: name, cls: 'raw small ink' });
      INS.push({ key: 'insV' + i, x: r.x + r.w - 2, y: yb, html: txt, cls: 'raw small num', right: true });
    });
    INS.push({ key: 'insF', x: x0, y: r.y + 26 + rows.length * rowH + 4, html: foot, cls: 'raw small' });
    INSBOX = r;
  }
  /** Inset labels sit in fixed slots, left- or right-aligned; one that would leave the inset or meet another is dropped. */
  function placeInsetLabels() {
    if (!INSBOX) return [];
    const used = [];
    for (const l of INS) {
      if (!l.html) continue;
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const b = { x: l.right ? l.x - w : l.x, y: l.y - h / 2, w, h };
      if (b.x < INSBOX.x - 2 || b.x + w > INSBOX.x + INSBOX.w + 4 || b.y < BOUNDS.y || b.y + h > BOUNDS.y + BOUNDS.h) continue;
      if (used.some((u) => meets(u, b, 2)) || OBST.some((u) => meets(u, b, 1))) continue;
      used.push(b);
      st.tag(l.key, [b.x + w / 2, b.y + h / 2], l.html, l.cls, { screen: true });
    }
    return used;
  }

  /* ---------- the Gram scene (2D) ---------- */
  let plotG = null;
  function drawBrick(G, W, H, huds) {
    const thumb = TRV.thumbMode, area = thumb ? { x: 20, y: 20, w: W - 40, h: H - 40 } : safeRect(W, H, huds);
    const sp = area.w >= area.h && area.w >= 520 ? splitRect(area, 0.5, 1.0) : splitRect(area, 0.5, 99), left = sp.main, right = sp.inset;
    // left: two columns, the coplanar two-step and the trihedron; each a Gram table and the parallelepiped of its states
    const cols = [
      { key: 'cop', title: L('共面两步', 'coplanar two-step'), Gm: G.Gc, det: G.detGc, X: [G.Acop, G.B, G.Ccop], vol: 0, color: P.dim },
      { key: 'tri', title: L('正交三面角', 'orthogonal trihedron'), Gm: G.G, det: G.detG, X: [G.A, G.B, G.C], vol: G.triple, color: P.violet }
    ];
    const cw = left.w / 2, titleH = thumb ? 0 : 22, detH = thumb ? 0 : 22;
    const body = { h: Math.max(40, left.h - titleH - detH), w: cw - 10 };
    const across = body.w >= body.h * 1.25;   // grid beside the brick, or above it
    const gs = across ? Math.max(30, Math.min(body.h, body.w * 0.46)) : Math.max(30, Math.min(body.w * 0.72, body.h * 0.46)), cell = gs / 3;
    const bw = across ? body.w - gs - 10 : body.w, bh = across ? body.h : body.h - gs - 10;
    // the Gram–Schmidt brick: edges 1 (along A), |A∧C| = sin c_ε (C off A), B·n (B off the plane A∧C); its volume is |det[A, B, C]|
    const OX = [1, 0], OY = [0.62 * Math.cos(0.6), -0.62 * Math.sin(0.6)], OZ = [0, -1];
    const ext = [1 + OY[0], 1 - OY[1]], u = Math.max(4, Math.min((bw - 16) / ext[0], (bh - 12) / ext[1]));
    cols.forEach((col, k) => {
      const cx0 = left.x + cw * k + 5, top = left.y + titleH, cx = cx0 + body.w / 2;
      if (!thumb) want('ttl' + col.key, [cx, left.y + 9], col.title, 'raw ' + (k ? 'c-vi' : 'ink'), { pri: 9, at: 'center' });
      const gx = across ? cx0 : cx - gs / 2, gy = across ? top + (body.h - gs) / 2 : top;
      // the Gram table: cyan where the inner product is positive, magenta where it is negative; the corner A·C outlined
      for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
        const v = col.Gm[i][j], x = gx + j * cell, y = gy + i * cell;
        ctx.save(); ctx.globalAlpha = 0.12 + 0.62 * Math.abs(v); ctx.fillStyle = v >= 0 ? P.cyan : P.magenta; ctx.fillRect(x + 1, y + 1, cell - 2, cell - 2); ctx.restore();
        if (i + j === 2 && i !== 1) stroke2([[x + 1, y + 1], [x + cell - 1, y + 1], [x + cell - 1, y + cell - 1], [x + 1, y + cell - 1]], { color: P.ink, width: 1.4, close: true });
        if (!thumb && cell >= 30) want(`g${col.key}${i}${j}`, [x + cell / 2, y + cell / 2], fix(v, 2), 'num', { pri: 3, at: 'center', free: true });
      }
      if (!thumb) keepOut(gx, gy, gs, gs);
      const [r1, r2, r3] = k ? G.brick : G.brickCop;
      const bx = across ? cx0 + gs + 10 : cx0, by = across ? top : top + gs + 10;
      const o = [bx + (bw - u * ext[0]) / 2, by + (bh - u * ext[1]) / 2 + u * ext[1]];
      const Q = (x, y, z) => [o[0] + u * (x * OX[0] + y * OY[0] + z * OZ[0]), o[1] + u * (x * OX[1] + y * OY[1] + z * OZ[1])];
      const faces = [
        [[0, 0, 0], [r1, 0, 0], [r1, 0, r3], [0, 0, r3]],          // front
        [[r1, 0, 0], [r1, r2, 0], [r1, r2, r3], [r1, 0, r3]],      // side
        [[0, 0, r3], [r1, 0, r3], [r1, r2, r3], [0, r2, r3]]       // top
      ];
      const col2 = k ? P.violet : P.dim, alphas = [0.3, 0.18, 0.42];
      faces.forEach((f, i) => { const q = f.map((p) => Q(...p)); fill2(q, col2, (k ? 1 : 0.7) * alphas[i]); stroke2(q, { color: col2, width: (k ? 1.5 : 1.1) * (thumb ? 1.6 : 1), alpha: 0.95, close: true }); });
      if (!thumb) {
        const xs = [Q(0, 0, 0), Q(r1, 0, 0), Q(r1, r2, r3), Q(0, r2, r3), Q(0, 0, r3), Q(r1, r2, 0)];
        const qx0 = Math.min(...xs.map((q) => q[0])), qx1 = Math.max(...xs.map((q) => q[0])), qy0 = Math.min(...xs.map((q) => q[1])), qy1 = Math.max(...xs.map((q) => q[1]));
        keepOut(qx0 - 2, qy0 - 2, qx1 - qx0 + 4, qy1 - qy0 + 4);
        want('h' + col.key, Q(r1, r2 / 2, r3), k ? `${L('体积', 'volume')} ${fix(col.vol, 3)}` : L('体积 0', 'volume 0'), 'raw small ' + (k ? 'c-vi' : 'ink'), { pri: 7, dir: [0.3, -1], r: 6 });
      }
      if (!thumb) {
        const lab = `det G = ${fix(Math.abs(col.det) < 1e-12 ? 0 : col.det, 4)}`;
        want('det' + col.key, [cx, left.y + left.h - 9], lab, 'raw small ' + (k ? 'c-vi' : 'ink'), { pri: 8, at: 'center' });
      }
    });
    // right: log–log scaling over ε
    const pad = [right.x + 40, W - (right.x + right.w) + 6, right.y + 6, H - (right.y + right.h) + 20];
    const g = kit.plot($('cv'), { x: [EPS0 * DEG, EPS1 * DEG], y: [1e-3, 4], logX: true, logY: true, pad, clear: false });
    plotG = g;
    g.axes({ xTicks: [5, 10, 20, 45, 90].map((d) => [d * DEG, `${d}°`]), yTicks: [[1e-3, '10⁻³'], [1e-2, '10⁻²'], [1e-1, '0.1'], [1, '1']], xGrid: true });
    g.rect(EPS0 * DEG, 1e-3, FLOOR_DEG * DEG, 4, P.dim, { alpha: 0.2 });
    const xs = Array.from({ length: 140 }, (_, i) => EPS0 * DEG * Math.pow(EPS1 / EPS0, i / 139));
    const curve = (f) => xs.map((x) => [x, f(x)]);
    g.line(curve((x) => Math.SQRT2 * x), P.cyan, { width: 1.2, dash: [4, 3], alpha: 0.8 });
    g.line(curve((x) => Math.acos(Math.cos(x) ** 2)), P.cyan, { width: thumb ? 3.6 : 2.2 });
    g.line(curve((x) => x * x / 2), P.magenta, { width: 1.2, dash: [4, 3], alpha: 0.8 });
    g.line(curve((x) => { const H2 = cellAt(x / DEG); return H2.omega; }), P.magenta, { width: thumb ? 3.6 : 2.2 });
    g.line(curve((x) => Math.sin(x) ** 2), P.violet, { width: thumb ? 3.2 : 2 });
    // the current ε
    g.vline(G.e, P.amber, { alpha: 0.9, width: 1.4 });
    for (const v of [G.cArc, G.omega, G.triple]) if (v > 1e-3) g.dot(G.e, v, P.amber, 4.2, { glow: 6 });
    keepOut(g.pl - 40, g.pt, 40, g.ih + 20); keepOut(g.pl, g.pt + g.ih, g.iw, 20);
    if (!thumb) {
      const xe = g.X(EPS1 * DEG);
      want('lc', [xe, g.Y(Math.acos(Math.cos(EPS1 * DEG) ** 2))], L('一次弧 c<sub>ε</sub> ∝ ε', 'once arc c<sub>ε</sub> ∝ ε'), 'raw c-cy', { pri: 6, dir: [-1, -1], r: 4 });
      want('lo', [g.X(30 * DEG), g.Y(cellAt(30).omega)], L('角超 Ω ∝ ε²', 'excess Ω ∝ ε²'), 'raw c-mg', { pri: 6, dir: [1, 1], r: 6 });
      want('lv', [g.X(60 * DEG), g.Y(Math.sin(60 * DEG) ** 2)], 'sin²ε', 'raw c-vi', { pri: 5, dir: [1, 1], r: 6 });
      want('lf', [g.X(FLOOR_DEG * DEG), g.Y(2.2)], 'ε<sub>min</sub> · MODEL', 'raw small', { pri: 4, dir: [1, 0], r: 4 });
      want('le', [g.X(G.e), g.pt + 2], `ε = ${fix(G.epsDeg, 0)}°`, 'raw c-am', { pri: 7, dir: [0, 1], r: 2 });
    }
    return area;
  }

  /* ---------- the frame ---------- */
  function hudText(G) {
    const v = S.view;
    const big = {
      cell: `${L('原胞', 'Cell')} · ε = ${fix(G.epsDeg, 0)}°`,
      once: `${L('一次', 'Once')} · c<sub>ε</sub> = ${fix(G.cArc / DEG, 1)}°`,
      twice: `${L('两次', 'Twice')} · ${L(`第 ${fix(S.walk, 2)} 步`, `step ${fix(S.walk, 2)}`)}`,
      excess: `${L('角超', 'Excess')} · Ω = ${fix(G.omega / DEG, 2)}°`,
      brick: `${L('格拉姆', 'Gram')} · det G = ${fix(G.detG, 3)}`
    }[v];
    const sub = {
      cell: `<span class="c-vi">${L('体积', 'volume')} sin²ε = ${fix(G.triple, 3)}</span> · <span class="c-mg">${L('角超', 'excess')} Ω = ${fix(G.omega / DEG, 1)}°</span>`,
      once: L(`沿棱 OB 看，两面墙收成两条腿；<span class="c-cy">c<sub>ε</sub> = arccos(cos²ε)</span> &lt; √2 ε = ${fix(Math.SQRT2 * G.epsDeg, 1)}°`, `Down the ridge OB the walls become two legs; <span class="c-cy">c<sub>ε</sub> = arccos(cos²ε)</span> &lt; √2 ε = ${fix(Math.SQRT2 * G.epsDeg, 1)}°`),
      twice: L(`ε = ${fix(G.epsDeg, 0)}° · 在 B 拐 90° · <span class="c-vi">e₁e₃ 分量 ${sgn(parts(walkState(G, S.walk).R).b13, 3)}</span>`, `ε = ${fix(G.epsDeg, 0)}° · a 90° turn at B · <span class="c-vi">e₁e₃ part ${sgn(parts(walkState(G, S.walk).R).b13, 3)}</span>`),
      excess: L(`ε = ${fix(G.epsDeg, 0)}° · <span class="c-mg">α + β + γ = ${fix((G.alpha + G.beta + G.gamma) / DEG, 1)}°</span> · <span class="c-cy">${L('平直', 'flat')} 180°</span> · t = ${fix(S.loopT, 2)}`, `ε = ${fix(G.epsDeg, 0)}° · <span class="c-mg">α + β + γ = ${fix((G.alpha + G.beta + G.gamma) / DEG, 1)}°</span> · <span class="c-cy">flat 180°</span> · t = ${fix(S.loopT, 2)}`),
      brick: L(`ε = ${fix(G.epsDeg, 0)}° · 共面 det G = 0 · 正交 <span class="c-vi">sin⁴ε = ${fix(G.detG, 4)}</span>`, `ε = ${fix(G.epsDeg, 0)}° · coplanar det G = 0 · orthogonal <span class="c-vi">sin⁴ε = ${fix(G.detG, 4)}</span>`)
    }[v];
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const LEG = {
      cell: [['mg', L('球面帽；两次的两条腿 AB、BC', 'cap; the twice legs AB, BC')], ['cy', L('一次弧 AC；平直削面；虚线：沿棱的影子', 'once arc AC; flat cut; dashed: shadow down the ridge')], ['am', S.transport ? L('ε 手柄；搬运的箭头', 'ε handle; carried arrow') : L('ε 手柄', 'ε handle')]],
      once: [['cy', L('一次：弧 AC', 'once: arc AC')], ['mg', L('两次：两条腿与帽的影子', 'twice: the legs and the cap\'s shadow')], ['am', L('ε 手柄', 'ε handle')]],
      twice: [['mg', L('两次：A → B → C', 'twice: A → B → C')], ['vi', L('旋子分量', 'rotor parts')], ['am', S.transport ? L('当前一步与带着走的箭头', 'the current step and its arrow') : L('当前一步', 'the current step')]],
      excess: [['mg', L('球面帽与角超 Ω', 'cap and excess Ω')], ['cy', L('平直削面', 'flat cut')], ['vi', L('旋子半角 Ω/2', 'rotor half-angle Ω/2')], ['am', L('搬运的箭头', 'carried arrow')]],
      brick: [['vi', L('体积砖', 'volume brick')], ['cy', L('一次弧 <var style="font-style:normal">c<sub>ε</sub></var>', 'once arc <var style="font-style:normal">c<sub>ε</sub></var>')], ['mg', L('角超 Ω', 'excess Ω')], ['am', L('当前 ε', 'current ε')]]
    }[v];
    $('legend').innerHTML = LEG.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  function layoutHud(W) {
    const hud = $('hudTl'), chips = $('sceneChips'), shot = !!TRV.shot, narrow = W <= 600;
    if (!narrow && !shot) { const cw = chips.getBoundingClientRect().width; hud.style.maxWidth = `${Math.max(140, W - cw - 56)}px`; } else hud.style.maxWidth = '';
    stageEl.style.setProperty('--scene-top', `${hud.offsetTop + hud.offsetHeight + 6}px`);
  }
  function drawStage() {
    const G = cellAt(S.eps);
    hudText(G);
    const W = stageEl.clientWidth, H = stageEl.clientHeight;
    layoutHud(W);
    ctx = st.begin();
    LB = []; KEEP = []; INS = []; INSBOX = null;
    const huds = TRV.thumbMode ? [] : hudBoxes();
    OBST = huds.slice(); BOUNDS = { x: 4, y: 4, w: W - 8, h: H - 8 };
    stageEl.classList.toggle('flat2d', S.view === 'brick');
    if (S.view === 'brick') drawBrick(G, W, H, huds); else drawCell3D(G, W, H, huds);
    if (!TRV.thumbMode) { placeInsetLabels(); placeLabels(); }
    st.end();
    return G;
  }

  /* ---------- strip ---------- */
  function drawPlot(G) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    let meta = '';
    if (RAIL[S.view] === 'eps') {
      $('plotTitle').innerHTML = `<span class="zh">一阶与二阶：除以最低阶之后</span><span class="en">First and second order, divided by the lowest term</span>`;
      const g = kit.plot(cv, { x: [EPS0, EPS1], y: [0.65, 1.35], pad: [40, 10, 8, 22] });
      g.axes({ xTicks: [5, 30, 60, 90].map((d) => [d, `${d}°`]), yTicks: [[0.7, '0.7'], [1, '1'], [1.3, '1.3']] });
      g.hline(1, P.dim, { alpha: 0.7, dash: [4, 3] });
      const xs = Array.from({ length: 120 }, (_, i) => EPS0 + (EPS1 - EPS0) * i / 119);
      g.line(xs.map((d) => [d, Math.acos(Math.cos(d * DEG) ** 2) / (Math.SQRT2 * d * DEG)]), P.cyan, { width: 2 });
      g.line(xs.map((d) => [d, cellAt(d).omega / ((d * DEG) ** 2 / 2)]), P.magenta, { width: 2 });
      g.vline(G.epsDeg, P.amber, { alpha: 0.85 });
      g.dot(G.epsDeg, G.cArc / (Math.SQRT2 * G.e), P.amber, 3.6); g.dot(G.epsDeg, G.omega / (G.e ** 2 / 2), P.amber, 3.6);
      meta = `<span class="c-cy">c/√2ε = ${fix(G.cArc / (Math.SQRT2 * G.e), 3)}</span> · <span class="c-mg">Ω/(ε²/2) = ${fix(G.omega / (G.e ** 2 / 2), 3)}</span>`;
    } else if (RAIL[S.view] === 'walk') {
      $('plotTitle').innerHTML = `<span class="zh">沿两步：旋子的四个分量</span><span class="en">Along the two steps: the four parts of the rotor</span>`;
      const g = kit.plot(cv, { x: [0, 2], y: [-0.75, 1.05], pad: [40, 10, 8, 22] });
      g.axes({ xTicks: [[0, 'A'], [1, 'B'], [2, 'C']], yTicks: [[-0.5, '−0.5'], [0, '0'], [0.5, '0.5'], [1, '1']], xGrid: true });
      const xs = Array.from({ length: 121 }, (_, i) => 2 * i / 120), ps = xs.map((s) => parts(walkState(G, s).R));
      g.line(xs.map((s, i) => [s, ps[i].s]), P.violet, { width: 2 });
      g.line(xs.map((s, i) => [s, ps[i].b12]), P.violet, { width: 1.4, dash: [5, 3] });
      g.line(xs.map((s, i) => [s, ps[i].b23]), P.violet, { width: 1.4, dash: [1.5, 3] });
      g.line(xs.map((s, i) => [s, ps[i].b13]), P.magenta, { width: 2.2 });
      g.vline(S.walk, P.amber, { alpha: 0.85 });
      const p = parts(walkState(G, S.walk).R);
      meta = `1 ${fix(p.s, 3)} · e₁e₂ ${fix(p.b12, 3)} · e₂e₃ ${fix(p.b23, 3)} · <span class="c-mg">e₁e₃ ${fix(p.b13, 3)}</span>`;
    } else {
      $('plotTitle').innerHTML = `<span class="zh">沿回路：路线一共拐了多少</span><span class="en">Along the loop: how much the path has turned</span>`;
      const g = kit.plot(cv, { x: [0, 1], y: [0, 400], pad: [40, 10, 8, 22] });
      g.axes({ xTicks: [[0, 'A'], [G.e / (2 * G.e + G.cArc), 'B'], [2 * G.e / (2 * G.e + G.cArc), 'C'], [1, 'A']], yTicks: [[0, '0°'], [180, '180°'], [360, '360°']], xGrid: true });
      g.hline(360, P.dim, { alpha: 0.8, dash: [4, 3] });
      const xs = Array.from({ length: 401 }, (_, i) => i / 400);
      g.line(xs.map((t) => [t, turningAt(G, t) / DEG]), P.ink, { width: 1.8 });
      const end = turningAt(G, 1) / DEG;
      g.line([[1, end], [1, 360]], P.magenta, { width: 4 });
      g.vline(S.loopT, P.amber, { alpha: 0.85 });
      meta = `${L('拐角之和', 'turning')} ${fix(turningAt(G, S.loopT) / DEG, 1)}° · <span class="c-mg">360° − ${fix(end, 1)}° = Ω</span>`;
    }
    $('plotMeta').innerHTML = meta;
  }

  /* ---------- readouts ---------- */
  function row(k, dt, dd) { $('dt' + k).innerHTML = dt; $('ro' + k).innerHTML = dd; }
  function drawText(G) {
    const v = S.view, w = parts(G.W);
    const KEY = {
      cell: [L('体积砖 √det G = sin²ε', 'volume brick √det G = sin²ε'), fix(G.triple, 4), ` · det G = ${fix(G.detG, 4)}`],
      once: [L('一次：弧 AC 的长 c<sub>ε</sub> = arccos(cos²ε)', 'once: the arc AC, c<sub>ε</sub> = arccos(cos²ε)'), `${fix(G.cArc / DEG, 2)}°`, L(` · √2 ε = ${fix(Math.SQRT2 * G.epsDeg, 2)}°`, ` · √2 ε = ${fix(Math.SQRT2 * G.epsDeg, 2)}°`)],
      twice: [L('两次：U₂₃U₁₂ 的 e₁e₃ 分量 −sin²(ε/2)', 'twice: the e₁e₃ part of U₂₃U₁₂, −sin²(ε/2)'), fix(w.b13, 4), L(` · 次序对调之差 −2 sin²(ε/2) = ${fix(G.commL[5], 4)}`, ` · order swapped, the difference is ${fix(G.commL[5], 4)}`)],
      excess: [L('角超 Ω = α + β + γ − π', 'excess Ω = α + β + γ − π'), `${fix(G.omega / DEG, 3)}°`, L(` · 箭头转回 ${fix(G.holonomy / DEG, 3)}°`, ` · the arrow comes back turned ${fix(G.holonomy / DEG, 3)}°`)],
      brick: [L('三态格拉姆行列式 det G = sin⁴ε', 'three-state Gram determinant det G = sin⁴ε'), fix(G.detG, 4), L(' · 共面两步 det G = 0', ' · coplanar two-step det G = 0')]
    }[v];
    $('dtKey').innerHTML = KEY[0]; $('roKey').textContent = KEY[1]; $('roKeySub').textContent = KEY[2];
    $('roAside').textContent = `ε = ${fix(G.epsDeg, 1)}°`;
    row(1, L('一次弧 c<sub>ε</sub> / 平直 √2 ε', 'once arc c<sub>ε</sub> / flat √2 ε'), `${fix(G.cArc / DEG, 2)}° / ${fix(Math.SQRT2 * G.epsDeg, 2)}°`);
    row(2, L('球面角 α = γ · β', 'spherical angles α = γ · β'), `${fix(G.alpha / DEG, 2)}° · ${fix(G.beta / DEG, 1)}°`);
    row(3, L('平直削面在 B 的角 β<sub>flat</sub>', 'flat cut at B, β<sub>flat</sub>'), `${fix(G.betaFlat / DEG, 2)}°`);
    row(4, L('角超 Ω · 旋量相位 −Ω/2', 'excess Ω · spinor phase −Ω/2'), `${fix(G.omega / DEG, 2)}° · ${fix(-G.omega / 2, 4)}`);
    row(5, L('det G · 砖的高 B·n', 'det G · brick height B·n'), `${fix(G.detG, 4)} · ${fix(G.height, 3)}`);
    row(6, L('U₂₃U₁₂ = 标量, e₁e₂, e₂e₃, e₁e₃', 'U₂₃U₁₂ = scalar, e₁e₂, e₂e₃, e₁e₃'), `${fix(w.s, 3)}, ${fix(w.b12, 3)}, ${fix(w.b23, 3)}, ${fix(w.b13, 3)}`);
    const note = {
      cell: L('三面平墙加一块外凸的球面帽。青色的平直削面藏在品红的帽下面；ε 越小，帽越贴近削面，体积 sin²ε 与角超 Ω ~ ε²/2 都按 ε² 缩小（Ω 趋近 sin²ε 的一半），det G = sin⁴ε 则按 ε⁴ 缩小。', 'Three flat walls and an outward-bulging cap. The cyan flat cut hides under the magenta cap; as ε shrinks the cap hugs the cut, the volume sin²ε and the excess Ω ~ ε²/2 both shrink as ε² (Ω nears half of sin²ε), while det G = sin⁴ε shrinks as ε⁴.'),
      once: L('沿棱看下去，O 与 B 读成同一个点，两面墙只剩两条腿，三面角在这个方向上看不见体积；一次弧 AC 比两条长 ε 的测地腿按平直勾股算出的 √2 ε 略短。', 'Looking down the ridge, O and B read as one point and the two walls leave only two legs: in this direction the trihedron shows no volume, and the once arc AC is a little shorter than √2 ε, the flat Pythagorean value for two geodesic legs of length ε.'),
      twice: L('第一步只在 e₁∧e₂ 里转，第二步只在 e₂∧e₃ 里转；两者相乘才冒出 e₁e₃ 这一块，它在 B 处拐角之后才出现。', 'The first step turns only in e₁∧e₂ and the second only in e₂∧e₃; the e₁e₃ part appears only in their product, after the turn at B.'),
      excess: L('品红的帽三个角加起来比 180° 多出 Ω；沿 A → B → C → A 搬运的琥珀色箭头回到 A 时转过的正好是 Ω。', 'The three angles of the magenta cap add up to Ω more than 180°; the amber arrow carried round A → B → C → A comes back to A turned by exactly Ω.'),
      brick: L('共面两步的三个态困在一个平面里，格拉姆表的行列式为零；三面角的第三个方向撑出一块高为 B·n 的砖。', 'The three states of the coplanar two-step are trapped in one plane, so their Gram table has determinant zero; the trihedron\'s third direction opens a brick of height B·n.')
    }[v];
    $('roNote').textContent = note;
    $('pillEps').querySelector('strong').textContent = `${fix(G.epsDeg, 0)}°`;
    $('pillOmega').querySelector('strong').textContent = `${fix(G.omega / DEG, 1)}°`;
  }

  const paint = kit.painter(() => { const G = drawStage(); drawPlot(G); drawText(G); }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const RCFG = { eps: { max: EPS1 - EPS0, rate: 16, step: 5 }, walk: { max: 2, rate: 0.45, step: 0.25 }, loop: { max: 1, rate: 0.2, step: 1 / 12 } };
  const railValue = () => (RAIL[S.view] === 'eps' ? S.eps - EPS0 : RAIL[S.view] === 'walk' ? S.walk : S.loopT);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: EPS1 - EPS0, rate: 16, step: 5, t: 33,
    format: (t, max) => {
      const k = RAIL[S.view];
      if (k === 'eps') return `ε = ${fix(EPS0 + t, 0)}° <small>/ ${EPS1}°</small>`;
      if (k === 'walk') return L(`第 ${fix(t, 2)} 步 <small>/ 2</small>`, `step ${fix(t, 2)} <small>/ 2</small>`);
      return `t = ${fix(t, 2)} <small>/ ${fix(max, 0)}</small>`;
    },
    onChange: (t) => {
      const k = RAIL[S.view];
      if (k === 'eps') { S.eps = EPS0 + t; fEps.set(Math.round(S.eps)); } else if (k === 'walk') S.walk = t; else { S.loopT = t; fLoop.set(t.toFixed(2)); }
      paint();
    }
  });

  /* ---------- controls ---------- */
  const fEps = kit.field($('eps'), { fmt: (v) => `${v}°`, onInput: (v) => { cards.mark(null); setEps(v); } });
  const fLoop = kit.field($('loop'), { fmt: (v) => fix(v, 2), onInput: (v) => { cards.mark(null); setLoop(v); } });
  function setEps(d) {
    d = clamp(d, EPS0, EPS1);
    clock.pause();
    if (RAIL[S.view] === 'eps') clock.set(d - EPS0); else { S.eps = d; fEps.set(Math.round(d)); paint(); }
  }
  function setLoop(t) {
    t = clamp(t, 0, 1);
    clock.pause();
    if (RAIL[S.view] === 'loop') clock.set(t); else { S.loopT = t; fLoop.set(t.toFixed(2)); paint(); }
  }
  function setWalk(s) {
    s = clamp(s, 0, 2);
    clock.pause();
    if (RAIL[S.view] === 'walk') clock.set(s); else { S.walk = s; paint(); }
  }
  /** Hand the focus to the stage after a pointer click on a toggle, so that Space plays (as kit does for its chips). */
  function release(ev) { if (ev && ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); } }
  function setFlat(b) { S.flat = !!b; $('flatBtn').setAttribute('aria-pressed', String(S.flat)); paint(); }
  function setTransport(b) { S.transport = !!b; $('transBtn').setAttribute('aria-pressed', String(S.transport)); paint(); }
  $('flatBtn').addEventListener('click', (ev) => { cards.mark(null); setFlat(!S.flat); release(ev); });
  $('transBtn').addEventListener('click', (ev) => { cards.mark(null); setTransport(!S.transport); release(ev); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ f: () => { cards.mark(null); setFlat(!S.flat); } });

  function setView(v, instant) {
    clock.pause();   // before the scene changes: pausing reports the clock's t to the rail of the scene it belongs to
    S.view = v; sceneChips.set(v, true);
    const k = RAIL[v], c = RCFG[k];
    clock.rate = c.rate; clock.step = c.step; clock.setMax(c.max, true); clock.set(railValue(), true);
    if (v !== 'brick') {
      const cam = VIEW[v].cam;
      if (instant || TRV.still) { blend = null; st.view([cam[0], cam[1], 1], 0); } else { startBlend(650); st.view([cam[0], cam[1], 1], 650); }
    }
    paint();
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { cards.mark(null); setView(v); });

  /* pointer: the amber handle (C) sets ε in the 3D scenes; in the Gram scene a drag on the plot sets ε */
  function pickAt(ev) {
    if (S.view === 'brick') { drag = 'plot'; dragTo(ev); return true; }
    if (S.view === 'twice' || TRV.still) return false;
    const b = $('cv').getBoundingClientRect(), q = pj(cellAt(S.eps).C);
    if (Math.hypot(ev.clientX - b.left - q[0], ev.clientY - b.top - q[1]) < 24) { drag = 'handle'; return true; }
    return false;
  }
  function dragTo(ev) {
    const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top;
    if (drag === 'plot') {
      if (!plotG || x < plotG.pl || x > plotG.pl + plotG.iw) return;
      cards.mark(null); setEps(Math.round(clamp(plotG.invX(x) / DEG, EPS0, EPS1)));
      return;
    }
    if (drag !== 'handle') return;
    let best = S.eps, bd = Infinity;
    for (let d = EPS0; d <= EPS1 + 1e-9; d += 0.5) { const e = d * DEG, q = pj([0, Math.cos(e), Math.sin(e)]), dd = Math.hypot(q[0] - x, q[1] - y); if (dd < bd) { bd = dd; best = d; } }
    cards.mark(null); setEps(Math.round(best));
  }

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    cell: { eps: 38, view: 'cell', flat: true, transport: true, loopT: 1 },
    'once-ridge': { eps: 35, view: 'once', flat: false, transport: false },
    'twice-walls': { eps: 35, view: 'twice', flat: false, transport: true, play: true, still: 2 },
    'cap-excess': { eps: 48, view: 'excess', flat: true, transport: true, play: true, still: 1 },
    'gram-brick': { eps: 24, view: 'brick', flat: true, transport: false },
    'octant-limit': { eps: 90, view: 'cell', flat: true, transport: true, loopT: 1 }
  };
  const NOTES = {
    cell: ['ε = 38°：两面灰色的墙在棱 OB 处垂直相交，品红的球面帽盖在青色的平直削面上，鼓出的一层就是角超；青色虚线是它沿棱的影子。', 'ε = 38°: two grey walls meet at right angles along the ridge OB, the magenta cap sits over the cyan flat cut, and the layer that bulges out is the excess; the dashed cyan outline is its shadow down the ridge.'],
    'once-ridge': ['ε = 35°，沿棱 OB 看下去：两面墙收成两条品红的腿，夹角 90°；青色的弧 AC 是斜边，长 47.9°，比 √2 ε = 49.5° 短。', 'ε = 35°, looking down the ridge OB: the walls collapse to two magenta legs at 90°; the cyan arc AC is the hypotenuse, 47.9° long, shorter than √2 ε = 49.5°.'],
    'twice-walls': ['ε = 35°：琥珀色的点先沿地面那面墙走到 B，拐 90° 再沿竖墙走到 C；右边紫色的条是走到这里的旋子，e₁e₃ 一条在拐角之后才长出来，停在 −0.090。', 'ε = 35°: the amber point walks along the floor wall to B, turns 90° and walks up the side wall to C; the violet bars are the rotor so far, and the e₁e₃ bar grows only after the turn, ending at −0.090.'],
    'cap-excess': ['ε = 48°：品红的帽三个角是 56.2°、90°、56.2°，青色平面三角形的角加起来是 180°；琥珀色箭头绕 A → B → C → A 一圈，回来转过 Ω = 22.4°。', 'ε = 48°: the magenta cap has angles 56.2°, 90° and 56.2°, while the cyan flat triangle’s add to 180°; the amber arrow carried round A → B → C → A comes back turned by Ω = 22.4°.'],
    'gram-brick': ['ε = 24°：左边共面两步的格拉姆表行列式为 0，平行六面体压成一张纸；正交三面角的 det G = sin⁴ε = 0.027，撑出紫色的砖。右边对数图：一次弧随 ε 一阶变，角超随 ε 二阶变。', 'ε = 24°: on the left the coplanar two-step has a Gram determinant of 0 and its parallelepiped is a flat sheet; the trihedron has det G = sin⁴ε = 0.027 and opens a violet brick. On the right, log–log: the once arc goes as ε, the excess as ε².'],
    'octant-limit': ['ε = 90°：A、B、C 成了三根坐标轴，原胞长成整个八分球；帽的三个角都是 90°，角超 Ω = 90°，det G = 1，绕一圈的箭头转过 90°。', 'ε = 90°: A, B and C are the three axes and the cell has grown into the whole octant; the cap has three 90° angles, the excess is Ω = 90°, det G = 1, and the carried arrow comes back turned by 90°.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    S.eps = p.eps; fEps.set(p.eps);
    S.loopT = p.loopT == null ? 1 : p.loopT; fLoop.set(S.loopT.toFixed(2));
    S.walk = 2;
    setFlat(p.flat); setTransport(p.transport);
    if (p.play) { if (RAIL[p.view] === 'walk') S.walk = 0; else S.loopT = 0; }
    setView(p.view, booting);
    // a still (cover, cited figure shot) and the opening of the full page show the card's telling frame;
    // inside a chapter a playing card starts once the reader has scrolled it into view; a click plays at once
    if (p.play) {
      if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
      else if (booting) kit.autoplay(clock, stageEl);
      else clock.play();
    }
    paint();
  }
  // A cited figure has a fixed frame: one complete sentence per card there; the full laboratory keeps the notes above.
  const FIGURE_NOTES = {
    cell: ['ε = 38°：两面墙沿棱 OB 垂直相交；品红的球面帽比青色的平直削面鼓出一层，就是角超 Ω ≈ 13.5°（小 ε 时约 ε²/2）。', 'ε = 38°: two walls meet at right angles along OB; the magenta cap bulges over the cyan flat cut by the excess Ω ≈ 13.5° (≈ ε²/2 for small ε).'],
    'once-ridge': ['ε = 35°，沿棱 OB 看：两条弧长 ε 的腿投成正交的 sin ε；青色弧 AC = arccos(cos²ε) = 47.9° < √2 ε = 49.5°。', 'ε = 35°, down OB: two geodesic legs ε project to sin ε at 90°; cyan arc AC = arccos(cos²ε) = 47.9° < √2 ε = 49.5°.'],
    'twice-walls': ['ε = 35°：琥珀色的点沿墙走 A → B → C，在 B 拐 90°；紫色旋子的 e₁e₃ 分量拐弯后才长出，停在 −sin²(ε/2) ≈ −0.090。', 'ε = 35°: the amber point walks A → B → C, turning 90° at B; the violet e₁e₃ rotor part appears only after the turn and ends at −sin²(ε/2) ≈ −0.090.'],
    'cap-excess': ['ε = 48°：品红帽的角 56.2°、90°、56.2° 合计 202.4°，比平面多出 Ω = 22.4°；琥珀色箭头绕 A → B → C → A 转回 Ω。', 'ε = 48°: the magenta cap has angles 56.2°, 90°, 56.2° (sum 202.4°), Ω = 22.4° over 180°; the amber arrow carried round A → B → C → A turns by Ω.'],
    'gram-brick': ['ε = 24°：共面两步 det G = 0；三面角 det G = sin⁴ε ≈ 0.027，撑出紫色体积砖 sin²ε，与 Ω ≈ ε²/2 同为 O(ε²)，一次弧只 ∝ ε。', 'ε = 24°: coplanar steps have det G = 0; the trihedron has det G = sin⁴ε ≈ 0.027, a violet brick sin²ε, O(ε²) like Ω ≈ ε²/2; the once arc ∝ ε.'],
    'octant-limit': ['ε = 90°：A、B、C 成了三根坐标轴，原胞长成整个八分球；帽的三个角都是 90°，Ω = 90°，det G = 1，箭头绕一圈转过 90°。', 'ε = 90°: A, B, C are the three axes and the cell fills the octant; all three cap angles are 90°, Ω = 90°, det G = 1, and the arrow turns by 90°.']
  };
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖动琥珀色的手柄改步长 ε，换场景、拖时间轴、打开或关上平直削面与平行移动。随时可以再选一张卡。', 'Free play: drag the amber handle to change the step ε, switch scenes, scrub the rail, turn the flat cut and the transport on or off. Pick a card again at any time.'] });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const screenOf = (v) => { const q = pj(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1], q[2]]; };
  window.SPHERICAL_TRIHEDRON_DEBUG = {
    getState() {
      const G = cellAt(S.eps), Ls = loopState(G, S.loopT), Ws = walkState(G, S.walk);
      return Object.assign({
        view: S.view, preset: cards.current, eps: S.eps, flat: S.flat, transport: S.transport, loopT: S.loopT, walk: S.walk,
        t: clock.t, max: clock.max, playing: clock.playing, cam: Object.assign({}, st.cam),
        A: G.A, B: G.B, C: G.C, Acop: G.Acop, Ccop: G.Ccop, gram: G.G, gramCoplanar: G.Gc,
        loop: { p: Ls.p, v: Ls.v, leg: Ls.leg, V0: G.V0, V1: G.V1 }, walkState: { p: Ws.p, v: Ws.v, rotor: parts(Ws.R) },
        turning: turningAt(G, S.loopT),
        roles: { cap: 'magenta', excess: 'magenta', twicePath: 'magenta', onceArc: 'cyan', flatCut: 'cyan', shadow: 'cyan', brick: 'violet', rotor: 'violet', spinor: 'violet', handle: 'amber', cursor: 'amber', probe: 'amber' }
      }, invariants(G));
    },
    invariants: (d) => invariants(cellAt(d == null ? S.eps : d)),
    setEpsilonDeg: (d) => { cards.mark(null); setEps(d); },
    setView: (v) => { cards.mark(null); setView(v); },
    toggleFlatCut: (b) => { cards.mark(null); setFlat(b == null ? !S.flat : b); },
    toggleTransport: (b) => { cards.mark(null); setTransport(b == null ? !S.transport : b); },
    setLoopT: (t) => { cards.mark(null); setLoop(t); },
    setWalk: (s) => { cards.mark(null); setWalk(s); },
    /** Viewport coordinates of a world point under the current projection, and its depth. */
    screen: screenOf,
    /** The world point the 3D scenes draw for a vertex name. */
    point: (name) => { const G = cellAt(S.eps); return { O, A: G.A, B: G.B, C: G.C }[name]; },
    /** The plot of the Gram scene: its inner box in viewport pixels and ε ↔ x. */
    plotBox: () => { if (!plotG || S.view !== 'brick') return null; const b = $('cv').getBoundingClientRect(); return { left: b.left + plotG.pl, top: b.top + plotG.pt, width: plotG.iw, height: plotG.ih, xOf: (d) => b.left + plotG.X(d * DEG) }; },
    /** The stage pixel (RGBA, 0–255) under a viewport point. */
    pixel: (x, y) => { const cv = $('cv'), b = cv.getBoundingClientRect(), k = cv.width / b.width; return Array.from(cv.getContext('2d').getImageData(Math.round((x - b.left) * k), Math.round((y - b.top) * k), 1, 1).data); },
    palette: () => ({ magenta: P.magenta, amber: P.amber, cyan: P.cyan, violet: P.violet, ok: P.ok }),
    loopAt: (t) => { const G = cellAt(S.eps), s = loopState(G, t); return { p: s.p, v: s.v, leg: s.leg }; },
    walkAt: (s) => { const G = cellAt(S.eps), w = walkState(G, s); return { p: w.p, v: w.v, rotor: parts(w.R) }; }
  };
  window.TRV_THUMB = () => { cards.pick('cell'); setTransport(false); clock.pause(); setView('cell', true); clock.set(45 - EPS0); paint.now(); };
  cards.pick(cards.initial('cell'));
  booting = false;
  paint();
})();
