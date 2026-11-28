/* OMEGA//LAB · Ω 数学工作台 · the omega-math workbench (Chapters 6, 7, 11, 15, 16, 18)
   World (kit.solid): z up, o = (1, 0, 0, 0) at the north pole of one violet ball, four readings of it.
     bargmann  the great 2-sphere of S³ through o, b, c, drawn isometrically: the spherical triangle, its cyan arcs, and
               det G₃ = 1 + 2B − (κ_ab + κ_bc + κ_ca); the rail moves c from [b, o, b] (det 0) to the chosen end;
     jet       the Cayley image (X, Y) = ((Q² − P²)/(P² + Q²), 2PQ/(P² + Q²)) of [P : Q] on a great circle through o,
               the second-order jet of the map in ℚ[η]/(η³) and the flat tangent plane; the rail is the secant step h;
     haar      the ball coloured by χᵢχⱼ along κ = (height)², nodal shells, exact moments E[κⁿ] and ⟨χᵢ, χⱼ⟩;
               the rail lowers the level κ from 1 to 0;
     hecke     a test state q and its six jumps q·s, s ∈ S₅ (norm 5), at the height w/‖q‖; the rail sums χ₁ over the
               jumps; the Ω-FRACTRAN mode pushes X, Y in both orders and applies the gate Ȳ/5.
   Every number of the ledger is a reduced fraction [p, q] of big integers, q > 0; the drawing alone uses doubles.
   Read-only probe: window.OMEGALAB_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot,
    abs = Math.abs;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => {
    const n = norm(a);
    return n > 0 ? scale(a, 1 / n) : a.slice();
  };
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fix = (x, d = 4) => kit.fix(x, d);

  /* ---------- exact numbers: reduced fractions [p, q] of big integers, q > 0 ---------- */
  const babs = (a) => (a < 0n ? -a : a);
  const bgcd = (a, b) => {
    a = babs(a);
    b = babs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  function frac(p, q = 1n) {
    p = BigInt(p);
    q = BigInt(q);
    if (q === 0n) throw new RangeError('zero denominator');
    if (q < 0n) [p, q] = [-p, -q];
    const g = bgcd(p, q);
    return g > 1n ? [p / g, q / g] : [p, q];
  }
  const ZERO = [0n, 1n],
    ONE = [1n, 1n],
    TWO = [2n, 1n];
  const plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    over = ([a, b], [c, d]) => frac(a * d, b * c),
    neg = ([a, b]) => [-a, b];
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const same = (x, y) => x[0] === y[0] && x[1] === y[1];
  const sumF = (xs) => xs.reduce(plus, ZERO);
  const fval = ([p, q]) => Number(p) / Number(q);
  const fstr = ([p, q]) => String(p).replace('-', '−') + (q === 1n ? '' : '/' + q);
  const sub1 = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  const sup1 = (n) => String(n).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);

  /* ---------- integer quadruples (big integers) ---------- */
  const Z4 = (t) => t.map((v) => BigInt(v));
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qconj = ([w, x, y, z]) => [w, -x, -y, -z];
  const qdot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0n);
  const qn2 = (a) => qdot(a, a);
  /** The canonical tuple of the line of a nonzero integer quadruple: divided by the gcd, first nonzero entry positive. */
  function canon(t) {
    const g = t.reduce((m, v) => bgcd(m, v), 0n);
    if (g === 0n) return null;
    const r = t.map((v) => v / g),
      lead = r.find((v) => v !== 0n);
    return lead < 0n ? r.map((v) => -v) : r;
  }
  const triad = (a, b, c) => canon(qmul(qmul(a, qconj(b)), c));
  const kappa4 = (a, b) => frac(qdot(a, b) ** 2n, qn2(a) * qn2(b));
  const tup = (t) => `(${t.map((v) => String(v).replace('-', '−')).join(', ')})`;
  const brk = (t) => `[${t.map((v) => String(v).replace('-', '−')).join(' : ')}]`;
  const O4 = Z4([1, 0, 0, 0]),
    PHALF = Z4([1, 1, 0, 0]),
    QHALF = Z4([1, 0, 1, 0]);

  /* ---------- 1. Bargmann–Gram: three lines of ℚ⁴ ---------- */
  const KMAX = 16;
  /** κ, B and det G₃ of o, b and the point c(k) = (16 − k)·[b, o, b] + k·c of the rail, all exact. */
  function gramAt(b, c0, cEnd, k) {
    const K = BigInt(KMAX),
      kk = BigInt(k),
      c = canon(c0.map((v, i) => (K - kk) * v + kk * cEnd[i])),
      a = O4;
    const kab = kappa4(a, b),
      kbc = kappa4(b, c),
      kca = kappa4(c, a),
      Bg = frac(qdot(a, b) * qdot(b, c) * qdot(c, a), qn2(a) * qn2(b) * qn2(c)),
      det = minus(plus(ONE, times(TWO, Bg)), sumF([kab, kbc, kca]));
    return { c, kab, kbc, kca, B: Bg, det };
  }
  const gramCache = new Map();
  function bargmann(S) {
    const raw = Z4(S.b),
      b = canon(raw),
      cRaw = Z4(S.c),
      cEnd = canon(cRaw),
      c0 = triad(b, O4, b),
      k = clamp(Math.floor(S.at.bargmann + 1e-9), 0, KMAX);
    const key = JSON.stringify([b, cEnd].map((t) => t.map(String)));
    if (!gramCache.has(key)) gramCache.set(key, range(KMAX + 1).map((j) => gramAt(b, c0, cEnd, j)));
    const series = gramCache.get(key),
      now = series[k];
    // the projective anchors [p : q] of the meridian from o through b: κ = q²/(p² + q²), spread = p²/(p² + q²)
    const anchors = [
      [0n, 1n],
      [1n, 1n],
      [1n, 0n]
    ].map(([p, q]) => ({ pq: [p, q], kappa: frac(q * q, p * p + q * q), spread: frac(p * p, p * p + q * q) }));
    return { a: O4, raw, b, cRaw, cEnd, c0, k, t: frac(k, KMAX), ...now, series, anchors };
  }

  /* ---------- 2. jets: ℚ[η]/(η³) ---------- */
  const jmul = (a, b) => [times(a[0], b[0]), plus(times(a[0], b[1]), times(a[1], b[0])), sumF([times(a[0], b[2]), times(a[1], b[1]), times(a[2], b[0])])];
  /** The inverse of (b₀, b₁, b₂) with b₀ ≠ 0. */
  const jinv = ([b0, b1, b2]) => [over(ONE, b0), neg(over(b1, times(b0, b0))), over(minus(times(b1, b1), times(b0, b2)), times(b0, times(b0, b0)))];
  const parseQ = (t) => {
    const [p, q = '1'] = String(t).split('/');
    return frac(BigInt(p), BigInt(q));
  };
  const ALPHAS = ['0', '1/4', '1/2', '3/4', '1'];
  const HMAX = 8,
    HDEN = 16;
  /** D(h) = h(3x₀² + 2x₀h − 1)/((1 + x₀²)²(1 + (x₀ + h)²)): the secant slope of 1/(1 + x²) minus j₁. */
  const drift = (x0, h) => {
    const one = plus(ONE, times(x0, x0)),
      far = plus(ONE, times(plus(x0, h), plus(x0, h))),
      top = times(h, minus(plus(times([3n, 1n], times(x0, x0)), times(TWO, times(x0, h))), ONE));
    return over(top, times(times(one, one), far));
  };
  function jetOf(S, withSeries = true) {
    const Pn = BigInt(S.P),
      Qn = BigInt(S.Q),
      n2 = Pn * Pn + Qn * Qn;
    const kappa = frac(Qn * Qn, n2),
      spread = frac(Pn * Pn, n2),
      X = frac(Qn * Qn - Pn * Pn, n2),
      Y = frac(2n * Pn * Qn, n2),
      g = bgcd(Pn, Qn),
      Pr = Pn / g,
      Qr = Qn / g,
      kappaReduced = frac(Qr * Qr, Pr * Pr + Qr * Qr);
    // the chart: x = P/Q while Q ≠ 0, else u = Q/P (the point at infinity is the ordinary point u = 0 there)
    const chart = Qn !== 0n ? 'x' : 'u',
      s0 = chart === 'x' ? frac(Pn, Qn) : frac(Qn, Pn),
      base = [plus(ONE, times(s0, s0)), times(TWO, s0), ONE],
      inv = jinv(base),
      check = jmul(base, inv);
    // the jet of κ: 1/(1 + x²) in the x chart, u²/(1 + u²) = 1 − 1/(1 + u²) in the u chart
    const j = chart === 'x' ? inv : [minus(ONE, inv[0]), neg(inv[1]), neg(inv[2])];
    // the jet of the Cayley map: X = ±(2·inv − 1), Y = 2s·inv
    const sgn = chart === 'x' ? ONE : [-1n, 1n],
      jX = [times(sgn, minus(times(TWO, inv[0]), ONE)), times(sgn, times(TWO, inv[1])), times(sgn, times(TWO, inv[2]))],
      jY = [times(TWO, times(s0, inv[0])), times(TWO, plus(times(s0, inv[1]), inv[0])), times(TWO, plus(times(s0, inv[2]), inv[1]))];
    const k = clamp(Math.floor(S.at.jet + 1e-9), 0, HMAX),
      h = frac(k, HDEN),
      D = chart === 'x' ? drift(s0, h) : neg(drift(s0, h)),
      jetD = times(j[2], h);
    // κ at x₀ + h, exactly, for the secant
    const at = (s) => {
      const v = over(ONE, plus(ONE, times(s, s)));
      return chart === 'x' ? v : minus(ONE, v);
    };
    const secant = k === 0 ? null : over(minus(at(plus(s0, h)), at(s0)), h);
    // the α-sampled tangent step of §7.4 on the Cayley circle: R′(s₀) = ω·J·R₀, J the quarter turn (X, Y) ↦ (−Y, X);
    // (1 − αhωJ)x₁ = (1 + (1 − α)hωJ)x₀ gives x₁ = ((1 − ab)x₀ + (a + b)Jx₀)/(1 + a²), a = αhω, b = (1 − α)hω
    const omega = plus(times(neg(jX[1]), Y), times(jY[1], X));
    const stepOf = (al) => {
      const a = times(times(al, h), omega),
        b = times(times(minus(ONE, al), h), omega),
        d = plus(ONE, times(a, a)),
        c1 = minus(ONE, times(a, b)),
        c2 = plus(a, b),
        x1 = [over(minus(times(c1, X), times(c2, Y)), d), over(plus(times(c1, Y), times(c2, X)), d)],
        dx = [minus(x1[0], X), minus(x1[1], Y)],
        d2 = plus(times(dx[0], dx[0]), times(dx[1], dx[1]));
      return { alpha: al, x1, n2: plus(times(x1[0], x1[0]), times(x1[1], x1[1])), d2, drift: times(minus(ONE, times(TWO, al)), d2) };
    };
    const alpha = parseQ(S.alpha),
      steps = ALPHAS.map((a) => stepOf(parseQ(a))),
      step = stepOf(alpha);
    const series = withSeries
      ? range(65).map((i) => {
          const hh = frac(i - 32, 32);
          return { h: hh, D: chart === 'x' ? drift(s0, hh) : neg(drift(s0, hh)), J: times(j[2], hh) };
        })
      : null;
    return { P: Pn, Q: Qn, n2, kappa, spread, X, Y, g, Pr, Qr, kappaReduced, chart, s0, base, inv, check, j, jX, jY, k, h, D, jetD, secant, omega, alpha, step, steps, series };
  }

  /* ---------- 3. Haar on S³: factorial moments, characters of κ ---------- */
  const FACT = [1n];
  for (let i = 1; i <= 32; i++) FACT.push(FACT[i - 1] * BigInt(i));
  /** E[w^{2a} x^{2b} y^{2c} z^{2d} / ‖q‖^{2m}] = (2a)!(2b)!(2c)!(2d)! / (4^m a!b!c!d!(m + 1)!). */
  function moment(pw) {
    const m = pw.reduce((s, x) => s + x, 0);
    let num = 1n,
      den = 4n ** BigInt(m) * FACT[m + 1];
    for (const a of pw) {
      num *= FACT[2 * a];
      den *= FACT[a];
    }
    return frac(num, den);
  }
  const KMOM = range(5).map((n) => moment([n, 0, 0, 0]));
  const CHI = [[ONE], [frac(-1), frac(4)], [ONE, frac(-12), frac(16)]];
  const pmul = (p, q) => {
    const r = range(p.length + q.length - 1).map(() => ZERO);
    p.forEach((a, i) => q.forEach((b, j) => (r[i + j] = plus(r[i + j], times(a, b)))));
    return r;
  };
  const peval = (p, x) => p.reduceRight((s, c) => plus(times(s, x), c), ZERO);
  const pfloat = (p, x) => p.reduceRight((s, c) => s * x + fval(c), 0);
  const pairing = (i, j) => {
    const poly = pmul(CHI[i], CHI[j]),
      terms = poly.map((c, n) => times(c, KMOM[n]));
    return { poly, terms, value: sumF(terms) };
  };
  const GRAM = range(3).map((i) => range(3).map((j) => pairing(i, j).value));
  /** The roots in [0, 1] of χ₁ and χ₂ as functions of κ: 1/4, and (3 ∓ √5)/8 (drawn only). */
  const NODES = [[], [0.25], [(3 - Math.sqrt(5)) / 8, (3 + Math.sqrt(5)) / 8]];
  const LMAX = 16;
  function haarOf(S) {
    const mono = S.mono.slice(),
      m = mono.reduce((s, x) => s + x, 0),
      E = moment(mono),
      pr = pairing(S.ci, S.cj),
      k = clamp(Math.floor(S.at.haar + 1e-9), 0, LMAX),
      level = frac(LMAX - k, LMAX);
    return { mono, m, E, kmom: KMOM, ci: S.ci, cj: S.cj, ...pr, k, level, chiI: peval(CHI[S.ci], level), chiJ: peval(CHI[S.cj], level), gram: GRAM };
  }

  /* ---------- 4. Hecke p = 5 and the Ω-FRACTRAN gate ---------- */
  const S5 = [
    [1, 2, 0, 0],
    [1, -2, 0, 0],
    [1, 0, 2, 0],
    [1, 0, -2, 0],
    [1, 0, 0, 2],
    [1, 0, 0, -2]
  ].map(Z4);
  const chi1 = (p) => minus(times([4n, 1n], kappa4(O4, p)), ONE);
  const LAMBDA = over(sumF(S5.map(chi1)), [3n, 1n]); // Σ χ₁(s) / χ₁(1): the eigenvalue on χ₁
  const MARGIN = minus([20n, 1n], times(LAMBDA, LAMBDA)); // 4p − λ̂²
  const X5 = Z4([1, 2, 0, 0]),
    Y5 = Z4([1, 0, 2, 0]),
    PSI_XY = qmul(X5, Y5),
    PSI_YX = qmul(Y5, X5);
  /** Right multiplication by Ȳ/5: it fires only when every entry of ψ·Ȳ is divisible by 5. */
  function gate(psi) {
    const raw = qmul(psi, qconj(Y5)),
      rem = raw.map((v) => ((v % 5n) + 5n) % 5n),
      pass = rem.every((v) => v === 0n);
    return { raw, rem, pass, out: pass ? raw.map((v) => v / 5n) : null };
  }
  const GATE_XY = gate(PSI_XY),
    GATE_YX = gate(PSI_YX);
  const FMAX = 3;
  function heckeOf(S) {
    const q = Z4(S.q),
      N = qn2(q),
      kq = kappa4(O4, q),
      cq = chi1(q),
      jumps = S5.map((s) => {
        const p = qmul(q, s);
        return { s, p, n2: qn2(p), re: p[0], kappa: kappa4(O4, p), chi: chi1(p) };
      });
    const n = clamp(Math.floor(S.at.hecke + 1e-9), 0, S.mode === 'hecke' ? 6 : FMAX),
      partial = sumF(jumps.slice(0, Math.min(n, 6)).map((j) => j.chi)),
      total = sumF(jumps.map((j) => j.chi)),
      rhs = times(LAMBDA, cq),
      reSq = jumps.reduce((s, j) => s + j.re * j.re, 0n),
      reSqForm = 6n * q[0] * q[0] + 8n * (q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
    // the meridian slice: the pair [p : q] = [x : w] of q times the jump [2 : 1] = 1 + 2i, as projectiveMul
    const p1 = q[1],
      q1 = q[0],
      prod = [p1 * 1n + q1 * 2n, q1 * 1n - p1 * 2n],
      slice = { pair: [p1, q1], prod, left: (p1 * p1 + q1 * q1) * 5n, right: prod[0] * prod[0] + prod[1] * prod[1] };
    const chi2 = (p) => {
        const k = kappa4(O4, p);
        return plus(minus(times([16n, 1n], times(k, k)), times([12n, 1n], k)), ONE);
      },
      c2q = chi2(q),
      chi2Sum = sumF(S5.map((s) => chi2(qmul(q, s))));
    return { mode: S.mode, q, N, kappa: kq, chi: cq, chi2: c2q, chi2Sum, chi2Ratio: c2q[0] === 0n ? null : over(chi2Sum, c2q), jumps, n, partial, total, rhs, lambda: LAMBDA, margin: MARGIN, reSq, reSqForm, slice, trivial: BigInt(S5.length) };
  }

  /* ---------- state, cards, rails ---------- */
  const SCENES = ['bargmann', 'jet', 'haar', 'hecke'];
  const STILL = { bargmann: KMAX, jet: HMAX, haar: 12, hecke: 6 };
  const FRESH = { lens: 0, b: [1, 1, 0, 0], c: [1, 0, 1, 0], P: 1, Q: 1, alpha: '1/2', mono: [1, 0, 0, 0], ci: 1, cj: 2, q: [2, 1, 3, -1], mode: 'hecke' };
  const copy = (o) => JSON.parse(JSON.stringify(o));
  const state = { ...copy(FRESH), scene: 'bargmann', cam: 'card', at: { ...STILL } };
  const PRESETS = {
    'bargmann-gram-triad': { scene: 'bargmann', play: true, still: STILL.bargmann, set: { b: [1, 1, 0, 0], c: [1, 0, 1, 0] } },
    'jet2-osculating-sphere': { scene: 'jet', play: true, still: STILL.jet, set: { P: 1, Q: 1, alpha: '1/2' } },
    'pi-free-haar-peter-weyl': { scene: 'haar', play: true, still: STILL.haar, set: { mono: [1, 0, 0, 0], ci: 1, cj: 2 } },
    'hecke-p5-and-omega-fractran': { scene: 'hecke', play: true, still: STILL.hecke, set: { q: [2, 1, 3, -1], mode: 'hecke' } }
  };
  const DEFAULT = 'bargmann-gram-triad';
  const RAILS = { bargmann: { max: KMAX, rate: 4 }, jet: { max: HMAX, rate: 3 }, haar: { max: LMAX, rate: 4 }, hecke: { max: 6, rate: 1.8 } };
  const railMax = () => (state.scene === 'hecke' && state.mode === 'fractran' ? FMAX : RAILS[state.scene].max);
  function compute(S) {
    switch (S.scene) {
      case 'jet':
        return jetOf(S);
      case 'haar':
        return haarOf(S);
      case 'hecke':
        return heckeOf(S);
      default:
        return bargmann(S);
    }
  }
  const calc = () => compute(state);

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const CAMS = { bargmann: [0.02, 0.4], jet: [0.26, 0.25], haar: [-0.3, 0.6], hecke: [0.22, 0.34] };
  const camOf = (name) => {
    const base = CAMS[state.scene];
    if (name === 'pole') return [base[0], 1.25];
    if (name === 'side') return [base[0] + 1.15, 0.12];
    return base;
  };
  const opts = { canvas: $('cv'), yaw: CAMS.bargmann[0], pitch: CAMS.bargmann[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(...CAMS.bargmann);
  const LIFT = 1.012,
    JET_CORE = 0.84;
  // the picture of a great 2-sphere: E1 (o) up, E2 along A2, E3 along A3, both facing the viewer
  const AZ = (-38 * PI) / 180,
    A2 = [cs(AZ), sn(AZ), 0],
    A3 = [sn(AZ), -cs(AZ), 0],
    UP = [0, 0, 1];
  const slerp3 = (u, v, t) => {
    const om = Math.acos(clamp(dot(u, v), -1, 1));
    if (om < 1e-9) return u.slice();
    return add(scale(u, sn((1 - t) * om) / sn(om)), scale(v, sn(t * om) / sn(om)));
  };
  const arc3 = (u, v, r = LIFT, n = 48) => sample(n, (t) => scale(slerp3(u, v, t), r));
  /** An orthonormal frame of ℝ⁴: o, then b and c by Gram–Schmidt (any completion where they are dependent). */
  function frame4(b, c) {
    const STD = [
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    const E1 = [1, 0, 0, 0];
    const perp = (v, B) => B.reduce((r, e) => sub(r, scale(e, dot(r, e))), unit(v));
    const pick = (B) => unit(STD.map((e) => perp(e, B)).reduce((best, v) => (norm(v) > norm(best) + 1e-12 ? v : best)));
    const e2 = perp(b, [E1]),
      E2 = norm(e2) > 1e-9 ? unit(e2) : pick([E1]);
    const e3 = perp(c, [E1, E2]),
      E3 = norm(e3) > 1e-9 ? unit(e3) : pick([E1, E2]);
    return [E1, E2, E3];
  }
  const place = (v4, F) => {
    const u = unit(v4);
    return add(add(scale(UP, dot(u, F[0])), scale(A2, dot(u, F[1]))), scale(A3, dot(u, F[2])));
  };
  // the Cayley circle of the jet card: X up, Y along A2
  const JN = unit(cross(UP, A2));
  const cayPt = (X, Y, r = 1) => scale(add(scale(UP, X), scale(A2, Y)), r);
  // the height picture of the Haar and Hecke cards: w/‖q‖ up, azimuth by an axonometric projection of (x, y, z)
  const AXON = [
    [cs((-20 * PI) / 180), sn((-20 * PI) / 180)],
    [cs((-160 * PI) / 180), sn((-160 * PI) / 180)],
    [0.45, 0]
  ];
  function dir(q) {
    const n = norm(q),
      h = q[0] / n,
      r = Math.sqrt(Math.max(0, 1 - h * h)),
      a = [0, 1].map((i) => q[1] * AXON[0][i] + q[2] * AXON[1][i] + q[3] * AXON[2][i]),
      m = hypot(...a);
    return r < 1e-12 || m < 1e-12 ? [0, 0, h] : [(r * a[0]) / m, (r * a[1]) / m, h];
  }
  const on = (q, r = LIFT) => scale(dir(q.map(Number)), r);
  /** The great arc of S³ between two quadruples, carried into the height picture. */
  const arcOf = (a, b, n = 36, r = LIFT) => {
    const u = unit(a.map(Number)),
      v = unit(b.map(Number)),
      om = Math.acos(clamp(dot(u, v), -1, 1));
    return om < 1e-9 ? [on(a, r), on(a, r)] : sample(n, (t) => scale(dir(add(scale(u, sn((1 - t) * om)), scale(v, sn(t * om)))), r));
  };
  const lat = (h) => Math.sqrt(Math.max(0, 1 - h * h));

  /* ---------- the geometry of each card at a rail value v (doubles, for drawing only) ---------- */
  function bargmannGeo(m, v) {
    const c0 = m.c0.map(Number),
      ce = m.cEnd.map(Number),
      t = clamp(v, 0, KMAX) / KMAX,
      c = add(scale(c0, 1 - t), scale(ce, t)),
      F = frame4(m.b.map(Number), c);
    return { F, A: UP.slice(), B: place(m.b.map(Number), F), C: place(c, F), C0: place(c0, F), CE: place(ce, F) };
  }
  function jetGeo(m) {
    const s0 = fval(m.s0),
      R = (s) => (m.chart === 'x' ? cayPt((1 - s * s) / (1 + s * s), (2 * s) / (1 + s * s)) : cayPt((s * s - 1) / (s * s + 1), (2 * s) / (1 + s * s))),
      jx = m.jX.map(fval),
      jy = m.jY.map(fval),
      R0 = R(s0),
      d1 = cayPt(jx[1], jy[1]),
      d2 = cayPt(jx[2], jy[2]);
    return { s0, R, R0, d1, d2, R1: (h) => add(R0, scale(d1, h)), R2: (h) => add(add(R0, scale(d1, h)), scale(d2, h * h)) };
  }
  function handleWorld(v) {
    const m = calc();
    switch (state.scene) {
      case 'jet':
        return jetGeo(m).R0;
      case 'haar': {
        const k = clamp(v, 0, LMAX),
          h = Math.sqrt((LMAX - k) / LMAX),
          f = unit([cam.D[0], cam.D[1], 0].map((x, i) => x + [1e-6, 0, 0][i]));
        return scale(add(scale(UP, h), scale(f, lat(h))), LIFT);
      }
      case 'hecke':
        return heckePoint(m, v);
      default:
        return scale(bargmannGeo(m, v).C, LIFT);
    }
  }
  /** Hecke: q, then the jumps one by one; FRACTRAN: o, X, XY, then the gate back to X. */
  function heckePoint(m, v) {
    if (m.mode === 'fractran') {
      const way = [O4, X5, PSI_XY, X5],
        k = clamp(Math.floor(v), 0, FMAX - 1),
        f = clamp(v - k, 0, 1),
        a = arcOf(way[k], way[k + 1], 24);
      return a[Math.round(f * (a.length - 1))];
    }
    const k = clamp(Math.round(v), 0, 6);
    return k === 0 ? on(m.q) : on(m.jumps[k - 1].p);
  }

  /* ---------- fitting the picture between the title and the legend ---------- */
  const BALL = [-1.04, 1.04, -1.04, 1.04];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  const small = () => stage.clientWidth < 480;
  function extras(m) {
    if (state.scene !== 'jet') return [];
    const g = jetGeo(m),
      T = unit(g.d1),
      h = m.k / HDEN;
    return [add(g.R0, scale(T, 0.62)), add(g.R0, scale(T, -0.62)), add(g.R0, scale(JN, 0.34)), add(g.R0, scale(JN, -0.34)), g.R1(h), g.R2(h)];
  }
  const title = { key: '', top: 0 };
  function fit(m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const key = [state.scene, state.mode, state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const [x0, x1, y0, y1] = around(extras(m)).map((v, i) => v + [-0.1, 0.1, -0.06, 0.08][i]);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- drawing ---------- */
  const strong = () => (state.lens ? { exact: 0.5, flat: 1 } : { exact: 1, flat: 0.7 });
  const tube = (key, pts, color, width, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, width, glow, occlude: false, pick: false, alpha });
  const at3 = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  /** A circle as a keyed tube: it keeps its mesh and material from frame to frame, unlike sc.circle and dashed lines. */
  const loop = (key, c, n, r, color, width, alpha = 1) => {
    const nn = unit(n),
      e1 = unit(cross(nn, abs(nn[2]) < 0.9 ? UP : [1, 0, 0])),
      e2 = cross(nn, e1);
    tube(key, sample(96, (t) => add(c, add(scale(e1, r * cs(TAU * t)), scale(e2, r * sn(TAU * t))))), color, width, alpha, 0.35);
  };
  function drawBall(m) {
    if (state.scene === 'haar') {
      const poly = m.poly;
      sc.surface('zonal', at3, { u: [0, PI], v: [0, TAU], nu: 72, nv: 72, colors: [P.magenta, P.violet, P.cyan], range: [-1, 1], value: (u) => Math.tanh(2 * pfloat(poly, cs(u) ** 2)), grid: { every: [6, 9], alpha: 0.14 } });
    } else if (state.scene === 'jet') {
      // the unit sphere as glass round an opaque core, so that the circle, its jet and its tangent stay in view on both
      // sides of the unit sphere
      sc.surface('core', (u, v) => scale(at3(u, v), JET_CORE), { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
      sc.glass('unit', [0, 0, 0], 1, { color: P.violet, alpha: 0.07, rim: 0.7 });
      return;
    } else sc.surface('ball', at3, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
  }
  function drawBargmann(m, v) {
    const g = bargmannGeo(m, v),
      w = strong();
    // the meridian from o through b to the equator, with the anchors [0:1], [1:1], [1:0]
    const toEq = (deg) => add(scale(UP, cs((deg * PI) / 180)), scale(A2, sn((deg * PI) / 180)));
    tube('meridian', sample(30, (t) => scale(toEq(90 * t), LIFT)), P.ink, 1, 0.5, 0.2);
    [0, 45, 90].forEach((deg, i) => sc.ring(scale(toEq(deg), LIFT), { color: P.cyan, r: 6, alpha: 0.8 * w.exact, normal: toEq(deg), key: 'anchor' + i }));
    // the path of c on the rail, from [b, o, b] to its end
    tube('path', sample(32, (t) => scale(bargmannGeo(m, t * KMAX).C, LIFT)), P.cyan, 1.1, 0.45, 0.2);
    // the spherical triangle: magenta, by central projection of the flat one (its sides are the three arcs)
    if (!(abs(v - m.k) < 1e-9 && cmp(m.det, ZERO) === 0)) {
      const patch = (u, s) => scale(unit(add(scale(g.A, 1 - u), scale(add(scale(g.B, 1 - s), scale(g.C, s)), u))), 1.006);
      sc.surface('tri~', patch, { u: [0.002, 1], v: [0, 1], nu: 18, nv: 18, color: P.magenta, alpha: 0.3 + 0.25 * w.flat, grid: { every: [6, 6], alpha: 0.25 }, pick: false, occlude: false });
    }
    tube('ab', arc3(g.A, g.B), P.cyan, 3, w.exact, 0.4);
    tube('bc', arc3(g.B, g.C), P.cyan, 3, w.exact, 0.4);
    tube('ca', arc3(g.C, g.A), P.cyan, 3, w.exact, 0.4);
    sc.bead(scale(g.A, LIFT), { color: P.ink, r: 5, key: 'o' });
    sc.bead(scale(g.B, LIFT), { color: P.cyan, r: 5.4, key: 'b' });
    sc.bead(scale(g.C0, LIFT), { color: P.violet, r: 4.4, key: 'c0' });
    return { here: scale(g.C, LIFT), g };
  }
  function drawJet(m, v) {
    const g = jetGeo(m),
      w = strong(),
      hNow = clamp(v, 0, HMAX) / HDEN;
    loop('cayley', [0, 0, 0], JN, 1, P.ink, 1.6, 0.85);
    // the anchors [0:1] (top), [1:1], [1:0] (the antipode, bottom) of the Cayley circle
    [
      [1, 0],
      [0, 1],
      [-1, 0]
    ].forEach(([X, Y], i) => sc.ring(cayPt(X, Y), { color: P.cyan, r: 6, alpha: 0.8 * w.exact, normal: cayPt(X, Y), key: 'cay' + i }));
    // the flat tangent plane at R(x₀): magenta, spanned by the tangent and the normal of the circle
    const T = unit(g.d1),
      half = 0.62,
      depth = 0.34,
      R0 = g.R0;
    const corner = (a, b) => add(add(R0, scale(T, a * half)), scale(JN, b * depth));
    sc.fan([corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)], { fill: P.magenta, alpha: 0.1 + 0.12 * w.flat, color: P.magenta, width: 1, strokeAlpha: 0.5 * w.flat + 0.2 });
    const span = half / Math.max(1e-6, norm(g.d1));
    tube('tangent', sample(20, (t) => g.R1(span * (2 * t - 1))), P.magenta, 2.2, 0.55 + 0.45 * w.flat, 0.35);
    // the second-order jet: cyan, hugging the circle near x₀
    const jspan = Math.min(span * 0.85, 0.6 / Math.max(1e-6, norm(g.d1)));
    tube('jet', sample(40, (t) => g.R2(jspan * (2 * t - 1))), P.cyan, 3.2, w.exact, 0.45);
    // the secant end x₀ + h (ink), the finite secant (magenta) and the α-steps: α = 0 on the tangent (magenta),
    // α = 1/2 the Cayley step on the circle (cyan), another chosen α in violet
    const end = g.R(g.s0 + hNow),
      at = (st) => cayPt(fval(st.x1[0]), fval(st.x1[1])),
      euler = m.steps[0],
      cay = m.steps[2];
    if (m.k > 0) {
      tube('secant', [g.R0, end], P.magenta, 1.2, 0.45 + 0.4 * w.flat, 0.2);
      tube('eulerStep', [g.R0, at(euler)], P.magenta, 1.8, 0.6 + 0.4 * w.flat, 0.3);
      sc.bead(at(euler), { color: P.magenta, r: 4.6, alpha: 0.6 + 0.4 * w.flat, key: 'euler' });
      sc.bead(at(cay), { color: P.cyan, r: 4.6, alpha: w.exact, key: 'cayley' });
      if (!['0', '1/2'].includes(state.alpha)) sc.bead(at(m.step), { color: P.violet, r: 4.4, key: 'alpha' });
      sc.bead(end, { color: P.ink, r: 4, key: 'end' });
    }
    return { here: g.R0, g, end, euler: at(euler), cay: at(cay), mine: at(m.step) };
  }
  function drawHaar(m, v) {
    const w = strong(),
      k = clamp(v, 0, LMAX),
      kap = (LMAX - k) / LMAX;
    // the nodal shells of χᵢ (bold) and χⱼ (thin): circles of latitude at h = ±√κ
    const shells = (i, width, alpha) =>
      NODES[i].forEach((kn, k) =>
        [1, -1].forEach((sgn) => {
          const h = sgn * Math.sqrt(kn);
          loop(`shell${i}-${k}-${sgn}`, [0, 0, h], UP, lat(h) * LIFT, P.ink, width, alpha);
        })
      );
    shells(m.ci, 1.9, 0.95);
    if (m.cj !== m.ci) shells(m.cj, 1.1, 0.6);
    // the current level κ: two amber circles, h = ±√κ
    for (const sgn of [1, -1]) {
      const h = sgn * Math.sqrt(kap);
      if (lat(h) > 1e-3) loop('level' + sgn, [0, 0, h], UP, lat(h) * (LIFT + 0.004), P.amber, 2.4, 1);
    }
    sc.bead(scale(UP, LIFT), { color: P.ink, r: 5, alpha: w.exact, key: 'o' });
    return { here: handleWorld(v) };
  }
  function drawHecke(m, v) {
    const w = strong();
    if (m.mode === 'fractran') return drawFractran(m, v);
    // the nodal shells of χ₁: κ = 1/4, h = ±1/2
    for (const h of [0.5, -0.5]) loop('node' + h, [0, 0, h], UP, lat(h) * LIFT, P.ink, 1.3, 0.75);
    const lit = clamp(v, 0, 6);
    m.jumps.forEach((j, i) => {
      const sign = cmp(j.chi, ZERO),
        color = sign > 0 ? P.cyan : sign < 0 ? P.magenta : P.ink,
        f = clamp(lit - i, 0, 1),
        a = arcOf(m.q, j.p, 28);
      tube('jump' + i, a, color, 1.8, 0.28 + 0.6 * w.exact, 0.3);
      if (f > 0) tube('lit' + i, a.slice(0, Math.max(2, Math.round(f * (a.length - 1)) + 1)), color, 3.4, w.exact, 0.5);
      sc.bead(on(j.p), { color, r: f >= 1 ? 5.4 : 3.6, alpha: f >= 1 ? 1 : 0.55, key: 'jump' + i });
    });
    sc.bead(on(m.q), { color: P.ink, r: 5.6, key: 'q' });
    sc.ring(on(m.q), { color: P.ink, r: 10, alpha: 0.8, normal: dir(m.q.map(Number)), key: 'qring' });
    return { here: heckePoint(m, v) };
  }
  function drawFractran(m, v) {
    const w = strong(),
      step = clamp(v, 0, FMAX);
    const grow = (key, a, b, from, color, width = 3) => {
      const f = clamp(step - from, 0, 1);
      if (f <= 0) return;
      const pts = arcOf(a, b, 28);
      tube(key, pts.slice(0, Math.max(2, Math.round(f * (pts.length - 1)) + 1)), color, width, w.exact, 0.45);
    };
    grow('ox', O4, X5, 0, P.cyan);
    grow('oy', O4, Y5, 0, P.magenta);
    grow('xy', X5, PSI_XY, 1, P.cyan);
    grow('yx', Y5, PSI_YX, 1, P.magenta);
    sc.bead(on(O4), { color: P.ink, r: 5, key: 'o' });
    if (step >= 1) {
      sc.bead(on(X5), { color: P.cyan, r: 5, key: 'X' });
      sc.bead(on(Y5), { color: P.magenta, r: 5, key: 'Y' });
    }
    if (step >= 2) {
      sc.bead(on(PSI_XY), { color: P.cyan, r: 5.6, key: 'psiXY' });
      sc.bead(on(PSI_YX), { color: P.magenta, r: 5.6, key: 'psiYX' });
    }
    if (step > 2) {
      const f = clamp(step - 2, 0, 1),
        back = arcOf(PSI_XY, X5, 28);
      tube('gate', back.slice(0, Math.max(2, Math.round(f * (back.length - 1)) + 1)), P.cyan, 3.4, 1, 0.55);
      // the blocked gate: a short magenta stub that stops at a ring
      const stub = arcOf(PSI_YX, Y5, 28).slice(0, 8);
      tube('stub', stub.slice(0, Math.max(2, Math.round(f * (stub.length - 1)) + 1)), P.magenta, 3, 0.6 + 0.4 * w.flat, 0.5);
      if (f >= 1) sc.ring(stub[stub.length - 1], { color: P.magenta, r: 9, alpha: 1, key: 'blocked' });
    }
    return { here: heckePoint(m, v) };
  }

  /* ---------- labels on the stage ---------- */
  function tags(m, v, drawn) {
    if (TRV.thumbMode) return;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls);
    const out = (p, d = 0.16) => scale(unit(p), 1 + d);
    if (state.scene === 'bargmann') {
      const g = drawn.g;
      N('o', out(g.A), 'o', 'c-ik');
      N('b', out(g.B), 'b', 'c-cy');
      N('c', out(g.C), 'c', 'c-am');
      if (norm(sub(g.C0, g.C)) > 0.12) N('c0', out(g.C0, 0.2), '[b, o, b]', 'c-vi');
      const mid = (a, b) => out(slerp3(a, b, 0.5), 0.1);
      if (!state.lens) {
        N('kab', mid(g.A, g.B), `κ = ${fstr(m.kab)}`, 'c-cy');
        N('kbc', mid(g.B, g.C), `κ = ${fstr(m.kbc)}`, 'c-cy');
        N('kca', mid(g.C, g.A), `κ = ${fstr(m.kca)}`, 'c-cy');
      } else {
        const ang = (a, b) => `θ ≈ ${fix((Math.acos(clamp(dot(a, b), -1, 1)) * 180) / PI, 1)}°`;
        N('kab', mid(g.A, g.B), ang(g.A, g.B), 'c-mg');
        N('kbc', mid(g.B, g.C), ang(g.B, g.C), 'c-mg');
        N('kca', mid(g.C, g.A), ang(g.C, g.A), 'c-mg');
      }
      const toEq = (deg) => add(scale(UP, cs((deg * PI) / 180)), scale(A2, sn((deg * PI) / 180)));
      N('a1', out(toEq(45), 0.14), '[1:1]', 'c-cy');
      N('a2', out(toEq(90), 0.14), '[1:0]', 'c-cy');
    } else if (state.scene === 'jet') {
      const g = drawn.g;
      N('top', cayPt(1, 0, 1.16), '[0:1]', 'c-cy');
      N('mid', cayPt(0, 1, 1.16), '[1:1]', 'c-cy');
      N('bot', cayPt(-1, 0, 1.16), '[1:0]', 'c-cy');
      N('x0', out(g.R0, 0.3), m.chart === 'x' ? `x₀ = ${fstr(m.s0)}` : 'x₀ = [1:0]', 'c-am');
      if (m.k > 0) {
        N('h', out(drawn.end, 0.16), `x₀ + ${fstr(m.h)}`, 'c-ik');
        N('a0', out(drawn.euler, 0.12), 'α = 0', 'c-mg');
        N('a12', out(drawn.cay, 0.24), 'α = 1/2', 'c-cy');
        if (!['0', '1/2'].includes(state.alpha)) N('am', out(drawn.mine, 0.2), `α = ${state.alpha}`, 'c-vi');
      }
      N('plane', add(g.R0, scale(JN, -0.5)), L('切平面', 'tangent plane'), 'c-mg');
    } else if (state.scene === 'haar') {
      const kap = (LMAX - clamp(v, 0, LMAX)) / LMAX,
        h = Math.sqrt(kap),
        f = unit([cam.R[0], cam.R[1], 0]);
      N('lev', add(scale(UP, h), scale(f, lat(h) * 1.18)), `κ = ${fstr(m.level)}`, 'c-am');
      N('o', scale(UP, 1.16), 'o', 'c-ik');
      NODES[m.ci].forEach((kn, i) => N('n' + i, add(scale(UP, Math.sqrt(kn)), scale(f, -lat(Math.sqrt(kn)) * 1.2)), `χ${sub1(m.ci)} = 0`, 'c-ik'));
    } else if (m.mode === 'fractran') {
      const step = clamp(v, 0, FMAX);
      N('o', out(on(O4), 0.12), 'o', 'c-ik');
      if (step >= 1) {
        N('X', out(on(X5), 0.14), 'X', 'c-cy');
        N('Y', out(on(Y5), 0.14), 'Y', 'c-mg');
      }
      if (step >= 2) {
        N('xy', out(on(PSI_XY), 0.18), 'ψ<sub>XY</sub>', 'c-cy');
        N('yx', out(on(PSI_YX), 0.18), 'ψ<sub>YX</sub>', 'c-mg');
      }
      if (step >= 3) N('gate', out(arcOf(PSI_YX, Y5, 28)[7], 0.24), L('拦下 · mod 5', 'blocked · mod 5'), 'c-mg');
    } else {
      N('q', out(on(m.q), 0.2), 'q', 'c-ik');
      m.jumps.forEach((j, i) => N('j' + i, out(on(j.p), 0.13), 's' + sub1(i + 1), cmp(j.chi, ZERO) > 0 ? 'c-cy' : cmp(j.chi, ZERO) < 0 ? 'c-mg' : 'c-ik'));
    }
  }
  // labels keep near their anchors and stay off the title, the buttons, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), $('stageAct'), handle].filter((el) => !el.hidden && el.getClientRects().length).map((el) => el.getBoundingClientRect());
    const list = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of list) tag.style.translate = '';
    const boxes = list.map((tag) => tag.getBoundingClientRect());
    const free = (box, dx, dy) => {
      const left = box.left + dx,
        right = box.right + dx,
        top = box.top + dy,
        bottom = box.bottom + dy;
      if (left < bounds.left + 4 || right > bounds.right - 4 || top < bounds.top + 4 || bottom > bounds.bottom - 4) return null;
      if (occupied.some((r) => left < r.right + 3 && right > r.left - 3 && top < r.bottom + 3 && bottom > r.top - 3)) return null;
      return { left, right, top, bottom };
    };
    const place = (i, dx, dy, at) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(at);
    };
    const STEP_X = 20,
      cols = 2 * Math.ceil(bounds.width / STEP_X);
    for (const [i, box] of boxes.entries()) {
      const dx = clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const here = free(box, dx, 0);
      if (here) {
        place(i, dx, 0, here);
        continue;
      }
      const row = box.height + 4,
        rows = 2 * Math.ceil(bounds.height / row);
      let best = null;
      for (let k = 0; k <= cols; k++) {
        const sx = Math.ceil(k / 2) * STEP_X * (k % 2 ? -1 : 1),
          extra = sx === 0 ? 0 : 0.5;
        if (best && abs(dx + sx) + extra >= best.cost) continue;
        for (let j = 0; j <= rows; j++) {
          const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1),
            cost = hypot(dx + sx, dy) + extra;
          if (best && cost >= best.cost) break;
          const at = free(box, dx + sx, dy);
          if (at) {
            best = { cost, dx: dx + sx, dy, at };
            break;
          }
        }
      }
      if (best) place(i, best.dx, best.dy, best.at);
      else list[i].hidden = true;
    }
  }
  function drawStage(m) {
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(m);
    const v = state.at[state.scene];
    sc.begin();
    drawBall(m);
    const drawn = { bargmann: drawBargmann, jet: drawJet, haar: drawHaar, hecke: drawHecke }[state.scene](m, v);
    const here = drawn.here;
    sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m, v, drawn);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- the title, the legend and the stage button ---------- */
  const kept = (html) => html.replace(/(?:&lt;|&gt;|[=≈≥<>]) [−+]?\d[\d./]*/g, '<span class="nb">$&</span>').replace(/‖/g, '<span class="nm">$&</span>');
  function bigline(m) {
    switch (state.scene) {
      case 'jet':
        if (state.lens) return L(`经典切线 · 割线斜率 ≈ ${m.secant ? fix(fval(m.secant), 4) : '—'} → f′(x₀)`, `Classical tangent · secant slope ≈ ${m.secant ? fix(fval(m.secant), 4) : '—'} → f′(x₀)`);
        return m.chart === 'x'
          ? L(`二阶射流 · x₀ = ${fstr(m.s0)} · (${m.j.map(fstr).join(', ')})`, `Second-order jet · x₀ = ${fstr(m.s0)} · (${m.j.map(fstr).join(', ')})`)
          : L('二阶射流 · [1:0] → (−1, 0)', 'Second-order jet · [1:0] → (−1, 0)');
      case 'haar':
        return state.lens
          ? L(`哈尔积分 · ⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ ≈ ${fix(quad(m.ci, m.cj), 4)}`, `Haar integral · ⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ ≈ ${fix(quad(m.ci, m.cj), 4)}`)
          : L(`无 π 哈尔 · ⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ = ${fstr(m.value)}`, `π-free Haar · ⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ = ${fstr(m.value)}`);
      case 'hecke':
        return m.mode === 'fractran'
          ? L('Ω-FRACTRAN · Ȳ/5：XY 通过，YX 拦下', 'Ω-FRACTRAN · Ȳ/5: XY passes, YX blocked')
          : state.lens
            ? L(`p = 5 赫克 · |λ̂| = 2/5 ≤ 2√5 ≈ ${fix(2 * Math.sqrt(5), 4)}`, `p = 5 Hecke · |λ̂| = 2/5 ≤ 2√5 ≈ ${fix(2 * Math.sqrt(5), 4)}`)
            : L(`p = 5 赫克 · Σ χ₁(q s) = ${fstr(m.total)}`, `p = 5 Hecke · Σ χ₁(q s) = ${fstr(m.total)}`);
      default:
        return state.lens ? L(`球面三角 · 角盈 E ≈ ${fix(excess(m), 4)}`, `Spherical triangle · excess E ≈ ${fix(excess(m), 4)}`) : L(`巴格曼—格拉姆 · det G₃ = ${fstr(m.det)}`, `Bargmann–Gram · det G₃ = ${fstr(m.det)}`);
    }
  }
  function subline(m) {
    switch (state.scene) {
      case 'jet':
        return state.lens
          ? L('经典读法：切线是割线的极限；α = 0 的前向欧拉步沿切线离开圆。', 'Classical reading: the tangent is a limit of secants; the forward Euler step α = 0 leaves the circle along it.')
          : L('琥珀是 x₀；青色射流与 α = 1/2 凯莱步留在圆上，品红切平面与 α = 0 切步外漂。', 'Amber is x₀; the cyan jet and the α = 1/2 Cayley step stay on the circle, the magenta plane and α = 0 step drift out.');
      case 'haar':
        return state.lens
          ? L('经典读法：密度含 π，数值积分只能逼近；颜色是 χᵢχⱼ。', 'Classical reading: the density carries π and quadrature only approaches; the colour is χᵢχⱼ.')
          : L(`E[κⁿ] = ${m.kmom.map(fstr).join(', ')}；颜色是 χᵢχⱼ（青正、品红负），墨圈是节点壳，琥珀是 κ。`, `E[κⁿ] = ${m.kmom.map(fstr).join(', ')}; colour χᵢχⱼ (cyan +, magenta −), ink nodal shells, amber κ.`);
      case 'hecke':
        return m.mode === 'fractran'
          ? L('青色先 X 后 Y，品红先 Y 后 X；只有最后压进的 Y 能被 Ȳ/5 退出。', 'Cyan pushes X then Y, magenta Y then X; only a Y pushed last can be undone by Ȳ/5.')
          : L(`六个模 5 跳跃：青 χ₁ > 0，品红 χ₁ < 0，墨圈 κ = 1/4；λ̂ = −2/5，4·5 − λ̂² = ${fstr(MARGIN)} > 0。`, `Six jumps of norm 5: cyan χ₁ > 0, magenta χ₁ < 0, ink κ = 1/4; λ̂ = −2/5, 4·5 − λ̂² = ${fstr(MARGIN)} > 0.`);
      default:
        return state.lens
          ? L('经典读法：边长与角都要反余弦，角盈要减去 π。', 'Classical reading: sides and angles need arccos, the excess subtracts π.')
          : L('o、b、c 所在的大二维球：青弧标 κ，品红是球面三角形；c = [b, o, b] 时塌成一条大圆。', 'The great 2-sphere through o, b, c: cyan arcs carry κ, magenta is the triangle; at c = [b, o, b] it lies on one great circle.');
    }
  }
  function legendItems(m) {
    switch (state.scene) {
      case 'jet':
        return [
          ['ik', L('凯莱圆', 'Cayley circle')],
          ['cy', L('射流 · α = 1/2', 'jet · α = 1/2')],
          ['mg box', L('切平面 · α = 0', 'tangent · α = 0')],
          ['am', 'x₀']
        ];
      case 'haar':
        return [
          ['cy box', 'χᵢχⱼ > 0'],
          ['mg box', 'χᵢχⱼ < 0'],
          ['ik', L('节点壳', 'nodal shells')],
          ['am', 'κ']
        ];
      case 'hecke':
        return m.mode === 'fractran'
          ? [
              ['cy', 'X · Y · Ȳ/5'],
              ['mg', 'Y · X'],
              ['ik', 'o']
            ]
          : [
              ['cy', 'χ₁ > 0'],
              ['mg', 'χ₁ < 0'],
              ['ik', 'κ = 1/4'],
              ['am', L('已求和', 'summed')]
            ];
      default:
        return [
          ['cy', L('κ 的测地弧', 'arcs with κ')],
          ['mg box', L('球面三角形', 'spherical triangle')],
          ['vi', '[b, o, b]'],
          ['am', 'c']
        ];
    }
  }
  const ACTS = {
    bargmann: ['c ↔ [b, o, b]', 'c ↔ [b, o, b]'],
    jet: ['下一个 x₀ ▸', 'Next x₀ ▸'],
    haar: ['下一对 ▸', 'Next pair ▸'],
    hecke: ['换模式 ▸', 'Switch mode ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = kept(bigline(m));
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]);
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }
  /** The angle sum minus π of the drawn triangle (classical lens; doubles). */
  function excess(m) {
    const g = bargmannGeo(m, m.k),
      ang = (p, a, b) => {
        const ta = unit(sub(a, scale(p, dot(a, p)))),
          tb = unit(sub(b, scale(p, dot(b, p))));
        return Math.acos(clamp(dot(ta, tb), -1, 1));
      };
    if (fval(m.det) < 1e-12) return 0;
    return ang(g.A, g.B, g.C) + ang(g.B, g.C, g.A) + ang(g.C, g.A, g.B) - PI;
  }
  /** ⟨χᵢ, χⱼ⟩ by quadrature in the classical lens: (2/π) ∫ χᵢχⱼ(cos²θ) sin²θ dθ over [0, π], Simpson with 400 steps. */
  function quad(i, j) {
    const n = 400,
      f = (t) => {
        const k = cs(t) ** 2;
        return pfloat(CHI[i], k) * pfloat(CHI[j], k) * sn(t) ** 2;
      };
    let s = f(0) + f(PI);
    for (let r = 1; r < n; r++) s += (r % 2 ? 4 : 2) * f((PI * r) / n);
    return ((2 / PI) * s * (PI / n)) / 3;
  }

  /* ---------- the ledger ---------- */
  const put = (id, html) => {
    const el = $(id);
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  function rows(m) {
    const yes = '<span class="nummark">✓</span>';
    switch (state.scene) {
      case 'jet': {
        const pair = `[${String(m.P).replace('-', '−')} : ${m.Q}]`,
          red = m.g > 1n ? L(` = ${m.g}·[${String(m.Pr).replace('-', '−')} : ${m.Qr}]，κ 不变`, ` = ${m.g}·[${String(m.Pr).replace('-', '−')} : ${m.Qr}], κ unchanged`) : '';
        return {
          key: [L('κ 的二阶射流 (j₀, j₁, j₂)', 'Second-order jet (j₀, j₁, j₂) of κ'), `(${m.j.map(fstr).join(', ')})`, m.chart === 'x' ? L(` 在 x₀ = ${fstr(m.s0)}`, ` at x₀ = ${fstr(m.s0)}`) : L('（u = Q/P 图卡）', ' (chart u = Q/P)')],
          r: [
            [L('焦点 [P : Q]', 'Focus [P : Q]'), pair + red],
            [L('κ = Q²/(P² + Q²) · spread · 和', 'κ = Q²/(P² + Q²) · spread · sum'), `${fstr(m.kappa)} · ${fstr(m.spread)} · ${fstr(plus(m.kappa, m.spread))} ${yes}`],
            [L('凯莱像 (X, Y) · X² + Y²', 'Cayley image (X, Y) · X² + Y²'), `(${fstr(m.X)}, ${fstr(m.Y)}) · ${fstr(plus(times(m.X, m.X), times(m.Y, m.Y)))} ${yes}`],
            [m.chart === 'x' ? L('(1 + x²)·逆 mod η³', '(1 + x²)·inverse mod η³') : L('(1 + u²)·逆 mod η³', '(1 + u²)·inverse mod η³'), `(${m.base.map(fstr).join(', ')})·(${m.inv.map(fstr).join(', ')}) = (${m.check.map(fstr).join(', ')}) ${yes}`],
            [L('h · 割线偏差 D(h) · j₂h', 'h · secant drift D(h) · j₂h'), `${fstr(m.h)} · ${fstr(m.D)} · ${fstr(m.jetD)}`],
            [L(`α = ${state.alpha} 切步：‖x₁‖² = 1 + (1 − 2α)‖Δx‖²`, `Step α = ${state.alpha}: ‖x₁‖² = 1 + (1 − 2α)‖Δx‖²`), `(${m.step.x1.map(fstr).join(', ')}) · ${fstr(m.step.n2)} = 1 + ${fstr(m.step.drift)}`.replace('+ −', '− ')]
          ],
          note: L('κ、spread 与凯莱像都由整数对 [P : Q] 直接算出；分子分母同乘一个非零整数，读数不变。', 'κ, spread and the Cayley image come straight from the integer pair [P : Q]; scaling both by a nonzero integer leaves the readings unchanged.')
        };
      }
      case 'haar': {
        const [a, b, c, d] = m.mono,
          mono = `(${m.mono.join(', ')})`;
        const poly = m.poly
          .map((cf, n) => [cf, n])
          .filter(([cf]) => cf[0] !== 0n)
          .map(([cf, n], i) => `${i ? (cf[0] < 0n ? ' − ' : ' + ') : cf[0] < 0n ? '−' : ''}${fstr([babs(cf[0]), cf[1]])}${n ? 'κ' + (n > 1 ? sup1(n) : '') : ''}`)
          .join('');
        return {
          key: [L(`⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ = Σ cₙ E[κⁿ]`, `⟨χ${sub1(m.ci)}, χ${sub1(m.cj)}⟩ = Σ cₙ E[κⁿ]`), fstr(m.value), m.ci === m.cj ? L(' = δᵢᵢ', ' = δᵢᵢ') : L(' = δᵢⱼ，π 已约去', ' = δᵢⱼ, π cancelled')],
          r: [
            [L(`E[w${sup1(2 * a)}x${sup1(2 * b)}y${sup1(2 * c)}z${sup1(2 * d)}/‖q‖${sup1(2 * m.m)}]`, `E[w${sup1(2 * a)}x${sup1(2 * b)}y${sup1(2 * c)}z${sup1(2 * d)}/‖q‖${sup1(2 * m.m)}]`), `${mono} → ${fstr(m.E)}`],
            [L('E[κⁿ]，n = 0…4', 'E[κⁿ], n = 0…4'), m.kmom.map(fstr).join(' · ')],
            [`χ${sub1(m.ci)}χ${sub1(m.cj)}(κ)`, poly],
            [L('Σ cₙ E[κⁿ]', 'Σ cₙ E[κⁿ]'), m.terms.map(fstr).join(' + ').replace(/\+ −/g, '− ') + ` = ${fstr(m.value)}`],
            [L(`κ · χ${sub1(m.ci)}(κ) · χ${sub1(m.cj)}(κ)`, `κ · χ${sub1(m.ci)}(κ) · χ${sub1(m.cj)}(κ)`), `${fstr(m.level)} · ${fstr(m.chiI)} · ${fstr(m.chiJ)}`],
            [L('经典：(2/π)∫ χᵢχⱼ sin²θ dθ（数值）', 'Classical: (2/π)∫ χᵢχⱼ sin²θ dθ (quadrature)'), `≈ ${fix(quad(m.ci, m.cj), 6)}`]
          ],
          note: L('哈尔测度下 E[κⁿ] = (2n)!/(4ⁿ n!(n + 1)!)：阶乘之比，没有 π。', 'Under the Haar measure E[κⁿ] = (2n)!/(4ⁿ n!(n + 1)!): a ratio of factorials, no π.')
        };
      }
      case 'hecke': {
        if (m.mode === 'fractran')
          return {
            key: [L('门 Ȳ/5', 'Gate Ȳ/5'), `${tup(GATE_XY.out)} · ${L('拦下', 'blocked')}`, L('（ψ<sub>XY</sub> 通过 · ψ<sub>YX</sub> 拦下）', ' (ψ<sub>XY</sub> passes · ψ<sub>YX</sub> blocked)')],
            r: [
              ['X · Y', `${tup(X5)} · ${tup(Y5)}`],
              ['ψ<sub>XY</sub> = X·Y · ψ<sub>YX</sub> = Y·X', `${tup(PSI_XY)} · ${tup(PSI_YX)}`],
              [L('‖ψ‖² = ‖X‖²‖Y‖²', '‖ψ‖² = ‖X‖²‖Y‖²'), `${qn2(PSI_XY)} = ${qn2(X5)} · ${qn2(Y5)} ${yes}`],
              ['ψ<sub>XY</sub>·Ȳ', `${tup(GATE_XY.raw)} ≡ 0 mod 5 → ${tup(GATE_XY.out)}`],
              ['ψ<sub>YX</sub>·Ȳ', `${tup(GATE_YX.raw)} · mod 5 = ${tup(GATE_YX.rem)}`],
              [L('经典对照：XY − YX', 'Classical contrast: XY − YX'), `${tup(PSI_XY.map((v, i) => v - PSI_YX[i]))} ≠ 0`]
            ],
            note: L('门只认最后压进的因子：先 X 后 Y 的栈能退出 Y，先 Y 后 X 的栈余数不为 0。', 'The gate sees only the factor pushed last: the stack X then Y gives Y back, the stack Y then X leaves a nonzero remainder.')
          };
        return {
          key: [L('(T̂₅χ₁)(q) = −(2/5)·χ₁(q)', '(T̂₅χ₁)(q) = −(2/5)·χ₁(q)'), `${fstr(m.total)} = ${fstr(m.rhs)}`, cmp(m.total, m.rhs) === 0 ? ` ${yes}` : ' ✗'],
          r: [
            [L('q · ‖q‖² · κ(o, q) · χ₁(q)', 'q · ‖q‖² · κ(o, q) · χ₁(q)'), `${tup(m.q)} · ${m.N} · ${fstr(m.kappa)} · ${fstr(m.chi)}`],
            [L(`前 ${m.n} 个跳跃的 Σ χ₁(q s)`, `Σ χ₁(q s) over the first ${m.n} jumps`), fstr(m.partial)],
            [L('Σ Re(q s)² = 6w² + 8(x² + y² + z²)', 'Σ Re(q s)² = 6w² + 8(x² + y² + z²)'), `${m.reSq} = ${m.reSqForm} ${m.reSq === m.reSqForm ? yes : '✗'}`],
            [L('拉马努金：4·5 − λ̂²', 'Ramanujan: 4·5 − λ̂²'), `λ̂ = ${fstr(m.lambda)} · ${fstr(m.margin)} > 0 ${yes}`],
            [L('子午切片 [x : w]·[2 : 1] 的模方', 'Meridian slice [x : w]·[2 : 1], squared norms'), `${brk(m.slice.pair)}·[2 : 1] = ${brk(m.slice.prod)} · ${m.slice.left / 5n}·5 = ${m.slice.right} ${m.slice.left === m.slice.right ? yes : '✗'}`],
            [L('经典：|λ̂| ≤ 2√5', 'Classical: |λ̂| ≤ 2√5'), `2/5 ≤ ${fix(2 * Math.sqrt(5), 6)}…`]
          ],
          note:
            L('平凡特征 χ₀ 的特征值是 6 = p + 1，χ₁ 的是 −2/5；比较只用整数：4·5·25 − 4 = 496 > 0。', 'The trivial character χ₀ has eigenvalue 6 = p + 1 and χ₁ has −2/5; the comparison uses integers only: 4·5·25 − 4 = 496 > 0.') +
            (m.chi2Ratio
              ? L(` χ₂ 不是这个六跳和的特征函数：在此 q 上 Σ χ₂(q s)/χ₂(q) = ${fstr(m.chi2Ratio)}，换一个 q 就变。`, ` χ₂ is not an eigenfunction of this six-jump sum: at this q, Σ χ₂(q s)/χ₂(q) = ${fstr(m.chi2Ratio)}, and it changes with q.`)
              : L(' χ₂ 不是这个六跳和的特征函数（此 q 在 χ₂ 的节点上）。', ' χ₂ is not an eigenfunction of this six-jump sum (this q lies on a node of χ₂).'))
        };
      }
      default: {
        const lead = m.raw.findIndex((x) => x !== 0n),
          factor = m.raw[lead] / m.b[lead],
          bTxt = factor !== 1n ? `${tup(m.raw)} = ${String(factor).replace('-', '−')}·${tup(m.b)}` : tup(m.b);
        return {
          key: [L('det G₃ = 1 + 2B − (κ_ab + κ_bc + κ_ca)', 'det G₃ = 1 + 2B − (κ_ab + κ_bc + κ_ca)'), fstr(m.det), cmp(m.det, ZERO) === 0 ? L(' = 0：三点在同一大圆上', ' = 0: one great circle') : ' ≥ 0'],
          r: [
            [L('o · b · c（规范代表）', 'o · b · c (canonical)'), `${tup(m.a)} · ${bTxt} · ${tup(m.c)}`],
            ['κ(o, b) · κ(b, c) · κ(c, o)', `${fstr(m.kab)} · ${fstr(m.kbc)} · ${fstr(m.kca)}`],
            ['B(o, b, c) · 1 + 2B − Σκ', `${fstr(m.B)} · ${fstr(m.det)}`],
            [L('[b, o, b] = b·ō·b（规范）', '[b, o, b] = b·ō·b (canonical)'), tup(m.c0)],
            [L('时间轴 c = (16 − k)·[b, o, b] + k·c', 'Rail c = (16 − k)·[b, o, b] + k·c'), `k = ${m.k} → ${tup(m.c)}`],
            [L('经典：边长 θ（反余弦）', 'Classical: sides θ (arccos)'), sides(m)]
          ],
          note: L('锚点 [0:1]、[1:1]、[1:0] 的 κ 依次是 1、1/2、0，spread 是 0、1/2、1，两者之和恒为 1。', 'The anchors [0:1], [1:1], [1:0] have κ = 1, 1/2, 0 and spread 0, 1/2, 1; the two always add up to 1.')
        };
      }
    }
  }
  function sides(m) {
    const g = bargmannGeo(m, m.k),
      deg = (a, b) => `${fix((Math.acos(clamp(dot(a, b), -1, 1)) * 180) / PI, 2)}°`;
    return `≈ ${deg(g.A, g.B)} · ${deg(g.B, g.C)} · ${deg(g.C, g.A)}`;
  }
  function readings(m) {
    const R = rows(m);
    put('roKeyL', R.key[0]);
    put('roKey', kept(R.key[1]));
    put('roKeySub', kept(R.key[2]));
    R.r.forEach(([l, v], i) => {
      put('roL' + (i + 1), kept(l));
      put('roV' + (i + 1), kept(v));
    });
    put('roNote', R.note);
    $('scenePill').innerHTML = `${L(['三角', '射流', '哈尔', '赫克'][SCENES.indexOf(state.scene)], ['Triad', 'Jet', 'Haar', 'Hecke'][SCENES.indexOf(state.scene)])} <strong>${state.lens ? 'ℝ' : 'Ω'}</strong>`;
    $('keyPill').innerHTML = `P/Q <strong>${kept(R.key[1])}</strong>`;
    $('ctlAside').textContent = `${SCENES.indexOf(state.scene) + 1}/4`;
    for (const g of document.querySelectorAll('#ctlPanel .grp')) g.hidden = g.dataset.scene !== state.scene;
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(!!state.lens));
    // the dials follow the state
    const setF = (id, v) => {
      if ($(id).value !== String(v)) $(id).value = String(v);
      $(id + 'Out').textContent = String(v).replace('-', '−');
    };
    ['w', 'x', 'y', 'z'].forEach((c, i) => {
      setF('b' + c, state.b[i]);
      setF('c' + c, state.c[i]);
      setF('q' + c, state.q[i]);
    });
    ['a', 'b', 'c', 'd'].forEach((c, i) => setF('m' + c, state.mono[i]));
    setF('pP', state.P);
    setF('pQ', state.Q);
    if (state.scene === 'bargmann') bgChips.set(m.k === 0 ? 'double' : m.k === KMAX && same4(m.b, PHALF) && same4(m.cEnd, QHALF) ? 'triad' : null, true);
    anchorChips.set(`${state.P}:${state.Q}`, true);
    alphaChips.set(state.alpha, true);
    ciChips.set(state.ci, true);
    cjChips.set(state.cj, true);
    modeChips.set(state.mode, true);
    $('hint').textContent = L('Space 播放 · ← → 一步 · 拖空白处转视角', 'Space plays · ← → one step · drag empty space to orbit');
    $('formula').textContent = {
      bargmann: 'det G₃ = 1 + 2B − (κab + κbc + κca) ≥ 0',
      jet: 'κ(x₀ + η) = (1 + x₀² + 2x₀η + η²)⁻¹ mod η³',
      haar: 'E[κⁿ] = (2n)! / (4ⁿ n! (n + 1)!)',
      hecke: state.mode === 'fractran' ? 'ψ → ψ·Ȳ/5 iff ψ·Ȳ ≡ 0 mod 5' : 'Σ_{s∈S₅} χ₁(q s) = −(2/5) χ₁(q)'
    }[state.scene];
  }
  const same4 = (a, b) => a.every((v, i) => v === b[i]);

  /* ---------- the strip ---------- */
  const LEGEND_PX = 10.5,
    ROW = 14,
    PAD = [46, 14, 10, 22];
  function legendRows(cv, items, width) {
    const ctx = cv.getContext('2d');
    ctx.font = `${LEGEND_PX}px ${TRV.fonts.body}`;
    const out = [];
    let row = [],
      x = 0;
    for (const [color, label, kind] of items) {
      const w = 19 + ctx.measureText(label).width;
      if (row.length && x + w > width) {
        out.push(row);
        row = [];
        x = 0;
      }
      row.push([color, label, kind, x]);
      x += w + 16;
    }
    out.push(row);
    return out;
  }
  function headroom(cv, rows, lo, hi) {
    const ih = Math.max(1, cv.clientHeight - PAD[2] - PAD[3]),
      need = 9 + ROW * (rows - 1) + 24,
      share = clamp(need / ih, 0.37, 0.8);
    return lo + (hi - lo) / (1 - share);
  }
  function drawLegend(g, rws) {
    const ctx = g.ctx;
    ctx.save();
    ctx.font = `${LEGEND_PX}px ${TRV.fonts.body}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    rws.forEach((row, k) => {
      const y = g.pt + 9 + ROW * k;
      for (const [color, label, kind, dx] of row) {
        const x = g.pl + 10 + dx;
        ctx.strokeStyle = ctx.fillStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(kind === 'dash' ? [4, 3] : []);
        ctx.beginPath();
        if (kind === 'dot') {
          ctx.arc(x + 7, y, 3.5, 0, TAU);
          ctx.fill();
        } else {
          ctx.moveTo(x, y);
          ctx.lineTo(x + 14, y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.fillStyle = P.ink;
        ctx.fillText(label, x + 19, y);
      }
    });
    ctx.restore();
  }
  const ticks = (lo, hi, n = 4) => {
    const span = hi - lo,
      step = 10 ** Math.floor(Math.log10(span / n)),
      e = [1, 2, 5, 10].find((f) => span / (f * step) <= n) * step;
    const out = [];
    for (let v = Math.ceil(lo / e) * e; v <= hi + 1e-9; v += e) out.push([v, fix(v, e < 1 ? (e < 0.1 ? 2 : 1) : 0)]);
    return out;
  };
  function drawPlot(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const width = cv.clientWidth - PAD[0] - PAD[1] - 12;
    const frame = (items, x, lo, hi, xt) => {
      const rws = legendRows(cv, items, width);
      const g = kit.plot(cv, { x, y: [lo, headroom(cv, rws.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: xt, yTicks: ticks(lo, hi) });
      return [g, rws];
    };
    if (state.scene === 'bargmann') {
      $('plotTitle').textContent = L('沿时间轴：det G₃ 与 B', 'Along the rail: det G₃ and B');
      $('plotMeta').textContent = `k = ${m.k}/16`;
      const det = m.series.map((s, k) => [k / KMAX, fval(s.det)]),
        Bs = m.series.map((s, k) => [k / KMAX, fval(s.B)]),
        all = [...det, ...Bs].map((p) => p[1]),
        lo = Math.min(0, ...all) - 0.02,
        hi = Math.max(0.05, ...all) + 0.02;
      const [g, rws] = frame(
        [
          [P.magenta, 'det G₃'],
          [P.cyan, 'B(o, b, c)', 'dash']
        ],
        [0, 1],
        lo,
        hi,
        [[0, '0'], [0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1, '1']]
      );
      g.hline(0, P.dim, { alpha: 0.7 });
      g.line(Bs, P.cyan, { width: 1.5, dash: [4, 3] });
      g.line(det, P.magenta, { width: 2 });
      det.forEach(([x, y]) => g.dot(x, y, P.magenta, 2.2));
      g.dot(m.k / KMAX, fval(m.det), P.amber, 4.6);
      drawLegend(g, rws);
    } else if (state.scene === 'jet') {
      $('plotTitle').textContent = L('割线偏差 D(h) 与 j₂h', 'Secant drift D(h) and j₂h');
      $('plotMeta').textContent = `h = ${fstr(m.h)}`;
      const D = m.series.map((s) => [fval(s.h), fval(s.D)]),
        J = m.series.map((s) => [fval(s.h), fval(s.J)]),
        all = [...D, ...J].map((p) => p[1]),
        lo = Math.min(...all) - 0.02,
        hi = Math.max(...all) + 0.02;
      const [g, rws] = frame(
        [
          [P.cyan, 'D(h)'],
          [P.violet, 'j₂·h', 'dash']
        ],
        [-1, 1],
        lo,
        hi,
        [[-1, '−1'], [-0.5, '−1/2'], [0, '0'], [0.5, '1/2'], [1, '1']]
      );
      g.hline(0, P.dim, { alpha: 0.7 });
      g.vline(0, P.dim, { alpha: 0.5 });
      g.line(J, P.violet, { width: 1.5, dash: [4, 3] });
      g.line(D, P.cyan, { width: 2 });
      g.dot(fval(m.h), fval(m.D), P.amber, 4.6);
      drawLegend(g, rws);
    } else if (state.scene === 'haar') {
      $('plotTitle').textContent = L(`χ${sub1(m.ci)} 与 χ${sub1(m.cj)} 沿 κ`, `χ${sub1(m.ci)} and χ${sub1(m.cj)} along κ`);
      $('plotMeta').textContent = `κ = ${fstr(m.level)}`;
      const curve = (i) => sample(80, (x) => [x, pfloat(CHI[i], x)]),
        A = curve(m.ci),
        Bc = curve(m.cj),
        all = [...A, ...Bc].map((p) => p[1]),
        lo = Math.min(...all) - 0.2,
        hi = Math.max(...all) + 0.2;
      const [g, rws] = frame(
        [
          [P.cyan, `χ${sub1(m.ci)}(κ)`],
          [P.violet, `χ${sub1(m.cj)}(κ)`, 'dash']
        ],
        [0, 1],
        lo,
        hi,
        [[0, '0'], [0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1, '1']]
      );
      g.hline(0, P.dim, { alpha: 0.7 });
      g.line(Bc, P.violet, { width: 1.6, dash: [4, 3] });
      g.line(A, P.cyan, { width: 2 });
      for (const i of new Set([m.ci, m.cj])) NODES[i].forEach((x) => g.dot(x, 0, P.ink, 3));
      const x = fval(m.level);
      g.vline(x, P.amber, { alpha: 0.8 });
      g.dot(x, fval(m.chiI), P.amber, 4.4);
      g.dot(x, fval(m.chiJ), P.amber, 3.4);
      drawLegend(g, rws);
    } else if (m.mode === 'fractran') {
      $('plotTitle').textContent = L('乘 Ȳ 之后各坐标模 5 的余数', 'Remainders mod 5 of each entry after ·Ȳ');
      $('plotMeta').textContent = L('0 = 门打开', '0 = gate open');
      const [g, rws] = frame(
        [
          [P.cyan, 'X·Y·Ȳ'],
          [P.magenta, 'Y·X·Ȳ']
        ],
        [-0.5, 3.5],
        0,
        4.4,
        [[0, 'w'], [1, 'x'], [2, 'y'], [3, 'z']]
      );
      const bw = Math.min(16, g.iw / 14);
      range(4).forEach((i) => {
        const a = Number(GATE_XY.rem[i]),
          b = Number(GATE_YX.rem[i]);
        g.rect(i - 0.18 - bw / g.scale / 2, 0, i - 0.18 + bw / g.scale / 2, Math.max(a, 0.06), P.cyan, { alpha: 0.85 });
        g.rect(i + 0.18 - bw / g.scale / 2, 0, i + 0.18 + bw / g.scale / 2, Math.max(b, 0.06), P.magenta, { alpha: 0.85 });
      });
      drawLegend(g, rws);
    } else {
      $('plotTitle').textContent = L('六个跳跃的 χ₁ 与累加和', 'χ₁ of the six jumps and the running sum');
      $('plotMeta').textContent = `λ̂ = −2/5 · 4·5 − λ̂² = ${fstr(MARGIN)}`;
      const vals = m.jumps.map((j) => fval(j.chi)),
        run = [[0, 0], ...vals.map((_, i) => [i + 1, vals.slice(0, i + 1).reduce((s, x) => s + x, 0)])],
        all = [...vals, ...run.map((p) => p[1]), fval(m.rhs)],
        lo = Math.min(0, ...all) - 0.2,
        hi = Math.max(0, ...all) + 0.2;
      const [g, rws] = frame(
        [
          [P.cyan, 'χ₁(q s) > 0'],
          [P.magenta, 'χ₁(q s) < 0'],
          [P.amber, L('累加和', 'running sum'), 'dot'],
          [P.violet, '−(2/5)·χ₁(q)', 'dash']
        ],
        [-0.3, 6.5],
        lo,
        hi,
        range(7).map((k) => [k, String(k)])
      );
      g.hline(0, P.dim, { alpha: 0.7 });
      g.hline(fval(m.rhs), P.violet, { dash: [4, 3], width: 1.4 });
      const bw = Math.min(16, g.iw / 18);
      vals.forEach((y, i) => {
        const x = i + 1;
        g.rect(x - bw / g.scale / 2, 0, x + bw / g.scale / 2, y, y > 0 ? P.cyan : P.magenta, { alpha: i < m.n ? 0.9 : 0.3 });
      });
      g.line(run.slice(0, m.n + 1), P.amber, { width: 1.6 });
      run.slice(0, m.n + 1).forEach(([x, y]) => g.dot(x, y, P.amber, 3));
      drawLegend(g, rws);
    }
  }

  const paint = kit.painter(() => {
    const m = calc();
    hud(m);
    TRV.hudFit();
    drawStage(m);
    readings(m);
    drawPlot(m);
  }, [stage, $('plot')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.bargmann.rate,
    step: 1,
    max: RAILS.bargmann.max,
    t: STILL.bargmann,
    format: (t) => {
      const k = Math.round(t);
      switch (state.scene) {
        case 'jet':
          return `h = ${fstr(frac(k, HDEN))}`;
        case 'haar':
          return `κ = ${fstr(frac(LMAX - k, LMAX))}`;
        case 'hecke':
          return state.mode === 'fractran' ? [L('o', 'o'), L('压入', 'push'), L('再压入', 'push'), L('门 Ȳ/5', 'gate Ȳ/5')][clamp(k, 0, 3)] : L(`跳跃 ${clamp(k, 0, 6)}/6`, `jumps ${clamp(k, 0, 6)}/6`);
        default:
          return `k = ${k}/16`;
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail that counts comes to rest on a whole number
      if (!c.playing && abs(t - Math.round(t)) > 1e-9) {
        c.set(Math.round(t));
        return;
      }
      state.at[state.scene] = c.playing ? t : Math.round(t);
      // a card plays from its start up to its still and parks there
      if (stopAt != null && c.playing && t >= stopAt - 1e-12) {
        const s = stopAt;
        stopAt = null;
        c.pause();
        c.set(s);
        return;
      }
      if (!c.playing) stopAt = null;
      paint();
    }
  };
  const clock = kit.clock(clockOpts);
  function setRail() {
    const r = RAILS[state.scene];
    clock.rate = r.rate;
    clock.step = 1;
    $('now').step = '1';
    const max = railMax(),
      at = Math.min(state.at[state.scene], max);
    clock.setMax(max, true);
    clock.set(at, true);
    state.at[state.scene] = at;
  }
  playBtn.addEventListener('click', () => {
    stopBootPlay();
    clock.toggle();
  });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopBootPlay();
      clock.pause();
      clock.set(0);
    });

  /* a card that plays inside a book starts once the stage is half in view and pauses when it leaves; the first touch of
     the reader ends this for good */
  let bootIO = null;
  function bootAutoplay(target) {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const inView = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (inView && !started) {
          started = true;
          clock.set(0);
          stopAt = target;
          clock.play();
        } else if (!inView && clock.playing) clock.pause();
      },
      { threshold: [0, 0.5, 1] }
    );
    bootIO.observe(stage);
  }
  function stopBootPlay() {
    if (bootIO) {
      bootIO.disconnect();
      bootIO = null;
    }
  }
  $('play').addEventListener('click', stopBootPlay, true);
  $('now').addEventListener('input', stopBootPlay, true);
  document.addEventListener(
    'keydown',
    (ev) => {
      if ([' ', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(ev.key)) stopBootPlay();
    },
    true
  );

  /* ---------- controls ---------- */
  let booting = true;
  function setScene(scene) {
    clock.pause();
    state.scene = scene;
    setRail();
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopBootPlay();
    stopAt = null;
    cards.mark(null);
    clock.pause();
  }
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene);
    state.cam = 'card';
    camChips.set('card', true);
    sc.view(camOf('card'), 0);
  }
  /** A control of a card shows the card and changes it. */
  function steer(scene, change) {
    leave();
    show(scene);
    change();
    setRail();
    paint();
  }
  /** A quadruple of the dials: the zero tuple is no point, so the moved entry falls back to 1. */
  const nonzero = (t, i) => {
    if (t.every((v) => v === 0)) t[i] = 1;
  };
  const quadField = (prefix, keyOf, scene) =>
    ['w', 'x', 'y', 'z'].forEach((c, i) =>
      kit.field($(prefix + c), {
        out: $(prefix + c + 'Out'),
        fmt: (v) => String(v).replace('-', '−'),
        onInput: (v) =>
          steer(scene, () => {
            const t = state[keyOf];
            t[i] = Math.round(v);
            nonzero(t, i);
          })
      })
    );
  quadField('b', 'b', 'bargmann');
  quadField('c', 'c', 'bargmann');
  quadField('q', 'q', 'hecke');
  ['a', 'b', 'c', 'd'].forEach((c, i) => kit.field($('m' + c), { out: $('m' + c + 'Out'), onInput: (v) => steer('haar', () => (state.mono[i] = Math.round(v))) }));
  kit.field($('pP'), {
    out: $('pPOut'),
    fmt: (v) => String(v).replace('-', '−'),
    onInput: (v) =>
      steer('jet', () => {
        state.P = Math.round(v);
        if (state.P === 0 && state.Q === 0) state.Q = 1;
      })
  });
  kit.field($('pQ'), {
    out: $('pQOut'),
    onInput: (v) =>
      steer('jet', () => {
        state.Q = Math.round(v);
        if (state.P === 0 && state.Q === 0) state.P = 1;
      })
  });
  const bgChips = kit.chips($('bgChips'), 'bg', (v) =>
    steer('bargmann', () => {
      if (v === 'double') {
        clock.set(0, true);
        state.at.bargmann = 0;
      } else {
        state.b = [1, 1, 0, 0];
        state.c = [1, 0, 1, 0];
        clock.set(KMAX, true);
        state.at.bargmann = KMAX;
      }
    })
  );
  const anchorChips = kit.chips($('anchorChips'), 'anchor', (v) =>
    steer('jet', () => {
      const [p, q] = v.split(':').map(Number);
      state.P = p;
      state.Q = q;
    })
  );
  const alphaChips = kit.chips($('alphaChips'), 'alpha', (v) => steer('jet', () => (state.alpha = ALPHAS.includes(v) ? v : '1/2')));
  const ciChips = kit.chips($('ciChips'), 'ci', (v) => steer('haar', () => (state.ci = Number(v))));
  const cjChips = kit.chips($('cjChips'), 'cj', (v) => steer('haar', () => (state.cj = Number(v))));
  const modeChips = kit.chips($('modeChips'), 'mode', (v) =>
    steer('hecke', () => {
      state.mode = v === 'fractran' ? 'fractran' : 'hecke';
      state.at.hecke = railMax();
    })
  );
  const JET_STOPS = [
    [1, 1],
    [1, 2],
    [0, 1],
    [2, 1],
    [-1, 1],
    [1, 0]
  ];
  const PAIRS = [
    [1, 2],
    [1, 1],
    [2, 2],
    [0, 1],
    [0, 2],
    [0, 0]
  ];
  $('stageAct').addEventListener('click', () => {
    const scene = state.scene;
    if (scene === 'bargmann')
      steer('bargmann', () => {
        const to = state.at.bargmann === 0 ? KMAX : 0;
        state.at.bargmann = to;
        clock.set(to, true);
      });
    else if (scene === 'jet')
      steer('jet', () => {
        const k = JET_STOPS.findIndex(([p, q]) => p === state.P && q === state.Q);
        [state.P, state.Q] = JET_STOPS[(k + 1) % JET_STOPS.length];
      });
    else if (scene === 'haar')
      steer('haar', () => {
        const k = PAIRS.findIndex(([i, j]) => i === state.ci && j === state.cj);
        [state.ci, state.cj] = PAIRS[(k + 1) % PAIRS.length];
      });
    else
      steer('hecke', () => {
        state.mode = state.mode === 'hecke' ? 'fractran' : 'hecke';
        state.at.hecke = state.mode === 'hecke' ? 6 : FMAX;
      });
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = ['card', 'pole', 'side'].includes(v) ? v : 'card';
    sc.view(camOf(state.cam), TRV.still || booting ? 0 : 600);
    paint();
  });
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'lensMirror']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards ---------- */
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    const lens = state.lens;
    Object.assign(state, copy(FRESH), copy(p.set), { lens, at: { ...STILL } });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    setScene(p.scene);
    state.cam = 'card';
    camChips.set('card', true);
    sc.view(camOf('card'), booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    } else if (booting && TRV.embed && !TRV.still && !TRV.reduceMotion) bootAutoplay(p.still);
    paint();
  }
  const NOTES = {
    'bargmann-gram-triad': [
      'c 从 [b, o, b] 走到 qHalf：品红三角形离开一条大圆张开，det G₃ 从 0 升到 1/4。',
      'c moves from [b, o, b] to qHalf: the magenta triangle opens off one great circle, det G₃ rises from 0 to 1/4.'
    ],
    'jet2-osculating-sphere': [
      '琥珀 x₀ = 1：青色射流 (1/2, −1/2, 1/4) 贴着凯莱圆；h = 1/2 时 α = 1/2 凯莱步留在圆上，品红 α = 0 切步外漂。',
      'Amber x₀ = 1: the cyan jet (1/2, −1/2, 1/4) hugs the circle; at h = 1/2 the α = 1/2 Cayley step stays on it, the magenta α = 0 step drifts out.'
    ],
    'pi-free-haar-peter-weyl': [
      '琥珀圈从 o 降到 κ = 1/4，落在 χ₁ 的节点壳上；颜色是 χ₁χ₂，⟨χ₁, χ₂⟩ = 0。',
      'The amber circles move down from o to κ = 1/4, onto the nodal shell of χ₁; the colour is χ₁χ₂, and ⟨χ₁, χ₂⟩ = 0.'
    ],
    'hecke-p5-and-omega-fractran': [
      '六个模 5 跳跃从 q = (2, 1, 3, −1) 依次亮起，χ₁ 之和是 −(2/5)·χ₁(q) = −2/75。',
      'The six jumps of norm 5 leave q = (2, 1, 3, −1) one by one; their χ₁ add up to −(2/5)·χ₁(q) = −2/75.'
    ]
  };
  const cards = kit.cards($('presets'), {
    presets: PRESETS,
    notes: NOTES,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: ['自由探索：时间轴、琥珀手柄与右栏旋钮改的是本卡的量，账本里的每个数都是约分后的整数之比。', 'Free play: the rail, the amber handle and the dials change the quantity of the card; every number of the ledger is a reduced ratio of integers.']
  });

  /* ---------- the amber handle ---------- */
  const viewportPoint = (v) => {
    const q = sc.p(handleWorld(v)),
      b = $('cv').getBoundingClientRect();
    return { x: b.left + q[0], y: b.top + q[1] };
  };
  let dragging = null;
  handle.onpointerdown = (ev) => {
    if (ev.button !== 0 || TRV.still) return;
    ev.preventDefault();
    leave();
    dragging = ev.pointerId;
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  /** The rational foci of the jet card: [1 : 0] and the reduced P/Q with |P|, Q ≤ 12. */
  const FOCI = [[1, 0]];
  for (let Qd = 1; Qd <= 12; Qd++) for (let Pn = -12; Pn <= 12; Pn++) if (bgcd(BigInt(Pn), BigInt(Qd)) === 1n) FOCI.push([Pn, Qd]);
  const focusWorld = (Pn, Qd) => {
    const n = Pn * Pn + Qd * Qd;
    return cayPt((Qd * Qd - Pn * Pn) / n, (2 * Pn * Qd) / n);
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    if (state.scene === 'jet') {
      // the rational focus nearest the pointer; the present one before others at the same place
      const g = bgcd(BigInt(state.P), BigInt(state.Q)),
        now = [Number(BigInt(state.P) / g), Number(BigInt(state.Q) / g)];
      let best = now,
        gap = Infinity;
      for (const f of FOCI) {
        const p = sc.p(focusWorld(...f));
        if (p[2] < -0.05) continue;
        const d = hypot(p[0] - x, p[1] - y) + (f[0] === now[0] && f[1] === now[1] ? 0 : 0.5);
        if (d < gap) {
          gap = d;
          best = f;
        }
      }
      if (best[0] !== state.P || best[1] !== state.Q) {
        [state.P, state.Q] = best;
        paint();
      }
      return;
    }
    // the whole step of the rail nearest the pointer, the present one before others at the same distance
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= clock.max; k++) {
      const p = sc.p(handleWorld(k)),
        d = hypot(p[0] - x, p[1] - y) + abs(clock.t - k) * 1e-4;
      if (d < gap) {
        gap = d;
        best = k;
      }
    }
    if (best !== clock.t) clock.set(best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    if (state.scene === 'jet') {
      const d = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
      state.P = clamp(state.P + d, -12, 12);
      if (state.P === 0 && state.Q === 0) state.Q = 1;
      paint();
      return;
    }
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(clock.max);
    else clock.stepBy(ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1);
  };

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  const FRAME = { box: 1, qbox: 2, P: 12, Q: 12, steps: HMAX };
  function benchmarks() {
    const F = FRAME,
      span = (n) => range(2 * n + 1).map((k) => k - n),
      tuples = (n) => span(n).flatMap((w) => span(n).flatMap((x) => span(n).flatMap((y) => span(n).map((z) => Z4([w, x, y, z]))))).filter((t) => !t.every((v) => v === 0n)),
      lines = tuples(F.box).filter((t) => same4(canon(t), t)),
      all = tuples(F.qbox);
    // Gram: the formula against the 3 × 3 determinant, nonnegative; [b, o, b] flat; the scale of b changes nothing
    const det3 = (G) => G[0][0] * (G[1][1] * G[2][2] - G[1][2] * G[2][1]) - G[0][1] * (G[1][0] * G[2][2] - G[1][2] * G[2][0]) + G[0][2] * (G[1][0] * G[2][1] - G[1][1] * G[2][0]);
    let gramPairs = 0,
      gramBad = 0,
      negative = 0,
      flatBad = 0;
    for (const b of lines) {
      const c0 = triad(b, O4, b);
      const flat = gramAt(b, c0, c0, 0).det;
      if (!same(flat, ZERO)) flatBad++;
      for (const c of lines) {
        gramPairs++;
        const r = gramAt(b, c, c, KMAX),
          V = [O4, b, c],
          G = V.map((u) => V.map((v) => qdot(u, v))),
          direct = frac(det3(G), qn2(O4) * qn2(b) * qn2(c));
        if (!same(direct, r.det)) gramBad++;
        if (cmp(r.det, ZERO) < 0) negative++;
      }
    }
    // jets: the inverse, the closed secant drift against its definition, κ + spread = 1, X² + Y² = 1, scaling
    let jets = 0,
      jetBad = 0,
      driftBad = 0,
      circleBad = 0,
      scaleBad = 0,
      alphaTried = 0,
      alphaBad = 0;
    for (let Pn = -F.P; Pn <= F.P; Pn++)
      for (let Qn = 0; Qn <= F.Q; Qn++) {
        if (Pn === 0 && Qn === 0) continue;
        jets++;
        const m = jetOf({ P: Pn, Q: Qn, alpha: '1/2', at: { jet: 0 } }, false);
        if (!same(m.check[0], ONE) || !same(m.check[1], ZERO) || !same(m.check[2], ZERO)) jetBad++;
        if (!same(plus(m.kappa, m.spread), ONE) || !same(plus(times(m.X, m.X), times(m.Y, m.Y)), ONE)) circleBad++;
        if (!same(m.kappa, m.kappaReduced)) scaleBad++;
        for (const kk of [-3n, 2n, 3n]) {
          const p = BigInt(Pn) * kk,
            q = BigInt(Qn) * kk;
          if (!same(frac(q * q, p * p + q * q), m.kappa)) scaleBad++;
        }
        for (const k of [1, 4, HMAX]) {
          const st = jetOf({ P: Pn, Q: Qn, alpha: '1/2', at: { jet: k } }, false).steps;
          alphaTried += st.length;
          if (!same(st[2].n2, ONE) || st.some((x) => !same(minus(x.n2, ONE), x.drift))) alphaBad++;
        }
        if (m.chart === 'x')
          for (let k = 1; k <= F.steps; k++) {
            const h = frac(k, F.steps),
              f = (s) => over(ONE, plus(ONE, times(s, s))),
              def = minus(over(minus(f(plus(m.s0, h)), f(m.s0)), h), m.j[1]);
            if (!same(def, drift(m.s0, h))) driftBad++;
          }
      }
    // Haar: the Gram table of the characters is the identity; E[κⁿ] = Catalan(n)/4ⁿ
    const identity = GRAM.every((row, i) => row.every((v, j) => same(v, i === j ? ONE : ZERO)));
    const catalan = (n) => FACT[2 * n] / (FACT[n] * FACT[n + 1]);
    const catBad = KMOM.filter((x, n) => !same(x, frac(catalan(n), 4n ** BigInt(n)))).length;
    // Hecke: the eigen-relation and the norms on every nonzero q of the box
    let heckeTried = 0,
      heckeBad = 0,
      normBad = 0;
    for (const q of all) {
      heckeTried++;
      const m = heckeOf({ q: q.map(Number), mode: 'hecke', at: { hecke: 6 } });
      if (!same(m.total, m.rhs) || m.reSq !== m.reSqForm) heckeBad++;
      if (m.jumps.some((j) => j.n2 !== 5n * m.N) || m.slice.left !== m.slice.right) normBad++;
    }
    const doubleDet = gramAt(PHALF, triad(PHALF, O4, PHALF), triad(PHALF, O4, PHALF), 0).det,
      triadNow = gramAt(PHALF, triad(PHALF, O4, PHALF), QHALF, KMAX);
    return { lines: lines.length, gramPairs, gramBad, negative, flatBad, jets, jetBad, driftBad, circleBad, scaleBad, alphaTried, alphaBad, identity, catBad, heckeTried, heckeBad, normBad, doubleDet, triadB: triadNow.B, triadDet: triadNow.det };
  }
  const BENCH = benchmarks();
  const J1 = jetOf({ P: 1, Q: 1, alpha: '1/2', at: { jet: HMAX } }),
    HQ = heckeOf({ q: [2, 1, 3, -1], mode: 'hecke', at: { hecke: 6 } });
  const NUMBERS = {
    triadB: () => fstr(BENCH.triadB),
    triadDet: () => fstr(BENCH.triadDet),
    doubleDet: () => fstr(BENCH.doubleDet),
    jet1: () => `(${J1.j.map(fstr).join(', ')})`,
    jetCheck: () => `(${J1.check.map(fstr).join(', ')})`,
    secant: () => fstr(J1.D),
    moments: () => KMOM.map(fstr).join(', '),
    gram: (say) => (BENCH.identity ? say('单位矩阵', 'the identity') : say('不是单位矩阵', 'not the identity')),
    heckeSum: () => fstr(HQ.total),
    margin: () => fstr(MARGIN),
    pass: () => tup(GATE_XY.out),
    block: () => tup(GATE_YX.raw),
    cayStep: () => `(${J1.steps[2].x1.map(fstr).join(', ')})`,
    eulerStep: () => `(${J1.steps[0].x1.map(fstr).join(', ')})`
  };
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`);
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理与推导的个别实例，不检验定理的前提。巴格曼—格拉姆：坐标在 [−${FRAME.box}, ${FRAME.box}] 的 ${B.lines} 条有理直线两两组成 ${B.gramPairs} 个三元组 (o, b, c)，公式 1 + 2B − Σκ 与 3 × 3 格拉姆行列式${bad(B.gramBad)}，取负值 ${B.negative} 次；c = [b, o, b] 时 det G₃ = 0 ${bad(B.flatBad)}。射流：|P| ≤ ${FRAME.P}、0 ≤ Q ≤ ${FRAME.Q} 的 ${B.jets} 个齐次对上，(1 + x²)·逆 ≡ (1, 0, 0)${bad(B.jetBad)}，κ + spread = 1 与 X² + Y² = 1 ${bad(B.circleBad)}，乘以 −3、2、3 与约分后的 κ 不变${bad(B.scaleBad)}，割线偏差的闭式与定义（h = k/${FRAME.steps}）${bad(B.driftBad)}，${B.alphaTried} 个 α 切步上 ‖x₁‖² − 1 = (1 − 2α)‖Δx‖² 且 α = 1/2 留在圆上${bad(B.alphaBad)}。哈尔：⟨χᵢ, χⱼ⟩ 的 3 × 3 表${B.identity ? '是' : '不是'}单位矩阵，E[κⁿ] = Catalan(n)/4ⁿ ${bad(B.catBad)}。赫克：坐标在 [−${FRAME.qbox}, ${FRAME.qbox}] 的 ${B.heckeTried} 个非零 q 上 Σ χ₁(q s) = −(2/5) χ₁(q) 与 Σ Re(q s)² = 6w² + 8(x² + y² + z²) ${bad(B.heckeBad)}，‖q s‖² = 5‖q‖² 与子午切片的模方乘法${bad(B.normBad)}。Ω-FRACTRAN：XY·Ȳ = ${tup(GATE_XY.raw)}，YX·Ȳ = ${tup(GATE_YX.raw)}。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems and derivations above; it does not check their hypotheses. Bargmann–Gram: the ${B.lines} rational lines with entries in [−${FRAME.box}, ${FRAME.box}] form ${B.gramPairs} triples (o, b, c); the formula 1 + 2B − Σκ against the 3 × 3 Gram determinant, ${bad(B.gramBad)}, negative values ${B.negative}; det G₃ = 0 at c = [b, o, b], ${bad(B.flatBad)}. Jets: on ${B.jets} homogeneous pairs with |P| ≤ ${FRAME.P}, 0 ≤ Q ≤ ${FRAME.Q}, (1 + x²)·inverse ≡ (1, 0, 0), ${bad(B.jetBad)}; κ + spread = 1 and X² + Y² = 1, ${bad(B.circleBad)}; κ unchanged by the factors −3, 2, 3 and by reduction, ${bad(B.scaleBad)}; the closed secant drift against its definition (h = k/${FRAME.steps}), ${bad(B.driftBad)}; on ${B.alphaTried} α-steps ‖x₁‖² − 1 = (1 − 2α)‖Δx‖² with α = 1/2 on the circle, ${bad(B.alphaBad)}. Haar: the 3 × 3 table of ⟨χᵢ, χⱼ⟩ is ${B.identity ? '' : 'not '}the identity; E[κⁿ] = Catalan(n)/4ⁿ, ${bad(B.catBad)}. Hecke: on ${B.heckeTried} nonzero q with entries in [−${FRAME.qbox}, ${FRAME.qbox}], Σ χ₁(q s) = −(2/5) χ₁(q) and Σ Re(q s)² = 6w² + 8(x² + y² + z²), ${bad(B.heckeBad)}; ‖q s‖² = 5‖q‖² and the squared norms of the meridian slice, ${bad(B.normBad)}. Ω-FRACTRAN: XY·Ȳ = ${tup(GATE_XY.raw)}, YX·Ȳ = ${tup(GATE_YX.raw)}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
  const fillBench = () => {
    for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = NUMBERS[el.dataset.bench](el.closest('.en') ? EN : ZH);
  };
  fillBench();
  // the drawer repeats every evidence box of the panel, filled
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);
  if (document.fonts)
    document.fonts.ready.then(() => {
      title.key = '';
      paint();
    });

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.OMEGALAB_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        preset: cards.current,
        lens: state.lens,
        mode: state.mode,
        b: state.b,
        c: state.c,
        P: state.P,
        Q: state.Q,
        alpha: state.alpha,
        mono: state.mono,
        ci: state.ci,
        cj: state.cj,
        q: state.q,
        at: state.at,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        cam: state.cam,
        camera: { ...sc.cam },
        ledger: { ...m, series: undefined, gram: undefined },
        key: $('roKey').textContent
      });
    },
    presets: plain(PRESETS),
    bench: () => plain(BENCH),
    gates: () => plain({ xy: GATE_XY, yx: GATE_YX, psiXY: PSI_XY, psiYX: PSI_YX, lambda: LAMBDA, margin: MARGIN }),
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of the rational focus [P : Q] on the Cayley circle (jet card). */
    focusTarget: (Pn, Qd) => {
      const q = sc.p(focusWorld(Pn, Qd)),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1], depth: q[2] };
    }
  });
  window.TRV_THUMB = () => {
    cards.pick(DEFAULT);
    clock.pause();
    clock.set(PRESETS[DEFAULT].still);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
