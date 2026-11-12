/* PULSE//AREA · 脉冲面积与虚拟 Z
   One qubit driven by microwave pulses, seen in the frame that turns along with the drive (rotating frame).
     a pulse     envelope Ω(t) on [0, T] (square, or a Gaussian of σ = T/6 truncated to zero at both ends), phase φ,
                 detuning Δ: generator ½(Ω cos φ X + Ω sin φ Y + Δ Z). With Δ = 0 every instant turns about the same
                 equatorial axis, so the pulse is exactly a turn by the area ∫Ω dt; with Δ ≠ 0 the pulse is cut into
                 slices, each an exact 2 × 2 exponential at the slice's mean amplitude, multiplied in time order.
     virtual Z   Z(λ) before the pulses takes no time: the pulses are sent at φ − λ (the right sign) or φ + λ (wrong).
     second      an optional second pulse of the same shape, length and area, at its own phase φ₂.
   The compared (dashed) path: the two pulses swapped; or the circuit taken literally (a real Z(λ), then the pulse at
   φ); or the same pulse without detuning; or a square pulse of the same area. The lab frame turns the rotating-frame
   solution about z by ω_d t, ω_d = ω₀ − Δ, ω₀/2π = 5 GHz. Units: ns and rad/ns (Ω/2π is shown in MHz).
   Propagators are unit quaternions (w, v) meaning U = w − i v·σ. Read-only probe for the suite: window.PULSE_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, MINUS = '−';
  const W0 = TAU * 5, MHZ = TAU / 1000;          // ω₀ = 2π · 5 GHz and 2π · 1 MHz, both in rad/ns
  const TMIN = 0.4, TMAX = 40, AREA_MAX = TAU;

  /* ---------- envelope shapes on [0, T], peak 1 ---------- */
  /** erf by the series 2/√π e^(−x²) Σ (2x²)^n x / (2n + 1)!! (all terms positive: no cancellation for |x| ≤ 3). */
  function erf(x) {
    const a = Math.abs(x); if (a > 5.5) return Math.sign(x);
    let term = a, sum = a;
    for (let n = 1; n < 400 && term > 1e-18 * sum; n++) { term *= 2 * a * a / (2 * n + 1); sum += term; }
    return Math.sign(x) * 2 / Math.sqrt(PI) * Math.exp(-a * a) * sum;
  }
  const G0 = Math.exp(-4.5);                    // the Gaussian at its ends (σ = T/6), subtracted so that it starts and ends at 0
  const SHAPES = {
    square: { f: () => 1, cum: (t) => t },
    gauss: {
      f: (t, T) => { const s = T / 6; return (Math.exp(-((t - T / 2) ** 2) / (2 * s * s)) - G0) / (1 - G0); },
      cum: (t, T) => { const s = T / 6, k = Math.SQRT2 * s; return (Math.sqrt(PI / 2) * s * (erf((t - T / 2) / k) + erf(T / (2 * k))) - G0 * t) / (1 - G0); }
    }
  };
  const peakFor = (shape, T, area) => area / SHAPES[shape].cum(T, T);   // rad/ns

  /* ---------- SU(2) as unit quaternions ---------- */
  const qmul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + b[0] * a[1] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] + b[0] * a[2] + a[3] * b[1] - a[1] * b[3],
    a[0] * b[3] + b[0] * a[3] + a[1] * b[2] - a[2] * b[1]];
  /** exp(−(i/2) h g·σ): a turn by h|g| about g. */
  function qexp(g, h) {
    const n = Math.hypot(g[0], g[1], g[2]), a = n * h / 2;
    if (n < 1e-300) return [1, 0, 0, 0];
    const s = Math.sin(a) / n;
    return [Math.cos(a), s * g[0], s * g[1], s * g[2]];
  }
  /** The Bloch vector r turned by U = (w, v): r + 2w (v × r) + 2 v × (v × r). */
  function qrot(q, r) {
    const v = [q[1], q[2], q[3]], c1 = v3.cross(v, r), c2 = v3.cross(v, c1);
    return [r[0] + 2 * q[0] * c1[0] + 2 * c2[0], r[1] + 2 * q[0] * c1[1] + 2 * c2[1], r[2] + 2 * q[0] * c1[2] + 2 * c2[2]];
  }
  const rotZ = (r, a) => [r[0] * Math.cos(a) - r[1] * Math.sin(a), r[0] * Math.sin(a) + r[1] * Math.cos(a), r[2]];
  const qangle = (q) => 2 * Math.acos(clamp(q[0], -1, 1));             // in [0, 2π]

  /* ---------- state ---------- */
  const S = { shape: 'square', area: PI / 2, T: 25, phi: 0, det: 0, lam: 0, sign: 1, two: false, phi2: 90, frame: 'rot', r0: [0, 0, 1] };
  const nrm = (d) => { let x = ((d + 180) % 360 + 360) % 360 - 180; if (x === -180) x = 180; return x; };
  const total = () => S.T * (S.two ? 2 : 1);

  /** A program: pulses in time order (physical phases), the starting state and an instantaneous turn before them. */
  function build(kind) {
    const A = peakFor(S.shape, S.T, S.area), det = S.det * MHZ, shift = S.sign * S.lam;
    const phases = S.two ? [S.phi, S.phi2] : [S.phi];
    let shape = S.shape, amp = A, d = det, ph = phases.map((p) => p - shift), pre = 0;
    if (kind === 'two') ph = ph.slice().reverse();
    else if (kind === 'lam') { ph = phases.slice(); pre = S.lam; }
    else if (kind === 'det') d = 0;
    else if (kind === 'gauss') { shape = 'square'; amp = peakFor('square', S.T, S.area); }
    const N = Math.max(1200, Math.ceil(S.T * 120));
    return { pulses: ph.map((p, i) => ({ t0: i * S.T, T: S.T, shape, A: amp, phi: p * DEG, phiDeg: nrm(p), det: d, N })), pre, r0: S.r0.slice(), end: total() };
  }
  const ghostKind = () => (S.two ? 'two' : Math.abs(S.lam) > 1e-9 ? 'lam' : Math.abs(S.det) > 1e-9 ? 'det' : S.shape === 'gauss' ? 'gauss' : null);

  /** The propagator of one pulse from its start to local time τ. With Δ = 0 it is exact; otherwise slices in time order. */
  function pulseU(p, tau) {
    const sh = SHAPES[p.shape], c = Math.cos(p.phi), s = Math.sin(p.phi);
    if (p.det === 0) { const a = p.A * sh.cum(tau, p.T); return qexp([c, s, 0], a); }
    if (!p.grid) {                                       // cumulative propagators at the slice boundaries, computed once
      const h = p.T / p.N; p.grid = [[1, 0, 0, 0]];
      for (let k = 0; k < p.N; k++) {
        const m = p.A * (sh.cum((k + 1) * h, p.T) - sh.cum(k * h, p.T)) / h;
        p.grid.push(qmul(qexp([m * c, m * s, p.det], h), p.grid[k]));
      }
    }
    const h = p.T / p.N, k = clamp(Math.floor(tau / h + 1e-12), 0, p.N), rest = tau - k * h;
    if (rest <= 1e-12) return p.grid[k];
    const m = p.A * (sh.cum(tau, p.T) - sh.cum(k * h, p.T)) / rest;
    return qmul(qexp([m * c, m * s, p.det], rest), p.grid[k]);
  }
  /** Everything at time t of a program. */
  function evaluate(pr, t) {
    t = clamp(t, 0, pr.end);
    let q = qexp([0, 0, 1], pr.pre * DEG), area = 0, cur = null, tau = 0, segStart = null;
    for (const p of pr.pulses) {
      if (t >= p.t0 + p.T - 1e-12 && p !== pr.pulses[pr.pulses.length - 1]) { q = qmul(pulseU(p, p.T), q); area += p.A * SHAPES[p.shape].cum(p.T, p.T); continue; }
      if (t < p.t0) break;
      cur = p; tau = clamp(t - p.t0, 0, p.T); segStart = q;
      q = qmul(pulseU(p, tau), q); area += p.A * SHAPES[p.shape].cum(tau, p.T);
      break;
    }
    const r = qrot(q, pr.r0), om = cur ? cur.A * SHAPES[cur.shape].f(tau, cur.T) : 0;
    const g = cur ? [om * Math.cos(cur.phi), om * Math.sin(cur.phi), cur.det] : [0, 0, 0], gl = v3.len(g);
    return { t, q, r, area, cur, tau, om, axis: gl > 1e-12 ? v3.scale(g, 1 / gl) : null, rStart: segStart ? qrot(segStart, pr.r0) : null,
      wd: W0 - (pr.pulses[0] ? pr.pulses[0].det : 0) };
  }
  const labOf = (e) => rotZ(e.r, e.wd * e.t);
  let cache = { key: '', main: null, ghost: null, kind: null };
  function progs() {
    const key = JSON.stringify(S), kind = ghostKind();
    if (cache.key !== key) cache = { key, main: build('main'), ghost: kind ? build(kind) : null, kind };
    return cache;
  }
  /** Points of a program's path from 0 to t (rotating or lab frame). */
  function path(pr, t, lab) {
    const n = Math.max(2, Math.ceil(lab ? t * 120 : 220 * t / Math.max(pr.end, 1e-9))), pts = [];
    for (let i = 0; i <= n; i++) { const e = evaluate(pr, t * i / n); pts.push(lab ? labOf(e) : e.r); }
    return pts;
  }

  /* ---------- formatting ---------- */
  const fmtPi = (x) => `${fix(x / PI, 2)}π`;
  const fmtDeg = (d) => `${fix(nrm(d), 0)}°`;
  const AXES = { 0: 'X', 90: 'Y', 180: `${MINUS}X`, '-90': `${MINUS}Y` };
  /** X, Y, −X or −Y when the phase points along one of them, else null. */
  const axisName = (d) => { const x = nrm(d), k = Math.round(x); return Math.abs(x - k) < 1e-9 && AXES[String(k)] ? AXES[String(k)] : null; };
  const fmtNs = (t) => `${fix(t, t < 2 ? 2 : 1)} ns`;
  const shapeName = (s) => (s === 'gauss' ? L('高斯波', 'Gaussian') : L('方波', 'Square'));
  const face = (f) => (f === 'body' ? TRV.fonts.body : TRV.fonts.data);
  function text(ctx, str, x, y, color, o) {
    o = o || {};
    ctx.font = `${o.weight ? o.weight + ' ' : ''}${o.size || 11}px ${face(o.face)}`; ctx.textAlign = o.align || 'left'; ctx.textBaseline = o.base || 'middle';
    if (o.halo) { ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.strokeStyle = P.stage; ctx.strokeText(str, x, y); }
    ctx.fillStyle = color; ctx.fillText(str, x, y);
  }

  /* ---------- the stage: envelope on one side, the sphere on the other ---------- */
  let geo = { env: null };
  const drag = { mode: null, xMax: null, yMax: null };
  const stageOpts = {
    canvas: $('cv'), radius: 0.33, cx: 0.72, cy: 0.52,
    onChange: () => paint(),
    onPick: (ev, st) => {
      const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, E = geo.env;
      drag.mode = null;
      if (E) {
        if (Math.hypot(x - E.hAmp[0], y - E.hAmp[1]) < 14) drag.mode = 'amp';
        else if (Math.hypot(x - E.hWid[0], y - E.hWid[1]) < 14) drag.mode = 'width';
        else if (x >= E.left - 4 && x <= E.right + 4 && y >= E.top - 4 && y <= E.bottom + 4) drag.mode = 'scrub';
      }
      if (!drag.mode && st.near(ev, S.r0) < 22) drag.mode = 'r0';
      if (drag.mode === 'amp' || drag.mode === 'width') { drag.xMax = E.xMax; drag.yMax = E.yMax; }
      return !!drag.mode;
    },
    onDrag: (ev, st) => {
      const b = $('cv').getBoundingClientRect(), x = ev.clientX - b.left, y = ev.clientY - b.top, E = geo.env;
      if (drag.mode === 'r0') { S.r0 = v3.unit(st.pick(ev)); touched(); return; }
      if (!E) return;
      if (drag.mode === 'scrub') { clock.pause(); clock.set(clamp(E.invX(x), 0, clock.max)); cards.mark(null); return; }
      if (drag.mode === 'amp') {
        const mhz = Math.max(0, E.invY(y)), sh = SHAPES[S.shape];
        S.area = clamp(mhz * MHZ * sh.cum(S.T, S.T), 0, AREA_MAX); fArea.set(fix(S.area / PI, 2)); touched();
      } else if (drag.mode === 'width') {
        const A = peakFor(S.shape, S.T, S.area), T = Math.round(clamp(E.invX(x), TMIN, TMAX) * 10) / 10;
        S.T = T; S.area = clamp(A * SHAPES[S.shape].cum(T, T), 0, AREA_MAX); fArea.set(fix(S.area / PI, 2)); fDur.set(T);
        fitRail(); touched();
      }
    },
    onDrop: () => { drag.mode = null; drag.xMax = drag.yMax = null; paint(); }
  };
  const stage = kit.stage3($('stage'), stageOpts);

  function layout(W, H) {
    const thumb = TRV.thumbMode, st = $('stage').getBoundingClientRect(), below = (el) => (el ? el.getBoundingClientRect().bottom - st.top : 0);
    const top = thumb ? 18 : Math.max(46, below($('hudBig').parentElement)) + 10, legH = thumb ? 18 : $('legend').offsetHeight + 20;
    const wide = W >= 1.15 * H && W >= 520;
    if (wide) {
      const ew = W * (thumb ? 0.47 : 0.48), sx0 = ew + 8, sx1 = W - 12, sy0 = thumb ? 16 : Math.max(top - 10, below($('frameChips')) + 4), sy1 = H - legH;
      const R = Math.max(40, Math.min((sx1 - sx0) / 2 - 40, (sy1 - sy0) / 2 - 22));
      return { wide, env: { x: 12, y: top, w: ew - 12, h: H - top - legH }, cx: (sx0 + sx1) / 2, cy: (sy0 + sy1) / 2, R };
    }
    const envH = clamp(0.36 * (H - top - legH), 110, 190), env = { x: 8, y: H - legH - envH, w: W - 16, h: envH };
    const sy0 = top, sy1 = env.y - 6, R = Math.max(36, Math.min(W / 2 - 46, (sy1 - sy0) / 2 - 20));
    return { wide, env, cx: W / 2, cy: (sy0 + sy1) / 2, R };
  }

  /** The trail of the axis tip of a detuned pulse up to now, and its point closest to the equator. */
  function swayOf(now) {
    const p = now.cur, sh = SHAPES[p.shape], pts = [], m = 80;
    let low = null, minTilt = 90;
    for (let i = 0; i <= m; i++) {
      const om = p.A * sh.f(now.tau * i / m, p.T), u = v3.unit([om * Math.cos(p.phi), om * Math.sin(p.phi), p.det]), tilt = Math.asin(clamp(Math.abs(u[2]), 0, 1)) / DEG;
      pts.push(v3.scale(u, 1.18));
      if (!low || tilt < minTilt) { minTilt = tilt; low = pts[i]; }
    }
    return { pts, low, minTilt };
  }
  /** The great-circle arc (just outside the sphere) from b to a, and the angle between them. */
  function missOf(a, b) {
    const deg = Math.acos(clamp(v3.dot(a, b), -1, 1)) / DEG, arc = [], m = 24, ax = v3.cross(b, a), n = v3.len(ax);
    if (n < 1e-9) return { deg, arc: [], mid: a };
    for (let i = 0; i <= m; i++) arc.push(v3.scale(v3.rot(b, v3.scale(ax, 1 / n), deg * DEG * i / m), 1.02));
    return { deg, arc, mid: arc[m / 2] };
  }

  function drawSphere(now, ghostNow, C) {
    const st = stage, lab = S.frame === 'lab', thick = TRV.thumbMode ? 1.5 : 1;
    st.sphere(1, { lat: [0], lon: 2, shade: 0.05, alpha: TRV.thumbMode ? 0.7 : 0.45 });
    st.line([0, 0, -1.2], [0, 0, 1.2], { color: P.faint, width: 1, alpha: 0.8, back: 0.5 });
    st.line([-1.15, 0, 0], [1.15, 0, 0], { color: P.faint, width: 1, alpha: 0.45, back: 0.5 });
    st.line([0, -1.15, 0], [0, 1.15, 0], { color: P.faint, width: 1, alpha: 0.45, back: 0.5 });
    st.tag('k0', [0, 0, 1.13], '|0⟩', 'num', { dx: -24 }); st.tag('k1', [0, 0, -1.13], '|1⟩', 'num', { dx: -24 });
    st.tag('kx', [1.2, 0, 0], 'x', 'num', { dy: 16 }); st.tag('ky', [0, 1.2, 0], 'y', 'num', { dy: 16 });   // below the axis ends, clear of ψ
    const cur = lab ? labOf(now) : now.r;
    // the axis: in the rotating frame the generator of this instant; in the lab frame the carrier's own axis z
    let axis = null, axisTag = '';
    if (lab) { axis = [0, 0, 1]; axisTag = L('载频的轴 z', 'carrier axis z'); }
    else if (now.axis) { axis = now.axis; const pd = now.cur.phiDeg, nm = axisName(pd); axisTag = Math.abs(now.axis[2]) > 1e-6 ? L(`转轴倾出赤道 ${fix(Math.asin(clamp(now.axis[2], -1, 1)) / DEG, 0)}°`, `axis tilted ${fix(Math.asin(clamp(now.axis[2], -1, 1)) / DEG, 0)}° off the equator`) : `${nm ? nm + ' · ' : ''}φ ${fmtDeg(pd)}`; }
    // detuned: the axis sways with the envelope (vertical where Ω → 0 at both ends), so the trail of its tip is what
    // carries the story; the axis of this instant is drawn faint and the label marks the trail's lowest point
    const sway = !lab && now.cur && now.cur.det !== 0 ? swayOf(now) : null;
    if (sway) {
      st.path(sway.pts, { color: P.violet, width: 2.2 * thick, alpha: 0.95, dash: [5, 3], back: 0.45 });
      st.dot(sway.low, 3.5, P.violet, { fade: false });
      if (!TRV.thumbMode) st.tag('axis', sway.low, L(`轴端最低处倾出赤道 ${fix(sway.minTilt, 0)}°`, `lowest tip: ${fix(sway.minTilt, 0)}° off the equator`), 'raw c-vi', { dx: -40, dy: 30 });
    }
    if (axis) {
      const c = st.ctx; c.save(); if (!sway) { c.shadowColor = P.violet; c.shadowBlur = 8; }
      st.line(v3.scale(axis, -1.18), v3.scale(axis, 1.18), sway ? { color: P.violet, width: 1.2, alpha: 0.45, back: 0.4 } : { color: P.violet, width: 2.2 * thick, alpha: 0.95, back: 0.55 }); c.restore();
      if (!sway) {
        st.dot(v3.scale(axis, 1.18), 3.5, P.violet, { fade: false });
        // near the vertical, the label goes to the lower end so that it does not sit on |0⟩ and ψ
        const low = axis[2] > 0.5, tip = v3.scale(axis, low ? -1.18 : 1.18);
        if (!TRV.thumbMode) st.tag('axis', tip, axisTag, 'raw c-vi', { dx: low ? 120 : 0, dy: -14 });
      }
    }
    // the angle turned in this pulse: a magenta sector about the axis (rotating frame, fixed axis only)
    if (!lab && now.cur && now.cur.det === 0 && now.axis && now.rStart) {
      const n = now.axis, a0 = now.rStart, c0 = v3.scale(n, v3.dot(a0, n)), u = v3.sub(a0, c0), rad = v3.len(u);
      const ang = now.cur.A * SHAPES[now.cur.shape].cum(now.tau, now.cur.T);
      if (rad > 0.02 && ang > 1e-4) {
        const pts = [c0], m = Math.max(6, Math.ceil(ang / 0.05));
        for (let i = 0; i <= m; i++) pts.push(v3.add(c0, v3.rot(u, n, ang * i / m)));
        st.poly(pts, { fill: P.magenta, alpha: 0.2 });
        st.path(pts.slice(1), { color: P.magenta, width: 2.4 * thick, alpha: 0.95, back: 0.5 });
        st.line(c0, a0, { color: P.magenta, width: 1, alpha: 0.6, back: 0.4 }); st.line(c0, pts[pts.length - 1], { color: P.magenta, width: 1, alpha: 0.6, back: 0.4 });
      }
    }
    // the compared path, dashed
    if (C.ghost) {
      if (C.kind === 'lam') {                          // the literal circuit: an instantaneous turn by λ about z first
        const pts = [], m = 40; for (let i = 0; i <= m; i++) pts.push(rotZ(S.r0, S.lam * DEG * i / m));
        st.path(pts, { color: P.ink, width: 1.4, alpha: 0.7, dash: [5, 4], back: 0.35 });
      }
      st.path(path(C.ghost, now.t, lab), { color: P.ink, width: 1.5, alpha: 0.75, dash: [5, 4], back: 0.35 });
      const gp = lab ? labOf(ghostNow) : ghostNow.r;
      st.dot(gp, 5.5, P.ink, { ring: true, width: 2, fade: false });
      st.dot([0, 0, gp[2]], 4, P.cyan, { ring: true, width: 1.6, fade: false });
      // detuned: the miss itself, a short great-circle arc from the white ring to the amber state, with its angle
      const miss = C.kind === 'det' ? missOf(cur, gp) : null;
      if (miss && miss.deg > 1) {
        st.path(miss.arc, { color: P.ink, width: 2 * thick, alpha: 0.95, back: 0.5 });
        if (!TRV.thumbMode) st.tag('miss', miss.mid, L(`差 ${fix(miss.deg, 1)}°`, `off by ${fix(miss.deg, 1)}°`), 'raw ink', { dx: -34, dy: 14 });
      }
    }
    // the path travelled, the starting ring, the shadow on z, the current state
    if (now.t > 1e-9) st.path(path(C.main, now.t, lab), { color: P.ink, width: 1.6 * thick, alpha: 0.85, back: 0.35 });
    st.dot(S.r0, 6.5, P.amber, { ring: true, width: 2, alpha: 0.85 });
    if (Math.abs(S.lam) > 1e-9) st.circle([0, 0, cur[2]], [0, 0, 1], Math.sqrt(Math.max(0, 1 - cur[2] ** 2)), { color: P.cyan, width: 1, alpha: 0.55, dash: [2, 4], back: 0.3 });
    st.line([0, 0, 0], [0, 0, cur[2]], { color: P.cyan, width: 4 * thick, alpha: 0.9, back: 0.8 });
    st.line(cur, [0, 0, cur[2]], { color: P.cyan, width: 1, alpha: 0.6, dash: [3, 3], back: 0.4 });
    st.dot([0, 0, cur[2]], 3.5, P.cyan, { fade: false });
    if (lab) for (const pole of [[0, 0, 1], [0, 0, -1]]) st.dot(rotZ(qrot(now.q, pole), now.wd * now.t), 4.5, P.ink, { fade: false });   // the two poles, evolved too
    st.arrow([0, 0, 0], cur, { color: P.amber, width: 2.8, glow: 12, headSize: 11, fade: false });
    st.dot(cur, 5, P.amber, { glow: 14, fade: false });
    if (!TRV.thumbMode) {
      const pc = st.p(cur), o = st.p([0, 0, 0]), dx = pc[0] - o[0], dy = pc[1] - o[1], dl = Math.hypot(dx, dy) || 1;
      st.tag('psi', cur, 'ψ', 'num c-am big', { dx: 18 * dx / dl + 10, dy: 18 * dy / dl });
    }
  }

  function drawEnvelope(box, now, C) {
    const thumb = TRV.thumbMode, lab = S.frame === 'lab', pr = C.main, end = pr.end;
    const A = pr.pulses[0] ? pr.pulses[0].A : 0, peakMHz = A / MHZ, ghostPeak = C.kind === 'gauss' ? C.ghost.pulses[0].A / MHZ : 0;
    const piPeak = peakFor(S.shape, S.T, PI) / MHZ;
    const noDrive = pr.pulses.every((p) => p.A === 0);
    const yMax = drag.yMax || (noDrive ? 10 : Math.max(5, Math.min(piPeak * 1.25, 400), peakMHz * 1.15, ghostPeak * 1.15));
    const xMax = drag.xMax || end;
    const W = $('cv').clientWidth, H = $('cv').clientHeight, padL = thumb ? 12 : 44, padT = thumb ? 10 : 30, padB = thumb ? 10 : 22;
    const g = kit.plot($('cv'), { clear: false, x: [0, xMax], y: [lab ? -yMax : 0, yMax], pad: [box.x + padL, W - box.x - box.w + 8, box.y + padT, H - box.y - box.h + padB] });
    const ctx = g.ctx, lw = thumb ? 2 : 1;
    if (!thumb) {
      const yt = yMax > 60 ? [0, 50, 100, 150, 200, 300].filter((v) => v <= yMax) : yMax > 24 ? [0, 10, 20, 30, 40, 50].filter((v) => v <= yMax) : [0, 5, 10, 15, 20].filter((v) => v <= yMax);
      const xt = [0, S.T].concat(S.two ? [2 * S.T] : []).filter((v) => v <= xMax + 1e-9);
      g.axes({ yTicks: lab ? yt.concat(yt.filter((v) => v > 0).map((v) => [-v, MINUS + v])) : yt, xTicks: xt.map((v) => [v, fix(v, v < 2 ? 1 : 0)]), xLabel: 'ns', yLabel: L('Ω/2π · MHz', 'Ω/2π · MHz') });
    } else { ctx.strokeStyle = P.lineHot; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(g.X(0), g.Y(0)); ctx.lineTo(g.X(xMax), g.Y(0)); ctx.stroke(); }
    const env = (p, n) => { const pts = []; for (let i = 0; i <= n; i++) { const tau = p.T * i / n; pts.push([p.t0 + tau, p.A * SHAPES[p.shape].f(tau, p.T) / MHZ]); } return pts; };
    // the compared square pulse of the same area
    if (C.kind === 'gauss') for (const p of C.ghost.pulses) g.line([[p.t0, 0], [p.t0, p.A / MHZ], [p.t0 + p.T, p.A / MHZ], [p.t0 + p.T, 0]], P.ink, { width: 1.4 * lw, dash: [5, 4], alpha: 0.75 });
    for (const p of pr.pulses) {
      const n = p.shape === 'square' ? 2 : 160, pts = env(p, n), cut = clamp(now.t - p.t0, 0, p.T);
      const sq = p.shape === 'square' ? [[p.t0, 0], ...pts, [p.t0 + p.T, 0]] : pts;
      g.area(pts, P.magenta, { alpha: 0.1, base: 0 });
      if (cut > 0) { const sw = []; for (let i = 0; i <= 120; i++) { const tau = cut * i / 120; sw.push([p.t0 + tau, p.A * SHAPES[p.shape].f(tau, p.T) / MHZ]); } g.area(sw, P.magenta, { alpha: 0.5, base: 0 }); }
      if (lab && p.A > 0) {                            // the drive itself, Ω(t) cos(ω_d t + φ): a carrier inside the envelope
        const cyc = p.T * (W0 - p.det) / TAU, pxPerCycle = (g.X(p.t0 + p.T) - g.X(p.t0)) / Math.max(cyc, 1e-9);
        if (pxPerCycle >= 5) { const w = [], m = Math.ceil(cyc * 24); for (let i = 0; i <= m; i++) { const tau = p.T * i / m, t = p.t0 + tau; w.push([t, p.A * SHAPES[p.shape].f(tau, p.T) / MHZ * Math.cos((W0 - p.det) * t + p.phi)]); } g.line(w, P.ink, { width: 1, alpha: 0.5 }); }
        else g.poly(pts.concat(pts.slice().reverse().map(([t, y]) => [t, -y])), P.ink, { alpha: 0.18 });
        g.line(pts.map(([t, y]) => [t, -y]), P.ink, { width: 1 * lw, alpha: 0.5 });
      }
      g.line(sq, P.ink, { width: 2 * lw });
      if (!thumb && p.A > 0) {
        const nm = axisName(p.phiDeg), lab1 = `${nm ? nm + ' · ' : ''}φ ${fmtDeg(p.phiDeg)}`;
        text(ctx, lab1, g.X(p.t0 + p.T / 2), g.pt - 10, P.violet, { align: 'center', size: 11 });
        const yA = Math.min(p.A / MHZ * 0.45, yMax * 0.5);
        if (p.A > 0 && g.X(p.t0 + p.T) - g.X(p.t0) > 40) text(ctx, fmtPi(p.A * SHAPES[p.shape].cum(p.T, p.T)), g.X(p.t0 + p.T / 2), g.Y(yA), P.magenta, { align: 'center', size: 12, weight: 600, halo: true });
      }
    }
    if (lab && !thumb) {                               // the carrier reference cos ω₀t, where it can be resolved
      const cyc = end * W0 / TAU, px = (g.X(end) - g.X(0)) / cyc;
      if (px >= 5) { const w = [], m = Math.ceil(cyc * 32); for (let i = 0; i <= m; i++) { const t = end * i / m; w.push([t, yMax * 0.3 * Math.cos(W0 * t)]); } g.line(w, P.dim, { width: 1, dash: [3, 3] }); }
      if (noDrive) text(ctx, L('没有驱动：Ω = 0 · 虚线是载频参考 cos ω₀t', 'no drive: Ω = 0 · dashed: the carrier reference cos ω₀t'), g.X(xMax / 2), g.Y(-yMax * 0.75), P.dim, { align: 'center', size: 11, face: 'body', halo: true });
      else if (px < 5) text(ctx, L(`包络里有 ${fix(S.T * (W0 - S.det * MHZ) / TAU, 0)} 个载频周期`, `${fix(S.T * (W0 - S.det * MHZ) / TAU, 0)} carrier cycles inside the envelope`), g.X(xMax / 2), g.Y(-yMax * 0.8), P.dim, { align: 'center', size: 10.5, face: 'body', halo: true });
    }
    if (Math.abs(S.lam) > 1e-9 && !thumb) {            // the virtual Z: a mark of zero width
      const x = g.X(0) + 0.5; ctx.strokeStyle = P.violet; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); ctx.beginPath(); ctx.moveTo(x, g.pt - 2); ctx.lineTo(x, g.pt + g.ih); ctx.stroke(); ctx.setLineDash([]);
      text(ctx, `Z(${fmtDeg(S.lam)}) · 0 ns`, x + 6, g.pt + g.ih * 0.28, P.violet, { size: 11, weight: 600, halo: true });
    }
    // the reading head and the handles
    const hx = g.X(clamp(now.t, 0, xMax)); ctx.strokeStyle = P.amber; ctx.lineWidth = 2 * lw; ctx.shadowColor = P.amber; ctx.shadowBlur = 8; ctx.beginPath(); ctx.moveTo(hx, g.pt); ctx.lineTo(hx, g.pt + g.ih); ctx.stroke(); ctx.shadowBlur = 0;
    const p1 = pr.pulses[0], hAmp = [g.X(p1.t0 + p1.T / 2), g.Y(p1.A / MHZ)], hWid = [g.X(p1.t0 + p1.T), g.Y(0) - 11];
    if (!TRV.still) {
      ctx.fillStyle = P.stage; ctx.strokeStyle = P.ink; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.rect(hAmp[0] - 5, hAmp[1] - 5, 10, 10); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hWid[0], hWid[1] - 7); ctx.lineTo(hWid[0] + 6, hWid[1]); ctx.lineTo(hWid[0], hWid[1] + 7); ctx.lineTo(hWid[0] - 6, hWid[1]); ctx.closePath(); ctx.fill(); ctx.stroke();
    }
    geo.env = { left: g.pl, right: g.pl + g.iw, top: g.pt, bottom: g.pt + g.ih, invX: g.invX, invY: g.invY, X: g.X, Y: g.Y, hAmp, hWid, xMax, yMax };
  }

  function drawStage(now, C) {
    const ghostNow = C.ghost ? evaluate(C.ghost, clock.t) : null;
    const cv = $('cv'), W = cv.clientWidth, H = cv.clientHeight, lay = layout(W, H), m = Math.min(W, H) || 1;
    stageOpts.cx = lay.cx / W; stageOpts.cy = lay.cy / H; stageOpts.radius = lay.R / m;
    stage.begin(); drawSphere(now, ghostNow, C); stage.end();
    drawEnvelope(lay.env, now, C);
  }

  /* ---------- the strip ---------- */
  function sample(pr, n) { const out = []; for (let i = 0; i <= n; i++) out.push(evaluate(pr, pr.end * i / n)); return out; }
  function drawStrip(C) {
    if (TRV.still || TRV.figure) return;
    const end = C.main.end, ms = sample(C.main, 200);
    const top = Math.max(0.25, ...ms.map((e) => Math.max(e.area, qangle(e.q)) / PI)) * 1.12;
    const g = kit.plot($('angPlot'), { x: [0, end], y: [0, top], pad: [34, 10, 8, 22] });
    g.axes({ yTicks: [0, 0.5, 1, 1.5, 2].filter((v) => v <= top).map((v) => [v, v ? `${v}π` : '0']), xTicks: [0, end].map((v) => [v, fix(v, v < 2 ? 1 : 0)]), xLabel: 'ns' });
    g.line(ms.map((e) => [e.t, e.area / PI]), P.magenta, { width: 2.2 });
    g.line(ms.map((e) => [e.t, qangle(e.q) / PI]), P.ink, { width: 1.5, dash: [5, 4] });
    g.vline(clock.t, P.amber);
    g.legend([[P.magenta, L('扫过的面积', 'area swept')], [P.ink, L('传播子的转角', 'angle of the propagator'), 'dash']], { right: false });
    const e = evaluate(C.main, clock.t);
    $('angMeta').textContent = `${fmtPi(e.area)} · ${fmtPi(qangle(e.q))}`;
    const g2 = kit.plot($('p0Plot'), { x: [0, end], y: [0, 1.05], pad: [34, 10, 8, 22] });
    g2.axes({ yTicks: [0, 0.5, 1], xTicks: [0, end].map((v) => [v, fix(v, v < 2 ? 1 : 0)]), xLabel: 'ns' });
    if (C.ghost) g2.line(sample(C.ghost, 200).map((x) => [x.t, (1 + x.r[2]) / 2]), P.ink, { width: 1.5, dash: [5, 4] });
    g2.line(ms.map((x) => [x.t, (1 + x.r[2]) / 2]), P.cyan, { width: 2.2 });
    g2.vline(clock.t, P.amber);
    $('p0Meta').textContent = `P(0) ${fix((1 + e.r[2]) / 2, 3)}` + (C.ghost ? ` · ${L('虚线', 'dashed')} ${fix((1 + evaluate(C.ghost, clock.t).r[2]) / 2, 3)}` : '');
  }

  /* ---------- words ---------- */
  const GHOST_WORDS = {
    two: ['虚线：两个脉冲换序', 'dashed: the two pulses swapped'],
    lam: ['虚线：先真转 Z(λ)，再按 φ 发脉冲', 'dashed: a real Z(λ) first, then the pulse at φ'],
    det: ['虚线：同一个脉冲，不失谐', 'dashed: the same pulse, no detuning'],
    gauss: ['虚线：同面积的方波', 'dashed: a square pulse of the same area']
  };
  function drawText(now, C) {
    const pr = C.main, end = pr.end, area = pr.pulses.reduce((s, p) => s + p.A * SHAPES[p.shape].cum(p.T, p.T), 0), ang = qangle(now.q), P0 = (1 + now.r[2]) / 2;
    const leg = [['mg box', '包络下的面积 = 转过的角', 'area under the envelope = angle turned'], ['vi', '转轴', 'the axis'], ['am', '当前的态', 'the current state'], ['cy', '在 Z 轴上的影子：P(0)', 'shadow on the Z axis: P(0)']];
    if (C.kind) leg.push(['dash', GHOST_WORDS[C.kind][0], GHOST_WORDS[C.kind][1]]);
    const html = leg.map(([cl, zh, en]) => `<span><i class="sw ${cl}"></i>${L(zh, en)}</span>`).join('');
    if ($('legend')._h !== html) { $('legend').innerHTML = html; $('legend')._h = html; }
    const noDrive = area < 1e-12;
    $('hudBig').textContent = noDrive ? L('没有驱动', 'No drive') : `${S.two ? '2 × ' : ''}${shapeName(S.shape)} · ${S.two ? '2 × ' : ''}${fmtPi(S.area)}`;
    let sub = `t = ${fmtNs(now.t)} / ${fmtNs(end)}`;
    if (noDrive) sub += S.frame === 'lab' ? L(` · 赤道上的态转了 ${fix(now.t * W0 / TAU, 2)} 圈`, ` · the equator has turned ${fix(now.t * W0 / TAU, 2)} times`) : L(' · 旋转系里一动不动', ' · nothing moves in the rotating frame');
    else if (S.det !== 0) sub += L(` · 面积 ${fmtPi(now.area)}，转角 ${fmtPi(ang)}`, ` · area ${fmtPi(now.area)}, angle ${fmtPi(ang)}`);
    else sub += L(` · 扫过面积 ${fmtPi(now.area)} = 转过 ${fix(now.area / DEG, 1)}°`, ` · area swept ${fmtPi(now.area)} = ${fix(now.area / DEG, 1)}° turned`);
    if (Math.abs(S.lam) > 1e-9) sub += L(` · Z(${fmtDeg(S.lam)}) 用时 0 ns`, ` · Z(${fmtDeg(S.lam)}) takes 0 ns`);
    $('hudSub').textContent = sub;
    $('roArea').innerHTML = `<span class="c-mg">${fmtPi(now.area)}</span> · ${fmtPi(ang)}`;
    $('roAreaSub').textContent = S.det !== 0 || S.two || Math.abs(S.lam) > 1e-9 ? L(` · 全程面积 ${fmtPi(area)}`, ` · whole area ${fmtPi(area)}`) : L(` · 全程 ${fmtPi(area)}，转角跟着面积走`, ` · whole ${fmtPi(area)}; the angle follows the area`);
    $('roP0').textContent = `${fix(P0, 4)}` + (C.ghost ? ` · ${L('虚线', 'dashed')} ${fix((1 + evaluate(C.ghost, now.t).r[2]) / 2, 4)}` : '');
    $('roAxis').textContent = S.frame === 'lab' ? L('z（载频）', 'z (carrier)') : now.axis ? `(${now.axis.map((x) => fix(x, 2)).join(', ')})` : L('无（不转）', 'none (no turn)');
    $('roFrame').textContent = `${fmtDeg(S.lam)} · ${pr.pulses.map((p) => fmtDeg(p.phiDeg)).join(' , ')}`;
    $('roTime').textContent = `${fmtNs(end)}` + (Math.abs(S.lam) > 1e-9 ? L(' · 其中 Z：0 ns', ' · of which Z: 0 ns') : '');
    $('roAside').textContent = S.frame === 'lab' ? L('实验室系', 'lab frame') : L('旋转系', 'rotating frame');
    let note;
    if (noDrive) note = L('没有驱动时，旋转系里什么都不动；实验室系里赤道上的态绕 z 轴每 0.2 ns 转一圈，两极（白点）不动。', 'With no drive nothing moves in the rotating frame; in the lab frame a state on the equator goes round z every 0.2 ns, and the poles (white dots) stay put.');
    else if (C.kind === 'lam') note = S.sign > 0 ? L(`实线与虚线终点高度相同：P(0) 一样，只差绕 z 的 ${fmtDeg(S.lam)}。`, `The solid and dashed ends have the same height: the same P(0), only ${fmtDeg(S.lam)} apart about z.`) : L('相位改错了符号：实线的终点高度与虚线不同，读数变了。', 'The phase shift has the wrong sign: the solid end sits at another height, and the readout changes.');
    else if (C.kind === 'two') note = L('两个同面积的脉冲，换个次序，终点不同：绕不同轴的转动不对易。', 'Two pulses of the same area end elsewhere when swapped: turns about different axes do not commute.');
    else if (C.kind === 'det') note = L(`失谐时转轴随包络晃动：面积还是 ${fmtPi(area)}，终点离虚线 ${fix(Math.acos(clamp(v3.dot(evaluate(pr, end).r, evaluate(C.ghost, end).r), -1, 1)) / DEG, 1)}°。`, `Detuned, the axis sways with the envelope: the area is still ${fmtPi(area)}, yet the end lies ${fix(Math.acos(clamp(v3.dot(evaluate(pr, end).r, evaluate(C.ghost, end).r), -1, 1)) / DEG, 1)}° from the dashed one.`);
    else note = L(`面积 ${fmtPi(area)} 转 ${fix(area / DEG, 1)}°；包络的形状不改变终点。`, `An area of ${fmtPi(area)} turns ${fix(area / DEG, 1)}°; the shape of the envelope does not change the end point.`);
    $('roNote').textContent = note;
    $('pillArea').querySelector('strong').textContent = fmtPi(now.area);
    $('pillTime').querySelector('strong').textContent = fmtNs(end);
    $('pillP0').querySelector('strong').textContent = fix(P0, 3);
    $('phase2Field').classList.toggle('off', !S.two); $('phase2').disabled = !S.two; $('swap').disabled = !S.two;
    $('signChips').classList.toggle('off', Math.abs(S.lam) < 1e-9);
  }

  // the words first: the stage leaves room for the legend and the title they fill
  const paint = kit.painter(() => { const C = progs(), now = evaluate(C.main, clock.t); drawText(now, C); drawStage(now, C); drawStrip(C); }, [$('stage'), $('angPlot'), $('p0Plot')]);

  /* ---------- controls ---------- */
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 25, rate: 25 / 4, step: 25 / 8,
    format: (t, max) => `t ${fix(t, max < 2 ? 3 : 1)} <small>/ ${fix(max, max < 2 ? 1 : 0)} ns</small>`,
    onChange: () => paint()
  });
  function fitRail() { const m = total(); clock.setMax(m, true); clock.rate = m / 4; clock.step = m / 8; clock.set(Math.min(clock.t, m)); }
  function touched() { cards.mark(null); paint(); }
  const fArea = kit.field($('area'), { fmt: (v) => `${fix(v, 2)}π`, onInput: (v) => { S.area = v * PI; touched(); } });
  const fDur = kit.field($('dur'), { fmt: (v) => `${fix(v, 1)} ns`, onInput: (v) => { S.T = v; fitRail(); touched(); } });
  const fPhase = kit.field($('phase'), { fmt: (v) => fmtDeg(v), onInput: (v) => { S.phi = v; touched(); } });
  const fDet = kit.field($('det'), { fmt: (v) => `${fix(v, 1)} MHz`, onInput: (v) => { S.det = v; touched(); } });
  const fLam = kit.field($('lam'), { fmt: (v) => fmtDeg(v), onInput: (v) => { S.lam = v; touched(); } });
  const fPhase2 = kit.field($('phase2'), { fmt: (v) => fmtDeg(v), onInput: (v) => { S.phi2 = v; touched(); } });
  const shapeChips = kit.chips($('shapeChips'), 'shape', (v) => { S.shape = v; touched(); });
  const signChips = kit.chips($('signChips'), 'sign', (v) => { S.sign = Number(v); touched(); });
  const twoChips = kit.chips($('twoChips'), 'two', (v) => { S.two = v === '1'; fitRail(); touched(); });
  const frameChips = kit.chips($('frameChips'), 'frame', (v) => { S.frame = v; touched(); });
  $('swap').addEventListener('click', () => { const a = S.phi; S.phi = S.phi2; S.phi2 = a; fPhase.set(S.phi); fPhase2.set(S.phi2); touched(); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });
  kit.keys({ f: () => frameChips.set(S.frame === 'lab' ? 'rot' : 'lab') });

  /* ---------- experiment cards ---------- */
  const BASE = { shape: 'square', area: PI / 2, T: 25, phi: 0, det: 0, lam: 0, sign: 1, two: false, phi2: 90, frame: 'rot', r0: [0, 0] };
  const PRESETS = {
    carrier: { area: 0, T: 0.4, frame: 'lab', r0: [90, 0], still: 0.3 },
    quarter: { still: 25 },
    gauss: { shape: 'gauss', still: 25 },
    detune: { shape: 'gauss', det: 5, still: 25 },
    order: { two: true, phi: 0, phi2: 90, still: 50 },
    vz: { lam: 90, r0: [90, 0], still: 25 },
    sign: { lam: 90, sign: -1, r0: [90, 0], still: 25 }
  };
  const NOTES = {
    carrier: ['实验室系，没有驱动：琥珀色的态从 |+⟩ 出发，绕紫色的 z 轴每 0.2 ns 转一圈，0.4 ns 里转两圈；北极与南极的两个白点一动不动。左边的虚线是载频参考 cos ω₀t，也走了两个周期。', 'Lab frame, no drive: the amber state starts at |+⟩ and goes round the violet z axis once every 0.2 ns, twice in 0.4 ns, while the two white dots at the north and south poles do not move. The dashed line on the left is the carrier reference cos ω₀t, which also runs through two cycles.'],
    quarter: ['方波，10 MHz，25 ns：左边品红的面积是 π/2。右边琥珀色的态从北极出发，绕紫色的 X 轴转过同样大小的品红扇形，停在赤道上，P(0) = 1/2。', 'A square pulse, 10 MHz for 25 ns: the magenta area on the left is π/2. On the right the amber state leaves the north pole and turns about the violet X axis through a magenta sector of the same size, stopping on the equator: P(0) = 1/2.'],
    gauss: ['高斯包络，面积同样是 π/2：中间高、两头低，所以琥珀色的态先慢、后快、再慢，而虚线的方波匀速走；两者在 25 ns 停在同一点。', 'A Gaussian envelope with the same area π/2: tall in the middle and low at the ends, so the amber state moves slowly, then fast, then slowly, while the dashed square pulse moves evenly; at 25 ns both stop at the same point.'],
    detune: ['同一个高斯包络（面积 π/2），但驱动频率偏了 5 MHz：紫色的转轴倾出赤道并随包络晃动，紫色虚线是轴端走过的路，在包络峰值处离赤道最近（12°），脉冲结束时转轴回到竖直。琥珀色的态没有停在虚线（不失谐）的终点上，两点之间的白色短弧标出差了约 26°。', 'The same Gaussian envelope (area π/2), but the drive is 5 MHz off: the violet axis tilts out of the equator and sways with the envelope. The dashed violet trail is where its tip has been, closest to the equator (12°) at the envelope\'s peak; when the pulse ends the axis is vertical again. The amber state does not stop at the end of the dashed (undetuned) path; the short white arc between the two marks the miss, about 26°.'],
    order: ['两个面积 π/2 的方波，先绕 X、再绕 Y：北极走到 −y。虚线是先 Y 后 X：走到 +x。同样的两个脉冲，次序一换，终点就不同。', 'Two square pulses of area π/2, first about X, then about Y: the north pole goes to −y. The dashed path is Y first, then X: it goes to +x. The same two pulses in the other order end elsewhere.'],
    vz: ['从 |+⟩ 出发，电路是先 Z(90°)、再 X(π/2)。硬件不发 Z 脉冲（左边的竖线宽 0 ns），只把脉冲相位改成 φ − λ = −90°（−Y）：实线绕 −Y 转到北极。虚线照字面先绕竖轴转 90° 到 +y，再绕 X 转到北极。两者都在北极，P(0) = 1。', 'From |+⟩ the circuit is Z(90°), then X(π/2). The hardware sends no Z pulse (the mark on the left is 0 ns wide), only shifts the pulse to phase φ − λ = −90° (−Y): the solid path turns about −Y to the north pole. The dashed path takes the circuit literally: 90° about the vertical axis to +y, then about X to the north pole. Both end at the north pole: P(0) = 1.'],
    sign: ['同一个电路，相位却改成了 φ + λ = +90°（+Y）：实线绕 +Y 转到南极，P(0) = 0；虚线（电路本来的意思）仍在北极。补偿的符号必须是 φ − λ。', 'The same circuit, but the phase shifted to φ + λ = +90° (+Y): the solid path turns about +Y to the south pole, P(0) = 0, while the dashed path (what the circuit means) still ends at the north pole. The shift must be φ − λ.']
  };
  let booting = true;
  function applyPreset(id) {
    const p = Object.assign({}, BASE, PRESETS[id]);
    clock.pause();
    Object.assign(S, { shape: p.shape, area: p.area, T: p.T, phi: p.phi, det: p.det, lam: p.lam, sign: p.sign, two: p.two, phi2: p.phi2, frame: p.frame, r0: v3.sph(p.r0[0] * DEG, p.r0[1] * DEG) });
    shapeChips.set(S.shape, true); signChips.set(String(S.sign), true); twoChips.set(S.two ? '1' : '0', true); frameChips.set(S.frame, true);
    fArea.set(fix(S.area / PI, 2)); fDur.set(S.T); fPhase.set(S.phi); fDet.set(S.det); fLam.set(S.lam); fPhase2.set(S.phi2);
    fitRail(); clock.set(0);
    // a still (cover, cited figure) and the opening view of the full page show the telling frame; inside a chapter
    // the card plays once the reader has scrolled it into view; a click plays at once
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still); else if (booting) kit.autoplay(clock, $('stage')); else clock.play();
  }
  const cards = kit.cards($('presets'), { notes: NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拖包络的顶和右端、改相位与失谐、加一个虚拟 Z 或第二个脉冲，或在球上拖起始态。随时可以再选一张卡。', 'Free play: drag the top or the right end of the envelope, change the phase and the detuning, add a virtual Z or a second pulse, or drag the starting state on the sphere. Pick a card again at any time.'] });

  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const snap = (e) => ({ t: e.t, r: e.r.slice(), q: e.q.slice(), area: e.area, angle: qangle(e.q), P0: (1 + e.r[2]) / 2, axis: e.axis ? e.axis.slice() : null });
  window.PULSE_DEBUG = {
    get state() {
      const C = progs(), e = evaluate(C.main, clock.t), gh = C.ghost ? evaluate(C.ghost, clock.t) : null;
      return Object.assign(snap(e), { preset: cards.current, max: clock.max, playing: clock.playing, frame: S.frame, shape: S.shape, areaSet: S.area, T: S.T, phi: S.phi, det: S.det,
        lam: S.lam, sign: S.sign, two: S.two, phi2: S.phi2, r0: S.r0.slice(), peak: C.main.pulses[0].A, phys: C.main.pulses.map((p) => p.phiDeg),
        sway: !e.cur || e.cur.det === 0 ? null : swayOf(e).minTilt, lab: labOf(e), labPoles: [[0, 0, 1], [0, 0, -1]].map((v) => rotZ(qrot(e.q, v), e.wd * e.t)), ghost: C.kind, ghostState: gh ? snap(gh) : null });
    },
    at: (t) => { const C = progs(); return { main: snap(evaluate(C.main, t)), ghost: C.ghost ? snap(evaluate(C.ghost, t)) : null }; },
    seek: (t) => { clock.pause(); clock.set(t); },
    camera: () => Object.assign({}, stage.cam),
    /** Viewport coordinates of a world point, of a point (t ns, Ω/2π MHz) of the envelope, and of the two handles. */
    screen: (v) => { const q = stage.p(v), b = $('cv').getBoundingClientRect(); return [b.left + q[0], b.top + q[1]]; },
    env: (t, mhz) => { const E = geo.env, b = $('cv').getBoundingClientRect(); return E ? [b.left + E.X(t), b.top + E.Y(mhz)] : null; },
    handles: () => { const E = geo.env, b = $('cv').getBoundingClientRect(); return E ? { amp: [b.left + E.hAmp[0], b.top + E.hAmp[1]], width: [b.left + E.hWid[0], b.top + E.hWid[1]] } : null; }
  };
  window.TRV_THUMB = () => { applyPreset('gauss'); cards.mark('gauss'); clock.pause(); clock.set(17); stage.cam.yaw = -0.62; stage.cam.pitch = 0.3; paint.now(); };
  cards.pick(cards.initial('quarter'));
  booting = false;
  paint();
})();
