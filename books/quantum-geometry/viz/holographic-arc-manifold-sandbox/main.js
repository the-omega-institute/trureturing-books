/* OMEGA//MANIFOLD · 全息圆弧流形 M_Ω · The holographic circular-arc manifold (Chapter 31, §31.5)
   World (kit.solid): z up. The stage is the unit sphere of the slice span{1, i, j} of the quaternions, turned so that the
   past pole 1 (x = 0) is at the bottom, the future antipode −1 (x = ∞) at the top and i (x = 1) on the right: the world
   point of a quaternion q is (q_i, q_j, −q_1). The closed meridian is M(φ) = Q(x·i) with x = tan(φ/2), φ ∈ ℝ/2πℤ, so
   κ(1, M) = cos²(φ/2) = 1/(1 + x²). Five scenes share the sphere, one per card:
     scales    N flat tangent plates along the meridian (crease 360°/N at every joint), the rest of the scale armour on
               the left half, and a magenta C^∞ bump; against them the heap x₀, x₁, x₂ = [x₁, x₀, x₁], … that stays on
               one closed great circle and is back after N steps;
     meridian  the closed circle through 0 · 1 · ∞ · −1 and back to 0;
     flows     V₊ = 1 + cos φ, V÷ = 1 − cos φ, V× = sin φ on the circle: the two widths of one ring of constant width
               V₊ + V÷ = 2, and the tangent arrows of V× and of the uniform rotation ½(V₊ + V÷) = 1;
     clock     the finite quarter circle from x = 1 to x = 0, the doublings 1/4 … 8 on it, and the same doublings at equal
               steps ln 2 of the clock τ = ln x on an unwrapped coil;
     prime     closed loops γ_p of circumference ∝ ln p at height ln p of the clock, their m-fold windings as closed cables
               at height m ln p, and the flat blade at height ln X that reads the Chebyshev function ψ(X).
   The rail runs over t ∈ [0, 1] and drives the one quantity of the scene: N = 6 + 30t, φ = 360°·t, log₂ x = 12t − 6,
   X = 1.5 + 14.5t. Every number is computed here; the instances of the cited Lean theorems are in instances(), and the NUM
   box and the numbers of the drawer are computed once, in benchmarks() (none of them is written in the sources).
   A printed number follows “=” only when the decimal is the value itself, as a fraction; every other follows “≈”.
   Read-only probe: window.MANIFOLD_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    LN2 = Math.log(2);
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
  const fmt = (x, d = 4) => kit.fix(x, d);

  /* ---------- exact numbers: fractions [p, q] of integers, q > 0 ----------
     A parameter is the place the reader sets: N is an integer, X a multiple of 1/20, φ a multiple of a quarter degree or the
     angle of x = 2ᴸ with L a multiple of 1/80 (snapPhi, snapX); every other place of the rail stands for itself. Whether a
     printed decimal is the value is decided on fractions, never on rounded doubles. */
  const frac = (p, q = 1) => {
    const [P0, Q0] = [BigInt(p), BigInt(q)];
    let [a, b] = [P0 < 0n ? -P0 : P0, Q0];
    while (b) [a, b] = [b, a % b];
    return [P0 / a, Q0 / a];
  };
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const fval = ([p, q]) => Number(p) / Number(q);
  const fstr = ([p, q]) => String(p).replace('-', '−') + (q === 1n ? '' : '/' + q);
  /** The double x itself: an integer over a power of two. */
  const ratio = (x) => {
    let s = 0n;
    for (; !Number.isInteger(x); s++) x *= 2;
    return frac(BigInt(x), 1n << s);
  };
  const pow10 = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  /** A power of ten by its value. */
  const powerName = (x) => `10${superscript(Math.round(Math.log10(x)))}`;
  /** Four significant digits with a power of ten. */
  const sci = (x) => {
    const [m, e] = x.toExponential(3).split('e').map(Number);
    return `${kit.fix(m, 3)}×10${superscript(e)}`;
  };
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
      k = (2n * a + q) / (2n * q),
      t = String(k).padStart(d + 1, '0');
    return { text: (p < 0n && k > 0n ? '−' : '') + t.slice(0, t.length - d) + (d ? '.' + t.slice(t.length - d) : ''), exact: a === k * q };
  }
  /* The relation before a printed number, one rule for the whole page: “=” before digits that are the value itself, “≈”
     before digits that only round it. A value that is not one of the landmarks 0, ±1/2, ±1, 2 never prints as one of them: it
     is written as the landmark ± its distance, so that no reading contradicts the words beside it. A drift of the floating
     point is written as the least power of ten above it. */
  const LANDMARKS = [-1, -0.5, 0, 0.5, 1, 2];
  /** A sign and what it stands before never part at the end of a line. */
  const NB = '\u00a0',
    equals = (t) => `=${NB}${t}`,
    approx = (t) => `≈${NB}${t}`;
  /** q: the value as a fraction, or null when it is irrational; x: the value as computed, a double; off: x − v for the
      landmarks v where the double x has lost it. A fraction counts only while the computed double agrees with it: a page that
      computes something else says what it computes. */
  function rel(q, x, d = 4, off = {}, marks = LANDMARKS) {
    if (q && !(Math.abs(fval(q) - x) <= 1e-9 * Math.max(1, Math.abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return equals(text);
    const v = Number(text.replace('−', '-')),
      gap = v in off ? off[v] : x - v;
    if (marks.includes(v) && gap !== 0) return approx(v === 0 ? sci(gap) : `${fstr(ratio(v))}${NB}${gap < 0 ? '−' : '+'}${NB}${sci(Math.abs(gap))}`);
    // (a value of ten thousand and more: significant digits)
    return approx(Math.abs(x) >= 1e4 ? sci(x) : text);
  }
  /** A value that is a fraction by its name, any other in d decimals. */
  const named = (q, x, d = 4, off, marks) => (q && Math.abs(fval(q) - x) <= 1e-9 * Math.max(1, Math.abs(x)) ? equals(fstr(q)) : rel(null, x, d, off, marks));
  /** An irrational constant. */
  const irr = (x, d = 4) => rel(null, x, d);
  /** An angle in degrees, exact only where it is known as a fraction. */
  const degRel = (q, x, d = 2) => `${rel(q, x, d, {}, [0])}°`;
  /** A quantity that is identically the integer c: its digits, once the value x computed here agrees with it to 10⁻⁹. */
  const idRel = (c, x, d = 4) => (Math.abs(x - c) <= 1e-9 ? rel(frac(c), c, d) : approx(sci(x)));
  /** The least power of ten above a drift x ≥ 0, after its sign; “= 0” of 0 alone. */
  function below(x) {
    if (x === 0) return equals(0);
    const q = ratio(x);
    let e = Math.ceil(Math.log10(x));
    while (cmp(q, pow10(e)) >= 0) e++;
    while (cmp(q, pow10(e - 1)) < 0) e--;
    return `&lt;${NB}10${superscript(e)}`;
  }
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;

  /* ---------- quaternions [w, x, y, z] and the slice span{1, i, j} ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qinv = (a) => scale([a[0], -a[1], -a[2], -a[3]], 1 / dot(a, a));
  /** The heap bracket of the unit-quaternion model, [x, y, z] = x y⁻¹ z. Dividing by ‖y‖² keeps the rounding of a long
      orbit bounded (with the conjugate alone the norm error grows by 1 + √2 per step). */
  const heap = (x, y, z) => qmul(qmul(x, qinv(y)), z);
  const kappa = (x, y) => (1 + dot(x, y)) / 2;
  /** Q(x·i) with x = tan(φ/2), as a quaternion and as a world point (radius r). */
  const qAt = (phi) => [cs(phi), sn(phi), 0, 0];
  const M = (phi, r = 1) => [r * sn(phi), 0, -r * cs(phi)];
  const W = (q) => [q[1], q[2], -q[0]];
  /** The unit tangent of the meridian in the direction of growing φ. */
  const tangent = (phi) => [cs(phi), 0, sn(phi)];

  /* ---------- scales: plates, creases, the heap continuation, the C^∞ bump ---------- */
  const PHI0 = 75 * deg, // x₀ of the small arc
    BUMP = [10 * deg, 65 * deg],
    BUMP_H = 0.2;
  /** exp(8 − 1/u² − 1/(1 − u)²) on (0, 1), 0 outside: C^∞, not analytic at u = 0 and u = 1, equal to 1 at u = 1/2. */
  const bump = (u) => (u <= 0 || u >= 1 ? 0 : Math.exp(8 - 1 / (u * u) - 1 / ((1 - u) * (1 - u))));
  const bumpAt = (phi) => 1 + BUMP_H * bump((phi - BUMP[0]) / (BUMP[1] - BUMP[0]));
  const GAP = 0.14; // the share of each joint left open between neighbouring plates of the meridian
  const plateCache = new Map();
  /** The plates of the armour for N plates along the meridian: rows at angles 360°/N from it, each plate a trapezoid in
      the tangent plane of its centre, cut back so that it stays clear of its neighbour in the row. */
  function plates(N) {
    if (plateCache.has(N)) return plateCache.get(N);
    const d = TAU / N,
      w = (1 - GAP) * Math.tan(d / 2),
      rows = Math.floor((PI / 2 - d / 4) / d + 1e-9),
      out = [];
    for (let k = -rows; k <= rows; k++) {
      const b = k * d,
        n = k === 0 ? N : Math.max(3, Math.round(N * cs(b)));
      for (let j = 0; j < n; j++) {
        const p = PHI0 + (TAU * j) / n,
          nrm = [cs(b) * sn(p), sn(b), -cs(b) * cs(p)],
          e1 = tangent(p),
          e2 = [-sn(b) * sn(p), cs(b), sn(b) * cs(p)],
          p1 = p + TAU / n,
          n1 = [cs(b) * sn(p1), sn(b), -cs(b) * cs(p1)];
        // the tangent plane of the next plate of the row cuts this one at distance cut(t) along e1, at height t along e2:
        // the plate stops short of it, and near the axis of the rows it is also cut in height
        const e1n = dot(e1, n1),
          e2n = dot(e2, n1),
          room = 1 - dot(nrm, n1),
          cut = (t) => ((1 - GAP) * (room - t * e2n)) / e1n;
        const least = 0.015,
          high = (t) => (cut(t) >= least ? t : (room - (least * e1n) / (1 - GAP)) / e2n),
          half = (t) => Math.min(w, cut(t));
        const at = (sx, sy) => {
          const t = high(sy * w);
          return add(nrm, add(scale(e1, sx * half(t)), scale(e2, t)));
        };
        out.push({ n: nrm, row: k, q: [at(-1, -1), at(1, -1), at(1, 1), at(-1, 1)] });
      }
    }
    plateCache.set(N, out);
    return out;
  }

  /* ---------- the three flows on ℝ/2πℤ: f∂_φ with f = 1 + cos φ, 1 − cos φ, sin φ ---------- */
  const FLOW = {
    plus: [(p) => 1 + cs(p), (p) => -sn(p)],
    div: [(p) => 1 - cs(p), (p) => sn(p)],
    mul: [(p) => sn(p), (p) => cs(p)]
  };
  /** The Lie bracket [f∂, g∂] = (f g′ − g f′)∂ at φ. */
  const bracket = (a, b, p) => FLOW[a][0](p) * FLOW[b][1](p) - FLOW[b][0](p) * FLOW[a][1](p);
  const ANGLES = 720;
  let lieCache = null;
  function lie() {
    if (lieCache) return lieCache;
    let r1 = 0,
      r2 = 0,
      r3 = 0,
      mean = 0,
      geo = 0;
    for (let k = 0; k < ANGLES; k++) {
      const p = (TAU * k) / ANGLES,
        f = FLOW.plus[0](p),
        g = FLOW.div[0](p),
        h = FLOW.mul[0](p);
      r1 = Math.max(r1, Math.abs(bracket('plus', 'div', p) - 2 * h));
      r2 = Math.max(r2, Math.abs(bracket('mul', 'plus', p) + f));
      r3 = Math.max(r3, Math.abs(bracket('mul', 'div', p) - g));
      mean = Math.max(mean, Math.abs((f + g) / 2 - 1));
      geo = Math.max(geo, Math.abs(h * h - f * g));
    }
    // ad matrices in the basis (V×, V₊, V÷) of the brackets, and the Killing form K(a, b) = tr(ad a · ad b)
    const ad = {
      mul: [[0, 0, 0], [0, -1, 0], [0, 0, 1]],
      plus: [[0, 0, 2], [1, 0, 0], [0, 0, 0]],
      div: [[0, -2, 0], [0, 0, 0], [-1, 0, 0]]
    };
    const K = (a, b) => a.reduce((s, row, i) => s + row.reduce((u, x, j) => u + x * b[j][i], 0), 0);
    const comb = (a, b, t) => a.map((row, i) => row.map((x, j) => x + t * b[i][j]));
    const rot = comb(ad.plus, ad.div, 1),
      diff = comb(ad.plus, ad.div, -1);
    lieCache = { r1, r2, r3, mean, geo, killing: { rotation: K(rot, rot), difference: K(diff, diff), mul: K(ad.mul, ad.mul) } };
    return lieCache;
  }

  /* ---------- the doublings 1/4 … 8 ---------- */
  const LX = 6; // the rail of the clock scene runs over log₂ x ∈ [−6, 6]
  const DYADIC = [-2, -1, 0, 1, 2, 3].map((k) => ({ k, x: 2 ** k, label: k < 0 ? `1/${2 ** -k}` : String(2 ** k), phi: 2 * Math.atan(2 ** k), kappa: 1 / (1 + 4 ** k), tau: k * LN2 }));
  /** κ(Q(2ᵏ i), Q(2ᵏ⁺¹ i)) = (1 + 2²ᵏ⁺¹)²/((1 + 4ᵏ)(1 + 4ᵏ⁺¹)) as an exact fraction (symmetric under k ↦ −k − 1). */
  const stepFrac = (k) => {
    const j = k < 0 ? -k - 1 : k;
    return frac((1 + 2 ** (2 * j + 1)) ** 2, (1 + 4 ** j) * (1 + 4 ** (j + 1)));
  };
  const STEPS = [-2, -1, 0, 1, 2].map((k) => ({ k, q: stepFrac(k).map(Number), kappa: kappa(qAt(2 * Math.atan(2 ** k)), qAt(2 * Math.atan(2 ** (k + 1)))), dtau: Math.log(2 ** (k + 1)) - Math.log(2 ** k), delta: (2 ** (k + 1) - 2 ** k) / 2 ** (k + 1) }));
  const DELTA = frac(1, 2), // the relative increment δ = (2x − x)/(2x) of a doubling
    CAYLEY = frac(DELTA[1] ** 2n, DELTA[0] ** 2n + DELTA[1] ** 2n), // 1/(1 + δ²)
    CAYLEY_READ = kappa([1, 0, 0, 0], qAt(2 * Math.atan(fval(DELTA)))), // κ(1, Q(δ·i)) as computed
    cayleyRel = () => [...new Set([named(CAYLEY, CAYLEY_READ), rel(CAYLEY, CAYLEY_READ)])].join(' ');
  /** A fraction by its name alone, while the computed double agrees with it. */
  const nameOf = (q, x) => named(q, x).replace(`=${NB}`, '');
  const stepName = (t) => nameOf(frac(...t.q), t.kappa);

  /* ---------- prime powers up to 16, the Chebyshev function ψ, and the loops ---------- */
  const gcd = (a, b) => (b ? gcd(b, a % b) : a),
    lcmTo = (n) => Array.from({ length: n }, (_, k) => k + 1).reduce((l, k) => (l / gcd(l, k)) * k, 1);
  const isPrime = (n) => {
    if (n < 2) return false;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
    return true;
  };
  const XMAX = 16,
    XMIN = 1.5;
  const POWERS = [];
  for (let p = 2; p <= XMAX; p++) if (isPrime(p)) for (let m = 1, n = p; n <= XMAX; m++, n *= p) POWERS.push({ n, p, m, ln: Math.log(p) });
  POWERS.sort((a, b) => a.n - b.n);
  const psi = (X) => POWERS.reduce((s, w) => s + (w.n <= X ? w.ln : 0), 0);
  /** The multiple of 1/20 within 10⁻⁹ of X, else X itself. */
  const snapX = (X) => {
    const k = Math.round(X * 20);
    return Math.abs(X - k / 20) < 1e-9 ? k / 20 : X;
  };
  /** The quarter degree within 10⁻⁹ of φ, else the angle of x = 2ᴸ with L a multiple of 1/80 within 10⁻⁹, else φ itself. */
  const snapPhi = (p) => {
    const k = Math.round((p / TAU) * 1440);
    if (Math.abs(p - (k / 1440) * TAU) < 1e-9) return (k / 1440) * TAU;
    if (p <= 0 || p >= PI) return p;
    const l = Math.log2(Math.tan(p / 2)),
      j = Math.round(l * 80);
    return Math.abs(l - j / 80) < 1e-9 ? 2 * Math.atan(2 ** (j / 80)) : p;
  };
  const SNAP = { N: (N) => N, phi: snapPhi, X: snapX };
  const zOf = (tau) => -0.92 + 0.6 * tau, // the height of the clock value τ on the stage
    RING = 0.28, // the radius of γ_p is RING·ln p: its circumference over 2π·RING is ln p
    CABLE = 0.034; // the cable radius of an m-fold winding
  /** The closed loop of the m-fold winding of γ_p at clock height m ln p: a trigonometric polynomial in u, so C^ω. */
  function loopPoints(p, m, n = 72) {
    const r = RING * Math.log(p),
      z = zOf(m * Math.log(p));
    if (m === 1) return sample(n, (t) => [r * cs(TAU * t), r * sn(TAU * t), z]);
    return sample(n * m, (t) => {
      const u = TAU * m * t,
        v = TAU * t;
      return [(r + CABLE * cs(v)) * cs(u), (r + CABLE * cs(v)) * sn(u), z + CABLE * sn(v)];
    });
  }

  /* ---------- the state, the scenes and the clock map ---------- */
  const SCENES = ['scales', 'meridian', 'flows', 'clock', 'prime'];
  const turn = { get: (t) => snapPhi(TAU * t), t: (p) => p / TAU, step: 1 / 360 };
  const MAP = {
    scales: { get: (t) => 6 + Math.round(30 * t), t: (N) => (N - 6) / 30, step: 1 / 30, rate: 1 / 8 },
    meridian: { ...turn, rate: 0.16 },
    flows: { ...turn, rate: 0.085 },
    clock: { get: (t) => snapPhi(2 * Math.atan(2 ** (2 * LX * t - LX))), t: (p) => (clamp(Math.log2(Math.max(1e-300, Math.tan(p / 2))), -LX, LX) + LX) / (2 * LX), step: 1 / 48, rate: 1 / 6 },
    prime: { get: (t) => snapX(XMIN + (XMAX - XMIN) * t), t: (X) => (X - XMIN) / (XMAX - XMIN), step: 1 / 145, rate: 0.11 }
  };
  const PARAM = { scales: 'N', meridian: 'phi', flows: 'phi', clock: 'phi', prime: 'X' };
  const state = { scene: 'scales', N: 18, phi: PI / 2, X: 7, bump: true, lens: 0, from: null, blend: 1 };

  const SECANT = 1e-4, // the step of the one-sided secants
    CHORDS = 3600;
  /** The closed circle itself: how far the two one-sided unit secants differ at 0 and at ∞, and the sum of the chords. */
  const CIRCLE = (() => {
    const jump = (p) => norm(sub(unit(sub(M(p + SECANT), M(p))), unit(sub(M(p), M(p - SECANT)))));
    let length = 0;
    for (let k = 0; k < CHORDS; k++) length += norm(sub(M((TAU * (k + 1)) / CHORDS), M((TAU * k) / CHORDS)));
    return { jump0: jump(0), jumpInf: jump(PI), length };
  })();
  const HALVES = Array.from({ length: 4 * LX + 1 }, (_, i) => i - 2 * LX);
  /** The place φ of the meridian as fractions, null where a value is irrational. At a quarter degree of φ the cosine and the sine
      are rational at the multiples of 60° and 90°, at those of 90° and at 30°, 150°, 210°, 330° only (Niven), and x at 0, ±1 and ∞;
      at x = 2^(h/2), κ = 1/(1 + 2ʰ), and x and V× are rational when h is even. */
  function exactOf(phi) {
    const k = Math.round((phi / TAU) * 1440);
    if (phi === (k / 1440) * TAU) {
      const c = k % 240 === 0 ? [2, 1, -1, -2, -1, 1][(k / 240) % 6] : k % 360 === 0 ? 0 : null,
        s = k % 360 === 0 ? [0, 2, 0, -2][(k / 360) % 4] : { 120: 1, 600: 1, 840: -1, 1320: -1 }[k] || null,
        half = (n, d) => (n == null ? null : frac(n, d));
      return {
        deg: frac(k, 4),
        x: k % 360 === 0 && k !== 720 ? frac([0, 1, 0, -1][(k / 360) % 4]) : null,
        kappa: half(c == null ? null : 2 + c, 4),
        plus: half(c == null ? null : 2 + c, 2),
        div: half(c == null ? null : 2 - c, 2),
        cos: half(c, 2),
        mul: half(s, 2)
      };
    }
    const h = HALVES.find((n) => phi === 2 * Math.atan(2 ** (n / 2)));
    if (h == null) return { deg: null, x: null, kappa: null, plus: null, div: null, cos: null, mul: null };
    // 2ʰ and, for even h, 2^(h/2) as fractions [num, den]
    const pow = (n) => (n < 0 ? [1, 2 ** -n] : [2 ** n, 1]),
      [p, q] = pow(h),
      [a, b] = pow(h / 2),
      even = h % 2 === 0;
    return {
      deg: null,
      x: even ? frac(a, b) : null,
      kappa: frac(q, p + q),
      plus: frac(2 * q, p + q),
      div: frac(2 * p, p + q),
      cos: frac(q - p, p + q),
      mul: even ? frac(2 * a * b, a * a + b * b) : null
    };
  }
  function compute(st = state) {
    const N = st.N,
      d = TAU / N,
      phi = st.phi,
      X = st.X;
    // the heap from x₀ and x₁ = x₀ turned by 360°/N: N products, back on x₀
    const xs = [qAt(PHI0), qAt(PHI0 + d)];
    while (xs.length <= N) xs.push(heap(xs[xs.length - 1], xs[xs.length - 2], xs[xs.length - 1]));
    const crease = Math.acos(clamp(dot(xs[0], xs[1]), -1, 1));
    let sum = 0;
    for (let n = 0; n < N; n++) sum += Math.acos(clamp(dot(xs[n], xs[n + 1]), -1, 1));
    const all = plates(N);
    // the meridian: with the half angle, so that nothing is lost near the poles
    const ch = cs(phi / 2),
      sh = sn(phi / 2);
    const atZero = phi === 0 || phi === TAU,
      atInf = phi === PI;
    const x = atInf ? Infinity : atZero ? 0 : Math.tan(phi / 2),
      tau = atInf ? Infinity : atZero ? -Infinity : Math.log(Math.abs(x)),
      plus = atInf ? 0 : 2 * ch * ch,
      div = atZero ? 0 : 2 * sh * sh;
    // the blade
    const hit = POWERS.find((w) => w.n === X) || null,
      next = POWERS.find((w) => w.n > X) || null,
      counted = POWERS.filter((w) => w.n <= X);
    return {
      scene: st.scene,
      N,
      phi,
      phiDeg: phi / deg,
      X,
      bump: st.bump,
      scales: { crease: crease / deg, sum: sum / deg, kappa: kappa(xs[0], xs[1]), closure: norm(sub(xs[N], xs[0])), xs, corner: 1 / cs(PI / N) - 1, total: all.length, gap: GAP, bumpHalf: bump(0.5), bumpTenth: bump(0.1) },
      mer: { x, kappa: atInf ? 0 : atZero ? 1 : ch * ch, tau, atZero, atInf, plus, div, cos: atZero ? 1 : atInf ? -1 : cs(phi), mul: atInf || atZero ? 0 : sn(phi), ...CIRCLE },
      prime: { tau: Math.log(X), psi: psi(X), jump: hit ? hit.ln : 0, hit, next, count: counted.length, counted: counted.map((w) => w.n) }
    };
  }

  /* ---------- the instances of the cited Lean theorems, computed here ---------- */
  function chebT(n, c) {
    let a = 1,
      b = c;
    if (n === 0) return 1;
    for (let k = 1; k < n; k++) [a, b] = [b, 2 * c * b - a];
    return b;
  }
  function chebU(n, c) {
    if (n < 0) return 0;
    let a = 1,
      b = 2 * c;
    if (n === 0) return 1;
    for (let k = 1; k < n; k++) [a, b] = [b, 2 * c * b - a];
    return b;
  }
  /** A fixed list of unit quaternions (a linear congruential sequence, the same on every page load). */
  const UNITS = (() => {
    let s = 11;
    const r = () => ((s = (s * 48271) % 2147483647) / 2147483647) * 2 - 1;
    return Array.from({ length: 48 }, () => unit([r(), r(), r(), r()]));
  })();
  // the sizes of the samples: base points, points of the meridian, levels of the threads and of the lifts, cuts of the sums
  const BASES = 16,
    POINTS = 72,
    THREAD = 12,
    LIFT = 24,
    CUT = 1000,
    HEIGHT = 16,
    REACH = 400,
    DEPTH = 3,
    EXPONENT = 6,
    NAMED = [2, 3, 5, 7]; // the four named loops
  const val = (p, n) => {
    if (n === 0) return Infinity;
    let k = 0;
    n = Math.abs(n);
    while (n % p === 0) {
      n /= p;
      k++;
    }
    return k;
  };
  let arithCache = null;
  /** The arithmetic instances do not depend on the frame: they are computed once. */
  function arith() {
    if (arithCache) return arithCache;
    const ps = NAMED,
      primes = [];
    for (let n = 2; n <= CUT; n++) if (isPrime(n)) primes.push(n);
    // Ostrowski: the five drawn absolute values are pairwise inequivalent (|p|_p < 1 = |p|_q, |p|_∞ > 1)
    let pairs = 0,
      apart = 0;
    const abs = (v, n) => (v === 0 ? n : v ** -val(v, n));
    const places = [0, ...ps];
    for (let i = 0; i < places.length; i++)
      for (let j = i + 1; j < places.length; j++) {
        pairs++;
        const p = places[j];
        if (abs(p, p) < 1 && abs(places[i], p) >= 1) apart++;
      }
    // product formula on the fractions a/b, 1 ≤ a, b ≤ HEIGHT, in integers: |x| · ∏ p^(−v_p(x)) = 1
    let product = 0,
      fractions = 0;
    for (let a = 1; a <= HEIGHT; a++)
      for (let b = 1; b <= HEIGHT; b++) {
        let num = a,
          den = b;
        for (const p of primes.filter((q) => q <= HEIGHT)) {
          const v = val(p, a) - val(p, b);
          if (v > 0) den *= p ** v;
          else num *= p ** -v;
        }
        fractions++;
        if (num !== den) product++;
      }
    // congruence fibres: y ≡ 1 mod pᵏ ⇔ |1 − y|_p ≤ p⁻ᵏ, k = 0 … DEPTH, |y| ≤ REACH
    let fibre = 0,
      fibreTests = 0;
    for (const p of ps)
      for (let k = 0; k <= DEPTH; k++)
        for (let y = -REACH; y <= REACH; y++) {
          const congruent = (((y - 1) % p ** k) + p ** k) % p ** k === 0,
            ball = (y === 1 ? 0 : abs(p, 1 - y)) <= p ** -k;
          fibreTests++;
          if (congruent !== ball) fibre++;
        }
    // Euler: s = 2, cut at CUT
    let series = 0,
      euler = 1;
    for (let n = 1; n <= CUT; n++) series += 1 / (n * n);
    for (const p of primes) euler *= 1 / (1 - 1 / (p * p));
    // ln 2, ln 3, ln 5, ln 7: no nonzero integer vector with entries up to EXPONENT gives 2ᵃ3ᵇ5ᶜ7ᵈ = 1 (exact integers);
    // the closest pair up/down by its ratio
    let relations = 0,
      vectors = 0,
      closest = [Infinity, 0, 0];
    for (let a = -EXPONENT; a <= EXPONENT; a++)
      for (let b = -EXPONENT; b <= EXPONENT; b++)
        for (let c = -EXPONENT; c <= EXPONENT; c++)
          for (let e = -EXPONENT; e <= EXPONENT; e++) {
            if (!a && !b && !c && !e) continue;
            vectors++;
            let up = 1,
              down = 1;
            [a, b, c, e].forEach((k, i) => {
              if (k > 0) up *= ps[i] ** k;
              else down *= ps[i] ** -k;
            });
            if (up === down) relations++;
            else if (up > down && up / down < closest[0]) closest = [up / down, up, down];
          }
    // Weyl: averages of characters along g, g², …, gᴺ with g = (e^{2πi ln p}), N = CUT
    const CH = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [1, 1, 0, 0], [1, -1, 1, 0], [0, 1, 0, -1]];
    const averages = CH.map((k) => {
      const w = TAU * k.reduce((s, e, i) => s + e * Math.log(ps[i]), 0);
      let re = 0,
        im = 0;
      for (let n = 1; n <= CUT; n++) {
        re += cs(w * n);
        im += sn(w * n);
      }
      return hypot(re, im) / CUT;
    });
    arithCache = { pairs, apart, product, fractions, fibre, fibreTests, series, euler, zeta2: PI ** 2 / 6, relations, vectors, closest: closest.slice(1), characters: CH.length, weyl: Math.max(...averages) };
    return arithCache;
  }
  const circ = (x) => {
    const r = x - Math.floor(x);
    return Math.min(r, 1 - r);
  };
  function instances(m) {
    const xs = m.scales.xs,
      c = dot(xs[0], xs[1]);
    // exists_unitQuaternion_equiv: o = Q(φ), u(x) = o⁻¹x: u(o) = 1 and the bracket and κ are kept
    const o = qAt(m.phi),
      u = (q) => qmul(qinv(o), q);
    let equiv = norm(sub(u(o), [1, 0, 0, 0]));
    for (let k = 0; k + 2 < UNITS.length; k++) {
      const [a, b, d] = [UNITS[k], UNITS[k + 1], UNITS[k + 2]];
      equiv = Math.max(equiv, norm(sub(u(heap(a, b, d)), heap(u(a), u(b), u(d)))), Math.abs(kappa(a, b) - kappa(u(a), u(b))));
    }
    // kappa_eq_one_sub_dist_sq along the meridian from 1 and from the probe
    let dist = 0;
    for (let k = 0; k < POINTS; k++) for (const base of [[1, 0, 0, 0], o]) {
      const q = qAt((TAU * k) / POINTS),
        e = sub(q, base);
      dist = Math.max(dist, Math.abs(kappa(base, q) - (1 - dot(e, e) / 4)));
    }
    // tri_eq_mul_inv_mul: x₁ ⋆ₒ x₀⁻¹ ⋆ₒ x₁ at BASES base points o
    let tri = 0;
    for (const b of UNITS.slice(0, BASES)) {
      const star = (p, q) => qmul(qmul(p, qinv(b)), q),
        inv = (p) => qmul(qmul(b, qinv(p)), b);
      tri = Math.max(tri, norm(sub(star(star(xs[1], inv(xs[0])), xs[1]), heap(xs[1], xs[0], xs[1]))));
    }
    // normSq_and_chebyshev on x₀ … x_N
    let cheb = 0;
    for (let n = 0; n <= m.N; n++) {
      cheb = Math.max(cheb, Math.abs(dot(xs[n], xs[n]) - 1), Math.abs(dot(xs[0], xs[n]) - chebT(n, c)));
      if (n < m.N) cheb = Math.max(cheb, norm(sub(xs[n + 1], sub(scale(xs[1], chebU(n, c)), scale(xs[0], chebU(n - 1, c))))));
    }
    // exists_basis_bracket_eq_smul_cross on the pure quaternions: [a, b] = ab − ba = 2 a × b, the dot product is invariant
    let basisGap = 0,
      invariant = 0;
    const pure = UNITS.map((q) => [0, q[1], q[2], q[3]]),
      br = (a, b) => sub(qmul(a, b), qmul(b, a));
    for (let k = 0; k + 2 < pure.length; k++) {
      const [a, b, d] = [pure[k], pure[k + 1], pure[k + 2]];
      basisGap = Math.max(basisGap, norm(sub(br(a, b), [0, ...scale(cross(a.slice(1), b.slice(1)), 2)])));
      invariant = Math.max(invariant, Math.abs(dot(br(a, b), d) + dot(b, br(a, d))));
    }
    // crossProduct_is_skewAdjoint_of_balanced_sum: A = 1/√2, B = n/√2 with n = cos φ i + sin φ j as 2 × 2 complex
    // matrices; in quaternions the adjoint is the conjugate, S = A + B
    const n = [0, cs(m.phi), sn(m.phi), 0],
      A = scale([1, 0, 0, 0], Math.SQRT1_2),
      B = scale(n, Math.SQRT1_2),
      conj = (q) => [q[0], -q[1], -q[2], -q[3]],
      S = add(A, B),
      X = qmul(A, conj(B));
    const skew = { unitary: norm(sub(qmul(S, conj(S)), [1, 0, 0, 0])), halves: Math.max(norm(sub(qmul(A, conj(A)), [0.5, 0, 0, 0])), norm(sub(qmul(B, conj(B)), [0.5, 0, 0, 0]))), skew: norm(add(conj(X), X)), cross: norm(X) };
    // power threads z_m = exp((q + iφ)/m): z_{mn}ⁿ = z_m, m·ln‖z_m‖ = q; q = 0 ⇔ every ‖z_m‖ = 1
    const thread = (q, k) => [Math.exp(q / k) * cs(m.phi / k), Math.exp(q / k) * sn(m.phi / k)];
    const cpow = ([a, b], e) => {
      let re = 1,
        im = 0;
      for (let t = 0; t < e; t++) [re, im] = [re * a - im * b, re * b + im * a];
      return [re, im];
    };
    let charge = 0,
      compat = 0,
      unitDev = 0,
      offMin = Infinity;
    for (let k = 1; k <= THREAD; k++) {
      charge = Math.max(charge, Math.abs(k * Math.log(hypot(...thread(LN2, k))) - LN2));
      unitDev = Math.max(unitDev, Math.abs(hypot(...thread(0, k)) - 1));
      offMin = Math.min(offMin, hypot(...thread(LN2, k)) - 1);
      for (let e = 1; e <= 4; e++) compat = Math.max(compat, norm(sub(cpow(thread(LN2, k * e), e), thread(LN2, k))));
    }
    // three_lift_difference_cocycle: θ_m = (t + k_m)/m with k = 0, 1 and the profinite Σ j!, t = φ/360°
    const t0 = m.phi / TAU,
      sumFact = (mod) => {
        let f = 1,
          s = 0;
        for (let j = 1; j <= LIFT; j++) {
          f = (f * j) % mod;
          s = (s + f) % mod;
        }
        return s;
      };
    const lifts = [() => 0, () => 1, sumFact];
    const lift = (i, k) => (t0 + lifts[i](k)) / k;
    let visible = 0,
      cocycle = 0,
      tower = 0;
    for (let k = 1; k <= LIFT; k++) {
      const D = (i, j) => lift(j, k) - lift(i, k);
      cocycle = Math.max(cocycle, circ(D(0, 2) - D(0, 1) - D(1, 2)));
      if (k === 1) visible = Math.max(circ(D(0, 1)), circ(D(1, 2)), circ(D(0, 2)));
      for (let e = 1; e * k <= LIFT; e++) for (let i = 0; i < 3; i++) tower = Math.max(tower, circ(e * lift(i, k * e) - lift(i, k)));
    }
    return {
      equiv,
      dist,
      tri,
      cheb: { gap: cheb, n: m.N, closure: m.scales.closure },
      cross: { gap: basisGap, invariant, c: 2 },
      skew,
      charge: { gap: charge, compat, q: LN2 },
      zero: { unit: unitDev, off: offMin },
      lifts: { visible, cocycle, tower },
      arith: arith()
    };
  }

  /* ---------- the scenes: layer weights blend on a card change ---------- */
  const LAYERS = Object.fromEntries(SCENES.map((s) => [s, Object.fromEntries(SCENES.map((k) => [k, k === s ? 1 : 0]))]));
  function layers() {
    const to = LAYERS[state.scene];
    if (!state.from || state.blend >= 1) return { ...to };
    const out = {};
    for (const k of SCENES) out[k] = lerp(state.from[k], to[k], state.blend);
    return out;
  }
  const cams = { scales: [0.16, 0.28], meridian: [-0.34, 0.24], flows: [-0.26, 0.2], clock: [-0.36, 0.22], prime: [-0.4, 0.34] };
  const PRESETS = {
    'tangent-scales-vs-chartfree-arc': { scene: 'scales', bump: true, play: true, still: MAP.scales.t(18) },
    'meridian-zero-one-infinity-closure': { scene: 'meridian', play: true, still: 0.75 },
    'add-mul-lie-spinor-flows': { scene: 'flows', play: true, still: 0.25 },
    'logarithmic-arclength-pole-deceleration': { scene: 'clock', play: true, still: 0.75 },
    'prime-solenoid-vs-flat-sawtooth': { scene: 'prime', play: true, still: MAP.prime.t(7) }
  };
  const DEFAULT = 'tangent-scales-vs-chartfree-arc';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.scales[0], pitch: cams.scales[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp], F: [-sy, -cy, 0] };
  };
  let dragging = null,
    frozenFit = null;
  // half width and half height of what each scene draws, in world units
  const EXTENT = { scales: [1.22, 1.2], meridian: [1.2, 1.18], flows: [1.64, 1.64], clock: [1.18, 1.34], prime: [1.24, 1.1] };
  const BLADE = 1.16; // half width of the drawn patch of the (infinite) blade
  /** Fit the drawing into the stage between the title and the legend. */
  function fit(w) {
    const Wd = stage.clientWidth,
      H = stage.clientHeight;
    if (!Wd || !H) return;
    if (dragging != null && frozenFit) return;
    const box = stage.getBoundingClientRect();
    const tl = $('hudTl'),
      bl = $('legend');
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 6) : 12;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 6) : 12;
    const room = Math.max(40, H - top - bottom),
      side = 14;
    let ex = 0,
      ey = 0;
    for (const k of SCENES) {
      ex += w[k] * EXTENT[k][0];
      ey += w[k] * EXTENT[k][1];
    }
    const u = Math.max(8, Math.min((Wd - 2 * side) / (2 * ex), room / (2 * ey)));
    opts.radius = u / Math.min(Wd, H);
    opts.cx = 0.5;
    opts.cy = (top + room / 2) / H;
    frozenFit = { radius: opts.radius, cy: opts.cy };
  }
  /** The far hemisphere of the sphere about the view direction: the inner wall the glass shows, shaded by a tilted
      linear coordinate so the shading moves when the camera turns. */
  const TILT = unit([0.5, -0.32, 0.8]);
  const WALL = 1.012;
  function backWall(D) {
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1);
    const at = (u, v) => {
      const t = (PI / 2) * u,
        p = TAU * v;
      return scale(add(scale(D, -cs(t)), add(scale(e1, sn(t) * cs(p)), scale(e2, sn(t) * sn(p)))), WALL);
    };
    sc.surface('wall', at, { u: [0, 1], v: [0, 1], nu: 18, nv: 64, colors: [P.stage, P.violet], range: [-1.25, 2.75], value: (u, v) => dot(TILT, at(u, v)) / WALL, grid: { every: [3, 8], alpha: 0.16 } });
  }
  /** Points of the meridian from angle a to angle b, at radius r. */
  const arc = (a, b, r = 1, n = 72) => sample(Math.max(2, Math.ceil(n * Math.min(1, Math.abs(b - a) / PI) + 2)), (t) => M(lerp(a, b, t), r));
  const tube = (key, pts, color, width, extra = {}) => sc.tube(key, pts, { color, width, glow: 0.3, occlude: false, ...extra });

  function drawBall(m, w, D) {
    backWall(D);
    sc.glass('glass', [0, 0, 0], 1, { color: P.violet, alpha: 0.05, rim: 0.3 });
    sc.circle([0, 0, 0], D, 1, { fade: false, color: P.violet, width: 1.4, alpha: 0.5 });
    const eq = Math.min(1, w.meridian + w.flows + w.clock);
    if (eq > 0.01) sc.circle([0, 0, 0], [0, 0, 1], 1, { color: P.sigma, width: 1.1, alpha: 0.5 * eq, back: 0.35 });
    // the closed meridian of every scene but the prime one
    const a = 1 - w.prime;
    if (a > 0.01) tube('meridian', arc(0, TAU, 1, 72), P.cyan, 2.6, { alpha: (state.lens === 1 ? 0.55 : 0.9) * a });
  }
  function drawScales(m, a, D) {
    if (a < 0.01) return;
    const full = state.lens === 1; // the plate lens wraps the whole sphere; the other lens leaves the right half bare
    const vs = [],
      fs = [];
    for (const pl of plates(m.N)) {
      if (dot(pl.n, D) < -0.1 || (!full && pl.n[0] > -0.02)) continue;
      const base = vs.length;
      vs.push(...pl.q);
      fs.push([base, base + 1, base + 2, base + 3]);
    }
    if (fs.length) sc.poly('plates', { vertices: vs, faces: fs }, { color: P.magenta, alpha: 0.5 * a, edges: P.magenta, pick: false });
    // the open wedge of every joint of the meridian: between the circle and the corner of two neighbouring tangent lines
    const d = TAU / m.N,
      rc = 1 / cs(d / 2);
    for (let j = 0; j < m.N; j++) {
      const p = PHI0 + j * d,
        mid = p + d / 2;
      if (!full && sn(mid) > -0.02) continue;
      sc.fan([M(mid, rc), ...arc(p + d, p, 1, 16)], { fill: P.magenta, alpha: 0.55 * a });
    }
    if (m.bump) {
      tube('bump', sample(96, (t) => M(lerp(BUMP[0], BUMP[1], t), bumpAt(lerp(BUMP[0], BUMP[1], t)))), P.magenta, 3.4, { alpha: a });
      for (const p of BUMP) sc.line([M(p, 0.95), M(p, 1.06)], { color: P.magenta, width: 1.4, alpha: 0.9 * a });
    }
    // the small arc x₀ x₁ x₂ and the continuation x₃ … x_{N−1} on the same circle
    tube('germ', arc(PHI0, PHI0 + 2 * d, 1, 72), P.cyan, 6, { alpha: a });
    m.scales.xs.slice(0, m.N).forEach((q, n) => sc.bead(W(q), { color: n === 0 ? P.sigma : P.cyan, r: n === 0 ? 6 : n < 3 ? 5 : 3, alpha: a, key: 'x' + n }));
  }
  function drawMeridian(m, a) {
    if (a < 0.01) return;
    if (m.phi > 1e-6) tube('trail', arc(0, m.phi, 1, 96), P.cyan, 6, { alpha: a });
    for (const k of [0.75, 0.25]) {
      const z = 1 - 2 * k;
      sc.circle([0, 0, z], [0, 0, 1], Math.sqrt(1 - z * z), { color: P.sigma, width: 0.9, alpha: 0.3 * a, back: 0.3 });
    }
    [0, 90, 180, 270].forEach((q) => sc.bead(M(q * deg), { color: P.sigma, r: q % 180 ? 4.4 : 6, alpha: a, key: 'p' + q }));
    if (state.lens === 1) {
      // the flat ruler x ↦ (x, 0, 0) of the chart and the ray from −1 (the top) through x to the point of the circle
      const reach = Math.max(1.2, Math.min(2.4, stage.clientWidth / 2 / sc.unit - 0.08));
      sc.arrow([0, 0, 0], [reach, 0, 0], { color: P.magenta, width: 2, alpha: a });
      sc.arrow([0, 0, 0], [-reach, 0, 0], { color: P.magenta, width: 2, alpha: a });
      for (let k = -Math.floor(reach - 0.15); k <= reach - 0.15; k++) sc.bead([k, 0, 0], { color: P.magenta, r: 3, alpha: a, key: 'tick' + k });
      if (!m.mer.atInf) {
        const x = m.mer.x;
        if (Math.abs(x) <= reach) {
          sc.line([[0, 0, 1], Math.abs(x) > 1 ? [x, 0, 0] : M(m.phi)], { color: P.magenta, width: 1.3, dash: [5, 4], alpha: 0.9 * a });
          sc.bead([x, 0, 0], { color: P.magenta, r: 4.6, alpha: a, key: 'chart' });
        } else sc.line([[0, 0, 1], [Math.sign(x) * reach, 0, 1 - reach / Math.abs(x)]], { color: P.magenta, width: 1.3, dash: [5, 4], alpha: 0.9 * a });
      }
    }
  }
  const BAND = { r0: 1.08, h: 0.2 };
  const seam = (p) => BAND.r0 + BAND.h * (1 + cs(p));
  function drawFlows(m, a) {
    if (a < 0.01) return;
    const alone = state.lens === 1, // V÷ omitted
      out = BAND.r0 + 2 * BAND.h;
    // one ring of constant width 2: the magenta part has width V₊, the violet part width V÷
    sc.surface('bandPlus', (u, v) => M(u, lerp(BAND.r0, seam(u), v)), { u: [0, TAU], v: [0, 1], nu: 144, nv: 2, color: P.magenta, alpha: 0.8 * a, pick: false });
    sc.surface('bandDiv', (u, v) => M(u, lerp(seam(u), out, v)), { u: [0, TAU], v: [0, 1], nu: 144, nv: 2, color: P.violet, alpha: (alone ? 0.1 : 0.8) * a, pick: false });
    sc.line(sample(144, (t) => M(TAU * t, seam(TAU * t))), { color: P.sigma, width: 1.2, alpha: 0.8 * a });
    for (let j = 0; j < 24; j++) {
      const p = (j + 0.5) * 15 * deg,
        T = tangent(p);
      // V× on the circle: length sin φ, upward on both halves, at rest at both poles
      const len = 0.24 * sn(p),
        at = M(p, 0.93);
      sc.arrow(at, add(at, scale(T, len)), { color: P.cyan, width: 2.4, headSize: 9, alpha: a });
      // the uniform rotation ½(V₊ + V÷) = 1: equal arrows all the way round
      if (!alone) {
        const q = M(p, out + 0.07);
        sc.arrow(q, add(q, scale(T, 0.17)), { color: P.cyan, width: 1.4, headSize: 7, alpha: 0.75 * a });
      }
    }
    sc.line([M(m.phi, BAND.r0 - 0.03), M(m.phi, out + 0.03)], { color: P.sigma, width: 2.2, alpha: a });
    for (const q of [0, 180]) sc.bead(M(q * deg), { color: P.sigma, r: 5.4, alpha: a, key: 'f' + q });
    for (const q of [90, 270]) sc.bead(M(q * deg), { color: P.sigma, r: 4, alpha: a, key: 'f' + q });
  }
  const COIL = { x: -0.46, r: 0.075, s: 0.3 };
  const coil = (tau) => [COIL.x + COIL.r * cs((TAU * tau) / LN2), COIL.r * sn((TAU * tau) / LN2), COIL.s * tau];
  function drawClock(m, a) {
    if (a < 0.01) return;
    const flat = state.lens === 1,
      end = LX * LN2;
    tube('quarter', arc(0, PI / 2, 1, 72), P.cyan, 6.4, { alpha: a });
    const on = (k) => (flat ? [COIL.x, 0, COIL.s * k * LN2] : coil(k * LN2));
    if (flat) {
      sc.arrow([COIL.x, 0, 0], [COIL.x, 0, COIL.s * end + 0.06], { color: P.magenta, width: 2.4, alpha: a });
      sc.arrow([COIL.x, 0, 0], [COIL.x, 0, -COIL.s * end - 0.06], { color: P.magenta, width: 2.4, alpha: a });
    } else tube('coil', sample(LX * 2 * 30, (t) => coil(lerp(-end, end, t))), P.cyan, 2.2, { alpha: (t) => a * Math.min(1, t / 0.06, (1 - t) / 0.06) });
    for (let k = -LX; k <= LX; k++) {
      const named = k >= -2 && k <= 3,
        p = M(2 * Math.atan(2 ** k));
      sc.bead(p, { color: P.cyan, r: named ? 4.6 : 2.6, alpha: a, key: 'd' + k });
      if (Math.abs(k) < LX) sc.bead(on(k), { color: flat ? P.magenta : P.cyan, r: named ? 4 : 2.4, alpha: a, key: 'c' + k });
      if (named) sc.line([p, on(k)], { color: flat ? P.magenta : P.cyan, width: 1.1, dash: [4, 4], alpha: 0.7 * a });
    }
    const tau = clamp(m.mer.tau, -end, end);
    sc.ring(flat ? [COIL.x, 0, COIL.s * tau] : coil(tau), { color: P.sigma, r: 7, alpha: a, key: 'now' });
    for (const q of [0, 180]) sc.bead(M(q * deg), { color: P.sigma, r: 6, alpha: a, key: 'k' + q });
  }
  function drawPrime(m, a, B) {
    if (a < 0.01) return;
    const flat = state.lens === 1,
      zb = zOf(m.prime.tau);
    sc.line([[0, 0, -0.98], [0, 0, 0.98]], { color: P.sigma, width: 1, alpha: 0.35 * a });
    for (const w of POWERS) {
      const below = w.n <= m.X + 1e-9,
        small = w.p > 7,
        r = RING * w.ln,
        z = zOf(w.m * w.ln);
      const bright = (below ? 1 : 0.4) * (flat ? 0.45 : 1) * (small ? 0.7 : 1);
      // the flat cut the blade leaves at this height: a magenta disc bounded by the loop
      if (below) sc.fan(sample(40, (t) => [r * cs(TAU * t), r * sn(TAU * t), z]).slice(0, -1), { fill: P.magenta, alpha: (flat ? 0.24 : 0.13) * a });
      // the violet envelope torus in which the m-fold winding closes
      if (w.m > 1) {
        const t = CABLE + 0.02;
        sc.surface('env' + w.n, (u, v) => [(r + t * cs(v)) * cs(u), (r + t * cs(v)) * sn(u), z + t * sn(v)], { u: [0, TAU], v: [0, TAU], nu: 40, nv: 10, color: P.violet, alpha: 0.16 * a, pick: false });
      }
      tube('loop' + w.n, loopPoints(w.p, w.m), P.cyan, small ? 2 : w.m > 1 ? 2.4 : 4.4, { alpha: bright * a >= 0.995 ? 1 : bright * a });
    }
    // the blade: a flat horizontal plane at the height ln X of the clock, and the circle where it cuts the shell
    const corner = (x, y) => add(add(scale(B.R, x * BLADE), scale(B.F, y * BLADE)), [0, 0, zb]);
    sc.fan([corner(-1, -1), corner(1, -1), corner(1, 1), corner(-1, 1)], { fill: P.magenta, alpha: 0.15 * a, color: P.magenta, width: 1.6, strokeAlpha: 0.9 * a });
    if (Math.abs(zb) < 1) sc.circle([0, 0, zb], [0, 0, 1], Math.sqrt(1 - zb * zb), { fade: false, color: P.magenta, width: 1.3, alpha: 0.8 * a });
    if (m.prime.hit) sc.circle([0, 0, zb + 0.004], [0, 0, 1], RING * m.prime.hit.ln + 0.03, { fade: false, color: P.magenta, width: 3, alpha: a });
    // the base points of the loops on the axis side: silver beads at the foot and the top of the clock
    sc.bead([0, 0, zOf(Math.log(XMIN))], { color: P.sigma, r: 3.4, alpha: a, key: 'foot' });
    sc.bead([0, 0, zOf(Math.log(XMAX))], { color: P.sigma, r: 3.4, alpha: a, key: 'head' });
  }

  /* ---------- labels ---------- */
  const SCENE_NAME = {
    scales: [['三点定大圆', 'THREE-POINT CIRCLE'], ['切板鳞片（MODEL）', 'TANGENT SCALES (MODEL)']],
    meridian: [['0 · 1 · ∞ 闭环', '0 · 1 · ∞ CLOSED LOOP'], ['平直直尺（MODEL）', 'FLAT RULER (MODEL)']],
    flows: [['加乘旋量流', 'ADD–MULTIPLY FLOWS'], ['只留加法流（MODEL）', 'ADDITION ALONE (MODEL)']],
    clock: [['减速的对数钟', 'DECELERATING LOG CLOCK'], ['直线钟（MODEL）', 'STRAIGHT CLOCK (MODEL)']],
    prime: [['素数光滑环', 'SMOOTH PRIME LOOPS'], ['平直切刀（MODEL）', 'FLAT BLADE (MODEL)']]
  };
  const LENS_NAME = [
    ['M<sub>Ω</sub>', 'M<sub>Ω</sub>'],
    ['T<sub>p</sub>M', 'T<sub>p</sub>M']
  ];
  const VP = 'V<sub>+</sub>',
    VD = 'V<sub>÷</sub>',
    VM = 'V<sub>×</sub>';
  const SUB = { 2: '₂', 3: '₃', 5: '₅', 7: '₇', 11: '₁₁', 13: '₁₃' };
  const gamma = (w) => `γ${SUB[w.p]}${w.m > 1 ? superscript(w.m) : ''}`;

  /* ---------- the printed relations of a frame ---------- */
  const half = (m) => [cs(m.phi / 2), sn(m.phi / 2)];
  const phiRel = (m, d = 1) => degRel(exactOf(m.phi).deg, m.phiDeg, d);
  /** x by its name at 0, ±1, ∞ and the powers of 2, else its digits. */
  const xRel = (m) => (m.mer.atInf ? equals('∞') : named(exactOf(m.phi).x, m.mer.x));
  const kRel = (m) => rel(exactOf(m.phi).kappa, m.mer.kappa, 4, { 1: -(half(m)[1] ** 2) });
  const plusRel = (m) => rel(exactOf(m.phi).plus, m.mer.plus, 4, { 2: -2 * half(m)[1] ** 2, 1: m.mer.cos });
  const divRel = (m) => rel(exactOf(m.phi).div, m.mer.div, 4, { 2: -2 * half(m)[0] ** 2, 1: -m.mer.cos });
  const cosRel = (m) => rel(exactOf(m.phi).cos, m.mer.cos, 4, { 1: -2 * half(m)[1] ** 2, '-1': 2 * half(m)[0] ** 2 });
  const mulRel = (m) => rel(exactOf(m.phi).mul, m.mer.mul, 4, { 1: -2 * sn(m.phi / 2 - PI / 4) ** 2, '-1': 2 * sn(m.phi / 2 + PI / 4) ** 2 });
  /** x = ±1. */
  const atOne = (m) => {
    const q = exactOf(m.phi).x;
    return !!q && q[0] ** 2n === q[1] ** 2n;
  };
  /** τ = ln|x|: 0 at x = ±1 alone, no number at the two poles. */
  const tauRel = (m, d = 4) => {
    if (m.mer.atZero || m.mer.atInf) return `→${NB}${m.mer.atZero ? '−' : '+'}∞`;
    return atOne(m) ? equals(0) : rel(null, m.mer.tau, d);
  };
  /** The same number from κ alone, ½ ln((1 − κ)/κ) (0 < κ < 1). */
  const tauOfKappa = (m) => {
    const v = 0.5 * Math.log((1 - m.mer.kappa) / m.mer.kappa);
    return atOne(m) && Math.abs(v) <= 1e-9 ? equals(0) : rel(null, v);
  };
  const creaseRel = (m) => degRel(frac(360, m.N), m.scales.crease);
  const sumRel = (m) => `${idRel(360, m.scales.sum, 2)}°`;
  /** κ(x₀, x₁) = cos²(π/N): for N = 6 … 36 a fraction at N = 6 alone (Niven). */
  const arcRel = (m) => rel(m.N === 6 ? frac(3, 4) : null, m.scales.kappa);
  const driftRel = (m) => below(m.scales.closure);
  const jumpRel = (x) => approx(sci(x));
  /** X as a fraction on the grid of 1/20 of the slider, the handle and the keys, else null. */
  const gridX = (X) => (Math.round(X * 20) / 20 === X ? frac(Math.round(X * 20), 20) : null);
  const INTEGERS = Array.from({ length: XMAX }, (_, k) => k + 1);
  /** X inside ψ( ): its digits when they are X itself, else the letter. */
  const XName = (m) => {
    const q = gridX(m.X);
    return !q ? 'X' : q[1] === 1n ? fstr(q) : decimals(q, 2).text;
  };
  const XRel = (m) => (gridX(m.X) ? equals(XName(m)) : rel(null, m.X, 2, {}, INTEGERS));
  /** A sum of logarithms of primes: 0 when it is empty, else irrational. */
  const lnRel = (v) => (v === 0 ? equals(0) : irr(v));
  const psiRel = (m) => lnRel(m.prime.psi);
  function tags(m, w) {
    const g = state.lens === 1;
    const { U, R, F } = basis(sc.cam.yaw, sc.cam.pitch);
    const off = (p, ku, kr = 0) => add(add(p, scale(U, ku)), scale(R, kr));
    /** p pushed outward on the screen by k (world units), at the depth of p. */
    const outward = (p, k) => {
      const x = dot(p, R),
        y = dot(p, U),
        n = hypot(x, y);
      return n < 1e-9 ? off(p, k) : add(p, add(scale(R, (k * x) / n), scale(U, (k * y) / n)));
    };
    const T = (key, p, html, cls = 'raw backed c-ik', dx = 0) => p && sc.tag(key, p, html, cls, { occlude: false, dx });
    const compact = stage.clientWidth < 480;
    if (w.scales > 0.5) {
      const d = TAU / m.N;
      T('x0', outward(M(PHI0), 0.16), 'x₀', 'raw backed c-sg');
      // wide stages: the long labels start beside the circle (shifted by half their width), off the beads and the plates
      T('x1', outward(M(PHI0 + d), compact ? 0.2 : 0.12), compact ? 'x₁' : `x₁ · κ ${arcRel(m)}`, 'raw backed c-cy', compact ? 0 : sn(PHI0 + d) > -0.2 ? 58 : -58);
      T('x2', outward(M(PHI0 + 2 * d), compact ? 0.18 : 0.1), compact ? 'x₂' : 'x₂ = [x₁, x₀, x₁]', 'raw backed c-cy', compact ? 0 : sn(PHI0 + 2 * d) > -0.2 ? 60 : -60);
      T('crease', outward(M(268 * deg), compact ? 0.14 : 0.1), `${compact ? '' : `${L('折痕', 'crease')} `}360°/${m.N} ${creaseRel(m)}`, 'raw backed c-mg', compact ? 0 : -76);
      if (m.bump) T('bump', outward(M(37 * deg), 0.34), 'C<sup>∞</sup> · e<sup>−1/u²</sup>', 'raw backed c-mg');
      if (g && !compact) T('gamma', off([0, 0, 0], -0.2, -0.2), L('T<sub>p</sub>M 之间要补 Γ', 'Γ patches between T<sub>p</sub>M'), 'raw backed c-mg');
    }
    if (w.meridian > 0.5) {
      T('m0', outward(M(0), 0.14), '0 · κ = 1', 'raw backed c-sg');
      T('m1', outward(M(PI / 2), compact ? 0.16 : 0.26), compact ? '1' : '1 · κ = 1/2', 'raw backed c-sg');
      T('mi', outward(M(PI), 0.14), '∞ · κ = 0', 'raw backed c-sg');
      T('mn', outward(M(1.5 * PI), compact ? 0.16 : 0.28), compact ? '−1' : '−1 · κ = 1/2', 'raw backed c-sg');
      if (g) T('ruler', off([0.42, 0, 0], 0.13), compact ? 'ℝ' : L('直尺 ℝ 上没有 ∞', 'the ruler ℝ has no ∞'), 'raw backed c-mg');
    }
    if (w.flows > 0.5) {
      T('f0', off(M(0), 0.14), '0', 'raw backed c-sg');
      T('fi', off(M(PI), -0.16), '∞', 'raw backed c-sg');
      T('fp', M(-0.36, 1.32), `${VP}${compact ? '' : ' = 1 + cos φ'}`, 'raw backed c-mg');
      if (!g) T('fd', M(PI + 0.36, 1.32), `${VD}${compact ? '' : ' = 1 − cos φ'}`, 'raw backed c-vi');
      T('fm', M(PI / 2, 0.6), `${VM} ${compact ? '' : '= sin φ '}${mulRel(m)}`, 'raw backed c-cy');
      if (!g) T('fu', off([-0.2, 0, 0], 0.06), `½(${VP} + ${VD}) = 1`, 'raw backed c-cy');
      else T('fu', off([-0.2, 0, 0], 0.06), `${VP} − 1 ${cosRel(m)}`, 'raw backed c-mg');
    }
    if (w.clock > 0.5) {
      T('k0', outward(M(0), 0.14), g ? 'ln 0 = −∞' : '0', g ? 'raw backed c-mg' : 'raw backed c-sg');
      T('ki', outward(M(PI), 0.14), g ? 'ln ∞ = +∞' : '∞', g ? 'raw backed c-mg' : 'raw backed c-sg');
      T('quarter', outward(M(46 * deg), compact ? 0.2 : 0.46), compact ? 'π/2' : `Δφ = π/2 ${irr(PI / 2)}`, 'raw backed c-cy');
      for (const q of DYADIC) if (!compact || q.k === 0 || q.k === -2 || q.k === 3) T('d' + q.k, outward(M(q.phi), 0.13), q.label, 'raw backed c-cy');
      const lab = [COIL.x, 0, 0.5 * COIL.s * LN2];
      T('dt', off(lab, 0, -0.3), g ? (compact ? 'τ' : L('直线钟 τ', 'straight clock τ')) : compact ? 'ln 2' : `Δτ = ln 2 ${irr(LN2)}`, g ? 'raw backed c-mg' : 'raw backed c-cy');
      if (!g && !compact) T('cay', off([COIL.x, 0, 1.5 * COIL.s * LN2], 0.05, -0.3), `1/(1 + δ²) ${named(CAYLEY, CAYLEY_READ)}`, 'raw backed c-cy');
    }
    if (w.prime > 0.5) {
      for (const v of POWERS) {
        if (v.p > 7 || (v.m > 1 && (compact || g))) continue;
        // primitive loops are named on the right of their ring, the multiple windings on the left, clear of the tubes
        const side = v.m > 1 ? -1 : 1,
          p = add(scale(R, side * RING * v.ln), [0, 0, zOf(v.m * v.ln)]),
          long = !g && !compact && v.m === 1;
        T('g' + v.n, off(p, 0, side * 0.04), g ? `${v.n <= m.X + 1e-9 ? '+' : ''}ln ${v.p}` : long ? `${gamma(v)} · ln ${v.p}` : gamma(v), g ? 'raw backed c-mg' : 'raw backed c-cy', side * (long ? 36 : g ? 26 : 17));
      }
      T('blade', off(add(add(scale(R, -0.8 * BLADE), scale(F, BLADE)), [0, 0, zOf(m.prime.tau)]), -0.1), compact ? `ψ ${psiRel(m)}` : `Σ<sub>X</sub> · ψ(${XName(m)}) ${psiRel(m)}`, 'raw backed c-mg');
    }
  }
  function keyText(m) {
    const g = state.lens === 1;
    return {
      scales: g ? `${L('折痕', 'crease')} ${creaseRel(m)}` : `κ ${arcRel(m)}`,
      meridian: `x ${xRel(m)}`,
      flows: g ? `V₊ − 1 ${cosRel(m)}` : '½(V₊ + V÷) = 1',
      clock: `τ ${tauRel(m)}`,
      prime: `ψ(${XName(m)}) ${psiRel(m)}`
    }[state.scene];
  }
  const bigline = (m) => `${L(...SCENE_NAME[state.scene][state.lens])} · ${keyText(m)}`;
  /** The live regime of a scene: the notes, the HUD line and the figure notes all read this one value. */
  function regime(m) {
    const s = state.scene;
    if (s === 'meridian' || s === 'flows') return m.mer.atZero ? 'zero' : m.mer.atInf ? 'inf' : m.phi < PI ? 'pos' : 'neg';
    if (s === 'prime') return m.prime.hit ? 'hit' : m.prime.count ? 'between' : 'below';
    return 'live';
  }
  /** The step of the one-sided secants, as a power of ten. */
  const SECANTS = () => powerName(SECANT);
  function subline(m) {
    const s = state.scene,
      r = regime(m),
      g = state.lens === 1;
    if (s === 'scales')
      return L(
        `N = ${m.N}：品红平板每个接缝折 360°/${m.N} ${creaseRel(m)}，合计 ${sumRel(m)}；青色 x₂ = [x₁, x₀, x₁] 续接 ${m.N} 步回到 x₀，浮点偏差 ${driftRel(m)}。`,
        `N = ${m.N}: every magenta joint creases by 360°/${m.N} ${creaseRel(m)}, total ${sumRel(m)}; the cyan x₂ = [x₁, x₀, x₁] goes on and is back on x₀ after ${m.N} steps, floating-point drift ${driftRel(m)}.`
      );
    if (s === 'meridian') {
      const at = `φ ${phiRel(m)}`;
      if (r === 'zero' || r === 'inf') {
        const jump = jumpRel(r === 'zero' ? m.mer.jump0 : m.mer.jumpInf);
        return r === 'zero'
          ? L(`${at}：x = 0，κ = 1，过去极；青色闭环在这里光滑，两侧单位割线（步长 ${SECANTS()}）只差 ${jump}。`, `${at}: x = 0, κ = 1, the past pole; the cyan loop is smooth here, the one-sided unit secants (step ${SECANTS()}) differ by only ${jump}.`)
          : L(`${at}：x = ∞，κ = 0，未来对跖点；青色闭环光滑穿过，两侧单位割线（步长 ${SECANTS()}）只差 ${jump}。`, `${at}: x = ∞, κ = 0, the future antipode; the cyan loop passes smoothly, the one-sided unit secants (step ${SECANTS()}) differ by only ${jump}.`);
      }
      if (r === 'neg')
        return L(
          `${at}：x = tan(φ/2) ${xRel(m)}，κ ${kRel(m)}；过了 ∞ 沿负半轴返回 0，整圈弧长 2π ${irr(TAU)}。`,
          `${at}: x = tan(φ/2) ${xRel(m)}, κ ${kRel(m)}; past ∞ the loop returns to 0 along the negative half, total arc 2π ${irr(TAU)}.`
        );
      return L(
        `${at}：x = tan(φ/2) ${xRel(m)}，κ = 1/(1 + x²) ${kRel(m)}；往上过 ∞，再从负半轴回到 0，切向处处连续。`,
        `${at}: x = tan(φ/2) ${xRel(m)}, κ = 1/(1 + x²) ${kRel(m)}; up through ∞ and back to 0 along the negative half, the tangent never jumps.`
      );
    }
    if (s === 'flows') {
      if (g)
        return L(
          `只留 ${VP}（略去 ${VD}）：φ ${phiRel(m)} 处 ${VP} ${plusRel(m)}，与匀速差 cos φ ${cosRel(m)}；到 ∞ 处 ${VP} = 0，停住。`,
          `${VP} alone (${VD} omitted): at φ ${phiRel(m)}, ${VP} ${plusRel(m)}, off the uniform speed by cos φ ${cosRel(m)}; at ∞, ${VP} = 0 and it stops.`
        );
      return L(
        `φ ${phiRel(m)}：${VP} = 2κ ${plusRel(m)}，${VD} = 2(1 − κ) ${divRel(m)}，${VM} = sin φ ${mulRel(m)}；‖[${VP}, ${VD}] − 2${VM}‖ 的浮点余量 ${below(lie().r1)}。`,
        `φ ${phiRel(m)}: ${VP} = 2κ ${plusRel(m)}, ${VD} = 2(1 − κ) ${divRel(m)}, ${VM} = sin φ ${mulRel(m)}; ‖[${VP}, ${VD}] − 2${VM}‖, floating-point residue ${below(lie().r1)}.`
      );
    }
    if (s === 'clock')
      return L(
        `x ${xRel(m)}：φ ${phiRel(m, 2)}，${VM} = sin φ ${mulRel(m)}，τ = ln x ${tauRel(m)}；从 1 到 0 是有限弧 π/2 ${irr(PI / 2)}，每次翻倍 Δτ = ln 2 ${irr(LN2)}。`,
        `x ${xRel(m)}: φ ${phiRel(m, 2)}, ${VM} = sin φ ${mulRel(m)}, τ = ln x ${tauRel(m)}; from 1 to 0 is the finite arc π/2 ${irr(PI / 2)}, every doubling takes Δτ = ln 2 ${irr(LN2)}.`
      );
    const p = m.prime;
    if (r === 'hit')
      return L(
        `X ${XRel(m)}：品红刀片正落在 ${gamma(p.hit)} 上，ψ 跳 ln ${p.hit.p} ${lnRel(p.jump)}，到 ψ(${XName(m)}) ${psiRel(m)}；青色的环没有折角。`,
        `X ${XRel(m)}: the magenta blade lies on ${gamma(p.hit)}, ψ jumps by ln ${p.hit.p} ${lnRel(p.jump)} to ψ(${XName(m)}) ${psiRel(m)}; the cyan loops have no corner.`
      );
    const [zh, en] = p.next ? [`在 X = ${p.next.n} 跳 ln ${p.next.p} ${lnRel(p.next.ln)}`, `is ln ${p.next.p} ${lnRel(p.next.ln)} at X = ${p.next.n}`] : ['', ''];
    if (r === 'below') return L(`X ${XRel(m)}：刀片还在 γ₂ 下面，ψ = 0；第一次${zh}。`, `X ${XRel(m)}: the blade is still below γ₂, ψ = 0; the first jump ${en}.`);
    return L(
      `X ${XRel(m)}：刀片在两环之间，ψ ${psiRel(m)} 不动${zh && `；下一次${zh}`}。青色的环没有折角。`,
      `X ${XRel(m)}: the blade is between two loops, ψ ${psiRel(m)} stays${en && `; the next jump ${en}`}. The cyan loops have no corner.`
    );
  }
  function legendItems() {
    const s = state.scene,
      g = state.lens === 1,
      items = [['vi', L('三元球', 'ternion sphere')]];
    if (s === 'scales') items.push(['cy', L('三点定下的大圆', 'the three-point circle')], ['mg', L('切板、折痕、鼓包', 'plates, creases, bump')]);
    else if (s === 'meridian') {
      items.push(['cy', L('闭合经线', 'closed meridian')]);
      items.push(g ? ['mg', L('平直直尺', 'flat ruler')] : ['sg', '0 · 1 · ∞ · −1']);
    } else if (s === 'flows') {
      if (g) items.push(['mg', L('加法流 V₊', 'addition V₊')], ['cy', L('乘法流 V×', 'multiplication V×')]);
      else items.splice(0, 1, ['mg', 'V₊'], ['vi', L('V÷ 与三元球', 'V÷, the sphere')], ['cy', L('V× 与匀速转动', 'V×, uniform rotation')]);
    } else if (s === 'clock') items.push(['cy', L('有限弧与等步 ln 2', 'finite arc, steps ln 2')], g ? ['mg', L('直线钟', 'straight clock')] : ['sg', L('两极 0、∞', 'the poles 0, ∞')]);
    else items.push(['cy', L('素数环 γₚ', 'prime loops γₚ')], ['mg', L('切刀与截面', 'blade and cuts')]);
    return items;
  }
  function hud(m) {
    $('hudTitle').innerHTML = bigline(m);
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems()
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels(at) {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    // the amber ring of a still keeps its place as the handle does
    if (TRV.shot) occupied.push({ left: bounds.left + at[0] - 15, right: bounds.left + at[0] + 15, top: bounds.top + at[1] - 15, bottom: bounds.top + at[1] + 15 });
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
    const place = (i, dx, dy, box) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(box);
    };
    const STEP = 20;
    const cols = 2 * Math.ceil(bounds.width / STEP);
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
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
          const spot = free(box, dx + sx, dy);
          if (spot) {
            best = { cost, dx: dx + sx, dy, spot };
            break;
          }
        }
      }
      if (best) place(i, best.dx, best.dy, best.spot);
    }
  }
  /** The world point of the amber handle: x₁ of the small arc, the probe on the meridian, the right edge of the blade. */
  function handleWorld(m) {
    const s = state.scene;
    if (s === 'scales') return M(PHI0 + TAU / m.N);
    if (s === 'prime') return bladeEdge(m.X);
    return M(m.phi);
  }
  const bladeEdge = (X) => add(scale(basis(sc.cam.yaw, sc.cam.pitch).R, BLADE), [0, 0, zOf(Math.log(X))]);
  function drawStage(m) {
    const w = layers();
    fit(w);
    sc.begin();
    const B = basis(sc.cam.yaw, sc.cam.pitch);
    drawBall(m, w, B.D);
    drawScales(m, w.scales, B.D);
    drawMeridian(m, w.meridian);
    drawFlows(m, w.flows);
    drawClock(m, w.clock);
    drawPrime(m, w.prime, B);
    // a printed still has no handle button: an amber ring marks the current point there
    // (moved towards the viewer, which keeps its place on the screen, so that no wall cuts it)
    if (TRV.shot) sc.ring(add(handleWorld(m), scale(B.D, 1.6)), { color: P.amber, r: 11, key: 'current' });
    tags(m, w);
    sc.end();
    const q = sc.p(handleWorld(m));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels(q);
  }

  /* ---------- the strips: the three flows along φ; the smooth ramp X against the staircase ψ(X) ---------- */
  const Y1 = [-0.15, 3.1],
    Y2 = [-1.2, 24.5],
    CURSOR1 = 2.05, // the cursors end at the top of the curves, and always at least 12 px below the two legend rows
    CURSOR2 = 16.6;
  const cursorTop = (g, y) => Math.min(y, g.invY(g.pt + 9 + 14 + 6 + 12));
  const along = (f) => sample(240, (t) => [180 * t, f(PI * t)]);
  const CURVES = { plus: along(FLOW.plus[0]), div: along(FLOW.div[0]), mul: along(FLOW.mul[0]), mean: sample(2, (t) => [180 * t, 1]) };
  const STAIRS = (() => {
    const pts = [[1, 0]];
    let y = 0;
    for (const w of POWERS) {
      pts.push([w.n, y]);
      y += w.ln;
      pts.push([w.n, y]);
    }
    pts.push([XMAX, y]);
    return pts;
  })();
  /** The angle of the cursor of the first strip: φ, or 360° − φ on the negative half (the fraction of φ mirrored with it). */
  function stripDeg(mirrored, m) {
    const q = exactOf(m.phi).deg;
    return degRel(q && mirrored ? frac(360n * q[1] - q[0], q[1]) : q, mirrored ? 360 - m.phiDeg : m.phiDeg, 1);
  }
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      const wide = cv.clientWidth >= 300;
      // a probe on the negative half, φ > 180°, is the angle −φ′ with φ′ = 360° − φ: same κ, V× of the other sign
      const mirrored = m.phi > PI,
        at = mirrored ? 360 - m.phiDeg : m.phiDeg;
      $('plotTitle').textContent = L('两流之和恒为 2，乘法流在两极停住', 'V₊ + V÷ = 2, V× rests at 0 and ∞');
      $('plotMeta').textContent = `${mirrored ? '−' : ''}φ ${stripDeg(mirrored, m)}`;
      const g = kit.plot(cv, { x: [0, 180], y: Y1, pad: [26, 16, 4, 20] });
      g.axes({ xTicks: [[0, '0'], [90, 'x = 1'], [180, '∞']], yTicks: [[0, '0'], [1, '1'], [2, '2']] });
      g.line(CURVES.mean, P.sigma, { width: 1.6, dash: [5, 4] });
      g.line(CURVES.mul, P.cyan, { width: 2 });
      g.line(CURVES.div, P.violet, { width: 2 });
      g.line(CURVES.plus, P.magenta, { width: 2 });
      g.line([[at, Y1[0]], [at, cursorTop(g, CURSOR1)]], P.amber, { width: 1, dash: mirrored ? [3, 3] : [] });
      for (const y of [m.mer.plus, m.mer.div, Math.abs(m.mer.mul)]) g.dot(at, y, P.amber, 3);
      g.legend([[P.magenta, wide ? 'V_{+} = 1 + cos φ' : 'V_{+}'], [P.violet, wide ? 'V_{÷} = 1 − cos φ' : 'V_{÷}']], { right: false });
      g.legend([[P.cyan, wide ? 'V_{×} = sin φ' : 'V_{×}'], [P.sigma, wide ? '½(V_{+} + V_{÷}) = 1' : '½(V_{+} + V_{÷})', 'dash']]);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      $('plotTitleB').textContent = L('光滑的 X 与切刀读出的 ψ(X)', 'Smooth X, staircase ψ(X)');
      $('plotMetaB').textContent = `ψ ${psiRel(m)}`;
      const g = kit.plot(cb, { x: [1, XMAX], y: Y2, pad: [26, 16, 4, 20] });
      g.axes({ xTicks: [[1, '1'], [4, '4'], [8, 'X = 8'], [12, '12'], [16, '16']], yTicks: [[0, '0'], [8, '8'], [16, '16']] });
      g.line(sample(2, (t) => [lerp(1, XMAX, t), lerp(1, XMAX, t)]), P.cyan, { width: 2 });
      g.line(STAIRS, P.magenta, { width: 2 });
      g.line([[m.X, Y2[0]], [m.X, cursorTop(g, CURSOR2)]], P.amber, { width: 1 });
      g.dot(m.X, m.prime.psi, P.amber, 3.2);
      g.legend(
        [
          [P.cyan, L('光滑均值 X', 'smooth mean X')],
          [P.magenta, cb.clientWidth >= 300 ? L('切刀读数 ψ(X) = Σ ln p', 'blade reading ψ(X) = Σ ln p') : 'ψ(X) = Σ ln p']
        ],
        { right: false }
      );
    }
  }

  /* ---------- readouts ---------- */
  function keyReadout(m) {
    const s = state.scene,
      g = state.lens === 1;
    if (s === 'scales' && g) return [L('平直切板每缝的折痕', 'Crease of every joint of the flat plates'), creaseRel(m), ` · N = ${m.N} · ${L('合计', 'total')} ${sumRel(m)}`];
    if (s === 'meridian' && g) return [L('平直直尺上的坐标 x', 'Coordinate x on the flat ruler'), xRel(m), ` · κ ${kRel(m)}`];
    if (s === 'flows' && g) return [L('单边加法流与匀速之差', 'One-sided addition flow minus the uniform speed'), cosRel(m), ` · φ ${phiRel(m)} · V₊ ${plusRel(m)}`];
    if (s === 'clock' && g) return [L('直线钟 τ = ln x', 'Straight clock τ = ln x'), tauRel(m), ` · x ${xRel(m)}`];
    if (s === 'scales') return [L('续接 N 步回到 x₀ 的浮点偏差', 'Floating-point drift of returning to x₀ after N steps'), driftRel(m), ` · N = ${m.N} · ${L('每缝折痕', 'crease')} ${creaseRel(m)}`];
    if (s === 'meridian') return [L(`0 与 ∞ 处两侧单位割线之差（步长 ${SECANTS()}）`, `Difference of the one-sided unit secants at 0 and ∞ (step ${SECANTS()})`), jumpRel(Math.max(m.mer.jump0, m.mer.jumpInf)), ` · x ${xRel(m)} · κ ${kRel(m)}`];
    if (s === 'flows') return [L('匀速转动：两流的平均', 'Uniform rotation: the mean of the two flows'), idRel(1, (m.mer.plus + m.mer.div) / 2), ` · φ ${phiRel(m)}`];
    if (s === 'clock') return [L('每次翻倍的内禀步长 ln 2', 'Intrinsic step of every doubling, ln 2'), irr(LN2), ` · x ${xRel(m)} · τ ${tauRel(m)}`];
    return [L('切刀读数 ψ(X)', 'Blade reading ψ(X)'), psiRel(m), ` · X ${XRel(m)} · ${L('跳变', 'jump')} ${lnRel(m.prime.jump)}`];
  }
  function readings(m, I) {
    const [label, value, rest] = keyReadout(m),
      ly = lie();
    $('roKeyLabel').innerHTML = label;
    $('roKey').innerHTML = value;
    $('roKeySub').innerHTML = rest;
    $('roScale').innerHTML = [creaseRel(m), sumRel(m), irr(m.scales.corner), idRel(1, m.scales.bumpHalf), approx(sci(m.scales.bumpTenth))].join(' · ');
    $('roMer').innerHTML = [xRel(m), kRel(m), tauRel(m), plusRel(m), divRel(m), mulRel(m)].join(' · ');
    $('roLie').innerHTML = [ly.r1, ly.r2, ly.r3, ly.mean, ly.geo].map(below).join(' · ');
    $('roClock').innerHTML = [irr(LN2), equals(fstr(DELTA)), named(CAYLEY, CAYLEY_READ), equals(STEPS.slice(2).map(stepName).join(', '))].join(' · ');
    $('roPrime').innerHTML = [XRel(m), lnRel(m.prime.tau), psiRel(m), equals(m.prime.count)].join(' · ');
    $('roNote').innerHTML = roNote(m, I);
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`;
    $('keyPill').innerHTML = `<strong>${keyText(m)}</strong>`;
    $('hint').textContent = L('拖琥珀手柄或时间轴改本场景的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle or the rail to set the quantity of the scene · drag empty space to orbit · Space plays');
    $('formula').textContent = 'x = tan(φ/2) · κ = 1/(1 + x²) · ω = dφ/sin φ = dx/x';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    nField.set(m.N);
    phiField.set(Math.round(m.phiDeg));
    const lx = m.mer.x > 0 && Number.isFinite(m.mer.x) ? Math.log2(m.mer.x) : 0;
    lxField.set(Math.round(clamp(lx, -LX, LX) * 20) / 20);
    xField.set(Math.round(m.X * 10) / 10);
    $('nOut').textContent = equals(m.N);
    $('phiOut').textContent = phiRel(m);
    $('lxOut').textContent = `x ${xRel(m)}`;
    $('xOut').textContent = XRel(m);
    $('ctlPanel').dataset.scene = state.scene;
    bumpChips.set(m.bump ? 'on' : 'off', true);
    const q = exactOf(m.phi).x,
      name = m.mer.atInf ? 'inf' : q ? fstr(q).replace('−', '-') : null;
    xChips.set(['0', '1', 'inf', '-1'].includes(name) ? name : null, true);
    const dy = DYADIC.find((e) => e.label === name);
    dyChips.set(dy ? String(dy.k) : null, true);
    ppChips.set(m.prime.hit ? String(m.prime.hit.n) : null, true);
  }
  function roNote(m, I) {
    const s = state.scene,
      steps = (sep) => STEPS.map(stepName).join(sep);
    if (s === 'scales')
      return L(
        `沿经线 ${m.N} 块切板，接缝各折 360°/${m.N} ${creaseRel(m)}：N 越大每缝越小，合计总是 360°；切板只是近似，角外伸 sec(π/N) − 1 ${irr(m.scales.corner)}。鼓包 B(u) = e<sup>8 − 1/u² − 1/(1−u)²</sup> 在脚点各阶导数为 0，B(1/10) ${approx(sci(m.scales.bumpTenth))}，离脚点越近越看不见它。与 Uₙ、Tₙ 逐项比较到 n = ${m.N}：浮点偏差 ${below(I.cheb.gap)}。`,
        `${m.N} tangent plates along the meridian, each joint creased by 360°/${m.N} ${creaseRel(m)}: a larger N shrinks each crease, the total stays 360°; the plates are only an approximation, their corners stand off by sec(π/N) − 1 ${irr(m.scales.corner)}. The bump B(u) = e<sup>8 − 1/u² − 1/(1−u)²</sup> has all derivatives 0 at its feet, B(1/10) ${approx(sci(m.scales.bumpTenth))}: the nearer the foot, the less of it shows. Against Uₙ and Tₙ up to n = ${m.N}: floating-point drift ${below(I.cheb.gap)}.`
      );
    if (s === 'meridian')
      return L(
        `φ ↦ (cos φ, sin φ) 处处单位速率；两侧单位割线（步长 ${SECANTS()}）之差在 0 处 ${jumpRel(m.mer.jump0)}、在 ∞ 处 ${jumpRel(m.mer.jumpInf)}，就是 2 sin(步长/2)，随步长趋于 0，所以没有折角；${CHORDS} 段弦长之和 ${irr(m.mer.length)}，比 2π ${irr(TAU)} 少 ${approx(sci(TAU - m.mer.length))}。坐标 x 里的度量因子 4/(1 + x²)² 在 ∞ 处变成 0，换到 w = 1/x 却是 4/(1 + w²)² = 4：那是坐标的退化，不是圆上的奇点。`,
        `φ ↦ (cos φ, sin φ) has unit speed everywhere; the one-sided unit secants (step ${SECANTS()}) differ by ${jumpRel(m.mer.jump0)} at 0 and ${jumpRel(m.mer.jumpInf)} at ∞, which is 2 sin(step/2) and vanishes with the step: there is no corner; ${CHORDS} chords add to ${irr(m.mer.length)}, short of 2π ${irr(TAU)} by ${approx(sci(TAU - m.mer.length))}. The metric factor 4/(1 + x²)² of the coordinate x vanishes at ∞, and in w = 1/x it is 4/(1 + w²)² = 4: the coordinate degenerates, not the circle.`
      );
    if (s === 'flows') {
      const { r1, r2, r3, killing: k } = lie(),
        residues = (and) => [r1, r2].map(below).join(L('、', ', ')) + and + below(r3);
      return L(
        `三条括号在 ${ANGLES} 个角上的浮点余量最大 ${residues('、')}。${VP}、${VD}、${VM} 在 ℝP¹ 上张成 𝔰𝔩(2, ℝ) ≅ 𝔰𝔬(2, 1)：基灵型在转动 ${VP} + ${VD} 上是 ${fmt(k.rotation, 0)}，在 ${VP} − ${VD} 上是 ${fmt(k.difference, 0)}，在 ${VM} 上是 ${fmt(k.mul, 0)}，符号 (2, 1)，所以它不是紧的；其复化的紧实形是 𝔰𝔲(2) ≅ 𝔰𝔭(1) = T₁𝕋₃（文献结果）。`,
        `The largest floating-point residues of the three brackets over ${ANGLES} angles are ${residues(' and ')}. On ℝP¹, ${VP}, ${VD} and ${VM} span 𝔰𝔩(2, ℝ) ≅ 𝔰𝔬(2, 1): the Killing form is ${fmt(k.rotation, 0)} on the rotation ${VP} + ${VD}, ${fmt(k.difference, 0)} on ${VP} − ${VD} and ${fmt(k.mul, 0)} on ${VM}, signature (2, 1), so it is not compact; the compact real form of its complexification is 𝔰𝔲(2) ≅ 𝔰𝔭(1) = T₁𝕋₃ (literature).`
      );
    }
    if (s === 'clock') {
      const fromKappa = tauOfKappa(m);
      return L(
        `1/4, 1/2, 1, 2, 4, 8：每步 Δτ = ln 2 ${irr(LN2)}，相对增量 δ = (2x − x)/(2x) = ${fstr(DELTA)}，局部凯莱步保真 κ(1, Q(δ·i)) = 1/(1 + δ²) ${cayleyRel()}，都与 x 无关。经线上相邻两点的 κ 是另一个量，不是常数：${steps('、')}（1 → 2 → 4 → 8 是后三个，趋于 1）。τ = ½ ln((1 − κ)/κ) ${fromKappa}。`,
        `1/4, 1/2, 1, 2, 4, 8: every step has Δτ = ln 2 ${irr(LN2)}, relative increment δ = (2x − x)/(2x) = ${fstr(DELTA)} and local Cayley step fidelity κ(1, Q(δ·i)) = 1/(1 + δ²) ${cayleyRel()}, whatever x is. The κ of neighbouring points of the meridian is another quantity and not constant: ${steps(', ')} (1 → 2 → 4 → 8 are the last three, tending to 1). τ = ½ ln((1 − κ)/κ) ${fromKappa}.`
      );
    }
    const counted = (sep, none) => m.prime.counted.join(sep) || none;
    return L(
      `X ${XRel(m)} 以内的素数幂：${counted('、', '无')}，共 ${m.prime.count} 个，ψ ${psiRel(m)}。环 γ<sub>p</sub> 画在高度 ln p，周长正比于 ln p；m 重绕圈 γ<sub>p</sub><sup>m</sup> 画在 m ln p，是一条闭合缆线。命名的是 p = 2、3、5、7，细环 11、13 补全 X ≤ ${XMAX} 的计数。`,
      `Prime powers up to X ${XRel(m)}: ${counted(', ', 'none')}, ${m.prime.count} in all, ψ ${psiRel(m)}. The loop γ<sub>p</sub> is drawn at height ln p with circumference proportional to ln p; the m-fold winding γ<sub>p</sub><sup>m</sup>, a closed cable, at m ln p. Named are p = 2, 3, 5, 7; the thin loops 11 and 13 complete the count for X ≤ ${XMAX}.`
    );
  }
  const calc = () => compute();
  let syncNotes = null;
  const paint = kit.painter(() => {
    const m = calc(),
      I = instances(m);
    hud(m);
    if (syncNotes) syncNotes(m);
    TRV.hudFit();
    drawStage(m);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail: t ∈ [0, 1], the quantity of the scene ---------- */
  const playBtn = $('playBtn');
  let stopAt = null,
    lastT = 0;
  /** Write the quantity of the scene from the rail. */
  const applyClock = (t) => {
    state[PARAM[state.scene]] = MAP[state.scene].get(t);
  };
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: MAP.scales.rate,
    step: MAP.scales.step,
    max: 1,
    // the readout is written from t itself: kit.clock shows it before onChange has moved the quantity
    format: (t) => {
      const s = state.scene,
        v = MAP[s].get(t);
      if (s === 'scales') return `N ${equals(v)}`;
      const m = compute({ ...state, [PARAM[s]]: v });
      return s === 'prime' ? `X ${XRel(m)}` : s === 'clock' ? `τ ${tauRel(m, 3)}` : `φ ${phiRel(m)}`;
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a card plays from its start up to its still and parks there; the looping clock may wrap past it in one frame
      const wrapped = t < lastT - 1e-9;
      lastT = t;
      if (stopAt != null && c.playing && (t >= stopAt - 1e-12 || wrapped)) {
        const s = stopAt;
        stopAt = null;
        c.pause();
        c.set(s);
        return;
      }
      if (!c.playing) stopAt = null;
      applyClock(t);
      paint();
    }
  });
  /** Put the rail on a value of the quantity without leaving its exact value (a chip, the handle, a slider). */
  function setParam(key, v) {
    v = SNAP[key](v);
    state[key] = v;
    clock.set(MAP[state.scene].t(v), true);
    paint();
  }
  playBtn.addEventListener('click', () => {
    rearm();
    clock.toggle();
  });
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      clock.pause();
      clock.set(0);
    });

  /** ▶ on a card parked on its still plays the sweep again from its start: the rail is rewound before the clock toggles. */
  function rearm() {
    const id = cards.current;
    if (clock.playing || !id || state.scene !== PRESETS[id].scene) return;
    const still = PRESETS[id].still;
    if (Math.abs(clock.t - still) > 1e-9) return;
    clock.set(0, true);
    lastT = 0;
    stopAt = still;
  }
  $('play').addEventListener('click', rearm, true);
  document.addEventListener(
    'keydown',
    (ev) => {
      if (ev.key !== ' ' || ev.metaKey || ev.ctrlKey || ev.altKey || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test((ev.target && ev.target.tagName) || '')) return;
      if (!document.querySelector('.drawer:not([hidden])')) rearm();
    },
    true
  );

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  function setScene(scene, ms) {
    const before = layers();
    state.scene = scene;
    clock.rate = MAP[scene].rate;
    clock.step = MAP[scene].step;
    if (transition) transition.cancel();
    transition = null;
    if (ms > 0 && !TRV.still && !TRV.reduceMotion) {
      state.from = before;
      state.blend = 0;
      const token = {};
      transition = token;
      token.run = kit.tween(
        ms,
        (e) => {
          state.blend = e;
          paint();
        },
        () => {
          if (transition === token) transition = null;
          state.blend = 1;
          state.from = null;
          paint();
        }
      );
      token.cancel = () => {
        token.run.cancel();
        state.blend = 1;
        state.from = null;
      };
    } else {
      state.from = null;
      state.blend = 1;
    }
  }
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. In a cited figure the card stays marked
      (its one-line note follows the live frame), so that the stage keeps its size under the dragged handle. */
  function leave() {
    stopAt = null;
    if (!TRV.figure) cards.mark(null);
    clock.pause();
  }
  /** A control that sets the quantity `key`: it moves the rail when the scene is driven by that quantity. */
  function drive(scenes, key, v) {
    leave();
    if (scenes.includes(state.scene)) setParam(key, v);
    else {
      state[key] = SNAP[key](v);
      paint();
    }
  }
  const nField = kit.field($('nRange'), { fmt: equals, onInput: (v) => drive(['scales'], 'N', clamp(Math.round(v), 6, 36)) });
  const phiField = kit.field($('phiRange'), { fmt: (v) => equals(`${v}°`), onInput: (v) => drive(['meridian', 'flows'], 'phi', v * deg) });
  const lxField = kit.field($('lxRange'), { fmt: (v) => rel(gridX(v), v, 2), onInput: (v) => drive(['clock'], 'phi', 2 * Math.atan(2 ** v)) });
  const xField = kit.field($('xRange'), { fmt: (v) => XRel({ X: v }), onInput: (v) => drive(['prime'], 'X', v) });
  const bumpChips = kit.chips($('bumpChips'), 'bump', (v) => {
    leave();
    state.bump = v === 'on';
    paint();
  });
  const X_OF = { 0: 0, 1: PI / 2, inf: PI, '-1': 1.5 * PI };
  const xChips = kit.chips($('xChips'), 'x', (v) => drive(['meridian', 'flows'], 'phi', X_OF[v]));
  const dyChips = kit.chips($('dyChips'), 'k', (v) => drive(['clock'], 'phi', 2 * Math.atan(2 ** Number(v))));
  const ppChips = kit.chips($('ppChips'), 'n', (v) => drive(['prime'], 'X', Number(v)));
  // the lens renames the picture, changes its overlay and keeps the state; the rail switch and its mirror in the tour bar
  // both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards: notes written from the live frame ---------- */
  const [S_CARD, M_CARD, F_CARD, K_CARD, P_CARD] = Object.keys(PRESETS);
  /** The note of each card for the frame m: [zh, en]; figure: the one short sentence of a cited figure (no sub- or
      superscripts, only what the stage, the title line and the tour bar show). */
  function cardNote(id, m, figure) {
    const r = regime(m),
      g = state.lens === 1;
    if (id === S_CARD) {
      if (figure)
        return [
          `N = ${m.N}：品红平板每缝折 360°/${m.N} ${creaseRel(m)}；青色 x₀、x₁、x₂ 续接成整圈，浮点偏差 ${driftRel(m)}。`,
          `N = ${m.N}: magenta plates crease by 360°/${m.N} ${creaseRel(m)}; the cyan x₀, x₁, x₂ close up, drift ${driftRel(m)}.`
        ];
      return [
        `${g ? '品红的平直切板包住整只球' : '左半球贴着品红的平直切板'}：沿青色经线一整圈要 ${m.N} 块，彼此不连，每缝折 360°/${m.N} ${creaseRel(m)}，N 再大合计也是 360°。${m.bump ? '品红鼓包在脚点各阶导数为 0，小段圆弧看不见它。' : ''}青色的 x₀、x₁ 定下 x₂ = [x₁, x₀, x₁]，一步步续接成闭合的大圆：${m.N} 步后回到 x₀，浮点偏差 ${driftRel(m)}。`,
        `${g ? 'Flat magenta plates wrap the whole sphere' : 'The left half wears flat magenta tangent plates'}: a full ring along the cyan meridian takes ${m.N}, apart from each other, each joint creased by 360°/${m.N} ${creaseRel(m)}, always 360° in all. ${m.bump ? 'The magenta bump has all derivatives 0 at its feet: a small arc does not see it. ' : ''}The cyan x₀, x₁ fix x₂ = [x₁, x₀, x₁] and, step by step, the closed circle: back on x₀ after ${m.N} steps, floating-point drift ${driftRel(m)}.`
      ];
    }
    if (id === M_CARD) {
      const place = `x ${xRel(m)}`,
        jump = jumpRel(Math.max(m.mer.jump0, m.mer.jumpInf));
      if (figure)
        return [
          `${place}，κ ${kRel(m)}：0、1、∞、−1 同在一条青色闭环上，过 ∞ 处没有折角。`,
          `${place}, κ ${kRel(m)}: 0, 1, ∞, −1 lie on one cyan loop, with no corner at ∞.`
        ];
      return [
        `青色经线从下方的 0（κ = 1）经右侧的 1（κ = 1/2）到上方的 ∞（κ = 0），再从左侧的 −1 回到 0：一条闭合的圆。琥珀手柄在 ${place}，κ ${kRel(m)}，粗的青色弧是它走过的路；两极处两侧单位割线（步长 ${SECANTS()}）只差 ${jump}，随步长趋于 0，度量没有奇点。`,
        `The cyan meridian runs from 0 (κ = 1, bottom) through 1 (κ = 1/2, right) to ∞ (κ = 0, top) and back through −1: one closed circle. The amber handle is at ${place}, κ ${kRel(m)}, the thick cyan arc is its path; at the poles the one-sided unit secants (step ${SECANTS()}) differ by only ${jump}, which vanishes with the step, and the metric has no singularity.`
      ];
    }
    if (id === F_CARD) {
      const at = `φ ${phiRel(m)}`;
      if (figure)
        return g
          ? [`${at}：只留品红的 V₊ ${plusRel(m)}，宽度不再均匀，到 ∞ 处停住。`, `${at}: the magenta V₊ ${plusRel(m)} alone is uneven and stops at ∞.`]
          : [`${at}：品红 V₊ 与紫色 V÷ 合起来处处是 2；青色 V× ${mulRel(m)}，两极处为 0。`, `${at}: magenta V₊ plus violet V÷ is 2 all round; the cyan V× ${mulRel(m)}, 0 at both poles.`];
      return [
        g
          ? `略去紫色的 ${VD}，只剩品红的加法流 ${VP} = 1 + cos φ：圈的宽度不再均匀，与匀速差 cos φ ${cosRel(m)}，到 ∞ 处 ${VP} = 0，停住。青色箭头 ${VM} 不变。`
          : `外圈处处等宽：品红的 ${VP} = 2κ 与紫色的 ${VD} = 2(1 − κ) 合起来恒为 2，所以 ½(${VP} + ${VD}) = 1 是匀速转动（外侧等长的青色箭头）。内侧青色箭头 ${VM} = sin φ（x ≥ 0 时是两者的几何平均 2√(κ(1 − κ))）两半都指向 ∞：x = 1 处是 1，0 与 ∞ 处为 0。`,
        g
          ? `Without the violet ${VD} only the magenta addition flow ${VP} = 1 + cos φ is left: the ring is no longer of even width, off the uniform speed by cos φ ${cosRel(m)}, and at ∞, ${VP} = 0, it stops. The cyan arrows ${VM} stay.`
          : `The outer ring has constant width: magenta ${VP} = 2κ plus violet ${VD} = 2(1 − κ) is always 2, so ½(${VP} + ${VD}) = 1 is uniform rotation (equal cyan arrows outside). Inside, the cyan ${VM} = sin φ (on x ≥ 0 their geometric mean 2√(κ(1 − κ))) points to ∞ on both halves: 1 at x = 1, zero at 0 and ∞.`
      ];
    }
    if (id === K_CARD) {
      const at = `x ${xRel(m)}`,
        tau = tauRel(m),
        quarter = `π/2 ${irr(PI / 2)}`,
        step = `ln 2 ${irr(LN2)}`,
        cayley = cayleyRel().replace(`=${NB}`, '');
      if (figure)
        return g
          ? [`${at}，τ ${tau}：品红直线钟把 0 与 ∞ 推到 −∞、+∞；青色弧从 1 到 0 只长 ${quarter}。`, `${at}, τ ${tau}: the magenta straight clock pushes 0 and ∞ to −∞ and +∞; the cyan arc from 1 to 0 is only ${quarter}.`]
          : [`${at}，τ ${tau}：从 1 到 0 是有限的青色弧 ${quarter}；卷线每次翻倍走 ${step}。`, `${at}, τ ${tau}: the cyan arc from 1 to 0 is ${quarter}; on the coil each doubling is ${step}.`];
      return [
        `粗的青色弧从 x = 1 到 x = 0，长 ${quarter}，没有断口；青色的珠 1/4 … 8 往两极挤，因为 ${VM} = sin φ 在那里变成 0（手柄处 ${mulRel(m)}）。${g ? '品红的直线钟 τ = ln x 把两极推到 −∞ 与 +∞，看起来像断口。' : `青色卷线是展开的钟 τ = ln x：每次翻倍转一圈，Δτ = ${step}，相对增量 ${fstr(DELTA)} 的凯莱步保真恒为 ${cayley}。`}`,
        `The thick cyan arc from x = 1 to 0 has length ${quarter} and no tear; the cyan beads 1/4 … 8 crowd towards the poles because ${VM} = sin φ tends to 0 there (${mulRel(m)} at the handle). ${g ? 'The magenta straight clock τ = ln x pushes the poles to −∞ and +∞, which looks like a tear.' : `On the cyan coil, the unwrapped clock τ = ln x, every doubling is one turn, Δτ = ${step}, and the Cayley step of the relative increment ${fstr(DELTA)} reads ${cayley} throughout.`}`
      ];
    }
    // [zh, en, short zh, short en] of where the blade stands
    const w = m.prime.hit,
      jump = w ? `ln ${w.p} ${lnRel(w.ln)}` : '',
      now = w
        ? [`刀片落在 ${gamma(w)} 上，ψ 跳 ${jump}`, `the blade lies on ${gamma(w)} and ψ jumps by ${jump}`, `刀片碰到 ${gamma(w)}，跳 ${jump}`, `the magenta blade meets ${gamma(w)}, +${jump}`]
        : r === 'below'
          ? ['刀片还在 γ₂ 下面', 'the blade is still below γ₂', '刀片还在 γ₂ 下面', 'the magenta blade is below γ₂']
          : ['刀片在两环之间，ψ 不动', 'the blade is between two loops, ψ stays', '刀片在两环之间，不跳', 'the magenta blade is between two loops'];
    if (figure)
      return [
        `X ${XRel(m)}，ψ ${psiRel(m)}：品红${now[2]}；青色的环没有折角。`,
        `X ${XRel(m)}, ψ ${psiRel(m)}: ${now[3]}; the cyan loops have no corner.`
      ];
    return [
      `球壳里青色的闭合环 γ₂、γ₃、γ₅、γ₇ 周长正比于 ln p，画在高度 ln p；m 重绕圈是紫色环面里的闭合缆线，在高度 m ln p。品红的平刀停在 X ${XRel(m)}（高度 ln X）：${now[0]}，ψ ${psiRel(m)}。刀片每碰到一圈读数跳一级，环自己处处光滑。`,
      `Inside the shell the closed cyan loops γ₂, γ₃, γ₅, γ₇ have circumferences proportional to ln p, at height ln p; their m-fold windings are closed cables in violet tori at m ln p. The flat magenta blade stands at X ${XRel(m)} (height ln X): ${now[1]}, ψ ${psiRel(m)}. The reading jumps at every loop; the loops are smooth.`
    ];
  }
  const IDLE = [
    '自由探索：拖琥珀手柄、时间轴或右栏的控件改本场景的量，换透镜，或拖空白处转视角。随时可以再选一张卡。',
    'Free play: drag the amber handle, the rail or the controls of the right column to set the quantity of the scene, switch the lens, or drag empty space to orbit. Pick a card again at any time.'
  ];
  function applyPreset(id) {
    const p = PRESETS[id];
    stopAt = null;
    clock.pause();
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    if (p.bump != null) state.bump = p.bump;
    sc.view(cams[p.scene], booting || TRV.still ? 0 : 600);
    // a still, a reader who asked for reduced motion and a freshly opened page (the lab, an embed, a cited figure) park on
    // the declared frame, the one the caption names; ▶ then plays the sweep from its start (rearm)
    const parked = TRV.still || TRV.reduceMotion || !p.play || booting;
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    }
    paint();
  }
  const notesObj = Object.fromEntries(Object.keys(PRESETS).map((id) => [id, ['', '']]));
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: notesObj, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset, idle: IDLE });
  let noteKey = null;
  syncNotes = (m) => {
    const figure = !!TRV.figure,
      id = cards.current;
    // the marked card follows the live frame; the other cards keep the note of their own frame when picked
    if (id) {
      const n = cardNote(id, m, figure);
      notesObj[id][0] = n[0];
      notesObj[id][1] = n[1];
    }
    const key = (id || 'idle') + '|' + (id ? notesObj[id].join('|') : '') + '|' + state.lens;
    if (key === noteKey) return;
    noteKey = key;
    cards.mark(id);
  };
  const tourBody = $('tourBody');
  const markStep = () => {
    const b = tourBody.querySelector('b');
    if (b && b.id !== 'tourStep') b.id = 'tourStep';
  };
  if (window.MutationObserver) new MutationObserver(markStep).observe(tourBody, { childList: true });

  /* ---------- the amber handle: drag the point of the scene, or arrow keys ---------- */
  const viewportPoint = (p) => {
    const q = sc.p(p),
      b = $('cv').getBoundingClientRect();
    return { x: b.left + q[0], y: b.top + q[1] };
  };
  /** The candidates of a drag: [world point, value] along the path the handle can take. */
  function dragPath() {
    const s = state.scene;
    if (s === 'scales') return Array.from({ length: 31 }, (_, k) => [M(PHI0 + TAU / (6 + k)), 6 + k]);
    if (s === 'prime') return Array.from({ length: 291 }, (_, k) => [bladeEdge(XMIN + k / 20), snapX(XMIN + k / 20)]);
    if (s === 'clock')
      return Array.from({ length: 961 }, (_, k) => {
        const p = 2 * Math.atan(2 ** ((k / 960) * 2 * LX - LX));
        return [M(p), p];
      });
    return Array.from({ length: 1441 }, (_, k) => [M((k / 1440) * TAU), (k / 1440) * TAU]);
  }
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
      y = ev.clientY - b.top,
      key = PARAM[state.scene],
      cur = state[key];
    let best = cur,
      gap = Infinity;
    for (const [pt, v] of dragPath()) {
      const p = sc.p(pt),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(v - cur) * 1e-6;
      if (d < gap) {
        gap = d;
        best = v;
      }
    }
    if (best !== cur) setParam(key, best);
  };
  handle.onpointerup = (ev) => {
    if (handle.hasPointerCapture(ev.pointerId)) handle.releasePointerCapture(ev.pointerId);
  };
  handle.onpointercancel = handle.onpointerup;
  handle.onlostpointercapture = () => {
    dragging = null;
    frozenFit = null;
    handle.classList.remove('dragging');
    paint();
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(1);
    else clock.stepBy(up ? 1 : -1);
  };
  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  const FRAME = { scene: 'scales', N: 18, phi: 1.5 * PI, X: 7, bump: true },
    NS = [0, 1].map(MAP.scales.get), // the plates of the rail
    PLACES = 24; // the base points of the meridian
  function benchmarks() {
    const run = (patch) => {
        const m = compute({ ...FRAME, ...patch });
        return { m, I: instances(m) };
      },
      { m, I } = run({}),
      turns = Array.from({ length: NS[1] - NS[0] + 1 }, (_, k) => run({ N: NS[0] + k })),
      places = Array.from({ length: PLACES }, (_, k) => run({ phi: snapPhi((TAU * k) / PLACES) })),
      all = [...turns, ...places],
      worst = (list, f) => Math.max(...list.map(f)),
      ly = lie();
    return {
      m,
      I,
      dyadic: DYADIC.map((q) => ({ label: q.label, m: compute({ ...FRAME, phi: q.phi }) })),
      drift: {
        closure: worst(turns, (x) => x.m.scales.closure),
        cheb: worst(turns, (x) => x.I.cheb.gap),
        equiv: worst(places, (x) => x.I.equiv),
        dist: worst(places, (x) => x.I.dist),
        tri: worst(turns, (x) => x.I.tri),
        cross: I.cross.gap,
        invariant: I.cross.invariant,
        balanced: worst(places, (x) => Math.max(x.I.skew.unitary, x.I.skew.halves)),
        skew: worst(places, (x) => x.I.skew.skew),
        compat: worst(places, (x) => x.I.charge.compat),
        charge: worst(all, (x) => x.I.charge.gap),
        unit: worst(places, (x) => x.I.zero.unit),
        visible: worst(places, (x) => x.I.lifts.visible),
        cocycle: worst(places, (x) => x.I.lifts.cocycle),
        tower: worst(places, (x) => x.I.lifts.tower),
        r1: ly.r1,
        r2: ly.r2,
        r3: ly.r3,
        mean: ly.mean,
        geo: ly.geo,
        psi: Math.max(...INTEGERS.map((n) => Math.abs(psi(n) - Math.log(lcmTo(n)))))
      }
    };
  }
  const BENCH = benchmarks();
  /** ψ(X) = ln lcm(1, …, X) of the frame, once the sum of logarithms agrees with it. */
  const psiLaw = () => `ψ(${XName(BENCH.m)}) ${BENCH.drift.psi <= 1e-9 ? `= ln ${lcmTo(Math.floor(BENCH.m.X))} ` : ''}${psiRel(BENCH.m)}`;
  const jumpLaw = () => `ln ${BENCH.m.prime.hit.p} ${lnRel(BENCH.m.prime.jump)}`;
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    quarter: () => irr(PI / 2),
    ln2: () => irr(LN2),
    cayley: cayleyRel,
    steps: (say) => STEPS.slice(2).map(stepName).join(say('、', ', ')),
    blade: (say) => `X ${XRel(BENCH.m)}${say('：', ': ')}${psiLaw()}`
  };
  /** The text of the NUM box. */
  function numText(say) {
    const { m, I, dyadic, drift } = BENCH,
      A = I.arith,
      N = m.N,
      ly = lie(),
      list = (xs) => xs.join(say('、', ', ')),
      ps = list(NAMED),
      d = (key) => `${say('，浮点偏差', ', drift')} ${below(drift[key])}`,
      arcs = list(dyadic.map((q) => phiRel(q.m, 2))),
      kappas = list(dyadic.map((q) => nameOf(exactOf(q.m.phi).kappa, q.m.mer.kappa))),
      marks = list(dyadic.map((q) => q.label)),
      neighbours = list(STEPS.map(stepName)),
      loops = list(NAMED.map((p) => `ln ${p} ${irr(Math.log(p))}`)),
      killing = list([ly.killing.rotation, ly.killing.difference, ly.killing.mul].map((x) => fmt(x, 0))),
      [up, down] = A.closest,
      jumps = [m.mer.jump0, m.mer.jumpInf].map(jumpRel);
    return say(
      `打开页面时由脚本现算，不检验各条定理的前提。切板 N = ${N}：每缝折 360°/${N} ${creaseRel(m)}，合计 ${sumRel(m)}，角外伸 sec(π/${N}) − 1 ${irr(m.scales.corner)}，κ(x₀, x₁) = cos²(π/${N}) ${arcRel(m)}，鼓包 B(1/2) ${idRel(1, m.scales.bumpHalf)}、B(1/10) ${approx(sci(m.scales.bumpTenth))}。N = ${NS[0]} … ${NS[1]} 各续接 N 步回到 x₀${d('closure')}；与 Uₙ、Tₙ 及模方 1 逐项比较到 n = N${d('cheb')}。单位四元数模型里，${UNITS.length - 2} 组固定的三元组与经线上 ${PLACES} 个基点 o：u(x) = o⁻¹x 前后的括号与 κ${d('equiv')}；κ 与 1 − dist²/4（经线上 ${POINTS} 个点，对 1 与 o）${d('dist')}；[x₁, x₀, x₁] 与 ${BASES} 个基点群里的 x₁ · x₀⁻¹ · x₁${d('tri')}；纯四元数的 ab − ba 与 ${I.cross.c} 倍叉积${d('cross')}；点积的 ad 不变性${d('invariant')}；A = 1/√2、B = n/√2（n = cos φ·i + sin φ·j）的 S S† = 1 与 A A† = B B† = 1/2${d('balanced')}；(A B†)† + A B† 与 0${d('skew')}。线程 z<sub>m</sub> = exp((ln 2 + iφ)/m)（m = 1 … ${THREAD}）的相容${d('compat')}；m·ln‖z<sub>m</sub>‖ 与 ln 2${d('charge')}；荷 0 的线程 exp(iφ/m) 的模与 1${d('unit')}；三个提升 θ<sub>m</sub> = (φ/360° + k<sub>m</sub>)/m（k 为 0、1 与 1! + 2! + 3! + … 的余数，m = 1 … ${LIFT}）的投影${d('visible')}；上链律${d('cocycle')}；各级相容${d('tower')}。|·|<sub>∞</sub> 与 |·|<sub>p</sub>（p = ${ps}）的 ${A.pairs} 对里分开 ${A.apart} 对；乘积公式用整数核对 ${A.fractions} 个分数 a/b（a、b 取 1 … ${HEIGHT}），不合 ${A.product} 个；同余与闭球比较 ${A.fibreTests} 次（x = 1，p = ${ps}，k = 0 … ${DEPTH}，y = −${REACH} … ${REACH}），不合 ${A.fibre} 次；s = 2、截到 ${CUT}：级数 ${irr(A.series)}，乘积 ${irr(A.euler)}，π²/6 ${irr(A.zeta2)}；2<sup>a</sup>3<sup>b</sup>5<sup>c</sup>7<sup>d</sup> = 1 用整数核对 ${A.vectors} 组非零指数（−${EXPONENT} … ${EXPONENT}），成立 ${A.relations} 组，最接近的一组是 ${up} 对 ${down}；${A.characters} 个非平凡特征沿 g, g², …, g<sup>${CUT}</sup>（g 的坐标是 e<sup>2πi ln p</sup>）的平均，模最大 ${irr(A.weyl)}。闭圆：${CHORDS} 段弦长之和 ${irr(m.mer.length)}，比 2π ${irr(TAU)} 少 ${approx(sci(TAU - m.mer.length))}；从 x = 1 到 x = 0 的弧 π/2 ${irr(PI / 2)}；两侧单位割线（步长 ${SECANTS()}）之差在 0 处 ${jumps[0]}、在 ∞ 处 ${jumps[1]}。${ANGLES} 个角上：[V₊, V÷] − 2V×${d('r1')}；[V×, V₊] + V₊${d('r2')}；[V×, V÷] − V÷${d('r3')}；½(V₊ + V÷) − 1${d('mean')}；V×² − V₊V÷${d('geo')}；基灵型在 V₊ + V÷、V₊ − V÷、V× 上是 ${killing}。翻倍 x = ${marks}：φ ${arcs}；κ = ${kappas}；相邻两点 κ = ${neighbours}；每步 Δτ = ln 2 ${irr(LN2)}，凯莱步 1/(1 + δ²) ${NUMBERS.cayley()}（δ = ${fstr(DELTA)}）。环长 ${loops}；${NUMBERS.blade(say)}，跳 ${jumpLaw()}；ψ(X) 与 ln lcm(1, …, X)（X = 1 … ${XMAX}）${d('psi')}。数值演示，不是证明。`,
      `Computed by the script when the page opens, without checking the hypotheses of the theorems; every drift is a floating-point one. Plates N = ${N}: crease 360°/${N} ${creaseRel(m)}, total ${sumRel(m)}, corner stand-off sec(π/${N}) − 1 ${irr(m.scales.corner)}, κ(x₀, x₁) = cos²(π/${N}) ${arcRel(m)}, bump B(1/2) ${idRel(1, m.scales.bumpHalf)}, B(1/10) ${approx(sci(m.scales.bumpTenth))}. For N = ${NS[0]} … ${NS[1]}, N steps back to x₀${d('closure')}; against Uₙ, Tₙ and squared norm 1 up to n = N${d('cheb')}. In the unit-quaternion model, ${UNITS.length - 2} fixed triples and ${PLACES} base points o of the meridian: the bracket and κ before and after u(x) = o⁻¹x${d('equiv')}; κ against 1 − dist²/4 (${POINTS} points of the meridian, to 1 and to o)${d('dist')}; [x₁, x₀, x₁] against x₁ · x₀⁻¹ · x₁ in the groups at ${BASES} base points${d('tri')}; ab − ba of pure quaternions against ${I.cross.c} times the cross product${d('cross')}; ad-invariance of the dot product${d('invariant')}; A = 1/√2, B = n/√2 (n = cos φ·i + sin φ·j): S S† = 1 and A A† = B B† = 1/2${d('balanced')}; (A B†)† + A B† against 0${d('skew')}. The thread z<sub>m</sub> = exp((ln 2 + iφ)/m), m = 1 … ${THREAD}: compatibility${d('compat')}; m·ln‖z<sub>m</sub>‖ against ln 2${d('charge')}; moduli of the thread exp(iφ/m) of charge 0 against 1${d('unit')}; three lifts θ<sub>m</sub> = (φ/360° + k<sub>m</sub>)/m (k equal to 0, 1 and the residues of 1! + 2! + 3! + …, m = 1 … ${LIFT}): projections${d('visible')}; cocycle law${d('cocycle')}; compatibility${d('tower')}. Of the ${A.pairs} pairs of |·|<sub>∞</sub> and |·|<sub>p</sub> (p = ${ps}), told apart: ${A.apart}; product formula in integers on ${A.fractions} fractions a/b (a, b = 1 … ${HEIGHT}), failures: ${A.product}; congruence against closed ball, ${A.fibreTests} comparisons (x = 1, p = ${ps}, k = 0 … ${DEPTH}, y = −${REACH} … ${REACH}), mismatches: ${A.fibre}; s = 2 cut at ${CUT}: series ${irr(A.series)}, product ${irr(A.euler)}, π²/6 ${irr(A.zeta2)}; 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup>7<sup>d</sup> = 1 in integers on ${A.vectors} nonzero exponents (−${EXPONENT} … ${EXPONENT}), solutions: ${A.relations}, the closest pair being ${up} and ${down}; averages of ${A.characters} nontrivial characters along g, g², …, g<sup>${CUT}</sup> (coordinates e<sup>2πi ln p</sup> of g), largest modulus ${irr(A.weyl)}. The closed circle: ${CHORDS} chords add to ${irr(m.mer.length)}, short of 2π ${irr(TAU)} by ${approx(sci(TAU - m.mer.length))}; the arc from x = 1 to x = 0, π/2 ${irr(PI / 2)}; one-sided unit secants (step ${SECANTS()}) differ by ${jumps[0]} at 0 and ${jumps[1]} at ∞. At ${ANGLES} angles: [V₊, V÷] − 2V×${d('r1')}; [V×, V₊] + V₊${d('r2')}; [V×, V÷] − V÷${d('r3')}; ½(V₊ + V÷) − 1${d('mean')}; V×² − V₊V÷${d('geo')}; Killing form on V₊ + V÷, V₊ − V÷, V×: ${killing}. Doublings x = ${marks}: φ ${arcs}; κ = ${kappas}; neighbouring κ = ${neighbours}; every step Δτ = ln 2 ${irr(LN2)}, Cayley step 1/(1 + δ²) ${NUMBERS.cayley()} (δ = ${fstr(DELTA)}). Loop lengths ${loops}; ${NUMBERS.blade(say)}, jump ${jumpLaw()}; ψ(X) against ln lcm(1, …, X) (X = 1 … ${XMAX})${d('psi')}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [['zh', ZH], ['en', EN]]) {
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
    for (const el of document.querySelectorAll(`#drawer .${lang} [data-bench]`)) el.innerHTML = NUMBERS[el.dataset.bench](say);
  }
  // the drawer repeats every evidence box of the panel
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(() => {
    noteKey = null;
    paint();
  });

  /* ---------- probe, cover, start ---------- */
  window.MANIFOLD_DEBUG = Object.freeze({
    get state() {
      const m = calc(),
        I = instances(m);
      return JSON.parse(
        JSON.stringify(
          {
            ...m,
            regime: regime(m),
            lens: state.lens,
            layers: layers(),
            t: clock.t,
            playing: clock.playing,
            preset: cards.current,
            blending: !!(state.from && state.blend < 1),
            camera: { ...sc.cam },
            handle: handleWorld(m),
            lie: lie(),
            steps: STEPS,
            dyadic: DYADIC,
            leanInstances: I
          },
          (k, v) => (v === Infinity ? '∞' : v === -Infinity ? '−∞' : v)
        )
      );
    },
    /** The three flows at φ (radians): V₊, V÷, V×. */
    flows: (p) => [FLOW.plus[0](p), FLOW.div[0](p), FLOW.mul[0](p)],
    /** The bump profile and the radius of the bumped curve. */
    bump: (u) => bump(u),
    /** The plates of N: centre normals, rows and corners. */
    plates: (N) => JSON.parse(JSON.stringify(plates(N))),
    /** The prime powers up to 16 and the loops of the stage (world points). */
    powers: () => JSON.parse(JSON.stringify(POWERS)),
    loop: (p, m, n) => loopPoints(p, m, n),
    psi: (X) => psi(X),
    coil: (tau) => coil(tau),
    /** The numbers behind the NUM box and the drawer. */
    bench: () => JSON.parse(JSON.stringify({ frame: { N: FRAME.N, phi: FRAME.phi, X: FRAME.X }, places: PLACES, drift: BENCH.drift, arith: BENCH.I.arith })),
    /** The printed relation of a fraction [p, q] (or null) and a double: q, x, decimals. */
    relation: (q, x, d) => rel(q && frac(...q), x, d).replaceAll(NB, ' '),
    below: (x) => below(x).replace('&lt;', '<').replaceAll(NB, ' '),
    presets: JSON.parse(JSON.stringify(PRESETS)),
    /** Viewport coordinates of a world point of the stage, for drag targets. */
    project: viewportPoint,
    /** Where the handle would sit for a value of the quantity of the scene. */
    handleAt: (v) => {
      const s = state.scene;
      if (s === 'scales') return viewportPoint(M(PHI0 + TAU / v));
      if (s === 'prime') return viewportPoint(bladeEdge(v));
      return viewportPoint(M(v));
    }
  });
  window.TRV_THUMB = () => {
    // the cover: the scale armour on the left half against the closed cyan circle
    cards.pick(DEFAULT);
    clock.pause();
    clock.set(MAP.scales.t(18));
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
