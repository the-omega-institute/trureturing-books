/* OMEGA//FINITE · 无无穷·无超越数的有限有理数学 · infinity-free, transcendental-free rational mathematics (Chapter 32, §32.7)
   World (kit.solid): x right, y away from the reader, z up. On the cards loop, escape, cheb and jet the ball is the great
   two-sphere slice {w + xi + yj} of the unit quaternions S³(1) = 𝕋₃ and w + xi + yj is drawn at (x, −y, −w): the lower pole is
   1 (κ = 1) and the upper pole −1 (κ = 0). On the card cayley the ball is the unit sphere of directions v ∈ ℝ³.
     loop     [P : Q] runs once round the rational circle C([P : Q]) = ((Q² − P²)/(Q² + P²), 2PQ/(Q² + P²)); the sight line
              from −1 lands on the flat ruler below at 2x, x = P/Q, and runs parallel to it at [1 : 0];
     escape   the rational points of the slice with denominators up to M, the squares of Euclid for a fraction x, and the
              rings of the primes of S: the product stands on slot 0 of every ring, the product plus one on slot 1, and its
              least prime factor q opens a ring of its own;
     cayley   R(σ)^N v₀ with R = (I − X)⁻¹(I + X) against exp₂(X)^N v₀, X = [σ]×;
     cheb     the heap recurrence x_{t+1} = x_t x̄_{t−1} x_t from 1 and (3 + 4i)/5, its wave κ_t, and the Euler steps 1 + iΔθ;
     jet      κ(x + η) in ℚ[η]/(η³) on the witch of Agnesi with its tangent, osculating circle and secant; on the ball a
              coarse chain x₀ → x₃ with its tetrahedron.
   The rail is [P : Q] (as a parameter t ∈ [0, 4]), the beat of the escape, N, t or x; a rail value is a whole number or
   lies on the grid of 1/240, so every state is rational. Fractions are pairs of big integers [p, q], q > 0. Every number
   is computed here; a number is printed after “=” only when the printed decimal is the value, decided on fractions, and
   after “≈” when it rounds it. Read-only probe: window.FINITE_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI;
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
  const unit = (a) => scale(a, 1 / norm(a));
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

  /* ---------- exact numbers: fractions [p, q] of big integers, q > 0 ---------- */
  const mag = (n) => (n < 0n ? -n : n);
  const gcd = (a, b) => {
    let [x, y] = [mag(a), mag(b)];
    while (y) [x, y] = [y, x % y];
    return x;
  };
  const frac = (p, q = 1n) => {
    const g = gcd(p, q) * (q < 0n ? -1n : 1n);
    return [p / g, q / g];
  };
  const whole = (n) => [BigInt(n), 1n],
    plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    quo = ([a, b], [c, d]) => frac(a * d, b * c),
    neg = ([a, b]) => [-a, b];
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const equal = (a, b) => cmp(a, b) === 0;
  const total = (xs) => xs.reduce(plus, [0n, 1n]);
  const ZERO = whole(0),
    ONE = whole(1),
    TWO = whole(2),
    HALF = frac(1n, 2n);
  /** The double x itself: an integer over a power of two. */
  const ratio = (x) => {
    let s = 0n;
    for (; !Number.isInteger(x); s++) x *= 2;
    return frac(BigInt(x), 1n << s);
  };
  const power = (q, n) => [q[0] ** BigInt(n), q[1] ** BigInt(n)];
  const pow10 = (e) => (e < 0 ? [1n, 10n ** BigInt(-e)] : [10n ** BigInt(e), 1n]);
  /** A fraction as a double: its first 64 bits, then the power of two in two steps. */
  const fval = ([p, q]) => {
    if (p === 0n) return 0;
    const a = mag(p),
      shift = q.toString(2).length - a.toString(2).length + 64,
      m = Number(shift >= 0 ? (a << BigInt(shift)) / q : a / (q << BigInt(-shift))),
      half = Math.trunc(shift / 2);
    return (p < 0n ? -m : m) * 2 ** -half * 2 ** (half - shift);
  };
  const sgn = (n) => String(n).replace('-', '−');
  const fstr = ([p, q]) => sgn(p) + (q === 1n ? '' : '/' + q);
  const parse = (s) => {
    const [p, q = '1'] = s.split('/');
    return frac(BigInt(p), BigInt(q));
  };
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = mag(p) * 10n ** BigInt(d),
      k = (2n * a + q) / (2n * q),
      s = String(k).padStart(d + 1, '0');
    return { text: (p < 0n && k > 0n ? '−' : '') + s.slice(0, s.length - d) + (d ? '.' + s.slice(s.length - d) : ''), exact: a === k * q };
  }
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]);
  const subscript = (n) => String(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  /** d + 1 significant digits with a power of ten. */
  const sci = (x, d = 3) => {
    const [m, e] = x.toExponential(d).split('e').map(Number);
    return `${kit.fix(m, d)}×10${superscript(e)}`;
  };
  /* The relation before a printed number, one rule for the whole page. “=” stands before digits that are the value itself;
     digits that only round the value stand after “≈”. A value that is not one of the landmarks 0, 1/2, 1 never prints as one
     of them. An inequality of the page stands between exact expressions; the value follows it in a parenthesis of its own. */
  const LANDMARKS = [
    [0, ''],
    [0.5, '1/2'],
    [1, '1']
  ];
  /** q: the value as a fraction, or null when it is irrational; x: the value as computed, a double. A fraction counts only
      while the computed double agrees with it: a page that computes something else says what it computes. */
  function rel(q, x, d = 4) {
    if (q && !(Math.abs(fval(q) - x) <= 1e-9 * Math.max(1, Math.abs(x)))) q = null;
    const { text, exact } = q ? decimals(q, d) : { text: fmt(x, d), exact: false };
    if (exact) return `= ${text}`;
    const mark = LANDMARKS.find(([v]) => Math.abs(Number(text.replace('−', '-'))) === v);
    if (mark) {
      const [v, name] = mark,
        s = text.startsWith('−') ? -1 : 1,
        gap = q ? fval(minus(q, ratio(s * v))) : x - s * v;
      if (gap !== 0) return name ? `≈ ${s < 0 ? '−' : ''}${name} ${gap < 0 ? '−' : '+'} ${sci(Math.abs(gap))}` : `≈ ${sci(gap)}`;
    }
    return `≈ ${text}`;
  }
  /** A fraction that is its own value. */
  const relQ = (q, d = 4) => rel(q, fval(q), d);
  /** “= 1/2 = 0.5000”, “= 16/41 ≈ 0.3902”, “= 1.0000” of a whole number; a long fraction gives its decimals alone. */
  const named = (q, most = 24) => (q[1] === 1n || fstr(q).length > most ? relQ(q) : `= ${fstr(q)} ${relQ(q)}`);
  /** After “·”, “,” or a brace an exact fraction stands alone; a long one by its rounded decimals. */
  const brief = (q, most = 17) => (fstr(q).length <= most ? fstr(q) : relQ(q).replace(/^= /, ''));
  /** A numerator over a power of the base: 32125393/5¹². */
  function overPower([p, q], base) {
    let e = 0;
    for (let r = q; r > 1n && r % BigInt(base) === 0n; r /= BigInt(base)) e++;
    return e > 1 && BigInt(base) ** BigInt(e) === q ? `${sgn(p)}/${base}${superscript(e)}` : fstr([p, q]);
  }
  /** Both languages of a sentence: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  /** A formula that stays on one line. */
  const nb = (html) => `<span class="nb">${html}</span>`;
  /** An exact inequality, then its value in a parenthesis of its own. */
  const valued = (law, r, say = L) => nb(law) + say(`（值\u00a0${r}）`, ` (value\u00a0${r})`);

  /* ---------- rational vectors, matrices and quaternions ---------- */
  const dotQ = (a, b) => total(a.map((x, i) => times(x, b[i])));
  const addQ = (a, b) => a.map((x, i) => plus(x, b[i]));
  const subQ = (a, b) => a.map((x, i) => minus(x, b[i]));
  const scaleQ = (a, k) => a.map((x) => times(x, k));
  const sameQ = (a, b) => a.every((x, i) => equal(x, b[i]));
  const num = (v) => v.map(fval);
  const ints = (...xs) => xs.map(whole);
  const tuple = (v) => `(${v.map(fstr).join(', ')})`;
  const IDENT = range(3).map((i) => range(3).map((j) => (i === j ? ONE : ZERO)));
  const matMul = (A, B) => A.map((row) => B[0].map((_, j) => total(row.map((x, k) => times(x, B[k][j])))));
  const matVec = (A, v) => A.map((row) => dotQ(row, v));
  const matAdd = (A, B) => A.map((row, i) => addQ(row, B[i]));
  const matSub = (A, B) => A.map((row, i) => subQ(row, B[i]));
  const matScale = (A, k) => A.map((row) => scaleQ(row, k));
  const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
  const sameM = (A, B) => A.every((row, i) => sameQ(row, B[i]));
  const minor = (A, i, j) => {
    const r = [0, 1, 2].filter((k) => k !== i),
      c = [0, 1, 2].filter((k) => k !== j);
    return minus(times(A[r[0]][c[0]], A[r[1]][c[1]]), times(A[r[0]][c[1]], A[r[1]][c[0]]));
  };
  const det3 = (A) => total([0, 1, 2].map((j) => times(j % 2 ? neg(A[0][j]) : A[0][j], minor(A, 0, j))));
  /** The inverse by cofactors. */
  function inverse(A) {
    const d = det3(A);
    return range(3).map((i) => range(3).map((j) => quo((i + j) % 2 ? neg(minor(A, j, i)) : minor(A, j, i), d)));
  }
  const skew = ([a, b, c]) => [
    [ZERO, neg(c), b],
    [c, ZERO, neg(a)],
    [neg(b), a, ZERO]
  ];
  /** R(σ) = (I − X)⁻¹(I + X), X = [σ]×. */
  const rotor = (s) => matMul(inverse(matSub(IDENT, skew(s))), matAdd(IDENT, skew(s)));
  const mulQ = (a, b) => {
    const t = (i, j) => times(a[i], b[j]);
    return [minus(minus(minus(t(0, 0), t(1, 1)), t(2, 2)), t(3, 3)), minus(plus(plus(t(0, 1), t(1, 0)), t(2, 3)), t(3, 2)), plus(plus(minus(t(0, 2), t(1, 3)), t(2, 0)), t(3, 1)), plus(minus(plus(t(0, 3), t(1, 2)), t(2, 1)), t(3, 0))];
  };
  const conjQ = ([w, x, y, z]) => [w, neg(x), neg(y), neg(z)];
  const QONE = ints(1, 0, 0, 0);
  /** The reading κ(x, y) = (1 + ⟨x, y⟩)/2. */
  const kappaQ = (x, y) => times(HALF, plus(ONE, dotQ(x, y)));
  const tri = (x, y, z) => mulQ(mulQ(x, conjQ(y)), z);

  /* ---------- card 1: the projective pair [P : Q] and the rational circle ---------- */
  const GRID = 240;
  /** The pair of the rail value k/240 on the boundary of the square max(|P|, |Q|) = 240, reduced, Q > 0 or [1 : 0]. */
  function pairOf(k) {
    let [p, q] = k <= GRID ? [k, GRID] : k <= 3 * GRID ? [GRID, 2 * GRID - k] : [4 * GRID - k, -GRID];
    if (q < 0 || (q === 0 && p < 0)) [p, q] = [-p, -q];
    const g = gcd(BigInt(p), BigInt(q));
    return [BigInt(p) / g, BigInt(q) / g];
  }
  /** κ, s and C of a pair: the denominators are P² + Q², never 0. */
  function readPair([p, q]) {
    const d = p * p + q * q;
    return { P: p, Q: q, den: d, kappa: frac(q * q, d), spread: frac(p * p, d), C: [frac(q * q - p * p, d), frac(2n * p * q, d)], x: q === 0n ? null : frac(p, q) };
  }
  /** The pair of a point of the rational circle: [c₂ : 1 + c₁], and [1 : 0] of (−1, 0). */
  function pairBack([c1, c2]) {
    if (equal(c1, whole(-1))) return [1n, 0n];
    const r = quo(c2, plus(ONE, c1));
    return [r[0], r[1]];
  }
  /** ℚP¹ with max(|P|, |Q|) ≤ M, one pair for each scale. */
  function scales(M) {
    const out = [[1n, 0n]];
    for (let q = 1n; q <= M; q++) for (let p = -BigInt(M); p <= M; p++) if (gcd(p, q) === 1n) out.push([p, q]);
    return out;
  }
  const ANCHORS = [0, 1, 2, 3].map((k) => pairOf(k * GRID));
  const pairText = ([p, q]) => `[${sgn(p)} : ${q}]`;

  /* ---------- card 2: the finite lattice, finite continued fractions, and primes on demand ---------- */
  const M_MAX = 16;
  /** The points (w, x, y)/d of the slice with w² + x² + y² = d² in lowest terms, as [w, x, y, d], d ≤ 16. */
  const NODES = (() => {
    const g2 = (a, b) => (b ? g2(b, a % b) : Math.abs(a)),
      out = [];
    for (let d = 1; d <= M_MAX; d++)
      for (let w = -d; w <= d; w++)
        for (let x = -d; x <= d; x++) {
          const r = d * d - w * w - x * x;
          if (r < 0) continue;
          const y = Math.round(Math.sqrt(r));
          if (y * y !== r || g2(g2(g2(w, x), y), d) !== 1) continue;
          out.push([w, x, y, d]);
          if (y) out.push([w, x, -y, d]);
        }
    return out;
  })();
  const LATTICE = range(M_MAX + 1).map((M) => NODES.filter((n) => n[3] <= M).length);
  const SCALES = range(M_MAX + 1).map((M) => (M ? scales(M).length : 0));
  const floorQ = ([p, q]) => (p >= 0n ? p / q : -((-p + q - 1n) / q));
  /** The list of convergents of the Lean definition: [x] of an integer, else ⌊x⌋ before ⌊x⌋ + 1/z over the next list. */
  function convergents(x) {
    const f = [floorQ(x), 1n];
    if (equal(f, x)) return [f];
    return [f, ...convergents(quo(ONE, minus(x, f))).map((z) => plus(f, quo(ONE, z)))];
  }
  /** The partial quotients of x. */
  function quotients(x) {
    const f = [floorQ(x), 1n];
    return equal(f, x) ? [f[0]] : [f[0], ...quotients(quo(ONE, minus(x, f)))];
  }
  const log2floor = (n) => n.toString(2).length - 1;
  const cfBound = (x) => 2 * log2floor(x[1]) + 1;
  const cfText = (x) => {
    const [a, ...rest] = quotients(x).map(sgn);
    return rest.length ? `[${a}; ${rest.join(', ')}]` : `[${a}]`;
  };
  /** The squares Euclid cuts off a b × a rectangle, a/b = x in (0, 1): [left, bottom, side], in units of 1. */
  function squares(x) {
    let [h, w] = [Number(x[0]), Number(x[1])],
      [l, b] = [0, 0];
    const out = [];
    while (w > 0 && h > 0) {
      const side = Math.min(w, h);
      out.push([l, b, side]);
      if (w >= h) [l, w] = [l + side, w - side];
      else [b, h] = [b + side, h - side];
    }
    return out;
  }
  /** The prime factors of n ≥ 2 in order, by trial division. */
  function factors(n) {
    const out = [];
    for (let d = 2n; d * d <= n; d += d === 2n ? 1n : 2n)
      while (n % d === 0n) {
        out.push(d);
        n /= d;
      }
    if (n > 1n) out.push(n);
    return out;
  }
  function escapeOf(S) {
    const primes = S.map(BigInt),
      product = primes.reduce((a, b) => a * b, 1n),
      N = product + 1n,
      parts = factors(N);
    return { S: primes, product, N, residues: primes.map((p) => N % p), parts, q: parts[0] };
  }
  const setText = (S) => `{${S.join(', ')}}`;
  const factorText = (E) => {
    const groups = [...new Set(E.parts)].map((p) => [p, E.parts.filter((r) => r === p).length]);
    return `${E.N}${E.parts.length > 1 ? ' = ' + groups.map(([p, n]) => p + (n > 1 ? superscript(n) : '')).join(' × ') : ''}`;
  };

  /* ---------- card 3: the rational Cayley rotation and the truncated exponential ---------- */
  const NMAX = 24;
  const SIGMA = [HALF, HALF, ZERO],
    V0 = ints(0, 0, 1);
  const X = skew(SIGMA),
    R = rotor(SIGMA),
    S2 = dotQ(SIGMA, SIGMA),
    EXP2 = matAdd(matAdd(IDENT, X), matScale(matMul(X, X), HALF)),
    XBACK = matMul(inverse(matAdd(R, IDENT)), matSub(R, IDENT));
  /** The common denominator of a rational vector and the numerators over it. */
  function common(v) {
    const den = v.reduce((d, [, q]) => (d / gcd(d, q)) * q, 1n);
    return { den, nums: v.map(([p, q]) => (p * den) / q) };
  }
  const ORBIT = (() => {
    const out = [{ v: V0, w: V0 }];
    for (let N = 1; N <= NMAX; N++) out.push({ v: matVec(R, out[N - 1].v), w: matVec(EXP2, out[N - 1].w) });
    return out.map(({ v, w }, N) => ({ N, v, w, ...common(v), norm: dotQ(v, v), taylor: dotQ(w, w), euler: power(plus(ONE, S2), N) }));
  })();
  const DET = det3(R);
  const matText = (A) => {
    const den = A.flat().reduce((d, [, q]) => (d / gcd(d, q)) * q, 1n),
      rows = A.map((row) => `(${row.map(([p, q]) => sgn((p * den) / q)).join(', ')})`);
    return `1/${den} · [${rows.join(', ')}]`;
  };
  // the plane of the orbit: v₀ and the direction of σ × v₀; the angles of one step of either track
  const E1 = num(V0),
    AXIS = unit(num(SIGMA)),
    E2 = unit(cross(num(SIGMA), E1)),
    SIZE = Math.sqrt(fval(S2)),
    STEP_R = 2 * Math.atan(SIZE),
    STEP_T = Math.atan2(SIZE, 1 - fval(S2) / 2),
    GROW_T = 0.5 * Math.log(fval(ORBIT[1].taylor));
  const inPlane = (a, r) => add(scale(E1, r * cs(a)), scale(E2, r * sn(a)));

  /* ---------- card 4: the Chebyshev heap ---------- */
  const TMAX = 24;
  const SEED = [frac(3n, 5n), frac(4n, 5n), ZERO, ZERO];
  const HEAP = (() => {
    const xs = [QONE, SEED];
    for (let t = 2; t <= TMAX; t++) xs.push(mulQ(mulQ(xs[t - 1], conjQ(xs[t - 2])), xs[t - 1]));
    const c = dotQ(xs[0], xs[1]),
      T = [ONE, c],
      U = [ZERO, ONE]; // U[n] is U_{n−1}
    for (let t = 2; t <= TMAX; t++) {
      T.push(minus(times(times(TWO, c), T[t - 1]), T[t - 2]));
      U.push(minus(times(times(TWO, c), U[t - 1]), U[t - 2]));
    }
    return { c, xs, T, U, kappa: xs.map((x) => kappaQ(QONE, x)), norm: xs.map((x) => dotQ(x, x)) };
  })();
  /** The angle of one beat, a transcendental number; only the contrast uses it. */
  const DTH = Math.acos(fval(HEAP.c));
  const eulerNorm = (t) => (1 + DTH * DTH) ** t;
  const EULER_TURN = Math.atan(DTH),
    EULER_LOG = 0.5 * Math.log1p(DTH * DTH);

  /* ---------- card 5: jets in ℚ[η]/(η³), secants, and the coarse chain with its tetrahedron ---------- */
  const jetMul = (a, b) => [times(a[0], b[0]), plus(times(a[0], b[1]), times(a[1], b[0])), plus(plus(times(a[0], b[2]), times(a[1], b[1])), times(a[2], b[0]))];
  const jetAdd = (a, b) => a.map((x, i) => plus(x, b[i]));
  /** a₀(1 + u) with u ∈ (η): the inverse is (1 − u + u²)/a₀, in two terms. */
  function jetInv(a) {
    const u = [ZERO, quo(a[1], a[0]), quo(a[2], a[0])],
      u2 = jetMul(u, u);
    return jetAdd(jetAdd([ONE, ZERO, ZERO], u.map(neg)), u2).map((x) => quo(x, a[0]));
  }
  /** κ(x + η) = 1/(1 + (x + η)²), by ring operations alone. */
  function jetOf(x) {
    const X1 = [x, ONE, ZERO];
    return jetInv(jetAdd([ONE, ZERO, ZERO], jetMul(X1, X1)));
  }
  const kappaAt = (x) => quo(ONE, plus(ONE, times(x, x)));
  /** The slope of the secant of step h and its error against the derivative of the jet. */
  function secantOf(x, h) {
    const slope = quo(minus(kappaAt(plus(x, h)), kappaAt(x)), h);
    return { slope, error: minus(slope, jetOf(x)[1]) };
  }
  const CHAIN = [QONE, [frac(1n, 3n), frac(2n, 3n), frac(2n, 3n), ZERO], [frac(-1n, 3n), frac(-2n, 3n), frac(2n, 3n), ZERO], [frac(-2n, 3n), frac(1n, 3n), frac(2n, 3n), ZERO]];
  const STOKES = (() => {
    // the steps x_k x_{k−1}⁻¹ and their product against x₃ x₀⁻¹
    const steps = [1, 2, 3].map((k) => mulQ(CHAIN[k], conjQ(CHAIN[k - 1]))),
      product = mulQ(mulQ(steps[2], steps[1]), steps[0]),
      direct = mulQ(CHAIN[3], conjQ(CHAIN[0]));
    // twice the signed areas of the horizontal projection, an edge cochain, and its coboundary on ordered quadruples
    const edge = (i, j) => minus(times(CHAIN[i][1], CHAIN[j][2]), times(CHAIN[j][1], CHAIN[i][2])),
      F = (i, j, k) => plus(minus(edge(j, k), edge(i, k)), edge(i, j)),
      all = range(4);
    let quadruples = 0,
      zero = 0,
      faces = 0;
    const faceErrors = [0, 0, 0, 0];
    for (const i of all) for (const j of all) for (const k of all) if (F(i, j, k)[0] !== 0n) faces++;
    for (const r of all)
      for (const i of all)
        for (const j of all)
          for (const k of all) {
            quadruples++;
            if (equal(plus(minus(F(i, j, k), F(r, j, k)), minus(F(r, i, k), F(r, i, j))), ZERO)) zero++;
            else faceErrors[r]++;
          }
    return { steps, product, direct, same: sameQ(product, direct), quadruples, zero, faces, faceErrors, areas: [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]].map((f) => F(...f)) };
  })();

  /* ---------- the state: one rail value per card, and everything the page shows of it ---------- */
  const SCENES = ['loop', 'escape', 'cayley', 'cheb', 'jet'];
  const X_MAX = 1.5;
  // the rail of a card: its length, the number it starts from, its speed (units per second), its keyboard step
  const RAILS = {
    loop: { max: 4, rate: 0.55, step: 1 / 12 },
    escape: { max: 3, rate: 0.75, step: 1 },
    cayley: { max: NMAX - 1, from: 1, rate: 3, step: 1, whole: true },
    cheb: { max: TMAX, from: 0, rate: 3, step: 1, whole: true },
    jet: { max: X_MAX, rate: 0.28, step: 1 / 12 }
  };
  const STILL = { loop: 2, escape: 3, cayley: 11, cheb: 12, jet: 1 };
  const DEFAULTS = { S: [2, 3, 5], M: 12, cf: '7/12', h: '1/4' };
  const state = { scene: 'loop', at: { ...STILL }, ...DEFAULTS, lens: 0, cam: 'face', from: null, blend: 1 };
  /** The whole part and the rest of a rail value that counts. */
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  /** A rail value on the grid of 1/240, as a whole number of steps. */
  const gridK = (t) => Math.round(t * GRID);
  function compute(at, S, M, cf, h) {
    const N = 1 + split(at.cayley).k,
      t = split(at.cheb).k,
      x = frac(BigInt(gridK(at.jet)), BigInt(GRID)),
      step = parse(h),
      c = parse(cf),
      list = convergents(c),
      j = jetOf(x);
    return {
      loop: { k: gridK(at.loop), ...readPair(pairOf(gridK(at.loop))) },
      escape: { ...split(at.escape), u: at.escape, ...escapeOf(S), M, lattice: LATTICE[M], scales: SCALES[M], cf: c, terms: list.length, list, bound: cfBound(c), squares: squares(c).length, lift: Math.max(M, Number(c[1])) },
      cayley: { ...ORBIT[N], f: N < NMAX ? split(at.cayley).f : 0 },
      cheb: { t, f: t < TMAX ? split(at.cheb).f : 0, x: HEAP.xs[t], T: HEAP.T[t], kappa: HEAP.kappa[t], norm: HEAP.norm[t], euler: eulerNorm(t) },
      jet: { x, h: step, j, next: plus(x, step), kappaNext: kappaAt(plus(x, step)), ...secantOf(x, step) }
    };
  }
  const calc = () => compute(state.at, state.S, state.M, state.cf, state.h);

  /* ---------- the printed relations of a frame ---------- */
  /** κ and s keep their whole-number form Q²/(P² + Q²), also when it is 0/1. */
  const shareRel = ([p, q]) => `= ${p}/${q} ${relQ([p, q])}`;
  const normRel = (o) => rel(o.norm, dot(num(o.v), num(o.v)));
  const taylorRel = (o) => relQ(o.taylor);
  const heapRel = (c) => rel(c.norm, dot(num(c.x), num(c.x)));
  const eulerRel = (c) => rel(c.t === 0 ? ONE : null, c.euler);
  const dthRel = () => rel(null, DTH);
  const signed = (q) => (q[0] < 0n ? brief(q) : `+${brief(q)}`);
  const jetSet = (j) => `{${brief(j[0])}, ${brief(j[1])}, ${signed(j[2])}}`;
  /** The jet where there is room for little: the set when it is short, else the derivative alone. */
  const jetBrief = (j, most = 22) => (jetSet(j).length <= most ? jetSet(j) : `κ′ ${relQ(j[1])}`);
  const jetDecimals = (j) => [relQ(j[0]), relQ(j[1]), relQ(j[2])];
  /** 1/2 − 1/2 η + 1/4 η². */
  const jetPoly = (j) => {
    const put = (q, tail) => `${q[0] < 0n ? '−' : '+'} ${fstr([mag(q[0]), q[1]])} ${tail}`;
    return `${fstr(j[0])} ${put(j[1], 'η')} ${put(j[2], 'η²')}`;
  };
  /** The error of a secant as a law, with its value beside it; it is 0 exactly where 3x² + 2xh = 1. */
  const errorLaw = (o, say = L) => {
    const c = cmp(o.error, ZERO),
      name = say('偏差', 'error');
    if (c === 0) return say('偏差 = 0（3x² + 2xh = 1 时割线与切线同斜率）', 'error = 0 (at 3x² + 2xh = 1 the secant has the slope of the tangent)');
    return valued(`${name}${fstr(o.error).length <= 17 ? ' ' + fstr(o.error) : ''} ${c > 0 ? '&gt;' : '&lt;'} 0`, relQ(o.error), say);
  };
  const taylorLaw = (o, say = L) => (o.N === 0 ? `‖v₀‖² ${taylorRel(o)}` : valued(`‖exp₂(X)${superscript(o.N)}v₀‖² &gt; 1`, taylorRel(o), say));
  const eulerLaw = (c, say = L) => (c.t === 0 ? `|1|² ${eulerRel(c)}` : valued(`|(1 + iΔθ)${superscript(c.t)}|² &gt; 1`, eulerRel(c), say));
  const firstLaw = (o, say = L) => valued(`(3/2)${superscript(o.N)} &gt; 1`, relQ(o.euler), say);
  const power_ = (b, n) => (n === 1 ? b : `${b}${superscript(n)}`);
  const orbitText = (o) => `(${o.nums.map(sgn).join(', ')})/${o.den}`;
  const CF_LAW = (e) => `${e.terms} ≤ 2⌊log₂ ${e.cf[1]}⌋ + 1 = ${e.bound}`;

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const cams = { panorama: [0.3, 0.24, 1], face: [-0.1, 0.1, 1], high: [0.24, 0.56, 1] };
  const PRESETS = {
    'homogeneous-projective-antipodal-closure': { scene: 'loop', cam: 'face', play: true, still: STILL.loop },
    'lazy-prime-escape-and-decidable-horizon': { scene: 'escape', cam: 'panorama', play: true, still: STILL.escape },
    'rational-cayley-rotor-vs-taylor-series': { scene: 'cayley', cam: 'panorama', play: true, still: STILL.cayley },
    'chebyshev-rational-harmonic-oscillator': { scene: 'cheb', cam: 'face', play: true, still: STILL.cheb },
    'limit-free-jet-ring-and-telescoping-stokes': { scene: 'jet', cam: 'face', play: true, still: STILL.jet }
  };
  const DEFAULT = 'homogeneous-projective-antipodal-closure';

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
  let cam = basis(...cams.face);
  const narrow = () => stage.clientWidth < 480;
  /** A point x to the right, y up and d towards the viewer. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  /** The world point of a quaternion of the slice. */
  const world = ([w, x, y]) => [x, -y, -w];
  const LIFT = 1.014;
  /* the rational circle, its sight lines and the flat ruler share one scale */
  const RHO = 1.03;
  const onCircle = ([c1, c2], r = RHO) => [r * c2, 0, -r * c1];
  const circleAt = (a, r = RHO) => [r * sn(a), 0, -r * cs(a)];
  /** How far the ruler runs, and where it starts to crack. */
  const REACH = () => (narrow() ? 1.86 : 2.5);
  const loopPoint = (t) => onCircle(num(readPair(pairOf(gridK(t))).C));
  /* the prime rings lie in the horizontal plane round the ball; slot 0 is at the gate on the left */
  const ringR = (i) => 1.14 + 0.085 * i;
  const ringOut = (n) => ringR(n - 1) + 0.075;
  const slotAt = (p, slot, r) => [r * cs(PI + (TAU * slot) / p), r * sn(PI + (TAU * slot) / p), 0];
  const RING_Q = 1.06;
  const NUDGE = 0.17;
  /** The amber knot: out along the gate (the product), one step off it (plus one), and up to the new ring. */
  function knot(u, n) {
    const out = ringOut(n);
    if (u <= 1) return [-lerp(1.06, out, u), 0, 0];
    if (u <= 2) return [out * cs(PI + NUDGE * (u - 1)), out * sn(PI + NUDGE * (u - 1)), 0];
    const v = u - 2,
      r = lerp(out, RING_Q, v),
      a = (PI / 2) * v;
    return [-r * cs(a) * lerp(cs(NUDGE), 1, v), -r * sn(NUDGE) * (1 - v), r * sn(a)];
  }
  const cayleyPoint = (s) => inPlane(s * STEP_R, LIFT);
  const taylorPoint = (s) => inPlane(s * STEP_T, LIFT * Math.exp(GROW_T * s));
  const heapPoint = (s) => circleAt(s * DTH);
  /** The Euler steps on a logarithmic radius. */
  const EULER_SCALE = 0.08;
  const eulerPoint = (s) => circleAt(s * EULER_TURN, RHO + EULER_SCALE * EULER_LOG * s);
  /* the wave of κ_t beside the ball: its height is the height of the bead on the ball */
  const wave = () => (narrow() ? { x0: 1.62, w: 1.2 } : { x0: 1.85, w: 1.95 });
  const wavePoint = (t, kappa) => {
    const { x0, w } = wave();
    return seen(x0 + (w * t) / TMAX, RHO * (1 - 2 * kappa) * cam.U[2], 0);
  };
  /* the witch of Agnesi to the scale of the ball */
  const witch = (x, kappa = 1 / (1 + x * x)) => [2 * RHO * x, 0, RHO * (1 - 2 * kappa)];
  const JET_END = () => (narrow() ? 1.62 : 1.9);
  /** Where the magnifier sits, how large it is, and its whole-number gain: the gap at the end of the step is seen well. */
  function jetLens(o) {
    const gap = Math.abs(fval(o.error)) * fval(o.h) * 2 * RHO,
      gain = [100, 50, 20, 10, 5, 2].find((g) => g * gap <= 0.24) || 2,
      small = narrow(),
      [x, y, r] = small ? [1.56, 0.84, 0.28] : [1.78, 0.76, 0.38];
    const q = witch(fval(o.next)),
      to = [dot(q, cam.R) - x, dot(q, cam.U) - y];
    return { x, y, r, gain: gap === 0 ? 10 : gain, turn: Math.atan2(to[1], to[0]) };
  }
  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'loop':
        return loopPoint(v);
      case 'escape':
        return knot(v, state.S.length);
      case 'cayley': {
        const { k, f } = split(v);
        return cayleyPoint(k + 1 + (k + 1 < NMAX ? f : 0));
      }
      case 'cheb':
        return heapPoint(v);
      default:
        return witch(gridK(v) / GRID);
    }
  }
  /** Fit what the cards draw, between the title and the legend. */
  const BALL = [-1.08, 1.08, -1.08, 1.08];
  /** The right, left, low and high ends of the ball and some world points as they are seen now. */
  const around = (pts, pad = 0.06) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x - pad), Math.max(b[1], x + pad), Math.min(b[2], y - pad), Math.max(b[3], y + pad)];
    }, BALL);
  const SIDE = {
    loop: () => [-REACH() - 0.12, REACH() + 0.12, -1.34, 1.16],
    escape: (m) => {
      const r = Math.max(1.5, ringOut(m.escape.S.length) + 0.15) + 0.14;
      return narrow() ? [-r, r, -1.2, 1.18] : [-r, r + 1.55, -1.14, 1.18];
    },
    cayley: (m) => around([...sample(40, (u) => taylorPoint(u * (m.cayley.N + m.cayley.f))), ...sample(12, (u) => taylorPoint(m.cayley.N + m.cayley.f - u))]),
    cheb: (m) => {
      const b = around(sample(32, (u) => eulerPoint(Math.max(0, m.cheb.t + m.cheb.f - 6 * u))));
      return [Math.min(b[0], -1.2), wave().x0 + wave().w + 0.12, Math.min(b[2], -1.22), Math.max(b[3], 1.22)];
    },
    jet: (m) => [-1.1, 2 * RHO * Math.max(JET_END(), fval(m.jet.next) + 0.06) + 0.06, -1.4, 1.38]
  };
  let frozen = false;
  function fit(w, m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H || frozen) return;
    const box = stage.getBoundingClientRect();
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const tl = $('hudTl'),
      bl = $('legend');
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 8) : 12;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const boxes = SCENES.filter((k) => w[k] > 0).map((k) => [w[k], SIDE[k](m)]),
      [x0, x1, y0, y1] = range(4).map((i) => boxes.reduce((s, [k, b]) => s + k * b[i], 0));
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }
  /** A tube; a translucent one takes a key of its own, because a key keeps the shader it was first drawn with. */
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  /* the weights of the two tracks in the two lenses: exact cyan and flat magenta */
  const weight = () => (state.lens ? { exact: 0.45, flat: 1 } : { exact: 1, flat: 0.8 });
  /** Small octahedra round some points, as one polyhedron. */
  function gems(points) {
    const vertices = [],
      faces = [];
    for (const [p, r] of points) {
      const b = vertices.length;
      for (const [k, s] of [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]]) vertices.push(p.map((x, i) => x + (i === k ? s * r : 0)));
      for (const i of [0, 1]) for (const j of [2, 3]) for (const k of [4, 5]) faces.push((i + j + k) % 2 === 0 ? [b + i, b + j, b + k] : [b + j, b + i, b + k]);
    }
    return { vertices, faces };
  }
  const meshes = new Map();
  const meshOf = (key, make) => {
    if (!meshes.has(key)) meshes.set(key, gems(make()));
    return meshes.get(key);
  };
  const cloud = (key, make, a) => a > 0.01 && sc.poly(key + (a < 0.99 ? '~' : ''), meshOf(key, make), { color: P.cyan, alpha: a, edges: false, pick: false, occlude: false });
  function drawBall() {
    // the ball is darker towards the lower pole and brighter towards the upper one
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball', at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
  }
  function drawLoop(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      o = m.loop,
      here = onCircle(num(o.C)),
      pole = circleAt(PI),
      reach = REACH();
    tube('loop', sample(140, (u) => circleAt(TAU * u)), P.cyan, 0.02, a * exact);
    cloud('scales6', () => scales(6).map((pq) => [onCircle(num(readPair(pq).C)), 0.026]), a * exact);
    ANCHORS.forEach((pq, k) => (pq[0] === o.P && pq[1] === o.Q) || sc.bead(onCircle(num(readPair(pq).C)), { color: P.cyan, r: 5.4, alpha: a * exact, key: 'anchor' + k }));
    // the flat ruler, tangent at 1: whole in the middle, cracked at both ends as s runs to 1
    const tear = clamp(2 * fval(o.spread) - 1, 0, 1) ** 2,
      solid = reach - 0.42,
      z = -RHO;
    sc.line([[-solid, 0, z], [solid, 0, z]], { color: P.magenta, width: 3, alpha: a * flat });
    for (const s of [-1, 1])
      for (let k = 0; k < 3; k++) {
        const len = 0.13,
          x0 = solid + k * (len + 0.005) + tear * 0.055 * (k + 1),
          drop = tear * 0.05 * (k + 1) * (k + 1) * 0.6,
          tip = tear * 0.07 * (k + 1);
        sc.line([[s * x0, 0, z - drop], [s * (x0 + len * (1 - 0.12 * tear)), 0, z - drop - tip]], { color: P.magenta, width: 3, alpha: a * flat * (1 - 0.22 * k) });
      }
    if (tear > 0.02) for (const s of [-1, 1]) sc.line([[s * (solid + 0.01), 0, z + 0.1 * tear], [s * (solid + 0.045), 0, z + 0.02], [s * (solid + 0.0), 0, z - 0.03], [s * (solid + 0.05), 0, z - 0.11 * tear]], { color: P.magenta, width: 1.6, alpha: a * flat });
    for (const x of [-1, -0.5, 0, 0.5, 1]) if (Math.abs(2 * RHO * x) < solid) sc.line([[2 * RHO * x, 0, z], [2 * RHO * x, 0, z - (x % 1 ? 0.06 : 0.1)]], { color: P.magenta, width: 1.4, alpha: a * flat });
    // the sight line from −1 through the probe to the ruler; at [1 : 0] it runs parallel to it, both ways
    if (o.x === null) for (const s of [-1, 1]) sc.arrow(pole, [s * reach, 0, RHO], { color: P.magenta, width: 1.8, headSize: 9, dash: [6, 5], alpha: a * flat });
    else {
      const x = 2 * RHO * fval(o.x),
        end = [x, 0, z],
        u = Math.min(1, reach / Math.max(1e-9, Math.abs(x)));
      if (Math.abs(x) <= reach) {
        sc.line([pole, end], { color: P.magenta, width: 1.6, dash: [6, 5], alpha: a * flat });
        sc.bead(end, { color: P.magenta, r: 4.6, alpha: a * flat, key: 'landing' });
      } else sc.arrow(pole, [u * x, 0, RHO - 2 * RHO * u], { color: P.magenta, width: 1.8, headSize: 9, dash: [6, 5], alpha: a * flat });
    }
    // the arc the probe has travelled from [0 : 1]
    const turn = Math.atan2(num(o.C)[1], num(o.C)[0]),
      end = o.k === 4 * GRID ? TAU : turn < -1e-12 || (o.k > 2 * GRID && turn <= 0) ? turn + TAU : turn;
    if (end > 1e-6) tube('gone', sample(Math.max(3, Math.ceil((90 * end) / TAU)), (u) => circleAt(end * u, RHO + 0.004)), P.cyan, 0.032, a * exact);
  }
  function drawEscape(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      e = m.escape,
      n = e.S.length,
      u = e.u,
      out = ringOut(n);
    cloud('lattice' + e.M, () => NODES.filter((p) => p[3] <= e.M).map((p) => [scale(world(p.slice(0, 3).map((x) => x / p[3])), 1.006), 0.04 / p[3] ** 0.36]), a * exact);
    // the rings of S with their slots, the gate of slot 0, and the bead of the present number on every ring
    e.S.forEach((p, i) => {
      const r = ringR(i);
      sc.line(sample(96, (v) => slotAt(1, v, r)), { color: P.cyan, width: 1.5, alpha: 0.8 * a * exact });
      if (p <= 64n) cloud(`slots${p}:${i}`, () => range(Number(p)).map((k) => [slotAt(Number(p), k, r), 0.026]), a * exact);
      const on = clamp(u * n - i, 0, 1),
        slot = clamp(u - 1, 0, 1);
      if (on > 0.01) sc.bead(slotAt(Number(p), slot, r), { color: P.cyan, r: 5, alpha: a * exact * on, key: 'residue' + i });
    });
    sc.line([[-1.03, 0, 0], [-out - 0.1, 0, 0]], { color: P.ink, width: 1.6, dash: [3, 3], alpha: 0.9 * a });
    // the new ring of q stands upright round the ball; slot 0 is on top
    const v = clamp(u - 2, 0, 1);
    if (v > 0) {
      tube('ringQ', sample(Math.max(3, Math.ceil(120 * v)), (w) => [-RING_Q * cs(TAU * v * w), 0, RING_Q * sn(TAU * v * w)]), P.cyan, 0.016, a * exact);
      if (e.q <= 64n && v === 1) cloud('slotsQ' + e.q, () => range(Number(e.q)).map((k) => [[RING_Q * sn((TAU * k) / Number(e.q)), 0, RING_Q * cs((TAU * k) / Number(e.q))], 0.024]), a * exact);
    }
    // the contrast: ever more rings, as if all primes were already there
    if (state.lens) for (let k = 1; k <= 3; k++) sc.line(sample(96, (w) => slotAt(1, w, out + 0.09 * k)), { color: P.magenta, width: 1.3, dash: [5, 4], alpha: a * flat * (1 - 0.22 * k) });
    // the rectangle of Euclid: finitely many squares fill it
    const { x0, y0, k } = euclidBox(e);
    for (const [l, b, s] of squares(e.cf)) sc.fan([[l, b], [l + s, b], [l + s, b + s], [l, b + s]].map(([x, y]) => seen(x0 + k * x, y0 + k * y, 0.2)), { fill: P.cyan, alpha: 0.12 * a * exact, color: P.cyan, width: 1.4, strokeAlpha: a * exact });
  }
  /** Where the rectangle of Euclid sits: the scale of one unit and its lower left corner, in the plane of the screen. */
  function euclidBox(e) {
    const [a, b] = num([[e.cf[0], 1n], [e.cf[1], 1n]]),
      small = narrow(),
      w = small ? 0.58 : 1.3,
      k = w / b,
      r = Math.max(1.5, ringOut(e.S.length) + 0.15);
    return small ? { x0: 0.9, y0: -1.16, k, w, h: k * a } : { x0: r + 0.28, y0: -0.5 * k * a - 0.1, k, w, h: k * a };
  }
  function drawCayley(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      o = m.cayley,
      s = o.N + o.f;
    sc.line([scale(AXIS, -1.6), scale(AXIS, 1.2)], { color: P.violet, width: 2.4, alpha: 0.9 * a });
    sc.arrow(scale(AXIS, 1.02), scale(AXIS, 1.5), { color: P.violet, width: 2.4, headSize: 10, alpha: a });
    tube('orbit', sample(Math.max(4, Math.ceil(60 * Math.min(1, (s * STEP_R) / TAU))), (u) => inPlane(u * Math.min(TAU, s * STEP_R), LIFT)), P.cyan, 0.018, a * exact);
    for (let k = 0; k <= o.N; k++) sc.bead(scale(num(ORBIT[k].v), LIFT), { color: P.cyan, r: k === 0 ? 5.6 : 4.4, alpha: a * exact, key: 'orbit' + k });
    tube('taylor', sample(Math.max(4, Math.ceil(10 * s)), (u) => taylorPoint(u * s)), P.magenta, 0.016, a * flat);
    for (let k = 1; k <= o.N; k++) sc.bead(scale(num(ORBIT[k].w), LIFT), { color: P.magenta, r: k === o.N ? 5.4 : 3.2, alpha: a * flat, key: 'taylor' + k });
    if (o.f > 0) sc.bead(taylorPoint(s), { color: P.magenta, r: 5.4, alpha: a * flat, key: 'taylorNow' });
  }
  function drawCheb(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      c = m.cheb,
      s = c.t + c.f;
    tube('great', sample(140, (u) => circleAt(TAU * u)), P.cyan, 0.018, a * exact);
    for (let k = 0; k <= c.t; k++) sc.bead(onCircle(num(HEAP.xs[k])), { color: P.cyan, r: k === 0 ? 5.6 : 4.4, alpha: a * exact, key: 'heap' + k });
    if (s > 0) tube('euler', sample(Math.max(4, Math.ceil(8 * s)), (u) => eulerPoint(u * s)), P.magenta, 0.014, a * flat);
    for (let k = 1; k <= c.t; k++) sc.bead(eulerPoint(k), { color: P.magenta, r: k === c.t ? 5 : 2.8, alpha: a * flat, key: 'euler' + k });
    // the wave: κ_t against t, at the height of the bead on the ball
    const { x0, w } = wave(),
      up = (z) => z * cam.U[2],
      at = (t, z) => seen(x0 + (w * t) / TMAX, up(z), 0);
    for (const [z, dash] of [[-RHO, [4, 4]], [0, [2, 5]], [RHO, [4, 4]]]) sc.line([at(0, z), at(TMAX, z)], { color: P.ink, width: 1, dash, alpha: 0.5 * a });
    sc.line([at(0, -RHO), at(0, RHO)], { color: P.ink, width: 1.2, alpha: 0.7 * a });
    const pts = range(c.t + 1).map((t) => wavePoint(t, fval(HEAP.kappa[t])));
    if (pts.length > 1) sc.line(pts, { color: P.cyan, width: 2, alpha: a * exact });
    pts.forEach((p, t) => t < c.t && sc.bead(p, { color: P.cyan, r: 3.2, alpha: a * exact, key: 'wave' + t }));
    const now = wavePoint(c.t, fval(c.kappa));
    sc.line([onCircle(num(c.x)), now], { color: P.ink, width: 1, dash: [3, 4], alpha: 0.75 * a * (c.f > 0 ? 0 : 1) });
    sc.bead(now, { color: P.amber, r: 5, alpha: a, key: 'waveNow' });
  }
  function drawJet(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      o = m.jet,
      x = fval(o.x),
      [k0, k1, k2] = num(o.j),
      p = witch(x, k0),
      end = JET_END();
    // the circle, the tangent line at 1 and the witch that they generate
    sc.line(sample(120, (u) => circleAt(TAU * u)), { color: P.cyan, width: 1.8, alpha: 0.8 * a * exact });
    sc.line([[-0.7, 0, -RHO], [2 * RHO * end, 0, -RHO]], { color: P.ink, width: 1.2, alpha: 0.7 * a });
    for (const t of [0, 0.5, 1, 1.5]) if (t < end) sc.line([[2 * RHO * t, 0, -RHO], [2 * RHO * t, 0, -RHO - 0.07]], { color: P.ink, width: 1.4, alpha: 0.8 * a });
    tube('witch', sample(90, (u) => witch(u * end)), P.cyan, 0.011, a * exact);
    const foot = [p[0], 0, -RHO],
      on = circleAt(2 * Math.atan(x));
    sc.line([circleAt(PI), foot], { color: P.ink, width: 1, dash: [4, 4], alpha: 0.55 * a });
    sc.line([foot, p, on], { color: P.ink, width: 1, dash: [2, 4], alpha: 0.7 * a });
    // the tangent and the osculating circle of the jet: in X = 2ρx and z = ρ(1 − 2κ) the slope is −κ′
    const slope = -k1,
      len = hypot(1, slope),
      along = (d) => [p[0] + d / len, -0.012, p[2] + (d * slope) / len];
    sc.line([along(-0.8), along(0.95)], { color: P.cyan, width: 3, alpha: a * exact });
    const bend = -k2 / RHO; // the second derivative of z over X = 2ρx is −κ″/(2ρ) = −j₂/ρ
    if (Math.abs(bend) > 1e-9) {
      const curv = bend / len ** 3,
        r = 1 / curv,
        normal = [-slope / len, 0, 1 / len],
        centre = add(p, scale(normal, r)),
        span = Math.min(PI, 1.25 * Math.abs(curv)),
        arc = (b) => add(centre, add(scale(normal, -r * cs(b)), scale([1 / len, 0, slope / len], Math.abs(r) * sn(b))));
      sc.line(sample(60, (u) => arc(lerp(-span, span, u))).map((q) => [q[0], 0.02, q[2]]), { color: P.cyan, width: 8, alpha: 0.3 * a * exact });
    }
    // the secant of step h, drawn on, and the wedge between it and the tangent
    const q = witch(fval(o.next), fval(o.kappaNext)),
      sec = -fval(o.slope),
      slen = hypot(1, sec),
      cut = (d) => [p[0] + d / slen, 0.012, p[2] + (d * sec) / slen],
      far = Math.max(1.15, hypot(q[0] - p[0], q[2] - p[2]) + 0.35);
    sc.fan([p, along(far), cut(far)].map((v) => [v[0], 0.02, v[2]]), { fill: P.magenta, alpha: 0.42 * a * flat });
    sc.line([cut(-0.55), cut(far)], { color: P.magenta, width: 2.4, alpha: a * flat });
    sc.bead(q, { color: P.magenta, r: 4.6, alpha: a * flat, key: 'next' });
    // a magnifier on the end of the step: the tangent, the secant and the gap between them
    const g = jetLens(o),
      into = (X0, z) => seen(g.x + g.gain * (X0 - q[0]), g.y + g.gain * (z - q[2]), 0.25),
      inside = (f) =>
        sample(60, (u) => lerp(-g.r / g.gain, g.r / g.gain, u))
          .map((d) => [q[0] + d, f(q[0] + d)])
          .filter(([X0, z]) => hypot(X0 - q[0], z - q[2]) <= g.r / g.gain)
          .map(([X0, z]) => into(X0, z)),
      draw = (f, s) => {
        const pts = inside(f);
        if (pts.length > 1) sc.line(pts, s);
      };
    sc.fan(sample(60, (u) => seen(g.x + g.r * cs(TAU * u), g.y + g.r * sn(TAU * u), 0.2)).slice(0, -1), { fill: P.stage, alpha: 0.85 * a });
    sc.line(sample(60, (u) => seen(g.x + g.r * cs(TAU * u), g.y + g.r * sn(TAU * u), 0.25)), { color: P.ink, width: 1.3, alpha: 0.85 * a });
    sc.line([seen(g.x + g.r * cs(g.turn), g.y + g.r * sn(g.turn), 0.2), q], { color: P.ink, width: 1, dash: [3, 4], alpha: 0.7 * a });
    draw((X0) => p[2] + slope * (X0 - p[0]), { color: P.cyan, width: 2.6, alpha: a * exact });
    draw((X0) => p[2] + sec * (X0 - p[0]), { color: P.magenta, width: 2.2, alpha: a * flat });
    draw((X0) => witch(X0 / (2 * RHO))[2], { color: P.cyan, width: 1.1, dash: [3, 3], alpha: a * exact });
    const touch = p[2] + slope * (q[0] - p[0]);
    if (Math.abs(touch - q[2]) > 1e-9) sc.arrow(into(q[0], touch), into(q[0], q[2]), { color: P.magenta, width: 2, headSize: 7, alpha: a * flat });
    sc.bead(into(q[0], q[2]), { color: P.magenta, r: 4.2, alpha: a * flat, key: 'lensNext' });
    sc.bead(into(q[0], touch), { color: P.cyan, r: 3.6, alpha: a * exact, key: 'lensTouch' });
    // the coarse chain on the ball, its relays, and the edges of its tetrahedron
    const V = CHAIN.map((v) => unit(world(num(v)))),
      geo = (i, j, r) => {
        const om = Math.acos(clamp(dot(V[i], V[j]), -1, 1));
        return sample(26, (u) => scale(add(scale(V[i], sn((1 - u) * om)), scale(V[j], sn(u * om))), r / sn(om)));
      };
    for (const [i, j] of [[0, 2], [0, 3], [1, 3]]) sc.line(geo(i, j, LIFT), { color: P.cyan, width: i === 0 && j === 3 ? 2 : 1.2, dash: i === 0 && j === 3 ? [] : [4, 4], alpha: (i === 0 && j === 3 ? 0.9 : 0.6) * a * exact });
    for (const k of [0, 1, 2]) tube('step' + k, geo(k, k + 1, LIFT), P.cyan, 0.017, a * exact);
    V.forEach((v, k) => (k === 1 || k === 2 ? sc.ring(scale(v, LIFT), { color: P.ink, r: 6, alpha: a, normal: v, key: 'relay' + k }) : sc.bead(scale(v, LIFT), { color: P.cyan, r: 5.2, alpha: a * exact, key: 'end' + k })));
  }

  /* ---------- words ---------- */
  const NOT_IN = '<span class="dt">∉</span>';
  const SCENE_NAME = {
    loop: [['射影闭环', 'PROJECTIVE CLOSURE'], ['开口直线（MODEL）', 'OPEN LINE (MODEL)']],
    escape: [['有限视界', 'FINITE HORIZON'], ['已装完的袋子（MODEL）', 'COMPLETED BAG (MODEL)']],
    cayley: [['凯莱旋转', 'CAYLEY ROTATION'], ['泰勒截断（MODEL）', 'TAYLOR CUT (MODEL)']],
    cheb: [['有理谐波', 'RATIONAL HARMONIC'], ['显式欧拉（MODEL）', 'EXPLICIT EULER (MODEL)']],
    jet: [['零极限射流', 'LIMIT-FREE JET'], ['有限差商（MODEL）', 'FINITE DIFFERENCE (MODEL)']]
  };
  const LENS_NAME = [
    ['Math_Ω 有限账本', 'MATH_Ω LEDGER'],
    ['传统对照 (MODEL)', 'CLASSICAL (MODEL)']
  ];
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'loop':
        return m.loop.Q === 0n ? 'pole' : m.loop.P === 0n ? 'start' : m.loop.P === m.loop.Q || m.loop.P === -m.loop.Q ? 'present' : m.loop.P > 0n ? 'right' : 'left';
      case 'escape':
        return m.escape.f > 0 ? 'moving' : ['list', 'product', 'one', 'escaped'][m.escape.k];
      case 'cayley':
        return 'run';
      case 'cheb':
        return m.cheb.t === 0 ? 'start' : 'run';
      default:
        return m.jet.x[0] === 0n ? 'apex' : m.jet.error[0] === 0n ? 'meet' : 'run';
    }
  }
  const compact = () => stage.clientWidth < 560;
  const pairNow = (m) => pairText([m.loop.P, m.loop.Q]);
  const circleText = (o) => tuple(o.C);
  const squareLaw = (o) => `P² + Q² = ${o.den} &gt; 0`;
  const flatX = (o) => (o.x === null ? '1/0' : fstr(o.x));
  const jetAtX = (x) => `κ(${fstr(x)} + η)`;
  const orbitLaw = (o) => nb(`‖R${superscript(o.N)}v₀‖² ${normRel(o)}`);
  const threeText = (o) => `3${superscript(o.N)} = ${o.den}`;
  const escapeText = (e) => `∏p + 1 = ${factorText(e)}`;
  const residueText = (e) => e.S.map((p, i) => `${e.N} ≡ ${e.residues[i]} (${p})`).join(', ');
  const waveText = (c) => (c.t === 0 ? relQ(c.kappa) : c.t <= 8 ? `= ${fstr(c.kappa)} ${relQ(c.kappa)}` : `= ${overPower(c.kappa, 5)} ${relQ(c.kappa)}`);
  const chebText = (c) => (c.t < 3 ? fstr(c.T) : overPower(c.T, 5));
  function subline(m) {
    const s = state.scene,
      r = regimeOf(m),
      small = compact();
    if (s === 'loop') {
      const o = m.loop;
      if (state.lens)
        return o.x === null
          ? small
            ? L('x = P/Q 要做 1/0：视线与直尺平行，永远落不下去。', 'x = P/Q would divide 1/0: the sight line never lands.')
            : L('平直读法（MODEL）：x = P/Q 在这里要做 1/0；视线与直尺平行，落点从一端跑出去、从另一端回来，直尺在两端裂开。', 'Flat reading (MODEL): x = P/Q would divide 1/0 here; the sight line runs parallel to the ruler, the landing point leaves at one end and returns at the other, and the ruler cracks at both.')
          : small
            ? L(`x = P/Q = ${flatX(o)}，放大率 1 + x² = 1/κ。`, `x = P/Q = ${flatX(o)}, magnified 1 + x² = 1/κ times.`)
            : L(`平直读法（MODEL）：落点 x = P/Q = ${flatX(o)}；弧长被直尺放大 1 + x² = 1/κ 倍，Q → 0 时没有上界。`, `Flat reading (MODEL): the landing point is x = P/Q = ${flatX(o)}; the ruler magnifies arcs 1 + x² = 1/κ times, without bound as Q → 0.`);
      return small
        ? L(`${pairNow(m)}：${squareLaw(o)}，κ ${shareRel(o.kappa)}，C = ${circleText(o)}。`, `${pairNow(m)}: ${squareLaw(o)}, κ ${shareRel(o.kappa)}, C = ${circleText(o)}.`)
        : L(`${pairNow(m)}：${squareLaw(o)}，κ ${shareRel(o.kappa)}，s ${shareRel(o.spread)}，C = ${circleText(o)}；分母从不为 0，圆照样闭合。`, `${pairNow(m)}: ${squareLaw(o)}, κ ${shareRel(o.kappa)}, s ${shareRel(o.spread)}, C = ${circleText(o)}; no denominator is 0 and the circle closes.`);
    }
    if (s === 'escape') {
      const e = m.escape;
      if (state.lens)
        return small
          ? L('一次装完的无穷袋子（MODEL）：机器任何时刻只见过有限个素数。', 'A bag filled once for all (MODEL): a machine has only ever met finitely many primes.')
          : L(`传统读法（MODEL）：把全体素数当作一只已装完的袋子，品红的环一直画到外面；有限账本只记 S = ${setText(e.S)}，需要时再造一个。`, `Classical reading (MODEL): all primes as one completed bag, its magenta rings running on outwards; the finite ledger keeps S = ${setText(e.S)} and makes the next one when asked.`);
      const step = {
        list: L(`S = ${setText(e.S)} 的素数环都在，门在左侧的第 0 格`, `the prime rings of S = ${setText(e.S)}, with slot 0 at the gate on the left`),
        product: L(`∏p = ${e.product} 在每只环上都落在第 0 格`, `∏p = ${e.product} stands on slot 0 of every ring`),
        one: L(`${escapeText(e)}：每只环上都余 1，没有一只接得住`, `${escapeText(e)}: remainder 1 on every ring, caught by none`),
        escaped: L(`${escapeText(e)}，新素数 q = ${e.q} ${NOT_IN} S 立起自己的环`, `${escapeText(e)}, and the new prime q = ${e.q} ${NOT_IN} S opens its own ring`),
        moving: L(`${escapeText(e)} 正在离开 S 的环`, `${escapeText(e)} is leaving the rings of S`)
      }[r];
      return small
        ? L(`${step}。M = ${e.M}：${e.lattice} 个格点。`, `${step}. M = ${e.M}: ${e.lattice} lattice points.`)
        : L(`M = ${e.M}，ε<sub>self</sub> = 1/${e.M}：球面格点 ${e.lattice} 个，圆上标度 ${e.scales} 个；${fstr(e.cf)} = ${cfText(e.cf)} 共 ${e.terms} 项，${nb(CF_LAW(e))}。${step}。`, `M = ${e.M}, ε<sub>self</sub> = 1/${e.M}: ${e.lattice} lattice points and ${e.scales} scales of the circle; ${fstr(e.cf)} = ${cfText(e.cf)} has ${e.terms} terms, ${nb(CF_LAW(e))}. Here ${step}.`);
    }
    if (s === 'cayley') {
      const o = m.cayley;
      if (state.lens)
        return small
          ? L(`${taylorLaw(o)}；一阶欧拉 ${firstLaw(o)}。`, `${taylorLaw(o)}; first-order Euler ${firstLaw(o)}.`)
          : L(`二阶泰勒截断（MODEL）：每步模方乘 17/16，${taylorLaw(o)}；一阶欧拉 I + X 更快：${firstLaw(o)}。`, `Second-order Taylor truncation (MODEL): each step multiplies the squared norm by 17/16, ${taylorLaw(o)}; first-order Euler I + X is faster: ${firstLaw(o)}.`);
      return small
        ? L(`分母 ${threeText(o)}，${orbitLaw(o)}；${taylorLaw(o)}。`, `Denominator ${threeText(o)}, ${orbitLaw(o)}; ${taylorLaw(o)}.`)
        : L(`σ = ${tuple(SIGMA)}，1 + ‖σ‖² = ${fstr(plus(ONE, S2))}：R${superscript(o.N)}v₀ = ${orbitText(o)}，分母 ${threeText(o)}，${orbitLaw(o)}，det R ${relQ(DET)}。泰勒截断：${taylorLaw(o)}。`, `σ = ${tuple(SIGMA)}, 1 + ‖σ‖² = ${fstr(plus(ONE, S2))}: R${superscript(o.N)}v₀ = ${orbitText(o)}, denominator ${threeText(o)}, ${orbitLaw(o)}, det R ${relQ(DET)}. Taylor truncation: ${taylorLaw(o)}.`);
    }
    if (s === 'cheb') {
      const c = m.cheb;
      if (state.lens)
        return small
          ? L(`Δθ = arccos(3/5) ${dthRel()}：${eulerLaw(c)}。`, `Δθ = arccos(3/5) ${dthRel()}: ${eulerLaw(c)}.`)
          : L(`显式欧拉步（MODEL）：Δθ = arccos(3/5) ${dthRel()} 是超越数，每步乘 1 + iΔθ，${eulerLaw(c)}，沿对数半径盘旋而出。`, `Explicit Euler steps (MODEL): Δθ = arccos(3/5) ${dthRel()} is transcendental, each step multiplies by 1 + iΔθ, ${eulerLaw(c)}, spiralling out on a logarithmic radius.`);
      return small
        ? L(`κ<sub>${c.t}</sub> ${waveText(c)}，‖x<sub>${c.t}</sub>‖² ${heapRel(c)}。`, `κ<sub>${c.t}</sub> ${waveText(c)}, ‖x<sub>${c.t}</sub>‖² ${heapRel(c)}.`)
        : L(`c = ${fstr(HEAP.c)}：x<sub>t+1</sub> = 2c x<sub>t</sub> − x<sub>t−1</sub>，T<sub>${c.t}</sub>(c) = ${chebText(c)}，κ<sub>${c.t}</sub> ${waveText(c)}，‖x<sub>${c.t}</sub>‖² ${heapRel(c)}；欧拉步 ${eulerLaw(c)}。`, `c = ${fstr(HEAP.c)}: x<sub>t+1</sub> = 2c x<sub>t</sub> − x<sub>t−1</sub>, T<sub>${c.t}</sub>(c) = ${chebText(c)}, κ<sub>${c.t}</sub> ${waveText(c)}, ‖x<sub>${c.t}</sub>‖² ${heapRel(c)}; the Euler steps have ${eulerLaw(c)}.`);
    }
    const o = m.jet,
      secant = L(`h = ${fstr(o.h)} 的割线斜率 ${brief(o.slope)}，${errorLaw(o)}`, `the secant of h = ${fstr(o.h)} has slope ${brief(o.slope)}, ${errorLaw(o)}`);
    if (state.lens)
      return small
        ? L(`${secant}。`, `${secant[0].toUpperCase()}${secant.slice(1)}.`)
        : L(`有限差商（MODEL）：${secant}；射流的导数 ${brief(o.j[1])} 不取任何极限。`, `Finite difference (MODEL): ${secant}; the derivative ${brief(o.j[1])} of the jet takes no limit.`);
    const poly = fstr(o.j[2]).length <= 10 ? `${jetAtX(o.x)} = ${jetPoly(o.j)}` : `${jetAtX(o.x)}: ${jetSet(o.j)}`;
    return small
      ? L(`${poly}；${secant}。`, `${poly}; ${secant}.`)
      : L(`${poly}（j₀ ${relQ(o.j[0])}，j₁ ${relQ(o.j[1])}，j₂ ${relQ(o.j[2])}）；${secant}；粗四面体 δF ${dFText()}（${STOKES.zero}/${STOKES.quadruples}）。`, `${poly} (j₀ ${relQ(o.j[0])}, j₁ ${relQ(o.j[1])}, j₂ ${relQ(o.j[2])}); ${secant}; coarse tetrahedron δF ${dFText()} (${STOKES.zero}/${STOKES.quadruples}).`);
  }
  /** δF of the tetrahedron: the exact zero when every quadruple gives it. */
  const dFText = () => (STOKES.zero === STOKES.quadruples ? relQ(ZERO) : '≠ 0');
  function bigline(m) {
    const e = m.escape,
      key = {
        loop: `${pairNow(m)} · κ ${relQ(m.loop.kappa)}`,
        escape: e.f > 0 ? `∏p + 1 = ${e.N}` : [`S = ${setText(e.S)}`, `∏p = ${e.product}`, `∏p + 1 = ${e.N}`, `q = ${e.q} ${NOT_IN} S`][e.k],
        cayley: `N = ${m.cayley.N} · ${orbitLaw(m.cayley)}`,
        cheb: `t = ${m.cheb.t} · ‖x<sub>${m.cheb.t}</sub>‖² ${heapRel(m.cheb)}`,
        jet: `x = ${fstr(m.jet.x)} · ${jetBrief(m.jet.j)}`
      },
      flat = {
        loop: `x = ${flatX(m.loop)}`,
        escape: L('全体素数', 'ALL PRIMES'),
        cayley: `‖exp₂(X)${superscript(m.cayley.N)}v₀‖² ${taylorRel(m.cayley)}`,
        cheb: `|(1 + iΔθ)${superscript(m.cheb.t)}|² ${eulerRel(m.cheb)}`,
        jet: `h = ${fstr(m.jet.h)} · ${brief(m.jet.slope)}`
      };
    return `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${(state.lens ? flat : key)[state.scene]}</span>`;
  }
  function legendItems(m) {
    const items = [['vi', L('三元数真球 𝕋₃', 'ternion sphere 𝕋₃')]];
    switch (state.scene) {
      case 'loop':
        items.push(['cy', L('赤道圆 S¹(ℚ)', 'equatorial circle S¹(ℚ)')], ['mg', L('平直直线 x = P/Q', 'flat line x = P/Q')], ['am', '[P : Q]']);
        break;
      case 'escape':
        items.push(['cy', L('格点 · 素数环 · 欧几里得方块', 'lattice · prime rings · Euclid squares')], ...(state.lens ? [['mg', L('已装完的袋子', 'completed bag')]] : []), ['am', m.escape.k === 3 ? `q = ${m.escape.q}` : L('当前的数', 'current number')]);
        break;
      case 'cayley':
        items[0] = ['vi', L('单位球面 · 转轴 σ', 'unit sphere · axis σ')];
        items.push(['cy', 'Rᴺv₀'], ['mg', 'exp₂(X)ᴺv₀'], ['am', L('当前 Rᴺv₀', 'current Rᴺv₀')]);
        break;
      case 'cheb':
        items.push(['cy', L('谐波珠 · κ 波', 'harmonic beads · κ wave')], ['mg', L('欧拉步（对数半径）', 'Euler steps (log radius)')], ['am', L('当前 x', 'current x')]);
        break;
      default:
        items.push(['cy', L('κ 曲线 · 切线 · 吻合圆 · 粗链', 'κ curve · tangent · osculating circle · chain')], ['mg', L('割线', 'secant')], ['am', L('切点', 'point')]);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const r = regimeOf(m),
      s = state.scene;
    if (s === 'loop') {
      if (r === 'pole')
        return {
          long: ['琥珀探针稳稳停在上极 [1 : 0]：P² + Q² = 1，κ = 0，没有一个分母是 0，青色的圆在这里照样合拢。下面的品红直尺要做 1/0：从上极出发的视线与它平行，永远落不下去，直尺在两端裂开。', 'The amber probe rests on the upper pole [1 : 0]: P² + Q² = 1, κ = 0, no denominator is 0, and the cyan circle closes here as everywhere. The magenta ruler below would divide 1/0: the sight line from the pole runs parallel to it, never lands, and the ruler cracks at both ends.'],
          fig: ['琥珀探针停在 [1 : 0]，青色的圆照样合拢；品红直尺在两端裂开。', 'The amber probe rests on [1 : 0]; the circle closes, the magenta ruler cracks.']
        };
      if (r === 'start')
        return {
          long: ['琥珀探针在下极 [0 : 1]，κ = 1，品红直尺在这里与圆相切，落点就是 x = 0。向右上推：[1 : 1]、[1 : 0]、[−1 : 1]，绕一圈回到这里。', 'The amber probe is at the lower pole [0 : 1] with κ = 1, where the magenta ruler touches the circle and the landing point is x = 0. Push it up to the right: [1 : 1], [1 : 0], [−1 : 1] and once round back here.'],
          fig: ['琥珀探针在下极 [0 : 1]，品红直尺在这里与圆相切。', 'The amber probe is at [0 : 1], where the magenta ruler touches the circle.']
        };
      return {
        long: [`琥珀探针在 ${pairNow(m)}，青色的圆上每一点都是整数比，分母 P² + Q² 总是正的。品红视线从上极穿过探针，落在直尺的 x = P/Q；离 [1 : 0] 越近，落点跑得越远。`, `The amber probe is at ${pairNow(m)}; every point of the cyan circle is a ratio of whole numbers with the positive denominator P² + Q². The magenta sight line runs from the upper pole through the probe to x = P/Q on the ruler; the nearer [1 : 0], the farther it lands.`],
        fig: [`琥珀探针在 ${pairNow(m)}，品红视线落在直尺的 x = P/Q。`, `The amber probe is at ${pairNow(m)}; the magenta sight line lands at x = P/Q.`]
      };
    }
    if (s === 'escape') {
      const e = m.escape;
      const base = ['球面上的青色格点是分母不超过 M 的全部有理点，右边的方块是连分数：有限步就铺满矩形。', 'The cyan lattice on the ball holds all rational points with a denominator up to M; the squares at the side are a continued fraction, and finitely many fill the rectangle. '];
      const tail = {
        list: [`S = ${setText(e.S)} 的素数环围着球，左侧的门是第 0 格。`, `The prime rings of S = ${setText(e.S)} surround the ball, with slot 0 at the gate on the left.`],
        product: [`乘积 ∏p = ${e.product} 在每只环上都停在门口。`, `The product ∏p = ${e.product} stands at the gate of every ring.`],
        one: [`加一之后，${e.N} 在每只环上都离开门一格：余 1。`, `Plus one, ${e.N} is one slot off the gate of every ring: remainder 1.`],
        escaped: [`${e.N} 的最小素因子 q = ${e.q} 不在 S 里，琥珀结从环面竖直逃出，立起自己的青色环。`, `The least prime factor q = ${e.q} of ${e.N} is not in S: the amber knot escapes upright from the plane of the rings and opens a cyan ring of its own.`],
        moving: [`琥珀的数正在走：先在门口乘起来，再离门一格，然后竖直逃出。`, 'The amber number is on its way: the product at the gate, one slot off it, then upright and out.']
      }[r];
      return {
        long: [base[0] + tail[0], base[1] + tail[1]],
        fig: {
          list: ['素数环围着球，左侧的门是第 0 格。', 'The prime rings surround the ball; slot 0 is at the gate on the left.'],
          product: [`∏p = ${e.product} 在每只环上都停在门口。`, `∏p = ${e.product} stands at the gate of every ring.`],
          one: [`${e.N} 在每只环上都离门一格，余 1。`, `${e.N} is one slot off every gate: remainder 1.`],
          escaped: [`格点有限；${e.N} 在每只环上余 1，琥珀的新素数 ${e.q} 竖直逃出。`, `A finite lattice; ${e.N} leaves remainder 1 and the new prime ${e.q} escapes.`],
          moving: ['琥珀的数离开门，竖直逃出素数环。', 'The amber number leaves the gate and escapes the rings.']
        }[r]
      };
    }
    if (s === 'cayley') {
      const o = m.cayley;
      return {
        long: [`同一个 X = [σ]×：青色的 R = (I − X)⁻¹(I + X) 走 ${o.N} 步，每一步都落在紫球上，分母是 ${threeText(o)}；品红的二阶泰勒截断每步把模方乘 17/16，盘旋着离开球面。紫色的轴是 σ。`, `One and the same X = [σ]×: after ${o.N} steps the cyan R = (I − X)⁻¹(I + X) is still on the violet ball, its denominator ${threeText(o)}; the magenta second-order Taylor truncation multiplies the squared norm by 17/16 at each step and spirals off. The violet axis is σ.`],
        fig: [`青色的凯莱轨迹 ${o.N} 步仍在球面上，品红的泰勒截断盘旋离开。`, `After ${o.N} steps the cyan orbit is on the sphere; the magenta Taylor spiral is off.`]
      };
    }
    if (s === 'cheb') {
      const c = m.cheb;
      return r === 'start'
        ? { long: ['琥珀珠在下极 1，κ = 1。每一拍都只做 2c x − x′：一次有理乘法、一次减法。', 'The amber bead is at the lower pole 1 with κ = 1. Every beat is one rational product and one subtraction, 2c x − x′.'], fig: ['琥珀珠在下极 1，κ = 1，波还没有开始。', 'The amber bead is at the lower pole 1, κ = 1; the wave has not begun.'] }
        : {
            long: [`青色的珠 x₀ … x${subscript(c.t)} 都紧贴紫球的大圆，右边的波是同一串珠的高度：κ 总是分数，总在 0 与 1 之间。品红的显式欧拉步沿对数半径越转越远。`, `The cyan beads x₀ … x${subscript(c.t)} all sit on the great circle of the violet ball, and the wave at the side is their height: κ is always a fraction between 0 and 1. The magenta Euler steps wind out on a logarithmic radius.`],
            fig: [`青色的谐波珠紧贴大圆，右边是它们的 κ 波；品红的欧拉步盘旋而出。`, `The cyan beads stay on the circle beside their κ wave; magenta Euler spirals out.`]
          };
    }
    const o = m.jet,
      near = r === 'apex' ? ['吻合圆恰是球的大圆。', 'the osculating circle is the great circle of the ball.'] : ['淡青的宽带是二阶吻合圆。', 'the pale cyan band is the osculating circle.'],
      stray = r === 'meet' ? ['恰好与切线同斜率。', 'has the slope of the tangent here.'] : ['与切线之间夹着一片偏差。', 'leaves a wedge of error.'];
    return {
      long: [`琥珀切点 x = ${fstr(o.x)}：代进 x + η、令 η³ = 0，两项求逆就给出切线与弯度，不取极限；${near[0]}品红的割线用步长 h = ${fstr(o.h)}，${stray[0]}球上的粗链 x₀ → x₃ 只剩首尾，白色的中继成对消去。`, `At the amber point x = ${fstr(o.x)} the substitution x + η with η³ = 0 gives tangent and curvature by a two-term inversion, without a limit; ${near[1]} The magenta secant of step h = ${fstr(o.h)} ${stray[1]} On the ball the coarse chain x₀ → x₃ keeps its ends only: the pale relays cancel in pairs.`],
      fig: r === 'meet' ? ['青色切线由两项求逆得到；品红割线在这里恰好同斜率。', 'Cyan tangent by two terms; here the magenta secant has the same slope.'] : ['青色切线与吻合圆由两项求逆得到；品红割线偏开；球上的中继成对消去。', 'Cyan tangent and osculating circle by two terms; the magenta secant strays.']
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      flat = state.lens === 1,
      small = narrow(),
      { R: right, U: up } = cam;
    // a label sits (right, up) pixels from its point
    const off = (p, dx, dy) => add(add(p, scale(right, dx / sc.unit)), scale(up, dy / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'loop') {
      const o = m.loop;
      N('a2', off(circleAt(PI), 0, small ? -30 : -34), small ? '[1 : 0]' : '[1 : 0] · κ = 0', 'c-cy');
      N('a1', off(circleAt(PI / 2), small ? 26 : 62, 14), small ? '[1 : 1]' : '[1 : 1] · κ = 1/2', 'c-cy');
      N('a3', off(circleAt(-PI / 2), small ? -28 : -66, 14), small ? '[−1 : 1]' : '[−1 : 1] · κ = 1/2', 'c-cy');
      N('a0', off(circleAt(0), small ? -36 : -84, -22), small ? '[0 : 1]' : '[0 : 1] · κ = 1', 'c-cy');
      for (const x of small ? [0] : [-1, 0, 1]) N('tick' + x, off([2 * RHO * x, 0, -RHO], 0, -22), x ? `x = ${sgn(x)}` : 'x = 0', 'c-mg');
      N('flat', off(o.x === null ? [REACH() - 0.35, 0, RHO] : [0.5 * REACH(), 0, -RHO], 0, o.x === null ? -16 : 16), o.x === null ? '1/0' : `x = ${brief(o.x, 9)}`, 'c-mg');
      if (!small) N('circle', off(circleAt(-0.72 * PI), -34, 16), 'S¹(ℚ)', 'c-cy');
    }
    if (s === 'escape') {
      const e = m.escape,
        u = e.u,
        out = ringOut(e.S.length),
        { x0, y0, h, w } = euclidBox(e);
      if (e.k === 3) N('q', off([0, 0, RING_Q], small ? 0 : 74, small ? 20 : 12), small ? `q = ${e.q}` : `q = ${e.q} ${NOT_IN} S`, 'c-ik');
      N('gate', off([-out - 0.12, 0, 0], 0, 14), '0', 'c-ik');
      if (e.k === 1 || e.k === 2) N('number', off(knot(e.u, e.S.length), 0, -24), String(e.k === 1 ? e.product : e.N), 'c-ik');
      if (!small) {
        e.S.forEach((p, i) => i < 5 && u >= 1 && N('p' + i, off(slotAt(Number(p), clamp(u - 1, 0, 1), ringR(i)), i === 0 && u >= 2 ? 16 : 0, -18), `mod ${p}`, 'c-cy'));
        N('cf', seen(x0 + w / 2, y0 + h + 0.2, 0.2), `${fstr(e.cf)} = ${cfText(e.cf)}`, 'c-cy');
        N('terms', seen(x0 + w / 2, y0 - 0.2, 0.2), `${e.terms} ≤ ${e.bound}`, 'c-cy');
        N('lattice', seen(-0.95, -0.98, 1), `M = ${e.M} · ${e.lattice}`, 'c-vi');
      } else N('cf', seen(x0 + w / 2, y0 + h + 0.12, 0.2), fstr(e.cf), 'c-cy');
      if (flat) N('bag', off(slotAt(1, 0.5, out + 0.3), small ? -6 : 20, -18), L('素数 …', 'primes …'), 'c-mg');
    }
    if (s === 'cayley') {
      const o = m.cayley;
      N('v0', off(cayleyPoint(0), -24, 14), 'v₀', 'c-cy');
      // the label of the orbit sits inside the ball, the label of the spiral ahead of its end, where it has not been yet
      const p = scale(num(o.v), LIFT),
        q = scale(num(o.w), LIFT),
        ahead = sub(taylorPoint(o.N + 0.1), taylorPoint(o.N)),
        push = (v, px) => {
          const d = [dot(v, right), dot(v, up)],
            n = hypot(...d) || 1;
          return [(px * d[0]) / n, (px * 0.6 * d[1]) / n];
        };
      N('rn', off(p, ...push(p, small ? -34 : -52)), `R${superscript(o.N)}v₀`, 'c-cy');
      N('tn', off(q, ...push(ahead, small ? 40 : 58)), `exp₂${superscript(o.N)}v₀`, 'c-mg');
      N('axis', off(scale(AXIS, -1.6), small ? 0 : -22, small ? -14 : -12), L('转轴 σ', 'axis σ'), 'c-vi');
      if (!small) N('law', seen(-1.02, -0.86, 1), orbitLaw(o), 'c-cy');
    }
    if (s === 'cheb') {
      const c = m.cheb,
        { x0, w } = wave(),
        z = RHO * up[2];
      N('one', off(circleAt(0), small ? 0 : -30, -18), '1 · κ = 1', 'c-cy');
      N('minus', off(circleAt(PI), small ? 0 : -34, 18), '−1 · κ = 0', 'c-cy');
      N('now', off(onCircle(num(c.x)), c.t === 0 ? 34 : 0, 24), `x${subscript(c.t)}`, 'c-cy');
      N('top', seen(x0 + w * 0.5, z + 0.14, 0), 'κ = 0', 'c-ik');
      N('low', seen(x0 + w * 0.5, -z - 0.14, 0), 'κ = 1', 'c-ik');
      if (!small) N('kappa', off(wavePoint(c.t, fval(c.kappa)), 8, 24), `κ${subscript(c.t)} ${relQ(c.kappa)}`, 'c-cy');
      if (c.t > 0) N('euler', off(eulerPoint(c.t), small ? -14 : -30, small ? -16 : -18), small ? '1 + iΔθ' : `(1 + iΔθ)${superscript(c.t)}`, 'c-mg');
    }
    if (s === 'jet') {
      const o = m.jet,
        p = witch(fval(o.x), fval(o.j[0]));
      const g = jetLens(o);
      N('jet', off(p, small ? 34 : 70, small ? -22 : -30), jetBrief(o.j), 'c-cy');
      N('secant', seen(g.x, g.y + g.r + 0.13, 0.3), small ? brief(o.slope, 12) : `h = ${fstr(o.h)} · ${brief(o.slope, 12)}`, 'c-mg');
      if (!small) N('gain', seen(g.x + g.r + 0.14, g.y, 0.3), `×${g.gain}`, 'c-ik');
      N('x0', off(scale(unit(world(num(CHAIN[0]))), LIFT), -20, -16), 'x₀', 'c-cy');
      N('x3', off(scale(unit(world(num(CHAIN[3]))), LIFT), 18, 14), 'x₃', 'c-cy');
      N('dF', off(scale(unit(world(num(CHAIN[2]))), LIFT), small ? 4 : -34, 26), small ? `δF ${dFText()}` : `δF ${dFText()} · ${STOKES.zero}/${STOKES.quadruples}`, 'c-cy');
      for (const t of small ? [1] : [0.5, 1, 1.5]) N('xt' + t, off([2 * RHO * t, 0, -RHO], 0, -20), `x = ${fstr(ratio(t))}`, 'c-ik');
      if (!small) {
        N('curve', off(witch(JET_END() - 0.16), -8, -24), 'κ(x) = 1/(1 + x²)', 'c-cy');
        for (const k of [1, 2]) N('relay' + k, off(scale(unit(world(num(CHAIN[k]))), LIFT), k === 1 ? 22 : -20, k === 1 ? -4 : -18), `x${subscript(k)}`, 'c-ik');
      }
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|&gt;|[=≈≤]) −?\d[\d./]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    loop: ['滑过 [1 : 0] ▸', 'Slide past [1 : 0] ▸'],
    escape: ['把 q 收进 S ▸', 'Take q into S ▸'],
    jet: ['h 减半 ▸', 'Halve h ▸']
  };
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const act = ACTS[state.scene],
      b = $('stageAct');
    b.hidden = !act || TRV.still;
    if (act) {
      const text = L(...act);
      if (b.textContent !== text) b.textContent = text;
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
  function drawStage(m) {
    const w = layers();
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    fit(w, m);
    sc.begin();
    drawBall();
    drawLoop(m, w.loop);
    drawEscape(m, w.escape);
    drawCayley(m, w.cayley);
    drawCheb(m, w.cheb);
    drawJet(m, w.jet);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.6)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    tags(m);
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
      need = 9 + ROW * (rows - 1) + 24,
      share = clamp(need / ih, 0.38, 0.8);
    return lo + (hi - lo) / (1 - share);
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
  const PAD_B = [44, 16, 10, 22];
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      const o = m.cayley,
        beats = state.scene === 'cheb',
        n = beats ? clamp(m.cheb.t, 1, NMAX) : o.N;
      $('plotTitle').textContent = L('N 步之后谁还在球面上', 'Who is on the sphere after N steps');
      $('plotMeta').textContent = beats ? `t = ${m.cheb.t}` : `N = ${o.N}`;
      const items = [
        [P.cyan, '‖Rᴺv₀‖² ≡ ‖x‖² ≡ 1'],
        [P.magenta, L('泰勒 (17/16)ᴺ', 'Taylor (17/16)ᴺ')]
      ];
      const hi = fval(ORBIT[NMAX].taylor),
        lo = 0;
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cv, { x: [1, NMAX], y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: [[1, 'N = 1'], [6, '6'], [12, '12'], [18, '18'], [24, '24']], yTicks: [[0, '0'], [1, '1'], [2, '2'], [4, '4']] });
      g.line(range(NMAX).map((k) => [k + 1, fval(ORBIT[k + 1].taylor)]), P.magenta, { width: 2 });
      g.line(range(NMAX).map((k) => [k + 1, fval(ORBIT[k + 1].norm)]), P.cyan, { width: 2 });
      // the cursor stops at the highest curve value: the legend rows above stay clear
      g.line([[n, lo], [n, hi]], P.amber, { width: 1 });
      g.dot(n, fval(beats ? HEAP.norm[n] : ORBIT[n].norm), P.amber, 3.5);
      if (!beats) g.dot(n, fval(ORBIT[n].taylor), P.amber, 3.5);
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const o = m.jet;
      $('plotTitleB').textContent = L('精确导数对比割线斜率', 'Exact derivative against the secant');
      $('plotMetaB').textContent = `x = ${fstr(o.x).length < 8 ? fstr(o.x) : fmt(fval(o.x), 3)}`;
      const items = [
        [P.cyan, L('射流 κ′(x)', 'jet κ′(x)')],
        [P.magenta, L(`割线 h = ${fstr(o.h)}`, `secant h = ${fstr(o.h)}`)]
      ];
      const lo = -0.7,
        hi = 0.02,
        at = range(37).map((k) => frac(BigInt(k), 24n)),
        jets = at.map((x) => [fval(x), fval(jetOf(x)[1])]),
        secs = at.map((x) => [fval(x), fval(secantOf(x, o.h).slope)]);
      const rows = legendRows(cb, items, cb.clientWidth - PAD_B[0] - PAD_B[1] - 12);
      const g = kit.plot(cb, { x: [0, X_MAX], y: [lo, headroom(cb, PAD_B, rows.length, lo, hi)], pad: PAD_B });
      g.axes({ xTicks: [[0, 'x = 0'], [0.5, '1/2'], [1, '1'], [1.5, '3/2']], yTicks: [[0, '0'], [-0.25, '−1/4'], [-0.5, '−1/2']] });
      g.poly([...jets, ...[...secs].reverse()], P.magenta, { alpha: 0.28 });
      g.line(secs, P.magenta, { width: 1.8 });
      g.line(jets, P.cyan, { width: 2 });
      g.line([[fval(o.x), lo], [fval(o.x), hi]], P.amber, { width: 1 });
      g.dot(fval(o.x), fval(o.j[1]), P.amber, 3.5);
      g.dot(fval(o.x), fval(o.slope), P.amber, 3.5);
      drawLegend(g, rows);
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    const s = state.scene;
    if (s === 'loop')
      return L(
        `从圆上读回：C = ${circleText(m.loop)} ↦ ${pairText(pairBack(m.loop.C))}；‖C‖² ${relQ(dotQ(m.loop.C, m.loop.C))}；κ + s ${relQ(plus(m.loop.kappa, m.loop.spread))}。`,
        `Read back from the circle: C = ${circleText(m.loop)} ↦ ${pairText(pairBack(m.loop.C))}; ‖C‖² ${relQ(dotQ(m.loop.C, m.loop.C))}; κ + s ${relQ(plus(m.loop.kappa, m.loop.spread))}.`
      );
    if (s === 'escape') {
      const e = m.escape,
        lift = e.lift > e.M ? L(`${fstr(e.cf)} 的高度超过 M，按需提升到 ${e.lift}。`, `The height of ${fstr(e.cf)} exceeds M: lifted to ${e.lift} on demand.`) : '';
      const parts = e.parts.length > 1 ? factorText(e) : L(`${e.N} 是素数`, `${e.N} is prime`);
      return L(`收敛子 ${e.list.map(fstr).join(', ')}；${residueText(e)}；${parts}。${lift}`, `Convergents ${e.list.map(fstr).join(', ')}; ${residueText(e)}; ${parts}. ${lift}`);
    }
    if (s === 'cayley') return L(`R = ${matText(R)}，RᵀR = I ${sameM(matMul(transpose(R), R), IDENT) ? '成立' : '不成立'}，(R + I)⁻¹(R − I) = X ${sameM(XBACK, X) ? '成立' : '不成立'}。`, `R = ${matText(R)}; RᵀR = I ${sameM(matMul(transpose(R), R), IDENT) ? 'holds' : 'fails'}, (R + I)⁻¹(R − I) = X ${sameM(XBACK, X) ? 'holds' : 'fails'}.`);
    if (s === 'cheb') return L(`x<sub>${m.cheb.t}</sub> = (${m.cheb.x.slice(0, 2).map((q) => overPower(q, 5)).join(', ')}, 0, 0)；${eulerLaw(m.cheb)}。`, `x<sub>${m.cheb.t}</sub> = (${m.cheb.x.slice(0, 2).map((q) => overPower(q, 5)).join(', ')}, 0, 0); ${eulerLaw(m.cheb)}.`);
    return L(
      `κ″ = 2j₂ ${named(times(TWO, m.jet.j[2]))}；粗链 (x₃x₂⁻¹)(x₂x₁⁻¹)(x₁x₀⁻¹) = ${tuple(STOKES.product)}，x₃x₀⁻¹ = ${tuple(STOKES.direct)}；δF 归零 ${STOKES.zero}/${STOKES.quadruples}。`,
      `κ″ = 2j₂ ${named(times(TWO, m.jet.j[2]))}; chain (x₃x₂⁻¹)(x₂x₁⁻¹)(x₁x₀⁻¹) = ${tuple(STOKES.product)}, x₃x₀⁻¹ = ${tuple(STOKES.direct)}; δF = 0 on ${STOKES.zero}/${STOKES.quadruples}.`
    );
  }
  function tracks(m) {
    const e = m.escape;
    return {
      loop: [`κ ${relQ(m.loop.kappa)}`, `x = ${flatX(m.loop)}`],
      escape: [`q = ${e.q}`, L('全体素数', 'all primes')],
      cayley: [orbitLaw(m.cayley), `exp₂: ${taylorRel(m.cayley)}`],
      cheb: [`‖x<sub>${m.cheb.t}</sub>‖² ${heapRel(m.cheb)}`, `${L('欧拉', 'Euler')}: ${eulerRel(m.cheb)}`],
      jet: [`κ′ ${relQ(m.jet.j[1])}`, `${L('割线', 'secant')}: ${relQ(m.jet.slope)}`]
    }[state.scene];
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      o = m.loop,
      e = m.escape,
      c = m.cheb,
      j = m.jet;
    put('roKey', tracks(m).join(' ↔ '));
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roLoop', `${pairNow(m)} · ${o.den} · ${shareRel(o.kappa)} · ${shareRel(o.spread)} · ${circleText(o)}`);
    put('roHorizon', `M = ${e.M} · ${e.lattice} · ${e.scales} · ${fstr(e.cf)}: ${e.terms} ≤ ${e.bound}`);
    put('roPrime', `${setText(e.S)} · ${factorText(e)} · ${e.residues.join(', ')} · q = ${e.q}`);
    put('roCayley', `N = ${m.cayley.N} · ${m.cayley.den} · ${normRel(m.cayley)} · ${taylorRel(m.cayley)}`);
    put('roCheb', `${c.t} · ${chebText(c)} · ${relQ(c.kappa)} · ${heapRel(c)}`);
    put('roJet', `${fstr(j.x)} · ${jetSet(j.j)} · ${brief(j.slope)} · ${fstr(j.error).length <= 17 ? fstr(j.error) + ' ' : ''}${relQ(j.error)}`);
    put('roNote', readNote(m));
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`);
    put('keyPill', tracks(m)[0]);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { loop: 'κ = Q²/(P² + Q²)', escape: '∏p + 1 ≡ 1 (mod p)', cayley: 'R = (I − X)⁻¹(I + X)', cheb: 'x<sub>t+1</sub> = 2c x<sub>t</sub> − x<sub>t−1</sub>', jet: '(1 + u)⁻¹ = 1 − u + u²' }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('mRange').value = String(e.M);
    put('mOut', `= ${e.M}`);
    $('nRange').value = String(m.cayley.N);
    put('nOut', `= ${m.cayley.N}`);
    $('tRange').value = String(c.t);
    put('tOut', `= ${c.t}`);
    pairChips.set(o.k % 20 === 0 ? String(o.k / 20) : null, true);
    cfChips.set(state.cf, true);
    setChips.set(state.S.join(','), true);
    xChips.set(chipOf('xChips', 'x', j.x), true);
    hChips.set(state.h, true);
  }
  /** The chip of a group whose fraction is q, or null. */
  function chipOf(group, key, q) {
    const b = [...document.querySelectorAll(`#${group} [data-${key}]`)].find((el) => equal(parse(el.dataset[key]), q));
    return b ? b.dataset[key] : null;
  }
  let syncNotes = null;
  const paint = kit.painter(() => {
    const m = calc();
    hud(m);
    if (syncNotes) syncNotes(m);
    TRV.hudFit();
    drawStage(m);
    readings(m);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  const rail = () => RAILS[state.scene];
  /** The value of the rail: loop and jet live on the grid of 1/240, the others are freed from the rounding of their steps. */
  function settled(v) {
    if (state.scene === 'loop' || state.scene === 'jet') return gridK(v) / GRID;
    const back = Math.round(v);
    return Math.abs(v - back) < 1e-10 ? back : v;
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.loop.rate,
    step: RAILS.loop.step,
    max: RAILS.loop.max,
    t: STILL.loop,
    format: (t) => {
      const v = settled(t),
        n = split(v).k;
      switch (state.scene) {
        case 'loop':
          return `t = ${fstr(frac(BigInt(gridK(v)), BigInt(GRID)))} · ${pairText(pairOf(gridK(v)))}`;
        case 'escape':
          return split(v).f > 0 ? `${n} → ${n + 1}` : ['S', '∏p', '∏p + 1', 'q'][n];
        case 'cayley':
          return `N = ${n + 1}`;
        case 'cheb':
          return `t = ${n}`;
        default:
          return `x = ${fstr(frac(BigInt(gridK(v)), BigInt(GRID)))}`;
      }
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a rail that counts comes to rest on a whole number
      if (!c.playing && rail().whole && Math.abs(t - Math.round(t)) > 1e-9) {
        c.set(Math.round(t));
        return;
      }
      state.at[state.scene] = settled(t);
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
  /** Give the rail to the scene: its length, speed and step, and the value it drives. */
  function setRail() {
    const r = rail();
    clock.rate = r.rate;
    clock.step = r.step;
    $('now').step = r.whole ? '1' : state.scene === 'escape' ? 'any' : String(r.step);
    clock.setMax(r.max, true);
    clock.set(state.at[state.scene], true);
  }
  /** A pointer lands on whole numbers, on twelfths of loop and jet, and on a whole beat when it comes close to one. */
  function snap(v) {
    if (state.scene === 'loop' || state.scene === 'jet') return Math.round(v * 12) / 12;
    const k = Math.round(v);
    return rail().whole || Math.abs(v - k) < 0.03 ? k : v;
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
      (x) => {
        state.blend = x;
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
    setRail();
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
  const camFor = (scene) => Object.values(PRESETS).find((p) => p.scene === scene).cam;
  function show(scene) {
    if (state.scene === scene) return;
    setScene(scene, 0);
    state.cam = camFor(scene);
    camChips.set(state.cam, true);
    sc.view(cams[state.cam], 0);
  }
  /** A control of a card shows the card and puts its rail. */
  function steer(scene, t) {
    leave();
    show(scene);
    clock.set(t);
  }
  kit.field($('nRange'), { out: $('nOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('cayley', v - 1) });
  kit.field($('tRange'), { out: $('tOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('cheb', v) });
  kit.field($('mRange'), {
    out: $('mOut'),
    fmt: (v) => `= ${v}`,
    onInput: (v) => {
      leave();
      state.M = v;
      show('escape');
      paint();
    }
  });
  const pairChips = kit.chips($('pairChips'), 'pair', (v) => steer('loop', (Number(v) * 20) / GRID));
  const cfChips = kit.chips($('cfChips'), 'cf', (v) => {
    leave();
    state.cf = v;
    show('escape');
    paint();
  });
  const setChips = kit.chips($('setChips'), 'set', (v) => {
    leave();
    state.S = v.split(',').map(Number);
    show('escape');
    clock.set(RAILS.escape.max);
  });
  const xChips = kit.chips($('xChips'), 'x', (v) => steer('jet', fval(parse(v))));
  const hChips = kit.chips($('hChips'), 'h', (v) => {
    leave();
    state.h = v;
    show('jet');
    paint();
  });
  /** Play the rail from a to b and park there; a reader who asked for reduced motion gets the end at once. */
  function run(a, b) {
    clock.set(TRV.reduceMotion ? b : a);
    if (TRV.reduceMotion) return;
    stopAt = b;
    clock.play();
  }
  const SET_MAX = 6;
  /** The escaped prime joins S and the next escape runs; a full list starts again from {2, 3, 5}. */
  function takeIn() {
    const { q } = escapeOf(state.S);
    leave();
    state.S = state.S.length >= SET_MAX ? DEFAULTS.S.slice() : [...state.S, Number(q)].sort((a, b) => a - b);
    show('escape');
    run(0, RAILS.escape.max);
  }
  /** Once round past [1 : 0]: from [1 : 1] to [−1 : 1]. The card stays marked: this is the clock of the card. */
  function slideOver() {
    stopBootPlay();
    show('loop');
    clock.pause();
    run(1, 3);
  }
  function halve() {
    const list = [...document.querySelectorAll('#hChips [data-h]')].map((b) => b.dataset.h);
    leave();
    state.h = list[(list.indexOf(state.h) + 1) % list.length];
    paint();
  }
  $('takeBtn').addEventListener('click', takeIn);
  $('stageAct').addEventListener('click', () => ({ loop: slideOver, escape: takeIn, jet: halve })[state.scene]());
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'panorama';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar (narrow pages and
  // embeds, where the rail sits below the evidence) both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'lensMirror']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards ---------- */
  const CARD_OF = Object.fromEntries(Object.entries(PRESETS).map(([id, p]) => [p.scene, id]));
  function applyPreset(id) {
    const p = PRESETS[id];
    stopBootPlay();
    stopAt = null;
    clock.pause();
    state.at = { ...STILL };
    Object.assign(state, { ...DEFAULTS, S: DEFAULTS.S.slice() });
    // a still, a reader who asked for reduced motion and a freshly opened page park on the declared frame
    const parked = TRV.still || TRV.reduceMotion || booting;
    if (!parked) state.at[p.scene] = 0;
    setScene(p.scene, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    } else if (booting && TRV.embed && !TRV.still && !TRV.reduceMotion) bootAutoplay(p.still);
    paint();
  }
  /* the notes follow the live frame, as the HUD line does (regimeOf): the marked card and the free-play line are rewritten
     in place when their text changes. A cited figure and a phone carry the short form. */
  const notesObj = Object.fromEntries(Object.keys(PRESETS).map((id) => [id, ['', '']])),
    idlePair = ['', ''];
  const shortNotes = () => TRV.figure || window.innerWidth <= 520;
  function writeNotes(m) {
    const n = noteOf(m),
      pair = shortNotes() ? n.fig : n.long;
    notesObj[CARD_OF[state.scene]] = pair;
    idlePair[0] = '自由探索：' + pair[0];
    idlePair[1] = 'Free play: ' + pair[1];
    return pair;
  }
  writeNotes(calc());
  const cards = kit.cards($('presets'), {
    presets: PRESETS,
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
    frozen = true; // the picture keeps its scale while the point is dragged
    handle.setPointerCapture(dragging);
    handle.classList.add('dragging');
  };
  handle.onpointermove = (ev) => {
    if (ev.pointerId !== dragging) return;
    const b = $('cv').getBoundingClientRect(),
      x = ev.clientX - b.left,
      y = ev.clientY - b.top;
    // the place of the rail nearest the pointer; the two ends of the loop are one point, told apart by the present place
    const n = { loop: 48, jet: 18, escape: 90 }[state.scene] || clock.max;
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= n; k++) {
      const v = (clock.max * k) / n,
        p = sc.p(handleWorld(v)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(clock.t - v) * 1e-4;
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
    frozen = false;
    handle.classList.remove('dragging');
    paint();
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(clock.max);
    else clock.stepBy(ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : -1);
  };

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Only the sizes of the samples are given here: the pairs, the lattice, the orbit, the heap, the jets and the machines are
     run, and the sentences take their numbers from the results. */
  const FRAME = { M: 12, N: 12, t: 12, x: [1n, 1n], x2: [1n, 2n], h: [1n, 4n], S: [2, 3, 5], S6: [2, 3, 5, 7, 11, 13], r: [3n, 4n], names: 3 };
  const AXES = [
    [1, 2, 0],
    [1, -2, 0],
    [0, 1, 2],
    [0, 1, -2],
    [2, 0, 1],
    [-2, 0, 1]
  ];
  /** The comparison machine of the Lean file, run on two Boolean words: its answer and the number of its steps. */
  function compareRun(a, b) {
    // stacks with the top at the front
    let label = 'compare',
      steps = 0,
      same = true;
    const st = { left: a.slice(), right: b.slice(), savedLeft: [], savedRight: [], output: [] };
    while (label) {
      steps++;
      if (label === 'compare') {
        const x = st.left.shift(),
          y = st.right.shift();
        if (x === undefined && y === undefined) label = 'restoreLeft';
        else {
          same = same && x === y;
          if (x !== undefined) st.savedLeft.unshift(x);
          if (y !== undefined) st.savedRight.unshift(y);
        }
      } else if (label === 'restoreLeft') {
        const x = st.savedLeft.shift();
        if (x === undefined) label = 'restoreRight';
        else st.left.unshift(x);
      } else if (label === 'restoreRight') {
        const x = st.savedRight.shift();
        if (x === undefined) label = 'finish';
        else st.right.unshift(x);
      } else {
        st.output.unshift(same);
        label = null;
      }
    }
    return { steps, out: st.output[0], kept: st.left.join() === a.join() && st.right.join() === b.join() && !st.savedLeft.length && !st.savedRight.length };
  }
  /** Divide out a prime while the power stays the identity, for a matrix of finite order. */
  function stripFactors(A, list, m) {
    const pow = (n) => range(n).reduce((acc) => matMul(acc, A), IDENT);
    return list.reduce((n, p) => {
      while (p > 1 && n % p === 0 && sameM(pow(n / p), IDENT)) n /= p;
      return n;
    }, m);
  }
  function benchmarks() {
    // the scales of height at most M: on the circle, told apart, read back; their continued fractions
    const list = scales(FRAME.M);
    let circleBad = 0,
      cfBad = 0,
      cfMost = 0;
    const seenPoints = new Set();
    for (const pq of list) {
      const o = readPair(pq),
        back = pairBack(o.C);
      seenPoints.add(tuple(o.C));
      if (!equal(dotQ(o.C, o.C), ONE) || back[0] !== pq[0] || back[1] !== pq[1] || !equal(plus(o.kappa, o.spread), ONE)) circleBad++;
      if (pq[1] === 0n) continue;
      const x = frac(...pq),
        conv = convergents(x);
      cfMost = Math.max(cfMost, conv.length);
      if (conv.length > cfBound(x) || !equal(conv[conv.length - 1], x)) cfBad++;
    }
    if (seenPoints.size !== list.length) circleBad++;
    // reduced fractions s/r
    let denBad = 0,
      dens = 0;
    for (let r = 1n; r <= 24n; r++)
      for (let s = 0n; s <= 24n; s++) {
        dens++;
        if (frac(s, r)[1] !== r / gcd(s, r)) denBad++;
      }
    // the lattice: on the sphere, covered by the six axes, no orthogonal pair of one colour
    const nodes = NODES.filter((n) => n[3] <= FRAME.M),
      colour = (n, a) => 5 * n[3] * n[3] < 2 * (n[0] * a[0] + n[1] * a[1] + n[2] * a[2]) ** 2;
    const uncovered = nodes.filter((n) => !AXES.some((a) => colour(n, a))).length;
    let pairs = 0,
      orthogonal = 0;
    for (const a of AXES) {
      const own = nodes.filter((n) => colour(n, a));
      for (const n of own)
        for (const k of own) {
          pairs++;
          if (n[0] * k[0] + n[1] * k[1] + n[2] * k[2] === 0) orthogonal++;
        }
    }
    // readings, chords and the group at a base point, on points of the lattice of the slice
    const points = nodes.filter((n) => n[3] <= 3).map((n) => [...n.slice(0, 3).map((k) => frac(BigInt(k), BigInt(n[3]))), ZERO]),
      few = points.filter((_, k) => k % 5 === 0);
    let chordBad = 0,
      triBad = 0,
      idle = 0,
      triples = 0;
    for (const x of points) for (const y of points) if (!equal(kappaQ(x, y), minus(ONE, times(frac(1n, 4n), dotQ(subQ(x, y), subQ(x, y)))))) chordBad++;
    const o = SEED,
      mul = (x, y) => tri(x, o, y),
      inv = (x) => tri(o, x, o);
    for (const x of few)
      for (const y of few) {
        if (!sameQ(tri(y, x, x), y)) idle++;
        for (const z of few) {
          triples++;
          if (!sameQ(tri(x, y, z), mul(mul(x, inv(y)), z))) triBad++;
        }
      }
    // the Cayley orbit and its truncations
    const cayleyBad = ORBIT.filter((k, N) => !(equal(k.norm, ONE) && k.den === 3n ** BigInt(N) && equal(k.taylor, power(frac(17n, 16n), N)))).length;
    const theta = SIZE,
      tail = hypot(cs(theta) - 1 + (theta * theta) / 2, sn(theta) - theta),
      tailBound = quo(times(power(FRAME.r, 3), frac(1n, 6n)), minus(ONE, times(FRAME.r, frac(1n, 4n))));
    // the heap against the Chebyshev formulas
    let chebBad = 0;
    HEAP.xs.forEach((x, t) => {
      if (t < 2) return;
      const form = HEAP.xs[1].map((v, i) => minus(times(HEAP.U[t], v), times(HEAP.U[t - 1], HEAP.xs[0][i]))),
        linear = HEAP.xs[t - 1].map((v, i) => minus(times(times(TWO, HEAP.c), v), HEAP.xs[t - 2][i]));
      if (!sameQ(x, form) || !sameQ(x, linear) || !equal(x[0], HEAP.T[t]) || !equal(HEAP.norm[t], ONE) || !equal(HEAP.kappa[t], times(HALF, plus(ONE, HEAP.T[t])))) chebBad++;
    });
    // the jet against the closed form, and as a ring map: (1 + x²) κ = 1 in the ring
    let jetBad = 0,
      jets = 0;
    for (let k = -24n; k <= 24n; k++) {
      const x = frac(k, 12n),
        D = plus(ONE, times(x, x)),
        j = jetOf(x),
        form = [quo(ONE, D), neg(quo(times(TWO, x), times(D, D))), quo(minus(times(whole(3), times(x, x)), ONE), times(D, times(D, D)))],
        unitJet = jetMul(j, [D, times(TWO, x), ONE]);
      jets++;
      if (!sameQ(j, form) || !sameQ(unitJet, [ONE, ZERO, ZERO])) jetBad++;
    }
    // orders of rational rotations, by stripping
    const orders = [
      [ints(1, 1, 1), 12],
      [ints(1, 0, 0), 24]
    ].map(([s, m]) => ({ s, m, order: stripFactors(rotor(s), [2, 3], m) }));
    // the product formula on the scales and on the escapes
    const size = ([a, d], p) => {
      let v = 0n;
      for (let x = mag(a); x % p === 0n; x /= p) v--;
      for (let x = d; x % p === 0n; x /= p) v++;
      return v < 0n ? frac(1n, p ** -v) : frac(p ** v);
    };
    const escapes = [FRAME.S, FRAME.S6].map(escapeOf),
      rationals = [...list.filter((pq) => pq[0] !== 0n && pq[1] !== 0n).map((pq) => frac(...pq)), ...escapes.map((e) => frac(e.N, e.product))];
    let formulaBad = 0;
    for (const x of rationals) {
      const primes = [...new Set([...(mag(x[0]) > 1n ? factors(mag(x[0])) : []), ...(x[1] > 1n ? factors(x[1]) : [])])];
      if (!equal(primes.reduce((acc, p) => times(acc, size(x, p)), [mag(x[0]), x[1]]), ONE)) formulaBad++;
    }
    // the nearest fraction of small denominator to a logarithm
    let least = Infinity;
    for (let n = 2; n <= FRAME.M; n++) for (let q = 1; q <= FRAME.M; q++) least = Math.min(least, Math.abs(Math.log(n) - Math.round(q * Math.log(n)) / q));
    // the root phase on the path x₀ – x₁ – x₂ – x₃ with rational phases
    const phase = (p, q) => readPair([p, q]).C,
      zmul = (a, b) => [minus(times(a[0], b[0]), times(a[1], b[1])), plus(times(a[0], b[1]), times(a[1], b[0]))],
      zinv = ([a, b]) => [a, neg(b)];
    const run = (u) => u.reduce((acc, e) => [...acc, zmul(e, acc[acc.length - 1])], [[ONE, ZERO]]),
      u = [phase(1n, 2n), phase(2n, 3n), phase(-1n, 3n)],
      w = [phase(3n, 4n), phase(1n, 5n), phase(5n, 2n)],
      g = [phase(1n, 3n), phase(-3n, 2n), phase(4n, 1n), phase(1n, 0n)],
      [fu, fw, fuw, fg, f1] = [u, w, u.map((e, i) => zmul(e, w[i])), u.map((e, i) => zmul(zmul(g[i + 1], e), zinv(g[i]))), u.map(() => [ONE, ZERO])].map(run);
    let treeBad = sameQ(fu[0], [ONE, ZERO]) ? 0 : 1;
    range(4).forEach((k) => {
      if (k && !sameQ(fu[k], zmul(u[k - 1], fu[k - 1]))) treeBad++;
      if (!sameQ(fuw[k], zmul(fu[k], fw[k])) || !sameQ(f1[k], [ONE, ZERO]) || !sameQ(fg[k], zmul(zmul(g[k], fu[k]), zinv(g[0])))) treeBad++;
    });
    // the comparison machine on all words of at most three bits, and on the binary names of the two escaped primes
    const words = [[]];
    for (let k = 0; k < words.length; k++) if (words[k].length < FRAME.names) for (const bit of [false, true]) words.push([...words[k], bit]);
    let runs = 0,
      runBad = 0;
    for (const a of words)
      for (const b of words) {
        runs++;
        const r = compareRun(a, b);
        if (r.out !== (a.join() === b.join()) || !r.kept || r.steps > 2 * (a.length + b.length) + 4) runBad++;
      }
    const bits = (n) => n.toString(2).split('').map((c) => c === '1'),
      named_ = compareRun(bits(escapes[0].q), bits(escapes[1].q));
    return {
      pairs: list.length,
      circleBad,
      cfBad,
      cfMost,
      dens,
      denBad,
      nodes: nodes.length,
      uncovered,
      colourPairs: pairs,
      orthogonal,
      points: points.length,
      chordBad,
      triples,
      triBad,
      idle,
      cayleyBad,
      tail,
      tailBound,
      chebBad,
      jets,
      jetBad,
      orders,
      escapes,
      rationals: rationals.length,
      formulaBad,
      least,
      treeBad,
      words: words.length,
      runs,
      runBad,
      names: { steps: named_.steps, out: named_.out, bound: 2 * (bits(escapes[0].q).length + bits(escapes[1].q).length) + 4 },
      orbit: ORBIT[FRAME.N],
      heap: { t: FRAME.t, T: HEAP.T[FRAME.t], kappa: HEAP.kappa[FRAME.t], norm: HEAP.norm[FRAME.t], x: HEAP.xs[FRAME.t], euler: eulerNorm(FRAME.t) },
      jet: jetOf(FRAME.x),
      jet2: jetOf(FRAME.x2),
      secant: secantOf(FRAME.x, FRAME.h),
      meet: secantOf(FRAME.x2, FRAME.h),
      stokes: STOKES
    };
  }
  const BENCH = benchmarks();
  const anchorList = (say) => ANCHORS.map((pq) => `${pairText(pq)} ↦ κ = ${fstr(readPair(pq).kappa)}${say('，', ', ')}C = ${tuple(readPair(pq).C)}`).join(say('；', '; '));
  const escapeLine = (e) => `∏p + 1 = ${factorText(e)}`;
  const cfLine = (x) => `${cfText(x)}`;
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const NUMBERS = {
    anchors: anchorList,
    lattice: () => `= ${LATTICE[FRAME.M]}`,
    scales: () => `= ${BENCH.pairs}`,
    cf: (say) => {
      const x = parse(DEFAULTS.cf);
      return `${cfLine(x)}${say('，', ', ')}${convergents(x).length} ≤ ${cfBound(x)}`;
    },
    escape: (say) => `${escapeLine(BENCH.escapes[0])}${say('，', ', ')}q = ${BENCH.escapes[0].q}`,
    escape6: (say) => `${escapeLine(BENCH.escapes[1])}${say('，', ', ')}q = ${BENCH.escapes[1].q}`,
    matrix: () => matText(R),
    three: () => `= ${BENCH.orbit.den}`,
    cayley: () => normRel(BENCH.orbit),
    det: () => relQ(DET),
    taylor: () => taylorRel(BENCH.orbit),
    cheb: () => overPower(BENCH.heap.T, 5),
    kappa12: () => waveText(BENCH.heap),
    heap: () => heapRel(BENCH.heap),
    euler: () => rel(null, BENCH.heap.euler),
    jet1: () => `${jetAtX(FRAME.x)} = ${jetPoly(BENCH.jet)}`,
    jet2: () => `${jetAtX(FRAME.x2)} = ${jetPoly(BENCH.jet2)}`,
    secant: () => named(BENCH.secant.slope),
    error: () => named(BENCH.secant.error),
    stokes: () => `${STOKES.zero}/${STOKES.quadruples}`
  };
  /** The text of the NUM box. */
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      O = B.orbit,
      H = B.heap,
      N = superscript(FRAME.N),
      law = (o) => say(`斜率 ${fstr(o.slope)}，${errorLaw(o, say)}`, `slope ${fstr(o.slope)}, ${errorLaw(o, say)}`),
      secant = `h = ${fstr(FRAME.h)}`,
      orders = B.orders.map((k) => `${tuple(k.s)}: ${k.m} → ${k.order}`).join(say('，', ', '));
    return say(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提；分数全部用大整数精确计算，只有“≈”后的数是舍入的。射影：${anchorList(say)}；高度不超过 ${FRAME.M} 的标度 ${B.pairs} 个，‖C‖² = 1、逐点相异、读回 [P : Q] 与 κ + s = 1 ${bad(B.circleBad)}，连分数最长 ${B.cfMost} 项、对上界 2⌊log₂ q⌋ + 1 ${bad(B.cfBad)}；${B.dens} 个 s/r 的既约分母${bad(B.denBad)}。视界 M = ${FRAME.M}：切片格点 ${B.nodes} 个，未被六轴盖住 ${B.uncovered} 个，同色 ${B.colourPairs} 个有序对里正交 ${B.orthogonal} 对；${B.points} 个格点两两的 κ 与 1 − 弦长²/4 ${bad(B.chordBad)}，基点 (3 + 4i)/5 的群分解在 ${B.triples} 个三元组上${bad(B.triBad)}，[y, x, x] = y ${bad(B.idle)}。逃逸：${B.escapes.map((e) => `S = ${setText(e.S)} 给出 ${escapeLine(e)}，各环余数 ${e.residues.join(', ')}，q = ${e.q}`).join('；')}；乘积公式在 ${B.rationals} 个有理数上${bad(B.formulaBad)}；n = 2 … ${FRAME.M} 的 log n 与分母不超过 ${FRAME.M} 的分数的最小距离 ${rel(null, B.least)}。凯莱：R = ${matText(R)}，det R ${relQ(DET)}，逆映射找回 X ${bad(sameM(XBACK, X) ? 0 : 1)}；R${N}v₀ = ${orbitText(O)}，分母 ${threeText(O)}，‖R${N}v₀‖² ${normRel(O)}；N = 0 … ${NMAX} 的模方、分母 3<sup>N</sup> 与泰勒模方 (17/16)<sup>N</sup> ${bad(B.cayleyBad)}；${taylorLaw(O, say)}，一阶欧拉 ${firstLaw(O, say)}；余项：r = ${fstr(FRAME.r)} 时界是 ${fstr(B.tailBound)}，而 ‖exp X − exp₂(X)‖ ${rel(null, B.tail)}。谐波：T<sub>${H.t}</sub>(3/5) = ${overPower(H.T, 5)}，κ<sub>${H.t}</sub> ${waveText(H)}，‖x<sub>${H.t}</sub>‖² ${heapRel(H)}，${eulerLaw(H, say)}，Δθ ${dthRel()}；t = 2 … ${TMAX} 的堆递推与切比雪夫公式${bad(B.chebBad)}。射流：${jetAtX(FRAME.x)} = ${jetPoly(B.jet)}，即 ${jetDecimals(B.jet).join('、')}；${jetAtX(FRAME.x2)} = ${jetPoly(B.jet2)}，即 ${jetDecimals(B.jet2).join('、')}；${B.jets} 个切点与闭式、与 (1 + x²)κ = 1 ${bad(B.jetBad)}；${secant} 在 x = ${fstr(FRAME.x)}：${law(B.secant)}；在 x = ${fstr(FRAME.x2)}：${law(B.meet)}。粗链乘积等于首尾比 ${bad(STOKES.same ? 0 : 1)}；四面体的面值 ${STOKES.areas.map(fstr).join(', ')}，δF = 0 有 ${STOKES.zero}/${STOKES.quadruples} 个，各锚点的面错误 ${STOKES.faceErrors.join(', ')}；路径 x₀x₁x₂x₃ 上有理相位的根相位${bad(B.treeBad)}。定阶：R(σ) 的阶由剥离得到 ${orders}。比较机：${B.words} 个不超过 ${FRAME.names} 位的词、${B.runs} 次运行${bad(B.runBad)}；${B.escapes[0].q} 与 ${B.escapes[1].q} 的二进制名用 ${B.names.steps} 步判定${B.names.out ? '相等' : '不等'}，上界 ${B.names.bound} 步。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it does not check their hypotheses; fractions are exact, in big integers, and only numbers after “≈” are rounded. Projective: ${anchorList(say)}; ${B.pairs} scales of height up to ${FRAME.M}: ‖C‖² = 1, distinct points, [P : Q] read back and κ + s = 1, ${bad(B.circleBad)}; continued fractions of at most ${B.cfMost} terms, against 2⌊log₂ q⌋ + 1, ${bad(B.cfBad)}; denominators of ${B.dens} fractions s/r, ${bad(B.denBad)}. Horizon M = ${FRAME.M}: ${B.nodes} lattice points of the slice, ${B.uncovered} not covered by the six axes, ${B.orthogonal} orthogonal among ${B.colourPairs} ordered pairs of one colour; on pairs of ${B.points} of them κ vs 1 − chord²/4, ${bad(B.chordBad)}; the group at the base point (3 + 4i)/5 on ${B.triples} triples, ${bad(B.triBad)}; [y, x, x] = y, ${bad(B.idle)}. Escape: ${B.escapes.map((e) => `S = ${setText(e.S)} gives ${escapeLine(e)}, remainders ${e.residues.join(', ')}, q = ${e.q}`).join('; ')}; the product formula on ${B.rationals} rationals, ${bad(B.formulaBad)}; the least distance of log 2 … log ${FRAME.M} from fractions of denominator up to ${FRAME.M} ${rel(null, B.least)}. Cayley: R = ${matText(R)}, det R ${relQ(DET)}, the inverse returns X, ${bad(sameM(XBACK, X) ? 0 : 1)}; R${N}v₀ = ${orbitText(O)}, denominator ${threeText(O)}, ‖R${N}v₀‖² ${normRel(O)}; squared norm, denominator 3<sup>N</sup> and Taylor norm (17/16)<sup>N</sup> for N = 0 … ${NMAX}, ${bad(B.cayleyBad)}; ${taylorLaw(O, say)}, first-order Euler ${firstLaw(O, say)}; remainder: with r = ${fstr(FRAME.r)} the bound is ${fstr(B.tailBound)}, while ‖exp X − exp₂(X)‖ ${rel(null, B.tail)}. Harmonic: T<sub>${H.t}</sub>(3/5) = ${overPower(H.T, 5)}, κ<sub>${H.t}</sub> ${waveText(H)}, ‖x<sub>${H.t}</sub>‖² ${heapRel(H)}, ${eulerLaw(H, say)}, Δθ ${dthRel()}; the heap for t = 2 … ${TMAX} vs the Chebyshev formulas, ${bad(B.chebBad)}. Jets: ${jetAtX(FRAME.x)} = ${jetPoly(B.jet)}, that is ${jetDecimals(B.jet).join(', ')}; ${jetAtX(FRAME.x2)} = ${jetPoly(B.jet2)}, that is ${jetDecimals(B.jet2).join(', ')}; ${B.jets} points vs the closed form and (1 + x²)κ = 1, ${bad(B.jetBad)}; ${secant} at x = ${fstr(FRAME.x)}: ${law(B.secant)}; at x = ${fstr(FRAME.x2)}: ${law(B.meet)}. The chain product vs the ends, ${bad(STOKES.same ? 0 : 1)}; face values ${STOKES.areas.map(fstr).join(', ')}, δF = 0 on ${STOKES.zero}/${STOKES.quadruples}, face errors ${STOKES.faceErrors.join(', ')}; the root phase of rational phases on x₀x₁x₂x₃, ${bad(B.treeBad)}. Orders of R(σ) by stripping: ${orders}. Comparison machine: ${B.words} words of at most ${FRAME.names} bits, ${B.runs} runs, ${bad(B.runBad)}; the binary names of ${B.escapes[0].q} and ${B.escapes[1].q} are found ${B.names.out ? 'equal' : 'different'} in ${B.names.steps} steps, bound ${B.names.bound}. A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [
    ['zh', ZH],
    ['en', EN]
  ]) {
    document.querySelector(`#basis .lean.num .${lang}`).innerHTML = numText(say);
    for (const el of document.querySelectorAll(`#drawer .${lang} [data-bench]`)) el.innerHTML = NUMBERS[el.dataset.bench](say);
  }
  // the drawer repeats every evidence box of the panel, filled
  $('drawerEvidence').append(...[...document.querySelectorAll('#basis .lean')].map((el) => el.cloneNode(true)));
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(paint);

  /* ---------- probe, cover, start ---------- */
  /** Big integers as strings, so that the probe survives JSON. */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.FINITE_DEBUG = Object.freeze({
    get state() {
      return plain({
        ...calc(),
        at: state.at,
        scene: state.scene,
        regime: regimeOf(calc()),
        lens: state.lens,
        cam: state.cam,
        S: state.S,
        M: state.M,
        cf: state.cf,
        h: state.h,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam }
      });
    },
    /** The mathematics at a rail value of a scene and some parameters, without touching the page. */
    calc: (scene, t, over = {}) => {
      const o = { ...DEFAULTS, ...over };
      return plain(compute({ ...STILL, [scene]: t }, o.S, o.M, o.cf, o.h));
    },
    presets: plain(PRESETS),
    orbit: () => plain(ORBIT),
    matrices: () => plain({ X, R, EXP2, XBACK, det: DET, sigma: SIGMA }),
    heap: () => plain(HEAP),
    nodes: () => plain({ list: NODES, lattice: LATTICE, scales: SCALES }),
    scales: (M) => plain(scales(M)),
    cf: (s) => plain({ list: convergents(parse(s)), terms: quotients(parse(s)), bound: cfBound(parse(s)), squares: squares(parse(s)) }),
    escape: (S) => plain(escapeOf(S)),
    jet: (s) => plain(jetOf(parse(s))),
    secant: (s, h) => plain(secantOf(parse(s), parse(h))),
    stokes: () => plain({ ...STOKES, chain: CHAIN }),
    compareRun,
    /** What the NUM box and the drawer are written from. */
    bench: () => plain({ ...BENCH, frame: FRAME }),
    /** Where the marks of the stage are, in world coordinates. */
    geometry: {
      circle: (s) => loopPoint(parse(s)[0] === 0n ? 0 : fval(parse(s))),
      knot,
      cayley: cayleyPoint,
      taylor: taylorPoint,
      heap: heapPoint,
      euler: eulerPoint,
      witch: (x) => witch(x),
      rho: RHO
    },
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), sci },
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint
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
