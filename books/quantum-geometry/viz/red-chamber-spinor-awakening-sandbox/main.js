/* HONG//AWAKEN · 红楼旋量觉醒 · Red Chamber spinor awakening
   World (kit.solid): z up. At the centre sits the 36,501st surplus stone, a sculpted icosahedron of radius 0.25 (P.sigma),
   inside a thin glass Bloch sphere of radius 0.50 whose top carries the violet Berry cap from the pole to colatitude θ:
   it encloses Ω(θ) = 2π(1 − cos θ), carries twelve ink meridians, and its rim is the cone loop Γ with twelve stations
   φ_k = 30°·k. Around it the two-sided octagonal mirror (cyan Zhen face, magenta Jia face) sweeps a thickened ribbon
   along the centre line c(u) = ((0.72 + 0.17 cos(u/2)) cos u, (0.72 + 0.17 cos(u/2)) sin u, 0.17 sin(u/2)), u ∈ [0, Φ]:
   the line winds twice around the stone and closes at u = 720°, the elliptic cross-section turns by u/2 about it, so
   at Φ = 360° the mirror shows its Jia face where it started with Zhen (the spinor reads −1) and at Φ = 720° the
   ribbon closes on itself without a seam (+1); past 640° both faces blend into one violet. The vector (ink arrow)
   turns by Φ, the mirror by Φ/2. Inside the Bloch sphere the magenta manas cage has M bars, M ∈ [0, 12]; outside,
   the 42-vertex geodesic net of radius 1.18 (Indra's net) with its star-stones, and twelve radial standing-wave
   filaments to its icosahedral vertices with strength A = Δ_Schur(M)·cos²(Φ/4)·[1 + 100 δ_meta(θ)²]⁻¹.
   The rail τ ∈ [0, 1] drives Φ = 720°·τ (free play, cards 1, 3, 4), Φ = 600°·τ (card 2, 120° short of closing), or
   unloads M = round(12(1 − τ)) at Φ = 720° (card 5). Every number is computed here; the instances of the cited Lean
   theorems are checked in instances(). Read-only probe: window.RED_CHAMBER_AWAKEN_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- the cosine fixed point θ* (bisection) and the scalar laws of the page ---------- */
  function bisectDottie() { let a = 0, b = 1; for (let k = 0; k < 200; k++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; }
  const TSTAR = bisectDottie(), TSTAR_DEG = TSTAR / DEG;
  const D_EFF = 12, RHO = 0.5, STATIONS = 12;
  /** The colatitude θ runs over the whole quarter [0°, 90°]; at 90° the cap is a hemisphere and nothing divides by zero. */
  const TH_MAX = 90;
  /** The spinor U = a + b î as text, the î part with its own sign (never "−0"). */
  const cplx = (re, im, d) => { const b = fix(Math.abs(im), d); return `${fix(re, d)} ${im < 0 && Number(b) !== 0 ? '−' : '+'} ${b}î`; };
  /** Δ_Schur(M) = (1 − ρ)(D − M)/(D(1 − ρ + Mρ)) = (12 − M)/(12(M + 1)) for D = 12, ρ = 1/2. */
  const schur = (M) => (1 - RHO) * (D_EFF - M) / (D_EFF * (1 - RHO + M * RHO));
  const metaErr = (t) => Math.abs(Math.cos(t) - t);
  const resonance = (t) => 1 / (1 + 100 * metaErr(t) ** 2);
  const closure = (phiDeg) => Math.cos(phiDeg * DEG / 4) ** 2;
  const blendOf = (phiDeg) => { const x = clamp((phiDeg - 640) / 80, 0, 1); return x * x * (3 - 2 * x); };
  /** The surplus stone: 36501 and 36500, factored by trial division, and their gcd by Euclid. */
  function factor(n) { const out = []; for (let p = 2; p * p <= n; p++) while (n % p === 0) { out.push(p); n /= p; } if (n > 1) out.push(n); return out; }
  const gcd = (a, b) => (b ? gcd(b, a % b) : a);
  const STONE = { n: 36501, used: 36500, factors: factor(36501), usedFactors: factor(36500), gcd: gcd(36501, 36500) };

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.hypot(a[0], a[1], a[2]);
  const unit = (a) => scale(a, 1 / norm(a));
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  function rotAbout(v, n, a) { const c = Math.cos(a), s = Math.sin(a), d = dot(n, v), x = cross(n, v); return [0, 1, 2].map((i) => v[i] * c + x[i] * s + n[i] * d * (1 - c)); }

  /* ---------- geometry ---------- */
  const R_S = 0.25, R_B = 0.5, R_CAGE = 0.31, R_D = 1.18;
  // the two laps of the ribbon keep their centre lines 2·0.17 = 0.34 apart, more than the width 2·0.16
  const RR = 0.72, RA = 0.17, RB = 0.17, RW = 0.16, RT = 0.06, RM = 0.16, MT = 0.034;
  const VIEW0 = [0.62, 0.66];
  /** The icosahedron with one vertex on +z, and its once-subdivided geodesic sphere (42 vertices, 80 faces). */
  const ICO = (() => {
    const g = (1 + Math.sqrt(5)) / 2, raw = [];
    for (const a of [-1, 1]) for (const b of [-g, g]) raw.push([0, a, b], [a, b, 0], [b, 0, a]);
    const v0 = unit(raw[0]), ax = unit(cross(v0, [0, 0, 1])), ang = Math.acos(clamp(v0[2], -1, 1));
    const verts = raw.map((p) => rotAbout(unit(p), ax, ang));
    const faces = [];
    for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) for (let k = j + 1; k < 12; k++) {
      const e = (a, b) => norm(sub(verts[a], verts[b]));
      const s = e(i, j);
      if (s < 1.2 && Math.abs(e(j, k) - s) < 1e-6 && Math.abs(e(i, k) - s) < 1e-6) {
        const n = cross(sub(verts[j], verts[i]), sub(verts[k], verts[i]));
        faces.push(dot(n, add(add(verts[i], verts[j]), verts[k])) > 0 ? [i, j, k] : [i, k, j]);
      }
    }
    return { verts, faces };
  })();
  const GEO = (() => {
    const verts = ICO.verts.slice(), cache = new Map(), faces = [];
    const mid = (a, b) => { const key = a < b ? `${a}|${b}` : `${b}|${a}`; if (!cache.has(key)) { cache.set(key, verts.length); verts.push(unit(add(verts[a], verts[b]))); } return cache.get(key); };
    for (const [a, b, c] of ICO.faces) { const ab = mid(a, b), bc = mid(b, c), ca = mid(c, a); faces.push([a, ab, ca], [b, bc, ab], [c, ca, bc], [ab, bc, ca]); }
    return { verts, faces };
  })();
  /** The sculpted stone: the icosahedron, each vertex pushed in or out a little (deterministic). */
  const STONE_V = ICO.verts.map((p, i) => scale(p, R_S * (1 + 0.07 * Math.sin(1.7 * i + 0.4))));
  /** The star-stones: a small octahedron at every vertex of the net (larger on the 12 icosahedral vertices). */
  const STARS = (() => {
    const vertices = [], faces = [], colors = [];
    const OCT = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    const OF = [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]];
    GEO.verts.forEach((d, i) => {
      const s = i < 12 ? 0.066 : 0.048, c = scale(d, R_D), base = vertices.length;
      OCT.forEach((o) => vertices.push(add(c, scale(o, s))));
      OF.forEach((f) => { faces.push(f.map((q) => base + q)); colors.push(i < 12 ? 'sigma' : 'cyan'); });
    });
    return { vertices, faces, colors };
  })();

  /** The ribbon frame at u (radians): centre c, tangent T, base normal n1 (toward +z), n2 = T × n1, the face normal f
      (the Zhen side) and the width direction g, both turned by u/2 about T. */
  function frame(u) {
    const r = RR + RA * Math.cos(u / 2), dr = -RA / 2 * Math.sin(u / 2);
    const c = [r * Math.cos(u), r * Math.sin(u), RB * Math.sin(u / 2)];
    const T = unit([dr * Math.cos(u) - r * Math.sin(u), dr * Math.sin(u) + r * Math.cos(u), RB / 2 * Math.cos(u / 2)]);
    const n1 = unit(sub([0, 0, 1], scale(T, T[2]))), n2 = cross(T, n1), w = u / 2;
    const f = add(scale(n1, Math.cos(w)), scale(n2, Math.sin(w))), g = add(scale(n1, -Math.sin(w)), scale(n2, Math.cos(w)));
    return { c, T, n1, n2, f, g };
  }
  const tipPt = (phiDeg) => { const F = frame(phiDeg * DEG); return add(F.c, scale(F.T, RM * 1.1)); };
  const stationPt = (theta, k, r = R_B) => { const ph = k * TAU / STATIONS; return [r * Math.sin(theta) * Math.cos(ph), r * Math.sin(theta) * Math.sin(ph), r * Math.cos(theta)]; };

  /* ---------- 2 × 2 complex matrices ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cconj = (a) => [a[0], -a[1]];
  const cexp = (t) => [Math.cos(t), Math.sin(t)];
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => { const x = cmul(A[i][0], B[0][j]), y = cmul(A[i][1], B[1][j]); return [x[0] + y[0], x[1] + y[1]]; }));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const mdag = (A) => [[cconj(A[0][0]), cconj(A[1][0])], [cconj(A[0][1]), cconj(A[1][1])]];
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const I2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
  const proj = (v) => [0, 1].map((i) => [0, 1].map((j) => cmul(v[i], cconj(v[j]))));
  const inner = (a, b) => { const x = cmul(cconj(a[0]), b[0]), y = cmul(cconj(a[1]), b[1]); return [x[0] + y[0], x[1] + y[1]]; };
  const trace = (A) => [A[0][0][0] + A[1][1][0], A[0][0][1] + A[1][1][1]];
  const chi = (theta, ph) => [[Math.cos(theta / 2), 0], scale2(cexp(ph), Math.sin(theta / 2))];
  function scale2(z, s) { return [z[0] * s, z[1] * s]; }
  const pinching = (A) => [[A[0][0], [0, 0]], [[0, 0], A[1][1]]];

  /* ---------- state ---------- */
  const S = { lens: 'mirror', drive: 'wind', phiDeg: 0, thetaDeg: TSTAR_DEG, M: 8, tau: 0, from: null, blend: 1 };
  /** What the drive of the card sets from the rail τ. */
  function driven() {
    const t = S.tau;
    if (S.drive === 'phi') return { phiDeg: 600 * t, M: S.M };
    if (S.drive === 'unloadM') return { phiDeg: S.phiDeg, M: Math.round(12 * (1 - t)) };
    return { phiDeg: 720 * t, M: S.M };   // wind, phiHalf, phiFull
  }
  /** The values the page shows: the drive, and θ blended from the previous card during a transition. */
  function eff() {
    const d = driven(), th = S.from && S.blend < 1 ? lerp(S.from.thetaDeg, S.thetaDeg, S.blend) : S.thetaDeg;
    return { phiDeg: d.phiDeg, M: d.M, thetaDeg: th };
  }

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), th = e.thetaDeg * DEG, ph = e.phiDeg * DEG, M = e.M;
    const delta = metaErr(th), gap = Math.abs(th - TSTAR), sd = schur(M);
    const omega = TAU * (1 - Math.cos(th)), gamma = PI * (1 - Math.cos(th));
    const A = sd * closure(e.phiDeg) * resonance(th);
    const re = Math.cos(ph / 2), im = -Math.sin(ph / 2), lam = blendOf(e.phiDeg);
    // Zhen and Jia are one only where the ribbon has closed after two turns, U = +1 exactly (|U − 1| < 10⁻⁶);
    // from 680° the faces are more than half blended, approaching +1, but not yet closed
    const faces = e.phiDeg >= 360 && Math.hypot(re - 1, im) < 1e-6 ? 'closed' : lam >= 0.5 ? 'approaching' : 'apart';
    return {
      e, phiDeg: e.phiDeg, thetaDeg: e.thetaDeg, theta: th, M, tau: S.tau, faces,
      spinor: { re, im, vector: Math.cos(ph), zhenUp: re },
      meta: { delta, gap, lower: gap, upper: 2 * gap, inBounds: gap <= delta + 1e-15 && delta <= 2 * gap + 1e-15 },
      berry: { omega, gamma, gammaDeg: gamma / DEG },
      schur: sd, Z: 1 - sd, unison: { A, closure: closure(e.phiDeg), resonance: resonance(th) },
      blend: lam
    };
  }

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(Mo) {
    const key = `${Mo.phiDeg}|${Mo.thetaDeg}`;
    if (instCache.has(key)) return instCache.get(key);
    const th = Mo.theta, ph = Mo.phiDeg * DEG;
    // 1. the cosine fixed point: in (0, 1), a fixed point, cos t − t strictly decreasing on (0, π/2]
    let slope = -Infinity; for (let j = 1; j <= 400; j++) { const t = j * (PI / 2) / 400; slope = Math.max(slope, -1 - Math.sin(t)); }
    const dottie = { theta: TSTAR, thetaDeg: TSTAR_DEG, residual: Math.abs(Math.cos(TSTAR) - TSTAR), inUnit: TSTAR > 0 && TSTAR < 1, maxSlope: slope };
    // 2. the mirror fold J = [[0, −1], [1, 0]] on (I_Zhen, î_Jia)
    const J = [[[0, 0], [-1, 0]], [[1, 0], [0, 0]]];
    const fold = { skewAdjoint: mmax(madd(mdag(J), J)), unitary: mmax(madd(mm(J, mdag(J)), I2, -1)), square: mmax(madd(mm(J, J), I2)),
      zhenToJia: [J[0][0][0], J[1][0][0]] };
    // 3. the double cover: base e^{−iφ}, lift U = e^{−iφ/2}; continuation from 1; the jump of the principal root at −1
    let liftResidual = 0, contResidual = 0, prev = [1, 0];
    for (let j = 0; j <= 240; j++) {
      const s = ph * j / 240, base = cexp(-s), lift = cexp(-s / 2), sq = cmul(lift, lift);
      liftResidual = Math.max(liftResidual, Math.hypot(sq[0] - base[0], sq[1] - base[1]));
      const r = cexp(Math.atan2(base[1], base[0]) / 2), alt = [-r[0], -r[1]];
      const pick = Math.hypot(r[0] - prev[0], r[1] - prev[1]) <= Math.hypot(alt[0] - prev[0], alt[1] - prev[1]) ? r : alt;
      contResidual = Math.max(contResidual, Math.hypot(pick[0] - lift[0], pick[1] - lift[1]));
      prev = pick;
    }
    const eps = 1e-6, above = cexp((PI - eps) / 2), below = cexp(-(PI - eps) / 2);
    const doubleCover = { liftResidual, contResidual, now: cexp(-ph / 2), atOneTurn: cexp(-PI), atTwoTurns: cexp(-TAU), branchJump: Math.hypot(above[0] - below[0], above[1] - below[1]) };
    // 4. characters of ℤ/12 summed over the annihilator of H = {0} (all twelve)
    const charSums = [];
    for (let x = 0; x < STATIONS; x++) { let re = 0, im = 0; for (let k = 0; k < STATIONS; k++) { re += Math.cos(TAU * k * x / STATIONS); im += Math.sin(TAU * k * x / STATIONS); } charSums.push([re, im]); }
    const charResidual = Math.max(...charSums.map((z, x) => Math.hypot(z[0] - (x === 0 ? STATIONS : 0), z[1])));
    // 5. pinching: the twelve-station average and one station
    const states = Array.from({ length: STATIONS }, (_, k) => chi(th, k * TAU / STATIONS));
    let avg = [[[0, 0], [0, 0]], [[0, 0], [0, 0]]];
    states.forEach((v) => { avg = madd(avg, proj(v), 1 / STATIONS); });
    const one = proj(states[0]);
    const pinch = { avgOffDiag: Math.hypot(...avg[0][1]), avgFixed: mmax(madd(pinching(avg), avg, -1)), avgDiag: [avg[0][0][0], avg[1][1][0]],
      stationOffDiag: Math.hypot(...one[0][1]), stationMoves: mmax(madd(pinching(one), one, -1)) };
    // 6. Bargmann path product over the twelve stations
    let prod = proj(states[0]); for (let k = 1; k < STATIONS; k++) prod = mm(prod, proj(states[k]));
    const tr = trace(prod);
    let path = [1, 0]; for (let k = 0; k + 1 < STATIONS; k++) path = cmul(path, inner(states[k], states[k + 1]));
    path = cmul(path, inner(states[STATIONS - 1], states[0]));
    const bargmann = { trace: tr, path, residual: Math.hypot(tr[0] - path[0], tr[1] - path[1]), arg: Math.atan2(path[1], path[0]), argDeg: Math.atan2(path[1], path[0]) / DEG, modulus: Math.hypot(...path) };
    // 7. the three-anchor Bargmann invariant from the Bloch vectors of stations 0, 4, 8
    const r = [0, 4, 8].map((k) => { const p = k * TAU / STATIONS; return [Math.sin(th) * Math.cos(p), Math.sin(th) * Math.sin(p), Math.cos(th)]; });
    const qp = (v) => [[[(1 + v[2]) / 2, 0], [v[0] / 2, -v[1] / 2]], [[v[0] / 2, v[1] / 2], [(1 - v[2]) / 2, 0]]];
    const t3 = trace(mm(mm(qp(r[0]), qp(r[1])), qp(r[2])));
    const formula = [(1 + dot(r[0], r[1]) + dot(r[1], r[2]) + dot(r[2], r[0])) / 4, dot(r[0], cross(r[1], r[2])) / 4];
    const triple = { trace: t3, formula, residual: Math.hypot(t3[0] - formula[0], t3[1] - formula[1]), argDeg: Math.atan2(t3[1], t3[0]) / DEG, bloch: r };
    const out = { dottie, fold, doubleCover, characters: { sums: charSums, residual: charResidual }, pinch, bargmann, triple };
    instCache.set(key, out);
    if (instCache.size > 80) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probeEl = document.createElement('div'); probeEl.hidden = true; probeEl.style.position = 'absolute'; tagBox.appendChild(probeEl);
  const options = { canvas: $('cv'), yaw: VIEW0[0], pitch: VIEW0[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const sc = kit.solid(stageEl, options);
  if (TRV.still) stageEl.classList.add('still');

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && el.textContent.trim()) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 10, y: top, w: Math.max(40, W - 20), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probeEl.className = 'tag ' + cls; probeEl.innerHTML = html; probeEl.hidden = false; s = [probeEl.offsetWidth, probeEl.offsetHeight]; probeEl.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function placeLabels() {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const base = Math.atan2(l.dir[1], l.dir[0]), cands = [];
      for (const r of [l.r, l.r + 10, l.r + 24, l.r + 40]) for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
        const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
        cands.push([ux * (r + ext), uy * (r + ext)]);
      }
      let ok = null;
      for (const [dx, dy] of cands) {
        const b = { x: l.q[0] + dx - w / 2, y: l.q[1] + dy - h / 2, w, h };
        if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
        if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
        ok = b; break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      sc.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed;
  }

  /* ---------- fitting ---------- */
  const BOX = { x0: -(R_D + 0.07), x1: R_D + 0.07, y0: -(R_D + 0.07), y1: R_D + 0.07 };
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 4 : 8, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  let FRAME = null, FIT = null, TAGS = [], AX = null, GEOM = null, PLOT = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };

  /** The stone, the Bloch glass, the Berry cap with its twelve meridians and stations, the manas cage. */
  function drawCore(Mo) {
    const th = Mo.theta, lens = S.lens;
    sc.poly('stone', { vertices: STONE_V, faces: ICO.faces }, { color: P.sigma, edges: P.ink });
    sc.glass('bloch', [0, 0, 0], R_B, { color: P.cyan, alpha: 0.05 });
    // the far half of the Bloch sphere (about the view), just outside the cap: an opaque dim wall, so the ball reads as
    // a ball and what passes behind it is hidden; the cap, the cage and the stone stay in front of it
    const D = AX.D, b1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), b2 = cross(D, b1), RW0 = R_B + 0.014;
    sc.surface('bloch-back', (s, v) => {
      const t = s * PI / 2, ps = TAU * v, d = add(scale(D, -Math.cos(t)), add(scale(b1, Math.sin(t) * Math.cos(ps)), scale(b2, Math.sin(t) * Math.sin(ps))));
      return scale(d, RW0);
    }, { u: [0, 1], v: [0, 1], nu: 16, nv: 48, colors: [P.panelEdge, P.faint], value: (s, v) => {
      const t = s * PI / 2, ps = TAU * v; return (1 + (-D[2] * Math.cos(t) + b1[2] * Math.sin(t) * Math.cos(ps) + b2[2] * Math.sin(t) * Math.sin(ps))) / 2;
    }, range: [0, 1], pick: false });
    if (th > 0.3 * DEG) {
      sc.surface('cap', (s, v) => {
        const t = s * th, ph = TAU * v, r = R_B + 0.008 * (1 - s * s) ** 2;
        return [r * Math.sin(t) * Math.cos(ph), r * Math.sin(t) * Math.sin(ph), r * Math.cos(t)];
      }, { u: [0, 1], v: [0, 1], nu: 16, nv: 48, color: P.violet, grid: { every: [16, 4], color: P.ink, alpha: 0.6 }, pick: false });
      for (let k = 0; k < STATIONS; k++) sc.bead(stationPt(th, k, R_B + 0.004), { key: `station${k}`, color: P.violet, r: k % 4 === 0 ? 4.4 : 3.2 });
      if (lens === 'unity') {
        at(stationPt(th * 0.55, 1, R_B), `Ω = ${fix(Mo.berry.omega, 4)} sr · |γ| = ${fix(Mo.berry.gammaDeg, 2)}°`, 'raw c-vi backed', 9, [0.6, -1]);
        at(stationPt(th, 7, R_B), L('Γ · 十二站', 'Γ · twelve stations'), 'raw c-vi backed', 6, null);
      }
    } else if (lens === 'unity') at([0, 0, R_B], L('θ = 0 · 冠缩成一点', 'θ = 0 · the cap is a point'), 'raw c-vi backed', 6, [0.4, -1]);
    // the manas cage: M meridian bars inside the glass
    for (let k = 0; k < Mo.M; k++) {
      const ph = (k + 0.5) * TAU / 12;
      tube(`cage${k}`, range(0.14 * PI, 0.86 * PI, 18).map((t) => [R_CAGE * Math.sin(t) * Math.cos(ph), R_CAGE * Math.sin(t) * Math.sin(ph), R_CAGE * Math.cos(t)]), P.magenta, 3, { glow: 0.4 });
    }
    if (Mo.M >= 2) for (const [key, t] of [['cage-top', 0.2 * PI], ['cage-bottom', 0.8 * PI]]) {
      tube(key, range(0, TAU, 48).map((ph) => [R_CAGE * Math.sin(t) * Math.cos(ph), R_CAGE * Math.sin(t) * Math.sin(ph), R_CAGE * Math.cos(t)]), P.magenta, 1.6, { glow: 0.3, alpha: 0.85 });
    }
    if (lens === 'unity') {
      const pc = [R_CAGE * Math.cos(0.5 * TAU / 12) * 0.9, R_CAGE * Math.sin(0.5 * TAU / 12) * 0.9, -0.12];
      at(pc, Mo.M > 0 ? `M = ${Mo.M} · Z = ${fix(Mo.Z, 3)}` : L('M = 0 · 末那笼已卸', 'M = 0 · the manas cage is gone'), 'raw c-mg backed', 8, [0.3, 1]);
    }
    at([0, 0, -R_S], L('余石 36501 = 3·23³', 'surplus stone 36501 = 3·23³'), 'raw c-sg backed', 5, [-0.4, 1]);
  }

  /** The ribbon swept by the mirror, the mirror itself, the amber tip, the vector arrow. */
  function drawRibbon(Mo) {
    const phi = Mo.phiDeg * DEG, lam = Mo.blend, lens = S.lens;
    const face = (v) => 0.5 + 0.5 * (1 - lam) * Math.tanh(5 * Math.sin(TAU * v));
    if (Mo.phiDeg >= 1) {
      const nu = Math.max(4, Math.ceil(Mo.phiDeg / 720 * 220));
      sc.surface('ribbon', (s, v) => {
        const F = frame(s * phi), a = TAU * v;
        return add(F.c, add(scale(F.g, RW * Math.cos(a)), scale(F.f, RT * Math.sin(a))));
      }, { u: [0, 1], v: [0, 1], nu, nv: 18, colors: [P.magenta, P.violet, P.cyan], value: (s, v) => face(v), range: [0, 1], grid: { every: [Math.max(1, Math.round(nu / 24)), 9], color: P.ink, alpha: 0.12 }, pick: false });
    }
    // the mirror at the tip: an octagonal pillow in the plane of the ribbon, Zhen face along f
    const F = frame(phi), oct = (a) => RM * Math.cos(PI / 8) / Math.cos(((a % (PI / 4)) + PI / 4) % (PI / 4) - PI / 8);
    sc.surface('mirror', (s, v) => {
      const a = TAU * s, b = PI * v, rr = oct(a) * Math.sin(b);
      return add(F.c, add(add(scale(F.g, rr * Math.cos(a)), scale(F.T, rr * Math.sin(a))), scale(F.f, MT * Math.cos(b))));
    }, { u: [0, 1], v: [0, 1], nu: 48, nv: 12, colors: [P.magenta, P.violet, P.cyan], value: (s, v) => 0.5 + 0.5 * (1 - lam) * Math.tanh(4 * Math.cos(PI * v)), range: [0, 1], grid: { every: [6, 12], color: P.ink, alpha: 0.25 }, pick: false });
    const tip = tipPt(Mo.phiDeg);
    sc.bead(tip, { key: 'tip', color: P.amber, r: 5.5 });
    sc.bead(frame(0).c, { key: 'start', color: P.ink, r: 3.2 });
    const vec = add(scale(F.n1, Math.cos(phi)), scale(F.n2, Math.sin(phi)));
    if (lens === 'mirror') {
      sc.arrow(F.c, add(F.c, scale(vec, 0.24)), { color: P.ink, width: 2.2, headSize: 8 });
      at(add(F.c, scale(vec, 0.24)), `${L('矢量', 'vector')} cos Φ = ${fix(Mo.spinor.vector, 2)}`, 'raw c-ik backed', 7, null);
      if (Mo.faces === 'apart') {
        at(add(F.c, scale(F.f, 0.07)), L('甄 · 真', 'Zhen · real'), 'raw c-cy backed', 8, null);
        at(add(F.c, scale(F.f, -0.07)), L('贾 · 梦', 'Jia · dream'), 'raw c-mg backed', 8, null);
      } else at(add(F.c, scale(F.f, 0.07)), Mo.faces === 'closed' ? L('甄贾合一 · +1', 'Zhen and Jia as one · +1') : L('甄贾渐合 · 趋近 +1', 'Zhen and Jia blending · approaching +1'), 'raw c-vi backed', 8, null);
      if (Mo.phiDeg < 660) at(frame(0).c, 'Φ = 0', 'raw c-ik backed', 4, null);
    }
    at(tip, `Φ = ${Math.round(Mo.phiDeg)}° · U = ${cplx(Mo.spinor.re, Mo.spinor.im, 2)}`, 'raw c-ik backed', 10, null);
  }

  /** Indra's net: the 42 star-stones, the net, and the twelve Heaven–Human filaments. */
  function drawNet(Mo) {
    sc.poly('stars', { vertices: STARS.vertices, faces: STARS.faces }, { colors: STARS.colors.map((c) => P[c]), edges: false });
    sc.poly('net', { vertices: GEO.verts.map((d) => scale(d, R_D)), faces: GEO.faces }, { color: P.cyan, alpha: 0, edges: P.cyan, pick: false, occlude: false });
    const A = Mo.unison.A;
    let shown = 0;
    if (A > 0.02) ICO.verts.forEach((d, i) => {
      const e = unit(cross(d, Math.abs(d[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])), r0 = R_B + 0.03, r1 = R_D - 0.05;
      tube(`thread${i}`, range(0, 1, 60).map((s) => add(scale(d, r0 + s * (r1 - r0)), scale(e, 0.04 * A * Math.sin(5 * PI * s)))), i % 2 ? P.cyan : P.sigma, 1.2 + 2.4 * A, { glow: 0.6 });
      shown++;
    });
    if (S.lens === 'unity') {
      if (shown) at(scale(ICO.verts[3], R_D * 0.8), `${L('天人同频', 'Heaven–Human')} A = ${fix(A, 2)}`, 'raw c-sg backed', 9, null);
      at(scale(GEO.verts[20], R_D), L('因陀罗网 · 42', 'net of Indra · 42'), 'raw c-cy backed', 4, null);
    }
    return shown;
  }

  function drawStage(Mo) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 10, y: 10, w: W - 20, h: H - 20 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: BOX };
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawCore(Mo);
    drawRibbon(Mo);
    const threads = drawNet(Mo);
    sc.end();
    const hq = thumb || TRV.still ? null : sc.p(tipPt(Mo.phiDeg));
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    else { const tq = sc.p(tipPt(Mo.phiDeg)); OBST.push({ x: tq[0] - 9, y: tq[1] - 9, w: 18, h: 18 }); }   // labels keep off the tip
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 10 });
      });
      placeLabels();
    }
    GEOM = { stoneFaces: ICO.faces.length, netVertices: GEO.verts.length, netFaces: GEO.faces.length, cageBars: Mo.M, threads, ribbon: Mo.phiDeg >= 1 };
    FRAME = { W, H, area: FIT.area, box: FIT.box, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: the leading edge of the mirror ---------- */
  const handle = $('awakenHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = L('沿旋量带拖动改 Φ', 'Drag along the spinor ribbon to set Φ');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  /** The angle Φ near the current one whose tip lies nearest the pointer (a local search: the two laps overlap on screen). */
  function dragTo(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const now = model().phiDeg;
    let best = now, bd = Infinity;
    for (let d = -60; d <= 60; d += 0.5) {
      const v = clamp(now + d, 0, 720), q = sc.p(tipPt(v)), e = Math.hypot(q[0] - x, q[1] - y);
      if (e < bd) { bd = e; best = v; }
    }
    setPhi(Math.round(best));
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    dragTo(ev);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown') return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    setPhi(Math.round(model().phiDeg) + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1));
  });

  /* ---------- HUD, legend, readouts ---------- */
  function legendItems(Mo) {
    if (S.lens === 'unity') return [['vi', L('带相冠 Ω(θ)', 'Berry cap Ω(θ)')], ['mg', L(`末那笼 M = ${Mo.M}`, `manas cage M = ${Mo.M}`)], ['sg', L('天人同频丝', 'Heaven–Human filaments')], ['cy', L('因陀罗网', 'net of Indra')]];
    return [['cy', L('甄面 · 真', 'Zhen face · real')], ['mg', L('贾面 · 梦', 'Jia face · dream')], ['vi', L('合拢 720°', 'closed at 720°')], ['sg', L('余石', 'surplus stone')]];
  }
  function hudText(Mo) {
    let big, sub;
    if (S.lens === 'unity') {
      big = `θ = ${fix(Mo.thetaDeg, 2)}° · δ<sub>meta</sub> = ${fix(Mo.meta.delta, 4)}`;
      sub = `Ω = ${fix(Mo.berry.omega, 4)} sr · |γ| = ${fix(Mo.berry.gammaDeg, 2)}° · M = ${Mo.M} · A = ${fix(Mo.unison.A, 2)}`;
    } else {
      big = `Φ = ${Math.round(Mo.phiDeg)}° · U(Φ) = ${cplx(Mo.spinor.re, Mo.spinor.im, 4)}`;
      sub = `${L('甄', 'Zhen')} cos(Φ/2) = ${fix(Mo.spinor.re, 4)} · ${L('贾', 'Jia')} sin(Φ/2) = ${fix(-Mo.spinor.im, 4)} · ${L('矢量', 'vector')} cos Φ = ${fix(Mo.spinor.vector, 4)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems(Mo).map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const FORMULA = {
    mirror: 'U(Φ) = cos(Φ/2) − î sin(Φ/2) · J = [[0, −1], [1, 0]], J² = −1 · U(360°) = −1, U(720°) = +1',
    unity: 'δ<sub>meta</sub> = |cos θ − θ| · Ω = 2π(1 − cos θ) · A = Δ<sub>Schur</sub>(M)·cos²(Φ/4)·[1 + 100 δ<sub>meta</sub>²]⁻¹'
  };
  function drawText(Mo) {
    const I = instances(Mo);
    $('roKey').textContent = cplx(Mo.spinor.re, Mo.spinor.im, 4);
    $('roKeySub').innerHTML = ` · Φ = ${Math.round(Mo.phiDeg)}°`;
    $('roSpin').innerHTML = `cos Φ = ${fix(Mo.spinor.vector, 4)} · cos(Φ/2) = ${fix(Mo.spinor.re, 4)}`;
    $('roMeta').innerHTML = `${fix(Mo.meta.delta, 6)} · ${fix(Mo.meta.lower, 6)} ≤ δ ≤ ${fix(Mo.meta.upper, 6)}`;
    $('roBerry').innerHTML = `${fix(Mo.berry.omega, 6)} sr · ${fix(Mo.berry.gamma, 6)} rad = ${fix(Mo.berry.gammaDeg, 4)}°`;
    $('roDisc').innerHTML = `${fix(I.bargmann.argDeg, 4)}° · ${fix(I.triple.argDeg, 4)}°`;
    $('roManas').innerHTML = `M = ${Mo.M} · Z = ${fix(Mo.Z, 4)} · Δ = ${fix(Mo.schur, 4)}`;
    $('roUnison').innerHTML = `A = ${fix(Mo.unison.A, 4)} · ${L('残差', 'residual')} ${fix(I.pinch.avgOffDiag, 6)}`;
    $('roNote').innerHTML = noteFor(Mo, I);
    $('scenePill').innerHTML = `HONG <strong>${S.lens === 'unity' ? L('天人同频', 'RESONANCE') : L('虚实对镜', 'MIRROR')}</strong>`;
    $('keyPill').innerHTML = `U <strong>${cplx(Mo.spinor.re, Mo.spinor.im, 2)}</strong>`;
    $('hint').innerHTML = S.drive === 'unloadM'
      ? L('时间轴卸掉末那负载 M = 12 → 0 · 拖空白处转视角', 'the rail unloads the manas M = 12 → 0 · drag empty space to orbit')
      : L('拖琥珀手柄沿带子改 Φ · 拖空白处转视角', 'drag the amber handle along the ribbon to set Φ · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.lens];
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'unity'));
  }
  function noteFor(Mo, I) {
    if (S.lens === 'unity') {
      return L(`十二站平均：特征和 Σ e<sup>2πikx/12</sup> 抹掉非对角元（残差 ${fix(I.pinch.avgOffDiag, 6)}），带相留下：arg Π₁₂ = ${fix(I.bargmann.argDeg, 4)}°，Ω/2 = ${fix(Mo.berry.gammaDeg, 4)}°。`,
        `Twelve-station average: the character sum Σ e<sup>2πikx/12</sup> removes the off-diagonal terms (residual ${fix(I.pinch.avgOffDiag, 6)}) while the Berry phase stays: arg Π₁₂ = ${fix(I.bargmann.argDeg, 4)}°, Ω/2 = ${fix(Mo.berry.gammaDeg, 4)}°.`);
    }
    return L(`J² = −1（残差 ${fix(I.fold.square, 6)}）：提升 U = e<sup>−iΦ/2</sup> 的平方就是矢量 e<sup>−iΦ</sup>；主值平方根在 −1 两侧相差 ${fix(I.doubleCover.branchJump, 4)}。`,
      `J² = −1 (residual ${fix(I.fold.square, 6)}): the lift U = e<sup>−iΦ/2</sup> squares to the vector e<sup>−iΦ</sup>; the principal square root jumps by ${fix(I.doubleCover.branchJump, 4)} across −1.`);
  }

  /* ---------- strip plot ---------- */
  function drawPlot(Mo) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    if (S.lens === 'unity') {
      $('plotTitle').textContent = L('自指误差 |cos θ − θ| 只在 θ* 处为零', 'The self-reference error |cos θ − θ| vanishes only at θ*');
      // δ_meta reaches π/2 at θ = 90° and the upper bound 2|θ − θ*| reaches 2(π/2 − θ*) = 1.66 there: the range holds both
      const xs = range(0, TH_MAX, 360), yMax = Math.max(PI / 2, 2 * (PI / 2 - TSTAR)) + 0.04;
      PLOT = { lens: 'unity', x: [0, TH_MAX], y: [0, yMax] };
      const g = kit.plot(cv, { x: PLOT.x, y: PLOT.y, pad });
      g.axes({ xTicks: [0, 15, 30, 45, 60, 75, 90], yTicks: [0, 0.5, 1, [PI / 2, 'π/2']], xLabel: 'θ (°)' });
      g.vline(TSTAR_DEG, P.ink, { alpha: 0.6, dash: [4, 4] });
      g.line(xs.map((x) => [x, metaErr(x * DEG)]), P.violet, { width: 2.2 });
      g.line(xs.map((x) => [x, 2 * Math.abs(x * DEG - TSTAR)]), P.ink, { width: 1, dash: [3, 4], alpha: 0.7 });
      g.line(xs.map((x) => [x, Math.abs(x * DEG - TSTAR)]), P.ink, { width: 1, dash: [3, 4], alpha: 0.7 });
      g.vline(Mo.thetaDeg, P.amber, { alpha: 0.85 }); g.dot(Mo.thetaDeg, Mo.meta.delta, P.amber, 3.8);
      $('plotMeta').innerHTML = `θ* = ${fix(TSTAR_DEG, 4)}° · δ<sub>meta</sub>(θ) = ${fix(Mo.meta.delta, 6)}`;
    } else {
      $('plotTitle').textContent = L('矢量 360° 回家，镜面要 720°：cos Φ 与 cos(Φ/2)', 'The vector is home at 360°, the mirror at 720°: cos Φ and cos(Φ/2)');
      PLOT = { lens: 'mirror', x: [0, 720], y: [-1.1, 1.1] };
      const g = kit.plot(cv, { x: PLOT.x, y: PLOT.y, pad });
      g.axes({ xTicks: [0, 180, 360, 540, 720], yTicks: [-1, 0, 1], xLabel: 'Φ (°)' });
      g.hline(0, P.ink, { alpha: 0.35 });
      g.line(range(0, 720, 360).map((x) => [x, Math.cos(x * DEG)]), P.ink, { width: 1.6, alpha: 0.8 });
      g.line(range(0, 720, 360).map((x) => [x, Math.cos(x * DEG / 2)]), P.cyan, { width: 2.2 });
      g.vline(Mo.phiDeg, P.amber, { alpha: 0.85 }); g.dot(Mo.phiDeg, Mo.spinor.re, P.amber, 3.8);
      $('plotMeta').innerHTML = `cos Φ = ${fix(Mo.spinor.vector, 4)} · cos(Φ/2) = ${fix(Mo.spinor.re, 4)}`;
    }
  }

  const paint = kit.painter(() => {
    const Mo = model();
    hudText(Mo); TRV.hudFit();
    drawStage(Mo); drawText(Mo); drawPlot(Mo);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the story τ of the card ---------- */
  const playBtn = $('playBtn');
  const railLabel = (t) => {
    if (S.drive === 'unloadM') return `τ ${fix(t, 2)} · M = ${Math.round(12 * (1 - t))}`;
    return `τ ${fix(t, 2)} · Φ = ${Math.round((S.drive === 'phi' ? 600 : 720) * t)}°`;
  };
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.1, step: 0.025, loop: true,
    format: (t) => `${railLabel(t)} <small>/ 1</small>`,
    onChange: (t, C) => { S.tau = t; syncFields(); playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

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
    bootIO.observe(stageEl);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  /** Blend θ from `from` to the target over ms. */
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the current values become the state, the rail winds Φ = 720°·τ, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    clock.pause();   // pause emits with the old drive: the drive changes only after it
    S.thetaDeg = e.thetaDeg; S.M = e.M; S.phiDeg = e.phiDeg; S.from = null; S.blend = 1; S.drive = 'wind';
    cards.mark(null); clock.set(clamp(e.phiDeg / 720, 0, 1), true); S.tau = clock.t;
    syncFields();
  }
  // leave() syncs the controls to the values it freezes; each handler then assigns the new value first and only then
  // syncs the slider and its <output> and redraws, so what the control shows is always the state
  const fPhi = kit.field($('spinorPhi'), { fmt: (v) => `${Math.round(v)}°`, onInput: (v) => { leave(); setPhi(v); syncFields(); paint(); } });
  const fTheta = kit.field($('tiltTheta'), { fmt: (v) => `${fix(v, 2)}°`, onInput: (v) => { leave(); S.thetaDeg = clamp(v, 0, TH_MAX); syncFields(); paint(); } });
  const fM = kit.field($('manasLoad'), { fmt: (v) => `${Math.round(v)}`, onInput: (v) => { leave(); S.M = clamp(Math.round(v), 0, 12); syncFields(); paint(); } });
  function syncFields() { const e = eff(); fPhi.set(Math.round(e.phiDeg)); fTheta.set(Math.round(e.thetaDeg * 100) / 100); fM.set(e.M); }
  function setPhi(v) { const x = clamp(v, 0, 720); S.phiDeg = x; clock.set(x / 720); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { S.lens = S.lens === 'mirror' ? 'unity' : 'mirror'; paint(); });

  /* ---------- experiment cards ---------- */
  // θ is put at θ* itself (the slider, in steps of 0.01°, shows 42.35°)
  const PRESETS = {
    'chaos-unhewn-stone': { lens: 'mirror', phi: 0, thetaDeg: 0, M: 0, drive: 'wind', play: false, still: 0 },
    'red-dust-delusion-mismatch': { lens: 'mirror', phi: 120, thetaDeg: 62, M: 8, drive: 'phi', play: true, still: 0.2 },
    'fengyue-mirror-double-turn': { lens: 'mirror', phi: 360, thetaDeg: TSTAR_DEG, M: 5, drive: 'phiHalf', play: true, still: 0.5 },
    'mobius-720-virtual-real-unity': { lens: 'mirror', phi: 720, thetaDeg: TSTAR_DEG, M: 3, drive: 'phiFull', play: true, still: 1 },
    'greensickness-berry-unity': { lens: 'unity', phi: 720, thetaDeg: TSTAR_DEG, M: 0, drive: 'unloadM', play: true, still: 1 }
  };
  const NOTES = {
    'chaos-unhewn-stone': ['混沌未凿：余石（36501 = 3·23³，与 36500 = 2²·5³·73 互素）孤零零在中心，θ = 0，带相冠缩成一点，Ω = 0；镜子停在起点，青色甄面朝上，Φ = 0，旋量读 +1；没有末那笼，可是 θ = 0 离不动点很远，δ<sub>meta</sub> = |cos 0 − 0| = 1，天人同频丝不亮。按 ▶，时间轴把 Φ 从 0 卷到 720°。',
      'The unhewn stone: the surplus stone (36501 = 3·23³, coprime to 36500 = 2²·5³·73) sits alone at the centre, θ = 0, the Berry cap shrinks to a point, Ω = 0; the mirror rests at the start with its cyan Zhen face up, Φ = 0, the spinor reads +1; there is no manas cage, but θ = 0 is far from the fixed point, δ<sub>meta</sub> = |cos 0 − 0| = 1, and the Heaven–Human filaments stay dark. Press ▶ and the rail winds Φ from 0 to 720°.'],
    'red-dust-delusion-mismatch': ['红尘迷途：θ = 62°，八根品红末那笼（Z = 0.963）把石头关住。这张卡的时间轴只卷到 Φ = 600°，差 120° 合不拢：τ = 0.2 时 Φ = 120°，镜面转了 60°，U = cos 60° − î sin 60° = 0.50 − 0.87î，墨色矢量 cos Φ = −0.50；带子一直是一段敞口的青、品红两色带，首尾接不上。δ<sub>meta</sub>(62°) = 0.6126。',
      'Red dust: θ = 62°, eight magenta bars of the manas cage (Z = 0.963) shut the stone in. On this card the rail only winds to Φ = 600°, 120° short of closing: at τ = 0.2, Φ = 120°, the mirror has turned 60°, U = cos 60° − î sin 60° = 0.50 − 0.87î and the ink vector cos Φ = −0.50; the ribbon stays an open band of cyan and magenta whose ends never meet. δ<sub>meta</sub>(62°) = 0.6126.'],
    'fengyue-mirror-double-turn': ['风月宝鉴转一圈：Φ = 360° 时墨色矢量已转回原处（cos Φ = 1），镜子却只转了 180°，贾面朝外，旋量 U = cos 180° = −1；J 把甄转到贾，J² = −1。带子绕石一圈，起点处是青色甄面，此处翻成品红贾面，接不上——这道缝就是没有连续全局截面。θ = θ*，五根末那笼。',
      'One turn of the Fengyue Baojian: at Φ = 360° the ink vector is back home (cos Φ = 1), but the mirror has only turned 180° and shows its Jia face, the spinor U = cos 180° = −1; J turns Zhen into Jia and J² = −1. The ribbon has gone once around the stone, cyan Zhen at the start and magenta Jia here: it cannot be joined, which is the missing continuous global section. θ = θ*, five bars of the manas cage.'],
    'mobius-720-virtual-real-unity': ['莫比乌斯 720° 合拢：τ = 1 时 Φ = 720°，镜面转满 360°，U = +1；带子绕石两圈首尾无缝相接，640° 之后甄贾两面渐变，此刻合成均匀的紫色。θ = θ* 处 δ<sub>meta</sub> = 0.0000，紫色带相冠围出 Ω = 1.6394 sr；还剩三根末那笼（Z = 0.8125），同频丝只微亮 A = 0.19。',
      'Möbius closure at 720°: at τ = 1, Φ = 720°, the mirror has turned a full 360° and U = +1; the ribbon has wound twice around the stone and closes without a seam, the Zhen and Jia faces blending after 640° into one even violet. At θ = θ*, δ<sub>meta</sub> = 0.0000 and the violet Berry cap encloses Ω = 1.6394 sr; three bars of the manas cage remain (Z = 0.8125), so the filaments glow only faintly, A = 0.19.'],
    'greensickness-berry-unity': ['青埂峰下的带相归元：Φ = 720°、θ = θ* 不动，时间轴把末那负载从 M = 12 卸到 0：品红笼一根根消失，Z(M) = 13M/(12(M + 1)) 从 1 降到 0。M = 0 时十二根银白、青色驻波丝从石头通到因陀罗网的二十面体顶点，A = 1.00。十二站平均后非对角元为 0，带相 |γ| = π(1 − θ*) = 46.96° 留下。',
      'The Berry return below Greensickness Peak: Φ = 720° and θ = θ* hold, and the rail unloads the manas from M = 12 to 0: the magenta bars vanish one by one and Z(M) = 13M/(12(M + 1)) falls from 1 to 0. At M = 0 twelve silver and cyan standing-wave filaments run from the stone to the icosahedral vertices of Indra net, A = 1.00. After the twelve-station average the off-diagonal terms are 0, while the Berry phase |γ| = π(1 − θ*) = 46.96° stays.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'chaos-unhewn-stone': ['混沌未凿：θ = 0，冠缩成一点；镜子停在起点，青色甄面朝上，Φ = 0。', 'The unhewn stone: θ = 0, the cap is a point; the mirror rests at the start, cyan Zhen face up, Φ = 0.'],
    'red-dust-delusion-mismatch': ['红尘迷途：八根品红笼关住石头，只卷到 600°，差 120° 合不拢。', 'Red dust: eight magenta bars shut the stone in; it winds only to 600°, 120° short of closing.'],
    'fengyue-mirror-double-turn': ['转一圈：墨色矢量回到原处，镜子却翻成品红贾面，旋量读 −1。', 'One turn: the ink vector is home, but the mirror shows its magenta Jia face and the spinor reads −1.'],
    'mobius-720-virtual-real-unity': ['转满 720°：带子绕两圈无缝合拢，甄贾两面合成一片紫色，旋量读 +1。', 'At 720° the ribbon closes after two turns, Zhen and Jia blend into one violet, the spinor reads +1.'],
    'greensickness-berry-unity': ['卸到 M = 0：品红笼消失，十二根同频丝点亮，带相 46.96° 留下。', 'Unloaded to M = 0: the magenta cage is gone, twelve filaments light up, the Berry phase of 46.96° stays.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.lens = p.lens; S.drive = p.drive; S.phiDeg = p.phi; S.thetaDeg = p.thetaDeg; S.M = p.M; S.from = null; S.blend = 1;
    sc.view([VIEW0[0], VIEW0[1], 1], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still) startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 Φ、θ 与 M，换透镜，拖琥珀手柄。时间轴现在把 Φ 从 0 卷到 720°。随时可以再选一张卡。', 'Free play: pull Φ, θ and M, switch the lens, drag the amber handle. The rail now winds Φ from 0 to 720°. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.RED_CHAMBER_AWAKEN_DEBUG = Object.freeze({
    get state() {
      const Mo = model(), I = instances(Mo);
      const F = frame(Mo.phiDeg * DEG), F0 = frame(0), F720 = frame(4 * PI);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, drive: S.drive, blending: !!(S.from && S.blend < 1),
        phiDeg: Mo.phiDeg, thetaDeg: Mo.thetaDeg, theta: Mo.theta, M: Mo.M, tau: S.tau, faces: Mo.faces, plot: PLOT,
        constants: { thetaStar: TSTAR, thetaStarDeg: TSTAR_DEG, D: D_EFF, rho: RHO, stations: STATIONS, rStone: R_S, rBloch: R_B, rNet: R_D, rCage: R_CAGE,
          ribbon: { RR, RA, RB, RW, RT }, stone: STONE },
        spinor: Mo.spinor, meta: Mo.meta, berry: Mo.berry, schur: Mo.schur, Z: Mo.Z, unison: Mo.unison, blend: Mo.blend,
        mirror: { faceDotN1: dot(F.f, F.n1), vectorDotN1: dot(add(scale(F.n1, Math.cos(Mo.phiDeg * DEG)), scale(F.n2, Math.sin(Mo.phiDeg * DEG))), F.n1),
          closureGap: Math.max(norm(sub(F720.c, F0.c)), norm(sub(F720.f, F0.f)), norm(sub(F720.g, F0.g))), halfTurnFace: dot(frame(TAU).f, frame(TAU).n1) },
        geometry: GEOM, icoVertices: ICO.verts, leanInstances: I,
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock, the rail winds Φ). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'unity' ? 'unity' : 'mirror';
      if (o.thetaDeg != null) S.thetaDeg = clamp(o.thetaDeg, 0, TH_MAX);
      if (o.M != null) S.M = clamp(Math.round(o.M), 0, 12);
      if (o.phiDeg != null) setPhi(o.phiDeg);
      syncFields();
      paint();
    },
    /** Viewport coordinates of the handle (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for Φ (degrees), for drag targets. */
    dragTarget(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(tipPt(v)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('mobius-720-virtual-real-unity'); clock.pause(); clock.set(0.86); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('mobius-720-virtual-real-unity'));
  booting = false;
  paint();
})();
