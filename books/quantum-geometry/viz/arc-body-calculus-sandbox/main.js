/* ARC//CALCULUS · 极小圆弧体微积分重塑 · Minimal arc-body calculus
   One idea in five scenes: a step is a unit rotor on a minimal circular arc, with a transverse chord c = sin φ and an
   axial sagitta v = 2 sin²(φ/2) (always written so: below φ = 10⁻⁸, cos φ is exactly 1 in double precision and the
   difference with 1 cancels to zero).
     rotor    a skate ramp in the x–z plane with intrinsic equation ρ(θ) = 0.62 − 0.08θ, extruded in y; the rail moves
              the contact point P(θ), θ = (π/2)·τ/0.88 (τ = 0.88 is the vertical); at P the osculating disk, the chord,
              the sagitta and the flat slope tan θ.
     complex  f(x) = eˣ sin x near x₀ = 1: the violet sheet z = 0.22·Im f(x + iy) over the complex plane and the real fin
              z = 0.14·f(x); the rail sweeps log₁₀ ε = −20τ; the complex step against the forward difference.
     tube     N = T/ε random rotor steps of angle σ₀ε^α on the unit sphere (fixed seed), the magenta sagitta column
              Σ_sag = N·2 sin²(σ₀ε^α/2) and the latitude E[z] = (1 − v)^N; the rail moves α = 1 − τ/2. This scene and
              the Lie–Trotter readout take ε ≥ 10⁻⁶ (N ≤ 10⁶); the complex step keeps the full sweep down to 10⁻²⁰.
     stokes   the upper hemisphere cut into M geodesic triangles around a centre P; the North-Pole-regular connection
              𝒜₊ = 2 sin²(θ/2) dφ + dg with g = 0.8x + 0.45y; the rail λ fades the interior arcs, the cyan equator stays.
     shell    closed shells with M faces (tetrahedron, octahedron, one subdivision of each); F = δA and d² = 0.
   Every number is computed here. Read-only probe: window.ARC_CALCULUS_DEBUG. */
(() => {
  'use strict';
  const { kit, L } = TRV, { v3, fix, clamp } = kit, P = TRV.palette;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI, TAU = 2 * PI, DEG = PI / 180;
  const SCENES = ['rotor', 'complex', 'tube', 'stokes', 'shell'];
  /** The sagitta of a turn φ: 2 sin²(φ/2). */
  const sag = (phi) => 2 * Math.sin(phi / 2) ** 2;
  const SUP = { '-': '⁻', '−': '⁻', '.': '·', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const supStr = (s) => String(s).split('').map((ch) => SUP[ch] || ch).join('');
  /** A positive number in a short scientific form (1.30×10⁻⁷); plain decimals between 0.001 and 10⁴. */
  function sci(x, d = 2) {
    if (x === 0) return '0';
    if (!Number.isFinite(x)) return '∞';
    if (x < 0) return `−${sci(-x, d)}`;
    let e = Math.floor(Math.log10(x));
    if (e >= -3 && e < 4) return fix(x, Math.max(0, d + 1 - e));
    let m = x / 10 ** e;
    if (Number(m.toFixed(d)) >= 10) { m /= 10; e += 1; }
    return `${m.toFixed(d)}×10${supStr(e)}`;
  }
  const pct = (x, d = 1) => `${fix(100 * x, d)}%`;
  const epsText = (elog) => { const e = Math.round(elog * 10) / 10; return `10${supStr(Number.isInteger(e) ? fix(e, 0) : fix(e, 1))}`; };

  /* ---------- 2 × 2 and 3 × 3 matrices (complex entries are [re, im]) ---------- */
  const cm = { add: (a, b) => [a[0] + b[0], a[1] + b[1]], mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]] };
  const cmat = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, a, k) => cm.add(s, cm.mul(a, B[k][j])), [0, 0])));
  const cadj = (A) => A[0].map((_, j) => A.map((r) => [r[j][0], -r[j][1]]));
  const csub = (A, B) => A.map((r, i) => r.map((a, j) => [a[0] - B[i][j][0], a[1] - B[i][j][1]]));
  const cscale = (A, k) => A.map((r) => r.map((a) => [a[0] * k, a[1] * k]));
  const cmax = (A) => Math.max(...A.flat().map((a) => Math.hypot(a[0], a[1])));
  const real2 = (A) => A.map((r) => r.map((x) => [x, 0]));
  const I2 = real2([[1, 0], [0, 1]]);
  const mat3 = (A, B) => A.map((r) => B[0].map((_, j) => r[0] * B[0][j] + r[1] * B[1][j] + r[2] * B[2][j]));
  /** The rotation by the angle a about the unit axis n (Rodrigues). */
  function rot3(n, a) {
    const c = Math.cos(a), s = Math.sin(a), h = sag(a), [x, y, z] = n;
    return [[c + x * x * h, x * y * h - z * s, x * z * h + y * s], [y * x * h + z * s, c + y * y * h, y * z * h - x * s], [z * x * h - y * s, z * y * h + x * s, c + z * z * h]];
  }
  function pow3(M, n) { let R = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], B = M; while (n > 0) { if (n & 1) R = mat3(R, B); B = mat3(B, B); n = Math.floor(n / 2); } return R; }
  /** The largest singular value of a real 2 × 2 matrix, σ = ½(hypot(a + d, b − c) + hypot(a − d, b + c)): no subtraction of nearly equal squares, so it stays accurate when the two singular values coincide. */
  function norm2(M) { const a = M[0][0], b = M[0][1], c = M[1][0], d = M[1][1]; return (Math.hypot(a + d, b - c) + Math.hypot(a - d, b + c)) / 2; }

  /* ---------- scene 1: the skate ramp and the osculating rotor ---------- */
  const RA = 0.62, RB = 0.08, TH_END = 2.2, LEAD = 0.75, W = 0.42, YF = -W - 0.02, XR = 0.75, ZT = 0.95;
  const TH_MAX = (PI / 2) / 0.88;            // the rail spans θ ∈ [0, 102.27°]; τ = 0.88 is the vertical
  const TH_MAX_DEG = TH_MAX / DEG;
  const rhoOf = (th) => RA - RB * th;
  /** The ramp at tangent angle θ: ∫₀^θ ρ(t)(cos t, sin t) dt in closed form, as [x, z]. */
  function rampAt(th) { const s = Math.sin(th), c = Math.cos(th), h = sag(th); return [RA * s - RB * (th * s - h), RA * h - RB * (s - th * c)]; }
  /** Everything about one rotor step of arc length ε at the inclination θ. */
  function rotorAt(th, elog) {
    const eps = 10 ** elog, rho = rhoOf(th), kappa = 1 / rho, phi = kappa * eps, c = Math.sin(phi), v = sag(phi);
    const half = [Math.cos(phi / 2), Math.sin(phi / 2)];
    // Lagrange: u = (1, 0) before, w = (cos φ, sin φ) after; |u|²|w|² − (u·w)² against ½ΣΣ(uᵢwⱼ − uⱼwᵢ)²
    const w = [Math.cos(phi), Math.sin(phi)], lhs = (w[0] ** 2 + w[1] ** 2) - w[0] ** 2, rhs = 0.5 * 2 * (1 * w[1] - 0 * w[0]) ** 2;
    // Î = [[0, −1], [1, 0]]: skew-adjoint and unitary, Î² = −1
    const J = real2([[0, -1], [1, 0]]), Jh = cadj(J);
    const skew = cmax(cmat(I2, csub(Jh, cscale(J, -1)))), unit = cmax(csub(cmat(J, Jh), I2)), sq = cmax(csub(cmat(J, J), cscale(I2, -1)));
    // balanced summands A = U/√2, B = UÎ/√2, J = 2ABᴴ
    const U = real2([[Math.cos(th), -Math.sin(th)], [Math.sin(th), Math.cos(th)]]), A = cscale(U, Math.SQRT1_2), B = cscale(cmat(U, J), Math.SQRT1_2);
    const cross = cmax(cmat(A, cadj(B)).map((r, i) => r.map((a, j) => cm.add(a, cmat(B, cadj(A))[i][j])))), aa = cmax(csub(cmat(A, cadj(A)), cscale(I2, 0.5))), bb = cmax(csub(cmat(cadj(B), B), cscale(I2, 0.5)));
    const Jr = cscale(cmat(A, cadj(B)), 2), jsq = cmax(cmat(Jr, Jr).map((r, i) => r.map((a, j) => cm.add(a, I2[i][j]))));
    // projection probability flow: ρ = P = |0⟩⟨0|, H = ½σ_y, ρ_φ = UρU†, p = Tr(ρ_φ P), p′ = Re(i Tr(ρ_φ(HP − PH)))
    const Uq = real2([[Math.cos(phi / 2), -Math.sin(phi / 2)], [Math.sin(phi / 2), Math.cos(phi / 2)]]), Pm = real2([[1, 0], [0, 0]]);
    const H = [[[0, 0], [0, -0.5]], [[0, 0.5], [0, 0]]], rhoT = cmat(cmat(Uq, Pm), cadj(Uq));
    const comm = csub(cmat(H, Pm), cmat(Pm, H)), tr = cmat(rhoT, comm), trace = cm.add(tr[0][0], tr[1][1]);
    const prob = cm.add(cmat(rhoT, Pm)[0][0], cmat(rhoT, Pm)[1][1])[0], dprob = cm.mul([0, 1], trace)[0];
    // the Taylor tail: e^{φÎ} − (1 + φÎ) = [[−v, −(sin φ − φ)], [sin φ − φ, −v]]
    const lag = Math.abs(phi) < 1e-3 ? phi ** 3 / 6 - phi ** 5 / 120 + phi ** 7 / 5040 : phi - Math.sin(phi);   // φ − sin φ
    const tail = norm2([[-v, lag], [-lag, -v]]), tailBound = phi * phi / 2 * Math.exp(phi);
    const [x, z] = rampAt(th);
    return {
      th, deg: th / DEG, eps, elog, rho, kappa, phi, c, v, identity: (1 - v) ** 2 + c * c, rotorNorm: Math.hypot(half[0], half[1]),
      tan: Math.tan(th), cosIsOne: Math.cos(phi) === 1, x, z,
      lagrange: { lhs, rhs, diff: Math.abs(lhs - rhs) },
      J: { skew, unit, square: sq }, balanced: { cross, aa, bb, jsq },
      flow: { p: prob, dp: dprob, halfSag: 1 - v / 2, halfChord: -c / 2 },
      taylor: { tail, bound: tailBound, lag }
    };
  }
  /* the ramp body, made once: the riding surface (with the flat lead-in), the two side faces between the curve and the box */
  const RAMP = (() => {
    const n = 110, ths = Array.from({ length: n + 1 }, (_, i) => TH_END * i / n), lead = Array.from({ length: 10 }, (_, i) => -LEAD + LEAD * i / 10);
    const curve = ths.map((t) => rampAt(t));
    const ride = [];
    for (let j = 0; j <= 6; j++) {
      const y = -W + 2 * W * j / 6;
      ride.push(lead.map((x) => [x, y, 0]).concat(curve.map(([x, z]) => [x, y, z])));
    }
    // a ruling from each curve point along the outer normal (sin θ, −cos θ) to the box x ≤ XR, 0 ≤ z ≤ ZT
    const reach = ths.map((t, i) => {
      const [x, z] = curve[i], dx = Math.sin(t), dz = -Math.cos(t), cand = [];
      if (dx > 1e-12) cand.push((XR - x) / dx);
      if (dz < -1e-12) cand.push(-z / dz);
      if (dz > 1e-12) cand.push((ZT - z) / dz);
      return Math.max(0, Math.min(...cand));
    });
    const side = (y) => Array.from({ length: 7 }, (_, j) => ths.map((t, i) => { const [x, z] = curve[i], s = reach[i] * j / 6; return [x + s * Math.sin(t), y, z - s * Math.cos(t)]; }));
    const edge = lead.map((x) => [x, YF + 0.012, 0.004]).concat(curve.map(([x, z]) => [x, YF + 0.012, z]));
    return { ths, curve, ride, front: side(-W), back: side(W), edge };
  })();

  /* ---------- scene 1b: the complex step of f(x) = eˣ sin x at x₀ = 1 ---------- */
  const X0 = 1, KI = 0.22, KR = 0.14, CS = 1.1;
  const fReal = (x) => Math.exp(x) * Math.sin(x);
  const fExact = Math.exp(X0) * (Math.sin(X0) + Math.cos(X0));          // f′(1) = e(sin 1 + cos 1)
  /** f(x + iy) = e^{x+iy} sin(x + iy) as [re, im]. */
  function fC(x, y) { const ex = Math.exp(x), a = ex * Math.cos(y), b = ex * Math.sin(y), c = Math.sin(x) * Math.cosh(y), d = Math.cos(x) * Math.sinh(y); return [a * c - b * d, a * d + b * c]; }
  function stepAt(elog) {
    const eps = 10 ** elog, cs = fC(X0, eps)[1] / eps, xs = X0 + eps, fd = (fReal(xs) - fReal(X0)) / eps;
    return { elog, eps, cs, fd, exact: fExact, csErr: Math.abs(cs - fExact) / fExact, fdErr: Math.abs(fd - fExact) / fExact, swallowed: xs === X0 };
  }
  /** f″ from one complex plane, 2[f(x₀) − Re f(x₀ + iε)]/ε²: it still subtracts. */
  const secondStep = (eps) => 2 * (fReal(X0) - fC(X0, eps)[0]) / (eps * eps);
  const f2Exact = 2 * Math.exp(X0) * Math.cos(X0);
  const errCurve = (() => {
    const out = [];
    for (let i = 0; i <= 200; i++) { const s = stepAt(-i / 10); out.push({ elog: -i / 10, cs: s.csErr, fd: s.fdErr }); }
    return out;
  })();
  const SHEET = (() => {
    const nx = 36, ny = 30, rows = [], vals = [];
    for (let j = 0; j <= ny; j++) {
      const y = -0.45 + 0.9 * j / ny, row = [], vr = [];
      for (let i = 0; i <= nx; i++) { const x = 0.3 + 1.4 * i / nx, im = fC(x, y)[1]; row.push([(x - X0) * CS, y * CS, KI * im]); vr.push(im); }
      rows.push(row); vals.push(vr);
    }
    const fin = [Array.from({ length: 41 }, (_, i) => { const x = 0.3 + 1.4 * i / 40; return [(x - X0) * CS, 0, 0]; }), Array.from({ length: 41 }, (_, i) => { const x = 0.3 + 1.4 * i / 40; return [(x - X0) * CS, 0, KR * fReal(x)]; })];
    return { rows, vals, fin };
  })();

  /* ---------- scene 2: roughness, the sagitta sum and the rotor walk on the sphere ---------- */
  const SIG0 = 1, TT = 1, ND_MAX = 1000, RLOG_MIN = -6;
  /** The partition exponent of the rough path: log₁₀ ε clamped at −6, so N = T/ε ≤ 10⁶ is a safe integer that every
      CPU rounds alike (near ε = 10⁻¹⁷, one ulp of pow(10, −17) moves round(1/ε) ≈ 10¹⁷ by 16). */
  const roughLog = (elog) => Math.max(RLOG_MIN, elog);
  function roughAt(elog, alpha) {
    const rlog = roughLog(elog), eps = 10 ** rlog, N = Math.max(1, Math.round(TT * 10 ** -rlog)), phi = SIG0 * eps ** alpha, v = sag(phi), sum = N * v;
    return { elog, rlog, eps, alpha, N, phi, v, sum, meanZ: Math.exp(N * Math.log1p(-v)), lead: 0.5 * SIG0 * SIG0 * TT * eps ** (2 * alpha - 1) };
  }
  const NOISE = (() => { const r = TRV.mulberry32(20261435), g = new Float64Array(3 * ND_MAX); for (let i = 0; i < g.length; i++) g[i] = TRV.gauss(r); return g; })();
  const walkCache = new Map();
  /** One rotor walk from the North Pole: ND = min(N, 1000) steps, each a turn by φ_d in a random tangent direction,
      with N·φ² = ND·φ_d² (the same quadratic variation). */
  function walkOf(elog, alpha) {
    const R = roughAt(elog, alpha), key = `${R.rlog.toFixed(3)}|${alpha.toFixed(4)}`;
    if (walkCache.has(key)) return walkCache.get(key);
    const nd = Math.min(R.N, ND_MAX), pd = R.phi * Math.sqrt(R.N / nd);
    let n = [0, 0, 1];
    const pts = [n];
    for (let k = 0; k < nd; k++) {
      const g = [NOISE[3 * k], NOISE[3 * k + 1], NOISE[3 * k + 2]], u = v3.unit(v3.sub(g, v3.scale(n, v3.dot(g, n))));
      n = v3.unit(v3.add(v3.scale(n, Math.cos(pd)), v3.scale(u, Math.sin(pd))));
      pts.push(n);
    }
    const out = { nd, pd, pts };
    if (walkCache.size > 400) walkCache.clear();
    walkCache.set(key, out);
    return out;
  }
  /** Lie–Trotter at n steps: ‖(e^{A/n} e^{B/n})ⁿ − e^{A+B}‖_F for A = 0.8K_x, B = 0.6K_y. */
  function trotterAt(n) {
    const step = mat3(rot3([1, 0, 0], 0.8 / n), rot3([0, 1, 0], 0.6 / n)), prod = pow3(step, n), ex = rot3([0.8, 0.6, 0], 1);
    let e = 0; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) e += (prod[i][j] - ex[i][j]) ** 2;
    return { n, err: Math.sqrt(e) };
  }

  /* ---------- scene 3: the hemisphere fan and the sagitta connection ---------- */
  const GL = (() => { const n = 12, xs = [], ws = []; for (let i = 1; i <= n; i++) { let x = Math.cos(PI * (i - 0.25) / (n + 0.5)), dp = 1; for (let it = 0; it < 100; it++) { let p0 = 1, p1 = x; for (let k = 2; k <= n; k++) { const p2 = ((2 * k - 1) * x * p1 - (k - 1) * p0) / k; p0 = p1; p1 = p2; } dp = n * (x * p1 - p0) / (x * x - 1); const dx = p1 / dp; x -= dx; if (Math.abs(dx) < 1e-16) break; } xs.push((1 - x) / 2); ws.push(1 / ((1 - x * x) * dp * dp)); } return { xs, ws }; })();
  const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const gauge = (p) => 0.8 * p[0] + 0.45 * p[1];
  /** A point of the minor great-circle arc a → b at t ∈ [0, 1], and its velocity. */
  function slerp(a, b, t) {
    const om = Math.atan2(v3.len(v3.cross(a, b)), v3.dot(a, b)), so = Math.sin(om);
    if (so < 1e-12) return { p: v3.lerp(a, b, t), d: v3.sub(b, a), om };
    const ca = Math.sin((1 - t) * om) / so, cb = Math.sin(t * om) / so, da = -om * Math.cos((1 - t) * om) / so, db = om * Math.cos(t * om) / so;
    return { p: v3.add(v3.scale(a, ca), v3.scale(b, cb)), d: v3.add(v3.scale(a, da), v3.scale(b, db)), om };
  }
  /** ∫ 2 sin²(θ/2) dφ along the arc a → b; on the unit sphere 2 sin²(θ/2) dφ = (x dy − y dx)/(1 + z). Four pieces of
      12-point Gauss–Legendre. */
  function arcIntegral(a, b) {
    let s = 0;
    for (let q = 0; q < 4; q++) for (let k = 0; k < GL.xs.length; k++) {
      const { p, d } = slerp(a, b, (q + GL.xs[k]) / 4);
      s += GL.ws[k] / 4 * (p[0] * d[1] - p[1] * d[0]) / (1 + p[2]);
    }
    return s;
  }
  /** The angle at a of the spherical triangle a, b, c. */
  function angleAt(a, b, c) { const tb = v3.sub(b, v3.scale(a, v3.dot(a, b))), tc = v3.sub(c, v3.scale(a, v3.dot(a, c))); return Math.atan2(v3.len(v3.cross(tb, tc)), v3.dot(tb, tc)); }
  const girard = (a, b, c) => angleAt(a, b, c) + angleAt(b, c, a) + angleAt(c, a, b) - PI;
  const stokesCache = new Map();
  function stokesOf(M, pTh, pPh) {
    const key = `${M}|${pTh.toFixed(6)}|${pPh.toFixed(6)}`;
    if (stokesCache.has(key)) return stokesCache.get(key);
    const Pc = sph(pTh * DEG, pPh * DEG), E = Array.from({ length: M }, (_, k) => [Math.cos(TAU * k / M), Math.sin(TAU * k / M), 0]);
    const edgeInt = (a, b) => arcIntegral(a, b) + gauge(b) - gauge(a);
    const tris = E.map((b, k) => {
      const c = E[(k + 1) % M], e0 = edgeInt(Pc, b), e1 = edgeInt(b, c), e2 = edgeInt(c, Pc);
      return { k, a: Pc, b, c, edges: [e0, e1, e2], circ: e0 + e1 + e2, omega: girard(Pc, b, c) };
    });
    const pairs = tris.map((t, k) => ({ k, plus: t.edges[0], minus: tris[(k - 1 + M) % M].edges[2], sum: t.edges[0] + tris[(k - 1 + M) % M].edges[2] }));
    const rim = tris.reduce((s, t) => s + t.edges[1], 0), sumOmega = tris.reduce((s, t) => s + t.omega, 0), sumCirc = tris.reduce((s, t) => s + t.circ, 0);
    const out = {
      M, P: Pc, pTheta: pTh, pPhi: pPh, E, tris, pairs, rim, sumOmega, sumCirc,
      pairMax: Math.max(...pairs.map((p) => Math.abs(p.sum))), triMax: Math.max(...tris.map((t) => Math.abs(t.circ - t.omega))), rimErr: Math.abs(rim - sumOmega),
      graph: { V: M + 1, E: 2 * M, F: M + 1, chi: (M + 1) - 2 * M + (M + 1), rimEdges: M }
    };
    if (stokesCache.size > 300) stokesCache.clear();
    stokesCache.set(key, out);
    return out;
  }

  /* ---------- scene 3b: the closed shells ---------- */
  const dyadic = (x) => Math.round(x * 1048576) / 1048576;                 // multiples of 2⁻²⁰: sums stay exact
  /** ∫ω along the chord a → b, ω = x dy − 0.6z dx + 0.3y dz (the integrand is linear in t: the midpoint rule is exact). */
  const chordOmega = (a, b) => { const m = v3.scale(v3.add(a, b), 0.5), d = v3.sub(b, a); return m[0] * d[1] - 0.6 * m[2] * d[0] + 0.3 * m[1] * d[2]; };
  const potential = (p) => 0.9 * p[2] + 0.4 * p[0] * p[1] + 0.3 * p[0];
  const shellCache = new Map();
  function shellOf(M) {
    if (shellCache.has(M)) return shellCache.get(M);
    const s3 = 1 / Math.sqrt(3);
    let verts, faces;
    if (M === 4 || M === 16) { verts = [[s3, s3, s3], [s3, -s3, -s3], [-s3, s3, -s3], [-s3, -s3, s3]]; faces = [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]]; }
    else { verts = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]; faces = [[0, 2, 4], [2, 1, 4], [1, 3, 4], [3, 0, 4], [2, 0, 5], [1, 2, 5], [3, 1, 5], [0, 3, 5]]; }
    if (M === 16 || M === 32) {
      const mid = new Map(), at = (i, j) => { const k = i < j ? `${i},${j}` : `${j},${i}`; if (!mid.has(k)) { verts.push(v3.unit(v3.add(verts[i], verts[j]))); mid.set(k, verts.length - 1); } return mid.get(k); };
      faces = faces.flatMap(([a, b, c]) => { const ab = at(a, b), bc = at(b, c), ca = at(c, a); return [[a, ab, ca], [ab, b, bc], [ca, bc, c], [ab, bc, ca]]; });
    }
    const R0 = mat3(rot3([1, 0, 0], 0.45), rot3([0, 0, 1], 0.35));
    verts = verts.map((p) => [0, 1, 2].map((i) => R0[i][0] * p[0] + R0[i][1] * p[1] + R0[i][2] * p[2]));
    faces = faces.map(([a, b, c]) => (v3.dot(v3.cross(v3.sub(verts[b], verts[a]), v3.sub(verts[c], verts[a])), v3.add(v3.add(verts[a], verts[b]), verts[c])) < 0 ? [a, c, b] : [a, b, c]));
    const V = verts.length, F = faces.length, edgeIx = new Map(), edges = [];
    faces.forEach((f, fi) => f.forEach((a, t) => { const b = f[(t + 1) % 3], k = a < b ? `${a},${b}` : `${b},${a}`; if (!edgeIx.has(k)) { edgeIx.set(k, edges.length); edges.push({ a: Math.min(a, b), b: Math.max(a, b), faces: [] }); } edges[edgeIx.get(k)].faces.push(fi); }));
    const Ecount = edges.length;
    // the cochains: φ on vertices, A on ordered pairs (antisymmetric), both multiples of 2⁻²⁰
    const phi = verts.map((p) => dyadic(potential(p)));
    const Aof = Array.from({ length: V }, () => new Float64Array(V));
    for (let i = 0; i < V; i++) for (let j = i + 1; j < V; j++) { const a = dyadic(chordOmega(verts[i], verts[j])); Aof[i][j] = a; Aof[j][i] = -a; }
    const curlGrad = faces.map(([a, b, c]) => (phi[b] - phi[a]) + (phi[c] - phi[b]) + (phi[a] - phi[c]));
    const curlA = faces.map(([a, b, c]) => Aof[a][b] + Aof[b][c] + Aof[c][a]);
    let divCurl = 0; for (const x of curlA) divCurl += x;
    // F = δA on every triple of vertices, its tetrahedral coboundary on every quadruple, and the repair from the root 0
    const Fof = new Float64Array(V * V * V), ix = (i, j, k) => (i * V + j) * V + k;
    for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) for (let k = 0; k < V; k++) Fof[ix(i, j, k)] = Aof[j][k] - Aof[i][k] + Aof[i][j];
    let defects = 0, repairs = 0;
    for (let r = 0; r < V; r++) for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) for (let k = 0; k < V; k++) if (Fof[ix(i, j, k)] - Fof[ix(r, j, k)] + Fof[ix(r, i, k)] - Fof[ix(r, i, j)] !== 0) defects++;
    for (let i = 0; i < V; i++) for (let j = 0; j < V; j++) for (let k = 0; k < V; k++) if (Fof[ix(0, j, k)] - Fof[ix(0, i, k)] + Fof[ix(0, i, j)] !== Fof[ix(i, j, k)]) repairs++;
    // the 𝔽₂ face-boundary matrix (rows: edges, columns: faces), its rank and the boundary of all faces together
    const rows = edges.map((e) => { const r = new Uint8Array(F); e.faces.forEach((f) => { r[f] ^= 1; }); return r; });
    let rank = 0; const work = rows.map((r) => r.slice());
    for (let col = 0; col < F && rank < work.length; col++) {
      const p = work.findIndex((r, i) => i >= rank && r[col]);
      if (p < 0) continue;
      [work[rank], work[p]] = [work[p], work[rank]];
      for (let i = 0; i < work.length; i++) if (i !== rank && work[i][col]) for (let c = 0; c < F; c++) work[i][c] ^= work[rank][c];
      rank++;
    }
    const allFaces = rows.reduce((n, r) => n + (r.reduce((s, x) => s ^ x, 0)), 0);
    const omega = faces.map(([a, b, c]) => girard(verts[a], verts[b], verts[c]));
    const out = { M, V, E: Ecount, F, chi: V - Ecount + F, verts, faces, edges: edges.map((e) => [e.a, e.b, e.faces.length]), phi, curlGrad, curlA, divCurl,
      defects, quadruples: V ** 4, repairs, rank, allFacesOdd: allFaces, omega, sumOmega: omega.reduce((s, x) => s + x, 0),
      cycleDim: Ecount - V + 1, A: Aof };
    shellCache.set(M, out);
    return out;
  }

  /* ---------- state ---------- */
  const S = { scene: 'rotor', lens: false, theta: 90, elog: -0.5, alpha: 1, M: 4, pTheta: 34, pPhi: 215, lambda: 0.65, tau: 0.88 };
  /** The rail value of the scene from the state, and the state from the rail. */
  const tauOf = (scene) => (scene === 'rotor' ? S.theta / TH_MAX_DEG : scene === 'complex' ? -S.elog / 20 : scene === 'tube' ? (1 - S.alpha) / 0.5 : S.lambda);
  function fromRail(t) {
    if (S.scene === 'rotor') S.theta = Math.round(TH_MAX_DEG * t * 1e9) / 1e9;   // τ = 0.88 lands on 90° exactly
    else if (S.scene === 'complex') S.elog = -20 * t;
    else if (S.scene === 'tube') S.alpha = 1 - 0.5 * t;
    else S.lambda = t;
  }

  /** Everything the page shows, from the state. */
  function model() {
    const rot = rotorAt(S.theta * DEG, S.elog), step = stepAt(S.elog), rough = roughAt(S.elog, S.alpha);
    return { rot, step, rough, trotter: trotterAt(Math.min(rough.N, 100000)), stokes: stokesOf(S.M, S.pTheta, S.pPhi), shell: shellOf(S.M) };
  }

  /* ---------- stage ---------- */
  const stageEl = $('stage');
  const tagBox = document.createElement('div'); tagBox.className = 'tags'; stageEl.appendChild(tagBox);
  const probe = document.createElement('div'); probe.hidden = true; probe.style.position = 'absolute'; tagBox.appendChild(probe);
  const VIEWS = { rotor: [0.42, 0.26], complex: [0.62, 0.42], tube: [-0.45, 0.32], stokes: [-0.5, 0.6], shell: [-0.45, 0.4] };
  const options = { canvas: $('cv'), yaw: VIEWS.rotor[0], pitch: VIEWS.rotor[1], wheel: false, radius: 0.32, cx: 0.5, cy: 0.5, onChange: () => paint() };
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
    for (const el of [$('hudTl'), $('legend')]) { const b = boxOf(el, sr); if (b && (el.id !== 'legend' || el.textContent.trim())) out.push(b); }
    return out;
  }
  function safeRect(W, H, huds) {
    let top = 10, bottom = H - 10;
    for (const b of huds) { if (b.y + b.h / 2 < H / 2) top = Math.max(top, b.y + b.h + 6); else bottom = Math.min(bottom, b.y - 6); }
    return { x: 14, y: top, w: Math.max(40, W - 28), h: Math.max(60, bottom - top) };
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

  /* the projection is fitted to the HUD-free rect from the scene's own outline; it is held while the handle drags */
  const BALL = (() => { const out = []; for (const a of [-1, 0, 1]) for (const b of [-1, 0, 1]) for (const c of [-1, 0, 1]) if (a || b || c) out.push(v3.unit([a, b, c])); return out; })();
  const COL = { base: [1.4, -0.3, -1], h: 1.5 };
  function fitPts(scene) {
    if (scene === 'rotor') return [[-LEAD, -W, 0], [-LEAD, W, 0], [XR, -W, 0], [XR, W, 0], [XR, W, ZT], [XR, -W, ZT], [-0.62, YF, 1.24], [0.62, YF, 1.24], [0.86, YF, 1.25], [-LEAD, YF, -0.05]];
    if (scene === 'complex') { const pts = []; for (const x of [-0.77, 0.77]) for (const y of [-0.5, 0.5]) for (const z of [-0.5, 0.8]) pts.push([x, y, z]); return pts; }
    if (scene === 'tube') return BALL.concat([COL.base, v3.add(COL.base, [0, 0, COL.h + 0.12])]);
    if (scene === 'stokes') return BALL.filter((p) => p[2] >= 0).map((p) => v3.scale(p, 1.04)).concat([[0, 0, -0.06]]);
    return BALL.map((p) => v3.scale(p, 1.26));
  }
  function camAxes() {
    const cy = Math.cos(sc.cam.yaw), sy = Math.sin(sc.cam.yaw), cp = Math.cos(sc.cam.pitch), sp = Math.sin(sc.cam.pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp] };
  }
  function fitTo(area, W0, H0) {
    const { R, U } = camAxes();
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (const p of fitPts(S.scene)) { const x = v3.dot(p, R), y = v3.dot(p, U); x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
    const px = 0.04 * (x1 - x0), py = 0.04 * (y1 - y0);
    const unit = Math.max(20, Math.min(area.w / (x1 - x0 + 2 * px), area.h / (y1 - y0 + 2 * py)));
    const u = unit * (sc.cam.zoom || 1);
    options.radius = unit / Math.max(1, Math.min(W0, H0));
    options.cx = (area.x + area.w / 2 - u * (x0 + x1) / 2) / Math.max(1, W0);
    options.cy = (area.y + area.h / 2 + u * (y0 + y1) / 2) / Math.max(1, H0);
    return unit;
  }
  /** Points along the minor arc a → b on the sphere of radius r. */
  const arcPts = (a, b, n = 24, r = 1) => Array.from({ length: n + 1 }, (_, i) => v3.scale(slerp(a, b, i / n).p, r));

  /* scene 1: the ramp, the osculating rotor, the chord, the sagitta and the slope */
  function drawRotor(M, at) {
    const R = M.rot, lens = S.lens, th = R.th;
    sc.surface('ride', RAMP.ride, { color: P.lineHot, grid: { every: [10, 2], color: P.ink, alpha: 0.16 }, id: 'ramp' });
    sc.surface('front', RAMP.front, { color: P.lineHot, pick: false });
    sc.surface('back', RAMP.back, { color: P.lineHot, pick: false });
    sc.line(RAMP.edge, { color: P.ink, width: 1.6, alpha: 0.85 });
    const T = [Math.cos(th), 0, Math.sin(th)], N = [-Math.sin(th), 0, Math.cos(th)], Pt = [R.x, YF, R.z], C = v3.add(Pt, v3.scale(N, R.rho));
    const a0 = th - PI / 2, onCircle = (a, r = R.rho) => [C[0] + r * Math.cos(a), YF, C[2] + r * Math.sin(a)];
    // the osculating disk (translucent violet) and the swept sector of this step (the rotor D̂_ε, drawn at least 8°)
    const vis = Math.max(R.phi, 8 * DEG), show = Math.min(vis, PI);
    sc.surface('disk', (u, v) => onCircle(TAU * u, R.rho * v), { u: [0, 1], v: [0, 1], nu: 48, nv: 3, color: P.violet, alpha: 0.2, pick: false, occlude: false });
    sc.surface('sector', (u, v) => onCircle(a0 + show * u, R.rho * v), { u: [0, 1], v: [0, 1], nu: 16, nv: 3, color: P.violet, alpha: 0.75, pick: false, occlude: false });
    sc.line(Array.from({ length: 97 }, (_, i) => onCircle(TAU * i / 96)), { color: P.violet, width: 1.4, alpha: 0.75 });
    sc.line([C, Pt], { color: P.violet, width: 1.2, alpha: 0.7 }); sc.line([C, onCircle(a0 + show)], { color: P.violet, width: 1.2, alpha: 0.7 });
    sc.ring(C, { key: 'centre', color: P.violet, r: 4, normal: [0, -1, 0] });
    // the chord c (transverse, along T) and the sagitta v (axial, along N), drawn at the shown turn
    const cS = R.rho * Math.sin(show), vS = R.rho * sag(show), Q = v3.add(Pt, v3.scale(T, cS)), Pn = v3.add(Q, v3.scale(N, vS));
    sc.tube('chord', [Pt, Q], { color: P.cyan, width: 3.2, glow: 0.5, pick: false, occlude: false });
    sc.tube('sagitta', [Q, Pn], { color: P.magenta, width: 3.2, glow: 0.5, pick: false, occlude: false });
    sc.tube('arc', Array.from({ length: 13 }, (_, i) => onCircle(a0 + show * i / 12)), { color: P.violet, width: 3, glow: 0.45, pick: false, occlude: false });
    sc.bead(Pn, { key: 'next', color: P.violet, r: 4 });
    // the flat slope: the tangent line and the run–rise triangle tan θ, clipped where it leaves the picture
    const ZC = 1.25, ZL = -0.2, run = 0.25, base = v3.add(Pt, [run, 0, 0]), rise = run * R.tan, topZ = clamp(Pt[2] + rise, ZL, ZC), clipped = Pt[2] + rise > ZC || Pt[2] + rise < ZL;
    const tl = 0.8, tA = v3.add(Pt, v3.scale(T, -tl)), tB = v3.add(Pt, v3.scale(T, tl));
    sc.line([tA, tB], { color: P.ink, width: 1.3, dash: [5, 4], alpha: lens ? 0.95 : 0.6 });
    sc.line([Pt, base], { color: P.ink, width: 1.3, alpha: lens ? 0.95 : 0.6 });
    const riseTop = [base[0], YF, topZ];
    if (Math.abs(topZ - base[2]) > 0.01) {
      if (clipped) sc.arrow(base, riseTop, { color: P.ink, width: 1.8, headSize: 9, alpha: lens ? 1 : 0.7 });
      else sc.line([base, riseTop], { color: P.ink, width: 1.8, alpha: lens ? 1 : 0.7 });
    }
    const tanText = Math.abs(R.tan) > 1e6 ? '∞' : fix(R.tan, 2);
    at(riseTop, `dy/dx = tan θ = ${tanText}`, 'raw c-ik backed', lens ? 10 : 6, [1, clipped && rise > 0 ? -0.4 : 0.4]);
    if (lens) {
      at(v3.lerp(Pt, Q, 0.5), L('一阶项 ds', 'first order ds'), 'raw c-cy backed', 8, [0.2, 1]);
      at(v3.lerp(Q, Pn, 0.5), L('二阶项 ½κ ds²', 'second order ½κ ds²'), 'raw c-mg backed', 8, [1, 0.3]);
      at(C, L('1 + φÎ 丢掉矢高', '1 + φÎ drops the sagitta'), 'raw c-vi backed', 7, [-1, -0.4]);
    } else {
      at(v3.lerp(Pt, Q, 0.5), `c = sin κε = ${fix(R.c, 4)}`, 'raw c-cy backed', 8, [0.2, 1]);
      at(v3.lerp(Q, Pn, 0.5), `v = 2 sin²(κε/2) = ${R.v < 1e-3 ? sci(R.v, 2) : fix(R.v, 4)}`, 'raw c-mg backed', 8, [1, 0.3]);
      at(C, `(1 − v)² + c² = ${fix(R.identity, 6)}`, 'raw c-vi backed', 7, [-1, -0.4]);
    }
    at(onCircle(a0 + show / 2, R.rho * 0.6), `D̂<sub>ε</sub>`, 'raw c-vi backed', 5, [-0.6, 0.8]);
    at(Pt, `θ = ${fix(R.deg, 1)}°`, 'raw c-sg backed', 9, [-1, 0.6]);
    return { head: Pt, handle: Pt };
  }

  /* scene 1b: the violet sheet Im f over ℂ, the real fin, and the two derivative arrows at x₀ */
  function drawComplex(M, at) {
    const St = M.step, rows = SHEET.rows, ny = rows.length - 1, nx = rows[0].length - 1;
    sc.surface('sheet', rows, { color: P.violet, alpha: 0.82, grid: { every: [6, 5], color: P.ink, alpha: 0.2 }, id: 'sheet' });
    sc.surface('fin', SHEET.fin, { color: P.dim, alpha: 0.45, pick: false, occlude: false });
    sc.line(SHEET.fin[1].map((p) => [p[0], -0.004, p[2]]), { color: P.ink, width: 2.4 });
    sc.line([[-0.77 * 1.0, 0, 0.002], [0.77, 0, 0.002]], { color: P.sigma, width: 1.4, alpha: 0.9 });
    sc.line([[0, -0.5, 0.002], [0, 0.5, 0.002]], { color: P.violet, width: 1.2, dash: [4, 4], alpha: 0.9 });
    const LA = 0.55, F0 = [0, -0.006, KR * fReal(X0)], O = [0, 0, 0];
    const dirCS = v3.unit([0, 1, KI * St.cs / CS]), tanCS = v3.unit([1, 0, KR * St.cs / CS]), tanFD = v3.unit([1, 0, KR * St.fd / CS]);
    sc.arrow(O, v3.add(O, v3.scale(dirCS, LA)), { color: P.cyan, width: 3, headSize: 11 });
    sc.line([v3.add(F0, v3.scale(tanCS, -LA)), v3.add(F0, v3.scale(tanCS, LA))], { color: P.cyan, width: 1.6, dash: [5, 4] });
    sc.arrow(F0, v3.add(F0, v3.scale(tanFD, LA)), { color: P.magenta, width: 3, headSize: 11 });
    sc.bead(F0, { key: 'x0', color: P.sigma, r: 4 });
    sc.line([[0, -0.004, 0], F0], { color: P.sigma, width: 1.2, dash: [3, 3], alpha: 0.8 });
    sc.ring(O, { key: 'origin', color: P.violet, r: 5, normal: [0, 0, 1] });
    at(v3.add(O, v3.scale(dirCS, LA)), `Im f(x₀+iε)/ε = ${fix(St.cs, 4)}`, 'raw c-cy backed', 10, [0.6, -1]);
    const fdText = St.swallowed ? L('前向差分 = 0 · 误差 100%', 'forward difference = 0 · 100% off') : `${L('前向差分', 'forward difference')} = ${Math.abs(St.fd) < 1e4 ? fix(St.fd, 4) : sci(St.fd, 2)}`;
    at(v3.add(F0, v3.scale(tanFD, LA)), fdText, 'raw c-mg backed', 9, [1, 0.5]);
    at([0.66, 0.5, KI * fC(0.3 + 1.4 * 0.97, 0.45)[1]], S.lens ? L('Im f(x + iy)', 'Im f(x + iy)') : L('90° 盲面 Im f', '90° blind sheet Im f'), 'raw c-vi backed', 6, [1, -0.6]);
    at([-0.7, 0, KR * fReal(0.36)], L('实轴切片 f(x)', 'real slice f(x)'), 'raw c-ik backed', 5, [-1, -0.5]);
    at(F0, `x₀ = 1`, 'raw c-sg backed', 7, [-1, 0.4]);
    return { head: null, handle: null };
  }

  /* scene 2: the rotor walk on the sphere, the sagitta column and the mean latitude */
  function drawTube(M, at) {
    const R = M.rough, wk = walkOf(S.elog, S.alpha);
    sc.glass('ball', [0, 0, 0], 1, { color: P.dim, alpha: 0.3 });
    const disk = Array.from({ length: 65 }, (_, i) => [1.15 * Math.cos(TAU * i / 64), 1.15 * Math.sin(TAU * i / 64), -1.02]);
    sc.surface('plate', [disk.map(() => [0, 0, -1.02]), disk], { color: P.faint, pick: false });
    sc.circle([0, 0, 0], [0, 0, 1], 1, { color: P.ink, width: 1, alpha: 0.35 });
    sc.tube('walk', wk.pts.map((p) => v3.scale(p, 1.012)), { color: P.violet, width: 2.2, glow: 0.5, pick: false, occlude: false });
    const end = v3.scale(wk.pts[wk.pts.length - 1], 1.012);
    sc.bead(v3.scale([0, 0, 1], 1.012), { key: 'pole', color: P.sigma, r: 4 });
    sc.bead(end, { key: 'end', color: P.violet, r: 5 });
    // E[z] = (1 − v)^N: a magenta latitude pulled down from the pole by the sagitta
    const zr = R.meanZ, rr = Math.sqrt(Math.max(0, 1 - zr * zr));
    if (rr > 0.004) sc.circle([0, 0, zr], [0, 0, 1], rr * 1.005, { color: P.magenta, width: 2.2, dash: [6, 4], fade: false });
    sc.line([[0, 0, 1], [0, 0, zr]], { color: P.magenta, width: 1.6, alpha: 0.85 });
    // the sagitta column: height ∝ Σ_sag, the tick at ½σ₀²T = 0.5
    const top = v3.add(COL.base, [0, 0, COL.h * R.sum / 0.5]), tick = v3.add(COL.base, [0, 0, COL.h]);
    sc.tube('colTrack', [COL.base, v3.add(tick, [0, 0, 0.1])], { r: 0.012, color: P.faint, pick: false, occlude: false });
    if (R.sum > 1e-4) sc.tube('column', [COL.base, top], { r: 0.05, color: P.magenta, glow: 0.45, pick: false, occlude: false });
    sc.ring(tick, { key: 'half', color: P.ink, r: 9, normal: [0, 0, 1] });
    sc.line([v3.add(tick, [-0.16, 0, 0]), v3.add(tick, [0.16, 0, 0])], { color: P.ink, width: 1.4, dash: [3, 3] });
    at(tick, '½σ₀²T = 0.5', 'raw c-ik backed', 7, [1, -0.3]);
    at(top, `Σ<sub>sag</sub> = ${R.sum < 1e-3 ? sci(R.sum, 2) : fix(R.sum, 4)}`, 'raw c-mg backed', 10, [1, 0.4]);
    at([rr * 0.71, -rr * 0.71, zr], S.lens ? L(`伊藤漂移 E[z] = ${fix(zr, 4)}`, `Itô drift E[z] = ${fix(zr, 4)}`) : `E[z] = (1 − v)<sup>N</sup> = ${fix(zr, 4)}`, 'raw c-mg backed', 8, [-1, 0.3]);
    at(end, S.lens ? L('布朗路径', 'Brownian path') : `𝒫∏D̂<sub>ε</sub> · N = ${R.N > 1e5 ? sci(R.N, 1) : R.N}`, 'raw c-vi backed', 6, [-0.8, -0.6]);
    return { head: null, handle: top };
  }

  /* scene 3: the hemisphere fan; interior arcs ±Φ fade with λ, the cyan equator stays */
  const smooth01 = (x) => { const t = clamp(x, 0, 1); return t * t * (3 - 2 * t); };
  function drawStokes(M, at) {
    const St = M.stokes, lam = S.lambda, s = 0.84 + 0.16 * lam, fade = 1 - lam ** 4, mean = TAU / St.M;
    const floor = Array.from({ length: 73 }, (_, i) => [1.06 * Math.cos(TAU * i / 72), 1.06 * Math.sin(TAU * i / 72), -0.004]);
    sc.surface('floor', [floor.map(() => [0, 0, -0.004]), floor], { color: P.faint, pick: false });
    for (const r of [0.35, 0.7]) sc.circle([0, 0, 0], [0, 0, 1], r, { color: P.ink, width: 1, alpha: 0.18, fade: false });
    St.tris.forEach((t) => {
      const cen = v3.unit(v3.add(v3.add(t.a, t.b), t.c)), shrink = (q) => v3.unit(v3.add(cen, v3.scale(v3.sub(q, cen), s)));
      const val = t.omega / mean;
      sc.surface(`tri${t.k}`, (u, v) => shrink(v3.unit(v3.add(v3.scale(t.a, 1 - u), v3.scale(v3.add(v3.scale(t.b, 1 - v), v3.scale(t.c, v)), u)))),
        { u: [0, 1], v: [0, 1], nu: 10, nv: 10, value: () => val, colors: [P.violet, P.magenta], range: [0, 2], id: `tri${t.k}` });
      // its own boundary circulation, inset: P → E_k and E_{k+1} → P interior (fading), E_k → E_{k+1} on the rim
      const inset = (q) => v3.scale(v3.unit(v3.add(cen, v3.scale(v3.sub(q, cen), s * 0.9))), 1.006);
      const runs = [[t.a, t.b, false], [t.b, t.c, true], [t.c, t.a, false]];
      for (const [p0, p1, rim] of runs) {
        if (rim) continue;
        if (fade < 0.02) continue;
        const pts = arcPts(p0, p1, 20, 1).map(inset);
        sc.line(pts, { color: P.sigma, width: 1.6, alpha: 0.9 * fade });
        sc.arrow(pts[11], pts[13], { color: P.sigma, width: 1.6, headSize: 8, alpha: 0.9 * fade });
      }
    });
    // the rim: the surviving boundary ∂Σ
    const rim = Array.from({ length: 145 }, (_, i) => [1.008 * Math.cos(TAU * i / 144), 1.008 * Math.sin(TAU * i / 144), 0.004]);
    sc.tube('rim', rim, { color: P.cyan, width: 3.2, glow: 0.55, pick: false, occlude: false });
    for (let k = 0; k < St.M; k++) { const a = TAU * (k + 0.5) / St.M; sc.arrow([1.008 * Math.cos(a - 0.05), 1.008 * Math.sin(a - 0.05), 0.004], [1.008 * Math.cos(a + 0.05), 1.008 * Math.sin(a + 0.05), 0.004], { color: P.cyan, width: 2.4, headSize: 10 }); }
    St.E.forEach((e, k) => sc.bead(v3.scale(e, 1.004), { key: `E${k}`, color: P.sigma, r: 3.2 }));
    sc.ring([0, 0, 1.004], { key: 'north', color: P.sigma, r: 4.5, normal: [0, 0, 1] });
    sc.bead(v3.scale(St.P, 1.006), { key: 'P', color: P.sigma, r: 4 });
    // labels: one interior pair, the rim, one tile, the pole
    const front = St.tris.reduce((b, t) => { const c = v3.unit(v3.add(v3.add(t.a, t.b), t.c)); return (!b || c[1] - c[0] * 0.3 < b.key) ? { t, key: c[1] - c[0] * 0.3, c } : b; }, null);
    const pr = St.pairs[front.t.k];
    if (fade > 0.15) {
      const mid = slerp(St.P, St.E[front.t.k], 0.55).p;
      at(mid, `+Φ = ${fix(pr.plus, 4)} · −Φ = ${fix(pr.minus, 4)}`, 'raw c-sg backed', 7, [-1, -0.2]);
    }
    at([0, -1.008, 0.004], `∮∂Σ 𝒜 = ${fix(St.rim, 6)}`, 'raw c-cy backed', 10, [0.4, 1]);
    at(v3.scale(front.c, 1.01), `Ω(ΔT<sub>${front.t.k + 1}</sub>) = ${fix(front.t.omega, 4)}`, 'raw c-mg backed', 8, [1, -0.6]);
    at([0, 0, 1.004], S.lens ? L('北极正则', 'regular at the pole') : 'N', 'raw c-sg backed', 4, [0.4, -1]);
    return { head: null, handle: v3.scale(St.P, 1.006) };
  }

  /* scene 3b: the closed shell; the faces close with λ and their edge circulations cancel in pairs */
  function drawShell(M, at) {
    const Sh = M.shell, lam = S.lambda, open = 1 - smooth01(lam), fade = 1 - lam ** 4, mean = 4 * PI / Sh.F;
    Sh.faces.forEach((f, fi) => {
      const [a, b, c] = f.map((i) => Sh.verts[i]), cen = v3.unit(v3.add(v3.add(a, b), c)), off = v3.scale(cen, 0.24 * open), val = Sh.omega[fi] / mean;
      sc.surface(`face${fi}`, (u, v) => v3.add(v3.unit(v3.add(v3.scale(a, 1 - u), v3.scale(v3.add(v3.scale(b, 1 - v), v3.scale(c, v)), u))), off),
        { u: [0, 1], v: [0, 1], nu: 8, nv: 8, value: () => val, colors: [P.violet, P.magenta], range: [0.4, 1.6], id: `face${fi}` });
      for (const [p0, p1] of [[a, b], [b, c], [c, a]]) sc.line(arcPts(p0, p1, 14, 1.004).map((q) => v3.add(q, off)), { color: P.ink, width: 1, alpha: 0.4 });
      if (fade > 0.02) {
        const inset = (q) => v3.add(v3.scale(v3.unit(v3.add(cen, v3.scale(v3.sub(q, cen), 0.82))), 1.006), off);
        for (const [p0, p1] of [[a, b], [b, c], [c, a]]) {
          const pts = arcPts(p0, p1, 14, 1).map(inset);
          sc.line(pts, { color: P.sigma, width: 1.4, alpha: 0.9 * fade });
          sc.arrow(pts[7], pts[9], { color: P.sigma, width: 1.4, headSize: 7, alpha: 0.9 * fade });
        }
      }
    });
    const topV = Sh.verts.reduce((b, p) => (!b || p[2] > b[2] ? p : b), null), frontV = Sh.verts.reduce((b, p) => (!b || p[1] < b[1] ? p : b), null);
    at(v3.scale(topV, 1.05 + 0.24 * open), `V − E + F = ${Sh.V} − ${Sh.E} + ${Sh.F} = ${Sh.chi}`, 'raw c-ik backed', 9, [0.3, -1]);
    at(v3.scale(frontV, 1.05 + 0.24 * open), fade > 0.02 ? L('每条边两侧 ±A 相消', '±A cancel on every edge') : '∂²ΔT<sub>ε</sub> = ∅', 'raw c-sg backed', 8, [-0.6, 1]);
    at([1.1, 0, -0.6], `Σ curl A = ${fix(Sh.divCurl, 6)}`, 'raw c-ik backed', 7, [1, 0.6]);
    at([-1.1, 0, -0.4], `ΣΩ = ${fix(Sh.sumOmega, 4)} = 4π`, 'raw c-mg backed', 6, [-1, 0.6]);
    return { head: null, handle: null };
  }

  let FRAME = null, FIT = null, HANDLE = null;
  function drawStage(M) {
    const W0 = stageEl.clientWidth, H0 = stageEl.clientHeight, thumb = TRV.thumbMode, scene = S.scene;
    const huds = thumb ? [] : hudBoxes();
    const area = thumb ? { x: 24, y: 24, w: W0 - 48, h: H0 - 48 } : safeRect(W0, H0, huds);
    if (!dragging || !FIT) { FIT = { area }; fitTo(area, W0, H0); }
    OBST = huds.slice(); BOUNDS = { x: 6, y: 6, w: W0 - 12, h: H0 - 12 }; LB = [];
    const tags = [], at = (p, html, cls, pri, dir) => { if (!thumb) tags.push({ p, html, cls, pri, dir }); };
    sc.begin();
    const out = { rotor: drawRotor, complex: drawComplex, tube: drawTube, stokes: drawStokes, shell: drawShell }[scene](M, at);
    sc.end();
    HANDLE = out.handle;
    const hq = !thumb && HANDLE ? sc.p(HANDLE) : null;
    if (hq) OBST.push({ x: hq[0] - 18, y: hq[1] - 18, w: 36, h: 36 });
    placeHandle(hq);
    if (!thumb) {
      const cen = [W0 / 2, H0 / 2];
      tags.forEach((t, k) => {
        const q = sc.p(t.p), dir = t.dir ? [t.dir[0], t.dir[1]] : [q[0] - cen[0] || 0.01, q[1] - cen[1] || -1];
        want(`t${k}`, q, t.html, t.cls, { pri: t.pri, dir, r: 12 });
      });
      placeLabels();
    }
    FRAME = { W: W0, H: H0, area: FIT.area, handle: hq ? { x: hq[0], y: hq[1] } : null, unit: sc.unit, cx: sc.cx, cy: sc.cy, head: out.head ? sc.p(out.head) : null };
  }

  /* ---------- the handle: θ (rotor), α (tube) or the fan centre P (stokes) ---------- */
  const handle = $('calcHandle');
  let dragging = null;
  const HANDLE_SCENES = ['rotor', 'tube', 'stokes'];
  function placeHandle(q) {
    const show = !!q && !TRV.still && HANDLE_SCENES.includes(S.scene);
    handle.hidden = !show;
    if (!show) return;
    handle.style.left = `${q[0].toFixed(1)}px`; handle.style.top = `${q[1].toFixed(1)}px`;
    handle.setAttribute('aria-label', S.scene === 'rotor' ? L('沿滑板坡拖动接触点改倾角 θ', 'Drag the contact point along the ramp to change θ')
      : S.scene === 'tube' ? L('上下拖动矢高柱改粗糙度 α', 'Drag the sagitta column to change the roughness α') : L('在半球上拖动扇形中心 P', 'Drag the fan centre P over the hemisphere'));
  }
  const local = (ev) => { const b = stageEl.getBoundingClientRect(); return [ev.clientX - b.left - stageEl.clientLeft, ev.clientY - b.top - stageEl.clientTop]; };
  const rotorPoint = (deg) => { const [x, z] = rampAt(deg * DEG); return [x, YF, z]; };
  const columnTop = (alpha) => v3.add(COL.base, [0, 0, COL.h * roughAt(S.elog, alpha).sum / 0.5]);
  /** The parameter whose anchor projects nearest to the pointer. */
  function paramAt(ev) {
    const [x, y] = local(ev);
    let best = null, bd = Infinity;
    const take = (val, p) => { const q = sc.p(p), d = Math.hypot(q[0] - x, q[1] - y); if (d < bd) { bd = d; best = val; } };
    if (S.scene === 'rotor') for (let k = 0; k <= 400; k++) { const deg = TH_MAX_DEG * k / 400; take(deg, rotorPoint(deg)); }
    else if (S.scene === 'tube') for (let k = 0; k <= 400; k++) { const a = 0.5 + 0.5 * k / 400; take(a, columnTop(a)); }
    else {
      for (let i = 0; i <= 35; i++) for (let j = 0; j < 120; j++) { const t = 70 * i / 35, p = 3 * j; take([t, p], v3.scale(sph(t * DEG, p * DEG), 1.006)); }
      const [t0, p0] = best;
      for (let i = -10; i <= 10; i++) for (let j = -10; j <= 10; j++) { const t = clamp(t0 + 0.2 * i, 0, 70), p = p0 + 0.3 * j; take([t, (p + 360) % 360], v3.scale(sph(t * DEG, p * DEG), 1.006)); }
    }
    return best;
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
    const v = paramAt(ev);
    if (S.scene === 'rotor') setTheta(v); else if (S.scene === 'tube') setAlpha(v); else setCentre(v[0], v[1]);
  });
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) handle.addEventListener(type, endDrag);
  handle.addEventListener('keydown', (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(ev.key)) return;
    ev.preventDefault(); ev.stopPropagation(); leave();
    const k = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1;
    if (S.scene === 'rotor') setTheta(S.theta + 0.5 * k);
    else if (S.scene === 'tube') setAlpha(S.alpha - 0.01 * k);
    else if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') setCentre(S.pTheta - 2 * k, S.pPhi); else setCentre(S.pTheta, S.pPhi + 3 * k);
  });

  /* ---------- HUD, legend, readouts ---------- */
  const SCENE_NAMES = { rotor: ['旋子', 'Rotor'], complex: ['复步', 'Complex step'], tube: ['粗糙度', 'Roughness'], stokes: ['有限网格斯托克斯', 'Finite-mesh Stokes'], shell: ['闭壳', 'Closed shell'] };
  const LEGENDS = {
    rotor: () => [['cy', L('切弦 c', 'chord c')], ['mg', L('矢高 v', 'sagitta v')], ['vi', L('旋子圆盘 D̂<sub>ε</sub>', 'rotor disk D̂<sub>ε</sub>')], ['ik', L('切线斜率 tan θ', 'slope tan θ')]],
    complex: () => [['vi', L('90° 盲面 Im f', '90° blind sheet Im f')], ['cy', L('复步导数', 'complex step')], ['mg', L('前向差分', 'forward difference')], ['dm', L('实轴切片 f', 'real slice f')]],
    tube: () => [['vi', L('路径序旋子管', 'path-ordered rotor tube')], ['mg', L('矢高柱与 E[z] 纬圈', 'sagitta column, E[z] latitude')], ['ik', L('½σ₀²T 刻度', '½σ₀²T tick')]],
    stokes: () => [['mg', L('角盈 Ω(ΔT<sub>k</sub>)', 'excess Ω(ΔT<sub>k</sub>)')], ['cy', L('外圈 ∂Σ', 'rim ∂Σ')], ['ik', L('内棱 ±Φ（淡出）', 'interior ±Φ (fading)')]],
    shell: () => [['mg', L('角盈 Ω', 'excess Ω')], ['ik', L('面环流 ±A（淡出）', 'face circulation ±A (fading)')]]
  };
  function hudText(M) {
    const sc0 = S.scene, name = L(...SCENE_NAMES[sc0]), R = M.rot, St = M.step, Ro = M.rough, Sk = M.stokes, Sh = M.shell;
    let big, sub;
    if (sc0 === 'rotor') {
      big = `${name} · θ = ${fix(R.deg, 1)}°`;
      sub = S.lens ? L(`dy/dx = tan θ = ${Math.abs(R.tan) > 1e6 ? '∞' : fix(R.tan, 2)} · 旋子照转`, `dy/dx = tan θ = ${Math.abs(R.tan) > 1e6 ? '∞' : fix(R.tan, 2)} · the rotor turns on`)
        : `(1 − v)² + c² = ${fix(R.identity, 6)} · |D̂<sub>ε</sub>| = ${fix(R.rotorNorm, 6)}`;
    } else if (sc0 === 'complex') {
      big = `${name} · ε = ${epsText(S.elog)}`;
      sub = L(`复步误差 ${sci(St.csErr, 1)} · 前向差分 ${St.swallowed ? '100%' : sci(St.fdErr, 1)}`, `complex step off by ${sci(St.csErr, 1)} · forward difference ${St.swallowed ? '100%' : sci(St.fdErr, 1)}`);
    } else if (sc0 === 'tube') {
      big = `${name} · α = ${fix(S.alpha, 2)}`;
      sub = `Σ<sub>sag</sub> = ${Ro.sum < 1e-3 ? sci(Ro.sum, 2) : fix(Ro.sum, 4)} · N = ${Ro.N > 1e5 ? sci(Ro.N, 1) : Ro.N}`;
    } else if (sc0 === 'stokes') {
      big = `${name} · M = ${S.M}`;
      sub = `∮∂Σ 𝒜 = ΣΩ = ${fix(Sk.sumOmega, 6)} · ${L('误差', 'error')} ${fix(Sk.rimErr, 6)}`;
    } else {
      big = `${name} · M = ${S.M}`;
      sub = `V − E + F = ${Sh.chi} · Σ curl A = ${fix(Sh.divCurl, 6)}`;
    }
    $('hudBig').innerHTML = big; $('hudSub').innerHTML = sub;
    $('legend').innerHTML = LEGENDS[sc0]().map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`).join('');
  }
  const NOTES_RO = {
    rotor: ['矢高按 2 sin²(κε/2) 计算。κε 小于 10⁻⁸ 时 cos κε 在双精度里就是 1，用 1 − cos 会得到 0，而 2 sin² 仍给出正确的极小正数。', 'The sagitta is computed as 2 sin²(κε/2). Below κε = 10⁻⁸, cos κε is exactly 1 in double precision and 1 − cos would give 0, while 2 sin² still gives the right tiny positive number.'],
    complex: ['复步要求 f 在实轴上取实值并在 x₀ 附近全纯；对 |z| 这类函数不成立。用一个复平面取二阶导仍有相减。', 'The complex step needs f real on the real axis and holomorphic near x₀; it fails for functions such as |z|. A second derivative from one complex plane still subtracts.'],
    tube: ['α &gt; 1/2 时 ε → 0 矢高总和趋于 0；α = 1/2 时趋于 ½σ₀²T；α &lt; 1/2 发散（滑块不到那里）。ε 小于 10⁻⁶ 时这里按 10⁻⁶ 算（N ≤ 10⁶）。', 'For α &gt; 1/2 the sagitta sum tends to 0 as ε → 0; at α = 1/2 it tends to ½σ₀²T; below 1/2 it diverges (the slider stops short of it). Below ε = 10⁻⁶ this scene computes at 10⁻⁶ (N ≤ 10⁶).'],
    stokes: ['每个三角各自算三段弧积分；公共弧两侧的 +Φ、−Φ 由不同三角独立算出，和在 10⁻¹⁵ 以内。', 'Each triangle integrates its own three arcs; the +Φ and −Φ of a shared arc come from two triangles computed independently, and they add up to within 10⁻¹⁵.'],
    shell: ['φ 与 A 取 2⁻²⁰ 的整数倍，所以 curl grad φ、Σ curl A 与全部上边缘都是逐位的 0，不是舍入后的 0。', 'φ and A are multiples of 2⁻²⁰, so curl grad φ, Σ curl A and every coboundary are bitwise zeros, not zeros after rounding.']
  };
  const FORMULA = {
    rotor: '(1 − v)² + c² = 1 · c = sin κε · v = 2 sin²(κε/2)',
    complex: 'f′(x₀) = Im f(x₀ + iε)/ε + O(ε²)',
    tube: 'Σ<sub>sag</sub> = N · 2 sin²(½σ₀ε<sup>α</sup>) ≈ ½σ₀²Tε<sup>2α−1</sup>',
    stokes: '∮∂ΔT<sub>k</sub> 𝒜 = Ω(ΔT<sub>k</sub>) · 𝒜<sub>+</sub> = 2 sin²(θ/2) dφ + dg',
    shell: 'curl grad = 0 · div curl = 0 · ∂² = 0'
  };
  function drawText(M) {
    const R = M.rot, St = M.step, Ro = M.rough, Sk = M.stokes, Sh = M.shell, lens = S.lens;
    const keys = {
      rotor: lens ? [L('斜率 dy/dx = tan θ', 'Slope dy/dx = tan θ'), Math.abs(R.tan) > 1e6 ? '∞' : fix(R.tan, 4), L(` · 旋子模长 ${fix(R.rotorNorm, 6)}`, ` · rotor modulus ${fix(R.rotorNorm, 6)}`)]
        : [L('(1 − v)² + c²（旋子一步）', '(1 − v)² + c² (one rotor step)'), fix(R.identity, 6), ` · θ = ${fix(R.deg, 1)}°`],
      complex: [L('复步导数的相对误差', 'Relative error of the complex step'), sci(St.csErr, 2), L(` · 前向差分 ${St.swallowed ? '100%' : sci(St.fdErr, 2)}`, ` · forward difference ${St.swallowed ? '100%' : sci(St.fdErr, 2)}`)],
      tube: [lens ? L('二次变差的一半（伊藤修正）', 'Half the quadratic variation (Itô term)') : L('矢高总和 Σ<sub>sag</sub>(ε, α)', 'Sagitta sum Σ<sub>sag</sub>(ε, α)'), fix(Ro.sum, 5), ` · α = ${fix(S.alpha, 2)}`],
      stokes: [L('∮∂Σ 𝒜 与 Σ Ω(ΔT<sub>k</sub>)', '∮∂Σ 𝒜 and Σ Ω(ΔT<sub>k</sub>)'), fix(Sk.rim, 6), L(` · 差 ${fix(Sk.rimErr, 6)}`, ` · gap ${fix(Sk.rimErr, 6)}`)],
      shell: [L('闭壳上 Σ curl A', 'Σ curl A on the closed shell'), fix(Sh.divCurl, 6), ` · V − E + F = ${Sh.chi}`]
    }[S.scene];
    $('roKeyLabel').innerHTML = keys[0]; $('roKey').innerHTML = keys[1]; $('roKeySub').innerHTML = keys[2];
    $('roChordLabel').innerHTML = lens ? L('一阶项：转角 φ = κε 与导数 f′(x₀)', 'First order: the turn φ = κε and f′(x₀)') : L('横向切弦 c = sin κε 与复步导数', 'Transverse chord c = sin κε and the complex step');
    $('roChord').innerHTML = lens ? `φ = ${R.phi < 1e-3 ? sci(R.phi, 3) : fix(R.phi, 5)} · Im f(x₀+iε)/ε = ${fix(St.cs, 6)}`
      : `c = ${R.c < 1e-3 ? sci(R.c, 3) : fix(R.c, 6)} · Im f(x₀+iε)/ε = ${fix(St.cs, 6)}`;
    $('roSagLabel').innerHTML = lens ? L('二阶项：玻恩权重 p = 1 − v/2 与 p′ = −c/2', 'Second order: Born weight p = 1 − v/2, p′ = −c/2') : L('轴向矢高 v = 2 sin²(κε/2)', 'Axial sagitta v = 2 sin²(κε/2)');
    $('roSag').innerHTML = lens ? `p = ${fix(R.flow.p, 6)} · p′ = ${fix(R.flow.dp, 6)}`
      : `v = ${R.v < 1e-3 ? sci(R.v, 3) : fix(R.v, 6)}${R.cosIsOne ? L(' · cos κε 舍入成 1，1 − cos 会给 0', ' · cos κε rounds to 1, 1 − cos would give 0') : ''}`;
    $('roRotorLabel').innerHTML = lens ? L('泰勒尾项 ‖e<sup>φÎ</sup> − (1 + φÎ)‖ 与 Î² = −1', 'Taylor tail ‖e<sup>φÎ</sup> − (1 + φÎ)‖ and Î² = −1') : L('旋子 |D̂<sub>ε</sub>| 与 Î² = −1', 'Rotor |D̂<sub>ε</sub>| and Î² = −1');
    $('roRotor').innerHTML = lens ? `${R.taylor.tail < 1e-3 ? sci(R.taylor.tail, 2) : fix(R.taylor.tail, 5)} ≤ ${R.taylor.bound < 1e-3 ? sci(R.taylor.bound, 2) : fix(R.taylor.bound, 5)} · Î² + 1 = ${fix(R.J.square, 1)}`
      : `|D̂<sub>ε</sub>| = ${fix(R.rotorNorm, 6)} · (1 − v)² + c² = ${fix(R.identity, 6)} · Î² + 1 = ${fix(R.J.square, 1)}`;
    $('roRoughLabel').innerHTML = lens ? L('二次变差与李—特罗特误差', 'Quadratic variation and the Lie–Trotter error') : L('粗糙度：矢高总和与平均高度', 'Roughness: sagitta sum and mean height');
    $('roRough').innerHTML = lens ? `½Σφ² ≈ ${fix(Ro.lead, 5)} · Trotter n = ${M.trotter.n}: ${sci(M.trotter.err, 2)}`
      : `Σ<sub>sag</sub> = ${fix(Ro.sum, 5)} · E[z] = ${fix(Ro.meanZ, 4)} · N = ${Ro.N > 1e5 ? sci(Ro.N, 1) : Ro.N}`;
    $('roStokesLabel').innerHTML = lens ? L('∮ 𝒜 = ∬ d𝒜 与 d² = 0', '∮ 𝒜 = ∬ d𝒜 and d² = 0') : L('有限网格斯托克斯与闭壳', 'Finite-mesh Stokes and the closed shell');
    $('roStokes').innerHTML = `${L('内棱对', 'pairs')} ${fix(Sk.pairMax, 6)} · ∮∂Σ − ΣΩ = ${fix(Sk.rimErr, 6)} · ${L('闭壳', 'shell')} V − E + F = ${Sh.chi}, ${L('上边缘', 'coboundaries')} ${Sh.defects}/${Sh.quadruples}`;
    $('roNote').innerHTML = L(...NOTES_RO[S.scene]);
    const pill = { rotor: ['θ', `${fix(R.deg, 1)}°`], complex: ['ε', epsText(S.elog)], tube: ['α', fix(S.alpha, 2)], stokes: ['M', `${S.M}`], shell: ['M', `${S.M}`] }[S.scene];
    $('scenePill').innerHTML = `${pill[0]} <strong>${pill[1]}</strong>`;
    $('keyPill').innerHTML = `|D̂<sub>ε</sub>| <strong>${fix(R.rotorNorm, 6)}</strong>`;
    $('hint').innerHTML = S.scene === 'rotor' ? L('拖琥珀圆环沿坡移动 · 拖空白处转视角', 'drag the amber ring along the ramp · drag empty space to orbit')
      : S.scene === 'tube' ? L('拖琥珀圆环拉矢高柱 · 拖空白处转视角', 'drag the amber ring on the column · drag empty space to orbit')
        : S.scene === 'stokes' ? L('拖琥珀圆环移动 P · 拖空白处转视角', 'drag the amber ring to move P · drag empty space to orbit') : L('拖空白处转视角', 'drag empty space to orbit');
    $('formula').innerHTML = FORMULA[S.scene];
  }

  /* ---------- strip plot ---------- */
  const PLOTS = {
    rotor: ['沿时间轴：斜率 tan θ 在 90° 炸开，旋子模长一直是 1', 'Along the rail: the slope tan θ blows up at 90°, the rotor modulus stays 1'],
    complex: ['相对误差对 log₁₀ ε：复步不相减，前向差分被舍入吃掉', 'Relative error against log₁₀ ε: the complex step does not subtract, the forward difference is eaten by rounding'],
    tube: ['矢高总和对 α：ε 越小，越像在 α = 1/2 处跳变', 'Sagitta sum against α: the smaller ε, the sharper the jump at α = 1/2'],
    stokes: ['每个三角：边界环流（青点）落在角盈柱（品红）顶上', 'Each triangle: its boundary circulation (cyan dot) sits on top of its excess (magenta bar)'],
    shell: ['逐面累加 curl A：走完闭壳回到 0', 'curl A summed face by face: back to 0 after the whole shell']
  };
  let PLOT = null;
  function drawPlot(M) {
    const cv = $('plot');
    if (TRV.thumbMode || !cv.clientWidth || !cv.clientHeight) return;
    const pad = [42, 12, 10, 22], sc0 = S.scene;
    $('plotTitle').innerHTML = L(...PLOTS[sc0]);
    let meta = '';
    PLOT = { scene: sc0 };
    if (sc0 === 'rotor') {
      const YT = 6, g = kit.plot(cv, { x: [0, TH_MAX_DEG], y: [-YT, YT], pad });
      g.axes({ xTicks: [0, 30, 60, 90], yTicks: [-4, 0, 4], xLabel: 'θ', xFmt: (v) => `${v}°` });
      g.vline(90, P.dim, { dash: [3, 3], width: 1 });
      // tan θ inside the window |tan θ| ≤ 6, cut where it leaves; arrows mark where it runs off and where it comes back
      const segs = [];
      let seg = [];
      for (let i = 0; i <= 800; i++) {
        const d = TH_MAX_DEG * i / 800, y = Math.tan(d * DEG);
        if (Math.abs(y) <= YT && Math.abs(d - 90) > 1e-6) seg.push([d, y]);
        else if (seg.length) { segs.push(seg); seg = []; }
      }
      if (seg.length) segs.push(seg);
      segs.forEach((q, k) => {
        if (q.length > 1) g.line(q, P.ink, { width: 2 });
        const n = q.length;
        if (n > 4 && Math.abs(q[n - 1][1]) > YT - 1) g.arrow(q[n - 4], q[n - 1], { color: P.ink, width: 2, headSize: 7 });
        if (k > 0 && n > 4) g.arrow(q[0], q[3], { color: P.ink, width: 2, headSize: 7 });
      });
      g.line([[0, 1], [TH_MAX_DEG, 1]], P.violet, { width: 2.4 });
      g.vline(S.theta, P.sigma, { alpha: 0.85 }); g.dot(S.theta, 1, P.sigma, 3.8);
      meta = `<span class="c-vi">|D̂<sub>ε</sub>| = 1</span> · tan θ = ${Math.abs(M.rot.tan) > 1e6 ? '∞' : fix(M.rot.tan, 2)}`;
    } else if (sc0 === 'complex') {
      const g = kit.plot(cv, { x: [-20, 0], y: [-17, 1], pad });
      g.axes({ xTicks: [-20, -16, -12, -8, -4, 0], yTicks: [-16, -12, -8, -4, 0], xLabel: 'log₁₀ ε', yFmt: (v) => `${v}` });
      const lg = (e) => Math.min(1, Math.log10(Math.max(e, 2 ** -53)));   // the floor is the unit roundoff 2⁻⁵³
      g.line(errCurve.map((p) => [p.elog, lg(p.fd)]), P.magenta, { width: 2 });
      g.line(errCurve.map((p) => [p.elog, lg(p.cs)]), P.cyan, { width: 2.4 });
      g.vline(S.elog, P.sigma, { alpha: 0.85 }); g.dot(S.elog, lg(M.step.csErr), P.sigma, 3.6);
      meta = `<span class="c-cy">${L('复步', 'complex step')}</span> · <span class="c-mg">${L('前向差分', 'forward difference')}</span> · log₁₀ ${L('相对误差', 'rel. error')}`;
    } else if (sc0 === 'tube') {
      const g = kit.plot(cv, { x: [0.5, 1], y: [0, 0.6], pad });
      g.axes({ xTicks: [0.5, 0.6, 0.7, 0.8, 0.9, 1], yTicks: [0, 0.25, 0.5], xLabel: 'α', xFmt: (v) => fix(v, 1) });
      g.hline(0.5, P.dim, { dash: [4, 4], width: 1 });
      const as = Array.from({ length: 101 }, (_, i) => 0.5 + 0.005 * i);
      for (const el of [-2, -6]) g.line(as.map((a) => [a, roughAt(el, a).sum]), P.magenta, { width: 1.4, alpha: 0.35, dash: [4, 3] });
      g.line(as.map((a) => [a, roughAt(S.elog, a).sum]), P.magenta, { width: 2.4 });
      g.vline(S.alpha, P.sigma, { alpha: 0.85 }); g.dot(S.alpha, M.rough.sum, P.sigma, 3.8);
      meta = `<span class="c-mg">ε = ${epsText(M.rough.rlog)}</span> · ${L('虚线', 'dashed')} ε = 10⁻², 10⁻⁶`;
    } else if (sc0 === 'stokes') {
      const St = M.stokes, ymax = Math.max(...St.tris.map((t) => t.omega)) * 1.25;
      const g = kit.plot(cv, { x: [0.4, St.M + 0.6], y: [0, ymax], pad });
      g.axes({ xTicks: St.M <= 8 ? St.tris.map((t) => t.k + 1) : [1, St.M / 4, St.M / 2, 3 * St.M / 4, St.M], yTicks: [0, ymax / 2.5, ymax / 1.25].map((v) => Number(v.toFixed(2))), xLabel: 'k' });
      St.tris.forEach((t) => { g.rect(t.k + 1 - 0.32, 0, t.k + 1 + 0.32, t.omega, P.magenta, { alpha: 0.75 }); g.dot(t.k + 1, t.circ, P.cyan, 3.4); });
      meta = `Σ Ω = ${fix(St.sumOmega, 6)} · ∮∂Σ 𝒜 = ${fix(St.rim, 6)}`;
    } else {
      const Sh = M.shell, run = [[0.5, 0]];
      let acc = 0; Sh.curlA.forEach((x, i) => { acc += x; run.push([i + 1.5, acc]); });
      const lim = Math.max(0.2, ...Sh.curlA.map(Math.abs), ...run.map((p) => Math.abs(p[1]))) * 1.15;
      const g = kit.plot(cv, { x: [0.4, Sh.F + 0.6], y: [-lim, lim], pad });
      g.axes({ xTicks: Sh.F <= 8 ? Sh.curlA.map((_, i) => i + 1) : [1, Sh.F / 4, Sh.F / 2, 3 * Sh.F / 4, Sh.F], yTicks: [-Number((lim / 1.6).toFixed(2)), 0, Number((lim / 1.6).toFixed(2))], xLabel: L('面', 'face') });
      g.hline(0, P.dim, { width: 1 });
      Sh.curlA.forEach((x, i) => g.rect(i + 1 - 0.3, Math.min(0, x), i + 1 + 0.3, Math.max(0, x), P.violet, { alpha: 0.7 }));
      g.line(run, P.ink, { width: 2 }); g.dot(Sh.F + 0.5, acc, P.ink, 3.4);
      meta = `<span class="c-vi">curl A</span> · ${L('累加', 'running sum')} → ${fix(acc, 6)}`;
    }
    $('plotMeta').innerHTML = meta;
  }

  const paint = kit.painter(() => {
    const M = model();
    hudText(M); TRV.hudFit();
    drawStage(M); drawText(M); drawPlot(M);
  }, [stageEl, $('plot')]);

  /* ---------- the rail ---------- */
  const RATES = { rotor: 0.11, complex: 0.09, tube: 0.12, stokes: 0.14, shell: 0.14 };
  const playBtn = $('playBtn');
  const clock = kit.clock({
    range: $('now'), play: $('play'), label: $('tau'), speeds: $('speedChips'), max: 1, t: S.tau, rate: RATES.rotor, step: 0.01, loop: true,
    format: (t) => (S.scene === 'rotor' ? `θ ${fix(TH_MAX_DEG * t, 1)}° <small>/ ${fix(TH_MAX_DEG, 1)}°</small>`
      : S.scene === 'complex' ? `log ε ${fix(-20 * t, 1)} <small>/ −20</small>` : S.scene === 'tube' ? `α ${fix(1 - 0.5 * t, 2)} <small>1 → ½</small>` : `λ ${fix(t, 2)} <small>/ 1</small>`),
    onChange: (t, C) => {
      S.tau = t;
      fromRail(t); syncFields();
      playBtn.textContent = C.playing ? '❚❚' : '▷'; playBtn.setAttribute('aria-pressed', String(C.playing)); paint();
    }
  });
  playBtn.addEventListener('click', () => { stopBootPlay(); clock.toggle(); });
  $('rewindBtn').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  $('rew').addEventListener('click', () => { stopBootPlay(); clock.pause(); clock.set(0); });
  let bootIO = null;
  function bootPlay() {
    if (TRV.still) return;
    if (!TRV.embed || !window.IntersectionObserver) { clock.play(); return; }
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
  let booting = true;
  function leave() { stopBootPlay(); cards.mark(null); clock.pause(); }
  function syncFields() { fTurn.set(Math.round(S.theta * 10) / 10); fLog.set(Math.round(S.elog * 10) / 10); fAlpha.set(Math.round(S.alpha * 100) / 100); fMesh.set(Math.log2(S.M)); }
  function setScene(v, quiet) {
    S.scene = SCENES.includes(v) ? v : 'rotor';
    sceneSwitch.set(S.scene, true);
    clock.rate = RATES[S.scene];
    clock.set(clamp(tauOf(S.scene), 0, 1), true);
    S.tau = clock.t;
    if (!quiet) paint();
  }
  /** Each setter writes the state and, where the scene runs that parameter on the rail, the rail too. */
  function setTheta(v, quiet) { S.theta = clamp(Math.round(v * 10) / 10, 0, TH_MAX_DEG); if (S.scene === 'rotor') { clock.set(S.theta / TH_MAX_DEG, true); S.tau = clock.t; } syncFields(); if (!quiet) paint(); }
  function setLog(v, quiet) { S.elog = clamp(Math.round(v * 10) / 10, -20, 0); if (S.scene === 'complex') { clock.set(-S.elog / 20, true); S.tau = clock.t; } syncFields(); if (!quiet) paint(); }
  function setAlpha(v, quiet) { S.alpha = clamp(Math.round(v * 100) / 100, 0.5, 1); if (S.scene === 'tube') { clock.set((1 - S.alpha) / 0.5, true); S.tau = clock.t; } syncFields(); if (!quiet) paint(); }
  function setMesh(v, quiet) { S.M = 2 ** clamp(Math.round(v), 2, 5); syncFields(); if (!quiet) paint(); }
  function setCentre(t, p, quiet) { S.pTheta = clamp(Math.round(t * 10) / 10, 0, 70); S.pPhi = ((Math.round(p * 10) / 10) % 360 + 360) % 360; if (!quiet) paint(); }
  function setLambda(v, quiet) { S.lambda = clamp(v, 0, 1); if (S.scene === 'stokes' || S.scene === 'shell') { clock.set(S.lambda, true); S.tau = clock.t; } if (!quiet) paint(); }
  const fTurn = kit.field($('turnAngle'), { fmt: (v) => `θ = ${fix(v, 1)}°`, onInput: (v) => { leave(); setTheta(v); } });
  const fLog = kit.field($('apertureLog'), { fmt: (v) => `ε = ${epsText(v)}`, onInput: (v) => { leave(); setLog(v); } });
  const fAlpha = kit.field($('roughAlpha'), { fmt: (v) => `α = ${fix(v, 2)}`, onInput: (v) => { leave(); setAlpha(v); } });
  const fMesh = kit.field($('meshM'), { fmt: (v) => `M = ${2 ** Math.round(v)}`, onInput: (v) => { leave(); setMesh(v); } });
  const sceneSwitch = kit.chips($('sceneSwitch'), 'scene', (v) => { leave(); setScene(v, true); sc.view(VIEWS[S.scene], TRV.still ? 0 : 600); paint(); });
  const lensBtn = $('lensToggleBtn');
  function setLens(on) { S.lens = !!on; lensBtn.setAttribute('aria-pressed', String(S.lens)); paint(); }
  lensBtn.addEventListener('click', (ev) => { setLens(!S.lens); if (ev.detail > 0) { if (!stageEl.hasAttribute('tabindex')) stageEl.setAttribute('tabindex', '-1'); stageEl.focus({ preventScroll: true }); } });

  /* ---------- experiment cards ---------- */
  const PRESETS = {
    'osculating-rotor-vs-tangent': { scene: 'rotor', theta: 90, elog: -0.5, alpha: 1, M: 4, lambda: 0.65, play: true, still: 0.88 },
    'blind-zone-complex-step': { scene: 'complex', theta: 90, elog: -17, alpha: 1, M: 4, lambda: 0.65, play: true, still: 0.85 },
    'roughness-ito-phase-transition': { scene: 'tube', theta: 90, elog: -3, alpha: 0.5, M: 4, lambda: 0.65, play: true, still: 'end' },
    'finite-mesh-stokes-cancellation': { scene: 'stokes', theta: 90, elog: -0.5, alpha: 1, M: 4, lambda: 0.65, play: true, still: 0.65 },
    'coboundary-d2-zero-closed-shell': { scene: 'shell', theta: 90, elog: -0.5, alpha: 1, M: 8, lambda: 1, play: true, still: 'end' }
  };
  const NOTES = {
    'osculating-rotor-vs-tangent': ['时间轴把接触点沿滑板坡推上去，倾角 θ 从 0 转到 102°。紫色圆盘是密切圆，青色是横向切弦 c，品红是轴向矢高 v，两段拼出 (1 − v)² + c² = 1。θ = 90° 时白色的斜率线 tan θ 冲出画面，过了竖直从下面回来；紫色旋子照转，模长一直是 1。', 'The rail pushes the contact point up the skate ramp, turning θ from 0 to 102°. The violet disk is the osculating circle, cyan is the transverse chord c, magenta the axial sagitta v, and together they make (1 − v)² + c² = 1. At θ = 90° the white slope line tan θ leaves the picture and comes back from below past the vertical; the violet rotor turns on, its modulus always 1.'],
    'blind-zone-complex-step': ['时间轴把 log₁₀ ε 从 0 推到 −20。紫色曲面是 Im f 在复平面上的切片，沿实轴为 0；青色箭头向 90° 盲面迈出 iε。ε = 10⁻¹⁷：青色导数仍是 3.7560，误差在机器精度；品红前向差分倒成水平，f(x₀ + ε) − f(x₀) = 0，误差 100%。下面的条带是误差对 log₁₀ ε。', 'The rail pushes log₁₀ ε from 0 to −20. The violet sheet is Im f over the complex plane, zero along the real axis; the cyan arrow steps iε into the 90° blind sheet. At ε = 10⁻¹⁷ the cyan derivative is still 3.7560, exact to machine precision; the magenta forward difference lies flat, f(x₀ + ε) − f(x₀) = 0, 100% off. The strip below plots the error against log₁₀ ε.'],
    'roughness-ito-phase-transition': ['ε = 10⁻³，N = 1000 步。时间轴把粗糙度 α 从 1 推到 1/2。紫色管是球上的随机旋子路径：α = 1 时几乎不离北极，α = 1/2 时从北极游到中纬度。品红柱是矢高总和，从 0.0005 升到 0.5000，停在刻度 ½σ₀²T = 0.5；品红纬圈 E[z] = (1 − v)ᴺ 降到 0.6065。', 'ε = 10⁻³, N = 1000 steps. The rail pushes the roughness α from 1 to 1/2. The violet tube is a random rotor path on the sphere: at α = 1 it hardly leaves the North Pole, at α = 1/2 it wanders from the pole down to mid-latitudes. The magenta column is the sagitta sum, rising from 0.0005 to 0.5000 and stopping at the tick ½σ₀²T = 0.5; the magenta latitude E[z] = (1 − v)ᴺ sinks to 0.6065.'],
    'finite-mesh-stokes-cancellation': ['M = 4 个球面三角围着扇形中心 P。每个三角的边界环流（白色箭头）等于它的角盈。时间轴 λ 把三角合拢，公共弧上的 +Φ、−Φ 正反相消并淡出，只剩青色赤道：∮∂Σ 𝒜 = Σ Ω = 2π，误差 0.000000。拖琥珀圆环移动 P：每个 Ω 都变，2π 不变。', 'M = 4 spherical triangles around the fan centre P. The boundary circulation of each triangle (white arrows) equals its excess. The rail λ closes the triangles: on each shared arc +Φ and −Φ cancel and fade, and only the cyan equator is left: ∮∂Σ 𝒜 = Σ Ω = 2π, error 0.000000. Drag the amber ring to move P: every Ω changes, 2π does not.'],
    'coboundary-d2-zero-closed-shell': ['八个球面三角拼成闭壳，V − E + F = 6 − 12 + 8 = 2。每个面上 curl grad φ = 0。时间轴把面合拢，每条边两侧的环流 ±A 正反相消，所有面 curl A 之和为 0；合拢之后没有一条边留下，边界的边界是空的。', 'Eight spherical triangles make a closed shell, V − E + F = 6 − 12 + 8 = 2. On every face curl grad φ = 0. The rail closes the faces: on every edge the circulations ±A of its two sides cancel, and the curls of A over all faces add up to 0; once closed, no edge is left, and the boundary of the boundary is empty.']
  };
  // A cited figure has a fixed frame: one short sentence per card, no sub- or superscripts.
  const FIGURE_NOTES = {
    'osculating-rotor-vs-tangent': ['θ = 90°：斜率 tan θ 冲出画面，紫色旋子照转，(1 − v)² + c² = 1。', 'At θ = 90° the slope tan θ leaves the frame; the violet rotor turns on, (1 − v)² + c² = 1.'],
    'blind-zone-complex-step': ['ε = 10⁻¹⁷：青色复步仍准到机器精度，品红前向差分倒平，误差 100%。', 'At ε = 10⁻¹⁷ the cyan complex step stays exact; the magenta forward difference lies flat, 100% off.'],
    'roughness-ito-phase-transition': ['α = 1/2：品红矢高柱停在 0.5，紫色旋子管从北极游到中纬度。', 'At α = 1/2 the magenta sagitta column stops at 0.5; the violet rotor tube wanders down to mid-latitudes.'],
    'finite-mesh-stokes-cancellation': ['M = 4：内棱 ±Φ 正反相消，青色赤道的环流等于角盈之和 2π。', 'At M = 4 the interior arcs ±Φ cancel; the cyan equator carries 2π, the sum of the excesses.'],
    'coboundary-d2-zero-closed-shell': ['闭壳合拢：每条边两侧相消，没有边界留下，d² = 0。', 'The shell closes: every edge cancels from both sides, no boundary is left, d² = 0.']
  };
  function applyPreset(id) {
    const p = PRESETS[id];
    if (!booting) stopBootPlay();
    clock.pause();
    S.theta = p.theta; S.elog = p.elog; S.alpha = p.alpha; S.M = p.M; S.lambda = p.lambda; S.pTheta = 34; S.pPhi = 215;
    setScene(p.scene, true);
    syncFields();
    sc.view(VIEWS[p.scene], booting || TRV.still ? 0 : 600);
    if (TRV.still || (booting && !TRV.embed)) clock.set(p.still === 'end' ? clock.max : p.still);
    else clock.set(0);
    if (p.play && !TRV.still && (!booting || TRV.embed)) { if (booting) bootPlay(); else clock.play(); }
    paint();
  }
  const cards = kit.cards($('presets'), {
    presets: PRESETS, notes: TRV.figure ? { ...NOTES, ...FIGURE_NOTES } : NOTES, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset,
    idle: ['自由探索：换场景，拉 θ、ε、α 与 M，拖琥珀圆环，切换两种读法。随时可以再选一张卡。', 'Free play: switch the scene, pull θ, ε, α and M, drag the amber ring, switch the reading. Pick a card again at any time.']
  });
  const tourBody = $('tourBody');
  const markStep = () => { const b = tourBody.querySelector('b'); if (b && b.id !== 'tourStep') b.id = 'tourStep'; };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));

  /* ---------- probe, cover, start ---------- */
  const shellState = (Sh) => ({ M: Sh.M, V: Sh.V, E: Sh.E, F: Sh.F, chi: Sh.chi, verts: Sh.verts, faces: Sh.faces, edges: Sh.edges, phi: Sh.phi, curlGrad: Sh.curlGrad, curlA: Sh.curlA,
    divCurl: Sh.divCurl, defects: Sh.defects, quadruples: Sh.quadruples, repairs: Sh.repairs, rank: Sh.rank, allFacesOdd: Sh.allFacesOdd, omega: Sh.omega, sumOmega: Sh.sumOmega, cycleDim: Sh.cycleDim,
    A: Sh.A.map((r) => Array.from(r)) });
  const stokesState = (Sk) => ({ M: Sk.M, P: Sk.P, pTheta: Sk.pTheta, pPhi: Sk.pPhi, E: Sk.E, tris: Sk.tris.map((t) => ({ k: t.k, a: t.a, b: t.b, c: t.c, edges: t.edges, circ: t.circ, omega: t.omega })),
    pairs: Sk.pairs, rim: Sk.rim, sumOmega: Sk.sumOmega, sumCirc: Sk.sumCirc, pairMax: Sk.pairMax, triMax: Sk.triMax, rimErr: Sk.rimErr, graph: Sk.graph });
  window.ARC_CALCULUS_DEBUG = Object.freeze({
    get state() {
      const M = model(), wk = walkOf(S.elog, S.alpha);
      return JSON.parse(JSON.stringify({
        preset: cards.current, t: clock.t, tau: S.tau, playing: clock.playing, scene: S.scene, lens: S.lens ? 'calculus' : 'geometric',
        theta: S.theta, elog: S.elog, alpha: S.alpha, M: S.M, lambda: S.lambda, pTheta: S.pTheta, pPhi: S.pPhi,
        rotor: M.rot, step: M.step, rough: M.rough, walk: { nd: wk.nd, pd: wk.pd, start: wk.pts[0], end: wk.pts[wk.pts.length - 1], maxNormErr: Math.max(...wk.pts.map((p) => Math.abs(v3.len(p) - 1))) },
        trotter: M.trotter, stokes: stokesState(M.stokes), shell: shellState(M.shell),
        camera: Object.assign({}, sc.cam), handle: FRAME ? FRAME.handle : null, head: FRAME ? FRAME.head : null, labels: PLACED, stageFrame: FRAME, plot: PLOT,
        thetaMaxDeg: TH_MAX_DEG
      }));
    },
    /** Set the state as a reader would with the controls (leaves the card, pauses the clock). */
    setState(o) {
      leave();
      if (o.scene != null) setScene(o.scene, true);
      if (o.theta != null) setTheta(o.theta, true);
      if (o.elog != null) setLog(o.elog, true);
      if (o.alpha != null) setAlpha(o.alpha, true);
      if (o.M != null) setMesh(Math.log2(o.M), true);
      if (o.pTheta != null || o.pPhi != null) setCentre(o.pTheta == null ? S.pTheta : o.pTheta, o.pPhi == null ? S.pPhi : o.pPhi, true);
      if (o.lambda != null) setLambda(o.lambda, true);
      if (o.lens != null) setLens(o.lens === true || o.lens === 'calculus');
      if (o.tau != null) clock.set(clamp(o.tau, 0, 1));
      paint();
    },
    /** Pure computations (no page change), for the suite's sweeps. */
    rampAt(deg) { return rampAt(deg * DEG); },
    rotor(deg, elog) { const r = rotorAt(deg * DEG, elog); return JSON.parse(JSON.stringify(r)); },
    step(elog) { return stepAt(elog); },
    second(eps) { return { value: secondStep(eps), exact: f2Exact }; },
    rough(elog, alpha) { return roughAt(elog, alpha); },
    trotter(n) { return trotterAt(n); },
    stokes(M, pTh, pPh) { return JSON.parse(JSON.stringify(stokesState(stokesOf(M, pTh, pPh)))); },
    shell(M) { return JSON.parse(JSON.stringify(shellState(shellOf(M)))); },
    errCurve() { return errCurve.map((p) => ({ ...p })); },
    /** Viewport coordinates of the handle, or null when hidden. */
    handleBox() { if (handle.hidden) return null; const r = handle.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; },
    /** Viewport coordinates of the anchor of a parameter value: θ in degrees (rotor), α (tube), [θ_P, φ_P] (stokes). */
    anchorPoint(v) {
      const b = stageEl.getBoundingClientRect(), p = S.scene === 'rotor' ? rotorPoint(v) : S.scene === 'tube' ? columnTop(v) : v3.scale(sph(v[0] * DEG, v[1] * DEG), 1.006), q = sc.p(p);
      return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] };
    },
    /** Viewport coordinates of a world point under the current camera. */
    project(v) { const b = stageEl.getBoundingClientRect(), q = sc.p(v); return { x: b.left + stageEl.clientLeft + q[0], y: b.top + stageEl.clientTop + q[1] }; }
  });
  window.TRV_THUMB = () => { cards.pick('finite-mesh-stokes-cancellation'); clock.pause(); clock.set(0.65); sc.view(VIEWS.stokes, 0); paint.now(); };
  cards.pick(cards.initial('osculating-rotor-vs-tangent'));
  booting = false;
  paint();
})();
