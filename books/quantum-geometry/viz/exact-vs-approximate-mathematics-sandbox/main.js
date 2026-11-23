/* OMEGA//EXACT · 精确结构数学对比平直近似 · exact structural mathematics vs. flat approximation (Chapter 39, §39.11)
   World (kit.solid): z up. The ball is a great two-sphere slice of the unit quaternions S³(1) = 𝕋₃; a quaternion
   w + xi + yj + zk is drawn at (x, −ρ, w), ρ = y on the slice z = 0 and ρ = √(y² + z²) for a rotor outside it, which is
   first turned about the axis i into the front half of the slice. The turn keeps the squared norm, the height w = 2κ − 1
   and the i component. On the three-beat card the slice is {w + xu + yv} with u = (i + j + k)/√3 along x.
     struct   the f-vector of a simplicial S³, two linked Hopf circles, the regular geodesic tetrahedron with its face
              areas in units of π modulo 4, and the inscribed N-gon with the semiperimeter N sin(π/N);
     beat     g₁ = (1, 1, 1), g_{k+1} = g_k ⋆ g₁ and Q(g₁)^k, against z = −0.5 + 0.8660i in the plane;
     stars    the rational points Q(σ) of the slice with σ of denominator at most D, and one chosen σ ∈ ℚ³;
     chain    q_K, the alternating product of Q(a) = (3 + 4i)/5 and Q(b) = (3 + 4j)/5 with big-integer numerators over
              5^K, against the flat sum x_flat,K = 1 + Σ 2c_k in the tangent plane at 1;
     prime    the adelic product of N(p) with the weight (p + δ)⁻¹ of one prime, and (MODEL) the Cayley images of the
              mirror pair 1/2 ± δ + iγ₁ with the least eigenvalue of their 96 × 96 power-sum Toeplitz matrix.
   The rail is N, k, D, K or δ. Fractions are pairs of big integers [p, q], q > 0. Every number is computed here; a number
   is printed after “=” only when the printed decimal is the value, decided on fractions, and after “≈” when it rounds it.
   Read-only probe: window.EXACT_DEBUG. */
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
  const sample = (n, fn) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));
  const range = (n) => Array.from({ length: n }, (_, i) => i);
  const fmt = (x, d = 4) => (!Number.isFinite(x) ? '∞' : kit.fix(x, d));

  /* ---------- exact numbers: fractions [p, q] of big integers, q > 0 ---------- */
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
  const equal = (a, b) => cmp(a, b) === 0;
  const total = (xs) => xs.reduce(plus, [0n, 1n]);
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
  const parse = (s) => {
    const [p, q = '1'] = s.split('/');
    return frac(BigInt(p), BigInt(q));
  };
  /** A fraction in d decimals, rounded to the nearest: the text, and whether the decimal is the fraction itself. */
  function decimals([p, q], d) {
    const a = (p < 0n ? -p : p) * 10n ** BigInt(d),
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
    const mark = LANDMARKS.find(([v]) => Number(text.replace('−', '-')) === v);
    if (mark) {
      const [v, name] = mark,
        gap = q ? fval(minus(q, ratio(v))) : x - v;
      if (gap !== 0) return name ? `≈ ${name} ${gap < 0 ? '−' : '+'} ${sci(Math.abs(gap))}` : `≈ ${sci(gap)}`;
    }
    return `≈ ${text}`;
  }
  /** A fraction that is its own value. */
  const relQ = (q, d = 4) => rel(q, fval(q), d);
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

  /* ---------- rational vectors and quaternions ---------- */
  const ZERO = whole(0),
    ONE = whole(1),
    TWO = whole(2),
    HALF = frac(1n, 2n);
  const dotQ = (a, b) => total(a.map((x, i) => times(x, b[i])));
  const addQ = (a, b) => a.map((x, i) => plus(x, b[i]));
  const scaleQ = (a, k) => a.map((x) => times(x, k));
  const crossQ = (a, b) => [0, 1, 2].map((i) => minus(times(a[(i + 1) % 3], b[(i + 2) % 3]), times(a[(i + 2) % 3], b[(i + 1) % 3])));
  const sameQ = (a, b) => a.every((x, i) => equal(x, b[i]));
  /** The composition of Rodrigues: a ⋆ b = (a + b + a × b)/(1 − a · b). */
  const star = (a, b) => scaleQ(addQ(addQ(a, b), crossQ(a, b)), quo(ONE, minus(ONE, dotQ(a, b))));
  /** The rational Cayley map Q(σ) = (1 − ‖σ‖² + 2σ)/(1 + ‖σ‖²). */
  function cayley(s) {
    const n = dotQ(s, s),
      d = plus(ONE, n);
    return [quo(minus(ONE, n), d), ...s.map((x) => quo(times(TWO, x), d))];
  }
  /** The inverse of the Cayley map: σ = Im q/(1 + Re q). */
  const inverse = (q) => q.slice(1).map((x) => quo(x, plus(ONE, q[0])));
  const mulQ = (a, b) => {
    const t = (i, j) => times(a[i], b[j]);
    return [minus(minus(minus(t(0, 0), t(1, 1)), t(2, 2)), t(3, 3)), minus(plus(plus(t(0, 1), t(1, 0)), t(2, 3)), t(3, 2)), plus(plus(minus(t(0, 2), t(1, 3)), t(2, 0)), t(3, 1)), plus(minus(plus(t(0, 3), t(1, 2)), t(2, 1)), t(3, 0))];
  };
  const conjQ = ([w, x, y, z]) => [w, ...[x, y, z].map(([p, q]) => [-p, q])];
  const num = (v) => v.map(fval);
  const ints = (...xs) => xs.map(whole);
  const tuple = (v) => `(${v.map(fstr).join(', ')})`;
  const QONE = ints(1, 0, 0, 0),
    QI = ints(0, 1, 0, 0);
  /** Numerators over the common denominator of a rational quaternion. */
  function common(q) {
    const den = q.reduce((d, [, b]) => {
      let [x, y] = [d, b];
      while (y) [x, y] = [y, x % y];
      return (d / x) * b;
    }, 1n);
    return { den, nums: q.map(([a, b]) => (a * den) / b) };
  }
  /** Σ numerator² over denominator² of a rational quaternion, unreduced: 25/25. */
  const squares = (q) => {
    const { den, nums } = common(q);
    return [nums.reduce((s, n) => s + n * n, 0n), den * den];
  };
  /** The reading κ(1, q) = (1 + Re q)/2. */
  const kappaOne = (q) => times(HALF, plus(ONE, q[0]));

  /* ---------- card 1: integers that cannot drift, and the inscribed polygon ---------- */
  /** The boundary of the 4-simplex is a triangulated S³: its faces by dimension and the ranks of its boundary maps. */
  const COMPLEX = (() => {
    const faces = range(4).map((d) => {
      const out = [];
      for (let mask = 1; mask < 31; mask++) {
        const v = range(5).filter((i) => mask & (1 << i));
        if (v.length === d + 1) out.push(v);
      }
      return out;
    });
    /** The rank of an integer matrix by elimination in fractions. */
    const rank = (rows) => {
      const A = rows.map((r) => r.map(whole));
      let r = 0;
      for (let c = 0; c < (A[0] || []).length && r < A.length; c++) {
        const p = range(A.length).find((i) => i >= r && A[i][c][0] !== 0n);
        if (p === undefined) continue;
        [A[r], A[p]] = [A[p], A[r]];
        for (let i = r + 1; i < A.length; i++) {
          const k = quo(A[i][c], A[r][c]);
          if (k[0] !== 0n) A[i] = A[i].map((x, j) => minus(x, times(k, A[r][j])));
        }
        r++;
      }
      return r;
    };
    const ranks = [0, 1, 2, 3, 4].map((d) => (d === 0 || d === 4 ? 0 : rank(faces[d].map((f) => faces[d - 1].map((g) => { const k = f.findIndex((v) => !g.includes(v)); return f.filter((_, i) => i !== k).join() === g.join() ? (k % 2 ? -1 : 1) : 0; })))));
    const f = faces.map((x) => x.length);
    return { f, chi: f.reduce((s, n, d) => s + (d % 2 ? -n : n), 0), betti: f.map((n, d) => n - ranks[d] - ranks[d + 1]) };
  })();
  /* two Hopf circles { x e^{iθ} } of one Clifford torus, in the stereographic projection σ = Im q/(1 + Re q), the axis i
     upright; the scale puts the torus round the ball */
  const ETA = (78 * PI) / 180,
    RING = 1.1 / Math.tan(ETA / 2);
  const hopfPoint = (th, ph) => {
    const d = 1 + cs(ETA) * cs(th);
    return scale([sn(ETA) * cs(th + ph), -sn(ETA) * sn(th + ph), cs(ETA) * sn(th)], RING / d);
  };
  /** The linking number of two closed polygons: half the sum of the signs of their crossings seen along a direction. */
  function linking(A, B, seen = [0.31, 0.17]) {
    const flat = (p) => [p[0] - seen[0] * p[2], p[1] - seen[1] * p[2], p[2]],
      a = A.map(flat),
      b = B.map(flat);
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const p = a[i],
        u = sub(a[(i + 1) % a.length], p);
      for (let j = 0; j < b.length; j++) {
        const q = b[j],
          v = sub(b[(j + 1) % b.length], q),
          det = u[0] * v[1] - u[1] * v[0];
        if (det === 0) continue;
        const w = sub(q, p),
          s = (w[0] * v[1] - w[1] * v[0]) / det,
          t = (w[0] * u[1] - w[1] * u[0]) / det;
        if (s < 0 || s >= 1 || t < 0 || t >= 1) continue;
        sum += Math.sign(det) * Math.sign(p[2] + s * u[2] - q[2] - t * v[2]);
      }
    }
    return Math.abs(sum) / 2;
  }
  const HOPF = [0, PI].map((ph) => range(360).map((k) => hopfPoint((TAU * k) / 360, ph)));
  const LINK = linking(HOPF[0], HOPF[1]);
  /** The regular tetrahedron: integer vertices (all on one sphere), and the signed areas of its geodesic faces in units of
      π, F(i, j, k) = ±1 for a face and 0 for a repeated index, taken modulo the whole sphere, 4. */
  const CORNERS = [
    [1, 1, 1],
    [1, -1, -1],
    [-1, 1, -1],
    [-1, -1, 1]
  ];
  const TETRA = (() => {
    const det = ([a, b, c]) => a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    const F = (i, j, k) => Math.sign(det([CORNERS[i], CORNERS[j], CORNERS[k]])),
      mod = (x) => ((x % 4) + 4) % 4,
      all = range(4);
    let quadruples = 0,
      zero = 0,
      whole4 = 0,
      edgeErrors = 0;
    const faceErrors = [0, 0, 0, 0];
    for (const r of all)
      for (const i of all)
        for (const j of all)
          for (const k of all) {
            const c = F(i, j, k) - F(r, j, k) + F(r, i, k) - F(r, i, j);
            quadruples++;
            if (mod(c) === 0) zero++;
            else faceErrors[r]++;
            if (Math.abs(c) === 4) whole4++;
          }
    // the edge cochain anchored at the corner 0 reproduces F
    for (const i of all) for (const j of all) for (const k of all) if (mod(F(i, j, k) - (F(0, j, k) - F(0, i, k) + F(0, i, j))) !== 0) edgeErrors++;
    // face_cycle_exact on K₄ in the sphere: rotation system, faces, rank of the boundary over 𝔽₂
    const darts = [];
    for (const a of all) for (const b of all) if (a !== b) darts.push([a, b]);
    const id = (a, b) => darts.findIndex((d) => d[0] === a && d[1] === b),
      turn = ([a, b]) => {
        const [x, y] = all.filter((v) => v !== a && v !== b);
        return id(a, F(a, b, x) > 0 ? x : y);
      };
    const face = new Array(darts.length).fill(-1);
    let faces = 0;
    darts.forEach((_, s) => {
      if (face[s] >= 0) return;
      for (let d = s; face[d] < 0; d = turn([darts[d][1], darts[d][0]])) face[d] = faces;
      faces++;
    });
    const edges = darts.filter(([a, b]) => a < b);
    let kernel = 0;
    const images = new Set();
    for (let mask = 0; mask < 1 << faces; mask++) {
      const image = edges.map(([a, b]) => ((mask >> face[id(a, b)]) & 1) ^ ((mask >> face[id(b, a)]) & 1)).join('');
      images.add(image);
      if (!image.includes('1')) kernel++;
    }
    let even = 0;
    for (let mask = 0; mask < 1 << edges.length; mask++) if (all.every((v) => edges.filter((e, k) => (mask >> k) & 1 && e.includes(v)).length % 2 === 0)) even++;
    return { quadruples, zero, whole4, faceErrors, edgeErrors, V: 4, E: edges.length, faces, kernel, image: images.size, even };
  })();
  const gonOf = (N) => {
    const semi = N * sn(PI / N);
    return { N, semi, short: PI - semi, sagitta: 1 - cs(PI / N) };
  };
  /** N sin(π/N) is rational for N = 6 alone among N ≥ 3 (Niven). */
  const semiRel = (g) => rel(g.N === 6 ? whole(3) : null, g.semi);
  const sagRel = (g) => rel(g.N === 3 ? HALF : null, g.sagitta);

  /* ---------- card 2: (1, 1, 1) in three beats, and the four-decimal z of the plane ---------- */
  const G1 = ints(1, 1, 1);
  const BEATS = (() => {
    const g = [ints(0, 0, 0), G1],
      Q = [QONE, cayley(G1)],
      den = [null, null];
    for (let k = 2; k <= 3; k++) {
      den.push(minus(ONE, dotQ(g[k - 1], G1)));
      g.push(star(g[k - 1], G1));
      Q.push(mulQ(Q[k - 1], Q[1]));
    }
    // the rotation R(g₁) of the spinor q₁ = (1 + i + j + k)/2 on the axes
    const q1 = [HALF, HALF, HALF, HALF],
      turn = (v) => mulQ(mulQ(q1, v), conjQ(q1));
    const axes = [ints(0, 1, 0, 0), ints(0, 0, 1, 0), ints(0, 0, 0, 1)];
    return { g, Q, den, q1, axes: axes.map((v) => axes.findIndex((w) => sameQ(turn(v), w))), cube: mulQ(mulQ(q1, q1), q1), square: mulQ(q1, q1) };
  })();
  const ZDEC = [frac(-1n, 2n), frac(8660n, 10000n)];
  const cmul = (a, b) => [minus(times(a[0], b[0]), times(a[1], b[1])), plus(times(a[0], b[1]), times(a[1], b[0]))];
  /** z as it is written in the plane: one decimal and four. */
  const zText = () => `${decimals(ZDEC[0], 1).text} + ${decimals(ZDEC[1], 4).text}i`;
  const ZPOW = (() => {
    const out = [[ONE, ZERO]];
    for (let k = 1; k <= 3; k++) out.push(cmul(out[k - 1], ZDEC));
    return out;
  })();
  const zNorm = (k) => dotQ(ZPOW[k], ZPOW[k]);
  const Z_GAP = hypot(fval(minus(ZPOW[3][0], ONE)), fval(ZPOW[3][1]));

  /* ---------- card 3: the rational points of the slice ---------- */
  const LAYERS = 9;
  /** The bound of a rail value k: the denominator of a rational point of the two-sphere, in lowest terms, is odd. */
  const boundOf = (k) => 2 * k + 1;
  /** The points (w, x, y)/d of the slice with w² + x² + y² = d² in lowest terms, without −1, as [w, x, y, d]. */
  const NODES = (() => {
    const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a)),
      out = [];
    for (let d = 1; d <= boundOf(LAYERS - 1); d += 2)
      for (let w = 1 - d; w <= d; w++)
        for (let x = -d; x <= d; x++) {
          const y = Math.round(Math.sqrt(Math.max(0, d * d - w * w - x * x)));
          if (w * w + x * x + y * y !== d * d || gcd(gcd(gcd(w, x), y), d) !== 1) continue;
          out.push([w, x, y, d]);
          if (y) out.push([w, x, -y, d]);
        }
    return out;
  })();
  const COUNT = range(LAYERS).map((k) => NODES.filter((n) => n[3] <= boundOf(k)).length);
  const nodeQ = ([w, x, y, d]) => [...[w, x, y].map((n) => frac(BigInt(n), BigInt(d))), ZERO];
  /** σ = Im q/(1 + Re q) of a node. */
  const nodeSigma = (n) => inverse(nodeQ(n));
  /** The four-decimal truncation of a fraction, towards 0. */
  const trunc4 = ([p, q]) => {
    const a = ((p < 0n ? -p : p) * 10000n) / q;
    return frac(p < 0n ? -a : a, 10000n);
  };

  /* ---------- card 4: the alternating rotor chain in big integers, and the flat sum ---------- */
  const KMAX = 24;
  const A_HALF = [HALF, ZERO, ZERO],
    B_HALF = [ZERO, HALF, ZERO];
  const CHAIN = (() => {
    const imul = (a, b) => [a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3], a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2], a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1], a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]];
    const stepA = common(cayley(A_HALF)),
      stepB = common(cayley(B_HALF)),
      out = [{ nums: [1n, 0n, 0n, 0n], den: 1n, flat: [1n, 0n, 0n, 0n] }];
    for (let K = 1; K <= KMAX; K++) {
      const last = out[K - 1],
        c = K % 2 ? A_HALF : B_HALF,
        s = K % 2 ? stepA : stepB;
      // the first-order truncation 1 + 2c of Q(c) adds its imaginary part to the flat sum
      const flat = [last.flat[0], ...c.map((x, i) => last.flat[i + 1] + (2n * x[0]) / x[1])];
      out.push({ nums: imul(last.nums, s.nums), den: last.den * s.den, flat });
    }
    return out.map((x, K) => ({
      K,
      ...x,
      norm: frac(
        x.nums.reduce((s, n) => s + n * n, 0n),
        x.den * x.den
      ),
      reduced: x.den === 1n || x.nums.some((n) => n % 5n !== 0n),
      flat2: x.flat.reduce((s, n) => s + n * n, 0n),
      q: x.nums.map((n) => fval(frac(n, x.den)))
    }));
  })();

  /* ---------- card 5: the adelic product with one nudged weight, and (MODEL) the mirror pair ---------- */
  const PRIMES = [2, 3, 5, 7, 11, 13];
  /** N(p): 42 = 2·3·7 holds the primes 2, 3 and 7; for the others N = 2·3·p. */
  const numberOf = (p) => (p <= 3 ? 42 : 6 * p);
  const valuation = (n, p) => {
    let v = 0;
    for (; n % p === 0; v++) n /= p;
    return v;
  };
  const factors = (n) => PRIMES.filter((p) => n % p === 0);
  /** The adelic product of N with the weight (p + δ)^{−v} at p, as a fraction. */
  function adelic(p, delta) {
    const N = numberOf(p);
    return factors(N).reduce((acc, r) => {
      const base = r === p ? plus(whole(r), delta) : whole(r);
      let out = acc;
      for (let v = valuation(N, r); v > 0; v--) out = quo(out, base);
      return out;
    }, whole(N));
  }
  /** The ordinate of the first zero of ζ (a tabulated decimal) and the size of the Toeplitz matrix. */
  const GAMMA1 = 14.134725141734695,
    NT = 95,
    DELTA_MAX = 0.2;
  /** The Cayley images of 1/2 ∓ δ + iγ: one angle, two reciprocal norms. */
  function images(delta) {
    const g = GAMMA1,
      lo = (0.5 - delta) ** 2 + g * g;
    return { theta: Math.atan2(g, g * g + delta * delta - 0.25), log: 0.5 * Math.log1p((2 * delta) / lo) };
  }
  /** The least eigenvalue of the (N + 1) × (N + 1) Toeplitz matrix of p_n = 4 cosh(an) cos(θn). With s = j − N/2 it is
      4 (A Aᵀ − D Dᵀ) + 4 (B Bᵀ − C Cᵀ), A = cosh cos and D = sinh sin even, B = cosh sin and C = sinh cos odd; each
      difference has one eigenvalue ½(t − √(t² + 4Δ)), t = ‖P‖² − ‖Q‖², Δ the Gram determinant of the two vectors. */
  function toeplitzLeast(delta, N = NT) {
    const { theta, log: a } = images(delta);
    if (a === 0) return 0;
    let AA = 0,
      DD = 0,
      AD = 0,
      BB = 0,
      CC = 0,
      BC = 0;
    for (let j = 0; j <= N; j++) {
      const s = j - N / 2,
        ch = Math.cosh(a * s),
        sh = Math.sinh(a * s),
        c = cs(theta * s),
        d = sn(theta * s);
      AA += ch * c * ch * c;
      DD += sh * d * sh * d;
      AD += ch * c * sh * d;
      BB += ch * d * ch * d;
      CC += sh * c * sh * c;
      BC += ch * d * sh * c;
    }
    const low = (pp, qq, pq) => {
      const t = pp - qq,
        gram = Math.max(0, pp * qq - pq * pq),
        root = Math.sqrt(t * t + 4 * gram);
      return t > 0 ? (-2 * gram) / (t + root) : (t - root) / 2;
    };
    return 4 * Math.min(low(AA, DD, AD), low(BB, CC, BC));
  }
  const lambdaMemo = new Map();
  const lambdaOf = (delta) => {
    const key = Math.round(delta * 1e9);
    if (!lambdaMemo.has(key)) lambdaMemo.set(key, toeplitzLeast(delta));
    return lambdaMemo.get(key);
  };
  const LAMBDA_CURVE = sample(40, (u) => [DELTA_MAX * u, toeplitzLeast(DELTA_MAX * u)]);

  /* ---------- the state: one rail value per card, and everything the page shows of it ---------- */
  const SCENES = ['struct', 'beat', 'stars', 'chain', 'prime'];
  // the rail of a card: its length, the number it starts from, its speed (units per second), its keyboard step
  const RAILS = {
    struct: { max: 21, from: 3, rate: 5, step: 1, whole: true },
    beat: { max: 3, from: 0, rate: 0.8, step: 1, whole: false },
    stars: { max: LAYERS - 1, from: 1, stride: 2, rate: 2, step: 1, whole: true },
    chain: { max: KMAX - 1, from: 1, rate: 3.5, step: 1, whole: true },
    prime: { max: DELTA_MAX, from: 0, rate: 0.025, step: 0.005, whole: false }
  };
  const STILL = { struct: 9, beat: 3, stars: 6, chain: 11, prime: 0.05 };
  const SEED = '1/2,0,0';
  const seedOf = (s) => s.split(',').map(parse);
  const state = { scene: 'beat', at: { ...STILL }, sigma: seedOf(SEED), prime: 7, lens: 0, cam: 'face', from: null, blend: 1 };
  /** The whole part and the rest of a rail value that counts. */
  function split(t) {
    const k = Math.floor(t + 1e-9);
    return { k, f: t - k < 1e-9 ? 0 : t - k };
  }
  function compute(at, sigma, prime) {
    const beat = split(at.beat),
      chain = split(at.chain),
      K = chain.k + 1,
      Q = cayley(sigma),
      dQ = grid(at.prime, 200),
      A = adelic(prime, dQ),
      { theta, log } = images(at.prime);
    const tail = Q.map(trunc4),
      N = numberOf(prime);
    return {
      gon: gonOf(3 + split(at.struct).k),
      beat: { k: beat.k, f: beat.f, g: BEATS.g[beat.k], Q: BEATS.Q[beat.k], kappa: kappaOne(BEATS.Q[beat.k]), norm: dotQ(BEATS.Q[beat.k], BEATS.Q[beat.k]), z: ZPOW[beat.k], z2: zNorm(beat.k) },
      star: { sigma, Q, squares: squares(Q), norm: dotQ(Q, Q), kappa: kappaOne(Q), tail, tail2: dotQ(tail, tail), D: boundOf(split(at.stars).k), count: COUNT[split(at.stars).k] },
      chain: { ...CHAIN[K], K, f: K < KMAX ? chain.f : 0 },
      prime: { p: prime, N, parts: factors(N), delta: at.prime, dq: dQ, A, theta, log, out: Math.exp(log), inn: Math.exp(-log), lambda: lambdaOf(at.prime), cut: factors(N).reduce((acc, r) => times(acc, trunc4(frac(1n, BigInt(r)))), whole(N)) }
    };
  }
  const calc = () => compute(state.at, state.sigma, state.prime);

  /* ---------- the printed relations of a frame ---------- */
  const deltaRel = (pr) => relQ(pr.dq, 3);
  const adelicRel = (pr) => relQ(pr.A);
  const lambdaRel = (pr) => rel(pr.delta === 0 ? ZERO : null, pr.lambda);
  const gapRel = () => `≈ ${sci(Z_GAP, 2)}`;
  const normRel = (c) => rel(c.norm, dot(c.q, c.q));
  const flatRel = (c) => relQ(frac(c.flat2));
  /** 25/25 and its decimal. */
  const squaresRel = (st) => `= ${st.squares[0]}/${st.squares[1]} ${relQ(frac(...st.squares))}`;
  const starKappa = (st) => `= ${fstr(st.kappa)}${st.kappa[1] === 1n ? '' : ` ${relQ(st.kappa)}`}`;
  const beatKappa = (b) => (b.kappa[1] === 1n ? relQ(b.kappa) : `= ${fstr(b.kappa)} ${relQ(b.kappa)}`);
  const complexText = ([re, im]) => {
    const put = (q) => {
      const n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].find((d) => decimals(q, d).exact);
      return decimals(q, n === undefined ? 12 : n).text;
    };
    if (im[0] === 0n) return put(re);
    return `${put(re)} ${im[0] < 0n ? '−' : '+'} ${put(im[0] < 0n ? [-im[0], im[1]] : im)}i`;
  };
  const zNormRel = (k) => {
    const q = zNorm(k),
      d = [4, 5, 6].find((n) => decimals(q, n).exact);
    return relQ(q, d || 6);
  };
  const weightText = (pr, say = L) => `${pr.N} = ${pr.parts.join('·')}`;

  /* ---------- scenes and their layers; a card change blends the layers ---------- */
  const layerOf = (scene) => Object.fromEntries(SCENES.map((s) => [s, s === scene ? 1 : 0]));
  function layers() {
    const to = layerOf(state.scene);
    if (!state.from || state.blend >= 1) return to;
    return Object.fromEntries(SCENES.map((s) => [s, lerp(state.from[s], to[s], state.blend)]));
  }
  const cams = { panorama: [-0.42, 0.3, 1], face: [-0.1, 0.1, 1], under: [0.28, -0.28, 1] };
  const PRESETS = {
    'structural-topological-exactness-vs-flat-decimal': { scene: 'struct', cam: 'panorama', play: true, still: STILL.struct },
    'pure-integer-111-three-beat-closure': { scene: 'beat', cam: 'face', play: true, still: STILL.beat },
    'dense-rational-cayley-sphere-constellation': { scene: 'stars', cam: 'panorama', play: true, still: STILL.stars },
    'complete-ternary-star-vs-flat-addition-derailment': { scene: 'chain', cam: 'under', play: true, still: STILL.chain },
    'prime-topological-adelic-rigidity-alarm': { scene: 'prime', cam: 'face', play: true, still: STILL.prime }
  };
  const DEFAULT = 'pure-integer-111-three-beat-closure';

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
  /** A point x to the right, y up and d towards the viewer. */
  const seen = (x, y, d = 0) => add(add(scale(cam.R, x), scale(cam.U, y)), scale(cam.D, d));
  /** The world point of a quaternion: on the slice z = 0 as it is, otherwise turned about i into the front half. */
  const world = ([w, x, y, z], front = false) => [x, z === 0 && !front ? -y : -hypot(y, z), w];
  const LIFT = 1.014;
  const BEAT_R = 1.035;
  const beatPoint = (t) => scale([sn((TAU * t) / 3), 0, cs((TAU * t) / 3)], BEAT_R);
  /** The flat sum in the tangent plane at 1: the direction as it is, the distance on a logarithmic scale. */
  const FLAT_SPAN = 1.5;
  const flatDist = (d) => (FLAT_SPAN * Math.log1p(d)) / Math.log1p(hypot(12, 12));
  const flatPoint = ([, x, y]) => {
    const d = hypot(x, y);
    return d === 0 ? [0, 0, 1.004] : [(x / d) * flatDist(d), (-y / d) * flatDist(d), 1.004];
  };
  const flatNum = (K) => CHAIN[K].flat.map(Number);
  /** The rotor between q_K and q_{K+1}: q_K times the part u of the next factor. */
  const PHI = Math.atan2(4, 3);
  function chainAt(K, u) {
    const q = CHAIN[K].q,
      c = cs(u * PHI),
      s = sn(u * PHI);
    const [w, x, y, z] = q;
    const r = K % 2 === 0 ? [w * c - x * s, x * c + w * s, y * c + z * s, z * c - y * s] : [w * c - y * s, x * c - z * s, y * c + w * s, z * c + x * s];
    return scale(world(r, true), LIFT);
  }
  /* the unit circle of the Cayley images: a ring round the ball in the plane y = 0, angles and radial offsets enlarged */
  const CIRCLE_R = 1.3,
    ANGLE_GAIN = 8,
    RADIAL_GAIN = 220;
  const imagePoint = (delta, sign, side) => {
    const { theta, log } = images(delta),
      r = CIRCLE_R * (1 + RADIAL_GAIN * sign * log),
      a = side * ANGLE_GAIN * theta;
    return [r * cs(a), 0, r * sn(a)];
  };
  const limb = (a, r = 1, d = 1.06) => seen(r * sn(a), r * cs(a), d);
  /** The world point of the amber mark for a rail value v. */
  function handleWorld(v) {
    switch (state.scene) {
      case 'struct':
        return limb(TAU / (3 + split(v).k));
      case 'beat':
        return beatPoint(v);
      case 'stars':
        return scale(world(num(cayley(state.sigma))), LIFT);
      case 'chain': {
        const { k, f } = split(v);
        return chainAt(k + 1, k + 1 < KMAX ? f : 0);
      }
      default:
        return imagePoint(v, 1, 1);
    }
  }
  /** Fit what the cards draw, between the title and the legend. */
  const BALL = [-1.08, 1.08, -1.08, 1.08];
  /** The right, left, low and high ends of the ball and some world points as they are seen now. */
  const around = (pts) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, BALL);
  const PLATE = 1.14;
  const SIDE = {
    struct: () => [-1.72, 1.72, -1.5, 1.08],
    beat: () => [-1.14, 2.34, stage.clientWidth < 480 ? -1.18 : -1.36, 1.14],
    stars: () => [-1.1, stage.clientWidth < 480 ? 1.32 : 1.6, -1.08, 1.1],
    chain: () => around([[-0.2, 0.2], [PLATE, 0.2], [PLATE, -PLATE], [-0.2, -PLATE]].map(([x, y]) => [x, y, 1])),
    prime: (m) => around([...sample(24, (u) => [1.04 * CIRCLE_R * cs(TAU * u), 0, 1.04 * CIRCLE_R * sn(TAU * u)]), imagePoint(m.prime.delta, 1, 1), imagePoint(m.prime.delta, 1, -1)])
  };
  function fit(w, m) {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
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
  const tube = (key, pts, color, r, alpha = 1, glow = 0.3) => alpha > 0.01 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, r, glow, occlude: false, pick: false, alpha });
  /* the weights of the two tracks in the two lenses: exact cyan and flat magenta */
  const weight = () => (state.lens ? { exact: 0.45, flat: 1 } : { exact: 1, flat: 0.8 });
  function drawBall() {
    // the ball is darker towards −1 and brighter towards +1: the shade follows the height, κ = (1 + w)/2
    const at = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
    sc.surface('ball', at, { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-0.62, 1.5], value: (u) => (1 + cs(u)) / 2, grid: { every: [5, 10], alpha: 0.2 } });
    sc.glass('halo', [0, 0, 0], 1.03, { color: P.violet, alpha: 0.03, rim: 0.4 });
  }
  function drawStruct(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight();
    HOPF.forEach((pts, k) => tube('hopf' + k, [...pts.filter((_, i) => i % 3 === 0), pts[0]], P.cyan, 0.026, a * exact));
    const V = CORNERS.map((v) => unit(v));
    for (const [i, j] of [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]) {
      const om = Math.acos(dot(V[i], V[j]));
      tube('tetra' + i + j, sample(24, (u) => scale(add(scale(V[i], sn((1 - u) * om)), scale(V[j], sn(u * om))), LIFT / sn(om))), P.cyan, 0.013, a * exact);
    }
    V.forEach((v, k) => sc.bead(scale(v, LIFT), { color: P.cyan, r: 4.6, alpha: a * exact, key: 'corner' + k }));
    // the inscribed N-gon of the outline circle, in front of the ball, and the slivers it cuts off
    const N = m.gon.N,
      at = (k, u = 0) => (TAU * (k + u)) / N;
    for (let k = 0; k < N; k++) sc.fan([...sample(6, (u) => limb(at(k, u)))], { fill: P.magenta, alpha: 0.75 * a * flat });
    sc.line(range(N).map((k) => limb(at(k))), { color: P.magenta, width: 2.2, alpha: a * flat, close: true });
    // the ruler: the half circle unrolled, π long, and the semiperimeter laid along it
    const c = 2.2 / PI,
      x0 = -1.1,
      y = -1.3,
      mark = (x, y0, y1, color, w) => sc.line([seen(x, y0, 1.06), seen(x, y1, 1.06)], { color, width: w, alpha: a });
    sc.line([seen(x0, y - 0.07, 1.06), seen(x0 + c * PI, y - 0.07, 1.06)], { color: P.cyan, width: 3, alpha: a * exact });
    sc.line([seen(x0, y, 1.06), seen(x0 + c * m.gon.semi, y, 1.06)], { color: P.magenta, width: 3, alpha: a * flat });
    sc.line([seen(x0, y, 1.05), seen(x0 + c * PI, y, 1.05)], { color: P.magenta, width: 1, alpha: 0.5 * a });
    for (let k = 0; k <= 6; k++) mark(x0 + (c * k) / 2, y, y + (k % 2 ? 0.04 : 0.075), P.magenta, 1.2);
    mark(x0 + c * m.gon.semi, y - 0.03, y + 0.1, P.magenta, 1.6);
    mark(x0 + c * PI, y - 0.1, y + 0.1, P.cyan, 1.6);
  }
  function drawBeat(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      t = m.beat.k + m.beat.f;
    sc.line(sample(120, (u) => beatPoint(3 * u)), { color: P.cyan, width: 1.4, dash: [6, 5], alpha: 0.7 * a * exact });
    for (let k = 0; k < 3; k++) {
      const end = clamp(t - k, 0, 1);
      if (end > 1e-6) tube('arc' + k, sample(Math.max(3, Math.ceil(26 * end)), (u) => beatPoint(k + end * u)), P.cyan, 0.024, a * exact);
    }
    sc.circle([0, 0, -0.5], [0, 0, 1], Math.sqrt(0.75) * LIFT, { color: P.cyan, width: 1.2, alpha: 0.6 * a * exact });
    [0, 1, 2].forEach((k) => sc.bead(beatPoint(k), { color: P.cyan, r: 5.4, alpha: a * exact, key: 'station' + k }));
    sc.arrow([BEAT_R + 0.03, 0, 0], [BEAT_R + 0.26, 0, 0], { color: P.violet, width: 2, headSize: 9, alpha: a });
    // the axes seen down the diagonal (1, 1, 1): R(g₁) sends e₁ ↦ e₂ ↦ e₃ ↦ e₁
    const c = [1.8, 0.6],
      r = 0.36,
      on = (ang, k = 1) => seen(c[0] + k * r * cs(ang), c[1] + k * r * sn(ang), 0.3),
      axis = (k) => PI / 2 + (TAU * k) / 3;
    sc.line(sample(60, (u) => on(TAU * u)), { color: P.violet, width: 1, alpha: 0.7 * a, dash: [3, 4] });
    for (let k = 0; k < 3; k++) sc.arrow(on(axis(k), 0.02), on(axis(k)), { color: P.violet, width: 1.8, headSize: 7, alpha: a });
    if (t > 1e-6) sc.line(sample(48, (u) => on(axis(t * u), 1.14)), { color: P.cyan, width: 2.4, alpha: a * exact });
    sc.bead(on(axis(t), 1.14), { color: P.cyan, r: 4.4, alpha: a * exact, key: 'axis' });
    // the flat plane: the powers of z, and a lens on the gap at 1
    const f = [1.8, -0.5],
      R = 0.46,
      plane = (x, y) => seen(f[0] + R * x, f[1] + R * y, 0.3);
    const disc = sample(72, (u) => plane(cs(TAU * u), sn(TAU * u)));
    sc.fan(disc.slice(0, -1), { fill: P.magenta, alpha: 0.07 * a });
    sc.line(disc, { color: P.magenta, width: 1.3, alpha: 0.75 * a * flat });
    for (let k = 1; k <= m.beat.k; k++) {
      const [x, y] = num(ZPOW[k]);
      if (k < 3) sc.bead(plane(x, y), { color: P.magenta, r: 3.8, alpha: a * flat, key: 'z' + k });
    }
    const lens = 0.52,
      into = (dx, dy) => plane(0.2 + dx * LENS_GAIN, dy * LENS_GAIN);
    sc.line(sample(48, (u) => plane(lens * cs(TAU * u), lens * sn(TAU * u))), { color: P.ink, width: 1.2, alpha: 0.8 * a });
    sc.line([plane(1, 0), plane(lens, 0)], { color: P.ink, width: 1, dash: [3, 3], alpha: 0.7 * a });
    sc.line([plane(0.2, -0.46), plane(0.2, 0.46)], { color: P.magenta, width: 1.2, alpha: 0.75 * a * flat });
    sc.bead(plane(0.2, 0), { color: P.cyan, r: 3.6, alpha: a * exact, key: 'one' });
    if (m.beat.k === 3) {
      const [x, y] = num(ZPOW[3]);
      sc.arrow(plane(0.2, 0), into(x - 1, y), { color: P.magenta, width: 1.8, headSize: 6, alpha: a * flat });
      sc.bead(into(x - 1, y), { color: P.magenta, r: 3.6, alpha: a * flat, key: 'z3' });
    }
  }
  /** The enlargement of the gap at 1 in the lens. */
  const LENS_GAIN = 5000;
  /* the constellation is one polyhedron of small octahedra, built once for each denominator bound */
  const starMesh = new Map();
  function stars(D) {
    if (!starMesh.has(D)) {
      const vertices = [],
        faces = [];
      for (const n of NODES) {
        if (n[3] > D) continue;
        const p = scale(world(num(nodeQ(n))), 1.006),
          r = 0.042 / n[3] ** 0.34,
          b = vertices.length;
        for (const [k, s] of [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1]]) vertices.push(p.map((x, i) => x + (i === k ? s * r : 0)));
        for (const i of [0, 1]) for (const j of [2, 3]) for (const k of [4, 5]) faces.push((i + j + k) % 2 === 0 ? [b + i, b + j, b + k] : [b + j, b + i, b + k]);
      }
      starMesh.set(D, { vertices, faces });
    }
    return starMesh.get(D);
  }
  const LATITUDES = [
    [4n, 5n],
    [1n, 3n],
    [1n, 4n],
    [1n, 10n]
  ];
  const latitude = (q) => 2 * fval(q) - 1;
  const ANCHORS = ['1,1,0', '1,1,1'];
  /** How deep the four-decimal copy lies below the sphere, 2000 times enlarged, marked off outward from the point. */
  const SINK_GAIN = 2000;
  const tailPoint = (st) => scale(world(num(st.Q)), LIFT + 0.05 + SINK_GAIN * (1 - Math.sqrt(fval(st.tail2))));
  function drawStars(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight();
    sc.poly('stars' + m.star.D + (a * exact < 0.99 ? '~' : ''), stars(m.star.D), { color: P.cyan, alpha: a * exact, edges: false, pick: false, occlude: false });
    for (const q of LATITUDES) {
      const z = latitude(q),
        here = equal(q, m.star.kappa);
      sc.circle([0, 0, z], [0, 0, 1], Math.sqrt(1 - z * z) * LIFT, { color: P.cyan, width: here ? 2 : 1.1, alpha: (here ? 0.95 : 0.5) * a * exact, back: 0.2 });
    }
    // −1 is the one rational point of the sphere that no σ reaches
    sc.ring([0, 0, -LIFT], { color: P.ink, r: 6, alpha: 0.9 * a, normal: [0, 0, 1], key: 'minusOne' });
    for (const s of ANCHORS) sc.ring(scale(world(num(cayley(seedOf(s)))), LIFT), { color: P.cyan, r: 7, alpha: a * exact, normal: world(num(cayley(seedOf(s)))), key: 'anchor' + s });
    // the four-decimal copy of the point sinks into the ball: the depth 1 − ‖Q_dec‖, 2000 times enlarged, as an arrow from outside
    if (state.lens && !equal(m.star.tail2, m.star.norm)) {
      const from = tailPoint(m.star);
      sc.arrow(from, scale(world(num(m.star.Q)), LIFT + 0.05), { color: P.magenta, width: 2.4, headSize: 9, alpha: a * flat });
      sc.bead(from, { color: P.magenta, r: 4, alpha: a * flat, key: 'tail' });
    }
  }
  function drawChain(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      { K, f } = m.chain;
    const pts = [];
    for (let k = 0; k < K; k++) pts.push(...sample(12, (u) => chainAt(k, u)).slice(k ? 1 : 0));
    if (f > 0) pts.push(...sample(Math.max(2, Math.ceil(12 * f)), (u) => chainAt(K, f * u)).slice(1));
    tube('chain', pts, P.cyan, 0.017, a * exact);
    for (let k = 0; k <= K; k++) sc.bead(chainAt(k, 0), { color: P.cyan, r: k === 0 ? 5 : 3.6, alpha: a * exact, key: 'q' + k });
    // the tangent plate at 1 with logarithmic distance rings 1, 4, 16, and the flat staircase on it
    const e = PLATE,
      corner = (x, y) => [x, -y, 1.004];
    sc.fan([corner(-0.2, -0.2), corner(e, -0.2), corner(e, e), corner(-0.2, e)], { fill: P.magenta, alpha: 0.1 * a, color: P.magenta, width: 1, strokeAlpha: 0.45 * a });
    for (const d of [1, 4, 16]) sc.line(sample(24, (u) => [flatDist(d) * cs((PI / 2) * u), -flatDist(d) * sn((PI / 2) * u), 1.005]), { color: P.magenta, width: 1, dash: [3, 4], alpha: 0.6 * a });
    const path = [];
    for (let k = 0; k < K + (f > 0 ? 1 : 0); k++) {
      const p = flatNum(k),
        q = flatNum(k + 1),
        end = k < K ? 1 : f;
      path.push(...sample(5, (u) => flatPoint(p.map((x, i) => lerp(x, q[i], end * u)))).slice(k ? 1 : 0));
    }
    if (path.length > 1) tube('flat', path, P.magenta, 0.015, a * flat);
    sc.bead(path[path.length - 1], { color: P.magenta, r: 5.6, alpha: a * flat, key: 'flatEnd' });
  }
  /** The loop of a prime on the ball: a great circle; the nudged one is open by a gap that grows with 1 − 𝒜 (MODEL). */
  const loopOf = (k, n) => {
    const yaw = (PI * (k + 0.5)) / n,
      e1 = [cs(yaw), sn(yaw), 0],
      e2 = unit([-sn(yaw) * 0.45, cs(yaw) * 0.45, 0.9]);
    return (u) => scale(add(scale(e1, cs(TAU * u)), scale(e2, sn(TAU * u))), LIFT);
  };
  /** The place of a loop nearest to the lower front of the ball, where its gap opens. */
  const frontOf = (at) => range(180).map((k) => k / 180).reduce((best, u) => (dot(at(u), [0.42, -0.7, -0.58]) > dot(at(best), [0.42, -0.7, -0.58]) ? u : best), 0);
  const strain = (pr) => 1 - fval(pr.A);
  function drawPrime(m, a) {
    if (a < 0.01) return;
    const { exact, flat } = weight(),
      pr = m.prime,
      broken = pr.delta > 0;
    pr.parts.forEach((p, k) => {
      const at = loopOf(k, pr.parts.length),
        open = p === pr.p && broken,
        gap = open ? 0.28 * Math.tanh(9 * strain(pr)) + 0.02 : 0,
        u0 = frontOf(at);
      tube((open ? 'open' : 'loop') + k, sample(90, (u) => at(u0 + gap / 2 + (1 - gap) * u)), open ? P.magenta : P.cyan, open ? 0.02 : 0.015, a * (open ? Math.max(0.9, flat) : exact));
    });
    // the unit circle and the mirror pair with its conjugates
    sc.line(sample(120, (u) => [CIRCLE_R * cs(TAU * u), 0, CIRCLE_R * sn(TAU * u)]), { color: P.cyan, width: 2.6, alpha: a * Math.max(0.6, exact) });
    for (const side of [1, -1])
      for (const sign of [1, -1]) {
        if (!broken && sign < 0) continue;
        const p = imagePoint(pr.delta, sign, side);
        if (broken) sc.line([imagePoint(0, 1, side), p], { color: P.magenta, width: 1.6, alpha: a });
        sc.bead(p, { color: broken ? P.magenta : P.cyan, r: 4.8, alpha: a, key: `u${sign > 0 ? 'out' : 'in'}${side > 0 ? '' : 'bar'}` });
      }
    // the balance in front of the ball: |N| on the left, the product of the p-adic weights on the right
    const tilt = -0.42 * Math.tanh(26 * Math.log(fval(pr.A)) / 0.42 / 1.2),
      pivot = [0, 0.34],
      half = 0.6,
      color = broken ? P.magenta : P.cyan,
      at = (x, y) => seen(x, y, 1.1);
    sc.line([at(0, -0.46), at(...pivot)], { color: P.ink, width: 2.6, alpha: 0.95 * a });
    sc.line([at(-0.18, -0.46), at(0.18, -0.46)], { color: P.ink, width: 2.6, alpha: 0.95 * a });
    const ends = [-1, 1].map((s) => [pivot[0] + s * half * cs(tilt), pivot[1] + s * half * sn(tilt)]);
    sc.line(ends.map((p) => at(...p)), { color, width: 5, alpha: a });
    for (const [x, y] of ends) {
      const py = y - 0.34;
      sc.line([at(x - 0.18, py), at(x, y), at(x + 0.18, py)], { color, width: 1.6, alpha: 0.95 * a });
      sc.fan([at(x - 0.22, py), at(x + 0.22, py), at(x + 0.14, py - 0.11), at(x - 0.14, py - 0.11)], { fill: color, alpha: 0.95 * a });
    }
    sc.bead(at(...pivot), { color, r: 3.6, alpha: a, key: 'pivot' });
  }

  /* ---------- words ---------- */
  const STAR = '<span class="star">★</span>';
  const X_FLAT = (K) => `x<sub>flat,${K}</sub>`;
  const Z_DEC = 'z<sub>dec</sub>';
  const LMIN = 'λ<sub>min</sub>';
  const SCENE_NAME = {
    struct: [['整数锁', 'INTEGER LOCKS'], ['弦的尺子（MODEL）', 'CHORD RULER (MODEL)']],
    beat: [['纯整数三拍', 'THREE INTEGER BEATS'], ['四位小数的 z（MODEL）', 'FOUR-DECIMAL z (MODEL)']],
    stars: [['有理星座', 'RATIONAL CONSTELLATION'], ['四位小数的点（MODEL）', 'FOUR-DECIMAL POINT (MODEL)']],
    chain: [['完整关系守球', 'FULL RELATION'], ['平直相加脱轨（MODEL）', 'FLAT SUM DERAILS (MODEL)']],
    prime: [['素数刚性（MODEL）', 'PRIME RIGIDITY (MODEL)'], ['小数权重（MODEL）', 'DECIMAL WEIGHTS (MODEL)']]
  };
  const LENS_NAME = [
    ['精确账本', 'EXACT LEDGER'],
    ['平直对照 (MODEL)', 'FLAT CONTRAST (MODEL)']
  ];
  /** The live regime of the scene: the HUD line, the card note and the free-play note all read this one value. */
  function regimeOf(m) {
    switch (state.scene) {
      case 'struct':
        return m.gon.N === 6 ? 'hexagon' : 'gon';
      case 'beat':
        return m.beat.f > 0 ? 'moving' : ['start', 'one', 'two', 'closed'][m.beat.k];
      case 'stars':
        return equal(m.star.tail2, m.star.norm) ? 'finite' : 'tail';
      case 'chain':
        return m.chain.K === 1 ? 'first' : 'run';
      default:
        return m.prime.delta === 0 ? 'locked' : 'broken';
    }
  }
  const compact = () => stage.clientWidth < 560;
  const e = (k) => `e${subscript(k)}`;
  /** Where e₁ has gone after k beats. */
  const axisTo = (k) => range(k).reduce((i) => BEATS.axes[i], 0) + 1;
  const powQ = (k) => (k === 1 ? 'Q' : `Q${superscript(k)}`);
  /** The star product that made beat k, k = 2, 3, with its denominator spelled out: (2, 2, 2)/(1 − 3). */
  function starText(k) {
    const top = addQ(addQ(BEATS.g[k - 1], G1), crossQ(BEATS.g[k - 1], G1)),
      d = minus(ONE, BEATS.den[k]);
    return `${tuple(top)}/(1 ${d[0] < 0n ? '+' : '−'} ${fstr(d[0] < 0n ? [-d[0], d[1]] : d)})`;
  }
  const gonLaw = (g, say = L) => valued('N\u00a0sin(π/N) &lt; π', semiRel(g), say);
  const aLaw = (pr, say = L) => (pr.delta === 0 ? `𝒜 ${adelicRel(pr)}` : pr.A[1] < 10n ** 9n ? valued(`𝒜 = ${fstr(pr.A)} &lt; 1`, adelicRel(pr), say) : valued('𝒜 &lt; 1', adelicRel(pr), say));
  const lLaw = (pr, say = L) => (pr.delta === 0 ? `${LMIN} ${lambdaRel(pr)}` : valued(`${LMIN} &lt; 0`, lambdaRel(pr), say));
  const flatLaw = (c, say = L) => valued(`‖${X_FLAT(c.K)}‖² &gt; 1`, flatRel(c), say);
  const zLaw = (k, say = L) => (k === 0 ? `|${Z_DEC}⁰|² ${zNormRel(0)}` : valued(`|${Z_DEC}${k === 1 ? '' : superscript(k)}|² &lt; 1`, zNormRel(k), say));
  const gapLaw = (say = L) => valued(`|${Z_DEC}³ − 1| &gt; 0`, gapRel(), say);
  function tailLaw(st, say = L) {
    const c = cmp(st.tail2, ONE);
    return c === 0 ? `‖Q<sub>dec</sub>‖² ${relQ(st.tail2)}` : valued(`‖Q<sub>dec</sub>‖² ${c < 0 ? '&lt;' : '&gt;'} 1`, relQ(st.tail2), say);
  }
  const cutLaw = (pr, say = L) => {
    const c = cmp(pr.cut, ONE);
    return c === 0 ? `∏ ${relQ(pr.cut)}` : valued(`∏ ${c < 0 ? '&lt;' : '&gt;'} 1`, relQ(pr.cut), say);
  };
  const dec4 = (q) => decimals(trunc4(q), 4).text;
  const decTuple = (v) => `(${v.map(dec4).join(', ')})`;
  const cutText = (pr) => `${pr.N} × ${pr.parts.map((r) => dec4(frac(1n, BigInt(r)))).join(' × ')}`;
  const fiveText = (K) => `5${superscript(K)}`;
  const padics = (pr) => `|${pr.N}|<sub>∞</sub>${pr.parts.map((r) => (r === pr.p ? ` · (${r} + δ)⁻¹` : ` · |${pr.N}|${subscript(r)}`)).join('')}`;
  function subline(m) {
    const s = state.scene,
      r = regimeOf(m),
      small = compact();
    if (s === 'struct') {
      const g = m.gon;
      if (state.lens)
        return small
          ? L(`${gonLaw(g)}；短 ${rel(null, g.short)}。`, `${gonLaw(g)}; short by ${rel(null, g.short)}.`)
          : L(
              `平直刻度（MODEL）：正 ${g.N} 边形的半周 ${gonLaw(g)}，比 π 短 ${rel(null, g.short)}；每边离弧 1 − cos(π/N) ${sagRel(g)}；连 1/10 的 float64 也差 ${floatTail()}。`,
              `Flat ruler (MODEL): the semiperimeter of the ${g.N}-gon has ${gonLaw(g)}, short of π by ${rel(null, g.short)}; each side leaves the arc by 1 − cos(π/N) ${sagRel(g)}; even the float64 of 1/10 is off by ${floatTail()}.`
            );
      return small
        ? L(`χ = ${COMPLEX.chi}，环绕数 ${LINK}，δF 归零 ${TETRA.zero}/${TETRA.quadruples}；${gonLaw(g)}。`, `χ = ${COMPLEX.chi}, linking ${LINK}, δF = 0 on ${TETRA.zero}/${TETRA.quadruples}; ${gonLaw(g)}.`)
        : L(
            `χ(S³) = ${eulerText()} = ${COMPLEX.chi}；两条青色霍普夫圈环绕数 ${LINK}；正四面体 ${TETRA.zero}/${TETRA.quadruples} 个四元组 δF = 0（面积以 π 计，模 4）。品红正 ${g.N} 边形：${gonLaw(g)}。`,
            `χ(S³) = ${eulerText()} = ${COMPLEX.chi}; the two cyan Hopf circles have linking number ${LINK}; δF = 0 on ${TETRA.zero}/${TETRA.quadruples} quadruples of the regular tetrahedron (areas in units of π, modulo 4). The magenta ${g.N}-gon: ${gonLaw(g)}.`
          );
    }
    if (s === 'beat') {
      const b = m.beat,
        k = b.k;
      if (state.lens)
        return k === 3 && b.f === 0
          ? small
            ? L(`${zLaw(3)}；${gapLaw()}。`, `${zLaw(3)}; ${gapLaw()}.`)
            : L(`${Z_DEC} = ${zText()}：${zLaw(1)}；三拍后 ${Z_DEC}³ = ${complexText(ZPOW[3])}，${gapLaw()}，合不拢。`, `${Z_DEC} = ${zText()}: ${zLaw(1)}; after three beats ${Z_DEC}³ = ${complexText(ZPOW[3])}, ${gapLaw()}: it does not close.`)
          : L(`${Z_DEC} = ${zText()}（MODEL）：走完 ${k} 拍，${zLaw(k)}。`, `${Z_DEC} = ${zText()} (MODEL): after ${k} ${k === 1 ? 'beat' : 'beats'}, ${zLaw(k)}.`);
      if (r === 'moving') return L(`第 ${k + 1} 拍在走：从 ${powQ(k) === 'Q⁰' ? '+1' : powQ(k)} 沿大圆走 120° 到 ${powQ(k + 1)}，到站才读数。`, `Beat ${k + 1} is running: 120° along the great circle from ${k === 0 ? '+1' : powQ(k)} to ${powQ(k + 1)}; the reading is taken on arrival.`);
      if (r === 'start') return L('起点：g₀ = (0, 0, 0)，Q⁰ = +1。下一拍合成 g₁ = (1, 1, 1)。', 'Start: g₀ = (0, 0, 0), Q⁰ = +1. The next beat composes g₁ = (1, 1, 1).');
      const turn = `e₁ ↦ ${e(axisTo(k))}`;
      if (r === 'closed')
        return small
          ? L(`g₃ = ${tuple(b.g)}，Q³ = +1，‖Q³‖² ${relQ(b.norm)}；z 还差 ${gapRel()}。`, `g₃ = ${tuple(b.g)}, Q³ = +1, ‖Q³‖² ${relQ(b.norm)}; z still misses by ${gapRel()}.`)
          : L(`g₃ = g₂ ${STAR} g₁ = ${starText(3)} = ${tuple(b.g)}，Q³ = +1，‖Q³‖² ${relQ(b.norm)}：分毫不差回到北极，${turn}。平面上的四位小数：${zLaw(3)}，${gapLaw()}。`, `g₃ = g₂ ${STAR} g₁ = ${starText(3)} = ${tuple(b.g)}, Q³ = +1, ‖Q³‖² ${relQ(b.norm)}: back at the north pole, ${turn}. The four decimals of the plane: ${zLaw(3)}, ${gapLaw()}.`);
      const how = k === 1 ? 'g₁' : `g₂ = g₁ ${STAR} g₁ = ${starText(2)}`;
      return small
        ? L(`g${subscript(k)} = ${tuple(b.g)}，κ(1, ${powQ(k)}) ${beatKappa(b)}。`, `g${subscript(k)} = ${tuple(b.g)}, κ(1, ${powQ(k)}) ${beatKappa(b)}.`)
        : L(`${how} = ${tuple(b.g)}，${powQ(k)} = ${tuple(b.Q)}，κ(1, ${powQ(k)}) ${beatKappa(b)}，‖${powQ(k)}‖² ${relQ(b.norm)}，${turn}。`, `${how} = ${tuple(b.g)}, ${powQ(k)} = ${tuple(b.Q)}, κ(1, ${powQ(k)}) ${beatKappa(b)}, ‖${powQ(k)}‖² ${relQ(b.norm)}, ${turn}.`);
    }
    if (s === 'stars') {
      const st = m.star;
      if (state.lens)
        return r === 'finite'
          ? L(`截成四位小数（MODEL）：${decTuple(st.Q)}，${tailLaw(st)}：这一点恰好写得尽。`, `Cut to four decimals (MODEL): ${decTuple(st.Q)}, ${tailLaw(st)}: this point happens to end.`)
          : L(`截成四位小数（MODEL）：${decTuple(st.Q)}，${tailLaw(st)}：尾巴一断就离开球面。`, `Cut to four decimals (MODEL): ${decTuple(st.Q)}, ${tailLaw(st)}: the cut tail leaves the sphere.`);
      return small
        ? L(`σ = ${tuple(st.sigma)} ↦ ${tuple(st.Q)}，κ ${starKappa(st)}。`, `σ = ${tuple(st.sigma)} ↦ ${tuple(st.Q)}, κ ${starKappa(st)}.`)
        : L(`σ = ${tuple(st.sigma)} ↦ Q = ${tuple(st.Q)}，‖Q‖² ${squaresRel(st)}，κ ${starKappa(st)}；分母不超过 ${st.D} 的切片点已有 ${st.count} 个。`, `σ = ${tuple(st.sigma)} ↦ Q = ${tuple(st.Q)}, ‖Q‖² ${squaresRel(st)}, κ ${starKappa(st)}; ${st.count} points of the slice have denominators up to ${st.D}.`);
    }
    if (s === 'chain') {
      const c = m.chain;
      if (state.lens)
        return small
          ? L(`${X_FLAT(c.K)} = ${flatText(c)}，${flatLaw(c)}。`, `${X_FLAT(c.K)} = ${flatText(c)}, ${flatLaw(c)}.`)
          : L(`砍掉 1 − a · b 与 a × b（MODEL）：${X_FLAT(c.K)} = ${flatText(c)}，${flatLaw(c)}，留在北极的切平面上越走越远。`, `Without 1 − a · b and a × b (MODEL): ${X_FLAT(c.K)} = ${flatText(c)}, ${flatLaw(c)}, ever farther out on the tangent plane of the north pole.`);
      return small
        ? L(`${fiveText(c.K)} = ${c.den}，‖q${subscript(c.K)}‖² ${normRel(c)}；${flatLaw(c)}。`, `${fiveText(c.K)} = ${c.den}, ‖q${subscript(c.K)}‖² ${normRel(c)}; ${flatLaw(c)}.`)
        : L(`交替转子 q${subscript(c.K)}：分母 ${fiveText(c.K)} = ${c.den}，‖q${subscript(c.K)}‖² ${normRel(c)}，贴着球走；a ${STAR} b = ${tuple(star(A_HALF, B_HALF))}。平直相加：${flatLaw(c)}。`, `Alternating rotor q${subscript(c.K)}: denominator ${fiveText(c.K)} = ${c.den}, ‖q${subscript(c.K)}‖² ${normRel(c)}, on the sphere; a ${STAR} b = ${tuple(star(A_HALF, B_HALF))}. The flat sum: ${flatLaw(c)}.`);
    }
    const pr = m.prime;
    if (state.lens)
      return L(`四位小数的权重（MODEL）：∏ = ${cutText(pr)}，${cutLaw(pr)}${cmp(pr.cut, ONE) === 0 ? '' : '，连 δ = 0 也合不上'}。`, `Four-decimal weights (MODEL): ∏ = ${cutText(pr)}, ${cutLaw(pr)}${cmp(pr.cut, ONE) === 0 ? '' : ', not closed even at δ = 0'}.`);
    if (r === 'locked')
      return small
        ? L(`δ = 0：${aLaw(pr)}，${lLaw(pr)}。`, `δ = 0: ${aLaw(pr)}, ${lLaw(pr)}.`)
        : L(`δ${subscript(pr.p)} = 0：${weightText(pr)}，${aLaw(pr)}；耦合的凯莱像（MODEL）都在单位圆上，${lLaw(pr)}。`, `δ${subscript(pr.p)} = 0: ${weightText(pr)}, ${aLaw(pr)}; the coupled Cayley images (MODEL) are on the unit circle, ${lLaw(pr)}.`);
    return small
      ? L(`δ${subscript(pr.p)} ${deltaRel(pr)}：${aLaw(pr)}；${lLaw(pr)}。`, `δ${subscript(pr.p)} ${deltaRel(pr)}: ${aLaw(pr)}; ${lLaw(pr)}.`)
      : L(`δ${subscript(pr.p)} ${deltaRel(pr)}，${weightText(pr)}：${padics(pr)} 给出 ${aLaw(pr)}。耦合的反事实（MODEL）：镜像对裂离单位圆，${lLaw(pr)}。`, `δ${subscript(pr.p)} ${deltaRel(pr)}, ${weightText(pr)}: ${padics(pr)} gives ${aLaw(pr)}. The coupled counterfactual (MODEL): the mirror pair leaves the unit circle, ${lLaw(pr)}.`);
  }
  /** δF of the tetrahedron: the exact zero when every quadruple gives it. */
  const dFText = () => (TETRA.zero === TETRA.quadruples ? relQ(ZERO) : '≠ 0');
  const eulerText = () => COMPLEX.f.map((n, d) => (d ? (d % 2 ? ' − ' : ' + ') : '') + n).join('');
  const floatTail = () => `≈ ${sci(fval(minus(ratio(0.1), frac(1n, 10n))))}`;
  const flatText = (c) => `(${c.flat.map(String).join(', ')})`;
  function bigline(m) {
    const key = {
      struct: `δF ${dFText()} · ${TETRA.zero}/${TETRA.quadruples}`,
      beat: m.beat.f > 0 ? `k = ${m.beat.k} → ${m.beat.k + 1}` : `k = ${m.beat.k} · ‖${powQ(m.beat.k)}‖² ${relQ(m.beat.norm)}`,
      stars: `κ ${starKappa(m.star)}`,
      chain: `K = ${m.chain.K} · ‖q${subscript(m.chain.K)}‖² ${normRel(m.chain)}`,
      prime: `𝒜 ${adelicRel(m.prime)}`
    };
    const flat = {
      struct: `N\u00a0sin(π/N) ${semiRel(m.gon)}`,
      beat: m.beat.k === 3 && m.beat.f === 0 ? `|z³ − 1| ${gapRel()}` : `k = ${m.beat.k}`,
      stars: `‖Q<sub>dec</sub>‖² ${relQ(m.star.tail2)}`,
      chain: `‖${X_FLAT(m.chain.K)}‖² ${flatRel(m.chain)}`,
      prime: `∏ ${relQ(m.prime.cut)}`
    };
    return `${L(...SCENE_NAME[state.scene][state.lens])} · <span class="nb">${(state.lens ? flat : key)[state.scene]}</span>`;
  }
  function legendItems(m) {
    const items = [['vi', L('三元数真球 𝕋₃', 'ternion sphere 𝕋₃')]];
    switch (state.scene) {
      case 'struct':
        items.push(['cy', L('霍普夫圈 · 测地四面体', 'Hopf circles · geodesic tetrahedron')], ['mg', L(`正 ${m.gon.N} 边形与尺`, `${m.gon.N}-gon and ruler`)], ['am', L('第一个顶点', 'first vertex')]);
        break;
      case 'beat':
        items.push(['cy', L('三拍 · κ = 1/4', 'three beats · κ = 1/4')], ['mg', L('四位小数 z', 'four-decimal z')], ['am', L('当前落点', 'current landing')]);
        break;
      case 'stars':
        items.push(['cy', L('有理点 · κ 纬圈', 'rational points · κ circles')], ...(state.lens ? [['mg', L('四位小数的下沉 ×2000', 'sink of four decimals ×2000')]] : []), ['am', 'Q(σ)']);
        break;
      case 'chain':
        items.push(['cy', L('完整转子 q', 'full rotor q')], ['mg', L('平直相加（对数刻度）', 'flat sum (log scale)')], ['am', L('当前 q', 'current q')]);
        break;
      default:
        items.push(['cy', L('单位圆 · 闭环', 'unit circle · closed loops')], ...(m.prime.delta > 0 ? [['mg', L('失锁', 'unlocked')]] : []), ['am', 'u(1/2 − δ)']);
    }
    return items;
  }
  /** The note of the live frame: a long form for the card panel and a short one for a cited figure or a phone. It names
      only what is drawn on the stage, in the HUD and in the tour bar. */
  function noteOf(m) {
    const r = regimeOf(m),
      s = state.scene;
    if (s === 'struct') {
      const g = m.gon;
      return {
        long: [
          `紫球外两条青色霍普夫圈套住一次，球面上青色测地四面体的四个面把 4π 分成四份：这些都是整数，没有尾数可截。品红的正 ${g.N} 边形贴着轮廓大圆切掉 ${g.N} 片弓形，下面的尺上它的半周总比 π 短一截。拖琥珀顶点加边：短的那截变小，${r === 'hexagon' ? 'N = 6 时半周恰是 3，' : ''}却从不为零。`,
          `Outside the violet ball two cyan Hopf circles are linked once; on it the four faces of the cyan geodesic tetrahedron share 4π: integers, with no tail to cut. The magenta ${g.N}-gon cuts ${g.N} slivers off the outline circle, and on the ruler below its semiperimeter stays short of π. Drag the amber vertex to add sides: the shortfall shrinks${r === 'hexagon' ? ' (at N = 6 the semiperimeter is exactly 3)' : ''} and never vanishes.`
        ],
        fig: [`青色的整数锁不带尾数；品红正 ${g.N} 边形总比圆短一截。`, `The cyan integer locks carry no tail; the magenta ${g.N}-gon stays short of the circle.`]
      };
    }
    if (s === 'beat') {
      const k = m.beat.k;
      if (r === 'moving') return { long: [`第 ${k + 1} 拍在走：琥珀点沿青色大圆转 120°，右上的三根轴同时换一次位。`, `Beat ${k + 1} is running: the amber point turns 120° along the cyan great circle while the three axes at the upper right change places once.`], fig: [`第 ${k + 1} 拍在走：琥珀点沿大圆转 120°。`, `Beat ${k + 1}: the amber point turns 120° along the great circle.`] };
      if (r === 'start') return { long: ['琥珀点在北极 +1，三段 120° 都还是虚线。按按钮“下一拍”，用纯整数 (1, 1, 1) 走第一拍。', 'The amber point is at the north pole +1 and all three 120° arcs are still dashed. The button Next beat takes the first one with the integer vector (1, 1, 1).'], fig: ['琥珀点在北极 +1，三拍都还没走。', 'The amber point is at the north pole +1; no beat taken yet.'] };
      if (r === 'closed')
        return {
          long: ['三拍 (1, 1, 1) → (−1, −1, −1) → (0, 0, 0) 走完，琥珀点恰好回到北极 +1；三个站都是有理点，κ 为 1/4、1/4、1。右下的平面里，四位小数的 z 走三拍，透镜放大 5000 倍还看得见缺口。', 'The three beats (1, 1, 1) → (−1, −1, −1) → (0, 0, 0) are done and the amber point is back at the north pole +1 exactly; all three stations are rational points, with κ = 1/4, 1/4, 1. In the plane at the lower right the four-decimal z has taken three beats too, and the lens, 5000 times enlarged, still shows its gap.'],
          fig: ['三拍走完，琥珀点恰好回到北极；品红的四位小数 z 留着缺口。', 'Three beats done: the amber point is back at the pole; the magenta z keeps a gap.']
        };
      return {
        long: [`第 ${k} 拍到站：g${subscript(k)} = ${tuple(m.beat.g)}，琥珀点落在青色 κ = 1/4 的纬圈上。再走${k === 1 ? '两' : '一'}拍就回到北极。`, `Beat ${k} has arrived: g${subscript(k)} = ${tuple(m.beat.g)}, and the amber point is on the cyan circle κ = 1/4. ${k === 1 ? 'Two more beats lead' : 'One more beat leads'} back to the north pole.`],
        fig: [`g${subscript(k)} = ${tuple(m.beat.g)}：琥珀点落在 κ = 1/4 的纬圈上。`, `g${subscript(k)} = ${tuple(m.beat.g)}: the amber point is on the circle κ = 1/4.`]
      };
    }
    if (s === 'stars') {
      const st = m.star;
      return {
        long: [
          `紫球上每颗青珠都是有理点 Q(σ)，分母上限从 1 推到 ${st.D}，已有 ${st.count} 颗，越推越密，模方仍然都是 1。琥珀点是 σ = ${tuple(st.sigma)}；青环标着 (1, 1, 0) 的 κ = 1/3 与 (1, 1, 1) 的 κ = 1/4。拖琥珀点在青珠之间换。`,
          `Every cyan bead of the violet ball is a rational point Q(σ); with denominators up to ${st.D} there are ${st.count} of them, ever denser, and every squared norm is still 1. The amber point is σ = ${tuple(st.sigma)}; cyan rings mark (1, 1, 0) with κ = 1/3 and (1, 1, 1) with κ = 1/4. Drag the amber point from bead to bead.`
        ],
        fig: [`青珠是有理点，模方都是 1；琥珀点 κ ${starKappa(st)}。`, `Cyan beads are rational points of norm 1; the amber point has κ ${starKappa(st)}.`]
      };
    }
    if (s === 'chain') {
      const c = m.chain;
      return {
        long: [
          `青色转子 q${subscript(c.K)} 连走 ${c.K} 步，每一步都落在紫球面上，分母恰是 ${fiveText(c.K)}。品红是砍掉分母与叉乘的平直相加：它留在北极的切平面上，离开切点的距离按对数刻度画（虚线圈是 1、4、16）。`,
          `The cyan rotor has taken ${c.K} ${c.K === 1 ? 'step' : 'steps'} to q${subscript(c.K)}, each landing on the violet sphere, with the denominator exactly ${fiveText(c.K)}. Magenta is the flat sum without the denominator and the cross product: it stays in the tangent plane of the north pole, its distance on a logarithmic scale (dashed rings 1, 4, 16).`
        ],
        fig: [`青色转子 ${c.K} 步都在球面上；品红的平直相加离球而去。`, `The cyan rotor keeps the sphere for ${c.K} ${c.K === 1 ? 'step' : 'steps'}; the magenta flat sum leaves it.`]
      };
    }
    const pr = m.prime;
    if (r === 'locked')
      return {
        long: [`δ = 0：天平是平的，${weightText(pr)} 的阿代尔乘积 ${adelicRel(pr)}，${pr.parts.length} 条青色闭环都合拢，凯莱像在青色单位圆上。推动 δ，它们一起失锁（MODEL）。`, `δ = 0: the balance is level, the adelic product of ${weightText(pr)} is ${adelicRel(pr)}, all ${pr.parts.length} cyan loops close and the Cayley images sit on the cyan unit circle. Nudge δ and they unlock together (MODEL).`],
        fig: [`δ = 0：天平平衡，𝒜 ${adelicRel(pr)}，像在单位圆上。`, `δ = 0: the balance is level, 𝒜 ${adelicRel(pr)}, images on the circle.`]
      };
    return {
      long: [
        `只把 p = ${pr.p} 的权重推开 δ：天平倾斜，这一条环张开缺口，反事实的镜像对（MODEL）一个跑到青色单位圆外、一个落到圆内。按钮 δ = 0 一键复原。`,
        `Only the weight of p = ${pr.p} is nudged by δ: the balance tips, this loop opens, and of the counterfactual mirror pair (MODEL) one image runs outside the cyan unit circle and one inside. The button δ = 0 restores it.`
      ],
      fig: [`推开 p = ${pr.p} 的权重：天平倾斜，镜像对（MODEL）裂离单位圆。`, `Nudge the weight of p = ${pr.p}: the balance tips, the pair (MODEL) splits.`]
    };
  }

  /* ---------- labels ---------- */
  function tags(m) {
    const s = state.scene,
      flat = state.lens === 1,
      small = stage.clientWidth < 480,
      { R, U } = cam;
    // a label sits (right, up) pixels from its point
    const off = (p, right, up) => add(add(p, scale(R, right / sc.unit)), scale(U, up / sc.unit));
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls, { occlude: false });
    if (s === 'struct') {
      const g = m.gon;
      if (!small) {
        N('hopf', off(HOPF[0][200], -20, 26), L(`霍普夫圈 · Hopf = ${LINK}`, `Hopf circles · Hopf = ${LINK}`), 'c-cy');
        N('tetra', off(scale(unit(CORNERS[3]), LIFT), -34, 18), `δF ${dFText()} · ${TETRA.zero}/${TETRA.quadruples}`, 'c-cy');
        N('ball', seen(0.86, -0.84, 1), 'χ(S³) = 0', 'c-vi');
      }
      N('gon', seen(-0.2, -1.2, 1.1), flat || !small ? valued('N sin(π/N) &lt; π', semiRel(g)) : `${semiRel(g)}`, 'c-mg');
      N('pi', seen(1.1, -1.2, 1.1), 'π', 'c-cy');
    }
    if (s === 'beat') {
      N('north', off(beatPoint(0), m.beat.k === 3 && m.beat.f === 0 ? 46 : -34, 14), m.beat.k === 3 && m.beat.f === 0 ? 'Q³ = +1' : '+1', 'c-cy');
      N('q1', off(beatPoint(1), small ? 12 : 22, -16), small ? 'g₁' : 'g₁ = (1, 1, 1)', 'c-cy');
      N('q2', off(beatPoint(2), small ? -10 : -22, -16), small ? 'g₂' : 'g₂ = (−1, −1, −1)', 'c-cy');
      if (!small) {
        N('kappa', off([0, -0.866, -0.5], 0, 14), `κ = ${fstr(kappaOne(BEATS.Q[1]))} ${relQ(kappaOne(BEATS.Q[1]))}`, 'c-cy');
        N('diag', off([BEAT_R + 0.2, 0, 0], 0, 16), '(1, 1, 1)', 'c-vi');
      }
      for (let k = 0; k < 3; k++) {
        const ang = PI / 2 + (TAU * k) / 3;
        N('e' + k, seen(1.8 + 0.5 * cs(ang), 0.6 + 0.5 * sn(ang), 0.3), e(k + 1), 'c-vi');
      }
      N('zdec', off(seen(1.8, -1.08, 0.3), 0, small || m.beat.k < 3 ? 0 : -10), small ? `${Z_DEC}ᵏ` : `${Z_DEC} = ${zText()}${m.beat.k === 3 ? `<br>${gapLaw()}` : ''}`, 'c-mg');
      if (!small) N('lens', seen(1.8, -0.18, 0.3), '×5000', 'c-ik');
    }
    if (s === 'stars') {
      const st = m.star,
        p = scale(world(num(st.Q)), LIFT);
      N('q', off(p, 0, 22), small ? tuple(st.Q) : `Q = ${tuple(st.Q)}`, 'c-ik');
      for (const q of LATITUDES) {
        if (small && q[1] === 10n) continue;
        const z = latitude(q),
          r = Math.sqrt(1 - z * z);
        N('lat' + q[1], off(scale(R, r * LIFT + 0.03).map((x, i) => x + (i === 2 ? z : 0)), small ? 18 : 54, 0), small ? `κ = ${fstr(q)}` : `κ = ${fstr(q)} ${relQ(q)}`, 'c-cy');
      }
      if (!small) {
        N('pole', off([0, 0, 1.02], -24, 12), '+1 · κ = 1', 'c-cy');
        N('a110', off(scale(world(num(cayley(seedOf('1,1,0')))), LIFT), 0, 20), '(1, 1, 0)', 'c-cy');
        N('a111', off(scale(world(num(cayley(seedOf('1,1,1')))), LIFT), -42, 0), '(1, 1, 1)', 'c-cy');
      }
      if (flat && regimeOf(m) === 'tail') N('tail', off(tailPoint(st), 24, 10), 'Q<sub>dec</sub>', 'c-mg');
    }
    if (s === 'chain') {
      const c = m.chain,
        end = flatPoint(flatNum(c.K));
      N('one', off([0, 0, LIFT], -26, 12), '1', 'c-cy');
      N('q', off(chainAt(c.K, c.f), 0, -24), `q${subscript(c.K)}`, 'c-cy');
      N('flat', off(end, small ? 0 : 34, 20), `${X_FLAT(c.K)}`, 'c-mg');
      if (!small) {
        for (const d of [4, 16]) N('ring' + d, off([flatDist(d), 0, 1.005], 0, 12), String(d), 'c-mg');
        N('norm', seen(-0.86, -0.82, 1), `‖q${subscript(c.K)}‖² ${normRel(c)}`, 'c-cy');
      }
    }
    if (s === 'prime') {
      const pr = m.prime,
        broken = pr.delta > 0;
      N('circle', off([-CIRCLE_R * 0.72, 0, CIRCLE_R * 0.7], -16, 12), '‖u‖ = 1', 'c-cy');
      if (broken) {
        N('uout', off(imagePoint(pr.delta, 1, 1), small ? 10 : 44, 16), small ? 'u₋' : 'u(1/2 − δ)', 'c-mg');
        N('uin', off(imagePoint(pr.delta, -1, 1), small ? -8 : -16, small ? -18 : -24), small ? 'u₊' : 'u(1/2 + δ)', 'c-mg');
      } else N('uout', off(imagePoint(0, 1, 1), 34, 14), 'u', 'c-cy');
      N('left', seen(-0.56, -0.38, 1.2), `|${pr.N}|<sub>∞</sub> = ${pr.N}`, 'c-ik');
      N('right', seen(0.56, -0.38, 1.2), small ? '∏ |N|<sub>p</sub>' : `∏<sub>p</sub> |${pr.N}|<sub>p</sub>`, 'c-ik');
      N('adele', seen(0, 0.56, 1.2), broken ? `𝒜 = ${pr.A[1] < 10n ** 9n ? fstr(pr.A) : decimals(pr.A, 4).text}` : '𝒜 = 1', broken ? 'c-mg' : 'c-cy');
      if (!small) N('loop', off(loopOf(Math.max(0, pr.parts.indexOf(pr.p)), pr.parts.length)(frontOf(loopOf(Math.max(0, pr.parts.indexOf(pr.p)), pr.parts.length))), 40, -14), broken ? `γ${subscript(pr.p)} ${L('开口', 'open')}` : `γ${subscript(pr.p)} ${L('闭合', 'closed')}`, broken ? 'c-mg' : 'c-cy');
    }
  }
  /** A relation and its digits stay on one line. */
  const kept = (html) => html.replace(/(?:&lt;|[=≈]) −?\d[\d.]*(?:×10)?[⁻⁰¹²³⁴⁵⁶⁷⁸⁹]*/g, '<span class="nb">$&</span>');
  const ACTS = {
    beat: ['下一拍 ▸', 'Next beat ▸'],
    stars: ['换种子 ▸', 'Next seed ▸'],
    prime: ['δ = 0', 'δ = 0']
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
    drawStruct(m, w.struct);
    drawBeat(m, w.beat);
    drawStars(m, w.stars);
    drawChain(m, w.chain);
    drawPrime(m, w.prime);
    const here = handleWorld(state.at[state.scene]);
    sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
    // a still has no handle button: an amber ring round the point takes its place
    if (TRV.still) sc.ring(add(here, scale(cam.D, 0.16)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
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
      share = clamp(need / ih, 0.36, 0.8);
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
  const PAD_B = [44, 46, 10, 22];
  /** The second plot has two scales: the left one for 𝒜, from a floor up to 1, the right one for λ_min, from its value at
      the end of the rail up to 0; both curves start at the top, where δ = 0 locks them. */
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      const c = m.chain;
      $('plotTitle').textContent = L('K 步之后谁还在球面上', 'Who is on the sphere after K steps');
      $('plotMeta').textContent = `K = ${c.K}`;
      const items = [
        [P.cyan, '‖q‖² ≡ 1'],
        [P.magenta, L('平直相加 ‖x‖²', 'flat sum ‖x‖²')]
      ];
      const hi = Number(CHAIN[KMAX].flat2),
        lo = -12;
      const rows = legendRows(cv, items, cv.clientWidth - PAD[0] - PAD[1] - 12);
      const g = kit.plot(cv, { x: [1, KMAX], y: [lo, headroom(cv, PAD, rows.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: [[1, 'K = 1'], [6, '6'], [12, '12'], [18, '18'], [24, '24']], yTicks: [[1, '1'], [100, '100'], [200, '200'], [hi, String(hi)]] });
      g.line(range(KMAX).map((k) => [k + 1, Number(CHAIN[k + 1].flat2)]), P.magenta, { width: 2 });
      g.line(range(KMAX).map((k) => [k + 1, fval(CHAIN[k + 1].norm)]), P.cyan, { width: 2 });
      // the cursor stops at the highest curve value: the legend rows above stay clear
      g.line([[c.K, lo], [c.K, hi]], P.amber, { width: 1 });
      g.dot(c.K, fval(c.norm), P.amber, 3.5);
      g.dot(c.K, Number(c.flat2), P.amber, 3.5);
      drawLegend(g, rows);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      const pr = m.prime;
      $('plotTitleB').textContent = L('只有 δ = 0 锁得住（λ 为 MODEL）', 'Only δ = 0 is locked (λ: MODEL)');
      $('plotMetaB').textContent = `p = ${pr.p}`;
      const items = [
        [P.magenta, '𝒜(N; δ)'],
        [P.magenta, L('λ_min，右轴', 'λ_min, right axis'), 'dash'],
        [P.cyan, L('δ = 0 的锁', 'the lock δ = 0')]
      ];
      const floor = pr.p === 2 ? 0.9 : pr.p === 3 ? 0.93 : 0.96,
        bottom = -0.2;
      const rows = legendRows(cb, items, cb.clientWidth - PAD_B[0] - PAD_B[1] - 12);
      const g = kit.plot(cb, { x: [0, DELTA_MAX], y: [0, headroom(cb, PAD_B, rows.length, 0, 1)], pad: PAD_B });
      const left = (a) => (a - floor) / (1 - floor),
        right = (l) => 1 - l / bottom;
      g.axes({ xTicks: [[0, 'δ = 0'], [0.05, '0.05'], [0.1, '0.1'], [0.15, '0.15'], [0.2, '0.2']], yTicks: [[0, String(floor)], [0.5, String(Math.round((1 + floor) * 5000) / 10000)], [1, '1']] });
      for (const [y, text] of [[0, '−0.2'], [0.5, '−0.1'], [1, '0']]) g.text(DELTA_MAX, y, text, P.dim, { dx: 6, align: 'left', size: 10, face: 'data' });
      g.line([[0, 1], [DELTA_MAX, 1]], P.cyan, { width: 1.2, dash: [4, 4] });
      g.line(sample(60, (u) => [DELTA_MAX * u, left(pr.p / (pr.p + DELTA_MAX * u))]), P.magenta, { width: 2 });
      g.line(LAMBDA_CURVE.map(([x, l]) => [x, right(l)]), P.magenta, { width: 1.8, dash: [4, 3] });
      g.dot(0, 1, P.cyan, 4.5);
      g.line([[pr.delta, 0], [pr.delta, 1]], P.amber, { width: 1 });
      g.dot(pr.delta, left(fval(pr.A)), P.amber, 3.5);
      g.dot(pr.delta, right(pr.lambda), P.amber, 3.5);
      drawLegend(g, rows);
    }
  }

  /* ---------- readouts ---------- */
  function readNote(m) {
    const s = state.scene;
    if (s === 'struct')
      return L(
        `贝蒂数 ${COMPLEX.betti.join(', ')}；四面体的面积和在 ℤ 里有 ${TETRA.whole4} 个四元组取 ±4，即整个球面 4π，模 4 归零；锚在 0 号顶点的边上链复原失败 ${TETRA.edgeErrors} 处。`,
        `Betti numbers ${COMPLEX.betti.join(', ')}; in ℤ the area sums of ${TETRA.whole4} quadruples are ±4, the whole sphere 4π, which is 0 modulo 4; failures of the edge cochain anchored at corner 0: ${TETRA.edgeErrors}.`
      );
    if (s === 'beat')
      return L(
        `R(g₁) 把 e₁, e₂, e₃ 送到 ${BEATS.axes.map((k) => e(k + 1)).join(', ')}；旋量 q₁ = ${tuple(BEATS.q1)}，q₁² = Q ${sameQ(BEATS.square, BEATS.Q[1]) ? '成立' : '不成立'}，q₁³ = ${tuple(BEATS.cube)}。`,
        `R(g₁) sends e₁, e₂, e₃ to ${BEATS.axes.map((k) => e(k + 1)).join(', ')}; for the spinor q₁ = ${tuple(BEATS.q1)}, q₁² = Q ${sameQ(BEATS.square, BEATS.Q[1]) ? 'holds' : 'fails'} and q₁³ = ${tuple(BEATS.cube)}.`
      );
    if (s === 'stars')
      return L(
        `σ 由 Im q/(1 + Re q) 找回：${tuple(inverse(m.star.Q))}；四位小数 ${decTuple(m.star.Q)}，${tailLaw(m.star)}。`,
        `σ recovered by Im q/(1 + Re q): ${tuple(inverse(m.star.Q))}; four decimals ${decTuple(m.star.Q)}, ${tailLaw(m.star)}.`
      );
    if (s === 'chain')
      return L(
        `q${subscript(m.chain.K)} = (${m.chain.nums.map((n) => String(n).replace('-', '−')).join(', ')})/${fiveText(m.chain.K)}，分子${m.chain.reduced ? '不能' : '能'}被 5 整体约去；Q(a)Q(b) = ${tuple(mulQ(cayley(A_HALF), cayley(B_HALF)))}。`,
        `q${subscript(m.chain.K)} = (${m.chain.nums.map((n) => String(n).replace('-', '−')).join(', ')})/${fiveText(m.chain.K)}, the numerators ${m.chain.reduced ? 'have no' : 'have a'} common factor 5; Q(a)Q(b) = ${tuple(mulQ(cayley(A_HALF), cayley(B_HALF)))}.`
      );
    return L(
      `镜像对的模 ‖u(1/2 − δ)‖ ${rel(m.prime.delta === 0 ? ONE : null, m.prime.out)}，‖u(1/2 + δ)‖ ${rel(m.prime.delta === 0 ? ONE : null, m.prime.inn)}；托普利茨矩阵 ${NT + 1} × ${NT + 1}；四位小数权重 ∏ = ${cutText(m.prime)}，${cutLaw(m.prime)}。`,
      `Norms of the mirror pair: ‖u(1/2 − δ)‖ ${rel(m.prime.delta === 0 ? ONE : null, m.prime.out)}, ‖u(1/2 + δ)‖ ${rel(m.prime.delta === 0 ? ONE : null, m.prime.inn)}; Toeplitz matrix ${NT + 1} × ${NT + 1}; four-decimal weights ∏ = ${cutText(m.prime)}, ${cutLaw(m.prime)}.`
    );
  }
  function tracks(m) {
    const b = m.beat,
      st = m.star;
    return {
      struct: [`δF ${dFText()} (${TETRA.zero}/${TETRA.quadruples})`, `N sin(π/N) ${semiRel(m.gon)}`],
      beat: [`‖${powQ(b.k)}‖² ${relQ(b.norm)}`, `|${Z_DEC}${b.k === 1 ? '' : superscript(b.k)}|² ${zNormRel(b.k)}`],
      stars: [`‖Q‖² ${relQ(st.norm)}`, `‖Q<sub>dec</sub>‖² ${relQ(st.tail2)}`],
      chain: [`‖q${subscript(m.chain.K)}‖² ${normRel(m.chain)}`, `‖${X_FLAT(m.chain.K)}‖² ${flatRel(m.chain)}`],
      prime: [`𝒜(δ = 0) ${relQ(adelic(m.prime.p, ZERO))}`, `𝒜(δ) ${adelicRel(m.prime)}`]
    }[state.scene];
  }
  function readings(m) {
    const put = (id, html) => ($(id).innerHTML = kept(html)),
      b = m.beat,
      st = m.star,
      c = m.chain,
      pr = m.prime;
    put('roKey', tracks(m).join(' ↔ '));
    put('roKeySub', ` · ${L(...SCENE_NAME[state.scene][state.lens])}`);
    put('roLock', `${COMPLEX.chi} · ${LINK} · ${TETRA.zero}/${TETRA.quadruples}`);
    put('roGon', `N = ${m.gon.N} · ${semiRel(m.gon)} · ${rel(null, m.gon.short)} · ${sagRel(m.gon)}`);
    put('roBeat', `k = ${b.k} · ${tuple(b.g)} · ${tuple(b.Q)} · ${beatKappa(b)}`);
    put('roStar', `${tuple(st.sigma)} ↦ ${tuple(st.Q)} · ${squaresRel(st)} · ${starKappa(st)}`);
    put('roChain', `K = ${c.K} · ${c.den} · ${normRel(c)} · ${flatRel(c)}`);
    put('roPrime', `N = ${pr.N} · 𝒜 ${adelicRel(pr)} · ${lambdaRel(pr)}`);
    put('roNote', readNote(m));
    put('scenePill', `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`);
    put('keyPill', `${tracks(m)[0].replace(/ \(.*\)/, '')}`);
    $('hint').textContent = L('拖琥珀手柄改本卡的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle to change the card · drag empty space to orbit · Space plays');
    $('formula').innerHTML = { struct: 'N sin(π/N) &lt; π', beat: `g ${STAR} h = (g + h + g × h)/(1 − g · h)`, stars: 'Q(σ) = (1 − ‖σ‖² + 2σ)/(1 + ‖σ‖²)', chain: 'q = Q(a) Q(b) Q(a) …', prime: '|N|∞ · ∏ |N|ₚ = 1' }[state.scene];
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    $('nRange').value = String(m.gon.N);
    put('nOut', `= ${m.gon.N}`);
    $('dRange').value = String(st.D);
    put('dOut', `= ${st.D}`);
    $('kRange').value = String(c.K);
    put('kOut', `= ${c.K}`);
    $('deltaRange').value = String(pr.delta);
    put('deltaOut', deltaRel(pr));
    beatChips.set(b.f > 0 ? null : b.k, true);
    primeChips.set(pr.p, true);
    const seed = [...document.querySelectorAll('#seedChips [data-seed]')].map((x) => x.dataset.seed).find((s) => sameQ(seedOf(s), st.sigma));
    seedChips.set(seed || null, true);
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
  /** The value of the rail, freed from the rounding of its own steps. */
  function settled(v) {
    const back = state.scene === 'prime' ? Math.round(v * 200) / 200 : Math.round(v);
    return Math.abs(v - back) < 1e-10 ? back : v;
  }
  const clockOpts = {
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: RAILS.beat.rate,
    step: 1,
    max: RAILS.beat.max,
    t: STILL.beat,
    format: (t) => {
      const v = settled(t),
        n = rail().from + (rail().stride || 1) * split(v).k;
      return { struct: `N = ${n}`, beat: split(v).f > 0 ? `k = ${n} → ${n + 1}` : `k = ${n}`, stars: `D = ${n}`, chain: `K = ${n}`, prime: `δ${subscript(state.prime)} ${relQ(grid(v, 200), 3)}` }[state.scene];
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
      // a card plays from its start up to its still and parks there; a step button plays one step
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
    $('now').step = r.whole ? '1' : state.scene === 'prime' ? String(r.step) : 'any';
    clock.setMax(r.max, true);
    clock.set(state.at[state.scene], true);
  }
  /** A pointer lands on whole numbers, on δ in steps of 1/200, and on a whole beat when it comes close to one. */
  function snap(v) {
    if (state.scene === 'prime') return Math.round(v * 200) / 200;
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
  kit.field($('nRange'), { out: $('nOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('struct', v - 3) });
  kit.field($('dRange'), { out: $('dOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('stars', (v - 1) / 2) });
  kit.field($('kRange'), { out: $('kOut'), fmt: (v) => `= ${v}`, onInput: (v) => steer('chain', v - 1) });
  kit.field($('deltaRange'), { out: $('deltaOut'), fmt: (v) => relQ(grid(v, 200), 3), onInput: (v) => steer('prime', Math.round(v * 200) / 200) });
  const beatChips = kit.chips($('beatChips'), 'beat', (v) => steer('beat', Number(v)));
  const seedChips = kit.chips($('seedChips'), 'seed', (v) => {
    leave();
    show('stars');
    state.sigma = seedOf(v);
    paint();
  });
  const primeChips = kit.chips($('primeChips'), 'prime', (v) => {
    leave();
    state.prime = Number(v);
    show('prime');
    clock.set(clock.t);
  });
  /** One beat forward, from the pole again once the three are done. The card stays marked: this is the clock of the card. */
  function stepBeat() {
    stopBootPlay();
    show('beat');
    clock.pause();
    const k = Math.round(state.at.beat);
    if (k >= 3) clock.set(0);
    stopAt = (k >= 3 ? 0 : k) + 1;
    clock.play();
  }
  const resetDelta = () => steer('prime', 0);
  function nextSeed() {
    const seeds = [...document.querySelectorAll('#seedChips [data-seed]')].map((x) => x.dataset.seed),
      i = seeds.findIndex((s) => sameQ(seedOf(s), state.sigma));
    leave();
    state.sigma = seedOf(seeds[(i + 1) % seeds.length]);
    paint();
  }
  $('stepBtn').addEventListener('click', stepBeat);
  $('resetBtn').addEventListener('click', resetDelta);
  $('stageAct').addEventListener('click', () => ({ beat: stepBeat, stars: nextSeed, prime: resetDelta })[state.scene]());
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
    state.sigma = seedOf(SEED);
    state.prime = 7;
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
  /** The rational points of the slice a pointer can reach: those of the present bound, in front of the ball. */
  function nearestNode(x, y) {
    let best = null,
      gap = Infinity;
    for (const n of NODES) {
      if (n[3] > boundOf(split(state.at.stars).k)) continue;
      const q = sc.p(scale(world(num(nodeQ(n))), LIFT));
      if (q[2] < 0.05) continue;
      const d = hypot(q[0] - x, q[1] - y);
      if (d < gap) {
        gap = d;
        best = n;
      }
    }
    return best && nodeSigma(best);
  }
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
    if (state.scene === 'stars') {
      const s = nearestNode(x, y);
      if (s) {
        state.sigma = s;
        paint();
      }
      return;
    }
    // the place of the rail nearest the pointer; the three beats close up, so their ends are told apart by the present place
    const n = { beat: 300, prime: 40 }[state.scene] || clock.max;
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
    handle.classList.remove('dragging');
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    const up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    if (state.scene === 'stars') {
      // one step of 1/4 along the first coordinate (left, right) or the second (down, up); Home and End give the seeds 0 and (1/2, 0, 0)
      const i = ev.key === 'ArrowLeft' || ev.key === 'ArrowRight' ? 0 : 1;
      if (ev.key === 'Home') state.sigma = seedOf('0,0,0');
      else if (ev.key === 'End') state.sigma = seedOf(SEED);
      else {
        const next = state.sigma.map((x, k) => (k === i ? plus(x, frac(up ? 1n : -1n, 4n)) : x));
        if (cmp(dotQ(next, next), whole(9)) <= 0) state.sigma = next;
      }
      paint();
      return;
    }
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(clock.max);
    else clock.stepBy(up ? 1 : -1);
  };

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Only the sizes of the samples are given here: the beats, the points, the chain, the products and the matrices are run,
     and the sentences take their numbers from the results. */
  const FRAME = { N: 12, K: 12, p: 7, delta: [1n, 20n], tiny: [1n, 100000000n] };
  const EULER_P = 1000; // primes up to EULER_P and terms up to EULER_N of the zeta sum at s = 2
  const EULER_N = 100000;
  const LOG_BOX = 6; // integer exponents of 2, 3, 5 up to LOG_BOX in size
  function benchmarks() {
    const b = BEATS;
    // the twenty-four Hurwitz units in the unit-quaternion model: tri(x, y, z) = x y⁻¹ z, and the group at the base point Q
    const unitsH = [];
    for (let i = 0; i < 4; i++) for (const s of [1, -1]) unitsH.push(range(4).map((k) => (k === i ? whole(s) : ZERO)));
    for (let mask = 0; mask < 16; mask++) unitsH.push(range(4).map((k) => frac((mask >> k) & 1 ? -1n : 1n, 2n)));
    const tri = (x, y, z) => mulQ(mulQ(x, conjQ(y)), z),
      o = b.Q[1],
      times_ = (x, y) => tri(x, o, y),
      inv = (x) => tri(o, x, o);
    const some = unitsH.filter((_, k) => k % 3 === 0);
    let triples = 0,
      triBad = 0;
    for (const x of some)
      for (const y of some)
        for (const z of some) {
          triples++;
          if (!sameQ(tri(x, y, z), times_(times_(x, inv(y)), z))) triBad++;
        }
    // readings, chords, ray kernel, spinor and Hopf images on the pairs of these units, all in fractions
    const kap = (x, y) => times(HALF, plus(ONE, dotQ(x, y))),
      minusOne = (x) => minus(times(TWO, x), ONE),
      ray = (x, y) => plus(times(minusOne(kap(x, y)), minusOne(kap(x, y))), times(minusOne(kap(x, mulQ(y, QI))), minusOne(kap(x, mulQ(y, QI))))),
      hopf = (x) => mulQ(mulQ(x, QI), conjQ(x)),
      // ψ(x)†ψ(y) with ψ(a + bi + cj + dk) = (a + bI, −c + dI)
      overlap = (x, y) => [plus(plus(times(x[0], y[0]), times(x[1], y[1])), plus(times(x[2], y[2]), times(x[3], y[3]))), plus(minus(times(x[0], y[1]), times(x[1], y[0])), minus(times(x[3], y[2]), times(x[2], y[3])))];
    let pairs = 0,
      chordBad = 0,
      rayBad = 0,
      hopfBad = 0;
    for (const x of unitsH)
      for (const y of unitsH) {
        pairs++;
        const diff = x.map((v, i) => minus(v, y[i])),
          w = overlap(x, y),
          r = ray(x, y);
        if (!equal(kap(x, y), minus(ONE, times(frac(1n, 4n), dotQ(diff, diff))))) chordBad++;
        if (!equal(r, dotQ(w, w))) rayBad++;
        if (!equal(r, times(HALF, plus(ONE, dotQ(hopf(x), hopf(y)))))) hopfBad++;
      }
    // the heap sequence 1, Q, …, against the Chebyshev formulas, in fractions
    const seq = [QONE, b.Q[1]],
      c = dotQ(seq[0], seq[1]),
      U = [ZERO, ONE],
      Tn = [ONE, c];
    let chebBad = 0;
    for (let n = 2; n <= 6; n++) {
      seq.push(mulQ(mulQ(seq[n - 1], conjQ(seq[n - 2])), seq[n - 1]));
      U.push(minus(times(times(TWO, c), U[n - 1]), U[n - 2]));
      Tn.push(minus(times(times(TWO, c), Tn[n - 1]), Tn[n - 2]));
      const form = seq[1].map((x, i) => minus(times(U[n], x), times(U[n - 1], seq[0][i])));
      if (!sameQ(seq[n], form) || !equal(dotQ(seq[0], seq[n]), Tn[n]) || !equal(dotQ(seq[n], seq[n]), ONE)) chebBad++;
    }
    // the lift of the full turn: t ↦ e^{πit}, squared, against t ↦ e^{2πit}
    let lift = 0;
    for (let k = 0; k <= 32; k++) {
      const u = k / 32,
        [x, y] = [cs(PI * u), sn(PI * u)];
      lift = Math.max(lift, hypot(x * x - y * y - cs(TAU * u), 2 * x * y - sn(TAU * u)));
    }
    // every node of the constellation: ‖Q‖² = 1, σ recovered, κ = 1/(1 + ‖σ‖²)
    let starBad = 0;
    for (const n of NODES) {
      const s = nodeSigma(n),
        q = cayley(s);
      if (!equal(dotQ(q, q), ONE) || !sameQ(inverse(q), s) || !equal(kappaOne(q), quo(ONE, plus(ONE, dotQ(s, s))))) starBad++;
    }
    const chainBad = CHAIN.filter((x, K) => !(equal(x.norm, ONE) && x.den === 5n ** BigInt(K) && x.reduced)).length;
    // the p-adic size of small rationals: multiplicative, ultrametric, and the product formula
    const size = ([a, d], p) => {
      let v = 0n;
      for (let x = a < 0n ? -a : a; x % p === 0n; x /= p) v--;
      for (let x = d; x % p === 0n; x /= p) v++;
      return v < 0n ? frac(1n, p ** -v) : frac(p ** v);
    };
    const rationals = [];
    for (let a = -12; a <= 12; a++) for (let d = 1; d <= 12; d++) if (a !== 0) rationals.push(frac(BigInt(a), BigInt(d)));
    const bigPrimes = [2n, 3n, 5n, 7n, 11n, 13n];
    let sizeBad = 0,
      formulaBad = 0;
    for (const x of rationals) {
      const abs = [x[0] < 0n ? -x[0] : x[0], x[1]];
      if (!equal(bigPrimes.reduce((acc, p) => times(acc, size(x, p)), abs), ONE)) formulaBad++;
    }
    for (const x of rationals.slice(0, 60))
      for (const y of rationals.slice(0, 60))
        for (const p of [2n, 7n]) {
          const s = plus(x, y),
            most = cmp(size(x, p), size(y, p)) < 0 ? size(y, p) : size(x, p);
          if (!equal(size(times(x, y), p), times(size(x, p), size(y, p))) || (s[0] !== 0n && cmp(size(s, p), most) > 0)) sizeBad++;
        }
    // ζ(2) by the sum and by the product over primes
    const sieve = new Uint8Array(EULER_P + 1);
    let product = 1,
      primes = 0,
      sum = 0;
    for (let p = 2; p <= EULER_P; p++) {
      if (sieve[p]) continue;
      primes++;
      product /= 1 - 1 / (p * p);
      for (let q = p * p; q <= EULER_P; q += p) sieve[q] = 1;
    }
    for (let n = EULER_N; n >= 1; n--) sum += 1 / (n * n);
    // the least |a ln 2 + b ln 3 + c ln 5| over the box: 2^a 3^b 5^c ≠ 1 is decided on integers
    let least = Infinity,
      tried = 0,
      ties = 0;
    for (let a = -LOG_BOX; a <= LOG_BOX; a++)
      for (let d = -LOG_BOX; d <= LOG_BOX; d++)
        for (let f = -LOG_BOX; f <= LOG_BOX; f++) {
          if (a === 0 && d === 0 && f === 0) continue;
          tried++;
          const pow = (x, n) => (n < 0 ? frac(1n, x ** BigInt(-n)) : frac(x ** BigInt(n)));
          if (equal(times(times(pow(2n, a), pow(3n, d)), pow(5n, f)), ONE)) ties++;
          least = Math.min(least, Math.abs(a * Math.log(2) + d * Math.log(3) + f * Math.log(5)));
        }
    // the Cayley ratio on the line and beside it
    const ratioAt = (re) => hypot(re - 1, GAMMA1) / hypot(re, GAMMA1),
      shift = fval(FRAME.delta);
    return {
      pairs,
      triples,
      triBad,
      chordBad,
      rayBad,
      hopfBad,
      rayOne: ray(QONE, b.Q[1]),
      chebBad,
      lift,
      starBad,
      nodes: NODES.length,
      chainBad,
      rationals: rationals.length,
      sizeBad,
      formulaBad,
      zeta: { product, primes, sum },
      logs: { tried, ties, least },
      ratio: { line: ratioAt(0.5), less: ratioAt(0.5 - shift), more: ratioAt(0.5 + shift) },
      lambda: { zero: toeplitzLeast(0), nudged: toeplitzLeast(shift) },
      adelic: { zero: PRIMES.map((p) => adelic(p, ZERO)), nudged: adelic(FRAME.p, FRAME.delta), tiny: adelic(FRAME.p, FRAME.tiny) },
      gon: gonOf(FRAME.N),
      chain: CHAIN[FRAME.K]
    };
  }
  const BENCH = benchmarks();
  /** The numbers of the drawer and of the MODEL box, by the data-bench of the spans that show them. */
  const NUMBERS = {
    gamma: () => `≈ ${fmt(GAMMA1, 4)}`,
    link: () => `= ${LINK}`,
    quads: () => `${TETRA.zero}/${TETRA.quadruples}`,
    semi: () => semiRel(BENCH.gon),
    short: () => rel(null, BENCH.gon.short),
    quarter: () => relQ(kappaOne(BEATS.Q[1])),
    zNorm: () => zNormRel(1),
    zGap: () => gapRel(),
    five: () => `= ${BENCH.chain.den}`,
    qNorm: () => normRel(BENCH.chain),
    flat: () => flatRel(BENCH.chain),
    adele: () => relQ(BENCH.adelic.nudged),
    lam: () => rel(null, BENCH.lambda.nudged)
  };
  /** The text of the NUM box. */
  function numText(say) {
    const B = BENCH,
      list = (xs) => xs.join(say('、', ', ')),
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`),
      N = FRAME.N,
      d = fstr(FRAME.delta),
      beats = list([1, 2, 3].map((k) => `g${subscript(k)} = ${tuple(BEATS.g[k])}`)),
      powers = list([1, 2, 3].map((k) => `${powQ(k)} = ${tuple(BEATS.Q[k])}`)),
      seeds = list(['1/2,0,0', '1,1,0', '1,1,1', '2,1,2'].map((s) => `${tuple(seedOf(s))} ↦ ${tuple(cayley(seedOf(s)))}${say('，', ', ')}κ = ${fstr(kappaOne(cayley(seedOf(s))))}`)),
      flats = list([1, 2, FRAME.K, KMAX].map((K) => `‖${X_FLAT(K)}‖² ${flatRel(CHAIN[K])}`)),
      ones = PRIMES.filter((p, i) => equal(B.adelic.zero[i], ONE)).length;
    return say(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提；分数全部用大整数精确计算，只有标“浮点”或“≈”的数是舍入的。整数锁：四维单形的边界有 ${list(COMPLEX.f.map(String))} 个面，χ = ${COMPLEX.chi}，贝蒂数 ${COMPLEX.betti.join(', ')}；两条霍普夫圈（各 ${HOPF[0].length} 边的折线）按交叉符号数出环绕数 ${LINK}；正四面体 ${TETRA.quadruples} 个有序四元组 δF 模 4 归零 ${TETRA.zero} 个，其中在 ℤ 里是 ±4 的 ${TETRA.whole4} 个，各锚点的面错误 ${TETRA.faceErrors.join(', ')}，边上链错误 ${TETRA.edgeErrors}；它的棱图 V − E + F = ${TETRA.V} − ${TETRA.E} + ${TETRA.faces} = ${TETRA.V - TETRA.E + TETRA.faces}，ℤ/2 面边界的核 ${TETRA.kernel} 个、像 ${TETRA.image} 个，圈空间 ${TETRA.even} 个。N = ${N}：${gonLaw(B.gon, say)}，短 ${rel(null, B.gon.short)}。三拍：${beats}；${powers}；R(g₁) 把 e₁, e₂, e₃ 送到 ${BEATS.axes.map((k) => e(k + 1)).join(', ')}；q₁³ = ${tuple(BEATS.cube)}；κ(1, Q) = ${fstr(kappaOne(BEATS.Q[1]))}，而 rayKernel(1, Q) = ${fstr(B.rayOne)}。${Z_DEC}³ = ${complexText(ZPOW[3])}，${gapLaw(say)}。赫维茨单位共 24 个：${B.pairs} 对上 κ 与 1 − 弦长²/4 ${bad(B.chordBad)}，rayKernel 与旋量内积模方${bad(B.rayBad)}，与霍普夫像的内积${bad(B.hopfBad)}；${B.triples} 个三元组上基点 Q 的群分解${bad(B.triBad)}；堆序列 1, Q, … 到 n = 6 与切比雪夫公式${bad(B.chebBad)}；整圈提升（33 个采样点）的浮点偏差 ${below(B.lift)}。星座：${B.nodes} 个点的 ‖Q‖² = 1、逆映射与 κ = 1/(1 + ‖σ‖²) ${bad(B.starBad)}；${seeds}。转子链：K = 0 … ${KMAX} 的模方、分母 5<sup>K</sup> 与不可约${bad(B.chainBad)}，${fiveText(FRAME.K)} = ${B.chain.den}，‖q${subscript(FRAME.K)}‖² ${normRel(B.chain)}；${flats}。素数：${B.rationals} 个有理数的乘积公式${bad(B.formulaBad)}，p 进大小的乘性与超度量${bad(B.sizeBad)}；${PRIMES.length} 个 p 的 N(p) 在 δ = 0 时 𝒜 = 1 的有 ${ones} 个；p = ${FRAME.p}，δ = ${d}：${valued(`𝒜 = ${fstr(B.adelic.nudged)} &lt; 1`, relQ(B.adelic.nudged), say)}；δ = ${fstr(FRAME.tiny)}：𝒜 = ${fstr(B.adelic.tiny)} &lt; 1。ζ(2)：不超过 ${EULER_P} 的 ${B.zeta.primes} 个素数的乘积 ${rel(null, B.zeta.product)}，前 ${EULER_N} 项的和 ${rel(null, B.zeta.sum)}；2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 在 ${B.logs.tried} 个非零指数里有 ${B.logs.ties} 个，|a ln 2 + b ln 3 + c ln 5| 最小 ${rel(null, B.logs.least)}。凯莱比在 1/2 + iγ₁ 处 ${rel(Math.abs(B.ratio.line - 1) < 1e-12 ? ONE : null, B.ratio.line)}，在 1/2 ∓ ${d} + iγ₁ 处 ${rel(null, B.ratio.less)} 与 ${rel(null, B.ratio.more)}；${NT + 1} × ${NT + 1} 托普利茨矩阵 ${LMIN} 在 δ = 0 时 ${rel(ZERO, B.lambda.zero)}，δ = ${d} 时 ${rel(null, B.lambda.nudged)}。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it does not check their hypotheses; fractions are exact, in big integers, and only numbers after “≈” or called floating-point are rounded. Locks: the boundary of the 4-simplex has ${list(COMPLEX.f.map(String))} faces, χ = ${COMPLEX.chi}, Betti numbers ${COMPLEX.betti.join(', ')}; two Hopf circles (polygons of ${HOPF[0].length} sides) have linking number ${LINK} by signed crossings; of the ${TETRA.quadruples} ordered quadruples of the regular tetrahedron ${TETRA.zero} have δF = 0 modulo 4, ${TETRA.whole4} of them ±4 in ℤ, face errors ${TETRA.faceErrors.join(', ')}, edge errors ${TETRA.edgeErrors}; its graph has V − E + F = ${TETRA.V} − ${TETRA.E} + ${TETRA.faces} = ${TETRA.V - TETRA.E + TETRA.faces}, the ℤ/2 face boundary ${TETRA.kernel} kernel and ${TETRA.image} image elements, the cycle space ${TETRA.even}. N = ${N}: ${gonLaw(B.gon, say)}, short by ${rel(null, B.gon.short)}. Beats: ${beats}; ${powers}; R(g₁) sends e₁, e₂, e₃ to ${BEATS.axes.map((k) => e(k + 1)).join(', ')}; q₁³ = ${tuple(BEATS.cube)}; κ(1, Q) = ${fstr(kappaOne(BEATS.Q[1]))}, while rayKernel(1, Q) = ${fstr(B.rayOne)}. ${Z_DEC}³ = ${complexText(ZPOW[3])}, ${gapLaw(say)}. The 24 Hurwitz units: on ${B.pairs} pairs κ vs 1 − chord²/4, ${bad(B.chordBad)}; rayKernel vs the squared spinor product, ${bad(B.rayBad)}, vs the product of Hopf images, ${bad(B.hopfBad)}; on ${B.triples} triples the group at the base point Q, ${bad(B.triBad)}; the heap 1, Q, … up to n = 6 vs the Chebyshev formulas, ${bad(B.chebBad)}; the lift of the full turn (33 samples), floating-point drift ${below(B.lift)}. Constellation: ${B.nodes} points, ‖Q‖² = 1, the inverse and κ = 1/(1 + ‖σ‖²), ${bad(B.starBad)}; ${seeds}. Chain: squared norm, denominator 5<sup>K</sup> and lowest terms for K = 0 … ${KMAX}, ${bad(B.chainBad)}; ${fiveText(FRAME.K)} = ${B.chain.den}, ‖q${subscript(FRAME.K)}‖² ${normRel(B.chain)}; ${flats}. Primes: the product formula on ${B.rationals} rationals, ${bad(B.formulaBad)}; p-adic sizes multiplicative and ultrametric, ${bad(B.sizeBad)}; of the ${PRIMES.length} choices of p, ${ones} have 𝒜 = 1 at δ = 0; p = ${FRAME.p}, δ = ${d}: ${valued(`𝒜 = ${fstr(B.adelic.nudged)} &lt; 1`, relQ(B.adelic.nudged), say)}; δ = ${fstr(FRAME.tiny)}: 𝒜 = ${fstr(B.adelic.tiny)} &lt; 1. ζ(2): the product over the ${B.zeta.primes} primes up to ${EULER_P}, ${rel(null, B.zeta.product)}, the first ${EULER_N} terms, ${rel(null, B.zeta.sum)}; 2<sup>a</sup>3<sup>b</sup>5<sup>c</sup> = 1 for ${B.logs.ties} of ${B.logs.tried} nonzero exponents, least |a ln 2 + b ln 3 + c ln 5| ${rel(null, B.logs.least)}. Cayley ratio at 1/2 + iγ₁ ${rel(Math.abs(B.ratio.line - 1) < 1e-12 ? ONE : null, B.ratio.line)}, at 1/2 ∓ ${d} + iγ₁ ${rel(null, B.ratio.less)} and ${rel(null, B.ratio.more)}; ${NT + 1} × ${NT + 1} Toeplitz matrix, ${LMIN} ${rel(ZERO, B.lambda.zero)} at δ = 0 and ${rel(null, B.lambda.nudged)} at δ = ${d}. A numerical illustration, not a proof.`
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
  /** Big integers as strings, so that the probe survives JSON. */
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.EXACT_DEBUG = Object.freeze({
    get state() {
      return plain({
        ...calc(),
        at: state.at,
        scene: state.scene,
        regime: regimeOf(calc()),
        lens: state.lens,
        cam: state.cam,
        layers: layers(),
        clock: clock.t,
        max: clock.max,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.blend < 1),
        camera: { ...sc.cam }
      });
    },
    /** The mathematics at a rail value of a scene, a seed and a prime, without touching the page. */
    calc: (scene, t, seed = SEED, prime = 7) => plain(compute({ ...STILL, [scene]: t }, seedOf(seed), prime)),
    presets: plain(PRESETS),
    locks: () => plain({ complex: COMPLEX, link: LINK, tetra: TETRA, hopf: HOPF, corners: CORNERS }),
    beats: () => plain(BEATS),
    zpow: () => plain(ZPOW),
    chain: () => plain(CHAIN),
    nodes: () => plain({ list: NODES, count: COUNT }),
    lambda: (d) => toeplitzLeast(d),
    /** What the NUM box and the drawer are written from. */
    bench: () => plain({ ...BENCH, frame: FRAME, eulerP: EULER_P, eulerN: EULER_N, logBox: LOG_BOX }),
    /** The formatters of the page, for tests. */
    print: { rel: (x, d) => rel(ratio(x), x, d), below, sci },
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of the point Q(σ) of a seed. */
    seedTarget: (seed) => {
      const q = sc.p(scale(world(num(cayley(seedOf(seed)))), LIFT)),
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
