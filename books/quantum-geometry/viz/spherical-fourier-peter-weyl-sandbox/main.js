/* OMEGA//PETER-WEYL · 三元球面傅里叶变换与彼得—外尔合成 · Spherical Fourier transform and Peter–Weyl synthesis (Chapter 39, §39.7)
   World (kit.solid): z up. Left, the ball of S³(1) = 𝕋_3 in exponential coordinates: g = cos α + sin α n̂ ↦ (α/π) n̂, its
   imaginary axes (i, j, k) turned by −90° about k (i → −y, j → x), so that the axis (1, 1, 1) points into the octant
   x > 0, y < 0, z > 0 cut out of the ball. The centre is 1, the whole outer sphere stands for −1. Right, the Peter–Weyl
   spectral pyramid: one layer of (2j + 1) × (2j + 1) tiles per spin shell j (for a finite group, one block per irreducible
   representation, layered by dimension).
     κ        the ray reading c² with c = ⟨x, y⟩ = Re(x⁻¹ y); the characters are χ_j = U_{2j}(c), so integer spins are
              polynomials in κ with integer coefficients and half-integer spins are c times one (c = ±√κ, the double cover);
     triad    D^{1/2} ⊗ D^{1/2} at g = c + s (i + j + k)/√3 in the basis (↑↓, ↑↑, ↓↑, ↓↓), its middle plane turned by λ · 45°;
     gibbs    the cap 1{α < π/3} (rim κ = 1/4): hard cutoff Σ_{2l ≤ B} c_l χ_l, positive kernel Σ c_l m_l χ_l with
              m_l = w_l/(2l + 1) from (Σ_{a<M} χ_{a/2})²/M, M = ⌊B/2⌋ + 1; on the flat circle the cap |x| < π/3 with
              frequencies |k| ≤ B + 1 (the same number of sine modes);
     heap     (f ⊛ ḡ ⊛ h)(w) = Σ_{x,y} f(x) ḡ(y) h(y x⁻¹ w) on 2T or Q_8, in exact arithmetic over ℤ[ζ₁₂];
     band     the register j ≤ J_max, the kernel (Σχ)²/M scaled to peak 1 and a radix-2 butterfly network of K = 2^⌈log₂(2B + 2)⌉ points.
   Every number is computed here; a number is written after “=” only when its digits are the value itself, after “≈”
   otherwise. Read-only probe: window.PETER_WEYL_DEBUG. */
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
  const round2 = (x) => Math.round(x * 100) / 100;
  const fx = (x, d = 4) => kit.fix(x, d);

  /* ---------- exact numbers: fractions [p, q] of BigInts, q > 0 ---------- */
  const gcdB = (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b) [a, b] = [b, a % b];
    return a;
  };
  const fr = (p, q = 1n) => {
    p = BigInt(p);
    q = BigInt(q);
    if (q < 0n) [p, q] = [-p, -q];
    const g = gcdB(p, q) || 1n;
    return [p / g, q / g];
  };
  const fadd = ([a, b], [c, d]) => fr(a * d + c * b, b * d);
  const fmul = ([a, b], [c, d]) => fr(a * c, b * d);
  const fval = ([p, q]) => Number(p) / Number(q);
  const fstr = ([p, q]) => String(p).replace('-', '−') + (q === 1n ? '' : '/' + q);
  /** The decimal of p/q when it terminates within 18 digits (q divides a power of ten), else null. */
  function decimal([p, q]) {
    let k = 0,
      s = 1n;
    while (k <= 18 && s % q !== 0n) {
      s *= 10n;
      k++;
    }
    if (s % q !== 0n) return null;
    const n = p * (s / q),
      neg = n < 0n;
    let str = (neg ? -n : n).toString();
    if (k > 0) {
      str = str.padStart(k + 1, '0');
      str = (str.slice(0, -k) + '.' + str.slice(-k)).replace(/0+$/, '').replace(/\.$/, '');
    }
    return (neg && str !== '0' ? '−' : '') + str;
  }
  const isqrtB = (n) => {
    if (n < 0n) return null;
    if (n < 2n) return n;
    let x = BigInt(Math.floor(Math.sqrt(Number(n))));
    while (x * x > n) x--;
    while ((x + 1n) * (x + 1n) <= n) x++;
    return x * x === n ? x : null;
  };
  /** √(p/q) as a fraction when it is one. */
  const fsqrt = ([p, q]) => {
    const a = isqrtB(p),
      b = isqrtB(q);
    return a == null || b == null ? null : [a, b];
  };
  /** The fraction a parameter stands for when it lies on the grid of 1/n, else null. */
  const onGrid = (x, n) => (Math.abs(Math.round(x * n) - x * n) < 1e-9 ? fr(BigInt(Math.round(x * n)), BigInt(n)) : null);
  /** “= exact” or “≈ x”. */
  const EQ = (s) => '= ' + s,
    AP = (x, d = 4) => '≈ ' + fx(x, d);
  const rel = (q, x, d = 4) => {
    const s = q && decimal(q);
    return s != null ? EQ(s) : AP(x, d);
  };
  const pct = (x, d = 2) => fx(100 * x, d) + '%';
  const SUPS = { '−': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** “< 10⁻ⁿ” for a nonnegative x, as the bound of a floating-point drift. */
  const below = (x) => {
    if (!(x > 0)) return '0';
    const e = Math.ceil(Math.log10(x) + 1e-12);
    return '&lt; 10' + String(e).replace('-', '−').split('').map((ch) => SUPS[ch]).join('');
  };
  const sci = (x, d = 2) => {
    if (x === 0) return '0';
    const e = Math.floor(Math.log10(Math.abs(x)));
    return `${fx(x / 10 ** e, d)}×10${String(e).replace('-', '−').split('').map((ch) => SUPS[ch]).join('')}`;
  };

  /* ---------- characters: χ_j = U_{2j}(c), as polynomials and as values ---------- */
  const NMAX = 30;
  /** U_n in powers of c, integer coefficients, n = 0 … NMAX + 2. */
  const UPOLY = (() => {
    const U = [[1], [0, 2]];
    for (let n = 1; n <= NMAX + 1; n++) {
      const r = new Array(n + 2).fill(0);
      U[n].forEach((v, k) => (r[k + 1] += 2 * v));
      U[n - 1].forEach((v, k) => (r[k] -= v));
      U.push(r);
    }
    return U;
  })();
  /** The polynomial in κ of shell n = 2j: χ itself for even n, χ² for odd n (χ = c Q(κ), χ² = κ Q(κ)²). */
  function kappaPoly(n) {
    const u = UPOLY[n];
    if (n % 2 === 0) return u.filter((_, k) => k % 2 === 0);
    const q = u.filter((_, k) => k % 2 === 1),
      sq = new Array(2 * q.length).fill(0);
    q.forEach((a, i) => q.forEach((b, k) => (sq[i + k + 1] += a * b)));
    return sq;
  }
  /** Q(κ) of an odd shell: χ = c Q(κ). */
  const oddFactor = (n) => UPOLY[n].filter((_, k) => k % 2 === 1);
  const SUP = ['', '', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸'];
  function polyText(coef, v = 'κ') {
    const parts = [];
    for (let k = coef.length - 1; k >= 0; k--) {
      const a = coef[k];
      if (!a) continue;
      const mag = Math.abs(a),
        body = k === 0 ? String(mag) : (mag === 1 ? '' : String(mag)) + v + SUP[k];
      parts.push(parts.length ? (a < 0 ? ' − ' : ' + ') + body : (a < 0 ? '−' : '') + body);
    }
    return parts.join('') || '0';
  }
  const evalPoly = (coef, x) => coef.reduceRight((s, a) => s * x + a, 0);
  const evalPolyQ = (coef, q) => coef.reduceRight((s, a) => fadd(fmul(s, q), fr(BigInt(a))), fr(0n));
  /** χ_n(c) by the recurrence of U_n. */
  function chiC(n, c) {
    let a = 1,
      b = 2 * c;
    if (n === 0) return 1;
    for (let k = 1; k < n; k++) [a, b] = [b, 2 * c * b - a];
    return b;
  }
  const JNAME = ['0', '1/2', '1', '3/2', '2', '5/2', '3', '7/2', '4'];
  const jname = (n) => (n % 2 ? `${n}/2` : String(n / 2));
  /** χ_n at κ (c = +√κ): its value, and its exact text when there is one. */
  function chiAt(n, kappa) {
    const c = Math.sqrt(kappa),
      x = chiC(n, c),
      kq = onGrid(kappa, 100);
    if (!kq) return { x, rel: AP(x), exact: null };
    if (n % 2 === 0) {
      const v = evalPolyQ(kappaPoly(n), kq);
      return { x, rel: rel(v, x), exact: v };
    }
    const cq = fsqrt(kq);
    if (!cq) return { x, rel: AP(x), exact: null, sq: evalPolyQ(kappaPoly(n), kq) };
    const v = fmul(cq, evalPolyQ(oddFactor(n), kq));
    return { x, rel: rel(v, x), exact: v };
  }

  /* ---------- the Weyl integration formula and the cap 1{α < π/3} ---------- */
  const ALPHA0 = PI / 3;
  /** (2/π) ∫₀^π sin²α · fn(α) dα by Simpson's rule. */
  function weyl(fn, N = 2000) {
    const h = PI / N;
    let s = 0;
    for (let i = 0; i <= N; i++) {
      const a = i * h,
        w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2;
      s += w * sn(a) ** 2 * fn(a);
    }
    return ((2 / PI) * s * h) / 3;
  }
  const S0 = (m) => (m === 0 ? ALPHA0 : sn(m * ALPHA0) / m);
  /** c_n = ∫ 1{α < π/3} χ_n dg = (1/π)(S(n) − S(n + 2)), n = 2l. */
  const CAP = Array.from({ length: NMAX + 1 }, (_, n) => (S0(n) - S0(n + 2)) / PI);
  const CAP_NORM2 = (ALPHA0 - sn(2 * ALPHA0) / 2) / PI;
  /** The multipliers of shell n at bandwidth B: the hard cutoff, and the positive kernel (Σ_{a<M} χ_{a/2})²/M. */
  const MULT = new Map();
  function multipliers(B) {
    if (MULT.has(B)) return MULT.get(B);
    const M = Math.floor(B / 2) + 1,
      hard = [],
      pos = [],
      posQ = [];
    for (let n = 0; n <= NMAX; n++) {
      hard.push(n <= B ? 1 : 0);
      let count = 0;
      for (let a = 0; a < M; a++) for (let b = 0; b < M; b++) if (Math.abs(a - b) <= n && n <= a + b && (a + b - n) % 2 === 0) count++;
      posQ.push(fr(BigInt(count), BigInt(M * (n + 1))));
      pos.push(count / (M * (n + 1)));
    }
    const out = { M, hard, pos, posQ };
    MULT.set(B, out);
    return out;
  }
  const synth = (alpha, w) => {
    const c = cs(alpha);
    let a = 1,
      b = 2 * c,
      s = CAP[0] * w[0];
    for (let n = 1; n <= NMAX; n++) {
      if (w[n]) s += CAP[n] * w[n] * b;
      [a, b] = [b, 2 * c * b - a];
    }
    return s;
  };
  /** The flat circle: the cap |x| < π/3 and its Fourier partial sum (hard) or Fejér mean with |k| ≤ K. */
  const flatCoef = (k) => (k === 0 ? ALPHA0 / PI : (2 * sn(k * ALPHA0)) / (k * PI));
  const flatSum = (x, K, fejer) => {
    let s = flatCoef(0);
    for (let k = 1; k <= K; k++) s += (fejer ? 1 - k / (K + 1) : 1) * flatCoef(k) * cs(k * x);
    return s;
  };
  /** Largest excursion above 1 and below 0 of fn on [0, π]: a grid, then golden refinement around the worst points. */
  function excursion(fn) {
    const N = 1500;
    let hi = { x: 0, v: -Infinity },
      lo = { x: 0, v: Infinity };
    for (let i = 0; i <= N; i++) {
      const x = (PI * i) / N,
        v = fn(x);
      if (v > hi.v) hi = { x, v };
      if (v < lo.v) lo = { x, v };
    }
    const refine = (p, sgn) => {
      let a = Math.max(0, p.x - PI / N),
        b = Math.min(PI, p.x + PI / N);
      const g = (Math.sqrt(5) - 1) / 2;
      for (let k = 0; k < 60; k++) {
        const x1 = b - g * (b - a),
          x2 = a + g * (b - a);
        if (sgn * fn(x1) > sgn * fn(x2)) b = x2;
        else a = x1;
      }
      const x = (a + b) / 2,
        v = fn(x);
      return sgn * v > sgn * p.v ? { x, v } : p;
    };
    hi = refine(hi, 1);
    lo = refine(lo, -1);
    return { max: hi.v, at: hi.x, min: lo.v, minAt: lo.x, over: Math.max(0, hi.v - 1, -lo.v) };
  }
  const GIBBS = new Map();
  function gibbs(B) {
    if (GIBBS.has(B)) return GIBBS.get(B);
    const w = multipliers(B),
      K = B + 1;
    const out = {
      B,
      K,
      M: w.M,
      flat: excursion((x) => flatSum(x, K, false)),
      fejer: excursion((x) => flatSum(x, K, true)),
      hard: excursion((a) => synth(a, w.hard)),
      pos: excursion((a) => synth(a, w.pos))
    };
    GIBBS.set(B, out);
    return out;
  }
  /** The Gibbs limit (1/π) Si(π) − 1/2 by Simpson's rule. */
  const GIBBS_LIMIT = (() => {
    const N = 4000,
      h = PI / N;
    let s = 0;
    for (let i = 0; i <= N; i++) {
      const x = i * h,
        w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2;
      s += w * (x === 0 ? 1 : sn(x) / x);
    }
    return (s * h) / 3 / PI - 0.5;
  })();
  /** The band-limited point event: the positive kernel (Σ_{a<M} χ_{a/2})²/M scaled to its peak 1 at α = 0, where
      Σ_{a<M} χ_{a/2}(1) = M(M + 1)/2; and the reproducing kernel Σ_{n≤B} (n + 1) χ_n / Σ (n + 1)², also 1 at α = 0. */
  const posKernel = (alpha, B) => {
    const M = Math.floor(B / 2) + 1,
      c = cs(alpha),
      peak = (M * (M + 1)) / 2;
    let s = 0;
    for (let a = 0; a < M; a++) s += chiC(a, c);
    return (s / peak) ** 2;
  };
  const dirKernel = (alpha, B) => {
    const c = cs(alpha);
    let s = 0,
      z = 0;
    for (let n = 0; n <= B; n++) {
      s += (n + 1) * chiC(n, c);
      z += (n + 1) ** 2;
    }
    return s / z;
  };
  const BAND = new Map();
  function band(B) {
    if (BAND.has(B)) return BAND.get(B);
    let dim = 0,
      kept = 0;
    for (let n = 0; n <= B; n++) {
      dim += (n + 1) ** 2;
      kept += CAP[n] ** 2;
    }
    // the half-maximum of the point event: the first α where the scaled kernel falls to 1/2 (with M = 1 it is 1 everywhere)
    let a = PI,
      b = PI;
    if (Math.floor(B / 2) > 0) {
      let x = 0;
      while (x < PI && posKernel(x, B) > 0.5) x += PI / 2000;
      a = Math.max(0, x - PI / 2000);
      b = Math.min(PI, x);
      for (let k = 0; k < 50; k++) {
        const mid = (a + b) / 2;
        if (posKernel(mid, B) > 0.5) a = mid;
        else b = mid;
      }
    }
    const neg = [];
    let run = null;
    for (let i = 0; i <= 600; i++) {
      const x = (PI * i) / 600,
        v = dirKernel(x, B);
      if (v < 0 && !run) run = [x, x];
      else if (v < 0) run[1] = x;
      else if (run) {
        neg.push(run);
        run = null;
      }
    }
    if (run) neg.push(run);
    const out = { B, dim, kept: kept / CAP_NORM2, half: (a + b) / 2, neg, minDir: Math.min(...sample(600, (t) => dirKernel(PI * t, B))) };
    BAND.set(B, out);
    return out;
  }

  /* ---------- quaternions: doubled integer coordinates of Hurwitz units, and floating unit quaternions ---------- */
  const q2mul = (x, y) => {
    const [a1, b1, c1, d1] = x,
      [a2, b2, c2, d2] = y;
    return [a1 * a2 - b1 * b2 - c1 * c2 - d1 * d2, a1 * b2 + b1 * a2 + c1 * d2 - d1 * c2, a1 * c2 - b1 * d2 + c1 * a2 + d1 * b2, a1 * d2 + b1 * c2 - c1 * b2 + d1 * a2].map((v) => v / 2);
  };
  const q2inv = ([a, b, c, d]) => [a, -b, -c, -d];
  const qmul = (x, y) => {
    const [a1, b1, c1, d1] = x,
      [a2, b2, c2, d2] = y;
    return [a1 * a2 - b1 * b2 - c1 * c2 - d1 * d2, a1 * b2 + b1 * a2 + c1 * d2 - d1 * c2, a1 * c2 - b1 * d2 + c1 * a2 + d1 * b2, a1 * d2 + b1 * c2 - c1 * b2 + d1 * a2];
  };
  const qconj = ([a, b, c, d]) => [a, -b, -c, -d];
  const SIGNS = [
    [1, 1, 1],
    [1, 1, -1],
    [1, -1, 1],
    [1, -1, -1],
    [-1, 1, 1],
    [-1, 1, -1],
    [-1, -1, 1],
    [-1, -1, -1]
  ];
  /** 2T in doubled coordinates: 1, −1, ±i, ±j, ±k, then the 8 units with real part 1/2 and the 8 with −1/2. Q_8 is its first 8. */
  const T24 = [
    [2, 0, 0, 0],
    [-2, 0, 0, 0],
    [0, 2, 0, 0],
    [0, -2, 0, 0],
    [0, 0, 2, 0],
    [0, 0, -2, 0],
    [0, 0, 0, 2],
    [0, 0, 0, -2],
    ...SIGNS.map((s) => [1, ...s]),
    ...SIGNS.map((s) => [-1, ...s])
  ];
  const QNAME = ['1', '−1', 'i', '−i', 'j', '−j', 'k', '−k', ...[1, -1].flatMap((r) => SIGNS.map((s) => `(${r > 0 ? '' : '−'}1${s.map((x, i) => (x > 0 ? '+' : '−') + 'ijk'[i]).join('')})/2`))];
  const qkey = (q) => q.join(',');

  /* ---------- ℤ[ζ], ζ = e^{iπ/6}: four integers in the basis 1, ζ, ζ², ζ³ with ζ⁴ = ζ² − 1 ---------- */
  const zAdd = (x, y) => [x[0] + y[0], x[1] + y[1], x[2] + y[2], x[3] + y[3]];
  const zSub = (x, y) => [x[0] - y[0], x[1] - y[1], x[2] - y[2], x[3] - y[3]];
  const zSc = (x, k) => [x[0] * k, x[1] * k, x[2] * k, x[3] * k];
  function zMul(x, y) {
    const r = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 4; i++) for (let k = 0; k < 4; k++) r[i + k] += x[i] * y[k];
    // ζ⁶ = −1, ζ⁵ = ζ³ − ζ, ζ⁴ = ζ² − 1
    return [r[0] - r[6] - r[4], r[1] - r[5], r[2] + r[4], r[3] + r[5]];
  }
  /** Complex conjugation: ζ̄ = ζ − ζ³, ζ̄² = 1 − ζ², ζ̄³ = −ζ³. */
  const zConj = ([a, b, c, d]) => [a + c, b, -c, -b - d];
  const zIsInt = (x) => x[1] === 0 && x[2] === 0 && x[3] === 0;
  const ZETA = Array.from({ length: 4 }, (_, m) => [cs((m * PI) / 6), sn((m * PI) / 6)]);
  const zC = (x) => [x.reduce((s, v, m) => s + v * ZETA[m][0], 0), x.reduce((s, v, m) => s + v * ZETA[m][1], 0)];
  const Z0 = [0, 0, 0, 0],
    Z1 = [1, 0, 0, 0];
  const gauss = (a, b) => [a, 0, 0, b];
  const OMEGA = [
    [1, 0, 0, 0],
    [-1, 0, 1, 0],
    [0, 0, -1, 0]
  ];
  const zm = {
    mul: (A, B) => A.map((row) => B[0].map((_, k) => row.reduce((s, a, i) => zAdd(s, zMul(a, B[i][k])), Z0))),
    adj: (A) => A[0].map((_, i) => A.map((row) => zConj(row[i]))),
    sc: (A, k) => A.map((row) => row.map((x) => zSc(x, k))),
    zero: (d) => Array.from({ length: d }, () => Array.from({ length: d }, () => Z0.slice()))
  };

  /* ---------- the two finite groups, their irreducible representations and the heap convolution ---------- */
  const EPS = [1, 1, 1, 1];
  const even = (q) => q.every((v) => v % 2 === 0);
  /** The class of q in 2T/Q_8 ≅ ℤ/3, with (1 + i + j + k)/2 ↦ 1. */
  const third = (q) => (even(q) ? 0 : even(q2mul(q, q2inv(EPS))) ? 1 : 2);
  const sigma2 = ([A, B, C, D]) => [
    [gauss(A, B), gauss(C, D)],
    [gauss(-C, D), gauss(A, -B)]
  ];
  const tauM = ([A, B, C, D]) =>
    [
      [A * A + B * B - C * C - D * D, 2 * (B * C - A * D), 2 * (B * D + A * C)],
      [2 * (B * C + A * D), A * A - B * B + C * C - D * D, 2 * (C * D - A * B)],
      [2 * (B * D - A * C), 2 * (C * D + A * B), A * A - B * B - C * C + D * D]
    ].map((row) => row.map((v) => [v / 4, 0, 0, 0]));
  const sign1 = (q, keep) => (keep(q) ? 1 : -1);
  const IRREPS = {
    '2T': [
      { key: 'triv', d: 1, s: 1, name: '1', j: 0, mat: () => [[Z1]] },
      { key: 'lam', d: 1, s: 1, name: '1′', mat: (q) => [[OMEGA[third(q)]]] },
      { key: 'lamb', d: 1, s: 1, name: '1″', mat: (q) => [[OMEGA[(2 * third(q)) % 3]]] },
      { key: 'sig', d: 2, s: 2, name: '2', j: 0.5, mat: sigma2 },
      { key: 'sigl', d: 2, s: 2, name: '2′', mat: (q) => sigma2(q).map((r) => r.map((x) => zMul(x, OMEGA[third(q)]))) },
      { key: 'siglb', d: 2, s: 2, name: '2″', mat: (q) => sigma2(q).map((r) => r.map((x) => zMul(x, OMEGA[(2 * third(q)) % 3]))) },
      { key: 'tau', d: 3, s: 1, name: '3', j: 1, mat: tauM }
    ],
    Q8: [
      { key: 'triv', d: 1, s: 1, name: '1', j: 0, mat: () => [[Z1]] },
      { key: 'ci', d: 1, s: 1, name: '1<sub>i</sub>', mat: (q) => [[zSc(Z1, sign1(q, (x) => x[2] === 0 && x[3] === 0))]] },
      { key: 'cj', d: 1, s: 1, name: '1<sub>j</sub>', mat: (q) => [[zSc(Z1, sign1(q, (x) => x[1] === 0 && x[3] === 0))]] },
      { key: 'ck', d: 1, s: 1, name: '1<sub>k</sub>', mat: (q) => [[zSc(Z1, sign1(q, (x) => x[1] === 0 && x[2] === 0))]] },
      { key: 'sig', d: 2, s: 2, name: '2', j: 0.5, mat: sigma2 }
    ]
  };
  const ELEMENTS = { '2T': T24, Q8: T24.slice(0, 8) };
  /** The integer functions: f has Σ f² = 46 on 2T (3 on i, j, k and 3, 2, 1, 0, 1, 2 along the heap orbit of
      ε = (1 + i + j + k)/2) and 15 on Q_8; g and h are two-point functions. */
  const FUNCS = {
    '2T': (() => {
      const f = new Array(24).fill(0);
      [
        [0, 3],
        [8, 2],
        [16, 1],
        [1, 0],
        [23, 1],
        [15, 2],
        [2, 3],
        [4, 3],
        [6, 3]
      ].forEach(([i, v]) => (f[i] = v));
      const g = new Array(24).fill(0),
        h = new Array(24).fill(0);
      g[0] = 1;
      g[8] = 1;
      h[0] = 1;
      h[4] = 1;
      return { f, g, h };
    })(),
    Q8: { f: [3, 0, 2, 0, 1, 0, 1, 0], g: [1, 0, 1, 0, 0, 0, 0, 0], h: [1, 0, 0, 0, 1, 0, 0, 0] }
  };
  const fourier = (G, rho, f) => {
    let A = zm.zero(rho.d);
    G.forEach((q, i) => {
      if (f[i]) A = A.map((row, a) => row.map((x, b) => zAdd(x, zSc(rho.mat(q)[a][b], f[i]))));
    });
    return A;
  };
  /** Tr(A†A) of a matrix scaled by s, as a fraction: exact when it is an integer of ℤ[ζ]. */
  const traceAA = (A, s) => {
    let t = Z0;
    for (const row of A) for (const x of row) t = zAdd(t, zMul(zConj(x), x));
    return zIsInt(t) ? fr(BigInt(t[0]), BigInt(s * s)) : null;
  };
  const HEAP = new Map();
  function heapOf(group) {
    if (HEAP.has(group)) return HEAP.get(group);
    const G = ELEMENTS[group],
      n = G.length,
      idx = new Map(G.map((q, i) => [qkey(q), i])),
      { f, g, h } = FUNCS[group],
      R = IRREPS[group];
    const mul = (a, b) => idx.get(qkey(q2mul(G[a], G[b])));
    const inv = (a) => idx.get(qkey(q2inv(G[a])));
    // the heap triple [y, x, w] = y x⁻¹ w for every (x, y, w)
    const TRI = new Int16Array(n * n * n);
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) for (let w = 0; w < n; w++) TRI[(x * n + y) * n + w] = mul(mul(y, inv(x)), w);
    const partial = (P) => {
      const F = new Array(n).fill(0);
      for (let k = 0; k < P; k++) {
        const x = Math.floor(k / n),
          y = k % n;
        if (!f[x] || !g[y]) continue;
        const c = f[x] * g[y];
        for (let w = 0; w < n; w++) F[w] += c * h[TRI[(x * n + y) * n + w]];
      }
      return F;
    };
    const F = partial(n * n);
    const blocks = R.map((rho) => {
      const fh = fourier(G, rho, f),
        gh = fourier(G, rho, g),
        hh = fourier(G, rho, h),
        Fh = fourier(G, rho, F);
      const prod = zm.mul(zm.mul(fh, zm.adj(gh)), hh); // scaled by s³
      const lifted = zm.sc(Fh, rho.s * rho.s);
      const same = prod.every((row, a) => row.every((x, b) => x.every((v, m) => v === lifted[a][b][m])));
      const tf = traceAA(fh, rho.s),
        tF = traceAA(Fh, rho.s);
      return {
        rho,
        fh,
        prod,
        same,
        energy: tf && fmul(tf, fr(BigInt(rho.d), BigInt(n))),
        energyF: tF && fmul(tF, fr(BigInt(rho.d), BigInt(n))),
        mags: prod.map((row) => row.map((x) => hypot(...zC(x)) / rho.s ** 3))
      };
    });
    const sumF = (key) => blocks.reduce((s, b) => (s && b[key] ? fadd(s, b[key]) : null), fr(0n));
    const out = {
      group,
      n,
      f,
      g,
      h,
      F,
      partial,
      blocks,
      lhs: f.reduce((s, v) => s + v * v, 0),
      rhs: sumF('energy'),
      lhsF: F.reduce((s, v) => s + v * v, 0),
      rhsF: sumF('energyF'),
      same: blocks.every((b) => b.same),
      spaceMults: n * n * n,
      blockMults: R.reduce((s, r) => s + 2 * r.d ** 3, 0),
      maxMag: Math.max(...blocks.flatMap((b) => b.mags.flat())),
      maxF: Math.max(...F.map(Math.abs)),
      idx,
      TRI
    };
    HEAP.set(group, out);
    return out;
  }
  /** The transform of a partial heap sum against the spectral product: the largest gap of an entry (floating point). */
  function heapGap(H, Fp) {
    const G = ELEMENTS[H.group];
    let gap = 0;
    H.blocks.forEach((b) => {
      const A = fourier(G, b.rho, Fp),
        s = b.rho.s;
      A.forEach((row, a) =>
        row.forEach((x, k) => {
          const u = zC(x),
            v = zC(b.prod[a][k]);
          gap = Math.max(gap, hypot(u[0] / s - v[0] / s ** 3, u[1] / s - v[1] / s ** 3));
        })
      );
    });
    return gap;
  }

  /* ---------- small linear algebra: integer rank (Bareiss) and the eigenvalues of a symmetric matrix (Jacobi) ---------- */
  function rankInt(M) {
    const A = M.map((r) => r.map((v) => BigInt(v))),
      n = A.length,
      m = A[0].length;
    let rank = 0,
      prev = 1n;
    for (let col = 0; col < m && rank < n; col++) {
      let piv = rank;
      while (piv < n && A[piv][col] === 0n) piv++;
      if (piv === n) continue;
      [A[rank], A[piv]] = [A[piv], A[rank]];
      for (let r = rank + 1; r < n; r++) {
        for (let c = col + 1; c < m; c++) A[r][c] = (A[rank][col] * A[r][c] - A[r][col] * A[rank][c]) / prev;
        A[r][col] = 0n;
      }
      prev = A[rank][col];
      rank++;
    }
    return rank;
  }
  function eigenvalues(M) {
    const n = M.length,
      A = M.map((r) => [...r]);
    for (let sweep = 0; sweep < 60; sweep++) {
      let off = 0;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] ** 2;
      if (off < 1e-22) break;
      for (let p = 0; p < n; p++)
        for (let q = p + 1; q < n; q++) {
          if (Math.abs(A[p][q]) < 1e-300) continue;
          const th = (A[q][q] - A[p][p]) / (2 * A[p][q]),
            t = (th >= 0 ? 1 : -1) / (Math.abs(th) + Math.sqrt(th * th + 1)),
            c = 1 / Math.sqrt(t * t + 1),
            s = t * c;
          for (let k = 0; k < n; k++) {
            const akp = A[k][p],
              akq = A[k][q];
            A[k][p] = c * akp - s * akq;
            A[k][q] = s * akp + c * akq;
          }
          for (let k = 0; k < n; k++) {
            const apk = A[p][k],
              aqk = A[q][k];
            A[p][k] = c * apk - s * aqk;
            A[q][k] = s * apk + c * aqk;
          }
        }
    }
    return A.map((r, i) => r[i]).sort((a, b) => a - b);
  }

  /* ---------- complex helpers, ln Γ, the theta tail and the Mellin axis ---------- */
  const C = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    div: (a, b) => {
      const d = b[0] * b[0] + b[1] * b[1];
      return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d];
    },
    exp: (a) => [Math.exp(a[0]) * cs(a[1]), Math.exp(a[0]) * sn(a[1])],
    log: (a) => [Math.log(hypot(a[0], a[1])), Math.atan2(a[1], a[0])],
    abs: (a) => hypot(a[0], a[1])
  };
  const LANCZOS = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  /** ln Γ(z) for Re z ≥ 1/2 (Lanczos, g = 7). */
  function lnGamma(z) {
    const w = [z[0] - 1, z[1]];
    let a = [LANCZOS[0], 0];
    for (let k = 1; k < 9; k++) a = C.add(a, C.div([LANCZOS[k], 0], [w[0] + k, w[1]]));
    const t = [w[0] + 7.5, w[1]];
    return C.add(C.add([0.5 * Math.log(TAU), 0], C.mul([w[0] + 0.5, w[1]], C.log(t))), C.sub(C.log(a), t));
  }
  /** (1/2π) ∫ |Γ(σ + it)|² dt over [−30, 30], the Mellin side of the energy of e^{−x}. */
  function mellinEnergy(sigma) {
    const T = 30,
      N = 6000,
      h = (2 * T) / N;
    let s = 0;
    for (let i = 0; i <= N; i++) {
      const t = -T + i * h,
        w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2;
      s += w * Math.exp(2 * lnGamma([sigma, t])[0]);
    }
    return (s * h) / 3 / TAU;
  }
  const omegaTail = (t) => {
    let s = 0;
    for (let n = 1; n <= 8; n++) s += Math.exp(-PI * n * n * t);
    return s;
  };
  /** M(s) = ∫₁^∞ ω(t)(t^{s/2} + t^{(1−s)/2}) dt/t on [1, 16] by Simpson's rule, and Λ(s) = M(s) − 1/s − 1/(1 − s). */
  function mellinM(s) {
    const T = 16,
      N = 6000,
      h = (T - 1) / N;
    let acc = [0, 0];
    for (let i = 0; i <= N; i++) {
      const t = 1 + i * h,
        lt = Math.log(t),
        w = i === 0 || i === N ? 1 : i % 2 ? 4 : 2;
      const p1 = C.exp([(s[0] / 2) * lt, (s[1] / 2) * lt]),
        p2 = C.exp([((1 - s[0]) / 2) * lt, (-s[1] / 2) * lt]);
      acc = C.add(acc, [((p1[0] + p2[0]) * omegaTail(t) * w) / t, ((p1[1] + p2[1]) * omegaTail(t) * w) / t]);
    }
    return [(acc[0] * h) / 3, (acc[1] * h) / 3];
  }
  const LambdaOf = (s) => C.sub(C.sub(mellinM(s), C.div([1, 0], s)), C.div([1, 0], [1 - s[0], -s[1]]));
  const GAMMA1 = 14.134725141734693;
  const MELLIN = (() => {
    const onLine = mellinEnergy(0.5),
      offLine = mellinEnergy(0.75);
    const L2 = LambdaOf([2, 0]),
      Lz = LambdaOf([0.5, GAMMA1]),
      M10 = mellinM([0.5, 10]);
    const ts = [GAMMA1, 21.022039638771555, 25.01085758014569, 1, 5, 10];
    const cay = (sig, t) => C.abs(C.div([sig - 1, t], [sig, t]));
    return {
      energy: 0.5,
      onLine,
      offLine,
      offExact: 0.886226925452758 / 2 ** 1.5,
      lambda2: L2[0],
      lambda2Imag: L2[1],
      piOver6: PI / 6,
      lambdaZero: C.abs(Lz),
      imag10: M10[1],
      cayleyOn: Math.max(...ts.map((t) => Math.abs(cay(0.5, t) - 1))),
      cayleyOff: cay(0.75, GAMMA1)
    };
  })();

  /* ---------- the butterfly network on the circle factor ---------- */
  const FFTS = new Map();
  const radixK = (B) => 2 ** Math.max(1, Math.ceil(Math.log2(2 * B + 2)));
  function fftOf(B) {
    const K = radixK(B);
    if (FFTS.has(K)) return FFTS.get(K);
    const x = Array.from({ length: K }, (_, k) => {
      const t = (TAU * k) / K;
      return Math.min(t, TAU - t) < ALPHA0 - 1e-12 ? 1 : 0;
    });
    const re = x.slice(),
      im = new Array(K).fill(0),
      bits = Math.log2(K);
    for (let i = 0; i < K; i++) {
      let r = 0;
      for (let b = 0; b < bits; b++) if (i & (1 << b)) r |= 1 << (bits - 1 - b);
      if (r > i) {
        [re[i], re[r]] = [re[r], re[i]];
        [im[i], im[r]] = [im[r], im[i]];
      }
    }
    let mults = 0;
    for (let len = 2; len <= K; len <<= 1) {
      const ang = -TAU / len;
      for (let i = 0; i < K; i += len)
        for (let k = 0; k < len / 2; k++) {
          const wr = cs(ang * k),
            wi = sn(ang * k),
            a = i + k,
            b = a + len / 2;
          const tr = wr * re[b] - wi * im[b],
            ti = wr * im[b] + wi * re[b];
          mults++;
          re[b] = re[a] - tr;
          im[b] = im[a] - ti;
          re[a] += tr;
          im[a] += ti;
        }
    }
    let naiveGap = 0;
    for (let k = 0; k < K; k++) {
      let r = 0,
        i = 0;
      for (let t = 0; t < K; t++) {
        r += x[t] * cs((-TAU * t * k) / K);
        i += x[t] * sn((-TAU * t * k) / K);
      }
      naiveGap = Math.max(naiveGap, hypot(r - re[k], i - im[k]));
    }
    const space = x.reduce((s, v) => s + v * v, 0),
      spec = re.reduce((s, v, k) => s + v * v + im[k] * im[k], 0) / K;
    // the twiddles on the unit circle, and pushed off it with their 1/conj images: the Toeplitz forms of their power sums
    const toeplitz = (vals, size) => {
      const p = (n) => vals.reduce((s, [r, a]) => s + r ** n * cs(a * n), 0);
      return eigenvalues(Array.from({ length: size }, (_, a) => Array.from({ length: size }, (_, b) => p(a - b))))[0];
    };
    const tw = Array.from({ length: K }, (_, k) => [1, (-TAU * k) / K]);
    const out = {
      K,
      bits,
      mults,
      naive: K * K,
      naiveGap,
      space,
      spec,
      lamOn: toeplitz(tw, K),
      lamOff: toeplitz([...tw.map(([, a]) => [21 / 20, a]), ...tw.map(([, a]) => [20 / 21, a])], 2 * K)
    };
    FFTS.set(K, out);
    return out;
  }

  /* ---------- instances computed once: Schur, heap, rank, eigenvalues, the base-point group ---------- */
  const FIXED = (() => {
    const gram = [0, 1, 2, 3, 4].map((a) => [0, 1, 2, 3, 4].map((b) => weyl((x) => chiC(a, cs(x)) * chiC(b, cs(x)))));
    const gramGap = Math.max(...gram.flatMap((r, a) => r.map((v, b) => Math.abs(v - (a === b ? 1 : 0)))));
    // 2T: the kernel Σ χ_ρ(x y⁻¹) over j = 0, 1/2, 1 (χ_{1/2} = 2a, χ_1 = 4a² − 1 in doubled coordinates A = 2a)
    const chiK = (q, w) => w[0] + w[1] * q[0] + w[2] * (q[0] * q[0] - 1);
    const kernel = (w) => T24.map((x) => T24.map((y) => chiK(q2mul(x, q2inv(y)), w)));
    const rank = rankInt(kernel([1, 1, 1])),
      eigPos = eigenvalues(kernel([1, 1, 1])),
      eigNeg = eigenvalues(kernel([1, -1, 1]));
    const distinct = (ev) => [...new Set(ev.map((v) => Math.round(v * 1e6) / 1e6))];
    // the base-point group of the heap: tri(x, y, z) = x ⋆ y⁻¹ ⋆ z at every base point o, by the multiplication table
    const at = new Map(T24.map((q, i) => [qkey(q), i])),
      MUL = T24.map((x) => T24.map((y) => at.get(qkey(q2mul(x, y))))),
      INV = T24.map((x) => at.get(qkey(q2inv(x))));
    const tri = (x, y, z) => MUL[MUL[x][INV[y]]][z];
    let triFail = 0,
      triCount = 0;
    for (let o = 0; o < 24; o++)
      for (let y = 0; y < 24; y++) {
        const yinv = tri(o, y, o);
        for (let x = 0; x < 24; x++) {
          const left = tri(x, o, yinv);
          for (let z = 0; z < 24; z++) {
            triCount++;
            if (tri(left, o, z) !== tri(x, y, z)) triFail++;
          }
        }
      }
    // S³ is parallelizable: x i, x j, x k orthonormal at the 24 points of 2T
    let frameFail = 0;
    for (const x of T24) {
      const f = [q2mul(x, [0, 2, 0, 0]), q2mul(x, [0, 0, 2, 0]), q2mul(x, [0, 0, 0, 2])];
      for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) if (dot(f[a], f[b]) !== (a === b ? 4 : 0) || dot(f[a], x) !== 0) frameFail++;
    }
    return { gram, gramGap, rank, eigPos: distinct(eigPos), eigNeg: distinct(eigNeg), minNeg: eigNeg[0], triFail, triCount, frameFail };
  })();
  /** The heap of the Chebyshev recursion from x₀ = 1, x₁ = g: the largest gap of x_{n+1} = U_n x₁ − U_{n−1} x₀ and ⟨x₀, x_n⟩ = T_n(c). */
  function heapChebyshev(g, steps = 10) {
    const c = g[0],
      xs = [[1, 0, 0, 0], g];
    while (xs.length <= steps + 1) xs.push(qmul(qmul(xs[xs.length - 1], qconj(xs[xs.length - 2])), xs[xs.length - 1]));
    const U = [0, 1],
      T = [1, c];
    for (let n = 1; n <= steps; n++) U.push(2 * c * U[n] - U[n - 1]);
    for (let n = 2; n <= steps; n++) T.push(2 * c * T[n - 1] - T[n - 2]);
    let gap = 0;
    for (let n = 0; n < steps; n++) gap = Math.max(gap, norm(sub(xs[n + 1], sub(scale(g, U[n + 1]), scale([1, 0, 0, 0], U[n])))), Math.abs(xs[n][0] - T[n]), Math.abs(dot(xs[n], xs[n]) - 1));
    return { gap, t2: xs[2][0], chis: [0, 1, 2, 3, 4].map((n) => U[n + 1]) };
  }
  const AXIS = unit([1, 1, 1]);
  /** The ray kernel at (1, g): R = (2κ_b(1, g) − 1)² + (2κ_b(1, g i) − 1)² with κ_b(x, y) = (1 + ⟨x, y⟩)/2, against the
      spinor overlap |s(1)† s(g)|² with s(q) = (q₀ + q₁ i, −q₂ + q₃ i). */
  function rayAt(kappa) {
    const g = gOf(kappa),
      kb = (x, y) => (1 + dot(x, y)) / 2,
      one = [1, 0, 0, 0],
      R = (2 * kb(one, g) - 1) ** 2 + (2 * kb(one, qmul(g, [0, 1, 0, 0])) - 1) ** 2;
    const s1 = [[1, 0], [0, 0]],
      sg = [[g[0], g[1]], [-g[2], g[3]]],
      ov = C.add(C.mul([s1[0][0], -s1[0][1]], sg[0]), C.mul([s1[1][0], -s1[1][1]], sg[1]));
    return { R, spinor: ov[0] ** 2 + ov[1] ** 2, page: kappa + dot(one, qmul(g, [0, 1, 0, 0])) ** 2 };
  }
  /** g = c + s (i + j + k)/√3 for the frame's κ, c = +√κ. */
  const gOf = (kappa) => {
    const c = Math.sqrt(kappa),
      s = Math.sqrt(Math.max(0, 1 - kappa));
    return [c, ...scale(AXIS, s)];
  };
  /** D^{1/2}(g) ⊗ D^{1/2}(g) in the basis (↑↓, ↑↑, ↓↑, ↓↓), turned by λ · 45° in the plane of ↑↓ and ↓↑. */
  function triadOf(kappa, lam) {
    const [a, b, c, d] = gOf(kappa);
    const D = [
      [
        [a, b],
        [c, d]
      ],
      [
        [-c, d],
        [a, -b]
      ]
    ];
    const ORDER = [
      [0, 1],
      [0, 0],
      [1, 0],
      [1, 1]
    ]; // ↑↓, ↑↑, ↓↑, ↓↓
    const T = ORDER.map(([s1, s2]) => ORDER.map(([t1, t2]) => C.mul(D[s1][t1], D[s2][t2])));
    const th = (lam * PI) / 4,
      U = [
        [cs(th), 0, sn(th), 0],
        [0, 1, 0, 0],
        [-sn(th), 0, cs(th), 0],
        [0, 0, 0, 1]
      ];
    const M = U.map((_, r) =>
      U.map((__, k) => {
        let z = [0, 0];
        for (let p = 0; p < 4; p++) for (let q = 0; q < 4; q++) z = C.add(z, scale(T[p][q], U[p][r] * U[q][k]));
        return z;
      })
    );
    const inBlock = (r, k) => (r === 0) === (k === 0);
    let leak = 0;
    M.forEach((row, r) => row.forEach((z, k) => (leak += inBlock(r, k) ? 0 : z[0] ** 2 + z[1] ** 2)));
    const tr = M.reduce((s, row, r) => C.add(s, row[r]), [0, 0]);
    return { M, mags: M.map((row) => row.map(C.abs)), leak: Math.sqrt(leak), trace: tr, singlet: M[0][0], triplet: C.add(C.add(M[1][1], M[2][2]), M[3][3]), inBlock };
  }

  /* ---------- scenes, their parameter and the frame ---------- */
  const SCENES = {
    shells: { param: 'kappa', step: 1 / 100, rx: 2.2, rz: 1.22 },
    triad: { param: 'lam', step: 1 / 20, rx: 2.2, rz: 1.22 },
    gibbs: { param: 'B', step: 1 / 24, rx: 2.2, rz: 1.22 },
    heap: { param: 'p', step: 1 / 24, rx: 2.2, rz: 1.25 },
    bandlimit: { param: 'Bb', step: 1 / 7, rx: 2.25, rz: 1.22 }
  };
  const BMAX = 24,
    BB = 7;
  const VALUE = { kappa: (t) => round2(t), lam: (t) => round2(t), B: (t) => Math.round(BMAX * t), p: (t) => clamp(t, 0, 1), Bb: (t) => Math.round(BB * t) };
  const RAIL = { kappa: (v) => v, lam: (v) => v, B: (v) => v / BMAX, p: (v) => v, Bb: (v) => Math.min(v, BB) / BB };
  const state = { scene: 'shells', set: { kappa: 0.25, j: 1, B: 4, lam: 1, p: 1, group: '2T' }, cam: 'cut', lens: 0, grow: 1, from: null };
  let clock = null;
  /** The parameters the scene asks for: the rail drives one, the others are set. */
  function targets() {
    const out = { ...state.set },
      p = SCENES[state.scene].param,
      v = VALUE[p](clock ? clock.t : 1);
    if (p === 'Bb') out.B = v;
    else out[p] = v;
    return out;
  }
  function current() {
    const to = targets();
    if (!state.from || state.grow >= 1) return to;
    const out = { ...to };
    for (const k of ['kappa', 'lam']) out[k] = lerp(state.from[k], to[k], state.grow);
    return out;
  }
  const n2 = (j) => Math.round(2 * j);
  function compute(s) {
    const kappa = clamp(s.kappa, 0, 1),
      c = Math.sqrt(kappa),
      alpha = Math.acos(c),
      n = n2(s.j),
      B = Math.round(s.B);
    const chars = [0, 1, 2, 3, 4].map((k) => chiAt(k, kappa));
    const G = gibbs(B),
      bnd = band(Math.min(B, BB)),
      H = heapOf(s.group),
      P = Math.floor(s.p * H.n * H.n + 1e-9),
      Fp = H.partial(P);
    return {
      kappa,
      c,
      alpha,
      j: s.j,
      n,
      B,
      lam: s.lam,
      p: s.p,
      group: s.group,
      kq: onGrid(kappa, 100),
      chars,
      chi: chars[n] || chiAt(n, kappa),
      gibbs: G,
      band: bnd,
      dim: Array.from({ length: B + 1 }, (_, k) => (k + 1) ** 2).reduce((a, b) => a + b, 0),
      triad: triadOf(kappa, s.lam),
      heap: H,
      P,
      Fp,
      heapGap: heapGap(H, Fp),
      fly: fftOf(Math.min(B, BB)),
      cheb: heapChebyshev(gOf(kappa)),
      ray: rayAt(kappa)
    };
  }
  const cams = { cut: [-0.6, 0.32, 1], front: [-0.12, 0.08, 1], top: [-0.6, 1.05, 1] };
  const CARD = (scene, o) => ({ scene, kappa: 0.25, j: 1, B: 4, lam: 1, p: 1, group: '2T', cam: 'cut', play: true, ...o });
  const SHELLS = 'spin-harmonic-shells-and-chebyshev-kernels',
    TRIAD = 'clebsch-gordan-causal-triad-base',
    GIBBS_CARD = 'gibbs-overshoot-vs-positive-spherical-smoothing',
    HEAP_CARD = 'origin-free-heap-convolution-diagonalization',
    BAND_CARD = 'observer-bandlimit-and-tft-s3-fft';
  const presets = {
    [SHELLS]: CARD('shells', { j: 1, still: 0.25 }),
    [TRIAD]: CARD('triad', { j: 0.5, still: 1 }),
    [GIBBS_CARD]: CARD('gibbs', { j: 1, B: 24, still: 1 }),
    [HEAP_CARD]: CARD('heap', { j: 1, still: 1 }),
    [BAND_CARD]: CARD('bandlimit', { j: 2, B: 4, still: 4 / 7 })
  };
  const DEFAULT = SHELLS;

  /* ---------- the stage ---------- */
  const stage = $('stage'),
    handle = $('stageHandle');
  const opts = { canvas: $('cv'), yaw: cams.cut[0], pitch: cams.cut[1], radius: 0.3, wheel: false, onChange: () => paint() };
  const sc = kit.solid(stage, opts);
  if (TRV.still) stage.classList.add('still');
  /** The horizontal axes of the default view: E1 to the right, E2 away from the viewer. */
  const E1 = [cs(0.6), sn(0.6), 0],
    E2 = [-sn(0.6), cs(0.6), 0],
    Z = [0, 0, 1];
  const RB = 1,
    CB = scale(E1, -1.1),
    MESA = 0.62;
  const PYR_X = { shells: 1.25, triad: 1.45, gibbs: 1.25, heap: 1.2, bandlimit: 0.5 };
  const pyrCentre = () => scale(E1, PYR_X[state.scene]);
  const SLAB = add(scale(E1, 0.36), [0, 0, -0.5]);
  /** A unit quaternion → the exponential chart, imaginary axes turned by −90° about k; −1 at the south pole of the ball. */
  function ballLocal(q) {
    const a = clamp(q[0], -1, 1),
      v = [q[1], q[2], q[3]],
      s = norm(v);
    if (s < 1e-12) return a > 0 ? [0, 0, 0] : [0, 0, -1];
    return scale([v[1] / s, -v[0] / s, v[2] / s], Math.acos(a) / PI);
  }
  const ballPt = (q) => add(CB, scale(ballLocal(q), RB));
  /** The removed octant x > 0, y < 0, z > 0 of the ball (relative to its centre). */
  const inCut = (p) => p[0] > 1e-9 && p[1] < -1e-9 && p[2] > 1e-9;
  /** Fit the scene between the title and the legend; the extents are those of the scene, so they do not move in a drag. */
  function fit() {
    const W = stage.clientWidth,
      H = stage.clientHeight;
    if (!W || !H) return;
    const box = stage.getBoundingClientRect();
    const tl = $('hudTl'),
      bl = $('legend');
    const shown = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
    const top = shown(tl) ? Math.max(12, tl.getBoundingClientRect().bottom - box.top + 6) : 12;
    const bottom = shown(bl) ? Math.max(12, box.bottom - bl.getBoundingClientRect().top + 6) : 12;
    const room = Math.max(40, H - top - bottom),
      side = 12;
    const { rx, rz } = SCENES[state.scene];
    const u = Math.max(8, Math.min((W - 2 * side) / (2 * rx), room / (2 * rz)));
    opts.radius = u / Math.min(W, H);
    opts.cx = 0.5 + (0.08 * u) / W;
    opts.cy = (top + room / 2) / H;
  }
  /** What each scene draws. */
  const LAYERS = {
    shells: { cut: 1, walls: 'chi', rings: 'chi', mesa: null, beads: 0, slab: 0, fly: 0 },
    triad: { cut: 1, walls: 'chi', rings: 'kappa', mesa: null, beads: 0, slab: 1, fly: 0 },
    gibbs: { cut: 1, walls: 'plain', rings: null, mesa: 'gibbs', beads: 0, slab: 0, fly: 0 },
    heap: { cut: 0, walls: null, rings: null, mesa: null, beads: 1, slab: 0, fly: 0 },
    bandlimit: { cut: 1, walls: 'plain', rings: null, mesa: 'band', beads: 0, slab: 0, fly: 1 }
  };
  const sph = (r) => (u, v) => add(CB, [r * sn(v) * cs(u), r * sn(v) * sn(u), r * cs(v)]);
  const wallAt = (k) => (r, v) => add(CB, k === 0 ? [0, -r * cs(v), r * sn(v)] : k === 1 ? [r * cs(v), 0, r * sn(v)] : [r * cs(v), -r * sn(v), 0]);
  const LIFT = 0.008;
  /** A quarter circle of radius r on wall k, lifted off it into the cut. */
  const arcPts = (r, k, n = 28) =>
    sample(n, (t) => {
      const v = (t * PI) / 2;
      return add(CB, k === 0 ? [LIFT, -r * cs(v), r * sn(v)] : k === 1 ? [r * cs(v), -LIFT, r * sn(v)] : [r * cs(v), -r * sn(v), LIFT]);
    });
  /** The radii where χ_n vanishes: α = kπ/(n + 1). */
  const nodes = (n) => Array.from({ length: n }, (_, k) => (k + 1) / (n + 1));
  function drawBall(m, Lr) {
    if (!Lr.cut) {
      sc.glass('glass', CB, RB, { color: P.violet, alpha: 0.07, rim: 0.42 });
      return;
    }
    const grid = { every: [6, 3], alpha: 0.12 };
    sc.surface('ballLo', sph(RB), { u: [0, TAU], v: [PI / 2, PI], nu: 72, nv: 18, color: P.violet, grid });
    sc.surface('ballHi', sph(RB), { u: [0, (3 * PI) / 2], v: [0, PI / 2], nu: 54, nv: 18, color: P.violet, grid });
    const chi = Lr.walls === 'chi';
    for (let k = 0; k < 3; k++) {
      const value = chi ? (u) => Math.abs(chiC(m.n, cs(PI * u))) / (m.n + 1) : () => 0.32;
      sc.surface('wall' + k, wallAt(k), { u: [0, 1], v: [0, PI / 2], nu: 72, nv: 10, colors: chi ? [P.stage, P.cyan] : [P.stage, P.violet], range: [0, 1], value: (u) => value(u) });
    }
  }
  function drawRings(m, Lr) {
    if (!Lr.rings) return;
    if (Lr.rings === 'chi') for (const r of nodes(m.n)) for (let k = 0; k < 3; k++) sc.line(arcPts(r, k), { color: P.cyan, width: 1.8 });
    const rp = m.alpha / PI,
      rm = 1 - rp;
    for (let k = 0; k < 3; k++) {
      sc.line(arcPts(rp, k), { color: P.amber, width: 2.8 });
      sc.line(arcPts(rm, k), { color: P.amber, width: 2.2, dash: [6, 5] });
    }
    // the turn by 120° about (1, 1, 1): (1 + i + j + k)/2, κ = 1/4
    sc.bead(ballPt([0.5, 0.5, 0.5, 0.5]), { color: P.cyan, r: 5.5, key: 'g111' });
  }
  /** The profile drawn in the cut: the S³ synthesis of the cap (gibbs) or the band-limited point event (band). */
  const profile = (m, kind) => (kind === 'gibbs' ? (r) => synth(PI * r, multipliers(m.B).pos) : (r) => posKernel(PI * r, Math.min(m.B, BB)));
  function drawMesa(m, Lr) {
    if (!Lr.mesa) return;
    const f = profile(m, Lr.mesa),
      H = MESA * state.grow;
    sc.surface('mesa', (r, v) => add(CB, [r * cs(v), -r * sn(v), Math.max(0, H * f(r))]), { u: [0, 0.97], v: [0, PI / 2], nu: 120, nv: 14, color: P.cyan, grid: { every: [10, 7], alpha: 0.14 } });
    const edge = (k, g, color, o = {}) =>
      sc.line(
        sample(200, (t) => {
          const r = 0.97 * t,
            z = H * g(r);
          return add(CB, k === 0 ? [LIFT * 2, -r, z] : [r, -LIFT * 2, z]);
        }),
        { color, width: 2, ...o }
      );
    edge(0, f, P.cyan);
    edge(1, f, P.cyan);
    if (Lr.mesa === 'gibbs') {
      // the bound 1 of the cap on both walls, and the flat hard cutoff on the wall x = 0
      const top = Math.sqrt(1 - MESA * MESA) - 0.02;
      sc.line([add(CB, [LIFT, 0, H]), add(CB, [LIFT, -top, H])], { color: P.violet, width: 1.6, dash: [6, 4] });
      sc.line([add(CB, [0, -LIFT, H]), add(CB, [top, -LIFT, H])], { color: P.violet, width: 1.6, dash: [6, 4] });
      const K = m.gibbs.K;
      edge(1, (r) => flatSum(PI * r, K, false), P.magenta, { width: 2.6 });
      const g = m.gibbs.flat;
      sc.bead(add(CB, [g.at / PI, -LIFT * 2, H * g.max]), { color: P.magenta, r: 4.5, key: 'crest' });
      if (state.lens === 1) edge(0, (r) => synth(PI * r, multipliers(m.B).hard), P.magenta, { width: 2, dash: [5, 4] });
    } else {
      const b = band(Math.min(m.B, BB));
      if (b.half < PI - 1e-9) sc.line(arcPts(b.half / PI, 2, 28).map((p) => add(p, [0, 0, 0.004])), { color: P.cyan, width: 1.6, dash: [5, 4] });
      if (state.lens === 1)
        for (const [a0, a1] of b.neg) {
          const r0 = a0 / PI,
            r1 = Math.min(0.99, a1 / PI);
          const pts = [...sample(12, (t) => add(CB, [r0 * cs((t * PI) / 2), -r0 * sn((t * PI) / 2), 0.012])), ...sample(12, (t) => add(CB, [r1 * cs(((1 - t) * PI) / 2), -r1 * sn(((1 - t) * PI) / 2), 0.012]))];
          sc.fan(pts, { fill: P.magenta, alpha: 0.32, color: P.magenta, width: 1 });
        }
    }
  }
  const asReal = (q) => q.map((v) => v / 2);
  function drawBeads(m, Lr) {
    if (!Lr.beads) return;
    const H = m.heap,
      G = ELEMENTS[H.group],
      gr = state.grow;
    // the edges of the 24-cell (2T: neighbours at 60°) or of the 16-cell (Q_8: at 90°), as geodesics in the chart
    const want = H.group === '2T' ? 2 : 0;
    for (let a = 0; a < G.length; a++)
      for (let b = a + 1; b < G.length; b++) {
        if (a === 1 || b === 1 || dot(G[a], G[b]) !== want) continue;
        const qa = asReal(G[a]),
          qb = asReal(G[b]),
          om = Math.acos(clamp(dot(qa, qb), -1, 1));
        const pts = sample(10, (t) => ballPt(add(scale(qa, sn((1 - t) * om) / sn(om)), scale(qb, sn(t * om) / sn(om)))));
        sc.line(pts, { color: P.violet, width: 1, alpha: 0.5 });
      }
    G.forEach((q, i) => {
      const v = Math.abs(m.Fp[i]),
        r = v ? 2.6 + 8 * (v / H.maxF) * gr : 2.2;
      sc.bead(ballPt(asReal(q)), { color: v ? P.cyan : P.violet, r, key: 'e' + i, alpha: v ? 1 : 0.7 });
    });
    if (m.P > 0 && m.P < H.n * H.n) {
      const x = Math.floor((m.P - 1) / H.n),
        y = (m.P - 1) % H.n;
      for (const i of new Set([x, y])) sc.ring(ballPt(asReal(G[i])), { color: P.amber, r: 9, key: 'now' + i });
    }
  }
  /** The blocks of the pyramid: { key, cells: [{ c (centre), h, color, alpha, diag, m }], layer z, size }. */
  function pyramid(m) {
    const s0 = state.scene,
      PCn = pyrCentre(),
      out = [];
    if (s0 === 'heap') {
      const H = m.heap,
        layers = [1, 2, 3].filter((d) => H.blocks.some((b) => b.rho.d === d)),
        pitch = 0.17,
        Zs = { 1: 0.78, 2: 0.22, 3: -0.42 };
      const partial = H.blocks.map((b) => {
        const A = fourier(ELEMENTS[H.group], b.rho, m.Fp);
        return A.map((row) => row.map((x) => hypot(...zC(x)) / b.rho.s));
      });
      for (const d of layers) {
        const list = H.blocks.map((b, i) => [b, i]).filter(([b]) => b.rho.d === d),
          width = list.reduce((w, [b]) => w + b.rho.d * pitch, 0) + (list.length - 1) * 0.5 * pitch;
        let x0 = -width / 2;
        for (const [b, i] of list) {
          const cells = [];
          for (let a = 0; a < d; a++)
            for (let k = 0; k < d; k++) {
              const c = add(add(add(PCn, scale(E1, x0 + (a + 0.5) * pitch)), scale(E2, (k - (d - 1) / 2) * pitch)), [0, 0, Zs[d]]);
              cells.push({ c, h: (0.012 + (0.3 * b.mags[a][k]) / H.maxMag) * state.grow, ph: 0.012 + (0.3 * partial[i][a][k]) / H.maxMag, color: P.cyan, alpha: 1 });
            }
          out.push({ key: 'blk' + b.rho.key, d, cells, pitch, centre: add(add(PCn, scale(E1, x0 + (d * pitch) / 2)), [0, 0, Zs[d]]), name: b.rho.name });
          x0 += d * pitch + 0.5 * pitch;
        }
      }
      return out;
    }
    const NL = { shells: 7, triad: 5, gibbs: 7, bandlimit: 9 }[s0],
      pitch = Math.min(0.2, 1.25 / NL),
      dz = 1.84 / (NL - 1),
      zTop = 0.92;
    const w = multipliers(m.B);
    for (let n = 0; n < NL; n++) {
      const d = n + 1,
        z = zTop - n * dz,
        cells = [];
      let active, current;
      if (s0 === 'shells') {
        active = n <= 4;
        current = n === m.n;
      } else if (s0 === 'triad') {
        active = n <= 2;
        current = n === m.n;
      } else if (s0 === 'gibbs') {
        active = n <= m.B;
        current = false;
      } else {
        active = n <= Math.min(m.B, BB);
        current = false;
      }
      for (let a = 0; a < d; a++)
        for (let k = 0; k < d; k++) {
          const c = add(add(add(pyrCentre(), scale(E1, (a - (d - 1) / 2) * pitch)), scale(E2, (k - (d - 1) / 2) * pitch)), [0, 0, z]),
            diag = a === k;
          let h = 0.01,
            color = P.violet,
            alpha = 0.32;
          if (active) {
            alpha = 1;
            color = current ? P.amber : P.cyan;
            if (s0 === 'shells') h = diag ? 0.07 : 0.014;
            else if (s0 === 'gibbs') h = 0.012 + 0.11 * w.pos[n];
            else h = 0.045;
            if (s0 === 'shells' && !diag) color = P.violet;
          }
          cells.push({ c, h: h * (active ? state.grow : 1), color, alpha, diag, m: n / 2 - a, hardH: 0.012 + 0.11 * w.hard[n] });
        }
      out.push({ key: 'lay' + n, d, n, cells, pitch, centre: add(pyrCentre(), [0, 0, z]), active, current, z, dz });
    }
    return out;
  }
  /** One box per cell, merged per block. */
  function drawPyramid(m) {
    const blocks = pyramid(m);
    for (const b of blocks) {
      const half = b.pitch * 0.42,
        vertices = [],
        faces = [],
        colors = [];
      for (const cell of b.cells) {
        const o = vertices.length,
          base = cell.c,
          corners = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
          ];
        for (const zz of [0, cell.h]) for (const [u, v] of corners) vertices.push(add(add(add(base, scale(E1, u * half)), scale(E2, v * half)), [0, 0, zz]));
        faces.push([o, o + 1, o + 2, o + 3], [o + 4, o + 5, o + 6, o + 7], [o, o + 1, o + 5, o + 4], [o + 1, o + 2, o + 6, o + 5], [o + 2, o + 3, o + 7, o + 6], [o + 3, o, o + 4, o + 7]);
        for (let f = 0; f < 6; f++) colors.push(cell.color);
      }
      const alpha = b.cells[0].alpha;
      sc.poly(b.key, { vertices, faces }, { colors, alpha, edges: alpha < 1 ? P.violet : P.stage });
      if (state.scene === 'shells' && b.active)
        for (const cell of b.cells.filter((x) => x.diag)) {
          const phi = 2 * cell.m * m.alpha,
            top = add(cell.c, [0, 0, cell.h + 0.004]),
            tip = add(top, add(scale(E1, 0.4 * b.pitch * cs(phi)), scale(E2, 0.4 * b.pitch * sn(phi))));
          sc.arrow(sub(top, sub(tip, top)), tip, { color: P.stage, width: 2.2, headSize: 7 });
        }
      if (state.scene === 'gibbs' && state.lens === 1 && b.active)
        for (const cell of b.cells) {
          const pts = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
          ].map(([u, v]) => add(add(add(cell.c, scale(E1, u * half)), scale(E2, v * half)), [0, 0, cell.hardH]));
          sc.line(pts, { color: P.magenta, width: 1, close: true, alpha: 0.85 });
        }
      if (state.scene === 'heap')
        for (const cell of b.cells) {
          const pts = [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
          ].map(([u, v]) => add(add(add(cell.c, scale(E1, u * half * 1.08)), scale(E2, v * half * 1.08)), [0, 0, cell.ph]));
          sc.line(pts, { color: P.violet, width: 1.2, close: true });
        }
    }
    if (state.scene === 'bandlimit') {
      const B = Math.min(m.B, BB),
        lay = blocks[Math.min(B + 1, blocks.length - 1)],
        z = blocks[0].z - (B + 0.5) * blocks[0].dz,
        half = ((lay.d + 0.8) * lay.pitch) / 2;
      const sq = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1]
      ].map(([u, v]) => add(add(add(pyrCentre(), scale(E1, u * half)), scale(E2, v * half)), [0, 0, z]));
      sc.fan(sq, { fill: P.violet, alpha: 0.12, color: P.amber, width: 1.6 });
    }
    return blocks;
  }
  function drawSlab(m, Lr) {
    if (!Lr.slab) return;
    const T = m.triad,
      pitch = 0.15,
      half = pitch * 0.42,
      vertices = [],
      faces = [],
      colors = [];
    for (let r = 0; r < 4; r++)
      for (let k = 0; k < 4; k++) {
        const o = vertices.length,
          c = add(add(SLAB, scale(E1, (k - 1.5) * pitch)), scale(E2, (r - 1.5) * pitch)),
          h = (0.012 + 0.26 * T.mags[r][k]) * state.grow;
        for (const zz of [0, h])
          for (const [u, v] of [
            [-1, -1],
            [1, -1],
            [1, 1],
            [-1, 1]
          ])
            vertices.push(add(add(add(c, scale(E1, u * half)), scale(E2, v * half)), [0, 0, zz]));
        faces.push([o, o + 1, o + 2, o + 3], [o + 4, o + 5, o + 6, o + 7], [o, o + 1, o + 5, o + 4], [o + 1, o + 2, o + 6, o + 5], [o + 2, o + 3, o + 7, o + 6], [o + 3, o, o + 4, o + 7]);
        const col = T.inBlock(r, k) ? P.cyan : P.violet;
        for (let f = 0; f < 6; f++) colors.push(col);
      }
    sc.poly('slab', { vertices, faces }, { colors, edges: P.stage });
    // the ruler of λ above the slab
    sc.line([add(SLAB, add(scale(E1, -0.38), [0, 0, 0.42])), add(SLAB, add(scale(E1, 0.38), [0, 0, 0.42]))], { color: P.violet, width: 1.2, dash: [4, 4] });
    // once decoupled, the 1 × 1 block goes to j = 0 and the 3 × 3 block to j = 1
    if (m.lam > 0.5) {
      const a = clamp((m.lam - 0.5) * 2, 0, 1),
        lay = pyramid(m);
      const from0 = add(add(SLAB, scale(E1, -1.5 * pitch)), add(scale(E2, -1.5 * pitch), [0, 0, 0.3])),
        from1 = add(add(SLAB, scale(E1, 0.5 * pitch)), add(scale(E2, 0.5 * pitch), [0, 0, 0.3]));
      sc.line([from0, add(lay[0].centre, [0, 0, 0.02])], { color: P.cyan, width: 1.4, dash: [5, 4], alpha: a });
      sc.line([from1, add(lay[2].centre, [0, 0, 0.02])], { color: P.cyan, width: 1.4, dash: [5, 4], alpha: a });
    }
  }
  /** The Mellin axis σ = 1/2 drawn by its Cayley images u = (s − 1)/s on a cyan ring around the ball (|u| = 1); the second
      lens adds the images of σ = 3/4, inside it. */
  const MELLIN_T = [0, 0.5, -0.5, 1, -1, 2, -2, 5, -5, GAMMA1];
  const cayleyU = (sig, t) => C.div([sig - 1, t], [sig, t]);
  const RING_R = 1.16;
  const ringPt = (u) => add(CB, add(scale(E1, RING_R * u[0]), scale(E2, RING_R * u[1])));
  function drawMellin(m) {
    if (state.scene !== 'gibbs') return;
    sc.circle(CB, Z, RING_R, { color: P.cyan, width: 1.6 });
    MELLIN_T.forEach((t, i) => sc.bead(ringPt(cayleyU(0.5, t)), { color: P.cyan, r: 3.4, key: 'mel' + i }));
    if (state.lens === 1) MELLIN_T.forEach((t, i) => sc.bead(ringPt(cayleyU(0.75, t)), { color: P.magenta, r: 3, key: 'off' + i }));
  }
  /** The butterfly network of K points to the right of the pyramid. */
  function flyGeom(m) {
    const F = m.fly,
      x0 = 1.32,
      x1 = 2.08,
      depth = scale(E2, 0.2);
    const at = (s, k) => add(add(scale(E1, x0 + ((x1 - x0) * s) / F.bits), depth), [0, 0, 0.86 - (1.72 * k) / (F.K - 1)]);
    return { F, at };
  }
  function drawFly(m, Lr) {
    if (!Lr.fly) return;
    const { F, at } = flyGeom(m);
    for (let s = 1; s <= F.bits; s++) {
      const halfLen = 1 << (s - 1);
      for (let k = 0; k < F.K; k++) {
        sc.line([at(s - 1, k), at(s, k)], { color: P.cyan, width: 1, alpha: 0.75 });
        sc.line([at(s - 1, k ^ halfLen), at(s, k)], { color: P.cyan, width: 1, alpha: 0.75 });
      }
    }
  }
  /** Lens two: the polar grid of S² on the ball, crowding at the poles, and a tangent field pinned there. */
  function drawContrast(m, Lr) {
    if (state.lens !== 1) return;
    const r = RB * 1.006,
      keep = (p) => !inCut(sub(p, CB));
    const runs = (pts) => {
      let run = [];
      for (const p of pts) {
        if (keep(p)) run.push(p);
        else {
          if (run.length > 1) sc.line(run, { color: P.ink, width: 0.9, alpha: 0.45 });
          run = [];
        }
      }
      if (run.length > 1) sc.line(run, { color: P.ink, width: 0.9, alpha: 0.45 });
    };
    for (let k = 0; k < 12; k++) runs(sample(40, (t) => sph(r)((k * PI) / 6, t * PI)));
    for (const th of [PI / 6, PI / 3, PI / 2, (2 * PI) / 3, (5 * PI) / 6]) runs(sample(60, (t) => sph(r)(t * TAU, th)));
    for (const z of [1, -1]) sc.bead(add(CB, [0, 0, z * r]), { color: P.magenta, r: 5, key: z > 0 ? 'poleN' : 'poleS' });
    for (const th of [PI / 8, PI / 4, (3 * PI) / 8, (5 * PI) / 8, (3 * PI) / 4, (7 * PI) / 8])
      for (let k = 0; k < 8; k++) {
        const ph = (k * PI) / 4 + PI / 8,
          p = sph(r)(ph, th);
        if (!keep(p)) continue;
        const east = [-sn(ph), cs(ph), 0];
        sc.arrow(p, add(p, scale(east, 0.16 * sn(th))), { color: P.ink, width: 1.1, headSize: 5, alpha: 0.6 });
      }
  }
  /** The handle of the card's parameter, in world coordinates, along its path t ∈ [0, 1]. */
  function handleWorld(t) {
    const s0 = state.scene;
    if (s0 === 'shells') {
      const r = Math.acos(Math.sqrt(clamp(t, 0, 1))) / PI;
      return add(CB, [r * Math.SQRT1_2, -r * Math.SQRT1_2, 0.012]);
    }
    if (s0 === 'triad') return add(SLAB, add(scale(E1, -0.38 + 0.76 * t), [0, 0, 0.42]));
    if (s0 === 'gibbs') return add(add(pyrCentre(), scale(E1, -0.86)), [0, 0, 0.9 - 1.8 * t]);
    if (s0 === 'heap') {
      const phi = PI * (1 - t);
      return add(CB, add(scale(E1, 1.16 * cs(phi)), [0, 0, 1.16 * sn(phi)]));
    }
    const NL = 9,
      dz = 1.84 / (NL - 1),
      pitch = Math.min(0.2, 1.25 / NL),
      Bc = BB * t;
    return add(add(pyrCentre(), scale(E1, ((Bc + 2.8) * pitch) / 2 + 0.08)), [0, 0, 0.92 - (Bc + 0.5) * dz]);
  }
  function drawGuides(m) {
    const s0 = state.scene;
    if (s0 === 'gibbs') sc.line([add(add(pyrCentre(), scale(E1, -0.86)), [0, 0, 0.9]), add(add(pyrCentre(), scale(E1, -0.86)), [0, 0, -0.9])], { color: P.violet, width: 1.2, dash: [4, 4] });
    if (s0 === 'heap') {
      const arc = (a, b) => sample(40, (t) => handleWorld(lerp(a, b, t)));
      sc.line(arc(0, 1), { color: P.violet, width: 1.2, dash: [4, 4] });
      if (m.p > 0.01) sc.line(arc(0, m.p), { color: P.cyan, width: 2 });
    }
  }

  /* ---------- labels ---------- */
  const LENS_NAME = [
    ['ℱ<sub>Ω</sub> 彼得—外尔', 'ℱ<sub>Ω</sub> PETER–WEYL'],
    ['平直 ℝ 与 S² 对照', 'FLAT ℝ AND S² CONTRAST']
  ];
  const SCENE_NAME = {
    shells: ['自旋壳层', 'SPIN SHELLS'],
    triad: ['克莱布什—戈尔丹三元基', 'CLEBSCH–GORDAN TRIAD'],
    gibbs: ['吉布斯与正核', 'GIBBS AND THE POSITIVE KERNEL'],
    heap: ['无原点堆卷积', 'ORIGIN-FREE HEAP CONVOLUTION'],
    bandlimit: ['带限寄存器（MODEL）', 'BAND-LIMITED REGISTER (MODEL)']
  };
  const two = (a, b) => [a, b];
  const kRel = (m) => rel(m.kq, m.kappa, 4);
  const cRel = (m) => {
    const q = m.kq && fsqrt(m.kq);
    return q ? '±' + decimal(q) : '±' + fx(m.c, 4);
  };
  /** The text of χ_n at the frame: “χ₁ = 4κ − 1 = 0”, or for a half-integer shell “χ½² = 4κ = 1, χ½ = ±1”. */
  function chiLine(m, n = m.n) {
    const name = `χ<sub>${jname(n)}</sub>`,
      poly = polyText(kappaPoly(n)),
      ch = m.chars[n] || chiAt(n, m.kappa);
    if (n % 2 === 0) return `${name} = ${poly} ${ch.rel}`;
    const sqv = m.kq ? evalPolyQ(kappaPoly(n), m.kq) : null;
    const value = ch.exact ? decimal(ch.exact) : null,
      pm = value != null ? (value.startsWith('−') ? '∓' + value.slice(1) : value === '0' ? '0' : '±' + value) : '±' + fx(Math.abs(ch.x), 4);
    return `${name}² = ${poly} ${rel(sqv, ch.x * ch.x)}, ${name} ${value != null ? '= ' : '≈ '}${pm}`;
  }
  const charList = (m) =>
    m.chars
      .map((ch, n) => {
        const t = ch.exact ? decimal(ch.exact) : null,
          v = t != null ? t : (ch.x < 0 ? '−' : '') + fx(Math.abs(ch.x), 3);
        if (n % 2 === 0) return (t != null ? '' : '≈ ') + v;
        const s = v.startsWith('−') ? '∓' + v.slice(1) : v === '0' ? '0' : '±' + v;
        return (t != null ? '' : '≈ ') + s;
      })
      .join(' · ');
  /** χ_n at the frame in a few characters: “χ₁ = 0”, “χ½ = ±1”, “χ³ᐟ² ≈ ∓0.98”. */
  function chiShort(m, n) {
    const ch = m.chars[n] || chiAt(n, m.kappa),
      t = ch.exact ? decimal(ch.exact) : null,
      v = t != null ? t : (ch.x < 0 ? '−' : '') + fx(Math.abs(ch.x), 3),
      s = n % 2 === 0 ? v : v.startsWith('−') ? '∓' + v.slice(1) : v === '0' ? '0' : '±' + v;
    return `χ<sub>${jname(n)}</sub> ${t != null ? '=' : '≈'} ${s}`;
  }
  const leakRel = (m) => (m.triad.leak < 1e-12 ? below(m.triad.leak) : AP(m.triad.leak));
  const parseval = (H) => `${H.lhs} ${H.rhs && decimal(H.rhs) === String(H.lhs) ? '=' : '≠'} ${H.rhs ? fstr(H.rhs) : '—'}`;
  function tags(m, blocks) {
    if (TRV.thumbMode) return;
    const compact = stage.clientWidth < 520,
      T = (key, p, html, cls = 'raw backed c-ik') => sc.tag(key, p, html, cls, { occlude: false });
    const s0 = state.scene,
      top = add(CB, [0, 0, RB + 0.14]);
    T('ball', top, s0 === 'heap' ? `S³(1) · ${m.group} (${m.heap.n})` : 'S³(1) = 𝕋<sub>3</sub>', 'raw backed c-vi');
    if (s0 === 'shells' || s0 === 'triad') {
      const g111 = ballPt([0.5, 0.5, 0.5, 0.5]),
        at = add(CB, [0.78, -0.78, 0.92]);
      if (!compact) sc.line([g111, at], { color: P.cyan, width: 1, alpha: 0.6 });
      T('g111', at, compact ? 'κ = 1/4' : '(1 + i + j + k)/2 · κ = 1/4', 'raw backed c-cy');
      if (!compact) T('kap', add(CB, [0.7, -0.7, -0.62]), `κ ${kRel(m)} · c = ${cRel(m)}`);
    }
    if (s0 === 'shells') {
      const b = blocks[Math.min(m.n, 4)];
      T('lay', add(b.centre, add(scale(E1, -(b.d * b.pitch) / 2 - 0.16), [0, 0, 0.04])), `j = ${jname(m.n)} · ${chiShort(m, m.n)}`, 'raw backed c-ik');
      T('dims', add(blocks[0].centre, [0, 0, 0.26]), compact ? '(2j + 1)²' : '(2j + 1)² = 1, 4, 9, 16, 25', 'raw backed c-cy');
    }
    if (s0 === 'shells') T('tail', add(blocks[6].centre, add(scale(E1, (7 * blocks[6].pitch) / 2 + 0.1), [0, 0, 0.02])), compact ? 'j &gt; 2' : 'j &gt; J<sub>max</sub> = 2', 'raw backed c-vi');
    if (s0 === 'triad') {
      T('slab', add(SLAB, [0, 0, -0.2]), `𝒱<sub>1/2</sub> ⊗ 𝒱<sub>1/2</sub> · ${compact ? '' : 'λ = ' + fx(m.lam, 2) + ' · '}${L('泄漏', 'leak')} ${leakRel(m)}`, 'raw backed c-cy');
      T('t0', add(blocks[0].centre, add(scale(E1, 0.3), [0, 0, 0.04])), compact ? 'j = 0 · 1' : `j = 0 · dim 1 · χ<sub>0</sub> = 1`, 'raw backed c-cy');
      T('t1', add(blocks[1].centre, add(scale(E1, 0.42), [0, 0, 0.04])), compact ? 'j = 1/2 · 2' : `j = 1/2 · dim 2 · χ<sub>1/2</sub>² = 4κ`, 'raw backed c-ik');
      T('t2', add(blocks[2].centre, add(scale(E1, 0.52), [0, 0, 0.04])), compact ? 'j = 1 · 3' : `j = 1 · dim 3 · χ<sub>1</sub> = 4κ − 1`, 'raw backed c-cy');
    }
    if (s0 === 'gibbs') {
      const g = m.gibbs;
      T('flat', add(CB, [g.flat.at / PI + 0.12, -0.02, MESA * g.flat.max + 0.16]), `${L('平直硬截断', 'flat hard cutoff')} +${pct(g.flat.over)}`, 'raw backed c-mg');
      if (!compact) T('pos', add(CB, [0.5, -0.32, MESA + 0.02]), `${L('S³ 正核', 'S³ positive kernel')} ${pct(g.pos.over)}`, 'raw backed c-cy');
      if (!compact && state.lens === 1) T('hard', add(CB, [0.02, -0.55, 0.5]), `${L('S³ 硬截断', 'S³ hard cutoff')} +${pct(g.hard.over)}`, 'raw backed c-mg');
      T('band', add(pyrCentre(), [0, 0, 1.12]), `2J<sub>max</sub> = ${m.B}`, 'raw backed c-ik');
      if (!compact) T('mel', ringPt(cayleyU(0.5, 0.5)), L('σ = 1/2 的凯莱像 |u| = 1', 'Cayley image of σ = 1/2, |u| = 1'), 'raw backed c-cy');
    }
    if (s0 === 'heap') {
      const H = m.heap;
      T('pars', add(pyrCentre(), [0, 0, 1.08]), `Σ|f|² = ${parseval(H)}`, 'raw backed c-cy');
      if (!compact)
        for (const b of blocks) T(b.key, add(b.centre, [0, 0, -0.2]), b.name, 'raw backed c-ik');
      T('neg', add(CB, [0, 0, -RB - 0.1]), '−1', 'raw backed c-vi');
    }
    if (s0 === 'bandlimit') {
      const B = Math.min(m.B, BB),
        lay = blocks[Math.min(B + 1, blocks.length - 1)];
      T('reg', add(blocks[0].centre, add(scale(E1, 0.55), [0, 0, 0.12])), `𝒦<sub>0</sub> : j ≤ ${jname(B)} · dim ${m.band.dim}`, 'raw backed c-cy');
      if (B < BB) T('hor', add(lay.centre, add(scale(E1, (lay.d * lay.pitch) / 2 + 0.3), [0, 0, -0.1])), `ℋ<sub>1/2</sub> : j &gt; ${jname(B)}`, 'raw backed c-vi');
      if (!compact) T('fly', add(scale(E1, 1.7), [0, 0, 1.04]), `K = ${m.fly.K} · ${m.fly.mults} ${L('次复乘', 'mults')}`, 'raw backed c-cy');
    }
    if (state.lens === 1 && s0 !== 'heap' && !compact) T('pole', add(CB, [0, 0, RB + 0.42]), L('S² 极点：经线挤在一起 · 毛球钉点', 'S² poles: meridians crowd · hairy-ball pin'), 'raw backed c-mg');
  }
  /* sentences: [zh, en] pairs built from the live frame */
  function subline(m) {
    const s0 = state.scene,
      compact = stage.clientWidth < 520;
    if (s0 === 'shells')
      return two(
        `κ ${kRel(m)}（c = ${cRel(m)}）：${chiLine(m)}。${compact ? '' : '琥珀弧是两叶 c = ±√κ，青色弧是 χ 的节点；'}${Math.abs(m.kappa - 0.25) < 1e-9 && m.n === 2 ? '两者重合。' : ''}`,
        `κ ${kRel(m)} (c = ${cRel(m)}): ${chiLine(m)}. ${compact ? '' : 'The amber arcs are the two sheets c = ±√κ, the cyan arcs the nodes of χ'}${Math.abs(m.kappa - 0.25) < 1e-9 && m.n === 2 ? (compact ? 'They coincide.' : '; they coincide.') : compact ? '' : '.'}`
      );
    if (s0 === 'triad') {
      const tr = m.triad.trace[0];
      return two(
        `λ = ${fx(m.lam, 2)}：块外泄漏 ${leakRel(m)}；迹 ${AP(tr)}${compact ? '' : ` = χ<sub>1/2</sub>² = 4κ = χ<sub>0</sub> + χ<sub>1</sub>，2 × 2 = 1 + 3`}。`,
        `λ = ${fx(m.lam, 2)}: leakage ${leakRel(m)}; trace ${AP(tr)}${compact ? '' : ` = χ<sub>1/2</sub>² = 4κ = χ<sub>0</sub> + χ<sub>1</sub>, 2 × 2 = 1 + 3`}.`
      );
    }
    if (s0 === 'gibbs') {
      const g = m.gibbs;
      return two(
        `2J<sub>max</sub> = ${m.B}：平直硬截断过冲 ${pct(g.flat.over)}（极限 ${pct(GIBBS_LIMIT)}），S³ 正核 ${pct(g.pos.over)}${compact ? '' : `；S³ 硬截断 ${pct(g.hard.over)}，在 ±1 处不收敛`}。`,
        `2J<sub>max</sub> = ${m.B}: flat hard cutoff overshoots by ${pct(g.flat.over)} (limit ${pct(GIBBS_LIMIT)}), the S³ positive kernel by ${pct(g.pos.over)}${compact ? '' : `; S³ hard cutoff ${pct(g.hard.over)}, divergent at ±1`}.`
      );
    }
    if (s0 === 'heap') {
      const H = m.heap;
      return two(
        `${m.group}：已加 ${m.P}/${H.n * H.n} 项，|F̂ − f̂ ĝ<sup>†</sup> ĥ| ${m.heapGap < 1e-9 ? '= 0' : AP(m.heapGap, 3)}${compact ? '' : `；帕塞瓦尔 ${parseval(H)}`}。`,
        `${m.group}: ${m.P}/${H.n * H.n} terms added, |F̂ − f̂ ĝ<sup>†</sup> ĥ| ${m.heapGap < 1e-9 ? '= 0' : AP(m.heapGap, 3)}${compact ? '' : `; Parseval ${parseval(H)}`}.`
      );
    }
    const b = m.band,
      B = Math.min(m.B, BB);
    return two(
      `2J<sub>max</sub> = ${B}：寄存器维数 ${b.dim}，帽子能量留下 ${pct(b.kept)}${compact ? '' : `；K = ${m.fly.K} 点蝶形 ${m.fly.mults} 次复乘，朴素 ${m.fly.naive} 次`}。`,
      `2J<sub>max</sub> = ${B}: register dimension ${b.dim}, ${pct(b.kept)} of the cap’s energy kept${compact ? '' : `; K = ${m.fly.K} butterflies take ${m.fly.mults} complex multiplications, naive ${m.fly.naive}`}.`
    );
  }
  function bigline(m) {
    const name = L(...SCENE_NAME[state.scene]),
      key = {
        shells: () => chiShort(m, m.n),
        triad: () => '2 × 2 = 1 + 3',
        gibbs: () => `${pct(m.gibbs.flat.over)} vs ${pct(m.gibbs.pos.over)}`,
        heap: () => `Σ|f|² = ${m.heap.lhs}`,
        bandlimit: () => `dim 𝒦<sub>0</sub> = ${m.band.dim}`
      }[state.scene]();
    return `${name} · ${key}`;
  }
  function legendItems(m) {
    const s0 = state.scene,
      it = [];
    if (s0 === 'shells') it.push(['vi', L('S³(1) · 尾部 j &gt; 2', 'S³(1) · tail j &gt; 2')], ['cy', L('壳层 · 节点 · |χ<sub>j</sub>| 壁面', 'shells · nodes · |χ<sub>j</sub>| walls')]);
    else if (s0 === 'triad') it.push(['vi', L('S³(1) · 块外泄漏', 'S³(1) · leakage')], ['cy', L('j = 0 ⊕ j = 1 两块', 'blocks j = 0 ⊕ j = 1')]);
    else if (s0 === 'gibbs') it.push(['vi', L('S³(1) · 上界 1', 'S³(1) · bound 1')], ['cy', L('S³ 正核合成 · 梅林轴 σ = 1/2', 'S³ positive synthesis · Mellin axis σ = 1/2')], ['mg', state.lens === 1 ? L('平直与 S³ 硬截断', 'flat and S³ hard cutoffs') : L('平直硬截断', 'flat hard cutoff')]);
    else if (s0 === 'heap') it.push(['vi', L('S³(1) · 胞体棱 · 部分和', 'S³(1) · cell edges · partial')], ['cy', 'F(w) · f̂ ĝ<sup>†</sup> ĥ']);
    else it.push(['vi', L('视界 ℋ<sub>1/2</sub> · S³(1)', 'horizon ℋ<sub>1/2</sub> · S³(1)')], ['cy', L('寄存器 𝒦<sub>0</sub> · 点事件 · 蝶形', 'register 𝒦<sub>0</sub> · event · butterflies')]);
    if (state.lens === 1 && s0 !== 'heap') it.push(['mg', s0 === 'bandlimit' ? L('S² 极点 · 负旁瓣', 'S² poles · negative lobes') : L('S² 极点与毛球钉点', 'S² poles and hairy-ball pin')]);
    it.push(['am', L('当前值', 'current value')]);
    return it;
  }
  function hud(m) {
    $('hudBig').innerHTML = bigline(m);
    $('hudSub').innerHTML = L(...subline(m));
    $('legend').innerHTML = legendItems(m)
      .map(([k, s]) => `<span><i class="sw ${k}"></i>${s}</span>`)
      .join('');
  }
  // labels keep near their anchors and stay off the title, the legend, the handle and each other
  function fitLabels(extra) {
    if (TRV.thumbMode) return;
    const bounds = stage.getBoundingClientRect();
    const occupied = [$('hudTl'), $('legend'), handle].filter((el) => !el.hidden).map((el) => el.getBoundingClientRect());
    if (extra) occupied.push(extra);
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
    const STEP = 16,
      cols = 2 * Math.ceil(bounds.width / STEP);
    for (const [i, box] of boxes.entries()) {
      const dx = kit.clamp(0, bounds.left + 5 - box.left, bounds.right - 5 - box.right);
      const here = free(box, dx, 0);
      if (here) {
        place(i, dx, 0, here);
        continue;
      }
      const row = box.height + 3,
        rows = 2 * Math.ceil(bounds.height / row);
      let best = null;
      for (let k = 0; k <= cols; k++) {
        const sx = Math.ceil(k / 2) * STEP * (k % 2 ? -1 : 1),
          extraCost = sx === 0 ? 0 : 0.5;
        if (best && Math.abs(dx + sx) + extraCost >= best.cost) continue;
        for (let j = 0; j <= rows; j++) {
          const dy = Math.ceil(j / 2) * row * (j % 2 ? 1 : -1),
            cost = hypot(dx + sx, dy) + extraCost;
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
    const Lr = LAYERS[state.scene];
    fit();
    sc.begin();
    drawBall(m, Lr);
    drawRings(m, Lr);
    drawMesa(m, Lr);
    drawBeads(m, Lr);
    const blocks = drawPyramid(m);
    drawSlab(m, Lr);
    drawFly(m, Lr);
    drawContrast(m, Lr);
    drawMellin(m);
    drawGuides(m);
    const D = sc.facing(),
      hw = handleWorld(clock.t);
    // a still has no handle button: an amber ring marks the current value instead
    if (TRV.still && !TRV.thumbMode) sc.ring(add(hw, scale(D, 0.1)), { color: P.amber, r: 8, key: 'nowRing' });
    tags(m, blocks);
    sc.end();
    const q = sc.p(hw);
    handle.hidden = TRV.still;
    handle.style.left = q[0] + 'px';
    handle.style.top = q[1] + 'px';
    const b = $('cv').getBoundingClientRect();
    fitLabels(TRV.still ? { left: b.left + q[0] - 14, right: b.left + q[0] + 14, top: b.top + q[1] - 14, bottom: b.top + q[1] + 14 } : null);
  }

  /* ---------- strips ---------- */
  function setPieces(el, pieces, sep) {
    const key = pieces.join(sep);
    if (el.dataset.key === key) return;
    el.dataset.key = key;
    el.innerHTML = pieces.map((t) => `<span class="nb">${t}</span>`).join(sep);
  }
  const PLOT = { a: null, b: null };
  function stripA(m) {
    const cv = $('plot');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const s0 = state.scene,
      narrow = cv.clientWidth < 260;
    if (s0 === 'shells' || s0 === 'triad') {
      setPieces($('plotTitle'), s0 === 'shells' ? L(['特征标多项式 χ<sub>j</sub>(κ)'], ['Character polynomials χ<sub>j</sub>(κ)']) : L(['迹的分解 4κ = 1 + (4κ − 1)'], ['The trace splits: 4κ = 1 + (4κ − 1)']), '');
      setPieces($('plotMeta'), [s0 === 'shells' ? 'χ<sub>j</sub> = U<sub>2j</sub>(c), κ = c²' : 'χ<sub>1/2</sub>² = χ<sub>0</sub> + χ<sub>1</sub>'], '');
      const Y = s0 === 'shells' ? [-2.4, 5.6] : [-1.4, 4.6],
        g = kit.plot(cv, { x: [0, 1], y: Y, pad: [34, 14, 12, 22] });
      g.axes({ xTicks: narrow ? [0, 0.5, 1] : [0, 0.25, 0.5, 0.75, 1], yTicks: s0 === 'shells' ? [-2, 0, 2, 4] : [-1, 0, 1, 2, 3, 4] });
      g.text(1, Y[0], 'κ', P.dim, { base: 'bottom', align: 'right', dx: -6, dy: -4, face: 'body' });
      g.hline(0, P.dim, { width: 0.8 });
      const curves = [];
      if (s0 === 'shells') {
        for (let n = 0; n <= 4; n++) {
          const now = n === m.n,
            col = now ? P.amber : P.cyan,
            wd = now ? 2.4 : 1.4;
          const plus = sample(160, (t) => [t, chiC(n, Math.sqrt(t))]);
          g.line(plus, col, { width: wd });
          curves.push({ n, sign: 1, pts: plus });
          if (n % 2) {
            const minus = sample(160, (t) => [t, chiC(n, -Math.sqrt(t))]);
            g.line(minus, col, { width: wd, dash: [4, 3] });
            curves.push({ n, sign: -1, pts: minus });
          }
          if (!narrow) g.text(1, chiC(n, 1), `χ_{${jname(n)}}`, col, { dx: -4, dy: n % 2 ? 10 : -8, align: 'right', face: 'body' });
        }
        g.dot(0.25, 0, P.cyan, 4);
        g.line([[m.kappa, Y[0]], [m.kappa, Y[1] * 0.72]], P.amber, { width: 1 });
        g.dot(m.kappa, m.chi.x, P.amber, 3.5);
      } else {
        const four = sample(80, (t) => [t, 4 * t]);
        g.line(four, P.cyan, { width: 2.2 });
        g.line(sample(80, (t) => [t, 1 + (4 * t - 1)]), P.violet, { width: 1.6, dash: [5, 4] });
        g.line(sample(80, (t) => [t, 4 * t - 1]), P.cyan, { width: 1.2 });
        g.line(sample(2, (t) => [t, 1]), P.cyan, { width: 1.2 });
        g.line([[m.kappa, Y[0]], [m.kappa, Y[1] * 0.7]], P.amber, { width: 1 });
        g.dot(m.kappa, 4 * m.kappa, P.amber, 3.5);
        g.legend([
          [P.cyan, 'χ_{1/2}² = 4κ'],
          [P.violet, 'χ_{0} + χ_{1}', 'dash'],
          [P.cyan, 'χ_{0} = 1, χ_{1} = 4κ − 1']
        ]);
        curves.push({ four });
      }
      PLOT.a = { scene: s0, x: [0, 1], y: Y, curves };
      return;
    }
    if (s0 === 'gibbs' || s0 === 'bandlimit') {
      const gib = s0 === 'gibbs',
        Y = gib ? [-0.2, 1.45] : [-0.35, 1.25];
      setPieces($('plotTitle'), gib ? L(['吉布斯硬截断与正核合成的剖面'], ['Profiles: hard Gibbs cutoff', 'and positive synthesis']) : L(['带限点事件：正核按峰值归一'], ['Band-limited point event:', 'the positive kernel, peak 1']), ' ');
      setPieces($('plotMeta'), [gib ? `2J<sub>max</sub> = ${m.B}` : `2J<sub>max</sub> = ${Math.min(m.B, BB)}`], '');
      const g = kit.plot(cv, { x: [0, PI], y: Y, pad: [34, 14, 12, 22] });
      g.axes({ xTicks: [0, PI / 3, (2 * PI) / 3, PI], xFmt: (v) => ['0', 'π/3', '2π/3', 'π'][Math.round((3 * v) / PI)], yTicks: gib ? [0, 0.5, 1] : [0, 0.5, 1] });
      g.text(0, Y[0], 'α', P.dim, { base: 'bottom', dx: 8, dy: -4, face: 'body' });
      const curves = {};
      if (gib) {
        g.hline(1, P.violet, { width: 1, dash: [5, 4] });
        g.hline(0, P.violet, { width: 1, dash: [5, 4] });
        curves.target = [
          [0, 1],
          [ALPHA0, 1],
          [ALPHA0, 0],
          [PI, 0]
        ];
        g.line(curves.target, P.dim, { width: 1 });
        const w = multipliers(m.B);
        curves.flat = sample(360, (t) => [PI * t, flatSum(PI * t, m.gibbs.K, false)]);
        curves.pos = sample(360, (t) => [PI * t, synth(PI * t, w.pos)]);
        g.line(curves.flat, P.magenta, { width: 1.8 });
        if (state.lens === 1) {
          curves.hard = sample(360, (t) => [PI * t, synth(PI * t, w.hard)]);
          g.line(curves.hard, P.magenta, { width: 1.4, dash: [5, 4] });
        }
        g.line(curves.pos, P.cyan, { width: 2.2 });
        g.legend(
          [[P.magenta, `${L('平直硬截断', 'flat hard')} +${pct(m.gibbs.flat.over)}`], ...(state.lens === 1 ? [[P.magenta, `S³ ${L('硬截断', 'hard')} +${pct(m.gibbs.hard.over)}`, 'dash']] : []), [P.cyan, `S³ ${L('正核', 'positive')} ${pct(m.gibbs.pos.over)}`]],
          { right: true }
        );
      } else {
        const B = Math.min(m.B, BB);
        g.hline(0, P.dim, { width: 0.8 });
        g.hline(0.5, P.violet, { width: 1, dash: [5, 4] });
        curves.pos = sample(360, (t) => [PI * t, posKernel(PI * t, B)]);
        if (state.lens === 1) {
          curves.dir = sample(360, (t) => [PI * t, dirKernel(PI * t, B)]);
          g.line(curves.dir, P.magenta, { width: 1.6 });
        }
        g.line(curves.pos, P.cyan, { width: 2.2 });
        g.line([[m.band.half, Y[0]], [m.band.half, 0.5]], P.cyan, { width: 1, dash: [4, 3] });
        g.legend([[P.cyan, `(Σχ)² ≥ 0 · ${L('半高', 'half height')} α ≈ ${fx(m.band.half, 3)}`], ...(state.lens === 1 ? [[P.magenta, `Σ(2j + 1)χ_{j} ${L('有负旁瓣', 'dips below 0')}`]] : [])], { right: true });
      }
      PLOT.a = { scene: s0, x: [0, PI], y: Y, curves };
      return;
    }
    const H = m.heap;
    setPieces($('plotTitle'), L(['空间侧：F = f ⊛ ḡ ⊛ h 的部分和'], ['Space side: partial sums', 'of F = f ⊛ ḡ ⊛ h']), ' ');
    setPieces($('plotMeta'), [`${m.P}/${H.n * H.n}`], '');
    const top = Math.max(1, H.maxF) * 1.25,
      g = kit.plot(cv, { x: [-0.5, H.n - 0.5], y: [0, top], pad: [34, 14, 12, 22] });
    g.axes({ xTicks: H.n === 24 ? [0, 8, 16, 23] : [0, 2, 4, 7], yTicks: [0, Math.round(H.maxF / 2), H.maxF] });
    H.F.forEach((v, i) => g.line([[i, 0], [i, Math.abs(v)]], P.violet, { width: 1 }));
    m.Fp.forEach((v, i) => {
      if (v) {
        g.line([[i, 0], [i, Math.abs(v)]], P.cyan, { width: 2.2 });
        g.dot(i, Math.abs(v), P.cyan, 2.6);
      }
    });
    g.legend([[P.cyan, L('已加的部分和 |F(w)|', 'partial sum |F(w)|')], [P.violet, L('完整的 |F(w)|', 'complete |F(w)|')]], { right: true });
    PLOT.a = { scene: s0, x: [-0.5, H.n - 0.5], y: [0, top], F: H.F.slice(), Fp: m.Fp.slice() };
  }
  function stripB(m) {
    const cv = $('plotB');
    if (!cv.clientWidth || !cv.clientHeight) return;
    const s0 = state.scene;
    if (s0 === 'heap') {
      const H = m.heap,
        e = H.blocks.map((b) => (b.energy ? fval(b.energy) : 0)),
        top = Math.max(...e) * 1.3;
      setPieces($('plotTitleB'), L(['不可约表示上的帕塞瓦尔能量 d Tr(f̂<sup>†</sup> f̂)/|G|'], ['Parseval energy per irreducible', 'representation d Tr(f̂<sup>†</sup> f̂)/|G|']), ' ');
      setPieces($('plotMetaB'), [`Σ = ${H.rhs ? fstr(H.rhs) : '—'} = Σ|f|²`], '');
      const g = kit.plot(cv, { x: [-0.6, e.length - 0.4], y: [0, top], pad: [34, 14, 12, 22] });
      g.axes({ xTicks: e.map((_, i) => i), xFmt: (v) => (H.blocks[Math.round(v)] ? H.blocks[Math.round(v)].rho.name.replace(/<[^>]+>/g, '') : ''), yTicks: [0, Math.round(top / 2)] });
      e.forEach((v, i) => {
        g.rect(i - 0.32, 0, i + 0.32, v, P.cyan, { alpha: 0.85 });
        if (cv.clientWidth > 260) g.text(i, v, fstr(H.blocks[i].energy), P.cyan, { dy: -8, face: 'body' });
      });
      PLOT.b = { scene: s0, energies: H.blocks.map((b) => (b.energy ? fstr(b.energy) : null)) };
      return;
    }
    const N = s0 === 'gibbs' ? 24 : 12,
      w = multipliers(m.B),
      bars = [];
    for (let n = 0; n <= N; n++) {
      const full = CAP[n] ** 2;
      let shown = full,
        active = false;
      if (s0 === 'gibbs') {
        shown = full * w.pos[n] ** 2;
        active = n <= m.B;
      } else if (s0 === 'bandlimit') active = n <= Math.min(m.B, BB);
      else active = n <= 4;
      bars.push({ n, full, shown, active, current: (s0 === 'shells' || s0 === 'triad') && n === m.n });
    }
    const top = Math.max(...bars.map((b) => b.full)) * 1.25;
    setPieces($('plotTitleB'), L(['壳层帕塞瓦尔能量 (2j + 1) Tr(f̂<sub>j</sub><sup>†</sup> f̂<sub>j</sub>)'], ['Shell Parseval energy', '(2j + 1) Tr(f̂<sub>j</sub><sup>†</sup> f̂<sub>j</sub>)']), ' ');
    const kept = bars.filter((b) => b.active).reduce((s, b) => s + b.shown, 0);
    setPieces($('plotMetaB'), [`${L('帽子', 'cap')} · Σ ${AP(kept / CAP_NORM2 * 100, 1)}% ${L('的', 'of')} ‖f‖²`], '');
    const g = kit.plot(cv, { x: [-0.6, N + 0.6], y: [0, top], pad: [34, 14, 12, 22] });
    g.axes({ xTicks: N === 24 ? [0, 6, 12, 18, 24] : [0, 2, 4, 6, 8, 10, 12], xFmt: (v) => String(Math.round(v)), yTicks: [0, 0.04, 0.08] });
    g.text(N + 0.6, 0, '2j', P.dim, { base: 'bottom', align: 'right', dx: -4, dy: -4, face: 'body' });
    for (const b of bars) {
      g.rect(b.n - 0.32, 0, b.n + 0.32, b.full, P.violet, { stroke: P.violet, width: 1, alpha: 0.18 });
      if (b.active) g.rect(b.n - 0.32, 0, b.n + 0.32, b.shown, b.current ? P.amber : P.cyan, { alpha: 0.9 });
    }
    PLOT.b = { scene: s0, bars: bars.map((b) => ({ n: b.n, full: b.full, shown: b.shown, active: b.active })) };
  }

  /* ---------- readouts ---------- */
  function readings(m) {
    const H = m.heap,
      s0 = state.scene;
    const KEY = {
      shells: [L('当前壳层的特征标', 'Character of the current shell'), chiLine(m)],
      triad: [L('迹在换基时不动：χ<sub>1/2</sub>² = χ<sub>0</sub> + χ<sub>1</sub>', 'The trace stays: χ<sub>1/2</sub>² = χ<sub>0</sub> + χ<sub>1</sub>'), `4κ ${rel(m.kq && fmul(fr(4n), m.kq), 4 * m.kappa)} = 1 + (${chiAt(2, m.kappa).rel.replace(/^[=≈] /, '')})`],
      gibbs: [L('过冲：平直硬截断 vs S³ 正核', 'Overshoot: flat hard cutoff vs S³ positive kernel'), `${pct(m.gibbs.flat.over)} vs ${pct(m.gibbs.pos.over)}`],
      heap: [L(`帕塞瓦尔（${m.group}）`, `Parseval (${m.group})`), parseval(H)],
      bandlimit: [L('寄存器维数 Σ<sub>j≤J<sub>max</sub></sub>(2j + 1)²', 'Register dimension Σ<sub>j≤J<sub>max</sub></sub>(2j + 1)²'), String(m.band.dim)]
    }[s0];
    $('roKeyLabel').innerHTML = KEY[0];
    $('roKey').innerHTML = KEY[1];
    $('roKeySub').innerHTML = ` · κ ${kRel(m)} · j = ${jname(m.n)} · 2J<sub>max</sub> = ${s0 === 'bandlimit' ? Math.min(m.B, BB) : m.B}`;
    $('roKappa').innerHTML = `κ ${kRel(m)} · c = ${cRel(m)} · ${chiLine(m)}`;
    $('roChars').innerHTML = charList(m);
    const B = s0 === 'bandlimit' ? Math.min(m.B, BB) : m.B;
    $('roDims').innerHTML = `${[0, 1, 2, 3, 4].map((n) => (n + 1) ** 2).join(', ')} · Σ<sub>2j≤${B}</sub> = ${s0 === 'bandlimit' ? m.band.dim : m.dim}`;
    $('roGibbs').innerHTML = `${pct(m.gibbs.flat.over)} · ${pct(m.gibbs.hard.over)} · ${pct(m.gibbs.pos.over)}`;
    $('roHeap').innerHTML = `${parseval(H)} · ${m.heapGap < 1e-9 ? '0' : AP(m.heapGap, 3)} · ${m.P}/${H.n * H.n}`;
    $('roMellin').innerHTML = `1/2 · ${AP(MELLIN.onLine, 6)} · ${below(MELLIN.lambdaZero)}`;
    $('roNote').innerHTML = L(
      `T<sub>2</sub>(c) ${AP(m.cheb.t2)} = 2κ − 1 · R(1, g) ${AP(m.ray.R)} · ${L('秩', 'rank')} ${FIXED.rank} = 1² + 2² + 3²`,
      `T<sub>2</sub>(c) ${AP(m.cheb.t2)} = 2κ − 1 · R(1, g) ${AP(m.ray.R)} · ${L('秩', 'rank')} ${FIXED.rank} = 1² + 2² + 3²`
    );
    $('scenePill').innerHTML = `${L(...LENS_NAME[state.lens])} <strong>${L(...SCENE_NAME[s0])}</strong>`;
    $('keyPill').innerHTML = `κ <strong>${kRel(m).replace(/^[=≈] /, '')}</strong>`;
    $('hint').textContent = L('拖琥珀手柄改当前参数 · 拖空白处转视角 · 空格播放', 'drag the amber handle to set the parameter · drag empty space to orbit · Space plays');
    $('formula').textContent = 'χ_j = U_2j(c) · κ = c² · F̂ = f̂ ĝ† ĥ';
    for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).setAttribute('aria-pressed', String(state.lens === 1));
    kf.set(round2(m.kappa));
    bf.set(B);
    jChips.set(String(m.j), true);
    groupChips.set(m.group, true);
  }
  const calc = () => compute(current());
  let liveNotes = null;
  const paint = kit.painter(() => {
    const m = calc();
    hud(m);
    if (liveNotes) liveNotes(compute(targets()));
    TRV.hudFit();
    drawStage(m);
    readings(m);
    if (!TRV.thumbMode) {
      stripA(m);
      stripB(m);
    }
  }, [stage, $('plot'), $('plotB')]);

  /* ---------- the rail ---------- */
  const playBtn = $('playBtn');
  let stopAt = null;
  const RAIL_TEXT = {
    kappa: (v) => `κ = ${fx(v, 2)}`,
    lam: (v) => `λ = ${fx(v, 2)}`,
    B: (v) => `2J<sub>max</sub> = ${v}`,
    p: (v) => `${L('进度', 'progress')} ${fx(100 * v, 0)}%`,
    Bb: (v) => `2J<sub>max</sub> = ${v}`
  };
  clock = kit.clock({
    range: $('now'),
    play: $('play'),
    speeds: $('speedChips'),
    label: $('tau'),
    loop: false,
    rate: 1 / 5,
    step: SCENES[state.scene].step,
    max: 1,
    t: 0.25,
    format: (t) => RAIL_TEXT[SCENES[state.scene].param](VALUE[SCENES[state.scene].param](t)),
    onChange: (t, c) => {
      playBtn.textContent = c.playing ? '❚❚' : '▷';
      playBtn.setAttribute('aria-pressed', String(c.playing));
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
  });
  playBtn.addEventListener('click', () => clock.toggle());
  for (const id of ['rew', 'rewindBtn'])
    $(id).addEventListener('click', () => {
      stopAt = null;
      clock.pause();
      clock.set(0);
    });

  /* ---------- controls ---------- */
  let transition = null,
    booting = true;
  function startGrow(from, ms) {
    if (transition) transition.cancel();
    state.from = from;
    state.grow = 0;
    const token = {};
    transition = token;
    const end = () => {
      state.grow = 1;
      state.from = null;
    };
    token.cancel = () => {
      if (token.run) token.run.cancel();
      end();
    };
    token.run = kit.tween(
      ms,
      (e) => {
        state.grow = e;
        paint();
      },
      () => {
        if (transition === token) transition = null;
        end();
        paint();
      }
    );
  }
  function setScene(scene, set, t, ms) {
    const before = current();
    if (transition) transition.cancel();
    transition = null;
    state.scene = scene;
    state.set = { ...state.set, ...set };
    clock.step = SCENES[scene].step;
    state.from = null;
    state.grow = 1;
    clock.set(t, true);
    if (ms > 0 && !TRV.still) startGrow(before, ms);
  }
  function leave() {
    stopAt = null;
    cards.mark(null);
    clock.pause();
    if (transition) {
      transition.cancel();
      transition = null;
    }
  }
  /** A control sets its parameter: on the rail when the scene drives it, otherwise directly. */
  function setParam(p, v) {
    leave();
    const param = SCENES[state.scene].param;
    if (param === p || (param === 'Bb' && p === 'B')) clock.set(RAIL[param](v));
    else {
      state.set[p] = v;
      paint();
    }
  }
  const kf = kit.field($('kappaRange'), { fmt: (v) => `${rel(onGrid(v, 100), v, 2).replace(/^= /, '')} · c = ±${fx(Math.sqrt(v), 3)}`, onInput: (v) => setParam('kappa', round2(v)) });
  const bf = kit.field($('bandRange'), { fmt: (v) => `${v} · Jₘₐₓ = ${jname(v)}`, onInput: (v) => setParam('B', Math.round(v)) });
  const jChips = kit.chips($('jChips'), 'j', (v) => {
    leave();
    state.set.j = parseFloat(v);
    paint();
  });
  const groupChips = kit.chips($('groupChips'), 'group', (v) => {
    leave();
    state.set.group = v === 'Q8' ? 'Q8' : '2T';
    paint();
  });
  const camChips = kit.chips($('camChips'), 'cam', (v) => {
    state.cam = cams[v] ? v : 'cut';
    sc.view(cams[state.cam], TRV.still || booting ? 0 : 600);
    paint();
  });
  function setLens(v) {
    state.lens = v ? 1 : 0;
    paint();
  }
  for (const id of ['lensToggleBtn', 'mobileLensBtn']) $(id).addEventListener('click', () => setLens(state.lens ? 0 : 1));

  /* ---------- experiment cards and their live notes ---------- */
  const CARD_NOTES = {
    [SHELLS]: (m) =>
      two(
        `紫色球是 S³(1)，切口的壁面亮度是 |χ<sub>${jname(m.n)}</sub>|/(2j + 1)，青色弧是节点；琥珀弧是 κ ${kRel(m)} 的两叶 c = ±√κ。金字塔第 j 层是 (2j + 1) × (2j + 1) 的块，对角箭头 e<sup>2imα</sup> 之和是 ${chiLine(m)}。${Math.abs(m.kappa - 0.25) < 1e-9 ? 'κ = 1/4（绕 (1, 1, 1) 转 120°）时 j = 1 的三支箭头和为 0，琥珀弧落在青色节点上。' : ''}`,
        `The violet ball is S³(1); the walls of the cut are as bright as |χ<sub>${jname(m.n)}</sub>|/(2j + 1), with cyan nodes; the amber arcs are the sheets c = ±√κ of κ ${kRel(m)}. Layer j of the pyramid is a (2j + 1) × (2j + 1) block whose diagonal arrows e<sup>2imα</sup> add up to ${chiLine(m)}.${Math.abs(m.kappa - 0.25) < 1e-9 ? ' At κ = 1/4 (the turn by 120° about (1, 1, 1)) the three arrows of j = 1 add up to 0 and the amber arcs sit on the cyan nodes.' : ''}`
      ),
    [TRIAD]: (m) =>
      two(
        `前方的 4 × 4 板是两个 j = 1/2 的张量积 D<sup>1/2</sup> ⊗ D<sup>1/2</sup>。时间轴把中间两维转 λ · 45°（λ = ${fx(m.lam, 2)}），紫色的块外格降到 ${leakRel(m)}，只剩 1 × 1（j = 0，读作过去的标量迹锚，MODEL）与 3 × 3（j = 1，读作未来的伴随曲率壳层，MODEL）。迹不动：χ<sub>1/2</sub>² = 4κ = 1 + (4κ − 1) = χ<sub>0</sub> + χ<sub>1</sub>，维数 2 × 2 = 1 + 3。`,
        `The 4 × 4 slab in front is the tensor product D<sup>1/2</sup> ⊗ D<sup>1/2</sup> of two shells j = 1/2. The rail turns its middle two dimensions by λ · 45° (λ = ${fx(m.lam, 2)}); the violet cells outside the blocks drop to ${leakRel(m)}, leaving a 1 × 1 block (j = 0, read as the past scalar trace anchor, MODEL) and a 3 × 3 block (j = 1, read as the future adjoint curvature shell, MODEL). The trace stays: χ<sub>1/2</sub>² = 4κ = 1 + (4κ − 1) = χ<sub>0</sub> + χ<sub>1</sub>, and 2 × 2 = 1 + 3.`
      ),
    [GIBBS_CARD]: (m) =>
      two(
        `帽子 1{α &lt; π/3}（边界在 κ = 1/4）截到 2J<sub>max</sub> = ${m.B}。左壁上的品红曲线是平直直线上的硬截断，越出 [0, 1] 区间达 ${pct(m.gibbs.flat.over)}；青色台地是 S³ 上正核 (Σχ)²/M 的合成，停在上界之下，过冲 ${pct(m.gibbs.pos.over)}。平直的过冲随带宽趋于 ${pct(GIBBS_LIMIT)}；S³ 上的硬截断（透镜二，品红虚线）在中心 1 与对径点 −1 处根本不收敛。金字塔的层高是正核的有理乘子 m<sub>j</sub>。σ = 1/2 的梅林轴上，e<sup>−x</sup> 的两边能量都是 1/2。`,
        `The cap 1{α &lt; π/3} (its rim at κ = 1/4) cut at 2J<sub>max</sub> = ${m.B}. The magenta curve on the left wall is the hard cutoff on the flat line, overshooting [0, 1] by ${pct(m.gibbs.flat.over)}; the cyan plateau is the synthesis on S³ with the positive kernel (Σχ)²/M, staying below the bound, overshoot ${pct(m.gibbs.pos.over)}. The flat overshoot tends to ${pct(GIBBS_LIMIT)} as the band grows; the hard cutoff on S³ (second lens, dashed magenta) does not converge at all at the centre 1 and the antipode −1. The heights of the pyramid are the rational multipliers m<sub>j</sub> of the positive kernel. On the Mellin axis σ = 1/2 both energies of e<sup>−x</sup> are 1/2.`
      ),
    [HEAP_CARD]: (m) =>
      two(
        `紫色玻璃球里是 ${m.group} 的 ${m.heap.n} 个元素${m.group === '2T' ? '（24 胞体的顶点）' : ''}。时间轴逐项累加 (f ⊛ ḡ ⊛ h)(w) = Σ f(x) ḡ(y) h(y x⁻¹ w)，只用三元运算、不选原点；青珠的大小是已累加的 |F(w)|（${m.P}/${m.heap.n * m.heap.n} 项）。右边每个不可约表示一块，高度是 |f̂ ĝ<sup>†</sup> ĥ|：谱侧一次矩阵乘积就是全部结果，紫色线框是部分和的变换，到终点与它重合。帕塞瓦尔 ${parseval(m.heap)}。`,
        `Inside the violet glass ball are the ${m.heap.n} elements of ${m.group}${m.group === '2T' ? ' (the vertices of the 24-cell)' : ''}. The rail adds up (f ⊛ ḡ ⊛ h)(w) = Σ f(x) ḡ(y) h(y x⁻¹ w) term by term, with the ternary operation alone and no origin; the cyan beads grow with the partial |F(w)| (${m.P}/${m.heap.n * m.heap.n} terms). On the right, one block per irreducible representation, of height |f̂ ĝ<sup>†</sup> ĥ|: on the spectral side one matrix product is the whole result, and the violet outlines, the transform of the partial sum, meet it at the end. Parseval ${parseval(m.heap)}.`
      ),
    [BAND_CARD]: (m) => {
      const B = Math.min(m.B, BB);
      return two(
        `琥珀平面把金字塔切在 2J<sub>max</sub> = ${B}：以下的青色壳层读作观察者的寄存器 𝒦<sub>0</sub>（维数 ${m.band.dim}，MODEL），以上的紫色读作视界 ℋ<sub>1/2</sub>（MODEL）。切口里的青色隆起是带限后的点事件（正核 (Σχ)²/M 按峰值归一），半高在 α ${AP(m.band.half, 3)}；右边的蝶形网络对 K = ${m.fly.K} 点样本用 ${m.fly.mults} 次复乘，朴素算法要 ${m.fly.naive} 次。`,
        `The amber plane cuts the pyramid at 2J<sub>max</sub> = ${B}: the cyan shells below are read as the register 𝒦<sub>0</sub> of an observer (dimension ${m.band.dim}, MODEL), the violet ones above as the horizon ℋ<sub>1/2</sub> (MODEL). The cyan bump in the cut is the band-limited point event (the positive kernel (Σχ)²/M scaled to peak 1), at half height at α ${AP(m.band.half, 3)}; the butterfly network on the right takes ${m.fly.mults} complex multiplications for K = ${m.fly.K} samples, the naive transform ${m.fly.naive}.`
      );
    }
  };
  // a cited figure has a fixed frame: one short sentence per card, no sub- or superscripts, only what its stage shows
  const FIGURE_NOTES = {
    [SHELLS]: (m) => {
      const v = m.kq ? decimal(evalPolyQ(kappaPoly(2), m.kq)) : fx(4 * m.kappa - 1, 3),
        on = Math.abs(m.kappa - 0.25) < 1e-9;
      return on
        ? two(`κ = 1/4：琥珀弧落在 j = 1 的青色节点上，χ1 = 4κ − 1 = 0，三支相位箭头互成 120°。`, `κ = 1/4: the amber arcs sit on the cyan nodes of j = 1, χ1 = 4κ − 1 = 0, three phase arrows 120° apart.`)
        : two(`κ = ${fx(m.kappa, 2)}：琥珀弧是 c = ±√κ 的两叶，χ1 = 4κ − 1 ${m.kq ? '=' : '≈'} ${v}。`, `κ = ${fx(m.kappa, 2)}: the amber arcs are the sheets c = ±√κ, χ1 = 4κ − 1 ${m.kq ? '=' : '≈'} ${v}.`);
    },
    [TRIAD]: (m) => two(`λ = ${fx(m.lam, 2)}：4 × 4 板分成 1 + 3 两块，块外泄漏 ${m.triad.leak < 1e-12 ? '为 0' : '未清零'}。`, `λ = ${fx(m.lam, 2)}: the 4 × 4 slab splits into blocks 1 + 3, leakage ${m.triad.leak < 1e-12 ? 'zero' : 'not yet zero'}.`),
    [GIBBS_CARD]: (m) => two(`2J = ${m.B}：品红平直硬截断越出 [0, 1] 达 ${pct(m.gibbs.flat.over)}，青色 S³ 正核台地过冲 ${pct(m.gibbs.pos.over)}。`, `2J = ${m.B}: the magenta flat hard cutoff overshoots [0, 1] by ${pct(m.gibbs.flat.over)}, the cyan S³ positive plateau by ${pct(m.gibbs.pos.over)}.`),
    [HEAP_CARD]: (m) => two(`${m.group} 上堆卷积已加 ${m.P}/${m.heap.n * m.heap.n} 项；帕塞瓦尔 ${m.heap.lhs} = ${m.heap.rhs ? fstr(m.heap.rhs) : '—'}。`, `Heap convolution on ${m.group}, ${m.P}/${m.heap.n * m.heap.n} terms; Parseval ${m.heap.lhs} = ${m.heap.rhs ? fstr(m.heap.rhs) : '—'}.`),
    [BAND_CARD]: (m) => two(`2J = ${Math.min(m.B, BB)}：青色寄存器维数 ${m.band.dim}，K = ${m.fly.K} 点蝶形 ${m.fly.mults} 次复乘（MODEL 读法）。`, `2J = ${Math.min(m.B, BB)}: cyan register of dimension ${m.band.dim}, ${m.fly.mults} butterfly multiplications for K = ${m.fly.K} (MODEL reading).`)
  };
  const cardNote = (id, m, figure) => (figure ? FIGURE_NOTES : CARD_NOTES)[id](m);
  const HINT = two('拖琥珀手柄、时间轴或右栏的滑块与按钮改 κ、j、2J<sub>max</sub> 与有限群，换透镜或视角。随时可以再选一张卡。', 'Drag the amber handle, the rail or the controls on the right to set κ, j, 2J<sub>max</sub> and the finite group; switch the lens or the view. Pick a card again at any time.');
  function idleNote(m) {
    const lead = two(`此刻 ${L(...SCENE_NAME[state.scene])}：`, `Right now ${SCENE_NAME[state.scene][1].toLowerCase()}: `);
    const body = subline(m);
    return [two('自由探索：', 'Free play: '), lead, body, two(' ', ' '), HINT].reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
  }
  function applyPreset(id) {
    const p = presets[id];
    stopAt = null;
    clock.pause();
    const parked = TRV.still || TRV.reduceMotion || booting;
    setScene(p.scene, { kappa: p.kappa, j: p.j, B: p.B, lam: p.lam, p: p.p, group: p.group }, parked ? p.still : 0, booting || TRV.still ? 0 : 600);
    state.cam = p.cam;
    camChips.set(p.cam, true);
    sc.view(cams[p.cam], booting || TRV.still ? 0 : 600);
    clock.set(parked ? p.still : 0);
    if (!parked) {
      stopAt = p.still;
      clock.play();
    }
    paint();
  }
  const notesObj = Object.fromEntries(Object.keys(presets).map((id) => [id, two('', '')])),
    idlePair = [...HINT];
  const cards = kit.cards($('presets'), { presets, notes: notesObj, noteEl: $('presetNote'), tour: $('tour'), onPick: applyPreset, idle: idlePair });
  let noteKey = null;
  liveNotes = (m) => {
    const id = cards.current,
      pair = id ? cardNote(id, m, TRV.figure) : idleNote(m),
      key = `${id || 'idle'}|${TRV.lang}|${pair[0]}`;
    if (key === noteKey) return;
    noteKey = key;
    const slot = id ? notesObj[id] : idlePair;
    slot[0] = pair[0];
    slot[1] = pair[1];
    cards.mark(id);
  };

  /* ---------- the amber handle: drag it along its path, or arrow keys ---------- */
  const viewportPoint = (t) => {
    const q = sc.p(handleWorld(t)),
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
    let best = clock.t,
      gap = Infinity;
    for (let k = 0; k <= 600; k++) {
      const t = k / 600,
        p = sc.p(handleWorld(t)),
        d = hypot(p[0] - x, p[1] - y) + Math.abs(clock.t - t) * 1e-6;
      if (d < gap) {
        gap = d;
        best = t;
      }
    }
    clock.set(best);
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
    const up = ev.key === 'ArrowRight' || ev.key === 'ArrowUp',
      step = SCENES[state.scene].step;
    clock.set(ev.key === 'Home' ? 0 : ev.key === 'End' ? 1 : clamp(clock.t + (up ? step : -step), 0, 1));
  };

  /* ---------- the NUM box and the numbers of the drawer: computed once, when the page opens ---------- */
  const BENCH = (() => {
    const g24 = gibbs(24),
      b4 = band(4),
      T = heapOf('2T'),
      Q = heapOf('Q8'),
      fly = fftOf(4),
      tri = triadOf(0.25, 1),
      cheb = heapChebyshev(gOf(0.25));
    return { g24, b4, T, Q, fly, tri, cheb };
  })();
  /** The hard cutoff at the centre 1 for six bandwidths in a row: it swings instead of settling at 1. */
  const CENTRE = [24, 25, 26, 27, 28, 29].map((B) => fx(synth(0, multipliers(B).hard), 4));
  const NUMBERS = {
    p3: () => polyText(kappaPoly(3)),
    p4: () => polyText(kappaPoly(4)),
    chi1: () => decimal(evalPolyQ(kappaPoly(2), fr(1n, 4n))),
    chi2: () => decimal(evalPolyQ(kappaPoly(4), fr(1n, 4n))),
    leak: () => below(BENCH.tri.leak),
    B: () => '24',
    flat: () => AP(100 * BENCH.g24.flat.over, 2) + '%',
    hard: () => AP(100 * BENCH.g24.hard.over, 2) + '%',
    limit: () => AP(100 * GIBBS_LIMIT, 3) + '%',
    pos: () => '0.00%',
    mellin: () => `1/2 ${AP(MELLIN.onLine, 6)}`,
    space: () => String(BENCH.T.spaceMults),
    blocks: () => String(BENCH.T.blockMults),
    p2T: () => parseval(BENCH.T),
    pQ8: () => parseval(BENCH.Q),
    Bb: () => '4',
    dim: () => String(BENCH.b4.dim),
    kept: () => AP(100 * BENCH.b4.kept, 2) + '%',
    K: () => String(BENCH.fly.K),
    fly: () => String(BENCH.fly.mults),
    naive: () => String(BENCH.fly.naive)
  };
  function numText(say) {
    const { g24, b4, T, Q, fly, tri, cheb } = BENCH,
      F = FIXED,
      list = (...xs) => xs.join(say('、', ', ')),
      gap = (x) => say('的浮点偏差 ', 'drift ') + below(x),
      eig = (ev) => ev.map((v) => fx(v, 0)).join(', ');
    return say(
      `打开页面时由脚本现算，是上面各条定理的个别实例，不检验定理的前提。特征标：χ<sub>j</sub> = U<sub>2j</sub>(c)，κ = c²；χ<sub>3/2</sub>² = ${polyText(kappaPoly(3))}，χ<sub>2</sub> = ${polyText(kappaPoly(4))}；κ = 1/4 时 χ<sub>1</sub> = 0、χ<sub>2</sub> = −1。舒尔：j, k ≤ 2 的 5 × 5 外尔格拉姆矩阵与单位矩阵${gap(F.gramGap)}。克莱布什—戈尔丹：κ = 1/4、λ = 1 时块外泄漏 ${below(tri.leak)}，迹 ${AP(tri.trace[0])} = 1 + 0。吉布斯（2J<sub>max</sub> = 24，平直 |k| ≤ 25）：平直硬截断过冲 ${pct(g24.flat.over)}，S³ 硬截断 ${pct(g24.hard.over)}（它在 1 处的部分和，2J<sub>max</sub> = 24 … 29：${CENTRE.join('、')}），S³ 正核的最大值减 1 为 ${sci(g24.pos.max - 1)}、最小值 ${sci(g24.pos.min)}；极限 (1/π)Si(π) − 1/2 ${AP(GIBBS_LIMIT, 6)}。梅林：∫|e<sup>−x</sup>|² dx = 1/2，σ = 1/2 上 (1/2π)∫|Γ(1/2 + it)|² dt ${AP(MELLIN.onLine, 9)}，σ = 3/4 上 ${AP(MELLIN.offLine, 6)}（Γ(3/2)/2<sup>3/2</sup> ${AP(MELLIN.offExact, 6)}）；θ 尾梅林积分 Λ(2) ${AP(MELLIN.lambda2, 9)}，π/6 ${AP(MELLIN.piOver6, 9)}；|Λ(1/2 + iγ<sub>1</sub>)| ${below(MELLIN.lambdaZero)}；凯莱像在 σ = 1/2 的 6 个取样点上与单位圆${gap(MELLIN.cayleyOn)}，σ = 3/4 时 |u| ${AP(MELLIN.cayleyOff)}。堆卷积：2T 上 F̂ = f̂ ĝ<sup>†</sup> ĥ 在 7 个不可约表示上逐项精确相等${T.same ? '' : '（不相等！）'}，Q<sub>8</sub> 上 5 个${Q.same ? '' : '（不相等！）'}；帕塞瓦尔 2T ${parseval(T)}，Q<sub>8</sub> ${parseval(Q)}，F 的能量 2T ${T.lhsF} = ${T.rhsF ? fstr(T.rhsF) : '—'}；空间侧 ${T.spaceMults} 次乘法，谱侧 ${T.blockMults} 次。2T 上 j = 0, 1/2, 1 的特征标核秩 ${F.rank}，特征值 ${eig(F.eigPos)}；把 j = 1/2 的权重改成 −1 后为 ${eig(F.eigNeg)}。基点群：${F.triCount} 组 (o, x, y, z) 中 tri(x, y, z) = x ⋆ y⁻¹ ⋆ z 失败 ${F.triFail} 次。带限（2J<sub>max</sub> = 4）：寄存器维数 ${b4.dim}，帽子能量留下 ${pct(b4.kept)}，点事件半高 α ${AP(b4.half, 4)}。蝶形：K = ${fly.K}，${fly.mults} 次复乘，朴素 ${fly.naive} 次，结果与朴素变换${gap(fly.naiveGap)}；帕塞瓦尔 ${fly.space} 与 ${AP(fly.spec, 9)}；旋转因子的托普利茨最小特征值 ${AP(fly.lamOn, 6)}，推出 21/20 倍后 ${AP(fly.lamOff, 4)}。数值演示，不是证明。`,
      `Computed by the script when the page opens, single instances of the theorems above; it checks no hypothesis of them. Characters: χ<sub>j</sub> = U<sub>2j</sub>(c), κ = c²; χ<sub>3/2</sub>² = ${polyText(kappaPoly(3))}, χ<sub>2</sub> = ${polyText(kappaPoly(4))}; at κ = 1/4, χ<sub>1</sub> = 0 and χ<sub>2</sub> = −1. Schur: the 5 × 5 Weyl Gram matrix of j, k ≤ 2 against the identity, ${gap(F.gramGap)}. Clebsch–Gordan: at κ = 1/4, λ = 1 the leakage is ${below(tri.leak)} and the trace ${AP(tri.trace[0])} = 1 + 0. Gibbs (2J<sub>max</sub> = 24, flat |k| ≤ 25): flat hard cutoff overshoot ${pct(g24.flat.over)}, S³ hard cutoff ${pct(g24.hard.over)} (its partial sums at 1 for 2J<sub>max</sub> = 24 … 29: ${CENTRE.join(', ')}), S³ positive kernel maximum minus 1 ${sci(g24.pos.max - 1)} and minimum ${sci(g24.pos.min)}; limit (1/π)Si(π) − 1/2 ${AP(GIBBS_LIMIT, 6)}. Mellin: ∫|e<sup>−x</sup>|² dx = 1/2; on σ = 1/2, (1/2π)∫|Γ(1/2 + it)|² dt ${AP(MELLIN.onLine, 9)}; on σ = 3/4, ${AP(MELLIN.offLine, 6)} (Γ(3/2)/2<sup>3/2</sup> ${AP(MELLIN.offExact, 6)}); theta-tail Mellin integral Λ(2) ${AP(MELLIN.lambda2, 9)}, π/6 ${AP(MELLIN.piOver6, 9)}; |Λ(1/2 + iγ<sub>1</sub>)| ${below(MELLIN.lambdaZero)}; Cayley images at 6 sample points of σ = 1/2 against the unit circle, ${gap(MELLIN.cayleyOn)}, and |u| ${AP(MELLIN.cayleyOff)} at σ = 3/4. Heap convolution: F̂ = f̂ ĝ<sup>†</sup> ĥ holds exactly, entry by entry, on the 7 irreducible representations of 2T${T.same ? '' : ' (it fails!)'} and the 5 of Q<sub>8</sub>${Q.same ? '' : ' (it fails!)'}; Parseval ${parseval(T)} on 2T and ${parseval(Q)} on Q<sub>8</sub>, energy of F on 2T ${T.lhsF} = ${T.rhsF ? fstr(T.rhsF) : '—'}; ${T.spaceMults} multiplications on the spatial side, ${T.blockMults} on the spectral side. On 2T the character kernel of j = 0, 1/2, 1 has rank ${F.rank} and eigenvalues ${eig(F.eigPos)}; with the weight of j = 1/2 set to −1, ${eig(F.eigNeg)}. Base-point group: tri(x, y, z) = x ⋆ y⁻¹ ⋆ z fails ${F.triFail} times among ${F.triCount} quadruples (o, x, y, z). Band (2J<sub>max</sub> = 4): register dimension ${b4.dim}, ${pct(b4.kept)} of the energy of the cap kept, half height of the point event at α ${AP(b4.half, 4)}. Butterflies: K = ${fly.K}, ${fly.mults} complex multiplications, naive ${fly.naive}, the result against the naive transform ${gap(fly.naiveGap)}; Parseval ${fly.space} and ${AP(fly.spec, 9)}; least Toeplitz eigenvalue of the twiddles ${AP(fly.lamOn, 6)}, pushed out by 21/20 ${AP(fly.lamOff, 4)}. A numerical illustration, not a proof.`
    );
  }
  const ZH = (a) => a,
    EN = (a, b) => b;
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
  TRV.onLang(() => {
    noteKey = null;
    paint();
  });

  /* ---------- probe, cover, start ---------- */
  const plain = (x) => JSON.parse(JSON.stringify(x, (k, v) => (typeof v === 'bigint' ? String(v) : v)));
  window.PETER_WEYL_DEBUG = Object.freeze({
    get state() {
      const m = calc();
      return plain({
        scene: state.scene,
        lens: state.lens,
        cam: state.cam,
        t: clock.t,
        playing: clock.playing,
        preset: cards.current,
        blending: !!(state.from && state.grow < 1),
        camera: { ...sc.cam },
        kappa: m.kappa,
        c: m.c,
        alpha: m.alpha,
        j: m.j,
        n: m.n,
        B: m.B,
        lam: m.lam,
        p: m.p,
        P: m.P,
        group: m.group,
        chars: m.chars.map((ch) => ch.x),
        chiLine: chiLine(m),
        gibbs: { flat: m.gibbs.flat.over, hard: m.gibbs.hard.over, pos: m.gibbs.pos.over, posMax: m.gibbs.pos.max, posMin: m.gibbs.pos.min, K: m.gibbs.K, M: m.gibbs.M },
        band: { dim: m.band.dim, kept: m.band.kept, half: m.band.half, B: m.band.B },
        triad: { leak: m.triad.leak, trace: m.triad.trace, singlet: m.triad.singlet, triplet: m.triad.triplet },
        heap: { lhs: m.heap.lhs, rhs: m.heap.rhs ? fstr(m.heap.rhs) : null, same: m.heap.same, gap: m.heapGap, Fp: m.Fp, F: m.heap.F },
        fly: { K: m.fly.K, mults: m.fly.mults, naive: m.fly.naive },
        cheb: m.cheb,
        ray: m.ray
      });
    },
    /** The mathematics of a frame, without touching the page. */
    calc: (set) => {
      const m = compute({ ...state.set, ...set });
      return plain({ kappa: m.kappa, chars: m.chars.map((ch) => ch.x), exact: m.chars.map((ch) => (ch.exact ? fstr(ch.exact) : null)), chiLine: chiLine(m), triad: { leak: m.triad.leak, trace: m.triad.trace, mags: m.triad.mags }, gibbs: m.gibbs, band: m.band, fly: m.fly, cheb: m.cheb, ray: m.ray });
    },
    kappaPoly: (n) => kappaPoly(n),
    polyText: (n) => polyText(kappaPoly(n)),
    chi: (n, c) => chiC(n, c),
    cap: { coeffs: CAP.slice(), norm2: CAP_NORM2 },
    multipliers: (B) => plain(multipliers(B)),
    synth: (alpha, B, kind = 'pos') => synth(alpha, multipliers(B)[kind]),
    flat: (x, K, fejer = false) => flatSum(x, K, fejer),
    posKernel: (alpha, B) => posKernel(alpha, B),
    gibbsLimit: GIBBS_LIMIT,
    heap: (group) => {
      const H = heapOf(group);
      return plain({ n: H.n, f: H.f, g: H.g, h: H.h, F: H.F, lhs: H.lhs, rhs: H.rhs ? fstr(H.rhs) : null, lhsF: H.lhsF, rhsF: H.rhsF ? fstr(H.rhsF) : null, same: H.same, spaceMults: H.spaceMults, blockMults: H.blockMults, energies: H.blocks.map((b) => ({ name: b.rho.name, d: b.rho.d, energy: b.energy ? fstr(b.energy) : null })) });
    },
    elements: (group) => ELEMENTS[group].map((q) => q.map((v) => v / 2)),
    names: QNAME.slice(),
    fixed: plain(FIXED),
    mellin: { ...MELLIN },
    fft: (B) => plain(fftOf(B)),
    presets: plain(presets),
    plots: () => plain(PLOT),
    /** Viewport coordinates of the amber handle at the rail position t, for drag targets. */
    dragTarget: viewportPoint,
    project: (p) => {
      const q = sc.p(p),
        b = $('cv').getBoundingClientRect();
      return { x: b.left + q[0], y: b.top + q[1] };
    },
    ballPoint: (q) => ballPt(q),
    centre: CB.slice()
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
