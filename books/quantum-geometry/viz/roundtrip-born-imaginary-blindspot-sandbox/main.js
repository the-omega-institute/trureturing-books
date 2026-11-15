/* ECHO//IMAGINARY · 玻恩往返与虚部盲区 · Round-trip Born and the imaginary blind spot
   The stage is the unit sphere of the qubit states ψ = cos θ|0⟩ + e^{iφ} sin θ|1⟩, drawn as the unit vectors
   V = cos θ I + sin θ (cos φ e₁ + sin φ e₂): the amber axis I is the observer's own state |0⟩, the magenta blind plane
   span{e₁, e₂} at 90° to I is the complex plane of the |1⟩ amplitude (the global phase makes the |0⟩ amplitude real and
   non-negative), the violet cone is the fiber of all V at the same θ. A lit bowl, the lower hemisphere (−V: the same
   states up to a sign), holds the picture.
     one way      P_I V = cos θ I, the cyan shadow on I
     round trip   from the tip of I down onto the line of V (cos θ V), then back onto I: cos²θ I, the amber echo; the
                  magenta remainder sin²θ = |I ∧ V|² never reaches I
     turned basis P_X(+) = (1 + sin 2θ cos φ)/2, P_Y(+i) = (1 + sin 2θ sin φ)/2 read the phase the Z readout cannot
     ×i           in the plane of I and e⊥ the 90° rotor R = [[0, −1], [1, 0]]: I → e⊥ (I·e⊥ = 0) → −I → −e⊥ → I
     evolution    H = ω|0⟩⟨0|: U(t)|0⟩ = e^{−iωt}|0⟩, the relative phase runs φ(t) = φ₀ + ωt and V turns round the cone;
                  the i-free counterpart ψ(t) = e^{−γt} ψ₀ shrinks V, |ψ(t)|² = e^{−2γt}
   The rail is ωt in degrees (ω = γ = 1, so t is the rail in radians). Every number is computed here; the instances of
   the cited Lean theorems are checked in instances(). Read-only probe: window.ROUNDTRIP_BORN_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180, UP = [0, 0, 1], ORIGIN = [0, 0, 0];
  const mod360 = (a) => ((a % 360) + 360) % 360;

  /* ---------- constants ---------- */
  // θ* = cos θ*: Newton's iteration on f(x) = cos x − x, started at 0.74
  let THETA_STAR = 0.74;
  for (let i = 0; i < 40; i++) THETA_STAR -= (Math.cos(THETA_STAR) - THETA_STAR) / (-Math.sin(THETA_STAR) - 1);
  const THETA_STAR_DEG = THETA_STAR / DEG;
  const LEG = 60;                                                // degrees of the rail per radar round trip
  const VIEWS = { ext: [-0.62, 0.42], axis: [-0.62, 0], basis: [0, PI / 2 - 0.001] };
  // the rotor sends I down to −I at the bottom of the bowl: the outside view of the turn looks in steeply enough
  // (pitch > 45°) that the near wall of the bowl does not hide it
  const VIEW_TURN = [-0.3, 0.86];
  const COVER = 0.3;                                             // the unit disc covers at most this share of the stage
  const TURN_NAMES = ['×1', '×i', '×i² = −1', '×i³ = −i', '×i⁴ = +1'];

  /* ---------- complex numbers and 2 × 2 complex matrices ---------- */
  const cx = {
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    conj: (a) => [a[0], -a[1]],
    abs2: (a) => a[0] * a[0] + a[1] * a[1],
    sc: (a, k) => [a[0] * k, a[1] * k],
    cis: (x) => [Math.cos(x), Math.sin(x)]
  };
  const Z0 = [0, 0], ONE = [1, 0];
  const mm = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cx.add(cx.mul(A[i][0], B[0][j]), cx.mul(A[i][1], B[1][j]))));
  const madd = (A, B, s = 1) => A.map((r, i) => r.map((z, j) => [z[0] + s * B[i][j][0], z[1] + s * B[i][j][1]]));
  const msc = (A, k) => A.map((r) => r.map((z) => cx.sc(z, k)));
  const mdag = (A) => [[cx.conj(A[0][0]), cx.conj(A[1][0])], [cx.conj(A[0][1]), cx.conj(A[1][1])]];
  const mtr = (A) => cx.add(A[0][0], A[1][1]);
  const mmax = (A) => Math.max(...A.flat().map((z) => Math.hypot(z[0], z[1])));
  const mv = (A, x) => [cx.add(cx.mul(A[0][0], x[0]), cx.mul(A[0][1], x[1])), cx.add(cx.mul(A[1][0], x[0]), cx.mul(A[1][1], x[1]))];
  const outer = (a, b) => [[cx.mul(a[0], cx.conj(b[0])), cx.mul(a[0], cx.conj(b[1]))], [cx.mul(a[1], cx.conj(b[0])), cx.mul(a[1], cx.conj(b[1]))]];
  /** ⟨a|b⟩, conjugate-linear in a. */
  const inner = (a, b) => cx.add(cx.mul(cx.conj(a[0]), b[0]), cx.mul(cx.conj(a[1]), b[1]));
  const vsub = (a, b) => [[a[0][0] - b[0][0], a[0][1] - b[0][1]], [a[1][0] - b[1][0], a[1][1] - b[1][1]]];
  const vsc = (a, z) => [cx.mul(z, a[0]), cx.mul(z, a[1])];
  const vnorm2 = (a) => cx.abs2(a[0]) + cx.abs2(a[1]);
  const ID = [[ONE, Z0], [Z0, ONE]];
  const SX = [[Z0, ONE], [ONE, Z0]], SZ = [[ONE, Z0], [Z0, [-1, 0]]];
  const P0 = [[ONE, Z0], [Z0, Z0]], P1 = [[Z0, Z0], [Z0, ONE]];
  const PXP = [[[0.5, 0], [0.5, 0]], [[0.5, 0], [0.5, 0]]];     // |+⟩⟨+|
  /** cos θ|0⟩ + e^{iφ} sin θ|1⟩ (radians). */
  const ket = (th, ph) => [[Math.cos(th), 0], cx.sc(cx.cis(ph), Math.sin(th))];
  /** e^{−itH} for H = ω|0⟩⟨0| (ω = 1): diag(e^{−it}, 1). */
  const evolve = (t) => [[cx.cis(-t), Z0], [Z0, ONE]];

  /* ---------- state ---------- */
  const S = { theta: 30, phi0: 0, vantage: 'ext', evo: 'S', turn: false, overlay: false };

  /** Everything the page shows, from the state and the rail. */
  function model() {
    const a = clock.t, t = a * DEG;
    const th = S.theta * DEG, c = Math.cos(th), s = Math.sin(th);
    const unitary = S.turn || S.evo === 'S';
    const phiDeg = !S.turn && S.evo === 'S' ? mod360(S.phi0 + a) : mod360(S.phi0);
    const ph = phiDeg * DEG;
    const amp = unitary ? 1 : Math.exp(-t), norm2 = amp * amp;          // modulus of ψ(t): e^{−γt} without i
    const dir = v3.sph(th, ph), V = v3.scale(dir, amp);
    const s2 = Math.sin(2 * th);
    // the round trip I → V → I with the state as it is (in real decay the weights carry |ψ(t)|²)
    const foot1 = v3.scale(dir, norm2 * c), echoPt = [0, 0, norm2 * c * c], shadow = [0, 0, amp * c];
    const u = (a % LEG) / LEG;
    const pulse = u < 0.5 ? v3.lerp(UP, foot1, 2 * u) : v3.lerp(foot1, echoPt, 2 * u - 1);
    // the rotor in the plane of I and e⊥ = (cos φ₀, sin φ₀, 0)
    const ePerp = [Math.cos(S.phi0 * DEG), Math.sin(S.phi0 * DEG), 0];
    const W = v3.add(v3.scale(UP, Math.cos(a * DEG)), v3.scale(ePerp, Math.sin(a * DEG)));
    const dz = Math.abs(s2), dx = Math.sqrt(Math.max(0, 1 - (s2 * Math.cos(ph)) ** 2));
    return {
      a, t, th, c, s, ph, phiDeg, amp, norm2, dir, V, foot1, echoPt, shadow, pulse, pulseU: u, ePerp, W,
      echo: norm2 * c * c, deficit: norm2 * s * s, cap: TAU * (1 - c), circ: TAU * s, bloch: 2 * S.theta,
      sz: Math.cos(2 * th), sx: s2 * Math.cos(ph), sy: s2 * Math.sin(ph), comm: Math.abs(s2 * Math.sin(ph)),
      dz, dx, PX: norm2 * (1 + s2 * Math.cos(ph)) / 2, PY: norm2 * (1 + s2 * Math.sin(ph)) / 2,
      zS: [Math.cos(t), -Math.sin(t)], zR: Math.exp(-t), normS: 1, normR: Math.exp(-2 * t),
      IW: Math.cos(a * DEG), EW: Math.sin(a * DEG), k: a / 90
    };
  }

  /* ---------- the instances of the cited theorems (on the unit state ψ̂ = ket(θ, φ)) ---------- */
  const instCache = new Map();
  function instances(M) {
    const key = `${S.theta}|${M.phiDeg}|${M.a}|${S.phi0}`;
    if (instCache.has(key)) return instCache.get(key);
    const psi = ket(M.th, M.ph), rho = outer(psi, psi);
    // rank-one Born pairing weight: |⟨0|ψ⟩|² = Tr(ρP₀); unread state Σ_k P_k ρ P_k = Σ_k w_k · (P_k ρ P_k / w_k)
    const weight = cx.abs2(inner([ONE, Z0], psi)), w0 = mtr(mm(rho, P0))[0], w1 = mtr(mm(rho, P1))[0];
    const unread = madd(mm(P0, mm(rho, P0)), mm(P1, mm(rho, P1)));
    const cond = (w, Pk) => (w > 1e-15 ? msc(mm(Pk, mm(rho, Pk)), 1 / w) : msc(ID, 0));
    const mix = madd(msc(cond(w0, P0), w0), msc(cond(w1, P1), w1));
    const born = { weight, trace: w0, residual: Math.abs(weight - w0), unreadDiag: [unread[0][0][0], unread[1][1][0]],
      unreadOffDiag: Math.hypot(unread[0][1][0], unread[0][1][1]), mixResidual: mmax(madd(unread, mix, -1)) };
    // Born skeleton: Born(ρ, 1) = 1 and Born(ρ, P₀ + P₁) = Born(ρ, P₀) + Born(ρ, P₁)
    const skeleton = { identity: mtr(mm(rho, ID))[0], sum: w0 + w1, additivity: Math.abs(mtr(mm(rho, madd(P0, P1)))[0] - (w0 + w1)), minProjection: Math.min(w0, w1) };
    // Lagrange for u = I, v = V̂
    const uu = UP, vv = M.dir;
    let su = 0, sv = 0, suv = 0, wedge = 0;
    for (let i = 0; i < 3; i++) { su += uu[i] * uu[i]; sv += vv[i] * vv[i]; suv += uu[i] * vv[i]; }
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) wedge += (uu[i] * vv[j] - uu[j] * vv[i]) ** 2;
    wedge /= 2;
    const lagrange = { lhs: su * sv - suv * suv, rhs: wedge, residual: Math.abs(su * sv - suv * suv - wedge) };
    // orthogonal complement in ℝ³: M = span{I}, M⊥ = span{e₁, e₂}
    const PM = [[0, 0, 0], [0, 0, 0], [0, 0, 1]], Id3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const PP = Id3.map((r, i) => r.map((x, j) => x - PM[i][j]));
    const m3 = (A, B) => A.map((r) => [0, 1, 2].map((j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
    const d3 = (A, B) => Math.max(...A.flat().map((x, k) => Math.abs(x - B.flat()[k])));
    const zero3 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], sum3 = PM.map((r, i) => r.map((x, j) => x + PP[i][j]));
    const ap3 = (A, x) => A.map((r) => r[0] * x[0] + r[1] * x[1] + r[2] * x[2]);
    const complement = { identities: 6, residual: Math.max(d3(PP, Id3.map((r, i) => r.map((x, j) => x - PM[i][j]))), d3(m3(PM, PM), PM), d3(m3(PP, PP), PP),
      d3(m3(PM, PP), zero3), d3(m3(PP, PM), zero3), d3(sum3, Id3)), readOfPerp: Math.hypot(...ap3(PM, M.ePerp)), perpOfPerp: Math.hypot(...ap3(PP, M.ePerp)) };
    // partition topology of the readout V ↦ |⟨I|V⟩|² on the cone of θ
    let lo = Infinity, hi = -Infinity;
    for (let j = 0; j < 360; j++) { const r = cx.abs2(inner([ONE, Z0], ket(M.th, j * DEG))); lo = Math.min(lo, r); hi = Math.max(hi, r); }
    const partition = { samples: 360, spread: hi - lo, classes: hi - lo < 1e-12 ? 1 : 2 };
    // diagonal observables on |+⟩ and Z|+⟩
    const rp = outer(ket(PI / 4, 0), ket(PI / 4, 0)), rm = mm(SZ, mm(rp, SZ)), rnd = TRV.mulberry32(3419);
    let diagDiff = 0;
    for (let k = 0; k < 24; k++) {
      const D = [[[2 * rnd() - 1, 0], Z0], [Z0, [2 * rnd() - 1, 0]]];
      diagDiff = Math.max(diagDiff, Math.abs(mtr(mm(rp, D))[0] - mtr(mm(rm, D))[0]));
    }
    const diagonal = { observables: 24, maxDifference: diagDiff, statesDiffer: mmax(madd(rp, rm, -1)), xPlus: mtr(mm(rp, SX))[0], xMinus: mtr(mm(rm, SX))[0] };
    // Robertson–Schrödinger for A = σz, B = σx
    const Ap = mv(SZ, psi), Bp = mv(SX, psi), eA = inner(psi, Ap), eB = inner(psi, Bp);
    const uR = vsub(Ap, vsc(psi, eA)), vR = vsub(Bp, vsc(psi, eB)), uvR = inner(uR, vR);
    const cov = 0.5 * inner(psi, mv(madd(mm(SZ, SX), mm(SX, SZ)), psi))[0] - eA[0] * eB[0];
    const cm = inner(psi, mv(madd(mm(SZ, SX), mm(SX, SZ), -1), psi)), half = cx.mul([0, -0.5], cm);   // (1/2i)·⟨[A, B]⟩
    const lhs = vnorm2(uR) * vnorm2(vR), G = lhs - cx.abs2(uvR);
    const robertson = { lhs, covariance: cov, commutatorHalf: half, G, residual: Math.abs(lhs - (cov * cov + cx.abs2(half) + G)),
      reResidual: Math.abs(uvR[0] - cov), imResidual: Math.hypot(uvR[1] - half[0], half[1]) };
    // the 90° rotor R = [[0, −1], [1, 0]]: Rᴴ = −R, RRᴴ = 1 ⇒ R² = −1
    const R = [[Z0, [-1, 0]], [ONE, Z0]];
    const rotor = { skewResidual: mmax(madd(mdag(R), R)), unitaryResidual: mmax(madd(mm(R, mdag(R)), ID, -1)), squareResidual: mmax(madd(mm(R, R), ID)) };
    // projection probability flow for H = |0⟩⟨0|, from the state ψ̂
    const H = P0, prob = (Pp, t) => { const U = evolve(t); return mtr(mm(mm(U, mm(rho, mdag(U))), Pp))[0]; };
    let flowSpread = 0;
    for (let k = 0; k <= 24; k++) flowSpread = Math.max(flowSpread, Math.abs(prob(P0, TAU * k / 24) - w0));
    const tt = M.t, h = 1e-4, Ut = evolve(tt), rt = mm(Ut, mm(rho, mdag(Ut)));
    const deriv = cx.mul([0, 1], mtr(mm(rt, madd(mm(H, PXP), mm(PXP, H), -1))))[0];
    const diff = (prob(PXP, tt + h) - prob(PXP, tt - h)) / (2 * h);
    const flow = { commutatorP0: mmax(madd(mm(H, P0), mm(P0, H), -1)), commutatorPX: mmax(madd(mm(H, PXP), mm(PXP, H), -1)), echoSpread: flowSpread,
      derivativePX: deriv, differencePX: diff, derivativeResidual: Math.abs(deriv - diff) };
    // stationarity of |0⟩ under U = e^{−itH}
    const r0 = outer([ONE, Z0], [ONE, Z0]);
    const stationary = { unitaryResidual: mmax(madd(mm(Ut, mdag(Ut)), ID, -1)), stateResidual: mmax(madd(mm(Ut, mm(r0, mdag(Ut))), r0, -1)), phase: Ut[0][0], energy: 1 };
    const out = { born, skeleton, lagrange, complement, partition, diagonal, robertson, rotor, flow, stationary };
    instCache.set(key, out);
    if (instCache.size > 40) instCache.delete(instCache.keys().next().value);
    return out;
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const options = { canvas: $('cv'), yaw: VIEWS.ext[0], pitch: VIEWS.ext[1], wheel: false, radius: 0.34, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('vantageChips'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 8); else bottom = Math.min(bottom, b.y - 8); }
    return { x: 12, y: top, w: Math.max(40, W - 24), h: Math.max(60, bottom - top) };
  }

  /* labels: placed after drawing by priority, off each other, the HUD and the handle */
  const sizes = new Map();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { sizes.clear(); paint(); });
  TRV.onLang(() => sizes.clear());
  function sizeOf(html, cls) {
    const k = `${TRV.lang()}|${cls}|${html}`;
    let s = sizes.get(k);
    if (!s) { probe.className = 'tag ' + cls; probe.innerHTML = html; probe.hidden = false; s = [probe.offsetWidth, probe.offsetHeight]; probe.hidden = true; if (s[0] > 0) sizes.set(k, s); }
    return s;
  }
  let LB = [], OBST = [], BOUNDS = null, PLACED = [];
  const want = (key, q, html, cls, o = {}) => LB.push({ key, q, html, cls, pri: o.pri || 0, dir: o.dir || [0, -1], r: o.r == null ? 10 : o.r });
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

  /* The orthographic picture of the unit sphere is a unit circle from every camera, so the scene is fitted as that
     circle (with room for the arrow heads) into the HUD-free rect, and never larger than COVER of the stage. */
  function fitTo(area, W, H) {
    const R = 1.08, cap = Math.sqrt(COVER * W * H / PI);
    const unit = Math.max(20, Math.min(cap, area.w / (2 * R), area.h / (2 * R)));
    options.radius = unit / Math.max(1, Math.min(W, H));
    options.cx = (area.x + area.w / 2) / Math.max(1, W);
    options.cy = (area.y + area.h / 2) / Math.max(1, H);
    return unit;
  }

  const ring = (r, z, n = 96) => Array.from({ length: n + 1 }, (_, i) => { const x = TAU * i / n; return [r * Math.cos(x), r * Math.sin(x), z]; });
  const planeArc = (e, a0, a1, n) => Array.from({ length: n + 1 }, (_, i) => { const x = (a0 + (a1 - a0) * i / n) * DEG; return v3.add(v3.scale(UP, Math.cos(x)), v3.scale(e, Math.sin(x))); });
  let FRAME = null, FIT = null;

  function drawStage(M) {
    const W = stageEl.clientWidth, H = stageEl.clientHeight, thumb = TRV.thumbMode;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 18, y: 18, w: W - 36, h: H - 36 } : safeRect(W, H, huds);
    if (!dragging || !FIT) FIT = { area };
    fitTo(FIT.area, W, H);
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W - 12, h: H - 12 }; LB = [];
    const tags = [];
    const at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    sc.begin();
    /* the bowl: the lower hemisphere (−V, the same states up to a sign), opaque and lit, holding the picture */
    sc.surface('bowl', (u, v) => [Math.sin(u) * Math.cos(v), Math.sin(u) * Math.sin(v), -Math.cos(u)],
      { u: [0, PI / 2], v: [0, TAU], nu: 24, nv: 72, colors: [P.faint, P.lineHot], value: (u) => u / (PI / 2), range: [0, 1],
        grid: { every: [4, 6], color: P.ink, alpha: 0.24 }, pick: false });
    /* the blind plane span{e₁, e₂}: a faint magenta lid, its rim the unit circle */
    sc.surface('blind', (u, v) => [u * Math.cos(v), u * Math.sin(v), 0], { u: [0, 1], v: [0, TAU], nu: 2, nv: 72, color: P.magenta, alpha: 0.1, pick: false, occlude: false });
    sc.line(ring(1, 0.002), { color: P.magenta, width: 1.3, alpha: 0.55 });
    /* the observer's axis I (amber) and its continuation to −I */
    sc.tube('Iaxis', [ORIGIN, [0, 0, 0.93]], { color: P.amber, width: 4.2, glow: 0.45, pick: false, occlude: false });
    sc.arrow([0, 0, 0.9], [0, 0, 1], { color: P.amber, width: 2, headSize: 14 });
    sc.line([ORIGIN, [0, 0, -0.985]], { color: P.ink, width: 1.2, dash: [4, 4], alpha: 0.6 });
    at([0, 0, 1.02], 'I', 'raw c-am backed', 10, [0.4, -1]);
    if (S.turn) drawTurn(M, at); else drawCone(M, at);
    sc.end();

    /* the handle: on the tip of V while V can be dragged */
    const canDrag = !thumb && !TRV.still && !S.turn && S.evo === 'S';
    const hq = canDrag ? sc.p(M.V) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = sc.p([0, 0, 0.3]);
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W, H, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy };
  }

  /* the cone, the state V and the round trip */
  function drawCone(M, at) {
    const { th, c, s, amp, V, ph } = M;
    const live = amp > 0.02;
    if (S.theta > 0.3 && S.theta < 89.7 && live) {
      sc.surface('cone', (u, v) => v3.scale([s * Math.cos(v), s * Math.sin(v), c], u * amp), { u: [0, 1], v: [0, TAU], nu: 2, nv: 72, color: P.violet, alpha: 0.16, pick: false, occlude: false });
    }
    if (S.theta > 0.3 && amp > 0.999) {
      sc.surface('cap', (u, v) => v3.scale(v3.sph(u * th, v), 1.003), { u: [0, 1], v: [0, TAU], nu: 12, nv: 48, color: P.violet, alpha: 0.1, pick: false, occlude: false });
    }
    if (S.theta > 0.3 && live) {
      sc.tube('fiber', ring(s * amp, c * amp), { color: P.violet, width: 2.6, glow: 0.4, pick: false, occlude: false });
      sc.tube('blindCircle', ring(s * amp, 0.004), { color: P.magenta, width: 2.2, glow: 0.35, pick: false, occlude: false });
      const far = v3.scale([s * Math.cos(ph + PI), s * Math.sin(ph + PI), c], amp);
      at(far, 'V(θ, φ)', 'raw c-vi backed', 5, null);
      at([s * amp * Math.cos(ph + 2.2), s * amp * Math.sin(ph + 2.2), 0], `2π sin θ = ${fix(M.circ, 3)}`, 'raw c-mg backed', 3, null);
    }
    at([Math.cos(ph - 1.3), Math.sin(ph - 1.3), 0], 'span{e₁, e₂} · 90°', 'raw c-mg backed', 4, null);
    // the phase φ: an arc in the blind plane from e₁ to the shadow of V, and that shadow's ray
    if (S.theta > 2 && live) {
      const n = Math.max(2, Math.ceil(M.phiDeg / 4)), rA = 0.3 * Math.max(0.35, s * amp);
      if (M.phiDeg > 1) sc.line(Array.from({ length: n + 1 }, (_, i) => { const x = ph * i / n; return [rA * Math.cos(x), rA * Math.sin(x), 0.006]; }), { color: P.magenta, width: 1.6 });
      sc.line([ORIGIN, [s * amp * Math.cos(ph), s * amp * Math.sin(ph), 0.006]], { color: P.magenta, width: 1.2, dash: [3, 3], alpha: 0.85 });
      sc.line([ORIGIN, [1, 0, 0.006]], { color: P.ink, width: 1, alpha: 0.4 });
      at([rA * Math.cos(ph / 2), rA * Math.sin(ph / 2), 0.006], 'φ', 'raw c-mg backed', 4, null);
    }
    /* the forward shadow cos θ on I (cyan), the escaping part sin θ (magenta) */
    if (live) {
      if (amp * c > 0.01) sc.tube('shadow', [ORIGIN, M.shadow], { color: P.cyan, width: 6.5, glow: 0.5, pick: false, occlude: false });
      if (amp * s > 0.01) sc.tube('escape', [M.shadow, V], { color: P.magenta, width: 2.8, glow: 0.4, pick: false, occlude: false });
      sc.bead(M.shadow, { key: 'shadow', color: P.cyan, r: 4.6 });
      at(M.shadow, 'cos θ', 'raw c-cy backed', 7, [-1, 0.2]);
      if (amp * s > 0.08) at(v3.lerp(M.shadow, V, 0.5), 'sin θ', 'raw c-mg backed', 6, [0.2, -1]);
    }
    /* the round trip: from the tip of I onto the line of V, then back onto I; the echo cos²θ I is amber */
    if (live && S.theta > 0.3) {
      sc.line([UP, M.foot1], { color: P.cyan, width: 1.8 });
      sc.line([M.foot1, M.echoPt], { color: P.cyan, width: 1.8 });
      sc.bead(M.foot1, { key: 'foot', color: P.cyan, r: 3.6 });
      sc.bead(M.pulse, { key: 'pulse', color: P.cyan, r: 5.4, glow: 0.9 });
    }
    sc.bead(M.echoPt, { key: 'echo', color: P.amber, r: 5.6, glow: 0.8 });
    at(M.echoPt, 'cos²θ', 'raw c-am backed', 9, [1, 0.35]);
    /* the state V (amber), draggable */
    if (live) {
      sc.tube('V', [ORIGIN, v3.scale(V, 0.93)], { color: P.amber, width: 3.2, glow: 0.45, pick: false, occlude: false });
      sc.arrow(v3.scale(V, 0.9), V, { color: P.amber, width: 2, headSize: 12 });
      at(V, 'V', 'raw c-am backed', 9, [1, -0.5]);
    }
    /* the turned basis: the X and Y axes |+⟩ = (I + e₁)/√2, |+i⟩ = (I + e₂)/√2 of the 90° turn on the Bloch sphere */
    if (S.vantage === 'basis') {
      const ux = [Math.SQRT1_2, 0, Math.SQRT1_2], uy = [0, Math.SQRT1_2, Math.SQRT1_2];
      sc.line([ORIGIN, ux], { color: P.amber, width: 1.6, dash: [6, 4] });
      sc.line([ORIGIN, uy], { color: P.amber, width: 1.6, dash: [6, 4] });
      at(ux, '|+⟩ · X', 'raw c-am backed', 6, [1, 0]);
      at(uy, '|+i⟩ · Y', 'raw c-am backed', 6, [0, -1]);
    }
    /* with and without i: the unitary arc of the tip (cyan) and the straight real decay (ink) */
    if (S.overlay) {
      const V0 = v3.sph(th, S.phi0 * DEG), Vu = v3.sph(th, (S.phi0 + M.a) * DEG), Vr = v3.scale(V0, Math.exp(-M.t));
      if (M.a > 0.5 && S.theta > 0.3) {
        const n = Math.max(2, Math.ceil(M.a / 3));
        sc.tube('uArc', Array.from({ length: n + 1 }, (_, i) => v3.sph(th, (S.phi0 + M.a * i / n) * DEG)), { color: P.cyan, width: 3.4, glow: 0.55, pick: false, occlude: false });
      }
      sc.line([V0, ORIGIN], { color: P.ink, width: 1.4, dash: [4, 4], alpha: 0.85 });
      if (S.evo === 'S') sc.bead(Vr, { key: 'decayTip', color: P.ink, r: 4.4 });
      else sc.bead(Vu, { key: 'unitaryTip', color: P.cyan, r: 4.6 });
      const pu = (S.phi0 + M.a) * DEG, tang = [-Math.sin(pu), Math.cos(pu), 0];
      if (S.theta > 2) sc.arrow(Vu, v3.add(Vu, v3.scale(tang, 0.36 * Math.max(0.3, M.s))), { color: P.cyan, width: 2, headSize: 10 });
      if (v3.len(Vr) > 0.12) sc.arrow(Vr, v3.scale(Vr, 0.6), { color: P.ink, width: 1.8, headSize: 9 });
      at(Vu, 'e<sup>−iωt</sup> · |ψ|² = 1', 'raw c-cy backed', 8, null);
      at(Vr, `e<sup>−γt</sup> · |ψ|² = ${fix(M.normR, 3)}`, 'raw ink backed', 7, [-1, 0.4]);
    }
  }

  /* the two quarter turns of i: the rotor plane of I and e⊥ */
  function drawTurn(M, at) {
    const e = M.ePerp, a = M.a, W = M.W;
    sc.line(planeArc(e, 0, 360, 96), { color: P.violet, width: 1.3, alpha: 0.7 });
    if (a > 0.5) sc.tube('turnArc', planeArc(e, 0, a, Math.max(2, Math.ceil(a / 3))), { color: P.violet, width: 3.2, glow: 0.5, pick: false, occlude: false });
    sc.line([v3.scale(e, -1), e], { color: P.magenta, width: 1.6, dash: [5, 4] });
    sc.bead(e, { key: 'i', color: P.magenta, r: 5.2 });
    sc.bead([0, 0, -0.985], { key: 'minusOne', color: P.ink, r: 5 });
    sc.bead(v3.scale(e, -1), { key: 'minusI', color: P.magenta, r: 5 });
    at(e, '×i · e<sub>⊥</sub>', 'raw c-mg backed', 9, [1, -0.2]);
    at([0, 0, -0.985], '×i² = −1 · −I', 'raw ink backed', 8, [1, 0.3]);
    at(v3.scale(e, -1), '×i³ = −i', 'raw c-mg backed', 7, [-1, -0.2]);
    at([0, 0, 1], '×1 = ×i⁴', 'raw c-am backed', 6, [-1, -0.4]);
    if (v3.len(W) > 0.5) {
      sc.tube('W', [ORIGIN, v3.scale(W, 0.92)], { color: P.amber, width: 3.4, glow: 0.5, pick: false, occlude: false });
      sc.arrow(v3.scale(W, 0.88), W, { color: P.amber, width: 2, headSize: 13 });
      sc.bead(W, { key: 'W', color: P.amber, r: 4 });
      at(W, `W · I·W = ${fix(M.IW, 3)}`, 'raw c-am backed', 10, null);
    }
  }

  /* ---------- the handle: a button on the tip of V, dragged over the upper hemisphere ---------- */
  const handle = $('stateHandle');
  let dragging = null;
  function placeHandle(q) {
    const show = !!q;
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
  }
  /** The point (θ, φ) of the upper hemisphere whose projection is nearest to the pointer (front side first). */
  function sphereAt(ev) {
    const b = stageEl.getBoundingClientRect(), x = ev.clientX - b.left - stageEl.clientLeft, y = ev.clientY - b.top - stageEl.clientTop;
    const cost = (tDeg, pDeg) => { const q = sc.p(v3.sph(tDeg * DEG, pDeg * DEG)); return (q[0] - x) ** 2 + (q[1] - y) ** 2 + (q[2] < -0.05 ? 9 : 0); };
    let best = [S.theta, 0], bd = Infinity;
    for (let i = 0; i <= 90; i++) for (let j = 0; j < 180; j++) { const d = cost(i, 2 * j); if (d < bd) { bd = d; best = [i, 2 * j]; } }
    const [t0, p0] = best;
    for (let i = -10; i <= 10; i++) for (let j = -10; j <= 10; j++) {
      const tt = clamp(t0 + i * 0.1, 0, 90), pp = p0 + j * 0.2, d = cost(tt, pp);
      if (d < bd) { bd = d; best = [tt, pp]; }
    }
    return { theta: best[0], phi: mod360(best[1]) };
  }
  const endDrag = (ev) => {
    if (!dragging || (ev && ev.pointerId != null && ev.pointerId !== dragging.pointer)) return;
    try { if (handle.hasPointerCapture(dragging.pointer)) handle.releasePointerCapture(dragging.pointer); } catch (e) { /* already released */ }
    dragging = null; handle.classList.remove('dragging'); paint();
  };
  handle.addEventListener('pointerdown', (ev) => {
    if (ev.button > 0 || TRV.still || S.turn || S.evo !== 'S') return;
    ev.preventDefault(); ev.stopPropagation();
    leave();
    dragging = { pointer: ev.pointerId }; handle.classList.add('dragging');
    try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* synthetic events carry no capture */ }
  });
  handle.addEventListener('pointermove', (ev) => {
    if (!dragging || ev.pointerId !== dragging.pointer) return;
    ev.preventDefault();
    const q = sphereAt(ev);
    setAngles(q.theta, mod360(q.phi - clock.t));
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    const k = ev.key;
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    if (k === 'ArrowLeft' || k === 'ArrowRight') setAngles(S.theta, mod360(S.phi0 + (k === 'ArrowRight' ? 5 : -5)));
    else setAngles(clamp(S.theta + (k === 'ArrowUp' ? -1 : 1), 0, 90), S.phi0);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const legendHtml = (items) => items.map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  function legendItems() {
    if (S.turn) return [['am', L('I 与转动的 W', 'I and the turning W')], ['vi', L('旋子 ×i 的平面', 'plane of the rotor ×i')], ['mg', L('e<sub>⊥</sub> 在盲平面里', 'e<sub>⊥</sub> in the blind plane')]];
    if (S.overlay) return [['cy', L('e<sup>−iωt</sup>：圆弧', 'e<sup>−iωt</sup>: the arc')], ['dash', L('e<sup>−γt</sup>：衰减', 'e<sup>−γt</sup>: decay')], ['am', L('态 V · 回声', 'state V · echo')], ['vi', L('方位锥', 'azimuth cone')]];
    return [['am', L('I · V · 回声 cos²θ', 'I · V · echo cos²θ')], ['cy', L('影子 cos θ · 往返', 'shadow cos θ · round trip')], ['mg', L('盲平面 · sin θ', 'blind plane · sin θ')], ['vi', L('方位锥 V(θ, φ)', 'azimuth cone V(θ, φ)')]];
  }
  const signed = (x, d) => (x < 0 ? '−' : '+') + fix(Math.abs(x), d);
  function hudText(M) {
    let big, sub;
    if (S.turn) {
      const k = M.k, exact = Math.abs(k - Math.round(k)) < 1e-6;
      big = exact ? `${TURN_NAMES[Math.round(k)]} · I·W = ${fix(M.IW, 6)}` : `α = ${fix(M.a, 1)}° · I·W = cos α = ${fix(M.IW, 6)}`;
      sub = `e<sub>⊥</sub>·W = ${fix(M.EW, 6)} · ${L('回声', 'echo')} (I·W)² = ${fix(M.IW * M.IW, 6)}`;
    } else if (S.overlay) {
      big = `|ψ(t)|² = ${fix(M.norm2, 6)} · ${S.evo === 'S' ? L('有 i：范数守住', 'with i: the norm holds') : L('没有 i：范数漏走', 'without i: the norm drains')}`;
      sub = `t = ${fix(M.t, 3)} · e<sup>−iωt</sup> = ${fix(M.zS[0], 6)} ${signed(M.zS[1], 6)}i · e<sup>−2γt</sup> = ${fix(M.normR, 6)}`;
    } else {
      big = `${L('往返回声', 'Round-trip echo')} cos²θ = ${fix(M.echo, 6)}`;
      if (S.vantage === 'axis') sub = L(`侧看：盲平面成一条边 · Z 读 ${fix(M.echo, 6)}，与 φ 无关`, `side-on: the blind plane is an edge · Z reads ${fix(M.echo, 6)} for every φ`);
      else if (S.vantage === 'basis') sub = `P<sub>X</sub>(+) = ${fix(M.PX, 6)} · P<sub>Y</sub>(+i) = ${fix(M.PY, 6)} · |sin 2θ sin φ| = ${fix(M.comm, 6)}`;
      else sub = `cos θ = ${fix(M.c, 6)} · sin²θ = ${fix(M.deficit, 6)} · φ = ${fix(M.phiDeg, 1)}°`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = legendHtml(legendItems());
  }
  function drawText(M) {
    $('roEcho').textContent = fix(M.echo, 6);
    $('roEchoSub').innerHTML = S.turn || S.evo === 'S' ? ' · |⟨I|V⟩|² = Tr(ρP<sub>I</sub>)' : ` · |ψ(t)|² cos²θ = e<sup>−2t</sup> cos²θ`;
    $('roCos').textContent = fix(M.c, 6);
    $('roSin').textContent = fix(M.s, 6);
    $('roDeficit').textContent = fix(M.deficit, 6);
    $('roCap').textContent = `${fix(M.cap, 6)} sr`;
    $('roCirc').innerHTML = `2π sin θ = ${fix(M.circ, 6)} · 2θ = ${fix(M.bloch, 3)}° · φ = ${fix(M.phiDeg, 1)}°`;
    $('roComm').innerHTML = `${fix(M.comm, 6)} · ΔZ ΔX = ${fix(M.dz * M.dx, 6)}`;
    $('roXY').innerHTML = `P<sub>X</sub>(+) = ${fix(M.PX, 6)} · P<sub>Y</sub>(+i) = ${fix(M.PY, 6)} · P<sub>Z</sub>(0) = ${fix(M.echo, 6)}`;
    $('roNorm').innerHTML = S.turn || S.evo === 'S'
      ? `${fix(M.normS, 6)} · ${L('薛定谔', 'Schrödinger')} |e<sup>−iωt</sup>|² = 1 · t = ${fix(M.t, 3)}`
      : `${fix(M.norm2, 6)} · e<sup>−2γt</sup> · t = ${fix(M.t, 3)}`;
    $('roTurn').innerHTML = S.turn
      ? `${Math.abs(M.k - Math.round(M.k)) < 1e-6 ? TURN_NAMES[Math.round(M.k)] : `α = ${fix(M.a, 1)}°`} · I·W = ${fix(M.IW, 6)} · e<sub>⊥</sub>·W = ${fix(M.EW, 6)}`
      : L('— 按 ×i 进入旋子', '— press ×i for the rotor');
    $('roNote').innerHTML = S.turn
      ? L('第一次转身落进盲区（I·W = 0），第二次转身回到 I 的轴上（振幅 −1，回声 1）。', 'The first turn lands in the blind spot (I·W = 0), the second lands back on the axis of I (amplitude −1, echo 1).')
      : S.evo === 'R'
        ? L('没有 i：速度与 ψ 反向，范数按 e<sup>−2t</sup> 漏走，回声也跟着漏。', 'Without i the velocity points against ψ: the norm drains as e<sup>−2t</sup>, and the echo with it.')
        : L('φ 只住在品红的盲平面里：沿紫色锥转一圈，回声 cos²θ 一个数位也不变。', 'φ lives only in the magenta blind plane: once round the violet cone, the echo cos²θ keeps every digit.');
    $('thetaPill').innerHTML = `θ <strong>${fix(S.theta, 3)}°</strong>`;
    $('echoPill').innerHTML = `cos²θ <strong>${fix(M.echo, 6)}</strong>`;
    $('hint').innerHTML = L('拖琥珀色的 V · 拖空白处转视角 · i 键 ×i', 'drag the amber V · drag empty space to orbit · key i for ×i');
    $('formula').innerHTML = S.turn ? 'R = [[0, −1], [1, 0]] · R² = −1' : S.overlay ? 'dψ/dt = −iωψ ⇒ |ψ| = 1 · dψ/dt = −γψ ⇒ |ψ|² = e<sup>−2γt</sup>' : '⟨I|V⟩⟨V|I⟩ = cos²θ · cos²θ + sin²θ = 1';
  }

  /* ---------- strip plot ---------- */
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [40, 12, 10, 22];
    let meta;
    if (S.turn) {
      $('plotTitle').textContent = L('旋子 ×i：看得见的 cos α 与看不见的 sin α', 'The rotor ×i: the visible cos α and the hidden sin α');
      const g = kit.plot(cv, { x: [0, 360], y: [-1.2, 1.2], pad });
      g.axes({ xTicks: [[0, '×1'], [90, '×i'], [180, '×i²'], [270, '×i³'], [360, '×i⁴']], yTicks: [-1, 0, 1] });
      const xs = Array.from({ length: 121 }, (_, i) => 3 * i);
      g.line(xs.map((x) => [x, Math.cos(x * DEG)]), P.amber, { width: 2.2 });
      g.line(xs.map((x) => [x, Math.sin(x * DEG)]), P.magenta, { width: 2 });
      for (let k = 0; k <= 4; k++) { g.dot(90 * k, Math.cos(90 * k * DEG), P.amber, 3); g.dot(90 * k, Math.sin(90 * k * DEG), P.magenta, 3); }
      g.vline(M.a, P.ink, { alpha: 0.7, dash: [3, 3] });
      g.dot(M.a, M.IW, P.amber, 4.4); g.dot(M.a, M.EW, P.magenta, 4.4);
      g.text(8, 1.08, 'I·W = cos α', P.amber, { align: 'left', size: 10 });
      g.text(352, 1.08, 'e_{⊥}·W = sin α', P.magenta, { align: 'right', size: 10 });
      meta = `I·W = ${fix(M.IW, 6)} · e<sub>⊥</sub>·W = ${fix(M.EW, 6)}`;
    } else if (S.overlay) {
      $('plotTitle').textContent = L('有 i 的圆弧与没有 i 的衰减：|ψ(t)|²', 'The arc with i and the decay without: |ψ(t)|²');
      const g = kit.plot(cv, { x: [0, TAU], y: [0, 1.15], pad });
      g.axes({ xTicks: [[0, '0'], [1, '1'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6']], yTicks: [0, 0.5, 1], xLabel: 't' });
      const xs = Array.from({ length: 157 }, (_, i) => TAU * i / 156);
      g.hline(1, P.cyan, { width: 2.4 });
      g.line(xs.map((x) => [x, Math.exp(-2 * x)]), P.ink, { width: 1.8, dash: [5, 4] });
      g.dot(1, Math.exp(-2), P.ink, 3.6); g.dot(2, Math.exp(-4), P.ink, 3.6);
      g.text(1.08, Math.exp(-2) + 0.07, 'e^{−2} = 0.135335', P.ink, { align: 'left', size: 9.5 });
      g.text(2.08, Math.exp(-4) + 0.07, 'e^{−4} = 0.018316', P.ink, { align: 'left', size: 9.5 });
      g.text(TAU - 0.05, 1.07, '|e^{−iωt}|^{2} = 1', P.cyan, { align: 'right', size: 10 });
      g.vline(M.t, P.amber, { alpha: 0.8 });
      g.dot(M.t, 1, P.cyan, 4.2); g.dot(M.t, M.normR, P.ink, 4.2);
      meta = `t = ${fix(M.t, 3)} · |ψ<sub>S</sub>|² = 1.000000 · |ψ<sub>R</sub>|² = e<sup>−2t</sup> = ${fix(M.normR, 6)}`;
    } else {
      $('plotTitle').textContent = L('沿时间轴：Z 回声不动，转 90° 的基随 φ 起伏', 'Along the rail: the Z echo stays, the turned basis follows φ');
      const g = kit.plot(cv, { x: [0, 360], y: [0, 1.15], pad });
      g.axes({ xTicks: [[0, '0°'], [90, '90°'], [180, '180°'], [270, '270°'], [360, '360°']], yTicks: [0, 0.5, 1], xLabel: 'ωt' });
      const xs = Array.from({ length: 121 }, (_, i) => 3 * i), s2 = Math.sin(2 * M.th);
      const phAt = (x) => (S.evo === 'S' ? S.phi0 + x : S.phi0) * DEG, nAt = (x) => (S.evo === 'S' ? 1 : Math.exp(-2 * x * DEG));
      if (S.evo === 'R') g.line(xs.map((x) => [x, nAt(x)]), P.ink, { width: 1.6, dash: [5, 4] });
      g.line(xs.map((x) => [x, nAt(x) * (1 + s2 * Math.cos(phAt(x))) / 2]), P.violet, { width: 2 });
      g.line(xs.map((x) => [x, Math.abs(s2 * Math.sin(phAt(x)))]), P.magenta, { width: 1.8 });
      g.line(xs.map((x) => [x, nAt(x) * M.c * M.c]), P.amber, { width: 2.4 });
      g.vline(M.a, P.ink, { alpha: 0.7, dash: [3, 3] });
      g.dot(M.a, M.echo, P.amber, 4.4); g.dot(M.a, M.PX, P.violet, 4); g.dot(M.a, M.comm, P.magenta, 4);
      g.text(6, 1.09, 'cos^{2}θ · Z', P.amber, { align: 'left', size: 10 });
      g.text(180, 1.09, 'P_{X}(+)', P.violet, { align: 'center', size: 10 });
      g.text(354, 1.09, '|sin 2θ sin φ|', P.magenta, { align: 'right', size: 10 });
      meta = `cos²θ = ${fix(M.echo, 6)} · P<sub>X</sub>(+) = ${fix(M.PX, 6)} · |sin 2θ sin φ| = ${fix(M.comm, 6)}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  /* ---------- the two inline figures: the Malus–Born curve and the complex dial ---------- */
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs, text) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; return e; };
  const BX = (deg) => 24 + 168 * deg / 90, BY = (v) => 100 - 90 * v;
  const pathOf = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(2)} ${p[1].toFixed(2)}`).join(' ');
  const bornDyn = {}, dialDyn = {};
  function buildSvgs() {
    const b = $('bornSvg');
    b.append(svgEl('path', { class: 'grid', d: `M${BX(0)} ${BY(0.5)} L${BX(90)} ${BY(0.5)} M${BX(45)} ${BY(0)} L${BX(45)} ${BY(1)}` }));
    b.append(svgEl('path', { class: 'ax', d: `M${BX(0)} ${BY(1.04)} L${BX(0)} ${BY(0)} L${BX(90)} ${BY(0)}` }));
    const ds = Array.from({ length: 91 }, (_, i) => i);
    b.append(svgEl('path', { class: 'area-mg', d: `${pathOf(ds.map((d) => [BX(d), BY(Math.cos(d * DEG) ** 2)]))} L${BX(90)} ${BY(1)} L${BX(0)} ${BY(1)} Z` }));
    b.append(svgEl('path', { class: 'mg', d: pathOf(ds.map((d) => [BX(d), BY(Math.sin(d * DEG) ** 2)])) }));
    b.append(svgEl('path', { class: 'cy', d: pathOf(ds.map((d) => [BX(d), BY(Math.cos(d * DEG))])) }));
    b.append(svgEl('path', { class: 'am', d: pathOf(ds.map((d) => [BX(d), BY(Math.cos(d * DEG) ** 2)])) }));
    b.append(svgEl('path', { class: 'vi', d: `M${BX(THETA_STAR_DEG)} ${BY(0)} L${BX(THETA_STAR_DEG)} ${BY(-0.06)}` }));
    for (const [x, s] of [[0, '0°'], [45, '45°'], [90, '90°']]) b.append(svgEl('text', { x: BX(x), y: 113, 'text-anchor': 'middle' }, s));
    b.append(svgEl('text', { x: BX(THETA_STAR_DEG), y: 113, 'text-anchor': 'middle', class: 't-vi' }, 'θ*'));
    b.append(svgEl('text', { x: 19, y: BY(1) + 3, 'text-anchor': 'end' }, '1'));
    b.append(svgEl('text', { x: 19, y: BY(0) + 3, 'text-anchor': 'end' }, '0'));
    b.append(svgEl('text', { x: BX(14), y: BY(1.02) - 2, class: 't-cy' }, 'cos θ'));
    b.append(svgEl('text', { x: BX(62), y: BY(0.38), class: 't-am' }, 'cos²θ'));
    b.append(svgEl('text', { x: BX(62), y: BY(0.86), class: 't-mg' }, 'sin²θ'));
    bornDyn.now = b.appendChild(svgEl('path', { class: 'now', d: '' }));
    bornDyn.cy = b.appendChild(svgEl('circle', { class: 'dot-cy', r: 2.6, cx: 0, cy: 0 }));
    bornDyn.mg = b.appendChild(svgEl('circle', { class: 'dot-mg', r: 2.6, cx: 0, cy: 0 }));
    bornDyn.am = b.appendChild(svgEl('circle', { class: 'dot-am', r: 3.2, cx: 0, cy: 0 }));

    const d = $('dialSvg'), O = 59, R = 40;
    d.append(svgEl('path', { class: 'ax', d: `M${O - R - 8} ${O} L${O + R + 8} ${O} M${O} ${O + R + 8} L${O} ${O - R - 8}` }));
    d.append(svgEl('circle', { class: 'cy', cx: O, cy: O, r: R, style: 'stroke-width: 1; opacity: 0.6' }));
    d.append(svgEl('text', { x: O + R + 4, y: O - 4, class: 't-am' }, '1'));
    d.append(svgEl('text', { x: O + 4, y: O - R - 3, class: 't-mg' }, 'i'));
    d.append(svgEl('text', { x: O - R - 4, y: O - 4, 'text-anchor': 'end' }, '−1'));
    d.append(svgEl('text', { x: O + 4, y: O + R + 9, class: 't-mg' }, '−i'));
    dialDyn.arc = d.appendChild(svgEl('path', { class: 'cy', d: '', style: 'stroke-width: 3' }));
    dialDyn.turn = d.appendChild(svgEl('path', { class: 'vi', d: '' }));
    dialDyn.decay = d.appendChild(svgEl('path', { class: 'ik', d: '' }));
    dialDyn.quarters = [0, 1, 2, 3].map((k) => d.appendChild(svgEl('circle', { class: k % 2 ? 'dot-mg' : 'dot-ik', r: 2.4, cx: O + R * Math.cos(k * PI / 2), cy: O - R * Math.sin(k * PI / 2) })));
    dialDyn.zR = d.appendChild(svgEl('circle', { class: 'dot-ik', r: 2.8, cx: O + R, cy: O }));
    dialDyn.z = d.appendChild(svgEl('circle', { class: 'dot-am', r: 3.6, cx: O + R, cy: O }));
    dialDyn.O = O; dialDyn.R = R;
  }
  function drawSvgs(M) {
    const x = BX(S.theta);
    bornDyn.now.setAttribute('d', `M${x.toFixed(2)} ${BY(0)} L${x.toFixed(2)} ${BY(1.04)}`);
    for (const [k, v] of [['cy', M.c], ['am', M.c * M.c], ['mg', M.s * M.s]]) { bornDyn[k].setAttribute('cx', x.toFixed(2)); bornDyn[k].setAttribute('cy', BY(v).toFixed(2)); }
    const { O, R } = dialDyn, P2 = (re, im, r = R) => [O + r * re, O - r * im];
    const arcPts = (a0, a1) => { const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / (3 * DEG))); return Array.from({ length: n + 1 }, (_, i) => { const t = a0 + (a1 - a0) * i / n; return P2(Math.cos(t), Math.sin(t)); }); };
    dialDyn.quarters.forEach((q) => { q.style.display = S.turn ? '' : 'none'; });
    if (S.turn) {
      const al = M.a * DEG;
      dialDyn.turn.setAttribute('d', M.a > 0.5 ? pathOf(arcPts(0, al)) : '');
      dialDyn.arc.setAttribute('d', ''); dialDyn.decay.setAttribute('d', ''); dialDyn.zR.style.display = 'none';
      const z = P2(Math.cos(al), Math.sin(al));
      dialDyn.z.setAttribute('cx', z[0].toFixed(2)); dialDyn.z.setAttribute('cy', z[1].toFixed(2));
      return;
    }
    dialDyn.turn.setAttribute('d', '');
    const showDecay = S.overlay || S.evo === 'R';
    dialDyn.arc.setAttribute('d', M.t > 0.01 && (S.evo === 'S' || S.overlay) ? pathOf(arcPts(0, -Math.min(M.t, TAU))) : '');
    dialDyn.decay.setAttribute('d', showDecay ? pathOf([P2(1, 0), P2(M.zR, 0)]) : '');
    dialDyn.zR.style.display = showDecay ? '' : 'none';
    const r = P2(M.zR, 0); dialDyn.zR.setAttribute('cx', r[0].toFixed(2)); dialDyn.zR.setAttribute('cy', r[1].toFixed(2));
    const z = S.evo === 'S' ? P2(M.zS[0], M.zS[1]) : P2(M.zR, 0);
    dialDyn.z.setAttribute('cx', z[0].toFixed(2)); dialDyn.z.setAttribute('cy', z[1].toFixed(2));
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M); drawSvgs(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail: ωt ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 360, t: 0, rate: 30, step: 15, loop: true,
    format: (t) => `ωt ${fix(t, 1)}° <small>· t = ${fix(t * DEG, 3)}</small>`,
    onChange: (t, C) => { playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint(); }
  });
  playBtn.addEventListener('click', () => clock.toggle());
  $('rewindBtn').addEventListener('click', () => { clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { clock.pause(); clock.set(0); });

  /* ---------- controls ---------- */
  let transition = null, booting = true;
  /** The boot card that plays: at once on a full page; inside a book (?embed=1) once the stage is at least half in view,
      pausing it again while it is out of view. Any move of the reader (a card, a control, ▶/❚❚, ⏮, the rail, the keys
      of the clock) disconnects the observer, so it can never start the clock after the reader has touched it. */
  let bootIO = null;
  const stopBootPlay = () => { if (bootIO) { bootIO.disconnect(); bootIO = null; } };
  function bootAutoplay() {
    stopBootPlay();
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
    let started = false;
    const io = new IntersectionObserver((entries) => {
      if (bootIO !== io) return;
      const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
      if (seen && !started) { started = true; clock.play(); } else if (!seen && clock.playing) clock.pause();
    }, { threshold: [0, 0.5, 1] });
    bootIO = io;
    io.observe(stageEl);
  }
  for (const id of ['play', 'playBtn', 'rew', 'rewindBtn']) $(id).addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);
  const leave = () => { stopBootPlay(); if (transition) transition.cancel(); transition = null; cards.mark(null); clock.pause(); };
  function setAngles(theta, phi0) {
    S.theta = clamp(theta, 0, 90); S.phi0 = mod360(phi0);
    fTheta.set(S.theta); fPhi.set(S.phi0);
    paint();
  }
  const viewOf = (v) => (v === 'ext' && S.turn ? VIEW_TURN : VIEWS[v]);
  function setVantage(v, ms) {
    S.vantage = VIEWS[v] ? v : 'ext';
    vantageChips.set(S.vantage, true);
    sc.view(viewOf(S.vantage), ms);
    paint();
  }
  function leaveTurn() { if (S.turn) { S.turn = false; clock.step = 15; if (S.vantage === 'ext') sc.view(VIEWS.ext, 600); } }
  /** ×i: enter the rotor at its first quarter turn, then one more quarter turn per press (after ×i⁴ it starts again). */
  function turnStep() {
    leave();
    if (!S.turn) { S.turn = true; S.overlay = false; clock.step = 90; clock.set(90); if (S.vantage === 'ext') sc.view(VIEW_TURN, 600); }
    else { const k = Math.floor(clock.t / 90 + 1e-9) + 1; clock.set(k > 4 ? 90 : 90 * k); }
    paint();
  }
  const fTheta = kit.field($('theta'), { fmt: (v) => `${fix(v, 3)}°`, onInput: (v) => { leave(); leaveTurn(); S.theta = clamp(v, 0, 90); paint(); } });
  const fPhi = kit.field($('phi'), { fmt: (v) => `${fix(v, 1)}°`, onInput: (v) => { leave(); S.phi0 = mod360(clamp(v, 0, 360)); paint(); } });
  $('dottieBtn').addEventListener('click', () => { leave(); leaveTurn(); S.theta = THETA_STAR_DEG; fTheta.set(S.theta); paint(); });
  $('turnBtn').addEventListener('click', turnStep);
  const evoChips = kit.chips($('evoChips'), 'evo', (v) => { leave(); leaveTurn(); S.evo = v === 'R' ? 'R' : 'S'; paint(); });
  const vantageChips = kit.chips($('vantageChips'), 'vantage', (v) => setVantage(v, 600));
  const VANTAGES = ['ext', 'axis', 'basis'];
  kit.keys({
    i: turnStep,
    d: () => { leave(); leaveTurn(); S.theta = THETA_STAR_DEG; fTheta.set(S.theta); paint(); },
    v: () => setVantage(VANTAGES[(VANTAGES.indexOf(S.vantage) + 1) % 3], 600),
    e: () => { leave(); leaveTurn(); S.evo = S.evo === 'S' ? 'R' : 'S'; evoChips.set(S.evo, true); paint(); }
  });

  /* ---------- experiment cards ---------- */
  const T_ONE = 180 / PI;                                        // the rail angle at t = 1
  const PRESETS = {
    'radar-roundtrip-born': { theta: 30, phi0: 0, a: 0, vantage: 'ext', evo: 'S', turn: false, overlay: false, play: true, still: 50, step: 15 },
    'azimuth-cone-blindspot': { theta: THETA_STAR_DEG, phi0: 0, a: 0, vantage: 'ext', evo: 'S', turn: false, overlay: false, play: true, still: 135, step: 15 },
    'observer-first-person-90': { theta: 45, phi0: 90, a: 0, vantage: 'axis', evo: 'S', turn: false, overlay: false, play: false, still: 0, step: 15 },
    'imaginary-double-turn': { theta: 90, phi0: 0, a: 0, vantage: 'ext', evo: 'S', turn: true, overlay: false, play: true, still: 90, step: 90 },
    'schrodinger-arc-engine': { theta: 45, phi0: 0, a: 0, vantage: 'ext', evo: 'S', turn: false, overlay: true, play: true, still: T_ONE, step: 15 }
  };
  const NOTES = {
    'radar-roundtrip-born': ['θ = 30°：从 I 的尖端落到 V 的线上得 cos θ = 0.866025，再落回 I 得琥珀回声 cos²θ = 0.750000；品红的亏量 sin²θ = 0.250000 永远回不到 I。V 绕锥转，每一趟回声都落在同一点。', 'θ = 30°: from the tip of I down onto the line of V gives cos θ = 0.866025, back onto I gives the amber echo cos²θ = 0.750000; the magenta deficit sin²θ = 0.250000 never returns to I. V turns round the cone and every echo lands on the same point.'],
    'azimuth-cone-blindspot': ['θ = θ* = 42.346459°（cos θ* = θ* = 0.739085 rad）：V 沿紫色锥扫一整圈，回声 cos²θ* = 0.546247 一个数位也不变；φ 藏在周长 4.232429 的品红盲圆上，锥围住 1.639376 sr。', 'θ = θ* = 42.346459° (cos θ* = θ* = 0.739085 rad): V sweeps the whole violet cone and the echo cos²θ* = 0.546247 keeps every digit; φ hides on the magenta blind circle of circumference 4.232429, and the cone encloses 1.639376 sr.'],
    'observer-first-person-90': ['θ = 45°、φ = 90°：侧看时盲平面成一条边，Z 读出对任何 φ 都是 0.500000。按“转 90° 的基”顺着 I 向下看：相位成了看得见的角，P<sub>Y</sub>(+i) = 1，|sin 2θ sin φ| = 1.000000。', 'θ = 45°, φ = 90°: side-on, the blind plane is an edge and the Z readout is 0.500000 for every φ. Press “90° turned basis” to look down I: the phase becomes a visible angle, P<sub>Y</sub>(+i) = 1 and |sin 2θ sin φ| = 1.000000.'],
    'imaginary-double-turn': ['θ = 90°：旋子每次转 90°。×i 把 I 转成 e<sub>⊥</sub>，I·e<sub>⊥</sub> = 0.000000，落进 I 看不见的盲平面；×i² 把它转到 −I，又回到 I 的轴上，振幅 −1、回声 1；×i⁴ 回到原处。', 'θ = 90°: the rotor turns by 90° at a time. ×i takes I to e<sub>⊥</sub>, I·e<sub>⊥</sub> = 0.000000, into the blind plane I cannot see; ×i² takes it to −I, back on the axis of I, amplitude −1 and echo 1; ×i⁴ brings it home.'],
    'schrodinger-arc-engine': ['θ = 45°：有 i 时速度 −iωψ 与态垂直，V 的尖端沿青色圆弧走，|ψ|² = 1.000000 永远不变；把 i 去掉，速度 −γψ 指回原点，|ψ|² = e<sup>−2t</sup>：t = 1 只剩 0.135335，t = 2 只剩 0.018316。', 'θ = 45°: with i the velocity −iωψ is perpendicular to the state and the tip of V runs along the cyan arc, |ψ|² = 1.000000 for ever; take i away and the velocity −γψ points back to the origin, |ψ|² = e<sup>−2t</sup>: 0.135335 is left at t = 1 and 0.018316 at t = 2.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'radar-roundtrip-born': ['θ = 30°：往返一次，琥珀回声 cos²θ = 0.750000；品红亏量 0.250000 回不到 I。', 'θ = 30°: one round trip gives the amber echo cos²θ = 0.750000; the magenta deficit 0.250000 never returns.'],
    'azimuth-cone-blindspot': ['θ*：沿紫色锥转一圈，回声 0.546247 不变；φ 藏在周长 4.232429 的盲圆上。', 'θ*: once round the violet cone the echo stays 0.546247; φ hides on a blind circle of length 4.232429.'],
    'observer-first-person-90': ['θ = 45°：Z 对任何 φ 都读 0.500000；转 90° 的基读出 |sin 2θ sin φ| = 1。', 'θ = 45°: Z reads 0.500000 for every φ; the turned basis reads |sin 2θ sin φ| = 1.'],
    'imaginary-double-turn': ['×i 落进盲区，I·W = 0；×i² = −1 回到 I 的轴上，回声 1。', '×i lands in the blind spot, I·W = 0; ×i² = −1 lands back on the axis of I, echo 1.'],
    'schrodinger-arc-engine': ['有 i：沿青色圆弧走，范数 1；没有 i：t = 1 时只剩 0.135335。', 'With i: along the cyan arc, norm 1; without i: only 0.135335 is left at t = 1.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    clock.pause();
    if (transition) transition.cancel();
    transition = null;
    S.turn = p.turn; S.overlay = p.overlay; S.evo = p.evo; evoChips.set(p.evo, true);
    clock.step = p.step;
    setVantage(p.vantage, booting || TRV.still ? 0 : 600);
    const from = { theta: S.theta, phi0: S.phi0 };
    const finish = () => { S.theta = p.theta; S.phi0 = p.phi0; fTheta.set(p.theta); fPhi.set(p.phi0); paint(); };
    if (booting || TRV.still) finish();
    else transition = kit.tween(550, (e) => { S.theta = from.theta + (p.theta - from.theta) * e; S.phi0 = from.phi0 + (p.phi0 - from.phi0) * e; fTheta.set(S.theta); fPhi.set(S.phi0); paint(); }, finish);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still);
    else clock.set(p.a);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootAutoplay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：拉 θ 与 φ₀、拖琥珀色的 V、按 ×i、换演化方程或视角。随时可以再选一张卡。', 'Free play: pull θ and φ₀, drag the amber V, press ×i, switch the evolution law or the vantage. Pick a card again at any time.']
  });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  buildSvgs();

  /* ---------- probe, cover, start ---------- */
  window.ROUNDTRIP_BORN_DEBUG = Object.freeze({
    get state() {
      const M = model(), I = instances(M);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, playing: clock.playing, step: clock.step,
        thetaDeg: S.theta, phi0Deg: S.phi0, phiDeg: M.phiDeg, alphaDeg: M.a, time: M.t,
        vantage: S.vantage, evolution: S.evo, turn: S.turn, overlay: S.overlay,
        thetaStar: THETA_STAR, thetaStarDeg: THETA_STAR_DEG,
        cos: M.c, sin: M.s, echo: M.echo, deficit: M.deficit, capSolidAngle: M.cap, blindCircumference: M.circ, blochPolarDeg: M.bloch,
        sigmaZ: M.sz, sigmaX: M.sx, sigmaY: M.sy, commutatorBound: M.comm, deltaZ: M.dz, deltaX: M.dx, PX: M.PX, PY: M.PY,
        norm2: M.norm2, zS: M.zS, zR: M.zR, normR: M.normR,
        V: M.V, shadow: M.shadow, roundTripFoot: M.foot1, echoPoint: M.echoPt, pulse: M.pulse, pulsePhase: M.pulseU,
        ePerp: M.ePerp, W: M.W, IW: M.IW, ePerpW: M.EW, turnIndex: M.k,
        leanInstances: I, camera: Object.assign({}, sc.cam),
        handle: FRAME ? FRAME.handle : null, labels: PLACED, stageFrame: FRAME
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.turn != null) { S.turn = !!o.turn; clock.step = S.turn ? 90 : 15; if (o.vantage == null) sc.view(viewOf(S.vantage), 0); }
      if (o.overlay != null) S.overlay = !!o.overlay;
      if (o.evo != null) { S.evo = o.evo === 'R' ? 'R' : 'S'; evoChips.set(S.evo, true); }
      if (o.theta != null) { S.theta = clamp(o.theta, 0, 90); fTheta.set(S.theta); }
      if (o.phi0 != null) { S.phi0 = mod360(o.phi0); fPhi.set(S.phi0); }
      if (o.vantage != null) setVantage(o.vantage, 0);
      if (o.alpha != null) clock.set(clamp(o.alpha, 0, 360));
      paint();
    },
    /** Viewport coordinates of the handle on the tip of V (for pointer tests), or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the unit-sphere point at polar angle θ and azimuth φ (degrees), for drag targets. */
    spherePoint(thetaDeg, phiDeg) { const b = stageEl.getBoundingClientRect(), q = sc.p(v3.sph(thetaDeg * DEG, phiDeg * DEG)); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1], depth: q[2] }; }
  });
  window.TRV_THUMB = () => { cards.pick('azimuth-cone-blindspot'); clock.pause(); clock.set(135); sc.view([VIEWS.ext[0], VIEWS.ext[1], 1], 0); paint.now(); };
  cards.pick(cards.initial('radar-roundtrip-born'));
  booting = false;
  paint();
})();
