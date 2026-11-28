/* OMEGA//JET · D-有限射流、单纯形锥与有理舒尔实验室 · the D-finite jet, simplicial cone and rational Schur lab
   (Chapters 8, 9, 10, 12). World (kit.solid): z up; four scenes, each with two or three readings ("modes").
     jet    the Cayley circle (X, Y) on a glass unit sphere, facing the reader, and a lens in the same plane:
            cayley  the canonical representatives U_N, V_N of Cos_N(2 Atan_N(η)), Sin_N(2 Atan_N(η)) in J_N(ℚ) at η = 1/2,
                    against the exact Cayley point (3/5, 4/5); the rail is the order N = 2, 4, …, 12 and the lens zooms ×4;
            machin  the rational tangent chain 1/5 → 5/12 → 120/119 → 1 on the circle and the nested brackets [L_M, U_M]
                    on a number-line lens; the rail is the order M = 1 … 8, the lens zooms by about ×25;
     cone   a regular tetrahedron on the sphere, its four faces drawn as the four spherical triangles that tile it:
            stokes  integer circulations of the two plaquettes (0, 1, 3), (1, 2, 3); the rail erases the shared edge 13;
            cone    the cone primitive e = H₂F from a vertex b; the rail erases the spokes (b, x);
     shell  the ball coloured by E_n(κ), κ = height², with its nodal shells; the rail is κ = k/16;
            quad    the angular quadrupole r = 1 + α·nᵀQn of d¹⁰ → d⁹ → d⁸; the rail counts the holes in d_{x²−y²};
     quad   schur   the surface z = ax² + 2bxy + cy², the slice at x and its minimum at y* = −(b/c)x; the rail moves y;
            sqrt2   the eight powers of u₉₀ = (δ/2)(1 + i) in ℚ(√2) on the equator; the rail is the power k;
            phi     the golden decagon and T_n(φ/2) ∈ ℚ(φ) with φⁿ = F_{n−1} + F_n φ; the rail is n.
   Every number of the ledger is a reduced fraction [p, q] of big integers, q > 0, or an integer; the drawing alone uses
   doubles. Read-only probe: window.JETLAB_DEBUG. */
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
  const lerp = (a, b, t) => a.map((x, i) => x + (b[i] - x) * t);
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
    TWO = [2n, 1n],
    HALF = [1n, 2n];
  const plus = ([a, b], [c, d]) => frac(a * d + c * b, b * d),
    minus = ([a, b], [c, d]) => frac(a * d - c * b, b * d),
    times = ([a, b], [c, d]) => frac(a * c, b * d),
    over = ([a, b], [c, d]) => frac(a * d, b * c),
    neg = ([a, b]) => [-a, b];
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const same = (x, y) => x[0] === y[0] && x[1] === y[1];
  const sumF = (xs) => xs.reduce(plus, ZERO);
  const fval = ([p, q]) => Number(p) / Number(q);
  const mstr = (s) => String(s).replace(/-/g, '−');
  const fstr = ([p, q]) => mstr(p) + (q === 1n ? '' : '/' + q);
  const digits = (n) => String(babs(n)).length;
  /** A fraction as text; long ones as their digit counts. */
  const fshort = (x, max = 22) => (digits(x[0]) + digits(x[1]) > max ? L(`（分子 ${digits(x[0])} 位，分母 ${digits(x[1])} 位的既约分数）`, `(a reduced fraction of ${digits(x[0])} over ${digits(x[1])} digits)`) : fstr(x));
  const sub1 = (n) => mstr(n).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[c]);
  const sup1 = (n) => mstr(n).replace(/\d/g, (c) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[c]).replace('−', '⁻');
  /** The decimal digits of x, rounded down and up at d places: an exact enclosure [lo, hi] of x. */
  function outward([p, q], d) {
    const T = 10n ** BigInt(d),
      fl = (a, b) => (a >= 0n ? a / b : -((-a + b - 1n) / b)),
      lo = fl(p * T, q),
      hi = (p * T) % q === 0n ? lo : lo + 1n;
    const show = (v) => {
      const s = String(babs(v)).padStart(d + 1, '0');
      return (v < 0n ? '−' : '') + s.slice(0, s.length - d) + '.' + s.slice(s.length - d);
    };
    return [show(lo), show(hi)];
  }
  /** The largest d with 0 < x < 10^(−d), decided in integers. */
  const belowPow = ([p, q]) => {
    let d = 0;
    while (p * 10n ** BigInt(d + 1) < q) d++;
    return d;
  };
  const FACT = [1n];
  for (let i = 1; i <= 40; i++) FACT.push(FACT[i - 1] * BigInt(i));
  const sgn = (k) => (k % 2 ? -1n : 1n);

  /* ---------- 1. jets J_N(ℚ) = ℚ[η]/(η^{N+1}) and Machin brackets ---------- */
  const COSC = (N) => range(N + 1).map((k) => (k % 2 ? ZERO : frac(sgn(k / 2), FACT[k])));
  const SINC = (N) => range(N + 1).map((k) => (k % 2 ? frac(sgn((k - 1) / 2), FACT[k]) : ZERO));
  const ATANC = (N) => range(N + 1).map((k) => (k % 2 ? frac(sgn((k - 1) / 2), BigInt(k)) : ZERO));
  const CAYC = (N) => range(N + 1).map((k) => (k === 0 ? ONE : k % 2 ? ZERO : frac(2n * sgn(k / 2))));
  const CAYS = (N) => range(N + 1).map((k) => (k % 2 ? frac(2n * sgn((k - 1) / 2)) : ZERO));
  /** Product in J_N(ℚ): the Cauchy product cut at degree N. */
  const tmul = (a, b, N) => {
    const r = range(N + 1).map(() => ZERO);
    for (let i = 0; i <= N; i++) if (a[i][0] !== 0n) for (let j = 0; i + j <= N; j++) if (b[j][0] !== 0n) r[i + j] = plus(r[i + j], times(a[i], b[j]));
    return r;
  };
  /** f ∘ g in J_N(ℚ) for g with g₀ = 0 (Horner). */
  const tcompose = (f, g, N) => {
    let r = range(N + 1).map((k) => (k ? ZERO : f[N]));
    for (let k = N - 1; k >= 0; k--) {
      r = tmul(r, g, N);
      r[0] = plus(r[0], f[k]);
    }
    return r;
  };
  const evalAt = (p, x) => p.reduceRight((s, c) => plus(times(s, x), c), ZERO);
  const X0 = frac(3, 5),
    Y0 = frac(4, 5);
  const NMAX = 14;
  const jetCache = new Map();
  /** Everything the Cayley card says about the order N. */
  function jetOrder(N) {
    if (jetCache.has(N)) return jetCache.get(N);
    const cosN = COSC(N),
      sinN = SINC(N),
      g = ATANC(N).map((c) => times(TWO, c)),
      F = tcompose(cosN, g, N),
      G = tcompose(sinN, g, N),
      cc = CAYC(N),
      cs2 = CAYS(N);
    const unified = F.every((c, k) => same(c, cc[k])) && G.every((c, k) => same(c, cs2[k]));
    const sq = tmul(cosN, cosN, N).map((c, k) => plus(c, tmul(sinN, sinN, N)[k])),
      pyth = sq.every((c, k) => same(c, k ? ZERO : ONE));
    // the Cayley equations of the composite below degree N: (1 + η²)·DF ≡ −2G and (1 + η²)·DG ≡ 2F
    const D = (h) => range(N).map((k) => times(frac(k + 1), h[k + 1])),
      DF = D(F),
      DG = D(G);
    let ode = true;
    for (let k = 0; k < N; k++) {
      const lf = plus(DF[k], k >= 2 ? DF[k - 2] : ZERO),
        lg = plus(DG[k], k >= 2 ? DG[k - 2] : ZERO);
      if (!same(lf, times(frac(-2), G[k])) || !same(lg, times(TWO, F[k]))) ode = false;
    }
    const U = evalAt(cc, HALF),
      V = evalAt(cs2, HALF),
      a = evalAt(ATANC(N), HALF),
      a2 = times(TWO, a),
      cn = evalAt(cosN, a2),
      snv = evalAt(sinN, a2);
    const out = { N, F, G, unified, pyth, ode, U, V, eu: minus(U, X0), ev: minus(V, Y0), nu: minus(cn, X0), nv: minus(snv, Y0) };
    jetCache.set(N, out);
    return out;
  }
  // the Machin chain in homogeneous pairs (p, q) ↔ t = p/q: (p₁, q₁)·(p₂, q₂) = (p₁q₂ + q₁p₂, q₁q₂ − p₁p₂)
  const pmulH = ([p1, q1], [p2, q2]) => [p1 * q2 + q1 * p2, q1 * q2 - p1 * p2];
  const reduce2 = ([p, q]) => {
    const g = bgcd(p, q);
    return [p / g, q / g];
  };
  const CHAIN = (() => {
    const s = [1n, 5n],
      d1 = pmulH(s, s),
      t2 = reduce2(d1),
      d2 = pmulH(t2, t2),
      t4 = reduce2(d2),
      corr = [-1n, 239n],
      last = pmulH(t4, corr);
    return { s, d1, t2, d2, t4, corr, last, value: frac(last[0], last[1]) };
  })();
  /** The Cayley point of t = p/q: ((q² − p²)/(p² + q²), 2pq/(p² + q²)). */
  const cayleyOf = ([p, q]) => [frac(q * q - p * p, p * p + q * q), frac(2n * p * q, p * p + q * q)];
  const partial = new Map();
  /** A_M(x) = Σ_{k<M} (−1)^k x^{2k+1}/(2k + 1). */
  function A(M, x) {
    const key = M + ':' + fstr(x);
    if (!partial.has(key)) {
      let s = ZERO,
        pw = x;
      const x2 = times(x, x);
      for (let k = 0; k < M; k++) {
        s = plus(s, times(frac(sgn(k), BigInt(2 * k + 1)), pw));
        pw = times(pw, x2);
      }
      partial.set(key, s);
    }
    return partial.get(key);
  }
  const lo2 = (a, b) => (cmp(a, b) < 0 ? a : b),
    hi2 = (a, b) => (cmp(a, b) > 0 ? a : b);
  const FIFTH = frac(1, 5),
    T239 = frac(1, 239);
  const bracketCache = new Map();
  function bracket(M) {
    if (bracketCache.has(M)) return bracketCache.get(M);
    const a = A(M, FIFTH),
      a1 = A(M + 1, FIFTH),
      b = A(M, T239),
      b1 = A(M + 1, T239);
    const Lm = minus(times(frac(16), lo2(a, a1)), times(frac(4), hi2(b, b1))),
      Um = minus(times(frac(16), hi2(a, a1)), times(frac(4), lo2(b, b1))),
      W = minus(Um, Lm),
      m = BigInt(2 * M + 1),
      closed = plus(frac(16n, 5n ** m * m), frac(4n, 239n ** m * m));
    const out = { M, L: Lm, U: Um, W, closed, closedOk: same(W, closed), below: belowPow(W) };
    if (M > 1) {
      const p = bracket(M - 1);
      out.nested = cmp(p.L, Lm) < 0 && cmp(Lm, Um) < 0 && cmp(Um, p.U) < 0;
    } else out.nested = cmp(Lm, Um) < 0;
    bracketCache.set(M, out);
    return out;
  }
  const MMAX = 8;
  const CENTER = (() => {
    const b = bracket(12);
    return fval(times(plus(b.L, b.U), HALF));
  })();

  /* ---------- 2. simplicial cochains on the tetrahedron V = {0, 1, 2, 3} (small integers, exact) ---------- */
  const EDGES = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3]
  ];
  const FACES = [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3]
  ];
  const VS = [0, 1, 2, 3];
  /** Sort a tuple, counting the swaps: [sign, sorted], sign 0 when a vertex repeats. */
  function sorted(t) {
    const a = t.slice();
    let s = 1;
    for (let i = 0; i < a.length; i++)
      for (let j = 0; j + 1 < a.length - i; j++)
        if (a[j] > a[j + 1]) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]];
          s = -s;
        }
    for (let i = 0; i + 1 < a.length; i++) if (a[i] === a[i + 1]) return [0, a];
    return [s, a];
  }
  const edgeIndex = (a) => EDGES.findIndex((e) => e[0] === a[0] && e[1] === a[1]);
  const faceIndex = (a) => FACES.findIndex((f) => f[0] === a[0] && f[1] === a[1] && f[2] === a[2]);
  // the sign of the sorting permutation and the index of the sorted tuple, tabulated for every ordered pair and triple
  const T1 = range(16).map((i) => {
    const [s, a] = sorted([i >> 2, i & 3]);
    return [s, s ? edgeIndex(a) : -1];
  });
  const T2 = range(64).map((i) => {
    const [s, a] = sorted([i >> 4, (i >> 2) & 3, i & 3]);
    return [s, s ? faceIndex(a) : -1];
  });
  /** The alternating cochains with the given values on the increasing tuples. */
  const alt1 = (vals) => (x, y) => {
    const [s, i] = T1[4 * x + y];
    return s ? s * vals[i] : 0;
  };
  const alt2 = (vals) => (x, y, z) => {
    const [s, i] = T2[16 * x + 4 * y + z];
    return s ? s * vals[i] : 0;
  };
  const d0 = (f) => (x, y) => f(y) - f(x);
  const d1 = (e) => (x, y, z) => e(y, z) + e(x, y) - e(x, z);
  const d2 = (F) => (x, y, z, w) => F(y, z, w) + F(x, y, w) - F(x, z, w) - F(x, y, z);
  const H2 = (b, F) => (x, y) => F(b, x, y);
  const H3 = (b, D3) => (x, y, z) => D3(b, x, y, z);
  const triples = VS.flatMap((x) => VS.flatMap((y) => VS.map((z) => [x, y, z])));
  const quads = VS.flatMap((x) => triples.map((t) => [x, ...t]));
  const OMEGA123 = alt2([0, 0, 0, 1]);
  const opposite = (b) => VS.filter((v) => v !== b);
  function cochains(S) {
    const f = (v) => S.f[v],
      phi = alt1(S.phi),
      e1 = (x, y) => phi(x, y) + d0(f)(x, y),
      dPhi = d1(e1),
      F = (x, y, z) => dPhi(x, y, z) + S.kdef * OMEGA123(x, y, z),
      dF = d2(F),
      b = S.base,
      e = H2(b, F),
      de = d1(e),
      hd = H3(b, dF);
    const edges = EDGES.map(([x, y]) => e1(x, y)),
      faces = FACES.map(([x, y, z]) => F(x, y, z)),
      circ = [dPhi(0, 1, 3), dPhi(1, 2, 3)],
      boundary = e1(0, 1) + e1(1, 2) + e1(2, 3) + e1(3, 0);
    const opp = opposite(b),
      cone = EDGES.map(([x, y]) => e(x, y)),
      defect = dF(b, opp[0], opp[1], opp[2]);
    let d1d0 = 0,
      coneOk = 0,
      d2d1 = 0,
      primitive = 0;
    for (const [x, y, z] of triples) {
      if (d1(d0(f))(x, y, z) === 0) d1d0++;
      if (de(x, y, z) + hd(x, y, z) === F(x, y, z)) coneOk++;
      if (de(x, y, z) === F(x, y, z)) primitive++;
    }
    for (const [x, y, z, w] of quads) if (d2(de)(x, y, z, w) === 0) d2d1++;
    const closed = quads.every(([x, y, z, w]) => dF(x, y, z, w) === 0);
    return { edges, faces, circ, boundary, base: b, opp, cone, defect, closed, d1d0, coneOk, d2d1, primitive, coneFace: de(opp[0], opp[1], opp[2]), oppF: F(opp[0], opp[1], opp[2]), F, e, e1 };
  }
  // the non-abelian two-plaquette example of §9.1: unit quaternions with rational entries
  const qmul = (a, b) => [
    minus(minus(minus(times(a[0], b[0]), times(a[1], b[1])), times(a[2], b[2])), times(a[3], b[3])),
    plus(minus(plus(times(a[0], b[1]), times(a[1], b[0])), times(a[3], b[2])), times(a[2], b[3])),
    plus(plus(minus(times(a[0], b[2]), times(a[1], b[3])), times(a[2], b[0])), times(a[3], b[1])),
    plus(minus(plus(times(a[0], b[3]), times(a[1], b[2])), times(a[2], b[1])), times(a[3], b[0]))
  ];
  const qconj = (q) => [q[0], neg(q[1]), neg(q[2]), neg(q[3])];
  const Q4 = (...v) => v.map((x) => (Array.isArray(x) ? frac(x[0], x[1]) : frac(x)));
  const HEAP = (() => {
    const U01 = Q4([3, 5], [4, 5], 0, 0),
      U12 = Q4([3, 5], 0, [4, 5], 0),
      U23 = Q4([3, 5], 0, 0, [4, 5]),
      U30 = Q4([1, 2], [1, 2], [1, 2], [1, 2]),
      U13 = Q4([4, 5], [3, 5], 0, 0);
    const W1 = qmul(qmul(U30, U13), U01),
      F2 = qmul(qmul(qconj(U13), U23), U12),
      W2 = qmul(qmul(qconj(U01), F2), U01),
      prod = qmul(W1, W2),
      hol = qmul(qmul(qmul(U30, U23), U12), U01),
      rev = qmul(W2, W1),
      viaThree = qmul(qconj(U13), qconj(U30)),
      alt = qmul(W1, qmul(qmul(qconj(viaThree), F2), viaThree)),
      cancel = qmul(U13, qconj(U13));
    return { U01, U12, U23, U30, U13, W1, F2, W2, prod, hol, rev, alt, cancel, ok: prod.every((x, i) => same(x, hol[i])), revOk: rev.every((x, i) => same(x, hol[i])) };
  })();
  const q4str = (q) => `(${q.map(fstr).join(', ')})`;

  /* ---------- 3. Chebyshev shells and the d-orbital quadrupole ---------- */
  // integer polynomials as arrays of big integers, lowest degree first
  const padd = (a, b) => range(Math.max(a.length, b.length)).map((i) => (a[i] || 0n) + (b[i] || 0n));
  const pneg = (a) => a.map((x) => -x);
  const pmulZ = (a, b) => {
    const r = range(a.length + b.length - 1).map(() => 0n);
    a.forEach((x, i) => b.forEach((y, j) => (r[i + j] += x * y)));
    return r;
  };
  const ptrim = (a) => {
    const r = a.slice();
    while (r.length > 1 && r[r.length - 1] === 0n) r.pop();
    return r;
  };
  const SHELLS = 12;
  const EVEN = [[1n], [-1n, 4n]];
  for (let n = 2; n <= SHELLS; n++) EVEN.push(ptrim(padd(pmulZ([-2n, 4n], EVEN[n - 1]), pneg(EVEN[n - 2]))));
  const UCH = [[1n], [0n, 2n]];
  for (let m = 2; m <= 2 * SHELLS + 1; m++) UCH.push(ptrim(padd(pmulZ([0n, 2n], UCH[m - 1]), pneg(UCH[m - 2]))));
  const pevalZ = (p, x) => p.reduceRight((s, c) => s * x + c, 0n);
  const pevalQ = (p, x) => p.reduceRight((s, c) => plus(times(s, x), [c, 1n]), ZERO);
  const pevalF = (p, x) => p.reduceRight((s, c) => s * x + Number(c), 0);
  const polyStr = (p, v = 'κ') =>
    p
      .map((c, k) => [c, k])
      .filter(([c]) => c !== 0n)
      .reverse()
      .map(([c, k], i) => {
        const a = babs(c),
          coef = a === 1n && k > 0 ? '' : String(a),
          mono = k === 0 ? '' : k === 1 ? v : v + sup1(k);
        return (i ? (c < 0n ? ' − ' : ' + ') : c < 0n ? '−' : '') + coef + mono;
      })
      .join('') || '0';
  /** E_n(x²) = U_{2n}(x) as polynomials: the coefficient of x^{2j} is that of κ^j, the odd ones vanish. */
  const evenMatches = (n) => {
    const u = UCH[2 * n];
    return u.every((c, i) => (i % 2 ? c === 0n : c === (EVEN[n][i / 2] || 0n))) && EVEN[n].length * 2 - 1 === u.length;
  };
  const fusionSum = (m, n) => {
    let s = [0n];
    for (let r = abs(m - n); r <= m + n; r++) s = padd(s, EVEN[r]);
    return ptrim(s);
  };
  const samePoly = (a, b) => {
    const x = ptrim(a),
      y = ptrim(b);
    return x.length === y.length && x.every((c, i) => c === y[i]);
  };
  /** The roots of E_n in (0, 1), for drawing the nodal shells (doubles, by bisection). */
  const ROOTS = EVEN.slice(0, 4).map((p) => {
    const out = [],
      f = (x) => pevalF(p, x),
      steps = 800;
    for (let i = 0; i < steps; i++) {
      let a = i / steps,
        b = (i + 1) / steps;
      if (f(a) === 0) out.push(a);
      else if (f(a) * f(b) < 0) {
        for (let k = 0; k < 60; k++) {
          const c = (a + b) / 2;
          if (f(a) * f(c) <= 0) b = c;
          else a = c;
        }
        out.push((a + b) / 2);
      }
    }
    return out;
  });
  // the real d orbitals as polynomials on S²: [[coefficient, [a, b, c]], …] for x^a y^b z^c
  const ORBITALS = [
    ['z2', 'd<sub>z²</sub>', [[2n, [0, 0, 2]], [-1n, [2, 0, 0]], [-1n, [0, 2, 0]]]],
    ['xz', 'd<sub>xz</sub>', [[1n, [1, 0, 1]]]],
    ['yz', 'd<sub>yz</sub>', [[1n, [0, 1, 1]]]],
    ['xy', 'd<sub>xy</sub>', [[1n, [1, 1, 0]]]],
    ['x2y2', 'd<sub>x²−y²</sub>', [[1n, [2, 0, 0]], [-1n, [0, 2, 0]]]]
  ];
  const mpoly = (A1, B1) => {
    const r = new Map();
    for (const [c1, e1] of A1)
      for (const [c2, e2] of B1) {
        const k = [e1[0] + e2[0], e1[1] + e2[1], e1[2] + e2[2]].join();
        r.set(k, (r.get(k) || 0n) + c1 * c2);
      }
    return [...r].map(([k, c]) => [c, k.split(',').map(Number)]);
  };
  const dfact = (n) => (n <= 0 ? 1n : BigInt(n) * dfact(n - 2));
  /** E[x^a y^b z^c] on S² = (a − 1)!!(b − 1)!!(c − 1)!!/(a + b + c + 1)!! for even a, b, c, else 0. */
  const sphereMoment = ([a, b, c]) => (a % 2 || b % 2 || c % 2 ? ZERO : frac(dfact(a - 1) * dfact(b - 1) * dfact(c - 1), dfact(a + b + c + 1)));
  const expect = (poly) => poly.reduce((s, [c, e]) => plus(s, times([c, 1n], sphereMoment(e))), ZERO);
  const QOP = [0, 1, 2].map((i) => {
    const e = [0, 0, 0];
    e[i] = 2;
    return [[3n, e], [-1n, [2, 0, 0]], [-1n, [0, 2, 0]], [-1n, [0, 0, 2]]];
  });
  const QOFF = [
    [[3n, [1, 1, 0]]],
    [[3n, [1, 0, 1]]],
    [[3n, [0, 1, 1]]]
  ];
  const ORB = ORBITALS.map(([key, name, p]) => {
    const p2 = mpoly(p, p),
      den = expect(p2);
    return { key, name, diag: QOP.map((q) => over(expect(mpoly(p2, q)), den)), off: QOFF.map((q) => over(expect(mpoly(p2, q)), den)) };
  });
  const D10 = [0, 1, 2].map((i) => times(TWO, sumF(ORB.map((o) => o.diag[i]))));
  const X2Y2 = ORB[4].diag;
  const quadOf = (h) => [0, 1, 2].map((i) => minus(D10[i], times(frac(h), X2Y2[i])));

  /* ---------- 4. quadratic fields and the Schur complement ---------- */
  // ℚ(√2): [p, q] = p + qδ with δ² = 2; spinors A + Bi with A, B in ℚ(√2), i² = −1
  const s2mul = (a, b) => [plus(times(a[0], b[0]), times(TWO, times(a[1], b[1]))), plus(times(a[0], b[1]), times(a[1], b[0]))];
  const s2add = (a, b) => [plus(a[0], b[0]), plus(a[1], b[1])];
  const s2neg = (a) => [neg(a[0]), neg(a[1])];
  const s2norm = (a) => minus(times(a[0], a[0]), times(TWO, times(a[1], a[1])));
  const spmul = (x, y) => [s2add(s2mul(x[0], y[0]), s2neg(s2mul(x[1], y[1]))), s2add(s2mul(x[0], y[1]), s2mul(x[1], y[0]))];
  const U90 = [
    [ZERO, HALF],
    [ZERO, HALF]
  ];
  const SPIN = [[[ONE, ZERO], [ZERO, ZERO]]];
  for (let k = 1; k <= 16; k++) SPIN.push(spmul(SPIN[k - 1], U90));
  const spinNorm = (w) => s2add(s2mul(w[0], w[0]), s2mul(w[1], w[1]));
  const BELL = [ZERO, frac(2)],
    BELL2 = s2mul(BELL, BELL);
  /** q·g for a generator g, written g/r, −g/r, (p/r)g or pg. */
  const gen = ([p, r], g) => (r === 1n ? (p === 1n ? g : p === -1n ? '−' + g : `${mstr(p)}${g}`) : babs(p) === 1n ? `${p < 0n ? '−' : ''}${g}/${r}` : `(${fstr([p, r])})${g}`);
  const s2str = ([p, q]) => {
    if (q[0] === 0n) return fstr(p);
    const qs = gen(q, 'δ');
    return p[0] === 0n ? qs : `${fstr(p)} ${q[0] < 0n ? '− ' + qs.replace('−', '') : '+ ' + qs}`;
  };
  const spinStr = (w) => {
    const re = w[0],
      im = w[1],
      z = (a) => a[0][0] === 0n && a[1][0] === 0n;
    if (z(im)) return s2str(re);
    const imS = s2str(im),
      wrap = /[ /]/.test(imS.replace(/^−/, '')) ? `(${imS})` : imS;
    const imPart = imS === '1' ? 'i' : imS === '−1' ? '−i' : `${wrap}i`;
    if (z(re)) return imPart;
    return `${s2str(re)} ${imPart.startsWith('−') ? '− ' + imPart.slice(1) : '+ ' + imPart}`;
  };
  const S2INV = (() => {
    const z = [ONE, ONE],
      n = s2norm(z),
      inv = [over(z[0], n), over(neg(z[1]), n)];
    return { z, n, inv, check: s2mul(z, inv) };
  })();
  // ℚ(φ): [p, q] = p + qφ with φ² = φ + 1
  const phmul = (a, b) => [plus(times(a[0], b[0]), times(a[1], b[1])), plus(plus(times(a[0], b[1]), times(a[1], b[0])), times(a[1], b[1]))];
  const phadd = (a, b) => [plus(a[0], b[0]), plus(a[1], b[1])];
  const phneg = (a) => [neg(a[0]), neg(a[1])];
  const phnorm = (a) => minus(plus(times(a[0], a[0]), times(a[0], a[1])), times(a[1], a[1]));
  const phstr = ([p, q]) => {
    if (q[0] === 0n) return fstr(p);
    const qs = gen(q, 'φ');
    return p[0] === 0n ? qs : `${fstr(p)} ${q[0] < 0n ? '− ' + qs.replace('−', '') : '+ ' + qs}`;
  };
  const PHIMAX = 30;
  const PHIPOW = [[ONE, ZERO]];
  for (let n = 1; n <= PHIMAX; n++) PHIPOW.push(phmul(PHIPOW[n - 1], [ZERO, ONE]));
  const FIB = [0n, 1n];
  for (let n = 2; n <= PHIMAX + 1; n++) FIB.push(FIB[n - 1] + FIB[n - 2]);
  const fibAt = (n) => (n < 0 ? 1n : FIB[n]); // F_{−1} = 1
  const chebQPhi = (x, nmax) => {
    const T = [
      [ONE, ZERO],
      x
    ];
    for (let k = 2; k <= nmax; k++) T.push(phadd(phmul(phmul([TWO, ZERO], x), T[k - 1]), phneg(T[k - 2])));
    return T;
  };
  const TPHI = chebQPhi([ZERO, HALF], 20);
  const TPHI1 = chebQPhi([frac(-1, 2), HALF], 10);
  // the Schur complement of ax² + 2bxy + cy², c > 0; the dials move in halves
  const halves = (v) => frac(v, 2);
  function schurOf(S, t) {
    const a = halves(S.a),
      b = halves(S.b),
      c = halves(S.c),
      x = halves(S.x),
      Sv = minus(a, over(times(b, b), c)),
      ystar = neg(times(over(b, c), x)),
      y = plus(ystar, frac(16 - t, 6)),
      q = plus(plus(times(a, times(x, x)), times(times(TWO, b), times(x, y))), times(c, times(y, y))),
      floor = times(Sv, times(x, x)),
      sq = times(c, times(minus(y, ystar), minus(y, ystar)));
    return { a, b, c, x, S: Sv, ystar, y, t, q, floor, sq, ok: same(q, plus(floor, sq)), atMin: same(y, ystar) };
  }

  /* ---------- state, cards, rails ---------- */
  const SCENES = ['jet', 'cone', 'shell', 'quad'];
  const MODEKEY = { jet: 'jmode', cone: 'cmode', shell: 'smode', quad: 'qmode' };
  const RAILS = {
    'jet:cayley': { max: 10, rate: 1.8, still: 10 },
    'jet:machin': { max: 7, rate: 1.4, still: 7 },
    'cone:stokes': { max: 8, rate: 3.2, still: 8 },
    'cone:cone': { max: 8, rate: 3.2, still: 8 },
    'shell:shell': { max: 16, rate: 4, still: 8 },
    'shell:quad': { max: 2, rate: 0.8, still: 2 },
    'quad:schur': { max: 24, rate: 6, still: 16 },
    'quad:sqrt2': { max: 8, rate: 2.2, still: 8 },
    'quad:phi': { max: 12, rate: 2.4, still: 5 }
  };
  const STILLS = Object.fromEntries(Object.entries(RAILS).map(([k, r]) => [k, r.still]));
  const FRESH = { lens: 0, jmode: 'cayley', cmode: 'cone', base: 0, phi: [2, -1, 1, 3, -2, 1], f: [0, 0, 0, 0], kdef: 0, smode: 'shell', n: 2, m: 1, qmode: 'schur', a: 4, b: 2, c: 3, x: 2 };
  const copy = (o) => JSON.parse(JSON.stringify(o));
  const state = { ...copy(FRESH), scene: 'jet', cam: 'card', at: { ...STILLS } };
  const PRESETS = {
    'dfinite-cayley-machin': { scene: 'jet', play: true, still: STILLS['jet:cayley'], set: { jmode: 'cayley' } },
    'simplicial-stokes-cone': { scene: 'cone', play: true, still: STILLS['cone:cone'], set: { cmode: 'cone', base: 0 } },
    'peter-weyl-even-chebyshev': { scene: 'shell', play: true, still: STILLS['shell:shell'], set: { smode: 'shell', n: 2, m: 1 } },
    'quadratic-ext-and-schur': { scene: 'quad', play: true, still: STILLS['quad:schur'], set: { qmode: 'schur' } }
  };
  const DEFAULT = 'dfinite-cayley-machin';
  const modeOf = (scene = state.scene) => state[MODEKEY[scene]];
  const railKey = () => `${state.scene}:${modeOf()}`;
  const step = (v = state.at[railKey()]) => clamp(Math.floor(v + 1e-9), 0, RAILS[railKey()].max);

  function compute(S) {
    const key = `${S.scene}:${S[MODEKEY[S.scene]]}`,
      v = S.at[key],
      k = clamp(Math.floor(v + 1e-9), 0, RAILS[key].max);
    switch (key) {
      case 'jet:cayley': {
        const N = 2 + k,
          J = jetOrder(N),
          prev = N >= 4 ? jetOrder(N - 2) : null;
        return { key, k, N, ...J, ratioU: prev ? over(J.eu, prev.eu) : null, ratioV: prev ? over(J.ev, prev.ev) : null, points: range(NMAX - 1).map((i) => jetOrder(2 + i)) };
      }
      case 'jet:machin': {
        const M = k + 1;
        return { key, k, M, ...bracket(M), next: bracket(M + 1), prev: M > 1 ? bracket(M - 1) : null, chain: CHAIN };
      }
      case 'cone:stokes':
      case 'cone:cone':
        return { key, k, lambda: frac(k, 8), ...cochains(S), heap: HEAP };
      case 'shell:shell': {
        const kap = frac(k, 16),
          En = pevalQ(EVEN[S.n], kap),
          Em = pevalQ(EVEN[S.m], kap),
          prod = pmulZ(EVEN[S.m], EVEN[S.n]),
          sumP = fusionSum(S.m, S.n);
        return { key, k, kappa: kap, n: S.n, m: S.m, poly: EVEN[S.n], En, Em, product: times(En, Em), prodPoly: ptrim(prod), sumPoly: sumP, fusionOk: samePoly(prod, sumP), sumAt: pevalQ(sumP, kap), evenOk: evenMatches(S.n), dim: pevalQ(EVEN[S.n], ONE) };
      }
      case 'shell:quad':
        return { key, k, holes: k, Q: quadOf(k), orb: ORB, d10: D10, trace: sumF(quadOf(k)) };
      case 'quad:schur':
        return { key, ...schurOf(S, k), k };
      case 'quad:sqrt2':
        return { key, k, power: SPIN[k], norm2: spinNorm(SPIN[k]), bell: BELL, bell2: BELL2, inv: S2INV };
      default: {
        const n = k;
        return { key, k, n, power: PHIPOW[n], fib: [fibAt(n - 1), fibAt(n)], norm: phnorm(PHIPOW[n]), T: TPHI[n], T5: TPHI[5], T10: TPHI[10], T5b: TPHI1[5], ratio: n >= 2 ? frac(FIB[n], FIB[n - 1]) : null };
      }
    }
  }
  const calc = () => compute(state);

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const CAMS = { jet: [0.3, 0.2], cone: [-0.32, 0.3], shell: [-0.42, 0.42], quad: [-0.62, 0.52] };
  const camOf = (name) => {
    const base =
      state.scene === 'quad' && state.qmode !== 'schur'
        ? CAMS.jet
        : state.scene === 'cone'
          ? state.cmode === 'stokes'
            ? // turning about the vertical moves the eye along the shared edge 13: both plaquettes stay in view
              add(camFrom(add(unit(add(TV[1], TV[3])), [0, 0, 0.3])), [0.42, 0.08])
            : // from the apex, tilted up by about 11° only: all three cone faces keep facing the reader
              camFrom(add(TV[state.base], [0, 0, 0.22]))
          : CAMS[state.scene];
    if (name === 'top') return [base[0], 1.25];
    if (name === 'side') return [base[0] + 1.15, 0.12];
    return base;
  };
  const opts = { canvas: $('cv'), yaw: CAMS.jet[0], pitch: CAMS.jet[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let cam = basis(...CAMS.jet);
  const UP = [0, 0, 1];
  const LIFT = 1.012;
  const at3 = (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)];
  const slerp3 = (u, v, t) => {
    const om = Math.acos(clamp(dot(u, v), -1, 1));
    if (om < 1e-9) return u.slice();
    return add(scale(u, sn((1 - t) * om) / sn(om)), scale(v, sn(t * om) / sn(om)));
  };
  const arc3 = (u, v, r = LIFT, n = 40, t0 = 0, t1 = 1) => sample(n, (t) => scale(unit(slerp3(u, v, t0 + (t1 - t0) * t)), r));

  // jet: the circle in the plane y = 0, X to the right and Y up; the lens in the same plane, to the right
  const cay = (X, Y, r = 1) => [X * r, 0, Y * r];
  // the lens stands to the right of the circle on a wide stage and under it on a tall one (phones, narrow figures)
  const LENS_SIDE = [2.2, 0, 0.3],
    LENS_BELOW = [0.12, 0, -2.02],
    HS = 0.74;
  let LC = LENS_SIDE;
  const lensPt = (u, v) => [LC[0] + HS * u, -0.02, LC[2] + HS * v];
  const lensBelow = () => LC === LENS_BELOW;
  const E0 = cay(0.6, 0.8);
  const truncPt = (J) => cay(fval(J.U), fval(J.V));
  const ZC0 = 0.5 / Math.hypot(0.1, 0.2);
  const lensZoomC = (v) => ZC0 * 2 ** clamp(v, 0, 11);
  const lensZoomM = (v) => {
    const k = clamp(v, 0, MMAX - 1),
      a = Math.floor(k),
      b = Math.min(MMAX - 1, a + 1),
      za = 1 / fval(bracket(a + 1).W),
      zb = 1 / fval(bracket(b + 1).W);
    return za * (zb / za) ** (k - a);
  };
  // cone: a regular tetrahedron inscribed in the unit ball, turned so that vertex 0 and the midpoint of the shared edge 13
  // stand equally high above the horizon (each of them is then seen from above)
  const TV = (() => {
    const raw = [
        [1, 1, 1],
        [-1, 1, -1],
        [1, -1, -1],
        [-1, -1, 1]
      ].map(unit),
      m13 = unit(add(raw[1], raw[3])),
      z = unit(add(raw[0], m13)),
      x = unit(sub(m13, scale(z, dot(m13, z)))),
      y = cross(z, x);
    return raw.map((v) => [dot(v, x), dot(v, y), dot(v, z)]);
  })();
  const faceCentre = (f) => scale(f.reduce((s, i) => add(s, TV[i]), [0, 0, 0]), 1 / f.length);
  const camFrom = (d) => {
    const D = unit(d),
      pitch = Math.max(-0.45, Math.asin(clamp(D[2], -1, 1)));
    return [Math.atan2(-D[0], -D[1]), pitch];
  };
  // shell quadrupole: r = 1 + α·nᵀQn
  const QALPHA = 0.42;
  // quad (Schur): the surface over (x, y) ∈ [−2, 2]², drawn at half size, height scaled
  const SXY = 0.5;
  let schurScale = { s: 0.1, z0: 0 };

  /* ---------- fitting the picture between the title and the legend ---------- */
  const BALL = [-1.04, 1.04, -1.04, 1.04];
  const around = (pts, box = BALL) =>
    pts.reduce((b, p) => {
      const x = dot(p, cam.R),
        y = dot(p, cam.U);
      return [Math.min(b[0], x), Math.max(b[1], x), Math.min(b[2], y), Math.max(b[3], y)];
    }, box);
  function extents(m) {
    const key = m.key;
    if (key.startsWith('jet')) return { pts: [lensPt(-1, -1), lensPt(1, -1), lensPt(1, 1), lensPt(-1, 1), lensPt(0, lensBelow() ? 1.12 : 1.32), cay(-1.05, 0), cay(0.5, 1.12)], box: BALL };
    if (key === 'shell:quad') {
      const Qf = m.Q.map(fval),
        r = (n) => 1 + QALPHA * (Qf[0] * n[0] * n[0] + Qf[1] * n[1] * n[1] + Qf[2] * n[2] * n[2]);
      const pts = [];
      for (let i = 0; i <= 8; i++) for (let j = 0; j < 12; j++) {
        const n = at3((PI * i) / 8, (TAU * j) / 12);
        pts.push(scale(n, Math.max(1, r(n))));
      }
      return { pts, box: [Infinity, -Infinity, Infinity, -Infinity] };
    }
    if (key === 'quad:schur') {
      const pts = [];
      for (let i = 0; i <= 8; i++) for (let j = 0; j <= 8; j++) pts.push(schurWorld(-2 + i / 2, -2 + j / 2));
      pts.push(add(schurWorld(fval(m.x), fval(m.ystar)), [0, 0, -0.12]));
      return { pts, box: [Infinity, -Infinity, Infinity, -Infinity] };
    }
    return { pts: [], box: [-1.12, 1.12, -1.1, 1.12] };
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
    const key = [state.scene, modeOf(), state.lens, document.documentElement.dataset.lang, W, H, TRV.still].join();
    if (key !== title.key || TRV.still) Object.assign(title, { key, top: 12 });
    if (shown(tl)) title.top = Math.max(title.top, tl.getBoundingClientRect().bottom - box.top + 8);
    const top = title.top;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 8) : 12;
    const side = 14,
      room = Math.max(40, H - top - bottom);
    const ex = extents(m);
    const [x0, x1, y0, y1] = around(ex.pts, ex.box).map((v, i) => v + [-0.1, 0.1, -0.06, 0.08][i]);
    const u = Math.max(8, Math.min((W - 2 * side) / (x1 - x0), room / (y1 - y0)));
    opts.radius = u / Math.min(W, H);
    opts.cx = (W / 2 - (u * (x0 + x1)) / 2) / W;
    opts.cy = (top + room / 2 + (u * (y0 + y1)) / 2) / H;
  }

  /* ---------- drawing ---------- */
  const strong = () => (state.lens ? { exact: 0.55, flat: 1 } : { exact: 1, flat: 0.6 });
  const tube = (key, pts, color, width, alpha = 1, glow = 0.3) => alpha > 0.01 && pts.length > 1 && sc.tube(alpha < 0.99 ? key + '~' : key, pts, { color, width, glow, occlude: false, pick: false, alpha });
  /** A circle as a keyed tube: it keeps its mesh and material from frame to frame. */
  const loop = (key, c, n, r, color, width, alpha = 1) => {
    const nn = unit(n),
      e1 = unit(cross(nn, abs(nn[2]) < 0.9 ? UP : [1, 0, 0])),
      e2 = cross(nn, e1);
    tube(key, sample(96, (t) => add(c, add(scale(e1, r * cs(TAU * t)), scale(e2, r * sn(TAU * t))))), color, width, alpha, 0.35);
  };
  /** The parts of a polyline inside the lens square |u|, |v| ≤ lim (drawn as keyed tubes). */
  function clipRuns(pts, lim = 0.97) {
    const runs = [];
    let run = [];
    for (const p of pts) {
      if (abs(p[0]) <= lim && abs(p[1]) <= lim) run.push(p);
      else if (run.length) {
        runs.push(run);
        run = [];
      }
    }
    if (run.length) runs.push(run);
    return runs.filter((r) => r.length > 1);
  }
  const inLens = (u, v, lim = 0.97) => abs(u) <= lim && abs(v) <= lim;
  function lensFrame(titleOn) {
    const c = [lensPt(-1, -1), lensPt(1, -1), lensPt(1, 1), lensPt(-1, 1)];
    sc.fan(c, { fill: P.stage, alpha: 0.74, color: P.ink, width: 1, strokeAlpha: 0.55 });
    if (titleOn) tube('lensTop', [lensPt(-1, 1.02), lensPt(1, 1.02)], P.ink, 1, 0.35, 0.2);
  }

  /** The far half of the unit ball as a lit bowl behind the plane y = 0 of a circle that faces the reader: everything
      drawn in the plane, inside the circle too, stays in front of it. */
  function bowl() {
    sc.surface('bowl', (u, s) => scale([sn(u) * cs(s), cs(u), sn(u) * sn(s)], 0.985), { u: [0, PI / 2], v: [0, TAU], nu: 24, nv: 96, colors: [P.stage, P.violet], range: [-0.7, 1.3], value: (u, s) => (1 + sn(u) * sn(s)) / 2, grid: { every: [4, 12], alpha: 0.2 } });
    tube('cayley', sample(120, (t) => cay(cs(TAU * t), sn(TAU * t))), P.ink, 1.6, 0.85, 0.3);
  }
  function drawJet(m, v) {
    const w = strong();
    bowl();
    lensFrame(true);
    if (m.key === 'jet:cayley') return drawCayley(m, v, w);
    return drawMachin(m, v, w);
  }
  function drawCayley(m, v, w) {
    // one step: the line from the pole (−1, 0) through (0, t), t = 1/2, meets the circle at the Cayley point (3/5, 4/5)
    tube('ray', [cay(-1, 0), cay(0.6, 0.8)], P.cyan, 1.8, 0.45 + 0.55 * w.exact, 0.35);
    sc.bead(cay(-1, 0), { color: P.ink, r: 4.4, key: 'pole' });
    sc.ring(cay(0, 0.5), { color: P.cyan, r: 6, alpha: w.exact, key: 'tHalf' });
    sc.bead(E0, { color: P.cyan, r: 6.2, alpha: 0.6 + 0.4 * w.exact, key: 'exact' });
    // the truncated points U_N, V_N for N = 2, 4, …: magenta, on one line through (3/5, 4/5); amber at the present N
    const shown = m.points.filter((J) => J.N <= m.N),
      zig = shown.map(truncPt);
    tube('zig', zig.length > 1 ? zig : [E0, E0], P.magenta, 1.4, 0.35 + 0.4 * w.flat, 0.3);
    shown.forEach((J, i) => J.N !== m.N && sc.bead(truncPt(J), { color: P.magenta, r: 4.2, alpha: 0.85, key: 'tr' + i }));
    const here = truncPt(jetOrder(m.N));
    // the lens: a magnification of the plane around (3/5, 4/5), ×4 for each step of the rail
    const Z = lensZoomC(v),
      toL = (X, Y) => [Z * (X - 0.6), Z * (Y - 0.8)];
    const a0 = Math.atan2(0.8, 0.6),
      span = 1.6 / Z;
    clipRuns(sample(80, (t) => toL(cs(a0 + span * (2 * t - 1)), sn(a0 + span * (2 * t - 1))))).forEach((run, i) => tube('lensArc' + i, run.map((p) => lensPt(...p)), P.ink, 1.5, 0.8, 0.3));
    // the truncated points lie on the line through the centre in the direction (−1, 2)
    const dir = [-1 / Math.sqrt(5), 2 / Math.sqrt(5)],
      tEnd = 0.97 / dir[1];
    tube('lensLine', [lensPt(-tEnd * dir[0], -tEnd * dir[1]), lensPt(tEnd * dir[0], tEnd * dir[1])], P.violet, 1.4, 0.8, 0.3);
    sc.bead(lensPt(0, 0), { color: P.cyan, r: 5.6, alpha: 0.6 + 0.4 * w.exact, key: 'lensExact' });
    const lensDots = [];
    m.points.forEach((J, i) => {
      const [u, vv] = toL(fval(J.U), fval(J.V));
      if (!inLens(u, vv, 0.94)) return;
      const now = J.N === m.N;
      lensDots.push({ N: J.N, at: lensPt(u, vv), uv: [u, vv], now });
      sc.bead(lensPt(u, vv), { color: now ? P.amber : P.magenta, r: now ? 6 : 4.2, alpha: now ? 1 : J.N < m.N ? 0.85 : 0.5, key: 'lens' + i });
    });
    tube('lensLink', [E0, lensBelow() ? lensPt(0.6, 1) : lensPt(-1, 0.25)], P.ink, 1, 0.3, 0.1);
    return { here, lensDots, Z };
  }
  function drawMachin(m, v, w) {
    const ang = (pt) => Math.atan2(fval(pt[1]), fval(pt[0]));
    const P1 = cayleyOf(CHAIN.s),
      P2 = cayleyOf(CHAIN.t2),
      P4 = cayleyOf(CHAIN.t4),
      PC = cayleyOf(CHAIN.corr);
    const angs = [0, ang(P1), ang(P2), ang(P4), PI / 2];
    const arcA = (a, b, r = LIFT) => sample(48, (t) => cay(cs(a + (b - a) * t), sn(a + (b - a) * t), r));
    tube('chain1', arcA(angs[0], angs[1]), P.cyan, 3, w.exact, 0.4);
    tube('chain2', arcA(angs[1], angs[2], LIFT + 0.006), P.cyan, 3, w.exact, 0.4);
    tube('chain3', arcA(angs[2], angs[3], LIFT + 0.012), P.cyan, 3, w.exact, 0.4);
    tube('chainC', arcA(angs[3], angs[4], LIFT + 0.03), P.magenta, 3, 0.6 + 0.4 * w.flat, 0.4);
    // the rays from the pole (−1, 0) through (0, t): the rational parametrization of each point
    [P1, P2].forEach((pt, i) => tube('ray' + i, [cay(-1, 0), cay(fval(pt[0]), fval(pt[1]))], P.cyan, 1, 0.3 * w.exact, 0.2));
    sc.bead(cay(1, 0), { color: P.ink, r: 4.4, key: 'zero' });
    sc.bead(cay(fval(P1[0]), fval(P1[1]), LIFT), { color: P.cyan, r: 5, key: 't1' });
    sc.bead(cay(fval(P2[0]), fval(P2[1]), LIFT), { color: P.cyan, r: 5, key: 't2' });
    sc.bead(cay(fval(P4[0]), fval(P4[1]), LIFT + 0.03), { color: P.cyan, r: 5, key: 't4' });
    sc.bead(cay(fval(PC[0]), fval(PC[1]), LIFT), { color: P.magenta, r: 3.6, key: 'c239' });
    sc.bead(cay(0, 1, LIFT), { color: P.cyan, r: 6.4, key: 'one' });
    sc.ring(cay(0, 1, LIFT), { color: P.cyan, r: 11, normal: [0, -1, 0], alpha: 0.8 * w.exact, key: 'oneRing' });
    // the lens: a number line around the centre of the finest bracket, one row per order M − 1, M, M + 1
    const Z = lensZoomM(v),
      toU = (x) => Z * (fval(x) - CENTER),
      rows = [
        [m.prev, 0.46, P.violet, 0.75],
        [bracket(m.M), 0, P.amber, 1],
        [m.next, -0.46, P.cyan, 0.95]
      ];
    const bars = [];
    rows.forEach(([b, y, color, alpha], i) => {
      if (!b) return;
      const lo = toU(b.L),
        hi = toU(b.U),
        a = clamp(lo, -0.97, 0.97),
        c = clamp(hi, -0.97, 0.97);
      tube('bar' + i, [lensPt(a, y), lensPt(Math.max(c, a + 0.004), y)], color, i === 1 ? 4 : 3, alpha, 0.45);
      for (const [end, side] of [
        [lo, a],
        [hi, c]
      ])
        if (abs(end) <= 0.97) tube(`tick${i}${end === lo ? 'l' : 'r'}`, [lensPt(side, y - 0.1), lensPt(side, y + 0.1)], color, 1.6, alpha, 0.3);
      bars.push({ M: b.M, y, lo, hi });
    });
    tube('lensAxis', [lensPt(-0.97, -0.8), lensPt(0.97, -0.8)], P.ink, 1, 0.45, 0.2);
    return { here: null, bars, Z, P1, P2, P4 };
  }

  function drawCone(m, v) {
    const w = strong(),
      lam = clamp(v, 0, 8) / 8,
      stokes = m.key === 'cone:stokes';
    // the faces, flat and lit, coloured by the sign of their integer: cyan > 0, magenta < 0, violet 0 (or not in play)
    const vals = stokes ? [null, m.circ[0], null, m.circ[1]] : m.faces,
      colour = (x) => (x == null || x === 0 ? P.violet : x > 0 ? P.cyan : P.magenta);
    sc.glass('ball', [0, 0, 0], 1.02, { color: P.violet, alpha: 0.1, rim: 0.6 });
    sc.poly('tetra', { vertices: TV, faces: FACES }, { colors: vals.map(colour), edges: false });
    const lift = (p) => scale(p, 1.012);
    const seg = (x, y, t0 = 0, t1 = 1) => [lift(lerp(TV[x], TV[y], t0)), lift(lerp(TV[x], TV[y], t1))];
    const drawn = {};
    if (stokes) {
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0]
      ].forEach(([x, y]) => tube(`bd${x}${y}`, seg(x, y), P.cyan, 2.8, w.exact, 0.4));
      tube('e02', seg(0, 2), P.ink, 1, 0.3, 0.1);
      // the shared edge 13, erased from 1 towards 3 as the rail runs: it is walked once each way
      if (lam < 0.999) tube('diag', seg(1, 3, lam, 1), P.violet, 3, 1 - 0.5 * lam, 0.45);
      drawn.here = lift(lerp(TV[1], TV[3], lam));
    } else {
      const b = m.base,
        opp = m.opp;
      // the edges opposite b carry e = H₂F; the spokes (b, x) carry 0 and are erased from b outwards
      [
        [opp[0], opp[1]],
        [opp[1], opp[2]],
        [opp[0], opp[2]]
      ].forEach(([x, y]) => tube(`op${x}${y}`, seg(x, y), m.defect === 0 ? P.cyan : P.magenta, 2.8, m.defect === 0 ? w.exact : 1, 0.4));
      opp.forEach((x) => lam < 0.999 && tube(`sp${x}`, seg(b, x, lam, 1), P.violet, 2.6, 1 - 0.45 * lam, 0.4));
      drawn.here = lift(TV[b]);
    }
    TV.forEach((p, i) => sc.bead(lift(p), { color: P.ink, r: 4.6, key: 'v' + i }));
    return drawn;
  }

  function drawShell(m, v) {
    const w = strong();
    if (m.key === 'shell:quad') return drawQuadrupole(m, v, w);
    const poly = EVEN[m.n];
    sc.surface('zonal', at3, { u: [0, PI], v: [0, TAU], nu: 60, nv: 64, colors: [P.magenta, P.violet, P.cyan], range: [-1, 1], value: (u) => Math.tanh(1.5 * pevalF(poly, cs(u) ** 2)), grid: { every: [6, 9], alpha: 0.14 } });
    const lat = (h) => Math.sqrt(Math.max(0, 1 - h * h));
    ROOTS[m.n].forEach((kn, i) =>
      [1, -1].forEach((sg) => {
        const h = sg * Math.sqrt(kn);
        loop(`node${i}${sg}`, [0, 0, h], UP, lat(h) * LIFT, P.ink, 1.8, 0.95);
      })
    );
    const kap = clamp(v, 0, 16) / 16;
    for (const sg of [1, -1]) {
      const h = sg * Math.sqrt(kap);
      if (lat(h) > 1e-3) loop('level' + sg, [0, 0, h], UP, lat(h) * (LIFT + 0.004), P.amber, 2.4, 1);
    }
    sc.bead(scale(UP, LIFT), { color: P.ink, r: 5, alpha: w.exact, key: 'pole' });
    return { here: shellPoint(v) };
  }
  function shellPoint(v) {
    const kap = clamp(v, 0, 16) / 16,
      h = Math.sqrt(kap),
      f = unit([cam.D[0] + 1e-6, cam.D[1], 0]);
    return scale(add(scale(UP, h), scale(f, Math.sqrt(Math.max(0, 1 - kap)))), LIFT);
  }
  const quadAt = (v) => {
    const h = clamp(v, 0, 2);
    return [0, 1, 2].map((i) => fval(D10[i]) - h * fval(X2Y2[i]));
  };
  function drawQuadrupole(m, v, w) {
    const Qf = quadAt(v),
      qn = (n) => Qf[0] * n[0] * n[0] + Qf[1] * n[1] * n[1] + Qf[2] * n[2] * n[2];
    sc.surface('quad', (u, s) => scale(at3(u, s), 1 + QALPHA * qn(at3(u, s))), { u: [0, PI], v: [0, TAU], nu: 48, nv: 64, colors: [P.magenta, P.violet, P.cyan], range: [-1.2, 1.2], value: (u, s) => qn(at3(u, s)) + 0.0001, grid: { every: [8, 9], alpha: 0.14 } });
    const tip = (i, sg) => {
      const n = [0, 0, 0];
      n[i] = sg;
      return scale(n, (1 + QALPHA * Qf[i]) * 1.02 + 0.22);
    };
    [0, 1, 2].forEach((i) => tube('axis' + i, [tip(i, -1), tip(i, 1)], P.ink, 1.1, 0.55, 0.2));
    return { here: [0, 0, (1 + QALPHA * Qf[2]) * 1.02], tip };
  }

  function schurWorld(x, y, s = state) {
    const a = S2(s.a),
      b = S2(s.b),
      c = S2(s.c),
      q = a * x * x + 2 * b * x * y + c * y * y;
    return [x * SXY, y * SXY, (q - schurScale.z0) * schurScale.s];
  }
  const S2 = (v) => v / 2;
  function setSchurScale() {
    let lo = Infinity,
      hi = -Infinity;
    const a = S2(state.a),
      b = S2(state.b),
      c = S2(state.c);
    for (let i = 0; i <= 16; i++)
      for (let j = 0; j <= 16; j++) {
        const x = -2 + i / 4,
          y = -2 + j / 4,
          q = a * x * x + 2 * b * x * y + c * y * y;
        lo = Math.min(lo, q);
        hi = Math.max(hi, q);
      }
    schurScale = { s: 1.5 / Math.max(1e-6, hi - lo), z0: (hi + lo) / 2 };
  }
  function drawQuad(m, v) {
    const w = strong();
    if (m.key === 'quad:sqrt2') return drawSqrt2(m, v, w);
    if (m.key === 'quad:phi') return drawPhi(m, v, w);
    setSchurScale();
    const a = S2(state.a),
      b = S2(state.b),
      c = S2(state.c),
      x = S2(state.x),
      ys = -(b / c) * x,
      yv = ys + (16 - clamp(v, 0, 24)) / 6;
    // the surface is cut open at the slice: solid where x ≤ x₀, a faint ghost beyond, so that the slice stands in front
    const xs = clamp(x, -2, 2),
      fx = (xs + 2) / 4,
      zOf = (u, s, x0, x1) => schurWorld(x0 + (x1 - x0) * u, -2 + 4 * s)[2];
    if (fx > 0.02) sc.surface('form', (u, s) => schurWorld(-2 + (xs + 2) * u, -2 + 4 * s), { u: [0, 1], v: [0, 1], nu: Math.max(4, Math.round(48 * fx)), nv: 48, colors: [P.violet, P.cyan], range: [-0.75, 0.75], value: (u, s) => zOf(u, s, -2, xs), grid: { every: [6, 6], alpha: 0.16 } });
    if (fx < 0.98) sc.surface('ghost', (u, s) => schurWorld(xs + (2 - xs) * u, -2 + 4 * s), { u: [0, 1], v: [0, 1], nu: Math.max(4, Math.round(48 * (1 - fx))), nv: 48, colors: [P.violet, P.cyan], range: [-0.75, 0.75], value: (u, s) => zOf(u, s, xs, 2), alpha: 0.16, pick: false, occlude: false });
    // the valley: y = −(b/c)x, where every slice x = const reaches its lowest point
    const vx = sample(60, (t) => -2 + 4 * t).filter((xx) => abs(-(b / c) * xx) <= 2);
    if (vx.length > 1) tube('valley', vx.map((xx) => add(schurWorld(xx, -(b / c) * xx), [0, 0, 0.012])), P.cyan, 2.6, w.exact, 0.4);
    // the slice at the chosen x
    tube('slice', sample(60, (t) => add(schurWorld(x, -2 + 4 * t), [0, 0, 0.01])), P.ink, 1.8, 0.9, 0.3);
    const yc = clamp(yv, -2.6, 2.6),
      here = add(schurWorld(x, yc), [0, 0, 0.012]),
      floorPt = [x * SXY, yc * SXY, (S2(state.a) - (b * b) / c) * x * x * schurScale.s - schurScale.z0 * schurScale.s];
    // the curtain between the floor (a − b²/c)x² and the slice: its height at y is the square c(y − y*)²
    const zf = floorPt[2],
      yq = (s) => -2 + 4 * s;
    sc.surface('curtain', (u, s) => [x * SXY, yq(s) * SXY, zf + u * (schurWorld(x, yq(s))[2] - zf)], { u: [0, 1], v: [0, 1], nu: 2, nv: 48, color: P.magenta, alpha: 0.22, pick: false, occlude: false });
    tube('floor', [[x * SXY, -2 * SXY, zf], [x * SXY, 2 * SXY, zf]], P.cyan, 1.2, 0.6, 0.2);
    if (abs(yc - ys) > 1e-6) tube('square', [floorPt, here], P.magenta, 2.6, 0.7 + 0.3 * w.flat, 0.45);
    sc.bead(add(schurWorld(x, ys), [0, 0, 0.012]), { color: P.cyan, r: 6, key: 'min' });
    sc.ring(add(schurWorld(x, ys), [0, 0, 0.014]), { color: P.cyan, r: 11, normal: UP, alpha: 0.8 * w.exact, key: 'minRing' });
    return { here, floorPt, minPt: schurWorld(x, ys), ys, yv: yc, x };
  }
  function drawSqrt2(m, v, w) {
    bowl();
    const t = clamp(v, 0, 8),
      at = (deg, r = 1) => cay(cs((deg * PI) / 180), sn((deg * PI) / 180), r);
    tube('axes', [cay(-1.12, 0), cay(1.12, 0)], P.ink, 1, 0.4, 0.15);
    tube('axesI', [cay(0, -1.12), cay(0, 1.12)], P.ink, 1, 0.4, 0.15);
    range(8).forEach((k) => sc.bead(at(45 * k), { color: P.cyan, r: k % 2 ? 4.2 : 5.2, alpha: 0.55 + 0.45 * w.exact, key: 's' + k }));
    if (t > 0.01) tube('trace', sample(Math.max(2, Math.round(t * 12)), (s) => at(45 * t * s, LIFT)), P.cyan, 3, w.exact, 0.45);
    tube('spoke', [[0, 0, 0], at(45 * t)], P.cyan, 1.6, 0.4 + 0.6 * w.exact, 0.3);
    return { here: at(45 * t, LIFT), eq: at };
  }
  function drawPhi(m, v, w) {
    bowl();
    const t = clamp(v, 0, 12),
      at = (deg, r = 1) => cay(cs((deg * PI) / 180), sn((deg * PI) / 180), r);
    range(10).forEach((k) => sc.bead(at(36 * k), { color: P.cyan, r: k % 5 ? 4.2 : 5.2, alpha: 0.55 + 0.45 * w.exact, key: 'd' + k }));
    tube('axisX', [cay(-1.16, 0), cay(1.16, 0)], P.ink, 1.3, 0.7, 0.2);
    if (t > 0.01) tube('trace', sample(Math.max(2, Math.round(t * 10)), (s) => at(36 * t * s, LIFT)), P.cyan, 2.4, 0.7 * w.exact, 0.4);
    const here = at(36 * t, LIFT),
      shadow = cay(cs((36 * t * PI) / 180), 0);
    tube('drop', [here, shadow], P.cyan, 2, w.exact, 0.4);
    sc.bead(shadow, { color: P.cyan, r: 4.6, key: 'shadow' });
    return { here, shadow, eq: at };
  }

  /* ---------- labels on the stage ---------- */
  function tags(m, v, drawn) {
    if (TRV.thumbMode) return;
    const N = (key, p, html, cls) => sc.tag(key, p, html, 'raw backed ' + cls);
    const out = (p, d = 0.16) => scale(unit(p), norm(p) + d);
    switch (m.key) {
      case 'jet:cayley': {
        N('E', cay(0.3, 0.64), '(3/5, 4/5)', 'c-cy');
        N('t', cay(-0.2, 0.36), 't = η = 1/2', 'c-cy');
        N('pole', cay(-1.18, -0.14), '(−1, 0)', 'c-ik');
        N('n2', add(truncPt(jetOrder(2)), [-0.16, 0, 0.1]), 'N = 2', 'c-mg');
        N('lens', lensBelow() ? lensPt(-0.55, -1.14) : lensPt(0, 1.16), L(`放大镜 ×${fix(drawn.Z / ZC0, 0)}`, `lens ×${fix(drawn.Z / ZC0, 0)}`), 'c-ik');
        const away = (d, k) => {
          const r = Math.hypot(...d.uv) || 1;
          return lensPt(d.uv[0] + (k * d.uv[0]) / r + 0.1, d.uv[1] + (k * d.uv[1]) / r);
        };
        const cur = drawn.lensDots.find((d) => d.now);
        if (cur) N('cur', away(cur, 0.2), `N = ${m.N}`, 'c-am');
        const nxt = drawn.lensDots.find((d) => d.N === m.N + 1);
        if (nxt) N('nxt', lensPt(nxt.uv[0] - 0.34, nxt.uv[1] + 0.12), `N = ${m.N + 1}`, 'c-mg');
        if (state.lens) N('cl', cay(0.05, -0.46), L('经典：cos(2 arctan ½)', 'classical: cos(2 arctan ½)'), 'c-mg');
        break;
      }
      case 'jet:machin': {
        const at = (pt, d) => out(cay(fval(pt[0]), fval(pt[1])), d);
        N('t1', at(drawn.P1, 0.16), '1/5', 'c-cy');
        N('t2', at(drawn.P2, 0.16), '5/12', 'c-cy');
        N('t4', add(cay(-0.08, 1.2), [0, 0, 0]), '120/119', 'c-cy');
        N('one', cay(0.36, 1.2), state.lens ? 'π/2' : '1 = 28561/28561', state.lens ? 'c-mg' : 'c-cy');
        N('zero', cay(1.22, -0.08), '0', 'c-ik');
        N('lens', lensBelow() ? lensPt(-0.3, -1.14) : lensPt(0, 1.17), L(`数轴放大镜 ×${(drawn.Z).toExponential(1).replace('e+', '·10^')}`, `number-line lens ×${(drawn.Z).toExponential(1).replace('e+', '·10^')}`).replace(/\^(\d+)/, (_, d) => sup1(d)), 'c-ik');
        for (const b of drawn.bars) N('bar' + b.M, lensPt(clamp((b.lo + b.hi) / 2, -0.7, 0.7), b.y + 0.2), `M = ${b.M}`, b.M === m.M ? 'c-am' : b.M > m.M ? 'c-cy' : 'c-vi');
        break;
      }
      case 'cone:stokes':
      case 'cone:cone': {
        const stokes = m.key === 'cone:stokes',
          lam = clamp(v, 0, 8) / 8;
        TV.forEach((p, i) => N('v' + i, out(p, 0.16), String(i), i === m.base && !stokes ? 'c-am' : 'c-ik'));
        const mid = (x, y) => out(lerp(TV[x], TV[y], 0.5), 0.14),
          onFace = (f) => scale(faceCentre(f), 1.25);
        if (stokes) {
          [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0]
          ].forEach(([x, y]) => N(`e${x}${y}`, mid(x, y), `Φ${x}${y} = ${mstr(m.e1(x, y))}`, 'c-cy'));
          if (lam < 0.5) N('e13', mid(1, 3), `Φ13 = ${mstr(m.e1(1, 3))}`, 'c-vi');
          if (lam < 0.999) {
            N('c1', onFace([0, 1, 3]), `Δ₁ = ${mstr(m.circ[0])}`, m.circ[0] >= 0 ? 'c-cy' : 'c-mg');
            N('c2', onFace([1, 2, 3]), `Δ₂ = ${mstr(m.circ[1])}`, m.circ[1] >= 0 ? 'c-cy' : 'c-mg');
          } else N('sum', scale(lerp(TV[1], TV[3], 0.5), 1.05), `∂Σ = ${mstr(m.boundary)}`, 'c-cy');
        } else {
          const b = m.base,
            opp = m.opp;
          [
            [opp[0], opp[1]],
            [opp[1], opp[2]],
            [opp[0], opp[2]]
          ].forEach(([x, y]) => N(`e${x}${y}`, mid(x, y), `e${x}${y} = ${mstr(m.e(x, y))}`, 'c-cy'));
          if (lam < 0.5) opp.forEach((x) => N(`sp${x}`, mid(b, x), `e${Math.min(b, x)}${Math.max(b, x)} = 0`, 'c-vi'));
          FACES.forEach((f, i) => {
            if (f.includes(b)) N('f' + i, onFace(f), `F${f.join('')} = ${mstr(m.faces[i])}`, m.faces[i] > 0 ? 'c-cy' : m.faces[i] < 0 ? 'c-mg' : 'c-vi');
          });
          const of = FACES.findIndex((f) => !f.includes(b));
          // seen from the apex, the opposite face is the back of the picture: its label goes under the tetrahedron
          N('fo', scale(cam.U, -1.08), lam >= 0.999 ? `${opp.join('')}: δ₁e = ${mstr(m.coneFace)} · F = ${mstr(m.oppF)}` : `F${opp.join('')} = ${mstr(m.faces[of])}`, m.defect === 0 ? 'c-cy' : 'c-mg');
          if (m.defect !== 0) N('def', scale(cam.U, -1.36), `δ₂F = ${mstr(m.defect)}`, 'c-mg');
        }
        break;
      }
      case 'shell:shell': {
        const kap = clamp(v, 0, 16) / 16,
          h = Math.sqrt(kap),
          f = unit([cam.R[0], cam.R[1], 0]);
        N('lev', add(scale(UP, h), scale(f, Math.sqrt(Math.max(0, 1 - kap)) * 1.2)), `κ = ${fstr(m.kappa)}`, 'c-am');
        N('pole', scale(UP, 1.18), `κ = 1 · E${sub1(m.n)} = ${fstr(m.dim)}`, 'c-ik');
        ROOTS[m.n].forEach((kn, i) => N('n' + i, add(scale(UP, Math.sqrt(kn)), scale(f, -Math.sqrt(1 - kn) * 1.22)), `E${sub1(m.n)} = 0`, 'c-ik'));
        break;
      }
      case 'shell:quad': {
        const names = ['x', 'y', 'z'];
        // each label at the end of its axis that faces the reader
        [0, 1, 2].forEach((i) => N('q' + i, drawn.tip(i, i === 2 ? 1 : cam.D[i] >= 0 ? 1 : -1), `Q<sub>${names[i]}${names[i]}</sub> = ${fstr(m.Q[i])}`, cmp(m.Q[i], ZERO) > 0 ? 'c-cy' : cmp(m.Q[i], ZERO) < 0 ? 'c-mg' : 'c-ik'));
        N('cfg', drawn.tip(2, -1), ['d¹⁰', 'd⁹', 'd⁸'][m.holes], 'c-am');
        break;
      }
      case 'quad:schur': {
        N('min', add(drawn.minPt, [0, 0, -0.17]), `y* = ${fstr(m.ystar)}`, 'c-cy');
        N('cur', add(drawn.here, [0, 0, 0.17]), `q = ${fstr(m.q)}`, 'c-am');
        if (!m.atMin) N('sq', lerp(drawn.floorPt, drawn.here, 0.5), `c(y − y*)² = ${fstr(m.sq)}`, 'c-mg');
        N('floor', add(drawn.minPt, [0.28, 0.28, -0.05]), `(a − b²/c)x² = ${fstr(m.floor)}`, 'c-cy');
        break;
      }
      case 'quad:sqrt2': {
        [0, 2, 4, 6].forEach((k) => N('s' + k, drawn.eq(45 * k, 1.22), spinStr(SPIN[k]), 'c-cy'));
        N('s1', drawn.eq(45, 1.3), spinStr(SPIN[1]), 'c-cy');
        N('cur', scale(drawn.here, 0.62), `u₉₀${sup1(m.k)}`, 'c-am');
        break;
      }
      default: {
        N('d0', drawn.eq(0, 1.26), '1', 'c-cy');
        N('d5', drawn.eq(180, 1.26), '−1', 'c-cy');
        N('d1', drawn.eq(36, 1.22), 'φ/2', 'c-cy');
        N('cur', add(drawn.shadow, [0, 0, -0.16]), `T${sub1(m.n)}(φ/2) = ${phstr(m.T)}`, 'c-am');
        break;
      }
    }
  }
  // labels keep near their anchors and stay off the title, the buttons, the legend, the handle and each other
  function fitLabels() {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), $('stageAct'), handle].filter((el) => !el.hidden && el.getClientRects().length).map((el) => el.getBoundingClientRect());
    // a still has no handle button but an amber ring at the present point: keep the labels off it too
    if (TRV.still && lastDrawn && lastDrawn.here) {
      const q = sc.p(lastDrawn.here),
        c = $('cv').getBoundingClientRect(),
        x = c.left + q[0],
        y = c.top + q[1];
      occupied.push({ left: x - 15, right: x + 15, top: y - 15, bottom: y + 15 });
    }
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
  let lastDrawn = null;
  function drawStage(m) {
    cam = basis(sc.cam.yaw, sc.cam.pitch);
    if (m.key === 'quad:schur') setSchurScale();
    LC = stage.clientWidth && stage.clientWidth / Math.max(1, stage.clientHeight) < 0.95 ? LENS_BELOW : LENS_SIDE;
    fit(m);
    const v = state.at[railKey()];
    sc.begin();
    const drawn = { jet: drawJet, cone: drawCone, shell: drawShell, quad: drawQuad }[state.scene](m, v);
    lastDrawn = drawn;
    const here = drawn.here;
    if (here) {
      sc.bead(here, { color: P.amber, r: 6.6, key: 'current' });
      // a still has no handle button: an amber ring round the point takes its place
      if (TRV.still) sc.ring(add(here, scale(cam.D, 0.12)), { color: P.amber, r: 11, normal: cam.D, key: 'halo' });
    }
    tags(m, v, drawn);
    sc.end();
    handle.hidden = TRV.still || !here;
    if (here) {
      const q = sc.p(here);
      handle.style.left = q[0] + 'px';
      handle.style.top = q[1] + 'px';
    }
    fitLabels();
  }

  /* ---------- the title, the legend and the stage button ---------- */
  const kept = (html) =>
    html
      .replace(/(?:&lt;|&gt;|[=≈≥≤<>]) [−+]?\d[\d./]*/g, '<span class="nb">$&</span>')
      .replace(/[‖⊕⊖]/g, '<span class="nm">$&</span>');
  function bigline(m) {
    switch (m.key) {
      case 'jet:cayley':
        return state.lens
          ? L(`经典 · cos(2 arctan ½) 需无穷级数 · N = ${m.N} 误差 ≈ ${fval(m.eu).toExponential(2)}`, `Classical · cos(2 arctan ½) needs a series · N = ${m.N}, error ≈ ${fval(m.eu).toExponential(2)}`)
          : L(`凯莱—三角统一 · N = ${m.N} · U<sub>N</sub>(1/2) − 3/5 = ${fstr(m.eu)}`, `Cayley–trig unification · N = ${m.N} · U<sub>N</sub>(1/2) − 3/5 = ${fstr(m.eu)}`);
      case 'jet:machin':
        return state.lens
          ? L(`经典 · 4 arctan(1/5) − arctan(1/239) = π/4 · M = ${m.M}`, `Classical · 4 arctan(1/5) − arctan(1/239) = π/4 · M = ${m.M}`)
          : L(`马青链 · 1/5 ⊕ … ⊖ 1/239 = 28561/28561 = 1 · W<sub>${m.M}</sub> &lt; 10${sup1(-m.below)}`, `Machin chain · 1/5 ⊕ … ⊖ 1/239 = 28561/28561 = 1 · W<sub>${m.M}</sub> &lt; 10${sup1(-m.below)}`);
      case 'cone:stokes':
        return state.lens ? L('经典斯托克斯 · 网格加密 h → 0', 'Classical Stokes · refine the mesh, h → 0') : L(`加法粗网格斯托克斯 · Δ₁ + Δ₂ = ∂Σ = ${mstr(m.boundary)}`, `Additive coarse-mesh Stokes · Δ₁ + Δ₂ = ∂Σ = ${mstr(m.boundary)}`);
      case 'cone:cone':
        return state.lens ? L('经典庞加莱引理 · 可缩区域上的积分', 'Classical Poincaré lemma · integrals over a contractible region') : L(`顶点锥 · b = ${m.base} · δ₂F = ${mstr(m.defect)}${m.defect === 0 ? ' · e = H₂F 是原势' : ' · 无原势'}`, `Vertex cone · b = ${m.base} · δ₂F = ${mstr(m.defect)}${m.defect === 0 ? ' · e = H₂F is a primitive' : ' · no primitive'}`);
      case 'shell:shell':
        return state.lens
          ? L(`经典 · U${sub1(2 * m.n)}(cos θ) = sin(${2 * m.n + 1}θ)/sin θ · θ ≈ ${fix((Math.acos(Math.sqrt(fval(m.kappa))) * 180) / PI, 2)}°`, `Classical · U${sub1(2 * m.n)}(cos θ) = sin(${2 * m.n + 1}θ)/sin θ · θ ≈ ${fix((Math.acos(Math.sqrt(fval(m.kappa))) * 180) / PI, 2)}°`)
          : L(`自旋壳 j = ${m.n} · E${sub1(m.n)}(${fstr(m.kappa)}) = ${fstr(m.En)}`, `Spin shell j = ${m.n} · E${sub1(m.n)}(${fstr(m.kappa)}) = ${fstr(m.En)}`);
      case 'shell:quad':
        return L(`四极 · ${['d¹⁰', 'd⁹', 'd⁸'][m.holes]} · Q = diag(${m.Q.map(fstr).join(', ')})`, `Quadrupole · ${['d¹⁰', 'd⁹', 'd⁸'][m.holes]} · Q = diag(${m.Q.map(fstr).join(', ')})`);
      case 'quad:schur':
        return state.lens
          ? L(`经典 · 令 ∂q/∂y = 0 · y* ≈ ${fix(fval(m.ystar), 4)}`, `Classical · set ∂q/∂y = 0 · y* ≈ ${fix(fval(m.ystar), 4)}`)
          : L(`舒尔补 · 最小值 (a − b²/c)x² = ${fstr(m.floor)} · y* = ${fstr(m.ystar)}`, `Schur complement · minimum (a − b²/c)x² = ${fstr(m.floor)} · y* = ${fstr(m.ystar)}`);
      case 'quad:sqrt2':
        return state.lens ? L(`经典 · e<sup>iπk/4</sup>，√2 ≈ 1.41421 · k = ${m.k}`, `Classical · e<sup>iπk/4</sup>, √2 ≈ 1.41421 · k = ${m.k}`) : L(`ℚ(√2) 旋量 · u₉₀${sup1(m.k)} = ${spinStr(m.power)}`, `ℚ(√2) spinor · u₉₀${sup1(m.k)} = ${spinStr(m.power)}`);
      default:
        return state.lens
          ? L(`经典 · φ = (1 + √5)/2 ≈ 1.618034 · cos(36°·${m.n}) ≈ ${fix(cs((36 * m.n * PI) / 180), 4)}`, `Classical · φ = (1 + √5)/2 ≈ 1.618034 · cos(36°·${m.n}) ≈ ${fix(cs((36 * m.n * PI) / 180), 4)}`)
          : L(`ℚ(φ) · φ${sup1(m.n)} = ${phstr(m.power)} · N = ${fstr(m.norm)}`, `ℚ(φ) · φ${sup1(m.n)} = ${phstr(m.power)} · N = ${fstr(m.norm)}`);
    }
  }
  function subline(m) {
    switch (m.key) {
      case 'jet:cayley':
        return L('青线一步落在 (3/5, 4/5)；品红截断点逐阶逼近，偶数阶排在一条直线上；放大镜每阶放大 2 倍。', 'The cyan line lands on (3/5, 4/5) in one step; the magenta truncations close in order by order, the even ones on one line; the lens zooms ×2 per order.');
      case 'jet:machin':
        return L('青弧是有理切线链；数轴放大镜里琥珀是 [L<sub>M</sub>, U<sub>M</sub>]，青是下一阶，紫是上一阶。', 'Cyan arcs: the rational tangent chain; in the lens amber is [L<sub>M</sub>, U<sub>M</sub>], cyan the next order, violet the previous.');
      case 'cone:stokes':
        return L('两块面元各走一次紫色内边 13、方向相反；擦去它，外边界环流不变。', 'Each plaquette walks the violet edge 13 once, in opposite directions; erase it and the boundary circulation stays.');
      case 'cone:cone':
        return L('琥珀锥顶 b：对边记 e = F(b, x, y)，紫色辐边记 0；擦去辐边，锥盖通量与对面的 F 只差 δ₂F。', 'Amber apex b: the opposite edges carry e = F(b, x, y), the violet spokes 0; erase them and the cap differs from F opposite by δ₂F.');
      case 'shell:shell':
        return L(`颜色是 E${sub1(m.n)}(κ)（青正、品红负），κ = 高度²；墨圈是节点壳，琥珀圈是当前 κ。`, `Colour E${sub1(m.n)}(κ) (cyan +, magenta −), κ = height²; ink circles are nodal shells, amber is the present κ.`);
      case 'shell:quad':
        return L('r = 1 + α·nᵀQn：d¹⁰ 是圆球；抽空 d<sub>x²−y²</sub> 后沿 z 拉长（青）、在 xy 面收缩（品红）。', 'r = 1 + α·nᵀQn: d¹⁰ is a round ball; emptying d<sub>x²−y²</sub> stretches it along z (cyan) and shrinks the xy plane (magenta).');
      case 'quad:schur':
        return L('墨色切片固定 x，青色谷线连起各切片的最低点；品红竖线是 c(y − y*)² ≥ 0。', 'The ink slice fixes x; the cyan valley joins the lowest points of the slices; the magenta stem is c(y − y*)² ≥ 0.');
      case 'quad:sqrt2':
        return L('u₉₀ = (δ/2)(1 + i)，δ² = 2：每乘一次转八分之一圈，第 4 次到 −1，第 8 次回到 1。', 'u₉₀ = (δ/2)(1 + i), δ² = 2: each factor turns an eighth of the circle; the 4th power is −1, the 8th is 1.');
      default:
        return L('十边形第 n 个顶点；青色竖线的影子 T<sub>n</sub>(φ/2) ∈ ℚ(φ)：第 5 个是 −1，第 10 个回到 1。', 'Vertex n of the decagon; the cyan stem drops it to T<sub>n</sub>(φ/2) ∈ ℚ(φ): the 5th is −1, the 10th is 1 again.');
    }
  }
  function legendItems(m) {
    switch (m.key) {
      case 'jet:cayley':
        return [
          ['ik', L('凯莱圆', 'Cayley circle')],
          ['cy', L('(3/5, 4/5) · 一步', '(3/5, 4/5) · one step')],
          ['mg', L('N 阶截断', 'order-N truncation')],
          ['am', 'N']
        ];
      case 'jet:machin':
        return [
          ['cy', L('有理切线链', 'rational tangent chain')],
          ['mg', '⊖ 1/239'],
          ['am', '[L<sub>M</sub>, U<sub>M</sub>]'],
          ['vi', 'M − 1']
        ];
      case 'cone:stokes':
        return [
          ['cy', L('外边界', 'boundary')],
          ['vi', L('共享内边 13', 'shared edge 13')],
          ['cy box', L('面元 > 0', 'plaquette > 0')],
          ['mg box', L('面元 < 0', 'plaquette < 0')]
        ];
      case 'cone:cone':
        return [
          ['cy', 'e = H₂F'],
          ['vi', L('辐边', 'spokes')],
          ['mg', 'δ₂F ≠ 0'],
          ['am', 'b']
        ];
      case 'shell:shell':
        return [
          ['cy box', 'E<sub>n</sub> > 0'],
          ['mg box', 'E<sub>n</sub> < 0'],
          ['ik', L('节点壳', 'nodal shells')],
          ['am', 'κ']
        ];
      case 'shell:quad':
        return [
          ['cy box', 'nᵀQn > 0'],
          ['mg box', 'nᵀQn < 0'],
          ['ik', L('坐标轴', 'axes')],
          ['am', L('空穴', 'holes')]
        ];
      case 'quad:schur':
        return [
          ['vi box', 'ax² + 2bxy + cy²'],
          ['cy', L('谷线 · 最小点', 'valley · minimum')],
          ['mg', 'c(y − y*)²'],
          ['am', 'y']
        ];
      case 'quad:sqrt2':
        return [
          ['cy', L('u₉₀ 的幂', 'powers of u₉₀')],
          ['ik', L('单位圆', 'unit circle')],
          ['am', 'k']
        ];
      default:
        return [
          ['cy', L('十边形 · 影子', 'decagon · shadow')],
          ['ik', L('轴', 'axis')],
          ['am', 'n']
        ];
    }
  }
  const ACTS = {
    jet: () => (state.jmode === 'cayley' ? ['马青包络 ▸', 'Machin bracket ▸'] : ['凯莱截断 ▸', 'Cayley truncation ▸']),
    cone: () => (state.cmode === 'cone' ? ['双面元 ▸', 'Two plaquettes ▸'] : ['顶点锥 ▸', 'Vertex cone ▸']),
    shell: () => (state.smode === 'shell' ? ['d¹⁰ → d⁸ ▸', 'd¹⁰ → d⁸ ▸'] : ['自旋壳 ▸', 'Spin shells ▸']),
    quad: () => (state.qmode === 'schur' ? ['ℚ(√2) ▸', 'ℚ(√2) ▸'] : state.qmode === 'sqrt2' ? ['ℚ(φ) ▸', 'ℚ(φ) ▸'] : ['舒尔补 ▸', 'Schur ▸'])
  };
  function hud(m) {
    $('hudBig').innerHTML = kept(bigline(m));
    $('hudSub').innerHTML = kept(subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
    const b = $('stageAct'),
      text = L(...ACTS[state.scene]());
    b.hidden = TRV.still;
    if (b.textContent !== text) b.textContent = text;
  }

  /* ---------- the ledger ---------- */
  const put = (id, html) => {
    const el = $(id);
    if (el.innerHTML !== html) el.innerHTML = html;
  };
  const yes = '<span class="nummark">✓</span>';
  const mark = (ok) => (ok ? yes : '✗');
  const list = (xs, n = 7) => (xs.length > n ? xs.slice(0, n).map(fstr).join(', ') + ', …' : xs.map(fstr).join(', '));
  function rows(m) {
    switch (m.key) {
      case 'jet:cayley':
        return {
          key: [L('U<sub>N</sub>(1/2) − 3/5 · V<sub>N</sub>(1/2) − 4/5', 'U<sub>N</sub>(1/2) − 3/5 · V<sub>N</sub>(1/2) − 4/5'), `${fstr(m.eu)} · ${fstr(m.ev)}`, ''],
          r: [
            [L(`Cos<sub>N</sub>(2Atan<sub>N</sub>(η)) mod η${sup1(m.N + 1)}`, `Cos<sub>N</sub>(2Atan<sub>N</sub>(η)) mod η${sup1(m.N + 1)}`), `(${list(m.F)}) = (1 − η²)/(1 + η²) ${mark(m.unified)}`],
            [L('Cos·Cos + Sin·Sin（同阶截断）', 'Cos·Cos + Sin·Sin (same order)'), `(1, 0, …, 0) ${mark(m.pyth)}`],
            [L('U<sub>N</sub>(1/2) · V<sub>N</sub>(1/2)', 'U<sub>N</sub>(1/2) · V<sub>N</sub>(1/2)'), `${fstr(m.U)} · ${fstr(m.V)}`],
            [L('凯莱一步：t = 1/2 ↦ ((1 − t²)/(1 + t²), 2t/(1 + t²))', 'Cayley in one step: t = 1/2 ↦ ((1 − t²)/(1 + t²), 2t/(1 + t²))'), `(3/5, 4/5) · 9/25 + 16/25 = 1 ${yes}`],
            [L('误差比 e<sub>N</sub>/e<sub>N−2</sub>（两个坐标）', 'Error ratio e<sub>N</sub>/e<sub>N−2</sub> (both coordinates)'), m.ratioU ? `${fstr(m.ratioU)} · ${fstr(m.ratioV)} ${mark(same(m.ratioU, frac(-1, 4)) && same(m.ratioV, frac(-1, 4)))}` : '—'],
            [L('不先约化、直接嵌套求值的误差', 'Error of the nested evaluation without reducing'), `≈ ${fval(m.nu).toExponential(4)} · ${fval(m.nv).toExponential(4)}`]
          ],
          note: L(`J<sub>N</sub>(ℚ) 里先约化：Cos<sub>N</sub>(2Atan<sub>N</sub>) 与凯莱分数的前 ${m.N + 1} 个系数相同，凯莱方程在 k &lt; ${m.N} 上${m.ode ? '成立' : '不成立'}；在 η = 1/2 求值只是这条级数的截断。`, `Reduce in J<sub>N</sub>(ℚ) first: Cos<sub>N</sub>(2Atan<sub>N</sub>) shares its first ${m.N + 1} coefficients with the Cayley fraction, and the Cayley equations ${m.ode ? 'hold' : 'fail'} for k &lt; ${m.N}; evaluating at η = 1/2 is only a truncation of this series.`)
        };
      case 'jet:machin': {
        const [lo, hi] = [outward(m.L, 10)[0], outward(m.U, 10)[1]],
          ord = BigInt(2 * m.M + 1);
        return {
          key: [L(`包络宽度 W<sub>${m.M}</sub> = U<sub>${m.M}</sub> − L<sub>${m.M}</sub>`, `Bracket width W<sub>${m.M}</sub> = U<sub>${m.M}</sub> − L<sub>${m.M}</sub>`), `&lt; 10${sup1(-m.below)}`, m.M <= 1 ? ` = ${fstr(m.W)}` : L('（整数比较）', ' (decided in integers)')],
          r: [
            [L('(1, 5)² · (5, 12)² · (120, 119)·(−1, 239)', '(1, 5)² · (5, 12)² · (120, 119)·(−1, 239)'), `(${CHAIN.d1.map(mstr).join(', ')}) · (${CHAIN.d2.map(mstr).join(', ')}) · (${CHAIN.last.map(mstr).join(', ')})`],
            [L('约化的切线 t₁ → t₂ → t₄ → t₄ ⊖ 1/239', 'Reduced tangents t₁ → t₂ → t₄ → t₄ ⊖ 1/239'), `1/5 → 5/12 → 120/119 → ${fstr(CHAIN.value)} ${mark(same(CHAIN.value, ONE))}`],
            [L(`[L<sub>${m.M}</sub>, U<sub>${m.M}</sub>] ⊂（向外取整的十位小数）`, `[L<sub>${m.M}</sub>, U<sub>${m.M}</sub>] ⊂ (ten decimals rounded outwards)`), `[${lo}, ${hi}]`],
            [L(`W<sub>${m.M}</sub> = 16/(5${sup1(String(ord))}·${ord}) + 4/(239${sup1(String(ord))}·${ord})`, `W<sub>${m.M}</sub> = 16/(5${sup1(String(ord))}·${ord}) + 4/(239${sup1(String(ord))}·${ord})`), `${fshort(m.W)} ${mark(m.closedOk)}`],
            [m.M > 1 ? `L<sub>${m.M - 1}</sub> &lt; L<sub>${m.M}</sub> &lt; U<sub>${m.M}</sub> &lt; U<sub>${m.M - 1}</sub>` : `L<sub>1</sub> &lt; U<sub>1</sub>`, `${mark(m.nested)}`],
            [L('经典：4 arctan(1/5) − arctan(1/239) = π/4', 'Classical: 4 arctan(1/5) − arctan(1/239) = π/4'), `π ≈ ${fix(PI, 12)} ∈ [L<sub>${m.M}</sub>, U<sub>${m.M}</sub>]`]
          ],
          note: L('链与包络都只用整数的加、乘与比较；L<sub>M</sub>、U<sub>M</sub> 取 A<sub>M</sub>、A<sub>M+1</sub> 两个部分和中的较小与较大者，无需先假设 π 存在。', 'Chain and brackets use only additions, products and comparisons of integers; L<sub>M</sub>, U<sub>M</sub> take the smaller and larger of the partial sums A<sub>M</sub>, A<sub>M+1</sub>, and π need not be assumed first.')
        };
      }
      case 'cone:stokes': {
        const ed = EDGES.map(([x, y]) => mstr(m.e1(x, y))).join(', ');
        return {
          key: [L('Δ₁ + Δ₂ = 外边界 0 → 1 → 2 → 3 → 0', 'Δ₁ + Δ₂ = boundary 0 → 1 → 2 → 3 → 0'), `${mstr(m.circ[0])} + ${mstr(m.circ[1])} = ${mstr(m.boundary)}`, ` ${mark(m.circ[0] + m.circ[1] === m.boundary)}`],
          r: [
            [L('Φ + δ₀f 于 01, 02, 03, 12, 13, 23', 'Φ + δ₀f on 01, 02, 03, 12, 13, 23'), ed],
            [L('Δ₁ = Φ01 + Φ13 + Φ30 · Δ₂ = Φ12 + Φ23 + Φ31', 'Δ₁ = Φ01 + Φ13 + Φ30 · Δ₂ = Φ12 + Φ23 + Φ31'), `${mstr(m.circ[0])} · ${mstr(m.circ[1])}`],
            [L('内边：Φ13 + Φ31', 'Interior edge: Φ13 + Φ31'), `${mstr(m.e1(1, 3))} + ${mstr(m.e1(3, 1))} = 0 ${yes}`],
            [L('δ₁(δ₀f) 在 64 个有序三元组上', 'δ₁(δ₀f) on the 64 ordered triples'), `${L('全为 0', 'all 0')} (${m.d1d0}/64) ${mark(m.d1d0 === 64)}`],
            [L('沿 0→1 锚定：W₁·W̃₂ = Hol(∂Σ)', 'Whisker 0→1: W₁·W̃₂ = Hol(∂Σ)'), `${q4str(HEAP.prod)} ${mark(HEAP.ok)}`],
            [L('乘序颠倒：W̃₂·W₁', 'Reversed order: W̃₂·W₁'), `${q4str(HEAP.rev)} ≠`],
            [L('改沿 0→3→1 锚定', 'Whisker changed to 0→3→1'), `${q4str(HEAP.alt)} ≠`]
          ],
          note: L('舞台演示整数环流相加。四元数读数是手算例的复算，沿当前边界前缀 0→1 锚定第二面，再把新因子乘在右侧。', 'The stage adds integer circulations. The quaternion readouts recompute the worked example. Whisker the second face along the current boundary prefix 0→1 and multiply the new factor on the right.')
        };
      }
      case 'cone:cone': {
        const o = m.opp,
          eo = [
            [o[0], o[1]],
            [o[0], o[2]],
            [o[1], o[2]]
          ];
        return {
          key: [L(`δ₂F(${m.base}, ${o.join(', ')})`, `δ₂F(${m.base}, ${o.join(', ')})`), mstr(m.defect), m.defect === 0 ? L('：F 闭，e = H₂F 是原势', ': F closed, e = H₂F a primitive') : L('：F 不闭，没有原势', ': F not closed, no primitive')],
          r: [
            [L('F 于 012 · 013 · 023 · 123', 'F on 012 · 013 · 023 · 123'), m.faces.map(mstr).join(' · ')],
            [L(`e = H₂F：e(x, y) = F(${m.base}, x, y) 于 ${eo.map((p) => p.join('')).join('、')}`, `e = H₂F: e(x, y) = F(${m.base}, x, y) on ${eo.map((p) => p.join('')).join(', ')}`), eo.map(([x, y]) => mstr(m.e(x, y))).join(' · ') + L('；辐边为 0', '; spokes 0')],
            [L(`对面 ${o.join('')}：δ₁e 与 F`, `Opposite face ${o.join('')}: δ₁e and F`), `${mstr(m.coneFace)} · ${mstr(m.oppF)}`],
            [L('δ₁(H₂F) + H₃(δ₂F) = F（64 个有序三元组）', 'δ₁(H₂F) + H₃(δ₂F) = F (64 ordered triples)'), `${m.coneOk}/64 ${mark(m.coneOk === 64)}`],
            [L('δ₂(δ₁e) = 0（256 个有序四元组）', 'δ₂(δ₁e) = 0 (256 ordered quadruples)'), `${m.d2d1}/256 ${mark(m.d2d1 === 256)}`],
            [state.lens ? L('经典：光滑形式、积分与可缩区域', 'Classical: smooth forms, integrals, contractible region') : L('δ₁e = F 的三元组数（闭时为 64）', 'Triples with δ₁e = F (64 when closed)'), `${m.primitive}/64`]
          ],
          note: L('锥原势只用“取定一个顶点 b、把它放在最前面”这一个显式步骤，不用选择公理；δ₂F ≠ 0 时缺陷正好落在 b 的对面。', 'The cone primitive takes one explicit step — fix a vertex b and put it first — and no choice; when δ₂F ≠ 0 the defect lands exactly on the face opposite b.')
        };
      }
      case 'shell:shell':
        return {
          key: [L(`E${sub1(m.n)}(κ) 于 κ = ${fstr(m.kappa)}`, `E${sub1(m.n)}(κ) at κ = ${fstr(m.kappa)}`), fstr(m.En), L(' = U' + sub1(2 * m.n) + '(x)，x² = κ', ' = U' + sub1(2 * m.n) + '(x), x² = κ')],
          r: [
            [`E${sub1(m.n)}(κ)`, polyStr(m.poly)],
            [L(`E${sub1(m.n)}(x²) = U${sub1(2 * m.n)}(x)（多项式恒等）`, `E${sub1(m.n)}(x²) = U${sub1(2 * m.n)}(x) (as polynomials)`), `${polyStr(UCH[2 * m.n], 'x')} ${mark(m.evenOk)}`],
            [`E${sub1(m.m)}·E${sub1(m.n)} = ${range(m.m + m.n - abs(m.m - m.n) + 1).map((i) => 'E' + sub1(abs(m.m - m.n) + i)).join(' + ')}`, `${polyStr(m.prodPoly)} ${mark(m.fusionOk)}`],
            [L(`E${sub1(m.m)}(κ)·E${sub1(m.n)}(κ) 于 κ = ${fstr(m.kappa)}`, `E${sub1(m.m)}(κ)·E${sub1(m.n)}(κ) at κ = ${fstr(m.kappa)}`), `${fstr(m.Em)} · ${fstr(m.En)} = ${fstr(m.product)} = ${fstr(m.sumAt)} ${mark(same(m.product, m.sumAt))}`],
            [L(`E${sub1(m.n)}(1) = 2n + 1（壳的维数）`, `E${sub1(m.n)}(1) = 2n + 1 (dimension of the shell)`), `${fstr(m.dim)} ${mark(same(m.dim, frac(2 * m.n + 1)))}`],
            [L('经典：sin((2n + 1)θ)/sin θ，cos²θ = κ', 'Classical: sin((2n + 1)θ)/sin θ, cos²θ = κ'), classicalShell(m)]
          ],
          note: L('Eₙ 只含 κ 的整数系数：根号 √κ 在整数自旋的全部壳层上消失，读数都是整数之比。', 'Eₙ has integer coefficients in κ: the root √κ disappears on every integer-spin shell, and every reading is a ratio of integers.')
        };
      case 'shell:quad': {
        const row = (o) => `(${o.diag.map(fstr).join(', ')})`;
        return {
          key: [L(`${['d¹⁰', 'd⁹', 'd⁸'][m.holes]} 的四极对角元`, `Quadrupole diagonal of ${['d¹⁰', 'd⁹', 'd⁸'][m.holes]}`), `(${m.Q.map(fstr).join(', ')})`, L(` · 迹 = ${fstr(m.trace)}`, ` · trace = ${fstr(m.trace)}`)],
          r: [
            [`${ORB[0].name} · ${ORB[1].name} · ${ORB[2].name}`, `${row(ORB[0])} · ${row(ORB[1])} · ${row(ORB[2])}`],
            [`${ORB[3].name} · ${ORB[4].name}`, `${row(ORB[3])} · ${row(ORB[4])}`],
            [L('d¹⁰ = 2·Σ（五条轨道，各轴）', 'd¹⁰ = 2·Σ (five orbitals, each axis)'), `(${m.d10.map(fstr).join(', ')}) ${mark(m.d10.every((x) => same(x, ZERO)))}`],
            [L('d⁸ = d¹⁰ − 2·Q(d<sub>x²−y²</sub>)', 'd⁸ = d¹⁰ − 2·Q(d<sub>x²−y²</sub>)'), `(${quadOf(2).map(fstr).join(', ')}) = (12/7)·(−1/3, −1/3, 2/3)`],
            [L('S² 上的矩 E[n<sub>x</sub>²] · E[n<sub>x</sub>⁴] · E[n<sub>x</sub>²n<sub>y</sub>²]', 'Moments on S²: E[n<sub>x</sub>²] · E[n<sub>x</sub>⁴] · E[n<sub>x</sub>²n<sub>y</sub>²]'), `${fstr(sphereMoment([2, 0, 0]))} · ${fstr(sphereMoment([4, 0, 0]))} · ${fstr(sphereMoment([2, 2, 0]))}`],
            [L('非对角元（五条轨道）', 'Off-diagonal entries (five orbitals)'), `${L('全为 0', 'all 0')} ${mark(ORB.every((o) => o.off.every((x) => same(x, ZERO))))}`]
          ],
          note: L('期望值只用球面上单项式的矩（双阶乘之比）：五条实 d 轨道的 ⟨3n<sub>a</sub>² − 1⟩ 都是七分之几，没有 π。', 'The expectations use only moments of monomials on the sphere (ratios of double factorials): ⟨3n<sub>a</sub>² − 1⟩ is a number of sevenths on all five real d orbitals, with no π.')
        };
      }
      case 'quad:schur':
        return {
          key: [L('min<sub>y</sub> (ax² + 2bxy + cy²) = (a − b²/c)x²', 'min<sub>y</sub> (ax² + 2bxy + cy²) = (a − b²/c)x²'), fstr(m.floor), L(` 于 y* = ${fstr(m.ystar)}`, ` at y* = ${fstr(m.ystar)}`)],
          r: [
            ['a · b · c · x', `${fstr(m.a)} · ${fstr(m.b)} · ${fstr(m.c)} · ${fstr(m.x)}`],
            [L('S = a − b²/c · y* = −(b/c)x', 'S = a − b²/c · y* = −(b/c)x'), `${fstr(m.S)} · ${fstr(m.ystar)}`],
            [L('y（时间轴）· q(x, y)', 'y (rail) · q(x, y)'), `${fstr(m.y)} · ${fstr(m.q)}`],
            [L('Sx² + c(y − y*)²', 'Sx² + c(y − y*)²'), `${fstr(m.floor)} + ${fstr(m.sq)} = ${fstr(plus(m.floor, m.sq))} ${mark(m.ok)}`],
            [L('c(y − y*)² ≥ 0', 'c(y − y*)² ≥ 0'), `${fstr(m.sq)} ${mark(cmp(m.sq, ZERO) >= 0)}${m.atMin ? L('（在 y* 处为 0）', ' (0 at y*)') : ''}`],
            [L('经典：令 ∂q/∂y = 2bx + 2cy = 0', 'Classical: set ∂q/∂y = 2bx + 2cy = 0'), `y ≈ ${fix(fval(m.ystar), 6)}`]
          ],
          note: L('配方 ax² + 2bxy + cy² = (a − b²/c)x² + c(y + (b/c)x)² 只用一次有理除法；只要 c > 0，最小值就在 y* 处取到，a 可以是任何有理数。', 'Completing the square, ax² + 2bxy + cy² = (a − b²/c)x² + c(y + (b/c)x)², takes one rational division; as long as c > 0 the minimum is attained at y*, whatever the rational a.')
        };
      case 'quad:sqrt2':
        return {
          key: [L(`u₉₀${sup1(m.k)}`, `u₉₀${sup1(m.k)}`), spinStr(m.power), ''],
          r: [
            [L('ℚ(√2)：p + qδ，δ² = 2，N = p² − 2q²', 'ℚ(√2): p + qδ, δ² = 2, N = p² − 2q²'), 'u₉₀ = (δ/2) + (δ/2)i'],
            [L(`‖u₉₀${sup1(m.k)}‖² = Re² + Im²`, `‖u₉₀${sup1(m.k)}‖² = Re² + Im²`), `${s2str(m.norm2)} ${mark(same(m.norm2[0], ONE) && same(m.norm2[1], ZERO))}`],
            ['u₉₀² · u₉₀⁴ · u₉₀⁸', `${spinStr(SPIN[2])} · ${spinStr(SPIN[4])} · ${spinStr(SPIN[8])}`],
            [L('CHSH：S = 2δ，S²', 'CHSH: S = 2δ, S²'), `${s2str(m.bell)} · ${s2str(m.bell2)} ${mark(same(m.bell2[0], frac(8)) && same(m.bell2[1], ZERO))}`],
            [L('(1 + δ)⁻¹（范数 −1）', '(1 + δ)⁻¹ (norm −1)'), `${s2str(m.inv.inv)} · (1 + δ)(${s2str(m.inv.inv)}) = ${s2str(m.inv.check)} ${mark(same(m.inv.check[0], ONE) && same(m.inv.check[1], ZERO))}`],
            [L('经典：S = 2√2 ≈ 2.828427 > 2', 'Classical: S = 2√2 ≈ 2.828427 > 2'), `√2 ≈ ${fix(Math.SQRT2, 8)}`]
          ],
          note: L('所有坐标都是 p + qδ，p、q 为有理数；八次幂回到 1 是有限次有理运算的结果，不需要 e<sup>iπ/4</sup>。', 'Every coordinate is p + qδ with rational p, q; the eighth power returning to 1 is the outcome of finitely many rational operations, no e<sup>iπ/4</sup> needed.')
        };
      default:
        return {
          key: [L(`φ${sup1(m.n)} = F${sub1(m.n - 1)} + F${sub1(m.n)}φ`, `φ${sup1(m.n)} = F${sub1(m.n - 1)} + F${sub1(m.n)}φ`), phstr(m.power), ` = ${m.fib[0]} + ${m.fib[1]}φ ${mark(same(m.power[0], [m.fib[0], 1n]) && same(m.power[1], [m.fib[1], 1n]))}`],
          r: [
            [L(`N(φ${sup1(m.n)}) = p² + pq − q²`, `N(φ${sup1(m.n)}) = p² + pq − q²`), `${fstr(m.norm)} = (−1)${sup1(m.n)} ${mark(same(m.norm, frac(m.n % 2 ? -1 : 1)))}`],
            [L(`T${sub1(m.n)}(φ/2)（十边形第 ${m.n} 顶点的影子）`, `T${sub1(m.n)}(φ/2) (shadow of vertex ${m.n})`), phstr(m.T)],
            ['T₅(φ/2) · T₁₀(φ/2) · T₅((φ − 1)/2)', `${phstr(m.T5)} · ${phstr(m.T10)} · ${phstr(m.T5b)} ${mark(same(m.T5[0], [-1n, 1n]) && same(m.T10[0], ONE) && same(m.T5b[0], ONE) && m.T5[1][0] === 0n && m.T10[1][0] === 0n && m.T5b[1][0] === 0n)}`],
            [L('乘法规则 φ² = φ + 1', 'Product rule φ² = φ + 1'), `(p + qφ)(r + sφ) = (pr + qs) + (ps + qr + qs)φ`],
            [L(`F${sub1(m.n)}/F${sub1(m.n - 1)}`, `F${sub1(m.n)}/F${sub1(m.n - 1)}`), m.ratio ? fstr(m.ratio) : '—'],
            [L('经典：φ = (1 + √5)/2，cos 36° = φ/2', 'Classical: φ = (1 + √5)/2, cos 36° = φ/2'), `φ ≈ ${fix((1 + Math.sqrt(5)) / 2, 8)}`]
          ],
          note: L('ℚ(φ) 的元素是有理数对 (p, q)；范数 N(φ) = −1 的乘性给出 N(φⁿ) = (−1)ⁿ，十边形的闭合 T₅(φ/2) = −1 只用 φ² = φ + 1。', 'The elements of ℚ(φ) are pairs of rationals (p, q); multiplicativity of the norm with N(φ) = −1 gives N(φⁿ) = (−1)ⁿ, and the decagon closure T₅(φ/2) = −1 uses only φ² = φ + 1.')
        };
    }
  }
  function classicalShell(m) {
    const kap = fval(m.kappa),
      th = Math.acos(Math.sqrt(kap));
    if (th < 1e-9) return `θ = 0 · ${L('极限', 'limit')} → ${2 * m.n + 1}`;
    return `θ ≈ ${fix((th * 180) / PI, 3)}° · ≈ ${fix(sn((2 * m.n + 1) * th) / sn(th), 6)}`;
  }
  const PILL = { jet: ['射流', 'Jet'], cone: ['锥', 'Cone'], shell: ['自旋壳', 'Shells'], quad: ['舒尔', 'Schur'] };
  function readings(m) {
    const R = rows(m);
    put('roKeyL', R.key[0]);
    put('roKey', kept(R.key[1]));
    put('roKeySub', kept(R.key[2]));
    R.r.forEach(([l, v], i) => {
      put('roL' + (i + 1), kept(l));
      put('roV' + (i + 1), kept(v));
    });
    $('roRow7').hidden = m.key !== 'cone:stokes';
    put('roNote', R.note);
    $('scenePill').innerHTML = `${L(...PILL[state.scene])} <strong>${state.lens ? 'ℝ' : 'Ω'}</strong>`;
    $('keyPill').innerHTML = `P/Q <strong>${kept(R.key[1])}</strong>`;
    $('ctlAside').textContent = `${SCENES.indexOf(state.scene) + 1}/4`;
    for (const g of document.querySelectorAll('#ctlPanel .grp')) g.hidden = g.dataset.scene !== state.scene;
    for (const id of ['lensToggleBtn', 'lensMirror']) $(id).setAttribute('aria-pressed', String(!!state.lens));
    // the dials follow the state
    const setF = (id, v, shown = v) => {
      if ($(id).value !== String(v)) $(id).value = String(v);
      $(id + 'Out').textContent = mstr(shown);
    };
    EDGES.forEach(([x, y], i) => setF(`e${x}${y}`, state.phi[i]));
    VS.forEach((i) => setF('f' + i, state.f[i]));
    setF('kdef', state.kdef);
    for (const k of ['a', 'b', 'c', 'x']) setF('q' + k, state[k], fstr(halves(state[k])));
    jmodeChips.set(state.jmode, true);
    cmodeChips.set(state.cmode, true);
    smodeChips.set(state.smode, true);
    qmodeChips.set(state.qmode, true);
    baseChips.set(state.base, true);
    nShellChips.set(state.n, true);
    mShellChips.set(state.m, true);
    nChips.set(state.jmode === 'cayley' ? 2 + step(state.at['jet:cayley']) : null, true);
    mChips.set(state.jmode === 'machin' ? 1 + step(state.at['jet:machin']) : null, true);
    $('hint').textContent = L('Space 播放 · ← → 一步 · 拖空白处转视角', 'Space plays · ← → one step · drag empty space to orbit');
    $('formula').textContent = {
      'jet:cayley': 'Cos_N(2 Atan_N(η)) ≡ (1 − η²)/(1 + η²) mod η^(N+1)',
      'jet:machin': '((1/5 ⊕ 1/5) ⊕ (1/5 ⊕ 1/5)) ⊖ 1/239 = 1',
      'cone:stokes': 'Δ₁ + Δ₂ = ∂Σ, Φ13 + Φ31 = 0',
      'cone:cone': 'δ₁(H₂F) + H₃(δ₂F) = F',
      'shell:shell': 'E_n(x²) = U_2n(x), E_m E_n = Σ E_r',
      'shell:quad': 'Q(d⁸) = Q(d¹⁰) − 2 Q(d_x²−y²)',
      'quad:schur': 'ax² + 2bxy + cy² = (a − b²/c)x² + c(y + bx/c)²',
      'quad:sqrt2': 'u₉₀ = (δ/2)(1 + i), u₉₀⁸ = 1, (2δ)² = 8',
      'quad:phi': 'φⁿ = F_(n−1) + F_n φ, N(φⁿ) = (−1)ⁿ'
    }[m.key];
  }

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
  function headroom(cv, rws, lo, hi) {
    const ih = Math.max(1, cv.clientHeight - PAD[2] - PAD[3]),
      need = 9 + ROW * (rws - 1) + 24,
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
        } else if (kind === 'bar') {
          ctx.fillRect(x + 3, y - 4, 8, 8);
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
      stp = 10 ** Math.floor(Math.log10(span / n)),
      e = [1, 2, 5, 10].find((f) => span / (f * stp) <= n) * stp;
    const out = [];
    for (let v = Math.ceil(lo / e) * e; v <= hi + 1e-9; v += e) out.push([v, fix(v, e < 1 ? (e < 0.1 ? 2 : 1) : 0)]);
    return out;
  };
  function drawPlot(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const width = cv.clientWidth - PAD[0] - PAD[1] - 12;
    const frame = (items, x, lo, hi, xt, yt) => {
      const rws = legendRows(cv, items, width);
      const g = kit.plot(cv, { x, y: [lo, headroom(cv, rws.length, lo, hi)], pad: PAD });
      g.axes({ xTicks: xt, yTicks: yt || ticks(lo, hi) });
      return [g, rws];
    };
    const T = (zh, en) => $('plotTitle').textContent !== L(zh, en) && ($('plotTitle').textContent = L(zh, en));
    switch (m.key) {
      case 'jet:cayley': {
        T('每升两阶，误差乘以 −1/4（偶数阶改 X，奇数阶改 Y）', 'Two orders up, the error times −1/4 (even orders move X, odd ones Y)');
        $('plotMeta').textContent = `N = ${m.N}`;
        const pts = m.points.map((J) => [J.N, Math.log10(abs(fval(J.eu)))]),
          ptsV = m.points.map((J) => [J.N, Math.log10(abs(fval(J.ev)))]),
          all = [...pts, ...ptsV].map((p) => p[1]),
          lo = Math.min(...all) - 0.3,
          hi = Math.max(...all) + 0.3;
        const [g, rws] = frame(
          [
            [P.cyan, 'log₁₀|U_N − 3/5|'],
            [P.violet, 'log₁₀|V_N − 4/5|', 'dash'],
            [P.magenta, L('负误差', 'negative error'), 'dot']
          ],
          [1, 15],
          lo,
          hi,
          range(7).map((i) => [2 + 2 * i, String(2 + 2 * i)])
        );
        g.line(ptsV, P.violet, { width: 1.4, dash: [4, 3] });
        g.line(pts, P.cyan, { width: 2 });
        m.points.forEach((J, i) => {
          g.dot(J.N, pts[i][1], cmp(J.eu, ZERO) < 0 ? P.magenta : P.cyan, 3);
          g.dot(J.N, ptsV[i][1], cmp(J.ev, ZERO) < 0 ? P.magenta : P.violet, 2.6);
        });
        g.dot(m.N, Math.log10(abs(fval(m.eu))), P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'jet:machin': {
        T('包络宽度 W_M（以 10 为底的对数）', 'Bracket width W_M (log base 10)');
        $('plotMeta').textContent = `M = ${m.M}`;
        const pts = range(10).map((i) => [i + 1, Math.log10(fval(bracket(i + 1).W))]),
          lo = Math.min(...pts.map((p) => p[1])) - 0.6,
          hi = Math.max(...pts.map((p) => p[1])) + 0.6;
        const [g, rws] = frame(
          [
            [P.cyan, 'log₁₀ W_M'],
            [P.violet, '16/(5^(2M+1)(2M+1))', 'dash']
          ],
          [0.5, 10.5],
          lo,
          hi,
          range(10).map((i) => [i + 1, String(i + 1)])
        );
        g.line(
          range(10).map((i) => [i + 1, Math.log10(16 / (5 ** (2 * i + 3) * (2 * i + 3)))]),
          P.violet,
          { width: 1.3, dash: [4, 3] }
        );
        g.line(pts, P.cyan, { width: 2 });
        pts.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.6));
        g.dot(m.M, Math.log10(fval(m.W)), P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'cone:stokes': {
        T('面元环流与外边界', 'Plaquette circulations and the boundary');
        $('plotMeta').textContent = `λ = ${fstr(m.lambda)}`;
        const vals = [m.circ[0], m.circ[1], m.circ[0] + m.circ[1], m.boundary],
          lo = Math.min(0, ...vals) - 1,
          hi = Math.max(0, ...vals) + 1;
        const [g, rws] = frame(
          [
            [P.cyan, L('正', 'positive'), 'bar'],
            [P.magenta, L('负', 'negative'), 'bar']
          ],
          [-0.5, 3.5],
          lo,
          hi,
          [
            [0, 'Δ₁'],
            [1, 'Δ₂'],
            [2, 'Δ₁ + Δ₂'],
            [3, '∂Σ']
          ]
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        const bw = Math.min(18, g.iw / 10);
        vals.forEach((y, i) => g.rect(i - bw / g.scale / 2, 0, i + bw / g.scale / 2, y || 0.04, y >= 0 ? P.cyan : P.magenta, { alpha: 0.85 }));
        drawLegend(g, rws);
        break;
      }
      case 'cone:cone': {
        T('逐面对照：F 与 δ₁(H₂F)', 'Face by face: F and δ₁(H₂F)');
        $('plotMeta').textContent = `b = ${m.base} · δ₂F = ${mstr(m.defect)}`;
        const de = FACES.map(([x, y, z]) => {
            const e = m.e;
            return e(y, z) + e(x, y) - e(x, z);
          }),
          all = [...m.faces, ...de],
          lo = Math.min(0, ...all) - 1,
          hi = Math.max(0, ...all) + 1;
        const [g, rws] = frame(
          [
            [P.cyan, 'F', 'bar'],
            [P.violet, 'δ₁(H₂F)', 'bar']
          ],
          [-0.5, 3.5],
          lo,
          hi,
          FACES.map((f, i) => [i, f.join('')])
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        const bw = Math.min(14, g.iw / 14);
        FACES.forEach((f, i) => {
          g.rect(i - 0.16 - bw / g.scale / 2, 0, i - 0.16 + bw / g.scale / 2, m.faces[i] || 0.04, P.cyan, { alpha: 0.85 });
          g.rect(i + 0.16 - bw / g.scale / 2, 0, i + 0.16 + bw / g.scale / 2, de[i] || 0.04, de[i] === m.faces[i] ? P.violet : P.magenta, { alpha: 0.85 });
        });
        drawLegend(g, rws);
        break;
      }
      case 'shell:shell': {
        T(`E${sub1(m.n)}、E${sub1(m.m)} 与乘积沿 κ`, `E${sub1(m.n)}, E${sub1(m.m)} and their product along κ`);
        $('plotMeta').textContent = `κ = ${fstr(m.kappa)}`;
        const curve = (p) => sample(100, (x) => [x, pevalF(p, x)]),
          A1 = curve(EVEN[m.n]),
          B1 = curve(EVEN[m.m]),
          C1 = curve(m.prodPoly),
          clip = (pts) => pts.map(([x, y]) => [x, clamp(y, -4, 6)]),
          all = [...A1, ...B1, ...C1].map((p) => clamp(p[1], -4, 6)),
          lo = Math.min(...all) - 0.3,
          hi = Math.max(...all) + 0.3;
        const [g, rws] = frame(
          [
            [P.cyan, `E${sub1(m.n)}(κ)`],
            [P.violet, `E${sub1(m.m)}(κ)`, 'dash'],
            [P.magenta, `E${sub1(m.m)}E${sub1(m.n)}`]
          ],
          [0, 1],
          lo,
          hi,
          [
            [0, '0'],
            [0.25, '1/4'],
            [0.5, '1/2'],
            [0.75, '3/4'],
            [1, '1']
          ]
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        g.line(clip(C1), P.magenta, { width: 1.3 });
        g.line(clip(B1), P.violet, { width: 1.5, dash: [4, 3] });
        g.line(clip(A1), P.cyan, { width: 2 });
        ROOTS[m.n].forEach((x) => g.dot(x, 0, P.ink, 3));
        const x = fval(m.kappa);
        g.vline(x, P.amber, { alpha: 0.8 });
        g.dot(x, clamp(fval(m.En), -4, 6), P.amber, 4.4);
        drawLegend(g, rws);
        break;
      }
      case 'shell:quad': {
        T('四极对角元（以 1/7 为单位）', 'Quadrupole diagonal (in units of 1/7)');
        $('plotMeta').textContent = ['d¹⁰', 'd⁹', 'd⁸'][m.holes];
        const cfg = [0, 1, 2].map((h) => quadOf(h).map((x) => 7 * fval(x)));
        const [g, rws] = frame(
          [
            [P.violet, 'd¹⁰ · d⁹', 'bar'],
            [P.amber, L('当前', 'present'), 'bar']
          ],
          [-0.5, 2.5],
          -5,
          9,
          [
            [0, 'Qxx'],
            [1, 'Qyy'],
            [2, 'Qzz']
          ]
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        const bw = Math.min(12, g.iw / 18);
        [0, 1, 2].forEach((ax) =>
          cfg.forEach((q, h) => {
            const x = ax + (h - 1) * 0.24;
            g.rect(x - bw / g.scale / 2, 0, x + bw / g.scale / 2, q[ax] || 0.06, h === m.holes ? P.amber : P.violet, { alpha: h === m.holes ? 0.95 : 0.5 });
          })
        );
        drawLegend(g, rws);
        break;
      }
      case 'quad:schur': {
        T('固定 x 的切片 ax² + 2bxy + cy²', 'The slice at fixed x: ax² + 2bxy + cy²');
        $('plotMeta').textContent = `x = ${fstr(m.x)} · y* = ${fstr(m.ystar)}`;
        const a = fval(m.a),
          b = fval(m.b),
          c = fval(m.c),
          x = fval(m.x),
          ys = fval(m.ystar),
          f = (y) => a * x * x + 2 * b * x * y + c * y * y,
          y0 = ys - 3,
          y1 = ys + 3,
          pts = sample(80, (t) => [y0 + (y1 - y0) * t, f(y0 + (y1 - y0) * t)]),
          lo = Math.min(...pts.map((p) => p[1]), fval(m.floor)) - 0.5,
          hi = Math.max(...pts.map((p) => p[1])) + 0.5;
        const [g, rws] = frame(
          [
            [P.ink, 'q(x, y)'],
            [P.cyan, '(a − b²/c)x²', 'dash'],
            [P.amber, 'y', 'dot']
          ],
          [y0, y1],
          lo,
          hi,
          ticks(y0, y1, 5)
        );
        g.hline(fval(m.floor), P.cyan, { dash: [4, 3], width: 1.4 });
        g.line(pts, P.ink, { width: 2 });
        g.dot(ys, fval(m.floor), P.cyan, 4);
        g.dot(fval(m.y), fval(m.q), P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      case 'quad:sqrt2': {
        T('u₉₀ᵏ 的实部与虚部（浮点位置）', 'Real and imaginary parts of u₉₀ᵏ (floating positions)');
        $('plotMeta').textContent = `k = ${m.k}`;
        const re = range(9).map((k) => [k, fval(SPIN[k][0][0]) + fval(SPIN[k][0][1]) * Math.SQRT2]),
          im = range(9).map((k) => [k, fval(SPIN[k][1][0]) + fval(SPIN[k][1][1]) * Math.SQRT2]);
        const [g, rws] = frame(
          [
            [P.cyan, 'Re'],
            [P.violet, 'Im', 'dash']
          ],
          [-0.3, 8.3],
          -1.2,
          1.2,
          range(9).map((k) => [k, String(k)]),
          [
            [-1, '−1'],
            [0, '0'],
            [1, '1']
          ]
        );
        g.hline(0, P.dim, { alpha: 0.7 });
        g.line(im, P.violet, { width: 1.5, dash: [4, 3] });
        g.line(re, P.cyan, { width: 2 });
        re.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.6));
        g.dot(m.k, re[m.k][1], P.amber, 4.6);
        drawLegend(g, rws);
        break;
      }
      default: {
        T('F_n/F_(n−1) 在 φ 两侧交替', 'F_n/F_(n−1) alternates round φ');
        $('plotMeta').textContent = `n = ${m.n}`;
        const pts = range(11).map((i) => [i + 2, Number(FIB[i + 2]) / Number(FIB[i + 1])]);
        const [g, rws] = frame(
          [
            [P.cyan, 'F_n/F_(n−1)'],
            [P.magenta, L('φ（浮点）', 'φ (floating)'), 'dash']
          ],
          [1.5, 12.5],
          0.9,
          2.1,
          range(11).map((i) => [i + 2, String(i + 2)]),
          [
            [1, '1'],
            [1.5, '3/2'],
            [2, '2']
          ]
        );
        g.hline((1 + Math.sqrt(5)) / 2, P.magenta, { dash: [4, 3], width: 1.3 });
        g.line(pts, P.cyan, { width: 2 });
        pts.forEach(([x, y]) => g.dot(x, y, P.cyan, 2.6));
        if (m.n >= 2) g.dot(m.n, Number(FIB[m.n]) / Number(FIB[m.n - 1]), P.amber, 4.6);
        drawLegend(g, rws);
      }
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
    rate: RAILS['jet:cayley'].rate,
    step: 1,
    max: RAILS['jet:cayley'].max,
    t: STILLS['jet:cayley'],
    format: (t) => {
      const k = Math.round(t);
      switch (railKey()) {
        case 'jet:cayley':
          return `N = ${2 + clamp(k, 0, 10)}`;
        case 'jet:machin':
          return `M = ${1 + clamp(k, 0, 7)}`;
        case 'cone:stokes':
        case 'cone:cone':
          return `λ = ${fstr(frac(clamp(k, 0, 8), 8))}`;
        case 'shell:shell':
          return `κ = ${fstr(frac(clamp(k, 0, 16), 16))}`;
        case 'shell:quad':
          return ['d¹⁰', 'd⁹', 'd⁸'][clamp(k, 0, 2)];
        case 'quad:schur':
          return `t = ${clamp(k, 0, 24)}`;
        case 'quad:sqrt2':
          return `k = ${clamp(k, 0, 8)}`;
        default:
          return `n = ${clamp(k, 0, 12)}`;
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
      state.at[railKey()] = c.playing ? t : Math.round(t);
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
    const key = railKey(),
      r = RAILS[key];
    clock.rate = r.rate;
    clock.step = 1;
    $('now').step = '1';
    const at = clamp(state.at[key], 0, r.max);
    clock.setMax(r.max, true);
    clock.set(at, true);
    state.at[key] = at;
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
    const before = camOf('card').join();
    change();
    setRail();
    if (state.cam === 'card' && camOf('card').join() !== before) sc.view(camOf('card'), booting || TRV.still ? 0 : 500);
    paint();
  }
  const signed = (v) => mstr(v);
  EDGES.forEach(([x, y], i) => kit.field($(`e${x}${y}`), { out: $(`e${x}${y}Out`), fmt: signed, onInput: (v) => steer('cone', () => (state.phi[i] = Math.round(v))) }));
  VS.forEach((i) => kit.field($('f' + i), { out: $('f' + i + 'Out'), fmt: signed, onInput: (v) => steer('cone', () => (state.f[i] = Math.round(v))) }));
  kit.field($('kdef'), { out: $('kdefOut'), fmt: signed, onInput: (v) => steer('cone', () => ((state.kdef = Math.round(v)), (state.cmode = 'cone'))) });
  for (const k of ['a', 'b', 'c', 'x'])
    kit.field($('q' + k), {
      out: $('q' + k + 'Out'),
      fmt: (v) => fstr(halves(Math.round(v))),
      onInput: (v) =>
        steer('quad', () => {
          state[k] = Math.round(v);
          if (k === 'c' && state.c < 1) state.c = 1;
          state.qmode = 'schur';
        })
    });
  const jmodeChips = kit.chips($('jmodeChips'), 'jmode', (v) => steer('jet', () => (state.jmode = v === 'machin' ? 'machin' : 'cayley')));
  const nChips = kit.chips($('nChips'), 'nord', (v) =>
    steer('jet', () => {
      state.jmode = 'cayley';
      state.at['jet:cayley'] = clamp(Number(v) - 2, 0, 10);
    })
  );
  const mChips = kit.chips($('mChips'), 'mord', (v) =>
    steer('jet', () => {
      state.jmode = 'machin';
      state.at['jet:machin'] = clamp(Number(v) - 1, 0, 7);
    })
  );
  const cmodeChips = kit.chips($('cmodeChips'), 'cmode', (v) => steer('cone', () => (state.cmode = v === 'stokes' ? 'stokes' : 'cone')));
  const baseChips = kit.chips($('baseChips'), 'base', (v) =>
    steer('cone', () => {
      state.base = clamp(Number(v), 0, 3);
      state.cmode = 'cone';
    })
  );
  const smodeChips = kit.chips($('smodeChips'), 'smode', (v) => steer('shell', () => (state.smode = v === 'quad' ? 'quad' : 'shell')));
  const nShellChips = kit.chips($('nShellChips'), 'shell', (v) =>
    steer('shell', () => {
      state.n = clamp(Number(v), 0, 3);
      state.smode = 'shell';
    })
  );
  const mShellChips = kit.chips($('mShellChips'), 'partner', (v) =>
    steer('shell', () => {
      state.m = clamp(Number(v), 0, 3);
      state.smode = 'shell';
    })
  );
  const qmodeChips = kit.chips($('qmodeChips'), 'qmode', (v) => steer('quad', () => (state.qmode = ['schur', 'sqrt2', 'phi'].includes(v) ? v : 'schur')));
  $('stageAct').addEventListener('click', () => {
    const scene = state.scene;
    steer(scene, () => {
      if (scene === 'jet') state.jmode = state.jmode === 'cayley' ? 'machin' : 'cayley';
      else if (scene === 'cone') state.cmode = state.cmode === 'cone' ? 'stokes' : 'cone';
      else if (scene === 'shell') state.smode = state.smode === 'shell' ? 'quad' : 'shell';
      else state.qmode = { schur: 'sqrt2', sqrt2: 'phi', phi: 'schur' }[state.qmode];
    });
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = ['card', 'top', 'side'].includes(v) ? v : 'card';
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
    Object.assign(state, copy(FRESH), copy(p.set), { lens, at: { ...STILLS } });
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
    'dfinite-cayley-machin': [
      '青线一步落在 (3/5, 4/5)；品红截断点 N = 2 … 12 逐阶逼近，偶数阶在一条直线上两侧交替，误差 −1/10、1/40、…、1/10240 每两阶乘以 −1/4。',
      'The cyan line lands on (3/5, 4/5) in one step; the magenta truncations N = 2 … 12 close in, the even ones alternating along one line, the errors −1/10, 1/40, …, 1/10240 multiplied by −1/4 every two orders.'
    ],
    'simplicial-stokes-cone': [
      '锥顶 0：对边写上 e = F(0, x, y)，擦去紫色辐边后三块锥面合成一顶盖，盖的通量 6 正是对面 123 的 F，δ₂F = 0。',
      'Apex 0: the opposite edges carry e = F(0, x, y); with the violet spokes erased the three cone faces merge into a cap whose flux 6 is F on the opposite face 123, and δ₂F = 0.'
    ],
    'peter-weyl-even-chebyshev': [
      '琥珀圈从赤道升到 κ = 1/2，越过 E₂ 的第一条节点壳；E₂(1/2) = −1，E₁·E₂ = E₁ + E₂ + E₃。',
      'The amber circles rise from the equator to κ = 1/2, across the first nodal shell of E₂; E₂(1/2) = −1 and E₁·E₂ = E₁ + E₂ + E₃.'
    ],
    'quadratic-ext-and-schur': [
      'x = 1：琥珀点沿墨色切片滑到青色谷线，品红竖线缩成 0，最小值 (a − b²/c)x² = 4/3 在 y* = −2/3 处取到。',
      'x = 1: the amber point slides along the ink slice down to the cyan valley, the magenta stem shrinks to 0, and the minimum (a − b²/c)x² = 4/3 is reached at y* = −2/3.'
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
  /** The world point of the handle at the rail value v (null where the card has no handle). */
  function handleWorld(v) {
    const m = calc();
    switch (m.key) {
      case 'jet:cayley':
        return truncPt(jetOrder(2 + clamp(Math.round(v), 0, 10)));
      case 'jet:machin':
        return null;
      case 'cone:stokes':
        return scale(lerp(TV[1], TV[3], clamp(v, 0, 8) / 8), 1.012);
      case 'cone:cone':
        return scale(TV[state.base], 1.012);
      case 'shell:shell':
        return shellPoint(v);
      case 'shell:quad':
        return [0, 0, (1 + QALPHA * quadAt(v)[2]) * 1.02];
      case 'quad:schur': {
        const b = S2(state.b),
          c = S2(state.c),
          x = S2(state.x),
          ys = -(b / c) * x;
        return add(schurWorld(x, clamp(ys + (16 - clamp(v, 0, 24)) / 6, -2.6, 2.6)), [0, 0, 0.012]);
      }
      case 'quad:sqrt2':
        return cay(cs((45 * clamp(v, 0, 8) * PI) / 180), sn((45 * clamp(v, 0, 8) * PI) / 180), LIFT);
      default:
        return cay(cs((36 * clamp(v, 0, 12) * PI) / 180), sn((36 * clamp(v, 0, 12) * PI) / 180), LIFT);
    }
  }
  const viewportPoint = (v) => {
    const w = handleWorld(v);
    if (!w) return null;
    const q = sc.p(w),
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
    if (railKey() === 'cone:cone') {
      // the vertex nearest the pointer becomes the apex; the present one before others at the same place
      let best = state.base,
        gap = Infinity;
      TV.forEach((p, i) => {
        const q = sc.p(scale(p, 1.012));
        const d = hypot(q[0] - x, q[1] - y) + (i === state.base ? 0 : 0.5);
        if (d < gap) {
          gap = d;
          best = i;
        }
      });
      if (best !== state.base) {
        state.base = best;
        paint();
      }
      return;
    }
    // the whole step of the rail nearest the pointer, the present one before others at the same distance
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= clock.max; k++) {
      const w = handleWorld(k);
      if (!w) continue;
      const p = sc.p(w),
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
  /** After the apex moved, the card's view turns to look from it again. */
  const followApex = () => {
    if (railKey() === 'cone:cone' && state.cam === 'card') sc.view(camOf('card'), TRV.reduceMotion ? 0 : 500);
  };
  handle.onlostpointercapture = () => {
    dragging = null;
    handle.classList.remove('dragging');
    followApex();
  };
  handle.onkeydown = (ev) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(ev.key)) return;
    ev.stopPropagation();
    ev.preventDefault();
    leave();
    if (railKey() === 'cone:cone') {
      const d = ev.key === 'ArrowRight' || ev.key === 'ArrowUp' ? 1 : ev.key === 'ArrowLeft' || ev.key === 'ArrowDown' ? -1 : 0;
      state.base = ev.key === 'Home' ? 0 : ev.key === 'End' ? 3 : (state.base + d + 4) % 4;
      followApex();
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
  const FRAME = { jets: 12, pyth: 16, machin: 12, f: 1, e: 1, F: 2, xs: 12, shells: 12, fusion: 6, s2: 3, phiN: PHIMAX, schur: 2 };
  function benchmarks() {
    const F = FRAME;
    // jets: unification, Pythagoras and the Cayley equations of the composite; the ratio −1/4 of the errors at η = 1/2
    let jets = 0,
      jetBad = 0,
      coeffs = 0,
      odeBad = 0,
      ratioBad = 0;
    for (let N = 1; N <= F.jets; N++) {
      const J = jetOrder(N);
      jets++;
      coeffs += 2 * (N + 1);
      if (!J.unified) jetBad++;
      if (!J.ode) odeBad++;
      if (N >= 4 && N % 2 === 0) {
        const p = jetOrder(N - 2);
        if (!same(over(J.eu, p.eu), frac(-1, 4)) || !same(over(J.ev, p.ev), frac(-1, 4))) ratioBad++;
      }
    }
    let pythBad = 0;
    for (let N = 1; N <= F.pyth; N++) {
      const c = COSC(N),
        s = SINC(N),
        sq = tmul(c, c, N).map((x, k) => plus(x, tmul(s, s, N)[k]));
      if (!sq.every((x, k) => same(x, k ? ZERO : ONE))) pythBad++;
    }
    let closedBad = 0,
      nestBad = 0;
    for (let M = 1; M <= F.machin; M++) {
      const b = bracket(M);
      if (!b.closedOk) closedBad++;
      if (!b.nested) nestBad++;
    }
    // cochains: δ₁δ₀ = 0, δ₂δ₁ = 0, the cone identity, and closed ⇔ exact on boxes of integer cochains
    const box = (n, len) => {
      const span = range(2 * n + 1).map((k) => k - n);
      let out = [[]];
      for (let i = 0; i < len; i++) out = out.flatMap((t) => span.map((v) => [...t, v]));
      return out;
    };
    let fTried = 0,
      fBad = 0,
      eTried = 0,
      eBad = 0,
      FTried = 0,
      coneBad = 0,
      closedCount = 0,
      exactBad = 0;
    for (const fv of box(F.f, 4)) {
      fTried++;
      const f = (v) => fv[v];
      if (triples.some(([x, y, z]) => d1(d0(f))(x, y, z) !== 0)) fBad++;
    }
    for (const ev of box(F.e, 6)) {
      eTried++;
      const e = alt1(ev),
        de = d1(e);
      if (quads.some(([x, y, z, w]) => d2(de)(x, y, z, w) !== 0)) eBad++;
    }
    for (const Fv of box(F.F, 4)) {
      FTried++;
      const Fc = alt2(Fv),
        dF = d2(Fc);
      const closed = quads.every(([x, y, z, w]) => dF(x, y, z, w) === 0);
      for (const b of VS) {
        const e = H2(b, Fc),
          de = d1(e),
          hd = H3(b, dF);
        if (triples.some(([x, y, z]) => de(x, y, z) + hd(x, y, z) !== Fc(x, y, z))) coneBad++;
        if (closed && triples.some(([x, y, z]) => de(x, y, z) !== Fc(x, y, z))) exactBad++;
      }
      if (closed) closedCount++;
    }
    // Chebyshev: E_n(x²) = U_{2n}(x) at integers, the fusion rule as polynomials
    let evenTried = 0,
      evenBad = 0,
      fusionTried = 0,
      fusionBad = 0;
    for (let n = 0; n <= F.shells; n++)
      for (let x = -F.xs; x <= F.xs; x++) {
        evenTried++;
        if (pevalZ(EVEN[n], BigInt(x * x)) !== pevalZ(UCH[2 * n], BigInt(x))) evenBad++;
      }
    for (let m = 0; m <= F.fusion; m++)
      for (let n = 0; n <= F.fusion; n++) {
        fusionTried++;
        if (!samePoly(pmulZ(EVEN[m], EVEN[n]), fusionSum(m, n))) fusionBad++;
      }
    // ℚ(√2): the norm multiplies on a box; ℚ(φ): Fibonacci powers and the norm (−1)ⁿ
    let s2Tried = 0,
      s2Bad = 0;
    const span2 = range(2 * F.s2 + 1).map((k) => frac(k - F.s2, 2));
    const els = span2.flatMap((p) => span2.map((q) => [p, q]));
    for (const z of els)
      for (const w of els) {
        s2Tried++;
        if (!same(s2norm(s2mul(z, w)), times(s2norm(z), s2norm(w)))) s2Bad++;
      }
    let phiBad = 0;
    for (let n = 0; n <= F.phiN; n++) {
      const pw = PHIPOW[n];
      if (!same(pw[0], [fibAt(n - 1), 1n]) || !same(pw[1], [fibAt(n), 1n]) || !same(phnorm(pw), frac(n % 2 ? -1 : 1))) phiBad++;
    }
    // Schur: the completed square and the minimum on a grid of rationals in halves
    let schurTried = 0,
      schurBad = 0;
    const halfs = range(9).map((k) => k - 4);
    for (const a of halfs)
      for (const b of halfs)
        for (const c of [1, 2, 3, 4])
          for (const x of halfs)
            for (let t = 0; t <= 24; t += 4) {
              schurTried++;
              const s = schurOf({ a, b, c, x }, t);
              if (!s.ok || cmp(s.q, s.floor) < 0 || (t === 16 && !same(s.q, s.floor))) schurBad++;
            }
    const spinOk = range(17).every((k) => same(spinNorm(SPIN[k])[0], ONE) && same(spinNorm(SPIN[k])[1], ZERO)) && same(SPIN[8][0][0], ONE) && SPIN[8][0][1][0] === 0n && SPIN[8][1].every((x) => x[0] === 0n);
    return { jets, jetBad, coeffs, odeBad, ratioBad, pythBad, closedBad, nestBad, fTried, fBad, eTried, eBad, FTried, coneBad, closedCount, exactBad, evenTried, evenBad, fusionTried, fusionBad, s2Tried, s2Bad, phiBad, schurTried, schurBad, spinOk, heapOk: HEAP.ok, heapRev: HEAP.revOk };
  }
  const BENCH = benchmarks();
  const DEF = cochains({ ...FRESH, scene: 'cone', at: STILLS });
  const SCH = schurOf({ a: 4, b: 2, c: 3, x: 2 }, 16);
  const NUMBERS = {
    cayErr: () =>
      range(6)
        .map((i) => fstr(jetOrder(2 + 2 * i).eu))
        .join(', '),
    nested12: () => `≈ ${fval(jetOrder(12).nu).toExponential(6)}`,
    dbl1: () => `(${CHAIN.d1.map(mstr).join(', ')})`,
    dbl2: () => `(${CHAIN.d2.map(mstr).join(', ')})`,
    corr: () => `(${CHAIN.last.map(mstr).join(', ')})`,
    w1: () => fstr(bracket(1).W),
    lu1: () => `[${fstr(bracket(1).L)}, ${fstr(bracket(1).U)}]`,
    faces: () => DEF.faces.map(mstr).join(', '),
    cone: () => [[1, 2], [1, 3], [2, 3]].map(([x, y]) => mstr(DEF.e(x, y))).join(', '),
    cone123: () => mstr(DEF.coneFace),
    hol: () => q4str(HEAP.prod),
    holRev: () => q4str(HEAP.rev),
    holAlt: () => q4str(HEAP.alt),
    evens: () => [1, 2, 3].map((n) => polyStr(EVEN[n])).join('; '),
    fusion: () => polyStr(pmulZ(EVEN[1], EVEN[2])),
    d10: () => `(${D10.map(fstr).join(', ')})`,
    d8: () => `(${quadOf(2).map(fstr).join(', ')})`,
    u4: () => spinStr(SPIN[4]),
    u8: () => spinStr(SPIN[8]),
    bell: () => s2str(BELL2),
    phi12: () => phstr(PHIPOW[12]),
    nphi12: () => fstr(phnorm(PHIPOW[12])),
    t5: () => phstr(TPHI[5]),
    schurS: () => fstr(SCH.S),
    schurY: () => fstr(over(SCH.ystar, SCH.x))
  };
  function numText(say) {
    const B = BENCH,
      bad = (n) => say(`不符 ${n} 处`, `${n} failures`);
    return say(
      `打开页面时由脚本用大整数现算，是上面各条定理与推导的个别实例，不检验定理的前提。射流：N = 1…${FRAME.jets} 的 ${B.jets} 个截断阶、${B.coeffs} 个系数上 Cos<sub>N</sub>(2Atan<sub>N</sub>)、Sin<sub>N</sub>(2Atan<sub>N</sub>) 与凯莱分数相同${bad(B.jetBad)}，复合满足凯莱方程${bad(B.odeBad)}；N ≤ ${FRAME.pyth} 时 Cos·Cos + Sin·Sin ≡ 1 ${bad(B.pythBad)}；η = 1/2 处误差比为 −1/4 ${bad(B.ratioBad)}。马青：M = 1…${FRAME.machin} 的宽度闭式${bad(B.closedBad)}，严格嵌套${bad(B.nestBad)}。上链：${B.fTried} 个顶点函数上 δ₁δ₀ = 0 ${bad(B.fBad)}，${B.eTried} 个交错边上链上 δ₂δ₁ = 0 ${bad(B.eBad)}；面值在 [−${FRAME.F}, ${FRAME.F}] 的 ${B.FTried} 个交错 2-上链、四个锥顶上 δ₁(H₂F) + H₃(δ₂F) = F ${bad(B.coneBad)}，其中 ${B.closedCount} 个闭的 F 都由 H₂F 给出原势${bad(B.exactBad)}；流群和乐 W₁·W̃₂ = Hol(∂Σ) ${B.heapOk ? '成立' : '不成立'}，颠倒乘序${B.heapRev ? '相等' : '不等'}。切比雪夫：n ≤ ${FRAME.shells}、|x| ≤ ${FRAME.xs} 的 ${B.evenTried} 对整数上 E<sub>n</sub>(x²) = U<sub>2n</sub>(x) ${bad(B.evenBad)}，m、n ≤ ${FRAME.fusion} 的 ${B.fusionTried} 对上融合律${bad(B.fusionBad)}。二次扩张：${B.s2Tried} 对 ℚ(√2) 元素上范数可乘${bad(B.s2Bad)}，u₉₀ 的 0…16 次幂模方为 1、八次幂为 1 ${B.spinOk ? '成立' : '不成立'}；n ≤ ${FRAME.phiN} 时 φⁿ = F<sub>n−1</sub> + F<sub>n</sub>φ 且 N(φⁿ) = (−1)ⁿ ${bad(B.phiBad)}。舒尔：${B.schurTried} 组半整数 a、b、c &gt; 0、x、y 上配方恒等与最小值${bad(B.schurBad)}。数值演示，不是证明。`,
      `Computed in big integers by the script when the page opens, single instances of the theorems and derivations above; it does not check their hypotheses. Jets: on ${B.jets} orders N = 1…${FRAME.jets} and ${B.coeffs} coefficients, Cos<sub>N</sub>(2Atan<sub>N</sub>) and Sin<sub>N</sub>(2Atan<sub>N</sub>) equal the Cayley fractions, ${bad(B.jetBad)}, and the composite satisfies the Cayley equations, ${bad(B.odeBad)}; Cos·Cos + Sin·Sin ≡ 1 for N ≤ ${FRAME.pyth}, ${bad(B.pythBad)}; the error ratio at η = 1/2 is −1/4, ${bad(B.ratioBad)}. Machin: the closed width for M = 1…${FRAME.machin}, ${bad(B.closedBad)}; strict nesting, ${bad(B.nestBad)}. Cochains: δ₁δ₀ = 0 on ${B.fTried} vertex functions, ${bad(B.fBad)}; δ₂δ₁ = 0 on ${B.eTried} alternating edge cochains, ${bad(B.eBad)}; δ₁(H₂F) + H₃(δ₂F) = F on ${B.FTried} alternating 2-cochains with face values in [−${FRAME.F}, ${FRAME.F}] and all four apexes, ${bad(B.coneBad)}, and each of the ${B.closedCount} closed F has the primitive H₂F, ${bad(B.exactBad)}; the heap holonomy W₁·W̃₂ = Hol(∂Σ) ${B.heapOk ? 'holds' : 'fails'}, and the reversed order is ${B.heapRev ? 'equal' : 'different'}. Chebyshev: E<sub>n</sub>(x²) = U<sub>2n</sub>(x) on ${B.evenTried} integer pairs with n ≤ ${FRAME.shells}, |x| ≤ ${FRAME.xs}, ${bad(B.evenBad)}; the fusion rule on ${B.fusionTried} pairs m, n ≤ ${FRAME.fusion}, ${bad(B.fusionBad)}. Quadratic fields: the norm multiplies on ${B.s2Tried} pairs of elements of ℚ(√2), ${bad(B.s2Bad)}; the powers 0…16 of u₉₀ have squared norm 1 and the eighth is 1: ${B.spinOk ? 'holds' : 'fails'}; φⁿ = F<sub>n−1</sub> + F<sub>n</sub>φ and N(φⁿ) = (−1)ⁿ for n ≤ ${FRAME.phiN}, ${bad(B.phiBad)}. Schur: the completed square and the minimum on ${B.schurTried} tuples of halves a, b, c &gt; 0, x, y, ${bad(B.schurBad)}. A numerical illustration, not a proof.`
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
  const plain = (x) => JSON.parse(JSON.stringify(x, (_, v) => (typeof v === 'bigint' ? String(v) : typeof v === 'function' ? undefined : v)));
  window.JETLAB_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        mode: modeOf(),
        key: railKey(),
        preset: cards.current,
        lens: state.lens,
        jmode: state.jmode,
        cmode: state.cmode,
        smode: state.smode,
        qmode: state.qmode,
        base: state.base,
        phi: state.phi,
        f: state.f,
        kdef: state.kdef,
        n: state.n,
        m: state.m,
        a: state.a,
        b: state.b,
        c: state.c,
        x: state.x,
        at: state.at,
        t: clock.t,
        max: clock.max,
        playing: clock.playing,
        cam: state.cam,
        camera: { ...sc.cam },
        ledger: { ...m, points: m.points ? m.points.map((J) => ({ N: J.N, U: J.U, V: J.V, eu: J.eu, ev: J.ev })) : undefined, F: undefined, G: undefined, orb: undefined, heap: undefined, chain: undefined, next: m.next ? { M: m.next.M, L: m.next.L, U: m.next.U } : undefined, prev: m.prev ? { M: m.prev.M, L: m.prev.L, U: m.prev.U } : undefined },
        coeffs: m.F ? { F: m.F, G: m.G } : undefined,
        roKey: $('roKey').textContent
      });
    },
    presets: plain(PRESETS),
    bench: () => plain(BENCH),
    exact: () =>
      plain({
        chain: CHAIN,
        heap: { W1: HEAP.W1, W2: HEAP.W2, prod: HEAP.prod, hol: HEAP.hol, rev: HEAP.rev, alt: HEAP.alt },
        orbitals: ORB.map((o) => ({ key: o.key, diag: o.diag, off: o.off })),
        d10: D10,
        spin: SPIN.slice(0, 9),
        bell2: BELL2,
        phi: PHIPOW.slice(0, 13),
        tphi: TPHI.slice(0, 11),
        tphi1: TPHI1.slice(0, 6),
        even: EVEN.slice(0, 7),
        brackets: range(8).map((i) => {
          const b = bracket(i + 1);
          return { M: b.M, L: b.L, U: b.U, W: b.W, below: b.below };
        })
      }),
    /** Viewport coordinates of the amber handle at the rail value v, for drag targets. */
    dragTarget: viewportPoint,
    /** Viewport coordinates of the tetrahedron vertex i (cone card). */
    vertexTarget: (i) => {
      const q = sc.p(scale(TV[i], 1.012)),
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
