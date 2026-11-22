/* OMEGA//RATIONAL · 无常数母公理与有理真球 · Constant-free AXIOM-Ω and the rational sphere (Chapter 39, §39.6)
   World (kit.solid): z up. The stage is the unit sphere of the slice span{1, i, j} of the quaternions: world x is the
   real part (the unit 1 = x₀), world y the i part and world z the j part, so the equator z = 0 is the complex line
   ℂ = span{1, i}. Five scenes share the sphere, one per card:
     pi     a regular N-gon on the equator and an inscribed flat geodesic polyhedron (ν = 1 … 4): the magenta segments
            between chords and arcs (sagitta 1 − cos(π/N)) and the magenta defect cones of the vertices (Σδ = 4π);
     euler  N flat tangent steps (1 + iθ/N)^k leave the unit circle; the one Cayley step Q(σ) with σ = u·i,
            u = tan(θ/2), is the second point of the line from −1 through σ and stays on the circle;
     cheb   the heap x_{n+2} = x_{n+1} xₙ* x_{n+1} from x₀ = 1 and x₁ with κ(x₀, x₁) = κ₁, computed by products only:
            κ₂ = (2κ₁ − 1)², κ₃ = κ₁(4κ₁ − 3)²;
     phi    the regular tetrahedron (six edges at κ = 1/3) and the five-step heap on the equator, which closes (besides the
            motionless κ₁ = 1) only at the irrational roots of 16κ² − 12κ + 1 = 0;
     pure   rational Cayley points Q(σ) on the lit sphere, the rings κ(1, ·) = 1/2, 1/3, 1/4 and a probe Q(σ) with σ in
            (ℤ/6)²; λ fades out the flat scaffold of the other scenes.
   The rail runs over t ∈ [0, 1] and drives the parameter of the scene: N = 3 + 45t, θ = πt, κ₁ = 1 − t, λ = t.
   Every number is computed here; the instances of the cited Lean theorems are in instances(), the numbers of the NUM box and
   of the drawer in benchmarks() (none of them is written in the sources).
   Read-only probe: window.RATIONAL_DEBUG. */
(() => {
  'use strict';
  const { kit, L, palette: P } = TRV;
  const $ = (id) => document.getElementById(id);
  const PI = Math.PI,
    TAU = 2 * PI,
    deg = PI / 180,
    PHI = (1 + Math.sqrt(5)) / 2,
    KSTAR = (PHI + 1) / 4,
    KCONJ = (2 - PHI) / 4;
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

  /* ---------- exact numbers: a double and a printed decimal as fractions [p, q] of integers ----------
     A printed relation is decided on fractions, never on rounded doubles. */
  /** The double x itself: an integer over a power of two (null when it is not finite). */
  const ratio = (x) => {
    if (!Number.isFinite(x)) return null;
    let s = 0n;
    for (; !Number.isInteger(x); s++) x *= 2;
    return [BigInt(x), 1n << s];
  };
  /** n·10^e. */
  const decimal = (n, e) => (e < 0 ? [BigInt(n), 10n ** BigInt(-e)] : [BigInt(n) * 10n ** BigInt(e), 1n]);
  /** The sign of a − b. */
  const cmp = ([a, b], [c, d]) => (a * d < c * b ? -1 : a * d > c * b ? 1 : 0);
  const rval = ([p, q]) => Number(p) / Number(q);
  /** Four ulps of 1: how near a landmark of the rail its own double, the round trip of the rail and the steps of the keys come. */
  const ULPS = 4 * Number.EPSILON;
  /** A side of an inequality computed in a few dozen operations is widened by this much of its size, then rounded outwards. */
  const GUARD = 64 * Number.EPSILON;

  /** The largest integer n with n/10^d ≤ x. */
  const floorAt = (x, d) => {
    const [p, q] = ratio(x),
      n = p * 10n ** BigInt(d);
    return Number((n - (((n % q) + q) % q)) / q);
  };
  /** The two sides of an inequality are rounded outwards: fmtFloor never prints more than x, fmtCeil never less. */
  const fmtFloor = (x, d = 4) => fmt(floorAt(x, d) / 10 ** d, d);
  const fmtCeil = (x, d = 4) => fmt(-floorAt(-x, d) / 10 ** d, d);
  const superscript = (n) => String(n).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
  const subscript = (n) => String(n).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d]);
  const power = (e) => `×10${superscript(e)}`;
  /** Four significant digits, decimals for the sizes 10⁻³ … 10³ and a power of ten for the others: the nearest (dir = 0), never
      more than x (dir = −1), never less (dir = 1). Only 0 is written 0. */
  const digits = (x, dir) => {
    if (!Number.isFinite(x)) return '∞';
    if (x === 0) return '0';
    const size = Math.floor(Math.log10(Math.abs(x)));
    if (Math.abs(size) <= 3) return (dir < 0 ? fmtFloor : dir > 0 ? fmtCeil : fmt)(x, Math.max(4, 3 - size));
    const [m, k] = x.toExponential(3).split('e').map(Number);
    let n = Math.round(m * 1000),
      e = k - 3;
    if (dir * cmp(ratio(x), decimal(n, e)) > 0) {
      // the nearest digits lie on the wrong side: one unit of the last of them
      n += dir;
      if (Math.abs(n) < 1000) [n, e] = [Math.sign(x) * 9999, e - 1];
      else if (Math.abs(n) > 9999) [n, e] = [Math.sign(x) * 1000, e + 1];
    }
    return kit.fix(n / 1000, 3) + power(e + 3);
  };
  const sci = (x) => digits(x, 0),
    sciFloor = (x) => digits(x, -1),
    sciCeil = (x) => digits(x, 1);
  /** The same for a positive number too small for a double, known by its decimal logarithm (good to 10⁻¹¹). */
  const TINY = 1e-290;
  const digitsOfLog = (lg, dir) => {
    let e = Math.floor(lg),
      n = 1000 * 10 ** (lg - e);
    n = dir < 0 ? Math.floor(n * (1 - 1e-10)) : dir > 0 ? Math.ceil(n * (1 + 1e-10)) : Math.round(n);
    if (n < 1000) [n, e] = [9999, e - 1];
    else if (n > 9999) [n, e] = [1000, e + 1];
    return kit.fix(n / 1000, 3) + power(e);
  };

  /* ---------- the relation before a printed number: one rule for the whole page ----------
     “=” stands before an exact name (a fraction, a value written with φ) and before digits that are the value itself, as a
     fraction; digits that only round the value stand after “≈”. Digits that are all 0 are written of 0 alone: a smaller value
     than the decimals show is written in significant digits. No relation is written any other way. */
  /** The decimal a printed text names (0.0205, −6.429×10⁻⁸): as a fraction, and as the nearest double. */
  const exponentOf = (e) => Number(e.replace('⁻', '-').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'.indexOf(d)));
  const printedRatio = (s) => {
    const [m, e = '⁰'] = s.replace('−', '-').split('×10'),
      [whole, part = ''] = m.split('.');
    return decimal(whole + part, exponentOf(e) - part.length);
  };
  const printedValue = (s) => {
    const [m, e = '⁰'] = s.replace('−', '-').split('×10');
    return Number(`${m}e${exponentOf(e)}`);
  };
  /** The digits s of a value that is the fraction q; q = null: a value known to be irrational, which no digits are. */
  const rel = (q, s) => `${q && cmp(q, printedRatio(s)) === 0 ? '=' : '≈'} ${s}`;
  /** The value q, val as a double, in four significant digits; in d decimals, or in significant digits when they would all be 0. */
  const ratSci = (q, val) => rel(q, sci(val));
  const ratRel = (q, val, d = 4) => {
    const s = fmt(val, d);
    return val !== 0 && printedValue(s) === 0 ? ratSci(q, val) : rel(q, s);
  };
  /** sym: the exact name of the value, or null; then val in d decimals, “=” only when the double val is that decimal. */
  const eqRel = (sym, val, d = 4) => (sym != null ? `= ${sym}` : ratRel(ratio(val), val, d));
  const sciRel = (val) => ratSci(ratio(val), val);
  const irrRel = (val, d = 4) => ratRel(null, val, d);
  /** A quantity that is identically c: its exact digits, once the value computed here agrees to 10⁻¹². */
  const idRel = (c, val) => (Math.abs(val - c) <= 1e-12 ? eqRel(fmt(c), c) : eqRel(null, val));
  /** The least power of ten above a drift x ≥ 0, after its sign; “= 0” of 0 alone. */
  const below = (x) => {
    if (x === 0) return '= 0';
    let e = Math.ceil(Math.log10(x));
    while (cmp(ratio(x), decimal(1, e)) >= 0) e++;
    while (cmp(ratio(x), decimal(1, e - 1)) < 0) e--;
    return `&lt; 10${superscript(e)}`;
  };
  /** Digits known to round the value (an irrational one, one below the doubles). */
  const approx = (s) => `≈ ${s}`;
  /** An angle in degrees (a double that is the angle itself on the grid of eulerDeg), 0° of 0 alone: below 0.01° in significant
      digits, below 1° in two decimals at least. */
  const degRel = (val, d = 2) => `${val > 0 && val < 0.01 ? approx(sci(val)) : eqRel(null, val, d < 2 && val > 0 && val < 1 ? 2 : d)}°`;
  /** The printed value alone, without its relation. */
  const bare = (rel) => rel.slice(2);

  /* ---------- exact fractions (small integers) ---------- */
  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) [a, b] = [b, a % b];
    return a;
  };
  const frac = (p, q) => {
    if (q < 0) {
      p = -p;
      q = -q;
    }
    const g = gcd(p, q) || 1;
    return [p / g, q / g];
  };
  const fstr = ([p, q]) => (q === 1 ? String(p).replace('-', '−') : `${p < 0 ? '−' : ''}${Math.abs(p)}/${q}`);
  const fval = ([p, q]) => p / q;

  /* ---------- quaternions [w, x, y, z]: the slice span{1, i, j} is the world (w, x, y) ---------- */
  const qmul = (a, b) => [
    a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
    a[0] * b[1] + a[1] * b[0] + a[2] * b[3] - a[3] * b[2],
    a[0] * b[2] - a[1] * b[3] + a[2] * b[0] + a[3] * b[1],
    a[0] * b[3] + a[1] * b[2] - a[2] * b[1] + a[3] * b[0]
  ];
  const qinv = (a) => scale([a[0], -a[1], -a[2], -a[3]], 1 / dot(a, a));
  /** The heap bracket of the unit-quaternion model, [x, y, z] = x y⁻¹ z. On unit quaternions y⁻¹ = y*, the conjugate; dividing by ‖y‖²
      keeps the rounding of a long orbit bounded (with y* alone the norm error grows by 1 + √2 per step). */
  const heap = (x, y, z) => qmul(qmul(x, qinv(y)), z);
  const kappa = (x, y) => (1 + dot(x, y)) / 2;
  /** A quaternion of the slice as a world point. */
  const W = (q) => [q[0], q[1], q[2]];
  /** Cayley: Q(σ) = ((1 − ‖σ‖²) + 2σ)/(1 + ‖σ‖²) for a pure quaternion σ = [σi, σj, σk]. */
  const cayley = (s) => {
    const n2 = dot(s, s);
    return [(1 - n2) / (1 + n2), (2 * s[0]) / (1 + n2), (2 * s[1]) / (1 + n2), (2 * (s[2] || 0)) / (1 + n2)];
  };

  /* ---------- the flat geodesic polyhedra: Class I subdivisions of the icosahedron, vertices on the sphere ---------- */
  const icosa = (() => {
    const V = [];
    for (const a of [-1, 1]) for (const b of [-1, 1]) V.push([0, a, b * PHI], [a, b * PHI, 0], [b * PHI, 0, a]);
    const U = V.map(unit),
      F = [];
    const edge = Math.min(...U.slice(1).map((v) => norm(sub(v, U[0]))));
    const adj = (i, j) => Math.abs(norm(sub(U[i], U[j])) - edge) < 1e-9;
    for (let i = 0; i < 12; i++)
      for (let j = i + 1; j < 12; j++)
        for (let k = j + 1; k < 12; k++)
          if (adj(i, j) && adj(j, k) && adj(i, k)) F.push(dot(cross(sub(U[j], U[i]), sub(U[k], U[i])), U[i]) > 0 ? [i, j, k] : [i, k, j]);
    return { V: U, F };
  })();
  /** The κ of neighbouring, of separated (non-antipodal) and of antipodal vertices of the regular icosahedron, and the numbers of
      triangles that meet at its vertices. */
  const icoKappa = (() => {
    const all = icosa.V.slice(1).map((v) => (1 + dot(v, icosa.V[0])) / 2).sort((a, b) => b - a),
      ks = all.filter((k) => k > 1e-9 && k < 1 - 1e-9);
    return { near: ks[0], far: ks[ks.length - 1], count: ks.length, anti: all[all.length - 1], faces: icosa.V.map((_, i) => icosa.F.filter((f) => f.includes(i)).length) };
  })();
  const angleAt = (p, a, b) => {
    const u = sub(a, p),
      v = sub(b, p);
    return Math.acos(clamp(dot(u, v) / (norm(u) * norm(v)), -1, 1));
  };
  /** The rank over ℤ₂ of the face-boundary map ∂ : ℤ₂^F → ℤ₂^E (each face goes to its three edges). */
  function boundaryRank(faces, edgeIndex, E) {
    const words = Math.ceil(faces.length / 32),
      rows = Array.from({ length: E }, () => new Uint32Array(words));
    faces.forEach((f, fi) => {
      for (let t = 0; t < 3; t++) rows[edgeIndex(f[t], f[(t + 1) % 3])][fi >> 5] ^= 1 << (fi & 31);
    });
    let rank = 0;
    for (let col = 0; col < faces.length && rank < E; col++) {
      const w = col >> 5,
        bit = 1 << (col & 31);
      let piv = -1;
      for (let r = rank; r < E; r++)
        if (rows[r][w] & bit) {
          piv = r;
          break;
        }
      if (piv < 0) continue;
      [rows[rank], rows[piv]] = [rows[piv], rows[rank]];
      for (let r = 0; r < E; r++) if (r !== rank && rows[r][w] & bit) for (let k = 0; k < words; k++) rows[r][k] ^= rows[rank][k];
      rank++;
    }
    return rank;
  }
  const geoCache = new Map();
  function geodesic(nu, withRank = true) {
    const key = nu + (withRank ? 'r' : '');
    if (geoCache.has(key)) return geoCache.get(key);
    const verts = [],
      ids = new Map();
    const id = (p) => {
      const q = unit(p),
        k = q.map((x) => Math.round(x * 1e9)).join(',');
      if (!ids.has(k)) {
        ids.set(k, verts.length);
        verts.push(q);
      }
      return ids.get(k);
    };
    const faces = [];
    for (const [a, b, c] of icosa.F) {
      const A = icosa.V[a],
        B = icosa.V[b],
        C = icosa.V[c];
      const at = (i, j) => id([0, 1, 2].map((t) => (i * A[t] + j * B[t] + (nu - i - j) * C[t]) / nu));
      for (let i = 0; i < nu; i++)
        for (let j = 0; j < nu - i; j++) {
          faces.push([at(i, j), at(i + 1, j), at(i, j + 1)]);
          if (i + j < nu - 1) faces.push([at(i + 1, j), at(i + 1, j + 1), at(i, j + 1)]);
        }
    }
    const around = new Float64Array(verts.length);
    for (const f of faces) for (let t = 0; t < 3; t++) around[f[t]] += angleAt(verts[f[t]], verts[f[(t + 1) % 3]], verts[f[(t + 2) % 3]]);
    const defects = Array.from(around, (s) => TAU - s);
    const edges = new Map();
    const edgeIndex = (a, b) => {
      const k = a < b ? a * 100000 + b : b * 100000 + a;
      if (!edges.has(k)) edges.set(k, edges.size);
      return edges.get(k);
    };
    for (const f of faces) for (let t = 0; t < 3; t++) edgeIndex(f[t], f[(t + 1) % 3]);
    const E = edges.size;
    let sum = 0,
      max = 0;
    for (const d of defects) {
      sum += d;
      max = Math.max(max, d);
    }
    const g = {
      nu,
      verts,
      faces,
      defects,
      V: verts.length,
      E,
      F: faces.length,
      sum,
      max,
      nu2max: nu * nu * max,
      rank: withRank ? boundaryRank(faces, edgeIndex, E) : null
    };
    geoCache.set(key, g);
    return g;
  }
  /** The largest vertex defect of a finer dome, computed once: ν = 30 (9002 vertices). */
  let fineDome = null;
  const fine = () => fineDome || (fineDome = geodesic(30, false));
  /** The four domes of the chips: V − E + F, the ℤ₂ rank of the face boundary, the defect sum and ν²·largest defect. */
  let domeTable = null;
  const domes = () => domeTable || (domeTable = [1, 2, 3, 4].map((nu) => {
    const g = geodesic(nu);
    return { nu, V: g.V, E: g.E, F: g.F, chi: g.V - g.E + g.F, rank: g.rank, sumDeg: g.sum / deg, nu2max: g.nu2max };
  }));

  /* ---------- the series of the Dottie number: the compositional inverse of 2X + 2 arcsin X (rational coefficients) ---------- */
  const SERIES = 61;
  let dottieCache = null;
  function dottie() {
    if (dottieCache) return dottieCache;
    // forward f(z) = 2z + 2 arcsin z, arcsin coefficients C(2k, k)/(4^k (2k + 1)) on z^(2k+1)
    const f = new Float64Array(SERIES + 2);
    let c = 1;
    for (let k = 0; 2 * k + 1 <= SERIES + 1; k++) {
      if (k > 0) c *= ((2 * k - 1) * (2 * k)) / (k * k * 4);
      f[2 * k + 1] = (2 * c) / (2 * k + 1);
    }
    f[1] += 2;
    // Lagrange inversion: b_n = [z^(n−1)] (z/f(z))^n / n, with h = z/f(z) = 1/(f₁ + f₂ z + …)
    const g = new Float64Array(SERIES + 1),
      h = new Float64Array(SERIES + 1),
      q = new Float64Array(SERIES + 1);
    for (let k = 0; k <= SERIES; k++) q[k] = f[k + 1];
    h[0] = 1 / q[0];
    for (let k = 1; k <= SERIES; k++) {
      let s = 0;
      for (let j = 1; j <= k; j++) s += q[j] * h[k - j];
      h[k] = -s / q[0];
    }
    let pow = new Float64Array(SERIES + 1);
    pow[0] = 1;
    for (let n = 1; n <= SERIES; n++) {
      const next = new Float64Array(SERIES + 1);
      for (let i = 0; i <= SERIES; i++) if (pow[i]) for (let j = 0; i + j <= SERIES; j++) next[i + j] += pow[i] * h[j];
      pow = next;
      g[n] = pow[n - 1] / n;
    }
    let theta = 0.7;
    for (let k = 0; k < 200; k++) theta = cs(theta);
    const partial = [];
    let s = 0,
      pk = 1;
    for (let n = 0; n <= SERIES; n++) {
      s += g[n] * pk;
      pk *= PI;
      partial.push(s);
    }
    dottieCache = { coeffs: Array.from(g), partial, theta, sum: s, gap: Math.abs(s - theta), fixed: Math.abs(cs(theta) - theta) };
    return dottieCache;
  }

  /** The coefficients b₀ … b_n of the same series as fractions of integers in lowest terms, by the same Lagrange inversion. */
  function dottieExact(n) {
    const low = ([p, q]) => {
        let [a, b] = [p < 0n ? -p : p, q];
        while (b) [a, b] = [b, a % b];
        return [p / a, q / a];
      },
      plus = ([a, b], [c, d]) => low([a * d + c * b, b * d]),
      times = ([a, b], [c, d]) => low([a * c, b * d]),
      zero = () => Array.from({ length: n + 1 }, () => [0n, 1n]);
    // q_k = f_{k+1}: f₁ = 4 and f_{2k+1} = 2·C(2k, k)/(4^k (2k + 1)); h = 1/q
    const q = zero(),
      h = zero();
    let c = [1n, 1n];
    for (let k = 0n; 2n * k <= BigInt(n); k++) {
      if (k > 0n) c = times(c, [2n * k - 1n, 2n * k]);
      q[Number(2n * k)] = plus(times(c, [2n, 2n * k + 1n]), [k ? 0n : 2n, 1n]);
    }
    h[0] = low([q[0][1], q[0][0]]);
    for (let k = 1; k <= n; k++) {
      let s = [0n, 1n];
      for (let j = 1; j <= k; j++) s = plus(s, times(q[j], h[k - j]));
      h[k] = times([-s[0], s[1]], h[0]);
    }
    const g = zero();
    let pow = zero();
    pow[0] = [1n, 1n];
    for (let m = 1; m <= n; m++) {
      const next = zero();
      for (let i = 0; i <= n; i++) if (pow[i][0]) for (let j = 0; i + j <= n; j++) next[i + j] = plus(next[i + j], times(pow[i], h[j]));
      pow = next;
      g[m] = times(pow[m - 1], [1n, BigInt(m)]);
    }
    return g.map((r) => r.map(Number));
  }

  /* ---------- Fibonacci and the rational κ values of the cards ---------- */
  const FIB = [0, 1];
  while (FIB.length < 40) FIB.push(FIB[FIB.length - 1] + FIB[FIB.length - 2]);
  /** The Fibonacci step κ_n = F_{n+2}/(4F_n), a rational below or above (φ + 1)/4. */
  const fibK = (n) => frac(FIB[n + 2], 4 * FIB[n]);
  const CHEB_CHIPS = [
    [1, 1],
    [3, 4],
    [1, 2],
    [1, 3],
    [1, 4],
    [0, 1]
  ];
  /** The exact name of κ₁ when it is one of the named values, else null: within a few ulps only, so that no other value of the
      rail is taken for one (10⁻¹⁵ beside 1/4 is not 1/4). */
  function exactK(k) {
    if (Math.abs(k - KSTAR) <= ULPS) return { kind: 'phi' };
    if (Math.abs(k - KCONJ) <= ULPS) return { kind: 'conj' };
    for (let n = 1; n <= 20; n++) if (Math.abs(k - fval(fibK(n))) <= ULPS) return { kind: 'fib', n, q: fibK(n) };
    for (const r of CHEB_CHIPS) if (Math.abs(k - fval(r)) <= ULPS) return { kind: 'rat', q: r };
    return null;
  }
  /** The κ₁ whose heap returns to x₀, with the step of the first return and θ₁ = arccos(2κ₁ − 1) in degrees. By Niven a rational
      κ₁ ∉ {0, 1/4, 1/2, 3/4, 1} never returns; the two roots of 16κ² − 12κ + 1 return at step 5. A chord computed in doubles
      proves no return: only an exact κ₁ has one. */
  const CLOSING = [
    { k: 1, step: 1, deg: 0 },
    { k: 0, step: 2, deg: 180 },
    { k: 0.25, step: 3, deg: 120 },
    { k: 0.5, step: 4, deg: 90 },
    { k: 0.75, step: 6, deg: 60 },
    { kind: 'phi', step: 5, deg: 72 },
    { kind: 'conj', step: 5, deg: 144 }
  ];
  const closing = (ex) => (ex && CLOSING.find((c) => (ex.q ? c.k === fval(ex.q) : c.kind === ex.kind))) || null;
  /** How many steps of an orbit are looked at for a return. */
  const ORBIT = 240;
  /** The first n ≤ ORBIT with xₙ = x₀ on the heap of the rational κ₁ = p/q, 0 when there is none: xₙ = x₀ ⇔ Tₙ(c) = 1 at c = (2p − q)/q,
      and Aₙ = qⁿTₙ(c) is the integer recursion A₀ = 1, A₁ = 2p − q, Aₙ₊₁ = 2(2p − q)Aₙ − q²Aₙ₋₁. */
  function firstReturn(p, q) {
    const c = BigInt(2 * p - q),
      d = BigInt(q);
    let a = 1n,
      b = c,
      top = d;
    for (let n = 1; n <= ORBIT; n++) {
      if (b === top) return n;
      [a, b] = [b, 2n * c * b - d * d * a];
      top *= d;
    }
    return 0;
  }
  /** κ₁, κ₂ = (2κ₁ − 1)², κ₃ = κ₁(4κ₁ − 3)², P = 16κ₁² − 12κ₁ + 1 and the five-step gap 1 − κ(x₀, x₅) = (1 − T₅(2κ₁ − 1))/2 =
      (1 − κ₁)P² as fractions, of the named κ₁ or of the double itself; null at the two irrational roots, where P = 0. */
  function heapRatios(k1, ex) {
    const named = ex ? (ex.q ? ex.q.map(BigInt) : null) : ratio(k1);
    if (!named) return null;
    const [p, q] = named,
      c = 2n * p - q,
      d = 4n * p - 3n * q,
      P = 16n * p * p - 12n * p * q + q * q;
    return { k1: named, k2: [c * c, q * q], k3: [p * d * d, q ** 3n], P: [P, q * q], gap: [(q - p) * P * P, q ** 5n] };
  }

  /** The rational value that names κ₁ (1, 3/4, …, 0), or null. */
  const namedK = (m) => (m.heap.exact && m.heap.exact.q ? fval(m.heap.exact.q) : null);
  /** σ = u·i is i, the point Q(σ) itself, only at θ = 90°. */
  const isExactI = (th) => Math.abs(th - PI / 2) <= ULPS;
  /** θ on the grid of the slider, the keys and the handle, the quarter degrees: the one double that stands for k/4 degrees. */
  const gridTheta = (k) => (k / 720) * PI;
  /** θ in degrees: the quarter degree itself on the grid (0, 90 and 180 too), elsewhere a double that rounds it. */
  const eulerDeg = (th) => {
    const k = Math.round((th / PI) * 720);
    return th === gridTheta(k) ? k / 4 : (th / PI) * 180;
  };
  /** The Fibonacci step n: q = F_{n+1}/F_n, the ±1 of Cassini, and the two sides of Hurwitz, |φ − q| = φ^{−n}/F_n (without the
      cancellation of the difference) above 1/(√5F_n² + F_n). Their margin, by Binet (√5F_n = φⁿ − (−φ)^{−n}), is
      (1 − (−φ)^{−n})/(φⁿ(√5F_n² + F_n)) > 0, a product of positive factors that again loses no digit. Each of the three is
      enclosed, [Lo, Hi] by GUARD (for n ≤ 30 they take 2n and a few roundings). */
  function fibFacts(n) {
    const F = FIB[n],
      den = Math.sqrt(5) * F ** 2 + F,
      dist = PHI ** -n / F,
      bound = 1 / den,
      gap = (1 - (n % 2 ? -1 : 1) * PHI ** -n) / (PHI ** n * den);
    return {
      n,
      q: frac(FIB[n + 1], F),
      cassini: F * FIB[n + 2] - FIB[n + 1] ** 2,
      P: frac(n % 2 ? -1 : 1, F ** 2),
      dist,
      distLo: dist * (1 - GUARD),
      distHi: dist * (1 + GUARD),
      bound,
      boundLo: bound * (1 - GUARD),
      boundHi: bound * (1 + GUARD),
      gap,
      gapLo: gap * (1 - GUARD),
      gapHi: gap * (1 + GUARD)
    };
  }

  /* ---------- the state, the scenes and the clock map ---------- */
  const SCENES = ['pi', 'euler', 'cheb', 'phi', 'pure'];
  const MAP = {
    pi: { get: (t) => 3 + Math.round(45 * t), t: (N) => (N - 3) / 45, step: 1 / 45, rate: 1 / 30 },
    euler: { get: (t) => PI * t, t: (th) => th / PI, step: 1 / 180, rate: 1 / 5 },
    cheb: { get: (t) => 1 - t, t: (k) => 1 - k, step: 1 / 100, rate: 0.3 },
    phi: { get: (t) => 1 - t, t: (k) => 1 - k, step: 1 / 100, rate: 0.15 },
    pure: { get: (t) => t, t: (l) => l, step: 1 / 20, rate: 0.4 }
  };
  const PARAM = { pi: 'N', euler: 'theta', cheb: 'k1', phi: 'k1', pure: 'lambda' };
  /** The parameter of scene s at t. Within a few ulps of a named κ₁ or of a quarter degree (90° and 180° too) it is that value
      itself; θ = 0, λ = 0 and λ = 1 are themselves at the ends of the rail only. */
  function paramAt(s, t) {
    const v = MAP[s].get(t);
    if (s === 'euler') {
      const k = Math.round(720 * t);
      return k > 0 && Math.abs(v - gridTheta(k)) <= ULPS ? gridTheta(k) : v;
    }
    if (PARAM[s] !== 'k1') return v;
    const ex = exactK(v);
    return !ex ? v : ex.kind === 'phi' ? KSTAR : ex.kind === 'conj' ? KCONJ : fval(ex.q);
  }
  const state = { scene: 'pi', nu: 1, N: 6, theta: PI / 2, k1: 0.25, lambda: 1, probe: [-6, 6], lens: 0, from: null, blend: 1 };

  /** The frame of a state: the one of the page, or any other (the benchmarks of the NUM box). */
  function compute(at = state) {
    const N = at.N,
      th = at.theta,
      k1 = at.k1,
      lam = at.lambda;
    // π: the polygon and the polyhedron
    const half = PI / N,
      sag = N === 3 ? 0.5 : 1 - cs(half); // 1 − cos(π/N) is rational at N = 3 alone
    const G = geodesic(at.nu);
    const kN = (1 + cs((2 * PI) / N)) / 2,
      kNq = { 3: [1, 4], 4: [1, 2], 6: [3, 4] }[N] || null;
    // e: N tangent steps against the one Cayley step
    const euler = [[1, 0]];
    for (let k = 1; k <= N; k++) {
      const [a, b] = euler[k - 1];
      euler.push([a - (b * th) / N, b + (a * th) / N]);
    }
    const zN = euler[N],
      z2 = zN[0] * zN[0] + zN[1] * zN[1];
    const atPi = th >= PI,
      u = atPi ? Infinity : isExactI(th) ? 1 : Math.tan(th / 2);
    // (θ = 180° is no point of the chart: −1 is the limit of Q(u·i) as u → +∞, the value of Q at no finite σ)
    const Q = atPi ? [-1, 0, 0, 0] : cayley([u, 0, 0]);
    const qNorm2 = dot(Q, Q);
    // χ: the heap from x₀ = 1 and x₁ with κ(x₀, x₁) = κ₁, by products only (one square root, no angle)
    const c = 2 * k1 - 1,
      s = 2 * Math.sqrt(Math.max(0, k1 * (1 - k1)));
    const xs = [
      [1, 0, 0, 0],
      [c, s, 0, 0]
    ];
    while (xs.length <= ORBIT) xs.push(heap(xs[xs.length - 1], xs[xs.length - 2], xs[xs.length - 1]));
    const k2 = kappa(xs[0], xs[2]),
      k3 = kappa(xs[0], xs[3]),
      k5 = kappa(xs[0], xs[5]);
    const c1 = dot(xs[0], xs[1]),
      c2 = dot(xs[0], xs[2]),
      c12 = dot(xs[1], xs[2]);
    const det3 = 1 + 2 * c1 * c2 * c12 - c12 * c12 - c2 * c2 - c1 * c1;
    const exact = exactK(k1),
      close = closing(exact),
      period = close ? close.step : 0;
    // elsewhere the orbit never returns: the step of the first ORBIT that comes nearest to x₀ (the first of those that the
    // rounding of the orbit, below 10⁻¹², cannot tell apart) and its chord
    let near = null;
    if (!period) {
      const chords = xs.slice(1).map((x) => norm(sub(x, xs[0]))),
        least = Math.min(...chords),
        n = chords.findIndex((c) => c <= least + 1e-12);
      near = { n: n + 1, chord: chords[n] };
    }
    // P and the gap from their fractions: near a root the doubles would cancel. At the two irrational roots P = 0 (a double only
    // comes near them); at κ₁ = 1 the factor 1 − κ₁ is 0 and P = 5.
    const exactHeap = heapRatios(k1, exact),
      P5 = exactHeap ? rval(exactHeap.P) : 0,
      gap5 = exactHeap ? rval(exactHeap.gap) : 0;
    // the probe of the pure scene, σ = (a/6, b/6): Q(σ) with integer arithmetic
    const [pa, pb] = at.probe,
      n2 = pa * pa + pb * pb;
    const probe = {
      sigma: [frac(pa, 6), frac(pb, 6)],
      coords: [frac(36 - n2, 36 + n2), frac(12 * pa, 36 + n2), frac(12 * pb, 36 + n2)],
      kappa: frac(36, 36 + n2),
      // ‖Q‖² − 1 over the common denominator (36 + n2)², an integer: (36 − n2)² + 144 n2 − (36 + n2)²
      residue: (36 - n2) * (36 - n2) + 144 * n2 - (36 + n2) * (36 + n2)
    };
    probe.point = probe.coords.map(fval);
    return {
      scene: at.scene,
      N,
      nu: at.nu,
      theta: th,
      thetaDeg: eulerDeg(th),
      k1,
      lambda: lam,
      pi: { half, sag, acc: N * sag, lo: N * (half ** 2 / 2 - half ** 4 / 24), hi: (N * half ** 2) / 2, kN, kNq, V: G.V, E: G.E, F: G.F, sum: G.sum, sumDeg: G.sum / deg, max: G.max, nu2max: G.nu2max, rank: G.rank, chi: G.V - G.E + G.F },
      // (below the doubles the excess is θ²/N, kept as its logarithm)
      euler: { pts: euler, zN, z2, excess: Math.expm1(N * Math.log1p((th * th) / (N * N))), lgExcess: th > 0 ? 2 * Math.log10(th) - Math.log10(N) : null, arg: Math.atan2(zN[1], zN[0]), argDeg: Math.atan2(zN[1], zN[0]) / deg, u, Q, qNorm2, atPi, compound: Math.pow(1 + 1 / N, N) },
      heap: { c, s, xs: xs.slice(0, 25), k2, k3, k5, k2law: c * c, k3law: k1 * (4 * k1 - 3) ** 2, det3, detLaw: 4 * (1 - k2) * (k2 - c * c), period, near, exact, P: P5, gap: gap5 },
      probe
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
  /** exp_remainder_le on x = iθ in ℂ, r = θ, n = N: the remainder is θᴺ/N! times S = Σ_{j ≥ 0} (iθ)ʲ·N!/(N + j)!, |S| ≤ 1 ≤ B =
      1/(1 − θ/(N + 1)), summed from its first term on, for the difference e^{iθ} − Σ_{k<N} would lose every digit at large N.
      B is written 1 + x/(1 − x), x = θ/(N + 1): 1 − x is 1 to the doubles for a small x. The remainder `left` and the bound `right`
      are enclosed, [Lo, Hi] (θᴺ/N! takes 2N roundings, the rest a few dozen). The logarithms say both where θᴺ/N! is too small for
      a double; that of the bound is widened by its own error, upwards. */
  function expTail(N, th) {
    let first = 1,
      lgFact = 0; // log N!, summed apart: small terms taken one by one from a large logarithm would lose digits of it
    for (let k = 1; k <= N; k++) {
      first *= th / k;
      lgFact += Math.log10(k);
    }
    const lgFirst = N * Math.log10(th) - lgFact;
    let rr = 0,
      ri = 0,
      qr = 1,
      qi = 0;
    for (let k = N; k < N + 80; k++) {
      rr += qr;
      ri += qi;
      [qr, qi] = [(-qi * th) / (k + 1), (qr * th) / (k + 1)];
      if (Math.abs(qr) + Math.abs(qi) <= 1e-300) break;
    }
    const S = hypot(rr, ri),
      x = th / (N + 1),
      bound = first * (1 + x / (1 - x)),
      left = first * S,
      guard = (8 * N + 64) * Number.EPSILON;
    return {
      left,
      leftLo: left * (1 - guard),
      leftHi: left * (1 + guard),
      right: bound,
      rightLo: bound * (1 - guard),
      rightHi: bound * (1 + guard),
      r: th,
      n: N,
      lgLeft: th > 0 ? lgFirst + Math.log10(S) : null,
      lgRight: th > 0 ? lgFirst - Math.log1p(-x) / Math.LN10 + 1e-11 : null
    };
  }
  function instances(m) {
    const xs = m.heap.xs,
      c = m.heap.c;
    // normSq_and_chebyshev on x₀ … x₁₂
    let chebNorm = 0,
      chebRec = 0,
      chebDot = 0;
    for (let n = 0; n <= 12; n++) {
      chebNorm = Math.max(chebNorm, Math.abs(dot(xs[n], xs[n]) - 1));
      chebDot = Math.max(chebDot, Math.abs(dot(xs[0], xs[n]) - chebT(n, c)));
      if (n < 12) chebRec = Math.max(chebRec, norm(sub(xs[n + 1], sub(scale(xs[1], chebU(n, c)), scale(xs[0], chebU(n - 1, c))))));
    }
    // kappa_eq_one_sub_dist_sq on the heap and on the probe
    let distGap = 0;
    for (let n = 1; n <= 6; n++) distGap = Math.max(distGap, Math.abs(kappa(xs[0], xs[n]) - (1 - dot(sub(xs[0], xs[n]), sub(xs[0], xs[n])) / 4)));
    const pq = [...m.probe.point, 0],
      probeDist = Math.abs(kappa([1, 0, 0, 0], pq) - (1 - dot(sub([1, 0, 0, 0], pq), sub([1, 0, 0, 0], pq)) / 4));
    // three_anchor_gram_det_formula on x₀, x₁, x₂
    const [u, v, w] = [xs[0], xs[1], xs[2]];
    const g = [
      [dot(u, u), dot(u, v), dot(u, w)],
      [dot(v, u), dot(v, v), dot(v, w)],
      [dot(w, u), dot(w, v), dot(w, w)]
    ];
    const det = g[0][0] * (g[1][1] * g[2][2] - g[1][2] * g[2][1]) - g[0][1] * (g[1][0] * g[2][2] - g[1][2] * g[2][0]) + g[0][2] * (g[1][0] * g[2][1] - g[1][1] * g[2][0]);
    const formula = dot(u, u) * dot(v, v) * dot(w, w) + 2 * dot(u, v) * dot(u, w) * dot(v, w) - dot(u, u) * dot(v, w) ** 2 - dot(v, v) * dot(u, w) ** 2 - dot(w, w) * dot(u, v) ** 2;
    // accumulated_sagitta_bounds with σ = π, T = 1, α = 1: the two bounds enclosed outwards
    const sag = { lo: m.pi.lo * (1 - GUARD), value: m.pi.acc, hi: m.pi.hi * (1 + GUARD) };
    const tail = expTail(m.N, m.theta);
    // cayley_ratio_norm_one_iff_critical_line at s = 1/2 − iu/2 (u = tan(θ/2)) and off the line at Re s = 0.6
    const ratio = (sre, sim) => {
      const nr = sre - 1,
        d = sre * sre + sim * sim;
      return [(nr * sre + sim * sim) / d, (sim * sre - nr * sim) / d];
    };
    // (θ = 180° is u = ∞: no point s, and no value of the ratio)
    let cay = { norm: null, off: null, offGap: null, gapQ: null };
    if (!m.euler.atPi) {
      const uu = m.euler.u,
        onLine = ratio(0.5, -uu / 2),
        off = hypot(...ratio(0.6, -uu / 2));
      // 1 − off from 1 − off² = 0.2/(0.36 + u²/4), without cancellation when u is large
      cay = { norm: hypot(...onLine), off, offGap: 0.2 / (0.36 + (uu * uu) / 4) / (1 + off), gapQ: hypot(onLine[0] + m.euler.Q[0], onLine[1] + m.euler.Q[1]) };
    }
    // comparison_classification_of_continuous_rays: the ray exp(t·i) reads cos²(t/2); duplication φ(g²) = (2φ(g) − 1)²
    const ray = { H: 0.5, T: TAU, law: 2 * PI ** 2 / TAU ** 2, dup: Math.abs(kappa(xs[0], qmul(xs[1], xs[1])) - (2 * kappa(xs[0], xs[1]) - 1) ** 2) };
    // golden_fixed_point_unique, fib_cassini_from_golden_norm, golden_hurwitz_bound
    let cassini = true,
      hurwitz = true,
      fixedGap = Infinity;
    for (let n = 0; n <= 30; n++) if (FIB[n] * FIB[n + 2] - FIB[n + 1] ** 2 !== (n % 2 ? 1 : -1)) cassini = false;
    for (let n = 1; n <= 30; n++) {
      const f = fibFacts(n),
        q = fval(f.q);
      if (!(f.boundHi < f.distLo && f.gapLo > 0)) hurwitz = false;
      fixedGap = Math.min(fixedGap, Math.abs(1 + 1 / q - q));
    }
    const ex = m.heap.exact,
      fib = ex && ex.kind === 'fib' ? fibFacts(ex.n) : null;
    // face_cycle_exact on the geodesic polyhedron of the frame
    const face = { V: m.pi.V, E: m.pi.E, F: m.pi.F, chi: m.pi.chi, rank: m.pi.rank, kernel: m.pi.F - m.pi.rank, cycles: m.pi.E - m.pi.V + 1, all: domes().every((g) => g.chi === 2 && g.rank === g.F - 1 && g.rank === g.E - g.V + 1) };
    // the rational points: S³(ℚ) is closed under products and inverses (the probe times a fixed rational point)
    const d = dottie();
    return {
      cheb: { norm: chebNorm, rec: chebRec, dot: chebDot, n: 12 },
      dist: { heap: distGap, probe: probeDist },
      gram: { det, formula, gap: Math.abs(det - formula), law: m.heap.detLaw },
      sag,
      tail,
      cay,
      ray,
      golden: { cassini, hurwitz, fixedGap, fib },
      face,
      subgroup: { period: m.heap.period },
      dottie: { theta: d.theta, sum: d.sum, gap: d.gap, fixed: d.fixed, terms: SERIES + 1, b1: d.coeffs[1], b3: d.coeffs[3] },
      model: { tri: 'x y⁻¹ z', kappa: '(1 + ⟨x, y⟩)/2' }
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
  const cams = { pi: [-0.5, 0.52], euler: [0, 1.12], cheb: [0.12, 0.98], phi: [-0.32, 0.38], pure: [-0.55, 0.36] };
  const PRESETS = {
    'pi-polyhedral-crease-residual': { scene: 'pi', nu: 1, N: 6, play: true, still: MAP.pi.t(6) },
    'euler-tangent-escape-vs-cayley': { scene: 'euler', N: 6, play: true, still: 0.5 },
    'chebyshev-rational-arc-doubling': { scene: 'cheb', play: true, still: 0.75 },
    'tetrahedral-rational-cap-vs-phi': { scene: 'phi', play: true, still: 1 - KSTAR },
    'pure-axiom-omega-constant-free-sphere': { scene: 'pure', probe: [-6, 6], play: true, still: 'end' }
  };
  const DEFAULT = 'pi-polyhedral-crease-residual';

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.pi[0], pitch: cams.pi[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  const basis = (yaw, pitch) => {
    const cy = cs(yaw),
      sy = sn(yaw),
      cp = cs(pitch),
      sp = sn(pitch);
    return { R: [cy, -sy, 0], U: [sy * sp, cy * sp, cp], D: [-sy * cp, -cy * cp, sp] };
  };
  let dragging = null,
    frozenFit = null;
  /** How far the drawing reaches from the centre: the sphere, or the Euler spiral where it runs outside. */
  function reach(m, w) {
    let r = 1.1;
    if (w.euler > 0.01) r = Math.max(r, lerp(1.1, Math.min(EULER_ROOM, Math.sqrt(m.euler.z2)) * 1.06, w.euler));
    return r;
  }
  /** Fit the drawing into the stage between the title and the legend. */
  function fit(m, w) {
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
      side = 14,
      R = reach(m, w);
    const u = Math.max(8, Math.min((Wd - 2 * side) / (2 * R), room / (2 * R)));
    opts.radius = u / Math.min(Wd, H);
    opts.cx = 0.5;
    opts.cy = (top + room / 2) / H;
    frozenFit = { radius: opts.radius, cy: opts.cy };
  }
  /** The far hemisphere of the sphere about the view direction: the inner wall the glass shows, shaded by a tilted
      linear coordinate so the shading moves when the camera turns. */
  const TILT = unit([0.5, -0.32, 0.8]);
  const WALL = 1.012;
  function backWall(D, alpha = 1) {
    const e1 = unit(cross(D, Math.abs(D[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(D, e1);
    const at = (u, v) => {
      const t = (PI / 2) * u,
        p = TAU * v;
      return scale(add(scale(D, -cs(t)), add(scale(e1, sn(t) * cs(p)), scale(e2, sn(t) * sn(p)))), WALL);
    };
    sc.surface('wall', at, { u: [0, 1], v: [0, 1], nu: 18, nv: 64, colors: [P.stage, P.violet], range: [-1.25, 2.75], value: (u, v) => dot(TILT, at(u, v)) / WALL, alpha, grid: { every: [3, 8], alpha: 0.16 } });
  }
  const EULER_ROOM = 2.2; // how far from the centre the tangent steps are drawn
  const eq = (a) => [cs(a), sn(a), 0];
  /** Points of the equator from angle a to angle b, at radius r. */
  const arc = (a, b, r = 1, n = 48) => sample(Math.max(2, Math.ceil(n * Math.min(1, Math.abs(b - a) / PI) + 2)), (t) => scale(eq(lerp(a, b, t)), r));
  /** A small cap polygon tangent to the sphere at p (radius r), for the rational points. */
  function capAt(p, r, sides, verts, faces, lift = 0.006) {
    const n = unit(p),
      e1 = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(n, e1),
      c = scale(n, 1 + lift),
      base = verts.length;
    for (let k = 0; k < sides; k++) {
      const a = (TAU * k) / sides;
      verts.push(add(c, add(scale(e1, r * cs(a)), scale(e2, r * sn(a)))));
    }
    faces.push(Array.from({ length: sides }, (_, k) => base + k));
  }
  /** A small pyramid standing on the sphere at p (base radius r, height h): the angle-defect cone of a vertex. */
  function coneAt(p, r, h, sides, verts, faces) {
    const n = unit(p),
      e1 = unit(cross(n, Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0])),
      e2 = cross(n, e1),
      c = scale(n, 1.002),
      base = verts.length;
    for (let k = 0; k < sides; k++) {
      const a = (TAU * k) / sides;
      verts.push(add(c, add(scale(e1, r * cs(a)), scale(e2, r * sn(a)))));
    }
    verts.push(scale(n, 1 + h));
    for (let k = 0; k < sides; k++) faces.push([base + k, base + ((k + 1) % sides), base + sides]);
  }
  const tube = (key, pts, color, width, extra = {}) => sc.tube(key, pts, { color, width, glow: 0.3, occlude: false, ...extra });

  function drawBall(m, w, D) {
    backWall(D);
    sc.glass('glass', [0, 0, 0], 1, { color: P.violet, alpha: 0.05, rim: 0.3 });
    sc.circle([0, 0, 0], D, 1, { fade: false, color: P.violet, width: 1.4, alpha: 0.5 });
    // the equator ℂ = span{1, i}: the true great circle of every scene but the pure one
    const eqA = 1 - w.pure;
    if (eqA > 0.01) sc.circle([0, 0, 0], [0, 0, 1], 1, { color: w.euler > 0.5 ? P.cyan : P.sigma, width: w.euler > 0.5 ? 1.6 : 1.1, alpha: (w.euler > 0.5 ? 0.75 : 0.42) * eqA, back: 0.3 });
  }
  /** The flat polyhedron and the polygon: alpha a (the π scene, or the scaffold of the pure scene). */
  function drawFlat(m, a, nu, N, key, D) {
    if (a < 0.01) return;
    const G = geodesic(nu);
    sc.poly(key + 'Geo', { vertices: G.verts, faces: G.faces }, { color: P.cyan, alpha: 0.26 * a, edges: P.cyan, pick: false });
    // a magenta cone on every vertex, its size growing with the square root of the angle defect δ (so its area with δ)
    const cv = [],
      cf = [];
    G.verts.forEach((v, i) => {
      if (dot(v, D) < -0.12) return; // behind the far wall
      const size = Math.sqrt(Math.max(0, G.defects[i]) / (PI / 3));
      coneAt(v, Math.max(0.011, 0.055 * size), Math.max(0.022, 0.1 * size), 8, cv, cf);
    });
    sc.poly(key + 'Def', { vertices: cv, faces: cf }, { color: P.magenta, alpha: Math.min(0.99, a), edges: false, pick: false });
    // the regular N-gon on the equator, its magenta segments and the sagitta of the chord facing the viewer
    const V = Array.from({ length: N }, (_, i) => eq((TAU * i) / N));
    sc.line(V, { color: P.cyan, width: 2.2, alpha: a, close: true });
    for (let i = 0; i < N; i++) sc.fan([V[i], ...arc((TAU * i) / N, (TAU * (i + 1)) / N, 1, 24).slice(1, -1), V[(i + 1) % N]], { fill: P.magenta, alpha: 0.42 * a });
    return V;
  }
  function frontChord(N, D) {
    let best = 0,
      bd = -Infinity;
    for (let i = 0; i < N; i++) {
      const d = dot(eq((TAU * (i + 0.5)) / N), D);
      if (d > bd) {
        bd = d;
        best = i;
      }
    }
    return best;
  }
  function drawPi(m, w, D) {
    const a = w.pi;
    if (a < 0.01) return;
    drawFlat(m, a, m.nu, m.N, 'pi', D);
    const i = frontChord(m.N, D),
      mid = (TAU * (i + 0.5)) / m.N;
    sc.line([scale(eq(mid), cs(PI / m.N)), eq(mid)], { color: P.magenta, width: 2.6, alpha: a });
    sc.bead(eq(0), { color: P.sigma, r: 5, alpha: a, key: 'x0' });
    sc.bead(eq(TAU / m.N), { color: P.cyan, r: 4.6, alpha: a, key: 'v1' });
  }
  function drawEuler(m, w, D) {
    const a = w.euler;
    if (a < 0.01) return;
    const E = m.euler;
    // the true rotor arc 1 → e^{iθ} on the circle, cyan; the Cayley point Q(σ) is its end
    // (an arc shorter than 10⁻⁶ has no length to draw; the points are marked for every θ > 0)
    if (m.theta > 1e-6) tube('rotor', arc(0, m.theta, 1.0, 64), P.cyan, 3.4, { alpha: a });
    // the N flat tangent steps (1 + iθ/N)^k, magenta, cut where they leave the drawn room
    const lim = EULER_ROOM,
      pts = [];
    let cut = false;
    for (const [x, y] of E.pts) {
      const q = [x, y, 0];
      if (hypot(x, y) > lim) {
        // the step that crosses the edge of the drawn room ends on it
        const p0 = pts[pts.length - 1],
          d = sub(q, p0),
          b = dot(p0, d),
          A = dot(d, d),
          t = (-b + Math.sqrt(Math.max(0, b * b - A * (dot(p0, p0) - lim * lim)))) / A;
        pts.push(add(p0, scale(d, t)));
        cut = true;
        break;
      }
      pts.push(q);
    }
    if (m.theta > 0 && pts.length > 1) {
      if (m.theta > 1e-6) tube('steps', pts, P.magenta, 2.6, { alpha: a });
      const marks = cut ? pts.slice(1, -1) : pts.slice(1);
      marks.forEach((p, k) => sc.bead(p, { color: P.magenta, r: k === m.N - 1 ? 5.4 : 3, alpha: a, key: 'z' + (k + 1) }));
      // the escape: from the circle out to z_N along the ray of z_N (when z_N is drawn)
      const zN = [E.zN[0], E.zN[1], 0],
        r = norm(zN);
      if (!cut && r > 1.004) sc.line([unit(zN), zN], { color: P.magenta, width: 1.6, dash: [4, 3], alpha: 0.9 * a });
    }
    // the Cayley chart: the violet line from −1 through σ = u·i lands on Q(σ)
    const Q = W(E.Q);
    if (!E.atPi && m.theta > 0) {
      sc.line([[-1, 0, 0], Q], { color: P.violet, width: 1.5, alpha: 0.9 * a });
      // σ = u·i on the imaginary axis; only at θ = 90° is it i itself, the same point as Q(σ): a violet ring marks it there
      if (isExactI(m.theta)) sc.ring(Q, { color: P.violet, r: 11, alpha: a, normal: [0, 0, 1], key: 'sigmaRing' });
      else if (E.u <= 1.7) sc.bead([0, E.u, 0], { color: P.violet, r: 4.4, alpha: a, key: 'sigma' });
    }
    sc.line([[-1.15, 0, 0], [1.15, 0, 0]], { color: P.sigma, width: 0.8, alpha: 0.35 * a });
    sc.line([[0, -1.15, 0], [0, 1.15, 0]], { color: P.violet, width: 0.8, alpha: 0.3 * a });
    sc.bead([-1, 0, 0], { color: P.violet, r: 3.6, alpha: a, key: 'minus' });
    sc.bead([1, 0, 0], { color: P.sigma, r: 5, alpha: a, key: 'one' });
    sc.bead(Q, { color: P.cyan, r: 6, alpha: a, key: 'cayley' });
  }
  /** The heap points on the equator (cheb: x₀ … x₃ and the continuation; phi: x₀ … x₆). */
  function drawHeap(m, w, D) {
    const a = w.cheb,
      xs = m.heap.xs.map(W);
    if (a > 0.01) {
      sc.fan(sample(72, (t) => eq(TAU * t)).slice(0, -1), { fill: P.cyan, alpha: 0.07 * a });
      // the continuation x₄ … x₂₄: closed orbits come back onto the first points
      for (let n = 4; n <= 24; n++) sc.bead(xs[n], { color: P.cyan, r: 2.2, alpha: 0.55 * a, key: 'orbit' + n });
      // the three heap steps x₀ → x₁ → x₂ → x₃ as cyan chords
      for (let n = 0; n < 3; n++) if (norm(sub(xs[n + 1], xs[n])) > 1e-6) tube('heap' + n, [xs[n], xs[n + 1]], P.cyan, 2.6, { alpha: a });
      // the chord x₀ — x₂ reads κ₂
      if (norm(sub(xs[0], xs[2])) > 1e-6) sc.line([xs[0], xs[2]], { color: P.sigma, width: 1.4, dash: [4, 4], alpha: 0.8 * a });
      sc.bead(xs[0], { color: P.sigma, r: 6, alpha: a, key: 'x0' });
      sc.bead(xs[1], { color: P.cyan, r: 5, alpha: a, key: 'x1' });
      sc.bead(xs[2], { color: P.cyan, r: 5.4, alpha: a, key: 'x2' });
      sc.bead(xs[3], { color: P.cyan, r: 5.4, alpha: a, key: 'x3' });
      if (m.heap.period === 3) sc.ring(xs[0], { color: P.cyan, r: 11, alpha: a, key: 'closure' });
    }
    const b = w.phi;
    if (b > 0.01) {
      const T = TETRA;
      sc.poly('tetra', { vertices: T, faces: [[0, 1, 2], [0, 3, 1], [0, 2, 3], [1, 3, 2]] }, { color: P.cyan, alpha: 0.24 * b, edges: P.cyan, pick: false });
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) sc.line(slerpArc(T[i], T[j], 1.006), { color: P.cyan, width: 1.8, alpha: 0.85 * b });
      T.forEach((p, k) => sc.bead(p, { color: P.cyan, r: 4.2, alpha: b, key: 't' + k }));
      for (let n = 0; n < 5; n++) sc.line([xs[n], xs[n + 1]], { color: P.magenta, width: 2.4, alpha: b });
      for (let n = 0; n < 5; n++) sc.line([xs[n], xs[n + 2]], { color: P.violet, width: 1.5, alpha: 0.85 * b });
      // the gap x₅ → x₀ along the equator, when the five steps do not close
      const gap = Math.atan2(xs[5][1], xs[5][0]);
      if (Math.abs(gap) > 1e-6) sc.line(arc(gap, 0, 1.012, 32), { color: P.magenta, width: 2, dash: [3, 3], alpha: b });
      sc.bead(xs[0], { color: P.sigma, r: 6, alpha: b, key: 'p0' });
      for (let n = 1; n <= 5; n++) sc.bead(xs[n], { color: P.magenta, r: n === 1 ? 4.6 : 4, alpha: b, key: 'p' + n });
    }
  }
  const TETRA = [
    [1, 0, 0],
    [-1 / 3, (2 * Math.SQRT2) / 3, 0],
    [-1 / 3, -Math.SQRT2 / 3, Math.sqrt(2 / 3)],
    [-1 / 3, -Math.SQRT2 / 3, -Math.sqrt(2 / 3)]
  ];
  function slerpArc(a, b, r = 1, n = 32) {
    const om = Math.acos(clamp(dot(a, b), -1, 1));
    return sample(n, (t) => scale(add(scale(a, sn((1 - t) * om) / sn(om)), scale(b, sn(t * om) / sn(om))), r));
  }
  /** The rational Cayley points of the slice: σ = (a/d, b/d), d ≤ 3, |σᵢ| ≤ 2. */
  const RATIONAL = (() => {
    const seen = new Map();
    for (const d of [1, 2, 3])
      for (let a = -2 * d; a <= 2 * d; a++)
        for (let b = -2 * d; b <= 2 * d; b++) {
          const [p, q] = frac(a, d),
            [r, s] = frac(b, d),
            k = `${p}/${q},${r}/${s}`;
          // ‖Q(σ)‖² − 1 over the common denominator (d² + a² + b²)², in integers
          // κ(1, Q(σ)) = (1 + w)/2 with w = (d² − n2)/(d² + n2), against 1/(1 + ‖σ‖²) = d²/(d² + n2)
          const n2 = a * a + b * b,
            residue = (d * d - n2) ** 2 + 4 * d * d * n2 - (d * d + n2) ** 2,
            kappa = frac(d * d + n2 + (d * d - n2), 2 * (d * d + n2)),
            law = fstr(kappa) === fstr(frac(d * d, d * d + n2));
          if (!seen.has(k)) seen.set(k, { sigma: [a / d, b / d], d: Math.max(q, s), residue, kappa, law });
        }
    return [...seen.values()].map((x) => ({ ...x, point: W(cayley([x.sigma[0], x.sigma[1], 0])) }));
  })();
  const RATIONAL_RESIDUE = Math.max(...RATIONAL.map((r) => Math.abs(r.residue)));
  const RINGS = [
    [1, 2],
    [1, 3],
    [1, 4]
  ];
  function drawPure(m, w, D) {
    const a = w.pure;
    if (a < 0.01) return;
    const lam = m.lambda;
    // the lit sphere: opaque at λ = 1, glass while the scaffold shows
    sc.surface('ball', (u, v) => [sn(u) * cs(v), sn(u) * sn(v), cs(u)], { u: [0, PI], v: [0, TAU], nu: 40, nv: 80, colors: [P.stage, P.violet], range: [-1.3, 3.8], value: (u, v) => dot(TILT, [sn(u) * cs(v), sn(u) * sn(v), cs(u)]), alpha: lam >= 0.999 ? 1 : 0.16 + 0.5 * lam, grid: { every: [8, 8], alpha: 0.12 }, pick: false });
    const cv = [],
      cf = [];
    for (const r of RATIONAL) capAt(r.point, r.d === 1 ? 0.032 : r.d === 2 ? 0.025 : 0.02, 6, cv, cf, 0.008);
    sc.poly('rational', { vertices: cv, faces: cf }, { color: P.cyan, alpha: lam >= 0.999 ? 1 : 0.92, edges: false, pick: false });
    for (const [p, q] of RINGS) {
      const k = p / q,
        x = 2 * k - 1;
      sc.circle([x, 0, 0], [1, 0, 0], Math.sqrt(1 - x * x), { color: P.cyan, width: 1.5, alpha: 0.85 * a, back: 0.18, n: 120 });
    }
    sc.bead([1, 0, 0], { color: P.sigma, r: 5.6, alpha: a, key: 'one' });
    sc.bead([-1, 0, 0], { color: P.sigma, r: 4.4, alpha: a, key: 'minus' });
    // the flat scaffold, fading in as λ → 0: the icosahedron with its defect cones, the hexagon and the Euler steps
    const f = (1 - lam) * a;
    if (f > 0.01) {
      drawFlat(m, f, 1, 6, 'pure', D);
      const pts = [[1, 0, 0]];
      let z = [1, 0];
      for (let k = 1; k <= 6; k++) {
        z = [z[0] - (z[1] * PI) / 12, z[1] + (z[0] * PI) / 12];
        pts.push([z[0], z[1], 0]);
      }
      tube('scaffoldSteps', pts, P.magenta, 2.4, { alpha: f });
    }
  }

  /* ---------- labels ---------- */
  const SCENE_NAME = {
    pi: [['正多边形', 'POLYGON'], ['π 残差（MODEL）', 'π RESIDUAL (MODEL)']],
    euler: [['凯莱一步', 'ONE CAYLEY STEP'], ['e 残差（MODEL）', 'e RESIDUAL (MODEL)']],
    cheb: [['整系数倍增', 'INTEGER DOUBLING'], ['平直角读法（MODEL）', 'FLAT ANGLE READING (MODEL)']],
    phi: [['四点有理封顶', 'FOUR-POINT RATIONAL CAP'], ['φ 残差（MODEL）', 'φ RESIDUAL (MODEL)']],
    pure: [['有理真球', 'THE RATIONAL SPHERE'], ['平直脚手架（MODEL）', 'FLAT SCAFFOLD (MODEL)']]
  };
  const LENS_NAME = [
    ['纯有理 κ 账本', 'RATIONAL κ LEDGER'],
    ['平直残差 (MODEL)', 'FLAT RESIDUALS (MODEL)']
  ];
  /** The excess |z_N|² − 1, 0 at θ = 0 alone. */
  const excessRel = (E) => (E.lgExcess === null ? eqRel(null, E.excess) : E.excess < TINY ? approx(digitsOfLog(E.lgExcess, 0)) : irrRel(E.excess));
  /** |z_N|² in four decimals, irrational for θ > 0 (θ is a rational multiple of π); an excess below them is written out, so that
      no 1.0000 is printed of a modulus above 1. */
  const z2Rel = (E) => {
    if (E.lgExcess === null) return eqRel(null, E.z2);
    const r = irrRel(E.z2);
    return printedValue(bare(r)) > 1 ? r : approx(`1 + ${bare(excessRel(E))}`);
  };
  /** u = tan(θ/2) in d decimals, smaller than `least`, or 10⁶ and more, in significant digits: 1 at θ = 90°, else irrational. */
  const uRel = (u, d, least) => ((u > 0 && u < least) || u >= 1e6 ? approx(sci(u)) : u === 1 ? eqRel(null, u, d) : irrRel(u, d));
  /* Every inequality of the page is written by one rule: “<”, “>”, “≤” and “≥” stand between exact expressions and digits rounded
     outwards, always in the same direction; a value rounded to the nearest keeps its own “≈” and never is a side of an inequality,
     not even beside 0, 1 or e: the exact inequality comes first, the value after it in a parenthesis of its own.
     `say` picks the language: L follows the page, ZH and EN write one of them. */
  const ZH = (zh) => zh,
    EN = (zh, en) => en;
  const apart = (rel, say = L) => say(`（值 ${rel}）`, `(value ${rel})`);
  const valued = (law, rel, say = L) => law + say('', ' ') + apart(rel, say);
  /** |z_N|² > 1 for every θ > 0, then its value; name: how |z_N|² is written. */
  const z2Law = (m, say = L, name = `|z<sub>${m.N}</sub>|²`) => valued(`${name} > 1`, z2Rel(m.euler), say);
  /** (1 + 1/N)ᴺ < e, then its value: the two parts, and the two as one text. */
  const compoundParts = (m, say = L) => [`(1 + 1/${m.N})${superscript(m.N)} &lt; e`, apart(eqRel(null, m.euler.compound), say)];
  const compoundLaw = (m, say = L) => compoundParts(m, say).join(say('', ' '));
  /** The accumulated sagitta between its two bounds, the lower rounded down, the upper up; then its value at this N. */
  const sagBounds = (m, sag, say = L) => `${fmtFloor(sag.lo)} ≤ N(1 − cos(π/N)) ≤ ${fmtCeil(sag.hi)}${say(`（当前值 ${accRel(m)}）`, ` (value ${accRel(m)})`)}`;
  /** The remainder of the truncated exponential to the nearest, then its bound (its formula, where one is given), rounded up; both
      are 0 at θ = 0 alone. */
  function tailRel(t, say = L, formula = '') {
    if (t.r === 0) return `${eqRel('0', t.left)} ≤ 0`;
    const tiny = t.right < TINY;
    return `${approx(tiny ? digitsOfLog(t.lgLeft, 0) : sci(t.left))}${say('，上界', ', bound')}${formula && ' ' + formula} ≤ ${tiny ? digitsOfLog(t.lgRight, 1) : sciCeil(t.rightHi)}`;
  }
  /** Hurwitz at q = F_{n+1}/F_n: the inequality of the two exact sides, each side to the nearest, and the positive margin between
      them, rounded down. */
  function hurwitzRel(f, say = L) {
    const d = f.q[1],
      exact = `|φ − ${fstr(f.q)}| > 1/(√5·${d}² + ${d})`,
      [left, right, margin] = [approx(sci(f.dist)), approx(sci(f.bound)), sciFloor(f.gapLo)];
    return exact + say(`（左 ${left}，右 ${right}，差 ≥ ${margin} > 0）`, ` (left ${left}, right ${right}, margin ≥ ${margin} > 0)`);
  }
  /** The pentagon polynomial after its relation: the exact fraction at a named rational κ₁, 0 at the two roots alone; a small
      value is written out, so that it never reads 0.0000. */
  const pRel = (m) => {
    const ex = m.heap.exact,
      x = m.heap.P;
    if (ex && ex.q) {
      const [p, q] = ex.q;
      return eqRel(fstr(frac(16 * p * p - 12 * p * q + q * q, q * q)), x);
    }
    if (x === 0) return eqRel('0', x);
    const { P } = heapRatios(m.k1, ex);
    return Math.abs(x) < 5e-4 ? ratSci(P, x) : ratRel(P, x);
  };
  /** The five-step gap 1 − κ(x₀, x₅) after its relation: 0 at the two roots and at κ₁ = 1 alone. */
  const gapRel = (m) => {
    const x = heapRatios(m.k1, m.heap.exact);
    return ratSci(x ? x.gap : ratio(0), m.heap.gap);
  };
  /** The modulus of the Cayley ratio off the line: the gap to 1 is written out when four decimals hide it. */
  const offRel = (cay) => {
    const r = eqRel(null, cay.off);
    if (printedValue(bare(r)) < 1) return r;
    const g = sciRel(cay.offGap);
    return `${g[0]} 1 − ${bare(g)}`;
  };
  /** It is below 1 for every finite u, then its value. */
  const offLaw = (cay, say = L) => valued('|(s − 1)/s| &lt; 1', offRel(cay), say);
  /** The point of θ = 180°: −1, outside the Cayley chart, its limit along the imaginary axis. */
  const LIM_Q = 'lim<sub>u→+∞</sub> Q(u·i) = −1';
  /** ‖Q(σ)‖² = 1 for every σ, and det G₃ = 0 because x₀, x₁, x₂ and the centre share a plane: identities, checked on the frame. */
  const qRel = (m) => idRel(1, m.euler.qNorm2);
  const detRel = (m) => idRel(0, m.heap.det3);
  /** Σδ of the closed polyhedron is 4π = 720° exactly (Descartes); the sum over the computed defects agrees to 10⁻⁹°. */
  const defectRel = (sumDeg) => `${Math.abs(sumDeg - 720) < 1e-9 ? '=' : '≈'} ${fmt(sumDeg, 2)}°`;
  /** θ₁ = arccos(2κ₁ − 1), the angle reading of the flat lens: whole degrees at the closing values, else no decimal (Niven). */
  const theta1Rel = (m) => {
    const c = closing(m.heap.exact);
    return c ? degRel(c.deg) : approx(bare(degRel(Math.acos(clamp(m.heap.c, -1, 1)) / deg)));
  };
  /** The sagitta 1 − cos(π/N) and its N-fold are rational at N = 3 alone (1/2 and 3/2). */
  const sagRel = (m) => (m.N === 3 ? eqRel(null, m.pi.sag) : irrRel(m.pi.sag));
  const accRel = (m) => (m.N === 3 ? eqRel(null, m.pi.acc) : irrRel(m.pi.acc));
  /** The sign that a reading is irrational; ∉ is missing from the display and body faces. */
  const NOT_Q = ' <span style="font-family:var(--font-data)">∉</span> ℚ';
  /** The reading of the pill in the constant-free lens: its text, and whether it is exactly a rational number. */
  function sphereKey(m) {
    const ex = m.heap.exact;
    if (m.scene === 'pi') return { rational: !!m.pi.kNq, text: `κ ${kNRel(m)}` };
    if (m.scene === 'euler') return { rational: true, text: m.euler.atPi ? 'κ(1, −1) = 0' : `‖Q(σ)‖² ${qRel(m)}` };
    if (m.scene === 'cheb') return { rational: !!(ex && ex.q), text: `κ₂ ${k2Rel(m)}${ex && !ex.q ? NOT_Q : ''}` };
    if (m.scene === 'phi') return { rational: true, text: 'κ = 1/3' };
    return { rational: true, text: '‖Q(σ)‖² = 1' };
  }
  /** The relation written after κ = cos²(π/N) of neighbouring polygon vertices, rational only at N = 3, 4, 6 (Niven): an exact
      fraction follows “=”; four decimals follow “≈”, and ∉ ℚ is said of κ, never of its decimals. */
  const kNRel = (m) => (m.pi.kNq ? eqRel(fstr(m.pi.kNq), m.pi.kN) : `${irrRel(m.pi.kN)} (κ${NOT_Q})`);
  const ROOT = { phi: '(φ + 1)/4', conj: '(2 − φ)/4' };
  /** κ₁, κ₂ and κ₃ written exactly when κ₁ is a named value, else null. The two roots of 16κ² − 12κ + 1 form a cycle of period 2
      under doubling, and κ₃ = κ₁(4κ₁ − 3)² is the other root there too: (2 − φ)/4 at (φ + 1)/4, and the other way round. */
  function exactReadings(m) {
    const ex = m.heap.exact;
    if (!ex) return [null, null, null];
    if (ex.kind === 'phi') return [ROOT.phi, ROOT.conj, ROOT.conj];
    if (ex.kind === 'conj') return [ROOT.conj, ROOT.phi, ROOT.phi];
    const [p, q] = ex.q,
      c = frac(2 * p - q, q),
      d = frac(4 * p - 3 * q, q);
    return [fstr(ex.q), fstr(frac(c[0] * c[0], c[1] * c[1])), fstr(frac(p * d[0] * d[0], q * d[1] * d[1]))];
  }
  /** The relation after the reading i: its exact name, else its digits, “=” only when the fraction itself (of the double κ₁) is
      those digits. Beside κ₁ = 1/4, 1 − κ₃ = (1 − κ₁)(4κ₁ − 1)² is smaller than every printed digit, not 0. */
  const readingRel = (m, i, key, val) => {
    const sym = exactReadings(m)[i];
    return sym != null ? eqRel(sym, val) : ratRel(heapRatios(m.k1, null)[key], val);
  };
  const k1Rel = (m) => readingRel(m, 0, 'k1', m.k1);
  const k2Rel = (m) => readingRel(m, 1, 'k2', m.heap.k2law);
  const k3Rel = (m) => readingRel(m, 2, 'k3', m.heap.k3law);
  /** The same for a κ₁ alone, on the rail and beside its slider. */
  const kappaRel = (k) => {
    const ex = exactK(k);
    return eqRel(ex ? (ex.q ? fstr(ex.q) : ROOT[ex.kind]) : null, k);
  };
  const kText = (m) => bare(k1Rel(m));
  const k2Text = (m) => bare(k2Rel(m));
  function tags(m, w, I) {
    const g = state.lens === 1;
    const { U, R } = basis(sc.cam.yaw, sc.cam.pitch);
    const off = (p, ku, kr = 0) => add(add(p, scale(U, ku)), scale(R, kr));
    /** p pushed outward on the screen by k (world units), at the depth of p: a label beside a point of the sphere is
        dimmed only where the point itself is hidden. */
    const outward = (p, k) => {
      const x = dot(p, R),
        y = dot(p, U),
        n = Math.hypot(x, y);
      return n < 1e-9 ? off(p, k) : add(p, add(scale(R, (k * x) / n), scale(U, (k * y) / n)));
    };
    // in the glass scenes the marked points are always visible; on the opaque sphere a label dims with its hidden point
    const dim = w.pure > 0.5;
    const T = (key, p, html, cls = 'raw backed c-ik') => p && sc.tag(key, p, html, cls, { occlude: dim });
    const compact = stage.clientWidth < 480;
    if (w.pi > 0.5) {
      const D = basis(sc.cam.yaw, sc.cam.pitch).D,
        i = frontChord(m.N, D),
        mid = eq((TAU * (i + 0.5)) / m.N);
      T('x0', outward(eq(0), 0.18), 'x₀ = 1', 'raw backed c-sg');
      if (!g) {
        T('kN', outward(eq(TAU / m.N), 0.2), `${compact ? 'κ' : 'κ(x₀, x₁)'} ${kNRel(m)}`, 'raw backed c-cy');
        if (!compact) T('poly', off([0, 0, 0], -0.94, -0.94), L(`ν = ${m.nu} · ${m.pi.V} 个顶点`, `ν = ${m.nu} · ${m.pi.V} vertices`), 'raw backed c-cy');
      } else {
        T('sag', outward(mid, 0.2), `s<sub>${m.N}</sub> ${sagRel(m)}`, 'raw backed c-mg');
        if (!compact) T('defect', off([0, 0, 0], -0.94, -0.94), `Σδ ${defectRel(m.pi.sumDeg)} = 4π`, 'raw backed c-mg');
      }
    }
    if (w.euler > 0.5) {
      const E = m.euler,
        zN = [E.zN[0], E.zN[1], 0],
        far = norm(zN) > EULER_ROOM,
        // where the label of z_N goes: z_N itself, or the last drawn step when z_N lies outside the drawn room
        zAt = far ? [...E.pts].reverse().find(([x, y]) => hypot(x, y) <= EULER_ROOM).concat(0) : zN;
      T('one', outward([1, 0, 0], 0.16), '1', 'raw backed c-sg');
      T('minus', outward([-1, 0, 0], 0.16), '−1', 'raw backed c-vi');
      if (m.theta > 0) {
        T('zN', outward(zAt, 0.16), g ? `${far ? '→ ' : ''}|z<sub>${m.N}</sub>|² ${z2Rel(E)}` : `${far ? '→ ' : ''}z<sub>${m.N}</sub>`, 'raw backed c-mg');
        // (at θ = 180° the point is −1, the limit of the chart: no finite σ is evaluated there)
        T('Q', off(W(E.Q), -0.2, -0.1), E.atPi ? (g ? 'e<sup>iπ</sup> = −1' : LIM_Q) : g ? 'e<sup>iθ</sup> = Q(σ)' : `‖Q(σ)‖² ${qRel(m)}`, 'raw backed c-cy');
        if (!E.atPi && E.u <= 1.7 && !compact) T('sigma', off([0, E.u, 0], 0.16, -0.22), isExactI(m.theta) ? 'σ = i = Q(σ)' : `σ ${uRel(E.u, 2, 0.01)}·i`, 'raw backed c-vi');
      } else T('zN', outward([1, 0, 0], 0.4), g ? `|z<sub>${m.N}</sub>|² ${z2Rel(E)}` : `z<sub>${m.N}</sub> = Q = 1`, 'raw backed c-mg');
    }
    if (w.cheb > 0.5) {
      const xs = m.heap.xs.map(W);
      T('x0', outward(xs[0], 0.18), 'x₀', 'raw backed c-sg');
      if (namedK(m) !== 1) {
        T('x1', outward(xs[1], 0.22), g ? `θ₁ ${theta1Rel(m)}` : `x₁ · κ₁ ${k1Rel(m)}`, 'raw backed c-cy');
        if (norm(sub(xs[2], xs[0])) > 0.05 && norm(sub(xs[2], xs[1])) > 0.05) T('x2', outward(xs[2], 0.22), g ? 'θ₂ = 2θ₁' : `x₂ · κ₂ ${k2Rel(m)}`, 'raw backed c-cy');
        if (norm(sub(xs[3], xs[0])) > 0.05 && norm(sub(xs[3], xs[2])) > 0.05 && norm(sub(xs[3], xs[1])) > 0.05) T('x3', outward(xs[3], 0.22), g ? 'θ₃ = 3θ₁' : `x₃ · κ₃ ${k3Rel(m)}`, 'raw backed c-cy');
        else if (m.heap.period === 3 && !compact) T('x3', outward(xs[0], 0.5), 'x₃ = x₀', 'raw backed c-cy');
      }
      if (!compact) T('det', [0, 0, 0], `det G₃ ${detRel(m)}`, 'raw backed c-cy');
    }
    if (w.phi > 0.5) {
      const xs = m.heap.xs.map(W);
      T('tetra', outward(slerpArc(TETRA[0], TETRA[2], 1)[16], 0.12), g ? 'c = −1/3' : 'κ = 1/3', 'raw backed c-cy');
      T('p0', outward(xs[0], 0.18), 'x₀', 'raw backed c-sg');
      if (namedK(m) !== 1) {
        T('edge', outward(scale(unit(add(xs[1], xs[2])), 0.95), 0.2), `${g ? 'κ' : 'κ₁'} ${k1Rel(m)}`, 'raw backed c-mg');
        if (!compact) T('diag', scale(add(xs[1], xs[3]), 0.5), `κ₂ ${k2Rel(m)}`, 'raw backed c-vi');
        if (m.heap.gap > 0) T('gap', outward(eq(Math.atan2(xs[5][1], xs[5][0]) / 2), 0.24), g ? `1 − κ(x₀, x₅) ${gapRel(m)}` : L('五步缺口', 'five-step gap'), 'raw backed c-mg');
        else if (!compact) T('gap', outward(xs[0], 0.46), 'x₅ = x₀', 'raw backed c-mg');
      }
    }
    if (w.pure > 0.5) {
      const D = basis(sc.cam.yaw, sc.cam.pitch).D;
      for (const [p, q] of RINGS) {
        // the label sits on the front half of its ring, at the point that faces the viewer most
        const x = 2 * (p / q) - 1,
          r = Math.sqrt(1 - x * x),
          dir = unit([0, D[1], D[2]]),
          at = [x, r * dir[1], r * dir[2]];
        T('ring' + q, off(at, -0.06), `κ = ${p}/${q}`, 'raw backed c-cy');
      }
      T('one', outward([1, 0, 0], 0.26), g ? 'κ = 1' : '1 = Q(0)', 'raw backed c-sg');
      const P0 = m.probe.point;
      T('probe', outward(P0, 0.22), g ? `κ = 1/(1 + ‖σ‖²) = ${fstr(m.probe.kappa)}` : `(${m.probe.coords.map(fstr).join(', ')})`, 'raw backed c-ik');
      if (g && m.lambda < 0.5 && !compact) T('scaffold', [0, 0, 1.24], L('π · e · φ 的平直脚手架', 'flat scaffold of π · e · φ'), 'raw backed c-mg');
    }
  }
  function bigline(m) {
    const name = L(...SCENE_NAME[state.scene][state.lens]),
      g = state.lens === 1;
    const key = {
      pi: g ? `s<sub>${m.N}</sub> ${sagRel(m)}` : `κ ${kNRel(m)}`,
      euler: g ? `|z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}` : m.euler.atPi ? LIM_Q : `‖Q(σ)‖² ${qRel(m)}`,
      cheb: g ? `θ₁ ${theta1Rel(m)}` : `κ₂ ${k2Rel(m)}`,
      phi: g ? `16κ₁² − 12κ₁ + 1 ${pRel(m)}` : 'κ = 1/3',
      pure: g ? `λ ${eqRel(null, m.lambda, 2)}` : '‖Q(σ)‖² = 1'
    }[state.scene];
    return `${name} · ${key}`;
  }
  /** The live regime of a scene: the notes, the HUD line and the figure notes all read this one value. */
  function regime(m) {
    const s = state.scene;
    if (s === 'euler') return m.theta === 0 ? 'zero' : m.euler.atPi ? 'half' : 'live';
    if (s === 'cheb') {
      if (namedK(m) === 1) return 'frozen';
      if (namedK(m) === 0) return 'anti';
      return m.heap.period === 3 ? 'three' : 'live';
    }
    if (s === 'phi') {
      if (namedK(m) === 1) return 'frozen';
      const ex = m.heap.exact;
      if (ex && (ex.kind === 'phi' || ex.kind === 'conj')) return 'exact';
      if (ex && ex.kind === 'fib') return 'fib';
      return 'live';
    }
    if (s === 'pure') return m.lambda === 1 ? 'pure' : m.lambda === 0 ? 'scaffold' : 'blend';
    return 'live';
  }
  function subline(m) {
    const s = state.scene,
      r = regime(m);
    if (s === 'pi')
      return L(
        `青色正 ${m.N} 边形的每条弦都留一道品红弓形，矢高 1 − cos(π/${m.N}) ${sagRel(m)}；平面多面体 ν = ${m.nu} 的 ${m.pi.V} 个角亏合计 ${fmt(m.pi.sumDeg, 2)}° = 4π。`,
        `Every chord of the cyan ${m.N}-gon leaves a magenta segment, sagitta 1 − cos(π/${m.N}) ${sagRel(m)}; the ${m.pi.V} defects of the flat polyhedron ν = ${m.nu} add to ${fmt(m.pi.sumDeg, 2)}° = 4π.`
      );
    if (s === 'euler') {
      if (r === 'zero') return L(`θ = 0°：z<sub>${m.N}</sub> = 1，|z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}，没有逸出；Q(σ) = 1。`, `θ = 0°: z<sub>${m.N}</sub> = 1, |z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}, no escape; Q(σ) = 1.`);
      if (r === 'half')
        return L(
          `θ = 180°：沿 i 半圆切向原像 πi，exp₁(πi) = e<sup>iπ</sup> = −1，κ(1, −1) = 0；品红 ${m.N} 步停在 |z<sub>${m.N}</sub>|² ${z2Rel(m.euler)} 的球外，青色点是 u → +∞ 时 lim Q(u·i) = −1。`,
          `θ = 180°: along the i-semicircle tangent preimage πi, exp₁(πi) = e<sup>iπ</sup> = −1, κ(1, −1) = 0; the magenta ${m.N} steps stop outside at |z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}, the cyan point is lim Q(u·i) = −1 as u → +∞.`
        );
      return L(
        `θ ${degRel(m.thetaDeg)}：品红 ${m.N} 步切线 ${z2Law(m)}，逃出球外；青色凯莱一步 ‖Q(σ)‖² ${qRel(m)}。`,
        `θ ${degRel(m.thetaDeg)}: the magenta ${m.N} tangent steps reach ${z2Law(m)}, off the sphere; the one cyan Cayley step has ‖Q(σ)‖² ${qRel(m)}.`
      );
    }
    if (s === 'cheb') {
      if (r === 'frozen') return L('κ₁ = 1：x₁ = x₀，每一步都停在 x₀，κ₂ = κ₃ = 1。', 'κ₁ = 1: x₁ = x₀, every step stays at x₀, κ₂ = κ₃ = 1.');
      if (r === 'anti') return L('κ₁ = 0：x₁ = −x₀ 是对跖点，x₂ = x₀，κ₂ = 1，κ₃ = 0。', 'κ₁ = 0: x₁ = −x₀ is the antipode, x₂ = x₀, κ₂ = 1, κ₃ = 0.');
      return L(
        `κ₁ ${k1Rel(m)}：只用乘法，κ₂ = (2κ₁ − 1)² ${k2Rel(m)}，κ₃ = κ₁(4κ₁ − 3)² ${k3Rel(m)}${r === 'three' ? '，x₃ = x₀ 三步闭合' : ''}；定心 det G₃ ${detRel(m)}。`,
        `κ₁ ${k1Rel(m)}: by products only, κ₂ = (2κ₁ − 1)² ${k2Rel(m)}, κ₃ = κ₁(4κ₁ − 3)² ${k3Rel(m)}${r === 'three' ? ', x₃ = x₀ closes in three steps' : ''}; centered det G₃ ${detRel(m)}.`
      );
    }
    if (s === 'phi') {
      if (r === 'frozen') return L('κ₁ = 1：五步都停在 x₀；青色四面体的六条边仍读 κ = 1/3。', 'κ₁ = 1: all five steps stay at x₀; the six cyan edges of the tetrahedron still read κ = 1/3.');
      if (r === 'exact')
        return L(
          `κ₁ ${k1Rel(m)}：品红五步闭合，x₅ = x₀；16κ² − 12κ + 1 = 0 的两根 (φ + 1)/4、(2 − φ)/4 都不是有理数；青色四面体读 κ = 1/3。`,
          `κ₁ ${k1Rel(m)}: the magenta five steps close, x₅ = x₀; the roots (φ + 1)/4 and (2 − φ)/4 of 16κ² − 12κ + 1 = 0 are irrational; the cyan tetrahedron reads κ = 1/3.`
        );
      if (r === 'fib') {
        const n = m.heap.exact.n;
        return L(
          `κ₁ ${k1Rel(m)} = F<sub>${n + 2}</sub>/(4F<sub>${n}</sub>)：五步缺口 ${gapRel(m)}，16κ₁² − 12κ₁ + 1 = (−1)<sup>${n}</sup>/F<sub>${n}</sub>² = ${fstr(frac(n % 2 ? -1 : 1, FIB[n] ** 2))} ≠ 0。`,
          `κ₁ ${k1Rel(m)} = F<sub>${n + 2}</sub>/(4F<sub>${n}</sub>): five-step gap ${gapRel(m)}, 16κ₁² − 12κ₁ + 1 = (−1)<sup>${n}</sup>/F<sub>${n}</sub>² = ${fstr(frac(n % 2 ? -1 : 1, FIB[n] ** 2))} ≠ 0.`
        );
      }
      return L(`κ₁ ${k1Rel(m)}：五步缺口 1 − κ(x₀, x₅) ${gapRel(m)}，16κ₁² − 12κ₁ + 1 ${pRel(m)}。`, `κ₁ ${k1Rel(m)}: five-step gap 1 − κ(x₀, x₅) ${gapRel(m)}, 16κ₁² − 12κ₁ + 1 ${pRel(m)}.`);
    }
    const pq = m.probe;
    if (r === 'scaffold')
      return L(
        `λ = 0：平直脚手架全部叠上；有理点仍在球面，琥珀 Q(σ) = (${pq.coords.map(fstr).join(', ')})。`,
        `λ = 0: the whole flat scaffold is laid over; the rational points stay on the sphere, amber Q(σ) = (${pq.coords.map(fstr).join(', ')}).`
      );
    return L(
      `λ ${eqRel(null, m.lambda, 2)}：琥珀 Q(σ) = (${pq.coords.map(fstr).join(', ')})，σ = (${pq.sigma.map(fstr).join(', ')})，‖Q(σ)‖² = 1，κ(1, Q) = ${fstr(pq.kappa)}。`,
      `λ ${eqRel(null, m.lambda, 2)}: amber Q(σ) = (${pq.coords.map(fstr).join(', ')}), σ = (${pq.sigma.map(fstr).join(', ')}), ‖Q(σ)‖² = 1, κ(1, Q) = ${fstr(pq.kappa)}.`
    );
  }
  function legendItems(m) {
    const s = state.scene,
      items = [['vi', L('真球', 'the sphere')]];
    if (s === 'pi') items.push(['cy', L('平直弦与面', 'flat chords, faces')], ['mg', L('弓形与角亏', 'segments, defects')]);
    else if (s === 'euler') items.push(['mg', L('N 步切线', 'N tangent steps')], ['cy', L('凯莱一步', 'one Cayley step')]);
    else if (s === 'cheb') items.push(['cy', L('堆点 xₙ', 'heap points xₙ')], ['sg', L('起点 x₀', 'start x₀')]);
    else if (s === 'phi') items.push(['cy', L('四面体 κ = 1/3', 'tetrahedron κ = 1/3')], ['mg', L('五步与缺口', 'five steps, gap')]);
    else items.push(['cy', L('有理点 Q(σ)', 'rational Q(σ)')], ['am', L('探针', 'probe')]);
    return items;
  }
  function hud(m) {
    $('hudTitle').innerHTML = bigline(m);
    $('hudSub').innerHTML = subline(m);
    $('legend').innerHTML = legendItems(m)
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
    const place = (i, dx, dy, at) => {
      list[i].style.translate = dx + 'px ' + dy + 'px';
      occupied.push(at);
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
            cost = Math.hypot(dx + sx, dy) + extra;
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
  /** The world point of the amber handle: the N-gon vertex x₁, the Cayley point, the heap point x₁, the probe. */
  function handleWorld(m) {
    const s = state.scene;
    if (s === 'pi') return eq(TAU / m.N);
    if (s === 'euler') return W(m.euler.Q);
    if (s === 'pure') return m.probe.point;
    return W(m.heap.xs[1]);
  }
  function drawStage(m, I) {
    const w = layers();
    fit(m, w);
    sc.begin();
    const D = basis(sc.cam.yaw, sc.cam.pitch).D;
    drawBall(m, w, D);
    drawPi(m, w, D);
    drawEuler(m, w, D);
    drawHeap(m, w, D);
    drawPure(m, w, D);
    // a printed still has no handle button: an amber ring marks the current point there
    // (moved towards the viewer, which keeps its place on the screen, so that no wall cuts it)
    if (TRV.shot) sc.ring(add(handleWorld(m), scale(D, 1.3)), { color: P.amber, r: 11, key: 'current' });
    tags(m, w, I);
    sc.end();
    const q = sc.p(handleWorld(m));
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    fitLabels(q);
  }

  /* ---------- the strips: along N the flat residuals; over κ₁ the integer doubling law ---------- */
  // the top of both ranges is headroom for the legend rows: the curves end at CLIP1 (strip 1; a steeper Euler excess leaves
  // through the top with an arrow) and at 1 (strip 2)
  const Y1 = [-0.1, 2.7],
    CLIP1 = 1.1,
    Y2 = [-0.08, 2.15];
  /** A curve kept inside the plot: points above the top of the range end the drawn run there. */
  function clipTop(pts, top) {
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      if (p[1] <= top) {
        if (i && pts[i - 1][1] > top) {
          const q = pts[i - 1],
            f = (top - q[1]) / (p[1] - q[1]);
          out.push(null, [lerp(q[0], p[0], f), top]);
        }
        out.push(p);
      } else if (i && pts[i - 1][1] <= top) {
        const q = pts[i - 1],
          f = (top - q[1]) / (p[1] - q[1]);
        out.push([lerp(q[0], p[0], f), top], null);
      }
    }
    return out;
  }
  const sagCurve = sample(450, (t) => {
    const N = 3 + 45 * t;
    return [N, 1 - cs(PI / N)];
  });
  const eulerCurve = (th) =>
    sample(450, (t) => {
      const N = 3 + 45 * t;
      return [N, Math.pow(1 + (th * th) / (N * N), N) - 1];
    });
  const doubling = sample(400, (t) => [t, (2 * t - 1) ** 2]);
  const tripling = sample(400, (t) => [t, t * (4 * t - 3) ** 2]);
  function drawPlots(m) {
    if (TRV.thumbMode) return;
    const cv = $('plot');
    if (cv.clientWidth && cv.clientHeight) {
      $('plotTitle').textContent = L('沿 N：平直残差变小，有理误差恒为 0', 'Along N: flat residuals shrink, the rational error stays 0');
      $('plotMeta').textContent = `θ ${degRel(m.thetaDeg, 0)}`;
      const g = kit.plot(cv, { x: [3, 48], y: Y1, pad: [34, 14, 6, 22] });
      g.axes({ xTicks: cv.clientWidth < 280 ? [[3, 'N = 3'], 24, 48] : [[3, 'N = 3'], 12, 24, 36, 48], yTicks: [[0, '0'], [0.5, '0.5'], [1, '1']] });
      const cayleyError = Math.abs(m.euler.qNorm2 - 1);
      g.line(sample(2, (t) => [3 + 45 * t, cayleyError]), P.cyan, { width: 2 });
      const euler = clipTop(eulerCurve(m.theta), CLIP1),
        cut = euler.find((p) => p && p[1] >= CLIP1 - 1e-9);
      g.line(euler, P.violet, { width: 2 });
      if (cut) g.arrow([cut[0], CLIP1 - 0.35], [cut[0], CLIP1], { color: P.violet, width: 2, headSize: 7 });
      g.line(sagCurve, P.magenta, { width: 2 });
      g.line([[m.N, Y1[0]], [m.N, 0.7]], P.amber, { width: 1 });
      g.dot(m.N, m.pi.sag, P.amber, 3.2);
      if (m.euler.excess <= CLIP1 - 0.06) g.dot(m.N, m.euler.excess, P.amber, 3.2);
      g.legend([
        [P.magenta, L('弓形 1 − cos(π/N)', 'sagitta 1 − cos(π/N)')],
        [P.violet, L('欧拉 (1 + θ²/N²)^{N} − 1', 'Euler (1 + θ²/N²)^{N} − 1')],
        [P.cyan, L('凯莱 |‖Q‖² − 1| = 0', 'Cayley |‖Q‖² − 1| = 0')]
      ]);
    }
    const cb = $('plotB');
    if (cb.clientWidth && cb.clientHeight) {
      $('plotTitleB').textContent = L('κ₁ 的整系数倍增律', 'Integer doubling in κ₁');
      $('plotMetaB').textContent = L('虚线 κ₂ = κ₁ · 点：有理值', 'dashed κ₂ = κ₁ · dots: rational');
      const g = kit.plot(cb, { x: [0, 1], y: Y2, pad: [34, 14, 6, 22] });
      g.axes({ xTicks: cb.clientWidth < 280 ? [0, [0.5, 'κ₁ = 0.5'], 1] : [0, 0.25, [0.5, 'κ₁ = 0.5'], 0.75, 1], yTicks: [[0, '0'], [0.25, ''], [0.5, '0.5'], [0.75, ''], [1, '1']] });
      g.line(sample(2, (t) => [t, t]), P.dim, { width: 1.2, dash: [4, 4] });
      g.line(tripling, P.violet, { width: 2 });
      g.line(doubling, P.cyan, { width: 2 });
      for (const [x, y] of [[1, 1], [0.5, 0], [1 / 3, 1 / 9], [0.25, 0.25], [0, 1]]) g.dot(x, y, P.cyan, 3.4);
      for (const [x, y] of [[KSTAR, KCONJ], [KCONJ, KSTAR]]) g.dot(x, y, P.magenta, 3.6);
      g.line([[m.k1, Y2[0]], [m.k1, 1]], P.amber, { width: 1 });
      g.dot(m.k1, m.heap.k2law, P.amber, 3.2);
      g.legend(
        [
          [P.cyan, 'κ_{2} = (2κ_{1} − 1)²'],
          [P.violet, 'κ_{3} = κ_{1}(4κ_{1} − 3)²']
        ],
        { right: false }
      );
    }
  }

  /* ---------- readouts ---------- */
  function keyReadout(m) {
    const s = state.scene;
    if (s === 'pi') return [L('平直残差：每条弦的矢高', 'Flat residual: sagitta of each chord'), sagRel(m), ` · N = ${m.N} · Σδ ${defectRel(m.pi.sumDeg)}`];
    if (s === 'euler') return [L('平直残差：N 步后的模方 − 1', 'Flat residual: squared modulus − 1 after N steps'), excessRel(m.euler), m.euler.atPi ? ' · lim Q(u·i) = −1 · κ(1, −1) = 0' : ` · ‖Q(σ)‖² − 1 ${idRel(0, m.euler.qNorm2 - 1)}`];
    if (s === 'cheb') return [L('倍增律：κ₂ 与 (2κ₁ − 1)² 的浮点偏差', 'Doubling law: floating-point drift of κ₂ from (2κ₁ − 1)²'), sciRel(Math.abs(m.heap.k2 - m.heap.k2law)), ` · κ₁ ${k1Rel(m)} · κ₂ ${k2Rel(m)}`];
    if (s === 'phi') return [L('五边形多项式 16κ₁² − 12κ₁ + 1', 'Pentagon polynomial 16κ₁² − 12κ₁ + 1'), pRel(m), ` · κ₁ ${k1Rel(m)} · 1 − κ(x₀, x₅) ${gapRel(m)}`];
    return [L('有理点 ‖Q(σ)‖² − 1 的最大整数余数', 'Largest integer remainder of ‖Q(σ)‖² − 1'), `= ${RATIONAL_RESIDUE}`, ` · ${RATIONAL.length} ${L('个点', 'points')} · λ ${eqRel(null, m.lambda, 2)}`];
  }
  function readings(m, I) {
    const [label, value, rest] = keyReadout(m);
    $('roKeyLabel').innerHTML = label;
    $('roKey').textContent = value;
    $('roKeySub').textContent = rest;
    // (a row breaks between its values and between a law and the value after it, never between a value and its relation)
    const row = (id, values) => ($(id).innerHTML = values.map((v) => [v].flat().map((x) => `<span style="white-space:nowrap">${x}</span>`).join(L('', ' '))).join(' · '));
    row('roPi', [sagRel(m), accRel(m), defectRel(m.pi.sumDeg), `= ${m.pi.V}`, eqRel(null, m.pi.nu2max)]);
    row('roE', [z2Rel(m.euler), compoundParts(m), m.euler.atPi ? 'lim Q(u·i) = −1' : qRel(m)]);
    row('roCheb', [k1Rel(m), k2Rel(m), k3Rel(m), detRel(m)]);
    row('roPhi', [pRel(m), gapRel(m), 'ΔE(4) = 0', 'ΔE(5) = 1']);
    row('roPure', [`= ${RATIONAL.length}`, `= ${RATIONAL_RESIDUE}`, `= ${fstr(m.probe.kappa)}`, eqRel(null, I.dottie.sum, 8)]);
    $('roNote').innerHTML = roNote(m, I);
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[state.scene][state.lens])}</strong>`;
    const sphere = sphereKey(m);
    $('keyPill').innerHTML = state.lens ? `${L('平直残差', 'flat residual')} <strong>${value}</strong>` : `${sphere.rational ? L('有理读数', 'rational reading') : L('球面读数', 'sphere reading')} <strong>${sphere.text}</strong>`;
    $('hint').textContent = L('拖琥珀手柄或时间轴改本场景的量 · 拖空白处转视角 · 空格播放', 'drag the amber handle or the rail to set the quantity of the scene · drag empty space to orbit · Space plays');
    $('formula').textContent = 'κ(x, [y, x, y]) = (2κ(x, y) − 1)² · ‖Q(σ)‖² = 1';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    nField.set(m.N);
    thField.set(Math.round(m.thetaDeg));
    $('thetaOut').textContent = degRel(m.thetaDeg, 0);
    kField.set(Math.round(m.k1 * 100) / 100);
    $('kOut').textContent = k1Rel(m);
    lamField.set(Math.round(m.lambda * 100) / 100);
    $('lambdaOut').textContent = eqRel(null, m.lambda, 2);
    probeFields.forEach((f, i) => f.set(state.probe[i]));
    $('ctlPanel').dataset.scene = state.scene;
    nuChips.set(String(state.nu), true);
    const ex = m.heap.exact;
    chebChips.set(ex && ex.q ? fstr(ex.q) : null, true);
    phiChips.set(ex ? (ex.q ? fstr(ex.q) : ex.kind) : null, true);
  }
  /** The return of the orbit to x₀, [zh, en]: the step of an exact κ₁, else none; a chord below 10⁻³ is a near approach and is
      called one, however small the doubles make it. */
  function returnText(m) {
    const { period, near } = m.heap;
    if (period) return [`轨道在第 ${period} 步回到 x₀`, `the orbit returns to x₀ at step ${period}`];
    if (near.chord < 1e-3) return [`前 ${ORBIT} 步无精确闭合（n = ${near.n} 处数值贴近，弦长 > 0）`, `no exact return within ${ORBIT} steps (numerical near-approach at step ${near.n}, chord > 0)`];
    return [`前 ${ORBIT} 步不回到 x₀`, `no return to x₀ within ${ORBIT} steps`];
  }
  function roNote(m, I) {
    const s = state.scene;
    if (s === 'pi')
      return L(
        `累计矢高 ${sagBounds(m, I.sag)}；V − E + F = ${m.pi.V} − ${m.pi.E} + ${m.pi.F} = ${m.pi.chi}，ℤ₂ 面边界的秩 ${m.pi.rank} = E − V + 1。ν²·最大角亏（ν = 1 … 4）≈ ${domes().map((g) => fmt(g.nu2max)).join('、')}，ν = 30 时 ${eqRel(null, fine().nu2max)}，手工推导的极限 6√3/(3φ + 2) ${eqRel(null, (6 * Math.sqrt(3)) / (3 * PHI + 2))}。`,
        `Accumulated sagitta ${sagBounds(m, I.sag)}; V − E + F = ${m.pi.V} − ${m.pi.E} + ${m.pi.F} = ${m.pi.chi}, rank of the ℤ₂ face boundary ${m.pi.rank} = E − V + 1. ν²·largest defect (ν = 1 … 4) ≈ ${domes().map((g) => fmt(g.nu2max)).join(', ')}, ${eqRel(null, fine().nu2max)} at ν = 30, hand-derived limit 6√3/(3φ + 2) ${eqRel(null, (6 * Math.sqrt(3)) / (3 * PHI + 2))}.`
      );
    if (s === 'euler' && m.euler.atPi)
      return L(
        `前 ${m.N} 项泰勒余项 ${tailRel(I.tail)}；θ = 180° 时 u = tan(θ/2) → ∞，凯莱比不在这里求值。`,
        `Tail of the ${m.N}-term Taylor polynomial ${tailRel(I.tail)}; at θ = 180°, u = tan(θ/2) → ∞, and the Cayley ratio is not evaluated here.`
      );
    if (s === 'euler')
      return L(
        `前 ${m.N} 项泰勒余项 ${tailRel(I.tail)}；凯莱比的模 |(s − 1)/s|：Re s = 1/2 上 ${idRel(1, I.cay.norm)}；Re s = 0.6 上 ${offLaw(I.cay)}。`,
        `Tail of the ${m.N}-term Taylor polynomial ${tailRel(I.tail)}; the modulus |(s − 1)/s| of the Cayley ratio: ${idRel(1, I.cay.norm)} on Re s = 1/2; at Re s = 0.6, ${offLaw(I.cay)}.`
      );
    if (s === 'cheb')
      return L(
        `与 Uₙ、Tₙ 逐项比较到 n = 12：浮点偏差 ${sciRel(Math.max(I.cheb.rec, I.cheb.dot))}；κ = 1 − 弦²/4 浮点偏差 ${sciRel(I.dist.heap)}；${returnText(m)[0]}。`,
        `Against Uₙ and Tₙ up to n = 12: floating-point drift ${sciRel(Math.max(I.cheb.rec, I.cheb.dot))}; κ = 1 − chord²/4 floating-point drift ${sciRel(I.dist.heap)}; ${returnText(m)[1]}.`
      );
    if (s === 'phi') {
      const f = I.golden.fib;
      if (f)
        return L(
          `n = ${f.n}：F<sub>${f.n}</sub>F<sub>${f.n + 2}</sub> − F<sub>${f.n + 1}</sub>² = ${f.cassini > 0 ? '+' : '−'}1，${hurwitzRel(f)}；四面体 ΔE(4) = 0，五点 ΔE(5) = 1。`,
          `n = ${f.n}: F<sub>${f.n}</sub>F<sub>${f.n + 2}</sub> − F<sub>${f.n + 1}</sub>² = ${f.cassini > 0 ? '+' : '−'}1, ${hurwitzRel(f)}; tetrahedron ΔE(4) = 0, five points ΔE(5) = 1.`
        );
      return L(
        `四面体的六条边都读 1/3：格拉姆矩阵 (1 − c)I + cJ（c = −1/3）的特征值 4/3、4/3、4/3、0，秩 3；五点同读 1/3 则特征值 1 + 4c = −1/3 < 0，放不下。五步堆的非平凡闭合都是 16κ² − 12κ + 1 的根；正二十面体相邻与非对跖相隔顶点 κ ${irrRel(icoKappa.near)}、${irrRel(icoKappa.far)}。`,
        `All six edges of the tetrahedron read 1/3: the Gram matrix (1 − c)I + cJ (c = −1/3) has eigenvalues 4/3, 4/3, 4/3, 0, rank 3; five points all reading 1/3 would give the eigenvalue 1 + 4c = −1/3 < 0, which no vectors have. The nontrivial closures of the five-step heap are roots of 16κ² − 12κ + 1; the regular icosahedron reads κ ${irrRel(icoKappa.near)} on neighbouring and ${irrRel(icoKappa.far)} on non-antipodal separated vertices.`
      );
    }
    return L(
      `${RATIONAL.length} 个有理点逐个用整数核对 ‖Q(σ)‖² = 1；自指不动点的有理系数级数在 π 处的部分和 ${eqRel(null, I.dottie.sum, 8)}，cos θ* = θ*。`,
      `${RATIONAL.length} rational points checked one by one in integers: ‖Q(σ)‖² = 1; the rational series of the self-referential fixed point has the partial sum ${eqRel(null, I.dottie.sum, 8)} at π, cos θ* = θ*.`
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
    drawStage(m, I);
    readings(m, I);
    drawPlots(m);
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail: t ∈ [0, 1], the parameter of the scene ---------- */
  const playBtn = $('playBtn');
  let stopAt = null,
    lastT = 0;
  /** Write the parameter of the scene from the rail; a κ₁ written by a chip, the handle or a slider keeps its own double, which
      1 − t only rounds. */
  function applyClock(t) {
    const key = PARAM[state.scene],
      v = paramAt(state.scene, t);
    if (key !== 'k1' || Math.abs(v - state.k1) > ULPS) state[key] = v;
  }
  const clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: true,
    rate: MAP.pi.rate,
    step: MAP.pi.step,
    max: 1,
    // the readout is written from t itself: kit.clock shows it before onChange has moved the parameter
    format: (t) => {
      const s = state.scene,
        v = paramAt(s, t);
      if (s === 'pi') return `N = ${v}`;
      if (s === 'euler') return `θ ${degRel(eulerDeg(v), 1)}`;
      if (s === 'pure') return `λ ${eqRel(null, v, 2)}`;
      return `κ₁ ${kappaRel(v)}`;
    },
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
      // a card plays from its start up to its still and parks there; a still at the end of the rail (λ = 1) is reached
      // when the looping clock wraps round to 0
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
  /** Put the rail on a parameter value without leaving its exact value (a chip, the handle, a slider). */
  function setParam(key, v) {
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
    const still = PRESETS[id].still === 'end' ? clock.max : PRESETS[id].still;
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
  /** The reader takes over: the clock pauses and no card is marked; the scene stays. */
  function leave() {
    stopAt = null;
    cards.mark(null);
    clock.pause();
  }
  const nField = kit.field($('nRange'), {
    fmt: (v) => `= ${v}`,
    onInput: (v) => {
      leave();
      if (state.scene === 'pi') setParam('N', v);
      else {
        state.N = v;
        paint();
      }
    }
  });
  const thField = kit.field($('thetaRange'), {
    fmt: (v) => degRel(v, 0),
    onInput: (v) => {
      leave();
      if (state.scene === 'euler') setParam('theta', gridTheta(4 * v));
      else {
        state.theta = gridTheta(4 * v);
        paint();
      }
    }
  });
  const kField = kit.field($('kRange'), {
    fmt: kappaRel,
    onInput: (v) => {
      leave();
      if (state.scene === 'cheb' || state.scene === 'phi') setParam('k1', v);
      else {
        state.k1 = v;
        paint();
      }
    }
  });
  const lamField = kit.field($('lambdaRange'), {
    fmt: (v) => eqRel(null, v, 2),
    onInput: (v) => {
      leave();
      if (state.scene === 'pure') setParam('lambda', v);
      else {
        state.lambda = v;
        paint();
      }
    }
  });
  const probeFields = ['probeA', 'probeB'].map((id, i) =>
    kit.field($(id), {
      fmt: (v) => `= ${fstr(frac(v, 6))}`,
      onInput: (v) => {
        leave();
        state.probe[i] = clamp(Math.round(v), -18, 18);
        paint();
      }
    })
  );
  const nuChips = kit.chips($('nuChips'), 'nu', (v) => {
    leave();
    state.nu = clamp(Number(v) || 1, 1, 4);
    paint();
  });
  const parseQ = (v) => {
    if (v === 'phi') return KSTAR;
    if (v === 'conj') return KCONJ;
    const [p, q] = String(v).replace('−', '-').split('/').map(Number);
    return q ? p / q : p;
  };
  const chipK = (v) => {
    leave();
    const k = parseQ(v);
    if (state.scene === 'cheb' || state.scene === 'phi') setParam('k1', k);
    else {
      state.k1 = k;
      paint();
    }
  };
  const chebChips = kit.chips($('chebChips'), 'k', chipK);
  const phiChips = kit.chips($('phiChips'), 'k', chipK);
  // the lens renames the picture and keeps the state; the rail switch and its mirror in the tour bar both flip it
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards: notes written from the live frame ---------- */
  const PI_CARD = 'pi-polyhedral-crease-residual',
    E_CARD = 'euler-tangent-escape-vs-cayley',
    C_CARD = 'chebyshev-rational-arc-doubling',
    F_CARD = 'tetrahedral-rational-cap-vs-phi',
    R_CARD = 'pure-axiom-omega-constant-free-sphere';
  /** The note of each card for the frame m: [zh, en]; figure: the one short sentence of a cited figure (no sub- or
      superscripts, only what the stage, the title line and the tour bar show). */
  function cardNote(id, m, figure) {
    const r = regime(m);
    if (id === PI_CARD) {
      if (figure)
        return [
          `青色正 ${m.N} 边形：每条弦外一道品红弓形，矢高 ${sagRel(m)}；品红角亏锥合计 ${fmt(m.pi.sumDeg, 2)}°。`,
          `Cyan ${m.N}-gon: magenta sagitta ${sagRel(m)} on every chord; magenta defect cones add to ${fmt(m.pi.sumDeg, 2)}°.`
        ];
      return [
        `青色正 ${m.N} 边形贴在赤道大圆里，每条弦外留一道品红弓形，矢高 1 − cos(π/${m.N}) ${sagRel(m)}；平面多面体（ν = ${m.nu}）的 ${m.pi.V} 个顶点各戴一顶品红角亏锥，合计 ${fmt(m.pi.sumDeg, 2)}° = 4π。N、ν 再大只变小，不消失。`,
        `Each chord of the cyan regular ${m.N}-gon on the equator leaves a magenta segment, sagitta 1 − cos(π/${m.N}) ${sagRel(m)}; the ${m.pi.V} vertices of the flat polyhedron (ν = ${m.nu}) wear magenta defect cones, ${fmt(m.pi.sumDeg, 2)}° = 4π in all. A larger N or ν only shrinks them.`
      ];
    }
    if (id === E_CARD) {
      if (r === 'zero')
        return figure
          ? [`θ = 0：zₙ = 1，模方 ${z2Rel(m.euler)}，没有逸出；青色 Q(σ) = 1。`, `θ = 0: zₙ = 1, squared modulus ${z2Rel(m.euler)}, no escape; the cyan Q(σ) = 1.`]
          : [
              `θ = 0：品红的切线步不动，z<sub>${m.N}</sub> = 1，|z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}，没有逸出；青色的 Q(σ) = 1。推时间轴把 θ 拉开，品红的 ${m.N} 步就螺旋出球。`,
              `θ = 0: the magenta tangent steps do not move, z<sub>${m.N}</sub> = 1, |z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}, no escape; the cyan Q(σ) = 1. Move the rail to open θ and the magenta ${m.N} steps spiral off the sphere.`
            ];
      if (r === 'half')
        return figure
          ? [`θ = 180°：品红 ${m.N} 步模方 ${z2Rel(m.euler)}，在球外；u → +∞ 时 lim Q(u·i) = −1（青色点）。`, `θ = 180°: the magenta ${m.N} steps reach squared modulus ${z2Rel(m.euler)}, outside; the cyan point is lim Q(u·i) = −1 as u → +∞.`]
          : [
              `θ = 180°：沿 i 半圆取切向原像 πi，exp₁(πi) = e<sup>iπ</sup> = −1，κ(1, −1) = 0；品红的 ${m.N} 步停在球外，|z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}；青色的点是 u → +∞ 时 lim Q(u·i) = −1，凯莱图的有限 σ 取不到它。`,
              `θ = 180°: along the i-semicircle tangent preimage πi, exp₁(πi) = e<sup>iπ</sup> = −1, κ(1, −1) = 0; the magenta ${m.N} steps stop outside the sphere, |z<sub>${m.N}</sub>|² ${z2Rel(m.euler)}; the cyan point is lim Q(u·i) = −1 as u → +∞, which no finite σ of the Cayley chart reaches.`
            ];
      if (figure)
        return [
          `θ ${degRel(m.thetaDeg, 0)}：品红 ${m.N} 步${z2Law(m, ZH, '模方')}，逃出球外；青色凯莱一步模方 ${qRel(m)}。`,
          `θ ${degRel(m.thetaDeg, 0)}: magenta ${m.N} steps, ${z2Law(m, EN, 'squared modulus')}, off the sphere; cyan Cayley step ${qRel(m)}.`
        ];
      return [
        `品红的 ${m.N} 步平直切线 z<sub>k</sub> = (1 + iθ/${m.N})<sup>k</sup> 螺旋到球外：θ ${degRel(m.thetaDeg, 0)} 时，${z2Law(m, ZH)}。青色的凯莱点 Q(σ)（σ = u·i，u = tan(θ/2) ${uRel(m.euler.u, 4, 5e-4)}）一步落在圆上，‖Q(σ)‖² ${qRel(m)}：紫色直线从 −1 经过 σ 落到它。`,
        `The magenta ${m.N} flat tangent steps z<sub>k</sub> = (1 + iθ/${m.N})<sup>k</sup> spiral off the sphere: at θ ${degRel(m.thetaDeg, 0)}, ${z2Law(m, EN)}. The cyan Cayley point Q(σ) (σ = u·i, u = tan(θ/2) ${uRel(m.euler.u, 4, 5e-4)}) lands on the circle in one step, ‖Q(σ)‖² ${qRel(m)}: the violet line from −1 through σ meets it there.`
      ];
    }
    if (id === C_CARD) {
      if (r === 'frozen')
        return figure
          ? ['κ₁ = 1：x₁ = x₀，每一步都停在 x₀，κ₂ = κ₃ = 1。', 'κ₁ = 1: x₁ = x₀, every step stays at x₀, κ₂ = κ₃ = 1.']
          : ['κ₁ = 1：琥珀手柄 x₁ 与银白的 x₀ 重合，每一步 [xₙ₊₁, xₙ, xₙ₊₁] 都停在 x₀，κ₂ = κ₃ = 1。推时间轴，x₁ 离开 x₀，青色的 x₂、x₃ 跟着出来。', 'κ₁ = 1: the amber handle x₁ sits on the silver x₀, every step [xₙ₊₁, xₙ, xₙ₊₁] stays at x₀, κ₂ = κ₃ = 1. Move the rail and x₁ leaves x₀, the cyan x₂ and x₃ follow.'];
      if (r === 'anti')
        return figure
          ? ['κ₁ = 0：x₁ 是对跖点，x₂ = x₀，κ₂ = 1，κ₃ = 0。', 'κ₁ = 0: x₁ is the antipode, x₂ = x₀, κ₂ = 1, κ₃ = 0.']
          : ['κ₁ = 0：琥珀的 x₁ = −x₀ 是对跖点，青色的 x₂ = [x₁, x₀, x₁] 回到 x₀：κ₂ = (2·0 − 1)² = 1，κ₃ = 0。', 'κ₁ = 0: the amber x₁ = −x₀ is the antipode, and the cyan x₂ = [x₁, x₀, x₁] comes back to x₀: κ₂ = (2·0 − 1)² = 1, κ₃ = 0.'];
      if (figure)
        return [
          `κ₁ ${k1Rel(m)}：κ₂ = (2κ₁ − 1)² ${k2Rel(m)}，κ₃ ${k3Rel(m)}${r === 'three' ? '，x₃ = x₀' : ''}，没有 sin、cos、π。`,
          `κ₁ ${k1Rel(m)}: κ₂ = (2κ₁ − 1)² ${k2Rel(m)}, κ₃ ${k3Rel(m)}${r === 'three' ? ', x₃ = x₀' : ''}, with no sin, cos or π.`
        ];
      return [
        `琥珀手柄是 x₁，κ₁ ${k1Rel(m)}。只用乘法得到青色的 x₂ = [x₁, x₀, x₁]、x₃ = [x₂, x₁, x₂]：κ₂ = (2κ₁ − 1)² ${k2Rel(m)}，κ₃ = κ₁(4κ₁ − 3)² ${k3Rel(m)}${r === 'three' ? '，x₃ 回到 x₀（青色圈）' : ''}；三点与球心共面，定心 det G₃ = 0。这条律不含 sin、cos、e、π。`,
        `The amber handle is x₁, κ₁ ${k1Rel(m)}. Products alone give the cyan x₂ = [x₁, x₀, x₁] and x₃ = [x₂, x₁, x₂]: κ₂ = (2κ₁ − 1)² ${k2Rel(m)}, κ₃ = κ₁(4κ₁ − 3)² ${k3Rel(m)}${r === 'three' ? ', and x₃ is back on x₀ (cyan ring)' : ''}; x₀, x₁, x₂ and the centre share a plane, centered det G₃ = 0. No sin, cos, e or π.`
      ];
    }
    if (id === F_CARD) {
      if (r === 'frozen')
        return figure
          ? ['κ₁ = 1：五步都停在 x₀；青色四面体仍读 κ = 1/3。', 'κ₁ = 1: all five steps stay at x₀; the cyan tetrahedron still reads κ = 1/3.']
          : ['κ₁ = 1：五步都停在银白的 x₀，没有五边形；青色正四面体的六条边仍都读 κ = 1/3。推时间轴，品红的五步张开。', 'κ₁ = 1: all five steps stay at the silver x₀, no pentagon; the six cyan edges of the regular tetrahedron still read κ = 1/3. Move the rail and the magenta five steps open.'];
      if (r === 'exact')
        return figure
          ? [`品红五步闭合，边读 ${kText(m)}，紫色对角线读 ${k2Text(m)}；青色四面体读 1/3。`, `The magenta five steps close, edges ${kText(m)}, violet diagonals ${k2Text(m)}; the cyan tetrahedron reads 1/3.`]
          : [
              `青色正四面体的六条边都读有理的 κ = 1/3。品红的五步在 κ₁ ${k1Rel(m)} ≈ ${fmt(m.k1)} 时闭合成${m.heap.exact.kind === 'phi' ? '正五边形' : '五角星'}（x₅ = x₀），紫色对角线读 ${k2Text(m)} ≈ ${fmt(m.heap.k2)}：两者是 16κ² − 12κ + 1 = 0 的共轭根，都不是有理数。`,
              `The six cyan edges of the tetrahedron all read the rational κ = 1/3. The magenta five steps close into a ${m.heap.exact.kind === 'phi' ? 'regular pentagon' : 'five-pointed star'} (x₅ = x₀) at κ₁ ${k1Rel(m)} ≈ ${fmt(m.k1)}; its violet diagonals read ${k2Text(m)} ≈ ${fmt(m.heap.k2)}: conjugate irrational roots of 16κ² − 12κ + 1 = 0.`
            ];
      if (figure)
        return [`κ₁ ${k1Rel(m)}：品红五步留下缺口 ${gapRel(m)}；青色四面体读 1/3。`, `κ₁ ${k1Rel(m)}: the magenta five steps leave a gap ${gapRel(m)}; the cyan tetrahedron reads 1/3.`];
      if (r === 'fib') {
        const n = m.heap.exact.n,
          P0 = fstr(frac(n % 2 ? -1 : 1, FIB[n] ** 2));
        return [
          `κ₁ ${k1Rel(m)} = F<sub>${n + 2}</sub>/(4F<sub>${n}</sub>) 是有理数：品红的五步差一道缺口才回到 x₀（1 − κ(x₀, x₅) ${gapRel(m)}），16κ₁² − 12κ₁ + 1 = (−1)<sup>${n}</sup>/F<sub>${n}</sub>² = ${P0}，正是卡西尼的 ±1。青色四面体仍读 1/3。`,
          `κ₁ ${k1Rel(m)} = F<sub>${n + 2}</sub>/(4F<sub>${n}</sub>) is rational: the magenta five steps miss x₀ by a gap (1 − κ(x₀, x₅) ${gapRel(m)}), 16κ₁² − 12κ₁ + 1 = (−1)<sup>${n}</sup>/F<sub>${n}</sub>² = ${P0}, the ±1 of Cassini. The cyan tetrahedron still reads 1/3.`
        ];
      }
      return [
        `κ₁ ${k1Rel(m)}：品红的五步留下缺口 1 − κ(x₀, x₅) ${gapRel(m)}，16κ₁² − 12κ₁ + 1 ${pRel(m)}；除不动的 κ₁ = 1 外，只有 (φ + 1)/4 与 (2 − φ)/4 让五步闭合。青色四面体仍读 1/3。`,
        `κ₁ ${k1Rel(m)}: the magenta five steps leave a gap 1 − κ(x₀, x₅) ${gapRel(m)}, 16κ₁² − 12κ₁ + 1 ${pRel(m)}; besides the motionless κ₁ = 1, only (φ + 1)/4 and (2 − φ)/4 close them. The cyan tetrahedron still reads 1/3.`
      ];
    }
    const pq = m.probe,
      Qt = `(${pq.coords.map(fstr).join(', ')})`;
    if (r === 'scaffold')
      return figure
        ? ['λ = 0：品红与青色的平直脚手架叠在球上；青色有理点不动。', 'λ = 0: the magenta and cyan flat scaffold lies over the sphere; the cyan rational points stay.']
        : [
            `λ = 0：平直脚手架全部叠上：青色的多面体与正六边形、品红的弓形、角亏与欧拉切线步。把 λ 推回 1，它们淡出，青色的有理点留在球上；琥珀探针 Q(σ) = ${Qt}。`,
            `λ = 0: the whole flat scaffold lies over the sphere: the cyan polyhedron and hexagon, the magenta segments, defects and Euler steps. Push λ back to 1 and they fade, the cyan rational points stay on the sphere; amber probe Q(σ) = ${Qt}.`
          ];
    if (figure)
      return [`λ ${eqRel(null, m.lambda, 2)}：青色有理点都在球上，琥珀 Q(σ) = ${Qt}，κ = ${fstr(pq.kappa)}。`, `λ ${eqRel(null, m.lambda, 2)}: the cyan rational points lie on the sphere, amber Q(σ) = ${Qt}, κ = ${fstr(pq.kappa)}.`];
    return [
      `λ ${eqRel(null, m.lambda, 2)}：光滑球面上的青色点都是 Q(σ)（σ 的分母 ≤ 3），‖Q(σ)‖² 恰为 1；青色同心环是 κ(1, ·) = 1/2、1/3、1/4。琥珀探针 Q(σ) = ${Qt}，σ = (${pq.sigma.map(fstr).join(', ')})，κ(1, Q) = 1/(1 + ‖σ‖²) = ${fstr(pq.kappa)}。`,
      `λ ${eqRel(null, m.lambda, 2)}: the cyan points on the smooth sphere are all Q(σ) (denominators of σ ≤ 3), with ‖Q(σ)‖² exactly 1; the cyan rings of rational fidelity are κ(1, ·) = 1/2, 1/3, 1/4. Amber probe Q(σ) = ${Qt}, σ = (${pq.sigma.map(fstr).join(', ')}), κ(1, Q) = 1/(1 + ‖σ‖²) = ${fstr(pq.kappa)}.`
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
    if (p.nu) state.nu = p.nu;
    if (p.N) state.N = p.N;
    if (p.probe) state.probe = p.probe.slice();
    sc.view(cams[p.scene], booting || TRV.still ? 0 : 600);
    const still = p.still === 'end' ? clock.max : p.still;
    // a still, a reader who asked for reduced motion and a freshly opened page (the lab, an embed, a cited figure) park on
    // the declared frame, the one the caption names; ▶ then plays the sweep from its start (rearm)
    const parked = TRV.still || TRV.reduceMotion || !p.play || booting;
    clock.set(parked ? still : 0);
    if (!parked) {
      stopAt = still;
      clock.play();
    }
    paint();
  }
  const NOTES = Object.fromEntries(Object.keys(PRESETS).map((id) => [id, ['', '']]));
  const notesObj = NOTES,
    idlePair = [...IDLE];
  const cards = kit.cards($('presets'), { presets: PRESETS, notes: notesObj, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset, idle: idlePair });
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
    if (s === 'pi') return Array.from({ length: 46 }, (_, k) => [eq(TAU / (3 + k)), 3 + k]);
    if (s === 'euler') return Array.from({ length: 721 }, (_, k) => [eq(gridTheta(k)), gridTheta(k)]);
    return Array.from({ length: 1001 }, (_, k) => {
      const kk = k / 1000,
        c = 2 * kk - 1;
      return [[c, 2 * Math.sqrt(Math.max(0, kk * (1 - kk))), 0], kk];
    });
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
      y = ev.clientY - b.top;
    const s = state.scene;
    if (s === 'pure') {
      // the probe: the front point of the sphere under the pointer, σ = (y, z)/(1 + x) snapped to (ℤ/6)²
      const p = sc.pick(ev),
        d = 1 + p[0];
      if (d < 0.05) return;
      const a = clamp(Math.round((6 * p[1]) / d), -18, 18),
        bb = clamp(Math.round((6 * p[2]) / d), -18, 18);
      if (a !== state.probe[0] || bb !== state.probe[1]) {
        state.probe = [a, bb];
        paint();
      }
      return;
    }
    const key = PARAM[s],
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
    const s = state.scene,
      up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp';
    if (s === 'pure') {
      const [a, b] = state.probe;
      if (ev.key === 'Home') state.probe = [0, 0];
      else if (ev.key === 'End') state.probe = [-6, 6];
      else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') state.probe = [clamp(a + (up ? 1 : -1), -18, 18), b];
      else state.probe = [a, clamp(b + (up ? 1 : -1), -18, 18)];
      paint();
      return;
    }
    if (ev.key === 'Home') clock.set(0);
    else if (ev.key === 'End') clock.set(1);
    else clock.stepBy(up ? 1 : -1); // to the multiples of the step: a repeated sum would miss the ends of the rail by 10⁻¹⁵
  };
  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ----------
     Nothing but the frame and the ranges is given here: the polygon and the polyhedra, the tangent steps and the Cayley step, the six
     heaps, the series, the Fibonacci steps and the rational points are run, and the sentences take their numbers from the results. */
  const FRAME = { scene: 'pi', nu: 1, N: 6, theta: PI / 2, k1: 0.25, lambda: 1, probe: [6, 6] };
  const STEPS = 30; // the Fibonacci steps of the checks
  const SHOWN = 5; // the one that is written out
  const different = (list) => [...new Set(list)];
  /** The least t > 0 with exp(t·i) = 1, met on the ray itself: the first step over which sin t crosses 0 upwards, bisected. */
  function rayPeriod() {
    let a = 0.5;
    while (!(sn(a) < 0 && sn(a + 0.5) >= 0)) a += 0.5;
    let b = a + 0.5;
    for (let k = 0; k < 60; k++) {
      const c = (a + b) / 2;
      if (sn(c) < 0) a = c;
      else b = c;
    }
    return b;
  }
  function benchmarks() {
    const run = (patch) => {
      const m = compute({ ...FRAME, ...patch });
      return { m, I: instances(m) };
    };
    const { m, I } = run({}),
      heaps = CHEB_CHIPS.map((q) => ({ q, step: firstReturn(...q), ...run({ k1: fval(q) }) })),
      worst = (f) => Math.max(...heaps.map((h) => f(h.I)));
    // the ray exp(t·i): its period; H from the reading cos²(t√(H/2)) at t = 1
    const T = rayPeriod(),
      H = 2 * Math.acos(Math.sqrt(kappa([1, 0, 0, 0], [cs(1), sn(1), 0, 0]))) ** 2;
    // x ↦ 1 + 1/x from 1 on fractions: p/q ↦ (p + q)/p; it is fixed when p² = pq + q²
    const ratios = [];
    for (let k = 0, p = 1, q = 1; k < STEPS; k++) {
      [p, q] = [p + q, p];
      ratios.push([p, q]);
    }
    const steps = Array.from({ length: STEPS }, (_, k) => fibFacts(k + 1)),
      cassini = Array.from({ length: STEPS + 1 }, (_, n) => FIB[n] * FIB[n + 2] - FIB[n + 1] ** 2 === (n % 2 ? 1 : -1));
    return {
      m,
      I,
      heaps,
      domes: domes(),
      fine: fine(),
      limit: (6 * Math.sqrt(3)) / (3 * PHI + 2),
      drift: {
        cheb: worst(({ cheb }) => Math.max(cheb.norm, cheb.rec, cheb.dot)),
        dist: worst(({ dist }) => dist.heap),
        gram: worst(({ gram }) => gram.gap),
        double: worst(({ ray }) => ray.dup),
        ray: Math.abs(H - (2 * PI ** 2) / T ** 2)
      },
      ray: { T, H, law: I.ray.law },
      series: { exact: dottieExact(3), sum: I.dottie.sum, gap: I.dottie.gap, terms: I.dottie.terms },
      ico: icoKappa,
      fib: { ratios, fixed: ratios.filter(([p, q]) => p * p === p * q + q * q).length, cassini: cassini.filter(Boolean).length, hurwitz: steps.filter((f) => f.boundHi < f.distLo && f.gapLo > 0).length, shown: steps[SHOWN - 1], kappa: fibK(SHOWN) },
      points: { count: RATIONAL.length, residue: RATIONAL_RESIDUE, law: RATIONAL.filter((r) => r.law).length, kappa: m.probe.kappa, sigma: m.probe.sigma }
    };
  }
  const BENCH = benchmarks();
  const defectSum = () => different(BENCH.domes.map((g) => defectRel(g.sumDeg))).join(', ');
  /** The numbers of the drawer, by the data-bench of the spans that show them. */
  const DRAWER = {
    sagitta: () => sagRel(BENCH.m),
    sagittaBounds: (say) => sagBounds(BENCH.m, BENCH.I.sag, say),
    defectSum,
    nu2First: () => irrRel(BENCH.domes[0].nu2max),
    nu2Last: () => irrRel(BENCH.domes[BENCH.domes.length - 1].nu2max),
    nu2Limit: () => irrRel(BENCH.limit),
    escape: (say) => z2Law(BENCH.m, say, `|z${subscript(BENCH.m.N)}|²`),
    compound: (say) => compoundLaw(BENCH.m, say),
    kStar: () => irrRel(KSTAR),
    kConj: () => irrRel(KCONJ),
    icoNear: () => irrRel(BENCH.ico.near),
    icoFar: () => irrRel(BENCH.ico.far)
  };
  /** The text of the NUM box. */
  function numText(say) {
    const { m, I, heaps, domes: ds, fine: f, drift, ray, series, ico, fib, points } = BENCH,
      N = m.N,
      angle = `θ ${degRel(m.thetaDeg, 0)}`,
      list = say('、', ', '),
      nus = `ν = ${ds[0].nu} … ${ds[ds.length - 1].nu}`,
      // a count of checks that hold: all of them, or how many
      tally = (k, n) => (k === n ? say(`${n} 条全部成立`, `all ${n} hold`) : say(`${n} 条里成立 ${k} 条`, `${k} of ${n} hold`)),
      ranks = ds.filter((g) => g.rank === g.F - 1 && g.rank === g.E - g.V + 1).length,
      [first] = ds,
      back = heaps.filter((h) => h.step).sort((a, b) => a.step - b.step),
      never = heaps.filter((h) => !h.step),
      names = (hs) => hs.map((h) => fstr(h.q)).join(list),
      [k1, k2, k3] = exactReadings(m),
      // (the double of 2π²/T² at T = 2π as a fraction, when it is a short one)
      [lawP, lawQ] = ratio(ray.law),
      law = eqRel(lawQ <= 64n ? fstr([Number(lawP), Number(lawQ)]) : null, ray.law),
      anti = eqRel(Math.abs(ico.anti) <= 1e-12 ? '0' : null, ico.anti),
      pair = points.sigma.map(fstr).join(', '),
      tail = tailRel(I.tail, say, `(θ<sup>${N}</sup>/${N}!)/(1 − θ/${N + 1})`),
      n = fib.shown.n;
    return say(
      `打开页面时由脚本现算，不检验各条定理的前提：弓形 1 − cos(π/${N}) ${sagRel(m)}；取 σ = π、T = 1、α = 1（s = π/N 是正 N 边形每条弦所对的半角），N = ${N} 的累计矢高 ${sagBounds(m, I.sag, say)}；${nus} 各自的角亏之和 Σδ ${defectSum()}，ν²·最大角亏 ${approx(ds.map((g) => fmt(g.nu2max)).join(list))}（ν = ${f.nu} 时 ${irrRel(f.nu2max)}，向手工推导的极限 6√3/(3φ + 2) ${irrRel(BENCH.limit)} 靠近）；${nus} 的 V − E + F = ${different(ds.map((g) => g.chi)).join(list)}，ℤ₂ 面边界的秩 F − 1 = E − V + 1，${tally(ranks, ds.length)}（ν = ${first.nu}：${first.V} − ${first.E} + ${first.F} = ${first.chi}，秩 ${first.rank}）；${angle}、N = ${N} 时 ${DRAWER.escape(say)}，${compoundLaw(m, say)}，‖Q(σ)‖² ${qRel(m)}，泰勒尾（ℂ 里 x = iθ、r = θ、n = N）|e<sup>iθ</sup> − Σ<sub>k&lt;${N}</sub>(iθ)<sup>k</sup>/k!| ${tail}，凯莱比的模在 Re s = 1/2 上 ${idRel(1, I.cay.norm)}，在 Re s = 0.6 上 ${offLaw(I.cay, say)}；堆点只用四元数乘法与逆算出，κ₁ 取右栏的 ${names(heaps)} 时：x₀ … x${subscript(I.cheb.n)} 的模方以及与 U<sub>n</sub>、T<sub>n</sub> 的逐项比较（到 n = ${I.cheb.n}）浮点偏差 ${below(drift.cheb)}，κ(x₀, x<sub>n</sub>) − (1 − ‖x₀ − x<sub>n</sub>‖²/4) 浮点偏差 ${below(drift.dist)}，det G₃ 由矩阵展开与由公式算出的值浮点偏差 ${below(drift.gram)}，倍增律 κ(1, g²) = (2κ(1, g) − 1)² 浮点偏差 ${below(drift.double)}；T<sub>n</sub>(2κ₁ − 1) 的整数递推：κ₁ = ${names(back)} 的轨道在第 ${back.map((h) => h.step).join(list)} 步回到 x₀，κ₁ = ${names(never)} 的前 ${ORBIT} 步都不回到 x₀；κ₁ = ${k1} 时 κ₂ = ${k2}、κ₃ = ${k3}，共面恒等式给出定心 det G₃ ${detRel(m)}；射线 exp(t·i) 第一次回到 1 在 T = 2π（扫描得 ${irrRel(ray.T)}），2π²/T² ${law}，由 t = 1 处的读数 cos²(t√(H/2)) 解出的 H(i, i) 与它浮点偏差 ${below(drift.ray)}；逆级数的系数由拉格朗日反演算出（b₁ = ${fstr(series.exact[1])}，b₃ = ${fstr(series.exact[3])}），前 ${series.terms} 项在 π 处的部分和 ${eqRel(null, series.sum, 8)}，与迭代 cos 得到的 θ* 相差 ${below(series.gap)}；κ₁ = (φ + 1)/4 ${irrRel(KSTAR)} 与 (2 − φ)/4 ${irrRel(KCONJ)}；正二十面体（${icosa.V.length} 个顶点，每个顶点 ${different(ico.faces).join(list)} 个三角形）相邻顶点对的 κ 是 (φ + 2)/5 ${irrRel(ico.near)}，非对跖的相隔顶点对是 (3 − φ)/5 ${irrRel(ico.far)}（对跖顶点对读 κ ${anti}）；从 1 出发迭代 x ↦ 1 + 1/x 得斐波那契比 ${fib.ratios.slice(0, SHOWN).map(fstr).join(list)} …，前 ${fib.ratios.length} 个里不动点 ${fib.fixed} 个；卡西尼恒等式核对 n = 0 … ${STEPS}，${tally(fib.cassini, STEPS + 1)}，n = ${n} 时 κ${subscript(n)} = ${fstr(fib.kappa)}，余数 ${fstr(fib.shown.P)}；赫尔维茨下界核对 q = F<sub>n+1</sub>/F<sub>n</sub>（n = 1 … ${STEPS}），${tally(fib.hurwitz, STEPS)}，n = ${n} 时 ${hurwitzRel(fib.shown, say)}；${points.count} 个有理点（σ = (a/d, b/d)，d ≤ 3，|a|、|b| ≤ 2d）的 ‖Q(σ)‖² − 1 用整数算最大是 ${points.residue}，核对 κ(1, Q(σ)) = 1/(1 + ‖σ‖²)，${tally(points.law, points.count)}，σ = (${pair}) 时为 ${fstr(points.kappa)}。数值演示，不是证明。`,
      `Computed by the script when the page opens; it does not check the hypotheses of the theorems: the sagitta 1 − cos(π/${N}) ${sagRel(m)}; with σ = π, T = 1 and α = 1 (s = π/N is the half angle of each chord of the regular N-gon) the accumulated sagitta at N = ${N}, ${sagBounds(m, I.sag, say)}; Σδ ${defectSum()}, the sum of the defects, for each of ${nus}, and ν²·largest defect ${approx(ds.map((g) => fmt(g.nu2max)).join(list))} (${irrRel(f.nu2max)} at ν = ${f.nu}, approaching the limit 6√3/(3φ + 2) ${irrRel(BENCH.limit)} derived by hand); V − E + F = ${different(ds.map((g) => g.chi)).join(list)} for ${nus}, with ℤ₂ face-boundary rank F − 1 = E − V + 1, ${tally(ranks, ds.length)} (ν = ${first.nu}: ${first.V} − ${first.E} + ${first.F} = ${first.chi}, rank ${first.rank}); at ${angle} and N = ${N}, ${DRAWER.escape(say)}, ${compoundLaw(m, say)}, ‖Q(σ)‖² ${qRel(m)}, the Taylor tail (x = iθ in ℂ, r = θ, n = N) |e<sup>iθ</sup> − Σ<sub>k&lt;${N}</sub>(iθ)<sup>k</sup>/k!| ${tail}, and the modulus of the Cayley ratio is ${idRel(1, I.cay.norm)} on Re s = 1/2, while at Re s = 0.6, ${offLaw(I.cay, say)}; the heap points are computed by quaternion products and inverses only; at the κ₁ of the right column, ${names(heaps)}: the squared norms of x₀ … x${subscript(I.cheb.n)} and their comparison with U<sub>n</sub> and T<sub>n</sub> up to n = ${I.cheb.n}, floating-point drift ${below(drift.cheb)}; κ(x₀, x<sub>n</sub>) − (1 − ‖x₀ − x<sub>n</sub>‖²/4), floating-point drift ${below(drift.dist)}; det G₃ expanded from the matrix and from the formula, floating-point drift ${below(drift.gram)}; the doubling law κ(1, g²) = (2κ(1, g) − 1)², floating-point drift ${below(drift.double)}; the integer recursion of T<sub>n</sub>(2κ₁ − 1): the orbits of κ₁ = ${names(back)} return to x₀ at steps ${back.map((h) => h.step).join(list)}, and that of κ₁ = ${names(never)} does not return within ${ORBIT} steps; at κ₁ = ${k1}, κ₂ = ${k2}, κ₃ = ${k3} and, by the coplanar identity, the centered det G₃ ${detRel(m)}; the ray exp(t·i) is first back at 1 at T = 2π (found by a scan, ${irrRel(ray.T)}), 2π²/T² ${law}, and H(i, i), solved from the reading cos²(t√(H/2)) at t = 1, agrees with it, floating-point drift ${below(drift.ray)}; the coefficients of the inverse series by Lagrange inversion (b₁ = ${fstr(series.exact[1])}, b₃ = ${fstr(series.exact[3])}), whose first ${series.terms} terms have at π the partial sum ${eqRel(null, series.sum, 8)}; it differs from the θ* found by iterating cos by ${below(series.gap)}; κ₁ = (φ + 1)/4 ${irrRel(KSTAR)} and (2 − φ)/4 ${irrRel(KCONJ)}; on the regular icosahedron (${icosa.V.length} vertices, ${different(ico.faces).join(list)} triangles per vertex) adjacent vertex pairs read κ = (φ + 2)/5 ${irrRel(ico.near)} and non-antipodal separated pairs (3 − φ)/5 ${irrRel(ico.far)} (antipodal pairs read κ ${anti}); iterating x ↦ 1 + 1/x from 1 gives the Fibonacci ratios ${fib.ratios.slice(0, SHOWN).map(fstr).join(list)}, …, of whose first ${fib.ratios.length} the number of fixed points is ${fib.fixed}; the Cassini identity for n = 0 … ${STEPS}, ${tally(fib.cassini, STEPS + 1)}, with κ${subscript(n)} = ${fstr(fib.kappa)} and remainder ${fstr(fib.shown.P)} at n = ${n}; the Hurwitz bound at q = F<sub>n+1</sub>/F<sub>n</sub> (n = 1 … ${STEPS}), ${tally(fib.hurwitz, STEPS)}, with ${hurwitzRel(fib.shown, say)} at n = ${n}; for the ${points.count} rational points (σ = (a/d, b/d), d ≤ 3, |a|, |b| ≤ 2d) the largest ‖Q(σ)‖² − 1 in integer arithmetic is ${points.residue}, and κ(1, Q(σ)) = 1/(1 + ‖σ‖²), ${tally(points.law, points.count)}; it is ${fstr(points.kappa)} at σ = (${pair}). A numerical illustration, not a proof.`
    );
  }
  for (const [lang, say] of [['zh', ZH], ['en', EN]]) {
    $('numEvidenceBody').querySelector('.' + lang).innerHTML = numText(say);
    for (const el of document.querySelectorAll(`#drawer .${lang} [data-bench]`)) el.innerHTML = DRAWER[el.dataset.bench](say);
  }
  // the drawer repeats every evidence box of the panel (an id stays on the panel)
  $('drawerEvidence').append(
    ...[...document.querySelectorAll('#basis .lean')].map((el) => {
      const copy = el.cloneNode(true);
      for (const x of [copy, ...copy.querySelectorAll('[id]')]) x.removeAttribute('id');
      return copy;
    })
  );
  TRV.drawer({ drawer: $('drawer'), open: $('infoBtn'), close: $('drawerClose') });
  TRV.startGlitch(document.querySelector('.brand'));
  TRV.onLang(() => {
    noteKey = null;
    paint();
  });

  /* ---------- probe, cover, start ---------- */
  window.RATIONAL_DEBUG = Object.freeze({
    get state() {
      const m = calc(),
        I = instances(m);
      return JSON.parse(
        JSON.stringify({
          ...m,
          heap: { ...m.heap, exact: m.heap.exact },
          regime: regime(m),
          lens: state.lens,
          layers: layers(),
          t: clock.t,
          playing: clock.playing,
          preset: cards.current,
          blending: !!(state.from && state.blend < 1),
          camera: { ...sc.cam },
          handle: handleWorld(m),
          rational: RATIONAL.length,
          fine: { nu: 30, nu2max: fine().nu2max },
          leanInstances: I
        })
      );
    },
    /** The rational points of the pure scene: σ and Q(σ). */
    rational: () => JSON.parse(JSON.stringify(RATIONAL)),
    /** The numbers behind the NUM box and the drawer, as computed when the page opened. */
    bench: () => JSON.parse(JSON.stringify({ ...BENCH, fine: { nu: BENCH.fine.nu, nu2max: BENCH.fine.nu2max } })),
    /** The vertex defects of the geodesic polyhedron ν (radians). */
    defects: (nu) => geodesic(nu).defects.slice(),
    /** The coefficients of the inverse series (b₀ … b₆₁) and its partial sums at π. */
    series: () => JSON.parse(JSON.stringify(dottie())),
    presets: JSON.parse(JSON.stringify(PRESETS)),
    /** The number formatters (pure functions) and the Hurwitz inequality of the Fibonacci step n as printed. */
    print: Object.freeze({ fmtFloor, fmtCeil, sci, sciFloor, sciCeil, eqRel, sciRel, degRel }),
    hurwitz: (n) => ({ ...fibFacts(n), text: hurwitzRel(fibFacts(n)) }),
    /** The truncated exponential at (N, θ), its enclosures and the inequality as printed. */
    tail: (N, th) => ({ ...expTail(N, th), text: tailRel(expTail(N, th)) }),
    /** Viewport coordinates of a world point of the stage, for drag targets. */
    project: viewportPoint,
    /** Where the handle would sit for a value of the parameter of the scene. */
    handleAt: (v) => {
      const s = state.scene;
      if (s === 'pi') return viewportPoint(eq(TAU / v));
      if (s === 'euler') return viewportPoint(eq(v));
      if (s === 'pure') return viewportPoint(W(cayley([v[0] / 6, v[1] / 6, 0])));
      return viewportPoint([2 * v - 1, 2 * Math.sqrt(Math.max(0, v * (1 - v))), 0]);
    }
  });
  window.TRV_THUMB = () => {
    // the cover: the flat hexagon and icosahedron in the sphere, with their magenta segments and defect cones
    cards.pick(DEFAULT);
    clock.pause();
    clock.set(MAP.pi.t(6));
    paint.now();
  };
  cards.pick(cards.initial(DEFAULT));
  booting = false;
  paint.now();
})();
