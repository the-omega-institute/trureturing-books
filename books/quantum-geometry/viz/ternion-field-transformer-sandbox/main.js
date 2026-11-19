/* TERNION//TFT · 三元数场 Transformer 沙盘 · The ternion-field Transformer (Chapter 37, §37.1)
   World (kit.solid): z up. The violet unit ball at the origin is one ternion concept field: a point σ = tan(θ/4)û is the
   rotation by θ about û, the sphere ‖σ‖ = 1 is the half-turn seam and antipodal points on it are the same rotation. The
   ball is drawn as a cutaway: the far hemisphere (seen from the camera) is an opaque lit bowl, the near one faint glass.
   A square floor at z = −1.24 is the reference plate; on two cards a ring of small field balls stands on it.
   The rail turns the current rotor by θ ∈ [0°, 360°]: its stored point runs out along a violet diameter, reaches the
   seam at 180°, reappears at the antipode and comes back to the centre at 360°. The amber handle sits on that point.
     card 0  the dual-denominator product σ_A ★ σ_B (σ_B turns): the chosen denominator, the product inside the ball,
             the shadow −σ_A/‖σ_A‖² behind the bowl and the sine vector ξ of the product (cyan).
     card 1  3D-NAPE: the step rotors γ_A, γ_B (both turn by θ about e₁, e₂); the two orders A → B and B → A end at
             (1, 1, ±1)/3 for θ = 90°, and the magenta arc is the relative rotor between them (120°).
     card 2  bilateral rotors σ ↦ ℓ ★ σ ★ r inside the ball, and min(K, 16) fields on a ring of the floor with their
             butterfly bridges (cyan); the parameter ledger of one layer at K = 2ᵐ.
     card 3  Born–Heap attention with a single slot: the key turns away from the query by θ; the cyan arrow is the
             TFT step R(ω̄), the magenta arrow the step Softmax would take with its weight fixed at 1.
     card 4  the Fano Lie-triple gate: ξ of the field k (cyan), f from the partner fields k + 1, k + 3 (dashed cyan),
             Δ = w₁ × ξ + {ξ, w₂, f}, the update σ_out = σ_mid ★ R(Δ) and the halting rule r ≤ ε_self.
   Every number is computed here. Read-only probe: window.TERNION_TFT_DEBUG = { state, calc, presets }. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const TAU = 2 * Math.PI, DEG = Math.PI / 180;

  /* ---------- vectors ---------- */
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const n2 = (a) => dot(a, a);
  const len = (a) => Math.sqrt(n2(a));
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, k) => [a[0] * k, a[1] * k, a[2] * k];
  const neg = (a) => mul(a, -1);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const unit = (a) => mul(a, 1 / len(a));
  const lerp3 = (a, b, u) => add(mul(a, 1 - u), mul(b, u));

  /* ---------- the algebra of §37.1 ---------- */
  /** N(a, b) = (1 − ‖a‖²)b + (1 − ‖b‖²)a + 2 a × b. */
  const numer = (a, b) => add(add(mul(b, 1 - n2(a)), mul(a, 1 - n2(b))), mul(cross(a, b), 2));
  /** D₊ = 1 + ‖a‖²‖b‖² − 2a·b and D₋ = ‖a + b‖². */
  const dPlus = (a, b) => 1 + n2(a) * n2(b) - 2 * dot(a, b);
  const dMinus = (a, b) => n2(add(a, b));
  /** The dual-denominator product with its parts: +N/D₊ when D₊ ≥ D₋, else −N/D₋. */
  function starParts(a, b) {
    const N = numer(a, b), p = dPlus(a, b), m = dMinus(a, b), main = p >= m;
    return { N, dp: p, dm: m, main, out: main ? mul(N, 1 / p) : mul(N, -1 / m) };
  }
  const star = (a, b) => starParts(a, b).out;
  /** ξ(σ) = 4(1 − ‖σ‖²)σ / (1 + ‖σ‖²)² = sin θ û. */
  const xi = (s) => { const q = n2(s); return mul(s, (4 * (1 - q)) / ((1 + q) * (1 + q))); };
  /** λ(σ) = 2 / (1 + ‖σ‖²). */
  const lam = (s) => 2 / (1 + n2(s));
  /** The shadow chart −σ/‖σ‖² (the same rotation). */
  const shadow = (s) => mul(s, -1 / n2(s));
  /** The stored point of the rotation by θ (degrees) about the unit axis n: tan(θ/4)n up to 180°, then the shadow. */
  function rep(theta, n) {
    const t = ((theta % 360) + 360) % 360;
    return t <= 180 ? mul(n, Math.tan((t * DEG) / 4)) : mul(n, -Math.tan(((360 - t) * DEG) / 4));
  }
  /** The rotation angle (degrees, 0…180) of a stored point. */
  const angleOf = (s) => (4 * Math.atan(len(s))) / DEG;
  /** The rational Born kernel: the squared inner product of the unit-quaternion lifts. */
  function born(q, k) {
    const v = ((1 - n2(q)) * (1 - n2(k)) + 4 * dot(q, k)) / ((1 + n2(q)) * (1 + n2(k)));
    return v * v;
  }
  const rRat = (u) => mul(u, 1 / (1 + n2(u)));
  const rSqrt = (g) => mul(g, 1 / (1 + Math.sqrt(1 + n2(g))));
  /** The Lie-triple bracket {a, b, c} = (a·c)b − (b·c)a. */
  const bracket = (a, b, c) => sub(mul(b, dot(a, c)), mul(a, dot(b, c)));

  /* 2 × 2 complex matrices for the triangle holonomy: entries [re, im] */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const pauli = (v) => [[[v[2], 0], [v[0], -v[1]]], [[v[0], v[1]], [-v[2], 0]]];
  const mscale = (A, k) => A.map((r) => r.map((z) => [z[0] * k, z[1] * k]));
  const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
  const ID2 = [[[1, 0], [0, 0]], [[0, 0], [1, 0]]];
  const rotor = (a, b) => mscale(madd(ID2, mmul(pauli(b), pauli(a))), 1 / Math.sqrt(2 * (1 + dot(a, b))));
  /** rotor(c, a)·rotor(b, c)·rotor(a, b) against (S − iDσ·a)/√(S² + D²): S, D and the largest entry gap. */
  function holonomy(a, b, c) {
    const S = 1 + dot(a, b) + dot(b, c) + dot(c, a), D = dot(a, cross(b, c)), r = Math.sqrt(S * S + D * D);
    const left = mmul(mmul(rotor(c, a), rotor(b, c)), rotor(a, b));
    const pa = pauli(a), right = [0, 1].map((i) => [0, 1].map((j) => [((i === j ? S : 0) + D * pa[i][j][1]) / r, -D * pa[i][j][0] / r]));
    let gap = 0;
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) gap = Math.max(gap, Math.hypot(left[i][j][0] - right[i][j][0], left[i][j][1] - right[i][j][1]));
    return { S, D, gap, phase: [S / r, -D / r] };
  }
  /** Exact fractions (BigInt) for the single exact hit: α, ω̄ and R_rat(ω̄) when ε₀ is a multiple of 1/200. */
  const gcd = (a, b) => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
  const frac = (n, d) => { const g = gcd(n, d) || 1n; return [n / g, d / g]; };
  const fmul = (x, y) => frac(x[0] * y[0], x[1] * y[1]);
  const fadd = (x, y) => frac(x[0] * y[1] + y[0] * x[1], x[1] * y[1]);
  const fdiv = (x, y) => frac(x[0] * y[1], x[1] * y[0]);
  function exactHit(eps0) {
    const k = Math.round(eps0 * 200);
    if (Math.abs(k / 200 - eps0) > 1e-12) return null;
    const one = [1n, 1n], e = frac(BigInt(k), 200n);
    const alpha = fdiv(one, fadd(e, one)), quarterXi = frac(6n, 25n), om = fmul(alpha, quarterXi);
    const step = fdiv(om, fadd(one, fmul(om, om)));
    return { alpha, om, step };
  }
  const fstr = (x) => (x[1] === 1n ? String(x[0]) : x[0] + '/' + x[1]);

  /* ---------- the cards ---------- */
  const E1 = [1, 0, 0], E2 = [0, 1, 0], E3 = [0, 0, 1];
  const A_AXIS = unit([0.18, -0.86, 0.48]), A_ANGLE = 150;            // card 0: σ_A, fixed
  const B_AXIS = unit([-0.55, -0.32, 0.77]);                          // card 0: σ_B turns about this axis
  const IN_AXIS = unit([0.2, 0.55, 0.8]);                            // card 2: the input σ of the bilateral rotor
  const ELL_AXIS = unit([-0.2, 0.25, 1]), ELL_ANGLE = 90, RR_AXIS = unit([1, 0.35, -0.25]), RR_ANGLE = 80;
  const ELL = rep(ELL_ANGLE, ELL_AXIS), RR = rep(RR_ANGLE, RR_AXIS);
  const PARTNER = rep(120, unit([0.3, 0.8, -0.5])), G_AB = [0.4, -0.25, 0.3];
  const K_AXIS = unit([0.75, 0.45, 0.5]), VALUE = [0.5, 0, 0], P_SHARP = 2, BETA = 1;   // card 3
  const MID_AXIS = unit([-0.6, -0.2, 0.75]);                           // card 4: σ_mid of the field k
  const SM1 = rep(110, unit([1, 0.4, 0.2])), SM2 = rep(140, unit([-0.3, 0.9, 0.4]));
  const W1 = [0.4, -0.22, 0.3], W2 = [-0.3, 0.4, 0.36];
  const cardsData = [
    { id: 'dual-denom-shadow-mrp', cam: 'oblique', play: true, still: 120 },
    { id: 'nape-nonabelian-holonomy', cam: 'front', play: true, still: 90 },
    { id: 'butterfly-schur-bridge', cam: 'oblique', play: true, still: 30 },
    { id: 'born-heap-attention-sinkfree', cam: 'oblique', play: true, still: 180 },
    { id: 'fano-lie-triple-curvature-gate', cam: 'oblique', play: true, still: 100 }
  ];
  const presets = Object.fromEntries(cardsData.map((p) => [p.id, p]));
  const S = { kind: 0, theta: 120, cam: 'oblique', lens: 0, retract: 'rat', m: 10, eps0: 0.05, epsSelf: 0.05, grow: 1 };
  const retract = (u) => (S.retract === 'sqrt' ? rSqrt(u) : rRat(u));

  /** Everything the page shows, from the state. */
  function ledger() {
    const th = S.theta, k = S.kind;
    const out = { kind: k, theta: th };
    if (k === 0) {
      const a = rep(A_ANGLE, A_AXIS), b = rep(th, B_AXIS), st = starParts(a, b);
      Object.assign(out, {
        sigmaA: a, sigmaB: b, product: st.out, N: st.N, dPlus: st.dp, dMinus: st.dm, mainChart: st.main,
        chosen: Math.max(st.dp, st.dm), halfSum: (st.dp + st.dm) / 2, productNorm2: n2(st.out),
        ratio: Math.min(st.dp, st.dm) / Math.max(st.dp, st.dm),
        sumResidual: Math.abs(st.dp + st.dm - (1 + n2(a)) * (1 + n2(b))),
        normResidual: Math.abs(n2(st.N) - st.dp * st.dm),
        lambdaB: lam(b), xiProduct: xi(st.out), shadowA: shadow(a), xiA: xi(a),
        shadowResidual: len(sub(xi(shadow(a)), xi(a))), productAngle: angleOf(st.out)
      });
      out.anchor = b; out.axis = B_AXIS;
    } else if (k === 1) {
      const gA = rep(th, E1), gB = rep(th, E2), ab = star(gA, gB), ba = star(gB, gA), rel = star(neg(ab), ba);
      const zA = rep(th, E3), zB = rep(th / 2, E3);
      const rope = angleOf(star(neg(star(zA, zB)), star(zB, zA)));
      Object.assign(out, {
        gammaA: gA, gammaB: gB, ab, ba, relative: rel, deviation: angleOf(rel), rope,
        stepNorm: len(gA), triangle: holonomy(E1, E2, E3), reversed: holonomy(E1, E3, E2)
      });
      out.anchor = gA; out.axis = E1;
    } else if (k === 2) {
      const K = 2 ** S.m, d = 3 * K, sigma = rep(th, IN_AXIS), lsig = star(ELL, sigma), bil = star(lsig, RR);
      const ref = star(ELL, RR), bridge = bracket(xi(sigma), G_AB, xi(PARTNER)), bridgeShadow = bracket(xi(sigma), G_AB, xi(shadow(PARTNER)));
      Object.assign(out, {
        K, d, m: S.m, dense: 12 * d * d, bilateral: 24 * K, butterfly: 4 * S.m * (K / 2) * 3, gate: 6 * K, nape: 3 * K,
        gatedNape: 15 * K, stages: S.m, bridges: (K / 2) * S.m,
        sigma, lsigma: lsig, bilateralOut: bil, isometryResidual: Math.abs(born(sigma, [0, 0, 0]) - born(bil, ref)),
        bridgeTorque: bridge, bridgeResidual: len(sub(bridge, bridgeShadow)), drawn: Math.min(K, 8)
      });
      out.total = out.bilateral + out.butterfly + out.gate + out.nape;
      out.gatedTotal = out.total - out.nape + out.gatedNape;
      out.ratio = out.dense / out.total;
      out.anchor = sigma; out.axis = IN_AXIS;
    } else if (k === 3) {
      const q = [0, 0, 0], st = [0, 0, 0], key = rep(th, K_AXIS);
      const b = born(q, key), phi = b ** P_SHARP, sum = phi, alpha = phi / (S.eps0 + sum);
      const hat = star(q, star(neg(key), VALUE)), m = star(neg(st), hat);
      const om = mul(xi(m), alpha / 4), step = retract(mul(om, BETA)), mid = star(st, step);
      const softStep = retract(mul(xi(m), BETA / 4)), soft = star(st, softStep);
      const half = (th * DEG) / 2, amp = [Math.cos(half), Math.sin(half)];
      Object.assign(out, {
        query: q, key, value: VALUE, transported: hat, relative: m, born: b, bornOverlap: amp[0] * amp[0], phi, alpha,
        alphaSum: sum / (S.eps0 + sum), reserveShare: S.eps0 / (S.eps0 + sum), omega: om, mid, soft,
        stepNorm: len(mid), softNorm: len(soft), softSum: 1,
        exact: Math.abs(b - 1) < 1e-15 && S.retract === 'rat' ? exactHit(S.eps0) : null
      });
      out.anchor = key; out.axis = K_AXIS;
    } else {
      const mid = rep(th, MID_AXIS), x = xi(mid), f = xi(star(SM1, SM2));
      const delta = add(cross(W1, x), bracket(x, W2, f)), step = retract(delta), o = star(mid, step);
      const r = len(star(neg(mid), o));
      Object.assign(out, {
        mid, xi: x, f, delta, step, out: o, r, halted: r <= S.epsSelf, gateScalar: dot(x, f), xiNorm: len(x),
        partners: [SM1, SM2]
      });
      out.anchor = mid; out.axis = MID_AXIS;
    }
    return out;
  }

  /* ---------- the stage ---------- */
  const cameras = { oblique: [-0.62, 0.36], front: [-2.356, 0.22], top: [-0.62, 1.08] };
  const config = { canvas: $('cv'), wheel: false, radius: 0.33, yaw: cameras.oblique[0], pitch: cameras.oblique[1], onChange: () => paint() };
  const stage = $('stage'), handle = $('rotorHandle');
  const sc = kit.solid(stage, config);
  if (TRV.still) stage.classList.add('still');
  const FLOOR_Z = -1.24, FLOOR_H = 1.3, RING_R = 1.2, RING_Z = -1.09, SMALL_R = 0.105;
  const curve = (steps, fn) => Array.from({ length: steps + 1 }, (_, i) => fn(i / steps));
  /** Split a sampled path where the stored point jumps across the ball (a seam crossing). */
  function runs(pts, gap = 0.6) {
    const out = [[]];
    pts.forEach((p, i) => { if (i && len(sub(p, pts[i - 1])) > gap) out.push([]); out[out.length - 1].push(p); });
    return out.filter((r) => r.length > 1);
  }
  function tubeRuns(key, pts, style) { runs(pts).forEach((r, i) => sc.tube(key + i, r, style)); }
  function floorPlate() {
    const h = FLOOR_H, z0 = FLOOR_Z - 0.06, z1 = FLOOR_Z, v = [];
    for (const z of [z0, z1]) for (const [a, b] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) v.push([a * h, b * h, z]);
    const faces = [[0, 3, 2, 1], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7], [4, 5, 6, 7]];
    sc.poly('floor', { vertices: v, faces }, { colors: faces.map((f) => (f[0] === 4 ? P.panelEdge : P.lineHot)), edges: false });
    // a low-contrast polar reference on the plate
    for (const r of [0.45, 0.85, 1.25]) sc.line(curve(64, (u) => [r * Math.cos(u * TAU), r * Math.sin(u * TAU), FLOOR_Z + 0.002]), { color: P.sigma, alpha: 0.2 });
    for (let j = 0; j < 8; j++) { const a = (j * TAU) / 8; sc.line([[0, 0, FLOOR_Z + 0.002], [1.25 * Math.cos(a), 1.25 * Math.sin(a), FLOOR_Z + 0.002]], { color: P.sigma, alpha: 0.14 }); }
  }
  /** The cutaway ball: the hemisphere away from the camera is an opaque lit bowl, the near one is faint glass. */
  function ball() {
    const D = sc.facing(), e1 = unit(Math.abs(D[2]) < 0.9 ? cross(D, E3) : cross(D, E1)), e2 = cross(D, e1);
    sc.surface('bowl', (u, v) => {
      const s = Math.sin(u), c = Math.cos(u);
      return add(mul(D, -c), add(mul(e1, s * Math.cos(v)), mul(e2, s * Math.sin(v))));
    }, { u: [0, Math.PI / 2], v: [0, TAU], nu: 26, nv: 72, colors: [P.stage, P.violet], value: () => 0.18, range: [0, 1] });
    sc.glass('shell', [0, 0, 0], 1, { color: P.violet, alpha: 0.03, rim: 0.22 });
    // world-fixed latitude and longitude lines on the visible inside of the bowl
    const back = (p) => dot(p, D) < -0.03;
    const draw = (pts) => {
      let run = [];
      const flush = () => { if (run.length > 1) sc.line(run, { color: P.ink, alpha: 0.2 }); run = []; };
      for (const p of pts) { if (back(p)) run.push(mul(p, 0.994)); else flush(); }
      flush();
    };
    for (const lat of [-60, -30, 0, 30, 60]) { const z = Math.sin(lat * DEG), r = Math.cos(lat * DEG); draw(curve(96, (u) => [r * Math.cos(u * TAU), r * Math.sin(u * TAU), z])); }
    for (let j = 0; j < 12; j++) { const a = (j * TAU) / 12; draw(curve(48, (u) => { const t = (u - 0.5) * Math.PI; return [Math.cos(t) * Math.cos(a), Math.cos(t) * Math.sin(a), Math.sin(t)]; })); }
  }
  /** A small field ball on the floor ring (opaque, so the ring reads as solid). */
  function smallBall(key, c, alpha = 1) {
    sc.surface(key, (u, v) => [c[0] + SMALL_R * Math.sin(u) * Math.cos(v), c[1] + SMALL_R * Math.sin(u) * Math.sin(v), c[2] + SMALL_R * Math.cos(u)],
      { u: [0, Math.PI], v: [0, TAU], nu: 10, nv: 18, color: P.violet, alpha });
  }
  const ringPoint = (j, n, phase = -Math.PI / 2) => { const a = phase + (j * TAU) / n; return [RING_R * Math.cos(a), RING_R * Math.sin(a), RING_Z]; };
  /** The diameter a rotor runs along as θ goes round (faint violet), with the seam points ±n. */
  function diameter(key, n, alpha = 0.7) {
    sc.tube(key, [neg(n), n].map((p) => mul(p, 0.995)), { color: P.violet, width: 1.8, glow: 0.3, alpha, pick: false, occlude: false });
    sc.bead([0, 0, 0], { key: 'origin', color: P.sigma, r: 2.6 });
  }
  /** Sample θ ↦ f(θ) over the whole rail. */
  const sweep = (f, n = 180) => curve(n, (u) => f(360 * u));
  const reveal = (pts) => pts.slice(0, Math.max(2, Math.round(pts.length * S.grow)));

  function draw(m) {
    const w = stage.clientWidth, h = stage.clientHeight;
    // Fit the plate (yaw-invariant bound: its corner circle) and the ball between the title block and the legend.
    const pitch = sc.cam.pitch, top = hudBottom(), bottom = legendTop();
    const ext = FLOOR_H * Math.SQRT2, below = -FLOOR_Z * Math.cos(pitch) + ext * Math.abs(Math.sin(pitch)), above = Math.max(1, ext * Math.abs(Math.sin(pitch)) * 0.5 + 0.2);
    const unitPx = Math.min((w * 0.94) / (2 * ext), (bottom - top - 12) / (above + below));
    const slack = Math.max(0, bottom - top - 12 - (above + below) * unitPx);
    config.radius = Math.max(0.05, unitPx / Math.min(w, h));
    config.cy = (top + 6 + slack / 2 + above * unitPx) / h;
    sc.begin();
    floorPlate();
    ball();
    const g = S.grow;
    if (m.kind === 0) {
      diameter('dia', m.axis);
      tubeRuns('prodPath', reveal(sweep((t) => star(m.sigmaA, rep(t, m.axis)))), { color: P.violet, width: 2.4, glow: 0.35, occlude: false });
      sc.bead(m.sigmaA, { key: 'sigmaA', color: P.violet, r: 5.5 });
      sc.bead(m.sigmaB, { key: 'sigmaB', color: P.violet, r: 5.5 });
      sc.bead(m.product, { key: 'product', color: P.sigma, r: 6.5 });
      sc.line([m.sigmaA, m.shadowA], { color: P.violet, dash: [5, 4], alpha: 0.6 });
      sc.bead(m.shadowA, { key: 'shadowA', color: P.violet, r: 4.5, alpha: 0.85 });
      if (len(m.xiProduct) > 0.02) sc.arrow([0, 0, 0], mul(m.xiProduct, g), { color: P.cyan, width: 3 });
      sc.tag('sA', m.sigmaA, S.lens ? L('隐状态 σ<sub>A</sub>', 'state σ<sub>A</sub>') : 'σ<sub>A</sub>', 'raw backed c-vi', { dy: -16 });
      sc.tag('sB', m.sigmaB, S.lens ? L('权重旋子 σ<sub>B</sub>', 'weight σ<sub>B</sub>') : 'σ<sub>B</sub>', 'raw backed c-vi', { dy: -16 });
      sc.tag('prod', m.product, S.lens ? L('输出（无 RMSNorm）', 'output (no RMSNorm)') : 'σ<sub>A</sub> ★ σ<sub>B</sub>', 'raw backed c-sg', { dy: 18 });
      sc.tag('shA', m.shadowA, L('阴影 σ<sub>A</sub>′', 'shadow σ<sub>A</sub>′'), 'raw backed c-vi', { dy: 16 });
      if (len(m.xiProduct) > 0.12) sc.tag('xi', mul(m.xiProduct, 1.08), S.lens ? L('残差方向 ξ', 'residual ξ') : 'ξ', 'raw backed c-cy');
    } else if (m.kind === 1) {
      diameter('diaA', E1, 0.35); diameter('diaB', E2, 0.35);
      const pathAB = [[0, 0, 0], ...curve(40, (u) => rep(m.theta * u, E1))], tailAB = curve(60, (u) => star(m.gammaA, rep(m.theta * u, E2)));
      const pathBA = [[0, 0, 0], ...curve(40, (u) => rep(m.theta * u, E2))], tailBA = curve(60, (u) => star(m.gammaB, rep(m.theta * u, E1)));
      tubeRuns('ab', reveal([...pathAB, ...tailAB]), { color: P.violet, width: 2.6, glow: 0.35, occlude: false });
      tubeRuns('ba', reveal([...pathBA, ...tailBA]), { color: P.violet, width: 2.6, glow: 0.35, alpha: 0.75, occlude: false });
      if (m.deviation > 0.5) {
        const u = unit(m.relative);
        tubeRuns('dev', reveal(curve(40, (s) => star(m.ab, rep(m.deviation * s, u)))), { color: P.magenta, width: 3.2, glow: 0.6, occlude: false });
      }
      sc.bead(m.gammaA, { key: 'gA', color: P.violet, r: 5 });
      sc.bead(m.gammaB, { key: 'gB', color: P.violet, r: 5 });
      sc.bead(m.ab, { key: 'ab', color: P.sigma, r: 6 });
      sc.bead(m.ba, { key: 'ba', color: P.sigma, r: 6 });
      sc.tag('gA', m.gammaA, S.lens ? L('位置步 A', 'position step A') : 'γ<sub>A</sub>', 'raw backed c-vi', { dy: 16 });
      sc.tag('gB', m.gammaB, S.lens ? L('位置步 B', 'position step B') : 'γ<sub>B</sub>', 'raw backed c-vi', { dy: 16 });
      sc.tag('ab', m.ab, 'A → B', 'raw backed c-sg', { dy: -16 });
      sc.tag('ba', m.ba, 'B → A', 'raw backed c-sg', { dy: 16 });
      if (m.deviation > 0.5) sc.tag('dev', star(m.ab, rep(m.deviation / 2, unit(m.relative))), fmtDeg(m.deviation), 'raw backed c-mg', { dx: 30 });
    } else if (m.kind === 2) {
      const n = m.drawn, stages = Math.log2(n);
      for (let j = 0; j < n; j++) smallBall('field' + j, ringPoint(j, n));
      // butterfly stage s pairs j with j xor 2^s; each bridge arcs a little higher than the last stage
      let count = 0;
      for (let s = 0; s < stages; s++) for (let j = 0; j < n; j++) {
        const pj = j ^ (1 << s);
        if (pj < j) continue;
        const a = ringPoint(j, n), b = ringPoint(pj, n), lift = 0.12 + 0.11 * s;
        const pts = reveal(curve(24, (u) => { const p = lerp3(a, b, u); p[2] += lift * Math.sin(Math.PI * u) + SMALL_R * 0.6; return p; }));
        sc.tube('bridge' + count++, pts, { color: P.cyan, width: 1.6, glow: 0.4, alpha: 0.85, occlude: false, pick: false });
      }
      sc.line([ringPoint(0, n), [0, 0, -1]], { color: P.sigma, dash: [4, 4], alpha: 0.5 });
      diameter('dia', m.axis);
      const left = curve(30, (u) => star(rep(ELL_ANGLE * u, ELL_AXIS), m.sigma));
      const right = curve(30, (u) => star(m.lsigma, rep(RR_ANGLE * u, RR_AXIS)));
      tubeRuns('bil', reveal([...left, ...right]), { color: P.violet, width: 2.6, glow: 0.35, occlude: false });
      sc.bead(m.sigma, { key: 'sigma', color: P.violet, r: 5.5 });
      sc.bead(m.lsigma, { key: 'lsigma', color: P.violet, r: 4.5 });
      sc.bead(m.bilateralOut, { key: 'bil', color: P.sigma, r: 6 });
      sc.tag('s', m.sigma, S.lens ? L('输入场', 'input field') : 'σ', 'raw backed c-vi', { dy: -16 });
      sc.tag('ls', m.lsigma, S.lens ? L('左乘 ℓ', 'left ℓ') : 'ℓ ★ σ', 'raw backed c-vi', { dy: -16 });
      sc.tag('out', m.bilateralOut, S.lens ? L('投影输出', 'projection') : 'ℓ ★ σ ★ r', 'raw backed c-sg', { dx: 46 });
      sc.tag('ring', add(mul(ringPoint(Math.round(n * 0.25), n), 1.18), [0, 0, 0.32]), S.lens ? L(m.stages + ' 级蝶形桥', m.stages + ' butterfly stages') : L('画出 ' + n + ' / ' + group(m.K) + ' 座场', n + ' of ' + group(m.K) + ' fields'), 'raw backed c-cy', { dx: 34 });
    } else if (m.kind === 3) {
      diameter('dia', m.axis);
      if (len(m.key) > 1e-3) sc.tube('reson', [m.query, m.key], { color: P.cyan, width: 1.2 + 4.5 * m.born, glow: 0.5 * m.born, alpha: 0.25 + 0.75 * m.born, occlude: false, pick: false });
      sc.bead(m.query, { key: 'q', color: P.sigma, r: 5 });
      sc.bead(m.key, { key: 'k', color: P.violet, r: 5.5 });
      sc.bead(m.value, { key: 'v', color: P.violet, r: 5 });
      sc.ring(m.transported, { key: 'hat', color: P.violet, r: 6, normal: sc.facing() });
      if (m.softNorm > 0.004) sc.arrow([0, 0, 0], mul(m.soft, g), { color: P.magenta, width: 3 });
      if (m.stepNorm > 0.004) sc.arrow([0, 0, 0], mul(m.mid, g), { color: P.cyan, width: 3.4 });
      sc.tag('q', m.query, S.lens ? L('查询 Q', 'query Q') : 'σ̃<sub>Q</sub>', 'raw backed c-sg', { dy: 18, dx: -26 });
      sc.tag('k', m.key, S.lens ? L('键 K', 'key K') : 'σ̃<sub>K</sub>', 'raw backed c-vi', { dy: -16 });
      sc.tag('v', m.value, S.lens ? L('值 V', 'value V') : 'σ<sub>V</sub>', 'raw backed c-vi', { dy: -16 });
      sc.tag('hat', m.transported, S.lens ? L('搬运后的值', 'carried value') : 'σ<sub>t←s</sub>', 'raw backed c-vi', { dy: 18 });
      if (m.softNorm > 0.004) sc.tag('soft', mul(m.soft, 1.35), 'Softmax', 'raw backed c-mg');
      sc.tag('tft', m.stepNorm > 0.004 ? mul(m.mid, 1.35) : [0, 0, -0.16], m.stepNorm > 0.004 ? 'TFT' : L('TFT 步 = 0', 'TFT step = 0'), 'raw backed c-cy');
    } else {
      for (let j = 0; j < 7; j++) smallBall('fano' + j, ringPoint(j, 7), j === 1 || j === 3 ? 1 : 0.35);
      const k0 = ringPoint(0, 7), k1 = ringPoint(1, 7), k3 = ringPoint(3, 7);
      sc.tube('tri', [k0, k1, k3, k0].map((p) => add(p, [0, 0, SMALL_R * 0.4])), { color: P.cyan, width: 1.8, glow: 0.4, alpha: 0.8, occlude: false, pick: false });
      sc.line([k0, [0, 0, -1]], { color: P.sigma, dash: [4, 4], alpha: 0.5 });
      diameter('dia', m.axis);
      if (m.xiNorm > 0.02) sc.arrow([0, 0, 0], mul(m.xi, g), { color: P.cyan, width: 3 });
      sc.arrow([0, 0, 0], mul(m.f, g), { color: P.cyan, width: 2, dash: [5, 4] });
      tubeRuns('upd', reveal(curve(30, (u) => star(m.mid, retract(mul(m.delta, u))))), { color: P.violet, width: 2.6, glow: 0.35, occlude: false });
      sc.bead(m.mid, { key: 'mid', color: P.violet, r: 5.5 });
      sc.bead(m.out, { key: 'out', color: P.sigma, r: 6 });
      sc.tag('mid', m.mid, S.lens ? L('注意力后', 'after attention') : 'σ<sub>mid</sub>', 'raw backed c-vi', { dy: -16 });
      sc.tag('out', m.out, (S.lens ? L('层输出 ', 'layer out ') : 'σ<sub>out</sub> ') + (m.halted ? L('· 停机', '· HALT') : ''), 'raw backed c-sg', { dy: 18 });
      if (m.xiNorm > 0.12) sc.tag('xi', mul(m.xi, 1.1), S.lens ? L('门输入 ξ', 'gate ξ') : 'ξ', 'raw backed c-cy');
      sc.tag('f', mul(m.f, 1.25), 'f', 'raw backed c-cy');
      sc.tag('fano', add(mul(k3, 1.2), [0, 0, 0.3]), S.lens ? L('伙伴场 k+1, k+3', 'partners k+1, k+3') : '(0, 1, 3)', 'raw backed c-cy', { dx: -40 });
    }
    // the seam label sits on the left rim of the ball's outline, whatever the view
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    const rim = add(mul([cy, -sy, 0], Math.cos(200 * DEG)), mul([sy * sp, cy * sp, cp], Math.sin(200 * DEG)));
    sc.tag('seam', rim, L('折缝 ‖σ‖ = 1', 'seam ‖σ‖ = 1'), 'raw backed c-vi', { occlude: false, dx: -34 });
    sc.end();
    const p = sc.p(m.anchor);
    handle.hidden = TRV.still;
    handle.style.left = p[0] + 'px';
    handle.style.top = p[1] + 'px';
    fitLabels();
  }
  function hudBottom() {
    const s = stage.getBoundingClientRect(), r = $('hudTl').getBoundingClientRect();
    return TRV.thumbMode || !r.height ? 10 : Math.max(10, r.bottom - s.top + 4);
  }
  function legendTop() {
    const s = stage.getBoundingClientRect(), r = $('legend').getBoundingClientRect();
    return TRV.thumbMode || !r.height ? s.height - 10 : Math.min(s.height - 10, r.top - s.top - 4);
  }
  // Keep each tag near its anchor, inside the stage and clear of the HUD, the legend and the handle.
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const tags = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of tags) tag.style.translate = '';
    const boxes = tags.map((tag) => tag.getBoundingClientRect());
    for (const [i, b] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - b.left, bounds.right - 5 - b.right);
      const row = b.height + 4;
      for (let j = 0; j <= 2 * Math.ceil(bounds.height / row); j++) {
        const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1);
        const left = b.left + dx, right = b.right + dx, top = b.top + dy, bottom = b.bottom + dy;
        if (top < bounds.top + 4 || bottom > bounds.bottom - 4) continue;
        if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) continue;
        tags[i].style.translate = dx + 'px ' + dy + 'px';
        occupied.push({ left, right, top, bottom });
        break;
      }
    }
  }

  /* ---------- formatting ---------- */
  const minus = (s) => s.replace(/-/g, '−');
  const fmt = (x, d = 3) => minus((Math.abs(x) < 0.5 * 10 ** -d ? 0 : x).toFixed(d));
  const vec = (v, d = 3) => '(' + v.map((x) => fmt(x, d)).join(', ') + ')';
  const sci = (x) => (x === 0 ? '0' : x < 1e-3 ? minus(x.toExponential(1)).replace('e', ' × 10^').replace(/\^([−+]?)(\d+)/, (_, s, e) => sup((s === '−' ? '−' : '') + e)) : fmt(x, 4));
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '−': '⁻' };
  const sup = (s) => [...String(s)].map((c) => SUP[c] || c).join('');
  const group = (n) => n.toLocaleString('en-US');
  const fmtDeg = (x) => fmt(x, 1) + '°';
  const setText = (id, value) => { const el = $(id); if (el.textContent !== String(value)) el.textContent = String(value); };
  const setHTML = (id, value) => { const el = $(id); if (el.innerHTML !== value) el.innerHTML = value; };

  /* ---------- strip plot: one question per card ---------- */
  const stripCache = new Map();
  function stripSeries(k) {
    const key = k + ':' + (k === 3 ? S.eps0 + S.retract : k === 4 ? S.retract : '');
    if (stripCache.has(key)) return stripCache.get(key);
    let series;
    const ts = Array.from({ length: 361 }, (_, i) => i);
    if (k === 0) {
      const a = rep(A_ANGLE, A_AXIS);
      const parts = ts.map((t) => starParts(a, rep(t, B_AXIS)));
      series = [ts.map((t, i) => [t, parts[i].dp]), ts.map((t, i) => [t, parts[i].dm]), ts.map((t, i) => [t, (parts[i].dp + parts[i].dm) / 2])];
    } else if (k === 1) {
      series = [ts.map((t) => { const ab = star(rep(t, E1), rep(t, E2)), ba = star(rep(t, E2), rep(t, E1)); return [t, angleOf(star(neg(ab), ba))]; }),
        ts.map((t) => { const a = rep(t, E3), b = rep(t / 2, E3); return [t, angleOf(star(neg(star(a, b)), star(b, a)))]; })];
    } else if (k === 2) {
      const ms = Array.from({ length: 12 }, (_, i) => i + 1);
      series = [ms.map((m) => [m, Math.log10(12 * (3 * 2 ** m) ** 2)]), ms.map((m) => [m, Math.log10((33 + 6 * m) * 2 ** m)]), ms.map((m) => [m, Math.log10((45 + 6 * m) * 2 ** m)])];
    } else if (k === 3) {
      series = [ts.map((t) => { const p = born([0, 0, 0], rep(t, K_AXIS)) ** P_SHARP; return [t, p / (S.eps0 + p)]; }), ts.map((t) => [t, 1]), ts.map((t) => [t, born([0, 0, 0], rep(t, K_AXIS))])];
    } else {
      const f = xi(star(SM1, SM2));
      series = [ts.map((t) => { const mid = rep(t, MID_AXIS), x = xi(mid), d = add(cross(W1, x), bracket(x, W2, f)); return [t, len(star(neg(mid), star(mid, retract(d))))]; }), ts.map((t) => [t, len(xi(rep(t, MID_AXIS)))])];
    }
    stripCache.set(key, series);
    return series;
  }
  const STRIP_TITLES = [
    ['沿 θ：D₊ 与 D₋ 交替领先，被选中的那个从不低于 ½', 'Along θ: D₊ and D₋ take turns leading, and the chosen one never drops below ½'],
    ['沿步角 θ：三维换序差升到 120°，同轴的平面转动换序差恒为 0', 'Along the step angle θ: the 3D swap angle climbs to 120°, coaxial planar turns stay at 0'],
    ['沿场数 K = 2ᵐ（log₁₀）：稠密的 12d² 一路上冲，TFT 的 (33 + 6m)K 贴着底边', 'Along K = 2ᵐ (log₁₀): the dense 12d² climbs away, the TFT (33 + 6m)K hugs the floor'],
    ['沿失配角 θ：TFT 的总权重随共振归零，Softmax 的总权重恒为 1', 'Along the mismatch θ: the TFT total weight falls to zero with the resonance, the Softmax total stays at 1'],
    ['沿 θ：曲率门的步长 r 随 ξ 开合，在折缝处归零', 'Along θ: the step r of the curvature gate opens and shuts with ξ and vanishes at the seam']
  ];
  function strip(m) {
    const canvas = $('plot');
    if (TRV.thumbMode || !canvas.clientWidth || !canvas.clientHeight) return;
    const k = m.kind, series = stripSeries(k);
    setText('plotTitle', L(...STRIP_TITLES[k]));
    // the key sits where the curves leave room: top left, or (attention, gate) over the dip around θ = 180°
    const key = (items, at) => items.forEach(([color, label, dash], row) => {
      const y = g.invY((at ? g.Y(at[1]) : g.pt + 9) + 14 * row), x0 = at ? g.X(at[0]) : g.pl + 10;
      g.arrow([g.invX(x0), y], [g.invX(x0 + 14), y], { color, width: 2, head: false, dash });
      g.text(g.invX(x0 + 19), y, label, P.ink, { face: 'body', size: 10.5 });
    });
    let g;
    if (k === 2) {
      g = kit.plot(canvas, { x: [1, 12], y: [0, 10], pad: [30, 12, 7, 20] });
      g.axes({ xTicks: [[1, '2'], [4, '16'], [7, '128'], [10, '1024'], [12, '4096']], yTicks: [0, 2, 4, 6, 8, 10], xLabel: 'K' });
      series.forEach((pts, i) => g.line(pts, [P.magenta, P.violet, P.cyan][i], { width: i ? 2.2 : 1.8, dash: i === 2 ? [5, 4] : [] }));
      g.vline(m.m, P.amber, { width: 1.5 });
      g.dot(m.m, Math.log10(m.total), P.amber, 2.6);
      key([[P.magenta, '12d^{2}'], [P.violet, '(33 + 6m)K'], [P.cyan, L('门控 (45 + 6m)K', 'gated (45 + 6m)K'), [5, 4]]]);
      setText('plotMeta', 'K = ' + group(m.K) + ' · 12d² = ' + group(m.dense) + ' · TFT = ' + group(m.total) + ' · ' + fmt(m.ratio, 1) + '×');
      return;
    }
    const yMax = k === 0 ? Math.ceil(Math.max(...series[0].map((p) => p[1]), ...series[1].map((p) => p[1])) * 2) / 2 : k === 1 ? 180 : k === 3 ? 1.1 : 1.05;
    g = kit.plot(canvas, { x: [0, 360], y: [0, yMax], pad: [34, 12, 7, 20] });
    g.axes({ xTicks: [0, 90, 180, 270, 360].map((t) => [t, t + '°']), yTicks: k === 1 ? [0, 60, 120, 180] : k === 0 ? [0, 0.5, 1, 1.5, 2, 2.5].filter((y) => y <= yMax) : [0, 0.5, 1], yFmt: (y) => (k === 1 ? y + '°' : String(y)) });
    if (k === 0) {
      g.hline(0.5, P.dim, { dash: [3, 3] });
      g.line(series[0], P.violet, { width: 2.2 });
      g.line(series[1], P.sigma, { width: 2 });
      g.line(series[2], P.ink, { width: 1.3, dash: [5, 4], alpha: 0.75 });
      key([[P.violet, 'D_{+}'], [P.sigma, 'D_{−}'], [P.ink, '½(D_{+} + D_{−})', [5, 4]]]);
      g.vline(m.theta, P.amber, { width: 1.5 });
      g.dot(m.theta, m.chosen, P.amber, 3);
      setText('plotMeta', 'min max(D₊, D₋) = ' + fmt(Math.min(...series[0].map((p, i) => Math.max(p[1], series[1][i][1]))), 3) + ' ≥ ½');
    } else if (k === 1) {
      g.line(series[1], P.sigma, { width: 2.2 });
      g.line(series[0], P.magenta, { width: 2.2 });
      g.hline(120, P.magenta, { dash: [3, 4], alpha: 0.5 });
      key([[P.magenta, '3D-NAPE'], [P.sigma, L('同轴平面转动', 'coaxial planar turns')]]);
      g.vline(m.theta, P.amber, { width: 1.5 });
      g.dot(m.theta, m.deviation, P.amber, 3);
      setText('plotMeta', 'θ = 90° → ' + fmtDeg(series[0][90][1]) + ' · max ' + fmtDeg(Math.max(...series[0].map((p) => p[1]))));
    } else if (k === 3) {
      g.line(series[2], P.cyan, { width: 1.2, dash: [4, 4], alpha: 0.7 });
      g.line(series[1], P.magenta, { width: 2.2 });
      g.line(series[0], P.cyan, { width: 2.4 });
      key([[P.cyan, L('TFT 总权重 Σα', 'TFT total Σα')], [P.magenta, L('Softmax 总权重', 'Softmax total')], [P.cyan, L('玻恩核 b', 'Born kernel b'), [4, 4]]], [8, 0.42]);
      g.vline(m.theta, P.amber, { width: 1.5 });
      g.dot(m.theta, m.alphaSum, P.amber, 3);
      setText('plotMeta', 'ε₀ = ' + fmt(S.eps0, 3) + ' · θ = 0° → Σα = ' + fmt(series[0][0][1], 4) + ' · 180° → ' + fmt(series[0][180][1], 4));
    } else {
      g.rect(0, 0, 360, S.epsSelf, P.sigma, { alpha: 0.12 });
      g.line(series[1], P.cyan, { width: 1.4, dash: [4, 4], alpha: 0.75 });
      g.line(series[0], P.violet, { width: 2.4 });
      g.hline(S.epsSelf, P.sigma, { dash: [3, 3] });
      key([[P.violet, L('步长 r', 'step r')], [P.cyan, '‖ξ‖ = |sin θ|', [4, 4]], [P.sigma, 'ε_{self}', [3, 3]]], [148, 0.95]);
      g.vline(m.theta, P.amber, { width: 1.5 });
      g.dot(m.theta, m.r, P.amber, 3);
      setText('plotMeta', 'max r = ' + fmt(Math.max(...series[0].map((p) => p[1])), 4) + L(' · 停机阈值 ', ' · halting threshold ') + fmt(S.epsSelf, 3));
    }
  }

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE = [
    [['双分母乘法', 'DUAL DENOMINATOR'], ['3D-NAPE 和乐', '3D-NAPE HOLONOMY'], ['双侧旋子与蝴蝶桥', 'BILATERAL & BUTTERFLY'], ['玻恩—流群注意力', 'BORN–HEAP ATTENTION'], ['李三元曲率门', 'LIE-TRIPLE GATE']],
    [['无 RMSNorm 的状态更新', 'STATE WITHOUT RMSNORM'], ['位置编码', 'POSITION CODE'], ['Q/K/V/O 投影', 'Q/K/V/O PROJECTION'], ['无 Softmax 注意力', 'SOFTMAX-FREE ATTENTION'], ['无 SwiGLU 前馈', 'FEED-FORWARD WITHOUT SWIGLU']]
  ];
  const LENS_NAME = [['旋子几何', 'ROTOR GEOMETRY'], ['工程读法', 'ENGINEERING']];
  function keyQuantity(m) {
    if (m.kind === 0) return 'max(D₊, D₋) = ' + fmt(m.chosen, 3) + ' ≥ ½';
    if (m.kind === 1) return L('换序差 ', 'SWAP ') + fmtDeg(m.deviation);
    if (m.kind === 2) return '(33 + 6m)K = ' + group(m.total);
    if (m.kind === 3) return 'Σα = ' + fmt(m.alphaSum, 3);
    return 'r = ' + fmt(m.r, 3) + (m.halted ? ' ≤ ' : ' > ') + 'ε<sub>self</sub>';
  }
  function subline(m) {
    if (m.kind === 0)
      return m.mainChart
        ? L('分母 D₊ 被选中；乘积落在球内，‖σ<sub>A</sub> ★ σ<sub>B</sub>‖² = D₋/D₊ = ' + fmt(m.ratio, 3) + '。', 'D₊ is chosen; the product lies inside, ‖σ<sub>A</sub> ★ σ<sub>B</sub>‖² = D₋/D₊ = ' + fmt(m.ratio, 3) + '.')
        : L('阴影分母 D₋ 被选中；乘积落在球内，‖σ<sub>A</sub> ★ σ<sub>B</sub>‖² = D₊/D₋ = ' + fmt(m.ratio, 3) + '。', 'The shadow denominator D₋ is chosen; the product lies inside, ‖σ<sub>A</sub> ★ σ<sub>B</sub>‖² = D₊/D₋ = ' + fmt(m.ratio, 3) + '.');
    if (m.kind === 1)
      return L('两步各转 ' + fmtDeg(m.theta) + '：A → B 与 B → A 停在不同的点，二维 RoPE 换序差为 0。', 'Each step turns by ' + fmtDeg(m.theta) + ': A → B and B → A end at different points; the planar RoPE swap is 0.');
    if (m.kind === 2)
      return L('K = ' + group(m.K) + ' 座场、' + m.stages + ' 级蝶形：单层 ' + group(m.total) + ' 个参数，稠密 12d² = ' + group(m.dense) + '。', 'K = ' + group(m.K) + ' fields, ' + m.stages + ' butterfly stages: ' + group(m.total) + ' parameters per layer against a dense 12d² = ' + group(m.dense) + '.');
    if (m.kind === 3)
      return L('玻恩核 b = ' + fmt(m.born, 3) + '：青色是 TFT 的更新步，品红是权重和固定为 1 时 Softmax 的那一步。', 'Born kernel b = ' + fmt(m.born, 3) + ': cyan is the TFT step, magenta the step Softmax takes with its weights fixed to add up to 1.');
    return m.halted
      ? L('步长 r 不超过 ε<sub>self</sub>：这一层停机。', 'The step r is at most ε<sub>self</sub>: this layer halts.')
      : L('ξ 打开曲率门：σ<sub>mid</sub> 沿紫色弧走到 σ<sub>out</sub>。', 'ξ opens the gate: σ<sub>mid</sub> moves along the violet arc to σ<sub>out</sub>.');
  }
  function legendItems(m) {
    const k = m.kind, eng = S.lens === 1;
    const items = [['vi', eng ? L('概念场与状态', 'concept field and states') : L('单位球与旋子', 'unit ball and rotors')]];
    if (k === 0) items.push(['sg', L('乘积 σ<sub>A</sub> ★ σ<sub>B</sub>', 'product σ<sub>A</sub> ★ σ<sub>B</sub>')], ['cy', eng ? L('残差方向', 'residual direction') : L('正弦矢 ξ', 'sine vector ξ')]);
    if (k === 1) items.push(['sg', L('两种次序的终点', 'ends of both orders')], ['mg', L('换序差', 'swap rotor')]);
    if (k === 2) items.push(['sg', 'ℓ ★ σ ★ r'], ['cy', L('蝴蝶舒尔桥', 'butterfly bridges')]);
    if (k === 3) items.push(['cy', L('玻恩共振与 TFT 步', 'Born resonance, TFT step')], ['mg', L('Softmax 强制步', 'forced Softmax step')]);
    if (k === 4) items.push(['cy', 'ξ · f'], ['sg', 'σ<sub>out</sub>']);
    return items;
  }
  const READOUTS = [
    (m) => [
      ['被选中的分母 max(D₊, D₋)', 'Chosen denominator max(D₊, D₋)', fmt(m.chosen, 4), ' ≥ ½(D₊ + D₋) = ' + fmt(m.halfSum, 4)],
      ['D₊ · D₋', 'D₊ · D₋', fmt(m.dPlus, 4) + ' · ' + fmt(m.dMinus, 4), 'v'],
      ['乘积的模方 = min/max', 'Squared norm of the product = min/max', fmt(m.productNorm2, 4) + ' = ' + fmt(m.ratio, 4), 'c'],
      ['两条恒等式的残差 ‖N‖² − D₊D₋ · 和式', 'Residuals of the two identities ‖N‖² − D₊D₋ · sum', sci(m.normResidual) + ' · ' + sci(m.sumResidual), ''],
      ['共形标度 λ(σ<sub>B</sub>) ∈ [1, 2]', 'Conformal scale λ(σ<sub>B</sub>) ∈ [1, 2]', fmt(m.lambdaB, 4), 'v'],
      ['阴影不变 ‖ξ(σ<sub>A</sub>′) − ξ(σ<sub>A</sub>)‖', 'Shadow invariance ‖ξ(σ<sub>A</sub>′) − ξ(σ<sub>A</sub>)‖', sci(m.shadowResidual), 'c'],
      ['乘积的正弦矢 ξ', 'Sine vector ξ of the product', vec(m.xiProduct), 'c']
    ],
    (m) => [
      ['换序差（相对旋子的转角）', 'Swap angle (turn of the relative rotor)', fmtDeg(m.deviation), ' · θ = ' + fmtDeg(m.theta)],
      ['γ<sub>A</sub> ★ γ<sub>B</sub>', 'γ<sub>A</sub> ★ γ<sub>B</sub>', vec(m.ab), 'v'],
      ['γ<sub>B</sub> ★ γ<sub>A</sub>', 'γ<sub>B</sub> ★ γ<sub>A</sub>', vec(m.ba), 'v'],
      ['步长 ‖γ‖ = tan(θ/4)', 'Step ‖γ‖ = tan(θ/4)', fmt(m.stepNorm, 4), ''],
      ['同轴平面转动（RoPE）的换序差', 'Swap angle of coaxial planar turns (RoPE)', fmtDeg(m.rope), 'm'],
      ['三角 (e₁, e₂, e₃) · 反向：S、D、矩阵差', 'Triangle (e₁, e₂, e₃) · reversed: S, D, matrix gap', 'S = ' + fmt(m.triangle.S, 0) + ', D = ' + fmt(m.triangle.D, 0) + ' · ' + fmt(m.reversed.D, 0) + ' · ' + sci(Math.max(m.triangle.gap, m.reversed.gap)), 'c'],
      ['', '', '', '']
    ],
    (m) => [
      ['TFT 单层参数 (33 + 6m)K', 'TFT parameters per layer (33 + 6m)K', group(m.total), ' · ' + L('门控 ', 'gated ') + group(m.gatedTotal)],
      ['稠密单层 12d²（d = 3K）', 'Dense layer 12d² (d = 3K)', group(m.dense), 'm'],
      ['双侧旋子 24K · 蝴蝶桥 6mK', 'Bilateral rotors 24K · butterfly 6mK', group(m.bilateral) + ' · ' + group(m.butterfly), 'v'],
      ['曲率门 6K · 定常 3D-NAPE 3K', 'Curvature gate 6K · stationary 3D-NAPE 3K', group(m.gate) + ' · ' + group(m.nape), 'v'],
      ['压缩比 12d² / TFT', 'Compression 12d² / TFT', fmt(m.ratio, 1) + '×', 'c'],
      ['等距核对 |b(σ, 0) − b(ℓ★σ★r, ℓ★r)|', 'Isometry check |b(σ, 0) − b(ℓ★σ★r, ℓ★r)|', sci(m.isometryResidual), ''],
      ['蝶形桥的阴影不变 |Δ − Δ′|', 'Seam invariance of a bridge |Δ − Δ′|', sci(m.bridgeResidual), 'c']
    ],
    (m) => [
      ['总权重 Σα = S/(ε₀ + S)', 'Total weight Σα = S/(ε₀ + S)', fmt(m.alphaSum, 5), m.exact ? ' = ' + fstr(m.exact.alpha) : ''],
      ['玻恩核 b · |⟨0|ψ⟩|²', 'Born kernel b · |⟨0|ψ⟩|²', fmt(m.born, 5) + ' · ' + fmt(m.bornOverlap, 5), 'c'],
      ['真空储备的份额 ε₀/(ε₀ + S)', 'Share of the reserve ε₀/(ε₀ + S)', fmt(m.reserveShare, 5), ''],
      ['聚合矢 <span class="ob">ω</span>', 'Aggregate <span class="ob">ω</span>', vec(m.omega, 5) + (m.exact ? ' = ' + fstr(m.exact.om) + ' e₁' : ''), 'c'],
      ['TFT 更新步 ‖R(<span class="ob">ω</span>)‖', 'TFT step ‖R(<span class="ob">ω</span>)‖', fmt(m.stepNorm, 5) + (m.exact ? ' = ' + fstr(m.exact.step) : ''), 'c'],
      ['Softmax 强制步（权重和 = 1）', 'Forced Softmax step (weights add up to 1)', fmt(m.softNorm, 5), 'm'],
      ['', '', '', '']
    ],
    (m) => [
      ['步长 r = ‖(−σ<sub>mid</sub>) ★ σ<sub>out</sub>‖', 'Step r = ‖(−σ<sub>mid</sub>) ★ σ<sub>out</sub>‖', fmt(m.r, 4), (m.halted ? ' ≤ ' : ' > ') + 'ε = ' + fmt(S.epsSelf, 3)],
      ['‖ξ‖ = |sin θ|', '‖ξ‖ = |sin θ|', fmt(m.xiNorm, 4), 'c'],
      ['双线性门 ξ·f', 'Bilinear gate ξ·f', fmt(m.gateScalar, 4), 'c'],
      ['曲率门 Δ = w₁ × ξ + {ξ, w₂, f}', 'Gate Δ = w₁ × ξ + {ξ, w₂, f}', vec(m.delta), ''],
      ['σ<sub>out</sub> = σ<sub>mid</sub> ★ R(Δ)', 'σ<sub>out</sub> = σ<sub>mid</sub> ★ R(Δ)', vec(m.out), 'v'],
      ['停机', 'Halting', m.halted ? L('是：跳过后续层', 'yes: skip the later layers') : L('否', 'no'), ''],
      ['', '', '', '']
    ]
  ];
  function readouts(m) {
    const rows = READOUTS[m.kind](m);
    const [kz, ke, kv, ks] = rows[0];
    setHTML('roKeyLabel', L(kz, ke));
    setText('roKey', kv);
    setText('roKeySub', ks);
    for (let i = 1; i <= 6; i++) {
      const [z, e, v, role] = rows[i], row = $('roRow' + i);
      row.hidden = !z;
      row.className = 'wide' + (role ? ' ' + role : '');
      setHTML('roLabel' + i, z ? L(z, e) : '');
      setText('roVal' + i, v);
    }
  }
  const RETRACT_NAME = { rat: 'R<sub>rat</sub>', sqrt: 'R<sub>sqrt</sub>' };
  function render() {
    const m = ledger();
    setHTML('hudBig', `${L(...SCENE[S.lens][S.kind])} · ${keyQuantity(m)}`);
    setHTML('hudSub', subline(m));
    setHTML('legend', legendItems(m).map(([c, s]) => `<span><i class="sw ${c}"></i>${s}</span>`).join(''));
    TRV.hudFit();
    draw(m);
    strip(m);
    readouts(m);
    setHTML('roNote', L('箭头与小球的位置都是球内的真实坐标；地面、环与桥的高度是示意。重牵引用 ', 'Arrows and beads sit at their true coordinates in the ball; the floor, the ring and the bridge heights are schematic. Retraction: ') + RETRACT_NAME[S.retract] + (L('。', '.')));
    setHTML('scenePill', `TFT <strong>${L(...LENS_NAME[S.lens])}</strong>`);
    setHTML('keyPill', `θ <strong>${fmtDeg(S.theta)}</strong>`);
    setText('hint', L('拖琥珀手柄沿紫色直径转动旋子 · 拖空白处转视角 · 空格播放', 'drag the amber handle along the violet diameter · drag empty space to orbit · Space plays'));
    setText('formula', 'σ = tan(θ/4)û · ξ = sin θ û · λ = 2/(1 + ‖σ‖²) ∈ [1, 2]');
    $('lensToggleBtn').setAttribute('aria-pressed', String(S.lens === 1));
  }
  const paint = kit.painter(render, [stage, $('plot')]);

  /* ---------- the rail: the turning angle θ of the current rotor ---------- */
  const playBtn = $('playBtn');
  const clock = kit.clock({
    max: 360,
    rate: 20,
    step: 1,
    loop: true,
    range: $('now'),
    label: $('tau'),
    play: $('play'),
    speeds: $('speedChips'),
    format: (t) => 'θ ' + t.toFixed(0) + '°',
    onChange: (t, c) => {
      S.theta = t;
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  for (const id of ['rew', 'rewindBtn']) $(id).addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });

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
    bootIO.observe(stage);
  }
  function stopBootPlay() { if (bootIO) { bootIO.disconnect(); bootIO = null; } }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener('keydown', (ev) => { if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay(); }, true);

  /* ---------- controls ---------- */
  let growth = null, loading = true;
  /** After a card is picked its paths and arrows grow out from the centre (kit.tween), so the change is seen happening. */
  function startGrow(ms) {
    if (growth) growth.cancel();
    S.grow = 0;
    const token = {};
    growth = token;
    token.cancel = () => { if (token.run) token.run.cancel(); S.grow = 1; };
    token.run = kit.tween(ms, (e) => { S.grow = e; paint(); }, () => { if (growth === token) growth = null; S.grow = 1; paint(); });
  }
  /** The reader takes over: the clock pauses and no card is marked. */
  function leave(keepGrow = false) {
    stopBootPlay();
    if (!keepGrow && growth) { growth.cancel(); growth = null; }
    cards.mark(null);
    clock.pause();
  }
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    S.cam = cameras[v] ? v : 'oblique';
    sc.view(cameras[S.cam], TRV.still ? 0 : 600);
    paint();
  });
  kit.chips($('retractChips'), 'retract', (v) => { S.retract = v === 'sqrt' ? 'sqrt' : 'rat'; paint(); });
  $('lensToggleBtn').addEventListener('click', () => { S.lens = S.lens ? 0 : 1; paint(); });
  /** A slider that belongs to one card switches to that card first (as a reader would expect). */
  function own(kind) {
    const switched = S.kind !== kind;
    if (switched) cards.pick(cardsData[kind].id);
    leave(switched);
  }
  const fieldLog = kit.field($('fieldLog'), { fmt: (m) => group(2 ** m), onInput: (m) => { own(2); S.m = m; fieldLog.set(m); paint(); } });
  const reserve = kit.field($('reserve'), { fmt: (x) => x.toFixed(3), onInput: (x) => { own(3); S.eps0 = Math.round(x * 200) / 200; reserve.set(S.eps0); paint(); } });
  const halt = kit.field($('halt'), { fmt: (x) => x.toFixed(3), onInput: (x) => { own(4); S.epsSelf = Math.round(x * 200) / 200; halt.set(S.epsSelf); paint(); } });

  /* ---------- the amber handle: drag the current rotor along its diameter, or arrow keys ---------- */
  /** θ (degrees) of the stored point x·n, x ∈ [−1, 1]: tan(θ/4) = x up to the seam, the shadow side after it. */
  const thetaOf = (x) => (x >= 0 ? (4 * Math.atan(x)) / DEG : 360 - (4 * Math.atan(-x)) / DEG);
  let drag = null;
  handle.onpointerdown = (e) => {
    if (e.button > 0 || TRV.still) return;
    e.preventDefault();
    leave();
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('dragging');
    drag = { axis: ledger().axis };
  };
  handle.onpointermove = (e) => {
    if (!drag) return;
    const r = stage.getBoundingClientRect(), a = sc.p(neg(drag.axis)), b = sc.p(drag.axis);
    const dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy;
    if (l2 < 64) return;
    const u = kit.clamp(((e.clientX - r.left - a[0]) * dx + (e.clientY - r.top - a[1]) * dy) / l2, 0, 1);
    clock.set(Math.round(thetaOf(2 * u - 1) * 10) / 10);
  };
  handle.onpointerup = (e) => { if (handle.hasPointerCapture(e.pointerId)) handle.releasePointerCapture(e.pointerId); };
  handle.onlostpointercapture = () => { drag = null; handle.classList.remove('dragging'); };
  handle.onkeydown = (e) => {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    e.stopPropagation();
    leave();
    const stepDeg = e.shiftKey ? 10 : 1;
    const next = e.key === 'Home' ? 0 : e.key === 'End' ? 360 : S.theta + (e.key === 'ArrowUp' || e.key === 'ArrowRight' ? stepDeg : -stepDeg);
    clock.set(kit.clamp(next, 0, 360));
  };

  /* ---------- experiment cards ---------- */
  const NOTES = {
    'dual-denom-shadow-mrp': ['σB 转一整圈：乘积始终留在球内，跨过折缝时跳到对面，青色的 ξ 连续地走过去。', 'σB turns once round: the product stays inside the ball, jumps across when it meets the seam, and the cyan ξ passes through without a jump.'],
    'nape-nonabelian-holonomy': ['两步正交的 90° 转动换个次序，终点 (1, 1, ±1)/3 相差 120°（品红弧）。', 'Two orthogonal 90° turns in the other order end at (1, 1, ±1)/3, 120° apart (magenta arc).'],
    'butterfly-schur-bridge': ['球里是一座场的双侧旋子 ℓ ★ σ ★ r，地面上是场与青色的蝴蝶桥。', 'Inside the ball the bilateral rotor ℓ ★ σ ★ r of one field; on the floor the fields and their cyan butterfly bridges.'],
    'born-heap-attention-sinkfree': ['键转离查询：青色的 TFT 步随共振消失，品红的 Softmax 步仍在。', 'The key turns away from the query: the cyan TFT step fades with the resonance, the magenta Softmax step stays.'],
    'fano-lie-triple-curvature-gate': ['ξ 打开曲率门，σmid 沿紫色弧走到 σout；ξ 在折缝上为零时门关闭、这一层停机。', 'ξ opens the gate and σmid moves along the violet arc to σout; on the seam ξ vanishes, the gate shuts and the layer halts.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'dual-denom-shadow-mrp': ['乘积始终留在球内；被选中的分母不低于 ½。', 'The product stays inside the ball; the chosen denominator is at least ½.'],
    'nape-nonabelian-holonomy': ['换个次序，终点相差 120°（品红弧）。', 'In the other order the ends are 120° apart (magenta arc).'],
    'butterfly-schur-bridge': ['一座场的双侧旋子与地面上的青色蝴蝶桥。', 'The bilateral rotor of one field and the cyan butterfly bridges.'],
    'born-heap-attention-sinkfree': ['失配时青色的 TFT 步消失，品红的 Softmax 步仍在。', 'At a mismatch the cyan TFT step is gone, the magenta Softmax step stays.'],
    'fano-lie-triple-curvature-gate': ['ξ 打开曲率门；折缝上门关闭、这一层停机。', 'ξ opens the gate; on the seam it shuts and the layer halts.']
  };
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    clock.pause();
    Object.assign(S, { kind: cardsData.indexOf(p), cam: p.cam });
    camChips.set(p.cam, true);
    sc.view(cameras[p.cam], loading || TRV.still ? 0 : 600);
    // a card that does not play, a still and a freshly opened full page all park on the declared frame
    if (TRV.still || !p.play || (loading && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (!loading && !TRV.still) startGrow(700);
    else if (growth) { growth.cancel(); growth = null; }
    if (p.play && !TRV.still && (!loading || TRV.embed)) {
      if (loading) bootAutoplay();
      else clock.play();
    }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets,
    notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：拖琥珀手柄转动旋子，改场数、真空储备与停机阈值，换重牵引、透镜或视角。随时可以再选一张卡。', 'Free play: drag the amber handle to turn the rotor, change the fields, the reserve and the halting threshold, switch the retraction, the lens or the view. Pick a card again at any time.']
  });
  // the tour bar's card title carries the id #tourStep
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const calc = Object.freeze({ numer, dPlus, dMinus, starParts, star, xi, lam, shadow, rep, angleOf, born, rRat, rSqrt, bracket, holonomy, exactHit });
  window.TERNION_TFT_DEBUG = Object.freeze({
    calc,
    presets: cardsData.map((p) => ({ ...p })),
    constants: Object.freeze({ A_AXIS, A_ANGLE, B_AXIS, IN_AXIS, ELL_AXIS, ELL_ANGLE, RR_AXIS, RR_ANGLE, PARTNER, G_AB, K_AXIS, VALUE, P_SHARP, BETA, MID_AXIS, SM1, SM2, W1, W2 }),
    get state() {
      return { ...S, ...ledger(), preset: cards.current, play: clock.playing, blending: S.grow < 1, camera: { ...sc.cam } };
    }
  });
  window.TRV_THUMB = () => paint.now();
  cards.pick(cards.initial(cardsData[0].id));
  loading = false;
  paint.now();
})();
