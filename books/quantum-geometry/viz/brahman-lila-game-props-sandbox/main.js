/* LILA//PROPS · 梵天游戏道具 · Divine Līlā props
   World (kit.solid): z up. The silver real axis I stands on the z axis from −1.05 to 1.05 and never moves. Around it
   lies the opaque consensus dream torus (R = 0.86, r = 0.24), dented on top at azimuths 0°, 120°, 240° (the
   stationary-phase basins, minor radius r·(1 − 0.2·B(u)·max(0, sin v)²), B(u) = ((1 + cos 3u)/2)⁶). In the basins
   sit three cyan relics (stepped pyramid, megalith trilithon, inscribed cliff stele), each pierced by K ∈ [1, K_MAX = 8]
   cross-epoch worldlines; at 60°, 180°, 300° float three violet clusters of classics. The amber avatar sits on the
   torus at azimuth ψ = 360°·τ·ν(M), ν(M) = min(1, √(Δ_Schur(M)/Δ_Schur(3))), with Δ_Schur(M) = (12 − M)/(12(M + 1))
   the Schur ratio of D = 12 equally correlated members (ρ = 1/2) of which M are remembered: at M = 12, Δ = 0 and the
   avatar cannot move. A relic it visits rings with the Fejér kernel I_K = |Σ_k e^{ikδ}/K|², δ = 12(α − θ*); the
   twelve-pass lock of the classics P⁽¹²⁾(α) = cos²⁴(α − θ*) fires silver clearance beams at the axis. The reader
   basis angle α ∈ [0°, 90°] lives on a protractor arc in camera space (right of the torus, below it on narrow
   stages) with the violet lobe of the twelve-pass lock and the cyan lobe of one pass.
   The rail τ ∈ [0, 1] drives one lap of the avatar (cards 1, 2, 3, 5), or for card 4 also tunes α = θ*·τ. Every
   number is computed here; the instances of the cited Lean theorems (and the bisection for θ*) are checked in instances().
   Read-only probe: window.BRAHMAN_LILA_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;

  /* ---------- θ*, the Schur freedom, the lock ---------- */
  function bisectDottie() { let a = 0, b = 1; for (let k = 0; k < 200; k++) { const m = (a + b) / 2; if (Math.cos(m) - m > 0) a = m; else b = m; } return (a + b) / 2; }
  const TSTAR = bisectDottie(), TSTAR_DEG = TSTAR / DEG;
  const D_EFF = 12, RHO = 0.5, PASSES = 12, FINESSE = 100;
  /** The slider runs over K = 1 … 8 cross-epoch worldlines (3K visit records). */
  const K_MAX = 8;
  /** Δ_Schur(M) = (1 − ρ)(D − M)/(D(1 − ρ + Mρ)) = (12 − M)/(12(M + 1)) for D = 12, ρ = 1/2. */
  const schur = (M) => (1 - RHO) * (D_EFF - M) / (D_EFF * (1 - RHO + M * RHO));
  const stride = (M) => Math.min(1, Math.sqrt(schur(M) / schur(3)));
  const onePass = (aDeg) => Math.cos(aDeg * DEG - TSTAR) ** 2;
  const lock = (aDeg) => onePass(aDeg) ** PASSES;
  const cavity = (aDeg) => 1 / (1 + FINESSE * Math.sin(aDeg * DEG - TSTAR) ** 2);
  /** The Fejér kernel of K epochs with phase step δ = 12(α − θ*), summed term by term. */
  function fejer(aDeg, K) { const d = PASSES * (aDeg * DEG - TSTAR); let re = 0, im = 0; for (let k = 0; k < K; k++) { re += Math.cos(k * d); im += Math.sin(k * d); } return (re * re + im * im) / (K * K); }

  /* ---------- vectors ---------- */
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const lerp = (a, b, t) => a * (1 - t) + b * t;
  const camAxes = (cam) => {
    const cy = Math.cos(cam.yaw), sy = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  const angGap = (a, b) => { const d = ((a - b) % 360 + 540) % 360 - 180; return Math.abs(d); };

  /* ---------- geometry ---------- */
  const R_T = 0.86, r_T = 0.24, DENT = 0.2, AXIS = 1.05, Z_CLASSIC = 0.5, V_AVATAR = 2.3;
  const VIEW0 = [0.5, 0.5];
  const basin = (u) => ((1 + Math.cos(3 * u)) / 2) ** 6;
  function torusPt(u, v, lift = 0) {
    const re = r_T * (1 - DENT * basin(u) * Math.max(0, Math.sin(v)) ** 2) + lift;
    return [(R_T + re * Math.cos(v)) * Math.cos(u), (R_T + re * Math.cos(v)) * Math.sin(u), re * Math.sin(v)];
  }
  const Z0 = r_T * (1 - DENT) - 0.015;   // the floor of a basin, where a relic stands
  const frameAt = (deg) => { const u = deg * DEG; return { er: [Math.cos(u), Math.sin(u), 0], et: [-Math.sin(u), Math.cos(u), 0], c: [R_T * Math.cos(u), R_T * Math.sin(u), 0] }; };
  /** A box: centre, half extents along the radial, tangential and vertical directions of the frame F. */
  function box(F, cr, ct, cz, hr, ht, hz) {
    const c = add(add(add(F.c, scale(F.er, cr)), scale(F.et, ct)), [0, 0, cz]), v = [];
    for (const a of [-1, 1]) for (const b of [-1, 1]) for (const d of [-1, 1]) v.push(add(add(add(c, scale(F.er, a * hr)), scale(F.et, b * ht)), [0, 0, d * hz]));
    return { vertices: v, faces: [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]] };
  }
  function octa(c, F, w, h) {
    return { vertices: [add(c, scale(F.er, w)), add(c, scale(F.er, -w)), add(c, scale(F.et, w)), add(c, scale(F.et, -w)), add(c, [0, 0, h]), add(c, [0, 0, -h])],
      faces: [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]] };
  }
  function merge(parts) {
    const vertices = [], faces = [];
    for (const p of parts) { const base = vertices.length; vertices.push(...p.vertices); p.faces.forEach((f) => faces.push(f.map((q) => q + base))); }
    return { vertices, faces };
  }
  const RELICS = [
    { deg: 0, key: 'pyramid', name: ['阶梯金字塔', 'stepped pyramid'], top: Z0 + 0.18 },
    { deg: 120, key: 'trilithon', name: ['巨石三石门', 'megalith trilithon'], top: Z0 + 0.22 },
    { deg: 240, key: 'stele', name: ['铭文崖碑', 'inscribed cliff stele'], top: Z0 + 0.28 }
  ].map((r) => {
    const F = frameAt(r.deg);
    const parts = r.key === 'pyramid' ? [box(F, 0, 0, Z0 + 0.03, 0.11, 0.11, 0.03), box(F, 0, 0, Z0 + 0.09, 0.078, 0.078, 0.03), box(F, 0, 0, Z0 + 0.15, 0.046, 0.046, 0.03)]
      : r.key === 'trilithon' ? [box(F, 0, -0.068, Z0 + 0.085, 0.026, 0.026, 0.085), box(F, 0, 0.068, Z0 + 0.085, 0.026, 0.026, 0.085), box(F, 0, 0, Z0 + 0.195, 0.032, 0.112, 0.025)]
        : [box(F, 0, 0, Z0 + 0.02, 0.05, 0.1, 0.02), box(F, 0, 0, Z0 + 0.16, 0.02, 0.075, 0.12)];
    return Object.assign(r, { F, poly: merge(parts) });
  });
  const CLASSICS = [60, 180, 300].map((deg) => {
    const F = frameAt(deg), c = add(F.c, [0, 0, Z_CLASSIC]);
    const sat = (s) => { const Fs = { er: F.et, et: scale(F.er, -1) }; return octa(add(add(c, scale(F.et, 0.12 * s)), [0, 0, -0.05]), Fs, 0.036, 0.06); };
    return { deg, F, c, poly: merge([octa(c, F, 0.075, 0.12), sat(1), sat(-1)]) };
  });

  /* ---------- 2 × 2 matrices (real entries suffice here) ---------- */
  const m2 = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]], [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  const madd2 = (A, B, s = 1) => [[A[0][0] + s * B[0][0], A[0][1] + s * B[0][1]], [A[1][0] + s * B[1][0], A[1][1] + s * B[1][1]]];
  const tr2 = (A) => [[A[0][0], A[1][0]], [A[0][1], A[1][1]]];
  const max2 = (A) => Math.max(...A.flat().map(Math.abs));
  const I2 = [[1, 0], [0, 1]];
  const outer2 = (v) => [[v[0] * v[0], v[0] * v[1]], [v[1] * v[0], v[1] * v[1]]];
  /** Deterministic pseudo-random numbers for the probe vectors y of the Schur instance. */
  function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  /** Solve C y = r by Gaussian elimination with partial pivoting (C small, symmetric positive definite). */
  function solve(C, r) {
    const n = r.length, A = C.map((row, i) => Float64Array.from([...row, r[i]]));
    for (let c = 0; c < n; c++) {
      let p = c; for (let i = c + 1; i < n; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
      [A[c], A[p]] = [A[p], A[c]];
      for (let i = c + 1; i < n; i++) { const f = A[i][c] / A[c][c]; for (let j = c; j <= n; j++) A[i][j] -= f * A[c][j]; }
    }
    const y = new Float64Array(n);
    for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * y[j]; y[i] = s / A[i][i]; }
    return Array.from(y);
  }

  /* ---------- state ---------- */
  const S = { lens: 'props', drive: 'avatarLap', M: 3, K: 4, alphaDeg: TSTAR_DEG, tau: 0, from: null, blend: 1 };
  function eff() {
    const target = S.drive === 'tuneAlpha' ? TSTAR_DEG * S.tau : S.alphaDeg;
    const a = S.from && S.blend < 1 ? lerp(S.from.alphaDeg, target, S.blend) : target;
    return { alphaDeg: a, M: S.M, K: S.K };
  }

  /** Everything the page shows, from the state. */
  function model() {
    const e = eff(), M = e.M, K = e.K, a = e.alphaDeg, nu = stride(M), sd = schur(M);
    const psi = 360 * S.tau * nu, psiMod = ((psi % 360) + 360) % 360;
    const wob = V_AVATAR + 0.35 * Math.sqrt(sd) * Math.sin(3 * TAU * S.tau);
    const I = fejer(a, K);
    const props = [...RELICS.map((r) => ({ kind: 'relic', key: r.key, deg: r.deg, name: r.name })), ...CLASSICS.map((c) => ({ kind: 'classic', key: `classic${c.deg}`, deg: c.deg, name: ['典籍晶簇', 'classics'] }))];
    const near = props.map((p) => ({ ...p, gap: angGap(psiMod, p.deg) })).sort((x, y) => x.gap - y.gap)[0];
    const rings = RELICS.map((r) => { const prox = Math.exp(-((angGap(psiMod, r.deg) / 25) ** 2)); return { key: r.key, prox, strength: I * prox }; });
    return {
      e, alphaDeg: a, M, K, tau: S.tau, schur: sd, sqrtSchur: Math.sqrt(sd), stride: nu, psi, psiMod, poloidal: wob,
      onePass: onePass(a), lock: lock(a), cavity: cavity(a), detuneDeg: a - TSTAR_DEG, interference: I, rings, near, beams: lock(a), axisDrift: 0
    };
  }
  // the avatar walks the inner shoulder of the torus (poloidal angle 2.3 rad), clear of the relics on the crest
  const avatarAt = (tau, M) => { const sd = schur(M), nu = stride(M); return torusPt(TAU * tau * nu, V_AVATAR + 0.35 * Math.sqrt(sd) * Math.sin(3 * TAU * tau), 0.03); };

  /* ---------- the instances of the cited theorems ---------- */
  const instCache = new Map();
  function instances(Mo) {
    const key = `${Mo.alphaDeg}|${Mo.M}|${Mo.K}`;
    if (instCache.has(key)) return instCache.get(key);
    // 1. the Schur minimum on the equi-correlated barycentre: A = Var b, B = Cov(b, v_S), C = Gram(v_S), x = 1
    const M = Mo.M, A = (1 + (D_EFF - 1) * RHO) / D_EFF, Bv = new Array(M).fill(A);
    const C = Array.from({ length: M }, (_, i) => Array.from({ length: M }, (_, j) => (i === j ? 1 : RHO)));
    const quad = (y) => { let q = A; for (let i = 0; i < M; i++) { q += 2 * Bv[i] * y[i]; for (let j = 0; j < M; j++) q += y[i] * C[i][j] * y[j]; } return q; };
    const ystar = M ? solve(C, Bv.map((b) => -b)) : [];
    const cinvB = M ? solve(C, Bv) : [];
    const S_ = A - Bv.reduce((s, b, i) => s + b * cinvB[i], 0);
    const rand = rng(1729 + M);
    let worst = Infinity;
    for (let n = 0; n < 24; n++) { const y = ystar.map((x) => x + (rand() - 0.5) * 0.8); worst = Math.min(worst, quad(y) - S_); }
    const schurInst = { A, B: Bv, M, minimum: quad(ystar), complement: S_, residual: Math.abs(quad(ystar) - S_), randomGap: M ? worst : 0, ratio: S_ / A, formulaGap: Math.abs(S_ / A - schur(M)), ystar };
    // 2. the cosine fixed point θ* by bisection: a numerical check on the page (NUM), not one of the cited theorems
    let slope = -Infinity; for (let j = 1; j <= 400; j++) { const t = j * (PI / 2) / 400; slope = Math.max(slope, -1 - Math.sin(t)); }
    const dottie = { theta: TSTAR, thetaDeg: TSTAR_DEG, residual: Math.abs(Math.cos(TSTAR) - TSTAR), inUnit: TSTAR > 0 && TSTAR < 1, maxSlope: slope };
    // 3. the clearance beam J on (surface, deep)
    const J = [[0, -1], [1, 0]];
    const fold = { skewAdjoint: max2(madd2(tr2(J), J)), unitary: max2(madd2(m2(J, tr2(J)), I2, -1)), square: max2(madd2(m2(J, J), I2)), surfaceToDeep: [J[0][0], J[1][0]] };
    // 4. the record measurement of the reader basis, and the unread state of the classic
    const al = Mo.alphaDeg * DEG, P0 = outer2([Math.cos(al), Math.sin(al)]), P1 = outer2([-Math.sin(al), Math.cos(al)]), rho = outer2([Math.cos(TSTAR), Math.sin(TSTAR)]);
    const unread = (X) => madd2(m2(m2(P0, X), P0), m2(m2(P1, X), P1));
    const once = unread(rho), twice = unread(once);
    const record = { selfAdjoint: Math.max(max2(madd2(P0, tr2(P0), -1)), max2(madd2(P1, tr2(P1), -1))), idempotent: Math.max(max2(madd2(m2(P0, P0), P0, -1)), max2(madd2(m2(P1, P1), P1, -1))),
      orthogonal: max2(m2(P0, P1)), complete: max2(madd2(madd2(P0, P1), I2, -1)), idempotence: max2(madd2(twice, once, -1)), weight: m2(rho, P0)[0][0] + m2(rho, P0)[1][1], weightGap: 0 };
    record.weightGap = Math.abs(record.weight - Mo.onePass);
    // 5. the raft: 3 relics × K epochs of visits as a table
    const observed = []; for (let j = 0; j < 3; j++) for (let k = 0; k < Mo.K; k++) observed.push((4 * j + 5 * k) % 12);
    const copy = observed.slice(), deps = new Set(observed.map((_, i) => i));
    const raft = { records: observed.length, observed, loss: observed.reduce((s, x, i) => s + Math.abs(copy[i] - x), 0),
      nonAnticipating: observed.filter((_, i) => !deps.has(i)).length, prospectiveGain: 0, gainPositive: 0 > 0 };
    const out = { schur: schurInst, dottie, fold, record, raft };
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

  /* ---------- layout in camera space ---------- */
  const landscape = (W, H) => W >= 1.3 * H;
  const DIAL_R = 0.62, DIAL_D = 0.9;
  const dialOf = (W, H) => (landscape(W, H) ? { cx: 1.25, cy: -0.84 } : { cx: -DIAL_R / 2, cy: -1.92 });
  function contentBox(W, H) {
    const d = dialOf(W, H), b = { x0: -1.15, x1: 1.15, y0: -1.0, y1: 1.0 };
    b.x1 = Math.max(b.x1, d.cx + DIAL_R + 0.1); b.y0 = Math.min(b.y0, d.cy - 0.1);
    return b;
  }
  function fitTo(box, area, W, H) {
    const pad = TRV.thumbMode ? 6 : 12, zoom = sc.cam.zoom || 1;
    const unitPx = Math.max(20, Math.min((area.w - 2 * pad) / (box.x1 - box.x0), (area.h - 2 * pad) / (box.y1 - box.y0)));
    options.radius = unitPx / (Math.max(1, Math.min(W, H)) * zoom);
    options.cx = (area.x + area.w / 2 - unitPx * (box.x0 + box.x1) / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2 + unitPx * (box.y0 + box.y1) / 2) / Math.max(1, H);
  }

  const range = (a, b, n) => Array.from({ length: n + 1 }, (_, j) => a + (b - a) * j / n);
  const tube = (key, pts, color, width, extra = {}) => { if (pts.length > 1) sc.tube(key, pts, Object.assign({ color, width, glow: 0.3, pick: false, occlude: false }, extra)); };
  let FRAME = null, FIT = null, TAGS = [], AX = null, DIAL = null, AV = null;
  const at = (p, html, cls, pri, dir) => { if (!TRV.thumbMode) TAGS.push({ p, html, cls, pri, dir }); };
  const camPt = (x, y, d = 0) => add(add(scale(AX.R, x), scale(AX.U, y)), scale(AX.D, d));
  const dialPt = (aDeg, r = DIAL_R) => camPt(DIAL.cx + r * Math.cos(aDeg * DEG), DIAL.cy + r * Math.sin(aDeg * DEG), DIAL_D);

  /** The axis, the dream torus, the relics and their worldlines, the classics and their beams, the avatar. */
  function drawWorld(Mo) {
    const lens = S.lens, wl = lens === 'worldlines';
    tube('axis', [[0, 0, -AXIS], [0, 0, AXIS]], P.sigma, 7, { glow: 0.5, occlude: true });
    sc.surface('torus', (s, v) => torusPt(TAU * s, TAU * v), { u: [0, 1], v: [0, 1], nu: 144, nv: 28, colors: [P.faint, P.dim], value: (s) => basin(TAU * s), range: [0, 1], grid: { every: [12, 7], color: P.ink, alpha: 0.14 }, pick: false });
    RELICS.forEach((r, j) => {
      sc.poly(`relic-${r.key}`, r.poly, { color: P.cyan, edges: P.ink });
      if (r.key === 'stele') for (let n = 0; n < 3; n++) {
        const z = Z0 + 0.2 - 0.045 * n, c = add(add(r.F.c, scale(r.F.er, 0.022)), [0, 0, z]);
        sc.line([add(c, scale(r.F.et, -0.05)), add(c, scale(r.F.et, 0.05))], { color: P.ink, width: 1.2, alpha: 0.8 });
      }
      for (let k = 0; k < Mo.K; k++) {
        const a0 = TAU * k / Mo.K;
        tube(`world-${j}-${k}`, range(0, 1, 40).map((s) => { const a = a0 + 2.4 * s; return add(add(add(r.F.c, scale(r.F.er, 0.14 * Math.cos(a))), scale(r.F.et, 0.14 * Math.sin(a))), [0, 0, -0.6 + 1.22 * s]); }),
          P.cyan, wl ? 2 : 1.4, { glow: 0.45, alpha: wl ? 0.9 : 0.4 });
      }
      const st = Mo.rings[j].strength;
      if (st > 0.03) for (let n = 0; n < Mo.K; n++) {
        const f = ((n / Mo.K + 1.5 * Mo.tau) % 1 + 1) % 1, rad = 0.13 + 0.26 * f, al = st * (1 - 0.85 * f) * (wl ? 1 : 0.75);
        if (al < 0.02) continue;
        sc.line(range(0, TAU, 48).map((t) => add(add(add(r.F.c, scale(r.F.er, rad * Math.cos(t))), scale(r.F.et, rad * Math.sin(t))), [0, 0, Z0 + 0.012])), { color: P.cyan, width: 1.8, alpha: al });
      }
      if (lens === 'props') at(add(r.F.c, [0, 0, r.top]), L(...r.name), 'raw c-cy backed', 6, [0, -1]);
    });
    let front = null, fd = -Infinity;
    CLASSICS.forEach((c) => {
      sc.poly(`classic-${c.deg}`, c.poly, { color: P.violet, edges: P.ink });
      if (Mo.beams > 0.004) tube(`beam-${c.deg}`, [c.c, [0, 0, Z_CLASSIC]], P.sigma, 1.5 + 4.5 * Mo.beams, { glow: 0.8, alpha: Math.min(1, 0.15 + Mo.beams) });
      const d = dot(c.c, AX.D); if (d > fd) { fd = d; front = c; }
    });
    if (lens === 'props') at(add(front.c, [0, 0, 0.13]), `P<sup>(12)</sup> = ${fix(100 * Mo.lock, 2)}%`, 'raw c-vi backed', 8, [0, -1]);
    else {
      const r = RELICS.slice().sort((x, y) => angGap(Mo.psiMod, x.deg) - angGap(Mo.psiMod, y.deg))[0];
      at(add(r.F.c, [0, 0, -0.45]), `K = ${Mo.K} · I<sub>K</sub> = ${fix(Mo.interference, 2)}`, 'raw c-cy backed', 9, null);
      if (Mo.beams > 0.3) at(scale(add(front.c, [0, 0, Z_CLASSIC]), 0.5), `J² = −I · ${L('通关束', 'clearance beam')}`, 'raw c-sg backed', 8, [0, -1]);
    }
    at([0, 0, -AXIS], `I · ${L('漂移', 'drift')} ${fix(Mo.axisDrift, 4)}`, 'raw c-sg backed', 7, [0.5, 1]);
    // the avatar and the path it has walked this lap
    const nu = Mo.stride;
    if (nu > 0 && Mo.tau > 0.002) sc.line(range(0, Mo.tau, Math.max(2, Math.ceil(Mo.tau * 120))).map((t) => avatarAt(t, Mo.M)), { color: P.ink, width: 1.4, dash: [4, 4], alpha: 0.55 });
    const av = avatarAt(Mo.tau, Mo.M); AV = av;
    sc.bead(av, { key: 'avatar', color: P.amber, r: 6 });
    at(av, `${L('化身', 'avatar')} · Δ = ${fix(Mo.schur, 4)}`, 'raw c-ik backed', 10, null);
  }

  /** The protractor of the reader basis angle α, with the lobes of one pass and of the twelve-pass lock. */
  function drawDial(Mo) {
    const as = range(0, 90, 90);
    tube('dial-arc', as.map((a) => dialPt(a)), P.ink, 1.6, { glow: 0, alpha: 0.85 });
    tube('dial-base', [dialPt(90, 0), dialPt(0)], P.ink, 1.2, { glow: 0, alpha: 0.5 });
    tube('dial-up', [dialPt(0, 0), dialPt(90)], P.ink, 1.2, { glow: 0, alpha: 0.5 });
    tube('dial-one', as.map((a) => dialPt(a, DIAL_R * (0.18 + 0.82 * onePass(a)))), P.cyan, 1.6, { glow: 0.4, alpha: 0.85 });
    tube('dial-lock', range(0, 90, 360).map((a) => dialPt(a, DIAL_R * (0.18 + 0.82 * lock(a)))), P.violet, 2.4, { glow: 0.5 });
    sc.line([dialPt(TSTAR_DEG, 0), dialPt(TSTAR_DEG, DIAL_R * 1.08)], { color: P.ink, width: 1.2, dash: [4, 4], alpha: 0.8 });
    tube('dial-now', [dialPt(Mo.alphaDeg, 0), dialPt(Mo.alphaDeg)], P.ink, 2, { glow: 0.2 });
    sc.bead(dialPt(Mo.alphaDeg), { key: 'dial', color: P.ink, r: 3.5 });
    at(dialPt(TSTAR_DEG, DIAL_R * 1.08), `θ* = ${fix(TSTAR_DEG, 2)}°`, 'raw c-ik backed', 6, null);
    at(dialPt(Mo.alphaDeg, DIAL_R * 0.55), `α = ${fix(Mo.alphaDeg, 2)}°`, 'raw c-ik backed', 9, [1, 1]);
    at(dialPt(0), '0°', 'raw c-ik backed', 3, [1, 0.4]);
    at(dialPt(90), '90°', 'raw c-ik backed', 3, [-1, -0.4]);
  }

  function drawStage(Mo) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    AX = camAxes(sc.cam);
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 12, y: 12, w: W - 24, h: H - 24 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area, box: contentBox(W, H), dial: dialOf(W, H) };
    DIAL = FIT.dial;
    fitTo(FIT.box, FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = []; TAGS = [];
    sc.begin();
    drawWorld(Mo);
    drawDial(Mo);
    sc.end();
    const hq = thumb || TRV.still ? null : sc.p(dialPt(Mo.alphaDeg));
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    const aq = sc.p(AV); OBST.push({ x: aq[0] - 9, y: aq[1] - 9, w: 18, h: 18 });   // labels keep off the avatar
    for (const r of RELICS) {   // … and off the relics themselves
      const qs = r.poly.vertices.map((v) => sc.p(v)), xs = qs.map((q) => q[0]), ys = qs.map((q) => q[1]);
      OBST.push({ x: Math.min(...xs) - 2, y: Math.min(...ys) - 2, w: Math.max(...xs) - Math.min(...xs) + 4, h: Math.max(...ys) - Math.min(...ys) + 4 });
    }
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0]);
      TAGS.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        LB.push({ key: `t${k}`, q, html: t.html, cls: t.cls, pri: t.pri, dir, r: 10 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, box: FIT.box, dial: DIAL, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* ---------- the handle: the reader basis angle on the protractor ---------- */
  const handle = $('lilaHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q && !TRV.still;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    const label = L('沿量角弧拖动改 α', 'Drag along the protractor arc to set α');
    if (handle.getAttribute('aria-label') !== label) handle.setAttribute('aria-label', label);
  }
  function dragTo(ev) {
    const r = stageEl.getBoundingClientRect(), x = ev.clientX - r.left - stageEl.clientLeft, y = ev.clientY - r.top - stageEl.clientTop;
    const c = sc.p(dialPt(0, 0)), e = sc.p(dialPt(0)), f = sc.p(dialPt(90));
    // the arc in screen space: the two radii to 0° and 90° (an orthographic camera keeps the dial undistorted)
    const ex = [e[0] - c[0], e[1] - c[1]], fy = [f[0] - c[0], f[1] - c[1]], px = [x - c[0], y - c[1]];
    const u = (px[0] * ex[0] + px[1] * ex[1]) / (ex[0] ** 2 + ex[1] ** 2), v = (px[0] * fy[0] + px[1] * fy[1]) / (fy[0] ** 2 + fy[1] ** 2);
    let a = Math.atan2(v, u) / DEG;
    if (a < 0) a = a < -45 ? (a < -135 ? 90 : 0) : 0;
    setAlpha(Math.round(clamp(a, 0, 90) * 100) / 100);
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
    setAlpha(Math.round((S.alphaDeg + (ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 0.1 : -0.1)) * 100) / 100);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendItems = () => [['sg', L('实轴 I · 通关束', 'real axis I · clearance beams')], ['cy', L('遗迹 · 世界线', 'relics · worldlines')], ['vi', L('典籍 · 十二程锁', 'classics · twelve-pass lock')], ['dm', L('共识梦环', 'consensus dream torus')]];
  function hudText(Mo) {
    let big, sub;
    if (S.lens === 'worldlines') {
      big = `K = ${Mo.K} · I<sub>K</sub>(α) = ${fix(Mo.interference, 4)}`;
      sub = `α − θ* = ${fix(Mo.detuneDeg, 2)}° · g<sub>F</sub> = ${fix(100 * Mo.cavity, 2)}% · ${L('实轴漂移', 'axis drift')} ${fix(Mo.axisDrift, 4)}`;
    } else {
      big = `P<sup>(12)</sup> = cos²⁴(α − θ*) = ${fix(100 * Mo.lock, 2)}%`;
      sub = `α = ${fix(Mo.alphaDeg, 2)}° · M = ${Mo.M} · Δ<sub>Schur</sub> = ${fix(Mo.schur, 4)} · ν = ${fix(Mo.stride, 3)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendItems().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const FORMULA = {
    props: 'Δ<sub>Schur</sub>(M) = (12 − M)/(12(M + 1)) · ψ = 360°·τ·ν(M) · P<sup>(12)</sup>(α) = cos²⁴(α − θ*)',
    worldlines: 'I<sub>K</sub> = |Σ<sub>k</sub> e<sup>ikδ</sup>/K|², δ = 12(α − θ*) · g<sub>F</sub> = [1 + 100 sin²(α − θ*)]⁻¹ · J² = −I'
  };
  function drawText(Mo) {
    const I = instances(Mo);
    $('roKey').textContent = `${fix(100 * Mo.lock, 2)}%`;
    $('roKeySub').innerHTML = ` · α = ${fix(Mo.alphaDeg, 2)}°`;
    $('roPass').innerHTML = `cos² = ${fix(Mo.onePass, 4)} · g<sub>F</sub> = ${fix(100 * Mo.cavity, 2)}%`;
    $('roSchur').innerHTML = `M = ${Mo.M} · Δ = ${fix(Mo.schur, 4)} · ν = ${fix(Mo.stride, 3)}`;
    $('roAvatar').innerHTML = `ψ = ${fix(Mo.psiMod, 1)}° · ${L(...Mo.near.name)} (${fix(Mo.near.gap, 1)}°)`;
    $('roRelic').innerHTML = `K = ${Mo.K} · I = ${fix(Mo.interference, 4)}`;
    $('roAxis').innerHTML = `${fix(Mo.axisDrift, 4)} · ${fix(I.fold.square, 6)}`;
    $('roRaft').innerHTML = `${I.raft.loss} · ${I.raft.nonAnticipating}/${I.raft.records}`;
    $('roNote').innerHTML = S.lens === 'worldlines'
      ? L(`捏合幂等：同一份记录读两次与读一次相同（残差 ${fix(I.record.idempotence, 6)}），单程权重 Tr(ρP₀) = ${fix(I.record.weight, 4)}；十二程锁读十二份副本。`,
        `Pinching is idempotent: reading the same record twice equals reading it once (residual ${fix(I.record.idempotence, 6)}), single-pass weight Tr(ρP₀) = ${fix(I.record.weight, 4)}; the twelve-pass lock reads twelve copies.`)
      : L(`舒尔极小：内块上的最小值 ${fix(I.schur.minimum, 5)} 等于舒尔补 ${fix(I.schur.complement, 5)}（差 ${I.schur.residual.toExponential(1)}）；Δ<sub>Schur</sub>(${Mo.M}) = ${fix(Mo.schur, 4)}。`,
        `Schur minimum: the minimum over the inner block, ${fix(I.schur.minimum, 5)}, equals the Schur complement ${fix(I.schur.complement, 5)} (difference ${I.schur.residual.toExponential(1)}); Δ<sub>Schur</sub>(${Mo.M}) = ${fix(Mo.schur, 4)}.`);
    $('scenePill').innerHTML = `LILA <strong>${S.lens === 'worldlines' ? L('世界线', 'WORLDLINES') : L('道具', 'PROPS')}</strong>`;
    $('keyPill').innerHTML = `P<sup>(12)</sup> <strong>${fix(100 * Mo.lock, 2)}%</strong>`;
    $('hint').innerHTML = S.drive === 'tuneAlpha'
      ? L('时间轴把 α 从 0° 调到 θ*，化身同时绕环 · 拖空白处转视角', 'the rail tunes α from 0° to θ* while the avatar laps · drag empty space to orbit')
      : L('时间轴让化身绕环一圈 · 拖琥珀手柄改 α · 拖空白处转视角', 'the rail walks the avatar once around · drag the amber handle to set α · drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.lens];
    lensBtn.setAttribute('aria-pressed', String(S.lens === 'worldlines'));
  }

  /* ---------- strip plot ---------- */
  function drawPlot(Mo) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    if (S.lens === 'worldlines') {
      $('plotTitle').textContent = L('十二程许可锁只在 θ* 打开：cos²、cos²⁴ 与 g_F', 'The twelve-pass lock opens only at θ*: cos², cos²⁴ and g_F');
      const g = kit.plot(cv, { x: [0, 90], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 15, 30, 45, 60, 75, 90], yTicks: [0, 0.5, 1], xLabel: 'α (°)' });
      g.vline(TSTAR_DEG, P.ink, { alpha: 0.6, dash: [4, 4] });
      const xs = range(0, 90, 360);
      g.line(xs.map((x) => [x, onePass(x)]), P.cyan, { width: 1.8 });
      g.line(xs.map((x) => [x, cavity(x)]), P.sigma, { width: 1.4, alpha: 0.85 });
      g.line(xs.map((x) => [x, lock(x)]), P.violet, { width: 2.4 });
      g.vline(Mo.alphaDeg, P.amber, { alpha: 0.85 }); g.dot(Mo.alphaDeg, Mo.lock, P.amber, 3.8);
      $('plotMeta').innerHTML = `cos² = ${fix(Mo.onePass, 4)} · cos²⁴ = ${fix(Mo.lock, 4)} · g<sub>F</sub> = ${fix(Mo.cavity, 4)}`;
    } else {
      $('plotTitle').textContent = L('记得越多越不自由：Δ_Schur(M) = (12 − M)/(12(M + 1))', 'The more remembered, the less free: Δ_Schur(M) = (12 − M)/(12(M + 1))');
      const g = kit.plot(cv, { x: [-0.5, 12.5], y: [0, 1.05], pad });
      g.axes({ xTicks: [0, 2, 4, 6, 8, 10, 12], yTicks: [0, 0.5, 1], xLabel: 'M' });
      const ms = range(0, 12, 12);
      g.line(range(0, 12, 240).map((x) => [x, schur(x)]), P.violet, { width: 1.2, alpha: 0.5 });
      ms.forEach((m) => g.dot(m, schur(m), P.violet, 3));
      g.vline(Mo.M, P.amber, { alpha: 0.85 }); g.dot(Mo.M, Mo.schur, P.amber, 4.2);
      $('plotMeta').innerHTML = `M = ${Mo.M} · Δ = ${fix(Mo.schur, 4)} · ν = ${fix(Mo.stride, 3)}`;
    }
  }

  const paint = kit.painter(() => {
    const Mo = model();
    hudText(Mo); TRV.hudFit();
    drawStage(Mo); drawText(Mo); drawPlot(Mo);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: the story τ of the card ---------- */
  const playBtn = $('playBtn');
  const railLabel = (t) => (S.drive === 'tuneAlpha' ? `τ ${fix(t, 2)} · α = ${fix(TSTAR_DEG * t, 2)}°` : `τ ${fix(t, 2)} · ψ = ${fix(360 * t * stride(S.M), 1)}°`);
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0, rate: 0.08, step: 0.025, loop: true,
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
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    S.from = from; S.blend = 0;
    const token = {};
    transition = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.blend = 1; S.from = null; };
    token.run = kit.tween(ms, (e) => { S.blend = e; syncFields(); paint(); }, () => { if (transition === token) transition = null; S.blend = 1; S.from = null; syncFields(); paint(); });
  }
  /** The reader takes over: the current values become the state, the rail keeps walking the avatar, no card is marked. */
  function leave() {
    stopBootPlay();
    const e = eff();
    if (transition) transition.cancel();
    transition = null;
    clock.pause();   // pause emits with the old drive: the drive changes only after it
    S.alphaDeg = e.alphaDeg; S.from = null; S.blend = 1; S.drive = 'avatarLap';
    cards.mark(null);
    syncFields();
  }
  // leave() syncs the controls to the values it freezes; each handler then assigns the new value first and only then
  // syncs the slider and its <output> and redraws, so what the control shows is always the state
  const fM = kit.field($('amnesiaM'), { fmt: (v) => `${Math.round(v)}`, onInput: (v) => { leave(); S.M = clamp(Math.round(v), 0, 12); syncFields(); paint(); } });
  const fA = kit.field($('basisAlpha'), { fmt: (v) => `${fix(v, 2)}°`, onInput: (v) => { leave(); setAlpha(v); } });
  const fK = kit.field($('epochCount'), { fmt: (v) => `${Math.round(v)}`, onInput: (v) => { leave(); S.K = clamp(Math.round(v), 1, K_MAX); syncFields(); paint(); } });
  function syncFields() { const e = eff(); fM.set(e.M); fA.set(Math.round(e.alphaDeg * 100) / 100); fK.set(e.K); }
  function setAlpha(v) { S.alphaDeg = clamp(v, 0, 90); syncFields(); paint(); }
  const lensBtn = $('lensToggleBtn');
  lensBtn.addEventListener('click', () => { S.lens = S.lens === 'props' ? 'worldlines' : 'props'; paint(); });

  /* ---------- experiment cards ---------- */
  // α is put at θ* itself (the slider, in steps of 0.01°, shows 42.35°)
  const PRESETS = {
    'omniscient-zeno-deadlock': { lens: 'props', M: 12, alphaDeg: 18, K: 1, drive: 'avatarLap', play: true, still: 0.5 },
    'amnesia-birth-open-corridor': { lens: 'props', M: 2, alphaDeg: 15, K: 1, drive: 'avatarLap', play: true, still: 0.28 },
    'relic-attractor-deja-vu': { lens: 'worldlines', M: 3, alphaDeg: 40, K: 5, drive: 'avatarLap', play: true, still: 0.3333 },
    'classic-permission-lock-flip': { lens: 'props', M: 3, alphaDeg: TSTAR_DEG, K: 4, drive: 'tuneAlpha', play: true, still: 1 },
    'lila-raft-return-and-new-seed': { lens: 'worldlines', M: 1, alphaDeg: TSTAR_DEG, K: 6, drive: 'avatarLap', play: true, still: 0.8333 }
  };
  const NOTES = {
    'omniscient-zeno-deadlock': ['全知即芝诺死锁：化身记住全部 M = 12 个成员，Δ<sub>Schur</sub>(12) = 0，步幅 ν = 0。时间轴在走，琥珀化身却冻在阶梯金字塔旁（ψ = 0°），一步也不动。α = 18° 离 θ* 差 24.35°：单程 cos² = 0.8300 还很宽，十二程锁只开 10.70%，通关束很暗。只有 K = 1 条世界线，没有第二个世代可以对齐。',
      'Omniscience is a Zeno deadlock: the avatar remembers all M = 12 members, Δ<sub>Schur</sub>(12) = 0 and the stride ν = 0. The rail runs, yet the amber avatar stays frozen by the stepped pyramid (ψ = 0°) and never takes a step. α = 18° is 24.35° off θ*: one pass, cos² = 0.8300, is still broad, the twelve-pass lock is only 10.70% open and the beams are dim. There is only K = 1 worldline, no second epoch to line up with.'],
    'amnesia-birth-open-corridor': ['失忆出生，走廊打开：只记住 M = 2 个成员，Δ<sub>Schur</sub>(2) = 0.2778，步幅满格 ν = 1。τ = 0.28 时化身已从金字塔沿虚线走到 ψ = 100.8°，正走向巨石三石门。α = 15°，十二程锁只开 5.82%，三簇典籍沉默。',
      'Born amnesiac, the corridor opens: only M = 2 members are remembered, Δ<sub>Schur</sub>(2) = 0.2778, and the stride is full, ν = 1. At τ = 0.28 the avatar has walked along the dashed path from the pyramid to ψ = 100.8°, toward the megalith trilithon. α = 15°, the twelve-pass lock is only 5.82% open, and the three clusters of classics stay silent.'],
    'relic-attractor-deja-vu': ['遗迹吸引子与似曾相识：τ = 1/3 时化身到访巨石三石门（ψ = 120°），K = 5 条跨世世界线在那里回响。α = 40° 只比 θ* 小 2.35°：五个世代的相位差 δ = 12(α − θ*) = −0.49 rad，费耶尔核 I<sub>5</sub> = 0.60，扩成青色的同心干涉环；典籍的十二程锁已开到 98.01%。',
      'A relic attractor and déjà vu: at τ = 1/3 the avatar visits the megalith trilithon (ψ = 120°), where K = 5 cross-epoch worldlines echo. α = 40° is only 2.35° below θ*: the five epochs differ in phase by δ = 12(α − θ*) = −0.49 rad, the Fejér kernel I<sub>5</sub> = 0.60, and they spread into concentric cyan interference rings; the twelve-pass lock of the classics is already 98.01% open.'],
    'classic-permission-lock-flip': ['典籍的许可锁在 θ* 翻开：时间轴把读者的基角 α 从 0° 调到 θ* = 42.35°。单程 cos²(α − θ*) 从 0.5462 缓缓升到 1，半高宽 ±45°；十二程 cos²⁴(α − θ*) 窄得多，半高宽只有 ±13.70°：α = 0° 时 0.0706%，τ = 0.5（α = 21.17°）时 18.68%，τ = 1 时翻开到 100.00%，三道银白通关束直射实轴，J² = −I。化身绕环一圈回到金字塔。',
      'The permission lock flips at θ*: the rail tunes the reader basis angle α from 0° to θ* = 42.35°. One pass, cos²(α − θ*), rises slowly from 0.5462 to 1 with a half-width of ±45°; twelve passes, cos²⁴(α − θ*), are far narrower, half-width ±13.70°: 0.0706% at α = 0°, 18.68% at τ = 0.5 (α = 21.17°), and flipped open to 100.00% at τ = 1, where three silver clearance beams strike the real axis, J² = −I. The avatar laps once and is back at the pyramid.'],
    'lila-raft-return-and-new-seed': ['渡河之筏与新的种子：只记住一个成员（Δ<sub>Schur</sub>(1) = 0.4583），τ = 5/6 时化身停在 300° 那簇典籍旁。α = θ*，三道通关束全开；K = 6 个世代的到访抄成表，回溯损失为 0，可 18 条记录没有一条是非预期的：筏子渡过河就放下，新的种子从这里开始。',
      'The raft and a new seed: only one member is remembered (Δ<sub>Schur</sub>(1) = 0.4583), and at τ = 5/6 the avatar rests by the cluster of classics at 300°. α = θ*, all three clearance beams fire; the visits of K = 6 epochs copied into a table have retrospective loss 0, yet not one of the 18 records is non-anticipating: the raft is put down once across, and a new seed starts here.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'omniscient-zeno-deadlock': ['M = 12：Δ = 0，化身冻在金字塔旁一步不动，十二程锁只开 10.70%。', 'M = 12: Δ = 0, the avatar is frozen by the pyramid and the twelve-pass lock is only 10.70% open.'],
    'amnesia-birth-open-corridor': ['失忆出生：M = 2，化身沿虚线走到 100.8°，正走向巨石三石门。', 'Born amnesiac: at M = 2 the avatar has walked the dashed path to 100.8°, toward the trilithon.'],
    'relic-attractor-deja-vu': ['到访三石门：α = 40°，五个世代扩成青色干涉环，I = 0.60。', 'At the trilithon: α = 40°, five epochs spread into cyan rings, I = 0.60.'],
    'classic-permission-lock-flip': ['α 调到 θ*：十二程锁翻开到 100.00%，三道银白通关束直射实轴。', 'α tuned to θ*: the twelve-pass lock flips to 100.00% and three silver beams strike the axis.'],
    'lila-raft-return-and-new-seed': ['渡河之筏：化身停在 300° 的典籍旁，三道通关束全开。', 'The raft: the avatar rests by the classics at 300°, all three beams firing.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay(); clock.pause();
    const before = eff();
    if (transition) transition.cancel();
    transition = null;
    S.lens = p.lens; S.drive = p.drive; S.M = p.M; S.K = p.K; S.alphaDeg = p.alphaDeg; S.from = null; S.blend = 1;
    sc.view([VIEW0[0], VIEW0[1], 1], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!booting && !TRV.still && p.drive !== 'tuneAlpha') startBlend(before, 600);
    syncFields();
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 M、α 与 K，换透镜，拖琥珀手柄。时间轴现在让化身绕环一圈。随时可以再选一张卡。', 'Free play: pull M, α and K, switch the lens, drag the amber handle. The rail now walks the avatar once around. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  window.BRAHMAN_LILA_DEBUG = Object.freeze({
    get state() {
      const Mo = model(), I = instances(Mo);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, lens: S.lens, drive: S.drive, blending: !!(S.from && S.blend < 1),
        M: Mo.M, K: Mo.K, alphaDeg: Mo.alphaDeg, tau: S.tau,
        constants: { thetaStar: TSTAR, thetaStarDeg: TSTAR_DEG, D: D_EFF, rho: RHO, passes: PASSES, finesse: FINESSE, torus: { R: R_T, r: r_T, dent: DENT }, axis: AXIS,
          relics: RELICS.map((r) => ({ key: r.key, deg: r.deg })), classics: CLASSICS.map((c) => c.deg) },
        schur: Mo.schur, stride: Mo.stride, psi: Mo.psi, psiMod: Mo.psiMod, near: { key: Mo.near.key, kind: Mo.near.kind, deg: Mo.near.deg, gap: Mo.near.gap },
        onePass: Mo.onePass, lock: Mo.lock, cavity: Mo.cavity, interference: Mo.interference, rings: Mo.rings, beams: Mo.beams, axisDrift: Mo.axisDrift,
        avatar: avatarAt(S.tau, Mo.M), leanInstances: I,
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.lens != null) S.lens = o.lens === 'worldlines' ? 'worldlines' : 'props';
      if (o.M != null) S.M = clamp(Math.round(o.M), 0, 12);
      if (o.K != null) S.K = clamp(Math.round(o.K), 1, K_MAX);
      if (o.alphaDeg != null) S.alphaDeg = clamp(o.alphaDeg, 0, 90);
      syncFields();
      if (o.t != null) clock.set(clamp(o.t, 0, 1));
      paint();
    },
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates where the handle would sit for α (degrees), for drag targets. */
    dragTarget(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(dialPt(v)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('classic-permission-lock-flip'); clock.pause(); clock.set(1); sc.view([VIEW0[0], VIEW0[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('classic-permission-lock-flip'));
  booting = false;
  paint();
})();
