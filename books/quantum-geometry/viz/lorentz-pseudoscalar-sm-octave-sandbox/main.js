/* LORENTZ//OCTAVE · 洛伦兹伪标量与标准模型八度 · The Lorentz pseudoscalar and the Standard-Model octave
   The stage (kit.solid: x right … z up) is one corner O of a cube, seen from outside. Three edges leave O along
   e₁ = −ŷ, e₂ = −x̂, e₃ = −ẑ (a right-handed frame); the elements through O are the point (Λ⁰), the three edges (Λ¹),
   the three faces (Λ²) and the cube (Λ³): 1·3·3·1. Grade 4 seals the cube into a proton sphere (radius r_p, in fm)
   beside a neutron, with a pion between them.
   The drift dial lies in the horizontal plane through the anchor (O, or the proton centre at grade 4): the magenta
   arrow is dx = β c dt along ê, the dial's rim is β = 1. At grade 0 the budget dome of radius c dt stands over the dial;
   right above the tip of the drift its height is c dτ = c dt·√(1 − β²).
   The rail is coordinate time c t; every phase inside advances with proper time c τ = c t·√(1 − β²).
   Read-only probe: window.LORENTZ_OCTAVE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, O = [0, 0, 0];

  /* ---------- constants: physics (literature values) and the drawing ---------- */
  const HBARC = 197.3269804, M_PION = 139.57039;   // MeV·fm, MeV (charged pion)
  const LAMBDA_PI = HBARC / M_PION;                 // ħ/(m_π c) = 1.41382 fm
  const R_P = 0.8409;                               // proton charge radius, fm (muonic hydrogen)
  const A = 0.92;                                   // cube edge (model units; the cube fits inside the proton sphere)
  const EDGE = 1.15;                                // the edge arrows reach 1.15 A
  const RB = 1.25;                                  // the dial radius: one step c dt of the budget
  const D_PN = 2.2;                                 // proton–neutron distance, fm (the one-pion-exchange range)
  const YAW0 = -2.25, PITCH0 = 0.5;                 // the default view looks at the corner O from outside
  const T_MAX = 4;                                  // the rail: c t from 0 to 4 (θ = π·c τ)
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³' };

  const axesOf = (yaw, pitch) => {
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const CAM0 = axesOf(YAW0, PITCH0);
  const EHAT = v3.scale(CAM0.R, -1);                // the drift: horizontal, straight to the left of the default view
  const PSI_D = Math.atan2(EHAT[1], EHAT[0]);
  const F1 = [0, -1, 0], F2 = [-1, 0, 0], F3 = [0, 0, -1];
  const CUBE_C = v3.scale(v3.add(v3.add(F1, F2), F3), A / 2);
  const smooth = (x) => { x = clamp(x, 0, 1); return x * x * (3 - 2 * x); };
  const lerp = (a, b, s) => a + (b - a) * s;
  const lerp3 = (a, b, s) => [lerp(a[0], b[0], s), lerp(a[1], b[1], s), lerp(a[2], b[2], s)];
  const yukawaFlux = (r, lam) => (1 + r / lam) * Math.exp(-r / lam);

  /* ---------- 2 × 2 complex matrices: I₃, the Baylis paravector and the multivector I₃ + βê ---------- */
  const cx = (re, im = 0) => [re, im];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const mmul = (X, Y) => X.map((row) => Y[0].map((_, j) => row.reduce((s, x, k) => cadd(s, cmul(x, Y[k][j])), cx(0))));
  const madd = (X, Y) => X.map((row, i) => row.map((x, j) => cadd(x, Y[i][j])));
  const mscale = (X, z) => X.map((row) => row.map((x) => cmul(x, z)));
  const mdiff = (X, Y) => Math.max(...X.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - Y[i][j][0], x[1] - Y[i][j][1]))));
  const ID2 = [[cx(1), cx(0)], [cx(0), cx(1)]];
  const SX = [[cx(0), cx(1)], [cx(1), cx(0)]], SZ = [[cx(1), cx(0)], [cx(0), cx(-1)]];
  const SY = mscale(mmul(SX, SZ), cx(0, 1));        // Y = iXZ
  /** B(a) = a₀X + a₁Y + a₂Z in the closed form of B_formula_core. */
  const Bmat = (a) => [[cx(a[2]), cx(a[0], -a[1])], [cx(a[0], a[1]), cx(-a[2])]];
  const I3 = mmul(mmul(SX, SY), SZ), I3SQ = mmul(I3, I3);
  const det2 = (M) => { const p = cmul(M[0][0], M[1][1]), q = cmul(M[0][1], M[1][0]); return [p[0] - q[0], p[1] - q[1]]; };
  function lorentz(beta) {
    const b = clamp(beta, 0, 1), dir = EHAT, a = v3.scale(dir, b);
    const Bv = Bmat(a), p = madd(ID2, Bv), pbar = madd(ID2, mscale(Bv, cx(-1))), ppbar = mmul(p, pbar);
    const M = madd(mscale(ID2, cx(0, 1)), mscale(Bmat(dir), cx(b))), M2 = mmul(M, M);
    const viaPauli = madd(madd(mscale(SX, cx(a[0])), mscale(SY, cx(a[1]))), mscale(SZ, cx(a[2])));
    const clampedBeta = Math.min(b, 0.999999), eta = Math.atanh(clampedBeta);
    return {
      beta: b, spatialShare: b * b, properTimeRatio: Math.sqrt(Math.max(0, 1 - b * b)),
      baylisDet: det2(p)[0], baylisProductDiag: [ppbar[0][0][0], ppbar[1][1][0]], baylisResidual: mdiff(ppbar, mscale(ID2, cx(1 - b * b))),
      bFormulaResidual: mdiff(Bv, viaPauli),
      multivectorScalarPart: (M2[0][0][0] + M2[1][1][0]) / 2,
      clampedBeta, rapidity: eta, gamma: Math.cosh(eta), gammaBeta: Math.sinh(eta),
      bogoliubovResidual: Math.abs(Math.cosh(eta)) ** 2 - Math.abs(Math.sinh(eta)) ** 2 - 1
    };
  }

  /* ---------- Jordan–Wigner on three modes (8 × 8 real matrices) ---------- */
  const kron = (X, Y) => { const n = X.length, m = Y.length, out = []; for (let i = 0; i < n * m; i++) { out.push([]); for (let j = 0; j < n * m; j++) out[i].push(X[Math.floor(i / m)][Math.floor(j / m)] * Y[i % m][j % m]); } return out; };
  const rmul = (X, Y) => X.map((row) => Y[0].map((_, j) => row.reduce((s, x, k) => s + x * Y[k][j], 0)));
  const radd = (X, Y) => X.map((row, i) => row.map((x, j) => x + Y[i][j]));
  const tr = (X) => X[0].map((_, j) => X.map((row) => row[j]));
  const rmax = (X) => Math.max(...X.flat().map(Math.abs));
  const jw = (() => {
    const Zl = [[1, 0], [0, -1]], Al = [[0, 1], [0, 0]], Il = [[1, 0], [0, 1]], N = 3;
    const c = Array.from({ length: N }, (_, j) => Array.from({ length: N }, (_, i) => (i < j ? Zl : i === j ? Al : Il)).reduce((M, w) => kron(M, w)));
    const I8 = Array.from({ length: 8 }, (_, i) => Array.from({ length: 8 }, (_, j) => (i === j ? 1 : 0)));
    let car = 0, anti = 0;
    for (let i = 0; i < N; i++) {
      car = Math.max(car, rmax(radd(radd(rmul(c[i], tr(c[i])), rmul(tr(c[i]), c[i])), I8.map((r) => r.map((x) => -x)))));
      for (let j = i + 1; j < N; j++) anti = Math.max(anti, rmax(radd(rmul(c[i], c[j]), rmul(c[j], c[i]))));
    }
    const d = c.map(tr);   // creation operators
    const swap = rmax(radd(rmul(rmul(d[0], d[1]), d[2]), rmul(rmul(d[1], d[0]), d[2])));
    return { CARResidual: car, anticommResidual: anti, creationSwapResidual: swap };
  })();

  /* ---------- gauge phases on the color triangle; two-axis word; pinching; Poisson ---------- */
  const rand = TRV.mulberry32 ? TRV.mulberry32(34014) : Math.random;
  const EDGE_PHASE = [0, 1, 2].map(() => TAU * rand()), GAUGE = [0, 1, 2].map(() => TAU * rand());
  function gaugeCheck(shift) {
    // vertices r = 0, g = 1, b = 2; edges r→g, g→b, b→r; tree {r→g, g→b}, root r
    const S_ = [0, 1, 2], T_ = [1, 2, 0], u = EDGE_PHASE.map((p, k) => p + shift * (k + 1));
    const root = (w) => { const phi = [0, 0, 0]; phi[1] = w[0] + phi[0]; phi[2] = w[1] + phi[1]; return phi; };
    const ug = u.map((p, e) => GAUGE[T_[e]] + p - GAUGE[S_[e]]);
    const a = root(u), b = root(ug);
    const ex = (x) => [Math.cos(x), Math.sin(x)], gap = (x, y) => Math.hypot(ex(x)[0] - ex(y)[0], ex(x)[1] - ex(y)[1]);
    let cov = 0; for (let v = 0; v < 3; v++) cov = Math.max(cov, gap(b[v], GAUGE[v] + a[v] - GAUGE[0]));
    const hol = u[0] + u[1] + u[2], holG = ug[0] + ug[1] + ug[2];
    return { covarianceResidual: cov, holonomy: ((hol % TAU) + TAU) % TAU, holonomyGaugeResidual: gap(hol, holG), loops: 3 + 1 - 3, coordinates: 3 + 1 - 3 };
  }
  const rot = (axis, t) => {
    const c = Math.cos(t), s = Math.sin(t);
    return axis === 0 ? [[1, 0, 0], [0, c, -s], [0, s, c]] : axis === 1 ? [[c, 0, s], [0, 1, 0], [-s, 0, c]] : [[c, -s, 0], [s, c, 0], [0, 0, 1]];
  };
  const twoAxisResidual = (phi) => rmax(radd(rmul(rmul(rot(0, PI / 2), rot(1, phi)), rot(0, -PI / 2)), rot(2, phi).map((r) => r.map((x) => -x))));
  function pinchingResidual(theta) {
    // ψ = (1, e^{iθ}, e^{2iθ})/√3, ρ = ψψ†; the color projections P_k = e_k e_kᵀ; unread(ρ) = Σ P_k ρ P_k
    const psi = [0, 1, 2].map((k) => [Math.cos(k * theta) / Math.sqrt(3), Math.sin(k * theta) / Math.sqrt(3)]);
    const rho = psi.map((a) => psi.map((b) => cmul(a, [b[0], -b[1]])));
    const unread = (M) => M.map((row, i) => row.map((x, j) => (i === j ? x : cx(0))));
    const once = unread(rho), twice = unread(once);
    return { residual: mdiff(twice, once), traceOnce: once[0][0][0] + once[1][1][0] + once[2][2][0] };
  }
  function poisson(lam) {
    const m = 12, H = [0, 4, 8], Hperp = [0, 3, 6, 9], step = 0.5;
    const f = Array.from({ length: m }, (_, x) => yukawaFlux(Math.min(x, m - x) * step, lam));
    const lhs = H.reduce((s, h) => s + f[h], 0);
    let re = 0, im = 0;
    for (const k of Hperp) for (let x = 0; x < m; x++) { const ang = -TAU * x * k / m; re += f[x] * Math.cos(ang); im += f[x] * Math.sin(ang); }
    re *= H.length / m; im *= H.length / m;
    return Math.hypot(lhs - re, im);
  }
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const gramDet = (X) => det3(X.map((u) => X.map((w) => v3.dot(u, w))));

  /* ---------- state ---------- */
  const S = { beta: 0.35, stage: 3, stageTarget: 3, lambda: LAMBDA_PI, alpha: PI / 2, view: 'minus', plot: 'budget', t: 0, dragging: false };
  const weights = (s) => ({ line: smooth(s), face: smooth(s - 1), vol: smooth(s - 2), seal: smooth(s - 3), dome: 1 - smooth(s) });
  const bDir = () => v3.add(v3.scale(F2, Math.cos(S.alpha)), v3.scale(F3, Math.sin(S.alpha)));
  const properTime = () => S.t * Math.sqrt(Math.max(0, 1 - S.beta * S.beta));
  const gradeOf = (s) => Math.round(clamp(s, 0, 4));
  const GRADE_DIMS = [1, 3, 3, 1, 1];

  function model() {
    const lo = lorentz(S.beta), w = weights(S.stage), tau = properTime(), theta = PI * tau;
    const colors = [F1, F2, bDir()];
    const g = gradeOf(S.stage);
    return {
      ...lo, w, tau, theta, grade: g,
      I3Diag: [I3[0][0], I3[1][1]], I3SquaredDiag: [I3SQ[0][0][0], I3SQ[1][1][0]], I3SquaredError: mdiff(I3SQ, mscale(ID2, cx(-1))),
      colorDet: gramDet(colors), colorDetCases: { threeOrthogonal: gramDet([F1, F2, F3]), twoColorDuplicate: gramDet([F1, F2, F2]), oneColor: gramDet([F1, F1, F1]) },
      yukawaAtRp: yukawaFlux(R_P, S.lambda), yukawaAtRpPhysical: yukawaFlux(R_P, LAMBDA_PI),
      gauge: gaugeCheck(theta), twoAxis: twoAxisResidual(theta), pinching: pinchingResidual(theta),
      poissonMaxDiff: Math.max(poisson(S.lambda), poisson(LAMBDA_PI))
    };
  }

  /* ---------- the stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const measure = document.createElement('div'); measure.hidden = true; measure.style.position = 'absolute'; tagBox.appendChild(measure);
  const options = { canvas: $('cv'), yaw: YAW0, pitch: PITCH0, wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  /* HUD boxes and the rectangle between the title band and the legend */
  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  /** The title block, the grade buttons and the legend entries (their own boxes: the legend element spans the width). */
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    const tl = boxOf($('hudTl'), sr), tr = boxOf($('gradeChips'), sr);
    if (tl && $('hudTl').textContent.trim()) out.push({ ...tl, kind: 'tl' });
    if (tr) out.push({ ...tr, kind: 'tr' });
    const items = [...$('legend').children].map((el) => boxOf(el, sr)).filter(Boolean);
    if (items.length) {
      const x0 = Math.min(...items.map((b) => b.x)), y0 = Math.min(...items.map((b) => b.y)), x1 = Math.max(...items.map((b) => b.x + b.w)), y1 = Math.max(...items.map((b) => b.y + b.h));
      out.push({ x: x0, y: y0, w: x1 - x0, h: y1 - y0, kind: 'bl' });
    }
    return out;
  }
  function hudElementBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('gradeChips'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  /** Rectangles free of the HUD: the band between the title row and the legend, and on a wide stage the column between
      the title and the buttons, or beside the legend. drawStage keeps the one that holds the scene largest. */
  function safeRects(W, H, huds) {
    const m = 8, out = [];
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + m); else bottom = Math.min(bottom, b.y - m); }
    const sx = W < 520 ? 8 : 12;
    out.push({ x: sx, y: top, w: Math.max(40, W - 2 * sx), h: Math.max(60, bottom - top) });
    const tl = huds.find((b) => b.kind === 'tl'), tr = huds.find((b) => b.kind === 'tr'), bl = huds.find((b) => b.kind === 'bl');
    if (tl && tr && tl.y < tr.y + tr.h) {
      const x0 = tl.x + tl.w + m, x1 = tr.x - m;
      const y1 = bl && bl.x < x1 && bl.x + bl.w > x0 ? bl.y - m : H - 10;
      if (x1 - x0 > 140) out.push({ x: x0, y: 10, w: x1 - x0, h: y1 - 10 });
    }
    if (bl) {
      const y0 = huds.filter((b) => b.kind !== 'bl' && b.x + b.w > bl.x + bl.w + m).reduce((y, b) => Math.max(y, b.y + b.h + m), 10), x0 = bl.x + bl.w + m;
      if (W - 12 - x0 > 160) out.push({ x: x0, y: y0, w: W - 12 - x0, h: H - 10 - y0 });
    }
    return out.filter((r) => r.w > 40 && r.h > 60);
  }

  /* labels: placed after the frame by priority, clear of each other, of the HUD and of the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}|${stageEl.clientWidth < 600}`;
    let s = sizes.get(k);
    if (!s) { measure.className = 'tag ' + cls; measure.innerHTML = html; measure.hidden = false; s = [measure.offsetWidth, measure.offsetHeight]; measure.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, p, html, cls, pri, dir, r = 10) => LB.push({ key, q: sc.p(p), html, cls, pri, dir: dir || [0, -1], r });
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 22, l.r + 36]) for (const da of [0, 0.45, -0.45, 0.9, -0.9, 1.4, -1.4, 2.0, -2.0, 2.6, -2.6, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 4)) || OBST.some((p) => meets(p, b, 3))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(ok);
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed.map((b) => ({ x: b.x, y: b.y, w: b.w, h: b.h }));
  }

  /* the frame: what is drawn depends on the grade weights; every opaque body is a fit point */
  const neutronAt = (phi) => v3.add(CUBE_C, v3.scale(v3.add(v3.scale(CAM0.R, Math.cos(phi)), v3.scale(CAM0.U, Math.sin(phi))), D_PN));
  const NEUTRON_PHI = [0, -20, -40, -60].map((d) => d * DEG);
  const FLUX_ANGLES = [40, 85, 130, 230, 275, 320].map((d) => d * DEG), FLUX_LEN = 0.5;
  function fluxDirs(nd) {
    const nAng = Math.atan2(v3.dot(nd, CAM0.U), v3.dot(nd, CAM0.R));
    return FLUX_ANGLES.filter((a) => Math.abs(Math.atan2(Math.sin(a - nAng), Math.cos(a - nAng))) > 32 * DEG && Math.abs(Math.atan2(Math.sin(a - PI), Math.cos(a - PI))) > 32 * DEG)
      .map((a) => v3.unit(v3.add(v3.add(v3.scale(CAM0.R, Math.cos(a)), v3.scale(CAM0.U, Math.sin(a))), v3.scale(CAM0.D, -0.25))));
  }
  function sceneOf(M, phi) {
    const w = M.w, anchor = lerp3(O, CUBE_C, w.seal), nPos = neutronAt(phi), b = bDir();
    const ptR = 0.075 + 0.095 * w.dome;
    const rMin = w.seal > 0.5 ? R_P * w.seal + 0.05 : ptR + 0.05;   // the handle stays outside the body it drifts with
    const tipLen = M.beta * RB, tip = v3.add(anchor, v3.scale(EHAT, tipLen)), handleAt = v3.add(anchor, v3.scale(EHAT, Math.max(tipLen, rMin)));
    const fit = [];
    const arcPt = (d) => v3.add(anchor, v3.scale([Math.cos(PSI_D + d), Math.sin(PSI_D + d), 0], RB));
    for (const d of [-35, -17, 0, 17, 35]) fit.push(arcPt(d * DEG));
    fit.push(anchor, handleAt);
    if (w.line > 0.02) for (const f of [F1, F2, b]) fit.push(v3.scale(f, A * EDGE * w.line));
    if (w.face > 0.02 || w.vol > 0.02) for (let i = 0; i < 8; i++) fit.push(v3.scale(v3.add(v3.add(v3.scale(F1, i & 1), v3.scale(F2, (i >> 1) & 1)), v3.scale(b, (i >> 2) & 1)), A * Math.max(w.face, w.vol)));
    if (w.vol > 0.5 && w.seal < 0.5) fit.push(v3.scale(F3, -A * 1.04));   // headroom over O: the reversed arrow −e₃ of the first card
    if (w.dome > 0.02) for (let i = 0; i <= 6; i++) for (let j = 0; j < 12; j++) { const th = (PI / 2) * i / 6, ph = TAU * j / 12; fit.push(v3.add(anchor, v3.scale([Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)], RB * w.dome))); }
    if (w.seal > 0.02) {
      const cam = axesOf(sc.cam.yaw, sc.cam.pitch);
      for (const [c, r] of [[CUBE_C, R_P * w.seal], [nPos, R_P * w.seal]]) for (const u of [cam.R, cam.U]) fit.push(v3.add(c, v3.scale(u, r)), v3.sub(c, v3.scale(u, r)));
      for (let j = 0; j < 16; j++) fit.push(v3.add(CUBE_C, v3.scale([Math.cos(TAU * j / 16), Math.sin(TAU * j / 16), 0], Math.min(S.lambda, 2.2) * w.seal)));
      for (const d of fluxDirs(v3.unit(v3.sub(nPos, CUBE_C)))) fit.push(v3.add(CUBE_C, v3.scale(d, (R_P + FLUX_LEN) * w.seal)));
    }
    return { anchor, nPos, b, ptR, tip, tipLen, handleAt, fit, phi };
  }
  /** The largest scale at which the fit points of G fill `area` (current camera), and where its centre goes. */
  function fitIn(G, area) {
    const cam = axesOf(sc.cam.yaw, sc.cam.pitch);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of G.fit) { const x = v3.dot(p, cam.R), y = -v3.dot(p, cam.U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const pad = stageEl.clientWidth < 520 ? 10 : stageEl.clientWidth < 900 ? 11 : 16, unit = Math.max(20, Math.min((area.w - 2 * pad) / Math.max(0.2, x1 - x0), (area.h - 2 * pad) / Math.max(0.2, y1 - y0)));
    return { unit, cx: area.x + area.w / 2 - unit * (x0 + x1) / 2, cy: area.y + area.h / 2 - unit * (y0 + y1) / 2, area };
  }
  function applyFit(f, W, H) { options.radius = f.unit / Math.max(1, Math.min(W, H)); options.cx = f.cx / Math.max(1, W); options.cy = f.cy / Math.max(1, H); }

  let FRAME = null;
  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes(), rects = thumb ? [{ x: 16, y: 16, w: W - 32, h: H - 32 }] : safeRects(W, H, huds);
    // the scene and the rectangle that hold it largest (the neutron's side only matters at grade 4)
    let best = null;
    for (const phi of M.w.seal > 0.01 ? NEUTRON_PHI : [0]) {
      const G0 = sceneOf(M, phi);
      for (const r of rects) { const f = fitIn(G0, r); if (!best || f.unit > best.f.unit + 0.5) best = { G: G0, f }; }
    }
    const G = (S.dragging && FRAME) ? sceneOf(M, FRAME.phi) : best.G, area = (S.dragging && FRAME) ? FRAME.area : best.f.area, w = M.w;
    if (!S.dragging || !FRAME) applyFit(best.f, W, H);
    OBST = thumb ? [] : hudElementBoxes(); BOUNDS = { x: 8, y: 8, w: W - 16, h: H - 16 }; LB = [];
    const lw = thumb ? 1.4 : 1, view = S.view, b = G.b, facing = sc.facing();
    sc.begin();

    /* Λ⁰: the point at the corner */
    sc.surface('point', (u, v) => v3.add(O, v3.scale(v3.sph(u, v), G.ptR)), { u: [0, PI], v: [0, TAU], nu: 14, nv: 24, colors: [P.sigma, P.cyan], value: (u) => Math.cos(u), range: [-1, 1], pick: false });
    /* Λ¹: three edges (the colors r, g, b in the color view) */
    if (w.line > 0.01) {
      [F1, F2, b].forEach((f, k) => {
        const tip = v3.scale(f, A * EDGE * w.line);
        sc.tube(`edge-${k}`, [O, v3.scale(tip, 0.94)], { color: P.cyan, width: 5 * lw, glow: 0.25 });
        sc.arrow(v3.scale(tip, 0.80), tip, { color: P.cyan, width: 2, headSize: 15 * lw });
      });
    }
    /* Λ²: the three faces through O, opaque at grade 2 and a tint over the volume at grade 3 */
    if (w.face > 0.01) {
      const pairs = [[F1, F2, b], [F2, b, F1], [b, F1, F2]], fa = (1 - 0.7 * w.vol) * (view === 'minus' ? 0.85 : 1);
      pairs.forEach(([fi, fj, fk], k) => {
        const out = v3.scale(fk, -0.008), s = A * w.face;
        sc.surface(`face-${k}`, (u, v) => v3.add(out, v3.add(v3.scale(fi, s * u), v3.scale(fj, s * v))), { u: [0, 1], v: [0, 1], nu: 8, nv: 8, color: P.magenta, alpha: fa, grid: { every: [2, 2], color: P.magenta, alpha: 0.35 }, pick: false });
      });
    }
    /* Λ³: the volume spanned by the three edges */
    if (w.vol > 0.01) {
      const s = A * w.vol, V = [];
      for (let i = 0; i < 8; i++) V.push(v3.scale(v3.add(v3.add(v3.scale(F1, i & 1), v3.scale(F2, (i >> 1) & 1)), v3.scale(b, (i >> 2) & 1)), s));
      sc.poly('volume', { vertices: V, faces: [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]] }, { color: P.violet, edges: P.ink });
    }
    /* grade 4: the proton (a window towards the viewer shows the sealed volume) and the neutron */
    if (w.seal > 0.01) {
      const r = R_P * w.seal, F = v3.unit(facing), ea = v3.unit(v3.cross(F, Math.abs(F[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), eb = v3.cross(F, ea);
      sc.surface('proton', (u, v) => v3.add(CUBE_C, v3.scale(v3.add(v3.scale(F, Math.cos(u)), v3.scale(v3.add(v3.scale(ea, Math.cos(v)), v3.scale(eb, Math.sin(v))), Math.sin(u))), r)),
        { u: [0.52, PI], v: [0, TAU], nu: 30, nv: 56, colors: [P.violet, P.sigma], value: (u, v) => Math.sin(u) * Math.sin(v), range: [-1, 1], grid: { every: [6, 8], color: P.violet, alpha: 0.18 }, pick: false });
      sc.surface('neutron', (u, v) => v3.add(G.nPos, v3.scale(v3.sph(u, v), r)), { u: [0, PI], v: [0, TAU], nu: 24, nv: 44, colors: [P.faint, P.dim], value: (u) => Math.cos(u), range: [-1, 1], grid: { every: [6, 8], color: P.ink, alpha: 0.14 }, pick: false });
      // the pion: a tube between the surfaces, a pulse going back and forth with proper time
      const nd = v3.unit(v3.sub(G.nPos, CUBE_C)), a0 = v3.add(CUBE_C, v3.scale(nd, r)), a1 = v3.sub(G.nPos, v3.scale(nd, r));
      sc.tube('pion', [a0, a1], { color: P.magenta, width: 3.2 * lw, glow: 0.35, alpha: w.seal > 0.98 ? 1 : w.seal });
      const sPulse = 0.5 - 0.5 * Math.cos(PI * M.tau);
      sc.bead(lerp3(a0, a1, sPulse), { key: 'pion-pulse', color: P.magenta, r: 6.5 * lw });
      // the flux of the Yukawa field: radial lines fading as (1 + r/λ)e^{−r/λ}
      fluxDirs(nd).forEach((d, k) => {
        const r0 = r, r1 = r + FLUX_LEN * w.seal;
        sc.tube(`flux-${k}`, Array.from({ length: 9 }, (_, i) => v3.add(CUBE_C, v3.scale(d, r0 + (r1 - r0) * i / 8))),
          { color: P.magenta, width: 2.4 * lw, alpha: (t) => w.seal * yukawaFlux(r0 + (r1 - r0) * t, S.lambda), pick: false });
      });
      sc.circle(CUBE_C, [0, 0, 1], S.lambda * w.seal, { color: P.magenta, width: 1.3, dash: [6, 5], alpha: 0.7 * w.seal, fade: false });
    }
    /* the drift dial: rim β = 1, ticks, the drift dx = β c dt */
    const anchor = G.anchor, dialPt = (d, rr) => v3.add(anchor, v3.scale([Math.cos(PSI_D + d), Math.sin(PSI_D + d), 0], rr));
    sc.line(Array.from({ length: 29 }, (_, i) => dialPt((-35 + 70 * i / 28) * DEG, RB)), { color: P.cyan, width: 1.6 * lw, alpha: 0.85 });
    for (const q of [0.25, 0.5, 0.75]) sc.line(Array.from({ length: 9 }, (_, i) => dialPt((-8 + 16 * i / 8) * DEG, RB * q)), { color: P.dim, width: 1.1, alpha: 0.8 });
    sc.line([anchor, dialPt(0, RB)], { color: P.dim, width: 1, alpha: 0.6, dash: [3, 4] });
    if (G.tipLen > 0.03) sc.arrow(anchor, G.tip, { color: P.magenta, width: 4 * lw, headSize: 13 * lw });
    /* grade 0: the budget dome of radius c dt over the dial, and the right triangle in its vertical plane */
    if (w.dome > 0.01) {
      const Dh = v3.unit([facing[0], facing[1], 1e-9]);
      sc.surface('dome', (u, v) => v3.add(anchor, v3.scale([Math.sin(u) * Math.cos(v), Math.sin(u) * Math.sin(v), Math.cos(u)], RB)), {
        u: [0, PI / 2], v: [0, TAU], nu: 18, nv: 72, colors: [P.dim, P.violet], value: (u) => Math.cos(u), range: [0, 1],
        alpha: (u, v) => { const h = [Math.cos(v), Math.sin(v), 0], back = v3.dot(h, Dh) < -0.06; return (back ? 1 : 0.05) * (w.dome > 0.98 ? 1 : w.dome); },
        grid: { every: [3, 6], color: P.violet, alpha: 0.28 }, pick: false });
      sc.surface('light-ring', (u, v) => v3.add(anchor, [u * Math.cos(v), u * Math.sin(v), -0.006]), { u: [0.885 * RB, RB], v: [0, TAU], nu: 3, nv: 96, colors: [P.sigma, P.cyan], value: (u) => u / RB, range: [0.885, 1], alpha: w.dome > 0.98 ? 1 : w.dome, pick: false });
      const rem = RB * M.properTimeRatio, top = v3.add(G.tip, [0, 0, rem]);
      if (rem > 0.02) {
        const amp = 0.055 * RB * Math.cos(M.theta);
        sc.tube('standing', Array.from({ length: 33 }, (_, i) => { const s = i / 32; return v3.add(v3.add(G.tip, [0, 0, rem * s]), v3.scale(EHAT, amp * Math.sin(PI * s))); }), { color: P.violet, width: 4.5 * lw, glow: 0.3, alpha: w.dome > 0.98 ? 1 : w.dome });
        sc.line([G.tip, top], { color: P.violet, width: 1, alpha: 0.5 * w.dome, dash: [2, 3] });
      }
      sc.line([anchor, top], { color: P.cyan, width: 2.2 * lw, alpha: w.dome });
      sc.bead(top, { key: 'budget-top', color: P.amber, r: 6 * lw, alpha: w.dome });
      if (rem > 0.06 && G.tipLen > 0.06) { const k = 0.07; sc.line([v3.add(G.tip, [0, 0, k]), v3.add(v3.sub(G.tip, v3.scale(EHAT, k)), [0, 0, k]), v3.sub(G.tip, v3.scale(EHAT, k))], { color: P.ink, width: 1, alpha: 0.6 * w.dome }); }
    }
    /* the view I₃² = −1: e^{I₃θ}e₃ = cos θ·e₃ + sin θ·e₁₂, amber, on the corner */
    if (view === 'minus' && w.vol > 0.5) {
      const c = Math.cos(M.theta), s = Math.sin(M.theta), Lp = A;
      if (Math.abs(c) > 0.03) sc.arrow(O, v3.scale(F3, Lp * c), { color: P.amber, width: 3.2 * lw, headSize: 16 * lw });
      if (c < 0) sc.line([v3.scale(F3, 0.02), v3.scale(F3, Lp)], { color: P.amber, width: 1.4, alpha: 0.7, dash: [4, 4] });
      const k = Math.abs(s), lift = [0, 0, 0.012], sq = [O, v3.scale(F1, A), v3.add(v3.scale(F1, A), v3.scale(F2, A)), v3.scale(F2, A)].map((p) => v3.add(p, lift));
      if (k > 0.02) {
        const cen = v3.scale(v3.add(sq[0], sq[2]), 0.5), sh = sq.map((p) => v3.add(cen, v3.scale(v3.sub(p, cen), Math.sqrt(k))));
        sc.fan(sh, { fill: P.amber, alpha: 0.16 + 0.22 * k, color: P.amber, width: 2 * lw, strokeAlpha: 0.95 });
        const rr = 0.22 * A * Math.sqrt(k), dir = s >= 0 ? 1 : -1, arc = Array.from({ length: 22 }, (_, i) => { const a = dir * 1.55 * PI * i / 21; return v3.add(cen, v3.add(v3.scale(F1, rr * Math.cos(a)), v3.scale(F2, rr * Math.sin(a)))); });
        sc.line(arc.slice(0, -2), { color: P.amber, width: 1.8 * lw });
        sc.arrow(arc[arc.length - 3], arc[arc.length - 1], { color: P.amber, width: 1.8 * lw, headSize: 9 * lw });
      }
      sc.bead(v3.scale(F3, Lp * c), { key: 'probe-tip', color: P.amber, r: 5.5 * lw });
    }
    /* the grades view: vortex rings on the faces and a glint on each line, both with proper time */
    if ((view === 'grades' || view === 'color') && w.face > 0.5) {
      [[F1, F2, b], [F2, b, F1], [b, F1, F2]].forEach(([fi, fj, fk], k) => {
        const out = v3.scale(fk, -0.02);
        const cen = v3.add(out, v3.scale(v3.add(fi, fj), A * w.face / 2)), rr = 0.2 * A * w.face;
        const ring = Array.from({ length: 41 }, (_, i) => { const a = TAU * i / 40; return v3.add(cen, v3.add(v3.scale(fi, rr * Math.cos(a)), v3.scale(fj, rr * Math.sin(a)))); });
        if (view === 'grades') {
          sc.tube(`vortex-${k}`, ring, { color: P.magenta, width: 3.4 * lw, glow: 0.35 });
          const a = PI * M.tau + k * 2.1;
          sc.bead(v3.add(cen, v3.add(v3.scale(fi, rr * Math.cos(a)), v3.scale(fj, rr * Math.sin(a)))), { key: `vortex-bead-${k}`, color: P.sigma, r: 4 * lw });
        }
      });
      if (view === 'grades') [F1, F2, b].forEach((f, k) => sc.bead(v3.scale(f, A * EDGE * w.line * (0.15 + 0.7 * ((M.tau / 2 + k / 3) % 1))), { key: `glint-${k}`, color: P.sigma, r: 3.6 * lw }));
    }
    /* the color view: three quarks at the ends of r, g, b */
    if (view === 'color' && w.line > 0.5) [F1, F2, b].forEach((f, k) => sc.bead(v3.scale(f, A), { key: `quark-${k}`, color: P.cyan, r: 7 * lw }));
    sc.end();

    /* the handle sits on the tip of the drift, clamped to the outside of the body */
    const hq = sc.p(G.handleAt);
    const handleShown = !thumb && !TRV.still && !sc.occluded(G.handleAt, 0.03) && hq[0] > area.x && hq[0] < area.x + area.w && hq[1] > area.y - 6 && hq[1] < area.y + area.h + 6;
    placeHandle(handleShown ? hq : null);
    if (handleShown) OBST.push({ x: hq[0] - 16, y: hq[1] - 16, w: 32, h: 32 });
    if (!thumb) {
      const cen = sc.p(G.fit.reduce((s, p) => v3.add(s, p), [0, 0, 0]).map((x) => x / G.fit.length));
      const away = (p) => { const q = sc.p(p); return [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1]; };
      const sub = (k) => ['₁', '₂', '₃'][k];
      if (view === 'minus' && w.vol > 0.5) {
        [F1, F2].forEach((f, k) => want(`e${k}`, v3.scale(f, A * EDGE), `e${sub(k)}`, 'raw ink backed', 9, away(v3.scale(f, A * EDGE))));
        const c = Math.cos(M.theta);
        want('probe', v3.scale(F3, A * c), Math.abs(Math.sin(M.theta)) < 0.25 && c < 0 ? 'I₃²e₃ = −e₃' : 'e<sup>I₃θ</sup>e₃', 'raw c-am backed', 10, c < 0 ? [0.4, -1] : [0.5, 1]);
        want('vol', v3.add(CUBE_C, v3.scale(F3, A * 0.25)), 'I₃ = e₁e₂e₃', 'raw c-vi backed', 7, [1, 0.6], 4);
        if (Math.abs(Math.sin(M.theta)) > 0.3) want('e12', v3.scale(v3.add(F1, F2), A * 0.5), 'e₁₂', 'raw c-mg backed', 6, [0, -1], 4);
      }
      if (view === 'budget' && w.dome > 0.5) {
        const rem = RB * M.properTimeRatio;
        if (G.tipLen > 0.12) want('dx', v3.add(anchor, v3.scale(EHAT, G.tipLen / 2)), 'dx = β c dt', 'raw c-mg backed', 9, [0, 1], 6);
        if (rem > 0.15) want('dtau', v3.add(G.tip, [0, 0, rem / 2]), 'c dτ', 'raw c-vi backed', 10, [-1, 0], 10);
        want('cdt', v3.add(anchor, v3.scale(v3.sub(v3.add(G.tip, [0, 0, rem]), anchor), 0.55)), 'c dt', 'raw c-cy backed', 8, [1, -0.4], 8);
        want('light', dialPt(-28 * DEG, RB), L('β = 1 · dτ = 0 · 光', 'β = 1 · dτ = 0 · light'), 'raw ink backed', 7, [-0.3, 1], 6);
      }
      if (view === 'grades' && w.vol > 0.5) {
        want('g0', O, 'Λ⁰ · 1', 'raw ink backed', 9, [-0.2, -1], 10);
        want('g1', v3.scale(F1, A * EDGE), 'Λ¹ · 3', 'raw c-cy backed', 8, away(v3.scale(F1, A * EDGE)));
        want('g2', v3.scale(v3.add(F2, b), A * 0.5), 'Λ² · 3', 'raw c-mg backed', 7, [1, -0.2], 6);
        want('g3', v3.add(v3.scale(b, A), v3.scale(F1, A)), 'Λ³ · 1', 'raw c-vi backed', 6, away(v3.add(v3.scale(b, A), v3.scale(F1, A))));
      }
      if (view === 'color' && w.line > 0.5) {
        ['r', 'g', 'b'].forEach((n, k) => want(`q${k}`, v3.scale([F1, F2, b][k], A), n, 'raw c-cy backed', 9, away(v3.scale([F1, F2, b][k], A))));
        if (w.vol > 0.5) want('wedge', v3.add(v3.scale(F2, A), v3.scale(b, A)), `r∧g∧b · det G₃ = ${fix(M.colorDet, 3)}`, 'raw c-vi backed', 8, away(v3.add(v3.scale(F2, A), v3.scale(b, A))), 8);
      }
      if (w.seal > 0.5) {
        want('p', v3.add(CUBE_C, [0, 0, R_P]), 'p⁺ = uud · +1', 'raw c-vi backed', 10, [0, -1], 8);
        want('n', v3.add(G.nPos, [0, 0, R_P]), 'n = udd · 0', 'raw ink backed', 9, [0, -1], 8);
        const nd = v3.unit(v3.sub(G.nPos, CUBE_C));
        want('pi', v3.scale(v3.add(v3.add(CUBE_C, v3.scale(nd, R_P)), v3.sub(G.nPos, v3.scale(nd, R_P))), 0.5), 'π', 'raw c-mg backed', 8, [0, 1], 10);
        want('lam', v3.add(CUBE_C, [Math.cos(PSI_D + 0.9) * S.lambda, Math.sin(PSI_D + 0.9) * S.lambda, 0]), `λ = ${fix(S.lambda, 3)} fm`, 'raw c-mg backed', 6, [0, 1], 6);
      }
      if (view !== 'budget' && G.tipLen > 0.2 && w.dome < 0.5) want('drift', v3.add(anchor, v3.scale(EHAT, Math.max(G.tipLen, 0.3) * 0.55)), `β = ${fix(S.beta, 2)}`, 'raw c-mg backed', 5, [0, 1], 6);
      placeLabels();
    }
    FRAME = { W, H, area, G, phi: G.phi, handle: handleShown ? hq : null };
  }

  /* ---------- the handle: a button on the stage that sets β along the drift ---------- */
  const handle = $('velocityHandle');
  let drag = null;
  function placeHandle(q) {
    handle.hidden = !q;
    if (!q) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  function betaAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop;
    const a = sc.p(FRAME.G.anchor), e = sc.p(v3.add(FRAME.G.anchor, v3.scale(EHAT, RB))), dx = e[0] - a[0], dy = e[1] - a[1];
    return clamp(((x - a[0]) * dx + (y - a[1]) * dy) / Math.max(1e-6, dx * dx + dy * dy), 0, 1);
  }
  function endDrag(ev) {
    if (!drag || (ev && ev.pointerId != null && ev.pointerId !== drag.pointer)) return;
    try { if (handle.hasPointerCapture(drag.pointer)) handle.releasePointerCapture(drag.pointer); } catch (e) { /* already released */ }
    drag = null; S.dragging = false; handle.classList.remove('dragging'); paint();
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still || !FRAME) return;
    ev.preventDefault(); ev.stopPropagation();
    leave(); S.plot = 'budget';
    drag = { pointer: ev.pointerId }; S.dragging = true; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!drag || ev.pointerId !== drag.pointer) return;
    ev.preventDefault(); setBeta(betaAt(ev), true);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); leave(); S.plot = 'budget';
    setBeta(S.beta + (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp' ? 0.01 : -0.01), true);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const VIEWS = {
    minus: { formula: 'I₃² = −1 · (c dτ)² = c²dt² − dx²', legend: [['cy', ['e₁ e₂ e₃：三条线', 'e₁ e₂ e₃: three lines']], ['mg', ['面', 'planes']], ['vi', ['体 I₃', 'volume I₃']], ['am', ['当前 e<sup>I₃θ</sup>e₃', 'now e<sup>I₃θ</sup>e₃']]] },
    budget: { formula: '(c dτ)² = c²dt² − dx²', legend: [['cy', ['预算 c dt', 'budget c dt']], ['mg', ['位移 dx = β c dt', 'drift dx = β c dt']], ['vi', ['余量 c dτ（驻波）', 'remainder c dτ (standing wave)']], ['am', ['当前', 'now']]] },
    grades: { formula: '1 + 3 + 3 + 1 = 8 = dim Cl(3,0)', legend: [['ik', ['点 1', 'point 1']], ['cy', ['线 3', 'lines 3']], ['mg', ['面 3 · 涡旋', 'planes 3 · vortices']], ['vi', ['体 1', 'volume 1']]] },
    color: { formula: 'det G₃ > 0 ⇔ r, g, b 线性无关', formulaEn: 'det G₃ > 0 ⇔ r, g, b independent', legend: [['cy', ['三色 r g b', 'colors r g b']], ['mg', ['面', 'planes']], ['vi', ['r∧g∧b 单态体', 'singlet volume r∧g∧b']]] },
    yukawa: { formula: '(1 + r/λ)e<sup>−r/λ</sup>, λ<sub>π</sub> = ħ/(m<sub>π</sub>c)', legend: [['vi', ['质子 p⁺（新点）', 'proton p⁺ (new point)']], ['dm', ['中子 n', 'neutron n']], ['mg', ['π 介子场 · 通量', 'pion field · flux']], ['am', ['当前 β', 'now β']]] }
  };
  const gradeName = (g) => (g === 4 ? 'Λ⁰<sub>ℓ+1</sub>' : `Λ${SUP[g]}`);
  function hudText(M) {
    const v = S.view, g = M.grade;
    let big, sub;
    if (v === 'minus') { big = `I₃² = −1 · ${L('体闭合出负号', 'the closed volume gives the minus')}`; sub = `e<sup>I₃θ</sup>e₃ · θ = ${fix(M.theta / PI % 2, 2)}π · cτ = ${fix(M.tau, 2)}`; }
    else if (v === 'budget') { big = '(c dτ)² = c²dt² − dx²'; sub = `β = ${fix(S.beta, 2)} · ${L('空间', 'space')} β² = ${fix(M.spatialShare, 3)} · ${L('余量', 'remainder')} dτ/dt = ${fix(M.properTimeRatio, 3)}`; }
    else if (v === 'grades') { big = `${gradeName(g)} · 1 · 3 · 3 · 1 = 8`; sub = `${L('点 · 线 · 面 · 体', 'point · line · plane · volume')} · U(1)×SU(2)×SU(3)`; }
    else if (v === 'color') { big = `r∧g∧b · det G₃ = ${fix(M.colorDet, 3)}`; sub = M.colorDet > 0.999 ? L('三色两两正交：单态', 'three orthogonal colors: a singlet') : M.colorDet < 1e-3 ? L('第三色与 g 重合：体塌成面', 'third color equals g: the volume is flat') : `${L('第三色转出', 'third color turning out')} · ${fix(S.alpha / DEG, 0)}°`; }
    else { big = `p⁺ = uud → ${gradeName(4)}`; sub = `λ = ${fix(S.lambda, 3)} fm · ${L('通量', 'flux')} (r<sub>p</sub>) = ${fix(M.yukawaAtRp, 3)}`; }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = VIEWS[v].legend.map(([k, t]) => `<span><i class="sw ${k}"></i>${L(t[0], t[1])}</span>`).join('');
  }
  function drawText(M) {
    const g = M.grade;
    $('roI3').textContent = fix(M.I3SquaredDiag[0], 4);
    $('roI3Sub').textContent = ` · diag(${fix(M.I3SquaredDiag[0], 0)}, ${fix(M.I3SquaredDiag[1], 0)})`;
    $('roBeta').textContent = `${fix(S.beta, 2)} · ${fix(M.spatialShare, 4)}`;
    $('roTau').textContent = fix(M.properTimeRatio, 4);
    $('roBaylis').textContent = fix(M.baylisProductDiag[0], 4);
    $('roGrade').innerHTML = `${gradeName(g)} · ${GRADE_DIMS[g]} / 1+3+3+1 = 8`;
    $('roGram').textContent = fix(M.colorDet, 4);
    $('roYukawa').textContent = `${fix(M.yukawaAtRp, 4)} · λ = ${fix(S.lambda, 3)} fm`;
    $('roNote').textContent = L(`(I₃ + βê)² 的标量部 = ${fix(M.multivectorScalarPart, 4)} = −(dτ/dt)²；快度 η = ${fix(M.rapidity, 3)}，cosh²η − sinh²η = 1。`,
      `scalar part of (I₃ + βê)² = ${fix(M.multivectorScalarPart, 4)} = −(dτ/dt)²; rapidity η = ${fix(M.rapidity, 3)}, cosh²η − sinh²η = 1.`);
    $('modePill').querySelector('strong').innerHTML = gradeName(g);
    $('budgetPill').querySelector('strong').textContent = fix(M.properTimeRatio, 3);
    $('hint').textContent = L('Space 播放 · 拖动琥珀手柄改 β', 'Space plays · drag the amber handle for β');
    const V = VIEWS[S.view];
    $('formula').innerHTML = TRV.lang() === 'en' && V.formulaEn ? V.formulaEn : V.formula;
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight || TRV.thumbMode) return;
    const pad = [34, 12, 10, 22];
    let meta = '';
    if (S.plot === 'budget') {
      const g = kit.plot(cv, { x: [0, 1], y: [0, 1.08], pad });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'β = v/c' });
      const xs = Array.from({ length: 201 }, (_, i) => i / 200);
      g.area(xs.map((x) => [x, x * x]), P.magenta, { alpha: 0.1, base: 0 });
      g.line(xs.map((x) => [x, 1 - x * x]), P.violet, { width: 1.8, dash: [5, 3] });
      g.line(xs.map((x) => [x, x * x]), P.magenta, { width: 2 });
      g.line(xs.map((x) => [x, Math.sqrt(1 - x * x)]), P.cyan, { width: 2.4 });
      g.dot(1, 0, P.cyan, 5, { ring: true, width: 1.6 });
      g.vline(S.beta, P.amber, { alpha: 0.85 });
      for (const y of [M.properTimeRatio, M.spatialShare, 1 - M.spatialShare]) g.dot(S.beta, y, P.amber, 3.6);
      g.text(0.1, 0.6, 'dτ/dt = √(1 − β^{2})', P.cyan, { size: 10.5 });
      g.text(0.55, 0.17, 'β^{2}', P.magenta, { size: 10.5, align: 'center' });
      g.text(0.8, 0.22, '1 − β^{2}', P.violet, { size: 10.5, align: 'right' });
      g.text(0.93, 1.03, L('β = 1 → dτ = 0 · 光', 'β = 1 → dτ = 0 · light'), P.cyan, { align: 'right', base: 'top', size: 10 });
      $('plotTitle').textContent = L('预算怎么分：β² + (dτ/dt)² = 1', 'How the budget splits: β² + (dτ/dt)² = 1');
      meta = `β = ${fix(S.beta, 2)} · β² = ${fix(M.spatialShare, 4)} · dτ/dt = ${fix(M.properTimeRatio, 4)}`;
    } else if (S.plot === 'dof') {
      const g = kit.plot(cv, { x: [-0.6, 4.6], y: [0, 9.6], pad: [34, 12, 10, 24] });
      g.axes({ yTicks: [0, 1, 3, 4, 7, 8] });
      const cols = [P.ink, P.cyan, P.magenta, P.violet, P.sigma], cum = [1, 4, 7, 8];
      GRADE_DIMS.forEach((d, k) => {
        const on = k === M.grade;
        g.rect(k - 0.3, 0, k + 0.3, d, cols[k], { alpha: on ? 0.55 : 0.28, stroke: on ? P.amber : cols[k], width: on ? 2 : 1 });
        g.text(k, d + 0.3, String(d), cols[k], { align: 'center', base: 'bottom', size: 10.5 });
        g.text(k, 0, ['Λ^{0}', 'Λ^{1}', 'Λ^{2}', 'Λ^{3}', 'Λ^{0}_{ℓ+1}'][k], on ? P.amber : P.dim, { align: 'center', base: 'top', dy: 5, size: 10.5 });
      });
      g.line(cum.map((c, k) => [k, c]), P.dim, { width: 1.6, dash: [4, 3] });
      g.line([[3, 8], [4, 1]], P.dim, { width: 1.2, dash: [2, 3] });
      cum.forEach((c, k) => g.dot(k, c, P.dim, 2.8));
      g.text(1.5, 8.6, '1 + 3 + 3 + 1 = 8 = dim Cl(3,0)', P.dim, { size: 10, align: 'center' });
      $('plotTitle').textContent = L('各阶维数 1·3·3·1：累计 8，再封成 1 个新点', 'Grades 1·3·3·1: eight in all, then one new point');
      meta = `${gradeName(M.grade).replace(/<[^>]+>/g, '')} · ${GRADE_DIMS[M.grade]} · U(1)×SU(2)×SU(3): N = 1, 2, 3 (MODEL)`;
    } else {
      const g = kit.plot(cv, { x: [0, 4], y: [0, 1.08], pad });
      g.axes({ xTicks: [0, 1, 2, 3, 4], yTicks: [0, 0.5, 1], xLabel: 'r (fm)' });
      const xs = Array.from({ length: 161 }, (_, i) => 4 * i / 160);
      g.hline(1, P.dim, { dash: [4, 4] });
      if (Math.abs(S.lambda - LAMBDA_PI) > 0.004) g.line(xs.map((r) => [r, yukawaFlux(r, LAMBDA_PI)]), P.dim, { width: 1.3, dash: [3, 3] });
      g.area(xs.map((r) => [r, yukawaFlux(r, S.lambda)]), P.magenta, { alpha: 0.12, base: 0 });
      g.line(xs.map((r) => [r, yukawaFlux(r, S.lambda)]), P.magenta, { width: 2.4 });
      g.vline(R_P, P.violet, { alpha: 0.9 }); g.vline(S.lambda, P.amber, { alpha: 0.8, dash: [4, 3] });
      g.dot(R_P, M.yukawaAtRp, P.amber, 4);
      g.text(R_P, 0.08, 'r_{p}', P.violet, { dx: 5, size: 10.5 });
      g.text(S.lambda, 0.2, 'λ', P.amber, { dx: 5, size: 10.5 });
      g.text(3.95, 1, L('库仑 1', 'Coulomb 1'), P.dim, { align: 'right', base: 'bottom', dy: -2, size: 10 });
      g.text(2.2, yukawaFlux(2.2, S.lambda), '(1 + r/λ)e^{−r/λ}', P.magenta, { dy: -12, size: 10.5 });
      $('plotTitle').textContent = L('π 介子场的通量随 r 屏蔽', 'The flux of the pion field is screened with r');
      meta = `λ = ${fix(S.lambda, 3)} fm · r_p = ${R_P} fm · ${fix(M.yukawaAtRp, 4)}`;
    }
    $('plotMeta').textContent = meta;
  }

  let LAST = null;
  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawPlot(M); drawText(M);
    LAST = M;
  }, [stageEl, $('plot')]);

  /* ---------- the rail: coordinate time c t ---------- */
  const playMirror = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: T_MAX, rate: 0.5, step: 0.05, loop: true,
    format: (t) => `ct ${fix(t, 2)} <small>· cτ ${fix(t * Math.sqrt(Math.max(0, 1 - S.beta * S.beta)), 2)}</small>`,
    onChange: (t, C) => { S.t = t; playMirror.textContent = C.playing ? '❚❚' : '▶'; playMirror.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  const handOver = (ev) => { if (ev && ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); } };
  playMirror.addEventListener('click', (ev) => { clock.toggle(); handOver(ev); });
  $('rewindBtn').addEventListener('click', (ev) => { clock.pause(); clock.set(0); handOver(ev); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let morph = null, colorTween = null;
  function leave() { if (morph) { morph.cancel(); morph = null; } if (colorTween) { colorTween.cancel(); colorTween = null; S.alpha = PI / 2; } cards.mark(null); }
  const GRADE_TEXT = ['Λ⁰', 'Λ¹', 'Λ²', 'Λ³', 'Λ⁰ (ℓ+1)'];
  const fStage = kit.field($('smOctaveStage'), { out: $('oStage'), fmt: (v) => GRADE_TEXT[clamp(Math.round(v), 0, 4)], onInput: (v) => { leave(); setStage(v); } });
  const fBeta = kit.field($('betaOverC'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.plot = 'budget'; setBeta(v); } });
  const fLambda = kit.field($('pionRangeScale'), { fmt: () => fix(S.lambda, 3), onInput: (v) => { leave(); S.lambda = clamp(v, 0.4, 2.5); S.plot = 'yukawa'; fLambda.show(); paint(); } });
  const gradeChips = kit.chips($('gradeChips'), 'grade', (v) => { leave(); setStage(Number(v)); });
  function viewForGrade(g) { return g === 0 ? 'budget' : g === 4 ? 'yukawa' : S.view === 'budget' || S.view === 'yukawa' ? 'grades' : S.view; }
  function setStage(v, instant) {
    const g = clamp(Math.round(v), 0, 4), from = S.stage;
    S.stageTarget = g; S.view = viewForGrade(g); S.plot = g === 0 ? 'budget' : g === 4 ? 'yukawa' : 'dof';
    fStage.set(g); gradeChips.set(String(g), true);
    if (morph) morph.cancel();
    if (instant || TRV.still) { S.stage = g; morph = null; paint(); return; }
    morph = kit.tween(520, (e) => { S.stage = lerp(from, g, e); paint(); }, () => { S.stage = g; morph = null; paint(); });
  }
  function setBeta(v, syncField) {
    S.beta = clamp(v, 0, 1);
    if (syncField !== false) fBeta.set(Number(S.beta.toFixed(2)));
    paint();
  }
  /* the slider writes the field already; the handle and the keyboard need it written back */
  fBeta.set(S.beta);

  /* ---------- experiment cards ---------- */
  const tAtTau = (tau, beta) => tau / Math.sqrt(1 - beta * beta);
  const PRESETS = {
    'pseudoscalar-minus-sign': { beta: 0.35, stage: 3, view: 'minus', plot: 'budget', play: true, still: tAtTau(1, 0.35) },
    'proper-time-budget-cone': { beta: 0.50, stage: 0, view: 'budget', plot: 'budget', play: true, still: tAtTau(1, 0.50) },
    'sm-123-gauge-grades': { beta: 0.35, stage: 3, view: 'grades', plot: 'dof', play: true, still: 0.6 },
    'color-confinement-baryon': { beta: 0.35, stage: 3, view: 'color', plot: 'dof', play: true, still: 0.6, turn: true },
    'pion-yukawa-octave-handoff': { beta: 0.75, stage: 4, view: 'yukawa', plot: 'yukawa', play: true, still: 0.9 }
  };
  const NOTES = {
    'pseudoscalar-minus-sign': ['立方体角上，紫色的体 I₃ 把琥珀色的箭头 e₃ 先送进它正交的面 e₁₂（琥珀方框），再送回 −e₃：I₃² = −1。这个负号就是 (c dτ)² = c²dt² − dx² 里的负号；β = 0.35 时，体内的相位按 dτ/dt = 0.937 走。', 'At the cube corner the violet volume I₃ sends the amber arrow e₃ into its orthogonal plane e₁₂ (the amber square) and back to −e₃: I₃² = −1. That minus sign is the one in (c dτ)² = c²dt² − dx²; at β = 0.35 the phase inside runs at dτ/dt = 0.937.'],
    'proper-time-budget-cone': ['穹顶的半径是一步预算 c dt：品红箭头 dx = β c dt 用去 β = 0.5，紫色驻波的高度是余下的 c dτ = 0.866 c dt，青色的斜边仍是 c dt。把琥珀手柄拖到表盘边缘 β = 1，余量为零：那是光。', 'The radius of the dome is one step of the budget, c dt: the magenta arrow dx = β c dt spends β = 0.5, the height of the violet standing wave is what remains, c dτ = 0.866 c dt, and the cyan hypotenuse is still c dt. Drag the amber handle to the rim, β = 1, and nothing remains: that is light.'],
    'sm-123-gauge-grades': ['立方体角上过同一点的：1 个点、3 条青色的线、3 个品红的面（面上转着涡旋环）、1 个紫色的体，维数 1·3·3·1 合为 8。本书把 U(1)×SU(2)×SU(3) 的 1—2—3 读作这四阶在三维封顶。', 'Through one corner of the cube: 1 point, 3 cyan lines, 3 magenta planes (with vortex rings turning on them) and 1 violet volume, dimensions 1·3·3·1, eight in all. The book reads the 1—2—3 of U(1)×SU(2)×SU(3) as these four grades capped in three dimensions.'],
    'color-confinement-baryon': ['三色 r、g、b 是三条两两正交的青线，它们的楔积 r∧g∧b 是紫色的体，det G₃ = 1。点这张卡时，第三色从 g 转出来，体从一片面长满，det G₃ 由 0 升到 1：两色或重复的一色撑不出体。', 'The colors r, g, b are three mutually orthogonal cyan lines and their wedge r∧g∧b is the violet volume, det G₃ = 1. When the card is clicked the third color turns out of g and the volume grows from a flat plane, det G₃ rising from 0 to 1: two colors, or a repeated one, span no volume.'],
    'pion-yukawa-octave-handoff': ['体封成新的一点：紫色的质子 p⁺ = uud（电荷 +1，半径 0.8409 fm，窗口里是封住的体），旁边是中子 n = udd（电荷 0）。品红的 π 介子在两者之间往返，场的通量按 (1 + r/λ)e<sup>−r/λ</sup> 变淡，λ = 1.414 fm。', 'The volume seals into a new point: the violet proton p⁺ = uud (charge +1, radius 0.8409 fm, the sealed volume in its window) beside the neutron n = udd (charge 0). The magenta pion travels back and forth between them, and the flux of its field fades as (1 + r/λ)e<sup>−r/λ</sup> with λ = 1.414 fm.']
  };
  // A cited figure has a fixed frame: one short sentence per card, without sub- or superscripts.
  const FIGURE_NOTES = {
    'pseudoscalar-minus-sign': ['紫色的体 I₃ 把琥珀箭头 e₃ 送进面 e₁₂，再送回 −e₃：I₃² = −1，正是洛伦兹度规里的负号。', 'The violet volume I₃ sends the amber arrow e₃ into the plane e₁₂ and back to −e₃: I₃² = −1, the Lorentz minus sign.'],
    'proper-time-budget-cone': ['穹顶半径是 c dt：品红位移 dx 用去 β = 0.5，紫色驻波的高度是余下的 c dτ = 0.866 c dt。', 'The dome radius is c dt: the magenta drift dx spends β = 0.5 and the violet standing wave is the remainder c dτ = 0.866 c dt.'],
    'sm-123-gauge-grades': ['过立方体的一角：1 个点、3 条青线、3 个品红面、1 个紫色体，维数 1·3·3·1 合为 8。', 'Through one corner of the cube: 1 point, 3 cyan lines, 3 magenta planes and 1 violet volume, 1·3·3·1, eight in all.'],
    'color-confinement-baryon': ['三条正交的色线 r、g、b 楔成紫色的体，det G₃ = 1；第三色与 g 重合时体塌成面，det G₃ = 0。', 'Three orthogonal color lines r, g, b wedge into the violet volume, det G₃ = 1; with the third equal to g it is flat, det G₃ = 0.'],
    'pion-yukawa-octave-handoff': ['体封成紫色质子 p⁺（电荷 +1，0.8409 fm）；品红的 π 介子场连向中子 n（电荷 0），通量随 r 屏蔽，λ = 1.414 fm。', 'The volume seals into the violet proton p⁺ (charge +1, 0.8409 fm); the magenta pion field reaches the neutron n (charge 0), screened with λ = 1.414 fm.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = PRESETS[id], from = { beta: S.beta, stage: S.stage, lambda: S.lambda };
    clock.pause();
    if (morph) { morph.cancel(); morph = null; }
    if (colorTween) { colorTween.cancel(); colorTween = null; }
    S.view = p.view; S.plot = p.plot; S.stageTarget = p.stage;
    fStage.set(p.stage); gradeChips.set(String(p.stage), true); fBeta.set(p.beta);
    const instant = booting || TRV.still;
    sc.view([YAW0, PITCH0, 1], instant ? 0 : 600);
    if (instant) { S.beta = p.beta; S.stage = p.stage; S.lambda = LAMBDA_PI; S.alpha = PI / 2; fLambda.set(1.41); }
    else {
      fLambda.set(1.41);
      morph = kit.tween(650, (e) => { S.beta = lerp(from.beta, p.beta, e); S.stage = lerp(from.stage, p.stage, e); S.lambda = lerp(from.lambda, LAMBDA_PI, e); fLambda.show(); paint(); },
        () => { S.beta = p.beta; S.stage = p.stage; S.lambda = LAMBDA_PI; morph = null; paint(); });
      if (p.turn) { S.alpha = 0; colorTween = kit.tween(1500, (e) => { S.alpha = (PI / 2) * e; paint(); }, () => { S.alpha = PI / 2; colorTween = null; paint(); }); }
      else S.alpha = PI / 2;
    }
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else if (booting) { clock.set(0); kit.autoplay(clock, stageEl); }
    else { clock.set(0); clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖八度阶、β 与 λ，拖动琥珀手柄，或点右上角的阶。随时可以再选一张卡。', 'Free play: move the grade, β and λ, drag the amber handle, or press a grade at the top right. Pick a card again at any time.'] });
  /* the tour bar's step and body keep their names when kit.cards rewrites them */
  const tourWhat = $('tour').querySelector('.what');
  const nameTour = () => { const b = tourWhat.querySelector('b'), n = tourWhat.querySelector('.tour-note'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; if (n && n.id !== 'tourBody') n.id = 'tourBody'; };
  new MutationObserver(nameTour).observe(tourWhat, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const round = (x) => (Math.abs(x) < 1e-300 ? 0 : x);
  window.LORENTZ_OCTAVE_DEBUG = Object.freeze({
    get state() {
      const M = model();
      return JSON.parse(JSON.stringify({
        preset: cards.current, view: S.view, plot: S.plot, t: clock.t, playing: clock.playing, max: clock.max,
        I3Diag: M.I3Diag, I3SquaredDiag: M.I3SquaredDiag, I3SquaredError: M.I3SquaredError,
        beta: M.beta, clampedBeta: M.clampedBeta, spatialShare: M.spatialShare, properTimeRatio: M.properTimeRatio,
        budgetSum: M.spatialShare + M.properTimeRatio ** 2, baylisDet: M.baylisDet, baylisProductDiag: M.baylisProductDiag, baylisResidual: M.baylisResidual,
        bFormulaResidual: M.bFormulaResidual, multivectorScalarPart: M.multivectorScalarPart,
        rapidity: M.rapidity, gamma: M.gamma, gammaBeta: M.gammaBeta, bogoliubovResidual: round(M.bogoliubovResidual),
        properTime: M.tau, phaseOverPi: M.theta / PI,
        smStage: M.grade, smStageContinuous: S.stage, exteriorDims: [1, 3, 3, 1], exteriorTotal: 8, gaugeRanks: [1, 2, 3], gaugeAlgebraDims: [1, 3, 8],
        colorAngleDeg: S.alpha / DEG, colorSingletDetG3: M.colorDet, colorDetG3Cases: M.colorDetCases,
        protonCharge: (2 + 2 - 1) / 3, neutronCharge: (2 - 1 - 1) / 3, quarkChargesThirds: { u: 2, d: -1 },
        lambda: S.lambda, lambdaPi: LAMBDA_PI, protonRadius: R_P, yukawaFluxAtRp: M.yukawaAtRp, yukawaFluxAtRpPhysical: M.yukawaAtRpPhysical,
        jordanWigner: jw, gauge: M.gauge, twoAxisWordResidual: M.twoAxis, pinchingResidual: M.pinching.residual, poissonMaxDiff: M.poissonMaxDiff,
        camera: Object.assign({}, sc.cam), handle: FRAME && FRAME.handle ? { x: FRAME.handle[0], y: FRAME.handle[1] } : null, labels: PLACED,
        stageFrame: FRAME ? { W: FRAME.W, H: FRAME.H, area: FRAME.area, unit: sc.unit, cx: sc.cx, cy: sc.cy } : null,
        roles: { lines: 'cyan', planes: 'magenta', volume: 'violet', point: 'sigma', drift: 'magenta', remainder: 'violet', budget: 'cyan', now: 'amber', proton: 'violet', neutron: 'dim', pion: 'magenta' }
      }));
    },
    /** Project a world point to viewport pixels (for pointer tests). */
    project: (p) => { const b = stageEl.getBoundingClientRect(), q = sc.p(p); return [b.left + stageEl.clientLeft + q[0], b.top + stageEl.clientTop + q[1]]; },
    handleBox: () => { const r = handle.getBoundingClientRect(); return handle.hidden ? null : { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    driftAxis: () => (FRAME ? { anchor: FRAME.G.anchor.slice(), end: v3.add(FRAME.G.anchor, v3.scale(EHAT, RB)) } : null),
    lorentz: (b) => JSON.parse(JSON.stringify(lorentz(b))),
    setState: (o) => {
      clock.pause(); leave();
      if (o.beta != null) setBeta(o.beta);
      if (o.lambda != null) { S.lambda = clamp(o.lambda, 0.4, 2.5); fLambda.set(Number(S.lambda.toFixed(2))); }
      if (o.stage != null) setStage(o.stage, true);
      if (o.view) S.view = o.view;
      if (o.t != null) clock.set(o.t);
      paint();
    }
  });
  window.TRV_THUMB = () => { cards.pick('pseudoscalar-minus-sign'); clock.pause(); clock.set(PRESETS['pseudoscalar-minus-sign'].still); paint.now(); };
  cards.pick(cards.initial('pseudoscalar-minus-sign'));
  nameTour();
  booting = false;
  paint();
})();
