/* OMEGA//TRIAD · 0 · 1/2 · 1 因果微分母核 · the 0 · 1/2 · 1 causal-differential triad (Chapter 39, §39.7)
   World (kit.solid): z up. The stage is the great two-sphere slice {w + xj + yk} of the unit quaternions S³(1) = 𝕋₃: the
   quaternion w + xj + yk is drawn at the world point (x, y, w), so chords are to scale and κ = 1 − chord²/4. The fourth
   axis i is not drawn.
     beat      x(t) = cos πt x₀ + sin πt x_{1/2} from the anchor x₀ = 1 to x₁ = [x_{1/2}, x₀, x_{1/2}] = −x₀, with
               s = 1 − κ(x₀, x) = (1 − cos πt)/2 from 0 over 1/2 to 1; x_{1/2} = j on the first beat;
     step      (I − αA) x₁ = (I + (1 − α)A) x₀ with A = left multiplication by σj (a skew map), so that
               ‖x₁‖² − ‖x₀‖² = (1 − 2α)‖x₁ − x₀‖²: α = 0 Itô, α = 1/2 Stratonovich–Cayley, α = 1 backward;
     closure   ω₁ = (π/2) j, the supplied context ω_ctx = θ_ctx k with τ = tan θ_ctx, Ω₂ = {ω₁, ω_ctx, ω₁} =
               [[ω₁, ω_ctx], ω₁] with [a, b] = a × b, and the refracted landing x₁ = −exp Ω₂. The magenta lune lies between
               two headings θ_ctx apart: its area is 2θ_ctx and its part up to s is the share s of it;
     cap       the tetrahedron V₀ = x₀, V₁ = the probe, V₂ and V₃ = (5j ∓ 12k)/13, with F(i, j, k) = minus half the signed
               area of the geodesic triangle;
     heartbeat four beats B₀ … B₃; each lands at −x₀ (s = 1), is read there as the next 0 (s′ = 0), and the heading turns by
               the lune holonomy 2θ_ctx.
   The rail is the sampling α on the Present card and the place t in the beat (in the four beats) on the others; the amber
   point and its handle are the point the rail moves. Every number is computed here; the instances of the cited Lean
   theorems are in instances(), and the NUM box and the numbers of the drawer are computed once, in benchmarks(). A number
   is printed after “=” only when the printed decimal is the value, decided on fractions, and after “≈” when it rounds it.
   Read-only probe: window.CAUSAL_TRIAD_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    SQ2 = Math.SQRT2,
    EPS = 1e-9;
  const BEATS = 4,
    P_SCALE_Q = [11n, 5n],
    P_SCALE = 2.2;
  const cs = Math.cos,
    sn = Math.sin,
    hypot = Math.hypot;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, u) => a + (b - a) * u;
  const add = (a, b) => a.map((x, i) => x + b[i]);
  const sub = (a, b) => a.map((x, i) => x - b[i]);
  const scale = (a, k) => a.map((x) => x * k);
  const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
  const norm = (a) => Math.sqrt(dot(a, a));
  const unit = (a) => {
    const n = norm(a);
    return n > 0 ? scale(a, 1 / n) : a.slice();
  };
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

  /* ---------- exact numbers: fractions [p, q] of integers, q > 0 ----------
     A parameter is the decimal the reader sets: a double that is the nearest one to a multiple of 1/200 (s, α) or of 1/20
     (σ, τ) stands for that fraction, and every other double stands for itself. What follows from the parameters by
     + − × ÷ is a fraction too. Whether a printed decimal is the value is decided on the fraction, never on rounded doubles. */
  const frac = (p, q = 1n) => {
    let [a, b] = [p < 0n ? -p : p, q];
    while (b) [a, b] = [b, a % b];
    return [p / a, q / a];
  };
  const whole = (n) => [BigInt(n), 1n],
    quo = ([a, b], [c, d]) => (c < 0n ? frac(-a * d, -b * c) : frac(a * d, b * c)),
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d);
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  /** The double x itself: an integer over a power of two. */
  const ratio = (x) => {
    let s = 0n;
    for (; !Number.isInteger(x); s++) x *= 2;
    return frac(BigInt(x), 1n << s);
  };
  /** The fraction a parameter x on a grid of 1/n stands for. */
  const grid = (x, n) => (Math.round(x * n) / n === x ? frac(BigInt(Math.round(x * n)), BigInt(n)) : ratio(x));
  const pow10 = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
  /** A fraction as a double: its first 64 bits, then the power of two in two steps. */
  const fval = ([p, q]) => {
    if (p === 0n) return 0;
    const a = p < 0n ? -p : p,
      shift = q.toString(2).length - a.toString(2).length + 64,
      m = Number(shift >= 0 ? (a << BigInt(shift)) / q : a / (q << BigInt(-shift))),
      half = Math.trunc(shift / 2);
    return (p < 0n ? -m : m) * 2 ** -half * 2 ** (half - shift);
  };
  const fstr = ([p, q]) => String(p).replace('-', '−') + (q === 1n ? '' : '/' + q);
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
      k = (2n * a + q) / (2n * q),
      s = String(k).padStart(d + 1, '0');
    return { text: (p < 0n && k > 0n ? '−' : '') + s.slice(0, s.length - d) + (d ? '.' + s.slice(s.length - d) : ''), exact: a === k * q };
  }
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  /** A power of ten by its exponent. */
  const powerName = (x) => `10${superscript(Math.round(Math.log10(x)))}`;
  /** Four significant digits with a power of ten. */
  const sci = (x) => {
    const [m, e] = x.toExponential(3).split('e').map(Number);
    return `${kit.fix(m, 3)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them: it is written in significant digits, as 1/2 ± … or as 1 ± …, so that no reading contradicts the words beside it.
     An inequality of the page stands between exact expressions; the value follows it in a parenthesis of its own. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction, or null when it is irrational; x: the value as computed, a double; off: x − 1/2 and x − 1
      where the double x has lost them. A fraction counts only while the computed double agrees with it: a page that computes
      something else says what it computes. */
  function rel(q, x, d = 4, off = {}, marks = LANDMARKS) {
    if (q && !(Math.abs(fval(q) - x) <= 1e-9 * Math.max(1, Math.abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return `= ${text}`;
    const mark = marks.find(([v]) => Number(text.replace('−', '-')) === v);
    if (mark) {
      const [v, name] = mark,
        gap = q ? fval(minus(q, ratio(v))) : v in off ? off[v] : x - v;
      if (gap !== 0) return name ? `≈ ${name} ${gap < 0 ? '−' : '+'} ${sci(Math.abs(gap))}` : `≈ ${sci(gap)}`;
    }
    // (a value of ten thousand and more: significant digits)
    return `≈ ${Math.abs(x) >= 1e4 ? sci(x) : text}`;
  }
  /** An angle in degrees: exact only where it is known as a fraction. */
  const degRel = (q, x, d = 2) => `${rel(q, x, d, {}, LANDMARKS.slice(0, 1))}°`;
  /** A quantity that is identically the integer c: its digits, once the value x computed here agrees with it to 10⁻¹¹. */
  const idRel = (c, x, d = 4) => (Math.abs(x - c) <= 1e-11 ? rel(whole(c), c, d) : rel(ratio(x), x, d));
  /** The least power of ten above a drift x ≥ 0, after its sign; “= 0” of 0 alone. */
  function below(x) {
    if (x === 0) return '= 0';
    const q = ratio(x);
    let e = Math.ceil(Math.log10(x));
    while (cmp(q, pow10(e)) >= 0) e++;
    while (cmp(q, pow10(e - 1)) < 0) e--;
    return `&lt; 10${superscript(e)}`;
  }
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** An exact inequality, then its value in a parenthesis of its own. */
  const valued = (law, r, say = L) => law + say(`（值 ${r}）`, ` (value ${r})`);

  /* ---------- quaternions [w, i, j, k] ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qinv = (a) => scale([a[0], -a[1], -a[2], -a[3]], 1 / dot(a, a));
  const vec = (q) => [q[1], q[2], q[3]];
  const ONE = [1, 0, 0, 0],
    QI = [0, 1, 0, 0],
    QJ = [0, 0, 1, 0];
  /** exp of a pure quaternion v: cos‖v‖ + sin‖v‖ v/‖v‖. */
  function qexp(v) {
    const t = norm(v);
    if (t < 1e-15) return [1, v[0], v[1], v[2]];
    const s = sn(t) / t;
    return [cs(t), v[0] * s, v[1] * s, v[2] * s];
  }
  /** The ternary transfer of the unit-quaternion model: tri x y z = x y⁻¹ z. */
  const tri = (x, y, z) => qmul(qmul(x, qinv(y)), z);
  /** The reading κ(x, y) = (1 + ⟨x, y⟩)/2. */
  const kappa = (x, y) => (1 + dot(x, y)) / 2;
  /** The world point of a quaternion of the slice. */
  const world = (q) => [q[2], q[3], q[0]];

  /* ---------- the beats ---------- */
  /** The beat index n and the place f in the beat at the time t: the landing t = n + 1 still belongs to beat n. */
  function splitBeat(t) {
    const n = clamp(Math.ceil(t - 1e-12) - 1, 0, BEATS - 1);
    return { n, f: clamp(t - n, 0, 1) };
  }
  const shareOf = (f) => (f === 0.5 ? 0.5 : sn((PI * f) / 2) ** 2);
  const placeOf = (s) => Math.acos(clamp(1 - 2 * s, -1, 1)) / PI;
  /** The place t as beat n, place f in the beat, and the share s as a fraction [p, q] where it is one: at the three stations,
      and at a place the reader gave by its share (mark: the slider, the anchors, a still). At every other double f the share
      (1 − cos πf)/2 is irrational (Niven): null. */
  function placeAt(t, mark = null) {
    if (mark && mark.t === t) return mark;
    const { n, f } = splitBeat(t);
    return { n, f, share: f === 0 ? [0, 1] : f === 0.5 ? [1, 2] : f === 1 ? [1, 1] : null };
  }
  /** Anchor and midpoint of beat n when each landing turns the heading by β. */
  function beatFrame(n, beta) {
    const az = n * (PI - beta);
    return { x0: [n % 2 ? -1 : 1, 0, 0, 0], xHalf: [0, 0, cs(az), sn(az)] };
  }
  const beatQuat = (n, f, beta) => {
    const b = beatFrame(n, beta);
    return add(scale(b.x0, cs(PI * f)), scale(b.xHalf, sn(PI * f)));
  };
  /** The one-parameter family of steps from x₀ = 1: (1 − ασj) x₁ = (1 + (1 − α)σj) x₀. */
  const stepAt = (alpha, sigma) => qmul(qinv([1, 0, -alpha * sigma, 0]), [1, 0, (1 - alpha) * sigma, 0]);
  function stepOf(alpha, sigma) {
    const x1 = stepAt(alpha, sigma),
      dx = sub(x1, ONE),
      dx2 = dot(dx, dx);
    return { alpha, x1, norm2: dot(x1, x1), dx2, drift: dot(x1, x1) - 1, law: (1 - 2 * alpha) * dx2, tangency: dot(dx, add(ONE, x1)) };
  }
  /** The norm drift of the step as a function of α. */
  const driftAt = (a, sigma) => ((1 - 2 * a) * sigma * sigma) / (1 + a * a * sigma * sigma);

  /* ---------- the faces of the tetrahedron ---------- */
  const AZ_V = Math.atan2(12, 5);
  /** Two face phases that differ by less than this many degrees count as equal. */
  const TETRA_TOL = 1e-9;
  const tetraPoints = (f) => [
    [0, 0, 1],
    [sn(PI * f), 0, cs(PI * f)],
    [5 / 13, -12 / 13, 0],
    [5 / 13, 12 / 13, 0]
  ];
  /** Minus half the signed area of the geodesic triangle (i, j, k), in degrees; 0 when two indices agree. A triangle that
      holds both V₀ and V₁ is computed with half angles, so the landing s = 1 (V₁ = −V₀) takes the limit along the beat. */
  function facePhase(f, V, i, j, k) {
    if (i === j || j === k || k === i) return 0;
    const idx = [i, j, k];
    if (idx.includes(0) && idx.includes(1)) {
      const c = idx.find((x) => x > 1),
        even = (i === 0 && j === 1) || (j === 0 && k === 1) || (k === 0 && i === 1);
      const half = (PI * f) / 2,
        az = c === 2 ? -AZ_V : AZ_V;
      const val = -Math.atan2(sn(half) * sn(az), cs(half) + sn(half) * cs(az)) / deg;
      return even ? val : -val;
    }
    const a = V[i],
      b = V[j],
      c = V[k];
    return -Math.atan2(dot(a, cross(b, c)), 1 + dot(a, b) + dot(b, c) + dot(c, a)) / deg;
  }
  function tetraOf(f) {
    const V = tetraPoints(f),
      idx = [0, 1, 2, 3],
      tol = TETRA_TOL;
    const F = idx.map((i) => idx.map((j) => idx.map((k) => facePhase(f, V, i, j, k))));
    let defects = 0,
      edgeErrors = 0,
      worst = 0,
      quadruples = 0;
    const faceErrors = [0, 0, 0, 0];
    for (const r of idx)
      for (const i of idx)
        for (const j of idx)
          for (const k of idx) {
            const cob = F[i][j][k] - F[r][j][k] + F[r][i][k] - F[r][i][j];
            quadruples++;
            worst = Math.max(worst, Math.abs(cob));
            if (Math.abs(cob) > tol) defects++;
            if (Math.abs(F[i][j][k] - (F[r][j][k] - F[r][i][k] + F[r][i][j])) > tol) faceErrors[r]++;
          }
    for (const i of idx) for (const j of idx) for (const k of idx) if (Math.abs(F[i][j][k] - (F[0][j][k] - F[0][i][k] + F[0][i][j])) > tol) edgeErrors++;
    return {
      V,
      F123: F[1][2][3],
      F023: F[0][2][3],
      F013: F[0][1][3],
      F012: F[0][1][2],
      alternating: F[1][2][3] - F[0][2][3] + F[0][1][3] - F[0][1][2],
      defects,
      faceErrors,
      edgeErrors,
      worst,
      quadruples
    };
  }

  /* ---------- the completed zeta on the real segment: two independent computations of ξ ---------- */
  const theta = (() => {
    const U = Math.log(14),
      N = 800,
      rows = [];
    for (let k = 0; k <= N; k++) {
      const u = (U * k) / N,
        x = Math.exp(u);
      let psi = 0;
      for (let m = 1; m < 8; m++) psi += Math.exp(-PI * m * m * x);
      rows.push([u, (psi * (k === 0 || k === N ? 1 : k % 2 ? 4 : 2) * U) / (3 * N)]);
    }
    return rows;
  })();
  /** ξ(s) = ½(s(s − 1)Λ₀(s) + 1) with the pole-removed theta integral Λ₀ (Simpson in log x). */
  function xiTheta(s) {
    let sum = 0;
    for (const [u, w] of theta) sum += w * (Math.exp((u * s) / 2) + Math.exp((u * (1 - s)) / 2));
    return 0.5 * (s * (s - 1) * sum + 1);
  }
  /** ζ(s) for 0 < s < 1 by an accelerated alternating series. */
  function zetaReal(s) {
    const n = 40;
    let d = (3 + Math.sqrt(8)) ** n;
    d = (d + 1 / d) / 2;
    let b = -1,
      c = -d,
      sum = 0;
    for (let k = 0; k < n; k++) {
      c = b - c;
      sum += c / (k + 1) ** s;
      b = ((k + n) * (k - n) * b) / ((k + 0.5) * (k + 1));
    }
    return sum / d / (1 - 2 ** (1 - s));
  }
  const LANCZOS = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  function gammaReal(z) {
    if (z < 0.5) return PI / (sn(PI * z) * gammaReal(1 - z));
    const y = z - 1;
    let x = 0.99999999999980993;
    LANCZOS.forEach((g, i) => (x += g / (y + i + 1)));
    const t = y + 7.5;
    return Math.sqrt(TAU) * t ** (y + 0.5) * Math.exp(-t) * x;
  }
  /** ½ s(s − 1) Λ(s) with Λ(s) = π^{−s/2} Γ(s/2) ζ(s), for 0 < s < 1. */
  const xiProduct = (s) => 0.5 * s * (s - 1) * PI ** (-s / 2) * gammaReal(s / 2) * zetaReal(s);
  const XI_CURVE = sample(40, (t) => [t, xiTheta(t)]);

  /** Everything the page shows that depends on the place t, the sampling α, the span σ and the context ratio τ. */
  function compute(t, alpha, sigma, tau, mark = null) {
    const { n, f, share } = placeAt(t, mark),
      phi = PI * f,
      s = share ? share[0] / share[1] : shareOf(f),
      rest = share ? (share[1] - share[0]) / share[1] : shareOf(1 - f);
    const thc = Math.atan(tau),
      beta = 2 * thc;
    const { x0, xHalf } = beatFrame(n, beta);
    const probe = add(scale(x0, cs(phi)), scale(xHalf, sn(phi)));
    const land = tri(xHalf, x0, xHalf);
    // the refraction of the first beat: ω₁ = (π/2) j, ω_ctx = θ_ctx k, Ω₂ = {ω₁, ω_ctx, ω₁}
    const om1 = [0, PI / 2, 0],
      omc = [0, 0, thc],
      bracket = cross(om1, omc),
      omega2 = cross(bracket, om1),
      phiRef = norm(omega2);
    const free = tri(QJ, ONE, QJ),
      ref = qmul(qmul(free, qinv(QJ)), qmul(QJ, qexp(omega2)));
    const k1 = kappa(x0, probe);
    return {
      t,
      n,
      f,
      s,
      share,
      // 1 − s and s − 1/2, accurate where s is close to 1 and to 1/2
      rest,
      half: share ? (2 * share[0] - share[1]) / (2 * share[1]) : sn(PI * (f - 0.5)) / 2,
      alpha,
      sigma,
      tau,
      thc,
      thcDeg: thc / deg,
      beta,
      betaDeg: beta / deg,
      x0,
      xHalf,
      probe,
      land,
      kappa: k1,
      chord2: dot(sub(probe, x0), sub(probe, x0)),
      kHalf: kappa(x0, xHalf),
      kHalfNext: kappa(x0, land),
      doubled: (2 * k1 - 1) ** 2,
      doubledHalf: (2 * kappa(x0, xHalf) - 1) ** 2,
      doubledHeap: kappa(x0, tri(probe, x0, probe)),
      reAnchor: 1 - kappa(land, land),
      step: stepOf(alpha, sigma),
      steps: { ito: stepOf(0, sigma), mid: stepOf(0.5, sigma), back: stepOf(1, sigma) },
      stepAngle: (2 * Math.atan(sigma / 2)) / deg,
      refr: { om1, omc, bracket, omega2, phi: phiRef, deg: phiRef / deg, free, ref, kRef: kappa(ONE, ref), kFreeRef: kappa(free, ref), norm2: dot(ref, ref) },
      lune: { total: beta, part: beta * s },
      momentum: P_SCALE * (1 - 2 * s),
      xi: { at0: xiTheta(0), at1: xiTheta(1), at: xiTheta(s), mirror: xiTheta(1 - s) }
    };
  }

  /* ---------- the printed relations of a frame ---------- */
  const shareQ = (m) => (m.share ? frac(BigInt(m.share[0]), BigInt(m.share[1])) : null);
  /** A quantity that is a polynomial of s with rational coefficients: its fraction where s is one, else null (irrational). */
  const ofShare = (m, f) => (m.share ? f(shareQ(m)) : null);
  const ONE_Q = whole(1),
    HALF_Q = [1n, 2n];
  const alphaRel = (a, d = 4) => rel(grid(a, 200), a, d);
  const spanRel = (x, d = 2) => rel(grid(x, 20), x, d);
  // (where the share is a fraction the double beside it is read off the points: κ = (1 + ⟨x₀, x⟩)/2)
  const sRel = (m, d = 4) => rel(shareQ(m), m.share ? 1 - m.kappa : m.s, d, { 0.5: m.half, 1: -m.rest });
  const kRel = (m, d = 4) => rel(ofShare(m, (s) => minus(ONE_Q, s)), m.share ? m.kappa : m.rest, d, { 0.5: -m.half, 1: -m.s });
  /** (1 − 2s)² = (2κ − 1)², which is 4(s − 1/2)² and 1 − 4s(1 − s). */
  const squareRel = (m) =>
    rel(
      ofShare(m, (s) => times(minus(ONE_Q, plus(s, s)), minus(ONE_Q, plus(s, s)))),
      m.share ? m.doubled : 4 * m.half ** 2,
      4,
      { 1: -4 * m.s * m.rest }
    );
  const otherRel = (m) =>
    rel(
      ofShare(m, (s) => times(whole(4), times(s, minus(ONE_Q, s)))),
      4 * m.s * m.rest,
      4,
      { 1: -4 * m.half ** 2 }
    );
  const momentumQ = (m) => ofShare(m, (s) => times(P_SCALE_Q, minus(ONE_Q, plus(s, s))));
  const momentumRel = (m) => rel(momentumQ(m), m.momentum);
  const energyRel = (m) => rel(ofShare(m, () => times(HALF_Q, times(momentumQ(m), momentumQ(m)))), m.momentum ** 2 / 2);
  /** The step at the sampling a and the span σ as fractions: ‖x₁‖² = (1 + (1 − a)²σ²)/(1 + a²σ²), drift (1 − 2a)σ²/(1 + a²σ²). */
  function stepQ(a, sigma) {
    const q = grid(a, 200),
      g = grid(sigma, 20),
      g2 = times(g, g),
      b = minus(ONE_Q, q),
      den = plus(ONE_Q, times(times(q, q), g2));
    return { norm2: quo(plus(ONE_Q, times(times(b, b), g2)), den), drift: quo(times(minus(b, q), g2), den) };
  }
  const normRel = (st, sigma) => rel(stepQ(st.alpha, sigma).norm2, st.norm2);
  const driftRel = (st, sigma, d = 4) => rel(stepQ(st.alpha, sigma).drift, st.drift, d);
  /** The angles of a frame in degrees are fractions only at the ends: arctan of a rational is a rational angle at 0 and 1 alone. */
  const thetaRel = (m) => degRel(m.tau === 0 ? whole(0) : m.tau === 1 ? whole(45) : null, m.thcDeg);
  const turnRel = (m) => degRel(m.tau === 0 ? whole(0) : m.tau === 1 ? whole(90) : null, m.betaDeg);
  const spanAngleRel = (m) => degRel(m.sigma === 0 ? whole(0) : m.sigma === 2 ? whole(90) : null, m.stepAngle);
  const refrRel = (m) => degRel(m.tau === 0 ? whole(0) : null, m.refr.deg);
  const kRefRel = (m) => rel(m.tau === 0 ? whole(0) : null, m.refr.kRef);
  const lunePartRel = (m) => rel(m.tau === 0 || m.f === 0 ? whole(0) : null, m.lune.part);
  const luneRel = (m) => rel(m.tau === 0 ? whole(0) : null, m.lune.total);
  /** ξ is 1/2 at s = 0 and s = 1; elsewhere its digits round it. */
  const xiRel = (m) => rel(m.f === 0 || m.f === 1 ? HALF_Q : null, m.xi.at);
  /** A face phase: 0 where the triangle degenerates (V₁ = V₀) and where V₁, V₂, V₃ lie on one great circle (s = 1/2). */
  const faceRel = (m, T, key) => degRel((m.f === 0 && (key === 'F012' || key === 'F013')) || (m.f === 0.5 && key === 'F123') ? whole(0) : null, T[key]);
  /** δF is identically 0 on the beat. */
  const dFRel = (T) => idRel(0, T.alternating);
  /** |(s − 1)/s| on the real segment is (1 − s)/s. */
  const cayleyRel = (m) => rel(ofShare(m, (s) => quo(minus(ONE_Q, s), s)), m.rest / m.s, 4, { 1: -2 * (m.half / m.s) });

  /* ---------- 2 × 2 complex matrices: entries [re, im] ---------- */
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
  const cinv = (z) => [z[0], -z[1]];
  const mmul = (A, B) => [0, 1].map((i) => [0, 1].map((j) => cadd(cm(A[i][0], B[0][j]), cm(A[i][1], B[1][j]))));
  const madd = (A, B) => A.map((r, i) => r.map((z, j) => cadd(z, B[i][j])));
  const msc = (A, k) => A.map((r) => r.map((z) => [z[0] * k, z[1] * k]));
  const dag = (A) => [0, 1].map((i) => [0, 1].map((j) => [A[j][i][0], -A[j][i][1]]));
  const mgap = (A, B) => Math.max(...A.flatMap((r, i) => r.map((z, j) => hypot(z[0] - B[i][j][0], z[1] - B[i][j][1]))));
  const mtrace = (A) => cadd(A[0][0], A[1][1]);
  const outer = (u, v) => [0, 1].map((i) => [0, 1].map((j) => cm(u[i], cinv(v[j]))));
  const ID2 = [
    [
      [1, 0],
      [0, 0]
    ],
    [
      [0, 0],
      [1, 0]
    ]
  ];
  const E0 = outer(
      [
        [1, 0],
        [0, 0]
      ],
      [
        [1, 0],
        [0, 0]
      ]
    ),
    E1 = outer(
      [
        [0, 0],
        [1, 0]
      ],
      [
        [0, 0],
        [1, 0]
      ]
    );
  /** The unit quaternion w + xi + yj + zk as w·1 − i(xσx + yσy + zσz). */
  const su2 = (q) => [
    [
      [q[0], -q[3]],
      [-q[2], -q[1]]
    ],
    [
      [q[2], -q[1]],
      [q[0], q[3]]
    ]
  ];
  /** The spinor of the Lean text: a + bi + cj + dk ↦ (a + bI, −c + dI). */
  const spinor = (q) => [
    [q[0], q[1]],
    [-q[2], q[3]]
  ];
  const braket = (u, v) => u.reduce((s, z, k) => cadd(s, cm(cinv(z), v[k])), [0, 0]);
  const pinch = (rho) => madd(mmul(mmul(E0, rho), E0), mmul(mmul(E1, rho), E1));
  /** Dimensions of the observable Krylov subspaces span{(T†)^k x₀ : k ≤ m} of ℝ⁴, m = 0 … 4. */
  function krylovDims(Tadj) {
    const basis = [],
      dims = [];
    let v = ONE;
    for (let m = 0; m <= 4; m++) {
      let w = v.slice();
      for (const b of basis) w = sub(w, scale(b, dot(w, b)));
      if (norm(w) > 1e-9) basis.push(unit(w));
      dims.push(basis.length);
      v = Tadj(v);
    }
    return dims;
  }

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  /** A point 1/2 + LINE_AT·i of the line Re s = 1/2; the accumulated versines at σ = T = 1 and N = ROUGH_N for three exponents. */
  const LINE_AT = 14.1347,
    ROUGH_N = 1e6,
    ROUGH = [1, 0.5, 0.25];
  const accumulated = (N, a) => 2 * N * sn(N ** -a / 2) ** 2;
  function instances(m) {
    const { x0, xHalf, probe } = m;
    // normSq_and_chebyshev on x₀, probe, …: c = ⟨x₀, probe⟩
    const c = dot(x0, probe),
      seq = [x0, probe];
    while (seq.length < 7) seq.push(tri(seq[seq.length - 1], seq[seq.length - 2], seq[seq.length - 1]));
    const U = [0, 1],
      Tn = [1, c];
    for (let k = 2; k < 8; k++) {
      U.push(2 * c * U[k - 1] - U[k - 2]);
      Tn.push(2 * c * Tn[k - 1] - Tn[k - 2]);
    }
    let chebGap = 0;
    for (let k = 1; k < 7; k++) chebGap = Math.max(chebGap, norm(sub(seq[k], sub(scale(probe, U[k]), scale(x0, U[k - 1])))), Math.abs(dot(x0, seq[k]) - Tn[k]), Math.abs(dot(seq[k], seq[k]) - 1));
    // finite_record_pinching_idempotent, rank_one_born_pairing_weight
    const psi = spinor(qmul(qinv(x0), probe)),
      rho = outer(psi, psi),
      once = pinch(rho);
    const weights = [E0, E1].map((Q, k) => ({ byTrace: mtrace(mmul(rho, Q))[0], byModulus: psi[k][0] ** 2 + psi[k][1] ** 2 }));
    const mixture = [E0, E1].reduce((acc, Q) => madd(acc, mmul(mmul(Q, rho), Q)), msc(ID2, 0));
    // rayKernel_eq_bornProbability_spinor on x₀ and the probe
    const k1 = kappa(x0, probe),
      k2 = kappa(x0, qmul(probe, QI));
    const ray = (2 * k1 - 1) ** 2 + (2 * k2 - 1) ** 2,
      amp = braket(spinor(x0), spinor(probe));
    const phaseGap = Math.max(...spinor(qmul(probe, QI)).map((z, k) => { const w = cm([0, 1], spinor(probe)[k]); return hypot(z[0] - w[0], z[1] - w[1]); }));
    // crossProduct_is_skewAdjoint_of_balanced_sum: A = 1/√2, B = j/√2
    const A = msc(ID2, 1 / SQ2),
      B = msc(su2(QJ), 1 / SQ2),
      S = madd(A, B),
      AB = mmul(A, dag(B));
    // circle_double_cover_history_lift: x(t) = cos πt + j sin πt squares to one full turn
    let liftGap = 0;
    for (let k = 0; k <= 32; k++) {
      const u = k / 32,
        x = [cs(PI * u), 0, sn(PI * u), 0];
      liftGap = Math.max(liftGap, norm(sub(qmul(x, x), [cs(TAU * u), 0, sn(TAU * u), 0])));
    }
    // accumulated_sagitta_phases: N(1 − cos(N^{−a})) = 2N sin²(N^{−a}/2) at N = 10⁶
    const sagitta = ROUGH.map((a) => accumulated(ROUGH_N, a));
    // cayley_ratio_norm_one_iff_critical_line
    const cayley = { real: m.s > 0 ? m.rest / m.s : 0, atZero: m.s === 0, line: hypot(0.5 - 1, LINE_AT) / hypot(0.5, LINE_AT) };
    // selected_tree_transport on the open chain x₀ — x_{1/2} — x₁, root x_{1/2}, edge phases e^{iπ/2}
    const u = [cs(PI / 2), sn(PI / 2)],
      root = { half: [1, 0], one: u, zero: cinv(u) };
    const gauged = [cm(cm(cinv(root.half), u), root.zero), cm(cm(cinv(root.one), u), root.half)];
    return {
      model: { tri: 'x y⁻¹ z', kappa: '(1 + ⟨x, y⟩)/2', frozen: norm(sub(tri(x0, x0, x0), x0)) },
      chord: Math.abs(m.kappa - (1 - m.chord2 / 4)),
      chebyshev: { c, gap: chebGap, t2: Tn[2], k2: (1 + Tn[2]) / 2 },
      pinch: { gap: mgap(pinch(once), once), moved: mgap(once, rho) },
      krylov: { frozen: krylovDims((v) => v), half: krylovDims((v) => qmul([0, 0, -1, 0], v)) },
      balanced: { unitary: mgap(mmul(S, dag(S)), ID2), halfA: mgap(mmul(A, dag(A)), msc(ID2, 0.5)), halfB: mgap(mmul(B, dag(B)), msc(ID2, 0.5)), skew: mgap(madd(dag(AB), AB), msc(ID2, 0)) },
      ray: { value: ray, modulus: amp[0] ** 2 + amp[1] ** 2, gap: Math.abs(ray - (amp[0] ** 2 + amp[1] ** 2)), phaseGap },
      lift: { samples: 33, gap: liftGap, start: 1, end: cs(PI) },
      weights: { w0: weights[0].byTrace, w1: weights[1].byTrace, gap: Math.max(...weights.map((w) => Math.abs(w.byTrace - w.byModulus))), sum: weights[0].byTrace + weights[1].byTrace, unread: mgap(mixture, once) },
      sagitta,
      cayley,
      xi: { half: xiTheta(0.5), product: xiProduct(0.5), gap: Math.max(...[0.2, 0.5, 0.8].map((x) => Math.abs(xiTheta(x) - xiProduct(x)))), mirror: Math.abs(m.xi.at - m.xi.mirror), at0: m.xi.at0, at1: m.xi.at1 },
      tree: { edges: 2, vertices: 3, loops: 2 + 1 - 3, gap: Math.max(...gauged.map((z) => hypot(z[0] - 1, z[1]))) },
      tetra: tetraOf(m.f),
      norm: Math.max(...seq.map((x) => Math.abs(dot(x, x) - 1))),
      heap: { gap: norm(sub(m.land, scale(x0, -1))), reAnchor: norm(sub(tri(m.land, m.land, m.land), m.land)), twice: norm(sub(scale(m.land, -1), x0)), half: norm(sub(qmul(qinv(x0), xHalf), [0, ...vec(qmul(qinv(x0), xHalf))])) }
    };
  }

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const SCENES = {
    past: { arc: 1, plane: 0.3, freeze: 1, step: 0, lune: 0, cell: 0, refr: 0, tetra: 0, chain: 0 },
    present: { arc: 0.3, plane: 1, freeze: 0, step: 1, lune: 0, cell: 0, refr: 0, tetra: 0, chain: 0 },
    future: { arc: 1, plane: 0.35, freeze: 0, step: 0, lune: 1, cell: 1, refr: 1, tetra: 0, chain: 0 },
    third: { arc: 0.5, plane: 0.35, freeze: 0, step: 0, lune: 0, cell: 0, refr: 0, tetra: 1, chain: 0 },
    loop: { arc: 0, plane: 0.5, freeze: 0, step: 0, lune: 0, cell: 0, refr: 0, tetra: 0, chain: 1 }
  };
  const state = { scene: 'present', t: 0.5, mark: null, alpha: 0.5, sigma: 1, tau: 0.5, cam: 'face', lens: 0, from: null, blend: 1 };
  /** What the rail drives: the sampling α on the Present card, the place in the beat elsewhere. */
  const railVar = () => (state.scene === 'present' ? 'alpha' : 't');
  function layers() {
    const to = SCENES[state.scene];
    if (!state.from || state.blend >= 1) return { ...to };
    const out = {};
    for (const k of Object.keys(to)) out[k] = lerp(state.from[k], to[k], state.blend);
    return out;
  }
  const cams = { panorama: [-0.8, 0.26, 1], face: [-0.2, 0.15, 1], under: [-0.98, -0.2, 1] };
  const CAP_SHARE = [4, 5],
    T_CAP = placeOf(CAP_SHARE[0] / CAP_SHARE[1]);
  // the rail of a card: its length, its speed (units per second), its keyboard step and whether playback runs round
  const RAILS = {
    past: { max: 1, rate: 1 / 3, step: 0.05, loop: false },
    present: { max: 1, rate: 1 / 6, step: 0.05, loop: false },
    future: { max: 1, rate: 1 / 3, step: 0.05, loop: false },
    third: { max: 1, rate: 1 / 3, step: 0.05, loop: false },
    loop: { max: BEATS, rate: 0.7, step: 0.25, loop: true }
  };
  const presets = {
    'past-zero-jet-halting-anchor': { scene: 'past', cam: 'panorama', t: 0, play: false, still: 0 },
    'present-half-midpoint-self-duality': { scene: 'present', cam: 'face', t: 0.5, play: true, still: 0.5 },
    'future-one-curvature-closure': { scene: 'future', cam: 'under', t: 1, play: true, still: 1 },
    'third-order-bianchi-ostrogradsky-cap': { scene: 'third', cam: 'panorama', t: T_CAP, share: CAP_SHARE, play: true, still: T_CAP },
    'one-to-zero-cosmic-heartbeat-loop': { scene: 'loop', cam: 'panorama', t: 3.5, play: true, still: 3.5 }
  };
  const DEFAULT = 'present-half-midpoint-self-duality';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.face[0], pitch: cams.face[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  /** Fit the ball, and on the Present card the far ends of the step, between the title and the legend. */
  function fit(m, w) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    // on a compact Present card the label of the far end of the step stands above it
    const top = (shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 8) : 12) + (W < 480 ? 24 * w.step : 0);
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const { R, U } = basis(sc.cam.yaw, sc.cam.pitch),
      r = 1.07;
    let x0 = -r,
      x1 = r,
      y0 = -r,
      y1 = r;
    if (w.step > 0.01)
      for (const q of [m.steps.ito.x1, m.steps.back.x1, m.steps.mid.x1]) {
        const p = scale(world(q), w.step);
        x0 = Math.min(x0, dot(p, R) - 0.06);
        x1 = Math.max(x1, dot(p, R) + 0.06);
        y0 = Math.min(y0, dot(p, U) - 0.06);
        y1 = Math.max(y1, dot(p, U) + 0.06);
      }
    const side = 16,
      room = Math.max(40, H - top - bottom);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** How strongly a point of the ball is drawn: full towards the viewer, dim on the far side. */
  const facing = (p, D) => 0.36 + 0.64 * clamp((dot(p, D) + 0.2) / 0.4, 0, 1);
  const TILT = unit([0.5, -0.32, 0.8]);
  /** The far hemisphere of the ball about the view direction: the inner wall the glass shows. It is shaded by a tilted
      linear coordinate n·p, so the shading moves when the camera turns. */
  function backWall(D) {
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1),
      R = 1.035;
    const at = (u, v) => {
      const th = (PI / 2) * u,
        ph = TAU * v;
      return scale(add(scale(D, -cs(th)), add(scale(e1, sn(th) * cs(ph)), scale(e2, sn(th) * sn(ph)))), R);
    };
    // the ramp runs from the stage colour to violet; only its darker part is used, so the marks inside stay legible
    sc.surface('wall', at, { u: [0, 1], v: [0, 1], nu: 18, nv: 64, colors: [P.stage, P.violet], range: [-1.25, 2.75], value: (u, v) => dot(TILT, at(u, v)) / R, grid: { every: [3, 8], alpha: 0.16 } });
  }
  const tube = (key, pts, color, r, extra = {}) => sc.tube(key, pts, { color, r, glow: 0.3, occlude: false, pick: false, ...extra });
  /** An arc of beat n between two places: a solid cyan tube, dim on the far side. */
  function solidArc(key, n, f0, f1, m, D, alpha, r = 0.016) {
    if (f1 - f0 < 1e-6 || alpha < 0.01) return;
    const at = (u) => world(beatQuat(n, lerp(f0, f1, u), m.beta));
    tube(key, sample(Math.max(4, Math.ceil(56 * (f1 - f0))), at), P.cyan, r, { alpha: (u) => alpha * facing(at(u), D) });
  }
  function ghostArc(n, f0, f1, m, D, alpha) {
    if (f1 - f0 < 1e-6 || alpha < 0.01) return;
    const at = (u) => world(beatQuat(n, lerp(f0, f1, u), m.beta));
    // cut where the arc passes behind the ball, so each run carries one strength
    const N = Math.max(4, Math.ceil(40 * (f1 - f0)));
    let run = [at(0)],
      front = dot(at(0.5 / N), D) >= 0;
    for (let k = 1; k <= N; k++) {
      const p = at(k / N),
        here = dot(at((k - 0.5) / N), D) >= 0;
      if (here !== front) {
        sc.line(run, { color: P.cyan, width: 1.4, dash: [6, 5], alpha: alpha * (front ? 1 : 0.5) });
        run = [run[run.length - 1]];
        front = here;
      }
      run.push(p);
    }
    sc.line(run, { color: P.cyan, width: 1.4, dash: [6, 5], alpha: alpha * (front ? 1 : 0.5) });
  }
  function drawBall(m, w, D) {
    backWall(D);
    sc.glass('ballGlass', [0, 0, 0], 1, { color: P.violet, alpha: 0.045, rim: 0.3 });
    sc.circle([0, 0, 0], D, 1.035, { fade: false, color: P.violet, width: 1.4, alpha: 0.55 });
    sc.line([[0, 0, 1], [0, 0, -1]], { color: P.violet, width: 1, dash: [4, 5], alpha: 0.4 });
    // the plane κ = 1/2 (⟨x₀, x⟩ = 0): the self-dual slice of the beat
    if (w.plane > 0.01) {
      const ring = sample(72, (u) => [cs(TAU * u), sn(TAU * u), 0]);
      sc.fan(ring, { fill: P.cyan, alpha: 0.13 * w.plane });
      sc.circle([0, 0, 0], [0, 0, 1], 1, { color: P.cyan, width: 1.4, alpha: 0.75 * w.plane + 0.15, back: 0.45 });
    }
  }
  function drawBeat(m, w, D) {
    if (w.arc < 0.01) return;
    // on the cap card the run part of the beat is the magenta edge V₀V₁ of the tetrahedron
    const travelled = state.scene === 'present' ? 0 : m.f;
    if (state.scene !== 'third') solidArc('beat', 0, 0, travelled, m, D, w.arc, 0.018);
    ghostArc(0, travelled, 1, m, D, 0.3 + 0.55 * w.arc);
    for (const [f, key] of [
      [0, 'zero'],
      [0.5, 'half'],
      [1, 'one']
    ])
      sc.bead(world(beatQuat(0, f, m.beta)), { color: P.cyan, r: f === 0 ? 5.4 : 4.6, alpha: f <= travelled + EPS || f === 0 ? 1 : 0.55, key });
    if (w.freeze > 0.01) {
      // the frozen record: two small circles of the sphere round the anchor
      for (const [c, k] of [
        [0.13, 1],
        [0.21, 0.6]
      ])
        sc.circle([0, 0, 1.002 * cs(c)], [0, 0, 1], 1.002 * sn(c), { fade: false, n: 48, color: P.cyan, width: 2, alpha: k * w.freeze });
    }
  }
  function drawStep(m, w) {
    const a = w.step;
    if (a < 0.01) return;
    const O = [0, 0, 0],
      A = [0, 0, 1],
      ito = world(m.steps.ito.x1),
      mid = world(m.steps.mid.x1),
      back = world(m.steps.back.x1);
    if (m.sigma > 0) {
      // the three samplings of one step, and the curve of all of them
      sc.line(sample(72, (u) => world(stepAt(u, m.sigma))), { color: P.magenta, width: 1.3, alpha: 0.6 * a });
      sc.arrow(A, ito, { color: P.magenta, width: 2.6, headSize: 11, alpha: a });
      sc.arrow(A, back, { color: P.magenta, width: 2, headSize: 9, dash: [5, 4], alpha: 0.9 * a });
      // the part of the radius by which the left-endpoint step leaves the sphere
      sc.line([unit(ito), ito], { color: P.magenta, width: 1.2, dash: [3, 3], alpha: 0.9 * a });
      tube('cayley', sample(40, (u) => [sn(u * m.stepAngle * deg), 0, cs(u * m.stepAngle * deg)]), P.cyan, 0.02, { alpha: a });
      // the chord of the midpoint step is perpendicular to its midpoint
      const c = scale(add(A, mid), 0.5),
        e = unit(sub(mid, A)),
        h = scale(unit(c), -1),
        q = Math.min(0.07, 0.4 * norm(c));
      sc.line([A, mid], { color: P.cyan, width: 1.3, dash: [4, 3], alpha: 0.9 * a });
      sc.line([O, c], { color: P.cyan, width: 1.1, dash: [2, 4], alpha: 0.7 * a });
      sc.line([add(c, scale(e, q)), add(add(c, scale(e, q)), scale(h, q)), add(c, scale(h, q))], { color: P.cyan, width: 1.3, alpha: a });
      sc.bead(ito, { color: P.magenta, r: 4.6, alpha: a, key: 'ito' });
      sc.bead(back, { color: P.magenta, r: 4.6, alpha: a, key: 'backward' });
      sc.bead(mid, { color: P.cyan, r: 5.6, alpha: a, key: 'midpoint' });
    }
    // the probe x(s) of the beat is a passive mark here: the rail and the handle drive the sampling α
    sc.bead(world(m.probe), { color: P.cyan, r: 5, alpha: a, key: 'beatMark' });
  }
  function drawFuture(m, w, D) {
    const a = w.lune,
      th = PI * m.f,
      az = -m.thc;
    if (a > 0.01 && m.tau > 0) {
      // the second heading: another first jet with the same landing
      const other = (u) => [sn(PI * u) * cs(az), sn(PI * u) * sn(az), cs(PI * u)];
      sc.line(sample(48, other), { color: P.cyan, width: 1.3, dash: [5, 5], alpha: 0.7 * a });
      if (m.f > 1e-6) {
        const at = (u, v) => scale([sn(th * u) * cs(az * v), sn(th * u) * sn(az * v), cs(th * u)], 1.004);
        sc.surface('lune', at, { u: [0, 1], v: [0, 1], nu: 32, nv: 12, color: P.magenta, alpha: 0.62 * a, grid: { every: [4, 4], alpha: 0.22 }, pick: false });
        // the two half-disc faces of the 3-cell between the headings, as far as the probe has come
        if (w.cell > 0.01)
          for (const v of [0, 1]) {
            const face = [[0, 0, 0], ...sample(28, (u) => [sn(th * u) * cs(az * v) * 0.995, sn(th * u) * sn(az * v) * 0.995, cs(th * u) * 0.995])];
            sc.fan(face, { fill: P.violet, alpha: 0.26 * w.cell });
            sc.line(face, { color: P.violet, width: 1.2, alpha: 0.8 * w.cell, close: true });
          }
      }
    }
    const r = w.refr;
    if (r > 0.01 && m.tau > 0) {
      const closed = m.f === 1,
        arc = sample(40, (u) => world(qmul(m.refr.free, qexp(scale(m.refr.omega2, u)))));
      if (closed) tube('refr', arc, P.magenta, 0.02, { alpha: r });
      else sc.line(arc, { color: P.magenta, width: 1.3, dash: [4, 4], alpha: 0.55 * r });
      sc.bead(world(m.refr.ref), { color: P.magenta, r: closed ? 6 : 4.2, alpha: closed ? r : 0.6 * r, key: 'refracted' });
    }
  }
  function drawCap(m, w, T) {
    const a = w.tetra;
    if (a < 0.01) return;
    const V = T.V;
    sc.poly('tetra', { vertices: V.map((v) => scale(v, 0.995)), faces: [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]] }, { color: P.violet, alpha: a >= 0.99 ? 1 : 0.6 * a, edges: P.magenta, pick: false, occlude: false });
    for (const [i, j] of [
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
      [2, 3]
    ]) {
      const om = Math.acos(clamp(dot(V[i], V[j]), -1, 1));
      if (om < 1e-6) continue;
      tube('edge' + i + j, sample(28, (u) => scale(add(scale(V[i], sn((1 - u) * om)), scale(V[j], sn(u * om))), 1 / sn(om))), P.magenta, 0.011, { alpha: a });
    }
    if (m.f > 1e-6) tube('edge01', sample(40, (u) => [sn(PI * m.f * u), 0, cs(PI * m.f * u)]), P.magenta, 0.011, { alpha: a });
    for (const k of [0, 2, 3]) sc.bead(V[k], { color: P.magenta, r: 4.2, alpha: a, key: 'v' + k });
  }
  function drawChain(m, w, D) {
    const a = w.chain;
    if (a < 0.01) return;
    for (let n = 0; n < BEATS; n++) {
      if (n < m.n) solidArc('beat' + n, n, 0, 1, m, D, 0.55 * a, 0.012);
      else if (n === m.n) {
        solidArc('beat' + n, n, 0, m.f, m, D, a, 0.02);
        ghostArc(n, m.f, 1, m, D, 0.9 * a);
      } else ghostArc(n, 0, 1, m, D, 0.32 * a);
      sc.bead(world(beatFrame(n, m.beta).xHalf), { color: P.cyan, r: n === m.n ? 5 : 3.4, alpha: (n <= m.n ? 1 : 0.4) * a, key: 'mid' + n });
    }
    // the closed 3-cells at the landings: a landed 1 is the next 0
    const landed = m.f === 1;
    for (const [z, on] of [
      [-1, m.n >= 1 || landed],
      [1, m.n >= 2 || (m.n === 1 && landed)]
    ]) {
      const c = [0, 0, z],
        h = 0.1;
      if (on) sc.poly('cell' + z, { vertices: [[h, 0, 0], [0, h, 0], [-h, 0, 0], [0, -h, 0], [0, 0, h], [0, 0, -h]].map((p) => add(c, p)), faces: [[0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 5], [2, 1, 5], [3, 2, 5], [0, 3, 5]] }, { color: P.violet, alpha: a >= 0.99 ? 1 : 0.6 * a, edges: P.violet, pick: false, occlude: false });
    }
    sc.bead(world(m.x0), { color: P.cyan, r: 5, alpha: a, key: 'anchor' });
    sc.bead(world(m.land), { color: P.cyan, r: 5, alpha: landed ? a : 0.6 * a, key: 'landing' });
  }

  /* ---------- words ---------- */
  const STAR = '<span class="star">★</span>';
  const SCENE_NAME = {
    past: [['过去 ≡ J⁰ ≡ 0', 'PAST ≡ J⁰ ≡ 0'], ['KV 记忆槽 · Δ⁰ = I（MODEL）', 'KV SLOT · Δ⁰ = I (MODEL)']],
    present: [['现在 ≡ J¹ ≡ 1/2', 'PRESENT ≡ J¹ ≡ 1/2'], ['狄拉克 · Re s = 1/2（MODEL）', 'DIRAC · Re s = 1/2 (MODEL)']],
    future: [['未来 ≡ J² ≡ 1', 'FUTURE ≡ J² ≡ 1'], ['曲率 Δ¹ · 残差写回（MODEL）', 'CURVATURE Δ¹ · WRITE-BACK (MODEL)']],
    third: [['没有第四列（MODEL）', 'NO FOURTH COLUMN (MODEL)'], ['d∘d = 0 · 二阶封口（MODEL）', 'd∘d = 0 · SECOND-ORDER CAP (MODEL)']],
    loop: [['1 ↦ 0 心跳（MODEL）', '1 ↦ 0 HEARTBEAT (MODEL)'], [`霍奇 ${STAR} : Λ³ → Λ⁰（MODEL）`, `HODGE ${STAR} : Λ³ → Λ⁰ (MODEL)`]]
  };
  const LENS_NAME = [
    ['因果射流', 'CAUSAL JET'],
    ['跨界对位 (MODEL)', 'CROSS-DOMAIN (MODEL)']
  ];
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    // the stations 0, 1/2 and 1 of the beat, themselves: a place beside them is not one of them
    const at = (x) => m.f === x;
    switch (state.scene) {
      case 'past':
        return at(0) ? 'anchor' : 'left';
      case 'present':
        return m.sigma === 0 ? 'zero' : m.alpha === 0.5 ? 'on' : m.alpha < 0.5 ? 'out' : 'in';
      case 'future':
        return (m.tau === 0 ? 'flat-' : '') + (at(0) ? 'start' : at(1) ? 'closed' : at(0.5) ? 'half' : m.s < 0.5 ? 'first' : 'second');
      case 'third':
        return at(0) ? 'collapsed' : at(1) ? 'antipodal' : 'generic';
      default:
        return m.t === 0 ? 'start' : at(1) ? 'landed' : at(0.5) ? 'half' : 'running';
    }
  }
  const X_HALF = 'x<sub>1/2</sub>';
  /** α on its side of 1/2 and ‖x₁‖² on its side of 1, each followed by its value. */
  const sideLaw = (m, sign) => `${valued(`α ${sign} 1/2`, alphaRel(m.alpha))}${L('：', ': ')}${valued(`‖x₁‖² ${sign === '&lt;' ? '&gt;' : '&lt;'} 1`, normRel(m.step, m.sigma))}`;
  function subline(m, T) {
    const s4 = sRel(m),
      k4 = kRel(m),
      r = regimeOf(m),
      dF = dFRel(T);
    if (state.lens === 1) {
      const row = {
        past: ['J⁰ · Λ⁰ · Δ⁰ = I · s = 0 · KV 槽', 'J⁰ · Λ⁰ · Δ⁰ = I · s = 0 · KV slot'],
        present: ['J¹ · 自旋 1/2 · 狄拉克 · Re s = 1/2 · 查询与键的中点', 'J¹ · spin 1/2 · Dirac · Re s = 1/2 · midpoint of query and key'],
        future: ['J² · Λ² · Δ¹ · s = 1 · 残差写回', 'J² · Λ² · Δ¹ · s = 1 · residual write-back'],
        third: ['d∘d = 0 · 单形上 δF = 0 · 停在二阶', 'd∘d = 0 · δF = 0 on the simplex · stop at second order'],
        loop: [`${STAR} : Λ³ → Λ⁰ · 1 ↦ 0 · 重新停住 · s′ = 0 · 写入 KV 槽`, `${STAR} : Λ³ → Λ⁰ · 1 ↦ 0 · halted again · s′ = 0 · write to the KV slot`]
      }[state.scene];
      const now =
        state.scene === 'present'
          ? `α ${alphaRel(m.alpha)}${L('，', ', ')}‖x₁‖² ${normRel(m.step, m.sigma)}`
          : state.scene === 'third'
            ? `s ${s4}${L('，', ', ')}δF ${dF}`
            : `${state.scene === 'loop' ? `B<sub>${m.n}</sub> ` : ''}s ${s4}${L('，', ', ')}1 − s ${k4}`;
      return L(`五种读法（MODEL）：${row[0]}；此刻 ${now}。`, `Five readings (MODEL): ${row[1]}; now ${now}.`);
    }
    if (state.scene === 'past')
      return r === 'anchor'
        ? L(`停在 x₀：s = 0，κ(x₀, x₀) ${k4}，[x₀, x₀, x₀] = x₀；单独一个 0-射流点没有速度。`, `Parked at x₀: s = 0, κ(x₀, x₀) ${k4}, [x₀, x₀, x₀] = x₀; a 0-jet point alone has no velocity.`)
        : L(`探针已离开 x₀：s ${s4}，κ ${k4}；x₀ 仍在原处，[x₀, x₀, x₀] = x₀。`, `The probe has left x₀: s ${s4}, κ ${k4}; x₀ stays put, [x₀, x₀, x₀] = x₀.`);
    if (state.scene === 'present') {
      const n2 = normRel(m.step, m.sigma),
        tg = driftRel(m.step, m.sigma);
      if (r === 'zero') return L(`步幅 σ = 0：没有迈步，任何 α 都停在 x₀，‖x₁‖² ${n2}，漂移 ${tg}。`, `Span σ = 0: no step is taken, every α stays at x₀, ‖x₁‖² ${n2}, drift ${tg}.`);
      if (r === 'on') return L(`α = 1/2：‖x₁‖² ${n2}，弦与中点垂直，⟨x₁ − x₀, x₀ + x₁⟩ ${tg}：正落在球面上。`, `α = 1/2: ‖x₁‖² ${n2}, the chord is perpendicular to its midpoint, ⟨x₁ − x₀, x₀ + x₁⟩ ${tg}: exactly on the sphere.`);
      if (r === 'out') return L(`${sideLaw(m, '&lt;')}，这一步落在球面之外，⟨x₁ − x₀, x₀ + x₁⟩ ${tg}。`, `${sideLaw(m, '&lt;')}, this step ends outside the sphere, ⟨x₁ − x₀, x₀ + x₁⟩ ${tg}.`);
      return L(`${sideLaw(m, '&gt;')}，这一步沉到球面之内，⟨x₁ − x₀, x₀ + x₁⟩ ${tg}。`, `${sideLaw(m, '&gt;')}, this step sinks inside the sphere, ⟨x₁ − x₀, x₀ + x₁⟩ ${tg}.`);
    }
    if (state.scene === 'future') {
      const flat = m.tau === 0,
        part = lunePartRel(m),
        tot = luneRel(m);
      const area = flat ? L('τ = 0，没有月牙', 'τ = 0, no lune') : L(`月牙已铺 ${part}（全部 ${tot}）`, `the lune has spread ${part} (whole ${tot})`);
      const b = r.replace('flat-', ''),
        k2 = rel(whole(0), m.doubledHalf);
      if (b === 'start') return L(`s = 0：探针还在 x₀，两个半拍都没走；${area}。`, `s = 0: the probe is still at x₀, neither half-beat taken; ${area}.`);
      if (b === 'half') return L(`s = 1/2：走完第一个半拍，κ₁ = κ(x₀, ${X_HALF}) ${k4}；${area}${flat ? '' : '，正好一半'}。`, `s = 1/2: the first half-beat is done, κ₁ = κ(x₀, ${X_HALF}) ${k4}; ${area}${flat ? '' : ', exactly half'}.`);
      if (b === 'first') return L(`第一个半拍：s ${s4}，κ ${k4}；${area}。`, `First half-beat: s ${s4}, κ ${k4}; ${area}.`);
      if (b === 'second') return L(`第二个半拍：s ${s4}，κ ${k4}；${area}。`, `Second half-beat: s ${s4}, κ ${k4}; ${area}.`);
      return flat
        ? L(`s = 1：κ₂ = (2κ₁ − 1)² ${k2}；τ = 0，没有月牙也没有折射，落点就是 −x₀。`, `s = 1: κ₂ = (2κ₁ − 1)² ${k2}; τ = 0, no lune and no refraction, and the landing is −x₀.`)
        : L(`s = 1：自由落点 κ₂ = (2κ₁ − 1)² ${k2}；李三元组把它折开 ${refrRel(m)}，κ(x₀, x₁) ${kRefRel(m)}。`, `s = 1: the free landing has κ₂ = (2κ₁ − 1)² ${k2}; the Lie triple refracts it by ${refrRel(m)}, κ(x₀, x₁) ${kRefRel(m)}.`);
    }
    if (state.scene === 'third') {
      const [f123, f023, f013, f012] = ['F123', 'F023', 'F013', 'F012'].map((k) => faceRel(m, T, k));
      if (r === 'collapsed') return L(`s = 0：V₁ 与 V₀ 重合，四面体压平；F₀₁₂ = F₀₁₃ ${f012}，F₁₂₃ = F₀₂₃ ${f023}，δF ${dF}。`, `s = 0: V₁ meets V₀ and the tetrahedron is flat; F₀₁₂ = F₀₁₃ ${f012}, F₁₂₃ = F₀₂₃ ${f023}, δF ${dF}.`);
      // identically 0 on the beat; the residue of the four computed terms stands beside it
      const terms = [f123, f023, f013, f012].join(L('、', ', ')),
        residue = below(Math.abs(T.alternating)) + (T.alternating ? '°' : '');
      const sum = `F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ ${dF}${L(`（四项 ${terms}；浮点余量 ${residue}）`, ` (terms ${terms}; residue ${residue})`)}`;
      if (r === 'antipodal') return L(`s = 1：V₁ 到了 V₀ 的对跖点，含 V₀V₁ 的面取沿这一拍的极限；${sum}。`, `s = 1: V₁ is at the antipode of V₀, and the faces on V₀V₁ take the limit along the beat; ${sum}.`);
      return `${sum}${L('。', '.')}`;
    }
    const turn = m.tau === 0 ? L('航向不转', 'the heading does not turn') : L(`航向每拍转 ${turnRel(m)}`, `the heading turns by ${turnRel(m)} per beat`);
    if (r === 'start') return L(`B<sub>0</sub> 起拍：0 = x₀，s ${s4}；${turn}。`, `B<sub>0</sub> starts: 0 = x₀, s ${s4}; ${turn}.`);
    if (r === 'landed') return L(`B<sub>${m.n}</sub> 落拍：s ${s4}；在落点重新量，s′ = 1 − κ(x₁, x₁) ${idRel(0, m.reAnchor)}：1 就是下一拍的 0′。`, `B<sub>${m.n}</sub> lands: s ${s4}; measured afresh there, s′ = 1 − κ(x₁, x₁) ${idRel(0, m.reAnchor)}: the 1 is the next 0′.`);
    if (r === 'half') return L(`B<sub>${m.n}</sub> 正在 1/2 切面上：s = 1 − s ${s4}；${turn}。`, `B<sub>${m.n}</sub> is on the slice 1/2: s = 1 − s ${s4}; ${turn}.`);
    return L(`B<sub>${m.n}</sub>：s ${s4}，κ ${k4}；${turn}。`, `B<sub>${m.n}</sub>: s ${s4}, κ ${k4}; ${turn}.`);
  }
  function bigline(m, T) {
    const key = {
      past: `κ ${kRel(m)}`,
      present: `‖x₁‖² ${normRel(m.step, m.sigma)}`,
      future: `s ${sRel(m)}`,
      third: `δF ${dFRel(T)}`,
      loop: `B<sub>${m.n}</sub> · s ${sRel(m)}`
    }[state.scene];
    // the value stays on one line
    return `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${key}</span>`;
  }
  function legendItems(m) {
    const s = state.scene,
      items = [['vi', state.lens ? L('群 SU(2) 的切片', 'a slice of SU(2)') : L('三元数 𝕋₃', 'the ternion 𝕋₃')]];
    items.push(['am', s === 'present' ? L('取样点 x₁(α)', 'sampling point x₁(α)') : L('探针 x(s)', 'probe x(s)')]);
    if (s === 'past') items.push(['cy', L('锚点与等着的一拍', 'anchor and awaiting beat')]);
    else if (s === 'present' && m.sigma === 0) items.push(['cy', L('这一拍与 κ = 1/2', 'the beat and κ = 1/2')]);
    else if (s === 'present') items.push(['cy', L('中点步与 κ = 1/2', 'midpoint step and κ = 1/2')], ['mg', L('α = 0 与 α = 1', 'α = 0 and α = 1')]);
    else if (s === 'future' && m.tau === 0) items.push(['cy', L('两个半拍', 'two half-beats')]);
    else if (s === 'future') items.push(['cy', L('两个半拍', 'two half-beats')], ['mg', L('曲率月牙与折射', 'curvature lune and refraction')]);
    else if (s === 'third') items.push(['cy', L('这一拍', 'the beat')], ['mg', L('四个面的边', 'edges of the four faces')]);
    else items.push(['cy', L('走过与将走的拍', 'beats run and to come')]);
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const r = regimeOf(m),
      s = state.scene,
      s4 = sRel(m),
      k4 = kRel(m),
      n2 = normRel(m.step, m.sigma);
    if (s === 'past')
      return r === 'anchor'
        ? {
            long: [`琥珀探针停在过去的锚点 x₀：s = 0，κ ${k4}，[x₀, x₀, x₀] = x₀，青色圈是冻住的记录。虚线是还没走的两个半拍：单独一个 0-射流点没有速度，只管记住。`, `The amber probe rests at the past anchor x₀: s = 0, κ ${k4}, [x₀, x₀, x₀] = x₀, and the cyan circles are the frozen record. The dashes are the two half-beats not yet taken: a 0-jet point alone has no velocity, it only remembers.`],
            fig: [`探针停在 x₀：s = 0，κ ${k4}；虚线是还没走的两个半拍。`, `The probe rests at x₀: s = 0, κ ${k4}; the dashes are the two half-beats not yet taken.`]
          }
        : {
            long: ['琥珀探针已离开 x₀，走过的一段变成青色实线，κ 随之下降；x₀ 与它的青色圈仍在原处。按 ⏮ 回到 s = 0。', 'The amber probe has left x₀: the part it has run turns solid cyan and κ falls; x₀ and its cyan circles stay put. Press ⏮ to return to s = 0.'],
            fig: ['探针已离开 x₀：走过的一段是青色实线，青色圈仍在 x₀。', 'The probe has left x₀: the part it has run is solid cyan, and the cyan circles stay at x₀.']
          };
    if (s === 'present') {
      if (r === 'zero')
        return {
          long: [`步幅 σ = 0：没有迈步，三种取样都停在 x₀，‖x₁‖² ${n2}，取样 α 不起作用。把 σ 拉开，品红的两端与青色的中点步才分开。`, `Span σ = 0: no step is taken, all three samplings stay at x₀, ‖x₁‖² ${n2}, and α has no effect. Open σ and the magenta ends and the cyan midpoint step come apart.`],
          fig: [`步幅 σ = 0：三种取样都停在 x₀，‖x₁‖² ${n2}。`, `Span σ = 0: all three samplings stay at x₀, ‖x₁‖² ${n2}.`]
        };
      if (r === 'on')
        return {
          long: [`同一步的三种取样：青色的中点步 α = 1/2 正落在球面上，‖x₁‖² ${n2}，弦与中点垂直；品红箭头 α = 0 冲到球外，品红虚线 α = 1 沉到球内。拖琥珀点改 α：只有 1/2 落在球面上。`, `Three samplings of one step: the cyan midpoint step α = 1/2 lands exactly on the sphere, ‖x₁‖² ${n2}, its chord perpendicular to its midpoint; the magenta arrow α = 0 shoots outside and the dashed magenta α = 1 sinks inside. Drag the amber point to change α: only 1/2 lands on the sphere.`],
          fig: [`α = 1/2：中点步正落在球面上，‖x₁‖² ${n2}；α = 0 在球外，α = 1 在球内。`, `α = 1/2: the midpoint step lands on the sphere, ‖x₁‖² ${n2}; α = 0 ends outside, α = 1 inside.`]
        };
      if (r === 'out')
        return {
          long: ['琥珀取样点在 α &lt; 1/2：这一步落在球面之外，‖x₁‖² &gt; 1。沿品红细线把它推向 α = 1/2，才碰到青色的球面点。', 'The amber sampling point is at α &lt; 1/2: this step ends outside the sphere, ‖x₁‖² &gt; 1. Push it along the thin magenta line to α = 1/2 to reach the cyan point on the sphere.'],
          fig: ['α &lt; 1/2：这一步落在球面之外，‖x₁‖² &gt; 1；推到 α = 1/2 才落在球面上。', 'α &lt; 1/2: this step ends outside the sphere, ‖x₁‖² &gt; 1; at α = 1/2 it lands on it.']
        };
      return {
        long: ['琥珀取样点在 α &gt; 1/2：这一步沉到球面之内，‖x₁‖² &lt; 1。沿品红细线把它推回 α = 1/2，才碰到青色的球面点。', 'The amber sampling point is at α &gt; 1/2: this step sinks inside the sphere, ‖x₁‖² &lt; 1. Push it back along the thin magenta line to α = 1/2 to reach the cyan point on the sphere.'],
        fig: ['α &gt; 1/2：这一步沉到球面之内，‖x₁‖² &lt; 1；推回 α = 1/2 才落在球面上。', 'α &gt; 1/2: this step sinks inside the sphere, ‖x₁‖² &lt; 1; at α = 1/2 it lands on it.']
      };
    }
    if (s === 'future') {
      const flat = m.tau === 0,
        b = r.replace('flat-', ''),
        turn = refrRel(m),
        k2 = rel(whole(0), m.doubledHalf);
      if (b === 'closed')
        return flat
          ? {
              long: [`两个半拍 1/2 + 1/2 合成一拍：κ₂ = (2κ₁ − 1)² ${k2}，s ${s4}。τ = 0：没有月牙，也没有折射，落点就是 −x₀。`, `Two half-beats 1/2 + 1/2 make one beat: κ₂ = (2κ₁ − 1)² ${k2}, s ${s4}. At τ = 0 there is no lune and no refraction, and the landing is −x₀.`],
              fig: [`两个半拍合成一拍，s ${s4}；τ = 0：没有月牙也没有折射。`, `Two half-beats make one beat, s ${s4}; at τ = 0 there is no lune and no refraction.`]
            }
          : {
              long: [`两个半拍 1/2 + 1/2 合成一拍：自由落点 κ₂ = (2κ₁ − 1)² ${k2}，s ${s4}。品红月牙铺满，紫色三体胞 Λ³ 合拢；两条青色航向落在同一点，品红弧（李三元组）把落点折开 ${turn} 到 x₁。`, `Two half-beats 1/2 + 1/2 make one beat: the free landing has κ₂ = (2κ₁ − 1)² ${k2}, s ${s4}. The magenta lune is full and the violet 3-cell Λ³ closes; both cyan headings land at one point, and the magenta arc (the Lie triple) refracts the landing by ${turn} to x₁.`],
              fig: [`1/2 + 1/2 = 1：自由落点 s ${s4}；品红弧把它折开 ${turn} 到 x₁。`, `1/2 + 1/2 = 1: the free landing has s ${s4}; the magenta arc refracts it by ${turn} to x₁.`]
            };
      if (b === 'start')
        return flat
          ? { long: ['探针还在 x₀，两个半拍都没走；τ = 0：没有月牙，也没有折射。', 'The probe is still at x₀, neither half-beat taken; at τ = 0 there is no lune and no refraction.'], fig: ['s = 0：两个半拍都没走；τ = 0，没有月牙。', 's = 0: neither half-beat taken; τ = 0, no lune.'] }
          : { long: ['探针还在 x₀，两个半拍都没走，品红月牙还没铺开；两条青色虚线是两条航向，品红虚线是将要发生的折射。', 'The probe is still at x₀, neither half-beat taken and the magenta lune not yet spread; the two dashed cyan lines are two headings, the dashed magenta arc the refraction to come.'], fig: ['s = 0：两个半拍都没走，品红月牙还没铺开。', 's = 0: neither half-beat taken, the magenta lune not yet spread.'] };
      const half = b === 'half',
        first = b === 'first';
      if (flat)
        return {
          long: [half ? '第一个半拍走完：探针在 1/2，κ₁ = 1/2；τ = 0，没有月牙，也没有折射。' : first ? '第一个半拍正在走；τ = 0，没有月牙，也没有折射。' : '第二个半拍正在走；τ = 0，没有月牙，也没有折射。', half ? 'The first half-beat is done: the probe is at 1/2, κ₁ = 1/2; at τ = 0 there is no lune and no refraction.' : first ? 'The first half-beat is running; at τ = 0 there is no lune and no refraction.' : 'The second half-beat is running; at τ = 0 there is no lune and no refraction.'],
          fig: [half ? '探针在 1/2，κ₁ = 1/2；τ = 0，没有月牙。' : first ? '第一个半拍正在走；τ = 0，没有月牙。' : '第二个半拍正在走；τ = 0，没有月牙。', half ? 'The probe is at 1/2, κ₁ = 1/2; τ = 0, no lune.' : first ? 'First half-beat running; τ = 0, no lune.' : 'Second half-beat running; τ = 0, no lune.']
        };
      return {
        long: [half ? '第一个半拍走完：探针在 1/2，κ₁ = 1/2，品红月牙正好铺了一半。再走一个半拍就合上。' : first ? '第一个半拍正在走：品红月牙随探针铺开，铺开的份额正好是 s，还不到一半。' : '第二个半拍正在走：品红月牙铺过了一半，铺开的份额正好是 s，紫色三体胞还没合拢。', half ? 'The first half-beat is done: the probe is at 1/2, κ₁ = 1/2, and the magenta lune is exactly half spread. One more half-beat closes it.' : first ? 'The first half-beat is running: the magenta lune spreads with the probe, its share exactly s, less than half so far.' : 'The second half-beat is running: the magenta lune is past half, its share exactly s, and the violet 3-cell is not closed yet.'],
        fig: [half ? '探针在 1/2，κ₁ = 1/2：品红月牙正好铺了一半。' : first ? '第一个半拍正在走：月牙铺开的份额正好是 s。' : '第二个半拍正在走：月牙铺过一半，份额正好是 s。', half ? 'The probe is at 1/2, κ₁ = 1/2: the magenta lune is exactly half spread.' : first ? 'First half-beat: the share of the lune spread so far is exactly s.' : 'Second half-beat: the lune is past half, its share exactly s.']
      };
    }
    if (s === 'third') {
      const dF = dFRel(tetraOf(m.f));
      if (r === 'collapsed')
        return {
          long: [`s = 0：琥珀的 V₁ 与 V₀ 重合，紫色四面体压平；含 V₀V₁ 的两个面相位为 0，其余两个面相同而相消，δF ${dF}。推动探针，四面体就撑开。`, `s = 0: the amber V₁ meets V₀ and the violet tetrahedron is flat; the two faces on V₀V₁ have phase 0, the other two are equal and cancel, δF ${dF}. Move the probe and the tetrahedron opens.`],
          fig: [`s = 0：V₁ 与 V₀ 重合，四面体压平，δF ${dF}。`, `s = 0: V₁ meets V₀, the tetrahedron is flat, δF ${dF}.`]
        };
      if (r === 'antipodal')
        return {
          long: [`s = 1：琥珀的 V₁ 到了 V₀ 的对跖点，含 V₀V₁ 的两个面取沿这一拍的极限，四个面相位的交错和仍是 δF ${dF}。`, `s = 1: the amber V₁ is at the antipode of V₀, the two faces on V₀V₁ take the limit along the beat, and the alternating sum of the four face phases is still δF ${dF}.`],
          fig: [`s = 1：V₁ 到了 V₀ 的对跖点，交错和仍是 δF ${dF}。`, `s = 1: V₁ is at the antipode of V₀, and the sum is still δF ${dF}.`]
        };
      return {
        long: [`紫色四面体 Λ³ 的四个顶点在球面上：V₀ = x₀，V₁ 是琥珀探针，V₂、V₃ 在 κ = 1/2 的平面里。品红大圆弧围出四个面，面相位交错相加 F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ ${dF}：拖 V₁，各项都变，和不变。停在二阶是模型的选择（MODEL）。`, `The four vertices of the violet tetrahedron Λ³ lie on the sphere: V₀ = x₀, V₁ is the amber probe, V₂ and V₃ lie in the plane κ = 1/2. Magenta great-circle arcs bound its four faces, whose phases add up alternately to F₁₂₃ − F₀₂₃ + F₀₁₃ − F₀₁₂ ${dF}: drag V₁ and the terms change, the sum does not. Stopping at second order is a choice of the model (MODEL).`],
        fig: [`拖 V₁：四个面的相位都在变，交错和 δF ${dF} 不变。`, `Drag V₁: the four face phases change, their alternating sum δF ${dF} does not.`]
      };
    }
    const flat = m.tau === 0,
      turnZh = flat ? '航向不转（τ = 0），四拍在同一个大圆上往返' : '每次落地航向转过 2θ<sub>ctx</sub>',
      turnEn = flat ? 'the heading does not turn (τ = 0), and the four beats run to and fro on one great circle' : 'the heading turns by 2θ<sub>ctx</sub> at each landing';
    if (r === 'start')
      return {
        long: [`B₀ 起拍：琥珀探针在 0 = x₀，四拍都还是虚线。按 ▶ 看它从 0 经 1/2 走到 1，落下的 1 就是下一拍的 0′；${turnZh}。`, `B₀ starts: the amber probe is at 0 = x₀ and all four beats are still dashed. Press ▶ to run from 0 through 1/2 to 1, where the landed 1 is the next 0′; ${turnEn}.`],
        fig: ['B₀ 起拍：探针在 0 = x₀，四拍都还是虚线。', 'B₀ starts: the probe is at 0 = x₀ and all four beats are dashed.']
      };
    if (r === 'landed')
      return {
        long: [`落拍：探针到了 1，s ${s4}；在这里重新量，s′ ${idRel(0, m.reAnchor)}，所以这个 1 就是下一拍的 0′，紫色三体胞收成一个新锚点；${turnZh}。`, `A beat lands: the probe is at 1, s ${s4}; measured afresh here, s′ ${idRel(0, m.reAnchor)}, so this 1 is the next 0′ and the violet 3-cell becomes the new anchor; ${turnEn}.`],
        fig: [`落拍：s ${s4}，重新量 s′ ${idRel(0, m.reAnchor)}：1 就是下一拍的 0′。`, `A beat lands: s ${s4}, measured afresh s′ ${idRel(0, m.reAnchor)}: the 1 is the next 0′.`]
      };
    if (r === 'half')
      return {
        long: [`四拍 B₀ → B₃ 首尾相接，探针正在这一拍的 1/2 切面上：s = 1 − s = 1/2。走过的拍是青色实线，没走的是虚线；落下的 1 就是下一拍的 0′，${turnZh}。`, `Four beats B₀ → B₃ join end to end, and the probe is on the slice 1/2 of this beat: s = 1 − s = 1/2. Beats run are solid cyan, beats to come dashed; the landed 1 is the next 0′, and ${turnEn}.`],
        fig: ['探针在这一拍的 1/2 切面上：s = 1 − s = 1/2；落下的 1 是下一拍的 0′。', 'The probe is on the slice 1/2 of this beat: s = 1 − s = 1/2; the landed 1 is the next 0′.']
      };
    return {
      long: [`四拍 B₀ → B₃ 首尾相接：琥珀探针沿这一拍从 0 经 1/2 切面走向 1。走过的拍是青色实线，没走的是虚线；落下的 1 就是下一拍的 0′，${turnZh}。`, `Four beats B₀ → B₃ join end to end: the amber probe runs this beat from 0 through the slice 1/2 to 1. Beats run are solid cyan, beats to come dashed; the landed 1 is the next 0′, and ${turnEn}.`],
      fig: ['探针沿这一拍从 0 经 1/2 走向 1；落下的 1 是下一拍的 0′。', 'The probe runs this beat from 0 through 1/2 to 1; the landed 1 is the next 0′.']
    };
  }

  /* ---------- labels ---------- */
  function tags(m, w, T) {
    const g = state.lens === 1,
      s = state.scene,
      compact = stage.clientWidth < 480;
    const { U, R } = basis(sc.cam.yaw, sc.cam.pitch);
    // a label sits (right, up) pixels from its point
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const view = (x, y) => add(scale(R, x), scale(U, y));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (!compact) N('ball', view(-0.82, -0.78), g ? L('SU(2) 的切片', 'slice of SU(2)') : '𝕋₃ ≅ S³(1)', 'c-vi');
    const A = [0, 0, 1],
      H = [1, 0, 0],
      B = [0, 0, -1];
    const names = g ? ['J⁰ · Δ⁰', 'J¹ · Δ<sup>1/2</sup>', 'J² · Δ¹'] : ['0 · x₀', '1/2', '1'];
    if (s === 'past') {
      N('zero', off(A, -58, 10), names[0], 'c-cy');
      N('half', off(H, g ? 44 : 28, 0), names[1], 'c-cy');
      N('one', off(B, 46, -6), g ? names[2] : '1 · x₁', 'c-cy');
      N('frozen', off(A, 96, 10), g ? L('KV 槽 · ξ(0) = 1/2', 'KV slot · ξ(0) = 1/2') : '[x₀, x₀, x₀] = x₀', 'c-cy');
    }
    if (s === 'present') {
      N('zero', off(A, -46, 8), names[0], 'c-cy');
      N('plane', [-0.72, -0.1, -0.1], g ? 'Re s = 1/2' : 'κ = 1/2', 'c-cy');
      N('half', off(H, g ? 20 : 8, -20), names[1], 'c-cy');
      if (m.sigma > 0) {
        const [ito, mid, back] = ['ito', 'mid', 'back'].map((k) => world(m.steps[k].x1));
        const val = (k) => normRel(m.steps[k], m.sigma);
        const name = (k, a, lens) => (g ? lens : compact ? `${a}: ‖x₁‖² ${val(k)}` : `${a} · ‖x₁‖² ${val(k)}`);
        N('ito', compact ? off(ito, -18, 20) : off(ito, g ? 54 : 92, 0), name('ito', 'α = 0', L('左端 · 伊藤', 'left · Itô')), 'c-mg');
        N('mid', compact ? off(mid, 12, -34) : off(mid, g ? 96 : 108, -4), name('mid', 'α = 1/2', L('中点 · 斯特拉托诺维奇', 'midpoint · Stratonovich')), 'c-cy');
        N('back', off(back, compact ? -30 : -24, -24), name('back', 'α = 1', L('右端', 'right')), 'c-mg');
      } else N('mid', off(A, 96, 8), `σ = 0 · ‖x₁‖² ${normRel(m.steps.mid, m.sigma)}`, 'c-cy');
    }
    if (s === 'future') {
      N('zero', off(A, -50, 10), names[0], 'c-cy');
      N('half', off(H, g ? 50 : 30, 0), g ? names[1] : X_HALF, 'c-cy');
      const q = Math.SQRT1_2;
      if (!compact) {
        N('h1', off([q, 0, q], 26, 8), '1/2', 'c-cy');
        N('h2', off([q, 0, -q], 26, -8), '1/2', 'c-cy');
      }
      N('free', off(B, 78, -10), g ? names[2] : L('自由落点 −x₀', 'free landing −x₀'), 'c-cy');
      if (m.tau > 0) {
        // beside the left edge of the lune, clear of the midpoint on its right edge
        const az = -m.thc,
          mid = Math.max(0.3, 0.58 * PI * m.f);
        if (m.f > 0.2) N('lune', off([sn(mid) * cs(az), sn(mid) * sn(az), cs(mid)], compact ? -16 : -50, 0), compact ? 'F' : 'F = [D₁, D₂]', 'c-mg');
        N('ref', off(world(m.refr.ref), -10, 22), g ? L('写回 x₁', 'write-back x₁') : compact ? 'x₁' : `x₁ · ${refrRel(m)}`, 'c-mg');
        if (m.f > 0.6 && !compact) N('cell', off([0, 0, 0.36], -26, 0), 'Λ³', 'c-vi');
      }
    }
    if (s === 'third') {
      N('v0', off(A, -56, 10), g ? names[0] : 'V₀ = x₀', 'c-mg');
      N('v1', off(T.V[1], 54, -14), 'V₁ = x(s)', 'c-mg');
      N('v2', off(T.V[2], -24, 10), 'V₂', 'c-mg');
      N('v3', off(T.V[3], 22, 14), 'V₃', 'c-mg');
      N('cell', view(-0.5, 0.42), `Λ³ · δF ${dFRel(T)}`, 'c-vi');
    }
    if (s === 'loop') {
      const up = m.n % 2 ? -1 : 1;
      N('anchor', off(world(m.x0), g ? -52 : -30, 12 * up), g ? names[0] : '0', 'c-cy');
      N('land', off(world(m.land), 48, -12 * up), g ? `${STAR} 1 ↦ 0` : '1 ≡ 0′', 'c-cy');
      N('mid', off(world(m.xHalf), g ? 50 : 34, 0), names[1], 'c-cy');
      for (let n = 0; n < BEATS; n++) {
        if (n !== m.n && compact) continue;
        N('b' + n, off(world(beatQuat(n, 0.3, m.beta)), 18, 0), `B<sub>${n}</sub>`, n === m.n ? 'c-ik' : 'c-cy');
      }
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d.]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*°?/g, '<span class="nb">$&</span>');
  function hud(m, T) {
    $('hudBig').innerHTML = bigline(m, T);
    $('hudSub').innerHTML = kept(subline(m, T));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    const list = [...stage.querySelectorAll('.tags .tag:not([hidden])')];
    for (const tag of list) tag.style.translate = '';
    const boxes = list.map((tag) => tag.getBoundingClientRect());
    // the place of a label shifted by (dx, dy), or null when it leaves the stage or meets an occupied box
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
    // each label takes the free place nearest its anchor, rows and side steps weighed together by distance
    const STEP = 20,
      cols = 2 * Math.ceil(bounds.width / STEP);
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
        const sx = Math.ceil(k / 2) * STEP * (k % 2 ? -1 : 1),
          extra = sx === 0 ? 0 : 0.5;
        if (best && Math.abs(dx + sx) + extra >= best.cost) continue;
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
    }
  }
  /** The world point of the amber handle for a value v of the rail. */
  const handleWorld = (v) => (state.scene === 'present' ? world(stepAt(v, state.sigma)) : world(beatPointAt(v)));
  const beatPointAt = (t) => {
    const { n, f } = splitBeat(t);
    return beatQuat(n, f, 2 * Math.atan(state.tau));
  };
  function drawStage(m, I) {
    const w = layers();
    fit(m, w);
    sc.begin();
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    drawBall(m, w, D);
    drawBeat(m, w, D);
    drawStep(m, w);
    drawFuture(m, w, D);
    drawCap(m, w, I.tetra);
    drawChain(m, w, D);
    const here = state.scene === 'present' ? world(m.step.x1) : world(m.probe);
    sc.bead(here, { color: P.amber, r: 6.6, key: 'probe' });
    tags(m, w, I.tetra);
    sc.end();
    const q = sc.p(here);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels();
  }

  /* ---------- strips ---------- */
  const LEGEND_PX = 10.5,
    ROW = 14;
  /** Legend entries laid out in rows of the given width: [[[colour, label, kind, x], …], …]. */
  function legendRows(cv, items, width) {
    const ctx = cv.getContext('2d');
    ctx.font = `${LEGEND_PX}px ${TRV.fonts.body}`;
    const rows = [];
    let row = [],
      x = 0;
    for (const [color, label, kind] of items) {
      const w = 19 + ctx.measureText(label).width;
      if (row.length && x + w > width) {
        rows.push(row);
        row = [];
        x = 0;
      }
      row.push([color, label, kind, x]);
      x += w + 16;
    }
    rows.push(row);
    return rows;
  }
  /** The top of the y range that leaves the legend rows in open headroom above the highest curve value. */
  function headroom(cv, pad, rows, lo, hi) {
    const ih = Math.max(1, cv.clientHeight - pad[2] - pad[3]),
      need = 9 + ROW * (rows - 1) + 22,
      frac = clamp(need / ih, 0.3, 0.8);
    return lo + (hi - lo) / (1 - frac);
  }
  function drawLegend(g, rows) {
    const ctx = g.ctx;
    ctx.save();
    ctx.font = `${LEGEND_PX}px ${TRV.fonts.body}`;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    rows.forEach((row, k) => {
      const y = g.pt + 9 + ROW * k;
      for (const [color, label, kind, dx] of row) {
        const x = g.pl + 10 + dx;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash(kind === 'dash' ? [4, 3] : []);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 14, y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = P.ink;
        ctx.fillText(label, x + 19, y);
      }
    });
    ctx.restore();
  }
  const PAD = [38, 14, 10, 22];
  /** The drift plot: its tick labels have up to four decimals. */
  const PAD_DRIFT = [46, 14, 10, 22];
  /** A tick label: the decimal that is the value; a value without one has its grid line and no label. */
  const tickText = (q) => {
    const exact = [1, 2, 3, 4].map((d) => decimals(q, d)).find((x) => x.exact);
    return exact ? exact.text : '';
  };
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = m.sigma > 0 ? L('范数漂移只在 α = 1/2 归零', 'Norm drift: zero only at α = 1/2') : L('σ = 0：没有漂移', 'σ = 0: no drift');
      $('plotMeta').textContent = '(1 − 2α)‖Δx‖²';
      const items = [
        [P.magenta, '‖x₁‖² − 1'],
        [P.cyan, L('α = 1/2：‖x₁‖² = 1', 'α = 1/2: ‖x₁‖² = 1')]
      ];
      const sig = m.sigma,
        hi = sig > 0 ? driftAt(0, sig) : 1,
        dn = sig > 0 ? driftAt(1, sig) : -0.5,
        lo = dn - 0.12 * (hi - dn);
      const rows = legendRows(cv, items, cv.clientWidth - PAD_DRIFT[0] - PAD_DRIFT[1] - 12);
      const g = kit.plot(cv, { x: [0, 1], y: [lo, headroom(cv, PAD_DRIFT, rows.length, lo, hi)], pad: PAD_DRIFT });
      const ticks = sig > 0 ? [[dn, tickText(stepQ(1, sig).drift)], [0, '0'], [hi, tickText(stepQ(0, sig).drift)]] : [[0, '0']];
      g.axes({ xTicks: [[0, 'α = 0'], [0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1, '1']], yTicks: ticks });
      g.line([[0, 0], [1, 0]], P.cyan, { width: 1.2, dash: [4, 4] });
      g.line(sample(160, (u) => [u, driftAt(u, sig)]), P.magenta, { width: 2 });
      g.dot(0.5, 0, P.cyan, 4.5);
      // the cursor stops at the highest curve value: the legend rows above stay clear
      g.line([[m.alpha, lo], [m.alpha, hi]], P.amber, { width: 1 });
      g.dot(m.alpha, m.step.drift, P.amber, 3.5);
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const width = cb.clientWidth - PAD[0] - PAD[1] - 12;
      if (state.scene === 'third') {
        $('plotTitleB').textContent = L('二阶有下界，高阶玩具没有（MODEL）', 'Floor at 2nd order, none above (MODEL)');
        $('plotMetaB').textContent = L('L = q̈²/2 · Q₂ = 1，P₂ = 0', 'L = q̈²/2 · Q₂ = 1, P₂ = 0');
        const items = [
          [P.cyan, 'E₂ = P₁²/2 ≥ 0'],
          [P.magenta, L('H = P₁Q₂，没有下界', 'H = P₁Q₂, no floor')]
        ];
        const rows = legendRows(cb, items, width),
          hi = (P_SCALE * P_SCALE) / 2,
          lo = -2.4;
        const g = kit.plot(cb, { x: [-P_SCALE, P_SCALE], y: [lo, headroom(cb, PAD, rows.length, lo, hi)], pad: PAD });
        g.axes({ xTicks: [-2, -1, 0, 1, 2].map((v) => [v, v === -2 ? 'P₁ = −2' : fmt(v, 0)]), yTicks: [-2, 0, 2].map((v) => [v, fmt(v, 0)]) });
        g.line(sample(160, (u) => { const p = -P_SCALE + 2 * P_SCALE * u; return [p, (p * p) / 2]; }), P.cyan, { width: 2 });
        g.line(sample(2, (u) => { const p = -P_SCALE + 2 * P_SCALE * u; return [p, p]; }), P.magenta, { width: 2 });
        g.arrow([-1.75, -1.75], [-2.15, -2.15], { color: P.magenta, width: 2, headSize: 8 });
        g.line([[m.momentum, lo], [m.momentum, hi]], P.amber, { width: 1 });
        g.dot(m.momentum, (m.momentum * m.momentum) / 2, P.amber, 3.5);
        g.dot(m.momentum, m.momentum, P.amber, 3.5);
        drawLegend(g, rows);
      } else {
        $('plotTitleB').textContent = L('自对偶：s 与 1 − s 在 1/2 相交', 'Self-dual: s meets 1 − s at 1/2');
        $('plotMetaB').textContent = 'ξ(1 − s) = ξ(s)';
        const items = [
          [P.magenta, 's'],
          [P.cyan, '1 − s = κ'],
          [P.violet, '4s(1 − s)'],
          [P.violet, 'ξ(s)', 'dash']
        ];
        const rows = legendRows(cb, items, width),
          lo = -0.04;
        const g = kit.plot(cb, { x: [0, 1], y: [lo, headroom(cb, PAD, rows.length, lo, 1)], pad: PAD });
        g.axes({ xTicks: [[0, 's = 0'], [0.25, '1/4'], [0.5, '1/2'], [0.75, '3/4'], [1, '1']], yTicks: [[0, '0'], [0.5, '1/2'], [1, '1']] });
        g.line(XI_CURVE, P.violet, { width: 1.4, dash: [4, 3] });
        g.line(sample(120, (u) => [u, 4 * u * (1 - u)]), P.violet, { width: 2 });
        g.line([[0, 0], [1, 1]], P.magenta, { width: 2 });
        g.line([[0, 1], [1, 0]], P.cyan, { width: 2 });
        g.line([[m.s, lo], [m.s, 1]], P.amber, { width: 1 });
        g.dot(m.s, m.s, P.amber, 3.5);
        g.dot(m.s, 1 - m.s, P.amber, 3.5);
        drawLegend(g, rows);
      }
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m, I) {
    const s = state.scene,
      gap = (x) => L(`浮点偏差 ${below(x)}`, `floating-point drift ${below(x)}`);
    if (s === 'past')
      return L(
        `[x₀, x₀, x₀] 与 x₀：${gap(I.model.frozen)}；捏合一次与两次：${gap(I.pinch.gap)}；可观测克雷洛夫维数：停住 ${I.krylov.frozen.join(', ')}，走半拍 ${I.krylov.half.join(', ')}。`,
        `[x₀, x₀, x₀] against x₀: ${gap(I.model.frozen)}; pinching once and twice: ${gap(I.pinch.gap)}; observable Krylov dimensions: halted ${I.krylov.frozen.join(', ')}, half-beat ${I.krylov.half.join(', ')}.`
      );
    if (s === 'present') {
      const ratio0 = I.cayley.atZero ? L('= 0（s = 0 的除法约定）', '= 0 (division convention at s = 0)') : cayleyRel(m),
        list = (xs) => xs.join(L('、', ', ')),
        sums = list(I.sagitta.map((x) => rel(null, x))),
        rough = list(ROUGH.map((a) => fstr(ratio(a))));
      return L(
        `步角 θ = 2 arctan(σ/2) ${spanAngleRel(m)}；凯莱比 |(s − 1)/s| ${ratio0}，在 1/2 + ${LINE_AT}i 处 ${idRel(1, I.cayley.line)}；粗糙度 a = ${rough} 的累计正矢（N = ${powerName(ROUGH_N)}）：${sums}。`,
        `Step angle θ = 2 arctan(σ/2) ${spanAngleRel(m)}; Cayley ratio |(s − 1)/s| ${ratio0}, and ${idRel(1, I.cayley.line)} at 1/2 + ${LINE_AT}i; accumulated versines (N = ${powerName(ROUGH_N)}) at roughness a = ${rough}: ${sums}.`
      );
    }
    if (s === 'future')
      return L(
        `rayKernel(x₀, x(s)) = (1 − 2s)² ${squareRel(m)}，记录权重 (1 − 2s)² ${squareRel(m)} 与 4s(1 − s) ${otherRel(m)}，和与 1 的${gap(Math.abs(I.weights.sum - 1))}；A A† = B B† = 1/2、S S† = 1，反自伴的${gap(I.balanced.skew)}；开链环路 c = ${I.tree.loops}，规范后的${gap(I.tree.gap)}；折射后 ‖x₁‖² 与 1 的${gap(Math.abs(m.refr.norm2 - 1))}。`,
        `rayKernel(x₀, x(s)) = (1 − 2s)² ${squareRel(m)}, record weights (1 − 2s)² ${squareRel(m)} and 4s(1 − s) ${otherRel(m)}, their sum against 1: ${gap(Math.abs(I.weights.sum - 1))}; A A† = B B† = 1/2 and S S† = 1, skew-adjointness: ${gap(I.balanced.skew)}; open chain c = ${I.tree.loops}, after the gauge: ${gap(I.tree.gap)}; refracted ‖x₁‖² against 1: ${gap(Math.abs(m.refr.norm2 - 1))}.`
      );
    if (s === 'third') {
      const f = (k) => faceRel(m, I.tetra, k),
        faces = `F₁₂₃ ${f('F123')}${L('，', ', ')}F₀₂₃ ${f('F023')}${L('，', ', ')}F₀₁₃ ${f('F013')}${L('，', ', ')}F₀₁₂ ${f('F012')}`;
      return L(
        `${faces}；锚在 V₀ 的边上链复原失败 ${I.tetra.edgeErrors} 处。P₁ ${momentumRel(m)}：E₂ = P₁²/2 ${energyRel(m)}，H = P₁ ${momentumRel(m)}。`,
        `${faces}; failures of the edge cochain anchored at V₀: ${I.tetra.edgeErrors}. P₁ ${momentumRel(m)}: E₂ = P₁²/2 ${energyRel(m)}, H = P₁ ${momentumRel(m)}.`
      );
    }
    return L(
      `落点与 −x₀：${gap(I.heap.gap)}；[x₁, x₁, x₁] 与 x₁：${gap(I.heap.reAnchor)}；两拍后与 x₀：${gap(I.heap.twice)}；x(t)² 绕满一圈，${I.lift.samples} 个采样点：${gap(I.lift.gap)}；切比雪夫公式：${gap(I.chebyshev.gap)}。`,
      `The landing against −x₀: ${gap(I.heap.gap)}; [x₁, x₁, x₁] against x₁: ${gap(I.heap.reAnchor)}; two beats later against x₀: ${gap(I.heap.twice)}; x(t)² makes one full turn, ${I.lift.samples} samples: ${gap(I.lift.gap)}; Chebyshev formulas: ${gap(I.chebyshev.gap)}.`
    );
  }
  /** A quantity that is exactly 0 here, with the residue of the floating-point computation. */
  const zeroWith = (x, unit = '') => `= 0${L(`（浮点余量 ${below(x)}${x ? unit : ''}）`, ` (residue ${below(x)}${x ? unit : ''})`)}`;
  function readings(m, I) {
    const put = (id, html) => ($(id).innerHTML = kept(html));
    put('roKey', `${sRel(m)} ↔ ${kRel(m)}`);
    put('roKeySub', ` · ${state.scene === 'loop' ? `B${m.n} · ` : ''}α ${alphaRel(m.alpha)} · σ ${spanRel(m.sigma)} · τ ${spanRel(m.tau)}`);
    put('roStep', `${normRel(m.step, m.sigma)} · ${driftRel(m.step, m.sigma, 8)} · ${below(Math.abs(m.step.drift - m.step.law))}`);
    put('roTangent', `${driftRel(m.step, m.sigma, 8)} · ${zeroWith(Math.abs(m.steps.mid.tangency))}`);
    put('roHeap', `${rel(ratio(m.kHalf), m.kHalf)} → ${rel(whole(0), m.doubledHalf)} · ${kRel(m)} → ${squareRel(m)}`);
    put('roLune', `${lunePartRel(m)} / ${luneRel(m)} · ${refrRel(m)} · ${kRefRel(m)}`);
    put('roXi', `${rel(ratio(m.xi.at0), m.xi.at0)} · ${xiRel(m)} · ${rel(ratio(m.xi.at1), m.xi.at1)} · ${below(Math.abs(m.xi.at - m.xi.mirror))}`);
    put('roTetra', `${zeroWith(Math.abs(I.tetra.alternating), '°')} · ${I.tetra.defects} / ${I.tetra.quadruples}`);
    put('roNote', readNote(m, I));
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`);
    put('keyPill', `s <strong>${sRel(m)}</strong> · 1 − s <strong>${kRel(m)}</strong>`);
    $('hint').textContent = state.scene === 'present' ? L('拖琥珀手柄改 α · 拖空白处转视角 · 空格播放', 'drag the amber handle to set α · drag empty space to orbit · Space plays') : L('拖琥珀手柄推探针 · 拖空白处转视角 · 空格播放', 'drag the amber handle to move the probe · drag empty space to orbit · Space plays');
    $('formula').textContent = state.scene === 'present' ? '(I − αA) x₁ = (I + (1 − α)A) x₀' : 's = 1 − κ(x₀, x) = (1 − cos πt)/2';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('sRange').value = String(m.s);
    put('sOut', sRel(m));
    $('alphaRange').value = String(m.alpha);
    put('alphaOut', alphaRel(m.alpha));
    $('sigmaRange').value = String(m.sigma);
    put('sigmaOut', spanRel(m.sigma));
    $('ctxRange').value = String(m.tau);
    put('ctxOut', spanRel(m.tau));
    const anchor = [0, 0.5, 1].find((x) => m.f === x);
    anchorChips.set(anchor == null ? null : anchor, true);
  }
  const calc = () => compute(state.t, state.alpha, state.sigma, state.tau, state.mark);
  let syncNotes = null;
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m);
    hud(m, I.tetra);
    if (syncNotes) syncNotes(m);
    TRV.hudFit();
    drawStage(m, I);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  /** The value of the rail, freed from the rounding of its own steps: α on the grid of its slider; the stations and the place
      a share was given for, themselves. */
  function settled(v) {
    const back = railVar() === 'alpha' ? Math.round(v * 200) / 200 : state.mark && Math.abs(v - state.mark.t) < 1e-10 ? state.mark.t : Math.round(2 * v) / 2;
    return Math.abs(v - back) < 1e-10 ? back : v;
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: 1 / 6,
    step: 0.05,
    max: 1,
    t: 0.5,
    format: (t) => {
      if (railVar() === 'alpha') return `α ${alphaRel(settled(t))}`;
      const m = compute(settled(t), state.alpha, state.sigma, state.tau, state.mark);
      return `${state.scene === 'loop' ? `B${m.n} · ` : ''}s ${sRel(m)}`;
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      state[railVar()] = settled(t);
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
  /** Give the rail to the scene: its length, speed and step, and the variable it drives. */
  function setRail(scene) {
    const r = RAILS[scene];
    clockOpts.loop = r.loop;
    clock.rate = r.rate;
    clock.step = r.step;
    clock.setMax(r.max, true);
    clock.set(state[railVar()], true);
  }
  /** A pointer lands exactly on the stations it comes close to, α = 1/2 and s = 0, 1/2, 1 of a beat: no reading can then
      round to 1/2 while the words next to it say otherwise. */
  function snap(v) {
    if (railVar() === 'alpha') return Math.abs(v - 0.5) < 0.006 ? 0.5 : v;
    const k = Math.round(2 * v) / 2;
    return Math.abs(v - k) < 0.006 ? k : v;
  }
  $('now').addEventListener('input', () => {
    const v = snap(clock.t);
    if (v !== clock.t) clock.set(v);
  });
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

  /* a card that plays inside a book starts once the stage is half in view and pauses when it leaves; the first touch
     of the reader ends this for good */
  let bootIO = null;
  function bootAutoplay(target) {
    if (TRV.still || !window.IntersectionObserver) return;
    let started = false;
    bootIO = new IntersectionObserver(
      (entries) => {
        const seen = entries[entries.length - 1].intersectionRatio >= 0.5;
        if (seen && !started) {
          started = true;
          stopAt = target;
          clock.play();
        } else if (!seen && clock.playing) clock.pause();
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
  let transition = null,
    booting = true;
  function startBlend(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.blend = 0;
    const token = {};
    transition = token;
    const end = () => {
      state.blend = 1;
      state.from = null;
    };
    token.cancel = () => {
      if (token.run) token.run.cancel();
      end();
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.blend = e;
        paint();
      },
      () => {
        if (transition === token) transition = null;
        end();
        paint();
      }
    );
  }
  function setScene(scene, ms) {
    const before = { ...layers() };
    clock.pause();
    const changed = scene !== state.scene;
    state.scene = scene;
    // outside the heartbeat there is one beat: the place keeps its share s
    if (scene !== 'loop' && state.t > 1) {
      const at = placeAt(state.t, state.mark);
      state.mark = state.mark === at ? { ...at, n: 0, t: at.f } : null;
      state.t = at.f;
    }
    setRail(scene);
    if (changed && ms > 0 && !TRV.still) startBlend(before, ms);
    else {
      if (transition) transition.cancel();
      transition = null;
      state.from = null;
      state.blend = 1;
    }
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopBootPlay();
    stopAt = null;
    cards.mark(null);
    clock.pause();
    if (transition) {
      transition.cancel();
      transition = null;
    }
  }
  /** Put the place t; the rail follows when it drives t. */
  function setPlace(t) {
    state.t = t;
    if (railVar() === 't') clock.set(t);
    else paint();
  }
  /** The share s inside the beat that is showing. */
  function setShare(s) {
    const { n } = placeAt(state.t, state.mark),
      f = placeOf(s);
    // inside a later beat s = 0 is the start of that beat, not the landing of the one before
    const t = n + Math.max(f, n > 0 ? 1e-9 : 0);
    state.mark = { t, n, f, share: [Math.round(s * 200), 200] };
    setPlace(t);
  }
  kit.field($('sRange'), {
    out: $('sOut'),
    fmt: (v) => rel(grid(v, 200), v),
    onInput: (v) => {
      leave();
      setShare(v);
    }
  });
  // a sampling or span slider shows the step at once
  kit.field($('alphaRange'), {
    out: $('alphaOut'),
    fmt: (v) => alphaRel(v),
    onInput: (v) => {
      leave();
      state.alpha = v;
      if (state.scene !== 'present') setScene('present', 0);
      clock.set(v);
    }
  });
  kit.field($('sigmaRange'), {
    out: $('sigmaOut'),
    fmt: (v) => spanRel(v),
    onInput: (v) => {
      leave();
      state.sigma = v;
      if (state.scene !== 'present') setScene('present', 0);
      paint();
    }
  });
  // the context ratio shows the closure, except on the heartbeat, whose headings it turns
  kit.field($('ctxRange'), {
    out: $('ctxOut'),
    fmt: (v) => spanRel(v),
    onInput: (v) => {
      leave();
      state.tau = v;
      if (state.scene !== 'future' && state.scene !== 'loop') setScene('future', 0);
      paint();
    }
  });
  const anchorChips = kit.chips($('anchorChips'), 'anchor', (v) => {
    leave();
    setShare(Number(v));
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar (narrow pages,
  // where the rail sits below the evidence) both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards ---------- */
  const CARD_OF = Object.fromEntries(Object.entries(presets).map(([id, p]) => [p.scene, id]));
  function applyPreset(id) {
    const p = presets[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    state.sigma = 1;
    state.tau = 0.5;
    // a still, a reader who asked for reduced motion and a freshly opened full page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || !p.play || (booting && !TRV.embed);
    const moving = p.scene === 'present' ? 'alpha' : 't';
    state.alpha = 0.5;
    state.t = p.t;
    state.mark = p.share ? { t: p.t, n: 0, f: p.t, share: p.share } : null;
    if (!parked) state[moving] = 0;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      if (booting) bootAutoplay(p.still);
      else {
        stopAt = p.still;
        clock.play();
      }
    }
    paint();
  }
  /* the notes follow the live frame, as the HUD line does (regimeOf): the marked card and the free-play line are rewritten
     in place when their text changes. A cited figure and a phone carry the short form. */
  const notesObj = Object.fromEntries(Object.keys(presets).map((id) => [id, ['', '']])),
    idlePair = ['', ''];
  const compactNotes = () => TRV.figure || window.innerWidth <= 520;
  function writeNotes(m) {
    const n = noteOf(m),
      pair = compactNotes() ? n.fig : n.long;
    notesObj[CARD_OF[state.scene]] = pair;
    idlePair[0] = '自由探索：' + pair[0];
    idlePair[1] = 'Free play: ' + pair[1];
    return pair;
  }
  writeNotes(calc());
  const cards = kit.cards($('presets'), {
    presets,
    notes: notesObj,
    noteEl: $('presetNote'),
    tour: $('tour'),
    onPick: applyPreset,
    idle: idlePair
  });
  let noteKey = null;
  syncNotes = (m) => {
    const pair = writeNotes(m),
      key = (cards.current || 'idle') + '|' + pair.join('|');
    if (key === noteKey) return;
    noteKey = key;
    cards.mark(cards.current);
  };
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: the sampling point x₁(α) on the Present card, the probe x(s) elsewhere ---------- */
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
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    // the place nearest the pointer; on the heartbeat only near the present place, so the poles do not swap beats
    const span = state.scene === 'loop' ? 0.75 : 1,
      lo = Math.max(0, clock.t - span),
      hi = Math.min(clock.max, clock.t + span);
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= 1200; k++) {
      const v = lerp(lo, hi, k / 1200),
        p = sc.p(handleWorld(v)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(clock.t - v) * 1e-6;
      if (d < gap) {
        gap = d;
        best = v;
      }
    }
    clock.set(snap(best));
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
    const up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? clock.max : clock.t + (up ? 0.01 : -0.01));
  };
  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Only the frame and the sizes of the samples are given here: the steps, the records, the heaps, ξ, the lune and the
     tetrahedra are run, and the sentences take their numbers from the results. */
  const FRAME = { sigma: 1, tau: 0.5 };
  const PLACES = 40; // the beat is sampled at s = k/PLACES
  const ALPHAS = 200; // the samplings are α = k/ALPHAS
  const DOTTIE_STEPS = 200;
  function benchmarks() {
    const runs = sample(PLACES, (s) => {
      const m = compute(placeOf(s), 0.5, FRAME.sigma, FRAME.tau);
      return { m, I: instances(m) };
    });
    const worst = (f) => Math.max(...runs.map(({ m, I }) => Math.abs(f(I, m)))),
      total = (f) => runs.reduce((acc, { I }) => acc + f(I), 0);
    const { m, I } = runs[0],
      stations = [m.x0, m.xHalf, m.land].map((x) => dot(sub(x, m.x0), sub(x, m.x0))),
      steps = sample(ALPHAS, (a) => stepOf(a, FRAME.sigma)),
      still = sample(ALPHAS, (a) => a).filter((a) => stepQ(a, FRAME.sigma).drift[0] === 0n);
    // the midpoint step lands on (4 − σ²)/(4 + σ²) + 4σ/(4 + σ²) j
    const g = grid(FRAME.sigma, 20),
      g2 = times(g, g),
      four = whole(4);
    const beats = sample(BEATS, (u) => compute(BEATS * u, 0.5, FRAME.sigma, FRAME.tau));
    let dottie = 1;
    for (let k = 0; k < DOTTIE_STEPS; k++) dottie = cs(dottie);
    return {
      m,
      I,
      runs,
      stations,
      landing: [quo(minus(four, g2), plus(four, g2)), quo(times(four, g), plus(four, g2))],
      still,
      dottie,
      ends: [0, PLACES / 2, PLACES].map((k) => runs[k].m),
      drift: {
        frozen: worst((J) => J.model.frozen),
        chord: worst((J) => J.chord),
        law: Math.max(...steps.map((s) => Math.abs(s.drift - s.law))),
        tangency: Math.max(...still.map((a) => Math.abs(stepOf(a, FRAME.sigma).tangency))),
        pinch: worst((J) => J.pinch.gap),
        sum: worst((J) => J.weights.sum - 1),
        weights: worst((J) => J.weights.gap),
        unread: worst((J) => J.weights.unread),
        halfA: I.balanced.halfA,
        halfB: I.balanced.halfB,
        unitary: I.balanced.unitary,
        skew: I.balanced.skew,
        chebyshev: worst((J) => J.chebyshev.gap),
        ray: worst((J) => J.ray.gap),
        lift: I.lift.gap,
        xi: I.xi.gap,
        mirror: worst((J) => J.xi.mirror),
        refr: m.refr.norm2 - 1,
        tree: I.tree.gap,
        tetra: worst((J) => J.tetra.worst),
        alternating: worst((J) => J.tetra.alternating),
        landing: Math.max(...beats.map((b) => norm(add(b.land, b.x0)))),
        back: norm(sub(beats[BEATS].probe, beats[0].probe))
      },
      tetra: { quadruples: I.tetra.quadruples, triples: I.tetra.quadruples / 4, defects: total((J) => J.tetra.defects), edgeErrors: total((J) => J.tetra.edgeErrors) }
    };
  }
  const BENCH = benchmarks();
  const landingText = () => `${fstr(BENCH.landing[0])} + (${fstr(BENCH.landing[1])})j`;
  /** The numbers of the drawer and of the MODEL box, by the data-bench of the spans that show them. */
  const NUMBERS = {
    kappa0: () => kRel(BENCH.m),
    landing: landingText,
    ito: () => normRel(BENCH.m.steps.ito, FRAME.sigma),
    back: () => normRel(BENCH.m.steps.back, FRAME.sigma),
    refr: () => refrRel(BENCH.m),
    dF: () => below(Math.abs(BENCH.drift.alternating)) + (BENCH.drift.alternating ? '°' : ''),
    dottie: () => rel(null, BENCH.dottie)
  };
  /** The text of the NUM box. */
  function numText(say) {
    const { m, I, runs, stations, still, ends, drift: d, tetra } = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      gap = (x) => say('的浮点偏差 ', 'drift ') + below(Math.abs(x)),
      sigma = fstr(grid(FRAME.sigma, 20)),
      tau = fstr(grid(FRAME.tau, 20)),
      half = fstr(HALF_Q),
      norms = list(['ito', 'mid', 'back'].map((k) => normRel(m.steps[k], FRAME.sigma))),
      chords = list(stations.map((x) => fstr(ratio(x)))),
      shares = list(stations.map((x) => fstr(quo(ratio(x), whole(4))))),
      stills = list(still.map((a) => fstr(grid(a, 200)))),
      rays = list(ends.map(squareRel)),
      rough = list(ROUGH.map((a) => fstr(ratio(a)))),
      sums = list(I.sagitta.map((x) => rel(null, x))),
      million = powerName(ROUGH_N),
      tol = powerName(TETRA_TOL);
    return say(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提。模型：一拍取 s = k/${PLACES}（k = 0 … ${PLACES}）共 ${runs.length} 点，[x₀, x₀, x₀] 与 x₀ ${gap(d.frozen)}，κ 与 1 − 弦长²/4 ${gap(d.chord)}；x₀、x<sub>1/2</sub>、−x₀ 到 x₀ 的弦长² 是 ${chords}，s = 1 − κ 是 ${shares}。取样：σ = ${sigma} 时 α = 0、1/2、1 的 ‖x₁‖² 依次 ${norms}，α = 1/2 落在 ${landingText()}；α = k/${ALPHAS}（k = 0 … ${ALPHAS}）的漂移 ‖x₁‖² − 1 与 (1 − 2α)‖Δx‖² ${gap(d.law)}，用分数算漂移恰为 0 的有 ${still.length} 个（α = ${stills}），那里 ⟨x₁ − x₀, x₀ + x₁⟩ 与 0 ${gap(d.tangency)}。记录：ρ = ψψ† 取一拍各点的旋量 ψ，在二阶标准基上捏合一次与两次${gap(d.pinch)}，两个记录权重之和与 1 ${gap(d.sum)}，迹与模方两种算法${gap(d.weights)}，未读态与条件态的混合${gap(d.unread)}；V = ℝ⁴、C = ⟨x₀, ·⟩ 的可观测克雷洛夫维数，T = 1 时是 ${I.krylov.frozen.join(', ')}，T = 左乘 j 时是 ${I.krylov.half.join(', ')}。两个 1/2：A = 1/√2、B = j/√2 的二阶矩阵，A A† 与 (1/2)·1 ${gap(d.halfA)}，B B† 与 (1/2)·1 ${gap(d.halfB)}，S S† 与 1 ${gap(d.unitary)}，(A B†)† 与 −(A B†) ${gap(d.skew)}；κ₁ = ${half} 时 κ₂ = (2κ₁ − 1)² ${rel(whole(0), m.doubledHalf)}；从 x₀ 与 x(s) 起的堆序列（n = 0 … 6）与 U<sub>n</sub>、T<sub>n</sub> 公式${gap(d.chebyshev)}；rayKernel 与旋量内积的模方${gap(d.ray)}，s = ${shares} 处 (1 − 2s)² 依次 ${rays}；x(t) = cos πt + j sin πt 的平方与整圈路径（${I.lift.samples} 个采样点）${gap(d.lift)}，x(1) 的实部 ${rel(ratio(I.lift.end), I.lift.end)}。粗糙度与中线：σ = T = 1、N = ${million} 时 a = ${rough} 的累计正矢依次 ${sums}；s = 1/2 + ${LINE_AT}i 处 |(s − 1)/s| ${idRel(1, I.cayley.line)}。ξ：ξ(0) ${rel(ratio(I.xi.at0), I.xi.at0)}，ξ(1) ${rel(ratio(I.xi.at1), I.xi.at1)}，ξ(1/2) ${rel(null, I.xi.half)}，去极点的 θ 积分与 π<sup>−s/2</sup>Γ(s/2)ζ(s) 两种算法在 s = 1/5、1/2、4/5 处${gap(d.xi)}，一拍各点 ξ(1 − s) 与 ξ(s) ${gap(d.mirror)}。未来：τ = ${tau} 时 θ<sub>ctx</sub> ${thetaRel(m)}，月牙面积 2θ<sub>ctx</sub> ${luneRel(m)}，每拍航向转 ${turnRel(m)}，‖Ω₂‖ = (π/2)²θ<sub>ctx</sub> ${rel(null, m.refr.phi)} rad，即 ${refrRel(m)}，κ(x₀, x₁) ${kRefRel(m)}，‖x₁‖² 与 1 ${gap(d.refr)}；开链 ${I.tree.vertices} 个顶点、${I.tree.edges} 条边、${I.tree.loops} 个环路，规范后的边与 1 ${gap(d.tree)}。四面体：一拍 ${runs.length} 点，每点 ${tetra.quadruples} 个有序四元组（每个锚点 ${tetra.triples} 个三元组），上边缘按 ${tol} 度计数的缺陷共 ${tetra.defects} 个，最大的浮点余量 ${below(d.tetra)} 度，锚在 V₀ 的边上链复原失败 ${tetra.edgeErrors} 处。心跳：四拍的落点与 −x₀ ${gap(d.landing)}，四拍后与 x₀ ${gap(d.back)}。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it does not check their hypotheses; every drift is a floating-point one. Model: over the ${runs.length} places s = k/${PLACES} (k = 0 … ${PLACES}) of the beat, [x₀, x₀, x₀] vs x₀, ${gap(d.frozen)}; κ vs 1 − chord²/4, ${gap(d.chord)}; the squared chords to x₀, x<sub>1/2</sub>, −x₀ are ${chords}, and s = 1 − κ is ${shares}. Sampling: at σ = ${sigma} and α = 0, 1/2, 1, ‖x₁‖² is in turn ${norms}; α = 1/2 lands on ${landingText()}; over α = k/${ALPHAS} (k = 0 … ${ALPHAS}), ‖x₁‖² − 1 vs (1 − 2α)‖Δx‖², ${gap(d.law)}; in fractions ‖x₁‖² − 1 is exactly 0 for ${still.length} of them (α = ${stills}), where ⟨x₁ − x₀, x₀ + x₁⟩ vs 0, ${gap(d.tangency)}. Records, ρ = ψψ† over the beat in the standard basis: pinching once and twice, ${gap(d.pinch)}; the sum of the two weights vs 1, ${gap(d.sum)}; trace vs squared modulus, ${gap(d.weights)}; the unread state vs the mixture, ${gap(d.unread)}; the observable Krylov dimensions (V = ℝ⁴, C = ⟨x₀, ·⟩) are ${I.krylov.frozen.join(', ')} with T = 1 and ${I.krylov.half.join(', ')} with T = left multiplication by j. Halves, A = 1/√2 and B = j/√2: A A† vs (1/2)·1, ${gap(d.halfA)}; B B† likewise, ${gap(d.halfB)}; S S† vs 1, ${gap(d.unitary)}; (A B†)† vs −(A B†), ${gap(d.skew)}; κ₁ = ${half} gives κ₂ = (2κ₁ − 1)² ${rel(whole(0), m.doubledHalf)}; heap sequences from x₀, x(s) (n = 0 … 6) vs U<sub>n</sub> and T<sub>n</sub>, ${gap(d.chebyshev)}; rayKernel vs the squared spinor product, ${gap(d.ray)}, and at s = ${shares}, (1 − 2s)² is in turn ${rays}; the square of x(t) = cos πt + j sin πt vs the full turn (${I.lift.samples} samples), ${gap(d.lift)}, and the real part of x(1) is ${rel(ratio(I.lift.end), I.lift.end)}. Roughness and midline: at σ = T = 1 and N = ${million} the accumulated versines for a = ${rough} are in turn ${sums}; at s = 1/2 + ${LINE_AT}i, |(s − 1)/s| ${idRel(1, I.cayley.line)}. ξ(0) ${rel(ratio(I.xi.at0), I.xi.at0)}, ξ(1) ${rel(ratio(I.xi.at1), I.xi.at1)}, ξ(1/2) ${rel(null, I.xi.half)}; the theta integral vs π<sup>−s/2</sup>Γ(s/2)ζ(s) at s = 1/5, 1/2, 4/5, ${gap(d.xi)}; ξ(1 − s) vs ξ(s) over the beat, ${gap(d.mirror)}. Future: at τ = ${tau}, θ<sub>ctx</sub> ${thetaRel(m)}, the lune has area 2θ<sub>ctx</sub> ${luneRel(m)}, the heading turns by ${turnRel(m)} per beat, ‖Ω₂‖ = (π/2)²θ<sub>ctx</sub> ${rel(null, m.refr.phi)} rad, that is ${refrRel(m)}, κ(x₀, x₁) ${kRefRel(m)}; ‖x₁‖² vs 1, ${gap(d.refr)}; the open chain has ${I.tree.vertices} vertices, ${I.tree.edges} edges and ${I.tree.loops} loops; its gauged edges vs 1, ${gap(d.tree)}. Tetrahedron: ${runs.length} places with ${tetra.quadruples} ordered quadruples each (${tetra.triples} triples per anchor), ${tetra.defects} defects counted to ${tol} degrees, the largest residue ${below(d.tetra)} degrees, ${tetra.edgeErrors} failures of the edge cochain anchored at V₀. Heartbeat: the four landings vs −x₀, ${gap(d.landing)}; after four beats vs x₀, ${gap(d.back)}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ])
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
  for (const el of document.querySelectorAll('[data-bench]')) el.innerHTML = NUMBERS[el.dataset.bench]();
  // the drawer repeats every evidence box of the panel, filled
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  window.CAUSAL_TRIAD_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return JSON.parse(
        JSON.stringify({
          ...m,
          scene: state.scene,
          regime: regimeOf(m),
          lens: state.lens,
          cam: state.cam,
          layers: layers(),
          rail: railVar(),
          clock: clock.t,
          max: clock.max,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          leanInstances: instances(m)
        })
      );
    },
    /** The mathematics at (t, α, σ, τ), without touching the page. */
    calc: (t, alpha = 0.5, sigma = 1, tau = 0.5) => {
      const m = compute(t, alpha, sigma, tau);
      return JSON.parse(JSON.stringify({ ...m, leanInstances: instances(m) }));
    },
    presets: JSON.parse(JSON.stringify(presets)),
    /** What the NUM box and the drawer are written from. */
    bench: () => JSON.parse(JSON.stringify({ drift: BENCH.drift, tetra: BENCH.tetra, still: BENCH.still, dottie: BENCH.dottie, frame: FRAME, places: PLACES, alphas: ALPHAS })),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), below, sci },
    xi: (s) => ({ theta: xiTheta(s), product: s > 0 && s < 1 ? xiProduct(s) : null }),
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of a world point of the stage. */
    project: (p) => {
      const q = sc.p(p),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1] };
    }
  });
  window.TRV_THUMB = () => {
    cards.pick(DEFAULT);
    clock.pause();
    clock.set(presets[DEFAULT].still);
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
