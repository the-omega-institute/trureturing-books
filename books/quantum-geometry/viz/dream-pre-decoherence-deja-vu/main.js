/* ORTHO//DEJAVU · 梦的预编译与似曾相识 (chapter 37 supplement).
   One projection sandtable, three scenes on one canvas:
     basis    the Bloch disc of the real qubit |ψ⟩ = (cos θ, sin θ), r = (sin 2θ, 0, cos 2θ), and a ruler, the axis
              n = (sin β, 0, cos β). Two programs share it:
                choose  the rail turns the ruler along S.path (0° → 90° on the card); the input never moves; the
                        outcome weights p± = Tr(Q±ρ) follow the ruler.
                repeat  the rail runs two passes: t ∈ [0, 1] the first complete unread pinching with the dream ruler
                        β = 0 (the compile; its output is the immutable snapshot σ), t ∈ [1, 2] a second pinching of
                        the saved σ with the current ruler S.beta. Between the ends of a pass the state is the convex
                        mix (1 − f)·X + f·Π(X), i.e. the coherence across the ruler scaled by 1 − f.
              Every matrix is multiplied out as Q₊XQ₊ + Q₋XQ₋ (no Bloch shortcut); entropies in bits from the
              eigenvalues; the discarded Hilbert–Schmidt mass Tr((X − Y)ᵀ(X − Y)) carries no unit.
     funnel   the Gram determinant of three unit vectors with hard anchors x = y = 4/5 as a function of the third
              cosine z (an arch, non-negative on [0.28, 1]); nested prior windows on the rail (t ∈ [0, 2]), then
              (t ∈ [2, 3]) either the illustrative waking path z = 0.76 → 0.80 or, after a distinguishing fact is
              learned, the flush: the old target 0.80 excluded, the band replaced by [0.28, 0.52], z = 0.40 chosen.
              Insets: the golden window (lattice points (a, b) ∈ [−12, 12]², internal coordinate a + b(1 − φ), window
              centred at φ − 3/2 of width s = 2^−t), or after learning the four-world novelty grid and the re-projection
              of the saved σ with the new ruler.
     records  ρ₀₁ in the complex plane through two phase records (each overlap γ = −i, or 0 in the comparison):
              stops input, write-both, reverse-one, reverse-both; between stops the factor is interpolated in polar
              form for the animation only.
   The switch “post-dream logic upgrade / pipeline flush” is the model rule of the page: with the distinguishing fact
   f₁ it raises the context version, invalidates the cache entry, replaces the defeasible Gram prior and turns the
   ruler to β = 90°; with the redundant fact f_dup it changes nothing. Switching off recomputes everything from the
   unchanged snapshot.
   Read-only probe for browser suites: window.DEJAVU_SANDTABLE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, sgn, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const DEG = Math.PI / 180, TAU = Math.PI * 2, EPS = 1e-9, TOL = 1e-12;
  const PHI = (1 + Math.sqrt(5)) / 2;
  const BETA_DREAM = 0;
  const S = { scene: 'basis', prog: 'repeat', theta: 30, beta: 0, path: [0, 90], up: false, fact: 'novel', ov: 'unit', address: 'event-0' };
  const SC = {
    'basis:choose': { max: 1, rate: 0.32, step: 0.25 },
    'basis:repeat': { max: 2, rate: 0.5, step: 0.5 },
    funnel: { max: 3, rate: 0.6, step: 1 },
    records: { max: 3, rate: 0.6, step: 1 }
  };
  const scKey = () => (S.scene === 'basis' ? `basis:${S.prog}` : S.scene);

  /* ---------- 2 × 2 real matrices (every state of the Ruler scene is real) ---------- */
  const M = {
    mul: (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
      [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]],
    add: (A, B) => A.map((r, i) => r.map((v, j) => v + B[i][j])),
    sub: (A, B) => A.map((r, i) => r.map((v, j) => v - B[i][j])),
    lerp: (A, B, f) => A.map((r, i) => r.map((v, j) => v + (B[i][j] - v) * f)),
    tr: (A) => A[0][0] + A[1][1],
    hs: (A) => A[0][0] ** 2 + A[0][1] ** 2 + A[1][0] ** 2 + A[1][1] ** 2,
    maxAbs: (A) => Math.max(...A.flat().map(Math.abs)),
    copy: (A) => A.map((r) => r.slice())
  };
  const rhoOf = (thDeg) => { const c = Math.cos(thDeg * DEG), s = Math.sin(thDeg * DEG); return [[c * c, c * s], [s * c, s * s]]; };
  const axis = (bDeg) => [Math.sin(bDeg * DEG), Math.cos(bDeg * DEG)];   // n = (n_x, n_z)
  /** Q±(β) = ½(I ± n·σ), with σ_x = [[0, 1], [1, 0]] and σ_z = [[1, 0], [0, −1]]. */
  const Q = (bDeg, s) => { const [nx, nz] = axis(bDeg); return [[(1 + s * nz) / 2, s * nx / 2], [s * nx / 2, (1 - s * nz) / 2]]; };
  /** The complete unread pinching Π_β(X) = Q₊XQ₊ + Q₋XQ₋, multiplied out. */
  const pinch = (X, bDeg) => { const qp = Q(bDeg, 1), qm = Q(bDeg, -1); return M.add(M.mul(M.mul(qp, X), qp), M.mul(M.mul(qm, X), qm)); };
  const weights = (X, bDeg) => [M.tr(M.mul(Q(bDeg, 1), X)), M.tr(M.mul(Q(bDeg, -1), X))];
  const eig = (X) => { const m = (X[0][0] + X[1][1]) / 2, r = Math.hypot((X[0][0] - X[1][1]) / 2, (X[0][1] + X[1][0]) / 2); return [m + r, m - r]; };
  const Hbits = (X) => eig(X).reduce((s, x) => (x > 1e-15 ? s - x * Math.log2(x) : s), 0);
  const blochOf = (X) => [X[0][1] + X[1][0], X[0][0] - X[1][1]];   // (r_x, r_z)
  const surprisal = (p) => (p > 1e-15 ? -Math.log2(p) : Infinity);

  /* ---------- the snapshot and the learning rule (the page's model) ---------- */
  const WIN = [[0.28, 1], [0.64, 0.88], [0.76, 0.82]], NEW_BAND = [0.28, 0.52], Z_DREAM = 0.8, Z_NEW = 0.4, ANCHOR = 0.8;
  /** The compile: the first complete unread pinching of the input with the dream ruler β = 0, context version 0,
      target 00, the old Gram prior. Recomputed from θ only; the switch never rewrites it. */
  const snapshot = () => ({ sigma: pinch(rhoOf(S.theta), BETA_DREAM), beta: BETA_DREAM, version: 0, address: 'event-0', target: '00', band: WIN[2].slice(), zTarget: Z_DREAM, timeTag: null });
  /** A distinguishing fact is learned (and it rules out the dream's guess 00). */
  const flushOn = () => S.up && S.fact === 'novel';
  const ctxVersion = () => (flushOn() ? 1 : 0);

  /* ---------- the Ruler scene ---------- */
  const chooseBeta = (t) => S.path[0] + (S.path[1] - S.path[0]) * t;
  const betaNow = () => (S.scene === 'basis' && S.prog === 'choose' ? chooseBeta(clock.t) : S.beta);
  function basisFrame(t) {
    const rin = rhoOf(S.theta);
    if (S.prog === 'choose') { const b = chooseBeta(t); return { pass: 0, beta: b, before: rin, after: pinch(rin, b), cur: rin, f: 0 }; }
    const snap = snapshot();
    if (t <= 1) return { pass: 1, beta: BETA_DREAM, before: rin, after: snap.sigma, cur: M.lerp(rin, snap.sigma, t), f: t };
    const out = pinch(snap.sigma, S.beta), f = Math.min(1, t - 1);
    return { pass: 2, beta: S.beta, before: snap.sigma, after: out, cur: M.lerp(snap.sigma, out, f), f };
  }
  function basisNumbers(fr) {
    const H0 = Hbits(fr.before), H = Hbits(fr.cur), w = weights(fr.cur, fr.beta), once = pinch(fr.cur, fr.beta);
    return {
      existing: H, added: H - H0, mass: M.hs(M.sub(fr.before, fr.cur)), passMass: M.hs(M.sub(fr.before, fr.after)),
      idem: M.maxAbs(M.sub(pinch(once, fr.beta), once)), weights: w, surprisal: w.map(surprisal), trace: M.tr(fr.cur), eig: eig(fr.cur)
    };
  }
  /** The model cache: hit = Valid ∧ address ∧ context version ∧ the current ruler leaves the saved state fixed. */
  function cacheAt(t) {
    const snap = snapshot(), repeat = S.scene === 'basis' && S.prog === 'repeat';
    const stored = !repeat || t >= 1 - EPS;
    const entry = { valid: stored && !flushOn() ? 1 : 0, address: snap.address, version: snap.version, timeTag: snap.timeTag, payload: M.copy(snap.sigma), target: snap.target, flush: flushOn() ? 1 : 0, stored };
    const reproj = pinch(snap.sigma, S.beta);
    const match = { address: S.address === entry.address, version: ctxVersion() === entry.version, payload: M.maxAbs(M.sub(reproj, snap.sigma)) < TOL };
    const checked = repeat && t >= 2 - EPS;
    const hit = checked && entry.valid === 1 && match.address && match.version && match.payload;
    return { entry, match, checked, repeat, hit, familiarity: hit && entry.timeTag === null };
  }

  /* ---------- the Funnel scene ---------- */
  const gram = (x, y, z) => [[1, x, z], [x, 1, y], [z, y, 1]];
  const det3 = (G) => G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
  const minors = (G) => [G[0][0], G[1][1], G[2][2], G[0][0] * G[1][1] - G[0][1] ** 2, G[0][0] * G[2][2] - G[0][2] ** 2, G[1][1] * G[2][2] - G[1][2] ** 2, det3(G)];
  const detG = (z) => det3(gram(ANCHOR, ANCHOR, z));
  const psdAt = (z) => minors(gram(ANCHOR, ANCHOR, z)).every((m) => m >= -TOL);
  /** C(φ) = (4/5, (3/5)cos φ, (3/5)sin φ) realizes z = A·C with A = (4/5, 3/5, 0): q = cos φ = (z − 16/25)/(9/25). */
  const qOf = (z) => (z - 16 / 25) / (9 / 25);
  function funnelFrame(t) {
    const k = Math.min(1, Math.floor(t)), f = clamp(t - k, 0, 1);
    const win = t >= 2 ? WIN[2].slice() : [WIN[k][0] + (WIN[k + 1][0] - WIN[k][0]) * f, WIN[k][1] + (WIN[k + 1][1] - WIN[k][1]) * f];
    const s = Math.pow(2, -Math.min(2, t)), g = clamp(t - 2, 0, 1), learned = flushOn() && t >= 2 - EPS;
    const band = learned ? NEW_BAND.slice() : win;
    return { t, win, s, g, learned, band, past: Math.min(2, Math.floor(t + EPS)), zTarget: learned ? Z_NEW : Z_DREAM, zNow: learned ? Z_NEW : (t >= 2 - EPS ? 0.76 + 0.04 * g : null) };
  }
  // the golden window: a finite box of the golden lattice
  const GOLD = []; for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) GOLD.push({ a, b, par: a + b * PHI, perp: a + b * (1 - PHI) });
  const GC = PHI - 1.5;
  const inWin = (p, s) => p.perp >= GC - s / 2 - TOL && p.perp <= GC + s / 2 + TOL;
  const goldCount = (s) => GOLD.reduce((n, p) => n + (inWin(p, s) ? 1 : 0), 0);
  const GOLD_STOPS = [1, 0.5, 0.25];
  // four worlds and their features: f₀(a, b) = a, f₁(a, b) = b, f_dup = f₀
  const WORLDS = ['00', '01', '10', '11'];
  const FEAT = { f0: (w) => w[0], f1: (w) => w[1], dup: (w) => w[0] };
  function escape(fs) {
    let esc = 0, n = 0;
    for (const x of WORLDS) for (const y of WORLDS) if (x !== y) { n++; if (fs.every((f) => f(x) === f(y))) esc++; }
    return { esc, n, rate: esc / n };
  }
  function uniqueCapture(fs, i) {
    let u = 0;
    for (const x of WORLDS) for (const y of WORLDS) if (x !== y && fs.every((f, k) => k === i || f(x) === f(y)) && fs[i](x) !== fs[i](y)) u++;
    return u;
  }
  function novelty() {
    const nf = S.fact === 'novel' ? FEAT.f1 : FEAT.dup, cat = [FEAT.f0, nf];
    return { old: escape([FEAT.f0]), full: escape(cat), U: uniqueCapture(cat, 1), nondegenerate: WORLDS.length >= 2 };
  }

  /* ---------- the Records scene ---------- */
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const conj = (a) => [a[0], -a[1]];
  const cabs = (a) => Math.hypot(a[0], a[1]);
  // a record: r[i][a] is the environment amplitude in slot a when the system is at address i
  const RECORD = { unit: [[[1, 0], [0, 0]], [[0, 1], [0, 0]]], zero: [[[1, 0], [0, 0]], [[0, 0], [1, 0]]] };
  const overlapOf = (r, i, j) => r[i].reduce((s, a, k) => cadd(s, cmul(a, conj(r[j][k]))), [0, 0]);   // γ(i, j) = Σₐ r(i, a)·r(j, a)̄
  const reverseRecord = (r) => r.map((row) => row.map(conj));
  const STOPS = ['input', 'write-both', 'reverse-one', 'reverse-both'];
  function recordStops() {
    const r = RECORD[S.ov], g = overlapOf(r, 0, 1), gr = overlapOf(reverseRecord(r), 0, 1);
    const v0 = [rhoOf(S.theta)[0][1], 0], v1 = cmul(cmul(v0, g), g), v2 = cmul(v1, gr), v3 = cmul(v2, gr);
    return { g, gr, vals: [v0, v1, v2, v3] };
  }
  function recordAt(t) {
    const { g, gr, vals } = recordStops(), n = Math.round(t);
    if (Math.abs(t - n) < EPS) return vals[clamp(n, 0, 3)];
    const k = Math.min(2, Math.floor(t)), f = t - k, fac = k === 0 ? cmul(g, g) : gr;
    const ang = (k === 0 ? 2 * Math.atan2(g[1], g[0]) : Math.atan2(gr[1], gr[0])) * f, mod = (1 - f) + f * cabs(fac);
    return cmul(vals[k], [mod * Math.cos(ang), mod * Math.sin(ang)]);
  }
  const stopName = (t) => { const n = Math.round(t); return Math.abs(t - n) < EPS ? STOPS[clamp(n, 0, 3)] : `${STOPS[Math.floor(t)]}→${STOPS[Math.floor(t) + 1]}`; };

  /* ---------- drawing helpers ---------- */
  const thick = () => (TRV.thumbMode ? 2 : 1);
  const face = (f) => (f === 'body' ? TRV.fonts.body : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11.5}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.strokeText(str, x, y);
    ctx.fillStyle = color; ctx.fillText(str, x, y); ctx.globalAlpha = 1;
    return ctx.measureText(str).width;
  }
  function arrow(ctx, x0, y0, x1, y1, color, w, o) {
    o = o || {};
    const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    ctx.save(); ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.setLineDash(o.dash || []);
    if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.setLineDash([]);
    if (len > 8 && o.head !== false) {
      const h = Math.min(o.headSize || 11, len * 0.5), ux = dx / len, uy = dy / len;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - ux * h - uy * h * 0.45, y1 - uy * h + ux * h * 0.45); ctx.lineTo(x1 - ux * h + uy * h * 0.45, y1 - uy * h - ux * h * 0.45); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
  function dot(ctx, x, y, r, color, o) {
    o = o || {};
    ctx.save(); ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
    if (o.ring) { ctx.strokeStyle = color; ctx.lineWidth = o.width || 1.6; ctx.setLineDash(o.dash || []); ctx.stroke(); } else { if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; } ctx.fillStyle = color; ctx.fill(); }
    ctx.restore();
  }
  function seg(ctx, x0, y0, x1, y1, color, w, o) {
    o = o || {};
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.globalAlpha = o.alpha == null ? 1 : o.alpha; ctx.setLineDash(o.dash || []);
    if (o.glow) { ctx.shadowColor = color; ctx.shadowBlur = o.glow; }
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore();
  }
  const fmtC = (z, d) => {
    const re = Math.abs(z[0]) < 0.5 * 10 ** -d ? 0 : z[0], im = Math.abs(z[1]) < 0.5 * 10 ** -d ? 0 : z[1];
    if (!im) return fix(re, d);
    if (!re) return `${im < 0 ? '−' : ''}${Math.abs(Math.abs(im) - 1) < 1e-12 ? '' : fix(Math.abs(im), d)}i`;
    return `${fix(re, d)} ${im < 0 ? '−' : '+'} ${fix(Math.abs(im), d)}i`;
  };
  const bit = (x, d) => `${fix(x, d == null ? 4 : d)} bit`;
  const sbit = (x) => `${sgn(x, 4)} bit`;
  const surpTxt = (s) => (isFinite(s) ? fix(s, 4) : '∞');
  /** Put an overlay element of the stage at (x, y) with the given width (or max width); returns its height. */
  function place(el, x, y, o) {
    if (el.classList.contains('stagectl')) el.classList.toggle('tight', !!(o && o.max && o.max < 240));
    el.style.left = `${Math.round(x)}px`; el.style.top = `${Math.round(y)}px`;
    el.style.width = o && o.w ? `${Math.round(o.w)}px` : ''; el.style.maxWidth = o && o.max ? `${Math.round(o.max)}px` : '';
    return el.offsetHeight;
  }
  const overlayH = (el, x, y, o) => { if (TRV.thumbMode || el.hidden) return 0; el.style.visibility = ''; return place(el, x, y, o); };
  let geo = null;   // where the draggable things are (for the pointer)

  /* ---------- Ruler scene drawing ---------- */
  function drawDisc(ctx, box, fr, W, H) {
    const tk = thick(), words = !TRV.thumbMode;
    const g = kit.plot($('cv'), { x: [-1.24, 1.24], y: [-1.24, 1.24], pad: [box.x, W - box.x - box.s, box.y, H - box.y - box.s], clear: false, equal: true });
    const X = (v) => g.X(v[0]), Y = (v) => g.Y(v[1]), cx = g.X(0), cy = g.Y(0), rad = g.scale;
    // the disc
    const grd = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.35, rad * 0.05, cx, cy, rad);
    grd.addColorStop(0, TRV.alpha(P.cyan, 0.09)); grd.addColorStop(1, TRV.alpha(P.cyan, 0.015));
    ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, TAU); ctx.fill();
    seg(ctx, cx - rad, cy, cx + rad, cy, P.panelEdge, 1); seg(ctx, cx, cy - rad, cx, cy + rad, P.panelEdge, 1);
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.4 * tk; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, TAU); ctx.stroke();
    // rulers: the active one (ink) and, when it differs, the other one (dashed)
    const ruler = (b, color, w, o) => { const n = axis(b); seg(ctx, X([-1.1 * n[0], 0]), Y([0, -1.1 * n[1]]), X([1.1 * n[0], 0]), Y([0, 1.1 * n[1]]), color, w, o); return n; };
    const active = fr.beta, ghostB = fr.pass === 0 ? S.path[0] : fr.pass === 2 ? BETA_DREAM : null;
    if (ghostB != null && Math.abs(ghostB - active) > 0.5) {
      const n0 = ruler(ghostB, P.dim, 1.3 * tk, { dash: [5, 5], alpha: 0.9 });
      if (words) text(ctx, fr.pass === 2 ? L('梦的尺子 0°', 'dream ruler 0°') : `β = ${fix(ghostB, 0)}°`, X([1.17 * n0[0], 0]), Y([0, 1.17 * n0[1]]), P.dim, { align: n0[0] > 0.3 ? 'left' : 'center', size: 10.5, face: 'body' });
    }
    const n = ruler(active, P.ink, 1.8 * tk, { alpha: 0.9 });
    dot(ctx, X([n[0], 0]), Y([0, n[1]]), 3.2 * tk, P.ink); dot(ctx, X([-n[0], 0]), Y([0, -n[1]]), 3.2 * tk, P.ink);
    if (words) {
      const lab = (k, s) => { const ax = k * n[0], az = k * n[1]; text(ctx, s, X([1.16 * ax, 0]), Y([0, 1.16 * az]), P.ink, { align: Math.abs(ax) < 0.35 ? 'center' : ax > 0 ? 'left' : 'right', size: 12 }); };
      lab(1, 'Q₊'); lab(-1, 'Q₋');
    }
    // the state, its shadow on the ruler (cyan) and the part across the ruler (magenta)
    const rb = blochOf(fr.before), rc = blochOf(fr.cur), dotN = rc[0] * n[0] + rc[1] * n[1], foot = [dotN * n[0], dotN * n[1]];
    const ghostTip = [X([rb[0], 0]), Y([0, rb[1]])], tip = [X([rc[0], 0]), Y([0, rc[1]])], ft = [X([foot[0], 0]), Y([0, foot[1]])];
    const perpB = Math.hypot(rb[0] - foot[0], rb[1] - foot[1]), perpC = Math.hypot(rc[0] - foot[0], rc[1] - foot[1]);
    if (fr.pass !== 0 && perpB > 1e-6) seg(ctx, tip[0], tip[1], ghostTip[0], ghostTip[1], P.magenta, 1.6 * tk, { dash: [3, 4], alpha: 0.55 });
    if (Math.hypot(ghostTip[0] - tip[0], ghostTip[1] - tip[1]) > 2) arrow(ctx, cx, cy, ghostTip[0], ghostTip[1], P.dim, 1.4 * tk, { dash: [5, 4], alpha: 0.9, headSize: 9 });
    seg(ctx, cx, cy, ft[0], ft[1], P.cyan, 4 * tk, { glow: 8, alpha: 0.9 });
    if (perpC > 1e-6) {
      if (fr.pass === 0) seg(ctx, ft[0], ft[1], tip[0], tip[1], P.dim, 1.4 * tk, { dash: [3, 3] });
      else seg(ctx, ft[0], ft[1], tip[0], tip[1], P.magenta, 2.4 * tk, { glow: 6 });
      const m = 7, ux = (tip[0] - ft[0]) / Math.hypot(tip[0] - ft[0], tip[1] - ft[1]), uy = (tip[1] - ft[1]) / Math.hypot(tip[0] - ft[0], tip[1] - ft[1]), sx = cx - ft[0], sy = cy - ft[1], sl = Math.hypot(sx, sy) || 1;
      if (Math.hypot(tip[0] - ft[0], tip[1] - ft[1]) > 14 && sl > 14) {
        const vx = sx / sl, vy = sy / sl; ctx.strokeStyle = P.dim; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ft[0] + ux * m, ft[1] + uy * m); ctx.lineTo(ft[0] + ux * m + vx * m, ft[1] + uy * m + vy * m); ctx.lineTo(ft[0] + vx * m, ft[1] + vy * m); ctx.stroke();
      }
    }
    dot(ctx, ft[0], ft[1], 4.2 * tk, P.cyan, { glow: 8 });
    if (Math.hypot(tip[0] - cx, tip[1] - cy) > 3) arrow(ctx, cx, cy, tip[0], tip[1], P.amber, 3 * tk, { glow: 12, headSize: 12 * tk });
    else dot(ctx, cx, cy, 5 * tk, P.amber, { glow: 12 });
    if (words) {
      const away = (p, txt, col) => { const dx = p[0] - cx, dy = p[1] - cy, d = Math.hypot(dx, dy) || 1; text(ctx, txt, p[0] + dx / d * 16, p[1] + dy / d * 14, col, { align: dx / d > 0.3 ? 'left' : dx / d < -0.3 ? 'right' : 'center', size: 11, face: 'body' }); };
      if (Math.hypot(ghostTip[0] - tip[0], ghostTip[1] - tip[1]) > 18) away(ghostTip, fr.pass === 2 ? L('保存的 σ', 'saved σ') : L('输入', 'input'), P.dim);
      else if (fr.pass === 0) {
        const mx = cx + (tip[0] - cx) * 0.55, my = cy + (tip[1] - cy) * 0.55, ln = Math.hypot(tip[0] - cx, tip[1] - cy) || 1, px = (tip[1] - cy) / ln, py = -(tip[0] - cx) / ln;
        const s2 = px * (tip[0] - cx) < 0 || py < 0 ? 1 : -1;
        text(ctx, L(`输入 θ = ${fix(S.theta, 0)}°`, `input θ = ${fix(S.theta, 0)}°`), mx + s2 * px * 18, my + s2 * py * 18, P.amber, { align: 'right', size: 11, face: 'body' });
      }
    }
    geo = { cx, cy, rad, tip: fr.pass === 2 ? null : ghostTip, scene: 'basis' };
  }

  function drawGrid(ctx, x, y, s, X, ghost, label, labelColor) {
    const cs = s / 2, tk = thick(), words = !TRV.thumbMode, num = words && cs >= 34;
    if (words && label) text(ctx, label, x + s / 2, y - 10, labelColor || P.dim, { align: 'center', size: 11, face: 'body' });
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) {
      const v = X[i][j], gv = ghost ? ghost[i][j] : null, cxx = x + (j + 0.5) * cs, cyy = y + (i + 0.5) * cs - (num ? 6 : 0), col = i === j ? P.cyan : P.magenta;
      ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(x + j * cs + 0.5, y + i * cs + 0.5, cs - 1, cs - 1);
      const side = (u) => cs * (num ? 0.6 : 0.84) * Math.sqrt(Math.min(1, Math.abs(u)));
      if (gv != null && side(gv) > 1.5) { ctx.save(); ctx.setLineDash([4, 3]); ctx.strokeStyle = P.ink; ctx.globalAlpha = 0.45; ctx.lineWidth = 1 * tk; const sg = side(gv); ctx.strokeRect(cxx - sg / 2, cyy - sg / 2, sg, sg); ctx.restore(); }
      const sv = side(v);
      if (sv > 0.6) { ctx.save(); ctx.fillStyle = TRV.alpha(col, i === j ? 0.72 : 0.68); ctx.shadowColor = col; ctx.shadowBlur = TRV.thumbMode ? 12 : 6; ctx.fillRect(cxx - sv / 2, cyy - sv / 2, sv, sv); ctx.restore(); }
      if (num) text(ctx, fix(v, 3), cxx, y + (i + 1) * cs - 9, P.ink, { align: 'center', size: cs >= 54 ? 11 : 9.5 });
    }
  }
  /** Before → after: two grids side by side (or stacked) with the map between them; returns the height used. */
  function drawPair(ctx, fr, x, y, gs, stacked) {
    const words = !TRV.thumbMode, gap = stacked ? 30 : 56;
    const before = fr.pass === 2 ? L('保存的 σ', 'saved σ') : L('输入 ρ', 'input ρ');
    const after = fr.pass === 2 ? L('再投影后', 're-projected') : L('编译后', 'compiled');
    const op = `Π(${fix(fr.beta, 0)}°)`;
    drawGrid(ctx, x, y, gs, fr.before, null, before, P.dim);
    if (!stacked) {
      const x1 = x + gs + gap;
      drawGrid(ctx, x1, y, gs, fr.cur, fr.before, after, P.amber);
      arrow(ctx, x + gs + 10, y + gs / 2, x1 - 10, y + gs / 2, P.ink, 1.4 * thick(), { headSize: 8 });
      if (words) text(ctx, op, x + gs + gap / 2, y + gs / 2 - 12, P.ink, { align: 'center', size: 10.5 });
      return gs;
    }
    const y1 = y + gs + gap;
    arrow(ctx, x + gs / 2, y + gs + 3, x + gs / 2, y1 - 15, P.ink, 1.4, { headSize: 7 });
    if (words) text(ctx, op, x + gs / 2 + 7, y + gs + 11, P.ink, { size: 10 });
    drawGrid(ctx, x, y1, gs, fr.cur, fr.before, after, P.amber);
    return 2 * gs + gap;
  }
  /** Place an overlay of the stage if it fits above yMax (else hide it); returns the height it takes (0 if hidden). */
  function fit(el, x, y, o, yMax) {
    if (TRV.thumbMode || el.hidden) return 0;
    const h = place(el, x, y, o), ok = y + h <= yMax + 2;
    el.style.visibility = ok ? '' : 'hidden';
    return ok ? h : 0;
  }
  const measure = (el, o) => (TRV.thumbMode || el.hidden ? 0 : place(el, -9999, 0, o));
  /** Narrow frames, repeat program (the cards PRECOMPILE and DEJA-VU-HIT) when the disc cannot sit on top: the disc on
      the left with the switch under it, the two grids stacked in the right column, and the result lines and the cache
      card across the frame under both. The grids take the largest size (110 px down) that still leaves the verdict and
      three result lines above the card; from 68 px up their cells carry their numbers. Kept per frame, language and card. */
  let pileMemo = null;
  function pileLayout(R, ctl, card) {
    const cardH = measure(card, { w: R.w }), key = [R.x, R.y, R.w, R.h, cardH, L('zh', 'en')].join('|');
    if (pileMemo && pileMemo.key === key) return pileMemo.out;
    let pick = null;
    for (let gs = 110; gs >= 40; gs -= 4) {
      const pairH = 16 + 2 * gs + 30, top = Math.min(R.w - 12 - gs - 8, R.w * 0.52);
      let D = top;
      for (let k = 0; k < 2; k++) D = clamp(pairH - 8 - measure(ctl, { max: D }), Math.min(96, top), top);
      const ch = measure(ctl, { max: D }), rowH = Math.max(pairH, D + 8 + ch);
      pick = { gs, D, rowH };
      if (Math.floor((R.h - rowH - 8 - (cardH ? cardH + 2 : 0) - 24) / 17) >= 3) break;
    }
    const { gs, D, rowH } = pick;
    const out = { disc: { x: R.x, y: R.y, s: D }, col: { x: R.x + D + 12, y: R.y, w: R.w - D - 12, gs, ctl: { x: R.x, y: R.y + D + 8, w: D }, below: { x: R.x, y: R.y + rowH + 8, w: R.w } } };
    pileMemo = { key, out };
    return out;
  }

  function drawBasis(ctx, R) {
    const fr = basisFrame(clock.t), nm = basisNumbers(fr), thumb = TRV.thumbMode, words = !thumb, repeat = S.prog === 'repeat';
    const card = $('cacheCard'), ctl = $('upCtl'), yEnd = R.y + R.h;
    card.hidden = !repeat;
    let disc, col, regime;
    if (R.w >= 520) {
      const D = thumb ? Math.min(R.h, R.w * 0.46) : Math.min(R.h, R.w * 0.5), dx = thumb ? R.w * 0.04 : 0, gap = thumb ? 56 : 22;
      disc = { x: R.x + dx, y: R.y + Math.max(0, (R.h - D) / 2), s: D };
      col = { x: R.x + dx + D + gap, y: R.y, w: R.w - dx - D - gap };
      regime = 'side';
    } else {
      // narrow: the disc on top when everything else fits under it, else the disc beside a compact column
      const gs = clamp((R.w - 56) / 2, 40, 110), ctlH = measure(ctl, { max: R.w });
      const rest = repeat ? 18 + gs + 8 + ctlH + 10 + (words ? 18 + 4 * 17 + 8 : 0) + measure(card, { w: R.w }) : 22 + 2 * 41 + 10 + ctlH + 10 + 100;
      const Dt = Math.min(R.w * 0.86, R.h - rest - 12);
      if (Dt >= Math.min(210, R.w * 0.62)) { disc = { x: R.x + (R.w - Dt) / 2, y: R.y, s: Dt }; col = { x: R.x, y: R.y + Dt + 6, w: R.w, gs }; regime = 'stack'; }
      else if (repeat && words) { const p = pileLayout(R, ctl, card); disc = p.disc; col = p.col; regime = 'pile'; }
      else { const D = Math.min(R.w * 0.52, R.h); disc = { x: R.x, y: R.y, s: D }; col = { x: R.x + D + 12, y: R.y, w: R.w - D - 12, below: { x: R.x, y: R.y + D + 8, w: R.w } }; regime = 'compact'; }
    }
    drawDisc(ctx, disc, fr, R.W, R.H);
    if (!repeat) { layoutChoose(ctx, fr, col, regime, yEnd); return; }
    if (thumb) { const gs = clamp(Math.min((col.w - 70) / 2, R.h * 0.4), 44, 230); drawPair(ctx, fr, col.x + Math.max(0, (col.w - 2 * gs - 56) / 2), R.y + (R.h - gs) / 2, gs, false); return; }
    const done = fr.f >= 1 - EPS, same = M.maxAbs(M.sub(fr.after, fr.before)) < TOL;
    const verdict = [!done ? L(`进行中 ${fix(100 * fr.f, 0)}%`, `${fix(100 * fr.f, 0)}% done`)
      : same ? L('前后两个矩阵相同', 'the two matrices are the same') : fr.pass === 2 ? L('前后两个矩阵不同', 'the two matrices differ') : L(`非对角 ${fix(Math.abs(fr.before[0][1]), 3)} → 0`, `off-diagonal ${fix(Math.abs(fr.before[0][1]), 3)} → 0`),
    done ? (same ? P.cyan : P.magenta) : P.dim];
    const massRow = [L(`丢弃的 HS 质量 ${fix(nm.mass, 4)}`, `discarded HS mass ${fix(nm.mass, 4)}`), nm.mass > 1e-6 ? P.magenta : P.dim, 400];
    const surpRow = [L(`结果惊讶度 ${surpTxt(nm.surprisal[0])} / ${surpTxt(nm.surprisal[1])} bit`, `outcome surprisal ${surpTxt(nm.surprisal[0])} / ${surpTxt(nm.surprisal[1])} bit`), P.dim, 400];
    const rows = [
      [L(`本次新增熵 ΔH = ${sbit(nm.added)}`, `added this pass ΔH = ${sbit(nm.added)}`), Math.abs(nm.added) < 5e-5 && fr.pass === 2 && done ? P.cyan : P.ink, 600],
      [L(`态熵 H = ${bit(nm.existing)}`, `state entropy H = ${bit(nm.existing)}`), P.ink, 600]
    ].concat(fr.pass === 2 ? [surpRow, massRow] : [massRow, surpRow]);
    const lines = (x, y, n, size, withVerdict) => {
      const v = withVerdict === false ? 0 : 18;
      if (v) text(ctx, verdict[0], x, y + 7, verdict[1], { size: size - 0.5, face: 'body' });
      rows.slice(0, n).forEach(([s, c, w], k) => text(ctx, s, x, y + v + 7 + k * 17, c, { size, weight: w }));
      return v + n * 17 + 6;
    };
    if (regime === 'side') {
      let y = col.y;
      const hc = fit(ctl, col.x, y, { max: col.w }, yEnd); y += hc ? hc + 14 : 0;
      // what gives way first when the frame is short: the fourth row, the verdict, then (first pass only) the card
      const cw = Math.min(col.w, 300), avail = yEnd - y;
      let cardH = measure(card, { w: cw }), verdictOn = true, n = 4;
      const need = () => 18 + 10 + (verdictOn ? 18 : 0) + n * 17 + 6 + (cardH ? cardH + 4 : 0);
      for (const step of fr.pass === 2 ? ['row', 'verdict', 'row'] : ['row', 'verdict', 'card', 'row']) {
        if (avail - need() >= 50) break;
        if (step === 'row') n--; else if (step === 'verdict') verdictOn = false; else cardH = 0;
      }
      const gs = clamp(Math.min((col.w - 56) / 2, avail - need(), 120), 40, 120);
      y += 18 + drawPair(ctx, fr, col.x, y + 18, gs, false) + 10;
      y += lines(col.x, y, n, 11.5, verdictOn);
      if (cardH) fit(card, col.x, y, { w: cw }, yEnd); else card.style.visibility = 'hidden';
    } else if (regime === 'stack') {
      let y = col.y;
      const gs = col.gs, px = col.x + Math.max(0, (col.w - 2 * gs - 56) / 2);
      y += 18 + drawPair(ctx, fr, px, y + 18, gs, false) + 8;
      const hc = fit(ctl, col.x, y, { max: col.w }, yEnd); y += hc ? hc + 10 : 0;
      y += lines(col.x, y, 4, 11);
      fit(card, col.x, y, { w: col.w }, yEnd);
    } else if (regime === 'pile') {
      // the grids stacked in the right column, the switch under the disc, then the result lines and the card across the
      // frame below both: each block starts under the one above it, so none is drawn over another
      drawPair(ctx, fr, col.x + Math.max(0, (col.w - col.gs) / 2), col.y + 16, col.gs, true);
      fit(ctl, col.ctl.x, col.ctl.y, { max: col.ctl.w }, yEnd);
      let y = col.below.y;
      // the card keeps its place when it fits at all; the result lines take what is left above it (fourth row first to go)
      const cardH = measure(card, { w: col.below.w }), reserve = cardH && yEnd - y >= cardH + 2 ? cardH + 2 : 0, room = yEnd - y - reserve;
      if (room >= 24) y += lines(col.below.x, y, clamp(Math.floor((room - 24) / 17), 0, 4), 11);
      fit(card, col.below.x, y, { w: col.below.w }, yEnd);
    } else {
      const gs = clamp(Math.min(col.w - 8, (R.h - 50) / 2), 30, 100);
      drawPair(ctx, fr, col.x + Math.max(0, (col.w - gs) / 2), col.y + 16, gs, true);
      let y = col.below.y;
      const hc = fit(ctl, col.below.x, y, { max: col.w + col.below.w }, yEnd); y += hc ? hc + 8 : 0;
      const n = clamp(Math.floor((yEnd - y - 24) / 17), 0, 3);
      if (n > 0) y += lines(col.below.x, y, n, 11);
      fit(card, col.below.x, y, { w: col.below.w }, yEnd);
    }
  }

  /** Outcome weights of the unmoved input on the ruler where it started and on the current one; returns the bottom. */
  function drawWeights(ctx, fr, x, y, w) {
    const words = !TRV.thumbMode, rin = fr.before, narrow = w < 230;
    if (words) { text(ctx, narrow ? L('结果权重', 'outcome weights') : L('结果权重：同一个输入，两把尺子', 'outcome weights: one input, two rulers'), x, y + 6, P.dim, { size: 11, face: 'body' }); y += 22; }
    for (const [b, c] of [[S.path[0], P.dim], [fr.beta, P.amber]]) {
      const [pp, pm] = weights(rin, b);
      if (words) {
        text(ctx, `β = ${fix(b, 0)}°`, x, y + 6, c, { size: 11.5, weight: 600 });
        if (!narrow) text(ctx, `p₊ ${fix(pp, 3)} · p₋ ${fix(pm, 3)}`, x + w, y + 6, P.ink, { align: 'right', size: 11 });
      }
      const by = y + 16, bh = TRV.thumbMode ? 16 : 11;
      ctx.fillStyle = TRV.alpha(P.cyan, 0.75); ctx.fillRect(x, by, w * pp, bh);
      ctx.fillStyle = TRV.alpha(P.magenta, 0.55); ctx.fillRect(x + w * pp, by, w * pm, bh);
      if (c === P.amber) { ctx.strokeStyle = P.amber; ctx.lineWidth = 1.5; ctx.strokeRect(x - 0.5, by - 0.5, w + 1, bh + 1); }
      y = by + bh + 14;
      if (words && narrow) { text(ctx, `p₊ ${fix(pp, 3)} · p₋ ${fix(pm, 3)}`, x, y - 6, P.ink, { size: 10.5 }); y += 12; }
    }
    return y;
  }
  function layoutChoose(ctx, fr, col, regime, yEnd) {
    const ctl = $('upCtl');
    if (regime === 'side') {
      let y = col.y;
      const hc = fit(ctl, col.x, y, { max: col.w }, yEnd); y += hc ? hc + 14 : 0;
      const w = Math.min(col.w, 320);
      y = drawWeights(ctx, fr, col.x, y, w);
      drawKrylov(ctx, { x: col.x, y: y + 6, w, h: yEnd - y - 6 });
    } else if (regime === 'stack') {
      let y = drawWeights(ctx, fr, col.x, col.y, col.w);
      const hc = fit(ctl, col.x, y, { max: col.w }, yEnd); y += hc ? hc + 10 : 0;
      drawKrylov(ctx, { x: col.x, y, w: col.w, h: yEnd - y });
    } else {
      drawWeights(ctx, fr, col.x, col.y, col.w);
      let y = col.below.y;
      const hc = fit(ctl, col.below.x, y, { max: col.below.w }, yEnd); y += hc ? hc + 8 : 0;
      drawKrylov(ctx, { x: col.below.x, y, w: col.below.w, h: yEnd - y });
    }
  }

  /** The inset of the choose card: observable Krylov dimensions 1 → 2 → 3 in V = ℝ³ with rank C = 1. */
  function drawKrylov(ctx, box) {
    if (TRV.thumbMode || box.h < 70 || box.w < 180) return;
    // O_m = span{(Tᵀ)ᵏ Cᵀ y : k ≤ m}: with T e₁ = e₂, T e₂ = e₃, T e₃ = e₁ and C(v) = v₁, Cᵀ = e₁, Tᵀ e₁ = e₃, Tᵀ e₃ = e₂
    const T = [[0, 0, 1], [1, 0, 0], [0, 1, 0]], Tt = T[0].map((_, j) => T.map((r) => r[j]));
    const dims = [], vecs = [[1, 0, 0]];
    for (let m = 0; m < 3; m++) { if (m > 0) { const v = vecs[m - 1]; vecs.push(Tt.map((r) => r[0] * v[0] + r[1] * v[1] + r[2] * v[2])); } dims.push(rank(vecs)); }
    const steps = dims.reduce((s, d, k) => s + (k > 0 && d > dims[k - 1] ? 1 : 0), 0);
    text(ctx, L('观测子空间 Oₘ 的维数（ℝ³，rank C = 1）', 'dimension of the observed subspace Oₘ (ℝ³, rank C = 1)'), box.x, box.y + 6, P.dim, { size: 11, face: 'body' });
    const s = Math.min(46, (box.w - 40) / 3 - 16), y = box.y + 22;
    dims.forEach((d, k) => {
      const x = box.x + k * (s + 34), c = P.violet;
      ctx.save(); ctx.strokeStyle = c; ctx.fillStyle = TRV.alpha(c, 0.25); ctx.lineWidth = 1.6;
      if (d === 1) { ctx.beginPath(); ctx.moveTo(x + 4, y + s - 4); ctx.lineTo(x + s - 4, y + 4); ctx.stroke(); }
      else if (d === 2) { ctx.beginPath(); ctx.moveTo(x + 2, y + s - 4); ctx.lineTo(x + s * 0.7, y + s - 4); ctx.lineTo(x + s - 2, y + 6); ctx.lineTo(x + s * 0.3, y + 6); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      else { const o = s * 0.28, q = s - o - 4; ctx.strokeRect(x + 2, y + o, q, q); ctx.fillRect(x + 2, y + o, q, q); ctx.strokeRect(x + 2 + o, y + 2, q, q); ctx.beginPath(); [[2, o], [2 + q, o], [2, o + q], [2 + q, o + q]].forEach(([a, b]) => { ctx.moveTo(x + a, y + b); ctx.lineTo(x + a + o - 0, y + b - o + 2); }); ctx.stroke(); }
      ctx.restore();
      text(ctx, `O${'₀₁₂'[k]} · ${d}`, x + s / 2, y + s + 10, P.ink, { align: 'center', size: 11 });
      if (k < 2) text(ctx, '→', x + s + 17, y + s / 2, P.dim, { align: 'center', size: 12 });
    });
    if (box.h > s + 56) text(ctx, L(`严格增长 ${steps} 步 = 3 − rank C`, `strict growth: ${steps} steps = 3 − rank C`), box.x, y + s + 30, P.violet, { size: 11, face: 'body' });
  }
  /** Rank of a list of 3-vectors by Gaussian elimination. */
  function rank(vs) {
    const A = vs.map((v) => v.slice()); let r = 0;
    for (let c = 0; c < 3 && r < A.length; c++) {
      let p = r; for (let i = r; i < A.length; i++) if (Math.abs(A[i][c]) > Math.abs(A[p][c])) p = i;
      if (Math.abs(A[p][c]) < 1e-12) continue;
      [A[r], A[p]] = [A[p], A[r]];
      for (let i = 0; i < A.length; i++) if (i !== r) { const k = A[i][c] / A[r][c]; for (let j = 0; j < 3; j++) A[i][j] -= k * A[r][j]; }
      r++;
    }
    return r;
  }

  /* ---------- Funnel scene drawing ---------- */
  function drawFunnel(ctx, R) {
    const fr = funnelFrame(clock.t), words = !TRV.thumbMode, tk = thick(), wide = R.w >= 560;
    const ctl = $('upCtl');
    $('cacheCard').hidden = true;
    // narrow frames: the plot, then the switch, then the insets when there is room for them
    const ctlFits = wide || R.h - measure(ctl, { max: R.w }) - 8 >= 190, ctlN = wide || !ctlFits ? 0 : measure(ctl, { max: R.w }), insets = !wide && R.h - ctlN - 8 >= 400;
    if (!ctlFits) ctl.style.visibility = 'hidden';
    const mainH = wide ? R.h : insets ? (R.h - ctlN - 8) * 0.56 : R.h - ctlN - 8;
    const main = wide ? { x: R.x, y: R.y, w: R.w * 0.6, h: R.h } : { x: R.x, y: R.y, w: R.w, h: mainH };
    const col = wide ? { x: R.x + R.w * 0.6 + 22, y: R.y, w: R.w * 0.4 - 22 } : { x: R.x, y: main.y + main.h + 8, w: R.w };
    const hc = !ctlFits ? 0 : wide ? fit(ctl, col.x, col.y, { max: col.w }, R.y + R.h) : fit(ctl, col.x, col.y, { max: col.w }, R.y + R.h + 4);
    const g = kit.plot($('cv'), { x: [0.2, 1.03], y: [-0.035, 0.172], pad: [main.x + (words ? 40 : 8), R.W - main.x - main.w, main.y + (words ? 46 : 10), R.H - main.y - main.h + (words ? 22 : 8)], clear: false });
    if (words) g.axes({ yTicks: [0, 0.05, 0.1], yFmt: (v) => fix(v, 2), xTicks: [0.28, 0.4, 0.52, 0.64, 0.8, 1].map((v) => [v, fix(v, 2)]) });
    g.hline(0, P.lineHot, { width: 1 });
    const bandRect = (lo, hi, fill, al, stroke, dash) => {
      const x0 = g.X(lo), x1 = g.X(hi), y0 = g.pt, y1 = g.pt + g.ih;
      if (fill) { ctx.fillStyle = TRV.alpha(fill, al); ctx.fillRect(x0, y0, x1 - x0, y1 - y0); }
      if (stroke) { ctx.save(); ctx.strokeStyle = stroke; ctx.lineWidth = 1.4 * tk; ctx.setLineDash(dash || []); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.moveTo(x1, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }
    };
    // the old prior windows: past ones faint, the current one (interpolated) stronger; after learning: dashed magenta
    const oldAlpha = fr.learned ? 1 - 0.85 * Math.max(fr.g, 0.3) : 1, row = fr.t < EPS ? 0 : fr.t <= 1 + EPS ? 1 : 2;
    for (let k = 0; k < row; k++) bandRect(WIN[k][0], WIN[k][1], P.cyan, 0.05 * oldAlpha, null);
    if (!fr.learned) bandRect(fr.win[0], fr.win[1], P.cyan, 0.16, P.cyan, null);
    else { bandRect(WIN[2][0], WIN[2][1], null, 0, P.magenta, [5, 4]); bandRect(NEW_BAND[0], NEW_BAND[1], P.cyan, 0.18 * (0.35 + 0.65 * fr.g), P.cyan, null); }
    // the arch det G(z): solid where it is a Gram matrix (all principal minors ≥ 0), dashed where it is not
    const pts = []; for (let k = 0; k <= 240; k++) { const z = 0.2 + 0.8 * k / 240; pts.push([z, detG(z)]); }
    g.line(pts.map((p) => (psdAt(p[0]) ? p : null)), P.ink, { width: 2 * tk });
    g.line(pts.map((p) => (psdAt(p[0]) ? null : p)), P.dim, { width: 1.4 * tk, dash: [4, 4] });
    // band labels, staggered so they never sit on each other
    if (words) {
      const lab = (lo, hi, row, col, txt) => text(ctx, txt || `[${fix(lo, 2)}, ${fix(hi, 2)}]`, clamp((g.X(lo) + g.X(hi)) / 2, g.pl + 34, g.pl + g.iw - 34), g.pt - 36 + row * 14, col, { align: 'center', size: 10.5 });
      if (!fr.learned) {
        for (let k = 0; k < row; k++) lab(WIN[k][0], WIN[k][1], k, P.dim);
        lab(fr.win[0], fr.win[1], row, P.cyan);
      } else {
        lab(NEW_BAND[0], NEW_BAND[1], 1, P.cyan, L(`新窗口 [0.28, 0.52]`, `new window [0.28, 0.52]`));
        lab(WIN[2][0], WIN[2][1], 2, P.magenta, L('旧窗口 [0.76, 0.82]', 'old window [0.76, 0.82]'));
      }
    }
    // targets: the compiled guess 0.80 and, after learning, the new choice 0.40
    const tx = g.X(Z_DREAM), ty = g.Y(detG(Z_DREAM));
    if (fr.learned) dot(ctx, tx, ty, 9 * tk, P.magenta, { ring: true, dash: [3, 3], width: 2 * tk });
    else dot(ctx, tx, ty, 9 * tk, P.ink, { ring: true, width: 1.8 * tk });
    if (fr.zNow != null) {
      if (!fr.learned) { const trail = []; for (let k = 0; k <= 30; k++) { const z = 0.76 + (fr.zNow - 0.76) * k / 30; trail.push([z, detG(z)]); } g.line(trail, P.amber, { width: 2.4 * tk, alpha: 0.7 }); }
      dot(ctx, g.X(fr.zNow), g.Y(detG(fr.zNow)), 6 * tk, P.amber, { glow: 14, alpha: fr.learned ? 0.35 + 0.65 * fr.g : 1 });
    }
    if (words) {
      // the arch peaks at 0.1296: the band above it is free for the two annotations and their leaders
      const r1 = g.Y(0.162), r2 = g.Y(0.147), lead = (x, yTop, yBot, col) => seg(ctx, x, yTop, x, yBot, col, 1, { dash: [2, 3], alpha: 0.8 });
      if (!fr.learned) { text(ctx, L(`目标 z = 0.80 · det G = ${fix(detG(Z_DREAM), 3)}`, `target z = 0.80 · det G = ${fix(detG(Z_DREAM), 3)}`), tx + 8, r2, P.ink, { align: 'right', size: 11 }); lead(tx, r2 + 7, ty - 11, P.ink); }
      else {
        const nx = g.X(Z_NEW), ny = g.Y(detG(Z_NEW));
        // the label starts just left of its leader; on a narrow stage it moves left (still over the leader, clear of the
        // axis name "det G") and, if it must, steps down to 10px so that its end stays inside the stage
        const newLab = L(`新目标 z = 0.40 · det G = ${fix(detG(Z_NEW), 3)}`, `new target z = 0.40 · det G = ${fix(detG(Z_NEW), 3)}`);
        ctx.font = `10.5px ${TRV.fonts.data}`; const nLo = g.pl + 4 + ctx.measureText('det G').width + 8, nHi = g.pl + g.iw + 10;
        let nSize = 11; ctx.font = `${nSize}px ${TRV.fonts.data}`; let nW = ctx.measureText(newLab).width;
        if (nW > nHi - nLo) { nSize = Math.max(10, 11 * (nHi - nLo) / nW); ctx.font = `${nSize}px ${TRV.fonts.data}`; nW = ctx.measureText(newLab).width; }
        const nX = nx - 8 + nW <= nHi ? nx - 8 : Math.min(nx - 8, Math.max(nLo, nHi - nW));
        text(ctx, newLab, nX, r1, P.amber, { align: 'left', size: nSize }); lead(nx, r1 + 7, ny - 9, P.amber);
        if (g.ih >= 160) { text(ctx, L('旧目标 0.80 · Valid 0 · flush 1', 'old target 0.80 · Valid 0 · flush 1'), tx + 8, r2, P.magenta, { align: 'right', size: 11 }); lead(tx, r2 + 7, ty - 11, P.magenta); }
      }
      text(ctx, 'det G', g.pl + 4, g.Y(0.168), P.dim, { size: 10.5 });
      text(ctx, 'z', g.pl + g.iw, g.pt + g.ih + 14, P.dim, { align: 'right', size: 11 });
    }
    geo = { scene: 'funnel' };
    // insets
    const iy = col.y + (hc ? hc + 12 : 0), ih = R.y + R.h - iy;
    if (!wide && !insets) return;
    if (!S.up) { drawGolden(ctx, { x: col.x, y: iy, w: col.w, h: ih }, fr, R); return; }
    if (wide) {
      const h1 = Math.min(ih * 0.5, 170);
      drawWorlds(ctx, { x: col.x, y: iy, w: col.w, h: h1 }, fr);
      drawMiniDisc(ctx, { x: col.x, y: iy + h1 + 8, w: col.w, h: ih - h1 - 8 }, fr, R);
    } else {
      const w1 = col.w * 0.5;
      drawWorlds(ctx, { x: col.x, y: iy, w: w1 - 6, h: ih }, fr);
      drawMiniDisc(ctx, { x: col.x + w1 + 6, y: iy, w: w1 - 6, h: ih }, fr, R);
    }
  }

  function drawGolden(ctx, box, fr, R) {
    const words = !TRV.thumbMode, tk = thick();
    if (box.h < 60) return;
    const head = words ? 34 : 6, foot = words ? 22 : 6;
    const g = kit.plot($('cv'), { x: [-33, 33], y: [-1.15, 1.35], pad: [box.x, R.W - box.x - box.w, box.y + head, R.H - box.y - box.h + foot], clear: false });
    ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(g.pl + 0.5, g.pt + 0.5, g.iw - 1, g.ih - 1);
    // the windows of the stops (dashed) and the current one (filled)
    for (const s of GOLD_STOPS) if (s > fr.s + 1e-9) { ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = P.dim; ctx.globalAlpha = 0.8; ctx.lineWidth = 1; ctx.strokeRect(g.pl, g.Y(GC + s / 2), g.iw, g.Y(GC - s / 2) - g.Y(GC + s / 2)); ctx.restore(); }
    ctx.fillStyle = TRV.alpha(P.cyan, 0.16); ctx.fillRect(g.pl, g.Y(GC + fr.s / 2), g.iw, g.Y(GC - fr.s / 2) - g.Y(GC + fr.s / 2));
    seg(ctx, g.pl, g.Y(GC + fr.s / 2), g.pl + g.iw, g.Y(GC + fr.s / 2), P.cyan, 1.2 * tk); seg(ctx, g.pl, g.Y(GC - fr.s / 2), g.pl + g.iw, g.Y(GC - fr.s / 2), P.cyan, 1.2 * tk);
    for (const p of GOLD) {
      if (p.perp < -1.12 || p.perp > 1.32 || Math.abs(p.par) > 32.5) continue;
      const on = inWin(p, fr.s);
      dot(ctx, g.X(p.par), g.Y(p.perp), (on ? 3.2 : 1.8) * tk, on ? P.cyan : P.faint, on ? { glow: 6 } : {});
    }
    if (words) {
      const n = goldCount(fr.s), counts = GOLD_STOPS.map(goldCount);
      text(ctx, L(`黄金窗口 · 宽 s = ${fmtS(fr.s)} · 选中 ${n} 点`, `golden window · width s = ${fmtS(fr.s)} · ${n} points`), box.x, box.y + 8, P.ink, { size: 11, face: 'body' });
      text(ctx, L(`s = 1, 1/2, 1/4 → ${counts.join(', ')} 点（|a|, |b| ≤ 12）`, `s = 1, 1/2, 1/4 → ${counts.join(', ')} points (|a|, |b| ≤ 12)`), box.x, box.y + 24, P.dim, { size: 10.5, face: 'body' });
      text(ctx, L('横：a + bφ · 纵：a + b(1 − φ)', 'across: a + bφ · up: a + b(1 − φ)'), box.x, box.y + box.h - 8, P.dim, { size: 10, face: 'body' });
    }
  }
  const fmtS = (s) => { for (const [v, t] of [[1, '1'], [0.5, '1/2'], [0.25, '1/4']]) if (Math.abs(s - v) < 1e-9) return t; return fix(s, 2); };

  function drawWorlds(ctx, box, fr) {
    if (TRV.thumbMode || box.h < 80) return;
    const nv = novelty(), learned = fr.learned || (S.up && S.fact === 'dup' && fr.t >= 2 - EPS);
    const cs = Math.min(38, (box.w - 70) / 2, (box.h - 62) / 2), x0 = box.x + 44, y0 = box.y + 34;
    text(ctx, L('四个世界 · 学到的特征', 'four worlds · the learned feature'), box.x, box.y + 8, P.dim, { size: 11, face: 'body' });
    text(ctx, S.fact === 'novel' ? 'f₁ = b' : 'f_dup = a', x0 + cs, y0 - 9, P.ink, { align: 'center', size: 10.5 });
    text(ctx, 'f₀ = a', x0 - 6, y0 + cs * 0.5, P.dim, { align: 'right', size: 10 });
    const target = learned && S.fact === 'novel' ? '01' : '00';
    WORLDS.forEach((w) => {
      const i = +w[0], j = +w[1], x = x0 + j * cs, y = y0 + i * cs;
      ctx.strokeStyle = P.panelEdge; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
      if (i === 0) { ctx.fillStyle = TRV.alpha(P.cyan, 0.12); ctx.fillRect(x + 1, y + 1, cs - 2, cs - 2); }
      if (w === '00' && learned && S.fact === 'novel') { ctx.save(); ctx.setLineDash([3, 3]); ctx.strokeStyle = P.magenta; ctx.lineWidth = 2; ctx.strokeRect(x + 3, y + 3, cs - 6, cs - 6); ctx.restore(); }
      if (w === target) { ctx.save(); ctx.strokeStyle = P.amber; ctx.lineWidth = 2.2; ctx.shadowColor = P.amber; ctx.shadowBlur = 8; ctx.strokeRect(x + 3, y + 3, cs - 6, cs - 6); ctx.restore(); }
      text(ctx, w, x + cs / 2, y + cs / 2, w === target ? P.amber : P.ink, { align: 'center', size: 11 });
    });
    const tx = x0 + 2 * cs + 12;
    text(ctx, L('青：旧先验', 'cyan: old prior'), tx, y0 + 8, P.cyan, { size: 10, face: 'body' });
    text(ctx, L(`琥珀：目标 ${target}`, `amber: target ${target}`), tx, y0 + 22, P.amber, { size: 10, face: 'body' });
    const r = (e) => `${e.esc}/${e.n}`;
    text(ctx, `U = ${nv.U} · ${L('逃逸率', 'escape')} ${r(nv.old)} → ${r(nv.full)}`, box.x, y0 + 2 * cs + 16, nv.U > 0 ? P.ink : P.dim, { size: 11 });
  }

  function drawMiniDisc(ctx, box, fr, R) {
    if (TRV.thumbMode || box.h < 70) return;
    const snap = snapshot(), out = pinch(snap.sigma, S.beta);
    const cur = M.lerp(snap.sigma, out, fr.t >= 2 - EPS ? fr.g : 0), r = Math.min((box.h - 46) / 2, box.w * 0.2, 46);
    if (r < 16) return;
    const cx = box.x + r + 6, cy = box.y + 26 + r, n = axis(S.beta), sb = blochOf(snap.sigma), cb = blochOf(cur);
    text(ctx, L(`保存的 σ 按 β = ${fix(S.beta, 0)}° 再投影`, `saved σ re-projected at β = ${fix(S.beta, 0)}°`), box.x, box.y + 8, P.dim, { size: 11, face: 'body' });
    ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, TAU); ctx.stroke();
    seg(ctx, cx - n[0] * r * 1.08, cy + n[1] * r * 1.08, cx + n[0] * r * 1.08, cy - n[1] * r * 1.08, P.ink, 1.4);
    arrow(ctx, cx, cy, cx + sb[0] * r, cy - sb[1] * r, P.dim, 1.2, { dash: [4, 3], headSize: 7 });
    const d = cb[0] * n[0] + cb[1] * n[1], ft = [cx + d * n[0] * r, cy - d * n[1] * r];
    seg(ctx, cx, cy, ft[0], ft[1], P.cyan, 3, { glow: 6 });
    if (Math.hypot(cb[0] - d * n[0], cb[1] - d * n[1]) > 1e-6) seg(ctx, ft[0], ft[1], cx + cb[0] * r, cy - cb[1] * r, P.magenta, 2);
    if (Math.hypot(cb[0], cb[1]) * r > 4) arrow(ctx, cx, cy, cx + cb[0] * r, cy - cb[1] * r, P.amber, 2.4, { glow: 8, headSize: 8 }); else dot(ctx, cx, cy, 4, P.amber, { glow: 8 });
    const dH = Hbits(cur) - Hbits(snap.sigma), m = M.hs(M.sub(snap.sigma, cur)), same = M.maxAbs(M.sub(out, snap.sigma)) < TOL;
    const tx = cx + r + 14, w = box.x + box.w - tx;
    if (w > 90) {
      text(ctx, same ? L('Π(σ) = σ', 'Π(σ) = σ') : (Math.abs(out[0][0] - 0.5) < 1e-9 && Math.abs(out[0][1]) < 1e-9 ? 'Π(σ) = I/2' : 'Π(σ) ≠ σ'), tx, cy - 18, same ? P.cyan : P.ink, { size: 11.5, weight: 600 });
      text(ctx, L(`新增熵 ${sbit(dH)}`, `added ${sbit(dH)}`), tx, cy, dH > 1e-6 ? P.ink : P.cyan, { size: 11 });
      text(ctx, L(`残差 ${fix(m, 4)}`, `residual ${fix(m, 4)}`), tx, cy + 17, m > 1e-6 ? P.magenta : P.dim, { size: 11 });
    }
  }

  /* ---------- Records scene drawing ---------- */
  function drawRecords(ctx, R) {
    const words = !TRV.thumbMode, tk = thick(), wide = R.w >= 520, ctl = $('ovCtl');
    $('cacheCard').hidden = true;
    const side = wide || R.h < R.w * 1.15;
    const D = wide ? Math.min(R.h, R.w * 0.52) : side ? Math.min(R.h, R.w * 0.56) : Math.min(R.w, R.h * 0.55);
    const box = side ? { x: R.x, y: R.y + Math.max(0, (R.h - D) / 2), s: D } : { x: R.x + (R.w - D) / 2, y: R.y, s: D };
    const col = side ? { x: R.x + D + (wide ? 22 : 10), y: R.y, w: R.w - D - (wide ? 22 : 10) } : { x: R.x, y: R.y + D + 8, w: R.w };
    const yEnd = R.y + R.h;
    const g = kit.plot($('cv'), { x: [-0.66, 0.66], y: [-0.66, 0.66], pad: [box.x, R.W - box.x - box.s, box.y, R.H - box.y - box.s], clear: false, equal: true });
    const cx = g.X(0), cy = g.Y(0), r0 = Math.abs(rhoOf(S.theta)[0][1]);
    seg(ctx, g.X(-0.62), cy, g.X(0.62), cy, P.panelEdge, 1); seg(ctx, cx, g.Y(-0.62), cx, g.Y(0.62), P.panelEdge, 1);
    if (r0 > 1e-6) { ctx.save(); ctx.setLineDash([3, 4]); ctx.strokeStyle = P.dim; ctx.lineWidth = 1.1 * tk; ctx.beginPath(); ctx.arc(cx, cy, r0 * g.scale, 0, TAU); ctx.stroke(); ctx.restore(); }
    if (words) { text(ctx, 'Re', g.X(0.62), cy + 12, P.dim, { align: 'right', size: 10.5 }); text(ctx, 'Im', cx + 8, g.Y(0.6), P.dim, { size: 10.5 }); }
    // the path walked so far, the stops and the arrow
    const trail = []; for (let k = 0; k <= 180; k++) { const t = clock.t * k / 180, z = recordAt(t); trail.push([g.X(z[0]), g.Y(z[1])]); }
    ctx.save(); ctx.strokeStyle = P.magenta; ctx.globalAlpha = 0.7; ctx.lineWidth = 2.2 * tk; ctx.beginPath(); trail.forEach((p, k) => (k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore();
    const { vals, g: gam } = recordStops(), marks = [];
    vals.forEach((z, k) => { const hit = marks.find((m) => Math.hypot(m.z[0] - z[0], m.z[1] - z[1]) < 0.02); if (hit) hit.ks.push(k); else marks.push({ z, ks: [k] }); });
    for (const m of marks) {
      const px = g.X(m.z[0]), py = g.Y(m.z[1]);
      dot(ctx, px, py, 4 * tk, P.magenta, { alpha: 0.9 });
      if (words) {
        const dx = m.z[0] - 0, dy = m.z[1] - 0, d = Math.hypot(dx, dy);
        const ox = d < 0.02 ? 14 : dx / d * 22, oy = d < 0.02 ? -14 : -dy / d * 18;
        text(ctx, m.ks.join(' · '), px + ox, py + oy, P.ink, { align: d < 0.02 ? 'left' : dx > 0.1 ? 'left' : dx < -0.1 ? 'right' : 'center', size: 11.5, weight: 600 });
      }
    }
    const z = recordAt(clock.t), zx = g.X(z[0]), zy = g.Y(z[1]);
    if (cabs(z) * g.scale > 4) arrow(ctx, cx, cy, zx, zy, P.amber, 3 * tk, { glow: 12, headSize: 12 * tk }); else dot(ctx, cx, cy, 5 * tk, P.amber, { glow: 12 });
    const unit = Math.abs(cabs(gam) ** 2 - 1) < TOL;
    if (words && !unit) text(ctx, L('前提不成立：|γ|² = 0 ≠ 1', 'premise fails: |γ|² = 0 ≠ 1'), cx, g.Y(-0.58), P.magenta, { align: 'center', size: 11, face: 'body' });
    geo = { scene: 'records' };
    // the column: the switch, the two copies, the ladder of stops
    let y = col.y;
    const hc = fit(ctl, col.x, y, { max: col.w }, yEnd);
    y += hc ? hc + 12 : 0;
    if (!words) return;
    const t = clock.t, stackBoxes = side, bw = stackBoxes ? Math.min(col.w, 300) : (col.w - 8) / 2, bh = 40, gr = conj(gam);
    if (y + (stackBoxes ? 2 * bh + 8 : bh) > yEnd) return;
    for (let k = 0; k < 2; k++) {
      const x = stackBoxes ? col.x : col.x + k * (bw + 8), by = stackBoxes ? y + k * (bh + 8) : y;
      const wrote = t >= 1 - EPS, writing = t > EPS && t < 1 - EPS, rev = t >= 2 + k - EPS, reversing = t > 1 + k + EPS && t < 2 + k - EPS;
      const hot = writing || reversing;
      ctx.save(); ctx.strokeStyle = hot ? P.amber : P.lineHot; ctx.lineWidth = hot ? 2 : 1; if (hot) { ctx.shadowColor = P.amber; ctx.shadowBlur = 8; } ctx.strokeRect(x + 0.5, by + 0.5, bw - 1, bh - 1); ctx.restore();
      text(ctx, L(`副本 ${k}`, `copy ${k}`), x + 8, by + 12, hot ? P.amber : P.ink, { size: 11.5, face: 'body' });
      const st = rev ? L(`已逆转 ×γ* = ${fmtC(gr, 0)}`, `reversed ×γ* = ${fmtC(gr, 0)}`) : reversing ? L('逆转中 ×γ*', 'reversing ×γ*') : wrote ? L(`已写入 ×γ = ${fmtC(gam, 0)}`, `written ×γ = ${fmtC(gam, 0)}`) : writing ? L('写入中 ×γ', 'writing ×γ') : L('尚未写入', 'not written');
      text(ctx, st, x + 8, by + 28, rev ? P.cyan : wrote ? P.magenta : P.dim, { size: 10.5 });
    }
    y += stackBoxes ? 2 * (bh + 8) + 8 : bh + 12;
    const names = [L('输入', 'input'), L('两份都写入', 'both written'), L('只逆转副本 0', 'copy 0 reversed'), L('两份都逆转', 'both reversed')];
    const now = Math.abs(t - Math.round(t)) < EPS ? Math.round(t) : null;
    names.forEach((nmS, k) => {
      const yy = y + 8 + k * 17, c = now === k ? P.amber : P.ink;
      if (yy > yEnd - 4) return;
      text(ctx, `${k}  ${nmS}`, col.x, yy, c, { size: 11, face: 'body', weight: now === k ? 600 : 400 });
      if (col.w >= 230) text(ctx, `ρ₀₁ = ${fmtC(vals[k], 3)}`, col.x + Math.min(col.w, wide ? 300 : col.w), yy, c, { align: 'right', size: 11 });
    });
  }

  function drawStage() {
    const sr = $('stage').getBoundingClientRect(), below = (el) => (el && !el.hidden ? el.getBoundingClientRect().bottom - sr.top : 0);
    const top = TRV.thumbMode ? 26 : Math.max(46, below($('hudSub')), below($('sceneChips'))) + 12;
    const bottom = TRV.thumbMode ? 26 : Math.max(18, $('legend').offsetHeight + 22);
    const g0 = kit.plot($('cv'), { x: [0, 1], y: [0, 1], pad: [0, 0, 0, 0] }), ctx = g0.ctx;
    const R = { x: 18, y: top, w: g0.W - 36, h: Math.max(120, g0.H - top - bottom), W: g0.W, H: g0.H };
    if (S.scene === 'basis') drawBasis(ctx, R); else if (S.scene === 'funnel') drawFunnel(ctx, R); else drawRecords(ctx, R);
  }

  /* ---------- the strip: what changes and what does not along the rail ---------- */
  function drawPlot() {
    if (TRV.still || TRV.figure) return;
    const t = clock.t;
    if (S.scene === 'basis' && S.prog === 'choose') {
      const g = kit.plot($('plotA'), { x: [0, 175], y: [0, 1.04], pad: [32, 12, 10, 20] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [0, 45, 90, 135].map((v) => [v, `${v}°`]) });
      const rin = rhoOf(S.theta), pp = [], pm = [];
      for (let b = 0; b <= 175; b += 2.5) { const w = weights(rin, b); pp.push([b, w[0]]); pm.push([b, w[1]]); }
      g.line(pp, P.cyan, { width: 2 }); g.line(pm, P.magenta, { width: 2 });
      const b = chooseBeta(t), w = weights(rin, b);
      for (const b0 of [0, 90]) g.dot(b0, weights(rin, b0)[0], P.cyan, 3);
      g.vline(b, P.amber, { alpha: 0.8 }); g.dot(b, w[0], P.amber, 4.5);
      $('pATitle').innerHTML = L('转尺子，权重跟着变', 'Turn the ruler, the weights follow');
      $('pAMeta').innerHTML = `<span style="color: var(--cyan)">p₊</span> · <span style="color: var(--magenta)">p₋</span> · β = ${fix(b, 0)}°`;
      return;
    }
    if (S.scene === 'basis') {
      const g = kit.plot($('plotA'), { x: [0, 2], y: [0, 1.08], pad: [32, 26, 10, 20] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, '0'], [1, L('编译', 'compile')], [2, L('再投影', 'again')]] });
      const H = [], mass = [];
      for (let k = 0; k <= 80; k++) { const u = 2 * k / 80, fr = basisFrame(u); H.push([u, Hbits(fr.cur)]); if (k === 41) mass.push(null); mass.push([u, M.hs(M.sub(fr.before, fr.cur))]); }
      g.line(mass, P.magenta, { width: 1.6, dash: [4, 3] }); g.line(H, P.ink, { width: 2.2 });
      const fr = basisFrame(t);
      g.vline(t, P.amber, { alpha: 0.8 }); g.dot(t, Hbits(fr.cur), P.amber, 4.5);
      $('pATitle').innerHTML = L('两次投影的态熵', 'State entropy over two passes');
      $('pAMeta').innerHTML = `${L('实线：态熵（bit）', 'solid: entropy (bit)')} · <span style="color: var(--magenta)">${L('虚线：本次丢弃的 HS 质量', 'dashed: HS mass discarded this pass')}</span>`;
      return;
    }
    if (S.scene === 'funnel') {
      const g = kit.plot($('plotA'), { x: [0, 3], y: [0, 1.08], pad: [32, 26, 10, 20] });
      g.axes({ yTicks: [0, 0.5, 1], xTicks: [[0, L('宽', 'wide')], [1, L('中', 'medium')], [2, L('窄', 'narrow')], [3, flushOn() ? L('冲刷', 'flush') : L('醒来', 'waking')]] });
      const wd = [], gc = [];
      for (let k = 0; k <= 90; k++) { const u = 3 * k / 90, fr = funnelFrame(u); wd.push([u, (fr.band[1] - fr.band[0]) / 0.72]); gc.push([u, goldCount(fr.s) / 26]); }
      g.line(gc, P.ink, { width: 1.6, dash: [4, 3] }); g.line(wd, P.cyan, { width: 2.2 });
      const fr = funnelFrame(t);
      g.vline(t, P.amber, { alpha: 0.8 }); g.dot(t, (fr.band[1] - fr.band[0]) / 0.72, P.amber, 4.5);
      $('pATitle').innerHTML = L('窗口收窄', 'The windows narrow');
      $('pAMeta').innerHTML = `<span style="color: var(--cyan)">${L('z 窗口宽 / 0.72', 'z window width / 0.72')}</span> · ${L('虚线：黄金格点数 / 26', 'dashed: golden points / 26')}`;
      return;
    }
    const g = kit.plot($('plotA'), { x: [0, 3], y: [-190, 20], pad: [40, 12, 10, 20] });
    g.axes({ yTicks: [[-180, '−180°'], [-90, '−90°'], [0, '0°']], xTicks: [[0, '0'], [1, '1'], [2, '2'], [3, '3']] });
    const ph = [];
    for (let k = 0; k <= 120; k++) { const u = 3 * k / 120, z = recordAt(u); ph.push(cabs(z) > 1e-9 ? [u, unwrapDeg(u, z)] : null); }
    g.line(ph, P.magenta, { width: 2.2 });
    const z = recordAt(t);
    g.vline(t, P.amber, { alpha: 0.8 }); if (cabs(z) > 1e-9) g.dot(t, unwrapDeg(t, z), P.amber, 4.5);
    $('pATitle').innerHTML = L('相位：转出去，再转回来', 'The phase: out and back');
    $('pAMeta').textContent = `|ρ₀₁| = ${fix(cabs(z), 3)} · ${stopName(t)}`;
  }
  /** The phase of ρ₀₁ in degrees on the branch that the animation follows (0 → −180 → −90 → 0). */
  const unwrapDeg = (u, z) => { const a = Math.atan2(z[1], z[0]) / DEG; return a > 90 ? a - 360 : a; };

  /* ---------- readouts, title, legend ---------- */
  const SCENE_NAME = { basis: ['尺子', 'Ruler'], funnel: ['漏斗', 'Funnel'], records: ['记录', 'Records'] };
  const LEG = {
    basis: [['am', '当前的态', 'current state'], ['cy', '影子：留下的', 'shadow: kept'], ['mg', '横跨尺子：剪掉的', 'across the ruler: cut'], ['dm', '虚线：投影前', 'dashed: before']],
    choose: [['am', '输入（不动）', 'input (unmoved)'], ['cy', '影子与 p₊', 'shadow and p₊'], ['mg', 'p₋', 'p₋'], ['dm', '虚线：β = 0° 的尺子', 'dashed: ruler at β = 0°']],
    funnel: [['cy box', '兼容窗口', 'compatible window'], ['am', '当前选择', 'current choice'], ['mg', '被排除的旧目标', 'excluded old target'], ['dm', '虚线：不是格拉姆矩阵', 'dashed: not a Gram matrix']],
    records: [['am', 'ρ₀₁ 的箭头', 'arrow of ρ₀₁'], ['mg', '相位走过的路', 'path of the phase'], ['cy', '已逆转', 'reversed'], ['dm', '虚线圆：出发时的 |ρ₀₁|', 'dashed circle: |ρ₀₁| at start']]
  };
  const setRo = (k, zh, en, val) => { $(`roL${k}`).textContent = L(zh, en); $(`ro${k}`).textContent = val; };
  function cacheHtml(c) {
    const e = c.entry, one = (b) => (b ? '<span class="c-cy">1</span>' : '<span class="c-mg">0</span>');
    const ver = ctxVersion() !== e.version ? L(`（当前 v${ctxVersion()}）`, ` (now v${ctxVersion()})`) : '';
    let verdict;
    if (!e.stored) verdict = `<span class="dim">${L('编译中：条目尚未写入', 'compiling: entry not yet written')}</span>`;
    else if (!c.checked) verdict = `<span class="dim">${clock.t <= 1 + EPS ? L('已写入：等待第二次投影', 'stored: awaiting the second projection') : L('第二次投影进行中', 'second projection under way')}</span>`;
    else if (c.hit) verdict = `→ <span class="c-cy">HIT</span> ${L('（无时间标签的熟悉感）', '(Untagged Familiarity)')}`;
    else {
      const why = !e.valid ? L('flush 1，条目作废', 'flush 1, entry invalidated') : !c.match.version ? L('上下文版本不符', 'context version differs') : !c.match.address ? L('地址不符', 'address differs') : L('再投影改变了保存的态', 're-projection changes the saved state');
      verdict = `→ <span class="c-mg">MISS</span> · ${why}`;
    }
    return `<span class="row head">${L('情节缓存（示意模型，不是定理）', 'Episode cache (a model, not a theorem)')}</span>`
      + `<span class="row">Valid: ${one(e.valid)} · Address_Tag: ${e.address}</span>`
      + `<span class="row">Context_Version: ${e.version}${ver} · Time_Tag: NULL</span>`
      + `<span class="row verdict">${verdict}</span>`;
  }
  function drawText() {
    $('pillScene').querySelector('strong').textContent = L(...SCENE_NAME[S.scene]);
    $('pillCtx').querySelector('strong').textContent = `v${ctxVersion()}${flushOn() ? ' · flush' : ''}`;
    const legKey = S.scene === 'basis' && S.prog === 'choose' ? 'choose' : S.scene;
    if (S.scene === 'basis') {
      const fr = basisFrame(clock.t), nm = basisNumbers(fr), c = cacheAt(clock.t);
      $('roAside').textContent = S.prog === 'choose' ? 'β' : 'Π';
      if (S.prog === 'choose') {
        const b = fr.beta, w = weights(fr.cur, b), w0 = weights(fr.cur, 0), w90 = weights(fr.cur, 90), rb = blochOf(fr.cur), n = axis(b);
        $('hudBig').textContent = L(`选尺子 · p₊ = ${fix(w[0], 3)}`, `Choose the ruler · p₊ = ${fix(w[0], 3)}`);
        $('hudSub').textContent = L(`同一个输入 θ = ${fix(S.theta, 0)}° · 尺子 β = ${fix(b, 0)}°`, `one input θ = ${fix(S.theta, 0)}° · ruler β = ${fix(b, 0)}°`);
        $('roKeyL').textContent = L('向上的权重 p₊（当前尺子）', 'weight p₊ (current ruler)');
        $('roKey').textContent = fix(w[0], 4); $('roKeySub').textContent = L(' = (1 + r·n)/2', ' = (1 + r·n)/2');
        setRo(1, '尺子 β', 'ruler β', `${fix(b, 1)}°`);
        setRo(2, 'β = 0° 时的 p₊', 'p₊ at β = 0°', fix(w0[0], 4));
        setRo(3, 'β = 90° 时的 p₊', 'p₊ at β = 90°', fix(w90[0], 4));
        setRo(4, '影子长 r·n', 'shadow r·n', fix(rb[0] * n[0] + rb[1] * n[1], 4));
        setRo(5, '输入的态熵', 'entropy of the input', bit(Hbits(fr.cur)));
        $('roNote').textContent = L('箭头一动不动：变的是尺子，所以变的是“问哪一个问题”的统计，不是已经记下的事件。', 'The arrow does not move: the ruler does, so what changes is the statistics of which question is asked, not any recorded event.');
        $('pillStage').querySelector('strong').textContent = `β ${fix(b, 0)}°`;
      } else {
        const pass2 = fr.pass === 2, done = fr.f >= 1 - EPS;
        $('hudBig').textContent = pass2 ? L(`再投影 · 新增熵 ${sbit(nm.added)}`, `Again · added entropy ${sbit(nm.added)}`) : L(`梦中编译 · 新增熵 ${sbit(nm.added)}`, `Dream compile · added ${sbit(nm.added)}`);
        $('hudSub').textContent = pass2
          ? (M.maxAbs(M.sub(fr.after, fr.before)) < TOL ? L(`再投影保持态不变，β = ${fix(fr.beta, 0)}°，态熵仍是 ${bit(nm.existing, 3)}`, `Π(σ) = σ, β = ${fix(fr.beta, 0)}°; state entropy still ${bit(nm.existing, 3)}`) : L(`换了尺子 β = ${fix(fr.beta, 0)}° · 残差 ${fix(nm.mass, 4)}`, `new ruler β = ${fix(fr.beta, 0)}° · residual ${fix(nm.mass, 4)}`))
          : L(`完整未读捏合 Π(0°) · 非对角 ${fix(Math.abs(fr.cur[0][1]), 3)}`, `complete unread pinching Π(0°) · off-diagonal ${fix(Math.abs(fr.cur[0][1]), 3)}`);
        $('roKeyL').textContent = L('再捏合新增熵（本次投影）', 'added pinching entropy (this pass)');
        $('roKey').textContent = sbit(nm.added); $('roKeySub').textContent = L(` 本次：${pass2 ? '第二次' : '第一次'}`, ` this pass: ${pass2 ? 'the second' : 'the first'}`);
        setRo(1, '态熵 H', 'state entropy H', bit(nm.existing));
        setRo(2, '丢弃的 HS 质量（本次）', 'discarded HS mass (this pass)', fix(nm.mass, 4));
        setRo(3, '结果惊讶度 −log₂p₊ · −log₂p₋', 'outcome surprisal −log₂p₊ · −log₂p₋', `${surpTxt(nm.surprisal[0])} · ${surpTxt(nm.surprisal[1])} bit`);
        setRo(4, 'Π∘Π − Π 的最大元', 'largest entry of Π∘Π − Π', nm.idem < 1e-15 ? '0' : nm.idem.toExponential(1));
        setRo(5, '缓存（示意）', 'cache (model)', !c.entry.stored ? L('编译中', 'compiling') : !c.checked ? (clock.t <= 1 + EPS ? L('已写入', 'stored') : L('查验中', 'checking')) : c.hit ? 'HIT' : 'MISS');
        // A miss with the saved state left as it was (flushed entry, other context version or address) must not claim a nonzero cost.
        const kept = Math.abs(nm.added) <= 1e-9 && nm.mass <= 1e-9;
        const why = [!c.entry.valid && L('逻辑升级作废了条目（Valid 0）', 'the logic upgrade invalidated the entry (Valid 0)'),
          !c.match.version && L('上下文版本不符', 'the context version differs'),
          !c.match.address && L('地址不符（Address_Tag）', 'the address differs (Address_Tag)')].filter(Boolean);
        const whyEn = why.length > 1 ? `${why.slice(0, -1).join(', ')} and ${why[why.length - 1]}` : why.join('');
        // A hit on a pure saved state (θ = 0° or 90°) has state entropy 0 and surprisals 0 and ∞; only a mixed one keeps them nonzero.
        $('roNote').textContent = pass2 && done
          ? (c.hit ? (nm.existing > 0 ? L('再投影保持保存的态不变：新增熵与残差都是 0；态熵与惊讶度没有变成 0。', 'The re-projection leaves the saved state unchanged: added entropy and residual are 0; the state entropy and the surprisals are not 0.')
              : L('再投影保持保存的态不变：新增熵与残差都是 0；保存的是纯态，态熵本来就是 0，惊讶度一个是 0、一个是 ∞。', 'The re-projection leaves the saved state unchanged: added entropy and residual are 0; the saved state is pure, so the state entropy was already 0, and one surprisal is 0, the other ∞.'))
            : kept ? L(`再投影没有改变保存的态：新增熵与残差都是 0；缓存不命中只因${why.join('、')}。`, `The re-projection leaves the saved state as it was: added entropy and residual are 0; the cache misses only because ${whyEn}.`)
            : L('再投影改变了保存的态：新增熵与残差不为 0，缓存不命中。', 'The re-projection changes the saved state: added entropy and residual are not 0, and the cache misses.'))
          : L('第一次完整未读捏合：横跨尺子的部分缩到 0，两个结果的权重一分不少。', 'The first complete unread pinching: the part across the ruler shrinks to 0, and both outcome weights are kept in full.');
        $('pillStage').querySelector('strong').textContent = pass2 ? L(`再投影 β ${fix(fr.beta, 0)}°`, `again β ${fix(fr.beta, 0)}°`) : L(`编译 ${fix(100 * fr.f, 0)}%`, `compile ${fix(100 * fr.f, 0)}%`);
        const ch = cacheHtml(c); if ($('cacheBody')._h !== ch) { $('cacheBody').innerHTML = ch; $('cacheBody')._h = ch; }
      }
    } else if (S.scene === 'funnel') {
      const fr = funnelFrame(clock.t), nv = novelty(), z = fr.zTarget, det = detG(z);
      $('roAside').textContent = 'det G';
      $('hudBig').textContent = fr.learned ? L(`逻辑升级 · 新目标 z = ${fix(z, 2)}`, `Logic upgrade · new target z = ${fix(z, 2)}`) : L(`兼容漏斗 · 窗口 [${fix(fr.band[0], 2)}, ${fix(fr.band[1], 2)}]`, `Funnel · window [${fix(fr.band[0], 2)}, ${fix(fr.band[1], 2)}]`);
      $('hudSub').textContent = fr.learned ? L('学到 f₁ = 1：旧目标 0.80 被排除，先验换成 [0.28, 0.52]', 'learned f₁ = 1: the old target 0.80 is excluded, the prior becomes [0.28, 0.52]')
        : fr.t >= 2 - EPS ? L(`示意路径走到 z = ${fix(fr.zNow, 3)} · 硬锚 x = y = 0.80`, `illustrative path at z = ${fix(fr.zNow, 3)} · anchors x = y = 0.80`) : L('先验逐层收窄 · 硬锚 x = y = 0.80', 'priors narrow step by step · anchors x = y = 0.80');
      $('roKeyL').textContent = L('det G（当前目标）', 'det G (current target)');
      $('roKey').textContent = fix(det, 4); $('roKeySub').textContent = ` z = ${fix(z, 2)}`;
      setRo(1, '当前先验窗口', 'current prior window', `[${fix(fr.band[0], 2)}, ${fix(fr.band[1], 2)}]`);
      setRo(2, '目标 z · q = cos φ', 'target z · q = cos φ', `${fix(z, 2)} · ${fix(qOf(z), 3)}`);
      setRo(3, '黄金窗口宽 s · 选中格点', 'golden window width s · points', `${fmtS(fr.s)} · ${goldCount(fr.s)} (${GOLD_STOPS.map(goldCount).join(' → ')})`);
      setRo(4, '逃逸率 旧 → 新 · 独有捕获 U', 'escape rate old → new · unique capture U', `${nv.old.esc}/${nv.old.n} → ${nv.full.esc}/${nv.full.n} · ${nv.U}`);
      setRo(5, '旧目标 0.80', 'old target 0.80', fr.learned ? L('已排除 · Valid 0', 'excluded · Valid 0') : L('相容 · Valid 1', 'compatible · Valid 1'));
      $('roNote').textContent = psdAt(z) ? L('目标处 G 的全部主子式非负：三个单位向量装得进同一个内积空间。', 'Every principal minor of G is non-negative at the target: the three unit vectors fit in one inner-product space.') : L('目标处 G 有负的主子式：不是格拉姆矩阵。', 'G has a negative principal minor at the target: not a Gram matrix.');
      $('pillStage').querySelector('strong').textContent = fr.learned ? L('冲刷 · z 0.40', 'flush · z 0.40') : fr.t >= 2 - EPS ? `z ${fix(fr.zNow, 3)}` : `[${fix(fr.band[0], 2)}, ${fix(fr.band[1], 2)}]`;
    } else {
      const z = recordAt(clock.t), { g: gam } = recordStops(), unit = Math.abs(cabs(gam) ** 2 - 1) < TOL, nameNow = stopName(clock.t);
      const NAMES = { input: ['输入', 'input'], 'write-both': ['两份都写入', 'both written'], 'reverse-one': ['只逆转副本 0', 'copy 0 reversed'], 'reverse-both': ['两份都逆转', 'both reversed'] };
      const nmTxt = NAMES[nameNow] ? L(...NAMES[nameNow]) : nameNow;
      $('roAside').textContent = 'ρ₀₁';
      $('hudBig').textContent = L(`相位记录 · ρ₀₁ = ${fmtC(z, 3)}`, `Phase records · ρ₀₁ = ${fmtC(z, 3)}`);
      $('hudSub').textContent = `${nmTxt} · ${L(`每份重叠 γ = ${fmtC(gam, 0)}`, `overlap of each record γ = ${fmtC(gam, 0)}`)}`;
      $('roKeyL').textContent = L('非对角元 ρ₀₁', 'off-diagonal entry ρ₀₁');
      $('roKey').textContent = fmtC(z, 4); $('roKeySub').textContent = L(` 出发时 ${fix(rhoOf(S.theta)[0][1], 3)}`, ` ${fix(rhoOf(S.theta)[0][1], 3)} at the start`);
      setRo(1, '站点', 'stop', nmTxt);
      setRo(2, '|ρ₀₁|', '|ρ₀₁|', fix(cabs(z), 4));
      setRo(3, '相干质量 |ρ₀₁|² + |ρ₁₀|²', 'coherence mass |ρ₀₁|² + |ρ₁₀|²', fix(2 * cabs(z) ** 2, 4));
      setRo(4, '每份重叠 γ · |γ|²', 'overlap γ · |γ|²', `${fmtC(gam, 0)} · ${fix(cabs(gam) ** 2, 0)}`);
      setRo(5, '前提 γ*γ = 1', 'premise γ*γ = 1', unit ? L('成立', 'holds') : L('不成立', 'fails'));
      $('roNote').textContent = unit ? L('写入乘 γ，逆转乘 γ*；γ*γ = 1，两份都逆转就回到出发点。', 'Writing multiplies by γ, reversing by γ*; with γ*γ = 1, reversing both returns to the start.') : L('重叠为 0：两条路被完全分开，逆转乘的还是 0，回不来。', 'Overlap 0: the two paths are told apart completely; reversing multiplies by 0 again and nothing comes back.');
      $('pillStage').querySelector('strong').textContent = nmTxt;
    }
    const leg = LEG[legKey].map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== leg) { $('legend').innerHTML = leg; $('legend')._h = leg; }
  }
  const paint = kit.painter(() => { drawText(); drawStage(); drawPlot(); }, [$('stage'), $('plotA')]);

  /* ---------- controls ---------- */
  let stopAt = null;
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 2, rate: 0.5, step: 0.5,
    format: (t) => {
      if (S.scene === 'basis' && S.prog === 'choose') return `β ${fix(chooseBeta(t), 0)}°`;
      if (S.scene === 'basis') return t <= 1 ? `${L('编译 ', 'COMPILE ')}${fix(100 * t, 0)}%` : `${L('再投影 ', 'AGAIN ')}${fix(100 * Math.min(1, t - 1), 0)}%`;
      if (S.scene === 'funnel') return t < 2 - EPS ? `${L('先验 ', 'PRIOR ')}${fix(t, 2)} <small>/ 3</small>` : `${flushOn() ? L('冲刷 ', 'FLUSH ') : L('醒来 ', 'WAKING ')}${fix(100 * (t - 2), 0)}%`;
      return `${L('第 ', 'STOP ')}${fix(t, 2)}${L(' 站', '')} <small>/ 3</small>`;
    },
    onChange: (t) => {
      if (stopAt != null && t >= stopAt - 1e-9 && clock.playing) { const at = stopAt; stopAt = null; clock.pause(); clock.set(at); return; }
      if (S.scene === 'basis' && S.prog === 'choose') fBeta.set(Math.round(chooseBeta(t)));
      paint();
    }
  });
  const leave = () => { stopAt = null; cards.mark(null); };
  const fTheta = kit.field($('theta'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { S.theta = v; leave(); paint(); } });
  const fBeta = kit.field($('beta'), { fmt: (v) => `${fix(v, 0)}°`, onInput: (v) => { leave(); setBeta(v); } });
  /** The reader sets the ruler: in the choose program it drives the rail; otherwise it is the re-projection axis, and
      the rail goes to the end of the second projection so that its consequence is on the stage at once. */
  function setBeta(v) {
    if (S.scene === 'basis' && S.prog === 'choose') { clock.pause(); S.path = [0, 175]; clock.set(v / 175); return; }
    S.beta = v; fBeta.set(v);
    if (S.scene === 'basis' && S.prog === 'repeat' && clock.t < 2 - EPS) { clock.pause(); clock.set(2); }
    paint();
  }
  /** The switch: learning the fact sets the ruler (90° when it is distinguishing, 0° otherwise) and shows the outcome. */
  function applyUpgrade(on) {
    S.up = on; S.beta = flushOn() ? 90 : 0; fBeta.set(S.beta);
    if (S.scene === 'basis') { if (S.prog === 'choose') { S.prog = 'repeat'; setScene('basis', 2); } else { clock.pause(); stopAt = null; clock.set(2); } }
    else if (S.scene === 'funnel') { clock.pause(); stopAt = null; clock.set(3); }
    paint();
  }
  const upChips = kit.chips($('upChips'), 'up', (v) => { leave(); applyUpgrade(v === 'on'); });
  const factChips = kit.chips($('factChips'), 'fact', (v) => { leave(); S.fact = v; if (S.up) { S.beta = flushOn() ? 90 : 0; fBeta.set(S.beta); } paint(); });
  const ovChips = kit.chips($('ovChips'), 'ov', (v) => { leave(); S.ov = v; paint(); });
  function setScene(sc, t) {
    S.scene = sc; sceneChips.set(sc, true);
    document.querySelectorAll('[data-scenes]').forEach((el) => { el.hidden = !el.dataset.scenes.split(' ').includes(sc); });
    const c = SC[scKey()];
    clock.pause(); stopAt = null; clock.rate = c.rate; clock.step = c.step; clock.setMax(c.max, true); clock.set(t == null ? 0 : t);
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v); });
  kit.keys({
    1: () => { leave(); setScene('basis'); }, 2: () => { leave(); setScene('funnel'); }, 3: () => { leave(); setScene('records'); },
    u: () => { if (S.scene === 'records') return; leave(); const next = !S.up; upChips.set(next ? 'on' : 'off', true); applyUpgrade(next); }
  });
  $('rew').addEventListener('click', () => { stopAt = null; clock.pause(); clock.set(0); });

  // on the disc: drag the arrow tip to change θ, anywhere else to turn the ruler
  let drag = null;
  const local = (ev) => { const b = $('cv').getBoundingClientRect(); return [ev.clientX - b.left, ev.clientY - b.top]; };
  function grab(ev) {
    if (!geo || geo.scene !== 'basis' || S.scene !== 'basis') return null;
    const [x, y] = local(ev), d = Math.hypot(x - geo.cx, y - geo.cy);
    if (d > geo.rad * 1.25) return null;
    if (geo.tip && Math.hypot(x - geo.tip[0], y - geo.tip[1]) < 18) return 'theta';
    return d > geo.rad * 0.12 ? 'beta' : null;
  }
  function dragTo(ev) {
    const [x, y] = local(ev), dx = x - geo.cx, dz = geo.cy - y;
    if (drag === 'theta') { const th = clamp(Math.atan2(dx, dz) / DEG / 2, 0, 90); S.theta = Math.round(th); fTheta.set(S.theta); paint(); return; }
    let b = Math.atan2(dx, dz) / DEG; if (b < 0) b += 180; if (b >= 180) b -= 180;
    b = Math.min(175, Math.round(b / 5) * 5); fBeta.set(b); setBeta(b);
  }
  $('cv').addEventListener('pointerdown', (ev) => { const k = grab(ev); if (!k) return; drag = k; try { $('cv').setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events */ } leave(); clock.pause(); dragTo(ev); });
  $('cv').addEventListener('pointermove', (ev) => { if (drag) dragTo(ev); else $('cv').style.cursor = grab(ev) ? 'grab' : 'default'; });
  for (const type of ['pointerup', 'pointercancel']) $('cv').addEventListener(type, () => { drag = null; });

  /* ---------- experiment cards ---------- */
  const BASE = { theta: 30, beta: 0, up: false, fact: 'novel', ov: 'unit', prog: 'repeat', path: [0, 90], from: 0 };
  const PRESETS = {
    'choose-context': { scene: 'basis', prog: 'choose', path: [0, 90], still: 1 },
    'dream-precompile': { scene: 'basis', prog: 'repeat', still: 1, to: 1 },
    'gram-funnel': { scene: 'funnel', still: 3 },
    'logic-upgrade-flush': { scene: 'funnel', up: true, beta: 90, still: 3, from: 2 },
    'unimodular-reversal': { scene: 'records', theta: 45, still: 3 },
    'deja-vu-hit': { scene: 'basis', prog: 'repeat', still: 2 }
  };
  const NOTES = {
    'choose-context': ['输入态（琥珀色箭头）不动，尺子从 β = 0° 转到 90°：青色影子给出的 p₊ 由 0.750 变成 0.933。两组权重来自同一支箭头；小图里观测维数 1 → 2 → 3。', 'The input (amber arrow) stays put while the ruler turns from β = 0° to 90°: p₊ on the cyan shadow goes from 0.750 to 0.933. Both weights come from the same arrow; in the inset the observed dimension goes 1 → 2 → 3.'],
    'dream-precompile': ['梦中第一次完整未读捏合（β = 0°）：品红的横向部分缩到 0，非对角 0.433 消失，对角 0.750、0.250 不动；态熵 0 → 0.8113 bit，丢弃的 HS 质量 0.375。', 'The first complete unread pinching in the dream (β = 0°): the magenta part across the ruler shrinks to 0, the off-diagonal 0.433 vanishes and the diagonal 0.750, 0.250 stays; entropy 0 → 0.8113 bit, discarded HS mass 0.375.'],
    'gram-funnel': ['硬锚 x = y = 0.80 定下 det G 的拱形。青色先验窗口收窄 [0.28, 1] → [0.64, 0.88] → [0.76, 0.82]，琥珀色的点沿示意路径走到 z = 0.80；黄金窗口选中 26 → 11 → 7 点。', 'The anchors x = y = 0.80 fix the arch of det G. The cyan prior windows narrow [0.28, 1] → [0.64, 0.88] → [0.76, 0.82], and the amber point follows an illustrative path to z = 0.80; the golden window selects 26 → 11 → 7 points.'],
    'logic-upgrade-flush': ['逻辑升级打开（学到 f₁ = 1）：旧目标 0.80 成了品红虚线圈（Valid 0 · flush 1），新窗口 [0.28, 0.52] 里琥珀色选中 0.40；保存的 σ 按 β = 90° 再投影成 I/2，新增 +0.1887 bit。开关拨回“关”即复原。', 'Logic upgrade on (f₁ = 1 learned): the old target 0.80 becomes a dashed magenta ring (Valid 0 · flush 1) and amber picks 0.40 in the new window [0.28, 0.52]; the saved σ re-projected at β = 90° is I/2, +0.1887 bit. Switch off to restore.'],
    'unimodular-reversal': ['θ = 45° 时 ρ₀₁ = 1/2。两份重叠 −i 的记录写入后箭头转到 −1/2（站 1），只逆转副本 0 停在 −i/2（站 2），两份都逆转回到 +1/2（站 3）。开关换成“0（正交）”，箭头缩到原点回不来。', 'At θ = 45°, ρ₀₁ = 1/2. With both records of overlap −i written the arrow turns to −1/2 (stop 1); reversing copy 0 alone stops at −i/2 (stop 2); reversing both returns to +1/2 (stop 3). Switch to “0 (orthogonal)” and it shrinks to the origin for good.'],
    'deja-vu-hit': ['保存的 σ 用同一把尺子（β = 0°）再投影：箭头不动，前后矩阵相同，新增熵 0.0000 bit；态熵仍是 0.8113 bit。缓存卡 Valid 1 · Time_Tag NULL → HIT。打开逻辑升级或转动尺子即变 MISS。', 'The saved σ projected again with the same ruler (β = 0°): the arrow stays, the matrices match, added entropy 0.0000 bit; the state entropy is still 0.8113 bit. Cache card: Valid 1 · Time_Tag NULL → HIT. Upgrade or turn the ruler: MISS.']
  };
  let booting = true;
  function applyPreset(id) {
    const c = Object.assign({}, BASE, PRESETS[id]);
    S.theta = c.theta; fTheta.set(c.theta);
    S.up = c.up; upChips.set(c.up ? 'on' : 'off', true);
    S.fact = c.fact; factChips.set(c.fact, true);
    S.ov = c.ov; ovChips.set(c.ov, true);
    S.beta = c.beta; fBeta.set(c.beta);
    S.prog = c.prog; S.path = c.path.slice(); S.address = 'event-0';
    setScene(c.scene, c.from);
    if (TRV.still || (booting && !TRV.embed)) { clock.set(c.still); return; }
    stopAt = c.to == null ? null : c.to;
    if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，拖输入角或尺子（也可以直接在圆盘上拖），切换学到的事实，拨舞台上的开关，或拖动时间轴。随时可以再选一张卡。', 'Free play: switch scenes, move the input angle or the ruler (or drag them on the disc), change the learned fact, flip the switch on the stage, or scrub the rail. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- read-only probe ---------- */
  function probe() {
    const t = clock.t, c = cacheAt(t), fr = funnelFrame(t), nv = novelty();
    let existing = null, added = null, mass = null;
    if (S.scene === 'basis') { const b = basisFrame(t), nm = basisNumbers(b); existing = nm.existing; added = nm.added; mass = nm.mass; }
    else if (S.scene === 'funnel') { const snap = snapshot(), out = pinch(snap.sigma, S.beta), cur = M.lerp(snap.sigma, out, t >= 2 - EPS ? fr.g : 0); existing = Hbits(cur); added = existing - Hbits(snap.sigma); mass = M.hs(M.sub(snap.sigma, cur)); }
    const z = recordAt(t), fb = S.scene === 'basis' ? basisFrame(t) : null;
    return {
      preset: cards.current, scene: S.scene, program: S.prog, t, max: clock.max, playing: clock.playing,
      theta: S.theta, beta: betaNow(), logicUpgrade: S.up, redundantMode: S.fact === 'dup', contextVersion: ctxVersion(), flush: flushOn() ? 1 : 0,
      recordStage: stopName(t), recordValue: z.slice(), recordOverlap: recordStops().g, overlapMode: S.ov,
      existingEntropyBits: existing, additionalEntropyBits: added, discardedHsMass: mass,
      rho: fb ? M.copy(fb.cur) : null, before: fb ? M.copy(fb.before) : null, pass: fb ? fb.pass : null,
      snapshot: (() => { const s = snapshot(); return { sigma: M.copy(s.sigma), beta: s.beta, version: s.version, address: s.address, target: s.target, band: s.band, zTarget: s.zTarget, timeTag: s.timeTag }; })(),
      gramBand: fr.band.slice(), zTarget: fr.zTarget, detG: detG(fr.zTarget), zNow: fr.zNow, oldTargetValid: !fr.learned,
      goldenCounts: GOLD_STOPS.map(goldCount), goldenNow: { s: fr.s, count: goldCount(fr.s) },
      uniqueCapture: nv.U, escapeRate: { old: nv.old.rate, now: nv.full.rate, pairs: nv.full.n },
      cacheEntry: Object.assign({}, c.entry, { payload: M.copy(c.entry.payload) }), cacheMatch: Object.assign({}, c.match), cacheChecked: c.checked,
      cacheHit: c.hit, untaggedFamiliarity: c.familiarity
    };
  }
  const debug = function DEJAVU_SANDTABLE_DEBUG() { return probe(); };
  Object.defineProperty(debug, 'state', { get: probe, enumerable: true });
  for (const k of Object.keys(probe())) if (!(k in debug)) Object.defineProperty(debug, k, { get: () => probe()[k], enumerable: true, configurable: true });
  Object.assign(debug, {
    /** Move the rail (paused). */
    seek: (t) => { stopAt = null; clock.pause(); clock.set(t); },
    /** Move the clock while it plays, keeping a card's stop. */
    jump: (t) => { if (clock.playing) clock.set(t); },
    /** Change the address of the current lookup (a test of the model rule: a valid bit alone is no hit). */
    setAddress: (a) => { S.address = String(a); paint(); },
    /** Viewport point of the disc at Bloch coordinates (x, z). */
    discAt: (x, z) => { const b = $('cv').getBoundingClientRect(); return geo && geo.scene === 'basis' ? [b.left + geo.cx + x * geo.rad, b.top + geo.cy - z * geo.rad] : null; }
  });
  window.DEJAVU_SANDTABLE_DEBUG = debug;
  window.TRV_THUMB = () => { clock.pause(); S.theta = 30; S.beta = 0; S.up = false; S.fact = 'novel'; S.prog = 'repeat'; setScene('basis', 0.55); paint.now(); };
  setScene('basis', 0);
  cards.pick(cards.initial('deja-vu-hit'));
  booting = false;
  paint();
})();
