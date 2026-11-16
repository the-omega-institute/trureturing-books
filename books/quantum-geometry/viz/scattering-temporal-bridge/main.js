/* SCATTER//TIME · 势垒双支与时间双缝 · Barrier branches and the temporal double slit
   Two scenes on one 3D stage (kit.stage3, x right, z up):
     stationary  the exact stationary state of a square barrier V₀ = 1 on [0, L] in units ℏ = 2m = V₀ = 1, drawn as the
                 curve [scaled x, Re ψ, Im ψ]: on the left e^{ikx} (cyan) + r e^{−ikx} (magenta), inside the decaying
                 branch a₋e^{−κx} (cyan) and the growing branch a₊e^{κx} (magenta), on the right t e^{ikx}; the resultant
                 ψ in violet (bold; the axes and the barrier faces are thin violet). D = cosh κL + i(κ² − k²)/(2kκ) sinh κL,
                 t = e^{−ikL}/D, r = −i(k/κ + κ/k) sinh κL/(2D). The rail is the amber probe moving along x (the labels
                 are placed clear of its foot, stroke and tip); the flux j = 2 Im(ψ̄ψ′) it reads is the same everywhere.
     temporal    two temporal path amplitudes z₁ = 1 (cyan) and z₂ = a e^{i(q+φ)} (magenta) along the normalised energy
                 q = EΔt/ℏ (the rail), and the coherent resultant amplitude √μ(z₁ + z₂) (violet helix and arrow). Tracing
                 out the markers leaves a mixed state whose count is an intensity, not the square of one amplitude:
                 |√μ(z₁ + z₂)|² + (1 − μ)(1 + a²), the second term the μ-weighted incoherent background (the violet ring
                 has that intensity as its radius squared). The back wall shows P(q) = (1 + a² + 2aμ cos(q + φ))/(1 + a²),
                 the count divided by the incoherent baseline 1 + a²: a relative spectral intensity in [0, 2], neither a
                 probability nor a density normalised over energy. At μ = 0 the coherent amplitude is 0, the background
                 (1 − μ)(1 + a²) stays positive and P = 1.
   Every number is computed here. Read-only probe: window.SCATTERING_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { fix, clamp, v3 } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI;
  const lin = (a, b, n) => Array.from({ length: n + 1 }, (_, i) => a + (b - a) * i / n);
  const modTau = (x) => ((x % TAU) + TAU) % TAU;

  /* ---------- complex numbers as [re, im] ---------- */
  const C = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
    sc: (a, k) => [a[0] * k, a[1] * k],
    abs2: (a) => a[0] * a[0] + a[1] * a[1],
    cis: (x) => [Math.cos(x), Math.sin(x)],
    I: (a) => [-a[1], a[0]]
  };

  /* ---------- the stationary barrier (ℏ = 2m = V₀ = 1) ---------- */
  const XOUT = 4;          // free space drawn on each side of the barrier
  const SPAN = 3.6;        // the drawn length of [−XOUT, L + XOUT]
  const AMP = 0.5;         // world units per unit of amplitude
  const HB = 1.12;         // half size of the barrier faces
  function barrier(E, Lw) {
    const k = Math.sqrt(E), q = Math.sqrt(1 - E), ch = Math.cosh(q * Lw), sh = Math.sinh(q * Lw);
    const D = [ch, (q * q - k * k) / (2 * k * q) * sh];
    const t = C.div(C.cis(-k * Lw), D);
    const r = C.div([0, -(k / q + q / k) * sh / 2], D);
    const tau = C.mul(t, C.cis(k * Lw));                           // ψ(L) = t e^{ikL} = 1/D
    const aMinus = C.sc(C.mul(tau, [1, -k / q]), Math.exp(q * Lw) / 2);   // coefficient of e^{−κx}
    const aPlus = C.sc(C.mul(tau, [1, k / q]), Math.exp(-q * Lw) / 2);    // coefficient of e^{κx}
    const T = C.abs2(t), R = C.abs2(r);
    return {
      E, L: Lw, k, kappa: q, D, t, r, tau, aMinus, aPlus, T, R,
      Tclosed: 1 / (1 + sh * sh / (4 * E * (1 - E))),
      Twkb: Math.exp(-2 * q * Lw),
      jBranches: 4 * q * (aMinus[0] * aPlus[1] - aMinus[1] * aPlus[0])   // 4κ Im(ā₋ a₊)
    };
  }
  const barrierCache = new Map();
  function barrierOf(E, Lw) {
    const key = `${E}|${Lw}`;
    let B = barrierCache.get(key);
    if (!B) { B = barrier(E, Lw); barrierCache.set(key, B); if (barrierCache.size > 200) barrierCache.delete(barrierCache.keys().next().value); }
    return B;
  }
  const leftAt = (B, x) => {
    const inc = C.cis(B.k * x), ref = C.mul(B.r, C.cis(-B.k * x));
    return { region: 'left', psi: C.add(inc, ref), dpsi: C.sc(C.I(C.sub(inc, ref)), B.k), first: inc, second: ref };
  };
  const insideAt = (B, x) => {
    const u = B.kappa * (B.L - x), ch = Math.cosh(u), sh = Math.sinh(u);
    return { region: 'barrier', psi: C.mul(B.tau, [ch, -(B.k / B.kappa) * sh]), dpsi: C.mul(B.tau, [-B.kappa * sh, B.k * ch]),
      first: C.sc(B.aMinus, Math.exp(-B.kappa * x)), second: C.sc(B.aPlus, Math.exp(B.kappa * x)) };
  };
  const rightAt = (B, x) => { const psi = C.mul(B.t, C.cis(B.k * x)); return { region: 'right', psi, dpsi: C.sc(C.I(psi), B.k), first: psi, second: [0, 0] }; };
  const psiAt = (B, x) => (x < 0 ? leftAt(B, x) : x <= B.L ? insideAt(B, x) : rightAt(B, x));
  /** j = (ℏ/m) Im(ψ̄ ψ′) = 2 Im(ψ̄ ψ′) in these units. */
  const flux = (s) => 2 * (s.psi[0] * s.dpsi[1] - s.psi[1] * s.dpsi[0]);
  function boundaries(B) {
    const pack = (s) => ({ psi: s.psi, dpsi: s.dpsi, j: flux(s) });
    const l0 = leftAt(B, 0), i0 = insideAt(B, 0), iL = insideAt(B, B.L), rL = rightAt(B, B.L);
    const gap = (a, b) => Math.max(Math.hypot(a.psi[0] - b.psi[0], a.psi[1] - b.psi[1]), Math.hypot(a.dpsi[0] - b.dpsi[0], a.dpsi[1] - b.dpsi[1]));
    return { x0: { left: pack(l0), inside: pack(i0) }, xL: { inside: pack(iL), right: pack(rL) }, mismatch: Math.max(gap(l0, i0), gap(iL, rL)) };
  }

  /* ---------- the temporal double slit ----------
     z1, z2, coh are amplitudes; coherent and background are intensities of the marker-traced mixed state; P is their
     sum over the incoherent baseline 1 + a² (relative spectral intensity, 0 ≤ P ≤ 2, the 2 only at a = 1, μ = 1). */
  function temporal(a, mu, phi, q) {
    const th = q + phi, z1 = [1, 0], z2 = C.sc(C.cis(th), a), sum = C.add(z1, z2), coh = C.sc(sum, Math.sqrt(mu));
    const coherent = C.abs2(coh), background = (1 - mu) * (1 + a * a), numerator = coherent + background, norm = 1 + a * a;
    return {
      q, theta: th, z1, z2, sum, coh, coherent, background, numerator, P: numerator / norm,
      formula: (1 + a * a + 2 * a * mu * Math.cos(th)) / norm,
      floor: (1 + a * a - 2 * a * mu) / norm, ceiling: (1 + a * a + 2 * a * mu) / norm, visibility: 2 * a * mu / norm,
      cancellation: Math.abs(a - 1) < 1e-12 && Math.abs(mu - 1) < 1e-12 && Math.abs(Math.cos(th) + 1) < 1e-12
    };
  }

  /* ---------- state ---------- */
  const S = { scene: 'stat', E: 0.5, L: 1.2, a: 1, mu: 1, phi: PI, dt: 2 };
  const RAIL = { stat: { max: 1, rate: 0.1, step: 0.05 }, temp: { max: 4 * PI, rate: 4 * PI / 10, step: PI / 8 } };
  const VIEWS = { stat: [-0.3, 0.34], temp: [-0.5, 0.3] };
  const probeX = (u) => -XOUT + clamp(u, 0, 1) * (S.L + 2 * XOUT);

  /* display maps */
  const Xs = (x) => (x - S.L / 2) * SPAN / (S.L + 2 * XOUT);
  const W3 = (x, z) => [Xs(x), AMP * z[0], AMP * z[1]];
  const AMPT = 0.45, YWALL = 1.5;
  const Xq = (q) => -SPAN / 2 + SPAN * q / (4 * PI);
  const Wq = (q, z) => [Xq(q), AMPT * z[0], AMPT * z[1]];
  const wallPt = (q, p) => [Xq(q), YWALL, -1 + p];
  const corners = (xs, ys, zs) => xs.flatMap((x) => ys.flatMap((y) => zs.map((z) => [x, y, z])));
  const BOX = {
    stat: corners([-SPAN / 2 - 0.15, SPAN / 2 + 0.2], [-HB, HB], [-HB, HB]),
    temp: corners([-SPAN / 2 - 0.1, SPAN / 2 + 0.2], [-0.8, YWALL], [-1.15, 1.15])
  };

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const opts = { canvas: $('cv'), yaw: VIEWS.stat[0], pitch: VIEWS.stat[1], wheel: false, radius: 0.3, cx: 0.5, cy: 0.5, onChange: () => paint() };
  const st = kit.stage3(stageEl, opts);
  stageEl.classList.toggle('still', !!TRV.still);
  let FITCAM = VIEWS.stat.slice(), FIT = null, FRAME = null, dragging = null;

  function boxOf(el, sr) {
    if (!el || el.hidden || !el.getClientRects().length) return null;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null;
    const r = el.getBoundingClientRect(); if (r.width < 1 || r.height < 1) return null;
    return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height };
  }
  function hudBoxes() {
    const sr = stageEl.getBoundingClientRect(), out = [];
    for (const el of [$('hudTl'), $('sceneChips'), ...$('legend').children]) { const b = boxOf(el, sr); if (b) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 16, y: top + 4, w: Math.max(40, W - 32), h: Math.max(60, bottom - top - 8) };
  }
  const basis = (cam) => { const cy = Math.cos(cam[0]), sy = Math.sin(cam[0]), cp = Math.cos(cam[1]), sp = Math.sin(cam[1]); return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] }; };
  /** Fit the scene's box, seen from the camera of the card or scene, into the HUD-free rectangle. */
  function fitTo(box, area, W, H) {
    const { R, U } = basis(FITCAM);
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of box) { const a = v3.dot(p, R), b = -v3.dot(p, U); x0 = Math.min(x0, a); x1 = Math.max(x1, a); y0 = Math.min(y0, b); y1 = Math.max(y1, b); }
    const unit = Math.max(16, Math.min(area.w / (x1 - x0), area.h / (y1 - y0)));
    opts.radius = unit / Math.max(1, Math.min(W, H));
    opts.cx = (area.x + area.w / 2 - unit * (x0 + x1) / 2) / Math.max(1, W);
    opts.cy = (area.y + area.h / 2 - unit * (y0 + y1) / 2) / Math.max(1, H);
  }

  /* labels: placed by priority, clear of each other, of the HUD and of the handle */
  const sizes = new Map();
  TRV.onLang(() => sizes.clear());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const meets = (a, b, m) => a.x < b.x + b.w + m && b.x < a.x + a.w + m && a.y < b.y + b.h + m && b.y < a.y + a.h + m;
  function want(key, world, html, cls, pri, dir) { if (!TRV.thumbMode) LB.push({ key, q: st.p(world), html, cls, pri, dir }); }
  function placeLabels(center) {
    const placed = [];
    LB.sort((a, b) => b.pri - a.pri);
    for (const l of LB) {
      const [w, h] = sizeOf(l.html, l.cls);
      if (!w) continue;
      const d = l.dir || [l.q[0] - center[0] || 0.01, l.q[1] - center[1] || -1], base = Math.atan2(d[1], d[0]);
      let ok = null;
      for (const r of [10, 20, 34, 50]) {
        for (const da of [0, 0.5, -0.5, 1.0, -1.0, 1.6, -1.6, 2.3, -2.3, PI]) {
          const ux = Math.cos(base + da), uy = Math.sin(base + da), ext = Math.abs(ux) * w / 2 + Math.abs(uy) * h / 2;
          const b = { x: l.q[0] + ux * (r + ext) - w / 2, y: l.q[1] + uy * (r + ext) - h / 2, w, h };
          if (b.x < BOUNDS.x || b.y < BOUNDS.y || b.x + w > BOUNDS.x + BOUNDS.w || b.y + h > BOUNDS.y + BOUNDS.h) continue;
          if (placed.some((p) => meets(p, b, 3)) || OBST.some((p) => meets(p, b, 2))) continue;
          ok = b; break;
        }
        if (ok) break;
      }
      if (!ok) continue;
      placed.push(Object.assign({ key: l.key }, ok));
      st.tag(l.key, [ok.x + w / 2, ok.y + h / 2], l.html, l.cls, { screen: true });
    }
    PLACED = placed.map((p) => ({ key: p.key, x: p.x, y: p.y, w: p.w, h: p.h }));
  }
  /** Keep every label off the projected world segment a → b: boxes of half size r spaced at most r apart along it
      (so the whole stroke is covered) and one of half size rt around the tip b. Returns the two screen points. */
  function keepClear(a, b, r, rt) {
    const p = st.p(a), q = st.p(b), n = Math.max(1, Math.ceil(Math.hypot(q[0] - p[0], q[1] - p[1]) / r));
    for (let i = 0; i <= n; i++) { const x = p[0] + (q[0] - p[0]) * i / n, y = p[1] + (q[1] - p[1]) * i / n; OBST.push({ x: x - r, y: y - r, w: 2 * r, h: 2 * r }); }
    OBST.push({ x: q[0] - rt, y: q[1] - rt, w: 2 * rt, h: 2 * rt });
    return { foot: [p[0], p[1]], tip: [q[0], q[1]] };
  }

  /* ---------- drawing ---------- */
  const face = (X) => [[X, -HB, -HB], [X, HB, -HB], [X, HB, HB], [X, -HB, HB]];
  function drawStat(M) {
    const B = M.B, X0 = Xs(0), X1 = Xs(B.L), xl = Xs(-XOUT), xr = Xs(B.L + XOUT), thin = TRV.thumbMode ? 1.4 : 1;
    // axes (violet): x along the stage, Re ψ and Im ψ at the left end
    st.path([[xl - 0.08, 0, 0], [xr + 0.08, 0, 0]], { color: P.violet, width: 1.2, alpha: 0.8, fade: false });
    st.arrow([xr + 0.04, 0, 0], [xr + 0.2, 0, 0], { color: P.violet, width: 1.2, headSize: 8, fade: false });
    st.path([[xl, -0.75, 0], [xl, 0.75, 0]], { color: P.violet, width: 1, alpha: 0.5, fade: false });
    st.path([[xl, 0, -0.75], [xl, 0, 0.75]], { color: P.violet, width: 1, alpha: 0.5, fade: false });
    // the barrier [0, L]: two translucent violet faces and their edges
    st.poly(face(X0), { fill: P.violet, alpha: 0.09, color: P.violet, strokeAlpha: 0.65, width: 1 });
    st.poly(face(X1), { fill: P.violet, alpha: 0.09, color: P.violet, strokeAlpha: 0.65, width: 1 });
    for (const [y, z] of [[-HB, -HB], [HB, -HB], [HB, HB], [-HB, HB]]) st.path([[X0, y, z], [X1, y, z]], { color: P.violet, width: 1, alpha: 0.4, fade: false });
    // the branches and the total
    const xsL = lin(-XOUT, 0, 150), xsB = lin(0, B.L, 90), xsR = lin(B.L, B.L + XOUT, 150);
    const sL = xsL.map((x) => leftAt(B, x)), sB = xsB.map((x) => insideAt(B, x)), sR = xsR.map((x) => rightAt(B, x));
    st.path(sL.map((s, i) => W3(xsL[i], s.first)), { color: P.cyan, width: 1.3 * thin, alpha: 0.8, fade: false });
    st.path(sL.map((s, i) => W3(xsL[i], s.second)), { color: P.magenta, width: 1.3 * thin, alpha: 0.8, fade: false });
    st.path(sB.map((s, i) => W3(xsB[i], s.first)), { color: P.cyan, width: 2 * thin, fade: false });
    st.path(sB.map((s, i) => W3(xsB[i], s.second)), { color: P.magenta, width: 2 * thin, fade: false });
    // the resultant ψ (violet, bold): the curve the two branches add up to
    const total = [...sL.map((s, i) => W3(xsL[i], s.psi)), ...sB.map((s, i) => W3(xsB[i], s.psi)), ...sR.map((s, i) => W3(xsR[i], s.psi))];
    st.path(total, { color: P.violet, width: 2.6, fade: false });
    // the amber probe: the phasor ψ(x) at the rail's x
    const pp = W3(M.x, M.probe.psi), foot = [Xs(M.x), 0, 0];
    st.path([foot, pp], { color: P.amber, width: 1.8, fade: false });
    st.dot(foot, 2.6, P.amber, { fade: false });
    st.dot(pp, 5, P.amber, { glow: 12, fade: false });
    // the labels below keep clear of the probe: its foot, its stroke and its tip stay visible in every frame and still
    const probeMark = keepClear(foot, pp, 5, 10);
    // labels
    want('barrier', [(X0 + X1) / 2, 0, HB], `[0, L] · V₀ = 1`, 'raw c-vi backed', 9, [0, -1]);
    want('trans', W3(B.L + 0.72 * XOUT, rightAt(B, B.L + 0.72 * XOUT).psi), 't e<sup>ikx</sup>', 'raw c-vi backed', 8);
    want('dec', W3(0.12 * B.L, insideAt(B, 0.12 * B.L).first), 'a₋e<sup>−κx</sup>', 'raw c-cy backed', 7, [0.2, -1]);
    want('grow', W3(0.92 * B.L, insideAt(B, 0.92 * B.L).second), 'a₊e<sup>κx</sup>', 'raw c-mg backed', 7, [0.4, 1]);
    want('inc', W3(-0.9 * XOUT, leftAt(B, -0.9 * XOUT).first), 'e<sup>ikx</sup>', 'raw c-cy backed', 6);
    want('ref', W3(-0.45 * XOUT, leftAt(B, -0.45 * XOUT).second), 'r e<sup>−ikx</sup>', 'raw c-mg backed', 6);
    want('xaxis', [xr + 0.2, 0, 0], 'x', 'raw c-vi', 4, [1, 0.3]);
    return { handle: [X1, 0, HB], probe: probeMark };
  }

  function drawTemp(M) {
    const Tm = M.T, qs = lin(0, 4 * PI, 240), wl = Xq(0), wr = Xq(4 * PI), sm = Math.sqrt(S.mu);
    // the q axis (violet)
    st.path([[wl - 0.08, 0, 0], [wr + 0.06, 0, 0]], { color: P.violet, width: 1.3, alpha: 0.85, fade: false });
    st.arrow([wr + 0.02, 0, 0], [wr + 0.2, 0, 0], { color: P.violet, width: 1.3, headSize: 8, fade: false });
    // the back wall: the relative intensity P(q) between 0 and 2, the background level 1 − μ (violet) and the floor (dotted)
    st.poly([[wl, YWALL, -1.1], [wr, YWALL, -1.1], [wr, YWALL, 1.1], [wl, YWALL, 1.1]], { fill: P.ink, alpha: 0.035, color: P.lineHot, strokeAlpha: 0.8, width: 1 });
    st.path([[wl, YWALL, -1], [wr, YWALL, -1]], { color: P.dim, width: 1, alpha: 0.8, fade: false });
    st.path([[wl, YWALL, 0], [wr, YWALL, 0]], { color: P.dim, width: 0.8, alpha: 0.5, dash: [3, 4], fade: false });
    if (S.mu < 0.999) st.path([[wl, YWALL, -S.mu], [wr, YWALL, -S.mu]], { color: P.violet, width: 1.4, dash: [6, 4], fade: false });
    st.path([[wl, YWALL, -1 + Tm.floor], [wr, YWALL, -1 + Tm.floor]], { color: P.ink, width: 1, alpha: 0.75, dash: [2, 3], fade: false });
    const curve = qs.map((q) => temporal(S.a, S.mu, S.phi, q));
    st.path(curve.map((c) => wallPt(c.q, c.P)), { color: P.ink, width: 2.2, fade: false });
    // amplitudes: path 1 (cyan), path 2 (magenta helix about the axis), the coherent resultant √μ(z₁ + z₂) (violet helix)
    st.path([Wq(0, [1, 0]), Wq(4 * PI, [1, 0])], { color: P.cyan, width: 1.8, fade: false });
    st.path(curve.map((c) => Wq(c.q, c.z2)), { color: P.magenta, width: 1.6, alpha: 0.9, fade: false });
    if (sm > 1e-3) st.path(curve.map((c) => Wq(c.q, c.coh)), { color: P.violet, width: 2.4, fade: false });
    // the current slice q: the amplitudes head to tail, the resultant, the background ring (an intensity: its radius
    // squared is (1 − μ)(1 + a²), not an amplitude) and the reading on the wall
    const q = Tm.q, Xc = Xq(q), o = [Xc, 0, 0];
    st.circle(o, [1, 0, 0], AMPT * 2.55, { color: P.amber, width: 1, alpha: 0.28, fade: false, n: 96 });
    if (Tm.background > 1e-9) st.circle(o, [1, 0, 0], AMPT * Math.sqrt(Tm.background), { color: P.violet, width: 1.8, fade: false, n: 96 });
    st.arrow(o, Wq(q, Tm.z1), { color: P.cyan, width: 2.2, headSize: 9, fade: false });
    if (S.a > 1e-3) st.arrow(Wq(q, Tm.z1), Wq(q, Tm.sum), { color: P.magenta, width: 2.2, headSize: 9, fade: false });
    if (Tm.coherent > 1e-8) st.arrow(o, Wq(q, Tm.coh), { color: P.violet, width: 2, headSize: 9, fade: false });
    const wp = wallPt(q, Tm.P);
    st.path([[Xc, YWALL, -1], wp], { color: P.amber, width: 1.2, dash: [3, 3], fade: false });
    st.dot(wp, 5, P.amber, { glow: 12, fade: false });
    st.dot(o, 3, P.amber, { fade: false });
    // labels
    want('wall', wallPt(0.35 * PI, 1.95), 'P(q)', 'raw ink backed', 9, [0, -1]);
    want('z1', Wq(3.75 * PI, [1, 0]), 'z₁ = 1', 'raw c-cy backed', 8);
    want('z2', Wq(3.2 * PI, curve[Math.round(240 * 3.2 / 4)].z2), 'z₂ = a e<sup>i(q+φ)</sup>', 'raw c-mg backed', 7);
    if (sm > 1e-3) want('coh', Wq(2.4 * PI, curve[Math.round(240 * 2.4 / 4)].coh), '√μ (z₁ + z₂)', 'raw c-vi backed', 7);
    if (Tm.background > 1e-6) want('bg', [Xc, 0, -AMPT * Math.sqrt(Tm.background)], 'r² = (1 − μ)(1 + a²)', 'raw c-vi backed', 5, [0, 1]);   // an intensity: the ring's squared radius
    want('qaxis', [wr + 0.2, 0, 0], 'q = EΔt/ℏ', 'raw c-vi', 4, [1, 0.3]);
    return { handle: Wq(q, Tm.sum) };
  }

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W - 48, h: H - 48 } : safeRect(W, H, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(BOX[S.scene], area, W, H); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    st.begin();
    const out = S.scene === 'stat' ? drawStat(M) : drawTemp(M);
    const hq = !thumb && !TRV.still ? st.p(out.handle) : null;
    if (hq) OBST.push({ x: hq[0] - 17, y: hq[1] - 17, w: 34, h: 34 });
    placeHandle(hq);
    if (!thumb) placeLabels(st.p([0, 0, 0]));
    st.end();
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, probe: out.probe || null, unit: st.unit, cx: st.cx, cy: st.cy };
  }

  /* ---------- the handle: L on the right face of the barrier; a and φ at the tip of z₁ + z₂ ---------- */
  const handle = $('handle');
  function placeHandle(q) {
    handle.hidden = !q;
    const zh = S.scene === 'stat' ? '拖动势垒右面改变宽度 L（← → 微调）' : '拖动 z₁ + z₂ 的尖端改变 a 与 φ（← → 调 φ，↑ ↓ 调 a）';
    const en = S.scene === 'stat' ? 'Drag the right face of the barrier to change the width L (← → fine steps)' : 'Drag the tip of z₁ + z₂ to change a and φ (← → for φ, ↑ ↓ for a)';
    if (handle.dataset.ariaEn !== en) { handle.dataset.ariaZh = zh; handle.dataset.ariaEn = en; }
    handle.setAttribute('aria-label', L(zh, en));
    if (q) { handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`; }
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  /** The width L whose right face lies, along the projected x axis, under the screen point q. */
  function widthAt(q) {
    const o = st.p([0, 0, 0]), e = st.p([1, 0, 0]), dx = [e[0] - o[0], e[1] - o[1]], d2 = dx[0] * dx[0] + dx[1] * dx[1];
    if (d2 < 9) return S.L;
    const h = st.p([Xs(S.L), 0, HB]), s = ((q[0] - h[0]) * dx[0] + (q[1] - h[1]) * dx[1]) / d2, X = Xs(S.L) + s;
    if (X <= 0) return 0.4;
    if (X >= SPAN / 2 - 1e-9) return 5;
    return clamp(4 * XOUT * X / (SPAN - 2 * X), 0.4, 5);
  }
  /** (a, φ) whose tip z₁ + z₂ lies, in the slice plane of the current q, under the screen point q. */
  function tipAt(pt) {
    const q = clock.t, Xc = Xq(q), o = st.p([Xc, 0, 0]), ey = st.p([Xc, 1, 0]), ez = st.p([Xc, 0, 1]);
    const a1 = [ey[0] - o[0], ey[1] - o[1]], b1 = [ez[0] - o[0], ez[1] - o[1]], det = a1[0] * b1[1] - a1[1] * b1[0];
    if (Math.abs(det) < 0.04 * st.unit * st.unit) return null;            // the slice is seen edge-on
    const r = [pt[0] - o[0], pt[1] - o[1]], y = (r[0] * b1[1] - r[1] * b1[0]) / det, z = (a1[0] * r[1] - a1[1] * r[0]) / det;
    const w = [y / AMPT - 1, z / AMPT], a = clamp(Math.hypot(w[0], w[1]), 0, 1.5);
    return { a, phi: a > 1e-9 ? modTau(Math.atan2(w[1], w[0]) - q) : S.phi };
  }
  function dragTo(pt) {
    if (S.scene === 'stat') S.L = widthAt(pt);
    else { const t = tipAt(pt); if (!t) return; S.a = t.a; S.phi = t.phi; }
    syncFields(); paint();
  }
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    dragging = { id: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => { if (!dragging || ev.pointerId !== dragging.id) return; ev.preventDefault(); dragTo(local(ev)); });
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.id)) return;
    const id = dragging.id; dragging = null; handle.classList.remove('dragging');
    try { if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id); } catch (e) { /* already released */ }
    paint();
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = ev.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const sgn = k === 'ArrowRight' || k === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'stat') S.L = clamp(Math.round((S.L + sgn * (k === 'ArrowUp' || k === 'ArrowDown' ? 0.25 : 0.05)) * 100) / 100, 0.4, 5);
    else if (k === 'ArrowLeft' || k === 'ArrowRight') S.phi = modTau(S.phi + sgn * PI / 36);
    else S.a = clamp(Math.round((S.a + sgn * 0.05) * 100) / 100, 0, 1.5);
    syncFields(); paint();
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendHtml = (items) => items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  const pi = (x) => `${fix(x / PI, 3)}π`;
  function model() {
    const B = barrierOf(S.E, S.L);
    if (S.scene === 'stat') { const x = probeX(clock.t), pr = psiAt(B, x); return { B, x, probe: pr, j: flux(pr) }; }
    return { B, T: temporal(S.a, S.mu, S.phi, clamp(clock.t, 0, 4 * PI)) };
  }
  function hudText(M) {
    let big, sub, legend;
    if (S.scene === 'stat') {
      const B = M.B;
      big = `${L('定态势垒', 'Barrier')} · T = ${fix(B.T, 6)}`;
      sub = `E = ${fix(S.E, 3)} · L = ${fix(S.L, 2)} · κL = ${fix(B.kappa * S.L, 3)} · j(x) = ${fix(M.j, 4)} = 2kT`;
      legend = [['cy', L('入射 e<sup>ikx</sup> · 衰减支', 'incoming e<sup>ikx</sup> · decaying branch')], ['mg', L('反射 r e<sup>−ikx</sup> · 增长支', 'reflected r e<sup>−ikx</sup> · growing branch')],
        ['vi', L('合成 ψ（粗）· 势垒 [0, L] · 轴', 'resultant ψ (bold) · barrier [0, L] · axes')], ['am', L('探针 x · 手柄 L', 'probe x · handle L')]];
    } else {
      const Tm = M.T;
      big = `${L('时间双缝', 'Time slits')} · P(q) = ${fix(Tm.P, 6)}`;   // P(q) is named in the legend: relative intensity
      sub = `a = ${fix(S.a, 2)} · μ = ${fix(S.mu, 2)} · φ = ${pi(S.phi)} · q = ${pi(Tm.q)} · ${L('下限', 'floor')} ${fix(Tm.floor, 4)}`;
      legend = [['cy', L('路径一 z₁ = 1', 'path 1, z₁ = 1')], ['mg', L('路径二 z₂', 'path 2, z₂')], ['vi', L('相干振幅 √μ(z₁ + z₂) · 本底环 · 轴', 'coherent amplitude √μ(z₁ + z₂) · ring · axis')],
        ['ik', L('墙：相对强度 P(q)', 'wall: relative intensity P(q)')], ['am', L('当前 q · 手柄', 'current q · handle')]];
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    const html = legendHtml(legend);
    if ($('legend').innerHTML !== html) $('legend').innerHTML = html;
  }
  const row = (cls, dt, dd) => `<div class="${cls}"><dt>${dt}</dt><dd>${dd}</dd></div>`;
  const cstr = (z) => `${fix(z[0], 4)} ${z[1] < 0 ? '−' : '+'} ${fix(Math.abs(z[1]), 4)}i`;
  function drawText(M) {
    let rows, note, pill1, pill2;
    if (S.scene === 'stat') {
      const B = M.B, inside = M.probe.region === 'barrier';
      rows = [
        `<div class="key"><dt>${L('透射 T = |t|² 与反射 R = |r|²', 'Transmission T = |t|² and reflection R = |r|²')}</dt><dd><b>T = ${fix(B.T, 6)} · R = ${fix(B.R, 6)}</b><span>T + R = ${fix(B.T + B.R, 6)} · ${L('闭式', 'closed form')} ${fix(B.Tclosed, 6)}</span></dd></div>`,
        row('c', 'k = √E · κ = √(1 − E)', `${fix(B.k, 4)} · ${fix(B.kappa, 4)}`),
        row('v', 'κL', fix(B.kappa * S.L, 4)),
        row('wide', L('领头指数 e<sup>−2κL</sup>（不含前因子）· T 与它之比', 'Leading exponential e<sup>−2κL</sup> (no prefactor) · T over it'), `${fix(B.Twkb, 6)} · ${fix(B.T / B.Twkb, 4)}`),
        row('wide', L(`探针 x = ${fix(M.x, 3)} 处的流 j = 2 Im(ψ̄ψ′)`, `Flux j = 2 Im(ψ̄ψ′) at the probe x = ${fix(M.x, 3)}`), `${fix(M.j, 6)} · 2kT = ${fix(2 * B.k * B.T, 6)}`),
        row(inside ? 'm wide' : 'wide', inside ? L('探针处两支 |a₋e<sup>−κx</sup>| · |a₊e<sup>κx</sup>|', 'Branches at the probe |a₋e<sup>−κx</sup>| · |a₊e<sup>κx</sup>|') : L('探针处 |ψ|²', '|ψ|² at the probe'),
          inside ? `${fix(Math.sqrt(C.abs2(M.probe.first)), 6)} · ${fix(Math.sqrt(C.abs2(M.probe.second)), 6)}` : fix(C.abs2(M.probe.psi), 6))
      ];
      note = B.kappa * S.L > 2.5
        ? L('厚势垒：T 很小，约为领头指数的 16E(1 − E) 倍；增长支很弱，却和衰减支一起携带与右侧相同的流。', 'Thick barrier: T is small, about 16E(1 − E) times the leading exponential; the growing branch is faint, yet together with the decaying branch it carries the same flux as the right side.')
        : L('两条倏逝支单独都不带流；它们的交叉项 4κ Im(ā₋a₊) 带着流，沿 x 处处等于 2kT。', 'Neither evanescent branch carries flux alone; their cross term 4κ Im(ā₋a₊) does, equal to 2kT at every x.');
      pill1 = `E <strong>${fix(S.E, 3)}</strong>`; pill2 = `T <strong>${fix(B.T, 4)}</strong>`;
    } else {
      const Tm = M.T;
      rows = [
        `<div class="key"><dt>${L('相对谱强度 P(q) = 计数 ÷ 非相干基线 1 + a²（不是概率；0 ≤ P ≤ 2）', 'Relative spectral intensity P(q) = count ÷ incoherent baseline 1 + a² (not a probability; 0 ≤ P ≤ 2)')}</dt><dd><b>P = ${fix(Tm.P, 6)}</b><span>${L('下限', 'floor')} ${fix(Tm.floor, 6)} · ${L('上限', 'ceiling')} ${fix(Tm.ceiling, 6)}</span></dd></div>`,
        row('wide', L('振幅 z₁ · z₂ · 相干合成振幅 √μ(z₁ + z₂)', 'Amplitudes z₁ · z₂ · coherent resultant √μ(z₁ + z₂)'), `${cstr(Tm.z1)} · ${cstr(Tm.z2)} · ${cstr(Tm.coh)}`),
        row('wide', L('相干强度 |√μ(z₁ + z₂)|²', 'Coherent intensity |√μ(z₁ + z₂)|²'), fix(Tm.coherent, 6)),
        row('v wide', L('非相干本底强度 (1 − μ)(1 + a²)：标记求迹后的混合态，不是振幅', 'Incoherent background intensity (1 − μ)(1 + a²): the marker-traced mixed state, not an amplitude'), fix(Tm.background, 6)),
        row('wide', L('两种强度之和 = 1 + a² + 2aμ cos(q + φ)（未除以基线）', 'Sum of the two intensities = 1 + a² + 2aμ cos(q + φ) (before dividing by the baseline)'), `${fix(Tm.numerator, 6)} = ${fix((1 + S.a * S.a + 2 * S.a * S.mu * Math.cos(Tm.theta)), 6)}`),
        row('', L('能量 E = ℏq/Δt', 'Energy E = ℏq/Δt'), fix(Tm.q / S.dt, 4)),
        row('', L('条纹间距 2πℏ/Δt', 'Fringe spacing 2πℏ/Δt'), fix(TAU / S.dt, 4)),
        row('wide', L('完全相消：a = 1、μ = 1、cos(q + φ) = −1', 'Full cancellation: a = 1, μ = 1, cos(q + φ) = −1'),
          `${Tm.cancellation ? L('满足', 'met') : L('不满足', 'not met')} · cos(q + φ) = ${fix(Math.cos(Tm.theta), 6)}`)
      ];
      note = S.mu < 1e-9
        ? L('μ = 0：相干合成振幅 √μ(z₁ + z₂) 为 0；标记求迹后的非相干本底强度 (1 − μ)(1 + a²) = 1 + a² 仍为正，相对强度 P = 1，没有条纹。', 'μ = 0: the coherent amplitude √μ(z₁ + z₂) is 0; the incoherent background intensity (1 − μ)(1 + a²) = 1 + a² left by tracing out the markers stays positive, the relative intensity is P = 1 and there is no fringe.')
        : S.mu < 1 - 1e-9
          ? L('μ < 1：紫色的相干合成振幅只给出相干强度；标记求迹后的非相干本底强度 (1 − μ)(1 + a²)（紫色环的半径平方，不是振幅）垫在下面，P 降不到 0。', 'μ < 1: the violet coherent amplitude gives only the coherent intensity; the incoherent background intensity (1 − μ)(1 + a²) left by tracing out the markers (the squared radius of the violet ring, not an amplitude) sits underneath and P cannot reach 0.')
          : Math.abs(S.a - 1) > 1e-9
            ? L('振幅不等：相位再对，两路也抵消不尽，下限 (1 − a)²/(1 + a²) > 0。', 'Unequal amplitudes: whatever the phase, the two paths do not cancel fully; the floor (1 − a)²/(1 + a²) is above 0.')
            : L('等幅、无标记：只在 cos(q + φ) = −1 处 P = 0，在 cos(q + φ) = 1 处取最大值 2，即非相干基线的两倍；相消来自振幅的相位，不是探测器把粒子消灭。', 'Equal and unmarked: P = 0 only where cos(q + φ) = −1 and P reaches its maximum 2, twice the incoherent baseline, where cos(q + φ) = 1; the cancellation comes from the phases of the amplitudes, not from a detector destroying the particle.');
      pill1 = `q <strong>${pi(Tm.q)}</strong>`; pill2 = `P <strong>${fix(Tm.P, 4)}</strong>`;
    }
    $('roList').innerHTML = rows.join('');
    $('roNote').innerHTML = note;
    $('pillParam').innerHTML = pill1; $('pillKey').innerHTML = pill2;
  }

  /* ---------- the strip: what changes along the rail ---------- */
  const PAD = [42, 12, 10, 22];
  const above = (v, lo) => (v >= lo ? v : NaN);                    // below the drawn range the curve is cut, not flattened
  function drawPlots(M) {
    const ca = $('plotA'), cb = $('plotB');
    if (TRV.thumbMode || !ca.clientWidth || !ca.clientHeight) return;
    const ticksLog = [[1e-4, '10⁻⁴'], [1e-2, '10⁻²'], [1, '1']];
    if (S.scene === 'stat') {
      const B = M.B, kap = B.kappa;
      $('plotATitle').textContent = L('T 随宽度 L：精确值与领头指数', 'T against the width L: exact and leading exponential');
      let g = kit.plot(ca, { x: [0.4, 5], y: [1e-5, 2], logY: true, pad: PAD });
      g.axes({ xTicks: [1, 2, 3, 4, 5], yTicks: ticksLog, xLabel: 'L' });
      const Ls = lin(0.4, 5, 140), Bs = Ls.map((l) => barrier(S.E, l));
      g.line(Ls.map((l) => [l, above(Math.exp(-2 * kap * l), 1e-5)]), P.dim, { width: 1.5, dash: [5, 4] });
      g.line(Bs.map((b) => [b.L, above(b.R, 1e-5)]), P.magenta, { width: 1.6 });
      g.line(Bs.map((b) => [b.L, above(b.T, 1e-5)]), P.ink, { width: 2 });
      g.vline(S.L, P.amber, { alpha: 0.8 }); g.dot(S.L, B.T, P.amber, 4.2);
      g.legend([[P.ink, 'T'], [P.magenta, 'R'], [P.dim, L('e^{−2κL}（只取领头指数）', 'e^{−2κL} (leading exponential only)'), 'dash']], { bottom: true, right: false });
      $('plotAMeta').textContent = `T = ${fix(B.T, 6)} · e^−2κL = ${fix(B.Twkb, 6)}`;
      $('plotBTitle').textContent = L('沿 x：两支变化几个数量级，流 j 不变', 'Along x: the branches change by powers of ten, the flux j does not');
      g = kit.plot(cb, { x: [-XOUT, S.L + XOUT], y: [1e-5, 8], logY: true, pad: PAD });
      g.rect(0, 1e-5, S.L, 8, P.violet, { alpha: 0.12 });
      g.axes({ xTicks: [[-XOUT, `−${XOUT}`], [0, '0'], ...(S.L >= 1.6 ? [[S.L, 'L']] : []), [S.L + XOUT, `L + ${XOUT}`]], yTicks: ticksLog });
      const xs = lin(-XOUT, S.L + XOUT, 260), xin = lin(0, S.L, 80);
      g.line(xin.map((x) => [x, above(C.abs2(insideAt(B, x).first), 1e-5)]), P.cyan, { width: 1.8 });
      g.line(xin.map((x) => [x, above(C.abs2(insideAt(B, x).second), 1e-5)]), P.magenta, { width: 1.8 });
      g.line(xs.map((x) => [x, above(C.abs2(psiAt(B, x).psi), 1e-5)]), P.ink, { width: 2 });
      g.line(xs.map((x) => [x, above(flux(psiAt(B, x)) / (2 * B.k), 1e-5)]), P.ink, { width: 1.4, dash: [5, 4] });
      g.vline(M.x, P.amber, { alpha: 0.8 }); if (C.abs2(M.probe.psi) >= 1e-5) g.dot(M.x, C.abs2(M.probe.psi), P.amber, 4.2);
      g.legend([[P.ink, '|ψ|²'], [P.cyan, '|a_{−}e^{−κx}|²'], [P.magenta, '|a_{+}e^{κx}|²'], [P.ink, 'j/2k', 'dash']], { bottom: true, right: false });
      $('plotBMeta').textContent = `j/2k = ${fix(M.j / (2 * B.k), 6)} · T = ${fix(B.T, 6)}`;
    } else {
      const Tm = M.T;
      $('plotATitle').textContent = L('相对强度 P(q)：相干部分垫在本底上', 'Relative intensity P(q): the coherent part on a background');
      let g = kit.plot(ca, { x: [0, 4 * PI], y: [0, 2.1], pad: PAD });
      g.axes({ xTicks: [[0, '0'], [PI, 'π'], [2 * PI, '2π'], [3 * PI, '3π'], [4 * PI, '4π']], yTicks: [0, 1, 2], xLabel: 'q' });
      const qs = lin(0, 4 * PI, 240);
      if (S.mu < 0.999) g.area(qs.map((q) => [q, 1 - S.mu]), P.violet, { alpha: 0.2 });
      g.hline(Tm.floor, P.ink, { dash: [2, 3], alpha: 0.85 });
      g.line(qs.map((q) => [q, temporal(S.a, S.mu, S.phi, q).P]), P.ink, { width: 2 });
      g.vline(Tm.q, P.amber, { alpha: 0.8 }); g.dot(Tm.q, Tm.P, P.amber, 4.2);
      g.legend([[P.ink, 'P(q)'], [P.violet, L('本底 1 − μ', 'background 1 − μ')], [P.ink, L('下限', 'floor'), 'dash']]);
      $('plotAMeta').textContent = `P = ${fix(Tm.P, 6)} · ${L('下限', 'floor')} ${fix(Tm.floor, 6)}`;
      $('plotBTitle').textContent = L('下限随标记重叠 μ：只有 a = 1、μ = 1 才到 0', 'The floor against the marker overlap μ: zero only at a = 1, μ = 1');
      g = kit.plot(cb, { x: [0, 1], y: [0, 1.05], pad: PAD });
      g.axes({ xTicks: [0, 0.25, 0.5, 0.75, 1], yTicks: [0, 0.5, 1], xLabel: 'μ' });
      const ms = lin(0, 1, 60), fl = (a, m) => (1 + a * a - 2 * a * m) / (1 + a * a);
      g.line(ms.map((m) => [m, fl(1, m)]), P.dim, { width: 1.3, dash: [5, 4] });
      g.line(ms.map((m) => [m, fl(S.a, m)]), P.ink, { width: 2 });
      g.dot(S.mu, Tm.floor, P.amber, 4.4);
      g.legend([[P.ink, L(`a = ${fix(S.a, 2)}`, `a = ${fix(S.a, 2)}`)], [P.dim, 'a = 1', 'dash']]);
      $('plotBMeta').textContent = `(1 + a² − 2aμ)/(1 + a²) = ${fix(Tm.floor, 6)}`;
    }
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlots(M);
  }, [stageEl, $('plotA'), $('plotB')]);

  /* ---------- the rail: the probe x (barrier) or the normalised energy q (time slits) ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: 0.5, rate: RAIL.stat.rate, step: RAIL.stat.step,
    format: (t) => (S.scene === 'stat'
      ? `x = ${fix(probeX(t), 2)} <small>${L('探针', 'probe')} · L = ${fix(S.L, 2)}</small>`
      : `q = ${fix(t / PI, 3)}π <small>E = ${fix(t / S.dt, 3)}</small>`),
    onChange: () => paint()
  });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  const leave = () => { if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); };
  const fE = kit.field($('energy'), { fmt: (v) => fix(v, 3), onInput: (v) => { leave(); S.E = clamp(v, 0.1, 0.9); paint(); } });
  const fL = kit.field($('width'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.L = clamp(v, 0.4, 5); paint(); } });
  const fA = kit.field($('ratio'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.a = clamp(v, 0, 1.5); paint(); } });
  const fM = kit.field($('overlap'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.mu = clamp(v, 0, 1); paint(); } });
  const fP = kit.field($('phase'), { fmt: (v) => pi(v), onInput: (v) => { leave(); S.phi = clamp(v, 0, TAU); paint(); } });
  const fD = kit.field($('delay'), { fmt: (v) => fix(v, 2), onInput: (v) => { leave(); S.dt = clamp(v, 0.5, 4); clock.set(clock.t); paint(); } });
  function syncFields() { fE.set(S.E); fL.set(S.L); fA.set(S.a); fM.set(S.mu); fP.set(S.phi); fD.set(S.dt); }
  function setScene(sc, ms) {
    S.scene = sc === 'temp' ? 'temp' : 'stat';
    const R = RAIL[S.scene];
    clock.rate = R.rate; clock.step = R.step; clock.setMax(R.max, true);
    sceneChips.set(S.scene, true);
    document.querySelectorAll('#ctlPanel .grp').forEach((g) => { g.hidden = g.dataset.scene !== S.scene; });
    FITCAM = VIEWS[S.scene].slice(); FIT = null;
    st.view(VIEWS[S.scene], ms);
    paint();
  }
  const sceneChips = kit.chips($('sceneChips'), 'scene', (v) => { leave(); setScene(v, 600); clock.set(v === 'temp' ? 0 : 0.5); });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    barrier: { scene: 'stat', E: 0.5, L: 1.2, at: 0, play: true, still: 0.5 },
    opaque: { scene: 'stat', E: 0.5, L: 4.5, at: 0, play: true, still: 0.5 },
    cancel: { scene: 'temp', a: 1, mu: 1, phi: PI, dt: 2, at: 0, play: true, still: 0 },
    marked: { scene: 'temp', a: 1, mu: 0, phi: PI, dt: 2, at: 0, play: true, still: 0 }
  };
  const NOTES = {
    barrier: ['E = 0.5、L = 1.2：势垒里青色的衰减支与品红的增长支一起携带流；琥珀探针沿 x 走过，|ψ|² 起伏，流 j 处处等于 2kT（T ≈ 0.52）。', 'E = 0.5, L = 1.2: inside, the cyan decaying branch and the magenta growing branch carry the flux together; as the amber probe walks along x, |ψ|² rises and falls while the flux j equals 2kT everywhere (T ≈ 0.52).'],
    opaque: ['L = 4.5：T ≈ 0.0069，约为领头指数 e<sup>−2κL</sup> ≈ 0.0017 的四倍；品红增长支几乎看不见，可流在势垒里、外处处相同。', 'L = 4.5: T ≈ 0.0069, about four times the leading exponential e<sup>−2κL</sup> ≈ 0.0017; the magenta growing branch is barely visible, yet the flux is the same everywhere inside and outside.'],
    cancel: ['a = 1、μ = 1、φ = π：q = 0 时青色振幅 z₁ 与品红振幅 z₂ 首尾相接回到轴上，紫色相干螺旋碰到 q 轴，墙上相对强度 P = 0；播放时 q 走过两道条纹，峰值 P = 2 是非相干基线的两倍。', 'a = 1, μ = 1, φ = π: at q = 0 the cyan amplitude z₁ and the magenta amplitude z₂, head to tail, return to the axis, the violet coherent helix touches the q axis and the relative intensity on the wall is P = 0; playing runs q over two fringes, whose peaks P = 2 are twice the incoherent baseline.'],
    marked: ['μ = 0：标记正交，相干合成振幅为零，紫色螺旋缩在轴上；紫色本底环的半径平方是非相干强度 1 + a²，不是振幅。墙上相对强度 P = 1，任何 q 都没有条纹。', 'μ = 0: orthogonal markers, the coherent amplitude is zero and the violet helix shrinks onto the axis; the squared radius of the violet background ring is the incoherent intensity 1 + a², not an amplitude. On the wall the relative intensity is P = 1, with no fringe at any q.']
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts
  const FIGURE_NOTES = {
    barrier: ['E = 0.5、L = 1.2：青色与品红两支一起携带流，探针处处读到 j = 2kT，T ≈ 0.52。', 'E = 0.5, L = 1.2: the cyan and magenta branches carry the flux together; the probe reads j = 2kT everywhere, T ≈ 0.52.'],
    opaque: ['L = 4.5：T ≈ 0.0069，约为领头指数的四倍；流在各处仍然相同。', 'L = 4.5: T ≈ 0.0069, about four times the leading exponential; the flux is still the same everywhere.'],
    cancel: ['a = 1、μ = 1、φ = π：q = 0 时两振幅首尾相消，相对强度 P = 0。', 'a = 1, μ = 1, φ = π: at q = 0 the two amplitudes cancel; relative intensity 0.'],
    marked: ['μ = 0：相干振幅为零，紫色本底使相对强度 P = 1，没有条纹。', 'μ = 0: no coherent amplitude; the violet background keeps relative intensity 1.']
  };
  const PARAMS = ['E', 'L', 'a', 'mu', 'phi', 'dt'];
  function applyPreset(id) {
    const p = PRESETS[id];
    clock.pause();
    if (transition) { transition.cancel(); transition = null; }
    const same = S.scene === p.scene;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    const from = {}, to = {};
    for (const k of PARAMS) { from[k] = S[k]; to[k] = p[k] == null ? S[k] : p[k]; }
    const finish = () => { Object.assign(S, to); syncFields(); paint(); };
    if (booting || TRV.still || !same) finish();
    else transition = kit.tween(550, (e) => { for (const k of PARAMS) S[k] = from[k] + (to[k] - from[k]) * e; syncFields(); paint(); }, finish);
    const still = p.still === 'end' ? clock.max : p.still;
    if (TRV.still || (booting && !TRV.embed)) clock.set(still);
    else clock.set(p.at);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) kit.autoplay(clock, stageEl); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉参数、拖琥珀环、拖空白处转视角。随时可以再选一张卡。', 'Free play: move the parameters, drag the amber ring, drag empty space to orbit. Pick a card again at any time.']
  });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe for the browser suite, cover, start ---------- */
  const viewport = (v) => { const b = stageEl.getBoundingClientRect(), q = st.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], depth: q[2] }; };
  window.SCATTERING_DEBUG = Object.freeze({
    get state() {
      const B = barrierOf(S.E, S.L), x = probeX(S.scene === 'stat' ? clock.t : 0.5), pr = psiAt(B, x);
      const q = S.scene === 'temp' ? clamp(clock.t, 0, 4 * PI) : 0, Tm = temporal(S.a, S.mu, S.phi, q);
      const samples = lin(-XOUT, S.L + XOUT, 48).map((xx) => { const s = psiAt(B, xx); return { x: xx, region: s.region, psi: s.psi, dpsi: s.dpsi, j: flux(s) }; });
      return JSON.parse(JSON.stringify({
        scene: S.scene, preset: cards.current, playing: clock.playing, t: clock.t, max: clock.max, step: clock.step,
        params: { E: S.E, L: S.L, a: S.a, mu: S.mu, phi: S.phi, dt: S.dt },
        stationary: {
          k: B.k, kappa: B.kappa, D: B.D, t: B.t, r: B.r, tau: B.tau, aMinus: B.aMinus, aPlus: B.aPlus, T: B.T, R: B.R, sum: B.T + B.R,
          Tclosed: B.Tclosed, Twkb: B.Twkb, ratio: B.T / B.Twkb, jRight: 2 * B.k * B.T, jBranches: B.jBranches, boundary: boundaries(B),
          probe: { x, region: pr.region, psi: pr.psi, dpsi: pr.dpsi, j: flux(pr), abs2: C.abs2(pr.psi), first: pr.first, second: pr.second }, samples
        },
        temporal: {
          q, E: q / S.dt, fringe: TAU / S.dt, theta: Tm.theta, z1: Tm.z1, z2: Tm.z2, sum: Tm.sum, coh: Tm.coh, coherent: Tm.coherent, background: Tm.background,
          numerator: Tm.numerator, P: Tm.P, formula: Tm.formula, floor: Tm.floor, ceiling: Tm.ceiling, visibility: Tm.visibility, cancellation: Tm.cancellation,
          samples: lin(0, 4 * PI, 32).map((qq) => ({ q: qq, P: temporal(S.a, S.mu, S.phi, qq).P }))
        },
        camera: { yaw: st.cam.yaw, pitch: st.cam.pitch, zoom: st.cam.zoom }, handle: FRAME ? FRAME.handle : null, labels: PLACED, frame: FRAME
      }));
    },
    /** Set parameters as a reader would with the controls (leaves the card, pauses the clock). */
    setParams(o) {
      leave();
      if (o.scene) setScene(o.scene, 0);
      if (o.E != null) S.E = clamp(o.E, 0.1, 0.9);
      if (o.L != null) S.L = clamp(o.L, 0.4, 5);
      if (o.a != null) S.a = clamp(o.a, 0, 1.5);
      if (o.mu != null) S.mu = clamp(o.mu, 0, 1);
      if (o.phi != null) S.phi = clamp(o.phi, 0, TAU);
      if (o.dt != null) S.dt = clamp(o.dt, 0.5, 4);
      if (o.t != null) clock.set(o.t);
      syncFields(); paint();
    },
    /** Viewport centre of the handle, or null when it is hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport point where dragging the handle sets the width Lw (barrier) or (a, φ) (time slits), with the camera of now. */
    dragTarget(o) {
      if (S.scene === 'stat') return viewport([SPAN * o.L / (2 * (o.L + 2 * XOUT)), 0, HB]);
      const q = clamp(clock.t, 0, 4 * PI);
      return viewport(Wq(q, C.add([1, 0], C.sc(C.cis(q + o.phi), o.a))));
    },
    /** The pure numerical methods of the page (for coverage only; the suite checks them with its own mathematics). */
    methods: { barrier, psiAt: (E, Lw, x) => psiAt(barrier(E, Lw), x), temporal }
  });
  window.TRV_THUMB = () => { cards.pick('barrier'); clock.pause(); clock.set(0.5); paint.now(); };
  cards.pick(cards.initial('barrier'));
  booting = false;
  paint();
})();
